/*!
 * ONNX Runtime Web v1.23.0-dev.20250906-ecb26fb775
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var Q2=Object.create;var ai=Object.defineProperty;var Y2=Object.getOwnPropertyDescriptor;var eI=Object.getOwnPropertyNames;var tI=Object.getPrototypeOf,rI=Object.prototype.hasOwnProperty;var Os=(n=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(n,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):n)(function(n){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+n+'" is not supported')});var N=(n,e)=>()=>(n&&(e=n(n=0)),e);var ne=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports),In=(n,e)=>{for(var r in e)ai(n,r,{get:e[r],enumerable:!0})},Fp=(n,e,r,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of eI(e))!rI.call(n,o)&&o!==r&&ai(n,o,{get:()=>e[o],enumerable:!(t=Y2(e,o))||t.enumerable});return n};var ye=(n,e,r)=>(r=n!=null?Q2(tI(n)):{},Fp(e||!n||!n.__esModule?ai(r,"default",{value:n,enumerable:!0}):r,n)),Kn=n=>Fp(ai({},"__esModule",{value:!0}),n);var si,Sn,on,nI,Vp,Ps=N(()=>{"use strict";si=new Map,Sn=[],on=(n,e,r)=>{if(e&&typeof e.init=="function"&&typeof e.createInferenceSessionHandler=="function"){let t=si.get(n);if(t===void 0)si.set(n,{backend:e,priority:r});else{if(t.priority>r)return;if(t.priority===r&&t.backend!==e)throw new Error(`cannot register backend "${n}" using priority ${r}`)}if(r>=0){let o=Sn.indexOf(n);o!==-1&&Sn.splice(o,1);for(let i=0;i<Sn.length;i++)if(si.get(Sn[i]).priority<=r){Sn.splice(i,0,n);return}Sn.push(n)}return}throw new TypeError("not a valid backend")},nI=async n=>{let e=si.get(n);if(!e)return"backend not found.";if(e.initialized)return e.backend;if(e.aborted)return e.error;{let r=!!e.initPromise;try{return r||(e.initPromise=e.backend.init(n)),await e.initPromise,e.initialized=!0,e.backend}catch(t){return r||(e.error=`${t}`,e.aborted=!0),e.error}finally{delete e.initPromise}}},Vp=async n=>{let e=n.executionProviders||[],r=e.map(u=>typeof u=="string"?u:u.name),t=r.length===0?Sn:r,o,i=[],a=new Set;for(let u of t){let l=await nI(u);typeof l=="string"?i.push({name:u,err:l}):(o||(o=l),o===l&&a.add(u))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:l}of i)r.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${l}`);let s=e.filter(u=>a.has(typeof u=="string"?u:u.name));return[o,new Proxy(n,{get:(u,l)=>l==="executionProviders"?s:Reflect.get(u,l)})]}});var Gp=N(()=>{"use strict";Ps()});var Up,Wp=N(()=>{"use strict";Up="1.23.0-dev.20250703-7fc6235861"});var Hp,it,Es=N(()=>{"use strict";Wp();Hp="warning",it={wasm:{},webgl:{},webgpu:{},versions:{common:Up},set logLevel(n){if(n!==void 0){if(typeof n!="string"||["verbose","info","warning","error","fatal"].indexOf(n)===-1)throw new Error(`Unsupported logging level: ${n}`);Hp=n}},get logLevel(){return Hp}};Object.defineProperty(it,"logLevel",{enumerable:!0})});var de,qp=N(()=>{"use strict";Es();de=it});var jp,Kp,Xp=N(()=>{"use strict";jp=(n,e)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=n.dims[3],r.height=n.dims[2];let t=r.getContext("2d");if(t!=null){let o,i;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=n.dims[2],i=n.dims[3]):(o=n.dims[3],i=n.dims[2]);let a=e?.format!==void 0?e.format:"RGB",s=e?.norm,u,l;s===void 0||s.mean===void 0?u=[255,255,255,255]:typeof s.mean=="number"?u=[s.mean,s.mean,s.mean,s.mean]:(u=[s.mean[0],s.mean[1],s.mean[2],0],s.mean[3]!==void 0&&(u[3]=s.mean[3])),s===void 0||s.bias===void 0?l=[0,0,0,0]:typeof s.bias=="number"?l=[s.bias,s.bias,s.bias,s.bias]:(l=[s.bias[0],s.bias[1],s.bias[2],0],s.bias[3]!==void 0&&(l[3]=s.bias[3]));let c=i*o,p=0,h=c,m=c*2,g=-1;a==="RGBA"?(p=0,h=c,m=c*2,g=c*3):a==="RGB"?(p=0,h=c,m=c*2):a==="RBG"&&(p=0,m=c,h=c*2);for(let y=0;y<i;y++)for(let T=0;T<o;T++){let w=(n.data[p++]-l[0])*u[0],x=(n.data[h++]-l[1])*u[1],I=(n.data[m++]-l[2])*u[2],A=g===-1?255:(n.data[g++]-l[3])*u[3];t.fillStyle="rgba("+w+","+x+","+I+","+A+")",t.fillRect(T,y,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Kp=(n,e)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),t;if(r!=null){let o,i,a;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=n.dims[2],i=n.dims[1],a=n.dims[3]):(o=n.dims[3],i=n.dims[2],a=n.dims[1]);let s=e!==void 0&&e.format!==void 0?e.format:"RGB",u=e?.norm,l,c;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?c=[0,0,0,0]:typeof u.bias=="number"?c=[u.bias,u.bias,u.bias,u.bias]:(c=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(c[3]=u.bias[3]));let p=i*o;if(e!==void 0&&(e.format!==void 0&&a===4&&e.format!=="RGBA"||a===3&&e.format!=="RGB"&&e.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let h=4,m=0,g=1,y=2,T=3,w=0,x=p,I=p*2,A=-1;s==="RGBA"?(w=0,x=p,I=p*2,A=p*3):s==="RGB"?(w=0,x=p,I=p*2):s==="RBG"&&(w=0,I=p,x=p*2),t=r.createImageData(o,i);for(let P=0;P<i*o;m+=h,g+=h,y+=h,T+=h,P++)t.data[m]=(n.data[w++]-c[0])*l[0],t.data[g]=(n.data[x++]-c[1])*l[1],t.data[y]=(n.data[I++]-c[2])*l[2],t.data[T]=A===-1?255:(n.data[A++]-c[3])*l[3]}else throw new Error("Can not access image data");return t}});var Cs,Zp,Jp,Qp,Yp,ef,tf=N(()=>{"use strict";ui();Cs=(n,e)=>{if(n===void 0)throw new Error("Image buffer must be defined");if(e.height===void 0||e.width===void 0)throw new Error("Image height and width must be defined");if(e.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:t}=e,o=e.norm??{mean:255,bias:0},i,a;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?a=[o.bias,o.bias,o.bias,o.bias]:a=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let s=e.format!==void 0?e.format:"RGBA",u=e.tensorFormat!==void 0&&e.tensorFormat!==void 0?e.tensorFormat:"RGB",l=r*t,c=u==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),p=4,h=0,m=1,g=2,y=3,T=0,w=l,x=l*2,I=-1;s==="RGB"&&(p=3,h=0,m=1,g=2,y=-1),u==="RGBA"?I=l*3:u==="RBG"?(T=0,x=l,w=l*2):u==="BGR"&&(x=0,w=l,T=l*2);for(let P=0;P<l;P++,h+=p,g+=p,m+=p,y+=p)c[T++]=(n[h]+a[0])/i[0],c[w++]=(n[m]+a[1])/i[1],c[x++]=(n[g]+a[2])/i[2],I!==-1&&y!==-1&&(c[I++]=(n[y]+a[3])/i[3]);return u==="RGBA"?new pt("float32",c,[1,4,r,t]):new pt("float32",c,[1,3,r,t])},Zp=async(n,e)=>{let r=typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement,t=typeof ImageData<"u"&&n instanceof ImageData,o=typeof ImageBitmap<"u"&&n instanceof ImageBitmap,i=typeof n=="string",a,s=e??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(r){let c=u();c.width=n.width,c.height=n.height;let p=l(c);if(p!=null){let h=n.height,m=n.width;if(e!==void 0&&e.resizedHeight!==void 0&&e.resizedWidth!==void 0&&(h=e.resizedHeight,m=e.resizedWidth),e!==void 0){if(s=e,e.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");s.tensorFormat="RGBA",s.height=h,s.width=m}else s.tensorFormat="RGBA",s.height=h,s.width=m;p.drawImage(n,0,0),a=p.getImageData(0,0,m,h).data}else throw new Error("Can not access image data")}else if(t){let c,p;if(e!==void 0&&e.resizedWidth!==void 0&&e.resizedHeight!==void 0?(c=e.resizedHeight,p=e.resizedWidth):(c=n.height,p=n.width),e!==void 0&&(s=e),s.format="RGBA",s.height=c,s.width=p,e!==void 0){let h=u();h.width=p,h.height=c;let m=l(h);if(m!=null)m.putImageData(n,0,0),a=m.getImageData(0,0,p,c).data;else throw new Error("Can not access image data")}else a=n.data}else if(o){if(e===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=u();c.width=n.width,c.height=n.height;let p=l(c);if(p!=null){let h=n.height,m=n.width;return p.drawImage(n,0,0,m,h),a=p.getImageData(0,0,m,h).data,s.height=h,s.width=m,Cs(a,s)}else throw new Error("Can not access image data")}else{if(i)return new Promise((c,p)=>{let h=u(),m=l(h);if(!n||!m)return p();let g=new Image;g.crossOrigin="Anonymous",g.src=n,g.onload=()=>{h.width=g.width,h.height=g.height,m.drawImage(g,0,0,h.width,h.height);let y=m.getImageData(0,0,h.width,h.height);s.height=h.height,s.width=h.width,c(Cs(y.data,s))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return Cs(a,s);throw new Error("Input data provided is not supported - aborted tensor creation")},Jp=(n,e)=>{let{width:r,height:t,download:o,dispose:i}=e,a=[1,t,r,4];return new pt({location:"texture",type:"float32",texture:n,dims:a,download:o,dispose:i})},Qp=(n,e)=>{let{dataType:r,dims:t,download:o,dispose:i}=e;return new pt({location:"gpu-buffer",type:r??"float32",gpuBuffer:n,dims:t,download:o,dispose:i})},Yp=(n,e)=>{let{dataType:r,dims:t,download:o,dispose:i}=e;return new pt({location:"ml-tensor",type:r??"float32",mlTensor:n,dims:t,download:o,dispose:i})},ef=(n,e,r)=>new pt({location:"cpu-pinned",type:n,data:e,dims:r??[e.length]})});var $n,_o,rf,nf,of=N(()=>{"use strict";$n=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),_o=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),rf=!1,nf=()=>{if(!rf){rf=!0;let n=typeof BigInt64Array<"u"&&BigInt64Array.from,e=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,t=typeof r<"u"&&r.from;n&&($n.set("int64",BigInt64Array),_o.set(BigInt64Array,"int64")),e&&($n.set("uint64",BigUint64Array),_o.set(BigUint64Array,"uint64")),t?($n.set("float16",r),_o.set(r,"float16")):$n.set("float16",Uint16Array)}}});var af,sf,uf=N(()=>{"use strict";ui();af=n=>{let e=1;for(let r=0;r<n.length;r++){let t=n[r];if(typeof t!="number"||!Number.isSafeInteger(t))throw new TypeError(`dims[${r}] must be an integer, got: ${t}`);if(t<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${t}`);e*=t}return e},sf=(n,e)=>{switch(n.location){case"cpu":return new pt(n.type,n.data,e);case"cpu-pinned":return new pt({location:"cpu-pinned",data:n.data,type:n.type,dims:e});case"texture":return new pt({location:"texture",texture:n.texture,type:n.type,dims:e});case"gpu-buffer":return new pt({location:"gpu-buffer",gpuBuffer:n.gpuBuffer,type:n.type,dims:e});case"ml-tensor":return new pt({location:"ml-tensor",mlTensor:n.mlTensor,type:n.type,dims:e});default:throw new Error(`tensorReshape: tensor location ${n.location} is not supported`)}}});var pt,ui=N(()=>{"use strict";Xp();tf();of();uf();pt=class{constructor(e,r,t){nf();let o,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,o=e.type,i=e.dims,e.location){case"cpu-pinned":{let s=$n.get(o);if(!s)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(o=e,u=t,e==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");s=r}else{let l=$n.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(r)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?s=l.from(r,BigInt):s=l.from(r)}else if(r instanceof l)s=r;else if(r instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(r);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&r instanceof Uint16Array&&l!==Uint16Array)s=new globalThis.Float16Array(r.buffer,r.byteOffset,r.length);else throw new TypeError(`A ${o} tensor's data must be type of ${l}`)}else if(u=r,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")o="string",s=e;else if(l==="boolean")o="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)o="uint8",s=Uint8Array.from(e);else{let l=_o.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);o=l,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");i=u,this.cpuData=s,this.dataLocation="cpu"}let a=af(i);if(this.cpuData&&a!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=a}static async fromImage(e,r){return Zp(e,r)}static fromTexture(e,r){return Jp(e,r)}static fromGpuBuffer(e,r){return Qp(e,r)}static fromMLTensor(e,r){return Yp(e,r)}static fromPinnedBuffer(e,r,t){return ef(e,r,t)}toDataURL(e){return jp(this,e)}toImageData(e){return Kp(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,e&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return sf(this,e)}}});var It,Ds=N(()=>{"use strict";ui();It=pt});var li,lf,St,yt,an,sn,ks=N(()=>{"use strict";Es();li=(n,e)=>{(typeof it.trace>"u"?!it.wasm.trace:!it.trace)||console.timeStamp(`${n}::ORT::${e}`)},lf=(n,e)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],t=!1;for(let o=0;o<r.length;o++){if(t&&!r[o].includes("TRACE_FUNC")){let i=`FUNC_${n}::${r[o].trim().split(" ")[1]}`;e&&(i+=`::${e}`),li("CPU",i);return}r[o].includes("TRACE_FUNC")&&(t=!0)}},St=n=>{(typeof it.trace>"u"?!it.wasm.trace:!it.trace)||lf("BEGIN",n)},yt=n=>{(typeof it.trace>"u"?!it.wasm.trace:!it.trace)||lf("END",n)},an=n=>{(typeof it.trace>"u"?!it.wasm.trace:!it.trace)||console.time(`ORT::${n}`)},sn=n=>{(typeof it.trace>"u"?!it.wasm.trace:!it.trace)||console.timeEnd(`ORT::${n}`)}});var ci,cf=N(()=>{"use strict";Ps();Ds();ks();ci=class n{constructor(e){this.handler=e}async run(e,r,t){St(),an("InferenceSession.run");let o={},i={};if(typeof e!="object"||e===null||e instanceof It||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof It)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let l of r){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);o[l]=null}if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,c=Object.getOwnPropertyNames(r);for(let p of this.outputNames)if(c.indexOf(p)!==-1){let h=r[p];(h===null||h instanceof It)&&(l=!0,a=!1,o[p]=h)}if(l){if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof e[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(a)for(let l of this.outputNames)o[l]=null;let s=await this.handler.run(e,o,i),u={};for(let l in s)if(Object.hasOwnProperty.call(s,l)){let c=s[l];c instanceof It?u[l]=c:u[l]=new It(c.type,c.data,c.dims)}return sn("InferenceSession.run"),yt(),u}async release(){return this.handler.dispose()}static async create(e,r,t,o){St(),an("InferenceSession.create");let i,a={};if(typeof e=="string"){if(i=e,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof Uint8Array){if(i=e,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer){let c=e,p=0,h=e.byteLength;if(typeof r=="object"&&r!==null)a=r;else if(typeof r=="number"){if(p=r,!Number.isSafeInteger(p))throw new RangeError("'byteOffset' must be an integer.");if(p<0||p>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(h=e.byteLength-p,typeof t=="number"){if(h=t,!Number.isSafeInteger(h))throw new RangeError("'byteLength' must be an integer.");if(h<=0||p+h>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-p}].`);if(typeof o=="object"&&o!==null)a=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof t<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(c,p,h)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[s,u]=await Vp(a),l=await s.createInferenceSessionHandler(i,u);return sn("InferenceSession.create"),yt(),new n(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}});var oI,df=N(()=>{"use strict";cf();oI=ci});var pf=N(()=>{"use strict"});var ff=N(()=>{"use strict"});var hf=N(()=>{"use strict"});var mf=N(()=>{"use strict"});var Ns={};In(Ns,{InferenceSession:()=>oI,TRACE:()=>li,TRACE_EVENT_BEGIN:()=>an,TRACE_EVENT_END:()=>sn,TRACE_FUNC_BEGIN:()=>St,TRACE_FUNC_END:()=>yt,Tensor:()=>It,env:()=>de,registerBackend:()=>on});var ft=N(()=>{"use strict";Gp();qp();df();Ds();pf();ff();ks();hf();mf()});function un(n,e,r,t){if(e===void 0)return aI(n);if(r===void 0)di(n,e,1);else if(typeof r=="number"&&t===void 0)di(n,e,r);else if(typeof r=="string"&&t===void 0)di(n,r,1,e);else if(typeof r=="string"&&typeof t=="number")di(n,r,t,e);else throw new TypeError("input is valid")}function aI(n){return{verbose:un.verbose.bind(null,n),info:un.info.bind(null,n),warning:un.warning.bind(null,n),error:un.error.bind(null,n),fatal:un.fatal.bind(null,n)}}function di(n,e,r,t){let o=vo[t||""]||vo[""];bf[n]<bf[o.minimalSeverity]||(o.logDateTime&&(e=`${new Date().toISOString()}|${e}`),o.logSourceLocation,iI[o.provider].log(n,e,t))}var Ls,Rs,bf,iI,yf,vo,Be,fi,hi,mi,pi,Et=N(()=>{"use strict";Ls=class{log(e,r,t){}},Rs=class{log(e,r,t){console.log(`${this.color(e)} ${t?"\x1B[35m"+t+"\x1B[0m ":""}${r}`)}color(e){switch(e){case"verbose":return"\x1B[34;40mv\x1B[0m";case"info":return"\x1B[32mi\x1B[0m";case"warning":return"\x1B[30;43mw\x1B[0m";case"error":return"\x1B[31;40me\x1B[0m";case"fatal":return"\x1B[101mf\x1B[0m";default:throw new Error(`unsupported severity: ${e}`)}}},bf={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},iI={none:new Ls,console:new Rs},yf={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1},vo={"":yf};(u=>{function n(l,c){u("verbose",l,c)}u.verbose=n;function e(l,c){u("info",l,c)}u.info=e;function r(l,c){u("warning",l,c)}u.warning=r;function t(l,c){u("error",l,c)}u.error=t;function o(l,c){u("fatal",l,c)}u.fatal=o;function i(l){vo={},a("",l||{})}u.reset=i;function a(l,c){if(l==="*")i(c);else{let p=vo[l]||yf;vo[l]={provider:c.provider||p.provider,minimalSeverity:c.minimalSeverity||p.minimalSeverity,logDateTime:c.logDateTime===void 0?p.logDateTime:c.logDateTime,logSourceLocation:c.logSourceLocation===void 0?p.logSourceLocation:c.logSourceLocation}}}u.set=a;function s(l){let c={};l.logLevel&&(c.minimalSeverity=l.logLevel),a("",c)}u.setWithEnv=s})(un||={});Be=un,fi=class{constructor(e,r,t,o,i,a){this.category=e;this.name=r;this.startTime=t;this.endCallback=o;this.timer=i;this.ctx=a}async end(){return this.endCallback(this)}async checkTimer(){if(this.ctx===void 0||this.timer===void 0)throw new Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},hi=class{constructor(e,r,t,o){this.category=e;this.name=r;this.startTime=t;this.endTime=o}},mi=class{constructor(e,r,t){this._started=!1;this._flushPointer=0;this._started=!1,this._maxNumberEvents=e===void 0?1e4:e,this._flushBatchSize=r===void 0?10:r,this._flushIntervalInMilliseconds=t===void 0?5e3:t}static create(e){return e===void 0?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=pi(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,r,t,o){let i=this._started?this.begin(e,r,o):void 0,a=!1,s=t();if(s&&typeof s.then=="function")return a=!0,new Promise((u,l)=>{s.then(async c=>{i&&await i.end(),u(c)},async c=>{i&&await i.end(),l(c)})});if(!a&&i){let u=i.end();if(u&&typeof u.then=="function")return new Promise((l,c)=>{u.then(()=>{l(s)},p=>{c(p)})})}return s}begin(e,r,t){if(!this._started)throw new Error("profiler is not started yet");if(t===void 0){let o=pi();return this.flush(o),new fi(e,r,o,i=>this.endSync(i))}else{let o=t.beginTimer();return new fi(e,r,0,async i=>this.end(i),o,t)}}async end(e){let r=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new hi(e.category,e.name,e.startTime,r)),this.flush(r))}endSync(e){let r=pi();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new hi(e.category,e.name,e.startTime,r)),this.flush(r))}logOneEvent(e){Be.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let r=this._flushPointer;this._flushPointer<r+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=pi()}}get started(){return this._started}},pi=typeof performance<"u"&&performance.now?()=>performance.now():Date.now});function _f(n,e,r){for(let t of r){let o=t[0],i=t[1],a=t[2],s=t[3],u=t[4];if(n.opType===o){for(let l of e)if((l.domain===i||l.domain==="ai.onnx"&&i==="")&&sI(l.version,a))return{opImpl:s,opInit:u}}}throw new TypeError(`cannot resolve operator '${n.opType}' with opsets: ${e.map(t=>`${t.domain||"ai.onnx"} v${t.version}`).join(", ")}`)}function sI(n,e){if(e.endsWith("+")){let r=Number.parseInt(e.substring(0,e.length-1),10);return!isNaN(r)&&r<=n}else if(e.split("-").length===2){let r=e.split("-"),t=Number.parseInt(r[0],10),o=Number.parseInt(r[1],10);return!isNaN(t)&&!isNaN(o)&&t<=n&&n<=o}else return Number.parseInt(e,10)===n}var vf=N(()=>{"use strict"});var wf=ne(zs=>{"use strict";zs.__esModule=!0;var uI=function(){function n(e){if(!e)throw new TypeError("Invalid argument; `value` has no value.");this.value=n.EMPTY,e&&n.isGuid(e)&&(this.value=e)}return n.isGuid=function(e){var r=e.toString();return e&&(e instanceof n||n.validator.test(r))},n.create=function(){return new n([n.gen(2),n.gen(1),n.gen(1),n.gen(1),n.gen(3)].join("-"))},n.createEmpty=function(){return new n("emptyguid")},n.parse=function(e){return new n(e)},n.raw=function(){return[n.gen(2),n.gen(1),n.gen(1),n.gen(1),n.gen(3)].join("-")},n.gen=function(e){for(var r="",t=0;t<e;t++)r+=((1+Math.random())*65536|0).toString(16).substring(1);return r},n.prototype.equals=function(e){return n.isGuid(e)&&this.value===e.toString()},n.prototype.isEmpty=function(){return this.value===n.EMPTY},n.prototype.toString=function(){return this.value},n.prototype.toJSON=function(){return{value:this.value}},n.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),n.EMPTY="00000000-0000-0000-0000-000000000000",n}();zs.Guid=uI});function Ue(n,e,r){this.low=n|0,this.high=e|0,this.unsigned=!!r}function mt(n){return(n&&n.__isLong__)===!0}function xf(n){var e=Math.clz32(n&-n);return n?31-e:e}function An(n,e){var r,t,o;return e?(n>>>=0,(o=0<=n&&n<256)&&(t=If[n],t)?t:(r=Ne(n,0,!0),o&&(If[n]=r),r)):(n|=0,(o=-128<=n&&n<128)&&(t=Tf[n],t)?t:(r=Ne(n,n<0?-1:0,!1),o&&(Tf[n]=r),r))}function Dt(n,e){if(isNaN(n))return e?jr:Gt;if(e){if(n<0)return jr;if(n>=Of)return Cf}else{if(n<=-$f)return _t;if(n+1>=$f)return Ef}return n<0?Dt(-n,e).neg():Ne(n%Zn|0,n/Zn|0,e)}function Ne(n,e,r){return new Ue(n,e,r)}function Bs(n,e,r){if(n.length===0)throw Error("empty string");if(typeof e=="number"?(r=e,e=!1):e=!!e,n==="NaN"||n==="Infinity"||n==="+Infinity"||n==="-Infinity")return e?jr:Gt;if(r=r||10,r<2||36<r)throw RangeError("radix");var t;if((t=n.indexOf("-"))>0)throw Error("interior hyphen");if(t===0)return Bs(n.substring(1),e,r).neg();for(var o=Dt(gi(r,8)),i=Gt,a=0;a<n.length;a+=8){var s=Math.min(8,n.length-a),u=parseInt(n.substring(a,a+s),r);if(s<8){var l=Dt(gi(r,s));i=i.mul(l).add(Dt(u))}else i=i.mul(o),i=i.add(Dt(u))}return i.unsigned=e,i}function Ut(n,e){return typeof n=="number"?Dt(n,e):typeof n=="string"?Bs(n,e):Ne(n.low,n.high,typeof e=="boolean"?e:n.unsigned)}var Ct,Tf,If,gi,Sf,lI,Zn,Of,$f,Af,Gt,jr,Xn,Pf,Ms,Ef,Cf,_t,H,ln,Fs=N(()=>{Ct=null;try{Ct=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}Ue.prototype.__isLong__;Object.defineProperty(Ue.prototype,"__isLong__",{value:!0});Ue.isLong=mt;Tf={},If={};Ue.fromInt=An;Ue.fromNumber=Dt;Ue.fromBits=Ne;gi=Math.pow;Ue.fromString=Bs;Ue.fromValue=Ut;Sf=65536,lI=1<<24,Zn=Sf*Sf,Of=Zn*Zn,$f=Of/2,Af=An(lI),Gt=An(0);Ue.ZERO=Gt;jr=An(0,!0);Ue.UZERO=jr;Xn=An(1);Ue.ONE=Xn;Pf=An(1,!0);Ue.UONE=Pf;Ms=An(-1);Ue.NEG_ONE=Ms;Ef=Ne(-1,2147483647,!1);Ue.MAX_VALUE=Ef;Cf=Ne(-1,-1,!0);Ue.MAX_UNSIGNED_VALUE=Cf;_t=Ne(0,-2147483648,!1);Ue.MIN_VALUE=_t;H=Ue.prototype;H.toInt=function(){return this.unsigned?this.low>>>0:this.low};H.toNumber=function(){return this.unsigned?(this.high>>>0)*Zn+(this.low>>>0):this.high*Zn+(this.low>>>0)};H.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(_t)){var r=Dt(e),t=this.div(r),o=t.mul(r).sub(this);return t.toString(e)+o.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var i=Dt(gi(e,6),this.unsigned),a=this,s="";;){var u=a.div(i),l=a.sub(u.mul(i)).toInt()>>>0,c=l.toString(e);if(a=u,a.isZero())return c+s;for(;c.length<6;)c="0"+c;s=""+c+s}};H.getHighBits=function(){return this.high};H.getHighBitsUnsigned=function(){return this.high>>>0};H.getLowBits=function(){return this.low};H.getLowBitsUnsigned=function(){return this.low>>>0};H.getNumBitsAbs=function(){if(this.isNegative())return this.eq(_t)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,r=31;r>0&&(e&1<<r)==0;r--);return this.high!=0?r+33:r+1};H.isZero=function(){return this.high===0&&this.low===0};H.eqz=H.isZero;H.isNegative=function(){return!this.unsigned&&this.high<0};H.isPositive=function(){return this.unsigned||this.high>=0};H.isOdd=function(){return(this.low&1)===1};H.isEven=function(){return(this.low&1)===0};H.equals=function(e){return mt(e)||(e=Ut(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low};H.eq=H.equals;H.notEquals=function(e){return!this.eq(e)};H.neq=H.notEquals;H.ne=H.notEquals;H.lessThan=function(e){return this.comp(e)<0};H.lt=H.lessThan;H.lessThanOrEqual=function(e){return this.comp(e)<=0};H.lte=H.lessThanOrEqual;H.le=H.lessThanOrEqual;H.greaterThan=function(e){return this.comp(e)>0};H.gt=H.greaterThan;H.greaterThanOrEqual=function(e){return this.comp(e)>=0};H.gte=H.greaterThanOrEqual;H.ge=H.greaterThanOrEqual;H.compare=function(e){if(mt(e)||(e=Ut(e)),this.eq(e))return 0;var r=this.isNegative(),t=e.isNegative();return r&&!t?-1:!r&&t?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1};H.comp=H.compare;H.negate=function(){return!this.unsigned&&this.eq(_t)?_t:this.not().add(Xn)};H.neg=H.negate;H.add=function(e){mt(e)||(e=Ut(e));var r=this.high>>>16,t=this.high&65535,o=this.low>>>16,i=this.low&65535,a=e.high>>>16,s=e.high&65535,u=e.low>>>16,l=e.low&65535,c=0,p=0,h=0,m=0;return m+=i+l,h+=m>>>16,m&=65535,h+=o+u,p+=h>>>16,h&=65535,p+=t+s,c+=p>>>16,p&=65535,c+=r+a,c&=65535,Ne(h<<16|m,c<<16|p,this.unsigned)};H.subtract=function(e){return mt(e)||(e=Ut(e)),this.add(e.neg())};H.sub=H.subtract;H.multiply=function(e){if(this.isZero())return this;if(mt(e)||(e=Ut(e)),Ct){var r=Ct.mul(this.low,this.high,e.low,e.high);return Ne(r,Ct.get_high(),this.unsigned)}if(e.isZero())return this.unsigned?jr:Gt;if(this.eq(_t))return e.isOdd()?_t:Gt;if(e.eq(_t))return this.isOdd()?_t:Gt;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(Af)&&e.lt(Af))return Dt(this.toNumber()*e.toNumber(),this.unsigned);var t=this.high>>>16,o=this.high&65535,i=this.low>>>16,a=this.low&65535,s=e.high>>>16,u=e.high&65535,l=e.low>>>16,c=e.low&65535,p=0,h=0,m=0,g=0;return g+=a*c,m+=g>>>16,g&=65535,m+=i*c,h+=m>>>16,m&=65535,m+=a*l,h+=m>>>16,m&=65535,h+=o*c,p+=h>>>16,h&=65535,h+=i*l,p+=h>>>16,h&=65535,h+=a*u,p+=h>>>16,h&=65535,p+=t*c+o*l+i*u+a*s,p&=65535,Ne(m<<16|g,p<<16|h,this.unsigned)};H.mul=H.multiply;H.divide=function(e){if(mt(e)||(e=Ut(e)),e.isZero())throw Error("division by zero");if(Ct){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var r=(this.unsigned?Ct.div_u:Ct.div_s)(this.low,this.high,e.low,e.high);return Ne(r,Ct.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?jr:Gt;var t,o,i;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return jr;if(e.gt(this.shru(1)))return Pf;i=jr}else{if(this.eq(_t)){if(e.eq(Xn)||e.eq(Ms))return _t;if(e.eq(_t))return Xn;var a=this.shr(1);return t=a.div(e).shl(1),t.eq(Gt)?e.isNegative()?Xn:Ms:(o=this.sub(e.mul(t)),i=t.add(o.div(e)),i)}else if(e.eq(_t))return this.unsigned?jr:Gt;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();i=Gt}for(o=this;o.gte(e);){t=Math.max(1,Math.floor(o.toNumber()/e.toNumber()));for(var s=Math.ceil(Math.log(t)/Math.LN2),u=s<=48?1:gi(2,s-48),l=Dt(t),c=l.mul(e);c.isNegative()||c.gt(o);)t-=u,l=Dt(t,this.unsigned),c=l.mul(e);l.isZero()&&(l=Xn),i=i.add(l),o=o.sub(c)}return i};H.div=H.divide;H.modulo=function(e){if(mt(e)||(e=Ut(e)),Ct){var r=(this.unsigned?Ct.rem_u:Ct.rem_s)(this.low,this.high,e.low,e.high);return Ne(r,Ct.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))};H.mod=H.modulo;H.rem=H.modulo;H.not=function(){return Ne(~this.low,~this.high,this.unsigned)};H.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32};H.clz=H.countLeadingZeros;H.countTrailingZeros=function(){return this.low?xf(this.low):xf(this.high)+32};H.ctz=H.countTrailingZeros;H.and=function(e){return mt(e)||(e=Ut(e)),Ne(this.low&e.low,this.high&e.high,this.unsigned)};H.or=function(e){return mt(e)||(e=Ut(e)),Ne(this.low|e.low,this.high|e.high,this.unsigned)};H.xor=function(e){return mt(e)||(e=Ut(e)),Ne(this.low^e.low,this.high^e.high,this.unsigned)};H.shiftLeft=function(e){return mt(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Ne(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):Ne(0,this.low<<e-32,this.unsigned)};H.shl=H.shiftLeft;H.shiftRight=function(e){return mt(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Ne(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):Ne(this.high>>e-32,this.high>=0?0:-1,this.unsigned)};H.shr=H.shiftRight;H.shiftRightUnsigned=function(e){return mt(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Ne(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):e===32?Ne(this.high,0,this.unsigned):Ne(this.high>>>e-32,0,this.unsigned)};H.shru=H.shiftRightUnsigned;H.shr_u=H.shiftRightUnsigned;H.rotateLeft=function(e){var r;return mt(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Ne(this.high,this.low,this.unsigned):e<32?(r=32-e,Ne(this.low<<e|this.high>>>r,this.high<<e|this.low>>>r,this.unsigned)):(e-=32,r=32-e,Ne(this.high<<e|this.low>>>r,this.low<<e|this.high>>>r,this.unsigned))};H.rotl=H.rotateLeft;H.rotateRight=function(e){var r;return mt(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Ne(this.high,this.low,this.unsigned):e<32?(r=32-e,Ne(this.high<<r|this.low>>>e,this.low<<r|this.high>>>e,this.unsigned)):(e-=32,r=32-e,Ne(this.low<<r|this.high>>>e,this.high<<r|this.low>>>e,this.unsigned))};H.rotr=H.rotateRight;H.toSigned=function(){return this.unsigned?Ne(this.low,this.high,!1):this};H.toUnsigned=function(){return this.unsigned?this:Ne(this.low,this.high,!0)};H.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()};H.toBytesLE=function(){var e=this.high,r=this.low;return[r&255,r>>>8&255,r>>>16&255,r>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]};H.toBytesBE=function(){var e=this.high,r=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,r>>>24,r>>>16&255,r>>>8&255,r&255]};Ue.fromBytes=function(e,r,t){return t?Ue.fromBytesLE(e,r):Ue.fromBytesBE(e,r)};Ue.fromBytesLE=function(e,r){return new Ue(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,r)};Ue.fromBytesBE=function(e,r){return new Ue(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],r)};ln=Ue});var Vs=ne(bi=>{"use strict";Object.defineProperty(bi,"__esModule",{value:!0});bi.ArgType=void 0;var Df;(function(n){n[n.INPUT=0]="INPUT",n[n.OUTPUT=1]="OUTPUT"})(Df||(bi.ArgType=Df={}))});var On=ne(tr=>{"use strict";Object.defineProperty(tr,"__esModule",{value:!0});tr.SIZE_PREFIX_LENGTH=tr.FILE_IDENTIFIER_LENGTH=tr.SIZEOF_INT=tr.SIZEOF_SHORT=void 0;tr.SIZEOF_SHORT=2;tr.SIZEOF_INT=4;tr.FILE_IDENTIFIER_LENGTH=4;tr.SIZE_PREFIX_LENGTH=4});var Gs=ne(kt=>{"use strict";Object.defineProperty(kt,"__esModule",{value:!0});kt.isLittleEndian=kt.float64=kt.float32=kt.int32=void 0;kt.int32=new Int32Array(2);kt.float32=new Float32Array(kt.int32.buffer);kt.float64=new Float64Array(kt.int32.buffer);kt.isLittleEndian=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1});var Us=ne(yi=>{"use strict";Object.defineProperty(yi,"__esModule",{value:!0});yi.Encoding=void 0;var kf;(function(n){n[n.UTF8_BYTES=1]="UTF8_BYTES",n[n.UTF16_STRING=2]="UTF16_STRING"})(kf||(yi.Encoding=kf={}))});var Hs=ne(_i=>{"use strict";Object.defineProperty(_i,"__esModule",{value:!0});_i.ByteBuffer=void 0;var rr=On(),vt=Gs(),cI=Us(),Ws=class n{constructor(e){this.bytes_=e,this.position_=0,this.text_decoder_=new TextDecoder}static allocate(e){return new n(new Uint8Array(e))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(e){this.position_=e}capacity(){return this.bytes_.length}readInt8(e){return this.readUint8(e)<<24>>24}readUint8(e){return this.bytes_[e]}readInt16(e){return this.readUint16(e)<<16>>16}readUint16(e){return this.bytes_[e]|this.bytes_[e+1]<<8}readInt32(e){return this.bytes_[e]|this.bytes_[e+1]<<8|this.bytes_[e+2]<<16|this.bytes_[e+3]<<24}readUint32(e){return this.readInt32(e)>>>0}readInt64(e){return BigInt.asIntN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readUint64(e){return BigInt.asUintN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readFloat32(e){return vt.int32[0]=this.readInt32(e),vt.float32[0]}readFloat64(e){return vt.int32[vt.isLittleEndian?0:1]=this.readInt32(e),vt.int32[vt.isLittleEndian?1:0]=this.readInt32(e+4),vt.float64[0]}writeInt8(e,r){this.bytes_[e]=r}writeUint8(e,r){this.bytes_[e]=r}writeInt16(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8}writeUint16(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8}writeInt32(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8,this.bytes_[e+2]=r>>16,this.bytes_[e+3]=r>>24}writeUint32(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8,this.bytes_[e+2]=r>>16,this.bytes_[e+3]=r>>24}writeInt64(e,r){this.writeInt32(e,Number(BigInt.asIntN(32,r))),this.writeInt32(e+4,Number(BigInt.asIntN(32,r>>BigInt(32))))}writeUint64(e,r){this.writeUint32(e,Number(BigInt.asUintN(32,r))),this.writeUint32(e+4,Number(BigInt.asUintN(32,r>>BigInt(32))))}writeFloat32(e,r){vt.float32[0]=r,this.writeInt32(e,vt.int32[0])}writeFloat64(e,r){vt.float64[0]=r,this.writeInt32(e,vt.int32[vt.isLittleEndian?0:1]),this.writeInt32(e+4,vt.int32[vt.isLittleEndian?1:0])}getBufferIdentifier(){if(this.bytes_.length<this.position_+rr.SIZEOF_INT+rr.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let e="";for(let r=0;r<rr.FILE_IDENTIFIER_LENGTH;r++)e+=String.fromCharCode(this.readInt8(this.position_+rr.SIZEOF_INT+r));return e}__offset(e,r){let t=e-this.readInt32(e);return r<this.readInt16(t)?this.readInt16(t+r):0}__union(e,r){return e.bb_pos=r+this.readInt32(r),e.bb=this,e}__string(e,r){e+=this.readInt32(e);let t=this.readInt32(e);e+=rr.SIZEOF_INT;let o=this.bytes_.subarray(e,e+t);return r===cI.Encoding.UTF8_BYTES?o:this.text_decoder_.decode(o)}__union_with_string(e,r){return typeof e=="string"?this.__string(r):this.__union(e,r)}__indirect(e){return e+this.readInt32(e)}__vector(e){return e+this.readInt32(e)+rr.SIZEOF_INT}__vector_len(e){return this.readInt32(e+this.readInt32(e))}__has_identifier(e){if(e.length!=rr.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+rr.FILE_IDENTIFIER_LENGTH);for(let r=0;r<rr.FILE_IDENTIFIER_LENGTH;r++)if(e.charCodeAt(r)!=this.readInt8(this.position()+rr.SIZEOF_INT+r))return!1;return!0}createScalarList(e,r){let t=[];for(let o=0;o<r;++o){let i=e(o);i!==null&&t.push(i)}return t}createObjList(e,r){let t=[];for(let o=0;o<r;++o){let i=e(o);i!==null&&t.push(i.unpack())}return t}};_i.ByteBuffer=Ws});var Lf=ne(vi=>{"use strict";Object.defineProperty(vi,"__esModule",{value:!0});vi.Builder=void 0;var Nf=Hs(),$t=On(),qs=class n{constructor(e){this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null,this.text_encoder=new TextEncoder;let r;e?r=e:r=1024,this.bb=Nf.ByteBuffer.allocate(r),this.space=r}clear(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null}forceDefaults(e){this.force_defaults=e}dataBuffer(){return this.bb}asUint8Array(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())}prep(e,r){e>this.minalign&&(this.minalign=e);let t=~(this.bb.capacity()-this.space+r)+1&e-1;for(;this.space<t+e+r;){let o=this.bb.capacity();this.bb=n.growByteBuffer(this.bb),this.space+=this.bb.capacity()-o}this.pad(t)}pad(e){for(let r=0;r<e;r++)this.bb.writeInt8(--this.space,0)}writeInt8(e){this.bb.writeInt8(this.space-=1,e)}writeInt16(e){this.bb.writeInt16(this.space-=2,e)}writeInt32(e){this.bb.writeInt32(this.space-=4,e)}writeInt64(e){this.bb.writeInt64(this.space-=8,e)}writeFloat32(e){this.bb.writeFloat32(this.space-=4,e)}writeFloat64(e){this.bb.writeFloat64(this.space-=8,e)}addInt8(e){this.prep(1,0),this.writeInt8(e)}addInt16(e){this.prep(2,0),this.writeInt16(e)}addInt32(e){this.prep(4,0),this.writeInt32(e)}addInt64(e){this.prep(8,0),this.writeInt64(e)}addFloat32(e){this.prep(4,0),this.writeFloat32(e)}addFloat64(e){this.prep(8,0),this.writeFloat64(e)}addFieldInt8(e,r,t){(this.force_defaults||r!=t)&&(this.addInt8(r),this.slot(e))}addFieldInt16(e,r,t){(this.force_defaults||r!=t)&&(this.addInt16(r),this.slot(e))}addFieldInt32(e,r,t){(this.force_defaults||r!=t)&&(this.addInt32(r),this.slot(e))}addFieldInt64(e,r,t){(this.force_defaults||r!==t)&&(this.addInt64(r),this.slot(e))}addFieldFloat32(e,r,t){(this.force_defaults||r!=t)&&(this.addFloat32(r),this.slot(e))}addFieldFloat64(e,r,t){(this.force_defaults||r!=t)&&(this.addFloat64(r),this.slot(e))}addFieldOffset(e,r,t){(this.force_defaults||r!=t)&&(this.addOffset(r),this.slot(e))}addFieldStruct(e,r,t){r!=t&&(this.nested(r),this.slot(e))}nested(e){if(e!=this.offset())throw new TypeError("FlatBuffers: struct must be serialized inline.")}notNested(){if(this.isNested)throw new TypeError("FlatBuffers: object serialization must not be nested.")}slot(e){this.vtable!==null&&(this.vtable[e]=this.offset())}offset(){return this.bb.capacity()-this.space}static growByteBuffer(e){let r=e.capacity();if(r&3221225472)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");let t=r<<1,o=Nf.ByteBuffer.allocate(t);return o.setPosition(t-r),o.bytes().set(e.bytes(),t-r),o}addOffset(e){this.prep($t.SIZEOF_INT,0),this.writeInt32(this.offset()-e+$t.SIZEOF_INT)}startObject(e){this.notNested(),this.vtable==null&&(this.vtable=[]),this.vtable_in_use=e;for(let r=0;r<e;r++)this.vtable[r]=0;this.isNested=!0,this.object_start=this.offset()}endObject(){if(this.vtable==null||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);let e=this.offset(),r=this.vtable_in_use-1;for(;r>=0&&this.vtable[r]==0;r--);let t=r+1;for(;r>=0;r--)this.addInt16(this.vtable[r]!=0?e-this.vtable[r]:0);let o=2;this.addInt16(e-this.object_start);let i=(t+o)*$t.SIZEOF_SHORT;this.addInt16(i);let a=0,s=this.space;e:for(r=0;r<this.vtables.length;r++){let u=this.bb.capacity()-this.vtables[r];if(i==this.bb.readInt16(u)){for(let l=$t.SIZEOF_SHORT;l<i;l+=$t.SIZEOF_SHORT)if(this.bb.readInt16(s+l)!=this.bb.readInt16(u+l))continue e;a=this.vtables[r];break}}return a?(this.space=this.bb.capacity()-e,this.bb.writeInt32(this.space,a-e)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-e,this.offset()-e)),this.isNested=!1,e}finish(e,r,t){let o=t?$t.SIZE_PREFIX_LENGTH:0;if(r){let i=r;if(this.prep(this.minalign,$t.SIZEOF_INT+$t.FILE_IDENTIFIER_LENGTH+o),i.length!=$t.FILE_IDENTIFIER_LENGTH)throw new TypeError("FlatBuffers: file identifier must be length "+$t.FILE_IDENTIFIER_LENGTH);for(let a=$t.FILE_IDENTIFIER_LENGTH-1;a>=0;a--)this.writeInt8(i.charCodeAt(a))}this.prep(this.minalign,$t.SIZEOF_INT+o),this.addOffset(e),o&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)}finishSizePrefixed(e,r){this.finish(e,r,!0)}requiredField(e,r){let t=this.bb.capacity()-e,o=t-this.bb.readInt32(t);if(!(r<this.bb.readInt16(o)&&this.bb.readInt16(o+r)!=0))throw new TypeError("FlatBuffers: field "+r+" must be set")}startVector(e,r,t){this.notNested(),this.vector_num_elems=r,this.prep($t.SIZEOF_INT,e*r),this.prep(t,e*r)}endVector(){return this.writeInt32(this.vector_num_elems),this.offset()}createSharedString(e){if(!e)return 0;if(this.string_maps||(this.string_maps=new Map),this.string_maps.has(e))return this.string_maps.get(e);let r=this.createString(e);return this.string_maps.set(e,r),r}createString(e){if(e==null)return 0;let r;return e instanceof Uint8Array?r=e:r=this.text_encoder.encode(e),this.addInt8(0),this.startVector(1,r.length,1),this.bb.setPosition(this.space-=r.length),this.bb.bytes().set(r,this.space),this.endVector()}createByteVector(e){return e==null?0:(this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length),this.bb.bytes().set(e,this.space),this.endVector())}createObjectOffset(e){return e===null?0:typeof e=="string"?this.createString(e):e.pack(this)}createObjectOffsetList(e){let r=[];for(let t=0;t<e.length;++t){let o=e[t];if(o!==null)r.push(this.createObjectOffset(o));else throw new TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.")}return r}createStructOffsetList(e,r){return r(this,e.length),this.createObjectOffsetList(e.slice().reverse()),this.endVector()}};vi.Builder=qs});var Le=ne(Xe=>{"use strict";Object.defineProperty(Xe,"__esModule",{value:!0});Xe.ByteBuffer=Xe.Builder=Xe.Encoding=Xe.isLittleEndian=Xe.float64=Xe.float32=Xe.int32=Xe.SIZE_PREFIX_LENGTH=Xe.FILE_IDENTIFIER_LENGTH=Xe.SIZEOF_INT=Xe.SIZEOF_SHORT=void 0;var dI=On();Object.defineProperty(Xe,"SIZEOF_SHORT",{enumerable:!0,get:function(){return dI.SIZEOF_SHORT}});var pI=On();Object.defineProperty(Xe,"SIZEOF_INT",{enumerable:!0,get:function(){return pI.SIZEOF_INT}});var fI=On();Object.defineProperty(Xe,"FILE_IDENTIFIER_LENGTH",{enumerable:!0,get:function(){return fI.FILE_IDENTIFIER_LENGTH}});var hI=On();Object.defineProperty(Xe,"SIZE_PREFIX_LENGTH",{enumerable:!0,get:function(){return hI.SIZE_PREFIX_LENGTH}});var wi=Gs();Object.defineProperty(Xe,"int32",{enumerable:!0,get:function(){return wi.int32}});Object.defineProperty(Xe,"float32",{enumerable:!0,get:function(){return wi.float32}});Object.defineProperty(Xe,"float64",{enumerable:!0,get:function(){return wi.float64}});Object.defineProperty(Xe,"isLittleEndian",{enumerable:!0,get:function(){return wi.isLittleEndian}});var mI=Us();Object.defineProperty(Xe,"Encoding",{enumerable:!0,get:function(){return mI.Encoding}});var gI=Lf();Object.defineProperty(Xe,"Builder",{enumerable:!0,get:function(){return gI.Builder}});var bI=Hs();Object.defineProperty(Xe,"ByteBuffer",{enumerable:!0,get:function(){return bI.ByteBuffer}})});var Ks=ne(nr=>{"use strict";var yI=nr&&nr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),_I=nr&&nr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),vI=nr&&nr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&yI(e,n,r);return _I(e,n),e};Object.defineProperty(nr,"__esModule",{value:!0});nr.ArgTypeAndIndex=void 0;var wI=vI(Le()),Rf=Vs(),js=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsArgTypeAndIndex(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsArgTypeAndIndex(e,r){return e.setPosition(e.position()+wI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}argType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):Rf.ArgType.INPUT}index(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}static startArgTypeAndIndex(e){e.startObject(2)}static addArgType(e,r){e.addFieldInt8(0,r,Rf.ArgType.INPUT)}static addIndex(e,r){e.addFieldInt32(1,r,0)}static endArgTypeAndIndex(e){return e.endObject()}static createArgTypeAndIndex(e,r,t){return n.startArgTypeAndIndex(e),n.addArgType(e,r),n.addIndex(e,t),n.endArgTypeAndIndex(e)}};nr.ArgTypeAndIndex=js});var Xs=ne(xi=>{"use strict";Object.defineProperty(xi,"__esModule",{value:!0});xi.AttributeType=void 0;var zf;(function(n){n[n.UNDEFINED=0]="UNDEFINED",n[n.FLOAT=1]="FLOAT",n[n.INT=2]="INT",n[n.STRING=3]="STRING",n[n.TENSOR=4]="TENSOR",n[n.GRAPH=5]="GRAPH",n[n.FLOATS=6]="FLOATS",n[n.INTS=7]="INTS",n[n.STRINGS=8]="STRINGS",n[n.TENSORS=9]="TENSORS",n[n.GRAPHS=10]="GRAPHS",n[n.SPARSE_TENSOR=11]="SPARSE_TENSOR",n[n.SPARSE_TENSORS=12]="SPARSE_TENSORS"})(zf||(xi.AttributeType=zf={}))});var Zs=ne(Ti=>{"use strict";Object.defineProperty(Ti,"__esModule",{value:!0});Ti.NodeType=void 0;var Mf;(function(n){n[n.Primitive=0]="Primitive",n[n.Fused=1]="Fused"})(Mf||(Ti.NodeType=Mf={}))});var Qs=ne(or=>{"use strict";var xI=or&&or.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),TI=or&&or.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),II=or&&or.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&xI(e,n,r);return TI(e,n),e};Object.defineProperty(or,"__esModule",{value:!0});or.Node=void 0;var SI=II(Le()),$I=Ys(),Bf=Zs(),Js=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNode(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNode(e,r){return e.setPosition(e.position()+SI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}domain(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}sinceVersion(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):0}index(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readUint32(this.bb_pos+e):0}opType(e){let r=this.bb.__offset(this.bb_pos,14);return r?this.bb.__string(this.bb_pos+r,e):null}type(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt32(this.bb_pos+e):Bf.NodeType.Primitive}executionProviderType(e){let r=this.bb.__offset(this.bb_pos,18);return r?this.bb.__string(this.bb_pos+r,e):null}inputs(e,r){let t=this.bb.__offset(this.bb_pos,20);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,r){let t=this.bb.__offset(this.bb_pos,22);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}attributes(e,r){let t=this.bb.__offset(this.bb_pos,24);return t?(r||new $I.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}attributesLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCounts(e){let r=this.bb.__offset(this.bb_pos,26);return r?this.bb.readInt32(this.bb.__vector(this.bb_pos+r)+e*4):0}inputArgCountsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCountsArray(){let e=this.bb.__offset(this.bb_pos,26);return e?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}implicitInputs(e,r){let t=this.bb.__offset(this.bb_pos,28);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}implicitInputsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNode(e){e.startObject(13)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addDomain(e,r){e.addFieldOffset(2,r,0)}static addSinceVersion(e,r){e.addFieldInt32(3,r,0)}static addIndex(e,r){e.addFieldInt32(4,r,0)}static addOpType(e,r){e.addFieldOffset(5,r,0)}static addType(e,r){e.addFieldInt32(6,r,Bf.NodeType.Primitive)}static addExecutionProviderType(e,r){e.addFieldOffset(7,r,0)}static addInputs(e,r){e.addFieldOffset(8,r,0)}static createInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInputsVector(e,r){e.startVector(4,r,4)}static addOutputs(e,r){e.addFieldOffset(9,r,0)}static createOutputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOutputsVector(e,r){e.startVector(4,r,4)}static addAttributes(e,r){e.addFieldOffset(10,r,0)}static createAttributesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startAttributesVector(e,r){e.startVector(4,r,4)}static addInputArgCounts(e,r){e.addFieldOffset(11,r,0)}static createInputArgCountsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addInt32(r[t]);return e.endVector()}static startInputArgCountsVector(e,r){e.startVector(4,r,4)}static addImplicitInputs(e,r){e.addFieldOffset(12,r,0)}static createImplicitInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startImplicitInputsVector(e,r){e.startVector(4,r,4)}static endNode(e){return e.endObject()}static createNode(e,r,t,o,i,a,s,u,l,c,p,h,m,g){return n.startNode(e),n.addName(e,r),n.addDocString(e,t),n.addDomain(e,o),n.addSinceVersion(e,i),n.addIndex(e,a),n.addOpType(e,s),n.addType(e,u),n.addExecutionProviderType(e,l),n.addInputs(e,c),n.addOutputs(e,p),n.addAttributes(e,h),n.addInputArgCounts(e,m),n.addImplicitInputs(e,g),n.endNode(e)}};or.Node=Js});var tu=ne(Ii=>{"use strict";Object.defineProperty(Ii,"__esModule",{value:!0});Ii.EdgeEnd=void 0;var eu=class{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static sizeOf(){return 12}static createEdgeEnd(e,r,t,o){return e.prep(4,12),e.writeInt32(o),e.writeInt32(t),e.writeInt32(r),e.offset()}};Ii.EdgeEnd=eu});var nu=ne(ir=>{"use strict";var AI=ir&&ir.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),OI=ir&&ir.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),PI=ir&&ir.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&AI(e,n,r);return OI(e,n),e};Object.defineProperty(ir,"__esModule",{value:!0});ir.NodeEdge=void 0;var EI=PI(Le()),Ff=tu(),ru=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNodeEdge(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodeEdge(e,r){return e.setPosition(e.position()+EI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}inputEdges(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new Ff.EdgeEnd).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}inputEdgesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}outputEdges(e,r){let t=this.bb.__offset(this.bb_pos,8);return t?(r||new Ff.EdgeEnd).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}outputEdgesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNodeEdge(e){e.startObject(3)}static addNodeIndex(e,r){e.addFieldInt32(0,r,0)}static addInputEdges(e,r){e.addFieldOffset(1,r,0)}static startInputEdgesVector(e,r){e.startVector(12,r,4)}static addOutputEdges(e,r){e.addFieldOffset(2,r,0)}static startOutputEdgesVector(e,r){e.startVector(12,r,4)}static endNodeEdge(e){return e.endObject()}static createNodeEdge(e,r,t,o){return n.startNodeEdge(e),n.addNodeIndex(e,r),n.addInputEdges(e,t),n.addOutputEdges(e,o),n.endNodeEdge(e)}};ir.NodeEdge=ru});var iu=ne(ar=>{"use strict";var CI=ar&&ar.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),DI=ar&&ar.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),kI=ar&&ar.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&CI(e,n,r);return DI(e,n),e};Object.defineProperty(ar,"__esModule",{value:!0});ar.NodesToOptimizeIndices=void 0;var NI=kI(Le()),ou=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNodesToOptimizeIndices(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodesToOptimizeIndices(e,r){return e.setPosition(e.position()+NI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndices(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.readUint32(this.bb.__vector(this.bb_pos+r)+e*4):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}numInputs(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}numOutputs(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readUint32(this.bb_pos+e):0}hasVariadicInput(){let e=this.bb.__offset(this.bb_pos,10);return e?!!this.bb.readInt8(this.bb_pos+e):!1}hasVariadicOutput(){let e=this.bb.__offset(this.bb_pos,12);return e?!!this.bb.readInt8(this.bb_pos+e):!1}numVariadicInputs(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readUint32(this.bb_pos+e):0}numVariadicOutputs(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readUint32(this.bb_pos+e):0}static startNodesToOptimizeIndices(e){e.startObject(7)}static addNodeIndices(e,r){e.addFieldOffset(0,r,0)}static createNodeIndicesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addInt32(r[t]);return e.endVector()}static startNodeIndicesVector(e,r){e.startVector(4,r,4)}static addNumInputs(e,r){e.addFieldInt32(1,r,0)}static addNumOutputs(e,r){e.addFieldInt32(2,r,0)}static addHasVariadicInput(e,r){e.addFieldInt8(3,+r,0)}static addHasVariadicOutput(e,r){e.addFieldInt8(4,+r,0)}static addNumVariadicInputs(e,r){e.addFieldInt32(5,r,0)}static addNumVariadicOutputs(e,r){e.addFieldInt32(6,r,0)}static endNodesToOptimizeIndices(e){return e.endObject()}static createNodesToOptimizeIndices(e,r,t,o,i,a,s,u){return n.startNodesToOptimizeIndices(e),n.addNodeIndices(e,r),n.addNumInputs(e,t),n.addNumOutputs(e,o),n.addHasVariadicInput(e,i),n.addHasVariadicOutput(e,a),n.addNumVariadicInputs(e,s),n.addNumVariadicOutputs(e,u),n.endNodesToOptimizeIndices(e)}};ar.NodesToOptimizeIndices=ou});var su=ne(sr=>{"use strict";var LI=sr&&sr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),RI=sr&&sr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),zI=sr&&sr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&LI(e,n,r);return RI(e,n),e};Object.defineProperty(sr,"__esModule",{value:!0});sr.RuntimeOptimizationRecord=void 0;var MI=zI(Le()),BI=iu(),au=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizationRecord(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecord(e,r){return e.setPosition(e.position()+MI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}actionId(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}nodesToOptimizeIndices(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new BI.NodesToOptimizeIndices).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}producedOpIds(e,r){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}producedOpIdsLength(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecord(e){e.startObject(4)}static addActionId(e,r){e.addFieldOffset(0,r,0)}static addNodesToOptimizeIndices(e,r){e.addFieldOffset(1,r,0)}static addProducedOpIds(e,r){e.addFieldOffset(3,r,0)}static createProducedOpIdsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startProducedOpIdsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizationRecord(e){return e.endObject()}};sr.RuntimeOptimizationRecord=au});var lu=ne(ur=>{"use strict";var FI=ur&&ur.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),VI=ur&&ur.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),GI=ur&&ur.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&FI(e,n,r);return VI(e,n),e};Object.defineProperty(ur,"__esModule",{value:!0});ur.RuntimeOptimizationRecordContainerEntry=void 0;var UI=GI(Le()),WI=su(),uu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizationRecordContainerEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecordContainerEntry(e,r){return e.setPosition(e.position()+UI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}optimizerName(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}runtimeOptimizationRecords(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new WI.RuntimeOptimizationRecord).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}runtimeOptimizationRecordsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecordContainerEntry(e){e.startObject(2)}static addOptimizerName(e,r){e.addFieldOffset(0,r,0)}static addRuntimeOptimizationRecords(e,r){e.addFieldOffset(1,r,0)}static createRuntimeOptimizationRecordsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startRuntimeOptimizationRecordsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizationRecordContainerEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createRuntimeOptimizationRecordContainerEntry(e,r,t){return n.startRuntimeOptimizationRecordContainerEntry(e),n.addOptimizerName(e,r),n.addRuntimeOptimizationRecords(e,t),n.endRuntimeOptimizationRecordContainerEntry(e)}};ur.RuntimeOptimizationRecordContainerEntry=uu});var du=ne(lr=>{"use strict";var HI=lr&&lr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),qI=lr&&lr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),jI=lr&&lr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&HI(e,n,r);return qI(e,n),e};Object.defineProperty(lr,"__esModule",{value:!0});lr.RuntimeOptimizations=void 0;var KI=jI(Le()),XI=lu(),cu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizations(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizations(e,r){return e.setPosition(e.position()+KI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}records(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new XI.RuntimeOptimizationRecordContainerEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}recordsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizations(e){e.startObject(1)}static addRecords(e,r){e.addFieldOffset(0,r,0)}static createRecordsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startRecordsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizations(e){return e.endObject()}static createRuntimeOptimizations(e,r){return n.startRuntimeOptimizations(e),n.addRecords(e,r),n.endRuntimeOptimizations(e)}};lr.RuntimeOptimizations=cu});var wo=ne(Si=>{"use strict";Object.defineProperty(Si,"__esModule",{value:!0});Si.TensorDataType=void 0;var Vf;(function(n){n[n.UNDEFINED=0]="UNDEFINED",n[n.FLOAT=1]="FLOAT",n[n.UINT8=2]="UINT8",n[n.INT8=3]="INT8",n[n.UINT16=4]="UINT16",n[n.INT16=5]="INT16",n[n.INT32=6]="INT32",n[n.INT64=7]="INT64",n[n.STRING=8]="STRING",n[n.BOOL=9]="BOOL",n[n.FLOAT16=10]="FLOAT16",n[n.DOUBLE=11]="DOUBLE",n[n.UINT32=12]="UINT32",n[n.UINT64=13]="UINT64",n[n.COMPLEX64=14]="COMPLEX64",n[n.COMPLEX128=15]="COMPLEX128",n[n.BFLOAT16=16]="BFLOAT16",n[n.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",n[n.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",n[n.FLOAT8E5M2=19]="FLOAT8E5M2",n[n.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"})(Vf||(Si.TensorDataType=Vf={}))});var xo=ne(cr=>{"use strict";var ZI=cr&&cr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),JI=cr&&cr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),QI=cr&&cr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&ZI(e,n,r);return JI(e,n),e};Object.defineProperty(cr,"__esModule",{value:!0});cr.Tensor=void 0;var YI=QI(Le()),Gf=wo(),pu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTensor(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensor(e,r){return e.setPosition(e.position()+YI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}dims(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}dataType(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):Gf.TensorDataType.UNDEFINED}rawData(e){let r=this.bb.__offset(this.bb_pos,12);return r?this.bb.readUint8(this.bb.__vector(this.bb_pos+r)+e):0}rawDataLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}rawDataArray(){let e=this.bb.__offset(this.bb_pos,12);return e?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}stringData(e,r){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}stringDataLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}externalDataOffset(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt64(this.bb_pos+e):BigInt("-1")}static startTensor(e){e.startObject(7)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addDims(e,r){e.addFieldOffset(2,r,0)}static createDimsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startDimsVector(e,r){e.startVector(8,r,8)}static addDataType(e,r){e.addFieldInt32(3,r,Gf.TensorDataType.UNDEFINED)}static addRawData(e,r){e.addFieldOffset(4,r,0)}static createRawDataVector(e,r){e.startVector(1,r.length,1);for(let t=r.length-1;t>=0;t--)e.addInt8(r[t]);return e.endVector()}static startRawDataVector(e,r){e.startVector(1,r,1)}static addStringData(e,r){e.addFieldOffset(5,r,0)}static createStringDataVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startStringDataVector(e,r){e.startVector(4,r,4)}static addExternalDataOffset(e,r){e.addFieldInt64(6,r,BigInt("-1"))}static endTensor(e){return e.endObject()}static createTensor(e,r,t,o,i,a,s,u){return n.startTensor(e),n.addName(e,r),n.addDocString(e,t),n.addDims(e,o),n.addDataType(e,i),n.addRawData(e,a),n.addStringData(e,s),n.addExternalDataOffset(e,u),n.endTensor(e)}};cr.Tensor=pu});var hu=ne(dr=>{"use strict";var e1=dr&&dr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),t1=dr&&dr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),r1=dr&&dr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&e1(e,n,r);return t1(e,n),e};Object.defineProperty(dr,"__esModule",{value:!0});dr.SparseTensor=void 0;var n1=r1(Le()),Uf=xo(),fu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsSparseTensor(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsSparseTensor(e,r){return e.setPosition(e.position()+n1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}values(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new Uf.Tensor).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}indices(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new Uf.Tensor).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}dims(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startSparseTensor(e){e.startObject(3)}static addValues(e,r){e.addFieldOffset(0,r,0)}static addIndices(e,r){e.addFieldOffset(1,r,0)}static addDims(e,r){e.addFieldOffset(2,r,0)}static createDimsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startDimsVector(e,r){e.startVector(8,r,8)}static endSparseTensor(e){return e.endObject()}};dr.SparseTensor=fu});var gu=ne(pr=>{"use strict";var o1=pr&&pr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),i1=pr&&pr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),a1=pr&&pr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&o1(e,n,r);return i1(e,n),e};Object.defineProperty(pr,"__esModule",{value:!0});pr.MapType=void 0;var s1=a1(Le()),Wf=wo(),u1=To(),mu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsMapType(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsMapType(e,r){return e.setPosition(e.position()+s1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}keyType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):Wf.TensorDataType.UNDEFINED}valueType(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new u1.TypeInfo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startMapType(e){e.startObject(2)}static addKeyType(e,r){e.addFieldInt32(0,r,Wf.TensorDataType.UNDEFINED)}static addValueType(e,r){e.addFieldOffset(1,r,0)}static endMapType(e){return e.endObject()}};pr.MapType=mu});var yu=ne(fr=>{"use strict";var l1=fr&&fr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),c1=fr&&fr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),d1=fr&&fr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&l1(e,n,r);return c1(e,n),e};Object.defineProperty(fr,"__esModule",{value:!0});fr.SequenceType=void 0;var p1=d1(Le()),f1=To(),bu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsSequenceType(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsSequenceType(e,r){return e.setPosition(e.position()+p1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}elemType(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new f1.TypeInfo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startSequenceType(e){e.startObject(1)}static addElemType(e,r){e.addFieldOffset(0,r,0)}static endSequenceType(e){return e.endObject()}static createSequenceType(e,r){return n.startSequenceType(e),n.addElemType(e,r),n.endSequenceType(e)}};fr.SequenceType=bu});var _u=ne($i=>{"use strict";Object.defineProperty($i,"__esModule",{value:!0});$i.DimensionValueType=void 0;var Hf;(function(n){n[n.UNKNOWN=0]="UNKNOWN",n[n.VALUE=1]="VALUE",n[n.PARAM=2]="PARAM"})(Hf||($i.DimensionValueType=Hf={}))});var wu=ne(hr=>{"use strict";var h1=hr&&hr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),m1=hr&&hr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),g1=hr&&hr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&h1(e,n,r);return m1(e,n),e};Object.defineProperty(hr,"__esModule",{value:!0});hr.DimensionValue=void 0;var b1=g1(Le()),qf=_u(),vu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDimensionValue(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimensionValue(e,r){return e.setPosition(e.position()+b1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}dimType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):qf.DimensionValueType.UNKNOWN}dimValue(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}dimParam(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}static startDimensionValue(e){e.startObject(3)}static addDimType(e,r){e.addFieldInt8(0,r,qf.DimensionValueType.UNKNOWN)}static addDimValue(e,r){e.addFieldInt64(1,r,BigInt("0"))}static addDimParam(e,r){e.addFieldOffset(2,r,0)}static endDimensionValue(e){return e.endObject()}static createDimensionValue(e,r,t,o){return n.startDimensionValue(e),n.addDimType(e,r),n.addDimValue(e,t),n.addDimParam(e,o),n.endDimensionValue(e)}};hr.DimensionValue=vu});var Tu=ne(mr=>{"use strict";var y1=mr&&mr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),_1=mr&&mr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),v1=mr&&mr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&y1(e,n,r);return _1(e,n),e};Object.defineProperty(mr,"__esModule",{value:!0});mr.Dimension=void 0;var w1=v1(Le()),x1=wu(),xu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDimension(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimension(e,r){return e.setPosition(e.position()+w1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}value(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new x1.DimensionValue).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}denotation(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}static startDimension(e){e.startObject(2)}static addValue(e,r){e.addFieldOffset(0,r,0)}static addDenotation(e,r){e.addFieldOffset(1,r,0)}static endDimension(e){return e.endObject()}static createDimension(e,r,t){return n.startDimension(e),n.addValue(e,r),n.addDenotation(e,t),n.endDimension(e)}};mr.Dimension=xu});var Su=ne(gr=>{"use strict";var T1=gr&&gr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),I1=gr&&gr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),S1=gr&&gr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&T1(e,n,r);return I1(e,n),e};Object.defineProperty(gr,"__esModule",{value:!0});gr.Shape=void 0;var $1=S1(Le()),A1=Tu(),Iu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsShape(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsShape(e,r){return e.setPosition(e.position()+$1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}dim(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new A1.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}dimLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startShape(e){e.startObject(1)}static addDim(e,r){e.addFieldOffset(0,r,0)}static createDimVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startDimVector(e,r){e.startVector(4,r,4)}static endShape(e){return e.endObject()}static createShape(e,r){return n.startShape(e),n.addDim(e,r),n.endShape(e)}};gr.Shape=Iu});var Au=ne(br=>{"use strict";var O1=br&&br.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),P1=br&&br.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),E1=br&&br.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&O1(e,n,r);return P1(e,n),e};Object.defineProperty(br,"__esModule",{value:!0});br.TensorTypeAndShape=void 0;var C1=E1(Le()),D1=Su(),jf=wo(),$u=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTensorTypeAndShape(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensorTypeAndShape(e,r){return e.setPosition(e.position()+C1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}elemType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):jf.TensorDataType.UNDEFINED}shape(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new D1.Shape).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startTensorTypeAndShape(e){e.startObject(2)}static addElemType(e,r){e.addFieldInt32(0,r,jf.TensorDataType.UNDEFINED)}static addShape(e,r){e.addFieldOffset(1,r,0)}static endTensorTypeAndShape(e){return e.endObject()}};br.TensorTypeAndShape=$u});var Ou=ne(cn=>{"use strict";Object.defineProperty(cn,"__esModule",{value:!0});cn.unionListToTypeInfoValue=cn.unionToTypeInfoValue=cn.TypeInfoValue=void 0;var Kf=gu(),Xf=yu(),Zf=Au(),Ai;(function(n){n[n.NONE=0]="NONE",n[n.tensor_type=1]="tensor_type",n[n.sequence_type=2]="sequence_type",n[n.map_type=3]="map_type"})(Ai||(cn.TypeInfoValue=Ai={}));function k1(n,e){switch(Ai[n]){case"NONE":return null;case"tensor_type":return e(new Zf.TensorTypeAndShape);case"sequence_type":return e(new Xf.SequenceType);case"map_type":return e(new Kf.MapType);default:return null}}cn.unionToTypeInfoValue=k1;function N1(n,e,r){switch(Ai[n]){case"NONE":return null;case"tensor_type":return e(r,new Zf.TensorTypeAndShape);case"sequence_type":return e(r,new Xf.SequenceType);case"map_type":return e(r,new Kf.MapType);default:return null}}cn.unionListToTypeInfoValue=N1});var To=ne(yr=>{"use strict";var L1=yr&&yr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),R1=yr&&yr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),z1=yr&&yr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&L1(e,n,r);return R1(e,n),e};Object.defineProperty(yr,"__esModule",{value:!0});yr.TypeInfo=void 0;var M1=z1(Le()),Jf=Ou(),Pu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTypeInfo(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTypeInfo(e,r){return e.setPosition(e.position()+M1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}denotation(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}valueType(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint8(this.bb_pos+e):Jf.TypeInfoValue.NONE}value(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__union(e,this.bb_pos+r):null}static startTypeInfo(e){e.startObject(3)}static addDenotation(e,r){e.addFieldOffset(0,r,0)}static addValueType(e,r){e.addFieldInt8(1,r,Jf.TypeInfoValue.NONE)}static addValue(e,r){e.addFieldOffset(2,r,0)}static endTypeInfo(e){return e.endObject()}static createTypeInfo(e,r,t,o){return n.startTypeInfo(e),n.addDenotation(e,r),n.addValueType(e,t),n.addValue(e,o),n.endTypeInfo(e)}};yr.TypeInfo=Pu});var Cu=ne(_r=>{"use strict";var B1=_r&&_r.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),F1=_r&&_r.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),V1=_r&&_r.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&B1(e,n,r);return F1(e,n),e};Object.defineProperty(_r,"__esModule",{value:!0});_r.ValueInfo=void 0;var G1=V1(Le()),U1=To(),Eu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsValueInfo(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsValueInfo(e,r){return e.setPosition(e.position()+G1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}type(e){let r=this.bb.__offset(this.bb_pos,8);return r?(e||new U1.TypeInfo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startValueInfo(e){e.startObject(3)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addType(e,r){e.addFieldOffset(2,r,0)}static endValueInfo(e){return e.endObject()}};_r.ValueInfo=Eu});var Oi=ne(vr=>{"use strict";var W1=vr&&vr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),H1=vr&&vr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),q1=vr&&vr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&W1(e,n,r);return H1(e,n),e};Object.defineProperty(vr,"__esModule",{value:!0});vr.Graph=void 0;var j1=q1(Le()),K1=Qs(),X1=nu(),Z1=du(),J1=hu(),Q1=xo(),Y1=Cu(),Du=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsGraph(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsGraph(e,r){return e.setPosition(e.position()+j1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}initializers(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new Q1.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}initializersLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeArgs(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new Y1.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}nodes(e,r){let t=this.bb.__offset(this.bb_pos,8);return t?(r||new K1.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}maxNodeIndex(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readUint32(this.bb_pos+e):0}nodeEdges(e,r){let t=this.bb.__offset(this.bb_pos,12);return t?(r||new X1.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeEdgesLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}inputs(e,r){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,r){let t=this.bb.__offset(this.bb_pos,16);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.__vector_len(this.bb_pos+e):0}sparseInitializers(e,r){let t=this.bb.__offset(this.bb_pos,18);return t?(r||new J1.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}sparseInitializersLength(){let e=this.bb.__offset(this.bb_pos,18);return e?this.bb.__vector_len(this.bb_pos+e):0}runtimeOptimizations(e){let r=this.bb.__offset(this.bb_pos,20);return r?(e||new Z1.RuntimeOptimizations).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startGraph(e){e.startObject(9)}static addInitializers(e,r){e.addFieldOffset(0,r,0)}static createInitializersVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInitializersVector(e,r){e.startVector(4,r,4)}static addNodeArgs(e,r){e.addFieldOffset(1,r,0)}static createNodeArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodeArgsVector(e,r){e.startVector(4,r,4)}static addNodes(e,r){e.addFieldOffset(2,r,0)}static createNodesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodesVector(e,r){e.startVector(4,r,4)}static addMaxNodeIndex(e,r){e.addFieldInt32(3,r,0)}static addNodeEdges(e,r){e.addFieldOffset(4,r,0)}static createNodeEdgesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodeEdgesVector(e,r){e.startVector(4,r,4)}static addInputs(e,r){e.addFieldOffset(5,r,0)}static createInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInputsVector(e,r){e.startVector(4,r,4)}static addOutputs(e,r){e.addFieldOffset(6,r,0)}static createOutputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOutputsVector(e,r){e.startVector(4,r,4)}static addSparseInitializers(e,r){e.addFieldOffset(7,r,0)}static createSparseInitializersVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startSparseInitializersVector(e,r){e.startVector(4,r,4)}static addRuntimeOptimizations(e,r){e.addFieldOffset(8,r,0)}static endGraph(e){return e.endObject()}};vr.Graph=Du});var Ys=ne(wr=>{"use strict";var eS=wr&&wr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),tS=wr&&wr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),rS=wr&&wr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&eS(e,n,r);return tS(e,n),e};Object.defineProperty(wr,"__esModule",{value:!0});wr.Attribute=void 0;var nS=rS(Le()),Qf=Xs(),Yf=Oi(),eh=xo(),ku=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsAttribute(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsAttribute(e,r){return e.setPosition(e.position()+nS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}type(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readInt32(this.bb_pos+e):Qf.AttributeType.UNDEFINED}f(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readFloat32(this.bb_pos+e):0}i(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}s(e){let r=this.bb.__offset(this.bb_pos,14);return r?this.bb.__string(this.bb_pos+r,e):null}t(e){let r=this.bb.__offset(this.bb_pos,16);return r?(e||new eh.Tensor).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}g(e){let r=this.bb.__offset(this.bb_pos,18);return r?(e||new Yf.Graph).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}floats(e){let r=this.bb.__offset(this.bb_pos,20);return r?this.bb.readFloat32(this.bb.__vector(this.bb_pos+r)+e*4):0}floatsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}floatsArray(){let e=this.bb.__offset(this.bb_pos,20);return e?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}ints(e){let r=this.bb.__offset(this.bb_pos,22);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}intsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}strings(e,r){let t=this.bb.__offset(this.bb_pos,24);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}stringsLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}tensors(e,r){let t=this.bb.__offset(this.bb_pos,26);return t?(r||new eh.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}tensorsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}graphs(e,r){let t=this.bb.__offset(this.bb_pos,28);return t?(r||new Yf.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}graphsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startAttribute(e){e.startObject(13)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addType(e,r){e.addFieldInt32(2,r,Qf.AttributeType.UNDEFINED)}static addF(e,r){e.addFieldFloat32(3,r,0)}static addI(e,r){e.addFieldInt64(4,r,BigInt("0"))}static addS(e,r){e.addFieldOffset(5,r,0)}static addT(e,r){e.addFieldOffset(6,r,0)}static addG(e,r){e.addFieldOffset(7,r,0)}static addFloats(e,r){e.addFieldOffset(8,r,0)}static createFloatsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addFloat32(r[t]);return e.endVector()}static startFloatsVector(e,r){e.startVector(4,r,4)}static addInts(e,r){e.addFieldOffset(9,r,0)}static createIntsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startIntsVector(e,r){e.startVector(8,r,8)}static addStrings(e,r){e.addFieldOffset(10,r,0)}static createStringsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startStringsVector(e,r){e.startVector(4,r,4)}static addTensors(e,r){e.addFieldOffset(11,r,0)}static createTensorsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startTensorsVector(e,r){e.startVector(4,r,4)}static addGraphs(e,r){e.addFieldOffset(12,r,0)}static createGraphsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startGraphsVector(e,r){e.startVector(4,r,4)}static endAttribute(e){return e.endObject()}};wr.Attribute=ku});var Lu=ne(xr=>{"use strict";var oS=xr&&xr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),iS=xr&&xr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),aS=xr&&xr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&oS(e,n,r);return iS(e,n),e};Object.defineProperty(xr,"__esModule",{value:!0});xr.DeprecatedKernelCreateInfos=void 0;var sS=aS(Le()),Nu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedKernelCreateInfos(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedKernelCreateInfos(e,r){return e.setPosition(e.position()+sS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndices(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.readUint32(this.bb.__vector(this.bb_pos+r)+e*4):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}kernelDefHashes(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.readUint64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}kernelDefHashesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedKernelCreateInfos(e){e.startObject(2)}static addNodeIndices(e,r){e.addFieldOffset(0,r,0)}static createNodeIndicesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addInt32(r[t]);return e.endVector()}static startNodeIndicesVector(e,r){e.startVector(4,r,4)}static addKernelDefHashes(e,r){e.addFieldOffset(1,r,0)}static createKernelDefHashesVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startKernelDefHashesVector(e,r){e.startVector(8,r,8)}static endDeprecatedKernelCreateInfos(e){return e.endObject()}static createDeprecatedKernelCreateInfos(e,r,t){return n.startDeprecatedKernelCreateInfos(e),n.addNodeIndices(e,r),n.addKernelDefHashes(e,t),n.endDeprecatedKernelCreateInfos(e)}};xr.DeprecatedKernelCreateInfos=Nu});var th=ne(Tr=>{"use strict";var uS=Tr&&Tr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),lS=Tr&&Tr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),cS=Tr&&Tr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&uS(e,n,r);return lS(e,n),e};Object.defineProperty(Tr,"__esModule",{value:!0});Tr.DeprecatedNodeIndexAndKernelDefHash=void 0;var dS=cS(Le()),Ru=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedNodeIndexAndKernelDefHash(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedNodeIndexAndKernelDefHash(e,r){return e.setPosition(e.position()+dS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}kernelDefHash(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint64(this.bb_pos+e):BigInt("0")}static startDeprecatedNodeIndexAndKernelDefHash(e){e.startObject(2)}static addNodeIndex(e,r){e.addFieldInt32(0,r,0)}static addKernelDefHash(e,r){e.addFieldInt64(1,r,BigInt("0"))}static endDeprecatedNodeIndexAndKernelDefHash(e){return e.endObject()}static createDeprecatedNodeIndexAndKernelDefHash(e,r,t){return n.startDeprecatedNodeIndexAndKernelDefHash(e),n.addNodeIndex(e,r),n.addKernelDefHash(e,t),n.endDeprecatedNodeIndexAndKernelDefHash(e)}};Tr.DeprecatedNodeIndexAndKernelDefHash=Ru});var Mu=ne(Ir=>{"use strict";var pS=Ir&&Ir.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),fS=Ir&&Ir.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),hS=Ir&&Ir.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&pS(e,n,r);return fS(e,n),e};Object.defineProperty(Ir,"__esModule",{value:!0});Ir.DeprecatedSubGraphSessionState=void 0;var mS=hS(Le()),gS=Bu(),zu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedSubGraphSessionState(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedSubGraphSessionState(e,r){return e.setPosition(e.position()+mS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}graphId(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}sessionState(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new gS.DeprecatedSessionState).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startDeprecatedSubGraphSessionState(e){e.startObject(2)}static addGraphId(e,r){e.addFieldOffset(0,r,0)}static addSessionState(e,r){e.addFieldOffset(1,r,0)}static endDeprecatedSubGraphSessionState(e){let r=e.endObject();return e.requiredField(r,4),r}};Ir.DeprecatedSubGraphSessionState=zu});var Bu=ne(Sr=>{"use strict";var bS=Sr&&Sr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),yS=Sr&&Sr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),_S=Sr&&Sr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&bS(e,n,r);return yS(e,n),e};Object.defineProperty(Sr,"__esModule",{value:!0});Sr.DeprecatedSessionState=void 0;var vS=_S(Le()),wS=Lu(),xS=Mu(),Fu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedSessionState(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedSessionState(e,r){return e.setPosition(e.position()+vS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}kernels(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new wS.DeprecatedKernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}subGraphSessionStates(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new xS.DeprecatedSubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}subGraphSessionStatesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedSessionState(e){e.startObject(2)}static addKernels(e,r){e.addFieldOffset(0,r,0)}static addSubGraphSessionStates(e,r){e.addFieldOffset(1,r,0)}static createSubGraphSessionStatesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startSubGraphSessionStatesVector(e,r){e.startVector(4,r,4)}static endDeprecatedSessionState(e){return e.endObject()}static createDeprecatedSessionState(e,r,t){return n.startDeprecatedSessionState(e),n.addKernels(e,r),n.addSubGraphSessionStates(e,t),n.endDeprecatedSessionState(e)}};Sr.DeprecatedSessionState=Fu});var Gu=ne($r=>{"use strict";var TS=$r&&$r.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),IS=$r&&$r.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),SS=$r&&$r.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&TS(e,n,r);return IS(e,n),e};Object.defineProperty($r,"__esModule",{value:!0});$r.KernelTypeStrArgsEntry=void 0;var $S=SS(Le()),AS=Ks(),Vu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsKernelTypeStrArgsEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrArgsEntry(e,r){return e.setPosition(e.position()+$S.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}kernelTypeStr(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}args(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new AS.ArgTypeAndIndex).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}argsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrArgsEntry(e){e.startObject(2)}static addKernelTypeStr(e,r){e.addFieldOffset(0,r,0)}static addArgs(e,r){e.addFieldOffset(1,r,0)}static createArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startArgsVector(e,r){e.startVector(4,r,4)}static endKernelTypeStrArgsEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createKernelTypeStrArgsEntry(e,r,t){return n.startKernelTypeStrArgsEntry(e),n.addKernelTypeStr(e,r),n.addArgs(e,t),n.endKernelTypeStrArgsEntry(e)}};$r.KernelTypeStrArgsEntry=Vu});var Wu=ne(Ar=>{"use strict";var OS=Ar&&Ar.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),PS=Ar&&Ar.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),ES=Ar&&Ar.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&OS(e,n,r);return PS(e,n),e};Object.defineProperty(Ar,"__esModule",{value:!0});Ar.OpIdKernelTypeStrArgsEntry=void 0;var CS=ES(Le()),DS=Gu(),Uu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsOpIdKernelTypeStrArgsEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOpIdKernelTypeStrArgsEntry(e,r){return e.setPosition(e.position()+CS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}opId(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}kernelTypeStrArgs(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new DS.KernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}kernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startOpIdKernelTypeStrArgsEntry(e){e.startObject(2)}static addOpId(e,r){e.addFieldOffset(0,r,0)}static addKernelTypeStrArgs(e,r){e.addFieldOffset(1,r,0)}static createKernelTypeStrArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startKernelTypeStrArgsVector(e,r){e.startVector(4,r,4)}static endOpIdKernelTypeStrArgsEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createOpIdKernelTypeStrArgsEntry(e,r,t){return n.startOpIdKernelTypeStrArgsEntry(e),n.addOpId(e,r),n.addKernelTypeStrArgs(e,t),n.endOpIdKernelTypeStrArgsEntry(e)}};Ar.OpIdKernelTypeStrArgsEntry=Uu});var qu=ne(Or=>{"use strict";var kS=Or&&Or.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),NS=Or&&Or.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),LS=Or&&Or.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&kS(e,n,r);return NS(e,n),e};Object.defineProperty(Or,"__esModule",{value:!0});Or.KernelTypeStrResolver=void 0;var RS=LS(Le()),zS=Wu(),Hu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsKernelTypeStrResolver(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrResolver(e,r){return e.setPosition(e.position()+RS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}opKernelTypeStrArgs(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new zS.OpIdKernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opKernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrResolver(e){e.startObject(1)}static addOpKernelTypeStrArgs(e,r){e.addFieldOffset(0,r,0)}static createOpKernelTypeStrArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOpKernelTypeStrArgsVector(e,r){e.startVector(4,r,4)}static endKernelTypeStrResolver(e){return e.endObject()}static createKernelTypeStrResolver(e,r){return n.startKernelTypeStrResolver(e),n.addOpKernelTypeStrArgs(e,r),n.endKernelTypeStrResolver(e)}};Or.KernelTypeStrResolver=Hu});var Ku=ne(Pr=>{"use strict";var MS=Pr&&Pr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),BS=Pr&&Pr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),FS=Pr&&Pr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&MS(e,n,r);return BS(e,n),e};Object.defineProperty(Pr,"__esModule",{value:!0});Pr.OperatorSetId=void 0;var VS=FS(Le()),ju=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsOperatorSetId(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOperatorSetId(e,r){return e.setPosition(e.position()+VS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}domain(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}version(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}static startOperatorSetId(e){e.startObject(2)}static addDomain(e,r){e.addFieldOffset(0,r,0)}static addVersion(e,r){e.addFieldInt64(1,r,BigInt("0"))}static endOperatorSetId(e){return e.endObject()}static createOperatorSetId(e,r,t){return n.startOperatorSetId(e),n.addDomain(e,r),n.addVersion(e,t),n.endOperatorSetId(e)}};Pr.OperatorSetId=ju});var Zu=ne(Er=>{"use strict";var GS=Er&&Er.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),US=Er&&Er.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),WS=Er&&Er.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&GS(e,n,r);return US(e,n),e};Object.defineProperty(Er,"__esModule",{value:!0});Er.StringStringEntry=void 0;var HS=WS(Le()),Xu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsStringStringEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsStringStringEntry(e,r){return e.setPosition(e.position()+HS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}key(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}value(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}static startStringStringEntry(e){e.startObject(2)}static addKey(e,r){e.addFieldOffset(0,r,0)}static addValue(e,r){e.addFieldOffset(1,r,0)}static endStringStringEntry(e){return e.endObject()}static createStringStringEntry(e,r,t){return n.startStringStringEntry(e),n.addKey(e,r),n.addValue(e,t),n.endStringStringEntry(e)}};Er.StringStringEntry=Xu});var Qu=ne(Cr=>{"use strict";var qS=Cr&&Cr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),jS=Cr&&Cr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),KS=Cr&&Cr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&qS(e,n,r);return jS(e,n),e};Object.defineProperty(Cr,"__esModule",{value:!0});Cr.Model=void 0;var XS=KS(Le()),ZS=Oi(),JS=Ku(),QS=Zu(),Ju=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsModel(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsModel(e,r){return e.setPosition(e.position()+XS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}irVersion(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}opsetImport(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new JS.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opsetImportLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}producerName(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}producerVersion(e){let r=this.bb.__offset(this.bb_pos,10);return r?this.bb.__string(this.bb_pos+r,e):null}domain(e){let r=this.bb.__offset(this.bb_pos,12);return r?this.bb.__string(this.bb_pos+r,e):null}modelVersion(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}docString(e){let r=this.bb.__offset(this.bb_pos,16);return r?this.bb.__string(this.bb_pos+r,e):null}graph(e){let r=this.bb.__offset(this.bb_pos,18);return r?(e||new ZS.Graph).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}graphDocString(e){let r=this.bb.__offset(this.bb_pos,20);return r?this.bb.__string(this.bb_pos+r,e):null}metadataProps(e,r){let t=this.bb.__offset(this.bb_pos,22);return t?(r||new QS.StringStringEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}metadataPropsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}static startModel(e){e.startObject(10)}static addIrVersion(e,r){e.addFieldInt64(0,r,BigInt("0"))}static addOpsetImport(e,r){e.addFieldOffset(1,r,0)}static createOpsetImportVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOpsetImportVector(e,r){e.startVector(4,r,4)}static addProducerName(e,r){e.addFieldOffset(2,r,0)}static addProducerVersion(e,r){e.addFieldOffset(3,r,0)}static addDomain(e,r){e.addFieldOffset(4,r,0)}static addModelVersion(e,r){e.addFieldInt64(5,r,BigInt("0"))}static addDocString(e,r){e.addFieldOffset(6,r,0)}static addGraph(e,r){e.addFieldOffset(7,r,0)}static addGraphDocString(e,r){e.addFieldOffset(8,r,0)}static addMetadataProps(e,r){e.addFieldOffset(9,r,0)}static createMetadataPropsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startMetadataPropsVector(e,r){e.startVector(4,r,4)}static endModel(e){return e.endObject()}};Cr.Model=Ju});var rh=ne(Dr=>{"use strict";var YS=Dr&&Dr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),e$=Dr&&Dr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),t$=Dr&&Dr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&YS(e,n,r);return e$(e,n),e};Object.defineProperty(Dr,"__esModule",{value:!0});Dr.InferenceSession=void 0;var r$=t$(Le()),n$=qu(),o$=Qu(),Yu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsInferenceSession(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsInferenceSession(e,r){return e.setPosition(e.position()+r$.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static bufferHasIdentifier(e){return e.__has_identifier("ORTM")}ortVersion(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}model(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new o$.Model).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}kernelTypeStrResolver(e){let r=this.bb.__offset(this.bb_pos,10);return r?(e||new n$.KernelTypeStrResolver).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startInferenceSession(e){e.startObject(4)}static addOrtVersion(e,r){e.addFieldOffset(0,r,0)}static addModel(e,r){e.addFieldOffset(1,r,0)}static addKernelTypeStrResolver(e,r){e.addFieldOffset(3,r,0)}static endInferenceSession(e){return e.endObject()}static finishInferenceSessionBuffer(e,r){e.finish(r,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(e,r){e.finish(r,"ORTM",!0)}};Dr.InferenceSession=Yu});var i$,a$,Pi,Nt,s$,u$,l$,c$,d$,p$,f$,h$,el,tl,m$,g$,b$,y$,rl,_$,v$,w$,x$,T$,I$,S$,$$,A$,O$,P$,E$,C$,Io,nl,D$,ol,k$,nh=N(()=>{"use strict";i$=ye(Vs()),a$=ye(Ks()),Pi=ye(Ys()),Nt=ye(Xs()),s$=ye(Lu()),u$=ye(th()),l$=ye(Bu()),c$=ye(Mu()),d$=ye(Tu()),p$=ye(wu()),f$=ye(_u()),h$=ye(tu()),el=ye(Oi()),tl=ye(rh()),m$=ye(Gu()),g$=ye(qu()),b$=ye(gu()),y$=ye(Qu()),rl=ye(Qs()),_$=ye(nu()),v$=ye(Zs()),w$=ye(iu()),x$=ye(Wu()),T$=ye(Ku()),I$=ye(su()),S$=ye(lu()),$$=ye(du()),A$=ye(yu()),O$=ye(Su()),P$=ye(hu()),E$=ye(Zu()),C$=ye(xo()),Io=ye(wo()),nl=ye(Au()),D$=ye(To()),ol=ye(Ou()),k$=ye(Cu())});var So=N(()=>{"use strict";nh()});var ih=ne((l4,oh)=>{"use strict";oh.exports=N$;function N$(n,e){for(var r=new Array(arguments.length-1),t=0,o=2,i=!0;o<arguments.length;)r[t++]=arguments[o++];return new Promise(function(s,u){r[t]=function(c){if(i)if(i=!1,c)u(c);else{for(var p=new Array(arguments.length-1),h=0;h<p.length;)p[h++]=arguments[h];s.apply(null,p)}};try{n.apply(e||null,r)}catch(l){i&&(i=!1,u(l))}})}});var lh=ne(uh=>{"use strict";var Ci=uh;Ci.length=function(e){var r=e.length;if(!r)return 0;for(var t=0;--r%4>1&&e.charAt(r)==="=";)++t;return Math.ceil(e.length*3)/4-t};var Jn=new Array(64),sh=new Array(123);for(Wt=0;Wt<64;)sh[Jn[Wt]=Wt<26?Wt+65:Wt<52?Wt+71:Wt<62?Wt-4:Wt-59|43]=Wt++;var Wt;Ci.encode=function(e,r,t){for(var o=null,i=[],a=0,s=0,u;r<t;){var l=e[r++];switch(s){case 0:i[a++]=Jn[l>>2],u=(l&3)<<4,s=1;break;case 1:i[a++]=Jn[u|l>>4],u=(l&15)<<2,s=2;break;case 2:i[a++]=Jn[u|l>>6],i[a++]=Jn[l&63],s=0;break}a>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,i)),a=0)}return s&&(i[a++]=Jn[u],i[a++]=61,s===1&&(i[a++]=61)),o?(a&&o.push(String.fromCharCode.apply(String,i.slice(0,a))),o.join("")):String.fromCharCode.apply(String,i.slice(0,a))};var ah="invalid encoding";Ci.decode=function(e,r,t){for(var o=t,i=0,a,s=0;s<e.length;){var u=e.charCodeAt(s++);if(u===61&&i>1)break;if((u=sh[u])===void 0)throw Error(ah);switch(i){case 0:a=u,i=1;break;case 1:r[t++]=a<<2|(u&48)>>4,a=u,i=2;break;case 2:r[t++]=(a&15)<<4|(u&60)>>2,a=u,i=3;break;case 3:r[t++]=(a&3)<<6|u,i=0;break}}if(i===1)throw Error(ah);return t-o};Ci.test=function(e){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)}});var dh=ne((d4,ch)=>{"use strict";ch.exports=Di;function Di(){this._listeners={}}Di.prototype.on=function(e,r,t){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:r,ctx:t||this}),this};Di.prototype.off=function(e,r){if(e===void 0)this._listeners={};else if(r===void 0)this._listeners[e]=[];else for(var t=this._listeners[e],o=0;o<t.length;)t[o].fn===r?t.splice(o,1):++o;return this};Di.prototype.emit=function(e){var r=this._listeners[e];if(r){for(var t=[],o=1;o<arguments.length;)t.push(arguments[o++]);for(o=0;o<r.length;)r[o].fn.apply(r[o++].ctx,t)}return this}});var yh=ne((p4,bh)=>{"use strict";bh.exports=ph(ph);function ph(n){return typeof Float32Array<"u"?function(){var e=new Float32Array([-0]),r=new Uint8Array(e.buffer),t=r[3]===128;function o(u,l,c){e[0]=u,l[c]=r[0],l[c+1]=r[1],l[c+2]=r[2],l[c+3]=r[3]}function i(u,l,c){e[0]=u,l[c]=r[3],l[c+1]=r[2],l[c+2]=r[1],l[c+3]=r[0]}n.writeFloatLE=t?o:i,n.writeFloatBE=t?i:o;function a(u,l){return r[0]=u[l],r[1]=u[l+1],r[2]=u[l+2],r[3]=u[l+3],e[0]}function s(u,l){return r[3]=u[l],r[2]=u[l+1],r[1]=u[l+2],r[0]=u[l+3],e[0]}n.readFloatLE=t?a:s,n.readFloatBE=t?s:a}():function(){function e(t,o,i,a){var s=o<0?1:0;if(s&&(o=-o),o===0)t(1/o>0?0:2147483648,i,a);else if(isNaN(o))t(2143289344,i,a);else if(o>34028234663852886e22)t((s<<31|2139095040)>>>0,i,a);else if(o<11754943508222875e-54)t((s<<31|Math.round(o/1401298464324817e-60))>>>0,i,a);else{var u=Math.floor(Math.log(o)/Math.LN2),l=Math.round(o*Math.pow(2,-u)*8388608)&8388607;t((s<<31|u+127<<23|l)>>>0,i,a)}}n.writeFloatLE=e.bind(null,fh),n.writeFloatBE=e.bind(null,hh);function r(t,o,i){var a=t(o,i),s=(a>>31)*2+1,u=a>>>23&255,l=a&8388607;return u===255?l?NaN:s*(1/0):u===0?s*1401298464324817e-60*l:s*Math.pow(2,u-150)*(l+8388608)}n.readFloatLE=r.bind(null,mh),n.readFloatBE=r.bind(null,gh)}(),typeof Float64Array<"u"?function(){var e=new Float64Array([-0]),r=new Uint8Array(e.buffer),t=r[7]===128;function o(u,l,c){e[0]=u,l[c]=r[0],l[c+1]=r[1],l[c+2]=r[2],l[c+3]=r[3],l[c+4]=r[4],l[c+5]=r[5],l[c+6]=r[6],l[c+7]=r[7]}function i(u,l,c){e[0]=u,l[c]=r[7],l[c+1]=r[6],l[c+2]=r[5],l[c+3]=r[4],l[c+4]=r[3],l[c+5]=r[2],l[c+6]=r[1],l[c+7]=r[0]}n.writeDoubleLE=t?o:i,n.writeDoubleBE=t?i:o;function a(u,l){return r[0]=u[l],r[1]=u[l+1],r[2]=u[l+2],r[3]=u[l+3],r[4]=u[l+4],r[5]=u[l+5],r[6]=u[l+6],r[7]=u[l+7],e[0]}function s(u,l){return r[7]=u[l],r[6]=u[l+1],r[5]=u[l+2],r[4]=u[l+3],r[3]=u[l+4],r[2]=u[l+5],r[1]=u[l+6],r[0]=u[l+7],e[0]}n.readDoubleLE=t?a:s,n.readDoubleBE=t?s:a}():function(){function e(t,o,i,a,s,u){var l=a<0?1:0;if(l&&(a=-a),a===0)t(0,s,u+o),t(1/a>0?0:2147483648,s,u+i);else if(isNaN(a))t(0,s,u+o),t(2146959360,s,u+i);else if(a>17976931348623157e292)t(0,s,u+o),t((l<<31|2146435072)>>>0,s,u+i);else{var c;if(a<22250738585072014e-324)c=a/5e-324,t(c>>>0,s,u+o),t((l<<31|c/4294967296)>>>0,s,u+i);else{var p=Math.floor(Math.log(a)/Math.LN2);p===1024&&(p=1023),c=a*Math.pow(2,-p),t(c*4503599627370496>>>0,s,u+o),t((l<<31|p+1023<<20|c*1048576&1048575)>>>0,s,u+i)}}}n.writeDoubleLE=e.bind(null,fh,0,4),n.writeDoubleBE=e.bind(null,hh,4,0);function r(t,o,i,a,s){var u=t(a,s+o),l=t(a,s+i),c=(l>>31)*2+1,p=l>>>20&2047,h=4294967296*(l&1048575)+u;return p===2047?h?NaN:c*(1/0):p===0?c*5e-324*h:c*Math.pow(2,p-1075)*(h+4503599627370496)}n.readDoubleLE=r.bind(null,mh,0,4),n.readDoubleBE=r.bind(null,gh,4,0)}(),n}function fh(n,e,r){e[r]=n&255,e[r+1]=n>>>8&255,e[r+2]=n>>>16&255,e[r+3]=n>>>24}function hh(n,e,r){e[r]=n>>>24,e[r+1]=n>>>16&255,e[r+2]=n>>>8&255,e[r+3]=n&255}function mh(n,e){return(n[e]|n[e+1]<<8|n[e+2]<<16|n[e+3]<<24)>>>0}function gh(n,e){return(n[e]<<24|n[e+1]<<16|n[e+2]<<8|n[e+3])>>>0}});var _h=ne((exports,module)=>{"use strict";module.exports=inquire;function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(n){}return null}});var wh=ne(vh=>{"use strict";var il=vh;il.length=function(e){for(var r=0,t=0,o=0;o<e.length;++o)t=e.charCodeAt(o),t<128?r+=1:t<2048?r+=2:(t&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320?(++o,r+=4):r+=3;return r};il.read=function(e,r,t){var o=t-r;if(o<1)return"";for(var i=null,a=[],s=0,u;r<t;)u=e[r++],u<128?a[s++]=u:u>191&&u<224?a[s++]=(u&31)<<6|e[r++]&63:u>239&&u<365?(u=((u&7)<<18|(e[r++]&63)<<12|(e[r++]&63)<<6|e[r++]&63)-65536,a[s++]=55296+(u>>10),a[s++]=56320+(u&1023)):a[s++]=(u&15)<<12|(e[r++]&63)<<6|e[r++]&63,s>8191&&((i||(i=[])).push(String.fromCharCode.apply(String,a)),s=0);return i?(s&&i.push(String.fromCharCode.apply(String,a.slice(0,s))),i.join("")):String.fromCharCode.apply(String,a.slice(0,s))};il.write=function(e,r,t){for(var o=t,i,a,s=0;s<e.length;++s)i=e.charCodeAt(s),i<128?r[t++]=i:i<2048?(r[t++]=i>>6|192,r[t++]=i&63|128):(i&64512)===55296&&((a=e.charCodeAt(s+1))&64512)===56320?(i=65536+((i&1023)<<10)+(a&1023),++s,r[t++]=i>>18|240,r[t++]=i>>12&63|128,r[t++]=i>>6&63|128,r[t++]=i&63|128):(r[t++]=i>>12|224,r[t++]=i>>6&63|128,r[t++]=i&63|128);return t-o}});var Th=ne((h4,xh)=>{"use strict";xh.exports=L$;function L$(n,e,r){var t=r||8192,o=t>>>1,i=null,a=t;return function(u){if(u<1||u>o)return n(u);a+u>t&&(i=n(t),a=0);var l=e.call(i,a,a+=u);return a&7&&(a=(a|7)+1),l}}});var Sh=ne((m4,Ih)=>{"use strict";Ih.exports=lt;var $o=pn();function lt(n,e){this.lo=n>>>0,this.hi=e>>>0}var Pn=lt.zero=new lt(0,0);Pn.toNumber=function(){return 0};Pn.zzEncode=Pn.zzDecode=function(){return this};Pn.length=function(){return 1};var R$=lt.zeroHash="\0\0\0\0\0\0\0\0";lt.fromNumber=function(e){if(e===0)return Pn;var r=e<0;r&&(e=-e);var t=e>>>0,o=(e-t)/4294967296>>>0;return r&&(o=~o>>>0,t=~t>>>0,++t>4294967295&&(t=0,++o>4294967295&&(o=0))),new lt(t,o)};lt.from=function(e){if(typeof e=="number")return lt.fromNumber(e);if($o.isString(e))if($o.Long)e=$o.Long.fromString(e);else return lt.fromNumber(parseInt(e,10));return e.low||e.high?new lt(e.low>>>0,e.high>>>0):Pn};lt.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var r=~this.lo+1>>>0,t=~this.hi>>>0;return r||(t=t+1>>>0),-(r+t*4294967296)}return this.lo+this.hi*4294967296};lt.prototype.toLong=function(e){return $o.Long?new $o.Long(this.lo|0,this.hi|0,!!e):{low:this.lo|0,high:this.hi|0,unsigned:!!e}};var dn=String.prototype.charCodeAt;lt.fromHash=function(e){return e===R$?Pn:new lt((dn.call(e,0)|dn.call(e,1)<<8|dn.call(e,2)<<16|dn.call(e,3)<<24)>>>0,(dn.call(e,4)|dn.call(e,5)<<8|dn.call(e,6)<<16|dn.call(e,7)<<24)>>>0)};lt.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)};lt.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this};lt.prototype.zzDecode=function(){var e=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this};lt.prototype.length=function(){var e=this.lo,r=(this.lo>>>28|this.hi<<4)>>>0,t=this.hi>>>24;return t===0?r===0?e<16384?e<128?1:2:e<2097152?3:4:r<16384?r<128?5:6:r<2097152?7:8:t<128?9:10}});var pn=ne(al=>{"use strict";var ae=al;ae.asPromise=ih();ae.base64=lh();ae.EventEmitter=dh();ae.float=yh();ae.inquire=_h();ae.utf8=wh();ae.pool=Th();ae.LongBits=Sh();ae.isNode=!!(typeof global<"u"&&global&&global.process&&global.process.versions&&global.process.versions.node);ae.global=ae.isNode&&global||typeof window<"u"&&window||typeof self<"u"&&self||al;ae.emptyArray=Object.freeze?Object.freeze([]):[];ae.emptyObject=Object.freeze?Object.freeze({}):{};ae.isInteger=Number.isInteger||function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e};ae.isString=function(e){return typeof e=="string"||e instanceof String};ae.isObject=function(e){return e&&typeof e=="object"};ae.isset=ae.isSet=function(e,r){var t=e[r];return t!=null&&e.hasOwnProperty(r)?typeof t!="object"||(Array.isArray(t)?t.length:Object.keys(t).length)>0:!1};ae.Buffer=function(){try{var n=ae.inquire("buffer").Buffer;return n.prototype.utf8Write?n:null}catch{return null}}();ae._Buffer_from=null;ae._Buffer_allocUnsafe=null;ae.newBuffer=function(e){return typeof e=="number"?ae.Buffer?ae._Buffer_allocUnsafe(e):new ae.Array(e):ae.Buffer?ae._Buffer_from(e):typeof Uint8Array>"u"?e:new Uint8Array(e)};ae.Array=typeof Uint8Array<"u"?Uint8Array:Array;ae.Long=ae.global.dcodeIO&&ae.global.dcodeIO.Long||ae.global.Long||ae.inquire("long");ae.key2Re=/^true|false|0|1$/;ae.key32Re=/^-?(?:0|[1-9][0-9]*)$/;ae.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;ae.longToHash=function(e){return e?ae.LongBits.from(e).toHash():ae.LongBits.zeroHash};ae.longFromHash=function(e,r){var t=ae.LongBits.fromHash(e);return ae.Long?ae.Long.fromBits(t.lo,t.hi,r):t.toNumber(!!r)};function $h(n,e,r){for(var t=Object.keys(e),o=0;o<t.length;++o)(n[t[o]]===void 0||!r)&&(n[t[o]]=e[t[o]]);return n}ae.merge=$h;ae.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)};function Ah(n){function e(r,t){if(!(this instanceof e))return new e(r,t);Object.defineProperty(this,"message",{get:function(){return r}}),Error.captureStackTrace?Error.captureStackTrace(this,e):Object.defineProperty(this,"stack",{value:new Error().stack||""}),t&&$h(this,t)}return e.prototype=Object.create(Error.prototype,{constructor:{value:e,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return n},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),e}ae.newError=Ah;ae.ProtocolError=Ah("ProtocolError");ae.oneOfGetter=function(e){for(var r={},t=0;t<e.length;++t)r[e[t]]=1;return function(){for(var o=Object.keys(this),i=o.length-1;i>-1;--i)if(r[o[i]]===1&&this[o[i]]!==void 0&&this[o[i]]!==null)return o[i]}};ae.oneOfSetter=function(e){return function(r){for(var t=0;t<e.length;++t)e[t]!==r&&delete this[e[t]]}};ae.toJSONOptions={longs:String,enums:String,bytes:String,json:!0};ae._configure=function(){var n=ae.Buffer;if(!n){ae._Buffer_from=ae._Buffer_allocUnsafe=null;return}ae._Buffer_from=n.from!==Uint8Array.from&&n.from||function(r,t){return new n(r,t)},ae._Buffer_allocUnsafe=n.allocUnsafe||function(r){return new n(r)}}});var fl=ne((b4,Ch)=>{"use strict";Ch.exports=Ee;var Lt=pn(),sl,ki=Lt.LongBits,Oh=Lt.base64,Ph=Lt.utf8;function Ao(n,e,r){this.fn=n,this.len=e,this.next=void 0,this.val=r}function ll(){}function z$(n){this.head=n.head,this.tail=n.tail,this.len=n.len,this.next=n.states}function Ee(){this.len=0,this.head=new Ao(ll,0,0),this.tail=this.head,this.states=null}var Eh=function(){return Lt.Buffer?function(){return(Ee.create=function(){return new sl})()}:function(){return new Ee}};Ee.create=Eh();Ee.alloc=function(e){return new Lt.Array(e)};Lt.Array!==Array&&(Ee.alloc=Lt.pool(Ee.alloc,Lt.Array.prototype.subarray));Ee.prototype._push=function(e,r,t){return this.tail=this.tail.next=new Ao(e,r,t),this.len+=r,this};function cl(n,e,r){e[r]=n&255}function M$(n,e,r){for(;n>127;)e[r++]=n&127|128,n>>>=7;e[r]=n}function dl(n,e){this.len=n,this.next=void 0,this.val=e}dl.prototype=Object.create(Ao.prototype);dl.prototype.fn=M$;Ee.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new dl((e=e>>>0)<128?1:e<16384?2:e<2097152?3:e<268435456?4:5,e)).len,this};Ee.prototype.int32=function(e){return e<0?this._push(pl,10,ki.fromNumber(e)):this.uint32(e)};Ee.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)};function pl(n,e,r){for(;n.hi;)e[r++]=n.lo&127|128,n.lo=(n.lo>>>7|n.hi<<25)>>>0,n.hi>>>=7;for(;n.lo>127;)e[r++]=n.lo&127|128,n.lo=n.lo>>>7;e[r++]=n.lo}Ee.prototype.uint64=function(e){var r=ki.from(e);return this._push(pl,r.length(),r)};Ee.prototype.int64=Ee.prototype.uint64;Ee.prototype.sint64=function(e){var r=ki.from(e).zzEncode();return this._push(pl,r.length(),r)};Ee.prototype.bool=function(e){return this._push(cl,1,e?1:0)};function ul(n,e,r){e[r]=n&255,e[r+1]=n>>>8&255,e[r+2]=n>>>16&255,e[r+3]=n>>>24}Ee.prototype.fixed32=function(e){return this._push(ul,4,e>>>0)};Ee.prototype.sfixed32=Ee.prototype.fixed32;Ee.prototype.fixed64=function(e){var r=ki.from(e);return this._push(ul,4,r.lo)._push(ul,4,r.hi)};Ee.prototype.sfixed64=Ee.prototype.fixed64;Ee.prototype.float=function(e){return this._push(Lt.float.writeFloatLE,4,e)};Ee.prototype.double=function(e){return this._push(Lt.float.writeDoubleLE,8,e)};var B$=Lt.Array.prototype.set?function(e,r,t){r.set(e,t)}:function(e,r,t){for(var o=0;o<e.length;++o)r[t+o]=e[o]};Ee.prototype.bytes=function(e){var r=e.length>>>0;if(!r)return this._push(cl,1,0);if(Lt.isString(e)){var t=Ee.alloc(r=Oh.length(e));Oh.decode(e,t,0),e=t}return this.uint32(r)._push(B$,r,e)};Ee.prototype.string=function(e){var r=Ph.length(e);return r?this.uint32(r)._push(Ph.write,r,e):this._push(cl,1,0)};Ee.prototype.fork=function(){return this.states=new z$(this),this.head=this.tail=new Ao(ll,0,0),this.len=0,this};Ee.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new Ao(ll,0,0),this.len=0),this};Ee.prototype.ldelim=function(){var e=this.head,r=this.tail,t=this.len;return this.reset().uint32(t),t&&(this.tail.next=e.next,this.tail=r,this.len+=t),this};Ee.prototype.finish=function(){for(var e=this.head.next,r=this.constructor.alloc(this.len),t=0;e;)e.fn(e.val,r,t),t+=e.len,e=e.next;return r};Ee._configure=function(n){sl=n,Ee.create=Eh(),sl._configure()}});var Nh=ne((y4,kh)=>{"use strict";kh.exports=kr;var Dh=fl();(kr.prototype=Object.create(Dh.prototype)).constructor=kr;var fn=pn();function kr(){Dh.call(this)}kr._configure=function(){kr.alloc=fn._Buffer_allocUnsafe,kr.writeBytesBuffer=fn.Buffer&&fn.Buffer.prototype instanceof Uint8Array&&fn.Buffer.prototype.set.name==="set"?function(e,r,t){r.set(e,t)}:function(e,r,t){if(e.copy)e.copy(r,t,0,e.length);else for(var o=0;o<e.length;)r[t++]=e[o++]}};kr.prototype.bytes=function(e){fn.isString(e)&&(e=fn._Buffer_from(e,"base64"));var r=e.length>>>0;return this.uint32(r),r&&this._push(kr.writeBytesBuffer,r,e),this};function F$(n,e,r){n.length<40?fn.utf8.write(n,e,r):e.utf8Write?e.utf8Write(n,r):e.write(n,r)}kr.prototype.string=function(e){var r=fn.Buffer.byteLength(e);return this.uint32(r),r&&this._push(F$,r,e),this};kr._configure()});var gl=ne((_4,Bh)=>{"use strict";Bh.exports=et;var Ht=pn(),ml,zh=Ht.LongBits,V$=Ht.utf8;function qt(n,e){return RangeError("index out of range: "+n.pos+" + "+(e||1)+" > "+n.len)}function et(n){this.buf=n,this.pos=0,this.len=n.length}var Lh=typeof Uint8Array<"u"?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new et(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new et(e);throw Error("illegal buffer")},Mh=function(){return Ht.Buffer?function(r){return(et.create=function(o){return Ht.Buffer.isBuffer(o)?new ml(o):Lh(o)})(r)}:Lh};et.create=Mh();et.prototype._slice=Ht.Array.prototype.subarray||Ht.Array.prototype.slice;et.prototype.uint32=function(){var e=4294967295;return function(){if(e=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(e=(e|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return e;if((this.pos+=5)>this.len)throw this.pos=this.len,qt(this,10);return e}}();et.prototype.int32=function(){return this.uint32()|0};et.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(e&1)|0};function hl(){var n=new zh(0,0),e=0;if(this.len-this.pos>4){for(;e<4;++e)if(n.lo=(n.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return n;if(n.lo=(n.lo|(this.buf[this.pos]&127)<<28)>>>0,n.hi=(n.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return n;e=0}else{for(;e<3;++e){if(this.pos>=this.len)throw qt(this);if(n.lo=(n.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return n}return n.lo=(n.lo|(this.buf[this.pos++]&127)<<e*7)>>>0,n}if(this.len-this.pos>4){for(;e<5;++e)if(n.hi=(n.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return n}else for(;e<5;++e){if(this.pos>=this.len)throw qt(this);if(n.hi=(n.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return n}throw Error("invalid varint encoding")}et.prototype.bool=function(){return this.uint32()!==0};function Ni(n,e){return(n[e-4]|n[e-3]<<8|n[e-2]<<16|n[e-1]<<24)>>>0}et.prototype.fixed32=function(){if(this.pos+4>this.len)throw qt(this,4);return Ni(this.buf,this.pos+=4)};et.prototype.sfixed32=function(){if(this.pos+4>this.len)throw qt(this,4);return Ni(this.buf,this.pos+=4)|0};function Rh(){if(this.pos+8>this.len)throw qt(this,8);return new zh(Ni(this.buf,this.pos+=4),Ni(this.buf,this.pos+=4))}et.prototype.float=function(){if(this.pos+4>this.len)throw qt(this,4);var e=Ht.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e};et.prototype.double=function(){if(this.pos+8>this.len)throw qt(this,4);var e=Ht.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e};et.prototype.bytes=function(){var e=this.uint32(),r=this.pos,t=this.pos+e;if(t>this.len)throw qt(this,e);if(this.pos+=e,Array.isArray(this.buf))return this.buf.slice(r,t);if(r===t){var o=Ht.Buffer;return o?o.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,r,t)};et.prototype.string=function(){var e=this.bytes();return V$.read(e,0,e.length)};et.prototype.skip=function(e){if(typeof e=="number"){if(this.pos+e>this.len)throw qt(this,e);this.pos+=e}else do if(this.pos>=this.len)throw qt(this);while(this.buf[this.pos++]&128);return this};et.prototype.skipType=function(n){switch(n){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(n=this.uint32()&7)!==4;)this.skipType(n);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+n+" at offset "+this.pos)}return this};et._configure=function(n){ml=n,et.create=Mh(),ml._configure();var e=Ht.Long?"toLong":"toNumber";Ht.merge(et.prototype,{int64:function(){return hl.call(this)[e](!1)},uint64:function(){return hl.call(this)[e](!0)},sint64:function(){return hl.call(this).zzDecode()[e](!1)},fixed64:function(){return Rh.call(this)[e](!0)},sfixed64:function(){return Rh.call(this)[e](!1)}})}});var Uh=ne((v4,Gh)=>{"use strict";Gh.exports=En;var Vh=gl();(En.prototype=Object.create(Vh.prototype)).constructor=En;var Fh=pn();function En(n){Vh.call(this,n)}En._configure=function(){Fh.Buffer&&(En.prototype._slice=Fh.Buffer.prototype.slice)};En.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+e,this.len))};En._configure()});var Hh=ne((w4,Wh)=>{"use strict";Wh.exports=Oo;var bl=pn();(Oo.prototype=Object.create(bl.EventEmitter.prototype)).constructor=Oo;function Oo(n,e,r){if(typeof n!="function")throw TypeError("rpcImpl must be a function");bl.EventEmitter.call(this),this.rpcImpl=n,this.requestDelimited=!!e,this.responseDelimited=!!r}Oo.prototype.rpcCall=function n(e,r,t,o,i){if(!o)throw TypeError("request must be specified");var a=this;if(!i)return bl.asPromise(n,a,e,r,t,o);if(!a.rpcImpl){setTimeout(function(){i(Error("already ended"))},0);return}try{return a.rpcImpl(e,r[a.requestDelimited?"encodeDelimited":"encode"](o).finish(),function(u,l){if(u)return a.emit("error",u,e),i(u);if(l===null){a.end(!0);return}if(!(l instanceof t))try{l=t[a.responseDelimited?"decodeDelimited":"decode"](l)}catch(c){return a.emit("error",c,e),i(c)}return a.emit("data",l,e),i(null,l)})}catch(s){a.emit("error",s,e),setTimeout(function(){i(s)},0);return}};Oo.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}});var jh=ne(qh=>{"use strict";var G$=qh;G$.Service=Hh()});var Xh=ne((T4,Kh)=>{"use strict";Kh.exports={}});var Qh=ne(Jh=>{"use strict";var wt=Jh;wt.build="minimal";wt.Writer=fl();wt.BufferWriter=Nh();wt.Reader=gl();wt.BufferReader=Uh();wt.util=pn();wt.rpc=jh();wt.roots=Xh();wt.configure=Zh;function Zh(){wt.util._configure(),wt.Writer._configure(wt.BufferWriter),wt.Reader._configure(wt.BufferReader)}Zh()});var em=ne((S4,Yh)=>{"use strict";Yh.exports=Qh()});var Qn=ne(($4,tm)=>{"use strict";var We=em(),j=We.Reader,tt=We.Writer,E=We.util,S=We.roots.default||(We.roots.default={});S.onnx=function(){var n={};return n.Version=function(){var e={},r=Object.create(e);return r[e[0]="_START_VERSION"]=0,r[e[1]="IR_VERSION_2017_10_10"]=1,r[e[2]="IR_VERSION_2017_10_30"]=2,r[e[3]="IR_VERSION_2017_11_3"]=3,r[e[4]="IR_VERSION_2019_1_22"]=4,r[e[5]="IR_VERSION_2019_3_18"]=5,r[e[6]="IR_VERSION_2019_9_19"]=6,r[e[7]="IR_VERSION_2020_5_8"]=7,r[e[8]="IR_VERSION_2021_7_30"]=8,r[e[9]="IR_VERSION"]=9,r}(),n.AttributeProto=function(){function e(r){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.refAttrName="",e.prototype.docString="",e.prototype.type=0,e.prototype.f=0,e.prototype.i=E.Long?E.Long.fromBits(0,0,!1):0,e.prototype.s=E.newBuffer([]),e.prototype.t=null,e.prototype.g=null,e.prototype.sparseTensor=null,e.prototype.tp=null,e.prototype.floats=E.emptyArray,e.prototype.ints=E.emptyArray,e.prototype.strings=E.emptyArray,e.prototype.tensors=E.emptyArray,e.prototype.graphs=E.emptyArray,e.prototype.sparseTensors=E.emptyArray,e.prototype.typeProtos=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=tt.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.f!=null&&Object.hasOwnProperty.call(t,"f")&&o.uint32(21).float(t.f),t.i!=null&&Object.hasOwnProperty.call(t,"i")&&o.uint32(24).int64(t.i),t.s!=null&&Object.hasOwnProperty.call(t,"s")&&o.uint32(34).bytes(t.s),t.t!=null&&Object.hasOwnProperty.call(t,"t")&&S.onnx.TensorProto.encode(t.t,o.uint32(42).fork()).ldelim(),t.g!=null&&Object.hasOwnProperty.call(t,"g")&&S.onnx.GraphProto.encode(t.g,o.uint32(50).fork()).ldelim(),t.floats!=null&&t.floats.length){o.uint32(58).fork();for(var i=0;i<t.floats.length;++i)o.float(t.floats[i]);o.ldelim()}if(t.ints!=null&&t.ints.length){o.uint32(66).fork();for(var i=0;i<t.ints.length;++i)o.int64(t.ints[i]);o.ldelim()}if(t.strings!=null&&t.strings.length)for(var i=0;i<t.strings.length;++i)o.uint32(74).bytes(t.strings[i]);if(t.tensors!=null&&t.tensors.length)for(var i=0;i<t.tensors.length;++i)S.onnx.TensorProto.encode(t.tensors[i],o.uint32(82).fork()).ldelim();if(t.graphs!=null&&t.graphs.length)for(var i=0;i<t.graphs.length;++i)S.onnx.GraphProto.encode(t.graphs[i],o.uint32(90).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(106).string(t.docString),t.tp!=null&&Object.hasOwnProperty.call(t,"tp")&&S.onnx.TypeProto.encode(t.tp,o.uint32(114).fork()).ldelim(),t.typeProtos!=null&&t.typeProtos.length)for(var i=0;i<t.typeProtos.length;++i)S.onnx.TypeProto.encode(t.typeProtos[i],o.uint32(122).fork()).ldelim();if(t.type!=null&&Object.hasOwnProperty.call(t,"type")&&o.uint32(160).int32(t.type),t.refAttrName!=null&&Object.hasOwnProperty.call(t,"refAttrName")&&o.uint32(170).string(t.refAttrName),t.sparseTensor!=null&&Object.hasOwnProperty.call(t,"sparseTensor")&&S.onnx.SparseTensorProto.encode(t.sparseTensor,o.uint32(178).fork()).ldelim(),t.sparseTensors!=null&&t.sparseTensors.length)for(var i=0;i<t.sparseTensors.length;++i)S.onnx.SparseTensorProto.encode(t.sparseTensors[i],o.uint32(186).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.AttributeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 21:{a.refAttrName=t.string();break}case 13:{a.docString=t.string();break}case 20:{a.type=t.int32();break}case 2:{a.f=t.float();break}case 3:{a.i=t.int64();break}case 4:{a.s=t.bytes();break}case 5:{a.t=S.onnx.TensorProto.decode(t,t.uint32());break}case 6:{a.g=S.onnx.GraphProto.decode(t,t.uint32());break}case 22:{a.sparseTensor=S.onnx.SparseTensorProto.decode(t,t.uint32());break}case 14:{a.tp=S.onnx.TypeProto.decode(t,t.uint32());break}case 7:{if(a.floats&&a.floats.length||(a.floats=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.floats.push(t.float());else a.floats.push(t.float());break}case 8:{if(a.ints&&a.ints.length||(a.ints=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.ints.push(t.int64());else a.ints.push(t.int64());break}case 9:{a.strings&&a.strings.length||(a.strings=[]),a.strings.push(t.bytes());break}case 10:{a.tensors&&a.tensors.length||(a.tensors=[]),a.tensors.push(S.onnx.TensorProto.decode(t,t.uint32()));break}case 11:{a.graphs&&a.graphs.length||(a.graphs=[]),a.graphs.push(S.onnx.GraphProto.decode(t,t.uint32()));break}case 23:{a.sparseTensors&&a.sparseTensors.length||(a.sparseTensors=[]),a.sparseTensors.push(S.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 15:{a.typeProtos&&a.typeProtos.length||(a.typeProtos=[]),a.typeProtos.push(S.onnx.TypeProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!E.isString(t.name))return"name: string expected";if(t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&!E.isString(t.refAttrName))return"refAttrName: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!E.isString(t.docString))return"docString: string expected";if(t.type!=null&&t.hasOwnProperty("type"))switch(t.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:break}if(t.f!=null&&t.hasOwnProperty("f")&&typeof t.f!="number")return"f: number expected";if(t.i!=null&&t.hasOwnProperty("i")&&!E.isInteger(t.i)&&!(t.i&&E.isInteger(t.i.low)&&E.isInteger(t.i.high)))return"i: integer|Long expected";if(t.s!=null&&t.hasOwnProperty("s")&&!(t.s&&typeof t.s.length=="number"||E.isString(t.s)))return"s: buffer expected";if(t.t!=null&&t.hasOwnProperty("t")){var o=S.onnx.TensorProto.verify(t.t);if(o)return"t."+o}if(t.g!=null&&t.hasOwnProperty("g")){var o=S.onnx.GraphProto.verify(t.g);if(o)return"g."+o}if(t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")){var o=S.onnx.SparseTensorProto.verify(t.sparseTensor);if(o)return"sparseTensor."+o}if(t.tp!=null&&t.hasOwnProperty("tp")){var o=S.onnx.TypeProto.verify(t.tp);if(o)return"tp."+o}if(t.floats!=null&&t.hasOwnProperty("floats")){if(!Array.isArray(t.floats))return"floats: array expected";for(var i=0;i<t.floats.length;++i)if(typeof t.floats[i]!="number")return"floats: number[] expected"}if(t.ints!=null&&t.hasOwnProperty("ints")){if(!Array.isArray(t.ints))return"ints: array expected";for(var i=0;i<t.ints.length;++i)if(!E.isInteger(t.ints[i])&&!(t.ints[i]&&E.isInteger(t.ints[i].low)&&E.isInteger(t.ints[i].high)))return"ints: integer|Long[] expected"}if(t.strings!=null&&t.hasOwnProperty("strings")){if(!Array.isArray(t.strings))return"strings: array expected";for(var i=0;i<t.strings.length;++i)if(!(t.strings[i]&&typeof t.strings[i].length=="number"||E.isString(t.strings[i])))return"strings: buffer[] expected"}if(t.tensors!=null&&t.hasOwnProperty("tensors")){if(!Array.isArray(t.tensors))return"tensors: array expected";for(var i=0;i<t.tensors.length;++i){var o=S.onnx.TensorProto.verify(t.tensors[i]);if(o)return"tensors."+o}}if(t.graphs!=null&&t.hasOwnProperty("graphs")){if(!Array.isArray(t.graphs))return"graphs: array expected";for(var i=0;i<t.graphs.length;++i){var o=S.onnx.GraphProto.verify(t.graphs[i]);if(o)return"graphs."+o}}if(t.sparseTensors!=null&&t.hasOwnProperty("sparseTensors")){if(!Array.isArray(t.sparseTensors))return"sparseTensors: array expected";for(var i=0;i<t.sparseTensors.length;++i){var o=S.onnx.SparseTensorProto.verify(t.sparseTensors[i]);if(o)return"sparseTensors."+o}}if(t.typeProtos!=null&&t.hasOwnProperty("typeProtos")){if(!Array.isArray(t.typeProtos))return"typeProtos: array expected";for(var i=0;i<t.typeProtos.length;++i){var o=S.onnx.TypeProto.verify(t.typeProtos[i]);if(o)return"typeProtos."+o}}return null},e.fromObject=function(t){if(t instanceof S.onnx.AttributeProto)return t;var o=new S.onnx.AttributeProto;switch(t.name!=null&&(o.name=String(t.name)),t.refAttrName!=null&&(o.refAttrName=String(t.refAttrName)),t.docString!=null&&(o.docString=String(t.docString)),t.type){default:if(typeof t.type=="number"){o.type=t.type;break}break;case"UNDEFINED":case 0:o.type=0;break;case"FLOAT":case 1:o.type=1;break;case"INT":case 2:o.type=2;break;case"STRING":case 3:o.type=3;break;case"TENSOR":case 4:o.type=4;break;case"GRAPH":case 5:o.type=5;break;case"SPARSE_TENSOR":case 11:o.type=11;break;case"TYPE_PROTO":case 13:o.type=13;break;case"FLOATS":case 6:o.type=6;break;case"INTS":case 7:o.type=7;break;case"STRINGS":case 8:o.type=8;break;case"TENSORS":case 9:o.type=9;break;case"GRAPHS":case 10:o.type=10;break;case"SPARSE_TENSORS":case 12:o.type=12;break;case"TYPE_PROTOS":case 14:o.type=14;break}if(t.f!=null&&(o.f=Number(t.f)),t.i!=null&&(E.Long?(o.i=E.Long.fromValue(t.i)).unsigned=!1:typeof t.i=="string"?o.i=parseInt(t.i,10):typeof t.i=="number"?o.i=t.i:typeof t.i=="object"&&(o.i=new E.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber())),t.s!=null&&(typeof t.s=="string"?E.base64.decode(t.s,o.s=E.newBuffer(E.base64.length(t.s)),0):t.s.length>=0&&(o.s=t.s)),t.t!=null){if(typeof t.t!="object")throw TypeError(".onnx.AttributeProto.t: object expected");o.t=S.onnx.TensorProto.fromObject(t.t)}if(t.g!=null){if(typeof t.g!="object")throw TypeError(".onnx.AttributeProto.g: object expected");o.g=S.onnx.GraphProto.fromObject(t.g)}if(t.sparseTensor!=null){if(typeof t.sparseTensor!="object")throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");o.sparseTensor=S.onnx.SparseTensorProto.fromObject(t.sparseTensor)}if(t.tp!=null){if(typeof t.tp!="object")throw TypeError(".onnx.AttributeProto.tp: object expected");o.tp=S.onnx.TypeProto.fromObject(t.tp)}if(t.floats){if(!Array.isArray(t.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");o.floats=[];for(var i=0;i<t.floats.length;++i)o.floats[i]=Number(t.floats[i])}if(t.ints){if(!Array.isArray(t.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");o.ints=[];for(var i=0;i<t.ints.length;++i)E.Long?(o.ints[i]=E.Long.fromValue(t.ints[i])).unsigned=!1:typeof t.ints[i]=="string"?o.ints[i]=parseInt(t.ints[i],10):typeof t.ints[i]=="number"?o.ints[i]=t.ints[i]:typeof t.ints[i]=="object"&&(o.ints[i]=new E.LongBits(t.ints[i].low>>>0,t.ints[i].high>>>0).toNumber())}if(t.strings){if(!Array.isArray(t.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");o.strings=[];for(var i=0;i<t.strings.length;++i)typeof t.strings[i]=="string"?E.base64.decode(t.strings[i],o.strings[i]=E.newBuffer(E.base64.length(t.strings[i])),0):t.strings[i].length>=0&&(o.strings[i]=t.strings[i])}if(t.tensors){if(!Array.isArray(t.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");o.tensors=[];for(var i=0;i<t.tensors.length;++i){if(typeof t.tensors[i]!="object")throw TypeError(".onnx.AttributeProto.tensors: object expected");o.tensors[i]=S.onnx.TensorProto.fromObject(t.tensors[i])}}if(t.graphs){if(!Array.isArray(t.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");o.graphs=[];for(var i=0;i<t.graphs.length;++i){if(typeof t.graphs[i]!="object")throw TypeError(".onnx.AttributeProto.graphs: object expected");o.graphs[i]=S.onnx.GraphProto.fromObject(t.graphs[i])}}if(t.sparseTensors){if(!Array.isArray(t.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");o.sparseTensors=[];for(var i=0;i<t.sparseTensors.length;++i){if(typeof t.sparseTensors[i]!="object")throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");o.sparseTensors[i]=S.onnx.SparseTensorProto.fromObject(t.sparseTensors[i])}}if(t.typeProtos){if(!Array.isArray(t.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");o.typeProtos=[];for(var i=0;i<t.typeProtos.length;++i){if(typeof t.typeProtos[i]!="object")throw TypeError(".onnx.AttributeProto.typeProtos: object expected");o.typeProtos[i]=S.onnx.TypeProto.fromObject(t.typeProtos[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.floats=[],i.ints=[],i.strings=[],i.tensors=[],i.graphs=[],i.typeProtos=[],i.sparseTensors=[]),o.defaults){if(i.name="",i.f=0,E.Long){var a=new E.Long(0,0,!1);i.i=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.i=o.longs===String?"0":0;o.bytes===String?i.s="":(i.s=[],o.bytes!==Array&&(i.s=E.newBuffer(i.s))),i.t=null,i.g=null,i.docString="",i.tp=null,i.type=o.enums===String?"UNDEFINED":0,i.refAttrName="",i.sparseTensor=null}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.f!=null&&t.hasOwnProperty("f")&&(i.f=o.json&&!isFinite(t.f)?String(t.f):t.f),t.i!=null&&t.hasOwnProperty("i")&&(typeof t.i=="number"?i.i=o.longs===String?String(t.i):t.i:i.i=o.longs===String?E.Long.prototype.toString.call(t.i):o.longs===Number?new E.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber():t.i),t.s!=null&&t.hasOwnProperty("s")&&(i.s=o.bytes===String?E.base64.encode(t.s,0,t.s.length):o.bytes===Array?Array.prototype.slice.call(t.s):t.s),t.t!=null&&t.hasOwnProperty("t")&&(i.t=S.onnx.TensorProto.toObject(t.t,o)),t.g!=null&&t.hasOwnProperty("g")&&(i.g=S.onnx.GraphProto.toObject(t.g,o)),t.floats&&t.floats.length){i.floats=[];for(var s=0;s<t.floats.length;++s)i.floats[s]=o.json&&!isFinite(t.floats[s])?String(t.floats[s]):t.floats[s]}if(t.ints&&t.ints.length){i.ints=[];for(var s=0;s<t.ints.length;++s)typeof t.ints[s]=="number"?i.ints[s]=o.longs===String?String(t.ints[s]):t.ints[s]:i.ints[s]=o.longs===String?E.Long.prototype.toString.call(t.ints[s]):o.longs===Number?new E.LongBits(t.ints[s].low>>>0,t.ints[s].high>>>0).toNumber():t.ints[s]}if(t.strings&&t.strings.length){i.strings=[];for(var s=0;s<t.strings.length;++s)i.strings[s]=o.bytes===String?E.base64.encode(t.strings[s],0,t.strings[s].length):o.bytes===Array?Array.prototype.slice.call(t.strings[s]):t.strings[s]}if(t.tensors&&t.tensors.length){i.tensors=[];for(var s=0;s<t.tensors.length;++s)i.tensors[s]=S.onnx.TensorProto.toObject(t.tensors[s],o)}if(t.graphs&&t.graphs.length){i.graphs=[];for(var s=0;s<t.graphs.length;++s)i.graphs[s]=S.onnx.GraphProto.toObject(t.graphs[s],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.tp!=null&&t.hasOwnProperty("tp")&&(i.tp=S.onnx.TypeProto.toObject(t.tp,o)),t.typeProtos&&t.typeProtos.length){i.typeProtos=[];for(var s=0;s<t.typeProtos.length;++s)i.typeProtos[s]=S.onnx.TypeProto.toObject(t.typeProtos[s],o)}if(t.type!=null&&t.hasOwnProperty("type")&&(i.type=o.enums===String?S.onnx.AttributeProto.AttributeType[t.type]===void 0?t.type:S.onnx.AttributeProto.AttributeType[t.type]:t.type),t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&(i.refAttrName=t.refAttrName),t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")&&(i.sparseTensor=S.onnx.SparseTensorProto.toObject(t.sparseTensor,o)),t.sparseTensors&&t.sparseTensors.length){i.sparseTensors=[];for(var s=0;s<t.sparseTensors.length;++s)i.sparseTensors[s]=S.onnx.SparseTensorProto.toObject(t.sparseTensors[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,We.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.AttributeProto"},e.AttributeType=function(){var r={},t=Object.create(r);return t[r[0]="UNDEFINED"]=0,t[r[1]="FLOAT"]=1,t[r[2]="INT"]=2,t[r[3]="STRING"]=3,t[r[4]="TENSOR"]=4,t[r[5]="GRAPH"]=5,t[r[11]="SPARSE_TENSOR"]=11,t[r[13]="TYPE_PROTO"]=13,t[r[6]="FLOATS"]=6,t[r[7]="INTS"]=7,t[r[8]="STRINGS"]=8,t[r[9]="TENSORS"]=9,t[r[10]="GRAPHS"]=10,t[r[12]="SPARSE_TENSORS"]=12,t[r[14]="TYPE_PROTOS"]=14,t}(),e}(),n.ValueInfoProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.type=null,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=tt.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.type!=null&&Object.hasOwnProperty.call(t,"type")&&S.onnx.TypeProto.encode(t.type,o.uint32(18).fork()).ldelim(),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(26).string(t.docString),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.ValueInfoProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 2:{a.type=S.onnx.TypeProto.decode(t,t.uint32());break}case 3:{a.docString=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!E.isString(t.name))return"name: string expected";if(t.type!=null&&t.hasOwnProperty("type")){var o=S.onnx.TypeProto.verify(t.type);if(o)return"type."+o}return t.docString!=null&&t.hasOwnProperty("docString")&&!E.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.ValueInfoProto)return t;var o=new S.onnx.ValueInfoProto;if(t.name!=null&&(o.name=String(t.name)),t.type!=null){if(typeof t.type!="object")throw TypeError(".onnx.ValueInfoProto.type: object expected");o.type=S.onnx.TypeProto.fromObject(t.type)}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.name="",i.type=null,i.docString=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.type!=null&&t.hasOwnProperty("type")&&(i.type=S.onnx.TypeProto.toObject(t.type,o)),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,We.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ValueInfoProto"},e}(),n.NodeProto=function(){function e(r){if(this.input=[],this.output=[],this.attribute=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.input=E.emptyArray,e.prototype.output=E.emptyArray,e.prototype.name="",e.prototype.opType="",e.prototype.domain="",e.prototype.attribute=E.emptyArray,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=tt.create()),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(10).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(18).string(t.output[i]);if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(26).string(t.name),t.opType!=null&&Object.hasOwnProperty.call(t,"opType")&&o.uint32(34).string(t.opType),t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)S.onnx.AttributeProto.encode(t.attribute[i],o.uint32(42).fork()).ldelim();return t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(58).string(t.domain),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.NodeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.input&&a.input.length||(a.input=[]),a.input.push(t.string());break}case 2:{a.output&&a.output.length||(a.output=[]),a.output.push(t.string());break}case 3:{a.name=t.string();break}case 4:{a.opType=t.string();break}case 7:{a.domain=t.string();break}case 5:{a.attribute&&a.attribute.length||(a.attribute=[]),a.attribute.push(S.onnx.AttributeProto.decode(t,t.uint32()));break}case 6:{a.docString=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!E.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!E.isString(t.output[o]))return"output: string[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!E.isString(t.name))return"name: string expected";if(t.opType!=null&&t.hasOwnProperty("opType")&&!E.isString(t.opType))return"opType: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!E.isString(t.domain))return"domain: string expected";if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o){var i=S.onnx.AttributeProto.verify(t.attribute[o]);if(i)return"attribute."+i}}return t.docString!=null&&t.hasOwnProperty("docString")&&!E.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.NodeProto)return t;var o=new S.onnx.NodeProto;if(t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.NodeProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.NodeProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.name!=null&&(o.name=String(t.name)),t.opType!=null&&(o.opType=String(t.opType)),t.domain!=null&&(o.domain=String(t.domain)),t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i){if(typeof t.attribute[i]!="object")throw TypeError(".onnx.NodeProto.attribute: object expected");o.attribute[i]=S.onnx.AttributeProto.fromObject(t.attribute[i])}}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[]),o.defaults&&(i.name="",i.opType="",i.docString="",i.domain=""),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=t.input[a]}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=t.output[a]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.opType!=null&&t.hasOwnProperty("opType")&&(i.opType=t.opType),t.attribute&&t.attribute.length){i.attribute=[];for(var a=0;a<t.attribute.length;++a)i.attribute[a]=S.onnx.AttributeProto.toObject(t.attribute[a],o)}return t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,We.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.NodeProto"},e}(),n.TrainingInfoProto=function(){function e(r){if(this.initializationBinding=[],this.updateBinding=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.initialization=null,e.prototype.algorithm=null,e.prototype.initializationBinding=E.emptyArray,e.prototype.updateBinding=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=tt.create()),t.initialization!=null&&Object.hasOwnProperty.call(t,"initialization")&&S.onnx.GraphProto.encode(t.initialization,o.uint32(10).fork()).ldelim(),t.algorithm!=null&&Object.hasOwnProperty.call(t,"algorithm")&&S.onnx.GraphProto.encode(t.algorithm,o.uint32(18).fork()).ldelim(),t.initializationBinding!=null&&t.initializationBinding.length)for(var i=0;i<t.initializationBinding.length;++i)S.onnx.StringStringEntryProto.encode(t.initializationBinding[i],o.uint32(26).fork()).ldelim();if(t.updateBinding!=null&&t.updateBinding.length)for(var i=0;i<t.updateBinding.length;++i)S.onnx.StringStringEntryProto.encode(t.updateBinding[i],o.uint32(34).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.TrainingInfoProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.initialization=S.onnx.GraphProto.decode(t,t.uint32());break}case 2:{a.algorithm=S.onnx.GraphProto.decode(t,t.uint32());break}case 3:{a.initializationBinding&&a.initializationBinding.length||(a.initializationBinding=[]),a.initializationBinding.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 4:{a.updateBinding&&a.updateBinding.length||(a.updateBinding=[]),a.updateBinding.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.initialization!=null&&t.hasOwnProperty("initialization")){var o=S.onnx.GraphProto.verify(t.initialization);if(o)return"initialization."+o}if(t.algorithm!=null&&t.hasOwnProperty("algorithm")){var o=S.onnx.GraphProto.verify(t.algorithm);if(o)return"algorithm."+o}if(t.initializationBinding!=null&&t.hasOwnProperty("initializationBinding")){if(!Array.isArray(t.initializationBinding))return"initializationBinding: array expected";for(var i=0;i<t.initializationBinding.length;++i){var o=S.onnx.StringStringEntryProto.verify(t.initializationBinding[i]);if(o)return"initializationBinding."+o}}if(t.updateBinding!=null&&t.hasOwnProperty("updateBinding")){if(!Array.isArray(t.updateBinding))return"updateBinding: array expected";for(var i=0;i<t.updateBinding.length;++i){var o=S.onnx.StringStringEntryProto.verify(t.updateBinding[i]);if(o)return"updateBinding."+o}}return null},e.fromObject=function(t){if(t instanceof S.onnx.TrainingInfoProto)return t;var o=new S.onnx.TrainingInfoProto;if(t.initialization!=null){if(typeof t.initialization!="object")throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");o.initialization=S.onnx.GraphProto.fromObject(t.initialization)}if(t.algorithm!=null){if(typeof t.algorithm!="object")throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");o.algorithm=S.onnx.GraphProto.fromObject(t.algorithm)}if(t.initializationBinding){if(!Array.isArray(t.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");o.initializationBinding=[];for(var i=0;i<t.initializationBinding.length;++i){if(typeof t.initializationBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");o.initializationBinding[i]=S.onnx.StringStringEntryProto.fromObject(t.initializationBinding[i])}}if(t.updateBinding){if(!Array.isArray(t.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");o.updateBinding=[];for(var i=0;i<t.updateBinding.length;++i){if(typeof t.updateBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");o.updateBinding[i]=S.onnx.StringStringEntryProto.fromObject(t.updateBinding[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.initializationBinding=[],i.updateBinding=[]),o.defaults&&(i.initialization=null,i.algorithm=null),t.initialization!=null&&t.hasOwnProperty("initialization")&&(i.initialization=S.onnx.GraphProto.toObject(t.initialization,o)),t.algorithm!=null&&t.hasOwnProperty("algorithm")&&(i.algorithm=S.onnx.GraphProto.toObject(t.algorithm,o)),t.initializationBinding&&t.initializationBinding.length){i.initializationBinding=[];for(var a=0;a<t.initializationBinding.length;++a)i.initializationBinding[a]=S.onnx.StringStringEntryProto.toObject(t.initializationBinding[a],o)}if(t.updateBinding&&t.updateBinding.length){i.updateBinding=[];for(var a=0;a<t.updateBinding.length;++a)i.updateBinding[a]=S.onnx.StringStringEntryProto.toObject(t.updateBinding[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,We.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TrainingInfoProto"},e}(),n.ModelProto=function(){function e(r){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.irVersion=E.Long?E.Long.fromBits(0,0,!1):0,e.prototype.opsetImport=E.emptyArray,e.prototype.producerName="",e.prototype.producerVersion="",e.prototype.domain="",e.prototype.modelVersion=E.Long?E.Long.fromBits(0,0,!1):0,e.prototype.docString="",e.prototype.graph=null,e.prototype.metadataProps=E.emptyArray,e.prototype.trainingInfo=E.emptyArray,e.prototype.functions=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=tt.create()),t.irVersion!=null&&Object.hasOwnProperty.call(t,"irVersion")&&o.uint32(8).int64(t.irVersion),t.producerName!=null&&Object.hasOwnProperty.call(t,"producerName")&&o.uint32(18).string(t.producerName),t.producerVersion!=null&&Object.hasOwnProperty.call(t,"producerVersion")&&o.uint32(26).string(t.producerVersion),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(34).string(t.domain),t.modelVersion!=null&&Object.hasOwnProperty.call(t,"modelVersion")&&o.uint32(40).int64(t.modelVersion),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.graph!=null&&Object.hasOwnProperty.call(t,"graph")&&S.onnx.GraphProto.encode(t.graph,o.uint32(58).fork()).ldelim(),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)S.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(66).fork()).ldelim();if(t.metadataProps!=null&&t.metadataProps.length)for(var i=0;i<t.metadataProps.length;++i)S.onnx.StringStringEntryProto.encode(t.metadataProps[i],o.uint32(114).fork()).ldelim();if(t.trainingInfo!=null&&t.trainingInfo.length)for(var i=0;i<t.trainingInfo.length;++i)S.onnx.TrainingInfoProto.encode(t.trainingInfo[i],o.uint32(162).fork()).ldelim();if(t.functions!=null&&t.functions.length)for(var i=0;i<t.functions.length;++i)S.onnx.FunctionProto.encode(t.functions[i],o.uint32(202).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.ModelProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.irVersion=t.int64();break}case 8:{a.opsetImport&&a.opsetImport.length||(a.opsetImport=[]),a.opsetImport.push(S.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 2:{a.producerName=t.string();break}case 3:{a.producerVersion=t.string();break}case 4:{a.domain=t.string();break}case 5:{a.modelVersion=t.int64();break}case 6:{a.docString=t.string();break}case 7:{a.graph=S.onnx.GraphProto.decode(t,t.uint32());break}case 14:{a.metadataProps&&a.metadataProps.length||(a.metadataProps=[]),a.metadataProps.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 20:{a.trainingInfo&&a.trainingInfo.length||(a.trainingInfo=[]),a.trainingInfo.push(S.onnx.TrainingInfoProto.decode(t,t.uint32()));break}case 25:{a.functions&&a.functions.length||(a.functions=[]),a.functions.push(S.onnx.FunctionProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&!E.isInteger(t.irVersion)&&!(t.irVersion&&E.isInteger(t.irVersion.low)&&E.isInteger(t.irVersion.high)))return"irVersion: integer|Long expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=S.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}if(t.producerName!=null&&t.hasOwnProperty("producerName")&&!E.isString(t.producerName))return"producerName: string expected";if(t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&!E.isString(t.producerVersion))return"producerVersion: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!E.isString(t.domain))return"domain: string expected";if(t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&!E.isInteger(t.modelVersion)&&!(t.modelVersion&&E.isInteger(t.modelVersion.low)&&E.isInteger(t.modelVersion.high)))return"modelVersion: integer|Long expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!E.isString(t.docString))return"docString: string expected";if(t.graph!=null&&t.hasOwnProperty("graph")){var i=S.onnx.GraphProto.verify(t.graph);if(i)return"graph."+i}if(t.metadataProps!=null&&t.hasOwnProperty("metadataProps")){if(!Array.isArray(t.metadataProps))return"metadataProps: array expected";for(var o=0;o<t.metadataProps.length;++o){var i=S.onnx.StringStringEntryProto.verify(t.metadataProps[o]);if(i)return"metadataProps."+i}}if(t.trainingInfo!=null&&t.hasOwnProperty("trainingInfo")){if(!Array.isArray(t.trainingInfo))return"trainingInfo: array expected";for(var o=0;o<t.trainingInfo.length;++o){var i=S.onnx.TrainingInfoProto.verify(t.trainingInfo[o]);if(i)return"trainingInfo."+i}}if(t.functions!=null&&t.hasOwnProperty("functions")){if(!Array.isArray(t.functions))return"functions: array expected";for(var o=0;o<t.functions.length;++o){var i=S.onnx.FunctionProto.verify(t.functions[o]);if(i)return"functions."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.ModelProto)return t;var o=new S.onnx.ModelProto;if(t.irVersion!=null&&(E.Long?(o.irVersion=E.Long.fromValue(t.irVersion)).unsigned=!1:typeof t.irVersion=="string"?o.irVersion=parseInt(t.irVersion,10):typeof t.irVersion=="number"?o.irVersion=t.irVersion:typeof t.irVersion=="object"&&(o.irVersion=new E.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber())),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.ModelProto.opsetImport: object expected");o.opsetImport[i]=S.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}if(t.producerName!=null&&(o.producerName=String(t.producerName)),t.producerVersion!=null&&(o.producerVersion=String(t.producerVersion)),t.domain!=null&&(o.domain=String(t.domain)),t.modelVersion!=null&&(E.Long?(o.modelVersion=E.Long.fromValue(t.modelVersion)).unsigned=!1:typeof t.modelVersion=="string"?o.modelVersion=parseInt(t.modelVersion,10):typeof t.modelVersion=="number"?o.modelVersion=t.modelVersion:typeof t.modelVersion=="object"&&(o.modelVersion=new E.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber())),t.docString!=null&&(o.docString=String(t.docString)),t.graph!=null){if(typeof t.graph!="object")throw TypeError(".onnx.ModelProto.graph: object expected");o.graph=S.onnx.GraphProto.fromObject(t.graph)}if(t.metadataProps){if(!Array.isArray(t.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");o.metadataProps=[];for(var i=0;i<t.metadataProps.length;++i){if(typeof t.metadataProps[i]!="object")throw TypeError(".onnx.ModelProto.metadataProps: object expected");o.metadataProps[i]=S.onnx.StringStringEntryProto.fromObject(t.metadataProps[i])}}if(t.trainingInfo){if(!Array.isArray(t.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");o.trainingInfo=[];for(var i=0;i<t.trainingInfo.length;++i){if(typeof t.trainingInfo[i]!="object")throw TypeError(".onnx.ModelProto.trainingInfo: object expected");o.trainingInfo[i]=S.onnx.TrainingInfoProto.fromObject(t.trainingInfo[i])}}if(t.functions){if(!Array.isArray(t.functions))throw TypeError(".onnx.ModelProto.functions: array expected");o.functions=[];for(var i=0;i<t.functions.length;++i){if(typeof t.functions[i]!="object")throw TypeError(".onnx.ModelProto.functions: object expected");o.functions[i]=S.onnx.FunctionProto.fromObject(t.functions[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.opsetImport=[],i.metadataProps=[],i.trainingInfo=[],i.functions=[]),o.defaults){if(E.Long){var a=new E.Long(0,0,!1);i.irVersion=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.irVersion=o.longs===String?"0":0;if(i.producerName="",i.producerVersion="",i.domain="",E.Long){var a=new E.Long(0,0,!1);i.modelVersion=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.modelVersion=o.longs===String?"0":0;i.docString="",i.graph=null}if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&(typeof t.irVersion=="number"?i.irVersion=o.longs===String?String(t.irVersion):t.irVersion:i.irVersion=o.longs===String?E.Long.prototype.toString.call(t.irVersion):o.longs===Number?new E.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber():t.irVersion),t.producerName!=null&&t.hasOwnProperty("producerName")&&(i.producerName=t.producerName),t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&(i.producerVersion=t.producerVersion),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&(typeof t.modelVersion=="number"?i.modelVersion=o.longs===String?String(t.modelVersion):t.modelVersion:i.modelVersion=o.longs===String?E.Long.prototype.toString.call(t.modelVersion):o.longs===Number?new E.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber():t.modelVersion),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.graph!=null&&t.hasOwnProperty("graph")&&(i.graph=S.onnx.GraphProto.toObject(t.graph,o)),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var s=0;s<t.opsetImport.length;++s)i.opsetImport[s]=S.onnx.OperatorSetIdProto.toObject(t.opsetImport[s],o)}if(t.metadataProps&&t.metadataProps.length){i.metadataProps=[];for(var s=0;s<t.metadataProps.length;++s)i.metadataProps[s]=S.onnx.StringStringEntryProto.toObject(t.metadataProps[s],o)}if(t.trainingInfo&&t.trainingInfo.length){i.trainingInfo=[];for(var s=0;s<t.trainingInfo.length;++s)i.trainingInfo[s]=S.onnx.TrainingInfoProto.toObject(t.trainingInfo[s],o)}if(t.functions&&t.functions.length){i.functions=[];for(var s=0;s<t.functions.length;++s)i.functions[s]=S.onnx.FunctionProto.toObject(t.functions[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,We.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ModelProto"},e}(),n.StringStringEntryProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.key="",e.prototype.value="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=tt.create()),t.key!=null&&Object.hasOwnProperty.call(t,"key")&&o.uint32(10).string(t.key),t.value!=null&&Object.hasOwnProperty.call(t,"value")&&o.uint32(18).string(t.value),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.StringStringEntryProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.key=t.string();break}case 2:{a.value=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.key!=null&&t.hasOwnProperty("key")&&!E.isString(t.key)?"key: string expected":t.value!=null&&t.hasOwnProperty("value")&&!E.isString(t.value)?"value: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.StringStringEntryProto)return t;var o=new S.onnx.StringStringEntryProto;return t.key!=null&&(o.key=String(t.key)),t.value!=null&&(o.value=String(t.value)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.key="",i.value=""),t.key!=null&&t.hasOwnProperty("key")&&(i.key=t.key),t.value!=null&&t.hasOwnProperty("value")&&(i.value=t.value),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,We.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.StringStringEntryProto"},e}(),n.TensorAnnotation=function(){function e(r){if(this.quantParameterTensorNames=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.tensorName="",e.prototype.quantParameterTensorNames=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=tt.create()),t.tensorName!=null&&Object.hasOwnProperty.call(t,"tensorName")&&o.uint32(10).string(t.tensorName),t.quantParameterTensorNames!=null&&t.quantParameterTensorNames.length)for(var i=0;i<t.quantParameterTensorNames.length;++i)S.onnx.StringStringEntryProto.encode(t.quantParameterTensorNames[i],o.uint32(18).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.TensorAnnotation;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.tensorName=t.string();break}case 2:{a.quantParameterTensorNames&&a.quantParameterTensorNames.length||(a.quantParameterTensorNames=[]),a.quantParameterTensorNames.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.tensorName!=null&&t.hasOwnProperty("tensorName")&&!E.isString(t.tensorName))return"tensorName: string expected";if(t.quantParameterTensorNames!=null&&t.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(t.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var o=0;o<t.quantParameterTensorNames.length;++o){var i=S.onnx.StringStringEntryProto.verify(t.quantParameterTensorNames[o]);if(i)return"quantParameterTensorNames."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.TensorAnnotation)return t;var o=new S.onnx.TensorAnnotation;if(t.tensorName!=null&&(o.tensorName=String(t.tensorName)),t.quantParameterTensorNames){if(!Array.isArray(t.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");o.quantParameterTensorNames=[];for(var i=0;i<t.quantParameterTensorNames.length;++i){if(typeof t.quantParameterTensorNames[i]!="object")throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");o.quantParameterTensorNames[i]=S.onnx.StringStringEntryProto.fromObject(t.quantParameterTensorNames[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.quantParameterTensorNames=[]),o.defaults&&(i.tensorName=""),t.tensorName!=null&&t.hasOwnProperty("tensorName")&&(i.tensorName=t.tensorName),t.quantParameterTensorNames&&t.quantParameterTensorNames.length){i.quantParameterTensorNames=[];for(var a=0;a<t.quantParameterTensorNames.length;++a)i.quantParameterTensorNames[a]=S.onnx.StringStringEntryProto.toObject(t.quantParameterTensorNames[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,We.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorAnnotation"},e}(),n.GraphProto=function(){function e(r){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.node=E.emptyArray,e.prototype.name="",e.prototype.initializer=E.emptyArray,e.prototype.sparseInitializer=E.emptyArray,e.prototype.docString="",e.prototype.input=E.emptyArray,e.prototype.output=E.emptyArray,e.prototype.valueInfo=E.emptyArray,e.prototype.quantizationAnnotation=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=tt.create()),t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)S.onnx.NodeProto.encode(t.node[i],o.uint32(10).fork()).ldelim();if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(18).string(t.name),t.initializer!=null&&t.initializer.length)for(var i=0;i<t.initializer.length;++i)S.onnx.TensorProto.encode(t.initializer[i],o.uint32(42).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(82).string(t.docString),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)S.onnx.ValueInfoProto.encode(t.input[i],o.uint32(90).fork()).ldelim();if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)S.onnx.ValueInfoProto.encode(t.output[i],o.uint32(98).fork()).ldelim();if(t.valueInfo!=null&&t.valueInfo.length)for(var i=0;i<t.valueInfo.length;++i)S.onnx.ValueInfoProto.encode(t.valueInfo[i],o.uint32(106).fork()).ldelim();if(t.quantizationAnnotation!=null&&t.quantizationAnnotation.length)for(var i=0;i<t.quantizationAnnotation.length;++i)S.onnx.TensorAnnotation.encode(t.quantizationAnnotation[i],o.uint32(114).fork()).ldelim();if(t.sparseInitializer!=null&&t.sparseInitializer.length)for(var i=0;i<t.sparseInitializer.length;++i)S.onnx.SparseTensorProto.encode(t.sparseInitializer[i],o.uint32(122).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.GraphProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.node&&a.node.length||(a.node=[]),a.node.push(S.onnx.NodeProto.decode(t,t.uint32()));break}case 2:{a.name=t.string();break}case 5:{a.initializer&&a.initializer.length||(a.initializer=[]),a.initializer.push(S.onnx.TensorProto.decode(t,t.uint32()));break}case 15:{a.sparseInitializer&&a.sparseInitializer.length||(a.sparseInitializer=[]),a.sparseInitializer.push(S.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 10:{a.docString=t.string();break}case 11:{a.input&&a.input.length||(a.input=[]),a.input.push(S.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 12:{a.output&&a.output.length||(a.output=[]),a.output.push(S.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 13:{a.valueInfo&&a.valueInfo.length||(a.valueInfo=[]),a.valueInfo.push(S.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 14:{a.quantizationAnnotation&&a.quantizationAnnotation.length||(a.quantizationAnnotation=[]),a.quantizationAnnotation.push(S.onnx.TensorAnnotation.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=S.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.name!=null&&t.hasOwnProperty("name")&&!E.isString(t.name))return"name: string expected";if(t.initializer!=null&&t.hasOwnProperty("initializer")){if(!Array.isArray(t.initializer))return"initializer: array expected";for(var o=0;o<t.initializer.length;++o){var i=S.onnx.TensorProto.verify(t.initializer[o]);if(i)return"initializer."+i}}if(t.sparseInitializer!=null&&t.hasOwnProperty("sparseInitializer")){if(!Array.isArray(t.sparseInitializer))return"sparseInitializer: array expected";for(var o=0;o<t.sparseInitializer.length;++o){var i=S.onnx.SparseTensorProto.verify(t.sparseInitializer[o]);if(i)return"sparseInitializer."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!E.isString(t.docString))return"docString: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o){var i=S.onnx.ValueInfoProto.verify(t.input[o]);if(i)return"input."+i}}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o){var i=S.onnx.ValueInfoProto.verify(t.output[o]);if(i)return"output."+i}}if(t.valueInfo!=null&&t.hasOwnProperty("valueInfo")){if(!Array.isArray(t.valueInfo))return"valueInfo: array expected";for(var o=0;o<t.valueInfo.length;++o){var i=S.onnx.ValueInfoProto.verify(t.valueInfo[o]);if(i)return"valueInfo."+i}}if(t.quantizationAnnotation!=null&&t.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(t.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var o=0;o<t.quantizationAnnotation.length;++o){var i=S.onnx.TensorAnnotation.verify(t.quantizationAnnotation[o]);if(i)return"quantizationAnnotation."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.GraphProto)return t;var o=new S.onnx.GraphProto;if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.GraphProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.GraphProto.node: object expected");o.node[i]=S.onnx.NodeProto.fromObject(t.node[i])}}if(t.name!=null&&(o.name=String(t.name)),t.initializer){if(!Array.isArray(t.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");o.initializer=[];for(var i=0;i<t.initializer.length;++i){if(typeof t.initializer[i]!="object")throw TypeError(".onnx.GraphProto.initializer: object expected");o.initializer[i]=S.onnx.TensorProto.fromObject(t.initializer[i])}}if(t.sparseInitializer){if(!Array.isArray(t.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");o.sparseInitializer=[];for(var i=0;i<t.sparseInitializer.length;++i){if(typeof t.sparseInitializer[i]!="object")throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");o.sparseInitializer[i]=S.onnx.SparseTensorProto.fromObject(t.sparseInitializer[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.GraphProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i){if(typeof t.input[i]!="object")throw TypeError(".onnx.GraphProto.input: object expected");o.input[i]=S.onnx.ValueInfoProto.fromObject(t.input[i])}}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.GraphProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i){if(typeof t.output[i]!="object")throw TypeError(".onnx.GraphProto.output: object expected");o.output[i]=S.onnx.ValueInfoProto.fromObject(t.output[i])}}if(t.valueInfo){if(!Array.isArray(t.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");o.valueInfo=[];for(var i=0;i<t.valueInfo.length;++i){if(typeof t.valueInfo[i]!="object")throw TypeError(".onnx.GraphProto.valueInfo: object expected");o.valueInfo[i]=S.onnx.ValueInfoProto.fromObject(t.valueInfo[i])}}if(t.quantizationAnnotation){if(!Array.isArray(t.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");o.quantizationAnnotation=[];for(var i=0;i<t.quantizationAnnotation.length;++i){if(typeof t.quantizationAnnotation[i]!="object")throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");o.quantizationAnnotation[i]=S.onnx.TensorAnnotation.fromObject(t.quantizationAnnotation[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.node=[],i.initializer=[],i.input=[],i.output=[],i.valueInfo=[],i.quantizationAnnotation=[],i.sparseInitializer=[]),o.defaults&&(i.name="",i.docString=""),t.node&&t.node.length){i.node=[];for(var a=0;a<t.node.length;++a)i.node[a]=S.onnx.NodeProto.toObject(t.node[a],o)}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.initializer&&t.initializer.length){i.initializer=[];for(var a=0;a<t.initializer.length;++a)i.initializer[a]=S.onnx.TensorProto.toObject(t.initializer[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=S.onnx.ValueInfoProto.toObject(t.input[a],o)}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=S.onnx.ValueInfoProto.toObject(t.output[a],o)}if(t.valueInfo&&t.valueInfo.length){i.valueInfo=[];for(var a=0;a<t.valueInfo.length;++a)i.valueInfo[a]=S.onnx.ValueInfoProto.toObject(t.valueInfo[a],o)}if(t.quantizationAnnotation&&t.quantizationAnnotation.length){i.quantizationAnnotation=[];for(var a=0;a<t.quantizationAnnotation.length;++a)i.quantizationAnnotation[a]=S.onnx.TensorAnnotation.toObject(t.quantizationAnnotation[a],o)}if(t.sparseInitializer&&t.sparseInitializer.length){i.sparseInitializer=[];for(var a=0;a<t.sparseInitializer.length;++a)i.sparseInitializer[a]=S.onnx.SparseTensorProto.toObject(t.sparseInitializer[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,We.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.GraphProto"},e}(),n.TensorProto=function(){function e(r){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.dims=E.emptyArray,e.prototype.dataType=0,e.prototype.segment=null,e.prototype.floatData=E.emptyArray,e.prototype.int32Data=E.emptyArray,e.prototype.stringData=E.emptyArray,e.prototype.int64Data=E.emptyArray,e.prototype.name="",e.prototype.docString="",e.prototype.rawData=E.newBuffer([]),e.prototype.externalData=E.emptyArray,e.prototype.dataLocation=0,e.prototype.doubleData=E.emptyArray,e.prototype.uint64Data=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=tt.create()),t.dims!=null&&t.dims.length){o.uint32(10).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}if(t.dataType!=null&&Object.hasOwnProperty.call(t,"dataType")&&o.uint32(16).int32(t.dataType),t.segment!=null&&Object.hasOwnProperty.call(t,"segment")&&S.onnx.TensorProto.Segment.encode(t.segment,o.uint32(26).fork()).ldelim(),t.floatData!=null&&t.floatData.length){o.uint32(34).fork();for(var i=0;i<t.floatData.length;++i)o.float(t.floatData[i]);o.ldelim()}if(t.int32Data!=null&&t.int32Data.length){o.uint32(42).fork();for(var i=0;i<t.int32Data.length;++i)o.int32(t.int32Data[i]);o.ldelim()}if(t.stringData!=null&&t.stringData.length)for(var i=0;i<t.stringData.length;++i)o.uint32(50).bytes(t.stringData[i]);if(t.int64Data!=null&&t.int64Data.length){o.uint32(58).fork();for(var i=0;i<t.int64Data.length;++i)o.int64(t.int64Data[i]);o.ldelim()}if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(66).string(t.name),t.rawData!=null&&Object.hasOwnProperty.call(t,"rawData")&&o.uint32(74).bytes(t.rawData),t.doubleData!=null&&t.doubleData.length){o.uint32(82).fork();for(var i=0;i<t.doubleData.length;++i)o.double(t.doubleData[i]);o.ldelim()}if(t.uint64Data!=null&&t.uint64Data.length){o.uint32(90).fork();for(var i=0;i<t.uint64Data.length;++i)o.uint64(t.uint64Data[i]);o.ldelim()}if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(98).string(t.docString),t.externalData!=null&&t.externalData.length)for(var i=0;i<t.externalData.length;++i)S.onnx.StringStringEntryProto.encode(t.externalData[i],o.uint32(106).fork()).ldelim();return t.dataLocation!=null&&Object.hasOwnProperty.call(t,"dataLocation")&&o.uint32(112).int32(t.dataLocation),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.TensorProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{if(a.dims&&a.dims.length||(a.dims=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.dims.push(t.int64());else a.dims.push(t.int64());break}case 2:{a.dataType=t.int32();break}case 3:{a.segment=S.onnx.TensorProto.Segment.decode(t,t.uint32());break}case 4:{if(a.floatData&&a.floatData.length||(a.floatData=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.floatData.push(t.float());else a.floatData.push(t.float());break}case 5:{if(a.int32Data&&a.int32Data.length||(a.int32Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.int32Data.push(t.int32());else a.int32Data.push(t.int32());break}case 6:{a.stringData&&a.stringData.length||(a.stringData=[]),a.stringData.push(t.bytes());break}case 7:{if(a.int64Data&&a.int64Data.length||(a.int64Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.int64Data.push(t.int64());else a.int64Data.push(t.int64());break}case 8:{a.name=t.string();break}case 12:{a.docString=t.string();break}case 9:{a.rawData=t.bytes();break}case 13:{a.externalData&&a.externalData.length||(a.externalData=[]),a.externalData.push(S.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 14:{a.dataLocation=t.int32();break}case 10:{if(a.doubleData&&a.doubleData.length||(a.doubleData=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.doubleData.push(t.double());else a.doubleData.push(t.double());break}case 11:{if(a.uint64Data&&a.uint64Data.length||(a.uint64Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.uint64Data.push(t.uint64());else a.uint64Data.push(t.uint64());break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var o=0;o<t.dims.length;++o)if(!E.isInteger(t.dims[o])&&!(t.dims[o]&&E.isInteger(t.dims[o].low)&&E.isInteger(t.dims[o].high)))return"dims: integer|Long[] expected"}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&!E.isInteger(t.dataType))return"dataType: integer expected";if(t.segment!=null&&t.hasOwnProperty("segment")){var i=S.onnx.TensorProto.Segment.verify(t.segment);if(i)return"segment."+i}if(t.floatData!=null&&t.hasOwnProperty("floatData")){if(!Array.isArray(t.floatData))return"floatData: array expected";for(var o=0;o<t.floatData.length;++o)if(typeof t.floatData[o]!="number")return"floatData: number[] expected"}if(t.int32Data!=null&&t.hasOwnProperty("int32Data")){if(!Array.isArray(t.int32Data))return"int32Data: array expected";for(var o=0;o<t.int32Data.length;++o)if(!E.isInteger(t.int32Data[o]))return"int32Data: integer[] expected"}if(t.stringData!=null&&t.hasOwnProperty("stringData")){if(!Array.isArray(t.stringData))return"stringData: array expected";for(var o=0;o<t.stringData.length;++o)if(!(t.stringData[o]&&typeof t.stringData[o].length=="number"||E.isString(t.stringData[o])))return"stringData: buffer[] expected"}if(t.int64Data!=null&&t.hasOwnProperty("int64Data")){if(!Array.isArray(t.int64Data))return"int64Data: array expected";for(var o=0;o<t.int64Data.length;++o)if(!E.isInteger(t.int64Data[o])&&!(t.int64Data[o]&&E.isInteger(t.int64Data[o].low)&&E.isInteger(t.int64Data[o].high)))return"int64Data: integer|Long[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!E.isString(t.name))return"name: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!E.isString(t.docString))return"docString: string expected";if(t.rawData!=null&&t.hasOwnProperty("rawData")&&!(t.rawData&&typeof t.rawData.length=="number"||E.isString(t.rawData)))return"rawData: buffer expected";if(t.externalData!=null&&t.hasOwnProperty("externalData")){if(!Array.isArray(t.externalData))return"externalData: array expected";for(var o=0;o<t.externalData.length;++o){var i=S.onnx.StringStringEntryProto.verify(t.externalData[o]);if(i)return"externalData."+i}}if(t.dataLocation!=null&&t.hasOwnProperty("dataLocation"))switch(t.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:break}if(t.doubleData!=null&&t.hasOwnProperty("doubleData")){if(!Array.isArray(t.doubleData))return"doubleData: array expected";for(var o=0;o<t.doubleData.length;++o)if(typeof t.doubleData[o]!="number")return"doubleData: number[] expected"}if(t.uint64Data!=null&&t.hasOwnProperty("uint64Data")){if(!Array.isArray(t.uint64Data))return"uint64Data: array expected";for(var o=0;o<t.uint64Data.length;++o)if(!E.isInteger(t.uint64Data[o])&&!(t.uint64Data[o]&&E.isInteger(t.uint64Data[o].low)&&E.isInteger(t.uint64Data[o].high)))return"uint64Data: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof S.onnx.TensorProto)return t;var o=new S.onnx.TensorProto;if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.TensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)E.Long?(o.dims[i]=E.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new E.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}if(t.dataType!=null&&(o.dataType=t.dataType|0),t.segment!=null){if(typeof t.segment!="object")throw TypeError(".onnx.TensorProto.segment: object expected");o.segment=S.onnx.TensorProto.Segment.fromObject(t.segment)}if(t.floatData){if(!Array.isArray(t.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");o.floatData=[];for(var i=0;i<t.floatData.length;++i)o.floatData[i]=Number(t.floatData[i])}if(t.int32Data){if(!Array.isArray(t.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");o.int32Data=[];for(var i=0;i<t.int32Data.length;++i)o.int32Data[i]=t.int32Data[i]|0}if(t.stringData){if(!Array.isArray(t.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");o.stringData=[];for(var i=0;i<t.stringData.length;++i)typeof t.stringData[i]=="string"?E.base64.decode(t.stringData[i],o.stringData[i]=E.newBuffer(E.base64.length(t.stringData[i])),0):t.stringData[i].length>=0&&(o.stringData[i]=t.stringData[i])}if(t.int64Data){if(!Array.isArray(t.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");o.int64Data=[];for(var i=0;i<t.int64Data.length;++i)E.Long?(o.int64Data[i]=E.Long.fromValue(t.int64Data[i])).unsigned=!1:typeof t.int64Data[i]=="string"?o.int64Data[i]=parseInt(t.int64Data[i],10):typeof t.int64Data[i]=="number"?o.int64Data[i]=t.int64Data[i]:typeof t.int64Data[i]=="object"&&(o.int64Data[i]=new E.LongBits(t.int64Data[i].low>>>0,t.int64Data[i].high>>>0).toNumber())}if(t.name!=null&&(o.name=String(t.name)),t.docString!=null&&(o.docString=String(t.docString)),t.rawData!=null&&(typeof t.rawData=="string"?E.base64.decode(t.rawData,o.rawData=E.newBuffer(E.base64.length(t.rawData)),0):t.rawData.length>=0&&(o.rawData=t.rawData)),t.externalData){if(!Array.isArray(t.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");o.externalData=[];for(var i=0;i<t.externalData.length;++i){if(typeof t.externalData[i]!="object")throw TypeError(".onnx.TensorProto.externalData: object expected");o.externalData[i]=S.onnx.StringStringEntryProto.fromObject(t.externalData[i])}}switch(t.dataLocation){default:if(typeof t.dataLocation=="number"){o.dataLocation=t.dataLocation;break}break;case"DEFAULT":case 0:o.dataLocation=0;break;case"EXTERNAL":case 1:o.dataLocation=1;break}if(t.doubleData){if(!Array.isArray(t.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");o.doubleData=[];for(var i=0;i<t.doubleData.length;++i)o.doubleData[i]=Number(t.doubleData[i])}if(t.uint64Data){if(!Array.isArray(t.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");o.uint64Data=[];for(var i=0;i<t.uint64Data.length;++i)E.Long?(o.uint64Data[i]=E.Long.fromValue(t.uint64Data[i])).unsigned=!0:typeof t.uint64Data[i]=="string"?o.uint64Data[i]=parseInt(t.uint64Data[i],10):typeof t.uint64Data[i]=="number"?o.uint64Data[i]=t.uint64Data[i]:typeof t.uint64Data[i]=="object"&&(o.uint64Data[i]=new E.LongBits(t.uint64Data[i].low>>>0,t.uint64Data[i].high>>>0).toNumber(!0))}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[],i.floatData=[],i.int32Data=[],i.stringData=[],i.int64Data=[],i.doubleData=[],i.uint64Data=[],i.externalData=[]),o.defaults&&(i.dataType=0,i.segment=null,i.name="",o.bytes===String?i.rawData="":(i.rawData=[],o.bytes!==Array&&(i.rawData=E.newBuffer(i.rawData))),i.docString="",i.dataLocation=o.enums===String?"DEFAULT":0),t.dims&&t.dims.length){i.dims=[];for(var a=0;a<t.dims.length;++a)typeof t.dims[a]=="number"?i.dims[a]=o.longs===String?String(t.dims[a]):t.dims[a]:i.dims[a]=o.longs===String?E.Long.prototype.toString.call(t.dims[a]):o.longs===Number?new E.LongBits(t.dims[a].low>>>0,t.dims[a].high>>>0).toNumber():t.dims[a]}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&(i.dataType=t.dataType),t.segment!=null&&t.hasOwnProperty("segment")&&(i.segment=S.onnx.TensorProto.Segment.toObject(t.segment,o)),t.floatData&&t.floatData.length){i.floatData=[];for(var a=0;a<t.floatData.length;++a)i.floatData[a]=o.json&&!isFinite(t.floatData[a])?String(t.floatData[a]):t.floatData[a]}if(t.int32Data&&t.int32Data.length){i.int32Data=[];for(var a=0;a<t.int32Data.length;++a)i.int32Data[a]=t.int32Data[a]}if(t.stringData&&t.stringData.length){i.stringData=[];for(var a=0;a<t.stringData.length;++a)i.stringData[a]=o.bytes===String?E.base64.encode(t.stringData[a],0,t.stringData[a].length):o.bytes===Array?Array.prototype.slice.call(t.stringData[a]):t.stringData[a]}if(t.int64Data&&t.int64Data.length){i.int64Data=[];for(var a=0;a<t.int64Data.length;++a)typeof t.int64Data[a]=="number"?i.int64Data[a]=o.longs===String?String(t.int64Data[a]):t.int64Data[a]:i.int64Data[a]=o.longs===String?E.Long.prototype.toString.call(t.int64Data[a]):o.longs===Number?new E.LongBits(t.int64Data[a].low>>>0,t.int64Data[a].high>>>0).toNumber():t.int64Data[a]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.rawData!=null&&t.hasOwnProperty("rawData")&&(i.rawData=o.bytes===String?E.base64.encode(t.rawData,0,t.rawData.length):o.bytes===Array?Array.prototype.slice.call(t.rawData):t.rawData),t.doubleData&&t.doubleData.length){i.doubleData=[];for(var a=0;a<t.doubleData.length;++a)i.doubleData[a]=o.json&&!isFinite(t.doubleData[a])?String(t.doubleData[a]):t.doubleData[a]}if(t.uint64Data&&t.uint64Data.length){i.uint64Data=[];for(var a=0;a<t.uint64Data.length;++a)typeof t.uint64Data[a]=="number"?i.uint64Data[a]=o.longs===String?String(t.uint64Data[a]):t.uint64Data[a]:i.uint64Data[a]=o.longs===String?E.Long.prototype.toString.call(t.uint64Data[a]):o.longs===Number?new E.LongBits(t.uint64Data[a].low>>>0,t.uint64Data[a].high>>>0).toNumber(!0):t.uint64Data[a]}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.externalData&&t.externalData.length){i.externalData=[];for(var a=0;a<t.externalData.length;++a)i.externalData[a]=S.onnx.StringStringEntryProto.toObject(t.externalData[a],o)}return t.dataLocation!=null&&t.hasOwnProperty("dataLocation")&&(i.dataLocation=o.enums===String?S.onnx.TensorProto.DataLocation[t.dataLocation]===void 0?t.dataLocation:S.onnx.TensorProto.DataLocation[t.dataLocation]:t.dataLocation),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,We.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorProto"},e.DataType=function(){var r={},t=Object.create(r);return t[r[0]="UNDEFINED"]=0,t[r[1]="FLOAT"]=1,t[r[2]="UINT8"]=2,t[r[3]="INT8"]=3,t[r[4]="UINT16"]=4,t[r[5]="INT16"]=5,t[r[6]="INT32"]=6,t[r[7]="INT64"]=7,t[r[8]="STRING"]=8,t[r[9]="BOOL"]=9,t[r[10]="FLOAT16"]=10,t[r[11]="DOUBLE"]=11,t[r[12]="UINT32"]=12,t[r[13]="UINT64"]=13,t[r[14]="COMPLEX64"]=14,t[r[15]="COMPLEX128"]=15,t[r[16]="BFLOAT16"]=16,t[r[17]="FLOAT8E4M3FN"]=17,t[r[18]="FLOAT8E4M3FNUZ"]=18,t[r[19]="FLOAT8E5M2"]=19,t[r[20]="FLOAT8E5M2FNUZ"]=20,t}(),e.Segment=function(){function r(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}return r.prototype.begin=E.Long?E.Long.fromBits(0,0,!1):0,r.prototype.end=E.Long?E.Long.fromBits(0,0,!1):0,r.create=function(o){return new r(o)},r.encode=function(o,i){return i||(i=tt.create()),o.begin!=null&&Object.hasOwnProperty.call(o,"begin")&&i.uint32(8).int64(o.begin),o.end!=null&&Object.hasOwnProperty.call(o,"end")&&i.uint32(16).int64(o.end),i},r.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},r.decode=function(o,i){o instanceof j||(o=j.create(o));for(var a=i===void 0?o.len:o.pos+i,s=new S.onnx.TensorProto.Segment;o.pos<a;){var u=o.uint32();switch(u>>>3){case 1:{s.begin=o.int64();break}case 2:{s.end=o.int64();break}default:o.skipType(u&7);break}}return s},r.decodeDelimited=function(o){return o instanceof j||(o=new j(o)),this.decode(o,o.uint32())},r.verify=function(o){return typeof o!="object"||o===null?"object expected":o.begin!=null&&o.hasOwnProperty("begin")&&!E.isInteger(o.begin)&&!(o.begin&&E.isInteger(o.begin.low)&&E.isInteger(o.begin.high))?"begin: integer|Long expected":o.end!=null&&o.hasOwnProperty("end")&&!E.isInteger(o.end)&&!(o.end&&E.isInteger(o.end.low)&&E.isInteger(o.end.high))?"end: integer|Long expected":null},r.fromObject=function(o){if(o instanceof S.onnx.TensorProto.Segment)return o;var i=new S.onnx.TensorProto.Segment;return o.begin!=null&&(E.Long?(i.begin=E.Long.fromValue(o.begin)).unsigned=!1:typeof o.begin=="string"?i.begin=parseInt(o.begin,10):typeof o.begin=="number"?i.begin=o.begin:typeof o.begin=="object"&&(i.begin=new E.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber())),o.end!=null&&(E.Long?(i.end=E.Long.fromValue(o.end)).unsigned=!1:typeof o.end=="string"?i.end=parseInt(o.end,10):typeof o.end=="number"?i.end=o.end:typeof o.end=="object"&&(i.end=new E.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber())),i},r.toObject=function(o,i){i||(i={});var a={};if(i.defaults){if(E.Long){var s=new E.Long(0,0,!1);a.begin=i.longs===String?s.toString():i.longs===Number?s.toNumber():s}else a.begin=i.longs===String?"0":0;if(E.Long){var s=new E.Long(0,0,!1);a.end=i.longs===String?s.toString():i.longs===Number?s.toNumber():s}else a.end=i.longs===String?"0":0}return o.begin!=null&&o.hasOwnProperty("begin")&&(typeof o.begin=="number"?a.begin=i.longs===String?String(o.begin):o.begin:a.begin=i.longs===String?E.Long.prototype.toString.call(o.begin):i.longs===Number?new E.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber():o.begin),o.end!=null&&o.hasOwnProperty("end")&&(typeof o.end=="number"?a.end=i.longs===String?String(o.end):o.end:a.end=i.longs===String?E.Long.prototype.toString.call(o.end):i.longs===Number?new E.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber():o.end),a},r.prototype.toJSON=function(){return this.constructor.toObject(this,We.util.toJSONOptions)},r.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TensorProto.Segment"},r}(),e.DataLocation=function(){var r={},t=Object.create(r);return t[r[0]="DEFAULT"]=0,t[r[1]="EXTERNAL"]=1,t}(),e}(),n.SparseTensorProto=function(){function e(r){if(this.dims=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.values=null,e.prototype.indices=null,e.prototype.dims=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=tt.create()),t.values!=null&&Object.hasOwnProperty.call(t,"values")&&S.onnx.TensorProto.encode(t.values,o.uint32(10).fork()).ldelim(),t.indices!=null&&Object.hasOwnProperty.call(t,"indices")&&S.onnx.TensorProto.encode(t.indices,o.uint32(18).fork()).ldelim(),t.dims!=null&&t.dims.length){o.uint32(26).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.SparseTensorProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.values=S.onnx.TensorProto.decode(t,t.uint32());break}case 2:{a.indices=S.onnx.TensorProto.decode(t,t.uint32());break}case 3:{if(a.dims&&a.dims.length||(a.dims=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.dims.push(t.int64());else a.dims.push(t.int64());break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.values!=null&&t.hasOwnProperty("values")){var o=S.onnx.TensorProto.verify(t.values);if(o)return"values."+o}if(t.indices!=null&&t.hasOwnProperty("indices")){var o=S.onnx.TensorProto.verify(t.indices);if(o)return"indices."+o}if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var i=0;i<t.dims.length;++i)if(!E.isInteger(t.dims[i])&&!(t.dims[i]&&E.isInteger(t.dims[i].low)&&E.isInteger(t.dims[i].high)))return"dims: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof S.onnx.SparseTensorProto)return t;var o=new S.onnx.SparseTensorProto;if(t.values!=null){if(typeof t.values!="object")throw TypeError(".onnx.SparseTensorProto.values: object expected");o.values=S.onnx.TensorProto.fromObject(t.values)}if(t.indices!=null){if(typeof t.indices!="object")throw TypeError(".onnx.SparseTensorProto.indices: object expected");o.indices=S.onnx.TensorProto.fromObject(t.indices)}if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)E.Long?(o.dims[i]=E.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new E.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[]),o.defaults&&(i.values=null,i.indices=null),t.values!=null&&t.hasOwnProperty("values")&&(i.values=S.onnx.TensorProto.toObject(t.values,o)),t.indices!=null&&t.hasOwnProperty("indices")&&(i.indices=S.onnx.TensorProto.toObject(t.indices,o)),t.dims&&t.dims.length){i.dims=[];for(var a=0;a<t.dims.length;++a)typeof t.dims[a]=="number"?i.dims[a]=o.longs===String?String(t.dims[a]):t.dims[a]:i.dims[a]=o.longs===String?E.Long.prototype.toString.call(t.dims[a]):o.longs===Number?new E.LongBits(t.dims[a].low>>>0,t.dims[a].high>>>0).toNumber():t.dims[a]}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,We.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.SparseTensorProto"},e}(),n.TensorShapeProto=function(){function e(r){if(this.dim=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.dim=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=tt.create()),t.dim!=null&&t.dim.length)for(var i=0;i<t.dim.length;++i)S.onnx.TensorShapeProto.Dimension.encode(t.dim[i],o.uint32(10).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.TensorShapeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.dim&&a.dim.length||(a.dim=[]),a.dim.push(S.onnx.TensorShapeProto.Dimension.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dim!=null&&t.hasOwnProperty("dim")){if(!Array.isArray(t.dim))return"dim: array expected";for(var o=0;o<t.dim.length;++o){var i=S.onnx.TensorShapeProto.Dimension.verify(t.dim[o]);if(i)return"dim."+i}}return null},e.fromObject=function(t){if(t instanceof S.onnx.TensorShapeProto)return t;var o=new S.onnx.TensorShapeProto;if(t.dim){if(!Array.isArray(t.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");o.dim=[];for(var i=0;i<t.dim.length;++i){if(typeof t.dim[i]!="object")throw TypeError(".onnx.TensorShapeProto.dim: object expected");o.dim[i]=S.onnx.TensorShapeProto.Dimension.fromObject(t.dim[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dim=[]),t.dim&&t.dim.length){i.dim=[];for(var a=0;a<t.dim.length;++a)i.dim[a]=S.onnx.TensorShapeProto.Dimension.toObject(t.dim[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,We.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorShapeProto"},e.Dimension=function(){function r(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}r.prototype.dimValue=null,r.prototype.dimParam=null,r.prototype.denotation="";var t;return Object.defineProperty(r.prototype,"value",{get:E.oneOfGetter(t=["dimValue","dimParam"]),set:E.oneOfSetter(t)}),r.create=function(i){return new r(i)},r.encode=function(i,a){return a||(a=tt.create()),i.dimValue!=null&&Object.hasOwnProperty.call(i,"dimValue")&&a.uint32(8).int64(i.dimValue),i.dimParam!=null&&Object.hasOwnProperty.call(i,"dimParam")&&a.uint32(18).string(i.dimParam),i.denotation!=null&&Object.hasOwnProperty.call(i,"denotation")&&a.uint32(26).string(i.denotation),a},r.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},r.decode=function(i,a){i instanceof j||(i=j.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TensorShapeProto.Dimension;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.dimValue=i.int64();break}case 2:{u.dimParam=i.string();break}case 3:{u.denotation=i.string();break}default:i.skipType(l&7);break}}return u},r.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},r.verify=function(i){if(typeof i!="object"||i===null)return"object expected";var a={};if(i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(a.value=1,!E.isInteger(i.dimValue)&&!(i.dimValue&&E.isInteger(i.dimValue.low)&&E.isInteger(i.dimValue.high))))return"dimValue: integer|Long expected";if(i.dimParam!=null&&i.hasOwnProperty("dimParam")){if(a.value===1)return"value: multiple values";if(a.value=1,!E.isString(i.dimParam))return"dimParam: string expected"}return i.denotation!=null&&i.hasOwnProperty("denotation")&&!E.isString(i.denotation)?"denotation: string expected":null},r.fromObject=function(i){if(i instanceof S.onnx.TensorShapeProto.Dimension)return i;var a=new S.onnx.TensorShapeProto.Dimension;return i.dimValue!=null&&(E.Long?(a.dimValue=E.Long.fromValue(i.dimValue)).unsigned=!1:typeof i.dimValue=="string"?a.dimValue=parseInt(i.dimValue,10):typeof i.dimValue=="number"?a.dimValue=i.dimValue:typeof i.dimValue=="object"&&(a.dimValue=new E.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber())),i.dimParam!=null&&(a.dimParam=String(i.dimParam)),i.denotation!=null&&(a.denotation=String(i.denotation)),a},r.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.denotation=""),i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(typeof i.dimValue=="number"?s.dimValue=a.longs===String?String(i.dimValue):i.dimValue:s.dimValue=a.longs===String?E.Long.prototype.toString.call(i.dimValue):a.longs===Number?new E.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber():i.dimValue,a.oneofs&&(s.value="dimValue")),i.dimParam!=null&&i.hasOwnProperty("dimParam")&&(s.dimParam=i.dimParam,a.oneofs&&(s.value="dimParam")),i.denotation!=null&&i.hasOwnProperty("denotation")&&(s.denotation=i.denotation),s},r.prototype.toJSON=function(){return this.constructor.toObject(this,We.util.toJSONOptions)},r.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TensorShapeProto.Dimension"},r}(),e}(),n.TypeProto=function(){function e(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}e.prototype.tensorType=null,e.prototype.sequenceType=null,e.prototype.mapType=null,e.prototype.optionalType=null,e.prototype.sparseTensorType=null,e.prototype.denotation="";var r;return Object.defineProperty(e.prototype,"value",{get:E.oneOfGetter(r=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:E.oneOfSetter(r)}),e.create=function(o){return new e(o)},e.encode=function(o,i){return i||(i=tt.create()),o.tensorType!=null&&Object.hasOwnProperty.call(o,"tensorType")&&S.onnx.TypeProto.Tensor.encode(o.tensorType,i.uint32(10).fork()).ldelim(),o.sequenceType!=null&&Object.hasOwnProperty.call(o,"sequenceType")&&S.onnx.TypeProto.Sequence.encode(o.sequenceType,i.uint32(34).fork()).ldelim(),o.mapType!=null&&Object.hasOwnProperty.call(o,"mapType")&&S.onnx.TypeProto.Map.encode(o.mapType,i.uint32(42).fork()).ldelim(),o.denotation!=null&&Object.hasOwnProperty.call(o,"denotation")&&i.uint32(50).string(o.denotation),o.sparseTensorType!=null&&Object.hasOwnProperty.call(o,"sparseTensorType")&&S.onnx.TypeProto.SparseTensor.encode(o.sparseTensorType,i.uint32(66).fork()).ldelim(),o.optionalType!=null&&Object.hasOwnProperty.call(o,"optionalType")&&S.onnx.TypeProto.Optional.encode(o.optionalType,i.uint32(74).fork()).ldelim(),i},e.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},e.decode=function(o,i){o instanceof j||(o=j.create(o));for(var a=i===void 0?o.len:o.pos+i,s=new S.onnx.TypeProto;o.pos<a;){var u=o.uint32();switch(u>>>3){case 1:{s.tensorType=S.onnx.TypeProto.Tensor.decode(o,o.uint32());break}case 4:{s.sequenceType=S.onnx.TypeProto.Sequence.decode(o,o.uint32());break}case 5:{s.mapType=S.onnx.TypeProto.Map.decode(o,o.uint32());break}case 9:{s.optionalType=S.onnx.TypeProto.Optional.decode(o,o.uint32());break}case 8:{s.sparseTensorType=S.onnx.TypeProto.SparseTensor.decode(o,o.uint32());break}case 6:{s.denotation=o.string();break}default:o.skipType(u&7);break}}return s},e.decodeDelimited=function(o){return o instanceof j||(o=new j(o)),this.decode(o,o.uint32())},e.verify=function(o){if(typeof o!="object"||o===null)return"object expected";var i={};if(o.tensorType!=null&&o.hasOwnProperty("tensorType")){i.value=1;{var a=S.onnx.TypeProto.Tensor.verify(o.tensorType);if(a)return"tensorType."+a}}if(o.sequenceType!=null&&o.hasOwnProperty("sequenceType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=S.onnx.TypeProto.Sequence.verify(o.sequenceType);if(a)return"sequenceType."+a}}if(o.mapType!=null&&o.hasOwnProperty("mapType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=S.onnx.TypeProto.Map.verify(o.mapType);if(a)return"mapType."+a}}if(o.optionalType!=null&&o.hasOwnProperty("optionalType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=S.onnx.TypeProto.Optional.verify(o.optionalType);if(a)return"optionalType."+a}}if(o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=S.onnx.TypeProto.SparseTensor.verify(o.sparseTensorType);if(a)return"sparseTensorType."+a}}return o.denotation!=null&&o.hasOwnProperty("denotation")&&!E.isString(o.denotation)?"denotation: string expected":null},e.fromObject=function(o){if(o instanceof S.onnx.TypeProto)return o;var i=new S.onnx.TypeProto;if(o.tensorType!=null){if(typeof o.tensorType!="object")throw TypeError(".onnx.TypeProto.tensorType: object expected");i.tensorType=S.onnx.TypeProto.Tensor.fromObject(o.tensorType)}if(o.sequenceType!=null){if(typeof o.sequenceType!="object")throw TypeError(".onnx.TypeProto.sequenceType: object expected");i.sequenceType=S.onnx.TypeProto.Sequence.fromObject(o.sequenceType)}if(o.mapType!=null){if(typeof o.mapType!="object")throw TypeError(".onnx.TypeProto.mapType: object expected");i.mapType=S.onnx.TypeProto.Map.fromObject(o.mapType)}if(o.optionalType!=null){if(typeof o.optionalType!="object")throw TypeError(".onnx.TypeProto.optionalType: object expected");i.optionalType=S.onnx.TypeProto.Optional.fromObject(o.optionalType)}if(o.sparseTensorType!=null){if(typeof o.sparseTensorType!="object")throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");i.sparseTensorType=S.onnx.TypeProto.SparseTensor.fromObject(o.sparseTensorType)}return o.denotation!=null&&(i.denotation=String(o.denotation)),i},e.toObject=function(o,i){i||(i={});var a={};return i.defaults&&(a.denotation=""),o.tensorType!=null&&o.hasOwnProperty("tensorType")&&(a.tensorType=S.onnx.TypeProto.Tensor.toObject(o.tensorType,i),i.oneofs&&(a.value="tensorType")),o.sequenceType!=null&&o.hasOwnProperty("sequenceType")&&(a.sequenceType=S.onnx.TypeProto.Sequence.toObject(o.sequenceType,i),i.oneofs&&(a.value="sequenceType")),o.mapType!=null&&o.hasOwnProperty("mapType")&&(a.mapType=S.onnx.TypeProto.Map.toObject(o.mapType,i),i.oneofs&&(a.value="mapType")),o.denotation!=null&&o.hasOwnProperty("denotation")&&(a.denotation=o.denotation),o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")&&(a.sparseTensorType=S.onnx.TypeProto.SparseTensor.toObject(o.sparseTensorType,i),i.oneofs&&(a.value="sparseTensorType")),o.optionalType!=null&&o.hasOwnProperty("optionalType")&&(a.optionalType=S.onnx.TypeProto.Optional.toObject(o.optionalType,i),i.oneofs&&(a.value="optionalType")),a},e.prototype.toJSON=function(){return this.constructor.toObject(this,We.util.toJSONOptions)},e.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TypeProto"},e.Tensor=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=tt.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&a.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&S.onnx.TensorShapeProto.encode(i.shape,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof j||(i=j.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TypeProto.Tensor;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=S.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!E.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var a=S.onnx.TensorShapeProto.verify(i.shape);if(a)return"shape."+a}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Tensor)return i;var a=new S.onnx.TypeProto.Tensor;if(i.elemType!=null&&(a.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");a.shape=S.onnx.TensorShapeProto.fromObject(i.shape)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=0,s.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(s.shape=S.onnx.TensorShapeProto.toObject(i.shape,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,We.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Tensor"},t}(),e.Sequence=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=tt.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&S.onnx.TypeProto.encode(i.elemType,a.uint32(10).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof j||(i=j.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TypeProto.Sequence;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=S.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var a=S.onnx.TypeProto.verify(i.elemType);if(a)return"elemType."+a}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Sequence)return i;var a=new S.onnx.TypeProto.Sequence;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");a.elemType=S.onnx.TypeProto.fromObject(i.elemType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=S.onnx.TypeProto.toObject(i.elemType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,We.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Sequence"},t}(),e.Map=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.keyType=0,t.prototype.valueType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=tt.create()),i.keyType!=null&&Object.hasOwnProperty.call(i,"keyType")&&a.uint32(8).int32(i.keyType),i.valueType!=null&&Object.hasOwnProperty.call(i,"valueType")&&S.onnx.TypeProto.encode(i.valueType,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof j||(i=j.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TypeProto.Map;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.keyType=i.int32();break}case 2:{u.valueType=S.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.keyType!=null&&i.hasOwnProperty("keyType")&&!E.isInteger(i.keyType))return"keyType: integer expected";if(i.valueType!=null&&i.hasOwnProperty("valueType")){var a=S.onnx.TypeProto.verify(i.valueType);if(a)return"valueType."+a}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Map)return i;var a=new S.onnx.TypeProto.Map;if(i.keyType!=null&&(a.keyType=i.keyType|0),i.valueType!=null){if(typeof i.valueType!="object")throw TypeError(".onnx.TypeProto.Map.valueType: object expected");a.valueType=S.onnx.TypeProto.fromObject(i.valueType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.keyType=0,s.valueType=null),i.keyType!=null&&i.hasOwnProperty("keyType")&&(s.keyType=i.keyType),i.valueType!=null&&i.hasOwnProperty("valueType")&&(s.valueType=S.onnx.TypeProto.toObject(i.valueType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,We.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Map"},t}(),e.Optional=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=tt.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&S.onnx.TypeProto.encode(i.elemType,a.uint32(10).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof j||(i=j.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TypeProto.Optional;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=S.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var a=S.onnx.TypeProto.verify(i.elemType);if(a)return"elemType."+a}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.Optional)return i;var a=new S.onnx.TypeProto.Optional;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");a.elemType=S.onnx.TypeProto.fromObject(i.elemType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=S.onnx.TypeProto.toObject(i.elemType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,We.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Optional"},t}(),e.SparseTensor=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=tt.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&a.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&S.onnx.TensorShapeProto.encode(i.shape,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof j||(i=j.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new S.onnx.TypeProto.SparseTensor;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=S.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!E.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var a=S.onnx.TensorShapeProto.verify(i.shape);if(a)return"shape."+a}return null},t.fromObject=function(i){if(i instanceof S.onnx.TypeProto.SparseTensor)return i;var a=new S.onnx.TypeProto.SparseTensor;if(i.elemType!=null&&(a.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");a.shape=S.onnx.TensorShapeProto.fromObject(i.shape)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=0,s.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(s.shape=S.onnx.TensorShapeProto.toObject(i.shape,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,We.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.SparseTensor"},t}(),e}(),n.OperatorSetIdProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.domain="",e.prototype.version=E.Long?E.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=tt.create()),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(10).string(t.domain),t.version!=null&&Object.hasOwnProperty.call(t,"version")&&o.uint32(16).int64(t.version),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.OperatorSetIdProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.domain=t.string();break}case 2:{a.version=t.int64();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.domain!=null&&t.hasOwnProperty("domain")&&!E.isString(t.domain)?"domain: string expected":t.version!=null&&t.hasOwnProperty("version")&&!E.isInteger(t.version)&&!(t.version&&E.isInteger(t.version.low)&&E.isInteger(t.version.high))?"version: integer|Long expected":null},e.fromObject=function(t){if(t instanceof S.onnx.OperatorSetIdProto)return t;var o=new S.onnx.OperatorSetIdProto;return t.domain!=null&&(o.domain=String(t.domain)),t.version!=null&&(E.Long?(o.version=E.Long.fromValue(t.version)).unsigned=!1:typeof t.version=="string"?o.version=parseInt(t.version,10):typeof t.version=="number"?o.version=t.version:typeof t.version=="object"&&(o.version=new E.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber())),o},e.toObject=function(t,o){o||(o={});var i={};if(o.defaults)if(i.domain="",E.Long){var a=new E.Long(0,0,!1);i.version=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.version=o.longs===String?"0":0;return t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.version!=null&&t.hasOwnProperty("version")&&(typeof t.version=="number"?i.version=o.longs===String?String(t.version):t.version:i.version=o.longs===String?E.Long.prototype.toString.call(t.version):o.longs===Number?new E.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber():t.version),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,We.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.OperatorSetIdProto"},e}(),n.OperatorStatus=function(){var e={},r=Object.create(e);return r[e[0]="EXPERIMENTAL"]=0,r[e[1]="STABLE"]=1,r}(),n.FunctionProto=function(){function e(r){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.input=E.emptyArray,e.prototype.output=E.emptyArray,e.prototype.attribute=E.emptyArray,e.prototype.attributeProto=E.emptyArray,e.prototype.node=E.emptyArray,e.prototype.docString="",e.prototype.opsetImport=E.emptyArray,e.prototype.domain="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=tt.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(34).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(42).string(t.output[i]);if(t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)o.uint32(50).string(t.attribute[i]);if(t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)S.onnx.NodeProto.encode(t.node[i],o.uint32(58).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(66).string(t.docString),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)S.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(74).fork()).ldelim();if(t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(82).string(t.domain),t.attributeProto!=null&&t.attributeProto.length)for(var i=0;i<t.attributeProto.length;++i)S.onnx.AttributeProto.encode(t.attributeProto[i],o.uint32(90).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new S.onnx.FunctionProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 4:{a.input&&a.input.length||(a.input=[]),a.input.push(t.string());break}case 5:{a.output&&a.output.length||(a.output=[]),a.output.push(t.string());break}case 6:{a.attribute&&a.attribute.length||(a.attribute=[]),a.attribute.push(t.string());break}case 11:{a.attributeProto&&a.attributeProto.length||(a.attributeProto=[]),a.attributeProto.push(S.onnx.AttributeProto.decode(t,t.uint32()));break}case 7:{a.node&&a.node.length||(a.node=[]),a.node.push(S.onnx.NodeProto.decode(t,t.uint32()));break}case 8:{a.docString=t.string();break}case 9:{a.opsetImport&&a.opsetImport.length||(a.opsetImport=[]),a.opsetImport.push(S.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 10:{a.domain=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!E.isString(t.name))return"name: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!E.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!E.isString(t.output[o]))return"output: string[] expected"}if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o)if(!E.isString(t.attribute[o]))return"attribute: string[] expected"}if(t.attributeProto!=null&&t.hasOwnProperty("attributeProto")){if(!Array.isArray(t.attributeProto))return"attributeProto: array expected";for(var o=0;o<t.attributeProto.length;++o){var i=S.onnx.AttributeProto.verify(t.attributeProto[o]);if(i)return"attributeProto."+i}}if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=S.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!E.isString(t.docString))return"docString: string expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=S.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}return t.domain!=null&&t.hasOwnProperty("domain")&&!E.isString(t.domain)?"domain: string expected":null},e.fromObject=function(t){if(t instanceof S.onnx.FunctionProto)return t;var o=new S.onnx.FunctionProto;if(t.name!=null&&(o.name=String(t.name)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.FunctionProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.FunctionProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i)o.attribute[i]=String(t.attribute[i])}if(t.attributeProto){if(!Array.isArray(t.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");o.attributeProto=[];for(var i=0;i<t.attributeProto.length;++i){if(typeof t.attributeProto[i]!="object")throw TypeError(".onnx.FunctionProto.attributeProto: object expected");o.attributeProto[i]=S.onnx.AttributeProto.fromObject(t.attributeProto[i])}}if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.FunctionProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.FunctionProto.node: object expected");o.node[i]=S.onnx.NodeProto.fromObject(t.node[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.FunctionProto.opsetImport: object expected");o.opsetImport[i]=S.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}return t.domain!=null&&(o.domain=String(t.domain)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[],i.node=[],i.opsetImport=[],i.attributeProto=[]),o.defaults&&(i.name="",i.docString="",i.domain=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=t.input[a]}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=t.output[a]}if(t.attribute&&t.attribute.length){i.attribute=[];for(var a=0;a<t.attribute.length;++a)i.attribute[a]=t.attribute[a]}if(t.node&&t.node.length){i.node=[];for(var a=0;a<t.node.length;++a)i.node[a]=S.onnx.NodeProto.toObject(t.node[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var a=0;a<t.opsetImport.length;++a)i.opsetImport[a]=S.onnx.OperatorSetIdProto.toObject(t.opsetImport[a],o)}if(t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.attributeProto&&t.attributeProto.length){i.attributeProto=[];for(var a=0;a<t.attributeProto.length;++a)i.attributeProto[a]=S.onnx.AttributeProto.toObject(t.attributeProto[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,We.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.FunctionProto"},e}(),n}();tm.exports=S});function Yn(n,e){if(!n)throw new Error(typeof e=="string"?e:e())}function Eo(n){return new TextDecoder().decode(n)}var He,Cn,yl,gt,Li,ht,xt,re,Po,Dn,kn,Nn,Re=N(()=>{"use strict";Fs();He=ye(Qn());Ln();Cn=class{static arraysEqual(e,r){if(e.length!==r.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!==r[t])return!1;return!0}},yl=class{static preprocessInputShapes(e,r){let t=e.length===1?[1,e[0]]:e,o=r.length===1?[r[0],1]:r;return[t,o]}static postprocessOutputShape(e,r,t){r===1&&e.splice(e.length-2,1),t===1&&e.pop()}static calcMatMulShape(e,r){return e[1]!==r[0]?void 0:[e[0],r[1]]}},gt=class n{static calcShape(e,r,t=!1){let o=e.length,i=r.length;if(o===0)return r;if(i===0)return e;let a=Math.max(e.length,r.length),s=new Array(a);if(t){if(o<2||i<2)return;let u=yl.calcMatMulShape([e[o-2],e[o-1]],[r[i-2],r[i-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=t?3:1;u<=a;u++){let l=o-u<0?1:e[o-u],c=i-u<0?1:r[i-u];if(l!==c&&l>1&&c>1)return;s[a-u]=Math.max(l,c)}return s}static index(e,r){let t=new Array(r.length);return n.fillIndex(e,r,t),t}static fillIndex(e,r,t){let o=e.length-r.length;for(let i=0;i<r.length;i++)t[i]=e[o+i]%r[i]}static calc(e,r,t,o,i){let a=n.calcShape(e.dims,r.dims);if(a){if(o&&!re.areEqual(a,e.dims))return;let s=re.size(a),u=o?e:new nt(a,i||e.type);if(a.length===0)u.set([],t(e.get([]),r.get([])));else{let l=new Array(a.length),c=new Array(e.dims.length),p=new Array(r.dims.length),h=0,m=0,g=!1,y=!1;e.dims.length===0&&(h=e.get([]),g=!0),r.dims.length===0&&(m=r.get([]),y=!0);let T;for(let w=0;w<s;w++){T=w;for(let x=a.length-1;x>=0;x--)l[x]=T%a[x],T=Math.floor(T/a[x]);g||(n.fillIndex(l,e.dims,c),h=e.get(c)),y||(n.fillIndex(l,r.dims,p),m=r.get(p)),u.set(l,t(h,m))}}return u}}static isValidBroadcast(e,r){let t=e.length,o=r.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==r[o-i])return!1;return!0}static getBroadcastDims(e,r){let t=e.length,o=[];for(let i=0;i<t;i++){let a=t-1-i,s=e[a]||1;(r[r.length-1-i]||1)>1&&s===1&&o.unshift(a)}return o}},Li=class{static getShapeOfGemmResult(e,r,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let a,s,u;r?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(i&&!gt.isValidBroadcast(i,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},ht=class n{static tensorDataTypeFromProto(e){switch(e){case He.onnx.TensorProto.DataType.INT8:return"int8";case He.onnx.TensorProto.DataType.UINT8:return"uint8";case He.onnx.TensorProto.DataType.BOOL:return"bool";case He.onnx.TensorProto.DataType.INT16:return"int16";case He.onnx.TensorProto.DataType.UINT16:return"uint16";case He.onnx.TensorProto.DataType.INT32:return"int32";case He.onnx.TensorProto.DataType.UINT32:return"uint32";case He.onnx.TensorProto.DataType.FLOAT:return"float32";case He.onnx.TensorProto.DataType.DOUBLE:return"float64";case He.onnx.TensorProto.DataType.STRING:return"string";case He.onnx.TensorProto.DataType.INT64:return"int32";case He.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw new Error(`unsupported data type: ${He.onnx.TensorProto.DataType[e]}`)}}static tensorDataTypeStringToEnum(e){switch(e){case"int8":return He.onnx.TensorProto.DataType.INT8;case"uint8":return He.onnx.TensorProto.DataType.UINT8;case"bool":return He.onnx.TensorProto.DataType.BOOL;case"int16":return He.onnx.TensorProto.DataType.INT16;case"uint16":return He.onnx.TensorProto.DataType.UINT16;case"int32":return He.onnx.TensorProto.DataType.INT32;case"uint32":return He.onnx.TensorProto.DataType.UINT32;case"float32":return He.onnx.TensorProto.DataType.FLOAT;case"float64":return He.onnx.TensorProto.DataType.DOUBLE;case"string":return He.onnx.TensorProto.DataType.STRING;case"int64":return He.onnx.TensorProto.DataType.INT64;case"uint64":return He.onnx.TensorProto.DataType.UINT64;default:throw new Error(`unsupported data type: ${e}`)}}static tensorDimsFromProto(e){return e.map(r=>ln.isLong(r)?r.toNumber():r)}static tensorValueTypeFromProto(e){return{tensorType:n.tensorDataTypeFromProto(e.elemType),shape:{dims:n.tensorDimsFromProto(e.shape.dim.map(r=>r.dimValue))}}}static tensorDimsFromORTFormat(e){let r=[];for(let t=0;t<e.dimsLength();t++)r.push(xt.longToNumber(e.dims(t)));return r}static tensorAttributesFromORTFormat(e){let r=[];for(let t=0;t<e.attributesLength();t++)r.push(e.attributes(t));return r}},xt=class{static longToNumber(e){return ln.isLong(e)?e.toNumber():typeof e=="bigint"?Number(e):e}static isLong(e){return ln.isLong(e)||typeof e=="bigint"}},re=class n{static size(e){return n.getSizeFromDimensionRange(e,0,e.length)}static sizeFromDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,r,e.length)}static sizeToDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,0,r)}static getSizeFromDimensionRange(e,r,t){let o=1;for(let i=r;i<t;i++){if(e[i]<=0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");o*=e[i]}return o}static computeStrides(e){let r=e.length;if(r===0)return[];if(r===1)return[1];let t=new Array(r);t[r-1]=1,t[r-2]=e[r-1];for(let o=r-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static transpose(e){return e.slice().reverse()}static indicesToOffset(e,r,t){t===void 0&&(t=e.length);let o=0;for(let i=0;i<t;++i)o+=r[i]*e[i];return o}static offsetToIndices(e,r){let t=r.length;if(t===0)return[];if(t===1)return[e*r[0]];let o=new Array(r.length);for(let i=0;i<o.length-1;++i)o[i]=Math.floor(e/r[i]),e-=o[i]*r[i];return o[o.length-1]=e,o}static normalizeAxis(e,r){if(e<-r&&e>=r)throw new Error("unsupported axis for this operation.");return e<0?e+r:e}static normalizeAxes(e,r){return e.map(t=>this.normalizeAxis(t,r))}static incrementIndex(e,r,t){if(r.length===0||e.length===0)throw new Error("Index incrementing unsupported for scalar Tensor");if(t===void 0)t=r.length;else if(t<=0||t>r.length)throw new Error("Incorrect axis to increment on");for(let o=t-1;o>=0&&(e[o]++,!(e[o]<r[o]));--o)e[o]=0}static calculateReshapedDims(e,r){if(r.length===0){if(e.length===0||n.size(e)===1)return[];throw new Error("cannot reshape to a scalar Tensor")}let t=r.length,o=new Array(t),i=-1,a=1;for(let u=0;u<t;u++){if(r[u]<-1)throw new Error("a dimension in shape hints cannot be less than -1");if(r[u]===-1){if(i!==-1)throw new Error("at most one dimension in shape hints can be -1");i=u}else{if(r[u]===0){if(u>=e.length)throw new Error("the dimension with value zero exceeds the dimension size of the input tensor");o[u]=e[u]}else o[u]=r[u];a*=o[u]}}let s=n.size(e);if(i!==-1){if(s%a!==0)throw new Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${e}] Output shape: [${r}]`);o[i]=s/a}else if(a!==s)throw new Error("reshapedDims and originalDims don't have matching sizes");return o}static sortBasedOnPerm(e,r){return r?r.map(t=>e[t]):e.slice().reverse()}static padShape(e,r){let t=e.length;return e.map((o,i)=>o+r[i]+r[i+t])}static areEqual(e,r){return e.length!==r.length?!1:e.every((t,o)=>t===r[o])}static validateDimsAndCalcSize(e){if(e.length>6)throw new TypeError("Only rank 0 to 6 is supported for tensor shape.");let r=1;for(let t of e){if(!Number.isInteger(t))throw new TypeError(`Invalid shape: ${t} is not an integer`);if(t<0||t>2147483647)throw new TypeError(`Invalid shape: length ${t} is not allowed`);r*=t}return r}static flattenShape(e,r){r<0&&(r+=e.length);let t=e.reduce((a,s)=>a*s,1),o=e.slice(r).reduce((a,s)=>a*s,1);return[t/o,o]}static squeezeShape(e,r){let t=new Array;r=n.normalizeAxes(r,e.length);for(let o=0;o<e.length;o++){let i=r.indexOf(o)>=0;if(i&&e[o]!==1)throw new Error("squeeze an axis of size different than 1");(r.length===0&&e[o]>1||r.length>0&&!i)&&t.push(e[o])}return t}static unsqueezeShape(e,r){let t=new Array(e.length+r.length);t.fill(0);for(let i=0;i<r.length;i++){let a=n.normalizeAxis(r[i],t.length);if(a>=t.length)throw new Error("'axes' has an out of range axis");if(t[a]!==0)throw new Error("'axes' has a duplicate axis");t[a]=1}let o=0;for(let i=0;i<t.length;i++)t[i]===0&&(t[i]=e[o++]);if(o!==e.length)throw new Error("the unsqueezed dimension could not be established");return t}},Po=class n{static splitShape(e,r,t,o){if(t.length===0){if(!o)throw new Error("need to know number of outputs when the 'split' attribute is not specified");n.determineSplit(e[r],o,t)}let i=[],a=[0];for(let s=0;s<t.length;++s){s!==0&&a.push(a[s-1]+t[s-1]);let u=e.slice();u[r]=t[s],i.push(u)}return[i,a]}static determineSplit(e,r,t){if(e%r!==0)throw new Error("cannot split tensor to equal sized parts");for(let o=0;o<r;++o)t.push(e/r)}},Dn=class n{static adjustPoolAttributes(e,r,t,o,i,a){if(!e&&t.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let s=0;s<r.length-2;s++)s>=t.length?t.push(r[s+2]):t[s]=r[s+2];for(let s=0;s<t.length;s++)if(s<o.length){if(o[s]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let s=0;s<t.length;s++)if(s<i.length){if(i[s]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let s=0;s<t.length*2;s++)if(s<a.length){if(a[s]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let s=0;s<t.length;s++){if(t[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[s]>=t[s]||a[s+t.length]>=t[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,r,t,o,i,a){if(a){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let s=0;s<e.length-2;s++)n.adjustPadAndReturnShape(e[s+2],r[s],t[s],o[s],i,s,s+e.length-2,a)}}static computePoolOutputShape(e,r,t,o,i,a,s){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return n.computeShapeHelper(e,r,u,t,o,i,a,s),u}static computeConvOutputShape(e,r,t,o,i,a,s){if(e.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],r[0]];return n.computeShapeHelper(!1,e,u,t,o,i,a,s),u}static computeShapeHelper(e,r,t,o,i,a,s,u){if(e)for(let l=0;l<r.length-2;l++)t.push(1);else for(let l=0;l<r.length-2;l++)t.push(n.adjustPadAndReturnShape(r[l+2],o[l],i[l],a[l],s,l,l+r.length-2,u))}static adjustPadAndReturnShape(e,r,t,o,i,a,s,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[a]=0,i[s]=0,Math.floor((e-l)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let p=((e+r-1)/r-1)*r+o-e;return i[a]=Math.floor(u==="SAME_LOWER"?(p+1)/2:p/2),i[s]=p-i[a],Math.floor((e+p-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[a]+i[s]-l)/r+1)}},kn=-34028234663852886e22,Nn=34028234663852886e22});function U$(n){switch(n){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw new Error(`cannot calculate sizeof() on type ${n}`)}}function rm(n){switch(n){case xe.onnx.TensorProto.DataType.UINT8:case xe.onnx.TensorProto.DataType.INT8:case xe.onnx.TensorProto.DataType.BOOL:return 1;case xe.onnx.TensorProto.DataType.UINT16:case xe.onnx.TensorProto.DataType.INT16:return 2;case xe.onnx.TensorProto.DataType.FLOAT:case xe.onnx.TensorProto.DataType.INT32:case xe.onnx.TensorProto.DataType.UINT32:return 4;case xe.onnx.TensorProto.DataType.INT64:case xe.onnx.TensorProto.DataType.DOUBLE:case xe.onnx.TensorProto.DataType.UINT64:return 8;default:throw new Error(`cannot calculate sizeof() on type ${xe.onnx.TensorProto.DataType[n]}`)}}function W$(n,e){return new(im(e))(n)}function im(n){switch(n){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw new Error("unspecified error")}}function _l(n,e){if(e===xe.onnx.TensorProto.DataType.INT64||e===Io.TensorDataType.INT64){if(n.greaterThanOrEqual(2147483648)||n.lessThan(-2147483648))throw new TypeError("int64 is not supported")}else if(e===xe.onnx.TensorProto.DataType.UINT32||e===Io.TensorDataType.UINT32||e===xe.onnx.TensorProto.DataType.UINT64||e===Io.TensorDataType.UINT64){if(n.greaterThanOrEqual(4294967296)||n.lessThan(0))throw new TypeError("uint64 is not supported")}else throw new TypeError(`not a LONG type: ${xe.onnx.TensorProto.DataType[e]}`);return n.toNumber()}function nm(n,e,r){switch(e){case xe.onnx.TensorProto.DataType.BOOL:case xe.onnx.TensorProto.DataType.UINT8:return n.getUint8(r);case xe.onnx.TensorProto.DataType.INT8:return n.getInt8(r);case xe.onnx.TensorProto.DataType.UINT16:return n.getUint16(r,!0);case xe.onnx.TensorProto.DataType.INT16:return n.getInt16(r,!0);case xe.onnx.TensorProto.DataType.FLOAT:return n.getFloat32(r,!0);case xe.onnx.TensorProto.DataType.INT32:return n.getInt32(r,!0);case xe.onnx.TensorProto.DataType.UINT32:return n.getUint32(r,!0);case xe.onnx.TensorProto.DataType.INT64:return _l(ln.fromBits(n.getUint32(r,!0),n.getUint32(r+4,!0),!1),e);case xe.onnx.TensorProto.DataType.DOUBLE:return n.getFloat64(r,!0);case xe.onnx.TensorProto.DataType.UINT64:return _l(ln.fromBits(n.getUint32(r,!0),n.getUint32(r+4,!0),!0),e);default:throw new Error(`cannot read from DataView for type ${xe.onnx.TensorProto.DataType[e]}`)}}var om,xe,nt,Ln=N(()=>{"use strict";om=ye(wf());Fs();So();xe=ye(Qn());Re();nt=class n{constructor(e,r,t,o,i,a=om.Guid.create()){this.dims=e;this.type=r;this.dataProvider=t;this.asyncDataProvider=o;this.cache=i;this.dataId=a;this.size=re.validateDimsAndCalcSize(e);let s=this.size,u=t===void 0&&o===void 0&&i===void 0;if(i!==void 0&&i.length!==s)throw new RangeError("Input dims doesn't match data length.");if(r==="string"){if(i!==void 0&&(!Array.isArray(i)||!i.every(l=>typeof l=="string")))throw new TypeError("cache should be a string array");u&&(this.cache=new Array(s))}else{if(i!==void 0){let l=im(r);if(!(i instanceof l))throw new TypeError(`cache should be type ${l.name}`)}if(u){let l=new ArrayBuffer(s*U$(r));this.cache=W$(l,r)}}}get data(){if(this.cache===void 0){let e=this.dataProvider(this.dataId);if(e.length!==this.size)throw new Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=e}return this.cache}get stringData(){if(this.type!=="string")throw new TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw new TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw new TypeError("data type is not float (float32, float64)")}}get numberData(){if(this.type!=="string")return this.data;throw new TypeError("type cannot be non-number (string)")}get(e){return this.data[re.indicesToOffset(e,this.strides)]}set(e,r){this.data[re.indicesToOffset(e,this.strides)]=r}async getData(){return this.cache===void 0&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=re.computeStrides(this.dims)),this._strides}static fromProto(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let r=ht.tensorDataTypeFromProto(e.dataType),t=ht.tensorDimsFromProto(e.dims),o=new n(t,r);if(r==="string")e.stringData.forEach((i,a)=>{o.data[a]=Eo(i)});else if(e.rawData&&typeof e.rawData.byteLength=="number"&&e.rawData.byteLength>0){let i=o.data,a=new DataView(e.rawData.buffer,e.rawData.byteOffset,e.rawData.byteLength),s=rm(e.dataType),u=e.rawData.byteLength/s;if(e.rawData.byteLength%s!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let c=nm(a,e.dataType,l*s);i[l]=c}}else{let i;switch(e.dataType){case xe.onnx.TensorProto.DataType.FLOAT:i=e.floatData;break;case xe.onnx.TensorProto.DataType.INT32:case xe.onnx.TensorProto.DataType.INT16:case xe.onnx.TensorProto.DataType.UINT16:case xe.onnx.TensorProto.DataType.INT8:case xe.onnx.TensorProto.DataType.UINT8:case xe.onnx.TensorProto.DataType.BOOL:i=e.int32Data;break;case xe.onnx.TensorProto.DataType.INT64:i=e.int64Data;break;case xe.onnx.TensorProto.DataType.DOUBLE:i=e.doubleData;break;case xe.onnx.TensorProto.DataType.UINT32:case xe.onnx.TensorProto.DataType.UINT64:i=e.uint64Data;break;default:throw new Error("unspecific error")}if(i==null)throw new Error("failed to populate data from a tensorproto value");let a=o.data;if(a.length!==i.length)throw new Error("array length mismatch");for(let s=0;s<i.length;s++){let u=i[s];ln.isLong(u)?a[s]=_l(u,e.dataType):a[s]=u}}return o}static fromData(e,r,t){return new n(r,t,void 0,void 0,e)}static fromOrtTensor(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let r=ht.tensorDimsFromORTFormat(e),t=ht.tensorDataTypeFromProto(e.dataType()),o=new n(r,t);if(t==="string")for(let i=0;i<e.stringDataLength();i++)o.data[i]=e.stringData(i);else if(e.rawDataArray()&&typeof e.rawDataLength()=="number"&&e.rawDataLength()>0){let i=o.data,a=new DataView(e.rawDataArray().buffer,e.rawDataArray().byteOffset,e.rawDataLength()),s=rm(e.dataType()),u=e.rawDataLength()/s;if(e.rawDataLength()%s!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let c=nm(a,e.dataType(),l*s);i[l]=c}}return o}}});function se(n){return n===1?H$:q$}function am(n){let e=se(n);return`${e.version}
      precision highp float;
      ${e.attribute} vec3 position;
      ${e.attribute} vec2 textureCoord;

      ${e.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function sm(n){let e=se(n);return`${e.version}
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

    `}function um(n,e){let r=se(n);return`
  void main() {
    int indices[${e}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${r.output} = result;
  }
  `}var H$,q$,Ze=N(()=>{"use strict";H$={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},q$={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}});var Ae=N(()=>{"use strict"});async function vl(n,e=t=>0,r){return new Promise((t,o)=>{let i=0,a=()=>{if(n()){t();return}i++;let s=e(i);if(r!=null&&i>=r){o();return}setTimeout(a,s)};a()})}function Ri(n){return Yn(typeof n<"u"&&n.length!==0,()=>"empty string found for sampler name"),"get"+n.charAt(0).toUpperCase()+n.slice(1)}function lm(n){return Yn(typeof n<"u"&&n.length!==0,()=>"empty string found for sampler name"),"get"+n.charAt(0).toUpperCase()+n.slice(1)+"AtOutCoords"}function eo(n,e){let r=JSON.parse(JSON.stringify(n));return r=e,r}function to(n,e){return e.map(r=>n[r]).join(", ")}function bt(n){if(n<=1)return"int";if(n===2)return"ivec2";if(n===3)return"ivec3";if(n===4)return"ivec4";if(n===5)return"ivec5";if(n===6)return"ivec6";throw Error(`GPU for rank ${n} is not yet supported`)}function jt(n=6){return["x","y","z","w","u","v"].slice(0,n)}var Nr=N(()=>{"use strict";Re()});function j$(n,e){return jt(e).map(r=>`${n}.${r}`)}function ro(n,e){return e===1?[n]:j$(n,e)}function Lr(){return`
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
  `}var Rn=N(()=>{"use strict";Nr()});function X$(n,e,r){if(n===0)return"false";if(n===1)return`rc > ${e[0]}`;let t="";for(let o=n-2;o<n;o++)t+=`${r[o]} >= ${e[o-n+2]}`,o<n-1&&(t+="||");return t}function Z$(n,e){let r=n.length;if(r===0)return"getA(), 0, 0, 0";if(r===1)return`getA(rc),
            rc + 1 >= ${n[0]} ? 0. : getA(rc + 1),
            0, 0`;let t="r, c",o="r, cp1",i="rp1, c",a="rp1, cp1",s="";if(r>2)for(let u=0;u<r-2;++u)s=s+`${e[u]},`;return`getA(${s}${t}),
          rEdge ? 0. : getA(${s}${i}),
          cEdge ? 0. : getA(${s}${o}),
          rEdge || cEdge ? 0. : getA(${s}${a})`}function J$(n,e,r,t){return n===0||n===1?"":`
    int r = ${e[n-2]};
    int c = ${e[n-1]};
    int rp1 = ${e[n-2]} + 1;
    int cp1 = ${e[n-1]} + 1;
    bool rEdge = rp1 >= ${t};
    bool cEdge = cp1 >= ${r};
    `}var cm,K$,dm,pm=N(()=>{"use strict";Ze();Ae();Nr();Rn();cm={name:"pack",inputNames:["A"],inputTypes:[1]},K$=(n,e)=>{let r=se(n.session.backend.glContext.version),t=e.dims,o=t.length,i=e.dims.length,a=bt(i),s=ro("rc",i),u=J$(i,s,t[t.length-2],t[t.length-1]),l;o===0?l=[1,1]:o===1?l=[t[0],1]:l=[t[i-1],t[i-2]];let c=X$(i,l,s),p=Z$(t,s),h=`
        void main() {
          ${a} rc = getOutputCoords();

          if(${c}) {
            ${r.output} = vec4(0);
          } else {
            ${u}

            ${r.output} = vec4(${p});
          }
        }
      `;return{...cm,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:2},shaderSource:h}},dm=(n,e)=>({...cm,get:()=>K$(n,e)})});function wl(n){if(n.length===0)return[1,1,1];let e=1;for(let r=0;r<n.length-2;++r)e*=n[r];return[e,n.length>1?n[n.length-2]:1,n[n.length-1]]}function hm(n,e){let r=!1;return n.length===0||e.length===0?r=!0:n.length<2||e.length<2?r=n[n.length-1]===e[e.length-1]:r=n[n.length-1]===e[e.length-1]&&n[n.length-2]===e[e.length-2],r}function eA(n){let e=re.computeStrides(n),r=["b","r","c"],t="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${e.map((i,a)=>{let s=`int ${r[a]} = ${t} / ${i}`,u=a===e.length-1?`int ${r[a+1]} = ${t} - ${r[a]} * ${i}`:`index -= ${r[a]} * ${i}`;return`${s}; ${u};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function tA(n){let e=re.computeStrides(n);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${e[0]} + coords.z * ${e[1]} + coords.y;
  }
`}var Q$,Y$,fm,mm=N(()=>{"use strict";Re();Ze();Ae();Rn();Q$=n=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${n}`}),Y$=(n,e,r,t)=>{let o=e.dims,i=t,a="";for(let l=0;l<4;l++){let c="";switch(l){case 0:c="outputCoords = rc;";break;case 1:c="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:c="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:c="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw new Error}a+=`
        ${c}
        ${l>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${l}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${l>0?"}":""}
      `}let s=se(n.session.backend.glContext.version),u=`
      ${eA(o)}
      ${tA(i)}
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
    `;return{...r,output:{dims:i,type:e.type,textureType:2},shaderSource:u,hasMain:!0}},fm=(n,e,r)=>{let t=Q$(r);return{...t,get:()=>Y$(n,e,t,r)}}});var xl,gm=N(()=>{"use strict";Ze();Ae();xl=(n,e)=>{let r=e.shape,t=se(n.session.backend.glContext.version),o=`
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
    }`,i={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:r,type:e.tensor.type,textureType:3},shaderSource:o,hasMain:!0};return n.executeProgram(i,[e.tensor])}});function nA(n,e){if(n===1)return"rc";let r="";for(let t=0;t<n;t++)r+=e[t],t<n-1&&(r+=",");return r}var bm,rA,ym,_m=N(()=>{"use strict";Ze();Ae();Nr();Rn();bm={name:"unpack",inputNames:["A"],inputTypes:[2]},rA=(n,e)=>{let r=e.dims.length,t=ro("rc",r),o=t.slice(-2),i=bt(r),a=Lr(),u=e.dims.length===0?"":nA(r,t),l=r<=1?"rc":`vec2(${o.join(",")})`,c=se(n.session.backend.glContext.version),p=`
    ${a}
    void main() {
      ${i} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${u});

       ${c.output} = vec4(getChannel(packedInput, ${l}), 0, 0, 0);
     }
   `;return{...bm,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:p}},ym=(n,e)=>({...bm,get:()=>rA(n,e)})});var zi,Co,Mi,Do=N(()=>{"use strict";Et();zi=class{constructor(e,r=1){if(r===1)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=r;else if(r===4)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=r;else throw new Error(`Invalid number of channels: ${r}`)}encode(e,r){let t,o;return e.constructor!==Float32Array&&(Be.warning("Encoder","data was not of type Float32; creating new Float32Array"),o=new Float32Array(e)),r*this.channelSize>e.length?(Be.warning("Encoder","Source data too small. Allocating larger array"),o=e,t=this.allocate(r*this.channelSize),o.forEach((i,a)=>t[a]=i)):(o=e,t=o),t}allocate(e){return new Float32Array(e*4)}decode(e,r){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,r):e.subarray(0,r)}},Co=class{constructor(e,r=1,t){if(r!==1&&r!==4)throw new Error(`Invalid number of channels: ${r}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=r,this.textureType=t||e.FLOAT}encode(e,r){let t=e;return this.channelSize===1&&(Be.verbose("Encoder","Exploding into a larger array"),t=this.allocate(r),e.forEach((o,i)=>t[i*4]=o)),t}allocate(e){return new Float32Array(e*4)}decode(e,r){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,r):e.subarray(0,r)}},Mi=class{constructor(e,r=1){this.channelSize=4;if(r===1)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=r;else if(r===4)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=r;else throw new Error(`Invalid number of channels: ${r}`)}encode(e,r){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,r){if(e instanceof Uint8Array)return e.subarray(0,r);throw new Error(`Invalid array type: ${e.constructor}`)}}});var ko,vm,Tl,wm=N(()=>{"use strict";Re();Ae();ko=(n,e,r)=>{let t=r===0||r===1?1:4,o=r===2,i=r===1||r===2,a=r===4?e.length-1:void 0,s=r===4?e.map((u,l)=>l===e.length-1?u*4:u):void 0;return Tl(n,e,t,s,{isPacked:o,reverseWH:i,breakAxis:a})},vm=(n,e,r)=>{let t=ko(n,e,r);return[t.width,t.height]},Tl=(n,e,r=1,t,o)=>{let i=!!(o&&o.isPacked),[a,s]=n.computeTextureWH(i&&t||e,o),u=e.length,l=e.slice(0);if(u===0&&(l=[1]),r===1)t=e;else if(i){if(r!==4)throw new Error("a packed texture must be 4-channel");t=e,u>0&&(l[u-1]=Math.ceil(l[u-1]/2)),u>1&&(l[u-2]=Math.ceil(l[u-2]/2))}else if(!t)throw new Error("Unpacked shape is needed when using channels > 1");return{width:a,height:s,channels:r,isPacked:i,shape:l,strides:re.computeStrides(l),unpackedShape:t,reversedWH:o&&o.reverseWH}}});var iA,Bi,Tm=N(()=>{"use strict";Et();Ln();Re();pm();mm();gm();_m();Do();wm();Ae();iA=(n,e)=>{let r=e.map(o=>`${o.unpackedShape.join(",")};${o.width}x${o.height}`).join("_"),t=n.name;return n.cacheHint&&(t+="["+n.cacheHint+"]"),t+=":"+r,t},Bi=class{constructor(e){this.session=e;this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,r){return vm(this.session.layoutStrategy,e,r)}executeProgram(e,r){if(r.length<e.inputNames.length)throw new Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw new Error("input names size does not match input types");let t=[];for(let l=0;l<e.inputNames.length;++l)t[l]=this.getOrCreateTextureData(r[l],e.inputTypes[l]);let o=iA(e,t),i=this.session.programManager.getArtifact(o),a=i?i.programInfo:typeof e.get=="function"?e.get():e,s=ko(this.session.layoutStrategy,a.output.dims,a.output.textureType),u=this.createTextureData(s,a.output.type);return i||(i=this.session.programManager.build(a,t,u),this.session.programManager.setArtifact(o,i)),this.runProgram(i,t,u),u}run(e,r){return this.executeProgram(e,r).tensor}runProgram(e,r,t){for(let o=0;o<r.length;++o)if(!!r[o].isPacked!=(e.programInfo.inputTypes[o]===2))throw new Error(`input[${o}] property packed inconsistent`);if(!!t.isPacked!=(e.programInfo.output.textureType===2))throw new Error("output property packed inconsistent");this.session.programManager.run(e,r,t)}getOrCreateTextureData(e,r){let t=this.getTextureData(e.dataId,r===2);if(!t&&(t=this.getTextureData(e.dataId,r!==2),t))return r===2?this.pack(t):this.unpack(t);if(!t){let o=ko(this.session.layoutStrategy,e.dims,r);if(r===4){let s=e.dims;if(s.length===4){let u=[s[0],Math.ceil(s[1]*s[2]*s[3]/4)],l=ko(this.session.layoutStrategy,u,r),c=e.numberData;if(s[1]*s[2]*s[3]%4!==0){let p=s[0],h=s[1]*s[2]*s[3],m=Math.ceil(h*1/4)*4,g=p*m;c=new Float32Array(g);for(let y=0;y<p;++y){let T=y*h,w=y*m+y%1*h;c.set(e.numberData.subarray(T,T+h),w)}}return this.createTextureData(l,e.type,c,e,1)}}if(r===2){let i=Tl(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),a=this.createTextureData(i,e.type,e.numberData,e,1);t=this.pack(a)}else t=this.createTextureData(o,e.type,e.numberData,e,1)}return t}createTextureDataFromLayoutBindTensor(e,r,t,o){return this.createTextureData(e,r,t,o,1)}createTextureData(e,r,t,o,i){Be.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let a=this.session.textureManager.createTextureFromLayout(r,e,t,i);return this.createTextureDataFromTexture(e,r,a,o)}reshapeUnpacked(e,r){let t=this.getOrCreateTextureData(e,0),o={channels:t.channels,height:t.height,width:t.width,shape:r.length!==0?r:[1],strides:re.computeStrides(r),unpackedShape:r};return this.createTextureDataFromTexture(o,e.type,t.texture).tensor}reshapePacked(e,r){let t=this.getOrCreateTextureData(e,2);if(hm(e.dims,r)){let l={channels:t.channels,height:t.height,width:t.width,shape:r.length!==0?r:[1],strides:re.computeStrides(r),unpackedShape:r,isPacked:!0};return this.createTextureDataFromTexture(l,e.type,t.texture).tensor}let o=wl(e.dims),i=wl(r),a=this.reshapePacked(e,o),s=this.run(fm(this,a,i),[a]);return this.reshapePacked(s,r)}cast(e,r){let t=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(t,r,t.texture).tensor}createTextureDataFromTexture(e,r,t,o,i){let a={...e,tensor:o||new nt(e.unpackedShape,r,s=>this.readTexture(a),async s=>this.readTextureAsync(a),void 0,i),texture:t};return this.setTextureData(a.tensor.dataId,a,e.isPacked),a}getTextureData(e,r=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,r):r?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,r,t=!1){this.session.isInitializer(e)?this.session.setTextureData(e,r,t):(t?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,r)}isTextureLayoutCached(e,r=!1){return!!this.getTextureData(e.dataId,r)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(xl(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(xl(this,e))}pack(e){return this.executeProgram(dm(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(ym(this,e.tensor),[e.tensor])}}});var Il,_e,ct=N(()=>{"use strict";Il=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},_e=n=>new Il(n)});var Im,Sm,$m,aA,sA,Am=N(()=>{"use strict";ct();Ze();Ae();Im={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},Sm=(n,e,r)=>(sA(e),[n.run({...Im,cacheHint:r.cacheKey,get:()=>aA(n,e,r)},e)]),$m=n=>{let e=n.attributes.getFloat("epsilon",1e-5),r=n.attributes.getFloat("momentum",.9),t=n.attributes.getInt("spatial",1);return _e({epsilon:e,momentum:r,spatial:t})},aA=(n,e,r)=>{let t=se(n.session.backend.glContext.version),o=e[0].dims.length,[i,a]=n.calculateTextureWidthAndHeight(e[1].dims,0),s=`
  float process(int[${o}] indices) {
    vec2 position = offsetToCoords(indices[1], ${i}, ${a});
    float scale = getColorAsFloat(${t.texture2D}(Scale, position));
    float mean = getColorAsFloat(${t.texture2D}(Mean, position));
    float variance = getColorAsFloat(${t.texture2D}(Variance, position));
    float b = getColorAsFloat(${t.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${r.epsilon})) ) + b;
  }`;return{...Im,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:s}},sA=n=>{if(!n||n.length!==5)throw new Error("BatchNormalization requires 5 inputs.");let e=n[0],r=n[1],t=n[2],o=n[3],i=n[4];if(e.dims.length<3||r.dims.length!==1||t.dims.length!==1||o.dims.length!==1||i.dims.length!==1)throw new Error("invalid input shape.");if(r.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1]||o.dims[0]!==e.dims[1]||i.dims[0]!==e.dims[1])throw new Error("invalid input shape.");if(e.type!=="float32"&&e.type!=="float64"||r.type!=="float32"&&r.type!=="float64"||t.type!=="float32"&&t.type!=="float64"||o.type!=="float32"&&o.type!=="float64"||i.type!=="float32"&&i.type!=="float64")throw new Error("invalid input tensor types.")}});var Fi,Rt,K,No,Vi,Kr=N(()=>{"use strict";Fi=class{constructor(e,r,t,o){this.glContext=e;this.programInfo=r;this.inputTextureLayouts=t;this.outputTextureLayout=o}},Rt=class{constructor(e){this.context=e}},K=class{constructor(e,r){this.routineBody=e;this.dependencies=r}},No=class{constructor(e,r,t){this.name=e;t?this.dependencies=t:this.dependencies=[],r&&(this.routineBody=r)}addDependency(e){e&&this.dependencies.push(e)}},Vi=class{static returnOrderedNodes(e){if(!e||e.length===0)return[];if(e.length===1)return e;let r=new Set,t=new Set,o=new Array;return this.createOrderedNodes(e,r,t,o),o}static createOrderedNodes(e,r,t,o){for(let i=0;i<e.length;++i)this.dfsTraverse(e[i],r,t,o)}static dfsTraverse(e,r,t,o){if(!e||t.has(e.name))return;if(r.has(e.name))throw new Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");r.add(e.name);let i=e.dependencies;if(i&&i.length>0)for(let a=0;a<i.length;++a)this.dfsTraverse(i[a],r,t,o);o.push(e),t.add(e.name),r.delete(e.name)}}});function lA(){let n="add_";return{body:`
  float ${n}(float a, float b) {
    return a + b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:n,type:0}}function cA(){let n="div_";return{body:`
  float ${n}(float a, float b) {
    return a / b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:n,type:0}}function dA(){let n="mul_";return{body:`
  float ${n}(float a, float b) {
    return a * b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:n,type:0}}function pA(){let n="sub_";return{body:`
  float ${n}(float a, float b) {
    return a - b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:n,type:0}}function fA(){let n="equal_";return{body:`
  float ${n}(float a, float b) {
    return float(a == b);
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:n,type:0}}function hA(){let n="greater_";return{body:`
  float ${n}(float a, float b) {
    return float(a > b);
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:n,type:0}}function mA(){let n="less_";return{body:`
  float ${n}(float a, float b) {
    return float(a < b);
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:n,type:0}}function gA(){let n="and_";return{body:`
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
  `,name:n,type:0}}function bA(){let n="or_";return{body:`
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
  `,name:n,type:0}}function yA(){let n="xor_";return{body:`
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
  `,name:n,type:0}}function _A(){return wA("pow")}function vA(){let n="prelu_";return{body:`
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
  `,name:n,type:0}}function wA(n){let e=`${n}_`;return{body:`
  float ${e}(float a, float b) {
    return ${n}(a, b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return ${n}(v1, v2);
  }
  `,name:e,type:0}}var zt,xA,Om,Pm,Em,Cm,Dm,km,Nm,Lm,Rm,zm,Mm,Bm,Fm=N(()=>{"use strict";Re();Kr();Ze();Ae();zt=(n,e,r,t=e[0].type,o)=>{let i=n.session.pack?2:0;return{name:r.name,inputNames:["A","B"],inputTypes:[i,i],cacheHint:o,get:()=>xA(n,e,r,t)}},xA=(n,e,r,t=e[0].type)=>{let o=n.session.pack?2:0,i=!re.areEqual(e[0].dims,e[1].dims),a=e[0].dims,s=n.session.pack;if(i){let c=gt.calcShape(e[0].dims,e[1].dims,!1);if(!c)throw new Error("Can't perform binary op on the given tensors");a=c;let p=a.length,h=e[0].dims.length!==0?e[0].dims.length:1,m=e[1].dims.length!==0?e[1].dims.length:1,g=e[0].dims.length!==0?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",y=e[1].dims.length!==0?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",T=se(n.session.backend.glContext.version),w=s?`
      ${r.body}
      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();
        vec4 result = ${r.name}(a, b);
        ${T.output} = result;
      }`:`
      ${r.body}
      float process(int indices[${p}]) {
        int aindices[${h}];
        int bindices[${m}];
        ${g}
        ${y}
        return ${r.name}(_A(aindices), _B(bindices));
      }`;return{name:r.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:a,type:t,textureType:o},shaderSource:w,hasMain:s}}let u=se(n.session.backend.glContext.version),l=`
    ${r.body}
    void main() {
      vec4 v1 = ${u.texture2D}(A, TexCoords);
      vec4 v2 = ${u.texture2D}(B, TexCoords);
      vec4 result = ${r.name}(v1, v2);
      ${u.output} = result;
    }
    `;return{name:r.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:e[0].dims,type:t,textureType:o},shaderSource:l,hasMain:!0}},Om=(n,e)=>[n.run(zt(n,e,lA()),e)],Pm=(n,e)=>[n.run(zt(n,e,gA(),"bool"),e)],Em=(n,e)=>[n.run(zt(n,e,cA()),e)],Cm=(n,e)=>[n.run(zt(n,e,fA(),"bool"),e)],Dm=(n,e)=>[n.run(zt(n,e,hA(),"bool"),e)],km=(n,e)=>[n.run(zt(n,e,mA(),"bool"),e)],Nm=(n,e)=>[n.run(zt(n,e,dA()),e)],Lm=(n,e)=>[n.run(zt(n,e,bA(),"bool"),e)],Rm=(n,e)=>[n.run(zt(n,e,_A()),e)],zm=(n,e)=>[n.run(zt(n,e,vA()),e)],Mm=(n,e)=>[n.run(zt(n,e,pA()),e)],Bm=(n,e)=>[n.run(zt(n,e,yA(),"bool"),e)]});var Vm,Gm,IA,Um=N(()=>{"use strict";Re();Vm=(n,e,r)=>(IA(e),[n.cast(e[0],r)]),Gm=n=>ht.tensorDataTypeFromProto(n.attributes.getInt("to")),IA=n=>{if(!n||n.length!==1)throw new Error("Cast requires 1 input.");if(n[0].type==="string")throw new Error("Invalid input type.")}});var SA,$A,Wm,Gi,Hm=N(()=>{"use strict";Ze();Ae();Nr();Rn();SA=(n,e)=>({name:"Concat (packed)",inputNames:Array.from({length:n},(r,t)=>`X${t}`),inputTypes:Array(n).fill(2),cacheHint:e}),$A=(n,e,r,t)=>{let o=r[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let P=1;P<r.length;P++){let C=r[P].dims.slice();for(let R=0;R<o.length;R++)if(R===t)i[t]+=C[R];else if(o[R]!==C[R])throw new Error("non concat dimensions must match")}let a=i.length,s=ro("coords",a),u=bt(a),l=Lr(),c=r.map(P=>P.dims),p=jt(a),h=new Array(c.length-1);h[0]=c[0][t];for(let P=1;P<h.length;P++)h[P]=h[P-1]+c[P][t];let m=p[t],g=p.slice(-2),y=p.join(),T=`if (${m} < ${h[0]}) {
        return getChannel(
            getX0(${y}), vec2(${g.join()}));
        }`;for(let P=1;P<h.length;P++){let C=h[P-1];T+=`
            if (${m} < ${h[P]}  && ${m} >= ${h[P-1]}) {
              return getChannel(
                getX${P}(${Gi(p,m,C)}),
                vec2(${Gi(g,m,C)}));
            }`}let w=h.length,x=h[h.length-1];T+=`
            return getChannel(
              getX${w}(${Gi(p,m,x)}),
              vec2(${Gi(g,m,x)}));`;let I=se(n.session.backend.glContext.version),A=`
          ${l}
          float getValue(${p.map(P=>"int "+P)}) {
            ${T}
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
        `;return{...e,output:{dims:i,type:r[0].type,textureType:2},shaderSource:A,hasMain:!0}},Wm=(n,e,r)=>{let t=SA(e.length,r.cacheKey);return{...t,get:()=>$A(n,t,e,r.axis)}},Gi=(n,e,r)=>{let t=n.indexOf(e);return n.map((i,a)=>a===t?`${i} - ${r}`:i).join()}});var qm,AA,OA,PA,jm,EA,CA,DA,Km,kA,Xm=N(()=>{"use strict";ct();Ae();Hm();qm=(n,e,r)=>(kA(e),n.session.pack&&e[0].dims.length>1?[n.run(Wm(n,e,r),e)]:[n.run(PA(n,e,r),e)]),AA=(n,e)=>({name:"Concat",inputNames:Array.from({length:n},(r,t)=>`X${t}`),inputTypes:Array(n).fill(0),cacheHint:e}),OA=(n,e,r,t)=>{let o=r[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let m=1;m<r.length;m++){let g=r[m].dims.slice();for(let y=0;y<o.length;y++)if(y===t)i[t]+=g[y];else if(o[y]!==g[y])throw new Error("non concat dimensions must match")}let a=i.length,s=new Array(r.length),u=0;for(let m=0;m<s.length;++m)u+=r[m].dims[t],s[m]=u;let l="";r.length<5?l=jm(s):l=EA(s);let c=CA(r.length,a),p=DA(s),h=`
        ${c}
        ${p}
        ${l}
        float process(int indices[${a}]) {
          int textureIndex = getTextureWhereDataResides (indices[${t}]);

          if(textureIndex != 0) {
            indices[${t}] = indices[${t}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:h}},PA=(n,e,r)=>{let t=AA(e.length,r.cacheKey);return{...t,get:()=>OA(n,t,e,r.axis)}},jm=n=>`int getTextureWhereDataResides(int index) {
      ${n.map((r,t)=>`if(index<${r}) {return ${t};}
`).join("")}
    }`,EA=n=>jm(n),CA=(n,e)=>{let r=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${e}]) {`];for(let t=0;t<n;++t)t===0?r.push(`	if (textureIndex == ${t}) { return _X${t}(indices); }`):t===n-1?r.push(`	else { return _X${t}(indices); }`):r.push(`	else if (textureIndex == ${t}) { return _X${t}(indices); }`);return r.push("	}"),r.join(`
`)},DA=n=>{let e=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let r=0;r<n.length;++r)r===0?e.push(`	if (index == ${r}) { return ${n[r]}; }`):r===n.length-1?e.push(`	else { return ${n[r]}; }`):e.push(`	else if (index == ${r}) { return ${n[r]}; }`);return e.push("	}"),e.join(`
`)},Km=n=>_e({axis:n.attributes.getInt("axis")}),kA=n=>{if(!n||n.length<1)throw new Error("too few inputs");let e=n[0].type,r=n[0].dims.length;if(e==="string")throw new Error("string tensor is not supported yet");for(let t of n){if(t.type!==e)throw new Error("input tensors should be one type");if(t.dims.length!==r)throw new Error("input tensors should have the same shape")}}});function NA(){return Mt("abs")}function LA(){return Mt("acos")}function RA(){return Mt("asin")}function zA(){return Mt("atan")}function MA(){return Mt("ceil")}function BA(){return Mt("cos")}function FA(n){let e="elu";return{body:`
  const float alpha = float(${n});

  float ${e}_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function VA(){return Mt("exp")}function GA(){return Mt("floor")}function Sl(n,e){let r="clip";return{body:`
  const float min = float(${n});
  const float max = float(${e});

  float ${r}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${r}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:r,type:0}}function UA(){let n="indentity";return{body:`
  float ${n}_(float a) {
    return a;
  }
  vec4 ${n}_(vec4 v) {
    return v;
  }
  `,name:n,type:0}}function WA(n){let e="leakyRelu";return{body:`
  const float alpha = float(${n});

  float ${e}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function HA(){return Mt("log")}function qA(){let n="neg";return{body:`
  float ${n}_(float a) {
    return -a;
  }
  vec4 ${n}_(vec4 v) {
    return -v;
  }
  `,name:n,type:0}}function jA(){let n="not";return{body:`
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
  `,name:n,type:0}}function KA(){return Mt("sin")}function $l(){let n="relu";return{body:`
  float ${n}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${n}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:n,type:0}}function Al(){let n="sigmoid";return{body:`
  float ${n}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${n}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:n,type:0}}function XA(){return Mt("sqrt")}function ZA(){return Mt("tan")}function JA(){let n="tanh";return{body:`
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
  `,name:n,type:0}}var QA,rt,Zm,Jm,Qm,Ym,Ol,eg,tg,YA,rg,ng,og,ig,ag,sg,Pl,ug,lg,cg,dg,pg,fg,hg,mg,gg,bg,yg,El=N(()=>{"use strict";ct();Re();Kr();Ze();Ae();QA=(n,e,r,t)=>{let o=n.session.pack?2:0,i=se(n.session.backend.glContext.version);return{...e,output:{dims:r.dims,type:r.type,textureType:o},shaderSource:`
     ${t.body}
     void main() {
       vec4 v = ${i.texture2D}(A, TexCoords);
       v = ${t.name}_(v);
       ${i.output} = v;
     }
     `,hasMain:!0}},rt=(n,e,r,t)=>{let o=n.session.pack?2:0,i={name:r.name,inputTypes:[o],inputNames:["A"],cacheHint:t};return{...i,get:()=>QA(n,i,e,r)}},Zm=(n,e)=>[n.run(rt(n,e[0],NA()),e)],Jm=(n,e)=>[n.run(rt(n,e[0],LA()),e)],Qm=(n,e)=>[n.run(rt(n,e[0],RA()),e)],Ym=(n,e)=>[n.run(rt(n,e[0],zA()),e)],Ol=(n,e,r)=>[n.run(rt(n,e[0],Sl(r.min,r.max),r.cacheKey),e)],eg=n=>_e({min:n.attributes.getFloat("min",kn),max:n.attributes.getFloat("max",Nn)}),tg=(n,e)=>{let r=YA(n,e);return Ol(n,[e[0]],r)},YA=(n,e)=>{if(e.length>=3&&(!n.session.isInitializer(e[1].dataId)||!n.session.isInitializer(e[2].dataId)))throw new Error("dynamic clip attributes are not allowed");let r=e.length>=3?e[1].numberData[0]:kn,t=e.length>=3?e[2].numberData[0]:Nn;return _e({min:r,max:t})},rg=(n,e)=>[n.run(rt(n,e[0],MA()),e)],ng=(n,e)=>[n.run(rt(n,e[0],BA()),e)],og=(n,e,r)=>[n.run(rt(n,e[0],FA(r.alpha),r.cacheKey),e)],ig=n=>_e({alpha:n.attributes.getFloat("alpha",1)}),ag=(n,e)=>[n.run(rt(n,e[0],VA()),e)],sg=(n,e)=>[n.run(rt(n,e[0],GA()),e)],Pl=(n,e)=>[n.run(rt(n,e[0],UA()),e)],ug=(n,e,r)=>[n.run(rt(n,e[0],WA(r.alpha),r.cacheKey),e)],lg=n=>_e({alpha:n.attributes.getFloat("alpha",.01)}),cg=(n,e)=>[n.run(rt(n,e[0],HA()),e)],dg=(n,e)=>[n.run(rt(n,e[0],qA()),e)],pg=(n,e)=>[n.run(rt(n,e[0],jA()),e)],fg=(n,e)=>[n.run(rt(n,e[0],$l()),e)],hg=(n,e)=>[n.run(rt(n,e[0],Al()),e)],mg=(n,e)=>[n.run(rt(n,e[0],KA()),e)],gg=(n,e)=>[n.run(rt(n,e[0],XA()),e)],bg=(n,e)=>[n.run(rt(n,e[0],ZA()),e)],yg=(n,e)=>[n.run(rt(n,e[0],JA()),e)]});function Rr(n){let e;switch(n.activation){case"Relu":e=$l();break;case"Sigmoid":e=Al();break;case"Clip":e=Sl(n.clipMin,n.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let r=e.name,t=e.body,o=`value = ${r}_(value);`;return{activationFunction:t,applyActivation:o}}var no,zn=N(()=>{"use strict";Re();El();no=n=>{let e=n.getString("activation","");if(e==="Clip"){let[r,t]=n.getFloats("activation_params",[kn,Nn]);return{activation:e,clipMax:t,clipMin:r,activationCacheKey:`${e}:${r},${t}`}}return{activation:e,activationCacheKey:e}}});var tO,rO,_g,vg=N(()=>{"use strict";Et();Ze();Ae();Ui();zn();tO=(n,e)=>({name:"GroupedConv",inputNames:n?["X","W","Bias"]:["X","W"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e}),rO=(n,e,r,t)=>{let i=e.length>2?"value += getBias(output_channel);":"",a=e[0].dims.slice(),s=e[1].dims.slice(),u=s[0]/t.group;Be.verbose("GroupedConv",`autpPad:${t.autoPad}, dilations:${t.dilations}, group:${t.group}, kernelShape:${t.kernelShape}, pads:${t.pads}, strides:${t.strides}`);let l=oo(a,s,t.dilations,t.pads,t.strides),c=se(n.session.backend.glContext.version),{activationFunction:p,applyActivation:h}=Rr(t),m=`
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
    ${h}
    ${c.output} = vec4(value, .0, .0, .0);
  }
`;return{...r,output:{dims:l,type:e[0].type,textureType:0},shaderSource:m,hasMain:!0}},_g=(n,e,r)=>{let t=tO(e.length>2,r.cacheKey);return{...t,get:()=>rO(n,e,t,r)}}});var nO,oO,wg,xg=N(()=>{"use strict";Ze();Ae();Rn();nO=n=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:n}),oO=(n,e,r,t,o,i)=>{let a=r.dims,s=t.dims,u=2,l=3,c=o.length,p=[s[1]*s[2]*s[3],o[2]*o[3]],h=s[2]*s[3],m=Lr(),g=se(n.session.backend.glContext.version),y="";for(let w=0;w<=1;w++)for(let x=0;x<=1;x++)y+=`
            blockIndex = rc.x + ${x};
            pos = rc.y + ${w};

            if(blockIndex < ${p[1]} && pos < ${p[0]}) {
              offsetY = int(blockIndex / (${o[c-1]})) * ${i.strides[0]} -
                ${i.pads[0]};
              d0 = offsetY + ${i.dilations[0]} * (imod(pos, ${h}) / ${s[2]});

              if(d0 < ${a[u]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${o[c-1]}) * ${i.strides[1]} -
                  ${i.pads[1]};
                d1 = offsetX + ${i.dilations[1]} * imod(imod(pos, ${h}), ${s[2]});

                if(d1 < ${a[l]} && d1 >= 0) {

                  ch = int(float(pos)/ ${h}.);
                    innerDims = vec2(d0, d1);
                    result[${w*2+x}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;let T=`
      ${m}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${y}
          ${g.output} = result;
      }
            `;return{...e,output:{dims:p,type:r.type,textureType:2},shaderSource:T,hasMain:!0}},wg=(n,e,r,t,o)=>{let i=nO(o.cacheKey);return{...i,get:()=>oO(n,i,e,r,t,o)}}});function aO(n,e,r){let t=e[0].dims,o=e[1].dims,i=gt.calcShape(t,o,!0);if(!i)throw new Error("Can't use matmul on the given tensors");let a=bt(i.length),s=jt(),{activationFunction:u,applyActivation:l}=Rr(r),c=e.length>2,p=c?"value += getBiasForMatmul();":"",h=c?`${Dl(a,s,e[2].dims,i,!1)}`:"",m=i.length,g=t.length,y=o.length,T=t[t.length-1],w=`
    ${u}
    ${h}
    float process(int indices[${m}]) {
        int a[${g}];
        int b[${y}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${T}; ++k) {
            a[${g-1}] = k;
            b[${y-2}] = k;
            value += _A(a) * _B(b);
        }
        ${p}
        ${l}
        return value;
    }`;return{...n,output:{dims:i,type:e[0].type,textureType:0},shaderSource:w}}function Cl(n,e){let r=iO(n.length>2,e.activationCacheKey);return{...r,get:()=>aO(r,n,e)}}function Dl(n,e,r,t,o){let i="",a=r.length,s=t.length,u=s-a;s<2&&a>0?i="coords":i=r.map((y,T)=>`coords.${e[T+u]}`).join(", ");let c=gt.getBroadcastDims(r,t).map(y=>`coords.${e[y+u]} = 0;`).join(`
`),h=re.size(r)===1,m="vec4(outputValue.xx, outputValue.yy)";return h&&(m="vec4(outputValue.x)"),o?`
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
}`}var Tg,Ig,iO,sO,Wi=N(()=>{"use strict";Re();Ae();Nr();zn();kl();Tg=(n,e,r)=>(sO(e),n.session.pack?[n.run(Hi(n,e,r),e)]:[n.run(Cl(e,r),e)]),Ig=n=>no(n.attributes),iO=(n,e)=>({name:"MatMul",inputNames:n?["A","B","Bias"]:["A","B"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e});sO=n=>{if(!n||n.length!==2)throw new Error("MatMul requires 2 inputs.");if(n[0].dims[n[0].dims.length-1]!==n[1].dims[n[1].dims.length-2])throw new Error("shared dimension does not match.");if(n[0].type!=="float32"&&n[0].type!=="float64"||n[1].type!=="float32"&&n[1].type!=="float64")throw new Error("inputs should be float type");if(n[0].type!==n[1].type)throw new Error("inputs types should match")}});function cO(n,e,r,t){let o=[],i=[],a=r[0].dims,s=r[1].dims,u=a.length,l=s.length,c=t.length,p=c-u,h=c-l;o=a.map((I,A)=>`coords.${e[A+p]}`),o[u-1]="i*2",o.join(", "),i=s.map((I,A)=>`coords.${e[A+h]}`),i[l-2]="i*2",i.join(", ");let m=gt.getBroadcastDims(a,t),g=gt.getBroadcastDims(s,t),y=m.map(I=>`coords.${e[I+p]} = 0;`).join(`
`),T=g.map(I=>`coords.${e[I+h]} = 0;`).join(`
`),w=`int lastDim = coords.${e[c-1]};
  coords.${e[c-1]} = coords.${e[c-2]};
  coords.${e[c-2]} = lastDim;`;return`
vec4 getAAtOutCoordsMatmul(int i) {
  ${n} coords = getOutputCoords();
  ${w}
  ${y}
  vec4 outputValue = getA(${o});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${n} coords = getOutputCoords();
  ${w}
  ${T}
  vec4 outputValue = getB(${i});
  return outputValue;
}`}function dO(n,e){let r="";for(let t=0;t<e-2;t++)r+=`rc.${n[t]}, `;return r+=`rc.${n[e-2]}, i*2`,r}function pO(n,e){let r="";for(let t=0;t<e-2;t++)r+=`rc.${n[t]}, `;return r+=`i*2, rc.${n[e-1]}`,r}var uO,lO,Hi,kl=N(()=>{"use strict";Re();Ze();Ae();Nr();zn();Wi();uO=(n,e)=>({name:"MatMul (packed)",inputNames:n?["A","B","Bias"]:["A","B"],inputTypes:n?[2,2,2]:[2,2],cacheHint:e}),lO=(n,e,r,t)=>{let o=r.length>2,i=o?"value += getBiasForMatmul();":"",a=r[0].dims,s=r[1].dims,u=gt.calcShape(a,s,!0),l=!re.areEqual(r[0].dims,r[1].dims);if(!u)throw new Error("Can't use matmul on the given tensors");let c=a[a.length-1],p=Math.ceil(c/2),h=a.length,m=s.length,g=se(n.session.backend.glContext.version),y=bt(u.length),T=u.length,w=jt(),{activationFunction:x,applyActivation:I}=Rr(t),A=o?`${Dl(y,w,r[2].dims,u,!0)}`:"",P=l?`${cO(y,w,r,u)}`:"",C=l?"getAAtOutCoordsMatmul(i)":`getA(${dO(w,h)})`,R=l?"getBAtOutCoordsMatmul(i)":`getB(${pO(w,m)})`,M=l?"":`${y} rc =
          getOutputCoords(); int lastDim = rc.${w[T-1]}; rc.${w[T-1]} =
          rc.${w[T-2]}; rc.${w[T-2]} = lastDim;
      `,F=`
            ${P}
            ${A}
            ${x}
            void main() {
              ${M}

              vec4 value = vec4(0);
              for (int i = 0; i < ${p}; i++) {
                vec4 a = ${C};
                vec4 b = ${R};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${i}
              ${I}
              ${g.output} = value;
            }`;return{...e,output:{dims:u,type:r[0].type,textureType:2},shaderSource:F,hasMain:!0}},Hi=(n,e,r)=>{let t=uO(e.length>2,r.activationCacheKey);return{...t,get:()=>lO(n,t,e,r)}}});var Sg,$g=N(()=>{"use strict";Ui();xg();kl();Sg=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=oo(t,o,r.dilations,r.pads,r.strides),a=n.run(wg(n,e[0],e[1],i,r),[e[0]]),s=n.reshapePacked(e[1],[o[0],o[1]*o[2]*o[3]]),u=e.length===3?[s,a,e[2]]:[s,a],l=n.run(Hi(n,u,r),u);return n.reshapePacked(l,i)}});var fO,hO,Ag,Nl,Ll=N(()=>{"use strict";Ae();fO=n=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:n}),hO=(n,e,r,t,o,i)=>{let a=r.dims,s=t.dims,u=o.length,l=Nl(a,s,o,4),c=`
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
        `;return{...e,output:{dims:l,type:r.type,textureType:4},shaderSource:c}},Ag=(n,e,r,t,o)=>{let i=fO(o.cacheKey);return{...i,get:()=>hO(n,i,e,r,t,o)}},Nl=(n,e,r,t=4)=>[r[0],r[2],r[3],Math.ceil(n[1]*e[2]*e[3]/t)]});var mO,gO,Og,Pg=N(()=>{"use strict";Re();Ze();Ae();zn();Ll();mO=(n,e)=>({name:"ConvDotProduct",inputNames:n?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:n?[0,4,0]:[0,4],cacheKey:e.activationCacheKey}),gO=(n,e,r,t,o)=>{let i=r[0].dims,a=r[1].dims,s=[a[0],Math.ceil(i[1]*a[2]*a[3]/4)],u=Nl(i,a,t),[l,c]=n.calculateTextureWidthAndHeight(s,4),p=re.computeStrides(u),[h,m]=n.calculateTextureWidthAndHeight(u,4),g=t.length,y=r.length<3?"0.0":"_B(b)",T=Math.ceil(i[1]*a[2]*a[3]/4),{activationFunction:w,applyActivation:x}=Rr(o),I=se(n.session.backend.glContext.version),A=`
${w}
float process(int indices[${g}]) {
  int b[1];
  b[0] = indices[1];
  int im2col[4];
  im2col[0] = indices[0];
  im2col[1] = indices[2];
  im2col[2] = indices[3];
  int im2colOffset = im2col[0] * ${p[0]} + im2col[1] * ${p[1]} + im2col[2] * ${p[2]};
  int kernelOffset = indices[1] * ${s[1]};
  float value = ${y};
  for (int i = 0; i < ${T}; ++i) {
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${h}, ${m});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${l}, ${c});
    value += dot(${I.texture2D}(Im2Col, im2colCoords), ${I.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${x}
  return value;
}`;return{...e,output:{dims:t,type:r[0].type,textureType:0},shaderSource:A}},Og=(n,e,r,t)=>{let o=mO(e.length>2,t);return{...o,get:()=>gO(n,o,e,r,t)}}});var oo,Rl,bO,yO,_O,vO,zl,wO,Ui=N(()=>{"use strict";ct();Re();vg();$g();Pg();zn();Ll();Wi();oo=(n,e,r,t,o)=>{let i=n[0],a=n.slice(2),s=a.length,u=e[0],c=e.slice(2).map((g,y)=>g+(g-1)*(r[y]-1)),h=a.map((g,y)=>g+t[y]+t[y+s]).map((g,y)=>Math.floor((g-c[y]+o[y])/o[y]));return[i,u].concat(...h)},Rl=(n,e,r)=>(wO(e,r),bO(n,e,r)),bO=(n,e,r)=>{let t=vO(r,e),o=n.session.pack,i=t.kernelShape[0]===1&&t.kernelShape[1]===1;return t.group>1?[n.run(_g(n,e,t),e)]:i&&o?[yO(n,e,t)]:o&&e[0].dims.length===4&&e[0].dims[0]===1&&!i?[Sg(n,e,t)]:[_O(n,e,t)]},yO=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=oo(t,o,r.dilations,r.pads,r.strides),a=n.reshapeUnpacked(e[0],[t[1],t[2]*t[3]]),s=n.reshapeUnpacked(e[1],[o[0],o[1]]),u=e.length>2?[s,a,e[2]]:[s,a],l=n.run(Cl(u,r),u);return n.reshapeUnpacked(l,i)},_O=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=oo(t,o,r.dilations,r.pads,r.strides),a=n.run(Ag(n,e[0],e[1],i,r),[e[0]]),s=e.length===3?[a,e[1],e[2]]:[a,e[1]];return n.run(Og(n,e,i,r),s)},vO=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0)for(let i=2;i<e[1].dims.length;++i)r.push(e[1].dims[i]);let t=n.pads.slice();Dn.adjustPadsBasedOnAutoPad(e[0].dims,n.strides,n.dilations,r,t,n.autoPad);let o=Object.assign({},n);return Object.assign(o,{kernelShape:r,pads:t,cacheKey:n.cacheKey}),o},zl=n=>{let e=n.attributes,r=no(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),a=e.getInts("kernel_shape",[]),s=e.getInts("pads",[0,0,0,0]),u=e.getInts("strides",[1,1]);return _e({autoPad:t,dilations:o,group:i,kernelShape:a,pads:s,strides:u,...r})},wO=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4||n[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let r=n[0].dims[1],t=n[1].dims[1]*e.group;if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(n.length===3&&(n[2].dims.length!==1||n[1].dims[0]!==n[2].dims[0]))throw new Error("invalid bias");let o=n[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(n[0].type!=="float32"||n[1].type!=="float32")throw new Error("Conv input(X,W) should be float tensor");if(n.length===3&&n[2].type!=="float32")throw new Error("Conv input(bias) should be float tensor")}});var xO,TO,IO,Eg,SO,$O,AO,OO,PO,EO,Cg,CO,Dg=N(()=>{"use strict";ct();Ze();Ae();zn();xO=(n,e,r,t,o,i)=>(n-1)*e+r+(t-1)*o+1-i,TO=(n,e,r,t,o)=>{let i=Math.floor(n/2);e==="SAME_UPPER"?(r[t]=i,r[o]=n-i):e==="SAME_LOWER"&&(r[t]=n-i,r[o]=i)},IO=(n,e,r,t,o,i,a,s)=>{let u=n.length-2,l=s.length===0;for(let c=0;c<u;++c){let p=l?n[c+2]*i[c]:s[c],h=xO(n[c+2],i[c],o[c],e[c],r[c],p);TO(h,t,o,c,c+u),l&&s.push(i[c]*(n[c+2]-1)+a[c]+(e[c]-1)*r[c]+1-o[c]-o[c+u])}},Eg=(n,e,r)=>(CO(e,r),SO(n,e,r)),SO=(n,e,r)=>{let t=EO(r,e);return[PO(n,e,t)]},$O=(n,e)=>({name:"ConvTranspose",inputNames:n?["X","W","B"]:["X","W"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e}),AO=(n,e,r,t)=>{let i=e.length>2?"getB(output_channel)":"0.0",a=e[0].dims,s=e[1].dims,u=s[1],l=s[0]/t.group,c=[e[0].dims[0],e[1].dims[1]*t.group,...t.outputShape],p=se(n.session.backend.glContext.version),{activationFunction:h,applyActivation:m}=Rr(t),g=`
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
    ${m}
    ${p.output} = vec4(value, .0, .0, .0);
  }
`;return{...r,output:{dims:c,type:e[0].type,textureType:0},shaderSource:g,hasMain:!0}},OO=(n,e,r)=>{let t=$O(e.length>2,r.cacheKey);return{...t,get:()=>AO(n,e,t,r)}},PO=(n,e,r)=>n.run(OO(n,e,r),e),EO=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0)for(let s=2;s<e[1].dims.length;++s)r.push(e[1].dims[s]);let t=n.pads.slice(),o=n.outputShape.slice(),i=e[0].dims;IO(i,r,n.dilations,n.autoPad,t,n.strides,n.outputPadding,o);let a=Object.assign({},n);return Object.assign(a,{kernelShape:r,pads:t,outputShape:o,cacheKey:n.cacheKey}),a},Cg=n=>{let e=n.attributes,r=no(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),a=e.getInts("kernel_shape",[]),s=e.getInts("output_padding",[0,0]),u=e.getInts("output_shape",[]),l=e.getInts("pads",[0,0,0,0]),c=e.getInts("strides",[1,1]);return _e({autoPad:t,dilations:o,group:i,kernelShape:a,outputPadding:s,outputShape:u,pads:l,strides:c,...r})},CO=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4||n[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let r=n[0].dims[1],t=n[1].dims[0];if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=n[1].dims[1]*e.group;if(n.length===3&&(n[2].dims.length!==1||n[2].dims[0]!==o))throw new Error("invalid bias");let i=n[0].dims.length-2;if(e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==n[0].dims.length-2)throw new Error("invalid output shape");if(n[0].type!=="float32"||n[1].type!=="float32")throw new Error("ConvTranspose input(X,W) should be float tensor");if(n.length===3&&n[2].type!=="float32")throw new Error("ConvTranspose input(bias) should be float tensor")}});var kg,Mn,Ng,DO,Lg,kO,NO,LO,qi=N(()=>{"use strict";ct();Re();Ae();kg={name:"Transpose",inputNames:["A"],inputTypes:[0]},Mn=(n,e,r)=>(LO(e),[n.run({...kg,cacheHint:r.cacheKey,get:()=>DO(n,e[0],r.perm)},e)]),Ng=n=>_e({perm:n.attributes.getInts("perm",[])}),DO=(n,e,r)=>{let t=e.dims;r=Lg(t,r);let o=kO(t,r),i=t.length,a=`
      ${NO("perm",r,i)}
      float process(int indices[${i}]) {
        int a[${i}];
        perm(a, indices);
        return _A(a);
      }`;return{...kg,output:{dims:o,type:e.type,textureType:0},shaderSource:a}},Lg=(n,e)=>(e&&e.length!==n.length&&(e=[...n.keys()].reverse()),e),kO=(n,e)=>(e=Lg(n,e),re.sortBasedOnPerm(n,e)),NO=(n,e,r)=>{let t=[];t.push(`void ${n}(out int a[${r}], int src[${r}]) {`);for(let o=0;o<r;++o)t.push(`	a[${e[o]}]=src[${o}];`);return t.push("	}"),t.join(`
`)},LO=n=>{if(!n||n.length!==1)throw new Error("Transpose requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("input should be float tensor")}});var Rg,zg,RO,Mg=N(()=>{"use strict";qi();Rg=(n,e,r)=>{RO(e);let t=r.blocksize,o=t*t,i=r.mode==="DCR"?[0,3,4,1,5,2]:[0,1,4,2,5,3],a=r.mode==="DCR"?[e[0].dims[0],t,t,e[0].dims[1]/o,e[0].dims[2],e[0].dims[3]]:[e[0].dims[0],e[0].dims[1]/o,t,t,e[0].dims[2],e[0].dims[3]],s=n.reshapeUnpacked(e[0],a),u={perm:i,cacheKey:`${i}`},[l]=Mn(n,[s],u),c=[e[0].dims[0],e[0].dims[1]/o,e[0].dims[2]*t,e[0].dims[3]*t];return[n.reshapeUnpacked(l,c)]},zg=n=>{let e=n.attributes.getInt("blocksize");if(e<1)throw new Error(`blocksize must be >= 1, but got : ${e} for DepthToSpace`);let r=n.attributes.getString("mode","DCR");if(r!=="DCR"&&r!=="CRD")throw new Error(`unrecognized mode: ${r} for DepthToSpace`);return{mode:r,blocksize:e}},RO=n=>{if(n.length!==1)throw new Error(`DepthToSpace expect 1 inputs, but got ${n.length}`);if(n[0].type==="string"||n[0].dims.length!==4)throw new TypeError("DepthToSpace input should be a 4-D numeric tensor")}});var Bg,Fg,zO,Vg=N(()=>{"use strict";Re();Bg=(n,e,r)=>{zO(e,r);let t=re.flattenShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},Fg=n=>n.attributes.getInt("axis",1),zO=(n,e)=>{if(!n||n.length!==1)throw new Error("Flatten requires 1 input.");let r=n[0].dims.length;if(r===0)throw new Error("scalar tensor is not supported.");if(e<-r||e>r)throw new Error("Invalid axis");if(n[0].type==="string")throw new Error("string tensor is not supported.")}});var hn,Lo=N(()=>{"use strict";hn=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]});var Gg,Ug,MO,BO,FO,VO,Wg=N(()=>{"use strict";ct();Lo();Re();Ae();Gg=(n,e,r)=>(VO(e,r.axis),[n.run(FO(n,e,r),e)]),Ug=n=>_e({axis:n.attributes.getInt("axis",0)}),MO={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},BO=(n,e,r,t)=>{let o=r[0].dims.slice(),i=r[1].dims.slice(),a=new Array(o.length+i.length-1);t=re.normalizeAxis(t,o.length);let s=[];for(let h=0;h<a.length;h++)h<t?(a[h]=o[h],s.push(`inputIdx[${h}] = outputIdx[${h}];`)):h<t+i.length?(a[h]=i[h-t],s.push(`indexDataIdx[${h-t}] = outputIdx[${h}];`)):(a[h]=o[h-i.length+1],s.push(`inputIdx[${h-i.length+1}] = outputIdx[${h}];`));let u=a.length||1,l=o.length,c=i.length||1,p=`
      float process(int outputIdx[${u}]) {
        int inputIdx[${l}];
        int indexDataIdx[${c}];
        indexDataIdx[0] = 0;
        ${s.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${t}] = idx < 0 ? idx + ${o[t]} : idx;
        return _A(inputIdx);
      }`;return{...e,output:{dims:a,type:r[0].type,textureType:0},shaderSource:p}},FO=(n,e,r)=>{let t={...MO,cacheHint:r.cacheKey};return{...t,get:()=>BO(n,t,e,r.axis)}},VO=(n,e)=>{if(!n||n.length!==2)throw new Error("Gather requires 2 inputs.");let r=n[0].dims.length;if(r<1)throw new Error("Invalid input shape.");if(e<-r||e>r-1)throw new Error("Invalid axis.");if(hn.indexOf(n[0].type)===-1)throw new Error("Invaid input type.");if(n[1].type!=="int32"&&n[1].type!=="int16")throw new Error("Invaid input type.")}});var Ml,Hg,qg,jg,GO,UO,WO,Kg=N(()=>{"use strict";ct();Re();Ae();Ml=(n,e,r)=>(WO(e,r),[n.run(GO(e,r),e)]),Hg=(n,e)=>{let r=n.attributes.getInt("transA",0)!==0,t=n.attributes.getInt("transB",0)!==0,o=n.attributes.getFloat("alpha",1),i=n.attributes.getFloat("beta",1);return _e({transA:r,transB:t,alpha:o,beta:i,isOptionalC:e})},qg=n=>Hg(n,!1),jg=n=>Hg(n,!0),GO=(n,e)=>{let r={name:"Gemm",inputNames:n.length===3?["A","B","C"]:["A","B"],inputTypes:n.length===3?[0,0,0]:[0,0],key:e.cacheKey};return{...r,get:()=>UO(r,n,e)}},UO=(n,e,r)=>{let t=e[0].dims.slice(),o=e[1].dims.slice(),[i,a]=Li.getShapeOfGemmResult(t,r.transA,o,r.transB,e.length===3?e[2].dims:void 0),s=[i,a];if(!s)throw new Error("Can't use gemm on the given tensors");let u=t[t.length-1],l="";r.transA&&(u=t[0]),r.transA&&r.transB?l="value += _A_T(a) * _B_T(b);":r.transA&&!r.transB?l="value += _A_T(a) * _B(b);":!r.transA&&r.transB?l="value += _A(a) * _B_T(b);":!r.transA&&!r.transB&&(l="value += _A(a) * _B(b);");let c=s.length,p=e.length===3?`int c[${e[2].dims.length}];`:"",h=e.length===3?"bcastIndices_C(indices, c);":"",m=e.length===3?"value += beta * _C(c);":"",g=`
      float process(int indices[${c}]) {
          int a[${c}];
          int b[${c}];
          ${p}

          copyVec(indices, a);
          copyVec(indices, b);
          ${h}

          float value = 0.0;
          for (int k=0; k<${u}; ++k) {
              a[${c-1}] = k;
              b[${c-2}] = k;
              ${l}
          }

          value = value * alpha;
          ${m}
          return value;
      }`;return{...n,output:{dims:s,type:e[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:r.alpha},{name:"beta",type:"float",data:r.beta}],shaderSource:g}},WO=(n,e)=>{if(!n)throw new Error("Input is missing");if(e.isOptionalC&&(n.length<2||n.length>3))throw new Error("Invaid input shape.");if(!e.isOptionalC&&n.length!==3)throw new Error("Gemm requires 3 inputs");if(n.length===3&&n[2].dims.length!==1&&n[2].dims.length!==2)throw new Error("Invalid input shape of C");if(n[0].type!=="float32"&&n[0].type!=="float64"||n[1].type!=="float32"&&n[1].type!=="float64"||n.length===3&&n[2].type!=="float32"&&n[2].type!=="float64")throw new Error("Invalid input type.");if(n[0].type!==n[1].type||n.length===3&&n[0].type!==n[2].type)throw new Error("Input types are mismatched")}});var Xg,Zg,HO,qO,jO,KO,XO,Jg=N(()=>{"use strict";ct();Ae();Xg=(n,e,r)=>(XO(e),[n.run(jO(n,e,r),e)]),Zg=n=>{let e=n.attributes.getFloat("scale"),r=n.attributes.getFloats("bias");return _e({scale:e,bias:r})},HO={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},qO=(n,e,r,t)=>{let o=r[0].dims.slice(),i=o.length,s=`
      ${KO(t.bias.length)}
      float process(int indices[${i}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...e,output:{dims:o,type:r[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:t.bias.length,data:t.bias},{name:"scale",type:"float",data:t.scale}],shaderSource:s}},jO=(n,e,r)=>{let t={...HO,cacheHint:r.cacheKey};return{...t,get:()=>qO(n,t,e,r)}},KO=n=>{let e=[`float getBias(float bias[${n}], int channel) {`];for(let r=0;r<n;++r)r===0?e.push(`	if (channel == ${r}) { return bias[${r}]; }`):r===n-1?e.push(`	else { return bias[${r}]; }`):e.push(`	else if (channel == ${r}) { return bias[${r}]; }`);return e.push("	}"),e.join(`
`)},XO=n=>{if(!n||n.length!==1)throw new Error("ImageScaler requires 1 input.");if(n[0].dims.length!==4)throw new Error("Invalid input shape.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")}});var Yg,eb,Qg,ZO,JO,QO,YO,eP,tP,tb=N(()=>{"use strict";Ze();Ae();Yg=(n,e,r)=>{tP(e);let t=n.run(JO(e[0]),e);return[n.run(eP(n,e[0],r,t.dims),[e[0],t,e[1],e[2]])]},eb=n=>n.attributes.getFloat("epsilon",1e-5),Qg={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},ZO=(n,e)=>{let r=e.dims.slice(),t=r[1],o=r[2]*r[3],i=[r[0],t],a=`
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
      }`;return{...n,output:{dims:i,type:e.type,textureType:4},shaderSource:a}},JO=n=>({...Qg,get:()=>ZO(Qg,n)}),QO={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},YO=(n,e,r,t,o)=>{let i=se(n.session.backend.glContext.version),[a,s]=n.calculateTextureWidthAndHeight(o,4),[u,l]=[a/4,s],c=`
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
      }`;return{...e,output:{dims:r.dims,type:r.type,textureType:0},variables:[{name:"epsilon",type:"float",data:t}],shaderSource:c}},eP=(n,e,r,t)=>{let o={...QO,cacheHint:`${r}`};return{...o,get:()=>YO(n,o,e,r,t)}},tP=n=>{if(!n||n.length!==3)throw new Error("InstanceNormalization requires 3 inputs.");let e=n[0],r=n[1],t=n[2];if(e.dims.length<3||r.dims.length!==1||t.dims.length!==1)throw new Error("Invalid input shape.");if(r.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1])throw new Error("Input shapes are mismatched.");if(e.type!=="float32"&&e.type!=="float64"||r.type!=="float32"&&r.type!=="float64"||t.type!=="float32"&&t.type!=="float64")throw new Error("Invalid input type.");if(n[0].dims.length!==4)throw new Error("Only support 4-D input shape.")}});function rP(n,e){let r=n[0].dims[1],t=n[0].dims.length,o=-Math.floor((e.size-1)/2),i=Math.ceil((e.size-1)/2),a=`float(${e.alpha}) / float(${e.size})`,s=`float(${e.bias})`,u=`float(${e.beta})`,l=`
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
    }`;return{...ob,cacheHint:e.cacheKey,output:{dims:n[0].dims,type:n[0].type,textureType:0},shaderSource:l}}function nP(n,e){return{...ob,cacheHint:e.cacheKey,get:()=>rP(n,e)}}var rb,nb,ob,oP,ib=N(()=>{"use strict";ct();Ae();rb=(n,e,r)=>(oP(e),[n.run(nP(e,r),e)]),nb=n=>{let e=n.attributes.getFloat("alpha",1e-4),r=n.attributes.getFloat("beta",.75),t=n.attributes.getFloat("bias",1),o=n.attributes.getInt("size");return _e({alpha:e,beta:r,bias:t,size:o})},ob={name:"LRN",inputNames:["X"],inputTypes:[0]};oP=n=>{if(!n||n.length!==1)throw new Error("LRN requires 1 input.");if(n[0].dims.length!==4)throw new Error('currently only support LRN for input with "NCHW" format');if(n[0].type!=="float32")throw new Error("input should be float type")}});var iP,Bl,ab,sb,ub,aP,sP,uP,lP,cP,dP,pP,fP,lb=N(()=>{"use strict";ct();Re();Ze();Ae();iP={name:"Pad",inputNames:["A"],inputTypes:[0]},Bl=(n,e,r)=>(uP(e),[n.run({...iP,cacheHint:r.cacheKey,get:()=>sP(n,e[0],r)},e)]),ab=n=>{let e=n.attributes.getString("mode","constant"),r=n.attributes.getFloat("value",0),t=n.attributes.getInts("pads");return _e({mode:e,value:r,pads:t})},sb=(n,e,r)=>{lP(e);let t=aP(n,e,r);return Bl(n,[e[0]],t)},ub=n=>n.attributes.getString("mode","constant"),aP=(n,e,r)=>{if(!n.session.isInitializer(e[1].dataId)||e.length>=3&&!n.session.isInitializer(e[2].dataId))throw new Error("dynamic pad attributes are not allowed");let t=Array.from(e[1].integerData),o=e.length>=3?e[2].floatData[0]:0;return _e({mode:r,pads:t,value:o})},sP=(n,e,r)=>{let t=re.padShape(e.dims.slice(),r.pads),o=t.length,a=`
      ${cP(n,e,r)}
      float process(int[${o}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:t,type:e.type,textureType:0},shaderSource:a}},uP=n=>{if(!n||n.length!==1)throw new Error("Pad requires 1 input");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")},lP=n=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Pad requires 2 or 3 inputs");if(n[1].type!=="int32")throw new Error("Invalid input type.");if(n.length>=3&&n[2].type==="string")throw new Error("Invalid input type.")},cP=(n,e,r)=>{let t=se(n.session.backend.glContext.version),[o,i]=n.calculateTextureWidthAndHeight(e.dims,0),a=re.computeStrides(e.dims);switch(r.mode){case"constant":return dP(t,e.dims,a,o,i,r.pads,r.value);case"reflect":return pP(t,e.dims,a,o,i,r.pads);case"edge":return fP(t,e.dims,a,o,i,r.pads);default:throw new Error("Invalid mode")}},dP=(n,e,r,t,o,i,a)=>{let s=e.length,u="";for(let l=s-1;l>=0;--l)u+=`
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
      `},pP=(n,e,r,t,o,i)=>{let a=e.length,s="";for(let u=a-1;u>=0;--u)s+=`
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
      `},fP=(n,e,r,t,o,i)=>{let a=e.length,s="";for(let u=a-1;u>=0;--u)s+=`
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
      `}});var db,pb,fb,hb,mb,gb,bb,yb,_b,hP,cb,vb,Ki,wb,ji,mP,xb=N(()=>{"use strict";ct();Re();Ae();db=(n,e,r)=>{Ki(e);let t={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[n.run({...t,get:()=>fb(e,t,!1,r)},e)]},pb=n=>{let e=n.attributes.getString("auto_pad","NOTSET"),r=n.attributes.getInt("ceil_mode",0),t=n.attributes.getInt("count_include_pad",0)!==0,o=n.attributes.getInts("kernel_shape"),i=n.attributes.getInts("strides",[]),a=n.attributes.getInts("pads",[]);if(r!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");return _e({autoPad:e,ceilMode:r,countIncludePad:t,kernelShape:o,strides:i,pads:a})},fb=(n,e,r,t)=>{let[o,i]=_b(n,t,r),a=re.size(o.kernelShape),s="value += _X(x);",u="";o.countIncludePad?u+=`value /= float(${a});`:u+=`value /= float(${a} - pad);`;let c=`
        ${wb(n[0].dims,o,s,u,"0.0")}
      `;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:c}},hb=(n,e,r)=>{Ki(e);let t={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${r.countIncludePad}`};return[n.run({...t,get:()=>fb(e,t,!0,r)},e)]},mb=n=>{let e=n.attributes.getInt("count_include_pad",0)!==0;return _e({autoPad:"",ceilMode:0,countIncludePad:e,kernelShape:[],strides:[],pads:[]})},gb=(n,e,r)=>{Ki(e);let t={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[n.run({...t,get:()=>yb(e,t,!1,r)},e)]},bb=n=>{let e=n.attributes.getString("auto_pad","NOTSET"),r=n.attributes.getInt("ceil_mode",0),t=n.attributes.getInts("kernel_shape"),o=n.attributes.getInts("strides",[]),i=n.attributes.getInts("pads",[]),a=n.attributes.getInt("storage_order",0),s=n.attributes.getInts("dilations",[]);if(a!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");return _e({autoPad:e,ceilMode:r,countIncludePad:!1,kernelShape:t,strides:o,pads:i,storageOrder:a,dilations:s})},yb=(n,e,r,t)=>{let[o,i]=_b(n,t,r),l=`
      ${wb(n[0].dims,o,`
      value = max(_X(x), value);
    `,"","-1e5")}
    `;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:l}},_b=(n,e,r)=>{let t=n[0].dims.slice(),o=Object.hasOwnProperty.call(e,"dilations"),i=e.kernelShape.slice(),a=e.strides.slice(),s=o?e.dilations.slice():[],u=e.pads.slice();Dn.adjustPoolAttributes(r,t,i,a,s,u);let l=Dn.computePoolOutputShape(r,t,a,s,i,u,e.autoPad),c=Object.assign({},e);return o?Object.assign(c,{kernelShape:i,strides:a,pads:u,dilations:s,cacheKey:e.cacheKey}):Object.assign(c,{kernelShape:i,strides:a,pads:u,cacheKey:e.cacheKey}),[c,l]},hP={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},cb={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},vb=(n,e)=>(Ki(e),[n.run({...cb,get:()=>yb(e,cb,!0,hP)},e)]),Ki=n=>{if(!n||n.length!==1)throw new Error("Pool ops requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")},wb=(n,e,r,t,o)=>{let i=n.length;if(e.kernelShape.length<=2){let a=e.kernelShape[e.kernelShape.length-1],s=e.strides[e.strides.length-1],u=e.pads[e.pads.length/2-1],l=e.pads[e.pads.length-1],c=n[i-1],p="",h="",m="";if(u+l!==0?p=`
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
          }`,e.kernelShape.length===2){let y=e.kernelShape[e.kernelShape.length-2],T=e.strides[e.strides.length-2],w=e.pads[e.pads.length/2-2],x=e.pads[e.pads.length-2],I=n[i-2];w+x!==0?h=`
            for (int j = 0; j < ${y}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${T} - ${w} + j;
              if (x[${i} - 2] < 0 || x[${i} - 2] >= ${I}) {
                pad+= ${a};
                continue;
              }
          `:h=`
            for (int j = 0; j < ${y}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${T} - ${w} + j;
            `,m=`
          }
        `}return`
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);

          float value = ${o};
          int pad = 0;
          ${h}
          ${p}
          ${m}
          ${t}
          return value;
        }
      `}else{let a=re.size(e.kernelShape),s=re.computeStrides(e.kernelShape),u=s.length,l=e.pads.length,c=mP(u),p=ji(n,"inputDims"),h=ji(e.pads,"pads"),m=ji(s,"kernelStrides"),g=ji(e.strides,"strides"),y=e.pads.reduce((x,I)=>x+I),T="";return y?T=`
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
        ${c}
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);
          int offset[${u}];
          int pads[${l}];
          int inputDims[${i}];
          int kernelStrides[${u}];
          int strides[${u}];
          ${h}
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
              ${T}
          }
          ${t}

          return value;
        }
      `}},ji=(n,e)=>{let r="";for(let t=0;t<n.length;t++)r+=`
      ${e}[${t}] = ${n[t]};
    `;return r},mP=n=>`
  void offsetToIndices(int offset, int[${n}] strides, out int[${n}] indices) {
    if (${n} == 0) {
      return;
    }
    for (int i = 0; i < ${n} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${n} - 1] = offset;
  }`});var Bn,mn,gP,bP,Tb,Ib,Sb,$b,Ab,Ob,Pb,Eb=N(()=>{"use strict";ct();Lo();Re();Ae();Bn=(n,e,r,t,o)=>{bP(e);let i={name:t,inputNames:["A"],inputTypes:[0]};return[n.run({...i,cacheHint:r.cacheKey,get:()=>gP(n,e,r,t,o,i)},e)]},mn=n=>{let e=n.attributes.getInts("axes",[]),r=n.attributes.getInt("keepdims",1)===1;return _e({axes:e,keepDims:r})},gP=(n,e,r,t,o,i)=>{let a=[],s=e[0].dims.length||1,u=[],l=re.normalizeAxes(r.axes,e[0].dims.length),c=o(e,l),p=c[1];for(let g=0;g<e[0].dims.length;g++)l.indexOf(g)>=0||l.length===0?(r.keepDims&&a.push(1),p=`
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
      }`;return{...i,output:{dims:a,type:e[0].type,textureType:0},shaderSource:m}},bP=n=>{if(!n||n.length!==1)throw new Error("Reduce op requires 1 input.");if(hn.indexOf(n[0].type)===-1)throw new Error("Invalid input type.")},Tb=(n,e,r)=>Bn(n,e,r,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),Ib=(n,e,r)=>Bn(n,e,r,"ReduceMean",(o,i)=>{let a=1;for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=o[0].dims[s]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${a}.;`]}),Sb=(n,e,r)=>Bn(n,e,r,"ReduceMax",(o,i)=>{let a=[];for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`inputIdx[${s}] = 0;`);return[`${a.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),$b=(n,e,r)=>Bn(n,e,r,"ReduceMin",(o,i)=>{let a=[];for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`inputIdx[${s}] = 0;`);return[`${a.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),Ab=(n,e,r)=>Bn(n,e,r,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),Ob=(n,e,r)=>Bn(n,e,r,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),Pb=(n,e,r)=>Bn(n,e,r,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])});var Cb,Db=N(()=>{"use strict";Re();Cb=(n,e)=>{let r=re.calculateReshapedDims(e[0].dims,e[1].integerData);return n.session.pack?[n.reshapePacked(e[0],r)]:[n.reshapeUnpacked(e[0],r)]}});var kb,Fl,Nb,Lb,Ro,yP,Vl,Xi,Gl=N(()=>{"use strict";ct();Ze();Ae();kb={name:"Upsample",inputNames:["X"],inputTypes:[0]},Fl=(n,e,r)=>(Vl(e,r),[n.run({...kb,cacheHint:r.cacheKey,get:()=>yP(n,e,r)},e)]),Nb=n=>Ro(n,7),Lb=n=>Ro(n,9),Ro=(n,e)=>{let r=e>=10,t=n.attributes.getString("mode","nearest");if(t!=="nearest"&&t!=="linear"&&(e<11||t!=="cubic"))throw new Error(`unrecognized mode: ${t}`);let o=[];e<9&&(o=n.attributes.getFloats("scales"),Xi(o,t,r));let i=n.attributes.getFloat("extrapolation_value",0),a=e>10?n.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(a)===-1)throw new Error(`coordinate_transform_mode '${a}' is not supported`);let s=a==="tf_crop_and_resize",u=s,l=t==="nearest"&&e>=11?n.attributes.getString("nearest_mode","round_prefer_floor"):"";if(["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(l)===-1)throw new Error(`nearest_mode '${l}' is not supported`);let c=n.attributes.getFloat("cubic_coeff_a",-.75),p=n.attributes.getInt("exclude_outside",0)!==0;if(p&&t!=="cubic")throw new Error("exclude_outside can be set to 1 only when mode is CUBIC.");let h=e<11?!0:t==="nearest"&&a==="asymmetric"&&l==="floor",m=0,g=0,y=0;return e>10?n.inputs.length>2?(m=1,g=2,y=3):(g=1,y=2):e===9&&(g=1),_e({opset:e,isResize:r,mode:t,scales:o,extrapolationValue:i,coordinateTransformMode:a,useExtrapolation:u,needRoiInput:s,nearestMode:l,cubicCoefficientA:c,excludeOutside:p,useNearest2xOptimization:h,roiInputIdx:m,scalesInputIdx:g,sizesInputIdx:y})},yP=(n,e,r)=>{let t=se(n.session.backend.glContext.version),[o,i]=n.calculateTextureWidthAndHeight(e[0].dims,0),a=e[0].dims.map((y,T)=>Math.floor(y*r.scales[T])),[s,u]=n.calculateTextureWidthAndHeight(a,0),l=a.length,c=new Array(l),p=new Array(l),h=`
      int output_pitches[${l}];
      int input_pitches[${l}];
      `;for(let y=l-1;y>=0;y--)c[y]=y===l-1?1:c[y+1]*a[y+1],p[y]=y===l-1?1:p[y+1]*e[0].dims[y+1],h+=`
        output_pitches[${y}] = ${c[y]};
        input_pitches[${y}] = ${p[y]};
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
    ${m}
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
    ${m}
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
    }`;return{...kb,output:{dims:a,type:e[0].type,textureType:0},shaderSource:g,variables:[{name:"scales",type:"int",arrayLength:r.scales.length,data:r.scales.map(y=>Math.ceil(y))}]}},Vl=(n,e)=>{if(!n||e.opset<9&&n.length!==1||e.opset>=9&&e.opset<11&&n.length!==2||e.opset>=11&&n.length<2)throw new Error("invalid inputs.");if(e.scales.length>0&&n[0].dims.length!==e.scales.length)throw new Error("Invalid input shape.");if(n[0].type==="string")throw new Error("Invalid input tensor types.")},Xi=(n,e,r)=>{if(r){for(let t of n)if(t<=0)throw new Error("Scale value should be greater than 0.")}else for(let t of n)if(t<1)throw new Error("Scale value should be greater than or equal to 1.");if((e==="linear"||e==="cubic")&&n.length!==2&&(n.length!==4||n[0]!==1||n[1]!==1))throw new Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${r?"Resize":"Upsample"} opeartor.`)}});var Ul,Wl,Rb,zb,_P,vP,wP,xP,Mb=N(()=>{"use strict";Ze();Ae();Nr();Rn();Gl();Ul={name:"Resize",inputNames:["A"],inputTypes:[2]},Wl=(n,e,r)=>(Vl(e,r),[n.run({...Ul,cacheHint:r.cacheKey,get:()=>_P(n,e,r)},e)]),Rb=n=>Ro(n,10),zb=n=>Ro(n,11),_P=(n,e,r)=>{let t=se(n.session.backend.glContext.version),[o,i]=vP(e,r);if(o.every(I=>I===1)&&r.coordinateTransformMode!=="tf_crop_and_resize")return{...Ul,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${t.texture2D}(X, TexCoords);
                    ${t.output} = v;
                }`};let s=i.length;if(s<2)throw new Error(`output dimension should be at least 2, but got ${s}`);let u=i[s-2],l=i[s-1],c=e[0].dims;if(s!==c.length)throw new Error(`output dimension should match input ${c.length}, but got ${s}`);let p=c[s-2],h=c[s-1],m=o[s-2],g=o[s-1],y="";if(r.mode!=="linear")throw new Error(`resize (packed) does not support mode: '${r.mode}'`);switch(r.coordinateTransformMode){case"asymmetric":y=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return vec4(coords) / scaleWHWH;
                    }
                `;break;case"half_pixel":y=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return (vec4(coords) + 0.5) / scaleWHWH - 0.5;
                    }
                `;break;case"pytorch_half_pixel":y=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 fcoords = vec4(coords);
                        return vec4(
                            ${l}.0 > 1.0 ? (fcoords.x + 0.5) / scaleWHWH.x - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.y + 0.5) / scaleWHWH.y - 0.5 : 0.0,
                            ${l}.0 > 1.0 ? (fcoords.z + 0.5) / scaleWHWH.z - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.w + 0.5) / scaleWHWH.w - 0.5 : 0.0
                          );
                    }
                `;break;case"align_corners":y=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 resized = vec4(${l}.0 - 1.0, ${u}.0 - 1.0, ${l}.0 - 1.0,
                            ${u}.0 - 1.0);
                        vec4 original = vec4(${h}.0 - 1.0, ${p}.0 - 1.0, ${h}.0 - 1.0,
                            ${p}.0 - 1.0);
                        vec4 new_scale = original / resized;
                        return vec4(coords) * new_scale;
                    }
                `;break;default:throw new Error(`resize (packed) does not support coordinateTransformMode:                                 '${r.coordinateTransformMode}'`)}let T=bt(s),w=Lr(),x=`
            const vec2 inputWH = vec2(${p}.0, ${h}.0);
            const vec4 scaleWHWH = vec4(float(${m}), float(${g}), float(${m}), float(${g}));
            ${w}
            ${y}
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
        `;return{...Ul,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:x}},vP=(n,e)=>{let t=n[0].dims,o=e.scales,i;if(o.length===0){let s=n[e.scalesInputIdx];if(s&&s.size!==0){if(n[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");o=wP(s,e.mode,e.isResize)}else{let u=n[e.sizesInputIdx];if(!u||u.size===0)throw new Error("Either scales or sizes MUST be provided as input.");i=Array.from(u.integerData),o=xP(i,t,e.mode,e.isResize)}}else if(n[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");let a=i||t.map((s,u)=>Math.floor(s*o[u]));return[o,a]},wP=(n,e,r)=>{let t=Array.from(n.floatData);return Xi(t,e,r),t},xP=(n,e,r,t)=>{let o=e.length,i=new Array(o);for(let a=0,s=o;a<s;a++)if(e[a]===0){if(n[a]!==0)throw new Error("Input dim is zero but required output dim is non-zero.");i[a]=1}else i[a]=n[a]/e[a];return Xi(i,r,t),i}});var Bb,TP,Fb=N(()=>{"use strict";Ln();Bb=(n,e)=>(TP(e),[new nt([e[0].dims.length],"int32",void 0,void 0,new Int32Array(e[0].dims))]),TP=n=>{if(!n||n.length!==1)throw new Error("Shape requires 1 input.")}});var Hl,Vb,Gb,Ub,IP,Wb,SP,$P,Hb=N(()=>{"use strict";ct();Lo();Re();Ae();Hl={name:"Slice",inputNames:["A"],inputTypes:[0]},Vb=(n,e,r)=>(IP(e),[n.run({...Hl,cacheHint:r.cacheKey,get:()=>Ub(n,e[0],r)},e)]),Gb=n=>{let e=n.attributes.getInts("starts"),r=n.attributes.getInts("ends"),t=n.attributes.getInts("axes",[]);return _e({starts:e,ends:r,axes:t})},Ub=(n,e,r)=>{let t=r.axes.length===0?e.dims.slice(0).map((p,h)=>h):r.axes,o=re.normalizeAxes(t,e.dims.length),i=r.starts.map((p,h)=>p>e.dims[o[h]]-1?e.dims[o[h]]:re.normalizeAxis(p,e.dims[o[h]])),a=r.ends.map((p,h)=>p>e.dims[o[h]]-1?e.dims[o[h]]:re.normalizeAxis(p,e.dims[o[h]])),s=e.dims.slice(),u=[];for(let p=0;p<o.length;p++)s[o[p]]=a[p]-i[p],i[p]>0&&u.push(`outputIdx[${o[p]}] += ${i[p]};`);let c=`
      float process(int outputIdx[${s.length}]) {
        ${u.join(`
      `)}
        return _A(outputIdx);
      }`;return{...Hl,output:{dims:s,type:e.type,textureType:0},shaderSource:c}},IP=n=>{if(!n||n.length!==1)throw new Error("Slice requires 1 input.");if(hn.indexOf(n[0].type)===-1)throw new Error("Invalid input type.")},Wb=(n,e)=>{$P(e);let r=SP(n,e);return[n.run({...Hl,cacheHint:r.cacheKey,get:()=>Ub(n,e[0],r)},[e[0]])]},SP=(n,e)=>{if(!n.session.isInitializer(e[1].dataId)||!n.session.isInitializer(e[2].dataId)||e.length>=4&&!n.session.isInitializer(e[3].dataId)||e.length>=5&&!n.session.isInitializer(e[4].dataId))throw new Error("dynamic slice attributes are not allowed");if(e.length>=5&&e[4].integerData.some(a=>a!==1))throw new Error("currently non-1 steps is not supported for Slice");let r=Array.from(e[1].integerData),t=Array.from(e[2].integerData),o=e.length>=4?Array.from(e[3].integerData):[],i=`${o};${r};${t}`;return{starts:r,ends:t,axes:o,cacheKey:i}},$P=n=>{if(!n||n.length<3||n.length>5)throw new Error("Invalid input number.");if(n[1].type!=="int32"||n[1].dims.length!==1)throw new Error("Invalid input type.");if(n[2].type!=="int32"||n[2].dims.length!==1)throw new Error("Invalid input type.");if(n.length>=4&&(n[3].type!=="int32"||n[3].dims.length!==1))throw new Error("Invalid input type.");if(n.length>=5&&(n[4].type!=="int32"||n[4].dims.length!==1))throw new Error("Invalid input type.")}});var qb,jb,Kb,Xb,Zb,Jb,Qb,Yb,AP,OP,PP,ey,ty=N(()=>{"use strict";ct();Re();Ze();Ae();qi();qb={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},jb={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},Kb={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},Xb=(n,e,r)=>{ey(e);let t=e[0].dims.slice(),o=re.normalizeAxis(r.axis,t.length),i=re.sizeToDimension(t,o),a=re.sizeFromDimension(t,o);return Yb(n,e,r,i,a)},Zb=n=>_e({axis:n.attributes.getInt("axis",1)}),Jb=n=>_e({axis:n.attributes.getInt("axis",-1)}),Qb=(n,e,r)=>{ey(e);let t=e[0].dims.slice(),o=re.normalizeAxis(r.axis,t.length),i=t.length,a=o!==i-1,s=[],u=[],l=[],c;a&&(u=Array.from({length:i}).map((g,y)=>y),u[o]=i-1,u[i-1]=o,u.map(g=>s.push(t[g])),c=_e({perm:u}),l=Mn(n,e,c));let p=a?re.sizeToDimension(s,i-1):re.sizeToDimension(t,i-1),h=a?re.sizeFromDimension(s,i-1):re.sizeFromDimension(t,i-1),m=Yb(n,a?l:e,r,p,h);return a?Mn(n,m,c):m},Yb=(n,e,r,t,o)=>{let i=AP(n,e[0],t,o,[t]),a=n.run({...qb,cacheHint:r.cacheKey,get:()=>i},e),s=OP(n,e[0],t,o,i.output.dims,[t]),u=n.run({...jb,cacheHint:r.cacheKey,get:()=>s},[e[0],a]),l=PP(n,e[0],t,o,i.output.dims,s.output.dims);return[n.run({...Kb,cacheHint:r.cacheKey,get:()=>l},[e[0],a,u])]},AP=(n,e,r,t,o)=>{let[i,a]=n.calculateTextureWidthAndHeight(e.dims,0),s=o.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1)throw new Error("Dimensionality of the output should be 1");if(o[0]!==r)throw new Error("Shape of the output should be equal to logical row count");let u=se(n.session.backend.glContext.version),l=`
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
      }`;return{...qb,output:{dims:o,type:e.type,textureType:0},shaderSource:l}},OP=(n,e,r,t,o,i)=>{let[a,s]=n.calculateTextureWidthAndHeight(e.dims,0),u=i.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(i.length!==1)throw new Error("Dimensionality of the output should be 1");if(i[0]!==r)throw new Error("Shape of the output should be equal to logical row count");if(o.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==r)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=se(n.session.backend.glContext.version),c=`
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
      }`;return{...jb,output:{dims:i,type:e.type,textureType:0},shaderSource:c}},PP=(n,e,r,t,o,i)=>{let[a,s]=n.calculateTextureWidthAndHeight(e.dims,0),u=e.dims.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1||i.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==r||i[0]!==r)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=`
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
    }`;return{...Kb,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:l}},ey=n=>{if(!n||n.length!==1)throw new Error("Softmax requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type")}});var ry,ny,oy,EP,CP,DP,iy=N(()=>{"use strict";ct();Re();Ae();ry={name:"Split",inputNames:["A"],inputTypes:[0]},ny=(n,e,r)=>{DP(e);let t=re.normalizeAxis(r.axis,e[0].dims.length),o=EP(n,e,t,r),i=[];for(let a=0;a<o;++a)i.push(n.run({...ry,cacheHint:`${r.cacheKey};${a}`,get:()=>CP(n,e[0],r,t,a)},e));return i},oy=n=>{let e=n.attributes.getInt("axis",0),r=n.attributes.getInts("split",[]),t=n.outputs.length;return _e({axis:e,split:r,numOutputs:t})},EP=(n,e,r,t)=>{let[,o]=Po.splitShape(e[0].dims,r,t.split,t.numOutputs);return o.length},CP=(n,e,r,t,o)=>{let[i,a]=Po.splitShape(e.dims,t,r.split,r.numOutputs),s=a[o],u=i[o],c=`
      float process(int indices[${u.length}]) {
        indices[${t}] += ${s};
        return _A(indices);
      }
    `;return{...ry,cacheHint:`${r.cacheKey}:${o}`,output:{dims:u,type:e.type,textureType:0},shaderSource:c}},DP=n=>{if(!n||n.length!==1)throw new Error("Split requires one input.");if(n[0].type!=="int8"&&n[0].type!=="uint8"&&n[0].type!=="int16"&&n[0].type!=="uint16"&&n[0].type!=="int32"&&n[0].type!=="uint32"&&n[0].type!=="float32"&&n[0].type!=="float64"&&n[0].type!=="bool")throw new Error("Invalid input type.")}});var ql,ay,sy,kP,NP,uy=N(()=>{"use strict";Re();ql=(n,e,r)=>{kP(e);let t=re.squeezeShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},ay=(n,e)=>(NP(e),ql(n,[e[0]],Array.from(e[1].integerData))),sy=n=>n.attributes.getInts("axes"),kP=n=>{if(!n||n.length!==1)throw new Error("Squeeze requires 1 input.");if(n[0].type==="string")throw new Error("invalid input tensor types.")},NP=n=>{if(!n||n.length!==2)throw new Error("Squeeze requires 2 inputs.");if(n[1].type!=="int32")throw new Error("Invalid input type.")}});var ly,LP,RP,cy=N(()=>{"use strict";Ze();Ae();ly=(n,e)=>{RP(e);let r={name:"Sum",inputNames:e.map((o,i)=>`X${i}`),inputTypes:new Array(e.length).fill(0)};return[n.run({...r,get:()=>LP(n,e,r)},e)]},LP=(n,e,r)=>{let t=se(n.session.backend.glContext.version),o=e[0].dims.slice(),a=`
      void main() {
        vec4 result = ${e.map((s,u)=>`${t.texture2D}(X${u},TexCoords)`).join(" + ")};
        ${t.output} = result;
      }
    `;return{...r,output:{dims:o,type:e[0].type,textureType:0},hasMain:!0,shaderSource:a}},RP=n=>{if(!n||n.length===0)throw new Error("Sum requires inputs.");let e=n[0].dims.length;for(let r=1;r<n.length;r++){if(e!==n[r].dims.length)throw new Error("Input shapes are mismatched.");for(let t=0;t<e;t++)if(n[0].dims[t]!==n[r].dims[t])throw new Error("Input shapes are not matched.")}if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.");for(let r=1;r<n.length;r++)if(n[0].type!==n[r].type)throw new Error("Input types are not matched.")}});var dy,zP,MP,py=N(()=>{"use strict";Lo();Ae();dy=(n,e)=>{MP(e);let r={name:"Tile",inputNames:["A"],inputTypes:[0]};return[n.run({...r,get:()=>zP(n,e,r)},e)]},zP=(n,e,r)=>{let t=e[0].dims.slice(),o=new Array(t.length),i=[];for(let u=0;u<t.length;u++)o[u]=t[u]*e[1].numberData[u],i.push(`inputIdx[${u}] = int(mod(float(outputIdx[${u}]), ${t[u]}.));`);let a=o.length,s=`
      float process(int outputIdx[${a}]) {
        int inputIdx[${a}];
        ${i.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...r,output:{dims:o,type:e[0].type,textureType:0},shaderSource:s}},MP=n=>{if(!n||n.length!==2)throw new Error("Tile requires 2 input.");if(n[1].dims.length!==1)throw new Error("The second input shape must 1 dimension.");if(n[1].dims[0]!==n[0].dims.length)throw new Error("Invalid input shape.");if(hn.indexOf(n[0].type)===-1)throw new Error("Invalid input type.");if(n[1].type!=="int32"&&n[1].type!=="int16")throw new Error("Invalid repeat type.")}});var jl,fy,hy,BP,FP,my=N(()=>{"use strict";Re();jl=(n,e,r)=>{BP(e);let t=re.unsqueezeShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},fy=(n,e)=>(FP(e),jl(n,[e[0]],Array.from(e[1].integerData))),hy=n=>n.attributes.getInts("axes"),BP=n=>{if(!n||n.length!==1)throw new Error("Unsqueeze requires 1 input.");if(n[0].type==="string")throw new Error("invalid input tensor types.")},FP=n=>{if(!n||n.length!==2)throw new Error("Unsqueeze requires 2 inputs.");if(n[1].type!=="int32")throw new Error("Invalid input type.")}});var gy,by=N(()=>{"use strict";Am();Fm();Um();Xm();Ui();Dg();Mg();Vg();Wg();Kg();Jg();tb();ib();Wi();lb();xb();Eb();Db();Mb();Fb();Hb();ty();iy();uy();cy();py();qi();El();my();Gl();gy=[["Abs","","6+",Zm],["Acos","","7+",Jm],["Add","","7+",Om],["And","","7+",Pm],["Asin","","7+",Qm],["Atan","","7+",Ym],["AveragePool","","7+",db,pb],["BatchNormalization","","7+",Sm,$m],["Cast","","6+",Vm,Gm],["Ceil","","6+",rg],["Clip","","6-10",Ol,eg],["Clip","","11+",tg],["Concat","","4+",qm,Km],["Conv","","1+",Rl,zl],["ConvTranspose","","1+",Eg,Cg],["Cos","","7+",ng],["Div","","7+",Em],["Dropout","","7+",Pl],["DepthToSpace","","1+",Rg,zg],["Equal","","7+",Cm],["Elu","","6+",og,ig],["Exp","","6+",ag],["Flatten","","1+",Bg,Fg],["Floor","","6+",sg],["FusedConv","com.microsoft","1+",Rl,zl],["Gather","","1+",Gg,Ug],["Gemm","","7-10",Ml,qg],["Gemm","","11+",Ml,jg],["GlobalAveragePool","","1+",hb,mb],["GlobalMaxPool","","1+",vb],["Greater","","7+",Dm],["Identity","","1+",Pl],["ImageScaler","","1+",Xg,Zg],["InstanceNormalization","","6+",Yg,eb],["LeakyRelu","","6+",ug,lg],["Less","","7+",km],["LRN","","1+",rb,nb],["Log","","6+",cg],["MatMul","","1+",Tg,Ig],["MaxPool","","1+",gb,bb],["Mul","","7+",Nm],["Neg","","6+",dg],["Not","","1+",pg],["Or","","7+",Lm],["Pad","","2-10",Bl,ab],["Pad","","11+",sb,ub],["Pow","","7+",Rm],["PRelu","","7+",zm],["ReduceLogSum","","1+",Ob,mn],["ReduceMax","","1+",Sb,mn],["ReduceMean","","1+",Ib,mn],["ReduceMin","","1+",$b,mn],["ReduceProd","","1+",Ab,mn],["ReduceSum","","1-12",Tb,mn],["ReduceSumSquare","","1+",Pb,mn],["Relu","","6+",fg],["Reshape","","5+",Cb],["Resize","","10",Wl,Rb],["Resize","","11+",Wl,zb],["Shape","","1+",Bb],["Sigmoid","","6+",hg],["Sin","","7+",mg],["Slice","","10+",Wb],["Slice","","1-9",Vb,Gb],["Softmax","","1-12",Xb,Zb],["Softmax","","13+",Qb,Jb],["Split","","2-12",ny,oy],["Sqrt","","6+",gg],["Squeeze","","1-12",ql,sy],["Squeeze","","13+",ay],["Sub","","7+",Mm],["Sum","","6+",ly],["Tan","","7+",bg],["Tanh","","6+",yg],["Tile","","6+",dy],["Transpose","","1+",Mn,Ng],["Upsample","","7-8",Fl,Nb],["Upsample","","9",Fl,Lb],["Unsqueeze","","1-12",jl,hy],["Unsqueeze","","13+",fy],["Xor","","7+",Bm]]});function _y(n){let e={},r;for(;(r=yy.exec(n))!==null;){let t=r[3].split(",").map(o=>{let i=o.trim().split(" ");return i&&i.length===2?{type:i[0],name:i[1]}:null}).filter(o=>o!==null);e[r[2]]={params:t,body:r[4]}}for(let t in e){let o=VP.replace("__FUNC__",t),i=new RegExp(o,"gm");for(;(r=i.exec(n))!==null;){let a=r[1],s=r[2],u=r[3].split(","),l=a?`${a} ${s};`:"",c=e[t].body,p="";e[t].params.forEach((m,g)=>{m&&(p+=`${m.type} ${m.name} = ${u[g]};
`)}),c=`${p}
 ${c}`,c=c.replace("return",`${s} = `);let h=`
      ${l}
      {
        ${c}
      }
      `;n=n.replace(r[0],h)}}return n=n.replace(yy,""),n}var yy,VP,vy=N(()=>{"use strict";yy=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,VP="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function io(n,e){let r=[],t=[],o=e!=null&&Array.isArray(e)&&e.length===0,i=e==null||o?null:GP(e,n).sort(),a=0;for(let s=0;s<n.length;++s){if(i!=null){if(i[a]===s&&n[s]!==1)throw new Error(`Can't squeeze axis ${s} since its dim '${n[s]}' is not 1`);(i[a]==null||i[a]>s)&&n[s]===1&&(r.push(n[s]),t.push(s)),i[a]<=s&&a++}n[s]!==1&&(r.push(n[s]),t.push(s))}return{newShape:r,keptDims:t}}function GP(n,e){let r=e.length;return n=n==null?e.map((t,o)=>o):[].concat(n),Yn(n.every(t=>t>=-r&&t<r),()=>`All values in axis param must be in range [-${r}, ${r}) but got axis ${n}`),Yn(n.every(UP),()=>`All values in axis param must be integers but got axis ${n}`),n.map(t=>t<0?r+t:t)}function UP(n){return n%1===0}function WP(n){if(n.length===0)return 1;let e=n[0];for(let r=1;r<n.length;r++)e*=n[r];return e}function wy(n){let e=Math.ceil(Math.sqrt(n));return[e,Math.ceil(n/e)]}var Zi,Kl=N(()=>{"use strict";Et();Re();Zi=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,r){let t=this.computeTexture(e,r);return r&&r.isPacked&&(t[0]/=2,t[1]/=2),r&&r.reverseWH?[t[1],t[0]]:t}computeTexture(e,r){let t=r&&r.isPacked;if(e.length===0)return t?[2,2]:[1,1];let o=this.maxTextureSize;if(r&&r.breakAxis!==void 0){let s=r.breakAxis>=e.length?1:e.slice(r.breakAxis).reduce((l,c)=>l*c),u=r.breakAxis<=0?1:e.slice(0,r.breakAxis).reduce((l,c)=>l*c);if(s>o||u>o)Be.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${r.breakAxis}`);else return[s,u]}let i=e.slice(0);t&&(o=o*2,i=i.map((s,u)=>u>=i.length-2?i[u]%2===0?i[u]:i[u]+1:i[u]),i.length===1&&(i=[2,i[0]])),i.length!==2&&(i=io(i).newShape);let a=WP(i);return i.length<=1&&a<=o?[1,a]:i.length===2&&i[0]<=o&&i[1]<=o?i:i.length===3&&i[0]*i[1]<=o&&i[2]<=o?[i[0]*i[1],i[2]]:i.length===3&&i[0]<=o&&i[1]*i[2]<=o?[i[0],i[1]*i[2]]:i.length===4&&i[0]*i[1]*i[2]<=o&&i[3]<=o?[i[0]*i[1]*i[2],i[3]]:i.length===4&&i[0]<=o&&i[1]*i[2]*i[3]<=o?[i[0],i[1]*i[2]*i[3]]:t?wy(a/4).map(s=>s*2):wy(a)}}});var Ji,xy=N(()=>{"use strict";Re();Kr();Ze();Kl();Nr();Ji=class extends Rt{constructor(e){super(e)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let e="offsetToCoords";return{offsetToCoords:new K(`
      vec2 ${e}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){let e="coordsToOffset";return{coordsToOffset:new K(`
      int ${e}(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let e=this.context.outputTextureLayout;return e.isPacked?this.getPackedOutputSamplingSnippet(e):this.getUnpackedOutputSamplingSnippet(e)}getPackedOutputSamplingSnippet(e){let r=e.unpackedShape,t=[e.width,e.height],o={},i="getOutputCoords";switch(r.length){case 0:o[i]=this.getOutputScalarCoords();break;case 1:o[i]=this.getOutputPacked1DCoords(r,t);break;case 2:o[i]=this.getOutputPacked2DCoords(r,t);break;case 3:o[i]=this.getOutputPacked3DCoords(r,t);break;default:o[i]=this.getOutputPackedNDCoords(r,t)}let s=`
      void setOutput(vec4 val) {
        ${se(this.context.glContext.version).output} = val;
      }
    `,u="floatTextureSetRGBA";return o[u]=new K(s),o}getUnpackedOutputSamplingSnippet(e){let r=e.unpackedShape,t=[e.width,e.height],o={},i="getOutputCoords";switch(r.length){case 0:o[i]=this.getOutputScalarCoords();break;case 1:o[i]=this.getOutputUnpacked1DCoords(r,t);break;case 2:o[i]=this.getOutputUnpacked2DCoords(r,t);break;case 3:o[i]=this.getOutputUnpacked3DCoords(r,t);break;case 4:o[i]=this.getOutputUnpacked4DCoords(r,t);break;case 5:o[i]=this.getOutputUnpacked5DCoords(r,t);break;case 6:o[i]=this.getOutputUnpacked6DCoords(r,t);break;default:throw new Error(`Unsupported output dimensionality: ${r.length}`)}let s=`
        void setOutput(float val) {
          ${se(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `,u="floatTextureSetR";return o[u]=new K(s),o}getOutputScalarCoords(){return new K(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(e,r){let t=r,o="";return t[0]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${t[1]}.0);
          }
        `,new K(o)):t[1]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${t[0]}.0);
          }
        `,new K(o)):(o=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${t[0]}, ${t[1]}));
          return 2 * (resTexRC.y * ${t[0]} + resTexRC.x);
        }
      `,new K(o))}getOutputPacked2DCoords(e,r){let t="";if(Cn.arraysEqual(e,r))return t=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${r[0]}, ${r[1]}));
        }
      `,new K(t);let o=r,i=Math.ceil(e[1]/2);return t=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${o[0]}, ${o[1]}));

          int index = resTexRC.y * ${o[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${i}) * 2;
          int c = 2 * (index / ${i});

          return ivec2(r, c);
        }
      `,new K(t)}getOutputPacked3DCoords(e,r){let t=[r[0],r[1]],o=Math.ceil(e[2]/2),i=o*Math.ceil(e[1]/2),a=`
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
      `;return new K(a)}getOutputPackedNDCoords(e,r){let t=[r[0],r[1]],o=Math.ceil(e[e.length-1]/2),i=o*Math.ceil(e[e.length-2]/2),a=i,s="",u="b, r, c";for(let c=2;c<e.length-1;c++)a*=e[e.length-c-1],s=`
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
    `;return new K(l)}getOutputUnpacked1DCoords(e,r){let t=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          return resTexRC.y * ${r[0]} + resTexRC.x;
        }
      `;return new K(t)}getOutputUnpacked2DCoords(e,r){let t=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          int r = index / ${e[1]};
          int c = index - r * ${e[1]};
          return ivec2(r, c);
        }
      `;return new K(t)}getOutputUnpacked3DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d"],s=i.map((u,l)=>{let c=`int ${a[l]} = index / ${u}`,p=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${c}; ${p};`}).join("");return t=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          ${s}
          return ivec3(r, c, d);
        }
      `,new K(t)}getOutputUnpacked4DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2"],s=i.map((u,l)=>{let c=`int ${a[l]} = index / ${u}`,p=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${c}; ${p};`}).join("");return t=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          ${s}
          return ivec4(r, c, d, d2);
        }
      `,new K(t)}getOutputUnpacked5DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2","d3"],s=i.map((u,l)=>{let c=`int ${a[l]} = index / ${u}`,p=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${c}; ${p};`}).join("");return t=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          ${s}
          return ivec5(r, c, d, d2, d3);
        }
      `,new K(t)}getOutputUnpacked6DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2","d3","d4"],s=i.map((u,l)=>{let c=`int ${a[l]} = index / ${u}`,p=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${c}; ${p};`}).join("");return t=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${r[0]}, ${r[1]}));
         int index = resTexRC.y * ${r[0]} + resTexRC.x;
         ${s}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new K(t)}getCommonUtilFuncs(){let e={},r="uvFromFlat";e[r]=new K(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),r="packedUVfrom1D",e[r]=new K(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),r="packedUVfrom2D",e[r]=new K(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),r="packedUVfrom3D",e[r]=new K(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),r="sampleTexture";let t=se(this.context.glContext.version);return e[r]=new K(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${t.texture2D}(textureSampler, uv).r;
        }`),e}getInputsSamplingSnippets(){let e={},r=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o],a=Ri(t);i.isPacked?e[a]=this.getPackedSamplerFromInput(a,t,i):e[a]=this.getUnpackedSamplerFromInput(a,t,i);let s=lm(t);i.unpackedShape.length<=r.unpackedShape.length&&(i.isPacked?e[s]=this.getPackedSamplerAtOutputCoords(s,i,r,t):e[s]=this.getUnpackedSamplerAtOutputCoords(s,i,r,t))}),e}getPackedSamplerAtOutputCoords(e,r,t,o){let i=r.unpackedShape,a=t.unpackedShape,u=Ri(o),l=i.length,c=a.length,p=gt.getBroadcastDims(i,a),h=bt(c),m=c-l,g,y=jt();l===0?g="":c<2&&p.length>=1?g="coords = 0;":g=p.map(M=>`coords.${y[M+m]} = 0;`).join(`
`);let T="";c<2&&l>0?T="coords":T=i.map((M,F)=>`coords.${y[F+m]}`).join(", ");let w="return outputValue;",I=re.size(i)===1,P=re.size(a)===1;if(l===1&&!I&&!P)w=`
        return vec4(outputValue.xy, outputValue.xy);
      `;else if(I&&!P)c===1?w=`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:w=`
          return vec4(outputValue.x);
        `;else if(p.length){let M=l-2,F=l-1;p.indexOf(M)>-1&&p.indexOf(F)>-1?w="return vec4(outputValue.x);":p.indexOf(M)>-1?w="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":p.indexOf(F)>-1&&(w="return vec4(outputValue.xx, outputValue.zz);")}let C=`
        int lastDim = coords.${y[c-1]};
        coords.${y[c-1]} = coords.${y[c-2]};
        coords.${y[c-2]} = lastDim;
      `,R=`
      vec4 ${e}() {
        ${h} coords = getOutputCoords();
        ${C}
        ${g}
        vec4 outputValue = ${u}(${T});
        ${w}
      }
    `;return new K(R,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(e,r,t,o){let i=[t.width,t.height],a=[r.width,r.height],s=r.unpackedShape.length,u=t.unpackedShape.length,l=r.unpackedShape,c=t.unpackedShape,p=Ri(o);if(s===u&&Cn.arraysEqual(a,i)){let I=`
          float ${e}() {
            return sampleTexture(${o}, TexCoords);
          }
        `;return new K(I,["coordinates.sampleTexture"])}let h=bt(u),m=gt.getBroadcastDims(l,c),g=u-s,y,T=jt();s===0?y="":u<2&&m.length>=1?y="coords = 0;":y=m.map(I=>`coords.${T[I+g]} = 0;`).join(`
`);let w="";u<2&&s>0?w="coords":w=r.unpackedShape.map((I,A)=>`coords.${T[A+g]}`).join(", ");let x=`
        float ${e}() {
          ${h} coords = getOutputCoords();
          ${y}
          return ${p}(${w});
        }
      `;return new K(x,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(e,r,t){switch(t.unpackedShape.length){case 0:return this.getPackedSamplerScalar(e,r);case 1:return this.getPackedSampler1D(e,r,t);case 2:return this.getPackedSampler2D(e,r,t);case 3:return this.getPackedSampler3D(e,r,t);default:return this.getPackedSamplerND(e,r,t)}}getUnpackedSamplerFromInput(e,r,t){let o=t.unpackedShape;switch(o.length){case 0:return this.getUnpackedSamplerScalar(e,r,t);case 1:return this.getUnpackedSampler1D(e,r,t);case 2:return this.getUnpackedSampler2D(e,r,t);case 3:return this.getUnpackedSampler3D(e,r,t);case 4:return this.getUnpackedSampler4D(e,r,t);case 5:return this.getUnpackedSampler5D(e,r,t);case 6:return this.getUnpackedSampler6D(e,r,t);default:throw new Error(`Unsupported dimension ${o.length}-D`)}}getPackedSamplerScalar(e,r){let t=se(this.context.glContext.version),o=`
          vec4 ${e}() {
            return ${t.texture2D}(${r}, halfCR);
          }
        `;return new K(o)}getPackedSampler1D(e,r,t){let o=[t.width,t.height],i=[o[1],o[0]],a=se(this.context.glContext.version),u=`vec4 ${e}(int index) {
      vec2 uv = packedUVfrom1D(
      ${i[0]}, ${i[1]}, index);
      return ${a.texture2D}(${r}, uv);
    }`;return new K(u,["coordinates.packedUVfrom1D"])}getPackedSampler2D(e,r,t){let o=t.unpackedShape,i=[t.width,t.height],a=se(this.context.glContext.version),s=i[0],u=i[1];if(i!=null&&Cn.arraysEqual(o,i)){let m=`vec4 ${e}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${u}.0, ${s}.0);
        return ${a.texture2D}(${r}, uv);
      }`;return new K(m)}let l=i,c=Math.ceil(o[1]/2),h=`vec4 ${e}(int row, int col) {
      vec2 uv = packedUVfrom2D(${l[1]}, ${l[0]}, ${c}, row, col);
      return ${a.texture2D}(${r}, uv);
    }`;return new K(h,["coordinates.packedUVfrom2D"])}getPackedSampler3D(e,r,t){let o=t.unpackedShape,i=[t.width,t.height],a=[i[0],i[1]],s=se(this.context.glContext.version);if(o[0]===1){let g=o.slice(1),y=[1,2],T=eo(o,g),w=["b","row","col"],x=JSON.parse(JSON.stringify(t));x.unpackedShape=T;let I=this.getPackedSamplerFromInput(e,r,x),P=`${I.routineBody}
      vec4 ${e}(int b, int row, int col) {
        return ${e}(${to(w,y)});
      } `;return new K(P,I.dependencies)}let u=a[0],l=a[1],c=Math.ceil(o[2]/2),p=c*Math.ceil(o[1]/2),m=`vec4 ${e}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${l}, ${u}, ${p}, ${c}, b, row, col);
      return ${s.texture2D}(${r}, uv);}`;return new K(m,["coordinates.packedUVfrom3D"])}getPackedSamplerND(e,r,t){let o=t.unpackedShape,i=o.length,a=[t.width,t.height],s=se(this.context.glContext.version),u=[a[0],a[1]],l=u[1],c=u[0],p=Math.ceil(o[i-1]/2),h=p*Math.ceil(o[i-2]/2),m="int b, int row, int col",g=`b * ${h} + (row / 2) * ${p} + (col / 2)`;for(let w=2;w<i-1;w++)m=`int b${w}, `+m,h*=o[i-w-1],g=`b${w} * ${h} + `+g;let T=`vec4 ${e}(${m}) {
      int index = ${g};
      int texR = index / ${c};
      int texC = index - texR * ${c};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${c}, ${l});
      return ${s.texture2D}(${r}, uv);
    }`;return new K(T)}getUnpackedSamplerScalar(e,r,t){let[o,i]=[t.width,t.height];if(o===1&&i===1){let s=`
          float ${e}() {
            return sampleTexture(${r}, halfCR);
          }
        `;return new K(s,["coordinates.sampleTexture"])}let a=`
        float ${e}() {
          int offset_${r} = coordsToOffset(TexCoords, ${o}, ${i});
          vec2 uv = uvFromFlat(${o}, ${i}, offset_${r});
          return sampleTexture(${r}, uv);
        }
      `;return new K(a,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(e,r,t){let o=t.width,i=t.height;if(i===1&&o===1){let s=`
        float ${e}(int index) {
          return sampleTexture(${r}, halfCR);
        }
      `;return new K(s,["coordinates.sampleTexture"])}if(i===1){let s=`
          float ${e}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${o}.0, 0.5);
            return sampleTexture(${r}, uv);
          }
        `;return new K(s,["coordinates.sampleTexture"])}if(o===1){let s=`
          float ${e}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${i}.0);
            return sampleTexture(${r}, uv);
          }
        `;return new K(s,["coordinates.sampleTexture"])}let a=`
        float ${e}(int index) {
          vec2 uv = uvFromFlat(${o}, ${i}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new K(a,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(e,r,t){let o=t.unpackedShape,i=[t.height,t.width];if(i!=null&&Cn.arraysEqual(o,i)){let h=i[1],m=i[0],g=`
          float ${e}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${h}.0, ${m}.0);
            return sampleTexture(${r}, uv);
          }
        `;return new K(g,["coordinates.sampleTexture"])}let{newShape:a,keptDims:s}=io(o),u=a;if(u.length<o.length){let h=eo(o,u),m=JSON.parse(JSON.stringify(t));m.unpackedShape=h;let g=["col","row"],y=`
          ${this.getUnpackedSamplerFromInput(e,r,m).routineBody}
          float ${e}(int row, int col) {
            return ${e}(${to(g,s)});
          }
        `;return new K(y,["coordinates.sampleTexture"])}let l=i[1],c=i[0];if(c===1){let h=`
          float ${e}(int row, int col) {
            int offset_${r} = coordsToOffset(TexCoords, ${l}, ${c});
            float index = dot(vec3(row, col, offset_${r}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${l}.0);
            return sampleTexture(${r}, uv);
          }
        `;return new K(h,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(l===1){let h=`
          float ${e}(int row, int col) {
            int offset_${r} = coordsToOffset(TexCoords, ${l}, ${c});
            float index = dot(vec3(row, col, offset_${r}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${c}.0, 0.5);
            return sampleTexture(${r}, uv);
          }
        `;return new K(h,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let p=`
        float ${e}(int row, int col) {
          int index = col * ${o[1]} + row;
          vec2 uv = uvFromFlat(${l}, ${c}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new K(p,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(e,r,t){let o=t.unpackedShape,i=o[1]*o[2],a=o[2],{newShape:s,keptDims:u}=io(o),l=s;if(l.length<o.length){let m=eo(o,l),g=["batch","col","row"],y=JSON.parse(JSON.stringify(t));y.unpackedShape=m;let T=this.getUnpackedSamplerFromInput(e,r,y),w=u.reverse(),x=`
          ${T.routineBody}
          float ${e}(int batch, int row, int col) {
            return ${e}(${to(g,w)});
          }
        `;return new K(x,T.dependencies)}let c=t.width,p=t.height,h=`
          float ${e}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${i} + col * ${a} + row;
            vec2 uv = uvFromFlat(${c}, ${p}, index);
            return sampleTexture(${r}, uv);
          }
      `;return new K(h,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(e,r,t){let o=t.unpackedShape,i=o[3],a=o[2]*i,s=o[1]*a,u=t.width,l=t.height,c=`
        float ${e}(int row, int col, int depth, int depth2) {
          int index = row * ${s} + col * ${a} +
              depth2 * ${i} + depth;
          vec2 uv = uvFromFlat(${u}, ${l}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new K(c,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(e,r,t){let o=t.unpackedShape,i=o[4],a=o[3]*i,s=o[2]*a,u=o[1]*s,{newShape:l,keptDims:c}=io(o);if(l.length<o.length){let g=eo(o,l),y=["row","col","depth","depth2","depth3"],T=JSON.parse(JSON.stringify(t));T.unpackedShape=g;let w=`
          ${this.getUnpackedSamplerFromInput(e,r,T).routineBody}
          float ${e}(int row, int col, int depth, int depth2, int depth3) {
            return ${e}(${to(y,c)});
          }
        `;return new K(w,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let p=t.width,h=t.height,m=`
        float ${e}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${u} + col * ${s} + depth * ${a} +
          depth3 * ${i} + depth2;
          vec2 uv = uvFromFlat(${p}, ${h}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new K(m,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(e,r,t){let o=t.unpackedShape,i=o[5],a=o[4]*i,s=o[3]*a,u=o[2]*s,l=o[1]*u,{newShape:c,keptDims:p}=io(o);if(c.length<o.length){let y=eo(o,c),T=["row","col","depth","depth2","depth3","depth4"],w=JSON.parse(JSON.stringify(t));w.unpackedShape=y;let x=`
            ${this.getUnpackedSamplerFromInput(e,r,w).routineBody}
            float ${e}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${e}(${to(T,p)});
            }
          `;return new K(x,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let h=t.width,m=t.height,g=`
          float ${e}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${l} + col * ${u} + depth * ${s} +
            depth2 * ${a} + depth3 * ${i} + depth4;
            vec2 uv = uvFromFlat(${h}, ${m}, index);
            return sampleTexture(${r}, uv);
          }
        `;return new K(g,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let e=this.context.outputTextureLayout,r=e.shape.length,t=e.strides,o=e.width,i=e.height,a=[];for(let u=0;u<r-1;++u)a.push(`
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
    `;return{toVec:new K(s,["coordinates.coordsToOffset"])}}valueFrom(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t],a=(o.unpackedShape.length>0?o.unpackedShape:o.shape).length,s=`_${r}`;e[s]=new K(this.getValueFromSingle(r,a,o.width,o.height,!1),[`shapeUtils.indicesToOffset${s}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),s=s+"_T",e[s]=new K(this.getValueFromSingle(r,a,o.width,o.height,!0),[`shapeUtils.indicesToOffset${s}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),e}getValueFromSingle(e,r,t,o,i){let a=`_${e}`;i&&(a=a+"_T");let s=se(this.context.glContext.version);return`
        float ${a}(int m[${r}]) {
          int offset = indicesToOffset${a}(m);
          vec2 coords = offsetToCoords(offset, ${t}, ${o});
          float value = getColorAsFloat(${s.texture2D}(${e}, coords));
          return value;
        }
        `}getPackedValueFrom(e,r,t,o,i){let a=`_${e}_Pack`;i&&(a=a+"_T");let s=se(this.context.glContext.version);return`
        vec4 ${a}(int m[${r}]) {
          int offset = indicesToOffset_${e}(m);
          vec2 coords = offsetToCoords(offset, ${t}, ${o});
          return ${s.texture2D}(${e}, coords);
        }
        `}}});var Qi,Ty=N(()=>{"use strict";Kr();Qi=class n extends Rt{constructor(e){super(e)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new K(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new K(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){let e=n.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new K(`
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
        `)}}decodeUint8(){let e=n.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new K(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${e}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){let e=new ArrayBuffer(4),r=new Uint32Array(e),t=new Uint8Array(e);if(r[0]=3735928559,t[0]===239)return!0;if(t[0]===222)return!1;throw new Error("unknown endianness")}}});var Yi,Iy=N(()=>{"use strict";Kr();Ze();Yi=class extends Rt{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=se(this.context.glContext.version);return{setFragColor:new K(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new K(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}});var ea,Sy=N(()=>{"use strict";Kr();ea=class n extends Rt{constructor(e){super(e)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let e=this.context.outputTextureLayout.shape.length,r={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].unpackedShape;if(i.length<=e){let a=i.length,s=e-a,u=`bcastIndices_${t}`,l="";for(let p=0;p<a;++p)l+=`
          realIndices[${p}] = int( mod(float(bcastedIndices[${s+p}]), ${i[p]}.0) );
          `;let c=`
        void ${u} (int bcastedIndices[${e}], out int realIndices[${a}]) {
          ${l}
        }
        `;r[u]=new K(c)}}),r}bcastMatmulIndex(){let e=this.context.outputTextureLayout.shape.length,r={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].shape;if(!(i.length<2||i.length>e)){let a=i.length,s=e-a,u=`bcastMatmulIndices_${t}`,l="";for(let p=0;p<a-2;++p)l+=`
          realIndices[${p}] = int( mod(float(bcastedIndices[${s+p}]), ${i[p]}.0) );
          `;let c=`
        void ${u}(int bcastedIndices[${e}], out int realIndices[${a}]) {
          ${l}
          realIndices[${a-1}] = bcastedIndices[${e-1}];
          realIndices[${a-2}] = bcastedIndices[${e-2}];
        }
        `;r[u]=new K(c)}}),r}indicesToOffset(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,a=o.length,s=`indicesToOffset_${r}`;e[s]=new K(n.indexToOffsetSingle(s,a,i)),s=`indicesToOffset_${r}_T`,e[s]=new K(n.indexToOffsetSingle(s,a,i.slice().reverse()))}),e}static indexToOffsetSingle(e,r,t){let o="";for(let i=r-1;i>=0;--i)o+=`
        offset += indices[${i}] * ${t[i]};
        `;return`
      int ${e}(int indices[${r}]) {
        int offset = 0;
        ${o}
        return offset;
      }
      `}offsetToIndices(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,a=o.length,s=`offsetToIndices_${r}`;e[s]=new K(n.offsetToIndicesSingle(s,a,i)),s=`offsetToIndices_${r}_T`,e[s]=new K(n.offsetToIndicesSingle(s,a,i.slice().reverse()))}),e}static offsetToIndicesSingle(e,r,t){let o=[];for(let i=0;i<r-1;++i)o.push(`
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
        `;e[a]=new K(u)}),e}}});var ta,$y=N(()=>{"use strict";Kr();ta=class extends Rt{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let r=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},o={};for(let i in t){let a=`${i}Vec`,s="";for(let l=0;l<r;++l)s+=`
          dest[${l}] ${t[i]} src[${l}];
          `;let u=`
        void ${a}(int src[${r}], out int dest[${r}]) {
          ${s}
        }
        `;o[a]=new K(u)}return o}copyVec(){let r=this.context.outputTextureLayout.shape.length,t="";for(let i=0;i<r;++i)t+=`
        dest[${i}] = src[${i}];
        `;let o=`
      void copyVec(int src[${r}], out int dest[${r}]) {
        ${t}
      }
      `;return{copyVec:new K(o)}}setVecItem(){let r=this.context.outputTextureLayout.shape.length,t=`
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
        `;return{setVecItem:new K(o)}}getVecItem(){let r=this.context.outputTextureLayout.shape.length,t=`
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
    `;return{getVecItem:new K(o)}}}});var Xl,Ay=N(()=>{"use strict";xy();Ty();Iy();Sy();$y();Xl={encoding:Qi,fragcolor:Yi,vec:ta,shapeUtils:ea,coordinates:Ji}});var ra,Oy=N(()=>{"use strict";Kr();vy();Ay();Ze();ra=class{constructor(e,r,t,o){this.libs={};this.glslLibRoutineDependencyGraph={};this.context=new Fi(e,r,t,o),Object.keys(Xl).forEach(a=>{let s=new Xl[a](this.context);this.libs[a]=s});let i=this.glslLibRoutineDependencyGraph;for(let a in this.libs){let u=this.libs[a].getFunctions();for(let l in u){let c=a+"."+l,p;i[c]?(p=i[c],p.routineBody=u[l].routineBody):(p=new No(c,u[l].routineBody),i[c]=p);let h=u[l].dependencies;if(h)for(let m=0;m<h.length;++m)if(i[h[m]])p.addDependency(i[h[m]]);else{let g=new No(h[m]);i[h[m]]=g,p.addDependency(g)}}}}preprocess(){let e=this.context.programInfo,r=e.shaderSource;return this.context.programInfo.hasMain||(r=`${r}
      ${um(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),r=_y(r),`${sm(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(r)}
    ${r}`}getImports(e){let r=this.selectGlslLibRoutinesToBeIncluded(e);if(r.length===0)return"";let t="";for(let o=0;o<r.length;++o)if(r[o].routineBody)t+=r[o].routineBody+`
`;else throw new Error(`Missing body for the Glsl Library routine: ${r[o].name}`);return t}selectGlslLibRoutinesToBeIncluded(e){let r=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(t=>{let o=t.split(".")[1];e.indexOf(o)!==-1&&r.push(this.glslLibRoutineDependencyGraph[t])}),Vi.returnOrderedNodes(r)}getUniforms(e,r){let t=[];if(e)for(let o of e)t.push(`uniform sampler2D ${o};`);if(r)for(let o of r)t.push(`uniform ${o.type} ${o.name}${o.arrayLength?`[${o.arrayLength}]`:""};`);return t.join(`
`)}}});var na,Py=N(()=>{"use strict";ft();Et();Oy();Ze();na=class{constructor(e,r,t){this.profiler=e;this.glContext=r;this.textureLayoutStrategy=t;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,r){this.repo.set(e,r)}run(e,r,t){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let o=this.glContext.gl,i=e.program;o.useProgram(i);try{this.bindOutput(t),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],r)}catch(a){throw Be.error("ProgramManager",e.programInfo.shaderSource),a}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,r,t){return this.profiler.event("backend","ProgramManager.build",()=>{let o=new ra(this.glContext,e,r,t),i=o.preprocess(),a=this.compile(i);return{programInfo:e,program:a,uniformLocations:this.getUniformLocations(a,o.context.programInfo.inputNames,o.context.programInfo.variables),attribLocations:this.getAttribLocations(a)}})}compile(e){if(!this.vertexShader){Be.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let o=am(this.glContext.version);this.vertexShader=this.glContext.compileShader(o,this.glContext.gl.VERTEX_SHADER)}de.debug&&Be.verbose("ProrgramManager",`FragShader:
${e}
`);let r=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),t=this.glContext.createProgram(this.vertexShader,r);return this.glContext.deleteShader(r),t}bindOutput(e){let r=e.width,t=e.height;Be.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${r}/${t}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,r,t)}bindAttributes(e){let r=e.position,t=e.textureCoord;this.glContext.setVertexAttributes(r,t),this.attributesBound=!0}bindUniforms(e,r,t){let o=this.glContext.gl,i=0;for(let{name:a,type:s,location:u,arrayLength:l}of e){let c=r.find(p=>p.name===a)?.data;if(s!=="sampler2D"&&!c)throw new Error(`variable '${a}' does not have data defined in program info`);switch(s){case"sampler2D":this.bindTexture(t[i],u,i),i++;break;case"float":l?o.uniform1fv(u,c):o.uniform1f(u,c);break;case"int":l?o.uniform1iv(u,c):o.uniform1i(u,c);break;default:throw new Error(`Uniform not implemented: ${s}`)}}}bindTexture(e,r,t){this.glContext.bindTextureToUniform(e.texture,t,r)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,r,t){let o=[];if(r)for(let i of r)o.push({name:i,type:"sampler2D",location:this.getUniformLocation(e,i)});if(t)for(let i of t)o.push({...i,location:this.getUniformLocation(e,i.name)});return o}getUniformLocation(e,r){let o=this.glContext.gl.getUniformLocation(e,r);if(o===null)throw new Error(`Uniform ${r} not found.`);return o}getAttribLocation(e,r){return this.glContext.gl.getAttribLocation(e,r)}}});var oa,Ey=N(()=>{"use strict";Et();Do();oa=class{constructor(e,r,t,o){this.glContext=e;this.layoutStrategy=r;this.profiler=t;this.config=o;this.pendingRead=new Map;o.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,r,t,o){let i=this.toEncoderType(e),a=this.glContext.getEncoder(i,r.channels||1,o);if(r.isPacked&&o===1)throw new Error("not implemented");let s=r.width,u=r.height,l,c;if(this.config.reuseTextures){l=`${s}x${u}_${a.format}_${a.internalFormat}_${a.textureType}`,c=this.inUseTextures.get(l),c||(c=[],this.inUseTextures.set(l,c));let h=this.idleTextures.get(l);if(h&&h.length>0){let m=h.pop();return c.push(m),o===1&&this.glContext.updateTexture(m,s,u,a,this.toTextureData(e,t)),m}}Be.verbose("TextureManager",`Creating new texture of size ${r.width}x${r.height}`);let p=this.glContext.allocateTexture(s,u,a,this.toTextureData(e,t));return this.config.reuseTextures&&(c.push(p),this.textureLookup.set(p,l)),p}readTexture(e,r,t){return t||(t=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let o=e.shape.reduce((a,s)=>a*s)*t,i=this.glContext.readTexture(e.texture,e.width,e.height,o,this.toEncoderType(r),t);return this.toTensorData(r,i)})}async readTextureAsync(e,r,t){let o=e.tensor.dataId;if(t||(t=1),this.pendingRead.has(o)){let i=this.pendingRead.get(o);return new Promise(a=>i?.push(a))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(o,[]);let i=e.shape.reduce((l,c)=>l*c)*t;await this.glContext.createAndWaitForFence();let a=this.glContext.readTexture(e.texture,e.width,e.height,i,this.toEncoderType(r),t),s=this.toTensorData(r,a),u=this.pendingRead.get(o);return this.pendingRead.delete(o),u?.forEach(l=>l(s)),s})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let r=e.shape.reduce((o,i)=>o*i),t=this.glContext.readTexture(e.texture,e.width,e.height,r*4,"byte",4);return new Float32Array(t.buffer,t.byteOffset,r)})}releaseTexture(e,r){let t;if(this.config.reuseTextures&&(t=this.textureLookup.get(e.texture),t)){r&&this.textureLookup.delete(t);let o=this.inUseTextures.get(t);if(o){let i=o.indexOf(e.texture);if(i!==-1){o.splice(i,1);let a=this.idleTextures.get(t);a||(a=[],this.idleTextures.set(t,a)),a.push(e.texture)}}}(!t||r)&&(Be.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,r){switch(e){case"int16":return r instanceof Int16Array?r:Int16Array.from(r);case"int32":return r instanceof Int32Array?r:Int32Array.from(r);case"int8":return r instanceof Int8Array?r:Int8Array.from(r);case"uint16":return r instanceof Uint16Array?r:Uint16Array.from(r);case"uint32":return r instanceof Uint32Array?r:Uint32Array.from(r);case"uint8":case"bool":return r instanceof Uint8Array?r:Uint8Array.from(r);case"float32":return r instanceof Float32Array?r:Float32Array.from(r);case"float64":return r instanceof Float64Array?r:Float64Array.from(r);default:throw new Error(`TensorData type ${e} is not supported`)}}toTextureData(e,r){if(r)return r instanceof Float32Array?r:new Float32Array(r)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}});var ia,Cy=N(()=>{"use strict";Et();vf();Tm();by();Py();Kl();Ey();ia=class{constructor(e,r){this.backend=e;this.context=r;this.layoutStrategy=new Zi(e.glContext.maxTextureSize),this.programManager=new na(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new oa(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:e.textureCacheMode==="full"}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new Bi(this)}onGraphInitialized(e){let r=e.getValues().filter(t=>t.from===-1&&t.tensor).map(t=>t.tensor.dataId);this.initializers=new Set(r)}isInitializer(e){return this.initializers?this.initializers.has(e):!1}addInitializer(e){this.initializers.add(e)}getTextureData(e,r){return r?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,r,t=!1){Be.verbose("WebGLSessionHandler","Storing Texture data in cache"),t?this.packedTextureDataCache.set(e,r):this.unpackedTextureDataCache.set(e,r)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,r,t){let o=_f(e,r,gy);return{impl:o.opImpl,context:o.opInit?o.opInit(e,t):e}}}});function HP(n){let e=0;for(;e<n.length&&n[e]();++e);return e-1}var zo,Dy=N(()=>{"use strict";ft();Do();Do();Nr();zo=class{constructor(e,r){this.frameBufferBound=!1;this.itemsToPoll=[];this.gl=e,this.version=r,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,r,t,o){let i=this.gl,a=i.createTexture();i.bindTexture(i.TEXTURE_2D,a),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);let s=o?t.encode(o,e*r):null;return i.texImage2D(i.TEXTURE_2D,0,t.internalFormat,e,r,0,t.format,t.textureType,s),this.checkError(),a}updateTexture(e,r,t,o,i){let a=this.gl;a.bindTexture(a.TEXTURE_2D,e);let s=o.encode(i,r*t);a.texSubImage2D(a.TEXTURE_2D,0,0,0,r,t,o.format,o.textureType,s),this.checkError()}attachFramebuffer(e,r,t){let o=this.gl;o.bindTexture(o.TEXTURE_2D,e),o.bindFramebuffer(o.FRAMEBUFFER,this.framebuffer),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0),this.checkError(),o.viewport(0,0,r,t),o.scissor(0,0,r,t)}readTexture(e,r,t,o,i,a){let s=this.gl;a||(a=1),this.frameBufferBound||this.attachFramebuffer(e,r,t);let u=this.getEncoder(i,a),l=u.allocate(r*t);return s.bindTexture(s.TEXTURE_2D,e),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,e,0),s.readPixels(0,0,r,t,s.RGBA,u.textureType,l),this.checkError(),u.decode(l,o)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,r){let t=this.gl;t.vertexAttribPointer(e,3,t.FLOAT,!1,20,0),t.enableVertexAttribArray(e),r!==-1&&(t.vertexAttribPointer(r,2,t.FLOAT,!1,20,12),t.enableVertexAttribArray(r)),this.checkError()}createProgram(e,r){let t=this.gl,o=t.createProgram();return t.attachShader(o,e),t.attachShader(o,r),t.linkProgram(o),o}compileShader(e,r){let t=this.gl,o=t.createShader(r);if(!o)throw new Error(`createShader() returned null with type ${r}`);if(t.shaderSource(o,e),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)===!1)throw new Error(`Failed to compile shader: ${t.getShaderInfoLog(o)}
Shader source:
${e}`);return o}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,r,t){let o=this.gl;o.activeTexture(o.TEXTURE0+r),this.checkError(),o.bindTexture(o.TEXTURE_2D,e),this.checkError(),o.uniform1i(t,r),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(de.debug){let e=this.gl,r=e.getError(),t="";switch(r){case e.NO_ERROR:return;case e.INVALID_ENUM:t="INVALID_ENUM";break;case e.INVALID_VALUE:t="INVALID_VALUE";break;case e.INVALID_OPERATION:t="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:t="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:t="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:t="CONTEXT_LOST_WEBGL";break;default:t=`Unknown WebGL Error: ${r.toString(16)}`}throw new Error(t)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,r,t=0){if(this.version===2)return new zi(this.gl,r);switch(e){case"float":return t===1||this.isRenderFloat32Supported?new Co(this.gl,r):new Co(this.gl,r,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw new Error("not implemented");case"byte":return new Mi(this.gl,r);default:throw new Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let r=0;r<this.maxTextureImageUnits;++r)e.activeTexture(e.TEXTURE0+r),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,r=e.createBuffer();if(!r)throw new Error("createBuffer() returned null");let t=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),this.checkError(),r}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw new Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),this.version===1&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw new Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){this.version===2?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r);let t=this.version===2?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,t,1,1,0,e.RGBA,e.FLOAT,null);let o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(r),e.deleteFramebuffer(o),i}checkRenderFloat32(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e=this.gl,r,t,o,i,a;try{r=e.createTexture(),t=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,r);let s=this.version===2?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,s,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),e.enable(e.BLEND),o=e.createShader(e.VERTEX_SHADER),!o||(e.shaderSource(o,"void main(){}"),e.compileShader(o),i=e.createShader(e.FRAGMENT_SHADER),!i)||(e.shaderSource(i,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(i),a=e.createProgram(),!a)?!1:(e.attachShader(a,o),e.attachShader(a,i),e.linkProgram(a),e.useProgram(a),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),a&&e.deleteProgram(a),o&&e.deleteShader(o),i&&e.deleteShader(i),t&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(t)),r&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(r))}}beginTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,r=this.disjointTimerQueryWebgl2Extension,t=e.createQuery();return e.beginQuery(r.TIME_ELAPSED_EXT,t),t}else throw new Error("WebGL1 profiling currently not supported.")}endTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,r=this.disjointTimerQueryWebgl2Extension;e.endQuery(r.TIME_ELAPSED_EXT);return}else throw new Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let r=!1,t=!1;if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let o=this.gl,i=this.disjointTimerQueryWebgl2Extension;r=o.getQueryParameter(e,o.QUERY_RESULT_AVAILABLE),t=o.getParameter(i.GPU_DISJOINT_EXT)}else throw new Error("WebGL1 profiling currently not supported");return r&&!t}getTimerResult(e){let r=0;if(this.version===2){let t=this.gl;r=t.getQueryParameter(e,t.QUERY_RESULT),t.deleteQuery(e)}else throw new Error("WebGL1 profiling currently not supported");return r/1e6}async waitForQueryAndGetTime(e){return await vl(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let r,t=e,o=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),o===null?r=()=>!0:r=()=>{let i=t.clientWaitSync(o,0,0);return i===t.ALREADY_SIGNALED||i===t.CONDITION_SATISFIED},{query:o,isFencePassed:r}}async pollFence(e){return new Promise(r=>{this.addItemToPoll(()=>e.isFencePassed(),()=>r())})}pollItems(){let e=HP(this.itemsToPoll.map(r=>r.isDoneFn));for(let r=0;r<=e;++r){let{resolveFn:t}=this.itemsToPoll[r];t()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,r){this.itemsToPoll.push({isDoneFn:e,resolveFn:r}),!(this.itemsToPoll.length>1)&&await vl(()=>(this.pollItems(),this.itemsToPoll.length===0))}}});function Zl(n){let e;if((!n||n==="webgl2")&&"webgl2"in ao?e=ao.webgl2:(!n||n==="webgl")&&"webgl"in ao&&(e=ao.webgl),!e)try{let t=jP();e=ky(t,n)}catch{let o=qP();e=ky(o,n)}n=n||e.version===1?"webgl":"webgl2";let r=e.gl;return ao[n]=e,r.isContextLost()?(delete ao[n],Zl(n)):(r.disable(r.DEPTH_TEST),r.disable(r.STENCIL_TEST),r.disable(r.BLEND),r.disable(r.DITHER),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SAMPLE_COVERAGE),r.enable(r.SCISSOR_TEST),r.enable(r.CULL_FACE),r.cullFace(r.BACK),e)}function ky(n,e){let r={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1},t,o=r;if((!e||e==="webgl2")&&(t=n.getContext("webgl2",o),t))try{return new zo(t,2)}catch(i){Be.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${i}`)}if((!e||e==="webgl")&&(t=n.getContext("webgl",o)||n.getContext("experimental-webgl",o),t))try{return new zo(t,1)}catch(i){Be.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${i}`)}throw new Error("WebGL is not supported")}function qP(){if(typeof document>"u")throw new TypeError("failed to create canvas: document is not supported");let n=document.createElement("canvas");return n.width=1,n.height=1,n}function jP(){if(typeof OffscreenCanvas>"u")throw new TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var ao,Ny=N(()=>{"use strict";Et();Dy();ao={}});var aa,Ly=N(()=>{"use strict";ft();Et();Cy();Ny();aa=class{get contextId(){return de.webgl.contextId}set contextId(e){de.webgl.contextId=e}get matmulMaxBatchSize(){return de.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){de.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return de.webgl.textureCacheMode}set textureCacheMode(e){de.webgl.textureCacheMode=e}get pack(){return de.webgl.pack}set pack(e){de.webgl.pack=e}get async(){return de.webgl.async}set async(e){de.webgl.async=e}initialize(){try{return this.glContext=Zl(this.contextId),typeof this.matmulMaxBatchSize!="number"&&(this.matmulMaxBatchSize=16),typeof this.textureCacheMode!="string"&&(this.textureCacheMode="full"),typeof this.pack!="boolean"&&(this.pack=!1),typeof this.async!="boolean"&&(this.async=!1),Be.setWithEnv(de),de.webgl.context||Object.defineProperty(de.webgl,"context",{value:this.glContext.gl}),Be.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return Be.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new ia(this,e)}dispose(){this.glContext.dispose()}}});async function Jl(n){if(n){let e=typeof n=="string"?[n]:n;for(let r of e){let t=Ry.get(r);if(t)return t;let o=await XP(r);if(o)return o}}else return Jl(["webgl"]);throw new Error("no available backend to use")}async function XP(n){let e=KP;if(typeof e[n]<"u"&&ZP(e[n])){let r=e[n],t=r.initialize();if(typeof t=="object"&&"then"in t&&(t=await t),t)return Ry.set(n,r),r}}function ZP(n){let e=n;return"initialize"in e&&typeof e.initialize=="function"&&"createSessionHandler"in e&&typeof e.createSessionHandler=="function"&&"dispose"in e&&typeof e.dispose=="function"}var Ry,KP,zy=N(()=>{"use strict";Ly();Ry=new Map,KP={webgl:new aa}});var Ql,sa,My=N(()=>{"use strict";Et();Ql=class{constructor(e,r){this.op=e;this.node=r}},sa=class{constructor(e,r,t){this.graph=e;this.profiler=t;this.initialize(r)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let r=this.graph.getNodes();if(r.length!==e.length)throw new Error("The size of nodes and OPs do not match.");this._ops=e.map((t,o)=>new Ql(t,r[o])),this.reset(),this._starter=[],this._ops.forEach((t,o)=>{let i=!0;for(let a of t.node.inputs)if(!this._values[a]&&this.graph.getInputIndices().indexOf(a)===-1){i=!1;break}i&&this._starter.push(o)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,r){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let t=e.createInferenceHandler(),o=this.graph.getInputIndices();if(r.length!==o.length)throw new Error(`number of input tensors don't match the number of inputs to the model: actual: ${r.length} expected: ${o.length}`);r.forEach((c,p)=>{let h=o[p];this._values[h]=c});let i=this._starter.slice(0),a=this.graph.getValues(),s=this.graph.getNodes(),u=0;for(;u<i.length;){let c=i[u++],p=this._ops[c],h=p.node.inputs.map(T=>this._values[T]);if(h.indexOf(void 0)!==-1)throw new Error(`unresolved input detected: op: ${p.node}`);let m=h;Be.verbose("ExecPlan",`Running op:${p.node.name} (${m.map((T,w)=>`'${p.node.inputs[w]}': ${T.type}[${T.dims.join(",")}]`).join(", ")})`);let g=await this.profiler.event("node",p.node.name,async()=>p.op.impl(t,m,p.op.context));if(g.length!==p.node.outputs.length)throw new Error("the size of output does not match model definition.");g.forEach((T,w)=>{let x=p.node.outputs[w];if(this._values[x])throw new Error(`output [${x}] already has value: op:${p.node.name}`);this._values[x]=T});let y=new Set;g.forEach((T,w)=>{let x=p.node.outputs[w];for(let I of a[x].to){let A=s[I],P=!0;for(let C of A.inputs)if(!this._values[C]){P=!1;break}P&&y.add(I)}}),i.push(...y)}let l=[];for(let c=0;c<this.graph.getOutputIndices().length;c++){let p=this.graph.getOutputIndices()[c],h=this._values[p];if(h===void 0)throw new Error(`required output [${p}] does not have value`);p===0?await h.getData():h.data,l.push(h)}return Be.verbose("ExecPlan","disposing of inferenceHandler"),t.dispose(),l})}}});var Se,Mo,By=N(()=>{"use strict";So();Se=ye(Qn());Ln();Re();Mo=class n{constructor(e){if(this._attributes=new Map,e!=null){for(let r of e)r instanceof Se.onnx.AttributeProto?this._attributes.set(r.name,[n.getValue(r),n.getType(r)]):r instanceof Pi.Attribute&&this._attributes.set(r.name(),[n.getValue(r),n.getType(r)]);if(this._attributes.size<e.length)throw new Error("duplicated attribute names")}}set(e,r,t){this._attributes.set(e,[t,r])}delete(e){this._attributes.delete(e)}getFloat(e,r){return this.get(e,"float",r)}getInt(e,r){return this.get(e,"int",r)}getString(e,r){return this.get(e,"string",r)}getTensor(e,r){return this.get(e,"tensor",r)}getFloats(e,r){return this.get(e,"floats",r)}getInts(e,r){return this.get(e,"ints",r)}getStrings(e,r){return this.get(e,"strings",r)}getTensors(e,r){return this.get(e,"tensors",r)}get(e,r,t){let o=this._attributes.get(e);if(o===void 0){if(t!==void 0)return t;throw new Error(`required attribute not found: ${e}`)}if(o[1]!==r)throw new Error(`type mismatch: expected ${r} but got ${o[1]}`);return o[0]}static getType(e){let r=e instanceof Se.onnx.AttributeProto?e.type:e.type();switch(r){case Se.onnx.AttributeProto.AttributeType.FLOAT:return"float";case Se.onnx.AttributeProto.AttributeType.INT:return"int";case Se.onnx.AttributeProto.AttributeType.STRING:return"string";case Se.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case Se.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case Se.onnx.AttributeProto.AttributeType.INTS:return"ints";case Se.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case Se.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw new Error(`attribute type is not supported yet: ${Se.onnx.AttributeProto.AttributeType[r]}`)}}static getValue(e){let r=e instanceof Se.onnx.AttributeProto?e.type:e.type();if(r===Se.onnx.AttributeProto.AttributeType.GRAPH||r===Se.onnx.AttributeProto.AttributeType.GRAPHS)throw new Error("graph attribute is not supported yet");let t=this.getValueNoCheck(e);if(r===Se.onnx.AttributeProto.AttributeType.INT&&xt.isLong(t))return xt.longToNumber(t);if(r===Se.onnx.AttributeProto.AttributeType.INTS){let o=t,i=new Array(o.length);for(let a=0;a<o.length;a++){let s=o[a];i[a]=xt.longToNumber(s)}return i}if(r===Se.onnx.AttributeProto.AttributeType.TENSOR)return e instanceof Se.onnx.AttributeProto?nt.fromProto(t):nt.fromOrtTensor(t);if(r===Se.onnx.AttributeProto.AttributeType.TENSORS){if(e instanceof Se.onnx.AttributeProto)return t.map(i=>nt.fromProto(i));if(e instanceof Pi.Attribute)return t.map(i=>nt.fromOrtTensor(i))}return r===Se.onnx.AttributeProto.AttributeType.STRING&&e instanceof Se.onnx.AttributeProto?Eo(t):r===Se.onnx.AttributeProto.AttributeType.STRINGS&&e instanceof Se.onnx.AttributeProto?t.map(Eo):t}static getValueNoCheck(e){return e instanceof Se.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(e):this.getValueNoCheckFromOrtFormat(e)}static getValueNoCheckFromOnnxFormat(e){switch(e.type){case Se.onnx.AttributeProto.AttributeType.FLOAT:return e.f;case Se.onnx.AttributeProto.AttributeType.INT:return e.i;case Se.onnx.AttributeProto.AttributeType.STRING:return e.s;case Se.onnx.AttributeProto.AttributeType.TENSOR:return e.t;case Se.onnx.AttributeProto.AttributeType.GRAPH:return e.g;case Se.onnx.AttributeProto.AttributeType.FLOATS:return e.floats;case Se.onnx.AttributeProto.AttributeType.INTS:return e.ints;case Se.onnx.AttributeProto.AttributeType.STRINGS:return e.strings;case Se.onnx.AttributeProto.AttributeType.TENSORS:return e.tensors;case Se.onnx.AttributeProto.AttributeType.GRAPHS:return e.graphs;default:throw new Error(`unsupported attribute type: ${Se.onnx.AttributeProto.AttributeType[e.type]}`)}}static getValueNoCheckFromOrtFormat(e){switch(e.type()){case Nt.AttributeType.FLOAT:return e.f();case Nt.AttributeType.INT:return e.i();case Nt.AttributeType.STRING:return e.s();case Nt.AttributeType.TENSOR:return e.t();case Nt.AttributeType.GRAPH:return e.g();case Nt.AttributeType.FLOATS:return e.floatsArray();case Nt.AttributeType.INTS:{let r=[];for(let t=0;t<e.intsLength();t++)r.push(e.ints(t));return r}case Nt.AttributeType.STRINGS:{let r=[];for(let t=0;t<e.stringsLength();t++)r.push(e.strings(t));return r}case Nt.AttributeType.TENSORS:{let r=[];for(let t=0;t<e.tensorsLength();t++)r.push(e.tensors(t));return r}default:throw new Error(`unsupported attribute type: ${Nt.AttributeType[e.type()]}`)}}}});var ec,tc,zr,ua,Yl,Fy=N(()=>{"use strict";By();So();ec=ye(Qn());Ln();Re();tc={from:(n,e)=>new Yl(n,e)},zr=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=ht.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},ua=class{constructor(e,r){e instanceof ec.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new Mo(e.attribute)):e instanceof rl.Node&&(this.name=r??e.name(),this.opType=e.opType(),this.attributes=new Mo(ht.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},Yl=class{constructor(e,r){if(!e)throw new TypeError("graph is empty");this.buildGraph(e),this.transformGraph(r),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof ec.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof el.Graph)this.buildGraphFromOrtFormat(e);else throw new TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let r=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map;if(!e.input)throw new Error("missing information in graph: input");let o=[];for(let i of e.input){if(r.has(i.name))throw new Error(`duplicated input name: ${i.name}`);let a=this._allData.push(new zr(i))-1;r.set(i.name,a),o.push(i.name)}if(!e.initializer)throw new Error("missing information in graph: initializer");for(let i of e.initializer){let a=r.get(i.name);if(a===void 0){let s=new zr;s.type={shape:{dims:ht.tensorDimsFromProto(i.dims)},tensorType:ht.tensorDataTypeFromProto(i.dataType)},a=this._allData.push(s)-1,r.set(i.name,a)}this._allData[a]._from=-1,this._allData[a].tensor=nt.fromProto(i)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));if(!e.output)throw new Error("missing information in graph: output");for(let i of e.output){if(r.has(i.name))throw new Error(`duplicated output name: ${i.name}`);let a=this._allData.push(new zr(i))-1;r.set(i.name,a),this._allOutputIndices.push(a),this._allOutputNames.push(i.name)}if(!e.node)throw new Error("missing information in graph: node");for(let i of e.node){if(!i.name)for(let s=0;;s++){let u=`unnamed_${i.opType}_${s}`;if(!t.has(u)){i.name=u;break}}if(t.has(i.name))throw new Error(`duplicated node name: ${i.name}`);let a=this._nodes.push(new ua(i))-1;t.set(i.name,a)}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.node[i];if(!s.output)throw new Error(`missing output for node: ${s.name}`);for(let u of s.output){let l=r.get(u);if(typeof l>"u"&&(l=this._allData.push(new zr)-1,r.set(u,l)),a.outputs.push(l),this._allData[l]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${l}`);if(this._allData[l]._from=i,s.opType==="Constant"){if(!s.attribute||s.attribute.length!==1||!s.attribute[0].t)throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!s.output||s.output.length!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");a.outputs.pop(),a.executeNode=!1,this._allData[l]._from=-1,this._allData[l].tensor=nt.fromProto(s.attribute[0].t)}}}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.node[i];if(!s.input)throw new Error(`missing input for node: ${s.name}`);for(let u of s.input){let l=r.get(u);if(typeof l>"u"){if(u===""&&(s.input.length===3||s.input.length===4)&&s.opType==="Resize")continue;throw new Error(`unrecognized input '${u}' for node: ${s.name}`)}a.inputs.push(l),this._allData[l]._to.push(i)}}return!0}buildGraphFromOrtFormat(e){let r=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map,o=[];for(let i=0;i<e.inputsLength();i++){let a=e.inputs(i);if(r.has(a))throw new Error(`duplicated input name: ${a}`);for(let s=0;s<e.nodeArgsLength();s++)if(e.nodeArgs(s)?.name()===a){let u=new zr;if(e.nodeArgs(s)?.type()?.valueType()!==ol.TypeInfoValue.tensor_type)throw new Error("Unexpected value type for the nodeArg.");let c=e.nodeArgs(s).type().value(new nl.TensorTypeAndShape),p=ht.tensorDataTypeFromProto(c.elemType()),h=c.shape(),m=[];for(let y=0;y<h.dimLength();y++)m.push(xt.longToNumber(h.dim(y).value().dimValue()));u.type={shape:{dims:m},tensorType:p};let g=this._allData.push(u)-1;r.set(a,g),o.push(a)}}for(let i=0;i<e.initializersLength();i++){let a=e.initializers(i),s=r.get(a.name());if(s===void 0){let u=new zr,l=ht.tensorDimsFromORTFormat(a),c=ht.tensorDataTypeFromProto(a.dataType());u.type={shape:{dims:l},tensorType:c},s=this._allData.push(u)-1,r.set(a.name(),s)}this._allData[s]._from=-1,this._allData[s].tensor=nt.fromOrtTensor(a)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));for(let i=0;i<e.outputsLength();i++){let a=e.outputs(i);if(r.has(a))throw new Error(`duplicated output name: ${a}`);let s=this._allData.push(new zr)-1;r.set(a,s),this._allOutputIndices.push(s),this._allOutputNames.push(a)}if(!e.nodes)throw new Error("missing information in graph: node");for(let i=0;i<e.nodesLength();i++){let a=e.nodes(i),s=a.name();if(!s)for(let l=0;s=`unnamed_${a.opType()}_${l}`,!!t.has(s);l++);if(t.has(s))throw new Error(`duplicated node name: ${s}`);let u=this._nodes.push(new ua(a,s))-1;t.set(s,u)}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.nodes(i);if(s==null)throw new Error(`No node exists at index ${i}`);if(s?.outputsLength()===0)throw new Error(`missing output for node: ${s.name}`);for(let u=0;u<s?.outputsLength();u++){let l=s?.outputs(u),c=r.get(l);if(typeof c>"u"&&(c=this._allData.push(new zr)-1,r.set(l,c)),a.outputs.push(c),this._allData[c]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${c}`);if(this._allData[c]._from=i,s.opType()==="Constant"){if(s.attributesLength()!==1||!s.attributes(0).t())throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(s.outputsLength()!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");a.outputs.pop(),a.executeNode=!1,this._allData[c]._from=-1,this._allData[c].tensor=nt.fromOrtTensor(s.attributes(0).t())}}}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.nodes(i);if(s.inputsLength()===0)throw new Error(`missing input for node: ${s.name}`);for(let u=0;u<s.inputsLength();u++){let l=s.inputs(u),c=r.get(l);if(typeof c>"u")throw new Error(`unrecognized input '${l}' for node: ${s.name()}`);a.inputs.push(c),this._allData[c]._to.push(i)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(o=>{this._allData[o]._to.forEach(a=>{e.add(a)})});let r=Array.from(e),t=new Array(this._nodes.length).fill("white");for(;r.length>0;){let o=r.pop();t[o]==="gray"?t[o]="black":(r.push(o),t[o]="gray",this._nodes[o].outputs.forEach(i=>{let a=this._allData[i];if(typeof a.tensor<"u")throw new Error("node outputs should not be initialized");if(a._from!==o)throw new Error("from property of the Value object doesn't match index of Node being processed");a._to.forEach(s=>{if(t[s]==="gray")throw new Error("model graph is cyclic");t[s]==="white"&&r.push(s)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,r=new Array(this._nodes.length,0),t=0;for(let o=0;o<this._nodes.length;o++)r[o]=t,this._nodes[o].executeNode?(t!==o&&(this._nodes[t]=this._nodes[o]),t++):this._nodes[o].outputs.forEach(i=>{this._allData[i]._from=-2});this._nodes.splice(t,this._nodes.length-t);for(let o=0;o<this._allData.length;o++){let i=this._allData[o];i._from!==void 0&&i._from!==-1&&i._from!==-2&&(i._from=r[i._from]);for(let a=0;a<i._to.length;a++)if(i._to[a]>=0)i._to[a]=r[i._to[a]];else throw new Error("Trying to update a removed node")}e=0;for(let o=0;o<this._allData.length;o++){if(this._allData[o].from===-2&&this._allOutputIndices.indexOf(o+e)===-1){e++,this._allData.splice(o,1),o--;continue}if(e>0){let i=-1;this._allData[o].from!==void 0&&this._allData[o].from!==-1?(i=this._nodes[this._allData[o].from].outputs.indexOf(o+e),i!==-1&&(this._nodes[this._allData[o].from].outputs[i]=o)):(i=this._allInputIndices.indexOf(o+e),i!==-1&&(this._allInputIndices[i]=o)),this._allData[o].to.forEach(a=>{i=this._nodes[a].inputs.indexOf(o+e),i!==-1&&(this._nodes[a].inputs[i]=o)}),this._allData[o].to.length===0&&(i=this._allOutputIndices.indexOf(o+e),i!==-1&&(this._allOutputIndices[i]=o))}}}deleteNode(e){let r=this._nodes[e];if(r.outputs.length>1){for(let s=1;s<r.outputs.length;s++)if(this._allData[r.outputs[s]].to.length>0)throw new Error("Node deletion with more than one output connected to other nodes is not supported. ")}r.executeNode=!1;let t=r.inputs[0],o=r.outputs[0],i=this._allData[o].to;for(let s=0;s<r.inputs.length;s++){let u=this._allData[r.inputs[s]].to.indexOf(e);if(u===-1)throw new Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[r.inputs[s]].to.splice(u,1)}this._allData[o]._to=[];let a=this._allOutputIndices.indexOf(o);if(a!==-1&&(this._allOutputIndices[a]=t),i&&i.length>0)for(let s of i){let u=this._nodes[s].inputs.indexOf(o);if(u===-1)throw new Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[s].inputs[u]=t,this._allData[t].to.push(s)}}removeAllDropoutNodes(){let e=0;for(let r of this._nodes){if(r.opType==="Dropout"){if(r.inputs.length!==1)throw new Error("Dropout nodes should only contain one input. ");if(r.outputs.length!==1&&r.outputs.length!==2)throw new Error("Dropout nodes should contain either 1 or 2 output(s)");if(r.outputs.length===2&&this._allData[r.outputs[1]]._to.length!==0)throw new Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let r of this._nodes)r.opType==="Identity"&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if(e.opType==="Conv"){let r=this._allData[e.outputs[0]]._to;if(r.length===1&&this.isActivation(this._nodes[r[0]])){let t=this._nodes[r[0]];if(t.opType==="Clip")if(t.inputs.length===1)try{e.attributes.set("activation_params","floats",[t.attributes.getFloat("min"),t.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[kn,Nn])}else if(t.inputs.length>=3&&this._allData[t.inputs[1]].tensor!==void 0&&this._allData[t.inputs[2]].tensor!==void 0)e.attributes.set("activation_params","floats",[this._allData[t.inputs[1]].tensor.floatData[0],this._allData[t.inputs[2]].tensor.floatData[0]]);else continue;e.attributes.set("activation","string",t.opType),this.deleteNode(r[0])}}}}});var Vy,Gy,la,Uy=N(()=>{"use strict";Vy=ye(Le());Fy();So();Gy=ye(Qn());Re();la=class{constructor(){}load(e,r,t){let o;if(!t)try{this.loadFromOnnxFormat(e,r);return}catch(i){if(t!==void 0)throw i;o=i}try{this.loadFromOrtFormat(e,r)}catch(i){throw t!==void 0?i:new Error(`Failed to load model as ONNX format: ${o}
as ORT format: ${i}`)}}loadFromOnnxFormat(e,r){let t=Gy.onnx.ModelProto.decode(e);if(xt.longToNumber(t.irVersion)<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=t.opsetImport.map(i=>({domain:i.domain,version:xt.longToNumber(i.version)})),this._graph=tc.from(t.graph,r)}loadFromOrtFormat(e,r){let t=new Vy.ByteBuffer(e),o=tl.InferenceSession.getRootAsInferenceSession(t).model();if(xt.longToNumber(o.irVersion())<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let a=0;a<o.opsetImportLength();a++){let s=o.opsetImport(a);this._opsets.push({domain:s?.domain(),version:xt.longToNumber(s.version())})}this._graph=tc.from(o.graph(),r)}get graph(){return this._graph}get opsets(){return this._opsets}}});var ca,Wy=N(()=>{"use strict";zy();My();Et();Uy();ca=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=mi.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,r,t){await this.profiler.event("session","Session.loadModel",async()=>{let o=await Jl(this.backendHint);if(this.sessionHandler=o.createSessionHandler(this.context),this._model=new la,typeof e=="string"){let i=e.endsWith(".ort");{let s=await(await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(s),i)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let i=new Uint8Array(e,r||0,t||e.byteLength);this.initialize(i)}})}initialize(e,r){if(this._initialized)throw new Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let t=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,t,r),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new sa(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw new Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let r=this.normalizeAndValidateInputs(e),t=await this._executionPlan.execute(this.sessionHandler,r);return this.createOutput(t)})}normalizeAndValidateInputs(e){let r=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==r.length)throw new Error(`incorrect input array length: expected ${r.length} but got ${e.length}`)}else{if(e.size!==r.length)throw new Error(`incorrect input map size: expected ${r.length} but got ${e.size}`);let t=new Array(e.size),o=0;for(let i=0;i<r.length;++i){let a=e.get(r[i]);if(!a)throw new Error(`missing input tensor for: '${name}'`);t[o++]=a}e=t}if(!this.context.graphInputTypes||this.context.graphInputTypes.length===0||!this.context.graphInputDims||this.context.graphInputDims.length===0){let t=this._model.graph.getInputIndices(),o=this._model.graph.getValues(),i=new Array(t.length);for(let a=0;a<t.length;++a){let s=o[t[a]];i[a]=s.type.shape.dims,this.context.graphInputTypes.push(s.type.tensorType),this.context.graphInputDims.push(e[a].dims)}this.validateInputTensorDims(i,e,!0)}else this.validateInputTensorDims(this.context.graphInputDims,e,!1);return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,r){for(let t=0;t<r.length;t++){let o=e[t],i=r[t].type;if(o!==i)throw new Error(`input tensor[${t}] check failed: expected type '${o}' but got ${i}`)}}validateInputTensorDims(e,r,t){for(let o=0;o<r.length;o++){let i=e[o],a=r[o].dims;if(!this.compareTensorDims(i,a,t))throw new Error(`input tensor[${o}] check failed: expected shape '[${i.join(",")}]' but got [${a.join(",")}]`)}}compareTensorDims(e,r,t){if(e.length!==r.length)return!1;for(let o=0;o<e.length;++o)if(e[o]!==r[o]&&(!t||e[o]!==0))return!1;return!0}createOutput(e){let r=this._model.graph.getOutputNames();if(e.length!==r.length)throw new Error("expected number of outputs do not match number of generated outputs");let t=new Map;for(let o=0;o<r.length;++o)t.set(r[o],e[o]);return t}initializeOps(e){let r=e.getNodes();this._ops=new Array(r.length);for(let t=0;t<r.length;t++)this._ops[t]=this.sessionHandler.resolve(r[t],this._model.opsets,e)}}});var da,Hy=N(()=>{"use strict";ft();Ln();da=class{constructor(e){this.session=e;this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}get inputMetadata(){throw new Error("Getting model metadata is not supported in webgl backend.")}get outputMetadata(){throw new Error("Getting model metadata is not supported in webgl backend.")}async dispose(){}async run(e,r,t){let o=new Map;for(let s in e)if(Object.hasOwnProperty.call(e,s)){let u=e[s];o.set(s,new nt(u.dims,u.type,void 0,void 0,u.data))}let i=await this.session.run(o),a={};return i.forEach((s,u)=>{a[u]=new It(s.type,s.data,s.dims)}),a}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}});var qy={};In(qy,{onnxjsBackend:()=>JP});var rc,JP,jy=N(()=>{"use strict";Wy();Hy();rc=class{async init(){}async createInferenceSessionHandler(e,r){let t=new ca(r);return typeof e=="string"?await t.loadModel(e):await t.loadModel(e),new da(t)}},JP=new rc});var pa=N(()=>{"use strict"});var Zy={};In(Zy,{default:()=>QP});var Ky,Xy,QP,Jy=N(()=>{"use strict";nc();gn();fa();Ky="ort-wasm-proxy-worker",Xy=globalThis.self?.name===Ky;Xy&&(self.onmessage=n=>{let{type:e,in:r}=n.data;try{switch(e){case"init-wasm":ha(r.wasm).then(()=>{ma(r).then(()=>{postMessage({type:e})},t=>{postMessage({type:e,err:t})})},t=>{postMessage({type:e,err:t})});break;case"init-ep":{let{epName:t,env:o}=r;ga(o,t).then(()=>{postMessage({type:e})},i=>{postMessage({type:e,err:i})});break}case"copy-from":{let{buffer:t}=r,o=Bo(t);postMessage({type:e,out:o});break}case"create":{let{model:t,options:o}=r;ba(t,o).then(i=>{postMessage({type:e,out:i})},i=>{postMessage({type:e,err:i})});break}case"release":ya(r),postMessage({type:e});break;case"run":{let{sessionId:t,inputIndices:o,inputs:i,outputIndices:a,options:s}=r;_a(t,o,i,a,new Array(a.length).fill(null),s).then(u=>{u.some(l=>l[3]!=="cpu")?postMessage({type:e,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:e,out:u},wa([...i,...u]))},u=>{postMessage({type:e,err:u})});break}case"end-profiling":va(r),postMessage({type:e});break;default:}}catch(t){postMessage({type:e,err:t})}});QP=Xy?null:n=>new Worker(n??At,{type:"module",name:Ky})});var Yy={};In(Yy,{default:()=>YP});async function Qy(n={}){var e=n,r=typeof window=="object",t=typeof WorkerGlobalScope<"u",o=t&&self.name?.startsWith("em-pthread");e.mountExternalData=(d,f)=>{d.startsWith("./")&&(d=d.substring(2)),(e.Wc||(e.Wc=new Map)).set(d,f)},e.unmountExternalData=()=>{delete e.Wc};var i=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,Yd:!0}).buffer.constructor;let a=d=>async(...f)=>{try{if(e.Xc)throw Error("Session already started");let b=e.Xc={Jd:f[0],errors:[]},v=await d(...f);if(e.Xc!==b)throw Error("Session mismatch");e.bd?.flush();let _=b.errors;if(0<_.length){let O=await Promise.all(_);if(O=O.filter(k=>k),0<O.length)throw Error(O.join(`
`))}return v}finally{e.Xc=null}};e.jsepInit=(d,f)=>{if(d==="webgpu"){[e.bd,e.zd,e.Dd,e.cd,e.Cd,e.$b,e.Ed,e.Gd,e.Ad,e.Bd,e.Fd]=f;let b=e.bd;e.jsepRegisterBuffer=(v,_,O,k)=>b.registerBuffer(v,_,O,k),e.jsepGetBuffer=v=>b.getBuffer(v),e.jsepCreateDownloader=(v,_,O)=>b.createDownloader(v,_,O),e.jsepOnCreateSession=v=>{b.onCreateSession(v)},e.jsepOnReleaseSession=v=>{b.onReleaseSession(v)},e.jsepOnRunStart=v=>b.onRunStart(v),e.Hd=(v,_)=>{b.upload(v,_)}}else if(d==="webnn"){let b=f[0];[e.Wd,e.rd,e.webnnEnsureTensor,e.sd,e.webnnDownloadTensor,e.Vd,e.webnnEnableTraceEvent]=f.slice(1),e.webnnReleaseTensorId=e.rd,e.webnnUploadTensor=e.sd,e.webnnRegisterMLContext=e.Vd,e.webnnOnRunStart=v=>b.onRunStart(v),e.webnnOnRunEnd=b.onRunEnd.bind(b),e.webnnOnReleaseSession=v=>{b.onReleaseSession(v)},e.webnnCreateMLTensorDownloader=(v,_)=>b.createMLTensorDownloader(v,_),e.webnnRegisterMLTensor=(v,_,O,k)=>b.registerMLTensor(v,_,O,k),e.webnnCreateMLContext=v=>b.createMLContext(v),e.webnnRegisterMLConstant=(v,_,O,k,B,q)=>b.registerMLConstant(v,_,O,k,B,e.Wc,q),e.webnnRegisterGraphInput=b.registerGraphInput.bind(b),e.webnnIsGraphInput=b.isGraphInput.bind(b),e.webnnRegisterGraphOutput=b.registerGraphOutput.bind(b),e.webnnIsGraphOutput=b.isGraphOutput.bind(b),e.webnnCreateTemporaryTensor=b.createTemporaryTensor.bind(b),e.webnnIsGraphInputOutputTypeSupported=b.isGraphInputOutputTypeSupported.bind(b)}};let s=()=>{let d=f=>(...b)=>{let v=Yt;return b=f(...b),Yt!=v?new Promise((_,O)=>{ms={resolve:_,reject:O}}):b};(()=>{for(let f of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])e[f]=d(e[f])})(),a!==void 0&&(e._OrtRun=a(e._OrtRun),e._OrtRunWithBinding=a(e._OrtRunWithBinding)),s=void 0};e.asyncInit=()=>{s?.()};var u,l,c=(d,f)=>{throw f},p=import.meta.url,h="";if(r||t){try{h=new URL(".",p).href}catch{}t&&(l=d=>{var f=new XMLHttpRequest;return f.open("GET",d,!1),f.responseType="arraybuffer",f.send(null),new Uint8Array(f.response)}),u=async d=>{if(F(d))return new Promise((b,v)=>{var _=new XMLHttpRequest;_.open("GET",d,!0),_.responseType="arraybuffer",_.onload=()=>{_.status==200||_.status==0&&_.response?b(_.response):v(_.status)},_.onerror=v,_.send(null)});var f=await fetch(d,{credentials:"same-origin"});if(f.ok)return f.arrayBuffer();throw Error(f.status+" : "+f.url)}}var m,g,y,T,w,x,I,A=console.log.bind(console),P=console.error.bind(console),C=A,R=P,M=!1,F=d=>d.startsWith("file://");function $(){Y.buffer!=ee.buffer&&G()}if(o){let d=function(f){try{var b=f.data,v=b.Sc;if(v==="load"){let _=[];self.onmessage=O=>_.push(O),I=()=>{postMessage({Sc:"loaded"});for(let O of _)d(O);self.onmessage=d};for(let O of b.wd)e[O]&&!e[O].proxy||(e[O]=(...k)=>{postMessage({Sc:"callHandler",vd:O,args:k})},O=="print"&&(C=e[O]),O=="printErr"&&(R=e[O]));Y=b.Od,G(),x(b.Pd)}else if(v==="run"){(function(_){var O=($(),Q)[_+52>>>2>>>0];_=($(),Q)[_+56>>>2>>>0],Xd(O,O-_),ve(O)})(b.Qc),xs(b.Qc,0,0,1,0,0),Zc(),fs(b.Qc),J||(Ud(),J=!0);try{Wx(b.Ld,b.Zc)}catch(_){if(_!="unwind")throw _}}else b.target!=="setimmediate"&&(v==="checkMailbox"?J&&Yo():v&&(R(`worker: received unknown command ${v}`),R(b)))}catch(_){throw Wd(),_}};var AD=d,J=!1;self.onunhandledrejection=f=>{throw f.reason||f},self.onmessage=d}var Y,ee,W,Te,oe,L,Q,te,me,Ke,qe,ce=!1;function G(){var d=Y.buffer;e.HEAP8=ee=new Int8Array(d),Te=new Int16Array(d),e.HEAPU8=W=new Uint8Array(d),oe=new Uint16Array(d),e.HEAP32=L=new Int32Array(d),e.HEAPU32=Q=new Uint32Array(d),te=new Float32Array(d),me=new Float64Array(d),Ke=new BigInt64Array(d),qe=new BigUint64Array(d)}function ie(){ce=!0,o?I():rn.sb()}var Oe,ut=0,dt=null;function Qe(){if(--ut==0&&dt){var d=dt;dt=null,d()}}function Me(d){throw R(d="Aborted("+d+")"),M=!0,d=new WebAssembly.RuntimeError(d+". Build with -sASSERTIONS for more info."),w?.(d),d}function Ft(){return{a:{la:f2,gb:p2,g:Hx,I:qx,f:jx,m:Kx,h:Xx,ga:Zx,b:Jx,S:Qx,Ha:rd,n:Yx,Z:ad,Xa:sd,Da:ud,Fa:ld,Ya:cd,Va:dd,Oa:pd,Ua:fd,ja:hd,Ea:md,Ba:gd,Wa:bd,Ca:yd,bb:eT,da:rT,wa:nT,ua:iT,ca:sT,O:uT,H:lT,va:cT,Y:bT,xa:yT,Ra:_T,za:vT,Ia:wT,sa:xT,ea:TT,Qa:fs,_a:IT,R:OT,r:kT,c:cs,hb:NT,y:LT,M:RT,C:zT,q:MT,t:$d,ib:$d,J:BT,Q:FT,j:VT,v:GT,s:UT,l:WT,La:HT,Ma:qT,Na:jT,Ja:Ed,Ka:Cd,ta:Dd,db:XT,ab:QT,u:YT,$:e2,fa:t2,$a:ZT,U:r2,Za:n2,Aa:o2,F:KT,T:i2,ka:oi,ya:a2,fb:s2,eb:u2,Sa:Rd,Ta:zd,Ga:is,_:Md,ia:Bd,Pa:Fd,ha:Vd,kb:X2,ma:G2,lb:K2,na:V2,G:k2,d:b2,o:m2,w:h2,B:A2,pb:z2,K:E2,x:_2,oa:B2,W:U2,aa:R2,mb:j2,nb:q2,ob:M2,pa:L2,qb:N2,N:C2,X:F2,e:y2,A:v2,k:g2,jb:Z2,p:w2,z:x2,D:$2,E:T2,L:O2,rb:D2,P:W2,ba:P2,V:H2,qa:S2,ra:I2,i:c2,a:Y,cb:os}}}class Jr{name="ExitStatus";constructor(f){this.message=`Program terminated with exit(${f})`,this.status=f}}var ho=d=>{d.terminate(),d.onmessage=()=>{}},Xo=[],qc=d=>{Yr.length==0&&(Qc(),Jc(Yr[0]));var f=Yr.pop();if(!f)return 6;mo.push(f),wn[d.Qc]=f,f.Qc=d.Qc;var b={Sc:"run",Ld:d.Kd,Zc:d.Zc,Qc:d.Qc};return f.postMessage(b,d.qd),0},Qr=0,je=(d,f,...b)=>{for(var v=2*b.length,_=we(),O=Is(8*v),k=O>>>3,B=0;B<b.length;B++){var q=b[B];typeof q=="bigint"?(($(),Ke)[k+2*B>>>0]=1n,($(),Ke)[k+2*B+1>>>0]=q):(($(),Ke)[k+2*B>>>0]=0n,($(),me)[k+2*B+1>>>0]=q)}return d=Hd(d,0,v,O,f),ve(_),d};function os(d){if(o)return je(0,1,d);if(y=d,!(0<Qr)){for(var f of mo)ho(f);for(f of Yr)ho(f);Yr=[],mo=[],wn={},M=!0}c(0,new Jr(d))}function jc(d){if(o)return je(1,0,d);is(d)}var is=d=>{if(y=d,o)throw jc(d),"unwind";os(d)},Yr=[],mo=[],Kc=[],wn={},Xc=d=>{var f=d.Qc;delete wn[f],Yr.push(d),mo.splice(mo.indexOf(d),1),d.Qc=0,qd(f)};function Zc(){Kc.forEach(d=>d())}var Jc=d=>new Promise(f=>{d.onmessage=_=>{var O=(_=_.data).Sc;if(_.Yc&&_.Yc!=ws()){var k=wn[_.Yc];k?k.postMessage(_,_.qd):R(`Internal error! Worker sent a message "${O}" to target pthread ${_.Yc}, but that thread no longer exists!`)}else O==="checkMailbox"?Yo():O==="spawnThread"?qc(_):O==="cleanupThread"?Xc(wn[_.Md]):O==="loaded"?(d.loaded=!0,f(d)):_.target==="setimmediate"?d.postMessage(_):O==="callHandler"?e[_.vd](..._.args):O&&R(`worker sent an unknown command ${O}`)},d.onerror=_=>{throw R(`worker sent an error! ${_.filename}:${_.lineno}: ${_.message}`),_};var b,v=[];for(b of[])e.propertyIsEnumerable(b)&&v.push(b);d.postMessage({Sc:"load",wd:v,Od:Y,Pd:g})});function Qc(){var d=new Worker((()=>{let f=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new f("ort.all.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});Yr.push(d)}var Wx=(d,f)=>{Qr=0,d=Ss(d,f),0<Qr?y=d:Ts(d)},Zo=[],Jo=0;function Hx(d){var f=new as(d>>>=0);return($(),ee)[f.Rc+12>>>0]==0&&(Yc(f,!0),Jo--),ed(f,!1),Zo.push(f),Jd(d),Yd(d)}var qn=0,qx=()=>{Ie(0,0);var d=Zo.pop();Zd(d.ad),qn=0};function Yc(d,f){f=f?1:0,($(),ee)[d.Rc+12>>>0]=f}function ed(d,f){f=f?1:0,($(),ee)[d.Rc+13>>>0]=f}class as{constructor(f){this.ad=f,this.Rc=f-24}}var ss=d=>{var f=qn;if(!f)return yo(0),0;var b=new as(f);($(),Q)[b.Rc+16>>>2>>>0]=f;var v=($(),Q)[b.Rc+4>>>2>>>0];if(!v)return yo(0),f;for(var _ of d){if(_===0||_===v)break;if(Qd(_,v,b.Rc+16))return yo(_),f}return yo(v),f};function jx(){return ss([])}function Kx(d){return ss([d>>>0])}function Xx(d,f,b,v){return ss([d>>>0,f>>>0,b>>>0,v>>>0])}var Zx=()=>{var d=Zo.pop();d||Me("no exception to throw");var f=d.ad;throw($(),ee)[d.Rc+13>>>0]==0&&(Zo.push(d),ed(d,!0),Yc(d,!1),Jo++),qn=f};function Jx(d,f,b){var v=new as(d>>>=0);throw f>>>=0,b>>>=0,($(),Q)[v.Rc+16>>>2>>>0]=0,($(),Q)[v.Rc+4>>>2>>>0]=f,($(),Q)[v.Rc+8>>>2>>>0]=b,Jo++,qn=d}var Qx=()=>Jo;function td(d,f,b,v){return o?je(2,1,d,f,b,v):rd(d,f,b,v)}function rd(d,f,b,v){if(d>>>=0,b>>>=0,v>>>=0,i===void 0)return 6;var _=[];return o&&_.length===0?td(d,f>>>=0,b,v):(d={Kd:b,Qc:d,Zc:v,qd:_},o?(d.Sc="spawnThread",postMessage(d,_),0):qc(d))}function Yx(d){throw qn||=d>>>0,qn}var nd=typeof TextDecoder<"u"?new TextDecoder:void 0,od=(d,f,b,v)=>{if(b=f+b,v)return b;for(;d[f]&&!(f>=b);)++f;return f},id=(d,f=0,b,v)=>{if(16<(b=od(d,f>>>=0,b,v))-f&&d.buffer&&nd)return nd.decode(d.buffer instanceof ArrayBuffer?d.subarray(f,b):d.slice(f,b));for(v="";f<b;){var _=d[f++];if(128&_){var O=63&d[f++];if((224&_)==192)v+=String.fromCharCode((31&_)<<6|O);else{var k=63&d[f++];65536>(_=(240&_)==224?(15&_)<<12|O<<6|k:(7&_)<<18|O<<12|k<<6|63&d[f++])?v+=String.fromCharCode(_):(_-=65536,v+=String.fromCharCode(55296|_>>10,56320|1023&_))}}else v+=String.fromCharCode(_)}return v},Ye=(d,f,b)=>(d>>>=0)?id(($(),W),d,f,b):"";function ad(d,f,b){return o?je(3,1,d,f,b):0}function sd(d,f){if(o)return je(4,1,d,f)}function ud(d,f){if(o)return je(5,1,d,f)}function ld(d,f,b){if(o)return je(6,1,d,f,b)}function cd(d,f,b){return o?je(7,1,d,f,b):0}function dd(d,f){if(o)return je(8,1,d,f)}function pd(d,f,b){if(o)return je(9,1,d,f,b)}function fd(d,f,b,v){if(o)return je(10,1,d,f,b,v)}function hd(d,f,b,v){if(o)return je(11,1,d,f,b,v)}function md(d,f,b,v){if(o)return je(12,1,d,f,b,v)}function gd(d){if(o)return je(13,1,d)}function bd(d,f){if(o)return je(14,1,d,f)}function yd(d,f,b){if(o)return je(15,1,d,f,b)}var eT=()=>Me(""),Qt=d=>{d>>>=0;for(var f="";;){var b=($(),W)[d++>>>0];if(!b)return f;f+=String.fromCharCode(b)}},us={},ls={},tT={},jn=class extends Error{constructor(d){super(d),this.name="BindingError"}};function qr(d,f,b={}){return function(v,_,O={}){var k=_.name;if(!v)throw new jn(`type "${k}" must have a positive integer typeid pointer`);if(ls.hasOwnProperty(v)){if(O.xd)return;throw new jn(`Cannot register type '${k}' twice`)}ls[v]=_,delete tT[v],us.hasOwnProperty(v)&&(_=us[v],delete us[v],_.forEach(B=>B()))}(d,f,b)}var _d=(d,f,b)=>{switch(f){case 1:return b?v=>($(),ee)[v>>>0]:v=>($(),W)[v>>>0];case 2:return b?v=>($(),Te)[v>>>1>>>0]:v=>($(),oe)[v>>>1>>>0];case 4:return b?v=>($(),L)[v>>>2>>>0]:v=>($(),Q)[v>>>2>>>0];case 8:return b?v=>($(),Ke)[v>>>3>>>0]:v=>($(),qe)[v>>>3>>>0];default:throw new TypeError(`invalid integer width (${f}): ${d}`)}};function rT(d,f,b,v,_){d>>>=0,b>>>=0,f=Qt(f>>>0);let O=k=>k;if(v=v===0n){let k=8*b;O=B=>BigInt.asUintN(k,B),_=O(_)}qr(d,{name:f,Nc:O,Uc:(k,B)=>(typeof B=="number"&&(B=BigInt(B)),B),Tc:_d(f,b,!v),Vc:null})}function nT(d,f,b,v){qr(d>>>=0,{name:f=Qt(f>>>0),Nc:function(_){return!!_},Uc:function(_,O){return O?b:v},Tc:function(_){return this.Nc(($(),W)[_>>>0])},Vc:null})}var vd=[],xn=[0,1,,1,null,1,!0,1,!1,1];function cs(d){9<(d>>>=0)&&--xn[d+1]==0&&(xn[d]=void 0,vd.push(d))}var Pt=d=>{if(!d)throw new jn(`Cannot use deleted val. handle = ${d}`);return xn[d]},Vt=d=>{switch(d){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let f=vd.pop()||xn.length;return xn[f]=d,xn[f+1]=1,f}};function ds(d){return this.Nc(($(),Q)[d>>>2>>>0])}var oT={name:"emscripten::val",Nc:d=>{var f=Pt(d);return cs(d),f},Uc:(d,f)=>Vt(f),Tc:ds,Vc:null};function iT(d){return qr(d>>>0,oT)}var aT=(d,f)=>{switch(f){case 4:return function(b){return this.Nc(($(),te)[b>>>2>>>0])};case 8:return function(b){return this.Nc(($(),me)[b>>>3>>>0])};default:throw new TypeError(`invalid float width (${f}): ${d}`)}};function sT(d,f,b){b>>>=0,qr(d>>>=0,{name:f=Qt(f>>>0),Nc:v=>v,Uc:(v,_)=>_,Tc:aT(f,b),Vc:null})}function uT(d,f,b,v,_){d>>>=0,b>>>=0,f=Qt(f>>>0);let O=B=>B;if(v===0){var k=32-8*b;O=B=>B<<k>>>k,_=O(_)}qr(d,{name:f,Nc:O,Uc:(B,q)=>q,Tc:_d(f,b,v!==0),Vc:null})}function lT(d,f,b){function v(O){var k=($(),Q)[O>>>2>>>0];return O=($(),Q)[O+4>>>2>>>0],new _(($(),ee).buffer,O,k)}var _=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][f];qr(d>>>=0,{name:b=Qt(b>>>0),Nc:v,Tc:v},{xd:!0})}var en=(d,f,b)=>{var v=($(),W);if(f>>>=0,0<b){var _=f;b=f+b-1;for(var O=0;O<d.length;++O){var k=d.codePointAt(O);if(127>=k){if(f>=b)break;v[f++>>>0]=k}else if(2047>=k){if(f+1>=b)break;v[f++>>>0]=192|k>>6,v[f++>>>0]=128|63&k}else if(65535>=k){if(f+2>=b)break;v[f++>>>0]=224|k>>12,v[f++>>>0]=128|k>>6&63,v[f++>>>0]=128|63&k}else{if(f+3>=b)break;v[f++>>>0]=240|k>>18,v[f++>>>0]=128|k>>12&63,v[f++>>>0]=128|k>>6&63,v[f++>>>0]=128|63&k,O++}}v[f>>>0]=0,d=f-_}else d=0;return d},Qo=d=>{for(var f=0,b=0;b<d.length;++b){var v=d.charCodeAt(b);127>=v?f++:2047>=v?f+=2:55296<=v&&57343>=v?(f+=4,++b):f+=3}return f};function cT(d,f){qr(d>>>=0,{name:f=Qt(f>>>0),Nc(b){var v=($(),Q)[b>>>2>>>0];return v=Ye(b+4,v,!0),er(b),v},Uc(b,v){v instanceof ArrayBuffer&&(v=new Uint8Array(v));var _=typeof v=="string";if(!(_||ArrayBuffer.isView(v)&&v.BYTES_PER_ELEMENT==1))throw new jn("Cannot pass non-string to std::string");var O=_?Qo(v):v.length,k=bo(4+O+1),B=k+4;return($(),Q)[k>>>2>>>0]=O,_?en(v,B,O+1):($(),W).set(v,B>>>0),b!==null&&b.push(er,k),k},Tc:ds,Vc(b){er(b)}})}var wd=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,dT=(d,f,b)=>{if(d>>>=1,16<(f=od(($(),oe),d,f/2,b))-d&&wd)return wd.decode(($(),oe).buffer instanceof ArrayBuffer?($(),oe).subarray(d>>>0,f>>>0):($(),oe).slice(d,f));for(b="";d<f;++d){var v=($(),oe)[d>>>0];b+=String.fromCharCode(v)}return b},pT=(d,f,b)=>{if(b??=2147483647,2>b)return 0;var v=f;b=(b-=2)<2*d.length?b/2:d.length;for(var _=0;_<b;++_){var O=d.charCodeAt(_);($(),Te)[f>>>1>>>0]=O,f+=2}return($(),Te)[f>>>1>>>0]=0,f-v},fT=d=>2*d.length,hT=(d,f,b)=>{var v="";d>>>=2;for(var _=0;!(_>=f/4);_++){var O=($(),Q)[d+_>>>0];if(!O&&!b)break;v+=String.fromCodePoint(O)}return v},mT=(d,f,b)=>{if(f>>>=0,b??=2147483647,4>b)return 0;var v=f;b=v+b-4;for(var _=0;_<d.length;++_){var O=d.codePointAt(_);if(65535<O&&_++,($(),L)[f>>>2>>>0]=O,(f+=4)+4>b)break}return($(),L)[f>>>2>>>0]=0,f-v},gT=d=>{for(var f=0,b=0;b<d.length;++b)65535<d.codePointAt(b)&&b++,f+=4;return f};function bT(d,f,b){if(d>>>=0,f>>>=0,b=Qt(b>>>=0),f===2)var v=dT,_=pT,O=fT;else v=hT,_=mT,O=gT;qr(d,{name:b,Nc:k=>{var B=($(),Q)[k>>>2>>>0];return B=v(k+4,B*f,!0),er(k),B},Uc:(k,B)=>{if(typeof B!="string")throw new jn(`Cannot pass non-string to C++ string type ${b}`);var q=O(B),X=bo(4+q+f);return($(),Q)[X>>>2>>>0]=q/f,_(B,X+4,q+f),k!==null&&k.push(er,X),X},Tc:ds,Vc(k){er(k)}})}function yT(d,f){qr(d>>>=0,{yd:!0,name:f=Qt(f>>>0),Nc:()=>{},Uc:()=>{}})}function _T(d){xs(d>>>0,!t,1,!r,131072,!1),Zc()}var ps=d=>{if(!M)try{if(d(),!(0<Qr))try{o?Ts(y):is(y)}catch(f){f instanceof Jr||f=="unwind"||c(0,f)}}catch(f){f instanceof Jr||f=="unwind"||c(0,f)}};function fs(d){d>>>=0,typeof Atomics.Nd=="function"&&(Atomics.Nd(($(),L),d>>>2,d).value.then(Yo),d+=128,Atomics.store(($(),L),d>>>2,1))}var Yo=()=>{var d=ws();d&&(fs(d),ps(Kd))};function vT(d,f){(d>>>=0)==f>>>0?setTimeout(Yo):o?postMessage({Yc:d,Sc:"checkMailbox"}):(d=wn[d])&&d.postMessage({Sc:"checkMailbox"})}var ei=[];function wT(d,f,b,v,_){for(f>>>=0,v/=2,ei.length=v,b=_>>>0>>>3,_=0;_<v;_++)($(),Ke)[b+2*_>>>0]?ei[_]=($(),Ke)[b+2*_+1>>>0]:ei[_]=($(),me)[b+2*_+1>>>0];return(f?vs[f]:d2[d])(...ei)}var xT=()=>{Qr=0};function TT(d){d>>>=0,o?postMessage({Sc:"cleanupThread",Md:d}):Xc(wn[d])}function IT(d){}var ti=d=>{try{d()}catch(f){Me(f)}};function ST(d){var f=(...b)=>{ri.push(d);try{return d(...b)}finally{M||(ri.pop(),Yt&&tn===1&&ri.length===0&&(tn=0,Qr+=1,ti(zp),typeof Fibers<"u"&&Fibers.$d()))}};return Id.set(d,f),f}var tn=0,Yt=null,xd=0,ri=[],hs=new Map,Td=new Map,Id=new Map,$T=0,ms=null,AT=[],Sd=d=>function(f){if(!M){if(tn===0){var b=!1,v=!1;f((_=0)=>{if(!M&&(xd=_,b=!0,v)){tn=2,ti(()=>Mp(Yt)),typeof MainLoop<"u"&&MainLoop.td&&MainLoop.resume(),_=!1;try{var O=function(){var q=($(),L)[Yt+8>>>2>>>0];return q=Td.get(q),q=Id.get(q),--Qr,q()}()}catch(q){O=q,_=!0}var k=!1;if(!Yt){var B=ms;B&&(ms=null,(_?B.reject:B.resolve)(O),k=!0)}if(_&&!k)throw O}}),v=!0,b||(tn=1,Yt=function(){var _=bo(65548),O=_+12;if(($(),Q)[_>>>2>>>0]=O,($(),Q)[_+4>>>2>>>0]=O+65536,O=ri[0],!hs.has(O)){var k=$T++;hs.set(O,k),Td.set(k,O)}return O=hs.get(O),($(),L)[_+8>>>2>>>0]=O,_}(),typeof MainLoop<"u"&&MainLoop.td&&MainLoop.pause(),ti(()=>Rp(Yt)))}else tn===2?(tn=0,ti(Bp),er(Yt),Yt=null,AT.forEach(ps)):Me(`invalid state: ${tn}`);return xd}}(f=>{d().then(f)});function OT(d){return d>>>=0,Sd(async()=>{var f=await Pt(d);return Vt(f)})}var gs=[],PT=d=>{var f=gs.length;return gs.push(d),f},ET=(d,f)=>{for(var b=Array(d),v=0;v<d;++v){var _=v,O=($(),Q)[f+4*v>>>2>>>0],k=ls[O];if(k===void 0)throw d=`parameter ${v}`,O=Gd(O),f=Qt(O),er(O),new jn(`${d} has unknown type ${f}`);b[_]=k}return b},CT=(d,f,b)=>{var v=[];return d=d(v,b),v.length&&(($(),Q)[f>>>2>>>0]=Vt(v)),d},DT={},ni=d=>{var f=DT[d];return f===void 0?Qt(d):f};function kT(d,f,b){var[v,..._]=ET(d,f>>>0);f=v.Uc.bind(v);var O=_.map(q=>q.Tc.bind(q));d--;var k={toValue:Pt};switch(d=O.map((q,X)=>{var be=`argFromPtr${X}`;return k[be]=q,`${be}(args${X?"+"+8*X:""})`}),b){case 0:var B="toValue(handle)";break;case 2:B="new (toValue(handle))";break;case 3:B="";break;case 1:k.getStringOrSymbol=ni,B="toValue(handle)[getStringOrSymbol(methodName)]"}return B+=`(${d})`,v.yd||(k.toReturnWire=f,k.emval_returnValue=CT,B=`return emval_returnValue(toReturnWire, destructorsRef, ${B})`),B=`return function (handle, methodName, destructorsRef, args) {
  ${B}
  }`,b=new Function(Object.keys(k),B)(...Object.values(k)),B=`methodCaller<(${_.map(q=>q.name)}) => ${v.name}>`,PT(Object.defineProperty(b,"name",{value:B}))}function NT(d,f){return f>>>=0,(d=Pt(d>>>0))==Pt(f)}function LT(d){return(d>>>=0)==0?Vt(globalThis):(d=ni(d),Vt(globalThis[d]))}function RT(d){return d=ni(d>>>0),Vt(e[d])}function zT(d,f){return f>>>=0,d=Pt(d>>>0),f=Pt(f),Vt(d[f])}function MT(d){9<(d>>>=0)&&(xn[d+1]+=1)}function $d(d,f,b,v,_){return gs[d>>>0](f>>>0,b>>>0,v>>>0,_>>>0)}function BT(){return Vt([])}function FT(d){d=Pt(d>>>0);for(var f=Array(d.length),b=0;b<d.length;b++)f[b]=d[b];return Vt(f)}function VT(d){return Vt(ni(d>>>0))}function GT(){return Vt({})}function UT(d){for(var f=Pt(d>>>=0);f.length;){var b=f.pop();f.pop()(b)}cs(d)}function WT(d,f,b){f>>>=0,b>>>=0,d=Pt(d>>>0),f=Pt(f),b=Pt(b),d[f]=b}function HT(d,f){d=-9007199254740992>d||9007199254740992<d?NaN:Number(d),f>>>=0,d=new Date(1e3*d),($(),L)[f>>>2>>>0]=d.getUTCSeconds(),($(),L)[f+4>>>2>>>0]=d.getUTCMinutes(),($(),L)[f+8>>>2>>>0]=d.getUTCHours(),($(),L)[f+12>>>2>>>0]=d.getUTCDate(),($(),L)[f+16>>>2>>>0]=d.getUTCMonth(),($(),L)[f+20>>>2>>>0]=d.getUTCFullYear()-1900,($(),L)[f+24>>>2>>>0]=d.getUTCDay(),d=(d.getTime()-Date.UTC(d.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,($(),L)[f+28>>>2>>>0]=d}var Ad=d=>d%4==0&&(d%100!=0||d%400==0),Od=[0,31,60,91,121,152,182,213,244,274,305,335],Pd=[0,31,59,90,120,151,181,212,243,273,304,334];function qT(d,f){d=-9007199254740992>d||9007199254740992<d?NaN:Number(d),f>>>=0,d=new Date(1e3*d),($(),L)[f>>>2>>>0]=d.getSeconds(),($(),L)[f+4>>>2>>>0]=d.getMinutes(),($(),L)[f+8>>>2>>>0]=d.getHours(),($(),L)[f+12>>>2>>>0]=d.getDate(),($(),L)[f+16>>>2>>>0]=d.getMonth(),($(),L)[f+20>>>2>>>0]=d.getFullYear()-1900,($(),L)[f+24>>>2>>>0]=d.getDay();var b=(Ad(d.getFullYear())?Od:Pd)[d.getMonth()]+d.getDate()-1|0;($(),L)[f+28>>>2>>>0]=b,($(),L)[f+36>>>2>>>0]=-60*d.getTimezoneOffset(),b=new Date(d.getFullYear(),6,1).getTimezoneOffset();var v=new Date(d.getFullYear(),0,1).getTimezoneOffset();d=0|(b!=v&&d.getTimezoneOffset()==Math.min(v,b)),($(),L)[f+32>>>2>>>0]=d}function jT(d){d>>>=0;var f=new Date(($(),L)[d+20>>>2>>>0]+1900,($(),L)[d+16>>>2>>>0],($(),L)[d+12>>>2>>>0],($(),L)[d+8>>>2>>>0],($(),L)[d+4>>>2>>>0],($(),L)[d>>>2>>>0],0),b=($(),L)[d+32>>>2>>>0],v=f.getTimezoneOffset(),_=new Date(f.getFullYear(),6,1).getTimezoneOffset(),O=new Date(f.getFullYear(),0,1).getTimezoneOffset(),k=Math.min(O,_);return 0>b?($(),L)[d+32>>>2>>>0]=+(_!=O&&k==v):0<b!=(k==v)&&(_=Math.max(O,_),f.setTime(f.getTime()+6e4*((0<b?k:_)-v))),($(),L)[d+24>>>2>>>0]=f.getDay(),b=(Ad(f.getFullYear())?Od:Pd)[f.getMonth()]+f.getDate()-1|0,($(),L)[d+28>>>2>>>0]=b,($(),L)[d>>>2>>>0]=f.getSeconds(),($(),L)[d+4>>>2>>>0]=f.getMinutes(),($(),L)[d+8>>>2>>>0]=f.getHours(),($(),L)[d+12>>>2>>>0]=f.getDate(),($(),L)[d+16>>>2>>>0]=f.getMonth(),($(),L)[d+20>>>2>>>0]=f.getYear(),d=f.getTime(),BigInt(isNaN(d)?-1:d/1e3)}function Ed(d,f,b,v,_,O,k){return o?je(16,1,d,f,b,v,_,O,k):-52}function Cd(d,f,b,v,_,O){if(o)return je(17,1,d,f,b,v,_,O)}var go={},KT=()=>performance.timeOrigin+performance.now();function Dd(d,f){if(o)return je(18,1,d,f);if(go[d]&&(clearTimeout(go[d].id),delete go[d]),!f)return 0;var b=setTimeout(()=>{delete go[d],ps(()=>jd(d,performance.timeOrigin+performance.now()))},f);return go[d]={id:b,Zd:f},0}function XT(d,f,b,v){d>>>=0,f>>>=0,b>>>=0,v>>>=0;var _=new Date().getFullYear(),O=new Date(_,0,1).getTimezoneOffset();_=new Date(_,6,1).getTimezoneOffset();var k=Math.max(O,_);($(),Q)[d>>>2>>>0]=60*k,($(),L)[f>>>2>>>0]=+(O!=_),d=(f=B=>{var q=Math.abs(B);return`UTC${0<=B?"-":"+"}${String(Math.floor(q/60)).padStart(2,"0")}${String(q%60).padStart(2,"0")}`})(O),f=f(_),_<O?(en(d,b,17),en(f,v,17)):(en(d,v,17),en(f,b,17))}var ZT=()=>Date.now(),JT=1;function QT(d,f,b){if(b>>>=0,!(0<=d&&3>=d))return 28;if(d===0)d=Date.now();else{if(!JT)return 52;d=performance.timeOrigin+performance.now()}return d=Math.round(1e6*d),($(),Ke)[b>>>3>>>0]=BigInt(d),0}var bs=[],kd=(d,f)=>{bs.length=0;for(var b;b=($(),W)[d++>>>0];){var v=b!=105;f+=(v&=b!=112)&&f%8?4:0,bs.push(b==112?($(),Q)[f>>>2>>>0]:b==106?($(),Ke)[f>>>3>>>0]:b==105?($(),L)[f>>>2>>>0]:($(),me)[f>>>3>>>0]),f+=v?8:4}return bs};function YT(d,f,b){return d>>>=0,f=kd(f>>>0,b>>>0),vs[d](...f)}function e2(d,f,b){return d>>>=0,f=kd(f>>>0,b>>>0),vs[d](...f)}var t2=()=>{};function r2(d,f){return R(Ye(d>>>0,f>>>0))}var n2=()=>{throw Qr+=1,"unwind"};function o2(){return 4294901760}var i2=()=>navigator.hardwareConcurrency,Tn={};function oi(d){if(!(2147483648&(d>>>=0)))return Me("Cannot use emscripten_pc_get_function on native functions without -sUSE_OFFSET_CONVERTER"),0;if(!(d=Tn[d]))return 0;var f;if(f=/^\s+at (.*) \(.*\)$/.exec(d))d=f[1];else{if(!(f=/^(.+?)@/.exec(d)))return 0;d=f[1]}er(oi.gd??0),f=Qo(d)+1;var b=bo(f);return b&&en(d,b,f),oi.gd=b,oi.gd}function a2(d){d>>>=0;var f=($(),W).length;if(d<=f||4294901760<d)return!1;for(var b=1;4>=b;b*=2){var v=f*(1+.2/b);v=Math.min(v,d+100663296);e:{v=(Math.min(4294901760,65536*Math.ceil(Math.max(d,v)/65536))-Y.buffer.byteLength+65535)/65536|0;try{Y.grow(v),G();var _=1;break e}catch{}_=void 0}if(_)return!0}return!1}var ii=d=>{var f;if(f=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(d))return+f[1];if(/\bwasm-function\[(\d+)\]:(\d+)/.exec(d))Me("Legacy backtrace format detected but -sUSE_OFFSET_CONVERTER not present.");else if(f=/:(\d+):\d+(?:\)|$)/.exec(d))return 2147483648|+f[1];return 0},Nd=d=>{d.forEach(f=>{var b=ii(f);b&&(Tn[b]=f)})};function s2(){var d=Error().stack.toString().split(`
`);return d[0]=="Error"&&d.shift(),Nd(d),Tn.dd=ii(d[3]),Tn.Id=d,Tn.dd}function u2(d,f,b){if(d>>>=0,f>>>=0,Tn.dd==d)var v=Tn.Id;else(v=Error().stack.toString().split(`
`))[0]=="Error"&&v.shift(),Nd(v);for(var _=3;v[_]&&ii(v[_])!=d;)++_;for(d=0;d<b&&v[d+_];++d)($(),L)[f+4*d>>>2>>>0]=ii(v[d+_]);return d}var ys,_s={},Ld=()=>{if(!ys){var d,f={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.language||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(d in _s)_s[d]===void 0?delete f[d]:f[d]=_s[d];var b=[];for(d in f)b.push(`${d}=${f[d]}`);ys=b}return ys};function Rd(d,f){if(o)return je(19,1,d,f);d>>>=0,f>>>=0;var b,v=0,_=0;for(b of Ld()){var O=f+v;($(),Q)[d+_>>>2>>>0]=O,v+=en(b,O,1/0)+1,_+=4}return 0}function zd(d,f){if(o)return je(20,1,d,f);d>>>=0,f>>>=0;var b=Ld();for(var v of(($(),Q)[d>>>2>>>0]=b.length,d=0,b))d+=Qo(v)+1;return($(),Q)[f>>>2>>>0]=d,0}function Md(d){return o?je(21,1,d):52}function Bd(d,f,b,v){return o?je(22,1,d,f,b,v):52}function Fd(d,f,b,v){return o?je(23,1,d,f,b,v):70}var l2=[null,[],[]];function Vd(d,f,b,v){if(o)return je(24,1,d,f,b,v);f>>>=0,b>>>=0,v>>>=0;for(var _=0,O=0;O<b;O++){var k=($(),Q)[f>>>2>>>0],B=($(),Q)[f+4>>>2>>>0];f+=8;for(var q=0;q<B;q++){var X=d,be=($(),W)[k+q>>>0],$e=l2[X];be===0||be===10?((X===1?C:R)(id($e)),$e.length=0):$e.push(be)}_+=B}return($(),Q)[v>>>2>>>0]=_,0}function c2(d){return d>>>0}o||function(){for(var d=e.numThreads-1;d--;)Qc();Xo.push(()=>{ut++,function(f){o?f():Promise.all(Yr.map(Jc)).then(f)}(()=>Qe())})}(),o||(Y=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),G()),e.wasmBinary&&(m=e.wasmBinary),e.stackSave=()=>we(),e.stackRestore=d=>ve(d),e.stackAlloc=d=>Is(d),e.setValue=function(d,f,b="i8"){switch(b.endsWith("*")&&(b="*"),b){case"i1":case"i8":($(),ee)[d>>>0]=f;break;case"i16":($(),Te)[d>>>1>>>0]=f;break;case"i32":($(),L)[d>>>2>>>0]=f;break;case"i64":($(),Ke)[d>>>3>>>0]=BigInt(f);break;case"float":($(),te)[d>>>2>>>0]=f;break;case"double":($(),me)[d>>>3>>>0]=f;break;case"*":($(),Q)[d>>>2>>>0]=f;break;default:Me(`invalid type for setValue: ${b}`)}},e.getValue=function(d,f="i8"){switch(f.endsWith("*")&&(f="*"),f){case"i1":case"i8":return($(),ee)[d>>>0];case"i16":return($(),Te)[d>>>1>>>0];case"i32":return($(),L)[d>>>2>>>0];case"i64":return($(),Ke)[d>>>3>>>0];case"float":return($(),te)[d>>>2>>>0];case"double":return($(),me)[d>>>3>>>0];case"*":return($(),Q)[d>>>2>>>0];default:Me(`invalid type for getValue: ${f}`)}},e.UTF8ToString=Ye,e.stringToUTF8=en,e.lengthBytesUTF8=Qo;var d2=[os,jc,td,ad,sd,ud,ld,cd,dd,pd,fd,hd,md,gd,bd,yd,Ed,Cd,Dd,Rd,zd,Md,Bd,Fd,Vd],vs={903532:(d,f,b,v,_)=>{if(e===void 0||!e.Wc)return 1;if((d=Ye(Number(d>>>0))).startsWith("./")&&(d=d.substring(2)),!(d=e.Wc.get(d)))return 2;if(f=Number(f>>>0),b=Number(b>>>0),v=Number(v>>>0),f+b>d.byteLength)return 3;try{let O=d.subarray(f,f+b);switch(_){case 0:($(),W).set(O,v>>>0);break;case 1:e.Ud?e.Ud(v,O):e.Hd(v,O);break;default:return 4}return 0}catch{return 4}},904356:(d,f,b)=>{e.sd(d,($(),W).subarray(f>>>0,f+b>>>0))},904420:()=>e.Wd(),904462:d=>{e.rd(d)},904499:()=>{e.Ad()},904530:()=>{e.Bd()},904559:()=>{e.Fd()},904584:d=>e.zd(d),904617:d=>e.Dd(d),904649:(d,f,b)=>{e.cd(Number(d),Number(f),Number(b),!0)},904712:(d,f,b)=>{e.cd(Number(d),Number(f),Number(b))},904769:()=>typeof wasmOffsetConverter<"u",904826:d=>{e.$b("Abs",d,void 0)},904877:d=>{e.$b("Neg",d,void 0)},904928:d=>{e.$b("Floor",d,void 0)},904981:d=>{e.$b("Ceil",d,void 0)},905033:d=>{e.$b("Reciprocal",d,void 0)},905091:d=>{e.$b("Sqrt",d,void 0)},905143:d=>{e.$b("Exp",d,void 0)},905194:d=>{e.$b("Erf",d,void 0)},905245:d=>{e.$b("Sigmoid",d,void 0)},905300:(d,f,b)=>{e.$b("HardSigmoid",d,{alpha:f,beta:b})},905379:d=>{e.$b("Log",d,void 0)},905430:d=>{e.$b("Sin",d,void 0)},905481:d=>{e.$b("Cos",d,void 0)},905532:d=>{e.$b("Tan",d,void 0)},905583:d=>{e.$b("Asin",d,void 0)},905635:d=>{e.$b("Acos",d,void 0)},905687:d=>{e.$b("Atan",d,void 0)},905739:d=>{e.$b("Sinh",d,void 0)},905791:d=>{e.$b("Cosh",d,void 0)},905843:d=>{e.$b("Asinh",d,void 0)},905896:d=>{e.$b("Acosh",d,void 0)},905949:d=>{e.$b("Atanh",d,void 0)},906002:d=>{e.$b("Tanh",d,void 0)},906054:d=>{e.$b("Not",d,void 0)},906105:(d,f,b)=>{e.$b("Clip",d,{min:f,max:b})},906174:d=>{e.$b("Clip",d,void 0)},906226:(d,f)=>{e.$b("Elu",d,{alpha:f})},906284:d=>{e.$b("Gelu",d,void 0)},906336:d=>{e.$b("Relu",d,void 0)},906388:(d,f)=>{e.$b("LeakyRelu",d,{alpha:f})},906452:(d,f)=>{e.$b("ThresholdedRelu",d,{alpha:f})},906522:(d,f)=>{e.$b("Cast",d,{to:f})},906580:d=>{e.$b("Add",d,void 0)},906631:d=>{e.$b("Sub",d,void 0)},906682:d=>{e.$b("Mul",d,void 0)},906733:d=>{e.$b("Div",d,void 0)},906784:d=>{e.$b("Pow",d,void 0)},906835:d=>{e.$b("Equal",d,void 0)},906888:d=>{e.$b("Greater",d,void 0)},906943:d=>{e.$b("GreaterOrEqual",d,void 0)},907005:d=>{e.$b("Less",d,void 0)},907057:d=>{e.$b("LessOrEqual",d,void 0)},907116:(d,f,b,v,_)=>{e.$b("ReduceMean",d,{keepDims:!!f,noopWithEmptyAxes:!!b,axes:v?Array.from(($(),L).subarray(Number(v)>>>0,Number(_)>>>0)):[]})},907291:(d,f,b,v,_)=>{e.$b("ReduceMax",d,{keepDims:!!f,noopWithEmptyAxes:!!b,axes:v?Array.from(($(),L).subarray(Number(v)>>>0,Number(_)>>>0)):[]})},907465:(d,f,b,v,_)=>{e.$b("ReduceMin",d,{keepDims:!!f,noopWithEmptyAxes:!!b,axes:v?Array.from(($(),L).subarray(Number(v)>>>0,Number(_)>>>0)):[]})},907639:(d,f,b,v,_)=>{e.$b("ReduceProd",d,{keepDims:!!f,noopWithEmptyAxes:!!b,axes:v?Array.from(($(),L).subarray(Number(v)>>>0,Number(_)>>>0)):[]})},907814:(d,f,b,v,_)=>{e.$b("ReduceSum",d,{keepDims:!!f,noopWithEmptyAxes:!!b,axes:v?Array.from(($(),L).subarray(Number(v)>>>0,Number(_)>>>0)):[]})},907988:(d,f,b,v,_)=>{e.$b("ReduceL1",d,{keepDims:!!f,noopWithEmptyAxes:!!b,axes:v?Array.from(($(),L).subarray(Number(v)>>>0,Number(_)>>>0)):[]})},908161:(d,f,b,v,_)=>{e.$b("ReduceL2",d,{keepDims:!!f,noopWithEmptyAxes:!!b,axes:v?Array.from(($(),L).subarray(Number(v)>>>0,Number(_)>>>0)):[]})},908334:(d,f,b,v,_)=>{e.$b("ReduceLogSum",d,{keepDims:!!f,noopWithEmptyAxes:!!b,axes:v?Array.from(($(),L).subarray(Number(v)>>>0,Number(_)>>>0)):[]})},908511:(d,f,b,v,_)=>{e.$b("ReduceSumSquare",d,{keepDims:!!f,noopWithEmptyAxes:!!b,axes:v?Array.from(($(),L).subarray(Number(v)>>>0,Number(_)>>>0)):[]})},908691:(d,f,b,v,_)=>{e.$b("ReduceLogSumExp",d,{keepDims:!!f,noopWithEmptyAxes:!!b,axes:v?Array.from(($(),L).subarray(Number(v)>>>0,Number(_)>>>0)):[]})},908871:d=>{e.$b("Where",d,void 0)},908924:(d,f,b)=>{e.$b("Transpose",d,{perm:f?Array.from(($(),L).subarray(Number(f)>>>0,Number(b)>>>0)):[]})},909048:(d,f,b,v)=>{e.$b("DepthToSpace",d,{blocksize:f,mode:Ye(b),format:v?"NHWC":"NCHW"})},909181:(d,f,b,v)=>{e.$b("DepthToSpace",d,{blocksize:f,mode:Ye(b),format:v?"NHWC":"NCHW"})},909314:(d,f,b,v,_,O,k,B,q,X,be,$e,Ve,Ge,nn)=>{e.$b("ConvTranspose",d,{format:q?"NHWC":"NCHW",autoPad:f,dilations:[b],group:v,kernelShape:[_],pads:[O,k],strides:[B],wIsConst:()=>!!($(),ee)[X>>>0],outputPadding:be?Array.from(($(),L).subarray(Number(be)>>>0,Number($e)>>>0)):[],outputShape:Ve?Array.from(($(),L).subarray(Number(Ve)>>>0,Number(Ge)>>>0)):[],activation:Ye(nn)})},909747:(d,f,b,v,_,O,k,B,q,X,be,$e,Ve,Ge)=>{e.$b("ConvTranspose",d,{format:B?"NHWC":"NCHW",autoPad:f,dilations:Array.from(($(),L).subarray(Number(b)>>>0,2+(Number(b)>>>0)>>>0)),group:v,kernelShape:Array.from(($(),L).subarray(Number(_)>>>0,2+(Number(_)>>>0)>>>0)),pads:Array.from(($(),L).subarray(Number(O)>>>0,4+(Number(O)>>>0)>>>0)),strides:Array.from(($(),L).subarray(Number(k)>>>0,2+(Number(k)>>>0)>>>0)),wIsConst:()=>!!($(),ee)[q>>>0],outputPadding:X?Array.from(($(),L).subarray(Number(X)>>>0,Number(be)>>>0)):[],outputShape:$e?Array.from(($(),L).subarray(Number($e)>>>0,Number(Ve)>>>0)):[],activation:Ye(Ge)})},910408:(d,f,b,v,_,O,k,B,q,X,be,$e,Ve,Ge,nn)=>{e.$b("ConvTranspose",d,{format:q?"NHWC":"NCHW",autoPad:f,dilations:[b],group:v,kernelShape:[_],pads:[O,k],strides:[B],wIsConst:()=>!!($(),ee)[X>>>0],outputPadding:be?Array.from(($(),L).subarray(Number(be)>>>0,Number($e)>>>0)):[],outputShape:Ve?Array.from(($(),L).subarray(Number(Ve)>>>0,Number(Ge)>>>0)):[],activation:Ye(nn)})},910841:(d,f,b,v,_,O,k,B,q,X,be,$e,Ve,Ge)=>{e.$b("ConvTranspose",d,{format:B?"NHWC":"NCHW",autoPad:f,dilations:Array.from(($(),L).subarray(Number(b)>>>0,2+(Number(b)>>>0)>>>0)),group:v,kernelShape:Array.from(($(),L).subarray(Number(_)>>>0,2+(Number(_)>>>0)>>>0)),pads:Array.from(($(),L).subarray(Number(O)>>>0,4+(Number(O)>>>0)>>>0)),strides:Array.from(($(),L).subarray(Number(k)>>>0,2+(Number(k)>>>0)>>>0)),wIsConst:()=>!!($(),ee)[q>>>0],outputPadding:X?Array.from(($(),L).subarray(Number(X)>>>0,Number(be)>>>0)):[],outputShape:$e?Array.from(($(),L).subarray(Number($e)>>>0,Number(Ve)>>>0)):[],activation:Ye(Ge)})},911502:(d,f)=>{e.$b("GlobalAveragePool",d,{format:f?"NHWC":"NCHW"})},911593:(d,f,b,v,_,O,k,B,q,X,be,$e,Ve,Ge)=>{e.$b("AveragePool",d,{format:Ge?"NHWC":"NCHW",auto_pad:f,ceil_mode:b,count_include_pad:v,storage_order:_,dilations:O?Array.from(($(),L).subarray(Number(O)>>>0,Number(k)>>>0)):[],kernel_shape:B?Array.from(($(),L).subarray(Number(B)>>>0,Number(q)>>>0)):[],pads:X?Array.from(($(),L).subarray(Number(X)>>>0,Number(be)>>>0)):[],strides:$e?Array.from(($(),L).subarray(Number($e)>>>0,Number(Ve)>>>0)):[]})},912072:(d,f)=>{e.$b("GlobalAveragePool",d,{format:f?"NHWC":"NCHW"})},912163:(d,f,b,v,_,O,k,B,q,X,be,$e,Ve,Ge)=>{e.$b("AveragePool",d,{format:Ge?"NHWC":"NCHW",auto_pad:f,ceil_mode:b,count_include_pad:v,storage_order:_,dilations:O?Array.from(($(),L).subarray(Number(O)>>>0,Number(k)>>>0)):[],kernel_shape:B?Array.from(($(),L).subarray(Number(B)>>>0,Number(q)>>>0)):[],pads:X?Array.from(($(),L).subarray(Number(X)>>>0,Number(be)>>>0)):[],strides:$e?Array.from(($(),L).subarray(Number($e)>>>0,Number(Ve)>>>0)):[]})},912642:(d,f)=>{e.$b("GlobalMaxPool",d,{format:f?"NHWC":"NCHW"})},912729:(d,f,b,v,_,O,k,B,q,X,be,$e,Ve,Ge)=>{e.$b("MaxPool",d,{format:Ge?"NHWC":"NCHW",auto_pad:f,ceil_mode:b,count_include_pad:v,storage_order:_,dilations:O?Array.from(($(),L).subarray(Number(O)>>>0,Number(k)>>>0)):[],kernel_shape:B?Array.from(($(),L).subarray(Number(B)>>>0,Number(q)>>>0)):[],pads:X?Array.from(($(),L).subarray(Number(X)>>>0,Number(be)>>>0)):[],strides:$e?Array.from(($(),L).subarray(Number($e)>>>0,Number(Ve)>>>0)):[]})},913204:(d,f)=>{e.$b("GlobalMaxPool",d,{format:f?"NHWC":"NCHW"})},913291:(d,f,b,v,_,O,k,B,q,X,be,$e,Ve,Ge)=>{e.$b("MaxPool",d,{format:Ge?"NHWC":"NCHW",auto_pad:f,ceil_mode:b,count_include_pad:v,storage_order:_,dilations:O?Array.from(($(),L).subarray(Number(O)>>>0,Number(k)>>>0)):[],kernel_shape:B?Array.from(($(),L).subarray(Number(B)>>>0,Number(q)>>>0)):[],pads:X?Array.from(($(),L).subarray(Number(X)>>>0,Number(be)>>>0)):[],strides:$e?Array.from(($(),L).subarray(Number($e)>>>0,Number(Ve)>>>0)):[]})},913766:(d,f,b,v,_)=>{e.$b("Gemm",d,{alpha:f,beta:b,transA:v,transB:_})},913870:d=>{e.$b("MatMul",d,void 0)},913924:(d,f,b,v)=>{e.$b("ArgMax",d,{keepDims:!!f,selectLastIndex:!!b,axis:v})},914032:(d,f,b,v)=>{e.$b("ArgMin",d,{keepDims:!!f,selectLastIndex:!!b,axis:v})},914140:(d,f)=>{e.$b("Softmax",d,{axis:f})},914203:(d,f)=>{e.$b("Concat",d,{axis:f})},914263:(d,f,b,v,_)=>{e.$b("Split",d,{axis:f,numOutputs:b,splitSizes:v?Array.from(($(),L).subarray(Number(v)>>>0,Number(_)>>>0)):[]})},914419:d=>{e.$b("Expand",d,void 0)},914473:(d,f)=>{e.$b("Gather",d,{axis:Number(f)})},914544:(d,f)=>{e.$b("GatherElements",d,{axis:Number(f)})},914623:(d,f)=>{e.$b("GatherND",d,{batch_dims:Number(f)})},914702:(d,f,b,v,_,O,k,B,q,X,be)=>{e.$b("Resize",d,{antialias:f,axes:b?Array.from(($(),L).subarray(Number(b)>>>0,Number(v)>>>0)):[],coordinateTransformMode:Ye(_),cubicCoeffA:O,excludeOutside:k,extrapolationValue:B,keepAspectRatioPolicy:Ye(q),mode:Ye(X),nearestMode:Ye(be)})},915064:(d,f,b,v,_,O,k)=>{e.$b("Slice",d,{starts:f?Array.from(($(),L).subarray(Number(f)>>>0,Number(b)>>>0)):[],ends:v?Array.from(($(),L).subarray(Number(v)>>>0,Number(_)>>>0)):[],axes:O?Array.from(($(),L).subarray(Number(O)>>>0,Number(k)>>>0)):[]})},915328:d=>{e.$b("Tile",d,void 0)},915380:(d,f,b)=>{e.$b("InstanceNormalization",d,{epsilon:f,format:b?"NHWC":"NCHW"})},915494:(d,f,b)=>{e.$b("InstanceNormalization",d,{epsilon:f,format:b?"NHWC":"NCHW"})},915608:d=>{e.$b("Range",d,void 0)},915661:(d,f)=>{e.$b("Einsum",d,{equation:Ye(f)})},915742:(d,f,b,v,_)=>{e.$b("Pad",d,{mode:f,value:b,pads:v?Array.from(($(),L).subarray(Number(v)>>>0,Number(_)>>>0)):[]})},915885:(d,f,b,v,_,O)=>{e.$b("BatchNormalization",d,{epsilon:f,momentum:b,spatial:!!_,trainingMode:!!v,format:O?"NHWC":"NCHW"})},916054:(d,f,b,v,_,O)=>{e.$b("BatchNormalization",d,{epsilon:f,momentum:b,spatial:!!_,trainingMode:!!v,format:O?"NHWC":"NCHW"})},916223:(d,f,b)=>{e.$b("CumSum",d,{exclusive:Number(f),reverse:Number(b)})},916320:(d,f,b)=>{e.$b("DequantizeLinear",d,{axis:f,blockSize:b})},916410:(d,f,b,v,_)=>{e.$b("GridSample",d,{align_corners:f,mode:Ye(b),padding_mode:Ye(v),format:_?"NHWC":"NCHW"})},916580:(d,f,b,v,_)=>{e.$b("GridSample",d,{align_corners:f,mode:Ye(b),padding_mode:Ye(v),format:_?"NHWC":"NCHW"})},916750:(d,f)=>{e.$b("ScatterND",d,{reduction:Ye(f)})},916835:(d,f,b,v,_,O,k,B,q)=>{e.$b("Attention",d,{numHeads:f,isUnidirectional:b,maskFilterValue:v,scale:_,doRotary:O,qkvHiddenSizes:k?Array.from(($(),L).subarray(Number(B)>>>0,Number(B)+k>>>0)):[],pastPresentShareBuffer:!!q})},917107:d=>{e.$b("BiasAdd",d,void 0)},917162:d=>{e.$b("BiasSplitGelu",d,void 0)},917223:d=>{e.$b("FastGelu",d,void 0)},917279:(d,f,b,v,_,O,k,B,q,X,be,$e,Ve,Ge,nn,$s)=>{e.$b("Conv",d,{format:$e?"NHWC":"NCHW",auto_pad:f,dilations:b?Array.from(($(),L).subarray(Number(b)>>>0,Number(v)>>>0)):[],group:_,kernel_shape:O?Array.from(($(),L).subarray(Number(O)>>>0,Number(k)>>>0)):[],pads:B?Array.from(($(),L).subarray(Number(B)>>>0,Number(q)>>>0)):[],strides:X?Array.from(($(),L).subarray(Number(X)>>>0,Number(be)>>>0)):[],w_is_const:()=>!!($(),ee)[Number(Ve)>>>0],activation:Ye(Ge),activation_params:nn?Array.from(($(),te).subarray(Number(nn)>>>0,Number($s)>>>0)):[]})},917863:d=>{e.$b("Gelu",d,void 0)},917915:(d,f,b,v,_,O,k,B,q)=>{e.$b("GroupQueryAttention",d,{numHeads:f,kvNumHeads:b,scale:v,softcap:_,doRotary:O,rotaryInterleaved:k,smoothSoftmax:B,localWindowSize:q})},918132:(d,f,b,v)=>{e.$b("LayerNormalization",d,{axis:f,epsilon:b,simplified:!!v})},918243:(d,f,b,v)=>{e.$b("LayerNormalization",d,{axis:f,epsilon:b,simplified:!!v})},918354:(d,f,b,v,_,O)=>{e.$b("MatMulNBits",d,{k:f,n:b,accuracyLevel:v,bits:_,blockSize:O})},918481:(d,f,b,v,_,O)=>{e.$b("MultiHeadAttention",d,{numHeads:f,isUnidirectional:b,maskFilterValue:v,scale:_,doRotary:O})},918640:(d,f)=>{e.$b("QuickGelu",d,{alpha:f})},918704:(d,f,b,v,_)=>{e.$b("RotaryEmbedding",d,{interleaved:!!f,numHeads:b,rotaryEmbeddingDim:v,scale:_})},918843:(d,f,b)=>{e.$b("SkipLayerNormalization",d,{epsilon:f,simplified:!!b})},918945:(d,f,b)=>{e.$b("SkipLayerNormalization",d,{epsilon:f,simplified:!!b})},919047:(d,f,b,v)=>{e.$b("GatherBlockQuantized",d,{gatherAxis:f,quantizeAxis:b,blockSize:v})},919168:d=>{e.Ed(d)},919202:(d,f)=>e.Gd(Number(d),Number(f),e.Xc.Jd,e.Xc.errors)};function p2(d,f,b){return Sd(async()=>{await e.Cd(Number(d),Number(f),Number(b))})}function f2(){return typeof wasmOffsetConverter<"u"}var Gd,Ud,ws,er,bo,xs,Wd,Hd,qd,Ts,jd,Kd,Ie,yo,Xd,ve,Is,we,Zd,Jd,Qd,Yd,ep,Ss,tp,rp,np,op,ip,ap,sp,up,lp,cp,dp,pp,fp,hp,mp,gp,bp,yp,_p,vp,wp,xp,Tp,Ip,Sp,$p,Ap,Op,Pp,Ep,Cp,Dp,kp,Np,Lp,Rp,zp,Mp,Bp,rn=await async function(){function d(v,_){var O=rn=v.exports;v={};for(let[k,B]of Object.entries(O))typeof B=="function"?(O=ST(B),v[k]=O):v[k]=B;return rn=v,rn=function(){var k=rn,B=X=>be=>X(be)>>>0,q=X=>()=>X()>>>0;return(k=Object.assign({},k)).tb=B(k.tb),k.Xb=q(k.Xb),k.Zb=B(k.Zb),k.lc=B(k.lc),k.mc=q(k.mc),k.qc=B(k.qc),k}(),Kc.push(rn._b),g=_,Gd=(_=rn).tb,Ud=_.ub,e._OrtInit=_.vb,e._OrtGetLastError=_.wb,e._OrtCreateSessionOptions=_.xb,e._OrtAppendExecutionProvider=_.yb,e._OrtAddFreeDimensionOverride=_.zb,e._OrtAddSessionConfigEntry=_.Ab,e._OrtReleaseSessionOptions=_.Bb,e._OrtCreateSession=_.Cb,e._OrtReleaseSession=_.Db,e._OrtGetInputOutputCount=_.Eb,e._OrtGetInputOutputMetadata=_.Fb,e._OrtFree=_.Gb,e._OrtCreateTensor=_.Hb,e._OrtGetTensorData=_.Ib,e._OrtReleaseTensor=_.Jb,e._OrtCreateRunOptions=_.Kb,e._OrtAddRunConfigEntry=_.Lb,e._OrtReleaseRunOptions=_.Mb,e._OrtCreateBinding=_.Nb,e._OrtBindInput=_.Ob,e._OrtBindOutput=_.Pb,e._OrtClearBoundOutputs=_.Qb,e._OrtReleaseBinding=_.Rb,e._OrtRunWithBinding=_.Sb,e._OrtRun=_.Tb,e._OrtEndProfiling=_.Ub,e._JsepOutput=_.Vb,e._JsepGetNodeName=_.Wb,ws=_.Xb,e._free=er=_.Yb,e._malloc=bo=_.Zb,xs=_.ac,Wd=_.bc,Hd=_.cc,qd=_.dc,Ts=_.ec,jd=_.fc,Kd=_.gc,Ie=_.hc,yo=_.ic,Xd=_.jc,ve=_.kc,Is=_.lc,we=_.mc,Zd=_.nc,Jd=_.oc,Qd=_.pc,Yd=_.qc,ep=_.rc,Ss=_.sc,tp=_.tc,rp=_.uc,np=_.vc,op=_.wc,ip=_.xc,ap=_.yc,sp=_.zc,up=_.Ac,lp=_.Bc,cp=_.Cc,dp=_.Dc,pp=_.Ec,fp=_.Fc,hp=_.Gc,mp=_.Hc,gp=_.Ic,bp=_.Jc,yp=_.Kc,_p=_.Lc,vp=_.Mc,wp=_.Oc,xp=_.Pc,Tp=_._c,Ip=_.$c,Sp=_.ed,$p=_.hd,Ap=_.id,Op=_.jd,Pp=_.kd,Ep=_.ld,Cp=_.md,Dp=_.nd,kp=_.od,Np=_.pd,Lp=_.ud,Rp=_.Qd,zp=_.Rd,Mp=_.Sd,Bp=_.Td,Qe(),rn}ut++;var f,b=Ft();return e.instantiateWasm?new Promise(v=>{e.instantiateWasm(b,(_,O)=>{v(d(_,O))})}):o?new Promise(v=>{x=_=>{var O=new WebAssembly.Instance(_,Ft());v(d(O,_))}}):(Oe??=e.locateFile?e.locateFile?e.locateFile("ort-wasm-simd-threaded.jsep.wasm",h):h+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,f=await async function(v){var _=Oe;if(!m&&typeof WebAssembly.instantiateStreaming=="function"&&!F(_))try{var O=fetch(_,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(O,v)}catch(k){R(`wasm streaming compile failed: ${k}`),R("falling back to ArrayBuffer instantiation")}return async function(k,B){try{var q=await async function(X){if(!m)try{var be=await u(X);return new Uint8Array(be)}catch{}if(X==Oe&&m)X=new Uint8Array(m);else{if(!l)throw"both async and sync fetching of the wasm failed";X=l(X)}return X}(k);return await WebAssembly.instantiate(q,B)}catch(X){R(`failed to asynchronously prepare wasm: ${X}`),Me(X)}}(_,v)}(b),d(f.instance,f.module))}();function h2(d,f,b,v){var _=we();try{return ip(d,f,b,v)}catch(O){if(ve(_),O!==O+0)throw O;Ie(1,0)}}function m2(d,f,b){var v=we();try{return op(d,f,b)}catch(_){if(ve(v),_!==_+0)throw _;Ie(1,0)}}function g2(d,f,b){var v=we();try{ep(d,f,b)}catch(_){if(ve(v),_!==_+0)throw _;Ie(1,0)}}function b2(d,f){var b=we();try{return Ss(d,f)}catch(v){if(ve(b),v!==v+0)throw v;Ie(1,0)}}function y2(d){var f=we();try{tp(d)}catch(b){if(ve(f),b!==b+0)throw b;Ie(1,0)}}function _2(d,f,b,v,_,O,k){var B=we();try{return sp(d,f,b,v,_,O,k)}catch(q){if(ve(B),q!==q+0)throw q;Ie(1,0)}}function v2(d,f){var b=we();try{lp(d,f)}catch(v){if(ve(b),v!==v+0)throw v;Ie(1,0)}}function w2(d,f,b,v){var _=we();try{up(d,f,b,v)}catch(O){if(ve(_),O!==O+0)throw O;Ie(1,0)}}function x2(d,f,b,v,_){var O=we();try{np(d,f,b,v,_)}catch(k){if(ve(O),k!==k+0)throw k;Ie(1,0)}}function T2(d,f,b,v,_,O,k){var B=we();try{dp(d,f,b,v,_,O,k)}catch(q){if(ve(B),q!==q+0)throw q;Ie(1,0)}}function I2(d,f,b,v,_,O,k){var B=we();try{pp(d,f,b,v,_,O,k)}catch(q){if(ve(B),q!==q+0)throw q;Ie(1,0)}}function S2(d,f,b,v,_,O,k,B){var q=we();try{hp(d,f,b,v,_,O,k,B)}catch(X){if(ve(q),X!==X+0)throw X;Ie(1,0)}}function $2(d,f,b,v,_,O){var k=we();try{rp(d,f,b,v,_,O)}catch(B){if(ve(k),B!==B+0)throw B;Ie(1,0)}}function A2(d,f,b,v,_){var O=we();try{return cp(d,f,b,v,_)}catch(k){if(ve(O),k!==k+0)throw k;Ie(1,0)}}function O2(d,f,b,v,_,O,k,B){var q=we();try{mp(d,f,b,v,_,O,k,B)}catch(X){if(ve(q),X!==X+0)throw X;Ie(1,0)}}function P2(d,f,b,v,_,O,k,B,q,X,be,$e){var Ve=we();try{fp(d,f,b,v,_,O,k,B,q,X,be,$e)}catch(Ge){if(ve(Ve),Ge!==Ge+0)throw Ge;Ie(1,0)}}function E2(d,f,b,v,_,O){var k=we();try{return gp(d,f,b,v,_,O)}catch(B){if(ve(k),B!==B+0)throw B;Ie(1,0)}}function C2(d,f,b){var v=we();try{return bp(d,f,b)}catch(_){if(ve(v),_!==_+0)throw _;return Ie(1,0),0n}}function D2(d,f,b,v,_,O,k,B,q){var X=we();try{ap(d,f,b,v,_,O,k,B,q)}catch(be){if(ve(X),be!==be+0)throw be;Ie(1,0)}}function k2(d){var f=we();try{return yp(d)}catch(b){if(ve(f),b!==b+0)throw b;Ie(1,0)}}function N2(d,f){var b=we();try{return Lp(d,f)}catch(v){if(ve(b),v!==v+0)throw v;return Ie(1,0),0n}}function L2(d){var f=we();try{return vp(d)}catch(b){if(ve(f),b!==b+0)throw b;return Ie(1,0),0n}}function R2(d,f,b,v,_,O){var k=we();try{return $p(d,f,b,v,_,O)}catch(B){if(ve(k),B!==B+0)throw B;Ie(1,0)}}function z2(d,f,b,v,_,O){var k=we();try{return Ap(d,f,b,v,_,O)}catch(B){if(ve(k),B!==B+0)throw B;Ie(1,0)}}function M2(d,f,b){var v=we();try{return Op(d,f,b)}catch(_){if(ve(v),_!==_+0)throw _;Ie(1,0)}}function B2(d,f,b,v,_,O,k,B){var q=we();try{return _p(d,f,b,v,_,O,k,B)}catch(X){if(ve(q),X!==X+0)throw X;Ie(1,0)}}function F2(d,f,b,v,_){var O=we();try{return Pp(d,f,b,v,_)}catch(k){if(ve(O),k!==k+0)throw k;return Ie(1,0),0n}}function V2(d,f,b,v){var _=we();try{return Ep(d,f,b,v)}catch(O){if(ve(_),O!==O+0)throw O;Ie(1,0)}}function G2(d,f,b,v){var _=we();try{return Cp(d,f,b,v)}catch(O){if(ve(_),O!==O+0)throw O;Ie(1,0)}}function U2(d,f,b,v,_,O,k,B,q,X,be,$e){var Ve=we();try{return Dp(d,f,b,v,_,O,k,B,q,X,be,$e)}catch(Ge){if(ve(Ve),Ge!==Ge+0)throw Ge;Ie(1,0)}}function W2(d,f,b,v,_,O,k,B,q,X,be){var $e=we();try{Ip(d,f,b,v,_,O,k,B,q,X,be)}catch(Ve){if(ve($e),Ve!==Ve+0)throw Ve;Ie(1,0)}}function H2(d,f,b,v,_,O,k,B,q,X,be,$e,Ve,Ge,nn,$s){var J2=we();try{Sp(d,f,b,v,_,O,k,B,q,X,be,$e,Ve,Ge,nn,$s)}catch(As){if(ve(J2),As!==As+0)throw As;Ie(1,0)}}function q2(d,f,b,v){var _=we();try{return kp(d,f,b,v)}catch(O){if(ve(_),O!==O+0)throw O;Ie(1,0)}}function j2(d,f,b,v,_){var O=we();try{return Np(d,f,b,v,_)}catch(k){if(ve(O),k!==k+0)throw k;Ie(1,0)}}function K2(d,f,b){var v=we();try{return wp(d,f,b)}catch(_){if(ve(v),_!==_+0)throw _;Ie(1,0)}}function X2(d,f,b){var v=we();try{return xp(d,f,b)}catch(_){if(ve(v),_!==_+0)throw _;Ie(1,0)}}function Z2(d,f,b,v){var _=we();try{Tp(d,f,b,v)}catch(O){if(ve(_),O!==O+0)throw O;Ie(1,0)}}return function d(){if(0<ut)dt=d;else if(o)T?.(e),ie();else{for(;0<Xo.length;)Xo.shift()(e);0<ut?dt=d:(e.calledRun=!0,M||(ie(),T?.(e)))}}(),e.PTR_SIZE=4,ce?e:new Promise((d,f)=>{T=d,w=f})}var YP,e3,e_=N(()=>{"use strict";YP=Qy,e3=globalThis.self?.name?.startsWith("em-pthread");e3&&Qy()});var n_,ic,t3,At,o_,oc,r3,n3,i_,o3,t_,a_,r_,s_,fa=N(()=>{"use strict";pa();n_=typeof location>"u"?void 0:location.origin,ic=import.meta.url>"file:"&&import.meta.url<"file;",t3=()=>{if(!!1){if(ic){let n=URL;return new URL(new n("ort.all.bundle.min.mjs",import.meta.url).href,n_).href}return import.meta.url}},At=t3(),o_=()=>{if(At&&!At.startsWith("blob:"))return At.substring(0,At.lastIndexOf("/")+1)},oc=(n,e)=>{try{let r=e??At;return(r?new URL(n,r):new URL(n)).origin===n_}catch{return!1}},r3=(n,e)=>{let r=e??At;try{return(r?new URL(n,r):new URL(n)).href}catch{return}},n3=(n,e)=>`${e??"./"}${n}`,i_=async n=>{let r=await(await fetch(n,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},o3=async n=>(await import(/*webpackIgnore:true*/n)).default,t_=(Jy(),Kn(Zy)).default,a_=async()=>{if(!At)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(oc(At))return[void 0,t_()];let n=await i_(At);return[n,t_(n)]},r_=(e_(),Kn(Yy)).default,s_=async(n,e,r,t)=>{let o=r_&&!(n||e);if(o)if(At)o=oc(At);else if(t&&!r)o=!0;else throw new Error("cannot determine the script source URL.");if(o)return[void 0,r_];{let i="ort-wasm-simd-threaded.jsep.mjs",a=n??r3(i,e),s=!!1&&r&&a&&!oc(a,e),u=s?await i_(a):a??n3(i,e);return[s?u:void 0,await o3(u)]}}});var ac,sc,xa,u_,i3,a3,s3,ha,ze,gn=N(()=>{"use strict";fa();sc=!1,xa=!1,u_=!1,i3=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},a3=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},s3=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},ha=async n=>{if(sc)return Promise.resolve();if(xa)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(u_)throw new Error("previous call to 'initializeWebAssembly()' failed.");xa=!0;let e=n.initTimeout,r=n.numThreads;if(n.simd!==!1){if(n.simd==="relaxed"){if(!s3())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!a3())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let t=i3();r>1&&!t&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),n.numThreads=r=1);let o=n.wasmPaths,i=typeof o=="string"?o:void 0,a=o?.mjs,s=a?.href??a,u=o?.wasm,l=u?.href??u,c=n.wasmBinary,[p,h]=await s_(s,i,r>1,!!c||!!l),m=!1,g=[];if(e>0&&g.push(new Promise(y=>{setTimeout(()=>{m=!0,y()},e)})),g.push(new Promise((y,T)=>{let w={numThreads:r};if(c)w.wasmBinary=c;else if(l||i)w.locateFile=x=>l??i+x;else if(s&&s.indexOf("blob:")!==0)w.locateFile=x=>new URL(x,s).href;else if(p){let x=o_();x&&(w.locateFile=I=>x+I)}h(w).then(x=>{xa=!1,sc=!0,ac=x,y(),p&&URL.revokeObjectURL(p)},x=>{xa=!1,u_=!0,T(x)})})),await Promise.race(g),m)throw new Error(`WebAssembly backend initializing failed due to timeout: ${e}ms`)},ze=()=>{if(sc&&ac)return ac;throw new Error("WebAssembly is not initialized yet.")}});var Ot,Fo,De,Ta=N(()=>{"use strict";gn();Ot=(n,e)=>{let r=ze(),t=r.lengthBytesUTF8(n)+1,o=r._malloc(t);return r.stringToUTF8(n,o,t),e.push(o),o},Fo=(n,e,r,t)=>{if(typeof n=="object"&&n!==null){if(r.has(n))throw new Error("Circular reference in options");r.add(n)}Object.entries(n).forEach(([o,i])=>{let a=e?e+o:o;if(typeof i=="object")Fo(i,a+".",r,t);else if(typeof i=="string"||typeof i=="number")t(a,i.toString());else if(typeof i=="boolean")t(a,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},De=n=>{let e=ze(),r=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetLastError(o,o+t);let i=Number(e.getValue(o,t===4?"i32":"i64")),a=e.getValue(o+t,"*"),s=a?e.UTF8ToString(a):"";throw new Error(`${n} ERROR_CODE: ${i}, ERROR_MESSAGE: ${s}`)}finally{e.stackRestore(r)}}});var l_,c_=N(()=>{"use strict";gn();Ta();l_=n=>{let e=ze(),r=0,t=[],o=n||{};try{if(n?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof n.logSeverityLevel!="number"||!Number.isInteger(n.logSeverityLevel)||n.logSeverityLevel<0||n.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${n.logSeverityLevel}`);if(n?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof n.logVerbosityLevel!="number"||!Number.isInteger(n.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${n.logVerbosityLevel}`);n?.terminate===void 0&&(o.terminate=!1);let i=0;return n?.tag!==void 0&&(i=Ot(n.tag,t)),r=e._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),r===0&&De("Can't create run options."),n?.extra!==void 0&&Fo(n.extra,"",new WeakSet,(a,s)=>{let u=Ot(a,t),l=Ot(s,t);e._OrtAddRunConfigEntry(r,u,l)!==0&&De(`Can't set a run config entry: ${a} - ${s}.`)}),[r,t]}catch(i){throw r!==0&&e._OrtReleaseRunOptions(r),t.forEach(a=>e._free(a)),i}}});var u3,l3,c3,Ia,d3,d_,p_=N(()=>{"use strict";gn();Ta();u3=n=>{switch(n){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${n}`)}},l3=n=>{switch(n){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${n}`)}},c3=n=>{n.extra||(n.extra={}),n.extra.session||(n.extra.session={});let e=n.extra.session;e.use_ort_model_bytes_directly||(e.use_ort_model_bytes_directly="1"),n.executionProviders&&n.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(n.enableMemPattern=!1)},Ia=(n,e,r,t)=>{let o=Ot(e,t),i=Ot(r,t);ze()._OrtAddSessionConfigEntry(n,o,i)!==0&&De(`Can't set a session config entry: ${e} - ${r}.`)},d3=async(n,e,r)=>{for(let t of e){let o=typeof t=="string"?t:t.name,i=[];switch(o){case"webnn":if(o="WEBNN",typeof t!="string"){let p=t?.deviceType;p&&Ia(n,"deviceType",p,r)}break;case"webgpu":if(o="JS",typeof t!="string"){let c=t;if(c?.preferredLayout){if(c.preferredLayout!=="NCHW"&&c.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${c.preferredLayout}`);Ia(n,"preferredLayout",c.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let a=Ot(o,r),s=i.length,u=0,l=0;if(s>0){u=ze()._malloc(s*ze().PTR_SIZE),r.push(u),l=ze()._malloc(s*ze().PTR_SIZE),r.push(l);for(let c=0;c<s;c++)ze().setValue(u+c*ze().PTR_SIZE,i[c][0],"*"),ze().setValue(l+c*ze().PTR_SIZE,i[c][1],"*")}await ze()._OrtAppendExecutionProvider(n,a,u,l,s)!==0&&De(`Can't append execution provider: ${o}.`)}},d_=async n=>{let e=ze(),r=0,t=[],o=n||{};c3(o);try{let i=u3(o.graphOptimizationLevel??"all"),a=l3(o.executionMode??"sequential"),s=typeof o.logId=="string"?Ot(o.logId,t):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log severity level is not valid: ${u}`);let l=o.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let c=typeof o.optimizedModelFilePath=="string"?Ot(o.optimizedModelFilePath,t):0;if(r=e._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,a,!!o.enableProfiling,0,s,u,l,c),r===0&&De("Can't create session options."),o.executionProviders&&await d3(r,o.executionProviders,t),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);Ia(r,"enableGraphCapture",o.enableGraphCapture.toString(),t)}if(o.freeDimensionOverrides)for(let[p,h]of Object.entries(o.freeDimensionOverrides)){if(typeof p!="string")throw new Error(`free dimension override name must be a string: ${p}`);if(typeof h!="number"||!Number.isInteger(h)||h<0)throw new Error(`free dimension override value must be a non-negative integer: ${h}`);let m=Ot(p,t);e._OrtAddFreeDimensionOverride(r,m,h)!==0&&De(`Can't set a free dimension override: ${p} - ${h}.`)}return o.extra!==void 0&&Fo(o.extra,"",new WeakSet,(p,h)=>{Ia(r,p,h,t)}),[r,t]}catch(i){throw r!==0&&e._OrtReleaseSessionOptions(r)!==0&&De("Can't release session options."),t.forEach(a=>e._free(a)),i}}});var bn,Mr,yn,so,Vo,Sa,$a,uc,ue=N(()=>{"use strict";bn=n=>{switch(n){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${n}`)}},Mr=n=>{switch(n){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${n}`)}},yn=(n,e)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][n],t=typeof e=="number"?e:e.reduce((o,i)=>o*i,1);return r>0?Math.ceil(t*r):void 0},so=n=>{switch(n){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${n}`)}},Vo=n=>{switch(n){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${n}`)}},Sa=n=>n==="float32"||n==="float16"||n==="int32"||n==="int64"||n==="uint32"||n==="uint8"||n==="bool"||n==="uint4"||n==="int4",$a=n=>n==="float32"||n==="float16"||n==="int32"||n==="int64"||n==="uint32"||n==="uint64"||n==="int8"||n==="uint8"||n==="bool"||n==="uint4"||n==="int4",uc=n=>{switch(n){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${n}`)}}});var Go,lc=N(()=>{"use strict";pa();Go=async n=>{if(typeof n=="string")if(!1)try{let{readFile:e}=Os("node:fs/promises");return new Uint8Array(await e(n))}catch(e){if(e.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=Os("node:fs"),t=r(n),o=[];for await(let i of t)o.push(i);return new Uint8Array(Buffer.concat(o))}throw e}else{let e=await fetch(n);if(!e.ok)throw new Error(`failed to load external data file: ${n}`);let r=e.headers.get("Content-Length"),t=r?parseInt(r,10):0;if(t<1073741824)return new Uint8Array(await e.arrayBuffer());{if(!e.body)throw new Error(`failed to load external data file: ${n}, no response body.`);let o=e.body.getReader(),i;try{i=new ArrayBuffer(t)}catch(s){if(s instanceof RangeError){let u=Math.ceil(t/65536);i=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw s}let a=0;for(;;){let{done:s,value:u}=await o.read();if(s)break;let l=u.byteLength;new Uint8Array(i,a,l).set(u),a+=l}return new Uint8Array(i,0,t)}}else return n instanceof Blob?new Uint8Array(await n.arrayBuffer()):n instanceof Uint8Array?n:new Uint8Array(n)}});var p3,f3,f_,h_,Aa,h3,ge,Br=N(()=>{"use strict";ue();p3=["V","I","W","E","F"],f3=(n,e)=>{console.log(`[${p3[n]},${new Date().toISOString()}]${e}`)},Aa=(n,e)=>{f_=n,h_=e},h3=(n,e)=>{let r=Vo(n),t=Vo(f_);r>=t&&f3(r,typeof e=="function"?e():e)},ge=(...n)=>{h_&&h3(...n)}});var cc,Fr,D,Vn,Oa,m_,g_,pe=N(()=>{"use strict";cc=class{static calcMatMulShape(e,r){return e[1]!==r[0]?void 0:[e[0],r[1]]}},Fr=class{static calcShape(e,r,t=!1){let o=e.length,i=r.length;if(o===0)return r;if(i===0)return e;let a=Math.max(e.length,r.length),s=new Array(a);if(t){if(o<2||i<2)return;let u=cc.calcMatMulShape([e[o-2],e[o-1]],[r[i-2],r[i-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=t?3:1;u<=a;u++){let l=o-u<0?1:e[o-u],c=i-u<0?1:r[i-u];if(l!==c&&l>1&&c>1)return;let p=Math.max(l,c);if(l&&c)s[a-u]=Math.max(l,c);else{if(p>1)return;s[a-u]=0}}return s}static isValidBroadcast(e,r){let t=e.length,o=r.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==r[o-i])return!1;return!0}},D=class n{static size(e){return n.getSizeFromDimensionRange(e,0,e.length)}static convertShape(e,r=4){let t=e.length;if(t===0)return[];let o=new Array(t),i=t-1;for(;i>=0;){if(e[i]%r===0){o[i]=e[i]/r;break}if(r%e[i]!==0)throw new Error("cannot convert shape");o[i]=1,r/=e[i],i--}for(i--;i>=0;i--)o[i]=e[i];return o}static sizeFromDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,r,e.length)}static sizeToDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,0,r)}static getSizeFromDimensionRange(e,r,t){let o=1;for(let i=r;i<t;i++){if(e[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(e[i])}return o}static computeStrides(e){let r=e.length;if(r===0)return[];if(r===1)return[1];let t=new Array(r);t[r-1]=1,t[r-2]=e[r-1];for(let o=r-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static normalizeAxis(e,r){if(e<-r&&e>=r)throw new Error("unsupported axis for this operation.");return e<0?e+r:e}static normalizeAxes(e,r){return e.map(t=>this.normalizeAxis(t,r??e.length))}static sortBasedOnPerm(e,r){return r?r.map(t=>e[t]):e.slice().reverse()}static padShape(e,r){let t=e.length;return e.map((o,i)=>o+r[i]+r[i+t])}static areEqual(e,r){return e.length!==r.length?!1:e.every((t,o)=>t===r[o])}},Vn=class n{static adjustPoolAttributes(e,r,t,o,i,a){if(!e&&t.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let s=0;s<r.length-2;s++)s>=t.length?t.push(r[s+2]):t[s]=r[s+2];for(let s=0;s<t.length;s++)if(s<o.length){if(o[s]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let s=0;s<t.length;s++)if(s<i.length){if(i[s]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let s=0;s<t.length*2;s++)if(s<a.length){if(a[s]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let s=0;s<t.length;s++){if(t[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[s]>=t[s]||a[s+t.length]>=t[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,r,t,o,i,a,s){if(s){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<e.length-2;u++)n.adjustPadAndReturnShape(e[u+(a?1:2)],r[u],t[u],o[u],i,u,u+e.length-2,s)}}static computePoolOutputShape(e,r,t,o,i,a,s){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return n.computeShapeHelper(e,r,u,t,o,i,a,s),u}static computeConvOutputShape(e,r,t,o,i,a,s){if(e.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],r[0]];return n.computeShapeHelper(!1,e,u,t,o,i,a,s),u}static computeShapeHelper(e,r,t,o,i,a,s,u){if(e)for(let l=0;l<r.length-2;l++)t.push(1);else for(let l=0;l<r.length-2;l++)t.push(n.adjustPadAndReturnShape(r[l+2],o[l],i[l],a[l],s,l,l+r.length-2,u))}static adjustPadAndReturnShape(e,r,t,o,i,a,s,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[a]=0,i[s]=0,Math.floor((e-l)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let p=((e+r-1)/r-1)*r+o-e;return i[a]=Math.floor(u==="SAME_LOWER"?(p+1)/2:p/2),i[s]=p-i[a],Math.floor((e+p-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[a]+i[s]-l)/r+1)}},Oa=class{static getShapeOfGemmResult(e,r,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let a,s,u;r?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(i&&!Fr.isValidBroadcast(i,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},m_=-34028234663852886e22,g_=34028234663852886e22});var Pa,dc=N(()=>{"use strict";ue();Pa=(n,e)=>new(so(e))(n)});var y_,fc,__,m3,b_,g3,v_,Ea,Ca,pc,w_,x_=N(()=>{"use strict";ue();Br();y_=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),fc=(n,e)=>{if(e==="int32")return n;let r=y_.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);let t=r/8;if(n.byteLength%t!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${t}.`);let o=n.byteLength/t,i=new(so(e))(n.buffer,n.byteOffset,o);switch(e){case"int64":case"uint64":{let a=new Int32Array(o);for(let s=0;s<o;s++){let u=i[s];if(u>2147483647n||u<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");a[s]=Number(u)}return new Uint8Array(a.buffer)}case"int8":case"uint8":case"uint32":{if(e==="uint32"&&i.some(s=>s>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let a=Int32Array.from(i,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from ${e} to 'int32'`)}},__=(n,e)=>{if(e==="int32")return n;if(n.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=n.byteLength/4,t=new Int32Array(n.buffer,n.byteOffset,r);switch(e){case"int64":{let o=BigInt64Array.from(t,BigInt);return new Uint8Array(o.buffer)}case"uint64":{if(t.some(i=>i<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let o=BigUint64Array.from(t,BigInt);return new Uint8Array(o.buffer)}case"int8":{if(t.some(i=>i<-128||i>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let o=Int8Array.from(t,Number);return new Uint8Array(o.buffer)}case"uint8":{if(t.some(o=>o<0||o>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(t,Number)}case"uint32":{if(t.some(i=>i<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let o=Uint32Array.from(t,Number);return new Uint8Array(o.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${e}`)}},m3=1,b_=()=>m3++,g3=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),v_=(n,e)=>{let r=y_.get(n);if(!r)throw new Error(`WebNN backend does not support data type: ${n}`);return e.length>0?Math.ceil(e.reduce((t,o)=>t*o)*r/8):0},Ea=class{constructor(e){this.isDataConverted=!1;let{sessionId:r,context:t,tensor:o,dataType:i,shape:a,fallbackDataType:s}=e;this.sessionId=r,this.mlContext=t,this.mlTensor=o,this.dataType=i,this.tensorShape=a,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return v_(this.dataType,this.tensorShape)}destroy(){ge("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let r=await this.mlContext.readTensor(this.mlTensor),t=__(new Uint8Array(r),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(t);return}else return t.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,r,t){return this.mlContext===e&&this.dataType===r&&this.tensorShape.length===t.length&&this.tensorShape.every((o,i)=>o===t[i])}setIsDataConverted(e){this.isDataConverted=e}},Ca=class{constructor(e,r){this.tensorManager=e;this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,r,t,o){let i=this.tensorManager.getMLContext(e),a=this.tensorManager.getMLOpSupportLimits(e),s;if(!a?.input.dataTypes.includes(r)){if(s=g3.get(r),!s||a?.input.dataTypes.includes(s))throw new Error(`WebNN backend does not support data type: ${r}`);ge("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${r} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(i,r,t))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==v_(r,t))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,r,t,u,!0,!0,s),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let r=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")r=fc(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(r);return}else ge("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(r):this.activeUpload=new Uint8Array(r)}async download(e){if(this.activeUpload){let r=this.wrapper?.isDataConverted?__(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(r):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(r);return}else return r.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},pc=class{constructor(e){this.backend=e;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}getMLContext(e){let r=this.backend.getMLContext(e);if(!r)throw new Error("MLContext not found for session.");return r}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=b_();return this.tensorTrackersById.set(e,new Ca(this)),e}releaseTensorId(e){let r=this.tensorTrackersById.get(e);r&&(this.tensorTrackersById.delete(e),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(e,r,t,o,i){ge("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${r}, dataType: ${t}, shape: ${o}, copyOld: ${i}}`);let a=this.tensorTrackersById.get(r);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,t,o,i)}upload(e,r){let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");t.upload(r)}async download(e,r){ge("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${r?.byteLength}}`);let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");return t.download(r)}releaseTensorsForSession(e){for(let r of this.freeTensors)r.sessionId===e&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==e)}registerTensor(e,r,t,o){let i=this.getMLContext(e),a=b_(),s=new Ea({sessionId:e,context:i,tensor:r,dataType:t,shape:o});return this.tensorTrackersById.set(a,new Ca(this,s)),this.externalTensors.add(s),a}async getCachedTensor(e,r,t,o,i,a,s){let u=this.getMLContext(e);for(let[c,p]of this.freeTensors.entries())if(p.canReuseTensor(u,r,t)){ge("verbose",()=>`[WebNN] Reusing tensor {dataType: ${r}, ${s?`fallbackDataType: ${s},`:""} shape: ${t}`);let h=this.freeTensors.splice(c,1)[0];return h.sessionId=e,h}ge("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${r}, ${s?`fallbackDataType: ${s},`:""} shape: ${t}}`);let l=await u.createTensor({dataType:s??r,shape:t,dimensions:t,usage:o,writable:i,readable:a});return new Ea({sessionId:e,context:u,tensor:l,dataType:r,shape:t,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},w_=(...n)=>new pc(...n)});var Da,b3,ka,T_=N(()=>{"use strict";ue();gn();dc();x_();Br();Da=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),b3=(n,e)=>{if(n===e)return!0;if(n===void 0||e===void 0)return!1;let r=Object.keys(n).sort(),t=Object.keys(e).sort();return r.length===t.length&&r.every((o,i)=>o===t[i]&&n[o]===e[o])},ka=class{constructor(e){this.tensorManager=w_(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];this.sessionGraphInputs=new Map;this.sessionGraphOutputs=new Map;this.temporaryGraphInputs=[];this.temporaryGraphOutputs=[];this.temporarySessionTensorIds=new Map;this.mlOpSupportLimitsBySessionId=new Map;Aa(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){ge("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){ge("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let r=this.temporarySessionTensorIds.get(e);if(r){for(let t of r)ge("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(o=>o.gpuDevice===e);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:o}),o}}else if(e===void 0){let t=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let r=this.mlContextCache.findIndex(t=>b3(t.options,e));if(r!==-1)return this.mlContextCache[r].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}registerMLContext(e,r){this.mlContextBySessionId.set(e,r);let t=this.sessionIdsByMLContext.get(r);t||(t=new Set,this.sessionIdsByMLContext.set(r,t)),t.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,r.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let r=this.mlContextBySessionId.get(e);if(!r)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let t=this.sessionIdsByMLContext.get(r);if(t.delete(e),t.size===0){this.sessionIdsByMLContext.delete(r);let o=this.mlContextCache.findIndex(i=>i.mlContext===r);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){ge("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,r,t,o,i){let a=Da.get(t);if(!a)throw new Error(`Unsupported ONNX data type: ${t}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,r,a,o,i)}async createTemporaryTensor(e,r,t){ge("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${r}, shape: ${t}}`);let o=Da.get(r);if(!o)throw new Error(`Unsupported ONNX data type: ${r}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,o,t,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,r){if(!ze().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ge("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${r.byteLength}}`),this.tensorManager.upload(e,r)}async downloadTensor(e,r){return this.tensorManager.download(e,r)}createMLTensorDownloader(e,r){return async()=>{let t=await this.tensorManager.download(e);return Pa(t,r)}}registerMLTensor(e,r,t,o){let i=Da.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.registerTensor(e,r,i,o);return ge("verbose",()=>`[WebNN] registerMLTensor {tensor: ${r}, dataType: ${i}, dimensions: ${o}} -> {tensorId: ${a}}`),a}registerMLConstant(e,r,t,o,i,a,s=!1){if(!a)throw new Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let l=a.get(u);if(!l)throw new Error(`File with name ${u} not found in preloaded files.`);if(r+t>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let c=l.slice(r,r+t).buffer,p;switch(i.dataType){case"float32":p=new Float32Array(c);break;case"float16":p=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(c):new Uint16Array(c);break;case"int32":p=new Int32Array(c);break;case"uint32":p=new Uint32Array(c);break;case"int64":if(s){let h=fc(new Uint8Array(c),"int64");p=new Int32Array(h.buffer),i.dataType="int32"}else p=new BigInt64Array(c);break;case"uint64":p=new BigUint64Array(c);break;case"int8":p=new Int8Array(c);break;case"int4":case"uint4":case"uint8":p=new Uint8Array(c);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return ge("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),o.constant(i,p)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,r){let t=this.sessionGraphInputs.get(e);return t?t.includes(r):!1}isGraphOutput(e,r){let t=this.sessionGraphOutputs.get(e);return t?t.includes(r):!1}isGraphInputOutputTypeSupported(e,r,t=!0){let o=Da.get(bn(r)),i=this.mlOpSupportLimitsBySessionId.get(e);return typeof o>"u"?!1:t?!!i?.input.dataTypes.includes(o):!!i?.output.dataTypes.includes(o)}flush(){}}});var Na=N(()=>{"use strict"});var I_,hc,mc,y3,_3,S_,bc,gc,A_,O_=N(()=>{"use strict";Br();Na();I_=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),hc=[],mc=n=>Math.ceil(Number(n)/16)*16,y3=n=>{for(let e=0;e<hc.length;e++){let r=hc[e];if(n<=r)return r}return Math.ceil(n/16)*16},_3=1,S_=()=>_3++,bc=async(n,e,r,t)=>{let o=mc(r),i=n.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=n.getCommandEncoder();n.endComputePass(),a.copyBufferToBuffer(e,0,i,0,o),n.flush(),await i.mapAsync(GPUMapMode.READ);let s=i.getMappedRange();if(t){let u=t();return u.set(new Uint8Array(s,0,r)),u}else return new Uint8Array(s.slice(0,r))}finally{i.destroy()}},gc=class{constructor(e){this.backend=e;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[r]of I_)hc.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(e,r){let t=r.buffer,o=r.byteOffset,i=r.byteLength,a=mc(i),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${i}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=u.getMappedRange();new Uint8Array(l).set(new Uint8Array(t,o,i)),u.unmap();let c=this.backend.device.createCommandEncoder();c.copyBufferToBuffer(u,0,s.gpuData.buffer,0,a),this.backend.device.queue.submit([c.finish()]),u.destroy(),ge("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,r){let t=this.storageCache.get(e);if(!t)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(t.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=mc(t.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(t.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(e,r,t){let o;if(t){if(o=t[0],e===t[1])return ge("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=S_();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:e},originalSize:r}),ge("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),ge("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let t=y3(e),o,i=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let l=(i?this.freeBuffers:this.freeUniformBuffers).get(t);l?l.length>0?o=l.pop():o=this.backend.device.createBuffer({size:t,usage:r}):o=this.backend.device.createBuffer({size:t,usage:r})}else o=this.backend.device.createBuffer({size:t,usage:r});let s={id:S_(),type:0,buffer:o};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),ge("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let r=typeof e=="bigint"?Number(e):e,t=this.storageCache.get(r);if(!t){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return ge("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${t.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(t.gpuData.buffer),t.originalSize}async download(e,r){let t=this.storageCache.get(Number(e));if(!t)throw new Error("data does not exist");await bc(this.backend,t.gpuData.buffer,t.originalSize,r)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let r=I_.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let t=this.freeBuffers.get(e.size)||[];r===void 0||t.length>=r?e.destroy():t.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let t=this.freeUniformBuffers.get(e.size)||[];r===void 0||t.length>=r?e.destroy():t.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let r of this.buffersPending)e.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let r=this.capturedPendingBuffers.get(e);r&&(r.forEach(t=>{t.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(ge("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.storageCache=new Map)}},A_=(...n)=>new gc(...n)});var yc,le,Je=N(()=>{"use strict";yc=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},le=n=>new yc(n)});var Gn,vc,Fe,at,U,Pe,wc,Un,Kt,Z,La,z,V,P_,Ra,_c,E_,he=N(()=>{"use strict";ue();pe();Gn=64,vc=(n,e)=>{if(e===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(n)){case 10:return e>1?`vec${e}<f16>`:"f16";case 1:return e>1?`vec${e}<f32>`:"f32";case 6:return e>1?`vec${e}<i32>`:"i32";case 12:return e>1?`vec${e}<u32>`:"u32";case 7:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(e!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${n}`)}},Fe=(n,e=1)=>{let r=vc(n,e);return typeof r=="string"?r:r[0]},at=(n,e=1)=>{let r=vc(n,e);return typeof r=="string"?r:r[1]},U=(...n)=>{let e=[];return n.forEach(r=>{r.length!==0&&e.push({type:12,data:r},{type:12,data:D.computeStrides(r)})}),e},Pe=n=>n%4===0?4:n%2===0?2:1,wc=(n="f32",e,r="0")=>!e||e===1?`${n}(${r})`:`vec${e}<${n}>(${r})`,Un=(n,e,r)=>n==="f32"?r:e===1?`f32(${r})`:`vec${e}<f32>(${r})`,Kt=(n,e)=>e===4?`(${n}.x + ${n}.y + ${n}.z + ${n}.w)`:e===2?`(${n}.x + ${n}.y)`:e===3?`(${n}.x + ${n}.y + ${n}.z)`:n,Z=(n,e,r,t)=>n.startsWith("uniforms.")&&r>4?typeof e=="string"?t==="f16"?`${n}[(${e}) / 8][(${e}) % 8 / 4][(${e}) % 8 % 4]`:`${n}[(${e}) / 4][(${e}) % 4]`:t==="f16"?`${n}[${Math.floor(e/8)}][${Math.floor(e%8/4)}][${e%8%4}]`:`${n}[${Math.floor(e/4)}][${e%4}]`:r>1?`${n}[${e}]`:n,La=(n,e,r,t,o)=>{let i=typeof r=="number",a=i?r:r.length,s=[...new Array(a).keys()],u=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,l=vc(e,o),c=typeof l=="string"?l:l[1],p=typeof l=="string"?l:l[0],h={indices:u,value:c,storage:p,tensor:e},m=G=>typeof G=="string"?G:`${G}u`,g={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},y=i?"uniforms.":"",T=`${y}${n}_shape`,w=`${y}${n}_strides`,x="";for(let G=0;G<a-1;G++)x+=`
    let dim${G} = current / ${Z(w,G,a)};
    let rest${G} = current % ${Z(w,G,a)};
    indices[${G}] = dim${G};
    current = rest${G};
    `;x+=`indices[${a-1}] = current;`;let I=a<2?"":`
  fn o2i_${n}(offset: u32) -> ${h.indices} {
    var indices: ${h.indices};
    var current = offset;
    ${x}
    return indices;
  }`,A=G=>(g.offsetToIndices=!0,a<2?G:`o2i_${n}(${G})`),P=[];if(a>=2)for(let G=a-1;G>=0;G--)P.push(`${Z(w,G,a)} * (indices[${G}])`);let C=a<2?"":`
  fn i2o_${n}(indices: ${h.indices}) -> u32 {
    return ${P.join("+")};
  }`,R=G=>(g.indicesToOffset=!0,a<2?G:`i2o_${n}(${G})`),M=(...G)=>a===0?"0u":`${h.indices}(${G.map(m).join(",")})`,F=(G,ie)=>a<2?`${G}`:`${Z(G,ie,a)}`,$=(G,ie,Oe)=>a<2?`${G}=${Oe};`:`${Z(G,ie,a)}=${Oe};`,J={},Y=(G,ie)=>{g.broadcastedIndicesToOffset=!0;let Oe=`${ie.name}broadcastedIndicesTo${n}Offset`;if(Oe in J)return`${Oe}(${G})`;let ut=[];for(let dt=a-1;dt>=0;dt--){let Qe=ie.indicesGet("outputIndices",dt+ie.rank-a);ut.push(`${F(w,dt)} * (${Qe} % ${F(T,dt)})`)}return J[Oe]=`fn ${Oe}(outputIndices: ${ie.type.indices}) -> u32 {
             return ${ut.length>0?ut.join("+"):"0u"};
           }`,`${Oe}(${G})`},ee=(G,ie)=>(()=>{if(h.storage===h.value)return`${n}[${G}]=${ie};`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`${n}[${G}]=vec2<u32>(u32(${ie}), select(0u, 0xFFFFFFFFu, ${ie} < 0));`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`${n}[${G}]=vec2<u32>(u32(${ie}), 0u);`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`${n}[${G}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${ie}));`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),W=G=>(()=>{if(h.storage===h.value)return`${n}[${G}]`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`i32(${n}[${G}].x)`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`u32(${n}[${G}].x)`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`vec4<bool>(bool(${n}[${G}] & 0xFFu), bool(${n}[${G}] & 0xFF00u), bool(${n}[${G}] & 0xFF0000u), bool(${n}[${G}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),Te=a<2?"":`
  fn get_${n}ByIndices(indices: ${h.indices}) -> ${c} {
    return ${W(`i2o_${n}(indices)`)};
  }`,oe=a<2?"":(()=>{let G=s.map(Oe=>`d${Oe}: u32`).join(", "),ie=s.map(Oe=>`d${Oe}`).join(", ");return`
  fn get_${n}(${G}) -> ${c} {
    return get_${n}ByIndices(${M(ie)});
  }`})(),L=(...G)=>{if(G.length!==a)throw new Error(`indices length must be ${a}`);let ie=G.map(m).join(",");return a===0?W("0u"):a===1?W(ie[0]):(g.get=!0,g.getByIndices=!0,g.indicesToOffset=!0,`get_${n}(${ie})`)},Q=G=>a<2?W(G):(g.getByIndices=!0,g.indicesToOffset=!0,`get_${n}ByIndices(${G})`),te=a<2?"":`
  fn set_${n}ByIndices(indices: ${h.indices}, value: ${c}) {
    ${ee(`i2o_${n}(indices)`,"value")}
  }`,me=a<2?"":(()=>{let G=s.map(Oe=>`d${Oe}: u32`).join(", "),ie=s.map(Oe=>`d${Oe}`).join(", ");return`
  fn set_${n}(${G}, value: ${c}) {
    set_${n}ByIndices(${M(ie)}, value);
  }`})();return{impl:()=>{let G=[],ie=!1;return g.offsetToIndices&&(G.push(I),ie=!0),g.indicesToOffset&&(G.push(C),ie=!0),g.broadcastedIndicesToOffset&&(Object.values(J).forEach(Oe=>G.push(Oe)),ie=!0),g.set&&(G.push(me),ie=!0),g.setByIndices&&(G.push(te),ie=!0),g.get&&(G.push(oe),ie=!0),g.getByIndices&&(G.push(Te),ie=!0),!i&&ie&&G.unshift(`const ${T} = ${h.indices}(${r.join(",")});`,`const ${w} = ${h.indices}(${D.computeStrides(r).join(",")});`),G.join(`
`)},type:h,offsetToIndices:A,indicesToOffset:R,broadcastedIndicesToOffset:Y,indices:M,indicesGet:F,indicesSet:$,set:(...G)=>{if(G.length!==a+1)throw new Error(`indices length must be ${a}`);let ie=G[a];if(typeof ie!="string")throw new Error("value must be string");let Oe=G.slice(0,a).map(m).join(",");return a===0?ee("0u",ie):a===1?ee(Oe[0],ie):(g.set=!0,g.setByIndices=!0,g.indicesToOffset=!0,`set_${n}(${Oe}, ${ie})`)},setByOffset:ee,setByIndices:(G,ie)=>a<2?ee(G,ie):(g.setByIndices=!0,g.indicesToOffset=!0,`set_${n}ByIndices(${G}, ${ie});`),get:L,getByOffset:W,getByIndices:Q,usage:t,name:n,strides:w,shape:T,rank:a}},z=(n,e,r,t=1)=>La(n,e,r,"input",t),V=(n,e,r,t=1)=>La(n,e,r,"output",t),P_=(n,e,r)=>La(n,e,r,"atomicOutput",1),Ra=(n,e,r,t=1)=>La(n,e,r,"internal",t),_c=class{constructor(e,r){this.normalizedDispatchGroup=e;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Gn){let r=typeof e=="number"?e:e[0],t=typeof e=="number"?1:e[1],o=typeof e=="number"?1:e[2];if(r>this.limits.maxComputeWorkgroupSizeX||t>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${t}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*t*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${t}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
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
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[e(r.type),r.length??1])}},E_=(n,e)=>new _c(n,e)});var v3,C_,w3,x3,T3,I3,st,D_,k_,Xr=N(()=>{"use strict";ue();pe();Je();he();v3=(n,e)=>{if(!n||n.length!==1)throw new Error("Transpose requires 1 input.");if(e.length!==0&&e.length!==n[0].dims.length)throw new Error(`perm size ${e.length} does not match input rank ${n[0].dims.length}`)},C_=(n,e)=>e.length!==0?e:[...new Array(n).keys()].reverse(),w3=(n,e)=>D.sortBasedOnPerm(n,C_(n.length,e)),x3=(n,e,r,t)=>{let o=`fn perm(i: ${t.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let i=0;i<e;++i)o+=`a[${n[i]}]=i[${i}];`;return o+="return a;}"},T3=(n,e)=>{let r=[],t=[];for(let o=0;o<n.length;++o)n[o]!==1&&r.push(n[o]),n[e[o]]!==1&&t.push(e[o]);return{newShape:r,newPerm:t}},I3=(n,e)=>{let r=0;for(let t=0;t<n.length;++t)if(e[n[t]]!==1){if(n[t]<r)return!1;r=n[t]}return!0},st=(n,e)=>{let r=n.dataType,t=n.dims.length,o=C_(t,e),i=w3(n.dims,o),a=n.dims,s=i,u=t<2||I3(o,n.dims),l;if(u)return l=y=>{let T=z("input",r,a,4),w=V("output",r,s,4);return`
  ${y.registerUniform("output_size","u32").declareVariables(T,w)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let y=D.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(y/64/4)},programUniforms:[{type:12,data:Math.ceil(y/4)}]}},getShaderSource:l};let{newShape:c,newPerm:p}=T3(n.dims,o),h=D.areEqual(p,[2,3,1]),m=D.areEqual(p,[3,1,2]);if(c.length===2||h||m){a=h?[c[0],c[1]*c[2]]:m?[c[0]*c[1],c[2]]:c,s=[a[1],a[0]];let y=16;return l=T=>{let w=z("a",r,a.length),x=V("output",r,s.length);return`
  ${T.registerUniform("output_size","u32").declareVariables(w,x)}
  var<workgroup> tile : array<array<${x.type.value}, ${y+1}>, ${y}>;
  ${T.mainStart([y,y,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${y} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${y}u + local_id.x;
    let input_row = workgroup_id_x * ${y}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${w.getByIndices(`${w.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${y}u + local_id.x;
    let output_row = workgroup_id_y * ${y}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${x.setByIndices(`${x.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let T=D.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(s[1]/y),y:Math.ceil(s[0]/y)},programUniforms:[{type:12,data:T},...U(a,s)]}},getShaderSource:l}}return l=y=>{let T=z("a",r,a.length),w=V("output",r,s.length);return`
  ${y.registerUniform("output_size","u32").declareVariables(T,w)}

  ${x3(o,t,T,w)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${w.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${w.setByOffset("global_idx",T.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${e}`,inputDependencies:["rank"]},getRunData:()=>{let y=D.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...U(a,s)]}},getShaderSource:l}},D_=(n,e)=>{v3(n.inputs,e.perm),n.compute(st(n.inputs[0],e.perm))},k_=n=>le({perm:n.perm})});var S3,$3,A3,O3,P3,E3,C3,D3,k3,N3,Vr,N_,L_,R_,z_,M_,B_,F_,V_,G_,U_,W_=N(()=>{"use strict";ue();pe();he();za();Xr();S3={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},$3={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},A3={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},O3={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},P3=(n,e)=>{let r=[];for(let t=e-n;t<e;++t)r.push(t);return r},E3=(n,e)=>{let r=[],t=n.length;for(let i=0;i<t;i++)e.indexOf(i)===-1&&r.push(n[i]);let o=e.map(i=>n[i]);return[r,o]},C3=(n,e)=>{let r=n.length+e.length,t=[],o=0;for(let i=0;i<r;i++)e.indexOf(i)===-1?t.push(n[o++]):t.push(1);return t},D3=(n,e)=>{for(let r=0;r<n.length;++r)if(n[n.length-r-1]!==e-1-r)return!1;return!0},k3=(n,e)=>{let r=[];if(!D3(n,e)){for(let t=0;t<e;++t)n.indexOf(t)===-1&&r.push(t);n.forEach(t=>r.push(t))}return r},N3=(n,e,r,t,o,i,a)=>{let s=r[0].dims,u=D.size(i),l=D.size(a),c=z("_A",r[0].dataType,s),p=V("output",o,i),h=64;u===1&&(h=256);let m=`
          var<workgroup> aBestValues : array<f32, ${h}>;
       `,g=y=>`
        ${y.registerUniform("reduceSize","u32").declareVariables(c,p)}
        ${m}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${y.mainStart(h)}

          let outputIndex = global_idx / ${h};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${A3[t]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${h}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${S3[t]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${h}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${$3[t]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${p.setByOffset("outputIndex",`${t==="mean"?`${p.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${p.type.storage}(${O3[t]})`}`)};
         }
        }`;return{name:n,shaderCache:{hint:`${e};${h}`,inputDependencies:["type"]},getShaderSource:g,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:u},programUniforms:[{type:12,data:l}]})}},Vr=(n,e,r,t)=>{let o=n.inputs.length===1?r:xc(n.inputs,r),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=n.inputs[0].dims.map((m,g)=>g));let a=D.normalizeAxes(i,n.inputs[0].dims.length),s=a,u=n.inputs[0],l=k3(s,n.inputs[0].dims.length);l.length>0&&(u=n.compute(st(n.inputs[0],l),{inputs:[0],outputs:[-1]})[0],s=P3(s.length,u.dims.length));let[c,p]=E3(u.dims,s),h=c;o.keepDims&&(h=C3(c,a)),n.compute(N3(e,o.cacheKey,[u],t,n.inputs[0].dataType,h,p),{inputs:[u]})},N_=(n,e)=>{Vr(n,"ReduceMeanShared",e,"mean")},L_=(n,e)=>{Vr(n,"ReduceL1Shared",e,"l1")},R_=(n,e)=>{Vr(n,"ReduceL2Shared",e,"l2")},z_=(n,e)=>{Vr(n,"ReduceLogSumExpShared",e,"logSumExp")},M_=(n,e)=>{Vr(n,"ReduceMaxShared",e,"max")},B_=(n,e)=>{Vr(n,"ReduceMinShared",e,"min")},F_=(n,e)=>{Vr(n,"ReduceProdShared",e,"prod")},V_=(n,e)=>{Vr(n,"ReduceSumShared",e,"sum")},G_=(n,e)=>{Vr(n,"ReduceSumSquareShared",e,"sumSquare")},U_=(n,e)=>{Vr(n,"ReduceLogSumShared",e,"logSum")}});var Gr,L3,Ma,xc,Ur,R3,z3,M3,B3,F3,V3,G3,U3,W3,H3,Wr,H_,q_,j_,K_,X_,Z_,J_,Q_,Y_,e0,za=N(()=>{"use strict";ue();pe();Je();he();W_();Gr=n=>{if(!n||n.length===0||n.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(n.length===2&&n[1].dims.length!==1)throw new Error("Invalid axes input dims.")},L3=n=>["","",`var value = ${n.getByIndices("input_indices")};`,""],Ma=(n,e,r,t,o,i,a=!1,s=!1)=>{let u=[],l=r[0].dims,c=l.length,p=D.normalizeAxes(o,c),h=!s&&p.length===0;l.forEach((T,w)=>{h||p.indexOf(w)>=0?a&&u.push(1):u.push(T)});let m=u.length,g=D.size(u);return{name:n,shaderCache:e,getShaderSource:T=>{let w=[],x=z("_A",r[0].dataType,c),I=V("output",i,m),A=t(x,I,p),P=A[2];for(let C=0,R=0;C<c;C++)h||p.indexOf(C)>=0?(a&&R++,P=`for(var j${C}: u32 = 0; j${C} < ${l[C]}; j${C}++) {
                  ${A[2].includes("last_index")?`let last_index = j${C};`:""}
                  ${x.indicesSet("input_indices",C,`j${C}`)}
                  ${P}
                }`):(w.push(`${x.indicesSet("input_indices",C,I.indicesGet("output_indices",R))};`),R++);return`

        ${T.registerUniform("output_size","u32").declareVariables(x,I)}

        ${T.mainStart()}
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${x.type.indices};
          let output_indices = ${I.offsetToIndices("global_idx")};

          ${w.join(`
`)}
          ${A[0]}       // init ops for reduce max/min
          ${A[1]}
          ${P}
          ${A[3]}
          ${A.length===4?I.setByOffset("global_idx","value"):A.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:i}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},...U(l,u)]})}},xc=(n,e)=>{let r=[];return n[1].dims[0]>0&&n[1].getBigInt64Array().forEach(t=>r.push(Number(t))),le({axes:r,keepDims:e.keepDims,noopWithEmptyAxes:e.noopWithEmptyAxes})},Ur=(n,e,r,t)=>{let o=n.inputs,i=o.length===1?r:xc(o,r);n.compute(Ma(e,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?L3:t,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},R3=(n,e)=>{Gr(n.inputs),Ur(n,"ReduceLogSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,"value = log(value);"])},z3=(n,e)=>{Gr(n.inputs),Ur(n,"ReduceL1",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${t.getByIndices("input_indices")});`,""])},M3=(n,e)=>{Gr(n.inputs),Ur(n,"ReduceL2",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},B3=(n,e)=>{Gr(n.inputs),Ur(n,"ReduceLogSumExp",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${t.getByIndices("input_indices")});`,"value = log(value);"])},F3=(n,e)=>{Gr(n.inputs),Ur(n,"ReduceMax",e,(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(t.indicesSet("input_indices",s,0));return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = max(value, ${t.getByIndices("input_indices")});`,""]})},V3=(n,e)=>{Gr(n.inputs),Ur(n,"ReduceMean",e,(t,o,i)=>{let a=1;for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=n.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${a});`]})},G3=(n,e)=>{Gr(n.inputs),Ur(n,"ReduceMin",e,(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = min(value, ${t.getByIndices("input_indices")});`,""]})},U3=(n,e)=>{Gr(n.inputs),Ur(n,"ReduceProd",e,(t,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${t.getByIndices("input_indices")};`,""])},W3=(n,e)=>{Gr(n.inputs),Ur(n,"ReduceSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,""])},H3=(n,e)=>{Gr(n.inputs),Ur(n,"ReduceSumSquare",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += t * t;`,""])},Wr=(n,e,r)=>{if(e.length===0)return r;let t=1,o=1;for(let i=0;i<e.length;i++)e.indexOf(i)===-1?t*=n[i]:o*=n[i];return o<32&&t>1024},H_=(n,e)=>{Wr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?V3(n,e):N_(n,e)},q_=(n,e)=>{Wr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?z3(n,e):L_(n,e)},j_=(n,e)=>{Wr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?M3(n,e):R_(n,e)},K_=(n,e)=>{Wr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?B3(n,e):z_(n,e)},X_=(n,e)=>{Wr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?F3(n,e):M_(n,e)},Z_=(n,e)=>{Wr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?G3(n,e):B_(n,e)},J_=(n,e)=>{Wr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?U3(n,e):F_(n,e)},Q_=(n,e)=>{Wr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?W3(n,e):V_(n,e)},Y_=(n,e)=>{Wr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?H3(n,e):G_(n,e)},e0=(n,e)=>{Wr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?R3(n,e):U_(n,e)}});var t0,r0,n0,Tc,o0=N(()=>{"use strict";ue();Je();za();t0=n=>{if(!n||n.length===0||n.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(n[0].dataType!==1)throw new Error("Invalid input type.")},r0=(n,e)=>{t0(n.inputs);let r=(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?"<=":"<"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};n.compute(Ma("ArgMin",{hint:e.cacheKey,inputDependencies:["rank"]},[n.inputs[0]],r,[e.axis],7,e.keepDims),{inputs:[0]})},n0=(n,e)=>{t0(n.inputs);let r=(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?">=":">"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};n.compute(Ma("argMax",{hint:e.cacheKey,inputDependencies:["rank"]},[n.inputs[0]],r,[e.axis],7,e.keepDims),{inputs:[0]})},Tc=n=>le(n)});var q3,Ic,j3,K3,X3,uo,Z3,i0,Ba=N(()=>{"use strict";ue();pe();Na();he();q3=(n,e)=>{let r=n[0],t=n[1],o=n[2],i=n[3],a=n[4],s=n[5];if(a&&s)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=r.dims[0],l=r.dims[1],c=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(t.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(t.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==t.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let p=o.dims[0]/3,h=p,m=h;if(e.qkvHiddenSizes.length>0){if(e.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let I of e.qkvHiddenSizes)if(I%e.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");p=e.qkvHiddenSizes[0],h=e.qkvHiddenSizes[1],m=e.qkvHiddenSizes[2]}let g=l;if(p!==h)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==p+h+m)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let y=0;if(a){if(h!==m)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==e.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==h/e.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');e.pastPresentShareBuffer||(y=a.dims[3])}let T=g+y,w=-1,x=0;if(i)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(s){if(s.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(s.dims[0]!==u||s.dims[1]!==e.numHeads||s.dims[2]!==l||s.dims[3]!==T)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:y,kvSequenceLength:g,totalSequenceLength:T,maxSequenceLength:w,inputHiddenSize:c,hiddenSize:p,vHiddenSize:m,headSize:Math.floor(p/e.numHeads),vHeadSize:Math.floor(m/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:x,scale:e.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Ic=(n,e,r)=>e&&n?`
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
    `,j3=(n,e,r,t,o,i,a,s)=>{let u=Pe(a?1:i),l=64,c=i/u;c<l&&(l=32);let p=Math.ceil(i/u/l),h=[{type:12,data:e},{type:12,data:r},{type:12,data:t},{type:12,data:o},{type:12,data:c},{type:12,data:p}],m=Fe(n.dataType,u),g=at(1,u),y=["type"];a&&y.push("type"),s&&y.push("type");let T=w=>{let x=V("x",n.dataType,n.dims,u),I=[x],A=a?z("seq_lens",a.dataType,a.dims):void 0;A&&I.push(A);let P=s?z("total_sequence_length_input",s.dataType,s.dims):void 0;P&&I.push(P);let C=at(n.dataType),R=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${w.registerUniforms(R).declareVariables(...I)}
  ${w.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Ic(A,P,!1)}
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
        x[offset + i] = ${x.type.value}(${C}(1.0) / ${C}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${g}(x[offset + i]);
        x[offset + i] = ${x.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${x.type.value}(${C}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${l};${m};${u}`,inputDependencies:y},getShaderSource:T,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:o,z:e*r},programUniforms:h})}},K3=(n,e,r,t,o,i,a,s,u)=>{let l=a+i.kvSequenceLength,c=[i.batchSize,i.numHeads,i.sequenceLength,l],p=n>1&&t,h=i.kvNumHeads?i.kvNumHeads:i.numHeads,m=p?[i.batchSize,h,l,i.headSize]:void 0,g=i.nReps?i.nReps:1,y=i.scale===0?1/Math.sqrt(i.headSize):i.scale,T=Pe(i.headSize),w=i.headSize/T,x=12,I={x:Math.ceil(l/x),y:Math.ceil(i.sequenceLength/x),z:i.batchSize*i.numHeads},A=[{type:12,data:i.sequenceLength},{type:12,data:w},{type:12,data:l},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:y},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:g}],P=p&&t&&D.size(t.dims)>0,C=["type","type"];P&&C.push("type"),o&&C.push("type"),s&&C.push("type"),u&&C.push("type");let R=[{dims:c,dataType:e.dataType,gpuDataType:0}];p&&R.push({dims:m,dataType:e.dataType,gpuDataType:0});let M=F=>{let $=z("q",e.dataType,e.dims,T),J=z("key",r.dataType,r.dims,T),Y=[$,J];if(P){let te=z("past_key",t.dataType,t.dims,T);Y.push(te)}o&&Y.push(z("attention_bias",o.dataType,o.dims));let ee=s?z("seq_lens",s.dataType,s.dims):void 0;ee&&Y.push(ee);let W=u?z("total_sequence_length_input",u.dataType,u.dims):void 0;W&&Y.push(W);let Te=V("output",e.dataType,c),oe=[Te];p&&oe.push(V("present_key",e.dataType,m,T));let L=at(1,T),Q=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${x}u;

  var<workgroup> tileQ: array<${$.type.storage}, ${x*x}>;
  var<workgroup> tileK: array<${$.type.storage}, ${x*x}>;
  ${F.registerUniforms(Q).declareVariables(...Y,...oe)}
  ${F.mainStart([x,x,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${g===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${g===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Ic(ee,W,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${P&&p?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${p?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${L}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${P&&p?`
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
          value += ${L}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(T){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${T}`)}})()};
        output[outputIdx] = ${Te.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${T};${o!==void 0};${t!==void 0};${n}`,inputDependencies:C},getRunData:()=>({outputs:R,dispatchGroup:I,programUniforms:A}),getShaderSource:M}},X3=(n,e,r,t,o,i,a=void 0,s=void 0)=>{let u=i+o.kvSequenceLength,l=o.nReps?o.nReps:1,c=o.vHiddenSize*l,p=n>1&&t,h=o.kvNumHeads?o.kvNumHeads:o.numHeads,m=p?[o.batchSize,h,u,o.headSize]:void 0,g=[o.batchSize,o.sequenceLength,c],y=12,T={x:Math.ceil(o.vHeadSize/y),y:Math.ceil(o.sequenceLength/y),z:o.batchSize*o.numHeads},w=[{type:12,data:o.sequenceLength},{type:12,data:u},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:c},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:l}],x=p&&t&&D.size(t.dims)>0,I=["type","type"];x&&I.push("type"),a&&I.push("type"),s&&I.push("type");let A=[{dims:g,dataType:e.dataType,gpuDataType:0}];p&&A.push({dims:m,dataType:e.dataType,gpuDataType:0});let P=C=>{let R=z("probs",e.dataType,e.dims),M=z("v",r.dataType,r.dims),F=[R,M];x&&F.push(z("past_value",t.dataType,t.dims));let $=a?z("seq_lens",a.dataType,a.dims):void 0;a&&F.push($);let J=s?z("total_sequence_length_input",s.dataType,s.dims):void 0;s&&F.push(J);let ee=[V("output",e.dataType,g)];p&&ee.push(V("present_value",e.dataType,m));let W=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${y}u;
  var<workgroup> tileQ: array<${R.type.value}, ${y*y}>;
  var<workgroup> tileV: array<${R.type.value}, ${y*y}>;
  ${C.registerUniforms(W).declareVariables(...F,...ee)}
  ${C.mainStart([y,y,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${l===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${l===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Ic($,J,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${x&&p?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${p?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${R.type.storage}(0);
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${t!==void 0};${n}`,inputDependencies:I},getRunData:()=>({outputs:A,dispatchGroup:T,programUniforms:w}),getShaderSource:P}},uo=(n,e,r,t,o,i,a,s,u,l,c=void 0,p=void 0)=>{let h=Math.min(n.outputCount,1+(a?1:0)+(s?1:0)),m=h>1?l.pastSequenceLength:0,g=m+l.kvSequenceLength,y=u&&D.size(u.dims)>0?u:void 0,T=[e,r];h>1&&a&&D.size(a.dims)>0&&T.push(a),y&&T.push(y),c&&T.push(c),p&&T.push(p);let w=n.compute(K3(h,e,r,a,y,l,m,c,p),{inputs:T,outputs:h>1?[-1,1]:[-1]})[0];n.compute(j3(w,l.batchSize,l.numHeads,m,l.sequenceLength,g,c,p),{inputs:c&&p?[w,c,p]:[w],outputs:[]});let x=[w,t];h>1&&s&&D.size(s.dims)>0&&x.push(s),c&&x.push(c),p&&x.push(p),n.compute(X3(h,w,t,s,l,m,c,p),{inputs:x,outputs:h>1?[0,2]:[0]})},Z3=(n,e)=>{let r=[e.batchSize,e.numHeads,e.sequenceLength,e.headSize],t=e.sequenceLength,o=e.inputHiddenSize,i=e.headSize,a=12,s={x:Math.ceil(e.headSize/a),y:Math.ceil(e.sequenceLength/a),z:e.batchSize*e.numHeads},u=[n.inputs[0],n.inputs[1],n.inputs[2]],l=[{type:12,data:t},{type:12,data:o},{type:12,data:i},{type:12,data:e.numHeads},{type:12,data:e.headSize},{type:12,data:e.hiddenSize},{type:12,data:e.hiddenSize+e.hiddenSize+e.vHiddenSize}],c=p=>{let h=V("output_q",u[0].dataType,r),m=V("output_k",u[0].dataType,r),g=V("output_v",u[0].dataType,r),y=z("input",u[0].dataType,u[0].dims),T=z("weight",u[1].dataType,u[1].dims),w=z("bias",u[2].dataType,u[2].dims),x=y.type.storage,I=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${x}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${x}, ${a*a}>;
  var<workgroup> tileWeightK: array<${x}, ${a*a}>;
  var<workgroup> tileWeightV: array<${x}, ${a*a}>;
  ${p.registerUniforms(I).declareVariables(y,T,w,h,m,g)}
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
  }`};return n.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0}],dispatchGroup:s,programUniforms:l}),getShaderSource:c},{inputs:u,outputs:[-1,-1,-1]})},i0=(n,e)=>{let r=q3(n.inputs,e),[t,o,i]=Z3(n,r);return uo(n,t,o,i,n.inputs[4],void 0,void 0,void 0,n.inputs[5],r)}});var J3,Q3,Y3,a0,s0=N(()=>{"use strict";ft();ue();pe();Je();he();J3=(n,e)=>{if(!n||n.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(t,o,i)=>{let a=o.length;if(a!==t.length)throw new Error(`${i}: num dimensions != ${a}`);o.forEach((s,u)=>{if(s!==t[u])throw new Error(`${i}: dim[${u}] do not match`)})};if(n[0].dims.length>1){let t=e.format==="NHWC"?e.spatial?n[0].dims.slice(-1):n[0].dims.slice(-1).concat(n[0].dims.slice(1,n[0].dims.length-1)):n[0].dims.slice(1,e.spatial?2:void 0);r(n[1].dims,t,"Invalid input scale"),r(n[2].dims,t,"Invalid input B"),r(n[3].dims,t,"Invalid input mean"),r(n[4].dims,t,"Invalid input var")}else r(n[1].dims,[1],"Invalid input scale"),r(n[2].dims,[1],"Invalid input B"),r(n[3].dims,[1],"Invalid input mean"),r(n[4].dims,[1],"Invalid input var")},Q3=(n,e)=>{let{epsilon:r,spatial:t,format:o}=e,i=n[0].dims,a=t?Pe(i[i.length-1]):1,s=o==="NHWC"&&i.length>1?a:1,u=D.size(i)/a,l=t,c=l?i.length:i,p=z("x",n[0].dataType,n[0].dims,a),h=z("scale",n[1].dataType,n[1].dims,s),m=z("bias",n[2].dataType,n[2].dims,s),g=z("inputMean",n[3].dataType,n[3].dims,s),y=z("inputVar",n[4].dataType,n[4].dims,s),T=V("y",n[0].dataType,c,a),w=()=>{let I="";if(t)I=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${a}`:"outputIndices[1]"};`;else if(o==="NCHW")I=`
            ${T.indicesSet("outputIndices","0","0")}
            let cOffset = ${T.indicesToOffset("outputIndices")};`;else{I=`var cIndices = ${h.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let A=1;A<h.rank;A++)I+=`cIndices[${A}] = outputIndices[${A}];`;I+=`let cOffset = ${h.indicesToOffset("cIndices")};`}return I},x=I=>`
  const epsilon = ${r};
  ${I.registerUniform("outputSize","u32").declareVariables(p,h,m,g,y,T)}
  ${I.mainStart()}
  ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${T.offsetToIndices(`global_idx * ${a}`)};
    ${w()}
    let scale = ${h.getByOffset("cOffset")};
    let bias = ${m.getByOffset("cOffset")};
    let inputMean = ${g.getByOffset("cOffset")};
    let inputVar = ${y.getByOffset("cOffset")};
    let x = ${p.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${T.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${e.epsilon}_${e.format}_${t}_${a}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:x,getRunData:()=>({outputs:[{dims:n[0].dims,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l?[{type:12,data:u},...U(i)]:[{type:12,data:u}]})}},Y3=n=>le(n),a0=(n,e)=>{let{inputs:r,outputCount:t}=n,o=Y3({...e,outputCount:t});if(de.webgpu.validateInputContent&&J3(r,o),e.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");n.compute(Q3(r,o))}});var eE,tE,u0,l0=N(()=>{"use strict";pe();he();eE=n=>{if(n[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(n[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(n[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(n[0].dims[2]!==n[1].dims[0])throw new Error("last dimension of input and bias are not the same")},tE=n=>{let e=n[0].dims,r=n[0].dims[2],t=D.size(e)/4,o=n[0].dataType,i=z("input",o,e,4),a=z("bias",o,[r],4),s=z("residual",o,e,4),u=V("output",o,e,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:e,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)}}),getShaderSource:c=>`
  const channels = ${r}u / 4;
  ${c.declareVariables(i,a,s,u)}

  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes(t)}
    let value = ${i.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${s.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},u0=n=>{eE(n.inputs),n.compute(tE(n.inputs))}});var rE,ke,c0,d0,p0,f0,h0,m0,g0,b0,y0,nE,_0,v0,w0,x0,Uo,T0,Fa,I0,S0,$0,A0,O0,P0,E0,C0,D0,k0,N0,L0,R0,z0,M0,B0,F0,V0,Sc,$c,G0,U0,W0,oE,iE,H0,Va=N(()=>{"use strict";ue();pe();Je();he();rE=(n,e,r,t,o,i,a)=>{let s=Math.ceil(e/4),u="";typeof o=="string"?u=`${o}(a)`:u=o("a");let l=z("inputData",r,[s],4),c=V("outputData",t,[s],4),p=[{name:"vec_size",type:"u32"}];return a&&p.push(...a),`
      ${n.registerUniforms(p).declareVariables(l,c)}

  ${i??""}

  ${n.mainStart()}
    ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",u)}
  }`},ke=(n,e,r,t,o,i=n.dataType,a,s)=>{let u=[{type:12,data:Math.ceil(D.size(n.dims)/4)}];return a&&u.push(...a),{name:e,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:l=>rE(l,D.size(n.dims),n.dataType,i,r,t,s),getRunData:l=>({outputs:[{dims:n.dims,dataType:i}],dispatchGroup:{x:Math.ceil(D.size(l[0].dims)/64/4)},programUniforms:u})}},c0=n=>{n.compute(ke(n.inputs[0],"Abs","abs"))},d0=n=>{n.compute(ke(n.inputs[0],"Acos","acos"))},p0=n=>{n.compute(ke(n.inputs[0],"Acosh","acosh"))},f0=n=>{n.compute(ke(n.inputs[0],"Asin","asin"))},h0=n=>{n.compute(ke(n.inputs[0],"Asinh","asinh"))},m0=n=>{n.compute(ke(n.inputs[0],"Atan","atan"))},g0=n=>{n.compute(ke(n.inputs[0],"Atanh","atanh"))},b0=n=>le(n),y0=(n,e)=>{let r;switch(e.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${e.to}`)}n.compute(ke(n.inputs[0],"Cast",r,void 0,e.cacheKey,e.to))},nE=n=>{let e,r,t=n.length>=2&&n[1].data!==0,o=n.length>=3&&n[2].data!==0;switch(n[0].dataType){case 1:e=t?n[1].getFloat32Array()[0]:-34028234663852886e22,r=o?n[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:e=t?n[1].getUint16Array()[0]:64511,r=o?n[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return le({min:e,max:r})},_0=(n,e)=>{let r=e||nE(n.inputs),t=at(n.inputs[0].dataType);n.compute(ke(n.inputs[0],"Clip",o=>`clamp(${o}, vec4<${t}>(uniforms.min), vec4<${t}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:n.inputs[0].dataType,data:r.min},{type:n.inputs[0].dataType,data:r.max}],[{name:"min",type:t},{name:"max",type:t}]),{inputs:[0]})},v0=n=>{n.compute(ke(n.inputs[0],"Ceil","ceil"))},w0=n=>{n.compute(ke(n.inputs[0],"Cos","cos"))},x0=n=>{n.compute(ke(n.inputs[0],"Cosh","cosh"))},Uo=n=>le(n),T0=(n,e)=>{let r=at(n.inputs[0].dataType);n.compute(ke(n.inputs[0],"Elu",t=>`elu_vf32(${t})`,`
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
}`,I0=n=>{let e=at(n.inputs[0].dataType);n.compute(ke(n.inputs[0],"Erf",r=>`erf_vf32(${r})`,Fa(e)))},S0=n=>{n.compute(ke(n.inputs[0],"Exp","exp"))},$0=n=>{n.compute(ke(n.inputs[0],"Floor","floor"))},A0=n=>{let e=at(n.inputs[0].dataType);n.compute(ke(n.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Fa(e)))},O0=(n,e)=>{let r=at(n.inputs[0].dataType);n.compute(ke(n.inputs[0],"LeakyRelu",t=>`select(leaky_relu_alpha_ * ${t}, ${t}, ${t} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${e.alpha});`,e.cacheKey))},P0=n=>{n.compute(ke(n.inputs[0],"Not",e=>`!${e}`))},E0=n=>{n.compute(ke(n.inputs[0],"Neg",e=>`-${e}`))},C0=n=>{n.compute(ke(n.inputs[0],"Reciprocal",e=>`1.0/${e}`))},D0=n=>{let e=at(n.inputs[0].dataType);n.compute(ke(n.inputs[0],"Relu",r=>`select(vec4<${e}>(0.0), ${r}, ${r} > vec4<${e}>(0.0))`))},k0=n=>{n.compute(ke(n.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},N0=n=>le(n),L0=(n,e)=>{let r=at(n.inputs[0].dataType);n.compute(ke(n.inputs[0],"HardSigmoid",t=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${e.alpha} * ${t} + vec4<${r}>(${e.beta})))`,void 0,e.cacheKey))},R0=n=>{n.compute(ke(n.inputs[0],"Sin","sin"))},z0=n=>{n.compute(ke(n.inputs[0],"Sinh","sinh"))},M0=n=>{n.compute(ke(n.inputs[0],"Sqrt","sqrt"))},B0=n=>{n.compute(ke(n.inputs[0],"Tan","tan"))},F0=n=>`sign(${n}) * (1 - exp(-2 * abs(${n}))) / (1 + exp(-2 * abs(${n})))`,V0=n=>{n.compute(ke(n.inputs[0],"Tanh",F0))},Sc=(n="f32")=>`
const fast_gelu_a: ${n} = 0.5;
const fast_gelu_b: ${n} = 0.7978845608028654;
const fast_gelu_c: ${n} = 0.035677408136300125;

fn tanh_v(v: vec4<${n}>) -> vec4<${n}> {
  return ${F0("v")};
}
`,$c=n=>`(fast_gelu_a + fast_gelu_a * tanh_v(${n} * (fast_gelu_c * ${n} * ${n} + fast_gelu_b))) * ${n}`,G0=n=>{let e=at(n.inputs[0].dataType);n.compute(ke(n.inputs[0],"FastGelu",$c,Sc(e),void 0,n.inputs[0].dataType))},U0=(n,e)=>{let r=at(n.inputs[0].dataType);return n.compute(ke(n.inputs[0],"ThresholdedRelu",t=>`select(vec4<${r}>(0.0), ${t}, ${t} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${e.alpha});`,e.cacheKey)),0},W0=n=>{n.compute(ke(n.inputs[0],"Log","log"))},oE=(n,e)=>`
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
`,iE=n=>`quick_gelu_impl(${n})`,H0=(n,e)=>{let r=at(n.inputs[0].dataType);n.compute(ke(n.inputs[0],"QuickGelu",iE,oE(r,e.alpha),e.cacheKey,n.inputs[0].dataType))}});var aE,sE,j0,K0=N(()=>{"use strict";pe();he();Va();aE=n=>{if(n[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(n[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(n[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(n[0].dims[2]!==n[1].dims[0])throw new Error("last dimension of input and bias are not the same")},sE=n=>{let e=n[0].dims.slice();e[2]=e[2]/2;let r=z("input",n[0].dataType,n[0].dims,4),t=z("bias",n[0].dataType,[n[0].dims[2]],4),o=V("output",n[0].dataType,e,4),i=D.size(e)/4,a=Fe(n[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:e,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:u=>`
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
  }`}},j0=n=>{aE(n.inputs),n.compute(sE(n.inputs))}});var uE,lE,Hr,X0,Z0,J0,Q0,Y0,ev,tv,rv,nv,ov,iv=N(()=>{"use strict";ue();pe();he();uE=(n,e,r,t,o,i,a,s,u,l,c,p)=>{let h,m;typeof s=="string"?h=m=(x,I)=>`${s}((${x}),(${I}))`:typeof s=="function"?h=m=s:(h=s.scalar,m=s.vector);let g=V("outputData",c,t.length,4),y=z("aData",u,e.length,4),T=z("bData",l,r.length,4),w;if(o)if(i){let x=D.size(e)===1,I=D.size(r)===1,A=e.length>0&&e[e.length-1]%4===0,P=r.length>0&&r[r.length-1]%4===0;x||I?w=g.setByOffset("global_idx",m(x?`${y.type.value}(${y.getByOffset("0")}.x)`:y.getByOffset("global_idx"),I?`${T.type.value}(${T.getByOffset("0")}.x)`:T.getByOffset("global_idx"))):w=`
            let outputIndices = ${g.offsetToIndices("global_idx * 4u")};
            let offsetA = ${y.broadcastedIndicesToOffset("outputIndices",g)};
            let offsetB = ${T.broadcastedIndicesToOffset("outputIndices",g)};
            ${g.setByOffset("global_idx",m(a||A?y.getByOffset("offsetA / 4u"):`${y.type.value}(${y.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||P?T.getByOffset("offsetB / 4u"):`${T.type.value}(${T.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else w=g.setByOffset("global_idx",m(y.getByOffset("global_idx"),T.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let x=(I,A,P="")=>{let C=`aData[indexA${A}][componentA${A}]`,R=`bData[indexB${A}][componentB${A}]`;return`
            let outputIndices${A} = ${g.offsetToIndices(`global_idx * 4u + ${A}u`)};
            let offsetA${A} = ${y.broadcastedIndicesToOffset(`outputIndices${A}`,g)};
            let offsetB${A} = ${T.broadcastedIndicesToOffset(`outputIndices${A}`,g)};
            let indexA${A} = offsetA${A} / 4u;
            let indexB${A} = offsetB${A} / 4u;
            let componentA${A} = offsetA${A} % 4u;
            let componentB${A} = offsetB${A} % 4u;
            ${I}[${A}] = ${P}(${h(C,R)});
          `};c===9?w=`
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
        ${n.registerUniform("vec_size","u32").declareVariables(y,T,g)}

        ${p??""}

        ${n.mainStart()}
        ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${w}
      }`},lE=(n,e,r,t,o,i,a=r.dataType)=>{let s=r.dims.map(y=>Number(y)??1),u=t.dims.map(y=>Number(y)??1),l=!D.areEqual(s,u),c=s,p=D.size(s),h=!1,m=!1,g=[l];if(l){let y=Fr.calcShape(s,u,!1);if(!y)throw new Error("Can't perform binary op on the given tensors");c=y.slice(),p=D.size(c);let T=D.size(s)===1,w=D.size(u)===1,x=s.length>0&&s[s.length-1]%4===0,I=u.length>0&&u[u.length-1]%4===0;g.push(T),g.push(w),g.push(x),g.push(I);let A=1;for(let P=1;P<c.length;P++){let C=s[s.length-P],R=u[u.length-P];if(C===R)A*=C;else break}A%4===0?(m=!0,h=!0):(T||w||x||I)&&(h=!0)}else h=!0;return g.push(h),{name:n,shaderCache:{hint:e+g.map(y=>y.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:y=>uE(y,s,u,c,h,l,m,o,r.dataType,t.dataType,a,i),getRunData:()=>({outputs:[{dims:c,dataType:a}],dispatchGroup:{x:Math.ceil(p/64/4)},programUniforms:[{type:12,data:Math.ceil(D.size(c)/4)},...U(s,u,c)]})}},Hr=(n,e,r,t,o,i)=>{n.compute(lE(e,o??"",n.inputs[0],n.inputs[1],r,t,i))},X0=n=>{Hr(n,"Add",(e,r)=>`${e}+${r}`)},Z0=n=>{Hr(n,"Div",(e,r)=>`${e}/${r}`)},J0=n=>{Hr(n,"Equal",{scalar:(e,r)=>`u32(${e}==${r})`,vector:(e,r)=>`vec4<u32>(${e}==${r})`},void 0,void 0,9)},Q0=n=>{Hr(n,"Mul",(e,r)=>`${e}*${r}`)},Y0=n=>{let e=z("input",n.inputs[0].dataType,n.inputs[0].dims).type.value;Hr(n,"Pow",{scalar:(t,o)=>`pow_custom(${t},${o})`,vector:(t,o)=>`pow_vector_custom(${t},${o})`},`
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
      `)},ev=n=>{Hr(n,"Sub",(e,r)=>`${e}-${r}`)},tv=n=>{Hr(n,"Greater",{scalar:(e,r)=>`u32(${e}>${r})`,vector:(e,r)=>`vec4<u32>(${e}>${r})`},void 0,void 0,9)},rv=n=>{Hr(n,"Less",{scalar:(e,r)=>`u32(${e}<${r})`,vector:(e,r)=>`vec4<u32>(${e}<${r})`},void 0,void 0,9)},nv=n=>{Hr(n,"GreaterOrEqual",{scalar:(e,r)=>`u32(${e}>=${r})`,vector:(e,r)=>`vec4<u32>(${e}>=${r})`},void 0,void 0,9)},ov=n=>{Hr(n,"LessOrEqual",{scalar:(e,r)=>`u32(${e}<=${r})`,vector:(e,r)=>`vec4<u32>(${e}<=${r})`},void 0,void 0,9)}});var dE,pE,fE,hE,av,sv,uv=N(()=>{"use strict";ue();pe();Je();he();dE=(n,e)=>{if(!n||n.length<1)throw new Error("too few inputs");let r=0,t=n[r],o=t.dataType,i=t.dims.length;n.forEach((a,s)=>{if(s!==r){if(a.dataType!==o)throw new Error("input tensors should be one type");if(a.dims.length!==i)throw new Error("input tensors should have the same shape");a.dims.forEach((u,l)=>{if(l!==e&&u!==t.dims[l])throw new Error("non concat dimensions must match")})}})},pE=(n,e)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${n}u>(${e});
    for (var i: u32 = 0u; i < ${n}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${n}u;
  }`,fE=(n,e)=>{let r=n.length,t=[];for(let o=0;o<r;++o){let i=e.setByOffset("global_idx",n[o].getByIndices("indices"));r===1?t.push(i):o===0?t.push(`if (inputIndex == ${o}u) { ${i} }`):o===r-1?t.push(`else { ${i} }`):t.push(`else if (inputIndex == ${o}) { ${i} }`)}return t.join(`
`)},hE=(n,e,r,t)=>{let o=D.size(r),i=new Array(n.length),a=new Array(n.length),s=0,u=[],l=[],c=[{type:12,data:o}];for(let y=0;y<n.length;++y)s+=n[y].dims[e],i[y]=s,l.push(n[y].dims.length),a[y]=z(`input${y}`,t,l[y]),u.push("rank"),c.push({type:12,data:i[y]});for(let y=0;y<n.length;++y)c.push(...U(n[y].dims));c.push(...U(r));let p=V("output",t,r.length),h=p.indicesGet("indices",e),m=Array.from(Array(i.length).keys()).map(y=>`uniforms.sizeInConcatAxis${y}`).join(","),g=y=>`

  ${(()=>{y.registerUniform("outputSize","u32");for(let T=0;T<n.length;T++)y.registerUniform(`sizeInConcatAxis${T}`,"u32");return y.declareVariables(...a,p)})()}

  ${pE(i.length,m)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${p.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${m});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${fE(a,p)}
  }`;return{name:"Concat",shaderCache:{hint:`${e}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:c}),getShaderSource:g}},av=(n,e)=>{let r=n.inputs,t=r[0].dims,o=D.normalizeAxis(e.axis,t.length);dE(r,o);let i=t.slice();i[o]=r.reduce((s,u)=>s+(u.dims.length>o?u.dims[o]:0),0);let a=r.filter(s=>D.size(s.dims)>0);n.compute(hE(a,o,i,r[0].dataType),{inputs:a})},sv=n=>le({axis:n.axis})});var Xt,Zt,Jt,Ga,_n=N(()=>{"use strict";ue();pe();Xt=(n,e,r="f32")=>{switch(n.activation){case"Relu":return`value = max(value, ${e}(0.0));`;case"Sigmoid":return`value = (${e}(1.0) / (${e}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${e}(${r}(uniforms.clip_min)), ${e}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${e}(0.0), min(${e}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${e}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${n.activation}`)}},Zt=(n,e)=>{n.activation==="Clip"?e.push({type:1,data:n.clipMax},{type:1,data:n.clipMin}):n.activation==="HardSigmoid"?e.push({type:1,data:n.alpha},{type:1,data:n.beta}):n.activation==="LeakyRelu"&&e.push({type:1,data:n.alpha})},Jt=(n,e)=>{n.activation==="Clip"?e.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):n.activation==="HardSigmoid"?e.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):n.activation==="LeakyRelu"&&e.push({name:"alpha",type:"f32"})},Ga=n=>{let e=n?.activation||"";if(e==="HardSigmoid"){let[r,t]=n?.activation_params||[.2,.5];return{activation:e,alpha:r,beta:t}}else if(e==="Clip"){let[r,t]=n?.activation_params||[m_,g_];return{activation:e,clipMax:t,clipMin:r}}else if(e==="LeakyRelu"){let[r]=n?.activation_params||[.01];return{activation:e,alpha:r}}return{activation:e}}});var ot,lv,Ua=N(()=>{"use strict";ot=(n,e)=>{switch(n){case 1:return e;case 2:return`vec2<${e}>`;case 3:return`vec3<${e}>`;case 4:return`vec4<${e}>`;default:throw new Error(`${n}-component is not supported.`)}},lv=n=>`
      ${n?"value = value + getBiasByOutputCoords(coords);":""}
      `});var cv,dv=N(()=>{"use strict";cv=n=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${n}.x), i32(${n}.y), i32(${n}.z), 1));
}
`});var Wo,Wa,Ha=N(()=>{"use strict";ue();pe();he();_n();Wo=(n,e,r,t,o)=>{let i=t-r;return`
      ${Array.from({length:r}).map((a,s)=>`
      if (${Z(e.shape,s,e.rank)} != 1) {
        ${e.indicesSet(n,s,Z(o,s+i,t))}
      } else {
        ${e.indicesSet(n,s,0)}
      }`).join("")}
`},Wa=(n,e,r,t,o=!1,i)=>{let a=n[0].dims,s=n[1].dims,u=a[a.length-2],l=s[s.length-1],c=a[a.length-1],p=Pe(l),h=Pe(c),m=Pe(u),g=D.size(r)/p/m,y=n.length>2,T=t?t.slice(0,-2):r.slice(0,-2),x=[D.size(T),u,l],I=[{type:12,data:g},{type:12,data:u},{type:12,data:l},{type:12,data:c}];Zt(e,I),I.push(...U(T,a,s)),y&&I.push(...U(n[2].dims)),I.push(...U(x));let A=P=>{let C=Ra("batch_dims",n[0].dataType,T.length),R=z("a",n[0].dataType,a.length,h),M=z("b",n[1].dataType,s.length,p),F=V("output",n[0].dataType,x.length,p),$=Fe(F.type.tensor),J=Xt(e,F.type.value,$),Y=[R,M],ee="";if(y){let oe=o?p:1;Y.push(z("bias",n[2].dataType,n[2].dims.length,oe)),ee=`${o?`value += bias[col / ${oe}];`:`value += ${F.type.value}(bias[row + i]);`}`}let W=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Jt(e,W);let Te=()=>{let oe=`var a_data: ${R.type.value};`;for(let L=0;L<h;L++)oe+=`
              let b_data${L} = b[(b_offset + (k + ${L}) * uniforms.N + col) / ${p}];`;for(let L=0;L<m;L++){oe+=`a_data = a[(a_offset + (row + ${L}) * uniforms.K + k) / ${h}];`;for(let Q=0;Q<h;Q++)oe+=`
            values[${L}] = fma(${M.type.value}(a_data${h===1?"":`[${Q}]`}), b_data${Q}, values[${L}]);
`}return oe};return`
  ${P.registerUniforms(W).registerInternalVariables(C).declareVariables(...Y,F)}
  ${P.mainStart()}
    ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${p})) * ${p};
    var index1 = global_idx / (uniforms.N / ${p});
    let stride1 = uniforms.M / ${m};
    let row = (index1 % stride1) * ${m};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${C.offsetToIndices("batch")};`}

    var a_indices: ${R.type.indices};
    ${Wo("a_indices",R,R.rank-2,C.rank,"batch_indices")}
    ${R.indicesSet("a_indices",R.rank-2,0)}
    ${R.indicesSet("a_indices",R.rank-1,0)}
    let a_offset = ${R.indicesToOffset("a_indices")};

    var b_indices: ${M.type.indices};
    ${Wo("b_indices",M,M.rank-2,C.rank,"batch_indices")}
    ${M.indicesSet("b_indices",M.rank-2,0)}
    ${M.indicesSet("b_indices",M.rank-1,0)}
    let b_offset = ${M.indicesToOffset("b_indices")};
    var values: array<${F.type.value}, ${m}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${Te()}
    }
    for (var i = 0u; i < ${m}u; i++) {
      var value = values[i];
      ${ee}
      ${J}
      let cur_indices = ${F.type.indices}(batch, row + i, col);
      let offset = ${F.indicesToOffset("cur_indices")};
      ${F.setByOffset(`offset / ${p}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${e.activation};${p};${h};${m};${o}`,inputDependencies:y?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:I}),getShaderSource:A}}});var mE,gE,Ac,pv,bE,Oc,yE,Ho,qa=N(()=>{"use strict";ue();pe();he();_n();Ha();Ua();mE=(n,e)=>n?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${e?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${e?", batchIndices":""});
        `,gE=(n,e)=>n?`
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
        }`,Ac=(n,e,r="f32",t,o=!1,i=32,a=!1,s=32)=>{let u=e[1]*n[1],l=e[0]*n[0],c=o?u:i,p=o?i:u,h=c/e[0],m=i/e[1];if(!((o&&h===4&&n[1]===4||!o&&(h===3||h===4))&&c%e[0]===0&&i%e[1]===0&&n[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${h} and workPerThread[1] ${n[1]} must be 4.
      Otherwise, innerElementSize ${h} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${e[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${e[1]}. colPerThread ${n[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${h}<${r}>, ${c/h}>, ${p}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${l/n[0]}>, ${i}>;

const rowPerThread = ${n[1]};
const colPerThread = ${n[0]};
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

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${m};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${mE(o,t)}
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
          ${h===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${gE(o,h)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},pv=(n,e)=>n?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${e?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${e?", batchIndices":""});
            `,bE=n=>n?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Oc=(n,e,r="f32",t,o=!1,i=32,a=!1,s=32,u=!1)=>{let l=n[1]*e[1],c=n[0]*e[0],p=o?l:i,h=o?i:l;if(!(h%e[1]===0&&p%e[0]===0&&i%e[1]===0))throw new Error(`tileAHight ${h} must be divisible by workgroupSize[1]${e[1]}, tileAWidth ${p} must be divisible by workgroupSize[0]${e[0]}, tileInner ${i} must be divisible by workgroupSize[1]${e[1]}`);let m=h/e[1],g=p/e[0],y=i/e[1],T=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${e[1]}) {
        for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${e[0]}) {
          ${pv(o,t)}
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
let tileRowB = i32(localId.y) * ${y};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${m}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${g}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${pv(o,t)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
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
      ${bE(o)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${p}>, ${h}>;
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
    ${T}
  }
`},yE=(n,e,r,t,o=!1)=>{let[i,a,s,u]=t,l=Fe(t[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${ot(n,l)} {
      var value = ${ot(n,l)}(0.0);
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

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${ot(n,l)} {
      var value = ${ot(n,l)}(0.0);
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

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${ot(n,l)}) {
      let col = colIn * ${n};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${e?`value = value + ${o?"bias[colIn]":`${ot(n,l)}(bias[row])`};`:""}
        ${r}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Ho=(n,e,r,t,o=!1,i)=>{let a=n[0].dims,s=n[1].dims,u=a.slice(0,-2),l=s.slice(0,-2),c=t?t.slice(0,-2):r.slice(0,-2),p=D.size(c),h=a[a.length-2],m=a[a.length-1],g=s[s.length-1],y=m%4===0&&g%4===0,T=h<=8?[4,1,1]:[4,4,1],w=[8,8,1],x=[Math.ceil(g/w[0]/T[0]),Math.ceil(h/w[1]/T[1]),Math.ceil(p/w[2]/T[2])],I=y?4:1,A=[...u,h,m/I],P=A.length,C=[...l,m,g/I],R=C.length,M=[p,h,g/I],F=[{type:6,data:h},{type:6,data:g},{type:6,data:m}];Zt(e,F),F.push(...U(c,A,C));let $=["rank","rank"],J=n.length>2;J&&(F.push(...U(n[2].dims)),$.push("rank")),F.push(...U(M));let Y=ee=>{let W=c.length,Te=Ra("batchDims",n[0].dataType,W,1),oe=Fe(n[0].dataType),L=z("a",n[0].dataType,P,I),Q=z("b",n[1].dataType,R,I),te=V("result",n[0].dataType,M.length,I),me=[L,Q];if(J){let ie=o?I:1;me.push(z("bias",n[2].dataType,n[2].dims.length,ie))}let Ke=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Jt(e,Ke);let qe=Fe(te.type.tensor),ce=Xt(e,te.type.value,qe),G=yE(I,J,ce,[Te,L,Q,te],o);return`
  ${ee.registerUniforms(Ke).registerInternalVariables(Te).declareVariables(...me,te)}
  ${G}
  ${y?Ac(T,w,oe,Te):Oc(T,w,oe,Te)}
                   `};return{name:"MatMul",shaderCache:{hint:`${T};${e.activation};${y};${o}`,inputDependencies:$},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:n[0].dataType}],dispatchGroup:{x:x[0],y:x[1],z:x[2]},programUniforms:F}),getShaderSource:Y}}});var _E,fv,hv=N(()=>{"use strict";ue();Br();he();_n();Ua();dv();qa();_E=(n,e,r,t,o=!1,i,a=4,s=4,u=4,l="f32")=>{let c=$=>{switch($){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${$} is not supported.`)}},p=$=>{switch($){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${$} is not supported.`)}},h=n?`
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
    `,g=n?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",y=n?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",T=n?"row":"col",w=n?"col":"row",x=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${n?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${T} / outWidth;
    let outCol = ${T} % outWidth;

    let WRow = ${w} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${w} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${w} % inChannels;
    var resData = ${ot(a,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${g} && xCol >= 0 && xCol < ${y}) {
      ${h}
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
    return ${ot(a,l)}(0.0);`:t&&r?`
    let col = colIn * ${a};
    ${x}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${x}
    }
    return ${ot(a,l)}(0.0);`,A=n?t&&r?p(s):`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${p(s)}
    }
    return ${ot(s,l)}(0.0);`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${p(s)}
    }
    return ${ot(s,l)}(0.0);`,P=ot(u,l),C=n?ot(a,l):ot(s,l),R=n?ot(s,l):ot(a,l),M=Xt(i,P,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${n?I:A}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${R} {
      ${n?A:I}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${P}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${n?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${m}
      ${lv(o)}
      ${M}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},fv=(n,e,r,t,o,i,a,s,u)=>{let l=e.format==="NHWC",c=l?n[0].dims[3]:n[0].dims[1],p=r[0],h=l?r[2]:r[3],m=l?r[1]:r[2],g=l?r[3]:r[1],y=l&&(c%4===0||c%3===0)&&g%4===0,T=l?g:h*m,w=l?h*m:g,x=[8,8,1],I=t<=8?[4,1,1]:[4,4,1],A=[Math.ceil(T/x[0]/I[0]),Math.ceil(w/x[1]/I[1]),Math.ceil(p/x[2]/I[2])];ge("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${A}`);let P=y?l&&c%4!==0?3:4:1,C=x[1]*I[1],R=x[0]*I[0],M=Math.max(x[0]*P,x[1]),F=t%C===0,$=o%R===0,J=i%M===0,Y=y?[P,4,4]:[1,1,1],ee=[{type:6,data:t},{type:6,data:o},{type:6,data:i},{type:6,data:[e.pads[0],e.pads[1]]},{type:6,data:e.strides},{type:6,data:e.dilations}];Zt(e,ee),ee.push(...U(n[0].dims,n[1].dims));let W=["rank","rank"];a&&(ee.push(...U(n[2].dims)),W.push("rank")),ee.push(...U(r));let Te=oe=>{let L=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Jt(e,L);let Q=y?4:1,te=Fe(n[0].dataType),me=`
      fn setOutputAtIndex(flatIndex : i32, value : ${y?`vec4<${te}>`:te}) {
        result[flatIndex] = ${y?`vec4<${te}>`:te}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${y?`vec4<${te}>`:te}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${y?"/ 4":""}, value);
      }`,Ke=z("x",n[0].dataType,n[0].dims.length,P===3?1:P),qe=z("w",n[1].dataType,n[1].dims.length,Q),ce=[Ke,qe],G=V("result",n[0].dataType,r.length,Q);if(a){let ie=z("bias",n[2].dataType,n[2].dims.length,Q);ce.push(ie),me+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${y?`vec4<${te}>`:te} {
          return bias[coords.${l?"w":"y"}${y?"/ 4":""}];
        }`}return`
        ${cv("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${oe.registerUniforms(L).declareVariables(...ce,G)}
        ${me}
        ${_E(l,F,$,J,a,e,Y[0],Y[1],Y[2],te)}
        ${y?Ac(I,x,te,void 0,!l,M):Oc(I,x,te,void 0,!l,M,!1,void 0,s)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${e.cacheKey};${P};${y};${F};${$};${J};${C};${R};${M}`,inputDependencies:W},getRunData:()=>({outputs:[{dims:u?u(r):r,dataType:n[0].dataType}],dispatchGroup:{x:A[0],y:A[1],z:A[2]},programUniforms:ee}),getShaderSource:Te}}});var vE,mv,ja,wE,gv,xE,bv,yv,_v=N(()=>{"use strict";ue();Br();pe();he();_n();Ua();vE=n=>{let e=1;for(let r=0;r<n.length;r++)e*=n[r];return e},mv=n=>typeof n=="number"?[n,n,n]:n,ja=(n,e)=>e<=1?n:n+(n-1)*(e-1),wE=(n,e,r,t=1)=>{let o=ja(e,t);return Math.floor((n[0]*(r-1)-r+o)/2)},gv=(n,e,r,t,o)=>{o==null&&(o=wE(n,e[0],t[0]));let i=[0,0,0,r];for(let a=0;a<3;a++)n[a]+2*o>=e[a]&&(i[a]=Math.trunc((n[a]-e[a]+2*o)/t[a]+1));return i},xE=(n,e,r,t,o,i,a,s,u,l)=>{let c,p,h,m;if(n==="VALID"&&(n=0),typeof n=="number"){c={top:n,bottom:n,left:n,right:n,front:n,back:n};let g=gv([e,r,t,1],[s,u,l],1,[o,i,a],n);p=g[0],h=g[1],m=g[2]}else if(Array.isArray(n)){if(!n.every((y,T,w)=>y===w[0]))throw Error(`Unsupported padding parameter: ${n}`);c={top:n[0],bottom:n[1],left:n[2],right:n[3],front:n[4],back:n[5]};let g=gv([e,r,t,1],[s,u,l],1,[o,i,a],n[0]);p=g[0],h=g[1],m=g[2]}else if(n==="SAME_UPPER"){p=Math.ceil(e/o),h=Math.ceil(r/i),m=Math.ceil(t/a);let g=(p-1)*o+s-e,y=(h-1)*i+u-r,T=(m-1)*a+l-t,w=Math.floor(g/2),x=g-w,I=Math.floor(y/2),A=y-I,P=Math.floor(T/2),C=T-P;c={top:I,bottom:A,left:P,right:C,front:w,back:x}}else throw Error(`Unknown padding parameter: ${n}`);return{padInfo:c,outDepth:p,outHeight:h,outWidth:m}},bv=(n,e,r,t,o,i=!1,a="channelsLast")=>{let s,u,l,c,p;if(a==="channelsLast")[s,u,l,c,p]=n;else if(a==="channelsFirst")[s,p,u,l,c]=n;else throw new Error(`Unknown dataFormat ${a}`);let[h,,m,g,y]=e,[T,w,x]=mv(r),[I,A,P]=mv(t),C=ja(m,I),R=ja(g,A),M=ja(y,P),{padInfo:F,outDepth:$,outHeight:J,outWidth:Y}=xE(o,u,l,c,T,w,x,C,R,M),ee=i?h*p:h,W=[0,0,0,0,0];return a==="channelsFirst"?W=[s,ee,$,J,Y]:a==="channelsLast"&&(W=[s,$,J,Y,ee]),{batchSize:s,dataFormat:a,inDepth:u,inHeight:l,inWidth:c,inChannels:p,outDepth:$,outHeight:J,outWidth:Y,outChannels:ee,padInfo:F,strideDepth:T,strideHeight:w,strideWidth:x,filterDepth:m,filterHeight:g,filterWidth:y,effectiveFilterDepth:C,effectiveFilterHeight:R,effectiveFilterWidth:M,dilationDepth:I,dilationHeight:A,dilationWidth:P,inShape:n,outShape:W,filterShape:e}},yv=(n,e,r,t,o,i)=>{let a=i==="channelsLast",s=a?n[0].dims[3]:n[0].dims[1],u=!1,l=[64,1,1],c={x:r.map((x,I)=>I)},p=[Math.ceil(vE(c.x.map(x=>r[x]))/l[0]),1,1];ge("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${p}`);let h=u?a&&s%4!==0?3:4:1,m=D.size(r),g=[{type:12,data:m},{type:12,data:t},{type:12,data:o},{type:12,data:e.strides},{type:12,data:e.dilations}];Zt(e,g),g.push(...U(n[0].dims,n[1].dims));let y=["rank","rank"],T=n.length===3;T&&(g.push(...U(n[2].dims)),y.push("rank")),g.push(...U(r));let w=x=>{let I=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:t.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:e.strides.length},{name:"dilations",type:"u32",length:e.dilations.length}];Jt(e,I);let A=u?4:1,P=Fe(n[0].dataType),C=z("x",n[0].dataType,n[0].dims.length,h===3?1:h),R=z("W",n[1].dataType,n[1].dims.length,A),M=[C,R],F=V("result",n[0].dataType,r.length,A),$="";if(T){let ee=z("bias",n[2].dataType,n[2].dims.length,A);M.push(ee),$+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${P}>`:P} {
          return bias[${a?Z("coords",4,5):Z("coords",1,5)}${u?"/ 4":""}];
        }`}let J=ot(h,P),Y=Xt(e,J,P);return`
            ${$}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${C.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${R.getByIndices("aIndices")};
            }
          ${x.registerUniforms(I).declareVariables(...M,F)}
          ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${F.offsetToIndices("global_idx")};
              let batch = ${Z("coords",0,C.rank)};
              let d2 = ${a?Z("coords",C.rank-1,C.rank):Z("coords",1,C.rank)};
              let xFRCCorner = vec3<u32>(${a?Z("coords",1,C.rank):Z("coords",2,C.rank)},
              ${a?Z("coords",2,C.rank):Z("coords",3,C.rank)},
              ${a?Z("coords",3,C.rank):Z("coords",4,C.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?Z("uniforms.x_shape",1,C.rank):Z("uniforms.x_shape",2,C.rank)};
              let xShapeZ = ${a?Z("uniforms.x_shape",2,C.rank):Z("uniforms.x_shape",3,C.rank)};
              let xShapeW = ${a?Z("uniforms.x_shape",3,C.rank):Z("uniforms.x_shape",4,C.rank)};
              let xShapeU = ${a?Z("uniforms.x_shape",4,C.rank):Z("uniforms.x_shape",1,C.rank)};
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
              ${Y}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${e.cacheKey};${a};${h};${T}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:r,dataType:n[0].dataType}],dispatchGroup:{x:p[0],y:p[1],z:p[2]},programUniforms:g}),getShaderSource:w}}});var vv,wv,xv=N(()=>{"use strict";ue();pe();he();_n();vv=(n,e,r,t)=>{let o=n.length>2,i=o?"value += b[output_channel];":"",a=n[0].dims,s=n[1].dims,u=e.format==="NHWC",l=u?r[3]:r[1],c=l/e.group,p=u&&c>=4?Pe(l):1,h=D.size(r)/p,m=[{type:12,data:h},{type:12,data:e.dilations},{type:12,data:[e.strides[0],e.strides[1]]},{type:12,data:[e.pads[0],e.pads[1]]},{type:12,data:c}];Zt(e,m),m.push(...U(a,[s[0],s[1],s[2],s[3]/p]));let g=o?["rank","rank","rank"]:["rank","rank"];m.push(...U([r[0],r[1],r[2],r[3]/p]));let y=T=>{let w=V("output",n[0].dataType,r.length,p),x=Fe(w.type.tensor),I=Xt(e,w.type.value,x),A=z("x",n[0].dataType,a.length),P=z("w",n[1].dataType,s.length,p),C=[A,P];o&&C.push(z("b",n[2].dataType,n[2].dims,p));let R=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:e.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Jt(e,R);let M=u?`
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
  ${T.registerUniforms(R).declareVariables(...C,w)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${w.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${p} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${w.type.value} = ${w.type.value}(0);
    ${M}
    ${i}
    ${I}
    ${w.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${e.cacheKey}_${p}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:t?t(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:m}),getShaderSource:y}},wv=(n,e,r,t)=>{let o=n.length>2,i=Pe(r[3]),a=Pe(r[2]),s=D.size(r)/i/a,u=[n[0].dims[0],n[0].dims[1],n[0].dims[2],n[0].dims[3]/i],l=[n[1].dims[0],n[1].dims[1],n[1].dims[2],n[1].dims[3]/i],c=[r[0],r[1],r[2],r[3]/i],p=[{type:12,data:s},{type:6,data:[e.strides[0],e.strides[1]]},{type:6,data:[e.pads[0],e.pads[1]]}];Zt(e,p),p.push(...U(u,l,c));let h=(a-1)*e.strides[1]+l[1],m=g=>{let y=V("output",n[0].dataType,c.length,i),T=Fe(y.type.tensor),w=Xt(e,y.type.value,T),x=z("x",n[0].dataType,u.length,i),I=z("w",n[1].dataType,l.length,i),A=[x,I];o&&A.push(z("b",n[2].dataType,n[2].dims,i));let P=o?"value += b[output_channel];":"",C=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Jt(e,C),`
  ${g.registerUniforms(C).declareVariables(...A,y)}
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

    var x_vals: array<${x.type.value}, ${h}>;
    var values: array<${y.type.value}, ${a}>;
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
      ${P}
      ${w}
      ${y.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${e.cacheKey};${i};${a};${h};${l[0]};${l[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:t?t(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:m}}});var TE,Pc,IE,Ec,Cc,Tv,SE,$E,Dc,Iv=N(()=>{"use strict";pe();hv();_v();qa();xv();_n();Ha();Xr();TE=(n,e,r,t,o,i)=>{let a=n[0],s=n.slice(i?1:2,i?3:4),u=s.length,l=e[0],p=e.slice(2).map((g,y)=>g+(g-1)*(r[y]-1)),m=s.map((g,y)=>g+t[y]+t[y+u]).map((g,y)=>Math.floor((g-p[y]+o[y])/o[y]));return m.splice(0,0,a),m.splice(i?3:1,0,l),m},Pc=[2,3,1,0],IE=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length>5)throw new Error("greater than 5D is not supported");if(n[0].dims.length!==n[1].dims.length)throw new Error("filter does not have same dimension as input");let r=n[0].dims[e.format==="NHWC"?n[0].dims.length-1:1],t=n[1].dims[1]*e.group;if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(n.length===3&&(n[2].dims.length!==1||n[1].dims[0]!==n[2].dims[0]))throw new Error("invalid bias");let o=n[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape")},Ec=(n,e)=>{let r=n.kernelShape.slice();r.length<e[1].dims.length-2&&r.push(...Array(e[1].dims.length-2-r.length).fill(0));for(let i=2;i<e[1].dims.length;++i)r[i-2]===0&&(r[i-2]=e[1].dims[i]);let t=n.pads.slice();Vn.adjustPadsBasedOnAutoPad(e[0].dims,n.strides,n.dilations,r,t,n.format==="NHWC",n.autoPad);let o=Object.assign({},n);return Object.assign(o,{kernelShape:r,pads:t}),o},Cc=n=>{let e=Ga(n),r=n.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][n.auto_pad],o=n.dilations,i=n.group,a=n.kernel_shape,s=n.pads,u=n.strides,l=n.w_is_const();return{autoPad:t,format:r,dilations:o,group:i,kernelShape:a,pads:s,strides:u,wIsConst:l,...e,cacheKey:`${n.format};${e.activation};`}},Tv=(n,e,r,t)=>{let o=r.format==="NHWC",i=TE(e[0].dims,e[1].dims,r.dilations,r.pads,r.strides,o);if(r.group!==1){let C=[e[0]];if(o){let M=n.kernelCustomData.wT??n.compute(st(e[1],Pc),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=M),C.push(M)}else C.push(e[1]);e.length===3&&C.push(e[2]),!n.adapterInfo.isArchitecture("ampere")&&o&&e[1].dims[0]===r.group&&e[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?n.compute(wv(C,r,i,t),{inputs:C}):n.compute(vv(C,r,i,t),{inputs:C});return}let a=e.length===3,s=e[0].dims[o?1:2],u=e[0].dims[o?2:3],l=e[0].dims[o?3:1],c=e[1].dims[2],p=e[1].dims[3],h=i[o?1:2],m=i[o?2:3],g=i[o?3:1],y=o&&c===s&&p===u&&r.pads[0]===0&&r.pads[1]===0;if(y||c===1&&p===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let C=i[0],R,M,F,$=[];if(o){let ee=n.kernelCustomData.wT??n.compute(st(e[1],Pc),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=ee),y){let W=s*u*l;R=e[0].reshape([1,C,W]),M=ee.reshape([1,W,g]),F=[1,C,g]}else R=e[0].reshape([C,s*u,l]),M=ee.reshape([1,l,g]),F=[C,h*m,g];$.push(R),$.push(M)}else R=e[0].reshape([C,l,s*u]),M=e[1].reshape([1,g,l]),F=[C,g,h*m],$.push(M),$.push(R);a&&$.push(e[2]);let J=F[2],Y=$[0].dims[$[0].dims.length-1];J<8&&Y<8?n.compute(Wa($,r,i,F,o,t),{inputs:$}):n.compute(Ho($,r,i,F,o,t),{inputs:$});return}let T=!0,w=n.kernelCustomData.wT??n.compute(st(e[1],Pc),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=w);let x=[e[0],w];a&&x.push(e[2]);let I=o?h*m:g,A=o?g:h*m,P=c*p*l;n.compute(fv(x,r,i,I,A,P,a,T,t),{inputs:x})},SE=(n,e)=>{let r=e.format==="NHWC",t=[n.inputs[0].reshape(r?[n.inputs[0].dims[0],1,n.inputs[0].dims[1],n.inputs[0].dims[2]]:[n.inputs[0].dims[0],n.inputs[0].dims[1],1,n.inputs[0].dims[2]]),n.inputs[1].reshape([n.inputs[1].dims[0],n.inputs[1].dims[1],1,n.inputs[1].dims[2]])];n.inputs.length===3&&t.push(n.inputs[2]);let o=[0,e.pads[0],0,e.pads[1]],i=[1].concat(e.strides),a=[1].concat(e.dilations),s=[1].concat(e.kernelShape),u=Ec({...e,pads:o,strides:i,dilations:a,kernelShape:s},t);Tv(n,t,u,l=>r?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},$E=(n,e,r)=>{let t=r.format==="NHWC"?"channelsLast":"channelsFirst",o=Ec(r,e),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,a=bv(e[0].dims,e[1].dims,r.strides,r.dilations,i,!1,t);n.compute(yv(e,o,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],t))},Dc=(n,e)=>{if(IE(n.inputs,e),n.inputs[0].dims.length===3)SE(n,e);else if(n.inputs[0].dims.length===5)$E(n,n.inputs,e);else{let r=Ec(e,n.inputs);Tv(n,n.inputs,r)}}});var Sv,$v=N(()=>{"use strict";ue();Br();pe();he();Sv=(n,e,r)=>{let t=n.length>2,o=e.outputShape,i=e.format==="NHWC",a=e.group,s=n[1].dims,u=s[2]/a,l=s[3],c=i?Pe(u):1,p=i&&l===1&&u>=4,h=p?Math.floor(u/4)*4:Math.floor(u/c)*c,m=u-h,g=i?Pe(l):1,y=i?l===1?c:g:1,T=D.size(o)/g,w=[Math.ceil(T/64),1,1];ge("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${w}`);let x=["rank","rank"],I=[e.strides[0],e.strides[1]],A=[e.kernelShape[i?1:2],e.kernelShape[i?2:3]],P=[e.dilations[0],e.dilations[1]],C=[A[0]+(e.dilations[0]<=1?0:(e.kernelShape[i?1:2]-1)*(e.dilations[0]-1)),A[1]+(e.dilations[1]<=1?0:(e.kernelShape[i?2:3]-1)*(e.dilations[1]-1))],R=[C[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),C[1]-1-Math.floor((e.pads[1]+e.pads[3])/2)],M=[{type:12,data:T},{type:12,data:I},{type:12,data:A},{type:12,data:P},{type:12,data:C},{type:6,data:R},{type:12,data:h},{type:12,data:u},{type:12,data:l},...U(n[0].dims,n[1].dims)];t&&(M.push(...U(n[2].dims)),x.push("rank")),M.push(...U(o));let F=$=>{let J=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:I.length},{name:"filter_dims",type:"u32",length:A.length},{name:"dilations",type:"u32",length:A.length},{name:"effective_filter_dims",type:"u32",length:C.length},{name:"pads",type:"i32",length:R.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],Y=Fe(n[0].dataType),ee=i?1:2,W=i?2:3,Te=i?3:1,oe=z("W",n[1].dataType,n[1].dims.length,y),L=z("Dy",n[0].dataType,n[0].dims.length,c),Q=[L,oe];t&&Q.push(z("bias",n[2].dataType,[o[Te]].length,g));let te=V("result",n[0].dataType,o.length,g),me=()=>{let ce="";if(p)c===4?ce+=`
        let xValue = ${L.getByOffset("x_offset")};
        let wValue = ${oe.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:c===2?ce+=`
          dotProd = dotProd + dot(vec4<${Y}>(${L.getByOffset("x_offset")}, ${L.getByOffset("x_offset + 1u")}), vec4<${Y}>(${oe.getByOffset("w_offset")}, ${oe.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:c===1&&(ce+=`
          dotProd = dotProd + dot(vec4<${Y}>(${L.getByOffset("x_offset")}, ${L.getByOffset("x_offset + 1u")}, ${L.getByOffset("x_offset + 2u")}, ${L.getByOffset("x_offset + 3u")}), vec4<${Y}>(${oe.getByOffset("w_offset")}, ${oe.getByOffset("w_offset + 1u")}, ${oe.getByOffset("w_offset + 2u")}, ${oe.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(ce+=`
                  let xValue = ${i?L.getByOffset(`${L.indicesToOffset(`${L.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c}`):L.get("batch","inputChannel","idyR","idyC")};
        `,c===1)ce+=`
          let w_offset = ${oe.indicesToOffset(`${oe.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${oe.getByOffset(`w_offset / ${y}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let G=0;G<c;G++)ce+=`
            let wValue${G} = ${oe.getByOffset(`${oe.indicesToOffset(`${oe.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${G}, wOutChannel)`)} / ${y}`)};
            dotProd = dotProd + xValue[${G}] * wValue${G};`;return ce},Ke=()=>{if(m===0)return"";if(!p)throw new Error(`packInputAs4 ${p} is not true.`);let ce="";if(c===1){ce+="dotProd = dotProd";for(let G=0;G<m;G++)ce+=`
            + ${L.getByOffset(`x_offset + ${G}`)} * ${oe.getByOffset(`w_offset + ${G}`)}`;ce+=";"}else if(c===2){if(m!==2)throw new Error(`Invalid inputChannelsRemainder ${m}.`);ce+=`
          let xValue = ${L.getByOffset("x_offset")};
          let wValue = ${oe.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return ce},qe=`
            let outputIndices = ${te.offsetToIndices(`global_idx * ${g}`)};
            let batch = ${te.indicesGet("outputIndices",0)};
            let d1 = ${te.indicesGet("outputIndices",Te)};
            let r = ${te.indicesGet("outputIndices",ee)};
            let c = ${te.indicesGet("outputIndices",W)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${te.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${Y}(dyRCorner) + ${Y}(wR)) / ${Y}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${Y}(uniforms.Dy_shape[${ee}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${Y}(dyCCorner) + ${Y}(wC)) / ${Y}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${Y}(uniforms.Dy_shape[${W}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${p?`
                var x_offset = ${L.indicesToOffset(`${L.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c};
                var w_offset = ${oe.indicesToOffset(`${oe.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${y};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${p?4:c}) {
                  ${me()}
                  inputChannel = inputChannel + ${p?4:c};
                }
                ${Ke()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${t?` + bias[d1 / ${g}]`:""};
            ${te.setByOffset("global_idx","value")};
          `;return`
    ${$.registerUniforms(J).declareVariables(...Q,te)}
      ${$.mainStart()}
      ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${qe}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${e.cacheKey};${c}${y}${g}${p}${m}`,inputDependencies:x},getRunData:()=>({dispatchGroup:{x:w[0],y:w[1],z:w[2]},outputs:[{dims:r?r(o):o,dataType:n[0].dataType}],programUniforms:M}),getShaderSource:F}}});var AE,OE,PE,Av,Ov,EE,Pv,CE,Ev,Cv=N(()=>{"use strict";$v();_n();Xr();AE=(n,e,r,t,o,i)=>(n-1)*e+r+(t-1)*o+1-i,OE=(n,e,r,t,o)=>{let i=Math.floor(n/2);e==="SAME_UPPER"?(r[t]=i,r[o]=n-i):e==="SAME_LOWER"&&(r[t]=n-i,r[o]=i)},PE=(n,e,r,t,o,i,a,s,u,l)=>{let c=n.length-2,p=l.length===0;u.length<c&&u.push(...Array(c-u.length).fill(0));let h=n[0],m=e[s?3:1]*o;for(let g=0,y=n.length-c-(s?1:0);g<c;++g,++y){let T=n[y],w=p?T*a[g]:l[g],x=AE(T,a[g],i[g],e[y],r[g],w);OE(x,t,i,g,g+c),p&&l.push(a[g]*(T-1)+u[g]+(e[y]-1)*r[g]+1-i[g]-i[g+c])}l.splice(0,0,h),l.splice(s?3:1,0,m)},Av=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0||n.kernelShape.reduce((p,h)=>p*h,1)===0){r.length=0;for(let p=2;p<e[1].dims.length;++p)r.push(e[1].dims[p])}let t=n.format==="NHWC";r.splice(0,0,e[1].dims[0]),r.splice(t?3:1,0,e[1].dims[1]);let o=n.pads.slice(),i=n.outputShape.slice(),a=n.outputPadding.slice(),s=e[0].dims,u=n.dilations.slice();if(u.reduce((p,h)=>p+h,0)===0){let p=e[0].dims.length-2;u=new Array(p).fill(1)}let l=n.strides.slice();if(l.reduce((p,h)=>p+h,0)===0){let p=e[0].dims.length-2;l=new Array(p).fill(1)}PE(s,r,u,n.autoPad,n.group,o,l,t,a,i);let c=Object.assign({},n);return Object.assign(c,{kernelShape:r,pads:o,outputPadding:a,outputShape:i,dilations:u,strides:l}),c},Ov=n=>{let e=Ga(n),r=n.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof n.autoPad>"u"?0:n.autoPad],o=n.dilations,i=n.group,a=n.kernelShape,s=n.pads,u=n.strides,l=n.wIsConst(),c=n.outputPadding,p=n.outputShape;return{autoPad:t,format:r,dilations:o,group:i,kernelShape:a,outputPadding:c,outputShape:p,pads:s,strides:u,wIsConst:l,...e,cacheKey:`${n.format};${e.activation};`}},EE=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4&&n[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(n[0].dims.length!==n[1].dims.length)throw new Error("filter does not have same dimension as input");let r=n[0].dims[e.format==="NHWC"?n[0].dims.length-1:1],t=n[1].dims[0];if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=n[1].dims[1]*e.group;if(n.length===3&&(n[2].dims.length!==1||n[2].dims[0]!==o))throw new Error("invalid bias");let i=n[0].dims.length-2;if(e.dilations.reduce((c,p)=>c+p,0)>0&&e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.reduce((c,p)=>c+p,0)>0&&e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.reduce((c,p)=>c+p,0)>0&&e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i&&e.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.reduce((c,p)=>c+p,0)>0&&e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==n[0].dims.length-2)throw new Error("invalid output shape")},Pv=(n,e,r,t)=>{let o=n.kernelCustomData.wT??n.compute(st(e[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=o);let i=[e[0],o];e.length===3&&i.push(e[2]),n.compute(Sv(i,r,t),{inputs:i})},CE=(n,e)=>{let r=e.format==="NHWC",t=[n.inputs[0].reshape(r?[n.inputs[0].dims[0],1,n.inputs[0].dims[1],n.inputs[0].dims[2]]:[n.inputs[0].dims[0],n.inputs[0].dims[1],1,n.inputs[0].dims[2]]),n.inputs[1].reshape([n.inputs[1].dims[0],n.inputs[1].dims[1],1,n.inputs[1].dims[2]])];n.inputs.length===3&&t.push(n.inputs[2]);let o=e.kernelShape;(o.length===0||o[0]===0)&&(o=[n.inputs[1].dims[2]]);let i=e.dilations;(i.length===0||i[0]===0)&&(i=[1]);let a=e.strides;(a.length===0||a[0]===0)&&(a=[1]);let s=e.pads;s.length===0&&(s=[0,0]),s=[0,s[0],0,s[1]],a=[1].concat(a),i=[1].concat(i),o=[1].concat(o);let u=e.outputPadding;u=[0].concat(u);let l=Av({...e,pads:s,strides:a,dilations:i,kernelShape:o,outputPadding:u},t);Pv(n,t,l,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},Ev=(n,e)=>{if(EE(n.inputs,e),n.inputs[0].dims.length===3)CE(n,e);else{let r=Av(e,n.inputs);Pv(n,n.inputs,r)}}});var DE,Dv,kv,Nv=N(()=>{"use strict";ue();pe();Je();he();DE=(n,e,r,t)=>{let o=D.size(e),i=e.length,a=z("input",n,i),s=V("output",n,i),u=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),l=D.normalizeAxis(u,i),c=p=>{let h=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,m=Z("uniforms.input_shape","uniforms.axis",i),g=t.reverse?h+(t.exclusive?" + 1":""):"0",y=t.reverse?m:h+(t.exclusive?"":" + 1");return`
                ${p.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,s)}
                ${p.mainStart()}
                  ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${s.offsetToIndices("global_idx")};
                  var sum = ${s.type.value}(0);
                  let first : i32 = ${g};
                  let last : i32 = ${y};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${s.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:e,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:l},...U(e,e)]}),getShaderSource:c}},Dv=(n,e)=>{let r=n.inputs[0].dims,t=n.inputs[0].dataType,o=n.inputs[1];n.compute(DE(t,r,o,e),{inputs:[0]})},kv=n=>{let e=n.exclusive===1,r=n.reverse===1;return le({exclusive:e,reverse:r})}});var kE,NE,LE,Lv,Rv,zv=N(()=>{"use strict";ue();pe();Je();he();kE=n=>{if(!n||n.length!==1)throw new Error("DepthToSpace requires 1 input.");if(n[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},NE=(n,e,r,t)=>{let o=[];o.push(`fn perm(i: ${t.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<e;++i)o.push(r.indicesSet("a",n[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},LE=(n,e)=>{let r,t,o,i,a,s,u=e.format==="NHWC",l=e.blocksize,c=e.mode==="DCR";u?([r,t,o,i]=n.dims,a=c?[r,t,o,l,l,i/l**2]:[r,t,o,i/l**2,l,l],s=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,t,o,i]=[n.dims[0],n.dims[2],n.dims[3],n.dims[1]],a=c?[r,l,l,i/l**2,t,o]:[r,i/l**2,l,l,t,o],s=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let p=n.reshape(a),h=p.dims.length,m=n.dataType,g=z("a",m,h),y=V("output",m,h),T=w=>`
  ${w.registerUniform("output_size","u32").declareVariables(g,y)}

  ${NE(s,h,g,y)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${y.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${y.setByOffset("global_idx",g.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${n.dims};${e.blocksize};${e.mode}`,inputDependencies:["rank"]},getRunData:w=>{let x=u?[r,t*l,o*l,i/l**2]:[r,i/l**2,t*l,o*l],I=D.size(x),A=p.dims,P=D.sortBasedOnPerm(A,s);return{outputs:[{dims:x,dataType:w[0].dataType}],dispatchGroup:{x:Math.ceil(I/64)},programUniforms:[{type:12,data:I},...U(A,P)]}},getShaderSource:T}},Lv=(n,e)=>{kE(n.inputs),n.compute(LE(n.inputs[0],e))},Rv=n=>le({blocksize:n.blocksize,mode:n.mode,format:n.format})});var kc,Ka,Mv,RE,zE,Nc,Lc,Bv,ME,Fv,Vv,Gv=N(()=>{"use strict";ue();pe();Je();he();kc="[a-zA-Z]|\\.\\.\\.",Ka="("+kc+")+",Mv="^"+Ka+"$",RE="("+Ka+",)*"+Ka,zE="^"+RE+"$",Nc=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,r){let t=this.symbolToIndices.get(e);t===void 0?t=[r]:t.push(r),this.symbolToIndices.set(e,t)}},Lc=class{constructor(e,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[t,o]=r.includes("->")?r.split("->",2):[r,""];if(!t.match(RegExp(zE)))throw new Error("Invalid LHS term");if(t.split(",").forEach((s,u)=>{let l=e[u].dims.slice();if(!s.match(RegExp(Mv)))throw new Error("Invalid LHS term");let c=this.processTerm(s,!0,l,u);this.lhs.push(c)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([s,u])=>u.count===1||s==="...").map(([s])=>s).join("");else if(!o.match(RegExp(Ka)))throw new Error("Invalid RHS");o.match(RegExp(kc,"g"))?.forEach(s=>{if(s==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let u=this.symbolToInfo.get(s);if(u===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(u.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(e,r,t){let o=this.symbolToInfo.get(e);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(t)}else o={count:1,dimValue:r,inputIndices:[t]};this.symbolToInfo.set(e,o)}processTerm(e,r,t,o=-1){let i=t.length,a=!1,s=[],u=0;if(!e.match(RegExp(Mv))&&!r&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(kc,"g")),c=new Nc(o);return l?.forEach((p,h)=>{if(p==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let m=i-l.length+1;if(m<0)throw new Error("Ellipsis out of bounds");if(s=t.slice(u,u+m),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let g=0;g<s.length;g++){let y=String.fromCharCode(48+g);c.addSymbol(y,h+g),this.addSymbol(y,t[u++],o)}}else c.addSymbol(p,h+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(p,t[u++],o)}),c}},Bv=n=>n+"_max",ME=(n,e,r,t)=>{let i=n.map(c=>c.length).map((c,p)=>z(`input${p}`,e,c)),a=D.size(t),s=V("output",e,t.length),u=[...r.symbolToInfo.keys()].filter(c=>!r.rhs.symbolToIndices.has(c)),l=c=>{let p=[],h="var prod = 1.0;",m="var sum = 0.0;",g="sum += prod;",y=[],T=[],w=[],x=[],I=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((P,C)=>{if(r.rhs.symbolToIndices.has(C)){let R=r.rhs.symbolToIndices.get(C)?.[0];R!==void 0&&r.lhs.forEach((M,F)=>{if(P.inputIndices.includes(F)){let $=M.symbolToIndices.get(C);if($===void 0)throw new Error("Invalid symbol error");$.forEach(J=>{p.push(`${i[F].indicesSet(`input${F}Indices`,J,s.indicesGet("outputIndices",R))}`)})}})}else r.lhs.forEach((R,M)=>{if(P.inputIndices.includes(M)){let F=R.symbolToIndices.get(C);if(F===void 0)throw new Error("Invalid symbol error");F.forEach($=>{y.push(`${i[M].indicesSet(`input${M}Indices`,$,`${C}`)}`)}),x.push(`prod *= ${i[M].getByIndices(`input${M}Indices`)};`)}}),T.push(`for(var ${C}: u32 = 0; ${C} < uniforms.${Bv(C)}; ${C}++) {`),w.push("}")});let A=I?[...p,`let sum = ${i.map((P,C)=>P.getByIndices(`input${C}Indices`)).join(" * ")};`]:[...p,m,...T,...y,h,...x,g,...w];return`
            ${c.registerUniforms(u.map(P=>({name:`${Bv(P)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,s)}

            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${i.map((P,C)=>`var input${C}Indices: ${i[C].type.indices};`).join(`
`)}
            ${A.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:n.map(()=>"rank")},getRunData:()=>{let c=u.filter(h=>r.symbolToInfo.has(h)).map(h=>({type:12,data:r.symbolToInfo.get(h)?.dimValue||0}));c.push({type:12,data:a});let p=n.map((h,m)=>[...U(h)]).reduce((h,m)=>h.concat(m),c);return p.push(...U(t)),{outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:p}},getShaderSource:l}},Fv=(n,e)=>{let r=new Lc(n.inputs,e.equation),t=r.outputDims,o=n.inputs.map((i,a)=>i.dims);n.compute(ME(o,n.inputs[0].dataType,r,t))},Vv=n=>{let e=n.equation.replace(/\s+/g,"");return le({equation:e})}});var BE,Uv,FE,VE,Wv,Hv=N(()=>{"use strict";ue();pe();he();BE=n=>{if(!n||n.length!==2)throw new Error("Expand requires 2 input.");let e=n[0].dims,r=Array.from(n[1].getBigInt64Array(),Number),t=r.length<e.length?0:r.length-e.length,o=e.length<r.length?0:e.length-r.length;for(;t<r.length&&o<e.length;++t,++o)if(r[t]!==e[o]&&r[t]!==1&&e[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Uv=(n,e)=>{let r=n.length-e.length,t=[];for(let o=0;o<r;++o)t.push(n[o]);for(let o=0;o<e.length;++o)t.push(e[o]===1?n[o+r]:e[o]);return t},FE=(n,e)=>n.length>e.length?Uv(n,e):Uv(e,n),VE=n=>{let e=n[0].dims,r=Array.from(n[1].getBigInt64Array(),Number),t=FE(e,r),o=n[0].dataType,i=o===9||D.size(e)===1,a=o===9||e.length>0&&e[e.length-1]%4===0?4:1,s=i||t.length>0&&t[t.length-1]%4===0?4:1,u=Math.ceil(D.size(t)/s),l=p=>{let h=z("input",o,e.length,a),m=V("output",o,t.length,s),g;if(o===9){let y=(T,w,x="")=>`
          let outputIndices${w} = ${m.offsetToIndices(`outputOffset + ${w}u`)};
          let offset${w} = ${h.broadcastedIndicesToOffset(`outputIndices${w}`,m)};
          let index${w} = offset${w} / 4u;
          let component${w} = offset${w} % 4u;
          ${T}[${w}] = ${x}(${h.getByOffset(`index${w}`)}[component${w}]);
        `;g=`
        let outputOffset = global_idx * ${s};
        var data = vec4<u32>(0);
        ${y("data",0,"u32")}
        ${y("data",1,"u32")}
        ${y("data",2,"u32")}
        ${y("data",3,"u32")}
        ${m.setByOffset("global_idx","data")}
      }`}else g=`
        let outputIndices = ${m.offsetToIndices(`global_idx * ${s}`)};
        let inputOffset = ${h.broadcastedIndicesToOffset("outputIndices",m)};
        let data = ${m.type.value}(${h.getByOffset(`inputOffset / ${a}`)});
        ${m.setByOffset("global_idx","data")}
      }`;return`
    ${p.registerUniform("vec_size","u32").declareVariables(h,m)}
    ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${g}`},c=[{type:12,data:u},...U(e,t)];return{name:"Expand",shaderCache:{hint:`${t.length};${a}${s}`,inputDependencies:["rank"]},getShaderSource:l,getRunData:()=>({outputs:[{dims:t,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c})}},Wv=n=>{BE(n.inputs),n.compute(VE(n.inputs),{inputs:[0]})}});var GE,qv,jv=N(()=>{"use strict";ue();pe();he();Va();GE=n=>{let e=n[0].dataType,r=D.size(n[0].dims),t=D.size(n[1].dims),o=t%4===0,i=a=>{let s=z("x",e,[1],4),u=z("bias",e,[1],4),l=V("y",e,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],p=m=>`
      let bias${m}_offset: u32 = (global_idx * 4 + ${m}) % uniforms.bias_size;
      let bias${m} = ${u.getByOffset(`bias${m}_offset / 4`)}[bias${m}_offset % 4];`,h=o?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${p(0)}${p(1)}${p(2)}${p(3)}
      let bias = ${s.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(c).declareVariables(s,u,l)}

    ${Sc(at(e))}

    ${a.mainStart(Gn)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${s.getByOffset("global_idx")};
      ${h}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",$c("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:t}],dispatchGroup:{x:Math.ceil(r/Gn/4)}})}},qv=n=>{n.inputs.length<2||D.size(n.inputs[1].dims)===0?G0(n):n.compute(GE(n.inputs))}});var UE,WE,Kv,Xv,Zv=N(()=>{"use strict";ue();pe();Je();he();UE=n=>{if(!n||n.length!==2)throw new Error("Gather requires 2 inputs.")},WE=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r.length,i=D.normalizeAxis(e.axis,o),a=r.slice(0);a.splice(i,1,...t);let s=r[i],u=n[0].dataType===9?4:1,l=Math.ceil(D.size(a)/u),c=[{type:12,data:l},{type:6,data:s},{type:12,data:i},...U(n[0].dims,n[1].dims,a)],p=h=>{let m=z("data",n[0].dataType,n[0].dims.length,u),g=z("inputIndices",n[1].dataType,n[1].dims.length),y=V("output",n[0].dataType,a.length,u),T=x=>{let I=t.length,A=`var indicesIndices${x}  = ${g.type.indices}(0);`;for(let P=0;P<I;P++)A+=`${I>1?`indicesIndices${x}[${P}]`:`indicesIndices${x}`} = ${a.length>1?`outputIndices${x}[uniforms.axis + ${P}]`:`outputIndices${x}`};`;A+=`
          var idx${x} = ${g.getByIndices(`indicesIndices${x}`)};
          if (idx${x} < 0) {
            idx${x} = idx${x} + uniforms.axisDimLimit;
          }
          var dataIndices${x} : ${m.type.indices};
        `;for(let P=0,C=0;P<o;P++)P===i?(A+=`${o>1?`dataIndices${x}[${P}]`:`dataIndices${x}`} = u32(idx${x});`,C+=I):(A+=`${o>1?`dataIndices${x}[${P}]`:`dataIndices${x}`} = ${a.length>1?`outputIndices${x}[${C}]`:`outputIndices${x}`};`,C++);return A},w;if(n[0].dataType===9){let x=(I,A,P="")=>`
          let outputIndices${A} = ${y.offsetToIndices(`outputOffset + ${A}u`)};
          ${T(A)};
          let offset${A} = ${m.indicesToOffset(`dataIndices${A}`)};
          let index${A} = offset${A} / 4u;
          let component${A} = offset${A} % 4u;
          ${I}[${A}] = ${P}(${m.getByOffset(`index${A}`)}[component${A}]);
        `;w=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${x("value",0,"u32")}
        ${x("value",1,"u32")}
        ${x("value",2,"u32")}
        ${x("value",3,"u32")}
        ${y.setByOffset("global_idx","value")}
      `}else w=`
      let outputIndices = ${y.offsetToIndices("global_idx")};
      ${T("")};
      let value = ${m.getByIndices("dataIndices")};
      ${y.setByOffset("global_idx","value")};
      `;return`
      ${h.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(m,g,y)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${w}
      }`};return{name:"Gather",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:p}},Kv=n=>le({axis:n.axis}),Xv=(n,e)=>{let r=n.inputs;UE(r),n.compute(WE(n.inputs,e))}});var HE,Jv,Qv,Yv=N(()=>{"use strict";ue();pe();he();HE=(n,e,r,t,o,i,a,s,u)=>{let l=[{type:12,data:i},{type:12,data:t},{type:12,data:o},{type:12,data:r},{type:12,data:a},{type:12,data:s},{type:12,data:u}],c=[i];l.push(...U(e.dims,c));let p=h=>{let m=z("indices_data",e.dataType,e.dims.length),g=V("input_slice_offsets_data",12,1,1),y=[m,g],T=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${h.registerUniforms(T).declareVariables(...y)}
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
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return n.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:c,dataType:n.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:l}),getShaderSource:p},{inputs:[e],outputs:[-1]})[0]},Jv=(n,e)=>{let r=n.inputs,t=r[0].dims,o=r[0].dataType,i=r[1].dims,a=i[i.length-1],s=D.sizeToDimension(i,i.length-1),u=D.sizeFromDimension(t,e.batchDims+a),l=D.sizeToDimension(t,e.batchDims),c=D.sizeFromDimension(t,e.batchDims),p=s/l,h=new Array(a),m=u;for(let A=0;A<a;++A)h[a-1-A]=m,m*=t[e.batchDims+a-1-A];let g=HE(n,r[1],h,e.batchDims,t,s,p,c,a),y=e.batchDims+a;if(y>t.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let T=i.slice(0,-1).concat(t.slice(y)),w=D.size(T),x=[{type:12,data:w},{type:12,data:u},...U(r[0].dims,g.dims,T)],I=A=>{let P=z("data",r[0].dataType,r[0].dims.length),C=z("slice_offsets",12,g.dims.length),R=V("output",r[0].dataType,T.length);return`
          ${A.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(P,C,R)}
            ${A.mainStart()}
            ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};n.compute({name:"GatherND",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:T,dataType:o}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:x}),getShaderSource:I},{inputs:[r[0],g]})},Qv=n=>({batchDims:n.batch_dims,cacheKey:""})});var qE,jE,ew,tw,rw=N(()=>{"use strict";ue();pe();Je();he();qE=(n,e)=>{if(n.length<3||n.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=D.normalizeAxis(e.quantizeAxis,n[0].dims.length),t=e.blockSize,o=n[0],i=n[2],a=n.length===4?n[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((s,u)=>u===r?Math.ceil(s/t)===i.dims[u]:s===i.dims[u]).reduce((s,u)=>s&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==i.dims.length||!a.dims.map((s,u)=>s===i.dims[u]).reduce((s,u)=>s&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},jE=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r.length,i=D.normalizeAxis(e.gatherAxis,o),a=D.normalizeAxis(e.quantizeAxis,o),s=r.slice(0);s.splice(i,1,...t);let u=D.size(s),l=n[2].dataType,p=n[0].dataType===22,h=[{type:12,data:u},{type:12,data:a},{type:12,data:i},{type:12,data:e.blockSize},...U(...n.map((g,y)=>g.dims),s)],m=g=>{let y=z("data",n[0].dataType,n[0].dims.length),T=z("inputIndices",n[1].dataType,n[1].dims.length),w=z("scales",n[2].dataType,n[2].dims.length),x=n.length>3?z("zeroPoint",n[3].dataType,n[3].dims.length):void 0,I=V("output",l,s.length),A=[y,T,w];x&&A.push(x);let P=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${g.registerUniforms(P).declareVariables(...A,I)}
        ${g.mainStart()}
        let output_indices = ${I.offsetToIndices("global_idx")};
        var indices_indices = ${T.type.indices}(0);
        ${t.length>1?`
          for (var i: u32 = 0; i < ${t.length}; i++) {
            let index = ${I.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${T.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${I.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${y.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${I.indicesGet("output_indices","i")};
          ${y.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${T.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[i]};
        }
        ${y.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${s.length}; i++) {
          let index = ${I.indicesGet("output_indices",`i + ${t.length} - 1`)};
          ${y.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${y.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${y.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${p?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
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
              let zero_point_vec = ${p?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${at(l)}(quantized_data - zero_point) * scale;
        ${I.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${e.cacheKey};${n.filter((g,y)=>y!==1).map(g=>g.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:n.length},(g,y)=>"rank")},getRunData:()=>({outputs:[{dims:s,dataType:l}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:h}),getShaderSource:m}},ew=(n,e)=>{let r=n.inputs;qE(r,e),n.compute(jE(n.inputs,e))},tw=n=>le({blockSize:n.blockSize,gatherAxis:n.gatherAxis,quantizeAxis:n.quantizeAxis})});var KE,XE,nw,ow,iw=N(()=>{"use strict";ue();pe();Je();he();KE=n=>{if(!n||n.length!==2)throw new Error("GatherElements requires 2 inputs.");if(n[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(n[0].dims.length!==n[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},XE=(n,e)=>{let r=n[0].dims,t=n[0].dataType,o=r.length,i=n[1].dims,a=n[1].dataType,s=D.normalizeAxis(e.axis,o),u=r[s],l=i.slice(0),c=D.size(l),p=z("input",t,o),h=z("indicesInput",a,i.length),m=V("output",t,l.length),g=[{type:12,data:c},{type:6,data:u},{type:12,data:s}];return g.push(...U(r,i,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:g}),getShaderSource:w=>`
      ${w.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(p,h,m)}
      ${w.mainStart()}
      ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${m.offsetToIndices("global_idx")};

      var idx = ${h.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${p.type.indices}(outputIndices);
      ${p.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${p.getByIndices("inputIndices")};

      ${m.setByOffset("global_idx","value")};
  }`}},nw=n=>le({axis:n.axis}),ow=(n,e)=>{let r=n.inputs;KE(r),n.compute(XE(n.inputs,e))}});var ZE,JE,aw,sw,uw=N(()=>{"use strict";ue();pe();he();ZE=n=>{if(!n)throw new Error("Input is missing");if(n.length<2||n.length>3)throw new Error("Invaid input number.");if(n.length===3&&n[2].dims.length>2)throw new Error("Invalid input shape of C");if(n[0].dataType!==n[1].dataType||n.length===3&&n[0].dataType!==n[2].dataType)throw new Error("Input types are mismatched")},JE=(n,e)=>{let r=n[0].dims.slice(),t=n[1].dims.slice(),[o,i,a]=Oa.getShapeOfGemmResult(r,e.transA,t,e.transB,n.length===3?n[2].dims:void 0),s=[o,i];if(!s)throw new Error("Can't use gemm on the given tensors");let u=16,l=Math.ceil(i/u),c=Math.ceil(o/u),p=!0,h=D.size(s),m=[{type:12,data:p?l:h},{type:12,data:o},{type:12,data:i},{type:12,data:a},{type:1,data:e.alpha},{type:1,data:e.beta}],g=["type","type"];n.length===3&&(m.push(...U(n[2].dims)),g.push("rank")),m.push(...U(s));let y=w=>{let x="";e.transA&&e.transB?x="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":e.transA&&!e.transB?x="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!e.transA&&e.transB?x="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!e.transA&&!e.transB&&(x="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let I=e.alpha===1?"":"value *= uniforms.alpha;",A=z("a",n[0].dataType,n[0].dims),P=z("b",n[1].dataType,n[1].dims),C=A.type.value,R=null,M=[A,P];n.length===3&&(R=z("c",n[2].dataType,n[2].dims.length),M.push(R));let F=V("output",n[0].dataType,s.length);M.push(F);let $=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${w.registerUniforms($).declareVariables(...M)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${C}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${x}
    }

    ${I}
    ${R!=null?`let cOffset = ${R.broadcastedIndicesToOffset("vec2(m, n)",F)}; value += ${C}(uniforms.beta) * ${R.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},T=w=>{let x=z("a",n[0].dataType,n[0].dims),I=z("b",n[1].dataType,n[1].dims),A=null,P=[x,I];n.length===3&&(A=z("c",n[2].dataType,n[2].dims.length),P.push(A));let C=V("output",n[0].dataType,s.length);P.push(C);let R=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],M="",F="";e.transA&&e.transB?(F=`
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
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
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
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
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
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,M="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let $=e.alpha===1?"":"value *= uniforms.alpha;";return`
  ${w.registerUniforms(R).declareVariables(...P)}
  var<workgroup> tile_a: array<array<${x.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${I.type.storage}, ${u}>, ${u}>;
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

    ${$}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${A!=null?`let cOffset = ${A.broadcastedIndicesToOffset("vec2(m, n)",C)}; value += ${C.type.value}(uniforms.beta) * ${A.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return p?{name:"GemmShared",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:s,dataType:n[0].dataType}],dispatchGroup:{x:l*c},programUniforms:m}),getShaderSource:T}:{name:"Gemm",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:s,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:m}),getShaderSource:y}},aw=n=>{let e=n.transA,r=n.transB,t=n.alpha,o=n.beta;return{transA:e,transB:r,alpha:t,beta:o,cacheKey:`${n.transA};${n.transB};${n.alpha===1}`}},sw=(n,e)=>{ZE(n.inputs),n.compute(JE(n.inputs,e))}});var Zr,vn,lo,co,QE,YE,eC,tC,rC,nC,oC,iC,lw,cw,dw=N(()=>{"use strict";ue();pe();Je();he();[Zr,vn,lo,co]=[0,1,2,3],QE=n=>{if(n[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(n[0].dims.length!==n[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(n[0].dims.length-2!==n[1].dims[n[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${n[0].dims.length-2}`);if(n[0].dims[0]!==n[1].dims[0])throw new Error("grid batch size must match input batch size")},YE=`
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
`,eC=n=>`
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
`,tC=n=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${n.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,rC=n=>`
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
`,nC=(n,e,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${e} {
     var pixel = ${e}(0);
     var indices = vec4<u32>(0);
     indices[${Zr}] = batch;
     indices[${vn}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
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
`,oC=(n,e,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Zr}], indices[${vn}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Zr}], indices[${vn}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Zr}], indices[${vn}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Zr}], indices[${vn}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Zr}], indices[${vn}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Zr}], indices[${vn}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${n.setByOffset("global_idx","result")}`,iC=(n,e)=>{let r=z("x",n[0].dataType,n[0].dims.length),t=[n[1].dims[0],n[1].dims[1],n[1].dims[2]],o=z("grid",n[1].dataType,t.length,2),i=[n[0].dims[0],n[0].dims[1],n[1].dims[1],n[1].dims[2]];e.format==="NHWC"&&(i=[n[0].dims[0],n[1].dims[1],n[1].dims[2],n[0].dims[3]],[Zr,vn,lo,co]=[0,3,1,2]);let a=V("output",n[0].dataType,i.length),s=r.type.value,u=D.size(i),l=[{type:12,data:u},...U(n[0].dims,t,i)],c=p=>`
  ${p.registerUniform("output_size","u32").declareVariables(r,o,a)}
  ${YE}
  ${eC(s)}
  ${tC(e)}
  ${rC(e)}
  ${nC(r,s,e)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
      var grid_indices = vec3<u32>(indices[${Zr}], indices[${lo}], indices[${co}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${oC(a,s,e)}
  }`;return{name:"GridSample",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:["type","type"]},getRunData:p=>{let h=D.size(i);return{outputs:[{dims:i,dataType:p[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:l}},getShaderSource:c}},lw=(n,e)=>{QE(n.inputs),n.compute(iC(n.inputs,e))},cw=n=>le({alignCorners:n.align_corners,mode:n.mode,paddingMode:n.padding_mode,format:n.format})});var Tt,uC,fw,pw,lC,qo,hw,Rc=N(()=>{"use strict";ue();pe();Je();Na();Ba();he();Xr();Tt=(n,e)=>n.length>e&&n[e].dims.length>0?n[e]:void 0,uC=(n,e)=>{let r=n[0],t=Tt(n,1),o=Tt(n,2),i=Tt(n,3),a=Tt(n,4),s=Tt(n,5),u=Tt(n,6),l=Tt(n,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=r.dims[0],p=r.dims[1],h=r.dims.length===3?r.dims[2]:e.numHeads*r.dims[4],m=p,g=0,y=0,T=Math.floor(h/e.numHeads);if(u&&l&&D.size(u.dims)&&D.size(l.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==c||u.dims[1]!==e.numHeads||u.dims[3]!==T)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==c||l.dims[1]!==e.numHeads||l.dims[3]!==T)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=u.dims[2],y=u.dims[2]}else if(u&&D.size(u.dims)||l&&D.size(l.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let w;if(t&&D.size(t.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(t.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');w=2,m=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==T)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');w=5,m=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==T)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');w=0,m=t.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==e.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');w=3}if(i&&D.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(t&&t.dims.length===5&&t.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let x=g+m,I=0;if(a&&D.size(a.dims)>0){I=8;let R=a.dims;throw R.length===1?R[0]===c?I=1:R[0]===3*c+2&&(I=3):R.length===2&&R[0]===c&&R[1]===x&&(I=5),I===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let A=!1,P=h;if(o&&D.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(m!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');P=o.dims[2]}else{if(m!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');P=o.dims[1]*o.dims[3],A=!0}}let C=!1;if(a&&D.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(s&&D.size(s.dims)>0){if(s.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(s.dims[0]!==c||s.dims[1]!==e.numHeads||s.dims[2]!==p||s.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:p,pastSequenceLength:g,kvSequenceLength:m,totalSequenceLength:x,maxSequenceLength:y,inputHiddenSize:0,hiddenSize:h,vHiddenSize:P,headSize:T,vHeadSize:Math.floor(P/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:I,scale:e.scale,broadcastResPosBias:C,passPastInKv:A,qkvFormat:w}},fw=n=>le({...n}),pw=le({perm:[0,2,1,3]}),lC=(n,e,r,t,o,i,a)=>{let s=[t,o,i],u=D.size(s),l=[{type:12,data:u},{type:12,data:a},{type:12,data:i}],c=p=>{let h=V("qkv_with_bias",e.dataType,s),m=z("qkv",e.dataType,s),g=z("bias",r.dataType,s),y=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${p.registerUniforms(y).declareVariables(m,g,h)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return n.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:s,dataType:e.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:c},{inputs:[e,r],outputs:[-1]})[0]},qo=(n,e,r,t,o,i,a,s)=>{let u=i;if(a&&D.size(a.dims)>0){if(t===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=lC(n,i,a,e,t,r*o,s),u=u.reshape([e,t,r,o]),r===1||t===1?u:n.compute(st(u,pw.perm),{inputs:[u],outputs:[-1]})[0]}else return i.dims.length===3&&(u=i.reshape([e,t,r,o])),r===1||t===1?u:n.compute(st(u,pw.perm),{inputs:[u],outputs:[-1]})[0]},hw=(n,e)=>{let r=uC(n.inputs,e),t=n.inputs[0],o=Tt(n.inputs,1),i=Tt(n.inputs,2),a=Tt(n.inputs,3),s=Tt(n.inputs,4),u=Tt(n.inputs,5),l=Tt(n.inputs,6),c=Tt(n.inputs,7);if(t.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let p=o&&i&&o.dims.length===4&&i.dims.length===4,h=qo(n,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t,a,0);if(p)return uo(n,h,o,i,s,void 0,l,c,u,r);if(!o||!i)throw new Error("key and value must be provided");let m=qo(n,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,a,r.hiddenSize),g=qo(n,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,a,2*r.hiddenSize);uo(n,h,m,g,s,void 0,l,c,u,r)}});var cC,dC,pC,fC,zc,mw,gw,Mc=N(()=>{"use strict";ue();pe();Je();he();cC=n=>{if(!n||n.length<1)throw new Error("too few inputs")},dC=(n,e)=>{let r=[],t=e.numOutputs;return n[1].dims[0]>0&&(n[1].getBigInt64Array().forEach(o=>r.push(Number(o))),t=r.length),le({numOutputs:t,axis:e.axis,splitSizes:r})},pC=n=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${n}u; i += 1u ) {
    if (index < ${Z("uniforms.size_in_split_axis","i",n)}) {
        return i;
    }
    }
    return ${n}u;
}`,fC=n=>{let e=n.length,r=[];for(let t=0;t<e;++t){let o=n[t].setByIndices("indices","input[global_idx]");e===1?r.push(o):t===0?r.push(`if (output_number == ${t}u) { ${o} }`):t===e-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${t}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${n[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},zc=(n,e)=>{let r=n[0].dims,t=D.size(r),o=n[0].dataType,i=D.normalizeAxis(e.axis,r.length),a=new Array(e.numOutputs),s=z("input",o,r.length),u=new Array(e.numOutputs),l=[],c=[],p=0,h=[{type:12,data:t}];for(let g=0;g<e.numOutputs;g++){p+=e.splitSizes[g],u[g]=p;let y=r.slice();y[i]=e.splitSizes[g],c.push(y),a[g]=V(`output${g}`,o,y.length),l.push({dims:c[g],dataType:n[0].dataType})}h.push({type:12,data:u},...U(r,...c));let m=g=>`
  ${g.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(s,...a)}
  ${pC(u.length)}
  ${fC(a)}

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
  }`;return{name:"Split",shaderCache:{hint:e.cacheKey,inputDependencies:["rank"]},getShaderSource:m,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(t/64)},programUniforms:h})}},mw=(n,e)=>{cC(n.inputs);let r=n.inputs.length===1?e:dC(n.inputs,e);n.compute(zc(n.inputs,r),{inputs:[0]})},gw=n=>{let e=n.axis,r=n.splitSizes,t=n.numOutputs<0?r.length:n.numOutputs;if(t!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return le({axis:e,numOutputs:t,splitSizes:r})}});var hC,Xa,bw,Bc=N(()=>{"use strict";ue();pe();Je();he();hC=(n,e)=>{let[r,t,o,i]=n,{numHeads:a,rotaryEmbeddingDim:s}=e;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!D.areEqual(t.dims,[])&&!D.areEqual(t.dims,[1])&&t.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${t.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!D.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(s>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=r.dims[0],l=r.dims[r.dims.length-2],c=o.dims[0],p=D.sizeFromDimension(r.dims,1)/l,h=s===0?o.dims[1]*2:p/a;if(s>h)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(t.dims.length===2){if(u!==t.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${t.dims[0]}`);if(l!==t.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${t.dims[1]}`)}if(h/2!==o.dims[1]&&s/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(l>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Xa=(n,e)=>{let{interleaved:r,numHeads:t,rotaryEmbeddingDim:o,scale:i}=e,a=n[0].dims[0],s=D.sizeFromDimension(n[0].dims,1),u=n[0].dims[n[0].dims.length-2],l=s/u,c=n[2].dims[1],p=o===0?c*2:l/t,h=new Array(a,u,l/p,p-c),m=D.computeStrides(h),g=[{type:1,data:i},{type:12,data:h},{type:12,data:m},...n[0].dims.length===3?new Array({type:12,data:[s,l,p,1]}):[],...n[0].dims.length===4?new Array({type:12,data:[s,p,u*p,1]}):[],...U(n[0].dims,n[1].dims,n[2].dims,n[3].dims,n[0].dims)],y=T=>{let w=z("input",n[0].dataType,n[0].dims.length),x=z("position_ids",n[1].dataType,n[1].dims.length),I=z("cos_cache",n[2].dataType,n[2].dims.length),A=z("sin_cache",n[3].dataType,n[3].dims.length),P=V("output",n[0].dataType,n[0].dims.length);return T.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:m.length},{name:"input_output_strides",type:"u32",length:m.length}]),`
        ${T.declareVariables(w,x,I,A,P)}

        ${T.mainStart(Gn)}
          let half_rotary_emb_dim = uniforms.${I.name}_shape[1];
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
            let re = ${w.getByOffset("i")} * ${I.get("position_id","bsnh[3]")} -
                ${w.getByOffset("j")} * ${A.get("position_id","bsnh[3]")};
            ${P.setByOffset("i","re")}
            let im = ${w.getByOffset("i")} * ${A.get("position_id","bsnh[3]")} +
                ${w.getByOffset("j")} * ${I.get("position_id","bsnh[3]")};
            ${P.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${P.setByOffset("k",w.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:le({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:n[0].dims,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(D.size(h)/Gn)},programUniforms:g})}},bw=(n,e)=>{hC(n.inputs,e),n.compute(Xa(n.inputs,e))}});var mC,gC,yw,bC,_w,vw=N(()=>{"use strict";Je();ue();Ba();Rc();Mc();Xr();Bc();he();mC=(n,e)=>{if(e.doRotary&&n.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=n[0],t=n[1],o=n[2],i=n[3],a=n[4];if(e.doRotary!==0&&n.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(e.localWindowSize!==-1)throw new Error("Local attention is not supported");if(e.softcap!==0)throw new Error("Softcap is not supported");if(e.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(e.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let s=!1,u=r.dims[0],l=r.dims[1],c=r.dims.length===3?s?r.dims[2]/3:r.dims[2]:e.numHeads*r.dims[4],p=l,h=0,m=!t||t.dims.length===0,g=Math.floor(m?c/(e.numHeads+2*e.kvNumHeads):c/e.numHeads);m&&(c=g*e.numHeads);let y=i&&i.dims.length!==0,T=a&&a.dims.length!==0;if(y&&i.dims.length===4&&i.dims[0]===u&&i.dims[1]!==e.kvNumHeads&&i.dims[2]===e.kvNumHeads&&i.dims[3]===g)throw new Error("BSNH pastKey/pastValue is not supported");if(y&&T){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');h=i.dims[2]}else if(y||T)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let x=1;if(t&&t.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(r.dims[2]%t.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');p=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==g)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');p=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==g)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');p=t.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==e.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');x=3}let I=0,A=!1,P=e.kvNumHeads?g*e.kvNumHeads:c;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(p!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');P=o.dims[2]}else{if(p!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');P=o.dims[1]*o.dims[3],A=!0}}let C=n.length>4?n[5]:void 0;if(C&&C.dims.length!==1&&C.dims[0]!==u)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:u,sequenceLength:l,pastSequenceLength:h,kvSequenceLength:p,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:c,vHiddenSize:P,headSize:g,vHeadSize:Math.floor(P/e.kvNumHeads),numHeads:e.numHeads,kvNumHeads:e.kvNumHeads,nReps:e.numHeads/e.kvNumHeads,pastPresentShareBuffer:!1,maskType:I,scale:e.scale,broadcastResPosBias:!1,passPastInKv:A,qkvFormat:x}},gC=le({perm:[0,2,1,3]}),yw=(n,e,r)=>{let t=e,o=r.kvNumHeads;return e.dims.length===3&&r.kvSequenceLength!==0&&(t=e.reshape([r.batchSize,r.kvSequenceLength,o,r.headSize]),t=n.compute(st(t,gC.perm),{inputs:[t],outputs:[-1]})[0]),t},bC=(n,e,r,t)=>{let o=7,i=["type","type"],a=[n*e],s=n*e,u=[{type:12,data:s},{type:12,data:e},{type:12,data:n}],l=c=>{let p=z("seq_lens",r.dataType,r.dims),h=z("total_seq_lens",t.dataType,t.dims),m=V("pos_ids",o,a),g=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${c.registerUniforms(g).declareVariables(p,h,m)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${h.getByOffset("0")});
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
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${n};${e}`,inputDependencies:i},getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u}),getShaderSource:l}},_w=(n,e)=>{let r=mC(n.inputs,e);if(n.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(n.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let t=n.inputs[0],o=n.inputs[1]&&n.inputs[1].dims.length>0?n.inputs[1]:void 0,i=n.inputs[2]&&n.inputs[2].dims.length>0?n.inputs[2]:void 0,a=n.inputs[3]&&n.inputs[3].dims.length!==0?n.inputs[3]:void 0,s=n.inputs[4]&&n.inputs[4].dims.length!==0?n.inputs[4]:void 0,u=n.inputs.length>4?n.inputs[5]:void 0,l=n.inputs.length>5?n.inputs[6]:void 0,c=r.kvNumHeads?r.kvNumHeads:r.numHeads,p=le({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,c*r.headSize,c*r.headSize]}),[h,m,g]=!o&&!i?n.compute(zc([t],p),{inputs:[t],outputs:[-1,-1,-1]}):[t,o,i],y,T;if(e.doRotary){let A=n.compute(bC(r.batchSize,r.sequenceLength,u,l),{inputs:[u,l],outputs:[-1]})[0],P=n.inputs[7],C=n.inputs[8],R=le({interleaved:e.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:e.scale}),M=[h,A,P,C],F=[-1];y=n.compute(Xa(M,R),{inputs:M,outputs:F})[0],M.splice(0,1,m);let $=le({interleaved:e.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:e.scale});T=n.compute(Xa(M,$),{inputs:M,outputs:F})[0]}let w=qo(n,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,e.doRotary?y:h,void 0,0),x=yw(n,e.doRotary?T:m,r),I=yw(n,g,r);uo(n,w,x,I,void 0,void 0,a,s,void 0,r,u,l)}});var ww,yC,_C,xw,Tw=N(()=>{"use strict";ue();pe();Xr();he();ww=(n,e,r,t,o,i,a,s)=>{let u=Pe(i),l=u===1?"f32":`vec${u}f`,c=u===1?"vec2f":`mat2x${u}f`,p=o*a,h=64;p===1&&(h=256);let m=[o,a,i/u],g=[o,a,2],y=["rank","type","type"],T=[];T.push(...U(m,g));let w=x=>{let I=z("x",e.dataType,3,u),A=z("scale",r.dataType,r.dims),P=z("bias",t.dataType,t.dims),C=V("output",1,3,2),R=[I,A,P,C];return`
  var<workgroup> workgroup_shared : array<${c}, ${h}>;
  const workgroup_size = ${h}u;
  ${x.declareVariables(...R)}
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
    workgroup_shared[local_idx] = ${c}(sum, squared_sum);
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
  }`};return n.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${s};${h}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:g,dataType:1}],dispatchGroup:{x:p},programUniforms:T}),getShaderSource:w},{inputs:[e,r,t],outputs:[-1]})[0]},yC=(n,e,r)=>{let t=e[0].dims,o=t,i=2,a=t[0],s=t[1],u=D.sizeFromDimension(t,i),l=Pe(u),c=D.size(o)/l,p=ww(n,e[0],e[1],e[2],a,u,s,r.epsilon),h=[a,s,u/l],m=[a,s],g=["type","none"],y=T=>{let w=z("x",e[0].dataType,h.length,l),x=z("scale_shift",1,m.length,2),I=V("output",e[0].dataType,h.length,l),A=[w,x,I];return`
  ${T.registerUniform("output_size","u32").declareVariables(...A)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${I.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${x.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${w.getByOffset("global_idx")} * ${I.type.value}(scale_shift.x) + ${I.type.value}(scale_shift.y);
      ${I.setByOffset("global_idx","value")};
  }`};n.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...U(h,m,h)]}),getShaderSource:y},{inputs:[e[0],p]})},_C=(n,e,r)=>{let t=e[0].dims,o=t,i=t[0],a=t[t.length-1],s=D.sizeFromDimension(t,1)/a,u=Pe(a),l=D.size(o)/u,c=[{type:12,data:s},{type:12,data:Math.floor(a/u)}],p=["type","type"],h=!1,m=[0,t.length-1];for(let w=0;w<t.length-2;w++)h=h||t[w+1]!==1,m.push(w+1);h=h&&t[t.length-1]!==1;let g=h?n.compute(st(n.inputs[0],m),{inputs:[n.inputs[0]],outputs:[-1]})[0]:n.inputs[0].reshape(Array.from({length:t.length},(w,x)=>t[m[x]])),y=ww(n,g,e[1],e[2],i,s,a,r.epsilon),T=w=>{let x=Fe(e[0].dataType),I=u===1?"vec2f":`mat${u}x2f`,A=R=>{let M=R===0?"x":"y",F=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${x}(${F}(scale.${M}))`;case 2:return`vec2<${x}>(${F}(scale[0].${M}, scale[1].${M}))`;case 4:return`vec4<${x}>(${F}(scale[0].${M}, scale[1].${M}, scale[2].${M}, scale[3].${M}))`;default:throw new Error(`Not supported compoents ${u}`)}},P=z("input",e[0].dataType,e[0].dims,u),C=V("output",e[0].dataType,o,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${P.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${I}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${C.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${w.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${A(0)}, ${A(1)});
  }`};n.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:T},{inputs:[e[0],y]})},xw=(n,e)=>{e.format==="NHWC"?_C(n,n.inputs,e):yC(n,n.inputs,e)}});var vC,wC,Iw,Sw=N(()=>{"use strict";ue();pe();he();vC=n=>{if(!n||n.length<2)throw new Error("layerNorm requires at least 2 inputs.")},wC=(n,e,r)=>{let t=e.simplified,o=n[0].dims,i=n[1],a=!t&&n[2],s=o,u=D.normalizeAxis(e.axis,o.length),l=D.sizeToDimension(o,u),c=D.sizeFromDimension(o,u),p=D.size(i.dims),h=a?D.size(a.dims):0;if(p!==c||a&&h!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${p} and bias size of ${h}`);let m=[];for(let P=0;P<o.length;++P)P<u?m.push(o[P]):m.push(1);let g=Pe(c),y=["type","type"],T=[{type:12,data:l},{type:1,data:c},{type:12,data:Math.floor(c/g)},{type:1,data:e.epsilon}];a&&y.push("type");let w=r>1,x=r>2,I=P=>{let C=Fe(n[0].dataType),R=[z("x",n[0].dataType,n[0].dims,g),z("scale",i.dataType,i.dims,g)];a&&R.push(z("bias",a.dataType,a.dims,g)),R.push(V("output",n[0].dataType,s,g)),w&&R.push(V("mean_data_output",1,m)),x&&R.push(V("inv_std_output",1,m));let M=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${P.registerUniforms(M).declareVariables(...R)}
  ${P.mainStart()}
    ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${wc("f32",g)};
    var mean_square_vector = ${wc("f32",g)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Un(C,g,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Kt("mean_vector",g)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Kt("mean_square_vector",g)} / uniforms.norm_size ${t?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Un(C,g,"x[j + offset]")};
      let f32scale = ${Un(C,g,"scale[j]")};
      output[j + offset] = ${R[0].type.value}((f32input ${t?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${Un(C,g,"bias[j]")}`:""}
      );
    }

    ${w?"mean_data_output[global_idx] = mean":""};
    ${x?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},A=[{dims:s,dataType:n[0].dataType}];return w&&A.push({dims:m,dataType:1}),x&&A.push({dims:m,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${g};${r};${t}`,inputDependencies:y},getRunData:()=>({outputs:A,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:T}),getShaderSource:I}},Iw=(n,e)=>{vC(n.inputs),n.compute(wC(n.inputs,e,n.outputCount))}});var xC,$w,Aw=N(()=>{"use strict";pe();Ha();qa();xC=n=>{if(!n||n.length!==2)throw new Error("MatMul requires 2 inputs.");if(n[0].dims[n[0].dims.length-1]!==n[1].dims[n[1].dims.length-2])throw new Error("shared dimension does not match.")},$w=n=>{xC(n.inputs);let e=Fr.calcShape(n.inputs[0].dims,n.inputs[1].dims,!0);if(!e)throw new Error("Can't use matmul on the given tensors");let r=e[e.length-1],t=n.inputs[0].dims[n.inputs[0].dims.length-1];if(r<8&&t<8)n.compute(Wa(n.inputs,{activation:""},e));else{let o=e[e.length-2],i=D.size(n.inputs[0].dims.slice(0,-2)),a=D.size(n.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&a===1){let s=n.inputs[0].reshape([1,i,t]),u=n.inputs[1].reshape([1,t,r]),l=[1,i,r],c=[s,u];n.compute(Ho(c,{activation:""},e,l),{inputs:c})}else n.compute(Ho(n.inputs,{activation:""},e))}}});var TC,IC,SC,Ow,Pw,Ew=N(()=>{"use strict";ue();pe();Je();he();TC=(n,e)=>{if(n.length<3||n.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=n[0],t=r.dims.length;if(r.dims[t-1]!==e.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((e.k+e.blockSize-1)/e.blockSize),i=e.blockSize/8*e.bits,a=n[1];if(!D.areEqual(a.dims,[e.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=n[2].dims;if(D.size(u)!==e.n*o)throw new Error("scales input size error.");if(n.length===4){let c=n[3].dims,p=e.n*(e.bits===8?o:Math.floor((o*e.bits+7)/8));if(D.size(c)!==p)throw new Error("zeroPoints input size error.")}},IC=(n,e)=>{let r=n[0].dims,t=r.length,o=r[t-2],i=e.k,a=e.n,s=r.slice(0,t-2),u=D.size(s),c=n[1].dims[2]/4,p=n[0].dataType,h=Pe(e.k),m=Pe(c),g=Pe(a),y=s.concat([o,a]),T=o>1&&a/g%2===0?2:1,w=D.size(y)/g/T,x=64,I=[],A=[u,o,i/h],P=D.convertShape(n[1].dims).slice();P.splice(-1,1,c/m),I.push(...U(A)),I.push(...U(P)),I.push(...U(n[2].dims)),n.length===4&&I.push(...U(D.convertShape(n[3].dims)));let C=[u,o,a/g];I.push(...U(C));let R=M=>{let F=A.length,$=z("a",n[0].dataType,F,h),J=z("b",12,P.length,m),Y=z("scales",n[2].dataType,n[2].dims.length),ee=[$,J,Y],W=n.length===4?z("zero_points",12,n[3].dims.length):void 0;W&&ee.push(W);let Te=C.length,oe=V("output",n[0].dataType,Te,g),L=Fe(n[0].dataType),Q=(()=>{switch(h){case 1:return`array<${L}, 8>`;case 2:return`mat4x2<${L}>`;case 4:return`mat2x4<${L}>`;default:throw new Error(`${h}-component is not supported.`)}})(),te=()=>{let qe=`
          // reuse a data
            var input_offset = ${$.indicesToOffset(`${$.type.indices}(batch, row, word_offset)`)};
            var a_data: ${Q};
            for (var j: u32 = 0; j < ${8/h}; j++) {
              a_data[j] = ${$.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let ce=0;ce<g*T;ce++)qe+=`
            b_value = ${m===1?`b${ce}_data`:`b${ce}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${Q}(${Array.from({length:4},(G,ie)=>`${L}(b_value_lower[${ie}]), ${L}(b_value_upper[${ie}])`).join(", ")});
            b_dequantized_values = ${h===1?`${Q}(${Array.from({length:8},(G,ie)=>`(b_quantized_values[${ie}] - ${W?`zero_point${ce}`:"zero_point"}) * scale${ce}`).join(", ")});`:`(b_quantized_values - ${Q}(${Array(8).fill(`${W?`zero_point${ce}`:"zero_point"}`).join(",")})) * scale${ce};`};
            workgroup_shared[local_id.x * ${T} + ${Math.floor(ce/g)}]${g>1?`[${ce%g}]`:""} += ${Array.from({length:8/h},(G,ie)=>`${h===1?`a_data[${ie}] * b_dequantized_values[${ie}]`:`dot(a_data[${ie}], b_dequantized_values[${ie}])`}`).join(" + ")};
          `;return qe},me=()=>{let qe=`
            var col_index = col * ${g};
            ${W?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${L}(8);`}
            `;for(let ce=0;ce<g*T;ce++)qe+=`
            let scale${ce} = ${Y.getByOffset("col_index * nBlocksPerCol + block")};
            ${W?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${W.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${ce} = ${L}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return qe},Ke=()=>{let qe=`col_index = col * ${g};`;for(let ce=0;ce<g*T;ce++)qe+=`
            let b${ce}_data = ${J.getByIndices(`${J.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return qe+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${Q};
            var b_dequantized_values: ${Q};`,qe};return`
        var<workgroup> workgroup_shared: array<${oe.type.value}, ${T*x}>;
        ${M.declareVariables(...ee,oe)}
        ${M.mainStart([x,1,1])}
          let output_indices = ${oe.offsetToIndices(`(global_idx / ${x}) * ${T}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${x}) {
            //process one block
            var word_offset: u32 = block * ${e.blockSize/h};
            ${me()}
            for (var word: u32 = 0; word < ${c}; word += ${m}) {
              ${Ke()}
              for (var i: u32 = 0; i < ${m}; i++) {
                ${te()}
                word_offset += ${8/h};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${T}) {
            var output_value: ${oe.type.value} = ${oe.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${x}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${T};
            }
            ${oe.setByIndices(`${oe.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${e.blockSize};${e.bits};${h};${m};${g};${T};${x}`,inputDependencies:Array(n.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:p}],dispatchGroup:{x:w},programUniforms:I}),getShaderSource:R}},SC=(n,e)=>{let r=n[0].dims,t=r.length,o=r[t-2],i=e.k,a=e.n,s=r.slice(0,t-2),u=D.size(s),c=n[1].dims[2]/4,p=n[0].dataType,h=Pe(e.k),m=Pe(c),g=s.concat([o,a]),y=128,T=a%8===0?8:a%4===0?4:1,w=y/T,x=w*m*8,I=x/h,A=x/e.blockSize,P=D.size(g)/T,C=[],R=[u,o,i/h],M=D.convertShape(n[1].dims).slice();M.splice(-1,1,c/m),C.push(...U(R)),C.push(...U(M)),C.push(...U(n[2].dims)),n.length===4&&C.push(...U(D.convertShape(n[3].dims)));let F=[u,o,a];C.push(...U(F));let $=J=>{let Y=R.length,ee=z("a",n[0].dataType,Y,h),W=z("b",12,M.length,m),Te=z("scales",n[2].dataType,n[2].dims.length),oe=[ee,W,Te],L=n.length===4?z("zero_points",12,n[3].dims.length):void 0;L&&oe.push(L);let Q=F.length,te=V("output",n[0].dataType,Q),me=Fe(n[0].dataType),Ke=()=>{switch(h){case 1:return`
          let a_data0 = vec4<${me}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${me}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${me}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${me}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${h}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${ee.type.value}, ${I}>;
        var<workgroup> inter_results: array<array<${te.type.value}, ${w}>, ${T}>;
        ${J.declareVariables(...oe,te)}
        ${J.mainStart([w,T,1])}
          let output_indices = ${te.offsetToIndices(`workgroup_index * ${T}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${A} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${I};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${I}; a_offset += ${y})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${ee.getByIndices(`${ee.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${ee.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${A} + local_id.x;
            ${L?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${L.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${me}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${me}(8);`}
            let scale = ${Te.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${W.getByIndices(`${W.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${e.blockSize/h};
            for (var i: u32 = 0; i < ${m}; i++) {
              ${Ke()}
              let b_value = ${m===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${me}>(${Array.from({length:4},(qe,ce)=>`${me}(b_value_lower[${ce}]), ${me}(b_value_upper[${ce}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${me}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(qe,ce)=>`${`dot(a_data${ce}, b_dequantized_values[${ce}])`}`).join(" + ")};
              word_offset += ${8/h};
            }
            workgroupBarrier();
          }

          if (local_idx < ${T}) {
            var output_value: ${te.type.value} = ${te.type.value}(0);
            for (var b = 0u; b < ${w}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${te.setByIndices(`${te.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${e.blockSize};${h};${m};${w};${T}`,inputDependencies:Array(n.length).fill("rank")},getRunData:()=>({outputs:[{dims:g,dataType:p}],dispatchGroup:{x:P},programUniforms:C}),getShaderSource:$}},Ow=(n,e)=>{TC(n.inputs,e),e.blockSize===32&&n.adapterInfo.isVendor("intel")&&n.adapterInfo.isArchitecture("gen-12lp")?n.compute(SC(n.inputs,e)):n.compute(IC(n.inputs,e))},Pw=n=>le(n)});var $C,AC,OC,PC,EC,CC,DC,kC,Cw,Dw=N(()=>{"use strict";ue();pe();he();$C=n=>{if(!n||n.length<1)throw new Error("Too few inputs");if(n[0].dataType!==1&&n[0].dataType!==10)throw new Error("Input type must be float or float16.");if(n.length>=2){let e=n[0].dims.length*2===n[1].dims[0];if(n.length===4&&(e=n[3].dims[0]*2===n[1].dims[0]),!e)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},AC=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
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
      `},OC=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
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
          `},PC=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
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
          `},EC=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
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
          `},CC=(n,e,r)=>{switch(r.mode){case 0:return AC(n,e,r.pads.length);case 1:return OC(n,e,r.pads.length);case 2:return PC(n,e,r.pads.length);case 3:return EC(n,e,r.pads.length);default:throw new Error("Invalid mode")}},DC=(n,e)=>{let r=D.padShape(n[0].dims.slice(),e.pads),t=n[0].dims,o=D.size(r),i=[{type:12,data:o},{type:6,data:e.pads}],a=n.length>=3&&n[2].data;e.mode===0&&i.push({type:a?n[2].dataType:1,data:e.value}),i.push(...U(n[0].dims,r));let s=["rank"],u=l=>{let c=V("output",n[0].dataType,r.length),p=z("x",n[0].dataType,t.length),h=p.type.value,m=CC(c,t.length,e),g=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:e.pads.length}];return e.mode===0&&g.push({name:"constant_value",type:a?h:"f32"}),`
            ${l.registerUniforms(g).declareVariables(p,c)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${h}(0);
            ${m}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${e.mode}${a}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(D.size(r)/64)},programUniforms:i}),getShaderSource:u}},kC=(n,e)=>{if(n.length>1){let r=n[1].getBigInt64Array(),t=n.length>=3&&n[2].data?n[2].dataType===10?n[2].getUint16Array()[0]:n[2].getFloat32Array()[0]:0,o=n[0].dims.length,i=new Int32Array(2*o).fill(0);if(n.length>=4){let s=n[3].getBigInt64Array();for(let u=0;u<s.length;u++)i[Number(s[u])]=Number(r[u]),i[Number(s[u])+o]=Number(r[u+s.length])}else r.forEach((s,u)=>i[Number(u)]=Number(s));let a=[];return i.forEach(s=>a.push(s)),{mode:e.mode,value:t,pads:a}}else return e},Cw=(n,e)=>{$C(n.inputs);let r=kC(n.inputs,e);n.compute(DC(n.inputs,r),{inputs:[0]})}});var Za,kw,Nw,Lw,Rw,NC,LC,zw,Mw,Bw,Fw,Vw,Gw,Uw,Ww,Hw,qw,jw,Kw,Xw=N(()=>{"use strict";ft();ue();pe();he();Za=n=>{if(de.webgpu.validateInputContent&&(!n||n.length!==1))throw new Error("Pool ops requires 1 input.")},kw=(n,e,r)=>{let t=e.format==="NHWC",o=n.dims.slice();t&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(e,"dilations"),a=e.kernelShape.slice(),s=e.strides.slice(),u=i?e.dilations.slice():[],l=e.pads.slice();Vn.adjustPoolAttributes(r,o,a,s,u,l);let c=Vn.computePoolOutputShape(r,o,s,u,a,l,e.autoPad),p=Object.assign({},e);i?Object.assign(p,{kernelShape:a,strides:s,pads:l,dilations:u,cacheKey:e.cacheKey}):Object.assign(p,{kernelShape:a,strides:s,pads:l,cacheKey:e.cacheKey});let h=c.slice();return h.push(h.splice(1,1)[0]),[p,t?h:c]},Nw=(n,e)=>{let r=e.format==="NHWC",t=D.size(n),o=D.size(e.kernelShape),i=[{type:12,data:t},{type:12,data:o}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(e.kernelShape.length<=2){let s=e.kernelShape[e.kernelShape.length-1],u=e.strides[e.strides.length-1],l=e.pads[e.pads.length/2-1],c=e.pads[e.pads.length-1],p=!!(l+c);i.push({type:12,data:s},{type:12,data:u},{type:12,data:l},{type:12,data:c}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let h=!1;if(e.kernelShape.length===2){let m=e.kernelShape[e.kernelShape.length-2],g=e.strides[e.strides.length-2],y=e.pads[e.pads.length/2-2],T=e.pads[e.pads.length-2];h=!!(y+T),i.push({type:12,data:m},{type:12,data:g},{type:12,data:y},{type:12,data:T}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,p,h]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let s=D.computeStrides(e.kernelShape);i.push({type:12,data:s},{type:12,data:e.pads},{type:12,data:e.strides}),a.push({name:"kernelStrides",type:"u32",length:s.length},{name:"pads",type:"u32",length:e.pads.length},{name:"strides",type:"u32",length:e.strides.length});let u=e.pads.reduce((l,c)=>l+c);return[i,a,!!u,!1,!1]}},Lw=(n,e,r,t,o,i,a,s,u,l,c,p)=>{let h=o.format==="NHWC",m=e.type.value,g=V("output",e.type.tensor,t);if(o.kernelShape.length<=2){let y="",T="",w="",x=r-(h?2:1);if(c?y=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${x}] = indices[${x}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${x}] < 0 || xIndices[${x}]
                      >= uniforms.x_shape[${x}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`:y=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${x}] = indices[${x}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let A=r-(h?3:2);p?T=`
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
            ${n.registerUniforms(u).declareVariables(e,g)}

            ${n.mainStart()}
              ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${g.offsetToIndices("global_idx")};
              var xIndices = ${g.offsetToIndices("global_idx")};

              var value = ${m}(${s});
              var pad = 0;
              ${T}
              ${y}
              ${w}
              ${a}

              output[global_idx] = value;
            }`}else{if(h)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let y=o.kernelShape.length,T=o.pads.length,w="";return l?w=`
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
            ${n.registerUniforms(u).declareVariables(e,g)}

            ${n.mainStart()}
              ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${g.offsetToIndices("global_idx")};
              var xIndices = ${g.offsetToIndices("global_idx")};

              var offsets: array<u32, ${y}>;

              var value = ${m}(${s});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${y-1}u; j++) {
                  offsets[j] = offset / ${Z("uniforms.kernelStrides","j",y)};
                  offset -= offsets[j] * ${Z("uniforms.kernelStrides","j",y)};
                }
                offsets[${y-1}] = offset;

                isPad = false;
                for (var j = ${r-y}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${Z("uniforms.strides",`j - ${r-y}u`,y)}
                    + offsets[j - ${r-y}u] - ${Z("uniforms.pads","j - 2u",T)};
                  ${w}
              }
              ${a}

              output[global_idx] = value;
            }`}},Rw=n=>`${n.format};${n.ceilMode};${n.autoPad};${n.kernelShape.length}`,NC=n=>`${Rw(n)};${n.countIncludePad}`,LC=n=>`${Rw(n)};${n.storageOrder};${n.dilations}`,zw=n=>({format:n.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][n.auto_pad],ceilMode:n.ceil_mode,kernelShape:n.kernel_shape,strides:n.strides,pads:n.pads}),Mw=(n,e,r,t)=>{let[o,i]=kw(e,t,r),a=z("x",e.dataType,e.dims.length),s=a.type.value,u="value += x_val;",l="";o.countIncludePad?l+=`value /= ${s}(uniforms.kernelSize);`:l+=`value /= ${s}(i32(uniforms.kernelSize) - pad);`;let[c,p,h,m,g]=Nw(i,o);c.push(...U(e.dims,i));let y=["rank"];return{name:n,shaderCache:{hint:`${t.cacheKey};${h};${m};${g}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(D.size(i)/64)},programUniforms:c}),getShaderSource:T=>Lw(T,a,e.dims.length,i.length,o,u,l,0,p,h,m,g)}},Bw=n=>{let e=n.count_include_pad!==0,r=zw(n);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let t={countIncludePad:e,...r,cacheKey:""};return{...t,cacheKey:NC(t)}},Fw=(n,e)=>{Za(n.inputs),n.compute(Mw("AveragePool",n.inputs[0],!1,e))},Vw={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Gw=n=>{let e=n.format;return{format:e,...Vw,cacheKey:e}},Uw=(n,e)=>{Za(n.inputs),n.compute(Mw("GlobalAveragePool",n.inputs[0],!0,e))},Ww=(n,e,r,t)=>{let[o,i]=kw(e,t,r),a=`
      value = max(x_val, value);
    `,s="",u=z("x",e.dataType,e.dims.length),l=["rank"],[c,p,h,m,g]=Nw(i,o);return c.push(...U(e.dims,i)),{name:n,shaderCache:{hint:`${t.cacheKey};${h};${m};${g}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(D.size(i)/64)},programUniforms:c}),getShaderSource:y=>Lw(y,u,e.dims.length,i.length,o,a,s,e.dataType===10?-65504:-1e5,p,h,m,g)}},Hw=(n,e)=>{Za(n.inputs),n.compute(Ww("MaxPool",n.inputs[0],!1,e))},qw=n=>{let e=n.storage_order,r=n.dilations,t=zw(n);if(e!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(t.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:e,dilations:r,...t,cacheKey:""};return{...o,cacheKey:LC(o)}},jw=n=>{let e=n.format;return{format:e,...Vw,cacheKey:e}},Kw=(n,e)=>{Za(n.inputs),n.compute(Ww("GlobalMaxPool",n.inputs[0],!0,e))}});var zC,MC,Zw,Jw,Qw=N(()=>{"use strict";ue();pe();Je();he();zC=(n,e)=>{if(n.length<2||n.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(n.length===3&&n[1].dims===n[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(n.length===3&&n[0].dataType!==n[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(n[0].dataType===6&&n.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(n[1].dims.length!==0&&n[1].dims.length!==1&&n[1].dims.length!==n[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(n.length>2){if(n[0].dataType!==n[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(n[1].dims.length!==n[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!n[1].dims.map((r,t)=>r===n[2].dims[t]).reduce((r,t)=>r&&t,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(e.blockSize>0){if(n[1].dims.length===0||n[1].dims.length===1&&n[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!n[1].dims.map((o,i)=>i===e.axis||o===n[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(n[1].dims.length!==n[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=n[0].dims[e.axis],t=n[1].dims[e.axis];if(e.blockSize<Math.ceil(r/t)||e.blockSize>Math.ceil(r/(t-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},MC=(n,e)=>{let r=D.normalizeAxis(e.axis,n[0].dims.length),t=n[0].dataType,o=t===3,i=n[0].dims,a=n[1].dataType,s=D.size(i),u=t===3||t===2,l=u?[Math.ceil(D.size(n[0].dims)/4)]:n[0].dims,c=n[1].dims,p=n.length>2?n[2]:void 0,h=p?u?[Math.ceil(D.size(p.dims)/4)]:p.dims:void 0,m=c.length===0||c.length===1&&c[0]===1,g=m===!1&&c.length===1,y=Pe(s),T=m&&(!u||y===4),w=T?y:1,x=T&&!u?y:1,I=z("input",u?12:t,l.length,x),A=z("scale",a,c.length),P=p?z("zero_point",u?12:t,h.length):void 0,C=V("output",a,i.length,w),R=[I,A];P&&R.push(P);let M=[l,c];p&&M.push(h);let F=[{type:12,data:s/w},{type:12,data:r},{type:12,data:e.blockSize},...U(...M,i)],$=J=>{let Y=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${J.registerUniforms(Y).declareVariables(...R,C)}
      ${J.mainStart()}
          ${J.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${C.offsetToIndices("global_idx")};

          // Set input x
          ${u?`
            let input = ${I.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${w===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${I.getByOffset("global_idx")};`};

          // Set scale input
          ${m?`let scale_value= ${A.getByOffset("0")}`:g?`
            let scale_index = ${C.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${A.getByOffset("scale_index")};`:`
            var scale_indices: ${A.type.indices} = output_indices;
            let index = ${A.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${A.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${A.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${P?m?u?`
                let zero_point_input = ${P.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${P.getByOffset("0")}`:g?u?`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${P.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${P.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${A.indicesToOffset("scale_indices")};
                let zero_point_input = ${P.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${P.getByIndices("scale_indices")};`:`let zero_point_value = ${u?o?"i32":"u32":I.type.value}(0);`};
      // Compute and write output
      ${C.setByOffset("global_idx",`${C.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:e.cacheKey,inputDependencies:P?["rank","rank","rank"]:["rank","rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(s/w/64),y:1,z:1},programUniforms:F})}},Zw=(n,e)=>{zC(n.inputs,e),n.compute(MC(n.inputs,e))},Jw=n=>le({axis:n.axis,blockSize:n.blockSize})});var BC,FC,Yw,ex=N(()=>{"use strict";ft();ue();he();BC=(n,e,r)=>{let t=n===e,o=n<e&&r<0,i=n>e&&r>0;if(t||o||i)throw new Error("Range these inputs' contents are invalid.")},FC=(n,e,r,t)=>{let o=Math.abs(Math.ceil((e-n)/r)),i=[o],a=o,s=[{type:12,data:a},{type:t,data:n},{type:t,data:r},...U(i)],u=l=>{let c=V("output",t,i.length),p=c.type.value,h=[{name:"outputSize",type:"u32"},{name:"start",type:p},{name:"delta",type:p}];return`
        ${l.registerUniforms(h).declareVariables(c)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${p}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${t}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:s})}},Yw=n=>{let e=0,r=0,t=0;n.inputs[0].dataType===6?(e=n.inputs[0].getInt32Array()[0],r=n.inputs[1].getInt32Array()[0],t=n.inputs[2].getInt32Array()[0]):n.inputs[0].dataType===1&&(e=n.inputs[0].getFloat32Array()[0],r=n.inputs[1].getFloat32Array()[0],t=n.inputs[2].getFloat32Array()[0]),de.webgpu.validateInputContent&&BC(e,r,t),n.compute(FC(e,r,t,n.inputs[0].dataType),{inputs:[]})}});var VC,GC,tx,rx,nx=N(()=>{"use strict";ue();pe();Je();he();VC=(n,e,r,t)=>{if(n!=="none"&&t!=="i32"&&t!=="u32"&&t!=="f32")throw new Error(`Input ${t} is not supported with reduction ${n}.`);let o=`{
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
                ${o}max(bitcast<f32>(oldValue), (${r}))${i}`;case"min":return t==="i32"||t==="u32"?`atomicMin(&${e}, bitcast<${t}>(${r}));`:`${o}min(bitcast<${t}>(oldValue), (${r}))${i}`;case"mul":return`${o}(bitcast<${t}>(oldValue) * (${r}))${i}`;default:throw new Error(`Reduction ${n} is not supported.`)}},GC=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r,i=1,a=Math.ceil(D.sizeToDimension(t,t.length-1)/i),s=t[t.length-1],u=D.sizeFromDimension(r,s),l=[{type:12,data:a},{type:12,data:s},{type:12,data:u},...U(n[1].dims,n[2].dims,o)],c=p=>{let h=z("indices",n[1].dataType,n[1].dims.length),m=z("updates",n[2].dataType,n[2].dims.length,i),g=e.reduction!=="none"&&e.reduction!==""?P_("output",n[0].dataType,o.length):V("output",n[0].dataType,o.length,i);return`
      ${p.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(h,m,g)}
      ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${n[0].dims.length===1?`
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
    ${VC(e.reduction,"output[data_offset + i]","value",g.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${e.cacheKey}_${e.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l}),getShaderSource:c}},tx=n=>le({reduction:n.reduction}),rx=(n,e)=>{n.compute(GC(n.inputs,e),{inputs:[n.inputs[1],n.inputs[2]],outputs:[]})}});var UC,WC,HC,ox,qC,jC,KC,XC,ZC,JC,QC,YC,ix,eD,tD,rD,nD,oD,ax,sx,ux=N(()=>{"use strict";ue();pe();Je();he();UC=(n,e)=>{if(n.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),n.length>0){if(e.mode==="linear"){if(!(n.length===2||n.length===3||n.length===4&&n[0]===1&&n[1]===1||n.length===4&&n[0]===1&&n[3]===1||n.length===5&&n[0]===1&&n[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(e.mode==="cubic"&&!(n.length===2||n.length===4&&n[0]===1&&n[1]===1||n.length===4&&n[0]===1&&n[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},WC=(n,e,r)=>{e.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let t=new Array(r).fill(1);return e.forEach((o,i)=>t[o]=n[i]),t},HC=(n,e,r,t,o,i)=>{let[a,s,u]=r>10?[1,2,3]:[-1,n.length>1?1:-1,-1],l=n[0].dims.length;if(a>0&&n.length>a&&n[a].dims.length>0)n[a].getFloat32Array().forEach(c=>i.push(c));else if(e.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(s>0&&n.length>s&&n[s].dims.length===1&&n[s].dims[0]>0){if(n[s].getFloat32Array().forEach(c=>t.push(c)),t.length!==0&&t.length!==l&&r>=18&&t.length!==e.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");UC(t,e),e.axes.length>0&&WC(t,e.axes,l).forEach((c,p)=>t[p]=c)}if(u>0&&n.length>u&&n[u].dims.length===1&&n[u].dims[0]>0&&(n[u].getBigInt64Array().forEach(c=>o.push(Number(c))),o.length!==0&&o.length!==l&&r>=18&&o.length!==e.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(e.axes.length>0){if(t.length!==0&&t.length!==e.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==e.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof t<"u"&&typeof o<"u"&&t.length>0&&o.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},ox=(n,e,r,t)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${n}) * (${e});
  let whole = ${t}(big / (${r}));
  let fract = ${t}(big % (${r})) / ${t}(${r});
  return whole + fract;
`,qC=(n,e)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${e} { `+(()=>{switch(n){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${e}(xResized) / ${e}(xScale);
          } else {
            ${ox("xResized","lengthOriginal","lengthResized",e)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${e}(xResized) + 0.5) / ${e}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${e}(xResized) + 0.5) / ${e}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${ox("xResized","lengthOriginal - 1","lengthResized - 1",e)}
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
                  return offset + ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;case"half_pixel":return`return ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${n} is not supported`)}})()+"}",jC=(n,e,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(n){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(e<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${n} is not supported`)}})()+"}",KC=(n,e,r)=>{let t=new Array(r).fill(0).concat(new Array(r).fill(1)),o=n.length===0?t:n.slice();return e.length>0?(e.forEach((i,a)=>{t[i]=o[a],t[a+r]=o[e.length+a]}),t):o},XC=(n,e,r,t)=>{let o=[];if(r.length>0)if(t.length>0){if(n.forEach(i=>o.push(i)),Math.max(...t)>n.length)throw new Error("axes is out of bound");t.forEach((i,a)=>o[i]=r[a])}else r.forEach(i=>o.push(i));else{if(e.length===0)throw new Error("Resize requires either scales or sizes.");o=n.map((i,a)=>Math.round(i*e[a]))}return o},ZC=(n,e,r)=>{let t=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>e[i]),Number.MAX_VALUE):Math.min(...e,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>e[i]),Number.MIN_VALUE):Math.max(...e,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();e.fill(1,0,e.length);let o=n.slice();return r.axes.length>0?(r.axes.forEach(i=>e[i]=t),r.axes.forEach(i=>o[i]=Math.round(n[i]*e[i]))):(e.fill(t,0,e.length),o.forEach((i,a)=>o[a]=Math.round(i*e[a]))),o},JC=(n,e,r,t,o)=>`
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
    }`,QC=(n,e,r,t,o,i,a)=>`
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
    }`,YC=(n,e)=>`
    fn checkInputIndices(input_indices: ${n.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${e.length}; i++) {
        var input_index = ${n.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${Z("uniforms.input_shape","i",e.length)}) {
          return false;
        }
      }
      return true;
    }`,ix=(n,e,r,t)=>n.rank>t?`
    ${n.indicesSet("input_indices",e,"channel")};
    ${n.indicesSet("input_indices",r,"batch")};
`:"",eD=(n,e,r,t,o)=>{let[a,s,u,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],c=n.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${c} {
      var input_indices: ${n.type.indices};
      ${n.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${n.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${ix(n,l,a,2)}
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
    }`},tD=(n,e,r,t,o,i,a,s,u,l)=>{let c=r.length===2,p=!0,[h,m]=c?[0,1]:p?[2,3]:[1,2],g=n.type.value,y=T=>{let w=T===h?"row":"col";return`
      fn ${w}CubicInterpolation(input_indices: ${n.type.indices}, output_indices: ${e.type.indices}) -> ${g} {
        var output_index = ${e.indicesGet("output_indices",T)};
        var originalIdx: ${g} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[T]},
        ${t[T]}, ${r[T]}, ${i[T]}, ${i[T]} + ${r.length});
        var fractOriginalIdx: ${g} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${s} && (originalIdx < 0 || originalIdx > (${r[T]} - 1))) {
          return ${u};
        }
        var data: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${w}: ${g} = originalIdx + ${g}(i);
          if (${w} < 0 || ${w} >= ${r[T]}) {
            ${l?`coefs[i + 1] = 0.0;
                        continue;`:s?`return ${u};`:`${w} = max(0, min(${w}, ${r[T]} - 1));`};
          }
        var input_indices_copy: ${n.type.indices} = input_indices;
          ${n.indicesSet("input_indices_copy",T,`u32(${w})`)};
          data[i + 1] = ${T===h?n.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${y(h)};
    ${y(m)};
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
    `},rD=(n,e,r,t,o)=>{let[a,s,u,l,c]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],p=n.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${p} {
      var input_indices: ${n.type.indices};
      ${n.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${n.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${n.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${ix(n,c,a,3)}
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
    }`},nD=(n,e,r,t,o,i)=>{let a=n.dims,s=KC(i,e.axes,a.length),u=XC(a,t,o,e.axes),l=t.slice();t.length===0&&(l=a.map((x,I)=>x===0?1:u[I]/x),e.keepAspectRatioPolicy!=="stretch"&&(u=ZC(a,l,e)));let c=V("output",n.dataType,u.length),p=z("input",n.dataType,a.length),h=D.size(u),m=a.length===u.length&&a.every((x,I)=>x===u[I]),g=e.coordinateTransformMode==="tf_crop_and_resize",y=e.extrapolationValue,T=p.type.value,w=x=>`
      ${m?"":`
      ${qC(e.coordinateTransformMode,T)};
      ${(()=>{switch(e.mode){case"nearest":return`
              ${YC(p,a)};
              ${jC(e.nearestMode,r,T)};
              ${QC(p,c,a,u,l.length,s.length,g)};
              `;case"linear":return`
              ${JC(c,a,u,l.length,s.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${eD(p,c,a,g,y)}`;if(a.length===3||a.length===5)return`${rD(p,c,a,g,y)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${tD(p,c,a,u,l,s,e.cubicCoeffA,g,e.extrapolationValue,e.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
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
      }`;return{name:"Resize",shaderCache:{hint:`${e.cacheKey}|${r}|${l.length>0?e.mode==="cubic"?l:l.length:""}|${o.length>0?o:""}|${s.length>0?s:""}|${m}|${e.mode==="nearest"?a.length:a}`,inputDependencies:["rank"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:u,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},{type:1,data:l},{type:1,data:s},...U(a,u)]})}},oD=n=>{let e=n.customDataBuffer;return new Uint32Array(e,e.byteOffset,1)[0]},ax=(n,e)=>{let r=[],t=[],o=[],i=oD(n);if(e.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");HC(n.inputs,e,i,r,t,o),n.compute(nD(n.inputs[0],e,i,r,t,o),{inputs:[0]})},sx=n=>{let e=n.antialias,r=n.axes,t=n.coordinateTransformMode,o=n.cubicCoeffA,i=n.excludeOutside!==0,a=n.extrapolationValue,s=n.keepAspectRatioPolicy,u=n.mode,l=n.nearestMode===""?"simple":n.nearestMode;return le({antialias:e,axes:r,coordinateTransformMode:t,cubicCoeffA:o,excludeOutside:i,extrapolationValue:a,keepAspectRatioPolicy:s,mode:u,nearestMode:l})}});var iD,aD,lx,cx=N(()=>{"use strict";ue();pe();he();iD=n=>{if(!n||n.length<3)throw new Error("layerNorm requires at least 3 inputs.");let e=n[0],r=n[1],t=n[2];if(e.dataType!==r.dataType||e.dataType!==t.dataType)throw new Error("All inputs must have the same data type");if(e.dims.length!==3&&e.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=e.dims[e.dims.length-1],i=e.dims[e.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(t.dims.length!==1)throw new Error("Gamma must be 1D");if(t.dims[t.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(n.length>3){let a=n[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(n.length>4){let a=n[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},aD=(n,e,r,t)=>{let o=e.simplified,i=n[0].dims,a=D.size(i),s=i,u=a,l=i.slice(-1)[0],c=t?i.slice(0,-1).concat(1):[],p=!o&&n.length>3,h=n.length>4,m=t&&r>1,g=t&&r>2,y=r>3,T=64,w=Pe(l),x=[{type:12,data:u},{type:12,data:w},{type:12,data:l},{type:1,data:e.epsilon}],I=P=>{let C=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],R=[z("x",n[0].dataType,n[0].dims,w),z("skip",n[1].dataType,n[1].dims,w),z("gamma",n[2].dataType,n[2].dims,w)];p&&R.push(z("beta",n[3].dataType,n[3].dims,w)),h&&R.push(z("bias",n[4].dataType,n[4].dims,w)),R.push(V("output",n[0].dataType,s,w)),m&&R.push(V("mean_output",1,c)),g&&R.push(V("inv_std_output",1,c)),y&&R.push(V("input_skip_bias_sum",n[0].dataType,s,w));let M=Fe(n[0].dataType),F=Fe(1,w);return`

      ${P.registerUniforms(C).declareVariables(...R)}
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
          let bias_value = ${h?"bias[offset1d + i]":M+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${y?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Un(M,w,"value")};
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
        let mean = ${Kt("sum",w)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Kt("square_sum",w)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${m?"mean_output[global_idx] = mean;":""}
        ${g?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${M}(mean)`}) *
            ${M}(inv_std_dev) * gamma[offset1d + i]
            ${p?"+ beta[offset1d + i]":""};
        }
      }`},A=[{dims:s,dataType:n[0].dataType}];return r>1&&A.push({dims:c,dataType:1}),r>2&&A.push({dims:c,dataType:1}),r>3&&A.push({dims:i,dataType:n[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${w};${m};${g};${y}`,inputDependencies:n.map((P,C)=>"type")},getShaderSource:I,getRunData:()=>({outputs:A,dispatchGroup:{x:Math.ceil(u/l)},programUniforms:x})}},lx=(n,e)=>{iD(n.inputs);let t=[0];n.outputCount>1&&t.push(-3),n.outputCount>2&&t.push(-3),n.outputCount>3&&t.push(3),n.compute(aD(n.inputs,e,n.outputCount,!1),{outputs:t})}});var sD,Ja,uD,dx,lD,cD,px,fx,hx=N(()=>{"use strict";ue();pe();Je();he();sD=(n,e)=>{if(!n||n.length<1)throw new Error("too few inputs");if(e.axes.length!==0){if(e.axes.length!==e.starts.length||e.axes.length!==e.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(e.starts.length!==e.ends.length)throw new Error("starts and ends must have the same length");n.slice(1).forEach((r,t)=>{if(n[t+1].dataType!==6&&n[t+1].dataType!==7)throw new Error(`Input ${t} must be an array of int32 or int64`)})},Ja=(n,e)=>{let r=[];if(n.length>e)if(n[e].dataType===7)n[e].getBigInt64Array().forEach(t=>r.push(Number(t)));else if(n[e].dataType===6)n[e].getInt32Array().forEach(t=>r.push(Number(t)));else throw new Error(`Input ${e} must be an array of int32 or int64`);return r},uD=(n,e)=>{if(n.length>1){let r=Ja(n,1),t=Ja(n,2),o=Ja(n,3);return o.length===0&&(o=[...Array(n[0].dims.length).keys()]),le({starts:r,ends:t,axes:o})}else return e},dx=(n,e,r,t,o)=>{let i=n;return n<0&&(i+=r[t[e]]),o[e]<0?Math.max(0,Math.min(i,r[t[e]]-1)):Math.max(0,Math.min(i,r[t[e]]))},lD=(n,e,r)=>`fn calculateInputIndices(output_indices: ${e.type.indices}) -> ${n.type.indices} {
          var input_indices: ${n.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
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
      }`,cD=(n,e)=>{let r=n[0].dims,t=D.size(r),o=e.axes.length>0?D.normalizeAxes(e.axes,r.length):[...Array(r.length).keys()],i=Ja(n,4);i.forEach(w=>w!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let a=e.starts.map((w,x)=>dx(w,x,r,o,i)),s=e.ends.map((w,x)=>dx(w,x,r,o,i));if(o.length!==a.length||o.length!==s.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let w=0;w<r.length;++w)o.includes(w)||(a.splice(w,0,0),s.splice(w,0,r[w]),i.splice(w,0,1));let u=i.map(w=>Math.sign(w));i.forEach((w,x,I)=>{if(w<0){let A=(s[x]-a[x])/w,P=a[x],C=P+A*i[x];a[x]=C,s[x]=P,I[x]=-w}});let l=r.slice(0);o.forEach((w,x)=>{l[w]=Math.ceil((s[w]-a[w])/i[w])});let c={dims:l,dataType:n[0].dataType},p=V("output",n[0].dataType,l.length),h=z("input",n[0].dataType,n[0].dims.length),m=D.size(l),g=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:i.length}],y=[{type:12,data:m},{type:12,data:a},{type:6,data:u},{type:12,data:i},...U(n[0].dims,l)],T=w=>`
      ${w.registerUniforms(g).declareVariables(h,p)}
        ${lD(h,p,r)}
        ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${p.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${p.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${a.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:T,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:y})}},px=(n,e)=>{sD(n.inputs,e);let r=uD(n.inputs,e);n.compute(cD(n.inputs,r),{inputs:[0]})},fx=n=>{let e=n.starts,r=n.ends,t=n.axes;return le({starts:e,ends:r,axes:t})}});var dD,pD,mx,gx,bx=N(()=>{"use strict";ue();pe();Je();Xr();he();dD=n=>{if(!n||n.length!==1)throw new Error("Softmax op requires 1 input.")},pD=(n,e)=>{let r=n.inputs[0],t=r.dims,o=D.size(t),i=t.length,a=D.normalizeAxis(e.axis,i),s=a<t.length-1,u,l=[];s?(l=Array.from({length:i},(R,M)=>M),l[a]=i-1,l[i-1]=a,u=n.compute(st(r,l),{inputs:[r],outputs:[-1]})[0]):u=r;let c=u.dims,p=c[i-1],h=o/p,m=Pe(p),g=p/m,y=64;h===1&&(y=256);let T=(R,M)=>M===4?`max(max(${R}.x, ${R}.y), max(${R}.z, ${R}.w))`:M===2?`max(${R}.x, ${R}.y)`:M===3?`max(max(${R}.x, ${R}.y), ${R}.z)`:R,w=z("x",u.dataType,u.dims,m),x=V("result",u.dataType,u.dims,m),I=w.type.value,A=Fe(u.dataType)==="f32"?`var threadMax = ${I}(-3.402823e+38f);`:`var threadMax = ${I}(-65504.0h);`,P=R=>`
      var<workgroup> rowMaxShared : ${I};
      var<workgroup> rowSumShared : ${I};
      var<workgroup> threadShared : array<${I}, ${y}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${I} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${I}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${R.registerUniform("packedCols","i32").declareVariables(w,x)}
      ${R.mainStart(y)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${y};
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
          rowMaxShared = ${I}(${T("threadShared[0]",m)});
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
          rowSumShared = ${I}(${Kt("threadShared[0]",m)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${I}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,C=n.compute({name:"Softmax",shaderCache:{hint:`${m};${y}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:u.dataType}],dispatchGroup:{x:h},programUniforms:[{type:6,data:g}]}),getShaderSource:P},{inputs:[u],outputs:[s?-1:0]})[0];s&&n.compute(st(C,l),{inputs:[C]})},mx=(n,e)=>{dD(n.inputs),pD(n,e)},gx=n=>le({axis:n.axis})});var yx,fD,hD,mD,_x,vx=N(()=>{"use strict";ue();pe();he();yx=n=>Array.from(n.getBigInt64Array(),Number),fD=n=>{if(!n||n.length!==2)throw new Error("Tile requires 2 inputs.");if(n[0].dataType!==1&&n[0].dataType!==10&&n[0].dataType!==6&&n[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(n[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(n[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(yx(n[1]).length!==n[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},hD=(n,e)=>{let r=[];for(let t=0;t<n.length;++t)r.push(n[t]*e[t]);return r},mD=(n,e)=>{let r=n[0].dims,t=e??yx(n[1]),o=hD(r,t),i=D.size(o),a=n[0].dataType,s=z("input",a,r.length),u=V("output",a,o.length),l=c=>`
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
    }`;return{name:"Tile",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...U(n[0].dims,o)]}),getShaderSource:l}},_x=n=>{fD(n.inputs),n.compute(mD(n.inputs),{inputs:[0]})}});var gD,bD,wx,xx=N(()=>{"use strict";ue();pe();he();gD=(n,e,r,t,o)=>{let i=V("output_data",o,r.length,4),a=z("a_data",e[1].dataType,e[1].dims.length,4),s=z("b_data",e[2].dataType,e[2].dims.length,4),u=z("c_data",e[0].dataType,e[0].dims.length,4),l,c=(p,h,m)=>`select(${h}, ${p}, ${m})`;if(!t)l=i.setByOffset("global_idx",c(a.getByOffset("global_idx"),s.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let p=(h,m,g="")=>{let y=`a_data[index_a${m}][component_a${m}]`,T=`b_data[index_b${m}][component_b${m}]`,w=`bool(c_data[index_c${m}] & (0xffu << (component_c${m} * 8)))`;return`
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
            ${h}[${m}] = ${g}(${c(y,T,w)});
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
      }`},bD=n=>{let e=n[1].dims,r=n[2].dims,t=n[0].dims,o=n[1].dataType,i=!(D.areEqual(e,r)&&D.areEqual(r,t)),a=e,s=D.size(e);if(i){let l=Fr.calcShape(Fr.calcShape(e,r,!1),t,!1);if(!l)throw new Error("Can't perform where op on the given tensors");a=l,s=D.size(a)}let u=Math.ceil(s/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>gD(l,n,a,i,o),getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/64/4)},programUniforms:[{type:12,data:u},...U(t,e,r,a)]})}},wx=n=>{n.compute(bD(n.inputs))}});var Tx,Ix=N(()=>{"use strict";o0();Ba();s0();l0();K0();iv();uv();Iv();Cv();Nv();zv();Gv();Hv();jv();Zv();Yv();rw();iw();uw();dw();vw();Tw();Sw();Aw();Ew();Rc();Dw();Xw();Qw();ex();nx();za();ux();Bc();cx();hx();bx();Mc();vx();Xr();Va();xx();Tx=new Map([["Abs",[c0]],["Acos",[d0]],["Acosh",[p0]],["Add",[X0]],["ArgMax",[n0,Tc]],["ArgMin",[r0,Tc]],["Asin",[f0]],["Asinh",[h0]],["Atan",[m0]],["Atanh",[g0]],["Attention",[i0]],["AveragePool",[Fw,Bw]],["BatchNormalization",[a0]],["BiasAdd",[u0]],["BiasSplitGelu",[j0]],["Cast",[y0,b0]],["Ceil",[v0]],["Clip",[_0]],["Concat",[av,sv]],["Conv",[Dc,Cc]],["ConvTranspose",[Ev,Ov]],["Cos",[w0]],["Cosh",[x0]],["CumSum",[Dv,kv]],["DepthToSpace",[Lv,Rv]],["DequantizeLinear",[Zw,Jw]],["Div",[Z0]],["Einsum",[Fv,Vv]],["Elu",[T0,Uo]],["Equal",[J0]],["Erf",[I0]],["Exp",[S0]],["Expand",[Wv]],["FastGelu",[qv]],["Floor",[$0]],["FusedConv",[Dc,Cc]],["Gather",[Xv,Kv]],["GatherElements",[ow,nw]],["GatherBlockQuantized",[ew,tw]],["GatherND",[Jv,Qv]],["Gelu",[A0]],["Gemm",[sw,aw]],["GlobalAveragePool",[Uw,Gw]],["GlobalMaxPool",[Kw,jw]],["Greater",[tv]],["GreaterOrEqual",[nv]],["GridSample",[lw,cw]],["GroupQueryAttention",[_w]],["HardSigmoid",[L0,N0]],["InstanceNormalization",[xw]],["LayerNormalization",[Iw]],["LeakyRelu",[O0,Uo]],["Less",[rv]],["LessOrEqual",[ov]],["Log",[W0]],["MatMul",[$w]],["MatMulNBits",[Ow,Pw]],["MaxPool",[Hw,qw]],["Mul",[Q0]],["MultiHeadAttention",[hw,fw]],["Neg",[E0]],["Not",[P0]],["Pad",[Cw]],["Pow",[Y0]],["QuickGelu",[H0,Uo]],["Range",[Yw]],["Reciprocal",[C0]],["ReduceMin",[Z_]],["ReduceMean",[H_]],["ReduceMax",[X_]],["ReduceSum",[Q_]],["ReduceProd",[J_]],["ReduceL1",[q_]],["ReduceL2",[j_]],["ReduceLogSum",[e0]],["ReduceLogSumExp",[K_]],["ReduceSumSquare",[Y_]],["Relu",[D0]],["Resize",[ax,sx]],["RotaryEmbedding",[bw]],["ScatterND",[rx,tx]],["Sigmoid",[k0]],["Sin",[R0]],["Sinh",[z0]],["Slice",[px,fx]],["SkipLayerNormalization",[lx]],["Split",[mw,gw]],["Sqrt",[M0]],["Softmax",[mx,gx]],["Sub",[ev]],["Tan",[B0]],["Tanh",[V0]],["ThresholdedRelu",[U0,Uo]],["Tile",[_x]],["Transpose",[D_,k_]],["Where",[wx]]])});var Qa,Sx=N(()=>{"use strict";ft();Br();he();Qa=class{constructor(e){this.backend=e;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,r){this.repo.set(e,r)}run(e,r,t,o,i){St(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let c of r)u.push({binding:u.length,resource:{buffer:c.buffer}});for(let c of t)u.push({binding:u.length,resource:{buffer:c.buffer}});i&&u.push({binding:u.length,resource:i});let l=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let c={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(c)}s.setPipeline(e.computePipeline),s.setBindGroup(0,l),s.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),yt(e.programInfo.name)}dispose(){}build(e,r){St(e.name);let t=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(p=>{t.features.has(p.feature)&&o.push(`enable ${p.extension};`)});let a=E_(r,this.backend.device.limits),s=e.getShaderSource(a),u=`${o.join(`
`)}
${a.additionalImplementations}
${s}`,l=t.createShaderModule({code:u,label:e.name});ge("verbose",()=>`[WebGPU] ${e.name} shader code: ${u}`);let c=t.createComputePipeline({compute:{module:l,entryPoint:"main"},layout:"auto",label:e.name});return yt(e.name),{programInfo:e,computePipeline:c,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let r=typeof e=="number"?e:e.x,t=typeof e=="number"?1:e.y||1,o=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=i&&t<=i&&o<=i)return[r,t,o];let a=r*t*o,s=Math.ceil(Math.sqrt(a));if(s>i){if(s=Math.ceil(Math.cbrt(a)),s>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}});var $x={};In($x,{WebGpuBackend:()=>Vc});var yD,_D,Fc,Vc,Ax=N(()=>{"use strict";ft();ue();Br();dc();O_();Ix();Sx();yD=(n,e)=>{if(e.length!==n.length)throw new Error(`inputDependencies length ${e.length} is not equal to inputTensors length ${n.length}.`);let r=[];for(let t=0;t<n.length;++t){let o=n[t].dataType;switch(e[t]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let i=n[t].dims.length;r.push(`${o};${i}`);break}case"dims":{let i=n[t].dims.join(",");r.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${e[t]}`)}}return r.join("|")},_D=(n,e,r)=>{let t=n.name;return n.shaderCache?.hint&&(t+="["+n.shaderCache.hint+"]"),t+=":"+r+`:${yD(e,n.shaderCache?.inputDependencies??new Array(e.length).fill("dims"))}`,t},Fc=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Vc=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,r){this.env=e;let t=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:t},i=a=>r.features.has(a)&&t.push(a)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups"),this.device=await r.requestDevice(o),this.adapterInfo=new Fc(r.info||await r.requestAdapterInfo()),this.gpuDataManager=A_(this),this.programManager=new Qa(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Aa(e.logLevel,!!e.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;St(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(e.getMappedRange()),t=this.pendingQueries.get(e);for(let o=0;o<r.length/2;o++){let i=t[o],a=i.kernelId,s=this.kernels.get(a),u=s.kernelType,l=s.kernelName,c=i.programName,p=i.inputTensorViews,h=i.outputTensorViews,m=r[o*2],g=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=m);let y=Number(m-this.queryTimeBase),T=Number(g-this.queryTimeBase);if(!Number.isSafeInteger(y)||!Number.isSafeInteger(T))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:p.map(w=>({dims:w.dims,dataType:Mr(w.dataType)})),outputsMetadata:h.map(w=>({dims:w.dims,dataType:Mr(w.dataType)})),kernelId:a,kernelType:u,kernelName:l,programName:c,startTime:y,endTime:T});else{let w="";p.forEach((I,A)=>{w+=`input[${A}]: [${I.dims}] | ${Mr(I.dataType)}, `});let x="";h.forEach((I,A)=>{x+=`output[${A}]: [${I.dims}] | ${Mr(I.dataType)}, `}),console.log(`[profiling] kernel "${a}|${u}|${l}|${c}" ${w}${x}start time: ${y} ns, execution time: ${T-y} ns`)}li("GPU",`${c}::${m}::${g}`)}e.unmap(),this.pendingQueries.delete(e)}),yt()}run(e,r,t,o,i,a){St(e.name);let s=[];for(let I=0;I<r.length;++I){let A=r[I].data;if(A===0)continue;let P=this.gpuDataManager.get(A);if(!P)throw new Error(`no GPU data for input: ${A}`);s.push(P)}let{outputs:u,dispatchGroup:l,programUniforms:c}=e.getRunData(r),p=t.length===0?u.map((I,A)=>A):t;if(p.length!==u.length)throw new Error(`Output size ${p.length} must be equal to ${u.length}.`);let h=[],m=[];for(let I=0;I<u.length;++I){if(!Number.isInteger(p[I])||p[I]<-3||p[I]>=a)throw new Error(`Invalid output index: ${p[I]}`);if(p[I]===-3)continue;let A=p[I]===-1,P=p[I]===-2,C=A||P?i(u[I].dataType,u[I].dims):o(p[I],u[I].dataType,u[I].dims);if(h.push(C),C.data===0)continue;let R=this.gpuDataManager.get(C.data);if(!R)throw new Error(`no GPU data for output: ${C.data}`);if(A&&this.temporaryData.push(R),P){let M=this.kernelPersistentData.get(this.currentKernelId);M||(M=[],this.kernelPersistentData.set(this.currentKernelId,M)),M.push(R)}m.push(R)}if(s.length!==r.length||m.length!==h.length){if(m.length===0)return yt(e.name),h;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let g;if(c){let I=0,A=[];c.forEach(M=>{let F=typeof M.data=="number"?[M.data]:M.data;if(F.length===0)return;let $=M.type===10?2:4,J,Y;M.type===10?(Y=F.length>4?16:F.length>2?8:F.length*$,J=F.length>4?16:$*F.length):(Y=F.length<=2?F.length*$:16,J=16),I=Math.ceil(I/Y)*Y,A.push(I);let ee=M.type===10?8:4;I+=F.length>4?Math.ceil(F.length/ee)*J:F.length*$});let P=16;I=Math.ceil(I/P)*P;let C=new ArrayBuffer(I);c.forEach((M,F)=>{let $=A[F],J=typeof M.data=="number"?[M.data]:M.data;if(M.type===6)new Int32Array(C,$,J.length).set(J);else if(M.type===12)new Uint32Array(C,$,J.length).set(J);else if(M.type===10)new Uint16Array(C,$,J.length).set(J);else if(M.type===1)new Float32Array(C,$,J.length).set(J);else throw new Error(`Unsupported uniform type: ${Mr(M.type)}`)});let R=this.gpuDataManager.create(I,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(R.buffer,0,C,0,I),this.gpuDataManager.release(R.id),g={offset:0,size:I,buffer:R.buffer}}let y=this.programManager.normalizeDispatchGroupSize(l),T=y[1]===1&&y[2]===1,w=_D(e,r,T),x=this.programManager.getArtifact(w);if(x||(x=this.programManager.build(e,y),this.programManager.setArtifact(w,x),ge("info",()=>`[artifact] key: ${w}, programName: ${e.name}`)),c&&x.uniformVariablesInfo){if(c.length!==x.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${x.uniformVariablesInfo.length}, got ${c.length} in program "${x.programInfo.name}".`);for(let I=0;I<c.length;I++){let A=c[I],P=A.type,C=typeof A.data=="number"?1:A.data.length,[R,M]=x.uniformVariablesInfo[I];if(P!==R||C!==M)throw new Error(`Uniform variable ${I} mismatch: expect type ${R} with size ${M}, got type ${P} with size ${C} in program "${x.programInfo.name}".`)}}if(ge("info",()=>`[ProgramManager] run "${e.name}" (key=${w}) with ${y[0]}x${y[1]}x${y[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let I={kernelId:this.currentKernelId,programName:x.programInfo.name,inputTensorViews:r,outputTensorViews:h};this.pendingKernels.push(I),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(I)}return this.programManager.run(x,s,m,y,g),yt(e.name),h}upload(e,r){this.gpuDataManager.upload(e,r)}memcpy(e,r){this.gpuDataManager.memcpy(e,r)}async download(e,r){await this.gpuDataManager.download(e,r)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,r,t,o){let i=Tx.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:o,kernelEntry:i[0],attributes:[i[1],t]};this.kernels.set(r,a)}releaseKernel(e){let r=this.kernelPersistentData.get(e);if(r){for(let t of r)this.gpuDataManager.release(t.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,r,t){let o=this.kernels.get(e);if(!o)throw new Error(`kernel not created: ${e}`);let i=o.kernelType,a=o.kernelName,s=o.kernelEntry,u=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),ge("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),s(r,u[1]),0}catch(c){return t.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${c}`)),1}finally{l&&t.push(this.device.popErrorScope().then(c=>c?`GPU validation error for kernel "[${i}] ${a}": ${c.message}`:null));for(let c of this.temporaryData)this.gpuDataManager.release(c.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,r,t,o){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let a=i.get(r),s=this.gpuDataManager.registerExternalBuffer(t,o,a);return i.set(r,[s,t]),s}unregisterBuffers(e){let r=this.sessionExternalDataMapping.get(e);r&&(r.forEach(t=>this.gpuDataManager.unregisterExternalBuffer(t[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let r=this.gpuDataManager.get(e);if(!r)throw new Error(`no GPU data for buffer: ${e}`);return r.buffer}createDownloader(e,r,t){return async()=>{let o=await bc(this,e,r);return Pa(o.buffer,t)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ge("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ge("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ge("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),t=e.length;this.pendingKernels=[];for(let o=0;o<t;o++){let i=this.getComputePassEncoder(),a=e[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}});var Ox={};In(Ox,{init:()=>vD});var jo,Gc,vD,Px=N(()=>{"use strict";ue();Br();pe();T_();jo=class n{constructor(e,r,t,o){this.module=e;this.dataType=r;this.data=t;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let e=D.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let e=D.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let e=D.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let e=D.size(this.dims);return e===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(e){if(D.size(e)!==D.size(this.dims))throw new Error("Invalid new shape");return new n(this.module,this.dataType,this.data,e)}},Gc=class{constructor(e,r,t){this.module=e;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo;let o=e.PTR_SIZE,i=t/e.PTR_SIZE,a=o===4?"i32":"i64";this.opKernelContext=Number(e.getValue(o*i++,a));let s=Number(e.getValue(o*i++,a));this.outputCount=Number(e.getValue(o*i++,a)),this.customDataOffset=Number(e.getValue(o*i++,"*")),this.customDataSize=Number(e.getValue(o*i++,a));let u=[];for(let l=0;l<s;l++){let c=Number(e.getValue(o*i++,a)),p=Number(e.getValue(o*i++,"*")),h=Number(e.getValue(o*i++,a)),m=[];for(let g=0;g<h;g++)m.push(Number(e.getValue(o*i++,a)));u.push(new jo(e,c,p,m))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,r){let t=r?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,o=r?.outputs??[],i=(s,u,l)=>new jo(this.module,u,this.output(s,l),l),a=(s,u)=>{let l=yn(s,u);if(!l)throw new Error(`Unsupported data type: ${s}`);let c=l>0?this.backend.gpuDataManager.create(l).id:0;return new jo(this.module,s,c,u)};return this.backend.run(e,t,o,i,a,this.outputCount)}output(e,r){let t=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",a=this.module.stackAlloc((1+r.length)*o);this.module.setValue(a,r.length,i);for(let s=0;s<r.length;s++)this.module.setValue(a+o*(s+1),r[s],i);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(o){throw new Error(`Failed to generate kernel's output[${e}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(t)}}},vD=async(n,e,r,t)=>{let o=e.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(n==="webgpu"){let i=(Ax(),Kn($x)).WebGpuBackend,a=new i;await a.initialize(r,t),o("webgpu",[a,s=>a.alloc(Number(s)),s=>a.free(s),(s,u,l,c=!1)=>{if(c)ge("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(s)}, dst=${Number(u)}, size=${Number(l)}`),a.memcpy(Number(s),Number(u));else{ge("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(s)}, gpuDataId=${Number(u)}, size=${Number(l)}`);let p=e.HEAPU8.subarray(Number(s>>>0),Number(s>>>0)+Number(l));a.upload(Number(u),p)}},async(s,u,l)=>{ge("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${u}, size=${l}`),await a.download(Number(s),()=>e.HEAPU8.subarray(Number(u)>>>0,Number(u+l)>>>0))},(s,u,l)=>a.createKernel(s,Number(u),l,e.UTF8ToString(e._JsepGetNodeName(Number(u)))),s=>a.releaseKernel(s),(s,u,l,c)=>{ge("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${l}, kernel=${s}, contextDataOffset=${u}`);let p=new Gc(e,a,Number(u));return a.computeKernel(Number(s),p,c)},()=>a.captureBegin(),()=>a.captureEnd(),()=>a.replay()])}else{let i=new ka(r);o("webnn",[i,()=>i.reserveTensorId(),a=>i.releaseTensorId(a),async(a,s,u,l,c)=>i.ensureTensor(a,s,u,l,c),(a,s)=>{i.uploadTensor(a,s)},async(a,s)=>i.downloadTensor(a,s),(a,s)=>i.registerMLContext(a,s),!!r.trace])}}});var wD,ma,ga,Wn,xD,Ex,Bo,ba,ya,Cx,_a,va,wa,nc=N(()=>{"use strict";ft();c_();p_();ue();gn();Ta();lc();wD=(n,e)=>{ze()._OrtInit(n,e)!==0&&De("Can't initialize onnxruntime.")},ma=async n=>{wD(n.wasm.numThreads,Vo(n.logLevel))},ga=async(n,e)=>{ze().asyncInit?.();let r=n.webgpu.adapter;if(e==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let t=n.webgpu.powerPreference;if(t!==void 0&&t!=="low-power"&&t!=="high-performance")throw new Error(`Invalid powerPreference setting: "${t}"`);let o=n.webgpu.forceFallbackAdapter;if(o!==void 0&&typeof o!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${o}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:t,forceFallbackAdapter:o}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(e==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let t=(Px(),Kn(Ox)).init;e==="webgpu"&&await t("webgpu",ze(),n,r),e==="webnn"&&await t("webnn",ze(),n)}},Wn=new Map,xD=n=>{let e=ze(),r=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetInputOutputCount(n,o,o+t)!==0&&De("Can't get session input/output count.");let a=t===4?"i32":"i64";return[Number(e.getValue(o,a)),Number(e.getValue(o+t,a))]}finally{e.stackRestore(r)}},Ex=(n,e)=>{let r=ze(),t=r.stackSave(),o=0;try{let i=r.PTR_SIZE,a=r.stackAlloc(2*i);r._OrtGetInputOutputMetadata(n,e,a,a+i)!==0&&De("Can't get session input/output metadata.");let u=Number(r.getValue(a,"*"));o=Number(r.getValue(a+i,"*"));let l=r.HEAP32[o/4];if(l===0)return[u,0];let c=r.HEAPU32[o/4+1],p=[];for(let h=0;h<c;h++){let m=Number(r.getValue(o+8+h*i,"*"));p.push(m!==0?r.UTF8ToString(m):Number(r.getValue(o+8+(h+c)*i,"*")))}return[u,l,p]}finally{r.stackRestore(t),o!==0&&r._OrtFree(o)}},Bo=n=>{let e=ze(),r=e._malloc(n.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${n.byteLength}.`);return e.HEAPU8.set(n,r),[r,n.byteLength]},ba=async(n,e)=>{let r,t,o=ze();Array.isArray(n)?[r,t]=n:n.buffer===o.HEAPU8.buffer?[r,t]=[n.byteOffset,n.byteLength]:[r,t]=Bo(n);let i=0,a=0,s=0,u=[],l=[],c=[];try{if([a,u]=await d_(e),e?.externalData&&o.mountExternalData){let A=[];for(let P of e.externalData){let C=typeof P=="string"?P:P.path;A.push(Go(typeof P=="string"?P:P.data).then(R=>{o.mountExternalData(C,R)}))}await Promise.all(A)}for(let A of e?.executionProviders??[])if((typeof A=="string"?A:A.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof A!="string"){let C=A,R=C?.context,M=C?.gpuDevice,F=C?.deviceType,$=C?.powerPreference;R?o.currentContext=R:M?o.currentContext=await o.webnnCreateMLContext(M):o.currentContext=await o.webnnCreateMLContext({deviceType:F,powerPreference:$})}else o.currentContext=await o.webnnCreateMLContext();break}i=await o._OrtCreateSession(r,t,a),o.webgpuOnCreateSession?.(i),i===0&&De("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.webnnRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[p,h]=xD(i),m=!!e?.enableGraphCapture,g=[],y=[],T=[],w=[],x=[];for(let A=0;A<p;A++){let[P,C,R]=Ex(i,A);P===0&&De("Can't get an input name."),l.push(P);let M=o.UTF8ToString(P);g.push(M),T.push(C===0?{name:M,isTensor:!1}:{name:M,isTensor:!0,type:Mr(C),shape:R})}for(let A=0;A<h;A++){let[P,C,R]=Ex(i,A+p);P===0&&De("Can't get an output name."),c.push(P);let M=o.UTF8ToString(P);y.push(M),w.push(C===0?{name:M,isTensor:!1}:{name:M,isTensor:!0,type:Mr(C),shape:R});{if(m&&e?.preferredOutputLocation===void 0){x.push("gpu-buffer");continue}let F=typeof e?.preferredOutputLocation=="string"?e.preferredOutputLocation:e?.preferredOutputLocation?.[M]??"cpu",$=o.webnnIsGraphOutput;if(F==="cpu"&&$&&$(i,M)){x.push("ml-tensor-cpu-output");continue}if(F!=="cpu"&&F!=="cpu-pinned"&&F!=="gpu-buffer"&&F!=="ml-tensor")throw new Error(`Not supported preferred output location: ${F}.`);if(m&&F!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${F}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);x.push(F)}}let I=null;return x.some(A=>A==="gpu-buffer"||A==="ml-tensor"||A==="ml-tensor-cpu-output")&&(s=o._OrtCreateBinding(i),s===0&&De("Can't create IO binding."),I={handle:s,outputPreferredLocations:x,outputPreferredLocationsEncoded:x.map(A=>A==="ml-tensor-cpu-output"?"ml-tensor":A).map(A=>uc(A))}),Wn.set(i,[i,l,c,I,m,!1]),[i,g,y,T,w]}catch(p){throw l.forEach(h=>o._OrtFree(h)),c.forEach(h=>o._OrtFree(h)),s!==0&&o._OrtReleaseBinding(s)!==0&&De("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&De("Can't release session."),p}finally{o._free(r),a!==0&&o._OrtReleaseSessionOptions(a)!==0&&De("Can't release session options."),u.forEach(p=>o._free(p)),o.unmountExternalData?.()}},ya=n=>{let e=ze(),r=Wn.get(n);if(!r)throw new Error(`cannot release session. invalid session id: ${n}`);let[t,o,i,a,s]=r;a&&(s&&e._OrtClearBoundOutputs(a.handle)!==0&&De("Can't clear bound outputs."),e._OrtReleaseBinding(a.handle)!==0&&De("Can't release IO binding.")),e.jsepOnReleaseSession?.(n),e.webnnOnReleaseSession?.(n),e.webgpuOnReleaseSession?.(n),o.forEach(u=>e._OrtFree(u)),i.forEach(u=>e._OrtFree(u)),e._OrtReleaseSession(t)!==0&&De("Can't release session."),Wn.delete(n)},Cx=async(n,e,r,t,o,i,a=!1)=>{if(!n){e.push(0);return}let s=ze(),u=s.PTR_SIZE,l=n[0],c=n[1],p=n[3],h=p,m,g;if(l==="string"&&(p==="gpu-buffer"||p==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(a&&p!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${i} when enableGraphCapture is true.`);if(p==="gpu-buffer"){let w=n[2].gpuBuffer;g=yn(bn(l),c);{let x=s.jsepRegisterBuffer;if(!x)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');m=x(t,i,w,g)}}else if(p==="ml-tensor"){let w=n[2].mlTensor;g=yn(bn(l),c);let x=s.webnnRegisterMLTensor;if(!x)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');m=x(t,w,bn(l),c)}else{let w=n[2];if(Array.isArray(w)){g=u*w.length,m=s._malloc(g),r.push(m);for(let x=0;x<w.length;x++){if(typeof w[x]!="string")throw new TypeError(`tensor data at index ${x} is not a string`);s.setValue(m+x*u,Ot(w[x],r),"*")}}else{let x=s.webnnIsGraphInput,I=s.webnnIsGraphOutput;if(l!=="string"&&x&&I){let A=s.UTF8ToString(o);if(x(t,A)||I(t,A)){let P=bn(l);g=yn(P,c),h="ml-tensor";let C=s.webnnCreateTemporaryTensor,R=s.webnnUploadTensor;if(!C||!R)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let M=await C(t,P,c);R(M,new Uint8Array(w.buffer,w.byteOffset,w.byteLength)),m=M}else g=w.byteLength,m=s._malloc(g),r.push(m),s.HEAPU8.set(new Uint8Array(w.buffer,w.byteOffset,g),m)}else g=w.byteLength,m=s._malloc(g),r.push(m),s.HEAPU8.set(new Uint8Array(w.buffer,w.byteOffset,g),m)}}let y=s.stackSave(),T=s.stackAlloc(4*c.length);try{c.forEach((x,I)=>s.setValue(T+I*u,x,u===4?"i32":"i64"));let w=s._OrtCreateTensor(bn(l),m,g,T,c.length,uc(h));w===0&&De(`Can't create tensor for input/output. session=${t}, index=${i}.`),e.push(w)}finally{s.stackRestore(y)}},_a=async(n,e,r,t,o,i)=>{let a=ze(),s=a.PTR_SIZE,u=Wn.get(n);if(!u)throw new Error(`cannot run inference. invalid session id: ${n}`);let l=u[0],c=u[1],p=u[2],h=u[3],m=u[4],g=u[5],y=e.length,T=t.length,w=0,x=[],I=[],A=[],P=[],C=a.stackSave(),R=a.stackAlloc(y*s),M=a.stackAlloc(y*s),F=a.stackAlloc(T*s),$=a.stackAlloc(T*s);try{[w,x]=l_(i),an("wasm prepareInputOutputTensor");for(let W=0;W<y;W++)await Cx(r[W],I,P,n,c[e[W]],e[W],m);for(let W=0;W<T;W++)await Cx(o[W],A,P,n,p[t[W]],y+t[W],m);sn("wasm prepareInputOutputTensor");for(let W=0;W<y;W++)a.setValue(R+W*s,I[W],"*"),a.setValue(M+W*s,c[e[W]],"*");for(let W=0;W<T;W++)a.setValue(F+W*s,A[W],"*"),a.setValue($+W*s,p[t[W]],"*");if(h&&!g){let{handle:W,outputPreferredLocations:Te,outputPreferredLocationsEncoded:oe}=h;if(c.length!==y)throw new Error(`input count from feeds (${y}) is expected to be always equal to model's input count (${c.length}).`);an("wasm bindInputsOutputs");for(let L=0;L<y;L++){let Q=e[L];await a._OrtBindInput(W,c[Q],I[L])!==0&&De(`Can't bind input[${L}] for session=${n}.`)}for(let L=0;L<T;L++){let Q=t[L];o[L]?.[3]?a._OrtBindOutput(W,p[Q],A[L],0)!==0&&De(`Can't bind pre-allocated output[${L}] for session=${n}.`):a._OrtBindOutput(W,p[Q],0,oe[Q])!==0&&De(`Can't bind output[${L}] to ${Te[L]} for session=${n}.`)}sn("wasm bindInputsOutputs"),Wn.set(n,[l,c,p,h,m,!0])}a.jsepOnRunStart?.(l),a.webnnOnRunStart?.(l);let J;h?J=await a._OrtRunWithBinding(l,h.handle,T,F,w):J=await a._OrtRun(l,M,R,y,$,T,F,w),J!==0&&De("failed to call OrtRun().");let Y=[],ee=[];an("wasm ProcessOutputTensor");for(let W=0;W<T;W++){let Te=Number(a.getValue(F+W*s,"*"));if(Te===A[W]){Y.push(o[W]);continue}let oe=a.stackSave(),L=a.stackAlloc(4*s),Q=!1,te,me=0;try{a._OrtGetTensorData(Te,L,L+s,L+2*s,L+3*s)!==0&&De(`Can't access output tensor data on index ${W}.`);let qe=s===4?"i32":"i64",ce=Number(a.getValue(L,qe));me=a.getValue(L+s,"*");let G=a.getValue(L+s*2,"*"),ie=Number(a.getValue(L+s*3,qe)),Oe=[];for(let Qe=0;Qe<ie;Qe++)Oe.push(Number(a.getValue(G+Qe*s,qe)));a._OrtFree(G)!==0&&De("Can't free memory for tensor dims.");let ut=Oe.reduce((Qe,Me)=>Qe*Me,1);te=Mr(ce);let dt=h?.outputPreferredLocations[t[W]];if(te==="string"){if(dt==="gpu-buffer"||dt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Qe=[];for(let Me=0;Me<ut;Me++){let Ft=a.getValue(me+Me*s,"*"),Jr=a.getValue(me+(Me+1)*s,"*"),ho=Me===ut-1?void 0:Jr-Ft;Qe.push(a.UTF8ToString(Ft,ho))}Y.push([te,Oe,Qe,"cpu"])}else if(dt==="gpu-buffer"&&ut>0){let Qe=a.jsepGetBuffer;if(!Qe)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Me=Qe(me),Ft=yn(ce,ut);if(Ft===void 0||!Sa(te))throw new Error(`Unsupported data type: ${te}`);Q=!0,Y.push([te,Oe,{gpuBuffer:Me,download:a.jsepCreateDownloader(Me,Ft,te),dispose:()=>{a._OrtReleaseTensor(Te)!==0&&De("Can't release tensor.")}},"gpu-buffer"])}else if(dt==="ml-tensor"&&ut>0){let Qe=a.webnnEnsureTensor,Me=a.webnnIsGraphInputOutputTypeSupported;if(!Qe||!Me)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(yn(ce,ut)===void 0||!$a(te))throw new Error(`Unsupported data type: ${te}`);if(!Me(n,te,!1))throw new Error(`preferredLocation "ml-tensor" for ${te} output is not supported by current WebNN Context.`);let Jr=await Qe(n,me,ce,Oe,!1);Q=!0,Y.push([te,Oe,{mlTensor:Jr,download:a.webnnCreateMLTensorDownloader(me,te),dispose:()=>{a.webnnReleaseTensorId(me),a._OrtReleaseTensor(Te)}},"ml-tensor"])}else if(dt==="ml-tensor-cpu-output"&&ut>0){let Qe=a.webnnCreateMLTensorDownloader(me,te)(),Me=Y.length;Q=!0,ee.push((async()=>{let Ft=[Me,await Qe];return a.webnnReleaseTensorId(me),a._OrtReleaseTensor(Te),Ft})()),Y.push([te,Oe,[],"cpu"])}else{let Qe=so(te),Me=new Qe(ut);new Uint8Array(Me.buffer,Me.byteOffset,Me.byteLength).set(a.HEAPU8.subarray(me,me+Me.byteLength)),Y.push([te,Oe,Me,"cpu"])}}finally{a.stackRestore(oe),te==="string"&&me&&a._free(me),Q||a._OrtReleaseTensor(Te)}}h&&!m&&(a._OrtClearBoundOutputs(h.handle)!==0&&De("Can't clear bound outputs."),Wn.set(n,[l,c,p,h,m,!1]));for(let[W,Te]of await Promise.all(ee))Y[W][2]=Te;return sn("wasm ProcessOutputTensor"),Y}finally{a.webnnOnRunEnd?.(l),a.stackRestore(C),I.forEach(J=>a._OrtReleaseTensor(J)),A.forEach(J=>a._OrtReleaseTensor(J)),P.forEach(J=>a._free(J)),w!==0&&a._OrtReleaseRunOptions(w),x.forEach(J=>a._free(J))}},va=n=>{let e=ze(),r=Wn.get(n);if(!r)throw new Error("invalid session id");let t=r[0],o=e._OrtEndProfiling(t);o===0&&De("Can't get an profile file name."),e._OrtFree(o)},wa=n=>{let e=[];for(let r of n){let t=r[2];!Array.isArray(t)&&"buffer"in t&&e.push(t.buffer)}return e}});var Hn,Bt,Ko,es,ts,Ya,Uc,Wc,po,fo,ID,Dx,kx,Nx,Lx,Rx,zx,Mx,Hc=N(()=>{"use strict";ft();nc();gn();fa();Hn=()=>!!de.wasm.proxy&&typeof document<"u",Ko=!1,es=!1,ts=!1,Wc=new Map,po=(n,e)=>{let r=Wc.get(n);r?r.push(e):Wc.set(n,[e])},fo=()=>{if(Ko||!es||ts||!Bt)throw new Error("worker not ready")},ID=n=>{switch(n.data.type){case"init-wasm":Ko=!1,n.data.err?(ts=!0,Uc[1](n.data.err)):(es=!0,Uc[0]()),Ya&&(URL.revokeObjectURL(Ya),Ya=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let e=Wc.get(n.data.type);n.data.err?e.shift()[1](n.data.err):e.shift()[0](n.data.out);break}default:}},Dx=async()=>{if(!es){if(Ko)throw new Error("multiple calls to 'initWasm()' detected.");if(ts)throw new Error("previous call to 'initWasm()' failed.");if(Ko=!0,Hn())return new Promise((n,e)=>{Bt?.terminate(),a_().then(([r,t])=>{try{Bt=t,Bt.onerror=i=>e(i),Bt.onmessage=ID,Uc=[n,e];let o={type:"init-wasm",in:de};!o.in.wasm.wasmPaths&&(r||ic)&&(o.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),Bt.postMessage(o),Ya=r}catch(o){e(o)}},e)});try{await ha(de.wasm),await ma(de),es=!0}catch(n){throw ts=!0,n}finally{Ko=!1}}},kx=async n=>{if(Hn())return fo(),new Promise((e,r)=>{po("init-ep",[e,r]);let t={type:"init-ep",in:{epName:n,env:de}};Bt.postMessage(t)});await ga(de,n)},Nx=async n=>Hn()?(fo(),new Promise((e,r)=>{po("copy-from",[e,r]);let t={type:"copy-from",in:{buffer:n}};Bt.postMessage(t,[n.buffer])})):Bo(n),Lx=async(n,e)=>{if(Hn()){if(e?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return fo(),new Promise((r,t)=>{po("create",[r,t]);let o={type:"create",in:{model:n,options:{...e}}},i=[];n instanceof Uint8Array&&i.push(n.buffer),Bt.postMessage(o,i)})}else return ba(n,e)},Rx=async n=>{if(Hn())return fo(),new Promise((e,r)=>{po("release",[e,r]);let t={type:"release",in:n};Bt.postMessage(t)});ya(n)},zx=async(n,e,r,t,o,i)=>{if(Hn()){if(r.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return fo(),new Promise((a,s)=>{po("run",[a,s]);let u=r,l={type:"run",in:{sessionId:n,inputIndices:e,inputs:u,outputIndices:t,options:i}};Bt.postMessage(l,wa(u))})}else return _a(n,e,r,t,o,i)},Mx=async n=>{if(Hn())return fo(),new Promise((e,r)=>{po("end-profiling",[e,r]);let t={type:"end-profiling",in:n};Bt.postMessage(t)});va(n)}});var Bx,SD,rs,Fx=N(()=>{"use strict";ft();Hc();ue();pa();lc();Bx=(n,e)=>{switch(n.location){case"cpu":return[n.type,n.dims,n.data,"cpu"];case"gpu-buffer":return[n.type,n.dims,{gpuBuffer:n.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[n.type,n.dims,{mlTensor:n.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${n.location} for ${e()}`)}},SD=n=>{switch(n[3]){case"cpu":return new It(n[0],n[2],n[1]);case"gpu-buffer":{let e=n[0];if(!Sa(e))throw new Error(`not supported data type: ${e} for deserializing GPU tensor`);let{gpuBuffer:r,download:t,dispose:o}=n[2];return It.fromGpuBuffer(r,{dataType:e,dims:n[1],download:t,dispose:o})}case"ml-tensor":{let e=n[0];if(!$a(e))throw new Error(`not supported data type: ${e} for deserializing MLTensor tensor`);let{mlTensor:r,download:t,dispose:o}=n[2];return It.fromMLTensor(r,{dataType:e,dims:n[1],download:t,dispose:o})}default:throw new Error(`invalid data location: ${n[3]}`)}},rs=class{async fetchModelAndCopyToWasmMemory(e){return Nx(await Go(e))}async loadModel(e,r){St();let t;typeof e=="string"?t=await this.fetchModelAndCopyToWasmMemory(e):t=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Lx(t,r),yt()}async dispose(){return Rx(this.sessionId)}async run(e,r,t){St();let o=[],i=[];Object.entries(e).forEach(h=>{let m=h[0],g=h[1],y=this.inputNames.indexOf(m);if(y===-1)throw new Error(`invalid input '${m}'`);o.push(g),i.push(y)});let a=[],s=[];Object.entries(r).forEach(h=>{let m=h[0],g=h[1],y=this.outputNames.indexOf(m);if(y===-1)throw new Error(`invalid output '${m}'`);a.push(g),s.push(y)});let u=o.map((h,m)=>Bx(h,()=>`input "${this.inputNames[i[m]]}"`)),l=a.map((h,m)=>h?Bx(h,()=>`output "${this.outputNames[s[m]]}"`):null),c=await zx(this.sessionId,i,u,s,l,t),p={};for(let h=0;h<c.length;h++)p[this.outputNames[s[h]]]=a[h]??SD(c[h]);return yt(),p}startProfiling(){}endProfiling(){Mx(this.sessionId)}}});var Gx={};In(Gx,{OnnxruntimeWebAssemblyBackend:()=>ns,initializeFlags:()=>Vx,wasmBackend:()=>$D});var Vx,ns,$D,Ux=N(()=>{"use strict";ft();Hc();Fx();Vx=()=>{(typeof de.wasm.initTimeout!="number"||de.wasm.initTimeout<0)&&(de.wasm.initTimeout=0);let n=de.wasm.simd;if(typeof n!="boolean"&&n!==void 0&&n!=="fixed"&&n!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${n}". Reset it to \`false\` and ignore SIMD feature checking.`),de.wasm.simd=!1),typeof de.wasm.proxy!="boolean"&&(de.wasm.proxy=!1),typeof de.wasm.trace!="boolean"&&(de.wasm.trace=!1),typeof de.wasm.numThreads!="number"||!Number.isInteger(de.wasm.numThreads)||de.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)de.wasm.numThreads=1;else{let e=typeof navigator>"u"?Os("node:os").cpus().length:navigator.hardwareConcurrency;de.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},ns=class{async init(e){Vx(),await Dx(),await kx(e)}async createInferenceSessionHandler(e,r){let t=new rs;return await t.loadModel(e,r),t}},$D=new ns});ft();ft();ft();var gf="1.23.0-dev.20250906-ecb26fb775";var aK=Ns;{let n=(jy(),Kn(qy)).onnxjsBackend;on("webgl",n,-10)}{let n=(Ux(),Kn(Gx)).wasmBackend;on("webgpu",n,5),on("webnn",n,5),on("cpu",n,10),on("wasm",n,10)}Object.defineProperty(de.versions,"web",{value:gf,enumerable:!0});export{oI as InferenceSession,li as TRACE,an as TRACE_EVENT_BEGIN,sn as TRACE_EVENT_END,St as TRACE_FUNC_BEGIN,yt as TRACE_FUNC_END,It as Tensor,aK as default,de as env,on as registerBackend};
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
