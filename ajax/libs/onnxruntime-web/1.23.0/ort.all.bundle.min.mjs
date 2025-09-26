/*!
 * ONNX Runtime Web v1.23.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var PT=Object.create;var ai=Object.defineProperty;var ET=Object.getOwnPropertyDescriptor;var CT=Object.getOwnPropertyNames;var DT=Object.getPrototypeOf,kT=Object.prototype.hasOwnProperty;var Os=(r=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(r,{get:(e,n)=>(typeof require<"u"?require:e)[n]}):r)(function(r){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+r+'" is not supported')});var k=(r,e)=>()=>(r&&(e=r(r=0)),e);var oe=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports),$r=(r,e)=>{for(var n in e)ai(r,n,{get:e[n],enumerable:!0})},rp=(r,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of CT(e))!kT.call(r,o)&&o!==n&&ai(r,o,{get:()=>e[o],enumerable:!(t=ET(e,o))||t.enumerable});return r};var ve=(r,e,n)=>(n=r!=null?PT(DT(r)):{},rp(e||!r||!r.__esModule?ai(n,"default",{value:r,enumerable:!0}):n,r)),Jr=r=>rp(ai({},"__esModule",{value:!0}),r);var si,Ar,sr,NT,op,Ps=k(()=>{"use strict";si=new Map,Ar=[],sr=(r,e,n)=>{if(e&&typeof e.init=="function"&&typeof e.createInferenceSessionHandler=="function"){let t=si.get(r);if(t===void 0)si.set(r,{backend:e,priority:n});else{if(t.priority>n)return;if(t.priority===n&&t.backend!==e)throw new Error(`cannot register backend "${r}" using priority ${n}`)}if(n>=0){let o=Ar.indexOf(r);o!==-1&&Ar.splice(o,1);for(let i=0;i<Ar.length;i++)if(si.get(Ar[i]).priority<=n){Ar.splice(i,0,r);return}Ar.push(r)}return}throw new TypeError("not a valid backend")},NT=async r=>{let e=si.get(r);if(!e)return"backend not found.";if(e.initialized)return e.backend;if(e.aborted)return e.error;{let n=!!e.initPromise;try{return n||(e.initPromise=e.backend.init(r)),await e.initPromise,e.initialized=!0,e.backend}catch(t){return n||(e.error=`${t}`,e.aborted=!0),e.error}finally{delete e.initPromise}}},op=async r=>{let e=r.executionProviders||[],n=e.map(u=>typeof u=="string"?u:u.name),t=n.length===0?Ar:n,o,i=[],a=new Set;for(let u of t){let l=await NT(u);typeof l=="string"?i.push({name:u,err:l}):(o||(o=l),o===l&&a.add(u))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:l}of i)n.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${l}`);let s=e.filter(u=>a.has(typeof u=="string"?u:u.name));return[o,new Proxy(r,{get:(u,l)=>l==="executionProviders"?s:Reflect.get(u,l)})]}});var ip=k(()=>{"use strict";Ps()});var ap,sp=k(()=>{"use strict";ap="1.23.0"});var up,ot,Es=k(()=>{"use strict";sp();up="warning",ot={wasm:{},webgl:{},webgpu:{},versions:{common:ap},set logLevel(r){if(r!==void 0){if(typeof r!="string"||["verbose","info","warning","error","fatal"].indexOf(r)===-1)throw new Error(`Unsupported logging level: ${r}`);up=r}},get logLevel(){return up}};Object.defineProperty(ot,"logLevel",{enumerable:!0})});var me,lp=k(()=>{"use strict";Es();me=ot});var cp,dp,pp=k(()=>{"use strict";cp=(r,e)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=r.dims[3],n.height=r.dims[2];let t=n.getContext("2d");if(t!=null){let o,i;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=r.dims[2],i=r.dims[3]):(o=r.dims[3],i=r.dims[2]);let a=e?.format!==void 0?e.format:"RGB",s=e?.norm,u,l;s===void 0||s.mean===void 0?u=[255,255,255,255]:typeof s.mean=="number"?u=[s.mean,s.mean,s.mean,s.mean]:(u=[s.mean[0],s.mean[1],s.mean[2],0],s.mean[3]!==void 0&&(u[3]=s.mean[3])),s===void 0||s.bias===void 0?l=[0,0,0,0]:typeof s.bias=="number"?l=[s.bias,s.bias,s.bias,s.bias]:(l=[s.bias[0],s.bias[1],s.bias[2],0],s.bias[3]!==void 0&&(l[3]=s.bias[3]));let d=i*o,f=0,h=d,g=d*2,b=-1;a==="RGBA"?(f=0,h=d,g=d*2,b=d*3):a==="RGB"?(f=0,h=d,g=d*2):a==="RBG"&&(f=0,g=d,h=d*2);for(let _=0;_<i;_++)for(let T=0;T<o;T++){let v=(r.data[f++]-l[0])*u[0],x=(r.data[h++]-l[1])*u[1],I=(r.data[g++]-l[2])*u[2],$=b===-1?255:(r.data[b++]-l[3])*u[3];t.fillStyle="rgba("+v+","+x+","+I+","+$+")",t.fillRect(T,_,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},dp=(r,e)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),t;if(n!=null){let o,i,a;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=r.dims[2],i=r.dims[1],a=r.dims[3]):(o=r.dims[3],i=r.dims[2],a=r.dims[1]);let s=e!==void 0&&e.format!==void 0?e.format:"RGB",u=e?.norm,l,d;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?d=[0,0,0,0]:typeof u.bias=="number"?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(d[3]=u.bias[3]));let f=i*o;if(e!==void 0&&(e.format!==void 0&&a===4&&e.format!=="RGBA"||a===3&&e.format!=="RGB"&&e.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let h=4,g=0,b=1,_=2,T=3,v=0,x=f,I=f*2,$=-1;s==="RGBA"?(v=0,x=f,I=f*2,$=f*3):s==="RGB"?(v=0,x=f,I=f*2):s==="RBG"&&(v=0,I=f,x=f*2),t=n.createImageData(o,i);for(let O=0;O<i*o;g+=h,b+=h,_+=h,T+=h,O++)t.data[g]=(r.data[v++]-d[0])*l[0],t.data[b]=(r.data[x++]-d[1])*l[1],t.data[_]=(r.data[I++]-d[2])*l[2],t.data[T]=$===-1?255:(r.data[$++]-d[3])*l[3]}else throw new Error("Can not access image data");return t}});var Cs,fp,hp,mp,gp,bp,yp=k(()=>{"use strict";ui();Cs=(r,e)=>{if(r===void 0)throw new Error("Image buffer must be defined");if(e.height===void 0||e.width===void 0)throw new Error("Image height and width must be defined");if(e.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:t}=e,o=e.norm??{mean:255,bias:0},i,a;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?a=[o.bias,o.bias,o.bias,o.bias]:a=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let s=e.format!==void 0?e.format:"RGBA",u=e.tensorFormat!==void 0&&e.tensorFormat!==void 0?e.tensorFormat:"RGB",l=n*t,d=u==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),f=4,h=0,g=1,b=2,_=3,T=0,v=l,x=l*2,I=-1;s==="RGB"&&(f=3,h=0,g=1,b=2,_=-1),u==="RGBA"?I=l*3:u==="RBG"?(T=0,x=l,v=l*2):u==="BGR"&&(x=0,v=l,T=l*2);for(let O=0;O<l;O++,h+=f,b+=f,g+=f,_+=f)d[T++]=(r[h]+a[0])/i[0],d[v++]=(r[g]+a[1])/i[1],d[x++]=(r[b]+a[2])/i[2],I!==-1&&_!==-1&&(d[I++]=(r[_]+a[3])/i[3]);return u==="RGBA"?new dt("float32",d,[1,4,n,t]):new dt("float32",d,[1,3,n,t])},fp=async(r,e)=>{let n=typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement,t=typeof ImageData<"u"&&r instanceof ImageData,o=typeof ImageBitmap<"u"&&r instanceof ImageBitmap,i=typeof r=="string",a,s=e??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=d=>typeof HTMLCanvasElement<"u"&&d instanceof HTMLCanvasElement||d instanceof OffscreenCanvas?d.getContext("2d"):null;if(n){let d=u();d.width=r.width,d.height=r.height;let f=l(d);if(f!=null){let h=r.height,g=r.width;if(e!==void 0&&e.resizedHeight!==void 0&&e.resizedWidth!==void 0&&(h=e.resizedHeight,g=e.resizedWidth),e!==void 0){if(s=e,e.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");s.tensorFormat="RGBA",s.height=h,s.width=g}else s.tensorFormat="RGBA",s.height=h,s.width=g;f.drawImage(r,0,0),a=f.getImageData(0,0,g,h).data}else throw new Error("Can not access image data")}else if(t){let d,f;if(e!==void 0&&e.resizedWidth!==void 0&&e.resizedHeight!==void 0?(d=e.resizedHeight,f=e.resizedWidth):(d=r.height,f=r.width),e!==void 0&&(s=e),s.format="RGBA",s.height=d,s.width=f,e!==void 0){let h=u();h.width=f,h.height=d;let g=l(h);if(g!=null)g.putImageData(r,0,0),a=g.getImageData(0,0,f,d).data;else throw new Error("Can not access image data")}else a=r.data}else if(o){if(e===void 0)throw new Error("Please provide image config with format for Imagebitmap");let d=u();d.width=r.width,d.height=r.height;let f=l(d);if(f!=null){let h=r.height,g=r.width;return f.drawImage(r,0,0,g,h),a=f.getImageData(0,0,g,h).data,s.height=h,s.width=g,Cs(a,s)}else throw new Error("Can not access image data")}else{if(i)return new Promise((d,f)=>{let h=u(),g=l(h);if(!r||!g)return f();let b=new Image;b.crossOrigin="Anonymous",b.src=r,b.onload=()=>{h.width=b.width,h.height=b.height,g.drawImage(b,0,0,h.width,h.height);let _=g.getImageData(0,0,h.width,h.height);s.height=h.height,s.width=h.width,d(Cs(_.data,s))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return Cs(a,s);throw new Error("Input data provided is not supported - aborted tensor creation")},hp=(r,e)=>{let{width:n,height:t,download:o,dispose:i}=e,a=[1,t,n,4];return new dt({location:"texture",type:"float32",texture:r,dims:a,download:o,dispose:i})},mp=(r,e)=>{let{dataType:n,dims:t,download:o,dispose:i}=e;return new dt({location:"gpu-buffer",type:n??"float32",gpuBuffer:r,dims:t,download:o,dispose:i})},gp=(r,e)=>{let{dataType:n,dims:t,download:o,dispose:i}=e;return new dt({location:"ml-tensor",type:n??"float32",mlTensor:r,dims:t,download:o,dispose:i})},bp=(r,e,n)=>new dt({location:"cpu-pinned",type:r,data:e,dims:n??[e.length]})});var Or,vo,_p,vp,wp=k(()=>{"use strict";Or=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),vo=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),_p=!1,vp=()=>{if(!_p){_p=!0;let r=typeof BigInt64Array<"u"&&BigInt64Array.from,e=typeof BigUint64Array<"u"&&BigUint64Array.from,n=globalThis.Float16Array,t=typeof n<"u"&&n.from;r&&(Or.set("int64",BigInt64Array),vo.set(BigInt64Array,"int64")),e&&(Or.set("uint64",BigUint64Array),vo.set(BigUint64Array,"uint64")),t?(Or.set("float16",n),vo.set(n,"float16")):Or.set("float16",Uint16Array)}}});var xp,Tp,Ip=k(()=>{"use strict";ui();xp=r=>{let e=1;for(let n=0;n<r.length;n++){let t=r[n];if(typeof t!="number"||!Number.isSafeInteger(t))throw new TypeError(`dims[${n}] must be an integer, got: ${t}`);if(t<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${t}`);e*=t}return e},Tp=(r,e)=>{switch(r.location){case"cpu":return new dt(r.type,r.data,e);case"cpu-pinned":return new dt({location:"cpu-pinned",data:r.data,type:r.type,dims:e});case"texture":return new dt({location:"texture",texture:r.texture,type:r.type,dims:e});case"gpu-buffer":return new dt({location:"gpu-buffer",gpuBuffer:r.gpuBuffer,type:r.type,dims:e});case"ml-tensor":return new dt({location:"ml-tensor",mlTensor:r.mlTensor,type:r.type,dims:e});default:throw new Error(`tensorReshape: tensor location ${r.location} is not supported`)}}});var dt,ui=k(()=>{"use strict";pp();yp();wp();Ip();dt=class{constructor(e,n,t){vp();let o,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,o=e.type,i=e.dims,e.location){case"cpu-pinned":{let s=Or.get(o);if(!s)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(o=e,u=t,e==="string"){if(!Array.isArray(n))throw new TypeError("A string tensor's data must be a string array.");s=n}else{let l=Or.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(n)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?s=l.from(n,BigInt):s=l.from(n)}else if(n instanceof l)s=n;else if(n instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(n);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&n instanceof Uint16Array&&l!==Uint16Array)s=new globalThis.Float16Array(n.buffer,n.byteOffset,n.length);else throw new TypeError(`A ${o} tensor's data must be type of ${l}`)}else if(u=n,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")o="string",s=e;else if(l==="boolean")o="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)o="uint8",s=Uint8Array.from(e);else{let l=vo.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);o=l,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");i=u,this.cpuData=s,this.dataLocation="cpu"}let a=xp(i);if(this.cpuData&&a!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=a}static async fromImage(e,n){return fp(e,n)}static fromTexture(e,n){return hp(e,n)}static fromGpuBuffer(e,n){return mp(e,n)}static fromMLTensor(e,n){return gp(e,n)}static fromPinnedBuffer(e,n,t){return bp(e,n,t)}toDataURL(e){return cp(this,e)}toImageData(e){return dp(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let n=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=n,e&&this.disposer&&(this.disposer(),this.disposer=void 0),n}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Tp(this,e)}}});var St,Ds=k(()=>{"use strict";ui();St=dt});var li,Sp,$t,yt,ur,lr,ks=k(()=>{"use strict";Es();li=(r,e)=>{(typeof ot.trace>"u"?!ot.wasm.trace:!ot.trace)||console.timeStamp(`${r}::ORT::${e}`)},Sp=(r,e)=>{let n=new Error().stack?.split(/\r\n|\r|\n/g)||[],t=!1;for(let o=0;o<n.length;o++){if(t&&!n[o].includes("TRACE_FUNC")){let i=`FUNC_${r}::${n[o].trim().split(" ")[1]}`;e&&(i+=`::${e}`),li("CPU",i);return}n[o].includes("TRACE_FUNC")&&(t=!0)}},$t=r=>{(typeof ot.trace>"u"?!ot.wasm.trace:!ot.trace)||Sp("BEGIN",r)},yt=r=>{(typeof ot.trace>"u"?!ot.wasm.trace:!ot.trace)||Sp("END",r)},ur=r=>{(typeof ot.trace>"u"?!ot.wasm.trace:!ot.trace)||console.time(`ORT::${r}`)},lr=r=>{(typeof ot.trace>"u"?!ot.wasm.trace:!ot.trace)||console.timeEnd(`ORT::${r}`)}});var ci,$p=k(()=>{"use strict";Ps();Ds();ks();ci=class r{constructor(e){this.handler=e}async run(e,n,t){$t(),ur("InferenceSession.run");let o={},i={};if(typeof e!="object"||e===null||e instanceof St||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof St)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let l of n){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);o[l]=null}if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,d=Object.getOwnPropertyNames(n);for(let f of this.outputNames)if(d.indexOf(f)!==-1){let h=n[f];(h===null||h instanceof St)&&(l=!0,a=!1,o[f]=h)}if(l){if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else i=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof e[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(a)for(let l of this.outputNames)o[l]=null;let s=await this.handler.run(e,o,i),u={};for(let l in s)if(Object.hasOwnProperty.call(s,l)){let d=s[l];d instanceof St?u[l]=d:u[l]=new St(d.type,d.data,d.dims)}return lr("InferenceSession.run"),yt(),u}async release(){return this.handler.dispose()}static async create(e,n,t,o){$t(),ur("InferenceSession.create");let i,a={};if(typeof e=="string"){if(i=e,typeof n=="object"&&n!==null)a=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof Uint8Array){if(i=e,typeof n=="object"&&n!==null)a=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer){let d=e,f=0,h=e.byteLength;if(typeof n=="object"&&n!==null)a=n;else if(typeof n=="number"){if(f=n,!Number.isSafeInteger(f))throw new RangeError("'byteOffset' must be an integer.");if(f<0||f>=d.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${d.byteLength}).`);if(h=e.byteLength-f,typeof t=="number"){if(h=t,!Number.isSafeInteger(h))throw new RangeError("'byteLength' must be an integer.");if(h<=0||f+h>d.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${d.byteLength-f}].`);if(typeof o=="object"&&o!==null)a=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof t<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(d,f,h)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[s,u]=await op(a),l=await s.createInferenceSessionHandler(i,u);return lr("InferenceSession.create"),yt(),new r(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}});var LT,Ap=k(()=>{"use strict";$p();LT=ci});var Op=k(()=>{"use strict"});var Pp=k(()=>{"use strict"});var Ep=k(()=>{"use strict"});var Cp=k(()=>{"use strict"});var Ns={};$r(Ns,{InferenceSession:()=>LT,TRACE:()=>li,TRACE_EVENT_BEGIN:()=>ur,TRACE_EVENT_END:()=>lr,TRACE_FUNC_BEGIN:()=>$t,TRACE_FUNC_END:()=>yt,Tensor:()=>St,env:()=>me,registerBackend:()=>sr});var pt=k(()=>{"use strict";ip();lp();Ap();Ds();Op();Pp();ks();Ep();Cp()});function cr(r,e,n,t){if(e===void 0)return zT(r);if(n===void 0)di(r,e,1);else if(typeof n=="number"&&t===void 0)di(r,e,n);else if(typeof n=="string"&&t===void 0)di(r,n,1,e);else if(typeof n=="string"&&typeof t=="number")di(r,n,t,e);else throw new TypeError("input is valid")}function zT(r){return{verbose:cr.verbose.bind(null,r),info:cr.info.bind(null,r),warning:cr.warning.bind(null,r),error:cr.error.bind(null,r),fatal:cr.fatal.bind(null,r)}}function di(r,e,n,t){let o=wo[t||""]||wo[""];kp[r]<kp[o.minimalSeverity]||(o.logDateTime&&(e=`${new Date().toISOString()}|${e}`),o.logSourceLocation,RT[o.provider].log(r,e,t))}var Ls,Rs,kp,RT,Np,wo,Fe,fi,hi,mi,pi,Ct=k(()=>{"use strict";Ls=class{log(e,n,t){}},Rs=class{log(e,n,t){console.log(`${this.color(e)} ${t?"\x1B[35m"+t+"\x1B[0m ":""}${n}`)}color(e){switch(e){case"verbose":return"\x1B[34;40mv\x1B[0m";case"info":return"\x1B[32mi\x1B[0m";case"warning":return"\x1B[30;43mw\x1B[0m";case"error":return"\x1B[31;40me\x1B[0m";case"fatal":return"\x1B[101mf\x1B[0m";default:throw new Error(`unsupported severity: ${e}`)}}},kp={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},RT={none:new Ls,console:new Rs},Np={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1},wo={"":Np};(u=>{function r(l,d){u("verbose",l,d)}u.verbose=r;function e(l,d){u("info",l,d)}u.info=e;function n(l,d){u("warning",l,d)}u.warning=n;function t(l,d){u("error",l,d)}u.error=t;function o(l,d){u("fatal",l,d)}u.fatal=o;function i(l){wo={},a("",l||{})}u.reset=i;function a(l,d){if(l==="*")i(d);else{let f=wo[l]||Np;wo[l]={provider:d.provider||f.provider,minimalSeverity:d.minimalSeverity||f.minimalSeverity,logDateTime:d.logDateTime===void 0?f.logDateTime:d.logDateTime,logSourceLocation:d.logSourceLocation===void 0?f.logSourceLocation:d.logSourceLocation}}}u.set=a;function s(l){let d={};l.logLevel&&(d.minimalSeverity=l.logLevel),a("",d)}u.setWithEnv=s})(cr||={});Fe=cr,fi=class{constructor(e,n,t,o,i,a){this.category=e;this.name=n;this.startTime=t;this.endCallback=o;this.timer=i;this.ctx=a}async end(){return this.endCallback(this)}async checkTimer(){if(this.ctx===void 0||this.timer===void 0)throw new Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},hi=class{constructor(e,n,t,o){this.category=e;this.name=n;this.startTime=t;this.endTime=o}},mi=class{constructor(e,n,t){this._started=!1;this._flushPointer=0;this._started=!1,this._maxNumberEvents=e===void 0?1e4:e,this._flushBatchSize=n===void 0?10:n,this._flushIntervalInMilliseconds=t===void 0?5e3:t}static create(e){return e===void 0?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=pi(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,n,t,o){let i=this._started?this.begin(e,n,o):void 0,a=!1,s=t();if(s&&typeof s.then=="function")return a=!0,new Promise((u,l)=>{s.then(async d=>{i&&await i.end(),u(d)},async d=>{i&&await i.end(),l(d)})});if(!a&&i){let u=i.end();if(u&&typeof u.then=="function")return new Promise((l,d)=>{u.then(()=>{l(s)},f=>{d(f)})})}return s}begin(e,n,t){if(!this._started)throw new Error("profiler is not started yet");if(t===void 0){let o=pi();return this.flush(o),new fi(e,n,o,i=>this.endSync(i))}else{let o=t.beginTimer();return new fi(e,n,0,async i=>this.end(i),o,t)}}async end(e){let n=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new hi(e.category,e.name,e.startTime,n)),this.flush(n))}endSync(e){let n=pi();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new hi(e.category,e.name,e.startTime,n)),this.flush(n))}logOneEvent(e){Fe.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let n=this._flushPointer;this._flushPointer<n+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=pi()}}get started(){return this._started}},pi=typeof performance<"u"&&performance.now?()=>performance.now():Date.now});function Lp(r,e,n){for(let t of n){let o=t[0],i=t[1],a=t[2],s=t[3],u=t[4];if(r.opType===o){for(let l of e)if((l.domain===i||l.domain==="ai.onnx"&&i==="")&&MT(l.version,a))return{opImpl:s,opInit:u}}}throw new TypeError(`cannot resolve operator '${r.opType}' with opsets: ${e.map(t=>`${t.domain||"ai.onnx"} v${t.version}`).join(", ")}`)}function MT(r,e){if(e.endsWith("+")){let n=Number.parseInt(e.substring(0,e.length-1),10);return!isNaN(n)&&n<=r}else if(e.split("-").length===2){let n=e.split("-"),t=Number.parseInt(n[0],10),o=Number.parseInt(n[1],10);return!isNaN(t)&&!isNaN(o)&&t<=r&&r<=o}else return Number.parseInt(e,10)===r}var Rp=k(()=>{"use strict"});var zp=oe(zs=>{"use strict";zs.__esModule=!0;var BT=function(){function r(e){if(!e)throw new TypeError("Invalid argument; `value` has no value.");this.value=r.EMPTY,e&&r.isGuid(e)&&(this.value=e)}return r.isGuid=function(e){var n=e.toString();return e&&(e instanceof r||r.validator.test(n))},r.create=function(){return new r([r.gen(2),r.gen(1),r.gen(1),r.gen(1),r.gen(3)].join("-"))},r.createEmpty=function(){return new r("emptyguid")},r.parse=function(e){return new r(e)},r.raw=function(){return[r.gen(2),r.gen(1),r.gen(1),r.gen(1),r.gen(3)].join("-")},r.gen=function(e){for(var n="",t=0;t<e;t++)n+=((1+Math.random())*65536|0).toString(16).substring(1);return n},r.prototype.equals=function(e){return r.isGuid(e)&&this.value===e.toString()},r.prototype.isEmpty=function(){return this.value===r.EMPTY},r.prototype.toString=function(){return this.value},r.prototype.toJSON=function(){return{value:this.value}},r.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),r.EMPTY="00000000-0000-0000-0000-000000000000",r}();zs.Guid=BT});function Ge(r,e,n){this.low=r|0,this.high=e|0,this.unsigned=!!n}function ht(r){return(r&&r.__isLong__)===!0}function Mp(r){var e=Math.clz32(r&-r);return r?31-e:e}function Pr(r,e){var n,t,o;return e?(r>>>=0,(o=0<=r&&r<256)&&(t=Fp[r],t)?t:(n=Re(r,0,!0),o&&(Fp[r]=n),n)):(r|=0,(o=-128<=r&&r<128)&&(t=Bp[r],t)?t:(n=Re(r,r<0?-1:0,!1),o&&(Bp[r]=n),n))}function kt(r,e){if(isNaN(r))return e?Zn:Gt;if(e){if(r<0)return Zn;if(r>=Wp)return qp}else{if(r<=-Gp)return _t;if(r+1>=Gp)return jp}return r<0?kt(-r,e).neg():Re(r%Qr|0,r/Qr|0,e)}function Re(r,e,n){return new Ge(r,e,n)}function Bs(r,e,n){if(r.length===0)throw Error("empty string");if(typeof e=="number"?(n=e,e=!1):e=!!e,r==="NaN"||r==="Infinity"||r==="+Infinity"||r==="-Infinity")return e?Zn:Gt;if(n=n||10,n<2||36<n)throw RangeError("radix");var t;if((t=r.indexOf("-"))>0)throw Error("interior hyphen");if(t===0)return Bs(r.substring(1),e,n).neg();for(var o=kt(gi(n,8)),i=Gt,a=0;a<r.length;a+=8){var s=Math.min(8,r.length-a),u=parseInt(r.substring(a,a+s),n);if(s<8){var l=kt(gi(n,s));i=i.mul(l).add(kt(u))}else i=i.mul(o),i=i.add(kt(u))}return i.unsigned=e,i}function Ut(r,e){return typeof r=="number"?kt(r,e):typeof r=="string"?Bs(r,e):Re(r.low,r.high,typeof e=="boolean"?e:r.unsigned)}var Dt,Bp,Fp,gi,Vp,FT,Qr,Wp,Gp,Up,Gt,Zn,Yr,Hp,Ms,jp,qp,_t,j,dr,Fs=k(()=>{Dt=null;try{Dt=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}Ge.prototype.__isLong__;Object.defineProperty(Ge.prototype,"__isLong__",{value:!0});Ge.isLong=ht;Bp={},Fp={};Ge.fromInt=Pr;Ge.fromNumber=kt;Ge.fromBits=Re;gi=Math.pow;Ge.fromString=Bs;Ge.fromValue=Ut;Vp=65536,FT=1<<24,Qr=Vp*Vp,Wp=Qr*Qr,Gp=Wp/2,Up=Pr(FT),Gt=Pr(0);Ge.ZERO=Gt;Zn=Pr(0,!0);Ge.UZERO=Zn;Yr=Pr(1);Ge.ONE=Yr;Hp=Pr(1,!0);Ge.UONE=Hp;Ms=Pr(-1);Ge.NEG_ONE=Ms;jp=Re(-1,2147483647,!1);Ge.MAX_VALUE=jp;qp=Re(-1,-1,!0);Ge.MAX_UNSIGNED_VALUE=qp;_t=Re(0,-2147483648,!1);Ge.MIN_VALUE=_t;j=Ge.prototype;j.toInt=function(){return this.unsigned?this.low>>>0:this.low};j.toNumber=function(){return this.unsigned?(this.high>>>0)*Qr+(this.low>>>0):this.high*Qr+(this.low>>>0)};j.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(_t)){var n=kt(e),t=this.div(n),o=t.mul(n).sub(this);return t.toString(e)+o.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var i=kt(gi(e,6),this.unsigned),a=this,s="";;){var u=a.div(i),l=a.sub(u.mul(i)).toInt()>>>0,d=l.toString(e);if(a=u,a.isZero())return d+s;for(;d.length<6;)d="0"+d;s=""+d+s}};j.getHighBits=function(){return this.high};j.getHighBitsUnsigned=function(){return this.high>>>0};j.getLowBits=function(){return this.low};j.getLowBitsUnsigned=function(){return this.low>>>0};j.getNumBitsAbs=function(){if(this.isNegative())return this.eq(_t)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,n=31;n>0&&(e&1<<n)==0;n--);return this.high!=0?n+33:n+1};j.isZero=function(){return this.high===0&&this.low===0};j.eqz=j.isZero;j.isNegative=function(){return!this.unsigned&&this.high<0};j.isPositive=function(){return this.unsigned||this.high>=0};j.isOdd=function(){return(this.low&1)===1};j.isEven=function(){return(this.low&1)===0};j.equals=function(e){return ht(e)||(e=Ut(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low};j.eq=j.equals;j.notEquals=function(e){return!this.eq(e)};j.neq=j.notEquals;j.ne=j.notEquals;j.lessThan=function(e){return this.comp(e)<0};j.lt=j.lessThan;j.lessThanOrEqual=function(e){return this.comp(e)<=0};j.lte=j.lessThanOrEqual;j.le=j.lessThanOrEqual;j.greaterThan=function(e){return this.comp(e)>0};j.gt=j.greaterThan;j.greaterThanOrEqual=function(e){return this.comp(e)>=0};j.gte=j.greaterThanOrEqual;j.ge=j.greaterThanOrEqual;j.compare=function(e){if(ht(e)||(e=Ut(e)),this.eq(e))return 0;var n=this.isNegative(),t=e.isNegative();return n&&!t?-1:!n&&t?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1};j.comp=j.compare;j.negate=function(){return!this.unsigned&&this.eq(_t)?_t:this.not().add(Yr)};j.neg=j.negate;j.add=function(e){ht(e)||(e=Ut(e));var n=this.high>>>16,t=this.high&65535,o=this.low>>>16,i=this.low&65535,a=e.high>>>16,s=e.high&65535,u=e.low>>>16,l=e.low&65535,d=0,f=0,h=0,g=0;return g+=i+l,h+=g>>>16,g&=65535,h+=o+u,f+=h>>>16,h&=65535,f+=t+s,d+=f>>>16,f&=65535,d+=n+a,d&=65535,Re(h<<16|g,d<<16|f,this.unsigned)};j.subtract=function(e){return ht(e)||(e=Ut(e)),this.add(e.neg())};j.sub=j.subtract;j.multiply=function(e){if(this.isZero())return this;if(ht(e)||(e=Ut(e)),Dt){var n=Dt.mul(this.low,this.high,e.low,e.high);return Re(n,Dt.get_high(),this.unsigned)}if(e.isZero())return this.unsigned?Zn:Gt;if(this.eq(_t))return e.isOdd()?_t:Gt;if(e.eq(_t))return this.isOdd()?_t:Gt;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(Up)&&e.lt(Up))return kt(this.toNumber()*e.toNumber(),this.unsigned);var t=this.high>>>16,o=this.high&65535,i=this.low>>>16,a=this.low&65535,s=e.high>>>16,u=e.high&65535,l=e.low>>>16,d=e.low&65535,f=0,h=0,g=0,b=0;return b+=a*d,g+=b>>>16,b&=65535,g+=i*d,h+=g>>>16,g&=65535,g+=a*l,h+=g>>>16,g&=65535,h+=o*d,f+=h>>>16,h&=65535,h+=i*l,f+=h>>>16,h&=65535,h+=a*u,f+=h>>>16,h&=65535,f+=t*d+o*l+i*u+a*s,f&=65535,Re(g<<16|b,f<<16|h,this.unsigned)};j.mul=j.multiply;j.divide=function(e){if(ht(e)||(e=Ut(e)),e.isZero())throw Error("division by zero");if(Dt){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var n=(this.unsigned?Dt.div_u:Dt.div_s)(this.low,this.high,e.low,e.high);return Re(n,Dt.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?Zn:Gt;var t,o,i;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return Zn;if(e.gt(this.shru(1)))return Hp;i=Zn}else{if(this.eq(_t)){if(e.eq(Yr)||e.eq(Ms))return _t;if(e.eq(_t))return Yr;var a=this.shr(1);return t=a.div(e).shl(1),t.eq(Gt)?e.isNegative()?Yr:Ms:(o=this.sub(e.mul(t)),i=t.add(o.div(e)),i)}else if(e.eq(_t))return this.unsigned?Zn:Gt;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();i=Gt}for(o=this;o.gte(e);){t=Math.max(1,Math.floor(o.toNumber()/e.toNumber()));for(var s=Math.ceil(Math.log(t)/Math.LN2),u=s<=48?1:gi(2,s-48),l=kt(t),d=l.mul(e);d.isNegative()||d.gt(o);)t-=u,l=kt(t,this.unsigned),d=l.mul(e);l.isZero()&&(l=Yr),i=i.add(l),o=o.sub(d)}return i};j.div=j.divide;j.modulo=function(e){if(ht(e)||(e=Ut(e)),Dt){var n=(this.unsigned?Dt.rem_u:Dt.rem_s)(this.low,this.high,e.low,e.high);return Re(n,Dt.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))};j.mod=j.modulo;j.rem=j.modulo;j.not=function(){return Re(~this.low,~this.high,this.unsigned)};j.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32};j.clz=j.countLeadingZeros;j.countTrailingZeros=function(){return this.low?Mp(this.low):Mp(this.high)+32};j.ctz=j.countTrailingZeros;j.and=function(e){return ht(e)||(e=Ut(e)),Re(this.low&e.low,this.high&e.high,this.unsigned)};j.or=function(e){return ht(e)||(e=Ut(e)),Re(this.low|e.low,this.high|e.high,this.unsigned)};j.xor=function(e){return ht(e)||(e=Ut(e)),Re(this.low^e.low,this.high^e.high,this.unsigned)};j.shiftLeft=function(e){return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Re(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):Re(0,this.low<<e-32,this.unsigned)};j.shl=j.shiftLeft;j.shiftRight=function(e){return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Re(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):Re(this.high>>e-32,this.high>=0?0:-1,this.unsigned)};j.shr=j.shiftRight;j.shiftRightUnsigned=function(e){return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Re(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):e===32?Re(this.high,0,this.unsigned):Re(this.high>>>e-32,0,this.unsigned)};j.shru=j.shiftRightUnsigned;j.shr_u=j.shiftRightUnsigned;j.rotateLeft=function(e){var n;return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Re(this.high,this.low,this.unsigned):e<32?(n=32-e,Re(this.low<<e|this.high>>>n,this.high<<e|this.low>>>n,this.unsigned)):(e-=32,n=32-e,Re(this.high<<e|this.low>>>n,this.low<<e|this.high>>>n,this.unsigned))};j.rotl=j.rotateLeft;j.rotateRight=function(e){var n;return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Re(this.high,this.low,this.unsigned):e<32?(n=32-e,Re(this.high<<n|this.low>>>e,this.low<<n|this.high>>>e,this.unsigned)):(e-=32,n=32-e,Re(this.low<<n|this.high>>>e,this.high<<n|this.low>>>e,this.unsigned))};j.rotr=j.rotateRight;j.toSigned=function(){return this.unsigned?Re(this.low,this.high,!1):this};j.toUnsigned=function(){return this.unsigned?this:Re(this.low,this.high,!0)};j.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()};j.toBytesLE=function(){var e=this.high,n=this.low;return[n&255,n>>>8&255,n>>>16&255,n>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]};j.toBytesBE=function(){var e=this.high,n=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,n>>>24,n>>>16&255,n>>>8&255,n&255]};Ge.fromBytes=function(e,n,t){return t?Ge.fromBytesLE(e,n):Ge.fromBytesBE(e,n)};Ge.fromBytesLE=function(e,n){return new Ge(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,n)};Ge.fromBytesBE=function(e,n){return new Ge(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],n)};dr=Ge});var Vs=oe(bi=>{"use strict";Object.defineProperty(bi,"__esModule",{value:!0});bi.ArgType=void 0;var Kp;(function(r){r[r.INPUT=0]="INPUT",r[r.OUTPUT=1]="OUTPUT"})(Kp||(bi.ArgType=Kp={}))});var Er=oe(en=>{"use strict";Object.defineProperty(en,"__esModule",{value:!0});en.SIZE_PREFIX_LENGTH=en.FILE_IDENTIFIER_LENGTH=en.SIZEOF_INT=en.SIZEOF_SHORT=void 0;en.SIZEOF_SHORT=2;en.SIZEOF_INT=4;en.FILE_IDENTIFIER_LENGTH=4;en.SIZE_PREFIX_LENGTH=4});var Gs=oe(Nt=>{"use strict";Object.defineProperty(Nt,"__esModule",{value:!0});Nt.isLittleEndian=Nt.float64=Nt.float32=Nt.int32=void 0;Nt.int32=new Int32Array(2);Nt.float32=new Float32Array(Nt.int32.buffer);Nt.float64=new Float64Array(Nt.int32.buffer);Nt.isLittleEndian=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1});var Us=oe(yi=>{"use strict";Object.defineProperty(yi,"__esModule",{value:!0});yi.Encoding=void 0;var Xp;(function(r){r[r.UTF8_BYTES=1]="UTF8_BYTES",r[r.UTF16_STRING=2]="UTF16_STRING"})(Xp||(yi.Encoding=Xp={}))});var Hs=oe(_i=>{"use strict";Object.defineProperty(_i,"__esModule",{value:!0});_i.ByteBuffer=void 0;var tn=Er(),vt=Gs(),VT=Us(),Ws=class r{constructor(e){this.bytes_=e,this.position_=0,this.text_decoder_=new TextDecoder}static allocate(e){return new r(new Uint8Array(e))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(e){this.position_=e}capacity(){return this.bytes_.length}readInt8(e){return this.readUint8(e)<<24>>24}readUint8(e){return this.bytes_[e]}readInt16(e){return this.readUint16(e)<<16>>16}readUint16(e){return this.bytes_[e]|this.bytes_[e+1]<<8}readInt32(e){return this.bytes_[e]|this.bytes_[e+1]<<8|this.bytes_[e+2]<<16|this.bytes_[e+3]<<24}readUint32(e){return this.readInt32(e)>>>0}readInt64(e){return BigInt.asIntN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readUint64(e){return BigInt.asUintN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readFloat32(e){return vt.int32[0]=this.readInt32(e),vt.float32[0]}readFloat64(e){return vt.int32[vt.isLittleEndian?0:1]=this.readInt32(e),vt.int32[vt.isLittleEndian?1:0]=this.readInt32(e+4),vt.float64[0]}writeInt8(e,n){this.bytes_[e]=n}writeUint8(e,n){this.bytes_[e]=n}writeInt16(e,n){this.bytes_[e]=n,this.bytes_[e+1]=n>>8}writeUint16(e,n){this.bytes_[e]=n,this.bytes_[e+1]=n>>8}writeInt32(e,n){this.bytes_[e]=n,this.bytes_[e+1]=n>>8,this.bytes_[e+2]=n>>16,this.bytes_[e+3]=n>>24}writeUint32(e,n){this.bytes_[e]=n,this.bytes_[e+1]=n>>8,this.bytes_[e+2]=n>>16,this.bytes_[e+3]=n>>24}writeInt64(e,n){this.writeInt32(e,Number(BigInt.asIntN(32,n))),this.writeInt32(e+4,Number(BigInt.asIntN(32,n>>BigInt(32))))}writeUint64(e,n){this.writeUint32(e,Number(BigInt.asUintN(32,n))),this.writeUint32(e+4,Number(BigInt.asUintN(32,n>>BigInt(32))))}writeFloat32(e,n){vt.float32[0]=n,this.writeInt32(e,vt.int32[0])}writeFloat64(e,n){vt.float64[0]=n,this.writeInt32(e,vt.int32[vt.isLittleEndian?0:1]),this.writeInt32(e+4,vt.int32[vt.isLittleEndian?1:0])}getBufferIdentifier(){if(this.bytes_.length<this.position_+tn.SIZEOF_INT+tn.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let e="";for(let n=0;n<tn.FILE_IDENTIFIER_LENGTH;n++)e+=String.fromCharCode(this.readInt8(this.position_+tn.SIZEOF_INT+n));return e}__offset(e,n){let t=e-this.readInt32(e);return n<this.readInt16(t)?this.readInt16(t+n):0}__union(e,n){return e.bb_pos=n+this.readInt32(n),e.bb=this,e}__string(e,n){e+=this.readInt32(e);let t=this.readInt32(e);e+=tn.SIZEOF_INT;let o=this.bytes_.subarray(e,e+t);return n===VT.Encoding.UTF8_BYTES?o:this.text_decoder_.decode(o)}__union_with_string(e,n){return typeof e=="string"?this.__string(n):this.__union(e,n)}__indirect(e){return e+this.readInt32(e)}__vector(e){return e+this.readInt32(e)+tn.SIZEOF_INT}__vector_len(e){return this.readInt32(e+this.readInt32(e))}__has_identifier(e){if(e.length!=tn.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+tn.FILE_IDENTIFIER_LENGTH);for(let n=0;n<tn.FILE_IDENTIFIER_LENGTH;n++)if(e.charCodeAt(n)!=this.readInt8(this.position()+tn.SIZEOF_INT+n))return!1;return!0}createScalarList(e,n){let t=[];for(let o=0;o<n;++o){let i=e(o);i!==null&&t.push(i)}return t}createObjList(e,n){let t=[];for(let o=0;o<n;++o){let i=e(o);i!==null&&t.push(i.unpack())}return t}};_i.ByteBuffer=Ws});var Jp=oe(vi=>{"use strict";Object.defineProperty(vi,"__esModule",{value:!0});vi.Builder=void 0;var Zp=Hs(),At=Er(),js=class r{constructor(e){this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null,this.text_encoder=new TextEncoder;let n;e?n=e:n=1024,this.bb=Zp.ByteBuffer.allocate(n),this.space=n}clear(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null}forceDefaults(e){this.force_defaults=e}dataBuffer(){return this.bb}asUint8Array(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())}prep(e,n){e>this.minalign&&(this.minalign=e);let t=~(this.bb.capacity()-this.space+n)+1&e-1;for(;this.space<t+e+n;){let o=this.bb.capacity();this.bb=r.growByteBuffer(this.bb),this.space+=this.bb.capacity()-o}this.pad(t)}pad(e){for(let n=0;n<e;n++)this.bb.writeInt8(--this.space,0)}writeInt8(e){this.bb.writeInt8(this.space-=1,e)}writeInt16(e){this.bb.writeInt16(this.space-=2,e)}writeInt32(e){this.bb.writeInt32(this.space-=4,e)}writeInt64(e){this.bb.writeInt64(this.space-=8,e)}writeFloat32(e){this.bb.writeFloat32(this.space-=4,e)}writeFloat64(e){this.bb.writeFloat64(this.space-=8,e)}addInt8(e){this.prep(1,0),this.writeInt8(e)}addInt16(e){this.prep(2,0),this.writeInt16(e)}addInt32(e){this.prep(4,0),this.writeInt32(e)}addInt64(e){this.prep(8,0),this.writeInt64(e)}addFloat32(e){this.prep(4,0),this.writeFloat32(e)}addFloat64(e){this.prep(8,0),this.writeFloat64(e)}addFieldInt8(e,n,t){(this.force_defaults||n!=t)&&(this.addInt8(n),this.slot(e))}addFieldInt16(e,n,t){(this.force_defaults||n!=t)&&(this.addInt16(n),this.slot(e))}addFieldInt32(e,n,t){(this.force_defaults||n!=t)&&(this.addInt32(n),this.slot(e))}addFieldInt64(e,n,t){(this.force_defaults||n!==t)&&(this.addInt64(n),this.slot(e))}addFieldFloat32(e,n,t){(this.force_defaults||n!=t)&&(this.addFloat32(n),this.slot(e))}addFieldFloat64(e,n,t){(this.force_defaults||n!=t)&&(this.addFloat64(n),this.slot(e))}addFieldOffset(e,n,t){(this.force_defaults||n!=t)&&(this.addOffset(n),this.slot(e))}addFieldStruct(e,n,t){n!=t&&(this.nested(n),this.slot(e))}nested(e){if(e!=this.offset())throw new TypeError("FlatBuffers: struct must be serialized inline.")}notNested(){if(this.isNested)throw new TypeError("FlatBuffers: object serialization must not be nested.")}slot(e){this.vtable!==null&&(this.vtable[e]=this.offset())}offset(){return this.bb.capacity()-this.space}static growByteBuffer(e){let n=e.capacity();if(n&3221225472)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");let t=n<<1,o=Zp.ByteBuffer.allocate(t);return o.setPosition(t-n),o.bytes().set(e.bytes(),t-n),o}addOffset(e){this.prep(At.SIZEOF_INT,0),this.writeInt32(this.offset()-e+At.SIZEOF_INT)}startObject(e){this.notNested(),this.vtable==null&&(this.vtable=[]),this.vtable_in_use=e;for(let n=0;n<e;n++)this.vtable[n]=0;this.isNested=!0,this.object_start=this.offset()}endObject(){if(this.vtable==null||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);let e=this.offset(),n=this.vtable_in_use-1;for(;n>=0&&this.vtable[n]==0;n--);let t=n+1;for(;n>=0;n--)this.addInt16(this.vtable[n]!=0?e-this.vtable[n]:0);let o=2;this.addInt16(e-this.object_start);let i=(t+o)*At.SIZEOF_SHORT;this.addInt16(i);let a=0,s=this.space;e:for(n=0;n<this.vtables.length;n++){let u=this.bb.capacity()-this.vtables[n];if(i==this.bb.readInt16(u)){for(let l=At.SIZEOF_SHORT;l<i;l+=At.SIZEOF_SHORT)if(this.bb.readInt16(s+l)!=this.bb.readInt16(u+l))continue e;a=this.vtables[n];break}}return a?(this.space=this.bb.capacity()-e,this.bb.writeInt32(this.space,a-e)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-e,this.offset()-e)),this.isNested=!1,e}finish(e,n,t){let o=t?At.SIZE_PREFIX_LENGTH:0;if(n){let i=n;if(this.prep(this.minalign,At.SIZEOF_INT+At.FILE_IDENTIFIER_LENGTH+o),i.length!=At.FILE_IDENTIFIER_LENGTH)throw new TypeError("FlatBuffers: file identifier must be length "+At.FILE_IDENTIFIER_LENGTH);for(let a=At.FILE_IDENTIFIER_LENGTH-1;a>=0;a--)this.writeInt8(i.charCodeAt(a))}this.prep(this.minalign,At.SIZEOF_INT+o),this.addOffset(e),o&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)}finishSizePrefixed(e,n){this.finish(e,n,!0)}requiredField(e,n){let t=this.bb.capacity()-e,o=t-this.bb.readInt32(t);if(!(n<this.bb.readInt16(o)&&this.bb.readInt16(o+n)!=0))throw new TypeError("FlatBuffers: field "+n+" must be set")}startVector(e,n,t){this.notNested(),this.vector_num_elems=n,this.prep(At.SIZEOF_INT,e*n),this.prep(t,e*n)}endVector(){return this.writeInt32(this.vector_num_elems),this.offset()}createSharedString(e){if(!e)return 0;if(this.string_maps||(this.string_maps=new Map),this.string_maps.has(e))return this.string_maps.get(e);let n=this.createString(e);return this.string_maps.set(e,n),n}createString(e){if(e==null)return 0;let n;return e instanceof Uint8Array?n=e:n=this.text_encoder.encode(e),this.addInt8(0),this.startVector(1,n.length,1),this.bb.setPosition(this.space-=n.length),this.bb.bytes().set(n,this.space),this.endVector()}createByteVector(e){return e==null?0:(this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length),this.bb.bytes().set(e,this.space),this.endVector())}createObjectOffset(e){return e===null?0:typeof e=="string"?this.createString(e):e.pack(this)}createObjectOffsetList(e){let n=[];for(let t=0;t<e.length;++t){let o=e[t];if(o!==null)n.push(this.createObjectOffset(o));else throw new TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.")}return n}createStructOffsetList(e,n){return n(this,e.length),this.createObjectOffsetList(e.slice().reverse()),this.endVector()}};vi.Builder=js});var ze=oe(qe=>{"use strict";Object.defineProperty(qe,"__esModule",{value:!0});qe.ByteBuffer=qe.Builder=qe.Encoding=qe.isLittleEndian=qe.float64=qe.float32=qe.int32=qe.SIZE_PREFIX_LENGTH=qe.FILE_IDENTIFIER_LENGTH=qe.SIZEOF_INT=qe.SIZEOF_SHORT=void 0;var GT=Er();Object.defineProperty(qe,"SIZEOF_SHORT",{enumerable:!0,get:function(){return GT.SIZEOF_SHORT}});var UT=Er();Object.defineProperty(qe,"SIZEOF_INT",{enumerable:!0,get:function(){return UT.SIZEOF_INT}});var WT=Er();Object.defineProperty(qe,"FILE_IDENTIFIER_LENGTH",{enumerable:!0,get:function(){return WT.FILE_IDENTIFIER_LENGTH}});var HT=Er();Object.defineProperty(qe,"SIZE_PREFIX_LENGTH",{enumerable:!0,get:function(){return HT.SIZE_PREFIX_LENGTH}});var wi=Gs();Object.defineProperty(qe,"int32",{enumerable:!0,get:function(){return wi.int32}});Object.defineProperty(qe,"float32",{enumerable:!0,get:function(){return wi.float32}});Object.defineProperty(qe,"float64",{enumerable:!0,get:function(){return wi.float64}});Object.defineProperty(qe,"isLittleEndian",{enumerable:!0,get:function(){return wi.isLittleEndian}});var jT=Us();Object.defineProperty(qe,"Encoding",{enumerable:!0,get:function(){return jT.Encoding}});var qT=Jp();Object.defineProperty(qe,"Builder",{enumerable:!0,get:function(){return qT.Builder}});var KT=Hs();Object.defineProperty(qe,"ByteBuffer",{enumerable:!0,get:function(){return KT.ByteBuffer}})});var Ks=oe(nn=>{"use strict";var XT=nn&&nn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),ZT=nn&&nn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),JT=nn&&nn.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&XT(e,r,n);return ZT(e,r),e};Object.defineProperty(nn,"__esModule",{value:!0});nn.ArgTypeAndIndex=void 0;var YT=JT(ze()),Yp=Vs(),qs=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsArgTypeAndIndex(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsArgTypeAndIndex(e,n){return e.setPosition(e.position()+YT.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}argType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):Yp.ArgType.INPUT}index(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}static startArgTypeAndIndex(e){e.startObject(2)}static addArgType(e,n){e.addFieldInt8(0,n,Yp.ArgType.INPUT)}static addIndex(e,n){e.addFieldInt32(1,n,0)}static endArgTypeAndIndex(e){return e.endObject()}static createArgTypeAndIndex(e,n,t){return r.startArgTypeAndIndex(e),r.addArgType(e,n),r.addIndex(e,t),r.endArgTypeAndIndex(e)}};nn.ArgTypeAndIndex=qs});var Xs=oe(xi=>{"use strict";Object.defineProperty(xi,"__esModule",{value:!0});xi.AttributeType=void 0;var Qp;(function(r){r[r.UNDEFINED=0]="UNDEFINED",r[r.FLOAT=1]="FLOAT",r[r.INT=2]="INT",r[r.STRING=3]="STRING",r[r.TENSOR=4]="TENSOR",r[r.GRAPH=5]="GRAPH",r[r.FLOATS=6]="FLOATS",r[r.INTS=7]="INTS",r[r.STRINGS=8]="STRINGS",r[r.TENSORS=9]="TENSORS",r[r.GRAPHS=10]="GRAPHS",r[r.SPARSE_TENSOR=11]="SPARSE_TENSOR",r[r.SPARSE_TENSORS=12]="SPARSE_TENSORS"})(Qp||(xi.AttributeType=Qp={}))});var Zs=oe(Ti=>{"use strict";Object.defineProperty(Ti,"__esModule",{value:!0});Ti.NodeType=void 0;var ef;(function(r){r[r.Primitive=0]="Primitive",r[r.Fused=1]="Fused"})(ef||(Ti.NodeType=ef={}))});var Ys=oe(rn=>{"use strict";var QT=rn&&rn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),e2=rn&&rn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),t2=rn&&rn.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&QT(e,r,n);return e2(e,r),e};Object.defineProperty(rn,"__esModule",{value:!0});rn.Node=void 0;var n2=t2(ze()),r2=Qs(),tf=Zs(),Js=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsNode(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNode(e,n){return e.setPosition(e.position()+n2.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}name(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}docString(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}domain(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.__string(this.bb_pos+n,e):null}sinceVersion(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):0}index(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readUint32(this.bb_pos+e):0}opType(e){let n=this.bb.__offset(this.bb_pos,14);return n?this.bb.__string(this.bb_pos+n,e):null}type(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt32(this.bb_pos+e):tf.NodeType.Primitive}executionProviderType(e){let n=this.bb.__offset(this.bb_pos,18);return n?this.bb.__string(this.bb_pos+n,e):null}inputs(e,n){let t=this.bb.__offset(this.bb_pos,20);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,n){let t=this.bb.__offset(this.bb_pos,22);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}attributes(e,n){let t=this.bb.__offset(this.bb_pos,24);return t?(n||new r2.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}attributesLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCounts(e){let n=this.bb.__offset(this.bb_pos,26);return n?this.bb.readInt32(this.bb.__vector(this.bb_pos+n)+e*4):0}inputArgCountsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCountsArray(){let e=this.bb.__offset(this.bb_pos,26);return e?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}implicitInputs(e,n){let t=this.bb.__offset(this.bb_pos,28);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}implicitInputsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNode(e){e.startObject(13)}static addName(e,n){e.addFieldOffset(0,n,0)}static addDocString(e,n){e.addFieldOffset(1,n,0)}static addDomain(e,n){e.addFieldOffset(2,n,0)}static addSinceVersion(e,n){e.addFieldInt32(3,n,0)}static addIndex(e,n){e.addFieldInt32(4,n,0)}static addOpType(e,n){e.addFieldOffset(5,n,0)}static addType(e,n){e.addFieldInt32(6,n,tf.NodeType.Primitive)}static addExecutionProviderType(e,n){e.addFieldOffset(7,n,0)}static addInputs(e,n){e.addFieldOffset(8,n,0)}static createInputsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startInputsVector(e,n){e.startVector(4,n,4)}static addOutputs(e,n){e.addFieldOffset(9,n,0)}static createOutputsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startOutputsVector(e,n){e.startVector(4,n,4)}static addAttributes(e,n){e.addFieldOffset(10,n,0)}static createAttributesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startAttributesVector(e,n){e.startVector(4,n,4)}static addInputArgCounts(e,n){e.addFieldOffset(11,n,0)}static createInputArgCountsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addInt32(n[t]);return e.endVector()}static startInputArgCountsVector(e,n){e.startVector(4,n,4)}static addImplicitInputs(e,n){e.addFieldOffset(12,n,0)}static createImplicitInputsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startImplicitInputsVector(e,n){e.startVector(4,n,4)}static endNode(e){return e.endObject()}static createNode(e,n,t,o,i,a,s,u,l,d,f,h,g,b){return r.startNode(e),r.addName(e,n),r.addDocString(e,t),r.addDomain(e,o),r.addSinceVersion(e,i),r.addIndex(e,a),r.addOpType(e,s),r.addType(e,u),r.addExecutionProviderType(e,l),r.addInputs(e,d),r.addOutputs(e,f),r.addAttributes(e,h),r.addInputArgCounts(e,g),r.addImplicitInputs(e,b),r.endNode(e)}};rn.Node=Js});var tu=oe(Ii=>{"use strict";Object.defineProperty(Ii,"__esModule",{value:!0});Ii.EdgeEnd=void 0;var eu=class{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static sizeOf(){return 12}static createEdgeEnd(e,n,t,o){return e.prep(4,12),e.writeInt32(o),e.writeInt32(t),e.writeInt32(n),e.offset()}};Ii.EdgeEnd=eu});var ru=oe(on=>{"use strict";var o2=on&&on.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),i2=on&&on.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),a2=on&&on.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&o2(e,r,n);return i2(e,r),e};Object.defineProperty(on,"__esModule",{value:!0});on.NodeEdge=void 0;var s2=a2(ze()),nf=tu(),nu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsNodeEdge(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodeEdge(e,n){return e.setPosition(e.position()+s2.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}inputEdges(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new nf.EdgeEnd).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}inputEdgesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}outputEdges(e,n){let t=this.bb.__offset(this.bb_pos,8);return t?(n||new nf.EdgeEnd).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}outputEdgesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNodeEdge(e){e.startObject(3)}static addNodeIndex(e,n){e.addFieldInt32(0,n,0)}static addInputEdges(e,n){e.addFieldOffset(1,n,0)}static startInputEdgesVector(e,n){e.startVector(12,n,4)}static addOutputEdges(e,n){e.addFieldOffset(2,n,0)}static startOutputEdgesVector(e,n){e.startVector(12,n,4)}static endNodeEdge(e){return e.endObject()}static createNodeEdge(e,n,t,o){return r.startNodeEdge(e),r.addNodeIndex(e,n),r.addInputEdges(e,t),r.addOutputEdges(e,o),r.endNodeEdge(e)}};on.NodeEdge=nu});var iu=oe(an=>{"use strict";var u2=an&&an.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),l2=an&&an.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),c2=an&&an.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&u2(e,r,n);return l2(e,r),e};Object.defineProperty(an,"__esModule",{value:!0});an.NodesToOptimizeIndices=void 0;var d2=c2(ze()),ou=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsNodesToOptimizeIndices(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodesToOptimizeIndices(e,n){return e.setPosition(e.position()+d2.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}nodeIndices(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.readUint32(this.bb.__vector(this.bb_pos+n)+e*4):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}numInputs(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}numOutputs(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readUint32(this.bb_pos+e):0}hasVariadicInput(){let e=this.bb.__offset(this.bb_pos,10);return e?!!this.bb.readInt8(this.bb_pos+e):!1}hasVariadicOutput(){let e=this.bb.__offset(this.bb_pos,12);return e?!!this.bb.readInt8(this.bb_pos+e):!1}numVariadicInputs(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readUint32(this.bb_pos+e):0}numVariadicOutputs(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readUint32(this.bb_pos+e):0}static startNodesToOptimizeIndices(e){e.startObject(7)}static addNodeIndices(e,n){e.addFieldOffset(0,n,0)}static createNodeIndicesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addInt32(n[t]);return e.endVector()}static startNodeIndicesVector(e,n){e.startVector(4,n,4)}static addNumInputs(e,n){e.addFieldInt32(1,n,0)}static addNumOutputs(e,n){e.addFieldInt32(2,n,0)}static addHasVariadicInput(e,n){e.addFieldInt8(3,+n,0)}static addHasVariadicOutput(e,n){e.addFieldInt8(4,+n,0)}static addNumVariadicInputs(e,n){e.addFieldInt32(5,n,0)}static addNumVariadicOutputs(e,n){e.addFieldInt32(6,n,0)}static endNodesToOptimizeIndices(e){return e.endObject()}static createNodesToOptimizeIndices(e,n,t,o,i,a,s,u){return r.startNodesToOptimizeIndices(e),r.addNodeIndices(e,n),r.addNumInputs(e,t),r.addNumOutputs(e,o),r.addHasVariadicInput(e,i),r.addHasVariadicOutput(e,a),r.addNumVariadicInputs(e,s),r.addNumVariadicOutputs(e,u),r.endNodesToOptimizeIndices(e)}};an.NodesToOptimizeIndices=ou});var su=oe(sn=>{"use strict";var p2=sn&&sn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),f2=sn&&sn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),h2=sn&&sn.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&p2(e,r,n);return f2(e,r),e};Object.defineProperty(sn,"__esModule",{value:!0});sn.RuntimeOptimizationRecord=void 0;var m2=h2(ze()),g2=iu(),au=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsRuntimeOptimizationRecord(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecord(e,n){return e.setPosition(e.position()+m2.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}actionId(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}nodesToOptimizeIndices(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new g2.NodesToOptimizeIndices).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}producedOpIds(e,n){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}producedOpIdsLength(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecord(e){e.startObject(4)}static addActionId(e,n){e.addFieldOffset(0,n,0)}static addNodesToOptimizeIndices(e,n){e.addFieldOffset(1,n,0)}static addProducedOpIds(e,n){e.addFieldOffset(3,n,0)}static createProducedOpIdsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startProducedOpIdsVector(e,n){e.startVector(4,n,4)}static endRuntimeOptimizationRecord(e){return e.endObject()}};sn.RuntimeOptimizationRecord=au});var lu=oe(un=>{"use strict";var b2=un&&un.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),y2=un&&un.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),_2=un&&un.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&b2(e,r,n);return y2(e,r),e};Object.defineProperty(un,"__esModule",{value:!0});un.RuntimeOptimizationRecordContainerEntry=void 0;var v2=_2(ze()),w2=su(),uu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsRuntimeOptimizationRecordContainerEntry(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecordContainerEntry(e,n){return e.setPosition(e.position()+v2.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}optimizerName(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}runtimeOptimizationRecords(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new w2.RuntimeOptimizationRecord).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}runtimeOptimizationRecordsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecordContainerEntry(e){e.startObject(2)}static addOptimizerName(e,n){e.addFieldOffset(0,n,0)}static addRuntimeOptimizationRecords(e,n){e.addFieldOffset(1,n,0)}static createRuntimeOptimizationRecordsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startRuntimeOptimizationRecordsVector(e,n){e.startVector(4,n,4)}static endRuntimeOptimizationRecordContainerEntry(e){let n=e.endObject();return e.requiredField(n,4),n}static createRuntimeOptimizationRecordContainerEntry(e,n,t){return r.startRuntimeOptimizationRecordContainerEntry(e),r.addOptimizerName(e,n),r.addRuntimeOptimizationRecords(e,t),r.endRuntimeOptimizationRecordContainerEntry(e)}};un.RuntimeOptimizationRecordContainerEntry=uu});var du=oe(ln=>{"use strict";var x2=ln&&ln.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),T2=ln&&ln.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),I2=ln&&ln.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&x2(e,r,n);return T2(e,r),e};Object.defineProperty(ln,"__esModule",{value:!0});ln.RuntimeOptimizations=void 0;var S2=I2(ze()),$2=lu(),cu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsRuntimeOptimizations(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizations(e,n){return e.setPosition(e.position()+S2.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}records(e,n){let t=this.bb.__offset(this.bb_pos,4);return t?(n||new $2.RuntimeOptimizationRecordContainerEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}recordsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizations(e){e.startObject(1)}static addRecords(e,n){e.addFieldOffset(0,n,0)}static createRecordsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startRecordsVector(e,n){e.startVector(4,n,4)}static endRuntimeOptimizations(e){return e.endObject()}static createRuntimeOptimizations(e,n){return r.startRuntimeOptimizations(e),r.addRecords(e,n),r.endRuntimeOptimizations(e)}};ln.RuntimeOptimizations=cu});var xo=oe(Si=>{"use strict";Object.defineProperty(Si,"__esModule",{value:!0});Si.TensorDataType=void 0;var rf;(function(r){r[r.UNDEFINED=0]="UNDEFINED",r[r.FLOAT=1]="FLOAT",r[r.UINT8=2]="UINT8",r[r.INT8=3]="INT8",r[r.UINT16=4]="UINT16",r[r.INT16=5]="INT16",r[r.INT32=6]="INT32",r[r.INT64=7]="INT64",r[r.STRING=8]="STRING",r[r.BOOL=9]="BOOL",r[r.FLOAT16=10]="FLOAT16",r[r.DOUBLE=11]="DOUBLE",r[r.UINT32=12]="UINT32",r[r.UINT64=13]="UINT64",r[r.COMPLEX64=14]="COMPLEX64",r[r.COMPLEX128=15]="COMPLEX128",r[r.BFLOAT16=16]="BFLOAT16",r[r.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",r[r.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",r[r.FLOAT8E5M2=19]="FLOAT8E5M2",r[r.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"})(rf||(Si.TensorDataType=rf={}))});var To=oe(cn=>{"use strict";var A2=cn&&cn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),O2=cn&&cn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),P2=cn&&cn.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&A2(e,r,n);return O2(e,r),e};Object.defineProperty(cn,"__esModule",{value:!0});cn.Tensor=void 0;var E2=P2(ze()),of=xo(),pu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsTensor(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensor(e,n){return e.setPosition(e.position()+E2.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}name(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}docString(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}dims(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.readInt64(this.bb.__vector(this.bb_pos+n)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}dataType(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):of.TensorDataType.UNDEFINED}rawData(e){let n=this.bb.__offset(this.bb_pos,12);return n?this.bb.readUint8(this.bb.__vector(this.bb_pos+n)+e):0}rawDataLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}rawDataArray(){let e=this.bb.__offset(this.bb_pos,12);return e?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}stringData(e,n){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}stringDataLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}externalDataOffset(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt64(this.bb_pos+e):BigInt("-1")}static startTensor(e){e.startObject(7)}static addName(e,n){e.addFieldOffset(0,n,0)}static addDocString(e,n){e.addFieldOffset(1,n,0)}static addDims(e,n){e.addFieldOffset(2,n,0)}static createDimsVector(e,n){e.startVector(8,n.length,8);for(let t=n.length-1;t>=0;t--)e.addInt64(n[t]);return e.endVector()}static startDimsVector(e,n){e.startVector(8,n,8)}static addDataType(e,n){e.addFieldInt32(3,n,of.TensorDataType.UNDEFINED)}static addRawData(e,n){e.addFieldOffset(4,n,0)}static createRawDataVector(e,n){e.startVector(1,n.length,1);for(let t=n.length-1;t>=0;t--)e.addInt8(n[t]);return e.endVector()}static startRawDataVector(e,n){e.startVector(1,n,1)}static addStringData(e,n){e.addFieldOffset(5,n,0)}static createStringDataVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startStringDataVector(e,n){e.startVector(4,n,4)}static addExternalDataOffset(e,n){e.addFieldInt64(6,n,BigInt("-1"))}static endTensor(e){return e.endObject()}static createTensor(e,n,t,o,i,a,s,u){return r.startTensor(e),r.addName(e,n),r.addDocString(e,t),r.addDims(e,o),r.addDataType(e,i),r.addRawData(e,a),r.addStringData(e,s),r.addExternalDataOffset(e,u),r.endTensor(e)}};cn.Tensor=pu});var hu=oe(dn=>{"use strict";var C2=dn&&dn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),D2=dn&&dn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),k2=dn&&dn.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&C2(e,r,n);return D2(e,r),e};Object.defineProperty(dn,"__esModule",{value:!0});dn.SparseTensor=void 0;var N2=k2(ze()),af=To(),fu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsSparseTensor(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsSparseTensor(e,n){return e.setPosition(e.position()+N2.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}values(e){let n=this.bb.__offset(this.bb_pos,4);return n?(e||new af.Tensor).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}indices(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new af.Tensor).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}dims(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.readInt64(this.bb.__vector(this.bb_pos+n)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startSparseTensor(e){e.startObject(3)}static addValues(e,n){e.addFieldOffset(0,n,0)}static addIndices(e,n){e.addFieldOffset(1,n,0)}static addDims(e,n){e.addFieldOffset(2,n,0)}static createDimsVector(e,n){e.startVector(8,n.length,8);for(let t=n.length-1;t>=0;t--)e.addInt64(n[t]);return e.endVector()}static startDimsVector(e,n){e.startVector(8,n,8)}static endSparseTensor(e){return e.endObject()}};dn.SparseTensor=fu});var gu=oe(pn=>{"use strict";var L2=pn&&pn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),R2=pn&&pn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),z2=pn&&pn.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&L2(e,r,n);return R2(e,r),e};Object.defineProperty(pn,"__esModule",{value:!0});pn.MapType=void 0;var M2=z2(ze()),sf=xo(),B2=Io(),mu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsMapType(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsMapType(e,n){return e.setPosition(e.position()+M2.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}keyType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):sf.TensorDataType.UNDEFINED}valueType(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new B2.TypeInfo).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startMapType(e){e.startObject(2)}static addKeyType(e,n){e.addFieldInt32(0,n,sf.TensorDataType.UNDEFINED)}static addValueType(e,n){e.addFieldOffset(1,n,0)}static endMapType(e){return e.endObject()}};pn.MapType=mu});var yu=oe(fn=>{"use strict";var F2=fn&&fn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),V2=fn&&fn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),G2=fn&&fn.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&F2(e,r,n);return V2(e,r),e};Object.defineProperty(fn,"__esModule",{value:!0});fn.SequenceType=void 0;var U2=G2(ze()),W2=Io(),bu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsSequenceType(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsSequenceType(e,n){return e.setPosition(e.position()+U2.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}elemType(e){let n=this.bb.__offset(this.bb_pos,4);return n?(e||new W2.TypeInfo).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startSequenceType(e){e.startObject(1)}static addElemType(e,n){e.addFieldOffset(0,n,0)}static endSequenceType(e){return e.endObject()}static createSequenceType(e,n){return r.startSequenceType(e),r.addElemType(e,n),r.endSequenceType(e)}};fn.SequenceType=bu});var _u=oe($i=>{"use strict";Object.defineProperty($i,"__esModule",{value:!0});$i.DimensionValueType=void 0;var uf;(function(r){r[r.UNKNOWN=0]="UNKNOWN",r[r.VALUE=1]="VALUE",r[r.PARAM=2]="PARAM"})(uf||($i.DimensionValueType=uf={}))});var wu=oe(hn=>{"use strict";var H2=hn&&hn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),j2=hn&&hn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),q2=hn&&hn.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&H2(e,r,n);return j2(e,r),e};Object.defineProperty(hn,"__esModule",{value:!0});hn.DimensionValue=void 0;var K2=q2(ze()),lf=_u(),vu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDimensionValue(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimensionValue(e,n){return e.setPosition(e.position()+K2.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}dimType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):lf.DimensionValueType.UNKNOWN}dimValue(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}dimParam(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.__string(this.bb_pos+n,e):null}static startDimensionValue(e){e.startObject(3)}static addDimType(e,n){e.addFieldInt8(0,n,lf.DimensionValueType.UNKNOWN)}static addDimValue(e,n){e.addFieldInt64(1,n,BigInt("0"))}static addDimParam(e,n){e.addFieldOffset(2,n,0)}static endDimensionValue(e){return e.endObject()}static createDimensionValue(e,n,t,o){return r.startDimensionValue(e),r.addDimType(e,n),r.addDimValue(e,t),r.addDimParam(e,o),r.endDimensionValue(e)}};hn.DimensionValue=vu});var Tu=oe(mn=>{"use strict";var X2=mn&&mn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),Z2=mn&&mn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),J2=mn&&mn.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&X2(e,r,n);return Z2(e,r),e};Object.defineProperty(mn,"__esModule",{value:!0});mn.Dimension=void 0;var Y2=J2(ze()),Q2=wu(),xu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDimension(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimension(e,n){return e.setPosition(e.position()+Y2.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}value(e){let n=this.bb.__offset(this.bb_pos,4);return n?(e||new Q2.DimensionValue).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}denotation(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}static startDimension(e){e.startObject(2)}static addValue(e,n){e.addFieldOffset(0,n,0)}static addDenotation(e,n){e.addFieldOffset(1,n,0)}static endDimension(e){return e.endObject()}static createDimension(e,n,t){return r.startDimension(e),r.addValue(e,n),r.addDenotation(e,t),r.endDimension(e)}};mn.Dimension=xu});var Su=oe(gn=>{"use strict";var eI=gn&&gn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),tI=gn&&gn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),nI=gn&&gn.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&eI(e,r,n);return tI(e,r),e};Object.defineProperty(gn,"__esModule",{value:!0});gn.Shape=void 0;var rI=nI(ze()),oI=Tu(),Iu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsShape(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsShape(e,n){return e.setPosition(e.position()+rI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}dim(e,n){let t=this.bb.__offset(this.bb_pos,4);return t?(n||new oI.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}dimLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startShape(e){e.startObject(1)}static addDim(e,n){e.addFieldOffset(0,n,0)}static createDimVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startDimVector(e,n){e.startVector(4,n,4)}static endShape(e){return e.endObject()}static createShape(e,n){return r.startShape(e),r.addDim(e,n),r.endShape(e)}};gn.Shape=Iu});var Au=oe(bn=>{"use strict";var iI=bn&&bn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),aI=bn&&bn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),sI=bn&&bn.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&iI(e,r,n);return aI(e,r),e};Object.defineProperty(bn,"__esModule",{value:!0});bn.TensorTypeAndShape=void 0;var uI=sI(ze()),lI=Su(),cf=xo(),$u=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsTensorTypeAndShape(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensorTypeAndShape(e,n){return e.setPosition(e.position()+uI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}elemType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):cf.TensorDataType.UNDEFINED}shape(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new lI.Shape).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startTensorTypeAndShape(e){e.startObject(2)}static addElemType(e,n){e.addFieldInt32(0,n,cf.TensorDataType.UNDEFINED)}static addShape(e,n){e.addFieldOffset(1,n,0)}static endTensorTypeAndShape(e){return e.endObject()}};bn.TensorTypeAndShape=$u});var Ou=oe(pr=>{"use strict";Object.defineProperty(pr,"__esModule",{value:!0});pr.unionListToTypeInfoValue=pr.unionToTypeInfoValue=pr.TypeInfoValue=void 0;var df=gu(),pf=yu(),ff=Au(),Ai;(function(r){r[r.NONE=0]="NONE",r[r.tensor_type=1]="tensor_type",r[r.sequence_type=2]="sequence_type",r[r.map_type=3]="map_type"})(Ai||(pr.TypeInfoValue=Ai={}));function cI(r,e){switch(Ai[r]){case"NONE":return null;case"tensor_type":return e(new ff.TensorTypeAndShape);case"sequence_type":return e(new pf.SequenceType);case"map_type":return e(new df.MapType);default:return null}}pr.unionToTypeInfoValue=cI;function dI(r,e,n){switch(Ai[r]){case"NONE":return null;case"tensor_type":return e(n,new ff.TensorTypeAndShape);case"sequence_type":return e(n,new pf.SequenceType);case"map_type":return e(n,new df.MapType);default:return null}}pr.unionListToTypeInfoValue=dI});var Io=oe(yn=>{"use strict";var pI=yn&&yn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),fI=yn&&yn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),hI=yn&&yn.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&pI(e,r,n);return fI(e,r),e};Object.defineProperty(yn,"__esModule",{value:!0});yn.TypeInfo=void 0;var mI=hI(ze()),hf=Ou(),Pu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsTypeInfo(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTypeInfo(e,n){return e.setPosition(e.position()+mI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}denotation(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}valueType(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint8(this.bb_pos+e):hf.TypeInfoValue.NONE}value(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.__union(e,this.bb_pos+n):null}static startTypeInfo(e){e.startObject(3)}static addDenotation(e,n){e.addFieldOffset(0,n,0)}static addValueType(e,n){e.addFieldInt8(1,n,hf.TypeInfoValue.NONE)}static addValue(e,n){e.addFieldOffset(2,n,0)}static endTypeInfo(e){return e.endObject()}static createTypeInfo(e,n,t,o){return r.startTypeInfo(e),r.addDenotation(e,n),r.addValueType(e,t),r.addValue(e,o),r.endTypeInfo(e)}};yn.TypeInfo=Pu});var Cu=oe(_n=>{"use strict";var gI=_n&&_n.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),bI=_n&&_n.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),yI=_n&&_n.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&gI(e,r,n);return bI(e,r),e};Object.defineProperty(_n,"__esModule",{value:!0});_n.ValueInfo=void 0;var _I=yI(ze()),vI=Io(),Eu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsValueInfo(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsValueInfo(e,n){return e.setPosition(e.position()+_I.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}name(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}docString(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}type(e){let n=this.bb.__offset(this.bb_pos,8);return n?(e||new vI.TypeInfo).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startValueInfo(e){e.startObject(3)}static addName(e,n){e.addFieldOffset(0,n,0)}static addDocString(e,n){e.addFieldOffset(1,n,0)}static addType(e,n){e.addFieldOffset(2,n,0)}static endValueInfo(e){return e.endObject()}};_n.ValueInfo=Eu});var Oi=oe(vn=>{"use strict";var wI=vn&&vn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),xI=vn&&vn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),TI=vn&&vn.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&wI(e,r,n);return xI(e,r),e};Object.defineProperty(vn,"__esModule",{value:!0});vn.Graph=void 0;var II=TI(ze()),SI=Ys(),$I=ru(),AI=du(),OI=hu(),PI=To(),EI=Cu(),Du=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsGraph(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsGraph(e,n){return e.setPosition(e.position()+II.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}initializers(e,n){let t=this.bb.__offset(this.bb_pos,4);return t?(n||new PI.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}initializersLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeArgs(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new EI.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}nodes(e,n){let t=this.bb.__offset(this.bb_pos,8);return t?(n||new SI.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}maxNodeIndex(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readUint32(this.bb_pos+e):0}nodeEdges(e,n){let t=this.bb.__offset(this.bb_pos,12);return t?(n||new $I.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeEdgesLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}inputs(e,n){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,n){let t=this.bb.__offset(this.bb_pos,16);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.__vector_len(this.bb_pos+e):0}sparseInitializers(e,n){let t=this.bb.__offset(this.bb_pos,18);return t?(n||new OI.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}sparseInitializersLength(){let e=this.bb.__offset(this.bb_pos,18);return e?this.bb.__vector_len(this.bb_pos+e):0}runtimeOptimizations(e){let n=this.bb.__offset(this.bb_pos,20);return n?(e||new AI.RuntimeOptimizations).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startGraph(e){e.startObject(9)}static addInitializers(e,n){e.addFieldOffset(0,n,0)}static createInitializersVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startInitializersVector(e,n){e.startVector(4,n,4)}static addNodeArgs(e,n){e.addFieldOffset(1,n,0)}static createNodeArgsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startNodeArgsVector(e,n){e.startVector(4,n,4)}static addNodes(e,n){e.addFieldOffset(2,n,0)}static createNodesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startNodesVector(e,n){e.startVector(4,n,4)}static addMaxNodeIndex(e,n){e.addFieldInt32(3,n,0)}static addNodeEdges(e,n){e.addFieldOffset(4,n,0)}static createNodeEdgesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startNodeEdgesVector(e,n){e.startVector(4,n,4)}static addInputs(e,n){e.addFieldOffset(5,n,0)}static createInputsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startInputsVector(e,n){e.startVector(4,n,4)}static addOutputs(e,n){e.addFieldOffset(6,n,0)}static createOutputsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startOutputsVector(e,n){e.startVector(4,n,4)}static addSparseInitializers(e,n){e.addFieldOffset(7,n,0)}static createSparseInitializersVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startSparseInitializersVector(e,n){e.startVector(4,n,4)}static addRuntimeOptimizations(e,n){e.addFieldOffset(8,n,0)}static endGraph(e){return e.endObject()}};vn.Graph=Du});var Qs=oe(wn=>{"use strict";var CI=wn&&wn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),DI=wn&&wn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),kI=wn&&wn.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&CI(e,r,n);return DI(e,r),e};Object.defineProperty(wn,"__esModule",{value:!0});wn.Attribute=void 0;var NI=kI(ze()),mf=Xs(),gf=Oi(),bf=To(),ku=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsAttribute(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsAttribute(e,n){return e.setPosition(e.position()+NI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}name(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}docString(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}type(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readInt32(this.bb_pos+e):mf.AttributeType.UNDEFINED}f(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readFloat32(this.bb_pos+e):0}i(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}s(e){let n=this.bb.__offset(this.bb_pos,14);return n?this.bb.__string(this.bb_pos+n,e):null}t(e){let n=this.bb.__offset(this.bb_pos,16);return n?(e||new bf.Tensor).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}g(e){let n=this.bb.__offset(this.bb_pos,18);return n?(e||new gf.Graph).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}floats(e){let n=this.bb.__offset(this.bb_pos,20);return n?this.bb.readFloat32(this.bb.__vector(this.bb_pos+n)+e*4):0}floatsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}floatsArray(){let e=this.bb.__offset(this.bb_pos,20);return e?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}ints(e){let n=this.bb.__offset(this.bb_pos,22);return n?this.bb.readInt64(this.bb.__vector(this.bb_pos+n)+e*8):BigInt(0)}intsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}strings(e,n){let t=this.bb.__offset(this.bb_pos,24);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}stringsLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}tensors(e,n){let t=this.bb.__offset(this.bb_pos,26);return t?(n||new bf.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}tensorsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}graphs(e,n){let t=this.bb.__offset(this.bb_pos,28);return t?(n||new gf.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}graphsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startAttribute(e){e.startObject(13)}static addName(e,n){e.addFieldOffset(0,n,0)}static addDocString(e,n){e.addFieldOffset(1,n,0)}static addType(e,n){e.addFieldInt32(2,n,mf.AttributeType.UNDEFINED)}static addF(e,n){e.addFieldFloat32(3,n,0)}static addI(e,n){e.addFieldInt64(4,n,BigInt("0"))}static addS(e,n){e.addFieldOffset(5,n,0)}static addT(e,n){e.addFieldOffset(6,n,0)}static addG(e,n){e.addFieldOffset(7,n,0)}static addFloats(e,n){e.addFieldOffset(8,n,0)}static createFloatsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addFloat32(n[t]);return e.endVector()}static startFloatsVector(e,n){e.startVector(4,n,4)}static addInts(e,n){e.addFieldOffset(9,n,0)}static createIntsVector(e,n){e.startVector(8,n.length,8);for(let t=n.length-1;t>=0;t--)e.addInt64(n[t]);return e.endVector()}static startIntsVector(e,n){e.startVector(8,n,8)}static addStrings(e,n){e.addFieldOffset(10,n,0)}static createStringsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startStringsVector(e,n){e.startVector(4,n,4)}static addTensors(e,n){e.addFieldOffset(11,n,0)}static createTensorsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startTensorsVector(e,n){e.startVector(4,n,4)}static addGraphs(e,n){e.addFieldOffset(12,n,0)}static createGraphsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startGraphsVector(e,n){e.startVector(4,n,4)}static endAttribute(e){return e.endObject()}};wn.Attribute=ku});var Lu=oe(xn=>{"use strict";var LI=xn&&xn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),RI=xn&&xn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),zI=xn&&xn.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&LI(e,r,n);return RI(e,r),e};Object.defineProperty(xn,"__esModule",{value:!0});xn.DeprecatedKernelCreateInfos=void 0;var MI=zI(ze()),Nu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDeprecatedKernelCreateInfos(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedKernelCreateInfos(e,n){return e.setPosition(e.position()+MI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}nodeIndices(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.readUint32(this.bb.__vector(this.bb_pos+n)+e*4):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}kernelDefHashes(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.readUint64(this.bb.__vector(this.bb_pos+n)+e*8):BigInt(0)}kernelDefHashesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedKernelCreateInfos(e){e.startObject(2)}static addNodeIndices(e,n){e.addFieldOffset(0,n,0)}static createNodeIndicesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addInt32(n[t]);return e.endVector()}static startNodeIndicesVector(e,n){e.startVector(4,n,4)}static addKernelDefHashes(e,n){e.addFieldOffset(1,n,0)}static createKernelDefHashesVector(e,n){e.startVector(8,n.length,8);for(let t=n.length-1;t>=0;t--)e.addInt64(n[t]);return e.endVector()}static startKernelDefHashesVector(e,n){e.startVector(8,n,8)}static endDeprecatedKernelCreateInfos(e){return e.endObject()}static createDeprecatedKernelCreateInfos(e,n,t){return r.startDeprecatedKernelCreateInfos(e),r.addNodeIndices(e,n),r.addKernelDefHashes(e,t),r.endDeprecatedKernelCreateInfos(e)}};xn.DeprecatedKernelCreateInfos=Nu});var yf=oe(Tn=>{"use strict";var BI=Tn&&Tn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),FI=Tn&&Tn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),VI=Tn&&Tn.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&BI(e,r,n);return FI(e,r),e};Object.defineProperty(Tn,"__esModule",{value:!0});Tn.DeprecatedNodeIndexAndKernelDefHash=void 0;var GI=VI(ze()),Ru=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDeprecatedNodeIndexAndKernelDefHash(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedNodeIndexAndKernelDefHash(e,n){return e.setPosition(e.position()+GI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}kernelDefHash(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint64(this.bb_pos+e):BigInt("0")}static startDeprecatedNodeIndexAndKernelDefHash(e){e.startObject(2)}static addNodeIndex(e,n){e.addFieldInt32(0,n,0)}static addKernelDefHash(e,n){e.addFieldInt64(1,n,BigInt("0"))}static endDeprecatedNodeIndexAndKernelDefHash(e){return e.endObject()}static createDeprecatedNodeIndexAndKernelDefHash(e,n,t){return r.startDeprecatedNodeIndexAndKernelDefHash(e),r.addNodeIndex(e,n),r.addKernelDefHash(e,t),r.endDeprecatedNodeIndexAndKernelDefHash(e)}};Tn.DeprecatedNodeIndexAndKernelDefHash=Ru});var Mu=oe(In=>{"use strict";var UI=In&&In.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),WI=In&&In.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),HI=In&&In.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&UI(e,r,n);return WI(e,r),e};Object.defineProperty(In,"__esModule",{value:!0});In.DeprecatedSubGraphSessionState=void 0;var jI=HI(ze()),qI=Bu(),zu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDeprecatedSubGraphSessionState(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedSubGraphSessionState(e,n){return e.setPosition(e.position()+jI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}graphId(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}sessionState(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new qI.DeprecatedSessionState).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startDeprecatedSubGraphSessionState(e){e.startObject(2)}static addGraphId(e,n){e.addFieldOffset(0,n,0)}static addSessionState(e,n){e.addFieldOffset(1,n,0)}static endDeprecatedSubGraphSessionState(e){let n=e.endObject();return e.requiredField(n,4),n}};In.DeprecatedSubGraphSessionState=zu});var Bu=oe(Sn=>{"use strict";var KI=Sn&&Sn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),XI=Sn&&Sn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),ZI=Sn&&Sn.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&KI(e,r,n);return XI(e,r),e};Object.defineProperty(Sn,"__esModule",{value:!0});Sn.DeprecatedSessionState=void 0;var JI=ZI(ze()),YI=Lu(),QI=Mu(),Fu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDeprecatedSessionState(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedSessionState(e,n){return e.setPosition(e.position()+JI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}kernels(e){let n=this.bb.__offset(this.bb_pos,4);return n?(e||new YI.DeprecatedKernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}subGraphSessionStates(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new QI.DeprecatedSubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}subGraphSessionStatesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedSessionState(e){e.startObject(2)}static addKernels(e,n){e.addFieldOffset(0,n,0)}static addSubGraphSessionStates(e,n){e.addFieldOffset(1,n,0)}static createSubGraphSessionStatesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startSubGraphSessionStatesVector(e,n){e.startVector(4,n,4)}static endDeprecatedSessionState(e){return e.endObject()}static createDeprecatedSessionState(e,n,t){return r.startDeprecatedSessionState(e),r.addKernels(e,n),r.addSubGraphSessionStates(e,t),r.endDeprecatedSessionState(e)}};Sn.DeprecatedSessionState=Fu});var Gu=oe($n=>{"use strict";var e1=$n&&$n.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),t1=$n&&$n.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),n1=$n&&$n.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&e1(e,r,n);return t1(e,r),e};Object.defineProperty($n,"__esModule",{value:!0});$n.KernelTypeStrArgsEntry=void 0;var r1=n1(ze()),o1=Ks(),Vu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsKernelTypeStrArgsEntry(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrArgsEntry(e,n){return e.setPosition(e.position()+r1.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}kernelTypeStr(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}args(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new o1.ArgTypeAndIndex).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}argsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrArgsEntry(e){e.startObject(2)}static addKernelTypeStr(e,n){e.addFieldOffset(0,n,0)}static addArgs(e,n){e.addFieldOffset(1,n,0)}static createArgsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startArgsVector(e,n){e.startVector(4,n,4)}static endKernelTypeStrArgsEntry(e){let n=e.endObject();return e.requiredField(n,4),n}static createKernelTypeStrArgsEntry(e,n,t){return r.startKernelTypeStrArgsEntry(e),r.addKernelTypeStr(e,n),r.addArgs(e,t),r.endKernelTypeStrArgsEntry(e)}};$n.KernelTypeStrArgsEntry=Vu});var Wu=oe(An=>{"use strict";var i1=An&&An.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),a1=An&&An.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),s1=An&&An.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&i1(e,r,n);return a1(e,r),e};Object.defineProperty(An,"__esModule",{value:!0});An.OpIdKernelTypeStrArgsEntry=void 0;var u1=s1(ze()),l1=Gu(),Uu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsOpIdKernelTypeStrArgsEntry(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOpIdKernelTypeStrArgsEntry(e,n){return e.setPosition(e.position()+u1.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}opId(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}kernelTypeStrArgs(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new l1.KernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}kernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startOpIdKernelTypeStrArgsEntry(e){e.startObject(2)}static addOpId(e,n){e.addFieldOffset(0,n,0)}static addKernelTypeStrArgs(e,n){e.addFieldOffset(1,n,0)}static createKernelTypeStrArgsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startKernelTypeStrArgsVector(e,n){e.startVector(4,n,4)}static endOpIdKernelTypeStrArgsEntry(e){let n=e.endObject();return e.requiredField(n,4),n}static createOpIdKernelTypeStrArgsEntry(e,n,t){return r.startOpIdKernelTypeStrArgsEntry(e),r.addOpId(e,n),r.addKernelTypeStrArgs(e,t),r.endOpIdKernelTypeStrArgsEntry(e)}};An.OpIdKernelTypeStrArgsEntry=Uu});var ju=oe(On=>{"use strict";var c1=On&&On.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),d1=On&&On.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),p1=On&&On.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&c1(e,r,n);return d1(e,r),e};Object.defineProperty(On,"__esModule",{value:!0});On.KernelTypeStrResolver=void 0;var f1=p1(ze()),h1=Wu(),Hu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsKernelTypeStrResolver(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrResolver(e,n){return e.setPosition(e.position()+f1.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}opKernelTypeStrArgs(e,n){let t=this.bb.__offset(this.bb_pos,4);return t?(n||new h1.OpIdKernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opKernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrResolver(e){e.startObject(1)}static addOpKernelTypeStrArgs(e,n){e.addFieldOffset(0,n,0)}static createOpKernelTypeStrArgsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startOpKernelTypeStrArgsVector(e,n){e.startVector(4,n,4)}static endKernelTypeStrResolver(e){return e.endObject()}static createKernelTypeStrResolver(e,n){return r.startKernelTypeStrResolver(e),r.addOpKernelTypeStrArgs(e,n),r.endKernelTypeStrResolver(e)}};On.KernelTypeStrResolver=Hu});var Ku=oe(Pn=>{"use strict";var m1=Pn&&Pn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),g1=Pn&&Pn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),b1=Pn&&Pn.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&m1(e,r,n);return g1(e,r),e};Object.defineProperty(Pn,"__esModule",{value:!0});Pn.OperatorSetId=void 0;var y1=b1(ze()),qu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsOperatorSetId(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOperatorSetId(e,n){return e.setPosition(e.position()+y1.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}domain(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}version(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}static startOperatorSetId(e){e.startObject(2)}static addDomain(e,n){e.addFieldOffset(0,n,0)}static addVersion(e,n){e.addFieldInt64(1,n,BigInt("0"))}static endOperatorSetId(e){return e.endObject()}static createOperatorSetId(e,n,t){return r.startOperatorSetId(e),r.addDomain(e,n),r.addVersion(e,t),r.endOperatorSetId(e)}};Pn.OperatorSetId=qu});var Zu=oe(En=>{"use strict";var _1=En&&En.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),v1=En&&En.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),w1=En&&En.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&_1(e,r,n);return v1(e,r),e};Object.defineProperty(En,"__esModule",{value:!0});En.StringStringEntry=void 0;var x1=w1(ze()),Xu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsStringStringEntry(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsStringStringEntry(e,n){return e.setPosition(e.position()+x1.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}key(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}value(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}static startStringStringEntry(e){e.startObject(2)}static addKey(e,n){e.addFieldOffset(0,n,0)}static addValue(e,n){e.addFieldOffset(1,n,0)}static endStringStringEntry(e){return e.endObject()}static createStringStringEntry(e,n,t){return r.startStringStringEntry(e),r.addKey(e,n),r.addValue(e,t),r.endStringStringEntry(e)}};En.StringStringEntry=Xu});var Yu=oe(Cn=>{"use strict";var T1=Cn&&Cn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),I1=Cn&&Cn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),S1=Cn&&Cn.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&T1(e,r,n);return I1(e,r),e};Object.defineProperty(Cn,"__esModule",{value:!0});Cn.Model=void 0;var $1=S1(ze()),A1=Oi(),O1=Ku(),P1=Zu(),Ju=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsModel(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsModel(e,n){return e.setPosition(e.position()+$1.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}irVersion(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}opsetImport(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new O1.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opsetImportLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}producerName(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.__string(this.bb_pos+n,e):null}producerVersion(e){let n=this.bb.__offset(this.bb_pos,10);return n?this.bb.__string(this.bb_pos+n,e):null}domain(e){let n=this.bb.__offset(this.bb_pos,12);return n?this.bb.__string(this.bb_pos+n,e):null}modelVersion(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}docString(e){let n=this.bb.__offset(this.bb_pos,16);return n?this.bb.__string(this.bb_pos+n,e):null}graph(e){let n=this.bb.__offset(this.bb_pos,18);return n?(e||new A1.Graph).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}graphDocString(e){let n=this.bb.__offset(this.bb_pos,20);return n?this.bb.__string(this.bb_pos+n,e):null}metadataProps(e,n){let t=this.bb.__offset(this.bb_pos,22);return t?(n||new P1.StringStringEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}metadataPropsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}static startModel(e){e.startObject(10)}static addIrVersion(e,n){e.addFieldInt64(0,n,BigInt("0"))}static addOpsetImport(e,n){e.addFieldOffset(1,n,0)}static createOpsetImportVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startOpsetImportVector(e,n){e.startVector(4,n,4)}static addProducerName(e,n){e.addFieldOffset(2,n,0)}static addProducerVersion(e,n){e.addFieldOffset(3,n,0)}static addDomain(e,n){e.addFieldOffset(4,n,0)}static addModelVersion(e,n){e.addFieldInt64(5,n,BigInt("0"))}static addDocString(e,n){e.addFieldOffset(6,n,0)}static addGraph(e,n){e.addFieldOffset(7,n,0)}static addGraphDocString(e,n){e.addFieldOffset(8,n,0)}static addMetadataProps(e,n){e.addFieldOffset(9,n,0)}static createMetadataPropsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startMetadataPropsVector(e,n){e.startVector(4,n,4)}static endModel(e){return e.endObject()}};Cn.Model=Ju});var _f=oe(Dn=>{"use strict";var E1=Dn&&Dn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),C1=Dn&&Dn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),D1=Dn&&Dn.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&E1(e,r,n);return C1(e,r),e};Object.defineProperty(Dn,"__esModule",{value:!0});Dn.InferenceSession=void 0;var k1=D1(ze()),N1=ju(),L1=Yu(),Qu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsInferenceSession(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsInferenceSession(e,n){return e.setPosition(e.position()+k1.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static bufferHasIdentifier(e){return e.__has_identifier("ORTM")}ortVersion(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}model(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new L1.Model).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}kernelTypeStrResolver(e){let n=this.bb.__offset(this.bb_pos,10);return n?(e||new N1.KernelTypeStrResolver).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startInferenceSession(e){e.startObject(4)}static addOrtVersion(e,n){e.addFieldOffset(0,n,0)}static addModel(e,n){e.addFieldOffset(1,n,0)}static addKernelTypeStrResolver(e,n){e.addFieldOffset(3,n,0)}static endInferenceSession(e){return e.endObject()}static finishInferenceSessionBuffer(e,n){e.finish(n,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(e,n){e.finish(n,"ORTM",!0)}};Dn.InferenceSession=Qu});var R1,z1,Pi,Lt,M1,B1,F1,V1,G1,U1,W1,H1,el,tl,j1,q1,K1,X1,nl,Z1,J1,Y1,Q1,eS,tS,nS,rS,oS,iS,aS,sS,uS,So,rl,lS,ol,cS,vf=k(()=>{"use strict";R1=ve(Vs()),z1=ve(Ks()),Pi=ve(Qs()),Lt=ve(Xs()),M1=ve(Lu()),B1=ve(yf()),F1=ve(Bu()),V1=ve(Mu()),G1=ve(Tu()),U1=ve(wu()),W1=ve(_u()),H1=ve(tu()),el=ve(Oi()),tl=ve(_f()),j1=ve(Gu()),q1=ve(ju()),K1=ve(gu()),X1=ve(Yu()),nl=ve(Ys()),Z1=ve(ru()),J1=ve(Zs()),Y1=ve(iu()),Q1=ve(Wu()),eS=ve(Ku()),tS=ve(su()),nS=ve(lu()),rS=ve(du()),oS=ve(yu()),iS=ve(Su()),aS=ve(hu()),sS=ve(Zu()),uS=ve(To()),So=ve(xo()),rl=ve(Au()),lS=ve(Io()),ol=ve(Ou()),cS=ve(Cu())});var $o=k(()=>{"use strict";vf()});var xf=oe((FD,wf)=>{"use strict";wf.exports=dS;function dS(r,e){for(var n=new Array(arguments.length-1),t=0,o=2,i=!0;o<arguments.length;)n[t++]=arguments[o++];return new Promise(function(s,u){n[t]=function(d){if(i)if(i=!1,d)u(d);else{for(var f=new Array(arguments.length-1),h=0;h<f.length;)f[h++]=arguments[h];s.apply(null,f)}};try{r.apply(e||null,n)}catch(l){i&&(i=!1,u(l))}})}});var $f=oe(Sf=>{"use strict";var Ci=Sf;Ci.length=function(e){var n=e.length;if(!n)return 0;for(var t=0;--n%4>1&&e.charAt(n)==="=";)++t;return Math.ceil(e.length*3)/4-t};var eo=new Array(64),If=new Array(123);for(Wt=0;Wt<64;)If[eo[Wt]=Wt<26?Wt+65:Wt<52?Wt+71:Wt<62?Wt-4:Wt-59|43]=Wt++;var Wt;Ci.encode=function(e,n,t){for(var o=null,i=[],a=0,s=0,u;n<t;){var l=e[n++];switch(s){case 0:i[a++]=eo[l>>2],u=(l&3)<<4,s=1;break;case 1:i[a++]=eo[u|l>>4],u=(l&15)<<2,s=2;break;case 2:i[a++]=eo[u|l>>6],i[a++]=eo[l&63],s=0;break}a>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,i)),a=0)}return s&&(i[a++]=eo[u],i[a++]=61,s===1&&(i[a++]=61)),o?(a&&o.push(String.fromCharCode.apply(String,i.slice(0,a))),o.join("")):String.fromCharCode.apply(String,i.slice(0,a))};var Tf="invalid encoding";Ci.decode=function(e,n,t){for(var o=t,i=0,a,s=0;s<e.length;){var u=e.charCodeAt(s++);if(u===61&&i>1)break;if((u=If[u])===void 0)throw Error(Tf);switch(i){case 0:a=u,i=1;break;case 1:n[t++]=a<<2|(u&48)>>4,a=u,i=2;break;case 2:n[t++]=(a&15)<<4|(u&60)>>2,a=u,i=3;break;case 3:n[t++]=(a&3)<<6|u,i=0;break}}if(i===1)throw Error(Tf);return t-o};Ci.test=function(e){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)}});var Of=oe((GD,Af)=>{"use strict";Af.exports=Di;function Di(){this._listeners={}}Di.prototype.on=function(e,n,t){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:n,ctx:t||this}),this};Di.prototype.off=function(e,n){if(e===void 0)this._listeners={};else if(n===void 0)this._listeners[e]=[];else for(var t=this._listeners[e],o=0;o<t.length;)t[o].fn===n?t.splice(o,1):++o;return this};Di.prototype.emit=function(e){var n=this._listeners[e];if(n){for(var t=[],o=1;o<arguments.length;)t.push(arguments[o++]);for(o=0;o<n.length;)n[o].fn.apply(n[o++].ctx,t)}return this}});var Lf=oe((UD,Nf)=>{"use strict";Nf.exports=Pf(Pf);function Pf(r){return typeof Float32Array<"u"?function(){var e=new Float32Array([-0]),n=new Uint8Array(e.buffer),t=n[3]===128;function o(u,l,d){e[0]=u,l[d]=n[0],l[d+1]=n[1],l[d+2]=n[2],l[d+3]=n[3]}function i(u,l,d){e[0]=u,l[d]=n[3],l[d+1]=n[2],l[d+2]=n[1],l[d+3]=n[0]}r.writeFloatLE=t?o:i,r.writeFloatBE=t?i:o;function a(u,l){return n[0]=u[l],n[1]=u[l+1],n[2]=u[l+2],n[3]=u[l+3],e[0]}function s(u,l){return n[3]=u[l],n[2]=u[l+1],n[1]=u[l+2],n[0]=u[l+3],e[0]}r.readFloatLE=t?a:s,r.readFloatBE=t?s:a}():function(){function e(t,o,i,a){var s=o<0?1:0;if(s&&(o=-o),o===0)t(1/o>0?0:2147483648,i,a);else if(isNaN(o))t(2143289344,i,a);else if(o>34028234663852886e22)t((s<<31|2139095040)>>>0,i,a);else if(o<11754943508222875e-54)t((s<<31|Math.round(o/1401298464324817e-60))>>>0,i,a);else{var u=Math.floor(Math.log(o)/Math.LN2),l=Math.round(o*Math.pow(2,-u)*8388608)&8388607;t((s<<31|u+127<<23|l)>>>0,i,a)}}r.writeFloatLE=e.bind(null,Ef),r.writeFloatBE=e.bind(null,Cf);function n(t,o,i){var a=t(o,i),s=(a>>31)*2+1,u=a>>>23&255,l=a&8388607;return u===255?l?NaN:s*(1/0):u===0?s*1401298464324817e-60*l:s*Math.pow(2,u-150)*(l+8388608)}r.readFloatLE=n.bind(null,Df),r.readFloatBE=n.bind(null,kf)}(),typeof Float64Array<"u"?function(){var e=new Float64Array([-0]),n=new Uint8Array(e.buffer),t=n[7]===128;function o(u,l,d){e[0]=u,l[d]=n[0],l[d+1]=n[1],l[d+2]=n[2],l[d+3]=n[3],l[d+4]=n[4],l[d+5]=n[5],l[d+6]=n[6],l[d+7]=n[7]}function i(u,l,d){e[0]=u,l[d]=n[7],l[d+1]=n[6],l[d+2]=n[5],l[d+3]=n[4],l[d+4]=n[3],l[d+5]=n[2],l[d+6]=n[1],l[d+7]=n[0]}r.writeDoubleLE=t?o:i,r.writeDoubleBE=t?i:o;function a(u,l){return n[0]=u[l],n[1]=u[l+1],n[2]=u[l+2],n[3]=u[l+3],n[4]=u[l+4],n[5]=u[l+5],n[6]=u[l+6],n[7]=u[l+7],e[0]}function s(u,l){return n[7]=u[l],n[6]=u[l+1],n[5]=u[l+2],n[4]=u[l+3],n[3]=u[l+4],n[2]=u[l+5],n[1]=u[l+6],n[0]=u[l+7],e[0]}r.readDoubleLE=t?a:s,r.readDoubleBE=t?s:a}():function(){function e(t,o,i,a,s,u){var l=a<0?1:0;if(l&&(a=-a),a===0)t(0,s,u+o),t(1/a>0?0:2147483648,s,u+i);else if(isNaN(a))t(0,s,u+o),t(2146959360,s,u+i);else if(a>17976931348623157e292)t(0,s,u+o),t((l<<31|2146435072)>>>0,s,u+i);else{var d;if(a<22250738585072014e-324)d=a/5e-324,t(d>>>0,s,u+o),t((l<<31|d/4294967296)>>>0,s,u+i);else{var f=Math.floor(Math.log(a)/Math.LN2);f===1024&&(f=1023),d=a*Math.pow(2,-f),t(d*4503599627370496>>>0,s,u+o),t((l<<31|f+1023<<20|d*1048576&1048575)>>>0,s,u+i)}}}r.writeDoubleLE=e.bind(null,Ef,0,4),r.writeDoubleBE=e.bind(null,Cf,4,0);function n(t,o,i,a,s){var u=t(a,s+o),l=t(a,s+i),d=(l>>31)*2+1,f=l>>>20&2047,h=4294967296*(l&1048575)+u;return f===2047?h?NaN:d*(1/0):f===0?d*5e-324*h:d*Math.pow(2,f-1075)*(h+4503599627370496)}r.readDoubleLE=n.bind(null,Df,0,4),r.readDoubleBE=n.bind(null,kf,4,0)}(),r}function Ef(r,e,n){e[n]=r&255,e[n+1]=r>>>8&255,e[n+2]=r>>>16&255,e[n+3]=r>>>24}function Cf(r,e,n){e[n]=r>>>24,e[n+1]=r>>>16&255,e[n+2]=r>>>8&255,e[n+3]=r&255}function Df(r,e){return(r[e]|r[e+1]<<8|r[e+2]<<16|r[e+3]<<24)>>>0}function kf(r,e){return(r[e]<<24|r[e+1]<<16|r[e+2]<<8|r[e+3])>>>0}});var Rf=oe((exports,module)=>{"use strict";module.exports=inquire;function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(r){}return null}});var Mf=oe(zf=>{"use strict";var il=zf;il.length=function(e){for(var n=0,t=0,o=0;o<e.length;++o)t=e.charCodeAt(o),t<128?n+=1:t<2048?n+=2:(t&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320?(++o,n+=4):n+=3;return n};il.read=function(e,n,t){var o=t-n;if(o<1)return"";for(var i=null,a=[],s=0,u;n<t;)u=e[n++],u<128?a[s++]=u:u>191&&u<224?a[s++]=(u&31)<<6|e[n++]&63:u>239&&u<365?(u=((u&7)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,a[s++]=55296+(u>>10),a[s++]=56320+(u&1023)):a[s++]=(u&15)<<12|(e[n++]&63)<<6|e[n++]&63,s>8191&&((i||(i=[])).push(String.fromCharCode.apply(String,a)),s=0);return i?(s&&i.push(String.fromCharCode.apply(String,a.slice(0,s))),i.join("")):String.fromCharCode.apply(String,a.slice(0,s))};il.write=function(e,n,t){for(var o=t,i,a,s=0;s<e.length;++s)i=e.charCodeAt(s),i<128?n[t++]=i:i<2048?(n[t++]=i>>6|192,n[t++]=i&63|128):(i&64512)===55296&&((a=e.charCodeAt(s+1))&64512)===56320?(i=65536+((i&1023)<<10)+(a&1023),++s,n[t++]=i>>18|240,n[t++]=i>>12&63|128,n[t++]=i>>6&63|128,n[t++]=i&63|128):(n[t++]=i>>12|224,n[t++]=i>>6&63|128,n[t++]=i&63|128);return t-o}});var Ff=oe((HD,Bf)=>{"use strict";Bf.exports=pS;function pS(r,e,n){var t=n||8192,o=t>>>1,i=null,a=t;return function(u){if(u<1||u>o)return r(u);a+u>t&&(i=r(t),a=0);var l=e.call(i,a,a+=u);return a&7&&(a=(a|7)+1),l}}});var Gf=oe((jD,Vf)=>{"use strict";Vf.exports=ut;var Ao=hr();function ut(r,e){this.lo=r>>>0,this.hi=e>>>0}var Cr=ut.zero=new ut(0,0);Cr.toNumber=function(){return 0};Cr.zzEncode=Cr.zzDecode=function(){return this};Cr.length=function(){return 1};var fS=ut.zeroHash="\0\0\0\0\0\0\0\0";ut.fromNumber=function(e){if(e===0)return Cr;var n=e<0;n&&(e=-e);var t=e>>>0,o=(e-t)/4294967296>>>0;return n&&(o=~o>>>0,t=~t>>>0,++t>4294967295&&(t=0,++o>4294967295&&(o=0))),new ut(t,o)};ut.from=function(e){if(typeof e=="number")return ut.fromNumber(e);if(Ao.isString(e))if(Ao.Long)e=Ao.Long.fromString(e);else return ut.fromNumber(parseInt(e,10));return e.low||e.high?new ut(e.low>>>0,e.high>>>0):Cr};ut.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var n=~this.lo+1>>>0,t=~this.hi>>>0;return n||(t=t+1>>>0),-(n+t*4294967296)}return this.lo+this.hi*4294967296};ut.prototype.toLong=function(e){return Ao.Long?new Ao.Long(this.lo|0,this.hi|0,!!e):{low:this.lo|0,high:this.hi|0,unsigned:!!e}};var fr=String.prototype.charCodeAt;ut.fromHash=function(e){return e===fS?Cr:new ut((fr.call(e,0)|fr.call(e,1)<<8|fr.call(e,2)<<16|fr.call(e,3)<<24)>>>0,(fr.call(e,4)|fr.call(e,5)<<8|fr.call(e,6)<<16|fr.call(e,7)<<24)>>>0)};ut.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)};ut.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this};ut.prototype.zzDecode=function(){var e=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this};ut.prototype.length=function(){var e=this.lo,n=(this.lo>>>28|this.hi<<4)>>>0,t=this.hi>>>24;return t===0?n===0?e<16384?e<128?1:2:e<2097152?3:4:n<16384?n<128?5:6:n<2097152?7:8:t<128?9:10}});var hr=oe(al=>{"use strict";var se=al;se.asPromise=xf();se.base64=$f();se.EventEmitter=Of();se.float=Lf();se.inquire=Rf();se.utf8=Mf();se.pool=Ff();se.LongBits=Gf();se.isNode=!!(typeof global<"u"&&global&&global.process&&global.process.versions&&global.process.versions.node);se.global=se.isNode&&global||typeof window<"u"&&window||typeof self<"u"&&self||al;se.emptyArray=Object.freeze?Object.freeze([]):[];se.emptyObject=Object.freeze?Object.freeze({}):{};se.isInteger=Number.isInteger||function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e};se.isString=function(e){return typeof e=="string"||e instanceof String};se.isObject=function(e){return e&&typeof e=="object"};se.isset=se.isSet=function(e,n){var t=e[n];return t!=null&&e.hasOwnProperty(n)?typeof t!="object"||(Array.isArray(t)?t.length:Object.keys(t).length)>0:!1};se.Buffer=function(){try{var r=se.inquire("buffer").Buffer;return r.prototype.utf8Write?r:null}catch{return null}}();se._Buffer_from=null;se._Buffer_allocUnsafe=null;se.newBuffer=function(e){return typeof e=="number"?se.Buffer?se._Buffer_allocUnsafe(e):new se.Array(e):se.Buffer?se._Buffer_from(e):typeof Uint8Array>"u"?e:new Uint8Array(e)};se.Array=typeof Uint8Array<"u"?Uint8Array:Array;se.Long=se.global.dcodeIO&&se.global.dcodeIO.Long||se.global.Long||se.inquire("long");se.key2Re=/^true|false|0|1$/;se.key32Re=/^-?(?:0|[1-9][0-9]*)$/;se.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;se.longToHash=function(e){return e?se.LongBits.from(e).toHash():se.LongBits.zeroHash};se.longFromHash=function(e,n){var t=se.LongBits.fromHash(e);return se.Long?se.Long.fromBits(t.lo,t.hi,n):t.toNumber(!!n)};function Uf(r,e,n){for(var t=Object.keys(e),o=0;o<t.length;++o)(r[t[o]]===void 0||!n)&&(r[t[o]]=e[t[o]]);return r}se.merge=Uf;se.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)};function Wf(r){function e(n,t){if(!(this instanceof e))return new e(n,t);Object.defineProperty(this,"message",{get:function(){return n}}),Error.captureStackTrace?Error.captureStackTrace(this,e):Object.defineProperty(this,"stack",{value:new Error().stack||""}),t&&Uf(this,t)}return e.prototype=Object.create(Error.prototype,{constructor:{value:e,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return r},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),e}se.newError=Wf;se.ProtocolError=Wf("ProtocolError");se.oneOfGetter=function(e){for(var n={},t=0;t<e.length;++t)n[e[t]]=1;return function(){for(var o=Object.keys(this),i=o.length-1;i>-1;--i)if(n[o[i]]===1&&this[o[i]]!==void 0&&this[o[i]]!==null)return o[i]}};se.oneOfSetter=function(e){return function(n){for(var t=0;t<e.length;++t)e[t]!==n&&delete this[e[t]]}};se.toJSONOptions={longs:String,enums:String,bytes:String,json:!0};se._configure=function(){var r=se.Buffer;if(!r){se._Buffer_from=se._Buffer_allocUnsafe=null;return}se._Buffer_from=r.from!==Uint8Array.from&&r.from||function(n,t){return new r(n,t)},se._Buffer_allocUnsafe=r.allocUnsafe||function(n){return new r(n)}}});var fl=oe((KD,Kf)=>{"use strict";Kf.exports=De;var Rt=hr(),sl,ki=Rt.LongBits,Hf=Rt.base64,jf=Rt.utf8;function Oo(r,e,n){this.fn=r,this.len=e,this.next=void 0,this.val=n}function ll(){}function hS(r){this.head=r.head,this.tail=r.tail,this.len=r.len,this.next=r.states}function De(){this.len=0,this.head=new Oo(ll,0,0),this.tail=this.head,this.states=null}var qf=function(){return Rt.Buffer?function(){return(De.create=function(){return new sl})()}:function(){return new De}};De.create=qf();De.alloc=function(e){return new Rt.Array(e)};Rt.Array!==Array&&(De.alloc=Rt.pool(De.alloc,Rt.Array.prototype.subarray));De.prototype._push=function(e,n,t){return this.tail=this.tail.next=new Oo(e,n,t),this.len+=n,this};function cl(r,e,n){e[n]=r&255}function mS(r,e,n){for(;r>127;)e[n++]=r&127|128,r>>>=7;e[n]=r}function dl(r,e){this.len=r,this.next=void 0,this.val=e}dl.prototype=Object.create(Oo.prototype);dl.prototype.fn=mS;De.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new dl((e=e>>>0)<128?1:e<16384?2:e<2097152?3:e<268435456?4:5,e)).len,this};De.prototype.int32=function(e){return e<0?this._push(pl,10,ki.fromNumber(e)):this.uint32(e)};De.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)};function pl(r,e,n){for(;r.hi;)e[n++]=r.lo&127|128,r.lo=(r.lo>>>7|r.hi<<25)>>>0,r.hi>>>=7;for(;r.lo>127;)e[n++]=r.lo&127|128,r.lo=r.lo>>>7;e[n++]=r.lo}De.prototype.uint64=function(e){var n=ki.from(e);return this._push(pl,n.length(),n)};De.prototype.int64=De.prototype.uint64;De.prototype.sint64=function(e){var n=ki.from(e).zzEncode();return this._push(pl,n.length(),n)};De.prototype.bool=function(e){return this._push(cl,1,e?1:0)};function ul(r,e,n){e[n]=r&255,e[n+1]=r>>>8&255,e[n+2]=r>>>16&255,e[n+3]=r>>>24}De.prototype.fixed32=function(e){return this._push(ul,4,e>>>0)};De.prototype.sfixed32=De.prototype.fixed32;De.prototype.fixed64=function(e){var n=ki.from(e);return this._push(ul,4,n.lo)._push(ul,4,n.hi)};De.prototype.sfixed64=De.prototype.fixed64;De.prototype.float=function(e){return this._push(Rt.float.writeFloatLE,4,e)};De.prototype.double=function(e){return this._push(Rt.float.writeDoubleLE,8,e)};var gS=Rt.Array.prototype.set?function(e,n,t){n.set(e,t)}:function(e,n,t){for(var o=0;o<e.length;++o)n[t+o]=e[o]};De.prototype.bytes=function(e){var n=e.length>>>0;if(!n)return this._push(cl,1,0);if(Rt.isString(e)){var t=De.alloc(n=Hf.length(e));Hf.decode(e,t,0),e=t}return this.uint32(n)._push(gS,n,e)};De.prototype.string=function(e){var n=jf.length(e);return n?this.uint32(n)._push(jf.write,n,e):this._push(cl,1,0)};De.prototype.fork=function(){return this.states=new hS(this),this.head=this.tail=new Oo(ll,0,0),this.len=0,this};De.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new Oo(ll,0,0),this.len=0),this};De.prototype.ldelim=function(){var e=this.head,n=this.tail,t=this.len;return this.reset().uint32(t),t&&(this.tail.next=e.next,this.tail=n,this.len+=t),this};De.prototype.finish=function(){for(var e=this.head.next,n=this.constructor.alloc(this.len),t=0;e;)e.fn(e.val,n,t),t+=e.len,e=e.next;return n};De._configure=function(r){sl=r,De.create=qf(),sl._configure()}});var Jf=oe((XD,Zf)=>{"use strict";Zf.exports=kn;var Xf=fl();(kn.prototype=Object.create(Xf.prototype)).constructor=kn;var mr=hr();function kn(){Xf.call(this)}kn._configure=function(){kn.alloc=mr._Buffer_allocUnsafe,kn.writeBytesBuffer=mr.Buffer&&mr.Buffer.prototype instanceof Uint8Array&&mr.Buffer.prototype.set.name==="set"?function(e,n,t){n.set(e,t)}:function(e,n,t){if(e.copy)e.copy(n,t,0,e.length);else for(var o=0;o<e.length;)n[t++]=e[o++]}};kn.prototype.bytes=function(e){mr.isString(e)&&(e=mr._Buffer_from(e,"base64"));var n=e.length>>>0;return this.uint32(n),n&&this._push(kn.writeBytesBuffer,n,e),this};function bS(r,e,n){r.length<40?mr.utf8.write(r,e,n):e.utf8Write?e.utf8Write(r,n):e.write(r,n)}kn.prototype.string=function(e){var n=mr.Buffer.byteLength(e);return this.uint32(n),n&&this._push(bS,n,e),this};kn._configure()});var gl=oe((ZD,nh)=>{"use strict";nh.exports=Ye;var Ht=hr(),ml,eh=Ht.LongBits,yS=Ht.utf8;function jt(r,e){return RangeError("index out of range: "+r.pos+" + "+(e||1)+" > "+r.len)}function Ye(r){this.buf=r,this.pos=0,this.len=r.length}var Yf=typeof Uint8Array<"u"?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new Ye(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new Ye(e);throw Error("illegal buffer")},th=function(){return Ht.Buffer?function(n){return(Ye.create=function(o){return Ht.Buffer.isBuffer(o)?new ml(o):Yf(o)})(n)}:Yf};Ye.create=th();Ye.prototype._slice=Ht.Array.prototype.subarray||Ht.Array.prototype.slice;Ye.prototype.uint32=function(){var e=4294967295;return function(){if(e=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(e=(e|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return e;if((this.pos+=5)>this.len)throw this.pos=this.len,jt(this,10);return e}}();Ye.prototype.int32=function(){return this.uint32()|0};Ye.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(e&1)|0};function hl(){var r=new eh(0,0),e=0;if(this.len-this.pos>4){for(;e<4;++e)if(r.lo=(r.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return r;if(r.lo=(r.lo|(this.buf[this.pos]&127)<<28)>>>0,r.hi=(r.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return r;e=0}else{for(;e<3;++e){if(this.pos>=this.len)throw jt(this);if(r.lo=(r.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return r}return r.lo=(r.lo|(this.buf[this.pos++]&127)<<e*7)>>>0,r}if(this.len-this.pos>4){for(;e<5;++e)if(r.hi=(r.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return r}else for(;e<5;++e){if(this.pos>=this.len)throw jt(this);if(r.hi=(r.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return r}throw Error("invalid varint encoding")}Ye.prototype.bool=function(){return this.uint32()!==0};function Ni(r,e){return(r[e-4]|r[e-3]<<8|r[e-2]<<16|r[e-1]<<24)>>>0}Ye.prototype.fixed32=function(){if(this.pos+4>this.len)throw jt(this,4);return Ni(this.buf,this.pos+=4)};Ye.prototype.sfixed32=function(){if(this.pos+4>this.len)throw jt(this,4);return Ni(this.buf,this.pos+=4)|0};function Qf(){if(this.pos+8>this.len)throw jt(this,8);return new eh(Ni(this.buf,this.pos+=4),Ni(this.buf,this.pos+=4))}Ye.prototype.float=function(){if(this.pos+4>this.len)throw jt(this,4);var e=Ht.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e};Ye.prototype.double=function(){if(this.pos+8>this.len)throw jt(this,4);var e=Ht.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e};Ye.prototype.bytes=function(){var e=this.uint32(),n=this.pos,t=this.pos+e;if(t>this.len)throw jt(this,e);if(this.pos+=e,Array.isArray(this.buf))return this.buf.slice(n,t);if(n===t){var o=Ht.Buffer;return o?o.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,n,t)};Ye.prototype.string=function(){var e=this.bytes();return yS.read(e,0,e.length)};Ye.prototype.skip=function(e){if(typeof e=="number"){if(this.pos+e>this.len)throw jt(this,e);this.pos+=e}else do if(this.pos>=this.len)throw jt(this);while(this.buf[this.pos++]&128);return this};Ye.prototype.skipType=function(r){switch(r){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(r=this.uint32()&7)!==4;)this.skipType(r);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+r+" at offset "+this.pos)}return this};Ye._configure=function(r){ml=r,Ye.create=th(),ml._configure();var e=Ht.Long?"toLong":"toNumber";Ht.merge(Ye.prototype,{int64:function(){return hl.call(this)[e](!1)},uint64:function(){return hl.call(this)[e](!0)},sint64:function(){return hl.call(this).zzDecode()[e](!1)},fixed64:function(){return Qf.call(this)[e](!0)},sfixed64:function(){return Qf.call(this)[e](!1)}})}});var ah=oe((JD,ih)=>{"use strict";ih.exports=Dr;var oh=gl();(Dr.prototype=Object.create(oh.prototype)).constructor=Dr;var rh=hr();function Dr(r){oh.call(this,r)}Dr._configure=function(){rh.Buffer&&(Dr.prototype._slice=rh.Buffer.prototype.slice)};Dr.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+e,this.len))};Dr._configure()});var uh=oe((YD,sh)=>{"use strict";sh.exports=Po;var bl=hr();(Po.prototype=Object.create(bl.EventEmitter.prototype)).constructor=Po;function Po(r,e,n){if(typeof r!="function")throw TypeError("rpcImpl must be a function");bl.EventEmitter.call(this),this.rpcImpl=r,this.requestDelimited=!!e,this.responseDelimited=!!n}Po.prototype.rpcCall=function r(e,n,t,o,i){if(!o)throw TypeError("request must be specified");var a=this;if(!i)return bl.asPromise(r,a,e,n,t,o);if(!a.rpcImpl){setTimeout(function(){i(Error("already ended"))},0);return}try{return a.rpcImpl(e,n[a.requestDelimited?"encodeDelimited":"encode"](o).finish(),function(u,l){if(u)return a.emit("error",u,e),i(u);if(l===null){a.end(!0);return}if(!(l instanceof t))try{l=t[a.responseDelimited?"decodeDelimited":"decode"](l)}catch(d){return a.emit("error",d,e),i(d)}return a.emit("data",l,e),i(null,l)})}catch(s){a.emit("error",s,e),setTimeout(function(){i(s)},0);return}};Po.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}});var ch=oe(lh=>{"use strict";var _S=lh;_S.Service=uh()});var ph=oe((ek,dh)=>{"use strict";dh.exports={}});var mh=oe(hh=>{"use strict";var wt=hh;wt.build="minimal";wt.Writer=fl();wt.BufferWriter=Jf();wt.Reader=gl();wt.BufferReader=ah();wt.util=hr();wt.rpc=ch();wt.roots=ph();wt.configure=fh;function fh(){wt.util._configure(),wt.Writer._configure(wt.BufferWriter),wt.Reader._configure(wt.BufferReader)}fh()});var bh=oe((nk,gh)=>{"use strict";gh.exports=mh()});var to=oe((rk,yh)=>{"use strict";var Ue=bh(),X=Ue.Reader,Qe=Ue.Writer,P=Ue.util,S=Ue.roots.default||(Ue.roots.default={});S.onnx=function(){var r={};return r.Version=function(){var e={},n=Object.create(e);return n[e[0]="_START_VERSION"]=0,n[e[1]="IR_VERSION_2017_10_10"]=1,n[e[2]="IR_VERSION_2017_10_30"]=2,n[e[3]="IR_VERSION_2017_11_3"]=3,n[e[4]="IR_VERSION_2019_1_22"]=4,n[e[5]="IR_VERSION_2019_3_18"]=5,n[e[6]="IR_VERSION_2019_9_19"]=6,n[e[7]="IR_VERSION_2020_5_8"]=7,n[e[8]="IR_VERSION_2021_7_30"]=8,n[e[9]="IR_VERSION"]=9,n}(),r.AttributeProto=function(){function e(n){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.refAttrName="",e.prototype.docString="",e.prototype.type=0,e.prototype.f=0,e.prototype.i=P.Long?P.Long.fromBits(0,0,!1):0,e.prototype.s=P.newBuffer([]),e.prototype.t=null,e.prototype.g=null,e.prototype.sparseTensor=null,e.prototype.tp=null,e.prototype.floats=P.emptyArray,e.prototype.ints=P.emptyArray,e.prototype.strings=P.emptyArray,e.prototype.tensors=P.emptyArray,e.prototype.graphs=P.emptyArray,e.prototype.sparseTensors=P.emptyArray,e.prototype.typeProtos=P.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Qe.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.f!=null&&Object.hasOwnProperty.call(t,"f")&&o.uint32(21).float(t.f),t.i!=null&&Object.hasOwnProperty.call(t,"i")&&o.uint32(24).int64(t.i),t.s!=null&&Object.hasOwnProperty.call(t,"s")&&o.uint32(34).bytes(t.s),t.t!=null&&Object.hasOwnProperty.call(t,"t")&&S.onnx.TensorProto.encode(t.t,o.uint32(42).fork()).ldelim(),t.g!=null&&Object.hasOwnProperty.call(t,"g")&&S.onnx.GraphProto.encode(t.g,o.uint32(50).fork()).ldelim(),t.floats!=null&&t.floats.length){o.uint32(58).fork();for(var i=0;i<t.floats.length;++i)o.float(t.floats[i]);o.ldelim()}if(t.ints!=null&&t.ints.length){o.uint32(66).fork();for(var i=0;i<t.ints.length;++i)o.int64(t.ints[i]);o.ldelim()}if(t.strings!=null&&t.strings.length)for(var i=0;i<t.strings.length;++i)o.uint32(74).bytes(t.strings[i]);if(t.tensors!=null&&t.tensors.length)for(var i=0;i<t.tensors.length;++i)S.onnx.TensorProto.encode(t.tensors[i],o.uint32(82).fork()).ldelim();if(t.graphs!=null&&t.graphs.length)for(var i=0;i<t.graphs.length;++i)S.onnx.GraphProto.encode(t.graphs[i],o.uint32(90).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(106).string(t.docString),t.tp!=null&&Object.hasOwnProperty.call(t,"tp")&&S.onnx.TypeProto.encode(t.tp,o.uint32(114).fork()).ldelim(),t.typeProtos!=null&&t.typeProtos.length)for(var i=0;i<t.typeProtos.length;++i)S.onnx.TypeProto.encode(t.typeProtos[i],o.uint32(122).fork()).ldelim();if(t.type!=null&&Object.hasOwnProperty.call(t,"type")&&o.uint32(160).int32(t.type),t.refAttrName!=null&&Object.hasOwnProperty.call(t,"refAttrName")&&o.uint32(170).string(t.refAttrName),t.sparseTensor!=null&&Object.hasOwnProperty.call(t,"sparseTensor")&&S.onnx.SparseTensorProto.encode(t.sparseTensor,o.uint32(178).fork()).ldelim(),t.sparseTensors!=null&&t.sparseTensors.length)for(var i=0;i<t.sparseTensors.length;++i)S.onnx.SparseTensorProto.encode(t.sparseTensors[i],o.uint32(186).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof X||(t=X.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.AttributeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 21:{a.refAttrName=t.string();break}case 13:{a.docString=t.string();break}case 20:{a.type=t.int32();break}case 2:{a.f=t.float();break}case 3:{a.i=t.int64();break}case 4:{a.s=t.bytes();break}case 5:{a.t=S.onnx.TensorProto.decode(t,t.uint32());break}case 6:{a.g=S.onnx.GraphProto.decode(t,t.uint32());break}case 22:{a.sparseTensor=S.onnx.SparseTensorProto.decode(t,t.uint32());break}case 14:{a.tp=S.onnx.TypeProto.decode(t,t.uint32());break}case 7:{if(a.floats&&a.floats.length||(a.floats=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.floats.push(t.float());else a.floats.push(t.float());break}case 8:{if(a.ints&&a.ints.length||(a.ints=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.ints.push(t.int64());else a.ints.push(t.int64());break}case 9:{a.strings&&a.strings.length||(a.strings=[]),a.strings.push(t.bytes());break}case 10:{a.tensors&&a.tensors.length||(a.tensors=[]),a.tensors.push(S.onnx.TensorProto.decode(t,t.uint32()));break}case 11:{a.graphs&&a.graphs.length||(a.graphs=[]),a.graphs.push(S.onnx.GraphProto.decode(t,t.uint32()));break}case 23:{a.sparseTensors&&a.sparseTensors.length||(a.sparseTensors=[]),a.sparseTensors.push(S.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 15:{a.typeProtos&&a.typeProtos.length||(a.typeProtos=[]),a.typeProtos.push(S.onnx.TypeProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof X||(t=new X(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!P.isString(t.name))return"name: string expected";if(t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&!P.isString(t.refAttrName))return"refAttrName: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!P.isString(t.docString))return"docString: string expected";if(t.type!=null&&t.hasOwnProperty("type"))switch(t.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:break}if(t.f!=null&&t.hasOwnProperty("f")&&typeof t.f!="number")return"f: number expected";if(t.i!=null&&t.hasOwnProperty("i")&&!P.isInteger(t.i)&&!(t.i&&P.isInteger(t.i.low)&&P.isInteger(t.i.high)))return"i: integer|Long expected";if(t.s!=null&&t.hasOwnProperty("s")&&!(t.s&&typeof t.s.length=="number"||P.isString(t.s)))return"s: buffer expected";if(t.t!=null&&t.hasOwnProperty("t")){var o=S.onnx.TensorProto.verify(t.t);if(o)return"t."+o}if(t.g!=null&&t.hasOwnProperty("g")){var o=S.onnx.GraphProto.verify(t.g);if(o)return"g."+o}if(t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")){var o=S.onnx.SparseTensorProto.verify(t.sparseTensor);if(o)return"sparseTensor."+o}if(t.tp!=null&&t.hasOwnProperty("tp")){var o=S.onnx.TypeProto.verify(t.tp);if(o)return"tp."+o}if(t.floats!=null&&t.hasOwnProperty("floats")){if(!Array.isArray(t.floats))return"floats: array expected";for(var i=0;i<t.floats.length;++i)if(typeof t.floats[i]!="number")return"floats: number[] expected"}if(t.ints!=null&&t.hasOwnProperty("ints")){if(!Array.isArray(t.ints))return"ints: array expected";for(var i=0;i<t.ints.length;++i)if(!P.isInteger(t.ints[i])&&!(t.ints[i]&&P.isInteger(t.ints[i].low)&&P.isInteger(t.ints[i].high)))return"ints: integer|Long[] expected"}if(t.strings!=null&&t.hasOwnProperty("strings")){if(!Array.isArray(t.strings))return"strings: array expected";for(var i=0;i<t.strings.length;++i)if(!(t.strings[i]&&typeof t.strings[i].length=="number"||P.isString(t.strings[i])))return"strings: buffer[] expected"}if(t.tensors!=null&&t.hasOwnProperty("tensors")){if(!Array.isArray(t.tensors))return"tensors: array expected";for(var i=0;i<t.tensors.length;++i){var o=S.onnx.TensorProto.verify(t.tensors[i]);if(o)return"tensors."+o}}if(t.graphs!=null&&t.hasOwnProperty("graphs")){if(!Array.isArray(t.graphs))return"graphs: array expected";for(var i=0;i<t.graphs.length;++i){var o=S.onnx.GraphProto.verify(t.graphs[i]);if(o)return"graphs."+o}}if(t.sparseTensors!=null&&t.hasOwnProperty("sparseTensors")){if(!Array.isArray(t.sparseTensors))return"sparseTensors: array expected";for(var i=0;i<t.sparseTensors.length;++i){var o=S.onnx.SparseTensorProto.verify(t.sparseTensors[i]);if(o)return"sparseTensors."+o}}if(t.typeProtos!=null&&t.hasOwnProperty("typeProtos")){if(!Array.isArray(t.typeProtos))return"typeProtos: array expected";for(var i=0;i<t.typeProtos.length;++i){var o=S.onnx.TypeProto.verify(t.typeProtos[i]);if(o)return"typeProtos."+o}}return null},e.fromObject=function(t){if(t instanceof S.onnx.AttributeProto)return t;var o=new S.onnx.AttributeProto;switch(t.name!=null&&(o.name=String(t.name)),t.refAttrName!=null&&(o.refAttrName=String(t.refAttrName)),t.docString!=null&&(o.docString=String(t.docString)),t.type){default:if(typeof t.type=="number"){o.type=t.type;break}break;case"UNDEFINED":case 0:o.type=0;break;case"FLOAT":case 1:o.type=1;break;case"INT":case 2:o.type=2;break;case"STRING":case 3:o.type=3;break;case"TENSOR":case 4:o.type=4;break;case"GRAPH":case 5:o.type=5;break;case"SPARSE_TENSOR":case 11:o.type=11;break;case"TYPE_PROTO":case 13:o.type=13;break;case"FLOATS":case 6:o.type=6;break;case"INTS":case 7:o.type=7;break;case"STRINGS":case 8:o.type=8;break;case"TENSORS":case 9:o.type=9;break;case"GRAPHS":case 10:o.type=10;break;case"SPARSE_TENSORS":case 12:o.type=12;break;case"TYPE_PROTOS":case 14:o.type=14;break}if(t.f!=null&&(o.f=Number(t.f)),t.i!=null&&(P.Long?(o.i=P.Long.fromValue(t.i)).unsigned=!1:typeof t.i=="string"?o.i=parseInt(t.i,10):typeof t.i=="number"?o.i=t.i:typeof t.i=="object"&&(o.i=new P.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber())),t.s!=null&&(typeof t.s=="string"?P.base64.decode(t.s,o.s=P.newBuffer(P.base64.length(t.s)),0):t.s.length>=0&&(o.s=t.s)),t.t!=null){if(typeof t.t!="object")throw TypeError(".onnx.AttributeProto.t: object expected");o.t=S.onnx.TensorProto.fromObject(t.t)}if(t.g!=null){if(typeof t.g!="object")throw TypeError(".onnx.AttributeProto.g: object expected");o.g=S.onnx.GraphProto.fromObject(t.g)}if(t.sparseTensor!=null){if(typeof t.sparseTensor!="object")throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");o.sparseTensor=S.onnx.SparseTensorProto.fromObject(t.sparseTensor)}if(t.tp!=null){if(typeof t.tp!="object")throw TypeError(".onnx.AttributeProto.tp: object expected");o.tp=S.onnx.TypeProto.fromObject(t.tp)}if(t.floats){if(!Array.isArray(t.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");o.floats=[];for(var i=0;i<t.floats.length;++i)o.floats[i]=Number(t.floats[i])}if(t.ints){if(!Array.isArray(t.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");o.ints=[];for(var i=0;i<t.ints.length;++i)P.Long?(o.ints[i]=P.Long.fromValue(t.ints[i])).unsigned=!1:typeof t.ints[i]=="string"?o.ints[i]=parseInt(t.ints[i],10):typeof t.ints[i]=="number"?o.ints[i]=t.ints[i]:typeof t.ints[i]=="object"&&(o.ints[i]=new P.LongBits(t.ints[i].low>>>0,t.ints[i].high>>>0).toNumber())}if(t.strings){if(!Array.isArray(t.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");o.strings=[];for(var i=0;i<t.strings.length;++i)typeof t.strings[i]=="string"?P.base64.decode(t.strings[i],o.strings[i]=P.newBuffer(P.base64.length(t.strings[i])),0):t.strings[i].length>=0&&(o.strings[i]=t.strings[i])}if(t.tensors){if(!Array.isArray(t.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");o.tensors=[];for(var i=0;i<t.tensors.length;++i){if(typeof t.tensors[i]!="object")throw TypeError(".onnx.AttributeProto.tensors: object expected");o.tensors[i]=S.onnx.TensorProto.fromObject(t.tensors[i])}}if(t.graphs){if(!Array.isArray(t.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");o.graphs=[];for(var i=0;i<t.graphs.length;++i){if(typeof t.graphs[i]!="object")throw TypeError(".onnx.AttributeProto.graphs: object expected");o.graphs[i]=S.onnx.GraphProto.fromObject(t.graphs[i])}}if(t.sparseTensors){if(!Array.isArray(t.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");o.sparseTensors=[];for(var i=0;i<t.sparseTensors.length;++i){if(typeof t.sparseTensors[i]!="object")throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");o.sparseTensors[i]=S.onnx.SparseTensorProto.fromObject(t.sparseTensors[i])}}if(t.typeProtos){if(!Array.isArray(t.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");o.typeProtos=[];for(var i=0;i<t.typeProtos.length;++i){if(typeof t.typeProtos[i]!="object")throw TypeError(".onnx.AttributeProto.typeProtos: object expected");o.typeProtos[i]=S.onnx.TypeProto.fromObject(t.typeProtos[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.floats=[],i.ints=[],i.strings=[],i.tensors=[],i.graphs=[],i.typeProtos=[],i.sparseTensors=[]),o.defaults){if(i.name="",i.f=0,P.Long){var a=new P.Long(0,0,!1);i.i=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.i=o.longs===String?"0":0;o.bytes===String?i.s="":(i.s=[],o.bytes!==Array&&(i.s=P.newBuffer(i.s))),i.t=null,i.g=null,i.docString="",i.tp=null,i.type=o.enums===String?"UNDEFINED":0,i.refAttrName="",i.sparseTensor=null}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.f!=null&&t.hasOwnProperty("f")&&(i.f=o.json&&!isFinite(t.f)?String(t.f):t.f),t.i!=null&&t.hasOwnProperty("i")&&(typeof t.i=="number"?i.i=o.longs===String?String(t.i):t.i:i.i=o.longs===String?P.Long.prototype.toString.call(t.i):o.longs===Number?new P.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber():t.i),t.s!=null&&t.hasOwnProperty("s")&&(i.s=o.bytes===String?P.base64.encode(t.s,0,t.s.length):o.bytes===Array?Array.prototype.slice.call(t.s):t.s),t.t!=null&&t.hasOwnProperty("t")&&(i.t=S.onnx.TensorProto.toObject(t.t,o)),t.g!=null&&t.hasOwnProperty("g")&&(i.g=S.onnx.GraphProto.toObject(t.g,o)),t.floats&&t.floats.length){i.floats=[];for(var s=0;s<t.floats.length;++s)i.floats[s]=o.json&&!isFinite(t.floats[s])?String(t.floats[s]):t.floats[s]}if(t.ints&&t.ints.length){i.ints=[];for(var s=0;s<t.ints.length;++s)typeof t.ints[s]=="number"?i.ints[s]=o.longs===String?String(t.ints[s]):t.ints[s]:i.ints[s]=o.longs===String?P.Long.prototype.toString.call(t.ints[s]):o.longs===Number?new P.LongBits(t.ints[s].low>>>0,t.ints[s].high>>>0).toNumber():t.ints[s]}if(t.strings&&t.strings.length){i.strings=[];for(var s=0;s<t.strings.length;++s)i.strings[s]=o.bytes===String?P.base64.encode(t.strings[s],0,t.strings[s].length):o.bytes===Array?Array.prototype.slice.call(t.strings[s]):t.strings[s]}if(t.tensors&&t.tensors.length){i.tensors=[];for(var s=0;s<t.tensors.length;++s)i.tensors[s]=S.onnx.TensorProto.toObject(t.tensors[s],o)}if(t.graphs&&t.graphs.length){i.graphs=[];for(var s=0;s<t.graphs.length;++s)i.graphs[s]=S.onnx.GraphProto.toObject(t.graphs[s],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.tp!=null&&t.hasOwnProperty("tp")&&(i.tp=S.onnx.TypeProto.toObject(t.tp,o)),t.typeProtos&&t.typeProtos.length){i.typeProtos=[];for(var s=0;s<t.typeProtos.length;++s)i.typeProtos[s]=S.onnx.TypeProto.toObject(t.typeProtos[s],o)}if(t.type!=null&&t.hasOwnProperty("type")&&(i.type=o.enums===String?S.onnx.AttributeProto.AttributeType[t.type]===void 0?t.type:S.onnx.AttributeProto.AttributeType[t.type]:t.type),t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&(i.refAttrName=t.refAttrName),t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")&&(i.sparseTensor=S.onnx.SparseTensorProto.toObject(t.sparseTensor,o)),t.sparseTensors&&t.sparseTensors.length){i.sparseTensors=[];for(var s=0;s<t.sparseTensors.length;++s)i.sparseTensors[s]=S.onnx.SparseTensorProto.toObject(t.sparseTensors[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.AttributeProto"},e.AttributeType=function(){var n={},t=Object.create(n);return t[n[0]="UNDEFINED"]=0,t[n[1]="FLOAT"]=1,t[n[2]="INT"]=2,t[n[3]="STRING"]=3,t[n[4]="TENSOR"]=4,t[n[5]="GRAPH"]=5,t[n[11]="SPARSE_TENSOR"]=11,t[n[13]="TYPE_PROTO"]=13,t[n[6]="FLOATS"]=6,t[n[7]="INTS"]=7,t[n[8]="STRINGS"]=8,t[n[9]="TENSORS"]=9,t[n[10]="GRAPHS"]=10,t[n[12]="SPARSE_TENSORS"]=12,t[n[14]="TYPE_PROTOS"]=14,t}(),e}(),r.ValueInfoProto=function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.type=null,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Qe.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.type!=null&&Object.hasOwnProperty.call(t,"type")&&S.onnx.TypeProto.encode(t.type,o.uint32(18).fork()).ldelim(),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(26).string(t.docString),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof X||(t=X.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.ValueInfoProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 2:{a.type=S.onnx.TypeProto.decode(t,t.uint32());break}case 3:{a.docString=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof X||(t=new X(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!P.isString(t.name))return"name: string expected";if(t.type!=null&&t.hasOwnProperty("type")){var o=S.onnx.TypeProto.verify(t.type);if(o)return"type."+o}return t.docString!=null&&t.hasOwnProperty("docString")&&!P.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.ValueInfoProto)return t;var o=new S.onnx.ValueInfoProto;if(t.name!=null&&(o.name=String(t.name)),t.type!=null){if(typeof t.type!="object")throw TypeError(".onnx.ValueInfoProto.type: object expected");o.type=S.onnx.TypeProto.fromObject(t.type)}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.name="",i.type=null,i.docString=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.type!=null&&t.hasOwnProperty("type")&&(i.type=S.onnx.TypeProto.toObject(t.type,o)),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ValueInfoProto"},e}(),r.NodeProto=function(){function e(n){if(this.input=[],this.output=[],this.attribute=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.input=P.emptyArray,e.prototype.output=P.emptyArray,e.prototype.name="",e.prototype.opType="",e.prototype.domain="",e.prototype.attribute=P.emptyArray,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Qe.create()),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(10).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(18).string(t.output[i]);if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(26).string(t.name),t.opType!=null&&Object.hasOwnProperty.call(t,"opType")&&o.uint32(34).string(t.opType),t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)S.onnx.AttributeProto.encode(t.attribute[i],o.uint32(42).fork()).ldelim();return t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(58).string(t.domain),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof X||(t=X.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.NodeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.input&&a.input.length||(a.input=[]),a.input.push(t.string());break}case 2:{a.output&&a.output.length||(a.output=[]),a.output.push(t.string());break}case 3:{a.name=t.string();break}case 4:{a.opType=t.string();break}case 7:{a.domain=t.string();break}case 5:{a.attribute&&a.attribute.length||(a.attribute=[]),a.attribute.push(S.onnx.AttributeProto.decode(t,t.uint32()));break}case 6:{a.docString=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof X||(t=new X(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!P.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!P.isString(t.output[o]))return"output: string[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!P.isString(t.name))return"name: string expected";if(t.opType!=null&&t.hasOwnProperty("opType")&&!P.isString(t.opType))return"opType: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!P.isString(t.domain))return"domain: string expected";if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o){var i=S.onnx.AttributeProto.verify(t.attribute[o]);if(i)return"attribute."+i}}return t.docString!=null&&t.hasOwnProperty("docString")&&!P.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.NodeProto)return t;var o=new S.onnx.NodeProto;if(t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.NodeProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.NodeProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.name!=null&&(o.name=String(t.name)),t.opType!=null&&(o.opType=String(t.opType)),t.domain!=null&&(o.domain=String(t.domain)),t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i){if(typeof t.attribute[i]!="object")throw TypeError(".onnx.NodeProto.attribute: object expected");o.attribute[i]=S.onnx.AttributeProto.fromObject(t.attribute[i])}}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[]),o.defaults&&(i.name="",i.opType="",i.docString="",i.domain=""),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=t.input[a]}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=t.output[a]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.opType!=null&&t.hasOwnProperty("opType")&&(i.opType=t.opType),t.attribute&&t.attribute.length){i.attribute=[];for(var a=0;a<t.attribute.length;++a)i.attribute[a]=S.onnx.AttributeProto.toObject(t.attribute[a],o)}return t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.NodeProto"},e}(),r.TrainingInfoProto=function(){function e(n){if(this.initializationBinding=[],this.updateBinding=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.initialization=null,e.prototype.algorithm=null,e.prototype.initializationBinding=P.emptyArray,e.prototype.updateBinding=P.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Qe.create()),t.initialization!=null&&Object.hasOwnProperty.call(t,"initialization")&&S.onnx.GraphProto.encode(t.initialization,o.uint32(10).fork()).ldelim(),t.algorithm!=null&&Object.hasOwnProperty.call(t,"algorithm")&&S.onnx.GraphProto.encode(t.algorithm,o.uint32(18).fork()).ldelim(),t.initializationBinding!=null&&t.initializationBinding.length)for(var i=0;i<t.initializationBinding.length;++i)S.onnx.StringStringEntryProto.encode(t.initializationBinding[i],o.uint32(26).fork()).ldelim();if(t.updateBinding!=null&&t.updateBinding.length)for(var i=0;i<t.updateBinding.length;++i)S.onnx.StringStringEntryProto.encode(t.updateBinding[i],o.uint32(34).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof X||(t=X.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.TrainingInfoProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.initialization=S.onnx.GraphProto.decode(t,t.uint32());break}case 2:{a.algorithm=S.onnx.GraphProto.decode(t,t.uint32());break}case 3:{a.initializationBinding&&a.initializationBinding.length||(a.initializationBinding=[]),a.initializationBinding.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 4:{a.updateBinding&&a.updateBinding.length||(a.updateBinding=[]),a.updateBinding.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof X||(t=new X(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.initialization!=null&&t.hasOwnProperty("initialization")){var o=S.onnx.GraphProto.verify(t.initialization);if(o)return"initialization."+o}if(t.algorithm!=null&&t.hasOwnProperty("algorithm")){var o=S.onnx.GraphProto.verify(t.algorithm);if(o)return"algorithm."+o}if(t.initializationBinding!=null&&t.hasOwnProperty("initializationBinding")){if(!Array.isArray(t.initializationBinding))return"initializationBinding: array expected";for(var i=0;i<t.initializationBinding.length;++i){var o=S.onnx.StringStringEntryProto.verify(t.initializationBinding[i]);if(o)return"initializationBinding."+o}}if(t.updateBinding!=null&&t.hasOwnProperty("updateBinding")){if(!Array.isArray(t.updateBinding))return"updateBinding: array expected";for(var i=0;i<t.updateBinding.length;++i){var o=S.onnx.StringStringEntryProto.verify(t.updateBinding[i]);if(o)return"updateBinding."+o}}return null},e.fromObject=function(t){if(t instanceof S.onnx.TrainingInfoProto)return t;var o=new S.onnx.TrainingInfoProto;if(t.initialization!=null){if(typeof t.initialization!="object")throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");o.initialization=S.onnx.GraphProto.fromObject(t.initialization)}if(t.algorithm!=null){if(typeof t.algorithm!="object")throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");o.algorithm=S.onnx.GraphProto.fromObject(t.algorithm)}if(t.initializationBinding){if(!Array.isArray(t.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");o.initializationBinding=[];for(var i=0;i<t.initializationBinding.length;++i){if(typeof t.initializationBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");o.initializationBinding[i]=S.onnx.StringStringEntryProto.fromObject(t.initializationBinding[i])}}if(t.updateBinding){if(!Array.isArray(t.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");o.updateBinding=[];for(var i=0;i<t.updateBinding.length;++i){if(typeof t.updateBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");o.updateBinding[i]=S.onnx.StringStringEntryProto.fromObject(t.updateBinding[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.initializationBinding=[],i.updateBinding=[]),o.defaults&&(i.initialization=null,i.algorithm=null),t.initialization!=null&&t.hasOwnProperty("initialization")&&(i.initialization=S.onnx.GraphProto.toObject(t.initialization,o)),t.algorithm!=null&&t.hasOwnProperty("algorithm")&&(i.algorithm=S.onnx.GraphProto.toObject(t.algorithm,o)),t.initializationBinding&&t.initializationBinding.length){i.initializationBinding=[];for(var a=0;a<t.initializationBinding.length;++a)i.initializationBinding[a]=S.onnx.StringStringEntryProto.toObject(t.initializationBinding[a],o)}if(t.updateBinding&&t.updateBinding.length){i.updateBinding=[];for(var a=0;a<t.updateBinding.length;++a)i.updateBinding[a]=S.onnx.StringStringEntryProto.toObject(t.updateBinding[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TrainingInfoProto"},e}(),r.ModelProto=function(){function e(n){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.irVersion=P.Long?P.Long.fromBits(0,0,!1):0,e.prototype.opsetImport=P.emptyArray,e.prototype.producerName="",e.prototype.producerVersion="",e.prototype.domain="",e.prototype.modelVersion=P.Long?P.Long.fromBits(0,0,!1):0,e.prototype.docString="",e.prototype.graph=null,e.prototype.metadataProps=P.emptyArray,e.prototype.trainingInfo=P.emptyArray,e.prototype.functions=P.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Qe.create()),t.irVersion!=null&&Object.hasOwnProperty.call(t,"irVersion")&&o.uint32(8).int64(t.irVersion),t.producerName!=null&&Object.hasOwnProperty.call(t,"producerName")&&o.uint32(18).string(t.producerName),t.producerVersion!=null&&Object.hasOwnProperty.call(t,"producerVersion")&&o.uint32(26).string(t.producerVersion),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(34).string(t.domain),t.modelVersion!=null&&Object.hasOwnProperty.call(t,"modelVersion")&&o.uint32(40).int64(t.modelVersion),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.graph!=null&&Object.hasOwnProperty.call(t,"graph")&&S.onnx.GraphProto.encode(t.graph,o.uint32(58).fork()).ldelim(),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)S.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(66).fork()).ldelim();if(t.metadataProps!=null&&t.metadataProps.length)for(var i=0;i<t.metadataProps.length;++i)S.onnx.StringStringEntryProto.encode(t.metadataProps[i],o.uint32(114).fork()).ldelim();if(t.trainingInfo!=null&&t.trainingInfo.length)for(var i=0;i<t.trainingInfo.length;++i)S.onnx.TrainingInfoProto.encode(t.trainingInfo[i],o.uint32(162).fork()).ldelim();if(t.functions!=null&&t.functions.length)for(var i=0;i<t.functions.length;++i)S.onnx.FunctionProto.encode(t.functions[i],o.uint32(202).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof X||(t=X.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.ModelProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.irVersion=t.int64();break}case 8:{a.opsetImport&&a.opsetImport.length||(a.opsetImport=[]),a.opsetImport.push(S.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 2:{a.producerName=t.string();break}case 3:{a.producerVersion=t.string();break}case 4:{a.domain=t.string();break}case 5:{a.modelVersion=t.int64();break}case 6:{a.docString=t.string();break}case 7:{a.graph=S.onnx.GraphProto.decode(t,t.uint32());break}case 14:{a.metadataProps&&a.metadataProps.length||(a.metadataProps=[]),a.metadataProps.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 20:{a.trainingInfo&&a.trainingInfo.length||(a.trainingInfo=[]),a.trainingInfo.push(S.onnx.TrainingInfoProto.decode(t,t.uint32()));break}case 25:{a.functions&&a.functions.length||(a.functions=[]),a.functions.push(S.onnx.FunctionProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof X||(t=new X(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&!P.isInteger(t.irVersion)&&!(t.irVersion&&P.isInteger(t.irVersion.low)&&P.isInteger(t.irVersion.high)))return"irVersion: integer|Long expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=S.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}if(t.producerName!=null&&t.hasOwnProperty("producerName")&&!P.isString(t.producerName))return"producerName: string expected";if(t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&!P.isString(t.producerVersion))return"producerVersion: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!P.isString(t.domain))return"domain: string expected";if(t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&!P.isInteger(t.modelVersion)&&!(t.modelVersion&&P.isInteger(t.modelVersion.low)&&P.isInteger(t.modelVersion.high)))return"modelVersion: integer|Long expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!P.isString(t.docString))return"docString: string expected";if(t.graph!=null&&t.hasOwnProperty("graph")){var i=S.onnx.GraphProto.verify(t.graph);if(i)return"graph."+i}if(t.metadataProps!=null&&t.hasOwnProperty("metadataProps")){if(!Array.isArray(t.metadataProps))return"metadataProps: array expected";for(var o=0;o<t.metadataProps.length;++o){var i=S.onnx.StringStringEntryProto.verify(t.metadataProps[o]);if(i)return"metadataProps."+i}}if(t.trainingInfo!=null&&t.hasOwnProperty("trainingInfo")){if(!Array.isArray(t.trainingInfo))return"trainingInfo: array expected";for(var o=0;o<t.trainingInfo.length;++o){var i=S.onnx.TrainingInfoProto.verify(t.trainingInfo[o]);if(i)return"trainingInfo."+i}}if(t.functions!=null&&t.hasOwnProperty("functions")){if(!Array.isArray(t.functions))return"functions: array expected";for(var o=0;o<t.functions.length;++o){var i=S.onnx.FunctionProto.verify(t.functions[o]);if(i)return"functions."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.ModelProto)return t;var o=new S.onnx.ModelProto;if(t.irVersion!=null&&(P.Long?(o.irVersion=P.Long.fromValue(t.irVersion)).unsigned=!1:typeof t.irVersion=="string"?o.irVersion=parseInt(t.irVersion,10):typeof t.irVersion=="number"?o.irVersion=t.irVersion:typeof t.irVersion=="object"&&(o.irVersion=new P.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber())),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.ModelProto.opsetImport: object expected");o.opsetImport[i]=S.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}if(t.producerName!=null&&(o.producerName=String(t.producerName)),t.producerVersion!=null&&(o.producerVersion=String(t.producerVersion)),t.domain!=null&&(o.domain=String(t.domain)),t.modelVersion!=null&&(P.Long?(o.modelVersion=P.Long.fromValue(t.modelVersion)).unsigned=!1:typeof t.modelVersion=="string"?o.modelVersion=parseInt(t.modelVersion,10):typeof t.modelVersion=="number"?o.modelVersion=t.modelVersion:typeof t.modelVersion=="object"&&(o.modelVersion=new P.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber())),t.docString!=null&&(o.docString=String(t.docString)),t.graph!=null){if(typeof t.graph!="object")throw TypeError(".onnx.ModelProto.graph: object expected");o.graph=S.onnx.GraphProto.fromObject(t.graph)}if(t.metadataProps){if(!Array.isArray(t.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");o.metadataProps=[];for(var i=0;i<t.metadataProps.length;++i){if(typeof t.metadataProps[i]!="object")throw TypeError(".onnx.ModelProto.metadataProps: object expected");o.metadataProps[i]=S.onnx.StringStringEntryProto.fromObject(t.metadataProps[i])}}if(t.trainingInfo){if(!Array.isArray(t.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");o.trainingInfo=[];for(var i=0;i<t.trainingInfo.length;++i){if(typeof t.trainingInfo[i]!="object")throw TypeError(".onnx.ModelProto.trainingInfo: object expected");o.trainingInfo[i]=S.onnx.TrainingInfoProto.fromObject(t.trainingInfo[i])}}if(t.functions){if(!Array.isArray(t.functions))throw TypeError(".onnx.ModelProto.functions: array expected");o.functions=[];for(var i=0;i<t.functions.length;++i){if(typeof t.functions[i]!="object")throw TypeError(".onnx.ModelProto.functions: object expected");o.functions[i]=S.onnx.FunctionProto.fromObject(t.functions[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.opsetImport=[],i.metadataProps=[],i.trainingInfo=[],i.functions=[]),o.defaults){if(P.Long){var a=new P.Long(0,0,!1);i.irVersion=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.irVersion=o.longs===String?"0":0;if(i.producerName="",i.producerVersion="",i.domain="",P.Long){var a=new P.Long(0,0,!1);i.modelVersion=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.modelVersion=o.longs===String?"0":0;i.docString="",i.graph=null}if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&(typeof t.irVersion=="number"?i.irVersion=o.longs===String?String(t.irVersion):t.irVersion:i.irVersion=o.longs===String?P.Long.prototype.toString.call(t.irVersion):o.longs===Number?new P.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber():t.irVersion),t.producerName!=null&&t.hasOwnProperty("producerName")&&(i.producerName=t.producerName),t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&(i.producerVersion=t.producerVersion),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&(typeof t.modelVersion=="number"?i.modelVersion=o.longs===String?String(t.modelVersion):t.modelVersion:i.modelVersion=o.longs===String?P.Long.prototype.toString.call(t.modelVersion):o.longs===Number?new P.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber():t.modelVersion),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.graph!=null&&t.hasOwnProperty("graph")&&(i.graph=S.onnx.GraphProto.toObject(t.graph,o)),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var s=0;s<t.opsetImport.length;++s)i.opsetImport[s]=S.onnx.OperatorSetIdProto.toObject(t.opsetImport[s],o)}if(t.metadataProps&&t.metadataProps.length){i.metadataProps=[];for(var s=0;s<t.metadataProps.length;++s)i.metadataProps[s]=S.onnx.StringStringEntryProto.toObject(t.metadataProps[s],o)}if(t.trainingInfo&&t.trainingInfo.length){i.trainingInfo=[];for(var s=0;s<t.trainingInfo.length;++s)i.trainingInfo[s]=S.onnx.TrainingInfoProto.toObject(t.trainingInfo[s],o)}if(t.functions&&t.functions.length){i.functions=[];for(var s=0;s<t.functions.length;++s)i.functions[s]=S.onnx.FunctionProto.toObject(t.functions[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ModelProto"},e}(),r.StringStringEntryProto=function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.key="",e.prototype.value="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Qe.create()),t.key!=null&&Object.hasOwnProperty.call(t,"key")&&o.uint32(10).string(t.key),t.value!=null&&Object.hasOwnProperty.call(t,"value")&&o.uint32(18).string(t.value),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof X||(t=X.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.StringStringEntryProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.key=t.string();break}case 2:{a.value=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof X||(t=new X(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.key!=null&&t.hasOwnProperty("key")&&!P.isString(t.key)?"key: string expected":t.value!=null&&t.hasOwnProperty("value")&&!P.isString(t.value)?"value: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.StringStringEntryProto)return t;var o=new S.onnx.StringStringEntryProto;return t.key!=null&&(o.key=String(t.key)),t.value!=null&&(o.value=String(t.value)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.key="",i.value=""),t.key!=null&&t.hasOwnProperty("key")&&(i.key=t.key),t.value!=null&&t.hasOwnProperty("value")&&(i.value=t.value),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.StringStringEntryProto"},e}(),r.TensorAnnotation=function(){function e(n){if(this.quantParameterTensorNames=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.tensorName="",e.prototype.quantParameterTensorNames=P.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Qe.create()),t.tensorName!=null&&Object.hasOwnProperty.call(t,"tensorName")&&o.uint32(10).string(t.tensorName),t.quantParameterTensorNames!=null&&t.quantParameterTensorNames.length)for(var i=0;i<t.quantParameterTensorNames.length;++i)S.onnx.StringStringEntryProto.encode(t.quantParameterTensorNames[i],o.uint32(18).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof X||(t=X.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.TensorAnnotation;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.tensorName=t.string();break}case 2:{a.quantParameterTensorNames&&a.quantParameterTensorNames.length||(a.quantParameterTensorNames=[]),a.quantParameterTensorNames.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof X||(t=new X(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.tensorName!=null&&t.hasOwnProperty("tensorName")&&!P.isString(t.tensorName))return"tensorName: string expected";if(t.quantParameterTensorNames!=null&&t.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(t.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var o=0;o<t.quantParameterTensorNames.length;++o){var i=S.onnx.StringStringEntryProto.verify(t.quantParameterTensorNames[o]);if(i)return"quantParameterTensorNames."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.TensorAnnotation)return t;var o=new S.onnx.TensorAnnotation;if(t.tensorName!=null&&(o.tensorName=String(t.tensorName)),t.quantParameterTensorNames){if(!Array.isArray(t.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");o.quantParameterTensorNames=[];for(var i=0;i<t.quantParameterTensorNames.length;++i){if(typeof t.quantParameterTensorNames[i]!="object")throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");o.quantParameterTensorNames[i]=S.onnx.StringStringEntryProto.fromObject(t.quantParameterTensorNames[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.quantParameterTensorNames=[]),o.defaults&&(i.tensorName=""),t.tensorName!=null&&t.hasOwnProperty("tensorName")&&(i.tensorName=t.tensorName),t.quantParameterTensorNames&&t.quantParameterTensorNames.length){i.quantParameterTensorNames=[];for(var a=0;a<t.quantParameterTensorNames.length;++a)i.quantParameterTensorNames[a]=S.onnx.StringStringEntryProto.toObject(t.quantParameterTensorNames[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorAnnotation"},e}(),r.GraphProto=function(){function e(n){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.node=P.emptyArray,e.prototype.name="",e.prototype.initializer=P.emptyArray,e.prototype.sparseInitializer=P.emptyArray,e.prototype.docString="",e.prototype.input=P.emptyArray,e.prototype.output=P.emptyArray,e.prototype.valueInfo=P.emptyArray,e.prototype.quantizationAnnotation=P.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Qe.create()),t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)S.onnx.NodeProto.encode(t.node[i],o.uint32(10).fork()).ldelim();if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(18).string(t.name),t.initializer!=null&&t.initializer.length)for(var i=0;i<t.initializer.length;++i)S.onnx.TensorProto.encode(t.initializer[i],o.uint32(42).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(82).string(t.docString),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)S.onnx.ValueInfoProto.encode(t.input[i],o.uint32(90).fork()).ldelim();if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)S.onnx.ValueInfoProto.encode(t.output[i],o.uint32(98).fork()).ldelim();if(t.valueInfo!=null&&t.valueInfo.length)for(var i=0;i<t.valueInfo.length;++i)S.onnx.ValueInfoProto.encode(t.valueInfo[i],o.uint32(106).fork()).ldelim();if(t.quantizationAnnotation!=null&&t.quantizationAnnotation.length)for(var i=0;i<t.quantizationAnnotation.length;++i)S.onnx.TensorAnnotation.encode(t.quantizationAnnotation[i],o.uint32(114).fork()).ldelim();if(t.sparseInitializer!=null&&t.sparseInitializer.length)for(var i=0;i<t.sparseInitializer.length;++i)S.onnx.SparseTensorProto.encode(t.sparseInitializer[i],o.uint32(122).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof X||(t=X.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.GraphProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.node&&a.node.length||(a.node=[]),a.node.push(S.onnx.NodeProto.decode(t,t.uint32()));break}case 2:{a.name=t.string();break}case 5:{a.initializer&&a.initializer.length||(a.initializer=[]),a.initializer.push(S.onnx.TensorProto.decode(t,t.uint32()));break}case 15:{a.sparseInitializer&&a.sparseInitializer.length||(a.sparseInitializer=[]),a.sparseInitializer.push(S.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 10:{a.docString=t.string();break}case 11:{a.input&&a.input.length||(a.input=[]),a.input.push(S.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 12:{a.output&&a.output.length||(a.output=[]),a.output.push(S.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 13:{a.valueInfo&&a.valueInfo.length||(a.valueInfo=[]),a.valueInfo.push(S.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 14:{a.quantizationAnnotation&&a.quantizationAnnotation.length||(a.quantizationAnnotation=[]),a.quantizationAnnotation.push(S.onnx.TensorAnnotation.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof X||(t=new X(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=S.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.name!=null&&t.hasOwnProperty("name")&&!P.isString(t.name))return"name: string expected";if(t.initializer!=null&&t.hasOwnProperty("initializer")){if(!Array.isArray(t.initializer))return"initializer: array expected";for(var o=0;o<t.initializer.length;++o){var i=S.onnx.TensorProto.verify(t.initializer[o]);if(i)return"initializer."+i}}if(t.sparseInitializer!=null&&t.hasOwnProperty("sparseInitializer")){if(!Array.isArray(t.sparseInitializer))return"sparseInitializer: array expected";for(var o=0;o<t.sparseInitializer.length;++o){var i=S.onnx.SparseTensorProto.verify(t.sparseInitializer[o]);if(i)return"sparseInitializer."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!P.isString(t.docString))return"docString: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o){var i=S.onnx.ValueInfoProto.verify(t.input[o]);if(i)return"input."+i}}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o){var i=S.onnx.ValueInfoProto.verify(t.output[o]);if(i)return"output."+i}}if(t.valueInfo!=null&&t.hasOwnProperty("valueInfo")){if(!Array.isArray(t.valueInfo))return"valueInfo: array expected";for(var o=0;o<t.valueInfo.length;++o){var i=S.onnx.ValueInfoProto.verify(t.valueInfo[o]);if(i)return"valueInfo."+i}}if(t.quantizationAnnotation!=null&&t.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(t.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var o=0;o<t.quantizationAnnotation.length;++o){var i=S.onnx.TensorAnnotation.verify(t.quantizationAnnotation[o]);if(i)return"quantizationAnnotation."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.GraphProto)return t;var o=new S.onnx.GraphProto;if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.GraphProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.GraphProto.node: object expected");o.node[i]=S.onnx.NodeProto.fromObject(t.node[i])}}if(t.name!=null&&(o.name=String(t.name)),t.initializer){if(!Array.isArray(t.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");o.initializer=[];for(var i=0;i<t.initializer.length;++i){if(typeof t.initializer[i]!="object")throw TypeError(".onnx.GraphProto.initializer: object expected");o.initializer[i]=S.onnx.TensorProto.fromObject(t.initializer[i])}}if(t.sparseInitializer){if(!Array.isArray(t.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");o.sparseInitializer=[];for(var i=0;i<t.sparseInitializer.length;++i){if(typeof t.sparseInitializer[i]!="object")throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");o.sparseInitializer[i]=S.onnx.SparseTensorProto.fromObject(t.sparseInitializer[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.GraphProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i){if(typeof t.input[i]!="object")throw TypeError(".onnx.GraphProto.input: object expected");o.input[i]=S.onnx.ValueInfoProto.fromObject(t.input[i])}}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.GraphProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i){if(typeof t.output[i]!="object")throw TypeError(".onnx.GraphProto.output: object expected");o.output[i]=S.onnx.ValueInfoProto.fromObject(t.output[i])}}if(t.valueInfo){if(!Array.isArray(t.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");o.valueInfo=[];for(var i=0;i<t.valueInfo.length;++i){if(typeof t.valueInfo[i]!="object")throw TypeError(".onnx.GraphProto.valueInfo: object expected");o.valueInfo[i]=S.onnx.ValueInfoProto.fromObject(t.valueInfo[i])}}if(t.quantizationAnnotation){if(!Array.isArray(t.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");o.quantizationAnnotation=[];for(var i=0;i<t.quantizationAnnotation.length;++i){if(typeof t.quantizationAnnotation[i]!="object")throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");o.quantizationAnnotation[i]=S.onnx.TensorAnnotation.fromObject(t.quantizationAnnotation[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.node=[],i.initializer=[],i.input=[],i.output=[],i.valueInfo=[],i.quantizationAnnotation=[],i.sparseInitializer=[]),o.defaults&&(i.name="",i.docString=""),t.node&&t.node.length){i.node=[];for(var a=0;a<t.node.length;++a)i.node[a]=S.onnx.NodeProto.toObject(t.node[a],o)}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.initializer&&t.initializer.length){i.initializer=[];for(var a=0;a<t.initializer.length;++a)i.initializer[a]=S.onnx.TensorProto.toObject(t.initializer[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=S.onnx.ValueInfoProto.toObject(t.input[a],o)}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=S.onnx.ValueInfoProto.toObject(t.output[a],o)}if(t.valueInfo&&t.valueInfo.length){i.valueInfo=[];for(var a=0;a<t.valueInfo.length;++a)i.valueInfo[a]=S.onnx.ValueInfoProto.toObject(t.valueInfo[a],o)}if(t.quantizationAnnotation&&t.quantizationAnnotation.length){i.quantizationAnnotation=[];for(var a=0;a<t.quantizationAnnotation.length;++a)i.quantizationAnnotation[a]=S.onnx.TensorAnnotation.toObject(t.quantizationAnnotation[a],o)}if(t.sparseInitializer&&t.sparseInitializer.length){i.sparseInitializer=[];for(var a=0;a<t.sparseInitializer.length;++a)i.sparseInitializer[a]=S.onnx.SparseTensorProto.toObject(t.sparseInitializer[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.GraphProto"},e}(),r.TensorProto=function(){function e(n){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.dims=P.emptyArray,e.prototype.dataType=0,e.prototype.segment=null,e.prototype.floatData=P.emptyArray,e.prototype.int32Data=P.emptyArray,e.prototype.stringData=P.emptyArray,e.prototype.int64Data=P.emptyArray,e.prototype.name="",e.prototype.docString="",e.prototype.rawData=P.newBuffer([]),e.prototype.externalData=P.emptyArray,e.prototype.dataLocation=0,e.prototype.doubleData=P.emptyArray,e.prototype.uint64Data=P.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Qe.create()),t.dims!=null&&t.dims.length){o.uint32(10).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}if(t.dataType!=null&&Object.hasOwnProperty.call(t,"dataType")&&o.uint32(16).int32(t.dataType),t.segment!=null&&Object.hasOwnProperty.call(t,"segment")&&S.onnx.TensorProto.Segment.encode(t.segment,o.uint32(26).fork()).ldelim(),t.floatData!=null&&t.floatData.length){o.uint32(34).fork();for(var i=0;i<t.floatData.length;++i)o.float(t.floatData[i]);o.ldelim()}if(t.int32Data!=null&&t.int32Data.length){o.uint32(42).fork();for(var i=0;i<t.int32Data.length;++i)o.int32(t.int32Data[i]);o.ldelim()}if(t.stringData!=null&&t.stringData.length)for(var i=0;i<t.stringData.length;++i)o.uint32(50).bytes(t.stringData[i]);if(t.int64Data!=null&&t.int64Data.length){o.uint32(58).fork();for(var i=0;i<t.int64Data.length;++i)o.int64(t.int64Data[i]);o.ldelim()}if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(66).string(t.name),t.rawData!=null&&Object.hasOwnProperty.call(t,"rawData")&&o.uint32(74).bytes(t.rawData),t.doubleData!=null&&t.doubleData.length){o.uint32(82).fork();for(var i=0;i<t.doubleData.length;++i)o.double(t.doubleData[i]);o.ldelim()}if(t.uint64Data!=null&&t.uint64Data.length){o.uint32(90).fork();for(var i=0;i<t.uint64Data.length;++i)o.uint64(t.uint64Data[i]);o.ldelim()}if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(98).string(t.docString),t.externalData!=null&&t.externalData.length)for(var i=0;i<t.externalData.length;++i)S.onnx.StringStringEntryProto.encode(t.externalData[i],o.uint32(106).fork()).ldelim();return t.dataLocation!=null&&Object.hasOwnProperty.call(t,"dataLocation")&&o.uint32(112).int32(t.dataLocation),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof X||(t=X.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.TensorProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{if(a.dims&&a.dims.length||(a.dims=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.dims.push(t.int64());else a.dims.push(t.int64());break}case 2:{a.dataType=t.int32();break}case 3:{a.segment=S.onnx.TensorProto.Segment.decode(t,t.uint32());break}case 4:{if(a.floatData&&a.floatData.length||(a.floatData=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.floatData.push(t.float());else a.floatData.push(t.float());break}case 5:{if(a.int32Data&&a.int32Data.length||(a.int32Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.int32Data.push(t.int32());else a.int32Data.push(t.int32());break}case 6:{a.stringData&&a.stringData.length||(a.stringData=[]),a.stringData.push(t.bytes());break}case 7:{if(a.int64Data&&a.int64Data.length||(a.int64Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.int64Data.push(t.int64());else a.int64Data.push(t.int64());break}case 8:{a.name=t.string();break}case 12:{a.docString=t.string();break}case 9:{a.rawData=t.bytes();break}case 13:{a.externalData&&a.externalData.length||(a.externalData=[]),a.externalData.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 14:{a.dataLocation=t.int32();break}case 10:{if(a.doubleData&&a.doubleData.length||(a.doubleData=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.doubleData.push(t.double());else a.doubleData.push(t.double());break}case 11:{if(a.uint64Data&&a.uint64Data.length||(a.uint64Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.uint64Data.push(t.uint64());else a.uint64Data.push(t.uint64());break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof X||(t=new X(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var o=0;o<t.dims.length;++o)if(!P.isInteger(t.dims[o])&&!(t.dims[o]&&P.isInteger(t.dims[o].low)&&P.isInteger(t.dims[o].high)))return"dims: integer|Long[] expected"}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&!P.isInteger(t.dataType))return"dataType: integer expected";if(t.segment!=null&&t.hasOwnProperty("segment")){var i=S.onnx.TensorProto.Segment.verify(t.segment);if(i)return"segment."+i}if(t.floatData!=null&&t.hasOwnProperty("floatData")){if(!Array.isArray(t.floatData))return"floatData: array expected";for(var o=0;o<t.floatData.length;++o)if(typeof t.floatData[o]!="number")return"floatData: number[] expected"}if(t.int32Data!=null&&t.hasOwnProperty("int32Data")){if(!Array.isArray(t.int32Data))return"int32Data: array expected";for(var o=0;o<t.int32Data.length;++o)if(!P.isInteger(t.int32Data[o]))return"int32Data: integer[] expected"}if(t.stringData!=null&&t.hasOwnProperty("stringData")){if(!Array.isArray(t.stringData))return"stringData: array expected";for(var o=0;o<t.stringData.length;++o)if(!(t.stringData[o]&&typeof t.stringData[o].length=="number"||P.isString(t.stringData[o])))return"stringData: buffer[] expected"}if(t.int64Data!=null&&t.hasOwnProperty("int64Data")){if(!Array.isArray(t.int64Data))return"int64Data: array expected";for(var o=0;o<t.int64Data.length;++o)if(!P.isInteger(t.int64Data[o])&&!(t.int64Data[o]&&P.isInteger(t.int64Data[o].low)&&P.isInteger(t.int64Data[o].high)))return"int64Data: integer|Long[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!P.isString(t.name))return"name: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!P.isString(t.docString))return"docString: string expected";if(t.rawData!=null&&t.hasOwnProperty("rawData")&&!(t.rawData&&typeof t.rawData.length=="number"||P.isString(t.rawData)))return"rawData: buffer expected";if(t.externalData!=null&&t.hasOwnProperty("externalData")){if(!Array.isArray(t.externalData))return"externalData: array expected";for(var o=0;o<t.externalData.length;++o){var i=S.onnx.StringStringEntryProto.verify(t.externalData[o]);if(i)return"externalData."+i}}if(t.dataLocation!=null&&t.hasOwnProperty("dataLocation"))switch(t.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:break}if(t.doubleData!=null&&t.hasOwnProperty("doubleData")){if(!Array.isArray(t.doubleData))return"doubleData: array expected";for(var o=0;o<t.doubleData.length;++o)if(typeof t.doubleData[o]!="number")return"doubleData: number[] expected"}if(t.uint64Data!=null&&t.hasOwnProperty("uint64Data")){if(!Array.isArray(t.uint64Data))return"uint64Data: array expected";for(var o=0;o<t.uint64Data.length;++o)if(!P.isInteger(t.uint64Data[o])&&!(t.uint64Data[o]&&P.isInteger(t.uint64Data[o].low)&&P.isInteger(t.uint64Data[o].high)))return"uint64Data: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof S.onnx.TensorProto)return t;var o=new S.onnx.TensorProto;if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.TensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)P.Long?(o.dims[i]=P.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new P.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}if(t.dataType!=null&&(o.dataType=t.dataType|0),t.segment!=null){if(typeof t.segment!="object")throw TypeError(".onnx.TensorProto.segment: object expected");o.segment=S.onnx.TensorProto.Segment.fromObject(t.segment)}if(t.floatData){if(!Array.isArray(t.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");o.floatData=[];for(var i=0;i<t.floatData.length;++i)o.floatData[i]=Number(t.floatData[i])}if(t.int32Data){if(!Array.isArray(t.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");o.int32Data=[];for(var i=0;i<t.int32Data.length;++i)o.int32Data[i]=t.int32Data[i]|0}if(t.stringData){if(!Array.isArray(t.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");o.stringData=[];for(var i=0;i<t.stringData.length;++i)typeof t.stringData[i]=="string"?P.base64.decode(t.stringData[i],o.stringData[i]=P.newBuffer(P.base64.length(t.stringData[i])),0):t.stringData[i].length>=0&&(o.stringData[i]=t.stringData[i])}if(t.int64Data){if(!Array.isArray(t.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");o.int64Data=[];for(var i=0;i<t.int64Data.length;++i)P.Long?(o.int64Data[i]=P.Long.fromValue(t.int64Data[i])).unsigned=!1:typeof t.int64Data[i]=="string"?o.int64Data[i]=parseInt(t.int64Data[i],10):typeof t.int64Data[i]=="number"?o.int64Data[i]=t.int64Data[i]:typeof t.int64Data[i]=="object"&&(o.int64Data[i]=new P.LongBits(t.int64Data[i].low>>>0,t.int64Data[i].high>>>0).toNumber())}if(t.name!=null&&(o.name=String(t.name)),t.docString!=null&&(o.docString=String(t.docString)),t.rawData!=null&&(typeof t.rawData=="string"?P.base64.decode(t.rawData,o.rawData=P.newBuffer(P.base64.length(t.rawData)),0):t.rawData.length>=0&&(o.rawData=t.rawData)),t.externalData){if(!Array.isArray(t.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");o.externalData=[];for(var i=0;i<t.externalData.length;++i){if(typeof t.externalData[i]!="object")throw TypeError(".onnx.TensorProto.externalData: object expected");o.externalData[i]=S.onnx.StringStringEntryProto.fromObject(t.externalData[i])}}switch(t.dataLocation){default:if(typeof t.dataLocation=="number"){o.dataLocation=t.dataLocation;break}break;case"DEFAULT":case 0:o.dataLocation=0;break;case"EXTERNAL":case 1:o.dataLocation=1;break}if(t.doubleData){if(!Array.isArray(t.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");o.doubleData=[];for(var i=0;i<t.doubleData.length;++i)o.doubleData[i]=Number(t.doubleData[i])}if(t.uint64Data){if(!Array.isArray(t.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");o.uint64Data=[];for(var i=0;i<t.uint64Data.length;++i)P.Long?(o.uint64Data[i]=P.Long.fromValue(t.uint64Data[i])).unsigned=!0:typeof t.uint64Data[i]=="string"?o.uint64Data[i]=parseInt(t.uint64Data[i],10):typeof t.uint64Data[i]=="number"?o.uint64Data[i]=t.uint64Data[i]:typeof t.uint64Data[i]=="object"&&(o.uint64Data[i]=new P.LongBits(t.uint64Data[i].low>>>0,t.uint64Data[i].high>>>0).toNumber(!0))}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[],i.floatData=[],i.int32Data=[],i.stringData=[],i.int64Data=[],i.doubleData=[],i.uint64Data=[],i.externalData=[]),o.defaults&&(i.dataType=0,i.segment=null,i.name="",o.bytes===String?i.rawData="":(i.rawData=[],o.bytes!==Array&&(i.rawData=P.newBuffer(i.rawData))),i.docString="",i.dataLocation=o.enums===String?"DEFAULT":0),t.dims&&t.dims.length){i.dims=[];for(var a=0;a<t.dims.length;++a)typeof t.dims[a]=="number"?i.dims[a]=o.longs===String?String(t.dims[a]):t.dims[a]:i.dims[a]=o.longs===String?P.Long.prototype.toString.call(t.dims[a]):o.longs===Number?new P.LongBits(t.dims[a].low>>>0,t.dims[a].high>>>0).toNumber():t.dims[a]}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&(i.dataType=t.dataType),t.segment!=null&&t.hasOwnProperty("segment")&&(i.segment=S.onnx.TensorProto.Segment.toObject(t.segment,o)),t.floatData&&t.floatData.length){i.floatData=[];for(var a=0;a<t.floatData.length;++a)i.floatData[a]=o.json&&!isFinite(t.floatData[a])?String(t.floatData[a]):t.floatData[a]}if(t.int32Data&&t.int32Data.length){i.int32Data=[];for(var a=0;a<t.int32Data.length;++a)i.int32Data[a]=t.int32Data[a]}if(t.stringData&&t.stringData.length){i.stringData=[];for(var a=0;a<t.stringData.length;++a)i.stringData[a]=o.bytes===String?P.base64.encode(t.stringData[a],0,t.stringData[a].length):o.bytes===Array?Array.prototype.slice.call(t.stringData[a]):t.stringData[a]}if(t.int64Data&&t.int64Data.length){i.int64Data=[];for(var a=0;a<t.int64Data.length;++a)typeof t.int64Data[a]=="number"?i.int64Data[a]=o.longs===String?String(t.int64Data[a]):t.int64Data[a]:i.int64Data[a]=o.longs===String?P.Long.prototype.toString.call(t.int64Data[a]):o.longs===Number?new P.LongBits(t.int64Data[a].low>>>0,t.int64Data[a].high>>>0).toNumber():t.int64Data[a]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.rawData!=null&&t.hasOwnProperty("rawData")&&(i.rawData=o.bytes===String?P.base64.encode(t.rawData,0,t.rawData.length):o.bytes===Array?Array.prototype.slice.call(t.rawData):t.rawData),t.doubleData&&t.doubleData.length){i.doubleData=[];for(var a=0;a<t.doubleData.length;++a)i.doubleData[a]=o.json&&!isFinite(t.doubleData[a])?String(t.doubleData[a]):t.doubleData[a]}if(t.uint64Data&&t.uint64Data.length){i.uint64Data=[];for(var a=0;a<t.uint64Data.length;++a)typeof t.uint64Data[a]=="number"?i.uint64Data[a]=o.longs===String?String(t.uint64Data[a]):t.uint64Data[a]:i.uint64Data[a]=o.longs===String?P.Long.prototype.toString.call(t.uint64Data[a]):o.longs===Number?new P.LongBits(t.uint64Data[a].low>>>0,t.uint64Data[a].high>>>0).toNumber(!0):t.uint64Data[a]}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.externalData&&t.externalData.length){i.externalData=[];for(var a=0;a<t.externalData.length;++a)i.externalData[a]=S.onnx.StringStringEntryProto.toObject(t.externalData[a],o)}return t.dataLocation!=null&&t.hasOwnProperty("dataLocation")&&(i.dataLocation=o.enums===String?S.onnx.TensorProto.DataLocation[t.dataLocation]===void 0?t.dataLocation:S.onnx.TensorProto.DataLocation[t.dataLocation]:t.dataLocation),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorProto"},e.DataType=function(){var n={},t=Object.create(n);return t[n[0]="UNDEFINED"]=0,t[n[1]="FLOAT"]=1,t[n[2]="UINT8"]=2,t[n[3]="INT8"]=3,t[n[4]="UINT16"]=4,t[n[5]="INT16"]=5,t[n[6]="INT32"]=6,t[n[7]="INT64"]=7,t[n[8]="STRING"]=8,t[n[9]="BOOL"]=9,t[n[10]="FLOAT16"]=10,t[n[11]="DOUBLE"]=11,t[n[12]="UINT32"]=12,t[n[13]="UINT64"]=13,t[n[14]="COMPLEX64"]=14,t[n[15]="COMPLEX128"]=15,t[n[16]="BFLOAT16"]=16,t[n[17]="FLOAT8E4M3FN"]=17,t[n[18]="FLOAT8E4M3FNUZ"]=18,t[n[19]="FLOAT8E5M2"]=19,t[n[20]="FLOAT8E5M2FNUZ"]=20,t}(),e.Segment=function(){function n(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}return n.prototype.begin=P.Long?P.Long.fromBits(0,0,!1):0,n.prototype.end=P.Long?P.Long.fromBits(0,0,!1):0,n.create=function(o){return new n(o)},n.encode=function(o,i){return i||(i=Qe.create()),o.begin!=null&&Object.hasOwnProperty.call(o,"begin")&&i.uint32(8).int64(o.begin),o.end!=null&&Object.hasOwnProperty.call(o,"end")&&i.uint32(16).int64(o.end),i},n.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},n.decode=function(o,i){o instanceof X||(o=X.create(o));for(var a=i===void 0?o.len:o.pos+i,s=new S.onnx.TensorProto.Segment;o.pos<a;){var u=o.uint32();switch(u>>>3){case 1:{s.begin=o.int64();break}case 2:{s.end=o.int64();break}default:o.skipType(u&7);break}}return s},n.decodeDelimited=function(o){return o instanceof X||(o=new X(o)),this.decode(o,o.uint32())},n.verify=function(o){return typeof o!="object"||o===null?"object expected":o.begin!=null&&o.hasOwnProperty("begin")&&!P.isInteger(o.begin)&&!(o.begin&&P.isInteger(o.begin.low)&&P.isInteger(o.begin.high))?"begin: integer|Long expected":o.end!=null&&o.hasOwnProperty("end")&&!P.isInteger(o.end)&&!(o.end&&P.isInteger(o.end.low)&&P.isInteger(o.end.high))?"end: integer|Long expected":null},n.fromObject=function(o){if(o instanceof S.onnx.TensorProto.Segment)return o;var i=new S.onnx.TensorProto.Segment;return o.begin!=null&&(P.Long?(i.begin=P.Long.fromValue(o.begin)).unsigned=!1:typeof o.begin=="string"?i.begin=parseInt(o.begin,10):typeof o.begin=="number"?i.begin=o.begin:typeof o.begin=="object"&&(i.begin=new P.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber())),o.end!=null&&(P.Long?(i.end=P.Long.fromValue(o.end)).unsigned=!1:typeof o.end=="string"?i.end=parseInt(o.end,10):typeof o.end=="number"?i.end=o.end:typeof o.end=="object"&&(i.end=new P.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber())),i},n.toObject=function(o,i){i||(i={});var a={};if(i.defaults){if(P.Long){var s=new P.Long(0,0,!1);a.begin=i.longs===String?s.toString():i.longs===Number?s.toNumber():s}else a.begin=i.longs===String?"0":0;if(P.Long){var s=new P.Long(0,0,!1);a.end=i.longs===String?s.toString():i.longs===Number?s.toNumber():s}else a.end=i.longs===String?"0":0}return o.begin!=null&&o.hasOwnProperty("begin")&&(typeof o.begin=="number"?a.begin=i.longs===String?String(o.begin):o.begin:a.begin=i.longs===String?P.Long.prototype.toString.call(o.begin):i.longs===Number?new P.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber():o.begin),o.end!=null&&o.hasOwnProperty("end")&&(typeof o.end=="number"?a.end=i.longs===String?String(o.end):o.end:a.end=i.longs===String?P.Long.prototype.toString.call(o.end):i.longs===Number?new P.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber():o.end),a},n.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},n.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TensorProto.Segment"},n}(),e.DataLocation=function(){var n={},t=Object.create(n);return t[n[0]="DEFAULT"]=0,t[n[1]="EXTERNAL"]=1,t}(),e}(),r.SparseTensorProto=function(){function e(n){if(this.dims=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.values=null,e.prototype.indices=null,e.prototype.dims=P.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Qe.create()),t.values!=null&&Object.hasOwnProperty.call(t,"values")&&S.onnx.TensorProto.encode(t.values,o.uint32(10).fork()).ldelim(),t.indices!=null&&Object.hasOwnProperty.call(t,"indices")&&S.onnx.TensorProto.encode(t.indices,o.uint32(18).fork()).ldelim(),t.dims!=null&&t.dims.length){o.uint32(26).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof X||(t=X.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.SparseTensorProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.values=S.onnx.TensorProto.decode(t,t.uint32());break}case 2:{a.indices=S.onnx.TensorProto.decode(t,t.uint32());break}case 3:{if(a.dims&&a.dims.length||(a.dims=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.dims.push(t.int64());else a.dims.push(t.int64());break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof X||(t=new X(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.values!=null&&t.hasOwnProperty("values")){var o=S.onnx.TensorProto.verify(t.values);if(o)return"values."+o}if(t.indices!=null&&t.hasOwnProperty("indices")){var o=S.onnx.TensorProto.verify(t.indices);if(o)return"indices."+o}if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var i=0;i<t.dims.length;++i)if(!P.isInteger(t.dims[i])&&!(t.dims[i]&&P.isInteger(t.dims[i].low)&&P.isInteger(t.dims[i].high)))return"dims: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof S.onnx.SparseTensorProto)return t;var o=new S.onnx.SparseTensorProto;if(t.values!=null){if(typeof t.values!="object")throw TypeError(".onnx.SparseTensorProto.values: object expected");o.values=S.onnx.TensorProto.fromObject(t.values)}if(t.indices!=null){if(typeof t.indices!="object")throw TypeError(".onnx.SparseTensorProto.indices: object expected");o.indices=S.onnx.TensorProto.fromObject(t.indices)}if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)P.Long?(o.dims[i]=P.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new P.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[]),o.defaults&&(i.values=null,i.indices=null),t.values!=null&&t.hasOwnProperty("values")&&(i.values=S.onnx.TensorProto.toObject(t.values,o)),t.indices!=null&&t.hasOwnProperty("indices")&&(i.indices=S.onnx.TensorProto.toObject(t.indices,o)),t.dims&&t.dims.length){i.dims=[];for(var a=0;a<t.dims.length;++a)typeof t.dims[a]=="number"?i.dims[a]=o.longs===String?String(t.dims[a]):t.dims[a]:i.dims[a]=o.longs===String?P.Long.prototype.toString.call(t.dims[a]):o.longs===Number?new P.LongBits(t.dims[a].low>>>0,t.dims[a].high>>>0).toNumber():t.dims[a]}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.SparseTensorProto"},e}(),r.TensorShapeProto=function(){function e(n){if(this.dim=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.dim=P.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Qe.create()),t.dim!=null&&t.dim.length)for(var i=0;i<t.dim.length;++i)S.onnx.TensorShapeProto.Dimension.encode(t.dim[i],o.uint32(10).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof X||(t=X.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.TensorShapeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.dim&&a.dim.length||(a.dim=[]),a.dim.push(S.onnx.TensorShapeProto.Dimension.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof X||(t=new X(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dim!=null&&t.hasOwnProperty("dim")){if(!Array.isArray(t.dim))return"dim: array expected";for(var o=0;o<t.dim.length;++o){var i=S.onnx.TensorShapeProto.Dimension.verify(t.dim[o]);if(i)return"dim."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.TensorShapeProto)return t;var o=new S.onnx.TensorShapeProto;if(t.dim){if(!Array.isArray(t.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");o.dim=[];for(var i=0;i<t.dim.length;++i){if(typeof t.dim[i]!="object")throw TypeError(".onnx.TensorShapeProto.dim: object expected");o.dim[i]=S.onnx.TensorShapeProto.Dimension.fromObject(t.dim[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dim=[]),t.dim&&t.dim.length){i.dim=[];for(var a=0;a<t.dim.length;++a)i.dim[a]=S.onnx.TensorShapeProto.Dimension.toObject(t.dim[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorShapeProto"},e.Dimension=function(){function n(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}n.prototype.dimValue=null,n.prototype.dimParam=null,n.prototype.denotation="";var t;return Object.defineProperty(n.prototype,"value",{get:P.oneOfGetter(t=["dimValue","dimParam"]),set:P.oneOfSetter(t)}),n.create=function(i){return new n(i)},n.encode=function(i,a){return a||(a=Qe.create()),i.dimValue!=null&&Object.hasOwnProperty.call(i,"dimValue")&&a.uint32(8).int64(i.dimValue),i.dimParam!=null&&Object.hasOwnProperty.call(i,"dimParam")&&a.uint32(18).string(i.dimParam),i.denotation!=null&&Object.hasOwnProperty.call(i,"denotation")&&a.uint32(26).string(i.denotation),a},n.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},n.decode=function(i,a){i instanceof X||(i=X.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TensorShapeProto.Dimension;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.dimValue=i.int64();break}case 2:{u.dimParam=i.string();break}case 3:{u.denotation=i.string();break}default:i.skipType(l&7);break}}return u},n.decodeDelimited=function(i){return i instanceof X||(i=new X(i)),this.decode(i,i.uint32())},n.verify=function(i){if(typeof i!="object"||i===null)return"object expected";var a={};if(i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(a.value=1,!P.isInteger(i.dimValue)&&!(i.dimValue&&P.isInteger(i.dimValue.low)&&P.isInteger(i.dimValue.high))))return"dimValue: integer|Long expected";if(i.dimParam!=null&&i.hasOwnProperty("dimParam")){if(a.value===1)return"value: multiple values";if(a.value=1,!P.isString(i.dimParam))return"dimParam: string expected"}return i.denotation!=null&&i.hasOwnProperty("denotation")&&!P.isString(i.denotation)?"denotation: string expected":null},n.fromObject=function(i){if(i instanceof S.onnx.TensorShapeProto.Dimension)return i;var a=new S.onnx.TensorShapeProto.Dimension;return i.dimValue!=null&&(P.Long?(a.dimValue=P.Long.fromValue(i.dimValue)).unsigned=!1:typeof i.dimValue=="string"?a.dimValue=parseInt(i.dimValue,10):typeof i.dimValue=="number"?a.dimValue=i.dimValue:typeof i.dimValue=="object"&&(a.dimValue=new P.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber())),i.dimParam!=null&&(a.dimParam=String(i.dimParam)),i.denotation!=null&&(a.denotation=String(i.denotation)),a},n.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.denotation=""),i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(typeof i.dimValue=="number"?s.dimValue=a.longs===String?String(i.dimValue):i.dimValue:s.dimValue=a.longs===String?P.Long.prototype.toString.call(i.dimValue):a.longs===Number?new P.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber():i.dimValue,a.oneofs&&(s.value="dimValue")),i.dimParam!=null&&i.hasOwnProperty("dimParam")&&(s.dimParam=i.dimParam,a.oneofs&&(s.value="dimParam")),i.denotation!=null&&i.hasOwnProperty("denotation")&&(s.denotation=i.denotation),s},n.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},n.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TensorShapeProto.Dimension"},n}(),e}(),r.TypeProto=function(){function e(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}e.prototype.tensorType=null,e.prototype.sequenceType=null,e.prototype.mapType=null,e.prototype.optionalType=null,e.prototype.sparseTensorType=null,e.prototype.denotation="";var n;return Object.defineProperty(e.prototype,"value",{get:P.oneOfGetter(n=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:P.oneOfSetter(n)}),e.create=function(o){return new e(o)},e.encode=function(o,i){return i||(i=Qe.create()),o.tensorType!=null&&Object.hasOwnProperty.call(o,"tensorType")&&S.onnx.TypeProto.Tensor.encode(o.tensorType,i.uint32(10).fork()).ldelim(),o.sequenceType!=null&&Object.hasOwnProperty.call(o,"sequenceType")&&S.onnx.TypeProto.Sequence.encode(o.sequenceType,i.uint32(34).fork()).ldelim(),o.mapType!=null&&Object.hasOwnProperty.call(o,"mapType")&&S.onnx.TypeProto.Map.encode(o.mapType,i.uint32(42).fork()).ldelim(),o.denotation!=null&&Object.hasOwnProperty.call(o,"denotation")&&i.uint32(50).string(o.denotation),o.sparseTensorType!=null&&Object.hasOwnProperty.call(o,"sparseTensorType")&&S.onnx.TypeProto.SparseTensor.encode(o.sparseTensorType,i.uint32(66).fork()).ldelim(),o.optionalType!=null&&Object.hasOwnProperty.call(o,"optionalType")&&S.onnx.TypeProto.Optional.encode(o.optionalType,i.uint32(74).fork()).ldelim(),i},e.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},e.decode=function(o,i){o instanceof X||(o=X.create(o));for(var a=i===void 0?o.len:o.pos+i,s=new S.onnx.TypeProto;o.pos<a;){var u=o.uint32();switch(u>>>3){case 1:{s.tensorType=S.onnx.TypeProto.Tensor.decode(o,o.uint32());break}case 4:{s.sequenceType=S.onnx.TypeProto.Sequence.decode(o,o.uint32());break}case 5:{s.mapType=S.onnx.TypeProto.Map.decode(o,o.uint32());break}case 9:{s.optionalType=S.onnx.TypeProto.Optional.decode(o,o.uint32());break}case 8:{s.sparseTensorType=S.onnx.TypeProto.SparseTensor.decode(o,o.uint32());break}case 6:{s.denotation=o.string();break}default:o.skipType(u&7);break}}return s},e.decodeDelimited=function(o){return o instanceof X||(o=new X(o)),this.decode(o,o.uint32())},e.verify=function(o){if(typeof o!="object"||o===null)return"object expected";var i={};if(o.tensorType!=null&&o.hasOwnProperty("tensorType")){i.value=1;{var a=S.onnx.TypeProto.Tensor.verify(o.tensorType);if(a)return"tensorType."+a}}if(o.sequenceType!=null&&o.hasOwnProperty("sequenceType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=S.onnx.TypeProto.Sequence.verify(o.sequenceType);if(a)return"sequenceType."+a}}if(o.mapType!=null&&o.hasOwnProperty("mapType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=S.onnx.TypeProto.Map.verify(o.mapType);if(a)return"mapType."+a}}if(o.optionalType!=null&&o.hasOwnProperty("optionalType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=S.onnx.TypeProto.Optional.verify(o.optionalType);if(a)return"optionalType."+a}}if(o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=S.onnx.TypeProto.SparseTensor.verify(o.sparseTensorType);if(a)return"sparseTensorType."+a}}return o.denotation!=null&&o.hasOwnProperty("denotation")&&!P.isString(o.denotation)?"denotation: string expected":null},e.fromObject=function(o){if(o instanceof S.onnx.TypeProto)return o;var i=new S.onnx.TypeProto;if(o.tensorType!=null){if(typeof o.tensorType!="object")throw TypeError(".onnx.TypeProto.tensorType: object expected");i.tensorType=S.onnx.TypeProto.Tensor.fromObject(o.tensorType)}if(o.sequenceType!=null){if(typeof o.sequenceType!="object")throw TypeError(".onnx.TypeProto.sequenceType: object expected");i.sequenceType=S.onnx.TypeProto.Sequence.fromObject(o.sequenceType)}if(o.mapType!=null){if(typeof o.mapType!="object")throw TypeError(".onnx.TypeProto.mapType: object expected");i.mapType=S.onnx.TypeProto.Map.fromObject(o.mapType)}if(o.optionalType!=null){if(typeof o.optionalType!="object")throw TypeError(".onnx.TypeProto.optionalType: object expected");i.optionalType=S.onnx.TypeProto.Optional.fromObject(o.optionalType)}if(o.sparseTensorType!=null){if(typeof o.sparseTensorType!="object")throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");i.sparseTensorType=S.onnx.TypeProto.SparseTensor.fromObject(o.sparseTensorType)}return o.denotation!=null&&(i.denotation=String(o.denotation)),i},e.toObject=function(o,i){i||(i={});var a={};return i.defaults&&(a.denotation=""),o.tensorType!=null&&o.hasOwnProperty("tensorType")&&(a.tensorType=S.onnx.TypeProto.Tensor.toObject(o.tensorType,i),i.oneofs&&(a.value="tensorType")),o.sequenceType!=null&&o.hasOwnProperty("sequenceType")&&(a.sequenceType=S.onnx.TypeProto.Sequence.toObject(o.sequenceType,i),i.oneofs&&(a.value="sequenceType")),o.mapType!=null&&o.hasOwnProperty("mapType")&&(a.mapType=S.onnx.TypeProto.Map.toObject(o.mapType,i),i.oneofs&&(a.value="mapType")),o.denotation!=null&&o.hasOwnProperty("denotation")&&(a.denotation=o.denotation),o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")&&(a.sparseTensorType=S.onnx.TypeProto.SparseTensor.toObject(o.sparseTensorType,i),i.oneofs&&(a.value="sparseTensorType")),o.optionalType!=null&&o.hasOwnProperty("optionalType")&&(a.optionalType=S.onnx.TypeProto.Optional.toObject(o.optionalType,i),i.oneofs&&(a.value="optionalType")),a},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TypeProto"},e.Tensor=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=Qe.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&a.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&S.onnx.TensorShapeProto.encode(i.shape,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof X||(i=X.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TypeProto.Tensor;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=S.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof X||(i=new X(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!P.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var a=S.onnx.TensorShapeProto.verify(i.shape);if(a)return"shape."+a}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Tensor)return i;var a=new S.onnx.TypeProto.Tensor;if(i.elemType!=null&&(a.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");a.shape=S.onnx.TensorShapeProto.fromObject(i.shape)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=0,s.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(s.shape=S.onnx.TensorShapeProto.toObject(i.shape,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Tensor"},t}(),e.Sequence=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=Qe.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&S.onnx.TypeProto.encode(i.elemType,a.uint32(10).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof X||(i=X.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TypeProto.Sequence;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=S.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof X||(i=new X(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var a=S.onnx.TypeProto.verify(i.elemType);if(a)return"elemType."+a}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Sequence)return i;var a=new S.onnx.TypeProto.Sequence;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");a.elemType=S.onnx.TypeProto.fromObject(i.elemType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=S.onnx.TypeProto.toObject(i.elemType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Sequence"},t}(),e.Map=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.keyType=0,t.prototype.valueType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=Qe.create()),i.keyType!=null&&Object.hasOwnProperty.call(i,"keyType")&&a.uint32(8).int32(i.keyType),i.valueType!=null&&Object.hasOwnProperty.call(i,"valueType")&&S.onnx.TypeProto.encode(i.valueType,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof X||(i=X.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TypeProto.Map;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.keyType=i.int32();break}case 2:{u.valueType=S.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof X||(i=new X(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.keyType!=null&&i.hasOwnProperty("keyType")&&!P.isInteger(i.keyType))return"keyType: integer expected";if(i.valueType!=null&&i.hasOwnProperty("valueType")){var a=S.onnx.TypeProto.verify(i.valueType);if(a)return"valueType."+a}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Map)return i;var a=new S.onnx.TypeProto.Map;if(i.keyType!=null&&(a.keyType=i.keyType|0),i.valueType!=null){if(typeof i.valueType!="object")throw TypeError(".onnx.TypeProto.Map.valueType: object expected");a.valueType=S.onnx.TypeProto.fromObject(i.valueType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.keyType=0,s.valueType=null),i.keyType!=null&&i.hasOwnProperty("keyType")&&(s.keyType=i.keyType),i.valueType!=null&&i.hasOwnProperty("valueType")&&(s.valueType=S.onnx.TypeProto.toObject(i.valueType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Map"},t}(),e.Optional=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=Qe.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&S.onnx.TypeProto.encode(i.elemType,a.uint32(10).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof X||(i=X.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TypeProto.Optional;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=S.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof X||(i=new X(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var a=S.onnx.TypeProto.verify(i.elemType);if(a)return"elemType."+a}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Optional)return i;var a=new S.onnx.TypeProto.Optional;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");a.elemType=S.onnx.TypeProto.fromObject(i.elemType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=S.onnx.TypeProto.toObject(i.elemType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Optional"},t}(),e.SparseTensor=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=Qe.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&a.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&S.onnx.TensorShapeProto.encode(i.shape,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof X||(i=X.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TypeProto.SparseTensor;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=S.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof X||(i=new X(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!P.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var a=S.onnx.TensorShapeProto.verify(i.shape);if(a)return"shape."+a}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.SparseTensor)return i;var a=new S.onnx.TypeProto.SparseTensor;if(i.elemType!=null&&(a.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");a.shape=S.onnx.TensorShapeProto.fromObject(i.shape)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=0,s.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(s.shape=S.onnx.TensorShapeProto.toObject(i.shape,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.SparseTensor"},t}(),e}(),r.OperatorSetIdProto=function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.domain="",e.prototype.version=P.Long?P.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Qe.create()),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(10).string(t.domain),t.version!=null&&Object.hasOwnProperty.call(t,"version")&&o.uint32(16).int64(t.version),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof X||(t=X.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.OperatorSetIdProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.domain=t.string();break}case 2:{a.version=t.int64();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof X||(t=new X(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.domain!=null&&t.hasOwnProperty("domain")&&!P.isString(t.domain)?"domain: string expected":t.version!=null&&t.hasOwnProperty("version")&&!P.isInteger(t.version)&&!(t.version&&P.isInteger(t.version.low)&&P.isInteger(t.version.high))?"version: integer|Long expected":null},e.fromObject=function(t){if(t instanceof S.onnx.OperatorSetIdProto)return t;var o=new S.onnx.OperatorSetIdProto;return t.domain!=null&&(o.domain=String(t.domain)),t.version!=null&&(P.Long?(o.version=P.Long.fromValue(t.version)).unsigned=!1:typeof t.version=="string"?o.version=parseInt(t.version,10):typeof t.version=="number"?o.version=t.version:typeof t.version=="object"&&(o.version=new P.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber())),o},e.toObject=function(t,o){o||(o={});var i={};if(o.defaults)if(i.domain="",P.Long){var a=new P.Long(0,0,!1);i.version=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.version=o.longs===String?"0":0;return t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.version!=null&&t.hasOwnProperty("version")&&(typeof t.version=="number"?i.version=o.longs===String?String(t.version):t.version:i.version=o.longs===String?P.Long.prototype.toString.call(t.version):o.longs===Number?new P.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber():t.version),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.OperatorSetIdProto"},e}(),r.OperatorStatus=function(){var e={},n=Object.create(e);return n[e[0]="EXPERIMENTAL"]=0,n[e[1]="STABLE"]=1,n}(),r.FunctionProto=function(){function e(n){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.input=P.emptyArray,e.prototype.output=P.emptyArray,e.prototype.attribute=P.emptyArray,e.prototype.attributeProto=P.emptyArray,e.prototype.node=P.emptyArray,e.prototype.docString="",e.prototype.opsetImport=P.emptyArray,e.prototype.domain="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Qe.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(34).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(42).string(t.output[i]);if(t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)o.uint32(50).string(t.attribute[i]);if(t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)S.onnx.NodeProto.encode(t.node[i],o.uint32(58).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(66).string(t.docString),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)S.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(74).fork()).ldelim();if(t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(82).string(t.domain),t.attributeProto!=null&&t.attributeProto.length)for(var i=0;i<t.attributeProto.length;++i)S.onnx.AttributeProto.encode(t.attributeProto[i],o.uint32(90).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof X||(t=X.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.FunctionProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 4:{a.input&&a.input.length||(a.input=[]),a.input.push(t.string());break}case 5:{a.output&&a.output.length||(a.output=[]),a.output.push(t.string());break}case 6:{a.attribute&&a.attribute.length||(a.attribute=[]),a.attribute.push(t.string());break}case 11:{a.attributeProto&&a.attributeProto.length||(a.attributeProto=[]),a.attributeProto.push(S.onnx.AttributeProto.decode(t,t.uint32()));break}case 7:{a.node&&a.node.length||(a.node=[]),a.node.push(S.onnx.NodeProto.decode(t,t.uint32()));break}case 8:{a.docString=t.string();break}case 9:{a.opsetImport&&a.opsetImport.length||(a.opsetImport=[]),a.opsetImport.push(S.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 10:{a.domain=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof X||(t=new X(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!P.isString(t.name))return"name: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!P.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!P.isString(t.output[o]))return"output: string[] expected"}if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o)if(!P.isString(t.attribute[o]))return"attribute: string[] expected"}if(t.attributeProto!=null&&t.hasOwnProperty("attributeProto")){if(!Array.isArray(t.attributeProto))return"attributeProto: array expected";for(var o=0;o<t.attributeProto.length;++o){var i=S.onnx.AttributeProto.verify(t.attributeProto[o]);if(i)return"attributeProto."+i}}if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=S.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!P.isString(t.docString))return"docString: string expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=S.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}return t.domain!=null&&t.hasOwnProperty("domain")&&!P.isString(t.domain)?"domain: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.FunctionProto)return t;var o=new S.onnx.FunctionProto;if(t.name!=null&&(o.name=String(t.name)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.FunctionProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.FunctionProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i)o.attribute[i]=String(t.attribute[i])}if(t.attributeProto){if(!Array.isArray(t.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");o.attributeProto=[];for(var i=0;i<t.attributeProto.length;++i){if(typeof t.attributeProto[i]!="object")throw TypeError(".onnx.FunctionProto.attributeProto: object expected");o.attributeProto[i]=S.onnx.AttributeProto.fromObject(t.attributeProto[i])}}if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.FunctionProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.FunctionProto.node: object expected");o.node[i]=S.onnx.NodeProto.fromObject(t.node[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.FunctionProto.opsetImport: object expected");o.opsetImport[i]=S.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}return t.domain!=null&&(o.domain=String(t.domain)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[],i.node=[],i.opsetImport=[],i.attributeProto=[]),o.defaults&&(i.name="",i.docString="",i.domain=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=t.input[a]}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=t.output[a]}if(t.attribute&&t.attribute.length){i.attribute=[];for(var a=0;a<t.attribute.length;++a)i.attribute[a]=t.attribute[a]}if(t.node&&t.node.length){i.node=[];for(var a=0;a<t.node.length;++a)i.node[a]=S.onnx.NodeProto.toObject(t.node[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var a=0;a<t.opsetImport.length;++a)i.opsetImport[a]=S.onnx.OperatorSetIdProto.toObject(t.opsetImport[a],o)}if(t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.attributeProto&&t.attributeProto.length){i.attributeProto=[];for(var a=0;a<t.attributeProto.length;++a)i.attributeProto[a]=S.onnx.AttributeProto.toObject(t.attributeProto[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ue.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.FunctionProto"},e}(),r}();yh.exports=S});function no(r,e){if(!r)throw new Error(typeof e=="string"?e:e())}function Co(r){return new TextDecoder().decode(r)}var We,kr,yl,gt,Li,ft,xt,ne,Eo,Nr,Lr,Rr,Me=k(()=>{"use strict";Fs();We=ve(to());zr();kr=class{static arraysEqual(e,n){if(e.length!==n.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!==n[t])return!1;return!0}},yl=class{static preprocessInputShapes(e,n){let t=e.length===1?[1,e[0]]:e,o=n.length===1?[n[0],1]:n;return[t,o]}static postprocessOutputShape(e,n,t){n===1&&e.splice(e.length-2,1),t===1&&e.pop()}static calcMatMulShape(e,n){return e[1]!==n[0]?void 0:[e[0],n[1]]}},gt=class r{static calcShape(e,n,t=!1){let o=e.length,i=n.length;if(o===0)return n;if(i===0)return e;let a=Math.max(e.length,n.length),s=new Array(a);if(t){if(o<2||i<2)return;let u=yl.calcMatMulShape([e[o-2],e[o-1]],[n[i-2],n[i-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=t?3:1;u<=a;u++){let l=o-u<0?1:e[o-u],d=i-u<0?1:n[i-u];if(l!==d&&l>1&&d>1)return;s[a-u]=Math.max(l,d)}return s}static index(e,n){let t=new Array(n.length);return r.fillIndex(e,n,t),t}static fillIndex(e,n,t){let o=e.length-n.length;for(let i=0;i<n.length;i++)t[i]=e[o+i]%n[i]}static calc(e,n,t,o,i){let a=r.calcShape(e.dims,n.dims);if(a){if(o&&!ne.areEqual(a,e.dims))return;let s=ne.size(a),u=o?e:new nt(a,i||e.type);if(a.length===0)u.set([],t(e.get([]),n.get([])));else{let l=new Array(a.length),d=new Array(e.dims.length),f=new Array(n.dims.length),h=0,g=0,b=!1,_=!1;e.dims.length===0&&(h=e.get([]),b=!0),n.dims.length===0&&(g=n.get([]),_=!0);let T;for(let v=0;v<s;v++){T=v;for(let x=a.length-1;x>=0;x--)l[x]=T%a[x],T=Math.floor(T/a[x]);b||(r.fillIndex(l,e.dims,d),h=e.get(d)),_||(r.fillIndex(l,n.dims,f),g=n.get(f)),u.set(l,t(h,g))}}return u}}static isValidBroadcast(e,n){let t=e.length,o=n.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==n[o-i])return!1;return!0}static getBroadcastDims(e,n){let t=e.length,o=[];for(let i=0;i<t;i++){let a=t-1-i,s=e[a]||1;(n[n.length-1-i]||1)>1&&s===1&&o.unshift(a)}return o}},Li=class{static getShapeOfGemmResult(e,n,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let a,s,u;n?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(i&&!gt.isValidBroadcast(i,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},ft=class r{static tensorDataTypeFromProto(e){switch(e){case We.onnx.TensorProto.DataType.INT8:return"int8";case We.onnx.TensorProto.DataType.UINT8:return"uint8";case We.onnx.TensorProto.DataType.BOOL:return"bool";case We.onnx.TensorProto.DataType.INT16:return"int16";case We.onnx.TensorProto.DataType.UINT16:return"uint16";case We.onnx.TensorProto.DataType.INT32:return"int32";case We.onnx.TensorProto.DataType.UINT32:return"uint32";case We.onnx.TensorProto.DataType.FLOAT:return"float32";case We.onnx.TensorProto.DataType.DOUBLE:return"float64";case We.onnx.TensorProto.DataType.STRING:return"string";case We.onnx.TensorProto.DataType.INT64:return"int32";case We.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw new Error(`unsupported data type: ${We.onnx.TensorProto.DataType[e]}`)}}static tensorDataTypeStringToEnum(e){switch(e){case"int8":return We.onnx.TensorProto.DataType.INT8;case"uint8":return We.onnx.TensorProto.DataType.UINT8;case"bool":return We.onnx.TensorProto.DataType.BOOL;case"int16":return We.onnx.TensorProto.DataType.INT16;case"uint16":return We.onnx.TensorProto.DataType.UINT16;case"int32":return We.onnx.TensorProto.DataType.INT32;case"uint32":return We.onnx.TensorProto.DataType.UINT32;case"float32":return We.onnx.TensorProto.DataType.FLOAT;case"float64":return We.onnx.TensorProto.DataType.DOUBLE;case"string":return We.onnx.TensorProto.DataType.STRING;case"int64":return We.onnx.TensorProto.DataType.INT64;case"uint64":return We.onnx.TensorProto.DataType.UINT64;default:throw new Error(`unsupported data type: ${e}`)}}static tensorDimsFromProto(e){return e.map(n=>dr.isLong(n)?n.toNumber():n)}static tensorValueTypeFromProto(e){return{tensorType:r.tensorDataTypeFromProto(e.elemType),shape:{dims:r.tensorDimsFromProto(e.shape.dim.map(n=>n.dimValue))}}}static tensorDimsFromORTFormat(e){let n=[];for(let t=0;t<e.dimsLength();t++)n.push(xt.longToNumber(e.dims(t)));return n}static tensorAttributesFromORTFormat(e){let n=[];for(let t=0;t<e.attributesLength();t++)n.push(e.attributes(t));return n}},xt=class{static longToNumber(e){return dr.isLong(e)?e.toNumber():typeof e=="bigint"?Number(e):e}static isLong(e){return dr.isLong(e)||typeof e=="bigint"}},ne=class r{static size(e){return r.getSizeFromDimensionRange(e,0,e.length)}static sizeFromDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,n,e.length)}static sizeToDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,0,n)}static getSizeFromDimensionRange(e,n,t){let o=1;for(let i=n;i<t;i++){if(e[i]<=0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");o*=e[i]}return o}static computeStrides(e){let n=e.length;if(n===0)return[];if(n===1)return[1];let t=new Array(n);t[n-1]=1,t[n-2]=e[n-1];for(let o=n-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static transpose(e){return e.slice().reverse()}static indicesToOffset(e,n,t){t===void 0&&(t=e.length);let o=0;for(let i=0;i<t;++i)o+=n[i]*e[i];return o}static offsetToIndices(e,n){let t=n.length;if(t===0)return[];if(t===1)return[e*n[0]];let o=new Array(n.length);for(let i=0;i<o.length-1;++i)o[i]=Math.floor(e/n[i]),e-=o[i]*n[i];return o[o.length-1]=e,o}static normalizeAxis(e,n){if(e<-n&&e>=n)throw new Error("unsupported axis for this operation.");return e<0?e+n:e}static normalizeAxes(e,n){return e.map(t=>this.normalizeAxis(t,n))}static incrementIndex(e,n,t){if(n.length===0||e.length===0)throw new Error("Index incrementing unsupported for scalar Tensor");if(t===void 0)t=n.length;else if(t<=0||t>n.length)throw new Error("Incorrect axis to increment on");for(let o=t-1;o>=0&&(e[o]++,!(e[o]<n[o]));--o)e[o]=0}static calculateReshapedDims(e,n){if(n.length===0){if(e.length===0||r.size(e)===1)return[];throw new Error("cannot reshape to a scalar Tensor")}let t=n.length,o=new Array(t),i=-1,a=1;for(let u=0;u<t;u++){if(n[u]<-1)throw new Error("a dimension in shape hints cannot be less than -1");if(n[u]===-1){if(i!==-1)throw new Error("at most one dimension in shape hints can be -1");i=u}else{if(n[u]===0){if(u>=e.length)throw new Error("the dimension with value zero exceeds the dimension size of the input tensor");o[u]=e[u]}else o[u]=n[u];a*=o[u]}}let s=r.size(e);if(i!==-1){if(s%a!==0)throw new Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${e}] Output shape: [${n}]`);o[i]=s/a}else if(a!==s)throw new Error("reshapedDims and originalDims don't have matching sizes");return o}static sortBasedOnPerm(e,n){return n?n.map(t=>e[t]):e.slice().reverse()}static padShape(e,n){let t=e.length;return e.map((o,i)=>o+n[i]+n[i+t])}static areEqual(e,n){return e.length!==n.length?!1:e.every((t,o)=>t===n[o])}static validateDimsAndCalcSize(e){if(e.length>6)throw new TypeError("Only rank 0 to 6 is supported for tensor shape.");let n=1;for(let t of e){if(!Number.isInteger(t))throw new TypeError(`Invalid shape: ${t} is not an integer`);if(t<0||t>2147483647)throw new TypeError(`Invalid shape: length ${t} is not allowed`);n*=t}return n}static flattenShape(e,n){n<0&&(n+=e.length);let t=e.reduce((a,s)=>a*s,1),o=e.slice(n).reduce((a,s)=>a*s,1);return[t/o,o]}static squeezeShape(e,n){let t=new Array;n=r.normalizeAxes(n,e.length);for(let o=0;o<e.length;o++){let i=n.indexOf(o)>=0;if(i&&e[o]!==1)throw new Error("squeeze an axis of size different than 1");(n.length===0&&e[o]>1||n.length>0&&!i)&&t.push(e[o])}return t}static unsqueezeShape(e,n){let t=new Array(e.length+n.length);t.fill(0);for(let i=0;i<n.length;i++){let a=r.normalizeAxis(n[i],t.length);if(a>=t.length)throw new Error("'axes' has an out of range axis");if(t[a]!==0)throw new Error("'axes' has a duplicate axis");t[a]=1}let o=0;for(let i=0;i<t.length;i++)t[i]===0&&(t[i]=e[o++]);if(o!==e.length)throw new Error("the unsqueezed dimension could not be established");return t}},Eo=class r{static splitShape(e,n,t,o){if(t.length===0){if(!o)throw new Error("need to know number of outputs when the 'split' attribute is not specified");r.determineSplit(e[n],o,t)}let i=[],a=[0];for(let s=0;s<t.length;++s){s!==0&&a.push(a[s-1]+t[s-1]);let u=e.slice();u[n]=t[s],i.push(u)}return[i,a]}static determineSplit(e,n,t){if(e%n!==0)throw new Error("cannot split tensor to equal sized parts");for(let o=0;o<n;++o)t.push(e/n)}},Nr=class r{static adjustPoolAttributes(e,n,t,o,i,a){if(!e&&t.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let s=0;s<n.length-2;s++)s>=t.length?t.push(n[s+2]):t[s]=n[s+2];for(let s=0;s<t.length;s++)if(s<o.length){if(o[s]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let s=0;s<t.length;s++)if(s<i.length){if(i[s]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let s=0;s<t.length*2;s++)if(s<a.length){if(a[s]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let s=0;s<t.length;s++){if(t[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[s]>=t[s]||a[s+t.length]>=t[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,n,t,o,i,a){if(a){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let s=0;s<e.length-2;s++)r.adjustPadAndReturnShape(e[s+2],n[s],t[s],o[s],i,s,s+e.length-2,a)}}static computePoolOutputShape(e,n,t,o,i,a,s){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let u=[n[0],n[1]];return r.computeShapeHelper(e,n,u,t,o,i,a,s),u}static computeConvOutputShape(e,n,t,o,i,a,s){if(e.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],n[0]];return r.computeShapeHelper(!1,e,u,t,o,i,a,s),u}static computeShapeHelper(e,n,t,o,i,a,s,u){if(e)for(let l=0;l<n.length-2;l++)t.push(1);else for(let l=0;l<n.length-2;l++)t.push(r.adjustPadAndReturnShape(n[l+2],o[l],i[l],a[l],s,l,l+n.length-2,u))}static adjustPadAndReturnShape(e,n,t,o,i,a,s,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[a]=0,i[s]=0,Math.floor((e-l)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let f=((e+n-1)/n-1)*n+o-e;return i[a]=Math.floor(u==="SAME_LOWER"?(f+1)/2:f/2),i[s]=f-i[a],Math.floor((e+f-o)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[a]+i[s]-l)/n+1)}},Lr=-34028234663852886e22,Rr=34028234663852886e22});function vS(r){switch(r){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw new Error(`cannot calculate sizeof() on type ${r}`)}}function _h(r){switch(r){case Ie.onnx.TensorProto.DataType.UINT8:case Ie.onnx.TensorProto.DataType.INT8:case Ie.onnx.TensorProto.DataType.BOOL:return 1;case Ie.onnx.TensorProto.DataType.UINT16:case Ie.onnx.TensorProto.DataType.INT16:return 2;case Ie.onnx.TensorProto.DataType.FLOAT:case Ie.onnx.TensorProto.DataType.INT32:case Ie.onnx.TensorProto.DataType.UINT32:return 4;case Ie.onnx.TensorProto.DataType.INT64:case Ie.onnx.TensorProto.DataType.DOUBLE:case Ie.onnx.TensorProto.DataType.UINT64:return 8;default:throw new Error(`cannot calculate sizeof() on type ${Ie.onnx.TensorProto.DataType[r]}`)}}function wS(r,e){return new(xh(e))(r)}function xh(r){switch(r){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw new Error("unspecified error")}}function _l(r,e){if(e===Ie.onnx.TensorProto.DataType.INT64||e===So.TensorDataType.INT64){if(r.greaterThanOrEqual(2147483648)||r.lessThan(-2147483648))throw new TypeError("int64 is not supported")}else if(e===Ie.onnx.TensorProto.DataType.UINT32||e===So.TensorDataType.UINT32||e===Ie.onnx.TensorProto.DataType.UINT64||e===So.TensorDataType.UINT64){if(r.greaterThanOrEqual(4294967296)||r.lessThan(0))throw new TypeError("uint64 is not supported")}else throw new TypeError(`not a LONG type: ${Ie.onnx.TensorProto.DataType[e]}`);return r.toNumber()}function vh(r,e,n){switch(e){case Ie.onnx.TensorProto.DataType.BOOL:case Ie.onnx.TensorProto.DataType.UINT8:return r.getUint8(n);case Ie.onnx.TensorProto.DataType.INT8:return r.getInt8(n);case Ie.onnx.TensorProto.DataType.UINT16:return r.getUint16(n,!0);case Ie.onnx.TensorProto.DataType.INT16:return r.getInt16(n,!0);case Ie.onnx.TensorProto.DataType.FLOAT:return r.getFloat32(n,!0);case Ie.onnx.TensorProto.DataType.INT32:return r.getInt32(n,!0);case Ie.onnx.TensorProto.DataType.UINT32:return r.getUint32(n,!0);case Ie.onnx.TensorProto.DataType.INT64:return _l(dr.fromBits(r.getUint32(n,!0),r.getUint32(n+4,!0),!1),e);case Ie.onnx.TensorProto.DataType.DOUBLE:return r.getFloat64(n,!0);case Ie.onnx.TensorProto.DataType.UINT64:return _l(dr.fromBits(r.getUint32(n,!0),r.getUint32(n+4,!0),!0),e);default:throw new Error(`cannot read from DataView for type ${Ie.onnx.TensorProto.DataType[e]}`)}}var wh,Ie,nt,zr=k(()=>{"use strict";wh=ve(zp());Fs();$o();Ie=ve(to());Me();nt=class r{constructor(e,n,t,o,i,a=wh.Guid.create()){this.dims=e;this.type=n;this.dataProvider=t;this.asyncDataProvider=o;this.cache=i;this.dataId=a;this.size=ne.validateDimsAndCalcSize(e);let s=this.size,u=t===void 0&&o===void 0&&i===void 0;if(i!==void 0&&i.length!==s)throw new RangeError("Input dims doesn't match data length.");if(n==="string"){if(i!==void 0&&(!Array.isArray(i)||!i.every(l=>typeof l=="string")))throw new TypeError("cache should be a string array");u&&(this.cache=new Array(s))}else{if(i!==void 0){let l=xh(n);if(!(i instanceof l))throw new TypeError(`cache should be type ${l.name}`)}if(u){let l=new ArrayBuffer(s*vS(n));this.cache=wS(l,n)}}}get data(){if(this.cache===void 0){let e=this.dataProvider(this.dataId);if(e.length!==this.size)throw new Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=e}return this.cache}get stringData(){if(this.type!=="string")throw new TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw new TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw new TypeError("data type is not float (float32, float64)")}}get numberData(){if(this.type!=="string")return this.data;throw new TypeError("type cannot be non-number (string)")}get(e){return this.data[ne.indicesToOffset(e,this.strides)]}set(e,n){this.data[ne.indicesToOffset(e,this.strides)]=n}async getData(){return this.cache===void 0&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=ne.computeStrides(this.dims)),this._strides}static fromProto(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let n=ft.tensorDataTypeFromProto(e.dataType),t=ft.tensorDimsFromProto(e.dims),o=new r(t,n);if(n==="string")e.stringData.forEach((i,a)=>{o.data[a]=Co(i)});else if(e.rawData&&typeof e.rawData.byteLength=="number"&&e.rawData.byteLength>0){let i=o.data,a=new DataView(e.rawData.buffer,e.rawData.byteOffset,e.rawData.byteLength),s=_h(e.dataType),u=e.rawData.byteLength/s;if(e.rawData.byteLength%s!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let d=vh(a,e.dataType,l*s);i[l]=d}}else{let i;switch(e.dataType){case Ie.onnx.TensorProto.DataType.FLOAT:i=e.floatData;break;case Ie.onnx.TensorProto.DataType.INT32:case Ie.onnx.TensorProto.DataType.INT16:case Ie.onnx.TensorProto.DataType.UINT16:case Ie.onnx.TensorProto.DataType.INT8:case Ie.onnx.TensorProto.DataType.UINT8:case Ie.onnx.TensorProto.DataType.BOOL:i=e.int32Data;break;case Ie.onnx.TensorProto.DataType.INT64:i=e.int64Data;break;case Ie.onnx.TensorProto.DataType.DOUBLE:i=e.doubleData;break;case Ie.onnx.TensorProto.DataType.UINT32:case Ie.onnx.TensorProto.DataType.UINT64:i=e.uint64Data;break;default:throw new Error("unspecific error")}if(i==null)throw new Error("failed to populate data from a tensorproto value");let a=o.data;if(a.length!==i.length)throw new Error("array length mismatch");for(let s=0;s<i.length;s++){let u=i[s];dr.isLong(u)?a[s]=_l(u,e.dataType):a[s]=u}}return o}static fromData(e,n,t){return new r(n,t,void 0,void 0,e)}static fromOrtTensor(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let n=ft.tensorDimsFromORTFormat(e),t=ft.tensorDataTypeFromProto(e.dataType()),o=new r(n,t);if(t==="string")for(let i=0;i<e.stringDataLength();i++)o.data[i]=e.stringData(i);else if(e.rawDataArray()&&typeof e.rawDataLength()=="number"&&e.rawDataLength()>0){let i=o.data,a=new DataView(e.rawDataArray().buffer,e.rawDataArray().byteOffset,e.rawDataLength()),s=_h(e.dataType()),u=e.rawDataLength()/s;if(e.rawDataLength()%s!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let d=vh(a,e.dataType(),l*s);i[l]=d}}return o}}});function ue(r){return r===1?xS:TS}function Th(r){let e=ue(r);return`${e.version}
      precision highp float;
      ${e.attribute} vec3 position;
      ${e.attribute} vec2 textureCoord;

      ${e.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function Ih(r){let e=ue(r);return`${e.version}
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

    `}function Sh(r,e){let n=ue(r);return`
  void main() {
    int indices[${e}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${n.output} = result;
  }
  `}var xS,TS,Ke=k(()=>{"use strict";xS={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},TS={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}});var Ae=k(()=>{"use strict"});async function vl(r,e=t=>0,n){return new Promise((t,o)=>{let i=0,a=()=>{if(r()){t();return}i++;let s=e(i);if(n!=null&&i>=n){o();return}setTimeout(a,s)};a()})}function Ri(r){return no(typeof r<"u"&&r.length!==0,()=>"empty string found for sampler name"),"get"+r.charAt(0).toUpperCase()+r.slice(1)}function $h(r){return no(typeof r<"u"&&r.length!==0,()=>"empty string found for sampler name"),"get"+r.charAt(0).toUpperCase()+r.slice(1)+"AtOutCoords"}function ro(r,e){let n=JSON.parse(JSON.stringify(r));return n=e,n}function oo(r,e){return e.map(n=>r[n]).join(", ")}function bt(r){if(r<=1)return"int";if(r===2)return"ivec2";if(r===3)return"ivec3";if(r===4)return"ivec4";if(r===5)return"ivec5";if(r===6)return"ivec6";throw Error(`GPU for rank ${r} is not yet supported`)}function qt(r=6){return["x","y","z","w","u","v"].slice(0,r)}var Nn=k(()=>{"use strict";Me()});function IS(r,e){return qt(e).map(n=>`${r}.${n}`)}function io(r,e){return e===1?[r]:IS(r,e)}function Ln(){return`
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
  `}var Mr=k(()=>{"use strict";Nn()});function $S(r,e,n){if(r===0)return"false";if(r===1)return`rc > ${e[0]}`;let t="";for(let o=r-2;o<r;o++)t+=`${n[o]} >= ${e[o-r+2]}`,o<r-1&&(t+="||");return t}function AS(r,e){let n=r.length;if(n===0)return"getA(), 0, 0, 0";if(n===1)return`getA(rc),
            rc + 1 >= ${r[0]} ? 0. : getA(rc + 1),
            0, 0`;let t="r, c",o="r, cp1",i="rp1, c",a="rp1, cp1",s="";if(n>2)for(let u=0;u<n-2;++u)s=s+`${e[u]},`;return`getA(${s}${t}),
          rEdge ? 0. : getA(${s}${i}),
          cEdge ? 0. : getA(${s}${o}),
          rEdge || cEdge ? 0. : getA(${s}${a})`}function OS(r,e,n,t){return r===0||r===1?"":`
    int r = ${e[r-2]};
    int c = ${e[r-1]};
    int rp1 = ${e[r-2]} + 1;
    int cp1 = ${e[r-1]} + 1;
    bool rEdge = rp1 >= ${t};
    bool cEdge = cp1 >= ${n};
    `}var Ah,SS,Oh,Ph=k(()=>{"use strict";Ke();Ae();Nn();Mr();Ah={name:"pack",inputNames:["A"],inputTypes:[1]},SS=(r,e)=>{let n=ue(r.session.backend.glContext.version),t=e.dims,o=t.length,i=e.dims.length,a=bt(i),s=io("rc",i),u=OS(i,s,t[t.length-2],t[t.length-1]),l;o===0?l=[1,1]:o===1?l=[t[0],1]:l=[t[i-1],t[i-2]];let d=$S(i,l,s),f=AS(t,s),h=`
        void main() {
          ${a} rc = getOutputCoords();

          if(${d}) {
            ${n.output} = vec4(0);
          } else {
            ${u}

            ${n.output} = vec4(${f});
          }
        }
      `;return{...Ah,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:2},shaderSource:h}},Oh=(r,e)=>({...Ah,get:()=>SS(r,e)})});function wl(r){if(r.length===0)return[1,1,1];let e=1;for(let n=0;n<r.length-2;++n)e*=r[n];return[e,r.length>1?r[r.length-2]:1,r[r.length-1]]}function Ch(r,e){let n=!1;return r.length===0||e.length===0?n=!0:r.length<2||e.length<2?n=r[r.length-1]===e[e.length-1]:n=r[r.length-1]===e[e.length-1]&&r[r.length-2]===e[e.length-2],n}function CS(r){let e=ne.computeStrides(r),n=["b","r","c"],t="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${e.map((i,a)=>{let s=`int ${n[a]} = ${t} / ${i}`,u=a===e.length-1?`int ${n[a+1]} = ${t} - ${n[a]} * ${i}`:`index -= ${n[a]} * ${i}`;return`${s}; ${u};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function DS(r){let e=ne.computeStrides(r);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${e[0]} + coords.z * ${e[1]} + coords.y;
  }
`}var PS,ES,Eh,Dh=k(()=>{"use strict";Me();Ke();Ae();Mr();PS=r=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${r}`}),ES=(r,e,n,t)=>{let o=e.dims,i=t,a="";for(let l=0;l<4;l++){let d="";switch(l){case 0:d="outputCoords = rc;";break;case 1:d="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:d="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:d="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw new Error}a+=`
        ${d}
        ${l>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${l}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${l>0?"}":""}
      `}let s=ue(r.session.backend.glContext.version),u=`
      ${CS(o)}
      ${DS(i)}
      ${Ln()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${i[2]};
        int cols = ${i[1]};

        ${a}
        ${s.output} = result;
      }
    `;return{...n,output:{dims:i,type:e.type,textureType:2},shaderSource:u,hasMain:!0}},Eh=(r,e,n)=>{let t=PS(n);return{...t,get:()=>ES(r,e,t,n)}}});var xl,kh=k(()=>{"use strict";Ke();Ae();xl=(r,e)=>{let n=e.shape,t=ue(r.session.backend.glContext.version),o=`
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
    }`,i={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:n,type:e.tensor.type,textureType:3},shaderSource:o,hasMain:!0};return r.executeProgram(i,[e.tensor])}});function NS(r,e){if(r===1)return"rc";let n="";for(let t=0;t<r;t++)n+=e[t],t<r-1&&(n+=",");return n}var Nh,kS,Lh,Rh=k(()=>{"use strict";Ke();Ae();Nn();Mr();Nh={name:"unpack",inputNames:["A"],inputTypes:[2]},kS=(r,e)=>{let n=e.dims.length,t=io("rc",n),o=t.slice(-2),i=bt(n),a=Ln(),u=e.dims.length===0?"":NS(n,t),l=n<=1?"rc":`vec2(${o.join(",")})`,d=ue(r.session.backend.glContext.version),f=`
    ${a}
    void main() {
      ${i} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${u});

       ${d.output} = vec4(getChannel(packedInput, ${l}), 0, 0, 0);
     }
   `;return{...Nh,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:f}},Lh=(r,e)=>({...Nh,get:()=>kS(r,e)})});var zi,Do,Mi,ko=k(()=>{"use strict";Ct();zi=class{constructor(e,n=1){if(n===1)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=n;else if(n===4)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=n;else throw new Error(`Invalid number of channels: ${n}`)}encode(e,n){let t,o;return e.constructor!==Float32Array&&(Fe.warning("Encoder","data was not of type Float32; creating new Float32Array"),o=new Float32Array(e)),n*this.channelSize>e.length?(Fe.warning("Encoder","Source data too small. Allocating larger array"),o=e,t=this.allocate(n*this.channelSize),o.forEach((i,a)=>t[a]=i)):(o=e,t=o),t}allocate(e){return new Float32Array(e*4)}decode(e,n){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,n):e.subarray(0,n)}},Do=class{constructor(e,n=1,t){if(n!==1&&n!==4)throw new Error(`Invalid number of channels: ${n}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=n,this.textureType=t||e.FLOAT}encode(e,n){let t=e;return this.channelSize===1&&(Fe.verbose("Encoder","Exploding into a larger array"),t=this.allocate(n),e.forEach((o,i)=>t[i*4]=o)),t}allocate(e){return new Float32Array(e*4)}decode(e,n){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,n):e.subarray(0,n)}},Mi=class{constructor(e,n=1){this.channelSize=4;if(n===1)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=n;else if(n===4)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=n;else throw new Error(`Invalid number of channels: ${n}`)}encode(e,n){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,n){if(e instanceof Uint8Array)return e.subarray(0,n);throw new Error(`Invalid array type: ${e.constructor}`)}}});var No,zh,Tl,Mh=k(()=>{"use strict";Me();Ae();No=(r,e,n)=>{let t=n===0||n===1?1:4,o=n===2,i=n===1||n===2,a=n===4?e.length-1:void 0,s=n===4?e.map((u,l)=>l===e.length-1?u*4:u):void 0;return Tl(r,e,t,s,{isPacked:o,reverseWH:i,breakAxis:a})},zh=(r,e,n)=>{let t=No(r,e,n);return[t.width,t.height]},Tl=(r,e,n=1,t,o)=>{let i=!!(o&&o.isPacked),[a,s]=r.computeTextureWH(i&&t||e,o),u=e.length,l=e.slice(0);if(u===0&&(l=[1]),n===1)t=e;else if(i){if(n!==4)throw new Error("a packed texture must be 4-channel");t=e,u>0&&(l[u-1]=Math.ceil(l[u-1]/2)),u>1&&(l[u-2]=Math.ceil(l[u-2]/2))}else if(!t)throw new Error("Unpacked shape is needed when using channels > 1");return{width:a,height:s,channels:n,isPacked:i,shape:l,strides:ne.computeStrides(l),unpackedShape:t,reversedWH:o&&o.reverseWH}}});var RS,Bi,Fh=k(()=>{"use strict";Ct();zr();Me();Ph();Dh();kh();Rh();ko();Mh();Ae();RS=(r,e)=>{let n=e.map(o=>`${o.unpackedShape.join(",")};${o.width}x${o.height}`).join("_"),t=r.name;return r.cacheHint&&(t+="["+r.cacheHint+"]"),t+=":"+n,t},Bi=class{constructor(e){this.session=e;this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,n){return zh(this.session.layoutStrategy,e,n)}executeProgram(e,n){if(n.length<e.inputNames.length)throw new Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw new Error("input names size does not match input types");let t=[];for(let l=0;l<e.inputNames.length;++l)t[l]=this.getOrCreateTextureData(n[l],e.inputTypes[l]);let o=RS(e,t),i=this.session.programManager.getArtifact(o),a=i?i.programInfo:typeof e.get=="function"?e.get():e,s=No(this.session.layoutStrategy,a.output.dims,a.output.textureType),u=this.createTextureData(s,a.output.type);return i||(i=this.session.programManager.build(a,t,u),this.session.programManager.setArtifact(o,i)),this.runProgram(i,t,u),u}run(e,n){return this.executeProgram(e,n).tensor}runProgram(e,n,t){for(let o=0;o<n.length;++o)if(!!n[o].isPacked!=(e.programInfo.inputTypes[o]===2))throw new Error(`input[${o}] property packed inconsistent`);if(!!t.isPacked!=(e.programInfo.output.textureType===2))throw new Error("output property packed inconsistent");this.session.programManager.run(e,n,t)}getOrCreateTextureData(e,n){let t=this.getTextureData(e.dataId,n===2);if(!t&&(t=this.getTextureData(e.dataId,n!==2),t))return n===2?this.pack(t):this.unpack(t);if(!t){let o=No(this.session.layoutStrategy,e.dims,n);if(n===4){let s=e.dims;if(s.length===4){let u=[s[0],Math.ceil(s[1]*s[2]*s[3]/4)],l=No(this.session.layoutStrategy,u,n),d=e.numberData;if(s[1]*s[2]*s[3]%4!==0){let f=s[0],h=s[1]*s[2]*s[3],g=Math.ceil(h*1/4)*4,b=f*g;d=new Float32Array(b);for(let _=0;_<f;++_){let T=_*h,v=_*g+_%1*h;d.set(e.numberData.subarray(T,T+h),v)}}return this.createTextureData(l,e.type,d,e,1)}}if(n===2){let i=Tl(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),a=this.createTextureData(i,e.type,e.numberData,e,1);t=this.pack(a)}else t=this.createTextureData(o,e.type,e.numberData,e,1)}return t}createTextureDataFromLayoutBindTensor(e,n,t,o){return this.createTextureData(e,n,t,o,1)}createTextureData(e,n,t,o,i){Fe.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let a=this.session.textureManager.createTextureFromLayout(n,e,t,i);return this.createTextureDataFromTexture(e,n,a,o)}reshapeUnpacked(e,n){let t=this.getOrCreateTextureData(e,0),o={channels:t.channels,height:t.height,width:t.width,shape:n.length!==0?n:[1],strides:ne.computeStrides(n),unpackedShape:n};return this.createTextureDataFromTexture(o,e.type,t.texture).tensor}reshapePacked(e,n){let t=this.getOrCreateTextureData(e,2);if(Ch(e.dims,n)){let l={channels:t.channels,height:t.height,width:t.width,shape:n.length!==0?n:[1],strides:ne.computeStrides(n),unpackedShape:n,isPacked:!0};return this.createTextureDataFromTexture(l,e.type,t.texture).tensor}let o=wl(e.dims),i=wl(n),a=this.reshapePacked(e,o),s=this.run(Eh(this,a,i),[a]);return this.reshapePacked(s,n)}cast(e,n){let t=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(t,n,t.texture).tensor}createTextureDataFromTexture(e,n,t,o,i){let a={...e,tensor:o||new nt(e.unpackedShape,n,s=>this.readTexture(a),async s=>this.readTextureAsync(a),void 0,i),texture:t};return this.setTextureData(a.tensor.dataId,a,e.isPacked),a}getTextureData(e,n=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,n):n?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,n,t=!1){this.session.isInitializer(e)?this.session.setTextureData(e,n,t):(t?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,n)}isTextureLayoutCached(e,n=!1){return!!this.getTextureData(e.dataId,n)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(xl(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(xl(this,e))}pack(e){return this.executeProgram(Oh(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(Lh(this,e.tensor),[e.tensor])}}});var Il,xe,lt=k(()=>{"use strict";Il=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},xe=r=>new Il(r)});var Vh,Gh,Uh,zS,MS,Wh=k(()=>{"use strict";lt();Ke();Ae();Vh={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},Gh=(r,e,n)=>(MS(e),[r.run({...Vh,cacheHint:n.cacheKey,get:()=>zS(r,e,n)},e)]),Uh=r=>{let e=r.attributes.getFloat("epsilon",1e-5),n=r.attributes.getFloat("momentum",.9),t=r.attributes.getInt("spatial",1);return xe({epsilon:e,momentum:n,spatial:t})},zS=(r,e,n)=>{let t=ue(r.session.backend.glContext.version),o=e[0].dims.length,[i,a]=r.calculateTextureWidthAndHeight(e[1].dims,0),s=`
  float process(int[${o}] indices) {
    vec2 position = offsetToCoords(indices[1], ${i}, ${a});
    float scale = getColorAsFloat(${t.texture2D}(Scale, position));
    float mean = getColorAsFloat(${t.texture2D}(Mean, position));
    float variance = getColorAsFloat(${t.texture2D}(Variance, position));
    float b = getColorAsFloat(${t.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${n.epsilon})) ) + b;
  }`;return{...Vh,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:s}},MS=r=>{if(!r||r.length!==5)throw new Error("BatchNormalization requires 5 inputs.");let e=r[0],n=r[1],t=r[2],o=r[3],i=r[4];if(e.dims.length<3||n.dims.length!==1||t.dims.length!==1||o.dims.length!==1||i.dims.length!==1)throw new Error("invalid input shape.");if(n.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1]||o.dims[0]!==e.dims[1]||i.dims[0]!==e.dims[1])throw new Error("invalid input shape.");if(e.type!=="float32"&&e.type!=="float64"||n.type!=="float32"&&n.type!=="float64"||t.type!=="float32"&&t.type!=="float64"||o.type!=="float32"&&o.type!=="float64"||i.type!=="float32"&&i.type!=="float64")throw new Error("invalid input tensor types.")}});var Fi,zt,Y,Lo,Vi,Jn=k(()=>{"use strict";Fi=class{constructor(e,n,t,o){this.glContext=e;this.programInfo=n;this.inputTextureLayouts=t;this.outputTextureLayout=o}},zt=class{constructor(e){this.context=e}},Y=class{constructor(e,n){this.routineBody=e;this.dependencies=n}},Lo=class{constructor(e,n,t){this.name=e;t?this.dependencies=t:this.dependencies=[],n&&(this.routineBody=n)}addDependency(e){e&&this.dependencies.push(e)}},Vi=class{static returnOrderedNodes(e){if(!e||e.length===0)return[];if(e.length===1)return e;let n=new Set,t=new Set,o=new Array;return this.createOrderedNodes(e,n,t,o),o}static createOrderedNodes(e,n,t,o){for(let i=0;i<e.length;++i)this.dfsTraverse(e[i],n,t,o)}static dfsTraverse(e,n,t,o){if(!e||t.has(e.name))return;if(n.has(e.name))throw new Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");n.add(e.name);let i=e.dependencies;if(i&&i.length>0)for(let a=0;a<i.length;++a)this.dfsTraverse(i[a],n,t,o);o.push(e),t.add(e.name),n.delete(e.name)}}});function FS(){let r="add_";return{body:`
  float ${r}(float a, float b) {
    return a + b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:r,type:0}}function VS(){let r="div_";return{body:`
  float ${r}(float a, float b) {
    return a / b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:r,type:0}}function GS(){let r="mul_";return{body:`
  float ${r}(float a, float b) {
    return a * b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:r,type:0}}function US(){let r="sub_";return{body:`
  float ${r}(float a, float b) {
    return a - b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:r,type:0}}function WS(){let r="equal_";return{body:`
  float ${r}(float a, float b) {
    return float(a == b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:r,type:0}}function HS(){let r="greater_";return{body:`
  float ${r}(float a, float b) {
    return float(a > b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:r,type:0}}function jS(){let r="less_";return{body:`
  float ${r}(float a, float b) {
    return float(a < b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:r,type:0}}function qS(){let r="and_";return{body:`
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
  `,name:r,type:0}}function KS(){let r="or_";return{body:`
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
  `,name:r,type:0}}function XS(){let r="xor_";return{body:`
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
  `,name:r,type:0}}function ZS(){return YS("pow")}function JS(){let r="prelu_";return{body:`
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
  `,name:r,type:0}}function YS(r){let e=`${r}_`;return{body:`
  float ${e}(float a, float b) {
    return ${r}(a, b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return ${r}(v1, v2);
  }
  `,name:e,type:0}}var Mt,QS,Hh,jh,qh,Kh,Xh,Zh,Jh,Yh,Qh,em,tm,nm,rm=k(()=>{"use strict";Me();Jn();Ke();Ae();Mt=(r,e,n,t=e[0].type,o)=>{let i=r.session.pack?2:0;return{name:n.name,inputNames:["A","B"],inputTypes:[i,i],cacheHint:o,get:()=>QS(r,e,n,t)}},QS=(r,e,n,t=e[0].type)=>{let o=r.session.pack?2:0,i=!ne.areEqual(e[0].dims,e[1].dims),a=e[0].dims,s=r.session.pack;if(i){let d=gt.calcShape(e[0].dims,e[1].dims,!1);if(!d)throw new Error("Can't perform binary op on the given tensors");a=d;let f=a.length,h=e[0].dims.length!==0?e[0].dims.length:1,g=e[1].dims.length!==0?e[1].dims.length:1,b=e[0].dims.length!==0?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",_=e[1].dims.length!==0?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",T=ue(r.session.backend.glContext.version),v=s?`
      ${n.body}
      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();
        vec4 result = ${n.name}(a, b);
        ${T.output} = result;
      }`:`
      ${n.body}
      float process(int indices[${f}]) {
        int aindices[${h}];
        int bindices[${g}];
        ${b}
        ${_}
        return ${n.name}(_A(aindices), _B(bindices));
      }`;return{name:n.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:a,type:t,textureType:o},shaderSource:v,hasMain:s}}let u=ue(r.session.backend.glContext.version),l=`
    ${n.body}
    void main() {
      vec4 v1 = ${u.texture2D}(A, TexCoords);
      vec4 v2 = ${u.texture2D}(B, TexCoords);
      vec4 result = ${n.name}(v1, v2);
      ${u.output} = result;
    }
    `;return{name:n.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:e[0].dims,type:t,textureType:o},shaderSource:l,hasMain:!0}},Hh=(r,e)=>[r.run(Mt(r,e,FS()),e)],jh=(r,e)=>[r.run(Mt(r,e,qS(),"bool"),e)],qh=(r,e)=>[r.run(Mt(r,e,VS()),e)],Kh=(r,e)=>[r.run(Mt(r,e,WS(),"bool"),e)],Xh=(r,e)=>[r.run(Mt(r,e,HS(),"bool"),e)],Zh=(r,e)=>[r.run(Mt(r,e,jS(),"bool"),e)],Jh=(r,e)=>[r.run(Mt(r,e,GS()),e)],Yh=(r,e)=>[r.run(Mt(r,e,KS(),"bool"),e)],Qh=(r,e)=>[r.run(Mt(r,e,ZS()),e)],em=(r,e)=>[r.run(Mt(r,e,JS()),e)],tm=(r,e)=>[r.run(Mt(r,e,US()),e)],nm=(r,e)=>[r.run(Mt(r,e,XS(),"bool"),e)]});var om,im,t$,am=k(()=>{"use strict";Me();om=(r,e,n)=>(t$(e),[r.cast(e[0],n)]),im=r=>ft.tensorDataTypeFromProto(r.attributes.getInt("to")),t$=r=>{if(!r||r.length!==1)throw new Error("Cast requires 1 input.");if(r[0].type==="string")throw new Error("Invalid input type.")}});var n$,r$,sm,Gi,um=k(()=>{"use strict";Ke();Ae();Nn();Mr();n$=(r,e)=>({name:"Concat (packed)",inputNames:Array.from({length:r},(n,t)=>`X${t}`),inputTypes:Array(r).fill(2),cacheHint:e}),r$=(r,e,n,t)=>{let o=n[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let O=1;O<n.length;O++){let E=n[O].dims.slice();for(let L=0;L<o.length;L++)if(L===t)i[t]+=E[L];else if(o[L]!==E[L])throw new Error("non concat dimensions must match")}let a=i.length,s=io("coords",a),u=bt(a),l=Ln(),d=n.map(O=>O.dims),f=qt(a),h=new Array(d.length-1);h[0]=d[0][t];for(let O=1;O<h.length;O++)h[O]=h[O-1]+d[O][t];let g=f[t],b=f.slice(-2),_=f.join(),T=`if (${g} < ${h[0]}) {
        return getChannel(
            getX0(${_}), vec2(${b.join()}));
        }`;for(let O=1;O<h.length;O++){let E=h[O-1];T+=`
            if (${g} < ${h[O]}  && ${g} >= ${h[O-1]}) {
              return getChannel(
                getX${O}(${Gi(f,g,E)}),
                vec2(${Gi(b,g,E)}));
            }`}let v=h.length,x=h[h.length-1];T+=`
            return getChannel(
              getX${v}(${Gi(f,g,x)}),
              vec2(${Gi(b,g,x)}));`;let I=ue(r.session.backend.glContext.version),$=`
          ${l}
          float getValue(${f.map(O=>"int "+O)}) {
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
            ${I.output} = result;
          }
        `;return{...e,output:{dims:i,type:n[0].type,textureType:2},shaderSource:$,hasMain:!0}},sm=(r,e,n)=>{let t=n$(e.length,n.cacheKey);return{...t,get:()=>r$(r,t,e,n.axis)}},Gi=(r,e,n)=>{let t=r.indexOf(e);return r.map((i,a)=>a===t?`${i} - ${n}`:i).join()}});var lm,o$,i$,a$,cm,s$,u$,l$,dm,c$,pm=k(()=>{"use strict";lt();Ae();um();lm=(r,e,n)=>(c$(e),r.session.pack&&e[0].dims.length>1?[r.run(sm(r,e,n),e)]:[r.run(a$(r,e,n),e)]),o$=(r,e)=>({name:"Concat",inputNames:Array.from({length:r},(n,t)=>`X${t}`),inputTypes:Array(r).fill(0),cacheHint:e}),i$=(r,e,n,t)=>{let o=n[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let g=1;g<n.length;g++){let b=n[g].dims.slice();for(let _=0;_<o.length;_++)if(_===t)i[t]+=b[_];else if(o[_]!==b[_])throw new Error("non concat dimensions must match")}let a=i.length,s=new Array(n.length),u=0;for(let g=0;g<s.length;++g)u+=n[g].dims[t],s[g]=u;let l="";n.length<5?l=cm(s):l=s$(s);let d=u$(n.length,a),f=l$(s),h=`
        ${d}
        ${f}
        ${l}
        float process(int indices[${a}]) {
          int textureIndex = getTextureWhereDataResides (indices[${t}]);

          if(textureIndex != 0) {
            indices[${t}] = indices[${t}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:h}},a$=(r,e,n)=>{let t=o$(e.length,n.cacheKey);return{...t,get:()=>i$(r,t,e,n.axis)}},cm=r=>`int getTextureWhereDataResides(int index) {
      ${r.map((n,t)=>`if(index<${n}) {return ${t};}
`).join("")}
    }`,s$=r=>cm(r),u$=(r,e)=>{let n=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${e}]) {`];for(let t=0;t<r;++t)t===0?n.push(`	if (textureIndex == ${t}) { return _X${t}(indices); }`):t===r-1?n.push(`	else { return _X${t}(indices); }`):n.push(`	else if (textureIndex == ${t}) { return _X${t}(indices); }`);return n.push("	}"),n.join(`
`)},l$=r=>{let e=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let n=0;n<r.length;++n)n===0?e.push(`	if (index == ${n}) { return ${r[n]}; }`):n===r.length-1?e.push(`	else { return ${r[n]}; }`):e.push(`	else if (index == ${n}) { return ${r[n]}; }`);return e.push("	}"),e.join(`
`)},dm=r=>xe({axis:r.attributes.getInt("axis")}),c$=r=>{if(!r||r.length<1)throw new Error("too few inputs");let e=r[0].type,n=r[0].dims.length;if(e==="string")throw new Error("string tensor is not supported yet");for(let t of r){if(t.type!==e)throw new Error("input tensors should be one type");if(t.dims.length!==n)throw new Error("input tensors should have the same shape")}}});function d$(){return Bt("abs")}function p$(){return Bt("acos")}function f$(){return Bt("asin")}function h$(){return Bt("atan")}function m$(){return Bt("ceil")}function g$(){return Bt("cos")}function b$(r){let e="elu";return{body:`
  const float alpha = float(${r});

  float ${e}_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function y$(){return Bt("exp")}function _$(){return Bt("floor")}function Sl(r,e){let n="clip";return{body:`
  const float min = float(${r});
  const float max = float(${e});

  float ${n}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${n}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:n,type:0}}function v$(){let r="indentity";return{body:`
  float ${r}_(float a) {
    return a;
  }
  vec4 ${r}_(vec4 v) {
    return v;
  }
  `,name:r,type:0}}function w$(r){let e="leakyRelu";return{body:`
  const float alpha = float(${r});

  float ${e}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function x$(){return Bt("log")}function T$(){let r="neg";return{body:`
  float ${r}_(float a) {
    return -a;
  }
  vec4 ${r}_(vec4 v) {
    return -v;
  }
  `,name:r,type:0}}function I$(){let r="not";return{body:`
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
  `,name:r,type:0}}function S$(){return Bt("sin")}function $l(){let r="relu";return{body:`
  float ${r}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${r}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:r,type:0}}function Al(){let r="sigmoid";return{body:`
  float ${r}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${r}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:r,type:0}}function $$(){return Bt("sqrt")}function A$(){return Bt("tan")}function O$(){let r="tanh";return{body:`
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
  `,name:r,type:0}}function Bt(r){return{body:`
  float ${r}_(float a) {
    return ${r}(a);
  }
  vec4 ${r}_(vec4 v) {
    return ${r}(v);
  }
  `,name:r,type:0}}var P$,et,fm,hm,mm,gm,Ol,bm,ym,E$,_m,vm,wm,xm,Tm,Im,Pl,Sm,$m,Am,Om,Pm,Em,Cm,Dm,km,Nm,Lm,El=k(()=>{"use strict";lt();Me();Jn();Ke();Ae();P$=(r,e,n,t)=>{let o=r.session.pack?2:0,i=ue(r.session.backend.glContext.version);return{...e,output:{dims:n.dims,type:n.type,textureType:o},shaderSource:`
     ${t.body}
     void main() {
       vec4 v = ${i.texture2D}(A, TexCoords);
       v = ${t.name}_(v);
       ${i.output} = v;
     }
     `,hasMain:!0}},et=(r,e,n,t)=>{let o=r.session.pack?2:0,i={name:n.name,inputTypes:[o],inputNames:["A"],cacheHint:t};return{...i,get:()=>P$(r,i,e,n)}},fm=(r,e)=>[r.run(et(r,e[0],d$()),e)],hm=(r,e)=>[r.run(et(r,e[0],p$()),e)],mm=(r,e)=>[r.run(et(r,e[0],f$()),e)],gm=(r,e)=>[r.run(et(r,e[0],h$()),e)],Ol=(r,e,n)=>[r.run(et(r,e[0],Sl(n.min,n.max),n.cacheKey),e)],bm=r=>xe({min:r.attributes.getFloat("min",Lr),max:r.attributes.getFloat("max",Rr)}),ym=(r,e)=>{let n=E$(r,e);return Ol(r,[e[0]],n)},E$=(r,e)=>{if(e.length>=3&&(!r.session.isInitializer(e[1].dataId)||!r.session.isInitializer(e[2].dataId)))throw new Error("dynamic clip attributes are not allowed");let n=e.length>=3?e[1].numberData[0]:Lr,t=e.length>=3?e[2].numberData[0]:Rr;return xe({min:n,max:t})},_m=(r,e)=>[r.run(et(r,e[0],m$()),e)],vm=(r,e)=>[r.run(et(r,e[0],g$()),e)],wm=(r,e,n)=>[r.run(et(r,e[0],b$(n.alpha),n.cacheKey),e)],xm=r=>xe({alpha:r.attributes.getFloat("alpha",1)}),Tm=(r,e)=>[r.run(et(r,e[0],y$()),e)],Im=(r,e)=>[r.run(et(r,e[0],_$()),e)],Pl=(r,e)=>[r.run(et(r,e[0],v$()),e)],Sm=(r,e,n)=>[r.run(et(r,e[0],w$(n.alpha),n.cacheKey),e)],$m=r=>xe({alpha:r.attributes.getFloat("alpha",.01)}),Am=(r,e)=>[r.run(et(r,e[0],x$()),e)],Om=(r,e)=>[r.run(et(r,e[0],T$()),e)],Pm=(r,e)=>[r.run(et(r,e[0],I$()),e)],Em=(r,e)=>[r.run(et(r,e[0],$l()),e)],Cm=(r,e)=>[r.run(et(r,e[0],Al()),e)],Dm=(r,e)=>[r.run(et(r,e[0],S$()),e)],km=(r,e)=>[r.run(et(r,e[0],$$()),e)],Nm=(r,e)=>[r.run(et(r,e[0],A$()),e)],Lm=(r,e)=>[r.run(et(r,e[0],O$()),e)]});function Rn(r){let e;switch(r.activation){case"Relu":e=$l();break;case"Sigmoid":e=Al();break;case"Clip":e=Sl(r.clipMin,r.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let n=e.name,t=e.body,o=`value = ${n}_(value);`;return{activationFunction:t,applyActivation:o}}var ao,Br=k(()=>{"use strict";Me();El();ao=r=>{let e=r.getString("activation","");if(e==="Clip"){let[n,t]=r.getFloats("activation_params",[Lr,Rr]);return{activation:e,clipMax:t,clipMin:n,activationCacheKey:`${e}:${n},${t}`}}return{activation:e,activationCacheKey:e}}});var D$,k$,Rm,zm=k(()=>{"use strict";Ct();Ke();Ae();Ui();Br();D$=(r,e)=>({name:"GroupedConv",inputNames:r?["X","W","Bias"]:["X","W"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e}),k$=(r,e,n,t)=>{let i=e.length>2?"value += getBias(output_channel);":"",a=e[0].dims.slice(),s=e[1].dims.slice(),u=s[0]/t.group;Fe.verbose("GroupedConv",`autpPad:${t.autoPad}, dilations:${t.dilations}, group:${t.group}, kernelShape:${t.kernelShape}, pads:${t.pads}, strides:${t.strides}`);let l=so(a,s,t.dilations,t.pads,t.strides),d=ue(r.session.backend.glContext.version),{activationFunction:f,applyActivation:h}=Rn(t),g=`
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
    ${h}
    ${d.output} = vec4(value, .0, .0, .0);
  }
`;return{...n,output:{dims:l,type:e[0].type,textureType:0},shaderSource:g,hasMain:!0}},Rm=(r,e,n)=>{let t=D$(e.length>2,n.cacheKey);return{...t,get:()=>k$(r,e,t,n)}}});var N$,L$,Mm,Bm=k(()=>{"use strict";Ke();Ae();Mr();N$=r=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:r}),L$=(r,e,n,t,o,i)=>{let a=n.dims,s=t.dims,u=2,l=3,d=o.length,f=[s[1]*s[2]*s[3],o[2]*o[3]],h=s[2]*s[3],g=Ln(),b=ue(r.session.backend.glContext.version),_="";for(let v=0;v<=1;v++)for(let x=0;x<=1;x++)_+=`
            blockIndex = rc.x + ${x};
            pos = rc.y + ${v};

            if(blockIndex < ${f[1]} && pos < ${f[0]}) {
              offsetY = int(blockIndex / (${o[d-1]})) * ${i.strides[0]} -
                ${i.pads[0]};
              d0 = offsetY + ${i.dilations[0]} * (imod(pos, ${h}) / ${s[2]});

              if(d0 < ${a[u]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${o[d-1]}) * ${i.strides[1]} -
                  ${i.pads[1]};
                d1 = offsetX + ${i.dilations[1]} * imod(imod(pos, ${h}), ${s[2]});

                if(d1 < ${a[l]} && d1 >= 0) {

                  ch = int(float(pos)/ ${h}.);
                    innerDims = vec2(d0, d1);
                    result[${v*2+x}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;let T=`
      ${g}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${_}
          ${b.output} = result;
      }
            `;return{...e,output:{dims:f,type:n.type,textureType:2},shaderSource:T,hasMain:!0}},Mm=(r,e,n,t,o)=>{let i=N$(o.cacheKey);return{...i,get:()=>L$(r,i,e,n,t,o)}}});function z$(r,e,n){let t=e[0].dims,o=e[1].dims,i=gt.calcShape(t,o,!0);if(!i)throw new Error("Can't use matmul on the given tensors");let a=bt(i.length),s=qt(),{activationFunction:u,applyActivation:l}=Rn(n),d=e.length>2,f=d?"value += getBiasForMatmul();":"",h=d?`${Dl(a,s,e[2].dims,i,!1)}`:"",g=i.length,b=t.length,_=o.length,T=t[t.length-1],v=`
    ${u}
    ${h}
    float process(int indices[${g}]) {
        int a[${b}];
        int b[${_}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${T}; ++k) {
            a[${b-1}] = k;
            b[${_-2}] = k;
            value += _A(a) * _B(b);
        }
        ${f}
        ${l}
        return value;
    }`;return{...r,output:{dims:i,type:e[0].type,textureType:0},shaderSource:v}}function Cl(r,e){let n=R$(r.length>2,e.activationCacheKey);return{...n,get:()=>z$(n,r,e)}}function Dl(r,e,n,t,o){let i="",a=n.length,s=t.length,u=s-a;s<2&&a>0?i="coords":i=n.map((_,T)=>`coords.${e[T+u]}`).join(", ");let d=gt.getBroadcastDims(n,t).map(_=>`coords.${e[_+u]} = 0;`).join(`
`),h=ne.size(n)===1,g="vec4(outputValue.xx, outputValue.yy)";return h&&(g="vec4(outputValue.x)"),o?`
vec4 getBiasForMatmul() {
  ${r} coords = getOutputCoords();
  ${d}
  vec4 outputValue = getBias(${i});
  return ${g};
}`:`
float getBiasForMatmul() {
  ${r} coords = getOutputCoords();
  ${d}
  return getBias(coords.x);
}`}var Fm,Vm,R$,M$,Wi=k(()=>{"use strict";Me();Ae();Nn();Br();kl();Fm=(r,e,n)=>(M$(e),r.session.pack?[r.run(Hi(r,e,n),e)]:[r.run(Cl(e,n),e)]),Vm=r=>ao(r.attributes),R$=(r,e)=>({name:"MatMul",inputNames:r?["A","B","Bias"]:["A","B"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e});M$=r=>{if(!r||r.length!==2)throw new Error("MatMul requires 2 inputs.");if(r[0].dims[r[0].dims.length-1]!==r[1].dims[r[1].dims.length-2])throw new Error("shared dimension does not match.");if(r[0].type!=="float32"&&r[0].type!=="float64"||r[1].type!=="float32"&&r[1].type!=="float64")throw new Error("inputs should be float type");if(r[0].type!==r[1].type)throw new Error("inputs types should match")}});function V$(r,e,n,t){let o=[],i=[],a=n[0].dims,s=n[1].dims,u=a.length,l=s.length,d=t.length,f=d-u,h=d-l;o=a.map((I,$)=>`coords.${e[$+f]}`),o[u-1]="i*2",o.join(", "),i=s.map((I,$)=>`coords.${e[$+h]}`),i[l-2]="i*2",i.join(", ");let g=gt.getBroadcastDims(a,t),b=gt.getBroadcastDims(s,t),_=g.map(I=>`coords.${e[I+f]} = 0;`).join(`
`),T=b.map(I=>`coords.${e[I+h]} = 0;`).join(`
`),v=`int lastDim = coords.${e[d-1]};
  coords.${e[d-1]} = coords.${e[d-2]};
  coords.${e[d-2]} = lastDim;`;return`
vec4 getAAtOutCoordsMatmul(int i) {
  ${r} coords = getOutputCoords();
  ${v}
  ${_}
  vec4 outputValue = getA(${o});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${r} coords = getOutputCoords();
  ${v}
  ${T}
  vec4 outputValue = getB(${i});
  return outputValue;
}`}function G$(r,e){let n="";for(let t=0;t<e-2;t++)n+=`rc.${r[t]}, `;return n+=`rc.${r[e-2]}, i*2`,n}function U$(r,e){let n="";for(let t=0;t<e-2;t++)n+=`rc.${r[t]}, `;return n+=`i*2, rc.${r[e-1]}`,n}var B$,F$,Hi,kl=k(()=>{"use strict";Me();Ke();Ae();Nn();Br();Wi();B$=(r,e)=>({name:"MatMul (packed)",inputNames:r?["A","B","Bias"]:["A","B"],inputTypes:r?[2,2,2]:[2,2],cacheHint:e}),F$=(r,e,n,t)=>{let o=n.length>2,i=o?"value += getBiasForMatmul();":"",a=n[0].dims,s=n[1].dims,u=gt.calcShape(a,s,!0),l=!ne.areEqual(n[0].dims,n[1].dims);if(!u)throw new Error("Can't use matmul on the given tensors");let d=a[a.length-1],f=Math.ceil(d/2),h=a.length,g=s.length,b=ue(r.session.backend.glContext.version),_=bt(u.length),T=u.length,v=qt(),{activationFunction:x,applyActivation:I}=Rn(t),$=o?`${Dl(_,v,n[2].dims,u,!0)}`:"",O=l?`${V$(_,v,n,u)}`:"",E=l?"getAAtOutCoordsMatmul(i)":`getA(${G$(v,h)})`,L=l?"getBAtOutCoordsMatmul(i)":`getB(${U$(v,g)})`,R=l?"":`${_} rc =
          getOutputCoords(); int lastDim = rc.${v[T-1]}; rc.${v[T-1]} =
          rc.${v[T-2]}; rc.${v[T-2]} = lastDim;
      `,F=`
            ${O}
            ${$}
            ${x}
            void main() {
              ${R}

              vec4 value = vec4(0);
              for (int i = 0; i < ${f}; i++) {
                vec4 a = ${E};
                vec4 b = ${L};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${i}
              ${I}
              ${b.output} = value;
            }`;return{...e,output:{dims:u,type:n[0].type,textureType:2},shaderSource:F,hasMain:!0}},Hi=(r,e,n)=>{let t=B$(e.length>2,n.activationCacheKey);return{...t,get:()=>F$(r,t,e,n)}}});var Gm,Um=k(()=>{"use strict";Ui();Bm();kl();Gm=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=so(t,o,n.dilations,n.pads,n.strides),a=r.run(Mm(r,e[0],e[1],i,n),[e[0]]),s=r.reshapePacked(e[1],[o[0],o[1]*o[2]*o[3]]),u=e.length===3?[s,a,e[2]]:[s,a],l=r.run(Hi(r,u,n),u);return r.reshapePacked(l,i)}});var W$,H$,Wm,Nl,Ll=k(()=>{"use strict";Ae();W$=r=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:r}),H$=(r,e,n,t,o,i)=>{let a=n.dims,s=t.dims,u=o.length,l=Nl(a,s,o,4),d=`
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
        `;return{...e,output:{dims:l,type:n.type,textureType:4},shaderSource:d}},Wm=(r,e,n,t,o)=>{let i=W$(o.cacheKey);return{...i,get:()=>H$(r,i,e,n,t,o)}},Nl=(r,e,n,t=4)=>[n[0],n[2],n[3],Math.ceil(r[1]*e[2]*e[3]/t)]});var j$,q$,Hm,jm=k(()=>{"use strict";Me();Ke();Ae();Br();Ll();j$=(r,e)=>({name:"ConvDotProduct",inputNames:r?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:r?[0,4,0]:[0,4],cacheKey:e.activationCacheKey}),q$=(r,e,n,t,o)=>{let i=n[0].dims,a=n[1].dims,s=[a[0],Math.ceil(i[1]*a[2]*a[3]/4)],u=Nl(i,a,t),[l,d]=r.calculateTextureWidthAndHeight(s,4),f=ne.computeStrides(u),[h,g]=r.calculateTextureWidthAndHeight(u,4),b=t.length,_=n.length<3?"0.0":"_B(b)",T=Math.ceil(i[1]*a[2]*a[3]/4),{activationFunction:v,applyActivation:x}=Rn(o),I=ue(r.session.backend.glContext.version),$=`
${v}
float process(int indices[${b}]) {
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
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${h}, ${g});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${l}, ${d});
    value += dot(${I.texture2D}(Im2Col, im2colCoords), ${I.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${x}
  return value;
}`;return{...e,output:{dims:t,type:n[0].type,textureType:0},shaderSource:$}},Hm=(r,e,n,t)=>{let o=j$(e.length>2,t);return{...o,get:()=>q$(r,o,e,n,t)}}});var so,Rl,K$,X$,Z$,J$,zl,Y$,Ui=k(()=>{"use strict";lt();Me();zm();Um();jm();Br();Ll();Wi();so=(r,e,n,t,o)=>{let i=r[0],a=r.slice(2),s=a.length,u=e[0],d=e.slice(2).map((b,_)=>b+(b-1)*(n[_]-1)),h=a.map((b,_)=>b+t[_]+t[_+s]).map((b,_)=>Math.floor((b-d[_]+o[_])/o[_]));return[i,u].concat(...h)},Rl=(r,e,n)=>(Y$(e,n),K$(r,e,n)),K$=(r,e,n)=>{let t=J$(n,e),o=r.session.pack,i=t.kernelShape[0]===1&&t.kernelShape[1]===1;return t.group>1?[r.run(Rm(r,e,t),e)]:i&&o?[X$(r,e,t)]:o&&e[0].dims.length===4&&e[0].dims[0]===1&&!i?[Gm(r,e,t)]:[Z$(r,e,t)]},X$=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=so(t,o,n.dilations,n.pads,n.strides),a=r.reshapeUnpacked(e[0],[t[1],t[2]*t[3]]),s=r.reshapeUnpacked(e[1],[o[0],o[1]]),u=e.length>2?[s,a,e[2]]:[s,a],l=r.run(Cl(u,n),u);return r.reshapeUnpacked(l,i)},Z$=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=so(t,o,n.dilations,n.pads,n.strides),a=r.run(Wm(r,e[0],e[1],i,n),[e[0]]),s=e.length===3?[a,e[1],e[2]]:[a,e[1]];return r.run(Hm(r,e,i,n),s)},J$=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0)for(let i=2;i<e[1].dims.length;++i)n.push(e[1].dims[i]);let t=r.pads.slice();Nr.adjustPadsBasedOnAutoPad(e[0].dims,r.strides,r.dilations,n,t,r.autoPad);let o=Object.assign({},r);return Object.assign(o,{kernelShape:n,pads:t,cacheKey:r.cacheKey}),o},zl=r=>{let e=r.attributes,n=ao(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),a=e.getInts("kernel_shape",[]),s=e.getInts("pads",[0,0,0,0]),u=e.getInts("strides",[1,1]);return xe({autoPad:t,dilations:o,group:i,kernelShape:a,pads:s,strides:u,...n})},Y$=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4||r[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let n=r[0].dims[1],t=r[1].dims[1]*e.group;if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(r.length===3&&(r[2].dims.length!==1||r[1].dims[0]!==r[2].dims[0]))throw new Error("invalid bias");let o=r[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(r[0].type!=="float32"||r[1].type!=="float32")throw new Error("Conv input(X,W) should be float tensor");if(r.length===3&&r[2].type!=="float32")throw new Error("Conv input(bias) should be float tensor")}});var Q$,eA,tA,qm,nA,rA,oA,iA,aA,sA,Km,uA,Xm=k(()=>{"use strict";lt();Ke();Ae();Br();Q$=(r,e,n,t,o,i)=>(r-1)*e+n+(t-1)*o+1-i,eA=(r,e,n,t,o)=>{let i=Math.floor(r/2);e==="SAME_UPPER"?(n[t]=i,n[o]=r-i):e==="SAME_LOWER"&&(n[t]=r-i,n[o]=i)},tA=(r,e,n,t,o,i,a,s)=>{let u=r.length-2,l=s.length===0;for(let d=0;d<u;++d){let f=l?r[d+2]*i[d]:s[d],h=Q$(r[d+2],i[d],o[d],e[d],n[d],f);eA(h,t,o,d,d+u),l&&s.push(i[d]*(r[d+2]-1)+a[d]+(e[d]-1)*n[d]+1-o[d]-o[d+u])}},qm=(r,e,n)=>(uA(e,n),nA(r,e,n)),nA=(r,e,n)=>{let t=sA(n,e);return[aA(r,e,t)]},rA=(r,e)=>({name:"ConvTranspose",inputNames:r?["X","W","B"]:["X","W"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e}),oA=(r,e,n,t)=>{let i=e.length>2?"getB(output_channel)":"0.0",a=e[0].dims,s=e[1].dims,u=s[1],l=s[0]/t.group,d=[e[0].dims[0],e[1].dims[1]*t.group,...t.outputShape],f=ue(r.session.backend.glContext.version),{activationFunction:h,applyActivation:g}=Rn(t),b=`
  const ivec2 strides = ivec2(${t.strides[0]}, ${t.strides[1]});
  const ivec2 pads = ivec2(${t.pads[0]}, ${t.pads[1]});
  ${h}
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
    ${g}
    ${f.output} = vec4(value, .0, .0, .0);
  }
`;return{...n,output:{dims:d,type:e[0].type,textureType:0},shaderSource:b,hasMain:!0}},iA=(r,e,n)=>{let t=rA(e.length>2,n.cacheKey);return{...t,get:()=>oA(r,e,t,n)}},aA=(r,e,n)=>r.run(iA(r,e,n),e),sA=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0)for(let s=2;s<e[1].dims.length;++s)n.push(e[1].dims[s]);let t=r.pads.slice(),o=r.outputShape.slice(),i=e[0].dims;tA(i,n,r.dilations,r.autoPad,t,r.strides,r.outputPadding,o);let a=Object.assign({},r);return Object.assign(a,{kernelShape:n,pads:t,outputShape:o,cacheKey:r.cacheKey}),a},Km=r=>{let e=r.attributes,n=ao(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),a=e.getInts("kernel_shape",[]),s=e.getInts("output_padding",[0,0]),u=e.getInts("output_shape",[]),l=e.getInts("pads",[0,0,0,0]),d=e.getInts("strides",[1,1]);return xe({autoPad:t,dilations:o,group:i,kernelShape:a,outputPadding:s,outputShape:u,pads:l,strides:d,...n})},uA=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4||r[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let n=r[0].dims[1],t=r[1].dims[0];if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=r[1].dims[1]*e.group;if(r.length===3&&(r[2].dims.length!==1||r[2].dims[0]!==o))throw new Error("invalid bias");let i=r[0].dims.length-2;if(e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==r[0].dims.length-2)throw new Error("invalid output shape");if(r[0].type!=="float32"||r[1].type!=="float32")throw new Error("ConvTranspose input(X,W) should be float tensor");if(r.length===3&&r[2].type!=="float32")throw new Error("ConvTranspose input(bias) should be float tensor")}});var Zm,Fr,Jm,lA,Ym,cA,dA,pA,ji=k(()=>{"use strict";lt();Me();Ae();Zm={name:"Transpose",inputNames:["A"],inputTypes:[0]},Fr=(r,e,n)=>(pA(e),[r.run({...Zm,cacheHint:n.cacheKey,get:()=>lA(r,e[0],n.perm)},e)]),Jm=r=>xe({perm:r.attributes.getInts("perm",[])}),lA=(r,e,n)=>{let t=e.dims;n=Ym(t,n);let o=cA(t,n),i=t.length,a=`
      ${dA("perm",n,i)}
      float process(int indices[${i}]) {
        int a[${i}];
        perm(a, indices);
        return _A(a);
      }`;return{...Zm,output:{dims:o,type:e.type,textureType:0},shaderSource:a}},Ym=(r,e)=>(e&&e.length!==r.length&&(e=[...r.keys()].reverse()),e),cA=(r,e)=>(e=Ym(r,e),ne.sortBasedOnPerm(r,e)),dA=(r,e,n)=>{let t=[];t.push(`void ${r}(out int a[${n}], int src[${n}]) {`);for(let o=0;o<n;++o)t.push(`	a[${e[o]}]=src[${o}];`);return t.push("	}"),t.join(`
`)},pA=r=>{if(!r||r.length!==1)throw new Error("Transpose requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("input should be float tensor")}});var Qm,eg,fA,tg=k(()=>{"use strict";ji();Qm=(r,e,n)=>{fA(e);let t=n.blocksize,o=t*t,i=n.mode==="DCR"?[0,3,4,1,5,2]:[0,1,4,2,5,3],a=n.mode==="DCR"?[e[0].dims[0],t,t,e[0].dims[1]/o,e[0].dims[2],e[0].dims[3]]:[e[0].dims[0],e[0].dims[1]/o,t,t,e[0].dims[2],e[0].dims[3]],s=r.reshapeUnpacked(e[0],a),u={perm:i,cacheKey:`${i}`},[l]=Fr(r,[s],u),d=[e[0].dims[0],e[0].dims[1]/o,e[0].dims[2]*t,e[0].dims[3]*t];return[r.reshapeUnpacked(l,d)]},eg=r=>{let e=r.attributes.getInt("blocksize");if(e<1)throw new Error(`blocksize must be >= 1, but got : ${e} for DepthToSpace`);let n=r.attributes.getString("mode","DCR");if(n!=="DCR"&&n!=="CRD")throw new Error(`unrecognized mode: ${n} for DepthToSpace`);return{mode:n,blocksize:e}},fA=r=>{if(r.length!==1)throw new Error(`DepthToSpace expect 1 inputs, but got ${r.length}`);if(r[0].type==="string"||r[0].dims.length!==4)throw new TypeError("DepthToSpace input should be a 4-D numeric tensor")}});var ng,rg,hA,og=k(()=>{"use strict";Me();ng=(r,e,n)=>{hA(e,n);let t=ne.flattenShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},rg=r=>r.attributes.getInt("axis",1),hA=(r,e)=>{if(!r||r.length!==1)throw new Error("Flatten requires 1 input.");let n=r[0].dims.length;if(n===0)throw new Error("scalar tensor is not supported.");if(e<-n||e>n)throw new Error("Invalid axis");if(r[0].type==="string")throw new Error("string tensor is not supported.")}});var gr,Ro=k(()=>{"use strict";gr=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]});var ig,ag,mA,gA,bA,yA,sg=k(()=>{"use strict";lt();Ro();Me();Ae();ig=(r,e,n)=>(yA(e,n.axis),[r.run(bA(r,e,n),e)]),ag=r=>xe({axis:r.attributes.getInt("axis",0)}),mA={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},gA=(r,e,n,t)=>{let o=n[0].dims.slice(),i=n[1].dims.slice(),a=new Array(o.length+i.length-1);t=ne.normalizeAxis(t,o.length);let s=[];for(let h=0;h<a.length;h++)h<t?(a[h]=o[h],s.push(`inputIdx[${h}] = outputIdx[${h}];`)):h<t+i.length?(a[h]=i[h-t],s.push(`indexDataIdx[${h-t}] = outputIdx[${h}];`)):(a[h]=o[h-i.length+1],s.push(`inputIdx[${h-i.length+1}] = outputIdx[${h}];`));let u=a.length||1,l=o.length,d=i.length||1,f=`
      float process(int outputIdx[${u}]) {
        int inputIdx[${l}];
        int indexDataIdx[${d}];
        indexDataIdx[0] = 0;
        ${s.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${t}] = idx < 0 ? idx + ${o[t]} : idx;
        return _A(inputIdx);
      }`;return{...e,output:{dims:a,type:n[0].type,textureType:0},shaderSource:f}},bA=(r,e,n)=>{let t={...mA,cacheHint:n.cacheKey};return{...t,get:()=>gA(r,t,e,n.axis)}},yA=(r,e)=>{if(!r||r.length!==2)throw new Error("Gather requires 2 inputs.");let n=r[0].dims.length;if(n<1)throw new Error("Invalid input shape.");if(e<-n||e>n-1)throw new Error("Invalid axis.");if(gr.indexOf(r[0].type)===-1)throw new Error("Invaid input type.");if(r[1].type!=="int32"&&r[1].type!=="int16")throw new Error("Invaid input type.")}});var Ml,ug,lg,cg,_A,vA,wA,dg=k(()=>{"use strict";lt();Me();Ae();Ml=(r,e,n)=>(wA(e,n),[r.run(_A(e,n),e)]),ug=(r,e)=>{let n=r.attributes.getInt("transA",0)!==0,t=r.attributes.getInt("transB",0)!==0,o=r.attributes.getFloat("alpha",1),i=r.attributes.getFloat("beta",1);return xe({transA:n,transB:t,alpha:o,beta:i,isOptionalC:e})},lg=r=>ug(r,!1),cg=r=>ug(r,!0),_A=(r,e)=>{let n={name:"Gemm",inputNames:r.length===3?["A","B","C"]:["A","B"],inputTypes:r.length===3?[0,0,0]:[0,0],key:e.cacheKey};return{...n,get:()=>vA(n,r,e)}},vA=(r,e,n)=>{let t=e[0].dims.slice(),o=e[1].dims.slice(),[i,a]=Li.getShapeOfGemmResult(t,n.transA,o,n.transB,e.length===3?e[2].dims:void 0),s=[i,a];if(!s)throw new Error("Can't use gemm on the given tensors");let u=t[t.length-1],l="";n.transA&&(u=t[0]),n.transA&&n.transB?l="value += _A_T(a) * _B_T(b);":n.transA&&!n.transB?l="value += _A_T(a) * _B(b);":!n.transA&&n.transB?l="value += _A(a) * _B_T(b);":!n.transA&&!n.transB&&(l="value += _A(a) * _B(b);");let d=s.length,f=e.length===3?`int c[${e[2].dims.length}];`:"",h=e.length===3?"bcastIndices_C(indices, c);":"",g=e.length===3?"value += beta * _C(c);":"",b=`
      float process(int indices[${d}]) {
          int a[${d}];
          int b[${d}];
          ${f}

          copyVec(indices, a);
          copyVec(indices, b);
          ${h}

          float value = 0.0;
          for (int k=0; k<${u}; ++k) {
              a[${d-1}] = k;
              b[${d-2}] = k;
              ${l}
          }

          value = value * alpha;
          ${g}
          return value;
      }`;return{...r,output:{dims:s,type:e[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:n.alpha},{name:"beta",type:"float",data:n.beta}],shaderSource:b}},wA=(r,e)=>{if(!r)throw new Error("Input is missing");if(e.isOptionalC&&(r.length<2||r.length>3))throw new Error("Invaid input shape.");if(!e.isOptionalC&&r.length!==3)throw new Error("Gemm requires 3 inputs");if(r.length===3&&r[2].dims.length!==1&&r[2].dims.length!==2)throw new Error("Invalid input shape of C");if(r[0].type!=="float32"&&r[0].type!=="float64"||r[1].type!=="float32"&&r[1].type!=="float64"||r.length===3&&r[2].type!=="float32"&&r[2].type!=="float64")throw new Error("Invalid input type.");if(r[0].type!==r[1].type||r.length===3&&r[0].type!==r[2].type)throw new Error("Input types are mismatched")}});var pg,fg,xA,TA,IA,SA,$A,hg=k(()=>{"use strict";lt();Ae();pg=(r,e,n)=>($A(e),[r.run(IA(r,e,n),e)]),fg=r=>{let e=r.attributes.getFloat("scale"),n=r.attributes.getFloats("bias");return xe({scale:e,bias:n})},xA={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},TA=(r,e,n,t)=>{let o=n[0].dims.slice(),i=o.length,s=`
      ${SA(t.bias.length)}
      float process(int indices[${i}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...e,output:{dims:o,type:n[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:t.bias.length,data:t.bias},{name:"scale",type:"float",data:t.scale}],shaderSource:s}},IA=(r,e,n)=>{let t={...xA,cacheHint:n.cacheKey};return{...t,get:()=>TA(r,t,e,n)}},SA=r=>{let e=[`float getBias(float bias[${r}], int channel) {`];for(let n=0;n<r;++n)n===0?e.push(`	if (channel == ${n}) { return bias[${n}]; }`):n===r-1?e.push(`	else { return bias[${n}]; }`):e.push(`	else if (channel == ${n}) { return bias[${n}]; }`);return e.push("	}"),e.join(`
`)},$A=r=>{if(!r||r.length!==1)throw new Error("ImageScaler requires 1 input.");if(r[0].dims.length!==4)throw new Error("Invalid input shape.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")}});var gg,bg,mg,AA,OA,PA,EA,CA,DA,yg=k(()=>{"use strict";Ke();Ae();gg=(r,e,n)=>{DA(e);let t=r.run(OA(e[0]),e);return[r.run(CA(r,e[0],n,t.dims),[e[0],t,e[1],e[2]])]},bg=r=>r.attributes.getFloat("epsilon",1e-5),mg={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},AA=(r,e)=>{let n=e.dims.slice(),t=n[1],o=n[2]*n[3],i=[n[0],t],a=`
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
      }`;return{...r,output:{dims:i,type:e.type,textureType:4},shaderSource:a}},OA=r=>({...mg,get:()=>AA(mg,r)}),PA={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},EA=(r,e,n,t,o)=>{let i=ue(r.session.backend.glContext.version),[a,s]=r.calculateTextureWidthAndHeight(o,4),[u,l]=[a/4,s],d=`
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
      }`;return{...e,output:{dims:n.dims,type:n.type,textureType:0},variables:[{name:"epsilon",type:"float",data:t}],shaderSource:d}},CA=(r,e,n,t)=>{let o={...PA,cacheHint:`${n}`};return{...o,get:()=>EA(r,o,e,n,t)}},DA=r=>{if(!r||r.length!==3)throw new Error("InstanceNormalization requires 3 inputs.");let e=r[0],n=r[1],t=r[2];if(e.dims.length<3||n.dims.length!==1||t.dims.length!==1)throw new Error("Invalid input shape.");if(n.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1])throw new Error("Input shapes are mismatched.");if(e.type!=="float32"&&e.type!=="float64"||n.type!=="float32"&&n.type!=="float64"||t.type!=="float32"&&t.type!=="float64")throw new Error("Invalid input type.");if(r[0].dims.length!==4)throw new Error("Only support 4-D input shape.")}});function kA(r,e){let n=r[0].dims[1],t=r[0].dims.length,o=-Math.floor((e.size-1)/2),i=Math.ceil((e.size-1)/2),a=`float(${e.alpha}) / float(${e.size})`,s=`float(${e.bias})`,u=`float(${e.beta})`,l=`
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
        return x / pow(${s} + ${a} * square_sum, ${u});
    }`;return{...wg,cacheHint:e.cacheKey,output:{dims:r[0].dims,type:r[0].type,textureType:0},shaderSource:l}}function NA(r,e){return{...wg,cacheHint:e.cacheKey,get:()=>kA(r,e)}}var _g,vg,wg,LA,xg=k(()=>{"use strict";lt();Ae();_g=(r,e,n)=>(LA(e),[r.run(NA(e,n),e)]),vg=r=>{let e=r.attributes.getFloat("alpha",1e-4),n=r.attributes.getFloat("beta",.75),t=r.attributes.getFloat("bias",1),o=r.attributes.getInt("size");return xe({alpha:e,beta:n,bias:t,size:o})},wg={name:"LRN",inputNames:["X"],inputTypes:[0]};LA=r=>{if(!r||r.length!==1)throw new Error("LRN requires 1 input.");if(r[0].dims.length!==4)throw new Error('currently only support LRN for input with "NCHW" format');if(r[0].type!=="float32")throw new Error("input should be float type")}});var RA,Bl,Tg,Ig,Sg,zA,MA,BA,FA,VA,GA,UA,WA,$g=k(()=>{"use strict";lt();Me();Ke();Ae();RA={name:"Pad",inputNames:["A"],inputTypes:[0]},Bl=(r,e,n)=>(BA(e),[r.run({...RA,cacheHint:n.cacheKey,get:()=>MA(r,e[0],n)},e)]),Tg=r=>{let e=r.attributes.getString("mode","constant"),n=r.attributes.getFloat("value",0),t=r.attributes.getInts("pads");return xe({mode:e,value:n,pads:t})},Ig=(r,e,n)=>{FA(e);let t=zA(r,e,n);return Bl(r,[e[0]],t)},Sg=r=>r.attributes.getString("mode","constant"),zA=(r,e,n)=>{if(!r.session.isInitializer(e[1].dataId)||e.length>=3&&!r.session.isInitializer(e[2].dataId))throw new Error("dynamic pad attributes are not allowed");let t=Array.from(e[1].integerData),o=e.length>=3?e[2].floatData[0]:0;return xe({mode:n,pads:t,value:o})},MA=(r,e,n)=>{let t=ne.padShape(e.dims.slice(),n.pads),o=t.length,a=`
      ${VA(r,e,n)}
      float process(int[${o}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:t,type:e.type,textureType:0},shaderSource:a}},BA=r=>{if(!r||r.length!==1)throw new Error("Pad requires 1 input");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")},FA=r=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Pad requires 2 or 3 inputs");if(r[1].type!=="int32")throw new Error("Invalid input type.");if(r.length>=3&&r[2].type==="string")throw new Error("Invalid input type.")},VA=(r,e,n)=>{let t=ue(r.session.backend.glContext.version),[o,i]=r.calculateTextureWidthAndHeight(e.dims,0),a=ne.computeStrides(e.dims);switch(n.mode){case"constant":return GA(t,e.dims,a,o,i,n.pads,n.value);case"reflect":return UA(t,e.dims,a,o,i,n.pads);case"edge":return WA(t,e.dims,a,o,i,n.pads);default:throw new Error("Invalid mode")}},GA=(r,e,n,t,o,i,a)=>{let s=e.length,u="";for(let l=s-1;l>=0;--l)u+=`
        k = m[${l}] - ${i[l]};
        if (k < 0)  return constant;
        if (k >= ${e[l]}) return constant;
        offset += k * ${n[l]};
        `;return`
      float padA(int m[${s}]) {
        const float constant = float(${a});
        int offset = 0;
        int k = 0;
        ${u}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${r.texture2D}(A, coords));
        return value;
      }
      `},UA=(r,e,n,t,o,i)=>{let a=e.length,s="";for(let u=a-1;u>=0;--u)s+=`
        k = m[${u}] - ${i[u]};
        if (k < 0) { k = -k; }
        {
          const int _2n_1 = ${2*(e[u]-1)};
          k = int( mod( float(k), float(_2n_1) ) ) ;
          if(k >= ${e[u]}) { k = _2n_1 - k; }
        }
        offset += k * ${n[u]};
        `;return`
      float padA(int m[${a}]) {
        int offset = 0;
        int k = 0;
        ${s}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${r.texture2D}(A, coords));
        return value;
      }
      `},WA=(r,e,n,t,o,i)=>{let a=e.length,s="";for(let u=a-1;u>=0;--u)s+=`
        k = m[${u}] - ${i[u]};
        if (k < 0)  k = 0;
        if (k >= ${e[u]}) k = ${e[u]-1};
        offset += k * ${n[u]};
      `;return`
      float padA(int m[${a}]) {
        int offset = 0;
        int k = 0;
        ${s}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${r.texture2D}(A, coords));
        return value;
      }
      `}});var Og,Pg,Eg,Cg,Dg,kg,Ng,Lg,Rg,HA,Ag,zg,Ki,Mg,qi,jA,Bg=k(()=>{"use strict";lt();Me();Ae();Og=(r,e,n)=>{Ki(e);let t={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[r.run({...t,get:()=>Eg(e,t,!1,n)},e)]},Pg=r=>{let e=r.attributes.getString("auto_pad","NOTSET"),n=r.attributes.getInt("ceil_mode",0),t=r.attributes.getInt("count_include_pad",0)!==0,o=r.attributes.getInts("kernel_shape"),i=r.attributes.getInts("strides",[]),a=r.attributes.getInts("pads",[]);if(n!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");return xe({autoPad:e,ceilMode:n,countIncludePad:t,kernelShape:o,strides:i,pads:a})},Eg=(r,e,n,t)=>{let[o,i]=Rg(r,t,n),a=ne.size(o.kernelShape),s="value += _X(x);",u="";o.countIncludePad?u+=`value /= float(${a});`:u+=`value /= float(${a} - pad);`;let d=`
        ${Mg(r[0].dims,o,s,u,"0.0")}
      `;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:d}},Cg=(r,e,n)=>{Ki(e);let t={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${n.countIncludePad}`};return[r.run({...t,get:()=>Eg(e,t,!0,n)},e)]},Dg=r=>{let e=r.attributes.getInt("count_include_pad",0)!==0;return xe({autoPad:"",ceilMode:0,countIncludePad:e,kernelShape:[],strides:[],pads:[]})},kg=(r,e,n)=>{Ki(e);let t={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[r.run({...t,get:()=>Lg(e,t,!1,n)},e)]},Ng=r=>{let e=r.attributes.getString("auto_pad","NOTSET"),n=r.attributes.getInt("ceil_mode",0),t=r.attributes.getInts("kernel_shape"),o=r.attributes.getInts("strides",[]),i=r.attributes.getInts("pads",[]),a=r.attributes.getInt("storage_order",0),s=r.attributes.getInts("dilations",[]);if(a!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");return xe({autoPad:e,ceilMode:n,countIncludePad:!1,kernelShape:t,strides:o,pads:i,storageOrder:a,dilations:s})},Lg=(r,e,n,t)=>{let[o,i]=Rg(r,t,n),l=`
      ${Mg(r[0].dims,o,`
      value = max(_X(x), value);
    `,"","-1e5")}
    `;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:l}},Rg=(r,e,n)=>{let t=r[0].dims.slice(),o=Object.hasOwnProperty.call(e,"dilations"),i=e.kernelShape.slice(),a=e.strides.slice(),s=o?e.dilations.slice():[],u=e.pads.slice();Nr.adjustPoolAttributes(n,t,i,a,s,u);let l=Nr.computePoolOutputShape(n,t,a,s,i,u,e.autoPad),d=Object.assign({},e);return o?Object.assign(d,{kernelShape:i,strides:a,pads:u,dilations:s,cacheKey:e.cacheKey}):Object.assign(d,{kernelShape:i,strides:a,pads:u,cacheKey:e.cacheKey}),[d,l]},HA={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},Ag={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},zg=(r,e)=>(Ki(e),[r.run({...Ag,get:()=>Lg(e,Ag,!0,HA)},e)]),Ki=r=>{if(!r||r.length!==1)throw new Error("Pool ops requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")},Mg=(r,e,n,t,o)=>{let i=r.length;if(e.kernelShape.length<=2){let a=e.kernelShape[e.kernelShape.length-1],s=e.strides[e.strides.length-1],u=e.pads[e.pads.length/2-1],l=e.pads[e.pads.length-1],d=r[i-1],f="",h="",g="";if(u+l!==0?f=`
          for (int i = 0; i < ${a}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${s} - ${u} + i;
            if (x[${i} - 1] < 0 || x[${i} - 1] >= ${d}) {
              pad++;
              continue;
            }
            ${n}
          }`:f=`
          for (int i = 0; i < ${a}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${s} - ${u} + i;
            ${n}
          }`,e.kernelShape.length===2){let _=e.kernelShape[e.kernelShape.length-2],T=e.strides[e.strides.length-2],v=e.pads[e.pads.length/2-2],x=e.pads[e.pads.length-2],I=r[i-2];v+x!==0?h=`
            for (int j = 0; j < ${_}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${T} - ${v} + j;
              if (x[${i} - 2] < 0 || x[${i} - 2] >= ${I}) {
                pad+= ${a};
                continue;
              }
          `:h=`
            for (int j = 0; j < ${_}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${T} - ${v} + j;
            `,g=`
          }
        `}return`
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);

          float value = ${o};
          int pad = 0;
          ${h}
          ${f}
          ${g}
          ${t}
          return value;
        }
      `}else{let a=ne.size(e.kernelShape),s=ne.computeStrides(e.kernelShape),u=s.length,l=e.pads.length,d=jA(u),f=qi(r,"inputDims"),h=qi(e.pads,"pads"),g=qi(s,"kernelStrides"),b=qi(e.strides,"strides"),_=e.pads.reduce((x,I)=>x+I),T="";return _?T=`
            if (x[j] >= inputDims[j] || x[j] < 0) {
              pad++;
              isPad = true;
              break;
            }
          }
          if (!isPad) {
            ${n}
          }`:T=`
          }
          ${n}
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
          ${h}
          ${f}
          ${b}
          ${g}

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
      `}},qi=(r,e)=>{let n="";for(let t=0;t<r.length;t++)n+=`
      ${e}[${t}] = ${r[t]};
    `;return n},jA=r=>`
  void offsetToIndices(int offset, int[${r}] strides, out int[${r}] indices) {
    if (${r} == 0) {
      return;
    }
    for (int i = 0; i < ${r} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${r} - 1] = offset;
  }`});var Vr,br,qA,KA,Fg,Vg,Gg,Ug,Wg,Hg,jg,qg=k(()=>{"use strict";lt();Ro();Me();Ae();Vr=(r,e,n,t,o)=>{KA(e);let i={name:t,inputNames:["A"],inputTypes:[0]};return[r.run({...i,cacheHint:n.cacheKey,get:()=>qA(r,e,n,t,o,i)},e)]},br=r=>{let e=r.attributes.getInts("axes",[]),n=r.attributes.getInt("keepdims",1)===1;return xe({axes:e,keepDims:n})},qA=(r,e,n,t,o,i)=>{let a=[],s=e[0].dims.length||1,u=[],l=ne.normalizeAxes(n.axes,e[0].dims.length),d=o(e,l),f=d[1];for(let b=0;b<e[0].dims.length;b++)l.indexOf(b)>=0||l.length===0?(n.keepDims&&a.push(1),f=`
          for(int j${b} = 0; j${b} < ${e[0].dims[b]}; j${b}++) {
            inputIdx[${b}] = j${b};
            ${f}
          }`):(u.push(`inputIdx[${b}] = outputIdx[${a.length}];`),a.push(e[0].dims[b]));let g=`
      float process(int outputIdx[${a.length||1}]) {
        float value;                 // final result
        int inputIdx[${s}];      // addressing input data
        ${u.join(`
`)}
        ${d[0]}       // init ops for reduce max/min
        ${f}
        ${d[2]}       // final computation for reduce mean
        return value;
      }`;return{...i,output:{dims:a,type:e[0].type,textureType:0},shaderSource:g}},KA=r=>{if(!r||r.length!==1)throw new Error("Reduce op requires 1 input.");if(gr.indexOf(r[0].type)===-1)throw new Error("Invalid input type.")},Fg=(r,e,n)=>Vr(r,e,n,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),Vg=(r,e,n)=>Vr(r,e,n,"ReduceMean",(o,i)=>{let a=1;for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=o[0].dims[s]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${a}.;`]}),Gg=(r,e,n)=>Vr(r,e,n,"ReduceMax",(o,i)=>{let a=[];for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`inputIdx[${s}] = 0;`);return[`${a.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),Ug=(r,e,n)=>Vr(r,e,n,"ReduceMin",(o,i)=>{let a=[];for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`inputIdx[${s}] = 0;`);return[`${a.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),Wg=(r,e,n)=>Vr(r,e,n,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),Hg=(r,e,n)=>Vr(r,e,n,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),jg=(r,e,n)=>Vr(r,e,n,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])});var Kg,Xg=k(()=>{"use strict";Me();Kg=(r,e)=>{let n=ne.calculateReshapedDims(e[0].dims,e[1].integerData);return r.session.pack?[r.reshapePacked(e[0],n)]:[r.reshapeUnpacked(e[0],n)]}});var Zg,Fl,Jg,Yg,zo,XA,Vl,Xi,Gl=k(()=>{"use strict";lt();Ke();Ae();Zg={name:"Upsample",inputNames:["X"],inputTypes:[0]},Fl=(r,e,n)=>(Vl(e,n),[r.run({...Zg,cacheHint:n.cacheKey,get:()=>XA(r,e,n)},e)]),Jg=r=>zo(r,7),Yg=r=>zo(r,9),zo=(r,e)=>{let n=e>=10,t=r.attributes.getString("mode","nearest");if(t!=="nearest"&&t!=="linear"&&(e<11||t!=="cubic"))throw new Error(`unrecognized mode: ${t}`);let o=[];e<9&&(o=r.attributes.getFloats("scales"),Xi(o,t,n));let i=r.attributes.getFloat("extrapolation_value",0),a=e>10?r.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(a)===-1)throw new Error(`coordinate_transform_mode '${a}' is not supported`);let s=a==="tf_crop_and_resize",u=s,l=t==="nearest"&&e>=11?r.attributes.getString("nearest_mode","round_prefer_floor"):"";if(["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(l)===-1)throw new Error(`nearest_mode '${l}' is not supported`);let d=r.attributes.getFloat("cubic_coeff_a",-.75),f=r.attributes.getInt("exclude_outside",0)!==0;if(f&&t!=="cubic")throw new Error("exclude_outside can be set to 1 only when mode is CUBIC.");let h=e<11?!0:t==="nearest"&&a==="asymmetric"&&l==="floor",g=0,b=0,_=0;return e>10?r.inputs.length>2?(g=1,b=2,_=3):(b=1,_=2):e===9&&(b=1),xe({opset:e,isResize:n,mode:t,scales:o,extrapolationValue:i,coordinateTransformMode:a,useExtrapolation:u,needRoiInput:s,nearestMode:l,cubicCoefficientA:d,excludeOutside:f,useNearest2xOptimization:h,roiInputIdx:g,scalesInputIdx:b,sizesInputIdx:_})},XA=(r,e,n)=>{let t=ue(r.session.backend.glContext.version),[o,i]=r.calculateTextureWidthAndHeight(e[0].dims,0),a=e[0].dims.map((_,T)=>Math.floor(_*n.scales[T])),[s,u]=r.calculateTextureWidthAndHeight(a,0),l=a.length,d=new Array(l),f=new Array(l),h=`
      int output_pitches[${l}];
      int input_pitches[${l}];
      `;for(let _=l-1;_>=0;_--)d[_]=_===l-1?1:d[_+1]*a[_+1],f[_]=_===l-1?1:f[_+1]*e[0].dims[_+1],h+=`
        output_pitches[${_}] = ${d[_]};
        input_pitches[${_}] = ${f[_]};
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
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${h}

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
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${h}

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
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${h}

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
    }`;return{...Zg,output:{dims:a,type:e[0].type,textureType:0},shaderSource:b,variables:[{name:"scales",type:"int",arrayLength:n.scales.length,data:n.scales.map(_=>Math.ceil(_))}]}},Vl=(r,e)=>{if(!r||e.opset<9&&r.length!==1||e.opset>=9&&e.opset<11&&r.length!==2||e.opset>=11&&r.length<2)throw new Error("invalid inputs.");if(e.scales.length>0&&r[0].dims.length!==e.scales.length)throw new Error("Invalid input shape.");if(r[0].type==="string")throw new Error("Invalid input tensor types.")},Xi=(r,e,n)=>{if(n){for(let t of r)if(t<=0)throw new Error("Scale value should be greater than 0.")}else for(let t of r)if(t<1)throw new Error("Scale value should be greater than or equal to 1.");if((e==="linear"||e==="cubic")&&r.length!==2&&(r.length!==4||r[0]!==1||r[1]!==1))throw new Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${n?"Resize":"Upsample"} opeartor.`)}});var Ul,Wl,Qg,eb,ZA,JA,YA,QA,tb=k(()=>{"use strict";Ke();Ae();Nn();Mr();Gl();Ul={name:"Resize",inputNames:["A"],inputTypes:[2]},Wl=(r,e,n)=>(Vl(e,n),[r.run({...Ul,cacheHint:n.cacheKey,get:()=>ZA(r,e,n)},e)]),Qg=r=>zo(r,10),eb=r=>zo(r,11),ZA=(r,e,n)=>{let t=ue(r.session.backend.glContext.version),[o,i]=JA(e,n);if(o.every(I=>I===1)&&n.coordinateTransformMode!=="tf_crop_and_resize")return{...Ul,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${t.texture2D}(X, TexCoords);
                    ${t.output} = v;
                }`};let s=i.length;if(s<2)throw new Error(`output dimension should be at least 2, but got ${s}`);let u=i[s-2],l=i[s-1],d=e[0].dims;if(s!==d.length)throw new Error(`output dimension should match input ${d.length}, but got ${s}`);let f=d[s-2],h=d[s-1],g=o[s-2],b=o[s-1],_="";if(n.mode!=="linear")throw new Error(`resize (packed) does not support mode: '${n.mode}'`);switch(n.coordinateTransformMode){case"asymmetric":_=`
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
                        vec4 original = vec4(${h}.0 - 1.0, ${f}.0 - 1.0, ${h}.0 - 1.0,
                            ${f}.0 - 1.0);
                        vec4 new_scale = original / resized;
                        return vec4(coords) * new_scale;
                    }
                `;break;default:throw new Error(`resize (packed) does not support coordinateTransformMode:                                 '${n.coordinateTransformMode}'`)}let T=bt(s),v=Ln(),x=`
            const vec2 inputWH = vec2(${f}.0, ${h}.0);
            const vec4 scaleWHWH = vec4(float(${g}), float(${b}), float(${g}), float(${b}));
            ${v}
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
        `;return{...Ul,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:x}},JA=(r,e)=>{let t=r[0].dims,o=e.scales,i;if(o.length===0){let s=r[e.scalesInputIdx];if(s&&s.size!==0){if(r[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");o=YA(s,e.mode,e.isResize)}else{let u=r[e.sizesInputIdx];if(!u||u.size===0)throw new Error("Either scales or sizes MUST be provided as input.");i=Array.from(u.integerData),o=QA(i,t,e.mode,e.isResize)}}else if(r[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");let a=i||t.map((s,u)=>Math.floor(s*o[u]));return[o,a]},YA=(r,e,n)=>{let t=Array.from(r.floatData);return Xi(t,e,n),t},QA=(r,e,n,t)=>{let o=e.length,i=new Array(o);for(let a=0,s=o;a<s;a++)if(e[a]===0){if(r[a]!==0)throw new Error("Input dim is zero but required output dim is non-zero.");i[a]=1}else i[a]=r[a]/e[a];return Xi(i,n,t),i}});var nb,eO,rb=k(()=>{"use strict";zr();nb=(r,e)=>(eO(e),[new nt([e[0].dims.length],"int32",void 0,void 0,new Int32Array(e[0].dims))]),eO=r=>{if(!r||r.length!==1)throw new Error("Shape requires 1 input.")}});var Hl,ob,ib,ab,tO,sb,nO,rO,ub=k(()=>{"use strict";lt();Ro();Me();Ae();Hl={name:"Slice",inputNames:["A"],inputTypes:[0]},ob=(r,e,n)=>(tO(e),[r.run({...Hl,cacheHint:n.cacheKey,get:()=>ab(r,e[0],n)},e)]),ib=r=>{let e=r.attributes.getInts("starts"),n=r.attributes.getInts("ends"),t=r.attributes.getInts("axes",[]);return xe({starts:e,ends:n,axes:t})},ab=(r,e,n)=>{let t=n.axes.length===0?e.dims.slice(0).map((f,h)=>h):n.axes,o=ne.normalizeAxes(t,e.dims.length),i=n.starts.map((f,h)=>f>e.dims[o[h]]-1?e.dims[o[h]]:ne.normalizeAxis(f,e.dims[o[h]])),a=n.ends.map((f,h)=>f>e.dims[o[h]]-1?e.dims[o[h]]:ne.normalizeAxis(f,e.dims[o[h]])),s=e.dims.slice(),u=[];for(let f=0;f<o.length;f++)s[o[f]]=a[f]-i[f],i[f]>0&&u.push(`outputIdx[${o[f]}] += ${i[f]};`);let d=`
      float process(int outputIdx[${s.length}]) {
        ${u.join(`
      `)}
        return _A(outputIdx);
      }`;return{...Hl,output:{dims:s,type:e.type,textureType:0},shaderSource:d}},tO=r=>{if(!r||r.length!==1)throw new Error("Slice requires 1 input.");if(gr.indexOf(r[0].type)===-1)throw new Error("Invalid input type.")},sb=(r,e)=>{rO(e);let n=nO(r,e);return[r.run({...Hl,cacheHint:n.cacheKey,get:()=>ab(r,e[0],n)},[e[0]])]},nO=(r,e)=>{if(!r.session.isInitializer(e[1].dataId)||!r.session.isInitializer(e[2].dataId)||e.length>=4&&!r.session.isInitializer(e[3].dataId)||e.length>=5&&!r.session.isInitializer(e[4].dataId))throw new Error("dynamic slice attributes are not allowed");if(e.length>=5&&e[4].integerData.some(a=>a!==1))throw new Error("currently non-1 steps is not supported for Slice");let n=Array.from(e[1].integerData),t=Array.from(e[2].integerData),o=e.length>=4?Array.from(e[3].integerData):[],i=`${o};${n};${t}`;return{starts:n,ends:t,axes:o,cacheKey:i}},rO=r=>{if(!r||r.length<3||r.length>5)throw new Error("Invalid input number.");if(r[1].type!=="int32"||r[1].dims.length!==1)throw new Error("Invalid input type.");if(r[2].type!=="int32"||r[2].dims.length!==1)throw new Error("Invalid input type.");if(r.length>=4&&(r[3].type!=="int32"||r[3].dims.length!==1))throw new Error("Invalid input type.");if(r.length>=5&&(r[4].type!=="int32"||r[4].dims.length!==1))throw new Error("Invalid input type.")}});var lb,cb,db,pb,fb,hb,mb,gb,oO,iO,aO,bb,yb=k(()=>{"use strict";lt();Me();Ke();Ae();ji();lb={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},cb={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},db={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},pb=(r,e,n)=>{bb(e);let t=e[0].dims.slice(),o=ne.normalizeAxis(n.axis,t.length),i=ne.sizeToDimension(t,o),a=ne.sizeFromDimension(t,o);return gb(r,e,n,i,a)},fb=r=>xe({axis:r.attributes.getInt("axis",1)}),hb=r=>xe({axis:r.attributes.getInt("axis",-1)}),mb=(r,e,n)=>{bb(e);let t=e[0].dims.slice(),o=ne.normalizeAxis(n.axis,t.length),i=t.length,a=o!==i-1,s=[],u=[],l=[],d;a&&(u=Array.from({length:i}).map((b,_)=>_),u[o]=i-1,u[i-1]=o,u.map(b=>s.push(t[b])),d=xe({perm:u}),l=Fr(r,e,d));let f=a?ne.sizeToDimension(s,i-1):ne.sizeToDimension(t,i-1),h=a?ne.sizeFromDimension(s,i-1):ne.sizeFromDimension(t,i-1),g=gb(r,a?l:e,n,f,h);return a?Fr(r,g,d):g},gb=(r,e,n,t,o)=>{let i=oO(r,e[0],t,o,[t]),a=r.run({...lb,cacheHint:n.cacheKey,get:()=>i},e),s=iO(r,e[0],t,o,i.output.dims,[t]),u=r.run({...cb,cacheHint:n.cacheKey,get:()=>s},[e[0],a]),l=aO(r,e[0],t,o,i.output.dims,s.output.dims);return[r.run({...db,cacheHint:n.cacheKey,get:()=>l},[e[0],a,u])]},oO=(r,e,n,t,o)=>{let[i,a]=r.calculateTextureWidthAndHeight(e.dims,0),s=o.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1)throw new Error("Dimensionality of the output should be 1");if(o[0]!==n)throw new Error("Shape of the output should be equal to logical row count");let u=ue(r.session.backend.glContext.version),l=`
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
      }`;return{...lb,output:{dims:o,type:e.type,textureType:0},shaderSource:l}},iO=(r,e,n,t,o,i)=>{let[a,s]=r.calculateTextureWidthAndHeight(e.dims,0),u=i.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(i.length!==1)throw new Error("Dimensionality of the output should be 1");if(i[0]!==n)throw new Error("Shape of the output should be equal to logical row count");if(o.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==n)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=ue(r.session.backend.glContext.version),d=`
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
      }`;return{...cb,output:{dims:i,type:e.type,textureType:0},shaderSource:d}},aO=(r,e,n,t,o,i)=>{let[a,s]=r.calculateTextureWidthAndHeight(e.dims,0),u=e.dims.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1||i.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==n||i[0]!==n)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=`
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
    }`;return{...db,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:l}},bb=r=>{if(!r||r.length!==1)throw new Error("Softmax requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type")}});var _b,vb,wb,sO,uO,lO,xb=k(()=>{"use strict";lt();Me();Ae();_b={name:"Split",inputNames:["A"],inputTypes:[0]},vb=(r,e,n)=>{lO(e);let t=ne.normalizeAxis(n.axis,e[0].dims.length),o=sO(r,e,t,n),i=[];for(let a=0;a<o;++a)i.push(r.run({..._b,cacheHint:`${n.cacheKey};${a}`,get:()=>uO(r,e[0],n,t,a)},e));return i},wb=r=>{let e=r.attributes.getInt("axis",0),n=r.attributes.getInts("split",[]),t=r.outputs.length;return xe({axis:e,split:n,numOutputs:t})},sO=(r,e,n,t)=>{let[,o]=Eo.splitShape(e[0].dims,n,t.split,t.numOutputs);return o.length},uO=(r,e,n,t,o)=>{let[i,a]=Eo.splitShape(e.dims,t,n.split,n.numOutputs),s=a[o],u=i[o],d=`
      float process(int indices[${u.length}]) {
        indices[${t}] += ${s};
        return _A(indices);
      }
    `;return{..._b,cacheHint:`${n.cacheKey}:${o}`,output:{dims:u,type:e.type,textureType:0},shaderSource:d}},lO=r=>{if(!r||r.length!==1)throw new Error("Split requires one input.");if(r[0].type!=="int8"&&r[0].type!=="uint8"&&r[0].type!=="int16"&&r[0].type!=="uint16"&&r[0].type!=="int32"&&r[0].type!=="uint32"&&r[0].type!=="float32"&&r[0].type!=="float64"&&r[0].type!=="bool")throw new Error("Invalid input type.")}});var jl,Tb,Ib,cO,dO,Sb=k(()=>{"use strict";Me();jl=(r,e,n)=>{cO(e);let t=ne.squeezeShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},Tb=(r,e)=>(dO(e),jl(r,[e[0]],Array.from(e[1].integerData))),Ib=r=>r.attributes.getInts("axes"),cO=r=>{if(!r||r.length!==1)throw new Error("Squeeze requires 1 input.");if(r[0].type==="string")throw new Error("invalid input tensor types.")},dO=r=>{if(!r||r.length!==2)throw new Error("Squeeze requires 2 inputs.");if(r[1].type!=="int32")throw new Error("Invalid input type.")}});var $b,pO,fO,Ab=k(()=>{"use strict";Ke();Ae();$b=(r,e)=>{fO(e);let n={name:"Sum",inputNames:e.map((o,i)=>`X${i}`),inputTypes:new Array(e.length).fill(0)};return[r.run({...n,get:()=>pO(r,e,n)},e)]},pO=(r,e,n)=>{let t=ue(r.session.backend.glContext.version),o=e[0].dims.slice(),a=`
      void main() {
        vec4 result = ${e.map((s,u)=>`${t.texture2D}(X${u},TexCoords)`).join(" + ")};
        ${t.output} = result;
      }
    `;return{...n,output:{dims:o,type:e[0].type,textureType:0},hasMain:!0,shaderSource:a}},fO=r=>{if(!r||r.length===0)throw new Error("Sum requires inputs.");let e=r[0].dims.length;for(let n=1;n<r.length;n++){if(e!==r[n].dims.length)throw new Error("Input shapes are mismatched.");for(let t=0;t<e;t++)if(r[0].dims[t]!==r[n].dims[t])throw new Error("Input shapes are not matched.")}if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.");for(let n=1;n<r.length;n++)if(r[0].type!==r[n].type)throw new Error("Input types are not matched.")}});var Ob,hO,mO,Pb=k(()=>{"use strict";Ro();Ae();Ob=(r,e)=>{mO(e);let n={name:"Tile",inputNames:["A"],inputTypes:[0]};return[r.run({...n,get:()=>hO(r,e,n)},e)]},hO=(r,e,n)=>{let t=e[0].dims.slice(),o=new Array(t.length),i=[];for(let u=0;u<t.length;u++)o[u]=t[u]*e[1].numberData[u],i.push(`inputIdx[${u}] = int(mod(float(outputIdx[${u}]), ${t[u]}.));`);let a=o.length,s=`
      float process(int outputIdx[${a}]) {
        int inputIdx[${a}];
        ${i.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...n,output:{dims:o,type:e[0].type,textureType:0},shaderSource:s}},mO=r=>{if(!r||r.length!==2)throw new Error("Tile requires 2 input.");if(r[1].dims.length!==1)throw new Error("The second input shape must 1 dimension.");if(r[1].dims[0]!==r[0].dims.length)throw new Error("Invalid input shape.");if(gr.indexOf(r[0].type)===-1)throw new Error("Invalid input type.");if(r[1].type!=="int32"&&r[1].type!=="int16")throw new Error("Invalid repeat type.")}});var ql,Eb,Cb,gO,bO,Db=k(()=>{"use strict";Me();ql=(r,e,n)=>{gO(e);let t=ne.unsqueezeShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},Eb=(r,e)=>(bO(e),ql(r,[e[0]],Array.from(e[1].integerData))),Cb=r=>r.attributes.getInts("axes"),gO=r=>{if(!r||r.length!==1)throw new Error("Unsqueeze requires 1 input.");if(r[0].type==="string")throw new Error("invalid input tensor types.")},bO=r=>{if(!r||r.length!==2)throw new Error("Unsqueeze requires 2 inputs.");if(r[1].type!=="int32")throw new Error("Invalid input type.")}});var kb,Nb=k(()=>{"use strict";Wh();rm();am();pm();Ui();Xm();tg();og();sg();dg();hg();yg();xg();Wi();$g();Bg();qg();Xg();tb();rb();ub();yb();xb();Sb();Ab();Pb();ji();El();Db();Gl();kb=[["Abs","","6+",fm],["Acos","","7+",hm],["Add","","7+",Hh],["And","","7+",jh],["Asin","","7+",mm],["Atan","","7+",gm],["AveragePool","","7+",Og,Pg],["BatchNormalization","","7+",Gh,Uh],["Cast","","6+",om,im],["Ceil","","6+",_m],["Clip","","6-10",Ol,bm],["Clip","","11+",ym],["Concat","","4+",lm,dm],["Conv","","1+",Rl,zl],["ConvTranspose","","1+",qm,Km],["Cos","","7+",vm],["Div","","7+",qh],["Dropout","","7+",Pl],["DepthToSpace","","1+",Qm,eg],["Equal","","7+",Kh],["Elu","","6+",wm,xm],["Exp","","6+",Tm],["Flatten","","1+",ng,rg],["Floor","","6+",Im],["FusedConv","com.microsoft","1+",Rl,zl],["Gather","","1+",ig,ag],["Gemm","","7-10",Ml,lg],["Gemm","","11+",Ml,cg],["GlobalAveragePool","","1+",Cg,Dg],["GlobalMaxPool","","1+",zg],["Greater","","7+",Xh],["Identity","","1+",Pl],["ImageScaler","","1+",pg,fg],["InstanceNormalization","","6+",gg,bg],["LeakyRelu","","6+",Sm,$m],["Less","","7+",Zh],["LRN","","1+",_g,vg],["Log","","6+",Am],["MatMul","","1+",Fm,Vm],["MaxPool","","1+",kg,Ng],["Mul","","7+",Jh],["Neg","","6+",Om],["Not","","1+",Pm],["Or","","7+",Yh],["Pad","","2-10",Bl,Tg],["Pad","","11+",Ig,Sg],["Pow","","7+",Qh],["PRelu","","7+",em],["ReduceLogSum","","1+",Hg,br],["ReduceMax","","1+",Gg,br],["ReduceMean","","1+",Vg,br],["ReduceMin","","1+",Ug,br],["ReduceProd","","1+",Wg,br],["ReduceSum","","1-12",Fg,br],["ReduceSumSquare","","1+",jg,br],["Relu","","6+",Em],["Reshape","","5+",Kg],["Resize","","10",Wl,Qg],["Resize","","11+",Wl,eb],["Shape","","1+",nb],["Sigmoid","","6+",Cm],["Sin","","7+",Dm],["Slice","","10+",sb],["Slice","","1-9",ob,ib],["Softmax","","1-12",pb,fb],["Softmax","","13+",mb,hb],["Split","","2-12",vb,wb],["Sqrt","","6+",km],["Squeeze","","1-12",jl,Ib],["Squeeze","","13+",Tb],["Sub","","7+",tm],["Sum","","6+",$b],["Tan","","7+",Nm],["Tanh","","6+",Lm],["Tile","","6+",Ob],["Transpose","","1+",Fr,Jm],["Upsample","","7-8",Fl,Jg],["Upsample","","9",Fl,Yg],["Unsqueeze","","1-12",ql,Cb],["Unsqueeze","","13+",Eb],["Xor","","7+",nm]]});function Rb(r){let e={},n;for(;(n=Lb.exec(r))!==null;){let t=n[3].split(",").map(o=>{let i=o.trim().split(" ");return i&&i.length===2?{type:i[0],name:i[1]}:null}).filter(o=>o!==null);e[n[2]]={params:t,body:n[4]}}for(let t in e){let o=yO.replace("__FUNC__",t),i=new RegExp(o,"gm");for(;(n=i.exec(r))!==null;){let a=n[1],s=n[2],u=n[3].split(","),l=a?`${a} ${s};`:"",d=e[t].body,f="";e[t].params.forEach((g,b)=>{g&&(f+=`${g.type} ${g.name} = ${u[b]};
`)}),d=`${f}
 ${d}`,d=d.replace("return",`${s} = `);let h=`
      ${l}
      {
        ${d}
      }
      `;r=r.replace(n[0],h)}}return r=r.replace(Lb,""),r}var Lb,yO,zb=k(()=>{"use strict";Lb=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,yO="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function uo(r,e){let n=[],t=[],o=e!=null&&Array.isArray(e)&&e.length===0,i=e==null||o?null:_O(e,r).sort(),a=0;for(let s=0;s<r.length;++s){if(i!=null){if(i[a]===s&&r[s]!==1)throw new Error(`Can't squeeze axis ${s} since its dim '${r[s]}' is not 1`);(i[a]==null||i[a]>s)&&r[s]===1&&(n.push(r[s]),t.push(s)),i[a]<=s&&a++}r[s]!==1&&(n.push(r[s]),t.push(s))}return{newShape:n,keptDims:t}}function _O(r,e){let n=e.length;return r=r==null?e.map((t,o)=>o):[].concat(r),no(r.every(t=>t>=-n&&t<n),()=>`All values in axis param must be in range [-${n}, ${n}) but got axis ${r}`),no(r.every(vO),()=>`All values in axis param must be integers but got axis ${r}`),r.map(t=>t<0?n+t:t)}function vO(r){return r%1===0}function wO(r){if(r.length===0)return 1;let e=r[0];for(let n=1;n<r.length;n++)e*=r[n];return e}function Mb(r){let e=Math.ceil(Math.sqrt(r));return[e,Math.ceil(r/e)]}var Zi,Kl=k(()=>{"use strict";Ct();Me();Zi=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,n){let t=this.computeTexture(e,n);return n&&n.isPacked&&(t[0]/=2,t[1]/=2),n&&n.reverseWH?[t[1],t[0]]:t}computeTexture(e,n){let t=n&&n.isPacked;if(e.length===0)return t?[2,2]:[1,1];let o=this.maxTextureSize;if(n&&n.breakAxis!==void 0){let s=n.breakAxis>=e.length?1:e.slice(n.breakAxis).reduce((l,d)=>l*d),u=n.breakAxis<=0?1:e.slice(0,n.breakAxis).reduce((l,d)=>l*d);if(s>o||u>o)Fe.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${n.breakAxis}`);else return[s,u]}let i=e.slice(0);t&&(o=o*2,i=i.map((s,u)=>u>=i.length-2?i[u]%2===0?i[u]:i[u]+1:i[u]),i.length===1&&(i=[2,i[0]])),i.length!==2&&(i=uo(i).newShape);let a=wO(i);return i.length<=1&&a<=o?[1,a]:i.length===2&&i[0]<=o&&i[1]<=o?i:i.length===3&&i[0]*i[1]<=o&&i[2]<=o?[i[0]*i[1],i[2]]:i.length===3&&i[0]<=o&&i[1]*i[2]<=o?[i[0],i[1]*i[2]]:i.length===4&&i[0]*i[1]*i[2]<=o&&i[3]<=o?[i[0]*i[1]*i[2],i[3]]:i.length===4&&i[0]<=o&&i[1]*i[2]*i[3]<=o?[i[0],i[1]*i[2]*i[3]]:t?Mb(a/4).map(s=>s*2):Mb(a)}}});var Ji,Bb=k(()=>{"use strict";Me();Jn();Ke();Kl();Nn();Ji=class extends zt{constructor(e){super(e)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let e="offsetToCoords";return{offsetToCoords:new Y(`
      vec2 ${e}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){let e="coordsToOffset";return{coordsToOffset:new Y(`
      int ${e}(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let e=this.context.outputTextureLayout;return e.isPacked?this.getPackedOutputSamplingSnippet(e):this.getUnpackedOutputSamplingSnippet(e)}getPackedOutputSamplingSnippet(e){let n=e.unpackedShape,t=[e.width,e.height],o={},i="getOutputCoords";switch(n.length){case 0:o[i]=this.getOutputScalarCoords();break;case 1:o[i]=this.getOutputPacked1DCoords(n,t);break;case 2:o[i]=this.getOutputPacked2DCoords(n,t);break;case 3:o[i]=this.getOutputPacked3DCoords(n,t);break;default:o[i]=this.getOutputPackedNDCoords(n,t)}let s=`
      void setOutput(vec4 val) {
        ${ue(this.context.glContext.version).output} = val;
      }
    `,u="floatTextureSetRGBA";return o[u]=new Y(s),o}getUnpackedOutputSamplingSnippet(e){let n=e.unpackedShape,t=[e.width,e.height],o={},i="getOutputCoords";switch(n.length){case 0:o[i]=this.getOutputScalarCoords();break;case 1:o[i]=this.getOutputUnpacked1DCoords(n,t);break;case 2:o[i]=this.getOutputUnpacked2DCoords(n,t);break;case 3:o[i]=this.getOutputUnpacked3DCoords(n,t);break;case 4:o[i]=this.getOutputUnpacked4DCoords(n,t);break;case 5:o[i]=this.getOutputUnpacked5DCoords(n,t);break;case 6:o[i]=this.getOutputUnpacked6DCoords(n,t);break;default:throw new Error(`Unsupported output dimensionality: ${n.length}`)}let s=`
        void setOutput(float val) {
          ${ue(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `,u="floatTextureSetR";return o[u]=new Y(s),o}getOutputScalarCoords(){return new Y(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(e,n){let t=n,o="";return t[0]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${t[1]}.0);
          }
        `,new Y(o)):t[1]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${t[0]}.0);
          }
        `,new Y(o)):(o=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${t[0]}, ${t[1]}));
          return 2 * (resTexRC.y * ${t[0]} + resTexRC.x);
        }
      `,new Y(o))}getOutputPacked2DCoords(e,n){let t="";if(kr.arraysEqual(e,n))return t=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${n[0]}, ${n[1]}));
        }
      `,new Y(t);let o=n,i=Math.ceil(e[1]/2);return t=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${o[0]}, ${o[1]}));

          int index = resTexRC.y * ${o[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${i}) * 2;
          int c = 2 * (index / ${i});

          return ivec2(r, c);
        }
      `,new Y(t)}getOutputPacked3DCoords(e,n){let t=[n[0],n[1]],o=Math.ceil(e[2]/2),i=o*Math.ceil(e[1]/2),a=`
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
      `;return new Y(a)}getOutputPackedNDCoords(e,n){let t=[n[0],n[1]],o=Math.ceil(e[e.length-1]/2),i=o*Math.ceil(e[e.length-2]/2),a=i,s="",u="b, r, c";for(let d=2;d<e.length-1;d++)a*=e[e.length-d-1],s=`
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
    `;return new Y(l)}getOutputUnpacked1DCoords(e,n){let t=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));
          return resTexRC.y * ${n[0]} + resTexRC.x;
        }
      `;return new Y(t)}getOutputUnpacked2DCoords(e,n){let t=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));
          int index = resTexRC.y * ${n[0]} + resTexRC.x;
          int r = index / ${e[1]};
          int c = index - r * ${e[1]};
          return ivec2(r, c);
        }
      `;return new Y(t)}getOutputUnpacked3DCoords(e,n){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d"],s=i.map((u,l)=>{let d=`int ${a[l]} = index / ${u}`,f=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${d}; ${f};`}).join("");return t=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));
          int index = resTexRC.y * ${n[0]} + resTexRC.x;
          ${s}
          return ivec3(r, c, d);
        }
      `,new Y(t)}getOutputUnpacked4DCoords(e,n){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2"],s=i.map((u,l)=>{let d=`int ${a[l]} = index / ${u}`,f=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${d}; ${f};`}).join("");return t=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));
          int index = resTexRC.y * ${n[0]} + resTexRC.x;
          ${s}
          return ivec4(r, c, d, d2);
        }
      `,new Y(t)}getOutputUnpacked5DCoords(e,n){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2","d3"],s=i.map((u,l)=>{let d=`int ${a[l]} = index / ${u}`,f=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${d}; ${f};`}).join("");return t=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));
          int index = resTexRC.y * ${n[0]} + resTexRC.x;
          ${s}
          return ivec5(r, c, d, d2, d3);
        }
      `,new Y(t)}getOutputUnpacked6DCoords(e,n){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2","d3","d4"],s=i.map((u,l)=>{let d=`int ${a[l]} = index / ${u}`,f=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${d}; ${f};`}).join("");return t=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${n[0]}, ${n[1]}));
         int index = resTexRC.y * ${n[0]} + resTexRC.x;
         ${s}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new Y(t)}getCommonUtilFuncs(){let e={},n="uvFromFlat";e[n]=new Y(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),n="packedUVfrom1D",e[n]=new Y(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),n="packedUVfrom2D",e[n]=new Y(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),n="packedUVfrom3D",e[n]=new Y(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),n="sampleTexture";let t=ue(this.context.glContext.version);return e[n]=new Y(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${t.texture2D}(textureSampler, uv).r;
        }`),e}getInputsSamplingSnippets(){let e={},n=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o],a=Ri(t);i.isPacked?e[a]=this.getPackedSamplerFromInput(a,t,i):e[a]=this.getUnpackedSamplerFromInput(a,t,i);let s=$h(t);i.unpackedShape.length<=n.unpackedShape.length&&(i.isPacked?e[s]=this.getPackedSamplerAtOutputCoords(s,i,n,t):e[s]=this.getUnpackedSamplerAtOutputCoords(s,i,n,t))}),e}getPackedSamplerAtOutputCoords(e,n,t,o){let i=n.unpackedShape,a=t.unpackedShape,u=Ri(o),l=i.length,d=a.length,f=gt.getBroadcastDims(i,a),h=bt(d),g=d-l,b,_=qt();l===0?b="":d<2&&f.length>=1?b="coords = 0;":b=f.map(R=>`coords.${_[R+g]} = 0;`).join(`
`);let T="";d<2&&l>0?T="coords":T=i.map((R,F)=>`coords.${_[F+g]}`).join(", ");let v="return outputValue;",I=ne.size(i)===1,O=ne.size(a)===1;if(l===1&&!I&&!O)v=`
        return vec4(outputValue.xy, outputValue.xy);
      `;else if(I&&!O)d===1?v=`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:v=`
          return vec4(outputValue.x);
        `;else if(f.length){let R=l-2,F=l-1;f.indexOf(R)>-1&&f.indexOf(F)>-1?v="return vec4(outputValue.x);":f.indexOf(R)>-1?v="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":f.indexOf(F)>-1&&(v="return vec4(outputValue.xx, outputValue.zz);")}let E=`
        int lastDim = coords.${_[d-1]};
        coords.${_[d-1]} = coords.${_[d-2]};
        coords.${_[d-2]} = lastDim;
      `,L=`
      vec4 ${e}() {
        ${h} coords = getOutputCoords();
        ${E}
        ${b}
        vec4 outputValue = ${u}(${T});
        ${v}
      }
    `;return new Y(L,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(e,n,t,o){let i=[t.width,t.height],a=[n.width,n.height],s=n.unpackedShape.length,u=t.unpackedShape.length,l=n.unpackedShape,d=t.unpackedShape,f=Ri(o);if(s===u&&kr.arraysEqual(a,i)){let I=`
          float ${e}() {
            return sampleTexture(${o}, TexCoords);
          }
        `;return new Y(I,["coordinates.sampleTexture"])}let h=bt(u),g=gt.getBroadcastDims(l,d),b=u-s,_,T=qt();s===0?_="":u<2&&g.length>=1?_="coords = 0;":_=g.map(I=>`coords.${T[I+b]} = 0;`).join(`
`);let v="";u<2&&s>0?v="coords":v=n.unpackedShape.map((I,$)=>`coords.${T[$+b]}`).join(", ");let x=`
        float ${e}() {
          ${h} coords = getOutputCoords();
          ${_}
          return ${f}(${v});
        }
      `;return new Y(x,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(e,n,t){switch(t.unpackedShape.length){case 0:return this.getPackedSamplerScalar(e,n);case 1:return this.getPackedSampler1D(e,n,t);case 2:return this.getPackedSampler2D(e,n,t);case 3:return this.getPackedSampler3D(e,n,t);default:return this.getPackedSamplerND(e,n,t)}}getUnpackedSamplerFromInput(e,n,t){let o=t.unpackedShape;switch(o.length){case 0:return this.getUnpackedSamplerScalar(e,n,t);case 1:return this.getUnpackedSampler1D(e,n,t);case 2:return this.getUnpackedSampler2D(e,n,t);case 3:return this.getUnpackedSampler3D(e,n,t);case 4:return this.getUnpackedSampler4D(e,n,t);case 5:return this.getUnpackedSampler5D(e,n,t);case 6:return this.getUnpackedSampler6D(e,n,t);default:throw new Error(`Unsupported dimension ${o.length}-D`)}}getPackedSamplerScalar(e,n){let t=ue(this.context.glContext.version),o=`
          vec4 ${e}() {
            return ${t.texture2D}(${n}, halfCR);
          }
        `;return new Y(o)}getPackedSampler1D(e,n,t){let o=[t.width,t.height],i=[o[1],o[0]],a=ue(this.context.glContext.version),u=`vec4 ${e}(int index) {
      vec2 uv = packedUVfrom1D(
      ${i[0]}, ${i[1]}, index);
      return ${a.texture2D}(${n}, uv);
    }`;return new Y(u,["coordinates.packedUVfrom1D"])}getPackedSampler2D(e,n,t){let o=t.unpackedShape,i=[t.width,t.height],a=ue(this.context.glContext.version),s=i[0],u=i[1];if(i!=null&&kr.arraysEqual(o,i)){let g=`vec4 ${e}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${u}.0, ${s}.0);
        return ${a.texture2D}(${n}, uv);
      }`;return new Y(g)}let l=i,d=Math.ceil(o[1]/2),h=`vec4 ${e}(int row, int col) {
      vec2 uv = packedUVfrom2D(${l[1]}, ${l[0]}, ${d}, row, col);
      return ${a.texture2D}(${n}, uv);
    }`;return new Y(h,["coordinates.packedUVfrom2D"])}getPackedSampler3D(e,n,t){let o=t.unpackedShape,i=[t.width,t.height],a=[i[0],i[1]],s=ue(this.context.glContext.version);if(o[0]===1){let b=o.slice(1),_=[1,2],T=ro(o,b),v=["b","row","col"],x=JSON.parse(JSON.stringify(t));x.unpackedShape=T;let I=this.getPackedSamplerFromInput(e,n,x),O=`${I.routineBody}
      vec4 ${e}(int b, int row, int col) {
        return ${e}(${oo(v,_)});
      } `;return new Y(O,I.dependencies)}let u=a[0],l=a[1],d=Math.ceil(o[2]/2),f=d*Math.ceil(o[1]/2),g=`vec4 ${e}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${l}, ${u}, ${f}, ${d}, b, row, col);
      return ${s.texture2D}(${n}, uv);}`;return new Y(g,["coordinates.packedUVfrom3D"])}getPackedSamplerND(e,n,t){let o=t.unpackedShape,i=o.length,a=[t.width,t.height],s=ue(this.context.glContext.version),u=[a[0],a[1]],l=u[1],d=u[0],f=Math.ceil(o[i-1]/2),h=f*Math.ceil(o[i-2]/2),g="int b, int row, int col",b=`b * ${h} + (row / 2) * ${f} + (col / 2)`;for(let v=2;v<i-1;v++)g=`int b${v}, `+g,h*=o[i-v-1],b=`b${v} * ${h} + `+b;let T=`vec4 ${e}(${g}) {
      int index = ${b};
      int texR = index / ${d};
      int texC = index - texR * ${d};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${d}, ${l});
      return ${s.texture2D}(${n}, uv);
    }`;return new Y(T)}getUnpackedSamplerScalar(e,n,t){let[o,i]=[t.width,t.height];if(o===1&&i===1){let s=`
          float ${e}() {
            return sampleTexture(${n}, halfCR);
          }
        `;return new Y(s,["coordinates.sampleTexture"])}let a=`
        float ${e}() {
          int offset_${n} = coordsToOffset(TexCoords, ${o}, ${i});
          vec2 uv = uvFromFlat(${o}, ${i}, offset_${n});
          return sampleTexture(${n}, uv);
        }
      `;return new Y(a,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(e,n,t){let o=t.width,i=t.height;if(i===1&&o===1){let s=`
        float ${e}(int index) {
          return sampleTexture(${n}, halfCR);
        }
      `;return new Y(s,["coordinates.sampleTexture"])}if(i===1){let s=`
          float ${e}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${o}.0, 0.5);
            return sampleTexture(${n}, uv);
          }
        `;return new Y(s,["coordinates.sampleTexture"])}if(o===1){let s=`
          float ${e}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${i}.0);
            return sampleTexture(${n}, uv);
          }
        `;return new Y(s,["coordinates.sampleTexture"])}let a=`
        float ${e}(int index) {
          vec2 uv = uvFromFlat(${o}, ${i}, index);
          return sampleTexture(${n}, uv);
        }
      `;return new Y(a,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(e,n,t){let o=t.unpackedShape,i=[t.height,t.width];if(i!=null&&kr.arraysEqual(o,i)){let h=i[1],g=i[0],b=`
          float ${e}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${h}.0, ${g}.0);
            return sampleTexture(${n}, uv);
          }
        `;return new Y(b,["coordinates.sampleTexture"])}let{newShape:a,keptDims:s}=uo(o),u=a;if(u.length<o.length){let h=ro(o,u),g=JSON.parse(JSON.stringify(t));g.unpackedShape=h;let b=["col","row"],_=`
          ${this.getUnpackedSamplerFromInput(e,n,g).routineBody}
          float ${e}(int row, int col) {
            return ${e}(${oo(b,s)});
          }
        `;return new Y(_,["coordinates.sampleTexture"])}let l=i[1],d=i[0];if(d===1){let h=`
          float ${e}(int row, int col) {
            int offset_${n} = coordsToOffset(TexCoords, ${l}, ${d});
            float index = dot(vec3(row, col, offset_${n}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${l}.0);
            return sampleTexture(${n}, uv);
          }
        `;return new Y(h,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(l===1){let h=`
          float ${e}(int row, int col) {
            int offset_${n} = coordsToOffset(TexCoords, ${l}, ${d});
            float index = dot(vec3(row, col, offset_${n}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${d}.0, 0.5);
            return sampleTexture(${n}, uv);
          }
        `;return new Y(h,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let f=`
        float ${e}(int row, int col) {
          int index = col * ${o[1]} + row;
          vec2 uv = uvFromFlat(${l}, ${d}, index);
          return sampleTexture(${n}, uv);
        }
      `;return new Y(f,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(e,n,t){let o=t.unpackedShape,i=o[1]*o[2],a=o[2],{newShape:s,keptDims:u}=uo(o),l=s;if(l.length<o.length){let g=ro(o,l),b=["batch","col","row"],_=JSON.parse(JSON.stringify(t));_.unpackedShape=g;let T=this.getUnpackedSamplerFromInput(e,n,_),v=u.reverse(),x=`
          ${T.routineBody}
          float ${e}(int batch, int row, int col) {
            return ${e}(${oo(b,v)});
          }
        `;return new Y(x,T.dependencies)}let d=t.width,f=t.height,h=`
          float ${e}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${i} + col * ${a} + row;
            vec2 uv = uvFromFlat(${d}, ${f}, index);
            return sampleTexture(${n}, uv);
          }
      `;return new Y(h,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(e,n,t){let o=t.unpackedShape,i=o[3],a=o[2]*i,s=o[1]*a,u=t.width,l=t.height,d=`
        float ${e}(int row, int col, int depth, int depth2) {
          int index = row * ${s} + col * ${a} +
              depth2 * ${i} + depth;
          vec2 uv = uvFromFlat(${u}, ${l}, index);
          return sampleTexture(${n}, uv);
        }
      `;return new Y(d,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(e,n,t){let o=t.unpackedShape,i=o[4],a=o[3]*i,s=o[2]*a,u=o[1]*s,{newShape:l,keptDims:d}=uo(o);if(l.length<o.length){let b=ro(o,l),_=["row","col","depth","depth2","depth3"],T=JSON.parse(JSON.stringify(t));T.unpackedShape=b;let v=`
          ${this.getUnpackedSamplerFromInput(e,n,T).routineBody}
          float ${e}(int row, int col, int depth, int depth2, int depth3) {
            return ${e}(${oo(_,d)});
          }
        `;return new Y(v,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let f=t.width,h=t.height,g=`
        float ${e}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${u} + col * ${s} + depth * ${a} +
          depth3 * ${i} + depth2;
          vec2 uv = uvFromFlat(${f}, ${h}, index);
          return sampleTexture(${n}, uv);
        }
      `;return new Y(g,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(e,n,t){let o=t.unpackedShape,i=o[5],a=o[4]*i,s=o[3]*a,u=o[2]*s,l=o[1]*u,{newShape:d,keptDims:f}=uo(o);if(d.length<o.length){let _=ro(o,d),T=["row","col","depth","depth2","depth3","depth4"],v=JSON.parse(JSON.stringify(t));v.unpackedShape=_;let x=`
            ${this.getUnpackedSamplerFromInput(e,n,v).routineBody}
            float ${e}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${e}(${oo(T,f)});
            }
          `;return new Y(x,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let h=t.width,g=t.height,b=`
          float ${e}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${l} + col * ${u} + depth * ${s} +
            depth2 * ${a} + depth3 * ${i} + depth4;
            vec2 uv = uvFromFlat(${h}, ${g}, index);
            return sampleTexture(${n}, uv);
          }
        `;return new Y(b,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let e=this.context.outputTextureLayout,n=e.shape.length,t=e.strides,o=e.width,i=e.height,a=[];for(let u=0;u<n-1;++u)a.push(`
        c[${u}] = offset / ${t[u]};`),a.push(`
        offset -= c[${u}] * ${t[u]};`);a.push(`
        c[${n-1}] = offset;`);let s=`
      void toVec(vec2 texCoords, out int c[${n}]) {
        int offset = coordsToOffset(texCoords, ${o}, ${i});
        ${a.join("")}
      }
      void toVec(int offset, out int c[${n}]) {
        ${a.join("")}
      }
    `;return{toVec:new Y(s,["coordinates.coordsToOffset"])}}valueFrom(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t],a=(o.unpackedShape.length>0?o.unpackedShape:o.shape).length,s=`_${n}`;e[s]=new Y(this.getValueFromSingle(n,a,o.width,o.height,!1),[`shapeUtils.indicesToOffset${s}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),s=s+"_T",e[s]=new Y(this.getValueFromSingle(n,a,o.width,o.height,!0),[`shapeUtils.indicesToOffset${s}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),e}getValueFromSingle(e,n,t,o,i){let a=`_${e}`;i&&(a=a+"_T");let s=ue(this.context.glContext.version);return`
        float ${a}(int m[${n}]) {
          int offset = indicesToOffset${a}(m);
          vec2 coords = offsetToCoords(offset, ${t}, ${o});
          float value = getColorAsFloat(${s.texture2D}(${e}, coords));
          return value;
        }
        `}getPackedValueFrom(e,n,t,o,i){let a=`_${e}_Pack`;i&&(a=a+"_T");let s=ue(this.context.glContext.version);return`
        vec4 ${a}(int m[${n}]) {
          int offset = indicesToOffset_${e}(m);
          vec2 coords = offsetToCoords(offset, ${t}, ${o});
          return ${s.texture2D}(${e}, coords);
        }
        `}}});var Yi,Fb=k(()=>{"use strict";Jn();Yi=class r extends zt{constructor(e){super(e)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new Y(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new Y(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){let e=r.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new Y(`
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
        `)}}decodeUint8(){let e=r.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new Y(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${e}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){let e=new ArrayBuffer(4),n=new Uint32Array(e),t=new Uint8Array(e);if(n[0]=3735928559,t[0]===239)return!0;if(t[0]===222)return!1;throw new Error("unknown endianness")}}});var Qi,Vb=k(()=>{"use strict";Jn();Ke();Qi=class extends zt{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=ue(this.context.glContext.version);return{setFragColor:new Y(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new Y(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}});var ea,Gb=k(()=>{"use strict";Jn();ea=class r extends zt{constructor(e){super(e)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let e=this.context.outputTextureLayout.shape.length,n={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].unpackedShape;if(i.length<=e){let a=i.length,s=e-a,u=`bcastIndices_${t}`,l="";for(let f=0;f<a;++f)l+=`
          realIndices[${f}] = int( mod(float(bcastedIndices[${s+f}]), ${i[f]}.0) );
          `;let d=`
        void ${u} (int bcastedIndices[${e}], out int realIndices[${a}]) {
          ${l}
        }
        `;n[u]=new Y(d)}}),n}bcastMatmulIndex(){let e=this.context.outputTextureLayout.shape.length,n={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].shape;if(!(i.length<2||i.length>e)){let a=i.length,s=e-a,u=`bcastMatmulIndices_${t}`,l="";for(let f=0;f<a-2;++f)l+=`
          realIndices[${f}] = int( mod(float(bcastedIndices[${s+f}]), ${i[f]}.0) );
          `;let d=`
        void ${u}(int bcastedIndices[${e}], out int realIndices[${a}]) {
          ${l}
          realIndices[${a-1}] = bcastedIndices[${e-1}];
          realIndices[${a-2}] = bcastedIndices[${e-2}];
        }
        `;n[u]=new Y(d)}}),n}indicesToOffset(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,a=o.length,s=`indicesToOffset_${n}`;e[s]=new Y(r.indexToOffsetSingle(s,a,i)),s=`indicesToOffset_${n}_T`,e[s]=new Y(r.indexToOffsetSingle(s,a,i.slice().reverse()))}),e}static indexToOffsetSingle(e,n,t){let o="";for(let i=n-1;i>=0;--i)o+=`
        offset += indices[${i}] * ${t[i]};
        `;return`
      int ${e}(int indices[${n}]) {
        int offset = 0;
        ${o}
        return offset;
      }
      `}offsetToIndices(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,a=o.length,s=`offsetToIndices_${n}`;e[s]=new Y(r.offsetToIndicesSingle(s,a,i)),s=`offsetToIndices_${n}_T`,e[s]=new Y(r.offsetToIndicesSingle(s,a,i.slice().reverse()))}),e}static offsetToIndicesSingle(e,n,t){let o=[];for(let i=0;i<n-1;++i)o.push(`
      indices[${i}] = offset / ${t[i]};`),o.push(`
        offset -= indices[${i}] * ${t[i]};`);return o.push(`
      indices[${n-1}] = offset;`),`
      void ${e}(int offset, out int indices[${n}]) {
        ${o.join("")}
      }
      `}incrementIndices(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=o.length,a=`incrementIndices_${n}`,s="";for(let l=0;l<i;++l)s+=`
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
        `;e[a]=new Y(u)}),e}}});var ta,Ub=k(()=>{"use strict";Jn();ta=class extends zt{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let n=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},o={};for(let i in t){let a=`${i}Vec`,s="";for(let l=0;l<n;++l)s+=`
          dest[${l}] ${t[i]} src[${l}];
          `;let u=`
        void ${a}(int src[${n}], out int dest[${n}]) {
          ${s}
        }
        `;o[a]=new Y(u)}return o}copyVec(){let n=this.context.outputTextureLayout.shape.length,t="";for(let i=0;i<n;++i)t+=`
        dest[${i}] = src[${i}];
        `;let o=`
      void copyVec(int src[${n}], out int dest[${n}]) {
        ${t}
      }
      `;return{copyVec:new Y(o)}}setVecItem(){let n=this.context.outputTextureLayout.shape.length,t=`
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
        `;return{setVecItem:new Y(o)}}getVecItem(){let n=this.context.outputTextureLayout.shape.length,t=`
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
    `;return{getVecItem:new Y(o)}}}});var Xl,Wb=k(()=>{"use strict";Bb();Fb();Vb();Gb();Ub();Xl={encoding:Yi,fragcolor:Qi,vec:ta,shapeUtils:ea,coordinates:Ji}});var na,Hb=k(()=>{"use strict";Jn();zb();Wb();Ke();na=class{constructor(e,n,t,o){this.libs={};this.glslLibRoutineDependencyGraph={};this.context=new Fi(e,n,t,o),Object.keys(Xl).forEach(a=>{let s=new Xl[a](this.context);this.libs[a]=s});let i=this.glslLibRoutineDependencyGraph;for(let a in this.libs){let u=this.libs[a].getFunctions();for(let l in u){let d=a+"."+l,f;i[d]?(f=i[d],f.routineBody=u[l].routineBody):(f=new Lo(d,u[l].routineBody),i[d]=f);let h=u[l].dependencies;if(h)for(let g=0;g<h.length;++g)if(i[h[g]])f.addDependency(i[h[g]]);else{let b=new Lo(h[g]);i[h[g]]=b,f.addDependency(b)}}}}preprocess(){let e=this.context.programInfo,n=e.shaderSource;return this.context.programInfo.hasMain||(n=`${n}
      ${Sh(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),n=Rb(n),`${Ih(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(n)}
    ${n}`}getImports(e){let n=this.selectGlslLibRoutinesToBeIncluded(e);if(n.length===0)return"";let t="";for(let o=0;o<n.length;++o)if(n[o].routineBody)t+=n[o].routineBody+`
`;else throw new Error(`Missing body for the Glsl Library routine: ${n[o].name}`);return t}selectGlslLibRoutinesToBeIncluded(e){let n=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(t=>{let o=t.split(".")[1];e.indexOf(o)!==-1&&n.push(this.glslLibRoutineDependencyGraph[t])}),Vi.returnOrderedNodes(n)}getUniforms(e,n){let t=[];if(e)for(let o of e)t.push(`uniform sampler2D ${o};`);if(n)for(let o of n)t.push(`uniform ${o.type} ${o.name}${o.arrayLength?`[${o.arrayLength}]`:""};`);return t.join(`
`)}}});var ra,jb=k(()=>{"use strict";pt();Ct();Hb();Ke();ra=class{constructor(e,n,t){this.profiler=e;this.glContext=n;this.textureLayoutStrategy=t;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,n){this.repo.set(e,n)}run(e,n,t){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let o=this.glContext.gl,i=e.program;o.useProgram(i);try{this.bindOutput(t),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],n)}catch(a){throw Fe.error("ProgramManager",e.programInfo.shaderSource),a}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,n,t){return this.profiler.event("backend","ProgramManager.build",()=>{let o=new na(this.glContext,e,n,t),i=o.preprocess(),a=this.compile(i);return{programInfo:e,program:a,uniformLocations:this.getUniformLocations(a,o.context.programInfo.inputNames,o.context.programInfo.variables),attribLocations:this.getAttribLocations(a)}})}compile(e){if(!this.vertexShader){Fe.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let o=Th(this.glContext.version);this.vertexShader=this.glContext.compileShader(o,this.glContext.gl.VERTEX_SHADER)}me.debug&&Fe.verbose("ProrgramManager",`FragShader:
${e}
`);let n=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),t=this.glContext.createProgram(this.vertexShader,n);return this.glContext.deleteShader(n),t}bindOutput(e){let n=e.width,t=e.height;Fe.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${n}/${t}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,n,t)}bindAttributes(e){let n=e.position,t=e.textureCoord;this.glContext.setVertexAttributes(n,t),this.attributesBound=!0}bindUniforms(e,n,t){let o=this.glContext.gl,i=0;for(let{name:a,type:s,location:u,arrayLength:l}of e){let d=n.find(f=>f.name===a)?.data;if(s!=="sampler2D"&&!d)throw new Error(`variable '${a}' does not have data defined in program info`);switch(s){case"sampler2D":this.bindTexture(t[i],u,i),i++;break;case"float":l?o.uniform1fv(u,d):o.uniform1f(u,d);break;case"int":l?o.uniform1iv(u,d):o.uniform1i(u,d);break;default:throw new Error(`Uniform not implemented: ${s}`)}}}bindTexture(e,n,t){this.glContext.bindTextureToUniform(e.texture,t,n)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,n,t){let o=[];if(n)for(let i of n)o.push({name:i,type:"sampler2D",location:this.getUniformLocation(e,i)});if(t)for(let i of t)o.push({...i,location:this.getUniformLocation(e,i.name)});return o}getUniformLocation(e,n){let o=this.glContext.gl.getUniformLocation(e,n);if(o===null)throw new Error(`Uniform ${n} not found.`);return o}getAttribLocation(e,n){return this.glContext.gl.getAttribLocation(e,n)}}});var oa,qb=k(()=>{"use strict";Ct();ko();oa=class{constructor(e,n,t,o){this.glContext=e;this.layoutStrategy=n;this.profiler=t;this.config=o;this.pendingRead=new Map;o.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,n,t,o){let i=this.toEncoderType(e),a=this.glContext.getEncoder(i,n.channels||1,o);if(n.isPacked&&o===1)throw new Error("not implemented");let s=n.width,u=n.height,l,d;if(this.config.reuseTextures){l=`${s}x${u}_${a.format}_${a.internalFormat}_${a.textureType}`,d=this.inUseTextures.get(l),d||(d=[],this.inUseTextures.set(l,d));let h=this.idleTextures.get(l);if(h&&h.length>0){let g=h.pop();return d.push(g),o===1&&this.glContext.updateTexture(g,s,u,a,this.toTextureData(e,t)),g}}Fe.verbose("TextureManager",`Creating new texture of size ${n.width}x${n.height}`);let f=this.glContext.allocateTexture(s,u,a,this.toTextureData(e,t));return this.config.reuseTextures&&(d.push(f),this.textureLookup.set(f,l)),f}readTexture(e,n,t){return t||(t=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let o=e.shape.reduce((a,s)=>a*s)*t,i=this.glContext.readTexture(e.texture,e.width,e.height,o,this.toEncoderType(n),t);return this.toTensorData(n,i)})}async readTextureAsync(e,n,t){let o=e.tensor.dataId;if(t||(t=1),this.pendingRead.has(o)){let i=this.pendingRead.get(o);return new Promise(a=>i?.push(a))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(o,[]);let i=e.shape.reduce((l,d)=>l*d)*t;await this.glContext.createAndWaitForFence();let a=this.glContext.readTexture(e.texture,e.width,e.height,i,this.toEncoderType(n),t),s=this.toTensorData(n,a),u=this.pendingRead.get(o);return this.pendingRead.delete(o),u?.forEach(l=>l(s)),s})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let n=e.shape.reduce((o,i)=>o*i),t=this.glContext.readTexture(e.texture,e.width,e.height,n*4,"byte",4);return new Float32Array(t.buffer,t.byteOffset,n)})}releaseTexture(e,n){let t;if(this.config.reuseTextures&&(t=this.textureLookup.get(e.texture),t)){n&&this.textureLookup.delete(t);let o=this.inUseTextures.get(t);if(o){let i=o.indexOf(e.texture);if(i!==-1){o.splice(i,1);let a=this.idleTextures.get(t);a||(a=[],this.idleTextures.set(t,a)),a.push(e.texture)}}}(!t||n)&&(Fe.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,n){switch(e){case"int16":return n instanceof Int16Array?n:Int16Array.from(n);case"int32":return n instanceof Int32Array?n:Int32Array.from(n);case"int8":return n instanceof Int8Array?n:Int8Array.from(n);case"uint16":return n instanceof Uint16Array?n:Uint16Array.from(n);case"uint32":return n instanceof Uint32Array?n:Uint32Array.from(n);case"uint8":case"bool":return n instanceof Uint8Array?n:Uint8Array.from(n);case"float32":return n instanceof Float32Array?n:Float32Array.from(n);case"float64":return n instanceof Float64Array?n:Float64Array.from(n);default:throw new Error(`TensorData type ${e} is not supported`)}}toTextureData(e,n){if(n)return n instanceof Float32Array?n:new Float32Array(n)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}});var ia,Kb=k(()=>{"use strict";Ct();Rp();Fh();Nb();jb();Kl();qb();ia=class{constructor(e,n){this.backend=e;this.context=n;this.layoutStrategy=new Zi(e.glContext.maxTextureSize),this.programManager=new ra(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new oa(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:e.textureCacheMode==="full"}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new Bi(this)}onGraphInitialized(e){let n=e.getValues().filter(t=>t.from===-1&&t.tensor).map(t=>t.tensor.dataId);this.initializers=new Set(n)}isInitializer(e){return this.initializers?this.initializers.has(e):!1}addInitializer(e){this.initializers.add(e)}getTextureData(e,n){return n?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,n,t=!1){Fe.verbose("WebGLSessionHandler","Storing Texture data in cache"),t?this.packedTextureDataCache.set(e,n):this.unpackedTextureDataCache.set(e,n)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,n,t){let o=Lp(e,n,kb);return{impl:o.opImpl,context:o.opInit?o.opInit(e,t):e}}}});function xO(r){let e=0;for(;e<r.length&&r[e]();++e);return e-1}var Mo,Xb=k(()=>{"use strict";pt();ko();ko();Nn();Mo=class{constructor(e,n){this.frameBufferBound=!1;this.itemsToPoll=[];this.gl=e,this.version=n,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,n,t,o){let i=this.gl,a=i.createTexture();i.bindTexture(i.TEXTURE_2D,a),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);let s=o?t.encode(o,e*n):null;return i.texImage2D(i.TEXTURE_2D,0,t.internalFormat,e,n,0,t.format,t.textureType,s),this.checkError(),a}updateTexture(e,n,t,o,i){let a=this.gl;a.bindTexture(a.TEXTURE_2D,e);let s=o.encode(i,n*t);a.texSubImage2D(a.TEXTURE_2D,0,0,0,n,t,o.format,o.textureType,s),this.checkError()}attachFramebuffer(e,n,t){let o=this.gl;o.bindTexture(o.TEXTURE_2D,e),o.bindFramebuffer(o.FRAMEBUFFER,this.framebuffer),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0),this.checkError(),o.viewport(0,0,n,t),o.scissor(0,0,n,t)}readTexture(e,n,t,o,i,a){let s=this.gl;a||(a=1),this.frameBufferBound||this.attachFramebuffer(e,n,t);let u=this.getEncoder(i,a),l=u.allocate(n*t);return s.bindTexture(s.TEXTURE_2D,e),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,e,0),s.readPixels(0,0,n,t,s.RGBA,u.textureType,l),this.checkError(),u.decode(l,o)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,n){let t=this.gl;t.vertexAttribPointer(e,3,t.FLOAT,!1,20,0),t.enableVertexAttribArray(e),n!==-1&&(t.vertexAttribPointer(n,2,t.FLOAT,!1,20,12),t.enableVertexAttribArray(n)),this.checkError()}createProgram(e,n){let t=this.gl,o=t.createProgram();return t.attachShader(o,e),t.attachShader(o,n),t.linkProgram(o),o}compileShader(e,n){let t=this.gl,o=t.createShader(n);if(!o)throw new Error(`createShader() returned null with type ${n}`);if(t.shaderSource(o,e),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)===!1)throw new Error(`Failed to compile shader: ${t.getShaderInfoLog(o)}
Shader source:
${e}`);return o}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,n,t){let o=this.gl;o.activeTexture(o.TEXTURE0+n),this.checkError(),o.bindTexture(o.TEXTURE_2D,e),this.checkError(),o.uniform1i(t,n),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(me.debug){let e=this.gl,n=e.getError(),t="";switch(n){case e.NO_ERROR:return;case e.INVALID_ENUM:t="INVALID_ENUM";break;case e.INVALID_VALUE:t="INVALID_VALUE";break;case e.INVALID_OPERATION:t="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:t="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:t="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:t="CONTEXT_LOST_WEBGL";break;default:t=`Unknown WebGL Error: ${n.toString(16)}`}throw new Error(t)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,n,t=0){if(this.version===2)return new zi(this.gl,n);switch(e){case"float":return t===1||this.isRenderFloat32Supported?new Do(this.gl,n):new Do(this.gl,n,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw new Error("not implemented");case"byte":return new Mi(this.gl,n);default:throw new Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let n=0;n<this.maxTextureImageUnits;++n)e.activeTexture(e.TEXTURE0+n),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,n=e.createBuffer();if(!n)throw new Error("createBuffer() returned null");let t=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,n),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),this.checkError(),n}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw new Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),this.version===1&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw new Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){this.version===2?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n);let t=this.version===2?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,t,1,1,0,e.RGBA,e.FLOAT,null);let o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(n),e.deleteFramebuffer(o),i}checkRenderFloat32(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e=this.gl,n,t,o,i,a;try{n=e.createTexture(),t=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,n);let s=this.version===2?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,s,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.enable(e.BLEND),o=e.createShader(e.VERTEX_SHADER),!o||(e.shaderSource(o,"void main(){}"),e.compileShader(o),i=e.createShader(e.FRAGMENT_SHADER),!i)||(e.shaderSource(i,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(i),a=e.createProgram(),!a)?!1:(e.attachShader(a,o),e.attachShader(a,i),e.linkProgram(a),e.useProgram(a),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),a&&e.deleteProgram(a),o&&e.deleteShader(o),i&&e.deleteShader(i),t&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(t)),n&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(n))}}beginTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,n=this.disjointTimerQueryWebgl2Extension,t=e.createQuery();return e.beginQuery(n.TIME_ELAPSED_EXT,t),t}else throw new Error("WebGL1 profiling currently not supported.")}endTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,n=this.disjointTimerQueryWebgl2Extension;e.endQuery(n.TIME_ELAPSED_EXT);return}else throw new Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let n=!1,t=!1;if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let o=this.gl,i=this.disjointTimerQueryWebgl2Extension;n=o.getQueryParameter(e,o.QUERY_RESULT_AVAILABLE),t=o.getParameter(i.GPU_DISJOINT_EXT)}else throw new Error("WebGL1 profiling currently not supported");return n&&!t}getTimerResult(e){let n=0;if(this.version===2){let t=this.gl;n=t.getQueryParameter(e,t.QUERY_RESULT),t.deleteQuery(e)}else throw new Error("WebGL1 profiling currently not supported");return n/1e6}async waitForQueryAndGetTime(e){return await vl(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let n,t=e,o=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),o===null?n=()=>!0:n=()=>{let i=t.clientWaitSync(o,0,0);return i===t.ALREADY_SIGNALED||i===t.CONDITION_SATISFIED},{query:o,isFencePassed:n}}async pollFence(e){return new Promise(n=>{this.addItemToPoll(()=>e.isFencePassed(),()=>n())})}pollItems(){let e=xO(this.itemsToPoll.map(n=>n.isDoneFn));for(let n=0;n<=e;++n){let{resolveFn:t}=this.itemsToPoll[n];t()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,n){this.itemsToPoll.push({isDoneFn:e,resolveFn:n}),!(this.itemsToPoll.length>1)&&await vl(()=>(this.pollItems(),this.itemsToPoll.length===0))}}});function Zl(r){let e;if((!r||r==="webgl2")&&"webgl2"in lo?e=lo.webgl2:(!r||r==="webgl")&&"webgl"in lo&&(e=lo.webgl),!e)try{let t=IO();e=Zb(t,r)}catch{let o=TO();e=Zb(o,r)}r=r||e.version===1?"webgl":"webgl2";let n=e.gl;return lo[r]=e,n.isContextLost()?(delete lo[r],Zl(r)):(n.disable(n.DEPTH_TEST),n.disable(n.STENCIL_TEST),n.disable(n.BLEND),n.disable(n.DITHER),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SAMPLE_COVERAGE),n.enable(n.SCISSOR_TEST),n.enable(n.CULL_FACE),n.cullFace(n.BACK),e)}function Zb(r,e){let n={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1},t,o=n;if((!e||e==="webgl2")&&(t=r.getContext("webgl2",o),t))try{return new Mo(t,2)}catch(i){Fe.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${i}`)}if((!e||e==="webgl")&&(t=r.getContext("webgl",o)||r.getContext("experimental-webgl",o),t))try{return new Mo(t,1)}catch(i){Fe.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${i}`)}throw new Error("WebGL is not supported")}function TO(){if(typeof document>"u")throw new TypeError("failed to create canvas: document is not supported");let r=document.createElement("canvas");return r.width=1,r.height=1,r}function IO(){if(typeof OffscreenCanvas>"u")throw new TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var lo,Jb=k(()=>{"use strict";Ct();Xb();lo={}});var aa,Yb=k(()=>{"use strict";pt();Ct();Kb();Jb();aa=class{get contextId(){return me.webgl.contextId}set contextId(e){me.webgl.contextId=e}get matmulMaxBatchSize(){return me.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){me.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return me.webgl.textureCacheMode}set textureCacheMode(e){me.webgl.textureCacheMode=e}get pack(){return me.webgl.pack}set pack(e){me.webgl.pack=e}get async(){return me.webgl.async}set async(e){me.webgl.async=e}initialize(){try{return this.glContext=Zl(this.contextId),typeof this.matmulMaxBatchSize!="number"&&(this.matmulMaxBatchSize=16),typeof this.textureCacheMode!="string"&&(this.textureCacheMode="full"),typeof this.pack!="boolean"&&(this.pack=!1),typeof this.async!="boolean"&&(this.async=!1),Fe.setWithEnv(me),me.webgl.context||Object.defineProperty(me.webgl,"context",{value:this.glContext.gl}),Fe.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return Fe.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new ia(this,e)}dispose(){this.glContext.dispose()}}});async function Jl(r){if(r){let e=typeof r=="string"?[r]:r;for(let n of e){let t=Qb.get(n);if(t)return t;let o=await $O(n);if(o)return o}}else return Jl(["webgl"]);throw new Error("no available backend to use")}async function $O(r){let e=SO;if(typeof e[r]<"u"&&AO(e[r])){let n=e[r],t=n.initialize();if(typeof t=="object"&&"then"in t&&(t=await t),t)return Qb.set(r,n),n}}function AO(r){let e=r;return"initialize"in e&&typeof e.initialize=="function"&&"createSessionHandler"in e&&typeof e.createSessionHandler=="function"&&"dispose"in e&&typeof e.dispose=="function"}var Qb,SO,ey=k(()=>{"use strict";Yb();Qb=new Map,SO={webgl:new aa}});var Yl,sa,ty=k(()=>{"use strict";Ct();Yl=class{constructor(e,n){this.op=e;this.node=n}},sa=class{constructor(e,n,t){this.graph=e;this.profiler=t;this.initialize(n)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let n=this.graph.getNodes();if(n.length!==e.length)throw new Error("The size of nodes and OPs do not match.");this._ops=e.map((t,o)=>new Yl(t,n[o])),this.reset(),this._starter=[],this._ops.forEach((t,o)=>{let i=!0;for(let a of t.node.inputs)if(!this._values[a]&&this.graph.getInputIndices().indexOf(a)===-1){i=!1;break}i&&this._starter.push(o)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,n){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let t=e.createInferenceHandler(),o=this.graph.getInputIndices();if(n.length!==o.length)throw new Error(`number of input tensors don't match the number of inputs to the model: actual: ${n.length} expected: ${o.length}`);n.forEach((d,f)=>{let h=o[f];this._values[h]=d});let i=this._starter.slice(0),a=this.graph.getValues(),s=this.graph.getNodes(),u=0;for(;u<i.length;){let d=i[u++],f=this._ops[d],h=f.node.inputs.map(T=>this._values[T]);if(h.indexOf(void 0)!==-1)throw new Error(`unresolved input detected: op: ${f.node}`);let g=h;Fe.verbose("ExecPlan",`Running op:${f.node.name} (${g.map((T,v)=>`'${f.node.inputs[v]}': ${T.type}[${T.dims.join(",")}]`).join(", ")})`);let b=await this.profiler.event("node",f.node.name,async()=>f.op.impl(t,g,f.op.context));if(b.length!==f.node.outputs.length)throw new Error("the size of output does not match model definition.");b.forEach((T,v)=>{let x=f.node.outputs[v];if(this._values[x])throw new Error(`output [${x}] already has value: op:${f.node.name}`);this._values[x]=T});let _=new Set;b.forEach((T,v)=>{let x=f.node.outputs[v];for(let I of a[x].to){let $=s[I],O=!0;for(let E of $.inputs)if(!this._values[E]){O=!1;break}O&&_.add(I)}}),i.push(..._)}let l=[];for(let d=0;d<this.graph.getOutputIndices().length;d++){let f=this.graph.getOutputIndices()[d],h=this._values[f];if(h===void 0)throw new Error(`required output [${f}] does not have value`);f===0?await h.getData():h.data,l.push(h)}return Fe.verbose("ExecPlan","disposing of inferenceHandler"),t.dispose(),l})}}});var $e,Bo,ny=k(()=>{"use strict";$o();$e=ve(to());zr();Me();Bo=class r{constructor(e){if(this._attributes=new Map,e!=null){for(let n of e)n instanceof $e.onnx.AttributeProto?this._attributes.set(n.name,[r.getValue(n),r.getType(n)]):n instanceof Pi.Attribute&&this._attributes.set(n.name(),[r.getValue(n),r.getType(n)]);if(this._attributes.size<e.length)throw new Error("duplicated attribute names")}}set(e,n,t){this._attributes.set(e,[t,n])}delete(e){this._attributes.delete(e)}getFloat(e,n){return this.get(e,"float",n)}getInt(e,n){return this.get(e,"int",n)}getString(e,n){return this.get(e,"string",n)}getTensor(e,n){return this.get(e,"tensor",n)}getFloats(e,n){return this.get(e,"floats",n)}getInts(e,n){return this.get(e,"ints",n)}getStrings(e,n){return this.get(e,"strings",n)}getTensors(e,n){return this.get(e,"tensors",n)}get(e,n,t){let o=this._attributes.get(e);if(o===void 0){if(t!==void 0)return t;throw new Error(`required attribute not found: ${e}`)}if(o[1]!==n)throw new Error(`type mismatch: expected ${n} but got ${o[1]}`);return o[0]}static getType(e){let n=e instanceof $e.onnx.AttributeProto?e.type:e.type();switch(n){case $e.onnx.AttributeProto.AttributeType.FLOAT:return"float";case $e.onnx.AttributeProto.AttributeType.INT:return"int";case $e.onnx.AttributeProto.AttributeType.STRING:return"string";case $e.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case $e.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case $e.onnx.AttributeProto.AttributeType.INTS:return"ints";case $e.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case $e.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw new Error(`attribute type is not supported yet: ${$e.onnx.AttributeProto.AttributeType[n]}`)}}static getValue(e){let n=e instanceof $e.onnx.AttributeProto?e.type:e.type();if(n===$e.onnx.AttributeProto.AttributeType.GRAPH||n===$e.onnx.AttributeProto.AttributeType.GRAPHS)throw new Error("graph attribute is not supported yet");let t=this.getValueNoCheck(e);if(n===$e.onnx.AttributeProto.AttributeType.INT&&xt.isLong(t))return xt.longToNumber(t);if(n===$e.onnx.AttributeProto.AttributeType.INTS){let o=t,i=new Array(o.length);for(let a=0;a<o.length;a++){let s=o[a];i[a]=xt.longToNumber(s)}return i}if(n===$e.onnx.AttributeProto.AttributeType.TENSOR)return e instanceof $e.onnx.AttributeProto?nt.fromProto(t):nt.fromOrtTensor(t);if(n===$e.onnx.AttributeProto.AttributeType.TENSORS){if(e instanceof $e.onnx.AttributeProto)return t.map(i=>nt.fromProto(i));if(e instanceof Pi.Attribute)return t.map(i=>nt.fromOrtTensor(i))}return n===$e.onnx.AttributeProto.AttributeType.STRING&&e instanceof $e.onnx.AttributeProto?Co(t):n===$e.onnx.AttributeProto.AttributeType.STRINGS&&e instanceof $e.onnx.AttributeProto?t.map(Co):t}static getValueNoCheck(e){return e instanceof $e.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(e):this.getValueNoCheckFromOrtFormat(e)}static getValueNoCheckFromOnnxFormat(e){switch(e.type){case $e.onnx.AttributeProto.AttributeType.FLOAT:return e.f;case $e.onnx.AttributeProto.AttributeType.INT:return e.i;case $e.onnx.AttributeProto.AttributeType.STRING:return e.s;case $e.onnx.AttributeProto.AttributeType.TENSOR:return e.t;case $e.onnx.AttributeProto.AttributeType.GRAPH:return e.g;case $e.onnx.AttributeProto.AttributeType.FLOATS:return e.floats;case $e.onnx.AttributeProto.AttributeType.INTS:return e.ints;case $e.onnx.AttributeProto.AttributeType.STRINGS:return e.strings;case $e.onnx.AttributeProto.AttributeType.TENSORS:return e.tensors;case $e.onnx.AttributeProto.AttributeType.GRAPHS:return e.graphs;default:throw new Error(`unsupported attribute type: ${$e.onnx.AttributeProto.AttributeType[e.type]}`)}}static getValueNoCheckFromOrtFormat(e){switch(e.type()){case Lt.AttributeType.FLOAT:return e.f();case Lt.AttributeType.INT:return e.i();case Lt.AttributeType.STRING:return e.s();case Lt.AttributeType.TENSOR:return e.t();case Lt.AttributeType.GRAPH:return e.g();case Lt.AttributeType.FLOATS:return e.floatsArray();case Lt.AttributeType.INTS:{let n=[];for(let t=0;t<e.intsLength();t++)n.push(e.ints(t));return n}case Lt.AttributeType.STRINGS:{let n=[];for(let t=0;t<e.stringsLength();t++)n.push(e.strings(t));return n}case Lt.AttributeType.TENSORS:{let n=[];for(let t=0;t<e.tensorsLength();t++)n.push(e.tensors(t));return n}default:throw new Error(`unsupported attribute type: ${Lt.AttributeType[e.type()]}`)}}}});var ec,tc,zn,ua,Ql,ry=k(()=>{"use strict";ny();$o();ec=ve(to());zr();Me();tc={from:(r,e)=>new Ql(r,e)},zn=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=ft.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},ua=class{constructor(e,n){e instanceof ec.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new Bo(e.attribute)):e instanceof nl.Node&&(this.name=n??e.name(),this.opType=e.opType(),this.attributes=new Bo(ft.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},Ql=class{constructor(e,n){if(!e)throw new TypeError("graph is empty");this.buildGraph(e),this.transformGraph(n),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof ec.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof el.Graph)this.buildGraphFromOrtFormat(e);else throw new TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let n=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map;if(!e.input)throw new Error("missing information in graph: input");let o=[];for(let i of e.input){if(n.has(i.name))throw new Error(`duplicated input name: ${i.name}`);let a=this._allData.push(new zn(i))-1;n.set(i.name,a),o.push(i.name)}if(!e.initializer)throw new Error("missing information in graph: initializer");for(let i of e.initializer){let a=n.get(i.name);if(a===void 0){let s=new zn;s.type={shape:{dims:ft.tensorDimsFromProto(i.dims)},tensorType:ft.tensorDataTypeFromProto(i.dataType)},a=this._allData.push(s)-1,n.set(i.name,a)}this._allData[a]._from=-1,this._allData[a].tensor=nt.fromProto(i)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));if(!e.output)throw new Error("missing information in graph: output");for(let i of e.output){if(n.has(i.name))throw new Error(`duplicated output name: ${i.name}`);let a=this._allData.push(new zn(i))-1;n.set(i.name,a),this._allOutputIndices.push(a),this._allOutputNames.push(i.name)}if(!e.node)throw new Error("missing information in graph: node");for(let i of e.node){if(!i.name)for(let s=0;;s++){let u=`unnamed_${i.opType}_${s}`;if(!t.has(u)){i.name=u;break}}if(t.has(i.name))throw new Error(`duplicated node name: ${i.name}`);let a=this._nodes.push(new ua(i))-1;t.set(i.name,a)}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.node[i];if(!s.output)throw new Error(`missing output for node: ${s.name}`);for(let u of s.output){let l=n.get(u);if(typeof l>"u"&&(l=this._allData.push(new zn)-1,n.set(u,l)),a.outputs.push(l),this._allData[l]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${l}`);if(this._allData[l]._from=i,s.opType==="Constant"){if(!s.attribute||s.attribute.length!==1||!s.attribute[0].t)throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!s.output||s.output.length!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");a.outputs.pop(),a.executeNode=!1,this._allData[l]._from=-1,this._allData[l].tensor=nt.fromProto(s.attribute[0].t)}}}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.node[i];if(!s.input)throw new Error(`missing input for node: ${s.name}`);for(let u of s.input){let l=n.get(u);if(typeof l>"u"){if(u===""&&(s.input.length===3||s.input.length===4)&&s.opType==="Resize")continue;throw new Error(`unrecognized input '${u}' for node: ${s.name}`)}a.inputs.push(l),this._allData[l]._to.push(i)}}return!0}buildGraphFromOrtFormat(e){let n=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map,o=[];for(let i=0;i<e.inputsLength();i++){let a=e.inputs(i);if(n.has(a))throw new Error(`duplicated input name: ${a}`);for(let s=0;s<e.nodeArgsLength();s++)if(e.nodeArgs(s)?.name()===a){let u=new zn;if(e.nodeArgs(s)?.type()?.valueType()!==ol.TypeInfoValue.tensor_type)throw new Error("Unexpected value type for the nodeArg.");let d=e.nodeArgs(s).type().value(new rl.TensorTypeAndShape),f=ft.tensorDataTypeFromProto(d.elemType()),h=d.shape(),g=[];for(let _=0;_<h.dimLength();_++)g.push(xt.longToNumber(h.dim(_).value().dimValue()));u.type={shape:{dims:g},tensorType:f};let b=this._allData.push(u)-1;n.set(a,b),o.push(a)}}for(let i=0;i<e.initializersLength();i++){let a=e.initializers(i),s=n.get(a.name());if(s===void 0){let u=new zn,l=ft.tensorDimsFromORTFormat(a),d=ft.tensorDataTypeFromProto(a.dataType());u.type={shape:{dims:l},tensorType:d},s=this._allData.push(u)-1,n.set(a.name(),s)}this._allData[s]._from=-1,this._allData[s].tensor=nt.fromOrtTensor(a)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));for(let i=0;i<e.outputsLength();i++){let a=e.outputs(i);if(n.has(a))throw new Error(`duplicated output name: ${a}`);let s=this._allData.push(new zn)-1;n.set(a,s),this._allOutputIndices.push(s),this._allOutputNames.push(a)}if(!e.nodes)throw new Error("missing information in graph: node");for(let i=0;i<e.nodesLength();i++){let a=e.nodes(i),s=a.name();if(!s)for(let l=0;s=`unnamed_${a.opType()}_${l}`,!!t.has(s);l++);if(t.has(s))throw new Error(`duplicated node name: ${s}`);let u=this._nodes.push(new ua(a,s))-1;t.set(s,u)}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.nodes(i);if(s==null)throw new Error(`No node exists at index ${i}`);if(s?.outputsLength()===0)throw new Error(`missing output for node: ${s.name}`);for(let u=0;u<s?.outputsLength();u++){let l=s?.outputs(u),d=n.get(l);if(typeof d>"u"&&(d=this._allData.push(new zn)-1,n.set(l,d)),a.outputs.push(d),this._allData[d]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${d}`);if(this._allData[d]._from=i,s.opType()==="Constant"){if(s.attributesLength()!==1||!s.attributes(0).t())throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(s.outputsLength()!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");a.outputs.pop(),a.executeNode=!1,this._allData[d]._from=-1,this._allData[d].tensor=nt.fromOrtTensor(s.attributes(0).t())}}}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.nodes(i);if(s.inputsLength()===0)throw new Error(`missing input for node: ${s.name}`);for(let u=0;u<s.inputsLength();u++){let l=s.inputs(u),d=n.get(l);if(typeof d>"u")throw new Error(`unrecognized input '${l}' for node: ${s.name()}`);a.inputs.push(d),this._allData[d]._to.push(i)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(o=>{this._allData[o]._to.forEach(a=>{e.add(a)})});let n=Array.from(e),t=new Array(this._nodes.length).fill("white");for(;n.length>0;){let o=n.pop();t[o]==="gray"?t[o]="black":(n.push(o),t[o]="gray",this._nodes[o].outputs.forEach(i=>{let a=this._allData[i];if(typeof a.tensor<"u")throw new Error("node outputs should not be initialized");if(a._from!==o)throw new Error("from property of the Value object doesn't match index of Node being processed");a._to.forEach(s=>{if(t[s]==="gray")throw new Error("model graph is cyclic");t[s]==="white"&&n.push(s)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,n=new Array(this._nodes.length,0),t=0;for(let o=0;o<this._nodes.length;o++)n[o]=t,this._nodes[o].executeNode?(t!==o&&(this._nodes[t]=this._nodes[o]),t++):this._nodes[o].outputs.forEach(i=>{this._allData[i]._from=-2});this._nodes.splice(t,this._nodes.length-t);for(let o=0;o<this._allData.length;o++){let i=this._allData[o];i._from!==void 0&&i._from!==-1&&i._from!==-2&&(i._from=n[i._from]);for(let a=0;a<i._to.length;a++)if(i._to[a]>=0)i._to[a]=n[i._to[a]];else throw new Error("Trying to update a removed node")}e=0;for(let o=0;o<this._allData.length;o++){if(this._allData[o].from===-2&&this._allOutputIndices.indexOf(o+e)===-1){e++,this._allData.splice(o,1),o--;continue}if(e>0){let i=-1;this._allData[o].from!==void 0&&this._allData[o].from!==-1?(i=this._nodes[this._allData[o].from].outputs.indexOf(o+e),i!==-1&&(this._nodes[this._allData[o].from].outputs[i]=o)):(i=this._allInputIndices.indexOf(o+e),i!==-1&&(this._allInputIndices[i]=o)),this._allData[o].to.forEach(a=>{i=this._nodes[a].inputs.indexOf(o+e),i!==-1&&(this._nodes[a].inputs[i]=o)}),this._allData[o].to.length===0&&(i=this._allOutputIndices.indexOf(o+e),i!==-1&&(this._allOutputIndices[i]=o))}}}deleteNode(e){let n=this._nodes[e];if(n.outputs.length>1){for(let s=1;s<n.outputs.length;s++)if(this._allData[n.outputs[s]].to.length>0)throw new Error("Node deletion with more than one output connected to other nodes is not supported. ")}n.executeNode=!1;let t=n.inputs[0],o=n.outputs[0],i=this._allData[o].to;for(let s=0;s<n.inputs.length;s++){let u=this._allData[n.inputs[s]].to.indexOf(e);if(u===-1)throw new Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[n.inputs[s]].to.splice(u,1)}this._allData[o]._to=[];let a=this._allOutputIndices.indexOf(o);if(a!==-1&&(this._allOutputIndices[a]=t),i&&i.length>0)for(let s of i){let u=this._nodes[s].inputs.indexOf(o);if(u===-1)throw new Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[s].inputs[u]=t,this._allData[t].to.push(s)}}removeAllDropoutNodes(){let e=0;for(let n of this._nodes){if(n.opType==="Dropout"){if(n.inputs.length!==1)throw new Error("Dropout nodes should only contain one input. ");if(n.outputs.length!==1&&n.outputs.length!==2)throw new Error("Dropout nodes should contain either 1 or 2 output(s)");if(n.outputs.length===2&&this._allData[n.outputs[1]]._to.length!==0)throw new Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let n of this._nodes)n.opType==="Identity"&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if(e.opType==="Conv"){let n=this._allData[e.outputs[0]]._to;if(n.length===1&&this.isActivation(this._nodes[n[0]])){let t=this._nodes[n[0]];if(t.opType==="Clip")if(t.inputs.length===1)try{e.attributes.set("activation_params","floats",[t.attributes.getFloat("min"),t.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[Lr,Rr])}else if(t.inputs.length>=3&&this._allData[t.inputs[1]].tensor!==void 0&&this._allData[t.inputs[2]].tensor!==void 0)e.attributes.set("activation_params","floats",[this._allData[t.inputs[1]].tensor.floatData[0],this._allData[t.inputs[2]].tensor.floatData[0]]);else continue;e.attributes.set("activation","string",t.opType),this.deleteNode(n[0])}}}}});var oy,iy,la,ay=k(()=>{"use strict";oy=ve(ze());ry();$o();iy=ve(to());Me();la=class{constructor(){}load(e,n,t){let o;if(!t)try{this.loadFromOnnxFormat(e,n);return}catch(i){if(t!==void 0)throw i;o=i}try{this.loadFromOrtFormat(e,n)}catch(i){throw t!==void 0?i:new Error(`Failed to load model as ONNX format: ${o}
as ORT format: ${i}`)}}loadFromOnnxFormat(e,n){let t=iy.onnx.ModelProto.decode(e);if(xt.longToNumber(t.irVersion)<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=t.opsetImport.map(i=>({domain:i.domain,version:xt.longToNumber(i.version)})),this._graph=tc.from(t.graph,n)}loadFromOrtFormat(e,n){let t=new oy.ByteBuffer(e),o=tl.InferenceSession.getRootAsInferenceSession(t).model();if(xt.longToNumber(o.irVersion())<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let a=0;a<o.opsetImportLength();a++){let s=o.opsetImport(a);this._opsets.push({domain:s?.domain(),version:xt.longToNumber(s.version())})}this._graph=tc.from(o.graph(),n)}get graph(){return this._graph}get opsets(){return this._opsets}}});var ca,sy=k(()=>{"use strict";ey();ty();Ct();ay();ca=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=mi.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,n,t){await this.profiler.event("session","Session.loadModel",async()=>{let o=await Jl(this.backendHint);if(this.sessionHandler=o.createSessionHandler(this.context),this._model=new la,typeof e=="string"){let i=e.endsWith(".ort");{let s=await(await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(s),i)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let i=new Uint8Array(e,n||0,t||e.byteLength);this.initialize(i)}})}initialize(e,n){if(this._initialized)throw new Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let t=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,t,n),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new sa(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw new Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let n=this.normalizeAndValidateInputs(e),t=await this._executionPlan.execute(this.sessionHandler,n);return this.createOutput(t)})}normalizeAndValidateInputs(e){let n=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==n.length)throw new Error(`incorrect input array length: expected ${n.length} but got ${e.length}`)}else{if(e.size!==n.length)throw new Error(`incorrect input map size: expected ${n.length} but got ${e.size}`);let t=new Array(e.size),o=0;for(let i=0;i<n.length;++i){let a=e.get(n[i]);if(!a)throw new Error(`missing input tensor for: '${name}'`);t[o++]=a}e=t}if(!this.context.graphInputTypes||this.context.graphInputTypes.length===0||!this.context.graphInputDims||this.context.graphInputDims.length===0){let t=this._model.graph.getInputIndices(),o=this._model.graph.getValues(),i=new Array(t.length);for(let a=0;a<t.length;++a){let s=o[t[a]];i[a]=s.type.shape.dims,this.context.graphInputTypes.push(s.type.tensorType),this.context.graphInputDims.push(e[a].dims)}this.validateInputTensorDims(i,e,!0)}else this.validateInputTensorDims(this.context.graphInputDims,e,!1);return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,n){for(let t=0;t<n.length;t++){let o=e[t],i=n[t].type;if(o!==i)throw new Error(`input tensor[${t}] check failed: expected type '${o}' but got ${i}`)}}validateInputTensorDims(e,n,t){for(let o=0;o<n.length;o++){let i=e[o],a=n[o].dims;if(!this.compareTensorDims(i,a,t))throw new Error(`input tensor[${o}] check failed: expected shape '[${i.join(",")}]' but got [${a.join(",")}]`)}}compareTensorDims(e,n,t){if(e.length!==n.length)return!1;for(let o=0;o<e.length;++o)if(e[o]!==n[o]&&(!t||e[o]!==0))return!1;return!0}createOutput(e){let n=this._model.graph.getOutputNames();if(e.length!==n.length)throw new Error("expected number of outputs do not match number of generated outputs");let t=new Map;for(let o=0;o<n.length;++o)t.set(n[o],e[o]);return t}initializeOps(e){let n=e.getNodes();this._ops=new Array(n.length);for(let t=0;t<n.length;t++)this._ops[t]=this.sessionHandler.resolve(n[t],this._model.opsets,e)}}});var da,uy=k(()=>{"use strict";pt();zr();da=class{constructor(e){this.session=e;this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}get inputMetadata(){throw new Error("Getting model metadata is not supported in webgl backend.")}get outputMetadata(){throw new Error("Getting model metadata is not supported in webgl backend.")}async dispose(){}async run(e,n,t){let o=new Map;for(let s in e)if(Object.hasOwnProperty.call(e,s)){let u=e[s];o.set(s,new nt(u.dims,u.type,void 0,void 0,u.data))}let i=await this.session.run(o),a={};return i.forEach((s,u)=>{a[u]=new St(s.type,s.data,s.dims)}),a}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}});var ly={};$r(ly,{onnxjsBackend:()=>OO});var nc,OO,cy=k(()=>{"use strict";sy();uy();nc=class{async init(){}async createInferenceSessionHandler(e,n){let t=new ca(n);return typeof e=="string"?await t.loadModel(e):await t.loadModel(e),new da(t)}},OO=new nc});var pa=k(()=>{"use strict"});var fy={};$r(fy,{default:()=>PO});var dy,py,PO,hy=k(()=>{"use strict";rc();yr();fa();dy="ort-wasm-proxy-worker",py=globalThis.self?.name===dy;py&&(self.onmessage=r=>{let{type:e,in:n}=r.data;try{switch(e){case"init-wasm":ha(n.wasm).then(()=>{ma(n).then(()=>{postMessage({type:e})},t=>{postMessage({type:e,err:t})})},t=>{postMessage({type:e,err:t})});break;case"init-ep":{let{epName:t,env:o}=n;ga(o,t).then(()=>{postMessage({type:e})},i=>{postMessage({type:e,err:i})});break}case"copy-from":{let{buffer:t}=n,o=Fo(t);postMessage({type:e,out:o});break}case"create":{let{model:t,options:o}=n;ba(t,o).then(i=>{postMessage({type:e,out:i})},i=>{postMessage({type:e,err:i})});break}case"release":ya(n),postMessage({type:e});break;case"run":{let{sessionId:t,inputIndices:o,inputs:i,outputIndices:a,options:s}=n;_a(t,o,i,a,new Array(a.length).fill(null),s).then(u=>{u.some(l=>l[3]!=="cpu")?postMessage({type:e,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:e,out:u},wa([...i,...u]))},u=>{postMessage({type:e,err:u})});break}case"end-profiling":va(n),postMessage({type:e});break;default:}}catch(t){postMessage({type:e,err:t})}});PO=py?null:r=>new Worker(r??Ot,{type:"module",name:dy})});var gy={};$r(gy,{default:()=>EO});var my,EO,CO,by=k(()=>{"use strict";my=async function(r={}){var e,n,t=r,o=new Promise((c,p)=>{e=c,n=p}),i=typeof window=="object",a=typeof WorkerGlobalScope<"u",s=a&&self.name?.startsWith("em-pthread");t.mountExternalData=(c,p)=>{c.startsWith("./")&&(c=c.substring(2)),(t.Fb||(t.Fb=new Map)).set(c,p)},t.unmountExternalData=()=>{delete t.Fb};var u=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,qc:!0}).buffer.constructor;let l=c=>async(...p)=>{try{if(t.Gb)throw Error("Session already started");let m=t.Gb={ec:p[0],errors:[]},y=await c(...p);if(t.Gb!==m)throw Error("Session mismatch");t.Kb?.flush();let w=m.errors;if(0<w.length){let A=await Promise.all(w);if(A=A.filter(D=>D),0<A.length)throw Error(A.join(`
`))}return y}finally{t.Gb=null}};t.jsepInit=(c,p)=>{if(c==="webgpu"){[t.Kb,t.Vb,t.Zb,t.Lb,t.Yb,t.Ab,t.$b,t.bc,t.Wb,t.Xb,t.ac]=p;let m=t.Kb;t.jsepRegisterBuffer=(y,w,A,D)=>m.registerBuffer(y,w,A,D),t.jsepGetBuffer=y=>m.getBuffer(y),t.jsepCreateDownloader=(y,w,A)=>m.createDownloader(y,w,A),t.jsepOnCreateSession=y=>{m.onCreateSession(y)},t.jsepOnReleaseSession=y=>{m.onReleaseSession(y)},t.jsepOnRunStart=y=>m.onRunStart(y),t.cc=(y,w)=>{m.upload(y,w)}}else if(c==="webnn"){let m=p[0];[t.oc,t.Ob,t.webnnEnsureTensor,t.Pb,t.webnnDownloadTensor,t.nc,t.webnnEnableTraceEvent]=p.slice(1),t.webnnReleaseTensorId=t.Ob,t.webnnUploadTensor=t.Pb,t.webnnRegisterMLContext=t.nc,t.webnnOnRunStart=y=>m.onRunStart(y),t.webnnOnRunEnd=m.onRunEnd.bind(m),t.webnnOnReleaseSession=y=>{m.onReleaseSession(y)},t.webnnCreateMLTensorDownloader=(y,w)=>m.createMLTensorDownloader(y,w),t.webnnRegisterMLTensor=(y,w,A,D)=>m.registerMLTensor(y,w,A,D),t.webnnCreateMLContext=y=>m.createMLContext(y),t.webnnRegisterMLConstant=(y,w,A,D,M,V)=>m.registerMLConstant(y,w,A,D,M,t.Fb,V),t.webnnRegisterGraphInput=m.registerGraphInput.bind(m),t.webnnIsGraphInput=m.isGraphInput.bind(m),t.webnnRegisterGraphOutput=m.registerGraphOutput.bind(m),t.webnnIsGraphOutput=m.isGraphOutput.bind(m),t.webnnCreateTemporaryTensor=m.createTemporaryTensor.bind(m),t.webnnIsGraphInputOutputTypeSupported=m.isGraphInputOutputTypeSupported.bind(m)}};let d=()=>{let c=(p,m,y)=>(...w)=>{let A=Qt,D=m?.();w=p(...w);let M=m?.();return D!==M&&(p=M,y(D),m=y=null),Qt!=A?new Promise((V,H)=>{bs={resolve:V,reject:H}}):w};(()=>{for(let p of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[p]=c(t[p],()=>t[p],m=>t[p]=m)})(),l!==void 0&&(t._OrtRun=l(t._OrtRun),t._OrtRunWithBinding=l(t._OrtRunWithBinding)),d=void 0};t.asyncInit=()=>{d?.()};var f,h,g=(c,p)=>{throw p},b=import.meta.url,_="";if(i||a){try{_=new URL(".",b).href}catch{}a&&(h=c=>{var p=new XMLHttpRequest;return p.open("GET",c,!1),p.responseType="arraybuffer",p.send(null),new Uint8Array(p.response)}),f=async c=>{if(Te(c))return new Promise((m,y)=>{var w=new XMLHttpRequest;w.open("GET",c,!0),w.responseType="arraybuffer",w.onload=()=>{w.status==200||w.status==0&&w.response?m(w.response):y(w.status)},w.onerror=y,w.send(null)});var p=await fetch(c,{credentials:"same-origin"});if(p.ok)return p.arrayBuffer();throw Error(p.status+" : "+p.url)}}var T,v,x,I,$,O,E,L,R,F,q,Z,re,pe,K,Oe=console.log.bind(console),fe=console.error.bind(console),J=Oe,he=fe,ee=!1,Te=c=>c.startsWith("file://");function Ze(){return v.buffer!=$.buffer&&Pe(),$}function Se(){return v.buffer!=$.buffer&&Pe(),O}function ae(){return v.buffer!=$.buffer&&Pe(),E}function U(){return v.buffer!=$.buffer&&Pe(),L}function z(){return v.buffer!=$.buffer&&Pe(),R}function ie(){return v.buffer!=$.buffer&&Pe(),F}function ct(){return v.buffer!=$.buffer&&Pe(),q}function st(){return v.buffer!=$.buffer&&Pe(),pe}if(s){let c=function(p){try{var m=p.data,y=m.Db;if(y==="load"){let w=[];self.onmessage=A=>w.push(A),self.startWorker=()=>{postMessage({Db:"loaded"});for(let A of w)c(A);self.onmessage=c};for(let A of m.Sb)t[A]&&!t[A].proxy||(t[A]=(...D)=>{postMessage({Db:"callHandler",Rb:A,args:D})},A=="print"&&(J=t[A]),A=="printErr"&&(he=t[A]));v=m.kc,Pe(),K(m.lc)}else if(y==="run"){sx(m.Bb),Ts(m.Bb,0,0,1,0,0),Qc(),ms(m.Bb),je||(Hd(),je=!0);try{ux(m.hc,m.Jb)}catch(w){if(w!="unwind")throw w}}else m.target!=="setimmediate"&&(y==="checkMailbox"?je&&Zo():y&&(he(`worker: received unknown command ${y}`),he(m)))}catch(w){throw jd(),w}};var oC=c,je=!1;self.onunhandledrejection=p=>{throw p.reason||p},self.onmessage=c}function Pe(){var c=v.buffer;t.HEAP8=$=new Int8Array(c),E=new Int16Array(c),t.HEAPU8=O=new Uint8Array(c),L=new Uint16Array(c),t.HEAP32=R=new Int32Array(c),t.HEAPU32=F=new Uint32Array(c),q=new Float32Array(c),pe=new Float64Array(c),Z=new BigInt64Array(c),re=new BigUint64Array(c)}function Vt(){s?startWorker(t):B.Da()}var er,tr=0,Kr=null;function jc(){if(--tr==0&&Kr){var c=Kr;Kr=null,c()}}function nr(c){throw he(c="Aborted("+c+")"),ee=!0,c=new WebAssembly.RuntimeError(c+". Build with -sASSERTIONS for more info."),n(c),c}function qc(){return{a:{L:AT,Aa:$T,b:cx,$:rd,A:ad,pa:sd,X:ud,Z:ld,qa:cd,na:dd,ga:pd,ma:fd,J:hd,Y:md,V:gd,oa:bd,W:yd,va:dx,E:fx,Q:hx,O:gx,D:yx,v:_x,s:vx,P:wx,z:Ox,R:Px,ja:Ex,T:Cx,aa:Dx,M:kx,F:Nx,ia:ms,sa:Lx,r:Rx,Ca:zx,w:Fx,o:Vx,m:Ux,c:ds,Ba:Wx,n:Hx,j:Kx,u:Xx,p:Zx,f:Jx,t:Yx,l:Qx,e:eT,k:tT,h:nT,g:rT,d:oT,da:iT,ea:aT,fa:sT,ba:Cd,ca:Dd,N:kd,xa:lT,ua:pT,i:fT,C:hT,G:mT,ta:cT,x:gT,ra:bT,U:yT,q:uT,y:_T,K:vT,S:wT,za:xT,ya:TT,ka:zd,la:Md,_:ss,B:Bd,I:Fd,ha:Vd,H:Gd,a:v,wa:as}}}class os{name="ExitStatus";constructor(p){this.message=`Program terminated with exit(${p})`,this.status=p}}var Kc=c=>{c.terminate(),c.onmessage=()=>{}},is=[],Xc=c=>{or.length==0&&(td(),ed(or[0]));var p=or.pop();if(!p)return 6;bo.push(p),Tr[c.Bb]=p,p.Bb=c.Bb;var m={Db:"run",hc:c.fc,Jb:c.Jb,Bb:c.Bb};return p.postMessage(m,c.Nb),0},rr=0,He=(c,p,...m)=>{for(var y=2*m.length,w=$s(),A=Ss(8*y),D=A>>>3,M=0;M<m.length;M++){var V=m[M];typeof V=="bigint"?(Z[D+2*M]=1n,Z[D+2*M+1]=V):(Z[D+2*M]=0n,st()[D+2*M+1>>>0]=V)}return c=qd(c,0,y,A,p),ii(w),c};function as(c){if(s)return He(0,1,c);if(I=c,!(0<rr)){for(var p of bo)Kc(p);for(p of or)Kc(p);or=[],bo=[],Tr={},ee=!0}g(0,new os(c))}function Zc(c){if(s)return He(1,0,c);ss(c)}var ss=c=>{if(I=c,s)throw Zc(c),"unwind";as(c)},or=[],bo=[],Jc=[],Tr={},Yc=c=>{var p=c.Bb;delete Tr[p],or.push(c),bo.splice(bo.indexOf(c),1),c.Bb=0,Kd(p)};function Qc(){Jc.forEach(c=>c())}var ed=c=>new Promise(p=>{c.onmessage=w=>{var A=(w=w.data).Db;if(w.Hb&&w.Hb!=xs()){var D=Tr[w.Hb];D?D.postMessage(w,w.Nb):he(`Internal error! Worker sent a message "${A}" to target pthread ${w.Hb}, but that thread no longer exists!`)}else A==="checkMailbox"?Zo():A==="spawnThread"?Xc(w):A==="cleanupThread"?Yc(Tr[w.ic]):A==="loaded"?(c.loaded=!0,p(c)):w.target==="setimmediate"?c.postMessage(w):A==="callHandler"?t[w.Rb](...w.args):A&&he(`worker sent an unknown command ${A}`)},c.onerror=w=>{throw he(`worker sent an error! ${w.filename}:${w.lineno}: ${w.message}`),w};var m,y=[];for(m of[])t.propertyIsEnumerable(m)&&y.push(m);c.postMessage({Db:"load",Sb:y,kc:v,lc:x})});function td(){var c=new Worker((()=>{let p=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new p("ort.all.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});or.push(c)}var sx=c=>{Pe();var p=ie()[c+52>>>2>>>0];c=ie()[c+56>>>2>>>0],Jd(p,p-c),ii(p)},ux=(c,p)=>{rr=0,c=Yd(c,p),0<rr?I=c:Is(c)};class lx{constructor(p){this.Ib=p-24}}function cx(c,p,m){var y=new lx(c>>>=0);throw p>>>=0,m>>>=0,ie()[y.Ib+16>>>2>>>0]=0,ie()[y.Ib+4>>>2>>>0]=p,ie()[y.Ib+8>>>2>>>0]=m,c}function nd(c,p,m,y){return s?He(2,1,c,p,m,y):rd(c,p,m,y)}function rd(c,p,m,y){if(c>>>=0,m>>>=0,y>>>=0,u===void 0)return 6;var w=[];return s&&w.length===0?nd(c,p>>>=0,m,y):(c={fc:m,Bb:c,Jb:y,Nb:w},s?(c.Db="spawnThread",postMessage(c,w),0):Xc(c))}var od=typeof TextDecoder<"u"?new TextDecoder:void 0,id=(c,p=0,m=NaN)=>{var y=(p>>>=0)+m;for(m=p;c[m]&&!(m>=y);)++m;if(16<m-p&&c.buffer&&od)return od.decode(c.buffer instanceof ArrayBuffer?c.subarray(p,m):c.slice(p,m));for(y="";p<m;){var w=c[p++];if(128&w){var A=63&c[p++];if((224&w)==192)y+=String.fromCharCode((31&w)<<6|A);else{var D=63&c[p++];65536>(w=(240&w)==224?(15&w)<<12|A<<6|D:(7&w)<<18|A<<12|D<<6|63&c[p++])?y+=String.fromCharCode(w):(w-=65536,y+=String.fromCharCode(55296|w>>10,56320|1023&w))}}else y+=String.fromCharCode(w)}return y},Je=(c,p)=>(c>>>=0)?id(Se(),c,p):"";function ad(c,p,m){return s?He(3,1,c,p,m):0}function sd(c,p){if(s)return He(4,1,c,p)}function ud(c,p){if(s)return He(5,1,c,p)}function ld(c,p,m){if(s)return He(6,1,c,p,m)}function cd(c,p,m){return s?He(7,1,c,p,m):0}function dd(c,p){if(s)return He(8,1,c,p)}function pd(c,p,m){if(s)return He(9,1,c,p,m)}function fd(c,p,m,y){if(s)return He(10,1,c,p,m,y)}function hd(c,p,m,y){if(s)return He(11,1,c,p,m,y)}function md(c,p,m,y){if(s)return He(12,1,c,p,m,y)}function gd(c){if(s)return He(13,1,c)}function bd(c,p){if(s)return He(14,1,c,p)}function yd(c,p,m){if(s)return He(15,1,c,p,m)}var _d,dx=()=>nr(""),Yt=c=>{for(var p="";Se()[c>>>0];)p+=_d[Se()[c++>>>0]];return p},us={},ls={},px={},Xr=t.BindingError=class extends Error{constructor(c){super(c),this.name="BindingError"}};function jn(c,p,m={}){return function(y,w,A={}){var D=w.name;if(!y)throw new Xr(`type "${D}" must have a positive integer typeid pointer`);if(ls.hasOwnProperty(y)){if(A.Tb)return;throw new Xr(`Cannot register type '${D}' twice`)}ls[y]=w,delete px[y],us.hasOwnProperty(y)&&(w=us[y],delete us[y],w.forEach(M=>M()))}(c,p,m)}var vd=(c,p,m)=>{switch(p){case 1:return m?y=>Ze()[y>>>0]:y=>Se()[y>>>0];case 2:return m?y=>ae()[y>>>1>>>0]:y=>U()[y>>>1>>>0];case 4:return m?y=>z()[y>>>2>>>0]:y=>ie()[y>>>2>>>0];case 8:return m?y=>Z[y>>>3]:y=>re[y>>>3];default:throw new TypeError(`invalid integer width (${p}): ${c}`)}};function fx(c,p,m){m>>>=0,jn(c>>>=0,{name:p=Yt(p>>>0),fromWireType:y=>y,toWireType:function(y,w){if(typeof w!="bigint"&&typeof w!="number")throw w=w===null?"null":(y=typeof w)=="object"||y==="array"||y==="function"?w.toString():""+w,new TypeError(`Cannot convert "${w}" to ${this.name}`);return typeof w=="number"&&(w=BigInt(w)),w},Cb:ir,readValueFromPointer:vd(p,m,p.indexOf("u")==-1),Eb:null})}var ir=8;function hx(c,p,m,y){jn(c>>>=0,{name:p=Yt(p>>>0),fromWireType:function(w){return!!w},toWireType:function(w,A){return A?m:y},Cb:ir,readValueFromPointer:function(w){return this.fromWireType(Se()[w>>>0])},Eb:null})}var cs=[],qn=[];function ds(c){9<(c>>>=0)&&--qn[c+1]==0&&(qn[c]=void 0,cs.push(c))}var mt=c=>{if(!c)throw new Xr(`Cannot use deleted val. handle = ${c}`);return qn[c]},Et=c=>{switch(c){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let p=cs.pop()||qn.length;return qn[p]=c,qn[p+1]=1,p}};function ps(c){return this.fromWireType(ie()[c>>>2>>>0])}var mx={name:"emscripten::val",fromWireType:c=>{var p=mt(c);return ds(c),p},toWireType:(c,p)=>Et(p),Cb:ir,readValueFromPointer:ps,Eb:null};function gx(c){return jn(c>>>0,mx)}var bx=(c,p)=>{switch(p){case 4:return function(m){return this.fromWireType(ct()[m>>>2>>>0])};case 8:return function(m){return this.fromWireType(st()[m>>>3>>>0])};default:throw new TypeError(`invalid float width (${p}): ${c}`)}};function yx(c,p,m){m>>>=0,jn(c>>>=0,{name:p=Yt(p>>>0),fromWireType:y=>y,toWireType:(y,w)=>w,Cb:ir,readValueFromPointer:bx(p,m),Eb:null})}function _x(c,p,m,y,w){if(c>>>=0,m>>>=0,p=Yt(p>>>0),w===-1&&(w=4294967295),w=M=>M,y===0){var A=32-8*m;w=M=>M<<A>>>A}var D=p.includes("unsigned")?function(M,V){return V>>>0}:function(M,V){return V};jn(c,{name:p,fromWireType:w,toWireType:D,Cb:ir,readValueFromPointer:vd(p,m,y!==0),Eb:null})}function vx(c,p,m){function y(A){var D=ie()[A>>>2>>>0];return A=ie()[A+4>>>2>>>0],new w(Ze().buffer,A,D)}var w=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][p];jn(c>>>=0,{name:m=Yt(m>>>0),fromWireType:y,Cb:ir,readValueFromPointer:y},{Tb:!0})}var Ir=(c,p,m)=>{var y=Se();if(p>>>=0,0<m){var w=p;m=p+m-1;for(var A=0;A<c.length;++A){var D=c.charCodeAt(A);if(55296<=D&&57343>=D&&(D=65536+((1023&D)<<10)|1023&c.charCodeAt(++A)),127>=D){if(p>=m)break;y[p++>>>0]=D}else{if(2047>=D){if(p+1>=m)break;y[p++>>>0]=192|D>>6}else{if(65535>=D){if(p+2>=m)break;y[p++>>>0]=224|D>>12}else{if(p+3>=m)break;y[p++>>>0]=240|D>>18,y[p++>>>0]=128|D>>12&63}y[p++>>>0]=128|D>>6&63}y[p++>>>0]=128|63&D}}y[p>>>0]=0,c=p-w}else c=0;return c},fs=c=>{for(var p=0,m=0;m<c.length;++m){var y=c.charCodeAt(m);127>=y?p++:2047>=y?p+=2:55296<=y&&57343>=y?(p+=4,++m):p+=3}return p};function wx(c,p){jn(c>>>=0,{name:p=Yt(p>>>0),fromWireType:function(m){for(var y,w=ie()[m>>>2>>>0],A=m+4,D=A,M=0;M<=w;++M){var V=A+M;M!=w&&Se()[V>>>0]!=0||(D=Je(D,V-D),y===void 0?y=D:(y+="\0",y+=D),D=V+1)}return Kn(m),y},toWireType:function(m,y){y instanceof ArrayBuffer&&(y=new Uint8Array(y));var w=typeof y=="string";if(!(w||ArrayBuffer.isView(y)&&y.BYTES_PER_ELEMENT==1))throw new Xr("Cannot pass non-string to std::string");var A=w?fs(y):y.length,D=oi(4+A+1),M=D+4;return ie()[D>>>2>>>0]=A,w?Ir(y,M,A+1):Se().set(y,M>>>0),m!==null&&m.push(Kn,D),D},Cb:ir,readValueFromPointer:ps,Eb(m){Kn(m)}})}var wd=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,xx=(c,p)=>{for(var m=c>>1,y=m+p/2;!(m>=y)&&U()[m>>>0];)++m;if(32<(m<<=1)-c&&wd)return wd.decode(Se().slice(c,m));for(m="",y=0;!(y>=p/2);++y){var w=ae()[c+2*y>>>1>>>0];if(w==0)break;m+=String.fromCharCode(w)}return m},Tx=(c,p,m)=>{if(m??=2147483647,2>m)return 0;var y=p;m=(m-=2)<2*c.length?m/2:c.length;for(var w=0;w<m;++w){var A=c.charCodeAt(w);ae()[p>>>1>>>0]=A,p+=2}return ae()[p>>>1>>>0]=0,p-y},Ix=c=>2*c.length,Sx=(c,p)=>{for(var m=0,y="";!(m>=p/4);){var w=z()[c+4*m>>>2>>>0];if(w==0)break;++m,65536<=w?(w-=65536,y+=String.fromCharCode(55296|w>>10,56320|1023&w)):y+=String.fromCharCode(w)}return y},$x=(c,p,m)=>{if(p>>>=0,m??=2147483647,4>m)return 0;var y=p;m=y+m-4;for(var w=0;w<c.length;++w){var A=c.charCodeAt(w);if(55296<=A&&57343>=A&&(A=65536+((1023&A)<<10)|1023&c.charCodeAt(++w)),z()[p>>>2>>>0]=A,(p+=4)+4>m)break}return z()[p>>>2>>>0]=0,p-y},Ax=c=>{for(var p=0,m=0;m<c.length;++m){var y=c.charCodeAt(m);55296<=y&&57343>=y&&++m,p+=4}return p};function Ox(c,p,m){if(c>>>=0,p>>>=0,m=Yt(m>>>=0),p===2)var y=xx,w=Tx,A=Ix,D=M=>U()[M>>>1>>>0];else p===4&&(y=Sx,w=$x,A=Ax,D=M=>ie()[M>>>2>>>0]);jn(c,{name:m,fromWireType:M=>{for(var V,H=ie()[M>>>2>>>0],te=M+4,de=0;de<=H;++de){var we=M+4+de*p;de!=H&&D(we)!=0||(te=y(te,we-te),V===void 0?V=te:(V+="\0",V+=te),te=we+p)}return Kn(M),V},toWireType:(M,V)=>{if(typeof V!="string")throw new Xr(`Cannot pass non-string to C++ string type ${m}`);var H=A(V),te=oi(4+H+p);return ie()[te>>>2>>>0]=H/p,w(V,te+4,H+p),M!==null&&M.push(Kn,te),te},Cb:ir,readValueFromPointer:ps,Eb(M){Kn(M)}})}function Px(c,p){jn(c>>>=0,{Ub:!0,name:p=Yt(p>>>0),Cb:0,fromWireType:()=>{},toWireType:()=>{}})}function Ex(c){Ts(c>>>0,!a,1,!i,131072,!1),Qc()}var hs=c=>{if(!ee)try{if(c(),!(0<rr))try{s?Is(I):ss(I)}catch(p){p instanceof os||p=="unwind"||g(0,p)}}catch(p){p instanceof os||p=="unwind"||g(0,p)}};function ms(c){c>>>=0,typeof Atomics.jc=="function"&&(Atomics.jc(z(),c>>>2,c).value.then(Zo),c+=128,Atomics.store(z(),c>>>2,1))}var Zo=()=>{var c=xs();c&&(ms(c),hs(Zd))};function Cx(c,p){(c>>>=0)==p>>>0?setTimeout(Zo):s?postMessage({Hb:c,Db:"checkMailbox"}):(c=Tr[c])&&c.postMessage({Db:"checkMailbox"})}var gs=[];function Dx(c,p,m,y,w){for(p>>>=0,y/=2,gs.length=y,m=w>>>0>>>3,w=0;w<y;w++)gs[w]=Z[m+2*w]?Z[m+2*w+1]:st()[m+2*w+1>>>0];return(p?ws[p]:ST[c])(...gs)}var kx=()=>{rr=0};function Nx(c){c>>>=0,s?postMessage({Db:"cleanupThread",ic:c}):Yc(Tr[c])}function Lx(c){}var Jo=(c,p)=>{var m=ls[c];if(m===void 0)throw c=Wd(c),m=Yt(c),Kn(c),new Xr(`${p} has unknown type ${m}`);return m},xd=(c,p,m)=>{var y=[];return c=c.toWireType(y,m),y.length&&(ie()[p>>>2>>>0]=Et(y)),c};function Rx(c,p,m){return p>>>=0,m>>>=0,c=mt(c>>>0),p=Jo(p,"emval::as"),xd(p,m,c)}function zx(c,p){return p>>>=0,c=mt(c>>>0),(p=Jo(p,"emval::as")).toWireType(null,c)}var Yo=c=>{try{c()}catch(p){nr(p)}},ar=0,Qt=null,Td=0,Qo=[],Id={},Sd={},Mx=0,bs=null,Bx=[];function $d(c){return function(p){if(!ee){if(ar===0){var m=!1,y=!1;p((w=0)=>{if(!ee&&(Td=w,m=!0,y)){ar=2,Yo(()=>tp(Qt)),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.resume(),w=!1;try{var A=function(){var V=z()[Qt+8>>>2>>>0];return V=B[Sd[V]],--rr,V()}()}catch(V){A=V,w=!0}var D=!1;if(!Qt){var M=bs;M&&(bs=null,(w?M.reject:M.resolve)(A),D=!0)}if(w&&!D)throw A}}),y=!0,m||(ar=1,Qt=function(){var w=oi(65548),A=w+12;ie()[w>>>2>>>0]=A,ie()[w+4>>>2>>>0]=A+65536,A=Qo[0];var D=Id[A];return D===void 0&&(D=Mx++,Id[A]=D,Sd[D]=A),A=D,z()[w+8>>>2>>>0]=A,w}(),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.pause(),Yo(()=>Qd(Qt)))}else ar===2?(ar=0,Yo(np),Kn(Qt),Qt=null,Bx.forEach(hs)):nr(`invalid state: ${ar}`);return Td}}(p=>{c().then(p)})}function Fx(c){return c>>>=0,$d(async()=>{var p=await mt(c);return Et(p)})}var ei=[];function Vx(c,p,m,y){return m>>>=0,y>>>=0,(c=ei[c>>>0])(null,p=mt(p>>>0),m,y)}var Gx={},ti=c=>{var p=Gx[c];return p===void 0?Yt(c):p};function Ux(c,p,m,y,w){return m>>>=0,y>>>=0,w>>>=0,(c=ei[c>>>0])(p=mt(p>>>0),p[m=ti(m)],y,w)}function Wx(c,p){return p>>>=0,(c=mt(c>>>0))==mt(p)}var Ad=()=>typeof globalThis=="object"?globalThis:Function("return this")();function Hx(c){return(c>>>=0)==0?Et(Ad()):(c=ti(c),Et(Ad()[c]))}var jx=c=>{var p=ei.length;return ei.push(c),p},qx=(c,p)=>{for(var m=Array(c),y=0;y<c;++y)m[y]=Jo(ie()[p+4*y>>>2>>>0],`parameter ${y}`);return m};function Kx(c,p,m){var y=(p=qx(c,p>>>0)).shift();c--;var w=`return function (obj, func, destructorsRef, args) {
`,A=0,D=[];m===0&&D.push("obj");for(var M=["retType"],V=[y],H=0;H<c;++H)D.push(`arg${H}`),M.push(`argType${H}`),V.push(p[H]),w+=`  var arg${H} = argType${H}.readValueFromPointer(args${A?"+"+A:""});
`,A+=p[H].Cb;return w+=`  var rv = ${m===1?"new func":"func.call"}(${D.join(", ")});
`,y.Ub||(M.push("emval_returnValue"),V.push(xd),w+=`  return emval_returnValue(retType, destructorsRef, rv);
`),c=new Function(...M,w+`};
`)(...V),m=`methodCaller<(${p.map(te=>te.name).join(", ")}) => ${y.name}>`,jx(Object.defineProperty(c,"name",{value:m}))}function Xx(c){return c=ti(c>>>0),Et(t[c])}function Zx(c,p){return p>>>=0,c=mt(c>>>0),p=mt(p),Et(c[p])}function Jx(c){9<(c>>>=0)&&(qn[c+1]+=1)}function Yx(){return Et([])}function Qx(c){c=mt(c>>>0);for(var p=Array(c.length),m=0;m<c.length;m++)p[m]=c[m];return Et(p)}function eT(c){return Et(ti(c>>>0))}function tT(){return Et({})}function nT(c){for(var p=mt(c>>>=0);p.length;){var m=p.pop();p.pop()(m)}ds(c)}function rT(c,p,m){p>>>=0,m>>>=0,c=mt(c>>>0),p=mt(p),m=mt(m),c[p]=m}function oT(c,p){return p>>>=0,c=(c=Jo(c>>>0,"_emval_take_value")).readValueFromPointer(p),Et(c)}function iT(c,p){c=-9007199254740992>c||9007199254740992<c?NaN:Number(c),p>>>=0,c=new Date(1e3*c),z()[p>>>2>>>0]=c.getUTCSeconds(),z()[p+4>>>2>>>0]=c.getUTCMinutes(),z()[p+8>>>2>>>0]=c.getUTCHours(),z()[p+12>>>2>>>0]=c.getUTCDate(),z()[p+16>>>2>>>0]=c.getUTCMonth(),z()[p+20>>>2>>>0]=c.getUTCFullYear()-1900,z()[p+24>>>2>>>0]=c.getUTCDay(),c=(c.getTime()-Date.UTC(c.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,z()[p+28>>>2>>>0]=c}var Od=c=>c%4==0&&(c%100!=0||c%400==0),Pd=[0,31,60,91,121,152,182,213,244,274,305,335],Ed=[0,31,59,90,120,151,181,212,243,273,304,334];function aT(c,p){c=-9007199254740992>c||9007199254740992<c?NaN:Number(c),p>>>=0,c=new Date(1e3*c),z()[p>>>2>>>0]=c.getSeconds(),z()[p+4>>>2>>>0]=c.getMinutes(),z()[p+8>>>2>>>0]=c.getHours(),z()[p+12>>>2>>>0]=c.getDate(),z()[p+16>>>2>>>0]=c.getMonth(),z()[p+20>>>2>>>0]=c.getFullYear()-1900,z()[p+24>>>2>>>0]=c.getDay();var m=(Od(c.getFullYear())?Pd:Ed)[c.getMonth()]+c.getDate()-1|0;z()[p+28>>>2>>>0]=m,z()[p+36>>>2>>>0]=-60*c.getTimezoneOffset(),m=new Date(c.getFullYear(),6,1).getTimezoneOffset();var y=new Date(c.getFullYear(),0,1).getTimezoneOffset();c=0|(m!=y&&c.getTimezoneOffset()==Math.min(y,m)),z()[p+32>>>2>>>0]=c}function sT(c){c>>>=0;var p=new Date(z()[c+20>>>2>>>0]+1900,z()[c+16>>>2>>>0],z()[c+12>>>2>>>0],z()[c+8>>>2>>>0],z()[c+4>>>2>>>0],z()[c>>>2>>>0],0),m=z()[c+32>>>2>>>0],y=p.getTimezoneOffset(),w=new Date(p.getFullYear(),6,1).getTimezoneOffset(),A=new Date(p.getFullYear(),0,1).getTimezoneOffset(),D=Math.min(A,w);return 0>m?z()[c+32>>>2>>>0]=+(w!=A&&D==y):0<m!=(D==y)&&(w=Math.max(A,w),p.setTime(p.getTime()+6e4*((0<m?D:w)-y))),z()[c+24>>>2>>>0]=p.getDay(),m=(Od(p.getFullYear())?Pd:Ed)[p.getMonth()]+p.getDate()-1|0,z()[c+28>>>2>>>0]=m,z()[c>>>2>>>0]=p.getSeconds(),z()[c+4>>>2>>>0]=p.getMinutes(),z()[c+8>>>2>>>0]=p.getHours(),z()[c+12>>>2>>>0]=p.getDate(),z()[c+16>>>2>>>0]=p.getMonth(),z()[c+20>>>2>>>0]=p.getYear(),c=p.getTime(),BigInt(isNaN(c)?-1:c/1e3)}function Cd(c,p,m,y,w,A,D){return s?He(16,1,c,p,m,y,w,A,D):-52}function Dd(c,p,m,y,w,A){if(s)return He(17,1,c,p,m,y,w,A)}var yo={},uT=()=>performance.timeOrigin+performance.now();function kd(c,p){if(s)return He(18,1,c,p);if(yo[c]&&(clearTimeout(yo[c].id),delete yo[c]),!p)return 0;var m=setTimeout(()=>{delete yo[c],hs(()=>Xd(c,performance.timeOrigin+performance.now()))},p);return yo[c]={id:m,rc:p},0}function lT(c,p,m,y){c>>>=0,p>>>=0,m>>>=0,y>>>=0;var w=new Date().getFullYear(),A=new Date(w,0,1).getTimezoneOffset();w=new Date(w,6,1).getTimezoneOffset();var D=Math.max(A,w);ie()[c>>>2>>>0]=60*D,z()[p>>>2>>>0]=+(A!=w),c=(p=M=>{var V=Math.abs(M);return`UTC${0<=M?"-":"+"}${String(Math.floor(V/60)).padStart(2,"0")}${String(V%60).padStart(2,"0")}`})(A),p=p(w),w<A?(Ir(c,m,17),Ir(p,y,17)):(Ir(c,y,17),Ir(p,m,17))}var cT=()=>Date.now(),dT=1;function pT(c,p,m){if(!(0<=c&&3>=c))return 28;if(c===0)c=Date.now();else{if(!dT)return 52;c=performance.timeOrigin+performance.now()}return Z[m>>>0>>>3]=BigInt(Math.round(1e6*c)),0}var ys=[],Nd=(c,p)=>{ys.length=0;for(var m;m=Se()[c++>>>0];){var y=m!=105;p+=(y&=m!=112)&&p%8?4:0,ys.push(m==112?ie()[p>>>2>>>0]:m==106?Z[p>>>3]:m==105?z()[p>>>2>>>0]:st()[p>>>3>>>0]),p+=y?8:4}return ys};function fT(c,p,m){return c>>>=0,p=Nd(p>>>0,m>>>0),ws[c](...p)}function hT(c,p,m){return c>>>=0,p=Nd(p>>>0,m>>>0),ws[c](...p)}var mT=()=>{};function gT(c,p){return he(Je(c>>>0,p>>>0))}var bT=()=>{throw rr+=1,"unwind"};function yT(){return 4294901760}var _T=()=>navigator.hardwareConcurrency;function vT(){return nr("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function wT(c){c>>>=0;var p=Se().length;if(c<=p||4294901760<c)return!1;for(var m=1;4>=m;m*=2){var y=p*(1+.2/m);y=Math.min(y,c+100663296);e:{y=(Math.min(4294901760,65536*Math.ceil(Math.max(c,y)/65536))-v.buffer.byteLength+65535)/65536|0;try{v.grow(y),Pe();var w=1;break e}catch{}w=void 0}if(w)return!0}return!1}var ni=()=>(nr("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Zr={},Ld=c=>{c.forEach(p=>{var m=ni();m&&(Zr[m]=p)})};function xT(){var c=Error().stack.toString().split(`
`);return c[0]=="Error"&&c.shift(),Ld(c),Zr.Mb=ni(),Zr.dc=c,Zr.Mb}function TT(c,p,m){if(c>>>=0,p>>>=0,Zr.Mb==c)var y=Zr.dc;else(y=Error().stack.toString().split(`
`))[0]=="Error"&&y.shift(),Ld(y);for(var w=3;y[w]&&ni()!=c;)++w;for(c=0;c<m&&y[c+w];++c)z()[p+4*c>>>2>>>0]=ni();return c}var _s,vs={},Rd=()=>{if(!_s){var c,p={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(c in vs)vs[c]===void 0?delete p[c]:p[c]=vs[c];var m=[];for(c in p)m.push(`${c}=${p[c]}`);_s=m}return _s};function zd(c,p){if(s)return He(19,1,c,p);c>>>=0,p>>>=0;var m,y=0,w=0;for(m of Rd()){var A=p+y;ie()[c+w>>>2>>>0]=A,y+=Ir(m,A,1/0)+1,w+=4}return 0}function Md(c,p){if(s)return He(20,1,c,p);c>>>=0,p>>>=0;var m=Rd();for(var y of(ie()[c>>>2>>>0]=m.length,c=0,m))c+=fs(y)+1;return ie()[p>>>2>>>0]=c,0}function Bd(c){return s?He(21,1,c):52}function Fd(c,p,m,y){return s?He(22,1,c,p,m,y):52}function Vd(c,p,m,y){return s?He(23,1,c,p,m,y):70}var IT=[null,[],[]];function Gd(c,p,m,y){if(s)return He(24,1,c,p,m,y);p>>>=0,m>>>=0,y>>>=0;for(var w=0,A=0;A<m;A++){var D=ie()[p>>>2>>>0],M=ie()[p+4>>>2>>>0];p+=8;for(var V=0;V<M;V++){var H=c,te=Se()[D+V>>>0],de=IT[H];te===0||te===10?((H===1?J:he)(id(de)),de.length=0):de.push(te)}w+=M}return ie()[y>>>2>>>0]=w,0}s||function(){for(var c=t.numThreads-1;c--;)td();is.push(()=>{tr++,function(p){s?p():Promise.all(or.map(ed)).then(p)}(()=>jc())})}();for(var Ud=Array(256),ri=0;256>ri;++ri)Ud[ri]=String.fromCharCode(ri);_d=Ud,qn.push(0,1,void 0,1,null,1,!0,1,!1,1),t.count_emval_handles=()=>qn.length/2-5-cs.length,s||(v=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),Pe()),t.wasmBinary&&(T=t.wasmBinary),t.stackSave=()=>$s(),t.stackRestore=c=>ii(c),t.stackAlloc=c=>Ss(c),t.setValue=function(c,p,m="i8"){switch(m.endsWith("*")&&(m="*"),m){case"i1":case"i8":Ze()[c>>>0]=p;break;case"i16":ae()[c>>>1>>>0]=p;break;case"i32":z()[c>>>2>>>0]=p;break;case"i64":Z[c>>>3]=BigInt(p);break;case"float":ct()[c>>>2>>>0]=p;break;case"double":st()[c>>>3>>>0]=p;break;case"*":ie()[c>>>2>>>0]=p;break;default:nr(`invalid type for setValue: ${m}`)}},t.getValue=function(c,p="i8"){switch(p.endsWith("*")&&(p="*"),p){case"i1":case"i8":return Ze()[c>>>0];case"i16":return ae()[c>>>1>>>0];case"i32":return z()[c>>>2>>>0];case"i64":return Z[c>>>3];case"float":return ct()[c>>>2>>>0];case"double":return st()[c>>>3>>>0];case"*":return ie()[c>>>2>>>0];default:nr(`invalid type for getValue: ${p}`)}},t.UTF8ToString=Je,t.stringToUTF8=Ir,t.lengthBytesUTF8=fs;var ST=[as,Zc,nd,ad,sd,ud,ld,cd,dd,pd,fd,hd,md,gd,bd,yd,Cd,Dd,kd,zd,Md,Bd,Fd,Vd,Gd],ws={892060:(c,p,m,y,w)=>{if(t===void 0||!t.Fb)return 1;if((c=Je(Number(c>>>0))).startsWith("./")&&(c=c.substring(2)),!(c=t.Fb.get(c)))return 2;if(p=Number(p>>>0),m=Number(m>>>0),y=Number(y>>>0),p+m>c.byteLength)return 3;try{let A=c.subarray(p,p+m);switch(w){case 0:Se().set(A,y>>>0);break;case 1:t.mc?t.mc(y,A):t.cc(y,A);break;default:return 4}return 0}catch{return 4}},892884:(c,p,m)=>{t.Pb(c,Se().subarray(p>>>0,p+m>>>0))},892948:()=>t.oc(),892990:c=>{t.Ob(c)},893027:()=>{t.Wb()},893058:()=>{t.Xb()},893087:()=>{t.ac()},893112:c=>t.Vb(c),893145:c=>t.Zb(c),893177:(c,p,m)=>{t.Lb(Number(c),Number(p),Number(m),!0)},893240:(c,p,m)=>{t.Lb(Number(c),Number(p),Number(m))},893297:()=>typeof wasmOffsetConverter<"u",893354:c=>{t.Ab("Abs",c,void 0)},893405:c=>{t.Ab("Neg",c,void 0)},893456:c=>{t.Ab("Floor",c,void 0)},893509:c=>{t.Ab("Ceil",c,void 0)},893561:c=>{t.Ab("Reciprocal",c,void 0)},893619:c=>{t.Ab("Sqrt",c,void 0)},893671:c=>{t.Ab("Exp",c,void 0)},893722:c=>{t.Ab("Erf",c,void 0)},893773:c=>{t.Ab("Sigmoid",c,void 0)},893828:(c,p,m)=>{t.Ab("HardSigmoid",c,{alpha:p,beta:m})},893907:c=>{t.Ab("Log",c,void 0)},893958:c=>{t.Ab("Sin",c,void 0)},894009:c=>{t.Ab("Cos",c,void 0)},894060:c=>{t.Ab("Tan",c,void 0)},894111:c=>{t.Ab("Asin",c,void 0)},894163:c=>{t.Ab("Acos",c,void 0)},894215:c=>{t.Ab("Atan",c,void 0)},894267:c=>{t.Ab("Sinh",c,void 0)},894319:c=>{t.Ab("Cosh",c,void 0)},894371:c=>{t.Ab("Asinh",c,void 0)},894424:c=>{t.Ab("Acosh",c,void 0)},894477:c=>{t.Ab("Atanh",c,void 0)},894530:c=>{t.Ab("Tanh",c,void 0)},894582:c=>{t.Ab("Not",c,void 0)},894633:(c,p,m)=>{t.Ab("Clip",c,{min:p,max:m})},894702:c=>{t.Ab("Clip",c,void 0)},894754:(c,p)=>{t.Ab("Elu",c,{alpha:p})},894812:c=>{t.Ab("Gelu",c,void 0)},894864:c=>{t.Ab("Relu",c,void 0)},894916:(c,p)=>{t.Ab("LeakyRelu",c,{alpha:p})},894980:(c,p)=>{t.Ab("ThresholdedRelu",c,{alpha:p})},895050:(c,p)=>{t.Ab("Cast",c,{to:p})},895108:c=>{t.Ab("Add",c,void 0)},895159:c=>{t.Ab("Sub",c,void 0)},895210:c=>{t.Ab("Mul",c,void 0)},895261:c=>{t.Ab("Div",c,void 0)},895312:c=>{t.Ab("Pow",c,void 0)},895363:c=>{t.Ab("Equal",c,void 0)},895416:c=>{t.Ab("Greater",c,void 0)},895471:c=>{t.Ab("GreaterOrEqual",c,void 0)},895533:c=>{t.Ab("Less",c,void 0)},895585:c=>{t.Ab("LessOrEqual",c,void 0)},895644:(c,p,m,y,w)=>{t.Ab("ReduceMean",c,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:y?Array.from(z().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},895819:(c,p,m,y,w)=>{t.Ab("ReduceMax",c,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:y?Array.from(z().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},895993:(c,p,m,y,w)=>{t.Ab("ReduceMin",c,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:y?Array.from(z().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},896167:(c,p,m,y,w)=>{t.Ab("ReduceProd",c,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:y?Array.from(z().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},896342:(c,p,m,y,w)=>{t.Ab("ReduceSum",c,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:y?Array.from(z().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},896516:(c,p,m,y,w)=>{t.Ab("ReduceL1",c,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:y?Array.from(z().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},896689:(c,p,m,y,w)=>{t.Ab("ReduceL2",c,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:y?Array.from(z().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},896862:(c,p,m,y,w)=>{t.Ab("ReduceLogSum",c,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:y?Array.from(z().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},897039:(c,p,m,y,w)=>{t.Ab("ReduceSumSquare",c,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:y?Array.from(z().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},897219:(c,p,m,y,w)=>{t.Ab("ReduceLogSumExp",c,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:y?Array.from(z().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},897399:c=>{t.Ab("Where",c,void 0)},897452:(c,p,m)=>{t.Ab("Transpose",c,{perm:p?Array.from(z().subarray(Number(p)>>>0,Number(m)>>>0)):[]})},897576:(c,p,m,y)=>{t.Ab("DepthToSpace",c,{blocksize:p,mode:Je(m),format:y?"NHWC":"NCHW"})},897709:(c,p,m,y)=>{t.Ab("DepthToSpace",c,{blocksize:p,mode:Je(m),format:y?"NHWC":"NCHW"})},897842:(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce,tt)=>{t.Ab("ConvTranspose",c,{format:V?"NHWC":"NCHW",autoPad:p,dilations:[m],group:y,kernelShape:[w],pads:[A,D],strides:[M],wIsConst:()=>!!Ze()[H>>>0],outputPadding:te?Array.from(z().subarray(Number(te)>>>0,Number(de)>>>0)):[],outputShape:we?Array.from(z().subarray(Number(we)>>>0,Number(Ce)>>>0)):[],activation:Je(tt)})},898275:(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce)=>{t.Ab("ConvTranspose",c,{format:M?"NHWC":"NCHW",autoPad:p,dilations:Array.from(z().subarray(Number(m)>>>0,2+(Number(m)>>>0)>>>0)),group:y,kernelShape:Array.from(z().subarray(Number(w)>>>0,2+(Number(w)>>>0)>>>0)),pads:Array.from(z().subarray(Number(A)>>>0,4+(Number(A)>>>0)>>>0)),strides:Array.from(z().subarray(Number(D)>>>0,2+(Number(D)>>>0)>>>0)),wIsConst:()=>!!Ze()[V>>>0],outputPadding:H?Array.from(z().subarray(Number(H)>>>0,Number(te)>>>0)):[],outputShape:de?Array.from(z().subarray(Number(de)>>>0,Number(we)>>>0)):[],activation:Je(Ce)})},898936:(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce,tt)=>{t.Ab("ConvTranspose",c,{format:V?"NHWC":"NCHW",autoPad:p,dilations:[m],group:y,kernelShape:[w],pads:[A,D],strides:[M],wIsConst:()=>!!Ze()[H>>>0],outputPadding:te?Array.from(z().subarray(Number(te)>>>0,Number(de)>>>0)):[],outputShape:we?Array.from(z().subarray(Number(we)>>>0,Number(Ce)>>>0)):[],activation:Je(tt)})},899369:(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce)=>{t.Ab("ConvTranspose",c,{format:M?"NHWC":"NCHW",autoPad:p,dilations:Array.from(z().subarray(Number(m)>>>0,2+(Number(m)>>>0)>>>0)),group:y,kernelShape:Array.from(z().subarray(Number(w)>>>0,2+(Number(w)>>>0)>>>0)),pads:Array.from(z().subarray(Number(A)>>>0,4+(Number(A)>>>0)>>>0)),strides:Array.from(z().subarray(Number(D)>>>0,2+(Number(D)>>>0)>>>0)),wIsConst:()=>!!Ze()[V>>>0],outputPadding:H?Array.from(z().subarray(Number(H)>>>0,Number(te)>>>0)):[],outputShape:de?Array.from(z().subarray(Number(de)>>>0,Number(we)>>>0)):[],activation:Je(Ce)})},900030:(c,p)=>{t.Ab("GlobalAveragePool",c,{format:p?"NHWC":"NCHW"})},900121:(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce)=>{t.Ab("AveragePool",c,{format:Ce?"NHWC":"NCHW",auto_pad:p,ceil_mode:m,count_include_pad:y,storage_order:w,dilations:A?Array.from(z().subarray(Number(A)>>>0,Number(D)>>>0)):[],kernel_shape:M?Array.from(z().subarray(Number(M)>>>0,Number(V)>>>0)):[],pads:H?Array.from(z().subarray(Number(H)>>>0,Number(te)>>>0)):[],strides:de?Array.from(z().subarray(Number(de)>>>0,Number(we)>>>0)):[]})},900600:(c,p)=>{t.Ab("GlobalAveragePool",c,{format:p?"NHWC":"NCHW"})},900691:(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce)=>{t.Ab("AveragePool",c,{format:Ce?"NHWC":"NCHW",auto_pad:p,ceil_mode:m,count_include_pad:y,storage_order:w,dilations:A?Array.from(z().subarray(Number(A)>>>0,Number(D)>>>0)):[],kernel_shape:M?Array.from(z().subarray(Number(M)>>>0,Number(V)>>>0)):[],pads:H?Array.from(z().subarray(Number(H)>>>0,Number(te)>>>0)):[],strides:de?Array.from(z().subarray(Number(de)>>>0,Number(we)>>>0)):[]})},901170:(c,p)=>{t.Ab("GlobalMaxPool",c,{format:p?"NHWC":"NCHW"})},901257:(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce)=>{t.Ab("MaxPool",c,{format:Ce?"NHWC":"NCHW",auto_pad:p,ceil_mode:m,count_include_pad:y,storage_order:w,dilations:A?Array.from(z().subarray(Number(A)>>>0,Number(D)>>>0)):[],kernel_shape:M?Array.from(z().subarray(Number(M)>>>0,Number(V)>>>0)):[],pads:H?Array.from(z().subarray(Number(H)>>>0,Number(te)>>>0)):[],strides:de?Array.from(z().subarray(Number(de)>>>0,Number(we)>>>0)):[]})},901732:(c,p)=>{t.Ab("GlobalMaxPool",c,{format:p?"NHWC":"NCHW"})},901819:(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce)=>{t.Ab("MaxPool",c,{format:Ce?"NHWC":"NCHW",auto_pad:p,ceil_mode:m,count_include_pad:y,storage_order:w,dilations:A?Array.from(z().subarray(Number(A)>>>0,Number(D)>>>0)):[],kernel_shape:M?Array.from(z().subarray(Number(M)>>>0,Number(V)>>>0)):[],pads:H?Array.from(z().subarray(Number(H)>>>0,Number(te)>>>0)):[],strides:de?Array.from(z().subarray(Number(de)>>>0,Number(we)>>>0)):[]})},902294:(c,p,m,y,w)=>{t.Ab("Gemm",c,{alpha:p,beta:m,transA:y,transB:w})},902398:c=>{t.Ab("MatMul",c,void 0)},902452:(c,p,m,y)=>{t.Ab("ArgMax",c,{keepDims:!!p,selectLastIndex:!!m,axis:y})},902560:(c,p,m,y)=>{t.Ab("ArgMin",c,{keepDims:!!p,selectLastIndex:!!m,axis:y})},902668:(c,p)=>{t.Ab("Softmax",c,{axis:p})},902731:(c,p)=>{t.Ab("Concat",c,{axis:p})},902791:(c,p,m,y,w)=>{t.Ab("Split",c,{axis:p,numOutputs:m,splitSizes:y?Array.from(z().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},902947:c=>{t.Ab("Expand",c,void 0)},903001:(c,p)=>{t.Ab("Gather",c,{axis:Number(p)})},903072:(c,p)=>{t.Ab("GatherElements",c,{axis:Number(p)})},903151:(c,p)=>{t.Ab("GatherND",c,{batch_dims:Number(p)})},903230:(c,p,m,y,w,A,D,M,V,H,te)=>{t.Ab("Resize",c,{antialias:p,axes:m?Array.from(z().subarray(Number(m)>>>0,Number(y)>>>0)):[],coordinateTransformMode:Je(w),cubicCoeffA:A,excludeOutside:D,extrapolationValue:M,keepAspectRatioPolicy:Je(V),mode:Je(H),nearestMode:Je(te)})},903592:(c,p,m,y,w,A,D)=>{t.Ab("Slice",c,{starts:p?Array.from(z().subarray(Number(p)>>>0,Number(m)>>>0)):[],ends:y?Array.from(z().subarray(Number(y)>>>0,Number(w)>>>0)):[],axes:A?Array.from(z().subarray(Number(A)>>>0,Number(D)>>>0)):[]})},903856:c=>{t.Ab("Tile",c,void 0)},903908:(c,p,m)=>{t.Ab("InstanceNormalization",c,{epsilon:p,format:m?"NHWC":"NCHW"})},904022:(c,p,m)=>{t.Ab("InstanceNormalization",c,{epsilon:p,format:m?"NHWC":"NCHW"})},904136:c=>{t.Ab("Range",c,void 0)},904189:(c,p)=>{t.Ab("Einsum",c,{equation:Je(p)})},904270:(c,p,m,y,w)=>{t.Ab("Pad",c,{mode:p,value:m,pads:y?Array.from(z().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},904413:(c,p,m,y,w,A)=>{t.Ab("BatchNormalization",c,{epsilon:p,momentum:m,spatial:!!w,trainingMode:!!y,format:A?"NHWC":"NCHW"})},904582:(c,p,m,y,w,A)=>{t.Ab("BatchNormalization",c,{epsilon:p,momentum:m,spatial:!!w,trainingMode:!!y,format:A?"NHWC":"NCHW"})},904751:(c,p,m)=>{t.Ab("CumSum",c,{exclusive:Number(p),reverse:Number(m)})},904848:(c,p,m)=>{t.Ab("DequantizeLinear",c,{axis:p,blockSize:m})},904938:(c,p,m,y,w)=>{t.Ab("GridSample",c,{align_corners:p,mode:Je(m),padding_mode:Je(y),format:w?"NHWC":"NCHW"})},905108:(c,p,m,y,w)=>{t.Ab("GridSample",c,{align_corners:p,mode:Je(m),padding_mode:Je(y),format:w?"NHWC":"NCHW"})},905278:(c,p)=>{t.Ab("ScatterND",c,{reduction:Je(p)})},905363:(c,p,m,y,w,A,D,M,V)=>{t.Ab("Attention",c,{numHeads:p,isUnidirectional:m,maskFilterValue:y,scale:w,doRotary:A,qkvHiddenSizes:D?Array.from(z().subarray(Number(M)>>>0,Number(M)+D>>>0)):[],pastPresentShareBuffer:!!V})},905635:c=>{t.Ab("BiasAdd",c,void 0)},905690:c=>{t.Ab("BiasSplitGelu",c,void 0)},905751:c=>{t.Ab("FastGelu",c,void 0)},905807:(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce,tt,It)=>{t.Ab("Conv",c,{format:de?"NHWC":"NCHW",auto_pad:p,dilations:m?Array.from(z().subarray(Number(m)>>>0,Number(y)>>>0)):[],group:w,kernel_shape:A?Array.from(z().subarray(Number(A)>>>0,Number(D)>>>0)):[],pads:M?Array.from(z().subarray(Number(M)>>>0,Number(V)>>>0)):[],strides:H?Array.from(z().subarray(Number(H)>>>0,Number(te)>>>0)):[],w_is_const:()=>!!Ze()[Number(we)>>>0],activation:Je(Ce),activation_params:tt?Array.from(ct().subarray(Number(tt)>>>0,Number(It)>>>0)):[]})},906391:c=>{t.Ab("Gelu",c,void 0)},906443:(c,p,m,y,w,A,D,M,V)=>{t.Ab("GroupQueryAttention",c,{numHeads:p,kvNumHeads:m,scale:y,softcap:w,doRotary:A,rotaryInterleaved:D,smoothSoftmax:M,localWindowSize:V})},906660:(c,p,m,y)=>{t.Ab("LayerNormalization",c,{axis:p,epsilon:m,simplified:!!y})},906771:(c,p,m,y)=>{t.Ab("LayerNormalization",c,{axis:p,epsilon:m,simplified:!!y})},906882:(c,p,m,y,w,A)=>{t.Ab("MatMulNBits",c,{k:p,n:m,accuracyLevel:y,bits:w,blockSize:A})},907009:(c,p,m,y,w,A)=>{t.Ab("MultiHeadAttention",c,{numHeads:p,isUnidirectional:m,maskFilterValue:y,scale:w,doRotary:A})},907168:(c,p)=>{t.Ab("QuickGelu",c,{alpha:p})},907232:(c,p,m,y,w)=>{t.Ab("RotaryEmbedding",c,{interleaved:!!p,numHeads:m,rotaryEmbeddingDim:y,scale:w})},907371:(c,p,m)=>{t.Ab("SkipLayerNormalization",c,{epsilon:p,simplified:!!m})},907473:(c,p,m)=>{t.Ab("SkipLayerNormalization",c,{epsilon:p,simplified:!!m})},907575:(c,p,m,y)=>{t.Ab("GatherBlockQuantized",c,{gatherAxis:p,quantizeAxis:m,blockSize:y})},907696:c=>{t.$b(c)},907730:(c,p)=>t.bc(Number(c),Number(p),t.Gb.ec,t.Gb.errors)};function $T(c,p,m){return $d(async()=>{await t.Yb(Number(c),Number(p),Number(m))})}function AT(){return typeof wasmOffsetConverter<"u"}var B=await async function(){function c(y,w){return B=y.exports,B=function(){var A=B,D={};for(let[M,V]of Object.entries(A))D[M]=typeof V=="function"?(...H)=>{Qo.push(M);try{return V(...H)}finally{ee||(Qo.pop(),Qt&&ar===1&&Qo.length===0&&(ar=0,rr+=1,Yo(ep),typeof Fibers<"u"&&Fibers.sc()))}}:V;return D}(),B=function(){var A=B,D=V=>H=>V(H)>>>0,M=V=>()=>V()>>>0;return(A=Object.assign({},A)).Ea=D(A.Ea),A.gb=M(A.gb),A.ib=D(A.ib),A.tb=D(A.tb),A.ub=M(A.ub),A.__cxa_get_exception_ptr=D(A.__cxa_get_exception_ptr),A}(),Jc.push(B.jb),x=w,jc(),B}tr++;var p=qc();if(t.instantiateWasm)return new Promise(y=>{t.instantiateWasm(p,(w,A)=>{y(c(w,A))})});if(s)return new Promise(y=>{K=w=>{var A=new WebAssembly.Instance(w,qc());y(c(A,w))}});er??=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",_):_+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href;try{var m=await async function(y){var w=er;if(!T&&typeof WebAssembly.instantiateStreaming=="function"&&!Te(w))try{var A=fetch(w,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(A,y)}catch(D){he(`wasm streaming compile failed: ${D}`),he("falling back to ArrayBuffer instantiation")}return async function(D,M){try{var V=await async function(H){if(!T)try{var te=await f(H);return new Uint8Array(te)}catch{}if(H==er&&T)H=new Uint8Array(T);else{if(!h)throw"both async and sync fetching of the wasm failed";H=h(H)}return H}(D);return await WebAssembly.instantiate(V,M)}catch(H){he(`failed to asynchronously prepare wasm: ${H}`),nr(H)}}(w,y)}(p);return c(m.instance,m.module)}catch(y){return n(y),Promise.reject(y)}}(),Wd=c=>(Wd=B.Ea)(c),Hd=()=>(Hd=B.Fa)();t._OrtInit=(c,p)=>(t._OrtInit=B.Ga)(c,p),t._OrtGetLastError=(c,p)=>(t._OrtGetLastError=B.Ha)(c,p),t._OrtCreateSessionOptions=(c,p,m,y,w,A,D,M,V,H)=>(t._OrtCreateSessionOptions=B.Ia)(c,p,m,y,w,A,D,M,V,H),t._OrtAppendExecutionProvider=(c,p,m,y,w)=>(t._OrtAppendExecutionProvider=B.Ja)(c,p,m,y,w),t._OrtAddFreeDimensionOverride=(c,p,m)=>(t._OrtAddFreeDimensionOverride=B.Ka)(c,p,m),t._OrtAddSessionConfigEntry=(c,p,m)=>(t._OrtAddSessionConfigEntry=B.La)(c,p,m),t._OrtReleaseSessionOptions=c=>(t._OrtReleaseSessionOptions=B.Ma)(c),t._OrtCreateSession=(c,p,m)=>(t._OrtCreateSession=B.Na)(c,p,m),t._OrtReleaseSession=c=>(t._OrtReleaseSession=B.Oa)(c),t._OrtGetInputOutputCount=(c,p,m)=>(t._OrtGetInputOutputCount=B.Pa)(c,p,m),t._OrtGetInputOutputMetadata=(c,p,m,y)=>(t._OrtGetInputOutputMetadata=B.Qa)(c,p,m,y),t._OrtFree=c=>(t._OrtFree=B.Ra)(c),t._OrtCreateTensor=(c,p,m,y,w,A)=>(t._OrtCreateTensor=B.Sa)(c,p,m,y,w,A),t._OrtGetTensorData=(c,p,m,y,w)=>(t._OrtGetTensorData=B.Ta)(c,p,m,y,w),t._OrtReleaseTensor=c=>(t._OrtReleaseTensor=B.Ua)(c),t._OrtCreateRunOptions=(c,p,m,y)=>(t._OrtCreateRunOptions=B.Va)(c,p,m,y),t._OrtAddRunConfigEntry=(c,p,m)=>(t._OrtAddRunConfigEntry=B.Wa)(c,p,m),t._OrtReleaseRunOptions=c=>(t._OrtReleaseRunOptions=B.Xa)(c),t._OrtCreateBinding=c=>(t._OrtCreateBinding=B.Ya)(c),t._OrtBindInput=(c,p,m)=>(t._OrtBindInput=B.Za)(c,p,m),t._OrtBindOutput=(c,p,m,y)=>(t._OrtBindOutput=B._a)(c,p,m,y),t._OrtClearBoundOutputs=c=>(t._OrtClearBoundOutputs=B.$a)(c),t._OrtReleaseBinding=c=>(t._OrtReleaseBinding=B.ab)(c),t._OrtRunWithBinding=(c,p,m,y,w)=>(t._OrtRunWithBinding=B.bb)(c,p,m,y,w),t._OrtRun=(c,p,m,y,w,A,D,M)=>(t._OrtRun=B.cb)(c,p,m,y,w,A,D,M),t._OrtEndProfiling=c=>(t._OrtEndProfiling=B.db)(c),t._JsepOutput=(c,p,m)=>(t._JsepOutput=B.eb)(c,p,m),t._JsepGetNodeName=c=>(t._JsepGetNodeName=B.fb)(c);var xs=()=>(xs=B.gb)(),Kn=t._free=c=>(Kn=t._free=B.hb)(c),oi=t._malloc=c=>(oi=t._malloc=B.ib)(c),Ts=(c,p,m,y,w,A)=>(Ts=B.kb)(c,p,m,y,w,A),jd=()=>(jd=B.lb)(),qd=(c,p,m,y,w)=>(qd=B.mb)(c,p,m,y,w),Kd=c=>(Kd=B.nb)(c),Is=c=>(Is=B.ob)(c),Xd=(c,p)=>(Xd=B.pb)(c,p),Zd=()=>(Zd=B.qb)(),Jd=(c,p)=>(Jd=B.rb)(c,p),ii=c=>(ii=B.sb)(c),Ss=c=>(Ss=B.tb)(c),$s=()=>($s=B.ub)(),Yd=t.dynCall_ii=(c,p)=>(Yd=t.dynCall_ii=B.vb)(c,p);t.dynCall_vii=(c,p,m)=>(t.dynCall_vii=B.dynCall_vii)(c,p,m),t.dynCall_iiiii=(c,p,m,y,w)=>(t.dynCall_iiiii=B.dynCall_iiiii)(c,p,m,y,w),t.dynCall_iii=(c,p,m)=>(t.dynCall_iii=B.dynCall_iii)(c,p,m),t.dynCall_iiiiii=(c,p,m,y,w,A)=>(t.dynCall_iiiiii=B.dynCall_iiiiii)(c,p,m,y,w,A),t.dynCall_iiiiiiii=(c,p,m,y,w,A,D,M)=>(t.dynCall_iiiiiiii=B.dynCall_iiiiiiii)(c,p,m,y,w,A,D,M),t.dynCall_iiiiiii=(c,p,m,y,w,A,D)=>(t.dynCall_iiiiiii=B.dynCall_iiiiiii)(c,p,m,y,w,A,D),t.dynCall_vi=(c,p)=>(t.dynCall_vi=B.dynCall_vi)(c,p),t.dynCall_iiii=(c,p,m,y)=>(t.dynCall_iiii=B.dynCall_iiii)(c,p,m,y),t.dynCall_i=c=>(t.dynCall_i=B.dynCall_i)(c),t.dynCall_viiiiiiii=(c,p,m,y,w,A,D,M,V)=>(t.dynCall_viiiiiiii=B.dynCall_viiiiiiii)(c,p,m,y,w,A,D,M,V),t.dynCall_viii=(c,p,m,y)=>(t.dynCall_viii=B.dynCall_viii)(c,p,m,y),t.dynCall_viijj=(c,p,m,y,w)=>(t.dynCall_viijj=B.dynCall_viijj)(c,p,m,y,w),t.dynCall_viiiiii=(c,p,m,y,w,A,D)=>(t.dynCall_viiiiii=B.dynCall_viiiiii)(c,p,m,y,w,A,D),t.dynCall_viiii=(c,p,m,y,w)=>(t.dynCall_viiii=B.dynCall_viiii)(c,p,m,y,w),t.dynCall_viiiii=(c,p,m,y,w,A)=>(t.dynCall_viiiii=B.dynCall_viiiii)(c,p,m,y,w,A),t.dynCall_vfiii=(c,p,m,y,w)=>(t.dynCall_vfiii=B.dynCall_vfiii)(c,p,m,y,w),t.dynCall_viiiiff=(c,p,m,y,w,A,D)=>(t.dynCall_viiiiff=B.dynCall_viiiiff)(c,p,m,y,w,A,D),t.dynCall_viiiiiff=(c,p,m,y,w,A,D,M)=>(t.dynCall_viiiiiff=B.dynCall_viiiiiff)(c,p,m,y,w,A,D,M),t.dynCall_ffff=(c,p,m,y)=>(t.dynCall_ffff=B.dynCall_ffff)(c,p,m,y),t.dynCall_viiff=(c,p,m,y,w)=>(t.dynCall_viiff=B.dynCall_viiff)(c,p,m,y,w),t.dynCall_fffffff=(c,p,m,y,w,A,D)=>(t.dynCall_fffffff=B.dynCall_fffffff)(c,p,m,y,w,A,D),t.dynCall_jjjjjjj=(c,p,m,y,w,A,D)=>(t.dynCall_jjjjjjj=B.dynCall_jjjjjjj)(c,p,m,y,w,A,D),t.dynCall_jjjjjj=(c,p,m,y,w,A)=>(t.dynCall_jjjjjj=B.dynCall_jjjjjj)(c,p,m,y,w,A),t.dynCall_iijjii=(c,p,m,y,w,A)=>(t.dynCall_iijjii=B.dynCall_iijjii)(c,p,m,y,w,A),t.dynCall_viiiiiiiiiiiii=(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce)=>(t.dynCall_viiiiiiiiiiiii=B.dynCall_viiiiiiiiiiiii)(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce),t.dynCall_viiiiiiiiii=(c,p,m,y,w,A,D,M,V,H,te)=>(t.dynCall_viiiiiiiiii=B.dynCall_viiiiiiiiii)(c,p,m,y,w,A,D,M,V,H,te),t.dynCall_viiiiiiiiiii=(c,p,m,y,w,A,D,M,V,H,te,de)=>(t.dynCall_viiiiiiiiiii=B.dynCall_viiiiiiiiiii)(c,p,m,y,w,A,D,M,V,H,te,de),t.dynCall_viiiiiiiiiiii=(c,p,m,y,w,A,D,M,V,H,te,de,we)=>(t.dynCall_viiiiiiiiiiii=B.dynCall_viiiiiiiiiiii)(c,p,m,y,w,A,D,M,V,H,te,de,we),t.dynCall_viiiiiiiiiiiiiiiiii=(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce,tt,It,Xn,Sr,_o)=>(t.dynCall_viiiiiiiiiiiiiiiiii=B.dynCall_viiiiiiiiiiiiiiiiii)(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce,tt,It,Xn,Sr,_o),t.dynCall_viiiiiiiii=(c,p,m,y,w,A,D,M,V,H)=>(t.dynCall_viiiiiiiii=B.dynCall_viiiiiiiii)(c,p,m,y,w,A,D,M,V,H),t.dynCall_viiiiiiiiiiiiiiiiiii=(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce,tt,It,Xn,Sr,_o,As)=>(t.dynCall_viiiiiiiiiiiiiiiiiii=B.dynCall_viiiiiiiiiiiiiiiiiii)(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce,tt,It,Xn,Sr,_o,As),t.dynCall_viiiiiii=(c,p,m,y,w,A,D,M)=>(t.dynCall_viiiiiii=B.dynCall_viiiiiii)(c,p,m,y,w,A,D,M),t.dynCall_viiiiiiiiiiiiiii=(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce,tt,It)=>(t.dynCall_viiiiiiiiiiiiiii=B.dynCall_viiiiiiiiiiiiiii)(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce,tt,It),t.dynCall_jiji=(c,p,m,y)=>(t.dynCall_jiji=B.dynCall_jiji)(c,p,m,y),t.dynCall_v=c=>(t.dynCall_v=B.dynCall_v)(c),t.dynCall_iidiiii=(c,p,m,y,w,A,D)=>(t.dynCall_iidiiii=B.dynCall_iidiiii)(c,p,m,y,w,A,D),t.dynCall_iiiiiiiii=(c,p,m,y,w,A,D,M,V)=>(t.dynCall_iiiiiiiii=B.dynCall_iiiiiiiii)(c,p,m,y,w,A,D,M,V),t.dynCall_iiij=(c,p,m,y)=>(t.dynCall_iiij=B.dynCall_iiij)(c,p,m,y),t.dynCall_iiiiiiiiii=(c,p,m,y,w,A,D,M,V,H)=>(t.dynCall_iiiiiiiiii=B.dynCall_iiiiiiiiii)(c,p,m,y,w,A,D,M,V,H),t.dynCall_iiiiiiiiiiiii=(c,p,m,y,w,A,D,M,V,H,te,de,we)=>(t.dynCall_iiiiiiiiiiiii=B.dynCall_iiiiiiiiiiiii)(c,p,m,y,w,A,D,M,V,H,te,de,we),t.dynCall_iiiiiiiiiii=(c,p,m,y,w,A,D,M,V,H,te)=>(t.dynCall_iiiiiiiiiii=B.dynCall_iiiiiiiiiii)(c,p,m,y,w,A,D,M,V,H,te),t.dynCall_ji=(c,p)=>(t.dynCall_ji=B.dynCall_ji)(c,p),t.dynCall_iijii=(c,p,m,y,w)=>(t.dynCall_iijii=B.dynCall_iijii)(c,p,m,y,w),t.dynCall_vij=(c,p,m)=>(t.dynCall_vij=B.dynCall_vij)(c,p,m),t.dynCall_viiijii=(c,p,m,y,w,A,D)=>(t.dynCall_viiijii=B.dynCall_viiijii)(c,p,m,y,w,A,D),t.dynCall_viijiiiiiiiiiiiiii=(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce,tt,It,Xn,Sr)=>(t.dynCall_viijiiiiiiiiiiiiii=B.dynCall_viijiiiiiiiiiiiiii)(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce,tt,It,Xn,Sr),t.dynCall_viiiji=(c,p,m,y,w,A)=>(t.dynCall_viiiji=B.dynCall_viiiji)(c,p,m,y,w,A),t.dynCall_fiii=(c,p,m,y)=>(t.dynCall_fiii=B.dynCall_fiii)(c,p,m,y),t.dynCall_viijii=(c,p,m,y,w,A)=>(t.dynCall_viijii=B.dynCall_viijii)(c,p,m,y,w,A),t.dynCall_viij=(c,p,m,y)=>(t.dynCall_viij=B.dynCall_viij)(c,p,m,y),t.dynCall_jiij=(c,p,m,y)=>(t.dynCall_jiij=B.dynCall_jiij)(c,p,m,y),t.dynCall_fi=(c,p)=>(t.dynCall_fi=B.dynCall_fi)(c,p),t.dynCall_fii=(c,p,m)=>(t.dynCall_fii=B.dynCall_fii)(c,p,m),t.dynCall_jii=(c,p,m)=>(t.dynCall_jii=B.dynCall_jii)(c,p,m),t.dynCall_dii=(c,p,m)=>(t.dynCall_dii=B.dynCall_dii)(c,p,m),t.dynCall_fiiii=(c,p,m,y,w)=>(t.dynCall_fiiii=B.dynCall_fiiii)(c,p,m,y,w),t.dynCall_fif=(c,p,m)=>(t.dynCall_fif=B.dynCall_fif)(c,p,m),t.dynCall_jfi=(c,p,m)=>(t.dynCall_jfi=B.dynCall_jfi)(c,p,m),t.dynCall_viiiiiiiiiiiiii=(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce,tt)=>(t.dynCall_viiiiiiiiiiiiii=B.dynCall_viiiiiiiiiiiiii)(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce,tt),t.dynCall_viiiiiiiiiiiiiiiiiiii=(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce,tt,It,Xn,Sr,_o,As,OT)=>(t.dynCall_viiiiiiiiiiiiiiiiiiii=B.dynCall_viiiiiiiiiiiiiiiiiiii)(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce,tt,It,Xn,Sr,_o,As,OT),t.dynCall_viiiiiiiiiiiiiiii=(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce,tt,It,Xn)=>(t.dynCall_viiiiiiiiiiiiiiii=B.dynCall_viiiiiiiiiiiiiiii)(c,p,m,y,w,A,D,M,V,H,te,de,we,Ce,tt,It,Xn),t.dynCall_iif=(c,p,m)=>(t.dynCall_iif=B.dynCall_iif)(c,p,m),t.dynCall_jiiii=(c,p,m,y,w)=>(t.dynCall_jiiii=B.dynCall_jiiii)(c,p,m,y,w),t.dynCall_jiii=(c,p,m,y)=>(t.dynCall_jiii=B.dynCall_jiii)(c,p,m,y),t.dynCall_viif=(c,p,m,y)=>(t.dynCall_viif=B.dynCall_viif)(c,p,m,y),t.dynCall_viiij=(c,p,m,y,w)=>(t.dynCall_viiij=B.dynCall_viiij)(c,p,m,y,w),t.dynCall_viiiijii=(c,p,m,y,w,A,D,M)=>(t.dynCall_viiiijii=B.dynCall_viiiijii)(c,p,m,y,w,A,D,M),t.dynCall_iiiiij=(c,p,m,y,w,A)=>(t.dynCall_iiiiij=B.dynCall_iiiiij)(c,p,m,y,w,A),t.dynCall_iiiiid=(c,p,m,y,w,A)=>(t.dynCall_iiiiid=B.dynCall_iiiiid)(c,p,m,y,w,A),t.dynCall_iiiiijj=(c,p,m,y,w,A,D)=>(t.dynCall_iiiiijj=B.dynCall_iiiiijj)(c,p,m,y,w,A,D),t.dynCall_iiiiiijj=(c,p,m,y,w,A,D,M)=>(t.dynCall_iiiiiijj=B.dynCall_iiiiiijj)(c,p,m,y,w,A,D,M);var Qd=c=>(Qd=B.wb)(c),ep=()=>(ep=B.xb)(),tp=c=>(tp=B.yb)(c),np=()=>(np=B.zb)();return function c(){if(0<tr)Kr=c;else if(s)e(t),Vt();else{for(;0<is.length;)is.shift()(t);0<tr?Kr=c:(t.calledRun=!0,ee||(Vt(),e(t)))}}(),t.PTR_SIZE=4,o},EO=my,CO=globalThis.self?.name?.startsWith("em-pthread");CO&&my()});var vy,ic,DO,Ot,wy,oc,kO,NO,xy,LO,yy,Ty,_y,Iy,fa=k(()=>{"use strict";pa();vy=typeof location>"u"?void 0:location.origin,ic=import.meta.url>"file:"&&import.meta.url<"file;",DO=()=>{if(!!1){if(ic){let r=URL;return new URL(new r("ort.all.bundle.min.mjs",import.meta.url).href,vy).href}return import.meta.url}},Ot=DO(),wy=()=>{if(Ot&&!Ot.startsWith("blob:"))return Ot.substring(0,Ot.lastIndexOf("/")+1)},oc=(r,e)=>{try{let n=e??Ot;return(n?new URL(r,n):new URL(r)).origin===vy}catch{return!1}},kO=(r,e)=>{let n=e??Ot;try{return(n?new URL(r,n):new URL(r)).href}catch{return}},NO=(r,e)=>`${e??"./"}${r}`,xy=async r=>{let n=await(await fetch(r,{credentials:"same-origin"})).blob();return URL.createObjectURL(n)},LO=async r=>(await import(/*webpackIgnore:true*/r)).default,yy=(hy(),Jr(fy)).default,Ty=async()=>{if(!Ot)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(oc(Ot))return[void 0,yy()];let r=await xy(Ot);return[r,yy(r)]},_y=(by(),Jr(gy)).default,Iy=async(r,e,n,t)=>{let o=_y&&!(r||e);if(o)if(Ot)o=oc(Ot);else if(t&&!n)o=!0;else throw new Error("cannot determine the script source URL.");if(o)return[void 0,_y];{let i="ort-wasm-simd-threaded.jsep.mjs",a=r??kO(i,e),s=!!1&&n&&a&&!oc(a,e),u=s?await xy(a):a??NO(i,e);return[s?u:void 0,await LO(u)]}}});var ac,sc,xa,Sy,RO,zO,MO,ha,Be,yr=k(()=>{"use strict";fa();sc=!1,xa=!1,Sy=!1,RO=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},zO=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},MO=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},ha=async r=>{if(sc)return Promise.resolve();if(xa)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Sy)throw new Error("previous call to 'initializeWebAssembly()' failed.");xa=!0;let e=r.initTimeout,n=r.numThreads;if(r.simd!==!1){if(r.simd==="relaxed"){if(!MO())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!zO())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let t=RO();n>1&&!t&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),r.numThreads=n=1);let o=r.wasmPaths,i=typeof o=="string"?o:void 0,a=o?.mjs,s=a?.href??a,u=o?.wasm,l=u?.href??u,d=r.wasmBinary,[f,h]=await Iy(s,i,n>1,!!d||!!l),g=!1,b=[];if(e>0&&b.push(new Promise(_=>{setTimeout(()=>{g=!0,_()},e)})),b.push(new Promise((_,T)=>{let v={numThreads:n};if(d)v.wasmBinary=d;else if(l||i)v.locateFile=x=>l??i+x;else if(s&&s.indexOf("blob:")!==0)v.locateFile=x=>new URL(x,s).href;else if(f){let x=wy();x&&(v.locateFile=I=>x+I)}h(v).then(x=>{xa=!1,sc=!0,ac=x,_(),f&&URL.revokeObjectURL(f)},x=>{xa=!1,Sy=!0,T(x)})})),await Promise.race(b),g)throw new Error(`WebAssembly backend initializing failed due to timeout: ${e}ms`)},Be=()=>{if(sc&&ac)return ac;throw new Error("WebAssembly is not initialized yet.")}});var Pt,Vo,Ne,Ta=k(()=>{"use strict";yr();Pt=(r,e)=>{let n=Be(),t=n.lengthBytesUTF8(r)+1,o=n._malloc(t);return n.stringToUTF8(r,o,t),e.push(o),o},Vo=(r,e,n,t)=>{if(typeof r=="object"&&r!==null){if(n.has(r))throw new Error("Circular reference in options");n.add(r)}Object.entries(r).forEach(([o,i])=>{let a=e?e+o:o;if(typeof i=="object")Vo(i,a+".",n,t);else if(typeof i=="string"||typeof i=="number")t(a,i.toString());else if(typeof i=="boolean")t(a,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},Ne=r=>{let e=Be(),n=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetLastError(o,o+t);let i=Number(e.getValue(o,t===4?"i32":"i64")),a=e.getValue(o+t,"*"),s=a?e.UTF8ToString(a):"";throw new Error(`${r} ERROR_CODE: ${i}, ERROR_MESSAGE: ${s}`)}finally{e.stackRestore(n)}}});var $y,Ay=k(()=>{"use strict";yr();Ta();$y=r=>{let e=Be(),n=0,t=[],o=r||{};try{if(r?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof r.logSeverityLevel!="number"||!Number.isInteger(r.logSeverityLevel)||r.logSeverityLevel<0||r.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${r.logSeverityLevel}`);if(r?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof r.logVerbosityLevel!="number"||!Number.isInteger(r.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${r.logVerbosityLevel}`);r?.terminate===void 0&&(o.terminate=!1);let i=0;return r?.tag!==void 0&&(i=Pt(r.tag,t)),n=e._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),n===0&&Ne("Can't create run options."),r?.extra!==void 0&&Vo(r.extra,"",new WeakSet,(a,s)=>{let u=Pt(a,t),l=Pt(s,t);e._OrtAddRunConfigEntry(n,u,l)!==0&&Ne(`Can't set a run config entry: ${a} - ${s}.`)}),[n,t]}catch(i){throw n!==0&&e._OrtReleaseRunOptions(n),t.forEach(a=>e._free(a)),i}}});var BO,FO,VO,Ia,GO,Oy,Py=k(()=>{"use strict";yr();Ta();BO=r=>{switch(r){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${r}`)}},FO=r=>{switch(r){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${r}`)}},VO=r=>{r.extra||(r.extra={}),r.extra.session||(r.extra.session={});let e=r.extra.session;e.use_ort_model_bytes_directly||(e.use_ort_model_bytes_directly="1"),r.executionProviders&&r.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(r.enableMemPattern=!1)},Ia=(r,e,n,t)=>{let o=Pt(e,t),i=Pt(n,t);Be()._OrtAddSessionConfigEntry(r,o,i)!==0&&Ne(`Can't set a session config entry: ${e} - ${n}.`)},GO=async(r,e,n)=>{for(let t of e){let o=typeof t=="string"?t:t.name,i=[];switch(o){case"webnn":if(o="WEBNN",typeof t!="string"){let f=t?.deviceType;f&&Ia(r,"deviceType",f,n)}break;case"webgpu":if(o="JS",typeof t!="string"){let d=t;if(d?.preferredLayout){if(d.preferredLayout!=="NCHW"&&d.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${d.preferredLayout}`);Ia(r,"preferredLayout",d.preferredLayout,n)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let a=Pt(o,n),s=i.length,u=0,l=0;if(s>0){u=Be()._malloc(s*Be().PTR_SIZE),n.push(u),l=Be()._malloc(s*Be().PTR_SIZE),n.push(l);for(let d=0;d<s;d++)Be().setValue(u+d*Be().PTR_SIZE,i[d][0],"*"),Be().setValue(l+d*Be().PTR_SIZE,i[d][1],"*")}await Be()._OrtAppendExecutionProvider(r,a,u,l,s)!==0&&Ne(`Can't append execution provider: ${o}.`)}},Oy=async r=>{let e=Be(),n=0,t=[],o=r||{};VO(o);try{let i=BO(o.graphOptimizationLevel??"all"),a=FO(o.executionMode??"sequential"),s=typeof o.logId=="string"?Pt(o.logId,t):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log severity level is not valid: ${u}`);let l=o.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let d=typeof o.optimizedModelFilePath=="string"?Pt(o.optimizedModelFilePath,t):0;if(n=e._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,a,!!o.enableProfiling,0,s,u,l,d),n===0&&Ne("Can't create session options."),o.executionProviders&&await GO(n,o.executionProviders,t),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);Ia(n,"enableGraphCapture",o.enableGraphCapture.toString(),t)}if(o.freeDimensionOverrides)for(let[f,h]of Object.entries(o.freeDimensionOverrides)){if(typeof f!="string")throw new Error(`free dimension override name must be a string: ${f}`);if(typeof h!="number"||!Number.isInteger(h)||h<0)throw new Error(`free dimension override value must be a non-negative integer: ${h}`);let g=Pt(f,t);e._OrtAddFreeDimensionOverride(n,g,h)!==0&&Ne(`Can't set a free dimension override: ${f} - ${h}.`)}return o.extra!==void 0&&Vo(o.extra,"",new WeakSet,(f,h)=>{Ia(n,f,h,t)}),[n,t]}catch(i){throw n!==0&&e._OrtReleaseSessionOptions(n)!==0&&Ne("Can't release session options."),t.forEach(a=>e._free(a)),i}}});var _r,Mn,vr,co,Go,Sa,$a,uc,le=k(()=>{"use strict";_r=r=>{switch(r){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${r}`)}},Mn=r=>{switch(r){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${r}`)}},vr=(r,e)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][r],t=typeof e=="number"?e:e.reduce((o,i)=>o*i,1);return n>0?Math.ceil(t*n):void 0},co=r=>{switch(r){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${r}`)}},Go=r=>{switch(r){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${r}`)}},Sa=r=>r==="float32"||r==="float16"||r==="int32"||r==="int64"||r==="uint32"||r==="uint8"||r==="bool"||r==="uint4"||r==="int4",$a=r=>r==="float32"||r==="float16"||r==="int32"||r==="int64"||r==="uint32"||r==="uint64"||r==="int8"||r==="uint8"||r==="bool"||r==="uint4"||r==="int4",uc=r=>{switch(r){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${r}`)}}});var Uo,lc=k(()=>{"use strict";pa();Uo=async r=>{if(typeof r=="string")if(!1)try{let{readFile:e}=Os("node:fs/promises");return new Uint8Array(await e(r))}catch(e){if(e.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:n}=Os("node:fs"),t=n(r),o=[];for await(let i of t)o.push(i);return new Uint8Array(Buffer.concat(o))}throw e}else{let e=await fetch(r);if(!e.ok)throw new Error(`failed to load external data file: ${r}`);let n=e.headers.get("Content-Length"),t=n?parseInt(n,10):0;if(t<1073741824)return new Uint8Array(await e.arrayBuffer());{if(!e.body)throw new Error(`failed to load external data file: ${r}, no response body.`);let o=e.body.getReader(),i;try{i=new ArrayBuffer(t)}catch(s){if(s instanceof RangeError){let u=Math.ceil(t/65536);i=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw s}let a=0;for(;;){let{done:s,value:u}=await o.read();if(s)break;let l=u.byteLength;new Uint8Array(i,a,l).set(u),a+=l}return new Uint8Array(i,0,t)}}else return r instanceof Blob?new Uint8Array(await r.arrayBuffer()):r instanceof Uint8Array?r:new Uint8Array(r)}});var UO,WO,Ey,Cy,Aa,HO,_e,Bn=k(()=>{"use strict";le();UO=["V","I","W","E","F"],WO=(r,e)=>{console.log(`[${UO[r]},${new Date().toISOString()}]${e}`)},Aa=(r,e)=>{Ey=r,Cy=e},HO=(r,e)=>{let n=Go(r),t=Go(Ey);n>=t&&WO(n,typeof e=="function"?e():e)},_e=(...r)=>{Cy&&HO(...r)}});var cc,Fn,C,Ur,Oa,Dy,ky,ge=k(()=>{"use strict";cc=class{static calcMatMulShape(e,n){return e[1]!==n[0]?void 0:[e[0],n[1]]}},Fn=class{static calcShape(e,n,t=!1){let o=e.length,i=n.length;if(o===0)return n;if(i===0)return e;let a=Math.max(e.length,n.length),s=new Array(a);if(t){if(o<2||i<2)return;let u=cc.calcMatMulShape([e[o-2],e[o-1]],[n[i-2],n[i-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=t?3:1;u<=a;u++){let l=o-u<0?1:e[o-u],d=i-u<0?1:n[i-u];if(l!==d&&l>1&&d>1)return;let f=Math.max(l,d);if(l&&d)s[a-u]=Math.max(l,d);else{if(f>1)return;s[a-u]=0}}return s}static isValidBroadcast(e,n){let t=e.length,o=n.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==n[o-i])return!1;return!0}},C=class r{static size(e){return r.getSizeFromDimensionRange(e,0,e.length)}static convertShape(e,n=4){let t=e.length;if(t===0)return[];let o=new Array(t),i=t-1;for(;i>=0;){if(e[i]%n===0){o[i]=e[i]/n;break}if(n%e[i]!==0)throw new Error("cannot convert shape");o[i]=1,n/=e[i],i--}for(i--;i>=0;i--)o[i]=e[i];return o}static sizeFromDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,n,e.length)}static sizeToDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,0,n)}static getSizeFromDimensionRange(e,n,t){let o=1;for(let i=n;i<t;i++){if(e[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(e[i])}return o}static computeStrides(e){let n=e.length;if(n===0)return[];if(n===1)return[1];let t=new Array(n);t[n-1]=1,t[n-2]=e[n-1];for(let o=n-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static normalizeAxis(e,n){if(e<-n&&e>=n)throw new Error("unsupported axis for this operation.");return e<0?e+n:e}static normalizeAxes(e,n){return e.map(t=>this.normalizeAxis(t,n??e.length))}static sortBasedOnPerm(e,n){return n?n.map(t=>e[t]):e.slice().reverse()}static padShape(e,n){let t=e.length;return e.map((o,i)=>o+n[i]+n[i+t])}static areEqual(e,n){return e.length!==n.length?!1:e.every((t,o)=>t===n[o])}},Ur=class r{static adjustPoolAttributes(e,n,t,o,i,a){if(!e&&t.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let s=0;s<n.length-2;s++)s>=t.length?t.push(n[s+2]):t[s]=n[s+2];for(let s=0;s<t.length;s++)if(s<o.length){if(o[s]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let s=0;s<t.length;s++)if(s<i.length){if(i[s]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let s=0;s<t.length*2;s++)if(s<a.length){if(a[s]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let s=0;s<t.length;s++){if(t[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[s]>=t[s]||a[s+t.length]>=t[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,n,t,o,i,a,s){if(s){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<e.length-2;u++)r.adjustPadAndReturnShape(e[u+(a?1:2)],n[u],t[u],o[u],i,u,u+e.length-2,s)}}static computePoolOutputShape(e,n,t,o,i,a,s){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let u=[n[0],n[1]];return r.computeShapeHelper(e,n,u,t,o,i,a,s),u}static computeConvOutputShape(e,n,t,o,i,a,s){if(e.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],n[0]];return r.computeShapeHelper(!1,e,u,t,o,i,a,s),u}static computeShapeHelper(e,n,t,o,i,a,s,u){if(e)for(let l=0;l<n.length-2;l++)t.push(1);else for(let l=0;l<n.length-2;l++)t.push(r.adjustPadAndReturnShape(n[l+2],o[l],i[l],a[l],s,l,l+n.length-2,u))}static adjustPadAndReturnShape(e,n,t,o,i,a,s,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[a]=0,i[s]=0,Math.floor((e-l)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let f=((e+n-1)/n-1)*n+o-e;return i[a]=Math.floor(u==="SAME_LOWER"?(f+1)/2:f/2),i[s]=f-i[a],Math.floor((e+f-o)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[a]+i[s]-l)/n+1)}},Oa=class{static getShapeOfGemmResult(e,n,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let a,s,u;n?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(i&&!Fn.isValidBroadcast(i,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},Dy=-34028234663852886e22,ky=34028234663852886e22});var Pa,dc=k(()=>{"use strict";le();Pa=(r,e)=>new(co(e))(r)});var Ly,fc,Ry,jO,Ny,qO,zy,Ea,Ca,pc,My,By=k(()=>{"use strict";le();Bn();Ly=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),fc=(r,e)=>{if(e==="int32")return r;let n=Ly.get(e);if(!n)throw new Error(`WebNN backend does not support data type: ${e}`);let t=n/8;if(r.byteLength%t!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${t}.`);let o=r.byteLength/t,i=new(co(e))(r.buffer,r.byteOffset,o);switch(e){case"int64":case"uint64":{let a=new Int32Array(o);for(let s=0;s<o;s++){let u=i[s];if(u>2147483647n||u<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");a[s]=Number(u)}return new Uint8Array(a.buffer)}case"int8":case"uint8":case"uint32":{if(e==="uint32"&&i.some(s=>s>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let a=Int32Array.from(i,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from ${e} to 'int32'`)}},Ry=(r,e)=>{if(e==="int32")return r;if(r.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let n=r.byteLength/4,t=new Int32Array(r.buffer,r.byteOffset,n);switch(e){case"int64":{let o=BigInt64Array.from(t,BigInt);return new Uint8Array(o.buffer)}case"uint64":{if(t.some(i=>i<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let o=BigUint64Array.from(t,BigInt);return new Uint8Array(o.buffer)}case"int8":{if(t.some(i=>i<-128||i>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let o=Int8Array.from(t,Number);return new Uint8Array(o.buffer)}case"uint8":{if(t.some(o=>o<0||o>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(t,Number)}case"uint32":{if(t.some(i=>i<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let o=Uint32Array.from(t,Number);return new Uint8Array(o.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${e}`)}},jO=1,Ny=()=>jO++,qO=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),zy=(r,e)=>{let n=Ly.get(r);if(!n)throw new Error(`WebNN backend does not support data type: ${r}`);return e.length>0?Math.ceil(e.reduce((t,o)=>t*o)*n/8):0},Ea=class{constructor(e){this.isDataConverted=!1;let{sessionId:n,context:t,tensor:o,dataType:i,shape:a,fallbackDataType:s}=e;this.sessionId=n,this.mlContext=t,this.mlTensor=o,this.dataType=i,this.tensorShape=a,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return zy(this.dataType,this.tensorShape)}destroy(){_e("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let n=await this.mlContext.readTensor(this.mlTensor),t=Ry(new Uint8Array(n),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(t);return}else return t.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,n,t){return this.mlContext===e&&this.dataType===n&&this.tensorShape.length===t.length&&this.tensorShape.every((o,i)=>o===t[i])}setIsDataConverted(e){this.isDataConverted=e}},Ca=class{constructor(e,n){this.tensorManager=e;this.wrapper=n}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,n,t,o){let i=this.tensorManager.getMLContext(e),a;if(!i.opSupportLimits().input.dataTypes.includes(n)){if(a=qO.get(n),!a||!i.opSupportLimits().input.dataTypes.includes(a))throw new Error(`WebNN backend does not support data type: ${n}`);_e("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${n} to ${a}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(i,n,t))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==zy(n,t))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let s=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,n,t,s,!0,!0,a),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let n=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")n=fc(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(n);return}else _e("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(n):this.activeUpload=new Uint8Array(n)}async download(e){if(this.activeUpload){let n=this.wrapper?.isDataConverted?Ry(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(n):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(n);return}else return n.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},pc=class{constructor(e){this.backend=e;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}getMLContext(e){let n=this.backend.getMLContext(e);if(!n)throw new Error("MLContext not found for session.");return n}reserveTensorId(){let e=Ny();return this.tensorTrackersById.set(e,new Ca(this)),e}releaseTensorId(e){let n=this.tensorTrackersById.get(e);n&&(this.tensorTrackersById.delete(e),n.tensorWrapper&&this.releaseTensor(n.tensorWrapper))}async ensureTensor(e,n,t,o,i){_e("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${n}, dataType: ${t}, shape: ${o}, copyOld: ${i}}`);let a=this.tensorTrackersById.get(n);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,t,o,i)}upload(e,n){let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");t.upload(n)}async download(e,n){_e("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${n?.byteLength}}`);let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");return t.download(n)}releaseTensorsForSession(e){for(let n of this.freeTensors)n.sessionId===e&&n.destroy();this.freeTensors=this.freeTensors.filter(n=>n.sessionId!==e)}registerTensor(e,n,t,o){let i=this.getMLContext(e),a=Ny(),s=new Ea({sessionId:e,context:i,tensor:n,dataType:t,shape:o});return this.tensorTrackersById.set(a,new Ca(this,s)),this.externalTensors.add(s),a}async getCachedTensor(e,n,t,o,i,a,s){let u=this.getMLContext(e);for(let[d,f]of this.freeTensors.entries())if(f.canReuseTensor(u,n,t)){_e("verbose",()=>`[WebNN] Reusing tensor {dataType: ${n}, ${s?`fallbackDataType: ${s},`:""} shape: ${t}`);let h=this.freeTensors.splice(d,1)[0];return h.sessionId=e,h}_e("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${n}, ${s?`fallbackDataType: ${s},`:""} shape: ${t}}`);let l=await u.createTensor({dataType:s??n,shape:t,dimensions:t,usage:o,writable:i,readable:a});return new Ea({sessionId:e,context:u,tensor:l,dataType:n,shape:t,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},My=(...r)=>new pc(...r)});var Da,KO,ka,Fy=k(()=>{"use strict";le();yr();dc();By();Bn();Da=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),KO=(r,e)=>{if(r===e)return!0;if(r===void 0||e===void 0)return!1;let n=Object.keys(r).sort(),t=Object.keys(e).sort();return n.length===t.length&&n.every((o,i)=>o===t[i]&&r[o]===e[o])},ka=class{constructor(e){this.tensorManager=My(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];this.sessionGraphInputs=new Map;this.sessionGraphOutputs=new Map;this.temporaryGraphInputs=[];this.temporaryGraphOutputs=[];this.temporarySessionTensorIds=new Map;Aa(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){_e("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){_e("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let n=this.temporarySessionTensorIds.get(e);if(n){for(let t of n)_e("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(o=>o.gpuDevice===e);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:o}),o}}else if(e===void 0){let t=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let n=this.mlContextCache.findIndex(t=>KO(t.options,e));if(n!==-1)return this.mlContextCache[n].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}registerMLContext(e,n){this.mlContextBySessionId.set(e,n);let t=this.sessionIdsByMLContext.get(n);t||(t=new Set,this.sessionIdsByMLContext.set(n,t)),t.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let n=this.mlContextBySessionId.get(e);if(!n)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let t=this.sessionIdsByMLContext.get(n);if(t.delete(e),t.size===0){this.sessionIdsByMLContext.delete(n);let o=this.mlContextCache.findIndex(i=>i.mlContext===n);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){_e("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,n,t,o,i){let a=Da.get(t);if(!a)throw new Error(`Unsupported ONNX data type: ${t}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,n,a,o,i)}async createTemporaryTensor(e,n,t){_e("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${n}, shape: ${t}}`);let o=Da.get(n);if(!o)throw new Error(`Unsupported ONNX data type: ${n}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,o,t,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,n){if(!Be().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");_e("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${n.byteLength}}`),this.tensorManager.upload(e,n)}async downloadTensor(e,n){return this.tensorManager.download(e,n)}createMLTensorDownloader(e,n){return async()=>{let t=await this.tensorManager.download(e);return Pa(t,n)}}registerMLTensor(e,n,t,o){let i=Da.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.registerTensor(e,n,i,o);return _e("verbose",()=>`[WebNN] registerMLTensor {tensor: ${n}, dataType: ${i}, dimensions: ${o}} -> {tensorId: ${a}}`),a}registerMLConstant(e,n,t,o,i,a,s=!1){if(!a)throw new Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let l=a.get(u);if(!l)throw new Error(`File with name ${u} not found in preloaded files.`);if(n+t>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let d=l.slice(n,n+t).buffer,f;switch(i.dataType){case"float32":f=new Float32Array(d);break;case"float16":f=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(d):new Uint16Array(d);break;case"int32":f=new Int32Array(d);break;case"uint32":f=new Uint32Array(d);break;case"int64":if(s){let h=fc(new Uint8Array(d),"int64");f=new Int32Array(h.buffer),i.dataType="int32"}else f=new BigInt64Array(d);break;case"uint64":f=new BigUint64Array(d);break;case"int8":f=new Int8Array(d);break;case"int4":case"uint4":case"uint8":f=new Uint8Array(d);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return _e("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),o.constant(i,f)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,n){let t=this.sessionGraphInputs.get(e);return t?t.includes(n):!1}isGraphOutput(e,n){let t=this.sessionGraphOutputs.get(e);return t?t.includes(n):!1}isGraphInputOutputTypeSupported(e,n,t=!0){let o=this.mlContextBySessionId.get(e),i=Da.get(_r(n));return typeof i>"u"?!1:t?!!o?.opSupportLimits().input.dataTypes.includes(i):!!o?.opSupportLimits().output.dataTypes.includes(i)}flush(){}}});var Na=k(()=>{"use strict"});var Vy,hc,mc,XO,ZO,Gy,bc,gc,Wy,Hy=k(()=>{"use strict";Bn();Na();Vy=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),hc=[],mc=r=>Math.ceil(Number(r)/16)*16,XO=r=>{for(let e=0;e<hc.length;e++){let n=hc[e];if(r<=n)return n}return Math.ceil(r/16)*16},ZO=1,Gy=()=>ZO++,bc=async(r,e,n,t)=>{let o=mc(n),i=r.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=r.getCommandEncoder();r.endComputePass(),a.copyBufferToBuffer(e,0,i,0,o),r.flush(),await i.mapAsync(GPUMapMode.READ);let s=i.getMappedRange();if(t){let u=t();return u.set(new Uint8Array(s,0,n)),u}else return new Uint8Array(s.slice(0,n))}finally{i.destroy()}},gc=class{constructor(e){this.backend=e;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[n]of Vy)hc.push(n),this.freeBuffers.set(n,[]),this.freeUniformBuffers.set(n,[]);this.sessionCount=0}upload(e,n){let t=n.buffer,o=n.byteOffset,i=n.byteLength,a=mc(i),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${i}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=u.getMappedRange();new Uint8Array(l).set(new Uint8Array(t,o,i)),u.unmap();let d=this.backend.device.createCommandEncoder();d.copyBufferToBuffer(u,0,s.gpuData.buffer,0,a),this.backend.device.queue.submit([d.finish()]),u.destroy(),_e("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,n){let t=this.storageCache.get(e);if(!t)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(n);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(t.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=mc(t.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(t.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(e,n,t){let o;if(t){if(o=t[0],e===t[1])return _e("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=Gy();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:e},originalSize:n}),_e("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, registered.`),o}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),_e("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,n=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let t=XO(e),o,i=(n&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(n&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let l=(i?this.freeBuffers:this.freeUniformBuffers).get(t);l?l.length>0?o=l.pop():o=this.backend.device.createBuffer({size:t,usage:n}):o=this.backend.device.createBuffer({size:t,usage:n})}else o=this.backend.device.createBuffer({size:t,usage:n});let s={id:Gy(),type:0,buffer:o};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),_e("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let n=typeof e=="bigint"?Number(e):e,t=this.storageCache.get(n);if(!t){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return _e("verbose",()=>`[WebGPU] GpuDataManager.release(id=${n}), gpuDataId=${t.gpuData.id}`),this.storageCache.delete(n),this.buffersPending.push(t.gpuData.buffer),t.originalSize}async download(e,n){let t=this.storageCache.get(Number(e));if(!t)throw new Error("data does not exist");await bc(this.backend,t.gpuData.buffer,t.originalSize,n)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let n=Vy.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let t=this.freeBuffers.get(e.size)||[];n===void 0||t.length>=n?e.destroy():t.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let t=this.freeUniformBuffers.get(e.size)||[];n===void 0||t.length>=n?e.destroy():t.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let n of this.buffersPending)e.push(n);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let n=this.capturedPendingBuffers.get(e);n&&(n.forEach(t=>{t.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(_e("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Wy=(...r)=>new gc(...r)});var yc,ce,Xe=k(()=>{"use strict";yc=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},ce=r=>new yc(r)});var Wr,vc,Ve,it,W,Ee,wc,Hr,Kt,Q,La,N,G,jy,Ra,_c,qy,ye=k(()=>{"use strict";le();ge();Wr=64,vc=(r,e)=>{if(e===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(r)){case 10:return e>1?`vec${e}<f16>`:"f16";case 1:return e>1?`vec${e}<f32>`:"f32";case 6:return e>1?`vec${e}<i32>`:"i32";case 12:return e>1?`vec${e}<u32>`:"u32";case 7:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(e!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${r}`)}},Ve=(r,e=1)=>{let n=vc(r,e);return typeof n=="string"?n:n[0]},it=(r,e=1)=>{let n=vc(r,e);return typeof n=="string"?n:n[1]},W=(...r)=>{let e=[];return r.forEach(n=>{n.length!==0&&e.push({type:12,data:n},{type:12,data:C.computeStrides(n)})}),e},Ee=r=>r%4===0?4:r%2===0?2:1,wc=(r="f32",e,n="0")=>!e||e===1?`${r}(${n})`:`vec${e}<${r}>(${n})`,Hr=(r,e,n)=>r==="f32"?n:e===1?`f32(${n})`:`vec${e}<f32>(${n})`,Kt=(r,e)=>e===4?`(${r}.x + ${r}.y + ${r}.z + ${r}.w)`:e===2?`(${r}.x + ${r}.y)`:e===3?`(${r}.x + ${r}.y + ${r}.z)`:r,Q=(r,e,n,t)=>r.startsWith("uniforms.")&&n>4?typeof e=="string"?t==="f16"?`${r}[(${e}) / 8][(${e}) % 8 / 4][(${e}) % 8 % 4]`:`${r}[(${e}) / 4][(${e}) % 4]`:t==="f16"?`${r}[${Math.floor(e/8)}][${Math.floor(e%8/4)}][${e%8%4}]`:`${r}[${Math.floor(e/4)}][${e%4}]`:n>1?`${r}[${e}]`:r,La=(r,e,n,t,o)=>{let i=typeof n=="number",a=i?n:n.length,s=[...new Array(a).keys()],u=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,l=vc(e,o),d=typeof l=="string"?l:l[1],f=typeof l=="string"?l:l[0],h={indices:u,value:d,storage:f,tensor:e},g=U=>typeof U=="string"?U:`${U}u`,b={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},_=i?"uniforms.":"",T=`${_}${r}_shape`,v=`${_}${r}_strides`,x="";for(let U=0;U<a-1;U++)x+=`
    let dim${U} = current / ${Q(v,U,a)};
    let rest${U} = current % ${Q(v,U,a)};
    indices[${U}] = dim${U};
    current = rest${U};
    `;x+=`indices[${a-1}] = current;`;let I=a<2?"":`
  fn o2i_${r}(offset: u32) -> ${h.indices} {
    var indices: ${h.indices};
    var current = offset;
    ${x}
    return indices;
  }`,$=U=>(b.offsetToIndices=!0,a<2?U:`o2i_${r}(${U})`),O=[];if(a>=2)for(let U=a-1;U>=0;U--)O.push(`${Q(v,U,a)} * (indices[${U}])`);let E=a<2?"":`
  fn i2o_${r}(indices: ${h.indices}) -> u32 {
    return ${O.join("+")};
  }`,L=U=>(b.indicesToOffset=!0,a<2?U:`i2o_${r}(${U})`),R=(...U)=>a===0?"0u":`${h.indices}(${U.map(g).join(",")})`,F=(U,z)=>a<2?`${U}`:`${Q(U,z,a)}`,q=(U,z,ie)=>a<2?`${U}=${ie};`:`${Q(U,z,a)}=${ie};`,Z={},re=(U,z)=>{b.broadcastedIndicesToOffset=!0;let ie=`${z.name}broadcastedIndicesTo${r}Offset`;if(ie in Z)return`${ie}(${U})`;let ct=[];for(let st=a-1;st>=0;st--){let je=z.indicesGet("outputIndices",st+z.rank-a);ct.push(`${F(v,st)} * (${je} % ${F(T,st)})`)}return Z[ie]=`fn ${ie}(outputIndices: ${z.type.indices}) -> u32 {
             return ${ct.length>0?ct.join("+"):"0u"};
           }`,`${ie}(${U})`},pe=(U,z)=>(()=>{if(h.storage===h.value)return`${r}[${U}]=${z};`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`${r}[${U}]=vec2<u32>(u32(${z}), select(0u, 0xFFFFFFFFu, ${z} < 0));`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`${r}[${U}]=vec2<u32>(u32(${z}), 0u);`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`${r}[${U}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${z}));`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),K=U=>(()=>{if(h.storage===h.value)return`${r}[${U}]`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`i32(${r}[${U}].x)`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`u32(${r}[${U}].x)`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`vec4<bool>(bool(${r}[${U}] & 0xFFu), bool(${r}[${U}] & 0xFF00u), bool(${r}[${U}] & 0xFF0000u), bool(${r}[${U}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),Oe=a<2?"":`
  fn get_${r}ByIndices(indices: ${h.indices}) -> ${d} {
    return ${K(`i2o_${r}(indices)`)};
  }`,fe=a<2?"":(()=>{let U=s.map(ie=>`d${ie}: u32`).join(", "),z=s.map(ie=>`d${ie}`).join(", ");return`
  fn get_${r}(${U}) -> ${d} {
    return get_${r}ByIndices(${R(z)});
  }`})(),J=(...U)=>{if(U.length!==a)throw new Error(`indices length must be ${a}`);let z=U.map(g).join(",");return a===0?K("0u"):a===1?K(z[0]):(b.get=!0,b.getByIndices=!0,b.indicesToOffset=!0,`get_${r}(${z})`)},he=U=>a<2?K(U):(b.getByIndices=!0,b.indicesToOffset=!0,`get_${r}ByIndices(${U})`),ee=a<2?"":`
  fn set_${r}ByIndices(indices: ${h.indices}, value: ${d}) {
    ${pe(`i2o_${r}(indices)`,"value")}
  }`,Te=a<2?"":(()=>{let U=s.map(ie=>`d${ie}: u32`).join(", "),z=s.map(ie=>`d${ie}`).join(", ");return`
  fn set_${r}(${U}, value: ${d}) {
    set_${r}ByIndices(${R(z)}, value);
  }`})();return{impl:()=>{let U=[],z=!1;return b.offsetToIndices&&(U.push(I),z=!0),b.indicesToOffset&&(U.push(E),z=!0),b.broadcastedIndicesToOffset&&(Object.values(Z).forEach(ie=>U.push(ie)),z=!0),b.set&&(U.push(Te),z=!0),b.setByIndices&&(U.push(ee),z=!0),b.get&&(U.push(fe),z=!0),b.getByIndices&&(U.push(Oe),z=!0),!i&&z&&U.unshift(`const ${T} = ${h.indices}(${n.join(",")});`,`const ${v} = ${h.indices}(${C.computeStrides(n).join(",")});`),U.join(`
`)},type:h,offsetToIndices:$,indicesToOffset:L,broadcastedIndicesToOffset:re,indices:R,indicesGet:F,indicesSet:q,set:(...U)=>{if(U.length!==a+1)throw new Error(`indices length must be ${a}`);let z=U[a];if(typeof z!="string")throw new Error("value must be string");let ie=U.slice(0,a).map(g).join(",");return a===0?pe("0u",z):a===1?pe(ie[0],z):(b.set=!0,b.setByIndices=!0,b.indicesToOffset=!0,`set_${r}(${ie}, ${z})`)},setByOffset:pe,setByIndices:(U,z)=>a<2?pe(U,z):(b.setByIndices=!0,b.indicesToOffset=!0,`set_${r}ByIndices(${U}, ${z});`),get:J,getByOffset:K,getByIndices:he,usage:t,name:r,strides:v,shape:T,rank:a}},N=(r,e,n,t=1)=>La(r,e,n,"input",t),G=(r,e,n,t=1)=>La(r,e,n,"output",t),jy=(r,e,n)=>La(r,e,n,"atomicOutput",1),Ra=(r,e,n,t=1)=>La(r,e,n,"internal",t),_c=class{constructor(e,n){this.normalizedDispatchGroup=e;this.limits=n;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Wr){let n=typeof e=="number"?e:e[0],t=typeof e=="number"?1:e[1],o=typeof e=="number"?1:e[2];if(n>this.limits.maxComputeWorkgroupSizeX||t>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${n}, ${t}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(n*t*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${n}, ${t}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${n*t*o}u + local_idx;`;return`@compute @workgroup_size(${n}, ${t}, ${o})
  fn main(${a}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,n){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let t=e.usage==="input"?"read":"read_write",o=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${n}) var<storage, ${t}> ${e.name}: array<${o}>;`}declareVariables(...e){return e.map(n=>this.declareVariable(n,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(n=>this.registerInternalVariable(n)),this}registerUniform(e,n,t=1){return this.uniforms.push({name:e,type:n,length:t}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:n,type:t,length:o}of this.uniforms)if(o&&o>4)t==="f16"?e.push(`@align(16) ${n}:array<mat2x4<${t}>, ${Math.ceil(o/8)}>`):e.push(`${n}:array<vec4<${t}>, ${Math.ceil(o/4)}>`);else{let i=o==null||o===1?t:`vec${o}<${t}>`;e.push(`${n}:${i}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=n=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(n)];return this.uniforms.map(n=>[e(n.type),n.length??1])}},qy=(r,e)=>new _c(r,e)});var JO,Ky,YO,QO,eP,tP,at,Xy,Zy,Yn=k(()=>{"use strict";le();ge();Xe();ye();JO=(r,e)=>{if(!r||r.length!==1)throw new Error("Transpose requires 1 input.");if(e.length!==0&&e.length!==r[0].dims.length)throw new Error(`perm size ${e.length} does not match input rank ${r[0].dims.length}`)},Ky=(r,e)=>e.length!==0?e:[...new Array(r).keys()].reverse(),YO=(r,e)=>C.sortBasedOnPerm(r,Ky(r.length,e)),QO=(r,e,n,t)=>{let o=`fn perm(i: ${t.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let i=0;i<e;++i)o+=`a[${r[i]}]=i[${i}];`;return o+="return a;}"},eP=(r,e)=>{let n=[],t=[];for(let o=0;o<r.length;++o)r[o]!==1&&n.push(r[o]),r[e[o]]!==1&&t.push(e[o]);return{newShape:n,newPerm:t}},tP=(r,e)=>{let n=0;for(let t=0;t<r.length;++t)if(e[r[t]]!==1){if(r[t]<n)return!1;n=r[t]}return!0},at=(r,e)=>{let n=r.dataType,t=r.dims.length,o=Ky(t,e),i=YO(r.dims,o),a=r.dims,s=i,u=t<2||tP(o,r.dims),l;if(u)return l=_=>{let T=N("input",n,a,4),v=G("output",n,s,4);return`
  ${_.registerUniform("output_size","u32").declareVariables(T,v)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=C.size(i);return{outputs:[{dims:i,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(_/64/4)},programUniforms:[{type:12,data:Math.ceil(_/4)}]}},getShaderSource:l};let{newShape:d,newPerm:f}=eP(r.dims,o),h=C.areEqual(f,[2,3,1]),g=C.areEqual(f,[3,1,2]);if(d.length===2||h||g){a=h?[d[0],d[1]*d[2]]:g?[d[0]*d[1],d[2]]:d,s=[a[1],a[0]];let _=16;return l=T=>{let v=N("a",n,a.length),x=G("output",n,s.length);return`
  ${T.registerUniform("output_size","u32").declareVariables(v,x)}
  var<workgroup> tile : array<array<${x.type.value}, ${_+1}>, ${_}>;
  ${T.mainStart([_,_,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${_} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${_}u + local_id.x;
    let input_row = workgroup_id_x * ${_}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${v.getByIndices(`${v.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${_}u + local_id.x;
    let output_row = workgroup_id_y * ${_}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${x.setByIndices(`${x.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let T=C.size(i);return{outputs:[{dims:i,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(s[1]/_),y:Math.ceil(s[0]/_)},programUniforms:[{type:12,data:T},...W(a,s)]}},getShaderSource:l}}return l=_=>{let T=N("a",n,a.length),v=G("output",n,s.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(T,v)}

  ${QO(o,t,T,v)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${v.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${v.setByOffset("global_idx",T.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${e}`,inputDependencies:["rank"]},getRunData:()=>{let _=C.size(i);return{outputs:[{dims:i,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...W(a,s)]}},getShaderSource:l}},Xy=(r,e)=>{JO(r.inputs,e.perm),r.compute(at(r.inputs[0],e.perm))},Zy=r=>ce({perm:r.perm})});var nP,rP,oP,iP,aP,sP,uP,lP,cP,dP,Vn,Jy,Yy,Qy,e_,t_,n_,r_,o_,i_,a_,s_=k(()=>{"use strict";le();ge();ye();za();Yn();nP={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},rP={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},oP={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},iP={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},aP=(r,e)=>{let n=[];for(let t=e-r;t<e;++t)n.push(t);return n},sP=(r,e)=>{let n=[],t=r.length;for(let i=0;i<t;i++)e.indexOf(i)===-1&&n.push(r[i]);let o=e.map(i=>r[i]);return[n,o]},uP=(r,e)=>{let n=r.length+e.length,t=[],o=0;for(let i=0;i<n;i++)e.indexOf(i)===-1?t.push(r[o++]):t.push(1);return t},lP=(r,e)=>{for(let n=0;n<r.length;++n)if(r[r.length-n-1]!==e-1-n)return!1;return!0},cP=(r,e)=>{let n=[];if(!lP(r,e)){for(let t=0;t<e;++t)r.indexOf(t)===-1&&n.push(t);r.forEach(t=>n.push(t))}return n},dP=(r,e,n,t,o,i,a)=>{let s=n[0].dims,u=C.size(i),l=C.size(a),d=N("_A",n[0].dataType,s),f=G("output",o,i),h=64;u===1&&(h=256);let g=`
          var<workgroup> aBestValues : array<f32, ${h}>;
       `,b=_=>`
        ${_.registerUniform("reduceSize","u32").declareVariables(d,f)}
        ${g}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${_.mainStart(h)}

          let outputIndex = global_idx / ${h};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${oP[t]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${h}) {
           let candidate = f32(${d.getByOffset("offset + k")});
           bestValue = ${nP[t]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${h}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${rP[t]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${f.setByOffset("outputIndex",`${t==="mean"?`${f.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${f.type.storage}(${iP[t]})`}`)};
         }
        }`;return{name:r,shaderCache:{hint:`${e};${h}`,inputDependencies:["type"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:u},programUniforms:[{type:12,data:l}]})}},Vn=(r,e,n,t)=>{let o=r.inputs.length===1?n:xc(r.inputs,n),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=r.inputs[0].dims.map((g,b)=>b));let a=C.normalizeAxes(i,r.inputs[0].dims.length),s=a,u=r.inputs[0],l=cP(s,r.inputs[0].dims.length);l.length>0&&(u=r.compute(at(r.inputs[0],l),{inputs:[0],outputs:[-1]})[0],s=aP(s.length,u.dims.length));let[d,f]=sP(u.dims,s),h=d;o.keepDims&&(h=uP(d,a)),r.compute(dP(e,o.cacheKey,[u],t,r.inputs[0].dataType,h,f),{inputs:[u]})},Jy=(r,e)=>{Vn(r,"ReduceMeanShared",e,"mean")},Yy=(r,e)=>{Vn(r,"ReduceL1Shared",e,"l1")},Qy=(r,e)=>{Vn(r,"ReduceL2Shared",e,"l2")},e_=(r,e)=>{Vn(r,"ReduceLogSumExpShared",e,"logSumExp")},t_=(r,e)=>{Vn(r,"ReduceMaxShared",e,"max")},n_=(r,e)=>{Vn(r,"ReduceMinShared",e,"min")},r_=(r,e)=>{Vn(r,"ReduceProdShared",e,"prod")},o_=(r,e)=>{Vn(r,"ReduceSumShared",e,"sum")},i_=(r,e)=>{Vn(r,"ReduceSumSquareShared",e,"sumSquare")},a_=(r,e)=>{Vn(r,"ReduceLogSumShared",e,"logSum")}});var Gn,pP,Ma,xc,Un,fP,hP,mP,gP,bP,yP,_P,vP,wP,xP,Wn,u_,l_,c_,d_,p_,f_,h_,m_,g_,b_,za=k(()=>{"use strict";le();ge();Xe();ye();s_();Gn=r=>{if(!r||r.length===0||r.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(r.length===2&&r[1].dims.length!==1)throw new Error("Invalid axes input dims.")},pP=r=>["","",`var value = ${r.getByIndices("input_indices")};`,""],Ma=(r,e,n,t,o,i,a=!1,s=!1)=>{let u=[],l=n[0].dims,d=l.length,f=C.normalizeAxes(o,d),h=!s&&f.length===0;l.forEach((T,v)=>{h||f.indexOf(v)>=0?a&&u.push(1):u.push(T)});let g=u.length,b=C.size(u);return{name:r,shaderCache:e,getShaderSource:T=>{let v=[],x=N("_A",n[0].dataType,d),I=G("output",i,g),$=t(x,I,f),O=$[2];for(let E=0,L=0;E<d;E++)h||f.indexOf(E)>=0?(a&&L++,O=`for(var j${E}: u32 = 0; j${E} < ${l[E]}; j${E}++) {
                  ${$[2].includes("last_index")?`let last_index = j${E};`:""}
                  ${x.indicesSet("input_indices",E,`j${E}`)}
                  ${O}
                }`):(v.push(`${x.indicesSet("input_indices",E,I.indicesGet("output_indices",L))};`),L++);return`

        ${T.registerUniform("output_size","u32").declareVariables(x,I)}

        ${T.mainStart()}
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${x.type.indices};
          let output_indices = ${I.offsetToIndices("global_idx")};

          ${v.join(`
`)}
          ${$[0]}       // init ops for reduce max/min
          ${$[1]}
          ${O}
          ${$[3]}
          ${$.length===4?I.setByOffset("global_idx","value"):$.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:i}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...W(l,u)]})}},xc=(r,e)=>{let n=[];return r[1].dims[0]>0&&r[1].getBigInt64Array().forEach(t=>n.push(Number(t))),ce({axes:n,keepDims:e.keepDims,noopWithEmptyAxes:e.noopWithEmptyAxes})},Un=(r,e,n,t)=>{let o=r.inputs,i=o.length===1?n:xc(o,n);r.compute(Ma(e,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?pP:t,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},fP=(r,e)=>{Gn(r.inputs),Un(r,"ReduceLogSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,"value = log(value);"])},hP=(r,e)=>{Gn(r.inputs),Un(r,"ReduceL1",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${t.getByIndices("input_indices")});`,""])},mP=(r,e)=>{Gn(r.inputs),Un(r,"ReduceL2",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},gP=(r,e)=>{Gn(r.inputs),Un(r,"ReduceLogSumExp",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${t.getByIndices("input_indices")});`,"value = log(value);"])},bP=(r,e)=>{Gn(r.inputs),Un(r,"ReduceMax",e,(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(t.indicesSet("input_indices",s,0));return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = max(value, ${t.getByIndices("input_indices")});`,""]})},yP=(r,e)=>{Gn(r.inputs),Un(r,"ReduceMean",e,(t,o,i)=>{let a=1;for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=r.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${a});`]})},_P=(r,e)=>{Gn(r.inputs),Un(r,"ReduceMin",e,(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = min(value, ${t.getByIndices("input_indices")});`,""]})},vP=(r,e)=>{Gn(r.inputs),Un(r,"ReduceProd",e,(t,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${t.getByIndices("input_indices")};`,""])},wP=(r,e)=>{Gn(r.inputs),Un(r,"ReduceSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,""])},xP=(r,e)=>{Gn(r.inputs),Un(r,"ReduceSumSquare",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += t * t;`,""])},Wn=(r,e,n)=>{if(e.length===0)return n;let t=1,o=1;for(let i=0;i<e.length;i++)e.indexOf(i)===-1?t*=r[i]:o*=r[i];return o<32&&t>1024},u_=(r,e)=>{Wn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?yP(r,e):Jy(r,e)},l_=(r,e)=>{Wn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?hP(r,e):Yy(r,e)},c_=(r,e)=>{Wn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?mP(r,e):Qy(r,e)},d_=(r,e)=>{Wn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?gP(r,e):e_(r,e)},p_=(r,e)=>{Wn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?bP(r,e):t_(r,e)},f_=(r,e)=>{Wn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?_P(r,e):n_(r,e)},h_=(r,e)=>{Wn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?vP(r,e):r_(r,e)},m_=(r,e)=>{Wn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?wP(r,e):o_(r,e)},g_=(r,e)=>{Wn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?xP(r,e):i_(r,e)},b_=(r,e)=>{Wn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?fP(r,e):a_(r,e)}});var y_,__,v_,Tc,w_=k(()=>{"use strict";le();Xe();za();y_=r=>{if(!r||r.length===0||r.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(r[0].dataType!==1)throw new Error("Invalid input type.")},__=(r,e)=>{y_(r.inputs);let n=(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?"<=":"<"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};r.compute(Ma("ArgMin",{hint:e.cacheKey,inputDependencies:["rank"]},[r.inputs[0]],n,[e.axis],7,e.keepDims),{inputs:[0]})},v_=(r,e)=>{y_(r.inputs);let n=(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?">=":">"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};r.compute(Ma("argMax",{hint:e.cacheKey,inputDependencies:["rank"]},[r.inputs[0]],n,[e.axis],7,e.keepDims),{inputs:[0]})},Tc=r=>ce(r)});var TP,Ic,IP,SP,$P,po,AP,x_,Ba=k(()=>{"use strict";le();ge();Na();ye();TP=(r,e)=>{let n=r[0],t=r[1],o=r[2],i=r[3],a=r[4],s=r[5];if(a&&s)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=n.dims[0],l=n.dims[1],d=n.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(t.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(t.dims[0]!==d)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==t.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let f=o.dims[0]/3,h=f,g=h;if(e.qkvHiddenSizes.length>0){if(e.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let I of e.qkvHiddenSizes)if(I%e.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");f=e.qkvHiddenSizes[0],h=e.qkvHiddenSizes[1],g=e.qkvHiddenSizes[2]}let b=l;if(f!==h)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==f+h+g)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let _=0;if(a){if(h!==g)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==e.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==h/e.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');e.pastPresentShareBuffer||(_=a.dims[3])}let T=b+_,v=-1,x=0;if(i)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(s){if(s.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(s.dims[0]!==u||s.dims[1]!==e.numHeads||s.dims[2]!==l||s.dims[3]!==T)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:_,kvSequenceLength:b,totalSequenceLength:T,maxSequenceLength:v,inputHiddenSize:d,hiddenSize:f,vHiddenSize:g,headSize:Math.floor(f/e.numHeads),vHeadSize:Math.floor(g/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:x,scale:e.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Ic=(r,e,n)=>e&&r?`
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
    `,IP=(r,e,n,t,o,i,a,s)=>{let u=Ee(a?1:i),l=64,d=i/u;d<l&&(l=32);let f=Math.ceil(i/u/l),h=[{type:12,data:e},{type:12,data:n},{type:12,data:t},{type:12,data:o},{type:12,data:d},{type:12,data:f}],g=Ve(r.dataType,u),b=it(1,u),_=["type"];a&&_.push("type"),s&&_.push("type");let T=v=>{let x=G("x",r.dataType,r.dims,u),I=[x],$=a?N("seq_lens",a.dataType,a.dims):void 0;$&&I.push($);let O=s?N("total_sequence_length_input",s.dataType,s.dims):void 0;O&&I.push(O);let E=it(r.dataType),L=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${v.registerUniforms(L).declareVariables(...I)}
  ${v.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Ic($,O,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${l}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${a?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
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
        x[offset + i] = ${x.type.value}(${E}(1.0) / ${E}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${b}(x[offset + i]);
        x[offset + i] = ${x.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${x.type.value}(${E}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${l};${g};${u}`,inputDependencies:_},getShaderSource:T,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:o,z:e*n},programUniforms:h})}},SP=(r,e,n,t,o,i,a,s,u)=>{let l=a+i.kvSequenceLength,d=[i.batchSize,i.numHeads,i.sequenceLength,l],f=r>1&&t,h=i.kvNumHeads?i.kvNumHeads:i.numHeads,g=f?[i.batchSize,h,l,i.headSize]:void 0,b=i.nReps?i.nReps:1,_=i.scale===0?1/Math.sqrt(i.headSize):i.scale,T=Ee(i.headSize),v=i.headSize/T,x=12,I={x:Math.ceil(l/x),y:Math.ceil(i.sequenceLength/x),z:i.batchSize*i.numHeads},$=[{type:12,data:i.sequenceLength},{type:12,data:v},{type:12,data:l},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:_},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:b}],O=f&&t&&C.size(t.dims)>0,E=["type","type"];O&&E.push("type"),o&&E.push("type"),s&&E.push("type"),u&&E.push("type");let L=[{dims:d,dataType:e.dataType,gpuDataType:0}];f&&L.push({dims:g,dataType:e.dataType,gpuDataType:0});let R=F=>{let q=N("q",e.dataType,e.dims,T),Z=N("key",n.dataType,n.dims,T),re=[q,Z];if(O){let ee=N("past_key",t.dataType,t.dims,T);re.push(ee)}o&&re.push(N("attention_bias",o.dataType,o.dims));let pe=s?N("seq_lens",s.dataType,s.dims):void 0;pe&&re.push(pe);let K=u?N("total_sequence_length_input",u.dataType,u.dims):void 0;K&&re.push(K);let Oe=G("output",e.dataType,d),fe=[Oe];f&&fe.push(G("present_key",e.dataType,g,T));let J=it(1,T),he=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${x}u;

  var<workgroup> tileQ: array<${q.type.storage}, ${x*x}>;
  var<workgroup> tileK: array<${q.type.storage}, ${x*x}>;
  ${F.registerUniforms(he).declareVariables(...re,...fe)}
  ${F.mainStart([x,x,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${b===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${b===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Ic(pe,K,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${O&&f?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${f?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${J}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${O&&f?`
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
          value += ${J}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(T){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${T}`)}})()};
        output[outputIdx] = ${Oe.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${T};${o!==void 0};${t!==void 0};${r}`,inputDependencies:E},getRunData:()=>({outputs:L,dispatchGroup:I,programUniforms:$}),getShaderSource:R}},$P=(r,e,n,t,o,i,a=void 0,s=void 0)=>{let u=i+o.kvSequenceLength,l=o.nReps?o.nReps:1,d=o.vHiddenSize*l,f=r>1&&t,h=o.kvNumHeads?o.kvNumHeads:o.numHeads,g=f?[o.batchSize,h,u,o.headSize]:void 0,b=[o.batchSize,o.sequenceLength,d],_=12,T={x:Math.ceil(o.vHeadSize/_),y:Math.ceil(o.sequenceLength/_),z:o.batchSize*o.numHeads},v=[{type:12,data:o.sequenceLength},{type:12,data:u},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:d},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:l}],x=f&&t&&C.size(t.dims)>0,I=["type","type"];x&&I.push("type"),a&&I.push("type"),s&&I.push("type");let $=[{dims:b,dataType:e.dataType,gpuDataType:0}];f&&$.push({dims:g,dataType:e.dataType,gpuDataType:0});let O=E=>{let L=N("probs",e.dataType,e.dims),R=N("v",n.dataType,n.dims),F=[L,R];x&&F.push(N("past_value",t.dataType,t.dims));let q=a?N("seq_lens",a.dataType,a.dims):void 0;a&&F.push(q);let Z=s?N("total_sequence_length_input",s.dataType,s.dims):void 0;s&&F.push(Z);let pe=[G("output",e.dataType,b)];f&&pe.push(G("present_value",e.dataType,g));let K=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;
  var<workgroup> tileQ: array<${L.type.value}, ${_*_}>;
  var<workgroup> tileV: array<${L.type.value}, ${_*_}>;
  ${E.registerUniforms(K).declareVariables(...F,...pe)}
  ${E.mainStart([_,_,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${l===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${l===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Ic(q,Z,!0)}
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${t!==void 0};${r}`,inputDependencies:I},getRunData:()=>({outputs:$,dispatchGroup:T,programUniforms:v}),getShaderSource:O}},po=(r,e,n,t,o,i,a,s,u,l,d=void 0,f=void 0)=>{let h=Math.min(r.outputCount,1+(a?1:0)+(s?1:0)),g=h>1?l.pastSequenceLength:0,b=g+l.kvSequenceLength,_=u&&C.size(u.dims)>0?u:void 0,T=[e,n];h>1&&a&&C.size(a.dims)>0&&T.push(a),_&&T.push(_),d&&T.push(d),f&&T.push(f);let v=r.compute(SP(h,e,n,a,_,l,g,d,f),{inputs:T,outputs:h>1?[-1,1]:[-1]})[0];r.compute(IP(v,l.batchSize,l.numHeads,g,l.sequenceLength,b,d,f),{inputs:d&&f?[v,d,f]:[v],outputs:[]});let x=[v,t];h>1&&s&&C.size(s.dims)>0&&x.push(s),d&&x.push(d),f&&x.push(f),r.compute($P(h,v,t,s,l,g,d,f),{inputs:x,outputs:h>1?[0,2]:[0]})},AP=(r,e)=>{let n=[e.batchSize,e.numHeads,e.sequenceLength,e.headSize],t=e.sequenceLength,o=e.inputHiddenSize,i=e.headSize,a=12,s={x:Math.ceil(e.headSize/a),y:Math.ceil(e.sequenceLength/a),z:e.batchSize*e.numHeads},u=[r.inputs[0],r.inputs[1],r.inputs[2]],l=[{type:12,data:t},{type:12,data:o},{type:12,data:i},{type:12,data:e.numHeads},{type:12,data:e.headSize},{type:12,data:e.hiddenSize},{type:12,data:e.hiddenSize+e.hiddenSize+e.vHiddenSize}],d=f=>{let h=G("output_q",u[0].dataType,n),g=G("output_k",u[0].dataType,n),b=G("output_v",u[0].dataType,n),_=N("input",u[0].dataType,u[0].dims),T=N("weight",u[1].dataType,u[1].dims),v=N("bias",u[2].dataType,u[2].dims),x=_.type.storage,I=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${x}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${x}, ${a*a}>;
  var<workgroup> tileWeightK: array<${x}, ${a*a}>;
  var<workgroup> tileWeightV: array<${x}, ${a*a}>;
  ${f.registerUniforms(I).declareVariables(_,T,v,h,g,b)}
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
  }`};return r.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0}],dispatchGroup:s,programUniforms:l}),getShaderSource:d},{inputs:u,outputs:[-1,-1,-1]})},x_=(r,e)=>{let n=TP(r.inputs,e),[t,o,i]=AP(r,n);return po(r,t,o,i,r.inputs[4],void 0,void 0,void 0,r.inputs[5],n)}});var OP,PP,EP,T_,I_=k(()=>{"use strict";pt();le();ge();Xe();ye();OP=(r,e)=>{if(!r||r.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(t,o,i)=>{let a=o.length;if(a!==t.length)throw new Error(`${i}: num dimensions != ${a}`);o.forEach((s,u)=>{if(s!==t[u])throw new Error(`${i}: dim[${u}] do not match`)})};if(r[0].dims.length>1){let t=e.format==="NHWC"?e.spatial?r[0].dims.slice(-1):r[0].dims.slice(-1).concat(r[0].dims.slice(1,r[0].dims.length-1)):r[0].dims.slice(1,e.spatial?2:void 0);n(r[1].dims,t,"Invalid input scale"),n(r[2].dims,t,"Invalid input B"),n(r[3].dims,t,"Invalid input mean"),n(r[4].dims,t,"Invalid input var")}else n(r[1].dims,[1],"Invalid input scale"),n(r[2].dims,[1],"Invalid input B"),n(r[3].dims,[1],"Invalid input mean"),n(r[4].dims,[1],"Invalid input var")},PP=(r,e)=>{let{epsilon:n,spatial:t,format:o}=e,i=r[0].dims,a=t?Ee(i[i.length-1]):1,s=o==="NHWC"&&i.length>1?a:1,u=C.size(i)/a,l=t,d=l?i.length:i,f=N("x",r[0].dataType,r[0].dims,a),h=N("scale",r[1].dataType,r[1].dims,s),g=N("bias",r[2].dataType,r[2].dims,s),b=N("inputMean",r[3].dataType,r[3].dims,s),_=N("inputVar",r[4].dataType,r[4].dims,s),T=G("y",r[0].dataType,d,a),v=()=>{let I="";if(t)I=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${a}`:"outputIndices[1]"};`;else if(o==="NCHW")I=`
            ${T.indicesSet("outputIndices","0","0")}
            let cOffset = ${T.indicesToOffset("outputIndices")};`;else{I=`var cIndices = ${h.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let $=1;$<h.rank;$++)I+=`cIndices[${$}] = outputIndices[${$}];`;I+=`let cOffset = ${h.indicesToOffset("cIndices")};`}return I},x=I=>`
  const epsilon = ${n};
  ${I.registerUniform("outputSize","u32").declareVariables(f,h,g,b,_,T)}
  ${I.mainStart()}
  ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${T.offsetToIndices(`global_idx * ${a}`)};
    ${v()}
    let scale = ${h.getByOffset("cOffset")};
    let bias = ${g.getByOffset("cOffset")};
    let inputMean = ${b.getByOffset("cOffset")};
    let inputVar = ${_.getByOffset("cOffset")};
    let x = ${f.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${T.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${e.epsilon}_${e.format}_${t}_${a}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:x,getRunData:()=>({outputs:[{dims:r[0].dims,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l?[{type:12,data:u},...W(i)]:[{type:12,data:u}]})}},EP=r=>ce(r),T_=(r,e)=>{let{inputs:n,outputCount:t}=r,o=EP({...e,outputCount:t});if(me.webgpu.validateInputContent&&OP(n,o),e.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");r.compute(PP(n,o))}});var CP,DP,S_,$_=k(()=>{"use strict";ge();ye();CP=r=>{if(r[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(r[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(r[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(r[0].dims[2]!==r[1].dims[0])throw new Error("last dimension of input and bias are not the same")},DP=r=>{let e=r[0].dims,n=r[0].dims[2],t=C.size(e)/4,o=r[0].dataType,i=N("input",o,e,4),a=N("bias",o,[n],4),s=N("residual",o,e,4),u=G("output",o,e,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:e,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)}}),getShaderSource:d=>`
  const channels = ${n}u / 4;
  ${d.declareVariables(i,a,s,u)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(t)}
    let value = ${i.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${s.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},S_=r=>{CP(r.inputs),r.compute(DP(r.inputs))}});var kP,Le,A_,O_,P_,E_,C_,D_,k_,N_,L_,NP,R_,z_,M_,B_,Wo,F_,Fa,V_,G_,U_,W_,H_,j_,q_,K_,X_,Z_,J_,Y_,Q_,ev,tv,nv,rv,ov,Sc,$c,iv,av,sv,LP,RP,uv,Va=k(()=>{"use strict";le();ge();Xe();ye();kP=(r,e,n,t,o,i,a)=>{let s=Math.ceil(e/4),u="";typeof o=="string"?u=`${o}(a)`:u=o("a");let l=N("inputData",n,[s],4),d=G("outputData",t,[s],4),f=[{name:"vec_size",type:"u32"}];return a&&f.push(...a),`
      ${r.registerUniforms(f).declareVariables(l,d)}

  ${i??""}

  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${d.setByOffset("global_idx",u)}
  }`},Le=(r,e,n,t,o,i=r.dataType,a,s)=>{let u=[{type:12,data:Math.ceil(C.size(r.dims)/4)}];return a&&u.push(...a),{name:e,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:l=>kP(l,C.size(r.dims),r.dataType,i,n,t,s),getRunData:l=>({outputs:[{dims:r.dims,dataType:i}],dispatchGroup:{x:Math.ceil(C.size(l[0].dims)/64/4)},programUniforms:u})}},A_=r=>{r.compute(Le(r.inputs[0],"Abs","abs"))},O_=r=>{r.compute(Le(r.inputs[0],"Acos","acos"))},P_=r=>{r.compute(Le(r.inputs[0],"Acosh","acosh"))},E_=r=>{r.compute(Le(r.inputs[0],"Asin","asin"))},C_=r=>{r.compute(Le(r.inputs[0],"Asinh","asinh"))},D_=r=>{r.compute(Le(r.inputs[0],"Atan","atan"))},k_=r=>{r.compute(Le(r.inputs[0],"Atanh","atanh"))},N_=r=>ce(r),L_=(r,e)=>{let n;switch(e.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${e.to}`)}r.compute(Le(r.inputs[0],"Cast",n,void 0,e.cacheKey,e.to))},NP=r=>{let e,n,t=r.length>=2&&r[1].data!==0,o=r.length>=3&&r[2].data!==0;switch(r[0].dataType){case 1:e=t?r[1].getFloat32Array()[0]:-34028234663852886e22,n=o?r[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:e=t?r[1].getUint16Array()[0]:64511,n=o?r[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return ce({min:e,max:n})},R_=(r,e)=>{let n=e||NP(r.inputs),t=it(r.inputs[0].dataType);r.compute(Le(r.inputs[0],"Clip",o=>`clamp(${o}, vec4<${t}>(uniforms.min), vec4<${t}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:r.inputs[0].dataType,data:n.min},{type:r.inputs[0].dataType,data:n.max}],[{name:"min",type:t},{name:"max",type:t}]),{inputs:[0]})},z_=r=>{r.compute(Le(r.inputs[0],"Ceil","ceil"))},M_=r=>{r.compute(Le(r.inputs[0],"Cos","cos"))},B_=r=>{r.compute(Le(r.inputs[0],"Cosh","cosh"))},Wo=r=>ce(r),F_=(r,e)=>{let n=it(r.inputs[0].dataType);r.compute(Le(r.inputs[0],"Elu",t=>`elu_vf32(${t})`,`
  const elu_alpha_ = ${n}(${e.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,e.cacheKey))},Fa=(r="f32")=>`
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
}`,V_=r=>{let e=it(r.inputs[0].dataType);r.compute(Le(r.inputs[0],"Erf",n=>`erf_vf32(${n})`,Fa(e)))},G_=r=>{r.compute(Le(r.inputs[0],"Exp","exp"))},U_=r=>{r.compute(Le(r.inputs[0],"Floor","floor"))},W_=r=>{let e=it(r.inputs[0].dataType);r.compute(Le(r.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,Fa(e)))},H_=(r,e)=>{let n=it(r.inputs[0].dataType);r.compute(Le(r.inputs[0],"LeakyRelu",t=>`select(leaky_relu_alpha_ * ${t}, ${t}, ${t} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${e.alpha});`,e.cacheKey))},j_=r=>{r.compute(Le(r.inputs[0],"Not",e=>`!${e}`))},q_=r=>{r.compute(Le(r.inputs[0],"Neg",e=>`-${e}`))},K_=r=>{r.compute(Le(r.inputs[0],"Reciprocal",e=>`1.0/${e}`))},X_=r=>{let e=it(r.inputs[0].dataType);r.compute(Le(r.inputs[0],"Relu",n=>`select(vec4<${e}>(0.0), ${n}, ${n} > vec4<${e}>(0.0))`))},Z_=r=>{r.compute(Le(r.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},J_=r=>ce(r),Y_=(r,e)=>{let n=it(r.inputs[0].dataType);r.compute(Le(r.inputs[0],"HardSigmoid",t=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${e.alpha} * ${t} + vec4<${n}>(${e.beta})))`,void 0,e.cacheKey))},Q_=r=>{r.compute(Le(r.inputs[0],"Sin","sin"))},ev=r=>{r.compute(Le(r.inputs[0],"Sinh","sinh"))},tv=r=>{r.compute(Le(r.inputs[0],"Sqrt","sqrt"))},nv=r=>{r.compute(Le(r.inputs[0],"Tan","tan"))},rv=r=>`sign(${r}) * (1 - exp(-2 * abs(${r}))) / (1 + exp(-2 * abs(${r})))`,ov=r=>{r.compute(Le(r.inputs[0],"Tanh",rv))},Sc=(r="f32")=>`
const fast_gelu_a: ${r} = 0.5;
const fast_gelu_b: ${r} = 0.7978845608028654;
const fast_gelu_c: ${r} = 0.035677408136300125;

fn tanh_v(v: vec4<${r}>) -> vec4<${r}> {
  return ${rv("v")};
}
`,$c=r=>`(fast_gelu_a + fast_gelu_a * tanh_v(${r} * (fast_gelu_c * ${r} * ${r} + fast_gelu_b))) * ${r}`,iv=r=>{let e=it(r.inputs[0].dataType);r.compute(Le(r.inputs[0],"FastGelu",$c,Sc(e),void 0,r.inputs[0].dataType))},av=(r,e)=>{let n=it(r.inputs[0].dataType);return r.compute(Le(r.inputs[0],"ThresholdedRelu",t=>`select(vec4<${n}>(0.0), ${t}, ${t} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${e.alpha});`,e.cacheKey)),0},sv=r=>{r.compute(Le(r.inputs[0],"Log","log"))},LP=(r,e)=>`
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
`,RP=r=>`quick_gelu_impl(${r})`,uv=(r,e)=>{let n=it(r.inputs[0].dataType);r.compute(Le(r.inputs[0],"QuickGelu",RP,LP(n,e.alpha),e.cacheKey,r.inputs[0].dataType))}});var zP,MP,cv,dv=k(()=>{"use strict";ge();ye();Va();zP=r=>{if(r[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(r[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(r[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(r[0].dims[2]!==r[1].dims[0])throw new Error("last dimension of input and bias are not the same")},MP=r=>{let e=r[0].dims.slice();e[2]=e[2]/2;let n=N("input",r[0].dataType,r[0].dims,4),t=N("bias",r[0].dataType,[r[0].dims[2]],4),o=G("output",r[0].dataType,e,4),i=C.size(e)/4,a=Ve(r[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:e,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${r[0].dims[2]/4/2}u;

  ${u.declareVariables(n,t,o)}

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
  }`}},cv=r=>{zP(r.inputs),r.compute(MP(r.inputs))}});var BP,FP,Hn,pv,fv,hv,mv,gv,bv,yv,_v,vv,wv,xv=k(()=>{"use strict";le();ge();ye();BP=(r,e,n,t,o,i,a,s,u,l,d,f)=>{let h,g;typeof s=="string"?h=g=(x,I)=>`${s}((${x}),(${I}))`:typeof s=="function"?h=g=s:(h=s.scalar,g=s.vector);let b=G("outputData",d,t.length,4),_=N("aData",u,e.length,4),T=N("bData",l,n.length,4),v;if(o)if(i){let x=C.size(e)===1,I=C.size(n)===1,$=e.length>0&&e[e.length-1]%4===0,O=n.length>0&&n[n.length-1]%4===0;x||I?v=b.setByOffset("global_idx",g(x?`${_.type.value}(${_.getByOffset("0")}.x)`:_.getByOffset("global_idx"),I?`${T.type.value}(${T.getByOffset("0")}.x)`:T.getByOffset("global_idx"))):v=`
            let outputIndices = ${b.offsetToIndices("global_idx * 4u")};
            let offsetA = ${_.broadcastedIndicesToOffset("outputIndices",b)};
            let offsetB = ${T.broadcastedIndicesToOffset("outputIndices",b)};
            ${b.setByOffset("global_idx",g(a||$?_.getByOffset("offsetA / 4u"):`${_.type.value}(${_.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||O?T.getByOffset("offsetB / 4u"):`${T.type.value}(${T.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else v=b.setByOffset("global_idx",g(_.getByOffset("global_idx"),T.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let x=(I,$,O="")=>{let E=`aData[indexA${$}][componentA${$}]`,L=`bData[indexB${$}][componentB${$}]`;return`
            let outputIndices${$} = ${b.offsetToIndices(`global_idx * 4u + ${$}u`)};
            let offsetA${$} = ${_.broadcastedIndicesToOffset(`outputIndices${$}`,b)};
            let offsetB${$} = ${T.broadcastedIndicesToOffset(`outputIndices${$}`,b)};
            let indexA${$} = offsetA${$} / 4u;
            let indexB${$} = offsetB${$} / 4u;
            let componentA${$} = offsetA${$} % 4u;
            let componentB${$} = offsetB${$} % 4u;
            ${I}[${$}] = ${O}(${h(E,L)});
          `};d===9?v=`
            var data = vec4<u32>(0);
            ${x("data",0,"u32")}
            ${x("data",1,"u32")}
            ${x("data",2,"u32")}
            ${x("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:v=`
            ${x("outputData[global_idx]",0)}
            ${x("outputData[global_idx]",1)}
            ${x("outputData[global_idx]",2)}
            ${x("outputData[global_idx]",3)}
          `}return`
        ${r.registerUniform("vec_size","u32").declareVariables(_,T,b)}

        ${f??""}

        ${r.mainStart()}
        ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`},FP=(r,e,n,t,o,i,a=n.dataType)=>{let s=n.dims.map(_=>Number(_)??1),u=t.dims.map(_=>Number(_)??1),l=!C.areEqual(s,u),d=s,f=C.size(s),h=!1,g=!1,b=[l];if(l){let _=Fn.calcShape(s,u,!1);if(!_)throw new Error("Can't perform binary op on the given tensors");d=_.slice(),f=C.size(d);let T=C.size(s)===1,v=C.size(u)===1,x=s.length>0&&s[s.length-1]%4===0,I=u.length>0&&u[u.length-1]%4===0;b.push(T),b.push(v),b.push(x),b.push(I);let $=1;for(let O=1;O<d.length;O++){let E=s[s.length-O],L=u[u.length-O];if(E===L)$*=E;else break}$%4===0?(g=!0,h=!0):(T||v||x||I)&&(h=!0)}else h=!0;return b.push(h),{name:r,shaderCache:{hint:e+b.map(_=>_.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:_=>BP(_,s,u,d,h,l,g,o,n.dataType,t.dataType,a,i),getRunData:()=>({outputs:[{dims:d,dataType:a}],dispatchGroup:{x:Math.ceil(f/64/4)},programUniforms:[{type:12,data:Math.ceil(C.size(d)/4)},...W(s,u,d)]})}},Hn=(r,e,n,t,o,i)=>{r.compute(FP(e,o??"",r.inputs[0],r.inputs[1],n,t,i))},pv=r=>{Hn(r,"Add",(e,n)=>`${e}+${n}`)},fv=r=>{Hn(r,"Div",(e,n)=>`${e}/${n}`)},hv=r=>{Hn(r,"Equal",{scalar:(e,n)=>`u32(${e}==${n})`,vector:(e,n)=>`vec4<u32>(${e}==${n})`},void 0,void 0,9)},mv=r=>{Hn(r,"Mul",(e,n)=>`${e}*${n}`)},gv=r=>{let e=N("input",r.inputs[0].dataType,r.inputs[0].dims).type.value;Hn(r,"Pow",{scalar:(t,o)=>`pow_custom(${t},${o})`,vector:(t,o)=>`pow_vector_custom(${t},${o})`},`
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
      `)},bv=r=>{Hn(r,"Sub",(e,n)=>`${e}-${n}`)},yv=r=>{Hn(r,"Greater",{scalar:(e,n)=>`u32(${e}>${n})`,vector:(e,n)=>`vec4<u32>(${e}>${n})`},void 0,void 0,9)},_v=r=>{Hn(r,"Less",{scalar:(e,n)=>`u32(${e}<${n})`,vector:(e,n)=>`vec4<u32>(${e}<${n})`},void 0,void 0,9)},vv=r=>{Hn(r,"GreaterOrEqual",{scalar:(e,n)=>`u32(${e}>=${n})`,vector:(e,n)=>`vec4<u32>(${e}>=${n})`},void 0,void 0,9)},wv=r=>{Hn(r,"LessOrEqual",{scalar:(e,n)=>`u32(${e}<=${n})`,vector:(e,n)=>`vec4<u32>(${e}<=${n})`},void 0,void 0,9)}});var GP,UP,WP,HP,Tv,Iv,Sv=k(()=>{"use strict";le();ge();Xe();ye();GP=(r,e)=>{if(!r||r.length<1)throw new Error("too few inputs");let n=0,t=r[n],o=t.dataType,i=t.dims.length;r.forEach((a,s)=>{if(s!==n){if(a.dataType!==o)throw new Error("input tensors should be one type");if(a.dims.length!==i)throw new Error("input tensors should have the same shape");a.dims.forEach((u,l)=>{if(l!==e&&u!==t.dims[l])throw new Error("non concat dimensions must match")})}})},UP=(r,e)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${r}u>(${e});
    for (var i: u32 = 0u; i < ${r}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${r}u;
  }`,WP=(r,e)=>{let n=r.length,t=[];for(let o=0;o<n;++o){let i=e.setByOffset("global_idx",r[o].getByIndices("indices"));n===1?t.push(i):o===0?t.push(`if (inputIndex == ${o}u) { ${i} }`):o===n-1?t.push(`else { ${i} }`):t.push(`else if (inputIndex == ${o}) { ${i} }`)}return t.join(`
`)},HP=(r,e,n,t)=>{let o=C.size(n),i=new Array(r.length),a=new Array(r.length),s=0,u=[],l=[],d=[{type:12,data:o}];for(let _=0;_<r.length;++_)s+=r[_].dims[e],i[_]=s,l.push(r[_].dims.length),a[_]=N(`input${_}`,t,l[_]),u.push("rank"),d.push({type:12,data:i[_]});for(let _=0;_<r.length;++_)d.push(...W(r[_].dims));d.push(...W(n));let f=G("output",t,n.length),h=f.indicesGet("indices",e),g=Array.from(Array(i.length).keys()).map(_=>`uniforms.sizeInConcatAxis${_}`).join(","),b=_=>`

  ${(()=>{_.registerUniform("outputSize","u32");for(let T=0;T<r.length;T++)_.registerUniform(`sizeInConcatAxis${T}`,"u32");return _.declareVariables(...a,f)})()}

  ${UP(i.length,g)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${f.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${g});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${WP(a,f)}
  }`;return{name:"Concat",shaderCache:{hint:`${e}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:d}),getShaderSource:b}},Tv=(r,e)=>{let n=r.inputs,t=n[0].dims,o=C.normalizeAxis(e.axis,t.length);GP(n,o);let i=t.slice();i[o]=n.reduce((s,u)=>s+(u.dims.length>o?u.dims[o]:0),0);let a=n.filter(s=>C.size(s.dims)>0);r.compute(HP(a,o,i,n[0].dataType),{inputs:a})},Iv=r=>ce({axis:r.axis})});var Xt,Zt,Jt,Ga,wr=k(()=>{"use strict";le();ge();Xt=(r,e,n="f32")=>{switch(r.activation){case"Relu":return`value = max(value, ${e}(0.0));`;case"Sigmoid":return`value = (${e}(1.0) / (${e}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${e}(${n}(uniforms.clip_min)), ${e}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${e}(0.0), min(${e}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${e}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${r.activation}`)}},Zt=(r,e)=>{r.activation==="Clip"?e.push({type:1,data:r.clipMax},{type:1,data:r.clipMin}):r.activation==="HardSigmoid"?e.push({type:1,data:r.alpha},{type:1,data:r.beta}):r.activation==="LeakyRelu"&&e.push({type:1,data:r.alpha})},Jt=(r,e)=>{r.activation==="Clip"?e.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):r.activation==="HardSigmoid"?e.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):r.activation==="LeakyRelu"&&e.push({name:"alpha",type:"f32"})},Ga=r=>{let e=r?.activation||"";if(e==="HardSigmoid"){let[n,t]=r?.activation_params||[.2,.5];return{activation:e,alpha:n,beta:t}}else if(e==="Clip"){let[n,t]=r?.activation_params||[Dy,ky];return{activation:e,clipMax:t,clipMin:n}}else if(e==="LeakyRelu"){let[n]=r?.activation_params||[.01];return{activation:e,alpha:n}}return{activation:e}}});var rt,$v,Ua=k(()=>{"use strict";rt=(r,e)=>{switch(r){case 1:return e;case 2:return`vec2<${e}>`;case 3:return`vec3<${e}>`;case 4:return`vec4<${e}>`;default:throw new Error(`${r}-component is not supported.`)}},$v=r=>`
      ${r?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Av,Ov=k(()=>{"use strict";Av=r=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${r}.x), i32(${r}.y), i32(${r}.z), 1));
}
`});var Ho,Wa,Ha=k(()=>{"use strict";le();ge();ye();wr();Ho=(r,e,n,t,o)=>{let i=t-n;return`
      ${Array.from({length:n}).map((a,s)=>`
      if (${Q(e.shape,s,e.rank)} != 1) {
        ${e.indicesSet(r,s,Q(o,s+i,t))}
      } else {
        ${e.indicesSet(r,s,0)}
      }`).join("")}
`},Wa=(r,e,n,t,o=!1,i)=>{let a=r[0].dims,s=r[1].dims,u=a[a.length-2],l=s[s.length-1],d=a[a.length-1],f=Ee(l),h=Ee(d),g=Ee(u),b=C.size(n)/f/g,_=r.length>2,T=t?t.slice(0,-2):n.slice(0,-2),x=[C.size(T),u,l],I=[{type:12,data:b},{type:12,data:u},{type:12,data:l},{type:12,data:d}];Zt(e,I),I.push(...W(T,a,s)),_&&I.push(...W(r[2].dims)),I.push(...W(x));let $=O=>{let E=Ra("batch_dims",r[0].dataType,T.length),L=N("a",r[0].dataType,a.length,h),R=N("b",r[1].dataType,s.length,f),F=G("output",r[0].dataType,x.length,f),q=Ve(F.type.tensor),Z=Xt(e,F.type.value,q),re=[L,R],pe="";if(_){let fe=o?f:1;re.push(N("bias",r[2].dataType,r[2].dims.length,fe)),pe=`${o?`value += bias[col / ${fe}];`:`value += ${F.type.value}(bias[row + i]);`}`}let K=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Jt(e,K);let Oe=()=>{let fe=`var a_data: ${L.type.value};`;for(let J=0;J<h;J++)fe+=`
              let b_data${J} = b[(b_offset + (k + ${J}) * uniforms.N + col) / ${f}];`;for(let J=0;J<g;J++){fe+=`a_data = a[(a_offset + (row + ${J}) * uniforms.K + k) / ${h}];`;for(let he=0;he<h;he++)fe+=`
            values[${J}] = fma(${R.type.value}(a_data${h===1?"":`[${he}]`}), b_data${he}, values[${J}]);
`}return fe};return`
  ${O.registerUniforms(K).registerInternalVariables(E).declareVariables(...re,F)}
  ${O.mainStart()}
    ${O.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${f})) * ${f};
    var index1 = global_idx / (uniforms.N / ${f});
    let stride1 = uniforms.M / ${g};
    let row = (index1 % stride1) * ${g};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${E.offsetToIndices("batch")};`}

    var a_indices: ${L.type.indices};
    ${Ho("a_indices",L,L.rank-2,E.rank,"batch_indices")}
    ${L.indicesSet("a_indices",L.rank-2,0)}
    ${L.indicesSet("a_indices",L.rank-1,0)}
    let a_offset = ${L.indicesToOffset("a_indices")};

    var b_indices: ${R.type.indices};
    ${Ho("b_indices",R,R.rank-2,E.rank,"batch_indices")}
    ${R.indicesSet("b_indices",R.rank-2,0)}
    ${R.indicesSet("b_indices",R.rank-1,0)}
    let b_offset = ${R.indicesToOffset("b_indices")};
    var values: array<${F.type.value}, ${g}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${Oe()}
    }
    for (var i = 0u; i < ${g}u; i++) {
      var value = values[i];
      ${pe}
      ${Z}
      let cur_indices = ${F.type.indices}(batch, row + i, col);
      let offset = ${F.indicesToOffset("cur_indices")};
      ${F.setByOffset(`offset / ${f}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${e.activation};${f};${h};${g};${o}`,inputDependencies:_?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:I}),getShaderSource:$}}});var jP,qP,Ac,Pv,KP,Oc,XP,jo,ja=k(()=>{"use strict";le();ge();ye();wr();Ha();Ua();jP=(r,e)=>r?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${e?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${e?", batchIndices":""});
        `,qP=(r,e)=>r?`
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
        }`,Ac=(r,e,n="f32",t,o=!1,i=32,a=!1,s=32)=>{let u=e[1]*r[1],l=e[0]*r[0],d=o?u:i,f=o?i:u,h=d/e[0],g=i/e[1];if(!((o&&h===4&&r[1]===4||!o&&(h===3||h===4))&&d%e[0]===0&&i%e[1]===0&&r[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${h} and workPerThread[1] ${r[1]} must be 4.
      Otherwise, innerElementSize ${h} must be 3 or 4.
  tileAWidth ${d} must be divisible by workgroupSize[0]${e[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${e[1]}. colPerThread ${r[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${h}<${n}>, ${d/h}>, ${f}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${l/r[0]}>, ${i}>;

const rowPerThread = ${r[1]};
const colPerThread = ${r[0]};
const innerElementSize = ${h};
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

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${g};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${jP(o,t)}
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
          ${h===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${qP(o,h)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Pv=(r,e)=>r?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${e?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${e?", batchIndices":""});
            `,KP=r=>r?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Oc=(r,e,n="f32",t,o=!1,i=32,a=!1,s=32,u=!1)=>{let l=r[1]*e[1],d=r[0]*e[0],f=o?l:i,h=o?i:l;if(!(h%e[1]===0&&f%e[0]===0&&i%e[1]===0))throw new Error(`tileAHight ${h} must be divisible by workgroupSize[1]${e[1]}, tileAWidth ${f} must be divisible by workgroupSize[0]${e[0]}, tileInner ${i} must be divisible by workgroupSize[1]${e[1]}`);let g=h/e[1],b=f/e[0],_=i/e[1],T=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${d};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${e[1]}) {
        for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${e[0]}) {
          ${Pv(o,t)}
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
let tileRowB = i32(localId.y) * ${_};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${b}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Pv(o,t)}
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
  var BCached : array<${n}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${KP(o)}
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
  var<workgroup> mm_Asub : array<array<${n}, ${f}>, ${h}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${d}>, ${i}>;
  const rowPerThread = ${r[1]};
  const colPerThread = ${r[0]};
  const tileInner = ${i};

@compute @workgroup_size(${e[0]}, ${e[1]}, ${e[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${a?"0":"i32(globalId.z)"};
    ${t?`let batchIndices = ${t.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${a?`${Math.ceil(s/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${a?`i32(globalId.z) * ${s}`:"0"};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${T}
  }
`},XP=(r,e,n,t,o=!1)=>{let[i,a,s,u]=t,l=Ve(t[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${rt(r,l)} {
      var value = ${rt(r,l)}(0.0);
      let col = colIn * ${r};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${Ho("aIndices",a,a.rank-2,i.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${rt(r,l)} {
      var value = ${rt(r,l)}(0.0);
      let col = colIn * ${r};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${s.type.indices};
        ${Ho("bIndices",s,s.rank-2,i.rank,"batchIndices")}
        ${s.indicesSet("bIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("bIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("bIndices")};
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
    `},jo=(r,e,n,t,o=!1,i)=>{let a=r[0].dims,s=r[1].dims,u=a.slice(0,-2),l=s.slice(0,-2),d=t?t.slice(0,-2):n.slice(0,-2),f=C.size(d),h=a[a.length-2],g=a[a.length-1],b=s[s.length-1],_=g%4===0&&b%4===0,T=h<=8?[4,1,1]:[4,4,1],v=[8,8,1],x=[Math.ceil(b/v[0]/T[0]),Math.ceil(h/v[1]/T[1]),Math.ceil(f/v[2]/T[2])],I=_?4:1,$=[...u,h,g/I],O=$.length,E=[...l,g,b/I],L=E.length,R=[f,h,b/I],F=[{type:6,data:h},{type:6,data:b},{type:6,data:g}];Zt(e,F),F.push(...W(d,$,E));let q=["rank","rank"],Z=r.length>2;Z&&(F.push(...W(r[2].dims)),q.push("rank")),F.push(...W(R));let re=pe=>{let K=d.length,Oe=Ra("batchDims",r[0].dataType,K,1),fe=Ve(r[0].dataType),J=N("a",r[0].dataType,O,I),he=N("b",r[1].dataType,L,I),ee=G("result",r[0].dataType,R.length,I),Te=[J,he];if(Z){let z=o?I:1;Te.push(N("bias",r[2].dataType,r[2].dims.length,z))}let Ze=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Jt(e,Ze);let Se=Ve(ee.type.tensor),ae=Xt(e,ee.type.value,Se),U=XP(I,Z,ae,[Oe,J,he,ee],o);return`
  ${pe.registerUniforms(Ze).registerInternalVariables(Oe).declareVariables(...Te,ee)}
  ${U}
  ${_?Ac(T,v,fe,Oe):Oc(T,v,fe,Oe)}
                   `};return{name:"MatMul",shaderCache:{hint:`${T};${e.activation};${_};${o}`,inputDependencies:q},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:r[0].dataType}],dispatchGroup:{x:x[0],y:x[1],z:x[2]},programUniforms:F}),getShaderSource:re}}});var ZP,Ev,Cv=k(()=>{"use strict";le();Bn();ye();wr();Ua();Ov();ja();ZP=(r,e,n,t,o=!1,i,a=4,s=4,u=4,l="f32")=>{let d=q=>{switch(q){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${q} is not supported.`)}},f=q=>{switch(q){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${q} is not supported.`)}},h=r?`
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
    `,b=r?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",_=r?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",T=r?"row":"col",v=r?"col":"row",x=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${r?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${T} / outWidth;
    let outCol = ${T} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${rt(a,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${b} && xCol >= 0 && xCol < ${_}) {
      ${h}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${d(a)}
    }
    return resData;`,I=r?e&&t?`
    let col = colIn * ${a};
    ${x}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${x}
    }
    return ${rt(a,l)}(0.0);`:t&&n?`
    let col = colIn * ${a};
    ${x}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${x}
    }
    return ${rt(a,l)}(0.0);`,$=r?t&&n?f(s):`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${f(s)}
    }
    return ${rt(s,l)}(0.0);`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${f(s)}
    }
    return ${rt(s,l)}(0.0);`,O=rt(u,l),E=r?rt(a,l):rt(s,l),L=r?rt(s,l):rt(a,l),R=Xt(i,O,l);return`
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
      ${$v(o)}
      ${R}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Ev=(r,e,n,t,o,i,a,s,u)=>{let l=e.format==="NHWC",d=l?r[0].dims[3]:r[0].dims[1],f=n[0],h=l?n[2]:n[3],g=l?n[1]:n[2],b=l?n[3]:n[1],_=l&&(d%4===0||d%3===0)&&b%4===0,T=l?b:h*g,v=l?h*g:b,x=[8,8,1],I=t<=8?[4,1,1]:[4,4,1],$=[Math.ceil(T/x[0]/I[0]),Math.ceil(v/x[1]/I[1]),Math.ceil(f/x[2]/I[2])];_e("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${$}`);let O=_?l&&d%4!==0?3:4:1,E=x[1]*I[1],L=x[0]*I[0],R=Math.max(x[0]*O,x[1]),F=t%E===0,q=o%L===0,Z=i%R===0,re=_?[O,4,4]:[1,1,1],pe=[{type:6,data:t},{type:6,data:o},{type:6,data:i},{type:6,data:[e.pads[0],e.pads[1]]},{type:6,data:e.strides},{type:6,data:e.dilations}];Zt(e,pe),pe.push(...W(r[0].dims,r[1].dims));let K=["rank","rank"];a&&(pe.push(...W(r[2].dims)),K.push("rank")),pe.push(...W(n));let Oe=fe=>{let J=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Jt(e,J);let he=_?4:1,ee=Ve(r[0].dataType),Te=`
      fn setOutputAtIndex(flatIndex : i32, value : ${_?`vec4<${ee}>`:ee}) {
        result[flatIndex] = ${_?`vec4<${ee}>`:ee}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${_?`vec4<${ee}>`:ee}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${_?"/ 4":""}, value);
      }`,Ze=N("x",r[0].dataType,r[0].dims.length,O===3?1:O),Se=N("w",r[1].dataType,r[1].dims.length,he),ae=[Ze,Se],U=G("result",r[0].dataType,n.length,he);if(a){let z=N("bias",r[2].dataType,r[2].dims.length,he);ae.push(z),Te+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${_?`vec4<${ee}>`:ee} {
          return bias[coords.${l?"w":"y"}${_?"/ 4":""}];
        }`}return`
        ${Av("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${fe.registerUniforms(J).declareVariables(...ae,U)}
        ${Te}
        ${ZP(l,F,q,Z,a,e,re[0],re[1],re[2],ee)}
        ${_?Ac(I,x,ee,void 0,!l,R):Oc(I,x,ee,void 0,!l,R,!1,void 0,s)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${e.cacheKey};${O};${_};${F};${q};${Z};${E};${L};${R}`,inputDependencies:K},getRunData:()=>({outputs:[{dims:u?u(n):n,dataType:r[0].dataType}],dispatchGroup:{x:$[0],y:$[1],z:$[2]},programUniforms:pe}),getShaderSource:Oe}}});var JP,Dv,qa,YP,kv,QP,Nv,Lv,Rv=k(()=>{"use strict";le();Bn();ge();ye();wr();Ua();JP=r=>{let e=1;for(let n=0;n<r.length;n++)e*=r[n];return e},Dv=r=>typeof r=="number"?[r,r,r]:r,qa=(r,e)=>e<=1?r:r+(r-1)*(e-1),YP=(r,e,n,t=1)=>{let o=qa(e,t);return Math.floor((r[0]*(n-1)-n+o)/2)},kv=(r,e,n,t,o)=>{o==null&&(o=YP(r,e[0],t[0]));let i=[0,0,0,n];for(let a=0;a<3;a++)r[a]+2*o>=e[a]&&(i[a]=Math.trunc((r[a]-e[a]+2*o)/t[a]+1));return i},QP=(r,e,n,t,o,i,a,s,u,l)=>{let d,f,h,g;if(r==="VALID"&&(r=0),typeof r=="number"){d={top:r,bottom:r,left:r,right:r,front:r,back:r};let b=kv([e,n,t,1],[s,u,l],1,[o,i,a],r);f=b[0],h=b[1],g=b[2]}else if(Array.isArray(r)){if(!r.every((_,T,v)=>_===v[0]))throw Error(`Unsupported padding parameter: ${r}`);d={top:r[0],bottom:r[1],left:r[2],right:r[3],front:r[4],back:r[5]};let b=kv([e,n,t,1],[s,u,l],1,[o,i,a],r[0]);f=b[0],h=b[1],g=b[2]}else if(r==="SAME_UPPER"){f=Math.ceil(e/o),h=Math.ceil(n/i),g=Math.ceil(t/a);let b=(f-1)*o+s-e,_=(h-1)*i+u-n,T=(g-1)*a+l-t,v=Math.floor(b/2),x=b-v,I=Math.floor(_/2),$=_-I,O=Math.floor(T/2),E=T-O;d={top:I,bottom:$,left:O,right:E,front:v,back:x}}else throw Error(`Unknown padding parameter: ${r}`);return{padInfo:d,outDepth:f,outHeight:h,outWidth:g}},Nv=(r,e,n,t,o,i=!1,a="channelsLast")=>{let s,u,l,d,f;if(a==="channelsLast")[s,u,l,d,f]=r;else if(a==="channelsFirst")[s,f,u,l,d]=r;else throw new Error(`Unknown dataFormat ${a}`);let[h,,g,b,_]=e,[T,v,x]=Dv(n),[I,$,O]=Dv(t),E=qa(g,I),L=qa(b,$),R=qa(_,O),{padInfo:F,outDepth:q,outHeight:Z,outWidth:re}=QP(o,u,l,d,T,v,x,E,L,R),pe=i?h*f:h,K=[0,0,0,0,0];return a==="channelsFirst"?K=[s,pe,q,Z,re]:a==="channelsLast"&&(K=[s,q,Z,re,pe]),{batchSize:s,dataFormat:a,inDepth:u,inHeight:l,inWidth:d,inChannels:f,outDepth:q,outHeight:Z,outWidth:re,outChannels:pe,padInfo:F,strideDepth:T,strideHeight:v,strideWidth:x,filterDepth:g,filterHeight:b,filterWidth:_,effectiveFilterDepth:E,effectiveFilterHeight:L,effectiveFilterWidth:R,dilationDepth:I,dilationHeight:$,dilationWidth:O,inShape:r,outShape:K,filterShape:e}},Lv=(r,e,n,t,o,i)=>{let a=i==="channelsLast",s=a?r[0].dims[3]:r[0].dims[1],u=!1,l=[64,1,1],d={x:n.map((x,I)=>I)},f=[Math.ceil(JP(d.x.map(x=>n[x]))/l[0]),1,1];_e("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${f}`);let h=u?a&&s%4!==0?3:4:1,g=C.size(n),b=[{type:12,data:g},{type:12,data:t},{type:12,data:o},{type:12,data:e.strides},{type:12,data:e.dilations}];Zt(e,b),b.push(...W(r[0].dims,r[1].dims));let _=["rank","rank"],T=r.length===3;T&&(b.push(...W(r[2].dims)),_.push("rank")),b.push(...W(n));let v=x=>{let I=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:t.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:e.strides.length},{name:"dilations",type:"u32",length:e.dilations.length}];Jt(e,I);let $=u?4:1,O=Ve(r[0].dataType),E=N("x",r[0].dataType,r[0].dims.length,h===3?1:h),L=N("W",r[1].dataType,r[1].dims.length,$),R=[E,L],F=G("result",r[0].dataType,n.length,$),q="";if(T){let pe=N("bias",r[2].dataType,r[2].dims.length,$);R.push(pe),q+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${O}>`:O} {
          return bias[${a?Q("coords",4,5):Q("coords",1,5)}${u?"/ 4":""}];
        }`}let Z=rt(h,O),re=Xt(e,Z,O);return`
            ${q}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${E.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${L.getByIndices("aIndices")};
            }
          ${x.registerUniforms(I).declareVariables(...R,F)}
          ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${F.offsetToIndices("global_idx")};
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
              ${T?"value = value + getBiasByOutputCoords(coords)":""};
              ${re}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${e.cacheKey};${a};${h};${T}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:n,dataType:r[0].dataType}],dispatchGroup:{x:f[0],y:f[1],z:f[2]},programUniforms:b}),getShaderSource:v}}});var zv,Mv,Bv=k(()=>{"use strict";le();ge();ye();wr();zv=(r,e,n,t)=>{let o=r.length>2,i=o?"value += b[output_channel];":"",a=r[0].dims,s=r[1].dims,u=e.format==="NHWC",l=u?n[3]:n[1],d=l/e.group,f=u&&d>=4?Ee(l):1,h=C.size(n)/f,g=[{type:12,data:h},{type:12,data:e.dilations},{type:12,data:[e.strides[0],e.strides[1]]},{type:12,data:[e.pads[0],e.pads[1]]},{type:12,data:d}];Zt(e,g),g.push(...W(a,[s[0],s[1],s[2],s[3]/f]));let b=o?["rank","rank","rank"]:["rank","rank"];g.push(...W([n[0],n[1],n[2],n[3]/f]));let _=T=>{let v=G("output",r[0].dataType,n.length,f),x=Ve(v.type.tensor),I=Xt(e,v.type.value,x),$=N("x",r[0].dataType,a.length),O=N("w",r[1].dataType,s.length,f),E=[$,O];o&&E.push(N("b",r[2].dataType,r[2].dims,f));let L=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:e.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Jt(e,L);let R=u?`
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
  ${T.registerUniforms(L).declareVariables(...E,v)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${v.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${f} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${v.type.value} = ${v.type.value}(0);
    ${R}
    ${i}
    ${I}
    ${v.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${e.cacheKey}_${f}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:t?t(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:g}),getShaderSource:_}},Mv=(r,e,n,t)=>{let o=r.length>2,i=Ee(n[3]),a=Ee(n[2]),s=C.size(n)/i/a,u=[r[0].dims[0],r[0].dims[1],r[0].dims[2],r[0].dims[3]/i],l=[r[1].dims[0],r[1].dims[1],r[1].dims[2],r[1].dims[3]/i],d=[n[0],n[1],n[2],n[3]/i],f=[{type:12,data:s},{type:6,data:[e.strides[0],e.strides[1]]},{type:6,data:[e.pads[0],e.pads[1]]}];Zt(e,f),f.push(...W(u,l,d));let h=(a-1)*e.strides[1]+l[1],g=b=>{let _=G("output",r[0].dataType,d.length,i),T=Ve(_.type.tensor),v=Xt(e,_.type.value,T),x=N("x",r[0].dataType,u.length,i),I=N("w",r[1].dataType,l.length,i),$=[x,I];o&&$.push(N("b",r[2].dataType,r[2].dims,i));let O=o?"value += b[output_channel];":"",E=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Jt(e,E),`
  ${b.registerUniforms(E).declareVariables(...$,_)}
  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${a}u;
    let col = (index1 % width1) * ${a}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${x.type.value}, ${h}>;
    var values: array<${_.type.value}, ${a}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${h}; i++) {
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
      ${O}
      ${v}
      ${_.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${e.cacheKey};${i};${a};${h};${l[0]};${l[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:t?t(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:f}),getShaderSource:g}}});var e3,Pc,t3,Ec,Cc,Fv,n3,r3,Dc,Vv=k(()=>{"use strict";ge();Cv();Rv();ja();Bv();wr();Ha();Yn();e3=(r,e,n,t,o,i)=>{let a=r[0],s=r.slice(i?1:2,i?3:4),u=s.length,l=e[0],f=e.slice(2).map((b,_)=>b+(b-1)*(n[_]-1)),g=s.map((b,_)=>b+t[_]+t[_+u]).map((b,_)=>Math.floor((b-f[_]+o[_])/o[_]));return g.splice(0,0,a),g.splice(i?3:1,0,l),g},Pc=[2,3,1,0],t3=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length>5)throw new Error("greater than 5D is not supported");if(r[0].dims.length!==r[1].dims.length)throw new Error("filter does not have same dimension as input");let n=r[0].dims[e.format==="NHWC"?r[0].dims.length-1:1],t=r[1].dims[1]*e.group;if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(r.length===3&&(r[2].dims.length!==1||r[1].dims[0]!==r[2].dims[0]))throw new Error("invalid bias");let o=r[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape")},Ec=(r,e)=>{let n=r.kernelShape.slice();n.length<e[1].dims.length-2&&n.push(...Array(e[1].dims.length-2-n.length).fill(0));for(let i=2;i<e[1].dims.length;++i)n[i-2]===0&&(n[i-2]=e[1].dims[i]);let t=r.pads.slice();Ur.adjustPadsBasedOnAutoPad(e[0].dims,r.strides,r.dilations,n,t,r.format==="NHWC",r.autoPad);let o=Object.assign({},r);return Object.assign(o,{kernelShape:n,pads:t}),o},Cc=r=>{let e=Ga(r),n=r.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][r.auto_pad],o=r.dilations,i=r.group,a=r.kernel_shape,s=r.pads,u=r.strides,l=r.w_is_const();return{autoPad:t,format:n,dilations:o,group:i,kernelShape:a,pads:s,strides:u,wIsConst:l,...e,cacheKey:`${r.format};${e.activation};`}},Fv=(r,e,n,t)=>{let o=n.format==="NHWC",i=e3(e[0].dims,e[1].dims,n.dilations,n.pads,n.strides,o);if(n.group!==1){let E=[e[0]];if(o){let R=r.kernelCustomData.wT??r.compute(at(e[1],Pc),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=R),E.push(R)}else E.push(e[1]);e.length===3&&E.push(e[2]),!r.adapterInfo.isArchitecture("ampere")&&o&&e[1].dims[0]===n.group&&e[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?r.compute(Mv(E,n,i,t),{inputs:E}):r.compute(zv(E,n,i,t),{inputs:E});return}let a=e.length===3,s=e[0].dims[o?1:2],u=e[0].dims[o?2:3],l=e[0].dims[o?3:1],d=e[1].dims[2],f=e[1].dims[3],h=i[o?1:2],g=i[o?2:3],b=i[o?3:1],_=o&&d===s&&f===u&&n.pads[0]===0&&n.pads[1]===0;if(_||d===1&&f===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let E=i[0],L,R,F,q=[];if(o){let pe=r.kernelCustomData.wT??r.compute(at(e[1],Pc),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=pe),_){let K=s*u*l;L=e[0].reshape([1,E,K]),R=pe.reshape([1,K,b]),F=[1,E,b]}else L=e[0].reshape([E,s*u,l]),R=pe.reshape([1,l,b]),F=[E,h*g,b];q.push(L),q.push(R)}else L=e[0].reshape([E,l,s*u]),R=e[1].reshape([1,b,l]),F=[E,b,h*g],q.push(R),q.push(L);a&&q.push(e[2]);let Z=F[2],re=q[0].dims[q[0].dims.length-1];Z<8&&re<8?r.compute(Wa(q,n,i,F,o,t),{inputs:q}):r.compute(jo(q,n,i,F,o,t),{inputs:q});return}let T=!0,v=r.kernelCustomData.wT??r.compute(at(e[1],Pc),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=v);let x=[e[0],v];a&&x.push(e[2]);let I=o?h*g:b,$=o?b:h*g,O=d*f*l;r.compute(Ev(x,n,i,I,$,O,a,T,t),{inputs:x})},n3=(r,e)=>{let n=e.format==="NHWC",t=[r.inputs[0].reshape(n?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])];r.inputs.length===3&&t.push(r.inputs[2]);let o=[0,e.pads[0],0,e.pads[1]],i=[1].concat(e.strides),a=[1].concat(e.dilations),s=[1].concat(e.kernelShape),u=Ec({...e,pads:o,strides:i,dilations:a,kernelShape:s},t);Fv(r,t,u,l=>n?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},r3=(r,e,n)=>{let t=n.format==="NHWC"?"channelsLast":"channelsFirst",o=Ec(n,e),i=n.autoPad==="NOTSET"?n.pads:n.autoPad,a=Nv(e[0].dims,e[1].dims,n.strides,n.dilations,i,!1,t);r.compute(Lv(e,o,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],t))},Dc=(r,e)=>{if(t3(r.inputs,e),r.inputs[0].dims.length===3)n3(r,e);else if(r.inputs[0].dims.length===5)r3(r,r.inputs,e);else{let n=Ec(e,r.inputs);Fv(r,r.inputs,n)}}});var Gv,Uv=k(()=>{"use strict";le();Bn();ge();ye();Gv=(r,e,n)=>{let t=r.length>2,o=e.outputShape,i=e.format==="NHWC",a=e.group,s=r[1].dims,u=s[2]/a,l=s[3],d=i?Ee(u):1,f=i&&l===1&&u>=4,h=f?Math.floor(u/4)*4:Math.floor(u/d)*d,g=u-h,b=i?Ee(l):1,_=i?l===1?d:b:1,T=C.size(o)/b,v=[Math.ceil(T/64),1,1];_e("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${v}`);let x=["rank","rank"],I=[e.strides[0],e.strides[1]],$=[e.kernelShape[i?1:2],e.kernelShape[i?2:3]],O=[e.dilations[0],e.dilations[1]],E=[$[0]+(e.dilations[0]<=1?0:(e.kernelShape[i?1:2]-1)*(e.dilations[0]-1)),$[1]+(e.dilations[1]<=1?0:(e.kernelShape[i?2:3]-1)*(e.dilations[1]-1))],L=[E[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),E[1]-1-Math.floor((e.pads[1]+e.pads[3])/2)],R=[{type:12,data:T},{type:12,data:I},{type:12,data:$},{type:12,data:O},{type:12,data:E},{type:6,data:L},{type:12,data:h},{type:12,data:u},{type:12,data:l},...W(r[0].dims,r[1].dims)];t&&(R.push(...W(r[2].dims)),x.push("rank")),R.push(...W(o));let F=q=>{let Z=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:I.length},{name:"filter_dims",type:"u32",length:$.length},{name:"dilations",type:"u32",length:$.length},{name:"effective_filter_dims",type:"u32",length:E.length},{name:"pads",type:"i32",length:L.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],re=Ve(r[0].dataType),pe=i?1:2,K=i?2:3,Oe=i?3:1,fe=N("W",r[1].dataType,r[1].dims.length,_),J=N("Dy",r[0].dataType,r[0].dims.length,d),he=[J,fe];t&&he.push(N("bias",r[2].dataType,[o[Oe]].length,b));let ee=G("result",r[0].dataType,o.length,b),Te=()=>{let ae="";if(f)d===4?ae+=`
        let xValue = ${J.getByOffset("x_offset")};
        let wValue = ${fe.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:d===2?ae+=`
          dotProd = dotProd + dot(vec4<${re}>(${J.getByOffset("x_offset")}, ${J.getByOffset("x_offset + 1u")}), vec4<${re}>(${fe.getByOffset("w_offset")}, ${fe.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:d===1&&(ae+=`
          dotProd = dotProd + dot(vec4<${re}>(${J.getByOffset("x_offset")}, ${J.getByOffset("x_offset + 1u")}, ${J.getByOffset("x_offset + 2u")}, ${J.getByOffset("x_offset + 3u")}), vec4<${re}>(${fe.getByOffset("w_offset")}, ${fe.getByOffset("w_offset + 1u")}, ${fe.getByOffset("w_offset + 2u")}, ${fe.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(ae+=`
                  let xValue = ${i?J.getByOffset(`${J.indicesToOffset(`${J.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${d}`):J.get("batch","inputChannel","idyR","idyC")};
        `,d===1)ae+=`
          let w_offset = ${fe.indicesToOffset(`${fe.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${fe.getByOffset(`w_offset / ${_}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let U=0;U<d;U++)ae+=`
            let wValue${U} = ${fe.getByOffset(`${fe.indicesToOffset(`${fe.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${U}, wOutChannel)`)} / ${_}`)};
            dotProd = dotProd + xValue[${U}] * wValue${U};`;return ae},Ze=()=>{if(g===0)return"";if(!f)throw new Error(`packInputAs4 ${f} is not true.`);let ae="";if(d===1){ae+="dotProd = dotProd";for(let U=0;U<g;U++)ae+=`
            + ${J.getByOffset(`x_offset + ${U}`)} * ${fe.getByOffset(`w_offset + ${U}`)}`;ae+=";"}else if(d===2){if(g!==2)throw new Error(`Invalid inputChannelsRemainder ${g}.`);ae+=`
          let xValue = ${J.getByOffset("x_offset")};
          let wValue = ${fe.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return ae},Se=`
            let outputIndices = ${ee.offsetToIndices(`global_idx * ${b}`)};
            let batch = ${ee.indicesGet("outputIndices",0)};
            let d1 = ${ee.indicesGet("outputIndices",Oe)};
            let r = ${ee.indicesGet("outputIndices",pe)};
            let c = ${ee.indicesGet("outputIndices",K)};
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
              let dyR = (${re}(dyRCorner) + ${re}(wR)) / ${re}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${re}(uniforms.Dy_shape[${pe}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${re}(dyCCorner) + ${re}(wC)) / ${re}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${re}(uniforms.Dy_shape[${K}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${f?`
                var x_offset = ${J.indicesToOffset(`${J.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${d};
                var w_offset = ${fe.indicesToOffset(`${fe.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${_};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${f?4:d}) {
                  ${Te()}
                  inputChannel = inputChannel + ${f?4:d};
                }
                ${Ze()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${t?` + bias[d1 / ${b}]`:""};
            ${ee.setByOffset("global_idx","value")};
          `;return`
    ${q.registerUniforms(Z).declareVariables(...he,ee)}
      ${q.mainStart()}
      ${q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${Se}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${e.cacheKey};${d}${_}${b}${f}${g}`,inputDependencies:x},getRunData:()=>({dispatchGroup:{x:v[0],y:v[1],z:v[2]},outputs:[{dims:n?n(o):o,dataType:r[0].dataType}],programUniforms:R}),getShaderSource:F}}});var o3,i3,a3,Wv,Hv,s3,jv,u3,qv,Kv=k(()=>{"use strict";Uv();wr();Yn();o3=(r,e,n,t,o,i)=>(r-1)*e+n+(t-1)*o+1-i,i3=(r,e,n,t,o)=>{let i=Math.floor(r/2);e==="SAME_UPPER"?(n[t]=i,n[o]=r-i):e==="SAME_LOWER"&&(n[t]=r-i,n[o]=i)},a3=(r,e,n,t,o,i,a,s,u,l)=>{let d=r.length-2,f=l.length===0;u.length<d&&u.push(...Array(d-u.length).fill(0));let h=r[0],g=e[s?3:1]*o;for(let b=0,_=r.length-d-(s?1:0);b<d;++b,++_){let T=r[_],v=f?T*a[b]:l[b],x=o3(T,a[b],i[b],e[_],n[b],v);i3(x,t,i,b,b+d),f&&l.push(a[b]*(T-1)+u[b]+(e[_]-1)*n[b]+1-i[b]-i[b+d])}l.splice(0,0,h),l.splice(s?3:1,0,g)},Wv=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0||r.kernelShape.reduce((f,h)=>f*h,1)===0){n.length=0;for(let f=2;f<e[1].dims.length;++f)n.push(e[1].dims[f])}let t=r.format==="NHWC";n.splice(0,0,e[1].dims[0]),n.splice(t?3:1,0,e[1].dims[1]);let o=r.pads.slice(),i=r.outputShape.slice(),a=r.outputPadding.slice(),s=e[0].dims,u=r.dilations.slice();if(u.reduce((f,h)=>f+h,0)===0){let f=e[0].dims.length-2;u=new Array(f).fill(1)}let l=r.strides.slice();if(l.reduce((f,h)=>f+h,0)===0){let f=e[0].dims.length-2;l=new Array(f).fill(1)}a3(s,n,u,r.autoPad,r.group,o,l,t,a,i);let d=Object.assign({},r);return Object.assign(d,{kernelShape:n,pads:o,outputPadding:a,outputShape:i,dilations:u,strides:l}),d},Hv=r=>{let e=Ga(r),n=r.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof r.autoPad>"u"?0:r.autoPad],o=r.dilations,i=r.group,a=r.kernelShape,s=r.pads,u=r.strides,l=r.wIsConst(),d=r.outputPadding,f=r.outputShape;return{autoPad:t,format:n,dilations:o,group:i,kernelShape:a,outputPadding:d,outputShape:f,pads:s,strides:u,wIsConst:l,...e,cacheKey:`${r.format};${e.activation};`}},s3=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4&&r[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(r[0].dims.length!==r[1].dims.length)throw new Error("filter does not have same dimension as input");let n=r[0].dims[e.format==="NHWC"?r[0].dims.length-1:1],t=r[1].dims[0];if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=r[1].dims[1]*e.group;if(r.length===3&&(r[2].dims.length!==1||r[2].dims[0]!==o))throw new Error("invalid bias");let i=r[0].dims.length-2;if(e.dilations.reduce((d,f)=>d+f,0)>0&&e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.reduce((d,f)=>d+f,0)>0&&e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.reduce((d,f)=>d+f,0)>0&&e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i&&e.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.reduce((d,f)=>d+f,0)>0&&e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==r[0].dims.length-2)throw new Error("invalid output shape")},jv=(r,e,n,t)=>{let o=r.kernelCustomData.wT??r.compute(at(e[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=o);let i=[e[0],o];e.length===3&&i.push(e[2]),r.compute(Gv(i,n,t),{inputs:i})},u3=(r,e)=>{let n=e.format==="NHWC",t=[r.inputs[0].reshape(n?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])];r.inputs.length===3&&t.push(r.inputs[2]);let o=e.kernelShape;(o.length===0||o[0]===0)&&(o=[r.inputs[1].dims[2]]);let i=e.dilations;(i.length===0||i[0]===0)&&(i=[1]);let a=e.strides;(a.length===0||a[0]===0)&&(a=[1]);let s=e.pads;s.length===0&&(s=[0,0]),s=[0,s[0],0,s[1]],a=[1].concat(a),i=[1].concat(i),o=[1].concat(o);let u=e.outputPadding;u=[0].concat(u);let l=Wv({...e,pads:s,strides:a,dilations:i,kernelShape:o,outputPadding:u},t);jv(r,t,l,d=>n?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},qv=(r,e)=>{if(s3(r.inputs,e),r.inputs[0].dims.length===3)u3(r,e);else{let n=Wv(e,r.inputs);jv(r,r.inputs,n)}}});var l3,Xv,Zv,Jv=k(()=>{"use strict";le();ge();Xe();ye();l3=(r,e,n,t)=>{let o=C.size(e),i=e.length,a=N("input",r,i),s=G("output",r,i),u=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),l=C.normalizeAxis(u,i),d=f=>{let h=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,g=Q("uniforms.input_shape","uniforms.axis",i),b=t.reverse?h+(t.exclusive?" + 1":""):"0",_=t.reverse?g:h+(t.exclusive?"":" + 1");return`
                ${f.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,s)}
                ${f.mainStart()}
                  ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${s.offsetToIndices("global_idx")};
                  var sum = ${s.type.value}(0);
                  let first : i32 = ${b};
                  let last : i32 = ${_};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${s.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:e,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:l},...W(e,e)]}),getShaderSource:d}},Xv=(r,e)=>{let n=r.inputs[0].dims,t=r.inputs[0].dataType,o=r.inputs[1];r.compute(l3(t,n,o,e),{inputs:[0]})},Zv=r=>{let e=r.exclusive===1,n=r.reverse===1;return ce({exclusive:e,reverse:n})}});var c3,d3,p3,Yv,Qv,e0=k(()=>{"use strict";le();ge();Xe();ye();c3=r=>{if(!r||r.length!==1)throw new Error("DepthToSpace requires 1 input.");if(r[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},d3=(r,e,n,t)=>{let o=[];o.push(`fn perm(i: ${t.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let i=0;i<e;++i)o.push(n.indicesSet("a",r[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},p3=(r,e)=>{let n,t,o,i,a,s,u=e.format==="NHWC",l=e.blocksize,d=e.mode==="DCR";u?([n,t,o,i]=r.dims,a=d?[n,t,o,l,l,i/l**2]:[n,t,o,i/l**2,l,l],s=d?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,t,o,i]=[r.dims[0],r.dims[2],r.dims[3],r.dims[1]],a=d?[n,l,l,i/l**2,t,o]:[n,i/l**2,l,l,t,o],s=d?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let f=r.reshape(a),h=f.dims.length,g=r.dataType,b=N("a",g,h),_=G("output",g,h),T=v=>`
  ${v.registerUniform("output_size","u32").declareVariables(b,_)}

  ${d3(s,h,b,_)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${_.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${_.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${r.dims};${e.blocksize};${e.mode}`,inputDependencies:["rank"]},getRunData:v=>{let x=u?[n,t*l,o*l,i/l**2]:[n,i/l**2,t*l,o*l],I=C.size(x),$=f.dims,O=C.sortBasedOnPerm($,s);return{outputs:[{dims:x,dataType:v[0].dataType}],dispatchGroup:{x:Math.ceil(I/64)},programUniforms:[{type:12,data:I},...W($,O)]}},getShaderSource:T}},Yv=(r,e)=>{c3(r.inputs),r.compute(p3(r.inputs[0],e))},Qv=r=>ce({blocksize:r.blocksize,mode:r.mode,format:r.format})});var kc,Ka,t0,f3,h3,Nc,Lc,n0,m3,r0,o0,i0=k(()=>{"use strict";le();ge();Xe();ye();kc="[a-zA-Z]|\\.\\.\\.",Ka="("+kc+")+",t0="^"+Ka+"$",f3="("+Ka+",)*"+Ka,h3="^"+f3+"$",Nc=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,n){let t=this.symbolToIndices.get(e);t===void 0?t=[n]:t.push(n),this.symbolToIndices.set(e,t)}},Lc=class{constructor(e,n){this.equation=n;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[t,o]=n.includes("->")?n.split("->",2):[n,""];if(!t.match(RegExp(h3)))throw new Error("Invalid LHS term");if(t.split(",").forEach((s,u)=>{let l=e[u].dims.slice();if(!s.match(RegExp(t0)))throw new Error("Invalid LHS term");let d=this.processTerm(s,!0,l,u);this.lhs.push(d)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([s,u])=>u.count===1||s==="...").map(([s])=>s).join("");else if(!o.match(RegExp(Ka)))throw new Error("Invalid RHS");o.match(RegExp(kc,"g"))?.forEach(s=>{if(s==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let u=this.symbolToInfo.get(s);if(u===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(u.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(e,n,t){let o=this.symbolToInfo.get(e);if(o!==void 0){if(o.dimValue!==n&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(t)}else o={count:1,dimValue:n,inputIndices:[t]};this.symbolToInfo.set(e,o)}processTerm(e,n,t,o=-1){let i=t.length,a=!1,s=[],u=0;if(!e.match(RegExp(t0))&&!n&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(kc,"g")),d=new Nc(o);return l?.forEach((f,h)=>{if(f==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let g=i-l.length+1;if(g<0)throw new Error("Ellipsis out of bounds");if(s=t.slice(u,u+g),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(n)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let b=0;b<s.length;b++){let _=String.fromCharCode(48+b);d.addSymbol(_,h+b),this.addSymbol(_,t[u++],o)}}else d.addSymbol(f,h+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(f,t[u++],o)}),d}},n0=r=>r+"_max",m3=(r,e,n,t)=>{let i=r.map(d=>d.length).map((d,f)=>N(`input${f}`,e,d)),a=C.size(t),s=G("output",e,t.length),u=[...n.symbolToInfo.keys()].filter(d=>!n.rhs.symbolToIndices.has(d)),l=d=>{let f=[],h="var prod = 1.0;",g="var sum = 0.0;",b="sum += prod;",_=[],T=[],v=[],x=[],I=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((O,E)=>{if(n.rhs.symbolToIndices.has(E)){let L=n.rhs.symbolToIndices.get(E)?.[0];L!==void 0&&n.lhs.forEach((R,F)=>{if(O.inputIndices.includes(F)){let q=R.symbolToIndices.get(E);if(q===void 0)throw new Error("Invalid symbol error");q.forEach(Z=>{f.push(`${i[F].indicesSet(`input${F}Indices`,Z,s.indicesGet("outputIndices",L))}`)})}})}else n.lhs.forEach((L,R)=>{if(O.inputIndices.includes(R)){let F=L.symbolToIndices.get(E);if(F===void 0)throw new Error("Invalid symbol error");F.forEach(q=>{_.push(`${i[R].indicesSet(`input${R}Indices`,q,`${E}`)}`)}),x.push(`prod *= ${i[R].getByIndices(`input${R}Indices`)};`)}}),T.push(`for(var ${E}: u32 = 0; ${E} < uniforms.${n0(E)}; ${E}++) {`),v.push("}")});let $=I?[...f,`let sum = ${i.map((O,E)=>O.getByIndices(`input${E}Indices`)).join(" * ")};`]:[...f,g,...T,..._,h,...x,b,...v];return`
            ${d.registerUniforms(u.map(O=>({name:`${n0(O)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,s)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${i.map((O,E)=>`var input${E}Indices: ${i[E].type.indices};`).join(`
`)}
            ${$.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:r.map(()=>"rank")},getRunData:()=>{let d=u.filter(h=>n.symbolToInfo.has(h)).map(h=>({type:12,data:n.symbolToInfo.get(h)?.dimValue||0}));d.push({type:12,data:a});let f=r.map((h,g)=>[...W(h)]).reduce((h,g)=>h.concat(g),d);return f.push(...W(t)),{outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:f}},getShaderSource:l}},r0=(r,e)=>{let n=new Lc(r.inputs,e.equation),t=n.outputDims,o=r.inputs.map((i,a)=>i.dims);r.compute(m3(o,r.inputs[0].dataType,n,t))},o0=r=>{let e=r.equation.replace(/\s+/g,"");return ce({equation:e})}});var g3,a0,b3,y3,s0,u0=k(()=>{"use strict";le();ge();ye();g3=r=>{if(!r||r.length!==2)throw new Error("Expand requires 2 input.");let e=r[0].dims,n=Array.from(r[1].getBigInt64Array(),Number),t=n.length<e.length?0:n.length-e.length,o=e.length<n.length?0:e.length-n.length;for(;t<n.length&&o<e.length;++t,++o)if(n[t]!==e[o]&&n[t]!==1&&e[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},a0=(r,e)=>{let n=r.length-e.length,t=[];for(let o=0;o<n;++o)t.push(r[o]);for(let o=0;o<e.length;++o)t.push(e[o]===1?r[o+n]:e[o]);return t},b3=(r,e)=>r.length>e.length?a0(r,e):a0(e,r),y3=r=>{let e=r[0].dims,n=Array.from(r[1].getBigInt64Array(),Number),t=b3(e,n),o=r[0].dataType,i=o===9||C.size(e)===1,a=o===9||e.length>0&&e[e.length-1]%4===0?4:1,s=i||t.length>0&&t[t.length-1]%4===0?4:1,u=Math.ceil(C.size(t)/s),l=f=>{let h=N("input",o,e.length,a),g=G("output",o,t.length,s),b;if(o===9){let _=(T,v,x="")=>`
          let outputIndices${v} = ${g.offsetToIndices(`outputOffset + ${v}u`)};
          let offset${v} = ${h.broadcastedIndicesToOffset(`outputIndices${v}`,g)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${T}[${v}] = ${x}(${h.getByOffset(`index${v}`)}[component${v}]);
        `;b=`
        let outputOffset = global_idx * ${s};
        var data = vec4<u32>(0);
        ${_("data",0,"u32")}
        ${_("data",1,"u32")}
        ${_("data",2,"u32")}
        ${_("data",3,"u32")}
        ${g.setByOffset("global_idx","data")}
      }`}else b=`
        let outputIndices = ${g.offsetToIndices(`global_idx * ${s}`)};
        let inputOffset = ${h.broadcastedIndicesToOffset("outputIndices",g)};
        let data = ${g.type.value}(${h.getByOffset(`inputOffset / ${a}`)});
        ${g.setByOffset("global_idx","data")}
      }`;return`
    ${f.registerUniform("vec_size","u32").declareVariables(h,g)}
    ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${b}`},d=[{type:12,data:u},...W(e,t)];return{name:"Expand",shaderCache:{hint:`${t.length};${a}${s}`,inputDependencies:["rank"]},getShaderSource:l,getRunData:()=>({outputs:[{dims:t,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d})}},s0=r=>{g3(r.inputs),r.compute(y3(r.inputs),{inputs:[0]})}});var _3,l0,c0=k(()=>{"use strict";le();ge();ye();Va();_3=r=>{let e=r[0].dataType,n=C.size(r[0].dims),t=C.size(r[1].dims),o=t%4===0,i=a=>{let s=N("x",e,[1],4),u=N("bias",e,[1],4),l=G("y",e,[1],4),d=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],f=g=>`
      let bias${g}_offset: u32 = (global_idx * 4 + ${g}) % uniforms.bias_size;
      let bias${g} = ${u.getByOffset(`bias${g}_offset / 4`)}[bias${g}_offset % 4];`,h=o?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${f(0)}${f(1)}${f(2)}${f(3)}
      let bias = ${s.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(d).declareVariables(s,u,l)}

    ${Sc(it(e))}

    ${a.mainStart(Wr)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${s.getByOffset("global_idx")};
      ${h}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",$c("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:t}],dispatchGroup:{x:Math.ceil(n/Wr/4)}})}},l0=r=>{r.inputs.length<2||C.size(r.inputs[1].dims)===0?iv(r):r.compute(_3(r.inputs))}});var v3,w3,d0,p0,f0=k(()=>{"use strict";le();ge();Xe();ye();v3=r=>{if(!r||r.length!==2)throw new Error("Gather requires 2 inputs.")},w3=(r,e)=>{let n=r[0].dims,t=r[1].dims,o=n.length,i=C.normalizeAxis(e.axis,o),a=n.slice(0);a.splice(i,1,...t);let s=n[i],u=r[0].dataType===9?4:1,l=Math.ceil(C.size(a)/u),d=[{type:12,data:l},{type:6,data:s},{type:12,data:i},...W(r[0].dims,r[1].dims,a)],f=h=>{let g=N("data",r[0].dataType,r[0].dims.length,u),b=N("inputIndices",r[1].dataType,r[1].dims.length),_=G("output",r[0].dataType,a.length,u),T=x=>{let I=t.length,$=`var indicesIndices${x}  = ${b.type.indices}(0);`;for(let O=0;O<I;O++)$+=`${I>1?`indicesIndices${x}[${O}]`:`indicesIndices${x}`} = ${a.length>1?`outputIndices${x}[uniforms.axis + ${O}]`:`outputIndices${x}`};`;$+=`
          var idx${x} = ${b.getByIndices(`indicesIndices${x}`)};
          if (idx${x} < 0) {
            idx${x} = idx${x} + uniforms.axisDimLimit;
          }
          var dataIndices${x} : ${g.type.indices};
        `;for(let O=0,E=0;O<o;O++)O===i?($+=`${o>1?`dataIndices${x}[${O}]`:`dataIndices${x}`} = u32(idx${x});`,E+=I):($+=`${o>1?`dataIndices${x}[${O}]`:`dataIndices${x}`} = ${a.length>1?`outputIndices${x}[${E}]`:`outputIndices${x}`};`,E++);return $},v;if(r[0].dataType===9){let x=(I,$,O="")=>`
          let outputIndices${$} = ${_.offsetToIndices(`outputOffset + ${$}u`)};
          ${T($)};
          let offset${$} = ${g.indicesToOffset(`dataIndices${$}`)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${I}[${$}] = ${O}(${g.getByOffset(`index${$}`)}[component${$}]);
        `;v=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${x("value",0,"u32")}
        ${x("value",1,"u32")}
        ${x("value",2,"u32")}
        ${x("value",3,"u32")}
        ${_.setByOffset("global_idx","value")}
      `}else v=`
      let outputIndices = ${_.offsetToIndices("global_idx")};
      ${T("")};
      let value = ${g.getByIndices("dataIndices")};
      ${_.setByOffset("global_idx","value")};
      `;return`
      ${h.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(g,b,_)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`};return{name:"Gather",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:f}},d0=r=>ce({axis:r.axis}),p0=(r,e)=>{let n=r.inputs;v3(n),r.compute(w3(r.inputs,e))}});var x3,h0,m0,g0=k(()=>{"use strict";le();ge();ye();x3=(r,e,n,t,o,i,a,s,u)=>{let l=[{type:12,data:i},{type:12,data:t},{type:12,data:o},{type:12,data:n},{type:12,data:a},{type:12,data:s},{type:12,data:u}],d=[i];l.push(...W(e.dims,d));let f=h=>{let g=N("indices_data",e.dataType,e.dims.length),b=G("input_slice_offsets_data",12,1,1),_=[g,b],T=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${h.registerUniforms(T).declareVariables(..._)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
  }`};return r.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:d,dataType:r.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:l}),getShaderSource:f},{inputs:[e],outputs:[-1]})[0]},h0=(r,e)=>{let n=r.inputs,t=n[0].dims,o=n[0].dataType,i=n[1].dims,a=i[i.length-1],s=C.sizeToDimension(i,i.length-1),u=C.sizeFromDimension(t,e.batchDims+a),l=C.sizeToDimension(t,e.batchDims),d=C.sizeFromDimension(t,e.batchDims),f=s/l,h=new Array(a),g=u;for(let $=0;$<a;++$)h[a-1-$]=g,g*=t[e.batchDims+a-1-$];let b=x3(r,n[1],h,e.batchDims,t,s,f,d,a),_=e.batchDims+a;if(_>t.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let T=i.slice(0,-1).concat(t.slice(_)),v=C.size(T),x=[{type:12,data:v},{type:12,data:u},...W(n[0].dims,b.dims,T)],I=$=>{let O=N("data",n[0].dataType,n[0].dims.length),E=N("slice_offsets",12,b.dims.length),L=G("output",n[0].dataType,T.length);return`
          ${$.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(O,E,L)}
            ${$.mainStart()}
            ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};r.compute({name:"GatherND",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:T,dataType:o}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:x}),getShaderSource:I},{inputs:[n[0],b]})},m0=r=>({batchDims:r.batch_dims,cacheKey:""})});var T3,I3,b0,y0,_0=k(()=>{"use strict";le();ge();Xe();ye();T3=(r,e)=>{if(r.length<3||r.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=C.normalizeAxis(e.quantizeAxis,r[0].dims.length),t=e.blockSize,o=r[0],i=r[2],a=r.length===4?r[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((s,u)=>u===n?Math.ceil(s/t)===i.dims[u]:s===i.dims[u]).reduce((s,u)=>s&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==i.dims.length||!a.dims.map((s,u)=>s===i.dims[u]).reduce((s,u)=>s&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},I3=(r,e)=>{let n=r[0].dims,t=r[1].dims,o=n.length,i=C.normalizeAxis(e.gatherAxis,o),a=C.normalizeAxis(e.quantizeAxis,o),s=n.slice(0);s.splice(i,1,...t);let u=C.size(s),l=r[2].dataType,f=r[0].dataType===22,h=[{type:12,data:u},{type:12,data:a},{type:12,data:i},{type:12,data:e.blockSize},...W(...r.map((b,_)=>b.dims),s)],g=b=>{let _=N("data",r[0].dataType,r[0].dims.length),T=N("inputIndices",r[1].dataType,r[1].dims.length),v=N("scales",r[2].dataType,r[2].dims.length),x=r.length>3?N("zeroPoint",r[3].dataType,r[3].dims.length):void 0,I=G("output",l,s.length),$=[_,T,v];x&&$.push(x);let O=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${b.registerUniforms(O).declareVariables(...$,I)}
        ${b.mainStart()}
        let output_indices = ${I.offsetToIndices("global_idx")};
        var indices_indices = ${T.type.indices}(0);
        ${t.length>1?`
          for (var i: u32 = 0; i < ${t.length}; i++) {
            let index = ${I.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${T.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${I.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${_.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${I.indicesGet("output_indices","i")};
          ${_.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${T.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[i]};
        }
        ${_.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${s.length}; i++) {
          let index = ${I.indicesGet("output_indices",`i + ${t.length} - 1`)};
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
        let quantize_axis_index = ${v.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${v.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${v.getByIndices("scale_indices")};
        ${x?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${x.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${x.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${it(l)}(quantized_data - zero_point) * scale;
        ${I.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${e.cacheKey};${r.filter((b,_)=>_!==1).map(b=>b.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:r.length},(b,_)=>"rank")},getRunData:()=>({outputs:[{dims:s,dataType:l}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:h}),getShaderSource:g}},b0=(r,e)=>{let n=r.inputs;T3(n,e),r.compute(I3(r.inputs,e))},y0=r=>ce({blockSize:r.blockSize,gatherAxis:r.gatherAxis,quantizeAxis:r.quantizeAxis})});var S3,$3,v0,w0,x0=k(()=>{"use strict";le();ge();Xe();ye();S3=r=>{if(!r||r.length!==2)throw new Error("GatherElements requires 2 inputs.");if(r[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(r[0].dims.length!==r[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},$3=(r,e)=>{let n=r[0].dims,t=r[0].dataType,o=n.length,i=r[1].dims,a=r[1].dataType,s=C.normalizeAxis(e.axis,o),u=n[s],l=i.slice(0),d=C.size(l),f=N("input",t,o),h=N("indicesInput",a,i.length),g=G("output",t,l.length),b=[{type:12,data:d},{type:6,data:u},{type:12,data:s}];return b.push(...W(n,i,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:b}),getShaderSource:v=>`
      ${v.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,h,g)}
      ${v.mainStart()}
      ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${g.offsetToIndices("global_idx")};

      var idx = ${h.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${g.setByOffset("global_idx","value")};
  }`}},v0=r=>ce({axis:r.axis}),w0=(r,e)=>{let n=r.inputs;S3(n),r.compute($3(r.inputs,e))}});var A3,O3,T0,I0,S0=k(()=>{"use strict";le();ge();ye();A3=r=>{if(!r)throw new Error("Input is missing");if(r.length<2||r.length>3)throw new Error("Invaid input number.");if(r.length===3&&r[2].dims.length>2)throw new Error("Invalid input shape of C");if(r[0].dataType!==r[1].dataType||r.length===3&&r[0].dataType!==r[2].dataType)throw new Error("Input types are mismatched")},O3=(r,e)=>{let n=r[0].dims.slice(),t=r[1].dims.slice(),[o,i,a]=Oa.getShapeOfGemmResult(n,e.transA,t,e.transB,r.length===3?r[2].dims:void 0),s=[o,i];if(!s)throw new Error("Can't use gemm on the given tensors");let u=16,l=Math.ceil(i/u),d=Math.ceil(o/u),f=!0,h=C.size(s),g=[{type:12,data:f?l:h},{type:12,data:o},{type:12,data:i},{type:12,data:a},{type:1,data:e.alpha},{type:1,data:e.beta}],b=["type","type"];r.length===3&&(g.push(...W(r[2].dims)),b.push("rank")),g.push(...W(s));let _=v=>{let x="";e.transA&&e.transB?x="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":e.transA&&!e.transB?x="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!e.transA&&e.transB?x="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!e.transA&&!e.transB&&(x="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let I=e.alpha===1?"":"value *= uniforms.alpha;",$=N("a",r[0].dataType,r[0].dims),O=N("b",r[1].dataType,r[1].dims),E=$.type.value,L=null,R=[$,O];r.length===3&&(L=N("c",r[2].dataType,r[2].dims.length),R.push(L));let F=G("output",r[0].dataType,s.length);R.push(F);let q=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${v.registerUniforms(q).declareVariables(...R)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${E}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${x}
    }

    ${I}
    ${L!=null?`let cOffset = ${L.broadcastedIndicesToOffset("vec2(m, n)",F)}; value += ${E}(uniforms.beta) * ${L.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},T=v=>{let x=N("a",r[0].dataType,r[0].dims),I=N("b",r[1].dataType,r[1].dims),$=null,O=[x,I];r.length===3&&($=N("c",r[2].dataType,r[2].dims.length),O.push($));let E=G("output",r[0].dataType,s.length);O.push(E);let L=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],R="",F="";e.transA&&e.transB?(F=`
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
      `,R="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):e.transA&&!e.transB?(F=`
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
      `,R="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!e.transA&&e.transB?(F=`
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
      `,R="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!e.transA&&!e.transB&&(F=`
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
      `,R="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let q=e.alpha===1?"":"value *= uniforms.alpha;";return`
  ${v.registerUniforms(L).declareVariables(...O)}
  var<workgroup> tile_a: array<array<${x.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${I.type.storage}, ${u}>, ${u}>;
  ${v.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${E.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${F}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${R}
      }
      workgroupBarrier();
    }

    ${q}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${$!=null?`let cOffset = ${$.broadcastedIndicesToOffset("vec2(m, n)",E)}; value += ${E.type.value}(uniforms.beta) * ${$.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return f?{name:"GemmShared",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:s,dataType:r[0].dataType}],dispatchGroup:{x:l*d},programUniforms:g}),getShaderSource:T}:{name:"Gemm",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:s,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:g}),getShaderSource:_}},T0=r=>{let e=r.transA,n=r.transB,t=r.alpha,o=r.beta;return{transA:e,transB:n,alpha:t,beta:o,cacheKey:`${r.transA};${r.transB};${r.alpha===1}`}},I0=(r,e)=>{A3(r.inputs),r.compute(O3(r.inputs,e))}});var Qn,xr,fo,ho,P3,E3,C3,D3,k3,N3,L3,R3,$0,A0,O0=k(()=>{"use strict";le();ge();Xe();ye();[Qn,xr,fo,ho]=[0,1,2,3],P3=r=>{if(r[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(r[0].dims.length!==r[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(r[0].dims.length-2!==r[1].dims[r[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${r[0].dims.length-2}`);if(r[0].dims[0]!==r[1].dims[0])throw new Error("grid batch size must match input batch size")},E3=`
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
`,C3=r=>`
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
`,D3=r=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${r.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,k3=r=>`
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
`,N3=(r,e,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${e} {
     var pixel = ${e}(0);
     var indices = vec4<u32>(0);
     indices[${Qn}] = batch;
     indices[${xr}] = channel;`+(()=>{switch(n.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${fo}] = u32(r);
            indices[${ho}] = u32(c);
          } else {
            return ${e}(0);
          }
        `;case"border":return`
          indices[${fo}] = u32(clamp(r, 0, H - 1));
          indices[${ho}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${fo}] = gs_reflect(r, border[1], border[3]);
          indices[${ho}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${r.getByIndices("indices")};
  }
`,L3=(r,e,n)=>(()=>{switch(n.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Qn}], indices[${xr}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Qn}], indices[${xr}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Qn}], indices[${xr}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Qn}], indices[${xr}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Qn}], indices[${xr}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Qn}], indices[${xr}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${n.mode} is not supported`)}})()+`${r.setByOffset("global_idx","result")}`,R3=(r,e)=>{let n=N("x",r[0].dataType,r[0].dims.length),t=[r[1].dims[0],r[1].dims[1],r[1].dims[2]],o=N("grid",r[1].dataType,t.length,2),i=[r[0].dims[0],r[0].dims[1],r[1].dims[1],r[1].dims[2]];e.format==="NHWC"&&(i=[r[0].dims[0],r[1].dims[1],r[1].dims[2],r[0].dims[3]],[Qn,xr,fo,ho]=[0,3,1,2]);let a=G("output",r[0].dataType,i.length),s=n.type.value,u=C.size(i),l=[{type:12,data:u},...W(r[0].dims,t,i)],d=f=>`
  ${f.registerUniform("output_size","u32").declareVariables(n,o,a)}
  ${E3}
  ${C3(s)}
  ${D3(e)}
  ${k3(e)}
  ${N3(n,s,e)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${fo}]);
      let W_in = i32(uniforms.x_shape[${ho}]);

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
      var grid_indices = vec3<u32>(indices[${Qn}], indices[${fo}], indices[${ho}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${L3(a,s,e)}
  }`;return{name:"GridSample",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:["type","type"]},getRunData:f=>{let h=C.size(i);return{outputs:[{dims:i,dataType:f[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:l}},getShaderSource:d}},$0=(r,e)=>{P3(r.inputs),r.compute(R3(r.inputs,e))},A0=r=>ce({alignCorners:r.align_corners,mode:r.mode,paddingMode:r.padding_mode,format:r.format})});var Tt,B3,E0,P0,F3,qo,C0,Rc=k(()=>{"use strict";le();ge();Xe();Na();Ba();ye();Yn();Tt=(r,e)=>r.length>e&&r[e].dims.length>0?r[e]:void 0,B3=(r,e)=>{let n=r[0],t=Tt(r,1),o=Tt(r,2),i=Tt(r,3),a=Tt(r,4),s=Tt(r,5),u=Tt(r,6),l=Tt(r,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let d=n.dims[0],f=n.dims[1],h=n.dims.length===3?n.dims[2]:e.numHeads*n.dims[4],g=f,b=0,_=0,T=Math.floor(h/e.numHeads);if(u&&l&&C.size(u.dims)&&C.size(l.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==d||u.dims[1]!==e.numHeads||u.dims[3]!==T)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==d||l.dims[1]!==e.numHeads||l.dims[3]!==T)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');b=u.dims[2],_=u.dims[2]}else if(u&&C.size(u.dims)||l&&C.size(l.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v;if(t&&C.size(t.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(t.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');v=2,g=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==T)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');v=5,g=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==T)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');v=0,g=t.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==e.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}if(i&&C.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(t&&t.dims.length===5&&t.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let x=b+g,I=0;if(a&&C.size(a.dims)>0){I=8;let L=a.dims;throw L.length===1?L[0]===d?I=1:L[0]===3*d+2&&(I=3):L.length===2&&L[0]===d&&L[1]===x&&(I=5),I===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let $=!1,O=h;if(o&&C.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(g!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');O=o.dims[2]}else{if(g!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');O=o.dims[1]*o.dims[3],$=!0}}let E=!1;if(a&&C.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(s&&C.size(s.dims)>0){if(s.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(s.dims[0]!==d||s.dims[1]!==e.numHeads||s.dims[2]!==f||s.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:f,pastSequenceLength:b,kvSequenceLength:g,totalSequenceLength:x,maxSequenceLength:_,inputHiddenSize:0,hiddenSize:h,vHiddenSize:O,headSize:T,vHeadSize:Math.floor(O/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:I,scale:e.scale,broadcastResPosBias:E,passPastInKv:$,qkvFormat:v}},E0=r=>ce({...r}),P0=ce({perm:[0,2,1,3]}),F3=(r,e,n,t,o,i,a)=>{let s=[t,o,i],u=C.size(s),l=[{type:12,data:u},{type:12,data:a},{type:12,data:i}],d=f=>{let h=G("qkv_with_bias",e.dataType,s),g=N("qkv",e.dataType,s),b=N("bias",n.dataType,s),_=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${f.registerUniforms(_).declareVariables(g,b,h)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return r.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:s,dataType:e.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:d},{inputs:[e,n],outputs:[-1]})[0]},qo=(r,e,n,t,o,i,a,s)=>{let u=i;if(a&&C.size(a.dims)>0){if(t===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=F3(r,i,a,e,t,n*o,s),u=u.reshape([e,t,n,o]),n===1||t===1?u:r.compute(at(u,P0.perm),{inputs:[u],outputs:[-1]})[0]}else return i.dims.length===3&&(u=i.reshape([e,t,n,o])),n===1||t===1?u:r.compute(at(u,P0.perm),{inputs:[u],outputs:[-1]})[0]},C0=(r,e)=>{let n=B3(r.inputs,e),t=r.inputs[0],o=Tt(r.inputs,1),i=Tt(r.inputs,2),a=Tt(r.inputs,3),s=Tt(r.inputs,4),u=Tt(r.inputs,5),l=Tt(r.inputs,6),d=Tt(r.inputs,7);if(t.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let f=o&&i&&o.dims.length===4&&i.dims.length===4,h=qo(r,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t,a,0);if(f)return po(r,h,o,i,s,void 0,l,d,u,n);if(!o||!i)throw new Error("key and value must be provided");let g=qo(r,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,o,a,n.hiddenSize),b=qo(r,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,i,a,2*n.hiddenSize);po(r,h,g,b,s,void 0,l,d,u,n)}});var V3,G3,U3,W3,zc,D0,k0,Mc=k(()=>{"use strict";le();ge();Xe();ye();V3=r=>{if(!r||r.length<1)throw new Error("too few inputs")},G3=(r,e)=>{let n=[],t=e.numOutputs;return r[1].dims[0]>0&&(r[1].getBigInt64Array().forEach(o=>n.push(Number(o))),t=n.length),ce({numOutputs:t,axis:e.axis,splitSizes:n})},U3=r=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${r}u; i += 1u ) {
    if (index < ${Q("uniforms.size_in_split_axis","i",r)}) {
        return i;
    }
    }
    return ${r}u;
}`,W3=r=>{let e=r.length,n=[];for(let t=0;t<e;++t){let o=r[t].setByIndices("indices","input[global_idx]");e===1?n.push(o):t===0?n.push(`if (output_number == ${t}u) { ${o} }`):t===e-1?n.push(`else { ${o} }`):n.push(`else if (output_number == ${t}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${r[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},zc=(r,e)=>{let n=r[0].dims,t=C.size(n),o=r[0].dataType,i=C.normalizeAxis(e.axis,n.length),a=new Array(e.numOutputs),s=N("input",o,n.length),u=new Array(e.numOutputs),l=[],d=[],f=0,h=[{type:12,data:t}];for(let b=0;b<e.numOutputs;b++){f+=e.splitSizes[b],u[b]=f;let _=n.slice();_[i]=e.splitSizes[b],d.push(_),a[b]=G(`output${b}`,o,_.length),l.push({dims:d[b],dataType:r[0].dataType})}h.push({type:12,data:u},...W(n,...d));let g=b=>`
  ${b.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(s,...a)}
  ${U3(u.length)}
  ${W3(a)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${s.offsetToIndices("global_idx")};
    var index = ${s.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${Q("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${s.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:e.cacheKey,inputDependencies:["rank"]},getShaderSource:g,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(t/64)},programUniforms:h})}},D0=(r,e)=>{V3(r.inputs);let n=r.inputs.length===1?e:G3(r.inputs,e);r.compute(zc(r.inputs,n),{inputs:[0]})},k0=r=>{let e=r.axis,n=r.splitSizes,t=r.numOutputs<0?n.length:r.numOutputs;if(t!==n.length)throw new Error("numOutputs and splitSizes length must be equal");return ce({axis:e,numOutputs:t,splitSizes:n})}});var H3,Xa,N0,Bc=k(()=>{"use strict";le();ge();Xe();ye();H3=(r,e)=>{let[n,t,o,i]=r,{numHeads:a,rotaryEmbeddingDim:s}=e;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!C.areEqual(t.dims,[])&&!C.areEqual(t.dims,[1])&&t.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${t.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!C.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(s>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=n.dims[0],l=n.dims[n.dims.length-2],d=o.dims[0],f=C.sizeFromDimension(n.dims,1)/l,h=s===0?o.dims[1]*2:f/a;if(s>h)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(t.dims.length===2){if(u!==t.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${t.dims[0]}`);if(l!==t.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${t.dims[1]}`)}if(h/2!==o.dims[1]&&s/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(l>d)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Xa=(r,e)=>{let{interleaved:n,numHeads:t,rotaryEmbeddingDim:o,scale:i}=e,a=r[0].dims[0],s=C.sizeFromDimension(r[0].dims,1),u=r[0].dims[r[0].dims.length-2],l=s/u,d=r[2].dims[1],f=o===0?d*2:l/t,h=new Array(a,u,l/f,f-d),g=C.computeStrides(h),b=[{type:1,data:i},{type:12,data:h},{type:12,data:g},...r[0].dims.length===3?new Array({type:12,data:[s,l,f,1]}):[],...r[0].dims.length===4?new Array({type:12,data:[s,f,u*f,1]}):[],...W(r[0].dims,r[1].dims,r[2].dims,r[3].dims,r[0].dims)],_=T=>{let v=N("input",r[0].dataType,r[0].dims.length),x=N("position_ids",r[1].dataType,r[1].dims.length),I=N("cos_cache",r[2].dataType,r[2].dims.length),$=N("sin_cache",r[3].dataType,r[3].dims.length),O=G("output",r[0].dataType,r[0].dims.length);return T.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:g.length},{name:"input_output_strides",type:"u32",length:g.length}]),`
        ${T.declareVariables(v,x,I,$,O)}

        ${T.mainStart(Wr)}
          let half_rotary_emb_dim = uniforms.${I.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${x.broadcastedIndicesToOffset("bsnh.xy",G("",x.type.tensor,2))};
            let position_id =
                u32(${x.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${v.getByOffset("i")} * ${I.get("position_id","bsnh[3]")} -
                ${v.getByOffset("j")} * ${$.get("position_id","bsnh[3]")};
            ${O.setByOffset("i","re")}
            let im = ${v.getByOffset("i")} * ${$.get("position_id","bsnh[3]")} +
                ${v.getByOffset("j")} * ${I.get("position_id","bsnh[3]")};
            ${O.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${O.setByOffset("k",v.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:ce({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:r[0].dims,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(C.size(h)/Wr)},programUniforms:b})}},N0=(r,e)=>{H3(r.inputs,e),r.compute(Xa(r.inputs,e))}});var j3,q3,L0,K3,R0,z0=k(()=>{"use strict";Xe();le();Ba();Rc();Mc();Yn();Bc();ye();j3=(r,e)=>{if(e.doRotary&&r.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=r[0],t=r[1],o=r[2],i=r[3],a=r[4];if(e.doRotary!==0&&r.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(e.localWindowSize!==-1)throw new Error("Local attention is not supported");if(e.softcap!==0)throw new Error("Softcap is not supported");if(e.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(e.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let s=!1,u=n.dims[0],l=n.dims[1],d=n.dims.length===3?s?n.dims[2]/3:n.dims[2]:e.numHeads*n.dims[4],f=l,h=0,g=!t||t.dims.length===0,b=Math.floor(g?d/(e.numHeads+2*e.kvNumHeads):d/e.numHeads);g&&(d=b*e.numHeads);let _=i&&i.dims.length!==0,T=a&&a.dims.length!==0;if(_&&i.dims.length===4&&i.dims[0]===u&&i.dims[1]!==e.kvNumHeads&&i.dims[2]===e.kvNumHeads&&i.dims[3]===b)throw new Error("BSNH pastKey/pastValue is not supported");if(_&&T){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');h=i.dims[2]}else if(_||T)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let x=1;if(t&&t.dims.length>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(n.dims[2]%t.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');f=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==b)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');f=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==b)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');f=t.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==e.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');x=3}let I=0,$=!1,O=e.kvNumHeads?b*e.kvNumHeads:d;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(f!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');O=o.dims[2]}else{if(f!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');O=o.dims[1]*o.dims[3],$=!0}}let E=r.length>4?r[5]:void 0;if(E&&E.dims.length!==1&&E.dims[0]!==u)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:u,sequenceLength:l,pastSequenceLength:h,kvSequenceLength:f,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:d,vHiddenSize:O,headSize:b,vHeadSize:Math.floor(O/e.kvNumHeads),numHeads:e.numHeads,kvNumHeads:e.kvNumHeads,nReps:e.numHeads/e.kvNumHeads,pastPresentShareBuffer:!1,maskType:I,scale:e.scale,broadcastResPosBias:!1,passPastInKv:$,qkvFormat:x}},q3=ce({perm:[0,2,1,3]}),L0=(r,e,n)=>{let t=e,o=n.kvNumHeads;return e.dims.length===3&&n.kvSequenceLength!==0&&(t=e.reshape([n.batchSize,n.kvSequenceLength,o,n.headSize]),t=r.compute(at(t,q3.perm),{inputs:[t],outputs:[-1]})[0]),t},K3=(r,e,n,t)=>{let o=7,i=["type","type"],a=[r*e],s=r*e,u=[{type:12,data:s},{type:12,data:e},{type:12,data:r}],l=d=>{let f=N("seq_lens",n.dataType,n.dims),h=N("total_seq_lens",t.dataType,t.dims),g=G("pos_ids",o,a),b=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${d.registerUniforms(b).declareVariables(f,h,g)}
  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${h.getByOffset("0")});
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
      ${g.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${g.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${g.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${r};${e}`,inputDependencies:i},getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u}),getShaderSource:l}},R0=(r,e)=>{let n=j3(r.inputs,e);if(r.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(r.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let t=r.inputs[0],o=r.inputs[1]&&r.inputs[1].dims.length>0?r.inputs[1]:void 0,i=r.inputs[2]&&r.inputs[2].dims.length>0?r.inputs[2]:void 0,a=r.inputs[3]&&r.inputs[3].dims.length!==0?r.inputs[3]:void 0,s=r.inputs[4]&&r.inputs[4].dims.length!==0?r.inputs[4]:void 0,u=r.inputs.length>4?r.inputs[5]:void 0,l=r.inputs.length>5?r.inputs[6]:void 0,d=n.kvNumHeads?n.kvNumHeads:n.numHeads,f=ce({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,d*n.headSize,d*n.headSize]}),[h,g,b]=!o&&!i?r.compute(zc([t],f),{inputs:[t],outputs:[-1,-1,-1]}):[t,o,i],_,T;if(e.doRotary){let $=r.compute(K3(n.batchSize,n.sequenceLength,u,l),{inputs:[u,l],outputs:[-1]})[0],O=r.inputs[7],E=r.inputs[8],L=ce({interleaved:e.rotaryInterleaved!==0,numHeads:n.numHeads,rotaryEmbeddingDim:0,scale:e.scale}),R=[h,$,O,E],F=[-1];_=r.compute(Xa(R,L),{inputs:R,outputs:F})[0],R.splice(0,1,g);let q=ce({interleaved:e.rotaryInterleaved!==0,numHeads:n.kvNumHeads,rotaryEmbeddingDim:0,scale:e.scale});T=r.compute(Xa(R,q),{inputs:R,outputs:F})[0]}let v=qo(r,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,e.doRotary?_:h,void 0,0),x=L0(r,e.doRotary?T:g,n),I=L0(r,b,n);po(r,v,x,I,void 0,void 0,a,s,void 0,n,u,l)}});var M0,X3,Z3,B0,F0=k(()=>{"use strict";le();ge();Yn();ye();M0=(r,e,n,t,o,i,a,s)=>{let u=Ee(i),l=u===1?"f32":`vec${u}f`,d=u===1?"vec2f":`mat2x${u}f`,f=o*a,h=64;f===1&&(h=256);let g=[o,a,i/u],b=[o,a,2],_=["rank","type","type"],T=[];T.push(...W(g,b));let v=x=>{let I=N("x",e.dataType,3,u),$=N("scale",n.dataType,n.dims),O=N("bias",t.dataType,t.dims),E=G("output",1,3,2),L=[I,$,O,E];return`
  var<workgroup> workgroup_shared : array<${d}, ${h}>;
  const workgroup_size = ${h}u;
  ${x.declareVariables(...L)}
  ${x.mainStart(h)}
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
    workgroup_shared[local_idx] = ${d}(sum, squared_sum);
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

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${s}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return r.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${s};${h}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:b,dataType:1}],dispatchGroup:{x:f},programUniforms:T}),getShaderSource:v},{inputs:[e,n,t],outputs:[-1]})[0]},X3=(r,e,n)=>{let t=e[0].dims,o=t,i=2,a=t[0],s=t[1],u=C.sizeFromDimension(t,i),l=Ee(u),d=C.size(o)/l,f=M0(r,e[0],e[1],e[2],a,u,s,n.epsilon),h=[a,s,u/l],g=[a,s],b=["type","none"],_=T=>{let v=N("x",e[0].dataType,h.length,l),x=N("scale_shift",1,g.length,2),I=G("output",e[0].dataType,h.length,l),$=[v,x,I];return`
  ${T.registerUniform("output_size","u32").declareVariables(...$)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${I.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${x.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${v.getByOffset("global_idx")} * ${I.type.value}(scale_shift.x) + ${I.type.value}(scale_shift.y);
      ${I.setByOffset("global_idx","value")};
  }`};r.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:[{type:12,data:d},...W(h,g,h)]}),getShaderSource:_},{inputs:[e[0],f]})},Z3=(r,e,n)=>{let t=e[0].dims,o=t,i=t[0],a=t[t.length-1],s=C.sizeFromDimension(t,1)/a,u=Ee(a),l=C.size(o)/u,d=[{type:12,data:s},{type:12,data:Math.floor(a/u)}],f=["type","type"],h=!1,g=[0,t.length-1];for(let v=0;v<t.length-2;v++)h=h||t[v+1]!==1,g.push(v+1);h=h&&t[t.length-1]!==1;let b=h?r.compute(at(r.inputs[0],g),{inputs:[r.inputs[0]],outputs:[-1]})[0]:r.inputs[0].reshape(Array.from({length:t.length},(v,x)=>t[g[x]])),_=M0(r,b,e[1],e[2],i,s,a,n.epsilon),T=v=>{let x=Ve(e[0].dataType),I=u===1?"vec2f":`mat${u}x2f`,$=L=>{let R=L===0?"x":"y",F=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${x}(${F}(scale.${R}))`;case 2:return`vec2<${x}>(${F}(scale[0].${R}, scale[1].${R}))`;case 4:return`vec4<${x}>(${F}(scale[0].${R}, scale[1].${R}, scale[2].${R}, scale[3].${R}))`;default:throw new Error(`Not supported compoents ${u}`)}},O=N("input",e[0].dataType,e[0].dims,u),E=G("output",e[0].dataType,o,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${O.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${I}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${E.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${v.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${$(0)}, ${$(1)});
  }`};r.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:T},{inputs:[e[0],_]})},B0=(r,e)=>{e.format==="NHWC"?Z3(r,r.inputs,e):X3(r,r.inputs,e)}});var J3,Y3,V0,G0=k(()=>{"use strict";le();ge();ye();J3=r=>{if(!r||r.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Y3=(r,e,n)=>{let t=e.simplified,o=r[0].dims,i=r[1],a=!t&&r[2],s=o,u=C.normalizeAxis(e.axis,o.length),l=C.sizeToDimension(o,u),d=C.sizeFromDimension(o,u),f=C.size(i.dims),h=a?C.size(a.dims):0;if(f!==d||a&&h!==d)throw new Error(`Size of X.shape()[axis:] == ${d}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${f} and bias size of ${h}`);let g=[];for(let O=0;O<o.length;++O)O<u?g.push(o[O]):g.push(1);let b=Ee(d),_=["type","type"],T=[{type:12,data:l},{type:1,data:d},{type:12,data:Math.floor(d/b)},{type:1,data:e.epsilon}];a&&_.push("type");let v=n>1,x=n>2,I=O=>{let E=Ve(r[0].dataType),L=[N("x",r[0].dataType,r[0].dims,b),N("scale",i.dataType,i.dims,b)];a&&L.push(N("bias",a.dataType,a.dims,b)),L.push(G("output",r[0].dataType,s,b)),v&&L.push(G("mean_data_output",1,g)),x&&L.push(G("inv_std_output",1,g));let R=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${O.registerUniforms(R).declareVariables(...L)}
  ${O.mainStart()}
    ${O.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${wc("f32",b)};
    var mean_square_vector = ${wc("f32",b)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Hr(E,b,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Kt("mean_vector",b)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Kt("mean_square_vector",b)} / uniforms.norm_size ${t?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Hr(E,b,"x[j + offset]")};
      let f32scale = ${Hr(E,b,"scale[j]")};
      output[j + offset] = ${L[0].type.value}((f32input ${t?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${Hr(E,b,"bias[j]")}`:""}
      );
    }

    ${v?"mean_data_output[global_idx] = mean":""};
    ${x?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},$=[{dims:s,dataType:r[0].dataType}];return v&&$.push({dims:g,dataType:1}),x&&$.push({dims:g,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${b};${n};${t}`,inputDependencies:_},getRunData:()=>({outputs:$,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:T}),getShaderSource:I}},V0=(r,e)=>{J3(r.inputs),r.compute(Y3(r.inputs,e,r.outputCount))}});var Q3,U0,W0=k(()=>{"use strict";ge();Ha();ja();Q3=r=>{if(!r||r.length!==2)throw new Error("MatMul requires 2 inputs.");if(r[0].dims[r[0].dims.length-1]!==r[1].dims[r[1].dims.length-2])throw new Error("shared dimension does not match.")},U0=r=>{Q3(r.inputs);let e=Fn.calcShape(r.inputs[0].dims,r.inputs[1].dims,!0);if(!e)throw new Error("Can't use matmul on the given tensors");let n=e[e.length-1],t=r.inputs[0].dims[r.inputs[0].dims.length-1];if(n<8&&t<8)r.compute(Wa(r.inputs,{activation:""},e));else{let o=e[e.length-2],i=C.size(r.inputs[0].dims.slice(0,-2)),a=C.size(r.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&a===1){let s=r.inputs[0].reshape([1,i,t]),u=r.inputs[1].reshape([1,t,n]),l=[1,i,n],d=[s,u];r.compute(jo(d,{activation:""},e,l),{inputs:d})}else r.compute(jo(r.inputs,{activation:""},e))}}});var eE,tE,nE,H0,j0,q0=k(()=>{"use strict";le();ge();Xe();ye();eE=(r,e)=>{if(r.length<3||r.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=r[0],t=n.dims.length;if(n.dims[t-1]!==e.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((e.k+e.blockSize-1)/e.blockSize),i=e.blockSize/8*e.bits,a=r[1];if(!C.areEqual(a.dims,[e.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=r[2].dims;if(C.size(u)!==e.n*o)throw new Error("scales input size error.");if(r.length===4){let d=r[3].dims,f=e.n*(e.bits===8?o:Math.floor((o*e.bits+7)/8));if(C.size(d)!==f)throw new Error("zeroPoints input size error.")}},tE=(r,e)=>{let n=r[0].dims,t=n.length,o=n[t-2],i=e.k,a=e.n,s=n.slice(0,t-2),u=C.size(s),d=r[1].dims[2]/4,f=r[0].dataType,h=Ee(e.k),g=Ee(d),b=Ee(a),_=s.concat([o,a]),T=o>1&&a/b%2===0?2:1,v=C.size(_)/b/T,x=64,I=[],$=[u,o,i/h],O=C.convertShape(r[1].dims).slice();O.splice(-1,1,d/g),I.push(...W($)),I.push(...W(O)),I.push(...W(r[2].dims)),r.length===4&&I.push(...W(C.convertShape(r[3].dims)));let E=[u,o,a/b];I.push(...W(E));let L=R=>{let F=$.length,q=N("a",r[0].dataType,F,h),Z=N("b",12,O.length,g),re=N("scales",r[2].dataType,r[2].dims.length),pe=[q,Z,re],K=r.length===4?N("zero_points",12,r[3].dims.length):void 0;K&&pe.push(K);let Oe=E.length,fe=G("output",r[0].dataType,Oe,b),J=Ve(r[0].dataType),he=(()=>{switch(h){case 1:return`array<${J}, 8>`;case 2:return`mat4x2<${J}>`;case 4:return`mat2x4<${J}>`;default:throw new Error(`${h}-component is not supported.`)}})(),ee=()=>{let Se=`
          // reuse a data
            var input_offset = ${q.indicesToOffset(`${q.type.indices}(batch, row, word_offset)`)};
            var a_data: ${he};
            for (var j: u32 = 0; j < ${8/h}; j++) {
              a_data[j] = ${q.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let ae=0;ae<b*T;ae++)Se+=`
            b_value = ${g===1?`b${ae}_data`:`b${ae}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${he}(${Array.from({length:4},(U,z)=>`${J}(b_value_lower[${z}]), ${J}(b_value_upper[${z}])`).join(", ")});
            b_dequantized_values = ${h===1?`${he}(${Array.from({length:8},(U,z)=>`(b_quantized_values[${z}] - ${K?`zero_point${ae}`:"zero_point"}) * scale${ae}`).join(", ")});`:`(b_quantized_values - ${he}(${Array(8).fill(`${K?`zero_point${ae}`:"zero_point"}`).join(",")})) * scale${ae};`};
            workgroup_shared[local_id.x * ${T} + ${Math.floor(ae/b)}]${b>1?`[${ae%b}]`:""} += ${Array.from({length:8/h},(U,z)=>`${h===1?`a_data[${z}] * b_dequantized_values[${z}]`:`dot(a_data[${z}], b_dequantized_values[${z}])`}`).join(" + ")};
          `;return Se},Te=()=>{let Se=`
            var col_index = col * ${b};
            ${K?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${J}(8);`}
            `;for(let ae=0;ae<b*T;ae++)Se+=`
            let scale${ae} = ${re.getByOffset("col_index * nBlocksPerCol + block")};
            ${K?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${K.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${ae} = ${J}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return Se},Ze=()=>{let Se=`col_index = col * ${b};`;for(let ae=0;ae<b*T;ae++)Se+=`
            let b${ae}_data = ${Z.getByIndices(`${Z.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return Se+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${he};
            var b_dequantized_values: ${he};`,Se};return`
        var<workgroup> workgroup_shared: array<${fe.type.value}, ${T*x}>;
        ${R.declareVariables(...pe,fe)}
        ${R.mainStart([x,1,1])}
          let output_indices = ${fe.offsetToIndices(`(global_idx / ${x}) * ${T}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${x}) {
            //process one block
            var word_offset: u32 = block * ${e.blockSize/h};
            ${Te()}
            for (var word: u32 = 0; word < ${d}; word += ${g}) {
              ${Ze()}
              for (var i: u32 = 0; i < ${g}; i++) {
                ${ee()}
                word_offset += ${8/h};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${T}) {
            var output_value: ${fe.type.value} = ${fe.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${x}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${T};
            }
            ${fe.setByIndices(`${fe.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${e.blockSize};${e.bits};${h};${g};${b};${T};${x}`,inputDependencies:Array(r.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:f}],dispatchGroup:{x:v},programUniforms:I}),getShaderSource:L}},nE=(r,e)=>{let n=r[0].dims,t=n.length,o=n[t-2],i=e.k,a=e.n,s=n.slice(0,t-2),u=C.size(s),d=r[1].dims[2]/4,f=r[0].dataType,h=Ee(e.k),g=Ee(d),b=s.concat([o,a]),_=128,T=a%8===0?8:a%4===0?4:1,v=_/T,x=v*g*8,I=x/h,$=x/e.blockSize,O=C.size(b)/T,E=[],L=[u,o,i/h],R=C.convertShape(r[1].dims).slice();R.splice(-1,1,d/g),E.push(...W(L)),E.push(...W(R)),E.push(...W(r[2].dims)),r.length===4&&E.push(...W(C.convertShape(r[3].dims)));let F=[u,o,a];E.push(...W(F));let q=Z=>{let re=L.length,pe=N("a",r[0].dataType,re,h),K=N("b",12,R.length,g),Oe=N("scales",r[2].dataType,r[2].dims.length),fe=[pe,K,Oe],J=r.length===4?N("zero_points",12,r[3].dims.length):void 0;J&&fe.push(J);let he=F.length,ee=G("output",r[0].dataType,he),Te=Ve(r[0].dataType),Ze=()=>{switch(h){case 1:return`
          let a_data0 = vec4<${Te}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${Te}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${Te}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${Te}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${h}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${pe.type.value}, ${I}>;
        var<workgroup> inter_results: array<array<${ee.type.value}, ${v}>, ${T}>;
        ${Z.declareVariables(...fe,ee)}
        ${Z.mainStart([v,T,1])}
          let output_indices = ${ee.offsetToIndices(`workgroup_index * ${T}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${$} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${I};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${I}; a_offset += ${_})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${pe.getByIndices(`${pe.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${pe.type.value}(0);
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
            let zero_point = ${Te}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${Te}(8);`}
            let scale = ${Oe.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${K.getByIndices(`${K.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${e.blockSize/h};
            for (var i: u32 = 0; i < ${g}; i++) {
              ${Ze()}
              let b_value = ${g===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${Te}>(${Array.from({length:4},(Se,ae)=>`${Te}(b_value_lower[${ae}]), ${Te}(b_value_upper[${ae}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${Te}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(Se,ae)=>`${`dot(a_data${ae}, b_dequantized_values[${ae}])`}`).join(" + ")};
              word_offset += ${8/h};
            }
            workgroupBarrier();
          }

          if (local_idx < ${T}) {
            var output_value: ${ee.type.value} = ${ee.type.value}(0);
            for (var b = 0u; b < ${v}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ee.setByIndices(`${ee.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${e.blockSize};${h};${g};${v};${T}`,inputDependencies:Array(r.length).fill("rank")},getRunData:()=>({outputs:[{dims:b,dataType:f}],dispatchGroup:{x:O},programUniforms:E}),getShaderSource:q}},H0=(r,e)=>{eE(r.inputs,e),e.blockSize===32&&r.adapterInfo.isVendor("intel")&&r.adapterInfo.isArchitecture("gen-12lp")?r.compute(nE(r.inputs,e)):r.compute(tE(r.inputs,e))},j0=r=>ce(r)});var rE,oE,iE,aE,sE,uE,lE,cE,K0,X0=k(()=>{"use strict";le();ge();ye();rE=r=>{if(!r||r.length<1)throw new Error("Too few inputs");if(r[0].dataType!==1&&r[0].dataType!==10)throw new Error("Input type must be float or float16.");if(r.length>=2){let e=r[0].dims.length*2===r[1].dims[0];if(r.length===4&&(e=r[3].dims[0]*2===r[1].dims[0]),!e)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},oE=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
            k = i32(${r.indicesGet("indices",o)}) - ${Q("uniforms.pads",o,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${Q("uniforms.x_shape",o,e)})) {
              break;
            }
            offset += k * i32(${Q("uniforms.x_strides",o,e)});
        `;return`
          value = ${r.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${t}
            value = x[offset];
          }
      `},iE=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${Q("uniforms.pads",o,n)};
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
          `},aE=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${Q("uniforms.pads",o,n)};
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
          `},sE=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${Q("uniforms.pads",o,n)};
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
          `},uE=(r,e,n)=>{switch(n.mode){case 0:return oE(r,e,n.pads.length);case 1:return iE(r,e,n.pads.length);case 2:return aE(r,e,n.pads.length);case 3:return sE(r,e,n.pads.length);default:throw new Error("Invalid mode")}},lE=(r,e)=>{let n=C.padShape(r[0].dims.slice(),e.pads),t=r[0].dims,o=C.size(n),i=[{type:12,data:o},{type:6,data:e.pads}],a=r.length>=3&&r[2].data;e.mode===0&&i.push({type:a?r[2].dataType:1,data:e.value}),i.push(...W(r[0].dims,n));let s=["rank"],u=l=>{let d=G("output",r[0].dataType,n.length),f=N("x",r[0].dataType,t.length),h=f.type.value,g=uE(d,t.length,e),b=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:e.pads.length}];return e.mode===0&&b.push({name:"constant_value",type:a?h:"f32"}),`
            ${l.registerUniforms(b).declareVariables(f,d)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${d.offsetToIndices("global_idx")};

            var value = ${h}(0);
            ${g}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${e.mode}${a}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(C.size(n)/64)},programUniforms:i}),getShaderSource:u}},cE=(r,e)=>{if(r.length>1){let n=r[1].getBigInt64Array(),t=r.length>=3&&r[2].data?r[2].dataType===10?r[2].getUint16Array()[0]:r[2].getFloat32Array()[0]:0,o=r[0].dims.length,i=new Int32Array(2*o).fill(0);if(r.length>=4){let s=r[3].getBigInt64Array();for(let u=0;u<s.length;u++)i[Number(s[u])]=Number(n[u]),i[Number(s[u])+o]=Number(n[u+s.length])}else n.forEach((s,u)=>i[Number(u)]=Number(s));let a=[];return i.forEach(s=>a.push(s)),{mode:e.mode,value:t,pads:a}}else return e},K0=(r,e)=>{rE(r.inputs);let n=cE(r.inputs,e);r.compute(lE(r.inputs,n),{inputs:[0]})}});var Za,Z0,J0,Y0,Q0,dE,pE,ew,tw,nw,rw,ow,iw,aw,sw,uw,lw,cw,dw,pw=k(()=>{"use strict";pt();le();ge();ye();Za=r=>{if(me.webgpu.validateInputContent&&(!r||r.length!==1))throw new Error("Pool ops requires 1 input.")},Z0=(r,e,n)=>{let t=e.format==="NHWC",o=r.dims.slice();t&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(e,"dilations"),a=e.kernelShape.slice(),s=e.strides.slice(),u=i?e.dilations.slice():[],l=e.pads.slice();Ur.adjustPoolAttributes(n,o,a,s,u,l);let d=Ur.computePoolOutputShape(n,o,s,u,a,l,e.autoPad),f=Object.assign({},e);i?Object.assign(f,{kernelShape:a,strides:s,pads:l,dilations:u,cacheKey:e.cacheKey}):Object.assign(f,{kernelShape:a,strides:s,pads:l,cacheKey:e.cacheKey});let h=d.slice();return h.push(h.splice(1,1)[0]),[f,t?h:d]},J0=(r,e)=>{let n=e.format==="NHWC",t=C.size(r),o=C.size(e.kernelShape),i=[{type:12,data:t},{type:12,data:o}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(e.kernelShape.length<=2){let s=e.kernelShape[e.kernelShape.length-1],u=e.strides[e.strides.length-1],l=e.pads[e.pads.length/2-1],d=e.pads[e.pads.length-1],f=!!(l+d);i.push({type:12,data:s},{type:12,data:u},{type:12,data:l},{type:12,data:d}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let h=!1;if(e.kernelShape.length===2){let g=e.kernelShape[e.kernelShape.length-2],b=e.strides[e.strides.length-2],_=e.pads[e.pads.length/2-2],T=e.pads[e.pads.length-2];h=!!(_+T),i.push({type:12,data:g},{type:12,data:b},{type:12,data:_},{type:12,data:T}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,f,h]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let s=C.computeStrides(e.kernelShape);i.push({type:12,data:s},{type:12,data:e.pads},{type:12,data:e.strides}),a.push({name:"kernelStrides",type:"u32",length:s.length},{name:"pads",type:"u32",length:e.pads.length},{name:"strides",type:"u32",length:e.strides.length});let u=e.pads.reduce((l,d)=>l+d);return[i,a,!!u,!1,!1]}},Y0=(r,e,n,t,o,i,a,s,u,l,d,f)=>{let h=o.format==="NHWC",g=e.type.value,b=G("output",e.type.tensor,t);if(o.kernelShape.length<=2){let _="",T="",v="",x=n-(h?2:1);if(d?_=`
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
                }`,o.kernelShape.length===2){let $=n-(h?3:2);f?T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${$}] < 0 || xIndices[${$}] >= uniforms.x_shape[${$}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sh - uniforms.phStart + j;
                `,v=`
              }
            `}return`
            ${r.registerUniforms(u).declareVariables(e,b)}

            ${r.mainStart()}
              ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${b.offsetToIndices("global_idx")};
              var xIndices = ${b.offsetToIndices("global_idx")};

              var value = ${g}(${s});
              var pad = 0;
              ${T}
              ${_}
              ${v}
              ${a}

              output[global_idx] = value;
            }`}else{if(h)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let _=o.kernelShape.length,T=o.pads.length,v="";return l?v=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${e.indicesToOffset("xIndices")}];
                ${i}
              }`:v=`
              }
              let x_val = x[${e.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${r.registerUniforms(u).declareVariables(e,b)}

            ${r.mainStart()}
              ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${b.offsetToIndices("global_idx")};
              var xIndices = ${b.offsetToIndices("global_idx")};

              var offsets: array<u32, ${_}>;

              var value = ${g}(${s});
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
                for (var j = ${n-_}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${Q("uniforms.strides",`j - ${n-_}u`,_)}
                    + offsets[j - ${n-_}u] - ${Q("uniforms.pads","j - 2u",T)};
                  ${v}
              }
              ${a}

              output[global_idx] = value;
            }`}},Q0=r=>`${r.format};${r.ceilMode};${r.autoPad};${r.kernelShape.length}`,dE=r=>`${Q0(r)};${r.countIncludePad}`,pE=r=>`${Q0(r)};${r.storageOrder};${r.dilations}`,ew=r=>({format:r.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][r.auto_pad],ceilMode:r.ceil_mode,kernelShape:r.kernel_shape,strides:r.strides,pads:r.pads}),tw=(r,e,n,t)=>{let[o,i]=Z0(e,t,n),a=N("x",e.dataType,e.dims.length),s=a.type.value,u="value += x_val;",l="";o.countIncludePad?l+=`value /= ${s}(uniforms.kernelSize);`:l+=`value /= ${s}(i32(uniforms.kernelSize) - pad);`;let[d,f,h,g,b]=J0(i,o);d.push(...W(e.dims,i));let _=["rank"];return{name:r,shaderCache:{hint:`${t.cacheKey};${h};${g};${b}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(C.size(i)/64)},programUniforms:d}),getShaderSource:T=>Y0(T,a,e.dims.length,i.length,o,u,l,0,f,h,g,b)}},nw=r=>{let e=r.count_include_pad!==0,n=ew(r);if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let t={countIncludePad:e,...n,cacheKey:""};return{...t,cacheKey:dE(t)}},rw=(r,e)=>{Za(r.inputs),r.compute(tw("AveragePool",r.inputs[0],!1,e))},ow={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},iw=r=>{let e=r.format;return{format:e,...ow,cacheKey:e}},aw=(r,e)=>{Za(r.inputs),r.compute(tw("GlobalAveragePool",r.inputs[0],!0,e))},sw=(r,e,n,t)=>{let[o,i]=Z0(e,t,n),a=`
      value = max(x_val, value);
    `,s="",u=N("x",e.dataType,e.dims.length),l=["rank"],[d,f,h,g,b]=J0(i,o);return d.push(...W(e.dims,i)),{name:r,shaderCache:{hint:`${t.cacheKey};${h};${g};${b}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(C.size(i)/64)},programUniforms:d}),getShaderSource:_=>Y0(_,u,e.dims.length,i.length,o,a,s,e.dataType===10?-65504:-1e5,f,h,g,b)}},uw=(r,e)=>{Za(r.inputs),r.compute(sw("MaxPool",r.inputs[0],!1,e))},lw=r=>{let e=r.storage_order,n=r.dilations,t=ew(r);if(e!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(t.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:e,dilations:n,...t,cacheKey:""};return{...o,cacheKey:pE(o)}},cw=r=>{let e=r.format;return{format:e,...ow,cacheKey:e}},dw=(r,e)=>{Za(r.inputs),r.compute(sw("GlobalMaxPool",r.inputs[0],!0,e))}});var hE,mE,fw,hw,mw=k(()=>{"use strict";le();ge();Xe();ye();hE=(r,e)=>{if(r.length<2||r.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(r.length===3&&r[1].dims===r[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(r.length===3&&r[0].dataType!==r[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(r[0].dataType===6&&r.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(r[1].dims.length!==0&&r[1].dims.length!==1&&r[1].dims.length!==r[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(r.length>2){if(r[0].dataType!==r[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(r[1].dims.length!==r[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!r[1].dims.map((n,t)=>n===r[2].dims[t]).reduce((n,t)=>n&&t,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(e.blockSize>0){if(r[1].dims.length===0||r[1].dims.length===1&&r[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!r[1].dims.map((o,i)=>i===e.axis||o===r[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(r[1].dims.length!==r[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=r[0].dims[e.axis],t=r[1].dims[e.axis];if(e.blockSize<Math.ceil(n/t)||e.blockSize>Math.ceil(n/(t-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},mE=(r,e)=>{let n=C.normalizeAxis(e.axis,r[0].dims.length),t=r[0].dataType,o=t===3,i=r[0].dims,a=r[1].dataType,s=C.size(i),u=t===3||t===2,l=u?[Math.ceil(C.size(r[0].dims)/4)]:r[0].dims,d=r[1].dims,f=r.length>2?r[2]:void 0,h=f?u?[Math.ceil(C.size(f.dims)/4)]:f.dims:void 0,g=d.length===0||d.length===1&&d[0]===1,b=g===!1&&d.length===1,_=Ee(s),T=g&&(!u||_===4),v=T?_:1,x=T&&!u?_:1,I=N("input",u?12:t,l.length,x),$=N("scale",a,d.length),O=f?N("zero_point",u?12:t,h.length):void 0,E=G("output",a,i.length,v),L=[I,$];O&&L.push(O);let R=[l,d];f&&R.push(h);let F=[{type:12,data:s/v},{type:12,data:n},{type:12,data:e.blockSize},...W(...R,i)],q=Z=>{let re=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${Z.registerUniforms(re).declareVariables(...L,E)}
      ${Z.mainStart()}
          ${Z.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${E.offsetToIndices("global_idx")};

          // Set input x
          ${u?`
            let input = ${I.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${v===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${I.getByOffset("global_idx")};`};

          // Set scale input
          ${g?`let scale_value= ${$.getByOffset("0")}`:b?`
            let scale_index = ${E.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${$.getByOffset("scale_index")};`:`
            var scale_indices: ${$.type.indices} = output_indices;
            let index = ${$.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${$.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${$.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${O?g?u?`
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
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${O.getByIndices("scale_indices")};`:`let zero_point_value = ${u?o?"i32":"u32":I.type.value}(0);`};
      // Compute and write output
      ${E.setByOffset("global_idx",`${E.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:e.cacheKey,inputDependencies:O?["rank","rank","rank"]:["rank","rank"]},getShaderSource:q,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(s/v/64),y:1,z:1},programUniforms:F})}},fw=(r,e)=>{hE(r.inputs,e),r.compute(mE(r.inputs,e))},hw=r=>ce({axis:r.axis,blockSize:r.blockSize})});var gE,bE,gw,bw=k(()=>{"use strict";pt();le();ye();gE=(r,e,n)=>{let t=r===e,o=r<e&&n<0,i=r>e&&n>0;if(t||o||i)throw new Error("Range these inputs' contents are invalid.")},bE=(r,e,n,t)=>{let o=Math.abs(Math.ceil((e-r)/n)),i=[o],a=o,s=[{type:12,data:a},{type:t,data:r},{type:t,data:n},...W(i)],u=l=>{let d=G("output",t,i.length),f=d.type.value,h=[{name:"outputSize",type:"u32"},{name:"start",type:f},{name:"delta",type:f}];return`
        ${l.registerUniforms(h).declareVariables(d)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${f}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${t}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:s})}},gw=r=>{let e=0,n=0,t=0;r.inputs[0].dataType===6?(e=r.inputs[0].getInt32Array()[0],n=r.inputs[1].getInt32Array()[0],t=r.inputs[2].getInt32Array()[0]):r.inputs[0].dataType===1&&(e=r.inputs[0].getFloat32Array()[0],n=r.inputs[1].getFloat32Array()[0],t=r.inputs[2].getFloat32Array()[0]),me.webgpu.validateInputContent&&gE(e,n,t),r.compute(bE(e,n,t,r.inputs[0].dataType),{inputs:[]})}});var yE,_E,yw,_w,vw=k(()=>{"use strict";le();ge();Xe();ye();yE=(r,e,n,t)=>{if(r!=="none"&&t!=="i32"&&t!=="u32"&&t!=="f32")throw new Error(`Input ${t} is not supported with reduction ${r}.`);let o=`{
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
                ${o}max(bitcast<f32>(oldValue), (${n}))${i}`;case"min":return t==="i32"||t==="u32"?`atomicMin(&${e}, bitcast<${t}>(${n}));`:`${o}min(bitcast<${t}>(oldValue), (${n}))${i}`;case"mul":return`${o}(bitcast<${t}>(oldValue) * (${n}))${i}`;default:throw new Error(`Reduction ${r} is not supported.`)}},_E=(r,e)=>{let n=r[0].dims,t=r[1].dims,o=n,i=1,a=Math.ceil(C.sizeToDimension(t,t.length-1)/i),s=t[t.length-1],u=C.sizeFromDimension(n,s),l=[{type:12,data:a},{type:12,data:s},{type:12,data:u},...W(r[1].dims,r[2].dims,o)],d=f=>{let h=N("indices",r[1].dataType,r[1].dims.length),g=N("updates",r[2].dataType,r[2].dims.length,i),b=e.reduction!=="none"&&e.reduction!==""?jy("output",r[0].dataType,o.length):G("output",r[0].dataType,o.length,i);return`
      ${f.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(h,g,b)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${r[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
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
    ${yE(e.reduction,"output[data_offset + i]","value",b.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${e.cacheKey}_${e.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l}),getShaderSource:d}},yw=r=>ce({reduction:r.reduction}),_w=(r,e)=>{r.compute(_E(r.inputs,e),{inputs:[r.inputs[1],r.inputs[2]],outputs:[]})}});var vE,wE,xE,ww,TE,IE,SE,$E,AE,OE,PE,EE,xw,CE,DE,kE,NE,LE,Tw,Iw,Sw=k(()=>{"use strict";le();ge();Xe();ye();vE=(r,e)=>{if(r.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),r.length>0){if(e.mode==="linear"){if(!(r.length===2||r.length===3||r.length===4&&r[0]===1&&r[1]===1||r.length===4&&r[0]===1&&r[3]===1||r.length===5&&r[0]===1&&r[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(e.mode==="cubic"&&!(r.length===2||r.length===4&&r[0]===1&&r[1]===1||r.length===4&&r[0]===1&&r[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},wE=(r,e,n)=>{e.every(o=>o>=0&&o<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let t=new Array(n).fill(1);return e.forEach((o,i)=>t[o]=r[i]),t},xE=(r,e,n,t,o,i)=>{let[a,s,u]=n>10?[1,2,3]:[-1,r.length>1?1:-1,-1],l=r[0].dims.length;if(a>0&&r.length>a&&r[a].dims.length>0)r[a].getFloat32Array().forEach(d=>i.push(d));else if(e.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(s>0&&r.length>s&&r[s].dims.length===1&&r[s].dims[0]>0){if(r[s].getFloat32Array().forEach(d=>t.push(d)),t.length!==0&&t.length!==l&&n>=18&&t.length!==e.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");vE(t,e),e.axes.length>0&&wE(t,e.axes,l).forEach((d,f)=>t[f]=d)}if(u>0&&r.length>u&&r[u].dims.length===1&&r[u].dims[0]>0&&(r[u].getBigInt64Array().forEach(d=>o.push(Number(d))),o.length!==0&&o.length!==l&&n>=18&&o.length!==e.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(e.axes.length>0){if(t.length!==0&&t.length!==e.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==e.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof t<"u"&&typeof o<"u"&&t.length>0&&o.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},ww=(r,e,n,t)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${r}) * (${e});
  let whole = ${t}(big / (${n}));
  let fract = ${t}(big % (${n})) / ${t}(${n});
  return whole + fract;
`,TE=(r,e)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${e} { `+(()=>{switch(r){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${e}(xResized) / ${e}(xScale);
          } else {
            ${ww("xResized","lengthOriginal","lengthResized",e)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${e}(xResized) + 0.5) / ${e}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${e}(xResized) + 0.5) / ${e}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${ww("xResized","lengthOriginal - 1","lengthResized - 1",e)}
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
                  return offset + ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;case"half_pixel":return`return ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${r} is not supported`)}})()+"}",IE=(r,e,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(r){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(e<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${r} is not supported`)}})()+"}",SE=(r,e,n)=>{let t=new Array(n).fill(0).concat(new Array(n).fill(1)),o=r.length===0?t:r.slice();return e.length>0?(e.forEach((i,a)=>{t[i]=o[a],t[a+n]=o[e.length+a]}),t):o},$E=(r,e,n,t)=>{let o=[];if(n.length>0)if(t.length>0){if(r.forEach(i=>o.push(i)),Math.max(...t)>r.length)throw new Error("axes is out of bound");t.forEach((i,a)=>o[i]=n[a])}else n.forEach(i=>o.push(i));else{if(e.length===0)throw new Error("Resize requires either scales or sizes.");o=r.map((i,a)=>Math.round(i*e[a]))}return o},AE=(r,e,n)=>{let t=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(i=>e[i]),Number.MAX_VALUE):Math.min(...e,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(i=>e[i]),Number.MIN_VALUE):Math.max(...e,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();e.fill(1,0,e.length);let o=r.slice();return n.axes.length>0?(n.axes.forEach(i=>e[i]=t),n.axes.forEach(i=>o[i]=Math.round(r[i]*e[i]))):(e.fill(t,0,e.length),o.forEach((i,a)=>o[a]=Math.round(i*e[a]))),o},OE=(r,e,n,t,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${r.type.indices}) -> array<${r.type.value}, ${n.length}> {
      var original_indices: array<${r.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${r.indicesGet("output_indices","i")};
        var scale = ${Q("uniforms.scales","i",t)};
        var roi_low = ${Q("uniforms.roi","i",o)};
        var roi_hi = ${Q("uniforms.roi",`i + ${e.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${r.type.value}(output_index);
        } else {
          var input_shape_i = ${Q("uniforms.input_shape","i",e.length)};
          var output_shape_i = ${Q("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,PE=(r,e,n,t,o,i,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> ${r.type.indices} {
      var input_indices: ${r.type.indices};
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${Q("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${Q("uniforms.roi","i",i)};
          var roi_hi = ${Q("uniforms.roi",`i + ${n.length}`,i)};
          var input_shape_i = ${Q("uniforms.input_shape","i",n.length)};
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
        ${r.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,EE=(r,e)=>`
    fn checkInputIndices(input_indices: ${r.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${e.length}; i++) {
        var input_index = ${r.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${Q("uniforms.input_shape","i",e.length)}) {
          return false;
        }
      }
      return true;
    }`,xw=(r,e,n,t)=>r.rank>t?`
    ${r.indicesSet("input_indices",e,"channel")};
    ${r.indicesSet("input_indices",n,"batch")};
`:"",CE=(r,e,n,t,o)=>{let[a,s,u,l]=n.length===2?[-1,0,1,-1]:[0,2,3,1],d=r.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${r.type.indices};
      ${r.indicesSet("input_indices",s,`max(0, min(row, ${n[s]} - 1))`)};
      ${r.indicesSet("input_indices",u,`max(0, min(col, ${n[u]} - 1))`)};
      ${xw(r,l,a,2)}
      return ${r.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${e.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${s}];
      var col:${d} = originalIndices[${u}];
      ${t?`if (row < 0 || row > (${n[s]} - 1) || col < 0 || col > (${n[u]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${n[s]} - 1));
      col = max(0, min(col, ${n[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${n.length>2?`u32(originalIndices[${a}])`:"0"};
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
    }`},DE=(r,e,n,t,o,i,a,s,u,l)=>{let d=n.length===2,f=!0,[h,g]=d?[0,1]:f?[2,3]:[1,2],b=r.type.value,_=T=>{let v=T===h?"row":"col";return`
      fn ${v}CubicInterpolation(input_indices: ${r.type.indices}, output_indices: ${e.type.indices}) -> ${b} {
        var output_index = ${e.indicesGet("output_indices",T)};
        var originalIdx: ${b} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[T]},
        ${t[T]}, ${n[T]}, ${i[T]}, ${i[T]} + ${n.length});
        var fractOriginalIdx: ${b} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${s} && (originalIdx < 0 || originalIdx > (${n[T]} - 1))) {
          return ${u};
        }
        var data: array<${b}, 4> = array<${b}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${v}: ${b} = originalIdx + ${b}(i);
          if (${v} < 0 || ${v} >= ${n[T]}) {
            ${l?`coefs[i + 1] = 0.0;
                        continue;`:s?`return ${u};`:`${v} = max(0, min(${v}, ${n[T]} - 1));`};
          }
        var input_indices_copy: ${r.type.indices} = input_indices;
          ${r.indicesSet("input_indices_copy",T,`u32(${v})`)};
          data[i + 1] = ${T===h?r.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${_(h)};
    ${_(g)};
  fn getCubicInterpolationCoefs(s: ${b}) -> array<${b}, 4> {
    var absS = abs(s);
    var coeffs: array<${b}, 4> = array<${b}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${b} = 1.0 - absS;
    var twoMinusAbsS: ${b} = 2.0 - absS;
    var onePlusAbsS: ${b} = 1.0 + absS;
    coeffs[0] = ((${a} * onePlusAbsS - 5 * ${a}) * onePlusAbsS + 8 * ${a}) * onePlusAbsS - 4 * ${a};
    coeffs[1] = ((${a} + 2) * absS - (${a} + 3)) * absS * absS + 1;
    coeffs[2] = ((${a} + 2) * oneMinusAbsS - (${a} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${a} * twoMinusAbsS - 5 * ${a}) * twoMinusAbsS + 8 * ${a}) * twoMinusAbsS - 4 * ${a};
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
    `},kE=(r,e,n,t,o)=>{let[a,s,u,l,d]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],f=r.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${f} {
      var input_indices: ${r.type.indices};
      ${r.indicesSet("input_indices",s,`max(0, min(depth, ${n[s]} - 1))`)};
      ${r.indicesSet("input_indices",u,`max(0, min(height, ${n[u]} - 1))`)};
      ${r.indicesSet("input_indices",l,`max(0, min(width, ${n[l]} - 1))`)};
      ${xw(r,d,a,3)}
      return ${r.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${e.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${f} = originalIndices[${s}];
      var height:${f} = originalIndices[${u}];
      var width:${f} = originalIndices[${l}];
      ${t?`if (depth < 0 || depth > (${n[s]} - 1) || height < 0 || height > (${n[u]} - 1) || width < 0 || (width > ${n[l]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${n[s]} - 1));
      height = max(0, min(height, ${n[u]} - 1));
      width = max(0, min(width, ${n[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${a}])`:"0"};

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
    }`},NE=(r,e,n,t,o,i)=>{let a=r.dims,s=SE(i,e.axes,a.length),u=$E(a,t,o,e.axes),l=t.slice();t.length===0&&(l=a.map((x,I)=>x===0?1:u[I]/x),e.keepAspectRatioPolicy!=="stretch"&&(u=AE(a,l,e)));let d=G("output",r.dataType,u.length),f=N("input",r.dataType,a.length),h=C.size(u),g=a.length===u.length&&a.every((x,I)=>x===u[I]),b=e.coordinateTransformMode==="tf_crop_and_resize",_=e.extrapolationValue,T=f.type.value,v=x=>`
      ${g?"":`
      ${TE(e.coordinateTransformMode,T)};
      ${(()=>{switch(e.mode){case"nearest":return`
              ${EE(f,a)};
              ${IE(e.nearestMode,n,T)};
              ${PE(f,d,a,u,l.length,s.length,b)};
              `;case"linear":return`
              ${OE(d,a,u,l.length,s.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${CE(f,d,a,b,_)}`;if(a.length===3||a.length===5)return`${kE(f,d,a,b,_)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${DE(f,d,a,u,l,s,e.cubicCoeffA,b,e.extrapolationValue,e.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${x.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",s.length).declareVariables(f,d)}
      ${x.mainStart()}
        ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${g?"output[global_idx] = input[global_idx];":`
        let output_indices = ${d.offsetToIndices("global_idx")};
        var input_indices: ${f.type.indices};
        ${(()=>{switch(e.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${f.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${e.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${e.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${e.cacheKey}|${n}|${l.length>0?e.mode==="cubic"?l:l.length:""}|${o.length>0?o:""}|${s.length>0?s:""}|${g}|${e.mode==="nearest"?a.length:a}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:u,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},{type:1,data:l},{type:1,data:s},...W(a,u)]})}},LE=r=>{let e=r.customDataBuffer;return new Uint32Array(e,e.byteOffset,1)[0]},Tw=(r,e)=>{let n=[],t=[],o=[],i=LE(r);if(e.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");xE(r.inputs,e,i,n,t,o),r.compute(NE(r.inputs[0],e,i,n,t,o),{inputs:[0]})},Iw=r=>{let e=r.antialias,n=r.axes,t=r.coordinateTransformMode,o=r.cubicCoeffA,i=r.excludeOutside!==0,a=r.extrapolationValue,s=r.keepAspectRatioPolicy,u=r.mode,l=r.nearestMode===""?"simple":r.nearestMode;return ce({antialias:e,axes:n,coordinateTransformMode:t,cubicCoeffA:o,excludeOutside:i,extrapolationValue:a,keepAspectRatioPolicy:s,mode:u,nearestMode:l})}});var RE,zE,$w,Aw=k(()=>{"use strict";le();ge();ye();RE=r=>{if(!r||r.length<3)throw new Error("layerNorm requires at least 3 inputs.");let e=r[0],n=r[1],t=r[2];if(e.dataType!==n.dataType||e.dataType!==t.dataType)throw new Error("All inputs must have the same data type");if(e.dims.length!==3&&e.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=e.dims[e.dims.length-1],i=e.dims[e.dims.length-2];if(n.dims[n.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(t.dims.length!==1)throw new Error("Gamma must be 1D");if(t.dims[t.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(r.length>3){let a=r[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(r.length>4){let a=r[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},zE=(r,e,n,t)=>{let o=e.simplified,i=r[0].dims,a=C.size(i),s=i,u=a,l=i.slice(-1)[0],d=t?i.slice(0,-1).concat(1):[],f=!o&&r.length>3,h=r.length>4,g=t&&n>1,b=t&&n>2,_=n>3,T=64,v=Ee(l),x=[{type:12,data:u},{type:12,data:v},{type:12,data:l},{type:1,data:e.epsilon}],I=O=>{let E=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],L=[N("x",r[0].dataType,r[0].dims,v),N("skip",r[1].dataType,r[1].dims,v),N("gamma",r[2].dataType,r[2].dims,v)];f&&L.push(N("beta",r[3].dataType,r[3].dims,v)),h&&L.push(N("bias",r[4].dataType,r[4].dims,v)),L.push(G("output",r[0].dataType,s,v)),g&&L.push(G("mean_output",1,d)),b&&L.push(G("inv_std_output",1,d)),_&&L.push(G("input_skip_bias_sum",r[0].dataType,s,v));let R=Ve(r[0].dataType),F=Ve(1,v);return`

      ${O.registerUniforms(E).declareVariables(...L)}
      var<workgroup> sum_shared : array<${F}, ${T}>;
      var<workgroup> sum_squared_shared : array<${F}, ${T}>;

      ${O.mainStart([T,1,1])}
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
          let bias_value = ${h?"bias[offset1d + i]":R+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${_?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Hr(R,v,"value")};
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
        let mean = ${Kt("sum",v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Kt("square_sum",v)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${g?"mean_output[global_idx] = mean;":""}
        ${b?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${R}(mean)`}) *
            ${R}(inv_std_dev) * gamma[offset1d + i]
            ${f?"+ beta[offset1d + i]":""};
        }
      }`},$=[{dims:s,dataType:r[0].dataType}];return n>1&&$.push({dims:d,dataType:1}),n>2&&$.push({dims:d,dataType:1}),n>3&&$.push({dims:i,dataType:r[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${v};${g};${b};${_}`,inputDependencies:r.map((O,E)=>"type")},getShaderSource:I,getRunData:()=>({outputs:$,dispatchGroup:{x:Math.ceil(u/l)},programUniforms:x})}},$w=(r,e)=>{RE(r.inputs);let t=[0];r.outputCount>1&&t.push(-3),r.outputCount>2&&t.push(-3),r.outputCount>3&&t.push(3),r.compute(zE(r.inputs,e,r.outputCount,!1),{outputs:t})}});var ME,Ja,BE,Ow,FE,VE,Pw,Ew,Cw=k(()=>{"use strict";le();ge();Xe();ye();ME=(r,e)=>{if(!r||r.length<1)throw new Error("too few inputs");if(e.axes.length!==0){if(e.axes.length!==e.starts.length||e.axes.length!==e.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(e.starts.length!==e.ends.length)throw new Error("starts and ends must have the same length");r.slice(1).forEach((n,t)=>{if(r[t+1].dataType!==6&&r[t+1].dataType!==7)throw new Error(`Input ${t} must be an array of int32 or int64`)})},Ja=(r,e)=>{let n=[];if(r.length>e)if(r[e].dataType===7)r[e].getBigInt64Array().forEach(t=>n.push(Number(t)));else if(r[e].dataType===6)r[e].getInt32Array().forEach(t=>n.push(Number(t)));else throw new Error(`Input ${e} must be an array of int32 or int64`);return n},BE=(r,e)=>{if(r.length>1){let n=Ja(r,1),t=Ja(r,2),o=Ja(r,3);return o.length===0&&(o=[...Array(r[0].dims.length).keys()]),ce({starts:n,ends:t,axes:o})}else return e},Ow=(r,e,n,t,o)=>{let i=r;return r<0&&(i+=n[t[e]]),o[e]<0?Math.max(0,Math.min(i,n[t[e]]-1)):Math.max(0,Math.min(i,n[t[e]]))},FE=(r,e,n)=>`fn calculateInputIndices(output_indices: ${e.type.indices}) -> ${r.type.indices} {
          var input_indices: ${r.type.indices};
          var carry = 0u;
          for (var i = ${n.length-1}; i >= 0; i--) {
            let input_shape_i = ${Q("uniforms.input_shape","i",n.length)};
            let steps_i = ${Q("uniforms.steps","i",n.length)};
            let signs_i = ${Q("uniforms.signs","i",n.length)};
            let starts_i = ${Q("uniforms.starts","i",n.length)};
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
      }`,VE=(r,e)=>{let n=r[0].dims,t=C.size(n),o=e.axes.length>0?C.normalizeAxes(e.axes,n.length):[...Array(n.length).keys()],i=Ja(r,4);i.forEach(v=>v!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let a=e.starts.map((v,x)=>Ow(v,x,n,o,i)),s=e.ends.map((v,x)=>Ow(v,x,n,o,i));if(o.length!==a.length||o.length!==s.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==n.length)for(let v=0;v<n.length;++v)o.includes(v)||(a.splice(v,0,0),s.splice(v,0,n[v]),i.splice(v,0,1));let u=i.map(v=>Math.sign(v));i.forEach((v,x,I)=>{if(v<0){let $=(s[x]-a[x])/v,O=a[x],E=O+$*i[x];a[x]=E,s[x]=O,I[x]=-v}});let l=n.slice(0);o.forEach((v,x)=>{l[v]=Math.ceil((s[v]-a[v])/i[v])});let d={dims:l,dataType:r[0].dataType},f=G("output",r[0].dataType,l.length),h=N("input",r[0].dataType,r[0].dims.length),g=C.size(l),b=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:i.length}],_=[{type:12,data:g},{type:12,data:a},{type:6,data:u},{type:12,data:i},...W(r[0].dims,l)],T=v=>`
      ${v.registerUniforms(b).declareVariables(h,f)}
        ${FE(h,f,n)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${f.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${f.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${a.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:T,getRunData:()=>({outputs:[d],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:_})}},Pw=(r,e)=>{ME(r.inputs,e);let n=BE(r.inputs,e);r.compute(VE(r.inputs,n),{inputs:[0]})},Ew=r=>{let e=r.starts,n=r.ends,t=r.axes;return ce({starts:e,ends:n,axes:t})}});var GE,UE,Dw,kw,Nw=k(()=>{"use strict";le();ge();Xe();Yn();ye();GE=r=>{if(!r||r.length!==1)throw new Error("Softmax op requires 1 input.")},UE=(r,e)=>{let n=r.inputs[0],t=n.dims,o=C.size(t),i=t.length,a=C.normalizeAxis(e.axis,i),s=a<t.length-1,u,l=[];s?(l=Array.from({length:i},(L,R)=>R),l[a]=i-1,l[i-1]=a,u=r.compute(at(n,l),{inputs:[n],outputs:[-1]})[0]):u=n;let d=u.dims,f=d[i-1],h=o/f,g=Ee(f),b=f/g,_=64;h===1&&(_=256);let T=(L,R)=>R===4?`max(max(${L}.x, ${L}.y), max(${L}.z, ${L}.w))`:R===2?`max(${L}.x, ${L}.y)`:R===3?`max(max(${L}.x, ${L}.y), ${L}.z)`:L,v=N("x",u.dataType,u.dims,g),x=G("result",u.dataType,u.dims,g),I=v.type.value,$=Ve(u.dataType)==="f32"?`var threadMax = ${I}(-3.402823e+38f);`:`var threadMax = ${I}(-65504.0h);`,O=L=>`
      var<workgroup> rowMaxShared : ${I};
      var<workgroup> rowSumShared : ${I};
      var<workgroup> threadShared : array<${I}, ${_}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${I} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${I}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${L.registerUniform("packedCols","i32").declareVariables(v,x)}
      ${L.mainStart(_)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${_};
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
          rowMaxShared = ${I}(${T("threadShared[0]",g)});
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
          rowSumShared = ${I}(${Kt("threadShared[0]",g)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${I}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,E=r.compute({name:"Softmax",shaderCache:{hint:`${g};${_}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:d,dataType:u.dataType}],dispatchGroup:{x:h},programUniforms:[{type:6,data:b}]}),getShaderSource:O},{inputs:[u],outputs:[s?-1:0]})[0];s&&r.compute(at(E,l),{inputs:[E]})},Dw=(r,e)=>{GE(r.inputs),UE(r,e)},kw=r=>ce({axis:r.axis})});var Lw,WE,HE,jE,Rw,zw=k(()=>{"use strict";le();ge();ye();Lw=r=>Array.from(r.getBigInt64Array(),Number),WE=r=>{if(!r||r.length!==2)throw new Error("Tile requires 2 inputs.");if(r[0].dataType!==1&&r[0].dataType!==10&&r[0].dataType!==6&&r[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(r[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(r[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Lw(r[1]).length!==r[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},HE=(r,e)=>{let n=[];for(let t=0;t<r.length;++t)n.push(r[t]*e[t]);return n},jE=(r,e)=>{let n=r[0].dims,t=e??Lw(r[1]),o=HE(n,t),i=C.size(o),a=r[0].dataType,s=N("input",a,n.length),u=G("output",a,o.length),l=d=>`
      const inputShape = ${s.indices(...n)};
      ${d.registerUniform("output_size","u32").declareVariables(s,u)}
      ${d.mainStart()}
      ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${s.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${s.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${s.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",s.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...W(r[0].dims,o)]}),getShaderSource:l}},Rw=r=>{WE(r.inputs),r.compute(jE(r.inputs),{inputs:[0]})}});var qE,KE,Mw,Bw=k(()=>{"use strict";le();ge();ye();qE=(r,e,n,t,o)=>{let i=G("output_data",o,n.length,4),a=N("a_data",e[1].dataType,e[1].dims.length,4),s=N("b_data",e[2].dataType,e[2].dims.length,4),u=N("c_data",e[0].dataType,e[0].dims.length,4),l,d=(f,h,g)=>`select(${h}, ${f}, ${g})`;if(!t)l=i.setByOffset("global_idx",d(a.getByOffset("global_idx"),s.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let f=(h,g,b="")=>{let _=`a_data[index_a${g}][component_a${g}]`,T=`b_data[index_b${g}][component_b${g}]`,v=`bool(c_data[index_c${g}] & (0xffu << (component_c${g} * 8)))`;return`
            let output_indices${g} = ${i.offsetToIndices(`global_idx * 4u + ${g}u`)};
            let offset_a${g} = ${a.broadcastedIndicesToOffset(`output_indices${g}`,i)};
            let offset_b${g} = ${s.broadcastedIndicesToOffset(`output_indices${g}`,i)};
            let offset_c${g} = ${u.broadcastedIndicesToOffset(`output_indices${g}`,i)};
            let index_a${g} = offset_a${g} / 4u;
            let index_b${g} = offset_b${g} / 4u;
            let index_c${g} = offset_c${g} / 4u;
            let component_a${g} = offset_a${g} % 4u;
            let component_b${g} = offset_b${g} % 4u;
            let component_c${g} = offset_c${g} % 4u;
            ${h}[${g}] = ${b}(${d(_,T,v)});
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
        ${r.registerUniform("vec_size","u32").declareVariables(u,a,s,i)}
        ${r.mainStart()}
        ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`},KE=r=>{let e=r[1].dims,n=r[2].dims,t=r[0].dims,o=r[1].dataType,i=!(C.areEqual(e,n)&&C.areEqual(n,t)),a=e,s=C.size(e);if(i){let l=Fn.calcShape(Fn.calcShape(e,n,!1),t,!1);if(!l)throw new Error("Can't perform where op on the given tensors");a=l,s=C.size(a)}let u=Math.ceil(s/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>qE(l,r,a,i,o),getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/64/4)},programUniforms:[{type:12,data:u},...W(t,e,n,a)]})}},Mw=r=>{r.compute(KE(r.inputs))}});var Fw,Vw=k(()=>{"use strict";w_();Ba();I_();$_();dv();xv();Sv();Vv();Kv();Jv();e0();i0();u0();c0();f0();g0();_0();x0();S0();O0();z0();F0();G0();W0();q0();Rc();X0();pw();mw();bw();vw();za();Sw();Bc();Aw();Cw();Nw();Mc();zw();Yn();Va();Bw();Fw=new Map([["Abs",[A_]],["Acos",[O_]],["Acosh",[P_]],["Add",[pv]],["ArgMax",[v_,Tc]],["ArgMin",[__,Tc]],["Asin",[E_]],["Asinh",[C_]],["Atan",[D_]],["Atanh",[k_]],["Attention",[x_]],["AveragePool",[rw,nw]],["BatchNormalization",[T_]],["BiasAdd",[S_]],["BiasSplitGelu",[cv]],["Cast",[L_,N_]],["Ceil",[z_]],["Clip",[R_]],["Concat",[Tv,Iv]],["Conv",[Dc,Cc]],["ConvTranspose",[qv,Hv]],["Cos",[M_]],["Cosh",[B_]],["CumSum",[Xv,Zv]],["DepthToSpace",[Yv,Qv]],["DequantizeLinear",[fw,hw]],["Div",[fv]],["Einsum",[r0,o0]],["Elu",[F_,Wo]],["Equal",[hv]],["Erf",[V_]],["Exp",[G_]],["Expand",[s0]],["FastGelu",[l0]],["Floor",[U_]],["FusedConv",[Dc,Cc]],["Gather",[p0,d0]],["GatherElements",[w0,v0]],["GatherBlockQuantized",[b0,y0]],["GatherND",[h0,m0]],["Gelu",[W_]],["Gemm",[I0,T0]],["GlobalAveragePool",[aw,iw]],["GlobalMaxPool",[dw,cw]],["Greater",[yv]],["GreaterOrEqual",[vv]],["GridSample",[$0,A0]],["GroupQueryAttention",[R0]],["HardSigmoid",[Y_,J_]],["InstanceNormalization",[B0]],["LayerNormalization",[V0]],["LeakyRelu",[H_,Wo]],["Less",[_v]],["LessOrEqual",[wv]],["Log",[sv]],["MatMul",[U0]],["MatMulNBits",[H0,j0]],["MaxPool",[uw,lw]],["Mul",[mv]],["MultiHeadAttention",[C0,E0]],["Neg",[q_]],["Not",[j_]],["Pad",[K0]],["Pow",[gv]],["QuickGelu",[uv,Wo]],["Range",[gw]],["Reciprocal",[K_]],["ReduceMin",[f_]],["ReduceMean",[u_]],["ReduceMax",[p_]],["ReduceSum",[m_]],["ReduceProd",[h_]],["ReduceL1",[l_]],["ReduceL2",[c_]],["ReduceLogSum",[b_]],["ReduceLogSumExp",[d_]],["ReduceSumSquare",[g_]],["Relu",[X_]],["Resize",[Tw,Iw]],["RotaryEmbedding",[N0]],["ScatterND",[_w,yw]],["Sigmoid",[Z_]],["Sin",[Q_]],["Sinh",[ev]],["Slice",[Pw,Ew]],["SkipLayerNormalization",[$w]],["Split",[D0,k0]],["Sqrt",[tv]],["Softmax",[Dw,kw]],["Sub",[bv]],["Tan",[nv]],["Tanh",[ov]],["ThresholdedRelu",[av,Wo]],["Tile",[Rw]],["Transpose",[Xy,Zy]],["Where",[Mw]]])});var Ya,Gw=k(()=>{"use strict";pt();Bn();ye();Ya=class{constructor(e){this.backend=e;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,n){this.repo.set(e,n)}run(e,n,t,o,i){$t(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let d of n)u.push({binding:u.length,resource:{buffer:d.buffer}});for(let d of t)u.push({binding:u.length,resource:{buffer:d.buffer}});i&&u.push({binding:u.length,resource:i});let l=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let d={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d)}s.setPipeline(e.computePipeline),s.setBindGroup(0,l),s.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),yt(e.programInfo.name)}dispose(){}build(e,n){$t(e.name);let t=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(f=>{t.features.has(f.feature)&&o.push(`enable ${f.extension};`)});let a=qy(n,this.backend.device.limits),s=e.getShaderSource(a),u=`${o.join(`
`)}
${a.additionalImplementations}
${s}`,l=t.createShaderModule({code:u,label:e.name});_e("verbose",()=>`[WebGPU] ${e.name} shader code: ${u}`);let d=t.createComputePipeline({compute:{module:l,entryPoint:"main"},layout:"auto",label:e.name});return yt(e.name),{programInfo:e,computePipeline:d,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let n=typeof e=="number"?e:e.x,t=typeof e=="number"?1:e.y||1,o=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(n<=i&&t<=i&&o<=i)return[n,t,o];let a=n*t*o,s=Math.ceil(Math.sqrt(a));if(s>i){if(s=Math.ceil(Math.cbrt(a)),s>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}});var Uw={};$r(Uw,{WebGpuBackend:()=>Vc});var XE,ZE,Fc,Vc,Ww=k(()=>{"use strict";pt();le();Bn();dc();Hy();Vw();Gw();XE=(r,e)=>{if(e.length!==r.length)throw new Error(`inputDependencies length ${e.length} is not equal to inputTensors length ${r.length}.`);let n=[];for(let t=0;t<r.length;++t){let o=r[t].dataType;switch(e[t]){case"none":{n.push("");break}case"type":{n.push(`${o}`);break}case"rank":{let i=r[t].dims.length;n.push(`${o};${i}`);break}case"dims":{let i=r[t].dims.join(",");n.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${e[t]}`)}}return n.join("|")},ZE=(r,e,n)=>{let t=r.name;return r.shaderCache?.hint&&(t+="["+r.shaderCache.hint+"]"),t+=":"+n+`:${XE(e,r.shaderCache?.inputDependencies??new Array(e.length).fill("dims"))}`,t},Fc=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Vc=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,n){this.env=e;let t=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:n.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:n.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:n.limits.maxStorageBufferBindingSize,maxBufferSize:n.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:n.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:n.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:n.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:n.limits.maxComputeWorkgroupSizeZ},requiredFeatures:t},i=a=>n.features.has(a)&&t.push(a)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups"),this.device=await n.requestDevice(o),this.adapterInfo=new Fc(n.info||await n.requestAdapterInfo()),this.gpuDataManager=Wy(this),this.programManager=new Ya(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Aa(e.logLevel,!!e.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:n,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),n={};this.queryType==="at-passes"&&(n.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(n)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;$t(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let n=new BigUint64Array(e.getMappedRange()),t=this.pendingQueries.get(e);for(let o=0;o<n.length/2;o++){let i=t[o],a=i.kernelId,s=this.kernels.get(a),u=s.kernelType,l=s.kernelName,d=i.programName,f=i.inputTensorViews,h=i.outputTensorViews,g=n[o*2],b=n[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let _=Number(g-this.queryTimeBase),T=Number(b-this.queryTimeBase);if(!Number.isSafeInteger(_)||!Number.isSafeInteger(T))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:f.map(v=>({dims:v.dims,dataType:Mn(v.dataType)})),outputsMetadata:h.map(v=>({dims:v.dims,dataType:Mn(v.dataType)})),kernelId:a,kernelType:u,kernelName:l,programName:d,startTime:_,endTime:T});else{let v="";f.forEach((I,$)=>{v+=`input[${$}]: [${I.dims}] | ${Mn(I.dataType)}, `});let x="";h.forEach((I,$)=>{x+=`output[${$}]: [${I.dims}] | ${Mn(I.dataType)}, `}),console.log(`[profiling] kernel "${a}|${u}|${l}|${d}" ${v}${x}start time: ${_} ns, execution time: ${T-_} ns`)}li("GPU",`${d}::${g}::${b}`)}e.unmap(),this.pendingQueries.delete(e)}),yt()}run(e,n,t,o,i,a){$t(e.name);let s=[];for(let I=0;I<n.length;++I){let $=n[I].data;if($===0)continue;let O=this.gpuDataManager.get($);if(!O)throw new Error(`no GPU data for input: ${$}`);s.push(O)}let{outputs:u,dispatchGroup:l,programUniforms:d}=e.getRunData(n),f=t.length===0?u.map((I,$)=>$):t;if(f.length!==u.length)throw new Error(`Output size ${f.length} must be equal to ${u.length}.`);let h=[],g=[];for(let I=0;I<u.length;++I){if(!Number.isInteger(f[I])||f[I]<-3||f[I]>=a)throw new Error(`Invalid output index: ${f[I]}`);if(f[I]===-3)continue;let $=f[I]===-1,O=f[I]===-2,E=$||O?i(u[I].dataType,u[I].dims):o(f[I],u[I].dataType,u[I].dims);if(h.push(E),E.data===0)continue;let L=this.gpuDataManager.get(E.data);if(!L)throw new Error(`no GPU data for output: ${E.data}`);if($&&this.temporaryData.push(L),O){let R=this.kernelPersistentData.get(this.currentKernelId);R||(R=[],this.kernelPersistentData.set(this.currentKernelId,R)),R.push(L)}g.push(L)}if(s.length!==n.length||g.length!==h.length){if(g.length===0)return yt(e.name),h;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let b;if(d){let I=0,$=[];d.forEach(R=>{let F=typeof R.data=="number"?[R.data]:R.data;if(F.length===0)return;let q=R.type===10?2:4,Z,re;R.type===10?(re=F.length>4?16:F.length>2?8:F.length*q,Z=F.length>4?16:q*F.length):(re=F.length<=2?F.length*q:16,Z=16),I=Math.ceil(I/re)*re,$.push(I);let pe=R.type===10?8:4;I+=F.length>4?Math.ceil(F.length/pe)*Z:F.length*q});let O=16;I=Math.ceil(I/O)*O;let E=new ArrayBuffer(I);d.forEach((R,F)=>{let q=$[F],Z=typeof R.data=="number"?[R.data]:R.data;if(R.type===6)new Int32Array(E,q,Z.length).set(Z);else if(R.type===12)new Uint32Array(E,q,Z.length).set(Z);else if(R.type===10)new Uint16Array(E,q,Z.length).set(Z);else if(R.type===1)new Float32Array(E,q,Z.length).set(Z);else throw new Error(`Unsupported uniform type: ${Mn(R.type)}`)});let L=this.gpuDataManager.create(I,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(L.buffer,0,E,0,I),this.gpuDataManager.release(L.id),b={offset:0,size:I,buffer:L.buffer}}let _=this.programManager.normalizeDispatchGroupSize(l),T=_[1]===1&&_[2]===1,v=ZE(e,n,T),x=this.programManager.getArtifact(v);if(x||(x=this.programManager.build(e,_),this.programManager.setArtifact(v,x),_e("info",()=>`[artifact] key: ${v}, programName: ${e.name}`)),d&&x.uniformVariablesInfo){if(d.length!==x.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${x.uniformVariablesInfo.length}, got ${d.length} in program "${x.programInfo.name}".`);for(let I=0;I<d.length;I++){let $=d[I],O=$.type,E=typeof $.data=="number"?1:$.data.length,[L,R]=x.uniformVariablesInfo[I];if(O!==L||E!==R)throw new Error(`Uniform variable ${I} mismatch: expect type ${L} with size ${R}, got type ${O} with size ${E} in program "${x.programInfo.name}".`)}}if(_e("info",()=>`[ProgramManager] run "${e.name}" (key=${v}) with ${_[0]}x${_[1]}x${_[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let I={kernelId:this.currentKernelId,programName:x.programInfo.name,inputTensorViews:n,outputTensorViews:h};this.pendingKernels.push(I),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(I)}return this.programManager.run(x,s,g,_,b),yt(e.name),h}upload(e,n){this.gpuDataManager.upload(e,n)}memcpy(e,n){this.gpuDataManager.memcpy(e,n)}async download(e,n){await this.gpuDataManager.download(e,n)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,n,t,o){let i=Fw.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:o,kernelEntry:i[0],attributes:[i[1],t]};this.kernels.set(n,a)}releaseKernel(e){let n=this.kernelPersistentData.get(e);if(n){for(let t of n)this.gpuDataManager.release(t.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,n,t){let o=this.kernels.get(e);if(!o)throw new Error(`kernel not created: ${e}`);let i=o.kernelType,a=o.kernelName,s=o.kernelEntry,u=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),_e("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),s(n,u[1]),0}catch(d){return t.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${d}`)),1}finally{l&&t.push(this.device.popErrorScope().then(d=>d?`GPU validation error for kernel "[${i}] ${a}": ${d.message}`:null));for(let d of this.temporaryData)this.gpuDataManager.release(d.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,n,t,o){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let a=i.get(n),s=this.gpuDataManager.registerExternalBuffer(t,o,a);return i.set(n,[s,t]),s}unregisterBuffers(e){let n=this.sessionExternalDataMapping.get(e);n&&(n.forEach(t=>this.gpuDataManager.unregisterExternalBuffer(t[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let n=this.gpuDataManager.get(e);if(!n)throw new Error(`no GPU data for buffer: ${e}`);return n.buffer}createDownloader(e,n,t){return async()=>{let o=await bc(this,e,n);return Pa(o.buffer,t)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){_e("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){_e("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){_e("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),n=this.capturedPendingKernels.get(this.currentSessionId),t=e.length;this.pendingKernels=[];for(let o=0;o<t;o++){let i=this.getComputePassEncoder(),a=e[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(n[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}});var Hw={};$r(Hw,{init:()=>JE});var Ko,Gc,JE,jw=k(()=>{"use strict";le();Bn();ge();Fy();Ko=class r{constructor(e,n,t,o){this.module=e;this.dataType=n;this.data=t;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let e=C.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let e=C.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let e=C.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let e=C.size(this.dims);return e===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(e){if(C.size(e)!==C.size(this.dims))throw new Error("Invalid new shape");return new r(this.module,this.dataType,this.data,e)}},Gc=class{constructor(e,n,t){this.module=e;this.backend=n;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=n.adapterInfo;let o=e.PTR_SIZE,i=t/e.PTR_SIZE,a=o===4?"i32":"i64";this.opKernelContext=Number(e.getValue(o*i++,a));let s=Number(e.getValue(o*i++,a));this.outputCount=Number(e.getValue(o*i++,a)),this.customDataOffset=Number(e.getValue(o*i++,"*")),this.customDataSize=Number(e.getValue(o*i++,a));let u=[];for(let l=0;l<s;l++){let d=Number(e.getValue(o*i++,a)),f=Number(e.getValue(o*i++,"*")),h=Number(e.getValue(o*i++,a)),g=[];for(let b=0;b<h;b++)g.push(Number(e.getValue(o*i++,a)));u.push(new Ko(e,d,f,g))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,n){let t=n?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,o=n?.outputs??[],i=(s,u,l)=>new Ko(this.module,u,this.output(s,l),l),a=(s,u)=>{let l=vr(s,u);if(!l)throw new Error(`Unsupported data type: ${s}`);let d=l>0?this.backend.gpuDataManager.create(l).id:0;return new Ko(this.module,s,d,u)};return this.backend.run(e,t,o,i,a,this.outputCount)}output(e,n){let t=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",a=this.module.stackAlloc((1+n.length)*o);this.module.setValue(a,n.length,i);for(let s=0;s<n.length;s++)this.module.setValue(a+o*(s+1),n[s],i);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(o){throw new Error(`Failed to generate kernel's output[${e}] with dims [${n}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(t)}}},JE=async(r,e,n,t)=>{let o=e.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(r==="webgpu"){let i=(Ww(),Jr(Uw)).WebGpuBackend,a=new i;await a.initialize(n,t),o("webgpu",[a,s=>a.alloc(Number(s)),s=>a.free(s),(s,u,l,d=!1)=>{if(d)_e("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(s)}, dst=${Number(u)}, size=${Number(l)}`),a.memcpy(Number(s),Number(u));else{_e("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(s)}, gpuDataId=${Number(u)}, size=${Number(l)}`);let f=e.HEAPU8.subarray(Number(s>>>0),Number(s>>>0)+Number(l));a.upload(Number(u),f)}},async(s,u,l)=>{_e("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${u}, size=${l}`),await a.download(Number(s),()=>e.HEAPU8.subarray(Number(u)>>>0,Number(u+l)>>>0))},(s,u,l)=>a.createKernel(s,Number(u),l,e.UTF8ToString(e._JsepGetNodeName(Number(u)))),s=>a.releaseKernel(s),(s,u,l,d)=>{_e("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${l}, kernel=${s}, contextDataOffset=${u}`);let f=new Gc(e,a,Number(u));return a.computeKernel(Number(s),f,d)},()=>a.captureBegin(),()=>a.captureEnd(),()=>a.replay()])}else{let i=new ka(n);o("webnn",[i,()=>i.reserveTensorId(),a=>i.releaseTensorId(a),async(a,s,u,l,d)=>i.ensureTensor(a,s,u,l,d),(a,s)=>{i.uploadTensor(a,s)},async(a,s)=>i.downloadTensor(a,s),(a,s)=>i.registerMLContext(a,s),!!n.trace])}}});var YE,ma,ga,jr,QE,qw,Fo,ba,ya,Kw,_a,va,wa,rc=k(()=>{"use strict";pt();Ay();Py();le();yr();Ta();lc();YE=(r,e)=>{Be()._OrtInit(r,e)!==0&&Ne("Can't initialize onnxruntime.")},ma=async r=>{YE(r.wasm.numThreads,Go(r.logLevel))},ga=async(r,e)=>{Be().asyncInit?.();let n=r.webgpu.adapter;if(e==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let t=r.webgpu.powerPreference;if(t!==void 0&&t!=="low-power"&&t!=="high-performance")throw new Error(`Invalid powerPreference setting: "${t}"`);let o=r.webgpu.forceFallbackAdapter;if(o!==void 0&&typeof o!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${o}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:t,forceFallbackAdapter:o}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(e==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let t=(jw(),Jr(Hw)).init;e==="webgpu"&&await t("webgpu",Be(),r,n),e==="webnn"&&await t("webnn",Be(),r)}},jr=new Map,QE=r=>{let e=Be(),n=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetInputOutputCount(r,o,o+t)!==0&&Ne("Can't get session input/output count.");let a=t===4?"i32":"i64";return[Number(e.getValue(o,a)),Number(e.getValue(o+t,a))]}finally{e.stackRestore(n)}},qw=(r,e)=>{let n=Be(),t=n.stackSave(),o=0;try{let i=n.PTR_SIZE,a=n.stackAlloc(2*i);n._OrtGetInputOutputMetadata(r,e,a,a+i)!==0&&Ne("Can't get session input/output metadata.");let u=Number(n.getValue(a,"*"));o=Number(n.getValue(a+i,"*"));let l=n.HEAP32[o/4];if(l===0)return[u,0];let d=n.HEAPU32[o/4+1],f=[];for(let h=0;h<d;h++){let g=Number(n.getValue(o+8+h*i,"*"));f.push(g!==0?n.UTF8ToString(g):Number(n.getValue(o+8+(h+d)*i,"*")))}return[u,l,f]}finally{n.stackRestore(t),o!==0&&n._OrtFree(o)}},Fo=r=>{let e=Be(),n=e._malloc(r.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${r.byteLength}.`);return e.HEAPU8.set(r,n),[n,r.byteLength]},ba=async(r,e)=>{let n,t,o=Be();Array.isArray(r)?[n,t]=r:r.buffer===o.HEAPU8.buffer?[n,t]=[r.byteOffset,r.byteLength]:[n,t]=Fo(r);let i=0,a=0,s=0,u=[],l=[],d=[];try{if([a,u]=await Oy(e),e?.externalData&&o.mountExternalData){let $=[];for(let O of e.externalData){let E=typeof O=="string"?O:O.path;$.push(Uo(typeof O=="string"?O:O.data).then(L=>{o.mountExternalData(E,L)}))}await Promise.all($)}for(let $ of e?.executionProviders??[])if((typeof $=="string"?$:$.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof $!="string"){let E=$,L=E?.context,R=E?.gpuDevice,F=E?.deviceType,q=E?.powerPreference;L?o.currentContext=L:R?o.currentContext=await o.webnnCreateMLContext(R):o.currentContext=await o.webnnCreateMLContext({deviceType:F,powerPreference:q})}else o.currentContext=await o.webnnCreateMLContext();break}i=await o._OrtCreateSession(n,t,a),o.webgpuOnCreateSession?.(i),i===0&&Ne("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.webnnRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[f,h]=QE(i),g=!!e?.enableGraphCapture,b=[],_=[],T=[],v=[],x=[];for(let $=0;$<f;$++){let[O,E,L]=qw(i,$);O===0&&Ne("Can't get an input name."),l.push(O);let R=o.UTF8ToString(O);b.push(R),T.push(E===0?{name:R,isTensor:!1}:{name:R,isTensor:!0,type:Mn(E),shape:L})}for(let $=0;$<h;$++){let[O,E,L]=qw(i,$+f);O===0&&Ne("Can't get an output name."),d.push(O);let R=o.UTF8ToString(O);_.push(R),v.push(E===0?{name:R,isTensor:!1}:{name:R,isTensor:!0,type:Mn(E),shape:L});{if(g&&e?.preferredOutputLocation===void 0){x.push("gpu-buffer");continue}let F=typeof e?.preferredOutputLocation=="string"?e.preferredOutputLocation:e?.preferredOutputLocation?.[R]??"cpu",q=o.webnnIsGraphOutput;if(F==="cpu"&&q&&q(i,R)){x.push("ml-tensor-cpu-output");continue}if(F!=="cpu"&&F!=="cpu-pinned"&&F!=="gpu-buffer"&&F!=="ml-tensor")throw new Error(`Not supported preferred output location: ${F}.`);if(g&&F!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${F}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);x.push(F)}}let I=null;return x.some($=>$==="gpu-buffer"||$==="ml-tensor"||$==="ml-tensor-cpu-output")&&(s=o._OrtCreateBinding(i),s===0&&Ne("Can't create IO binding."),I={handle:s,outputPreferredLocations:x,outputPreferredLocationsEncoded:x.map($=>$==="ml-tensor-cpu-output"?"ml-tensor":$).map($=>uc($))}),jr.set(i,[i,l,d,I,g,!1]),[i,b,_,T,v]}catch(f){throw l.forEach(h=>o._OrtFree(h)),d.forEach(h=>o._OrtFree(h)),s!==0&&o._OrtReleaseBinding(s)!==0&&Ne("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&Ne("Can't release session."),f}finally{o._free(n),a!==0&&o._OrtReleaseSessionOptions(a)!==0&&Ne("Can't release session options."),u.forEach(f=>o._free(f)),o.unmountExternalData?.()}},ya=r=>{let e=Be(),n=jr.get(r);if(!n)throw new Error(`cannot release session. invalid session id: ${r}`);let[t,o,i,a,s]=n;a&&(s&&e._OrtClearBoundOutputs(a.handle)!==0&&Ne("Can't clear bound outputs."),e._OrtReleaseBinding(a.handle)!==0&&Ne("Can't release IO binding.")),e.jsepOnReleaseSession?.(r),e.webnnOnReleaseSession?.(r),e.webgpuOnReleaseSession?.(r),o.forEach(u=>e._OrtFree(u)),i.forEach(u=>e._OrtFree(u)),e._OrtReleaseSession(t)!==0&&Ne("Can't release session."),jr.delete(r)},Kw=async(r,e,n,t,o,i,a=!1)=>{if(!r){e.push(0);return}let s=Be(),u=s.PTR_SIZE,l=r[0],d=r[1],f=r[3],h=f,g,b;if(l==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(a&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${i} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let v=r[2].gpuBuffer;b=vr(_r(l),d);{let x=s.jsepRegisterBuffer;if(!x)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');g=x(t,i,v,b)}}else if(f==="ml-tensor"){let v=r[2].mlTensor;b=vr(_r(l),d);let x=s.webnnRegisterMLTensor;if(!x)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');g=x(t,v,_r(l),d)}else{let v=r[2];if(Array.isArray(v)){b=u*v.length,g=s._malloc(b),n.push(g);for(let x=0;x<v.length;x++){if(typeof v[x]!="string")throw new TypeError(`tensor data at index ${x} is not a string`);s.setValue(g+x*u,Pt(v[x],n),"*")}}else{let x=s.webnnIsGraphInput,I=s.webnnIsGraphOutput;if(l!=="string"&&x&&I){let $=s.UTF8ToString(o);if(x(t,$)||I(t,$)){let O=_r(l);b=vr(O,d),h="ml-tensor";let E=s.webnnCreateTemporaryTensor,L=s.webnnUploadTensor;if(!E||!L)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let R=await E(t,O,d);L(R,new Uint8Array(v.buffer,v.byteOffset,v.byteLength)),g=R}else b=v.byteLength,g=s._malloc(b),n.push(g),s.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,b),g)}else b=v.byteLength,g=s._malloc(b),n.push(g),s.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,b),g)}}let _=s.stackSave(),T=s.stackAlloc(4*d.length);try{d.forEach((x,I)=>s.setValue(T+I*u,x,u===4?"i32":"i64"));let v=s._OrtCreateTensor(_r(l),g,b,T,d.length,uc(h));v===0&&Ne(`Can't create tensor for input/output. session=${t}, index=${i}.`),e.push(v)}finally{s.stackRestore(_)}},_a=async(r,e,n,t,o,i)=>{let a=Be(),s=a.PTR_SIZE,u=jr.get(r);if(!u)throw new Error(`cannot run inference. invalid session id: ${r}`);let l=u[0],d=u[1],f=u[2],h=u[3],g=u[4],b=u[5],_=e.length,T=t.length,v=0,x=[],I=[],$=[],O=[],E=a.stackSave(),L=a.stackAlloc(_*s),R=a.stackAlloc(_*s),F=a.stackAlloc(T*s),q=a.stackAlloc(T*s);try{[v,x]=$y(i),ur("wasm prepareInputOutputTensor");for(let K=0;K<_;K++)await Kw(n[K],I,O,r,d[e[K]],e[K],g);for(let K=0;K<T;K++)await Kw(o[K],$,O,r,f[t[K]],_+t[K],g);lr("wasm prepareInputOutputTensor");for(let K=0;K<_;K++)a.setValue(L+K*s,I[K],"*"),a.setValue(R+K*s,d[e[K]],"*");for(let K=0;K<T;K++)a.setValue(F+K*s,$[K],"*"),a.setValue(q+K*s,f[t[K]],"*");if(h&&!b){let{handle:K,outputPreferredLocations:Oe,outputPreferredLocationsEncoded:fe}=h;if(d.length!==_)throw new Error(`input count from feeds (${_}) is expected to be always equal to model's input count (${d.length}).`);ur("wasm bindInputsOutputs");for(let J=0;J<_;J++){let he=e[J];await a._OrtBindInput(K,d[he],I[J])!==0&&Ne(`Can't bind input[${J}] for session=${r}.`)}for(let J=0;J<T;J++){let he=t[J];o[J]?.[3]?a._OrtBindOutput(K,f[he],$[J],0)!==0&&Ne(`Can't bind pre-allocated output[${J}] for session=${r}.`):a._OrtBindOutput(K,f[he],0,fe[he])!==0&&Ne(`Can't bind output[${J}] to ${Oe[J]} for session=${r}.`)}lr("wasm bindInputsOutputs"),jr.set(r,[l,d,f,h,g,!0])}a.jsepOnRunStart?.(l),a.webnnOnRunStart?.(l);let Z;h?Z=await a._OrtRunWithBinding(l,h.handle,T,F,v):Z=await a._OrtRun(l,R,L,_,q,T,F,v),Z!==0&&Ne("failed to call OrtRun().");let re=[],pe=[];ur("wasm ProcessOutputTensor");for(let K=0;K<T;K++){let Oe=Number(a.getValue(F+K*s,"*"));if(Oe===$[K]){re.push(o[K]);continue}let fe=a.stackSave(),J=a.stackAlloc(4*s),he=!1,ee,Te=0;try{a._OrtGetTensorData(Oe,J,J+s,J+2*s,J+3*s)!==0&&Ne(`Can't access output tensor data on index ${K}.`);let Se=s===4?"i32":"i64",ae=Number(a.getValue(J,Se));Te=a.getValue(J+s,"*");let U=a.getValue(J+s*2,"*"),z=Number(a.getValue(J+s*3,Se)),ie=[];for(let je=0;je<z;je++)ie.push(Number(a.getValue(U+je*s,Se)));a._OrtFree(U)!==0&&Ne("Can't free memory for tensor dims.");let ct=ie.reduce((je,Pe)=>je*Pe,1);ee=Mn(ae);let st=h?.outputPreferredLocations[t[K]];if(ee==="string"){if(st==="gpu-buffer"||st==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let je=[];for(let Pe=0;Pe<ct;Pe++){let Vt=a.getValue(Te+Pe*s,"*"),er=a.getValue(Te+(Pe+1)*s,"*"),tr=Pe===ct-1?void 0:er-Vt;je.push(a.UTF8ToString(Vt,tr))}re.push([ee,ie,je,"cpu"])}else if(st==="gpu-buffer"&&ct>0){let je=a.jsepGetBuffer;if(!je)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Pe=je(Te),Vt=vr(ae,ct);if(Vt===void 0||!Sa(ee))throw new Error(`Unsupported data type: ${ee}`);he=!0,re.push([ee,ie,{gpuBuffer:Pe,download:a.jsepCreateDownloader(Pe,Vt,ee),dispose:()=>{a._OrtReleaseTensor(Oe)!==0&&Ne("Can't release tensor.")}},"gpu-buffer"])}else if(st==="ml-tensor"&&ct>0){let je=a.webnnEnsureTensor,Pe=a.webnnIsGraphInputOutputTypeSupported;if(!je||!Pe)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(vr(ae,ct)===void 0||!$a(ee))throw new Error(`Unsupported data type: ${ee}`);if(!Pe(r,ee,!1))throw new Error(`preferredLocation "ml-tensor" for ${ee} output is not supported by current WebNN Context.`);let er=await je(r,Te,ae,ie,!1);he=!0,re.push([ee,ie,{mlTensor:er,download:a.webnnCreateMLTensorDownloader(Te,ee),dispose:()=>{a.webnnReleaseTensorId(Te),a._OrtReleaseTensor(Oe)}},"ml-tensor"])}else if(st==="ml-tensor-cpu-output"&&ct>0){let je=a.webnnCreateMLTensorDownloader(Te,ee)(),Pe=re.length;he=!0,pe.push((async()=>{let Vt=[Pe,await je];return a.webnnReleaseTensorId(Te),a._OrtReleaseTensor(Oe),Vt})()),re.push([ee,ie,[],"cpu"])}else{let je=co(ee),Pe=new je(ct);new Uint8Array(Pe.buffer,Pe.byteOffset,Pe.byteLength).set(a.HEAPU8.subarray(Te,Te+Pe.byteLength)),re.push([ee,ie,Pe,"cpu"])}}finally{a.stackRestore(fe),ee==="string"&&Te&&a._free(Te),he||a._OrtReleaseTensor(Oe)}}h&&!g&&(a._OrtClearBoundOutputs(h.handle)!==0&&Ne("Can't clear bound outputs."),jr.set(r,[l,d,f,h,g,!1]));for(let[K,Oe]of await Promise.all(pe))re[K][2]=Oe;return lr("wasm ProcessOutputTensor"),re}finally{a.webnnOnRunEnd?.(l),a.stackRestore(E),I.forEach(Z=>a._OrtReleaseTensor(Z)),$.forEach(Z=>a._OrtReleaseTensor(Z)),O.forEach(Z=>a._free(Z)),v!==0&&a._OrtReleaseRunOptions(v),x.forEach(Z=>a._free(Z))}},va=r=>{let e=Be(),n=jr.get(r);if(!n)throw new Error("invalid session id");let t=n[0],o=e._OrtEndProfiling(t);o===0&&Ne("Can't get an profile file name."),e._OrtFree(o)},wa=r=>{let e=[];for(let n of r){let t=n[2];!Array.isArray(t)&&"buffer"in t&&e.push(t.buffer)}return e}});var qr,Ft,Xo,es,ts,Qa,Uc,Wc,mo,go,tC,Xw,Zw,Jw,Yw,Qw,ex,tx,Hc=k(()=>{"use strict";pt();rc();yr();fa();qr=()=>!!me.wasm.proxy&&typeof document<"u",Xo=!1,es=!1,ts=!1,Wc=new Map,mo=(r,e)=>{let n=Wc.get(r);n?n.push(e):Wc.set(r,[e])},go=()=>{if(Xo||!es||ts||!Ft)throw new Error("worker not ready")},tC=r=>{switch(r.data.type){case"init-wasm":Xo=!1,r.data.err?(ts=!0,Uc[1](r.data.err)):(es=!0,Uc[0]()),Qa&&(URL.revokeObjectURL(Qa),Qa=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let e=Wc.get(r.data.type);r.data.err?e.shift()[1](r.data.err):e.shift()[0](r.data.out);break}default:}},Xw=async()=>{if(!es){if(Xo)throw new Error("multiple calls to 'initWasm()' detected.");if(ts)throw new Error("previous call to 'initWasm()' failed.");if(Xo=!0,qr())return new Promise((r,e)=>{Ft?.terminate(),Ty().then(([n,t])=>{try{Ft=t,Ft.onerror=i=>e(i),Ft.onmessage=tC,Uc=[r,e];let o={type:"init-wasm",in:me};!o.in.wasm.wasmPaths&&(n||ic)&&(o.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),Ft.postMessage(o),Qa=n}catch(o){e(o)}},e)});try{await ha(me.wasm),await ma(me),es=!0}catch(r){throw ts=!0,r}finally{Xo=!1}}},Zw=async r=>{if(qr())return go(),new Promise((e,n)=>{mo("init-ep",[e,n]);let t={type:"init-ep",in:{epName:r,env:me}};Ft.postMessage(t)});await ga(me,r)},Jw=async r=>qr()?(go(),new Promise((e,n)=>{mo("copy-from",[e,n]);let t={type:"copy-from",in:{buffer:r}};Ft.postMessage(t,[r.buffer])})):Fo(r),Yw=async(r,e)=>{if(qr()){if(e?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return go(),new Promise((n,t)=>{mo("create",[n,t]);let o={type:"create",in:{model:r,options:{...e}}},i=[];r instanceof Uint8Array&&i.push(r.buffer),Ft.postMessage(o,i)})}else return ba(r,e)},Qw=async r=>{if(qr())return go(),new Promise((e,n)=>{mo("release",[e,n]);let t={type:"release",in:r};Ft.postMessage(t)});ya(r)},ex=async(r,e,n,t,o,i)=>{if(qr()){if(n.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return go(),new Promise((a,s)=>{mo("run",[a,s]);let u=n,l={type:"run",in:{sessionId:r,inputIndices:e,inputs:u,outputIndices:t,options:i}};Ft.postMessage(l,wa(u))})}else return _a(r,e,n,t,o,i)},tx=async r=>{if(qr())return go(),new Promise((e,n)=>{mo("end-profiling",[e,n]);let t={type:"end-profiling",in:r};Ft.postMessage(t)});va(r)}});var nx,nC,ns,rx=k(()=>{"use strict";pt();Hc();le();pa();lc();nx=(r,e)=>{switch(r.location){case"cpu":return[r.type,r.dims,r.data,"cpu"];case"gpu-buffer":return[r.type,r.dims,{gpuBuffer:r.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[r.type,r.dims,{mlTensor:r.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${r.location} for ${e()}`)}},nC=r=>{switch(r[3]){case"cpu":return new St(r[0],r[2],r[1]);case"gpu-buffer":{let e=r[0];if(!Sa(e))throw new Error(`not supported data type: ${e} for deserializing GPU tensor`);let{gpuBuffer:n,download:t,dispose:o}=r[2];return St.fromGpuBuffer(n,{dataType:e,dims:r[1],download:t,dispose:o})}case"ml-tensor":{let e=r[0];if(!$a(e))throw new Error(`not supported data type: ${e} for deserializing MLTensor tensor`);let{mlTensor:n,download:t,dispose:o}=r[2];return St.fromMLTensor(n,{dataType:e,dims:r[1],download:t,dispose:o})}default:throw new Error(`invalid data location: ${r[3]}`)}},ns=class{async fetchModelAndCopyToWasmMemory(e){return Jw(await Uo(e))}async loadModel(e,n){$t();let t;typeof e=="string"?t=await this.fetchModelAndCopyToWasmMemory(e):t=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Yw(t,n),yt()}async dispose(){return Qw(this.sessionId)}async run(e,n,t){$t();let o=[],i=[];Object.entries(e).forEach(h=>{let g=h[0],b=h[1],_=this.inputNames.indexOf(g);if(_===-1)throw new Error(`invalid input '${g}'`);o.push(b),i.push(_)});let a=[],s=[];Object.entries(n).forEach(h=>{let g=h[0],b=h[1],_=this.outputNames.indexOf(g);if(_===-1)throw new Error(`invalid output '${g}'`);a.push(b),s.push(_)});let u=o.map((h,g)=>nx(h,()=>`input "${this.inputNames[i[g]]}"`)),l=a.map((h,g)=>h?nx(h,()=>`output "${this.outputNames[s[g]]}"`):null),d=await ex(this.sessionId,i,u,s,l,t),f={};for(let h=0;h<d.length;h++)f[this.outputNames[s[h]]]=a[h]??nC(d[h]);return yt(),f}startProfiling(){}endProfiling(){tx(this.sessionId)}}});var ix={};$r(ix,{OnnxruntimeWebAssemblyBackend:()=>rs,initializeFlags:()=>ox,wasmBackend:()=>rC});var ox,rs,rC,ax=k(()=>{"use strict";pt();Hc();rx();ox=()=>{(typeof me.wasm.initTimeout!="number"||me.wasm.initTimeout<0)&&(me.wasm.initTimeout=0);let r=me.wasm.simd;if(typeof r!="boolean"&&r!==void 0&&r!=="fixed"&&r!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${r}". Reset it to \`false\` and ignore SIMD feature checking.`),me.wasm.simd=!1),typeof me.wasm.proxy!="boolean"&&(me.wasm.proxy=!1),typeof me.wasm.trace!="boolean"&&(me.wasm.trace=!1),typeof me.wasm.numThreads!="number"||!Number.isInteger(me.wasm.numThreads)||me.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)me.wasm.numThreads=1;else{let e=typeof navigator>"u"?Os("node:os").cpus().length:navigator.hardwareConcurrency;me.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},rs=class{async init(e){ox(),await Xw(),await Zw(e)}async createInferenceSessionHandler(e,n){let t=new ns;return await t.loadModel(e,n),t}},rC=new rs});pt();pt();pt();var Dp="1.23.0";var zq=Ns;{let r=(cy(),Jr(ly)).onnxjsBackend;sr("webgl",r,-10)}{let r=(ax(),Jr(ix)).wasmBackend;sr("webgpu",r,5),sr("webnn",r,5),sr("cpu",r,10),sr("wasm",r,10)}Object.defineProperty(me.versions,"web",{value:Dp,enumerable:!0});export{LT as InferenceSession,li as TRACE,ur as TRACE_EVENT_BEGIN,lr as TRACE_EVENT_END,$t as TRACE_FUNC_BEGIN,yt as TRACE_FUNC_END,St as Tensor,zq as default,me as env,sr as registerBackend};
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
