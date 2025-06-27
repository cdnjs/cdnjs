/*!
 * ONNX Runtime Web v1.22.0-dev.20250325-afaf4a5e63
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var v1=Object.create;var ai=Object.defineProperty;var w1=Object.getOwnPropertyDescriptor;var x1=Object.getOwnPropertyNames;var T1=Object.getPrototypeOf,I1=Object.prototype.hasOwnProperty;var As=(n=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(n,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):n)(function(n){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+n+'" is not supported')});var N=(n,e)=>()=>(n&&(e=n(n=0)),e);var ne=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports),wn=(n,e)=>{for(var r in e)ai(n,r,{get:e[r],enumerable:!0})},Qp=(n,e,r,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of x1(e))!I1.call(n,o)&&o!==r&&ai(n,o,{get:()=>e[o],enumerable:!(t=w1(e,o))||t.enumerable});return n};var Te=(n,e,r)=>(r=n!=null?v1(T1(n)):{},Qp(e||!n||!n.__esModule?ai(r,"default",{value:n,enumerable:!0}):r,n)),Kn=n=>Qp(ai({},"__esModule",{value:!0}),n);var si,xn,an,S1,ef,Os=N(()=>{"use strict";si=new Map,xn=[],an=(n,e,r)=>{if(e&&typeof e.init=="function"&&typeof e.createInferenceSessionHandler=="function"){let t=si.get(n);if(t===void 0)si.set(n,{backend:e,priority:r});else{if(t.priority>r)return;if(t.priority===r&&t.backend!==e)throw new Error(`cannot register backend "${n}" using priority ${r}`)}if(r>=0){let o=xn.indexOf(n);o!==-1&&xn.splice(o,1);for(let i=0;i<xn.length;i++)if(si.get(xn[i]).priority<=r){xn.splice(i,0,n);return}xn.push(n)}return}throw new TypeError("not a valid backend")},S1=async n=>{let e=si.get(n);if(!e)return"backend not found.";if(e.initialized)return e.backend;if(e.aborted)return e.error;{let r=!!e.initPromise;try{return r||(e.initPromise=e.backend.init(n)),await e.initPromise,e.initialized=!0,e.backend}catch(t){return r||(e.error=`${t}`,e.aborted=!0),e.error}finally{delete e.initPromise}}},ef=async n=>{let e=n.executionProviders||[],r=e.map(u=>typeof u=="string"?u:u.name),t=r.length===0?xn:r,o,i=[],a=new Set;for(let u of t){let l=await S1(u);typeof l=="string"?i.push({name:u,err:l}):(o||(o=l),o===l&&a.add(u))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:l}of i)r.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${l}`);let s=e.filter(u=>a.has(typeof u=="string"?u:u.name));return[o,new Proxy(n,{get:(u,l)=>l==="executionProviders"?s:Reflect.get(u,l)})]}});var tf=N(()=>{"use strict";Os()});var rf,nf=N(()=>{"use strict";rf="1.22.0-dev.20250325-afaf4a5e63"});var of,St,Ps=N(()=>{"use strict";nf();of="warning",St={wasm:{},webgl:{},webgpu:{},versions:{common:rf},set logLevel(n){if(n!==void 0){if(typeof n!="string"||["verbose","info","warning","error","fatal"].indexOf(n)===-1)throw new Error(`Unsupported logging level: ${n}`);of=n}},get logLevel(){return of}};Object.defineProperty(St,"logLevel",{enumerable:!0})});var ge,af=N(()=>{"use strict";Ps();ge=St});var sf,uf,lf=N(()=>{"use strict";sf=(n,e)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=n.dims[3],r.height=n.dims[2];let t=r.getContext("2d");if(t!=null){let o,i;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=n.dims[2],i=n.dims[3]):(o=n.dims[3],i=n.dims[2]);let a=e?.format!==void 0?e.format:"RGB",s=e?.norm,u,l;s===void 0||s.mean===void 0?u=[255,255,255,255]:typeof s.mean=="number"?u=[s.mean,s.mean,s.mean,s.mean]:(u=[s.mean[0],s.mean[1],s.mean[2],0],s.mean[3]!==void 0&&(u[3]=s.mean[3])),s===void 0||s.bias===void 0?l=[0,0,0,0]:typeof s.bias=="number"?l=[s.bias,s.bias,s.bias,s.bias]:(l=[s.bias[0],s.bias[1],s.bias[2],0],s.bias[3]!==void 0&&(l[3]=s.bias[3]));let d=i*o,f=0,m=d,b=d*2,y=-1;a==="RGBA"?(f=0,m=d,b=d*2,y=d*3):a==="RGB"?(f=0,m=d,b=d*2):a==="RBG"&&(f=0,b=d,m=d*2);for(let _=0;_<i;_++)for(let T=0;T<o;T++){let w=(n.data[f++]-l[0])*u[0],x=(n.data[m++]-l[1])*u[1],S=(n.data[b++]-l[2])*u[2],A=y===-1?255:(n.data[y++]-l[3])*u[3];t.fillStyle="rgba("+w+","+x+","+S+","+A+")",t.fillRect(T,_,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},uf=(n,e)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),t;if(r!=null){let o,i,a;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=n.dims[2],i=n.dims[1],a=n.dims[3]):(o=n.dims[3],i=n.dims[2],a=n.dims[1]);let s=e!==void 0&&e.format!==void 0?e.format:"RGB",u=e?.norm,l,d;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?d=[0,0,0,0]:typeof u.bias=="number"?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(d[3]=u.bias[3]));let f=i*o;if(e!==void 0&&(e.format!==void 0&&a===4&&e.format!=="RGBA"||a===3&&e.format!=="RGB"&&e.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let m=4,b=0,y=1,_=2,T=3,w=0,x=f,S=f*2,A=-1;s==="RGBA"?(w=0,x=f,S=f*2,A=f*3):s==="RGB"?(w=0,x=f,S=f*2):s==="RBG"&&(w=0,S=f,x=f*2),t=r.createImageData(o,i);for(let P=0;P<i*o;b+=m,y+=m,_+=m,T+=m,P++)t.data[b]=(n.data[w++]-d[0])*l[0],t.data[y]=(n.data[x++]-d[1])*l[1],t.data[_]=(n.data[S++]-d[2])*l[2],t.data[T]=A===-1?255:(n.data[A++]-d[3])*l[3]}else throw new Error("Can not access image data");return t}});var Es,cf,df,pf,ff,hf,mf=N(()=>{"use strict";ui();Es=(n,e)=>{if(n===void 0)throw new Error("Image buffer must be defined");if(e.height===void 0||e.width===void 0)throw new Error("Image height and width must be defined");if(e.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:t}=e,o=e.norm??{mean:255,bias:0},i,a;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?a=[o.bias,o.bias,o.bias,o.bias]:a=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let s=e.format!==void 0?e.format:"RGBA",u=e.tensorFormat!==void 0&&e.tensorFormat!==void 0?e.tensorFormat:"RGB",l=r*t,d=u==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),f=4,m=0,b=1,y=2,_=3,T=0,w=l,x=l*2,S=-1;s==="RGB"&&(f=3,m=0,b=1,y=2,_=-1),u==="RGBA"?S=l*3:u==="RBG"?(T=0,x=l,w=l*2):u==="BGR"&&(x=0,w=l,T=l*2);for(let P=0;P<l;P++,m+=f,y+=f,b+=f,_+=f)d[T++]=(n[m]+a[0])/i[0],d[w++]=(n[b]+a[1])/i[1],d[x++]=(n[y]+a[2])/i[2],S!==-1&&_!==-1&&(d[S++]=(n[_]+a[3])/i[3]);return u==="RGBA"?new dt("float32",d,[1,4,r,t]):new dt("float32",d,[1,3,r,t])},cf=async(n,e)=>{let r=typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement,t=typeof ImageData<"u"&&n instanceof ImageData,o=typeof ImageBitmap<"u"&&n instanceof ImageBitmap,i=typeof n=="string",a,s=e??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=d=>typeof HTMLCanvasElement<"u"&&d instanceof HTMLCanvasElement||d instanceof OffscreenCanvas?d.getContext("2d"):null;if(r){let d=u();d.width=n.width,d.height=n.height;let f=l(d);if(f!=null){let m=n.height,b=n.width;if(e!==void 0&&e.resizedHeight!==void 0&&e.resizedWidth!==void 0&&(m=e.resizedHeight,b=e.resizedWidth),e!==void 0){if(s=e,e.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");s.tensorFormat="RGBA",s.height=m,s.width=b}else s.tensorFormat="RGBA",s.height=m,s.width=b;f.drawImage(n,0,0),a=f.getImageData(0,0,b,m).data}else throw new Error("Can not access image data")}else if(t){let d,f;if(e!==void 0&&e.resizedWidth!==void 0&&e.resizedHeight!==void 0?(d=e.resizedHeight,f=e.resizedWidth):(d=n.height,f=n.width),e!==void 0&&(s=e),s.format="RGBA",s.height=d,s.width=f,e!==void 0){let m=u();m.width=f,m.height=d;let b=l(m);if(b!=null)b.putImageData(n,0,0),a=b.getImageData(0,0,f,d).data;else throw new Error("Can not access image data")}else a=n.data}else if(o){if(e===void 0)throw new Error("Please provide image config with format for Imagebitmap");let d=u();d.width=n.width,d.height=n.height;let f=l(d);if(f!=null){let m=n.height,b=n.width;return f.drawImage(n,0,0,b,m),a=f.getImageData(0,0,b,m).data,s.height=m,s.width=b,Es(a,s)}else throw new Error("Can not access image data")}else{if(i)return new Promise((d,f)=>{let m=u(),b=l(m);if(!n||!b)return f();let y=new Image;y.crossOrigin="Anonymous",y.src=n,y.onload=()=>{m.width=y.width,m.height=y.height,b.drawImage(y,0,0,m.width,m.height);let _=b.getImageData(0,0,m.width,m.height);s.height=m.height,s.width=m.width,d(Es(_.data,s))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return Es(a,s);throw new Error("Input data provided is not supported - aborted tensor creation")},df=(n,e)=>{let{width:r,height:t,download:o,dispose:i}=e,a=[1,t,r,4];return new dt({location:"texture",type:"float32",texture:n,dims:a,download:o,dispose:i})},pf=(n,e)=>{let{dataType:r,dims:t,download:o,dispose:i}=e;return new dt({location:"gpu-buffer",type:r??"float32",gpuBuffer:n,dims:t,download:o,dispose:i})},ff=(n,e)=>{let{dataType:r,dims:t,download:o,dispose:i}=e;return new dt({location:"ml-tensor",type:r??"float32",mlTensor:n,dims:t,download:o,dispose:i})},hf=(n,e,r)=>new dt({location:"cpu-pinned",type:n,data:e,dims:r??[e.length]})});var Tn,_o,gf,bf,yf=N(()=>{"use strict";Tn=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),_o=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),gf=!1,bf=()=>{if(!gf){gf=!0;let n=typeof BigInt64Array<"u"&&BigInt64Array.from,e=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,t=typeof r<"u"&&r.from;n&&(Tn.set("int64",BigInt64Array),_o.set(BigInt64Array,"int64")),e&&(Tn.set("uint64",BigUint64Array),_o.set(BigUint64Array,"uint64")),t?(Tn.set("float16",r),_o.set(r,"float16")):Tn.set("float16",Uint16Array)}}});var _f,vf,wf=N(()=>{"use strict";ui();_f=n=>{let e=1;for(let r=0;r<n.length;r++){let t=n[r];if(typeof t!="number"||!Number.isSafeInteger(t))throw new TypeError(`dims[${r}] must be an integer, got: ${t}`);if(t<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${t}`);e*=t}return e},vf=(n,e)=>{switch(n.location){case"cpu":return new dt(n.type,n.data,e);case"cpu-pinned":return new dt({location:"cpu-pinned",data:n.data,type:n.type,dims:e});case"texture":return new dt({location:"texture",texture:n.texture,type:n.type,dims:e});case"gpu-buffer":return new dt({location:"gpu-buffer",gpuBuffer:n.gpuBuffer,type:n.type,dims:e});case"ml-tensor":return new dt({location:"ml-tensor",mlTensor:n.mlTensor,type:n.type,dims:e});default:throw new Error(`tensorReshape: tensor location ${n.location} is not supported`)}}});var dt,ui=N(()=>{"use strict";lf();mf();yf();wf();dt=class{constructor(e,r,t){bf();let o,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,o=e.type,i=e.dims,e.location){case"cpu-pinned":{let s=Tn.get(o);if(!s)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(o=e,u=t,e==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");s=r}else{let l=Tn.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(r)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?s=l.from(r,BigInt):s=l.from(r)}else if(r instanceof l)s=r;else if(r instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(r);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&r instanceof Uint16Array&&l!==Uint16Array)s=new globalThis.Float16Array(r.buffer,r.byteOffset,r.length);else throw new TypeError(`A ${o} tensor's data must be type of ${l}`)}else if(u=r,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")o="string",s=e;else if(l==="boolean")o="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)o="uint8",s=Uint8Array.from(e);else{let l=_o.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);o=l,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");i=u,this.cpuData=s,this.dataLocation="cpu"}let a=_f(i);if(this.cpuData&&a!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=a}static async fromImage(e,r){return cf(e,r)}static fromTexture(e,r){return df(e,r)}static fromGpuBuffer(e,r){return pf(e,r)}static fromMLTensor(e,r){return ff(e,r)}static fromPinnedBuffer(e,r,t){return hf(e,r,t)}toDataURL(e){return sf(this,e)}toImageData(e){return uf(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,e&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return vf(this,e)}}});var $t,Cs=N(()=>{"use strict";ui();$t=dt});var li,xf,At,yt,Ds=N(()=>{"use strict";Ps();li=(n,e)=>{(typeof St.trace>"u"?!St.wasm.trace:!St.trace)||console.timeStamp(`${n}::ORT::${e}`)},xf=(n,e)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],t=!1;for(let o=0;o<r.length;o++){if(t&&!r[o].includes("TRACE_FUNC")){let i=`FUNC_${n}::${r[o].trim().split(" ")[1]}`;e&&(i+=`::${e}`),li("CPU",i);return}r[o].includes("TRACE_FUNC")&&(t=!0)}},At=n=>{(typeof St.trace>"u"?!St.wasm.trace:!St.trace)||xf("BEGIN",n)},yt=n=>{(typeof St.trace>"u"?!St.wasm.trace:!St.trace)||xf("END",n)}});var ci,Tf=N(()=>{"use strict";Os();Cs();Ds();ci=class n{constructor(e){this.handler=e}async run(e,r,t){At();let o={},i={};if(typeof e!="object"||e===null||e instanceof $t||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof $t)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let l of r){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);o[l]=null}if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,d=Object.getOwnPropertyNames(r);for(let f of this.outputNames)if(d.indexOf(f)!==-1){let m=r[f];(m===null||m instanceof $t)&&(l=!0,a=!1,o[f]=m)}if(l){if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof e[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(a)for(let l of this.outputNames)o[l]=null;let s=await this.handler.run(e,o,i),u={};for(let l in s)if(Object.hasOwnProperty.call(s,l)){let d=s[l];d instanceof $t?u[l]=d:u[l]=new $t(d.type,d.data,d.dims)}return yt(),u}async release(){return this.handler.dispose()}static async create(e,r,t,o){At();let i,a={};if(typeof e=="string"){if(i=e,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof Uint8Array){if(i=e,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer){let d=e,f=0,m=e.byteLength;if(typeof r=="object"&&r!==null)a=r;else if(typeof r=="number"){if(f=r,!Number.isSafeInteger(f))throw new RangeError("'byteOffset' must be an integer.");if(f<0||f>=d.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${d.byteLength}).`);if(m=e.byteLength-f,typeof t=="number"){if(m=t,!Number.isSafeInteger(m))throw new RangeError("'byteLength' must be an integer.");if(m<=0||f+m>d.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${d.byteLength-f}].`);if(typeof o=="object"&&o!==null)a=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof t<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(d,f,m)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[s,u]=await ef(a),l=await s.createInferenceSessionHandler(i,u);return yt(),new n(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}});var $1,If=N(()=>{"use strict";Tf();$1=ci});var Sf=N(()=>{"use strict"});var $f=N(()=>{"use strict"});var Af=N(()=>{"use strict"});var Of=N(()=>{"use strict"});var ks={};wn(ks,{InferenceSession:()=>$1,TRACE:()=>li,TRACE_FUNC_BEGIN:()=>At,TRACE_FUNC_END:()=>yt,Tensor:()=>$t,env:()=>ge,registerBackend:()=>an});var ft=N(()=>{"use strict";tf();af();If();Cs();Sf();$f();Ds();Af();Of()});function sn(n,e,r,t){if(e===void 0)return O1(n);if(r===void 0)di(n,e,1);else if(typeof r=="number"&&t===void 0)di(n,e,r);else if(typeof r=="string"&&t===void 0)di(n,r,1,e);else if(typeof r=="string"&&typeof t=="number")di(n,r,t,e);else throw new TypeError("input is valid")}function O1(n){return{verbose:sn.verbose.bind(null,n),info:sn.info.bind(null,n),warning:sn.warning.bind(null,n),error:sn.error.bind(null,n),fatal:sn.fatal.bind(null,n)}}function di(n,e,r,t){let o=vo[t||""]||vo[""];Ef[n]<Ef[o.minimalSeverity]||(o.logDateTime&&(e=`${new Date().toISOString()}|${e}`),o.logSourceLocation,A1[o.provider].log(n,e,t))}var Ns,Ls,Ef,A1,Cf,vo,Fe,fi,hi,mi,pi,kt=N(()=>{"use strict";Ns=class{log(e,r,t){}},Ls=class{log(e,r,t){console.log(`${this.color(e)} ${t?"\x1B[35m"+t+"\x1B[0m ":""}${r}`)}color(e){switch(e){case"verbose":return"\x1B[34;40mv\x1B[0m";case"info":return"\x1B[32mi\x1B[0m";case"warning":return"\x1B[30;43mw\x1B[0m";case"error":return"\x1B[31;40me\x1B[0m";case"fatal":return"\x1B[101mf\x1B[0m";default:throw new Error(`unsupported severity: ${e}`)}}},Ef={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},A1={none:new Ns,console:new Ls},Cf={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1},vo={"":Cf};(u=>{function n(l,d){u("verbose",l,d)}u.verbose=n;function e(l,d){u("info",l,d)}u.info=e;function r(l,d){u("warning",l,d)}u.warning=r;function t(l,d){u("error",l,d)}u.error=t;function o(l,d){u("fatal",l,d)}u.fatal=o;function i(l){vo={},a("",l||{})}u.reset=i;function a(l,d){if(l==="*")i(d);else{let f=vo[l]||Cf;vo[l]={provider:d.provider||f.provider,minimalSeverity:d.minimalSeverity||f.minimalSeverity,logDateTime:d.logDateTime===void 0?f.logDateTime:d.logDateTime,logSourceLocation:d.logSourceLocation===void 0?f.logSourceLocation:d.logSourceLocation}}}u.set=a;function s(l){let d={};l.logLevel&&(d.minimalSeverity=l.logLevel),a("",d)}u.setWithEnv=s})(sn||={});Fe=sn,fi=class{constructor(e,r,t,o,i,a){this.category=e;this.name=r;this.startTime=t;this.endCallback=o;this.timer=i;this.ctx=a}async end(){return this.endCallback(this)}async checkTimer(){if(this.ctx===void 0||this.timer===void 0)throw new Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},hi=class{constructor(e,r,t,o){this.category=e;this.name=r;this.startTime=t;this.endTime=o}},mi=class{constructor(e,r,t){this._started=!1;this._flushPointer=0;this._started=!1,this._maxNumberEvents=e===void 0?1e4:e,this._flushBatchSize=r===void 0?10:r,this._flushIntervalInMilliseconds=t===void 0?5e3:t}static create(e){return e===void 0?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=pi(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,r,t,o){let i=this._started?this.begin(e,r,o):void 0,a=!1,s=t();if(s&&typeof s.then=="function")return a=!0,new Promise((u,l)=>{s.then(async d=>{i&&await i.end(),u(d)},async d=>{i&&await i.end(),l(d)})});if(!a&&i){let u=i.end();if(u&&typeof u.then=="function")return new Promise((l,d)=>{u.then(()=>{l(s)},f=>{d(f)})})}return s}begin(e,r,t){if(!this._started)throw new Error("profiler is not started yet");if(t===void 0){let o=pi();return this.flush(o),new fi(e,r,o,i=>this.endSync(i))}else{let o=t.beginTimer();return new fi(e,r,0,async i=>this.end(i),o,t)}}async end(e){let r=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new hi(e.category,e.name,e.startTime,r)),this.flush(r))}endSync(e){let r=pi();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new hi(e.category,e.name,e.startTime,r)),this.flush(r))}logOneEvent(e){Fe.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let r=this._flushPointer;this._flushPointer<r+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=pi()}}get started(){return this._started}},pi=typeof performance<"u"&&performance.now?()=>performance.now():Date.now});function Df(n,e,r){for(let t of r){let o=t[0],i=t[1],a=t[2],s=t[3],u=t[4];if(n.opType===o){for(let l of e)if((l.domain===i||l.domain==="ai.onnx"&&i==="")&&P1(l.version,a))return{opImpl:s,opInit:u}}}throw new TypeError(`cannot resolve operator '${n.opType}' with opsets: ${e.map(t=>`${t.domain||"ai.onnx"} v${t.version}`).join(", ")}`)}function P1(n,e){if(e.endsWith("+")){let r=Number.parseInt(e.substring(0,e.length-1),10);return!isNaN(r)&&r<=n}else if(e.split("-").length===2){let r=e.split("-"),t=Number.parseInt(r[0],10),o=Number.parseInt(r[1],10);return!isNaN(t)&&!isNaN(o)&&t<=n&&n<=o}else return Number.parseInt(e,10)===n}var kf=N(()=>{"use strict"});var Nf=ne(Rs=>{"use strict";Rs.__esModule=!0;var E1=function(){function n(e){if(!e)throw new TypeError("Invalid argument; `value` has no value.");this.value=n.EMPTY,e&&n.isGuid(e)&&(this.value=e)}return n.isGuid=function(e){var r=e.toString();return e&&(e instanceof n||n.validator.test(r))},n.create=function(){return new n([n.gen(2),n.gen(1),n.gen(1),n.gen(1),n.gen(3)].join("-"))},n.createEmpty=function(){return new n("emptyguid")},n.parse=function(e){return new n(e)},n.raw=function(){return[n.gen(2),n.gen(1),n.gen(1),n.gen(1),n.gen(3)].join("-")},n.gen=function(e){for(var r="",t=0;t<e;t++)r+=((1+Math.random())*65536|0).toString(16).substring(1);return r},n.prototype.equals=function(e){return n.isGuid(e)&&this.value===e.toString()},n.prototype.isEmpty=function(){return this.value===n.EMPTY},n.prototype.toString=function(){return this.value},n.prototype.toJSON=function(){return{value:this.value}},n.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),n.EMPTY="00000000-0000-0000-0000-000000000000",n}();Rs.Guid=E1});function He(n,e,r){this.low=n|0,this.high=e|0,this.unsigned=!!r}function ht(n){return(n&&n.__isLong__)===!0}function Lf(n){var e=Math.clz32(n&-n);return n?31-e:e}function In(n,e){var r,t,o;return e?(n>>>=0,(o=0<=n&&n<256)&&(t=zf[n],t)?t:(r=Le(n,0,!0),o&&(zf[n]=r),r)):(n|=0,(o=-128<=n&&n<128)&&(t=Rf[n],t)?t:(r=Le(n,n<0?-1:0,!1),o&&(Rf[n]=r),r))}function Lt(n,e){if(isNaN(n))return e?Zr:Ut;if(e){if(n<0)return Zr;if(n>=Vf)return Wf}else{if(n<=-Bf)return _t;if(n+1>=Bf)return Uf}return n<0?Lt(-n,e).neg():Le(n%Zn|0,n/Zn|0,e)}function Le(n,e,r){return new He(n,e,r)}function Ms(n,e,r){if(n.length===0)throw Error("empty string");if(typeof e=="number"?(r=e,e=!1):e=!!e,n==="NaN"||n==="Infinity"||n==="+Infinity"||n==="-Infinity")return e?Zr:Ut;if(r=r||10,r<2||36<r)throw RangeError("radix");var t;if((t=n.indexOf("-"))>0)throw Error("interior hyphen");if(t===0)return Ms(n.substring(1),e,r).neg();for(var o=Lt(gi(r,8)),i=Ut,a=0;a<n.length;a+=8){var s=Math.min(8,n.length-a),u=parseInt(n.substring(a,a+s),r);if(s<8){var l=Lt(gi(r,s));i=i.mul(l).add(Lt(u))}else i=i.mul(o),i=i.add(Lt(u))}return i.unsigned=e,i}function Wt(n,e){return typeof n=="number"?Lt(n,e):typeof n=="string"?Ms(n,e):Le(n.low,n.high,typeof e=="boolean"?e:n.unsigned)}var Nt,Rf,zf,gi,Mf,C1,Zn,Vf,Bf,Ff,Ut,Zr,Xn,Gf,zs,Uf,Wf,_t,H,un,Bs=N(()=>{Nt=null;try{Nt=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}He.prototype.__isLong__;Object.defineProperty(He.prototype,"__isLong__",{value:!0});He.isLong=ht;Rf={},zf={};He.fromInt=In;He.fromNumber=Lt;He.fromBits=Le;gi=Math.pow;He.fromString=Ms;He.fromValue=Wt;Mf=65536,C1=1<<24,Zn=Mf*Mf,Vf=Zn*Zn,Bf=Vf/2,Ff=In(C1),Ut=In(0);He.ZERO=Ut;Zr=In(0,!0);He.UZERO=Zr;Xn=In(1);He.ONE=Xn;Gf=In(1,!0);He.UONE=Gf;zs=In(-1);He.NEG_ONE=zs;Uf=Le(-1,2147483647,!1);He.MAX_VALUE=Uf;Wf=Le(-1,-1,!0);He.MAX_UNSIGNED_VALUE=Wf;_t=Le(0,-2147483648,!1);He.MIN_VALUE=_t;H=He.prototype;H.toInt=function(){return this.unsigned?this.low>>>0:this.low};H.toNumber=function(){return this.unsigned?(this.high>>>0)*Zn+(this.low>>>0):this.high*Zn+(this.low>>>0)};H.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(_t)){var r=Lt(e),t=this.div(r),o=t.mul(r).sub(this);return t.toString(e)+o.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var i=Lt(gi(e,6),this.unsigned),a=this,s="";;){var u=a.div(i),l=a.sub(u.mul(i)).toInt()>>>0,d=l.toString(e);if(a=u,a.isZero())return d+s;for(;d.length<6;)d="0"+d;s=""+d+s}};H.getHighBits=function(){return this.high};H.getHighBitsUnsigned=function(){return this.high>>>0};H.getLowBits=function(){return this.low};H.getLowBitsUnsigned=function(){return this.low>>>0};H.getNumBitsAbs=function(){if(this.isNegative())return this.eq(_t)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,r=31;r>0&&(e&1<<r)==0;r--);return this.high!=0?r+33:r+1};H.isZero=function(){return this.high===0&&this.low===0};H.eqz=H.isZero;H.isNegative=function(){return!this.unsigned&&this.high<0};H.isPositive=function(){return this.unsigned||this.high>=0};H.isOdd=function(){return(this.low&1)===1};H.isEven=function(){return(this.low&1)===0};H.equals=function(e){return ht(e)||(e=Wt(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low};H.eq=H.equals;H.notEquals=function(e){return!this.eq(e)};H.neq=H.notEquals;H.ne=H.notEquals;H.lessThan=function(e){return this.comp(e)<0};H.lt=H.lessThan;H.lessThanOrEqual=function(e){return this.comp(e)<=0};H.lte=H.lessThanOrEqual;H.le=H.lessThanOrEqual;H.greaterThan=function(e){return this.comp(e)>0};H.gt=H.greaterThan;H.greaterThanOrEqual=function(e){return this.comp(e)>=0};H.gte=H.greaterThanOrEqual;H.ge=H.greaterThanOrEqual;H.compare=function(e){if(ht(e)||(e=Wt(e)),this.eq(e))return 0;var r=this.isNegative(),t=e.isNegative();return r&&!t?-1:!r&&t?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1};H.comp=H.compare;H.negate=function(){return!this.unsigned&&this.eq(_t)?_t:this.not().add(Xn)};H.neg=H.negate;H.add=function(e){ht(e)||(e=Wt(e));var r=this.high>>>16,t=this.high&65535,o=this.low>>>16,i=this.low&65535,a=e.high>>>16,s=e.high&65535,u=e.low>>>16,l=e.low&65535,d=0,f=0,m=0,b=0;return b+=i+l,m+=b>>>16,b&=65535,m+=o+u,f+=m>>>16,m&=65535,f+=t+s,d+=f>>>16,f&=65535,d+=r+a,d&=65535,Le(m<<16|b,d<<16|f,this.unsigned)};H.subtract=function(e){return ht(e)||(e=Wt(e)),this.add(e.neg())};H.sub=H.subtract;H.multiply=function(e){if(this.isZero())return this;if(ht(e)||(e=Wt(e)),Nt){var r=Nt.mul(this.low,this.high,e.low,e.high);return Le(r,Nt.get_high(),this.unsigned)}if(e.isZero())return this.unsigned?Zr:Ut;if(this.eq(_t))return e.isOdd()?_t:Ut;if(e.eq(_t))return this.isOdd()?_t:Ut;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(Ff)&&e.lt(Ff))return Lt(this.toNumber()*e.toNumber(),this.unsigned);var t=this.high>>>16,o=this.high&65535,i=this.low>>>16,a=this.low&65535,s=e.high>>>16,u=e.high&65535,l=e.low>>>16,d=e.low&65535,f=0,m=0,b=0,y=0;return y+=a*d,b+=y>>>16,y&=65535,b+=i*d,m+=b>>>16,b&=65535,b+=a*l,m+=b>>>16,b&=65535,m+=o*d,f+=m>>>16,m&=65535,m+=i*l,f+=m>>>16,m&=65535,m+=a*u,f+=m>>>16,m&=65535,f+=t*d+o*l+i*u+a*s,f&=65535,Le(b<<16|y,f<<16|m,this.unsigned)};H.mul=H.multiply;H.divide=function(e){if(ht(e)||(e=Wt(e)),e.isZero())throw Error("division by zero");if(Nt){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var r=(this.unsigned?Nt.div_u:Nt.div_s)(this.low,this.high,e.low,e.high);return Le(r,Nt.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?Zr:Ut;var t,o,i;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return Zr;if(e.gt(this.shru(1)))return Gf;i=Zr}else{if(this.eq(_t)){if(e.eq(Xn)||e.eq(zs))return _t;if(e.eq(_t))return Xn;var a=this.shr(1);return t=a.div(e).shl(1),t.eq(Ut)?e.isNegative()?Xn:zs:(o=this.sub(e.mul(t)),i=t.add(o.div(e)),i)}else if(e.eq(_t))return this.unsigned?Zr:Ut;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();i=Ut}for(o=this;o.gte(e);){t=Math.max(1,Math.floor(o.toNumber()/e.toNumber()));for(var s=Math.ceil(Math.log(t)/Math.LN2),u=s<=48?1:gi(2,s-48),l=Lt(t),d=l.mul(e);d.isNegative()||d.gt(o);)t-=u,l=Lt(t,this.unsigned),d=l.mul(e);l.isZero()&&(l=Xn),i=i.add(l),o=o.sub(d)}return i};H.div=H.divide;H.modulo=function(e){if(ht(e)||(e=Wt(e)),Nt){var r=(this.unsigned?Nt.rem_u:Nt.rem_s)(this.low,this.high,e.low,e.high);return Le(r,Nt.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))};H.mod=H.modulo;H.rem=H.modulo;H.not=function(){return Le(~this.low,~this.high,this.unsigned)};H.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32};H.clz=H.countLeadingZeros;H.countTrailingZeros=function(){return this.low?Lf(this.low):Lf(this.high)+32};H.ctz=H.countTrailingZeros;H.and=function(e){return ht(e)||(e=Wt(e)),Le(this.low&e.low,this.high&e.high,this.unsigned)};H.or=function(e){return ht(e)||(e=Wt(e)),Le(this.low|e.low,this.high|e.high,this.unsigned)};H.xor=function(e){return ht(e)||(e=Wt(e)),Le(this.low^e.low,this.high^e.high,this.unsigned)};H.shiftLeft=function(e){return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Le(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):Le(0,this.low<<e-32,this.unsigned)};H.shl=H.shiftLeft;H.shiftRight=function(e){return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Le(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):Le(this.high>>e-32,this.high>=0?0:-1,this.unsigned)};H.shr=H.shiftRight;H.shiftRightUnsigned=function(e){return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Le(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):e===32?Le(this.high,0,this.unsigned):Le(this.high>>>e-32,0,this.unsigned)};H.shru=H.shiftRightUnsigned;H.shr_u=H.shiftRightUnsigned;H.rotateLeft=function(e){var r;return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Le(this.high,this.low,this.unsigned):e<32?(r=32-e,Le(this.low<<e|this.high>>>r,this.high<<e|this.low>>>r,this.unsigned)):(e-=32,r=32-e,Le(this.high<<e|this.low>>>r,this.low<<e|this.high>>>r,this.unsigned))};H.rotl=H.rotateLeft;H.rotateRight=function(e){var r;return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Le(this.high,this.low,this.unsigned):e<32?(r=32-e,Le(this.high<<r|this.low>>>e,this.low<<r|this.high>>>e,this.unsigned)):(e-=32,r=32-e,Le(this.low<<r|this.high>>>e,this.high<<r|this.low>>>e,this.unsigned))};H.rotr=H.rotateRight;H.toSigned=function(){return this.unsigned?Le(this.low,this.high,!1):this};H.toUnsigned=function(){return this.unsigned?this:Le(this.low,this.high,!0)};H.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()};H.toBytesLE=function(){var e=this.high,r=this.low;return[r&255,r>>>8&255,r>>>16&255,r>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]};H.toBytesBE=function(){var e=this.high,r=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,r>>>24,r>>>16&255,r>>>8&255,r&255]};He.fromBytes=function(e,r,t){return t?He.fromBytesLE(e,r):He.fromBytesBE(e,r)};He.fromBytesLE=function(e,r){return new He(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,r)};He.fromBytesBE=function(e,r){return new He(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],r)};un=He});var Fs=ne(bi=>{"use strict";Object.defineProperty(bi,"__esModule",{value:!0});bi.ArgType=void 0;var Hf;(function(n){n[n.INPUT=0]="INPUT",n[n.OUTPUT=1]="OUTPUT"})(Hf||(bi.ArgType=Hf={}))});var Sn=ne(rr=>{"use strict";Object.defineProperty(rr,"__esModule",{value:!0});rr.SIZE_PREFIX_LENGTH=rr.FILE_IDENTIFIER_LENGTH=rr.SIZEOF_INT=rr.SIZEOF_SHORT=void 0;rr.SIZEOF_SHORT=2;rr.SIZEOF_INT=4;rr.FILE_IDENTIFIER_LENGTH=4;rr.SIZE_PREFIX_LENGTH=4});var Vs=ne(Rt=>{"use strict";Object.defineProperty(Rt,"__esModule",{value:!0});Rt.isLittleEndian=Rt.float64=Rt.float32=Rt.int32=void 0;Rt.int32=new Int32Array(2);Rt.float32=new Float32Array(Rt.int32.buffer);Rt.float64=new Float64Array(Rt.int32.buffer);Rt.isLittleEndian=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1});var Gs=ne(yi=>{"use strict";Object.defineProperty(yi,"__esModule",{value:!0});yi.Encoding=void 0;var qf;(function(n){n[n.UTF8_BYTES=1]="UTF8_BYTES",n[n.UTF16_STRING=2]="UTF16_STRING"})(qf||(yi.Encoding=qf={}))});var Ws=ne(_i=>{"use strict";Object.defineProperty(_i,"__esModule",{value:!0});_i.ByteBuffer=void 0;var nr=Sn(),vt=Vs(),D1=Gs(),Us=class n{constructor(e){this.bytes_=e,this.position_=0,this.text_decoder_=new TextDecoder}static allocate(e){return new n(new Uint8Array(e))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(e){this.position_=e}capacity(){return this.bytes_.length}readInt8(e){return this.readUint8(e)<<24>>24}readUint8(e){return this.bytes_[e]}readInt16(e){return this.readUint16(e)<<16>>16}readUint16(e){return this.bytes_[e]|this.bytes_[e+1]<<8}readInt32(e){return this.bytes_[e]|this.bytes_[e+1]<<8|this.bytes_[e+2]<<16|this.bytes_[e+3]<<24}readUint32(e){return this.readInt32(e)>>>0}readInt64(e){return BigInt.asIntN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readUint64(e){return BigInt.asUintN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readFloat32(e){return vt.int32[0]=this.readInt32(e),vt.float32[0]}readFloat64(e){return vt.int32[vt.isLittleEndian?0:1]=this.readInt32(e),vt.int32[vt.isLittleEndian?1:0]=this.readInt32(e+4),vt.float64[0]}writeInt8(e,r){this.bytes_[e]=r}writeUint8(e,r){this.bytes_[e]=r}writeInt16(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8}writeUint16(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8}writeInt32(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8,this.bytes_[e+2]=r>>16,this.bytes_[e+3]=r>>24}writeUint32(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8,this.bytes_[e+2]=r>>16,this.bytes_[e+3]=r>>24}writeInt64(e,r){this.writeInt32(e,Number(BigInt.asIntN(32,r))),this.writeInt32(e+4,Number(BigInt.asIntN(32,r>>BigInt(32))))}writeUint64(e,r){this.writeUint32(e,Number(BigInt.asUintN(32,r))),this.writeUint32(e+4,Number(BigInt.asUintN(32,r>>BigInt(32))))}writeFloat32(e,r){vt.float32[0]=r,this.writeInt32(e,vt.int32[0])}writeFloat64(e,r){vt.float64[0]=r,this.writeInt32(e,vt.int32[vt.isLittleEndian?0:1]),this.writeInt32(e+4,vt.int32[vt.isLittleEndian?1:0])}getBufferIdentifier(){if(this.bytes_.length<this.position_+nr.SIZEOF_INT+nr.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let e="";for(let r=0;r<nr.FILE_IDENTIFIER_LENGTH;r++)e+=String.fromCharCode(this.readInt8(this.position_+nr.SIZEOF_INT+r));return e}__offset(e,r){let t=e-this.readInt32(e);return r<this.readInt16(t)?this.readInt16(t+r):0}__union(e,r){return e.bb_pos=r+this.readInt32(r),e.bb=this,e}__string(e,r){e+=this.readInt32(e);let t=this.readInt32(e);e+=nr.SIZEOF_INT;let o=this.bytes_.subarray(e,e+t);return r===D1.Encoding.UTF8_BYTES?o:this.text_decoder_.decode(o)}__union_with_string(e,r){return typeof e=="string"?this.__string(r):this.__union(e,r)}__indirect(e){return e+this.readInt32(e)}__vector(e){return e+this.readInt32(e)+nr.SIZEOF_INT}__vector_len(e){return this.readInt32(e+this.readInt32(e))}__has_identifier(e){if(e.length!=nr.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+nr.FILE_IDENTIFIER_LENGTH);for(let r=0;r<nr.FILE_IDENTIFIER_LENGTH;r++)if(e.charCodeAt(r)!=this.readInt8(this.position()+nr.SIZEOF_INT+r))return!1;return!0}createScalarList(e,r){let t=[];for(let o=0;o<r;++o){let i=e(o);i!==null&&t.push(i)}return t}createObjList(e,r){let t=[];for(let o=0;o<r;++o){let i=e(o);i!==null&&t.push(i.unpack())}return t}};_i.ByteBuffer=Us});var Kf=ne(vi=>{"use strict";Object.defineProperty(vi,"__esModule",{value:!0});vi.Builder=void 0;var jf=Ws(),Ot=Sn(),Hs=class n{constructor(e){this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null,this.text_encoder=new TextEncoder;let r;e?r=e:r=1024,this.bb=jf.ByteBuffer.allocate(r),this.space=r}clear(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null}forceDefaults(e){this.force_defaults=e}dataBuffer(){return this.bb}asUint8Array(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())}prep(e,r){e>this.minalign&&(this.minalign=e);let t=~(this.bb.capacity()-this.space+r)+1&e-1;for(;this.space<t+e+r;){let o=this.bb.capacity();this.bb=n.growByteBuffer(this.bb),this.space+=this.bb.capacity()-o}this.pad(t)}pad(e){for(let r=0;r<e;r++)this.bb.writeInt8(--this.space,0)}writeInt8(e){this.bb.writeInt8(this.space-=1,e)}writeInt16(e){this.bb.writeInt16(this.space-=2,e)}writeInt32(e){this.bb.writeInt32(this.space-=4,e)}writeInt64(e){this.bb.writeInt64(this.space-=8,e)}writeFloat32(e){this.bb.writeFloat32(this.space-=4,e)}writeFloat64(e){this.bb.writeFloat64(this.space-=8,e)}addInt8(e){this.prep(1,0),this.writeInt8(e)}addInt16(e){this.prep(2,0),this.writeInt16(e)}addInt32(e){this.prep(4,0),this.writeInt32(e)}addInt64(e){this.prep(8,0),this.writeInt64(e)}addFloat32(e){this.prep(4,0),this.writeFloat32(e)}addFloat64(e){this.prep(8,0),this.writeFloat64(e)}addFieldInt8(e,r,t){(this.force_defaults||r!=t)&&(this.addInt8(r),this.slot(e))}addFieldInt16(e,r,t){(this.force_defaults||r!=t)&&(this.addInt16(r),this.slot(e))}addFieldInt32(e,r,t){(this.force_defaults||r!=t)&&(this.addInt32(r),this.slot(e))}addFieldInt64(e,r,t){(this.force_defaults||r!==t)&&(this.addInt64(r),this.slot(e))}addFieldFloat32(e,r,t){(this.force_defaults||r!=t)&&(this.addFloat32(r),this.slot(e))}addFieldFloat64(e,r,t){(this.force_defaults||r!=t)&&(this.addFloat64(r),this.slot(e))}addFieldOffset(e,r,t){(this.force_defaults||r!=t)&&(this.addOffset(r),this.slot(e))}addFieldStruct(e,r,t){r!=t&&(this.nested(r),this.slot(e))}nested(e){if(e!=this.offset())throw new TypeError("FlatBuffers: struct must be serialized inline.")}notNested(){if(this.isNested)throw new TypeError("FlatBuffers: object serialization must not be nested.")}slot(e){this.vtable!==null&&(this.vtable[e]=this.offset())}offset(){return this.bb.capacity()-this.space}static growByteBuffer(e){let r=e.capacity();if(r&3221225472)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");let t=r<<1,o=jf.ByteBuffer.allocate(t);return o.setPosition(t-r),o.bytes().set(e.bytes(),t-r),o}addOffset(e){this.prep(Ot.SIZEOF_INT,0),this.writeInt32(this.offset()-e+Ot.SIZEOF_INT)}startObject(e){this.notNested(),this.vtable==null&&(this.vtable=[]),this.vtable_in_use=e;for(let r=0;r<e;r++)this.vtable[r]=0;this.isNested=!0,this.object_start=this.offset()}endObject(){if(this.vtable==null||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);let e=this.offset(),r=this.vtable_in_use-1;for(;r>=0&&this.vtable[r]==0;r--);let t=r+1;for(;r>=0;r--)this.addInt16(this.vtable[r]!=0?e-this.vtable[r]:0);let o=2;this.addInt16(e-this.object_start);let i=(t+o)*Ot.SIZEOF_SHORT;this.addInt16(i);let a=0,s=this.space;e:for(r=0;r<this.vtables.length;r++){let u=this.bb.capacity()-this.vtables[r];if(i==this.bb.readInt16(u)){for(let l=Ot.SIZEOF_SHORT;l<i;l+=Ot.SIZEOF_SHORT)if(this.bb.readInt16(s+l)!=this.bb.readInt16(u+l))continue e;a=this.vtables[r];break}}return a?(this.space=this.bb.capacity()-e,this.bb.writeInt32(this.space,a-e)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-e,this.offset()-e)),this.isNested=!1,e}finish(e,r,t){let o=t?Ot.SIZE_PREFIX_LENGTH:0;if(r){let i=r;if(this.prep(this.minalign,Ot.SIZEOF_INT+Ot.FILE_IDENTIFIER_LENGTH+o),i.length!=Ot.FILE_IDENTIFIER_LENGTH)throw new TypeError("FlatBuffers: file identifier must be length "+Ot.FILE_IDENTIFIER_LENGTH);for(let a=Ot.FILE_IDENTIFIER_LENGTH-1;a>=0;a--)this.writeInt8(i.charCodeAt(a))}this.prep(this.minalign,Ot.SIZEOF_INT+o),this.addOffset(e),o&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)}finishSizePrefixed(e,r){this.finish(e,r,!0)}requiredField(e,r){let t=this.bb.capacity()-e,o=t-this.bb.readInt32(t);if(!(r<this.bb.readInt16(o)&&this.bb.readInt16(o+r)!=0))throw new TypeError("FlatBuffers: field "+r+" must be set")}startVector(e,r,t){this.notNested(),this.vector_num_elems=r,this.prep(Ot.SIZEOF_INT,e*r),this.prep(t,e*r)}endVector(){return this.writeInt32(this.vector_num_elems),this.offset()}createSharedString(e){if(!e)return 0;if(this.string_maps||(this.string_maps=new Map),this.string_maps.has(e))return this.string_maps.get(e);let r=this.createString(e);return this.string_maps.set(e,r),r}createString(e){if(e==null)return 0;let r;return e instanceof Uint8Array?r=e:r=this.text_encoder.encode(e),this.addInt8(0),this.startVector(1,r.length,1),this.bb.setPosition(this.space-=r.length),this.bb.bytes().set(r,this.space),this.endVector()}createByteVector(e){return e==null?0:(this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length),this.bb.bytes().set(e,this.space),this.endVector())}createObjectOffset(e){return e===null?0:typeof e=="string"?this.createString(e):e.pack(this)}createObjectOffsetList(e){let r=[];for(let t=0;t<e.length;++t){let o=e[t];if(o!==null)r.push(this.createObjectOffset(o));else throw new TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.")}return r}createStructOffsetList(e,r){return r(this,e.length),this.createObjectOffsetList(e.slice().reverse()),this.endVector()}};vi.Builder=Hs});var Re=ne(Je=>{"use strict";Object.defineProperty(Je,"__esModule",{value:!0});Je.ByteBuffer=Je.Builder=Je.Encoding=Je.isLittleEndian=Je.float64=Je.float32=Je.int32=Je.SIZE_PREFIX_LENGTH=Je.FILE_IDENTIFIER_LENGTH=Je.SIZEOF_INT=Je.SIZEOF_SHORT=void 0;var k1=Sn();Object.defineProperty(Je,"SIZEOF_SHORT",{enumerable:!0,get:function(){return k1.SIZEOF_SHORT}});var N1=Sn();Object.defineProperty(Je,"SIZEOF_INT",{enumerable:!0,get:function(){return N1.SIZEOF_INT}});var L1=Sn();Object.defineProperty(Je,"FILE_IDENTIFIER_LENGTH",{enumerable:!0,get:function(){return L1.FILE_IDENTIFIER_LENGTH}});var R1=Sn();Object.defineProperty(Je,"SIZE_PREFIX_LENGTH",{enumerable:!0,get:function(){return R1.SIZE_PREFIX_LENGTH}});var wi=Vs();Object.defineProperty(Je,"int32",{enumerable:!0,get:function(){return wi.int32}});Object.defineProperty(Je,"float32",{enumerable:!0,get:function(){return wi.float32}});Object.defineProperty(Je,"float64",{enumerable:!0,get:function(){return wi.float64}});Object.defineProperty(Je,"isLittleEndian",{enumerable:!0,get:function(){return wi.isLittleEndian}});var z1=Gs();Object.defineProperty(Je,"Encoding",{enumerable:!0,get:function(){return z1.Encoding}});var M1=Kf();Object.defineProperty(Je,"Builder",{enumerable:!0,get:function(){return M1.Builder}});var B1=Ws();Object.defineProperty(Je,"ByteBuffer",{enumerable:!0,get:function(){return B1.ByteBuffer}})});var js=ne(or=>{"use strict";var F1=or&&or.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),V1=or&&or.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),G1=or&&or.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&F1(e,n,r);return V1(e,n),e};Object.defineProperty(or,"__esModule",{value:!0});or.ArgTypeAndIndex=void 0;var U1=G1(Re()),Xf=Fs(),qs=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsArgTypeAndIndex(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsArgTypeAndIndex(e,r){return e.setPosition(e.position()+U1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}argType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):Xf.ArgType.INPUT}index(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}static startArgTypeAndIndex(e){e.startObject(2)}static addArgType(e,r){e.addFieldInt8(0,r,Xf.ArgType.INPUT)}static addIndex(e,r){e.addFieldInt32(1,r,0)}static endArgTypeAndIndex(e){return e.endObject()}static createArgTypeAndIndex(e,r,t){return n.startArgTypeAndIndex(e),n.addArgType(e,r),n.addIndex(e,t),n.endArgTypeAndIndex(e)}};or.ArgTypeAndIndex=qs});var Ks=ne(xi=>{"use strict";Object.defineProperty(xi,"__esModule",{value:!0});xi.AttributeType=void 0;var Zf;(function(n){n[n.UNDEFINED=0]="UNDEFINED",n[n.FLOAT=1]="FLOAT",n[n.INT=2]="INT",n[n.STRING=3]="STRING",n[n.TENSOR=4]="TENSOR",n[n.GRAPH=5]="GRAPH",n[n.FLOATS=6]="FLOATS",n[n.INTS=7]="INTS",n[n.STRINGS=8]="STRINGS",n[n.TENSORS=9]="TENSORS",n[n.GRAPHS=10]="GRAPHS",n[n.SPARSE_TENSOR=11]="SPARSE_TENSOR",n[n.SPARSE_TENSORS=12]="SPARSE_TENSORS"})(Zf||(xi.AttributeType=Zf={}))});var Xs=ne(Ti=>{"use strict";Object.defineProperty(Ti,"__esModule",{value:!0});Ti.NodeType=void 0;var Jf;(function(n){n[n.Primitive=0]="Primitive",n[n.Fused=1]="Fused"})(Jf||(Ti.NodeType=Jf={}))});var Js=ne(ir=>{"use strict";var W1=ir&&ir.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),H1=ir&&ir.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),q1=ir&&ir.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&W1(e,n,r);return H1(e,n),e};Object.defineProperty(ir,"__esModule",{value:!0});ir.Node=void 0;var j1=q1(Re()),K1=Ys(),Yf=Xs(),Zs=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNode(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNode(e,r){return e.setPosition(e.position()+j1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}domain(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}sinceVersion(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):0}index(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readUint32(this.bb_pos+e):0}opType(e){let r=this.bb.__offset(this.bb_pos,14);return r?this.bb.__string(this.bb_pos+r,e):null}type(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt32(this.bb_pos+e):Yf.NodeType.Primitive}executionProviderType(e){let r=this.bb.__offset(this.bb_pos,18);return r?this.bb.__string(this.bb_pos+r,e):null}inputs(e,r){let t=this.bb.__offset(this.bb_pos,20);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,r){let t=this.bb.__offset(this.bb_pos,22);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}attributes(e,r){let t=this.bb.__offset(this.bb_pos,24);return t?(r||new K1.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}attributesLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCounts(e){let r=this.bb.__offset(this.bb_pos,26);return r?this.bb.readInt32(this.bb.__vector(this.bb_pos+r)+e*4):0}inputArgCountsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCountsArray(){let e=this.bb.__offset(this.bb_pos,26);return e?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}implicitInputs(e,r){let t=this.bb.__offset(this.bb_pos,28);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}implicitInputsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNode(e){e.startObject(13)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addDomain(e,r){e.addFieldOffset(2,r,0)}static addSinceVersion(e,r){e.addFieldInt32(3,r,0)}static addIndex(e,r){e.addFieldInt32(4,r,0)}static addOpType(e,r){e.addFieldOffset(5,r,0)}static addType(e,r){e.addFieldInt32(6,r,Yf.NodeType.Primitive)}static addExecutionProviderType(e,r){e.addFieldOffset(7,r,0)}static addInputs(e,r){e.addFieldOffset(8,r,0)}static createInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInputsVector(e,r){e.startVector(4,r,4)}static addOutputs(e,r){e.addFieldOffset(9,r,0)}static createOutputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOutputsVector(e,r){e.startVector(4,r,4)}static addAttributes(e,r){e.addFieldOffset(10,r,0)}static createAttributesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startAttributesVector(e,r){e.startVector(4,r,4)}static addInputArgCounts(e,r){e.addFieldOffset(11,r,0)}static createInputArgCountsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addInt32(r[t]);return e.endVector()}static startInputArgCountsVector(e,r){e.startVector(4,r,4)}static addImplicitInputs(e,r){e.addFieldOffset(12,r,0)}static createImplicitInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startImplicitInputsVector(e,r){e.startVector(4,r,4)}static endNode(e){return e.endObject()}static createNode(e,r,t,o,i,a,s,u,l,d,f,m,b,y){return n.startNode(e),n.addName(e,r),n.addDocString(e,t),n.addDomain(e,o),n.addSinceVersion(e,i),n.addIndex(e,a),n.addOpType(e,s),n.addType(e,u),n.addExecutionProviderType(e,l),n.addInputs(e,d),n.addOutputs(e,f),n.addAttributes(e,m),n.addInputArgCounts(e,b),n.addImplicitInputs(e,y),n.endNode(e)}};ir.Node=Zs});var eu=ne(Ii=>{"use strict";Object.defineProperty(Ii,"__esModule",{value:!0});Ii.EdgeEnd=void 0;var Qs=class{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static sizeOf(){return 12}static createEdgeEnd(e,r,t,o){return e.prep(4,12),e.writeInt32(o),e.writeInt32(t),e.writeInt32(r),e.offset()}};Ii.EdgeEnd=Qs});var ru=ne(ar=>{"use strict";var X1=ar&&ar.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),Z1=ar&&ar.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),J1=ar&&ar.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&X1(e,n,r);return Z1(e,n),e};Object.defineProperty(ar,"__esModule",{value:!0});ar.NodeEdge=void 0;var Y1=J1(Re()),Qf=eu(),tu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNodeEdge(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodeEdge(e,r){return e.setPosition(e.position()+Y1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}inputEdges(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new Qf.EdgeEnd).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}inputEdgesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}outputEdges(e,r){let t=this.bb.__offset(this.bb_pos,8);return t?(r||new Qf.EdgeEnd).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}outputEdgesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNodeEdge(e){e.startObject(3)}static addNodeIndex(e,r){e.addFieldInt32(0,r,0)}static addInputEdges(e,r){e.addFieldOffset(1,r,0)}static startInputEdgesVector(e,r){e.startVector(12,r,4)}static addOutputEdges(e,r){e.addFieldOffset(2,r,0)}static startOutputEdgesVector(e,r){e.startVector(12,r,4)}static endNodeEdge(e){return e.endObject()}static createNodeEdge(e,r,t,o){return n.startNodeEdge(e),n.addNodeIndex(e,r),n.addInputEdges(e,t),n.addOutputEdges(e,o),n.endNodeEdge(e)}};ar.NodeEdge=tu});var ou=ne(sr=>{"use strict";var Q1=sr&&sr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),eI=sr&&sr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),tI=sr&&sr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&Q1(e,n,r);return eI(e,n),e};Object.defineProperty(sr,"__esModule",{value:!0});sr.NodesToOptimizeIndices=void 0;var rI=tI(Re()),nu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNodesToOptimizeIndices(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodesToOptimizeIndices(e,r){return e.setPosition(e.position()+rI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndices(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.readUint32(this.bb.__vector(this.bb_pos+r)+e*4):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}numInputs(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}numOutputs(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readUint32(this.bb_pos+e):0}hasVariadicInput(){let e=this.bb.__offset(this.bb_pos,10);return e?!!this.bb.readInt8(this.bb_pos+e):!1}hasVariadicOutput(){let e=this.bb.__offset(this.bb_pos,12);return e?!!this.bb.readInt8(this.bb_pos+e):!1}numVariadicInputs(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readUint32(this.bb_pos+e):0}numVariadicOutputs(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readUint32(this.bb_pos+e):0}static startNodesToOptimizeIndices(e){e.startObject(7)}static addNodeIndices(e,r){e.addFieldOffset(0,r,0)}static createNodeIndicesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addInt32(r[t]);return e.endVector()}static startNodeIndicesVector(e,r){e.startVector(4,r,4)}static addNumInputs(e,r){e.addFieldInt32(1,r,0)}static addNumOutputs(e,r){e.addFieldInt32(2,r,0)}static addHasVariadicInput(e,r){e.addFieldInt8(3,+r,0)}static addHasVariadicOutput(e,r){e.addFieldInt8(4,+r,0)}static addNumVariadicInputs(e,r){e.addFieldInt32(5,r,0)}static addNumVariadicOutputs(e,r){e.addFieldInt32(6,r,0)}static endNodesToOptimizeIndices(e){return e.endObject()}static createNodesToOptimizeIndices(e,r,t,o,i,a,s,u){return n.startNodesToOptimizeIndices(e),n.addNodeIndices(e,r),n.addNumInputs(e,t),n.addNumOutputs(e,o),n.addHasVariadicInput(e,i),n.addHasVariadicOutput(e,a),n.addNumVariadicInputs(e,s),n.addNumVariadicOutputs(e,u),n.endNodesToOptimizeIndices(e)}};sr.NodesToOptimizeIndices=nu});var au=ne(ur=>{"use strict";var nI=ur&&ur.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),oI=ur&&ur.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),iI=ur&&ur.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&nI(e,n,r);return oI(e,n),e};Object.defineProperty(ur,"__esModule",{value:!0});ur.RuntimeOptimizationRecord=void 0;var aI=iI(Re()),sI=ou(),iu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizationRecord(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecord(e,r){return e.setPosition(e.position()+aI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}actionId(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}nodesToOptimizeIndices(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new sI.NodesToOptimizeIndices).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}producedOpIds(e,r){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}producedOpIdsLength(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecord(e){e.startObject(4)}static addActionId(e,r){e.addFieldOffset(0,r,0)}static addNodesToOptimizeIndices(e,r){e.addFieldOffset(1,r,0)}static addProducedOpIds(e,r){e.addFieldOffset(3,r,0)}static createProducedOpIdsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startProducedOpIdsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizationRecord(e){return e.endObject()}};ur.RuntimeOptimizationRecord=iu});var uu=ne(lr=>{"use strict";var uI=lr&&lr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),lI=lr&&lr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),cI=lr&&lr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&uI(e,n,r);return lI(e,n),e};Object.defineProperty(lr,"__esModule",{value:!0});lr.RuntimeOptimizationRecordContainerEntry=void 0;var dI=cI(Re()),pI=au(),su=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizationRecordContainerEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecordContainerEntry(e,r){return e.setPosition(e.position()+dI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}optimizerName(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}runtimeOptimizationRecords(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new pI.RuntimeOptimizationRecord).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}runtimeOptimizationRecordsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecordContainerEntry(e){e.startObject(2)}static addOptimizerName(e,r){e.addFieldOffset(0,r,0)}static addRuntimeOptimizationRecords(e,r){e.addFieldOffset(1,r,0)}static createRuntimeOptimizationRecordsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startRuntimeOptimizationRecordsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizationRecordContainerEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createRuntimeOptimizationRecordContainerEntry(e,r,t){return n.startRuntimeOptimizationRecordContainerEntry(e),n.addOptimizerName(e,r),n.addRuntimeOptimizationRecords(e,t),n.endRuntimeOptimizationRecordContainerEntry(e)}};lr.RuntimeOptimizationRecordContainerEntry=su});var cu=ne(cr=>{"use strict";var fI=cr&&cr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),hI=cr&&cr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),mI=cr&&cr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&fI(e,n,r);return hI(e,n),e};Object.defineProperty(cr,"__esModule",{value:!0});cr.RuntimeOptimizations=void 0;var gI=mI(Re()),bI=uu(),lu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizations(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizations(e,r){return e.setPosition(e.position()+gI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}records(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new bI.RuntimeOptimizationRecordContainerEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}recordsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizations(e){e.startObject(1)}static addRecords(e,r){e.addFieldOffset(0,r,0)}static createRecordsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startRecordsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizations(e){return e.endObject()}static createRuntimeOptimizations(e,r){return n.startRuntimeOptimizations(e),n.addRecords(e,r),n.endRuntimeOptimizations(e)}};cr.RuntimeOptimizations=lu});var wo=ne(Si=>{"use strict";Object.defineProperty(Si,"__esModule",{value:!0});Si.TensorDataType=void 0;var eh;(function(n){n[n.UNDEFINED=0]="UNDEFINED",n[n.FLOAT=1]="FLOAT",n[n.UINT8=2]="UINT8",n[n.INT8=3]="INT8",n[n.UINT16=4]="UINT16",n[n.INT16=5]="INT16",n[n.INT32=6]="INT32",n[n.INT64=7]="INT64",n[n.STRING=8]="STRING",n[n.BOOL=9]="BOOL",n[n.FLOAT16=10]="FLOAT16",n[n.DOUBLE=11]="DOUBLE",n[n.UINT32=12]="UINT32",n[n.UINT64=13]="UINT64",n[n.COMPLEX64=14]="COMPLEX64",n[n.COMPLEX128=15]="COMPLEX128",n[n.BFLOAT16=16]="BFLOAT16",n[n.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",n[n.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",n[n.FLOAT8E5M2=19]="FLOAT8E5M2",n[n.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"})(eh||(Si.TensorDataType=eh={}))});var xo=ne(dr=>{"use strict";var yI=dr&&dr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),_I=dr&&dr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),vI=dr&&dr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&yI(e,n,r);return _I(e,n),e};Object.defineProperty(dr,"__esModule",{value:!0});dr.Tensor=void 0;var wI=vI(Re()),th=wo(),du=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTensor(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensor(e,r){return e.setPosition(e.position()+wI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}dims(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}dataType(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):th.TensorDataType.UNDEFINED}rawData(e){let r=this.bb.__offset(this.bb_pos,12);return r?this.bb.readUint8(this.bb.__vector(this.bb_pos+r)+e):0}rawDataLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}rawDataArray(){let e=this.bb.__offset(this.bb_pos,12);return e?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}stringData(e,r){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}stringDataLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}externalDataOffset(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt64(this.bb_pos+e):BigInt("-1")}static startTensor(e){e.startObject(7)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addDims(e,r){e.addFieldOffset(2,r,0)}static createDimsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startDimsVector(e,r){e.startVector(8,r,8)}static addDataType(e,r){e.addFieldInt32(3,r,th.TensorDataType.UNDEFINED)}static addRawData(e,r){e.addFieldOffset(4,r,0)}static createRawDataVector(e,r){e.startVector(1,r.length,1);for(let t=r.length-1;t>=0;t--)e.addInt8(r[t]);return e.endVector()}static startRawDataVector(e,r){e.startVector(1,r,1)}static addStringData(e,r){e.addFieldOffset(5,r,0)}static createStringDataVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startStringDataVector(e,r){e.startVector(4,r,4)}static addExternalDataOffset(e,r){e.addFieldInt64(6,r,BigInt("-1"))}static endTensor(e){return e.endObject()}static createTensor(e,r,t,o,i,a,s,u){return n.startTensor(e),n.addName(e,r),n.addDocString(e,t),n.addDims(e,o),n.addDataType(e,i),n.addRawData(e,a),n.addStringData(e,s),n.addExternalDataOffset(e,u),n.endTensor(e)}};dr.Tensor=du});var fu=ne(pr=>{"use strict";var xI=pr&&pr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),TI=pr&&pr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),II=pr&&pr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&xI(e,n,r);return TI(e,n),e};Object.defineProperty(pr,"__esModule",{value:!0});pr.SparseTensor=void 0;var SI=II(Re()),rh=xo(),pu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsSparseTensor(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsSparseTensor(e,r){return e.setPosition(e.position()+SI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}values(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new rh.Tensor).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}indices(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new rh.Tensor).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}dims(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startSparseTensor(e){e.startObject(3)}static addValues(e,r){e.addFieldOffset(0,r,0)}static addIndices(e,r){e.addFieldOffset(1,r,0)}static addDims(e,r){e.addFieldOffset(2,r,0)}static createDimsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startDimsVector(e,r){e.startVector(8,r,8)}static endSparseTensor(e){return e.endObject()}};pr.SparseTensor=pu});var mu=ne(fr=>{"use strict";var $I=fr&&fr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),AI=fr&&fr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),OI=fr&&fr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&$I(e,n,r);return AI(e,n),e};Object.defineProperty(fr,"__esModule",{value:!0});fr.MapType=void 0;var PI=OI(Re()),nh=wo(),EI=To(),hu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsMapType(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsMapType(e,r){return e.setPosition(e.position()+PI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}keyType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):nh.TensorDataType.UNDEFINED}valueType(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new EI.TypeInfo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startMapType(e){e.startObject(2)}static addKeyType(e,r){e.addFieldInt32(0,r,nh.TensorDataType.UNDEFINED)}static addValueType(e,r){e.addFieldOffset(1,r,0)}static endMapType(e){return e.endObject()}};fr.MapType=hu});var bu=ne(hr=>{"use strict";var CI=hr&&hr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),DI=hr&&hr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),kI=hr&&hr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&CI(e,n,r);return DI(e,n),e};Object.defineProperty(hr,"__esModule",{value:!0});hr.SequenceType=void 0;var NI=kI(Re()),LI=To(),gu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsSequenceType(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsSequenceType(e,r){return e.setPosition(e.position()+NI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}elemType(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new LI.TypeInfo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startSequenceType(e){e.startObject(1)}static addElemType(e,r){e.addFieldOffset(0,r,0)}static endSequenceType(e){return e.endObject()}static createSequenceType(e,r){return n.startSequenceType(e),n.addElemType(e,r),n.endSequenceType(e)}};hr.SequenceType=gu});var yu=ne($i=>{"use strict";Object.defineProperty($i,"__esModule",{value:!0});$i.DimensionValueType=void 0;var oh;(function(n){n[n.UNKNOWN=0]="UNKNOWN",n[n.VALUE=1]="VALUE",n[n.PARAM=2]="PARAM"})(oh||($i.DimensionValueType=oh={}))});var vu=ne(mr=>{"use strict";var RI=mr&&mr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),zI=mr&&mr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),MI=mr&&mr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&RI(e,n,r);return zI(e,n),e};Object.defineProperty(mr,"__esModule",{value:!0});mr.DimensionValue=void 0;var BI=MI(Re()),ih=yu(),_u=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDimensionValue(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimensionValue(e,r){return e.setPosition(e.position()+BI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}dimType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):ih.DimensionValueType.UNKNOWN}dimValue(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}dimParam(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}static startDimensionValue(e){e.startObject(3)}static addDimType(e,r){e.addFieldInt8(0,r,ih.DimensionValueType.UNKNOWN)}static addDimValue(e,r){e.addFieldInt64(1,r,BigInt("0"))}static addDimParam(e,r){e.addFieldOffset(2,r,0)}static endDimensionValue(e){return e.endObject()}static createDimensionValue(e,r,t,o){return n.startDimensionValue(e),n.addDimType(e,r),n.addDimValue(e,t),n.addDimParam(e,o),n.endDimensionValue(e)}};mr.DimensionValue=_u});var xu=ne(gr=>{"use strict";var FI=gr&&gr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),VI=gr&&gr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),GI=gr&&gr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&FI(e,n,r);return VI(e,n),e};Object.defineProperty(gr,"__esModule",{value:!0});gr.Dimension=void 0;var UI=GI(Re()),WI=vu(),wu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDimension(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimension(e,r){return e.setPosition(e.position()+UI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}value(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new WI.DimensionValue).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}denotation(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}static startDimension(e){e.startObject(2)}static addValue(e,r){e.addFieldOffset(0,r,0)}static addDenotation(e,r){e.addFieldOffset(1,r,0)}static endDimension(e){return e.endObject()}static createDimension(e,r,t){return n.startDimension(e),n.addValue(e,r),n.addDenotation(e,t),n.endDimension(e)}};gr.Dimension=wu});var Iu=ne(br=>{"use strict";var HI=br&&br.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),qI=br&&br.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),jI=br&&br.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&HI(e,n,r);return qI(e,n),e};Object.defineProperty(br,"__esModule",{value:!0});br.Shape=void 0;var KI=jI(Re()),XI=xu(),Tu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsShape(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsShape(e,r){return e.setPosition(e.position()+KI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}dim(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new XI.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}dimLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startShape(e){e.startObject(1)}static addDim(e,r){e.addFieldOffset(0,r,0)}static createDimVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startDimVector(e,r){e.startVector(4,r,4)}static endShape(e){return e.endObject()}static createShape(e,r){return n.startShape(e),n.addDim(e,r),n.endShape(e)}};br.Shape=Tu});var $u=ne(yr=>{"use strict";var ZI=yr&&yr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),JI=yr&&yr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),YI=yr&&yr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&ZI(e,n,r);return JI(e,n),e};Object.defineProperty(yr,"__esModule",{value:!0});yr.TensorTypeAndShape=void 0;var QI=YI(Re()),eS=Iu(),ah=wo(),Su=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTensorTypeAndShape(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensorTypeAndShape(e,r){return e.setPosition(e.position()+QI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}elemType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):ah.TensorDataType.UNDEFINED}shape(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new eS.Shape).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startTensorTypeAndShape(e){e.startObject(2)}static addElemType(e,r){e.addFieldInt32(0,r,ah.TensorDataType.UNDEFINED)}static addShape(e,r){e.addFieldOffset(1,r,0)}static endTensorTypeAndShape(e){return e.endObject()}};yr.TensorTypeAndShape=Su});var Au=ne(ln=>{"use strict";Object.defineProperty(ln,"__esModule",{value:!0});ln.unionListToTypeInfoValue=ln.unionToTypeInfoValue=ln.TypeInfoValue=void 0;var sh=mu(),uh=bu(),lh=$u(),Ai;(function(n){n[n.NONE=0]="NONE",n[n.tensor_type=1]="tensor_type",n[n.sequence_type=2]="sequence_type",n[n.map_type=3]="map_type"})(Ai||(ln.TypeInfoValue=Ai={}));function tS(n,e){switch(Ai[n]){case"NONE":return null;case"tensor_type":return e(new lh.TensorTypeAndShape);case"sequence_type":return e(new uh.SequenceType);case"map_type":return e(new sh.MapType);default:return null}}ln.unionToTypeInfoValue=tS;function rS(n,e,r){switch(Ai[n]){case"NONE":return null;case"tensor_type":return e(r,new lh.TensorTypeAndShape);case"sequence_type":return e(r,new uh.SequenceType);case"map_type":return e(r,new sh.MapType);default:return null}}ln.unionListToTypeInfoValue=rS});var To=ne(_r=>{"use strict";var nS=_r&&_r.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),oS=_r&&_r.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),iS=_r&&_r.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&nS(e,n,r);return oS(e,n),e};Object.defineProperty(_r,"__esModule",{value:!0});_r.TypeInfo=void 0;var aS=iS(Re()),ch=Au(),Ou=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTypeInfo(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTypeInfo(e,r){return e.setPosition(e.position()+aS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}denotation(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}valueType(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint8(this.bb_pos+e):ch.TypeInfoValue.NONE}value(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__union(e,this.bb_pos+r):null}static startTypeInfo(e){e.startObject(3)}static addDenotation(e,r){e.addFieldOffset(0,r,0)}static addValueType(e,r){e.addFieldInt8(1,r,ch.TypeInfoValue.NONE)}static addValue(e,r){e.addFieldOffset(2,r,0)}static endTypeInfo(e){return e.endObject()}static createTypeInfo(e,r,t,o){return n.startTypeInfo(e),n.addDenotation(e,r),n.addValueType(e,t),n.addValue(e,o),n.endTypeInfo(e)}};_r.TypeInfo=Ou});var Eu=ne(vr=>{"use strict";var sS=vr&&vr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),uS=vr&&vr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),lS=vr&&vr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&sS(e,n,r);return uS(e,n),e};Object.defineProperty(vr,"__esModule",{value:!0});vr.ValueInfo=void 0;var cS=lS(Re()),dS=To(),Pu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsValueInfo(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsValueInfo(e,r){return e.setPosition(e.position()+cS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}type(e){let r=this.bb.__offset(this.bb_pos,8);return r?(e||new dS.TypeInfo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startValueInfo(e){e.startObject(3)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addType(e,r){e.addFieldOffset(2,r,0)}static endValueInfo(e){return e.endObject()}};vr.ValueInfo=Pu});var Oi=ne(wr=>{"use strict";var pS=wr&&wr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),fS=wr&&wr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),hS=wr&&wr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&pS(e,n,r);return fS(e,n),e};Object.defineProperty(wr,"__esModule",{value:!0});wr.Graph=void 0;var mS=hS(Re()),gS=Js(),bS=ru(),yS=cu(),_S=fu(),vS=xo(),wS=Eu(),Cu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsGraph(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsGraph(e,r){return e.setPosition(e.position()+mS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}initializers(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new vS.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}initializersLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeArgs(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new wS.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}nodes(e,r){let t=this.bb.__offset(this.bb_pos,8);return t?(r||new gS.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}maxNodeIndex(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readUint32(this.bb_pos+e):0}nodeEdges(e,r){let t=this.bb.__offset(this.bb_pos,12);return t?(r||new bS.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeEdgesLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}inputs(e,r){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,r){let t=this.bb.__offset(this.bb_pos,16);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.__vector_len(this.bb_pos+e):0}sparseInitializers(e,r){let t=this.bb.__offset(this.bb_pos,18);return t?(r||new _S.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}sparseInitializersLength(){let e=this.bb.__offset(this.bb_pos,18);return e?this.bb.__vector_len(this.bb_pos+e):0}runtimeOptimizations(e){let r=this.bb.__offset(this.bb_pos,20);return r?(e||new yS.RuntimeOptimizations).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startGraph(e){e.startObject(9)}static addInitializers(e,r){e.addFieldOffset(0,r,0)}static createInitializersVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInitializersVector(e,r){e.startVector(4,r,4)}static addNodeArgs(e,r){e.addFieldOffset(1,r,0)}static createNodeArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodeArgsVector(e,r){e.startVector(4,r,4)}static addNodes(e,r){e.addFieldOffset(2,r,0)}static createNodesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodesVector(e,r){e.startVector(4,r,4)}static addMaxNodeIndex(e,r){e.addFieldInt32(3,r,0)}static addNodeEdges(e,r){e.addFieldOffset(4,r,0)}static createNodeEdgesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodeEdgesVector(e,r){e.startVector(4,r,4)}static addInputs(e,r){e.addFieldOffset(5,r,0)}static createInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInputsVector(e,r){e.startVector(4,r,4)}static addOutputs(e,r){e.addFieldOffset(6,r,0)}static createOutputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOutputsVector(e,r){e.startVector(4,r,4)}static addSparseInitializers(e,r){e.addFieldOffset(7,r,0)}static createSparseInitializersVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startSparseInitializersVector(e,r){e.startVector(4,r,4)}static addRuntimeOptimizations(e,r){e.addFieldOffset(8,r,0)}static endGraph(e){return e.endObject()}};wr.Graph=Cu});var Ys=ne(xr=>{"use strict";var xS=xr&&xr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),TS=xr&&xr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),IS=xr&&xr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&xS(e,n,r);return TS(e,n),e};Object.defineProperty(xr,"__esModule",{value:!0});xr.Attribute=void 0;var SS=IS(Re()),dh=Ks(),ph=Oi(),fh=xo(),Du=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsAttribute(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsAttribute(e,r){return e.setPosition(e.position()+SS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}type(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readInt32(this.bb_pos+e):dh.AttributeType.UNDEFINED}f(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readFloat32(this.bb_pos+e):0}i(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}s(e){let r=this.bb.__offset(this.bb_pos,14);return r?this.bb.__string(this.bb_pos+r,e):null}t(e){let r=this.bb.__offset(this.bb_pos,16);return r?(e||new fh.Tensor).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}g(e){let r=this.bb.__offset(this.bb_pos,18);return r?(e||new ph.Graph).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}floats(e){let r=this.bb.__offset(this.bb_pos,20);return r?this.bb.readFloat32(this.bb.__vector(this.bb_pos+r)+e*4):0}floatsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}floatsArray(){let e=this.bb.__offset(this.bb_pos,20);return e?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}ints(e){let r=this.bb.__offset(this.bb_pos,22);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}intsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}strings(e,r){let t=this.bb.__offset(this.bb_pos,24);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}stringsLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}tensors(e,r){let t=this.bb.__offset(this.bb_pos,26);return t?(r||new fh.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}tensorsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}graphs(e,r){let t=this.bb.__offset(this.bb_pos,28);return t?(r||new ph.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}graphsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startAttribute(e){e.startObject(13)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addType(e,r){e.addFieldInt32(2,r,dh.AttributeType.UNDEFINED)}static addF(e,r){e.addFieldFloat32(3,r,0)}static addI(e,r){e.addFieldInt64(4,r,BigInt("0"))}static addS(e,r){e.addFieldOffset(5,r,0)}static addT(e,r){e.addFieldOffset(6,r,0)}static addG(e,r){e.addFieldOffset(7,r,0)}static addFloats(e,r){e.addFieldOffset(8,r,0)}static createFloatsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addFloat32(r[t]);return e.endVector()}static startFloatsVector(e,r){e.startVector(4,r,4)}static addInts(e,r){e.addFieldOffset(9,r,0)}static createIntsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startIntsVector(e,r){e.startVector(8,r,8)}static addStrings(e,r){e.addFieldOffset(10,r,0)}static createStringsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startStringsVector(e,r){e.startVector(4,r,4)}static addTensors(e,r){e.addFieldOffset(11,r,0)}static createTensorsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startTensorsVector(e,r){e.startVector(4,r,4)}static addGraphs(e,r){e.addFieldOffset(12,r,0)}static createGraphsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startGraphsVector(e,r){e.startVector(4,r,4)}static endAttribute(e){return e.endObject()}};xr.Attribute=Du});var Nu=ne(Tr=>{"use strict";var $S=Tr&&Tr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),AS=Tr&&Tr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),OS=Tr&&Tr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&$S(e,n,r);return AS(e,n),e};Object.defineProperty(Tr,"__esModule",{value:!0});Tr.DeprecatedKernelCreateInfos=void 0;var PS=OS(Re()),ku=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedKernelCreateInfos(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedKernelCreateInfos(e,r){return e.setPosition(e.position()+PS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndices(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.readUint32(this.bb.__vector(this.bb_pos+r)+e*4):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}kernelDefHashes(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.readUint64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}kernelDefHashesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedKernelCreateInfos(e){e.startObject(2)}static addNodeIndices(e,r){e.addFieldOffset(0,r,0)}static createNodeIndicesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addInt32(r[t]);return e.endVector()}static startNodeIndicesVector(e,r){e.startVector(4,r,4)}static addKernelDefHashes(e,r){e.addFieldOffset(1,r,0)}static createKernelDefHashesVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startKernelDefHashesVector(e,r){e.startVector(8,r,8)}static endDeprecatedKernelCreateInfos(e){return e.endObject()}static createDeprecatedKernelCreateInfos(e,r,t){return n.startDeprecatedKernelCreateInfos(e),n.addNodeIndices(e,r),n.addKernelDefHashes(e,t),n.endDeprecatedKernelCreateInfos(e)}};Tr.DeprecatedKernelCreateInfos=ku});var hh=ne(Ir=>{"use strict";var ES=Ir&&Ir.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),CS=Ir&&Ir.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),DS=Ir&&Ir.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&ES(e,n,r);return CS(e,n),e};Object.defineProperty(Ir,"__esModule",{value:!0});Ir.DeprecatedNodeIndexAndKernelDefHash=void 0;var kS=DS(Re()),Lu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedNodeIndexAndKernelDefHash(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedNodeIndexAndKernelDefHash(e,r){return e.setPosition(e.position()+kS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}kernelDefHash(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint64(this.bb_pos+e):BigInt("0")}static startDeprecatedNodeIndexAndKernelDefHash(e){e.startObject(2)}static addNodeIndex(e,r){e.addFieldInt32(0,r,0)}static addKernelDefHash(e,r){e.addFieldInt64(1,r,BigInt("0"))}static endDeprecatedNodeIndexAndKernelDefHash(e){return e.endObject()}static createDeprecatedNodeIndexAndKernelDefHash(e,r,t){return n.startDeprecatedNodeIndexAndKernelDefHash(e),n.addNodeIndex(e,r),n.addKernelDefHash(e,t),n.endDeprecatedNodeIndexAndKernelDefHash(e)}};Ir.DeprecatedNodeIndexAndKernelDefHash=Lu});var zu=ne(Sr=>{"use strict";var NS=Sr&&Sr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),LS=Sr&&Sr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),RS=Sr&&Sr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&NS(e,n,r);return LS(e,n),e};Object.defineProperty(Sr,"__esModule",{value:!0});Sr.DeprecatedSubGraphSessionState=void 0;var zS=RS(Re()),MS=Mu(),Ru=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedSubGraphSessionState(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedSubGraphSessionState(e,r){return e.setPosition(e.position()+zS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}graphId(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}sessionState(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new MS.DeprecatedSessionState).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startDeprecatedSubGraphSessionState(e){e.startObject(2)}static addGraphId(e,r){e.addFieldOffset(0,r,0)}static addSessionState(e,r){e.addFieldOffset(1,r,0)}static endDeprecatedSubGraphSessionState(e){let r=e.endObject();return e.requiredField(r,4),r}};Sr.DeprecatedSubGraphSessionState=Ru});var Mu=ne($r=>{"use strict";var BS=$r&&$r.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),FS=$r&&$r.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),VS=$r&&$r.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&BS(e,n,r);return FS(e,n),e};Object.defineProperty($r,"__esModule",{value:!0});$r.DeprecatedSessionState=void 0;var GS=VS(Re()),US=Nu(),WS=zu(),Bu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedSessionState(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedSessionState(e,r){return e.setPosition(e.position()+GS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}kernels(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new US.DeprecatedKernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}subGraphSessionStates(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new WS.DeprecatedSubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}subGraphSessionStatesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedSessionState(e){e.startObject(2)}static addKernels(e,r){e.addFieldOffset(0,r,0)}static addSubGraphSessionStates(e,r){e.addFieldOffset(1,r,0)}static createSubGraphSessionStatesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startSubGraphSessionStatesVector(e,r){e.startVector(4,r,4)}static endDeprecatedSessionState(e){return e.endObject()}static createDeprecatedSessionState(e,r,t){return n.startDeprecatedSessionState(e),n.addKernels(e,r),n.addSubGraphSessionStates(e,t),n.endDeprecatedSessionState(e)}};$r.DeprecatedSessionState=Bu});var Vu=ne(Ar=>{"use strict";var HS=Ar&&Ar.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),qS=Ar&&Ar.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),jS=Ar&&Ar.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&HS(e,n,r);return qS(e,n),e};Object.defineProperty(Ar,"__esModule",{value:!0});Ar.KernelTypeStrArgsEntry=void 0;var KS=jS(Re()),XS=js(),Fu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsKernelTypeStrArgsEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrArgsEntry(e,r){return e.setPosition(e.position()+KS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}kernelTypeStr(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}args(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new XS.ArgTypeAndIndex).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}argsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrArgsEntry(e){e.startObject(2)}static addKernelTypeStr(e,r){e.addFieldOffset(0,r,0)}static addArgs(e,r){e.addFieldOffset(1,r,0)}static createArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startArgsVector(e,r){e.startVector(4,r,4)}static endKernelTypeStrArgsEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createKernelTypeStrArgsEntry(e,r,t){return n.startKernelTypeStrArgsEntry(e),n.addKernelTypeStr(e,r),n.addArgs(e,t),n.endKernelTypeStrArgsEntry(e)}};Ar.KernelTypeStrArgsEntry=Fu});var Uu=ne(Or=>{"use strict";var ZS=Or&&Or.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),JS=Or&&Or.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),YS=Or&&Or.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&ZS(e,n,r);return JS(e,n),e};Object.defineProperty(Or,"__esModule",{value:!0});Or.OpIdKernelTypeStrArgsEntry=void 0;var QS=YS(Re()),e$=Vu(),Gu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsOpIdKernelTypeStrArgsEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOpIdKernelTypeStrArgsEntry(e,r){return e.setPosition(e.position()+QS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}opId(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}kernelTypeStrArgs(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new e$.KernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}kernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startOpIdKernelTypeStrArgsEntry(e){e.startObject(2)}static addOpId(e,r){e.addFieldOffset(0,r,0)}static addKernelTypeStrArgs(e,r){e.addFieldOffset(1,r,0)}static createKernelTypeStrArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startKernelTypeStrArgsVector(e,r){e.startVector(4,r,4)}static endOpIdKernelTypeStrArgsEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createOpIdKernelTypeStrArgsEntry(e,r,t){return n.startOpIdKernelTypeStrArgsEntry(e),n.addOpId(e,r),n.addKernelTypeStrArgs(e,t),n.endOpIdKernelTypeStrArgsEntry(e)}};Or.OpIdKernelTypeStrArgsEntry=Gu});var Hu=ne(Pr=>{"use strict";var t$=Pr&&Pr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),r$=Pr&&Pr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),n$=Pr&&Pr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&t$(e,n,r);return r$(e,n),e};Object.defineProperty(Pr,"__esModule",{value:!0});Pr.KernelTypeStrResolver=void 0;var o$=n$(Re()),i$=Uu(),Wu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsKernelTypeStrResolver(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrResolver(e,r){return e.setPosition(e.position()+o$.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}opKernelTypeStrArgs(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new i$.OpIdKernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opKernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrResolver(e){e.startObject(1)}static addOpKernelTypeStrArgs(e,r){e.addFieldOffset(0,r,0)}static createOpKernelTypeStrArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOpKernelTypeStrArgsVector(e,r){e.startVector(4,r,4)}static endKernelTypeStrResolver(e){return e.endObject()}static createKernelTypeStrResolver(e,r){return n.startKernelTypeStrResolver(e),n.addOpKernelTypeStrArgs(e,r),n.endKernelTypeStrResolver(e)}};Pr.KernelTypeStrResolver=Wu});var ju=ne(Er=>{"use strict";var a$=Er&&Er.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),s$=Er&&Er.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),u$=Er&&Er.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&a$(e,n,r);return s$(e,n),e};Object.defineProperty(Er,"__esModule",{value:!0});Er.OperatorSetId=void 0;var l$=u$(Re()),qu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsOperatorSetId(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOperatorSetId(e,r){return e.setPosition(e.position()+l$.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}domain(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}version(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}static startOperatorSetId(e){e.startObject(2)}static addDomain(e,r){e.addFieldOffset(0,r,0)}static addVersion(e,r){e.addFieldInt64(1,r,BigInt("0"))}static endOperatorSetId(e){return e.endObject()}static createOperatorSetId(e,r,t){return n.startOperatorSetId(e),n.addDomain(e,r),n.addVersion(e,t),n.endOperatorSetId(e)}};Er.OperatorSetId=qu});var Xu=ne(Cr=>{"use strict";var c$=Cr&&Cr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),d$=Cr&&Cr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),p$=Cr&&Cr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&c$(e,n,r);return d$(e,n),e};Object.defineProperty(Cr,"__esModule",{value:!0});Cr.StringStringEntry=void 0;var f$=p$(Re()),Ku=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsStringStringEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsStringStringEntry(e,r){return e.setPosition(e.position()+f$.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}key(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}value(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}static startStringStringEntry(e){e.startObject(2)}static addKey(e,r){e.addFieldOffset(0,r,0)}static addValue(e,r){e.addFieldOffset(1,r,0)}static endStringStringEntry(e){return e.endObject()}static createStringStringEntry(e,r,t){return n.startStringStringEntry(e),n.addKey(e,r),n.addValue(e,t),n.endStringStringEntry(e)}};Cr.StringStringEntry=Ku});var Ju=ne(Dr=>{"use strict";var h$=Dr&&Dr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),m$=Dr&&Dr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),g$=Dr&&Dr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&h$(e,n,r);return m$(e,n),e};Object.defineProperty(Dr,"__esModule",{value:!0});Dr.Model=void 0;var b$=g$(Re()),y$=Oi(),_$=ju(),v$=Xu(),Zu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsModel(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsModel(e,r){return e.setPosition(e.position()+b$.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}irVersion(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}opsetImport(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new _$.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opsetImportLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}producerName(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}producerVersion(e){let r=this.bb.__offset(this.bb_pos,10);return r?this.bb.__string(this.bb_pos+r,e):null}domain(e){let r=this.bb.__offset(this.bb_pos,12);return r?this.bb.__string(this.bb_pos+r,e):null}modelVersion(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}docString(e){let r=this.bb.__offset(this.bb_pos,16);return r?this.bb.__string(this.bb_pos+r,e):null}graph(e){let r=this.bb.__offset(this.bb_pos,18);return r?(e||new y$.Graph).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}graphDocString(e){let r=this.bb.__offset(this.bb_pos,20);return r?this.bb.__string(this.bb_pos+r,e):null}metadataProps(e,r){let t=this.bb.__offset(this.bb_pos,22);return t?(r||new v$.StringStringEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}metadataPropsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}static startModel(e){e.startObject(10)}static addIrVersion(e,r){e.addFieldInt64(0,r,BigInt("0"))}static addOpsetImport(e,r){e.addFieldOffset(1,r,0)}static createOpsetImportVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOpsetImportVector(e,r){e.startVector(4,r,4)}static addProducerName(e,r){e.addFieldOffset(2,r,0)}static addProducerVersion(e,r){e.addFieldOffset(3,r,0)}static addDomain(e,r){e.addFieldOffset(4,r,0)}static addModelVersion(e,r){e.addFieldInt64(5,r,BigInt("0"))}static addDocString(e,r){e.addFieldOffset(6,r,0)}static addGraph(e,r){e.addFieldOffset(7,r,0)}static addGraphDocString(e,r){e.addFieldOffset(8,r,0)}static addMetadataProps(e,r){e.addFieldOffset(9,r,0)}static createMetadataPropsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startMetadataPropsVector(e,r){e.startVector(4,r,4)}static endModel(e){return e.endObject()}};Dr.Model=Zu});var mh=ne(kr=>{"use strict";var w$=kr&&kr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),x$=kr&&kr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),T$=kr&&kr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&w$(e,n,r);return x$(e,n),e};Object.defineProperty(kr,"__esModule",{value:!0});kr.InferenceSession=void 0;var I$=T$(Re()),S$=Hu(),$$=Ju(),Yu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsInferenceSession(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsInferenceSession(e,r){return e.setPosition(e.position()+I$.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static bufferHasIdentifier(e){return e.__has_identifier("ORTM")}ortVersion(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}model(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new $$.Model).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}kernelTypeStrResolver(e){let r=this.bb.__offset(this.bb_pos,10);return r?(e||new S$.KernelTypeStrResolver).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startInferenceSession(e){e.startObject(4)}static addOrtVersion(e,r){e.addFieldOffset(0,r,0)}static addModel(e,r){e.addFieldOffset(1,r,0)}static addKernelTypeStrResolver(e,r){e.addFieldOffset(3,r,0)}static endInferenceSession(e){return e.endObject()}static finishInferenceSessionBuffer(e,r){e.finish(r,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(e,r){e.finish(r,"ORTM",!0)}};kr.InferenceSession=Yu});var A$,O$,Pi,zt,P$,E$,C$,D$,k$,N$,L$,R$,Qu,el,z$,M$,B$,F$,tl,V$,G$,U$,W$,H$,q$,j$,K$,X$,Z$,J$,Y$,Q$,Io,rl,eA,nl,tA,gh=N(()=>{"use strict";A$=Te(Fs()),O$=Te(js()),Pi=Te(Ys()),zt=Te(Ks()),P$=Te(Nu()),E$=Te(hh()),C$=Te(Mu()),D$=Te(zu()),k$=Te(xu()),N$=Te(vu()),L$=Te(yu()),R$=Te(eu()),Qu=Te(Oi()),el=Te(mh()),z$=Te(Vu()),M$=Te(Hu()),B$=Te(mu()),F$=Te(Ju()),tl=Te(Js()),V$=Te(ru()),G$=Te(Xs()),U$=Te(ou()),W$=Te(Uu()),H$=Te(ju()),q$=Te(au()),j$=Te(uu()),K$=Te(cu()),X$=Te(bu()),Z$=Te(Iu()),J$=Te(fu()),Y$=Te(Xu()),Q$=Te(xo()),Io=Te(wo()),rl=Te($u()),eA=Te(To()),nl=Te(Au()),tA=Te(Eu())});var So=N(()=>{"use strict";gh()});var yh=ne((E4,bh)=>{"use strict";bh.exports=rA;function rA(n,e){for(var r=new Array(arguments.length-1),t=0,o=2,i=!0;o<arguments.length;)r[t++]=arguments[o++];return new Promise(function(s,u){r[t]=function(d){if(i)if(i=!1,d)u(d);else{for(var f=new Array(arguments.length-1),m=0;m<f.length;)f[m++]=arguments[m];s.apply(null,f)}};try{n.apply(e||null,r)}catch(l){i&&(i=!1,u(l))}})}});var xh=ne(wh=>{"use strict";var Ci=wh;Ci.length=function(e){var r=e.length;if(!r)return 0;for(var t=0;--r%4>1&&e.charAt(r)==="=";)++t;return Math.ceil(e.length*3)/4-t};var Jn=new Array(64),vh=new Array(123);for(Ht=0;Ht<64;)vh[Jn[Ht]=Ht<26?Ht+65:Ht<52?Ht+71:Ht<62?Ht-4:Ht-59|43]=Ht++;var Ht;Ci.encode=function(e,r,t){for(var o=null,i=[],a=0,s=0,u;r<t;){var l=e[r++];switch(s){case 0:i[a++]=Jn[l>>2],u=(l&3)<<4,s=1;break;case 1:i[a++]=Jn[u|l>>4],u=(l&15)<<2,s=2;break;case 2:i[a++]=Jn[u|l>>6],i[a++]=Jn[l&63],s=0;break}a>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,i)),a=0)}return s&&(i[a++]=Jn[u],i[a++]=61,s===1&&(i[a++]=61)),o?(a&&o.push(String.fromCharCode.apply(String,i.slice(0,a))),o.join("")):String.fromCharCode.apply(String,i.slice(0,a))};var _h="invalid encoding";Ci.decode=function(e,r,t){for(var o=t,i=0,a,s=0;s<e.length;){var u=e.charCodeAt(s++);if(u===61&&i>1)break;if((u=vh[u])===void 0)throw Error(_h);switch(i){case 0:a=u,i=1;break;case 1:r[t++]=a<<2|(u&48)>>4,a=u,i=2;break;case 2:r[t++]=(a&15)<<4|(u&60)>>2,a=u,i=3;break;case 3:r[t++]=(a&3)<<6|u,i=0;break}}if(i===1)throw Error(_h);return t-o};Ci.test=function(e){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)}});var Ih=ne((D4,Th)=>{"use strict";Th.exports=Di;function Di(){this._listeners={}}Di.prototype.on=function(e,r,t){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:r,ctx:t||this}),this};Di.prototype.off=function(e,r){if(e===void 0)this._listeners={};else if(r===void 0)this._listeners[e]=[];else for(var t=this._listeners[e],o=0;o<t.length;)t[o].fn===r?t.splice(o,1):++o;return this};Di.prototype.emit=function(e){var r=this._listeners[e];if(r){for(var t=[],o=1;o<arguments.length;)t.push(arguments[o++]);for(o=0;o<r.length;)r[o].fn.apply(r[o++].ctx,t)}return this}});var Ch=ne((k4,Eh)=>{"use strict";Eh.exports=Sh(Sh);function Sh(n){return typeof Float32Array<"u"?function(){var e=new Float32Array([-0]),r=new Uint8Array(e.buffer),t=r[3]===128;function o(u,l,d){e[0]=u,l[d]=r[0],l[d+1]=r[1],l[d+2]=r[2],l[d+3]=r[3]}function i(u,l,d){e[0]=u,l[d]=r[3],l[d+1]=r[2],l[d+2]=r[1],l[d+3]=r[0]}n.writeFloatLE=t?o:i,n.writeFloatBE=t?i:o;function a(u,l){return r[0]=u[l],r[1]=u[l+1],r[2]=u[l+2],r[3]=u[l+3],e[0]}function s(u,l){return r[3]=u[l],r[2]=u[l+1],r[1]=u[l+2],r[0]=u[l+3],e[0]}n.readFloatLE=t?a:s,n.readFloatBE=t?s:a}():function(){function e(t,o,i,a){var s=o<0?1:0;if(s&&(o=-o),o===0)t(1/o>0?0:2147483648,i,a);else if(isNaN(o))t(2143289344,i,a);else if(o>34028234663852886e22)t((s<<31|2139095040)>>>0,i,a);else if(o<11754943508222875e-54)t((s<<31|Math.round(o/1401298464324817e-60))>>>0,i,a);else{var u=Math.floor(Math.log(o)/Math.LN2),l=Math.round(o*Math.pow(2,-u)*8388608)&8388607;t((s<<31|u+127<<23|l)>>>0,i,a)}}n.writeFloatLE=e.bind(null,$h),n.writeFloatBE=e.bind(null,Ah);function r(t,o,i){var a=t(o,i),s=(a>>31)*2+1,u=a>>>23&255,l=a&8388607;return u===255?l?NaN:s*(1/0):u===0?s*1401298464324817e-60*l:s*Math.pow(2,u-150)*(l+8388608)}n.readFloatLE=r.bind(null,Oh),n.readFloatBE=r.bind(null,Ph)}(),typeof Float64Array<"u"?function(){var e=new Float64Array([-0]),r=new Uint8Array(e.buffer),t=r[7]===128;function o(u,l,d){e[0]=u,l[d]=r[0],l[d+1]=r[1],l[d+2]=r[2],l[d+3]=r[3],l[d+4]=r[4],l[d+5]=r[5],l[d+6]=r[6],l[d+7]=r[7]}function i(u,l,d){e[0]=u,l[d]=r[7],l[d+1]=r[6],l[d+2]=r[5],l[d+3]=r[4],l[d+4]=r[3],l[d+5]=r[2],l[d+6]=r[1],l[d+7]=r[0]}n.writeDoubleLE=t?o:i,n.writeDoubleBE=t?i:o;function a(u,l){return r[0]=u[l],r[1]=u[l+1],r[2]=u[l+2],r[3]=u[l+3],r[4]=u[l+4],r[5]=u[l+5],r[6]=u[l+6],r[7]=u[l+7],e[0]}function s(u,l){return r[7]=u[l],r[6]=u[l+1],r[5]=u[l+2],r[4]=u[l+3],r[3]=u[l+4],r[2]=u[l+5],r[1]=u[l+6],r[0]=u[l+7],e[0]}n.readDoubleLE=t?a:s,n.readDoubleBE=t?s:a}():function(){function e(t,o,i,a,s,u){var l=a<0?1:0;if(l&&(a=-a),a===0)t(0,s,u+o),t(1/a>0?0:2147483648,s,u+i);else if(isNaN(a))t(0,s,u+o),t(2146959360,s,u+i);else if(a>17976931348623157e292)t(0,s,u+o),t((l<<31|2146435072)>>>0,s,u+i);else{var d;if(a<22250738585072014e-324)d=a/5e-324,t(d>>>0,s,u+o),t((l<<31|d/4294967296)>>>0,s,u+i);else{var f=Math.floor(Math.log(a)/Math.LN2);f===1024&&(f=1023),d=a*Math.pow(2,-f),t(d*4503599627370496>>>0,s,u+o),t((l<<31|f+1023<<20|d*1048576&1048575)>>>0,s,u+i)}}}n.writeDoubleLE=e.bind(null,$h,0,4),n.writeDoubleBE=e.bind(null,Ah,4,0);function r(t,o,i,a,s){var u=t(a,s+o),l=t(a,s+i),d=(l>>31)*2+1,f=l>>>20&2047,m=4294967296*(l&1048575)+u;return f===2047?m?NaN:d*(1/0):f===0?d*5e-324*m:d*Math.pow(2,f-1075)*(m+4503599627370496)}n.readDoubleLE=r.bind(null,Oh,0,4),n.readDoubleBE=r.bind(null,Ph,4,0)}(),n}function $h(n,e,r){e[r]=n&255,e[r+1]=n>>>8&255,e[r+2]=n>>>16&255,e[r+3]=n>>>24}function Ah(n,e,r){e[r]=n>>>24,e[r+1]=n>>>16&255,e[r+2]=n>>>8&255,e[r+3]=n&255}function Oh(n,e){return(n[e]|n[e+1]<<8|n[e+2]<<16|n[e+3]<<24)>>>0}function Ph(n,e){return(n[e]<<24|n[e+1]<<16|n[e+2]<<8|n[e+3])>>>0}});var Dh=ne((exports,module)=>{"use strict";module.exports=inquire;function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(n){}return null}});var Nh=ne(kh=>{"use strict";var ol=kh;ol.length=function(e){for(var r=0,t=0,o=0;o<e.length;++o)t=e.charCodeAt(o),t<128?r+=1:t<2048?r+=2:(t&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320?(++o,r+=4):r+=3;return r};ol.read=function(e,r,t){var o=t-r;if(o<1)return"";for(var i=null,a=[],s=0,u;r<t;)u=e[r++],u<128?a[s++]=u:u>191&&u<224?a[s++]=(u&31)<<6|e[r++]&63:u>239&&u<365?(u=((u&7)<<18|(e[r++]&63)<<12|(e[r++]&63)<<6|e[r++]&63)-65536,a[s++]=55296+(u>>10),a[s++]=56320+(u&1023)):a[s++]=(u&15)<<12|(e[r++]&63)<<6|e[r++]&63,s>8191&&((i||(i=[])).push(String.fromCharCode.apply(String,a)),s=0);return i?(s&&i.push(String.fromCharCode.apply(String,a.slice(0,s))),i.join("")):String.fromCharCode.apply(String,a.slice(0,s))};ol.write=function(e,r,t){for(var o=t,i,a,s=0;s<e.length;++s)i=e.charCodeAt(s),i<128?r[t++]=i:i<2048?(r[t++]=i>>6|192,r[t++]=i&63|128):(i&64512)===55296&&((a=e.charCodeAt(s+1))&64512)===56320?(i=65536+((i&1023)<<10)+(a&1023),++s,r[t++]=i>>18|240,r[t++]=i>>12&63|128,r[t++]=i>>6&63|128,r[t++]=i&63|128):(r[t++]=i>>12|224,r[t++]=i>>6&63|128,r[t++]=i&63|128);return t-o}});var Rh=ne((L4,Lh)=>{"use strict";Lh.exports=nA;function nA(n,e,r){var t=r||8192,o=t>>>1,i=null,a=t;return function(u){if(u<1||u>o)return n(u);a+u>t&&(i=n(t),a=0);var l=e.call(i,a,a+=u);return a&7&&(a=(a|7)+1),l}}});var Mh=ne((R4,zh)=>{"use strict";zh.exports=lt;var $o=dn();function lt(n,e){this.lo=n>>>0,this.hi=e>>>0}var $n=lt.zero=new lt(0,0);$n.toNumber=function(){return 0};$n.zzEncode=$n.zzDecode=function(){return this};$n.length=function(){return 1};var oA=lt.zeroHash="\0\0\0\0\0\0\0\0";lt.fromNumber=function(e){if(e===0)return $n;var r=e<0;r&&(e=-e);var t=e>>>0,o=(e-t)/4294967296>>>0;return r&&(o=~o>>>0,t=~t>>>0,++t>4294967295&&(t=0,++o>4294967295&&(o=0))),new lt(t,o)};lt.from=function(e){if(typeof e=="number")return lt.fromNumber(e);if($o.isString(e))if($o.Long)e=$o.Long.fromString(e);else return lt.fromNumber(parseInt(e,10));return e.low||e.high?new lt(e.low>>>0,e.high>>>0):$n};lt.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var r=~this.lo+1>>>0,t=~this.hi>>>0;return r||(t=t+1>>>0),-(r+t*4294967296)}return this.lo+this.hi*4294967296};lt.prototype.toLong=function(e){return $o.Long?new $o.Long(this.lo|0,this.hi|0,!!e):{low:this.lo|0,high:this.hi|0,unsigned:!!e}};var cn=String.prototype.charCodeAt;lt.fromHash=function(e){return e===oA?$n:new lt((cn.call(e,0)|cn.call(e,1)<<8|cn.call(e,2)<<16|cn.call(e,3)<<24)>>>0,(cn.call(e,4)|cn.call(e,5)<<8|cn.call(e,6)<<16|cn.call(e,7)<<24)>>>0)};lt.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)};lt.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this};lt.prototype.zzDecode=function(){var e=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this};lt.prototype.length=function(){var e=this.lo,r=(this.lo>>>28|this.hi<<4)>>>0,t=this.hi>>>24;return t===0?r===0?e<16384?e<128?1:2:e<2097152?3:4:r<16384?r<128?5:6:r<2097152?7:8:t<128?9:10}});var dn=ne(il=>{"use strict";var se=il;se.asPromise=yh();se.base64=xh();se.EventEmitter=Ih();se.float=Ch();se.inquire=Dh();se.utf8=Nh();se.pool=Rh();se.LongBits=Mh();se.isNode=!!(typeof global<"u"&&global&&global.process&&global.process.versions&&global.process.versions.node);se.global=se.isNode&&global||typeof window<"u"&&window||typeof self<"u"&&self||il;se.emptyArray=Object.freeze?Object.freeze([]):[];se.emptyObject=Object.freeze?Object.freeze({}):{};se.isInteger=Number.isInteger||function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e};se.isString=function(e){return typeof e=="string"||e instanceof String};se.isObject=function(e){return e&&typeof e=="object"};se.isset=se.isSet=function(e,r){var t=e[r];return t!=null&&e.hasOwnProperty(r)?typeof t!="object"||(Array.isArray(t)?t.length:Object.keys(t).length)>0:!1};se.Buffer=function(){try{var n=se.inquire("buffer").Buffer;return n.prototype.utf8Write?n:null}catch{return null}}();se._Buffer_from=null;se._Buffer_allocUnsafe=null;se.newBuffer=function(e){return typeof e=="number"?se.Buffer?se._Buffer_allocUnsafe(e):new se.Array(e):se.Buffer?se._Buffer_from(e):typeof Uint8Array>"u"?e:new Uint8Array(e)};se.Array=typeof Uint8Array<"u"?Uint8Array:Array;se.Long=se.global.dcodeIO&&se.global.dcodeIO.Long||se.global.Long||se.inquire("long");se.key2Re=/^true|false|0|1$/;se.key32Re=/^-?(?:0|[1-9][0-9]*)$/;se.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;se.longToHash=function(e){return e?se.LongBits.from(e).toHash():se.LongBits.zeroHash};se.longFromHash=function(e,r){var t=se.LongBits.fromHash(e);return se.Long?se.Long.fromBits(t.lo,t.hi,r):t.toNumber(!!r)};function Bh(n,e,r){for(var t=Object.keys(e),o=0;o<t.length;++o)(n[t[o]]===void 0||!r)&&(n[t[o]]=e[t[o]]);return n}se.merge=Bh;se.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)};function Fh(n){function e(r,t){if(!(this instanceof e))return new e(r,t);Object.defineProperty(this,"message",{get:function(){return r}}),Error.captureStackTrace?Error.captureStackTrace(this,e):Object.defineProperty(this,"stack",{value:new Error().stack||""}),t&&Bh(this,t)}return e.prototype=Object.create(Error.prototype,{constructor:{value:e,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return n},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),e}se.newError=Fh;se.ProtocolError=Fh("ProtocolError");se.oneOfGetter=function(e){for(var r={},t=0;t<e.length;++t)r[e[t]]=1;return function(){for(var o=Object.keys(this),i=o.length-1;i>-1;--i)if(r[o[i]]===1&&this[o[i]]!==void 0&&this[o[i]]!==null)return o[i]}};se.oneOfSetter=function(e){return function(r){for(var t=0;t<e.length;++t)e[t]!==r&&delete this[e[t]]}};se.toJSONOptions={longs:String,enums:String,bytes:String,json:!0};se._configure=function(){var n=se.Buffer;if(!n){se._Buffer_from=se._Buffer_allocUnsafe=null;return}se._Buffer_from=n.from!==Uint8Array.from&&n.from||function(r,t){return new n(r,t)},se._Buffer_allocUnsafe=n.allocUnsafe||function(r){return new n(r)}}});var pl=ne((M4,Wh)=>{"use strict";Wh.exports=Ce;var Mt=dn(),al,ki=Mt.LongBits,Vh=Mt.base64,Gh=Mt.utf8;function Ao(n,e,r){this.fn=n,this.len=e,this.next=void 0,this.val=r}function ul(){}function iA(n){this.head=n.head,this.tail=n.tail,this.len=n.len,this.next=n.states}function Ce(){this.len=0,this.head=new Ao(ul,0,0),this.tail=this.head,this.states=null}var Uh=function(){return Mt.Buffer?function(){return(Ce.create=function(){return new al})()}:function(){return new Ce}};Ce.create=Uh();Ce.alloc=function(e){return new Mt.Array(e)};Mt.Array!==Array&&(Ce.alloc=Mt.pool(Ce.alloc,Mt.Array.prototype.subarray));Ce.prototype._push=function(e,r,t){return this.tail=this.tail.next=new Ao(e,r,t),this.len+=r,this};function ll(n,e,r){e[r]=n&255}function aA(n,e,r){for(;n>127;)e[r++]=n&127|128,n>>>=7;e[r]=n}function cl(n,e){this.len=n,this.next=void 0,this.val=e}cl.prototype=Object.create(Ao.prototype);cl.prototype.fn=aA;Ce.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new cl((e=e>>>0)<128?1:e<16384?2:e<2097152?3:e<268435456?4:5,e)).len,this};Ce.prototype.int32=function(e){return e<0?this._push(dl,10,ki.fromNumber(e)):this.uint32(e)};Ce.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)};function dl(n,e,r){for(;n.hi;)e[r++]=n.lo&127|128,n.lo=(n.lo>>>7|n.hi<<25)>>>0,n.hi>>>=7;for(;n.lo>127;)e[r++]=n.lo&127|128,n.lo=n.lo>>>7;e[r++]=n.lo}Ce.prototype.uint64=function(e){var r=ki.from(e);return this._push(dl,r.length(),r)};Ce.prototype.int64=Ce.prototype.uint64;Ce.prototype.sint64=function(e){var r=ki.from(e).zzEncode();return this._push(dl,r.length(),r)};Ce.prototype.bool=function(e){return this._push(ll,1,e?1:0)};function sl(n,e,r){e[r]=n&255,e[r+1]=n>>>8&255,e[r+2]=n>>>16&255,e[r+3]=n>>>24}Ce.prototype.fixed32=function(e){return this._push(sl,4,e>>>0)};Ce.prototype.sfixed32=Ce.prototype.fixed32;Ce.prototype.fixed64=function(e){var r=ki.from(e);return this._push(sl,4,r.lo)._push(sl,4,r.hi)};Ce.prototype.sfixed64=Ce.prototype.fixed64;Ce.prototype.float=function(e){return this._push(Mt.float.writeFloatLE,4,e)};Ce.prototype.double=function(e){return this._push(Mt.float.writeDoubleLE,8,e)};var sA=Mt.Array.prototype.set?function(e,r,t){r.set(e,t)}:function(e,r,t){for(var o=0;o<e.length;++o)r[t+o]=e[o]};Ce.prototype.bytes=function(e){var r=e.length>>>0;if(!r)return this._push(ll,1,0);if(Mt.isString(e)){var t=Ce.alloc(r=Vh.length(e));Vh.decode(e,t,0),e=t}return this.uint32(r)._push(sA,r,e)};Ce.prototype.string=function(e){var r=Gh.length(e);return r?this.uint32(r)._push(Gh.write,r,e):this._push(ll,1,0)};Ce.prototype.fork=function(){return this.states=new iA(this),this.head=this.tail=new Ao(ul,0,0),this.len=0,this};Ce.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new Ao(ul,0,0),this.len=0),this};Ce.prototype.ldelim=function(){var e=this.head,r=this.tail,t=this.len;return this.reset().uint32(t),t&&(this.tail.next=e.next,this.tail=r,this.len+=t),this};Ce.prototype.finish=function(){for(var e=this.head.next,r=this.constructor.alloc(this.len),t=0;e;)e.fn(e.val,r,t),t+=e.len,e=e.next;return r};Ce._configure=function(n){al=n,Ce.create=Uh(),al._configure()}});var jh=ne((B4,qh)=>{"use strict";qh.exports=Nr;var Hh=pl();(Nr.prototype=Object.create(Hh.prototype)).constructor=Nr;var pn=dn();function Nr(){Hh.call(this)}Nr._configure=function(){Nr.alloc=pn._Buffer_allocUnsafe,Nr.writeBytesBuffer=pn.Buffer&&pn.Buffer.prototype instanceof Uint8Array&&pn.Buffer.prototype.set.name==="set"?function(e,r,t){r.set(e,t)}:function(e,r,t){if(e.copy)e.copy(r,t,0,e.length);else for(var o=0;o<e.length;)r[t++]=e[o++]}};Nr.prototype.bytes=function(e){pn.isString(e)&&(e=pn._Buffer_from(e,"base64"));var r=e.length>>>0;return this.uint32(r),r&&this._push(Nr.writeBytesBuffer,r,e),this};function uA(n,e,r){n.length<40?pn.utf8.write(n,e,r):e.utf8Write?e.utf8Write(n,r):e.write(n,r)}Nr.prototype.string=function(e){var r=pn.Buffer.byteLength(e);return this.uint32(r),r&&this._push(uA,r,e),this};Nr._configure()});var ml=ne((F4,Yh)=>{"use strict";Yh.exports=tt;var qt=dn(),hl,Zh=qt.LongBits,lA=qt.utf8;function jt(n,e){return RangeError("index out of range: "+n.pos+" + "+(e||1)+" > "+n.len)}function tt(n){this.buf=n,this.pos=0,this.len=n.length}var Kh=typeof Uint8Array<"u"?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new tt(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new tt(e);throw Error("illegal buffer")},Jh=function(){return qt.Buffer?function(r){return(tt.create=function(o){return qt.Buffer.isBuffer(o)?new hl(o):Kh(o)})(r)}:Kh};tt.create=Jh();tt.prototype._slice=qt.Array.prototype.subarray||qt.Array.prototype.slice;tt.prototype.uint32=function(){var e=4294967295;return function(){if(e=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(e=(e|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return e;if((this.pos+=5)>this.len)throw this.pos=this.len,jt(this,10);return e}}();tt.prototype.int32=function(){return this.uint32()|0};tt.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(e&1)|0};function fl(){var n=new Zh(0,0),e=0;if(this.len-this.pos>4){for(;e<4;++e)if(n.lo=(n.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return n;if(n.lo=(n.lo|(this.buf[this.pos]&127)<<28)>>>0,n.hi=(n.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return n;e=0}else{for(;e<3;++e){if(this.pos>=this.len)throw jt(this);if(n.lo=(n.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return n}return n.lo=(n.lo|(this.buf[this.pos++]&127)<<e*7)>>>0,n}if(this.len-this.pos>4){for(;e<5;++e)if(n.hi=(n.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return n}else for(;e<5;++e){if(this.pos>=this.len)throw jt(this);if(n.hi=(n.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return n}throw Error("invalid varint encoding")}tt.prototype.bool=function(){return this.uint32()!==0};function Ni(n,e){return(n[e-4]|n[e-3]<<8|n[e-2]<<16|n[e-1]<<24)>>>0}tt.prototype.fixed32=function(){if(this.pos+4>this.len)throw jt(this,4);return Ni(this.buf,this.pos+=4)};tt.prototype.sfixed32=function(){if(this.pos+4>this.len)throw jt(this,4);return Ni(this.buf,this.pos+=4)|0};function Xh(){if(this.pos+8>this.len)throw jt(this,8);return new Zh(Ni(this.buf,this.pos+=4),Ni(this.buf,this.pos+=4))}tt.prototype.float=function(){if(this.pos+4>this.len)throw jt(this,4);var e=qt.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e};tt.prototype.double=function(){if(this.pos+8>this.len)throw jt(this,4);var e=qt.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e};tt.prototype.bytes=function(){var e=this.uint32(),r=this.pos,t=this.pos+e;if(t>this.len)throw jt(this,e);if(this.pos+=e,Array.isArray(this.buf))return this.buf.slice(r,t);if(r===t){var o=qt.Buffer;return o?o.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,r,t)};tt.prototype.string=function(){var e=this.bytes();return lA.read(e,0,e.length)};tt.prototype.skip=function(e){if(typeof e=="number"){if(this.pos+e>this.len)throw jt(this,e);this.pos+=e}else do if(this.pos>=this.len)throw jt(this);while(this.buf[this.pos++]&128);return this};tt.prototype.skipType=function(n){switch(n){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(n=this.uint32()&7)!==4;)this.skipType(n);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+n+" at offset "+this.pos)}return this};tt._configure=function(n){hl=n,tt.create=Jh(),hl._configure();var e=qt.Long?"toLong":"toNumber";qt.merge(tt.prototype,{int64:function(){return fl.call(this)[e](!1)},uint64:function(){return fl.call(this)[e](!0)},sint64:function(){return fl.call(this).zzDecode()[e](!1)},fixed64:function(){return Xh.call(this)[e](!0)},sfixed64:function(){return Xh.call(this)[e](!1)}})}});var rm=ne((V4,tm)=>{"use strict";tm.exports=An;var em=ml();(An.prototype=Object.create(em.prototype)).constructor=An;var Qh=dn();function An(n){em.call(this,n)}An._configure=function(){Qh.Buffer&&(An.prototype._slice=Qh.Buffer.prototype.slice)};An.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+e,this.len))};An._configure()});var om=ne((G4,nm)=>{"use strict";nm.exports=Oo;var gl=dn();(Oo.prototype=Object.create(gl.EventEmitter.prototype)).constructor=Oo;function Oo(n,e,r){if(typeof n!="function")throw TypeError("rpcImpl must be a function");gl.EventEmitter.call(this),this.rpcImpl=n,this.requestDelimited=!!e,this.responseDelimited=!!r}Oo.prototype.rpcCall=function n(e,r,t,o,i){if(!o)throw TypeError("request must be specified");var a=this;if(!i)return gl.asPromise(n,a,e,r,t,o);if(!a.rpcImpl){setTimeout(function(){i(Error("already ended"))},0);return}try{return a.rpcImpl(e,r[a.requestDelimited?"encodeDelimited":"encode"](o).finish(),function(u,l){if(u)return a.emit("error",u,e),i(u);if(l===null){a.end(!0);return}if(!(l instanceof t))try{l=t[a.responseDelimited?"decodeDelimited":"decode"](l)}catch(d){return a.emit("error",d,e),i(d)}return a.emit("data",l,e),i(null,l)})}catch(s){a.emit("error",s,e),setTimeout(function(){i(s)},0);return}};Oo.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}});var am=ne(im=>{"use strict";var cA=im;cA.Service=om()});var um=ne((W4,sm)=>{"use strict";sm.exports={}});var dm=ne(cm=>{"use strict";var wt=cm;wt.build="minimal";wt.Writer=pl();wt.BufferWriter=jh();wt.Reader=ml();wt.BufferReader=rm();wt.util=dn();wt.rpc=am();wt.roots=um();wt.configure=lm;function lm(){wt.util._configure(),wt.Writer._configure(wt.BufferWriter),wt.Reader._configure(wt.BufferReader)}lm()});var fm=ne((q4,pm)=>{"use strict";pm.exports=dm()});var Yn=ne((j4,hm)=>{"use strict";var qe=fm(),K=qe.Reader,rt=qe.Writer,E=qe.util,$=qe.roots.default||(qe.roots.default={});$.onnx=function(){var n={};return n.Version=function(){var e={},r=Object.create(e);return r[e[0]="_START_VERSION"]=0,r[e[1]="IR_VERSION_2017_10_10"]=1,r[e[2]="IR_VERSION_2017_10_30"]=2,r[e[3]="IR_VERSION_2017_11_3"]=3,r[e[4]="IR_VERSION_2019_1_22"]=4,r[e[5]="IR_VERSION_2019_3_18"]=5,r[e[6]="IR_VERSION_2019_9_19"]=6,r[e[7]="IR_VERSION_2020_5_8"]=7,r[e[8]="IR_VERSION_2021_7_30"]=8,r[e[9]="IR_VERSION"]=9,r}(),n.AttributeProto=function(){function e(r){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.refAttrName="",e.prototype.docString="",e.prototype.type=0,e.prototype.f=0,e.prototype.i=E.Long?E.Long.fromBits(0,0,!1):0,e.prototype.s=E.newBuffer([]),e.prototype.t=null,e.prototype.g=null,e.prototype.sparseTensor=null,e.prototype.tp=null,e.prototype.floats=E.emptyArray,e.prototype.ints=E.emptyArray,e.prototype.strings=E.emptyArray,e.prototype.tensors=E.emptyArray,e.prototype.graphs=E.emptyArray,e.prototype.sparseTensors=E.emptyArray,e.prototype.typeProtos=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=rt.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.f!=null&&Object.hasOwnProperty.call(t,"f")&&o.uint32(21).float(t.f),t.i!=null&&Object.hasOwnProperty.call(t,"i")&&o.uint32(24).int64(t.i),t.s!=null&&Object.hasOwnProperty.call(t,"s")&&o.uint32(34).bytes(t.s),t.t!=null&&Object.hasOwnProperty.call(t,"t")&&$.onnx.TensorProto.encode(t.t,o.uint32(42).fork()).ldelim(),t.g!=null&&Object.hasOwnProperty.call(t,"g")&&$.onnx.GraphProto.encode(t.g,o.uint32(50).fork()).ldelim(),t.floats!=null&&t.floats.length){o.uint32(58).fork();for(var i=0;i<t.floats.length;++i)o.float(t.floats[i]);o.ldelim()}if(t.ints!=null&&t.ints.length){o.uint32(66).fork();for(var i=0;i<t.ints.length;++i)o.int64(t.ints[i]);o.ldelim()}if(t.strings!=null&&t.strings.length)for(var i=0;i<t.strings.length;++i)o.uint32(74).bytes(t.strings[i]);if(t.tensors!=null&&t.tensors.length)for(var i=0;i<t.tensors.length;++i)$.onnx.TensorProto.encode(t.tensors[i],o.uint32(82).fork()).ldelim();if(t.graphs!=null&&t.graphs.length)for(var i=0;i<t.graphs.length;++i)$.onnx.GraphProto.encode(t.graphs[i],o.uint32(90).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(106).string(t.docString),t.tp!=null&&Object.hasOwnProperty.call(t,"tp")&&$.onnx.TypeProto.encode(t.tp,o.uint32(114).fork()).ldelim(),t.typeProtos!=null&&t.typeProtos.length)for(var i=0;i<t.typeProtos.length;++i)$.onnx.TypeProto.encode(t.typeProtos[i],o.uint32(122).fork()).ldelim();if(t.type!=null&&Object.hasOwnProperty.call(t,"type")&&o.uint32(160).int32(t.type),t.refAttrName!=null&&Object.hasOwnProperty.call(t,"refAttrName")&&o.uint32(170).string(t.refAttrName),t.sparseTensor!=null&&Object.hasOwnProperty.call(t,"sparseTensor")&&$.onnx.SparseTensorProto.encode(t.sparseTensor,o.uint32(178).fork()).ldelim(),t.sparseTensors!=null&&t.sparseTensors.length)for(var i=0;i<t.sparseTensors.length;++i)$.onnx.SparseTensorProto.encode(t.sparseTensors[i],o.uint32(186).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.AttributeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 21:{a.refAttrName=t.string();break}case 13:{a.docString=t.string();break}case 20:{a.type=t.int32();break}case 2:{a.f=t.float();break}case 3:{a.i=t.int64();break}case 4:{a.s=t.bytes();break}case 5:{a.t=$.onnx.TensorProto.decode(t,t.uint32());break}case 6:{a.g=$.onnx.GraphProto.decode(t,t.uint32());break}case 22:{a.sparseTensor=$.onnx.SparseTensorProto.decode(t,t.uint32());break}case 14:{a.tp=$.onnx.TypeProto.decode(t,t.uint32());break}case 7:{if(a.floats&&a.floats.length||(a.floats=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.floats.push(t.float());else a.floats.push(t.float());break}case 8:{if(a.ints&&a.ints.length||(a.ints=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.ints.push(t.int64());else a.ints.push(t.int64());break}case 9:{a.strings&&a.strings.length||(a.strings=[]),a.strings.push(t.bytes());break}case 10:{a.tensors&&a.tensors.length||(a.tensors=[]),a.tensors.push($.onnx.TensorProto.decode(t,t.uint32()));break}case 11:{a.graphs&&a.graphs.length||(a.graphs=[]),a.graphs.push($.onnx.GraphProto.decode(t,t.uint32()));break}case 23:{a.sparseTensors&&a.sparseTensors.length||(a.sparseTensors=[]),a.sparseTensors.push($.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 15:{a.typeProtos&&a.typeProtos.length||(a.typeProtos=[]),a.typeProtos.push($.onnx.TypeProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!E.isString(t.name))return"name: string expected";if(t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&!E.isString(t.refAttrName))return"refAttrName: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!E.isString(t.docString))return"docString: string expected";if(t.type!=null&&t.hasOwnProperty("type"))switch(t.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:break}if(t.f!=null&&t.hasOwnProperty("f")&&typeof t.f!="number")return"f: number expected";if(t.i!=null&&t.hasOwnProperty("i")&&!E.isInteger(t.i)&&!(t.i&&E.isInteger(t.i.low)&&E.isInteger(t.i.high)))return"i: integer|Long expected";if(t.s!=null&&t.hasOwnProperty("s")&&!(t.s&&typeof t.s.length=="number"||E.isString(t.s)))return"s: buffer expected";if(t.t!=null&&t.hasOwnProperty("t")){var o=$.onnx.TensorProto.verify(t.t);if(o)return"t."+o}if(t.g!=null&&t.hasOwnProperty("g")){var o=$.onnx.GraphProto.verify(t.g);if(o)return"g."+o}if(t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")){var o=$.onnx.SparseTensorProto.verify(t.sparseTensor);if(o)return"sparseTensor."+o}if(t.tp!=null&&t.hasOwnProperty("tp")){var o=$.onnx.TypeProto.verify(t.tp);if(o)return"tp."+o}if(t.floats!=null&&t.hasOwnProperty("floats")){if(!Array.isArray(t.floats))return"floats: array expected";for(var i=0;i<t.floats.length;++i)if(typeof t.floats[i]!="number")return"floats: number[] expected"}if(t.ints!=null&&t.hasOwnProperty("ints")){if(!Array.isArray(t.ints))return"ints: array expected";for(var i=0;i<t.ints.length;++i)if(!E.isInteger(t.ints[i])&&!(t.ints[i]&&E.isInteger(t.ints[i].low)&&E.isInteger(t.ints[i].high)))return"ints: integer|Long[] expected"}if(t.strings!=null&&t.hasOwnProperty("strings")){if(!Array.isArray(t.strings))return"strings: array expected";for(var i=0;i<t.strings.length;++i)if(!(t.strings[i]&&typeof t.strings[i].length=="number"||E.isString(t.strings[i])))return"strings: buffer[] expected"}if(t.tensors!=null&&t.hasOwnProperty("tensors")){if(!Array.isArray(t.tensors))return"tensors: array expected";for(var i=0;i<t.tensors.length;++i){var o=$.onnx.TensorProto.verify(t.tensors[i]);if(o)return"tensors."+o}}if(t.graphs!=null&&t.hasOwnProperty("graphs")){if(!Array.isArray(t.graphs))return"graphs: array expected";for(var i=0;i<t.graphs.length;++i){var o=$.onnx.GraphProto.verify(t.graphs[i]);if(o)return"graphs."+o}}if(t.sparseTensors!=null&&t.hasOwnProperty("sparseTensors")){if(!Array.isArray(t.sparseTensors))return"sparseTensors: array expected";for(var i=0;i<t.sparseTensors.length;++i){var o=$.onnx.SparseTensorProto.verify(t.sparseTensors[i]);if(o)return"sparseTensors."+o}}if(t.typeProtos!=null&&t.hasOwnProperty("typeProtos")){if(!Array.isArray(t.typeProtos))return"typeProtos: array expected";for(var i=0;i<t.typeProtos.length;++i){var o=$.onnx.TypeProto.verify(t.typeProtos[i]);if(o)return"typeProtos."+o}}return null},e.fromObject=function(t){if(t instanceof $.onnx.AttributeProto)return t;var o=new $.onnx.AttributeProto;switch(t.name!=null&&(o.name=String(t.name)),t.refAttrName!=null&&(o.refAttrName=String(t.refAttrName)),t.docString!=null&&(o.docString=String(t.docString)),t.type){default:if(typeof t.type=="number"){o.type=t.type;break}break;case"UNDEFINED":case 0:o.type=0;break;case"FLOAT":case 1:o.type=1;break;case"INT":case 2:o.type=2;break;case"STRING":case 3:o.type=3;break;case"TENSOR":case 4:o.type=4;break;case"GRAPH":case 5:o.type=5;break;case"SPARSE_TENSOR":case 11:o.type=11;break;case"TYPE_PROTO":case 13:o.type=13;break;case"FLOATS":case 6:o.type=6;break;case"INTS":case 7:o.type=7;break;case"STRINGS":case 8:o.type=8;break;case"TENSORS":case 9:o.type=9;break;case"GRAPHS":case 10:o.type=10;break;case"SPARSE_TENSORS":case 12:o.type=12;break;case"TYPE_PROTOS":case 14:o.type=14;break}if(t.f!=null&&(o.f=Number(t.f)),t.i!=null&&(E.Long?(o.i=E.Long.fromValue(t.i)).unsigned=!1:typeof t.i=="string"?o.i=parseInt(t.i,10):typeof t.i=="number"?o.i=t.i:typeof t.i=="object"&&(o.i=new E.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber())),t.s!=null&&(typeof t.s=="string"?E.base64.decode(t.s,o.s=E.newBuffer(E.base64.length(t.s)),0):t.s.length>=0&&(o.s=t.s)),t.t!=null){if(typeof t.t!="object")throw TypeError(".onnx.AttributeProto.t: object expected");o.t=$.onnx.TensorProto.fromObject(t.t)}if(t.g!=null){if(typeof t.g!="object")throw TypeError(".onnx.AttributeProto.g: object expected");o.g=$.onnx.GraphProto.fromObject(t.g)}if(t.sparseTensor!=null){if(typeof t.sparseTensor!="object")throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");o.sparseTensor=$.onnx.SparseTensorProto.fromObject(t.sparseTensor)}if(t.tp!=null){if(typeof t.tp!="object")throw TypeError(".onnx.AttributeProto.tp: object expected");o.tp=$.onnx.TypeProto.fromObject(t.tp)}if(t.floats){if(!Array.isArray(t.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");o.floats=[];for(var i=0;i<t.floats.length;++i)o.floats[i]=Number(t.floats[i])}if(t.ints){if(!Array.isArray(t.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");o.ints=[];for(var i=0;i<t.ints.length;++i)E.Long?(o.ints[i]=E.Long.fromValue(t.ints[i])).unsigned=!1:typeof t.ints[i]=="string"?o.ints[i]=parseInt(t.ints[i],10):typeof t.ints[i]=="number"?o.ints[i]=t.ints[i]:typeof t.ints[i]=="object"&&(o.ints[i]=new E.LongBits(t.ints[i].low>>>0,t.ints[i].high>>>0).toNumber())}if(t.strings){if(!Array.isArray(t.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");o.strings=[];for(var i=0;i<t.strings.length;++i)typeof t.strings[i]=="string"?E.base64.decode(t.strings[i],o.strings[i]=E.newBuffer(E.base64.length(t.strings[i])),0):t.strings[i].length>=0&&(o.strings[i]=t.strings[i])}if(t.tensors){if(!Array.isArray(t.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");o.tensors=[];for(var i=0;i<t.tensors.length;++i){if(typeof t.tensors[i]!="object")throw TypeError(".onnx.AttributeProto.tensors: object expected");o.tensors[i]=$.onnx.TensorProto.fromObject(t.tensors[i])}}if(t.graphs){if(!Array.isArray(t.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");o.graphs=[];for(var i=0;i<t.graphs.length;++i){if(typeof t.graphs[i]!="object")throw TypeError(".onnx.AttributeProto.graphs: object expected");o.graphs[i]=$.onnx.GraphProto.fromObject(t.graphs[i])}}if(t.sparseTensors){if(!Array.isArray(t.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");o.sparseTensors=[];for(var i=0;i<t.sparseTensors.length;++i){if(typeof t.sparseTensors[i]!="object")throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");o.sparseTensors[i]=$.onnx.SparseTensorProto.fromObject(t.sparseTensors[i])}}if(t.typeProtos){if(!Array.isArray(t.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");o.typeProtos=[];for(var i=0;i<t.typeProtos.length;++i){if(typeof t.typeProtos[i]!="object")throw TypeError(".onnx.AttributeProto.typeProtos: object expected");o.typeProtos[i]=$.onnx.TypeProto.fromObject(t.typeProtos[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.floats=[],i.ints=[],i.strings=[],i.tensors=[],i.graphs=[],i.typeProtos=[],i.sparseTensors=[]),o.defaults){if(i.name="",i.f=0,E.Long){var a=new E.Long(0,0,!1);i.i=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.i=o.longs===String?"0":0;o.bytes===String?i.s="":(i.s=[],o.bytes!==Array&&(i.s=E.newBuffer(i.s))),i.t=null,i.g=null,i.docString="",i.tp=null,i.type=o.enums===String?"UNDEFINED":0,i.refAttrName="",i.sparseTensor=null}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.f!=null&&t.hasOwnProperty("f")&&(i.f=o.json&&!isFinite(t.f)?String(t.f):t.f),t.i!=null&&t.hasOwnProperty("i")&&(typeof t.i=="number"?i.i=o.longs===String?String(t.i):t.i:i.i=o.longs===String?E.Long.prototype.toString.call(t.i):o.longs===Number?new E.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber():t.i),t.s!=null&&t.hasOwnProperty("s")&&(i.s=o.bytes===String?E.base64.encode(t.s,0,t.s.length):o.bytes===Array?Array.prototype.slice.call(t.s):t.s),t.t!=null&&t.hasOwnProperty("t")&&(i.t=$.onnx.TensorProto.toObject(t.t,o)),t.g!=null&&t.hasOwnProperty("g")&&(i.g=$.onnx.GraphProto.toObject(t.g,o)),t.floats&&t.floats.length){i.floats=[];for(var s=0;s<t.floats.length;++s)i.floats[s]=o.json&&!isFinite(t.floats[s])?String(t.floats[s]):t.floats[s]}if(t.ints&&t.ints.length){i.ints=[];for(var s=0;s<t.ints.length;++s)typeof t.ints[s]=="number"?i.ints[s]=o.longs===String?String(t.ints[s]):t.ints[s]:i.ints[s]=o.longs===String?E.Long.prototype.toString.call(t.ints[s]):o.longs===Number?new E.LongBits(t.ints[s].low>>>0,t.ints[s].high>>>0).toNumber():t.ints[s]}if(t.strings&&t.strings.length){i.strings=[];for(var s=0;s<t.strings.length;++s)i.strings[s]=o.bytes===String?E.base64.encode(t.strings[s],0,t.strings[s].length):o.bytes===Array?Array.prototype.slice.call(t.strings[s]):t.strings[s]}if(t.tensors&&t.tensors.length){i.tensors=[];for(var s=0;s<t.tensors.length;++s)i.tensors[s]=$.onnx.TensorProto.toObject(t.tensors[s],o)}if(t.graphs&&t.graphs.length){i.graphs=[];for(var s=0;s<t.graphs.length;++s)i.graphs[s]=$.onnx.GraphProto.toObject(t.graphs[s],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.tp!=null&&t.hasOwnProperty("tp")&&(i.tp=$.onnx.TypeProto.toObject(t.tp,o)),t.typeProtos&&t.typeProtos.length){i.typeProtos=[];for(var s=0;s<t.typeProtos.length;++s)i.typeProtos[s]=$.onnx.TypeProto.toObject(t.typeProtos[s],o)}if(t.type!=null&&t.hasOwnProperty("type")&&(i.type=o.enums===String?$.onnx.AttributeProto.AttributeType[t.type]===void 0?t.type:$.onnx.AttributeProto.AttributeType[t.type]:t.type),t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&(i.refAttrName=t.refAttrName),t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")&&(i.sparseTensor=$.onnx.SparseTensorProto.toObject(t.sparseTensor,o)),t.sparseTensors&&t.sparseTensors.length){i.sparseTensors=[];for(var s=0;s<t.sparseTensors.length;++s)i.sparseTensors[s]=$.onnx.SparseTensorProto.toObject(t.sparseTensors[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,qe.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.AttributeProto"},e.AttributeType=function(){var r={},t=Object.create(r);return t[r[0]="UNDEFINED"]=0,t[r[1]="FLOAT"]=1,t[r[2]="INT"]=2,t[r[3]="STRING"]=3,t[r[4]="TENSOR"]=4,t[r[5]="GRAPH"]=5,t[r[11]="SPARSE_TENSOR"]=11,t[r[13]="TYPE_PROTO"]=13,t[r[6]="FLOATS"]=6,t[r[7]="INTS"]=7,t[r[8]="STRINGS"]=8,t[r[9]="TENSORS"]=9,t[r[10]="GRAPHS"]=10,t[r[12]="SPARSE_TENSORS"]=12,t[r[14]="TYPE_PROTOS"]=14,t}(),e}(),n.ValueInfoProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.type=null,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=rt.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.type!=null&&Object.hasOwnProperty.call(t,"type")&&$.onnx.TypeProto.encode(t.type,o.uint32(18).fork()).ldelim(),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(26).string(t.docString),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.ValueInfoProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 2:{a.type=$.onnx.TypeProto.decode(t,t.uint32());break}case 3:{a.docString=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!E.isString(t.name))return"name: string expected";if(t.type!=null&&t.hasOwnProperty("type")){var o=$.onnx.TypeProto.verify(t.type);if(o)return"type."+o}return t.docString!=null&&t.hasOwnProperty("docString")&&!E.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof $.onnx.ValueInfoProto)return t;var o=new $.onnx.ValueInfoProto;if(t.name!=null&&(o.name=String(t.name)),t.type!=null){if(typeof t.type!="object")throw TypeError(".onnx.ValueInfoProto.type: object expected");o.type=$.onnx.TypeProto.fromObject(t.type)}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.name="",i.type=null,i.docString=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.type!=null&&t.hasOwnProperty("type")&&(i.type=$.onnx.TypeProto.toObject(t.type,o)),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,qe.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ValueInfoProto"},e}(),n.NodeProto=function(){function e(r){if(this.input=[],this.output=[],this.attribute=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.input=E.emptyArray,e.prototype.output=E.emptyArray,e.prototype.name="",e.prototype.opType="",e.prototype.domain="",e.prototype.attribute=E.emptyArray,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=rt.create()),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(10).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(18).string(t.output[i]);if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(26).string(t.name),t.opType!=null&&Object.hasOwnProperty.call(t,"opType")&&o.uint32(34).string(t.opType),t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)$.onnx.AttributeProto.encode(t.attribute[i],o.uint32(42).fork()).ldelim();return t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(58).string(t.domain),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.NodeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.input&&a.input.length||(a.input=[]),a.input.push(t.string());break}case 2:{a.output&&a.output.length||(a.output=[]),a.output.push(t.string());break}case 3:{a.name=t.string();break}case 4:{a.opType=t.string();break}case 7:{a.domain=t.string();break}case 5:{a.attribute&&a.attribute.length||(a.attribute=[]),a.attribute.push($.onnx.AttributeProto.decode(t,t.uint32()));break}case 6:{a.docString=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!E.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!E.isString(t.output[o]))return"output: string[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!E.isString(t.name))return"name: string expected";if(t.opType!=null&&t.hasOwnProperty("opType")&&!E.isString(t.opType))return"opType: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!E.isString(t.domain))return"domain: string expected";if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o){var i=$.onnx.AttributeProto.verify(t.attribute[o]);if(i)return"attribute."+i}}return t.docString!=null&&t.hasOwnProperty("docString")&&!E.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof $.onnx.NodeProto)return t;var o=new $.onnx.NodeProto;if(t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.NodeProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.NodeProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.name!=null&&(o.name=String(t.name)),t.opType!=null&&(o.opType=String(t.opType)),t.domain!=null&&(o.domain=String(t.domain)),t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i){if(typeof t.attribute[i]!="object")throw TypeError(".onnx.NodeProto.attribute: object expected");o.attribute[i]=$.onnx.AttributeProto.fromObject(t.attribute[i])}}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[]),o.defaults&&(i.name="",i.opType="",i.docString="",i.domain=""),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=t.input[a]}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=t.output[a]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.opType!=null&&t.hasOwnProperty("opType")&&(i.opType=t.opType),t.attribute&&t.attribute.length){i.attribute=[];for(var a=0;a<t.attribute.length;++a)i.attribute[a]=$.onnx.AttributeProto.toObject(t.attribute[a],o)}return t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,qe.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.NodeProto"},e}(),n.TrainingInfoProto=function(){function e(r){if(this.initializationBinding=[],this.updateBinding=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.initialization=null,e.prototype.algorithm=null,e.prototype.initializationBinding=E.emptyArray,e.prototype.updateBinding=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=rt.create()),t.initialization!=null&&Object.hasOwnProperty.call(t,"initialization")&&$.onnx.GraphProto.encode(t.initialization,o.uint32(10).fork()).ldelim(),t.algorithm!=null&&Object.hasOwnProperty.call(t,"algorithm")&&$.onnx.GraphProto.encode(t.algorithm,o.uint32(18).fork()).ldelim(),t.initializationBinding!=null&&t.initializationBinding.length)for(var i=0;i<t.initializationBinding.length;++i)$.onnx.StringStringEntryProto.encode(t.initializationBinding[i],o.uint32(26).fork()).ldelim();if(t.updateBinding!=null&&t.updateBinding.length)for(var i=0;i<t.updateBinding.length;++i)$.onnx.StringStringEntryProto.encode(t.updateBinding[i],o.uint32(34).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.TrainingInfoProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.initialization=$.onnx.GraphProto.decode(t,t.uint32());break}case 2:{a.algorithm=$.onnx.GraphProto.decode(t,t.uint32());break}case 3:{a.initializationBinding&&a.initializationBinding.length||(a.initializationBinding=[]),a.initializationBinding.push($.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 4:{a.updateBinding&&a.updateBinding.length||(a.updateBinding=[]),a.updateBinding.push($.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.initialization!=null&&t.hasOwnProperty("initialization")){var o=$.onnx.GraphProto.verify(t.initialization);if(o)return"initialization."+o}if(t.algorithm!=null&&t.hasOwnProperty("algorithm")){var o=$.onnx.GraphProto.verify(t.algorithm);if(o)return"algorithm."+o}if(t.initializationBinding!=null&&t.hasOwnProperty("initializationBinding")){if(!Array.isArray(t.initializationBinding))return"initializationBinding: array expected";for(var i=0;i<t.initializationBinding.length;++i){var o=$.onnx.StringStringEntryProto.verify(t.initializationBinding[i]);if(o)return"initializationBinding."+o}}if(t.updateBinding!=null&&t.hasOwnProperty("updateBinding")){if(!Array.isArray(t.updateBinding))return"updateBinding: array expected";for(var i=0;i<t.updateBinding.length;++i){var o=$.onnx.StringStringEntryProto.verify(t.updateBinding[i]);if(o)return"updateBinding."+o}}return null},e.fromObject=function(t){if(t instanceof $.onnx.TrainingInfoProto)return t;var o=new $.onnx.TrainingInfoProto;if(t.initialization!=null){if(typeof t.initialization!="object")throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");o.initialization=$.onnx.GraphProto.fromObject(t.initialization)}if(t.algorithm!=null){if(typeof t.algorithm!="object")throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");o.algorithm=$.onnx.GraphProto.fromObject(t.algorithm)}if(t.initializationBinding){if(!Array.isArray(t.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");o.initializationBinding=[];for(var i=0;i<t.initializationBinding.length;++i){if(typeof t.initializationBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");o.initializationBinding[i]=$.onnx.StringStringEntryProto.fromObject(t.initializationBinding[i])}}if(t.updateBinding){if(!Array.isArray(t.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");o.updateBinding=[];for(var i=0;i<t.updateBinding.length;++i){if(typeof t.updateBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");o.updateBinding[i]=$.onnx.StringStringEntryProto.fromObject(t.updateBinding[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.initializationBinding=[],i.updateBinding=[]),o.defaults&&(i.initialization=null,i.algorithm=null),t.initialization!=null&&t.hasOwnProperty("initialization")&&(i.initialization=$.onnx.GraphProto.toObject(t.initialization,o)),t.algorithm!=null&&t.hasOwnProperty("algorithm")&&(i.algorithm=$.onnx.GraphProto.toObject(t.algorithm,o)),t.initializationBinding&&t.initializationBinding.length){i.initializationBinding=[];for(var a=0;a<t.initializationBinding.length;++a)i.initializationBinding[a]=$.onnx.StringStringEntryProto.toObject(t.initializationBinding[a],o)}if(t.updateBinding&&t.updateBinding.length){i.updateBinding=[];for(var a=0;a<t.updateBinding.length;++a)i.updateBinding[a]=$.onnx.StringStringEntryProto.toObject(t.updateBinding[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,qe.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TrainingInfoProto"},e}(),n.ModelProto=function(){function e(r){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.irVersion=E.Long?E.Long.fromBits(0,0,!1):0,e.prototype.opsetImport=E.emptyArray,e.prototype.producerName="",e.prototype.producerVersion="",e.prototype.domain="",e.prototype.modelVersion=E.Long?E.Long.fromBits(0,0,!1):0,e.prototype.docString="",e.prototype.graph=null,e.prototype.metadataProps=E.emptyArray,e.prototype.trainingInfo=E.emptyArray,e.prototype.functions=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=rt.create()),t.irVersion!=null&&Object.hasOwnProperty.call(t,"irVersion")&&o.uint32(8).int64(t.irVersion),t.producerName!=null&&Object.hasOwnProperty.call(t,"producerName")&&o.uint32(18).string(t.producerName),t.producerVersion!=null&&Object.hasOwnProperty.call(t,"producerVersion")&&o.uint32(26).string(t.producerVersion),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(34).string(t.domain),t.modelVersion!=null&&Object.hasOwnProperty.call(t,"modelVersion")&&o.uint32(40).int64(t.modelVersion),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.graph!=null&&Object.hasOwnProperty.call(t,"graph")&&$.onnx.GraphProto.encode(t.graph,o.uint32(58).fork()).ldelim(),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)$.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(66).fork()).ldelim();if(t.metadataProps!=null&&t.metadataProps.length)for(var i=0;i<t.metadataProps.length;++i)$.onnx.StringStringEntryProto.encode(t.metadataProps[i],o.uint32(114).fork()).ldelim();if(t.trainingInfo!=null&&t.trainingInfo.length)for(var i=0;i<t.trainingInfo.length;++i)$.onnx.TrainingInfoProto.encode(t.trainingInfo[i],o.uint32(162).fork()).ldelim();if(t.functions!=null&&t.functions.length)for(var i=0;i<t.functions.length;++i)$.onnx.FunctionProto.encode(t.functions[i],o.uint32(202).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.ModelProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.irVersion=t.int64();break}case 8:{a.opsetImport&&a.opsetImport.length||(a.opsetImport=[]),a.opsetImport.push($.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 2:{a.producerName=t.string();break}case 3:{a.producerVersion=t.string();break}case 4:{a.domain=t.string();break}case 5:{a.modelVersion=t.int64();break}case 6:{a.docString=t.string();break}case 7:{a.graph=$.onnx.GraphProto.decode(t,t.uint32());break}case 14:{a.metadataProps&&a.metadataProps.length||(a.metadataProps=[]),a.metadataProps.push($.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 20:{a.trainingInfo&&a.trainingInfo.length||(a.trainingInfo=[]),a.trainingInfo.push($.onnx.TrainingInfoProto.decode(t,t.uint32()));break}case 25:{a.functions&&a.functions.length||(a.functions=[]),a.functions.push($.onnx.FunctionProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&!E.isInteger(t.irVersion)&&!(t.irVersion&&E.isInteger(t.irVersion.low)&&E.isInteger(t.irVersion.high)))return"irVersion: integer|Long expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=$.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}if(t.producerName!=null&&t.hasOwnProperty("producerName")&&!E.isString(t.producerName))return"producerName: string expected";if(t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&!E.isString(t.producerVersion))return"producerVersion: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!E.isString(t.domain))return"domain: string expected";if(t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&!E.isInteger(t.modelVersion)&&!(t.modelVersion&&E.isInteger(t.modelVersion.low)&&E.isInteger(t.modelVersion.high)))return"modelVersion: integer|Long expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!E.isString(t.docString))return"docString: string expected";if(t.graph!=null&&t.hasOwnProperty("graph")){var i=$.onnx.GraphProto.verify(t.graph);if(i)return"graph."+i}if(t.metadataProps!=null&&t.hasOwnProperty("metadataProps")){if(!Array.isArray(t.metadataProps))return"metadataProps: array expected";for(var o=0;o<t.metadataProps.length;++o){var i=$.onnx.StringStringEntryProto.verify(t.metadataProps[o]);if(i)return"metadataProps."+i}}if(t.trainingInfo!=null&&t.hasOwnProperty("trainingInfo")){if(!Array.isArray(t.trainingInfo))return"trainingInfo: array expected";for(var o=0;o<t.trainingInfo.length;++o){var i=$.onnx.TrainingInfoProto.verify(t.trainingInfo[o]);if(i)return"trainingInfo."+i}}if(t.functions!=null&&t.hasOwnProperty("functions")){if(!Array.isArray(t.functions))return"functions: array expected";for(var o=0;o<t.functions.length;++o){var i=$.onnx.FunctionProto.verify(t.functions[o]);if(i)return"functions."+i}}return null},e.fromObject=function(t){if(t instanceof $.onnx.ModelProto)return t;var o=new $.onnx.ModelProto;if(t.irVersion!=null&&(E.Long?(o.irVersion=E.Long.fromValue(t.irVersion)).unsigned=!1:typeof t.irVersion=="string"?o.irVersion=parseInt(t.irVersion,10):typeof t.irVersion=="number"?o.irVersion=t.irVersion:typeof t.irVersion=="object"&&(o.irVersion=new E.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber())),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.ModelProto.opsetImport: object expected");o.opsetImport[i]=$.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}if(t.producerName!=null&&(o.producerName=String(t.producerName)),t.producerVersion!=null&&(o.producerVersion=String(t.producerVersion)),t.domain!=null&&(o.domain=String(t.domain)),t.modelVersion!=null&&(E.Long?(o.modelVersion=E.Long.fromValue(t.modelVersion)).unsigned=!1:typeof t.modelVersion=="string"?o.modelVersion=parseInt(t.modelVersion,10):typeof t.modelVersion=="number"?o.modelVersion=t.modelVersion:typeof t.modelVersion=="object"&&(o.modelVersion=new E.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber())),t.docString!=null&&(o.docString=String(t.docString)),t.graph!=null){if(typeof t.graph!="object")throw TypeError(".onnx.ModelProto.graph: object expected");o.graph=$.onnx.GraphProto.fromObject(t.graph)}if(t.metadataProps){if(!Array.isArray(t.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");o.metadataProps=[];for(var i=0;i<t.metadataProps.length;++i){if(typeof t.metadataProps[i]!="object")throw TypeError(".onnx.ModelProto.metadataProps: object expected");o.metadataProps[i]=$.onnx.StringStringEntryProto.fromObject(t.metadataProps[i])}}if(t.trainingInfo){if(!Array.isArray(t.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");o.trainingInfo=[];for(var i=0;i<t.trainingInfo.length;++i){if(typeof t.trainingInfo[i]!="object")throw TypeError(".onnx.ModelProto.trainingInfo: object expected");o.trainingInfo[i]=$.onnx.TrainingInfoProto.fromObject(t.trainingInfo[i])}}if(t.functions){if(!Array.isArray(t.functions))throw TypeError(".onnx.ModelProto.functions: array expected");o.functions=[];for(var i=0;i<t.functions.length;++i){if(typeof t.functions[i]!="object")throw TypeError(".onnx.ModelProto.functions: object expected");o.functions[i]=$.onnx.FunctionProto.fromObject(t.functions[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.opsetImport=[],i.metadataProps=[],i.trainingInfo=[],i.functions=[]),o.defaults){if(E.Long){var a=new E.Long(0,0,!1);i.irVersion=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.irVersion=o.longs===String?"0":0;if(i.producerName="",i.producerVersion="",i.domain="",E.Long){var a=new E.Long(0,0,!1);i.modelVersion=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.modelVersion=o.longs===String?"0":0;i.docString="",i.graph=null}if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&(typeof t.irVersion=="number"?i.irVersion=o.longs===String?String(t.irVersion):t.irVersion:i.irVersion=o.longs===String?E.Long.prototype.toString.call(t.irVersion):o.longs===Number?new E.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber():t.irVersion),t.producerName!=null&&t.hasOwnProperty("producerName")&&(i.producerName=t.producerName),t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&(i.producerVersion=t.producerVersion),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&(typeof t.modelVersion=="number"?i.modelVersion=o.longs===String?String(t.modelVersion):t.modelVersion:i.modelVersion=o.longs===String?E.Long.prototype.toString.call(t.modelVersion):o.longs===Number?new E.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber():t.modelVersion),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.graph!=null&&t.hasOwnProperty("graph")&&(i.graph=$.onnx.GraphProto.toObject(t.graph,o)),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var s=0;s<t.opsetImport.length;++s)i.opsetImport[s]=$.onnx.OperatorSetIdProto.toObject(t.opsetImport[s],o)}if(t.metadataProps&&t.metadataProps.length){i.metadataProps=[];for(var s=0;s<t.metadataProps.length;++s)i.metadataProps[s]=$.onnx.StringStringEntryProto.toObject(t.metadataProps[s],o)}if(t.trainingInfo&&t.trainingInfo.length){i.trainingInfo=[];for(var s=0;s<t.trainingInfo.length;++s)i.trainingInfo[s]=$.onnx.TrainingInfoProto.toObject(t.trainingInfo[s],o)}if(t.functions&&t.functions.length){i.functions=[];for(var s=0;s<t.functions.length;++s)i.functions[s]=$.onnx.FunctionProto.toObject(t.functions[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,qe.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ModelProto"},e}(),n.StringStringEntryProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.key="",e.prototype.value="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=rt.create()),t.key!=null&&Object.hasOwnProperty.call(t,"key")&&o.uint32(10).string(t.key),t.value!=null&&Object.hasOwnProperty.call(t,"value")&&o.uint32(18).string(t.value),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.StringStringEntryProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.key=t.string();break}case 2:{a.value=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.key!=null&&t.hasOwnProperty("key")&&!E.isString(t.key)?"key: string expected":t.value!=null&&t.hasOwnProperty("value")&&!E.isString(t.value)?"value: string expected":null},e.fromObject=function(t){if(t instanceof $.onnx.StringStringEntryProto)return t;var o=new $.onnx.StringStringEntryProto;return t.key!=null&&(o.key=String(t.key)),t.value!=null&&(o.value=String(t.value)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.key="",i.value=""),t.key!=null&&t.hasOwnProperty("key")&&(i.key=t.key),t.value!=null&&t.hasOwnProperty("value")&&(i.value=t.value),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,qe.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.StringStringEntryProto"},e}(),n.TensorAnnotation=function(){function e(r){if(this.quantParameterTensorNames=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.tensorName="",e.prototype.quantParameterTensorNames=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=rt.create()),t.tensorName!=null&&Object.hasOwnProperty.call(t,"tensorName")&&o.uint32(10).string(t.tensorName),t.quantParameterTensorNames!=null&&t.quantParameterTensorNames.length)for(var i=0;i<t.quantParameterTensorNames.length;++i)$.onnx.StringStringEntryProto.encode(t.quantParameterTensorNames[i],o.uint32(18).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.TensorAnnotation;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.tensorName=t.string();break}case 2:{a.quantParameterTensorNames&&a.quantParameterTensorNames.length||(a.quantParameterTensorNames=[]),a.quantParameterTensorNames.push($.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.tensorName!=null&&t.hasOwnProperty("tensorName")&&!E.isString(t.tensorName))return"tensorName: string expected";if(t.quantParameterTensorNames!=null&&t.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(t.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var o=0;o<t.quantParameterTensorNames.length;++o){var i=$.onnx.StringStringEntryProto.verify(t.quantParameterTensorNames[o]);if(i)return"quantParameterTensorNames."+i}}return null},e.fromObject=function(t){if(t instanceof $.onnx.TensorAnnotation)return t;var o=new $.onnx.TensorAnnotation;if(t.tensorName!=null&&(o.tensorName=String(t.tensorName)),t.quantParameterTensorNames){if(!Array.isArray(t.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");o.quantParameterTensorNames=[];for(var i=0;i<t.quantParameterTensorNames.length;++i){if(typeof t.quantParameterTensorNames[i]!="object")throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");o.quantParameterTensorNames[i]=$.onnx.StringStringEntryProto.fromObject(t.quantParameterTensorNames[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.quantParameterTensorNames=[]),o.defaults&&(i.tensorName=""),t.tensorName!=null&&t.hasOwnProperty("tensorName")&&(i.tensorName=t.tensorName),t.quantParameterTensorNames&&t.quantParameterTensorNames.length){i.quantParameterTensorNames=[];for(var a=0;a<t.quantParameterTensorNames.length;++a)i.quantParameterTensorNames[a]=$.onnx.StringStringEntryProto.toObject(t.quantParameterTensorNames[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,qe.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorAnnotation"},e}(),n.GraphProto=function(){function e(r){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.node=E.emptyArray,e.prototype.name="",e.prototype.initializer=E.emptyArray,e.prototype.sparseInitializer=E.emptyArray,e.prototype.docString="",e.prototype.input=E.emptyArray,e.prototype.output=E.emptyArray,e.prototype.valueInfo=E.emptyArray,e.prototype.quantizationAnnotation=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=rt.create()),t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)$.onnx.NodeProto.encode(t.node[i],o.uint32(10).fork()).ldelim();if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(18).string(t.name),t.initializer!=null&&t.initializer.length)for(var i=0;i<t.initializer.length;++i)$.onnx.TensorProto.encode(t.initializer[i],o.uint32(42).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(82).string(t.docString),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)$.onnx.ValueInfoProto.encode(t.input[i],o.uint32(90).fork()).ldelim();if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)$.onnx.ValueInfoProto.encode(t.output[i],o.uint32(98).fork()).ldelim();if(t.valueInfo!=null&&t.valueInfo.length)for(var i=0;i<t.valueInfo.length;++i)$.onnx.ValueInfoProto.encode(t.valueInfo[i],o.uint32(106).fork()).ldelim();if(t.quantizationAnnotation!=null&&t.quantizationAnnotation.length)for(var i=0;i<t.quantizationAnnotation.length;++i)$.onnx.TensorAnnotation.encode(t.quantizationAnnotation[i],o.uint32(114).fork()).ldelim();if(t.sparseInitializer!=null&&t.sparseInitializer.length)for(var i=0;i<t.sparseInitializer.length;++i)$.onnx.SparseTensorProto.encode(t.sparseInitializer[i],o.uint32(122).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.GraphProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.node&&a.node.length||(a.node=[]),a.node.push($.onnx.NodeProto.decode(t,t.uint32()));break}case 2:{a.name=t.string();break}case 5:{a.initializer&&a.initializer.length||(a.initializer=[]),a.initializer.push($.onnx.TensorProto.decode(t,t.uint32()));break}case 15:{a.sparseInitializer&&a.sparseInitializer.length||(a.sparseInitializer=[]),a.sparseInitializer.push($.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 10:{a.docString=t.string();break}case 11:{a.input&&a.input.length||(a.input=[]),a.input.push($.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 12:{a.output&&a.output.length||(a.output=[]),a.output.push($.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 13:{a.valueInfo&&a.valueInfo.length||(a.valueInfo=[]),a.valueInfo.push($.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 14:{a.quantizationAnnotation&&a.quantizationAnnotation.length||(a.quantizationAnnotation=[]),a.quantizationAnnotation.push($.onnx.TensorAnnotation.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=$.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.name!=null&&t.hasOwnProperty("name")&&!E.isString(t.name))return"name: string expected";if(t.initializer!=null&&t.hasOwnProperty("initializer")){if(!Array.isArray(t.initializer))return"initializer: array expected";for(var o=0;o<t.initializer.length;++o){var i=$.onnx.TensorProto.verify(t.initializer[o]);if(i)return"initializer."+i}}if(t.sparseInitializer!=null&&t.hasOwnProperty("sparseInitializer")){if(!Array.isArray(t.sparseInitializer))return"sparseInitializer: array expected";for(var o=0;o<t.sparseInitializer.length;++o){var i=$.onnx.SparseTensorProto.verify(t.sparseInitializer[o]);if(i)return"sparseInitializer."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!E.isString(t.docString))return"docString: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o){var i=$.onnx.ValueInfoProto.verify(t.input[o]);if(i)return"input."+i}}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o){var i=$.onnx.ValueInfoProto.verify(t.output[o]);if(i)return"output."+i}}if(t.valueInfo!=null&&t.hasOwnProperty("valueInfo")){if(!Array.isArray(t.valueInfo))return"valueInfo: array expected";for(var o=0;o<t.valueInfo.length;++o){var i=$.onnx.ValueInfoProto.verify(t.valueInfo[o]);if(i)return"valueInfo."+i}}if(t.quantizationAnnotation!=null&&t.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(t.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var o=0;o<t.quantizationAnnotation.length;++o){var i=$.onnx.TensorAnnotation.verify(t.quantizationAnnotation[o]);if(i)return"quantizationAnnotation."+i}}return null},e.fromObject=function(t){if(t instanceof $.onnx.GraphProto)return t;var o=new $.onnx.GraphProto;if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.GraphProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.GraphProto.node: object expected");o.node[i]=$.onnx.NodeProto.fromObject(t.node[i])}}if(t.name!=null&&(o.name=String(t.name)),t.initializer){if(!Array.isArray(t.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");o.initializer=[];for(var i=0;i<t.initializer.length;++i){if(typeof t.initializer[i]!="object")throw TypeError(".onnx.GraphProto.initializer: object expected");o.initializer[i]=$.onnx.TensorProto.fromObject(t.initializer[i])}}if(t.sparseInitializer){if(!Array.isArray(t.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");o.sparseInitializer=[];for(var i=0;i<t.sparseInitializer.length;++i){if(typeof t.sparseInitializer[i]!="object")throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");o.sparseInitializer[i]=$.onnx.SparseTensorProto.fromObject(t.sparseInitializer[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.GraphProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i){if(typeof t.input[i]!="object")throw TypeError(".onnx.GraphProto.input: object expected");o.input[i]=$.onnx.ValueInfoProto.fromObject(t.input[i])}}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.GraphProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i){if(typeof t.output[i]!="object")throw TypeError(".onnx.GraphProto.output: object expected");o.output[i]=$.onnx.ValueInfoProto.fromObject(t.output[i])}}if(t.valueInfo){if(!Array.isArray(t.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");o.valueInfo=[];for(var i=0;i<t.valueInfo.length;++i){if(typeof t.valueInfo[i]!="object")throw TypeError(".onnx.GraphProto.valueInfo: object expected");o.valueInfo[i]=$.onnx.ValueInfoProto.fromObject(t.valueInfo[i])}}if(t.quantizationAnnotation){if(!Array.isArray(t.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");o.quantizationAnnotation=[];for(var i=0;i<t.quantizationAnnotation.length;++i){if(typeof t.quantizationAnnotation[i]!="object")throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");o.quantizationAnnotation[i]=$.onnx.TensorAnnotation.fromObject(t.quantizationAnnotation[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.node=[],i.initializer=[],i.input=[],i.output=[],i.valueInfo=[],i.quantizationAnnotation=[],i.sparseInitializer=[]),o.defaults&&(i.name="",i.docString=""),t.node&&t.node.length){i.node=[];for(var a=0;a<t.node.length;++a)i.node[a]=$.onnx.NodeProto.toObject(t.node[a],o)}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.initializer&&t.initializer.length){i.initializer=[];for(var a=0;a<t.initializer.length;++a)i.initializer[a]=$.onnx.TensorProto.toObject(t.initializer[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=$.onnx.ValueInfoProto.toObject(t.input[a],o)}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=$.onnx.ValueInfoProto.toObject(t.output[a],o)}if(t.valueInfo&&t.valueInfo.length){i.valueInfo=[];for(var a=0;a<t.valueInfo.length;++a)i.valueInfo[a]=$.onnx.ValueInfoProto.toObject(t.valueInfo[a],o)}if(t.quantizationAnnotation&&t.quantizationAnnotation.length){i.quantizationAnnotation=[];for(var a=0;a<t.quantizationAnnotation.length;++a)i.quantizationAnnotation[a]=$.onnx.TensorAnnotation.toObject(t.quantizationAnnotation[a],o)}if(t.sparseInitializer&&t.sparseInitializer.length){i.sparseInitializer=[];for(var a=0;a<t.sparseInitializer.length;++a)i.sparseInitializer[a]=$.onnx.SparseTensorProto.toObject(t.sparseInitializer[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,qe.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.GraphProto"},e}(),n.TensorProto=function(){function e(r){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.dims=E.emptyArray,e.prototype.dataType=0,e.prototype.segment=null,e.prototype.floatData=E.emptyArray,e.prototype.int32Data=E.emptyArray,e.prototype.stringData=E.emptyArray,e.prototype.int64Data=E.emptyArray,e.prototype.name="",e.prototype.docString="",e.prototype.rawData=E.newBuffer([]),e.prototype.externalData=E.emptyArray,e.prototype.dataLocation=0,e.prototype.doubleData=E.emptyArray,e.prototype.uint64Data=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=rt.create()),t.dims!=null&&t.dims.length){o.uint32(10).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}if(t.dataType!=null&&Object.hasOwnProperty.call(t,"dataType")&&o.uint32(16).int32(t.dataType),t.segment!=null&&Object.hasOwnProperty.call(t,"segment")&&$.onnx.TensorProto.Segment.encode(t.segment,o.uint32(26).fork()).ldelim(),t.floatData!=null&&t.floatData.length){o.uint32(34).fork();for(var i=0;i<t.floatData.length;++i)o.float(t.floatData[i]);o.ldelim()}if(t.int32Data!=null&&t.int32Data.length){o.uint32(42).fork();for(var i=0;i<t.int32Data.length;++i)o.int32(t.int32Data[i]);o.ldelim()}if(t.stringData!=null&&t.stringData.length)for(var i=0;i<t.stringData.length;++i)o.uint32(50).bytes(t.stringData[i]);if(t.int64Data!=null&&t.int64Data.length){o.uint32(58).fork();for(var i=0;i<t.int64Data.length;++i)o.int64(t.int64Data[i]);o.ldelim()}if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(66).string(t.name),t.rawData!=null&&Object.hasOwnProperty.call(t,"rawData")&&o.uint32(74).bytes(t.rawData),t.doubleData!=null&&t.doubleData.length){o.uint32(82).fork();for(var i=0;i<t.doubleData.length;++i)o.double(t.doubleData[i]);o.ldelim()}if(t.uint64Data!=null&&t.uint64Data.length){o.uint32(90).fork();for(var i=0;i<t.uint64Data.length;++i)o.uint64(t.uint64Data[i]);o.ldelim()}if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(98).string(t.docString),t.externalData!=null&&t.externalData.length)for(var i=0;i<t.externalData.length;++i)$.onnx.StringStringEntryProto.encode(t.externalData[i],o.uint32(106).fork()).ldelim();return t.dataLocation!=null&&Object.hasOwnProperty.call(t,"dataLocation")&&o.uint32(112).int32(t.dataLocation),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.TensorProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{if(a.dims&&a.dims.length||(a.dims=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.dims.push(t.int64());else a.dims.push(t.int64());break}case 2:{a.dataType=t.int32();break}case 3:{a.segment=$.onnx.TensorProto.Segment.decode(t,t.uint32());break}case 4:{if(a.floatData&&a.floatData.length||(a.floatData=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.floatData.push(t.float());else a.floatData.push(t.float());break}case 5:{if(a.int32Data&&a.int32Data.length||(a.int32Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.int32Data.push(t.int32());else a.int32Data.push(t.int32());break}case 6:{a.stringData&&a.stringData.length||(a.stringData=[]),a.stringData.push(t.bytes());break}case 7:{if(a.int64Data&&a.int64Data.length||(a.int64Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.int64Data.push(t.int64());else a.int64Data.push(t.int64());break}case 8:{a.name=t.string();break}case 12:{a.docString=t.string();break}case 9:{a.rawData=t.bytes();break}case 13:{a.externalData&&a.externalData.length||(a.externalData=[]),a.externalData.push($.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 14:{a.dataLocation=t.int32();break}case 10:{if(a.doubleData&&a.doubleData.length||(a.doubleData=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.doubleData.push(t.double());else a.doubleData.push(t.double());break}case 11:{if(a.uint64Data&&a.uint64Data.length||(a.uint64Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.uint64Data.push(t.uint64());else a.uint64Data.push(t.uint64());break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var o=0;o<t.dims.length;++o)if(!E.isInteger(t.dims[o])&&!(t.dims[o]&&E.isInteger(t.dims[o].low)&&E.isInteger(t.dims[o].high)))return"dims: integer|Long[] expected"}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&!E.isInteger(t.dataType))return"dataType: integer expected";if(t.segment!=null&&t.hasOwnProperty("segment")){var i=$.onnx.TensorProto.Segment.verify(t.segment);if(i)return"segment."+i}if(t.floatData!=null&&t.hasOwnProperty("floatData")){if(!Array.isArray(t.floatData))return"floatData: array expected";for(var o=0;o<t.floatData.length;++o)if(typeof t.floatData[o]!="number")return"floatData: number[] expected"}if(t.int32Data!=null&&t.hasOwnProperty("int32Data")){if(!Array.isArray(t.int32Data))return"int32Data: array expected";for(var o=0;o<t.int32Data.length;++o)if(!E.isInteger(t.int32Data[o]))return"int32Data: integer[] expected"}if(t.stringData!=null&&t.hasOwnProperty("stringData")){if(!Array.isArray(t.stringData))return"stringData: array expected";for(var o=0;o<t.stringData.length;++o)if(!(t.stringData[o]&&typeof t.stringData[o].length=="number"||E.isString(t.stringData[o])))return"stringData: buffer[] expected"}if(t.int64Data!=null&&t.hasOwnProperty("int64Data")){if(!Array.isArray(t.int64Data))return"int64Data: array expected";for(var o=0;o<t.int64Data.length;++o)if(!E.isInteger(t.int64Data[o])&&!(t.int64Data[o]&&E.isInteger(t.int64Data[o].low)&&E.isInteger(t.int64Data[o].high)))return"int64Data: integer|Long[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!E.isString(t.name))return"name: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!E.isString(t.docString))return"docString: string expected";if(t.rawData!=null&&t.hasOwnProperty("rawData")&&!(t.rawData&&typeof t.rawData.length=="number"||E.isString(t.rawData)))return"rawData: buffer expected";if(t.externalData!=null&&t.hasOwnProperty("externalData")){if(!Array.isArray(t.externalData))return"externalData: array expected";for(var o=0;o<t.externalData.length;++o){var i=$.onnx.StringStringEntryProto.verify(t.externalData[o]);if(i)return"externalData."+i}}if(t.dataLocation!=null&&t.hasOwnProperty("dataLocation"))switch(t.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:break}if(t.doubleData!=null&&t.hasOwnProperty("doubleData")){if(!Array.isArray(t.doubleData))return"doubleData: array expected";for(var o=0;o<t.doubleData.length;++o)if(typeof t.doubleData[o]!="number")return"doubleData: number[] expected"}if(t.uint64Data!=null&&t.hasOwnProperty("uint64Data")){if(!Array.isArray(t.uint64Data))return"uint64Data: array expected";for(var o=0;o<t.uint64Data.length;++o)if(!E.isInteger(t.uint64Data[o])&&!(t.uint64Data[o]&&E.isInteger(t.uint64Data[o].low)&&E.isInteger(t.uint64Data[o].high)))return"uint64Data: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof $.onnx.TensorProto)return t;var o=new $.onnx.TensorProto;if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.TensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)E.Long?(o.dims[i]=E.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new E.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}if(t.dataType!=null&&(o.dataType=t.dataType|0),t.segment!=null){if(typeof t.segment!="object")throw TypeError(".onnx.TensorProto.segment: object expected");o.segment=$.onnx.TensorProto.Segment.fromObject(t.segment)}if(t.floatData){if(!Array.isArray(t.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");o.floatData=[];for(var i=0;i<t.floatData.length;++i)o.floatData[i]=Number(t.floatData[i])}if(t.int32Data){if(!Array.isArray(t.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");o.int32Data=[];for(var i=0;i<t.int32Data.length;++i)o.int32Data[i]=t.int32Data[i]|0}if(t.stringData){if(!Array.isArray(t.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");o.stringData=[];for(var i=0;i<t.stringData.length;++i)typeof t.stringData[i]=="string"?E.base64.decode(t.stringData[i],o.stringData[i]=E.newBuffer(E.base64.length(t.stringData[i])),0):t.stringData[i].length>=0&&(o.stringData[i]=t.stringData[i])}if(t.int64Data){if(!Array.isArray(t.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");o.int64Data=[];for(var i=0;i<t.int64Data.length;++i)E.Long?(o.int64Data[i]=E.Long.fromValue(t.int64Data[i])).unsigned=!1:typeof t.int64Data[i]=="string"?o.int64Data[i]=parseInt(t.int64Data[i],10):typeof t.int64Data[i]=="number"?o.int64Data[i]=t.int64Data[i]:typeof t.int64Data[i]=="object"&&(o.int64Data[i]=new E.LongBits(t.int64Data[i].low>>>0,t.int64Data[i].high>>>0).toNumber())}if(t.name!=null&&(o.name=String(t.name)),t.docString!=null&&(o.docString=String(t.docString)),t.rawData!=null&&(typeof t.rawData=="string"?E.base64.decode(t.rawData,o.rawData=E.newBuffer(E.base64.length(t.rawData)),0):t.rawData.length>=0&&(o.rawData=t.rawData)),t.externalData){if(!Array.isArray(t.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");o.externalData=[];for(var i=0;i<t.externalData.length;++i){if(typeof t.externalData[i]!="object")throw TypeError(".onnx.TensorProto.externalData: object expected");o.externalData[i]=$.onnx.StringStringEntryProto.fromObject(t.externalData[i])}}switch(t.dataLocation){default:if(typeof t.dataLocation=="number"){o.dataLocation=t.dataLocation;break}break;case"DEFAULT":case 0:o.dataLocation=0;break;case"EXTERNAL":case 1:o.dataLocation=1;break}if(t.doubleData){if(!Array.isArray(t.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");o.doubleData=[];for(var i=0;i<t.doubleData.length;++i)o.doubleData[i]=Number(t.doubleData[i])}if(t.uint64Data){if(!Array.isArray(t.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");o.uint64Data=[];for(var i=0;i<t.uint64Data.length;++i)E.Long?(o.uint64Data[i]=E.Long.fromValue(t.uint64Data[i])).unsigned=!0:typeof t.uint64Data[i]=="string"?o.uint64Data[i]=parseInt(t.uint64Data[i],10):typeof t.uint64Data[i]=="number"?o.uint64Data[i]=t.uint64Data[i]:typeof t.uint64Data[i]=="object"&&(o.uint64Data[i]=new E.LongBits(t.uint64Data[i].low>>>0,t.uint64Data[i].high>>>0).toNumber(!0))}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[],i.floatData=[],i.int32Data=[],i.stringData=[],i.int64Data=[],i.doubleData=[],i.uint64Data=[],i.externalData=[]),o.defaults&&(i.dataType=0,i.segment=null,i.name="",o.bytes===String?i.rawData="":(i.rawData=[],o.bytes!==Array&&(i.rawData=E.newBuffer(i.rawData))),i.docString="",i.dataLocation=o.enums===String?"DEFAULT":0),t.dims&&t.dims.length){i.dims=[];for(var a=0;a<t.dims.length;++a)typeof t.dims[a]=="number"?i.dims[a]=o.longs===String?String(t.dims[a]):t.dims[a]:i.dims[a]=o.longs===String?E.Long.prototype.toString.call(t.dims[a]):o.longs===Number?new E.LongBits(t.dims[a].low>>>0,t.dims[a].high>>>0).toNumber():t.dims[a]}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&(i.dataType=t.dataType),t.segment!=null&&t.hasOwnProperty("segment")&&(i.segment=$.onnx.TensorProto.Segment.toObject(t.segment,o)),t.floatData&&t.floatData.length){i.floatData=[];for(var a=0;a<t.floatData.length;++a)i.floatData[a]=o.json&&!isFinite(t.floatData[a])?String(t.floatData[a]):t.floatData[a]}if(t.int32Data&&t.int32Data.length){i.int32Data=[];for(var a=0;a<t.int32Data.length;++a)i.int32Data[a]=t.int32Data[a]}if(t.stringData&&t.stringData.length){i.stringData=[];for(var a=0;a<t.stringData.length;++a)i.stringData[a]=o.bytes===String?E.base64.encode(t.stringData[a],0,t.stringData[a].length):o.bytes===Array?Array.prototype.slice.call(t.stringData[a]):t.stringData[a]}if(t.int64Data&&t.int64Data.length){i.int64Data=[];for(var a=0;a<t.int64Data.length;++a)typeof t.int64Data[a]=="number"?i.int64Data[a]=o.longs===String?String(t.int64Data[a]):t.int64Data[a]:i.int64Data[a]=o.longs===String?E.Long.prototype.toString.call(t.int64Data[a]):o.longs===Number?new E.LongBits(t.int64Data[a].low>>>0,t.int64Data[a].high>>>0).toNumber():t.int64Data[a]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.rawData!=null&&t.hasOwnProperty("rawData")&&(i.rawData=o.bytes===String?E.base64.encode(t.rawData,0,t.rawData.length):o.bytes===Array?Array.prototype.slice.call(t.rawData):t.rawData),t.doubleData&&t.doubleData.length){i.doubleData=[];for(var a=0;a<t.doubleData.length;++a)i.doubleData[a]=o.json&&!isFinite(t.doubleData[a])?String(t.doubleData[a]):t.doubleData[a]}if(t.uint64Data&&t.uint64Data.length){i.uint64Data=[];for(var a=0;a<t.uint64Data.length;++a)typeof t.uint64Data[a]=="number"?i.uint64Data[a]=o.longs===String?String(t.uint64Data[a]):t.uint64Data[a]:i.uint64Data[a]=o.longs===String?E.Long.prototype.toString.call(t.uint64Data[a]):o.longs===Number?new E.LongBits(t.uint64Data[a].low>>>0,t.uint64Data[a].high>>>0).toNumber(!0):t.uint64Data[a]}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.externalData&&t.externalData.length){i.externalData=[];for(var a=0;a<t.externalData.length;++a)i.externalData[a]=$.onnx.StringStringEntryProto.toObject(t.externalData[a],o)}return t.dataLocation!=null&&t.hasOwnProperty("dataLocation")&&(i.dataLocation=o.enums===String?$.onnx.TensorProto.DataLocation[t.dataLocation]===void 0?t.dataLocation:$.onnx.TensorProto.DataLocation[t.dataLocation]:t.dataLocation),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,qe.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorProto"},e.DataType=function(){var r={},t=Object.create(r);return t[r[0]="UNDEFINED"]=0,t[r[1]="FLOAT"]=1,t[r[2]="UINT8"]=2,t[r[3]="INT8"]=3,t[r[4]="UINT16"]=4,t[r[5]="INT16"]=5,t[r[6]="INT32"]=6,t[r[7]="INT64"]=7,t[r[8]="STRING"]=8,t[r[9]="BOOL"]=9,t[r[10]="FLOAT16"]=10,t[r[11]="DOUBLE"]=11,t[r[12]="UINT32"]=12,t[r[13]="UINT64"]=13,t[r[14]="COMPLEX64"]=14,t[r[15]="COMPLEX128"]=15,t[r[16]="BFLOAT16"]=16,t[r[17]="FLOAT8E4M3FN"]=17,t[r[18]="FLOAT8E4M3FNUZ"]=18,t[r[19]="FLOAT8E5M2"]=19,t[r[20]="FLOAT8E5M2FNUZ"]=20,t}(),e.Segment=function(){function r(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}return r.prototype.begin=E.Long?E.Long.fromBits(0,0,!1):0,r.prototype.end=E.Long?E.Long.fromBits(0,0,!1):0,r.create=function(o){return new r(o)},r.encode=function(o,i){return i||(i=rt.create()),o.begin!=null&&Object.hasOwnProperty.call(o,"begin")&&i.uint32(8).int64(o.begin),o.end!=null&&Object.hasOwnProperty.call(o,"end")&&i.uint32(16).int64(o.end),i},r.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},r.decode=function(o,i){o instanceof K||(o=K.create(o));for(var a=i===void 0?o.len:o.pos+i,s=new $.onnx.TensorProto.Segment;o.pos<a;){var u=o.uint32();switch(u>>>3){case 1:{s.begin=o.int64();break}case 2:{s.end=o.int64();break}default:o.skipType(u&7);break}}return s},r.decodeDelimited=function(o){return o instanceof K||(o=new K(o)),this.decode(o,o.uint32())},r.verify=function(o){return typeof o!="object"||o===null?"object expected":o.begin!=null&&o.hasOwnProperty("begin")&&!E.isInteger(o.begin)&&!(o.begin&&E.isInteger(o.begin.low)&&E.isInteger(o.begin.high))?"begin: integer|Long expected":o.end!=null&&o.hasOwnProperty("end")&&!E.isInteger(o.end)&&!(o.end&&E.isInteger(o.end.low)&&E.isInteger(o.end.high))?"end: integer|Long expected":null},r.fromObject=function(o){if(o instanceof $.onnx.TensorProto.Segment)return o;var i=new $.onnx.TensorProto.Segment;return o.begin!=null&&(E.Long?(i.begin=E.Long.fromValue(o.begin)).unsigned=!1:typeof o.begin=="string"?i.begin=parseInt(o.begin,10):typeof o.begin=="number"?i.begin=o.begin:typeof o.begin=="object"&&(i.begin=new E.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber())),o.end!=null&&(E.Long?(i.end=E.Long.fromValue(o.end)).unsigned=!1:typeof o.end=="string"?i.end=parseInt(o.end,10):typeof o.end=="number"?i.end=o.end:typeof o.end=="object"&&(i.end=new E.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber())),i},r.toObject=function(o,i){i||(i={});var a={};if(i.defaults){if(E.Long){var s=new E.Long(0,0,!1);a.begin=i.longs===String?s.toString():i.longs===Number?s.toNumber():s}else a.begin=i.longs===String?"0":0;if(E.Long){var s=new E.Long(0,0,!1);a.end=i.longs===String?s.toString():i.longs===Number?s.toNumber():s}else a.end=i.longs===String?"0":0}return o.begin!=null&&o.hasOwnProperty("begin")&&(typeof o.begin=="number"?a.begin=i.longs===String?String(o.begin):o.begin:a.begin=i.longs===String?E.Long.prototype.toString.call(o.begin):i.longs===Number?new E.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber():o.begin),o.end!=null&&o.hasOwnProperty("end")&&(typeof o.end=="number"?a.end=i.longs===String?String(o.end):o.end:a.end=i.longs===String?E.Long.prototype.toString.call(o.end):i.longs===Number?new E.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber():o.end),a},r.prototype.toJSON=function(){return this.constructor.toObject(this,qe.util.toJSONOptions)},r.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TensorProto.Segment"},r}(),e.DataLocation=function(){var r={},t=Object.create(r);return t[r[0]="DEFAULT"]=0,t[r[1]="EXTERNAL"]=1,t}(),e}(),n.SparseTensorProto=function(){function e(r){if(this.dims=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.values=null,e.prototype.indices=null,e.prototype.dims=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=rt.create()),t.values!=null&&Object.hasOwnProperty.call(t,"values")&&$.onnx.TensorProto.encode(t.values,o.uint32(10).fork()).ldelim(),t.indices!=null&&Object.hasOwnProperty.call(t,"indices")&&$.onnx.TensorProto.encode(t.indices,o.uint32(18).fork()).ldelim(),t.dims!=null&&t.dims.length){o.uint32(26).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.SparseTensorProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.values=$.onnx.TensorProto.decode(t,t.uint32());break}case 2:{a.indices=$.onnx.TensorProto.decode(t,t.uint32());break}case 3:{if(a.dims&&a.dims.length||(a.dims=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.dims.push(t.int64());else a.dims.push(t.int64());break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.values!=null&&t.hasOwnProperty("values")){var o=$.onnx.TensorProto.verify(t.values);if(o)return"values."+o}if(t.indices!=null&&t.hasOwnProperty("indices")){var o=$.onnx.TensorProto.verify(t.indices);if(o)return"indices."+o}if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var i=0;i<t.dims.length;++i)if(!E.isInteger(t.dims[i])&&!(t.dims[i]&&E.isInteger(t.dims[i].low)&&E.isInteger(t.dims[i].high)))return"dims: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof $.onnx.SparseTensorProto)return t;var o=new $.onnx.SparseTensorProto;if(t.values!=null){if(typeof t.values!="object")throw TypeError(".onnx.SparseTensorProto.values: object expected");o.values=$.onnx.TensorProto.fromObject(t.values)}if(t.indices!=null){if(typeof t.indices!="object")throw TypeError(".onnx.SparseTensorProto.indices: object expected");o.indices=$.onnx.TensorProto.fromObject(t.indices)}if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)E.Long?(o.dims[i]=E.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new E.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[]),o.defaults&&(i.values=null,i.indices=null),t.values!=null&&t.hasOwnProperty("values")&&(i.values=$.onnx.TensorProto.toObject(t.values,o)),t.indices!=null&&t.hasOwnProperty("indices")&&(i.indices=$.onnx.TensorProto.toObject(t.indices,o)),t.dims&&t.dims.length){i.dims=[];for(var a=0;a<t.dims.length;++a)typeof t.dims[a]=="number"?i.dims[a]=o.longs===String?String(t.dims[a]):t.dims[a]:i.dims[a]=o.longs===String?E.Long.prototype.toString.call(t.dims[a]):o.longs===Number?new E.LongBits(t.dims[a].low>>>0,t.dims[a].high>>>0).toNumber():t.dims[a]}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,qe.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.SparseTensorProto"},e}(),n.TensorShapeProto=function(){function e(r){if(this.dim=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.dim=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=rt.create()),t.dim!=null&&t.dim.length)for(var i=0;i<t.dim.length;++i)$.onnx.TensorShapeProto.Dimension.encode(t.dim[i],o.uint32(10).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.TensorShapeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.dim&&a.dim.length||(a.dim=[]),a.dim.push($.onnx.TensorShapeProto.Dimension.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dim!=null&&t.hasOwnProperty("dim")){if(!Array.isArray(t.dim))return"dim: array expected";for(var o=0;o<t.dim.length;++o){var i=$.onnx.TensorShapeProto.Dimension.verify(t.dim[o]);if(i)return"dim."+i}}return null},e.fromObject=function(t){if(t instanceof $.onnx.TensorShapeProto)return t;var o=new $.onnx.TensorShapeProto;if(t.dim){if(!Array.isArray(t.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");o.dim=[];for(var i=0;i<t.dim.length;++i){if(typeof t.dim[i]!="object")throw TypeError(".onnx.TensorShapeProto.dim: object expected");o.dim[i]=$.onnx.TensorShapeProto.Dimension.fromObject(t.dim[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dim=[]),t.dim&&t.dim.length){i.dim=[];for(var a=0;a<t.dim.length;++a)i.dim[a]=$.onnx.TensorShapeProto.Dimension.toObject(t.dim[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,qe.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorShapeProto"},e.Dimension=function(){function r(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}r.prototype.dimValue=null,r.prototype.dimParam=null,r.prototype.denotation="";var t;return Object.defineProperty(r.prototype,"value",{get:E.oneOfGetter(t=["dimValue","dimParam"]),set:E.oneOfSetter(t)}),r.create=function(i){return new r(i)},r.encode=function(i,a){return a||(a=rt.create()),i.dimValue!=null&&Object.hasOwnProperty.call(i,"dimValue")&&a.uint32(8).int64(i.dimValue),i.dimParam!=null&&Object.hasOwnProperty.call(i,"dimParam")&&a.uint32(18).string(i.dimParam),i.denotation!=null&&Object.hasOwnProperty.call(i,"denotation")&&a.uint32(26).string(i.denotation),a},r.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},r.decode=function(i,a){i instanceof K||(i=K.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new $.onnx.TensorShapeProto.Dimension;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.dimValue=i.int64();break}case 2:{u.dimParam=i.string();break}case 3:{u.denotation=i.string();break}default:i.skipType(l&7);break}}return u},r.decodeDelimited=function(i){return i instanceof K||(i=new K(i)),this.decode(i,i.uint32())},r.verify=function(i){if(typeof i!="object"||i===null)return"object expected";var a={};if(i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(a.value=1,!E.isInteger(i.dimValue)&&!(i.dimValue&&E.isInteger(i.dimValue.low)&&E.isInteger(i.dimValue.high))))return"dimValue: integer|Long expected";if(i.dimParam!=null&&i.hasOwnProperty("dimParam")){if(a.value===1)return"value: multiple values";if(a.value=1,!E.isString(i.dimParam))return"dimParam: string expected"}return i.denotation!=null&&i.hasOwnProperty("denotation")&&!E.isString(i.denotation)?"denotation: string expected":null},r.fromObject=function(i){if(i instanceof $.onnx.TensorShapeProto.Dimension)return i;var a=new $.onnx.TensorShapeProto.Dimension;return i.dimValue!=null&&(E.Long?(a.dimValue=E.Long.fromValue(i.dimValue)).unsigned=!1:typeof i.dimValue=="string"?a.dimValue=parseInt(i.dimValue,10):typeof i.dimValue=="number"?a.dimValue=i.dimValue:typeof i.dimValue=="object"&&(a.dimValue=new E.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber())),i.dimParam!=null&&(a.dimParam=String(i.dimParam)),i.denotation!=null&&(a.denotation=String(i.denotation)),a},r.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.denotation=""),i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(typeof i.dimValue=="number"?s.dimValue=a.longs===String?String(i.dimValue):i.dimValue:s.dimValue=a.longs===String?E.Long.prototype.toString.call(i.dimValue):a.longs===Number?new E.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber():i.dimValue,a.oneofs&&(s.value="dimValue")),i.dimParam!=null&&i.hasOwnProperty("dimParam")&&(s.dimParam=i.dimParam,a.oneofs&&(s.value="dimParam")),i.denotation!=null&&i.hasOwnProperty("denotation")&&(s.denotation=i.denotation),s},r.prototype.toJSON=function(){return this.constructor.toObject(this,qe.util.toJSONOptions)},r.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TensorShapeProto.Dimension"},r}(),e}(),n.TypeProto=function(){function e(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}e.prototype.tensorType=null,e.prototype.sequenceType=null,e.prototype.mapType=null,e.prototype.optionalType=null,e.prototype.sparseTensorType=null,e.prototype.denotation="";var r;return Object.defineProperty(e.prototype,"value",{get:E.oneOfGetter(r=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:E.oneOfSetter(r)}),e.create=function(o){return new e(o)},e.encode=function(o,i){return i||(i=rt.create()),o.tensorType!=null&&Object.hasOwnProperty.call(o,"tensorType")&&$.onnx.TypeProto.Tensor.encode(o.tensorType,i.uint32(10).fork()).ldelim(),o.sequenceType!=null&&Object.hasOwnProperty.call(o,"sequenceType")&&$.onnx.TypeProto.Sequence.encode(o.sequenceType,i.uint32(34).fork()).ldelim(),o.mapType!=null&&Object.hasOwnProperty.call(o,"mapType")&&$.onnx.TypeProto.Map.encode(o.mapType,i.uint32(42).fork()).ldelim(),o.denotation!=null&&Object.hasOwnProperty.call(o,"denotation")&&i.uint32(50).string(o.denotation),o.sparseTensorType!=null&&Object.hasOwnProperty.call(o,"sparseTensorType")&&$.onnx.TypeProto.SparseTensor.encode(o.sparseTensorType,i.uint32(66).fork()).ldelim(),o.optionalType!=null&&Object.hasOwnProperty.call(o,"optionalType")&&$.onnx.TypeProto.Optional.encode(o.optionalType,i.uint32(74).fork()).ldelim(),i},e.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},e.decode=function(o,i){o instanceof K||(o=K.create(o));for(var a=i===void 0?o.len:o.pos+i,s=new $.onnx.TypeProto;o.pos<a;){var u=o.uint32();switch(u>>>3){case 1:{s.tensorType=$.onnx.TypeProto.Tensor.decode(o,o.uint32());break}case 4:{s.sequenceType=$.onnx.TypeProto.Sequence.decode(o,o.uint32());break}case 5:{s.mapType=$.onnx.TypeProto.Map.decode(o,o.uint32());break}case 9:{s.optionalType=$.onnx.TypeProto.Optional.decode(o,o.uint32());break}case 8:{s.sparseTensorType=$.onnx.TypeProto.SparseTensor.decode(o,o.uint32());break}case 6:{s.denotation=o.string();break}default:o.skipType(u&7);break}}return s},e.decodeDelimited=function(o){return o instanceof K||(o=new K(o)),this.decode(o,o.uint32())},e.verify=function(o){if(typeof o!="object"||o===null)return"object expected";var i={};if(o.tensorType!=null&&o.hasOwnProperty("tensorType")){i.value=1;{var a=$.onnx.TypeProto.Tensor.verify(o.tensorType);if(a)return"tensorType."+a}}if(o.sequenceType!=null&&o.hasOwnProperty("sequenceType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=$.onnx.TypeProto.Sequence.verify(o.sequenceType);if(a)return"sequenceType."+a}}if(o.mapType!=null&&o.hasOwnProperty("mapType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=$.onnx.TypeProto.Map.verify(o.mapType);if(a)return"mapType."+a}}if(o.optionalType!=null&&o.hasOwnProperty("optionalType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=$.onnx.TypeProto.Optional.verify(o.optionalType);if(a)return"optionalType."+a}}if(o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=$.onnx.TypeProto.SparseTensor.verify(o.sparseTensorType);if(a)return"sparseTensorType."+a}}return o.denotation!=null&&o.hasOwnProperty("denotation")&&!E.isString(o.denotation)?"denotation: string expected":null},e.fromObject=function(o){if(o instanceof $.onnx.TypeProto)return o;var i=new $.onnx.TypeProto;if(o.tensorType!=null){if(typeof o.tensorType!="object")throw TypeError(".onnx.TypeProto.tensorType: object expected");i.tensorType=$.onnx.TypeProto.Tensor.fromObject(o.tensorType)}if(o.sequenceType!=null){if(typeof o.sequenceType!="object")throw TypeError(".onnx.TypeProto.sequenceType: object expected");i.sequenceType=$.onnx.TypeProto.Sequence.fromObject(o.sequenceType)}if(o.mapType!=null){if(typeof o.mapType!="object")throw TypeError(".onnx.TypeProto.mapType: object expected");i.mapType=$.onnx.TypeProto.Map.fromObject(o.mapType)}if(o.optionalType!=null){if(typeof o.optionalType!="object")throw TypeError(".onnx.TypeProto.optionalType: object expected");i.optionalType=$.onnx.TypeProto.Optional.fromObject(o.optionalType)}if(o.sparseTensorType!=null){if(typeof o.sparseTensorType!="object")throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");i.sparseTensorType=$.onnx.TypeProto.SparseTensor.fromObject(o.sparseTensorType)}return o.denotation!=null&&(i.denotation=String(o.denotation)),i},e.toObject=function(o,i){i||(i={});var a={};return i.defaults&&(a.denotation=""),o.tensorType!=null&&o.hasOwnProperty("tensorType")&&(a.tensorType=$.onnx.TypeProto.Tensor.toObject(o.tensorType,i),i.oneofs&&(a.value="tensorType")),o.sequenceType!=null&&o.hasOwnProperty("sequenceType")&&(a.sequenceType=$.onnx.TypeProto.Sequence.toObject(o.sequenceType,i),i.oneofs&&(a.value="sequenceType")),o.mapType!=null&&o.hasOwnProperty("mapType")&&(a.mapType=$.onnx.TypeProto.Map.toObject(o.mapType,i),i.oneofs&&(a.value="mapType")),o.denotation!=null&&o.hasOwnProperty("denotation")&&(a.denotation=o.denotation),o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")&&(a.sparseTensorType=$.onnx.TypeProto.SparseTensor.toObject(o.sparseTensorType,i),i.oneofs&&(a.value="sparseTensorType")),o.optionalType!=null&&o.hasOwnProperty("optionalType")&&(a.optionalType=$.onnx.TypeProto.Optional.toObject(o.optionalType,i),i.oneofs&&(a.value="optionalType")),a},e.prototype.toJSON=function(){return this.constructor.toObject(this,qe.util.toJSONOptions)},e.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TypeProto"},e.Tensor=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=rt.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&a.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&$.onnx.TensorShapeProto.encode(i.shape,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof K||(i=K.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new $.onnx.TypeProto.Tensor;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=$.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof K||(i=new K(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!E.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var a=$.onnx.TensorShapeProto.verify(i.shape);if(a)return"shape."+a}return null},t.fromObject=function(i){if(i instanceof $.onnx.TypeProto.Tensor)return i;var a=new $.onnx.TypeProto.Tensor;if(i.elemType!=null&&(a.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");a.shape=$.onnx.TensorShapeProto.fromObject(i.shape)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=0,s.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(s.shape=$.onnx.TensorShapeProto.toObject(i.shape,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,qe.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Tensor"},t}(),e.Sequence=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=rt.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&$.onnx.TypeProto.encode(i.elemType,a.uint32(10).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof K||(i=K.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new $.onnx.TypeProto.Sequence;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=$.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof K||(i=new K(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var a=$.onnx.TypeProto.verify(i.elemType);if(a)return"elemType."+a}return null},t.fromObject=function(i){if(i instanceof $.onnx.TypeProto.Sequence)return i;var a=new $.onnx.TypeProto.Sequence;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");a.elemType=$.onnx.TypeProto.fromObject(i.elemType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=$.onnx.TypeProto.toObject(i.elemType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,qe.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Sequence"},t}(),e.Map=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.keyType=0,t.prototype.valueType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=rt.create()),i.keyType!=null&&Object.hasOwnProperty.call(i,"keyType")&&a.uint32(8).int32(i.keyType),i.valueType!=null&&Object.hasOwnProperty.call(i,"valueType")&&$.onnx.TypeProto.encode(i.valueType,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof K||(i=K.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new $.onnx.TypeProto.Map;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.keyType=i.int32();break}case 2:{u.valueType=$.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof K||(i=new K(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.keyType!=null&&i.hasOwnProperty("keyType")&&!E.isInteger(i.keyType))return"keyType: integer expected";if(i.valueType!=null&&i.hasOwnProperty("valueType")){var a=$.onnx.TypeProto.verify(i.valueType);if(a)return"valueType."+a}return null},t.fromObject=function(i){if(i instanceof $.onnx.TypeProto.Map)return i;var a=new $.onnx.TypeProto.Map;if(i.keyType!=null&&(a.keyType=i.keyType|0),i.valueType!=null){if(typeof i.valueType!="object")throw TypeError(".onnx.TypeProto.Map.valueType: object expected");a.valueType=$.onnx.TypeProto.fromObject(i.valueType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.keyType=0,s.valueType=null),i.keyType!=null&&i.hasOwnProperty("keyType")&&(s.keyType=i.keyType),i.valueType!=null&&i.hasOwnProperty("valueType")&&(s.valueType=$.onnx.TypeProto.toObject(i.valueType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,qe.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Map"},t}(),e.Optional=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=rt.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&$.onnx.TypeProto.encode(i.elemType,a.uint32(10).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof K||(i=K.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new $.onnx.TypeProto.Optional;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=$.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof K||(i=new K(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var a=$.onnx.TypeProto.verify(i.elemType);if(a)return"elemType."+a}return null},t.fromObject=function(i){if(i instanceof $.onnx.TypeProto.Optional)return i;var a=new $.onnx.TypeProto.Optional;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");a.elemType=$.onnx.TypeProto.fromObject(i.elemType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=$.onnx.TypeProto.toObject(i.elemType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,qe.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Optional"},t}(),e.SparseTensor=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=rt.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&a.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&$.onnx.TensorShapeProto.encode(i.shape,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof K||(i=K.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new $.onnx.TypeProto.SparseTensor;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=$.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof K||(i=new K(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!E.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var a=$.onnx.TensorShapeProto.verify(i.shape);if(a)return"shape."+a}return null},t.fromObject=function(i){if(i instanceof $.onnx.TypeProto.SparseTensor)return i;var a=new $.onnx.TypeProto.SparseTensor;if(i.elemType!=null&&(a.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");a.shape=$.onnx.TensorShapeProto.fromObject(i.shape)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=0,s.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(s.shape=$.onnx.TensorShapeProto.toObject(i.shape,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,qe.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.SparseTensor"},t}(),e}(),n.OperatorSetIdProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.domain="",e.prototype.version=E.Long?E.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=rt.create()),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(10).string(t.domain),t.version!=null&&Object.hasOwnProperty.call(t,"version")&&o.uint32(16).int64(t.version),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.OperatorSetIdProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.domain=t.string();break}case 2:{a.version=t.int64();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.domain!=null&&t.hasOwnProperty("domain")&&!E.isString(t.domain)?"domain: string expected":t.version!=null&&t.hasOwnProperty("version")&&!E.isInteger(t.version)&&!(t.version&&E.isInteger(t.version.low)&&E.isInteger(t.version.high))?"version: integer|Long expected":null},e.fromObject=function(t){if(t instanceof $.onnx.OperatorSetIdProto)return t;var o=new $.onnx.OperatorSetIdProto;return t.domain!=null&&(o.domain=String(t.domain)),t.version!=null&&(E.Long?(o.version=E.Long.fromValue(t.version)).unsigned=!1:typeof t.version=="string"?o.version=parseInt(t.version,10):typeof t.version=="number"?o.version=t.version:typeof t.version=="object"&&(o.version=new E.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber())),o},e.toObject=function(t,o){o||(o={});var i={};if(o.defaults)if(i.domain="",E.Long){var a=new E.Long(0,0,!1);i.version=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.version=o.longs===String?"0":0;return t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.version!=null&&t.hasOwnProperty("version")&&(typeof t.version=="number"?i.version=o.longs===String?String(t.version):t.version:i.version=o.longs===String?E.Long.prototype.toString.call(t.version):o.longs===Number?new E.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber():t.version),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,qe.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.OperatorSetIdProto"},e}(),n.OperatorStatus=function(){var e={},r=Object.create(e);return r[e[0]="EXPERIMENTAL"]=0,r[e[1]="STABLE"]=1,r}(),n.FunctionProto=function(){function e(r){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.input=E.emptyArray,e.prototype.output=E.emptyArray,e.prototype.attribute=E.emptyArray,e.prototype.attributeProto=E.emptyArray,e.prototype.node=E.emptyArray,e.prototype.docString="",e.prototype.opsetImport=E.emptyArray,e.prototype.domain="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=rt.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(34).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(42).string(t.output[i]);if(t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)o.uint32(50).string(t.attribute[i]);if(t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)$.onnx.NodeProto.encode(t.node[i],o.uint32(58).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(66).string(t.docString),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)$.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(74).fork()).ldelim();if(t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(82).string(t.domain),t.attributeProto!=null&&t.attributeProto.length)for(var i=0;i<t.attributeProto.length;++i)$.onnx.AttributeProto.encode(t.attributeProto[i],o.uint32(90).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.FunctionProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 4:{a.input&&a.input.length||(a.input=[]),a.input.push(t.string());break}case 5:{a.output&&a.output.length||(a.output=[]),a.output.push(t.string());break}case 6:{a.attribute&&a.attribute.length||(a.attribute=[]),a.attribute.push(t.string());break}case 11:{a.attributeProto&&a.attributeProto.length||(a.attributeProto=[]),a.attributeProto.push($.onnx.AttributeProto.decode(t,t.uint32()));break}case 7:{a.node&&a.node.length||(a.node=[]),a.node.push($.onnx.NodeProto.decode(t,t.uint32()));break}case 8:{a.docString=t.string();break}case 9:{a.opsetImport&&a.opsetImport.length||(a.opsetImport=[]),a.opsetImport.push($.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 10:{a.domain=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!E.isString(t.name))return"name: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!E.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!E.isString(t.output[o]))return"output: string[] expected"}if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o)if(!E.isString(t.attribute[o]))return"attribute: string[] expected"}if(t.attributeProto!=null&&t.hasOwnProperty("attributeProto")){if(!Array.isArray(t.attributeProto))return"attributeProto: array expected";for(var o=0;o<t.attributeProto.length;++o){var i=$.onnx.AttributeProto.verify(t.attributeProto[o]);if(i)return"attributeProto."+i}}if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=$.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!E.isString(t.docString))return"docString: string expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=$.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}return t.domain!=null&&t.hasOwnProperty("domain")&&!E.isString(t.domain)?"domain: string expected":null},e.fromObject=function(t){if(t instanceof $.onnx.FunctionProto)return t;var o=new $.onnx.FunctionProto;if(t.name!=null&&(o.name=String(t.name)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.FunctionProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.FunctionProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i)o.attribute[i]=String(t.attribute[i])}if(t.attributeProto){if(!Array.isArray(t.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");o.attributeProto=[];for(var i=0;i<t.attributeProto.length;++i){if(typeof t.attributeProto[i]!="object")throw TypeError(".onnx.FunctionProto.attributeProto: object expected");o.attributeProto[i]=$.onnx.AttributeProto.fromObject(t.attributeProto[i])}}if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.FunctionProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.FunctionProto.node: object expected");o.node[i]=$.onnx.NodeProto.fromObject(t.node[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.FunctionProto.opsetImport: object expected");o.opsetImport[i]=$.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}return t.domain!=null&&(o.domain=String(t.domain)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[],i.node=[],i.opsetImport=[],i.attributeProto=[]),o.defaults&&(i.name="",i.docString="",i.domain=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=t.input[a]}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=t.output[a]}if(t.attribute&&t.attribute.length){i.attribute=[];for(var a=0;a<t.attribute.length;++a)i.attribute[a]=t.attribute[a]}if(t.node&&t.node.length){i.node=[];for(var a=0;a<t.node.length;++a)i.node[a]=$.onnx.NodeProto.toObject(t.node[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var a=0;a<t.opsetImport.length;++a)i.opsetImport[a]=$.onnx.OperatorSetIdProto.toObject(t.opsetImport[a],o)}if(t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.attributeProto&&t.attributeProto.length){i.attributeProto=[];for(var a=0;a<t.attributeProto.length;++a)i.attributeProto[a]=$.onnx.AttributeProto.toObject(t.attributeProto[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,qe.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.FunctionProto"},e}(),n}();hm.exports=$});function Qn(n,e){if(!n)throw new Error(typeof e=="string"?e:e())}function Eo(n){return new TextDecoder().decode(n)}var je,On,bl,gt,Li,pt,xt,re,Po,Pn,En,Cn,ze=N(()=>{"use strict";Bs();je=Te(Yn());Dn();On=class{static arraysEqual(e,r){if(e.length!==r.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!==r[t])return!1;return!0}},bl=class{static preprocessInputShapes(e,r){let t=e.length===1?[1,e[0]]:e,o=r.length===1?[r[0],1]:r;return[t,o]}static postprocessOutputShape(e,r,t){r===1&&e.splice(e.length-2,1),t===1&&e.pop()}static calcMatMulShape(e,r){return e[1]!==r[0]?void 0:[e[0],r[1]]}},gt=class n{static calcShape(e,r,t=!1){let o=e.length,i=r.length;if(o===0)return r;if(i===0)return e;let a=Math.max(e.length,r.length),s=new Array(a);if(t){if(o<2||i<2)return;let u=bl.calcMatMulShape([e[o-2],e[o-1]],[r[i-2],r[i-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=t?3:1;u<=a;u++){let l=o-u<0?1:e[o-u],d=i-u<0?1:r[i-u];if(l!==d&&l>1&&d>1)return;s[a-u]=Math.max(l,d)}return s}static index(e,r){let t=new Array(r.length);return n.fillIndex(e,r,t),t}static fillIndex(e,r,t){let o=e.length-r.length;for(let i=0;i<r.length;i++)t[i]=e[o+i]%r[i]}static calc(e,r,t,o,i){let a=n.calcShape(e.dims,r.dims);if(a){if(o&&!re.areEqual(a,e.dims))return;let s=re.size(a),u=o?e:new ot(a,i||e.type);if(a.length===0)u.set([],t(e.get([]),r.get([])));else{let l=new Array(a.length),d=new Array(e.dims.length),f=new Array(r.dims.length),m=0,b=0,y=!1,_=!1;e.dims.length===0&&(m=e.get([]),y=!0),r.dims.length===0&&(b=r.get([]),_=!0);let T;for(let w=0;w<s;w++){T=w;for(let x=a.length-1;x>=0;x--)l[x]=T%a[x],T=Math.floor(T/a[x]);y||(n.fillIndex(l,e.dims,d),m=e.get(d)),_||(n.fillIndex(l,r.dims,f),b=r.get(f)),u.set(l,t(m,b))}}return u}}static isValidBroadcast(e,r){let t=e.length,o=r.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==r[o-i])return!1;return!0}static getBroadcastDims(e,r){let t=e.length,o=[];for(let i=0;i<t;i++){let a=t-1-i,s=e[a]||1;(r[r.length-1-i]||1)>1&&s===1&&o.unshift(a)}return o}},Li=class{static getShapeOfGemmResult(e,r,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let a,s,u;r?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(i&&!gt.isValidBroadcast(i,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},pt=class n{static tensorDataTypeFromProto(e){switch(e){case je.onnx.TensorProto.DataType.INT8:return"int8";case je.onnx.TensorProto.DataType.UINT8:return"uint8";case je.onnx.TensorProto.DataType.BOOL:return"bool";case je.onnx.TensorProto.DataType.INT16:return"int16";case je.onnx.TensorProto.DataType.UINT16:return"uint16";case je.onnx.TensorProto.DataType.INT32:return"int32";case je.onnx.TensorProto.DataType.UINT32:return"uint32";case je.onnx.TensorProto.DataType.FLOAT:return"float32";case je.onnx.TensorProto.DataType.DOUBLE:return"float64";case je.onnx.TensorProto.DataType.STRING:return"string";case je.onnx.TensorProto.DataType.INT64:return"int32";case je.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw new Error(`unsupported data type: ${je.onnx.TensorProto.DataType[e]}`)}}static tensorDataTypeStringToEnum(e){switch(e){case"int8":return je.onnx.TensorProto.DataType.INT8;case"uint8":return je.onnx.TensorProto.DataType.UINT8;case"bool":return je.onnx.TensorProto.DataType.BOOL;case"int16":return je.onnx.TensorProto.DataType.INT16;case"uint16":return je.onnx.TensorProto.DataType.UINT16;case"int32":return je.onnx.TensorProto.DataType.INT32;case"uint32":return je.onnx.TensorProto.DataType.UINT32;case"float32":return je.onnx.TensorProto.DataType.FLOAT;case"float64":return je.onnx.TensorProto.DataType.DOUBLE;case"string":return je.onnx.TensorProto.DataType.STRING;case"int64":return je.onnx.TensorProto.DataType.INT64;case"uint64":return je.onnx.TensorProto.DataType.UINT64;default:throw new Error(`unsupported data type: ${e}`)}}static tensorDimsFromProto(e){return e.map(r=>un.isLong(r)?r.toNumber():r)}static tensorValueTypeFromProto(e){return{tensorType:n.tensorDataTypeFromProto(e.elemType),shape:{dims:n.tensorDimsFromProto(e.shape.dim.map(r=>r.dimValue))}}}static tensorDimsFromORTFormat(e){let r=[];for(let t=0;t<e.dimsLength();t++)r.push(xt.longToNumber(e.dims(t)));return r}static tensorAttributesFromORTFormat(e){let r=[];for(let t=0;t<e.attributesLength();t++)r.push(e.attributes(t));return r}},xt=class{static longToNumber(e){return un.isLong(e)?e.toNumber():typeof e=="bigint"?Number(e):e}static isLong(e){return un.isLong(e)||typeof e=="bigint"}},re=class n{static size(e){return n.getSizeFromDimensionRange(e,0,e.length)}static sizeFromDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,r,e.length)}static sizeToDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,0,r)}static getSizeFromDimensionRange(e,r,t){let o=1;for(let i=r;i<t;i++){if(e[i]<=0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");o*=e[i]}return o}static computeStrides(e){let r=e.length;if(r===0)return[];if(r===1)return[1];let t=new Array(r);t[r-1]=1,t[r-2]=e[r-1];for(let o=r-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static transpose(e){return e.slice().reverse()}static indicesToOffset(e,r,t){t===void 0&&(t=e.length);let o=0;for(let i=0;i<t;++i)o+=r[i]*e[i];return o}static offsetToIndices(e,r){let t=r.length;if(t===0)return[];if(t===1)return[e*r[0]];let o=new Array(r.length);for(let i=0;i<o.length-1;++i)o[i]=Math.floor(e/r[i]),e-=o[i]*r[i];return o[o.length-1]=e,o}static normalizeAxis(e,r){if(e<-r&&e>=r)throw new Error("unsupported axis for this operation.");return e<0?e+r:e}static normalizeAxes(e,r){return e.map(t=>this.normalizeAxis(t,r))}static incrementIndex(e,r,t){if(r.length===0||e.length===0)throw new Error("Index incrementing unsupported for scalar Tensor");if(t===void 0)t=r.length;else if(t<=0||t>r.length)throw new Error("Incorrect axis to increment on");for(let o=t-1;o>=0&&(e[o]++,!(e[o]<r[o]));--o)e[o]=0}static calculateReshapedDims(e,r){if(r.length===0){if(e.length===0||n.size(e)===1)return[];throw new Error("cannot reshape to a scalar Tensor")}let t=r.length,o=new Array(t),i=-1,a=1;for(let u=0;u<t;u++){if(r[u]<-1)throw new Error("a dimension in shape hints cannot be less than -1");if(r[u]===-1){if(i!==-1)throw new Error("at most one dimension in shape hints can be -1");i=u}else{if(r[u]===0){if(u>=e.length)throw new Error("the dimension with value zero exceeds the dimension size of the input tensor");o[u]=e[u]}else o[u]=r[u];a*=o[u]}}let s=n.size(e);if(i!==-1){if(s%a!==0)throw new Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${e}] Output shape: [${r}]`);o[i]=s/a}else if(a!==s)throw new Error("reshapedDims and originalDims don't have matching sizes");return o}static sortBasedOnPerm(e,r){return r?r.map(t=>e[t]):e.slice().reverse()}static padShape(e,r){let t=e.length;return e.map((o,i)=>o+r[i]+r[i+t])}static areEqual(e,r){return e.length!==r.length?!1:e.every((t,o)=>t===r[o])}static validateDimsAndCalcSize(e){if(e.length>6)throw new TypeError("Only rank 0 to 6 is supported for tensor shape.");let r=1;for(let t of e){if(!Number.isInteger(t))throw new TypeError(`Invalid shape: ${t} is not an integer`);if(t<0||t>2147483647)throw new TypeError(`Invalid shape: length ${t} is not allowed`);r*=t}return r}static flattenShape(e,r){r<0&&(r+=e.length);let t=e.reduce((a,s)=>a*s,1),o=e.slice(r).reduce((a,s)=>a*s,1);return[t/o,o]}static squeezeShape(e,r){let t=new Array;r=n.normalizeAxes(r,e.length);for(let o=0;o<e.length;o++){let i=r.indexOf(o)>=0;if(i&&e[o]!==1)throw new Error("squeeze an axis of size different than 1");(r.length===0&&e[o]>1||r.length>0&&!i)&&t.push(e[o])}return t}static unsqueezeShape(e,r){let t=new Array(e.length+r.length);t.fill(0);for(let i=0;i<r.length;i++){let a=n.normalizeAxis(r[i],t.length);if(a>=t.length)throw new Error("'axes' has an out of range axis");if(t[a]!==0)throw new Error("'axes' has a duplicate axis");t[a]=1}let o=0;for(let i=0;i<t.length;i++)t[i]===0&&(t[i]=e[o++]);if(o!==e.length)throw new Error("the unsqueezed dimension could not be established");return t}},Po=class n{static splitShape(e,r,t,o){if(t.length===0){if(!o)throw new Error("need to know number of outputs when the 'split' attribute is not specified");n.determineSplit(e[r],o,t)}let i=[],a=[0];for(let s=0;s<t.length;++s){s!==0&&a.push(a[s-1]+t[s-1]);let u=e.slice();u[r]=t[s],i.push(u)}return[i,a]}static determineSplit(e,r,t){if(e%r!==0)throw new Error("cannot split tensor to equal sized parts");for(let o=0;o<r;++o)t.push(e/r)}},Pn=class n{static adjustPoolAttributes(e,r,t,o,i,a){if(!e&&t.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let s=0;s<r.length-2;s++)s>=t.length?t.push(r[s+2]):t[s]=r[s+2];for(let s=0;s<t.length;s++)if(s<o.length){if(o[s]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let s=0;s<t.length;s++)if(s<i.length){if(i[s]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let s=0;s<t.length*2;s++)if(s<a.length){if(a[s]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let s=0;s<t.length;s++){if(t[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[s]>=t[s]||a[s+t.length]>=t[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,r,t,o,i,a){if(a){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let s=0;s<e.length-2;s++)n.adjustPadAndReturnShape(e[s+2],r[s],t[s],o[s],i,s,s+e.length-2,a)}}static computePoolOutputShape(e,r,t,o,i,a,s){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return n.computeShapeHelper(e,r,u,t,o,i,a,s),u}static computeConvOutputShape(e,r,t,o,i,a,s){if(e.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],r[0]];return n.computeShapeHelper(!1,e,u,t,o,i,a,s),u}static computeShapeHelper(e,r,t,o,i,a,s,u){if(e)for(let l=0;l<r.length-2;l++)t.push(1);else for(let l=0;l<r.length-2;l++)t.push(n.adjustPadAndReturnShape(r[l+2],o[l],i[l],a[l],s,l,l+r.length-2,u))}static adjustPadAndReturnShape(e,r,t,o,i,a,s,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[a]=0,i[s]=0,Math.floor((e-l)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let f=((e+r-1)/r-1)*r+o-e;return i[a]=Math.floor(u==="SAME_LOWER"?(f+1)/2:f/2),i[s]=f-i[a],Math.floor((e+f-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[a]+i[s]-l)/r+1)}},En=-34028234663852886e22,Cn=34028234663852886e22});function dA(n){switch(n){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw new Error(`cannot calculate sizeof() on type ${n}`)}}function mm(n){switch(n){case $e.onnx.TensorProto.DataType.UINT8:case $e.onnx.TensorProto.DataType.INT8:case $e.onnx.TensorProto.DataType.BOOL:return 1;case $e.onnx.TensorProto.DataType.UINT16:case $e.onnx.TensorProto.DataType.INT16:return 2;case $e.onnx.TensorProto.DataType.FLOAT:case $e.onnx.TensorProto.DataType.INT32:case $e.onnx.TensorProto.DataType.UINT32:return 4;case $e.onnx.TensorProto.DataType.INT64:case $e.onnx.TensorProto.DataType.DOUBLE:case $e.onnx.TensorProto.DataType.UINT64:return 8;default:throw new Error(`cannot calculate sizeof() on type ${$e.onnx.TensorProto.DataType[n]}`)}}function pA(n,e){return new(ym(e))(n)}function ym(n){switch(n){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw new Error("unspecified error")}}function yl(n,e){if(e===$e.onnx.TensorProto.DataType.INT64||e===Io.TensorDataType.INT64){if(n.greaterThanOrEqual(2147483648)||n.lessThan(-2147483648))throw new TypeError("int64 is not supported")}else if(e===$e.onnx.TensorProto.DataType.UINT32||e===Io.TensorDataType.UINT32||e===$e.onnx.TensorProto.DataType.UINT64||e===Io.TensorDataType.UINT64){if(n.greaterThanOrEqual(4294967296)||n.lessThan(0))throw new TypeError("uint64 is not supported")}else throw new TypeError(`not a LONG type: ${$e.onnx.TensorProto.DataType[e]}`);return n.toNumber()}function gm(n,e,r){switch(e){case $e.onnx.TensorProto.DataType.BOOL:case $e.onnx.TensorProto.DataType.UINT8:return n.getUint8(r);case $e.onnx.TensorProto.DataType.INT8:return n.getInt8(r);case $e.onnx.TensorProto.DataType.UINT16:return n.getUint16(r,!0);case $e.onnx.TensorProto.DataType.INT16:return n.getInt16(r,!0);case $e.onnx.TensorProto.DataType.FLOAT:return n.getFloat32(r,!0);case $e.onnx.TensorProto.DataType.INT32:return n.getInt32(r,!0);case $e.onnx.TensorProto.DataType.UINT32:return n.getUint32(r,!0);case $e.onnx.TensorProto.DataType.INT64:return yl(un.fromBits(n.getUint32(r,!0),n.getUint32(r+4,!0),!1),e);case $e.onnx.TensorProto.DataType.DOUBLE:return n.getFloat64(r,!0);case $e.onnx.TensorProto.DataType.UINT64:return yl(un.fromBits(n.getUint32(r,!0),n.getUint32(r+4,!0),!0),e);default:throw new Error(`cannot read from DataView for type ${$e.onnx.TensorProto.DataType[e]}`)}}var bm,$e,ot,Dn=N(()=>{"use strict";bm=Te(Nf());Bs();So();$e=Te(Yn());ze();ot=class n{constructor(e,r,t,o,i,a=bm.Guid.create()){this.dims=e;this.type=r;this.dataProvider=t;this.asyncDataProvider=o;this.cache=i;this.dataId=a;this.size=re.validateDimsAndCalcSize(e);let s=this.size,u=t===void 0&&o===void 0&&i===void 0;if(i!==void 0&&i.length!==s)throw new RangeError("Input dims doesn't match data length.");if(r==="string"){if(i!==void 0&&(!Array.isArray(i)||!i.every(l=>typeof l=="string")))throw new TypeError("cache should be a string array");u&&(this.cache=new Array(s))}else{if(i!==void 0){let l=ym(r);if(!(i instanceof l))throw new TypeError(`cache should be type ${l.name}`)}if(u){let l=new ArrayBuffer(s*dA(r));this.cache=pA(l,r)}}}get data(){if(this.cache===void 0){let e=this.dataProvider(this.dataId);if(e.length!==this.size)throw new Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=e}return this.cache}get stringData(){if(this.type!=="string")throw new TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw new TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw new TypeError("data type is not float (float32, float64)")}}get numberData(){if(this.type!=="string")return this.data;throw new TypeError("type cannot be non-number (string)")}get(e){return this.data[re.indicesToOffset(e,this.strides)]}set(e,r){this.data[re.indicesToOffset(e,this.strides)]=r}async getData(){return this.cache===void 0&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=re.computeStrides(this.dims)),this._strides}static fromProto(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let r=pt.tensorDataTypeFromProto(e.dataType),t=pt.tensorDimsFromProto(e.dims),o=new n(t,r);if(r==="string")e.stringData.forEach((i,a)=>{o.data[a]=Eo(i)});else if(e.rawData&&typeof e.rawData.byteLength=="number"&&e.rawData.byteLength>0){let i=o.data,a=new DataView(e.rawData.buffer,e.rawData.byteOffset,e.rawData.byteLength),s=mm(e.dataType),u=e.rawData.byteLength/s;if(e.rawData.byteLength%s!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let d=gm(a,e.dataType,l*s);i[l]=d}}else{let i;switch(e.dataType){case $e.onnx.TensorProto.DataType.FLOAT:i=e.floatData;break;case $e.onnx.TensorProto.DataType.INT32:case $e.onnx.TensorProto.DataType.INT16:case $e.onnx.TensorProto.DataType.UINT16:case $e.onnx.TensorProto.DataType.INT8:case $e.onnx.TensorProto.DataType.UINT8:case $e.onnx.TensorProto.DataType.BOOL:i=e.int32Data;break;case $e.onnx.TensorProto.DataType.INT64:i=e.int64Data;break;case $e.onnx.TensorProto.DataType.DOUBLE:i=e.doubleData;break;case $e.onnx.TensorProto.DataType.UINT32:case $e.onnx.TensorProto.DataType.UINT64:i=e.uint64Data;break;default:throw new Error("unspecific error")}if(i==null)throw new Error("failed to populate data from a tensorproto value");let a=o.data;if(a.length!==i.length)throw new Error("array length mismatch");for(let s=0;s<i.length;s++){let u=i[s];un.isLong(u)?a[s]=yl(u,e.dataType):a[s]=u}}return o}static fromData(e,r,t){return new n(r,t,void 0,void 0,e)}static fromOrtTensor(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let r=pt.tensorDimsFromORTFormat(e),t=pt.tensorDataTypeFromProto(e.dataType()),o=new n(r,t);if(t==="string")for(let i=0;i<e.stringDataLength();i++)o.data[i]=e.stringData(i);else if(e.rawDataArray()&&typeof e.rawDataLength()=="number"&&e.rawDataLength()>0){let i=o.data,a=new DataView(e.rawDataArray().buffer,e.rawDataArray().byteOffset,e.rawDataLength()),s=mm(e.dataType()),u=e.rawDataLength()/s;if(e.rawDataLength()%s!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let d=gm(a,e.dataType(),l*s);i[l]=d}}return o}}});function le(n){return n===1?fA:hA}function _m(n){let e=le(n);return`${e.version}
      precision highp float;
      ${e.attribute} vec3 position;
      ${e.attribute} vec2 textureCoord;

      ${e.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function vm(n){let e=le(n);return`${e.version}
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

    `}function wm(n,e){let r=le(n);return`
  void main() {
    int indices[${e}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${r.output} = result;
  }
  `}var fA,hA,Ye=N(()=>{"use strict";fA={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},hA={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}});var Oe=N(()=>{"use strict"});async function _l(n,e=t=>0,r){return new Promise((t,o)=>{let i=0,a=()=>{if(n()){t();return}i++;let s=e(i);if(r!=null&&i>=r){o();return}setTimeout(a,s)};a()})}function Ri(n){return Qn(typeof n<"u"&&n.length!==0,()=>"empty string found for sampler name"),"get"+n.charAt(0).toUpperCase()+n.slice(1)}function xm(n){return Qn(typeof n<"u"&&n.length!==0,()=>"empty string found for sampler name"),"get"+n.charAt(0).toUpperCase()+n.slice(1)+"AtOutCoords"}function eo(n,e){let r=JSON.parse(JSON.stringify(n));return r=e,r}function to(n,e){return e.map(r=>n[r]).join(", ")}function bt(n){if(n<=1)return"int";if(n===2)return"ivec2";if(n===3)return"ivec3";if(n===4)return"ivec4";if(n===5)return"ivec5";if(n===6)return"ivec6";throw Error(`GPU for rank ${n} is not yet supported`)}function Kt(n=6){return["x","y","z","w","u","v"].slice(0,n)}var Lr=N(()=>{"use strict";ze()});function mA(n,e){return Kt(e).map(r=>`${n}.${r}`)}function ro(n,e){return e===1?[n]:mA(n,e)}function Rr(){return`
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
  `}var kn=N(()=>{"use strict";Lr()});function bA(n,e,r){if(n===0)return"false";if(n===1)return`rc > ${e[0]}`;let t="";for(let o=n-2;o<n;o++)t+=`${r[o]} >= ${e[o-n+2]}`,o<n-1&&(t+="||");return t}function yA(n,e){let r=n.length;if(r===0)return"getA(), 0, 0, 0";if(r===1)return`getA(rc),
            rc + 1 >= ${n[0]} ? 0. : getA(rc + 1),
            0, 0`;let t="r, c",o="r, cp1",i="rp1, c",a="rp1, cp1",s="";if(r>2)for(let u=0;u<r-2;++u)s=s+`${e[u]},`;return`getA(${s}${t}),
          rEdge ? 0. : getA(${s}${i}),
          cEdge ? 0. : getA(${s}${o}),
          rEdge || cEdge ? 0. : getA(${s}${a})`}function _A(n,e,r,t){return n===0||n===1?"":`
    int r = ${e[n-2]};
    int c = ${e[n-1]};
    int rp1 = ${e[n-2]} + 1;
    int cp1 = ${e[n-1]} + 1;
    bool rEdge = rp1 >= ${t};
    bool cEdge = cp1 >= ${r};
    `}var Tm,gA,Im,Sm=N(()=>{"use strict";Ye();Oe();Lr();kn();Tm={name:"pack",inputNames:["A"],inputTypes:[1]},gA=(n,e)=>{let r=le(n.session.backend.glContext.version),t=e.dims,o=t.length,i=e.dims.length,a=bt(i),s=ro("rc",i),u=_A(i,s,t[t.length-2],t[t.length-1]),l;o===0?l=[1,1]:o===1?l=[t[0],1]:l=[t[i-1],t[i-2]];let d=bA(i,l,s),f=yA(t,s),m=`
        void main() {
          ${a} rc = getOutputCoords();

          if(${d}) {
            ${r.output} = vec4(0);
          } else {
            ${u}

            ${r.output} = vec4(${f});
          }
        }
      `;return{...Tm,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:2},shaderSource:m}},Im=(n,e)=>({...Tm,get:()=>gA(n,e)})});function vl(n){if(n.length===0)return[1,1,1];let e=1;for(let r=0;r<n.length-2;++r)e*=n[r];return[e,n.length>1?n[n.length-2]:1,n[n.length-1]]}function Am(n,e){let r=!1;return n.length===0||e.length===0?r=!0:n.length<2||e.length<2?r=n[n.length-1]===e[e.length-1]:r=n[n.length-1]===e[e.length-1]&&n[n.length-2]===e[e.length-2],r}function xA(n){let e=re.computeStrides(n),r=["b","r","c"],t="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${e.map((i,a)=>{let s=`int ${r[a]} = ${t} / ${i}`,u=a===e.length-1?`int ${r[a+1]} = ${t} - ${r[a]} * ${i}`:`index -= ${r[a]} * ${i}`;return`${s}; ${u};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function TA(n){let e=re.computeStrides(n);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${e[0]} + coords.z * ${e[1]} + coords.y;
  }
`}var vA,wA,$m,Om=N(()=>{"use strict";ze();Ye();Oe();kn();vA=n=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${n}`}),wA=(n,e,r,t)=>{let o=e.dims,i=t,a="";for(let l=0;l<4;l++){let d="";switch(l){case 0:d="outputCoords = rc;";break;case 1:d="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:d="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:d="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw new Error}a+=`
        ${d}
        ${l>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${l}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${l>0?"}":""}
      `}let s=le(n.session.backend.glContext.version),u=`
      ${xA(o)}
      ${TA(i)}
      ${Rr()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${i[2]};
        int cols = ${i[1]};

        ${a}
        ${s.output} = result;
      }
    `;return{...r,output:{dims:i,type:e.type,textureType:2},shaderSource:u,hasMain:!0}},$m=(n,e,r)=>{let t=vA(r);return{...t,get:()=>wA(n,e,t,r)}}});var wl,Pm=N(()=>{"use strict";Ye();Oe();wl=(n,e)=>{let r=e.shape,t=le(n.session.backend.glContext.version),o=`
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
    }`,i={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:r,type:e.tensor.type,textureType:3},shaderSource:o,hasMain:!0};return n.executeProgram(i,[e.tensor])}});function SA(n,e){if(n===1)return"rc";let r="";for(let t=0;t<n;t++)r+=e[t],t<n-1&&(r+=",");return r}var Em,IA,Cm,Dm=N(()=>{"use strict";Ye();Oe();Lr();kn();Em={name:"unpack",inputNames:["A"],inputTypes:[2]},IA=(n,e)=>{let r=e.dims.length,t=ro("rc",r),o=t.slice(-2),i=bt(r),a=Rr(),u=e.dims.length===0?"":SA(r,t),l=r<=1?"rc":`vec2(${o.join(",")})`,d=le(n.session.backend.glContext.version),f=`
    ${a}
    void main() {
      ${i} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${u});

       ${d.output} = vec4(getChannel(packedInput, ${l}), 0, 0, 0);
     }
   `;return{...Em,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:f}},Cm=(n,e)=>({...Em,get:()=>IA(n,e)})});var zi,Co,Mi,Do=N(()=>{"use strict";kt();zi=class{constructor(e,r=1){if(r===1)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=r;else if(r===4)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=r;else throw new Error(`Invalid number of channels: ${r}`)}encode(e,r){let t,o;return e.constructor!==Float32Array&&(Fe.warning("Encoder","data was not of type Float32; creating new Float32Array"),o=new Float32Array(e)),r*this.channelSize>e.length?(Fe.warning("Encoder","Source data too small. Allocating larger array"),o=e,t=this.allocate(r*this.channelSize),o.forEach((i,a)=>t[a]=i)):(o=e,t=o),t}allocate(e){return new Float32Array(e*4)}decode(e,r){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,r):e.subarray(0,r)}},Co=class{constructor(e,r=1,t){if(r!==1&&r!==4)throw new Error(`Invalid number of channels: ${r}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=r,this.textureType=t||e.FLOAT}encode(e,r){let t=e;return this.channelSize===1&&(Fe.verbose("Encoder","Exploding into a larger array"),t=this.allocate(r),e.forEach((o,i)=>t[i*4]=o)),t}allocate(e){return new Float32Array(e*4)}decode(e,r){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,r):e.subarray(0,r)}},Mi=class{constructor(e,r=1){this.channelSize=4;if(r===1)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=r;else if(r===4)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=r;else throw new Error(`Invalid number of channels: ${r}`)}encode(e,r){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,r){if(e instanceof Uint8Array)return e.subarray(0,r);throw new Error(`Invalid array type: ${e.constructor}`)}}});var ko,km,xl,Nm=N(()=>{"use strict";ze();Oe();ko=(n,e,r)=>{let t=r===0||r===1?1:4,o=r===2,i=r===1||r===2,a=r===4?e.length-1:void 0,s=r===4?e.map((u,l)=>l===e.length-1?u*4:u):void 0;return xl(n,e,t,s,{isPacked:o,reverseWH:i,breakAxis:a})},km=(n,e,r)=>{let t=ko(n,e,r);return[t.width,t.height]},xl=(n,e,r=1,t,o)=>{let i=!!(o&&o.isPacked),[a,s]=n.computeTextureWH(i&&t||e,o),u=e.length,l=e.slice(0);if(u===0&&(l=[1]),r===1)t=e;else if(i){if(r!==4)throw new Error("a packed texture must be 4-channel");t=e,u>0&&(l[u-1]=Math.ceil(l[u-1]/2)),u>1&&(l[u-2]=Math.ceil(l[u-2]/2))}else if(!t)throw new Error("Unpacked shape is needed when using channels > 1");return{width:a,height:s,channels:r,isPacked:i,shape:l,strides:re.computeStrides(l),unpackedShape:t,reversedWH:o&&o.reverseWH}}});var AA,Bi,Rm=N(()=>{"use strict";kt();Dn();ze();Sm();Om();Pm();Dm();Do();Nm();Oe();AA=(n,e)=>{let r=e.map(o=>`${o.unpackedShape.join(",")};${o.width}x${o.height}`).join("_"),t=n.name;return n.cacheHint&&(t+="["+n.cacheHint+"]"),t+=":"+r,t},Bi=class{constructor(e){this.session=e;this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,r){return km(this.session.layoutStrategy,e,r)}executeProgram(e,r){if(r.length<e.inputNames.length)throw new Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw new Error("input names size does not match input types");let t=[];for(let l=0;l<e.inputNames.length;++l)t[l]=this.getOrCreateTextureData(r[l],e.inputTypes[l]);let o=AA(e,t),i=this.session.programManager.getArtifact(o),a=i?i.programInfo:typeof e.get=="function"?e.get():e,s=ko(this.session.layoutStrategy,a.output.dims,a.output.textureType),u=this.createTextureData(s,a.output.type);return i||(i=this.session.programManager.build(a,t,u),this.session.programManager.setArtifact(o,i)),this.runProgram(i,t,u),u}run(e,r){return this.executeProgram(e,r).tensor}runProgram(e,r,t){for(let o=0;o<r.length;++o)if(!!r[o].isPacked!=(e.programInfo.inputTypes[o]===2))throw new Error(`input[${o}] property packed inconsistent`);if(!!t.isPacked!=(e.programInfo.output.textureType===2))throw new Error("output property packed inconsistent");this.session.programManager.run(e,r,t)}getOrCreateTextureData(e,r){let t=this.getTextureData(e.dataId,r===2);if(!t&&(t=this.getTextureData(e.dataId,r!==2),t))return r===2?this.pack(t):this.unpack(t);if(!t){let o=ko(this.session.layoutStrategy,e.dims,r);if(r===4){let s=e.dims;if(s.length===4){let u=[s[0],Math.ceil(s[1]*s[2]*s[3]/4)],l=ko(this.session.layoutStrategy,u,r),d=e.numberData;if(s[1]*s[2]*s[3]%4!==0){let f=s[0],m=s[1]*s[2]*s[3],b=Math.ceil(m*1/4)*4,y=f*b;d=new Float32Array(y);for(let _=0;_<f;++_){let T=_*m,w=_*b+_%1*m;d.set(e.numberData.subarray(T,T+m),w)}}return this.createTextureData(l,e.type,d,e,1)}}if(r===2){let i=xl(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),a=this.createTextureData(i,e.type,e.numberData,e,1);t=this.pack(a)}else t=this.createTextureData(o,e.type,e.numberData,e,1)}return t}createTextureDataFromLayoutBindTensor(e,r,t,o){return this.createTextureData(e,r,t,o,1)}createTextureData(e,r,t,o,i){Fe.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let a=this.session.textureManager.createTextureFromLayout(r,e,t,i);return this.createTextureDataFromTexture(e,r,a,o)}reshapeUnpacked(e,r){let t=this.getOrCreateTextureData(e,0),o={channels:t.channels,height:t.height,width:t.width,shape:r.length!==0?r:[1],strides:re.computeStrides(r),unpackedShape:r};return this.createTextureDataFromTexture(o,e.type,t.texture).tensor}reshapePacked(e,r){let t=this.getOrCreateTextureData(e,2);if(Am(e.dims,r)){let l={channels:t.channels,height:t.height,width:t.width,shape:r.length!==0?r:[1],strides:re.computeStrides(r),unpackedShape:r,isPacked:!0};return this.createTextureDataFromTexture(l,e.type,t.texture).tensor}let o=vl(e.dims),i=vl(r),a=this.reshapePacked(e,o),s=this.run($m(this,a,i),[a]);return this.reshapePacked(s,r)}cast(e,r){let t=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(t,r,t.texture).tensor}createTextureDataFromTexture(e,r,t,o,i){let a={...e,tensor:o||new ot(e.unpackedShape,r,s=>this.readTexture(a),async s=>this.readTextureAsync(a),void 0,i),texture:t};return this.setTextureData(a.tensor.dataId,a,e.isPacked),a}getTextureData(e,r=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,r):r?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,r,t=!1){this.session.isInitializer(e)?this.session.setTextureData(e,r,t):(t?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,r)}isTextureLayoutCached(e,r=!1){return!!this.getTextureData(e.dataId,r)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(wl(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(wl(this,e))}pack(e){return this.executeProgram(Im(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(Cm(this,e.tensor),[e.tensor])}}});var Tl,Ie,ct=N(()=>{"use strict";Tl=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},Ie=n=>new Tl(n)});var zm,Mm,Bm,OA,PA,Fm=N(()=>{"use strict";ct();Ye();Oe();zm={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},Mm=(n,e,r)=>(PA(e),[n.run({...zm,cacheHint:r.cacheKey,get:()=>OA(n,e,r)},e)]),Bm=n=>{let e=n.attributes.getFloat("epsilon",1e-5),r=n.attributes.getFloat("momentum",.9),t=n.attributes.getInt("spatial",1);return Ie({epsilon:e,momentum:r,spatial:t})},OA=(n,e,r)=>{let t=le(n.session.backend.glContext.version),o=e[0].dims.length,[i,a]=n.calculateTextureWidthAndHeight(e[1].dims,0),s=`
  float process(int[${o}] indices) {
    vec2 position = offsetToCoords(indices[1], ${i}, ${a});
    float scale = getColorAsFloat(${t.texture2D}(Scale, position));
    float mean = getColorAsFloat(${t.texture2D}(Mean, position));
    float variance = getColorAsFloat(${t.texture2D}(Variance, position));
    float b = getColorAsFloat(${t.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${r.epsilon})) ) + b;
  }`;return{...zm,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:s}},PA=n=>{if(!n||n.length!==5)throw new Error("BatchNormalization requires 5 inputs.");let e=n[0],r=n[1],t=n[2],o=n[3],i=n[4];if(e.dims.length<3||r.dims.length!==1||t.dims.length!==1||o.dims.length!==1||i.dims.length!==1)throw new Error("invalid input shape.");if(r.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1]||o.dims[0]!==e.dims[1]||i.dims[0]!==e.dims[1])throw new Error("invalid input shape.");if(e.type!=="float32"&&e.type!=="float64"||r.type!=="float32"&&r.type!=="float64"||t.type!=="float32"&&t.type!=="float64"||o.type!=="float32"&&o.type!=="float64"||i.type!=="float32"&&i.type!=="float64")throw new Error("invalid input tensor types.")}});var Fi,Bt,Z,No,Vi,Jr=N(()=>{"use strict";Fi=class{constructor(e,r,t,o){this.glContext=e;this.programInfo=r;this.inputTextureLayouts=t;this.outputTextureLayout=o}},Bt=class{constructor(e){this.context=e}},Z=class{constructor(e,r){this.routineBody=e;this.dependencies=r}},No=class{constructor(e,r,t){this.name=e;t?this.dependencies=t:this.dependencies=[],r&&(this.routineBody=r)}addDependency(e){e&&this.dependencies.push(e)}},Vi=class{static returnOrderedNodes(e){if(!e||e.length===0)return[];if(e.length===1)return e;let r=new Set,t=new Set,o=new Array;return this.createOrderedNodes(e,r,t,o),o}static createOrderedNodes(e,r,t,o){for(let i=0;i<e.length;++i)this.dfsTraverse(e[i],r,t,o)}static dfsTraverse(e,r,t,o){if(!e||t.has(e.name))return;if(r.has(e.name))throw new Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");r.add(e.name);let i=e.dependencies;if(i&&i.length>0)for(let a=0;a<i.length;++a)this.dfsTraverse(i[a],r,t,o);o.push(e),t.add(e.name),r.delete(e.name)}}});function CA(){let n="add_";return{body:`
  float ${n}(float a, float b) {
    return a + b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:n,type:0}}function DA(){let n="div_";return{body:`
  float ${n}(float a, float b) {
    return a / b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:n,type:0}}function kA(){let n="mul_";return{body:`
  float ${n}(float a, float b) {
    return a * b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:n,type:0}}function NA(){let n="sub_";return{body:`
  float ${n}(float a, float b) {
    return a - b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:n,type:0}}function LA(){let n="equal_";return{body:`
  float ${n}(float a, float b) {
    return float(a == b);
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:n,type:0}}function RA(){let n="greater_";return{body:`
  float ${n}(float a, float b) {
    return float(a > b);
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:n,type:0}}function zA(){let n="less_";return{body:`
  float ${n}(float a, float b) {
    return float(a < b);
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:n,type:0}}function MA(){let n="and_";return{body:`
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
  `,name:n,type:0}}function BA(){let n="or_";return{body:`
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
  `,name:n,type:0}}function FA(){let n="xor_";return{body:`
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
  `,name:n,type:0}}function VA(){return UA("pow")}function GA(){let n="prelu_";return{body:`
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
  `,name:n,type:0}}function UA(n){let e=`${n}_`;return{body:`
  float ${e}(float a, float b) {
    return ${n}(a, b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return ${n}(v1, v2);
  }
  `,name:e,type:0}}var Ft,WA,Vm,Gm,Um,Wm,Hm,qm,jm,Km,Xm,Zm,Jm,Ym,Qm=N(()=>{"use strict";ze();Jr();Ye();Oe();Ft=(n,e,r,t=e[0].type,o)=>{let i=n.session.pack?2:0;return{name:r.name,inputNames:["A","B"],inputTypes:[i,i],cacheHint:o,get:()=>WA(n,e,r,t)}},WA=(n,e,r,t=e[0].type)=>{let o=n.session.pack?2:0,i=!re.areEqual(e[0].dims,e[1].dims),a=e[0].dims,s=n.session.pack;if(i){let d=gt.calcShape(e[0].dims,e[1].dims,!1);if(!d)throw new Error("Can't perform binary op on the given tensors");a=d;let f=a.length,m=e[0].dims.length!==0?e[0].dims.length:1,b=e[1].dims.length!==0?e[1].dims.length:1,y=e[0].dims.length!==0?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",_=e[1].dims.length!==0?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",T=le(n.session.backend.glContext.version),w=s?`
      ${r.body}
      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();
        vec4 result = ${r.name}(a, b);
        ${T.output} = result;
      }`:`
      ${r.body}
      float process(int indices[${f}]) {
        int aindices[${m}];
        int bindices[${b}];
        ${y}
        ${_}
        return ${r.name}(_A(aindices), _B(bindices));
      }`;return{name:r.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:a,type:t,textureType:o},shaderSource:w,hasMain:s}}let u=le(n.session.backend.glContext.version),l=`
    ${r.body}
    void main() {
      vec4 v1 = ${u.texture2D}(A, TexCoords);
      vec4 v2 = ${u.texture2D}(B, TexCoords);
      vec4 result = ${r.name}(v1, v2);
      ${u.output} = result;
    }
    `;return{name:r.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:e[0].dims,type:t,textureType:o},shaderSource:l,hasMain:!0}},Vm=(n,e)=>[n.run(Ft(n,e,CA()),e)],Gm=(n,e)=>[n.run(Ft(n,e,MA(),"bool"),e)],Um=(n,e)=>[n.run(Ft(n,e,DA()),e)],Wm=(n,e)=>[n.run(Ft(n,e,LA(),"bool"),e)],Hm=(n,e)=>[n.run(Ft(n,e,RA(),"bool"),e)],qm=(n,e)=>[n.run(Ft(n,e,zA(),"bool"),e)],jm=(n,e)=>[n.run(Ft(n,e,kA()),e)],Km=(n,e)=>[n.run(Ft(n,e,BA(),"bool"),e)],Xm=(n,e)=>[n.run(Ft(n,e,VA()),e)],Zm=(n,e)=>[n.run(Ft(n,e,GA()),e)],Jm=(n,e)=>[n.run(Ft(n,e,NA()),e)],Ym=(n,e)=>[n.run(Ft(n,e,FA(),"bool"),e)]});var eg,tg,qA,rg=N(()=>{"use strict";ze();eg=(n,e,r)=>(qA(e),[n.cast(e[0],r)]),tg=n=>pt.tensorDataTypeFromProto(n.attributes.getInt("to")),qA=n=>{if(!n||n.length!==1)throw new Error("Cast requires 1 input.");if(n[0].type==="string")throw new Error("Invalid input type.")}});var jA,KA,ng,Gi,og=N(()=>{"use strict";Ye();Oe();Lr();kn();jA=(n,e)=>({name:"Concat (packed)",inputNames:Array.from({length:n},(r,t)=>`X${t}`),inputTypes:Array(n).fill(2),cacheHint:e}),KA=(n,e,r,t)=>{let o=r[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let P=1;P<r.length;P++){let C=r[P].dims.slice();for(let L=0;L<o.length;L++)if(L===t)i[t]+=C[L];else if(o[L]!==C[L])throw new Error("non concat dimensions must match")}let a=i.length,s=ro("coords",a),u=bt(a),l=Rr(),d=r.map(P=>P.dims),f=Kt(a),m=new Array(d.length-1);m[0]=d[0][t];for(let P=1;P<m.length;P++)m[P]=m[P-1]+d[P][t];let b=f[t],y=f.slice(-2),_=f.join(),T=`if (${b} < ${m[0]}) {
        return getChannel(
            getX0(${_}), vec2(${y.join()}));
        }`;for(let P=1;P<m.length;P++){let C=m[P-1];T+=`
            if (${b} < ${m[P]}  && ${b} >= ${m[P-1]}) {
              return getChannel(
                getX${P}(${Gi(f,b,C)}),
                vec2(${Gi(y,b,C)}));
            }`}let w=m.length,x=m[m.length-1];T+=`
            return getChannel(
              getX${w}(${Gi(f,b,x)}),
              vec2(${Gi(y,b,x)}));`;let S=le(n.session.backend.glContext.version),A=`
          ${l}
          float getValue(${f.map(P=>"int "+P)}) {
            ${T}
          }

          void main() {
            ${u} coords = getOutputCoords();
            int lastDim = coords.${f[a-1]};
            coords.${f[a-1]} = coords.${f[a-2]};
            coords.${f[a-2]} = lastDim;

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
            ${S.output} = result;
          }
        `;return{...e,output:{dims:i,type:r[0].type,textureType:2},shaderSource:A,hasMain:!0}},ng=(n,e,r)=>{let t=jA(e.length,r.cacheKey);return{...t,get:()=>KA(n,t,e,r.axis)}},Gi=(n,e,r)=>{let t=n.indexOf(e);return n.map((i,a)=>a===t?`${i} - ${r}`:i).join()}});var ig,XA,ZA,JA,ag,YA,QA,eO,sg,tO,ug=N(()=>{"use strict";ct();Oe();og();ig=(n,e,r)=>(tO(e),n.session.pack&&e[0].dims.length>1?[n.run(ng(n,e,r),e)]:[n.run(JA(n,e,r),e)]),XA=(n,e)=>({name:"Concat",inputNames:Array.from({length:n},(r,t)=>`X${t}`),inputTypes:Array(n).fill(0),cacheHint:e}),ZA=(n,e,r,t)=>{let o=r[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let b=1;b<r.length;b++){let y=r[b].dims.slice();for(let _=0;_<o.length;_++)if(_===t)i[t]+=y[_];else if(o[_]!==y[_])throw new Error("non concat dimensions must match")}let a=i.length,s=new Array(r.length),u=0;for(let b=0;b<s.length;++b)u+=r[b].dims[t],s[b]=u;let l="";r.length<5?l=ag(s):l=YA(s);let d=QA(r.length,a),f=eO(s),m=`
        ${d}
        ${f}
        ${l}
        float process(int indices[${a}]) {
          int textureIndex = getTextureWhereDataResides (indices[${t}]);

          if(textureIndex != 0) {
            indices[${t}] = indices[${t}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:m}},JA=(n,e,r)=>{let t=XA(e.length,r.cacheKey);return{...t,get:()=>ZA(n,t,e,r.axis)}},ag=n=>`int getTextureWhereDataResides(int index) {
      ${n.map((r,t)=>`if(index<${r}) {return ${t};}
`).join("")}
    }`,YA=n=>ag(n),QA=(n,e)=>{let r=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${e}]) {`];for(let t=0;t<n;++t)t===0?r.push(`	if (textureIndex == ${t}) { return _X${t}(indices); }`):t===n-1?r.push(`	else { return _X${t}(indices); }`):r.push(`	else if (textureIndex == ${t}) { return _X${t}(indices); }`);return r.push("	}"),r.join(`
`)},eO=n=>{let e=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let r=0;r<n.length;++r)r===0?e.push(`	if (index == ${r}) { return ${n[r]}; }`):r===n.length-1?e.push(`	else { return ${n[r]}; }`):e.push(`	else if (index == ${r}) { return ${n[r]}; }`);return e.push("	}"),e.join(`
`)},sg=n=>Ie({axis:n.attributes.getInt("axis")}),tO=n=>{if(!n||n.length<1)throw new Error("too few inputs");let e=n[0].type,r=n[0].dims.length;if(e==="string")throw new Error("string tensor is not supported yet");for(let t of n){if(t.type!==e)throw new Error("input tensors should be one type");if(t.dims.length!==r)throw new Error("input tensors should have the same shape")}}});function rO(){return Vt("abs")}function nO(){return Vt("acos")}function oO(){return Vt("asin")}function iO(){return Vt("atan")}function aO(){return Vt("ceil")}function sO(){return Vt("cos")}function uO(n){let e="elu";return{body:`
  const float alpha = float(${n});

  float ${e}_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function lO(){return Vt("exp")}function cO(){return Vt("floor")}function Il(n,e){let r="clip";return{body:`
  const float min = float(${n});
  const float max = float(${e});

  float ${r}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${r}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:r,type:0}}function dO(){let n="indentity";return{body:`
  float ${n}_(float a) {
    return a;
  }
  vec4 ${n}_(vec4 v) {
    return v;
  }
  `,name:n,type:0}}function pO(n){let e="leakyRelu";return{body:`
  const float alpha = float(${n});

  float ${e}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function fO(){return Vt("log")}function hO(){let n="neg";return{body:`
  float ${n}_(float a) {
    return -a;
  }
  vec4 ${n}_(vec4 v) {
    return -v;
  }
  `,name:n,type:0}}function mO(){let n="not";return{body:`
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
  `,name:n,type:0}}function gO(){return Vt("sin")}function Sl(){let n="relu";return{body:`
  float ${n}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${n}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:n,type:0}}function $l(){let n="sigmoid";return{body:`
  float ${n}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${n}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:n,type:0}}function bO(){return Vt("sqrt")}function yO(){return Vt("tan")}function _O(){let n="tanh";return{body:`
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
  `,name:n,type:0}}function Vt(n){return{body:`
  float ${n}_(float a) {
    return ${n}(a);
  }
  vec4 ${n}_(vec4 v) {
    return ${n}(v);
  }
  `,name:n,type:0}}var vO,nt,lg,cg,dg,pg,Al,fg,hg,wO,mg,gg,bg,yg,_g,vg,Ol,wg,xg,Tg,Ig,Sg,$g,Ag,Og,Pg,Eg,Cg,Pl=N(()=>{"use strict";ct();ze();Jr();Ye();Oe();vO=(n,e,r,t)=>{let o=n.session.pack?2:0,i=le(n.session.backend.glContext.version);return{...e,output:{dims:r.dims,type:r.type,textureType:o},shaderSource:`
     ${t.body}
     void main() {
       vec4 v = ${i.texture2D}(A, TexCoords);
       v = ${t.name}_(v);
       ${i.output} = v;
     }
     `,hasMain:!0}},nt=(n,e,r,t)=>{let o=n.session.pack?2:0,i={name:r.name,inputTypes:[o],inputNames:["A"],cacheHint:t};return{...i,get:()=>vO(n,i,e,r)}},lg=(n,e)=>[n.run(nt(n,e[0],rO()),e)],cg=(n,e)=>[n.run(nt(n,e[0],nO()),e)],dg=(n,e)=>[n.run(nt(n,e[0],oO()),e)],pg=(n,e)=>[n.run(nt(n,e[0],iO()),e)],Al=(n,e,r)=>[n.run(nt(n,e[0],Il(r.min,r.max),r.cacheKey),e)],fg=n=>Ie({min:n.attributes.getFloat("min",En),max:n.attributes.getFloat("max",Cn)}),hg=(n,e)=>{let r=wO(n,e);return Al(n,[e[0]],r)},wO=(n,e)=>{if(e.length>=3&&(!n.session.isInitializer(e[1].dataId)||!n.session.isInitializer(e[2].dataId)))throw new Error("dynamic clip attributes are not allowed");let r=e.length>=3?e[1].numberData[0]:En,t=e.length>=3?e[2].numberData[0]:Cn;return Ie({min:r,max:t})},mg=(n,e)=>[n.run(nt(n,e[0],aO()),e)],gg=(n,e)=>[n.run(nt(n,e[0],sO()),e)],bg=(n,e,r)=>[n.run(nt(n,e[0],uO(r.alpha),r.cacheKey),e)],yg=n=>Ie({alpha:n.attributes.getFloat("alpha",1)}),_g=(n,e)=>[n.run(nt(n,e[0],lO()),e)],vg=(n,e)=>[n.run(nt(n,e[0],cO()),e)],Ol=(n,e)=>[n.run(nt(n,e[0],dO()),e)],wg=(n,e,r)=>[n.run(nt(n,e[0],pO(r.alpha),r.cacheKey),e)],xg=n=>Ie({alpha:n.attributes.getFloat("alpha",.01)}),Tg=(n,e)=>[n.run(nt(n,e[0],fO()),e)],Ig=(n,e)=>[n.run(nt(n,e[0],hO()),e)],Sg=(n,e)=>[n.run(nt(n,e[0],mO()),e)],$g=(n,e)=>[n.run(nt(n,e[0],Sl()),e)],Ag=(n,e)=>[n.run(nt(n,e[0],$l()),e)],Og=(n,e)=>[n.run(nt(n,e[0],gO()),e)],Pg=(n,e)=>[n.run(nt(n,e[0],bO()),e)],Eg=(n,e)=>[n.run(nt(n,e[0],yO()),e)],Cg=(n,e)=>[n.run(nt(n,e[0],_O()),e)]});function zr(n){let e;switch(n.activation){case"Relu":e=Sl();break;case"Sigmoid":e=$l();break;case"Clip":e=Il(n.clipMin,n.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let r=e.name,t=e.body,o=`value = ${r}_(value);`;return{activationFunction:t,applyActivation:o}}var no,Nn=N(()=>{"use strict";ze();Pl();no=n=>{let e=n.getString("activation","");if(e==="Clip"){let[r,t]=n.getFloats("activation_params",[En,Cn]);return{activation:e,clipMax:t,clipMin:r,activationCacheKey:`${e}:${r},${t}`}}return{activation:e,activationCacheKey:e}}});var TO,IO,Dg,kg=N(()=>{"use strict";kt();Ye();Oe();Ui();Nn();TO=(n,e)=>({name:"GroupedConv",inputNames:n?["X","W","Bias"]:["X","W"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e}),IO=(n,e,r,t)=>{let i=e.length>2?"value += getBias(output_channel);":"",a=e[0].dims.slice(),s=e[1].dims.slice(),u=s[0]/t.group;Fe.verbose("GroupedConv",`autpPad:${t.autoPad}, dilations:${t.dilations}, group:${t.group}, kernelShape:${t.kernelShape}, pads:${t.pads}, strides:${t.strides}`);let l=oo(a,s,t.dilations,t.pads,t.strides),d=le(n.session.backend.glContext.version),{activationFunction:f,applyActivation:m}=zr(t),b=`
  const ivec2 strides = ivec2(${t.strides[0]}, ${t.strides[1]});
  const ivec2 pads = ivec2(${t.pads[0]}, ${t.pads[1]});
  ${f}
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
    ${m}
    ${d.output} = vec4(value, .0, .0, .0);
  }
`;return{...r,output:{dims:l,type:e[0].type,textureType:0},shaderSource:b,hasMain:!0}},Dg=(n,e,r)=>{let t=TO(e.length>2,r.cacheKey);return{...t,get:()=>IO(n,e,t,r)}}});var SO,$O,Ng,Lg=N(()=>{"use strict";Ye();Oe();kn();SO=n=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:n}),$O=(n,e,r,t,o,i)=>{let a=r.dims,s=t.dims,u=2,l=3,d=o.length,f=[s[1]*s[2]*s[3],o[2]*o[3]],m=s[2]*s[3],b=Rr(),y=le(n.session.backend.glContext.version),_="";for(let w=0;w<=1;w++)for(let x=0;x<=1;x++)_+=`
            blockIndex = rc.x + ${x};
            pos = rc.y + ${w};

            if(blockIndex < ${f[1]} && pos < ${f[0]}) {
              offsetY = int(blockIndex / (${o[d-1]})) * ${i.strides[0]} -
                ${i.pads[0]};
              d0 = offsetY + ${i.dilations[0]} * (imod(pos, ${m}) / ${s[2]});

              if(d0 < ${a[u]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${o[d-1]}) * ${i.strides[1]} -
                  ${i.pads[1]};
                d1 = offsetX + ${i.dilations[1]} * imod(imod(pos, ${m}), ${s[2]});

                if(d1 < ${a[l]} && d1 >= 0) {

                  ch = int(float(pos)/ ${m}.);
                    innerDims = vec2(d0, d1);
                    result[${w*2+x}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;let T=`
      ${b}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${_}
          ${y.output} = result;
      }
            `;return{...e,output:{dims:f,type:r.type,textureType:2},shaderSource:T,hasMain:!0}},Ng=(n,e,r,t,o)=>{let i=SO(o.cacheKey);return{...i,get:()=>$O(n,i,e,r,t,o)}}});function OO(n,e,r){let t=e[0].dims,o=e[1].dims,i=gt.calcShape(t,o,!0);if(!i)throw new Error("Can't use matmul on the given tensors");let a=bt(i.length),s=Kt(),{activationFunction:u,applyActivation:l}=zr(r),d=e.length>2,f=d?"value += getBiasForMatmul();":"",m=d?`${Cl(a,s,e[2].dims,i,!1)}`:"",b=i.length,y=t.length,_=o.length,T=t[t.length-1],w=`
    ${u}
    ${m}
    float process(int indices[${b}]) {
        int a[${y}];
        int b[${_}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${T}; ++k) {
            a[${y-1}] = k;
            b[${_-2}] = k;
            value += _A(a) * _B(b);
        }
        ${f}
        ${l}
        return value;
    }`;return{...n,output:{dims:i,type:e[0].type,textureType:0},shaderSource:w}}function El(n,e){let r=AO(n.length>2,e.activationCacheKey);return{...r,get:()=>OO(r,n,e)}}function Cl(n,e,r,t,o){let i="",a=r.length,s=t.length,u=s-a;s<2&&a>0?i="coords":i=r.map((_,T)=>`coords.${e[T+u]}`).join(", ");let d=gt.getBroadcastDims(r,t).map(_=>`coords.${e[_+u]} = 0;`).join(`
`),m=re.size(r)===1,b="vec4(outputValue.xx, outputValue.yy)";return m&&(b="vec4(outputValue.x)"),o?`
vec4 getBiasForMatmul() {
  ${n} coords = getOutputCoords();
  ${d}
  vec4 outputValue = getBias(${i});
  return ${b};
}`:`
float getBiasForMatmul() {
  ${n} coords = getOutputCoords();
  ${d}
  return getBias(coords.x);
}`}var Rg,zg,AO,PO,Wi=N(()=>{"use strict";ze();Oe();Lr();Nn();Dl();Rg=(n,e,r)=>(PO(e),n.session.pack?[n.run(Hi(n,e,r),e)]:[n.run(El(e,r),e)]),zg=n=>no(n.attributes),AO=(n,e)=>({name:"MatMul",inputNames:n?["A","B","Bias"]:["A","B"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e});PO=n=>{if(!n||n.length!==2)throw new Error("MatMul requires 2 inputs.");if(n[0].dims[n[0].dims.length-1]!==n[1].dims[n[1].dims.length-2])throw new Error("shared dimension does not match.");if(n[0].type!=="float32"&&n[0].type!=="float64"||n[1].type!=="float32"&&n[1].type!=="float64")throw new Error("inputs should be float type");if(n[0].type!==n[1].type)throw new Error("inputs types should match")}});function DO(n,e,r,t){let o=[],i=[],a=r[0].dims,s=r[1].dims,u=a.length,l=s.length,d=t.length,f=d-u,m=d-l;o=a.map((S,A)=>`coords.${e[A+f]}`),o[u-1]="i*2",o.join(", "),i=s.map((S,A)=>`coords.${e[A+m]}`),i[l-2]="i*2",i.join(", ");let b=gt.getBroadcastDims(a,t),y=gt.getBroadcastDims(s,t),_=b.map(S=>`coords.${e[S+f]} = 0;`).join(`
`),T=y.map(S=>`coords.${e[S+m]} = 0;`).join(`
`),w=`int lastDim = coords.${e[d-1]};
  coords.${e[d-1]} = coords.${e[d-2]};
  coords.${e[d-2]} = lastDim;`;return`
vec4 getAAtOutCoordsMatmul(int i) {
  ${n} coords = getOutputCoords();
  ${w}
  ${_}
  vec4 outputValue = getA(${o});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${n} coords = getOutputCoords();
  ${w}
  ${T}
  vec4 outputValue = getB(${i});
  return outputValue;
}`}function kO(n,e){let r="";for(let t=0;t<e-2;t++)r+=`rc.${n[t]}, `;return r+=`rc.${n[e-2]}, i*2`,r}function NO(n,e){let r="";for(let t=0;t<e-2;t++)r+=`rc.${n[t]}, `;return r+=`i*2, rc.${n[e-1]}`,r}var EO,CO,Hi,Dl=N(()=>{"use strict";ze();Ye();Oe();Lr();Nn();Wi();EO=(n,e)=>({name:"MatMul (packed)",inputNames:n?["A","B","Bias"]:["A","B"],inputTypes:n?[2,2,2]:[2,2],cacheHint:e}),CO=(n,e,r,t)=>{let o=r.length>2,i=o?"value += getBiasForMatmul();":"",a=r[0].dims,s=r[1].dims,u=gt.calcShape(a,s,!0),l=!re.areEqual(r[0].dims,r[1].dims);if(!u)throw new Error("Can't use matmul on the given tensors");let d=a[a.length-1],f=Math.ceil(d/2),m=a.length,b=s.length,y=le(n.session.backend.glContext.version),_=bt(u.length),T=u.length,w=Kt(),{activationFunction:x,applyActivation:S}=zr(t),A=o?`${Cl(_,w,r[2].dims,u,!0)}`:"",P=l?`${DO(_,w,r,u)}`:"",C=l?"getAAtOutCoordsMatmul(i)":`getA(${kO(w,m)})`,L=l?"getBAtOutCoordsMatmul(i)":`getB(${NO(w,b)})`,M=l?"":`${_} rc =
          getOutputCoords(); int lastDim = rc.${w[T-1]}; rc.${w[T-1]} =
          rc.${w[T-2]}; rc.${w[T-2]} = lastDim;
      `,F=`
            ${P}
            ${A}
            ${x}
            void main() {
              ${M}

              vec4 value = vec4(0);
              for (int i = 0; i < ${f}; i++) {
                vec4 a = ${C};
                vec4 b = ${L};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${i}
              ${S}
              ${y.output} = value;
            }`;return{...e,output:{dims:u,type:r[0].type,textureType:2},shaderSource:F,hasMain:!0}},Hi=(n,e,r)=>{let t=EO(e.length>2,r.activationCacheKey);return{...t,get:()=>CO(n,t,e,r)}}});var Mg,Bg=N(()=>{"use strict";Ui();Lg();Dl();Mg=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=oo(t,o,r.dilations,r.pads,r.strides),a=n.run(Ng(n,e[0],e[1],i,r),[e[0]]),s=n.reshapePacked(e[1],[o[0],o[1]*o[2]*o[3]]),u=e.length===3?[s,a,e[2]]:[s,a],l=n.run(Hi(n,u,r),u);return n.reshapePacked(l,i)}});var LO,RO,Fg,kl,Nl=N(()=>{"use strict";Oe();LO=n=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:n}),RO=(n,e,r,t,o,i)=>{let a=r.dims,s=t.dims,u=o.length,l=kl(a,s,o,4),d=`
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
        `;return{...e,output:{dims:l,type:r.type,textureType:4},shaderSource:d}},Fg=(n,e,r,t,o)=>{let i=LO(o.cacheKey);return{...i,get:()=>RO(n,i,e,r,t,o)}},kl=(n,e,r,t=4)=>[r[0],r[2],r[3],Math.ceil(n[1]*e[2]*e[3]/t)]});var zO,MO,Vg,Gg=N(()=>{"use strict";ze();Ye();Oe();Nn();Nl();zO=(n,e)=>({name:"ConvDotProduct",inputNames:n?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:n?[0,4,0]:[0,4],cacheKey:e.activationCacheKey}),MO=(n,e,r,t,o)=>{let i=r[0].dims,a=r[1].dims,s=[a[0],Math.ceil(i[1]*a[2]*a[3]/4)],u=kl(i,a,t),[l,d]=n.calculateTextureWidthAndHeight(s,4),f=re.computeStrides(u),[m,b]=n.calculateTextureWidthAndHeight(u,4),y=t.length,_=r.length<3?"0.0":"_B(b)",T=Math.ceil(i[1]*a[2]*a[3]/4),{activationFunction:w,applyActivation:x}=zr(o),S=le(n.session.backend.glContext.version),A=`
${w}
float process(int indices[${y}]) {
  int b[1];
  b[0] = indices[1];
  int im2col[4];
  im2col[0] = indices[0];
  im2col[1] = indices[2];
  im2col[2] = indices[3];
  int im2colOffset = im2col[0] * ${f[0]} + im2col[1] * ${f[1]} + im2col[2] * ${f[2]};
  int kernelOffset = indices[1] * ${s[1]};
  float value = ${_};
  for (int i = 0; i < ${T}; ++i) {
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${m}, ${b});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${l}, ${d});
    value += dot(${S.texture2D}(Im2Col, im2colCoords), ${S.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${x}
  return value;
}`;return{...e,output:{dims:t,type:r[0].type,textureType:0},shaderSource:A}},Vg=(n,e,r,t)=>{let o=zO(e.length>2,t);return{...o,get:()=>MO(n,o,e,r,t)}}});var oo,Ll,BO,FO,VO,GO,Rl,UO,Ui=N(()=>{"use strict";ct();ze();kg();Bg();Gg();Nn();Nl();Wi();oo=(n,e,r,t,o)=>{let i=n[0],a=n.slice(2),s=a.length,u=e[0],d=e.slice(2).map((y,_)=>y+(y-1)*(r[_]-1)),m=a.map((y,_)=>y+t[_]+t[_+s]).map((y,_)=>Math.floor((y-d[_]+o[_])/o[_]));return[i,u].concat(...m)},Ll=(n,e,r)=>(UO(e,r),BO(n,e,r)),BO=(n,e,r)=>{let t=GO(r,e),o=n.session.pack,i=t.kernelShape[0]===1&&t.kernelShape[1]===1;return t.group>1?[n.run(Dg(n,e,t),e)]:i&&o?[FO(n,e,t)]:o&&e[0].dims.length===4&&e[0].dims[0]===1&&!i?[Mg(n,e,t)]:[VO(n,e,t)]},FO=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=oo(t,o,r.dilations,r.pads,r.strides),a=n.reshapeUnpacked(e[0],[t[1],t[2]*t[3]]),s=n.reshapeUnpacked(e[1],[o[0],o[1]]),u=e.length>2?[s,a,e[2]]:[s,a],l=n.run(El(u,r),u);return n.reshapeUnpacked(l,i)},VO=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=oo(t,o,r.dilations,r.pads,r.strides),a=n.run(Fg(n,e[0],e[1],i,r),[e[0]]),s=e.length===3?[a,e[1],e[2]]:[a,e[1]];return n.run(Vg(n,e,i,r),s)},GO=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0)for(let i=2;i<e[1].dims.length;++i)r.push(e[1].dims[i]);let t=n.pads.slice();Pn.adjustPadsBasedOnAutoPad(e[0].dims,n.strides,n.dilations,r,t,n.autoPad);let o=Object.assign({},n);return Object.assign(o,{kernelShape:r,pads:t,cacheKey:n.cacheKey}),o},Rl=n=>{let e=n.attributes,r=no(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),a=e.getInts("kernel_shape",[]),s=e.getInts("pads",[0,0,0,0]),u=e.getInts("strides",[1,1]);return Ie({autoPad:t,dilations:o,group:i,kernelShape:a,pads:s,strides:u,...r})},UO=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4||n[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let r=n[0].dims[1],t=n[1].dims[1]*e.group;if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(n.length===3&&(n[2].dims.length!==1||n[1].dims[0]!==n[2].dims[0]))throw new Error("invalid bias");let o=n[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(n[0].type!=="float32"||n[1].type!=="float32")throw new Error("Conv input(X,W) should be float tensor");if(n.length===3&&n[2].type!=="float32")throw new Error("Conv input(bias) should be float tensor")}});var WO,HO,qO,Ug,jO,KO,XO,ZO,JO,YO,Wg,QO,Hg=N(()=>{"use strict";ct();Ye();Oe();Nn();WO=(n,e,r,t,o,i)=>(n-1)*e+r+(t-1)*o+1-i,HO=(n,e,r,t,o)=>{let i=Math.floor(n/2);e==="SAME_UPPER"?(r[t]=i,r[o]=n-i):e==="SAME_LOWER"&&(r[t]=n-i,r[o]=i)},qO=(n,e,r,t,o,i,a,s)=>{let u=n.length-2,l=s.length===0;for(let d=0;d<u;++d){let f=l?n[d+2]*i[d]:s[d],m=WO(n[d+2],i[d],o[d],e[d],r[d],f);HO(m,t,o,d,d+u),l&&s.push(i[d]*(n[d+2]-1)+a[d]+(e[d]-1)*r[d]+1-o[d]-o[d+u])}},Ug=(n,e,r)=>(QO(e,r),jO(n,e,r)),jO=(n,e,r)=>{let t=YO(r,e);return[JO(n,e,t)]},KO=(n,e)=>({name:"ConvTranspose",inputNames:n?["X","W","B"]:["X","W"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e}),XO=(n,e,r,t)=>{let i=e.length>2?"getB(output_channel)":"0.0",a=e[0].dims,s=e[1].dims,u=s[1],l=s[0]/t.group,d=[e[0].dims[0],e[1].dims[1]*t.group,...t.outputShape],f=le(n.session.backend.glContext.version),{activationFunction:m,applyActivation:b}=zr(t),y=`
  const ivec2 strides = ivec2(${t.strides[0]}, ${t.strides[1]});
  const ivec2 pads = ivec2(${t.pads[0]}, ${t.pads[1]});
  ${m}
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
    ${f.output} = vec4(value, .0, .0, .0);
  }
`;return{...r,output:{dims:d,type:e[0].type,textureType:0},shaderSource:y,hasMain:!0}},ZO=(n,e,r)=>{let t=KO(e.length>2,r.cacheKey);return{...t,get:()=>XO(n,e,t,r)}},JO=(n,e,r)=>n.run(ZO(n,e,r),e),YO=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0)for(let s=2;s<e[1].dims.length;++s)r.push(e[1].dims[s]);let t=n.pads.slice(),o=n.outputShape.slice(),i=e[0].dims;qO(i,r,n.dilations,n.autoPad,t,n.strides,n.outputPadding,o);let a=Object.assign({},n);return Object.assign(a,{kernelShape:r,pads:t,outputShape:o,cacheKey:n.cacheKey}),a},Wg=n=>{let e=n.attributes,r=no(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),a=e.getInts("kernel_shape",[]),s=e.getInts("output_padding",[0,0]),u=e.getInts("output_shape",[]),l=e.getInts("pads",[0,0,0,0]),d=e.getInts("strides",[1,1]);return Ie({autoPad:t,dilations:o,group:i,kernelShape:a,outputPadding:s,outputShape:u,pads:l,strides:d,...r})},QO=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4||n[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let r=n[0].dims[1],t=n[1].dims[0];if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=n[1].dims[1]*e.group;if(n.length===3&&(n[2].dims.length!==1||n[2].dims[0]!==o))throw new Error("invalid bias");let i=n[0].dims.length-2;if(e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==n[0].dims.length-2)throw new Error("invalid output shape");if(n[0].type!=="float32"||n[1].type!=="float32")throw new Error("ConvTranspose input(X,W) should be float tensor");if(n.length===3&&n[2].type!=="float32")throw new Error("ConvTranspose input(bias) should be float tensor")}});var qg,Ln,jg,eP,Kg,tP,rP,nP,qi=N(()=>{"use strict";ct();ze();Oe();qg={name:"Transpose",inputNames:["A"],inputTypes:[0]},Ln=(n,e,r)=>(nP(e),[n.run({...qg,cacheHint:r.cacheKey,get:()=>eP(n,e[0],r.perm)},e)]),jg=n=>Ie({perm:n.attributes.getInts("perm",[])}),eP=(n,e,r)=>{let t=e.dims;r=Kg(t,r);let o=tP(t,r),i=t.length,a=`
      ${rP("perm",r,i)}
      float process(int indices[${i}]) {
        int a[${i}];
        perm(a, indices);
        return _A(a);
      }`;return{...qg,output:{dims:o,type:e.type,textureType:0},shaderSource:a}},Kg=(n,e)=>(e&&e.length!==n.length&&(e=[...n.keys()].reverse()),e),tP=(n,e)=>(e=Kg(n,e),re.sortBasedOnPerm(n,e)),rP=(n,e,r)=>{let t=[];t.push(`void ${n}(out int a[${r}], int src[${r}]) {`);for(let o=0;o<r;++o)t.push(`	a[${e[o]}]=src[${o}];`);return t.push("	}"),t.join(`
`)},nP=n=>{if(!n||n.length!==1)throw new Error("Transpose requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("input should be float tensor")}});var Xg,Zg,oP,Jg=N(()=>{"use strict";qi();Xg=(n,e,r)=>{oP(e);let t=r.blocksize,o=t*t,i=r.mode==="DCR"?[0,3,4,1,5,2]:[0,1,4,2,5,3],a=r.mode==="DCR"?[e[0].dims[0],t,t,e[0].dims[1]/o,e[0].dims[2],e[0].dims[3]]:[e[0].dims[0],e[0].dims[1]/o,t,t,e[0].dims[2],e[0].dims[3]],s=n.reshapeUnpacked(e[0],a),u={perm:i,cacheKey:`${i}`},[l]=Ln(n,[s],u),d=[e[0].dims[0],e[0].dims[1]/o,e[0].dims[2]*t,e[0].dims[3]*t];return[n.reshapeUnpacked(l,d)]},Zg=n=>{let e=n.attributes.getInt("blocksize");if(e<1)throw new Error(`blocksize must be >= 1, but got : ${e} for DepthToSpace`);let r=n.attributes.getString("mode","DCR");if(r!=="DCR"&&r!=="CRD")throw new Error(`unrecognized mode: ${r} for DepthToSpace`);return{mode:r,blocksize:e}},oP=n=>{if(n.length!==1)throw new Error(`DepthToSpace expect 1 inputs, but got ${n.length}`);if(n[0].type==="string"||n[0].dims.length!==4)throw new TypeError("DepthToSpace input should be a 4-D numeric tensor")}});var Yg,Qg,iP,eb=N(()=>{"use strict";ze();Yg=(n,e,r)=>{iP(e,r);let t=re.flattenShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},Qg=n=>n.attributes.getInt("axis",1),iP=(n,e)=>{if(!n||n.length!==1)throw new Error("Flatten requires 1 input.");let r=n[0].dims.length;if(r===0)throw new Error("scalar tensor is not supported.");if(e<-r||e>r)throw new Error("Invalid axis");if(n[0].type==="string")throw new Error("string tensor is not supported.")}});var fn,Lo=N(()=>{"use strict";fn=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]});var tb,rb,aP,sP,uP,lP,nb=N(()=>{"use strict";ct();Lo();ze();Oe();tb=(n,e,r)=>(lP(e,r.axis),[n.run(uP(n,e,r),e)]),rb=n=>Ie({axis:n.attributes.getInt("axis",0)}),aP={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},sP=(n,e,r,t)=>{let o=r[0].dims.slice(),i=r[1].dims.slice(),a=new Array(o.length+i.length-1);t=re.normalizeAxis(t,o.length);let s=[];for(let m=0;m<a.length;m++)m<t?(a[m]=o[m],s.push(`inputIdx[${m}] = outputIdx[${m}];`)):m<t+i.length?(a[m]=i[m-t],s.push(`indexDataIdx[${m-t}] = outputIdx[${m}];`)):(a[m]=o[m-i.length+1],s.push(`inputIdx[${m-i.length+1}] = outputIdx[${m}];`));let u=a.length||1,l=o.length,d=i.length||1,f=`
      float process(int outputIdx[${u}]) {
        int inputIdx[${l}];
        int indexDataIdx[${d}];
        indexDataIdx[0] = 0;
        ${s.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${t}] = idx < 0 ? idx + ${o[t]} : idx;
        return _A(inputIdx);
      }`;return{...e,output:{dims:a,type:r[0].type,textureType:0},shaderSource:f}},uP=(n,e,r)=>{let t={...aP,cacheHint:r.cacheKey};return{...t,get:()=>sP(n,t,e,r.axis)}},lP=(n,e)=>{if(!n||n.length!==2)throw new Error("Gather requires 2 inputs.");let r=n[0].dims.length;if(r<1)throw new Error("Invalid input shape.");if(e<-r||e>r-1)throw new Error("Invalid axis.");if(fn.indexOf(n[0].type)===-1)throw new Error("Invaid input type.");if(n[1].type!=="int32"&&n[1].type!=="int16")throw new Error("Invaid input type.")}});var zl,ob,ib,ab,cP,dP,pP,sb=N(()=>{"use strict";ct();ze();Oe();zl=(n,e,r)=>(pP(e,r),[n.run(cP(e,r),e)]),ob=(n,e)=>{let r=n.attributes.getInt("transA",0)!==0,t=n.attributes.getInt("transB",0)!==0,o=n.attributes.getFloat("alpha",1),i=n.attributes.getFloat("beta",1);return Ie({transA:r,transB:t,alpha:o,beta:i,isOptionalC:e})},ib=n=>ob(n,!1),ab=n=>ob(n,!0),cP=(n,e)=>{let r={name:"Gemm",inputNames:n.length===3?["A","B","C"]:["A","B"],inputTypes:n.length===3?[0,0,0]:[0,0],key:e.cacheKey};return{...r,get:()=>dP(r,n,e)}},dP=(n,e,r)=>{let t=e[0].dims.slice(),o=e[1].dims.slice(),[i,a]=Li.getShapeOfGemmResult(t,r.transA,o,r.transB,e.length===3?e[2].dims:void 0),s=[i,a];if(!s)throw new Error("Can't use gemm on the given tensors");let u=t[t.length-1],l="";r.transA&&(u=t[0]),r.transA&&r.transB?l="value += _A_T(a) * _B_T(b);":r.transA&&!r.transB?l="value += _A_T(a) * _B(b);":!r.transA&&r.transB?l="value += _A(a) * _B_T(b);":!r.transA&&!r.transB&&(l="value += _A(a) * _B(b);");let d=s.length,f=e.length===3?`int c[${e[2].dims.length}];`:"",m=e.length===3?"bcastIndices_C(indices, c);":"",b=e.length===3?"value += beta * _C(c);":"",y=`
      float process(int indices[${d}]) {
          int a[${d}];
          int b[${d}];
          ${f}

          copyVec(indices, a);
          copyVec(indices, b);
          ${m}

          float value = 0.0;
          for (int k=0; k<${u}; ++k) {
              a[${d-1}] = k;
              b[${d-2}] = k;
              ${l}
          }

          value = value * alpha;
          ${b}
          return value;
      }`;return{...n,output:{dims:s,type:e[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:r.alpha},{name:"beta",type:"float",data:r.beta}],shaderSource:y}},pP=(n,e)=>{if(!n)throw new Error("Input is missing");if(e.isOptionalC&&(n.length<2||n.length>3))throw new Error("Invaid input shape.");if(!e.isOptionalC&&n.length!==3)throw new Error("Gemm requires 3 inputs");if(n.length===3&&n[2].dims.length!==1&&n[2].dims.length!==2)throw new Error("Invalid input shape of C");if(n[0].type!=="float32"&&n[0].type!=="float64"||n[1].type!=="float32"&&n[1].type!=="float64"||n.length===3&&n[2].type!=="float32"&&n[2].type!=="float64")throw new Error("Invalid input type.");if(n[0].type!==n[1].type||n.length===3&&n[0].type!==n[2].type)throw new Error("Input types are mismatched")}});var ub,lb,fP,hP,mP,gP,bP,cb=N(()=>{"use strict";ct();Oe();ub=(n,e,r)=>(bP(e),[n.run(mP(n,e,r),e)]),lb=n=>{let e=n.attributes.getFloat("scale"),r=n.attributes.getFloats("bias");return Ie({scale:e,bias:r})},fP={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},hP=(n,e,r,t)=>{let o=r[0].dims.slice(),i=o.length,s=`
      ${gP(t.bias.length)}
      float process(int indices[${i}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...e,output:{dims:o,type:r[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:t.bias.length,data:t.bias},{name:"scale",type:"float",data:t.scale}],shaderSource:s}},mP=(n,e,r)=>{let t={...fP,cacheHint:r.cacheKey};return{...t,get:()=>hP(n,t,e,r)}},gP=n=>{let e=[`float getBias(float bias[${n}], int channel) {`];for(let r=0;r<n;++r)r===0?e.push(`	if (channel == ${r}) { return bias[${r}]; }`):r===n-1?e.push(`	else { return bias[${r}]; }`):e.push(`	else if (channel == ${r}) { return bias[${r}]; }`);return e.push("	}"),e.join(`
`)},bP=n=>{if(!n||n.length!==1)throw new Error("ImageScaler requires 1 input.");if(n[0].dims.length!==4)throw new Error("Invalid input shape.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")}});var pb,fb,db,yP,_P,vP,wP,xP,TP,hb=N(()=>{"use strict";Ye();Oe();pb=(n,e,r)=>{TP(e);let t=n.run(_P(e[0]),e);return[n.run(xP(n,e[0],r,t.dims),[e[0],t,e[1],e[2]])]},fb=n=>n.attributes.getFloat("epsilon",1e-5),db={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},yP=(n,e)=>{let r=e.dims.slice(),t=r[1],o=r[2]*r[3],i=[r[0],t],a=`
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
      }`;return{...n,output:{dims:i,type:e.type,textureType:4},shaderSource:a}},_P=n=>({...db,get:()=>yP(db,n)}),vP={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},wP=(n,e,r,t,o)=>{let i=le(n.session.backend.glContext.version),[a,s]=n.calculateTextureWidthAndHeight(o,4),[u,l]=[a/4,s],d=`
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
      }`;return{...e,output:{dims:r.dims,type:r.type,textureType:0},variables:[{name:"epsilon",type:"float",data:t}],shaderSource:d}},xP=(n,e,r,t)=>{let o={...vP,cacheHint:`${r}`};return{...o,get:()=>wP(n,o,e,r,t)}},TP=n=>{if(!n||n.length!==3)throw new Error("InstanceNormalization requires 3 inputs.");let e=n[0],r=n[1],t=n[2];if(e.dims.length<3||r.dims.length!==1||t.dims.length!==1)throw new Error("Invalid input shape.");if(r.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1])throw new Error("Input shapes are mismatched.");if(e.type!=="float32"&&e.type!=="float64"||r.type!=="float32"&&r.type!=="float64"||t.type!=="float32"&&t.type!=="float64")throw new Error("Invalid input type.");if(n[0].dims.length!==4)throw new Error("Only support 4-D input shape.")}});function IP(n,e){let r=n[0].dims[1],t=n[0].dims.length,o=-Math.floor((e.size-1)/2),i=Math.ceil((e.size-1)/2),a=`float(${e.alpha}) / float(${e.size})`,s=`float(${e.bias})`,u=`float(${e.beta})`,l=`
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
    }`;return{...bb,cacheHint:e.cacheKey,output:{dims:n[0].dims,type:n[0].type,textureType:0},shaderSource:l}}function SP(n,e){return{...bb,cacheHint:e.cacheKey,get:()=>IP(n,e)}}var mb,gb,bb,$P,yb=N(()=>{"use strict";ct();Oe();mb=(n,e,r)=>($P(e),[n.run(SP(e,r),e)]),gb=n=>{let e=n.attributes.getFloat("alpha",1e-4),r=n.attributes.getFloat("beta",.75),t=n.attributes.getFloat("bias",1),o=n.attributes.getInt("size");return Ie({alpha:e,beta:r,bias:t,size:o})},bb={name:"LRN",inputNames:["X"],inputTypes:[0]};$P=n=>{if(!n||n.length!==1)throw new Error("LRN requires 1 input.");if(n[0].dims.length!==4)throw new Error('currently only support LRN for input with "NCHW" format');if(n[0].type!=="float32")throw new Error("input should be float type")}});var AP,Ml,_b,vb,wb,OP,PP,EP,CP,DP,kP,NP,LP,xb=N(()=>{"use strict";ct();ze();Ye();Oe();AP={name:"Pad",inputNames:["A"],inputTypes:[0]},Ml=(n,e,r)=>(EP(e),[n.run({...AP,cacheHint:r.cacheKey,get:()=>PP(n,e[0],r)},e)]),_b=n=>{let e=n.attributes.getString("mode","constant"),r=n.attributes.getFloat("value",0),t=n.attributes.getInts("pads");return Ie({mode:e,value:r,pads:t})},vb=(n,e,r)=>{CP(e);let t=OP(n,e,r);return Ml(n,[e[0]],t)},wb=n=>n.attributes.getString("mode","constant"),OP=(n,e,r)=>{if(!n.session.isInitializer(e[1].dataId)||e.length>=3&&!n.session.isInitializer(e[2].dataId))throw new Error("dynamic pad attributes are not allowed");let t=Array.from(e[1].integerData),o=e.length>=3?e[2].floatData[0]:0;return Ie({mode:r,pads:t,value:o})},PP=(n,e,r)=>{let t=re.padShape(e.dims.slice(),r.pads),o=t.length,a=`
      ${DP(n,e,r)}
      float process(int[${o}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:t,type:e.type,textureType:0},shaderSource:a}},EP=n=>{if(!n||n.length!==1)throw new Error("Pad requires 1 input");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")},CP=n=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Pad requires 2 or 3 inputs");if(n[1].type!=="int32")throw new Error("Invalid input type.");if(n.length>=3&&n[2].type==="string")throw new Error("Invalid input type.")},DP=(n,e,r)=>{let t=le(n.session.backend.glContext.version),[o,i]=n.calculateTextureWidthAndHeight(e.dims,0),a=re.computeStrides(e.dims);switch(r.mode){case"constant":return kP(t,e.dims,a,o,i,r.pads,r.value);case"reflect":return NP(t,e.dims,a,o,i,r.pads);case"edge":return LP(t,e.dims,a,o,i,r.pads);default:throw new Error("Invalid mode")}},kP=(n,e,r,t,o,i,a)=>{let s=e.length,u="";for(let l=s-1;l>=0;--l)u+=`
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
      `},NP=(n,e,r,t,o,i)=>{let a=e.length,s="";for(let u=a-1;u>=0;--u)s+=`
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
      `},LP=(n,e,r,t,o,i)=>{let a=e.length,s="";for(let u=a-1;u>=0;--u)s+=`
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
      `}});var Ib,Sb,$b,Ab,Ob,Pb,Eb,Cb,Db,RP,Tb,kb,Ki,Nb,ji,zP,Lb=N(()=>{"use strict";ct();ze();Oe();Ib=(n,e,r)=>{Ki(e);let t={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[n.run({...t,get:()=>$b(e,t,!1,r)},e)]},Sb=n=>{let e=n.attributes.getString("auto_pad","NOTSET"),r=n.attributes.getInt("ceil_mode",0),t=n.attributes.getInt("count_include_pad",0)!==0,o=n.attributes.getInts("kernel_shape"),i=n.attributes.getInts("strides",[]),a=n.attributes.getInts("pads",[]);if(r!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");return Ie({autoPad:e,ceilMode:r,countIncludePad:t,kernelShape:o,strides:i,pads:a})},$b=(n,e,r,t)=>{let[o,i]=Db(n,t,r),a=re.size(o.kernelShape),s="value += _X(x);",u="";o.countIncludePad?u+=`value /= float(${a});`:u+=`value /= float(${a} - pad);`;let d=`
        ${Nb(n[0].dims,o,s,u,"0.0")}
      `;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:d}},Ab=(n,e,r)=>{Ki(e);let t={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${r.countIncludePad}`};return[n.run({...t,get:()=>$b(e,t,!0,r)},e)]},Ob=n=>{let e=n.attributes.getInt("count_include_pad",0)!==0;return Ie({autoPad:"",ceilMode:0,countIncludePad:e,kernelShape:[],strides:[],pads:[]})},Pb=(n,e,r)=>{Ki(e);let t={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[n.run({...t,get:()=>Cb(e,t,!1,r)},e)]},Eb=n=>{let e=n.attributes.getString("auto_pad","NOTSET"),r=n.attributes.getInt("ceil_mode",0),t=n.attributes.getInts("kernel_shape"),o=n.attributes.getInts("strides",[]),i=n.attributes.getInts("pads",[]),a=n.attributes.getInt("storage_order",0),s=n.attributes.getInts("dilations",[]);if(a!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");return Ie({autoPad:e,ceilMode:r,countIncludePad:!1,kernelShape:t,strides:o,pads:i,storageOrder:a,dilations:s})},Cb=(n,e,r,t)=>{let[o,i]=Db(n,t,r),l=`
      ${Nb(n[0].dims,o,`
      value = max(_X(x), value);
    `,"","-1e5")}
    `;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:l}},Db=(n,e,r)=>{let t=n[0].dims.slice(),o=Object.hasOwnProperty.call(e,"dilations"),i=e.kernelShape.slice(),a=e.strides.slice(),s=o?e.dilations.slice():[],u=e.pads.slice();Pn.adjustPoolAttributes(r,t,i,a,s,u);let l=Pn.computePoolOutputShape(r,t,a,s,i,u,e.autoPad),d=Object.assign({},e);return o?Object.assign(d,{kernelShape:i,strides:a,pads:u,dilations:s,cacheKey:e.cacheKey}):Object.assign(d,{kernelShape:i,strides:a,pads:u,cacheKey:e.cacheKey}),[d,l]},RP={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},Tb={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},kb=(n,e)=>(Ki(e),[n.run({...Tb,get:()=>Cb(e,Tb,!0,RP)},e)]),Ki=n=>{if(!n||n.length!==1)throw new Error("Pool ops requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")},Nb=(n,e,r,t,o)=>{let i=n.length;if(e.kernelShape.length<=2){let a=e.kernelShape[e.kernelShape.length-1],s=e.strides[e.strides.length-1],u=e.pads[e.pads.length/2-1],l=e.pads[e.pads.length-1],d=n[i-1],f="",m="",b="";if(u+l!==0?f=`
          for (int i = 0; i < ${a}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${s} - ${u} + i;
            if (x[${i} - 1] < 0 || x[${i} - 1] >= ${d}) {
              pad++;
              continue;
            }
            ${r}
          }`:f=`
          for (int i = 0; i < ${a}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${s} - ${u} + i;
            ${r}
          }`,e.kernelShape.length===2){let _=e.kernelShape[e.kernelShape.length-2],T=e.strides[e.strides.length-2],w=e.pads[e.pads.length/2-2],x=e.pads[e.pads.length-2],S=n[i-2];w+x!==0?m=`
            for (int j = 0; j < ${_}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${T} - ${w} + j;
              if (x[${i} - 2] < 0 || x[${i} - 2] >= ${S}) {
                pad+= ${a};
                continue;
              }
          `:m=`
            for (int j = 0; j < ${_}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${T} - ${w} + j;
            `,b=`
          }
        `}return`
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);

          float value = ${o};
          int pad = 0;
          ${m}
          ${f}
          ${b}
          ${t}
          return value;
        }
      `}else{let a=re.size(e.kernelShape),s=re.computeStrides(e.kernelShape),u=s.length,l=e.pads.length,d=zP(u),f=ji(n,"inputDims"),m=ji(e.pads,"pads"),b=ji(s,"kernelStrides"),y=ji(e.strides,"strides"),_=e.pads.reduce((x,S)=>x+S),T="";return _?T=`
            if (x[j] >= inputDims[j] || x[j] < 0) {
              pad++;
              isPad = true;
              break;
            }
          }
          if (!isPad) {
            ${r}
          }`:T=`
          }
          ${r}
        `,`
        ${d}
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);
          int offset[${u}];
          int pads[${l}];
          int inputDims[${i}];
          int kernelStrides[${u}];
          int strides[${u}];
          ${m}
          ${f}
          ${y}
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
              ${T}
          }
          ${t}

          return value;
        }
      `}},ji=(n,e)=>{let r="";for(let t=0;t<n.length;t++)r+=`
      ${e}[${t}] = ${n[t]};
    `;return r},zP=n=>`
  void offsetToIndices(int offset, int[${n}] strides, out int[${n}] indices) {
    if (${n} == 0) {
      return;
    }
    for (int i = 0; i < ${n} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${n} - 1] = offset;
  }`});var Rn,hn,MP,BP,Rb,zb,Mb,Bb,Fb,Vb,Gb,Ub=N(()=>{"use strict";ct();Lo();ze();Oe();Rn=(n,e,r,t,o)=>{BP(e);let i={name:t,inputNames:["A"],inputTypes:[0]};return[n.run({...i,cacheHint:r.cacheKey,get:()=>MP(n,e,r,t,o,i)},e)]},hn=n=>{let e=n.attributes.getInts("axes",[]),r=n.attributes.getInt("keepdims",1)===1;return Ie({axes:e,keepDims:r})},MP=(n,e,r,t,o,i)=>{let a=[],s=e[0].dims.length||1,u=[],l=re.normalizeAxes(r.axes,e[0].dims.length),d=o(e,l),f=d[1];for(let y=0;y<e[0].dims.length;y++)l.indexOf(y)>=0||l.length===0?(r.keepDims&&a.push(1),f=`
          for(int j${y} = 0; j${y} < ${e[0].dims[y]}; j${y}++) {
            inputIdx[${y}] = j${y};
            ${f}
          }`):(u.push(`inputIdx[${y}] = outputIdx[${a.length}];`),a.push(e[0].dims[y]));let b=`
      float process(int outputIdx[${a.length||1}]) {
        float value;                 // final result
        int inputIdx[${s}];      // addressing input data
        ${u.join(`
`)}
        ${d[0]}       // init ops for reduce max/min
        ${f}
        ${d[2]}       // final computation for reduce mean
        return value;
      }`;return{...i,output:{dims:a,type:e[0].type,textureType:0},shaderSource:b}},BP=n=>{if(!n||n.length!==1)throw new Error("Reduce op requires 1 input.");if(fn.indexOf(n[0].type)===-1)throw new Error("Invalid input type.")},Rb=(n,e,r)=>Rn(n,e,r,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),zb=(n,e,r)=>Rn(n,e,r,"ReduceMean",(o,i)=>{let a=1;for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=o[0].dims[s]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${a}.;`]}),Mb=(n,e,r)=>Rn(n,e,r,"ReduceMax",(o,i)=>{let a=[];for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`inputIdx[${s}] = 0;`);return[`${a.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),Bb=(n,e,r)=>Rn(n,e,r,"ReduceMin",(o,i)=>{let a=[];for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`inputIdx[${s}] = 0;`);return[`${a.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),Fb=(n,e,r)=>Rn(n,e,r,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),Vb=(n,e,r)=>Rn(n,e,r,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),Gb=(n,e,r)=>Rn(n,e,r,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])});var Wb,Hb=N(()=>{"use strict";ze();Wb=(n,e)=>{let r=re.calculateReshapedDims(e[0].dims,e[1].integerData);return n.session.pack?[n.reshapePacked(e[0],r)]:[n.reshapeUnpacked(e[0],r)]}});var qb,Bl,jb,Kb,Ro,FP,Fl,Xi,Vl=N(()=>{"use strict";ct();Ye();Oe();qb={name:"Upsample",inputNames:["X"],inputTypes:[0]},Bl=(n,e,r)=>(Fl(e,r),[n.run({...qb,cacheHint:r.cacheKey,get:()=>FP(n,e,r)},e)]),jb=n=>Ro(n,7),Kb=n=>Ro(n,9),Ro=(n,e)=>{let r=e>=10,t=n.attributes.getString("mode","nearest");if(t!=="nearest"&&t!=="linear"&&(e<11||t!=="cubic"))throw new Error(`unrecognized mode: ${t}`);let o=[];e<9&&(o=n.attributes.getFloats("scales"),Xi(o,t,r));let i=n.attributes.getFloat("extrapolation_value",0),a=e>10?n.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(a)===-1)throw new Error(`coordinate_transform_mode '${a}' is not supported`);let s=a==="tf_crop_and_resize",u=s,l=t==="nearest"&&e>=11?n.attributes.getString("nearest_mode","round_prefer_floor"):"";if(["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(l)===-1)throw new Error(`nearest_mode '${l}' is not supported`);let d=n.attributes.getFloat("cubic_coeff_a",-.75),f=n.attributes.getInt("exclude_outside",0)!==0;if(f&&t!=="cubic")throw new Error("exclude_outside can be set to 1 only when mode is CUBIC.");let m=e<11?!0:t==="nearest"&&a==="asymmetric"&&l==="floor",b=0,y=0,_=0;return e>10?n.inputs.length>2?(b=1,y=2,_=3):(y=1,_=2):e===9&&(y=1),Ie({opset:e,isResize:r,mode:t,scales:o,extrapolationValue:i,coordinateTransformMode:a,useExtrapolation:u,needRoiInput:s,nearestMode:l,cubicCoefficientA:d,excludeOutside:f,useNearest2xOptimization:m,roiInputIdx:b,scalesInputIdx:y,sizesInputIdx:_})},FP=(n,e,r)=>{let t=le(n.session.backend.glContext.version),[o,i]=n.calculateTextureWidthAndHeight(e[0].dims,0),a=e[0].dims.map((_,T)=>Math.floor(_*r.scales[T])),[s,u]=n.calculateTextureWidthAndHeight(a,0),l=a.length,d=new Array(l),f=new Array(l),m=`
      int output_pitches[${l}];
      int input_pitches[${l}];
      `;for(let _=l-1;_>=0;_--)d[_]=_===l-1?1:d[_+1]*a[_+1],f[_]=_===l-1?1:f[_+1]*e[0].dims[_+1],m+=`
        output_pitches[${_}] = ${d[_]};
        input_pitches[${_}] = ${f[_]};
        `;let b=`
      float getInputFloat(int index) {
        vec2 coords = offsetToCoords(index, ${o}, ${i});
        float value = getColorAsFloat(${t.texture2D}(X, coords));
        return value;
      }
      `,y=r.mode==="nearest"?`
    ${b}
    float process(int indices[${l}]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${m}

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

      ${m}

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

      ${m}

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
    }`;return{...qb,output:{dims:a,type:e[0].type,textureType:0},shaderSource:y,variables:[{name:"scales",type:"int",arrayLength:r.scales.length,data:r.scales.map(_=>Math.ceil(_))}]}},Fl=(n,e)=>{if(!n||e.opset<9&&n.length!==1||e.opset>=9&&e.opset<11&&n.length!==2||e.opset>=11&&n.length<2)throw new Error("invalid inputs.");if(e.scales.length>0&&n[0].dims.length!==e.scales.length)throw new Error("Invalid input shape.");if(n[0].type==="string")throw new Error("Invalid input tensor types.")},Xi=(n,e,r)=>{if(r){for(let t of n)if(t<=0)throw new Error("Scale value should be greater than 0.")}else for(let t of n)if(t<1)throw new Error("Scale value should be greater than or equal to 1.");if((e==="linear"||e==="cubic")&&n.length!==2&&(n.length!==4||n[0]!==1||n[1]!==1))throw new Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${r?"Resize":"Upsample"} opeartor.`)}});var Gl,Ul,Xb,Zb,VP,GP,UP,WP,Jb=N(()=>{"use strict";Ye();Oe();Lr();kn();Vl();Gl={name:"Resize",inputNames:["A"],inputTypes:[2]},Ul=(n,e,r)=>(Fl(e,r),[n.run({...Gl,cacheHint:r.cacheKey,get:()=>VP(n,e,r)},e)]),Xb=n=>Ro(n,10),Zb=n=>Ro(n,11),VP=(n,e,r)=>{let t=le(n.session.backend.glContext.version),[o,i]=GP(e,r);if(o.every(S=>S===1)&&r.coordinateTransformMode!=="tf_crop_and_resize")return{...Gl,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${t.texture2D}(X, TexCoords);
                    ${t.output} = v;
                }`};let s=i.length;if(s<2)throw new Error(`output dimension should be at least 2, but got ${s}`);let u=i[s-2],l=i[s-1],d=e[0].dims;if(s!==d.length)throw new Error(`output dimension should match input ${d.length}, but got ${s}`);let f=d[s-2],m=d[s-1],b=o[s-2],y=o[s-1],_="";if(r.mode!=="linear")throw new Error(`resize (packed) does not support mode: '${r.mode}'`);switch(r.coordinateTransformMode){case"asymmetric":_=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return vec4(coords) / scaleWHWH;
                    }
                `;break;case"half_pixel":_=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return (vec4(coords) + 0.5) / scaleWHWH - 0.5;
                    }
                `;break;case"pytorch_half_pixel":_=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 fcoords = vec4(coords);
                        return vec4(
                            ${l}.0 > 1.0 ? (fcoords.x + 0.5) / scaleWHWH.x - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.y + 0.5) / scaleWHWH.y - 0.5 : 0.0,
                            ${l}.0 > 1.0 ? (fcoords.z + 0.5) / scaleWHWH.z - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.w + 0.5) / scaleWHWH.w - 0.5 : 0.0
                          );
                    }
                `;break;case"align_corners":_=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 resized = vec4(${l}.0 - 1.0, ${u}.0 - 1.0, ${l}.0 - 1.0,
                            ${u}.0 - 1.0);
                        vec4 original = vec4(${m}.0 - 1.0, ${f}.0 - 1.0, ${m}.0 - 1.0,
                            ${f}.0 - 1.0);
                        vec4 new_scale = original / resized;
                        return vec4(coords) * new_scale;
                    }
                `;break;default:throw new Error(`resize (packed) does not support coordinateTransformMode:                                 '${r.coordinateTransformMode}'`)}let T=bt(s),w=Rr(),x=`
            const vec2 inputWH = vec2(${f}.0, ${m}.0);
            const vec4 scaleWHWH = vec4(float(${b}), float(${y}), float(${b}), float(${y}));
            ${w}
            ${_}
            float getAValue(int x10, int r, int c, int d) {
                return getChannel(getA(x10, r, c, d), vec2(c, d));
            }
            void main() {
                ${T} rc = getOutputCoords();

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
        `;return{...Gl,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:x}},GP=(n,e)=>{let t=n[0].dims,o=e.scales,i;if(o.length===0){let s=n[e.scalesInputIdx];if(s&&s.size!==0){if(n[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");o=UP(s,e.mode,e.isResize)}else{let u=n[e.sizesInputIdx];if(!u||u.size===0)throw new Error("Either scales or sizes MUST be provided as input.");i=Array.from(u.integerData),o=WP(i,t,e.mode,e.isResize)}}else if(n[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");let a=i||t.map((s,u)=>Math.floor(s*o[u]));return[o,a]},UP=(n,e,r)=>{let t=Array.from(n.floatData);return Xi(t,e,r),t},WP=(n,e,r,t)=>{let o=e.length,i=new Array(o);for(let a=0,s=o;a<s;a++)if(e[a]===0){if(n[a]!==0)throw new Error("Input dim is zero but required output dim is non-zero.");i[a]=1}else i[a]=n[a]/e[a];return Xi(i,r,t),i}});var Yb,HP,Qb=N(()=>{"use strict";Dn();Yb=(n,e)=>(HP(e),[new ot([e[0].dims.length],"int32",void 0,void 0,new Int32Array(e[0].dims))]),HP=n=>{if(!n||n.length!==1)throw new Error("Shape requires 1 input.")}});var Wl,ey,ty,ry,qP,ny,jP,KP,oy=N(()=>{"use strict";ct();Lo();ze();Oe();Wl={name:"Slice",inputNames:["A"],inputTypes:[0]},ey=(n,e,r)=>(qP(e),[n.run({...Wl,cacheHint:r.cacheKey,get:()=>ry(n,e[0],r)},e)]),ty=n=>{let e=n.attributes.getInts("starts"),r=n.attributes.getInts("ends"),t=n.attributes.getInts("axes",[]);return Ie({starts:e,ends:r,axes:t})},ry=(n,e,r)=>{let t=r.axes.length===0?e.dims.slice(0).map((f,m)=>m):r.axes,o=re.normalizeAxes(t,e.dims.length),i=r.starts.map((f,m)=>f>e.dims[o[m]]-1?e.dims[o[m]]:re.normalizeAxis(f,e.dims[o[m]])),a=r.ends.map((f,m)=>f>e.dims[o[m]]-1?e.dims[o[m]]:re.normalizeAxis(f,e.dims[o[m]])),s=e.dims.slice(),u=[];for(let f=0;f<o.length;f++)s[o[f]]=a[f]-i[f],i[f]>0&&u.push(`outputIdx[${o[f]}] += ${i[f]};`);let d=`
      float process(int outputIdx[${s.length}]) {
        ${u.join(`
      `)}
        return _A(outputIdx);
      }`;return{...Wl,output:{dims:s,type:e.type,textureType:0},shaderSource:d}},qP=n=>{if(!n||n.length!==1)throw new Error("Slice requires 1 input.");if(fn.indexOf(n[0].type)===-1)throw new Error("Invalid input type.")},ny=(n,e)=>{KP(e);let r=jP(n,e);return[n.run({...Wl,cacheHint:r.cacheKey,get:()=>ry(n,e[0],r)},[e[0]])]},jP=(n,e)=>{if(!n.session.isInitializer(e[1].dataId)||!n.session.isInitializer(e[2].dataId)||e.length>=4&&!n.session.isInitializer(e[3].dataId)||e.length>=5&&!n.session.isInitializer(e[4].dataId))throw new Error("dynamic slice attributes are not allowed");if(e.length>=5&&e[4].integerData.some(a=>a!==1))throw new Error("currently non-1 steps is not supported for Slice");let r=Array.from(e[1].integerData),t=Array.from(e[2].integerData),o=e.length>=4?Array.from(e[3].integerData):[],i=`${o};${r};${t}`;return{starts:r,ends:t,axes:o,cacheKey:i}},KP=n=>{if(!n||n.length<3||n.length>5)throw new Error("Invalid input number.");if(n[1].type!=="int32"||n[1].dims.length!==1)throw new Error("Invalid input type.");if(n[2].type!=="int32"||n[2].dims.length!==1)throw new Error("Invalid input type.");if(n.length>=4&&(n[3].type!=="int32"||n[3].dims.length!==1))throw new Error("Invalid input type.");if(n.length>=5&&(n[4].type!=="int32"||n[4].dims.length!==1))throw new Error("Invalid input type.")}});var iy,ay,sy,uy,ly,cy,dy,py,XP,ZP,JP,fy,hy=N(()=>{"use strict";ct();ze();Ye();Oe();qi();iy={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},ay={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},sy={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},uy=(n,e,r)=>{fy(e);let t=e[0].dims.slice(),o=re.normalizeAxis(r.axis,t.length),i=re.sizeToDimension(t,o),a=re.sizeFromDimension(t,o);return py(n,e,r,i,a)},ly=n=>Ie({axis:n.attributes.getInt("axis",1)}),cy=n=>Ie({axis:n.attributes.getInt("axis",-1)}),dy=(n,e,r)=>{fy(e);let t=e[0].dims.slice(),o=re.normalizeAxis(r.axis,t.length),i=t.length,a=o!==i-1,s=[],u=[],l=[],d;a&&(u=Array.from({length:i}).map((y,_)=>_),u[o]=i-1,u[i-1]=o,u.map(y=>s.push(t[y])),d=Ie({perm:u}),l=Ln(n,e,d));let f=a?re.sizeToDimension(s,i-1):re.sizeToDimension(t,i-1),m=a?re.sizeFromDimension(s,i-1):re.sizeFromDimension(t,i-1),b=py(n,a?l:e,r,f,m);return a?Ln(n,b,d):b},py=(n,e,r,t,o)=>{let i=XP(n,e[0],t,o,[t]),a=n.run({...iy,cacheHint:r.cacheKey,get:()=>i},e),s=ZP(n,e[0],t,o,i.output.dims,[t]),u=n.run({...ay,cacheHint:r.cacheKey,get:()=>s},[e[0],a]),l=JP(n,e[0],t,o,i.output.dims,s.output.dims);return[n.run({...sy,cacheHint:r.cacheKey,get:()=>l},[e[0],a,u])]},XP=(n,e,r,t,o)=>{let[i,a]=n.calculateTextureWidthAndHeight(e.dims,0),s=o.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1)throw new Error("Dimensionality of the output should be 1");if(o[0]!==r)throw new Error("Shape of the output should be equal to logical row count");let u=le(n.session.backend.glContext.version),l=`
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
      }`;return{...iy,output:{dims:o,type:e.type,textureType:0},shaderSource:l}},ZP=(n,e,r,t,o,i)=>{let[a,s]=n.calculateTextureWidthAndHeight(e.dims,0),u=i.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(i.length!==1)throw new Error("Dimensionality of the output should be 1");if(i[0]!==r)throw new Error("Shape of the output should be equal to logical row count");if(o.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==r)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=le(n.session.backend.glContext.version),d=`
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
      }`;return{...ay,output:{dims:i,type:e.type,textureType:0},shaderSource:d}},JP=(n,e,r,t,o,i)=>{let[a,s]=n.calculateTextureWidthAndHeight(e.dims,0),u=e.dims.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1||i.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==r||i[0]!==r)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=`
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
    }`;return{...sy,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:l}},fy=n=>{if(!n||n.length!==1)throw new Error("Softmax requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type")}});var my,gy,by,YP,QP,e3,yy=N(()=>{"use strict";ct();ze();Oe();my={name:"Split",inputNames:["A"],inputTypes:[0]},gy=(n,e,r)=>{e3(e);let t=re.normalizeAxis(r.axis,e[0].dims.length),o=YP(n,e,t,r),i=[];for(let a=0;a<o;++a)i.push(n.run({...my,cacheHint:`${r.cacheKey};${a}`,get:()=>QP(n,e[0],r,t,a)},e));return i},by=n=>{let e=n.attributes.getInt("axis",0),r=n.attributes.getInts("split",[]),t=n.outputs.length;return Ie({axis:e,split:r,numOutputs:t})},YP=(n,e,r,t)=>{let[,o]=Po.splitShape(e[0].dims,r,t.split,t.numOutputs);return o.length},QP=(n,e,r,t,o)=>{let[i,a]=Po.splitShape(e.dims,t,r.split,r.numOutputs),s=a[o],u=i[o],d=`
      float process(int indices[${u.length}]) {
        indices[${t}] += ${s};
        return _A(indices);
      }
    `;return{...my,cacheHint:`${r.cacheKey}:${o}`,output:{dims:u,type:e.type,textureType:0},shaderSource:d}},e3=n=>{if(!n||n.length!==1)throw new Error("Split requires one input.");if(n[0].type!=="int8"&&n[0].type!=="uint8"&&n[0].type!=="int16"&&n[0].type!=="uint16"&&n[0].type!=="int32"&&n[0].type!=="uint32"&&n[0].type!=="float32"&&n[0].type!=="float64"&&n[0].type!=="bool")throw new Error("Invalid input type.")}});var Hl,_y,vy,t3,r3,wy=N(()=>{"use strict";ze();Hl=(n,e,r)=>{t3(e);let t=re.squeezeShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},_y=(n,e)=>(r3(e),Hl(n,[e[0]],Array.from(e[1].integerData))),vy=n=>n.attributes.getInts("axes"),t3=n=>{if(!n||n.length!==1)throw new Error("Squeeze requires 1 input.");if(n[0].type==="string")throw new Error("invalid input tensor types.")},r3=n=>{if(!n||n.length!==2)throw new Error("Squeeze requires 2 inputs.");if(n[1].type!=="int32")throw new Error("Invalid input type.")}});var xy,n3,o3,Ty=N(()=>{"use strict";Ye();Oe();xy=(n,e)=>{o3(e);let r={name:"Sum",inputNames:e.map((o,i)=>`X${i}`),inputTypes:new Array(e.length).fill(0)};return[n.run({...r,get:()=>n3(n,e,r)},e)]},n3=(n,e,r)=>{let t=le(n.session.backend.glContext.version),o=e[0].dims.slice(),a=`
      void main() {
        vec4 result = ${e.map((s,u)=>`${t.texture2D}(X${u},TexCoords)`).join(" + ")};
        ${t.output} = result;
      }
    `;return{...r,output:{dims:o,type:e[0].type,textureType:0},hasMain:!0,shaderSource:a}},o3=n=>{if(!n||n.length===0)throw new Error("Sum requires inputs.");let e=n[0].dims.length;for(let r=1;r<n.length;r++){if(e!==n[r].dims.length)throw new Error("Input shapes are mismatched.");for(let t=0;t<e;t++)if(n[0].dims[t]!==n[r].dims[t])throw new Error("Input shapes are not matched.")}if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.");for(let r=1;r<n.length;r++)if(n[0].type!==n[r].type)throw new Error("Input types are not matched.")}});var Iy,i3,a3,Sy=N(()=>{"use strict";Lo();Oe();Iy=(n,e)=>{a3(e);let r={name:"Tile",inputNames:["A"],inputTypes:[0]};return[n.run({...r,get:()=>i3(n,e,r)},e)]},i3=(n,e,r)=>{let t=e[0].dims.slice(),o=new Array(t.length),i=[];for(let u=0;u<t.length;u++)o[u]=t[u]*e[1].numberData[u],i.push(`inputIdx[${u}] = int(mod(float(outputIdx[${u}]), ${t[u]}.));`);let a=o.length,s=`
      float process(int outputIdx[${a}]) {
        int inputIdx[${a}];
        ${i.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...r,output:{dims:o,type:e[0].type,textureType:0},shaderSource:s}},a3=n=>{if(!n||n.length!==2)throw new Error("Tile requires 2 input.");if(n[1].dims.length!==1)throw new Error("The second input shape must 1 dimension.");if(n[1].dims[0]!==n[0].dims.length)throw new Error("Invalid input shape.");if(fn.indexOf(n[0].type)===-1)throw new Error("Invalid input type.");if(n[1].type!=="int32"&&n[1].type!=="int16")throw new Error("Invalid repeat type.")}});var ql,$y,Ay,s3,u3,Oy=N(()=>{"use strict";ze();ql=(n,e,r)=>{s3(e);let t=re.unsqueezeShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},$y=(n,e)=>(u3(e),ql(n,[e[0]],Array.from(e[1].integerData))),Ay=n=>n.attributes.getInts("axes"),s3=n=>{if(!n||n.length!==1)throw new Error("Unsqueeze requires 1 input.");if(n[0].type==="string")throw new Error("invalid input tensor types.")},u3=n=>{if(!n||n.length!==2)throw new Error("Unsqueeze requires 2 inputs.");if(n[1].type!=="int32")throw new Error("Invalid input type.")}});var Py,Ey=N(()=>{"use strict";Fm();Qm();rg();ug();Ui();Hg();Jg();eb();nb();sb();cb();hb();yb();Wi();xb();Lb();Ub();Hb();Jb();Qb();oy();hy();yy();wy();Ty();Sy();qi();Pl();Oy();Vl();Py=[["Abs","","6+",lg],["Acos","","7+",cg],["Add","","7+",Vm],["And","","7+",Gm],["Asin","","7+",dg],["Atan","","7+",pg],["AveragePool","","7+",Ib,Sb],["BatchNormalization","","7+",Mm,Bm],["Cast","","6+",eg,tg],["Ceil","","6+",mg],["Clip","","6-10",Al,fg],["Clip","","11+",hg],["Concat","","4+",ig,sg],["Conv","","1+",Ll,Rl],["ConvTranspose","","1+",Ug,Wg],["Cos","","7+",gg],["Div","","7+",Um],["Dropout","","7+",Ol],["DepthToSpace","","1+",Xg,Zg],["Equal","","7+",Wm],["Elu","","6+",bg,yg],["Exp","","6+",_g],["Flatten","","1+",Yg,Qg],["Floor","","6+",vg],["FusedConv","com.microsoft","1+",Ll,Rl],["Gather","","1+",tb,rb],["Gemm","","7-10",zl,ib],["Gemm","","11+",zl,ab],["GlobalAveragePool","","1+",Ab,Ob],["GlobalMaxPool","","1+",kb],["Greater","","7+",Hm],["Identity","","1+",Ol],["ImageScaler","","1+",ub,lb],["InstanceNormalization","","6+",pb,fb],["LeakyRelu","","6+",wg,xg],["Less","","7+",qm],["LRN","","1+",mb,gb],["Log","","6+",Tg],["MatMul","","1+",Rg,zg],["MaxPool","","1+",Pb,Eb],["Mul","","7+",jm],["Neg","","6+",Ig],["Not","","1+",Sg],["Or","","7+",Km],["Pad","","2-10",Ml,_b],["Pad","","11+",vb,wb],["Pow","","7+",Xm],["PRelu","","7+",Zm],["ReduceLogSum","","1+",Vb,hn],["ReduceMax","","1+",Mb,hn],["ReduceMean","","1+",zb,hn],["ReduceMin","","1+",Bb,hn],["ReduceProd","","1+",Fb,hn],["ReduceSum","","1-12",Rb,hn],["ReduceSumSquare","","1+",Gb,hn],["Relu","","6+",$g],["Reshape","","5+",Wb],["Resize","","10",Ul,Xb],["Resize","","11+",Ul,Zb],["Shape","","1+",Yb],["Sigmoid","","6+",Ag],["Sin","","7+",Og],["Slice","","10+",ny],["Slice","","1-9",ey,ty],["Softmax","","1-12",uy,ly],["Softmax","","13+",dy,cy],["Split","","2-12",gy,by],["Sqrt","","6+",Pg],["Squeeze","","1-12",Hl,vy],["Squeeze","","13+",_y],["Sub","","7+",Jm],["Sum","","6+",xy],["Tan","","7+",Eg],["Tanh","","6+",Cg],["Tile","","6+",Iy],["Transpose","","1+",Ln,jg],["Upsample","","7-8",Bl,jb],["Upsample","","9",Bl,Kb],["Unsqueeze","","1-12",ql,Ay],["Unsqueeze","","13+",$y],["Xor","","7+",Ym]]});function Dy(n){let e={},r;for(;(r=Cy.exec(n))!==null;){let t=r[3].split(",").map(o=>{let i=o.trim().split(" ");return i&&i.length===2?{type:i[0],name:i[1]}:null}).filter(o=>o!==null);e[r[2]]={params:t,body:r[4]}}for(let t in e){let o=l3.replace("__FUNC__",t),i=new RegExp(o,"gm");for(;(r=i.exec(n))!==null;){let a=r[1],s=r[2],u=r[3].split(","),l=a?`${a} ${s};`:"",d=e[t].body,f="";e[t].params.forEach((b,y)=>{b&&(f+=`${b.type} ${b.name} = ${u[y]};
`)}),d=`${f}
 ${d}`,d=d.replace("return",`${s} = `);let m=`
      ${l}
      {
        ${d}
      }
      `;n=n.replace(r[0],m)}}return n=n.replace(Cy,""),n}var Cy,l3,ky=N(()=>{"use strict";Cy=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,l3="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function io(n,e){let r=[],t=[],o=e!=null&&Array.isArray(e)&&e.length===0,i=e==null||o?null:c3(e,n).sort(),a=0;for(let s=0;s<n.length;++s){if(i!=null){if(i[a]===s&&n[s]!==1)throw new Error(`Can't squeeze axis ${s} since its dim '${n[s]}' is not 1`);(i[a]==null||i[a]>s)&&n[s]===1&&(r.push(n[s]),t.push(s)),i[a]<=s&&a++}n[s]!==1&&(r.push(n[s]),t.push(s))}return{newShape:r,keptDims:t}}function c3(n,e){let r=e.length;return n=n==null?e.map((t,o)=>o):[].concat(n),Qn(n.every(t=>t>=-r&&t<r),()=>`All values in axis param must be in range [-${r}, ${r}) but got axis ${n}`),Qn(n.every(d3),()=>`All values in axis param must be integers but got axis ${n}`),n.map(t=>t<0?r+t:t)}function d3(n){return n%1===0}function p3(n){if(n.length===0)return 1;let e=n[0];for(let r=1;r<n.length;r++)e*=n[r];return e}function Ny(n){let e=Math.ceil(Math.sqrt(n));return[e,Math.ceil(n/e)]}var Zi,jl=N(()=>{"use strict";kt();ze();Zi=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,r){let t=this.computeTexture(e,r);return r&&r.isPacked&&(t[0]/=2,t[1]/=2),r&&r.reverseWH?[t[1],t[0]]:t}computeTexture(e,r){let t=r&&r.isPacked;if(e.length===0)return t?[2,2]:[1,1];let o=this.maxTextureSize;if(r&&r.breakAxis!==void 0){let s=r.breakAxis>=e.length?1:e.slice(r.breakAxis).reduce((l,d)=>l*d),u=r.breakAxis<=0?1:e.slice(0,r.breakAxis).reduce((l,d)=>l*d);if(s>o||u>o)Fe.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${r.breakAxis}`);else return[s,u]}let i=e.slice(0);t&&(o=o*2,i=i.map((s,u)=>u>=i.length-2?i[u]%2===0?i[u]:i[u]+1:i[u]),i.length===1&&(i=[2,i[0]])),i.length!==2&&(i=io(i).newShape);let a=p3(i);return i.length<=1&&a<=o?[1,a]:i.length===2&&i[0]<=o&&i[1]<=o?i:i.length===3&&i[0]*i[1]<=o&&i[2]<=o?[i[0]*i[1],i[2]]:i.length===3&&i[0]<=o&&i[1]*i[2]<=o?[i[0],i[1]*i[2]]:i.length===4&&i[0]*i[1]*i[2]<=o&&i[3]<=o?[i[0]*i[1]*i[2],i[3]]:i.length===4&&i[0]<=o&&i[1]*i[2]*i[3]<=o?[i[0],i[1]*i[2]*i[3]]:t?Ny(a/4).map(s=>s*2):Ny(a)}}});var Ji,Ly=N(()=>{"use strict";ze();Jr();Ye();jl();Lr();Ji=class extends Bt{constructor(e){super(e)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let e="offsetToCoords";return{offsetToCoords:new Z(`
      vec2 ${e}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){let e="coordsToOffset";return{coordsToOffset:new Z(`
      int ${e}(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let e=this.context.outputTextureLayout;return e.isPacked?this.getPackedOutputSamplingSnippet(e):this.getUnpackedOutputSamplingSnippet(e)}getPackedOutputSamplingSnippet(e){let r=e.unpackedShape,t=[e.width,e.height],o={},i="getOutputCoords";switch(r.length){case 0:o[i]=this.getOutputScalarCoords();break;case 1:o[i]=this.getOutputPacked1DCoords(r,t);break;case 2:o[i]=this.getOutputPacked2DCoords(r,t);break;case 3:o[i]=this.getOutputPacked3DCoords(r,t);break;default:o[i]=this.getOutputPackedNDCoords(r,t)}let s=`
      void setOutput(vec4 val) {
        ${le(this.context.glContext.version).output} = val;
      }
    `,u="floatTextureSetRGBA";return o[u]=new Z(s),o}getUnpackedOutputSamplingSnippet(e){let r=e.unpackedShape,t=[e.width,e.height],o={},i="getOutputCoords";switch(r.length){case 0:o[i]=this.getOutputScalarCoords();break;case 1:o[i]=this.getOutputUnpacked1DCoords(r,t);break;case 2:o[i]=this.getOutputUnpacked2DCoords(r,t);break;case 3:o[i]=this.getOutputUnpacked3DCoords(r,t);break;case 4:o[i]=this.getOutputUnpacked4DCoords(r,t);break;case 5:o[i]=this.getOutputUnpacked5DCoords(r,t);break;case 6:o[i]=this.getOutputUnpacked6DCoords(r,t);break;default:throw new Error(`Unsupported output dimensionality: ${r.length}`)}let s=`
        void setOutput(float val) {
          ${le(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `,u="floatTextureSetR";return o[u]=new Z(s),o}getOutputScalarCoords(){return new Z(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(e,r){let t=r,o="";return t[0]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${t[1]}.0);
          }
        `,new Z(o)):t[1]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${t[0]}.0);
          }
        `,new Z(o)):(o=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${t[0]}, ${t[1]}));
          return 2 * (resTexRC.y * ${t[0]} + resTexRC.x);
        }
      `,new Z(o))}getOutputPacked2DCoords(e,r){let t="";if(On.arraysEqual(e,r))return t=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${r[0]}, ${r[1]}));
        }
      `,new Z(t);let o=r,i=Math.ceil(e[1]/2);return t=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${o[0]}, ${o[1]}));

          int index = resTexRC.y * ${o[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${i}) * 2;
          int c = 2 * (index / ${i});

          return ivec2(r, c);
        }
      `,new Z(t)}getOutputPacked3DCoords(e,r){let t=[r[0],r[1]],o=Math.ceil(e[2]/2),i=o*Math.ceil(e[1]/2),a=`
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
      `;return new Z(a)}getOutputPackedNDCoords(e,r){let t=[r[0],r[1]],o=Math.ceil(e[e.length-1]/2),i=o*Math.ceil(e[e.length-2]/2),a=i,s="",u="b, r, c";for(let d=2;d<e.length-1;d++)a*=e[e.length-d-1],s=`
      int b${d} = index / ${a};
      index -= b${d} * ${a};
    `+s,u=`b${d}, `+u;let l=`
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
    `;return new Z(l)}getOutputUnpacked1DCoords(e,r){let t=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          return resTexRC.y * ${r[0]} + resTexRC.x;
        }
      `;return new Z(t)}getOutputUnpacked2DCoords(e,r){let t=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          int r = index / ${e[1]};
          int c = index - r * ${e[1]};
          return ivec2(r, c);
        }
      `;return new Z(t)}getOutputUnpacked3DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d"],s=i.map((u,l)=>{let d=`int ${a[l]} = index / ${u}`,f=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${d}; ${f};`}).join("");return t=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          ${s}
          return ivec3(r, c, d);
        }
      `,new Z(t)}getOutputUnpacked4DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2"],s=i.map((u,l)=>{let d=`int ${a[l]} = index / ${u}`,f=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${d}; ${f};`}).join("");return t=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          ${s}
          return ivec4(r, c, d, d2);
        }
      `,new Z(t)}getOutputUnpacked5DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2","d3"],s=i.map((u,l)=>{let d=`int ${a[l]} = index / ${u}`,f=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${d}; ${f};`}).join("");return t=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          ${s}
          return ivec5(r, c, d, d2, d3);
        }
      `,new Z(t)}getOutputUnpacked6DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2","d3","d4"],s=i.map((u,l)=>{let d=`int ${a[l]} = index / ${u}`,f=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${d}; ${f};`}).join("");return t=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${r[0]}, ${r[1]}));
         int index = resTexRC.y * ${r[0]} + resTexRC.x;
         ${s}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new Z(t)}getCommonUtilFuncs(){let e={},r="uvFromFlat";e[r]=new Z(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),r="packedUVfrom1D",e[r]=new Z(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),r="packedUVfrom2D",e[r]=new Z(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),r="packedUVfrom3D",e[r]=new Z(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),r="sampleTexture";let t=le(this.context.glContext.version);return e[r]=new Z(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${t.texture2D}(textureSampler, uv).r;
        }`),e}getInputsSamplingSnippets(){let e={},r=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o],a=Ri(t);i.isPacked?e[a]=this.getPackedSamplerFromInput(a,t,i):e[a]=this.getUnpackedSamplerFromInput(a,t,i);let s=xm(t);i.unpackedShape.length<=r.unpackedShape.length&&(i.isPacked?e[s]=this.getPackedSamplerAtOutputCoords(s,i,r,t):e[s]=this.getUnpackedSamplerAtOutputCoords(s,i,r,t))}),e}getPackedSamplerAtOutputCoords(e,r,t,o){let i=r.unpackedShape,a=t.unpackedShape,u=Ri(o),l=i.length,d=a.length,f=gt.getBroadcastDims(i,a),m=bt(d),b=d-l,y,_=Kt();l===0?y="":d<2&&f.length>=1?y="coords = 0;":y=f.map(M=>`coords.${_[M+b]} = 0;`).join(`
`);let T="";d<2&&l>0?T="coords":T=i.map((M,F)=>`coords.${_[F+b]}`).join(", ");let w="return outputValue;",S=re.size(i)===1,P=re.size(a)===1;if(l===1&&!S&&!P)w=`
        return vec4(outputValue.xy, outputValue.xy);
      `;else if(S&&!P)d===1?w=`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:w=`
          return vec4(outputValue.x);
        `;else if(f.length){let M=l-2,F=l-1;f.indexOf(M)>-1&&f.indexOf(F)>-1?w="return vec4(outputValue.x);":f.indexOf(M)>-1?w="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":f.indexOf(F)>-1&&(w="return vec4(outputValue.xx, outputValue.zz);")}let C=`
        int lastDim = coords.${_[d-1]};
        coords.${_[d-1]} = coords.${_[d-2]};
        coords.${_[d-2]} = lastDim;
      `,L=`
      vec4 ${e}() {
        ${m} coords = getOutputCoords();
        ${C}
        ${y}
        vec4 outputValue = ${u}(${T});
        ${w}
      }
    `;return new Z(L,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(e,r,t,o){let i=[t.width,t.height],a=[r.width,r.height],s=r.unpackedShape.length,u=t.unpackedShape.length,l=r.unpackedShape,d=t.unpackedShape,f=Ri(o);if(s===u&&On.arraysEqual(a,i)){let S=`
          float ${e}() {
            return sampleTexture(${o}, TexCoords);
          }
        `;return new Z(S,["coordinates.sampleTexture"])}let m=bt(u),b=gt.getBroadcastDims(l,d),y=u-s,_,T=Kt();s===0?_="":u<2&&b.length>=1?_="coords = 0;":_=b.map(S=>`coords.${T[S+y]} = 0;`).join(`
`);let w="";u<2&&s>0?w="coords":w=r.unpackedShape.map((S,A)=>`coords.${T[A+y]}`).join(", ");let x=`
        float ${e}() {
          ${m} coords = getOutputCoords();
          ${_}
          return ${f}(${w});
        }
      `;return new Z(x,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(e,r,t){switch(t.unpackedShape.length){case 0:return this.getPackedSamplerScalar(e,r);case 1:return this.getPackedSampler1D(e,r,t);case 2:return this.getPackedSampler2D(e,r,t);case 3:return this.getPackedSampler3D(e,r,t);default:return this.getPackedSamplerND(e,r,t)}}getUnpackedSamplerFromInput(e,r,t){let o=t.unpackedShape;switch(o.length){case 0:return this.getUnpackedSamplerScalar(e,r,t);case 1:return this.getUnpackedSampler1D(e,r,t);case 2:return this.getUnpackedSampler2D(e,r,t);case 3:return this.getUnpackedSampler3D(e,r,t);case 4:return this.getUnpackedSampler4D(e,r,t);case 5:return this.getUnpackedSampler5D(e,r,t);case 6:return this.getUnpackedSampler6D(e,r,t);default:throw new Error(`Unsupported dimension ${o.length}-D`)}}getPackedSamplerScalar(e,r){let t=le(this.context.glContext.version),o=`
          vec4 ${e}() {
            return ${t.texture2D}(${r}, halfCR);
          }
        `;return new Z(o)}getPackedSampler1D(e,r,t){let o=[t.width,t.height],i=[o[1],o[0]],a=le(this.context.glContext.version),u=`vec4 ${e}(int index) {
      vec2 uv = packedUVfrom1D(
      ${i[0]}, ${i[1]}, index);
      return ${a.texture2D}(${r}, uv);
    }`;return new Z(u,["coordinates.packedUVfrom1D"])}getPackedSampler2D(e,r,t){let o=t.unpackedShape,i=[t.width,t.height],a=le(this.context.glContext.version),s=i[0],u=i[1];if(i!=null&&On.arraysEqual(o,i)){let b=`vec4 ${e}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${u}.0, ${s}.0);
        return ${a.texture2D}(${r}, uv);
      }`;return new Z(b)}let l=i,d=Math.ceil(o[1]/2),m=`vec4 ${e}(int row, int col) {
      vec2 uv = packedUVfrom2D(${l[1]}, ${l[0]}, ${d}, row, col);
      return ${a.texture2D}(${r}, uv);
    }`;return new Z(m,["coordinates.packedUVfrom2D"])}getPackedSampler3D(e,r,t){let o=t.unpackedShape,i=[t.width,t.height],a=[i[0],i[1]],s=le(this.context.glContext.version);if(o[0]===1){let y=o.slice(1),_=[1,2],T=eo(o,y),w=["b","row","col"],x=JSON.parse(JSON.stringify(t));x.unpackedShape=T;let S=this.getPackedSamplerFromInput(e,r,x),P=`${S.routineBody}
      vec4 ${e}(int b, int row, int col) {
        return ${e}(${to(w,_)});
      } `;return new Z(P,S.dependencies)}let u=a[0],l=a[1],d=Math.ceil(o[2]/2),f=d*Math.ceil(o[1]/2),b=`vec4 ${e}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${l}, ${u}, ${f}, ${d}, b, row, col);
      return ${s.texture2D}(${r}, uv);}`;return new Z(b,["coordinates.packedUVfrom3D"])}getPackedSamplerND(e,r,t){let o=t.unpackedShape,i=o.length,a=[t.width,t.height],s=le(this.context.glContext.version),u=[a[0],a[1]],l=u[1],d=u[0],f=Math.ceil(o[i-1]/2),m=f*Math.ceil(o[i-2]/2),b="int b, int row, int col",y=`b * ${m} + (row / 2) * ${f} + (col / 2)`;for(let w=2;w<i-1;w++)b=`int b${w}, `+b,m*=o[i-w-1],y=`b${w} * ${m} + `+y;let T=`vec4 ${e}(${b}) {
      int index = ${y};
      int texR = index / ${d};
      int texC = index - texR * ${d};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${d}, ${l});
      return ${s.texture2D}(${r}, uv);
    }`;return new Z(T)}getUnpackedSamplerScalar(e,r,t){let[o,i]=[t.width,t.height];if(o===1&&i===1){let s=`
          float ${e}() {
            return sampleTexture(${r}, halfCR);
          }
        `;return new Z(s,["coordinates.sampleTexture"])}let a=`
        float ${e}() {
          int offset_${r} = coordsToOffset(TexCoords, ${o}, ${i});
          vec2 uv = uvFromFlat(${o}, ${i}, offset_${r});
          return sampleTexture(${r}, uv);
        }
      `;return new Z(a,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(e,r,t){let o=t.width,i=t.height;if(i===1&&o===1){let s=`
        float ${e}(int index) {
          return sampleTexture(${r}, halfCR);
        }
      `;return new Z(s,["coordinates.sampleTexture"])}if(i===1){let s=`
          float ${e}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${o}.0, 0.5);
            return sampleTexture(${r}, uv);
          }
        `;return new Z(s,["coordinates.sampleTexture"])}if(o===1){let s=`
          float ${e}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${i}.0);
            return sampleTexture(${r}, uv);
          }
        `;return new Z(s,["coordinates.sampleTexture"])}let a=`
        float ${e}(int index) {
          vec2 uv = uvFromFlat(${o}, ${i}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new Z(a,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(e,r,t){let o=t.unpackedShape,i=[t.height,t.width];if(i!=null&&On.arraysEqual(o,i)){let m=i[1],b=i[0],y=`
          float ${e}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${m}.0, ${b}.0);
            return sampleTexture(${r}, uv);
          }
        `;return new Z(y,["coordinates.sampleTexture"])}let{newShape:a,keptDims:s}=io(o),u=a;if(u.length<o.length){let m=eo(o,u),b=JSON.parse(JSON.stringify(t));b.unpackedShape=m;let y=["col","row"],_=`
          ${this.getUnpackedSamplerFromInput(e,r,b).routineBody}
          float ${e}(int row, int col) {
            return ${e}(${to(y,s)});
          }
        `;return new Z(_,["coordinates.sampleTexture"])}let l=i[1],d=i[0];if(d===1){let m=`
          float ${e}(int row, int col) {
            int offset_${r} = coordsToOffset(TexCoords, ${l}, ${d});
            float index = dot(vec3(row, col, offset_${r}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${l}.0);
            return sampleTexture(${r}, uv);
          }
        `;return new Z(m,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(l===1){let m=`
          float ${e}(int row, int col) {
            int offset_${r} = coordsToOffset(TexCoords, ${l}, ${d});
            float index = dot(vec3(row, col, offset_${r}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${d}.0, 0.5);
            return sampleTexture(${r}, uv);
          }
        `;return new Z(m,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let f=`
        float ${e}(int row, int col) {
          int index = col * ${o[1]} + row;
          vec2 uv = uvFromFlat(${l}, ${d}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new Z(f,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(e,r,t){let o=t.unpackedShape,i=o[1]*o[2],a=o[2],{newShape:s,keptDims:u}=io(o),l=s;if(l.length<o.length){let b=eo(o,l),y=["batch","col","row"],_=JSON.parse(JSON.stringify(t));_.unpackedShape=b;let T=this.getUnpackedSamplerFromInput(e,r,_),w=u.reverse(),x=`
          ${T.routineBody}
          float ${e}(int batch, int row, int col) {
            return ${e}(${to(y,w)});
          }
        `;return new Z(x,T.dependencies)}let d=t.width,f=t.height,m=`
          float ${e}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${i} + col * ${a} + row;
            vec2 uv = uvFromFlat(${d}, ${f}, index);
            return sampleTexture(${r}, uv);
          }
      `;return new Z(m,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(e,r,t){let o=t.unpackedShape,i=o[3],a=o[2]*i,s=o[1]*a,u=t.width,l=t.height,d=`
        float ${e}(int row, int col, int depth, int depth2) {
          int index = row * ${s} + col * ${a} +
              depth2 * ${i} + depth;
          vec2 uv = uvFromFlat(${u}, ${l}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new Z(d,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(e,r,t){let o=t.unpackedShape,i=o[4],a=o[3]*i,s=o[2]*a,u=o[1]*s,{newShape:l,keptDims:d}=io(o);if(l.length<o.length){let y=eo(o,l),_=["row","col","depth","depth2","depth3"],T=JSON.parse(JSON.stringify(t));T.unpackedShape=y;let w=`
          ${this.getUnpackedSamplerFromInput(e,r,T).routineBody}
          float ${e}(int row, int col, int depth, int depth2, int depth3) {
            return ${e}(${to(_,d)});
          }
        `;return new Z(w,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let f=t.width,m=t.height,b=`
        float ${e}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${u} + col * ${s} + depth * ${a} +
          depth3 * ${i} + depth2;
          vec2 uv = uvFromFlat(${f}, ${m}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new Z(b,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(e,r,t){let o=t.unpackedShape,i=o[5],a=o[4]*i,s=o[3]*a,u=o[2]*s,l=o[1]*u,{newShape:d,keptDims:f}=io(o);if(d.length<o.length){let _=eo(o,d),T=["row","col","depth","depth2","depth3","depth4"],w=JSON.parse(JSON.stringify(t));w.unpackedShape=_;let x=`
            ${this.getUnpackedSamplerFromInput(e,r,w).routineBody}
            float ${e}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${e}(${to(T,f)});
            }
          `;return new Z(x,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let m=t.width,b=t.height,y=`
          float ${e}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${l} + col * ${u} + depth * ${s} +
            depth2 * ${a} + depth3 * ${i} + depth4;
            vec2 uv = uvFromFlat(${m}, ${b}, index);
            return sampleTexture(${r}, uv);
          }
        `;return new Z(y,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let e=this.context.outputTextureLayout,r=e.shape.length,t=e.strides,o=e.width,i=e.height,a=[];for(let u=0;u<r-1;++u)a.push(`
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
    `;return{toVec:new Z(s,["coordinates.coordsToOffset"])}}valueFrom(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t],a=(o.unpackedShape.length>0?o.unpackedShape:o.shape).length,s=`_${r}`;e[s]=new Z(this.getValueFromSingle(r,a,o.width,o.height,!1),[`shapeUtils.indicesToOffset${s}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),s=s+"_T",e[s]=new Z(this.getValueFromSingle(r,a,o.width,o.height,!0),[`shapeUtils.indicesToOffset${s}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),e}getValueFromSingle(e,r,t,o,i){let a=`_${e}`;i&&(a=a+"_T");let s=le(this.context.glContext.version);return`
        float ${a}(int m[${r}]) {
          int offset = indicesToOffset${a}(m);
          vec2 coords = offsetToCoords(offset, ${t}, ${o});
          float value = getColorAsFloat(${s.texture2D}(${e}, coords));
          return value;
        }
        `}getPackedValueFrom(e,r,t,o,i){let a=`_${e}_Pack`;i&&(a=a+"_T");let s=le(this.context.glContext.version);return`
        vec4 ${a}(int m[${r}]) {
          int offset = indicesToOffset_${e}(m);
          vec2 coords = offsetToCoords(offset, ${t}, ${o});
          return ${s.texture2D}(${e}, coords);
        }
        `}}});var Yi,Ry=N(()=>{"use strict";Jr();Yi=class n extends Bt{constructor(e){super(e)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new Z(`highp vec4 encode(highp float f) {
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
        `)}}static isLittleEndian(){let e=new ArrayBuffer(4),r=new Uint32Array(e),t=new Uint8Array(e);if(r[0]=3735928559,t[0]===239)return!0;if(t[0]===222)return!1;throw new Error("unknown endianness")}}});var Qi,zy=N(()=>{"use strict";Jr();Ye();Qi=class extends Bt{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=le(this.context.glContext.version);return{setFragColor:new Z(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new Z(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}});var ea,My=N(()=>{"use strict";Jr();ea=class n extends Bt{constructor(e){super(e)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let e=this.context.outputTextureLayout.shape.length,r={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].unpackedShape;if(i.length<=e){let a=i.length,s=e-a,u=`bcastIndices_${t}`,l="";for(let f=0;f<a;++f)l+=`
          realIndices[${f}] = int( mod(float(bcastedIndices[${s+f}]), ${i[f]}.0) );
          `;let d=`
        void ${u} (int bcastedIndices[${e}], out int realIndices[${a}]) {
          ${l}
        }
        `;r[u]=new Z(d)}}),r}bcastMatmulIndex(){let e=this.context.outputTextureLayout.shape.length,r={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].shape;if(!(i.length<2||i.length>e)){let a=i.length,s=e-a,u=`bcastMatmulIndices_${t}`,l="";for(let f=0;f<a-2;++f)l+=`
          realIndices[${f}] = int( mod(float(bcastedIndices[${s+f}]), ${i[f]}.0) );
          `;let d=`
        void ${u}(int bcastedIndices[${e}], out int realIndices[${a}]) {
          ${l}
          realIndices[${a-1}] = bcastedIndices[${e-1}];
          realIndices[${a-2}] = bcastedIndices[${e-2}];
        }
        `;r[u]=new Z(d)}}),r}indicesToOffset(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,a=o.length,s=`indicesToOffset_${r}`;e[s]=new Z(n.indexToOffsetSingle(s,a,i)),s=`indicesToOffset_${r}_T`,e[s]=new Z(n.indexToOffsetSingle(s,a,i.slice().reverse()))}),e}static indexToOffsetSingle(e,r,t){let o="";for(let i=r-1;i>=0;--i)o+=`
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
        `;e[a]=new Z(u)}),e}}});var ta,By=N(()=>{"use strict";Jr();ta=class extends Bt{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let r=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},o={};for(let i in t){let a=`${i}Vec`,s="";for(let l=0;l<r;++l)s+=`
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
    `;return{getVecItem:new Z(o)}}}});var Kl,Fy=N(()=>{"use strict";Ly();Ry();zy();My();By();Kl={encoding:Yi,fragcolor:Qi,vec:ta,shapeUtils:ea,coordinates:Ji}});var ra,Vy=N(()=>{"use strict";Jr();ky();Fy();Ye();ra=class{constructor(e,r,t,o){this.libs={};this.glslLibRoutineDependencyGraph={};this.context=new Fi(e,r,t,o),Object.keys(Kl).forEach(a=>{let s=new Kl[a](this.context);this.libs[a]=s});let i=this.glslLibRoutineDependencyGraph;for(let a in this.libs){let u=this.libs[a].getFunctions();for(let l in u){let d=a+"."+l,f;i[d]?(f=i[d],f.routineBody=u[l].routineBody):(f=new No(d,u[l].routineBody),i[d]=f);let m=u[l].dependencies;if(m)for(let b=0;b<m.length;++b)if(i[m[b]])f.addDependency(i[m[b]]);else{let y=new No(m[b]);i[m[b]]=y,f.addDependency(y)}}}}preprocess(){let e=this.context.programInfo,r=e.shaderSource;return this.context.programInfo.hasMain||(r=`${r}
      ${wm(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),r=Dy(r),`${vm(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(r)}
    ${r}`}getImports(e){let r=this.selectGlslLibRoutinesToBeIncluded(e);if(r.length===0)return"";let t="";for(let o=0;o<r.length;++o)if(r[o].routineBody)t+=r[o].routineBody+`
`;else throw new Error(`Missing body for the Glsl Library routine: ${r[o].name}`);return t}selectGlslLibRoutinesToBeIncluded(e){let r=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(t=>{let o=t.split(".")[1];e.indexOf(o)!==-1&&r.push(this.glslLibRoutineDependencyGraph[t])}),Vi.returnOrderedNodes(r)}getUniforms(e,r){let t=[];if(e)for(let o of e)t.push(`uniform sampler2D ${o};`);if(r)for(let o of r)t.push(`uniform ${o.type} ${o.name}${o.arrayLength?`[${o.arrayLength}]`:""};`);return t.join(`
`)}}});var na,Gy=N(()=>{"use strict";ft();kt();Vy();Ye();na=class{constructor(e,r,t){this.profiler=e;this.glContext=r;this.textureLayoutStrategy=t;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,r){this.repo.set(e,r)}run(e,r,t){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let o=this.glContext.gl,i=e.program;o.useProgram(i);try{this.bindOutput(t),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],r)}catch(a){throw Fe.error("ProgramManager",e.programInfo.shaderSource),a}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,r,t){return this.profiler.event("backend","ProgramManager.build",()=>{let o=new ra(this.glContext,e,r,t),i=o.preprocess(),a=this.compile(i);return{programInfo:e,program:a,uniformLocations:this.getUniformLocations(a,o.context.programInfo.inputNames,o.context.programInfo.variables),attribLocations:this.getAttribLocations(a)}})}compile(e){if(!this.vertexShader){Fe.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let o=_m(this.glContext.version);this.vertexShader=this.glContext.compileShader(o,this.glContext.gl.VERTEX_SHADER)}ge.debug&&Fe.verbose("ProrgramManager",`FragShader:
${e}
`);let r=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),t=this.glContext.createProgram(this.vertexShader,r);return this.glContext.deleteShader(r),t}bindOutput(e){let r=e.width,t=e.height;Fe.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${r}/${t}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,r,t)}bindAttributes(e){let r=e.position,t=e.textureCoord;this.glContext.setVertexAttributes(r,t),this.attributesBound=!0}bindUniforms(e,r,t){let o=this.glContext.gl,i=0;for(let{name:a,type:s,location:u,arrayLength:l}of e){let d=r.find(f=>f.name===a)?.data;if(s!=="sampler2D"&&!d)throw new Error(`variable '${a}' does not have data defined in program info`);switch(s){case"sampler2D":this.bindTexture(t[i],u,i),i++;break;case"float":l?o.uniform1fv(u,d):o.uniform1f(u,d);break;case"int":l?o.uniform1iv(u,d):o.uniform1i(u,d);break;default:throw new Error(`Uniform not implemented: ${s}`)}}}bindTexture(e,r,t){this.glContext.bindTextureToUniform(e.texture,t,r)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,r,t){let o=[];if(r)for(let i of r)o.push({name:i,type:"sampler2D",location:this.getUniformLocation(e,i)});if(t)for(let i of t)o.push({...i,location:this.getUniformLocation(e,i.name)});return o}getUniformLocation(e,r){let o=this.glContext.gl.getUniformLocation(e,r);if(o===null)throw new Error(`Uniform ${r} not found.`);return o}getAttribLocation(e,r){return this.glContext.gl.getAttribLocation(e,r)}}});var oa,Uy=N(()=>{"use strict";kt();Do();oa=class{constructor(e,r,t,o){this.glContext=e;this.layoutStrategy=r;this.profiler=t;this.config=o;this.pendingRead=new Map;o.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,r,t,o){let i=this.toEncoderType(e),a=this.glContext.getEncoder(i,r.channels||1,o);if(r.isPacked&&o===1)throw new Error("not implemented");let s=r.width,u=r.height,l,d;if(this.config.reuseTextures){l=`${s}x${u}_${a.format}_${a.internalFormat}_${a.textureType}`,d=this.inUseTextures.get(l),d||(d=[],this.inUseTextures.set(l,d));let m=this.idleTextures.get(l);if(m&&m.length>0){let b=m.pop();return d.push(b),o===1&&this.glContext.updateTexture(b,s,u,a,this.toTextureData(e,t)),b}}Fe.verbose("TextureManager",`Creating new texture of size ${r.width}x${r.height}`);let f=this.glContext.allocateTexture(s,u,a,this.toTextureData(e,t));return this.config.reuseTextures&&(d.push(f),this.textureLookup.set(f,l)),f}readTexture(e,r,t){return t||(t=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let o=e.shape.reduce((a,s)=>a*s)*t,i=this.glContext.readTexture(e.texture,e.width,e.height,o,this.toEncoderType(r),t);return this.toTensorData(r,i)})}async readTextureAsync(e,r,t){let o=e.tensor.dataId;if(t||(t=1),this.pendingRead.has(o)){let i=this.pendingRead.get(o);return new Promise(a=>i?.push(a))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(o,[]);let i=e.shape.reduce((l,d)=>l*d)*t;await this.glContext.createAndWaitForFence();let a=this.glContext.readTexture(e.texture,e.width,e.height,i,this.toEncoderType(r),t),s=this.toTensorData(r,a),u=this.pendingRead.get(o);return this.pendingRead.delete(o),u?.forEach(l=>l(s)),s})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let r=e.shape.reduce((o,i)=>o*i),t=this.glContext.readTexture(e.texture,e.width,e.height,r*4,"byte",4);return new Float32Array(t.buffer,t.byteOffset,r)})}releaseTexture(e,r){let t;if(this.config.reuseTextures&&(t=this.textureLookup.get(e.texture),t)){r&&this.textureLookup.delete(t);let o=this.inUseTextures.get(t);if(o){let i=o.indexOf(e.texture);if(i!==-1){o.splice(i,1);let a=this.idleTextures.get(t);a||(a=[],this.idleTextures.set(t,a)),a.push(e.texture)}}}(!t||r)&&(Fe.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,r){switch(e){case"int16":return r instanceof Int16Array?r:Int16Array.from(r);case"int32":return r instanceof Int32Array?r:Int32Array.from(r);case"int8":return r instanceof Int8Array?r:Int8Array.from(r);case"uint16":return r instanceof Uint16Array?r:Uint16Array.from(r);case"uint32":return r instanceof Uint32Array?r:Uint32Array.from(r);case"uint8":case"bool":return r instanceof Uint8Array?r:Uint8Array.from(r);case"float32":return r instanceof Float32Array?r:Float32Array.from(r);case"float64":return r instanceof Float64Array?r:Float64Array.from(r);default:throw new Error(`TensorData type ${e} is not supported`)}}toTextureData(e,r){if(r)return r instanceof Float32Array?r:new Float32Array(r)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}});var ia,Wy=N(()=>{"use strict";kt();kf();Rm();Ey();Gy();jl();Uy();ia=class{constructor(e,r){this.backend=e;this.context=r;this.layoutStrategy=new Zi(e.glContext.maxTextureSize),this.programManager=new na(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new oa(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:e.textureCacheMode==="full"}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new Bi(this)}onGraphInitialized(e){let r=e.getValues().filter(t=>t.from===-1&&t.tensor).map(t=>t.tensor.dataId);this.initializers=new Set(r)}isInitializer(e){return this.initializers?this.initializers.has(e):!1}addInitializer(e){this.initializers.add(e)}getTextureData(e,r){return r?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,r,t=!1){Fe.verbose("WebGLSessionHandler","Storing Texture data in cache"),t?this.packedTextureDataCache.set(e,r):this.unpackedTextureDataCache.set(e,r)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,r,t){let o=Df(e,r,Py);return{impl:o.opImpl,context:o.opInit?o.opInit(e,t):e}}}});function f3(n){let e=0;for(;e<n.length&&n[e]();++e);return e-1}var zo,Hy=N(()=>{"use strict";ft();Do();Do();Lr();zo=class{constructor(e,r){this.frameBufferBound=!1;this.itemsToPoll=[];this.gl=e,this.version=r,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,r,t,o){let i=this.gl,a=i.createTexture();i.bindTexture(i.TEXTURE_2D,a),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);let s=o?t.encode(o,e*r):null;return i.texImage2D(i.TEXTURE_2D,0,t.internalFormat,e,r,0,t.format,t.textureType,s),this.checkError(),a}updateTexture(e,r,t,o,i){let a=this.gl;a.bindTexture(a.TEXTURE_2D,e);let s=o.encode(i,r*t);a.texSubImage2D(a.TEXTURE_2D,0,0,0,r,t,o.format,o.textureType,s),this.checkError()}attachFramebuffer(e,r,t){let o=this.gl;o.bindTexture(o.TEXTURE_2D,e),o.bindFramebuffer(o.FRAMEBUFFER,this.framebuffer),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0),this.checkError(),o.viewport(0,0,r,t),o.scissor(0,0,r,t)}readTexture(e,r,t,o,i,a){let s=this.gl;a||(a=1),this.frameBufferBound||this.attachFramebuffer(e,r,t);let u=this.getEncoder(i,a),l=u.allocate(r*t);return s.bindTexture(s.TEXTURE_2D,e),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,e,0),s.readPixels(0,0,r,t,s.RGBA,u.textureType,l),this.checkError(),u.decode(l,o)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,r){let t=this.gl;t.vertexAttribPointer(e,3,t.FLOAT,!1,20,0),t.enableVertexAttribArray(e),r!==-1&&(t.vertexAttribPointer(r,2,t.FLOAT,!1,20,12),t.enableVertexAttribArray(r)),this.checkError()}createProgram(e,r){let t=this.gl,o=t.createProgram();return t.attachShader(o,e),t.attachShader(o,r),t.linkProgram(o),o}compileShader(e,r){let t=this.gl,o=t.createShader(r);if(!o)throw new Error(`createShader() returned null with type ${r}`);if(t.shaderSource(o,e),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)===!1)throw new Error(`Failed to compile shader: ${t.getShaderInfoLog(o)}
Shader source:
${e}`);return o}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,r,t){let o=this.gl;o.activeTexture(o.TEXTURE0+r),this.checkError(),o.bindTexture(o.TEXTURE_2D,e),this.checkError(),o.uniform1i(t,r),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(ge.debug){let e=this.gl,r=e.getError(),t="";switch(r){case e.NO_ERROR:return;case e.INVALID_ENUM:t="INVALID_ENUM";break;case e.INVALID_VALUE:t="INVALID_VALUE";break;case e.INVALID_OPERATION:t="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:t="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:t="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:t="CONTEXT_LOST_WEBGL";break;default:t=`Unknown WebGL Error: ${r.toString(16)}`}throw new Error(t)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,r,t=0){if(this.version===2)return new zi(this.gl,r);switch(e){case"float":return t===1||this.isRenderFloat32Supported?new Co(this.gl,r):new Co(this.gl,r,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw new Error("not implemented");case"byte":return new Mi(this.gl,r);default:throw new Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let r=0;r<this.maxTextureImageUnits;++r)e.activeTexture(e.TEXTURE0+r),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,r=e.createBuffer();if(!r)throw new Error("createBuffer() returned null");let t=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),this.checkError(),r}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw new Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),this.version===1&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw new Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){this.version===2?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r);let t=this.version===2?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,t,1,1,0,e.RGBA,e.FLOAT,null);let o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(r),e.deleteFramebuffer(o),i}checkRenderFloat32(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e=this.gl,r,t,o,i,a;try{r=e.createTexture(),t=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,r);let s=this.version===2?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,s,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),e.enable(e.BLEND),o=e.createShader(e.VERTEX_SHADER),!o||(e.shaderSource(o,"void main(){}"),e.compileShader(o),i=e.createShader(e.FRAGMENT_SHADER),!i)||(e.shaderSource(i,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(i),a=e.createProgram(),!a)?!1:(e.attachShader(a,o),e.attachShader(a,i),e.linkProgram(a),e.useProgram(a),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),a&&e.deleteProgram(a),o&&e.deleteShader(o),i&&e.deleteShader(i),t&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(t)),r&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(r))}}beginTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,r=this.disjointTimerQueryWebgl2Extension,t=e.createQuery();return e.beginQuery(r.TIME_ELAPSED_EXT,t),t}else throw new Error("WebGL1 profiling currently not supported.")}endTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,r=this.disjointTimerQueryWebgl2Extension;e.endQuery(r.TIME_ELAPSED_EXT);return}else throw new Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let r=!1,t=!1;if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let o=this.gl,i=this.disjointTimerQueryWebgl2Extension;r=o.getQueryParameter(e,o.QUERY_RESULT_AVAILABLE),t=o.getParameter(i.GPU_DISJOINT_EXT)}else throw new Error("WebGL1 profiling currently not supported");return r&&!t}getTimerResult(e){let r=0;if(this.version===2){let t=this.gl;r=t.getQueryParameter(e,t.QUERY_RESULT),t.deleteQuery(e)}else throw new Error("WebGL1 profiling currently not supported");return r/1e6}async waitForQueryAndGetTime(e){return await _l(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let r,t=e,o=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),o===null?r=()=>!0:r=()=>{let i=t.clientWaitSync(o,0,0);return i===t.ALREADY_SIGNALED||i===t.CONDITION_SATISFIED},{query:o,isFencePassed:r}}async pollFence(e){return new Promise(r=>{this.addItemToPoll(()=>e.isFencePassed(),()=>r())})}pollItems(){let e=f3(this.itemsToPoll.map(r=>r.isDoneFn));for(let r=0;r<=e;++r){let{resolveFn:t}=this.itemsToPoll[r];t()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,r){this.itemsToPoll.push({isDoneFn:e,resolveFn:r}),!(this.itemsToPoll.length>1)&&await _l(()=>(this.pollItems(),this.itemsToPoll.length===0))}}});function Xl(n){let e;if((!n||n==="webgl2")&&"webgl2"in ao?e=ao.webgl2:(!n||n==="webgl")&&"webgl"in ao&&(e=ao.webgl),!e)try{let t=m3();e=qy(t,n)}catch{let o=h3();e=qy(o,n)}n=n||e.version===1?"webgl":"webgl2";let r=e.gl;return ao[n]=e,r.isContextLost()?(delete ao[n],Xl(n)):(r.disable(r.DEPTH_TEST),r.disable(r.STENCIL_TEST),r.disable(r.BLEND),r.disable(r.DITHER),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SAMPLE_COVERAGE),r.enable(r.SCISSOR_TEST),r.enable(r.CULL_FACE),r.cullFace(r.BACK),e)}function qy(n,e){let r={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1},t,o=r;if((!e||e==="webgl2")&&(t=n.getContext("webgl2",o),t))try{return new zo(t,2)}catch(i){Fe.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${i}`)}if((!e||e==="webgl")&&(t=n.getContext("webgl",o)||n.getContext("experimental-webgl",o),t))try{return new zo(t,1)}catch(i){Fe.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${i}`)}throw new Error("WebGL is not supported")}function h3(){if(typeof document>"u")throw new TypeError("failed to create canvas: document is not supported");let n=document.createElement("canvas");return n.width=1,n.height=1,n}function m3(){if(typeof OffscreenCanvas>"u")throw new TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var ao,jy=N(()=>{"use strict";kt();Hy();ao={}});var aa,Ky=N(()=>{"use strict";ft();kt();Wy();jy();aa=class{get contextId(){return ge.webgl.contextId}set contextId(e){ge.webgl.contextId=e}get matmulMaxBatchSize(){return ge.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){ge.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return ge.webgl.textureCacheMode}set textureCacheMode(e){ge.webgl.textureCacheMode=e}get pack(){return ge.webgl.pack}set pack(e){ge.webgl.pack=e}get async(){return ge.webgl.async}set async(e){ge.webgl.async=e}initialize(){try{return this.glContext=Xl(this.contextId),typeof this.matmulMaxBatchSize!="number"&&(this.matmulMaxBatchSize=16),typeof this.textureCacheMode!="string"&&(this.textureCacheMode="full"),typeof this.pack!="boolean"&&(this.pack=!1),typeof this.async!="boolean"&&(this.async=!1),Fe.setWithEnv(ge),ge.webgl.context||Object.defineProperty(ge.webgl,"context",{value:this.glContext.gl}),Fe.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return Fe.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new ia(this,e)}dispose(){this.glContext.dispose()}}});async function Zl(n){if(n){let e=typeof n=="string"?[n]:n;for(let r of e){let t=Xy.get(r);if(t)return t;let o=await b3(r);if(o)return o}}else return Zl(["webgl"]);throw new Error("no available backend to use")}async function b3(n){let e=g3;if(typeof e[n]<"u"&&y3(e[n])){let r=e[n],t=r.initialize();if(typeof t=="object"&&"then"in t&&(t=await t),t)return Xy.set(n,r),r}}function y3(n){let e=n;return"initialize"in e&&typeof e.initialize=="function"&&"createSessionHandler"in e&&typeof e.createSessionHandler=="function"&&"dispose"in e&&typeof e.dispose=="function"}var Xy,g3,Zy=N(()=>{"use strict";Ky();Xy=new Map,g3={webgl:new aa}});var Jl,sa,Jy=N(()=>{"use strict";kt();Jl=class{constructor(e,r){this.op=e;this.node=r}},sa=class{constructor(e,r,t){this.graph=e;this.profiler=t;this.initialize(r)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let r=this.graph.getNodes();if(r.length!==e.length)throw new Error("The size of nodes and OPs do not match.");this._ops=e.map((t,o)=>new Jl(t,r[o])),this.reset(),this._starter=[],this._ops.forEach((t,o)=>{let i=!0;for(let a of t.node.inputs)if(!this._values[a]&&this.graph.getInputIndices().indexOf(a)===-1){i=!1;break}i&&this._starter.push(o)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,r){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let t=e.createInferenceHandler(),o=this.graph.getInputIndices();if(r.length!==o.length)throw new Error(`number of input tensors don't match the number of inputs to the model: actual: ${r.length} expected: ${o.length}`);r.forEach((d,f)=>{let m=o[f];this._values[m]=d});let i=this._starter.slice(0),a=this.graph.getValues(),s=this.graph.getNodes(),u=0;for(;u<i.length;){let d=i[u++],f=this._ops[d],m=f.node.inputs.map(T=>this._values[T]);if(m.indexOf(void 0)!==-1)throw new Error(`unresolved input detected: op: ${f.node}`);let b=m;Fe.verbose("ExecPlan",`Running op:${f.node.name} (${b.map((T,w)=>`'${f.node.inputs[w]}': ${T.type}[${T.dims.join(",")}]`).join(", ")})`);let y=await this.profiler.event("node",f.node.name,async()=>f.op.impl(t,b,f.op.context));if(y.length!==f.node.outputs.length)throw new Error("the size of output does not match model definition.");y.forEach((T,w)=>{let x=f.node.outputs[w];if(this._values[x])throw new Error(`output [${x}] already has value: op:${f.node.name}`);this._values[x]=T});let _=new Set;y.forEach((T,w)=>{let x=f.node.outputs[w];for(let S of a[x].to){let A=s[S],P=!0;for(let C of A.inputs)if(!this._values[C]){P=!1;break}P&&_.add(S)}}),i.push(..._)}let l=[];for(let d=0;d<this.graph.getOutputIndices().length;d++){let f=this.graph.getOutputIndices()[d],m=this._values[f];if(m===void 0)throw new Error(`required output [${f}] does not have value`);f===0?await m.getData():m.data,l.push(m)}return Fe.verbose("ExecPlan","disposing of inferenceHandler"),t.dispose(),l})}}});var Ae,Mo,Yy=N(()=>{"use strict";So();Ae=Te(Yn());Dn();ze();Mo=class n{constructor(e){if(this._attributes=new Map,e!=null){for(let r of e)r instanceof Ae.onnx.AttributeProto?this._attributes.set(r.name,[n.getValue(r),n.getType(r)]):r instanceof Pi.Attribute&&this._attributes.set(r.name(),[n.getValue(r),n.getType(r)]);if(this._attributes.size<e.length)throw new Error("duplicated attribute names")}}set(e,r,t){this._attributes.set(e,[t,r])}delete(e){this._attributes.delete(e)}getFloat(e,r){return this.get(e,"float",r)}getInt(e,r){return this.get(e,"int",r)}getString(e,r){return this.get(e,"string",r)}getTensor(e,r){return this.get(e,"tensor",r)}getFloats(e,r){return this.get(e,"floats",r)}getInts(e,r){return this.get(e,"ints",r)}getStrings(e,r){return this.get(e,"strings",r)}getTensors(e,r){return this.get(e,"tensors",r)}get(e,r,t){let o=this._attributes.get(e);if(o===void 0){if(t!==void 0)return t;throw new Error(`required attribute not found: ${e}`)}if(o[1]!==r)throw new Error(`type mismatch: expected ${r} but got ${o[1]}`);return o[0]}static getType(e){let r=e instanceof Ae.onnx.AttributeProto?e.type:e.type();switch(r){case Ae.onnx.AttributeProto.AttributeType.FLOAT:return"float";case Ae.onnx.AttributeProto.AttributeType.INT:return"int";case Ae.onnx.AttributeProto.AttributeType.STRING:return"string";case Ae.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case Ae.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case Ae.onnx.AttributeProto.AttributeType.INTS:return"ints";case Ae.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case Ae.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw new Error(`attribute type is not supported yet: ${Ae.onnx.AttributeProto.AttributeType[r]}`)}}static getValue(e){let r=e instanceof Ae.onnx.AttributeProto?e.type:e.type();if(r===Ae.onnx.AttributeProto.AttributeType.GRAPH||r===Ae.onnx.AttributeProto.AttributeType.GRAPHS)throw new Error("graph attribute is not supported yet");let t=this.getValueNoCheck(e);if(r===Ae.onnx.AttributeProto.AttributeType.INT&&xt.isLong(t))return xt.longToNumber(t);if(r===Ae.onnx.AttributeProto.AttributeType.INTS){let o=t,i=new Array(o.length);for(let a=0;a<o.length;a++){let s=o[a];i[a]=xt.longToNumber(s)}return i}if(r===Ae.onnx.AttributeProto.AttributeType.TENSOR)return e instanceof Ae.onnx.AttributeProto?ot.fromProto(t):ot.fromOrtTensor(t);if(r===Ae.onnx.AttributeProto.AttributeType.TENSORS){if(e instanceof Ae.onnx.AttributeProto)return t.map(i=>ot.fromProto(i));if(e instanceof Pi.Attribute)return t.map(i=>ot.fromOrtTensor(i))}return r===Ae.onnx.AttributeProto.AttributeType.STRING&&e instanceof Ae.onnx.AttributeProto?Eo(t):r===Ae.onnx.AttributeProto.AttributeType.STRINGS&&e instanceof Ae.onnx.AttributeProto?t.map(Eo):t}static getValueNoCheck(e){return e instanceof Ae.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(e):this.getValueNoCheckFromOrtFormat(e)}static getValueNoCheckFromOnnxFormat(e){switch(e.type){case Ae.onnx.AttributeProto.AttributeType.FLOAT:return e.f;case Ae.onnx.AttributeProto.AttributeType.INT:return e.i;case Ae.onnx.AttributeProto.AttributeType.STRING:return e.s;case Ae.onnx.AttributeProto.AttributeType.TENSOR:return e.t;case Ae.onnx.AttributeProto.AttributeType.GRAPH:return e.g;case Ae.onnx.AttributeProto.AttributeType.FLOATS:return e.floats;case Ae.onnx.AttributeProto.AttributeType.INTS:return e.ints;case Ae.onnx.AttributeProto.AttributeType.STRINGS:return e.strings;case Ae.onnx.AttributeProto.AttributeType.TENSORS:return e.tensors;case Ae.onnx.AttributeProto.AttributeType.GRAPHS:return e.graphs;default:throw new Error(`unsupported attribute type: ${Ae.onnx.AttributeProto.AttributeType[e.type]}`)}}static getValueNoCheckFromOrtFormat(e){switch(e.type()){case zt.AttributeType.FLOAT:return e.f();case zt.AttributeType.INT:return e.i();case zt.AttributeType.STRING:return e.s();case zt.AttributeType.TENSOR:return e.t();case zt.AttributeType.GRAPH:return e.g();case zt.AttributeType.FLOATS:return e.floatsArray();case zt.AttributeType.INTS:{let r=[];for(let t=0;t<e.intsLength();t++)r.push(e.ints(t));return r}case zt.AttributeType.STRINGS:{let r=[];for(let t=0;t<e.stringsLength();t++)r.push(e.strings(t));return r}case zt.AttributeType.TENSORS:{let r=[];for(let t=0;t<e.tensorsLength();t++)r.push(e.tensors(t));return r}default:throw new Error(`unsupported attribute type: ${zt.AttributeType[e.type()]}`)}}}});var Ql,ec,Mr,ua,Yl,Qy=N(()=>{"use strict";Yy();So();Ql=Te(Yn());Dn();ze();ec={from:(n,e)=>new Yl(n,e)},Mr=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=pt.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},ua=class{constructor(e,r){e instanceof Ql.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new Mo(e.attribute)):e instanceof tl.Node&&(this.name=r??e.name(),this.opType=e.opType(),this.attributes=new Mo(pt.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},Yl=class{constructor(e,r){if(!e)throw new TypeError("graph is empty");this.buildGraph(e),this.transformGraph(r),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof Ql.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof Qu.Graph)this.buildGraphFromOrtFormat(e);else throw new TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let r=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map;if(!e.input)throw new Error("missing information in graph: input");let o=[];for(let i of e.input){if(r.has(i.name))throw new Error(`duplicated input name: ${i.name}`);let a=this._allData.push(new Mr(i))-1;r.set(i.name,a),o.push(i.name)}if(!e.initializer)throw new Error("missing information in graph: initializer");for(let i of e.initializer){let a=r.get(i.name);if(a===void 0){let s=new Mr;s.type={shape:{dims:pt.tensorDimsFromProto(i.dims)},tensorType:pt.tensorDataTypeFromProto(i.dataType)},a=this._allData.push(s)-1,r.set(i.name,a)}this._allData[a]._from=-1,this._allData[a].tensor=ot.fromProto(i)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));if(!e.output)throw new Error("missing information in graph: output");for(let i of e.output){if(r.has(i.name))throw new Error(`duplicated output name: ${i.name}`);let a=this._allData.push(new Mr(i))-1;r.set(i.name,a),this._allOutputIndices.push(a),this._allOutputNames.push(i.name)}if(!e.node)throw new Error("missing information in graph: node");for(let i of e.node){if(!i.name)for(let s=0;;s++){let u=`unnamed_${i.opType}_${s}`;if(!t.has(u)){i.name=u;break}}if(t.has(i.name))throw new Error(`duplicated node name: ${i.name}`);let a=this._nodes.push(new ua(i))-1;t.set(i.name,a)}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.node[i];if(!s.output)throw new Error(`missing output for node: ${s.name}`);for(let u of s.output){let l=r.get(u);if(typeof l>"u"&&(l=this._allData.push(new Mr)-1,r.set(u,l)),a.outputs.push(l),this._allData[l]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${l}`);if(this._allData[l]._from=i,s.opType==="Constant"){if(!s.attribute||s.attribute.length!==1||!s.attribute[0].t)throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!s.output||s.output.length!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");a.outputs.pop(),a.executeNode=!1,this._allData[l]._from=-1,this._allData[l].tensor=ot.fromProto(s.attribute[0].t)}}}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.node[i];if(!s.input)throw new Error(`missing input for node: ${s.name}`);for(let u of s.input){let l=r.get(u);if(typeof l>"u"){if(u===""&&(s.input.length===3||s.input.length===4)&&s.opType==="Resize")continue;throw new Error(`unrecognized input '${u}' for node: ${s.name}`)}a.inputs.push(l),this._allData[l]._to.push(i)}}return!0}buildGraphFromOrtFormat(e){let r=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map,o=[];for(let i=0;i<e.inputsLength();i++){let a=e.inputs(i);if(r.has(a))throw new Error(`duplicated input name: ${a}`);for(let s=0;s<e.nodeArgsLength();s++)if(e.nodeArgs(s)?.name()===a){let u=new Mr;if(e.nodeArgs(s)?.type()?.valueType()!==nl.TypeInfoValue.tensor_type)throw new Error("Unexpected value type for the nodeArg.");let d=e.nodeArgs(s).type().value(new rl.TensorTypeAndShape),f=pt.tensorDataTypeFromProto(d.elemType()),m=d.shape(),b=[];for(let _=0;_<m.dimLength();_++)b.push(xt.longToNumber(m.dim(_).value().dimValue()));u.type={shape:{dims:b},tensorType:f};let y=this._allData.push(u)-1;r.set(a,y),o.push(a)}}for(let i=0;i<e.initializersLength();i++){let a=e.initializers(i),s=r.get(a.name());if(s===void 0){let u=new Mr,l=pt.tensorDimsFromORTFormat(a),d=pt.tensorDataTypeFromProto(a.dataType());u.type={shape:{dims:l},tensorType:d},s=this._allData.push(u)-1,r.set(a.name(),s)}this._allData[s]._from=-1,this._allData[s].tensor=ot.fromOrtTensor(a)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));for(let i=0;i<e.outputsLength();i++){let a=e.outputs(i);if(r.has(a))throw new Error(`duplicated output name: ${a}`);let s=this._allData.push(new Mr)-1;r.set(a,s),this._allOutputIndices.push(s),this._allOutputNames.push(a)}if(!e.nodes)throw new Error("missing information in graph: node");for(let i=0;i<e.nodesLength();i++){let a=e.nodes(i),s=a.name();if(!s)for(let l=0;s=`unnamed_${a.opType()}_${l}`,!!t.has(s);l++);if(t.has(s))throw new Error(`duplicated node name: ${s}`);let u=this._nodes.push(new ua(a,s))-1;t.set(s,u)}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.nodes(i);if(s==null)throw new Error(`No node exists at index ${i}`);if(s?.outputsLength()===0)throw new Error(`missing output for node: ${s.name}`);for(let u=0;u<s?.outputsLength();u++){let l=s?.outputs(u),d=r.get(l);if(typeof d>"u"&&(d=this._allData.push(new Mr)-1,r.set(l,d)),a.outputs.push(d),this._allData[d]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${d}`);if(this._allData[d]._from=i,s.opType()==="Constant"){if(s.attributesLength()!==1||!s.attributes(0).t())throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(s.outputsLength()!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");a.outputs.pop(),a.executeNode=!1,this._allData[d]._from=-1,this._allData[d].tensor=ot.fromOrtTensor(s.attributes(0).t())}}}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.nodes(i);if(s.inputsLength()===0)throw new Error(`missing input for node: ${s.name}`);for(let u=0;u<s.inputsLength();u++){let l=s.inputs(u),d=r.get(l);if(typeof d>"u")throw new Error(`unrecognized input '${l}' for node: ${s.name()}`);a.inputs.push(d),this._allData[d]._to.push(i)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(o=>{this._allData[o]._to.forEach(a=>{e.add(a)})});let r=Array.from(e),t=new Array(this._nodes.length).fill("white");for(;r.length>0;){let o=r.pop();t[o]==="gray"?t[o]="black":(r.push(o),t[o]="gray",this._nodes[o].outputs.forEach(i=>{let a=this._allData[i];if(typeof a.tensor<"u")throw new Error("node outputs should not be initialized");if(a._from!==o)throw new Error("from property of the Value object doesn't match index of Node being processed");a._to.forEach(s=>{if(t[s]==="gray")throw new Error("model graph is cyclic");t[s]==="white"&&r.push(s)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,r=new Array(this._nodes.length,0),t=0;for(let o=0;o<this._nodes.length;o++)r[o]=t,this._nodes[o].executeNode?(t!==o&&(this._nodes[t]=this._nodes[o]),t++):this._nodes[o].outputs.forEach(i=>{this._allData[i]._from=-2});this._nodes.splice(t,this._nodes.length-t);for(let o=0;o<this._allData.length;o++){let i=this._allData[o];i._from!==void 0&&i._from!==-1&&i._from!==-2&&(i._from=r[i._from]);for(let a=0;a<i._to.length;a++)if(i._to[a]>=0)i._to[a]=r[i._to[a]];else throw new Error("Trying to update a removed node")}e=0;for(let o=0;o<this._allData.length;o++){if(this._allData[o].from===-2&&this._allOutputIndices.indexOf(o+e)===-1){e++,this._allData.splice(o,1),o--;continue}if(e>0){let i=-1;this._allData[o].from!==void 0&&this._allData[o].from!==-1?(i=this._nodes[this._allData[o].from].outputs.indexOf(o+e),i!==-1&&(this._nodes[this._allData[o].from].outputs[i]=o)):(i=this._allInputIndices.indexOf(o+e),i!==-1&&(this._allInputIndices[i]=o)),this._allData[o].to.forEach(a=>{i=this._nodes[a].inputs.indexOf(o+e),i!==-1&&(this._nodes[a].inputs[i]=o)}),this._allData[o].to.length===0&&(i=this._allOutputIndices.indexOf(o+e),i!==-1&&(this._allOutputIndices[i]=o))}}}deleteNode(e){let r=this._nodes[e];if(r.outputs.length>1){for(let s=1;s<r.outputs.length;s++)if(this._allData[r.outputs[s]].to.length>0)throw new Error("Node deletion with more than one output connected to other nodes is not supported. ")}r.executeNode=!1;let t=r.inputs[0],o=r.outputs[0],i=this._allData[o].to;for(let s=0;s<r.inputs.length;s++){let u=this._allData[r.inputs[s]].to.indexOf(e);if(u===-1)throw new Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[r.inputs[s]].to.splice(u,1)}this._allData[o]._to=[];let a=this._allOutputIndices.indexOf(o);if(a!==-1&&(this._allOutputIndices[a]=t),i&&i.length>0)for(let s of i){let u=this._nodes[s].inputs.indexOf(o);if(u===-1)throw new Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[s].inputs[u]=t,this._allData[t].to.push(s)}}removeAllDropoutNodes(){let e=0;for(let r of this._nodes){if(r.opType==="Dropout"){if(r.inputs.length!==1)throw new Error("Dropout nodes should only contain one input. ");if(r.outputs.length!==1&&r.outputs.length!==2)throw new Error("Dropout nodes should contain either 1 or 2 output(s)");if(r.outputs.length===2&&this._allData[r.outputs[1]]._to.length!==0)throw new Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let r of this._nodes)r.opType==="Identity"&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if(e.opType==="Conv"){let r=this._allData[e.outputs[0]]._to;if(r.length===1&&this.isActivation(this._nodes[r[0]])){let t=this._nodes[r[0]];if(t.opType==="Clip")if(t.inputs.length===1)try{e.attributes.set("activation_params","floats",[t.attributes.getFloat("min"),t.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[En,Cn])}else if(t.inputs.length>=3&&this._allData[t.inputs[1]].tensor!==void 0&&this._allData[t.inputs[2]].tensor!==void 0)e.attributes.set("activation_params","floats",[this._allData[t.inputs[1]].tensor.floatData[0],this._allData[t.inputs[2]].tensor.floatData[0]]);else continue;e.attributes.set("activation","string",t.opType),this.deleteNode(r[0])}}}}});var e_,t_,la,r_=N(()=>{"use strict";e_=Te(Re());Qy();So();t_=Te(Yn());ze();la=class{constructor(){}load(e,r,t){let o;if(!t)try{this.loadFromOnnxFormat(e,r);return}catch(i){if(t!==void 0)throw i;o=i}try{this.loadFromOrtFormat(e,r)}catch(i){throw t!==void 0?i:new Error(`Failed to load model as ONNX format: ${o}
as ORT format: ${i}`)}}loadFromOnnxFormat(e,r){let t=t_.onnx.ModelProto.decode(e);if(xt.longToNumber(t.irVersion)<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=t.opsetImport.map(i=>({domain:i.domain,version:xt.longToNumber(i.version)})),this._graph=ec.from(t.graph,r)}loadFromOrtFormat(e,r){let t=new e_.ByteBuffer(e),o=el.InferenceSession.getRootAsInferenceSession(t).model();if(xt.longToNumber(o.irVersion())<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let a=0;a<o.opsetImportLength();a++){let s=o.opsetImport(a);this._opsets.push({domain:s?.domain(),version:xt.longToNumber(s.version())})}this._graph=ec.from(o.graph(),r)}get graph(){return this._graph}get opsets(){return this._opsets}}});var ca,n_=N(()=>{"use strict";Zy();Jy();kt();r_();ca=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=mi.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,r,t){await this.profiler.event("session","Session.loadModel",async()=>{let o=await Zl(this.backendHint);if(this.sessionHandler=o.createSessionHandler(this.context),this._model=new la,typeof e=="string"){let i=e.endsWith(".ort");{let s=await(await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(s),i)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let i=new Uint8Array(e,r||0,t||e.byteLength);this.initialize(i)}})}initialize(e,r){if(this._initialized)throw new Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let t=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,t,r),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new sa(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw new Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let r=this.normalizeAndValidateInputs(e),t=await this._executionPlan.execute(this.sessionHandler,r);return this.createOutput(t)})}normalizeAndValidateInputs(e){let r=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==r.length)throw new Error(`incorrect input array length: expected ${r.length} but got ${e.length}`)}else{if(e.size!==r.length)throw new Error(`incorrect input map size: expected ${r.length} but got ${e.size}`);let t=new Array(e.size),o=0;for(let i=0;i<r.length;++i){let a=e.get(r[i]);if(!a)throw new Error(`missing input tensor for: '${name}'`);t[o++]=a}e=t}if(!this.context.graphInputTypes||this.context.graphInputTypes.length===0||!this.context.graphInputDims||this.context.graphInputDims.length===0){let t=this._model.graph.getInputIndices(),o=this._model.graph.getValues(),i=new Array(t.length);for(let a=0;a<t.length;++a){let s=o[t[a]];i[a]=s.type.shape.dims,this.context.graphInputTypes.push(s.type.tensorType),this.context.graphInputDims.push(e[a].dims)}this.validateInputTensorDims(i,e,!0)}else this.validateInputTensorDims(this.context.graphInputDims,e,!1);return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,r){for(let t=0;t<r.length;t++){let o=e[t],i=r[t].type;if(o!==i)throw new Error(`input tensor[${t}] check failed: expected type '${o}' but got ${i}`)}}validateInputTensorDims(e,r,t){for(let o=0;o<r.length;o++){let i=e[o],a=r[o].dims;if(!this.compareTensorDims(i,a,t))throw new Error(`input tensor[${o}] check failed: expected shape '[${i.join(",")}]' but got [${a.join(",")}]`)}}compareTensorDims(e,r,t){if(e.length!==r.length)return!1;for(let o=0;o<e.length;++o)if(e[o]!==r[o]&&(!t||e[o]!==0))return!1;return!0}createOutput(e){let r=this._model.graph.getOutputNames();if(e.length!==r.length)throw new Error("expected number of outputs do not match number of generated outputs");let t=new Map;for(let o=0;o<r.length;++o)t.set(r[o],e[o]);return t}initializeOps(e){let r=e.getNodes();this._ops=new Array(r.length);for(let t=0;t<r.length;t++)this._ops[t]=this.sessionHandler.resolve(r[t],this._model.opsets,e)}}});var da,o_=N(()=>{"use strict";ft();Dn();da=class{constructor(e){this.session=e;this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}get inputMetadata(){throw new Error("Getting model metadata is not supported in webgl backend.")}get outputMetadata(){throw new Error("Getting model metadata is not supported in webgl backend.")}async dispose(){}async run(e,r,t){let o=new Map;for(let s in e)if(Object.hasOwnProperty.call(e,s)){let u=e[s];o.set(s,new ot(u.dims,u.type,void 0,void 0,u.data))}let i=await this.session.run(o),a={};return i.forEach((s,u)=>{a[u]=new $t(s.type,s.data,s.dims)}),a}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}});var i_={};wn(i_,{onnxjsBackend:()=>_3});var tc,_3,a_=N(()=>{"use strict";n_();o_();tc=class{async init(){}async createInferenceSessionHandler(e,r){let t=new ca(r);return typeof e=="string"?await t.loadModel(e):await t.loadModel(e),new da(t)}},_3=new tc});var pa=N(()=>{"use strict"});var l_={};wn(l_,{default:()=>v3});var s_,u_,v3,c_=N(()=>{"use strict";rc();mn();fa();s_="ort-wasm-proxy-worker",u_=globalThis.self?.name===s_;u_&&(self.onmessage=n=>{let{type:e,in:r}=n.data;try{switch(e){case"init-wasm":ha(r.wasm).then(()=>{ma(r).then(()=>{postMessage({type:e})},t=>{postMessage({type:e,err:t})})},t=>{postMessage({type:e,err:t})});break;case"init-ep":{let{epName:t,env:o}=r;ga(o,t).then(()=>{postMessage({type:e})},i=>{postMessage({type:e,err:i})});break}case"copy-from":{let{buffer:t}=r,o=Bo(t);postMessage({type:e,out:o});break}case"create":{let{model:t,options:o}=r;ba(t,o).then(i=>{postMessage({type:e,out:i})},i=>{postMessage({type:e,err:i})});break}case"release":ya(r),postMessage({type:e});break;case"run":{let{sessionId:t,inputIndices:o,inputs:i,outputIndices:a,options:s}=r;_a(t,o,i,a,new Array(a.length).fill(null),s).then(u=>{u.some(l=>l[3]!=="cpu")?postMessage({type:e,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:e,out:u},wa([...i,...u]))},u=>{postMessage({type:e,err:u})});break}case"end-profiling":va(r),postMessage({type:e});break;default:}}catch(t){postMessage({type:e,err:t})}});v3=u_?null:n=>new Worker(n??Pt,{type:"module",name:s_})});var p_={};wn(p_,{default:()=>w3});var nc,d_,w3,x3,f_=N(()=>{"use strict";d_=(nc=import.meta.url,async function(n={}){var e,r,t=n,o=new Promise((c,p)=>{e=c,r=p}),i=typeof window=="object",a=typeof WorkerGlobalScope<"u",s=a&&self.name?.startsWith("em-pthread");t.mountExternalData=(c,p)=>{c.startsWith("./")&&(c=c.substring(2)),(t.Bd||(t.Bd=new Map)).set(c,p)},t.unmountExternalData=()=>{delete t.Bd};var u=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,le:!0}).buffer.constructor;let l=c=>async(...p)=>{try{if(t.Cd)throw Error("Session already started");let h=t.Cd={ae:p[0],errors:[]},g=await c(...p);if(t.Cd!==h)throw Error("Session mismatch");t.Gd?.flush();let v=h.errors;if(0<v.length){let I=await Promise.all(v);if(I=I.filter(O=>O),0<I.length)throw Error(I.join(`
`))}return g}finally{t.Cd=null}};t.jsepInit=(c,p)=>{if(c==="webgpu"){[t.Gd,t.Rd,t.Vd,t.Hd,t.Ud,t.vd,t.Wd,t.Yd,t.Sd,t.Td,t.Xd]=p;let h=t.Gd;t.jsepRegisterBuffer=(g,v,I,O)=>h.registerBuffer(g,v,I,O),t.jsepGetBuffer=g=>h.getBuffer(g),t.jsepCreateDownloader=(g,v,I)=>h.createDownloader(g,v,I),t.jsepOnCreateSession=g=>{h.onCreateSession(g)},t.jsepOnReleaseSession=g=>{h.onReleaseSession(g)},t.jsepOnRunStart=g=>h.onRunStart(g),t.Zd=(g,v)=>{h.upload(g,v)}}else if(c==="webnn"){let h=p[0];[t.je,t.Kd,t.webnnEnsureTensor,t.Ld,t.webnnDownloadTensor]=p.slice(1),t.webnnReleaseTensorId=t.Kd,t.webnnUploadTensor=t.Ld,t.webnnOnRunStart=g=>h.onRunStart(g),t.webnnOnRunEnd=h.onRunEnd.bind(h),t.webnnRegisterMLContext=(g,v)=>{h.registerMLContext(g,v)},t.webnnOnReleaseSession=g=>{h.onReleaseSession(g)},t.webnnCreateMLTensorDownloader=(g,v)=>h.createMLTensorDownloader(g,v),t.webnnRegisterMLTensor=(g,v,I,O)=>h.registerMLTensor(g,v,I,O),t.webnnCreateMLContext=g=>h.createMLContext(g),t.webnnRegisterMLConstant=(g,v,I,O,z,B)=>h.registerMLConstant(g,v,I,O,z,t.Bd,B),t.webnnRegisterGraphInput=h.registerGraphInput.bind(h),t.webnnIsGraphInput=h.isGraphInput.bind(h),t.webnnCreateTemporaryTensor=h.createTemporaryTensor.bind(h),t.webnnIsInt64Supported=h.isInt64Supported.bind(h)}};let d=()=>{let c=(p,h,g)=>(...v)=>{let I=er,O=h?.();v=p(...v);let z=h?.();return O!==z&&(p=z,g(O),h=g=null),er!=I?new Promise((B,U)=>{_s={resolve:B,reject:U}}):v};(()=>{for(let p of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[p]=c(t[p],()=>t[p],h=>t[p]=h)})(),l!==void 0&&(t._OrtRun=l(t._OrtRun),t._OrtRunWithBinding=l(t._OrtRunWithBinding)),d=void 0};t.asyncInit=()=>{d?.()};var f,m,b=Object.assign({},t),y=(c,p)=>{throw p},_="";(i||a)&&(a?_=self.location.href:typeof document<"u"&&document.currentScript&&(_=document.currentScript.src),nc&&(_=nc),_=_.startsWith("blob:")?"":_.slice(0,_.replace(/[?#].*/,"").lastIndexOf("/")+1),a&&(m=c=>{var p=new XMLHttpRequest;return p.open("GET",c,!1),p.responseType="arraybuffer",p.send(null),new Uint8Array(p.response)}),f=async c=>{if(ue(c))return new Promise((h,g)=>{var v=new XMLHttpRequest;v.open("GET",c,!0),v.responseType="arraybuffer",v.onload=()=>{v.status==200||v.status==0&&v.response?h(v.response):g(v.status)},v.onerror=g,v.send(null)});var p=await fetch(c,{credentials:"same-origin"});if(p.ok)return p.arrayBuffer();throw Error(p.status+" : "+p.url)});var T=console.log.bind(console),w=console.error.bind(console),x=T,S=w;Object.assign(t,b),b=null;var A,P,C,L,M,F,X,ee,ie,j,oe,Ue,J,te=t.wasmBinary,pe=!1,ue=c=>c.startsWith("file://");function Se(){return A.buffer!=L.buffer&&at(),L}function Be(){return A.buffer!=L.buffer&&at(),M}function Ge(){return A.buffer!=L.buffer&&at(),F}function fe(){return A.buffer!=L.buffer&&at(),X}function D(){return A.buffer!=L.buffer&&at(),ee}function q(){return A.buffer!=L.buffer&&at(),ie}function Pe(){return A.buffer!=L.buffer&&at(),j}function mt(){return A.buffer!=L.buffer&&at(),J}if(s){let c=function(p){try{var h=p.data,g=h.yd;if(g==="load"){let v=[];self.onmessage=I=>v.push(I),self.startWorker=()=>{postMessage({yd:"loaded"});for(let I of v)c(I);self.onmessage=c};for(let I of h.Od)t[I]&&!t[I].proxy||(t[I]=(...O)=>{postMessage({yd:"callHandler",Nd:I,args:O})},I=="print"&&(x=t[I]),I=="printErr"&&(S=t[I]));A=h.ge,at(),Ke(h.he)}else if(g==="run"){oT(h.xd),Ts(h.xd,0,0,1,0,0),ed(),bs(h.xd),Xe||(Kd(),Xe=!0);try{iT(h.ce,h.Ed)}catch(v){if(v!="unwind")throw v}}else h.target!=="setimmediate"&&(g==="checkMailbox"?Xe&&Zo():g&&(S(`worker: received unknown command ${g}`),S(h)))}catch(v){throw Xd(),v}};var KD=c,Ke,Xe=!1;S=function(...p){p=p.join(" "),console.error(p)},self.alert=function(...p){postMessage({yd:"alert",text:p.join(" "),ee:oi()})},self.onunhandledrejection=p=>{throw p.reason||p},self.onmessage=c}function at(){var c=A.buffer;t.HEAP8=L=new Int8Array(c),t.HEAP16=F=new Int16Array(c),t.HEAPU8=M=new Uint8Array(c),t.HEAPU16=X=new Uint16Array(c),t.HEAP32=ee=new Int32Array(c),t.HEAPU32=ie=new Uint32Array(c),t.HEAPF32=j=new Float32Array(c),t.HEAPF64=J=new Float64Array(c),t.HEAP64=oe=new BigInt64Array(c),t.HEAPU64=Ue=new BigUint64Array(c)}function _n(){s?startWorker(t):G.Bb()}s||(A=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),at());var Un,Wn=0,ho=null;function jc(){if(--Wn==0&&ho){var c=ho;ho=null,c()}}function jr(c){throw S(c="Aborted("+c+")"),pe=!0,c=new WebAssembly.RuntimeError(c+". Build with -sASSERTIONS for more info."),r(c),c}function Kc(){return{a:{Ta:nT,Va:rT,W:aT,la:sT,b:lT,u:cT,S:dT,Za:pT,d:fT,pb:od,g:uT,T:sd,Ga:ud,lb:cd,nb:dd,Ha:pd,Ea:fd,wb:hd,Da:md,pa:gd,mb:bd,jb:yd,Fa:_d,kb:vd,Ma:hT,za:gT,eb:bT,cb:_T,ya:wT,V:xT,N:TT,db:IT,ma:CT,fb:DT,zb:kT,hb:NT,qb:LT,ab:RT,Aa:zT,yb:bs,Ja:MT,Q:BT,Wa:FT,$:UT,H:WT,D:qT,l:hs,F:jT,A:ZT,X:JT,J:YT,v:QT,O:e2,E:t2,s:r2,B:n2,z:o2,w:i2,r:a2,tb:s2,ub:u2,vb:l2,rb:Nd,sb:Ld,bb:Rd,Oa:d2,La:h2,y:m2,ja:g2,Ba:b2,Ka:p2,qa:y2,Ia:_2,ib:v2,U:c2,fa:w2,Sa:x2,gb:T2,Qa:I2,Pa:S2,Ab:Fd,Ca:Vd,ob:us,aa:Gd,oa:Ud,xb:Wd,na:Hd,$a:Y2,ia:d1,sa:g1,ga:Z2,da:o1,ua:h1,p:K2,e:D2,c:E2,ea:r1,f:k2,n:L2,k:W2,Y:z2,ka:H2,j:X2,wa:t1,Ra:_1,ca:l1,Ua:y1,P:n1,K:B2,_:u1,R:J2,Z:p1,x:M2,m:C2,va:s1,i:P2,h:R2,ra:b1,ta:m1,o:N2,q:F2,t:G2,I:U2,C:j2,L:q2,xa:e1,_a:Q2,G:c1,Ya:i1,ba:f1,M:V2,Xa:a1,ha:A2,a:A,Na:ss}}}var os={1325506:()=>typeof wasmOffsetConverter<"u",1325563:(c,p,h,g,v)=>{if(t===void 0||!t.Bd)return 1;if((c=et(Number(c>>>0))).startsWith("./")&&(c=c.substring(2)),!(c=t.Bd.get(c)))return 2;if(p=Number(p>>>0),h=Number(h>>>0),g=Number(g>>>0),p+h>c.byteLength)return 3;try{let I=c.subarray(p,p+h);switch(v){case 0:Be().set(I,g>>>0);break;case 1:t.ie?t.ie(g,I):t.Zd(g,I);break;default:return 4}return 0}catch{return 4}},1326387:(c,p,h)=>{t.Ld(c,Be().subarray(p>>>0,p+h>>>0))},1326451:()=>t.je(),1326493:c=>{t.Kd(c)},1326530:()=>{t.Sd()},1326561:()=>{t.Td()},1326590:()=>{t.Xd()},1326615:c=>t.Rd(c),1326648:c=>t.Vd(c),1326680:(c,p,h)=>{t.Hd(Number(c),Number(p),Number(h),!0)},1326743:(c,p,h)=>{t.Hd(Number(c),Number(p),Number(h))},1326800:c=>{t.vd("Abs",c,void 0)},1326851:c=>{t.vd("Neg",c,void 0)},1326902:c=>{t.vd("Floor",c,void 0)},1326955:c=>{t.vd("Ceil",c,void 0)},1327007:c=>{t.vd("Reciprocal",c,void 0)},1327065:c=>{t.vd("Sqrt",c,void 0)},1327117:c=>{t.vd("Exp",c,void 0)},1327168:c=>{t.vd("Erf",c,void 0)},1327219:c=>{t.vd("Sigmoid",c,void 0)},1327274:(c,p,h)=>{t.vd("HardSigmoid",c,{alpha:p,beta:h})},1327353:c=>{t.vd("Log",c,void 0)},1327404:c=>{t.vd("Sin",c,void 0)},1327455:c=>{t.vd("Cos",c,void 0)},1327506:c=>{t.vd("Tan",c,void 0)},1327557:c=>{t.vd("Asin",c,void 0)},1327609:c=>{t.vd("Acos",c,void 0)},1327661:c=>{t.vd("Atan",c,void 0)},1327713:c=>{t.vd("Sinh",c,void 0)},1327765:c=>{t.vd("Cosh",c,void 0)},1327817:c=>{t.vd("Asinh",c,void 0)},1327870:c=>{t.vd("Acosh",c,void 0)},1327923:c=>{t.vd("Atanh",c,void 0)},1327976:c=>{t.vd("Tanh",c,void 0)},1328028:c=>{t.vd("Not",c,void 0)},1328079:(c,p,h)=>{t.vd("Clip",c,{min:p,max:h})},1328148:c=>{t.vd("Clip",c,void 0)},1328200:(c,p)=>{t.vd("Elu",c,{alpha:p})},1328258:c=>{t.vd("Gelu",c,void 0)},1328310:c=>{t.vd("Relu",c,void 0)},1328362:(c,p)=>{t.vd("LeakyRelu",c,{alpha:p})},1328426:(c,p)=>{t.vd("ThresholdedRelu",c,{alpha:p})},1328496:(c,p)=>{t.vd("Cast",c,{to:p})},1328554:c=>{t.vd("Add",c,void 0)},1328605:c=>{t.vd("Sub",c,void 0)},1328656:c=>{t.vd("Mul",c,void 0)},1328707:c=>{t.vd("Div",c,void 0)},1328758:c=>{t.vd("Pow",c,void 0)},1328809:c=>{t.vd("Equal",c,void 0)},1328862:c=>{t.vd("Greater",c,void 0)},1328917:c=>{t.vd("GreaterOrEqual",c,void 0)},1328979:c=>{t.vd("Less",c,void 0)},1329031:c=>{t.vd("LessOrEqual",c,void 0)},1329090:(c,p,h,g,v)=>{t.vd("ReduceMean",c,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:g?Array.from(D().subarray(Number(g)>>>0,Number(v)>>>0)):[]})},1329265:(c,p,h,g,v)=>{t.vd("ReduceMax",c,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:g?Array.from(D().subarray(Number(g)>>>0,Number(v)>>>0)):[]})},1329439:(c,p,h,g,v)=>{t.vd("ReduceMin",c,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:g?Array.from(D().subarray(Number(g)>>>0,Number(v)>>>0)):[]})},1329613:(c,p,h,g,v)=>{t.vd("ReduceProd",c,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:g?Array.from(D().subarray(Number(g)>>>0,Number(v)>>>0)):[]})},1329788:(c,p,h,g,v)=>{t.vd("ReduceSum",c,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:g?Array.from(D().subarray(Number(g)>>>0,Number(v)>>>0)):[]})},1329962:(c,p,h,g,v)=>{t.vd("ReduceL1",c,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:g?Array.from(D().subarray(Number(g)>>>0,Number(v)>>>0)):[]})},1330135:(c,p,h,g,v)=>{t.vd("ReduceL2",c,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:g?Array.from(D().subarray(Number(g)>>>0,Number(v)>>>0)):[]})},1330308:(c,p,h,g,v)=>{t.vd("ReduceLogSum",c,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:g?Array.from(D().subarray(Number(g)>>>0,Number(v)>>>0)):[]})},1330485:(c,p,h,g,v)=>{t.vd("ReduceSumSquare",c,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:g?Array.from(D().subarray(Number(g)>>>0,Number(v)>>>0)):[]})},1330665:(c,p,h,g,v)=>{t.vd("ReduceLogSumExp",c,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:g?Array.from(D().subarray(Number(g)>>>0,Number(v)>>>0)):[]})},1330845:c=>{t.vd("Where",c,void 0)},1330898:(c,p,h)=>{t.vd("Transpose",c,{perm:p?Array.from(D().subarray(Number(p)>>>0,Number(h)>>>0)):[]})},1331022:(c,p,h,g)=>{t.vd("DepthToSpace",c,{blocksize:p,mode:et(h),format:g?"NHWC":"NCHW"})},1331155:(c,p,h,g)=>{t.vd("DepthToSpace",c,{blocksize:p,mode:et(h),format:g?"NHWC":"NCHW"})},1331288:(c,p,h,g,v,I,O,z,B,U,Y,ae,ve,We,Dt)=>{t.vd("ConvTranspose",c,{format:B?"NHWC":"NCHW",autoPad:p,dilations:[h],group:g,kernelShape:[v],pads:[I,O],strides:[z],wIsConst:()=>!!Se()[U>>>0],outputPadding:Y?Array.from(D().subarray(Number(Y)>>>0,Number(ae)>>>0)):[],outputShape:ve?Array.from(D().subarray(Number(ve)>>>0,Number(We)>>>0)):[],activation:et(Dt)})},1331721:(c,p,h,g,v,I,O,z,B,U,Y,ae,ve,We)=>{t.vd("ConvTranspose",c,{format:z?"NHWC":"NCHW",autoPad:p,dilations:Array.from(D().subarray(Number(h)>>>0,2+(Number(h)>>>0)>>>0)),group:g,kernelShape:Array.from(D().subarray(Number(v)>>>0,2+(Number(v)>>>0)>>>0)),pads:Array.from(D().subarray(Number(I)>>>0,4+(Number(I)>>>0)>>>0)),strides:Array.from(D().subarray(Number(O)>>>0,2+(Number(O)>>>0)>>>0)),wIsConst:()=>!!Se()[B>>>0],outputPadding:U?Array.from(D().subarray(Number(U)>>>0,Number(Y)>>>0)):[],outputShape:ae?Array.from(D().subarray(Number(ae)>>>0,Number(ve)>>>0)):[],activation:et(We)})},1332382:(c,p,h,g,v,I,O,z,B,U,Y,ae,ve,We,Dt)=>{t.vd("ConvTranspose",c,{format:B?"NHWC":"NCHW",autoPad:p,dilations:[h],group:g,kernelShape:[v],pads:[I,O],strides:[z],wIsConst:()=>!!Se()[U>>>0],outputPadding:Y?Array.from(D().subarray(Number(Y)>>>0,Number(ae)>>>0)):[],outputShape:ve?Array.from(D().subarray(Number(ve)>>>0,Number(We)>>>0)):[],activation:et(Dt)})},1332815:(c,p,h,g,v,I,O,z,B,U,Y,ae,ve,We)=>{t.vd("ConvTranspose",c,{format:z?"NHWC":"NCHW",autoPad:p,dilations:Array.from(D().subarray(Number(h)>>>0,2+(Number(h)>>>0)>>>0)),group:g,kernelShape:Array.from(D().subarray(Number(v)>>>0,2+(Number(v)>>>0)>>>0)),pads:Array.from(D().subarray(Number(I)>>>0,4+(Number(I)>>>0)>>>0)),strides:Array.from(D().subarray(Number(O)>>>0,2+(Number(O)>>>0)>>>0)),wIsConst:()=>!!Se()[B>>>0],outputPadding:U?Array.from(D().subarray(Number(U)>>>0,Number(Y)>>>0)):[],outputShape:ae?Array.from(D().subarray(Number(ae)>>>0,Number(ve)>>>0)):[],activation:et(We)})},1333476:(c,p)=>{t.vd("GlobalAveragePool",c,{format:p?"NHWC":"NCHW"})},1333567:(c,p,h,g,v,I,O,z,B,U,Y,ae,ve,We)=>{t.vd("AveragePool",c,{format:We?"NHWC":"NCHW",auto_pad:p,ceil_mode:h,count_include_pad:g,storage_order:v,dilations:I?Array.from(D().subarray(Number(I)>>>0,Number(O)>>>0)):[],kernel_shape:z?Array.from(D().subarray(Number(z)>>>0,Number(B)>>>0)):[],pads:U?Array.from(D().subarray(Number(U)>>>0,Number(Y)>>>0)):[],strides:ae?Array.from(D().subarray(Number(ae)>>>0,Number(ve)>>>0)):[]})},1334046:(c,p)=>{t.vd("GlobalAveragePool",c,{format:p?"NHWC":"NCHW"})},1334137:(c,p,h,g,v,I,O,z,B,U,Y,ae,ve,We)=>{t.vd("AveragePool",c,{format:We?"NHWC":"NCHW",auto_pad:p,ceil_mode:h,count_include_pad:g,storage_order:v,dilations:I?Array.from(D().subarray(Number(I)>>>0,Number(O)>>>0)):[],kernel_shape:z?Array.from(D().subarray(Number(z)>>>0,Number(B)>>>0)):[],pads:U?Array.from(D().subarray(Number(U)>>>0,Number(Y)>>>0)):[],strides:ae?Array.from(D().subarray(Number(ae)>>>0,Number(ve)>>>0)):[]})},1334616:(c,p)=>{t.vd("GlobalMaxPool",c,{format:p?"NHWC":"NCHW"})},1334703:(c,p,h,g,v,I,O,z,B,U,Y,ae,ve,We)=>{t.vd("MaxPool",c,{format:We?"NHWC":"NCHW",auto_pad:p,ceil_mode:h,count_include_pad:g,storage_order:v,dilations:I?Array.from(D().subarray(Number(I)>>>0,Number(O)>>>0)):[],kernel_shape:z?Array.from(D().subarray(Number(z)>>>0,Number(B)>>>0)):[],pads:U?Array.from(D().subarray(Number(U)>>>0,Number(Y)>>>0)):[],strides:ae?Array.from(D().subarray(Number(ae)>>>0,Number(ve)>>>0)):[]})},1335178:(c,p)=>{t.vd("GlobalMaxPool",c,{format:p?"NHWC":"NCHW"})},1335265:(c,p,h,g,v,I,O,z,B,U,Y,ae,ve,We)=>{t.vd("MaxPool",c,{format:We?"NHWC":"NCHW",auto_pad:p,ceil_mode:h,count_include_pad:g,storage_order:v,dilations:I?Array.from(D().subarray(Number(I)>>>0,Number(O)>>>0)):[],kernel_shape:z?Array.from(D().subarray(Number(z)>>>0,Number(B)>>>0)):[],pads:U?Array.from(D().subarray(Number(U)>>>0,Number(Y)>>>0)):[],strides:ae?Array.from(D().subarray(Number(ae)>>>0,Number(ve)>>>0)):[]})},1335740:(c,p,h,g,v)=>{t.vd("Gemm",c,{alpha:p,beta:h,transA:g,transB:v})},1335844:c=>{t.vd("MatMul",c,void 0)},1335898:(c,p,h,g)=>{t.vd("ArgMax",c,{keepDims:!!p,selectLastIndex:!!h,axis:g})},1336006:(c,p,h,g)=>{t.vd("ArgMin",c,{keepDims:!!p,selectLastIndex:!!h,axis:g})},1336114:(c,p)=>{t.vd("Softmax",c,{axis:p})},1336177:(c,p)=>{t.vd("Concat",c,{axis:p})},1336237:(c,p,h,g,v)=>{t.vd("Split",c,{axis:p,numOutputs:h,splitSizes:g?Array.from(D().subarray(Number(g)>>>0,Number(v)>>>0)):[]})},1336393:c=>{t.vd("Expand",c,void 0)},1336447:(c,p)=>{t.vd("Gather",c,{axis:Number(p)})},1336518:(c,p)=>{t.vd("GatherElements",c,{axis:Number(p)})},1336597:(c,p)=>{t.vd("GatherND",c,{batch_dims:Number(p)})},1336676:(c,p,h,g,v,I,O,z,B,U,Y)=>{t.vd("Resize",c,{antialias:p,axes:h?Array.from(D().subarray(Number(h)>>>0,Number(g)>>>0)):[],coordinateTransformMode:et(v),cubicCoeffA:I,excludeOutside:O,extrapolationValue:z,keepAspectRatioPolicy:et(B),mode:et(U),nearestMode:et(Y)})},1337038:(c,p,h,g,v,I,O)=>{t.vd("Slice",c,{starts:p?Array.from(D().subarray(Number(p)>>>0,Number(h)>>>0)):[],ends:g?Array.from(D().subarray(Number(g)>>>0,Number(v)>>>0)):[],axes:I?Array.from(D().subarray(Number(I)>>>0,Number(O)>>>0)):[]})},1337302:c=>{t.vd("Tile",c,void 0)},1337354:(c,p,h)=>{t.vd("InstanceNormalization",c,{epsilon:p,format:h?"NHWC":"NCHW"})},1337468:(c,p,h)=>{t.vd("InstanceNormalization",c,{epsilon:p,format:h?"NHWC":"NCHW"})},1337582:c=>{t.vd("Range",c,void 0)},1337635:(c,p)=>{t.vd("Einsum",c,{equation:et(p)})},1337716:(c,p,h,g,v)=>{t.vd("Pad",c,{mode:p,value:h,pads:g?Array.from(D().subarray(Number(g)>>>0,Number(v)>>>0)):[]})},1337859:(c,p,h,g,v,I)=>{t.vd("BatchNormalization",c,{epsilon:p,momentum:h,spatial:!!v,trainingMode:!!g,format:I?"NHWC":"NCHW"})},1338028:(c,p,h,g,v,I)=>{t.vd("BatchNormalization",c,{epsilon:p,momentum:h,spatial:!!v,trainingMode:!!g,format:I?"NHWC":"NCHW"})},1338197:(c,p,h)=>{t.vd("CumSum",c,{exclusive:Number(p),reverse:Number(h)})},1338294:(c,p,h)=>{t.vd("DequantizeLinear",c,{axis:p,blockSize:h})},1338384:(c,p,h,g,v)=>{t.vd("GridSample",c,{align_corners:p,mode:et(h),padding_mode:et(g),format:v?"NHWC":"NCHW"})},1338554:(c,p,h,g,v)=>{t.vd("GridSample",c,{align_corners:p,mode:et(h),padding_mode:et(g),format:v?"NHWC":"NCHW"})},1338724:(c,p)=>{t.vd("ScatterND",c,{reduction:et(p)})},1338809:(c,p,h,g,v,I,O,z,B)=>{t.vd("Attention",c,{numHeads:p,isUnidirectional:h,maskFilterValue:g,scale:v,doRotary:I,qkvHiddenSizes:O?Array.from(D().subarray(Number(z)>>>0,Number(z)+O>>>0)):[],pastPresentShareBuffer:!!B})},1339081:c=>{t.vd("BiasAdd",c,void 0)},1339136:c=>{t.vd("BiasSplitGelu",c,void 0)},1339197:c=>{t.vd("FastGelu",c,void 0)},1339253:(c,p,h,g,v,I,O,z,B,U,Y,ae,ve,We,Dt,yo)=>{t.vd("Conv",c,{format:ae?"NHWC":"NCHW",auto_pad:p,dilations:h?Array.from(D().subarray(Number(h)>>>0,Number(g)>>>0)):[],group:v,kernel_shape:I?Array.from(D().subarray(Number(I)>>>0,Number(O)>>>0)):[],pads:z?Array.from(D().subarray(Number(z)>>>0,Number(B)>>>0)):[],strides:U?Array.from(D().subarray(Number(U)>>>0,Number(Y)>>>0)):[],w_is_const:()=>!!Se()[Number(ve)>>>0],activation:et(We),activation_params:Dt?Array.from(Pe().subarray(Number(Dt)>>>0,Number(yo)>>>0)):[]})},1339837:c=>{t.vd("Gelu",c,void 0)},1339889:(c,p,h,g,v,I,O,z,B)=>{t.vd("GroupQueryAttention",c,{numHeads:p,kvNumHeads:h,scale:g,softcap:v,doRotary:I,rotaryInterleaved:O,smoothSoftmax:z,localWindowSize:B})},1340106:(c,p,h,g)=>{t.vd("LayerNormalization",c,{axis:p,epsilon:h,simplified:!!g})},1340217:(c,p,h,g)=>{t.vd("LayerNormalization",c,{axis:p,epsilon:h,simplified:!!g})},1340328:(c,p,h,g,v,I)=>{t.vd("MatMulNBits",c,{k:p,n:h,accuracyLevel:g,bits:v,blockSize:I})},1340455:(c,p,h,g,v,I)=>{t.vd("MultiHeadAttention",c,{numHeads:p,isUnidirectional:h,maskFilterValue:g,scale:v,doRotary:I})},1340614:(c,p)=>{t.vd("QuickGelu",c,{alpha:p})},1340678:(c,p,h,g,v)=>{t.vd("RotaryEmbedding",c,{interleaved:!!p,numHeads:h,rotaryEmbeddingDim:g,scale:v})},1340817:(c,p,h)=>{t.vd("SkipLayerNormalization",c,{epsilon:p,simplified:!!h})},1340919:(c,p,h)=>{t.vd("SkipLayerNormalization",c,{epsilon:p,simplified:!!h})},1341021:(c,p,h,g)=>{t.vd("GatherBlockQuantized",c,{gatherAxis:p,quantizeAxis:h,blockSize:g})},1341142:c=>{t.Wd(c)},1341176:(c,p)=>t.Yd(Number(c),Number(p),t.Cd.ae,t.Cd.errors)};function rT(c,p,h){return Od(async()=>{await t.Ud(Number(c),Number(p),Number(h))})}function nT(){return typeof wasmOffsetConverter<"u"}class is{name="ExitStatus";constructor(p){this.message=`Program terminated with exit(${p})`,this.status=p}}var Xc=c=>{c.terminate(),c.onmessage=()=>{}},as=[],Zc=c=>{tn.length==0&&(rd(),td(tn[0]));var p=tn.pop();if(!p)return 6;mo.push(p),vn[c.xd]=p,p.xd=c.xd;var h={yd:"run",ce:c.be,Ed:c.Ed,xd:c.xd};return p.postMessage(h,c.Jd),0},en=0,Ze=(c,p,...h)=>{for(var g=2*h.length,v=me(),I=Ss(8*g),O=I>>>3,z=0;z<h.length;z++){var B=h[z];typeof B=="bigint"?(oe[O+2*z]=1n,oe[O+2*z+1]=B):(oe[O+2*z]=0n,mt()[O+2*z+1>>>0]=B)}return c=Zd(c,0,g,I,p),he(v),c};function ss(c){if(s)return Ze(0,1,c);if(C=c,!(0<en)){for(var p of mo)Xc(p);for(p of tn)Xc(p);tn=[],mo=[],vn={},pe=!0}y(0,new is(c))}function Jc(c){if(s)return Ze(1,0,c);us(c)}var us=c=>{if(C=c,s)throw Jc(c),"unwind";ss(c)},tn=[],mo=[],Yc=[],vn={},Qc=c=>{var p=c.xd;delete vn[p],tn.push(c),mo.splice(mo.indexOf(c),1),c.xd=0,Jd(p)};function ed(){Yc.forEach(c=>c())}var td=c=>new Promise(p=>{c.onmessage=v=>{var I=(v=v.data).yd;if(v.Dd&&v.Dd!=oi()){var O=vn[v.Dd];O?O.postMessage(v,v.Jd):S(`Internal error! Worker sent a message "${I}" to target pthread ${v.Dd}, but that thread no longer exists!`)}else I==="checkMailbox"?Zo():I==="spawnThread"?Zc(v):I==="cleanupThread"?Qc(vn[v.de]):I==="loaded"?(c.loaded=!0,p(c)):I==="alert"?alert(`Thread ${v.ee}: ${v.text}`):v.target==="setimmediate"?c.postMessage(v):I==="callHandler"?t[v.Nd](...v.args):I&&S(`worker sent an unknown command ${I}`)},c.onerror=v=>{throw S(`worker sent an error! ${v.filename}:${v.lineno}: ${v.message}`),v};var h,g=[];for(h of[])t.propertyIsEnumerable(h)&&g.push(h);c.postMessage({yd:"load",Od:g,ge:A,he:P})});function rd(){var c=new Worker((()=>{let p=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new p("ort.all.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});tn.push(c)}var oT=c=>{at();var p=q()[c+52>>>2>>>0];c=q()[c+56>>>2>>>0],ep(p,p-c),he(p)},iT=(c,p)=>{en=0,c=$s(c,p),0<en?C=c:Is(c)},Xo=[];function aT(c){var p=new ls(c>>>=0);if(Se()[p.wd+12>>>0]==0){var h=1;Se()[p.wd+12>>>0]=h}return h=0,Se()[p.wd+13>>>0]=h,Xo.push(p),rp(c),op(c)}var Hn=0,sT=()=>{_e(0,0);var c=Xo.pop();tp(c.Fd),Hn=0};class ls{constructor(p){this.Fd=p,this.wd=p-24}}function uT(c){throw Hn||=c>>>0,Hn}var cs=c=>{var p=Hn;if(!p)return bo(0),0;var h=new ls(p);q()[h.wd+16>>>2>>>0]=p;var g=q()[h.wd+4>>>2>>>0];if(!g)return bo(0),p;for(var v of c){if(v===0||v===g)break;if(np(v,g,h.wd+16))return bo(v),p}return bo(g),p};function lT(){return cs([])}function cT(c){return cs([c>>>0])}function dT(c,p){return cs([c>>>0,p>>>0])}var pT=()=>{var c=Xo.pop();c||jr("no exception to throw");var p=c.Fd;if(Se()[c.wd+13>>>0]==0){Xo.push(c);var h=1;Se()[c.wd+13>>>0]=h,h=0,Se()[c.wd+12>>>0]=h}throw Hn=p};function fT(c,p,h){var g=new ls(c>>>=0);throw p>>>=0,h>>>=0,q()[g.wd+16>>>2>>>0]=0,q()[g.wd+4>>>2>>>0]=p,q()[g.wd+8>>>2>>>0]=h,Hn=c}function nd(c,p,h,g){return s?Ze(2,1,c,p,h,g):od(c,p,h,g)}function od(c,p,h,g){if(c>>>=0,h>>>=0,g>>>=0,u===void 0)return 6;var v=[];return s&&v.length===0?nd(c,p>>>=0,h,g):(c={be:h,xd:c,Ed:g,Jd:v},s?(c.yd="spawnThread",postMessage(c,v),0):Zc(c))}var id=typeof TextDecoder<"u"?new TextDecoder:void 0,ad=(c,p=0,h=NaN)=>{var g=(p>>>=0)+h;for(h=p;c[h]&&!(h>=g);)++h;if(16<h-p&&c.buffer&&id)return id.decode(c.buffer instanceof ArrayBuffer?c.subarray(p,h):c.slice(p,h));for(g="";p<h;){var v=c[p++];if(128&v){var I=63&c[p++];if((224&v)==192)g+=String.fromCharCode((31&v)<<6|I);else{var O=63&c[p++];65536>(v=(240&v)==224?(15&v)<<12|I<<6|O:(7&v)<<18|I<<12|O<<6|63&c[p++])?g+=String.fromCharCode(v):(v-=65536,g+=String.fromCharCode(55296|v>>10,56320|1023&v))}}else g+=String.fromCharCode(v)}return g},et=(c,p)=>(c>>>=0)?ad(Be(),c,p):"";function sd(c,p,h){return s?Ze(3,1,c,p,h):0}function ud(c,p){if(s)return Ze(4,1,c,p)}var ld=c=>{for(var p=0,h=0;h<c.length;++h){var g=c.charCodeAt(h);127>=g?p++:2047>=g?p+=2:55296<=g&&57343>=g?(p+=4,++h):p+=3}return p},qn=(c,p,h)=>{var g=Be();if(p>>>=0,0<h){var v=p;h=p+h-1;for(var I=0;I<c.length;++I){var O=c.charCodeAt(I);if(55296<=O&&57343>=O&&(O=65536+((1023&O)<<10)|1023&c.charCodeAt(++I)),127>=O){if(p>=h)break;g[p++>>>0]=O}else{if(2047>=O){if(p+1>=h)break;g[p++>>>0]=192|O>>6}else{if(65535>=O){if(p+2>=h)break;g[p++>>>0]=224|O>>12}else{if(p+3>=h)break;g[p++>>>0]=240|O>>18,g[p++>>>0]=128|O>>12&63}g[p++>>>0]=128|O>>6&63}g[p++>>>0]=128|63&O}}g[p>>>0]=0,c=p-v}else c=0;return c};function cd(c,p){if(s)return Ze(5,1,c,p)}function dd(c,p,h){if(s)return Ze(6,1,c,p,h)}function pd(c,p,h){return s?Ze(7,1,c,p,h):0}function fd(c,p){if(s)return Ze(8,1,c,p)}function hd(c,p,h){if(s)return Ze(9,1,c,p,h)}function md(c,p,h,g){if(s)return Ze(10,1,c,p,h,g)}function gd(c,p,h,g){if(s)return Ze(11,1,c,p,h,g)}function bd(c,p,h,g){if(s)return Ze(12,1,c,p,h,g)}function yd(c){if(s)return Ze(13,1,c)}function _d(c,p){if(s)return Ze(14,1,c,p)}function vd(c,p,h){if(s)return Ze(15,1,c,p,h)}var wd,rn,hT=()=>jr(""),Qt=c=>{for(var p="";Be()[c>>>0];)p+=wd[Be()[c++>>>0]];return p},ds={},ps={},mT={};function Kr(c,p,h={}){return function(g,v,I={}){var O=v.name;if(!g)throw new rn(`type "${O}" must have a positive integer typeid pointer`);if(ps.hasOwnProperty(g)){if(I.Pd)return;throw new rn(`Cannot register type '${O}' twice`)}ps[g]=v,delete mT[g],ds.hasOwnProperty(g)&&(v=ds[g],delete ds[g],v.forEach(z=>z()))}(c,p,h)}var xd=(c,p,h)=>{switch(p){case 1:return h?g=>Se()[g>>>0]:g=>Be()[g>>>0];case 2:return h?g=>Ge()[g>>>1>>>0]:g=>fe()[g>>>1>>>0];case 4:return h?g=>D()[g>>>2>>>0]:g=>q()[g>>>2>>>0];case 8:return h?g=>oe[g>>>3]:g=>Ue[g>>>3];default:throw new TypeError(`invalid integer width (${p}): ${c}`)}};function gT(c,p,h){h>>>=0,Kr(c>>>=0,{name:p=Qt(p>>>0),fromWireType:g=>g,toWireType:function(g,v){if(typeof v!="bigint"&&typeof v!="number")throw v=v===null?"null":(g=typeof v)=="object"||g==="array"||g==="function"?v.toString():""+v,new TypeError(`Cannot convert "${v}" to ${this.name}`);return typeof v=="number"&&(v=BigInt(v)),v},zd:nn,readValueFromPointer:xd(p,h,p.indexOf("u")==-1),Ad:null})}var nn=8;function bT(c,p,h,g){Kr(c>>>=0,{name:p=Qt(p>>>0),fromWireType:function(v){return!!v},toWireType:function(v,I){return I?h:g},zd:nn,readValueFromPointer:function(v){return this.fromWireType(Be()[v>>>0])},Ad:null})}var fs=[],Xr=[];function hs(c){9<(c>>>=0)&&--Xr[c+1]==0&&(Xr[c]=void 0,fs.push(c))}var It=c=>{if(!c)throw new rn("Cannot use deleted val. handle = "+c);return Xr[c]},Ct=c=>{switch(c){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let p=fs.pop()||Xr.length;return Xr[p]=c,Xr[p+1]=1,p}};function ms(c){return this.fromWireType(q()[c>>>2>>>0])}var yT={name:"emscripten::val",fromWireType:c=>{var p=It(c);return hs(c),p},toWireType:(c,p)=>Ct(p),zd:nn,readValueFromPointer:ms,Ad:null};function _T(c){return Kr(c>>>0,yT)}var vT=(c,p)=>{switch(p){case 4:return function(h){return this.fromWireType(Pe()[h>>>2>>>0])};case 8:return function(h){return this.fromWireType(mt()[h>>>3>>>0])};default:throw new TypeError(`invalid float width (${p}): ${c}`)}};function wT(c,p,h){h>>>=0,Kr(c>>>=0,{name:p=Qt(p>>>0),fromWireType:g=>g,toWireType:(g,v)=>v,zd:nn,readValueFromPointer:vT(p,h),Ad:null})}function xT(c,p,h,g,v){if(c>>>=0,h>>>=0,p=Qt(p>>>0),v===-1&&(v=4294967295),v=z=>z,g===0){var I=32-8*h;v=z=>z<<I>>>I}var O=p.includes("unsigned")?function(z,B){return B>>>0}:function(z,B){return B};Kr(c,{name:p,fromWireType:v,toWireType:O,zd:nn,readValueFromPointer:xd(p,h,g!==0),Ad:null})}function TT(c,p,h){function g(I){var O=q()[I>>>2>>>0];return I=q()[I+4>>>2>>>0],new v(Se().buffer,I,O)}var v=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][p];Kr(c>>>=0,{name:h=Qt(h>>>0),fromWireType:g,zd:nn,readValueFromPointer:g},{Pd:!0})}function IT(c,p){Kr(c>>>=0,{name:p=Qt(p>>>0),fromWireType:function(h){for(var g,v=q()[h>>>2>>>0],I=h+4,O=I,z=0;z<=v;++z){var B=I+z;z!=v&&Be()[B>>>0]!=0||(O=et(O,B-O),g===void 0?g=O:(g+="\0",g+=O),O=B+1)}return tr(h),g},toWireType:function(h,g){g instanceof ArrayBuffer&&(g=new Uint8Array(g));var v=typeof g=="string";if(!(v||g instanceof Uint8Array||g instanceof Uint8ClampedArray||g instanceof Int8Array))throw new rn("Cannot pass non-string to std::string");var I=v?ld(g):g.length,O=ii(4+I+1),z=O+4;if(q()[O>>>2>>>0]=I,v)qn(g,z,I+1);else if(v)for(v=0;v<I;++v){var B=g.charCodeAt(v);if(255<B)throw tr(O),new rn("String has UTF-16 code units that do not fit in 8 bits");Be()[z+v>>>0]=B}else for(v=0;v<I;++v)Be()[z+v>>>0]=g[v];return h!==null&&h.push(tr,O),O},zd:nn,readValueFromPointer:ms,Ad(h){tr(h)}})}var Td=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,ST=(c,p)=>{for(var h=c>>1,g=h+p/2;!(h>=g)&&fe()[h>>>0];)++h;if(32<(h<<=1)-c&&Td)return Td.decode(Be().slice(c,h));for(h="",g=0;!(g>=p/2);++g){var v=Ge()[c+2*g>>>1>>>0];if(v==0)break;h+=String.fromCharCode(v)}return h},$T=(c,p,h)=>{if(h??=2147483647,2>h)return 0;var g=p;h=(h-=2)<2*c.length?h/2:c.length;for(var v=0;v<h;++v){var I=c.charCodeAt(v);Ge()[p>>>1>>>0]=I,p+=2}return Ge()[p>>>1>>>0]=0,p-g},AT=c=>2*c.length,OT=(c,p)=>{for(var h=0,g="";!(h>=p/4);){var v=D()[c+4*h>>>2>>>0];if(v==0)break;++h,65536<=v?(v-=65536,g+=String.fromCharCode(55296|v>>10,56320|1023&v)):g+=String.fromCharCode(v)}return g},PT=(c,p,h)=>{if(p>>>=0,h??=2147483647,4>h)return 0;var g=p;h=g+h-4;for(var v=0;v<c.length;++v){var I=c.charCodeAt(v);if(55296<=I&&57343>=I&&(I=65536+((1023&I)<<10)|1023&c.charCodeAt(++v)),D()[p>>>2>>>0]=I,(p+=4)+4>h)break}return D()[p>>>2>>>0]=0,p-g},ET=c=>{for(var p=0,h=0;h<c.length;++h){var g=c.charCodeAt(h);55296<=g&&57343>=g&&++h,p+=4}return p};function CT(c,p,h){if(c>>>=0,p>>>=0,h=Qt(h>>>=0),p===2)var g=ST,v=$T,I=AT,O=z=>fe()[z>>>1>>>0];else p===4&&(g=OT,v=PT,I=ET,O=z=>q()[z>>>2>>>0]);Kr(c,{name:h,fromWireType:z=>{for(var B,U=q()[z>>>2>>>0],Y=z+4,ae=0;ae<=U;++ae){var ve=z+4+ae*p;ae!=U&&O(ve)!=0||(Y=g(Y,ve-Y),B===void 0?B=Y:(B+="\0",B+=Y),Y=ve+p)}return tr(z),B},toWireType:(z,B)=>{if(typeof B!="string")throw new rn(`Cannot pass non-string to C++ string type ${h}`);var U=I(B),Y=ii(4+U+p);return q()[Y>>>2>>>0]=U/p,v(B,Y+4,U+p),z!==null&&z.push(tr,Y),Y},zd:nn,readValueFromPointer:ms,Ad(z){tr(z)}})}function DT(c,p){Kr(c>>>=0,{Qd:!0,name:p=Qt(p>>>0),zd:0,fromWireType:()=>{},toWireType:()=>{}})}function kT(c){Ts(c>>>0,!a,1,!i,131072,!1),ed()}var gs=c=>{if(!pe)try{if(c(),!(0<en))try{s?Is(C):us(C)}catch(p){p instanceof is||p=="unwind"||y(0,p)}}catch(p){p instanceof is||p=="unwind"||y(0,p)}};function bs(c){c>>>=0,typeof Atomics.fe=="function"&&(Atomics.fe(D(),c>>>2,c).value.then(Zo),c+=128,Atomics.store(D(),c>>>2,1))}var Zo=()=>{var c=oi();c&&(bs(c),gs(Qd))};function NT(c,p){(c>>>=0)==p>>>0?setTimeout(Zo):s?postMessage({Dd:c,yd:"checkMailbox"}):(c=vn[c])&&c.postMessage({yd:"checkMailbox"})}var ys=[];function LT(c,p,h,g,v){for(p>>>=0,g/=2,ys.length=g,h=v>>>0>>>3,v=0;v<g;v++)ys[v]=oe[h+2*v]?oe[h+2*v+1]:mt()[h+2*v+1>>>0];return(p?os[p]:O2[c])(...ys)}var RT=()=>{en=0};function zT(c){c>>>=0,s?postMessage({yd:"cleanupThread",de:c}):Qc(vn[c])}function MT(c){}var Jo=(c,p)=>{var h=ps[c];if(h===void 0)throw c=jd(c),h=Qt(c),tr(c),new rn(`${p} has unknown type ${h}`);return h},Id=(c,p,h)=>{var g=[];return c=c.toWireType(g,h),g.length&&(q()[p>>>2>>>0]=Ct(g)),c};function BT(c,p,h){return p>>>=0,h>>>=0,c=It(c>>>0),p=Jo(p,"emval::as"),Id(p,h,c)}function FT(c,p){return p>>>=0,c=It(c>>>0),(p=Jo(p,"emval::as")).toWireType(null,c)}var Yo=c=>{try{c()}catch(p){jr(p)}},on=0,er=null,Sd=0,Qo=[],$d={},Ad={},VT=0,_s=null,GT=[];function Od(c){return function(p){if(!pe){if(on===0){var h=!1,g=!1;p((v=0)=>{if(!pe&&(Sd=v,h=!0,g)){on=2,Yo(()=>Jp(er)),typeof MainLoop<"u"&&MainLoop.Md&&MainLoop.resume(),v=!1;try{var I=function(){var B=D()[er+8>>>2>>>0];return B=G[Ad[B]],--en,B()}()}catch(B){I=B,v=!0}var O=!1;if(!er){var z=_s;z&&(_s=null,(v?z.reject:z.resolve)(I),O=!0)}if(v&&!O)throw I}}),g=!0,h||(on=1,er=function(){var v=ii(65548),I=v+12;q()[v>>>2>>>0]=I,q()[v+4>>>2>>>0]=I+65536,I=Qo[0];var O=$d[I];return O===void 0&&(O=VT++,$d[I]=O,Ad[O]=I),I=O,D()[v+8>>>2>>>0]=I,v}(),typeof MainLoop<"u"&&MainLoop.Md&&MainLoop.pause(),Yo(()=>Xp(er)))}else on===2?(on=0,Yo(Yp),tr(er),er=null,GT.forEach(gs)):jr(`invalid state: ${on}`);return Sd}}(p=>{c().then(p)})}function UT(c){return c>>>=0,Od(async()=>{var p=await It(c);return Ct(p)})}var ei=[];function WT(c,p,h,g){return h>>>=0,g>>>=0,(c=ei[c>>>0])(null,p=It(p>>>0),h,g)}var HT={},ti=c=>{var p=HT[c];return p===void 0?Qt(c):p};function qT(c,p,h,g,v){return h>>>=0,g>>>=0,v>>>=0,(c=ei[c>>>0])(p=It(p>>>0),p[h=ti(h)],g,v)}var Pd=()=>typeof globalThis=="object"?globalThis:Function("return this")();function jT(c){return(c>>>=0)==0?Ct(Pd()):(c=ti(c),Ct(Pd()[c]))}var KT=c=>{var p=ei.length;return ei.push(c),p},XT=(c,p)=>{for(var h=Array(c),g=0;g<c;++g)h[g]=Jo(q()[p+4*g>>>2>>>0],"parameter "+g);return h},Ed=(c,p)=>Object.defineProperty(p,"name",{value:c});function ZT(c,p,h){var g=(p=XT(c,p>>>0)).shift();c--;var v=`return function (obj, func, destructorsRef, args) {
`,I=0,O=[];h===0&&O.push("obj");for(var z=["retType"],B=[g],U=0;U<c;++U)O.push("arg"+U),z.push("argType"+U),B.push(p[U]),v+=`  var arg${U} = argType${U}.readValueFromPointer(args${I?"+"+I:""});
`,I+=p[U].zd;return v+=`  var rv = ${h===1?"new func":"func.call"}(${O.join(", ")});
`,g.Qd||(z.push("emval_returnValue"),B.push(Id),v+=`  return emval_returnValue(retType, destructorsRef, rv);
`),z.push(v+`};
`),c=function(Y){var ae=Function;if(!(ae instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof ae} which is not a function`);var ve=Ed(ae.name||"unknownFunctionName",function(){});return ve.prototype=ae.prototype,ve=new ve,(Y=ae.apply(ve,Y))instanceof Object?Y:ve}(z)(...B),h=`methodCaller<(${p.map(Y=>Y.name).join(", ")}) => ${g.name}>`,KT(Ed(h,c))}function JT(c){return c=ti(c>>>0),Ct(t[c])}function YT(c,p){return p>>>=0,c=It(c>>>0),p=It(p),Ct(c[p])}function QT(c){9<(c>>>=0)&&(Xr[c+1]+=1)}function e2(){return Ct([])}function t2(c){c=It(c>>>0);for(var p=Array(c.length),h=0;h<c.length;h++)p[h]=c[h];return Ct(p)}function r2(c){return Ct(ti(c>>>0))}function n2(){return Ct({})}function o2(c){for(var p=It(c>>>=0);p.length;){var h=p.pop();p.pop()(h)}hs(c)}function i2(c,p,h){p>>>=0,h>>>=0,c=It(c>>>0),p=It(p),h=It(h),c[p]=h}function a2(c,p){return p>>>=0,c=(c=Jo(c>>>0,"_emval_take_value")).readValueFromPointer(p),Ct(c)}function s2(c,p){c=-9007199254740992>c||9007199254740992<c?NaN:Number(c),p>>>=0,c=new Date(1e3*c),D()[p>>>2>>>0]=c.getUTCSeconds(),D()[p+4>>>2>>>0]=c.getUTCMinutes(),D()[p+8>>>2>>>0]=c.getUTCHours(),D()[p+12>>>2>>>0]=c.getUTCDate(),D()[p+16>>>2>>>0]=c.getUTCMonth(),D()[p+20>>>2>>>0]=c.getUTCFullYear()-1900,D()[p+24>>>2>>>0]=c.getUTCDay(),c=(c.getTime()-Date.UTC(c.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,D()[p+28>>>2>>>0]=c}var Cd=c=>c%4==0&&(c%100!=0||c%400==0),Dd=[0,31,60,91,121,152,182,213,244,274,305,335],kd=[0,31,59,90,120,151,181,212,243,273,304,334];function u2(c,p){c=-9007199254740992>c||9007199254740992<c?NaN:Number(c),p>>>=0,c=new Date(1e3*c),D()[p>>>2>>>0]=c.getSeconds(),D()[p+4>>>2>>>0]=c.getMinutes(),D()[p+8>>>2>>>0]=c.getHours(),D()[p+12>>>2>>>0]=c.getDate(),D()[p+16>>>2>>>0]=c.getMonth(),D()[p+20>>>2>>>0]=c.getFullYear()-1900,D()[p+24>>>2>>>0]=c.getDay();var h=(Cd(c.getFullYear())?Dd:kd)[c.getMonth()]+c.getDate()-1|0;D()[p+28>>>2>>>0]=h,D()[p+36>>>2>>>0]=-60*c.getTimezoneOffset(),h=new Date(c.getFullYear(),6,1).getTimezoneOffset();var g=new Date(c.getFullYear(),0,1).getTimezoneOffset();c=0|(h!=g&&c.getTimezoneOffset()==Math.min(g,h)),D()[p+32>>>2>>>0]=c}function l2(c){c>>>=0;var p=new Date(D()[c+20>>>2>>>0]+1900,D()[c+16>>>2>>>0],D()[c+12>>>2>>>0],D()[c+8>>>2>>>0],D()[c+4>>>2>>>0],D()[c>>>2>>>0],0),h=D()[c+32>>>2>>>0],g=p.getTimezoneOffset(),v=new Date(p.getFullYear(),6,1).getTimezoneOffset(),I=new Date(p.getFullYear(),0,1).getTimezoneOffset(),O=Math.min(I,v);return 0>h?D()[c+32>>>2>>>0]=+(v!=I&&O==g):0<h!=(O==g)&&(v=Math.max(I,v),p.setTime(p.getTime()+6e4*((0<h?O:v)-g))),D()[c+24>>>2>>>0]=p.getDay(),h=(Cd(p.getFullYear())?Dd:kd)[p.getMonth()]+p.getDate()-1|0,D()[c+28>>>2>>>0]=h,D()[c>>>2>>>0]=p.getSeconds(),D()[c+4>>>2>>>0]=p.getMinutes(),D()[c+8>>>2>>>0]=p.getHours(),D()[c+12>>>2>>>0]=p.getDate(),D()[c+16>>>2>>>0]=p.getMonth(),D()[c+20>>>2>>>0]=p.getYear(),c=p.getTime(),BigInt(isNaN(c)?-1:c/1e3)}function Nd(c,p,h,g,v,I,O){return s?Ze(16,1,c,p,h,g,v,I,O):-52}function Ld(c,p,h,g,v,I){if(s)return Ze(17,1,c,p,h,g,v,I)}var go={},c2=()=>performance.timeOrigin+performance.now();function Rd(c,p){if(s)return Ze(18,1,c,p);if(go[c]&&(clearTimeout(go[c].id),delete go[c]),!p)return 0;var h=setTimeout(()=>{delete go[c],gs(()=>Yd(c,performance.timeOrigin+performance.now()))},p);return go[c]={id:h,me:p},0}function d2(c,p,h,g){c>>>=0,p>>>=0,h>>>=0,g>>>=0;var v=new Date().getFullYear(),I=new Date(v,0,1).getTimezoneOffset();v=new Date(v,6,1).getTimezoneOffset();var O=Math.max(I,v);q()[c>>>2>>>0]=60*O,D()[p>>>2>>>0]=+(I!=v),c=(p=z=>{var B=Math.abs(z);return`UTC${0<=z?"-":"+"}${String(Math.floor(B/60)).padStart(2,"0")}${String(B%60).padStart(2,"0")}`})(I),p=p(v),v<I?(qn(c,h,17),qn(p,g,17)):(qn(c,g,17),qn(p,h,17))}var p2=()=>Date.now(),f2=1;function h2(c,p,h){if(!(0<=c&&3>=c))return 28;if(c===0)c=Date.now();else{if(!f2)return 52;c=performance.timeOrigin+performance.now()}return oe[h>>>0>>>3]=BigInt(Math.round(1e6*c)),0}var vs=[],zd=(c,p)=>{vs.length=0;for(var h;h=Be()[c++>>>0];){var g=h!=105;p+=(g&=h!=112)&&p%8?4:0,vs.push(h==112?q()[p>>>2>>>0]:h==106?oe[p>>>3]:h==105?D()[p>>>2>>>0]:mt()[p>>>3>>>0]),p+=g?8:4}return vs};function m2(c,p,h){return c>>>=0,p=zd(p>>>0,h>>>0),os[c](...p)}function g2(c,p,h){return c>>>=0,p=zd(p>>>0,h>>>0),os[c](...p)}var b2=()=>{};function y2(c,p){return S(et(c>>>0,p>>>0))}var _2=()=>{throw en+=1,"unwind"};function v2(){return 4294901760}var w2=()=>navigator.hardwareConcurrency;function x2(){return jr("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function T2(c){c>>>=0;var p=Be().length;if(c<=p||4294901760<c)return!1;for(var h=1;4>=h;h*=2){var g=p*(1+.2/h);g=Math.min(g,c+100663296);e:{g=(Math.min(4294901760,65536*Math.ceil(Math.max(c,g)/65536))-A.buffer.byteLength+65535)/65536|0;try{A.grow(g),at();var v=1;break e}catch{}v=void 0}if(v)return!0}return!1}var ri=()=>(jr("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),jn={},Md=c=>{c.forEach(p=>{var h=ri();h&&(jn[h]=p)})};function I2(){var c=Error().stack.toString().split(`
`);return c[0]=="Error"&&c.shift(),Md(c),jn.Id=ri(),jn.$d=c,jn.Id}function S2(c,p,h){if(c>>>=0,p>>>=0,jn.Id==c)var g=jn.$d;else(g=Error().stack.toString().split(`
`))[0]=="Error"&&g.shift(),Md(g);for(var v=3;g[v]&&ri()!=c;)++v;for(c=0;c<h&&g[c+v];++c)D()[p+4*c>>>2>>>0]=ri();return c}var ws,xs={},Bd=()=>{if(!ws){var c,p={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(c in xs)xs[c]===void 0?delete p[c]:p[c]=xs[c];var h=[];for(c in p)h.push(`${c}=${p[c]}`);ws=h}return ws};function Fd(c,p){if(s)return Ze(19,1,c,p);c>>>=0,p>>>=0;var h=0;return Bd().forEach((g,v)=>{var I=p+h;for(v=q()[c+4*v>>>2>>>0]=I,I=0;I<g.length;++I)Se()[v++>>>0]=g.charCodeAt(I);Se()[v>>>0]=0,h+=g.length+1}),0}function Vd(c,p){if(s)return Ze(20,1,c,p);c>>>=0,p>>>=0;var h=Bd();q()[c>>>2>>>0]=h.length;var g=0;return h.forEach(v=>g+=v.length+1),q()[p>>>2>>>0]=g,0}function Gd(c){return s?Ze(21,1,c):52}function Ud(c,p,h,g){return s?Ze(22,1,c,p,h,g):52}function Wd(c,p,h,g){return s?Ze(23,1,c,p,h,g):70}var $2=[null,[],[]];function Hd(c,p,h,g){if(s)return Ze(24,1,c,p,h,g);p>>>=0,h>>>=0,g>>>=0;for(var v=0,I=0;I<h;I++){var O=q()[p>>>2>>>0],z=q()[p+4>>>2>>>0];p+=8;for(var B=0;B<z;B++){var U=Be()[O+B>>>0],Y=$2[c];U===0||U===10?((c===1?x:S)(ad(Y)),Y.length=0):Y.push(U)}v+=z}return q()[g>>>2>>>0]=v,0}function A2(c){return c>>>0}s||function(){for(var c=t.numThreads-1;c--;)rd();as.unshift(()=>{Wn++,function(p){s?p():Promise.all(tn.map(td)).then(p)}(()=>jc())})}();for(var qd=Array(256),ni=0;256>ni;++ni)qd[ni]=String.fromCharCode(ni);wd=qd,rn=t.BindingError=class extends Error{constructor(c){super(c),this.name="BindingError"}},t.InternalError=class extends Error{constructor(c){super(c),this.name="InternalError"}},Xr.push(0,1,void 0,1,null,1,!0,1,!1,1),t.count_emval_handles=()=>Xr.length/2-5-fs.length;var G,O2=[ss,Jc,nd,sd,ud,cd,dd,pd,fd,hd,md,gd,bd,yd,_d,vd,Nd,Ld,Rd,Fd,Vd,Gd,Ud,Wd,Hd];(async function(){function c(g,v){return G=g.exports,G=function(){var I=G,O={};for(let[z,B]of Object.entries(I))O[z]=typeof B=="function"?(...U)=>{Qo.push(z);try{return B(...U)}finally{pe||(Qo.pop(),er&&on===1&&Qo.length===0&&(on=0,en+=1,Yo(Zp),typeof Fibers<"u"&&Fibers.ne()))}}:B;return O}(),G=function(){var I=G,O=B=>U=>B(U)>>>0,z=B=>()=>B()>>>0;return(I=Object.assign({},I)).Cb=O(I.Cb),I.ec=z(I.ec),I.hc=O(I.hc),I.uc=O(I.uc),I.vc=z(I.vc),I.zc=O(I.zc),I}(),Yc.push(G.ic),P=v,jc(),G}Wn++;var p=Kc();if(t.instantiateWasm)return new Promise(g=>{t.instantiateWasm(p,(v,I)=>{c(v,I),g(v.exports)})});if(s)return new Promise(g=>{Ke=v=>{var I=new WebAssembly.Instance(v,Kc());g(c(I,v))}});Un??=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",_):_+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href;try{var h=await async function(g){var v=Un;if(!te&&typeof WebAssembly.instantiateStreaming=="function"&&!ue(v))try{var I=fetch(v,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(I,g)}catch(O){S(`wasm streaming compile failed: ${O}`),S("falling back to ArrayBuffer instantiation")}return async function(O,z){try{var B=await async function(U){if(!te)try{var Y=await f(U);return new Uint8Array(Y)}catch{}if(U==Un&&te)U=new Uint8Array(te);else{if(!m)throw"both async and sync fetching of the wasm failed";U=m(U)}return U}(O);return await WebAssembly.instantiate(B,z)}catch(U){S(`failed to asynchronously prepare wasm: ${U}`),jr(U)}}(v,g)}(p);return c(h.instance,h.module)}catch(g){return r(g),Promise.reject(g)}})();var jd=c=>(jd=G.Cb)(c),Kd=()=>(Kd=G.Db)();t._OrtInit=(c,p)=>(t._OrtInit=G.Eb)(c,p),t._OrtGetLastError=(c,p)=>(t._OrtGetLastError=G.Fb)(c,p),t._OrtCreateSessionOptions=(c,p,h,g,v,I,O,z,B,U)=>(t._OrtCreateSessionOptions=G.Gb)(c,p,h,g,v,I,O,z,B,U),t._OrtAppendExecutionProvider=(c,p,h,g,v)=>(t._OrtAppendExecutionProvider=G.Hb)(c,p,h,g,v),t._OrtAddFreeDimensionOverride=(c,p,h)=>(t._OrtAddFreeDimensionOverride=G.Ib)(c,p,h),t._OrtAddSessionConfigEntry=(c,p,h)=>(t._OrtAddSessionConfigEntry=G.Jb)(c,p,h),t._OrtReleaseSessionOptions=c=>(t._OrtReleaseSessionOptions=G.Kb)(c),t._OrtCreateSession=(c,p,h)=>(t._OrtCreateSession=G.Lb)(c,p,h),t._OrtReleaseSession=c=>(t._OrtReleaseSession=G.Mb)(c),t._OrtGetInputOutputCount=(c,p,h)=>(t._OrtGetInputOutputCount=G.Nb)(c,p,h),t._OrtGetInputOutputMetadata=(c,p,h,g)=>(t._OrtGetInputOutputMetadata=G.Ob)(c,p,h,g),t._OrtFree=c=>(t._OrtFree=G.Pb)(c),t._OrtCreateTensor=(c,p,h,g,v,I)=>(t._OrtCreateTensor=G.Qb)(c,p,h,g,v,I),t._OrtGetTensorData=(c,p,h,g,v)=>(t._OrtGetTensorData=G.Rb)(c,p,h,g,v),t._OrtReleaseTensor=c=>(t._OrtReleaseTensor=G.Sb)(c),t._OrtCreateRunOptions=(c,p,h,g)=>(t._OrtCreateRunOptions=G.Tb)(c,p,h,g),t._OrtAddRunConfigEntry=(c,p,h)=>(t._OrtAddRunConfigEntry=G.Ub)(c,p,h),t._OrtReleaseRunOptions=c=>(t._OrtReleaseRunOptions=G.Vb)(c),t._OrtCreateBinding=c=>(t._OrtCreateBinding=G.Wb)(c),t._OrtBindInput=(c,p,h)=>(t._OrtBindInput=G.Xb)(c,p,h),t._OrtBindOutput=(c,p,h,g)=>(t._OrtBindOutput=G.Yb)(c,p,h,g),t._OrtClearBoundOutputs=c=>(t._OrtClearBoundOutputs=G.Zb)(c),t._OrtReleaseBinding=c=>(t._OrtReleaseBinding=G._b)(c),t._OrtRunWithBinding=(c,p,h,g,v)=>(t._OrtRunWithBinding=G.$b)(c,p,h,g,v),t._OrtRun=(c,p,h,g,v,I,O,z)=>(t._OrtRun=G.ac)(c,p,h,g,v,I,O,z),t._OrtEndProfiling=c=>(t._OrtEndProfiling=G.bc)(c),t._JsepOutput=(c,p,h)=>(t._JsepOutput=G.cc)(c,p,h),t._JsepGetNodeName=c=>(t._JsepGetNodeName=G.dc)(c);var oi=()=>(oi=G.ec)(),tr=t._free=c=>(tr=t._free=G.fc)(c),ii=t._malloc=c=>(ii=t._malloc=G.hc)(c),Ts=(c,p,h,g,v,I)=>(Ts=G.jc)(c,p,h,g,v,I),Xd=()=>(Xd=G.kc)(),Zd=(c,p,h,g,v)=>(Zd=G.lc)(c,p,h,g,v),Jd=c=>(Jd=G.mc)(c),Is=c=>(Is=G.nc)(c),Yd=(c,p)=>(Yd=G.oc)(c,p),Qd=()=>(Qd=G.pc)(),_e=(c,p)=>(_e=G.qc)(c,p),bo=c=>(bo=G.rc)(c),ep=(c,p)=>(ep=G.sc)(c,p),he=c=>(he=G.tc)(c),Ss=c=>(Ss=G.uc)(c),me=()=>(me=G.vc)(),tp=c=>(tp=G.wc)(c),rp=c=>(rp=G.xc)(c),np=(c,p,h)=>(np=G.yc)(c,p,h),op=c=>(op=G.zc)(c),ip=t.dynCall_iii=(c,p,h)=>(ip=t.dynCall_iii=G.Ac)(c,p,h),ap=t.dynCall_vi=(c,p)=>(ap=t.dynCall_vi=G.Bc)(c,p),$s=t.dynCall_ii=(c,p)=>($s=t.dynCall_ii=G.Cc)(c,p),sp=t.dynCall_vii=(c,p,h)=>(sp=t.dynCall_vii=G.Dc)(c,p,h),up=t.dynCall_iiii=(c,p,h,g)=>(up=t.dynCall_iiii=G.Ec)(c,p,h,g),lp=t.dynCall_viii=(c,p,h,g)=>(lp=t.dynCall_viii=G.Fc)(c,p,h,g),cp=t.dynCall_iiiii=(c,p,h,g,v)=>(cp=t.dynCall_iiiii=G.Gc)(c,p,h,g,v),dp=t.dynCall_viiii=(c,p,h,g,v)=>(dp=t.dynCall_viiii=G.Hc)(c,p,h,g,v),pp=t.dynCall_viiiiii=(c,p,h,g,v,I,O)=>(pp=t.dynCall_viiiiii=G.Ic)(c,p,h,g,v,I,O),fp=t.dynCall_viiiiiii=(c,p,h,g,v,I,O,z)=>(fp=t.dynCall_viiiiiii=G.Jc)(c,p,h,g,v,I,O,z),hp=t.dynCall_ji=(c,p)=>(hp=t.dynCall_ji=G.Kc)(c,p),mp=t.dynCall_v=c=>(mp=t.dynCall_v=G.Lc)(c),gp=t.dynCall_viiiii=(c,p,h,g,v,I)=>(gp=t.dynCall_viiiii=G.Mc)(c,p,h,g,v,I),bp=t.dynCall_i=c=>(bp=t.dynCall_i=G.Nc)(c),yp=t.dynCall_fii=(c,p,h)=>(yp=t.dynCall_fii=G.Oc)(c,p,h),_p=t.dynCall_viiiiiiii=(c,p,h,g,v,I,O,z,B)=>(_p=t.dynCall_viiiiiiii=G.Pc)(c,p,h,g,v,I,O,z,B),vp=t.dynCall_viiiiiiiiii=(c,p,h,g,v,I,O,z,B,U,Y)=>(vp=t.dynCall_viiiiiiiiii=G.Qc)(c,p,h,g,v,I,O,z,B,U,Y),wp=t.dynCall_jiii=(c,p,h,g)=>(wp=t.dynCall_jiii=G.Rc)(c,p,h,g),xp=t.dynCall_dii=(c,p,h)=>(xp=t.dynCall_dii=G.Sc)(c,p,h),Tp=t.dynCall_viiiiiiiii=(c,p,h,g,v,I,O,z,B,U)=>(Tp=t.dynCall_viiiiiiiii=G.Tc)(c,p,h,g,v,I,O,z,B,U),Ip=t.dynCall_viiiiiiiiiii=(c,p,h,g,v,I,O,z,B,U,Y,ae)=>(Ip=t.dynCall_viiiiiiiiiii=G.Uc)(c,p,h,g,v,I,O,z,B,U,Y,ae),Sp=t.dynCall_iiiiii=(c,p,h,g,v,I)=>(Sp=t.dynCall_iiiiii=G.Vc)(c,p,h,g,v,I),$p=t.dynCall_iij=(c,p,h)=>($p=t.dynCall_iij=G.Wc)(c,p,h),Ap=t.dynCall_iiiiiiiiii=(c,p,h,g,v,I,O,z,B,U)=>(Ap=t.dynCall_iiiiiiiiii=G.Xc)(c,p,h,g,v,I,O,z,B,U),Op=t.dynCall_iiiiiiiiiii=(c,p,h,g,v,I,O,z,B,U,Y)=>(Op=t.dynCall_iiiiiiiiiii=G.Yc)(c,p,h,g,v,I,O,z,B,U,Y),Pp=t.dynCall_vij=(c,p,h)=>(Pp=t.dynCall_vij=G.Zc)(c,p,h),Ep=t.dynCall_iiif=(c,p,h,g)=>(Ep=t.dynCall_iiif=G._c)(c,p,h,g),Cp=t.dynCall_iiij=(c,p,h,g)=>(Cp=t.dynCall_iiij=G.$c)(c,p,h,g),Dp=t.dynCall_fiii=(c,p,h,g)=>(Dp=t.dynCall_fiii=G.ad)(c,p,h,g),kp=t.dynCall_viiiiiiiiiiiii=(c,p,h,g,v,I,O,z,B,U,Y,ae,ve,We)=>(kp=t.dynCall_viiiiiiiiiiiii=G.bd)(c,p,h,g,v,I,O,z,B,U,Y,ae,ve,We),Np=t.dynCall_vjiii=(c,p,h,g,v)=>(Np=t.dynCall_vjiii=G.cd)(c,p,h,g,v),Lp=t.dynCall_vif=(c,p,h)=>(Lp=t.dynCall_vif=G.dd)(c,p,h),Rp=t.dynCall_iiiiiii=(c,p,h,g,v,I,O)=>(Rp=t.dynCall_iiiiiii=G.ed)(c,p,h,g,v,I,O),zp=t.dynCall_iiiij=(c,p,h,g,v)=>(zp=t.dynCall_iiiij=G.fd)(c,p,h,g,v),Mp=t.dynCall_iiiiiiii=(c,p,h,g,v,I,O,z)=>(Mp=t.dynCall_iiiiiiii=G.gd)(c,p,h,g,v,I,O,z),Bp=t.dynCall_viiiiiiiiiiii=(c,p,h,g,v,I,O,z,B,U,Y,ae,ve)=>(Bp=t.dynCall_viiiiiiiiiiii=G.hd)(c,p,h,g,v,I,O,z,B,U,Y,ae,ve),Fp=t.dynCall_diii=(c,p,h,g)=>(Fp=t.dynCall_diii=G.id)(c,p,h,g),Vp=t.dynCall_jiiii=(c,p,h,g,v)=>(Vp=t.dynCall_jiiii=G.jd)(c,p,h,g,v),Gp=t.dynCall_viiij=(c,p,h,g,v)=>(Gp=t.dynCall_viiij=G.kd)(c,p,h,g,v),Up=t.dynCall_fiiii=(c,p,h,g,v)=>(Up=t.dynCall_fiiii=G.ld)(c,p,h,g,v),Wp=t.dynCall_viiif=(c,p,h,g,v)=>(Wp=t.dynCall_viiif=G.md)(c,p,h,g,v),Hp=t.dynCall_diiii=(c,p,h,g,v)=>(Hp=t.dynCall_diiii=G.nd)(c,p,h,g,v),qp=t.dynCall_viiid=(c,p,h,g,v)=>(qp=t.dynCall_viiid=G.od)(c,p,h,g,v),jp=t.dynCall_iiiijii=(c,p,h,g,v,I,O)=>(jp=t.dynCall_iiiijii=G.pd)(c,p,h,g,v,I,O),Kp=t.dynCall_iiiiiij=(c,p,h,g,v,I,O)=>(Kp=t.dynCall_iiiiiij=G.qd)(c,p,h,g,v,I,O),Xp=c=>(Xp=G.rd)(c),Zp=()=>(Zp=G.sd)(),Jp=c=>(Jp=G.td)(c),Yp=()=>(Yp=G.ud)();function P2(c,p,h){var g=me();try{sp(c,p,h)}catch(v){if(he(g),v!==v+0)throw v;_e(1,0)}}function E2(c,p,h){var g=me();try{return ip(c,p,h)}catch(v){if(he(g),v!==v+0)throw v;_e(1,0)}}function C2(c,p){var h=me();try{ap(c,p)}catch(g){if(he(h),g!==g+0)throw g;_e(1,0)}}function D2(c,p){var h=me();try{return $s(c,p)}catch(g){if(he(h),g!==g+0)throw g;_e(1,0)}}function k2(c,p,h,g){var v=me();try{return up(c,p,h,g)}catch(I){if(he(v),I!==I+0)throw I;_e(1,0)}}function N2(c,p,h,g,v){var I=me();try{dp(c,p,h,g,v)}catch(O){if(he(I),O!==O+0)throw O;_e(1,0)}}function L2(c,p,h,g,v){var I=me();try{return cp(c,p,h,g,v)}catch(O){if(he(I),O!==O+0)throw O;_e(1,0)}}function R2(c,p,h,g){var v=me();try{lp(c,p,h,g)}catch(I){if(he(v),I!==I+0)throw I;_e(1,0)}}function z2(c,p,h,g,v,I,O){var z=me();try{return Rp(c,p,h,g,v,I,O)}catch(B){if(he(z),B!==B+0)throw B;_e(1,0)}}function M2(c){var p=me();try{mp(c)}catch(h){if(he(p),h!==h+0)throw h;_e(1,0)}}function B2(c,p,h){var g=me();try{return $p(c,p,h)}catch(v){if(he(g),v!==v+0)throw v;_e(1,0)}}function F2(c,p,h,g,v,I){var O=me();try{gp(c,p,h,g,v,I)}catch(z){if(he(O),z!==z+0)throw z;_e(1,0)}}function V2(c,p,h){var g=me();try{Pp(c,p,h)}catch(v){if(he(g),v!==v+0)throw v;_e(1,0)}}function G2(c,p,h,g,v,I,O){var z=me();try{pp(c,p,h,g,v,I,O)}catch(B){if(he(z),B!==B+0)throw B;_e(1,0)}}function U2(c,p,h,g,v,I,O,z){var B=me();try{fp(c,p,h,g,v,I,O,z)}catch(U){if(he(B),U!==U+0)throw U;_e(1,0)}}function W2(c,p,h,g,v,I){var O=me();try{return Sp(c,p,h,g,v,I)}catch(z){if(he(O),z!==z+0)throw z;_e(1,0)}}function H2(c,p,h,g,v,I,O,z){var B=me();try{return Mp(c,p,h,g,v,I,O,z)}catch(U){if(he(B),U!==U+0)throw U;_e(1,0)}}function q2(c,p,h,g,v,I,O,z,B,U){var Y=me();try{Tp(c,p,h,g,v,I,O,z,B,U)}catch(ae){if(he(Y),ae!==ae+0)throw ae;_e(1,0)}}function j2(c,p,h,g,v,I,O,z,B){var U=me();try{_p(c,p,h,g,v,I,O,z,B)}catch(Y){if(he(U),Y!==Y+0)throw Y;_e(1,0)}}function K2(c){var p=me();try{return bp(c)}catch(h){if(he(p),h!==h+0)throw h;_e(1,0)}}function X2(c,p,h,g,v,I,O,z,B,U){var Y=me();try{return Ap(c,p,h,g,v,I,O,z,B,U)}catch(ae){if(he(Y),ae!==ae+0)throw ae;_e(1,0)}}function Z2(c,p,h){var g=me();try{return yp(c,p,h)}catch(v){if(he(g),v!==v+0)throw v;_e(1,0)}}function J2(c,p,h,g){var v=me();try{return wp(c,p,h,g)}catch(I){if(he(v),I!==I+0)throw I;return _e(1,0),0n}}function Y2(c,p,h){var g=me();try{return xp(c,p,h)}catch(v){if(he(g),v!==v+0)throw v;_e(1,0)}}function Q2(c,p,h,g,v,I,O,z,B,U,Y,ae){var ve=me();try{Ip(c,p,h,g,v,I,O,z,B,U,Y,ae)}catch(We){if(he(ve),We!==We+0)throw We;_e(1,0)}}function e1(c,p,h,g,v,I,O,z,B,U,Y){var ae=me();try{vp(c,p,h,g,v,I,O,z,B,U,Y)}catch(ve){if(he(ae),ve!==ve+0)throw ve;_e(1,0)}}function t1(c,p,h,g,v,I,O,z,B,U,Y){var ae=me();try{return Op(c,p,h,g,v,I,O,z,B,U,Y)}catch(ve){if(he(ae),ve!==ve+0)throw ve;_e(1,0)}}function r1(c,p,h,g){var v=me();try{return Ep(c,p,h,g)}catch(I){if(he(v),I!==I+0)throw I;_e(1,0)}}function n1(c,p,h,g){var v=me();try{return Cp(c,p,h,g)}catch(I){if(he(v),I!==I+0)throw I;_e(1,0)}}function o1(c,p,h,g){var v=me();try{return Dp(c,p,h,g)}catch(I){if(he(v),I!==I+0)throw I;_e(1,0)}}function i1(c,p,h,g,v,I,O,z,B,U,Y,ae,ve,We){var Dt=me();try{kp(c,p,h,g,v,I,O,z,B,U,Y,ae,ve,We)}catch(yo){if(he(Dt),yo!==yo+0)throw yo;_e(1,0)}}function a1(c,p,h,g,v){var I=me();try{Np(c,p,h,g,v)}catch(O){if(he(I),O!==O+0)throw O;_e(1,0)}}function s1(c,p,h){var g=me();try{Lp(c,p,h)}catch(v){if(he(g),v!==v+0)throw v;_e(1,0)}}function u1(c,p){var h=me();try{return hp(c,p)}catch(g){if(he(h),g!==g+0)throw g;return _e(1,0),0n}}function l1(c,p,h,g,v){var I=me();try{return zp(c,p,h,g,v)}catch(O){if(he(I),O!==O+0)throw O;_e(1,0)}}function c1(c,p,h,g,v,I,O,z,B,U,Y,ae,ve){var We=me();try{Bp(c,p,h,g,v,I,O,z,B,U,Y,ae,ve)}catch(Dt){if(he(We),Dt!==Dt+0)throw Dt;_e(1,0)}}function d1(c,p,h,g){var v=me();try{return Fp(c,p,h,g)}catch(I){if(he(v),I!==I+0)throw I;_e(1,0)}}function p1(c,p,h,g,v){var I=me();try{return Vp(c,p,h,g,v)}catch(O){if(he(I),O!==O+0)throw O;return _e(1,0),0n}}function f1(c,p,h,g,v){var I=me();try{Gp(c,p,h,g,v)}catch(O){if(he(I),O!==O+0)throw O;_e(1,0)}}function h1(c,p,h,g,v){var I=me();try{return Up(c,p,h,g,v)}catch(O){if(he(I),O!==O+0)throw O;_e(1,0)}}function m1(c,p,h,g,v){var I=me();try{Wp(c,p,h,g,v)}catch(O){if(he(I),O!==O+0)throw O;_e(1,0)}}function g1(c,p,h,g,v){var I=me();try{return Hp(c,p,h,g,v)}catch(O){if(he(I),O!==O+0)throw O;_e(1,0)}}function b1(c,p,h,g,v){var I=me();try{qp(c,p,h,g,v)}catch(O){if(he(I),O!==O+0)throw O;_e(1,0)}}function y1(c,p,h,g,v,I,O){var z=me();try{return jp(c,p,h,g,v,I,O)}catch(B){if(he(z),B!==B+0)throw B;_e(1,0)}}function _1(c,p,h,g,v,I,O){var z=me();try{return Kp(c,p,h,g,v,I,O)}catch(B){if(he(z),B!==B+0)throw B;_e(1,0)}}return t.stackSave=()=>me(),t.stackRestore=c=>he(c),t.stackAlloc=c=>Ss(c),t.setValue=function(c,p,h="i8"){switch(h.endsWith("*")&&(h="*"),h){case"i1":case"i8":Se()[c>>>0]=p;break;case"i16":Ge()[c>>>1>>>0]=p;break;case"i32":D()[c>>>2>>>0]=p;break;case"i64":oe[c>>>3]=BigInt(p);break;case"float":Pe()[c>>>2>>>0]=p;break;case"double":mt()[c>>>3>>>0]=p;break;case"*":q()[c>>>2>>>0]=p;break;default:jr(`invalid type for setValue: ${h}`)}},t.getValue=function(c,p="i8"){switch(p.endsWith("*")&&(p="*"),p){case"i1":case"i8":return Se()[c>>>0];case"i16":return Ge()[c>>>1>>>0];case"i32":return D()[c>>>2>>>0];case"i64":return oe[c>>>3];case"float":return Pe()[c>>>2>>>0];case"double":return mt()[c>>>3>>>0];case"*":return q()[c>>>2>>>0];default:jr(`invalid type for getValue: ${p}`)}},t.UTF8ToString=et,t.stringToUTF8=qn,t.lengthBytesUTF8=ld,function c(){if(0<Wn)ho=c;else if(s)e(t),_n();else{for(;0<as.length;)as.shift()(t);0<Wn?ho=c:(t.calledRun=!0,pe||(_n(),e(t)))}}(),t.PTR_SIZE=4,o}),w3=d_,x3=globalThis.self?.name?.startsWith("em-pthread");x3&&d_()});var g_,ic,T3,Pt,b_,oc,I3,S3,y_,$3,h_,__,m_,v_,fa=N(()=>{"use strict";pa();g_=typeof location>"u"?void 0:location.origin,ic=import.meta.url>"file:"&&import.meta.url<"file;",T3=()=>{if(!!1){if(ic){let n=URL;return new URL(new n("ort.all.bundle.min.mjs",import.meta.url).href,g_).href}return import.meta.url}},Pt=T3(),b_=()=>{if(Pt&&!Pt.startsWith("blob:"))return Pt.substring(0,Pt.lastIndexOf("/")+1)},oc=(n,e)=>{try{let r=e??Pt;return(r?new URL(n,r):new URL(n)).origin===g_}catch{return!1}},I3=(n,e)=>{let r=e??Pt;try{return(r?new URL(n,r):new URL(n)).href}catch{return}},S3=(n,e)=>`${e??"./"}${n}`,y_=async n=>{let r=await(await fetch(n,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},$3=async n=>(await import(/*webpackIgnore:true*/n)).default,h_=(c_(),Kn(l_)).default,__=async()=>{if(!Pt)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(oc(Pt))return[void 0,h_()];let n=await y_(Pt);return[n,h_(n)]},m_=(f_(),Kn(p_)).default,v_=async(n,e,r)=>{if(!n&&!e&&m_&&Pt&&oc(Pt))return[void 0,m_];{let t="ort-wasm-simd-threaded.jsep.mjs",o=n??I3(t,e),i=!!1&&r&&o&&!oc(o,e),a=i?await y_(o):o??S3(t,e);return[i?a:void 0,await $3(a)]}}});var ac,sc,xa,w_,A3,O3,ha,Me,mn=N(()=>{"use strict";fa();sc=!1,xa=!1,w_=!1,A3=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},O3=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},ha=async n=>{if(sc)return Promise.resolve();if(xa)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(w_)throw new Error("previous call to 'initializeWebAssembly()' failed.");xa=!0;let e=n.initTimeout,r=n.numThreads;if(!O3())throw new Error("WebAssembly SIMD is not supported in the current environment.");let t=A3();r>1&&!t&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),n.numThreads=r=1);let o=n.wasmPaths,i=typeof o=="string"?o:void 0,a=o?.mjs,s=a?.href??a,u=o?.wasm,l=u?.href??u,d=n.wasmBinary,[f,m]=await v_(s,i,r>1),b=!1,y=[];if(e>0&&y.push(new Promise(_=>{setTimeout(()=>{b=!0,_()},e)})),y.push(new Promise((_,T)=>{let w={numThreads:r};if(d)w.wasmBinary=d;else if(l||i)w.locateFile=x=>l??i+x;else if(s&&s.indexOf("blob:")!==0)w.locateFile=x=>new URL(x,s).href;else if(f){let x=b_();x&&(w.locateFile=S=>x+S)}m(w).then(x=>{xa=!1,sc=!0,ac=x,_(),f&&URL.revokeObjectURL(f)},x=>{xa=!1,w_=!0,T(x)})})),await Promise.race(y),b)throw new Error(`WebAssembly backend initializing failed due to timeout: ${e}ms`)},Me=()=>{if(sc&&ac)return ac;throw new Error("WebAssembly is not initialized yet.")}});var Et,Fo,ke,Ta=N(()=>{"use strict";mn();Et=(n,e)=>{let r=Me(),t=r.lengthBytesUTF8(n)+1,o=r._malloc(t);return r.stringToUTF8(n,o,t),e.push(o),o},Fo=(n,e,r,t)=>{if(typeof n=="object"&&n!==null){if(r.has(n))throw new Error("Circular reference in options");r.add(n)}Object.entries(n).forEach(([o,i])=>{let a=e?e+o:o;if(typeof i=="object")Fo(i,a+".",r,t);else if(typeof i=="string"||typeof i=="number")t(a,i.toString());else if(typeof i=="boolean")t(a,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},ke=n=>{let e=Me(),r=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetLastError(o,o+t);let i=Number(e.getValue(o,t===4?"i32":"i64")),a=e.getValue(o+t,"*"),s=a?e.UTF8ToString(a):"";throw new Error(`${n} ERROR_CODE: ${i}, ERROR_MESSAGE: ${s}`)}finally{e.stackRestore(r)}}});var x_,T_=N(()=>{"use strict";mn();Ta();x_=n=>{let e=Me(),r=0,t=[],o=n||{};try{if(n?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof n.logSeverityLevel!="number"||!Number.isInteger(n.logSeverityLevel)||n.logSeverityLevel<0||n.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${n.logSeverityLevel}`);if(n?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof n.logVerbosityLevel!="number"||!Number.isInteger(n.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${n.logVerbosityLevel}`);n?.terminate===void 0&&(o.terminate=!1);let i=0;return n?.tag!==void 0&&(i=Et(n.tag,t)),r=e._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),r===0&&ke("Can't create run options."),n?.extra!==void 0&&Fo(n.extra,"",new WeakSet,(a,s)=>{let u=Et(a,t),l=Et(s,t);e._OrtAddRunConfigEntry(r,u,l)!==0&&ke(`Can't set a run config entry: ${a} - ${s}.`)}),[r,t]}catch(i){throw r!==0&&e._OrtReleaseRunOptions(r),t.forEach(a=>e._free(a)),i}}});var P3,E3,C3,Ia,D3,I_,S_=N(()=>{"use strict";mn();Ta();P3=n=>{switch(n){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${n}`)}},E3=n=>{switch(n){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${n}`)}},C3=n=>{n.extra||(n.extra={}),n.extra.session||(n.extra.session={});let e=n.extra.session;e.use_ort_model_bytes_directly||(e.use_ort_model_bytes_directly="1"),n.executionProviders&&n.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(n.enableMemPattern=!1)},Ia=(n,e,r,t)=>{let o=Et(e,t),i=Et(r,t);Me()._OrtAddSessionConfigEntry(n,o,i)!==0&&ke(`Can't set a session config entry: ${e} - ${r}.`)},D3=async(n,e,r)=>{for(let t of e){let o=typeof t=="string"?t:t.name,i=[];switch(o){case"webnn":if(o="WEBNN",typeof t!="string"){let f=t?.deviceType;f&&Ia(n,"deviceType",f,r)}break;case"webgpu":if(o="JS",typeof t!="string"){let d=t;if(d?.preferredLayout){if(d.preferredLayout!=="NCHW"&&d.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${d.preferredLayout}`);Ia(n,"preferredLayout",d.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let a=Et(o,r),s=i.length,u=0,l=0;if(s>0){u=Me()._malloc(s*Me().PTR_SIZE),r.push(u),l=Me()._malloc(s*Me().PTR_SIZE),r.push(l);for(let d=0;d<s;d++)Me().setValue(u+d*Me().PTR_SIZE,i[d][0],"*"),Me().setValue(l+d*Me().PTR_SIZE,i[d][1],"*")}await Me()._OrtAppendExecutionProvider(n,a,u,l,s)!==0&&ke(`Can't append execution provider: ${o}.`)}},I_=async n=>{let e=Me(),r=0,t=[],o=n||{};C3(o);try{let i=P3(o.graphOptimizationLevel??"all"),a=E3(o.executionMode??"sequential"),s=typeof o.logId=="string"?Et(o.logId,t):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log serverity level is not valid: ${u}`);let l=o.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let d=typeof o.optimizedModelFilePath=="string"?Et(o.optimizedModelFilePath,t):0;if(r=e._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,a,!!o.enableProfiling,0,s,u,l,d),r===0&&ke("Can't create session options."),o.executionProviders&&await D3(r,o.executionProviders,t),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);Ia(r,"enableGraphCapture",o.enableGraphCapture.toString(),t)}if(o.freeDimensionOverrides)for(let[f,m]of Object.entries(o.freeDimensionOverrides)){if(typeof f!="string")throw new Error(`free dimension override name must be a string: ${f}`);if(typeof m!="number"||!Number.isInteger(m)||m<0)throw new Error(`free dimension override value must be a non-negative integer: ${m}`);let b=Et(f,t);e._OrtAddFreeDimensionOverride(r,b,m)!==0&&ke(`Can't set a free dimension override: ${f} - ${m}.`)}return o.extra!==void 0&&Fo(o.extra,"",new WeakSet,(f,m)=>{Ia(r,f,m,t)}),[r,t]}catch(i){throw r!==0&&e._OrtReleaseSessionOptions(r)!==0&&ke("Can't release session options."),t.forEach(a=>e._free(a)),i}}});var so,Br,gn,Sa,Vo,$a,Aa,uc,de=N(()=>{"use strict";so=n=>{switch(n){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${n}`)}},Br=n=>{switch(n){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${n}`)}},gn=(n,e)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][n],t=typeof e=="number"?e:e.reduce((o,i)=>o*i,1);return r>0?Math.ceil(t*r):void 0},Sa=n=>{switch(n){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${n}`)}},Vo=n=>{switch(n){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${n}`)}},$a=n=>n==="float32"||n==="float16"||n==="int32"||n==="int64"||n==="uint32"||n==="uint8"||n==="bool"||n==="uint4"||n==="int4",Aa=n=>n==="float32"||n==="float16"||n==="int32"||n==="int64"||n==="uint32"||n==="uint64"||n==="int8"||n==="uint8"||n==="bool"||n==="uint4"||n==="int4",uc=n=>{switch(n){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${n}`)}}});var Go,lc=N(()=>{"use strict";pa();Go=async n=>{if(typeof n=="string")if(!1)try{let{readFile:e}=As("node:fs/promises");return new Uint8Array(await e(n))}catch(e){if(e.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=As("node:fs"),t=r(n),o=[];for await(let i of t)o.push(i);return new Uint8Array(Buffer.concat(o))}throw e}else{let e=await fetch(n);if(!e.ok)throw new Error(`failed to load external data file: ${n}`);let r=e.headers.get("Content-Length"),t=r?parseInt(r,10):0;if(t<1073741824)return new Uint8Array(await e.arrayBuffer());{if(!e.body)throw new Error(`failed to load external data file: ${n}, no response body.`);let o=e.body.getReader(),i;try{i=new ArrayBuffer(t)}catch(s){if(s instanceof RangeError){let u=Math.ceil(t/65536);i=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw s}let a=0;for(;;){let{done:s,value:u}=await o.read();if(s)break;let l=u.byteLength;new Uint8Array(i,a,l).set(u),a+=l}return new Uint8Array(i,0,t)}}else return n instanceof Blob?new Uint8Array(await n.arrayBuffer()):n instanceof Uint8Array?n:new Uint8Array(n)}});var k3,N3,$_,A_,Oa,L3,xe,Fr=N(()=>{"use strict";de();k3=["V","I","W","E","F"],N3=(n,e)=>{console.log(`[${k3[n]},${new Date().toISOString()}]${e}`)},Oa=(n,e)=>{$_=n,A_=e},L3=(n,e)=>{let r=Vo(n),t=Vo($_);r>=t&&N3(r,typeof e=="function"?e():e)},xe=(...n)=>{A_&&L3(...n)}});var cc,Vr,k,Mn,Pa,O_,P_,be=N(()=>{"use strict";cc=class{static calcMatMulShape(e,r){return e[1]!==r[0]?void 0:[e[0],r[1]]}},Vr=class{static calcShape(e,r,t=!1){let o=e.length,i=r.length;if(o===0)return r;if(i===0)return e;let a=Math.max(e.length,r.length),s=new Array(a);if(t){if(o<2||i<2)return;let u=cc.calcMatMulShape([e[o-2],e[o-1]],[r[i-2],r[i-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=t?3:1;u<=a;u++){let l=o-u<0?1:e[o-u],d=i-u<0?1:r[i-u];if(l!==d&&l>1&&d>1)return;let f=Math.max(l,d);if(l&&d)s[a-u]=Math.max(l,d);else{if(f>1)return;s[a-u]=0}}return s}static isValidBroadcast(e,r){let t=e.length,o=r.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==r[o-i])return!1;return!0}},k=class n{static size(e){return n.getSizeFromDimensionRange(e,0,e.length)}static convertShape(e,r=4){let t=e.length;if(t===0)return[];let o=new Array(t),i=t-1;for(;i>=0;){if(e[i]%r===0){o[i]=e[i]/r;break}if(r%e[i]!==0)throw new Error("cannot convert shape");o[i]=1,r/=e[i],i--}for(i--;i>=0;i--)o[i]=e[i];return o}static sizeFromDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,r,e.length)}static sizeToDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,0,r)}static getSizeFromDimensionRange(e,r,t){let o=1;for(let i=r;i<t;i++){if(e[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(e[i])}return o}static computeStrides(e){let r=e.length;if(r===0)return[];if(r===1)return[1];let t=new Array(r);t[r-1]=1,t[r-2]=e[r-1];for(let o=r-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static normalizeAxis(e,r){if(e<-r&&e>=r)throw new Error("unsupported axis for this operation.");return e<0?e+r:e}static normalizeAxes(e,r){return e.map(t=>this.normalizeAxis(t,r??e.length))}static sortBasedOnPerm(e,r){return r?r.map(t=>e[t]):e.slice().reverse()}static padShape(e,r){let t=e.length;return e.map((o,i)=>o+r[i]+r[i+t])}static areEqual(e,r){return e.length!==r.length?!1:e.every((t,o)=>t===r[o])}},Mn=class n{static adjustPoolAttributes(e,r,t,o,i,a){if(!e&&t.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let s=0;s<r.length-2;s++)s>=t.length?t.push(r[s+2]):t[s]=r[s+2];for(let s=0;s<t.length;s++)if(s<o.length){if(o[s]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let s=0;s<t.length;s++)if(s<i.length){if(i[s]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let s=0;s<t.length*2;s++)if(s<a.length){if(a[s]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let s=0;s<t.length;s++){if(t[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[s]>=t[s]||a[s+t.length]>=t[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,r,t,o,i,a,s){if(s){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<e.length-2;u++)n.adjustPadAndReturnShape(e[u+(a?1:2)],r[u],t[u],o[u],i,u,u+e.length-2,s)}}static computePoolOutputShape(e,r,t,o,i,a,s){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return n.computeShapeHelper(e,r,u,t,o,i,a,s),u}static computeConvOutputShape(e,r,t,o,i,a,s){if(e.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],r[0]];return n.computeShapeHelper(!1,e,u,t,o,i,a,s),u}static computeShapeHelper(e,r,t,o,i,a,s,u){if(e)for(let l=0;l<r.length-2;l++)t.push(1);else for(let l=0;l<r.length-2;l++)t.push(n.adjustPadAndReturnShape(r[l+2],o[l],i[l],a[l],s,l,l+r.length-2,u))}static adjustPadAndReturnShape(e,r,t,o,i,a,s,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[a]=0,i[s]=0,Math.floor((e-l)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let f=((e+r-1)/r-1)*r+o-e;return i[a]=Math.floor(u==="SAME_LOWER"?(f+1)/2:f/2),i[s]=f-i[a],Math.floor((e+f-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[a]+i[s]-l)/r+1)}},Pa=class{static getShapeOfGemmResult(e,r,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let a,s,u;r?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(i&&!Vr.isValidBroadcast(i,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},O_=-34028234663852886e22,P_=34028234663852886e22});var Ea,dc=N(()=>{"use strict";de();Ea=(n,e)=>new(Sa(e))(n)});var fc,C_,R3,E_,z3,D_,Ca,Da,pc,k_,N_=N(()=>{"use strict";Fr();fc=(n,e=!0)=>{if(n.byteLength%8!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 8 (BigInt).");let r=n.byteLength/8,t=new BigInt64Array(n.buffer,n.byteOffset,r),o=new Int32Array(r);for(let i=0;i<r;i++){let a=t[i];if(a>2147483647n||a<-2147483648n)throw new Error(`Overflow occurred when converting BigInt to Int32 at index ${i}: ${a}`);o[i]=Number(a)}return e?new Uint8Array(o.buffer):o},C_=(n,e=!0)=>{if(n.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (Int32).");let r=n.byteLength/4,t=new Int32Array(n.buffer,n.byteOffset,r),o=BigInt64Array.from(t,BigInt);return e?new Uint8Array(o.buffer):o},R3=1,E_=()=>R3++,z3=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),D_=(n,e)=>{let r=z3.get(n);if(!r)throw new Error("Unsupported data type.");return e.length>0?Math.ceil(e.reduce((t,o)=>t*o)*r/8):0},Ca=class{constructor(e){this.shouldConvertInt64toInt32=!1;this.isInt64ToInt32Converted=!1;let{sessionId:r,context:t,tensor:o,dataType:i,shape:a,shouldConvertInt64toInt32:s=!1}=e;this.sessionId=r,this.mlContext=t,this.mlTensor=o,this.dataType=i,this.tensorShape=a,this.shouldConvertInt64toInt32=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return D_(this.dataType,this.tensorShape)}destroy(){xe("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e,r){if(e){let t=await this.mlContext.readTensor(this.mlTensor),o=C_(new Uint8Array(t));if(r){(r instanceof ArrayBuffer?new Uint8Array(r):new Uint8Array(r.buffer,r.byteOffset,r.byteLength)).set(o);return}else return o.buffer}else return r?this.mlContext.readTensor(this.mlTensor,r):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,r,t){return this.mlContext===e&&this.dataType===r&&this.tensorShape.length===t.length&&this.tensorShape.every((o,i)=>o===t[i])}setIsInt64ToInt32Converted(e){this.isInt64ToInt32Converted=e}},Da=class{constructor(e,r){this.tensorManager=e;this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,r,t,o){let i=r,a=this.tensorManager.getMLContext(e),s=i==="int64"&&!a.opSupportLimits().input.dataTypes.includes("int64");if(s&&(i="int32",xe("verbose",()=>"[WebNN] TensorIdTracker.ensureTensor: convert dataType from int64 to int32")),this.wrapper){if(this.wrapper.canReuseTensor(a,i,t))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==D_(i,t))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,i,t,u,!0,!0,s),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let r=e;if(this.wrapper)if(this.wrapper.shouldConvertInt64toInt32&&(r=fc(e,!0),this.wrapper.setIsInt64ToInt32Converted(!0)),r.byteLength===this.wrapper.byteLength){this.wrapper.write(r);return}else xe("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(r):this.activeUpload=new Uint8Array(r)}async download(e){if(this.activeUpload){let r=this.wrapper?.isInt64ToInt32Converted?C_(this.activeUpload):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(r):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(r);return}else return r.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(this.wrapper?.shouldConvertInt64toInt32,e):this.wrapper.read(this.wrapper?.shouldConvertInt64toInt32)}},pc=class{constructor(e){this.backend=e;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}getMLContext(e){let r=this.backend.getMLContext(e);if(!r)throw new Error("MLContext not found for session.");return r}reserveTensorId(){let e=E_();return this.tensorTrackersById.set(e,new Da(this)),e}releaseTensorId(e){let r=this.tensorTrackersById.get(e);r&&(this.tensorTrackersById.delete(e),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(e,r,t,o,i){xe("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${r}, dataType: ${t}, shape: ${o}, copyOld: ${i}}`);let a=this.tensorTrackersById.get(r);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,t,o,i)}upload(e,r){let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");t.upload(r)}async download(e,r){xe("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${r?.byteLength}}`);let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");return t.download(r)}releaseTensorsForSession(e){for(let r of this.freeTensors)r.sessionId===e&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==e)}registerTensor(e,r,t,o){let i=this.getMLContext(e),a=E_(),s=new Ca({sessionId:e,context:i,tensor:r,dataType:t,shape:o});return this.tensorTrackersById.set(a,new Da(this,s)),this.externalTensors.add(s),a}async getCachedTensor(e,r,t,o,i,a,s=!1){let u=this.getMLContext(e);for(let[d,f]of this.freeTensors.entries())if(f.canReuseTensor(u,r,t)){xe("verbose",()=>`[WebNN] Reusing tensor {dataType: ${r}, shape: ${t}}`);let m=this.freeTensors.splice(d,1)[0];return m.sessionId=e,m}xe("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${r}, shape: ${t}}`);let l=await u.createTensor({dataType:r,shape:t,dimensions:t,usage:o,writable:i,readable:a});return new Ca({sessionId:e,context:u,tensor:l,dataType:r,shape:t,shouldConvertInt64toInt32:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},k_=(...n)=>new pc(...n)});var hc,M3,ka,L_=N(()=>{"use strict";de();mn();dc();N_();Fr();hc=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),M3=(n,e)=>{if(n===e)return!0;if(n===void 0||e===void 0)return!1;let r=Object.keys(n).sort(),t=Object.keys(e).sort();return r.length===t.length&&r.every((o,i)=>o===t[i]&&n[o]===e[o])},ka=class{constructor(e){this.tensorManager=k_(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];this.sessionGraphInputs=new Map;this.temporaryGraphInputs=[];this.temporarySessionTensorIds=new Map;Oa(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){xe("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){xe("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let r=this.temporarySessionTensorIds.get(e);if(r){for(let t of r)xe("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(o=>o.gpuDevice===e);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:o}),o}}else if(e===void 0){let t=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let r=this.mlContextCache.findIndex(t=>M3(t.options,e));if(r!==-1)return this.mlContextCache[r].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}registerMLContext(e,r){this.mlContextBySessionId.set(e,r);let t=this.sessionIdsByMLContext.get(r);t||(t=new Set,this.sessionIdsByMLContext.set(r,t)),t.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e);let r=this.mlContextBySessionId.get(e);if(!r)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let t=this.sessionIdsByMLContext.get(r);if(t.delete(e),t.size===0){this.sessionIdsByMLContext.delete(r);let o=this.mlContextCache.findIndex(i=>i.mlContext===r);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){xe("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,r,t,o,i){let a=hc.get(t);if(!a)throw new Error(`Unsupported ONNX data type: ${t}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,r,a,o,i)}async createTemporaryTensor(e,r,t){xe("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${r}, shape: ${t}}`);let o=hc.get(r);if(!o)throw new Error(`Unsupported ONNX data type: ${r}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,o,t,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,r){if(!Me().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");xe("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${r.byteLength}}`),this.tensorManager.upload(e,r)}async downloadTensor(e,r){return this.tensorManager.download(e,r)}createMLTensorDownloader(e,r){return async()=>{let t=await this.tensorManager.download(e);return Ea(t,r)}}registerMLTensor(e,r,t,o){let i=hc.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.registerTensor(e,r,i,o);return xe("verbose",()=>`[WebNN] registerMLTensor {tensor: ${r}, dataType: ${i}, dimensions: ${o}} -> {tensorId: ${a}}`),a}registerMLConstant(e,r,t,o,i,a,s=!1){if(!a)throw new Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let l=a.get(u);if(!l)throw new Error(`File with name ${u} not found in preloaded files.`);if(r+t>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let d=l.slice(r,r+t).buffer,f;switch(i.dataType){case"float32":f=new Float32Array(d);break;case"float16":f=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(d):new Uint16Array(d);break;case"int32":f=new Int32Array(d);break;case"uint32":f=new Uint32Array(d);break;case"int64":s?(f=fc(new Uint8Array(d),!1),i.dataType="int32"):f=new BigInt64Array(d);break;case"uint64":f=new BigUint64Array(d);break;case"int8":f=new Int8Array(d);break;case"int4":case"uint4":case"uint8":f=new Uint8Array(d);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return xe("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),o.constant(i,f)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}isGraphInput(e,r){let t=this.sessionGraphInputs.get(e);return t?t.includes(r):!1}isInt64Supported(e){return!!this.mlContextBySessionId.get(e)?.opSupportLimits().input.dataTypes.includes("int64")}flush(){}}});var Na=N(()=>{"use strict"});var R_,mc,gc,B3,F3,z_,yc,bc,B_,F_=N(()=>{"use strict";Fr();Na();R_=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),mc=[],gc=n=>Math.ceil(Number(n)/16)*16,B3=n=>{for(let e=0;e<mc.length;e++){let r=mc[e];if(n<=r)return r}return Math.ceil(n/16)*16},F3=1,z_=()=>F3++,yc=async(n,e,r,t)=>{let o=gc(r),i=n.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=n.getCommandEncoder();n.endComputePass(),a.copyBufferToBuffer(e,0,i,0,o),n.flush(),await i.mapAsync(GPUMapMode.READ);let s=i.getMappedRange();if(t){let u=t();return u.set(new Uint8Array(s,0,r)),u}else return new Uint8Array(s.slice(0,r))}finally{i.destroy()}},bc=class{constructor(e){this.backend=e;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[r]of R_)mc.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(e,r){let t=r.buffer,o=r.byteOffset,i=r.byteLength,a=gc(i),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${i}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=u.getMappedRange();new Uint8Array(l).set(new Uint8Array(t,o,i)),u.unmap();let d=this.backend.device.createCommandEncoder();d.copyBufferToBuffer(u,0,s.gpuData.buffer,0,a),this.backend.device.queue.submit([d.finish()]),u.destroy(),xe("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,r){let t=this.storageCache.get(e);if(!t)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(t.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=gc(t.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(t.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(e,r,t){let o;if(t){if(o=t[0],e===t[1])return xe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=z_();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:e},originalSize:r}),xe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),xe("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let t=B3(e),o,i=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let l=(i?this.freeBuffers:this.freeUniformBuffers).get(t);l?l.length>0?o=l.pop():o=this.backend.device.createBuffer({size:t,usage:r}):o=this.backend.device.createBuffer({size:t,usage:r})}else o=this.backend.device.createBuffer({size:t,usage:r});let s={id:z_(),type:0,buffer:o};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),xe("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let r=typeof e=="bigint"?Number(e):e,t=this.storageCache.get(r);if(!t){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return xe("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${t.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(t.gpuData.buffer),t.originalSize}async download(e,r){let t=this.storageCache.get(Number(e));if(!t)throw new Error("data does not exist");await yc(this.backend,t.gpuData.buffer,t.originalSize,r)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let r=R_.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let t=this.freeBuffers.get(e.size)||[];r===void 0||t.length>=r?e.destroy():t.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let t=this.freeUniformBuffers.get(e.size)||[];r===void 0||t.length>=r?e.destroy():t.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let r of this.buffersPending)e.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let r=this.capturedPendingBuffers.get(e);r&&(r.forEach(t=>{t.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(xe("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.storageCache=new Map)}},B_=(...n)=>new bc(...n)});var _c,ce,Qe=N(()=>{"use strict";_c=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},ce=n=>new _c(n)});var Bn,wc,Ve,st,W,Ee,xc,Fn,Xt,Q,La,R,V,V_,Ra,vc,G_,we=N(()=>{"use strict";de();be();Bn=64,wc=(n,e)=>{if(e===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(n)){case 10:return e>1?`vec${e}<f16>`:"f16";case 1:return e>1?`vec${e}<f32>`:"f32";case 6:return e>1?`vec${e}<i32>`:"i32";case 12:return e>1?`vec${e}<u32>`:"u32";case 7:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(e!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${n}`)}},Ve=(n,e=1)=>{let r=wc(n,e);return typeof r=="string"?r:r[0]},st=(n,e=1)=>{let r=wc(n,e);return typeof r=="string"?r:r[1]},W=(...n)=>{let e=[];return n.forEach(r=>{r.length!==0&&e.push({type:12,data:r},{type:12,data:k.computeStrides(r)})}),e},Ee=n=>n%4===0?4:n%2===0?2:1,xc=(n="f32",e,r="0")=>!e||e===1?`${n}(${r})`:`vec${e}<${n}>(${r})`,Fn=(n,e,r)=>n==="f32"?r:e===1?`f32(${r})`:`vec${e}<f32>(${r})`,Xt=(n,e)=>e===4?`(${n}.x + ${n}.y + ${n}.z + ${n}.w)`:e===2?`(${n}.x + ${n}.y)`:e===3?`(${n}.x + ${n}.y + ${n}.z)`:n,Q=(n,e,r,t)=>n.startsWith("uniforms.")&&r>4?typeof e=="string"?t==="f16"?`${n}[(${e}) / 8][(${e}) % 8 / 4][(${e}) % 8 % 4]`:`${n}[(${e}) / 4][(${e}) % 4]`:t==="f16"?`${n}[${Math.floor(e/8)}][${Math.floor(e%8/4)}][${e%8%4}]`:`${n}[${Math.floor(e/4)}][${e%4}]`:r>1?`${n}[${e}]`:n,La=(n,e,r,t,o)=>{let i=typeof r=="number",a=i?r:r.length,s=[...new Array(a).keys()],u=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,l=wc(e,o),d=typeof l=="string"?l:l[1],f=typeof l=="string"?l:l[0],m={indices:u,value:d,storage:f,tensor:e},b=D=>typeof D=="string"?D:`${D}u`,y={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},_=i?"uniforms.":"",T=`${_}${n}_shape`,w=`${_}${n}_strides`,x="";for(let D=0;D<a-1;D++)x+=`
    let dim${D} = current / ${Q(w,D,a)};
    let rest${D} = current % ${Q(w,D,a)};
    indices[${D}] = dim${D};
    current = rest${D};
    `;x+=`indices[${a-1}] = current;`;let S=a<2?"":`
  fn o2i_${n}(offset: u32) -> ${m.indices} {
    var indices: ${m.indices};
    var current = offset;
    ${x}
    return indices;
  }`,A=D=>(y.offsetToIndices=!0,a<2?D:`o2i_${n}(${D})`),P=[];if(a>=2)for(let D=a-1;D>=0;D--)P.push(`${Q(w,D,a)} * (indices[${D}])`);let C=a<2?"":`
  fn i2o_${n}(indices: ${m.indices}) -> u32 {
    return ${P.join("+")};
  }`,L=D=>(y.indicesToOffset=!0,a<2?D:`i2o_${n}(${D})`),M=(...D)=>a===0?"0u":`${m.indices}(${D.map(b).join(",")})`,F=(D,q)=>a<2?`${D}`:`${Q(D,q,a)}`,X=(D,q,Pe)=>a<2?`${D}=${Pe};`:`${Q(D,q,a)}=${Pe};`,ee={},ie=(D,q)=>{y.broadcastedIndicesToOffset=!0;let Pe=`${q.name}broadcastedIndicesTo${n}Offset`;if(Pe in ee)return`${Pe}(${D})`;let mt=[];for(let Ke=a-1;Ke>=0;Ke--){let Xe=q.indicesGet("outputIndices",Ke+q.rank-a);mt.push(`${F(w,Ke)} * (${Xe} % ${F(T,Ke)})`)}return ee[Pe]=`fn ${Pe}(outputIndices: ${q.type.indices}) -> u32 {
             return ${mt.length>0?mt.join("+"):"0u"};
           }`,`${Pe}(${D})`},j=(D,q)=>(()=>{if(m.storage===m.value)return`${n}[${D}]=${q};`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`${n}[${D}]=vec2<u32>(u32(${q}), select(0u, 0xFFFFFFFFu, ${q} < 0));`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`${n}[${D}]=vec2<u32>(u32(${q}), 0u);`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`${n}[${D}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${q}));`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),oe=D=>(()=>{if(m.storage===m.value)return`${n}[${D}]`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`i32(${n}[${D}].x)`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`u32(${n}[${D}].x)`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`vec4<bool>(bool(${n}[${D}] & 0xFFu), bool(${n}[${D}] & 0xFF00u), bool(${n}[${D}] & 0xFF0000u), bool(${n}[${D}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),Ue=a<2?"":`
  fn get_${n}ByIndices(indices: ${m.indices}) -> ${d} {
    return ${oe(`i2o_${n}(indices)`)};
  }`,J=a<2?"":(()=>{let D=s.map(Pe=>`d${Pe}: u32`).join(", "),q=s.map(Pe=>`d${Pe}`).join(", ");return`
  fn get_${n}(${D}) -> ${d} {
    return get_${n}ByIndices(${M(q)});
  }`})(),te=(...D)=>{if(D.length!==a)throw new Error(`indices length must be ${a}`);let q=D.map(b).join(",");return a===0?oe("0u"):a===1?oe(q[0]):(y.get=!0,y.getByIndices=!0,y.indicesToOffset=!0,`get_${n}(${q})`)},pe=D=>a<2?oe(D):(y.getByIndices=!0,y.indicesToOffset=!0,`get_${n}ByIndices(${D})`),ue=a<2?"":`
  fn set_${n}ByIndices(indices: ${m.indices}, value: ${d}) {
    ${j(`i2o_${n}(indices)`,"value")}
  }`,Se=a<2?"":(()=>{let D=s.map(Pe=>`d${Pe}: u32`).join(", "),q=s.map(Pe=>`d${Pe}`).join(", ");return`
  fn set_${n}(${D}, value: ${d}) {
    set_${n}ByIndices(${M(q)}, value);
  }`})();return{impl:()=>{let D=[],q=!1;return y.offsetToIndices&&(D.push(S),q=!0),y.indicesToOffset&&(D.push(C),q=!0),y.broadcastedIndicesToOffset&&(Object.values(ee).forEach(Pe=>D.push(Pe)),q=!0),y.set&&(D.push(Se),q=!0),y.setByIndices&&(D.push(ue),q=!0),y.get&&(D.push(J),q=!0),y.getByIndices&&(D.push(Ue),q=!0),!i&&q&&D.unshift(`const ${T} = ${m.indices}(${r.join(",")});`,`const ${w} = ${m.indices}(${k.computeStrides(r).join(",")});`),D.join(`
`)},type:m,offsetToIndices:A,indicesToOffset:L,broadcastedIndicesToOffset:ie,indices:M,indicesGet:F,indicesSet:X,set:(...D)=>{if(D.length!==a+1)throw new Error(`indices length must be ${a}`);let q=D[a];if(typeof q!="string")throw new Error("value must be string");let Pe=D.slice(0,a).map(b).join(",");return a===0?j("0u",q):a===1?j(Pe[0],q):(y.set=!0,y.setByIndices=!0,y.indicesToOffset=!0,`set_${n}(${Pe}, ${q})`)},setByOffset:j,setByIndices:(D,q)=>a<2?j(D,q):(y.setByIndices=!0,y.indicesToOffset=!0,`set_${n}ByIndices(${D}, ${q});`),get:te,getByOffset:oe,getByIndices:pe,usage:t,name:n,strides:w,shape:T,rank:a}},R=(n,e,r,t=1)=>La(n,e,r,"input",t),V=(n,e,r,t=1)=>La(n,e,r,"output",t),V_=(n,e,r)=>La(n,e,r,"atomicOutput",1),Ra=(n,e,r,t=1)=>La(n,e,r,"internal",t),vc=class{constructor(e,r){this.normalizedDispatchGroup=e;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Bn){let r=typeof e=="number"?e:e[0],t=typeof e=="number"?1:e[1],o=typeof e=="number"?1:e[2];if(r>this.limits.maxComputeWorkgroupSizeX||t>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${t}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*t*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${t}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
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
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[e(r.type),r.length??1])}},G_=(n,e)=>new vc(n,e)});var V3,U_,G3,U3,W3,H3,ut,W_,H_,Yr=N(()=>{"use strict";de();be();Qe();we();V3=(n,e)=>{if(!n||n.length!==1)throw new Error("Transpose requires 1 input.");if(e.length!==0&&e.length!==n[0].dims.length)throw new Error(`perm size ${e.length} does not match input rank ${n[0].dims.length}`)},U_=(n,e)=>e.length!==0?e:[...new Array(n).keys()].reverse(),G3=(n,e)=>k.sortBasedOnPerm(n,U_(n.length,e)),U3=(n,e,r,t)=>{let o=`fn perm(i: ${t.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let i=0;i<e;++i)o+=`a[${n[i]}]=i[${i}];`;return o+="return a;}"},W3=(n,e)=>{let r=[],t=[];for(let o=0;o<n.length;++o)n[o]!==1&&r.push(n[o]),n[e[o]]!==1&&t.push(e[o]);return{newShape:r,newPerm:t}},H3=(n,e)=>{let r=0;for(let t=0;t<n.length;++t)if(e[n[t]]!==1){if(n[t]<r)return!1;r=n[t]}return!0},ut=(n,e)=>{let r=n.dataType,t=n.dims.length,o=U_(t,e),i=G3(n.dims,o),a=n.dims,s=i,u=t<2||H3(o,n.dims),l;if(u)return l=_=>{let T=R("input",r,a,4),w=V("output",r,s,4);return`
  ${_.registerUniform("output_size","u32").declareVariables(T,w)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=k.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(_/64/4)},programUniforms:[{type:12,data:Math.ceil(_/4)}]}},getShaderSource:l};let{newShape:d,newPerm:f}=W3(n.dims,o),m=k.areEqual(f,[2,3,1]),b=k.areEqual(f,[3,1,2]);if(d.length===2||m||b){a=m?[d[0],d[1]*d[2]]:b?[d[0]*d[1],d[2]]:d,s=[a[1],a[0]];let _=16;return l=T=>{let w=R("a",r,a.length),x=V("output",r,s.length);return`
  ${T.registerUniform("output_size","u32").declareVariables(w,x)}
  var<workgroup> tile : array<array<${x.type.value}, ${_+1}>, ${_}>;
  ${T.mainStart([_,_,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${_} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${_}u + local_id.x;
    let input_row = workgroup_id_x * ${_}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${w.getByIndices(`${w.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${_}u + local_id.x;
    let output_row = workgroup_id_y * ${_}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${x.setByIndices(`${x.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let T=k.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(s[1]/_),y:Math.ceil(s[0]/_)},programUniforms:[{type:12,data:T},...W(a,s)]}},getShaderSource:l}}return l=_=>{let T=R("a",r,a.length),w=V("output",r,s.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(T,w)}

  ${U3(o,t,T,w)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${w.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${w.setByOffset("global_idx",T.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${e}`,inputDependencies:["rank"]},getRunData:()=>{let _=k.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...W(a,s)]}},getShaderSource:l}},W_=(n,e)=>{V3(n.inputs,e.perm),n.compute(ut(n.inputs[0],e.perm))},H_=n=>ce({perm:n.perm})});var q3,j3,K3,X3,Z3,J3,Y3,Q3,eE,tE,Gr,q_,j_,K_,X_,Z_,J_,Y_,Q_,ev,tv,rv=N(()=>{"use strict";de();be();we();za();Yr();q3={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},j3={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},K3={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},X3={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Z3=(n,e)=>{let r=[];for(let t=e-n;t<e;++t)r.push(t);return r},J3=(n,e)=>{let r=[],t=n.length;for(let i=0;i<t;i++)e.indexOf(i)===-1&&r.push(n[i]);let o=e.map(i=>n[i]);return[r,o]},Y3=(n,e)=>{let r=n.length+e.length,t=[],o=0;for(let i=0;i<r;i++)e.indexOf(i)===-1?t.push(n[o++]):t.push(1);return t},Q3=(n,e)=>{for(let r=0;r<n.length;++r)if(n[n.length-r-1]!==e-1-r)return!1;return!0},eE=(n,e)=>{let r=[];if(!Q3(n,e)){for(let t=0;t<e;++t)n.indexOf(t)===-1&&r.push(t);n.forEach(t=>r.push(t))}return r},tE=(n,e,r,t,o,i,a)=>{let s=r[0].dims,u=k.size(i),l=k.size(a),d=R("_A",r[0].dataType,s),f=V("output",o,i),m=64;u===1&&(m=256);let b=`
          var<workgroup> aBestValues : array<f32, ${m}>;
       `,y=_=>`
        ${_.registerUniform("reduceSize","u32").declareVariables(d,f)}
        ${b}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${_.mainStart(m)}

          let outputIndex = global_idx / ${m};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${K3[t]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${m}) {
           let candidate = f32(${d.getByOffset("offset + k")});
           bestValue = ${q3[t]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${m}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${j3[t]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${f.setByOffset("outputIndex",`${t==="mean"?`${f.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${f.type.storage}(${X3[t]})`}`)};
         }
        }`;return{name:n,shaderCache:{hint:`${e};${m}`,inputDependencies:["type"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:u},programUniforms:[{type:12,data:l}]})}},Gr=(n,e,r,t)=>{let o=n.inputs.length===1?r:Tc(n.inputs,r),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=n.inputs[0].dims.map((b,y)=>y));let a=k.normalizeAxes(i,n.inputs[0].dims.length),s=a,u=n.inputs[0],l=eE(s,n.inputs[0].dims.length);l.length>0&&(u=n.compute(ut(n.inputs[0],l),{inputs:[0],outputs:[-1]})[0],s=Z3(s.length,u.dims.length));let[d,f]=J3(u.dims,s),m=d;o.keepDims&&(m=Y3(d,a)),n.compute(tE(e,o.cacheKey,[u],t,n.inputs[0].dataType,m,f),{inputs:[u]})},q_=(n,e)=>{Gr(n,"ReduceMeanShared",e,"mean")},j_=(n,e)=>{Gr(n,"ReduceL1Shared",e,"l1")},K_=(n,e)=>{Gr(n,"ReduceL2Shared",e,"l2")},X_=(n,e)=>{Gr(n,"ReduceLogSumExpShared",e,"logSumExp")},Z_=(n,e)=>{Gr(n,"ReduceMaxShared",e,"max")},J_=(n,e)=>{Gr(n,"ReduceMinShared",e,"min")},Y_=(n,e)=>{Gr(n,"ReduceProdShared",e,"prod")},Q_=(n,e)=>{Gr(n,"ReduceSumShared",e,"sum")},ev=(n,e)=>{Gr(n,"ReduceSumSquareShared",e,"sumSquare")},tv=(n,e)=>{Gr(n,"ReduceLogSumShared",e,"logSum")}});var Ur,rE,Ma,Tc,Wr,nE,oE,iE,aE,sE,uE,lE,cE,dE,pE,Hr,nv,ov,iv,av,sv,uv,lv,cv,dv,pv,za=N(()=>{"use strict";de();be();Qe();we();rv();Ur=n=>{if(!n||n.length===0||n.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(n.length===2&&n[1].dims.length!==1)throw new Error("Invalid axes input dims.")},rE=n=>["","",`var value = ${n.getByIndices("input_indices")};`,""],Ma=(n,e,r,t,o,i,a=!1,s=!1)=>{let u=[],l=r[0].dims,d=l.length,f=k.normalizeAxes(o,d),m=!s&&f.length===0;l.forEach((T,w)=>{m||f.indexOf(w)>=0?a&&u.push(1):u.push(T)});let b=u.length,y=k.size(u);return{name:n,shaderCache:e,getShaderSource:T=>{let w=[],x=R("_A",r[0].dataType,d),S=V("output",i,b),A=t(x,S,f),P=A[2];for(let C=0,L=0;C<d;C++)m||f.indexOf(C)>=0?(a&&L++,P=`for(var j${C}: u32 = 0; j${C} < ${l[C]}; j${C}++) {
                  ${A[2].includes("last_index")?`let last_index = j${C};`:""}
                  ${x.indicesSet("input_indices",C,`j${C}`)}
                  ${P}
                }`):(w.push(`${x.indicesSet("input_indices",C,S.indicesGet("output_indices",L))};`),L++);return`

        ${T.registerUniform("output_size","u32").declareVariables(x,S)}

        ${T.mainStart()}
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${x.type.indices};
          let output_indices = ${S.offsetToIndices("global_idx")};

          ${w.join(`
`)}
          ${A[0]}       // init ops for reduce max/min
          ${A[1]}
          ${P}
          ${A[3]}
          ${A.length===4?S.setByOffset("global_idx","value"):A.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:i}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...W(l,u)]})}},Tc=(n,e)=>{let r=[];return n[1].dims[0]>0&&n[1].getBigInt64Array().forEach(t=>r.push(Number(t))),ce({axes:r,keepDims:e.keepDims,noopWithEmptyAxes:e.noopWithEmptyAxes})},Wr=(n,e,r,t)=>{let o=n.inputs,i=o.length===1?r:Tc(o,r);n.compute(Ma(e,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?rE:t,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},nE=(n,e)=>{Ur(n.inputs),Wr(n,"ReduceLogSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,"value = log(value);"])},oE=(n,e)=>{Ur(n.inputs),Wr(n,"ReduceL1",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${t.getByIndices("input_indices")});`,""])},iE=(n,e)=>{Ur(n.inputs),Wr(n,"ReduceL2",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},aE=(n,e)=>{Ur(n.inputs),Wr(n,"ReduceLogSumExp",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${t.getByIndices("input_indices")});`,"value = log(value);"])},sE=(n,e)=>{Ur(n.inputs),Wr(n,"ReduceMax",e,(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(t.indicesSet("input_indices",s,0));return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = max(value, ${t.getByIndices("input_indices")});`,""]})},uE=(n,e)=>{Ur(n.inputs),Wr(n,"ReduceMean",e,(t,o,i)=>{let a=1;for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=n.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${a});`]})},lE=(n,e)=>{Ur(n.inputs),Wr(n,"ReduceMin",e,(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = min(value, ${t.getByIndices("input_indices")});`,""]})},cE=(n,e)=>{Ur(n.inputs),Wr(n,"ReduceProd",e,(t,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${t.getByIndices("input_indices")};`,""])},dE=(n,e)=>{Ur(n.inputs),Wr(n,"ReduceSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,""])},pE=(n,e)=>{Ur(n.inputs),Wr(n,"ReduceSumSquare",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += t * t;`,""])},Hr=(n,e,r)=>{if(e.length===0)return r;let t=1,o=1;for(let i=0;i<e.length;i++)e.indexOf(i)===-1?t*=n[i]:o*=n[i];return o<32&&t>1024},nv=(n,e)=>{Hr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?uE(n,e):q_(n,e)},ov=(n,e)=>{Hr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?oE(n,e):j_(n,e)},iv=(n,e)=>{Hr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?iE(n,e):K_(n,e)},av=(n,e)=>{Hr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?aE(n,e):X_(n,e)},sv=(n,e)=>{Hr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?sE(n,e):Z_(n,e)},uv=(n,e)=>{Hr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?lE(n,e):J_(n,e)},lv=(n,e)=>{Hr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?cE(n,e):Y_(n,e)},cv=(n,e)=>{Hr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?dE(n,e):Q_(n,e)},dv=(n,e)=>{Hr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?pE(n,e):ev(n,e)},pv=(n,e)=>{Hr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?nE(n,e):tv(n,e)}});var fv,hv,mv,Ic,gv=N(()=>{"use strict";de();Qe();za();fv=n=>{if(!n||n.length===0||n.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(n[0].dataType!==1)throw new Error("Invalid input type.")},hv=(n,e)=>{fv(n.inputs);let r=(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?"<=":"<"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};n.compute(Ma("ArgMin",{hint:e.cacheKey,inputDependencies:["rank"]},[n.inputs[0]],r,[e.axis],7,e.keepDims),{inputs:[0]})},mv=(n,e)=>{fv(n.inputs);let r=(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?">=":">"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};n.compute(Ma("argMax",{hint:e.cacheKey,inputDependencies:["rank"]},[n.inputs[0]],r,[e.axis],7,e.keepDims),{inputs:[0]})},Ic=n=>ce(n)});var fE,Sc,hE,mE,gE,uo,bE,bv,Ba=N(()=>{"use strict";de();be();Na();we();fE=(n,e)=>{let r=n[0],t=n[1],o=n[2],i=n[3],a=n[4],s=n[5];if(a&&s)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=r.dims[0],l=r.dims[1],d=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(t.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(t.dims[0]!==d)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==t.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let f=o.dims[0]/3,m=f,b=m;if(e.qkvHiddenSizes.length>0){if(e.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let S of e.qkvHiddenSizes)if(S%e.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");f=e.qkvHiddenSizes[0],m=e.qkvHiddenSizes[1],b=e.qkvHiddenSizes[2]}let y=l;if(f!==m)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==f+m+b)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let _=0;if(a){if(m!==b)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==e.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==m/e.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');e.pastPresentShareBuffer||(_=a.dims[3])}let T=y+_,w=-1,x=0;if(i)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(s){if(s.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(s.dims[0]!==u||s.dims[1]!==e.numHeads||s.dims[2]!==l||s.dims[3]!==T)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:_,kvSequenceLength:y,totalSequenceLength:T,maxSequenceLength:w,inputHiddenSize:d,hiddenSize:f,vHiddenSize:b,headSize:Math.floor(f/e.numHeads),vHeadSize:Math.floor(b/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:x,scale:e.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Sc=(n,e,r)=>e&&n?`
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
    `,hE=(n,e,r,t,o,i,a,s)=>{let u=Ee(a?1:i),l=64,d=i/u;d<l&&(l=32);let f=Math.ceil(i/u/l),m=[{type:12,data:e},{type:12,data:r},{type:12,data:t},{type:12,data:o},{type:12,data:d},{type:12,data:f}],b=Ve(n.dataType,u),y=st(1,u),_=["type"];a&&_.push("type"),s&&_.push("type");let T=w=>{let x=V("x",n.dataType,n.dims,u),S=[x],A=a?R("seq_lens",a.dataType,a.dims):void 0;A&&S.push(A);let P=s?R("total_sequence_length_input",s.dataType,s.dims):void 0;P&&S.push(P);let C=st(n.dataType),L=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${w.registerUniforms(L).declareVariables(...S)}
  ${w.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Sc(A,P,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${l}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${a?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${y}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${y}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${l}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${y}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${y}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${l}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${x.type.value}(${C}(1.0) / ${C}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${y}(x[offset + i]);
        x[offset + i] = ${x.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${x.type.value}(${C}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${l};${b};${u}`,inputDependencies:_},getShaderSource:T,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:o,z:e*r},programUniforms:m})}},mE=(n,e,r,t,o,i,a,s,u)=>{let l=a+i.kvSequenceLength,d=[i.batchSize,i.numHeads,i.sequenceLength,l],f=n>1&&t,m=i.kvNumHeads?i.kvNumHeads:i.numHeads,b=f?[i.batchSize,m,l,i.headSize]:void 0,y=i.nReps?i.nReps:1,_=i.scale===0?1/Math.sqrt(i.headSize):i.scale,T=Ee(i.headSize),w=i.headSize/T,x=12,S={x:Math.ceil(l/x),y:Math.ceil(i.sequenceLength/x),z:i.batchSize*i.numHeads},A=[{type:12,data:i.sequenceLength},{type:12,data:w},{type:12,data:l},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:_},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:y}],P=f&&t&&k.size(t.dims)>0,C=["type","type"];P&&C.push("type"),o&&C.push("type"),s&&C.push("type"),u&&C.push("type");let L=[{dims:d,dataType:e.dataType,gpuDataType:0}];f&&L.push({dims:b,dataType:e.dataType,gpuDataType:0});let M=F=>{let X=R("q",e.dataType,e.dims,T),ee=R("key",r.dataType,r.dims,T),ie=[X,ee];if(P){let ue=R("past_key",t.dataType,t.dims,T);ie.push(ue)}o&&ie.push(R("attention_bias",o.dataType,o.dims));let j=s?R("seq_lens",s.dataType,s.dims):void 0;j&&ie.push(j);let oe=u?R("total_sequence_length_input",u.dataType,u.dims):void 0;oe&&ie.push(oe);let Ue=V("output",e.dataType,d),J=[Ue];f&&J.push(V("present_key",e.dataType,b,T));let te=st(1,T),pe=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${x}u;

  var<workgroup> tileQ: array<${X.type.storage}, ${x*x}>;
  var<workgroup> tileK: array<${X.type.storage}, ${x*x}>;
  ${F.registerUniforms(pe).declareVariables(...ie,...J)}
  ${F.mainStart([x,x,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${y===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${y===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Sc(j,oe,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${P&&f?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${f?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${te}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${P&&f?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${f?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${te}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(T){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${T}`)}})()};
        output[outputIdx] = ${Ue.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${T};${o!==void 0};${t!==void 0};${n}`,inputDependencies:C},getRunData:()=>({outputs:L,dispatchGroup:S,programUniforms:A}),getShaderSource:M}},gE=(n,e,r,t,o,i,a=void 0,s=void 0)=>{let u=i+o.kvSequenceLength,l=o.nReps?o.nReps:1,d=o.vHiddenSize*l,f=n>1&&t,m=o.kvNumHeads?o.kvNumHeads:o.numHeads,b=f?[o.batchSize,m,u,o.headSize]:void 0,y=[o.batchSize,o.sequenceLength,d],_=12,T={x:Math.ceil(o.vHeadSize/_),y:Math.ceil(o.sequenceLength/_),z:o.batchSize*o.numHeads},w=[{type:12,data:o.sequenceLength},{type:12,data:u},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:d},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:l}],x=f&&t&&k.size(t.dims)>0,S=["type","type"];x&&S.push("type"),a&&S.push("type"),s&&S.push("type");let A=[{dims:y,dataType:e.dataType,gpuDataType:0}];f&&A.push({dims:b,dataType:e.dataType,gpuDataType:0});let P=C=>{let L=R("probs",e.dataType,e.dims),M=R("v",r.dataType,r.dims),F=[L,M];x&&F.push(R("past_value",t.dataType,t.dims));let X=a?R("seq_lens",a.dataType,a.dims):void 0;a&&F.push(X);let ee=s?R("total_sequence_length_input",s.dataType,s.dims):void 0;s&&F.push(ee);let j=[V("output",e.dataType,y)];f&&j.push(V("present_value",e.dataType,b));let oe=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;
  var<workgroup> tileQ: array<${L.type.value}, ${_*_}>;
  var<workgroup> tileV: array<${L.type.value}, ${_*_}>;
  ${C.registerUniforms(oe).declareVariables(...F,...j)}
  ${C.mainStart([_,_,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${l===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${l===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Sc(X,ee,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${x&&f?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${f?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${L.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${x&&f?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${f?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${t!==void 0};${n}`,inputDependencies:S},getRunData:()=>({outputs:A,dispatchGroup:T,programUniforms:w}),getShaderSource:P}},uo=(n,e,r,t,o,i,a,s,u,l,d=void 0,f=void 0)=>{let m=Math.min(n.outputCount,1+(a?1:0)+(s?1:0)),b=m>1?l.pastSequenceLength:0,y=b+l.kvSequenceLength,_=u&&k.size(u.dims)>0?u:void 0,T=[e,r];m>1&&a&&k.size(a.dims)>0&&T.push(a),_&&T.push(_),d&&T.push(d),f&&T.push(f);let w=n.compute(mE(m,e,r,a,_,l,b,d,f),{inputs:T,outputs:m>1?[-1,1]:[-1]})[0];n.compute(hE(w,l.batchSize,l.numHeads,b,l.sequenceLength,y,d,f),{inputs:d&&f?[w,d,f]:[w],outputs:[]});let x=[w,t];m>1&&s&&k.size(s.dims)>0&&x.push(s),d&&x.push(d),f&&x.push(f),n.compute(gE(m,w,t,s,l,b,d,f),{inputs:x,outputs:m>1?[0,2]:[0]})},bE=(n,e)=>{let r=[e.batchSize,e.numHeads,e.sequenceLength,e.headSize],t=e.sequenceLength,o=e.inputHiddenSize,i=e.headSize,a=12,s={x:Math.ceil(e.headSize/a),y:Math.ceil(e.sequenceLength/a),z:e.batchSize*e.numHeads},u=[n.inputs[0],n.inputs[1],n.inputs[2]],l=[{type:12,data:t},{type:12,data:o},{type:12,data:i},{type:12,data:e.numHeads},{type:12,data:e.headSize},{type:12,data:e.hiddenSize},{type:12,data:e.hiddenSize+e.hiddenSize+e.vHiddenSize}],d=f=>{let m=V("output_q",u[0].dataType,r),b=V("output_k",u[0].dataType,r),y=V("output_v",u[0].dataType,r),_=R("input",u[0].dataType,u[0].dims),T=R("weight",u[1].dataType,u[1].dims),w=R("bias",u[2].dataType,u[2].dims),x=_.type.storage,S=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${x}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${x}, ${a*a}>;
  var<workgroup> tileWeightK: array<${x}, ${a*a}>;
  var<workgroup> tileWeightV: array<${x}, ${a*a}>;
  ${f.registerUniforms(S).declareVariables(_,T,w,m,b,y)}
  ${f.mainStart([a,a,1])}
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
  }`};return n.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0}],dispatchGroup:s,programUniforms:l}),getShaderSource:d},{inputs:u,outputs:[-1,-1,-1]})},bv=(n,e)=>{let r=fE(n.inputs,e),[t,o,i]=bE(n,r);return uo(n,t,o,i,n.inputs[4],void 0,void 0,void 0,n.inputs[5],r)}});var yE,_E,vE,yv,_v=N(()=>{"use strict";ft();de();be();Qe();we();yE=(n,e)=>{if(!n||n.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(t,o,i)=>{let a=o.length;if(a!==t.length)throw new Error(`${i}: num dimensions != ${a}`);o.forEach((s,u)=>{if(s!==t[u])throw new Error(`${i}: dim[${u}] do not match`)})};if(n[0].dims.length>1){let t=e.format==="NHWC"?e.spatial?n[0].dims.slice(-1):n[0].dims.slice(-1).concat(n[0].dims.slice(1,n[0].dims.length-1)):n[0].dims.slice(1,e.spatial?2:void 0);r(n[1].dims,t,"Invalid input scale"),r(n[2].dims,t,"Invalid input B"),r(n[3].dims,t,"Invalid input mean"),r(n[4].dims,t,"Invalid input var")}else r(n[1].dims,[1],"Invalid input scale"),r(n[2].dims,[1],"Invalid input B"),r(n[3].dims,[1],"Invalid input mean"),r(n[4].dims,[1],"Invalid input var")},_E=(n,e)=>{let{epsilon:r,spatial:t,format:o}=e,i=n[0].dims,a=t?Ee(i[i.length-1]):1,s=o==="NHWC"&&i.length>1?a:1,u=k.size(i)/a,l=t,d=l?i.length:i,f=R("x",n[0].dataType,n[0].dims,a),m=R("scale",n[1].dataType,n[1].dims,s),b=R("bias",n[2].dataType,n[2].dims,s),y=R("inputMean",n[3].dataType,n[3].dims,s),_=R("inputVar",n[4].dataType,n[4].dims,s),T=V("y",n[0].dataType,d,a),w=()=>{let S="";if(t)S=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${a}`:"outputIndices[1]"};`;else if(o==="NCHW")S=`
            ${T.indicesSet("outputIndices","0","0")}
            let cOffset = ${T.indicesToOffset("outputIndices")};`;else{S=`var cIndices = ${m.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let A=1;A<m.rank;A++)S+=`cIndices[${A}] = outputIndices[${A}];`;S+=`let cOffset = ${m.indicesToOffset("cIndices")};`}return S},x=S=>`
  const epsilon = ${r};
  ${S.registerUniform("outputSize","u32").declareVariables(f,m,b,y,_,T)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${T.offsetToIndices(`global_idx * ${a}`)};
    ${w()}
    let scale = ${m.getByOffset("cOffset")};
    let bias = ${b.getByOffset("cOffset")};
    let inputMean = ${y.getByOffset("cOffset")};
    let inputVar = ${_.getByOffset("cOffset")};
    let x = ${f.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${T.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${e.epsilon}_${e.format}_${t}_${a}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:x,getRunData:()=>({outputs:[{dims:n[0].dims,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l?[{type:12,data:u},...W(i)]:[{type:12,data:u}]})}},vE=n=>ce(n),yv=(n,e)=>{let{inputs:r,outputCount:t}=n,o=vE({...e,outputCount:t});if(ge.webgpu.validateInputContent&&yE(r,o),e.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");n.compute(_E(r,o))}});var wE,xE,vv,wv=N(()=>{"use strict";be();we();wE=n=>{if(n[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(n[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(n[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(n[0].dims[2]!==n[1].dims[0])throw new Error("last dimension of input and bias are not the same")},xE=n=>{let e=n[0].dims,r=n[0].dims[2],t=k.size(e)/4,o=n[0].dataType,i=R("input",o,e,4),a=R("bias",o,[r],4),s=R("residual",o,e,4),u=V("output",o,e,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:e,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)}}),getShaderSource:d=>`
  const channels = ${r}u / 4;
  ${d.declareVariables(i,a,s,u)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(t)}
    let value = ${i.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${s.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},vv=n=>{wE(n.inputs),n.compute(xE(n.inputs))}});var TE,Ne,xv,Tv,Iv,Sv,$v,Av,Ov,Pv,Ev,IE,Cv,Dv,kv,Nv,Uo,Lv,Fa,Rv,zv,Mv,Bv,Fv,Vv,Gv,Uv,Wv,Hv,qv,jv,Kv,Xv,Zv,Jv,Yv,Qv,$c,Ac,e0,t0,r0,SE,$E,n0,Va=N(()=>{"use strict";de();be();Qe();we();TE=(n,e,r,t,o,i,a)=>{let s=Math.ceil(e/4),u="";typeof o=="string"?u=`${o}(a)`:u=o("a");let l=R("inputData",r,[s],4),d=V("outputData",t,[s],4),f=[{name:"vec_size",type:"u32"}];return a&&f.push(...a),`
      ${n.registerUniforms(f).declareVariables(l,d)}

  ${i??""}

  ${n.mainStart()}
    ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${d.setByOffset("global_idx",u)}
  }`},Ne=(n,e,r,t,o,i=n.dataType,a,s)=>{let u=[{type:12,data:Math.ceil(k.size(n.dims)/4)}];return a&&u.push(...a),{name:e,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:l=>TE(l,k.size(n.dims),n.dataType,i,r,t,s),getRunData:l=>({outputs:[{dims:n.dims,dataType:i}],dispatchGroup:{x:Math.ceil(k.size(l[0].dims)/64/4)},programUniforms:u})}},xv=n=>{n.compute(Ne(n.inputs[0],"Abs","abs"))},Tv=n=>{n.compute(Ne(n.inputs[0],"Acos","acos"))},Iv=n=>{n.compute(Ne(n.inputs[0],"Acosh","acosh"))},Sv=n=>{n.compute(Ne(n.inputs[0],"Asin","asin"))},$v=n=>{n.compute(Ne(n.inputs[0],"Asinh","asinh"))},Av=n=>{n.compute(Ne(n.inputs[0],"Atan","atan"))},Ov=n=>{n.compute(Ne(n.inputs[0],"Atanh","atanh"))},Pv=n=>ce(n),Ev=(n,e)=>{let r;switch(e.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${e.to}`)}n.compute(Ne(n.inputs[0],"Cast",r,void 0,e.cacheKey,e.to))},IE=n=>{let e,r,t=n.length>=2&&n[1].data!==0,o=n.length>=3&&n[2].data!==0;switch(n[0].dataType){case 1:e=t?n[1].getFloat32Array()[0]:-34028234663852886e22,r=o?n[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:e=t?n[1].getUint16Array()[0]:64511,r=o?n[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return ce({min:e,max:r})},Cv=(n,e)=>{let r=e||IE(n.inputs),t=st(n.inputs[0].dataType);n.compute(Ne(n.inputs[0],"Clip",o=>`clamp(${o}, vec4<${t}>(uniforms.min), vec4<${t}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:n.inputs[0].dataType,data:r.min},{type:n.inputs[0].dataType,data:r.max}],[{name:"min",type:t},{name:"max",type:t}]),{inputs:[0]})},Dv=n=>{n.compute(Ne(n.inputs[0],"Ceil","ceil"))},kv=n=>{n.compute(Ne(n.inputs[0],"Cos","cos"))},Nv=n=>{n.compute(Ne(n.inputs[0],"Cosh","cosh"))},Uo=n=>ce(n),Lv=(n,e)=>{let r=st(n.inputs[0].dataType);n.compute(Ne(n.inputs[0],"Elu",t=>`elu_vf32(${t})`,`
  const elu_alpha_ = ${r}(${e.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,e.cacheKey))},Fa=(n="f32")=>`
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
}`,Rv=n=>{let e=st(n.inputs[0].dataType);n.compute(Ne(n.inputs[0],"Erf",r=>`erf_vf32(${r})`,Fa(e)))},zv=n=>{n.compute(Ne(n.inputs[0],"Exp","exp"))},Mv=n=>{n.compute(Ne(n.inputs[0],"Floor","floor"))},Bv=n=>{let e=st(n.inputs[0].dataType);n.compute(Ne(n.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Fa(e)))},Fv=(n,e)=>{let r=st(n.inputs[0].dataType);n.compute(Ne(n.inputs[0],"LeakyRelu",t=>`select(leaky_relu_alpha_ * ${t}, ${t}, ${t} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${e.alpha});`,e.cacheKey))},Vv=n=>{n.compute(Ne(n.inputs[0],"Not",e=>`!${e}`))},Gv=n=>{n.compute(Ne(n.inputs[0],"Neg",e=>`-${e}`))},Uv=n=>{n.compute(Ne(n.inputs[0],"Reciprocal",e=>`1.0/${e}`))},Wv=n=>{let e=st(n.inputs[0].dataType);n.compute(Ne(n.inputs[0],"Relu",r=>`select(vec4<${e}>(0.0), ${r}, ${r} > vec4<${e}>(0.0))`))},Hv=n=>{n.compute(Ne(n.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},qv=n=>ce(n),jv=(n,e)=>{let r=st(n.inputs[0].dataType);n.compute(Ne(n.inputs[0],"HardSigmoid",t=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${e.alpha} * ${t} + vec4<${r}>(${e.beta})))`,void 0,e.cacheKey))},Kv=n=>{n.compute(Ne(n.inputs[0],"Sin","sin"))},Xv=n=>{n.compute(Ne(n.inputs[0],"Sinh","sinh"))},Zv=n=>{n.compute(Ne(n.inputs[0],"Sqrt","sqrt"))},Jv=n=>{n.compute(Ne(n.inputs[0],"Tan","tan"))},Yv=n=>`sign(${n}) * (1 - exp(-2 * abs(${n}))) / (1 + exp(-2 * abs(${n})))`,Qv=n=>{n.compute(Ne(n.inputs[0],"Tanh",Yv))},$c=(n="f32")=>`
const fast_gelu_a: ${n} = 0.5;
const fast_gelu_b: ${n} = 0.7978845608028654;
const fast_gelu_c: ${n} = 0.035677408136300125;

fn tanh_v(v: vec4<${n}>) -> vec4<${n}> {
  return ${Yv("v")};
}
`,Ac=n=>`(fast_gelu_a + fast_gelu_a * tanh_v(${n} * (fast_gelu_c * ${n} * ${n} + fast_gelu_b))) * ${n}`,e0=n=>{let e=st(n.inputs[0].dataType);n.compute(Ne(n.inputs[0],"FastGelu",Ac,$c(e),void 0,n.inputs[0].dataType))},t0=(n,e)=>{let r=st(n.inputs[0].dataType);return n.compute(Ne(n.inputs[0],"ThresholdedRelu",t=>`select(vec4<${r}>(0.0), ${t}, ${t} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${e.alpha});`,e.cacheKey)),0},r0=n=>{n.compute(Ne(n.inputs[0],"Log","log"))},SE=(n,e)=>`
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
`,$E=n=>`quick_gelu_impl(${n})`,n0=(n,e)=>{let r=st(n.inputs[0].dataType);n.compute(Ne(n.inputs[0],"QuickGelu",$E,SE(r,e.alpha),e.cacheKey,n.inputs[0].dataType))}});var AE,OE,i0,a0=N(()=>{"use strict";be();we();Va();AE=n=>{if(n[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(n[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(n[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(n[0].dims[2]!==n[1].dims[0])throw new Error("last dimension of input and bias are not the same")},OE=n=>{let e=n[0].dims.slice();e[2]=e[2]/2;let r=R("input",n[0].dataType,n[0].dims,4),t=R("bias",n[0].dataType,[n[0].dims[2]],4),o=V("output",n[0].dataType,e,4),i=k.size(e)/4,a=Ve(n[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:e,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${n[0].dims[2]/4/2}u;

  ${u.declareVariables(r,t,o)}

  ${Fa(a)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},i0=n=>{AE(n.inputs),n.compute(OE(n.inputs))}});var PE,EE,qr,s0,u0,l0,c0,d0,p0,f0,h0,m0,g0,b0=N(()=>{"use strict";de();be();we();PE=(n,e,r,t,o,i,a,s,u,l,d,f)=>{let m,b;typeof s=="string"?m=b=(x,S)=>`${s}((${x}),(${S}))`:typeof s=="function"?m=b=s:(m=s.scalar,b=s.vector);let y=V("outputData",d,t.length,4),_=R("aData",u,e.length,4),T=R("bData",l,r.length,4),w;if(o)if(i){let x=k.size(e)===1,S=k.size(r)===1,A=e.length>0&&e[e.length-1]%4===0,P=r.length>0&&r[r.length-1]%4===0;x||S?w=y.setByOffset("global_idx",b(x?`${_.type.value}(${_.getByOffset("0")}.x)`:_.getByOffset("global_idx"),S?`${T.type.value}(${T.getByOffset("0")}.x)`:T.getByOffset("global_idx"))):w=`
            let outputIndices = ${y.offsetToIndices("global_idx * 4u")};
            let offsetA = ${_.broadcastedIndicesToOffset("outputIndices",y)};
            let offsetB = ${T.broadcastedIndicesToOffset("outputIndices",y)};
            ${y.setByOffset("global_idx",b(a||A?_.getByOffset("offsetA / 4u"):`${_.type.value}(${_.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||P?T.getByOffset("offsetB / 4u"):`${T.type.value}(${T.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else w=y.setByOffset("global_idx",b(_.getByOffset("global_idx"),T.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let x=(S,A,P="")=>{let C=`aData[indexA${A}][componentA${A}]`,L=`bData[indexB${A}][componentB${A}]`;return`
            let outputIndices${A} = ${y.offsetToIndices(`global_idx * 4u + ${A}u`)};
            let offsetA${A} = ${_.broadcastedIndicesToOffset(`outputIndices${A}`,y)};
            let offsetB${A} = ${T.broadcastedIndicesToOffset(`outputIndices${A}`,y)};
            let indexA${A} = offsetA${A} / 4u;
            let indexB${A} = offsetB${A} / 4u;
            let componentA${A} = offsetA${A} % 4u;
            let componentB${A} = offsetB${A} % 4u;
            ${S}[${A}] = ${P}(${m(C,L)});
          `};d===9?w=`
            var data = vec4<u32>(0);
            ${x("data",0,"u32")}
            ${x("data",1,"u32")}
            ${x("data",2,"u32")}
            ${x("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:w=`
            ${x("outputData[global_idx]",0)}
            ${x("outputData[global_idx]",1)}
            ${x("outputData[global_idx]",2)}
            ${x("outputData[global_idx]",3)}
          `}return`
        ${n.registerUniform("vec_size","u32").declareVariables(_,T,y)}

        ${f??""}

        ${n.mainStart()}
        ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${w}
      }`},EE=(n,e,r,t,o,i,a=r.dataType)=>{let s=r.dims.map(_=>Number(_)??1),u=t.dims.map(_=>Number(_)??1),l=!k.areEqual(s,u),d=s,f=k.size(s),m=!1,b=!1,y=[l];if(l){let _=Vr.calcShape(s,u,!1);if(!_)throw new Error("Can't perform binary op on the given tensors");d=_.slice(),f=k.size(d);let T=k.size(s)===1,w=k.size(u)===1,x=s.length>0&&s[s.length-1]%4===0,S=u.length>0&&u[u.length-1]%4===0;y.push(T),y.push(w),y.push(x),y.push(S);let A=1;for(let P=1;P<d.length;P++){let C=s[s.length-P],L=u[u.length-P];if(C===L)A*=C;else break}A%4===0?(b=!0,m=!0):(T||w||x||S)&&(m=!0)}else m=!0;return y.push(m),{name:n,shaderCache:{hint:e+y.map(_=>_.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:_=>PE(_,s,u,d,m,l,b,o,r.dataType,t.dataType,a,i),getRunData:()=>({outputs:[{dims:d,dataType:a}],dispatchGroup:{x:Math.ceil(f/64/4)},programUniforms:[{type:12,data:Math.ceil(k.size(d)/4)},...W(s,u,d)]})}},qr=(n,e,r,t,o,i)=>{n.compute(EE(e,o??"",n.inputs[0],n.inputs[1],r,t,i))},s0=n=>{qr(n,"Add",(e,r)=>`${e}+${r}`)},u0=n=>{qr(n,"Div",(e,r)=>`${e}/${r}`)},l0=n=>{qr(n,"Equal",{scalar:(e,r)=>`u32(${e}==${r})`,vector:(e,r)=>`vec4<u32>(${e}==${r})`},void 0,void 0,9)},c0=n=>{qr(n,"Mul",(e,r)=>`${e}*${r}`)},d0=n=>{let e=R("input",n.inputs[0].dataType,n.inputs[0].dims).type.value;qr(n,"Pow",{scalar:(t,o)=>`pow_custom(${t},${o})`,vector:(t,o)=>`pow_vector_custom(${t},${o})`},`
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
      `)},p0=n=>{qr(n,"Sub",(e,r)=>`${e}-${r}`)},f0=n=>{qr(n,"Greater",{scalar:(e,r)=>`u32(${e}>${r})`,vector:(e,r)=>`vec4<u32>(${e}>${r})`},void 0,void 0,9)},h0=n=>{qr(n,"Less",{scalar:(e,r)=>`u32(${e}<${r})`,vector:(e,r)=>`vec4<u32>(${e}<${r})`},void 0,void 0,9)},m0=n=>{qr(n,"GreaterOrEqual",{scalar:(e,r)=>`u32(${e}>=${r})`,vector:(e,r)=>`vec4<u32>(${e}>=${r})`},void 0,void 0,9)},g0=n=>{qr(n,"LessOrEqual",{scalar:(e,r)=>`u32(${e}<=${r})`,vector:(e,r)=>`vec4<u32>(${e}<=${r})`},void 0,void 0,9)}});var DE,kE,NE,LE,y0,_0,v0=N(()=>{"use strict";de();be();Qe();we();DE=(n,e)=>{if(!n||n.length<1)throw new Error("too few inputs");let r=0,t=n[r],o=t.dataType,i=t.dims.length;n.forEach((a,s)=>{if(s!==r){if(a.dataType!==o)throw new Error("input tensors should be one type");if(a.dims.length!==i)throw new Error("input tensors should have the same shape");a.dims.forEach((u,l)=>{if(l!==e&&u!==t.dims[l])throw new Error("non concat dimensions must match")})}})},kE=(n,e)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${n}u>(${e});
    for (var i: u32 = 0u; i < ${n}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${n}u;
  }`,NE=(n,e)=>{let r=n.length,t=[];for(let o=0;o<r;++o){let i=e.setByOffset("global_idx",n[o].getByIndices("indices"));r===1?t.push(i):o===0?t.push(`if (inputIndex == ${o}u) { ${i} }`):o===r-1?t.push(`else { ${i} }`):t.push(`else if (inputIndex == ${o}) { ${i} }`)}return t.join(`
`)},LE=(n,e,r,t)=>{let o=k.size(r),i=new Array(n.length),a=new Array(n.length),s=0,u=[],l=[],d=[{type:12,data:o}];for(let _=0;_<n.length;++_)s+=n[_].dims[e],i[_]=s,l.push(n[_].dims.length),a[_]=R(`input${_}`,t,l[_]),u.push("rank"),d.push({type:12,data:i[_]});for(let _=0;_<n.length;++_)d.push(...W(n[_].dims));d.push(...W(r));let f=V("output",t,r.length),m=f.indicesGet("indices",e),b=Array.from(Array(i.length).keys()).map(_=>`uniforms.sizeInConcatAxis${_}`).join(","),y=_=>`

  ${(()=>{_.registerUniform("outputSize","u32");for(let T=0;T<n.length;T++)_.registerUniform(`sizeInConcatAxis${T}`,"u32");return _.declareVariables(...a,f)})()}

  ${kE(i.length,b)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${f.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${m});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${b});
      ${m} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${NE(a,f)}
  }`;return{name:"Concat",shaderCache:{hint:`${e}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:d}),getShaderSource:y}},y0=(n,e)=>{let r=n.inputs,t=r[0].dims,o=k.normalizeAxis(e.axis,t.length);DE(r,o);let i=t.slice();i[o]=r.reduce((s,u)=>s+(u.dims.length>o?u.dims[o]:0),0);let a=r.filter(s=>k.size(s.dims)>0);n.compute(LE(a,o,i,r[0].dataType),{inputs:a})},_0=n=>ce({axis:n.axis})});var Zt,Jt,Yt,Ga,bn=N(()=>{"use strict";de();be();Zt=(n,e,r="f32")=>{switch(n.activation){case"Relu":return`value = max(value, ${e}(0.0));`;case"Sigmoid":return`value = (${e}(1.0) / (${e}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${e}(${r}(uniforms.clip_min)), ${e}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${e}(0.0), min(${e}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${e}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${n.activation}`)}},Jt=(n,e)=>{n.activation==="Clip"?e.push({type:1,data:n.clipMax},{type:1,data:n.clipMin}):n.activation==="HardSigmoid"?e.push({type:1,data:n.alpha},{type:1,data:n.beta}):n.activation==="LeakyRelu"&&e.push({type:1,data:n.alpha})},Yt=(n,e)=>{n.activation==="Clip"?e.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):n.activation==="HardSigmoid"?e.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):n.activation==="LeakyRelu"&&e.push({name:"alpha",type:"f32"})},Ga=n=>{let e=n?.activation||"";if(e==="HardSigmoid"){let[r,t]=n?.activation_params||[.2,.5];return{activation:e,alpha:r,beta:t}}else if(e==="Clip"){let[r,t]=n?.activation_params||[O_,P_];return{activation:e,clipMax:t,clipMin:r}}else if(e==="LeakyRelu"){let[r]=n?.activation_params||[.01];return{activation:e,alpha:r}}return{activation:e}}});var it,w0,Ua=N(()=>{"use strict";it=(n,e)=>{switch(n){case 1:return e;case 2:return`vec2<${e}>`;case 3:return`vec3<${e}>`;case 4:return`vec4<${e}>`;default:throw new Error(`${n}-component is not supported.`)}},w0=n=>`
      ${n?"value = value + getBiasByOutputCoords(coords);":""}
      `});var x0,T0=N(()=>{"use strict";x0=n=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${n}.x), i32(${n}.y), i32(${n}.z), 1));
}
`});var Wo,Wa,Ha=N(()=>{"use strict";de();be();we();bn();Wo=(n,e,r,t,o)=>{let i=t-r;return`
      ${Array.from({length:r}).map((a,s)=>`
      if (${Q(e.shape,s,e.rank)} != 1) {
        ${e.indicesSet(n,s,Q(o,s+i,t))}
      } else {
        ${e.indicesSet(n,s,0)}
      }`).join("")}
`},Wa=(n,e,r,t,o=!1,i)=>{let a=n[0].dims,s=n[1].dims,u=a[a.length-2],l=s[s.length-1],d=a[a.length-1],f=Ee(l),m=Ee(d),b=Ee(u),y=k.size(r)/f/b,_=n.length>2,T=t?t.slice(0,-2):r.slice(0,-2),x=[k.size(T),u,l],S=[{type:12,data:y},{type:12,data:u},{type:12,data:l},{type:12,data:d}];Jt(e,S),S.push(...W(T,a,s)),_&&S.push(...W(n[2].dims)),S.push(...W(x));let A=P=>{let C=Ra("batch_dims",n[0].dataType,T.length),L=R("a",n[0].dataType,a.length,m),M=R("b",n[1].dataType,s.length,f),F=V("output",n[0].dataType,x.length,f),X=Ve(F.type.tensor),ee=Zt(e,F.type.value,X),ie=[L,M],j="";if(_){let J=o?f:1;ie.push(R("bias",n[2].dataType,n[2].dims.length,J)),j=`${o?`value += bias[col / ${J}];`:`value += ${F.type.value}(bias[row + i]);`}`}let oe=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Yt(e,oe);let Ue=()=>{let J=`var a_data: ${L.type.value};`;for(let te=0;te<m;te++)J+=`
              let b_data${te} = b[(b_offset + (k + ${te}) * uniforms.N + col) / ${f}];`;for(let te=0;te<b;te++){J+=`a_data = a[(a_offset + (row + ${te}) * uniforms.K + k) / ${m}];`;for(let pe=0;pe<m;pe++)J+=`
            values[${te}] = fma(${M.type.value}(a_data${m===1?"":`[${pe}]`}), b_data${pe}, values[${te}]);
`}return J};return`
  ${P.registerUniforms(oe).registerInternalVariables(C).declareVariables(...ie,F)}
  ${P.mainStart()}
    ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${f})) * ${f};
    var index1 = global_idx / (uniforms.N / ${f});
    let stride1 = uniforms.M / ${b};
    let row = (index1 % stride1) * ${b};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${C.offsetToIndices("batch")};`}

    var a_indices: ${L.type.indices};
    ${Wo("a_indices",L,L.rank-2,C.rank,"batch_indices")}
    ${L.indicesSet("a_indices",L.rank-2,0)}
    ${L.indicesSet("a_indices",L.rank-1,0)}
    let a_offset = ${L.indicesToOffset("a_indices")};

    var b_indices: ${M.type.indices};
    ${Wo("b_indices",M,M.rank-2,C.rank,"batch_indices")}
    ${M.indicesSet("b_indices",M.rank-2,0)}
    ${M.indicesSet("b_indices",M.rank-1,0)}
    let b_offset = ${M.indicesToOffset("b_indices")};
    var values: array<${F.type.value}, ${b}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${m}) {
      ${Ue()}
    }
    for (var i = 0u; i < ${b}u; i++) {
      var value = values[i];
      ${j}
      ${ee}
      let cur_indices = ${F.type.indices}(batch, row + i, col);
      let offset = ${F.indicesToOffset("cur_indices")};
      ${F.setByOffset(`offset / ${f}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${e.activation};${f};${m};${b};${o}`,inputDependencies:_?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:S}),getShaderSource:A}}});var RE,zE,Oc,I0,ME,Pc,BE,Ho,qa=N(()=>{"use strict";de();be();we();bn();Ha();Ua();RE=(n,e)=>n?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${e?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${e?", batchIndices":""});
        `,zE=(n,e)=>n?`
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
        }`,Oc=(n,e,r="f32",t,o=!1,i=32,a=!1,s=32)=>{let u=e[1]*n[1],l=e[0]*n[0],d=o?u:i,f=o?i:u,m=d/e[0],b=i/e[1];if(!((o&&m===4&&n[1]===4||!o&&(m===3||m===4))&&d%e[0]===0&&i%e[1]===0&&n[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${m} and workPerThread[1] ${n[1]} must be 4.
      Otherwise, innerElementSize ${m} must be 3 or 4.
  tileAWidth ${d} must be divisible by workgroupSize[0]${e[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${e[1]}. colPerThread ${n[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${m}<${r}>, ${d/m}>, ${f}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${l/n[0]}>, ${i}>;

const rowPerThread = ${n[1]};
const colPerThread = ${n[0]};
const innerElementSize = ${m};
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
          ${RE(o,t)}
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
          ${m===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${zE(o,m)}
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
            `,ME=n=>n?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Pc=(n,e,r="f32",t,o=!1,i=32,a=!1,s=32,u=!1)=>{let l=n[1]*e[1],d=n[0]*e[0],f=o?l:i,m=o?i:l;if(!(m%e[1]===0&&f%e[0]===0&&i%e[1]===0))throw new Error(`tileAHight ${m} must be divisible by workgroupSize[1]${e[1]}, tileAWidth ${f} must be divisible by workgroupSize[0]${e[0]}, tileInner ${i} must be divisible by workgroupSize[1]${e[1]}`);let b=m/e[1],y=f/e[0],_=i/e[1],T=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${d};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${m}; inputRow = inputRow + ${e[1]}) {
        for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${e[0]}) {
          ${I0(o,t)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${e[1]}) {
            for (var inputCol = localCol; inputCol < ${d}; inputCol = inputCol + ${e[0]}) {
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
let tileColA = i32(localId.x) * ${y};
let tileRowB = i32(localId.y) * ${_};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${y}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${I0(o,t)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
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
      ${ME(o)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${f}>, ${m}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${d}>, ${i}>;
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
    ${T}
  }
`},BE=(n,e,r,t,o=!1)=>{let[i,a,s,u]=t,l=Ve(t[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${it(n,l)} {
      var value = ${it(n,l)}(0.0);
      let col = colIn * ${n};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${Wo("aIndices",a,a.rank-2,i.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${it(n,l)} {
      var value = ${it(n,l)}(0.0);
      let col = colIn * ${n};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${s.type.indices};
        ${Wo("bIndices",s,s.rank-2,i.rank,"batchIndices")}
        ${s.indicesSet("bIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("bIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${it(n,l)}) {
      let col = colIn * ${n};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${e?`value = value + ${o?"bias[colIn]":`${it(n,l)}(bias[row])`};`:""}
        ${r}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Ho=(n,e,r,t,o=!1,i)=>{let a=n[0].dims,s=n[1].dims,u=a.slice(0,-2),l=s.slice(0,-2),d=t?t.slice(0,-2):r.slice(0,-2),f=k.size(d),m=a[a.length-2],b=a[a.length-1],y=s[s.length-1],_=b%4===0&&y%4===0,T=m<=8?[4,1,1]:[4,4,1],w=[8,8,1],x=[Math.ceil(y/w[0]/T[0]),Math.ceil(m/w[1]/T[1]),Math.ceil(f/w[2]/T[2])],S=_?4:1,A=[...u,m,b/S],P=A.length,C=[...l,b,y/S],L=C.length,M=[f,m,y/S],F=[{type:6,data:m},{type:6,data:y},{type:6,data:b}];Jt(e,F),F.push(...W(d,A,C));let X=["rank","rank"],ee=n.length>2;ee&&(F.push(...W(n[2].dims)),X.push("rank")),F.push(...W(M));let ie=j=>{let oe=d.length,Ue=Ra("batchDims",n[0].dataType,oe,1),J=Ve(n[0].dataType),te=R("a",n[0].dataType,P,S),pe=R("b",n[1].dataType,L,S),ue=V("result",n[0].dataType,M.length,S),Se=[te,pe];if(ee){let q=o?S:1;Se.push(R("bias",n[2].dataType,n[2].dims.length,q))}let Be=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Yt(e,Be);let Ge=Ve(ue.type.tensor),fe=Zt(e,ue.type.value,Ge),D=BE(S,ee,fe,[Ue,te,pe,ue],o);return`
  ${j.registerUniforms(Be).registerInternalVariables(Ue).declareVariables(...Se,ue)}
  ${D}
  ${_?Oc(T,w,J,Ue):Pc(T,w,J,Ue)}
                   `};return{name:"MatMul",shaderCache:{hint:`${T};${e.activation};${_};${o}`,inputDependencies:X},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:n[0].dataType}],dispatchGroup:{x:x[0],y:x[1],z:x[2]},programUniforms:F}),getShaderSource:ie}}});var FE,S0,$0=N(()=>{"use strict";de();Fr();we();bn();Ua();T0();qa();FE=(n,e,r,t,o=!1,i,a=4,s=4,u=4,l="f32")=>{let d=X=>{switch(X){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${X} is not supported.`)}},f=X=>{switch(X){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${X} is not supported.`)}},m=n?`
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
    `,y=n?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",_=n?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",T=n?"row":"col",w=n?"col":"row",x=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${n?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${T} / outWidth;
    let outCol = ${T} % outWidth;

    let WRow = ${w} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${w} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${w} % inChannels;
    var resData = ${it(a,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${y} && xCol >= 0 && xCol < ${_}) {
      ${m}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${d(a)}
    }
    return resData;`,S=n?e&&t?`
    let col = colIn * ${a};
    ${x}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${x}
    }
    return ${it(a,l)}(0.0);`:t&&r?`
    let col = colIn * ${a};
    ${x}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${x}
    }
    return ${it(a,l)}(0.0);`,A=n?t&&r?f(s):`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${f(s)}
    }
    return ${it(s,l)}(0.0);`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${f(s)}
    }
    return ${it(s,l)}(0.0);`,P=it(u,l),C=n?it(a,l):it(s,l),L=n?it(s,l):it(a,l),M=Zt(i,P,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${n?S:A}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${L} {
      ${n?A:S}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${P}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${n?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${b}
      ${w0(o)}
      ${M}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},S0=(n,e,r,t,o,i,a,s,u)=>{let l=e.format==="NHWC",d=l?n[0].dims[3]:n[0].dims[1],f=r[0],m=l?r[2]:r[3],b=l?r[1]:r[2],y=l?r[3]:r[1],_=l&&(d%4===0||d%3===0)&&y%4===0,T=l?y:m*b,w=l?m*b:y,x=[8,8,1],S=t<=8?[4,1,1]:[4,4,1],A=[Math.ceil(T/x[0]/S[0]),Math.ceil(w/x[1]/S[1]),Math.ceil(f/x[2]/S[2])];xe("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${A}`);let P=_?l&&d%4!==0?3:4:1,C=x[1]*S[1],L=x[0]*S[0],M=Math.max(x[0]*P,x[1]),F=t%C===0,X=o%L===0,ee=i%M===0,ie=_?[P,4,4]:[1,1,1],j=[{type:6,data:t},{type:6,data:o},{type:6,data:i},{type:6,data:[e.pads[0],e.pads[1]]},{type:6,data:e.strides},{type:6,data:e.dilations}];Jt(e,j),j.push(...W(n[0].dims,n[1].dims));let oe=["rank","rank"];a&&(j.push(...W(n[2].dims)),oe.push("rank")),j.push(...W(r));let Ue=J=>{let te=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Yt(e,te);let pe=_?4:1,ue=Ve(n[0].dataType),Se=`
      fn setOutputAtIndex(flatIndex : i32, value : ${_?`vec4<${ue}>`:ue}) {
        result[flatIndex] = ${_?`vec4<${ue}>`:ue}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${_?`vec4<${ue}>`:ue}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${_?"/ 4":""}, value);
      }`,Be=R("x",n[0].dataType,n[0].dims.length,P===3?1:P),Ge=R("w",n[1].dataType,n[1].dims.length,pe),fe=[Be,Ge],D=V("result",n[0].dataType,r.length,pe);if(a){let q=R("bias",n[2].dataType,n[2].dims.length,pe);fe.push(q),Se+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${_?`vec4<${ue}>`:ue} {
          return bias[coords.${l?"w":"y"}${_?"/ 4":""}];
        }`}return`
        ${x0("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${J.registerUniforms(te).declareVariables(...fe,D)}
        ${Se}
        ${FE(l,F,X,ee,a,e,ie[0],ie[1],ie[2],ue)}
        ${_?Oc(S,x,ue,void 0,!l,M):Pc(S,x,ue,void 0,!l,M,!1,void 0,s)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${e.cacheKey};${P};${_};${F};${X};${ee};${C};${L};${M}`,inputDependencies:oe},getRunData:()=>({outputs:[{dims:u?u(r):r,dataType:n[0].dataType}],dispatchGroup:{x:A[0],y:A[1],z:A[2]},programUniforms:j}),getShaderSource:Ue}}});var VE,A0,ja,GE,O0,UE,P0,E0,C0=N(()=>{"use strict";de();Fr();be();we();bn();Ua();VE=n=>{let e=1;for(let r=0;r<n.length;r++)e*=n[r];return e},A0=n=>typeof n=="number"?[n,n,n]:n,ja=(n,e)=>e<=1?n:n+(n-1)*(e-1),GE=(n,e,r,t=1)=>{let o=ja(e,t);return Math.floor((n[0]*(r-1)-r+o)/2)},O0=(n,e,r,t,o)=>{o==null&&(o=GE(n,e[0],t[0]));let i=[0,0,0,r];for(let a=0;a<3;a++)n[a]+2*o>=e[a]&&(i[a]=Math.trunc((n[a]-e[a]+2*o)/t[a]+1));return i},UE=(n,e,r,t,o,i,a,s,u,l)=>{let d,f,m,b;if(n==="VALID"&&(n=0),typeof n=="number"){d={top:n,bottom:n,left:n,right:n,front:n,back:n};let y=O0([e,r,t,1],[s,u,l],1,[o,i,a],n);f=y[0],m=y[1],b=y[2]}else if(Array.isArray(n)){if(!n.every((_,T,w)=>_===w[0]))throw Error(`Unsupported padding parameter: ${n}`);d={top:n[0],bottom:n[1],left:n[2],right:n[3],front:n[4],back:n[5]};let y=O0([e,r,t,1],[s,u,l],1,[o,i,a],n[0]);f=y[0],m=y[1],b=y[2]}else if(n==="SAME_UPPER"){f=Math.ceil(e/o),m=Math.ceil(r/i),b=Math.ceil(t/a);let y=(f-1)*o+s-e,_=(m-1)*i+u-r,T=(b-1)*a+l-t,w=Math.floor(y/2),x=y-w,S=Math.floor(_/2),A=_-S,P=Math.floor(T/2),C=T-P;d={top:S,bottom:A,left:P,right:C,front:w,back:x}}else throw Error(`Unknown padding parameter: ${n}`);return{padInfo:d,outDepth:f,outHeight:m,outWidth:b}},P0=(n,e,r,t,o,i=!1,a="channelsLast")=>{let s,u,l,d,f;if(a==="channelsLast")[s,u,l,d,f]=n;else if(a==="channelsFirst")[s,f,u,l,d]=n;else throw new Error(`Unknown dataFormat ${a}`);let[m,,b,y,_]=e,[T,w,x]=A0(r),[S,A,P]=A0(t),C=ja(b,S),L=ja(y,A),M=ja(_,P),{padInfo:F,outDepth:X,outHeight:ee,outWidth:ie}=UE(o,u,l,d,T,w,x,C,L,M),j=i?m*f:m,oe=[0,0,0,0,0];return a==="channelsFirst"?oe=[s,j,X,ee,ie]:a==="channelsLast"&&(oe=[s,X,ee,ie,j]),{batchSize:s,dataFormat:a,inDepth:u,inHeight:l,inWidth:d,inChannels:f,outDepth:X,outHeight:ee,outWidth:ie,outChannels:j,padInfo:F,strideDepth:T,strideHeight:w,strideWidth:x,filterDepth:b,filterHeight:y,filterWidth:_,effectiveFilterDepth:C,effectiveFilterHeight:L,effectiveFilterWidth:M,dilationDepth:S,dilationHeight:A,dilationWidth:P,inShape:n,outShape:oe,filterShape:e}},E0=(n,e,r,t,o,i)=>{let a=i==="channelsLast",s=a?n[0].dims[3]:n[0].dims[1],u=!1,l=[64,1,1],d={x:r.map((x,S)=>S)},f=[Math.ceil(VE(d.x.map(x=>r[x]))/l[0]),1,1];xe("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${f}`);let m=u?a&&s%4!==0?3:4:1,b=k.size(r),y=[{type:12,data:b},{type:12,data:t},{type:12,data:o},{type:12,data:e.strides},{type:12,data:e.dilations}];Jt(e,y),y.push(...W(n[0].dims,n[1].dims));let _=["rank","rank"],T=n.length===3;T&&(y.push(...W(n[2].dims)),_.push("rank")),y.push(...W(r));let w=x=>{let S=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:t.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:e.strides.length},{name:"dilations",type:"u32",length:e.dilations.length}];Yt(e,S);let A=u?4:1,P=Ve(n[0].dataType),C=R("x",n[0].dataType,n[0].dims.length,m===3?1:m),L=R("W",n[1].dataType,n[1].dims.length,A),M=[C,L],F=V("result",n[0].dataType,r.length,A),X="";if(T){let j=R("bias",n[2].dataType,n[2].dims.length,A);M.push(j),X+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${P}>`:P} {
          return bias[${a?Q("coords",4,5):Q("coords",1,5)}${u?"/ 4":""}];
        }`}let ee=it(m,P),ie=Zt(e,ee,P);return`
            ${X}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${C.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${L.getByIndices("aIndices")};
            }
          ${x.registerUniforms(S).declareVariables(...M,F)}
          ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${F.offsetToIndices("global_idx")};
              let batch = ${Q("coords",0,C.rank)};
              let d2 = ${a?Q("coords",C.rank-1,C.rank):Q("coords",1,C.rank)};
              let xFRCCorner = vec3<u32>(${a?Q("coords",1,C.rank):Q("coords",2,C.rank)},
              ${a?Q("coords",2,C.rank):Q("coords",3,C.rank)},
              ${a?Q("coords",3,C.rank):Q("coords",4,C.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?Q("uniforms.x_shape",1,C.rank):Q("uniforms.x_shape",2,C.rank)};
              let xShapeZ = ${a?Q("uniforms.x_shape",2,C.rank):Q("uniforms.x_shape",3,C.rank)};
              let xShapeW = ${a?Q("uniforms.x_shape",3,C.rank):Q("uniforms.x_shape",4,C.rank)};
              let xShapeU = ${a?Q("uniforms.x_shape",4,C.rank):Q("uniforms.x_shape",1,C.rank)};
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
              ${T?"value = value + getBiasByOutputCoords(coords)":""};
              ${ie}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${e.cacheKey};${a};${m};${T}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:r,dataType:n[0].dataType}],dispatchGroup:{x:f[0],y:f[1],z:f[2]},programUniforms:y}),getShaderSource:w}}});var D0,k0,N0=N(()=>{"use strict";de();be();we();bn();D0=(n,e,r,t)=>{let o=n.length>2,i=o?"value += b[output_channel];":"",a=n[0].dims,s=n[1].dims,u=e.format==="NHWC",l=u?r[3]:r[1],d=l/e.group,f=u&&d>=4?Ee(l):1,m=k.size(r)/f,b=[{type:12,data:m},{type:12,data:e.dilations},{type:12,data:[e.strides[0],e.strides[1]]},{type:12,data:[e.pads[0],e.pads[1]]},{type:12,data:d}];Jt(e,b),b.push(...W(a,[s[0],s[1],s[2],s[3]/f]));let y=o?["rank","rank","rank"]:["rank","rank"];b.push(...W([r[0],r[1],r[2],r[3]/f]));let _=T=>{let w=V("output",n[0].dataType,r.length,f),x=Ve(w.type.tensor),S=Zt(e,w.type.value,x),A=R("x",n[0].dataType,a.length),P=R("w",n[1].dataType,s.length,f),C=[A,P];o&&C.push(R("b",n[2].dataType,n[2].dims,f));let L=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:e.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Yt(e,L);let M=u?`
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
            let xVal = ${A.get("batch","xHeight","xWidth","input_channel")};
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

            let xVal = ${A.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${P.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${T.registerUniforms(L).declareVariables(...C,w)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${w.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${f} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${w.type.value} = ${w.type.value}(0);
    ${M}
    ${i}
    ${S}
    ${w.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${e.cacheKey}_${f}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:t?t(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:b}),getShaderSource:_}},k0=(n,e,r,t)=>{let o=n.length>2,i=Ee(r[3]),a=Ee(r[2]),s=k.size(r)/i/a,u=[n[0].dims[0],n[0].dims[1],n[0].dims[2],n[0].dims[3]/i],l=[n[1].dims[0],n[1].dims[1],n[1].dims[2],n[1].dims[3]/i],d=[r[0],r[1],r[2],r[3]/i],f=[{type:12,data:s},{type:6,data:[e.strides[0],e.strides[1]]},{type:6,data:[e.pads[0],e.pads[1]]}];Jt(e,f),f.push(...W(u,l,d));let m=(a-1)*e.strides[1]+l[1],b=y=>{let _=V("output",n[0].dataType,d.length,i),T=Ve(_.type.tensor),w=Zt(e,_.type.value,T),x=R("x",n[0].dataType,u.length,i),S=R("w",n[1].dataType,l.length,i),A=[x,S];o&&A.push(R("b",n[2].dataType,n[2].dims,i));let P=o?"value += b[output_channel];":"",C=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Yt(e,C),`
  ${y.registerUniforms(C).declareVariables(...A,_)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${a}u;
    let col = (index1 % width1) * ${a}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${x.type.value}, ${m}>;
    var values: array<${_.type.value}, ${a}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${m}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${x.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${x.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${S.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${a}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${a}u; i++) {
      var value = values[i];
      ${P}
      ${w}
      ${_.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${e.cacheKey};${i};${a};${m};${l[0]};${l[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:t?t(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:f}),getShaderSource:b}}});var WE,Ec,HE,Cc,Dc,L0,qE,jE,kc,R0=N(()=>{"use strict";be();$0();C0();qa();N0();bn();Ha();Yr();WE=(n,e,r,t,o,i)=>{let a=n[0],s=n.slice(i?1:2,i?3:4),u=s.length,l=e[0],f=e.slice(2).map((y,_)=>y+(y-1)*(r[_]-1)),b=s.map((y,_)=>y+t[_]+t[_+u]).map((y,_)=>Math.floor((y-f[_]+o[_])/o[_]));return b.splice(0,0,a),b.splice(i?3:1,0,l),b},Ec=[2,3,1,0],HE=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length>5)throw new Error("greater than 5D is not supported");if(n[0].dims.length!==n[1].dims.length)throw new Error("filter does not have same dimension as input");let r=n[0].dims[e.format==="NHWC"?n[0].dims.length-1:1],t=n[1].dims[1]*e.group;if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(n.length===3&&(n[2].dims.length!==1||n[1].dims[0]!==n[2].dims[0]))throw new Error("invalid bias");let o=n[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape")},Cc=(n,e)=>{let r=n.kernelShape.slice();r.length<e[1].dims.length-2&&r.push(...Array(e[1].dims.length-2-r.length).fill(0));for(let i=2;i<e[1].dims.length;++i)r[i-2]===0&&(r[i-2]=e[1].dims[i]);let t=n.pads.slice();Mn.adjustPadsBasedOnAutoPad(e[0].dims,n.strides,n.dilations,r,t,n.format==="NHWC",n.autoPad);let o=Object.assign({},n);return Object.assign(o,{kernelShape:r,pads:t}),o},Dc=n=>{let e=Ga(n),r=n.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][n.auto_pad],o=n.dilations,i=n.group,a=n.kernel_shape,s=n.pads,u=n.strides,l=n.w_is_const();return{autoPad:t,format:r,dilations:o,group:i,kernelShape:a,pads:s,strides:u,wIsConst:l,...e,cacheKey:`${n.format};${e.activation};`}},L0=(n,e,r,t)=>{let o=r.format==="NHWC",i=WE(e[0].dims,e[1].dims,r.dilations,r.pads,r.strides,o);if(r.group!==1){let C=[e[0]];if(o){let M=n.kernelCustomData.wT??n.compute(ut(e[1],Ec),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=M),C.push(M)}else C.push(e[1]);e.length===3&&C.push(e[2]),!n.adapterInfo.isArchitecture("ampere")&&o&&e[1].dims[0]===r.group&&e[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?n.compute(k0(C,r,i,t),{inputs:C}):n.compute(D0(C,r,i,t),{inputs:C});return}let a=e.length===3,s=e[0].dims[o?1:2],u=e[0].dims[o?2:3],l=e[0].dims[o?3:1],d=e[1].dims[2],f=e[1].dims[3],m=i[o?1:2],b=i[o?2:3],y=i[o?3:1],_=o&&d===s&&f===u&&r.pads[0]===0&&r.pads[1]===0;if(_||d===1&&f===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let C=i[0],L,M,F,X=[];if(o){let j=n.kernelCustomData.wT??n.compute(ut(e[1],Ec),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=j),_){let oe=s*u*l;L=e[0].reshape([1,C,oe]),M=j.reshape([1,oe,y]),F=[1,C,y]}else L=e[0].reshape([C,s*u,l]),M=j.reshape([1,l,y]),F=[C,m*b,y];X.push(L),X.push(M)}else L=e[0].reshape([C,l,s*u]),M=e[1].reshape([1,y,l]),F=[C,y,m*b],X.push(M),X.push(L);a&&X.push(e[2]);let ee=F[2],ie=X[0].dims[X[0].dims.length-1];ee<8&&ie<8?n.compute(Wa(X,r,i,F,o,t),{inputs:X}):n.compute(Ho(X,r,i,F,o,t),{inputs:X});return}let T=!0,w=n.kernelCustomData.wT??n.compute(ut(e[1],Ec),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=w);let x=[e[0],w];a&&x.push(e[2]);let S=o?m*b:y,A=o?y:m*b,P=d*f*l;n.compute(S0(x,r,i,S,A,P,a,T,t),{inputs:x})},qE=(n,e)=>{let r=e.format==="NHWC",t=[n.inputs[0].reshape(r?[n.inputs[0].dims[0],1,n.inputs[0].dims[1],n.inputs[0].dims[2]]:[n.inputs[0].dims[0],n.inputs[0].dims[1],1,n.inputs[0].dims[2]]),n.inputs[1].reshape([n.inputs[1].dims[0],n.inputs[1].dims[1],1,n.inputs[1].dims[2]])];n.inputs.length===3&&t.push(n.inputs[2]);let o=[0,e.pads[0],0,e.pads[1]],i=[1].concat(e.strides),a=[1].concat(e.dilations),s=[1].concat(e.kernelShape),u=Cc({...e,pads:o,strides:i,dilations:a,kernelShape:s},t);L0(n,t,u,l=>r?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},jE=(n,e,r)=>{let t=r.format==="NHWC"?"channelsLast":"channelsFirst",o=Cc(r,e),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,a=P0(e[0].dims,e[1].dims,r.strides,r.dilations,i,!1,t);n.compute(E0(e,o,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],t))},kc=(n,e)=>{if(HE(n.inputs,e),n.inputs[0].dims.length===3)qE(n,e);else if(n.inputs[0].dims.length===5)jE(n,n.inputs,e);else{let r=Cc(e,n.inputs);L0(n,n.inputs,r)}}});var z0,M0=N(()=>{"use strict";de();Fr();be();we();z0=(n,e,r)=>{let t=n.length>2,o=e.outputShape,i=e.format==="NHWC",a=e.group,s=n[1].dims,u=s[2]/a,l=s[3],d=i?Ee(u):1,f=i&&l===1&&u>=4,m=f?Math.floor(u/4)*4:Math.floor(u/d)*d,b=u-m,y=i?Ee(l):1,_=i?l===1?d:y:1,T=k.size(o)/y,w=[Math.ceil(T/64),1,1];xe("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${w}`);let x=["rank","rank"],S=[e.strides[0],e.strides[1]],A=[e.kernelShape[i?1:2],e.kernelShape[i?2:3]],P=[e.dilations[0],e.dilations[1]],C=[A[0]+(e.dilations[0]<=1?0:(e.kernelShape[i?1:2]-1)*(e.dilations[0]-1)),A[1]+(e.dilations[1]<=1?0:(e.kernelShape[i?2:3]-1)*(e.dilations[1]-1))],L=[C[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),C[1]-1-Math.floor((e.pads[1]+e.pads[3])/2)],M=[{type:12,data:T},{type:12,data:S},{type:12,data:A},{type:12,data:P},{type:12,data:C},{type:6,data:L},{type:12,data:m},{type:12,data:u},{type:12,data:l},...W(n[0].dims,n[1].dims)];t&&(M.push(...W(n[2].dims)),x.push("rank")),M.push(...W(o));let F=X=>{let ee=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:S.length},{name:"filter_dims",type:"u32",length:A.length},{name:"dilations",type:"u32",length:A.length},{name:"effective_filter_dims",type:"u32",length:C.length},{name:"pads",type:"i32",length:L.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],ie=Ve(n[0].dataType),j=i?1:2,oe=i?2:3,Ue=i?3:1,J=R("W",n[1].dataType,n[1].dims.length,_),te=R("Dy",n[0].dataType,n[0].dims.length,d),pe=[te,J];t&&pe.push(R("bias",n[2].dataType,[o[Ue]].length,y));let ue=V("result",n[0].dataType,o.length,y),Se=()=>{let fe="";if(f)d===4?fe+=`
        let xValue = ${te.getByOffset("x_offset")};
        let wValue = ${J.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:d===2?fe+=`
          dotProd = dotProd + dot(vec4<${ie}>(${te.getByOffset("x_offset")}, ${te.getByOffset("x_offset + 1u")}), vec4<${ie}>(${J.getByOffset("w_offset")}, ${J.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:d===1&&(fe+=`
          dotProd = dotProd + dot(vec4<${ie}>(${te.getByOffset("x_offset")}, ${te.getByOffset("x_offset + 1u")}, ${te.getByOffset("x_offset + 2u")}, ${te.getByOffset("x_offset + 3u")}), vec4<${ie}>(${J.getByOffset("w_offset")}, ${J.getByOffset("w_offset + 1u")}, ${J.getByOffset("w_offset + 2u")}, ${J.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(fe+=`
                  let xValue = ${i?te.getByOffset(`${te.indicesToOffset(`${te.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${d}`):te.get("batch","inputChannel","idyR","idyC")};
        `,d===1)fe+=`
          let w_offset = ${J.indicesToOffset(`${J.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${J.getByOffset(`w_offset / ${_}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let D=0;D<d;D++)fe+=`
            let wValue${D} = ${J.getByOffset(`${J.indicesToOffset(`${J.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${D}, wOutChannel)`)} / ${_}`)};
            dotProd = dotProd + xValue[${D}] * wValue${D};`;return fe},Be=()=>{if(b===0)return"";if(!f)throw new Error(`packInputAs4 ${f} is not true.`);let fe="";if(d===1){fe+="dotProd = dotProd";for(let D=0;D<b;D++)fe+=`
            + ${te.getByOffset(`x_offset + ${D}`)} * ${J.getByOffset(`w_offset + ${D}`)}`;fe+=";"}else if(d===2){if(b!==2)throw new Error(`Invalid inputChannelsRemainder ${b}.`);fe+=`
          let xValue = ${te.getByOffset("x_offset")};
          let wValue = ${J.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return fe},Ge=`
            let outputIndices = ${ue.offsetToIndices(`global_idx * ${y}`)};
            let batch = ${ue.indicesGet("outputIndices",0)};
            let d1 = ${ue.indicesGet("outputIndices",Ue)};
            let r = ${ue.indicesGet("outputIndices",j)};
            let c = ${ue.indicesGet("outputIndices",oe)};
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
              let dyR = (${ie}(dyRCorner) + ${ie}(wR)) / ${ie}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${ie}(uniforms.Dy_shape[${j}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${ie}(dyCCorner) + ${ie}(wC)) / ${ie}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${ie}(uniforms.Dy_shape[${oe}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${f?`
                var x_offset = ${te.indicesToOffset(`${te.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${d};
                var w_offset = ${J.indicesToOffset(`${J.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${_};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${f?4:d}) {
                  ${Se()}
                  inputChannel = inputChannel + ${f?4:d};
                }
                ${Be()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${t?` + bias[d1 / ${y}]`:""};
            ${ue.setByOffset("global_idx","value")};
          `;return`
    ${X.registerUniforms(ee).declareVariables(...pe,ue)}
      ${X.mainStart()}
      ${X.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${Ge}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${e.cacheKey};${d}${_}${y}${f}${b}`,inputDependencies:x},getRunData:()=>({dispatchGroup:{x:w[0],y:w[1],z:w[2]},outputs:[{dims:r?r(o):o,dataType:n[0].dataType}],programUniforms:M}),getShaderSource:F}}});var KE,XE,ZE,B0,F0,JE,V0,YE,G0,U0=N(()=>{"use strict";M0();bn();Yr();KE=(n,e,r,t,o,i)=>(n-1)*e+r+(t-1)*o+1-i,XE=(n,e,r,t,o)=>{let i=Math.floor(n/2);e==="SAME_UPPER"?(r[t]=i,r[o]=n-i):e==="SAME_LOWER"&&(r[t]=n-i,r[o]=i)},ZE=(n,e,r,t,o,i,a,s,u,l)=>{let d=n.length-2,f=l.length===0;u.length<d&&u.push(...Array(d-u.length).fill(0));let m=n[0],b=e[s?3:1]*o;for(let y=0,_=n.length-d-(s?1:0);y<d;++y,++_){let T=n[_],w=f?T*a[y]:l[y],x=KE(T,a[y],i[y],e[_],r[y],w);XE(x,t,i,y,y+d),f&&l.push(a[y]*(T-1)+u[y]+(e[_]-1)*r[y]+1-i[y]-i[y+d])}l.splice(0,0,m),l.splice(s?3:1,0,b)},B0=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0||n.kernelShape.reduce((f,m)=>f*m,1)===0){r.length=0;for(let f=2;f<e[1].dims.length;++f)r.push(e[1].dims[f])}let t=n.format==="NHWC";r.splice(0,0,e[1].dims[0]),r.splice(t?3:1,0,e[1].dims[1]);let o=n.pads.slice(),i=n.outputShape.slice(),a=n.outputPadding.slice(),s=e[0].dims,u=n.dilations.slice();if(u.reduce((f,m)=>f+m,0)===0){let f=e[0].dims.length-2;u=new Array(f).fill(1)}let l=n.strides.slice();if(l.reduce((f,m)=>f+m,0)===0){let f=e[0].dims.length-2;l=new Array(f).fill(1)}ZE(s,r,u,n.autoPad,n.group,o,l,t,a,i);let d=Object.assign({},n);return Object.assign(d,{kernelShape:r,pads:o,outputPadding:a,outputShape:i,dilations:u,strides:l}),d},F0=n=>{let e=Ga(n),r=n.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof n.autoPad>"u"?0:n.autoPad],o=n.dilations,i=n.group,a=n.kernelShape,s=n.pads,u=n.strides,l=n.wIsConst(),d=n.outputPadding,f=n.outputShape;return{autoPad:t,format:r,dilations:o,group:i,kernelShape:a,outputPadding:d,outputShape:f,pads:s,strides:u,wIsConst:l,...e,cacheKey:`${n.format};${e.activation};`}},JE=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4&&n[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(n[0].dims.length!==n[1].dims.length)throw new Error("filter does not have same dimension as input");let r=n[0].dims[e.format==="NHWC"?n[0].dims.length-1:1],t=n[1].dims[0];if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=n[1].dims[1]*e.group;if(n.length===3&&(n[2].dims.length!==1||n[2].dims[0]!==o))throw new Error("invalid bias");let i=n[0].dims.length-2;if(e.dilations.reduce((d,f)=>d+f,0)>0&&e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.reduce((d,f)=>d+f,0)>0&&e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.reduce((d,f)=>d+f,0)>0&&e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i&&e.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.reduce((d,f)=>d+f,0)>0&&e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==n[0].dims.length-2)throw new Error("invalid output shape")},V0=(n,e,r,t)=>{let o=n.kernelCustomData.wT??n.compute(ut(e[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=o);let i=[e[0],o];e.length===3&&i.push(e[2]),n.compute(z0(i,r,t),{inputs:i})},YE=(n,e)=>{let r=e.format==="NHWC",t=[n.inputs[0].reshape(r?[n.inputs[0].dims[0],1,n.inputs[0].dims[1],n.inputs[0].dims[2]]:[n.inputs[0].dims[0],n.inputs[0].dims[1],1,n.inputs[0].dims[2]]),n.inputs[1].reshape([n.inputs[1].dims[0],n.inputs[1].dims[1],1,n.inputs[1].dims[2]])];n.inputs.length===3&&t.push(n.inputs[2]);let o=e.kernelShape;(o.length===0||o[0]===0)&&(o=[n.inputs[1].dims[2]]);let i=e.dilations;(i.length===0||i[0]===0)&&(i=[1]);let a=e.strides;(a.length===0||a[0]===0)&&(a=[1]);let s=e.pads;s.length===0&&(s=[0,0]),s=[0,s[0],0,s[1]],a=[1].concat(a),i=[1].concat(i),o=[1].concat(o);let u=e.outputPadding;u=[0].concat(u);let l=B0({...e,pads:s,strides:a,dilations:i,kernelShape:o,outputPadding:u},t);V0(n,t,l,d=>r?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},G0=(n,e)=>{if(JE(n.inputs,e),n.inputs[0].dims.length===3)YE(n,e);else{let r=B0(e,n.inputs);V0(n,n.inputs,r)}}});var QE,W0,H0,q0=N(()=>{"use strict";de();be();Qe();we();QE=(n,e,r,t)=>{let o=k.size(e),i=e.length,a=R("input",n,i),s=V("output",n,i),u=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),l=k.normalizeAxis(u,i),d=f=>{let m=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,b=Q("uniforms.input_shape","uniforms.axis",i),y=t.reverse?m+(t.exclusive?" + 1":""):"0",_=t.reverse?b:m+(t.exclusive?"":" + 1");return`
                ${f.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,s)}
                ${f.mainStart()}
                  ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${s.offsetToIndices("global_idx")};
                  var sum = ${s.type.value}(0);
                  let first : i32 = ${y};
                  let last : i32 = ${_};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${s.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:e,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:l},...W(e,e)]}),getShaderSource:d}},W0=(n,e)=>{let r=n.inputs[0].dims,t=n.inputs[0].dataType,o=n.inputs[1];n.compute(QE(t,r,o,e),{inputs:[0]})},H0=n=>{let e=n.exclusive===1,r=n.reverse===1;return ce({exclusive:e,reverse:r})}});var eC,tC,rC,j0,K0,X0=N(()=>{"use strict";de();be();Qe();we();eC=n=>{if(!n||n.length!==1)throw new Error("DepthToSpace requires 1 input.");if(n[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},tC=(n,e,r,t)=>{let o=[];o.push(`fn perm(i: ${t.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<e;++i)o.push(r.indicesSet("a",n[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},rC=(n,e)=>{let r,t,o,i,a,s,u=e.format==="NHWC",l=e.blocksize,d=e.mode==="DCR";u?([r,t,o,i]=n.dims,a=d?[r,t,o,l,l,i/l**2]:[r,t,o,i/l**2,l,l],s=d?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,t,o,i]=[n.dims[0],n.dims[2],n.dims[3],n.dims[1]],a=d?[r,l,l,i/l**2,t,o]:[r,i/l**2,l,l,t,o],s=d?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let f=n.reshape(a),m=f.dims.length,b=n.dataType,y=R("a",b,m),_=V("output",b,m),T=w=>`
  ${w.registerUniform("output_size","u32").declareVariables(y,_)}

  ${tC(s,m,y,_)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${_.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${_.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${n.dims};${e.blocksize};${e.mode}`,inputDependencies:["rank"]},getRunData:w=>{let x=u?[r,t*l,o*l,i/l**2]:[r,i/l**2,t*l,o*l],S=k.size(x),A=f.dims,P=k.sortBasedOnPerm(A,s);return{outputs:[{dims:x,dataType:w[0].dataType}],dispatchGroup:{x:Math.ceil(S/64)},programUniforms:[{type:12,data:S},...W(A,P)]}},getShaderSource:T}},j0=(n,e)=>{eC(n.inputs),n.compute(rC(n.inputs[0],e))},K0=n=>ce({blocksize:n.blocksize,mode:n.mode,format:n.format})});var Nc,Ka,Z0,nC,oC,Lc,Rc,J0,iC,Y0,Q0,ew=N(()=>{"use strict";de();be();Qe();we();Nc="[a-zA-Z]|\\.\\.\\.",Ka="("+Nc+")+",Z0="^"+Ka+"$",nC="("+Ka+",)*"+Ka,oC="^"+nC+"$",Lc=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,r){let t=this.symbolToIndices.get(e);t===void 0?t=[r]:t.push(r),this.symbolToIndices.set(e,t)}},Rc=class{constructor(e,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[t,o]=r.includes("->")?r.split("->",2):[r,""];if(!t.match(RegExp(oC)))throw new Error("Invalid LHS term");if(t.split(",").forEach((s,u)=>{let l=e[u].dims.slice();if(!s.match(RegExp(Z0)))throw new Error("Invalid LHS term");let d=this.processTerm(s,!0,l,u);this.lhs.push(d)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([s,u])=>u.count===1||s==="...").map(([s])=>s).join("");else if(!o.match(RegExp(Ka)))throw new Error("Invalid RHS");o.match(RegExp(Nc,"g"))?.forEach(s=>{if(s==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let u=this.symbolToInfo.get(s);if(u===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(u.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(e,r,t){let o=this.symbolToInfo.get(e);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(t)}else o={count:1,dimValue:r,inputIndices:[t]};this.symbolToInfo.set(e,o)}processTerm(e,r,t,o=-1){let i=t.length,a=!1,s=[],u=0;if(!e.match(RegExp(Z0))&&!r&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(Nc,"g")),d=new Lc(o);return l?.forEach((f,m)=>{if(f==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let b=i-l.length+1;if(b<0)throw new Error("Ellipsis out of bounds");if(s=t.slice(u,u+b),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let y=0;y<s.length;y++){let _=String.fromCharCode(48+y);d.addSymbol(_,m+y),this.addSymbol(_,t[u++],o)}}else d.addSymbol(f,m+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(f,t[u++],o)}),d}},J0=n=>n+"_max",iC=(n,e,r,t)=>{let i=n.map(d=>d.length).map((d,f)=>R(`input${f}`,e,d)),a=k.size(t),s=V("output",e,t.length),u=[...r.symbolToInfo.keys()].filter(d=>!r.rhs.symbolToIndices.has(d)),l=d=>{let f=[],m="var prod = 1.0;",b="var sum = 0.0;",y="sum += prod;",_=[],T=[],w=[],x=[],S=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((P,C)=>{if(r.rhs.symbolToIndices.has(C)){let L=r.rhs.symbolToIndices.get(C)?.[0];L!==void 0&&r.lhs.forEach((M,F)=>{if(P.inputIndices.includes(F)){let X=M.symbolToIndices.get(C);if(X===void 0)throw new Error("Invalid symbol error");X.forEach(ee=>{f.push(`${i[F].indicesSet(`input${F}Indices`,ee,s.indicesGet("outputIndices",L))}`)})}})}else r.lhs.forEach((L,M)=>{if(P.inputIndices.includes(M)){let F=L.symbolToIndices.get(C);if(F===void 0)throw new Error("Invalid symbol error");F.forEach(X=>{_.push(`${i[M].indicesSet(`input${M}Indices`,X,`${C}`)}`)}),x.push(`prod *= ${i[M].getByIndices(`input${M}Indices`)};`)}}),T.push(`for(var ${C}: u32 = 0; ${C} < uniforms.${J0(C)}; ${C}++) {`),w.push("}")});let A=S?[...f,`let sum = ${i.map((P,C)=>P.getByIndices(`input${C}Indices`)).join(" * ")};`]:[...f,b,...T,..._,m,...x,y,...w];return`
            ${d.registerUniforms(u.map(P=>({name:`${J0(P)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,s)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${i.map((P,C)=>`var input${C}Indices: ${i[C].type.indices};`).join(`
`)}
            ${A.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:n.map(()=>"rank")},getRunData:()=>{let d=u.filter(m=>r.symbolToInfo.has(m)).map(m=>({type:12,data:r.symbolToInfo.get(m)?.dimValue||0}));d.push({type:12,data:a});let f=n.map((m,b)=>[...W(m)]).reduce((m,b)=>m.concat(b),d);return f.push(...W(t)),{outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:f}},getShaderSource:l}},Y0=(n,e)=>{let r=new Rc(n.inputs,e.equation),t=r.outputDims,o=n.inputs.map((i,a)=>i.dims);n.compute(iC(o,n.inputs[0].dataType,r,t))},Q0=n=>{let e=n.equation.replace(/\s+/g,"");return ce({equation:e})}});var aC,tw,sC,uC,rw,nw=N(()=>{"use strict";de();be();we();aC=n=>{if(!n||n.length!==2)throw new Error("Expand requires 2 input.");let e=n[0].dims,r=Array.from(n[1].getBigInt64Array(),Number),t=r.length<e.length?0:r.length-e.length,o=e.length<r.length?0:e.length-r.length;for(;t<r.length&&o<e.length;++t,++o)if(r[t]!==e[o]&&r[t]!==1&&e[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},tw=(n,e)=>{let r=n.length-e.length,t=[];for(let o=0;o<r;++o)t.push(n[o]);for(let o=0;o<e.length;++o)t.push(e[o]===1?n[o+r]:e[o]);return t},sC=(n,e)=>n.length>e.length?tw(n,e):tw(e,n),uC=n=>{let e=n[0].dims,r=Array.from(n[1].getBigInt64Array(),Number),t=sC(e,r),o=n[0].dataType,i=o===9||k.size(e)===1,a=o===9||e.length>0&&e[e.length-1]%4===0?4:1,s=i||t.length>0&&t[t.length-1]%4===0?4:1,u=Math.ceil(k.size(t)/s),l=f=>{let m=R("input",o,e.length,a),b=V("output",o,t.length,s),y;if(o===9){let _=(T,w,x="")=>`
          let outputIndices${w} = ${b.offsetToIndices(`outputOffset + ${w}u`)};
          let offset${w} = ${m.broadcastedIndicesToOffset(`outputIndices${w}`,b)};
          let index${w} = offset${w} / 4u;
          let component${w} = offset${w} % 4u;
          ${T}[${w}] = ${x}(${m.getByOffset(`index${w}`)}[component${w}]);
        `;y=`
        let outputOffset = global_idx * ${s};
        var data = vec4<u32>(0);
        ${_("data",0,"u32")}
        ${_("data",1,"u32")}
        ${_("data",2,"u32")}
        ${_("data",3,"u32")}
        ${b.setByOffset("global_idx","data")}
      }`}else y=`
        let outputIndices = ${b.offsetToIndices(`global_idx * ${s}`)};
        let inputOffset = ${m.broadcastedIndicesToOffset("outputIndices",b)};
        let data = ${b.type.value}(${m.getByOffset(`inputOffset / ${a}`)});
        ${b.setByOffset("global_idx","data")}
      }`;return`
    ${f.registerUniform("vec_size","u32").declareVariables(m,b)}
    ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${y}`},d=[{type:12,data:u},...W(e,t)];return{name:"Expand",shaderCache:{hint:`${t.length};${a}${s}`,inputDependencies:["rank"]},getShaderSource:l,getRunData:()=>({outputs:[{dims:t,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d})}},rw=n=>{aC(n.inputs),n.compute(uC(n.inputs),{inputs:[0]})}});var lC,ow,iw=N(()=>{"use strict";de();be();we();Va();lC=n=>{let e=n[0].dataType,r=k.size(n[0].dims),t=k.size(n[1].dims),o=t%4===0,i=a=>{let s=R("x",e,[1],4),u=R("bias",e,[1],4),l=V("y",e,[1],4),d=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],f=b=>`
      let bias${b}_offset: u32 = (global_idx * 4 + ${b}) % uniforms.bias_size;
      let bias${b} = ${u.getByOffset(`bias${b}_offset / 4`)}[bias${b}_offset % 4];`,m=o?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${f(0)}${f(1)}${f(2)}${f(3)}
      let bias = ${s.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(d).declareVariables(s,u,l)}

    ${$c(st(e))}

    ${a.mainStart(Bn)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${s.getByOffset("global_idx")};
      ${m}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",Ac("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:t}],dispatchGroup:{x:Math.ceil(r/Bn/4)}})}},ow=n=>{n.inputs.length<2||k.size(n.inputs[1].dims)===0?e0(n):n.compute(lC(n.inputs))}});var cC,dC,aw,sw,uw=N(()=>{"use strict";de();be();Qe();we();cC=n=>{if(!n||n.length!==2)throw new Error("Gather requires 2 inputs.")},dC=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r.length,i=k.normalizeAxis(e.axis,o),a=r.slice(0);a.splice(i,1,...t);let s=r[i],u=n[0].dataType===9?4:1,l=Math.ceil(k.size(a)/u),d=[{type:12,data:l},{type:6,data:s},{type:12,data:i},...W(n[0].dims,n[1].dims,a)],f=m=>{let b=R("data",n[0].dataType,n[0].dims.length,u),y=R("inputIndices",n[1].dataType,n[1].dims.length),_=V("output",n[0].dataType,a.length,u),T=x=>{let S=t.length,A=`var indicesIndices${x}  = ${y.type.indices}(0);`;for(let P=0;P<S;P++)A+=`${S>1?`indicesIndices${x}[${P}]`:`indicesIndices${x}`} = ${a.length>1?`outputIndices${x}[uniforms.axis + ${P}]`:`outputIndices${x}`};`;A+=`
          var idx${x} = ${y.getByIndices(`indicesIndices${x}`)};
          if (idx${x} < 0) {
            idx${x} = idx${x} + uniforms.axisDimLimit;
          }
          var dataIndices${x} : ${b.type.indices};
        `;for(let P=0,C=0;P<o;P++)P===i?(A+=`${o>1?`dataIndices${x}[${P}]`:`dataIndices${x}`} = u32(idx${x});`,C+=S):(A+=`${o>1?`dataIndices${x}[${P}]`:`dataIndices${x}`} = ${a.length>1?`outputIndices${x}[${C}]`:`outputIndices${x}`};`,C++);return A},w;if(n[0].dataType===9){let x=(S,A,P="")=>`
          let outputIndices${A} = ${_.offsetToIndices(`outputOffset + ${A}u`)};
          ${T(A)};
          let offset${A} = ${b.indicesToOffset(`dataIndices${A}`)};
          let index${A} = offset${A} / 4u;
          let component${A} = offset${A} % 4u;
          ${S}[${A}] = ${P}(${b.getByOffset(`index${A}`)}[component${A}]);
        `;w=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${x("value",0,"u32")}
        ${x("value",1,"u32")}
        ${x("value",2,"u32")}
        ${x("value",3,"u32")}
        ${_.setByOffset("global_idx","value")}
      `}else w=`
      let outputIndices = ${_.offsetToIndices("global_idx")};
      ${T("")};
      let value = ${b.getByIndices("dataIndices")};
      ${_.setByOffset("global_idx","value")};
      `;return`
      ${m.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(b,y,_)}
      ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${w}
      }`};return{name:"Gather",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:f}},aw=n=>ce({axis:n.axis}),sw=(n,e)=>{let r=n.inputs;cC(r),n.compute(dC(n.inputs,e))}});var pC,lw,cw,dw=N(()=>{"use strict";de();be();we();pC=(n,e,r,t,o,i,a,s,u)=>{let l=[{type:12,data:i},{type:12,data:t},{type:12,data:o},{type:12,data:r},{type:12,data:a},{type:12,data:s},{type:12,data:u}],d=[i];l.push(...W(e.dims,d));let f=m=>{let b=R("indices_data",e.dataType,e.dims.length),y=V("input_slice_offsets_data",12,1,1),_=[b,y],T=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${m.registerUniforms(T).declareVariables(..._)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
  }`};return n.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:d,dataType:n.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:l}),getShaderSource:f},{inputs:[e],outputs:[-1]})[0]},lw=(n,e)=>{let r=n.inputs,t=r[0].dims,o=r[0].dataType,i=r[1].dims,a=i[i.length-1],s=k.sizeToDimension(i,i.length-1),u=k.sizeFromDimension(t,e.batchDims+a),l=k.sizeToDimension(t,e.batchDims),d=k.sizeFromDimension(t,e.batchDims),f=s/l,m=new Array(a),b=u;for(let A=0;A<a;++A)m[a-1-A]=b,b*=t[e.batchDims+a-1-A];let y=pC(n,r[1],m,e.batchDims,t,s,f,d,a),_=e.batchDims+a;if(_>t.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let T=i.slice(0,-1).concat(t.slice(_)),w=k.size(T),x=[{type:12,data:w},{type:12,data:u},...W(r[0].dims,y.dims,T)],S=A=>{let P=R("data",r[0].dataType,r[0].dims.length),C=R("slice_offsets",12,y.dims.length),L=V("output",r[0].dataType,T.length);return`
          ${A.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(P,C,L)}
            ${A.mainStart()}
            ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};n.compute({name:"GatherND",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:T,dataType:o}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:x}),getShaderSource:S},{inputs:[r[0],y]})},cw=n=>({batchDims:n.batch_dims,cacheKey:""})});var fC,hC,pw,fw,hw=N(()=>{"use strict";de();be();Qe();we();fC=(n,e)=>{if(n.length<3||n.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=k.normalizeAxis(e.quantizeAxis,n[0].dims.length),t=e.blockSize,o=n[0],i=n[2],a=n.length===4?n[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((s,u)=>u===r?Math.ceil(s/t)===i.dims[u]:s===i.dims[u]).reduce((s,u)=>s&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==i.dims.length||!a.dims.map((s,u)=>s===i.dims[u]).reduce((s,u)=>s&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},hC=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r.length,i=k.normalizeAxis(e.gatherAxis,o),a=k.normalizeAxis(e.quantizeAxis,o),s=r.slice(0);s.splice(i,1,...t);let u=k.size(s),l=n[2].dataType,f=n[0].dataType===22,m=[{type:12,data:u},{type:12,data:a},{type:12,data:i},{type:12,data:e.blockSize},...W(...n.map((y,_)=>y.dims),s)],b=y=>{let _=R("data",n[0].dataType,n[0].dims.length),T=R("inputIndices",n[1].dataType,n[1].dims.length),w=R("scales",n[2].dataType,n[2].dims.length),x=n.length>3?R("zeroPoint",n[3].dataType,n[3].dims.length):void 0,S=V("output",l,s.length),A=[_,T,w];x&&A.push(x);let P=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${y.registerUniforms(P).declareVariables(...A,S)}
        ${y.mainStart()}
        let output_indices = ${S.offsetToIndices("global_idx")};
        var indices_indices = ${T.type.indices}(0);
        ${t.length>1?`
          for (var i: u32 = 0; i < ${t.length}; i++) {
            let index = ${S.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${T.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${S.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${_.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${S.indicesGet("output_indices","i")};
          ${_.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${T.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[i]};
        }
        ${_.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${s.length}; i++) {
          let index = ${S.indicesGet("output_indices",`i + ${t.length} - 1`)};
          ${_.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${_.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${_.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${w.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${w.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${w.getByIndices("scale_indices")};
        ${x?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${x.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${x.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${st(l)}(quantized_data - zero_point) * scale;
        ${S.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${e.cacheKey};${n.filter((y,_)=>_!==1).map(y=>y.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:n.length},(y,_)=>"rank")},getRunData:()=>({outputs:[{dims:s,dataType:l}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:m}),getShaderSource:b}},pw=(n,e)=>{let r=n.inputs;fC(r,e),n.compute(hC(n.inputs,e))},fw=n=>ce({blockSize:n.blockSize,gatherAxis:n.gatherAxis,quantizeAxis:n.quantizeAxis})});var mC,gC,mw,gw,bw=N(()=>{"use strict";de();be();Qe();we();mC=n=>{if(!n||n.length!==2)throw new Error("GatherElements requires 2 inputs.");if(n[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(n[0].dims.length!==n[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},gC=(n,e)=>{let r=n[0].dims,t=n[0].dataType,o=r.length,i=n[1].dims,a=n[1].dataType,s=k.normalizeAxis(e.axis,o),u=r[s],l=i.slice(0),d=k.size(l),f=R("input",t,o),m=R("indicesInput",a,i.length),b=V("output",t,l.length),y=[{type:12,data:d},{type:6,data:u},{type:12,data:s}];return y.push(...W(r,i,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:y}),getShaderSource:w=>`
      ${w.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,m,b)}
      ${w.mainStart()}
      ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${b.offsetToIndices("global_idx")};

      var idx = ${m.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${b.setByOffset("global_idx","value")};
  }`}},mw=n=>ce({axis:n.axis}),gw=(n,e)=>{let r=n.inputs;mC(r),n.compute(gC(n.inputs,e))}});var bC,yC,yw,_w,vw=N(()=>{"use strict";de();be();we();bC=n=>{if(!n)throw new Error("Input is missing");if(n.length<2||n.length>3)throw new Error("Invaid input number.");if(n.length===3&&n[2].dims.length>2)throw new Error("Invalid input shape of C");if(n[0].dataType!==n[1].dataType||n.length===3&&n[0].dataType!==n[2].dataType)throw new Error("Input types are mismatched")},yC=(n,e)=>{let r=n[0].dims.slice(),t=n[1].dims.slice(),[o,i,a]=Pa.getShapeOfGemmResult(r,e.transA,t,e.transB,n.length===3?n[2].dims:void 0),s=[o,i];if(!s)throw new Error("Can't use gemm on the given tensors");let u=16,l=Math.ceil(i/u),d=Math.ceil(o/u),f=!0,m=k.size(s),b=[{type:12,data:f?l:m},{type:12,data:o},{type:12,data:i},{type:12,data:a},{type:1,data:e.alpha},{type:1,data:e.beta}],y=["type","type"];n.length===3&&(b.push(...W(n[2].dims)),y.push("rank")),b.push(...W(s));let _=w=>{let x="";e.transA&&e.transB?x="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":e.transA&&!e.transB?x="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!e.transA&&e.transB?x="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!e.transA&&!e.transB&&(x="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let S=e.alpha===1?"":"value *= uniforms.alpha;",A=R("a",n[0].dataType,n[0].dims),P=R("b",n[1].dataType,n[1].dims),C=A.type.value,L=null,M=[A,P];n.length===3&&(L=R("c",n[2].dataType,n[2].dims.length),M.push(L));let F=V("output",n[0].dataType,s.length);M.push(F);let X=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${w.registerUniforms(X).declareVariables(...M)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${C}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${x}
    }

    ${S}
    ${L!=null?`let cOffset = ${L.broadcastedIndicesToOffset("vec2(m, n)",F)}; value += ${C}(uniforms.beta) * ${L.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},T=w=>{let x=R("a",n[0].dataType,n[0].dims),S=R("b",n[1].dataType,n[1].dims),A=null,P=[x,S];n.length===3&&(A=R("c",n[2].dataType,n[2].dims.length),P.push(A));let C=V("output",n[0].dataType,s.length);P.push(C);let L=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],M="",F="";e.transA&&e.transB?(F=`
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
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,M="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):e.transA&&!e.transB?(F=`
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
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,M="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!e.transA&&e.transB?(F=`
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
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,M="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!e.transA&&!e.transB&&(F=`
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
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,M="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let X=e.alpha===1?"":"value *= uniforms.alpha;";return`
  ${w.registerUniforms(L).declareVariables(...P)}
  var<workgroup> tile_a: array<array<${x.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${S.type.storage}, ${u}>, ${u}>;
  ${w.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${C.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${F}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${M}
      }
      workgroupBarrier();
    }

    ${X}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${A!=null?`let cOffset = ${A.broadcastedIndicesToOffset("vec2(m, n)",C)}; value += ${C.type.value}(uniforms.beta) * ${A.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return f?{name:"GemmShared",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:s,dataType:n[0].dataType}],dispatchGroup:{x:l*d},programUniforms:b}),getShaderSource:T}:{name:"Gemm",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:s,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:b}),getShaderSource:_}},yw=n=>{let e=n.transA,r=n.transB,t=n.alpha,o=n.beta;return{transA:e,transB:r,alpha:t,beta:o,cacheKey:`${n.transA};${n.transB};${n.alpha===1}`}},_w=(n,e)=>{bC(n.inputs),n.compute(yC(n.inputs,e))}});var Qr,yn,lo,co,_C,vC,wC,xC,TC,IC,SC,$C,ww,xw,Tw=N(()=>{"use strict";de();be();Qe();we();[Qr,yn,lo,co]=[0,1,2,3],_C=n=>{if(n[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(n[0].dims.length!==n[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(n[0].dims.length-2!==n[1].dims[n[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${n[0].dims.length-2}`);if(n[0].dims[0]!==n[1].dims[0])throw new Error("grid batch size must match input batch size")},vC=`
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
`,wC=n=>`
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
`,xC=n=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${n.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,TC=n=>`
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
`,IC=(n,e,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${e} {
     var pixel = ${e}(0);
     var indices = vec4<u32>(0);
     indices[${Qr}] = batch;
     indices[${yn}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${lo}] = u32(r);
            indices[${co}] = u32(c);
          } else {
            return ${e}(0);
          }
        `;case"border":return`
          indices[${lo}] = u32(clamp(r, 0, H - 1));
          indices[${co}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${lo}] = gs_reflect(r, border[1], border[3]);
          indices[${co}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${n.getByIndices("indices")};
  }
`,SC=(n,e,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Qr}], indices[${yn}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Qr}], indices[${yn}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Qr}], indices[${yn}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Qr}], indices[${yn}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Qr}], indices[${yn}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Qr}], indices[${yn}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${n.setByOffset("global_idx","result")}`,$C=(n,e)=>{let r=R("x",n[0].dataType,n[0].dims.length),t=[n[1].dims[0],n[1].dims[1],n[1].dims[2]],o=R("grid",n[1].dataType,t.length,2),i=[n[0].dims[0],n[0].dims[1],n[1].dims[1],n[1].dims[2]];e.format==="NHWC"&&(i=[n[0].dims[0],n[1].dims[1],n[1].dims[2],n[0].dims[3]],[Qr,yn,lo,co]=[0,3,1,2]);let a=V("output",n[0].dataType,i.length),s=r.type.value,u=k.size(i),l=[{type:12,data:u},...W(n[0].dims,t,i)],d=f=>`
  ${f.registerUniform("output_size","u32").declareVariables(r,o,a)}
  ${vC}
  ${wC(s)}
  ${xC(e)}
  ${TC(e)}
  ${IC(r,s,e)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${lo}]);
      let W_in = i32(uniforms.x_shape[${co}]);

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
      var grid_indices = vec3<u32>(indices[${Qr}], indices[${lo}], indices[${co}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${SC(a,s,e)}
  }`;return{name:"GridSample",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:["type","type"]},getRunData:f=>{let m=k.size(i);return{outputs:[{dims:i,dataType:f[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:l}},getShaderSource:d}},ww=(n,e)=>{_C(n.inputs),n.compute($C(n.inputs,e))},xw=n=>ce({alignCorners:n.align_corners,mode:n.mode,paddingMode:n.padding_mode,format:n.format})});var Tt,PC,Sw,Iw,EC,qo,$w,zc=N(()=>{"use strict";de();be();Qe();Na();Ba();we();Yr();Tt=(n,e)=>n.length>e&&n[e].dims.length>0?n[e]:void 0,PC=(n,e)=>{let r=n[0],t=Tt(n,1),o=Tt(n,2),i=Tt(n,3),a=Tt(n,4),s=Tt(n,5),u=Tt(n,6),l=Tt(n,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let d=r.dims[0],f=r.dims[1],m=r.dims.length===3?r.dims[2]:e.numHeads*r.dims[4],b=f,y=0,_=0,T=Math.floor(m/e.numHeads);if(u&&l&&k.size(u.dims)&&k.size(l.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==d||u.dims[1]!==e.numHeads||u.dims[3]!==T)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==d||l.dims[1]!==e.numHeads||l.dims[3]!==T)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=u.dims[2],_=u.dims[2]}else if(u&&k.size(u.dims)||l&&k.size(l.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let w;if(t&&k.size(t.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(t.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');w=2,b=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==T)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');w=5,b=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==T)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');w=0,b=t.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==e.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');w=3}if(i&&k.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(t&&t.dims.length===5&&t.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let x=y+b,S=0;if(a&&k.size(a.dims)>0){S=8;let L=a.dims;throw L.length===1?L[0]===d?S=1:L[0]===3*d+2&&(S=3):L.length===2&&L[0]===d&&L[1]===x&&(S=5),S===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let A=!1,P=m;if(o&&k.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(b!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');P=o.dims[2]}else{if(b!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');P=o.dims[1]*o.dims[3],A=!0}}let C=!1;if(a&&k.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(s&&k.size(s.dims)>0){if(s.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(s.dims[0]!==d||s.dims[1]!==e.numHeads||s.dims[2]!==f||s.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:f,pastSequenceLength:y,kvSequenceLength:b,totalSequenceLength:x,maxSequenceLength:_,inputHiddenSize:0,hiddenSize:m,vHiddenSize:P,headSize:T,vHeadSize:Math.floor(P/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:S,scale:e.scale,broadcastResPosBias:C,passPastInKv:A,qkvFormat:w}},Sw=n=>ce({...n}),Iw=ce({perm:[0,2,1,3]}),EC=(n,e,r,t,o,i,a)=>{let s=[t,o,i],u=k.size(s),l=[{type:12,data:u},{type:12,data:a},{type:12,data:i}],d=f=>{let m=V("qkv_with_bias",e.dataType,s),b=R("qkv",e.dataType,s),y=R("bias",r.dataType,s),_=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${f.registerUniforms(_).declareVariables(b,y,m)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return n.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:s,dataType:e.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:d},{inputs:[e,r],outputs:[-1]})[0]},qo=(n,e,r,t,o,i,a,s)=>{let u=i;if(a&&k.size(a.dims)>0){if(t===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=EC(n,i,a,e,t,r*o,s),u=u.reshape([e,t,r,o]),r===1||t===1?u:n.compute(ut(u,Iw.perm),{inputs:[u],outputs:[-1]})[0]}else return i.dims.length===3&&(u=i.reshape([e,t,r,o])),r===1||t===1?u:n.compute(ut(u,Iw.perm),{inputs:[u],outputs:[-1]})[0]},$w=(n,e)=>{let r=PC(n.inputs,e),t=n.inputs[0],o=Tt(n.inputs,1),i=Tt(n.inputs,2),a=Tt(n.inputs,3),s=Tt(n.inputs,4),u=Tt(n.inputs,5),l=Tt(n.inputs,6),d=Tt(n.inputs,7);if(t.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let f=o&&i&&o.dims.length===4&&i.dims.length===4,m=qo(n,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t,a,0);if(f)return uo(n,m,o,i,s,void 0,l,d,u,r);if(!o||!i)throw new Error("key and value must be provided");let b=qo(n,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,a,r.hiddenSize),y=qo(n,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,a,2*r.hiddenSize);uo(n,m,b,y,s,void 0,l,d,u,r)}});var CC,DC,kC,NC,Mc,Aw,Ow,Bc=N(()=>{"use strict";de();be();Qe();we();CC=n=>{if(!n||n.length<1)throw new Error("too few inputs")},DC=(n,e)=>{let r=[],t=e.numOutputs;return n[1].dims[0]>0&&(n[1].getBigInt64Array().forEach(o=>r.push(Number(o))),t=r.length),ce({numOutputs:t,axis:e.axis,splitSizes:r})},kC=n=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${n}u; i += 1u ) {
    if (index < ${Q("uniforms.size_in_split_axis","i",n)}) {
        return i;
    }
    }
    return ${n}u;
}`,NC=n=>{let e=n.length,r=[];for(let t=0;t<e;++t){let o=n[t].setByIndices("indices","input[global_idx]");e===1?r.push(o):t===0?r.push(`if (output_number == ${t}u) { ${o} }`):t===e-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${t}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${n[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Mc=(n,e)=>{let r=n[0].dims,t=k.size(r),o=n[0].dataType,i=k.normalizeAxis(e.axis,r.length),a=new Array(e.numOutputs),s=R("input",o,r.length),u=new Array(e.numOutputs),l=[],d=[],f=0,m=[{type:12,data:t}];for(let y=0;y<e.numOutputs;y++){f+=e.splitSizes[y],u[y]=f;let _=r.slice();_[i]=e.splitSizes[y],d.push(_),a[y]=V(`output${y}`,o,_.length),l.push({dims:d[y],dataType:n[0].dataType})}m.push({type:12,data:u},...W(r,...d));let b=y=>`
  ${y.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(s,...a)}
  ${kC(u.length)}
  ${NC(a)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${s.offsetToIndices("global_idx")};
    var index = ${s.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${Q("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${s.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:e.cacheKey,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(t/64)},programUniforms:m})}},Aw=(n,e)=>{CC(n.inputs);let r=n.inputs.length===1?e:DC(n.inputs,e);n.compute(Mc(n.inputs,r),{inputs:[0]})},Ow=n=>{let e=n.axis,r=n.splitSizes,t=n.numOutputs<0?r.length:n.numOutputs;if(t!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return ce({axis:e,numOutputs:t,splitSizes:r})}});var LC,Xa,Pw,Fc=N(()=>{"use strict";de();be();Qe();we();LC=(n,e)=>{let[r,t,o,i]=n,{numHeads:a,rotaryEmbeddingDim:s}=e;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!k.areEqual(t.dims,[])&&!k.areEqual(t.dims,[1])&&t.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${t.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!k.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(s>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=r.dims[0],l=r.dims[r.dims.length-2],d=o.dims[0],f=k.sizeFromDimension(r.dims,1)/l,m=s===0?o.dims[1]*2:f/a;if(s>m)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(t.dims.length===2){if(u!==t.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${t.dims[0]}`);if(l!==t.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${t.dims[1]}`)}if(m/2!==o.dims[1]&&s/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(l>d)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Xa=(n,e)=>{let{interleaved:r,numHeads:t,rotaryEmbeddingDim:o,scale:i}=e,a=n[0].dims[0],s=k.sizeFromDimension(n[0].dims,1),u=n[0].dims[n[0].dims.length-2],l=s/u,d=n[2].dims[1],f=o===0?d*2:l/t,m=new Array(a,u,l/f,f-d),b=k.computeStrides(m),y=[{type:1,data:i},{type:12,data:m},{type:12,data:b},...n[0].dims.length===3?new Array({type:12,data:[s,l,f,1]}):[],...n[0].dims.length===4?new Array({type:12,data:[s,f,u*f,1]}):[],...W(n[0].dims,n[1].dims,n[2].dims,n[3].dims,n[0].dims)],_=T=>{let w=R("input",n[0].dataType,n[0].dims.length),x=R("position_ids",n[1].dataType,n[1].dims.length),S=R("cos_cache",n[2].dataType,n[2].dims.length),A=R("sin_cache",n[3].dataType,n[3].dims.length),P=V("output",n[0].dataType,n[0].dims.length);return T.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:m.length},{name:"global_strides",type:"u32",length:b.length},{name:"input_output_strides",type:"u32",length:b.length}]),`
        ${T.declareVariables(w,x,S,A,P)}

        ${T.mainStart(Bn)}
          let half_rotary_emb_dim = uniforms.${S.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${x.broadcastedIndicesToOffset("bsnh.xy",V("",x.type.tensor,2))};
            let position_id =
                u32(${x.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${w.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} -
                ${w.getByOffset("j")} * ${A.get("position_id","bsnh[3]")};
            ${P.setByOffset("i","re")}
            let im = ${w.getByOffset("i")} * ${A.get("position_id","bsnh[3]")} +
                ${w.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${P.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${P.setByOffset("k",w.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:ce({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:n[0].dims,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(m)/Bn)},programUniforms:y})}},Pw=(n,e)=>{LC(n.inputs,e),n.compute(Xa(n.inputs,e))}});var RC,zC,Ew,MC,Cw,Dw=N(()=>{"use strict";Qe();de();Ba();zc();Bc();Yr();Fc();we();RC=(n,e)=>{if(e.doRotary&&n.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=n[0],t=n[1],o=n[2],i=n[3],a=n[4];if(e.doRotary!==0&&n.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(e.localWindowSize!==-1)throw new Error("Local attention is not supported");if(e.softcap!==0)throw new Error("Softcap is not supported");if(e.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(e.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let s=!1,u=r.dims[0],l=r.dims[1],d=r.dims.length===3?s?r.dims[2]/3:r.dims[2]:e.numHeads*r.dims[4],f=l,m=0,b=!t||t.dims.length===0,y=Math.floor(b?d/(e.numHeads+2*e.kvNumHeads):d/e.numHeads);b&&(d=y*e.numHeads);let _=i&&i.dims.length!==0,T=a&&a.dims.length!==0;if(_&&i.dims.length===4&&i.dims[0]===u&&i.dims[1]!==e.kvNumHeads&&i.dims[2]===e.kvNumHeads&&i.dims[3]===y)throw new Error("BSNH pastKey/pastValue is not supported");if(_&&T){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=i.dims[2]}else if(_||T)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let x=1;if(t&&t.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(r.dims[2]%t.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');f=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==y)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');f=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==y)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');f=t.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==e.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');x=3}let S=0,A=!1,P=e.kvNumHeads?y*e.kvNumHeads:d;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(f!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');P=o.dims[2]}else{if(f!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');P=o.dims[1]*o.dims[3],A=!0}}let C=n.length>4?n[5]:void 0;if(C&&C.dims.length!==1&&C.dims[0]!==u)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:u,sequenceLength:l,pastSequenceLength:m,kvSequenceLength:f,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:d,vHiddenSize:P,headSize:y,vHeadSize:Math.floor(P/e.kvNumHeads),numHeads:e.numHeads,kvNumHeads:e.kvNumHeads,nReps:e.numHeads/e.kvNumHeads,pastPresentShareBuffer:!1,maskType:S,scale:e.scale,broadcastResPosBias:!1,passPastInKv:A,qkvFormat:x}},zC=ce({perm:[0,2,1,3]}),Ew=(n,e,r)=>{let t=e,o=r.kvNumHeads;return e.dims.length===3&&r.kvSequenceLength!==0&&(t=e.reshape([r.batchSize,r.kvSequenceLength,o,r.headSize]),t=n.compute(ut(t,zC.perm),{inputs:[t],outputs:[-1]})[0]),t},MC=(n,e,r,t)=>{let o=7,i=["type","type"],a=[n*e],s=n*e,u=[{type:12,data:s},{type:12,data:e},{type:12,data:n}],l=d=>{let f=R("seq_lens",r.dataType,r.dims),m=R("total_seq_lens",t.dataType,t.dims),b=V("pos_ids",o,a),y=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${d.registerUniforms(y).declareVariables(f,m,b)}
  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${m.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${f.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${b.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${b.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${b.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${n};${e}`,inputDependencies:i},getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u}),getShaderSource:l}},Cw=(n,e)=>{let r=RC(n.inputs,e);if(n.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(n.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let t=n.inputs[0],o=n.inputs[1]&&n.inputs[1].dims.length>0?n.inputs[1]:void 0,i=n.inputs[2]&&n.inputs[2].dims.length>0?n.inputs[2]:void 0,a=n.inputs[3]&&n.inputs[3].dims.length!==0?n.inputs[3]:void 0,s=n.inputs[4]&&n.inputs[4].dims.length!==0?n.inputs[4]:void 0,u=n.inputs.length>4?n.inputs[5]:void 0,l=n.inputs.length>5?n.inputs[6]:void 0,d=r.kvNumHeads?r.kvNumHeads:r.numHeads,f=ce({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,d*r.headSize,d*r.headSize]}),[m,b,y]=!o&&!i?n.compute(Mc([t],f),{inputs:[t],outputs:[-1,-1,-1]}):[t,o,i],_,T;if(e.doRotary){let A=n.compute(MC(r.batchSize,r.sequenceLength,u,l),{inputs:[u,l],outputs:[-1]})[0],P=n.inputs[7],C=n.inputs[8],L=ce({interleaved:e.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:e.scale}),M=[m,A,P,C],F=[-1];_=n.compute(Xa(M,L),{inputs:M,outputs:F})[0],M.splice(0,1,b);let X=ce({interleaved:e.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:e.scale});T=n.compute(Xa(M,X),{inputs:M,outputs:F})[0]}let w=qo(n,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,e.doRotary?_:m,void 0,0),x=Ew(n,e.doRotary?T:b,r),S=Ew(n,y,r);uo(n,w,x,S,void 0,void 0,a,s,void 0,r,u,l)}});var kw,BC,FC,Nw,Lw=N(()=>{"use strict";de();be();Yr();we();kw=(n,e,r,t,o,i,a,s)=>{let u=Ee(i),l=u===1?"f32":`vec${u}f`,d=u===1?"vec2f":`mat2x${u}f`,f=o*a,m=64;f===1&&(m=256);let b=[o,a,i/u],y=[o,a,2],_=["rank","type","type"],T=[];T.push(...W(b,y));let w=x=>{let S=R("x",e.dataType,3,u),A=R("scale",r.dataType,r.dims),P=R("bias",t.dataType,t.dims),C=V("output",1,3,2),L=[S,A,P,C];return`
  var<workgroup> workgroup_shared : array<${d}, ${m}>;
  const workgroup_size = ${m}u;
  ${x.declareVariables(...L)}
  ${x.mainStart(m)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${l}(0);
    var squared_sum = ${l}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${l}(${S.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${d}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${Xt("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${Xt("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${s}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return n.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${s};${m}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:y,dataType:1}],dispatchGroup:{x:f},programUniforms:T}),getShaderSource:w},{inputs:[e,r,t],outputs:[-1]})[0]},BC=(n,e,r)=>{let t=e[0].dims,o=t,i=2,a=t[0],s=t[1],u=k.sizeFromDimension(t,i),l=Ee(u),d=k.size(o)/l,f=kw(n,e[0],e[1],e[2],a,u,s,r.epsilon),m=[a,s,u/l],b=[a,s],y=["type","none"],_=T=>{let w=R("x",e[0].dataType,m.length,l),x=R("scale_shift",1,b.length,2),S=V("output",e[0].dataType,m.length,l),A=[w,x,S];return`
  ${T.registerUniform("output_size","u32").declareVariables(...A)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${S.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${x.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${w.getByOffset("global_idx")} * ${S.type.value}(scale_shift.x) + ${S.type.value}(scale_shift.y);
      ${S.setByOffset("global_idx","value")};
  }`};n.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:[{type:12,data:d},...W(m,b,m)]}),getShaderSource:_},{inputs:[e[0],f]})},FC=(n,e,r)=>{let t=e[0].dims,o=t,i=t[0],a=t[t.length-1],s=k.sizeFromDimension(t,1)/a,u=Ee(a),l=k.size(o)/u,d=[{type:12,data:s},{type:12,data:Math.floor(a/u)}],f=["type","type"],m=!1,b=[0,t.length-1];for(let w=0;w<t.length-2;w++)m=m||t[w+1]!==1,b.push(w+1);m=m&&t[t.length-1]!==1;let y=m?n.compute(ut(n.inputs[0],b),{inputs:[n.inputs[0]],outputs:[-1]})[0]:n.inputs[0].reshape(Array.from({length:t.length},(w,x)=>t[b[x]])),_=kw(n,y,e[1],e[2],i,s,a,r.epsilon),T=w=>{let x=Ve(e[0].dataType),S=u===1?"vec2f":`mat${u}x2f`,A=L=>{let M=L===0?"x":"y",F=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${x}(${F}(scale.${M}))`;case 2:return`vec2<${x}>(${F}(scale[0].${M}, scale[1].${M}))`;case 4:return`vec4<${x}>(${F}(scale[0].${M}, scale[1].${M}, scale[2].${M}, scale[3].${M}))`;default:throw new Error(`Not supported compoents ${u}`)}},P=R("input",e[0].dataType,e[0].dims,u),C=V("output",e[0].dataType,o,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${P.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${S}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${C.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${w.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${A(0)}, ${A(1)});
  }`};n.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:T},{inputs:[e[0],_]})},Nw=(n,e)=>{e.format==="NHWC"?FC(n,n.inputs,e):BC(n,n.inputs,e)}});var VC,GC,Rw,zw=N(()=>{"use strict";de();be();we();VC=n=>{if(!n||n.length<2)throw new Error("layerNorm requires at least 2 inputs.")},GC=(n,e,r)=>{let t=e.simplified,o=n[0].dims,i=n[1],a=!t&&n[2],s=o,u=k.normalizeAxis(e.axis,o.length),l=k.sizeToDimension(o,u),d=k.sizeFromDimension(o,u),f=k.size(i.dims),m=a?k.size(a.dims):0;if(f!==d||a&&m!==d)throw new Error(`Size of X.shape()[axis:] == ${d}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${f} and bias size of ${m}`);let b=[];for(let P=0;P<o.length;++P)P<u?b.push(o[P]):b.push(1);let y=Ee(d),_=["type","type"],T=[{type:12,data:l},{type:1,data:d},{type:12,data:Math.floor(d/y)},{type:1,data:e.epsilon}];a&&_.push("type");let w=r>1,x=r>2,S=P=>{let C=Ve(n[0].dataType),L=[R("x",n[0].dataType,n[0].dims,y),R("scale",i.dataType,i.dims,y)];a&&L.push(R("bias",a.dataType,a.dims,y)),L.push(V("output",n[0].dataType,s,y)),w&&L.push(V("mean_data_output",1,b)),x&&L.push(V("inv_std_output",1,b));let M=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${P.registerUniforms(M).declareVariables(...L)}
  ${P.mainStart()}
    ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${xc("f32",y)};
    var mean_square_vector = ${xc("f32",y)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Fn(C,y,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Xt("mean_vector",y)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Xt("mean_square_vector",y)} / uniforms.norm_size ${t?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Fn(C,y,"x[j + offset]")};
      let f32scale = ${Fn(C,y,"scale[j]")};
      output[j + offset] = ${L[0].type.value}((f32input ${t?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${Fn(C,y,"bias[j]")}`:""}
      );
    }

    ${w?"mean_data_output[global_idx] = mean":""};
    ${x?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},A=[{dims:s,dataType:n[0].dataType}];return w&&A.push({dims:b,dataType:1}),x&&A.push({dims:b,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${y};${r};${t}`,inputDependencies:_},getRunData:()=>({outputs:A,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:T}),getShaderSource:S}},Rw=(n,e)=>{VC(n.inputs),n.compute(GC(n.inputs,e,n.outputCount))}});var UC,Mw,Bw=N(()=>{"use strict";be();Ha();qa();UC=n=>{if(!n||n.length!==2)throw new Error("MatMul requires 2 inputs.");if(n[0].dims[n[0].dims.length-1]!==n[1].dims[n[1].dims.length-2])throw new Error("shared dimension does not match.")},Mw=n=>{UC(n.inputs);let e=Vr.calcShape(n.inputs[0].dims,n.inputs[1].dims,!0);if(!e)throw new Error("Can't use matmul on the given tensors");let r=e[e.length-1],t=n.inputs[0].dims[n.inputs[0].dims.length-1];if(r<8&&t<8)n.compute(Wa(n.inputs,{activation:""},e));else{let o=e[e.length-2],i=k.size(n.inputs[0].dims.slice(0,-2)),a=k.size(n.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&a===1){let s=n.inputs[0].reshape([1,i,t]),u=n.inputs[1].reshape([1,t,r]),l=[1,i,r],d=[s,u];n.compute(Ho(d,{activation:""},e,l),{inputs:d})}else n.compute(Ho(n.inputs,{activation:""},e))}}});var WC,HC,qC,Fw,Vw,Gw=N(()=>{"use strict";de();be();Qe();we();WC=(n,e)=>{if(n.length<3||n.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=n[0],t=r.dims.length;if(r.dims[t-1]!==e.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((e.k+e.blockSize-1)/e.blockSize),i=e.blockSize/8*e.bits,a=n[1];if(!k.areEqual(a.dims,[e.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=n[2].dims;if(k.size(u)!==e.n*o)throw new Error("scales input size error.");if(n.length===4){let d=n[3].dims,f=e.bits>4?e.n*o:e.n*Math.floor((o+1)/2);if(k.size(d)!==f)throw new Error("zeroPoints input size error.")}},HC=(n,e)=>{let r=n[0].dims,t=r.length,o=r[t-2],i=e.k,a=e.n,s=r.slice(0,t-2),u=k.size(s),d=n[1].dims[2]/4,f=n[0].dataType,m=Ee(e.k),b=Ee(d),y=Ee(a),_=s.concat([o,a]),T=o>1&&a/y%2===0?2:1,w=k.size(_)/y/T,x=64,S=[],A=[u,o,i/m],P=k.convertShape(n[1].dims).slice();P.splice(-1,1,d/b),S.push(...W(A)),S.push(...W(P)),S.push(...W(n[2].dims)),n.length===4&&S.push(...W(k.convertShape(n[3].dims)));let C=[u,o,a/y];S.push(...W(C));let L=M=>{let F=A.length,X=R("a",n[0].dataType,F,m),ee=R("b",12,P.length,b),ie=R("scales",n[2].dataType,n[2].dims.length),j=[X,ee,ie],oe=n.length===4?R("zero_points",12,n[3].dims.length):void 0;oe&&j.push(oe);let Ue=C.length,J=V("output",n[0].dataType,Ue,y),te=Ve(n[0].dataType),pe=(()=>{switch(m){case 1:return`array<${te}, 8>`;case 2:return`mat4x2<${te}>`;case 4:return`mat2x4<${te}>`;default:throw new Error(`${m}-component is not supported.`)}})(),ue=()=>{let Ge=`
          // reuse a data
            var input_offset = ${X.indicesToOffset(`${X.type.indices}(batch, row, word_offset)`)};
            var a_data: ${pe};
            for (var j: u32 = 0; j < ${8/m}; j++) {
              a_data[j] = ${X.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let fe=0;fe<y*T;fe++)Ge+=`
            b_value = ${b===1?`b${fe}_data`:`b${fe}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${pe}(${Array.from({length:4},(D,q)=>`${te}(b_value_lower[${q}]), ${te}(b_value_upper[${q}])`).join(", ")});
            b_dequantized_values = ${m===1?`${pe}(${Array.from({length:8},(D,q)=>`(b_quantized_values[${q}] - ${oe?`zero_point${fe}`:"zero_point"}) * scale${fe}`).join(", ")});`:`(b_quantized_values - ${pe}(${Array(8).fill(`${oe?`zero_point${fe}`:"zero_point"}`).join(",")})) * scale${fe};`};
            workgroup_shared[local_id.x * ${T} + ${Math.floor(fe/y)}]${y>1?`[${fe%y}]`:""} += ${Array.from({length:8/m},(D,q)=>`${m===1?`a_data[${q}] * b_dequantized_values[${q}]`:`dot(a_data[${q}], b_dequantized_values[${q}])`}`).join(" + ")};
          `;return Ge},Se=()=>{let Ge=`
            var col_index = col * ${y};
            ${oe?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${te}(8);`}
            `;for(let fe=0;fe<y*T;fe++)Ge+=`
            let scale${fe} = ${ie.getByOffset("col_index * nBlocksPerCol + block")};
            ${oe?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${oe.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${fe} = ${te}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return Ge},Be=()=>{let Ge=`col_index = col * ${y};`;for(let fe=0;fe<y*T;fe++)Ge+=`
            let b${fe}_data = ${ee.getByIndices(`${ee.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return Ge+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${pe};
            var b_dequantized_values: ${pe};`,Ge};return`
        var<workgroup> workgroup_shared: array<${J.type.value}, ${T*x}>;
        ${M.declareVariables(...j,J)}
        ${M.mainStart([x,1,1])}
          let output_indices = ${J.offsetToIndices(`(global_idx / ${x}) * ${T}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${x}) {
            //process one block
            var word_offset: u32 = block * ${e.blockSize/m};
            ${Se()}
            for (var word: u32 = 0; word < ${d}; word += ${b}) {
              ${Be()}
              for (var i: u32 = 0; i < ${b}; i++) {
                ${ue()}
                word_offset += ${8/m};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${T}) {
            var output_value: ${J.type.value} = ${J.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${x}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${T};
            }
            ${J.setByIndices(`${J.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${e.blockSize};${e.bits};${m};${b};${y};${T};${x}`,inputDependencies:Array(n.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:f}],dispatchGroup:{x:w},programUniforms:S}),getShaderSource:L}},qC=(n,e)=>{let r=n[0].dims,t=r.length,o=r[t-2],i=e.k,a=e.n,s=r.slice(0,t-2),u=k.size(s),d=n[1].dims[2]/4,f=n[0].dataType,m=Ee(e.k),b=Ee(d),y=s.concat([o,a]),_=128,T=a%8===0?8:a%4===0?4:1,w=_/T,x=w*b*8,S=x/m,A=x/e.blockSize,P=k.size(y)/T,C=[],L=[u,o,i/m],M=k.convertShape(n[1].dims).slice();M.splice(-1,1,d/b),C.push(...W(L)),C.push(...W(M)),C.push(...W(n[2].dims)),n.length===4&&C.push(...W(k.convertShape(n[3].dims)));let F=[u,o,a];C.push(...W(F));let X=ee=>{let ie=L.length,j=R("a",n[0].dataType,ie,m),oe=R("b",12,M.length,b),Ue=R("scales",n[2].dataType,n[2].dims.length),J=[j,oe,Ue],te=n.length===4?R("zero_points",12,n[3].dims.length):void 0;te&&J.push(te);let pe=F.length,ue=V("output",n[0].dataType,pe),Se=Ve(n[0].dataType),Be=()=>{switch(m){case 1:return`
          let a_data0 = vec4<${Se}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${Se}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${Se}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${Se}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${m}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${j.type.value}, ${S}>;
        var<workgroup> inter_results: array<array<${ue.type.value}, ${w}>, ${T}>;
        ${ee.declareVariables(...J,ue)}
        ${ee.mainStart([w,T,1])}
          let output_indices = ${ue.offsetToIndices(`workgroup_index * ${T}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${A} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${S};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${S}; a_offset += ${_})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${j.getByIndices(`${j.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${j.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${A} + local_id.x;
            ${te?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${te.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${Se}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${Se}(8);`}
            let scale = ${Ue.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${oe.getByIndices(`${oe.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${e.blockSize/m};
            for (var i: u32 = 0; i < ${b}; i++) {
              ${Be()}
              let b_value = ${b===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${Se}>(${Array.from({length:4},(Ge,fe)=>`${Se}(b_value_lower[${fe}]), ${Se}(b_value_upper[${fe}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${Se}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(Ge,fe)=>`${`dot(a_data${fe}, b_dequantized_values[${fe}])`}`).join(" + ")};
              word_offset += ${8/m};
            }
            workgroupBarrier();
          }

          if (local_idx < ${T}) {
            var output_value: ${ue.type.value} = ${ue.type.value}(0);
            for (var b = 0u; b < ${w}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ue.setByIndices(`${ue.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${e.blockSize};${m};${b};${w};${T}`,inputDependencies:Array(n.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:f}],dispatchGroup:{x:P},programUniforms:C}),getShaderSource:X}},Fw=(n,e)=>{WC(n.inputs,e),e.blockSize===32&&n.adapterInfo.isVendor("intel")&&n.adapterInfo.isArchitecture("gen-12lp")?n.compute(qC(n.inputs,e)):n.compute(HC(n.inputs,e))},Vw=n=>ce(n)});var jC,KC,XC,ZC,JC,YC,QC,eD,Uw,Ww=N(()=>{"use strict";de();be();we();jC=n=>{if(!n||n.length<1)throw new Error("Too few inputs");if(n[0].dataType!==1&&n[0].dataType!==10)throw new Error("Input type must be float or float16.");if(n.length>=2){let e=n[0].dims.length*2===n[1].dims[0];if(n.length===4&&(e=n[3].dims[0]*2===n[1].dims[0]),!e)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},KC=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
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
      `},XC=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
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
          `},ZC=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
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
          `},JC=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
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
          `},YC=(n,e,r)=>{switch(r.mode){case 0:return KC(n,e,r.pads.length);case 1:return XC(n,e,r.pads.length);case 2:return ZC(n,e,r.pads.length);case 3:return JC(n,e,r.pads.length);default:throw new Error("Invalid mode")}},QC=(n,e)=>{let r=k.padShape(n[0].dims.slice(),e.pads),t=n[0].dims,o=k.size(r),i=[{type:12,data:o},{type:6,data:e.pads}],a=n.length>=3&&n[2].data;e.mode===0&&i.push({type:a?n[2].dataType:1,data:e.value}),i.push(...W(n[0].dims,r));let s=["rank"],u=l=>{let d=V("output",n[0].dataType,r.length),f=R("x",n[0].dataType,t.length),m=f.type.value,b=YC(d,t.length,e),y=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:e.pads.length}];return e.mode===0&&y.push({name:"constant_value",type:a?m:"f32"}),`
            ${l.registerUniforms(y).declareVariables(f,d)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${d.offsetToIndices("global_idx")};

            var value = ${m}(0);
            ${b}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${e.mode}${a}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(r)/64)},programUniforms:i}),getShaderSource:u}},eD=(n,e)=>{if(n.length>1){let r=n[1].getBigInt64Array(),t=n.length>=3&&n[2].data?n[2].dataType===10?n[2].getUint16Array()[0]:n[2].getFloat32Array()[0]:0,o=n[0].dims.length,i=new Int32Array(2*o).fill(0);if(n.length>=4){let s=n[3].getBigInt64Array();for(let u=0;u<s.length;u++)i[Number(s[u])]=Number(r[u]),i[Number(s[u])+o]=Number(r[u+s.length])}else r.forEach((s,u)=>i[Number(u)]=Number(s));let a=[];return i.forEach(s=>a.push(s)),{mode:e.mode,value:t,pads:a}}else return e},Uw=(n,e)=>{jC(n.inputs);let r=eD(n.inputs,e);n.compute(QC(n.inputs,r),{inputs:[0]})}});var Za,Hw,qw,jw,Kw,tD,rD,Xw,Zw,Jw,Yw,Qw,ex,tx,rx,nx,ox,ix,ax,sx=N(()=>{"use strict";ft();de();be();we();Za=n=>{if(ge.webgpu.validateInputContent&&(!n||n.length!==1))throw new Error("Pool ops requires 1 input.")},Hw=(n,e,r)=>{let t=e.format==="NHWC",o=n.dims.slice();t&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(e,"dilations"),a=e.kernelShape.slice(),s=e.strides.slice(),u=i?e.dilations.slice():[],l=e.pads.slice();Mn.adjustPoolAttributes(r,o,a,s,u,l);let d=Mn.computePoolOutputShape(r,o,s,u,a,l,e.autoPad),f=Object.assign({},e);i?Object.assign(f,{kernelShape:a,strides:s,pads:l,dilations:u,cacheKey:e.cacheKey}):Object.assign(f,{kernelShape:a,strides:s,pads:l,cacheKey:e.cacheKey});let m=d.slice();return m.push(m.splice(1,1)[0]),[f,t?m:d]},qw=(n,e)=>{let r=e.format==="NHWC",t=k.size(n),o=k.size(e.kernelShape),i=[{type:12,data:t},{type:12,data:o}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(e.kernelShape.length<=2){let s=e.kernelShape[e.kernelShape.length-1],u=e.strides[e.strides.length-1],l=e.pads[e.pads.length/2-1],d=e.pads[e.pads.length-1],f=!!(l+d);i.push({type:12,data:s},{type:12,data:u},{type:12,data:l},{type:12,data:d}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let m=!1;if(e.kernelShape.length===2){let b=e.kernelShape[e.kernelShape.length-2],y=e.strides[e.strides.length-2],_=e.pads[e.pads.length/2-2],T=e.pads[e.pads.length-2];m=!!(_+T),i.push({type:12,data:b},{type:12,data:y},{type:12,data:_},{type:12,data:T}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,f,m]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let s=k.computeStrides(e.kernelShape);i.push({type:12,data:s},{type:12,data:e.pads},{type:12,data:e.strides}),a.push({name:"kernelStrides",type:"u32",length:s.length},{name:"pads",type:"u32",length:e.pads.length},{name:"strides",type:"u32",length:e.strides.length});let u=e.pads.reduce((l,d)=>l+d);return[i,a,!!u,!1,!1]}},jw=(n,e,r,t,o,i,a,s,u,l,d,f)=>{let m=o.format==="NHWC",b=e.type.value,y=V("output",e.type.tensor,t);if(o.kernelShape.length<=2){let _="",T="",w="",x=r-(m?2:1);if(d?_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${x}] = indices[${x}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${x}] < 0 || xIndices[${x}]
                      >= uniforms.x_shape[${x}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`:_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${x}] = indices[${x}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let A=r-(m?3:2);f?T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${A}] = indices[${A}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${A}] < 0 || xIndices[${A}] >= uniforms.x_shape[${A}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${A}] = indices[${A}] * uniforms.sh - uniforms.phStart + j;
                `,w=`
              }
            `}return`
            ${n.registerUniforms(u).declareVariables(e,y)}

            ${n.mainStart()}
              ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var value = ${b}(${s});
              var pad = 0;
              ${T}
              ${_}
              ${w}
              ${a}

              output[global_idx] = value;
            }`}else{if(m)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let _=o.kernelShape.length,T=o.pads.length,w="";return l?w=`
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
            ${n.registerUniforms(u).declareVariables(e,y)}

            ${n.mainStart()}
              ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var offsets: array<u32, ${_}>;

              var value = ${b}(${s});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${_-1}u; j++) {
                  offsets[j] = offset / ${Q("uniforms.kernelStrides","j",_)};
                  offset -= offsets[j] * ${Q("uniforms.kernelStrides","j",_)};
                }
                offsets[${_-1}] = offset;

                isPad = false;
                for (var j = ${r-_}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${Q("uniforms.strides",`j - ${r-_}u`,_)}
                    + offsets[j - ${r-_}u] - ${Q("uniforms.pads","j - 2u",T)};
                  ${w}
              }
              ${a}

              output[global_idx] = value;
            }`}},Kw=n=>`${n.format};${n.ceilMode};${n.autoPad};${n.kernelShape.length}`,tD=n=>`${Kw(n)};${n.countIncludePad}`,rD=n=>`${Kw(n)};${n.storageOrder};${n.dilations}`,Xw=n=>({format:n.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][n.auto_pad],ceilMode:n.ceil_mode,kernelShape:n.kernel_shape,strides:n.strides,pads:n.pads}),Zw=(n,e,r,t)=>{let[o,i]=Hw(e,t,r),a=R("x",e.dataType,e.dims.length),s=a.type.value,u="value += x_val;",l="";o.countIncludePad?l+=`value /= ${s}(uniforms.kernelSize);`:l+=`value /= ${s}(i32(uniforms.kernelSize) - pad);`;let[d,f,m,b,y]=qw(i,o);d.push(...W(e.dims,i));let _=["rank"];return{name:n,shaderCache:{hint:`${t.cacheKey};${m};${b};${y}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:d}),getShaderSource:T=>jw(T,a,e.dims.length,i.length,o,u,l,0,f,m,b,y)}},Jw=n=>{let e=n.count_include_pad!==0,r=Xw(n);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let t={countIncludePad:e,...r,cacheKey:""};return{...t,cacheKey:tD(t)}},Yw=(n,e)=>{Za(n.inputs),n.compute(Zw("AveragePool",n.inputs[0],!1,e))},Qw={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},ex=n=>{let e=n.format;return{format:e,...Qw,cacheKey:e}},tx=(n,e)=>{Za(n.inputs),n.compute(Zw("GlobalAveragePool",n.inputs[0],!0,e))},rx=(n,e,r,t)=>{let[o,i]=Hw(e,t,r),a=`
      value = max(x_val, value);
    `,s="",u=R("x",e.dataType,e.dims.length),l=["rank"],[d,f,m,b,y]=qw(i,o);return d.push(...W(e.dims,i)),{name:n,shaderCache:{hint:`${t.cacheKey};${m};${b};${y}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:d}),getShaderSource:_=>jw(_,u,e.dims.length,i.length,o,a,s,e.dataType===10?-65504:-1e5,f,m,b,y)}},nx=(n,e)=>{Za(n.inputs),n.compute(rx("MaxPool",n.inputs[0],!1,e))},ox=n=>{let e=n.storage_order,r=n.dilations,t=Xw(n);if(e!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(t.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:e,dilations:r,...t,cacheKey:""};return{...o,cacheKey:rD(o)}},ix=n=>{let e=n.format;return{format:e,...Qw,cacheKey:e}},ax=(n,e)=>{Za(n.inputs),n.compute(rx("GlobalMaxPool",n.inputs[0],!0,e))}});var oD,iD,ux,lx,cx=N(()=>{"use strict";de();be();Qe();we();oD=(n,e)=>{if(n.length<2||n.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(n.length===3&&n[1].dims===n[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(n.length===3&&n[0].dataType!==n[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(n[0].dataType===6&&n.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(n[1].dims.length!==0&&n[1].dims.length!==1&&n[1].dims.length!==n[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(n.length>2){if(n[0].dataType!==n[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(n[1].dims.length!==n[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!n[1].dims.map((r,t)=>r===n[2].dims[t]).reduce((r,t)=>r&&t,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(e.blockSize>0){if(n[1].dims.length===0||n[1].dims.length===1&&n[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!n[1].dims.map((o,i)=>i===e.axis||o===n[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(n[1].dims.length!==n[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=n[0].dims[e.axis],t=n[1].dims[e.axis];if(e.blockSize<Math.ceil(r/t)||e.blockSize>Math.ceil(r/(t-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},iD=(n,e)=>{let r=k.normalizeAxis(e.axis,n[0].dims.length),t=n[0].dataType,o=t===3,i=n[0].dims,a=n[1].dataType,s=k.size(i),u=t===3||t===2,l=u?[Math.ceil(k.size(n[0].dims)/4)]:n[0].dims,d=n[1].dims,f=n.length>2?n[2]:void 0,m=f?u?[Math.ceil(k.size(f.dims)/4)]:f.dims:void 0,b=d.length===0||d.length===1&&d[0]===1,y=b===!1&&d.length===1,_=Ee(s),T=b&&(!u||_===4),w=T?_:1,x=T&&!u?_:1,S=R("input",u?12:t,l.length,x),A=R("scale",a,d.length),P=f?R("zero_point",u?12:t,m.length):void 0,C=V("output",a,i.length,w),L=[S,A];P&&L.push(P);let M=[l,d];f&&M.push(m);let F=[{type:12,data:s/w},{type:12,data:r},{type:12,data:e.blockSize},...W(...M,i)],X=ee=>{let ie=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${ee.registerUniforms(ie).declareVariables(...L,C)}
      ${ee.mainStart()}
          ${ee.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${C.offsetToIndices("global_idx")};

          // Set input x
          ${u?`
            let input = ${S.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${w===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${S.getByOffset("global_idx")};`};

          // Set scale input
          ${b?`let scale_value= ${A.getByOffset("0")}`:y?`
            let scale_index = ${C.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${A.getByOffset("scale_index")};`:`
            var scale_indices: ${A.type.indices} = output_indices;
            let index = ${A.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${A.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${A.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${P?b?u?`
                let zero_point_input = ${P.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${P.getByOffset("0")}`:y?u?`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${P.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${P.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${A.indicesToOffset("scale_indices")};
                let zero_point_input = ${P.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${P.getByIndices("scale_indices")};`:`let zero_point_value = ${u?o?"i32":"u32":S.type.value}(0);`};
      // Compute and write output
      ${C.setByOffset("global_idx",`${C.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:e.cacheKey,inputDependencies:P?["rank","rank","rank"]:["rank","rank"]},getShaderSource:X,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(s/w/64),y:1,z:1},programUniforms:F})}},ux=(n,e)=>{oD(n.inputs,e),n.compute(iD(n.inputs,e))},lx=n=>ce({axis:n.axis,blockSize:n.blockSize})});var aD,sD,dx,px=N(()=>{"use strict";ft();de();we();aD=(n,e,r)=>{let t=n===e,o=n<e&&r<0,i=n>e&&r>0;if(t||o||i)throw new Error("Range these inputs' contents are invalid.")},sD=(n,e,r,t)=>{let o=Math.abs(Math.ceil((e-n)/r)),i=[o],a=o,s=[{type:12,data:a},{type:t,data:n},{type:t,data:r},...W(i)],u=l=>{let d=V("output",t,i.length),f=d.type.value,m=[{name:"outputSize",type:"u32"},{name:"start",type:f},{name:"delta",type:f}];return`
        ${l.registerUniforms(m).declareVariables(d)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${f}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${t}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:s})}},dx=n=>{let e=0,r=0,t=0;n.inputs[0].dataType===6?(e=n.inputs[0].getInt32Array()[0],r=n.inputs[1].getInt32Array()[0],t=n.inputs[2].getInt32Array()[0]):n.inputs[0].dataType===1&&(e=n.inputs[0].getFloat32Array()[0],r=n.inputs[1].getFloat32Array()[0],t=n.inputs[2].getFloat32Array()[0]),ge.webgpu.validateInputContent&&aD(e,r,t),n.compute(sD(e,r,t,n.inputs[0].dataType),{inputs:[]})}});var uD,lD,fx,hx,mx=N(()=>{"use strict";de();be();Qe();we();uD=(n,e,r,t)=>{if(n!=="none"&&t!=="i32"&&t!=="u32"&&t!=="f32")throw new Error(`Input ${t} is not supported with reduction ${n}.`);let o=`{
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
                ${o}max(bitcast<f32>(oldValue), (${r}))${i}`;case"min":return t==="i32"||t==="u32"?`atomicMin(&${e}, bitcast<${t}>(${r}));`:`${o}min(bitcast<${t}>(oldValue), (${r}))${i}`;case"mul":return`${o}(bitcast<${t}>(oldValue) * (${r}))${i}`;default:throw new Error(`Reduction ${n} is not supported.`)}},lD=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r,i=1,a=Math.ceil(k.size(t)/i),s=t[t.length-1],u=k.sizeFromDimension(r,s),l=[{type:12,data:a},{type:12,data:s},{type:12,data:u},...W(n[1].dims,n[2].dims,o)],d=f=>{let m=R("indices",n[1].dataType,n[1].dims.length),b=R("updates",n[2].dataType,n[2].dims.length,i),y=e.reduction!=="none"&&e.reduction!==""?V_("output",n[0].dataType,o.length):V("output",n[0].dataType,o.length,i);return`
      ${f.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(m,b,y)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${e.reduction==="none"}) {
    let n = ${k.size(t)};
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
  if (${e.reduction==="none"} && hasDuplicates) {
    if (global_idx != 0u) {
      return;
    }
    indices_start = 0u;
  }
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
    ${uD(e.reduction,"output[data_offset + i]","value",y.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${e.cacheKey}_${e.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l}),getShaderSource:d}},fx=n=>ce({reduction:n.reduction}),hx=(n,e)=>{n.compute(lD(n.inputs,e),{inputs:[n.inputs[1],n.inputs[2]],outputs:[]})}});var cD,dD,pD,gx,fD,hD,mD,gD,bD,yD,_D,vD,bx,wD,xD,TD,ID,SD,yx,_x,vx=N(()=>{"use strict";de();be();Qe();we();cD=(n,e)=>{if(n.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),n.length>0){if(e.mode==="linear"){if(!(n.length===2||n.length===3||n.length===4&&n[0]===1&&n[1]===1||n.length===4&&n[0]===1&&n[3]===1||n.length===5&&n[0]===1&&n[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(e.mode==="cubic"&&!(n.length===2||n.length===4&&n[0]===1&&n[1]===1||n.length===4&&n[0]===1&&n[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},dD=(n,e,r)=>{e.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let t=new Array(r).fill(1);return e.forEach((o,i)=>t[o]=n[i]),t},pD=(n,e,r,t,o,i)=>{let[a,s,u]=r>10?[1,2,3]:[-1,n.length>1?1:-1,-1],l=n[0].dims.length;if(a>0&&n.length>a&&n[a].dims.length>0)n[a].getFloat32Array().forEach(d=>i.push(d));else if(e.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(s>0&&n.length>s&&n[s].dims.length===1&&n[s].dims[0]>0){if(n[s].getFloat32Array().forEach(d=>t.push(d)),t.length!==0&&t.length!==l&&r>=18&&t.length!==e.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");cD(t,e),e.axes.length>0&&dD(t,e.axes,l).forEach((d,f)=>t[f]=d)}if(u>0&&n.length>u&&n[u].dims.length===1&&n[u].dims[0]>0&&(n[u].getBigInt64Array().forEach(d=>o.push(Number(d))),o.length!==0&&o.length!==l&&r>=18&&o.length!==e.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(e.axes.length>0){if(t.length!==0&&t.length!==e.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==e.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof t<"u"&&typeof o<"u"&&t.length>0&&o.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},gx=(n,e,r,t)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${n}) * (${e});
  let whole = ${t}(big / (${r}));
  let fract = ${t}(big % (${r})) / ${t}(${r});
  return whole + fract;
`,fD=(n,e)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${e} { `+(()=>{switch(n){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${e}(xResized) / ${e}(xScale);
          } else {
            ${gx("xResized","lengthOriginal","lengthResized",e)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${e}(xResized) + 0.5) / ${e}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${e}(xResized) + 0.5) / ${e}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${gx("xResized","lengthOriginal - 1","lengthResized - 1",e)}
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
                  return offset + ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;case"half_pixel":return`return ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${n} is not supported`)}})()+"}",hD=(n,e,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(n){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(e<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${n} is not supported`)}})()+"}",mD=(n,e,r)=>{let t=new Array(r).fill(0).concat(new Array(r).fill(1)),o=n.length===0?t:n.slice();return e.length>0?(e.forEach((i,a)=>{t[i]=o[a],t[a+r]=o[e.length+a]}),t):o},gD=(n,e,r,t)=>{let o=[];if(r.length>0)if(t.length>0){if(n.forEach(i=>o.push(i)),Math.max(...t)>n.length)throw new Error("axes is out of bound");t.forEach((i,a)=>o[i]=r[a])}else r.forEach(i=>o.push(i));else{if(e.length===0)throw new Error("Resize requires either scales or sizes.");o=n.map((i,a)=>Math.round(i*e[a]))}return o},bD=(n,e,r)=>{let t=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>e[i]),Number.MAX_VALUE):Math.min(...e,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>e[i]),Number.MIN_VALUE):Math.max(...e,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();e.fill(1,0,e.length);let o=n.slice();return r.axes.length>0?(r.axes.forEach(i=>e[i]=t),r.axes.forEach(i=>o[i]=Math.round(n[i]*e[i]))):(e.fill(t,0,e.length),o.forEach((i,a)=>o[a]=Math.round(i*e[a]))),o},yD=(n,e,r,t,o)=>`
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
    }`,_D=(n,e,r,t,o,i,a)=>`
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
        ${n.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,vD=(n,e)=>`
    fn checkInputIndices(input_indices: ${n.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${e.length}; i++) {
        var input_index = ${n.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${Q("uniforms.input_shape","i",e.length)}) {
          return false;
        }
      }
      return true;
    }`,bx=(n,e,r,t)=>n.rank>t?`
    ${n.indicesSet("input_indices",e,"channel")};
    ${n.indicesSet("input_indices",r,"batch")};
`:"",wD=(n,e,r,t,o)=>{let[a,s,u,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],d=n.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${n.type.indices};
      ${n.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${n.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${bx(n,l,a,2)}
      return ${n.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${e.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${s}];
      var col:${d} = originalIndices[${u}];
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
      var x11: ${d} = getInputValue(batch, channel, row1, col1);
      var x12: ${d} = getInputValue(batch, channel, row1, col2);
      var x21: ${d} = getInputValue(batch, channel, row2, col1);
      var x22: ${d} = getInputValue(batch, channel, row2, col2);
      var dx1: ${d} = abs(row - ${d}(row1));
      var dx2: ${d} = abs(${d}(row2) - row);
      var dy1: ${d} = abs(col - ${d}(col1));
      var dy2: ${d} = abs(${d}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},xD=(n,e,r,t,o,i,a,s,u,l)=>{let d=r.length===2,f=!0,[m,b]=d?[0,1]:f?[2,3]:[1,2],y=n.type.value,_=T=>{let w=T===m?"row":"col";return`
      fn ${w}CubicInterpolation(input_indices: ${n.type.indices}, output_indices: ${e.type.indices}) -> ${y} {
        var output_index = ${e.indicesGet("output_indices",T)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[T]},
        ${t[T]}, ${r[T]}, ${i[T]}, ${i[T]} + ${r.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${s} && (originalIdx < 0 || originalIdx > (${r[T]} - 1))) {
          return ${u};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${w}: ${y} = originalIdx + ${y}(i);
          if (${w} < 0 || ${w} >= ${r[T]}) {
            ${l?`coefs[i + 1] = 0.0;
                        continue;`:s?`return ${u};`:`${w} = max(0, min(${w}, ${r[T]} - 1));`};
          }
        var input_indices_copy: ${n.type.indices} = input_indices;
          ${n.indicesSet("input_indices_copy",T,`u32(${w})`)};
          data[i + 1] = ${T===m?n.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${_(m)};
    ${_(b)};
  fn getCubicInterpolationCoefs(s: ${y}) -> array<${y}, 4> {
    var absS = abs(s);
    var coeffs: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${y} = 1.0 - absS;
    var twoMinusAbsS: ${y} = 2.0 - absS;
    var onePlusAbsS: ${y} = 1.0 + absS;
    coeffs[0] = ((${a} * onePlusAbsS - 5 * ${a}) * onePlusAbsS + 8 * ${a}) * onePlusAbsS - 4 * ${a};
    coeffs[1] = ((${a} + 2) * absS - (${a} + 3)) * absS * absS + 1;
    coeffs[2] = ((${a} + 2) * oneMinusAbsS - (${a} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${a} * twoMinusAbsS - 5 * ${a}) * twoMinusAbsS + 8 * ${a}) * twoMinusAbsS - 4 * ${a};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${y}, 4>, coefs: array<${y}, 4>) -> ${y} {
    var coefsSum: ${y} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${e.type.indices}) -> ${y} {
    var input_indices: ${n.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},TD=(n,e,r,t,o)=>{let[a,s,u,l,d]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],f=n.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${f} {
      var input_indices: ${n.type.indices};
      ${n.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${n.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${n.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${bx(n,d,a,3)}
      return ${n.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${e.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${f} = originalIndices[${s}];
      var height:${f} = originalIndices[${u}];
      var width:${f} = originalIndices[${l}];
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
      var channel: u32 = ${r.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${a}])`:"0"};

      var x111: ${f} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${f} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${f} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${f} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${f} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${f} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${f} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${f} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${f} = abs(depth - ${f}(depth1));
      var dx2: ${f} = abs(${f}(depth2) - depth);
      var dy1: ${f} = abs(height - ${f}(height1));
      var dy2: ${f} = abs(${f}(height2) - height);
      var dz1: ${f} = abs(width - ${f}(width1));
      var dz2: ${f} = abs(${f}(width2) - width);
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
    }`},ID=(n,e,r,t,o,i)=>{let a=n.dims,s=mD(i,e.axes,a.length),u=gD(a,t,o,e.axes),l=t.slice();t.length===0&&(l=a.map((x,S)=>x===0?1:u[S]/x),e.keepAspectRatioPolicy!=="stretch"&&(u=bD(a,l,e)));let d=V("output",n.dataType,u.length),f=R("input",n.dataType,a.length),m=k.size(u),b=a.length===u.length&&a.every((x,S)=>x===u[S]),y=e.coordinateTransformMode==="tf_crop_and_resize",_=e.extrapolationValue,T=f.type.value,w=x=>`
      ${b?"":`
      ${fD(e.coordinateTransformMode,T)};
      ${(()=>{switch(e.mode){case"nearest":return`
              ${vD(f,a)};
              ${hD(e.nearestMode,r,T)};
              ${_D(f,d,a,u,l.length,s.length,y)};
              `;case"linear":return`
              ${yD(d,a,u,l.length,s.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${wD(f,d,a,y,_)}`;if(a.length===3||a.length===5)return`${TD(f,d,a,y,_)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${xD(f,d,a,u,l,s,e.cubicCoeffA,y,e.extrapolationValue,e.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${x.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",s.length).declareVariables(f,d)}
      ${x.mainStart()}
        ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${b?"output[global_idx] = input[global_idx];":`
        let output_indices = ${d.offsetToIndices("global_idx")};
        var input_indices: ${f.type.indices};
        ${(()=>{switch(e.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${f.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${e.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${e.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${e.cacheKey}|${r}|${l.length>0?e.mode==="cubic"?l:l.length:""}|${o.length>0?o:""}|${s.length>0?s:""}|${b}|${e.mode==="nearest"?a.length:a}`,inputDependencies:["rank"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:u,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},{type:1,data:l},{type:1,data:s},...W(a,u)]})}},SD=n=>{let e=n.customDataBuffer;return new Uint32Array(e,e.byteOffset,1)[0]},yx=(n,e)=>{let r=[],t=[],o=[],i=SD(n);if(e.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");pD(n.inputs,e,i,r,t,o),n.compute(ID(n.inputs[0],e,i,r,t,o),{inputs:[0]})},_x=n=>{let e=n.antialias,r=n.axes,t=n.coordinateTransformMode,o=n.cubicCoeffA,i=n.excludeOutside!==0,a=n.extrapolationValue,s=n.keepAspectRatioPolicy,u=n.mode,l=n.nearestMode===""?"simple":n.nearestMode;return ce({antialias:e,axes:r,coordinateTransformMode:t,cubicCoeffA:o,excludeOutside:i,extrapolationValue:a,keepAspectRatioPolicy:s,mode:u,nearestMode:l})}});var $D,AD,wx,xx=N(()=>{"use strict";de();be();we();$D=n=>{if(!n||n.length<3)throw new Error("layerNorm requires at least 3 inputs.");let e=n[0],r=n[1],t=n[2];if(e.dataType!==r.dataType||e.dataType!==t.dataType)throw new Error("All inputs must have the same data type");if(e.dims.length!==3&&e.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=e.dims[e.dims.length-1],i=e.dims[e.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(t.dims.length!==1)throw new Error("Gamma must be 1D");if(t.dims[t.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(n.length>3){let a=n[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(n.length>4){let a=n[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},AD=(n,e,r,t)=>{let o=e.simplified,i=n[0].dims,a=k.size(i),s=i,u=a,l=i.slice(-1)[0],d=t?i.slice(0,-1).concat(1):[],f=!o&&n.length>3,m=n.length>4,b=t&&r>1,y=t&&r>2,_=r>3,T=64,w=Ee(l),x=[{type:12,data:u},{type:12,data:w},{type:12,data:l},{type:1,data:e.epsilon}],S=P=>{let C=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],L=[R("x",n[0].dataType,n[0].dims,w),R("skip",n[1].dataType,n[1].dims,w),R("gamma",n[2].dataType,n[2].dims,w)];f&&L.push(R("beta",n[3].dataType,n[3].dims,w)),m&&L.push(R("bias",n[4].dataType,n[4].dims,w)),L.push(V("output",n[0].dataType,s,w)),b&&L.push(V("mean_output",1,d)),y&&L.push(V("inv_std_output",1,d)),_&&L.push(V("input_skip_bias_sum",n[0].dataType,s,w));let M=Ve(n[0].dataType),F=Ve(1,w);return`

      ${P.registerUniforms(C).declareVariables(...L)}
      var<workgroup> sum_shared : array<${F}, ${T}>;
      var<workgroup> sum_squared_shared : array<${F}, ${T}>;

      ${P.mainStart([T,1,1])}
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
          let bias_value = ${m?"bias[offset1d + i]":M+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${_?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Fn(M,w,"value")};
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
        let mean = ${Xt("sum",w)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Xt("square_sum",w)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${b?"mean_output[global_idx] = mean;":""}
        ${y?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${M}(mean)`}) *
            ${M}(inv_std_dev) * gamma[offset1d + i]
            ${f?"+ beta[offset1d + i]":""};
        }
      }`},A=[{dims:s,dataType:n[0].dataType}];return r>1&&A.push({dims:d,dataType:1}),r>2&&A.push({dims:d,dataType:1}),r>3&&A.push({dims:i,dataType:n[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${w};${b};${y};${_}`,inputDependencies:n.map((P,C)=>"type")},getShaderSource:S,getRunData:()=>({outputs:A,dispatchGroup:{x:Math.ceil(u/l)},programUniforms:x})}},wx=(n,e)=>{$D(n.inputs);let t=[0];n.outputCount>1&&t.push(-3),n.outputCount>2&&t.push(-3),n.outputCount>3&&t.push(3),n.compute(AD(n.inputs,e,n.outputCount,!1),{outputs:t})}});var OD,Ja,PD,Tx,ED,CD,Ix,Sx,$x=N(()=>{"use strict";de();be();Qe();we();OD=(n,e)=>{if(!n||n.length<1)throw new Error("too few inputs");if(e.axes.length!==0){if(e.axes.length!==e.starts.length||e.axes.length!==e.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(e.starts.length!==e.ends.length)throw new Error("starts and ends must have the same length");n.slice(1).forEach((r,t)=>{if(n[t+1].dataType!==6&&n[t+1].dataType!==7)throw new Error(`Input ${t} must be an array of int32 or int64`)})},Ja=(n,e)=>{let r=[];if(n.length>e)if(n[e].dataType===7)n[e].getBigInt64Array().forEach(t=>r.push(Number(t)));else if(n[e].dataType===6)n[e].getInt32Array().forEach(t=>r.push(Number(t)));else throw new Error(`Input ${e} must be an array of int32 or int64`);return r},PD=(n,e)=>{if(n.length>1){let r=Ja(n,1),t=Ja(n,2),o=Ja(n,3);return o.length===0&&(o=[...Array(n[0].dims.length).keys()]),ce({starts:r,ends:t,axes:o})}else return e},Tx=(n,e,r,t,o)=>{let i=n;return n<0&&(i+=r[t[e]]),o[e]<0?Math.max(0,Math.min(i,r[t[e]]-1)):Math.max(0,Math.min(i,r[t[e]]))},ED=(n,e,r)=>`fn calculateInputIndices(output_indices: ${e.type.indices}) -> ${n.type.indices} {
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
      }`,CD=(n,e)=>{let r=n[0].dims,t=k.size(r),o=e.axes.length>0?k.normalizeAxes(e.axes,r.length):[...Array(r.length).keys()],i=Ja(n,4);i.forEach(w=>w!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let a=e.starts.map((w,x)=>Tx(w,x,r,o,i)),s=e.ends.map((w,x)=>Tx(w,x,r,o,i));if(o.length!==a.length||o.length!==s.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let w=0;w<r.length;++w)o.includes(w)||(a.splice(w,0,0),s.splice(w,0,r[w]),i.splice(w,0,1));let u=i.map(w=>Math.sign(w));i.forEach((w,x,S)=>{if(w<0){let A=(s[x]-a[x])/w,P=a[x],C=P+A*i[x];a[x]=C,s[x]=P,S[x]=-w}});let l=r.slice(0);o.forEach((w,x)=>{l[w]=Math.ceil((s[w]-a[w])/i[w])});let d={dims:l,dataType:n[0].dataType},f=V("output",n[0].dataType,l.length),m=R("input",n[0].dataType,n[0].dims.length),b=k.size(l),y=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:i.length}],_=[{type:12,data:b},{type:12,data:a},{type:6,data:u},{type:12,data:i},...W(n[0].dims,l)],T=w=>`
      ${w.registerUniforms(y).declareVariables(m,f)}
        ${ED(m,f,r)}
        ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${f.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${f.setByOffset("global_idx",m.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${a.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:T,getRunData:()=>({outputs:[d],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:_})}},Ix=(n,e)=>{OD(n.inputs,e);let r=PD(n.inputs,e);n.compute(CD(n.inputs,r),{inputs:[0]})},Sx=n=>{let e=n.starts,r=n.ends,t=n.axes;return ce({starts:e,ends:r,axes:t})}});var DD,kD,Ax,Ox,Px=N(()=>{"use strict";de();be();Qe();Yr();we();DD=n=>{if(!n||n.length!==1)throw new Error("Softmax op requires 1 input.")},kD=(n,e)=>{let r=n.inputs[0],t=r.dims,o=k.size(t),i=t.length,a=k.normalizeAxis(e.axis,i),s=a<t.length-1,u,l=[];s?(l=Array.from({length:i},(L,M)=>M),l[a]=i-1,l[i-1]=a,u=n.compute(ut(r,l),{inputs:[r],outputs:[-1]})[0]):u=r;let d=u.dims,f=d[i-1],m=o/f,b=Ee(f),y=f/b,_=64;m===1&&(_=256);let T=(L,M)=>M===4?`max(max(${L}.x, ${L}.y), max(${L}.z, ${L}.w))`:M===2?`max(${L}.x, ${L}.y)`:M===3?`max(max(${L}.x, ${L}.y), ${L}.z)`:L,w=R("x",u.dataType,u.dims,b),x=V("result",u.dataType,u.dims,b),S=w.type.value,A=Ve(u.dataType)==="f32"?`var threadMax = ${S}(-3.402823e+38f);`:`var threadMax = ${S}(-65504.0h);`,P=L=>`
      var<workgroup> rowMaxShared : ${S};
      var<workgroup> rowSumShared : ${S};
      var<workgroup> threadShared : array<${S}, ${_}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${S} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${S}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${L.registerUniform("packedCols","i32").declareVariables(w,x)}
      ${L.mainStart(_)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${_};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${A}
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
          rowMaxShared = ${S}(${T("threadShared[0]",b)});
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
          rowSumShared = ${S}(${Xt("threadShared[0]",b)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,C=n.compute({name:"Softmax",shaderCache:{hint:`${b};${_}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:d,dataType:u.dataType}],dispatchGroup:{x:m},programUniforms:[{type:6,data:y}]}),getShaderSource:P},{inputs:[u],outputs:[s?-1:0]})[0];s&&n.compute(ut(C,l),{inputs:[C]})},Ax=(n,e)=>{DD(n.inputs),kD(n,e)},Ox=n=>ce({axis:n.axis})});var Ex,ND,LD,RD,Cx,Dx=N(()=>{"use strict";de();be();we();Ex=n=>Array.from(n.getBigInt64Array(),Number),ND=n=>{if(!n||n.length!==2)throw new Error("Tile requires 2 inputs.");if(n[0].dataType!==1&&n[0].dataType!==10&&n[0].dataType!==6&&n[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(n[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(n[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Ex(n[1]).length!==n[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},LD=(n,e)=>{let r=[];for(let t=0;t<n.length;++t)r.push(n[t]*e[t]);return r},RD=(n,e)=>{let r=n[0].dims,t=e??Ex(n[1]),o=LD(r,t),i=k.size(o),a=n[0].dataType,s=R("input",a,r.length),u=V("output",a,o.length),l=d=>`
      const inputShape = ${s.indices(...r)};
      ${d.registerUniform("output_size","u32").declareVariables(s,u)}
      ${d.mainStart()}
      ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${s.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${s.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${s.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",s.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...W(n[0].dims,o)]}),getShaderSource:l}},Cx=n=>{ND(n.inputs),n.compute(RD(n.inputs),{inputs:[0]})}});var zD,MD,kx,Nx=N(()=>{"use strict";de();be();we();zD=(n,e,r,t,o)=>{let i=V("output_data",o,r.length,4),a=R("a_data",e[1].dataType,e[1].dims.length,4),s=R("b_data",e[2].dataType,e[2].dims.length,4),u=R("c_data",e[0].dataType,e[0].dims.length,4),l,d=(f,m,b)=>`select(${m}, ${f}, ${b})`;if(!t)l=i.setByOffset("global_idx",d(a.getByOffset("global_idx"),s.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let f=(m,b,y="")=>{let _=`a_data[index_a${b}][component_a${b}]`,T=`b_data[index_b${b}][component_b${b}]`,w=`bool(c_data[index_c${b}] & (0xffu << (component_c${b} * 8)))`;return`
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
            ${m}[${b}] = ${y}(${d(_,T,w)});
          `};o===9?l=`
            var data = vec4<u32>(0);
            ${f("data",0,"u32")}
            ${f("data",1,"u32")}
            ${f("data",2,"u32")}
            ${f("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:l=`
            ${f("output_data[global_idx]",0)}
            ${f("output_data[global_idx]",1)}
            ${f("output_data[global_idx]",2)}
            ${f("output_data[global_idx]",3)}
          `}return`
        ${n.registerUniform("vec_size","u32").declareVariables(u,a,s,i)}
        ${n.mainStart()}
        ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`},MD=n=>{let e=n[1].dims,r=n[2].dims,t=n[0].dims,o=n[1].dataType,i=!(k.areEqual(e,r)&&k.areEqual(r,t)),a=e,s=k.size(e);if(i){let l=Vr.calcShape(Vr.calcShape(e,r,!1),t,!1);if(!l)throw new Error("Can't perform where op on the given tensors");a=l,s=k.size(a)}let u=Math.ceil(s/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>zD(l,n,a,i,o),getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/64/4)},programUniforms:[{type:12,data:u},...W(t,e,r,a)]})}},kx=n=>{n.compute(MD(n.inputs))}});var Lx,Rx=N(()=>{"use strict";gv();Ba();_v();wv();a0();b0();v0();R0();U0();q0();X0();ew();nw();iw();uw();dw();hw();bw();vw();Tw();Dw();Lw();zw();Bw();Gw();zc();Ww();sx();cx();px();mx();za();vx();Fc();xx();$x();Px();Bc();Dx();Yr();Va();Nx();Lx=new Map([["Abs",[xv]],["Acos",[Tv]],["Acosh",[Iv]],["Add",[s0]],["ArgMax",[mv,Ic]],["ArgMin",[hv,Ic]],["Asin",[Sv]],["Asinh",[$v]],["Atan",[Av]],["Atanh",[Ov]],["Attention",[bv]],["AveragePool",[Yw,Jw]],["BatchNormalization",[yv]],["BiasAdd",[vv]],["BiasSplitGelu",[i0]],["Cast",[Ev,Pv]],["Ceil",[Dv]],["Clip",[Cv]],["Concat",[y0,_0]],["Conv",[kc,Dc]],["ConvTranspose",[G0,F0]],["Cos",[kv]],["Cosh",[Nv]],["CumSum",[W0,H0]],["DepthToSpace",[j0,K0]],["DequantizeLinear",[ux,lx]],["Div",[u0]],["Einsum",[Y0,Q0]],["Elu",[Lv,Uo]],["Equal",[l0]],["Erf",[Rv]],["Exp",[zv]],["Expand",[rw]],["FastGelu",[ow]],["Floor",[Mv]],["FusedConv",[kc,Dc]],["Gather",[sw,aw]],["GatherElements",[gw,mw]],["GatherBlockQuantized",[pw,fw]],["GatherND",[lw,cw]],["Gelu",[Bv]],["Gemm",[_w,yw]],["GlobalAveragePool",[tx,ex]],["GlobalMaxPool",[ax,ix]],["Greater",[f0]],["GreaterOrEqual",[m0]],["GridSample",[ww,xw]],["GroupQueryAttention",[Cw]],["HardSigmoid",[jv,qv]],["InstanceNormalization",[Nw]],["LayerNormalization",[Rw]],["LeakyRelu",[Fv,Uo]],["Less",[h0]],["LessOrEqual",[g0]],["Log",[r0]],["MatMul",[Mw]],["MatMulNBits",[Fw,Vw]],["MaxPool",[nx,ox]],["Mul",[c0]],["MultiHeadAttention",[$w,Sw]],["Neg",[Gv]],["Not",[Vv]],["Pad",[Uw]],["Pow",[d0]],["QuickGelu",[n0,Uo]],["Range",[dx]],["Reciprocal",[Uv]],["ReduceMin",[uv]],["ReduceMean",[nv]],["ReduceMax",[sv]],["ReduceSum",[cv]],["ReduceProd",[lv]],["ReduceL1",[ov]],["ReduceL2",[iv]],["ReduceLogSum",[pv]],["ReduceLogSumExp",[av]],["ReduceSumSquare",[dv]],["Relu",[Wv]],["Resize",[yx,_x]],["RotaryEmbedding",[Pw]],["ScatterND",[hx,fx]],["Sigmoid",[Hv]],["Sin",[Kv]],["Sinh",[Xv]],["Slice",[Ix,Sx]],["SkipLayerNormalization",[wx]],["Split",[Aw,Ow]],["Sqrt",[Zv]],["Softmax",[Ax,Ox]],["Sub",[p0]],["Tan",[Jv]],["Tanh",[Qv]],["ThresholdedRelu",[t0,Uo]],["Tile",[Cx]],["Transpose",[W_,H_]],["Where",[kx]]])});var Ya,zx=N(()=>{"use strict";ft();Fr();we();Ya=class{constructor(e){this.backend=e;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,r){this.repo.set(e,r)}run(e,r,t,o,i){At(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let d of r)u.push({binding:u.length,resource:{buffer:d.buffer}});for(let d of t)u.push({binding:u.length,resource:{buffer:d.buffer}});i&&u.push({binding:u.length,resource:i});let l=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let d={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d)}s.setPipeline(e.computePipeline),s.setBindGroup(0,l),s.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),yt(e.programInfo.name)}dispose(){}build(e,r){At(e.name);let t=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(f=>{t.features.has(f.feature)&&o.push(`enable ${f.extension};`)});let a=G_(r,this.backend.device.limits),s=e.getShaderSource(a),u=`${o.join(`
`)}
${a.additionalImplementations}
${s}`,l=t.createShaderModule({code:u,label:e.name});xe("verbose",()=>`[WebGPU] ${e.name} shader code: ${u}`);let d=t.createComputePipeline({compute:{module:l,entryPoint:"main"},layout:"auto",label:e.name});return yt(e.name),{programInfo:e,computePipeline:d,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let r=typeof e=="number"?e:e.x,t=typeof e=="number"?1:e.y||1,o=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=i&&t<=i&&o<=i)return[r,t,o];let a=r*t*o,s=Math.ceil(Math.sqrt(a));if(s>i){if(s=Math.ceil(Math.cbrt(a)),s>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}});var Mx={};wn(Mx,{WebGpuBackend:()=>Gc});var BD,FD,Vc,Gc,Bx=N(()=>{"use strict";ft();de();Fr();dc();F_();Rx();zx();BD=(n,e)=>{if(e.length!==n.length)throw new Error(`inputDependencies length ${e.length} is not equal to inputTensors length ${n.length}.`);let r=[];for(let t=0;t<n.length;++t){let o=n[t].dataType;switch(e[t]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let i=n[t].dims.length;r.push(`${o};${i}`);break}case"dims":{let i=n[t].dims.join(",");r.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${e[t]}`)}}return r.join("|")},FD=(n,e,r)=>{let t=n.name;return n.shaderCache?.hint&&(t+="["+n.shaderCache.hint+"]"),t+=":"+r+`:${BD(e,n.shaderCache?.inputDependencies??new Array(e.length).fill("dims"))}`,t},Vc=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Gc=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,r){this.env=e;let t=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:t},i=a=>r.features.has(a)&&t.push(a)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups"),this.device=await r.requestDevice(o),this.adapterInfo=new Vc(r.info||await r.requestAdapterInfo()),this.gpuDataManager=B_(this),this.programManager=new Ya(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Oa(e.logLevel,!!e.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;At(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(e.getMappedRange()),t=this.pendingQueries.get(e);for(let o=0;o<r.length/2;o++){let i=t[o],a=i.kernelId,s=this.kernels.get(a),u=s.kernelType,l=s.kernelName,d=i.programName,f=i.inputTensorViews,m=i.outputTensorViews,b=r[o*2],y=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=b);let _=Number(b-this.queryTimeBase),T=Number(y-this.queryTimeBase);if(!Number.isSafeInteger(_)||!Number.isSafeInteger(T))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:f.map(w=>({dims:w.dims,dataType:Br(w.dataType)})),outputsMetadata:m.map(w=>({dims:w.dims,dataType:Br(w.dataType)})),kernelId:a,kernelType:u,kernelName:l,programName:d,startTime:_,endTime:T});else{let w="";f.forEach((S,A)=>{w+=`input[${A}]: [${S.dims}] | ${Br(S.dataType)}, `});let x="";m.forEach((S,A)=>{x+=`output[${A}]: [${S.dims}] | ${Br(S.dataType)}, `}),console.log(`[profiling] kernel "${a}|${u}|${l}|${d}" ${w}${x}execution time: ${T-_} ns`)}li("GPU",`${d}::${b}::${y}`)}e.unmap(),this.pendingQueries.delete(e)}),yt()}run(e,r,t,o,i,a){At(e.name);let s=[];for(let S=0;S<r.length;++S){let A=r[S].data;if(A===0)continue;let P=this.gpuDataManager.get(A);if(!P)throw new Error(`no GPU data for input: ${A}`);s.push(P)}let{outputs:u,dispatchGroup:l,programUniforms:d}=e.getRunData(r),f=t.length===0?u.map((S,A)=>A):t;if(f.length!==u.length)throw new Error(`Output size ${f.length} must be equal to ${u.length}.`);let m=[],b=[];for(let S=0;S<u.length;++S){if(!Number.isInteger(f[S])||f[S]<-3||f[S]>=a)throw new Error(`Invalid output index: ${f[S]}`);if(f[S]===-3)continue;let A=f[S]===-1,P=f[S]===-2,C=A||P?i(u[S].dataType,u[S].dims):o(f[S],u[S].dataType,u[S].dims);if(m.push(C),C.data===0)continue;let L=this.gpuDataManager.get(C.data);if(!L)throw new Error(`no GPU data for output: ${C.data}`);if(A&&this.temporaryData.push(L),P){let M=this.kernelPersistentData.get(this.currentKernelId);M||(M=[],this.kernelPersistentData.set(this.currentKernelId,M)),M.push(L)}b.push(L)}if(s.length!==r.length||b.length!==m.length){if(b.length===0)return yt(e.name),m;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let y;if(d){let S=0,A=[];d.forEach(M=>{let F=typeof M.data=="number"?[M.data]:M.data;if(F.length===0)return;let X=M.type===10?2:4,ee,ie;M.type===10?(ie=F.length>4?16:F.length>2?8:F.length*X,ee=F.length>4?16:X*F.length):(ie=F.length<=2?F.length*X:16,ee=16),S=Math.ceil(S/ie)*ie,A.push(S);let j=M.type===10?8:4;S+=F.length>4?Math.ceil(F.length/j)*ee:F.length*X});let P=16;S=Math.ceil(S/P)*P;let C=new ArrayBuffer(S);d.forEach((M,F)=>{let X=A[F],ee=typeof M.data=="number"?[M.data]:M.data;if(M.type===6)new Int32Array(C,X,ee.length).set(ee);else if(M.type===12)new Uint32Array(C,X,ee.length).set(ee);else if(M.type===10)new Uint16Array(C,X,ee.length).set(ee);else if(M.type===1)new Float32Array(C,X,ee.length).set(ee);else throw new Error(`Unsupported uniform type: ${Br(M.type)}`)});let L=this.gpuDataManager.create(S,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(L.buffer,0,C,0,S),this.gpuDataManager.release(L.id),y={offset:0,size:S,buffer:L.buffer}}let _=this.programManager.normalizeDispatchGroupSize(l),T=_[1]===1&&_[2]===1,w=FD(e,r,T),x=this.programManager.getArtifact(w);if(x||(x=this.programManager.build(e,_),this.programManager.setArtifact(w,x),xe("info",()=>`[artifact] key: ${w}, programName: ${e.name}`)),d&&x.uniformVariablesInfo){if(d.length!==x.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${x.uniformVariablesInfo.length}, got ${d.length} in program "${x.programInfo.name}".`);for(let S=0;S<d.length;S++){let A=d[S],P=A.type,C=typeof A.data=="number"?1:A.data.length,[L,M]=x.uniformVariablesInfo[S];if(P!==L||C!==M)throw new Error(`Uniform variable ${S} mismatch: expect type ${L} with size ${M}, got type ${P} with size ${C} in program "${x.programInfo.name}".`)}}if(xe("info",()=>`[ProgramManager] run "${e.name}" (key=${w}) with ${_[0]}x${_[1]}x${_[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let S={kernelId:this.currentKernelId,programName:x.programInfo.name,inputTensorViews:r,outputTensorViews:m};this.pendingKernels.push(S),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(S)}return this.programManager.run(x,s,b,_,y),yt(e.name),m}upload(e,r){this.gpuDataManager.upload(e,r)}memcpy(e,r){this.gpuDataManager.memcpy(e,r)}async download(e,r){await this.gpuDataManager.download(e,r)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,r,t,o){let i=Lx.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:o,kernelEntry:i[0],attributes:[i[1],t]};this.kernels.set(r,a)}releaseKernel(e){let r=this.kernelPersistentData.get(e);if(r){for(let t of r)this.gpuDataManager.release(t.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,r,t){let o=this.kernels.get(e);if(!o)throw new Error(`kernel not created: ${e}`);let i=o.kernelType,a=o.kernelName,s=o.kernelEntry,u=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),xe("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),s(r,u[1]),0}catch(d){return t.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${d}`)),1}finally{l&&t.push(this.device.popErrorScope().then(d=>d?`GPU validation error for kernel "[${i}] ${a}": ${d.message}`:null));for(let d of this.temporaryData)this.gpuDataManager.release(d.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,r,t,o){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let a=i.get(r),s=this.gpuDataManager.registerExternalBuffer(t,o,a);return i.set(r,[s,t]),s}unregisterBuffers(e){let r=this.sessionExternalDataMapping.get(e);r&&(r.forEach(t=>this.gpuDataManager.unregisterExternalBuffer(t[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let r=this.gpuDataManager.get(e);if(!r)throw new Error(`no GPU data for buffer: ${e}`);return r.buffer}createDownloader(e,r,t){return async()=>{let o=await yc(this,e,r);return Ea(o.buffer,t)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){xe("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){xe("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){xe("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),t=e.length;this.pendingKernels=[];for(let o=0;o<t;o++){let i=this.getComputePassEncoder(),a=e[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}});var Fx={};wn(Fx,{init:()=>VD});var jo,Uc,VD,Vx=N(()=>{"use strict";de();Fr();be();L_();jo=class n{constructor(e,r,t,o){this.module=e;this.dataType=r;this.data=t;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let e=k.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let e=k.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let e=k.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let e=k.size(this.dims);return e===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(e){if(k.size(e)!==k.size(this.dims))throw new Error("Invalid new shape");return new n(this.module,this.dataType,this.data,e)}},Uc=class{constructor(e,r,t){this.module=e;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo;let o=e.PTR_SIZE,i=t/e.PTR_SIZE,a=o===4?"i32":"i64";this.opKernelContext=Number(e.getValue(o*i++,a));let s=Number(e.getValue(o*i++,a));this.outputCount=Number(e.getValue(o*i++,a)),this.customDataOffset=Number(e.getValue(o*i++,"*")),this.customDataSize=Number(e.getValue(o*i++,a));let u=[];for(let l=0;l<s;l++){let d=Number(e.getValue(o*i++,a)),f=Number(e.getValue(o*i++,"*")),m=Number(e.getValue(o*i++,a)),b=[];for(let y=0;y<m;y++)b.push(Number(e.getValue(o*i++,a)));u.push(new jo(e,d,f,b))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,r){let t=r?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,o=r?.outputs??[],i=(s,u,l)=>new jo(this.module,u,this.output(s,l),l),a=(s,u)=>{let l=gn(s,u);if(!l)throw new Error(`Unsupported data type: ${s}`);let d=l>0?this.backend.gpuDataManager.create(l).id:0;return new jo(this.module,s,d,u)};return this.backend.run(e,t,o,i,a,this.outputCount)}output(e,r){let t=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",a=this.module.stackAlloc((1+r.length)*o);this.module.setValue(a,r.length,i);for(let s=0;s<r.length;s++)this.module.setValue(a+o*(s+1),r[s],i);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(o){throw new Error(`Failed to generate kernel's output[${e}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(t)}}},VD=async(n,e,r,t)=>{let o=e.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(n==="webgpu"){let i=(Bx(),Kn(Mx)).WebGpuBackend,a=new i;await a.initialize(r,t),o("webgpu",[a,s=>a.alloc(Number(s)),s=>a.free(s),(s,u,l,d=!1)=>{if(d)xe("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(s)}, dst=${Number(u)}, size=${Number(l)}`),a.memcpy(Number(s),Number(u));else{xe("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(s)}, gpuDataId=${Number(u)}, size=${Number(l)}`);let f=e.HEAPU8.subarray(Number(s>>>0),Number(s>>>0)+Number(l));a.upload(Number(u),f)}},async(s,u,l)=>{xe("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${u}, size=${l}`),await a.download(Number(s),()=>e.HEAPU8.subarray(Number(u)>>>0,Number(u+l)>>>0))},(s,u,l)=>a.createKernel(s,Number(u),l,e.UTF8ToString(e._JsepGetNodeName(Number(u)))),s=>a.releaseKernel(s),(s,u,l,d)=>{xe("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${l}, kernel=${s}, contextDataOffset=${u}`);let f=new Uc(e,a,Number(u));return a.computeKernel(Number(s),f,d)},()=>a.captureBegin(),()=>a.captureEnd(),()=>a.replay()])}else{let i=new ka(r);o("webnn",[i,()=>i.reserveTensorId(),a=>i.releaseTensorId(a),async(a,s,u,l,d)=>i.ensureTensor(a,s,u,l,d),(a,s)=>{i.uploadTensor(a,s)},async(a,s)=>i.downloadTensor(a,s)])}}});var GD,ma,ga,Vn,UD,Gx,Bo,ba,ya,Ux,_a,va,wa,rc=N(()=>{"use strict";T_();S_();de();mn();Ta();lc();GD=(n,e)=>{Me()._OrtInit(n,e)!==0&&ke("Can't initialize onnxruntime.")},ma=async n=>{GD(n.wasm.numThreads,Vo(n.logLevel))},ga=async(n,e)=>{Me().asyncInit?.();{let r=(Vx(),Kn(Fx)).init;if(e==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let t=n.webgpu.adapter;if(t){if(typeof t.limits!="object"||typeof t.features!="object"||typeof t.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=n.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=n.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(t=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!t)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",Me(),n,t)}if(e==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",Me(),n)}}},Vn=new Map,UD=n=>{let e=Me(),r=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetInputOutputCount(n,o,o+t)!==0&&ke("Can't get session input/output count.");let a=t===4?"i32":"i64";return[Number(e.getValue(o,a)),Number(e.getValue(o+t,a))]}finally{e.stackRestore(r)}},Gx=(n,e)=>{let r=Me(),t=r.stackSave(),o=0;try{let i=r.PTR_SIZE,a=r.stackAlloc(2*i);r._OrtGetInputOutputMetadata(n,e,a,a+i)!==0&&ke("Can't get session input/output metadata.");let u=Number(r.getValue(a,"*"));o=Number(r.getValue(a+i,"*"));let l=r.HEAP32[o/4];if(l===0)return[u,0];let d=r.HEAPU32[o/4+1],f=[];for(let m=0;m<d;m++){let b=Number(r.getValue(o+8+m*i,"*"));f.push(b!==0?r.UTF8ToString(b):Number(r.getValue(o+8+(m+d)*i,"*")))}return[u,l,f]}finally{r.stackRestore(t),o!==0&&r._OrtFree(o)}},Bo=n=>{let e=Me(),r=e._malloc(n.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${n.byteLength}.`);return e.HEAPU8.set(n,r),[r,n.byteLength]},ba=async(n,e)=>{let r,t,o=Me();Array.isArray(n)?[r,t]=n:n.buffer===o.HEAPU8.buffer?[r,t]=[n.byteOffset,n.byteLength]:[r,t]=Bo(n);let i=0,a=0,s=0,u=[],l=[],d=[];try{if([a,u]=await I_(e),e?.externalData&&o.mountExternalData){let A=[];for(let P of e.externalData){let C=typeof P=="string"?P:P.path;A.push(Go(typeof P=="string"?P:P.data).then(L=>{o.mountExternalData(C,L)}))}await Promise.all(A)}for(let A of e?.executionProviders??[])if((typeof A=="string"?A:A.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof A!="string"){let C=A,L=C?.context,M=C?.gpuDevice,F=C?.deviceType,X=C?.powerPreference;L?o.currentContext=L:M?o.currentContext=await o.webnnCreateMLContext(M):o.currentContext=await o.webnnCreateMLContext({deviceType:F,powerPreference:X})}else o.currentContext=await o.webnnCreateMLContext();break}i=await o._OrtCreateSession(r,t,a),o.webgpuOnCreateSession?.(i),i===0&&ke("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.webnnRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[f,m]=UD(i),b=!!e?.enableGraphCapture,y=[],_=[],T=[],w=[],x=[];for(let A=0;A<f;A++){let[P,C,L]=Gx(i,A);P===0&&ke("Can't get an input name."),l.push(P);let M=o.UTF8ToString(P);y.push(M),T.push(C===0?{name:M,isTensor:!1}:{name:M,isTensor:!0,type:Br(C),shape:L})}for(let A=0;A<m;A++){let[P,C,L]=Gx(i,A+f);P===0&&ke("Can't get an output name."),d.push(P);let M=o.UTF8ToString(P);_.push(M),w.push(C===0?{name:M,isTensor:!1}:{name:M,isTensor:!0,type:Br(C),shape:L});{if(b&&e?.preferredOutputLocation===void 0){x.push("gpu-buffer");continue}let F=typeof e?.preferredOutputLocation=="string"?e.preferredOutputLocation:e?.preferredOutputLocation?.[M]??"cpu";if(F!=="cpu"&&F!=="cpu-pinned"&&F!=="gpu-buffer"&&F!=="ml-tensor")throw new Error(`Not supported preferred output location: ${F}.`);if(b&&F!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${F}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);x.push(F)}}let S=null;return x.some(A=>A==="gpu-buffer"||A==="ml-tensor")&&(s=o._OrtCreateBinding(i),s===0&&ke("Can't create IO binding."),S={handle:s,outputPreferredLocations:x,outputPreferredLocationsEncoded:x.map(A=>uc(A))}),Vn.set(i,[i,l,d,S,b,!1]),[i,y,_,T,w]}catch(f){throw l.forEach(m=>o._OrtFree(m)),d.forEach(m=>o._OrtFree(m)),s!==0&&o._OrtReleaseBinding(s)!==0&&ke("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&ke("Can't release session."),f}finally{o._free(r),a!==0&&o._OrtReleaseSessionOptions(a)!==0&&ke("Can't release session options."),u.forEach(f=>o._free(f)),o.unmountExternalData?.()}},ya=n=>{let e=Me(),r=Vn.get(n);if(!r)throw new Error(`cannot release session. invalid session id: ${n}`);let[t,o,i,a,s]=r;a&&(s&&e._OrtClearBoundOutputs(a.handle)!==0&&ke("Can't clear bound outputs."),e._OrtReleaseBinding(a.handle)!==0&&ke("Can't release IO binding.")),e.jsepOnReleaseSession?.(n),e.webnnOnReleaseSession?.(n),e.webgpuOnReleaseSession?.(n),o.forEach(u=>e._OrtFree(u)),i.forEach(u=>e._OrtFree(u)),e._OrtReleaseSession(t)!==0&&ke("Can't release session."),Vn.delete(n)},Ux=async(n,e,r,t,o,i,a=!1)=>{if(!n){e.push(0);return}let s=Me(),u=s.PTR_SIZE,l=n[0],d=n[1],f=n[3],m=f,b,y;if(l==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(a&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${i} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let w=n[2].gpuBuffer;y=gn(so(l),d);{let x=s.jsepRegisterBuffer;if(!x)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');b=x(t,i,w,y)}}else if(f==="ml-tensor"){let w=n[2].mlTensor;y=gn(so(l),d);let x=s.webnnRegisterMLTensor;if(!x)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');b=x(t,w,so(l),d)}else{let w=n[2];if(Array.isArray(w)){y=u*w.length,b=s._malloc(y),r.push(b);for(let x=0;x<w.length;x++){if(typeof w[x]!="string")throw new TypeError(`tensor data at index ${x} is not a string`);s.setValue(b+x*u,Et(w[x],r),"*")}}else{let x=s.webnnIsGraphInput;if(l!=="string"&&x){let S=s.UTF8ToString(o);if(x(t,S)){let A=so(l);y=gn(A,d),m="ml-tensor";let P=s.webnnCreateTemporaryTensor,C=s.webnnUploadTensor;if(!P||!C)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let L=await P(t,A,d);C(L,new Uint8Array(w.buffer,w.byteOffset,w.byteLength)),b=L}else y=w.byteLength,b=s._malloc(y),r.push(b),s.HEAPU8.set(new Uint8Array(w.buffer,w.byteOffset,y),b)}else y=w.byteLength,b=s._malloc(y),r.push(b),s.HEAPU8.set(new Uint8Array(w.buffer,w.byteOffset,y),b)}}let _=s.stackSave(),T=s.stackAlloc(4*d.length);try{d.forEach((x,S)=>s.setValue(T+S*u,x,u===4?"i32":"i64"));let w=s._OrtCreateTensor(so(l),b,y,T,d.length,uc(m));w===0&&ke(`Can't create tensor for input/output. session=${t}, index=${i}.`),e.push(w)}finally{s.stackRestore(_)}},_a=async(n,e,r,t,o,i)=>{let a=Me(),s=a.PTR_SIZE,u=Vn.get(n);if(!u)throw new Error(`cannot run inference. invalid session id: ${n}`);let l=u[0],d=u[1],f=u[2],m=u[3],b=u[4],y=u[5],_=e.length,T=t.length,w=0,x=[],S=[],A=[],P=[],C=a.stackSave(),L=a.stackAlloc(_*s),M=a.stackAlloc(_*s),F=a.stackAlloc(T*s),X=a.stackAlloc(T*s);try{[w,x]=x_(i);for(let j=0;j<_;j++)await Ux(r[j],S,P,n,d[e[j]],e[j],b);for(let j=0;j<T;j++)await Ux(o[j],A,P,n,f[t[j]],_+t[j],b);for(let j=0;j<_;j++)a.setValue(L+j*s,S[j],"*"),a.setValue(M+j*s,d[e[j]],"*");for(let j=0;j<T;j++)a.setValue(F+j*s,A[j],"*"),a.setValue(X+j*s,f[t[j]],"*");if(m&&!y){let{handle:j,outputPreferredLocations:oe,outputPreferredLocationsEncoded:Ue}=m;if(d.length!==_)throw new Error(`input count from feeds (${_}) is expected to be always equal to model's input count (${d.length}).`);for(let J=0;J<_;J++){let te=e[J];await a._OrtBindInput(j,d[te],S[J])!==0&&ke(`Can't bind input[${J}] for session=${n}.`)}for(let J=0;J<T;J++){let te=t[J];o[J]?.[3]?a._OrtBindOutput(j,f[te],A[J],0)!==0&&ke(`Can't bind pre-allocated output[${J}] for session=${n}.`):a._OrtBindOutput(j,f[te],0,Ue[te])!==0&&ke(`Can't bind output[${J}] to ${oe[J]} for session=${n}.`)}Vn.set(n,[l,d,f,m,b,!0])}a.jsepOnRunStart?.(l),a.webnnOnRunStart?.(l);let ee;m?ee=await a._OrtRunWithBinding(l,m.handle,T,F,w):ee=await a._OrtRun(l,M,L,_,X,T,F,w),ee!==0&&ke("failed to call OrtRun().");let ie=[];for(let j=0;j<T;j++){let oe=Number(a.getValue(F+j*s,"*"));if(oe===A[j]){ie.push(o[j]);continue}let Ue=a.stackSave(),J=a.stackAlloc(4*s),te=!1,pe,ue=0;try{a._OrtGetTensorData(oe,J,J+s,J+2*s,J+3*s)!==0&&ke(`Can't access output tensor data on index ${j}.`);let Be=s===4?"i32":"i64",Ge=Number(a.getValue(J,Be));ue=a.getValue(J+s,"*");let fe=a.getValue(J+s*2,"*"),D=Number(a.getValue(J+s*3,Be)),q=[];for(let Ke=0;Ke<D;Ke++)q.push(Number(a.getValue(fe+Ke*s,Be)));a._OrtFree(fe)!==0&&ke("Can't free memory for tensor dims.");let Pe=q.reduce((Ke,Xe)=>Ke*Xe,1);pe=Br(Ge);let mt=m?.outputPreferredLocations[t[j]];if(pe==="string"){if(mt==="gpu-buffer"||mt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Ke=[];for(let Xe=0;Xe<Pe;Xe++){let at=a.getValue(ue+Xe*s,"*"),_n=a.getValue(ue+(Xe+1)*s,"*"),Un=Xe===Pe-1?void 0:_n-at;Ke.push(a.UTF8ToString(at,Un))}ie.push([pe,q,Ke,"cpu"])}else if(mt==="gpu-buffer"&&Pe>0){let Ke=a.jsepGetBuffer;if(!Ke)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Xe=Ke(ue),at=gn(Ge,Pe);if(at===void 0||!$a(pe))throw new Error(`Unsupported data type: ${pe}`);te=!0,ie.push([pe,q,{gpuBuffer:Xe,download:a.jsepCreateDownloader(Xe,at,pe),dispose:()=>{a._OrtReleaseTensor(oe)!==0&&ke("Can't release tensor.")}},"gpu-buffer"])}else if(mt==="ml-tensor"&&Pe>0){let Ke=a.webnnEnsureTensor,Xe=a.webnnIsInt64Supported;if(!Ke||!Xe)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(gn(Ge,Pe)===void 0||!Aa(pe))throw new Error(`Unsupported data type: ${pe}`);if(pe==="int64"&&!Xe(n))throw new Error('preferredLocation "ml-tensor" for int64 output is not supported by current WebNN Context.');let _n=await Ke(n,ue,Ge,q,!1);te=!0,ie.push([pe,q,{mlTensor:_n,download:a.webnnCreateMLTensorDownloader(ue,pe),dispose:()=>{a.webnnReleaseTensorId(ue),a._OrtReleaseTensor(oe)}},"ml-tensor"])}else{let Ke=Sa(pe),Xe=new Ke(Pe);new Uint8Array(Xe.buffer,Xe.byteOffset,Xe.byteLength).set(a.HEAPU8.subarray(ue,ue+Xe.byteLength)),ie.push([pe,q,Xe,"cpu"])}}finally{a.stackRestore(Ue),pe==="string"&&ue&&a._free(ue),te||a._OrtReleaseTensor(oe),a.webnnOnRunEnd?.(l)}}return m&&!b&&(a._OrtClearBoundOutputs(m.handle)!==0&&ke("Can't clear bound outputs."),Vn.set(n,[l,d,f,m,b,!1])),ie}finally{a.stackRestore(C),S.forEach(ee=>a._OrtReleaseTensor(ee)),A.forEach(ee=>a._OrtReleaseTensor(ee)),P.forEach(ee=>a._free(ee)),w!==0&&a._OrtReleaseRunOptions(w),x.forEach(ee=>a._free(ee))}},va=n=>{let e=Me(),r=Vn.get(n);if(!r)throw new Error("invalid session id");let t=r[0],o=e._OrtEndProfiling(t);o===0&&ke("Can't get an profile file name."),e._OrtFree(o)},wa=n=>{let e=[];for(let r of n){let t=r[2];!Array.isArray(t)&&"buffer"in t&&e.push(t.buffer)}return e}});var Gn,Gt,Ko,es,ts,Qa,Wc,Hc,po,fo,HD,Wx,Hx,qx,jx,Kx,Xx,Zx,qc=N(()=>{"use strict";ft();rc();mn();fa();Gn=()=>!!ge.wasm.proxy&&typeof document<"u",Ko=!1,es=!1,ts=!1,Hc=new Map,po=(n,e)=>{let r=Hc.get(n);r?r.push(e):Hc.set(n,[e])},fo=()=>{if(Ko||!es||ts||!Gt)throw new Error("worker not ready")},HD=n=>{switch(n.data.type){case"init-wasm":Ko=!1,n.data.err?(ts=!0,Wc[1](n.data.err)):(es=!0,Wc[0]()),Qa&&(URL.revokeObjectURL(Qa),Qa=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let e=Hc.get(n.data.type);n.data.err?e.shift()[1](n.data.err):e.shift()[0](n.data.out);break}default:}},Wx=async()=>{if(!es){if(Ko)throw new Error("multiple calls to 'initWasm()' detected.");if(ts)throw new Error("previous call to 'initWasm()' failed.");if(Ko=!0,Gn())return new Promise((n,e)=>{Gt?.terminate(),__().then(([r,t])=>{try{Gt=t,Gt.onerror=i=>e(i),Gt.onmessage=HD,Wc=[n,e];let o={type:"init-wasm",in:ge};!o.in.wasm.wasmPaths&&(r||ic)&&(o.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),Gt.postMessage(o),Qa=r}catch(o){e(o)}},e)});try{await ha(ge.wasm),await ma(ge),es=!0}catch(n){throw ts=!0,n}finally{Ko=!1}}},Hx=async n=>{if(Gn())return fo(),new Promise((e,r)=>{po("init-ep",[e,r]);let t={type:"init-ep",in:{epName:n,env:ge}};Gt.postMessage(t)});await ga(ge,n)},qx=async n=>Gn()?(fo(),new Promise((e,r)=>{po("copy-from",[e,r]);let t={type:"copy-from",in:{buffer:n}};Gt.postMessage(t,[n.buffer])})):Bo(n),jx=async(n,e)=>{if(Gn()){if(e?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return fo(),new Promise((r,t)=>{po("create",[r,t]);let o={type:"create",in:{model:n,options:{...e}}},i=[];n instanceof Uint8Array&&i.push(n.buffer),Gt.postMessage(o,i)})}else return ba(n,e)},Kx=async n=>{if(Gn())return fo(),new Promise((e,r)=>{po("release",[e,r]);let t={type:"release",in:n};Gt.postMessage(t)});ya(n)},Xx=async(n,e,r,t,o,i)=>{if(Gn()){if(r.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return fo(),new Promise((a,s)=>{po("run",[a,s]);let u=r,l={type:"run",in:{sessionId:n,inputIndices:e,inputs:u,outputIndices:t,options:i}};Gt.postMessage(l,wa(u))})}else return _a(n,e,r,t,o,i)},Zx=async n=>{if(Gn())return fo(),new Promise((e,r)=>{po("end-profiling",[e,r]);let t={type:"end-profiling",in:n};Gt.postMessage(t)});va(n)}});var Jx,qD,rs,Yx=N(()=>{"use strict";ft();qc();de();pa();lc();Jx=(n,e)=>{switch(n.location){case"cpu":return[n.type,n.dims,n.data,"cpu"];case"gpu-buffer":return[n.type,n.dims,{gpuBuffer:n.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[n.type,n.dims,{mlTensor:n.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${n.location} for ${e()}`)}},qD=n=>{switch(n[3]){case"cpu":return new $t(n[0],n[2],n[1]);case"gpu-buffer":{let e=n[0];if(!$a(e))throw new Error(`not supported data type: ${e} for deserializing GPU tensor`);let{gpuBuffer:r,download:t,dispose:o}=n[2];return $t.fromGpuBuffer(r,{dataType:e,dims:n[1],download:t,dispose:o})}case"ml-tensor":{let e=n[0];if(!Aa(e))throw new Error(`not supported data type: ${e} for deserializing MLTensor tensor`);let{mlTensor:r,download:t,dispose:o}=n[2];return $t.fromMLTensor(r,{dataType:e,dims:n[1],download:t,dispose:o})}default:throw new Error(`invalid data location: ${n[3]}`)}},rs=class{async fetchModelAndCopyToWasmMemory(e){return qx(await Go(e))}async loadModel(e,r){At();let t;typeof e=="string"?t=await this.fetchModelAndCopyToWasmMemory(e):t=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await jx(t,r),yt()}async dispose(){return Kx(this.sessionId)}async run(e,r,t){At();let o=[],i=[];Object.entries(e).forEach(m=>{let b=m[0],y=m[1],_=this.inputNames.indexOf(b);if(_===-1)throw new Error(`invalid input '${b}'`);o.push(y),i.push(_)});let a=[],s=[];Object.entries(r).forEach(m=>{let b=m[0],y=m[1],_=this.outputNames.indexOf(b);if(_===-1)throw new Error(`invalid output '${b}'`);a.push(y),s.push(_)});let u=o.map((m,b)=>Jx(m,()=>`input "${this.inputNames[i[b]]}"`)),l=a.map((m,b)=>m?Jx(m,()=>`output "${this.outputNames[s[b]]}"`):null),d=await Xx(this.sessionId,i,u,s,l,t),f={};for(let m=0;m<d.length;m++)f[this.outputNames[s[m]]]=a[m]??qD(d[m]);return yt(),f}startProfiling(){}endProfiling(){Zx(this.sessionId)}}});var eT={};wn(eT,{OnnxruntimeWebAssemblyBackend:()=>ns,initializeFlags:()=>Qx,wasmBackend:()=>jD});var Qx,ns,jD,tT=N(()=>{"use strict";ft();qc();Yx();Qx=()=>{if((typeof ge.wasm.initTimeout!="number"||ge.wasm.initTimeout<0)&&(ge.wasm.initTimeout=0),ge.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof ge.wasm.proxy!="boolean"&&(ge.wasm.proxy=!1),typeof ge.wasm.trace!="boolean"&&(ge.wasm.trace=!1),typeof ge.wasm.numThreads!="number"||!Number.isInteger(ge.wasm.numThreads)||ge.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ge.wasm.numThreads=1;else{let n=typeof navigator>"u"?As("node:os").cpus().length:navigator.hardwareConcurrency;ge.wasm.numThreads=Math.min(4,Math.ceil((n||1)/2))}},ns=class{async init(e){Qx(),await Wx(),await Hx(e)}async createInferenceSessionHandler(e,r){let t=new rs;return await t.loadModel(e,r),t}},jD=new ns});ft();ft();ft();var Pf="1.22.0-dev.20250325-afaf4a5e63";var TK=ks;{let n=(a_(),Kn(i_)).onnxjsBackend;an("webgl",n,-10)}{let n=(tT(),Kn(eT)).wasmBackend;an("webgpu",n,5),an("webnn",n,5),an("cpu",n,10),an("wasm",n,10)}Object.defineProperty(ge.versions,"web",{value:Pf,enumerable:!0});export{$1 as InferenceSession,li as TRACE,At as TRACE_FUNC_BEGIN,yt as TRACE_FUNC_END,$t as Tensor,TK as default,ge as env,an as registerBackend};
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
