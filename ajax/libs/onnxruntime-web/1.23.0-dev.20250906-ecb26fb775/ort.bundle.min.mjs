/*!
 * ONNX Runtime Web v1.23.0-dev.20250906-ecb26fb775
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var Ln=Object.defineProperty;var mf=Object.getOwnPropertyDescriptor;var ff=Object.getOwnPropertyNames;var hf=Object.prototype.hasOwnProperty;var Wn=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var V=(t,e)=>()=>(t&&(e=t(t=0)),e);var Nt=(t,e)=>{for(var r in e)Ln(t,r,{get:e[r],enumerable:!0})},gf=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of ff(e))!hf.call(t,o)&&o!==r&&Ln(t,o,{get:()=>e[o],enumerable:!(n=mf(e,o))||n.enumerable});return t};var Yt=t=>gf(Ln({},"__esModule",{value:!0}),t);var wr,At,Et,bf,Oa,Gn=V(()=>{"use strict";wr=new Map,At=[],Et=(t,e,r)=>{if(e&&typeof e.init=="function"&&typeof e.createInferenceSessionHandler=="function"){let n=wr.get(t);if(n===void 0)wr.set(t,{backend:e,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==e)throw new Error(`cannot register backend "${t}" using priority ${r}`)}if(r>=0){let o=At.indexOf(t);o!==-1&&At.splice(o,1);for(let i=0;i<At.length;i++)if(wr.get(At[i]).priority<=r){At.splice(i,0,t);return}At.push(t)}return}throw new TypeError("not a valid backend")},bf=async t=>{let e=wr.get(t);if(!e)return"backend not found.";if(e.initialized)return e.backend;if(e.aborted)return e.error;{let r=!!e.initPromise;try{return r||(e.initPromise=e.backend.init(t)),await e.initPromise,e.initialized=!0,e.backend}catch(n){return r||(e.error=`${n}`,e.aborted=!0),e.error}finally{delete e.initPromise}}},Oa=async t=>{let e=t.executionProviders||[],r=e.map(d=>typeof d=="string"?d:d.name),n=r.length===0?At:r,o,i=[],s=new Set;for(let d of n){let c=await bf(d);typeof c=="string"?i.push({name:d,err:c}):(o||(o=c),o===c&&s.add(d))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(d=>`[${d.name}] ${d.err}`).join(", ")}`);for(let{name:d,err:c}of i)r.includes(d)&&console.warn(`removing requested execution provider "${d}" from session options because it is not available: ${c}`);let u=e.filter(d=>s.has(typeof d=="string"?d:d.name));return[o,new Proxy(t,{get:(d,c)=>c==="executionProviders"?u:Reflect.get(d,c)})]}});var Da=V(()=>{"use strict";Gn()});var Ba,Ma=V(()=>{"use strict";Ba="1.23.0-dev.20250703-7fc6235861"});var Ra,ke,Hn=V(()=>{"use strict";Ma();Ra="warning",ke={wasm:{},webgl:{},webgpu:{},versions:{common:Ba},set logLevel(t){if(t!==void 0){if(typeof t!="string"||["verbose","info","warning","error","fatal"].indexOf(t)===-1)throw new Error(`Unsupported logging level: ${t}`);Ra=t}},get logLevel(){return Ra}};Object.defineProperty(ke,"logLevel",{enumerable:!0})});var _e,Ua=V(()=>{"use strict";Hn();_e=ke});var Na,Va,La=V(()=>{"use strict";Na=(t,e)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=t.dims[3],r.height=t.dims[2];let n=r.getContext("2d");if(n!=null){let o,i;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=t.dims[2],i=t.dims[3]):(o=t.dims[3],i=t.dims[2]);let s=e?.format!==void 0?e.format:"RGB",u=e?.norm,d,c;u===void 0||u.mean===void 0?d=[255,255,255,255]:typeof u.mean=="number"?d=[u.mean,u.mean,u.mean,u.mean]:(d=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(d[3]=u.mean[3])),u===void 0||u.bias===void 0?c=[0,0,0,0]:typeof u.bias=="number"?c=[u.bias,u.bias,u.bias,u.bias]:(c=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(c[3]=u.bias[3]));let p=i*o,m=0,h=p,_=p*2,y=-1;s==="RGBA"?(m=0,h=p,_=p*2,y=p*3):s==="RGB"?(m=0,h=p,_=p*2):s==="RBG"&&(m=0,_=p,h=p*2);for(let w=0;w<i;w++)for(let S=0;S<o;S++){let $=(t.data[m++]-c[0])*d[0],v=(t.data[h++]-c[1])*d[1],T=(t.data[_++]-c[2])*d[2],I=y===-1?255:(t.data[y++]-c[3])*d[3];n.fillStyle="rgba("+$+","+v+","+T+","+I+")",n.fillRect(S,w,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Va=(t,e)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(r!=null){let o,i,s;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=t.dims[2],i=t.dims[1],s=t.dims[3]):(o=t.dims[3],i=t.dims[2],s=t.dims[1]);let u=e!==void 0&&e.format!==void 0?e.format:"RGB",d=e?.norm,c,p;d===void 0||d.mean===void 0?c=[255,255,255,255]:typeof d.mean=="number"?c=[d.mean,d.mean,d.mean,d.mean]:(c=[d.mean[0],d.mean[1],d.mean[2],255],d.mean[3]!==void 0&&(c[3]=d.mean[3])),d===void 0||d.bias===void 0?p=[0,0,0,0]:typeof d.bias=="number"?p=[d.bias,d.bias,d.bias,d.bias]:(p=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(p[3]=d.bias[3]));let m=i*o;if(e!==void 0&&(e.format!==void 0&&s===4&&e.format!=="RGBA"||s===3&&e.format!=="RGB"&&e.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let h=4,_=0,y=1,w=2,S=3,$=0,v=m,T=m*2,I=-1;u==="RGBA"?($=0,v=m,T=m*2,I=m*3):u==="RGB"?($=0,v=m,T=m*2):u==="RBG"&&($=0,T=m,v=m*2),n=r.createImageData(o,i);for(let E=0;E<i*o;_+=h,y+=h,w+=h,S+=h,E++)n.data[_]=(t.data[$++]-p[0])*c[0],n.data[y]=(t.data[v++]-p[1])*c[1],n.data[w]=(t.data[T++]-p[2])*c[2],n.data[S]=I===-1?255:(t.data[I++]-p[3])*c[3]}else throw new Error("Can not access image data");return n}});var Fn,Wa,Ga,Ha,Fa,qa,Ka=V(()=>{"use strict";vr();Fn=(t,e)=>{if(t===void 0)throw new Error("Image buffer must be defined");if(e.height===void 0||e.width===void 0)throw new Error("Image height and width must be defined");if(e.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=e,o=e.norm??{mean:255,bias:0},i,s;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?s=[o.bias,o.bias,o.bias,o.bias]:s=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let u=e.format!==void 0?e.format:"RGBA",d=e.tensorFormat!==void 0&&e.tensorFormat!==void 0?e.tensorFormat:"RGB",c=r*n,p=d==="RGBA"?new Float32Array(c*4):new Float32Array(c*3),m=4,h=0,_=1,y=2,w=3,S=0,$=c,v=c*2,T=-1;u==="RGB"&&(m=3,h=0,_=1,y=2,w=-1),d==="RGBA"?T=c*3:d==="RBG"?(S=0,v=c,$=c*2):d==="BGR"&&(v=0,$=c,S=c*2);for(let E=0;E<c;E++,h+=m,y+=m,_+=m,w+=m)p[S++]=(t[h]+s[0])/i[0],p[$++]=(t[_]+s[1])/i[1],p[v++]=(t[y]+s[2])/i[2],T!==-1&&w!==-1&&(p[T++]=(t[w]+s[3])/i[3]);return d==="RGBA"?new Be("float32",p,[1,4,r,n]):new Be("float32",p,[1,3,r,n])},Wa=async(t,e)=>{let r=typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement,n=typeof ImageData<"u"&&t instanceof ImageData,o=typeof ImageBitmap<"u"&&t instanceof ImageBitmap,i=typeof t=="string",s,u=e??{},d=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},c=p=>typeof HTMLCanvasElement<"u"&&p instanceof HTMLCanvasElement||p instanceof OffscreenCanvas?p.getContext("2d"):null;if(r){let p=d();p.width=t.width,p.height=t.height;let m=c(p);if(m!=null){let h=t.height,_=t.width;if(e!==void 0&&e.resizedHeight!==void 0&&e.resizedWidth!==void 0&&(h=e.resizedHeight,_=e.resizedWidth),e!==void 0){if(u=e,e.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=h,u.width=_}else u.tensorFormat="RGBA",u.height=h,u.width=_;m.drawImage(t,0,0),s=m.getImageData(0,0,_,h).data}else throw new Error("Can not access image data")}else if(n){let p,m;if(e!==void 0&&e.resizedWidth!==void 0&&e.resizedHeight!==void 0?(p=e.resizedHeight,m=e.resizedWidth):(p=t.height,m=t.width),e!==void 0&&(u=e),u.format="RGBA",u.height=p,u.width=m,e!==void 0){let h=d();h.width=m,h.height=p;let _=c(h);if(_!=null)_.putImageData(t,0,0),s=_.getImageData(0,0,m,p).data;else throw new Error("Can not access image data")}else s=t.data}else if(o){if(e===void 0)throw new Error("Please provide image config with format for Imagebitmap");let p=d();p.width=t.width,p.height=t.height;let m=c(p);if(m!=null){let h=t.height,_=t.width;return m.drawImage(t,0,0,_,h),s=m.getImageData(0,0,_,h).data,u.height=h,u.width=_,Fn(s,u)}else throw new Error("Can not access image data")}else{if(i)return new Promise((p,m)=>{let h=d(),_=c(h);if(!t||!_)return m();let y=new Image;y.crossOrigin="Anonymous",y.src=t,y.onload=()=>{h.width=y.width,h.height=y.height,_.drawImage(y,0,0,h.width,h.height);let w=_.getImageData(0,0,h.width,h.height);u.height=h.height,u.width=h.width,p(Fn(w.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Fn(s,u);throw new Error("Input data provided is not supported - aborted tensor creation")},Ga=(t,e)=>{let{width:r,height:n,download:o,dispose:i}=e,s=[1,n,r,4];return new Be({location:"texture",type:"float32",texture:t,dims:s,download:o,dispose:i})},Ha=(t,e)=>{let{dataType:r,dims:n,download:o,dispose:i}=e;return new Be({location:"gpu-buffer",type:r??"float32",gpuBuffer:t,dims:n,download:o,dispose:i})},Fa=(t,e)=>{let{dataType:r,dims:n,download:o,dispose:i}=e;return new Be({location:"ml-tensor",type:r??"float32",mlTensor:t,dims:n,download:o,dispose:i})},qa=(t,e,r)=>new Be({location:"cpu-pinned",type:t,data:e,dims:r??[e.length]})});var kt,Xt,ja,Za,Qa=V(()=>{"use strict";kt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Xt=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),ja=!1,Za=()=>{if(!ja){ja=!0;let t=typeof BigInt64Array<"u"&&BigInt64Array.from,e=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,n=typeof r<"u"&&r.from;t&&(kt.set("int64",BigInt64Array),Xt.set(BigInt64Array,"int64")),e&&(kt.set("uint64",BigUint64Array),Xt.set(BigUint64Array,"uint64")),n?(kt.set("float16",r),Xt.set(r,"float16")):kt.set("float16",Uint16Array)}}});var Ya,Xa,Ja=V(()=>{"use strict";vr();Ya=t=>{let e=1;for(let r=0;r<t.length;r++){let n=t[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);e*=n}return e},Xa=(t,e)=>{switch(t.location){case"cpu":return new Be(t.type,t.data,e);case"cpu-pinned":return new Be({location:"cpu-pinned",data:t.data,type:t.type,dims:e});case"texture":return new Be({location:"texture",texture:t.texture,type:t.type,dims:e});case"gpu-buffer":return new Be({location:"gpu-buffer",gpuBuffer:t.gpuBuffer,type:t.type,dims:e});case"ml-tensor":return new Be({location:"ml-tensor",mlTensor:t.mlTensor,type:t.type,dims:e});default:throw new Error(`tensorReshape: tensor location ${t.location} is not supported`)}}});var Be,vr=V(()=>{"use strict";La();Ka();Qa();Ja();Be=class{constructor(e,r,n){Za();let o,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,o=e.type,i=e.dims,e.location){case"cpu-pinned":{let u=kt.get(o);if(!u)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(e.data instanceof u))throw new TypeError(`buffer should be of type ${u.name}`);this.cpuData=e.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let u,d;if(typeof e=="string")if(o=e,d=n,e==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");u=r}else{let c=kt.get(e);if(c===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(r)){if(e==="float16"&&c===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${c.name} as data.`);e==="uint64"||e==="int64"?u=c.from(r,BigInt):u=c.from(r)}else if(r instanceof c)u=r;else if(r instanceof Uint8ClampedArray)if(e==="uint8")u=Uint8Array.from(r);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&r instanceof Uint16Array&&c!==Uint16Array)u=new globalThis.Float16Array(r.buffer,r.byteOffset,r.length);else throw new TypeError(`A ${o} tensor's data must be type of ${c}`)}else if(d=r,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let c=typeof e[0];if(c==="string")o="string",u=e;else if(c==="boolean")o="bool",u=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${c}.`)}else if(e instanceof Uint8ClampedArray)o="uint8",u=Uint8Array.from(e);else{let c=Xt.get(e.constructor);if(c===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);o=c,u=e}if(d===void 0)d=[u.length];else if(!Array.isArray(d))throw new TypeError("A tensor's dims must be a number array");i=d,this.cpuData=u,this.dataLocation="cpu"}let s=Ya(i);if(this.cpuData&&s!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=s}static async fromImage(e,r){return Wa(e,r)}static fromTexture(e,r){return Ga(e,r)}static fromGpuBuffer(e,r){return Ha(e,r)}static fromMLTensor(e,r){return Fa(e,r)}static fromPinnedBuffer(e,r,n){return qa(e,r,n)}toDataURL(e){return Na(this,e)}toImageData(e){return Va(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,e&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Xa(this,e)}}});var qe,qn=V(()=>{"use strict";vr();qe=Be});var $r,es,Ue,Me,yt,_t,Kn=V(()=>{"use strict";Hn();$r=(t,e)=>{(typeof ke.trace>"u"?!ke.wasm.trace:!ke.trace)||console.timeStamp(`${t}::ORT::${e}`)},es=(t,e)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],n=!1;for(let o=0;o<r.length;o++){if(n&&!r[o].includes("TRACE_FUNC")){let i=`FUNC_${t}::${r[o].trim().split(" ")[1]}`;e&&(i+=`::${e}`),$r("CPU",i);return}r[o].includes("TRACE_FUNC")&&(n=!0)}},Ue=t=>{(typeof ke.trace>"u"?!ke.wasm.trace:!ke.trace)||es("BEGIN",t)},Me=t=>{(typeof ke.trace>"u"?!ke.wasm.trace:!ke.trace)||es("END",t)},yt=t=>{(typeof ke.trace>"u"?!ke.wasm.trace:!ke.trace)||console.time(`ORT::${t}`)},_t=t=>{(typeof ke.trace>"u"?!ke.wasm.trace:!ke.trace)||console.timeEnd(`ORT::${t}`)}});var xr,ts=V(()=>{"use strict";Gn();qn();Kn();xr=class t{constructor(e){this.handler=e}async run(e,r,n){Ue(),yt("InferenceSession.run");let o={},i={};if(typeof e!="object"||e===null||e instanceof qe||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof qe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let c of r){if(typeof c!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(c)===-1)throw new RangeError(`'fetches' contains invalid output name: ${c}.`);o[c]=null}if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let c=!1,p=Object.getOwnPropertyNames(r);for(let m of this.outputNames)if(p.indexOf(m)!==-1){let h=r[m];(h===null||h instanceof qe)&&(c=!0,s=!1,o[m]=h)}if(c){if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let c of this.inputNames)if(typeof e[c]>"u")throw new Error(`input '${c}' is missing in 'feeds'.`);if(s)for(let c of this.outputNames)o[c]=null;let u=await this.handler.run(e,o,i),d={};for(let c in u)if(Object.hasOwnProperty.call(u,c)){let p=u[c];p instanceof qe?d[c]=p:d[c]=new qe(p.type,p.data,p.dims)}return _t("InferenceSession.run"),Me(),d}async release(){return this.handler.dispose()}static async create(e,r,n,o){Ue(),yt("InferenceSession.create");let i,s={};if(typeof e=="string"){if(i=e,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof Uint8Array){if(i=e,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer){let p=e,m=0,h=e.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(m=r,!Number.isSafeInteger(m))throw new RangeError("'byteOffset' must be an integer.");if(m<0||m>=p.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${p.byteLength}).`);if(h=e.byteLength-m,typeof n=="number"){if(h=n,!Number.isSafeInteger(h))throw new RangeError("'byteLength' must be an integer.");if(h<=0||m+h>p.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${p.byteLength-m}].`);if(typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof n<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(p,m,h)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,d]=await Oa(s),c=await u.createInferenceSessionHandler(i,d);return _t("InferenceSession.create"),Me(),new t(c)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}});var yf,rs=V(()=>{"use strict";ts();yf=xr});var ns=V(()=>{"use strict"});var os=V(()=>{"use strict"});var is=V(()=>{"use strict"});var as=V(()=>{"use strict"});var jn={};Nt(jn,{InferenceSession:()=>yf,TRACE:()=>$r,TRACE_EVENT_BEGIN:()=>yt,TRACE_EVENT_END:()=>_t,TRACE_FUNC_BEGIN:()=>Ue,TRACE_FUNC_END:()=>Me,Tensor:()=>qe,env:()=>_e,registerBackend:()=>Et});var Ne=V(()=>{"use strict";Da();Ua();rs();qn();ns();os();Kn();is();as()});var Sr=V(()=>{"use strict"});var ls={};Nt(ls,{default:()=>_f});var us,ds,_f,cs=V(()=>{"use strict";Zn();wt();Tr();us="ort-wasm-proxy-worker",ds=globalThis.self?.name===us;ds&&(self.onmessage=t=>{let{type:e,in:r}=t.data;try{switch(e){case"init-wasm":Ir(r.wasm).then(()=>{Cr(r).then(()=>{postMessage({type:e})},n=>{postMessage({type:e,err:n})})},n=>{postMessage({type:e,err:n})});break;case"init-ep":{let{epName:n,env:o}=r;Ar(o,n).then(()=>{postMessage({type:e})},i=>{postMessage({type:e,err:i})});break}case"copy-from":{let{buffer:n}=r,o=Jt(n);postMessage({type:e,out:o});break}case"create":{let{model:n,options:o}=r;Er(n,o).then(i=>{postMessage({type:e,out:i})},i=>{postMessage({type:e,err:i})});break}case"release":kr(r),postMessage({type:e});break;case"run":{let{sessionId:n,inputIndices:o,inputs:i,outputIndices:s,options:u}=r;Pr(n,o,i,s,new Array(s.length).fill(null),u).then(d=>{d.some(c=>c[3]!=="cpu")?postMessage({type:e,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:e,out:d},Or([...i,...d]))},d=>{postMessage({type:e,err:d})});break}case"end-profiling":zr(r),postMessage({type:e});break;default:}}catch(n){postMessage({type:e,err:n})}});_f=ds?null:t=>new Worker(t??Ve,{type:"module",name:us})});var ms={};Nt(ms,{default:()=>wf});async function ps(t={}){var e=t,r=typeof window=="object",n=typeof WorkerGlobalScope<"u",o=n&&self.name?.startsWith("em-pthread");e.mountExternalData=(a,l)=>{a.startsWith("./")&&(a=a.substring(2)),(e.Wc||(e.Wc=new Map)).set(a,l)},e.unmountExternalData=()=>{delete e.Wc};var i=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,Yd:!0}).buffer.constructor;let s=a=>async(...l)=>{try{if(e.Xc)throw Error("Session already started");let f=e.Xc={Jd:l[0],errors:[]},b=await a(...l);if(e.Xc!==f)throw Error("Session mismatch");e.bd?.flush();let g=f.errors;if(0<g.length){let C=await Promise.all(g);if(C=C.filter(P=>P),0<C.length)throw Error(C.join(`
`))}return b}finally{e.Xc=null}};e.jsepInit=(a,l)=>{if(a==="webgpu"){[e.bd,e.zd,e.Dd,e.cd,e.Cd,e.$b,e.Ed,e.Gd,e.Ad,e.Bd,e.Fd]=l;let f=e.bd;e.jsepRegisterBuffer=(b,g,C,P)=>f.registerBuffer(b,g,C,P),e.jsepGetBuffer=b=>f.getBuffer(b),e.jsepCreateDownloader=(b,g,C)=>f.createDownloader(b,g,C),e.jsepOnCreateSession=b=>{f.onCreateSession(b)},e.jsepOnReleaseSession=b=>{f.onReleaseSession(b)},e.jsepOnRunStart=b=>f.onRunStart(b),e.Hd=(b,g)=>{f.upload(b,g)}}else if(a==="webnn"){let f=l[0];[e.Wd,e.rd,e.webnnEnsureTensor,e.sd,e.webnnDownloadTensor,e.Vd,e.webnnEnableTraceEvent]=l.slice(1),e.webnnReleaseTensorId=e.rd,e.webnnUploadTensor=e.sd,e.webnnRegisterMLContext=e.Vd,e.webnnOnRunStart=b=>f.onRunStart(b),e.webnnOnRunEnd=f.onRunEnd.bind(f),e.webnnOnReleaseSession=b=>{f.onReleaseSession(b)},e.webnnCreateMLTensorDownloader=(b,g)=>f.createMLTensorDownloader(b,g),e.webnnRegisterMLTensor=(b,g,C,P)=>f.registerMLTensor(b,g,C,P),e.webnnCreateMLContext=b=>f.createMLContext(b),e.webnnRegisterMLConstant=(b,g,C,P,M,G)=>f.registerMLConstant(b,g,C,P,M,e.Wc,G),e.webnnRegisterGraphInput=f.registerGraphInput.bind(f),e.webnnIsGraphInput=f.isGraphInput.bind(f),e.webnnRegisterGraphOutput=f.registerGraphOutput.bind(f),e.webnnIsGraphOutput=f.isGraphOutput.bind(f),e.webnnCreateTemporaryTensor=f.createTemporaryTensor.bind(f),e.webnnIsGraphInputOutputTypeSupported=f.isGraphInputOutputTypeSupported.bind(f)}};let u=()=>{let a=l=>(...f)=>{let b=Xe;return f=l(...f),Xe!=b?new Promise((g,C)=>{An={resolve:g,reject:C}}):f};(()=>{for(let l of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])e[l]=a(e[l])})(),s!==void 0&&(e._OrtRun=s(e._OrtRun),e._OrtRunWithBinding=s(e._OrtRunWithBinding)),u=void 0};e.asyncInit=()=>{u?.()};var d,c,p=(a,l)=>{throw l},m=import.meta.url,h="";if(r||n){try{h=new URL(".",m).href}catch{}n&&(c=a=>{var l=new XMLHttpRequest;return l.open("GET",a,!1),l.responseType="arraybuffer",l.send(null),new Uint8Array(l.response)}),d=async a=>{if(R(a))return new Promise((f,b)=>{var g=new XMLHttpRequest;g.open("GET",a,!0),g.responseType="arraybuffer",g.onload=()=>{g.status==200||g.status==0&&g.response?f(g.response):b(g.status)},g.onerror=b,g.send(null)});var l=await fetch(a,{credentials:"same-origin"});if(l.ok)return l.arrayBuffer();throw Error(l.status+" : "+l.url)}}var _,y,w,S,$,v,T,I=console.log.bind(console),E=console.error.bind(console),A=I,D=E,B=!1,R=a=>a.startsWith("file://");function x(){j.buffer!=Z.buffer&&N()}if(o){let a=function(l){try{var f=l.data,b=f.Sc;if(b==="load"){let g=[];self.onmessage=C=>g.push(C),T=()=>{postMessage({Sc:"loaded"});for(let C of g)a(C);self.onmessage=a};for(let C of f.wd)e[C]&&!e[C].proxy||(e[C]=(...P)=>{postMessage({Sc:"callHandler",vd:C,args:P})},C=="print"&&(A=e[C]),C=="printErr"&&(D=e[C]));j=f.Od,N(),v(f.Pd)}else if(b==="run"){(function(g){var C=(x(),K)[g+52>>>2>>>0];g=(x(),K)[g+56>>>2>>>0],Wi(C,C-g),ue(C)})(f.Qc),Bn(f.Qc,0,0,1,0,0),Go(),In(f.Qc),q||(Mi(),q=!0);try{op(f.Ld,f.Zc)}catch(g){if(g!="unwind")throw g}}else f.target!=="setimmediate"&&(b==="checkMailbox"?q&&mr():b&&(D(`worker: received unknown command ${b}`),D(f)))}catch(g){throw Ri(),g}};var jb=a,q=!1;self.onunhandledrejection=l=>{throw l.reason||l},self.onmessage=a}var j,Z,W,le,Y,z,K,Q,ie,Te,xe,te=!1;function N(){var a=j.buffer;e.HEAP8=Z=new Int8Array(a),le=new Int16Array(a),e.HEAPU8=W=new Uint8Array(a),Y=new Uint16Array(a),e.HEAP32=z=new Int32Array(a),e.HEAPU32=K=new Uint32Array(a),Q=new Float32Array(a),ie=new Float64Array(a),Te=new BigInt64Array(a),xe=new BigUint64Array(a)}function X(){te=!0,o?T():gt.sb()}var me,Oe=0,De=null;function Ce(){if(--Oe==0&&De){var a=De;De=null,a()}}function ye(a){throw D(a="Aborted("+a+")"),B=!0,a=new WebAssembly.RuntimeError(a+". Build with -sASSERTIONS for more info."),$?.(a),a}function He(){return{a:{la:Cm,gb:Im,g:ip,I:ap,f:sp,m:up,h:dp,ga:lp,b:cp,S:pp,Ha:Zo,n:mp,Z:Jo,Xa:ei,Da:ti,Fa:ri,Ya:ni,Va:oi,Oa:ii,Ua:ai,ja:si,Ea:ui,Ba:di,Wa:li,Ca:ci,bb:fp,da:gp,wa:bp,ua:_p,ca:vp,O:$p,H:xp,va:Sp,Y:Pp,xa:zp,Ra:Op,za:Dp,Ia:Bp,sa:Mp,ea:Rp,Qa:In,_a:Up,R:Wp,r:Kp,c:xn,hb:jp,y:Zp,M:Qp,C:Yp,q:Xp,t:_i,ib:_i,J:Jp,Q:em,j:tm,v:rm,s:nm,l:om,La:im,Ma:am,Na:sm,Ja:xi,Ka:Si,ta:Ti,db:dm,ab:pm,u:mm,$:fm,fa:hm,$a:lm,U:gm,Za:bm,Aa:ym,F:um,T:_m,ka:yr,ya:wm,fb:vm,eb:$m,Sa:Ei,Ta:ki,Ga:yn,_:Pi,ia:zi,Pa:Oi,ha:Di,kb:lf,ma:rf,lb:df,na:tf,G:Km,d:Pm,o:Em,w:Am,B:Lm,pb:Ym,K:Hm,x:Om,oa:Jm,W:nf,aa:Qm,mb:uf,nb:sf,ob:Xm,pa:Zm,qb:jm,N:Fm,X:ef,e:zm,A:Dm,k:km,jb:cf,p:Bm,z:Mm,D:Vm,E:Rm,L:Wm,rb:qm,P:of,ba:Gm,V:af,qa:Nm,ra:Um,i:Sm,a:j,cb:bn}}}class ct{name="ExitStatus";constructor(l){this.message=`Program terminated with exit(${l})`,this.status=l}}var qt=a=>{a.terminate(),a.onmessage=()=>{}},dr=[],No=a=>{mt.length==0&&(Fo(),Ho(mt[0]));var l=mt.pop();if(!l)return 6;Kt.push(l),Tt[a.Qc]=l,l.Qc=a.Qc;var f={Sc:"run",Ld:a.Kd,Zc:a.Zc,Qc:a.Qc};return l.postMessage(f,a.qd),0},pt=0,Se=(a,l,...f)=>{for(var b=2*f.length,g=de(),C=Rn(8*b),P=C>>>3,M=0;M<f.length;M++){var G=f[M];typeof G=="bigint"?((x(),Te)[P+2*M>>>0]=1n,(x(),Te)[P+2*M+1>>>0]=G):((x(),Te)[P+2*M>>>0]=0n,(x(),ie)[P+2*M+1>>>0]=G)}return a=Ui(a,0,b,C,l),ue(g),a};function bn(a){if(o)return Se(0,1,a);if(w=a,!(0<pt)){for(var l of Kt)qt(l);for(l of mt)qt(l);mt=[],Kt=[],Tt={},B=!0}p(0,new ct(a))}function Vo(a){if(o)return Se(1,0,a);yn(a)}var yn=a=>{if(w=a,o)throw Vo(a),"unwind";bn(a)},mt=[],Kt=[],Lo=[],Tt={},Wo=a=>{var l=a.Qc;delete Tt[l],mt.push(a),Kt.splice(Kt.indexOf(a),1),a.Qc=0,Ni(l)};function Go(){Lo.forEach(a=>a())}var Ho=a=>new Promise(l=>{a.onmessage=g=>{var C=(g=g.data).Sc;if(g.Yc&&g.Yc!=Dn()){var P=Tt[g.Yc];P?P.postMessage(g,g.qd):D(`Internal error! Worker sent a message "${C}" to target pthread ${g.Yc}, but that thread no longer exists!`)}else C==="checkMailbox"?mr():C==="spawnThread"?No(g):C==="cleanupThread"?Wo(Tt[g.Md]):C==="loaded"?(a.loaded=!0,l(a)):g.target==="setimmediate"?a.postMessage(g):C==="callHandler"?e[g.vd](...g.args):C&&D(`worker sent an unknown command ${C}`)},a.onerror=g=>{throw D(`worker sent an error! ${g.filename}:${g.lineno}: ${g.message}`),g};var f,b=[];for(f of[])e.propertyIsEnumerable(f)&&b.push(f);a.postMessage({Sc:"load",wd:b,Od:j,Pd:y})});function Fo(){var a=new Worker((()=>{let l=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new l("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});mt.push(a)}var op=(a,l)=>{pt=0,a=Un(a,l),0<pt?w=a:Mn(a)},lr=[],cr=0;function ip(a){var l=new _n(a>>>=0);return(x(),Z)[l.Rc+12>>>0]==0&&(qo(l,!0),cr--),Ko(l,!1),lr.push(l),Hi(a),qi(a)}var Rt=0,ap=()=>{ce(0,0);var a=lr.pop();Gi(a.ad),Rt=0};function qo(a,l){l=l?1:0,(x(),Z)[a.Rc+12>>>0]=l}function Ko(a,l){l=l?1:0,(x(),Z)[a.Rc+13>>>0]=l}class _n{constructor(l){this.ad=l,this.Rc=l-24}}var wn=a=>{var l=Rt;if(!l)return Qt(0),0;var f=new _n(l);(x(),K)[f.Rc+16>>>2>>>0]=l;var b=(x(),K)[f.Rc+4>>>2>>>0];if(!b)return Qt(0),l;for(var g of a){if(g===0||g===b)break;if(Fi(g,b,f.Rc+16))return Qt(g),l}return Qt(b),l};function sp(){return wn([])}function up(a){return wn([a>>>0])}function dp(a,l,f,b){return wn([a>>>0,l>>>0,f>>>0,b>>>0])}var lp=()=>{var a=lr.pop();a||ye("no exception to throw");var l=a.ad;throw(x(),Z)[a.Rc+13>>>0]==0&&(lr.push(a),Ko(a,!0),qo(a,!1),cr++),Rt=l};function cp(a,l,f){var b=new _n(a>>>=0);throw l>>>=0,f>>>=0,(x(),K)[b.Rc+16>>>2>>>0]=0,(x(),K)[b.Rc+4>>>2>>>0]=l,(x(),K)[b.Rc+8>>>2>>>0]=f,cr++,Rt=a}var pp=()=>cr;function jo(a,l,f,b){return o?Se(2,1,a,l,f,b):Zo(a,l,f,b)}function Zo(a,l,f,b){if(a>>>=0,f>>>=0,b>>>=0,i===void 0)return 6;var g=[];return o&&g.length===0?jo(a,l>>>=0,f,b):(a={Kd:f,Qc:a,Zc:b,qd:g},o?(a.Sc="spawnThread",postMessage(a,g),0):No(a))}function mp(a){throw Rt||=a>>>0,Rt}var Qo=typeof TextDecoder<"u"?new TextDecoder:void 0,Yo=(a,l,f,b)=>{if(f=l+f,b)return f;for(;a[l]&&!(l>=f);)++l;return l},Xo=(a,l=0,f,b)=>{if(16<(f=Yo(a,l>>>=0,f,b))-l&&a.buffer&&Qo)return Qo.decode(a.buffer instanceof ArrayBuffer?a.subarray(l,f):a.slice(l,f));for(b="";l<f;){var g=a[l++];if(128&g){var C=63&a[l++];if((224&g)==192)b+=String.fromCharCode((31&g)<<6|C);else{var P=63&a[l++];65536>(g=(240&g)==224?(15&g)<<12|C<<6|P:(7&g)<<18|C<<12|P<<6|63&a[l++])?b+=String.fromCharCode(g):(g-=65536,b+=String.fromCharCode(55296|g>>10,56320|1023&g))}}else b+=String.fromCharCode(g)}return b},Ae=(a,l,f)=>(a>>>=0)?Xo((x(),W),a,l,f):"";function Jo(a,l,f){return o?Se(3,1,a,l,f):0}function ei(a,l){if(o)return Se(4,1,a,l)}function ti(a,l){if(o)return Se(5,1,a,l)}function ri(a,l,f){if(o)return Se(6,1,a,l,f)}function ni(a,l,f){return o?Se(7,1,a,l,f):0}function oi(a,l){if(o)return Se(8,1,a,l)}function ii(a,l,f){if(o)return Se(9,1,a,l,f)}function ai(a,l,f,b){if(o)return Se(10,1,a,l,f,b)}function si(a,l,f,b){if(o)return Se(11,1,a,l,f,b)}function ui(a,l,f,b){if(o)return Se(12,1,a,l,f,b)}function di(a){if(o)return Se(13,1,a)}function li(a,l){if(o)return Se(14,1,a,l)}function ci(a,l,f){if(o)return Se(15,1,a,l,f)}var fp=()=>ye(""),Ye=a=>{a>>>=0;for(var l="";;){var f=(x(),W)[a++>>>0];if(!f)return l;l+=String.fromCharCode(f)}},vn={},$n={},hp={},Ut=class extends Error{constructor(a){super(a),this.name="BindingError"}};function ut(a,l,f={}){return function(b,g,C={}){var P=g.name;if(!b)throw new Ut(`type "${P}" must have a positive integer typeid pointer`);if($n.hasOwnProperty(b)){if(C.xd)return;throw new Ut(`Cannot register type '${P}' twice`)}$n[b]=g,delete hp[b],vn.hasOwnProperty(b)&&(g=vn[b],delete vn[b],g.forEach(M=>M()))}(a,l,f)}var pi=(a,l,f)=>{switch(l){case 1:return f?b=>(x(),Z)[b>>>0]:b=>(x(),W)[b>>>0];case 2:return f?b=>(x(),le)[b>>>1>>>0]:b=>(x(),Y)[b>>>1>>>0];case 4:return f?b=>(x(),z)[b>>>2>>>0]:b=>(x(),K)[b>>>2>>>0];case 8:return f?b=>(x(),Te)[b>>>3>>>0]:b=>(x(),xe)[b>>>3>>>0];default:throw new TypeError(`invalid integer width (${l}): ${a}`)}};function gp(a,l,f,b,g){a>>>=0,f>>>=0,l=Ye(l>>>0);let C=P=>P;if(b=b===0n){let P=8*f;C=M=>BigInt.asUintN(P,M),g=C(g)}ut(a,{name:l,Nc:C,Uc:(P,M)=>(typeof M=="number"&&(M=BigInt(M)),M),Tc:pi(l,f,!b),Vc:null})}function bp(a,l,f,b){ut(a>>>=0,{name:l=Ye(l>>>0),Nc:function(g){return!!g},Uc:function(g,C){return C?f:b},Tc:function(g){return this.Nc((x(),W)[g>>>0])},Vc:null})}var mi=[],It=[0,1,,1,null,1,!0,1,!1,1];function xn(a){9<(a>>>=0)&&--It[a+1]==0&&(It[a]=void 0,mi.push(a))}var We=a=>{if(!a)throw new Ut(`Cannot use deleted val. handle = ${a}`);return It[a]},Fe=a=>{switch(a){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let l=mi.pop()||It.length;return It[l]=a,It[l+1]=1,l}};function Sn(a){return this.Nc((x(),K)[a>>>2>>>0])}var yp={name:"emscripten::val",Nc:a=>{var l=We(a);return xn(a),l},Uc:(a,l)=>Fe(l),Tc:Sn,Vc:null};function _p(a){return ut(a>>>0,yp)}var wp=(a,l)=>{switch(l){case 4:return function(f){return this.Nc((x(),Q)[f>>>2>>>0])};case 8:return function(f){return this.Nc((x(),ie)[f>>>3>>>0])};default:throw new TypeError(`invalid float width (${l}): ${a}`)}};function vp(a,l,f){f>>>=0,ut(a>>>=0,{name:l=Ye(l>>>0),Nc:b=>b,Uc:(b,g)=>g,Tc:wp(l,f),Vc:null})}function $p(a,l,f,b,g){a>>>=0,f>>>=0,l=Ye(l>>>0);let C=M=>M;if(b===0){var P=32-8*f;C=M=>M<<P>>>P,g=C(g)}ut(a,{name:l,Nc:C,Uc:(M,G)=>G,Tc:pi(l,f,b!==0),Vc:null})}function xp(a,l,f){function b(C){var P=(x(),K)[C>>>2>>>0];return C=(x(),K)[C+4>>>2>>>0],new g((x(),Z).buffer,C,P)}var g=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][l];ut(a>>>=0,{name:f=Ye(f>>>0),Nc:b,Tc:b},{xd:!0})}var ft=(a,l,f)=>{var b=(x(),W);if(l>>>=0,0<f){var g=l;f=l+f-1;for(var C=0;C<a.length;++C){var P=a.codePointAt(C);if(127>=P){if(l>=f)break;b[l++>>>0]=P}else if(2047>=P){if(l+1>=f)break;b[l++>>>0]=192|P>>6,b[l++>>>0]=128|63&P}else if(65535>=P){if(l+2>=f)break;b[l++>>>0]=224|P>>12,b[l++>>>0]=128|P>>6&63,b[l++>>>0]=128|63&P}else{if(l+3>=f)break;b[l++>>>0]=240|P>>18,b[l++>>>0]=128|P>>12&63,b[l++>>>0]=128|P>>6&63,b[l++>>>0]=128|63&P,C++}}b[l>>>0]=0,a=l-g}else a=0;return a},pr=a=>{for(var l=0,f=0;f<a.length;++f){var b=a.charCodeAt(f);127>=b?l++:2047>=b?l+=2:55296<=b&&57343>=b?(l+=4,++f):l+=3}return l};function Sp(a,l){ut(a>>>=0,{name:l=Ye(l>>>0),Nc(f){var b=(x(),K)[f>>>2>>>0];return b=Ae(f+4,b,!0),Je(f),b},Uc(f,b){b instanceof ArrayBuffer&&(b=new Uint8Array(b));var g=typeof b=="string";if(!(g||ArrayBuffer.isView(b)&&b.BYTES_PER_ELEMENT==1))throw new Ut("Cannot pass non-string to std::string");var C=g?pr(b):b.length,P=Zt(4+C+1),M=P+4;return(x(),K)[P>>>2>>>0]=C,g?ft(b,M,C+1):(x(),W).set(b,M>>>0),f!==null&&f.push(Je,P),P},Tc:Sn,Vc(f){Je(f)}})}var fi=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Tp=(a,l,f)=>{if(a>>>=1,16<(l=Yo((x(),Y),a,l/2,f))-a&&fi)return fi.decode((x(),Y).buffer instanceof ArrayBuffer?(x(),Y).subarray(a>>>0,l>>>0):(x(),Y).slice(a,l));for(f="";a<l;++a){var b=(x(),Y)[a>>>0];f+=String.fromCharCode(b)}return f},Ip=(a,l,f)=>{if(f??=2147483647,2>f)return 0;var b=l;f=(f-=2)<2*a.length?f/2:a.length;for(var g=0;g<f;++g){var C=a.charCodeAt(g);(x(),le)[l>>>1>>>0]=C,l+=2}return(x(),le)[l>>>1>>>0]=0,l-b},Cp=a=>2*a.length,Ap=(a,l,f)=>{var b="";a>>>=2;for(var g=0;!(g>=l/4);g++){var C=(x(),K)[a+g>>>0];if(!C&&!f)break;b+=String.fromCodePoint(C)}return b},Ep=(a,l,f)=>{if(l>>>=0,f??=2147483647,4>f)return 0;var b=l;f=b+f-4;for(var g=0;g<a.length;++g){var C=a.codePointAt(g);if(65535<C&&g++,(x(),z)[l>>>2>>>0]=C,(l+=4)+4>f)break}return(x(),z)[l>>>2>>>0]=0,l-b},kp=a=>{for(var l=0,f=0;f<a.length;++f)65535<a.codePointAt(f)&&f++,l+=4;return l};function Pp(a,l,f){if(a>>>=0,l>>>=0,f=Ye(f>>>=0),l===2)var b=Tp,g=Ip,C=Cp;else b=Ap,g=Ep,C=kp;ut(a,{name:f,Nc:P=>{var M=(x(),K)[P>>>2>>>0];return M=b(P+4,M*l,!0),Je(P),M},Uc:(P,M)=>{if(typeof M!="string")throw new Ut(`Cannot pass non-string to C++ string type ${f}`);var G=C(M),H=Zt(4+G+l);return(x(),K)[H>>>2>>>0]=G/l,g(M,H+4,G+l),P!==null&&P.push(Je,H),H},Tc:Sn,Vc(P){Je(P)}})}function zp(a,l){ut(a>>>=0,{yd:!0,name:l=Ye(l>>>0),Nc:()=>{},Uc:()=>{}})}function Op(a){Bn(a>>>0,!n,1,!r,131072,!1),Go()}var Tn=a=>{if(!B)try{if(a(),!(0<pt))try{o?Mn(w):yn(w)}catch(l){l instanceof ct||l=="unwind"||p(0,l)}}catch(l){l instanceof ct||l=="unwind"||p(0,l)}};function In(a){a>>>=0,typeof Atomics.Nd=="function"&&(Atomics.Nd((x(),z),a>>>2,a).value.then(mr),a+=128,Atomics.store((x(),z),a>>>2,1))}var mr=()=>{var a=Dn();a&&(In(a),Tn(Li))};function Dp(a,l){(a>>>=0)==l>>>0?setTimeout(mr):o?postMessage({Yc:a,Sc:"checkMailbox"}):(a=Tt[a])&&a.postMessage({Sc:"checkMailbox"})}var fr=[];function Bp(a,l,f,b,g){for(l>>>=0,b/=2,fr.length=b,f=g>>>0>>>3,g=0;g<b;g++)(x(),Te)[f+2*g>>>0]?fr[g]=(x(),Te)[f+2*g+1>>>0]:fr[g]=(x(),ie)[f+2*g+1>>>0];return(l?On[l]:Tm[a])(...fr)}var Mp=()=>{pt=0};function Rp(a){a>>>=0,o?postMessage({Sc:"cleanupThread",Md:a}):Wo(Tt[a])}function Up(a){}var hr=a=>{try{a()}catch(l){ye(l)}};function Np(a){var l=(...f)=>{gr.push(a);try{return a(...f)}finally{B||(gr.pop(),Xe&&ht===1&&gr.length===0&&(ht=0,pt+=1,hr(ka),typeof Fibers<"u"&&Fibers.$d()))}};return bi.set(a,l),l}var ht=0,Xe=null,hi=0,gr=[],Cn=new Map,gi=new Map,bi=new Map,Vp=0,An=null,Lp=[],yi=a=>function(l){if(!B){if(ht===0){var f=!1,b=!1;l((g=0)=>{if(!B&&(hi=g,f=!0,b)){ht=2,hr(()=>Pa(Xe)),typeof MainLoop<"u"&&MainLoop.td&&MainLoop.resume(),g=!1;try{var C=function(){var G=(x(),z)[Xe+8>>>2>>>0];return G=gi.get(G),G=bi.get(G),--pt,G()}()}catch(G){C=G,g=!0}var P=!1;if(!Xe){var M=An;M&&(An=null,(g?M.reject:M.resolve)(C),P=!0)}if(g&&!P)throw C}}),b=!0,f||(ht=1,Xe=function(){var g=Zt(65548),C=g+12;if((x(),K)[g>>>2>>>0]=C,(x(),K)[g+4>>>2>>>0]=C+65536,C=gr[0],!Cn.has(C)){var P=Vp++;Cn.set(C,P),gi.set(P,C)}return C=Cn.get(C),(x(),z)[g+8>>>2>>>0]=C,g}(),typeof MainLoop<"u"&&MainLoop.td&&MainLoop.pause(),hr(()=>Ea(Xe)))}else ht===2?(ht=0,hr(za),Je(Xe),Xe=null,Lp.forEach(Tn)):ye(`invalid state: ${ht}`);return hi}}(l=>{a().then(l)});function Wp(a){return a>>>=0,yi(async()=>{var l=await We(a);return Fe(l)})}var En=[],Gp=a=>{var l=En.length;return En.push(a),l},Hp=(a,l)=>{for(var f=Array(a),b=0;b<a;++b){var g=b,C=(x(),K)[l+4*b>>>2>>>0],P=$n[C];if(P===void 0)throw a=`parameter ${b}`,C=Bi(C),l=Ye(C),Je(C),new Ut(`${a} has unknown type ${l}`);f[g]=P}return f},Fp=(a,l,f)=>{var b=[];return a=a(b,f),b.length&&((x(),K)[l>>>2>>>0]=Fe(b)),a},qp={},br=a=>{var l=qp[a];return l===void 0?Ye(a):l};function Kp(a,l,f){var[b,...g]=Hp(a,l>>>0);l=b.Uc.bind(b);var C=g.map(G=>G.Tc.bind(G));a--;var P={toValue:We};switch(a=C.map((G,H)=>{var se=`argFromPtr${H}`;return P[se]=G,`${se}(args${H?"+"+8*H:""})`}),f){case 0:var M="toValue(handle)";break;case 2:M="new (toValue(handle))";break;case 3:M="";break;case 1:P.getStringOrSymbol=br,M="toValue(handle)[getStringOrSymbol(methodName)]"}return M+=`(${a})`,b.yd||(P.toReturnWire=l,P.emval_returnValue=Fp,M=`return emval_returnValue(toReturnWire, destructorsRef, ${M})`),M=`return function (handle, methodName, destructorsRef, args) {
  ${M}
  }`,f=new Function(Object.keys(P),M)(...Object.values(P)),M=`methodCaller<(${g.map(G=>G.name)}) => ${b.name}>`,Gp(Object.defineProperty(f,"name",{value:M}))}function jp(a,l){return l>>>=0,(a=We(a>>>0))==We(l)}function Zp(a){return(a>>>=0)==0?Fe(globalThis):(a=br(a),Fe(globalThis[a]))}function Qp(a){return a=br(a>>>0),Fe(e[a])}function Yp(a,l){return l>>>=0,a=We(a>>>0),l=We(l),Fe(a[l])}function Xp(a){9<(a>>>=0)&&(It[a+1]+=1)}function _i(a,l,f,b,g){return En[a>>>0](l>>>0,f>>>0,b>>>0,g>>>0)}function Jp(){return Fe([])}function em(a){a=We(a>>>0);for(var l=Array(a.length),f=0;f<a.length;f++)l[f]=a[f];return Fe(l)}function tm(a){return Fe(br(a>>>0))}function rm(){return Fe({})}function nm(a){for(var l=We(a>>>=0);l.length;){var f=l.pop();l.pop()(f)}xn(a)}function om(a,l,f){l>>>=0,f>>>=0,a=We(a>>>0),l=We(l),f=We(f),a[l]=f}function im(a,l){a=-9007199254740992>a||9007199254740992<a?NaN:Number(a),l>>>=0,a=new Date(1e3*a),(x(),z)[l>>>2>>>0]=a.getUTCSeconds(),(x(),z)[l+4>>>2>>>0]=a.getUTCMinutes(),(x(),z)[l+8>>>2>>>0]=a.getUTCHours(),(x(),z)[l+12>>>2>>>0]=a.getUTCDate(),(x(),z)[l+16>>>2>>>0]=a.getUTCMonth(),(x(),z)[l+20>>>2>>>0]=a.getUTCFullYear()-1900,(x(),z)[l+24>>>2>>>0]=a.getUTCDay(),a=(a.getTime()-Date.UTC(a.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(x(),z)[l+28>>>2>>>0]=a}var wi=a=>a%4==0&&(a%100!=0||a%400==0),vi=[0,31,60,91,121,152,182,213,244,274,305,335],$i=[0,31,59,90,120,151,181,212,243,273,304,334];function am(a,l){a=-9007199254740992>a||9007199254740992<a?NaN:Number(a),l>>>=0,a=new Date(1e3*a),(x(),z)[l>>>2>>>0]=a.getSeconds(),(x(),z)[l+4>>>2>>>0]=a.getMinutes(),(x(),z)[l+8>>>2>>>0]=a.getHours(),(x(),z)[l+12>>>2>>>0]=a.getDate(),(x(),z)[l+16>>>2>>>0]=a.getMonth(),(x(),z)[l+20>>>2>>>0]=a.getFullYear()-1900,(x(),z)[l+24>>>2>>>0]=a.getDay();var f=(wi(a.getFullYear())?vi:$i)[a.getMonth()]+a.getDate()-1|0;(x(),z)[l+28>>>2>>>0]=f,(x(),z)[l+36>>>2>>>0]=-60*a.getTimezoneOffset(),f=new Date(a.getFullYear(),6,1).getTimezoneOffset();var b=new Date(a.getFullYear(),0,1).getTimezoneOffset();a=0|(f!=b&&a.getTimezoneOffset()==Math.min(b,f)),(x(),z)[l+32>>>2>>>0]=a}function sm(a){a>>>=0;var l=new Date((x(),z)[a+20>>>2>>>0]+1900,(x(),z)[a+16>>>2>>>0],(x(),z)[a+12>>>2>>>0],(x(),z)[a+8>>>2>>>0],(x(),z)[a+4>>>2>>>0],(x(),z)[a>>>2>>>0],0),f=(x(),z)[a+32>>>2>>>0],b=l.getTimezoneOffset(),g=new Date(l.getFullYear(),6,1).getTimezoneOffset(),C=new Date(l.getFullYear(),0,1).getTimezoneOffset(),P=Math.min(C,g);return 0>f?(x(),z)[a+32>>>2>>>0]=+(g!=C&&P==b):0<f!=(P==b)&&(g=Math.max(C,g),l.setTime(l.getTime()+6e4*((0<f?P:g)-b))),(x(),z)[a+24>>>2>>>0]=l.getDay(),f=(wi(l.getFullYear())?vi:$i)[l.getMonth()]+l.getDate()-1|0,(x(),z)[a+28>>>2>>>0]=f,(x(),z)[a>>>2>>>0]=l.getSeconds(),(x(),z)[a+4>>>2>>>0]=l.getMinutes(),(x(),z)[a+8>>>2>>>0]=l.getHours(),(x(),z)[a+12>>>2>>>0]=l.getDate(),(x(),z)[a+16>>>2>>>0]=l.getMonth(),(x(),z)[a+20>>>2>>>0]=l.getYear(),a=l.getTime(),BigInt(isNaN(a)?-1:a/1e3)}function xi(a,l,f,b,g,C,P){return o?Se(16,1,a,l,f,b,g,C,P):-52}function Si(a,l,f,b,g,C){if(o)return Se(17,1,a,l,f,b,g,C)}var jt={},um=()=>performance.timeOrigin+performance.now();function Ti(a,l){if(o)return Se(18,1,a,l);if(jt[a]&&(clearTimeout(jt[a].id),delete jt[a]),!l)return 0;var f=setTimeout(()=>{delete jt[a],Tn(()=>Vi(a,performance.timeOrigin+performance.now()))},l);return jt[a]={id:f,Zd:l},0}function dm(a,l,f,b){a>>>=0,l>>>=0,f>>>=0,b>>>=0;var g=new Date().getFullYear(),C=new Date(g,0,1).getTimezoneOffset();g=new Date(g,6,1).getTimezoneOffset();var P=Math.max(C,g);(x(),K)[a>>>2>>>0]=60*P,(x(),z)[l>>>2>>>0]=+(C!=g),a=(l=M=>{var G=Math.abs(M);return`UTC${0<=M?"-":"+"}${String(Math.floor(G/60)).padStart(2,"0")}${String(G%60).padStart(2,"0")}`})(C),l=l(g),g<C?(ft(a,f,17),ft(l,b,17)):(ft(a,b,17),ft(l,f,17))}var lm=()=>Date.now(),cm=1;function pm(a,l,f){if(f>>>=0,!(0<=a&&3>=a))return 28;if(a===0)a=Date.now();else{if(!cm)return 52;a=performance.timeOrigin+performance.now()}return a=Math.round(1e6*a),(x(),Te)[f>>>3>>>0]=BigInt(a),0}var kn=[],Ii=(a,l)=>{kn.length=0;for(var f;f=(x(),W)[a++>>>0];){var b=f!=105;l+=(b&=f!=112)&&l%8?4:0,kn.push(f==112?(x(),K)[l>>>2>>>0]:f==106?(x(),Te)[l>>>3>>>0]:f==105?(x(),z)[l>>>2>>>0]:(x(),ie)[l>>>3>>>0]),l+=b?8:4}return kn};function mm(a,l,f){return a>>>=0,l=Ii(l>>>0,f>>>0),On[a](...l)}function fm(a,l,f){return a>>>=0,l=Ii(l>>>0,f>>>0),On[a](...l)}var hm=()=>{};function gm(a,l){return D(Ae(a>>>0,l>>>0))}var bm=()=>{throw pt+=1,"unwind"};function ym(){return 4294901760}var _m=()=>navigator.hardwareConcurrency,Ct={};function yr(a){if(!(2147483648&(a>>>=0)))return ye("Cannot use emscripten_pc_get_function on native functions without -sUSE_OFFSET_CONVERTER"),0;if(!(a=Ct[a]))return 0;var l;if(l=/^\s+at (.*) \(.*\)$/.exec(a))a=l[1];else{if(!(l=/^(.+?)@/.exec(a)))return 0;a=l[1]}Je(yr.gd??0),l=pr(a)+1;var f=Zt(l);return f&&ft(a,f,l),yr.gd=f,yr.gd}function wm(a){a>>>=0;var l=(x(),W).length;if(a<=l||4294901760<a)return!1;for(var f=1;4>=f;f*=2){var b=l*(1+.2/f);b=Math.min(b,a+100663296);e:{b=(Math.min(4294901760,65536*Math.ceil(Math.max(a,b)/65536))-j.buffer.byteLength+65535)/65536|0;try{j.grow(b),N();var g=1;break e}catch{}g=void 0}if(g)return!0}return!1}var _r=a=>{var l;if(l=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(a))return+l[1];if(/\bwasm-function\[(\d+)\]:(\d+)/.exec(a))ye("Legacy backtrace format detected but -sUSE_OFFSET_CONVERTER not present.");else if(l=/:(\d+):\d+(?:\)|$)/.exec(a))return 2147483648|+l[1];return 0},Ci=a=>{a.forEach(l=>{var f=_r(l);f&&(Ct[f]=l)})};function vm(){var a=Error().stack.toString().split(`
`);return a[0]=="Error"&&a.shift(),Ci(a),Ct.dd=_r(a[3]),Ct.Id=a,Ct.dd}function $m(a,l,f){if(a>>>=0,l>>>=0,Ct.dd==a)var b=Ct.Id;else(b=Error().stack.toString().split(`
`))[0]=="Error"&&b.shift(),Ci(b);for(var g=3;b[g]&&_r(b[g])!=a;)++g;for(a=0;a<f&&b[a+g];++a)(x(),z)[l+4*a>>>2>>>0]=_r(b[a+g]);return a}var Pn,zn={},Ai=()=>{if(!Pn){var a,l={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.language||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(a in zn)zn[a]===void 0?delete l[a]:l[a]=zn[a];var f=[];for(a in l)f.push(`${a}=${l[a]}`);Pn=f}return Pn};function Ei(a,l){if(o)return Se(19,1,a,l);a>>>=0,l>>>=0;var f,b=0,g=0;for(f of Ai()){var C=l+b;(x(),K)[a+g>>>2>>>0]=C,b+=ft(f,C,1/0)+1,g+=4}return 0}function ki(a,l){if(o)return Se(20,1,a,l);a>>>=0,l>>>=0;var f=Ai();for(var b of((x(),K)[a>>>2>>>0]=f.length,a=0,f))a+=pr(b)+1;return(x(),K)[l>>>2>>>0]=a,0}function Pi(a){return o?Se(21,1,a):52}function zi(a,l,f,b){return o?Se(22,1,a,l,f,b):52}function Oi(a,l,f,b){return o?Se(23,1,a,l,f,b):70}var xm=[null,[],[]];function Di(a,l,f,b){if(o)return Se(24,1,a,l,f,b);l>>>=0,f>>>=0,b>>>=0;for(var g=0,C=0;C<f;C++){var P=(x(),K)[l>>>2>>>0],M=(x(),K)[l+4>>>2>>>0];l+=8;for(var G=0;G<M;G++){var H=a,se=(x(),W)[P+G>>>0],pe=xm[H];se===0||se===10?((H===1?A:D)(Xo(pe)),pe.length=0):pe.push(se)}g+=M}return(x(),K)[b>>>2>>>0]=g,0}function Sm(a){return a>>>0}o||function(){for(var a=e.numThreads-1;a--;)Fo();dr.push(()=>{Oe++,function(l){o?l():Promise.all(mt.map(Ho)).then(l)}(()=>Ce())})}(),o||(j=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),N()),e.wasmBinary&&(_=e.wasmBinary),e.stackSave=()=>de(),e.stackRestore=a=>ue(a),e.stackAlloc=a=>Rn(a),e.setValue=function(a,l,f="i8"){switch(f.endsWith("*")&&(f="*"),f){case"i1":case"i8":(x(),Z)[a>>>0]=l;break;case"i16":(x(),le)[a>>>1>>>0]=l;break;case"i32":(x(),z)[a>>>2>>>0]=l;break;case"i64":(x(),Te)[a>>>3>>>0]=BigInt(l);break;case"float":(x(),Q)[a>>>2>>>0]=l;break;case"double":(x(),ie)[a>>>3>>>0]=l;break;case"*":(x(),K)[a>>>2>>>0]=l;break;default:ye(`invalid type for setValue: ${f}`)}},e.getValue=function(a,l="i8"){switch(l.endsWith("*")&&(l="*"),l){case"i1":case"i8":return(x(),Z)[a>>>0];case"i16":return(x(),le)[a>>>1>>>0];case"i32":return(x(),z)[a>>>2>>>0];case"i64":return(x(),Te)[a>>>3>>>0];case"float":return(x(),Q)[a>>>2>>>0];case"double":return(x(),ie)[a>>>3>>>0];case"*":return(x(),K)[a>>>2>>>0];default:ye(`invalid type for getValue: ${l}`)}},e.UTF8ToString=Ae,e.stringToUTF8=ft,e.lengthBytesUTF8=pr;var Tm=[bn,Vo,jo,Jo,ei,ti,ri,ni,oi,ii,ai,si,ui,di,li,ci,xi,Si,Ti,Ei,ki,Pi,zi,Oi,Di],On={903532:(a,l,f,b,g)=>{if(e===void 0||!e.Wc)return 1;if((a=Ae(Number(a>>>0))).startsWith("./")&&(a=a.substring(2)),!(a=e.Wc.get(a)))return 2;if(l=Number(l>>>0),f=Number(f>>>0),b=Number(b>>>0),l+f>a.byteLength)return 3;try{let C=a.subarray(l,l+f);switch(g){case 0:(x(),W).set(C,b>>>0);break;case 1:e.Ud?e.Ud(b,C):e.Hd(b,C);break;default:return 4}return 0}catch{return 4}},904356:(a,l,f)=>{e.sd(a,(x(),W).subarray(l>>>0,l+f>>>0))},904420:()=>e.Wd(),904462:a=>{e.rd(a)},904499:()=>{e.Ad()},904530:()=>{e.Bd()},904559:()=>{e.Fd()},904584:a=>e.zd(a),904617:a=>e.Dd(a),904649:(a,l,f)=>{e.cd(Number(a),Number(l),Number(f),!0)},904712:(a,l,f)=>{e.cd(Number(a),Number(l),Number(f))},904769:()=>typeof wasmOffsetConverter<"u",904826:a=>{e.$b("Abs",a,void 0)},904877:a=>{e.$b("Neg",a,void 0)},904928:a=>{e.$b("Floor",a,void 0)},904981:a=>{e.$b("Ceil",a,void 0)},905033:a=>{e.$b("Reciprocal",a,void 0)},905091:a=>{e.$b("Sqrt",a,void 0)},905143:a=>{e.$b("Exp",a,void 0)},905194:a=>{e.$b("Erf",a,void 0)},905245:a=>{e.$b("Sigmoid",a,void 0)},905300:(a,l,f)=>{e.$b("HardSigmoid",a,{alpha:l,beta:f})},905379:a=>{e.$b("Log",a,void 0)},905430:a=>{e.$b("Sin",a,void 0)},905481:a=>{e.$b("Cos",a,void 0)},905532:a=>{e.$b("Tan",a,void 0)},905583:a=>{e.$b("Asin",a,void 0)},905635:a=>{e.$b("Acos",a,void 0)},905687:a=>{e.$b("Atan",a,void 0)},905739:a=>{e.$b("Sinh",a,void 0)},905791:a=>{e.$b("Cosh",a,void 0)},905843:a=>{e.$b("Asinh",a,void 0)},905896:a=>{e.$b("Acosh",a,void 0)},905949:a=>{e.$b("Atanh",a,void 0)},906002:a=>{e.$b("Tanh",a,void 0)},906054:a=>{e.$b("Not",a,void 0)},906105:(a,l,f)=>{e.$b("Clip",a,{min:l,max:f})},906174:a=>{e.$b("Clip",a,void 0)},906226:(a,l)=>{e.$b("Elu",a,{alpha:l})},906284:a=>{e.$b("Gelu",a,void 0)},906336:a=>{e.$b("Relu",a,void 0)},906388:(a,l)=>{e.$b("LeakyRelu",a,{alpha:l})},906452:(a,l)=>{e.$b("ThresholdedRelu",a,{alpha:l})},906522:(a,l)=>{e.$b("Cast",a,{to:l})},906580:a=>{e.$b("Add",a,void 0)},906631:a=>{e.$b("Sub",a,void 0)},906682:a=>{e.$b("Mul",a,void 0)},906733:a=>{e.$b("Div",a,void 0)},906784:a=>{e.$b("Pow",a,void 0)},906835:a=>{e.$b("Equal",a,void 0)},906888:a=>{e.$b("Greater",a,void 0)},906943:a=>{e.$b("GreaterOrEqual",a,void 0)},907005:a=>{e.$b("Less",a,void 0)},907057:a=>{e.$b("LessOrEqual",a,void 0)},907116:(a,l,f,b,g)=>{e.$b("ReduceMean",a,{keepDims:!!l,noopWithEmptyAxes:!!f,axes:b?Array.from((x(),z).subarray(Number(b)>>>0,Number(g)>>>0)):[]})},907291:(a,l,f,b,g)=>{e.$b("ReduceMax",a,{keepDims:!!l,noopWithEmptyAxes:!!f,axes:b?Array.from((x(),z).subarray(Number(b)>>>0,Number(g)>>>0)):[]})},907465:(a,l,f,b,g)=>{e.$b("ReduceMin",a,{keepDims:!!l,noopWithEmptyAxes:!!f,axes:b?Array.from((x(),z).subarray(Number(b)>>>0,Number(g)>>>0)):[]})},907639:(a,l,f,b,g)=>{e.$b("ReduceProd",a,{keepDims:!!l,noopWithEmptyAxes:!!f,axes:b?Array.from((x(),z).subarray(Number(b)>>>0,Number(g)>>>0)):[]})},907814:(a,l,f,b,g)=>{e.$b("ReduceSum",a,{keepDims:!!l,noopWithEmptyAxes:!!f,axes:b?Array.from((x(),z).subarray(Number(b)>>>0,Number(g)>>>0)):[]})},907988:(a,l,f,b,g)=>{e.$b("ReduceL1",a,{keepDims:!!l,noopWithEmptyAxes:!!f,axes:b?Array.from((x(),z).subarray(Number(b)>>>0,Number(g)>>>0)):[]})},908161:(a,l,f,b,g)=>{e.$b("ReduceL2",a,{keepDims:!!l,noopWithEmptyAxes:!!f,axes:b?Array.from((x(),z).subarray(Number(b)>>>0,Number(g)>>>0)):[]})},908334:(a,l,f,b,g)=>{e.$b("ReduceLogSum",a,{keepDims:!!l,noopWithEmptyAxes:!!f,axes:b?Array.from((x(),z).subarray(Number(b)>>>0,Number(g)>>>0)):[]})},908511:(a,l,f,b,g)=>{e.$b("ReduceSumSquare",a,{keepDims:!!l,noopWithEmptyAxes:!!f,axes:b?Array.from((x(),z).subarray(Number(b)>>>0,Number(g)>>>0)):[]})},908691:(a,l,f,b,g)=>{e.$b("ReduceLogSumExp",a,{keepDims:!!l,noopWithEmptyAxes:!!f,axes:b?Array.from((x(),z).subarray(Number(b)>>>0,Number(g)>>>0)):[]})},908871:a=>{e.$b("Where",a,void 0)},908924:(a,l,f)=>{e.$b("Transpose",a,{perm:l?Array.from((x(),z).subarray(Number(l)>>>0,Number(f)>>>0)):[]})},909048:(a,l,f,b)=>{e.$b("DepthToSpace",a,{blocksize:l,mode:Ae(f),format:b?"NHWC":"NCHW"})},909181:(a,l,f,b)=>{e.$b("DepthToSpace",a,{blocksize:l,mode:Ae(f),format:b?"NHWC":"NCHW"})},909314:(a,l,f,b,g,C,P,M,G,H,se,pe,ve,$e,bt)=>{e.$b("ConvTranspose",a,{format:G?"NHWC":"NCHW",autoPad:l,dilations:[f],group:b,kernelShape:[g],pads:[C,P],strides:[M],wIsConst:()=>!!(x(),Z)[H>>>0],outputPadding:se?Array.from((x(),z).subarray(Number(se)>>>0,Number(pe)>>>0)):[],outputShape:ve?Array.from((x(),z).subarray(Number(ve)>>>0,Number($e)>>>0)):[],activation:Ae(bt)})},909747:(a,l,f,b,g,C,P,M,G,H,se,pe,ve,$e)=>{e.$b("ConvTranspose",a,{format:M?"NHWC":"NCHW",autoPad:l,dilations:Array.from((x(),z).subarray(Number(f)>>>0,2+(Number(f)>>>0)>>>0)),group:b,kernelShape:Array.from((x(),z).subarray(Number(g)>>>0,2+(Number(g)>>>0)>>>0)),pads:Array.from((x(),z).subarray(Number(C)>>>0,4+(Number(C)>>>0)>>>0)),strides:Array.from((x(),z).subarray(Number(P)>>>0,2+(Number(P)>>>0)>>>0)),wIsConst:()=>!!(x(),Z)[G>>>0],outputPadding:H?Array.from((x(),z).subarray(Number(H)>>>0,Number(se)>>>0)):[],outputShape:pe?Array.from((x(),z).subarray(Number(pe)>>>0,Number(ve)>>>0)):[],activation:Ae($e)})},910408:(a,l,f,b,g,C,P,M,G,H,se,pe,ve,$e,bt)=>{e.$b("ConvTranspose",a,{format:G?"NHWC":"NCHW",autoPad:l,dilations:[f],group:b,kernelShape:[g],pads:[C,P],strides:[M],wIsConst:()=>!!(x(),Z)[H>>>0],outputPadding:se?Array.from((x(),z).subarray(Number(se)>>>0,Number(pe)>>>0)):[],outputShape:ve?Array.from((x(),z).subarray(Number(ve)>>>0,Number($e)>>>0)):[],activation:Ae(bt)})},910841:(a,l,f,b,g,C,P,M,G,H,se,pe,ve,$e)=>{e.$b("ConvTranspose",a,{format:M?"NHWC":"NCHW",autoPad:l,dilations:Array.from((x(),z).subarray(Number(f)>>>0,2+(Number(f)>>>0)>>>0)),group:b,kernelShape:Array.from((x(),z).subarray(Number(g)>>>0,2+(Number(g)>>>0)>>>0)),pads:Array.from((x(),z).subarray(Number(C)>>>0,4+(Number(C)>>>0)>>>0)),strides:Array.from((x(),z).subarray(Number(P)>>>0,2+(Number(P)>>>0)>>>0)),wIsConst:()=>!!(x(),Z)[G>>>0],outputPadding:H?Array.from((x(),z).subarray(Number(H)>>>0,Number(se)>>>0)):[],outputShape:pe?Array.from((x(),z).subarray(Number(pe)>>>0,Number(ve)>>>0)):[],activation:Ae($e)})},911502:(a,l)=>{e.$b("GlobalAveragePool",a,{format:l?"NHWC":"NCHW"})},911593:(a,l,f,b,g,C,P,M,G,H,se,pe,ve,$e)=>{e.$b("AveragePool",a,{format:$e?"NHWC":"NCHW",auto_pad:l,ceil_mode:f,count_include_pad:b,storage_order:g,dilations:C?Array.from((x(),z).subarray(Number(C)>>>0,Number(P)>>>0)):[],kernel_shape:M?Array.from((x(),z).subarray(Number(M)>>>0,Number(G)>>>0)):[],pads:H?Array.from((x(),z).subarray(Number(H)>>>0,Number(se)>>>0)):[],strides:pe?Array.from((x(),z).subarray(Number(pe)>>>0,Number(ve)>>>0)):[]})},912072:(a,l)=>{e.$b("GlobalAveragePool",a,{format:l?"NHWC":"NCHW"})},912163:(a,l,f,b,g,C,P,M,G,H,se,pe,ve,$e)=>{e.$b("AveragePool",a,{format:$e?"NHWC":"NCHW",auto_pad:l,ceil_mode:f,count_include_pad:b,storage_order:g,dilations:C?Array.from((x(),z).subarray(Number(C)>>>0,Number(P)>>>0)):[],kernel_shape:M?Array.from((x(),z).subarray(Number(M)>>>0,Number(G)>>>0)):[],pads:H?Array.from((x(),z).subarray(Number(H)>>>0,Number(se)>>>0)):[],strides:pe?Array.from((x(),z).subarray(Number(pe)>>>0,Number(ve)>>>0)):[]})},912642:(a,l)=>{e.$b("GlobalMaxPool",a,{format:l?"NHWC":"NCHW"})},912729:(a,l,f,b,g,C,P,M,G,H,se,pe,ve,$e)=>{e.$b("MaxPool",a,{format:$e?"NHWC":"NCHW",auto_pad:l,ceil_mode:f,count_include_pad:b,storage_order:g,dilations:C?Array.from((x(),z).subarray(Number(C)>>>0,Number(P)>>>0)):[],kernel_shape:M?Array.from((x(),z).subarray(Number(M)>>>0,Number(G)>>>0)):[],pads:H?Array.from((x(),z).subarray(Number(H)>>>0,Number(se)>>>0)):[],strides:pe?Array.from((x(),z).subarray(Number(pe)>>>0,Number(ve)>>>0)):[]})},913204:(a,l)=>{e.$b("GlobalMaxPool",a,{format:l?"NHWC":"NCHW"})},913291:(a,l,f,b,g,C,P,M,G,H,se,pe,ve,$e)=>{e.$b("MaxPool",a,{format:$e?"NHWC":"NCHW",auto_pad:l,ceil_mode:f,count_include_pad:b,storage_order:g,dilations:C?Array.from((x(),z).subarray(Number(C)>>>0,Number(P)>>>0)):[],kernel_shape:M?Array.from((x(),z).subarray(Number(M)>>>0,Number(G)>>>0)):[],pads:H?Array.from((x(),z).subarray(Number(H)>>>0,Number(se)>>>0)):[],strides:pe?Array.from((x(),z).subarray(Number(pe)>>>0,Number(ve)>>>0)):[]})},913766:(a,l,f,b,g)=>{e.$b("Gemm",a,{alpha:l,beta:f,transA:b,transB:g})},913870:a=>{e.$b("MatMul",a,void 0)},913924:(a,l,f,b)=>{e.$b("ArgMax",a,{keepDims:!!l,selectLastIndex:!!f,axis:b})},914032:(a,l,f,b)=>{e.$b("ArgMin",a,{keepDims:!!l,selectLastIndex:!!f,axis:b})},914140:(a,l)=>{e.$b("Softmax",a,{axis:l})},914203:(a,l)=>{e.$b("Concat",a,{axis:l})},914263:(a,l,f,b,g)=>{e.$b("Split",a,{axis:l,numOutputs:f,splitSizes:b?Array.from((x(),z).subarray(Number(b)>>>0,Number(g)>>>0)):[]})},914419:a=>{e.$b("Expand",a,void 0)},914473:(a,l)=>{e.$b("Gather",a,{axis:Number(l)})},914544:(a,l)=>{e.$b("GatherElements",a,{axis:Number(l)})},914623:(a,l)=>{e.$b("GatherND",a,{batch_dims:Number(l)})},914702:(a,l,f,b,g,C,P,M,G,H,se)=>{e.$b("Resize",a,{antialias:l,axes:f?Array.from((x(),z).subarray(Number(f)>>>0,Number(b)>>>0)):[],coordinateTransformMode:Ae(g),cubicCoeffA:C,excludeOutside:P,extrapolationValue:M,keepAspectRatioPolicy:Ae(G),mode:Ae(H),nearestMode:Ae(se)})},915064:(a,l,f,b,g,C,P)=>{e.$b("Slice",a,{starts:l?Array.from((x(),z).subarray(Number(l)>>>0,Number(f)>>>0)):[],ends:b?Array.from((x(),z).subarray(Number(b)>>>0,Number(g)>>>0)):[],axes:C?Array.from((x(),z).subarray(Number(C)>>>0,Number(P)>>>0)):[]})},915328:a=>{e.$b("Tile",a,void 0)},915380:(a,l,f)=>{e.$b("InstanceNormalization",a,{epsilon:l,format:f?"NHWC":"NCHW"})},915494:(a,l,f)=>{e.$b("InstanceNormalization",a,{epsilon:l,format:f?"NHWC":"NCHW"})},915608:a=>{e.$b("Range",a,void 0)},915661:(a,l)=>{e.$b("Einsum",a,{equation:Ae(l)})},915742:(a,l,f,b,g)=>{e.$b("Pad",a,{mode:l,value:f,pads:b?Array.from((x(),z).subarray(Number(b)>>>0,Number(g)>>>0)):[]})},915885:(a,l,f,b,g,C)=>{e.$b("BatchNormalization",a,{epsilon:l,momentum:f,spatial:!!g,trainingMode:!!b,format:C?"NHWC":"NCHW"})},916054:(a,l,f,b,g,C)=>{e.$b("BatchNormalization",a,{epsilon:l,momentum:f,spatial:!!g,trainingMode:!!b,format:C?"NHWC":"NCHW"})},916223:(a,l,f)=>{e.$b("CumSum",a,{exclusive:Number(l),reverse:Number(f)})},916320:(a,l,f)=>{e.$b("DequantizeLinear",a,{axis:l,blockSize:f})},916410:(a,l,f,b,g)=>{e.$b("GridSample",a,{align_corners:l,mode:Ae(f),padding_mode:Ae(b),format:g?"NHWC":"NCHW"})},916580:(a,l,f,b,g)=>{e.$b("GridSample",a,{align_corners:l,mode:Ae(f),padding_mode:Ae(b),format:g?"NHWC":"NCHW"})},916750:(a,l)=>{e.$b("ScatterND",a,{reduction:Ae(l)})},916835:(a,l,f,b,g,C,P,M,G)=>{e.$b("Attention",a,{numHeads:l,isUnidirectional:f,maskFilterValue:b,scale:g,doRotary:C,qkvHiddenSizes:P?Array.from((x(),z).subarray(Number(M)>>>0,Number(M)+P>>>0)):[],pastPresentShareBuffer:!!G})},917107:a=>{e.$b("BiasAdd",a,void 0)},917162:a=>{e.$b("BiasSplitGelu",a,void 0)},917223:a=>{e.$b("FastGelu",a,void 0)},917279:(a,l,f,b,g,C,P,M,G,H,se,pe,ve,$e,bt,Nn)=>{e.$b("Conv",a,{format:pe?"NHWC":"NCHW",auto_pad:l,dilations:f?Array.from((x(),z).subarray(Number(f)>>>0,Number(b)>>>0)):[],group:g,kernel_shape:C?Array.from((x(),z).subarray(Number(C)>>>0,Number(P)>>>0)):[],pads:M?Array.from((x(),z).subarray(Number(M)>>>0,Number(G)>>>0)):[],strides:H?Array.from((x(),z).subarray(Number(H)>>>0,Number(se)>>>0)):[],w_is_const:()=>!!(x(),Z)[Number(ve)>>>0],activation:Ae($e),activation_params:bt?Array.from((x(),Q).subarray(Number(bt)>>>0,Number(Nn)>>>0)):[]})},917863:a=>{e.$b("Gelu",a,void 0)},917915:(a,l,f,b,g,C,P,M,G)=>{e.$b("GroupQueryAttention",a,{numHeads:l,kvNumHeads:f,scale:b,softcap:g,doRotary:C,rotaryInterleaved:P,smoothSoftmax:M,localWindowSize:G})},918132:(a,l,f,b)=>{e.$b("LayerNormalization",a,{axis:l,epsilon:f,simplified:!!b})},918243:(a,l,f,b)=>{e.$b("LayerNormalization",a,{axis:l,epsilon:f,simplified:!!b})},918354:(a,l,f,b,g,C)=>{e.$b("MatMulNBits",a,{k:l,n:f,accuracyLevel:b,bits:g,blockSize:C})},918481:(a,l,f,b,g,C)=>{e.$b("MultiHeadAttention",a,{numHeads:l,isUnidirectional:f,maskFilterValue:b,scale:g,doRotary:C})},918640:(a,l)=>{e.$b("QuickGelu",a,{alpha:l})},918704:(a,l,f,b,g)=>{e.$b("RotaryEmbedding",a,{interleaved:!!l,numHeads:f,rotaryEmbeddingDim:b,scale:g})},918843:(a,l,f)=>{e.$b("SkipLayerNormalization",a,{epsilon:l,simplified:!!f})},918945:(a,l,f)=>{e.$b("SkipLayerNormalization",a,{epsilon:l,simplified:!!f})},919047:(a,l,f,b)=>{e.$b("GatherBlockQuantized",a,{gatherAxis:l,quantizeAxis:f,blockSize:b})},919168:a=>{e.Ed(a)},919202:(a,l)=>e.Gd(Number(a),Number(l),e.Xc.Jd,e.Xc.errors)};function Im(a,l,f){return yi(async()=>{await e.Cd(Number(a),Number(l),Number(f))})}function Cm(){return typeof wasmOffsetConverter<"u"}var Bi,Mi,Dn,Je,Zt,Bn,Ri,Ui,Ni,Mn,Vi,Li,ce,Qt,Wi,ue,Rn,de,Gi,Hi,Fi,qi,Ki,Un,ji,Zi,Qi,Yi,Xi,Ji,ea,ta,ra,na,oa,ia,aa,sa,ua,da,la,ca,pa,ma,fa,ha,ga,ba,ya,_a,wa,va,$a,xa,Sa,Ta,Ia,Ca,Aa,Ea,ka,Pa,za,gt=await async function(){function a(b,g){var C=gt=b.exports;b={};for(let[P,M]of Object.entries(C))typeof M=="function"?(C=Np(M),b[P]=C):b[P]=M;return gt=b,gt=function(){var P=gt,M=H=>se=>H(se)>>>0,G=H=>()=>H()>>>0;return(P=Object.assign({},P)).tb=M(P.tb),P.Xb=G(P.Xb),P.Zb=M(P.Zb),P.lc=M(P.lc),P.mc=G(P.mc),P.qc=M(P.qc),P}(),Lo.push(gt._b),y=g,Bi=(g=gt).tb,Mi=g.ub,e._OrtInit=g.vb,e._OrtGetLastError=g.wb,e._OrtCreateSessionOptions=g.xb,e._OrtAppendExecutionProvider=g.yb,e._OrtAddFreeDimensionOverride=g.zb,e._OrtAddSessionConfigEntry=g.Ab,e._OrtReleaseSessionOptions=g.Bb,e._OrtCreateSession=g.Cb,e._OrtReleaseSession=g.Db,e._OrtGetInputOutputCount=g.Eb,e._OrtGetInputOutputMetadata=g.Fb,e._OrtFree=g.Gb,e._OrtCreateTensor=g.Hb,e._OrtGetTensorData=g.Ib,e._OrtReleaseTensor=g.Jb,e._OrtCreateRunOptions=g.Kb,e._OrtAddRunConfigEntry=g.Lb,e._OrtReleaseRunOptions=g.Mb,e._OrtCreateBinding=g.Nb,e._OrtBindInput=g.Ob,e._OrtBindOutput=g.Pb,e._OrtClearBoundOutputs=g.Qb,e._OrtReleaseBinding=g.Rb,e._OrtRunWithBinding=g.Sb,e._OrtRun=g.Tb,e._OrtEndProfiling=g.Ub,e._JsepOutput=g.Vb,e._JsepGetNodeName=g.Wb,Dn=g.Xb,e._free=Je=g.Yb,e._malloc=Zt=g.Zb,Bn=g.ac,Ri=g.bc,Ui=g.cc,Ni=g.dc,Mn=g.ec,Vi=g.fc,Li=g.gc,ce=g.hc,Qt=g.ic,Wi=g.jc,ue=g.kc,Rn=g.lc,de=g.mc,Gi=g.nc,Hi=g.oc,Fi=g.pc,qi=g.qc,Ki=g.rc,Un=g.sc,ji=g.tc,Zi=g.uc,Qi=g.vc,Yi=g.wc,Xi=g.xc,Ji=g.yc,ea=g.zc,ta=g.Ac,ra=g.Bc,na=g.Cc,oa=g.Dc,ia=g.Ec,aa=g.Fc,sa=g.Gc,ua=g.Hc,da=g.Ic,la=g.Jc,ca=g.Kc,pa=g.Lc,ma=g.Mc,fa=g.Oc,ha=g.Pc,ga=g._c,ba=g.$c,ya=g.ed,_a=g.hd,wa=g.id,va=g.jd,$a=g.kd,xa=g.ld,Sa=g.md,Ta=g.nd,Ia=g.od,Ca=g.pd,Aa=g.ud,Ea=g.Qd,ka=g.Rd,Pa=g.Sd,za=g.Td,Ce(),gt}Oe++;var l,f=He();return e.instantiateWasm?new Promise(b=>{e.instantiateWasm(f,(g,C)=>{b(a(g,C))})}):o?new Promise(b=>{v=g=>{var C=new WebAssembly.Instance(g,He());b(a(C,g))}}):(me??=e.locateFile?e.locateFile?e.locateFile("ort-wasm-simd-threaded.jsep.wasm",h):h+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,l=await async function(b){var g=me;if(!_&&typeof WebAssembly.instantiateStreaming=="function"&&!R(g))try{var C=fetch(g,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(C,b)}catch(P){D(`wasm streaming compile failed: ${P}`),D("falling back to ArrayBuffer instantiation")}return async function(P,M){try{var G=await async function(H){if(!_)try{var se=await d(H);return new Uint8Array(se)}catch{}if(H==me&&_)H=new Uint8Array(_);else{if(!c)throw"both async and sync fetching of the wasm failed";H=c(H)}return H}(P);return await WebAssembly.instantiate(G,M)}catch(H){D(`failed to asynchronously prepare wasm: ${H}`),ye(H)}}(g,b)}(f),a(l.instance,l.module))}();function Am(a,l,f,b){var g=de();try{return Xi(a,l,f,b)}catch(C){if(ue(g),C!==C+0)throw C;ce(1,0)}}function Em(a,l,f){var b=de();try{return Yi(a,l,f)}catch(g){if(ue(b),g!==g+0)throw g;ce(1,0)}}function km(a,l,f){var b=de();try{Ki(a,l,f)}catch(g){if(ue(b),g!==g+0)throw g;ce(1,0)}}function Pm(a,l){var f=de();try{return Un(a,l)}catch(b){if(ue(f),b!==b+0)throw b;ce(1,0)}}function zm(a){var l=de();try{ji(a)}catch(f){if(ue(l),f!==f+0)throw f;ce(1,0)}}function Om(a,l,f,b,g,C,P){var M=de();try{return ea(a,l,f,b,g,C,P)}catch(G){if(ue(M),G!==G+0)throw G;ce(1,0)}}function Dm(a,l){var f=de();try{ra(a,l)}catch(b){if(ue(f),b!==b+0)throw b;ce(1,0)}}function Bm(a,l,f,b){var g=de();try{ta(a,l,f,b)}catch(C){if(ue(g),C!==C+0)throw C;ce(1,0)}}function Mm(a,l,f,b,g){var C=de();try{Qi(a,l,f,b,g)}catch(P){if(ue(C),P!==P+0)throw P;ce(1,0)}}function Rm(a,l,f,b,g,C,P){var M=de();try{oa(a,l,f,b,g,C,P)}catch(G){if(ue(M),G!==G+0)throw G;ce(1,0)}}function Um(a,l,f,b,g,C,P){var M=de();try{ia(a,l,f,b,g,C,P)}catch(G){if(ue(M),G!==G+0)throw G;ce(1,0)}}function Nm(a,l,f,b,g,C,P,M){var G=de();try{sa(a,l,f,b,g,C,P,M)}catch(H){if(ue(G),H!==H+0)throw H;ce(1,0)}}function Vm(a,l,f,b,g,C){var P=de();try{Zi(a,l,f,b,g,C)}catch(M){if(ue(P),M!==M+0)throw M;ce(1,0)}}function Lm(a,l,f,b,g){var C=de();try{return na(a,l,f,b,g)}catch(P){if(ue(C),P!==P+0)throw P;ce(1,0)}}function Wm(a,l,f,b,g,C,P,M){var G=de();try{ua(a,l,f,b,g,C,P,M)}catch(H){if(ue(G),H!==H+0)throw H;ce(1,0)}}function Gm(a,l,f,b,g,C,P,M,G,H,se,pe){var ve=de();try{aa(a,l,f,b,g,C,P,M,G,H,se,pe)}catch($e){if(ue(ve),$e!==$e+0)throw $e;ce(1,0)}}function Hm(a,l,f,b,g,C){var P=de();try{return da(a,l,f,b,g,C)}catch(M){if(ue(P),M!==M+0)throw M;ce(1,0)}}function Fm(a,l,f){var b=de();try{return la(a,l,f)}catch(g){if(ue(b),g!==g+0)throw g;return ce(1,0),0n}}function qm(a,l,f,b,g,C,P,M,G){var H=de();try{Ji(a,l,f,b,g,C,P,M,G)}catch(se){if(ue(H),se!==se+0)throw se;ce(1,0)}}function Km(a){var l=de();try{return ca(a)}catch(f){if(ue(l),f!==f+0)throw f;ce(1,0)}}function jm(a,l){var f=de();try{return Aa(a,l)}catch(b){if(ue(f),b!==b+0)throw b;return ce(1,0),0n}}function Zm(a){var l=de();try{return ma(a)}catch(f){if(ue(l),f!==f+0)throw f;return ce(1,0),0n}}function Qm(a,l,f,b,g,C){var P=de();try{return _a(a,l,f,b,g,C)}catch(M){if(ue(P),M!==M+0)throw M;ce(1,0)}}function Ym(a,l,f,b,g,C){var P=de();try{return wa(a,l,f,b,g,C)}catch(M){if(ue(P),M!==M+0)throw M;ce(1,0)}}function Xm(a,l,f){var b=de();try{return va(a,l,f)}catch(g){if(ue(b),g!==g+0)throw g;ce(1,0)}}function Jm(a,l,f,b,g,C,P,M){var G=de();try{return pa(a,l,f,b,g,C,P,M)}catch(H){if(ue(G),H!==H+0)throw H;ce(1,0)}}function ef(a,l,f,b,g){var C=de();try{return $a(a,l,f,b,g)}catch(P){if(ue(C),P!==P+0)throw P;return ce(1,0),0n}}function tf(a,l,f,b){var g=de();try{return xa(a,l,f,b)}catch(C){if(ue(g),C!==C+0)throw C;ce(1,0)}}function rf(a,l,f,b){var g=de();try{return Sa(a,l,f,b)}catch(C){if(ue(g),C!==C+0)throw C;ce(1,0)}}function nf(a,l,f,b,g,C,P,M,G,H,se,pe){var ve=de();try{return Ta(a,l,f,b,g,C,P,M,G,H,se,pe)}catch($e){if(ue(ve),$e!==$e+0)throw $e;ce(1,0)}}function of(a,l,f,b,g,C,P,M,G,H,se){var pe=de();try{ba(a,l,f,b,g,C,P,M,G,H,se)}catch(ve){if(ue(pe),ve!==ve+0)throw ve;ce(1,0)}}function af(a,l,f,b,g,C,P,M,G,H,se,pe,ve,$e,bt,Nn){var pf=de();try{ya(a,l,f,b,g,C,P,M,G,H,se,pe,ve,$e,bt,Nn)}catch(Vn){if(ue(pf),Vn!==Vn+0)throw Vn;ce(1,0)}}function sf(a,l,f,b){var g=de();try{return Ia(a,l,f,b)}catch(C){if(ue(g),C!==C+0)throw C;ce(1,0)}}function uf(a,l,f,b,g){var C=de();try{return Ca(a,l,f,b,g)}catch(P){if(ue(C),P!==P+0)throw P;ce(1,0)}}function df(a,l,f){var b=de();try{return fa(a,l,f)}catch(g){if(ue(b),g!==g+0)throw g;ce(1,0)}}function lf(a,l,f){var b=de();try{return ha(a,l,f)}catch(g){if(ue(b),g!==g+0)throw g;ce(1,0)}}function cf(a,l,f,b){var g=de();try{ga(a,l,f,b)}catch(C){if(ue(g),C!==C+0)throw C;ce(1,0)}}return function a(){if(0<Oe)De=a;else if(o)S?.(e),X();else{for(;0<dr.length;)dr.shift()(e);0<Oe?De=a:(e.calledRun=!0,B||(X(),S?.(e)))}}(),e.PTR_SIZE=4,te?e:new Promise((a,l)=>{S=a,$=l})}var wf,vf,fs=V(()=>{"use strict";wf=ps,vf=globalThis.self?.name?.startsWith("em-pthread");vf&&ps()});var bs,Yn,$f,Ve,ys,Qn,xf,Sf,_s,Tf,hs,ws,gs,vs,Tr=V(()=>{"use strict";Sr();bs=typeof location>"u"?void 0:location.origin,Yn=import.meta.url>"file:"&&import.meta.url<"file;",$f=()=>{if(!!1){if(Yn){let t=URL;return new URL(new t("ort.bundle.min.mjs",import.meta.url).href,bs).href}return import.meta.url}},Ve=$f(),ys=()=>{if(Ve&&!Ve.startsWith("blob:"))return Ve.substring(0,Ve.lastIndexOf("/")+1)},Qn=(t,e)=>{try{let r=e??Ve;return(r?new URL(t,r):new URL(t)).origin===bs}catch{return!1}},xf=(t,e)=>{let r=e??Ve;try{return(r?new URL(t,r):new URL(t)).href}catch{return}},Sf=(t,e)=>`${e??"./"}${t}`,_s=async t=>{let r=await(await fetch(t,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},Tf=async t=>(await import(/*webpackIgnore:true*/t)).default,hs=(cs(),Yt(ls)).default,ws=async()=>{if(!Ve)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Qn(Ve))return[void 0,hs()];let t=await _s(Ve);return[t,hs(t)]},gs=(fs(),Yt(ms)).default,vs=async(t,e,r,n)=>{let o=gs&&!(t||e);if(o)if(Ve)o=Qn(Ve);else if(n&&!r)o=!0;else throw new Error("cannot determine the script source URL.");if(o)return[void 0,gs];{let i="ort-wasm-simd-threaded.jsep.mjs",s=t??xf(i,e),u=!!1&&r&&s&&!Qn(s,e),d=u?await _s(s):s??Sf(i,e);return[u?d:void 0,await Tf(d)]}}});var Xn,Jn,Dr,$s,If,Cf,Af,Ir,be,wt=V(()=>{"use strict";Tr();Jn=!1,Dr=!1,$s=!1,If=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Cf=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Af=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Ir=async t=>{if(Jn)return Promise.resolve();if(Dr)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if($s)throw new Error("previous call to 'initializeWebAssembly()' failed.");Dr=!0;let e=t.initTimeout,r=t.numThreads;if(t.simd!==!1){if(t.simd==="relaxed"){if(!Af())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!Cf())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let n=If();r>1&&!n&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),t.numThreads=r=1);let o=t.wasmPaths,i=typeof o=="string"?o:void 0,s=o?.mjs,u=s?.href??s,d=o?.wasm,c=d?.href??d,p=t.wasmBinary,[m,h]=await vs(u,i,r>1,!!p||!!c),_=!1,y=[];if(e>0&&y.push(new Promise(w=>{setTimeout(()=>{_=!0,w()},e)})),y.push(new Promise((w,S)=>{let $={numThreads:r};if(p)$.wasmBinary=p;else if(c||i)$.locateFile=v=>c??i+v;else if(u&&u.indexOf("blob:")!==0)$.locateFile=v=>new URL(v,u).href;else if(m){let v=ys();v&&($.locateFile=T=>v+T)}h($).then(v=>{Dr=!1,Jn=!0,Xn=v,w(),m&&URL.revokeObjectURL(m)},v=>{Dr=!1,$s=!0,S(v)})})),await Promise.race(y),_)throw new Error(`WebAssembly backend initializing failed due to timeout: ${e}ms`)},be=()=>{if(Jn&&Xn)return Xn;throw new Error("WebAssembly is not initialized yet.")}});var Le,er,he,Br=V(()=>{"use strict";wt();Le=(t,e)=>{let r=be(),n=r.lengthBytesUTF8(t)+1,o=r._malloc(n);return r.stringToUTF8(t,o,n),e.push(o),o},er=(t,e,r,n)=>{if(typeof t=="object"&&t!==null){if(r.has(t))throw new Error("Circular reference in options");r.add(t)}Object.entries(t).forEach(([o,i])=>{let s=e?e+o:o;if(typeof i=="object")er(i,s+".",r,n);else if(typeof i=="string"||typeof i=="number")n(s,i.toString());else if(typeof i=="boolean")n(s,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},he=t=>{let e=be(),r=e.stackSave();try{let n=e.PTR_SIZE,o=e.stackAlloc(2*n);e._OrtGetLastError(o,o+n);let i=Number(e.getValue(o,n===4?"i32":"i64")),s=e.getValue(o+n,"*"),u=s?e.UTF8ToString(s):"";throw new Error(`${t} ERROR_CODE: ${i}, ERROR_MESSAGE: ${u}`)}finally{e.stackRestore(r)}}});var xs,Ss=V(()=>{"use strict";wt();Br();xs=t=>{let e=be(),r=0,n=[],o=t||{};try{if(t?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof t.logSeverityLevel!="number"||!Number.isInteger(t.logSeverityLevel)||t.logSeverityLevel<0||t.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${t.logSeverityLevel}`);if(t?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof t.logVerbosityLevel!="number"||!Number.isInteger(t.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${t.logVerbosityLevel}`);t?.terminate===void 0&&(o.terminate=!1);let i=0;return t?.tag!==void 0&&(i=Le(t.tag,n)),r=e._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),r===0&&he("Can't create run options."),t?.extra!==void 0&&er(t.extra,"",new WeakSet,(s,u)=>{let d=Le(s,n),c=Le(u,n);e._OrtAddRunConfigEntry(r,d,c)!==0&&he(`Can't set a run config entry: ${s} - ${u}.`)}),[r,n]}catch(i){throw r!==0&&e._OrtReleaseRunOptions(r),n.forEach(s=>e._free(s)),i}}});var Ef,kf,Pf,Mr,zf,Ts,Is=V(()=>{"use strict";wt();Br();Ef=t=>{switch(t){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${t}`)}},kf=t=>{switch(t){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${t}`)}},Pf=t=>{t.extra||(t.extra={}),t.extra.session||(t.extra.session={});let e=t.extra.session;e.use_ort_model_bytes_directly||(e.use_ort_model_bytes_directly="1"),t.executionProviders&&t.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(t.enableMemPattern=!1)},Mr=(t,e,r,n)=>{let o=Le(e,n),i=Le(r,n);be()._OrtAddSessionConfigEntry(t,o,i)!==0&&he(`Can't set a session config entry: ${e} - ${r}.`)},zf=async(t,e,r)=>{for(let n of e){let o=typeof n=="string"?n:n.name,i=[];switch(o){case"webnn":if(o="WEBNN",typeof n!="string"){let m=n?.deviceType;m&&Mr(t,"deviceType",m,r)}break;case"webgpu":if(o="JS",typeof n!="string"){let p=n;if(p?.preferredLayout){if(p.preferredLayout!=="NCHW"&&p.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${p.preferredLayout}`);Mr(t,"preferredLayout",p.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let s=Le(o,r),u=i.length,d=0,c=0;if(u>0){d=be()._malloc(u*be().PTR_SIZE),r.push(d),c=be()._malloc(u*be().PTR_SIZE),r.push(c);for(let p=0;p<u;p++)be().setValue(d+p*be().PTR_SIZE,i[p][0],"*"),be().setValue(c+p*be().PTR_SIZE,i[p][1],"*")}await be()._OrtAppendExecutionProvider(t,s,d,c,u)!==0&&he(`Can't append execution provider: ${o}.`)}},Ts=async t=>{let e=be(),r=0,n=[],o=t||{};Pf(o);try{let i=Ef(o.graphOptimizationLevel??"all"),s=kf(o.executionMode??"sequential"),u=typeof o.logId=="string"?Le(o.logId,n):0,d=o.logSeverityLevel??2;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log severity level is not valid: ${d}`);let c=o.logVerbosityLevel??0;if(!Number.isInteger(c)||c<0||c>4)throw new Error(`log verbosity level is not valid: ${c}`);let p=typeof o.optimizedModelFilePath=="string"?Le(o.optimizedModelFilePath,n):0;if(r=e._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,s,!!o.enableProfiling,0,u,d,c,p),r===0&&he("Can't create session options."),o.executionProviders&&await zf(r,o.executionProviders,n),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);Mr(r,"enableGraphCapture",o.enableGraphCapture.toString(),n)}if(o.freeDimensionOverrides)for(let[m,h]of Object.entries(o.freeDimensionOverrides)){if(typeof m!="string")throw new Error(`free dimension override name must be a string: ${m}`);if(typeof h!="number"||!Number.isInteger(h)||h<0)throw new Error(`free dimension override value must be a non-negative integer: ${h}`);let _=Le(m,n);e._OrtAddFreeDimensionOverride(r,_,h)!==0&&he(`Can't set a free dimension override: ${m} - ${h}.`)}return o.extra!==void 0&&er(o.extra,"",new WeakSet,(m,h)=>{Mr(r,m,h,n)}),[r,n]}catch(i){throw r!==0&&e._OrtReleaseSessionOptions(r)!==0&&he("Can't release session options."),n.forEach(s=>e._free(s)),i}}});var vt,et,$t,Vt,tr,Rr,Ur,eo,J=V(()=>{"use strict";vt=t=>{switch(t){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${t}`)}},et=t=>{switch(t){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${t}`)}},$t=(t,e)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][t],n=typeof e=="number"?e:e.reduce((o,i)=>o*i,1);return r>0?Math.ceil(n*r):void 0},Vt=t=>{switch(t){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${t}`)}},tr=t=>{switch(t){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${t}`)}},Rr=t=>t==="float32"||t==="float16"||t==="int32"||t==="int64"||t==="uint32"||t==="uint8"||t==="bool"||t==="uint4"||t==="int4",Ur=t=>t==="float32"||t==="float16"||t==="int32"||t==="int64"||t==="uint32"||t==="uint64"||t==="int8"||t==="uint8"||t==="bool"||t==="uint4"||t==="int4",eo=t=>{switch(t){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${t}`)}}});var rr,to=V(()=>{"use strict";Sr();rr=async t=>{if(typeof t=="string")if(!1)try{let{readFile:e}=Wn("node:fs/promises");return new Uint8Array(await e(t))}catch(e){if(e.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=Wn("node:fs"),n=r(t),o=[];for await(let i of n)o.push(i);return new Uint8Array(Buffer.concat(o))}throw e}else{let e=await fetch(t);if(!e.ok)throw new Error(`failed to load external data file: ${t}`);let r=e.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<1073741824)return new Uint8Array(await e.arrayBuffer());{if(!e.body)throw new Error(`failed to load external data file: ${t}, no response body.`);let o=e.body.getReader(),i;try{i=new ArrayBuffer(n)}catch(u){if(u instanceof RangeError){let d=Math.ceil(n/65536);i=new WebAssembly.Memory({initial:d,maximum:d}).buffer}else throw u}let s=0;for(;;){let{done:u,value:d}=await o.read();if(u)break;let c=d.byteLength;new Uint8Array(i,s,c).set(d),s+=c}return new Uint8Array(i,0,n)}}else return t instanceof Blob?new Uint8Array(await t.arrayBuffer()):t instanceof Uint8Array?t:new Uint8Array(t)}});var Of,Df,Cs,As,Nr,Bf,ae,tt=V(()=>{"use strict";J();Of=["V","I","W","E","F"],Df=(t,e)=>{console.log(`[${Of[t]},${new Date().toISOString()}]${e}`)},Nr=(t,e)=>{Cs=t,As=e},Bf=(t,e)=>{let r=tr(t),n=tr(Cs);r>=n&&Df(r,typeof e=="function"?e():e)},ae=(...t)=>{As&&Bf(...t)}});var ro,rt,k,zt,Vr,Es,ks,re=V(()=>{"use strict";ro=class{static calcMatMulShape(e,r){return e[1]!==r[0]?void 0:[e[0],r[1]]}},rt=class{static calcShape(e,r,n=!1){let o=e.length,i=r.length;if(o===0)return r;if(i===0)return e;let s=Math.max(e.length,r.length),u=new Array(s);if(n){if(o<2||i<2)return;let d=ro.calcMatMulShape([e[o-2],e[o-1]],[r[i-2],r[i-1]]);if(d===void 0)return;[u[s-2],u[s-1]]=d}for(let d=n?3:1;d<=s;d++){let c=o-d<0?1:e[o-d],p=i-d<0?1:r[i-d];if(c!==p&&c>1&&p>1)return;let m=Math.max(c,p);if(c&&p)u[s-d]=Math.max(c,p);else{if(m>1)return;u[s-d]=0}}return u}static isValidBroadcast(e,r){let n=e.length,o=r.length;if(n>o)return!1;for(let i=1;i<=n;i++)if(e[n-i]!==1&&e[n-i]!==r[o-i])return!1;return!0}},k=class t{static size(e){return t.getSizeFromDimensionRange(e,0,e.length)}static convertShape(e,r=4){let n=e.length;if(n===0)return[];let o=new Array(n),i=n-1;for(;i>=0;){if(e[i]%r===0){o[i]=e[i]/r;break}if(r%e[i]!==0)throw new Error("cannot convert shape");o[i]=1,r/=e[i],i--}for(i--;i>=0;i--)o[i]=e[i];return o}static sizeFromDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return t.getSizeFromDimensionRange(e,r,e.length)}static sizeToDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${e.length} dimensions.`);return t.getSizeFromDimensionRange(e,0,r)}static getSizeFromDimensionRange(e,r,n){let o=1;for(let i=r;i<n;i++){if(e[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(e[i])}return o}static computeStrides(e){let r=e.length;if(r===0)return[];if(r===1)return[1];let n=new Array(r);n[r-1]=1,n[r-2]=e[r-1];for(let o=r-3;o>=0;--o)n[o]=n[o+1]*e[o+1];return n}static normalizeAxis(e,r){if(e<-r&&e>=r)throw new Error("unsupported axis for this operation.");return e<0?e+r:e}static normalizeAxes(e,r){return e.map(n=>this.normalizeAxis(n,r??e.length))}static sortBasedOnPerm(e,r){return r?r.map(n=>e[n]):e.slice().reverse()}static padShape(e,r){let n=e.length;return e.map((o,i)=>o+r[i]+r[i+n])}static areEqual(e,r){return e.length!==r.length?!1:e.every((n,o)=>n===r[o])}},zt=class t{static adjustPoolAttributes(e,r,n,o,i,s){if(!e&&n.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let u=0;u<r.length-2;u++)u>=n.length?n.push(r[u+2]):n[u]=r[u+2];for(let u=0;u<n.length;u++)if(u<o.length){if(o[u]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let u=0;u<n.length;u++)if(u<i.length){if(i[u]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let u=0;u<n.length*2;u++)if(u<s.length){if(s[u]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let u=0;u<n.length;u++){if(n[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[u]>=n[u]||s[u+n.length]>=n[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,r,n,o,i,s,u){if(u){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let d=0;d<e.length-2;d++)t.adjustPadAndReturnShape(e[d+(s?1:2)],r[d],n[d],o[d],i,d,d+e.length-2,u)}}static computePoolOutputShape(e,r,n,o,i,s,u){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let d=[r[0],r[1]];return t.computeShapeHelper(e,r,d,n,o,i,s,u),d}static computeConvOutputShape(e,r,n,o,i,s,u){if(e.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let d=[e[0],r[0]];return t.computeShapeHelper(!1,e,d,n,o,i,s,u),d}static computeShapeHelper(e,r,n,o,i,s,u,d){if(e)for(let c=0;c<r.length-2;c++)n.push(1);else for(let c=0;c<r.length-2;c++)n.push(t.adjustPadAndReturnShape(r[c+2],o[c],i[c],s[c],u,c,c+r.length-2,d))}static adjustPadAndReturnShape(e,r,n,o,i,s,u,d){let c=n*(o-1)+1;if(d&&d!=="NOTSET")switch(d){case"VALID":return i[s]=0,i[u]=0,Math.floor((e-c)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(n!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let m=((e+r-1)/r-1)*r+o-e;return i[s]=Math.floor(d==="SAME_LOWER"?(m+1)/2:m/2),i[u]=m-i[s],Math.floor((e+m-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[s]+i[u]-c)/r+1)}},Vr=class{static getShapeOfGemmResult(e,r,n,o,i){if(e.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let s,u,d;r?(s=e[1],u=e[0]):(s=e[0],u=e[1]);let c=-1;if(o?(d=n[0],c=1):(d=n[1],c=0),n[c]!==u)throw new Error("dimension mismatch");if(s<=0||d<=0||u<=0)throw new Error("invalid shape specified");if(i&&!rt.isValidBroadcast(i,[s,d]))throw new Error("gemm: invalid bias shape for broadcast");return[s,d,u]}},Es=-34028234663852886e22,ks=34028234663852886e22});var Lr,no=V(()=>{"use strict";J();Lr=(t,e)=>new(Vt(e))(t)});var zs,io,Os,Mf,Ps,Rf,Ds,Wr,Gr,oo,Bs,Ms=V(()=>{"use strict";J();tt();zs=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),io=(t,e)=>{if(e==="int32")return t;let r=zs.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);let n=r/8;if(t.byteLength%n!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${n}.`);let o=t.byteLength/n,i=new(Vt(e))(t.buffer,t.byteOffset,o);switch(e){case"int64":case"uint64":{let s=new Int32Array(o);for(let u=0;u<o;u++){let d=i[u];if(d>2147483647n||d<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[u]=Number(d)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(e==="uint32"&&i.some(u=>u>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(i,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${e} to 'int32'`)}},Os=(t,e)=>{if(e==="int32")return t;if(t.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=t.byteLength/4,n=new Int32Array(t.buffer,t.byteOffset,r);switch(e){case"int64":{let o=BigInt64Array.from(n,BigInt);return new Uint8Array(o.buffer)}case"uint64":{if(n.some(i=>i<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let o=BigUint64Array.from(n,BigInt);return new Uint8Array(o.buffer)}case"int8":{if(n.some(i=>i<-128||i>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let o=Int8Array.from(n,Number);return new Uint8Array(o.buffer)}case"uint8":{if(n.some(o=>o<0||o>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(n,Number)}case"uint32":{if(n.some(i=>i<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let o=Uint32Array.from(n,Number);return new Uint8Array(o.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${e}`)}},Mf=1,Ps=()=>Mf++,Rf=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Ds=(t,e)=>{let r=zs.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);return e.length>0?Math.ceil(e.reduce((n,o)=>n*o)*r/8):0},Wr=class{constructor(e){this.isDataConverted=!1;let{sessionId:r,context:n,tensor:o,dataType:i,shape:s,fallbackDataType:u}=e;this.sessionId=r,this.mlContext=n,this.mlTensor=o,this.dataType=i,this.tensorShape=s,this.fallbackDataType=u}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Ds(this.dataType,this.tensorShape)}destroy(){ae("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let r=await this.mlContext.readTensor(this.mlTensor),n=Os(new Uint8Array(r),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(n);return}else return n.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,r,n){return this.mlContext===e&&this.dataType===r&&this.tensorShape.length===n.length&&this.tensorShape.every((o,i)=>o===n[i])}setIsDataConverted(e){this.isDataConverted=e}},Gr=class{constructor(e,r){this.tensorManager=e;this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,r,n,o){let i=this.tensorManager.getMLContext(e),s=this.tensorManager.getMLOpSupportLimits(e),u;if(!s?.input.dataTypes.includes(r)){if(u=Rf.get(r),!u||s?.input.dataTypes.includes(u))throw new Error(`WebNN backend does not support data type: ${r}`);ae("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${r} to ${u}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(i,r,n))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==Ds(r,n))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let d=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,r,n,d,!0,!0,u),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let r=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")r=io(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(r);return}else ae("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(r):this.activeUpload=new Uint8Array(r)}async download(e){if(this.activeUpload){let r=this.wrapper?.isDataConverted?Os(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(r):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(r);return}else return r.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},oo=class{constructor(e){this.backend=e;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}getMLContext(e){let r=this.backend.getMLContext(e);if(!r)throw new Error("MLContext not found for session.");return r}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=Ps();return this.tensorTrackersById.set(e,new Gr(this)),e}releaseTensorId(e){let r=this.tensorTrackersById.get(e);r&&(this.tensorTrackersById.delete(e),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(e,r,n,o,i){ae("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${r}, dataType: ${n}, shape: ${o}, copyOld: ${i}}`);let s=this.tensorTrackersById.get(r);if(!s)throw new Error("Tensor not found.");return s.ensureTensor(e,n,o,i)}upload(e,r){let n=this.tensorTrackersById.get(e);if(!n)throw new Error("Tensor not found.");n.upload(r)}async download(e,r){ae("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${r?.byteLength}}`);let n=this.tensorTrackersById.get(e);if(!n)throw new Error("Tensor not found.");return n.download(r)}releaseTensorsForSession(e){for(let r of this.freeTensors)r.sessionId===e&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==e)}registerTensor(e,r,n,o){let i=this.getMLContext(e),s=Ps(),u=new Wr({sessionId:e,context:i,tensor:r,dataType:n,shape:o});return this.tensorTrackersById.set(s,new Gr(this,u)),this.externalTensors.add(u),s}async getCachedTensor(e,r,n,o,i,s,u){let d=this.getMLContext(e);for(let[p,m]of this.freeTensors.entries())if(m.canReuseTensor(d,r,n)){ae("verbose",()=>`[WebNN] Reusing tensor {dataType: ${r}, ${u?`fallbackDataType: ${u},`:""} shape: ${n}`);let h=this.freeTensors.splice(p,1)[0];return h.sessionId=e,h}ae("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${r}, ${u?`fallbackDataType: ${u},`:""} shape: ${n}}`);let c=await d.createTensor({dataType:u??r,shape:n,dimensions:n,usage:o,writable:i,readable:s});return new Wr({sessionId:e,context:d,tensor:c,dataType:r,shape:n,fallbackDataType:u})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Bs=(...t)=>new oo(...t)});var Hr,Uf,Fr,Rs=V(()=>{"use strict";J();wt();no();Ms();tt();Hr=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Uf=(t,e)=>{if(t===e)return!0;if(t===void 0||e===void 0)return!1;let r=Object.keys(t).sort(),n=Object.keys(e).sort();return r.length===n.length&&r.every((o,i)=>o===n[i]&&t[o]===e[o])},Fr=class{constructor(e){this.tensorManager=Bs(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];this.sessionGraphInputs=new Map;this.sessionGraphOutputs=new Map;this.temporaryGraphInputs=[];this.temporaryGraphOutputs=[];this.temporarySessionTensorIds=new Map;this.mlOpSupportLimitsBySessionId=new Map;Nr(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){ae("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){ae("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let r=this.temporarySessionTensorIds.get(e);if(r){for(let n of r)ae("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${n}}`),this.tensorManager.releaseTensorId(n);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let n=this.mlContextCache.findIndex(o=>o.gpuDevice===e);if(n!==-1)return this.mlContextCache[n].mlContext;{let o=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:o}),o}}else if(e===void 0){let n=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(n!==-1)return this.mlContextCache[n].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let r=this.mlContextCache.findIndex(n=>Uf(n.options,e));if(r!==-1)return this.mlContextCache[r].mlContext;{let n=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:n}),n}}registerMLContext(e,r){this.mlContextBySessionId.set(e,r);let n=this.sessionIdsByMLContext.get(r);n||(n=new Set,this.sessionIdsByMLContext.set(r,n)),n.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,r.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let r=this.mlContextBySessionId.get(e);if(!r)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let n=this.sessionIdsByMLContext.get(r);if(n.delete(e),n.size===0){this.sessionIdsByMLContext.delete(r);let o=this.mlContextCache.findIndex(i=>i.mlContext===r);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){ae("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,r,n,o,i){let s=Hr.get(n);if(!s)throw new Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,r,s,o,i)}async createTemporaryTensor(e,r,n){ae("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${r}, shape: ${n}}`);let o=Hr.get(r);if(!o)throw new Error(`Unsupported ONNX data type: ${r}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,o,n,!1);let s=this.temporarySessionTensorIds.get(e);return s?s.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,r){if(!be().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ae("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${r.byteLength}}`),this.tensorManager.upload(e,r)}async downloadTensor(e,r){return this.tensorManager.download(e,r)}createMLTensorDownloader(e,r){return async()=>{let n=await this.tensorManager.download(e);return Lr(n,r)}}registerMLTensor(e,r,n,o){let i=Hr.get(n);if(!i)throw new Error(`Unsupported ONNX data type: ${n}`);let s=this.tensorManager.registerTensor(e,r,i,o);return ae("verbose",()=>`[WebNN] registerMLTensor {tensor: ${r}, dataType: ${i}, dimensions: ${o}} -> {tensorId: ${s}}`),s}registerMLConstant(e,r,n,o,i,s,u=!1){if(!s)throw new Error("External mounted files are not available.");let d=e;e.startsWith("./")&&(d=e.substring(2));let c=s.get(d);if(!c)throw new Error(`File with name ${d} not found in preloaded files.`);if(r+n>c.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let p=c.slice(r,r+n).buffer,m;switch(i.dataType){case"float32":m=new Float32Array(p);break;case"float16":m=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(p):new Uint16Array(p);break;case"int32":m=new Int32Array(p);break;case"uint32":m=new Uint32Array(p);break;case"int64":if(u){let h=io(new Uint8Array(p),"int64");m=new Int32Array(h.buffer),i.dataType="int32"}else m=new BigInt64Array(p);break;case"uint64":m=new BigUint64Array(p);break;case"int8":m=new Int8Array(p);break;case"int4":case"uint4":case"uint8":m=new Uint8Array(p);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return ae("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}} ${u?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),o.constant(i,m)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,r){let n=this.sessionGraphInputs.get(e);return n?n.includes(r):!1}isGraphOutput(e,r){let n=this.sessionGraphOutputs.get(e);return n?n.includes(r):!1}isGraphInputOutputTypeSupported(e,r,n=!0){let o=Hr.get(vt(r)),i=this.mlOpSupportLimitsBySessionId.get(e);return typeof o>"u"?!1:n?!!i?.input.dataTypes.includes(o):!!i?.output.dataTypes.includes(o)}flush(){}}});var qr=V(()=>{"use strict"});var Us,ao,so,Nf,Vf,Ns,lo,uo,Ls,Ws=V(()=>{"use strict";tt();qr();Us=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),ao=[],so=t=>Math.ceil(Number(t)/16)*16,Nf=t=>{for(let e=0;e<ao.length;e++){let r=ao[e];if(t<=r)return r}return Math.ceil(t/16)*16},Vf=1,Ns=()=>Vf++,lo=async(t,e,r,n)=>{let o=so(r),i=t.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=t.getCommandEncoder();t.endComputePass(),s.copyBufferToBuffer(e,0,i,0,o),t.flush(),await i.mapAsync(GPUMapMode.READ);let u=i.getMappedRange();if(n){let d=n();return d.set(new Uint8Array(u,0,r)),d}else return new Uint8Array(u.slice(0,r))}finally{i.destroy()}},uo=class{constructor(e){this.backend=e;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[r]of Us)ao.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(e,r){let n=r.buffer,o=r.byteOffset,i=r.byteLength,s=so(i),u=this.storageCache.get(e);if(!u)throw new Error("gpu data for uploading does not exist");if(Number(u.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${u.originalSize}, data size=${i}`);let d=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),c=d.getMappedRange();new Uint8Array(c).set(new Uint8Array(n,o,i)),d.unmap();let p=this.backend.device.createCommandEncoder();p.copyBufferToBuffer(d,0,u.gpuData.buffer,0,s),this.backend.device.queue.submit([p.finish()]),d.destroy(),ae("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,r){let n=this.storageCache.get(e);if(!n)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=so(n.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(n.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(e,r,n){let o;if(n){if(o=n[0],e===n[1])return ae("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=Ns();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:e},originalSize:r}),ae("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),ae("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=Nf(e),o,i=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||s){let c=(i?this.freeBuffers:this.freeUniformBuffers).get(n);c?c.length>0?o=c.pop():o=this.backend.device.createBuffer({size:n,usage:r}):o=this.backend.device.createBuffer({size:n,usage:r})}else o=this.backend.device.createBuffer({size:n,usage:r});let u={id:Ns(),type:0,buffer:o};return this.storageCache.set(u.id,{gpuData:u,originalSize:Number(e)}),ae("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${u.id}`),u}get(e){return this.storageCache.get(e)?.gpuData}release(e){let r=typeof e=="bigint"?Number(e):e,n=this.storageCache.get(r);if(!n){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return ae("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(e,r){let n=this.storageCache.get(Number(e));if(!n)throw new Error("data does not exist");await lo(this.backend,n.gpuData.buffer,n.originalSize,r)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let r=Us.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(e.size)||[];r===void 0||n.length>=r?e.destroy():n.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(e.size)||[];r===void 0||n.length>=r?e.destroy():n.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let r of this.buffersPending)e.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let r=this.capturedPendingBuffers.get(e);r&&(r.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(ae("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(n=>{n.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Ls=(...t)=>new uo(...t)});var co,ee,Ie=V(()=>{"use strict";co=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},ee=t=>new co(t)});var Ot,mo,we,Pe,L,fe,fo,Dt,Ke,F,Kr,O,U,Gs,jr,po,Hs,oe=V(()=>{"use strict";J();re();Ot=64,mo=(t,e)=>{if(e===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(t)){case 10:return e>1?`vec${e}<f16>`:"f16";case 1:return e>1?`vec${e}<f32>`:"f32";case 6:return e>1?`vec${e}<i32>`:"i32";case 12:return e>1?`vec${e}<u32>`:"u32";case 7:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(e!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${t}`)}},we=(t,e=1)=>{let r=mo(t,e);return typeof r=="string"?r:r[0]},Pe=(t,e=1)=>{let r=mo(t,e);return typeof r=="string"?r:r[1]},L=(...t)=>{let e=[];return t.forEach(r=>{r.length!==0&&e.push({type:12,data:r},{type:12,data:k.computeStrides(r)})}),e},fe=t=>t%4===0?4:t%2===0?2:1,fo=(t="f32",e,r="0")=>!e||e===1?`${t}(${r})`:`vec${e}<${t}>(${r})`,Dt=(t,e,r)=>t==="f32"?r:e===1?`f32(${r})`:`vec${e}<f32>(${r})`,Ke=(t,e)=>e===4?`(${t}.x + ${t}.y + ${t}.z + ${t}.w)`:e===2?`(${t}.x + ${t}.y)`:e===3?`(${t}.x + ${t}.y + ${t}.z)`:t,F=(t,e,r,n)=>t.startsWith("uniforms.")&&r>4?typeof e=="string"?n==="f16"?`${t}[(${e}) / 8][(${e}) % 8 / 4][(${e}) % 8 % 4]`:`${t}[(${e}) / 4][(${e}) % 4]`:n==="f16"?`${t}[${Math.floor(e/8)}][${Math.floor(e%8/4)}][${e%8%4}]`:`${t}[${Math.floor(e/4)}][${e%4}]`:r>1?`${t}[${e}]`:t,Kr=(t,e,r,n,o)=>{let i=typeof r=="number",s=i?r:r.length,u=[...new Array(s).keys()],d=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,c=mo(e,o),p=typeof c=="string"?c:c[1],m=typeof c=="string"?c:c[0],h={indices:d,value:p,storage:m,tensor:e},_=N=>typeof N=="string"?N:`${N}u`,y={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},w=i?"uniforms.":"",S=`${w}${t}_shape`,$=`${w}${t}_strides`,v="";for(let N=0;N<s-1;N++)v+=`
    let dim${N} = current / ${F($,N,s)};
    let rest${N} = current % ${F($,N,s)};
    indices[${N}] = dim${N};
    current = rest${N};
    `;v+=`indices[${s-1}] = current;`;let T=s<2?"":`
  fn o2i_${t}(offset: u32) -> ${h.indices} {
    var indices: ${h.indices};
    var current = offset;
    ${v}
    return indices;
  }`,I=N=>(y.offsetToIndices=!0,s<2?N:`o2i_${t}(${N})`),E=[];if(s>=2)for(let N=s-1;N>=0;N--)E.push(`${F($,N,s)} * (indices[${N}])`);let A=s<2?"":`
  fn i2o_${t}(indices: ${h.indices}) -> u32 {
    return ${E.join("+")};
  }`,D=N=>(y.indicesToOffset=!0,s<2?N:`i2o_${t}(${N})`),B=(...N)=>s===0?"0u":`${h.indices}(${N.map(_).join(",")})`,R=(N,X)=>s<2?`${N}`:`${F(N,X,s)}`,x=(N,X,me)=>s<2?`${N}=${me};`:`${F(N,X,s)}=${me};`,q={},j=(N,X)=>{y.broadcastedIndicesToOffset=!0;let me=`${X.name}broadcastedIndicesTo${t}Offset`;if(me in q)return`${me}(${N})`;let Oe=[];for(let De=s-1;De>=0;De--){let Ce=X.indicesGet("outputIndices",De+X.rank-s);Oe.push(`${R($,De)} * (${Ce} % ${R(S,De)})`)}return q[me]=`fn ${me}(outputIndices: ${X.type.indices}) -> u32 {
             return ${Oe.length>0?Oe.join("+"):"0u"};
           }`,`${me}(${N})`},Z=(N,X)=>(()=>{if(h.storage===h.value)return`${t}[${N}]=${X};`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`${t}[${N}]=vec2<u32>(u32(${X}), select(0u, 0xFFFFFFFFu, ${X} < 0));`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`${t}[${N}]=vec2<u32>(u32(${X}), 0u);`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`${t}[${N}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${X}));`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),W=N=>(()=>{if(h.storage===h.value)return`${t}[${N}]`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`i32(${t}[${N}].x)`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`u32(${t}[${N}].x)`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`vec4<bool>(bool(${t}[${N}] & 0xFFu), bool(${t}[${N}] & 0xFF00u), bool(${t}[${N}] & 0xFF0000u), bool(${t}[${N}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),le=s<2?"":`
  fn get_${t}ByIndices(indices: ${h.indices}) -> ${p} {
    return ${W(`i2o_${t}(indices)`)};
  }`,Y=s<2?"":(()=>{let N=u.map(me=>`d${me}: u32`).join(", "),X=u.map(me=>`d${me}`).join(", ");return`
  fn get_${t}(${N}) -> ${p} {
    return get_${t}ByIndices(${B(X)});
  }`})(),z=(...N)=>{if(N.length!==s)throw new Error(`indices length must be ${s}`);let X=N.map(_).join(",");return s===0?W("0u"):s===1?W(X[0]):(y.get=!0,y.getByIndices=!0,y.indicesToOffset=!0,`get_${t}(${X})`)},K=N=>s<2?W(N):(y.getByIndices=!0,y.indicesToOffset=!0,`get_${t}ByIndices(${N})`),Q=s<2?"":`
  fn set_${t}ByIndices(indices: ${h.indices}, value: ${p}) {
    ${Z(`i2o_${t}(indices)`,"value")}
  }`,ie=s<2?"":(()=>{let N=u.map(me=>`d${me}: u32`).join(", "),X=u.map(me=>`d${me}`).join(", ");return`
  fn set_${t}(${N}, value: ${p}) {
    set_${t}ByIndices(${B(X)}, value);
  }`})();return{impl:()=>{let N=[],X=!1;return y.offsetToIndices&&(N.push(T),X=!0),y.indicesToOffset&&(N.push(A),X=!0),y.broadcastedIndicesToOffset&&(Object.values(q).forEach(me=>N.push(me)),X=!0),y.set&&(N.push(ie),X=!0),y.setByIndices&&(N.push(Q),X=!0),y.get&&(N.push(Y),X=!0),y.getByIndices&&(N.push(le),X=!0),!i&&X&&N.unshift(`const ${S} = ${h.indices}(${r.join(",")});`,`const ${$} = ${h.indices}(${k.computeStrides(r).join(",")});`),N.join(`
`)},type:h,offsetToIndices:I,indicesToOffset:D,broadcastedIndicesToOffset:j,indices:B,indicesGet:R,indicesSet:x,set:(...N)=>{if(N.length!==s+1)throw new Error(`indices length must be ${s}`);let X=N[s];if(typeof X!="string")throw new Error("value must be string");let me=N.slice(0,s).map(_).join(",");return s===0?Z("0u",X):s===1?Z(me[0],X):(y.set=!0,y.setByIndices=!0,y.indicesToOffset=!0,`set_${t}(${me}, ${X})`)},setByOffset:Z,setByIndices:(N,X)=>s<2?Z(N,X):(y.setByIndices=!0,y.indicesToOffset=!0,`set_${t}ByIndices(${N}, ${X});`),get:z,getByOffset:W,getByIndices:K,usage:n,name:t,strides:$,shape:S,rank:s}},O=(t,e,r,n=1)=>Kr(t,e,r,"input",n),U=(t,e,r,n=1)=>Kr(t,e,r,"output",n),Gs=(t,e,r)=>Kr(t,e,r,"atomicOutput",1),jr=(t,e,r,n=1)=>Kr(t,e,r,"internal",n),po=class{constructor(e,r){this.normalizedDispatchGroup=e;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Ot){let r=typeof e=="number"?e:e[0],n=typeof e=="number"?1:e[1],o=typeof e=="number"?1:e[2];if(r>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*n*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,u=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${r*n*o}u + local_idx;`;return`@compute @workgroup_size(${r}, ${n}, ${o})
  fn main(${s}) {
    ${u}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,r){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let n=e.usage==="input"?"read":"read_write",o=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${r}) var<storage, ${n}> ${e.name}: array<${o}>;`}declareVariables(...e){return e.map(r=>this.declareVariable(r,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(r=>this.registerInternalVariable(r)),this}registerUniform(e,r,n=1){return this.uniforms.push({name:e,type:r,length:n}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:r,type:n,length:o}of this.uniforms)if(o&&o>4)n==="f16"?e.push(`@align(16) ${r}:array<mat2x4<${n}>, ${Math.ceil(o/8)}>`):e.push(`${r}:array<vec4<${n}>, ${Math.ceil(o/4)}>`);else{let i=o==null||o===1?n:`vec${o}<${n}>`;e.push(`${r}:${i}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[e(r.type),r.length??1])}},Hs=(t,e)=>new po(t,e)});var Lf,Fs,Wf,Gf,Hf,Ff,ze,qs,Ks,dt=V(()=>{"use strict";J();re();Ie();oe();Lf=(t,e)=>{if(!t||t.length!==1)throw new Error("Transpose requires 1 input.");if(e.length!==0&&e.length!==t[0].dims.length)throw new Error(`perm size ${e.length} does not match input rank ${t[0].dims.length}`)},Fs=(t,e)=>e.length!==0?e:[...new Array(t).keys()].reverse(),Wf=(t,e)=>k.sortBasedOnPerm(t,Fs(t.length,e)),Gf=(t,e,r,n)=>{let o=`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let i=0;i<e;++i)o+=`a[${t[i]}]=i[${i}];`;return o+="return a;}"},Hf=(t,e)=>{let r=[],n=[];for(let o=0;o<t.length;++o)t[o]!==1&&r.push(t[o]),t[e[o]]!==1&&n.push(e[o]);return{newShape:r,newPerm:n}},Ff=(t,e)=>{let r=0;for(let n=0;n<t.length;++n)if(e[t[n]]!==1){if(t[n]<r)return!1;r=t[n]}return!0},ze=(t,e)=>{let r=t.dataType,n=t.dims.length,o=Fs(n,e),i=Wf(t.dims,o),s=t.dims,u=i,d=n<2||Ff(o,t.dims),c;if(d)return c=w=>{let S=O("input",r,s,4),$=U("output",r,u,4);return`
  ${w.registerUniform("output_size","u32").declareVariables(S,$)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let w=k.size(i);return{outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(w/64/4)},programUniforms:[{type:12,data:Math.ceil(w/4)}]}},getShaderSource:c};let{newShape:p,newPerm:m}=Hf(t.dims,o),h=k.areEqual(m,[2,3,1]),_=k.areEqual(m,[3,1,2]);if(p.length===2||h||_){s=h?[p[0],p[1]*p[2]]:_?[p[0]*p[1],p[2]]:p,u=[s[1],s[0]];let w=16;return c=S=>{let $=O("a",r,s.length),v=U("output",r,u.length);return`
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
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let S=k.size(i);return{outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(u[1]/w),y:Math.ceil(u[0]/w)},programUniforms:[{type:12,data:S},...L(s,u)]}},getShaderSource:c}}return c=w=>{let S=O("a",r,s.length),$=U("output",r,u.length);return`
  ${w.registerUniform("output_size","u32").declareVariables(S,$)}

  ${Gf(o,n,S,$)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${$.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${$.setByOffset("global_idx",S.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${e}`,inputDependencies:["rank"]},getRunData:()=>{let w=k.size(i);return{outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...L(s,u)]}},getShaderSource:c}},qs=(t,e)=>{Lf(t.inputs,e.perm),t.compute(ze(t.inputs[0],e.perm))},Ks=t=>ee({perm:t.perm})});var qf,Kf,jf,Zf,Qf,Yf,Xf,Jf,eh,th,nt,js,Zs,Qs,Ys,Xs,Js,eu,tu,ru,nu,ou=V(()=>{"use strict";J();re();oe();Zr();dt();qf={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Kf={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},jf={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Zf={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Qf=(t,e)=>{let r=[];for(let n=e-t;n<e;++n)r.push(n);return r},Yf=(t,e)=>{let r=[],n=t.length;for(let i=0;i<n;i++)e.indexOf(i)===-1&&r.push(t[i]);let o=e.map(i=>t[i]);return[r,o]},Xf=(t,e)=>{let r=t.length+e.length,n=[],o=0;for(let i=0;i<r;i++)e.indexOf(i)===-1?n.push(t[o++]):n.push(1);return n},Jf=(t,e)=>{for(let r=0;r<t.length;++r)if(t[t.length-r-1]!==e-1-r)return!1;return!0},eh=(t,e)=>{let r=[];if(!Jf(t,e)){for(let n=0;n<e;++n)t.indexOf(n)===-1&&r.push(n);t.forEach(n=>r.push(n))}return r},th=(t,e,r,n,o,i,s)=>{let u=r[0].dims,d=k.size(i),c=k.size(s),p=O("_A",r[0].dataType,u),m=U("output",o,i),h=64;d===1&&(h=256);let _=`
          var<workgroup> aBestValues : array<f32, ${h}>;
       `,y=w=>`
        ${w.registerUniform("reduceSize","u32").declareVariables(p,m)}
        ${_}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${w.mainStart(h)}

          let outputIndex = global_idx / ${h};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${jf[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${h}) {
           let candidate = f32(${p.getByOffset("offset + k")});
           bestValue = ${qf[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${h}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Kf[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${m.setByOffset("outputIndex",`${n==="mean"?`${m.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${m.type.storage}(${Zf[n]})`}`)};
         }
        }`;return{name:t,shaderCache:{hint:`${e};${h}`,inputDependencies:["type"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:d},programUniforms:[{type:12,data:c}]})}},nt=(t,e,r,n)=>{let o=t.inputs.length===1?r:ho(t.inputs,r),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=t.inputs[0].dims.map((_,y)=>y));let s=k.normalizeAxes(i,t.inputs[0].dims.length),u=s,d=t.inputs[0],c=eh(u,t.inputs[0].dims.length);c.length>0&&(d=t.compute(ze(t.inputs[0],c),{inputs:[0],outputs:[-1]})[0],u=Qf(u.length,d.dims.length));let[p,m]=Yf(d.dims,u),h=p;o.keepDims&&(h=Xf(p,s)),t.compute(th(e,o.cacheKey,[d],n,t.inputs[0].dataType,h,m),{inputs:[d]})},js=(t,e)=>{nt(t,"ReduceMeanShared",e,"mean")},Zs=(t,e)=>{nt(t,"ReduceL1Shared",e,"l1")},Qs=(t,e)=>{nt(t,"ReduceL2Shared",e,"l2")},Ys=(t,e)=>{nt(t,"ReduceLogSumExpShared",e,"logSumExp")},Xs=(t,e)=>{nt(t,"ReduceMaxShared",e,"max")},Js=(t,e)=>{nt(t,"ReduceMinShared",e,"min")},eu=(t,e)=>{nt(t,"ReduceProdShared",e,"prod")},tu=(t,e)=>{nt(t,"ReduceSumShared",e,"sum")},ru=(t,e)=>{nt(t,"ReduceSumSquareShared",e,"sumSquare")},nu=(t,e)=>{nt(t,"ReduceLogSumShared",e,"logSum")}});var ot,rh,Qr,ho,it,nh,oh,ih,ah,sh,uh,dh,lh,ch,ph,at,iu,au,su,uu,du,lu,cu,pu,mu,fu,Zr=V(()=>{"use strict";J();re();Ie();oe();ou();ot=t=>{if(!t||t.length===0||t.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(t.length===2&&t[1].dims.length!==1)throw new Error("Invalid axes input dims.")},rh=t=>["","",`var value = ${t.getByIndices("input_indices")};`,""],Qr=(t,e,r,n,o,i,s=!1,u=!1)=>{let d=[],c=r[0].dims,p=c.length,m=k.normalizeAxes(o,p),h=!u&&m.length===0;c.forEach((S,$)=>{h||m.indexOf($)>=0?s&&d.push(1):d.push(S)});let _=d.length,y=k.size(d);return{name:t,shaderCache:e,getShaderSource:S=>{let $=[],v=O("_A",r[0].dataType,p),T=U("output",i,_),I=n(v,T,m),E=I[2];for(let A=0,D=0;A<p;A++)h||m.indexOf(A)>=0?(s&&D++,E=`for(var j${A}: u32 = 0; j${A} < ${c[A]}; j${A}++) {
                  ${I[2].includes("last_index")?`let last_index = j${A};`:""}
                  ${v.indicesSet("input_indices",A,`j${A}`)}
                  ${E}
                }`):($.push(`${v.indicesSet("input_indices",A,T.indicesGet("output_indices",D))};`),D++);return`

        ${S.registerUniform("output_size","u32").declareVariables(v,T)}

        ${S.mainStart()}
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${T.offsetToIndices("global_idx")};

          ${$.join(`
`)}
          ${I[0]}       // init ops for reduce max/min
          ${I[1]}
          ${E}
          ${I[3]}
          ${I.length===4?T.setByOffset("global_idx","value"):I.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:d,dataType:i}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...L(c,d)]})}},ho=(t,e)=>{let r=[];return t[1].dims[0]>0&&t[1].getBigInt64Array().forEach(n=>r.push(Number(n))),ee({axes:r,keepDims:e.keepDims,noopWithEmptyAxes:e.noopWithEmptyAxes})},it=(t,e,r,n)=>{let o=t.inputs,i=o.length===1?r:ho(o,r);t.compute(Qr(e,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?rh:n,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},nh=(t,e)=>{ot(t.inputs),it(t,"ReduceLogSum",e,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},oh=(t,e)=>{ot(t.inputs),it(t,"ReduceL1",e,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},ih=(t,e)=>{ot(t.inputs),it(t,"ReduceL2",e,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},ah=(t,e)=>{ot(t.inputs),it(t,"ReduceLogSumExp",e,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},sh=(t,e)=>{ot(t.inputs),it(t,"ReduceMax",e,(n,o,i)=>{let s=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&s.push(n.indicesSet("input_indices",u,0));return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},uh=(t,e)=>{ot(t.inputs),it(t,"ReduceMean",e,(n,o,i)=>{let s=1;for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&(s*=t.inputs[0].dims[u]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${s});`]})},dh=(t,e)=>{ot(t.inputs),it(t,"ReduceMin",e,(n,o,i)=>{let s=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},lh=(t,e)=>{ot(t.inputs),it(t,"ReduceProd",e,(n,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},ch=(t,e)=>{ot(t.inputs),it(t,"ReduceSum",e,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},ph=(t,e)=>{ot(t.inputs),it(t,"ReduceSumSquare",e,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},at=(t,e,r)=>{if(e.length===0)return r;let n=1,o=1;for(let i=0;i<e.length;i++)e.indexOf(i)===-1?n*=t[i]:o*=t[i];return o<32&&n>1024},iu=(t,e)=>{at(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?uh(t,e):js(t,e)},au=(t,e)=>{at(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?oh(t,e):Zs(t,e)},su=(t,e)=>{at(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?ih(t,e):Qs(t,e)},uu=(t,e)=>{at(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?ah(t,e):Ys(t,e)},du=(t,e)=>{at(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?sh(t,e):Xs(t,e)},lu=(t,e)=>{at(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?dh(t,e):Js(t,e)},cu=(t,e)=>{at(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?lh(t,e):eu(t,e)},pu=(t,e)=>{at(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?ch(t,e):tu(t,e)},mu=(t,e)=>{at(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?ph(t,e):ru(t,e)},fu=(t,e)=>{at(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?nh(t,e):nu(t,e)}});var hu,gu,bu,go,yu=V(()=>{"use strict";J();Ie();Zr();hu=t=>{if(!t||t.length===0||t.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(t[0].dataType!==1)throw new Error("Invalid input type.")},gu=(t,e)=>{hu(t.inputs);let r=(n,o,i)=>{let s=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${e.selectLastIndex>0?"<=":"<"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};t.compute(Qr("ArgMin",{hint:e.cacheKey,inputDependencies:["rank"]},[t.inputs[0]],r,[e.axis],7,e.keepDims),{inputs:[0]})},bu=(t,e)=>{hu(t.inputs);let r=(n,o,i)=>{let s=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${e.selectLastIndex>0?">=":">"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};t.compute(Qr("argMax",{hint:e.cacheKey,inputDependencies:["rank"]},[t.inputs[0]],r,[e.axis],7,e.keepDims),{inputs:[0]})},go=t=>ee(t)});var mh,bo,fh,hh,gh,Lt,bh,_u,Yr=V(()=>{"use strict";J();re();qr();oe();mh=(t,e)=>{let r=t[0],n=t[1],o=t[2],i=t[3],s=t[4],u=t[5];if(s&&u)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let d=r.dims[0],c=r.dims[1],p=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(n.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==p)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==n.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let m=o.dims[0]/3,h=m,_=h;if(e.qkvHiddenSizes.length>0){if(e.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let T of e.qkvHiddenSizes)if(T%e.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");m=e.qkvHiddenSizes[0],h=e.qkvHiddenSizes[1],_=e.qkvHiddenSizes[2]}let y=c;if(m!==h)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==m+h+_)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let w=0;if(s){if(h!==_)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==d)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==e.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==h/e.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');e.pastPresentShareBuffer||(w=s.dims[3])}let S=y+w,$=-1,v=0;if(i)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==d||u.dims[1]!==e.numHeads||u.dims[2]!==c||u.dims[3]!==S)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:c,pastSequenceLength:w,kvSequenceLength:y,totalSequenceLength:S,maxSequenceLength:$,inputHiddenSize:p,hiddenSize:m,vHiddenSize:_,headSize:Math.floor(m/e.numHeads),vHeadSize:Math.floor(_/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:v,scale:e.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},bo=(t,e,r)=>e&&t?`
      let total_sequence_length_input = u32(${e.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${t?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,fh=(t,e,r,n,o,i,s,u)=>{let d=fe(s?1:i),c=64,p=i/d;p<c&&(c=32);let m=Math.ceil(i/d/c),h=[{type:12,data:e},{type:12,data:r},{type:12,data:n},{type:12,data:o},{type:12,data:p},{type:12,data:m}],_=we(t.dataType,d),y=Pe(1,d),w=["type"];s&&w.push("type"),u&&w.push("type");let S=$=>{let v=U("x",t.dataType,t.dims,d),T=[v],I=s?O("seq_lens",s.dataType,s.dims):void 0;I&&T.push(I);let E=u?O("total_sequence_length_input",u.dataType,u.dims):void 0;E&&T.push(E);let A=Pe(t.dataType),D=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${c}>;
  var<workgroup> thread_sum: array<f32, ${c}>;
  ${$.registerUniforms(D).declareVariables(...T)}
  ${$.mainStart([c,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${bo(I,E,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${c}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${y}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${y}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(d){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${c}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${y}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${y}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(d){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${c}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${v.type.value}(${A}(1.0) / ${A}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${y}(x[offset + i]);
        x[offset + i] = ${v.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${v.type.value}(${A}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${c};${_};${d}`,inputDependencies:w},getShaderSource:S,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:o,z:e*r},programUniforms:h})}},hh=(t,e,r,n,o,i,s,u,d)=>{let c=s+i.kvSequenceLength,p=[i.batchSize,i.numHeads,i.sequenceLength,c],m=t>1&&n,h=i.kvNumHeads?i.kvNumHeads:i.numHeads,_=m?[i.batchSize,h,c,i.headSize]:void 0,y=i.nReps?i.nReps:1,w=i.scale===0?1/Math.sqrt(i.headSize):i.scale,S=fe(i.headSize),$=i.headSize/S,v=12,T={x:Math.ceil(c/v),y:Math.ceil(i.sequenceLength/v),z:i.batchSize*i.numHeads},I=[{type:12,data:i.sequenceLength},{type:12,data:$},{type:12,data:c},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:w},{type:12,data:s},{type:12,data:i.kvSequenceLength},{type:12,data:y}],E=m&&n&&k.size(n.dims)>0,A=["type","type"];E&&A.push("type"),o&&A.push("type"),u&&A.push("type"),d&&A.push("type");let D=[{dims:p,dataType:e.dataType,gpuDataType:0}];m&&D.push({dims:_,dataType:e.dataType,gpuDataType:0});let B=R=>{let x=O("q",e.dataType,e.dims,S),q=O("key",r.dataType,r.dims,S),j=[x,q];if(E){let Q=O("past_key",n.dataType,n.dims,S);j.push(Q)}o&&j.push(O("attention_bias",o.dataType,o.dims));let Z=u?O("seq_lens",u.dataType,u.dims):void 0;Z&&j.push(Z);let W=d?O("total_sequence_length_input",d.dataType,d.dims):void 0;W&&j.push(W);let le=U("output",e.dataType,p),Y=[le];m&&Y.push(U("present_key",e.dataType,_,S));let z=Pe(1,S),K=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;

  var<workgroup> tileQ: array<${x.type.storage}, ${v*v}>;
  var<workgroup> tileK: array<${x.type.storage}, ${v*v}>;
  ${R.registerUniforms(K).declareVariables(...j,...Y)}
  ${R.mainStart([v,v,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${y===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${y===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${bo(Z,W,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${E&&m?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${m?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${z}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${E&&m?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${m?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${z}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(S){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${S}`)}})()};
        output[outputIdx] = ${le.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${S};${o!==void 0};${n!==void 0};${t}`,inputDependencies:A},getRunData:()=>({outputs:D,dispatchGroup:T,programUniforms:I}),getShaderSource:B}},gh=(t,e,r,n,o,i,s=void 0,u=void 0)=>{let d=i+o.kvSequenceLength,c=o.nReps?o.nReps:1,p=o.vHiddenSize*c,m=t>1&&n,h=o.kvNumHeads?o.kvNumHeads:o.numHeads,_=m?[o.batchSize,h,d,o.headSize]:void 0,y=[o.batchSize,o.sequenceLength,p],w=12,S={x:Math.ceil(o.vHeadSize/w),y:Math.ceil(o.sequenceLength/w),z:o.batchSize*o.numHeads},$=[{type:12,data:o.sequenceLength},{type:12,data:d},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:p},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:c}],v=m&&n&&k.size(n.dims)>0,T=["type","type"];v&&T.push("type"),s&&T.push("type"),u&&T.push("type");let I=[{dims:y,dataType:e.dataType,gpuDataType:0}];m&&I.push({dims:_,dataType:e.dataType,gpuDataType:0});let E=A=>{let D=O("probs",e.dataType,e.dims),B=O("v",r.dataType,r.dims),R=[D,B];v&&R.push(O("past_value",n.dataType,n.dims));let x=s?O("seq_lens",s.dataType,s.dims):void 0;s&&R.push(x);let q=u?O("total_sequence_length_input",u.dataType,u.dims):void 0;u&&R.push(q);let Z=[U("output",e.dataType,y)];m&&Z.push(U("present_value",e.dataType,_));let W=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;
  var<workgroup> tileQ: array<${D.type.value}, ${w*w}>;
  var<workgroup> tileV: array<${D.type.value}, ${w*w}>;
  ${A.registerUniforms(W).declareVariables(...R,...Z)}
  ${A.mainStart([w,w,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${c===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${c===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${bo(x,q,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${v&&m?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${m?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${D.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${v&&m?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${m?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${n!==void 0};${t}`,inputDependencies:T},getRunData:()=>({outputs:I,dispatchGroup:S,programUniforms:$}),getShaderSource:E}},Lt=(t,e,r,n,o,i,s,u,d,c,p=void 0,m=void 0)=>{let h=Math.min(t.outputCount,1+(s?1:0)+(u?1:0)),_=h>1?c.pastSequenceLength:0,y=_+c.kvSequenceLength,w=d&&k.size(d.dims)>0?d:void 0,S=[e,r];h>1&&s&&k.size(s.dims)>0&&S.push(s),w&&S.push(w),p&&S.push(p),m&&S.push(m);let $=t.compute(hh(h,e,r,s,w,c,_,p,m),{inputs:S,outputs:h>1?[-1,1]:[-1]})[0];t.compute(fh($,c.batchSize,c.numHeads,_,c.sequenceLength,y,p,m),{inputs:p&&m?[$,p,m]:[$],outputs:[]});let v=[$,n];h>1&&u&&k.size(u.dims)>0&&v.push(u),p&&v.push(p),m&&v.push(m),t.compute(gh(h,$,n,u,c,_,p,m),{inputs:v,outputs:h>1?[0,2]:[0]})},bh=(t,e)=>{let r=[e.batchSize,e.numHeads,e.sequenceLength,e.headSize],n=e.sequenceLength,o=e.inputHiddenSize,i=e.headSize,s=12,u={x:Math.ceil(e.headSize/s),y:Math.ceil(e.sequenceLength/s),z:e.batchSize*e.numHeads},d=[t.inputs[0],t.inputs[1],t.inputs[2]],c=[{type:12,data:n},{type:12,data:o},{type:12,data:i},{type:12,data:e.numHeads},{type:12,data:e.headSize},{type:12,data:e.hiddenSize},{type:12,data:e.hiddenSize+e.hiddenSize+e.vHiddenSize}],p=m=>{let h=U("output_q",d[0].dataType,r),_=U("output_k",d[0].dataType,r),y=U("output_v",d[0].dataType,r),w=O("input",d[0].dataType,d[0].dims),S=O("weight",d[1].dataType,d[1].dims),$=O("bias",d[2].dataType,d[2].dims),v=w.type.storage,T=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${v}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${v}, ${s*s}>;
  var<workgroup> tileWeightK: array<${v}, ${s*s}>;
  var<workgroup> tileWeightV: array<${v}, ${s*s}>;
  ${m.registerUniforms(T).declareVariables(w,S,$,h,_,y)}
  ${m.mainStart([s,s,1])}
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
  }`};return t.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:t.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:t.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:t.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:c}),getShaderSource:p},{inputs:d,outputs:[-1,-1,-1]})},_u=(t,e)=>{let r=mh(t.inputs,e),[n,o,i]=bh(t,r);return Lt(t,n,o,i,t.inputs[4],void 0,void 0,void 0,t.inputs[5],r)}});var yh,_h,wh,wu,vu=V(()=>{"use strict";Ne();J();re();Ie();oe();yh=(t,e)=>{if(!t||t.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(n,o,i)=>{let s=o.length;if(s!==n.length)throw new Error(`${i}: num dimensions != ${s}`);o.forEach((u,d)=>{if(u!==n[d])throw new Error(`${i}: dim[${d}] do not match`)})};if(t[0].dims.length>1){let n=e.format==="NHWC"?e.spatial?t[0].dims.slice(-1):t[0].dims.slice(-1).concat(t[0].dims.slice(1,t[0].dims.length-1)):t[0].dims.slice(1,e.spatial?2:void 0);r(t[1].dims,n,"Invalid input scale"),r(t[2].dims,n,"Invalid input B"),r(t[3].dims,n,"Invalid input mean"),r(t[4].dims,n,"Invalid input var")}else r(t[1].dims,[1],"Invalid input scale"),r(t[2].dims,[1],"Invalid input B"),r(t[3].dims,[1],"Invalid input mean"),r(t[4].dims,[1],"Invalid input var")},_h=(t,e)=>{let{epsilon:r,spatial:n,format:o}=e,i=t[0].dims,s=n?fe(i[i.length-1]):1,u=o==="NHWC"&&i.length>1?s:1,d=k.size(i)/s,c=n,p=c?i.length:i,m=O("x",t[0].dataType,t[0].dims,s),h=O("scale",t[1].dataType,t[1].dims,u),_=O("bias",t[2].dataType,t[2].dims,u),y=O("inputMean",t[3].dataType,t[3].dims,u),w=O("inputVar",t[4].dataType,t[4].dims,u),S=U("y",t[0].dataType,p,s),$=()=>{let T="";if(n)T=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${s}`:"outputIndices[1]"};`;else if(o==="NCHW")T=`
            ${S.indicesSet("outputIndices","0","0")}
            let cOffset = ${S.indicesToOffset("outputIndices")};`;else{T=`var cIndices = ${h.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let I=1;I<h.rank;I++)T+=`cIndices[${I}] = outputIndices[${I}];`;T+=`let cOffset = ${h.indicesToOffset("cIndices")};`}return T},v=T=>`
  const epsilon = ${r};
  ${T.registerUniform("outputSize","u32").declareVariables(m,h,_,y,w,S)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${S.offsetToIndices(`global_idx * ${s}`)};
    ${$()}
    let scale = ${h.getByOffset("cOffset")};
    let bias = ${_.getByOffset("cOffset")};
    let inputMean = ${y.getByOffset("cOffset")};
    let inputVar = ${w.getByOffset("cOffset")};
    let x = ${m.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${S.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${e.epsilon}_${e.format}_${n}_${s}`,inputDependencies:c?["rank","type","type","type","type"]:void 0},getShaderSource:v,getRunData:()=>({outputs:[{dims:t[0].dims,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c?[{type:12,data:d},...L(i)]:[{type:12,data:d}]})}},wh=t=>ee(t),wu=(t,e)=>{let{inputs:r,outputCount:n}=t,o=wh({...e,outputCount:n});if(_e.webgpu.validateInputContent&&yh(r,o),e.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");t.compute(_h(r,o))}});var vh,$h,$u,xu=V(()=>{"use strict";re();oe();vh=t=>{if(t[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(t[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(t[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(t[0].dims[2]!==t[1].dims[0])throw new Error("last dimension of input and bias are not the same")},$h=t=>{let e=t[0].dims,r=t[0].dims[2],n=k.size(e)/4,o=t[0].dataType,i=O("input",o,e,4),s=O("bias",o,[r],4),u=O("residual",o,e,4),d=U("output",o,e,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:e,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:p=>`
  const channels = ${r}u / 4;
  ${p.declareVariables(i,s,u,d)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${i.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${d.setByOffset("global_idx","value")}
  }`}},$u=t=>{vh(t.inputs),t.compute($h(t.inputs))}});var xh,ge,Su,Tu,Iu,Cu,Au,Eu,ku,Pu,zu,Sh,Ou,Du,Bu,Mu,nr,Ru,Xr,Uu,Nu,Vu,Lu,Wu,Gu,Hu,Fu,qu,Ku,ju,Zu,Qu,Yu,Xu,Ju,ed,td,yo,_o,rd,nd,od,Th,Ih,id,Jr=V(()=>{"use strict";J();re();Ie();oe();xh=(t,e,r,n,o,i,s)=>{let u=Math.ceil(e/4),d="";typeof o=="string"?d=`${o}(a)`:d=o("a");let c=O("inputData",r,[u],4),p=U("outputData",n,[u],4),m=[{name:"vec_size",type:"u32"}];return s&&m.push(...s),`
      ${t.registerUniforms(m).declareVariables(c,p)}

  ${i??""}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${c.getByOffset("global_idx")};
    ${p.setByOffset("global_idx",d)}
  }`},ge=(t,e,r,n,o,i=t.dataType,s,u)=>{let d=[{type:12,data:Math.ceil(k.size(t.dims)/4)}];return s&&d.push(...s),{name:e,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:c=>xh(c,k.size(t.dims),t.dataType,i,r,n,u),getRunData:c=>({outputs:[{dims:t.dims,dataType:i}],dispatchGroup:{x:Math.ceil(k.size(c[0].dims)/64/4)},programUniforms:d})}},Su=t=>{t.compute(ge(t.inputs[0],"Abs","abs"))},Tu=t=>{t.compute(ge(t.inputs[0],"Acos","acos"))},Iu=t=>{t.compute(ge(t.inputs[0],"Acosh","acosh"))},Cu=t=>{t.compute(ge(t.inputs[0],"Asin","asin"))},Au=t=>{t.compute(ge(t.inputs[0],"Asinh","asinh"))},Eu=t=>{t.compute(ge(t.inputs[0],"Atan","atan"))},ku=t=>{t.compute(ge(t.inputs[0],"Atanh","atanh"))},Pu=t=>ee(t),zu=(t,e)=>{let r;switch(e.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${e.to}`)}t.compute(ge(t.inputs[0],"Cast",r,void 0,e.cacheKey,e.to))},Sh=t=>{let e,r,n=t.length>=2&&t[1].data!==0,o=t.length>=3&&t[2].data!==0;switch(t[0].dataType){case 1:e=n?t[1].getFloat32Array()[0]:-34028234663852886e22,r=o?t[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:e=n?t[1].getUint16Array()[0]:64511,r=o?t[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return ee({min:e,max:r})},Ou=(t,e)=>{let r=e||Sh(t.inputs),n=Pe(t.inputs[0].dataType);t.compute(ge(t.inputs[0],"Clip",o=>`clamp(${o}, vec4<${n}>(uniforms.min), vec4<${n}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:t.inputs[0].dataType,data:r.min},{type:t.inputs[0].dataType,data:r.max}],[{name:"min",type:n},{name:"max",type:n}]),{inputs:[0]})},Du=t=>{t.compute(ge(t.inputs[0],"Ceil","ceil"))},Bu=t=>{t.compute(ge(t.inputs[0],"Cos","cos"))},Mu=t=>{t.compute(ge(t.inputs[0],"Cosh","cosh"))},nr=t=>ee(t),Ru=(t,e)=>{let r=Pe(t.inputs[0].dataType);t.compute(ge(t.inputs[0],"Elu",n=>`elu_vf32(${n})`,`
  const elu_alpha_ = ${r}(${e.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,e.cacheKey))},Xr=(t="f32")=>`
const r0: ${t} = 0.3275911;
const r1: ${t} = 0.254829592;
const r2: ${t} = -0.284496736;
const r3: ${t} = 1.421413741;
const r4: ${t} = -1.453152027;
const r5: ${t} = 1.061405429;

fn erf_vf32(v: vec4<${t}>) -> vec4<${t}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,Uu=t=>{let e=Pe(t.inputs[0].dataType);t.compute(ge(t.inputs[0],"Erf",r=>`erf_vf32(${r})`,Xr(e)))},Nu=t=>{t.compute(ge(t.inputs[0],"Exp","exp"))},Vu=t=>{t.compute(ge(t.inputs[0],"Floor","floor"))},Lu=t=>{let e=Pe(t.inputs[0].dataType);t.compute(ge(t.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Xr(e)))},Wu=(t,e)=>{let r=Pe(t.inputs[0].dataType);t.compute(ge(t.inputs[0],"LeakyRelu",n=>`select(leaky_relu_alpha_ * ${n}, ${n}, ${n} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${e.alpha});`,e.cacheKey))},Gu=t=>{t.compute(ge(t.inputs[0],"Not",e=>`!${e}`))},Hu=t=>{t.compute(ge(t.inputs[0],"Neg",e=>`-${e}`))},Fu=t=>{t.compute(ge(t.inputs[0],"Reciprocal",e=>`1.0/${e}`))},qu=t=>{let e=Pe(t.inputs[0].dataType);t.compute(ge(t.inputs[0],"Relu",r=>`select(vec4<${e}>(0.0), ${r}, ${r} > vec4<${e}>(0.0))`))},Ku=t=>{t.compute(ge(t.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},ju=t=>ee(t),Zu=(t,e)=>{let r=Pe(t.inputs[0].dataType);t.compute(ge(t.inputs[0],"HardSigmoid",n=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${e.alpha} * ${n} + vec4<${r}>(${e.beta})))`,void 0,e.cacheKey))},Qu=t=>{t.compute(ge(t.inputs[0],"Sin","sin"))},Yu=t=>{t.compute(ge(t.inputs[0],"Sinh","sinh"))},Xu=t=>{t.compute(ge(t.inputs[0],"Sqrt","sqrt"))},Ju=t=>{t.compute(ge(t.inputs[0],"Tan","tan"))},ed=t=>`sign(${t}) * (1 - exp(-2 * abs(${t}))) / (1 + exp(-2 * abs(${t})))`,td=t=>{t.compute(ge(t.inputs[0],"Tanh",ed))},yo=(t="f32")=>`
const fast_gelu_a: ${t} = 0.5;
const fast_gelu_b: ${t} = 0.7978845608028654;
const fast_gelu_c: ${t} = 0.035677408136300125;

fn tanh_v(v: vec4<${t}>) -> vec4<${t}> {
  return ${ed("v")};
}
`,_o=t=>`(fast_gelu_a + fast_gelu_a * tanh_v(${t} * (fast_gelu_c * ${t} * ${t} + fast_gelu_b))) * ${t}`,rd=t=>{let e=Pe(t.inputs[0].dataType);t.compute(ge(t.inputs[0],"FastGelu",_o,yo(e),void 0,t.inputs[0].dataType))},nd=(t,e)=>{let r=Pe(t.inputs[0].dataType);return t.compute(ge(t.inputs[0],"ThresholdedRelu",n=>`select(vec4<${r}>(0.0), ${n}, ${n} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${e.alpha});`,e.cacheKey)),0},od=t=>{t.compute(ge(t.inputs[0],"Log","log"))},Th=(t,e)=>`
const alpha = vec4<${t}>(${e});
const one = ${t}(1.0);
const zero = ${t}(0.0);

fn quick_gelu_impl(x: vec4<${t}>) -> vec4<${t}> {
  let v = x *alpha;
  var x1 : vec4<${t}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Ih=t=>`quick_gelu_impl(${t})`,id=(t,e)=>{let r=Pe(t.inputs[0].dataType);t.compute(ge(t.inputs[0],"QuickGelu",Ih,Th(r,e.alpha),e.cacheKey,t.inputs[0].dataType))}});var Ch,Ah,sd,ud=V(()=>{"use strict";re();oe();Jr();Ch=t=>{if(t[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(t[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(t[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(t[0].dims[2]!==t[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Ah=t=>{let e=t[0].dims.slice();e[2]=e[2]/2;let r=O("input",t[0].dataType,t[0].dims,4),n=O("bias",t[0].dataType,[t[0].dims[2]],4),o=U("output",t[0].dataType,e,4),i=k.size(e)/4,s=we(t[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:e,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:d=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${t[0].dims[2]/4/2}u;

  ${d.declareVariables(r,n,o)}

  ${Xr(s)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},sd=t=>{Ch(t.inputs),t.compute(Ah(t.inputs))}});var Eh,kh,st,dd,ld,cd,pd,md,fd,hd,gd,bd,yd,_d=V(()=>{"use strict";J();re();oe();Eh=(t,e,r,n,o,i,s,u,d,c,p,m)=>{let h,_;typeof u=="string"?h=_=(v,T)=>`${u}((${v}),(${T}))`:typeof u=="function"?h=_=u:(h=u.scalar,_=u.vector);let y=U("outputData",p,n.length,4),w=O("aData",d,e.length,4),S=O("bData",c,r.length,4),$;if(o)if(i){let v=k.size(e)===1,T=k.size(r)===1,I=e.length>0&&e[e.length-1]%4===0,E=r.length>0&&r[r.length-1]%4===0;v||T?$=y.setByOffset("global_idx",_(v?`${w.type.value}(${w.getByOffset("0")}.x)`:w.getByOffset("global_idx"),T?`${S.type.value}(${S.getByOffset("0")}.x)`:S.getByOffset("global_idx"))):$=`
            let outputIndices = ${y.offsetToIndices("global_idx * 4u")};
            let offsetA = ${w.broadcastedIndicesToOffset("outputIndices",y)};
            let offsetB = ${S.broadcastedIndicesToOffset("outputIndices",y)};
            ${y.setByOffset("global_idx",_(s||I?w.getByOffset("offsetA / 4u"):`${w.type.value}(${w.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||E?S.getByOffset("offsetB / 4u"):`${S.type.value}(${S.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=y.setByOffset("global_idx",_(w.getByOffset("global_idx"),S.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let v=(T,I,E="")=>{let A=`aData[indexA${I}][componentA${I}]`,D=`bData[indexB${I}][componentB${I}]`;return`
            let outputIndices${I} = ${y.offsetToIndices(`global_idx * 4u + ${I}u`)};
            let offsetA${I} = ${w.broadcastedIndicesToOffset(`outputIndices${I}`,y)};
            let offsetB${I} = ${S.broadcastedIndicesToOffset(`outputIndices${I}`,y)};
            let indexA${I} = offsetA${I} / 4u;
            let indexB${I} = offsetB${I} / 4u;
            let componentA${I} = offsetA${I} % 4u;
            let componentB${I} = offsetB${I} % 4u;
            ${T}[${I}] = ${E}(${h(A,D)});
          `};p===9?$=`
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
        ${t.registerUniform("vec_size","u32").declareVariables(w,S,y)}

        ${m??""}

        ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},kh=(t,e,r,n,o,i,s=r.dataType)=>{let u=r.dims.map(w=>Number(w)??1),d=n.dims.map(w=>Number(w)??1),c=!k.areEqual(u,d),p=u,m=k.size(u),h=!1,_=!1,y=[c];if(c){let w=rt.calcShape(u,d,!1);if(!w)throw new Error("Can't perform binary op on the given tensors");p=w.slice(),m=k.size(p);let S=k.size(u)===1,$=k.size(d)===1,v=u.length>0&&u[u.length-1]%4===0,T=d.length>0&&d[d.length-1]%4===0;y.push(S),y.push($),y.push(v),y.push(T);let I=1;for(let E=1;E<p.length;E++){let A=u[u.length-E],D=d[d.length-E];if(A===D)I*=A;else break}I%4===0?(_=!0,h=!0):(S||$||v||T)&&(h=!0)}else h=!0;return y.push(h),{name:t,shaderCache:{hint:e+y.map(w=>w.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:w=>Eh(w,u,d,p,h,c,_,o,r.dataType,n.dataType,s,i),getRunData:()=>({outputs:[{dims:p,dataType:s}],dispatchGroup:{x:Math.ceil(m/64/4)},programUniforms:[{type:12,data:Math.ceil(k.size(p)/4)},...L(u,d,p)]})}},st=(t,e,r,n,o,i)=>{t.compute(kh(e,o??"",t.inputs[0],t.inputs[1],r,n,i))},dd=t=>{st(t,"Add",(e,r)=>`${e}+${r}`)},ld=t=>{st(t,"Div",(e,r)=>`${e}/${r}`)},cd=t=>{st(t,"Equal",{scalar:(e,r)=>`u32(${e}==${r})`,vector:(e,r)=>`vec4<u32>(${e}==${r})`},void 0,void 0,9)},pd=t=>{st(t,"Mul",(e,r)=>`${e}*${r}`)},md=t=>{let e=O("input",t.inputs[0].dataType,t.inputs[0].dims).type.value;st(t,"Pow",{scalar:(n,o)=>`pow_custom(${n},${o})`,vector:(n,o)=>`pow_vector_custom(${n},${o})`},`
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
      `)},fd=t=>{st(t,"Sub",(e,r)=>`${e}-${r}`)},hd=t=>{st(t,"Greater",{scalar:(e,r)=>`u32(${e}>${r})`,vector:(e,r)=>`vec4<u32>(${e}>${r})`},void 0,void 0,9)},gd=t=>{st(t,"Less",{scalar:(e,r)=>`u32(${e}<${r})`,vector:(e,r)=>`vec4<u32>(${e}<${r})`},void 0,void 0,9)},bd=t=>{st(t,"GreaterOrEqual",{scalar:(e,r)=>`u32(${e}>=${r})`,vector:(e,r)=>`vec4<u32>(${e}>=${r})`},void 0,void 0,9)},yd=t=>{st(t,"LessOrEqual",{scalar:(e,r)=>`u32(${e}<=${r})`,vector:(e,r)=>`vec4<u32>(${e}<=${r})`},void 0,void 0,9)}});var zh,Oh,Dh,Bh,wd,vd,$d=V(()=>{"use strict";J();re();Ie();oe();zh=(t,e)=>{if(!t||t.length<1)throw new Error("too few inputs");let r=0,n=t[r],o=n.dataType,i=n.dims.length;t.forEach((s,u)=>{if(u!==r){if(s.dataType!==o)throw new Error("input tensors should be one type");if(s.dims.length!==i)throw new Error("input tensors should have the same shape");s.dims.forEach((d,c)=>{if(c!==e&&d!==n.dims[c])throw new Error("non concat dimensions must match")})}})},Oh=(t,e)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${t}u>(${e});
    for (var i: u32 = 0u; i < ${t}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${t}u;
  }`,Dh=(t,e)=>{let r=t.length,n=[];for(let o=0;o<r;++o){let i=e.setByOffset("global_idx",t[o].getByIndices("indices"));r===1?n.push(i):o===0?n.push(`if (inputIndex == ${o}u) { ${i} }`):o===r-1?n.push(`else { ${i} }`):n.push(`else if (inputIndex == ${o}) { ${i} }`)}return n.join(`
`)},Bh=(t,e,r,n)=>{let o=k.size(r),i=new Array(t.length),s=new Array(t.length),u=0,d=[],c=[],p=[{type:12,data:o}];for(let w=0;w<t.length;++w)u+=t[w].dims[e],i[w]=u,c.push(t[w].dims.length),s[w]=O(`input${w}`,n,c[w]),d.push("rank"),p.push({type:12,data:i[w]});for(let w=0;w<t.length;++w)p.push(...L(t[w].dims));p.push(...L(r));let m=U("output",n,r.length),h=m.indicesGet("indices",e),_=Array.from(Array(i.length).keys()).map(w=>`uniforms.sizeInConcatAxis${w}`).join(","),y=w=>`

  ${(()=>{w.registerUniform("outputSize","u32");for(let S=0;S<t.length;S++)w.registerUniform(`sizeInConcatAxis${S}`,"u32");return w.declareVariables(...s,m)})()}

  ${Oh(i.length,_)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${m.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${_});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Dh(s,m)}
  }`;return{name:"Concat",shaderCache:{hint:`${e}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:p}),getShaderSource:y}},wd=(t,e)=>{let r=t.inputs,n=r[0].dims,o=k.normalizeAxis(e.axis,n.length);zh(r,o);let i=n.slice();i[o]=r.reduce((u,d)=>u+(d.dims.length>o?d.dims[o]:0),0);let s=r.filter(u=>k.size(u.dims)>0);t.compute(Bh(s,o,i,r[0].dataType),{inputs:s})},vd=t=>ee({axis:t.axis})});var je,Ze,Qe,en,xt=V(()=>{"use strict";J();re();je=(t,e,r="f32")=>{switch(t.activation){case"Relu":return`value = max(value, ${e}(0.0));`;case"Sigmoid":return`value = (${e}(1.0) / (${e}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${e}(${r}(uniforms.clip_min)), ${e}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${e}(0.0), min(${e}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${e}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${t.activation}`)}},Ze=(t,e)=>{t.activation==="Clip"?e.push({type:1,data:t.clipMax},{type:1,data:t.clipMin}):t.activation==="HardSigmoid"?e.push({type:1,data:t.alpha},{type:1,data:t.beta}):t.activation==="LeakyRelu"&&e.push({type:1,data:t.alpha})},Qe=(t,e)=>{t.activation==="Clip"?e.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):t.activation==="HardSigmoid"?e.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):t.activation==="LeakyRelu"&&e.push({name:"alpha",type:"f32"})},en=t=>{let e=t?.activation||"";if(e==="HardSigmoid"){let[r,n]=t?.activation_params||[.2,.5];return{activation:e,alpha:r,beta:n}}else if(e==="Clip"){let[r,n]=t?.activation_params||[Es,ks];return{activation:e,clipMax:n,clipMin:r}}else if(e==="LeakyRelu"){let[r]=t?.activation_params||[.01];return{activation:e,alpha:r}}return{activation:e}}});var Ee,xd,tn=V(()=>{"use strict";Ee=(t,e)=>{switch(t){case 1:return e;case 2:return`vec2<${e}>`;case 3:return`vec3<${e}>`;case 4:return`vec4<${e}>`;default:throw new Error(`${t}-component is not supported.`)}},xd=t=>`
      ${t?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Sd,Td=V(()=>{"use strict";Sd=t=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${t}.x), i32(${t}.y), i32(${t}.z), 1));
}
`});var or,rn,nn=V(()=>{"use strict";J();re();oe();xt();or=(t,e,r,n,o)=>{let i=n-r;return`
      ${Array.from({length:r}).map((s,u)=>`
      if (${F(e.shape,u,e.rank)} != 1) {
        ${e.indicesSet(t,u,F(o,u+i,n))}
      } else {
        ${e.indicesSet(t,u,0)}
      }`).join("")}
`},rn=(t,e,r,n,o=!1,i)=>{let s=t[0].dims,u=t[1].dims,d=s[s.length-2],c=u[u.length-1],p=s[s.length-1],m=fe(c),h=fe(p),_=fe(d),y=k.size(r)/m/_,w=t.length>2,S=n?n.slice(0,-2):r.slice(0,-2),v=[k.size(S),d,c],T=[{type:12,data:y},{type:12,data:d},{type:12,data:c},{type:12,data:p}];Ze(e,T),T.push(...L(S,s,u)),w&&T.push(...L(t[2].dims)),T.push(...L(v));let I=E=>{let A=jr("batch_dims",t[0].dataType,S.length),D=O("a",t[0].dataType,s.length,h),B=O("b",t[1].dataType,u.length,m),R=U("output",t[0].dataType,v.length,m),x=we(R.type.tensor),q=je(e,R.type.value,x),j=[D,B],Z="";if(w){let Y=o?m:1;j.push(O("bias",t[2].dataType,t[2].dims.length,Y)),Z=`${o?`value += bias[col / ${Y}];`:`value += ${R.type.value}(bias[row + i]);`}`}let W=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Qe(e,W);let le=()=>{let Y=`var a_data: ${D.type.value};`;for(let z=0;z<h;z++)Y+=`
              let b_data${z} = b[(b_offset + (k + ${z}) * uniforms.N + col) / ${m}];`;for(let z=0;z<_;z++){Y+=`a_data = a[(a_offset + (row + ${z}) * uniforms.K + k) / ${h}];`;for(let K=0;K<h;K++)Y+=`
            values[${z}] = fma(${B.type.value}(a_data${h===1?"":`[${K}]`}), b_data${K}, values[${z}]);
`}return Y};return`
  ${E.registerUniforms(W).registerInternalVariables(A).declareVariables(...j,R)}
  ${E.mainStart()}
    ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${m})) * ${m};
    var index1 = global_idx / (uniforms.N / ${m});
    let stride1 = uniforms.M / ${_};
    let row = (index1 % stride1) * ${_};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${A.offsetToIndices("batch")};`}

    var a_indices: ${D.type.indices};
    ${or("a_indices",D,D.rank-2,A.rank,"batch_indices")}
    ${D.indicesSet("a_indices",D.rank-2,0)}
    ${D.indicesSet("a_indices",D.rank-1,0)}
    let a_offset = ${D.indicesToOffset("a_indices")};

    var b_indices: ${B.type.indices};
    ${or("b_indices",B,B.rank-2,A.rank,"batch_indices")}
    ${B.indicesSet("b_indices",B.rank-2,0)}
    ${B.indicesSet("b_indices",B.rank-1,0)}
    let b_offset = ${B.indicesToOffset("b_indices")};
    var values: array<${R.type.value}, ${_}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${le()}
    }
    for (var i = 0u; i < ${_}u; i++) {
      var value = values[i];
      ${Z}
      ${q}
      let cur_indices = ${R.type.indices}(batch, row + i, col);
      let offset = ${R.indicesToOffset("cur_indices")};
      ${R.setByOffset(`offset / ${m}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${e.activation};${m};${h};${_};${o}`,inputDependencies:w?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:T}),getShaderSource:I}}});var Mh,Rh,wo,Id,Uh,vo,Nh,ir,on=V(()=>{"use strict";J();re();oe();xt();nn();tn();Mh=(t,e)=>t?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${e?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${e?", batchIndices":""});
        `,Rh=(t,e)=>t?`
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
        }`,wo=(t,e,r="f32",n,o=!1,i=32,s=!1,u=32)=>{let d=e[1]*t[1],c=e[0]*t[0],p=o?d:i,m=o?i:d,h=p/e[0],_=i/e[1];if(!((o&&h===4&&t[1]===4||!o&&(h===3||h===4))&&p%e[0]===0&&i%e[1]===0&&t[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${h} and workPerThread[1] ${t[1]} must be 4.
      Otherwise, innerElementSize ${h} must be 3 or 4.
  tileAWidth ${p} must be divisible by workgroupSize[0]${e[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${e[1]}. colPerThread ${t[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${h}<${r}>, ${p/h}>, ${m}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${c/t[0]}>, ${i}>;

const rowPerThread = ${t[1]};
const colPerThread = ${t[0]};
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
  let batch = ${s?"0":"i32(globalId.z)"};
  ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${d};

  let num_tiles = ${s?`${Math.ceil(u/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Mh(o,n)}
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
          ${h===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Rh(o,h)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Id=(t,e)=>t?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${e?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${e?", batchIndices":""});
            `,Uh=t=>t?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",vo=(t,e,r="f32",n,o=!1,i=32,s=!1,u=32,d=!1)=>{let c=t[1]*e[1],p=t[0]*e[0],m=o?c:i,h=o?i:c;if(!(h%e[1]===0&&m%e[0]===0&&i%e[1]===0))throw new Error(`tileAHight ${h} must be divisible by workgroupSize[1]${e[1]}, tileAWidth ${m} must be divisible by workgroupSize[0]${e[0]}, tileInner ${i} must be divisible by workgroupSize[1]${e[1]}`);let _=h/e[1],y=m/e[0],w=i/e[1],S=d?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${c};
    let globalColStart = i32(workgroupId.x) * ${p};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${e[1]}) {
        for (var inputCol = localCol; inputCol < ${m}; inputCol = inputCol + ${e[0]}) {
          ${Id(o,n)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${e[1]}) {
            for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${e[0]}) {
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
let globalRowStart = i32(workgroupId.y) * ${c};

let tileRowA = i32(localId.y) * ${_};
let tileColA = i32(localId.x) * ${y};
let tileRowB = i32(localId.y) * ${w};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${y}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Id(o,n)}
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
      ${Uh(o)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${m}>, ${h}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${p}>, ${i}>;
  const rowPerThread = ${t[1]};
  const colPerThread = ${t[0]};
  const tileInner = ${i};

@compute @workgroup_size(${e[0]}, ${e[1]}, ${e[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(u/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${S}
  }
`},Nh=(t,e,r,n,o=!1)=>{let[i,s,u,d]=n,c=we(n[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Ee(t,c)} {
      var value = ${Ee(t,c)}(0.0);
      let col = colIn * ${t};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${or("aIndices",s,s.rank-2,i.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Ee(t,c)} {
      var value = ${Ee(t,c)}(0.0);
      let col = colIn * ${t};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${or("bIndices",u,u.rank-2,i.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ee(t,c)}) {
      let col = colIn * ${t};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${e?`value = value + ${o?"bias[colIn]":`${Ee(t,c)}(bias[row])`};`:""}
        ${r}
        ${d.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},ir=(t,e,r,n,o=!1,i)=>{let s=t[0].dims,u=t[1].dims,d=s.slice(0,-2),c=u.slice(0,-2),p=n?n.slice(0,-2):r.slice(0,-2),m=k.size(p),h=s[s.length-2],_=s[s.length-1],y=u[u.length-1],w=_%4===0&&y%4===0,S=h<=8?[4,1,1]:[4,4,1],$=[8,8,1],v=[Math.ceil(y/$[0]/S[0]),Math.ceil(h/$[1]/S[1]),Math.ceil(m/$[2]/S[2])],T=w?4:1,I=[...d,h,_/T],E=I.length,A=[...c,_,y/T],D=A.length,B=[m,h,y/T],R=[{type:6,data:h},{type:6,data:y},{type:6,data:_}];Ze(e,R),R.push(...L(p,I,A));let x=["rank","rank"],q=t.length>2;q&&(R.push(...L(t[2].dims)),x.push("rank")),R.push(...L(B));let j=Z=>{let W=p.length,le=jr("batchDims",t[0].dataType,W,1),Y=we(t[0].dataType),z=O("a",t[0].dataType,E,T),K=O("b",t[1].dataType,D,T),Q=U("result",t[0].dataType,B.length,T),ie=[z,K];if(q){let X=o?T:1;ie.push(O("bias",t[2].dataType,t[2].dims.length,X))}let Te=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Qe(e,Te);let xe=we(Q.type.tensor),te=je(e,Q.type.value,xe),N=Nh(T,q,te,[le,z,K,Q],o);return`
  ${Z.registerUniforms(Te).registerInternalVariables(le).declareVariables(...ie,Q)}
  ${N}
  ${w?wo(S,$,Y,le):vo(S,$,Y,le)}
                   `};return{name:"MatMul",shaderCache:{hint:`${S};${e.activation};${w};${o}`,inputDependencies:x},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:t[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:R}),getShaderSource:j}}});var Vh,Cd,Ad=V(()=>{"use strict";J();tt();oe();xt();tn();Td();on();Vh=(t,e,r,n,o=!1,i,s=4,u=4,d=4,c="f32")=>{let p=x=>{switch(x){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${c}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${x} is not supported.`)}},m=x=>{switch(x){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${x} is not supported.`)}},h=t?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,_=t?`
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
    `,y=t?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",w=t?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",S=t?"row":"col",$=t?"col":"row",v=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${t?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${S} / outWidth;
    let outCol = ${S} % outWidth;

    let WRow = ${$} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${$} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${$} % inChannels;
    var resData = ${Ee(s,c)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${y} && xCol >= 0 && xCol < ${w}) {
      ${h}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${p(s)}
    }
    return resData;`,T=t?e&&n?`
    let col = colIn * ${s};
    ${v}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${v}
    }
    return ${Ee(s,c)}(0.0);`:n&&r?`
    let col = colIn * ${s};
    ${v}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${v}
    }
    return ${Ee(s,c)}(0.0);`,I=t?n&&r?m(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${m(u)}
    }
    return ${Ee(u,c)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${m(u)}
    }
    return ${Ee(u,c)}(0.0);`,E=Ee(d,c),A=t?Ee(s,c):Ee(u,c),D=t?Ee(u,c):Ee(s,c),B=je(i,E,c);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${t?T:I}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${D} {
      ${t?I:T}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${E}) {
      let col = colIn * ${d};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${t?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${_}
      ${xd(o)}
      ${B}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Cd=(t,e,r,n,o,i,s,u,d)=>{let c=e.format==="NHWC",p=c?t[0].dims[3]:t[0].dims[1],m=r[0],h=c?r[2]:r[3],_=c?r[1]:r[2],y=c?r[3]:r[1],w=c&&(p%4===0||p%3===0)&&y%4===0,S=c?y:h*_,$=c?h*_:y,v=[8,8,1],T=n<=8?[4,1,1]:[4,4,1],I=[Math.ceil(S/v[0]/T[0]),Math.ceil($/v[1]/T[1]),Math.ceil(m/v[2]/T[2])];ae("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${I}`);let E=w?c&&p%4!==0?3:4:1,A=v[1]*T[1],D=v[0]*T[0],B=Math.max(v[0]*E,v[1]),R=n%A===0,x=o%D===0,q=i%B===0,j=w?[E,4,4]:[1,1,1],Z=[{type:6,data:n},{type:6,data:o},{type:6,data:i},{type:6,data:[e.pads[0],e.pads[1]]},{type:6,data:e.strides},{type:6,data:e.dilations}];Ze(e,Z),Z.push(...L(t[0].dims,t[1].dims));let W=["rank","rank"];s&&(Z.push(...L(t[2].dims)),W.push("rank")),Z.push(...L(r));let le=Y=>{let z=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Qe(e,z);let K=w?4:1,Q=we(t[0].dataType),ie=`
      fn setOutputAtIndex(flatIndex : i32, value : ${w?`vec4<${Q}>`:Q}) {
        result[flatIndex] = ${w?`vec4<${Q}>`:Q}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${w?`vec4<${Q}>`:Q}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${w?"/ 4":""}, value);
      }`,Te=O("x",t[0].dataType,t[0].dims.length,E===3?1:E),xe=O("w",t[1].dataType,t[1].dims.length,K),te=[Te,xe],N=U("result",t[0].dataType,r.length,K);if(s){let X=O("bias",t[2].dataType,t[2].dims.length,K);te.push(X),ie+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${w?`vec4<${Q}>`:Q} {
          return bias[coords.${c?"w":"y"}${w?"/ 4":""}];
        }`}return`
        ${Sd("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${Y.registerUniforms(z).declareVariables(...te,N)}
        ${ie}
        ${Vh(c,R,x,q,s,e,j[0],j[1],j[2],Q)}
        ${w?wo(T,v,Q,void 0,!c,B):vo(T,v,Q,void 0,!c,B,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${e.cacheKey};${E};${w};${R};${x};${q};${A};${D};${B}`,inputDependencies:W},getRunData:()=>({outputs:[{dims:d?d(r):r,dataType:t[0].dataType}],dispatchGroup:{x:I[0],y:I[1],z:I[2]},programUniforms:Z}),getShaderSource:le}}});var Lh,Ed,an,Wh,kd,Gh,Pd,zd,Od=V(()=>{"use strict";J();tt();re();oe();xt();tn();Lh=t=>{let e=1;for(let r=0;r<t.length;r++)e*=t[r];return e},Ed=t=>typeof t=="number"?[t,t,t]:t,an=(t,e)=>e<=1?t:t+(t-1)*(e-1),Wh=(t,e,r,n=1)=>{let o=an(e,n);return Math.floor((t[0]*(r-1)-r+o)/2)},kd=(t,e,r,n,o)=>{o==null&&(o=Wh(t,e[0],n[0]));let i=[0,0,0,r];for(let s=0;s<3;s++)t[s]+2*o>=e[s]&&(i[s]=Math.trunc((t[s]-e[s]+2*o)/n[s]+1));return i},Gh=(t,e,r,n,o,i,s,u,d,c)=>{let p,m,h,_;if(t==="VALID"&&(t=0),typeof t=="number"){p={top:t,bottom:t,left:t,right:t,front:t,back:t};let y=kd([e,r,n,1],[u,d,c],1,[o,i,s],t);m=y[0],h=y[1],_=y[2]}else if(Array.isArray(t)){if(!t.every((w,S,$)=>w===$[0]))throw Error(`Unsupported padding parameter: ${t}`);p={top:t[0],bottom:t[1],left:t[2],right:t[3],front:t[4],back:t[5]};let y=kd([e,r,n,1],[u,d,c],1,[o,i,s],t[0]);m=y[0],h=y[1],_=y[2]}else if(t==="SAME_UPPER"){m=Math.ceil(e/o),h=Math.ceil(r/i),_=Math.ceil(n/s);let y=(m-1)*o+u-e,w=(h-1)*i+d-r,S=(_-1)*s+c-n,$=Math.floor(y/2),v=y-$,T=Math.floor(w/2),I=w-T,E=Math.floor(S/2),A=S-E;p={top:T,bottom:I,left:E,right:A,front:$,back:v}}else throw Error(`Unknown padding parameter: ${t}`);return{padInfo:p,outDepth:m,outHeight:h,outWidth:_}},Pd=(t,e,r,n,o,i=!1,s="channelsLast")=>{let u,d,c,p,m;if(s==="channelsLast")[u,d,c,p,m]=t;else if(s==="channelsFirst")[u,m,d,c,p]=t;else throw new Error(`Unknown dataFormat ${s}`);let[h,,_,y,w]=e,[S,$,v]=Ed(r),[T,I,E]=Ed(n),A=an(_,T),D=an(y,I),B=an(w,E),{padInfo:R,outDepth:x,outHeight:q,outWidth:j}=Gh(o,d,c,p,S,$,v,A,D,B),Z=i?h*m:h,W=[0,0,0,0,0];return s==="channelsFirst"?W=[u,Z,x,q,j]:s==="channelsLast"&&(W=[u,x,q,j,Z]),{batchSize:u,dataFormat:s,inDepth:d,inHeight:c,inWidth:p,inChannels:m,outDepth:x,outHeight:q,outWidth:j,outChannels:Z,padInfo:R,strideDepth:S,strideHeight:$,strideWidth:v,filterDepth:_,filterHeight:y,filterWidth:w,effectiveFilterDepth:A,effectiveFilterHeight:D,effectiveFilterWidth:B,dilationDepth:T,dilationHeight:I,dilationWidth:E,inShape:t,outShape:W,filterShape:e}},zd=(t,e,r,n,o,i)=>{let s=i==="channelsLast",u=s?t[0].dims[3]:t[0].dims[1],d=!1,c=[64,1,1],p={x:r.map((v,T)=>T)},m=[Math.ceil(Lh(p.x.map(v=>r[v]))/c[0]),1,1];ae("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${m}`);let h=d?s&&u%4!==0?3:4:1,_=k.size(r),y=[{type:12,data:_},{type:12,data:n},{type:12,data:o},{type:12,data:e.strides},{type:12,data:e.dilations}];Ze(e,y),y.push(...L(t[0].dims,t[1].dims));let w=["rank","rank"],S=t.length===3;S&&(y.push(...L(t[2].dims)),w.push("rank")),y.push(...L(r));let $=v=>{let T=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:n.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:e.strides.length},{name:"dilations",type:"u32",length:e.dilations.length}];Qe(e,T);let I=d?4:1,E=we(t[0].dataType),A=O("x",t[0].dataType,t[0].dims.length,h===3?1:h),D=O("W",t[1].dataType,t[1].dims.length,I),B=[A,D],R=U("result",t[0].dataType,r.length,I),x="";if(S){let Z=O("bias",t[2].dataType,t[2].dims.length,I);B.push(Z),x+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${d?`vec4<${E}>`:E} {
          return bias[${s?F("coords",4,5):F("coords",1,5)}${d?"/ 4":""}];
        }`}let q=Ee(h,E),j=je(e,q,E);return`
            ${x}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${A.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${D.getByIndices("aIndices")};
            }
          ${v.registerUniforms(T).declareVariables(...B,R)}
          ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${R.offsetToIndices("global_idx")};
              let batch = ${F("coords",0,A.rank)};
              let d2 = ${s?F("coords",A.rank-1,A.rank):F("coords",1,A.rank)};
              let xFRCCorner = vec3<u32>(${s?F("coords",1,A.rank):F("coords",2,A.rank)},
              ${s?F("coords",2,A.rank):F("coords",3,A.rank)},
              ${s?F("coords",3,A.rank):F("coords",4,A.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?F("uniforms.x_shape",1,A.rank):F("uniforms.x_shape",2,A.rank)};
              let xShapeZ = ${s?F("uniforms.x_shape",2,A.rank):F("uniforms.x_shape",3,A.rank)};
              let xShapeW = ${s?F("uniforms.x_shape",3,A.rank):F("uniforms.x_shape",4,A.rank)};
              let xShapeU = ${s?F("uniforms.x_shape",4,A.rank):F("uniforms.x_shape",1,A.rank)};
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
              ${j}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${e.cacheKey};${s};${h};${S}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:r,dataType:t[0].dataType}],dispatchGroup:{x:m[0],y:m[1],z:m[2]},programUniforms:y}),getShaderSource:$}}});var Dd,Bd,Md=V(()=>{"use strict";J();re();oe();xt();Dd=(t,e,r,n)=>{let o=t.length>2,i=o?"value += b[output_channel];":"",s=t[0].dims,u=t[1].dims,d=e.format==="NHWC",c=d?r[3]:r[1],p=c/e.group,m=d&&p>=4?fe(c):1,h=k.size(r)/m,_=[{type:12,data:h},{type:12,data:e.dilations},{type:12,data:[e.strides[0],e.strides[1]]},{type:12,data:[e.pads[0],e.pads[1]]},{type:12,data:p}];Ze(e,_),_.push(...L(s,[u[0],u[1],u[2],u[3]/m]));let y=o?["rank","rank","rank"]:["rank","rank"];_.push(...L([r[0],r[1],r[2],r[3]/m]));let w=S=>{let $=U("output",t[0].dataType,r.length,m),v=we($.type.tensor),T=je(e,$.type.value,v),I=O("x",t[0].dataType,s.length),E=O("w",t[1].dataType,u.length,m),A=[I,E];o&&A.push(O("b",t[2].dataType,t[2].dims,m));let D=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:e.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Qe(e,D);let B=d?`
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
            let wVal = ${E.get("wHeight","wWidth","wInChannel","output_channel")};
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
            let wVal = ${E.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${S.registerUniforms(D).declareVariables(...A,$)}

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${$.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${d?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${d?1:2}], outputIndices[${d?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${m} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${d?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${B}
    ${i}
    ${T}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${e.cacheKey}_${m}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:_}),getShaderSource:w}},Bd=(t,e,r,n)=>{let o=t.length>2,i=fe(r[3]),s=fe(r[2]),u=k.size(r)/i/s,d=[t[0].dims[0],t[0].dims[1],t[0].dims[2],t[0].dims[3]/i],c=[t[1].dims[0],t[1].dims[1],t[1].dims[2],t[1].dims[3]/i],p=[r[0],r[1],r[2],r[3]/i],m=[{type:12,data:u},{type:6,data:[e.strides[0],e.strides[1]]},{type:6,data:[e.pads[0],e.pads[1]]}];Ze(e,m),m.push(...L(d,c,p));let h=(s-1)*e.strides[1]+c[1],_=y=>{let w=U("output",t[0].dataType,p.length,i),S=we(w.type.tensor),$=je(e,w.type.value,S),v=O("x",t[0].dataType,d.length,i),T=O("w",t[1].dataType,c.length,i),I=[v,T];o&&I.push(O("b",t[2].dataType,t[2].dims,i));let E=o?"value += b[output_channel];":"",A=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Qe(e,A),`
  ${y.registerUniforms(A).declareVariables(...I,w)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${v.type.value}, ${h}>;
    var values: array<${w.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${c[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${h}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${v.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${v.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${c[1]}; w_width++) {
          let w_val = ${T.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${E}
      ${$}
      ${w.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${e.cacheKey};${i};${s};${h};${c[0]};${c[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:m}),getShaderSource:_}}});var Hh,$o,Fh,xo,So,Rd,qh,Kh,To,Ud=V(()=>{"use strict";re();Ad();Od();on();Md();xt();nn();dt();Hh=(t,e,r,n,o,i)=>{let s=t[0],u=t.slice(i?1:2,i?3:4),d=u.length,c=e[0],m=e.slice(2).map((y,w)=>y+(y-1)*(r[w]-1)),_=u.map((y,w)=>y+n[w]+n[w+d]).map((y,w)=>Math.floor((y-m[w]+o[w])/o[w]));return _.splice(0,0,s),_.splice(i?3:1,0,c),_},$o=[2,3,1,0],Fh=(t,e)=>{if(!t||t.length!==2&&t.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(t[0].dims.length>5)throw new Error("greater than 5D is not supported");if(t[0].dims.length!==t[1].dims.length)throw new Error("filter does not have same dimension as input");let r=t[0].dims[e.format==="NHWC"?t[0].dims.length-1:1],n=t[1].dims[1]*e.group;if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(t.length===3&&(t[2].dims.length!==1||t[1].dims[0]!==t[2].dims[0]))throw new Error("invalid bias");let o=t[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==t[1].dims.length-2)throw new Error("invalid kernel shape")},xo=(t,e)=>{let r=t.kernelShape.slice();r.length<e[1].dims.length-2&&r.push(...Array(e[1].dims.length-2-r.length).fill(0));for(let i=2;i<e[1].dims.length;++i)r[i-2]===0&&(r[i-2]=e[1].dims[i]);let n=t.pads.slice();zt.adjustPadsBasedOnAutoPad(e[0].dims,t.strides,t.dilations,r,n,t.format==="NHWC",t.autoPad);let o=Object.assign({},t);return Object.assign(o,{kernelShape:r,pads:n}),o},So=t=>{let e=en(t),r=t.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][t.auto_pad],o=t.dilations,i=t.group,s=t.kernel_shape,u=t.pads,d=t.strides,c=t.w_is_const();return{autoPad:n,format:r,dilations:o,group:i,kernelShape:s,pads:u,strides:d,wIsConst:c,...e,cacheKey:`${t.format};${e.activation};`}},Rd=(t,e,r,n)=>{let o=r.format==="NHWC",i=Hh(e[0].dims,e[1].dims,r.dilations,r.pads,r.strides,o);if(r.group!==1){let A=[e[0]];if(o){let B=t.kernelCustomData.wT??t.compute(ze(e[1],$o),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=B),A.push(B)}else A.push(e[1]);e.length===3&&A.push(e[2]),!t.adapterInfo.isArchitecture("ampere")&&o&&e[1].dims[0]===r.group&&e[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?t.compute(Bd(A,r,i,n),{inputs:A}):t.compute(Dd(A,r,i,n),{inputs:A});return}let s=e.length===3,u=e[0].dims[o?1:2],d=e[0].dims[o?2:3],c=e[0].dims[o?3:1],p=e[1].dims[2],m=e[1].dims[3],h=i[o?1:2],_=i[o?2:3],y=i[o?3:1],w=o&&p===u&&m===d&&r.pads[0]===0&&r.pads[1]===0;if(w||p===1&&m===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let A=i[0],D,B,R,x=[];if(o){let Z=t.kernelCustomData.wT??t.compute(ze(e[1],$o),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=Z),w){let W=u*d*c;D=e[0].reshape([1,A,W]),B=Z.reshape([1,W,y]),R=[1,A,y]}else D=e[0].reshape([A,u*d,c]),B=Z.reshape([1,c,y]),R=[A,h*_,y];x.push(D),x.push(B)}else D=e[0].reshape([A,c,u*d]),B=e[1].reshape([1,y,c]),R=[A,y,h*_],x.push(B),x.push(D);s&&x.push(e[2]);let q=R[2],j=x[0].dims[x[0].dims.length-1];q<8&&j<8?t.compute(rn(x,r,i,R,o,n),{inputs:x}):t.compute(ir(x,r,i,R,o,n),{inputs:x});return}let S=!0,$=t.kernelCustomData.wT??t.compute(ze(e[1],$o),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=$);let v=[e[0],$];s&&v.push(e[2]);let T=o?h*_:y,I=o?y:h*_,E=p*m*c;t.compute(Cd(v,r,i,T,I,E,s,S,n),{inputs:v})},qh=(t,e)=>{let r=e.format==="NHWC",n=[t.inputs[0].reshape(r?[t.inputs[0].dims[0],1,t.inputs[0].dims[1],t.inputs[0].dims[2]]:[t.inputs[0].dims[0],t.inputs[0].dims[1],1,t.inputs[0].dims[2]]),t.inputs[1].reshape([t.inputs[1].dims[0],t.inputs[1].dims[1],1,t.inputs[1].dims[2]])];t.inputs.length===3&&n.push(t.inputs[2]);let o=[0,e.pads[0],0,e.pads[1]],i=[1].concat(e.strides),s=[1].concat(e.dilations),u=[1].concat(e.kernelShape),d=xo({...e,pads:o,strides:i,dilations:s,kernelShape:u},n);Rd(t,n,d,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},Kh=(t,e,r)=>{let n=r.format==="NHWC"?"channelsLast":"channelsFirst",o=xo(r,e),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=Pd(e[0].dims,e[1].dims,r.strides,r.dilations,i,!1,n);t.compute(zd(e,o,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],n))},To=(t,e)=>{if(Fh(t.inputs,e),t.inputs[0].dims.length===3)qh(t,e);else if(t.inputs[0].dims.length===5)Kh(t,t.inputs,e);else{let r=xo(e,t.inputs);Rd(t,t.inputs,r)}}});var Nd,Vd=V(()=>{"use strict";J();tt();re();oe();Nd=(t,e,r)=>{let n=t.length>2,o=e.outputShape,i=e.format==="NHWC",s=e.group,u=t[1].dims,d=u[2]/s,c=u[3],p=i?fe(d):1,m=i&&c===1&&d>=4,h=m?Math.floor(d/4)*4:Math.floor(d/p)*p,_=d-h,y=i?fe(c):1,w=i?c===1?p:y:1,S=k.size(o)/y,$=[Math.ceil(S/64),1,1];ae("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${$}`);let v=["rank","rank"],T=[e.strides[0],e.strides[1]],I=[e.kernelShape[i?1:2],e.kernelShape[i?2:3]],E=[e.dilations[0],e.dilations[1]],A=[I[0]+(e.dilations[0]<=1?0:(e.kernelShape[i?1:2]-1)*(e.dilations[0]-1)),I[1]+(e.dilations[1]<=1?0:(e.kernelShape[i?2:3]-1)*(e.dilations[1]-1))],D=[A[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),A[1]-1-Math.floor((e.pads[1]+e.pads[3])/2)],B=[{type:12,data:S},{type:12,data:T},{type:12,data:I},{type:12,data:E},{type:12,data:A},{type:6,data:D},{type:12,data:h},{type:12,data:d},{type:12,data:c},...L(t[0].dims,t[1].dims)];n&&(B.push(...L(t[2].dims)),v.push("rank")),B.push(...L(o));let R=x=>{let q=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:T.length},{name:"filter_dims",type:"u32",length:I.length},{name:"dilations",type:"u32",length:I.length},{name:"effective_filter_dims",type:"u32",length:A.length},{name:"pads",type:"i32",length:D.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],j=we(t[0].dataType),Z=i?1:2,W=i?2:3,le=i?3:1,Y=O("W",t[1].dataType,t[1].dims.length,w),z=O("Dy",t[0].dataType,t[0].dims.length,p),K=[z,Y];n&&K.push(O("bias",t[2].dataType,[o[le]].length,y));let Q=U("result",t[0].dataType,o.length,y),ie=()=>{let te="";if(m)p===4?te+=`
        let xValue = ${z.getByOffset("x_offset")};
        let wValue = ${Y.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:p===2?te+=`
          dotProd = dotProd + dot(vec4<${j}>(${z.getByOffset("x_offset")}, ${z.getByOffset("x_offset + 1u")}), vec4<${j}>(${Y.getByOffset("w_offset")}, ${Y.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:p===1&&(te+=`
          dotProd = dotProd + dot(vec4<${j}>(${z.getByOffset("x_offset")}, ${z.getByOffset("x_offset + 1u")}, ${z.getByOffset("x_offset + 2u")}, ${z.getByOffset("x_offset + 3u")}), vec4<${j}>(${Y.getByOffset("w_offset")}, ${Y.getByOffset("w_offset + 1u")}, ${Y.getByOffset("w_offset + 2u")}, ${Y.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(te+=`
                  let xValue = ${i?z.getByOffset(`${z.indicesToOffset(`${z.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p}`):z.get("batch","inputChannel","idyR","idyC")};
        `,p===1)te+=`
          let w_offset = ${Y.indicesToOffset(`${Y.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${Y.getByOffset(`w_offset / ${w}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let N=0;N<p;N++)te+=`
            let wValue${N} = ${Y.getByOffset(`${Y.indicesToOffset(`${Y.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${N}, wOutChannel)`)} / ${w}`)};
            dotProd = dotProd + xValue[${N}] * wValue${N};`;return te},Te=()=>{if(_===0)return"";if(!m)throw new Error(`packInputAs4 ${m} is not true.`);let te="";if(p===1){te+="dotProd = dotProd";for(let N=0;N<_;N++)te+=`
            + ${z.getByOffset(`x_offset + ${N}`)} * ${Y.getByOffset(`w_offset + ${N}`)}`;te+=";"}else if(p===2){if(_!==2)throw new Error(`Invalid inputChannelsRemainder ${_}.`);te+=`
          let xValue = ${z.getByOffset("x_offset")};
          let wValue = ${Y.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return te},xe=`
            let outputIndices = ${Q.offsetToIndices(`global_idx * ${y}`)};
            let batch = ${Q.indicesGet("outputIndices",0)};
            let d1 = ${Q.indicesGet("outputIndices",le)};
            let r = ${Q.indicesGet("outputIndices",Z)};
            let c = ${Q.indicesGet("outputIndices",W)};
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
              let dyR = (${j}(dyRCorner) + ${j}(wR)) / ${j}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${j}(uniforms.Dy_shape[${Z}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${j}(dyCCorner) + ${j}(wC)) / ${j}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${j}(uniforms.Dy_shape[${W}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${m?`
                var x_offset = ${z.indicesToOffset(`${z.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p};
                var w_offset = ${Y.indicesToOffset(`${Y.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${w};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${m?4:p}) {
                  ${ie()}
                  inputChannel = inputChannel + ${m?4:p};
                }
                ${Te()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${n?` + bias[d1 / ${y}]`:""};
            ${Q.setByOffset("global_idx","value")};
          `;return`
    ${x.registerUniforms(q).declareVariables(...K,Q)}
      ${x.mainStart()}
      ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${xe}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${e.cacheKey};${p}${w}${y}${m}${_}`,inputDependencies:v},getRunData:()=>({dispatchGroup:{x:$[0],y:$[1],z:$[2]},outputs:[{dims:r?r(o):o,dataType:t[0].dataType}],programUniforms:B}),getShaderSource:R}}});var jh,Zh,Qh,Ld,Wd,Yh,Gd,Xh,Hd,Fd=V(()=>{"use strict";Vd();xt();dt();jh=(t,e,r,n,o,i)=>(t-1)*e+r+(n-1)*o+1-i,Zh=(t,e,r,n,o)=>{let i=Math.floor(t/2);e==="SAME_UPPER"?(r[n]=i,r[o]=t-i):e==="SAME_LOWER"&&(r[n]=t-i,r[o]=i)},Qh=(t,e,r,n,o,i,s,u,d,c)=>{let p=t.length-2,m=c.length===0;d.length<p&&d.push(...Array(p-d.length).fill(0));let h=t[0],_=e[u?3:1]*o;for(let y=0,w=t.length-p-(u?1:0);y<p;++y,++w){let S=t[w],$=m?S*s[y]:c[y],v=jh(S,s[y],i[y],e[w],r[y],$);Zh(v,n,i,y,y+p),m&&c.push(s[y]*(S-1)+d[y]+(e[w]-1)*r[y]+1-i[y]-i[y+p])}c.splice(0,0,h),c.splice(u?3:1,0,_)},Ld=(t,e)=>{let r=t.kernelShape.slice();if(t.kernelShape.length===0||t.kernelShape.reduce((m,h)=>m*h,1)===0){r.length=0;for(let m=2;m<e[1].dims.length;++m)r.push(e[1].dims[m])}let n=t.format==="NHWC";r.splice(0,0,e[1].dims[0]),r.splice(n?3:1,0,e[1].dims[1]);let o=t.pads.slice(),i=t.outputShape.slice(),s=t.outputPadding.slice(),u=e[0].dims,d=t.dilations.slice();if(d.reduce((m,h)=>m+h,0)===0){let m=e[0].dims.length-2;d=new Array(m).fill(1)}let c=t.strides.slice();if(c.reduce((m,h)=>m+h,0)===0){let m=e[0].dims.length-2;c=new Array(m).fill(1)}Qh(u,r,d,t.autoPad,t.group,o,c,n,s,i);let p=Object.assign({},t);return Object.assign(p,{kernelShape:r,pads:o,outputPadding:s,outputShape:i,dilations:d,strides:c}),p},Wd=t=>{let e=en(t),r=t.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof t.autoPad>"u"?0:t.autoPad],o=t.dilations,i=t.group,s=t.kernelShape,u=t.pads,d=t.strides,c=t.wIsConst(),p=t.outputPadding,m=t.outputShape;return{autoPad:n,format:r,dilations:o,group:i,kernelShape:s,outputPadding:p,outputShape:m,pads:u,strides:d,wIsConst:c,...e,cacheKey:`${t.format};${e.activation};`}},Yh=(t,e)=>{if(!t||t.length!==2&&t.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(t[0].dims.length!==4&&t[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(t[0].dims.length!==t[1].dims.length)throw new Error("filter does not have same dimension as input");let r=t[0].dims[e.format==="NHWC"?t[0].dims.length-1:1],n=t[1].dims[0];if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=t[1].dims[1]*e.group;if(t.length===3&&(t[2].dims.length!==1||t[2].dims[0]!==o))throw new Error("invalid bias");let i=t[0].dims.length-2;if(e.dilations.reduce((p,m)=>p+m,0)>0&&e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.reduce((p,m)=>p+m,0)>0&&e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.reduce((p,m)=>p+m,0)>0&&e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i&&e.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.reduce((p,m)=>p+m,0)>0&&e.kernelShape.length!==0&&e.kernelShape.length!==t[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==t[0].dims.length-2)throw new Error("invalid output shape")},Gd=(t,e,r,n)=>{let o=t.kernelCustomData.wT??t.compute(ze(e[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=o);let i=[e[0],o];e.length===3&&i.push(e[2]),t.compute(Nd(i,r,n),{inputs:i})},Xh=(t,e)=>{let r=e.format==="NHWC",n=[t.inputs[0].reshape(r?[t.inputs[0].dims[0],1,t.inputs[0].dims[1],t.inputs[0].dims[2]]:[t.inputs[0].dims[0],t.inputs[0].dims[1],1,t.inputs[0].dims[2]]),t.inputs[1].reshape([t.inputs[1].dims[0],t.inputs[1].dims[1],1,t.inputs[1].dims[2]])];t.inputs.length===3&&n.push(t.inputs[2]);let o=e.kernelShape;(o.length===0||o[0]===0)&&(o=[t.inputs[1].dims[2]]);let i=e.dilations;(i.length===0||i[0]===0)&&(i=[1]);let s=e.strides;(s.length===0||s[0]===0)&&(s=[1]);let u=e.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],s=[1].concat(s),i=[1].concat(i),o=[1].concat(o);let d=e.outputPadding;d=[0].concat(d);let c=Ld({...e,pads:u,strides:s,dilations:i,kernelShape:o,outputPadding:d},n);Gd(t,n,c,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},Hd=(t,e)=>{if(Yh(t.inputs,e),t.inputs[0].dims.length===3)Xh(t,e);else{let r=Ld(e,t.inputs);Gd(t,t.inputs,r)}}});var Jh,qd,Kd,jd=V(()=>{"use strict";J();re();Ie();oe();Jh=(t,e,r,n)=>{let o=k.size(e),i=e.length,s=O("input",t,i),u=U("output",t,i),d=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),c=k.normalizeAxis(d,i),p=m=>{let h=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,_=F("uniforms.input_shape","uniforms.axis",i),y=n.reverse?h+(n.exclusive?" + 1":""):"0",w=n.reverse?_:h+(n.exclusive?"":" + 1");return`
                ${m.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,u)}
                ${m.mainStart()}
                  ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${y};
                  let last : i32 = ${w};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:e,dataType:t}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:c},...L(e,e)]}),getShaderSource:p}},qd=(t,e)=>{let r=t.inputs[0].dims,n=t.inputs[0].dataType,o=t.inputs[1];t.compute(Jh(n,r,o,e),{inputs:[0]})},Kd=t=>{let e=t.exclusive===1,r=t.reverse===1;return ee({exclusive:e,reverse:r})}});var eg,tg,rg,Zd,Qd,Yd=V(()=>{"use strict";J();re();Ie();oe();eg=t=>{if(!t||t.length!==1)throw new Error("DepthToSpace requires 1 input.");if(t[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},tg=(t,e,r,n)=>{let o=[];o.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<e;++i)o.push(r.indicesSet("a",t[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},rg=(t,e)=>{let r,n,o,i,s,u,d=e.format==="NHWC",c=e.blocksize,p=e.mode==="DCR";d?([r,n,o,i]=t.dims,s=p?[r,n,o,c,c,i/c**2]:[r,n,o,i/c**2,c,c],u=p?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,o,i]=[t.dims[0],t.dims[2],t.dims[3],t.dims[1]],s=p?[r,c,c,i/c**2,n,o]:[r,i/c**2,c,c,n,o],u=p?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let m=t.reshape(s),h=m.dims.length,_=t.dataType,y=O("a",_,h),w=U("output",_,h),S=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(y,w)}

  ${tg(u,h,y,w)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${w.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${w.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${t.dims};${e.blocksize};${e.mode}`,inputDependencies:["rank"]},getRunData:$=>{let v=d?[r,n*c,o*c,i/c**2]:[r,i/c**2,n*c,o*c],T=k.size(v),I=m.dims,E=k.sortBasedOnPerm(I,u);return{outputs:[{dims:v,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(T/64)},programUniforms:[{type:12,data:T},...L(I,E)]}},getShaderSource:S}},Zd=(t,e)=>{eg(t.inputs),t.compute(rg(t.inputs[0],e))},Qd=t=>ee({blocksize:t.blocksize,mode:t.mode,format:t.format})});var Io,sn,Xd,ng,og,Co,Ao,Jd,ig,el,tl,rl=V(()=>{"use strict";J();re();Ie();oe();Io="[a-zA-Z]|\\.\\.\\.",sn="("+Io+")+",Xd="^"+sn+"$",ng="("+sn+",)*"+sn,og="^"+ng+"$",Co=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,r){let n=this.symbolToIndices.get(e);n===void 0?n=[r]:n.push(r),this.symbolToIndices.set(e,n)}},Ao=class{constructor(e,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,o]=r.includes("->")?r.split("->",2):[r,""];if(!n.match(RegExp(og)))throw new Error("Invalid LHS term");if(n.split(",").forEach((u,d)=>{let c=e[d].dims.slice();if(!u.match(RegExp(Xd)))throw new Error("Invalid LHS term");let p=this.processTerm(u,!0,c,d);this.lhs.push(p)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([u,d])=>d.count===1||u==="...").map(([u])=>u).join("");else if(!o.match(RegExp(sn)))throw new Error("Invalid RHS");o.match(RegExp(Io,"g"))?.forEach(u=>{if(u==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let d=this.symbolToInfo.get(u);if(d===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(d.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(e,r,n){let o=this.symbolToInfo.get(e);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(n)}else o={count:1,dimValue:r,inputIndices:[n]};this.symbolToInfo.set(e,o)}processTerm(e,r,n,o=-1){let i=n.length,s=!1,u=[],d=0;if(!e.match(RegExp(Xd))&&!r&&e!=="")throw new Error("Invalid LHS term");let c=e.match(RegExp(Io,"g")),p=new Co(o);return c?.forEach((m,h)=>{if(m==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let _=i-c.length+1;if(_<0)throw new Error("Ellipsis out of bounds");if(u=n.slice(d,d+_),this.hasEllipsis){if(this.ellipsisDims.length!==u.length||this.ellipsisDims.toString()!==u.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=u;else throw new Error("Ellipsis must be specified in the LHS");for(let y=0;y<u.length;y++){let w=String.fromCharCode(48+y);p.addSymbol(w,h+y),this.addSymbol(w,n[d++],o)}}else p.addSymbol(m,h+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(m,n[d++],o)}),p}},Jd=t=>t+"_max",ig=(t,e,r,n)=>{let i=t.map(p=>p.length).map((p,m)=>O(`input${m}`,e,p)),s=k.size(n),u=U("output",e,n.length),d=[...r.symbolToInfo.keys()].filter(p=>!r.rhs.symbolToIndices.has(p)),c=p=>{let m=[],h="var prod = 1.0;",_="var sum = 0.0;",y="sum += prod;",w=[],S=[],$=[],v=[],T=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((E,A)=>{if(r.rhs.symbolToIndices.has(A)){let D=r.rhs.symbolToIndices.get(A)?.[0];D!==void 0&&r.lhs.forEach((B,R)=>{if(E.inputIndices.includes(R)){let x=B.symbolToIndices.get(A);if(x===void 0)throw new Error("Invalid symbol error");x.forEach(q=>{m.push(`${i[R].indicesSet(`input${R}Indices`,q,u.indicesGet("outputIndices",D))}`)})}})}else r.lhs.forEach((D,B)=>{if(E.inputIndices.includes(B)){let R=D.symbolToIndices.get(A);if(R===void 0)throw new Error("Invalid symbol error");R.forEach(x=>{w.push(`${i[B].indicesSet(`input${B}Indices`,x,`${A}`)}`)}),v.push(`prod *= ${i[B].getByIndices(`input${B}Indices`)};`)}}),S.push(`for(var ${A}: u32 = 0; ${A} < uniforms.${Jd(A)}; ${A}++) {`),$.push("}")});let I=T?[...m,`let sum = ${i.map((E,A)=>E.getByIndices(`input${A}Indices`)).join(" * ")};`]:[...m,_,...S,...w,h,...v,y,...$];return`
            ${p.registerUniforms(d.map(E=>({name:`${Jd(E)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,u)}

            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${u.offsetToIndices("global_idx")};
            ${i.map((E,A)=>`var input${A}Indices: ${i[A].type.indices};`).join(`
`)}
            ${I.join(`
`)};
            ${u.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:t.map(()=>"rank")},getRunData:()=>{let p=d.filter(h=>r.symbolToInfo.has(h)).map(h=>({type:12,data:r.symbolToInfo.get(h)?.dimValue||0}));p.push({type:12,data:s});let m=t.map((h,_)=>[...L(h)]).reduce((h,_)=>h.concat(_),p);return m.push(...L(n)),{outputs:[{dims:n,dataType:e}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:m}},getShaderSource:c}},el=(t,e)=>{let r=new Ao(t.inputs,e.equation),n=r.outputDims,o=t.inputs.map((i,s)=>i.dims);t.compute(ig(o,t.inputs[0].dataType,r,n))},tl=t=>{let e=t.equation.replace(/\s+/g,"");return ee({equation:e})}});var ag,nl,sg,ug,ol,il=V(()=>{"use strict";J();re();oe();ag=t=>{if(!t||t.length!==2)throw new Error("Expand requires 2 input.");let e=t[0].dims,r=Array.from(t[1].getBigInt64Array(),Number),n=r.length<e.length?0:r.length-e.length,o=e.length<r.length?0:e.length-r.length;for(;n<r.length&&o<e.length;++n,++o)if(r[n]!==e[o]&&r[n]!==1&&e[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},nl=(t,e)=>{let r=t.length-e.length,n=[];for(let o=0;o<r;++o)n.push(t[o]);for(let o=0;o<e.length;++o)n.push(e[o]===1?t[o+r]:e[o]);return n},sg=(t,e)=>t.length>e.length?nl(t,e):nl(e,t),ug=t=>{let e=t[0].dims,r=Array.from(t[1].getBigInt64Array(),Number),n=sg(e,r),o=t[0].dataType,i=o===9||k.size(e)===1,s=o===9||e.length>0&&e[e.length-1]%4===0?4:1,u=i||n.length>0&&n[n.length-1]%4===0?4:1,d=Math.ceil(k.size(n)/u),c=m=>{let h=O("input",o,e.length,s),_=U("output",o,n.length,u),y;if(o===9){let w=(S,$,v="")=>`
          let outputIndices${$} = ${_.offsetToIndices(`outputOffset + ${$}u`)};
          let offset${$} = ${h.broadcastedIndicesToOffset(`outputIndices${$}`,_)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${S}[${$}] = ${v}(${h.getByOffset(`index${$}`)}[component${$}]);
        `;y=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${w("data",0,"u32")}
        ${w("data",1,"u32")}
        ${w("data",2,"u32")}
        ${w("data",3,"u32")}
        ${_.setByOffset("global_idx","data")}
      }`}else y=`
        let outputIndices = ${_.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${h.broadcastedIndicesToOffset("outputIndices",_)};
        let data = ${_.type.value}(${h.getByOffset(`inputOffset / ${s}`)});
        ${_.setByOffset("global_idx","data")}
      }`;return`
    ${m.registerUniform("vec_size","u32").declareVariables(h,_)}
    ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${y}`},p=[{type:12,data:d},...L(e,n)];return{name:"Expand",shaderCache:{hint:`${n.length};${s}${u}`,inputDependencies:["rank"]},getShaderSource:c,getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p})}},ol=t=>{ag(t.inputs),t.compute(ug(t.inputs),{inputs:[0]})}});var dg,al,sl=V(()=>{"use strict";J();re();oe();Jr();dg=t=>{let e=t[0].dataType,r=k.size(t[0].dims),n=k.size(t[1].dims),o=n%4===0,i=s=>{let u=O("x",e,[1],4),d=O("bias",e,[1],4),c=U("y",e,[1],4),p=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],m=_=>`
      let bias${_}_offset: u32 = (global_idx * 4 + ${_}) % uniforms.bias_size;
      let bias${_} = ${d.getByOffset(`bias${_}_offset / 4`)}[bias${_}_offset % 4];`,h=o?`
      let bias = ${d.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${m(0)}${m(1)}${m(2)}${m(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(p).declareVariables(u,d,c)}

    ${yo(Pe(e))}

    ${s.mainStart(Ot)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${h}
      let x_in = x + bias;
      ${c.setByOffset("global_idx",_o("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/Ot/4)}})}},al=t=>{t.inputs.length<2||k.size(t.inputs[1].dims)===0?rd(t):t.compute(dg(t.inputs))}});var lg,cg,ul,dl,ll=V(()=>{"use strict";J();re();Ie();oe();lg=t=>{if(!t||t.length!==2)throw new Error("Gather requires 2 inputs.")},cg=(t,e)=>{let r=t[0].dims,n=t[1].dims,o=r.length,i=k.normalizeAxis(e.axis,o),s=r.slice(0);s.splice(i,1,...n);let u=r[i],d=t[0].dataType===9?4:1,c=Math.ceil(k.size(s)/d),p=[{type:12,data:c},{type:6,data:u},{type:12,data:i},...L(t[0].dims,t[1].dims,s)],m=h=>{let _=O("data",t[0].dataType,t[0].dims.length,d),y=O("inputIndices",t[1].dataType,t[1].dims.length),w=U("output",t[0].dataType,s.length,d),S=v=>{let T=n.length,I=`var indicesIndices${v}  = ${y.type.indices}(0);`;for(let E=0;E<T;E++)I+=`${T>1?`indicesIndices${v}[${E}]`:`indicesIndices${v}`} = ${s.length>1?`outputIndices${v}[uniforms.axis + ${E}]`:`outputIndices${v}`};`;I+=`
          var idx${v} = ${y.getByIndices(`indicesIndices${v}`)};
          if (idx${v} < 0) {
            idx${v} = idx${v} + uniforms.axisDimLimit;
          }
          var dataIndices${v} : ${_.type.indices};
        `;for(let E=0,A=0;E<o;E++)E===i?(I+=`${o>1?`dataIndices${v}[${E}]`:`dataIndices${v}`} = u32(idx${v});`,A+=T):(I+=`${o>1?`dataIndices${v}[${E}]`:`dataIndices${v}`} = ${s.length>1?`outputIndices${v}[${A}]`:`outputIndices${v}`};`,A++);return I},$;if(t[0].dataType===9){let v=(T,I,E="")=>`
          let outputIndices${I} = ${w.offsetToIndices(`outputOffset + ${I}u`)};
          ${S(I)};
          let offset${I} = ${_.indicesToOffset(`dataIndices${I}`)};
          let index${I} = offset${I} / 4u;
          let component${I} = offset${I} % 4u;
          ${T}[${I}] = ${E}(${_.getByOffset(`index${I}`)}[component${I}]);
        `;$=`
        let outputOffset = global_idx * ${d};
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
      ${h.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(_,y,w)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:p}),getShaderSource:m}},ul=t=>ee({axis:t.axis}),dl=(t,e)=>{let r=t.inputs;lg(r),t.compute(cg(t.inputs,e))}});var pg,cl,pl,ml=V(()=>{"use strict";J();re();oe();pg=(t,e,r,n,o,i,s,u,d)=>{let c=[{type:12,data:i},{type:12,data:n},{type:12,data:o},{type:12,data:r},{type:12,data:s},{type:12,data:u},{type:12,data:d}],p=[i];c.push(...L(e.dims,p));let m=h=>{let _=O("indices_data",e.dataType,e.dims.length),y=U("input_slice_offsets_data",12,1,1),w=[_,y],S=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${h.registerUniforms(S).declareVariables(...w)}
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
  }`};return t.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:p,dataType:t.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:c}),getShaderSource:m},{inputs:[e],outputs:[-1]})[0]},cl=(t,e)=>{let r=t.inputs,n=r[0].dims,o=r[0].dataType,i=r[1].dims,s=i[i.length-1],u=k.sizeToDimension(i,i.length-1),d=k.sizeFromDimension(n,e.batchDims+s),c=k.sizeToDimension(n,e.batchDims),p=k.sizeFromDimension(n,e.batchDims),m=u/c,h=new Array(s),_=d;for(let I=0;I<s;++I)h[s-1-I]=_,_*=n[e.batchDims+s-1-I];let y=pg(t,r[1],h,e.batchDims,n,u,m,p,s),w=e.batchDims+s;if(w>n.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let S=i.slice(0,-1).concat(n.slice(w)),$=k.size(S),v=[{type:12,data:$},{type:12,data:d},...L(r[0].dims,y.dims,S)],T=I=>{let E=O("data",r[0].dataType,r[0].dims.length),A=O("slice_offsets",12,y.dims.length),D=U("output",r[0].dataType,S.length);return`
          ${I.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(E,A,D)}
            ${I.mainStart()}
            ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};t.compute({name:"GatherND",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:S,dataType:o}],dispatchGroup:{x:Math.ceil($/64)},programUniforms:v}),getShaderSource:T},{inputs:[r[0],y]})},pl=t=>({batchDims:t.batch_dims,cacheKey:""})});var mg,fg,fl,hl,gl=V(()=>{"use strict";J();re();Ie();oe();mg=(t,e)=>{if(t.length<3||t.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=k.normalizeAxis(e.quantizeAxis,t[0].dims.length),n=e.blockSize,o=t[0],i=t[2],s=t.length===4?t[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((u,d)=>d===r?Math.ceil(u/n)===i.dims[d]:u===i.dims[d]).reduce((u,d)=>u&&d,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==i.dims.length||!s.dims.map((u,d)=>u===i.dims[d]).reduce((u,d)=>u&&d,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},fg=(t,e)=>{let r=t[0].dims,n=t[1].dims,o=r.length,i=k.normalizeAxis(e.gatherAxis,o),s=k.normalizeAxis(e.quantizeAxis,o),u=r.slice(0);u.splice(i,1,...n);let d=k.size(u),c=t[2].dataType,m=t[0].dataType===22,h=[{type:12,data:d},{type:12,data:s},{type:12,data:i},{type:12,data:e.blockSize},...L(...t.map((y,w)=>y.dims),u)],_=y=>{let w=O("data",t[0].dataType,t[0].dims.length),S=O("inputIndices",t[1].dataType,t[1].dims.length),$=O("scales",t[2].dataType,t[2].dims.length),v=t.length>3?O("zeroPoint",t[3].dataType,t[3].dims.length):void 0,T=U("output",c,u.length),I=[w,S,$];v&&I.push(v);let E=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${y.registerUniforms(E).declareVariables(...I,T)}
        ${y.mainStart()}
        let output_indices = ${T.offsetToIndices("global_idx")};
        var indices_indices = ${S.type.indices}(0);
        ${n.length>1?`
          for (var i: u32 = 0; i < ${n.length}; i++) {
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
          index_from_indices += ${r[i]};
        }
        ${w.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${T.indicesGet("output_indices",`i + ${n.length} - 1`)};
          ${w.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${w.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${w.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${m?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
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
              let zero_point_vec = ${m?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Pe(c)}(quantized_data - zero_point) * scale;
        ${T.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${e.cacheKey};${t.filter((y,w)=>w!==1).map(y=>y.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:t.length},(y,w)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:c}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:h}),getShaderSource:_}},fl=(t,e)=>{let r=t.inputs;mg(r,e),t.compute(fg(t.inputs,e))},hl=t=>ee({blockSize:t.blockSize,gatherAxis:t.gatherAxis,quantizeAxis:t.quantizeAxis})});var hg,gg,bl,yl,_l=V(()=>{"use strict";J();re();Ie();oe();hg=t=>{if(!t||t.length!==2)throw new Error("GatherElements requires 2 inputs.");if(t[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(t[0].dims.length!==t[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},gg=(t,e)=>{let r=t[0].dims,n=t[0].dataType,o=r.length,i=t[1].dims,s=t[1].dataType,u=k.normalizeAxis(e.axis,o),d=r[u],c=i.slice(0),p=k.size(c),m=O("input",n,o),h=O("indicesInput",s,i.length),_=U("output",n,c.length),y=[{type:12,data:p},{type:6,data:d},{type:12,data:u}];return y.push(...L(r,i,c)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:c,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:y}),getShaderSource:$=>`
      ${$.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(m,h,_)}
      ${$.mainStart()}
      ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${_.offsetToIndices("global_idx")};

      var idx = ${h.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${m.type.indices}(outputIndices);
      ${m.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${m.getByIndices("inputIndices")};

      ${_.setByOffset("global_idx","value")};
  }`}},bl=t=>ee({axis:t.axis}),yl=(t,e)=>{let r=t.inputs;hg(r),t.compute(gg(t.inputs,e))}});var bg,yg,wl,vl,$l=V(()=>{"use strict";J();re();oe();bg=t=>{if(!t)throw new Error("Input is missing");if(t.length<2||t.length>3)throw new Error("Invaid input number.");if(t.length===3&&t[2].dims.length>2)throw new Error("Invalid input shape of C");if(t[0].dataType!==t[1].dataType||t.length===3&&t[0].dataType!==t[2].dataType)throw new Error("Input types are mismatched")},yg=(t,e)=>{let r=t[0].dims.slice(),n=t[1].dims.slice(),[o,i,s]=Vr.getShapeOfGemmResult(r,e.transA,n,e.transB,t.length===3?t[2].dims:void 0),u=[o,i];if(!u)throw new Error("Can't use gemm on the given tensors");let d=16,c=Math.ceil(i/d),p=Math.ceil(o/d),m=!0,h=k.size(u),_=[{type:12,data:m?c:h},{type:12,data:o},{type:12,data:i},{type:12,data:s},{type:1,data:e.alpha},{type:1,data:e.beta}],y=["type","type"];t.length===3&&(_.push(...L(t[2].dims)),y.push("rank")),_.push(...L(u));let w=$=>{let v="";e.transA&&e.transB?v="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":e.transA&&!e.transB?v="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!e.transA&&e.transB?v="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!e.transA&&!e.transB&&(v="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let T=e.alpha===1?"":"value *= uniforms.alpha;",I=O("a",t[0].dataType,t[0].dims),E=O("b",t[1].dataType,t[1].dims),A=I.type.value,D=null,B=[I,E];t.length===3&&(D=O("c",t[2].dataType,t[2].dims.length),B.push(D));let R=U("output",t[0].dataType,u.length);B.push(R);let x=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${$.registerUniforms(x).declareVariables(...B)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${A}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${v}
    }

    ${T}
    ${D!=null?`let cOffset = ${D.broadcastedIndicesToOffset("vec2(m, n)",R)}; value += ${A}(uniforms.beta) * ${D.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},S=$=>{let v=O("a",t[0].dataType,t[0].dims),T=O("b",t[1].dataType,t[1].dims),I=null,E=[v,T];t.length===3&&(I=O("c",t[2].dataType,t[2].dims.length),E.push(I));let A=U("output",t[0].dataType,u.length);E.push(A);let D=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],B="",R="";e.transA&&e.transB?(R=`
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
      `,B="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):e.transA&&!e.transB?(R=`
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
      `,B="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!e.transA&&e.transB?(R=`
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
      `,B="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!e.transA&&!e.transB&&(R=`
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
      `,B="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let x=e.alpha===1?"":"value *= uniforms.alpha;";return`
  ${$.registerUniforms(D).declareVariables(...E)}
  var<workgroup> tile_a: array<array<${v.type.storage}, ${d}>, ${d}>;
  var<workgroup> tile_b: array<array<${T.type.storage}, ${d}>, ${d}>;
  ${$.mainStart([d,d,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${d};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${d};
    let num_tiles = (uniforms.K - 1) / ${d} + 1;
    var k_start = 0u;
    var value = ${A.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${R}
      k_start = k_start + ${d};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${d}; k++) {
        ${B}
      }
      workgroupBarrier();
    }

    ${x}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${I!=null?`let cOffset = ${I.broadcastedIndicesToOffset("vec2(m, n)",A)}; value += ${A.type.value}(uniforms.beta) * ${I.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return m?{name:"GemmShared",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:u,dataType:t[0].dataType}],dispatchGroup:{x:c*p},programUniforms:_}),getShaderSource:S}:{name:"Gemm",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:u,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:_}),getShaderSource:w}},wl=t=>{let e=t.transA,r=t.transB,n=t.alpha,o=t.beta;return{transA:e,transB:r,alpha:n,beta:o,cacheKey:`${t.transA};${t.transB};${t.alpha===1}`}},vl=(t,e)=>{bg(t.inputs),t.compute(yg(t.inputs,e))}});var lt,St,Wt,Gt,_g,wg,vg,$g,xg,Sg,Tg,Ig,xl,Sl,Tl=V(()=>{"use strict";J();re();Ie();oe();[lt,St,Wt,Gt]=[0,1,2,3],_g=t=>{if(t[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(t[0].dims.length!==t[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(t[0].dims.length-2!==t[1].dims[t[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${t[0].dims.length-2}`);if(t[0].dims[0]!==t[1].dims[0])throw new Error("grid batch size must match input batch size")},wg=`
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
`,vg=t=>`
  fn gs_bicubic_interpolate(p: mat4x4<${t}>, x: f32, y: f32) -> ${t} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${t}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,$g=t=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${t.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,xg=t=>`
  ${t.paddingMode==="reflection"?`
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
`,Sg=(t,e,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${e} {
     var pixel = ${e}(0);
     var indices = vec4<u32>(0);
     indices[${lt}] = batch;
     indices[${St}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Wt}] = u32(r);
            indices[${Gt}] = u32(c);
          } else {
            return ${e}(0);
          }
        `;case"border":return`
          indices[${Wt}] = u32(clamp(r, 0, H - 1));
          indices[${Gt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Wt}] = gs_reflect(r, border[1], border[3]);
          indices[${Gt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${t.getByIndices("indices")};
  }
`,Tg=(t,e,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${lt}], indices[${St}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${lt}], indices[${St}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${lt}], indices[${St}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${lt}], indices[${St}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${lt}], indices[${St}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${lt}], indices[${St}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${t.setByOffset("global_idx","result")}`,Ig=(t,e)=>{let r=O("x",t[0].dataType,t[0].dims.length),n=[t[1].dims[0],t[1].dims[1],t[1].dims[2]],o=O("grid",t[1].dataType,n.length,2),i=[t[0].dims[0],t[0].dims[1],t[1].dims[1],t[1].dims[2]];e.format==="NHWC"&&(i=[t[0].dims[0],t[1].dims[1],t[1].dims[2],t[0].dims[3]],[lt,St,Wt,Gt]=[0,3,1,2]);let s=U("output",t[0].dataType,i.length),u=r.type.value,d=k.size(i),c=[{type:12,data:d},...L(t[0].dims,n,i)],p=m=>`
  ${m.registerUniform("output_size","u32").declareVariables(r,o,s)}
  ${wg}
  ${vg(u)}
  ${$g(e)}
  ${xg(e)}
  ${Sg(r,u,e)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Wt}]);
      let W_in = i32(uniforms.x_shape[${Gt}]);

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
      var grid_indices = vec3<u32>(indices[${lt}], indices[${Wt}], indices[${Gt}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Tg(s,u,e)}
  }`;return{name:"GridSample",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:["type","type"]},getRunData:m=>{let h=k.size(i);return{outputs:[{dims:i,dataType:m[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:c}},getShaderSource:p}},xl=(t,e)=>{_g(t.inputs),t.compute(Ig(t.inputs,e))},Sl=t=>ee({alignCorners:t.align_corners,mode:t.mode,paddingMode:t.padding_mode,format:t.format})});var Re,Eg,Cl,Il,kg,ar,Al,Eo=V(()=>{"use strict";J();re();Ie();qr();Yr();oe();dt();Re=(t,e)=>t.length>e&&t[e].dims.length>0?t[e]:void 0,Eg=(t,e)=>{let r=t[0],n=Re(t,1),o=Re(t,2),i=Re(t,3),s=Re(t,4),u=Re(t,5),d=Re(t,6),c=Re(t,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let p=r.dims[0],m=r.dims[1],h=r.dims.length===3?r.dims[2]:e.numHeads*r.dims[4],_=m,y=0,w=0,S=Math.floor(h/e.numHeads);if(d&&c&&k.size(d.dims)&&k.size(c.dims)){if(d.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==p||d.dims[1]!==e.numHeads||d.dims[3]!==S)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(c.dims[0]!==p||c.dims[1]!==e.numHeads||c.dims[3]!==S)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==c.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(c.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=d.dims[2],w=d.dims[2]}else if(d&&k.size(d.dims)||c&&k.size(c.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(n&&k.size(n.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(n.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,_=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==e.numHeads||n.dims[3]!==2||n.dims[4]!==S)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,_=n.dims[1]}else{if(n.dims[1]!==e.numHeads||n.dims[3]!==S)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,_=n.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==e.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(i&&k.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(n&&n.dims.length===5&&n.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let v=y+_,T=0;if(s&&k.size(s.dims)>0){T=8;let D=s.dims;throw D.length===1?D[0]===p?T=1:D[0]===3*p+2&&(T=3):D.length===2&&D[0]===p&&D[1]===v&&(T=5),T===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let I=!1,E=h;if(o&&k.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(_!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');E=o.dims[2]}else{if(_!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');E=o.dims[1]*o.dims[3],I=!0}}let A=!1;if(s&&k.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(u&&k.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==p||u.dims[1]!==e.numHeads||u.dims[2]!==m||u.dims[3]!==v)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:p,sequenceLength:m,pastSequenceLength:y,kvSequenceLength:_,totalSequenceLength:v,maxSequenceLength:w,inputHiddenSize:0,hiddenSize:h,vHiddenSize:E,headSize:S,vHeadSize:Math.floor(E/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:T,scale:e.scale,broadcastResPosBias:A,passPastInKv:I,qkvFormat:$}},Cl=t=>ee({...t}),Il=ee({perm:[0,2,1,3]}),kg=(t,e,r,n,o,i,s)=>{let u=[n,o,i],d=k.size(u),c=[{type:12,data:d},{type:12,data:s},{type:12,data:i}],p=m=>{let h=U("qkv_with_bias",e.dataType,u),_=O("qkv",e.dataType,u),y=O("bias",r.dataType,u),w=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${m.registerUniforms(w).declareVariables(_,y,h)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return t.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:e.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:p},{inputs:[e,r],outputs:[-1]})[0]},ar=(t,e,r,n,o,i,s,u)=>{let d=i;if(s&&k.size(s.dims)>0){if(n===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return d=kg(t,i,s,e,n,r*o,u),d=d.reshape([e,n,r,o]),r===1||n===1?d:t.compute(ze(d,Il.perm),{inputs:[d],outputs:[-1]})[0]}else return i.dims.length===3&&(d=i.reshape([e,n,r,o])),r===1||n===1?d:t.compute(ze(d,Il.perm),{inputs:[d],outputs:[-1]})[0]},Al=(t,e)=>{let r=Eg(t.inputs,e),n=t.inputs[0],o=Re(t.inputs,1),i=Re(t.inputs,2),s=Re(t.inputs,3),u=Re(t.inputs,4),d=Re(t.inputs,5),c=Re(t.inputs,6),p=Re(t.inputs,7);if(n.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let m=o&&i&&o.dims.length===4&&i.dims.length===4,h=ar(t,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,s,0);if(m)return Lt(t,h,o,i,u,void 0,c,p,d,r);if(!o||!i)throw new Error("key and value must be provided");let _=ar(t,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,s,r.hiddenSize),y=ar(t,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,s,2*r.hiddenSize);Lt(t,h,_,y,u,void 0,c,p,d,r)}});var Pg,zg,Og,Dg,ko,El,kl,Po=V(()=>{"use strict";J();re();Ie();oe();Pg=t=>{if(!t||t.length<1)throw new Error("too few inputs")},zg=(t,e)=>{let r=[],n=e.numOutputs;return t[1].dims[0]>0&&(t[1].getBigInt64Array().forEach(o=>r.push(Number(o))),n=r.length),ee({numOutputs:n,axis:e.axis,splitSizes:r})},Og=t=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${t}u; i += 1u ) {
    if (index < ${F("uniforms.size_in_split_axis","i",t)}) {
        return i;
    }
    }
    return ${t}u;
}`,Dg=t=>{let e=t.length,r=[];for(let n=0;n<e;++n){let o=t[n].setByIndices("indices","input[global_idx]");e===1?r.push(o):n===0?r.push(`if (output_number == ${n}u) { ${o} }`):n===e-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${n}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${t[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},ko=(t,e)=>{let r=t[0].dims,n=k.size(r),o=t[0].dataType,i=k.normalizeAxis(e.axis,r.length),s=new Array(e.numOutputs),u=O("input",o,r.length),d=new Array(e.numOutputs),c=[],p=[],m=0,h=[{type:12,data:n}];for(let y=0;y<e.numOutputs;y++){m+=e.splitSizes[y],d[y]=m;let w=r.slice();w[i]=e.splitSizes[y],p.push(w),s[y]=U(`output${y}`,o,w.length),c.push({dims:p[y],dataType:t[0].dataType})}h.push({type:12,data:d},...L(r,...p));let _=y=>`
  ${y.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",d.length).declareVariables(u,...s)}
  ${Og(d.length)}
  ${Dg(s)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${F("uniforms.size_in_split_axis","output_number - 1u",d.length)};
      ${u.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:e.cacheKey,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:c,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:h})}},El=(t,e)=>{Pg(t.inputs);let r=t.inputs.length===1?e:zg(t.inputs,e);t.compute(ko(t.inputs,r),{inputs:[0]})},kl=t=>{let e=t.axis,r=t.splitSizes,n=t.numOutputs<0?r.length:t.numOutputs;if(n!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return ee({axis:e,numOutputs:n,splitSizes:r})}});var Bg,un,Pl,zo=V(()=>{"use strict";J();re();Ie();oe();Bg=(t,e)=>{let[r,n,o,i]=t,{numHeads:s,rotaryEmbeddingDim:u}=e;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!k.areEqual(n.dims,[])&&!k.areEqual(n.dims,[1])&&n.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!k.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let d=r.dims[0],c=r.dims[r.dims.length-2],p=o.dims[0],m=k.sizeFromDimension(r.dims,1)/c,h=u===0?o.dims[1]*2:m/s;if(u>h)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(n.dims.length===2){if(d!==n.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(c!==n.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(h/2!==o.dims[1]&&u/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(c>p)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},un=(t,e)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:o,scale:i}=e,s=t[0].dims[0],u=k.sizeFromDimension(t[0].dims,1),d=t[0].dims[t[0].dims.length-2],c=u/d,p=t[2].dims[1],m=o===0?p*2:c/n,h=new Array(s,d,c/m,m-p),_=k.computeStrides(h),y=[{type:1,data:i},{type:12,data:h},{type:12,data:_},...t[0].dims.length===3?new Array({type:12,data:[u,c,m,1]}):[],...t[0].dims.length===4?new Array({type:12,data:[u,m,d*m,1]}):[],...L(t[0].dims,t[1].dims,t[2].dims,t[3].dims,t[0].dims)],w=S=>{let $=O("input",t[0].dataType,t[0].dims.length),v=O("position_ids",t[1].dataType,t[1].dims.length),T=O("cos_cache",t[2].dataType,t[2].dims.length),I=O("sin_cache",t[3].dataType,t[3].dims.length),E=U("output",t[0].dataType,t[0].dims.length);return S.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:_.length},{name:"input_output_strides",type:"u32",length:_.length}]),`
        ${S.declareVariables($,v,T,I,E)}

        ${S.mainStart(Ot)}
          let half_rotary_emb_dim = uniforms.${T.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${v.broadcastedIndicesToOffset("bsnh.xy",U("",v.type.tensor,2))};
            let position_id =
                u32(${v.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${$.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} -
                ${$.getByOffset("j")} * ${I.get("position_id","bsnh[3]")};
            ${E.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${I.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${E.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${E.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:ee({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:t[0].dims,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(h)/Ot)},programUniforms:y})}},Pl=(t,e)=>{Bg(t.inputs,e),t.compute(un(t.inputs,e))}});var Mg,Rg,zl,Ug,Ol,Dl=V(()=>{"use strict";Ie();J();Yr();Eo();Po();dt();zo();oe();Mg=(t,e)=>{if(e.doRotary&&t.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=t[0],n=t[1],o=t[2],i=t[3],s=t[4];if(e.doRotary!==0&&t.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(e.localWindowSize!==-1)throw new Error("Local attention is not supported");if(e.softcap!==0)throw new Error("Softcap is not supported");if(e.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(e.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,d=r.dims[0],c=r.dims[1],p=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:e.numHeads*r.dims[4],m=c,h=0,_=!n||n.dims.length===0,y=Math.floor(_?p/(e.numHeads+2*e.kvNumHeads):p/e.numHeads);_&&(p=y*e.numHeads);let w=i&&i.dims.length!==0,S=s&&s.dims.length!==0;if(w&&i.dims.length===4&&i.dims[0]===d&&i.dims[1]!==e.kvNumHeads&&i.dims[2]===e.kvNumHeads&&i.dims[3]===y)throw new Error("BSNH pastKey/pastValue is not supported");if(w&&S){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');h=i.dims[2]}else if(w||S)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(n&&n.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(r.dims[2]%n.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');m=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==e.numHeads||n.dims[3]!==2||n.dims[4]!==y)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');m=n.dims[1]}else{if(n.dims[1]!==e.numHeads||n.dims[3]!==y)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');m=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==e.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let T=0,I=!1,E=e.kvNumHeads?y*e.kvNumHeads:p;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(m!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');E=o.dims[2]}else{if(m!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');E=o.dims[1]*o.dims[3],I=!0}}let A=t.length>4?t[5]:void 0;if(A&&A.dims.length!==1&&A.dims[0]!==d)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:d,sequenceLength:c,pastSequenceLength:h,kvSequenceLength:m,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:p,vHiddenSize:E,headSize:y,vHeadSize:Math.floor(E/e.kvNumHeads),numHeads:e.numHeads,kvNumHeads:e.kvNumHeads,nReps:e.numHeads/e.kvNumHeads,pastPresentShareBuffer:!1,maskType:T,scale:e.scale,broadcastResPosBias:!1,passPastInKv:I,qkvFormat:v}},Rg=ee({perm:[0,2,1,3]}),zl=(t,e,r)=>{let n=e,o=r.kvNumHeads;return e.dims.length===3&&r.kvSequenceLength!==0&&(n=e.reshape([r.batchSize,r.kvSequenceLength,o,r.headSize]),n=t.compute(ze(n,Rg.perm),{inputs:[n],outputs:[-1]})[0]),n},Ug=(t,e,r,n)=>{let o=7,i=["type","type"],s=[t*e],u=t*e,d=[{type:12,data:u},{type:12,data:e},{type:12,data:t}],c=p=>{let m=O("seq_lens",r.dataType,r.dims),h=O("total_seq_lens",n.dataType,n.dims),_=U("pos_ids",o,s),y=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${p.registerUniforms(y).declareVariables(m,h,_)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${h.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${m.getByOffset("batch_idx")};
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
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${t};${e}`,inputDependencies:i},getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:c}},Ol=(t,e)=>{let r=Mg(t.inputs,e);if(t.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(t.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let n=t.inputs[0],o=t.inputs[1]&&t.inputs[1].dims.length>0?t.inputs[1]:void 0,i=t.inputs[2]&&t.inputs[2].dims.length>0?t.inputs[2]:void 0,s=t.inputs[3]&&t.inputs[3].dims.length!==0?t.inputs[3]:void 0,u=t.inputs[4]&&t.inputs[4].dims.length!==0?t.inputs[4]:void 0,d=t.inputs.length>4?t.inputs[5]:void 0,c=t.inputs.length>5?t.inputs[6]:void 0,p=r.kvNumHeads?r.kvNumHeads:r.numHeads,m=ee({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,p*r.headSize,p*r.headSize]}),[h,_,y]=!o&&!i?t.compute(ko([n],m),{inputs:[n],outputs:[-1,-1,-1]}):[n,o,i],w,S;if(e.doRotary){let I=t.compute(Ug(r.batchSize,r.sequenceLength,d,c),{inputs:[d,c],outputs:[-1]})[0],E=t.inputs[7],A=t.inputs[8],D=ee({interleaved:e.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:e.scale}),B=[h,I,E,A],R=[-1];w=t.compute(un(B,D),{inputs:B,outputs:R})[0],B.splice(0,1,_);let x=ee({interleaved:e.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:e.scale});S=t.compute(un(B,x),{inputs:B,outputs:R})[0]}let $=ar(t,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,e.doRotary?w:h,void 0,0),v=zl(t,e.doRotary?S:_,r),T=zl(t,y,r);Lt(t,$,v,T,void 0,void 0,s,u,void 0,r,d,c)}});var Bl,Ng,Vg,Ml,Rl=V(()=>{"use strict";J();re();dt();oe();Bl=(t,e,r,n,o,i,s,u)=>{let d=fe(i),c=d===1?"f32":`vec${d}f`,p=d===1?"vec2f":`mat2x${d}f`,m=o*s,h=64;m===1&&(h=256);let _=[o,s,i/d],y=[o,s,2],w=["rank","type","type"],S=[];S.push(...L(_,y));let $=v=>{let T=O("x",e.dataType,3,d),I=O("scale",r.dataType,r.dims),E=O("bias",n.dataType,n.dims),A=U("output",1,3,2),D=[T,I,E,A];return`
  var<workgroup> workgroup_shared : array<${p}, ${h}>;
  const workgroup_size = ${h}u;
  ${v.declareVariables(...D)}
  ${v.mainStart(h)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${c}(0);
    var squared_sum = ${c}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${c}(${T.get("batch","channel","h")});
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
      let sum_final = ${Ke("workgroup_shared[0][0]",d)} / f32(hight * ${d});
      let squared_sum_final = ${Ke("workgroup_shared[0][1]",d)} / f32(hight * ${d});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return t.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${d};${u};${h}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:y,dataType:1}],dispatchGroup:{x:m},programUniforms:S}),getShaderSource:$},{inputs:[e,r,n],outputs:[-1]})[0]},Ng=(t,e,r)=>{let n=e[0].dims,o=n,i=2,s=n[0],u=n[1],d=k.sizeFromDimension(n,i),c=fe(d),p=k.size(o)/c,m=Bl(t,e[0],e[1],e[2],s,d,u,r.epsilon),h=[s,u,d/c],_=[s,u],y=["type","none"],w=S=>{let $=O("x",e[0].dataType,h.length,c),v=O("scale_shift",1,_.length,2),T=U("output",e[0].dataType,h.length,c),I=[$,v,T];return`
  ${S.registerUniform("output_size","u32").declareVariables(...I)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${T.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${v.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${T.type.value}(scale_shift.x) + ${T.type.value}(scale_shift.y);
      ${T.setByOffset("global_idx","value")};
  }`};t.compute({name:"InstanceNormalization",shaderCache:{hint:`${c}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},...L(h,_,h)]}),getShaderSource:w},{inputs:[e[0],m]})},Vg=(t,e,r)=>{let n=e[0].dims,o=n,i=n[0],s=n[n.length-1],u=k.sizeFromDimension(n,1)/s,d=fe(s),c=k.size(o)/d,p=[{type:12,data:u},{type:12,data:Math.floor(s/d)}],m=["type","type"],h=!1,_=[0,n.length-1];for(let $=0;$<n.length-2;$++)h=h||n[$+1]!==1,_.push($+1);h=h&&n[n.length-1]!==1;let y=h?t.compute(ze(t.inputs[0],_),{inputs:[t.inputs[0]],outputs:[-1]})[0]:t.inputs[0].reshape(Array.from({length:n.length},($,v)=>n[_[v]])),w=Bl(t,y,e[1],e[2],i,u,s,r.epsilon),S=$=>{let v=we(e[0].dataType),T=d===1?"vec2f":`mat${d}x2f`,I=D=>{let B=D===0?"x":"y",R=d===1?"f32":`vec${d}f`;switch(d){case 1:return`${v}(${R}(scale.${B}))`;case 2:return`vec2<${v}>(${R}(scale[0].${B}, scale[1].${B}))`;case 4:return`vec4<${v}>(${R}(scale[0].${B}, scale[1].${B}, scale[2].${B}, scale[3].${B}))`;default:throw new Error(`Not supported compoents ${d}`)}},E=O("input",e[0].dataType,e[0].dims,d),A=U("output",e[0].dataType,o,d);return`
  @group(0) @binding(0) var<storage, read> input : array<${E.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${T}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${A.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${$.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${I(0)}, ${I(1)});
  }`};t.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${d}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:p}),getShaderSource:S},{inputs:[e[0],w]})},Ml=(t,e)=>{e.format==="NHWC"?Vg(t,t.inputs,e):Ng(t,t.inputs,e)}});var Lg,Wg,Ul,Nl=V(()=>{"use strict";J();re();oe();Lg=t=>{if(!t||t.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Wg=(t,e,r)=>{let n=e.simplified,o=t[0].dims,i=t[1],s=!n&&t[2],u=o,d=k.normalizeAxis(e.axis,o.length),c=k.sizeToDimension(o,d),p=k.sizeFromDimension(o,d),m=k.size(i.dims),h=s?k.size(s.dims):0;if(m!==p||s&&h!==p)throw new Error(`Size of X.shape()[axis:] == ${p}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${m} and bias size of ${h}`);let _=[];for(let E=0;E<o.length;++E)E<d?_.push(o[E]):_.push(1);let y=fe(p),w=["type","type"],S=[{type:12,data:c},{type:1,data:p},{type:12,data:Math.floor(p/y)},{type:1,data:e.epsilon}];s&&w.push("type");let $=r>1,v=r>2,T=E=>{let A=we(t[0].dataType),D=[O("x",t[0].dataType,t[0].dims,y),O("scale",i.dataType,i.dims,y)];s&&D.push(O("bias",s.dataType,s.dims,y)),D.push(U("output",t[0].dataType,u,y)),$&&D.push(U("mean_data_output",1,_)),v&&D.push(U("inv_std_output",1,_));let B=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${E.registerUniforms(B).declareVariables(...D)}
  ${E.mainStart()}
    ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${fo("f32",y)};
    var mean_square_vector = ${fo("f32",y)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Dt(A,y,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Ke("mean_vector",y)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Ke("mean_square_vector",y)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Dt(A,y,"x[j + offset]")};
      let f32scale = ${Dt(A,y,"scale[j]")};
      output[j + offset] = ${D[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Dt(A,y,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${v?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},I=[{dims:u,dataType:t[0].dataType}];return $&&I.push({dims:_,dataType:1}),v&&I.push({dims:_,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${y};${r};${n}`,inputDependencies:w},getRunData:()=>({outputs:I,dispatchGroup:{x:Math.ceil(c/64)},programUniforms:S}),getShaderSource:T}},Ul=(t,e)=>{Lg(t.inputs),t.compute(Wg(t.inputs,e,t.outputCount))}});var Gg,Vl,Ll=V(()=>{"use strict";re();nn();on();Gg=t=>{if(!t||t.length!==2)throw new Error("MatMul requires 2 inputs.");if(t[0].dims[t[0].dims.length-1]!==t[1].dims[t[1].dims.length-2])throw new Error("shared dimension does not match.")},Vl=t=>{Gg(t.inputs);let e=rt.calcShape(t.inputs[0].dims,t.inputs[1].dims,!0);if(!e)throw new Error("Can't use matmul on the given tensors");let r=e[e.length-1],n=t.inputs[0].dims[t.inputs[0].dims.length-1];if(r<8&&n<8)t.compute(rn(t.inputs,{activation:""},e));else{let o=e[e.length-2],i=k.size(t.inputs[0].dims.slice(0,-2)),s=k.size(t.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&s===1){let u=t.inputs[0].reshape([1,i,n]),d=t.inputs[1].reshape([1,n,r]),c=[1,i,r],p=[u,d];t.compute(ir(p,{activation:""},e,c),{inputs:p})}else t.compute(ir(t.inputs,{activation:""},e))}}});var Hg,Fg,qg,Wl,Gl,Hl=V(()=>{"use strict";J();re();Ie();oe();Hg=(t,e)=>{if(t.length<3||t.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=t[0],n=r.dims.length;if(r.dims[n-1]!==e.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((e.k+e.blockSize-1)/e.blockSize),i=e.blockSize/8*e.bits,s=t[1];if(!k.areEqual(s.dims,[e.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let d=t[2].dims;if(k.size(d)!==e.n*o)throw new Error("scales input size error.");if(t.length===4){let p=t[3].dims,m=e.n*(e.bits===8?o:Math.floor((o*e.bits+7)/8));if(k.size(p)!==m)throw new Error("zeroPoints input size error.")}},Fg=(t,e)=>{let r=t[0].dims,n=r.length,o=r[n-2],i=e.k,s=e.n,u=r.slice(0,n-2),d=k.size(u),p=t[1].dims[2]/4,m=t[0].dataType,h=fe(e.k),_=fe(p),y=fe(s),w=u.concat([o,s]),S=o>1&&s/y%2===0?2:1,$=k.size(w)/y/S,v=64,T=[],I=[d,o,i/h],E=k.convertShape(t[1].dims).slice();E.splice(-1,1,p/_),T.push(...L(I)),T.push(...L(E)),T.push(...L(t[2].dims)),t.length===4&&T.push(...L(k.convertShape(t[3].dims)));let A=[d,o,s/y];T.push(...L(A));let D=B=>{let R=I.length,x=O("a",t[0].dataType,R,h),q=O("b",12,E.length,_),j=O("scales",t[2].dataType,t[2].dims.length),Z=[x,q,j],W=t.length===4?O("zero_points",12,t[3].dims.length):void 0;W&&Z.push(W);let le=A.length,Y=U("output",t[0].dataType,le,y),z=we(t[0].dataType),K=(()=>{switch(h){case 1:return`array<${z}, 8>`;case 2:return`mat4x2<${z}>`;case 4:return`mat2x4<${z}>`;default:throw new Error(`${h}-component is not supported.`)}})(),Q=()=>{let xe=`
          // reuse a data
            var input_offset = ${x.indicesToOffset(`${x.type.indices}(batch, row, word_offset)`)};
            var a_data: ${K};
            for (var j: u32 = 0; j < ${8/h}; j++) {
              a_data[j] = ${x.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let te=0;te<y*S;te++)xe+=`
            b_value = ${_===1?`b${te}_data`:`b${te}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${K}(${Array.from({length:4},(N,X)=>`${z}(b_value_lower[${X}]), ${z}(b_value_upper[${X}])`).join(", ")});
            b_dequantized_values = ${h===1?`${K}(${Array.from({length:8},(N,X)=>`(b_quantized_values[${X}] - ${W?`zero_point${te}`:"zero_point"}) * scale${te}`).join(", ")});`:`(b_quantized_values - ${K}(${Array(8).fill(`${W?`zero_point${te}`:"zero_point"}`).join(",")})) * scale${te};`};
            workgroup_shared[local_id.x * ${S} + ${Math.floor(te/y)}]${y>1?`[${te%y}]`:""} += ${Array.from({length:8/h},(N,X)=>`${h===1?`a_data[${X}] * b_dequantized_values[${X}]`:`dot(a_data[${X}], b_dequantized_values[${X}])`}`).join(" + ")};
          `;return xe},ie=()=>{let xe=`
            var col_index = col * ${y};
            ${W?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${z}(8);`}
            `;for(let te=0;te<y*S;te++)xe+=`
            let scale${te} = ${j.getByOffset("col_index * nBlocksPerCol + block")};
            ${W?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${W.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${te} = ${z}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return xe},Te=()=>{let xe=`col_index = col * ${y};`;for(let te=0;te<y*S;te++)xe+=`
            let b${te}_data = ${q.getByIndices(`${q.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return xe+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${K};
            var b_dequantized_values: ${K};`,xe};return`
        var<workgroup> workgroup_shared: array<${Y.type.value}, ${S*v}>;
        ${B.declareVariables(...Z,Y)}
        ${B.mainStart([v,1,1])}
          let output_indices = ${Y.offsetToIndices(`(global_idx / ${v}) * ${S}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${e.blockSize/h};
            ${ie()}
            for (var word: u32 = 0; word < ${p}; word += ${_}) {
              ${Te()}
              for (var i: u32 = 0; i < ${_}; i++) {
                ${Q()}
                word_offset += ${8/h};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${S}) {
            var output_value: ${Y.type.value} = ${Y.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${S};
            }
            ${Y.setByIndices(`${Y.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${e.blockSize};${e.bits};${h};${_};${y};${S};${v}`,inputDependencies:Array(t.length).fill("rank")},getRunData:()=>({outputs:[{dims:w,dataType:m}],dispatchGroup:{x:$},programUniforms:T}),getShaderSource:D}},qg=(t,e)=>{let r=t[0].dims,n=r.length,o=r[n-2],i=e.k,s=e.n,u=r.slice(0,n-2),d=k.size(u),p=t[1].dims[2]/4,m=t[0].dataType,h=fe(e.k),_=fe(p),y=u.concat([o,s]),w=128,S=s%8===0?8:s%4===0?4:1,$=w/S,v=$*_*8,T=v/h,I=v/e.blockSize,E=k.size(y)/S,A=[],D=[d,o,i/h],B=k.convertShape(t[1].dims).slice();B.splice(-1,1,p/_),A.push(...L(D)),A.push(...L(B)),A.push(...L(t[2].dims)),t.length===4&&A.push(...L(k.convertShape(t[3].dims)));let R=[d,o,s];A.push(...L(R));let x=q=>{let j=D.length,Z=O("a",t[0].dataType,j,h),W=O("b",12,B.length,_),le=O("scales",t[2].dataType,t[2].dims.length),Y=[Z,W,le],z=t.length===4?O("zero_points",12,t[3].dims.length):void 0;z&&Y.push(z);let K=R.length,Q=U("output",t[0].dataType,K),ie=we(t[0].dataType),Te=()=>{switch(h){case 1:return`
          let a_data0 = vec4<${ie}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ie}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${ie}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ie}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${h}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${Z.type.value}, ${T}>;
        var<workgroup> inter_results: array<array<${Q.type.value}, ${$}>, ${S}>;
        ${q.declareVariables(...Y,Q)}
        ${q.mainStart([$,S,1])}
          let output_indices = ${Q.offsetToIndices(`workgroup_index * ${S}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${I} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${T};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${T}; a_offset += ${w})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${Z.getByIndices(`${Z.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${Z.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${I} + local_id.x;
            ${z?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${z.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${ie}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${ie}(8);`}
            let scale = ${le.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${W.getByIndices(`${W.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${e.blockSize/h};
            for (var i: u32 = 0; i < ${_}; i++) {
              ${Te()}
              let b_value = ${_===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${ie}>(${Array.from({length:4},(xe,te)=>`${ie}(b_value_lower[${te}]), ${ie}(b_value_upper[${te}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${ie}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(xe,te)=>`${`dot(a_data${te}, b_dequantized_values[${te}])`}`).join(" + ")};
              word_offset += ${8/h};
            }
            workgroupBarrier();
          }

          if (local_idx < ${S}) {
            var output_value: ${Q.type.value} = ${Q.type.value}(0);
            for (var b = 0u; b < ${$}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${Q.setByIndices(`${Q.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${e.blockSize};${h};${_};${$};${S}`,inputDependencies:Array(t.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:m}],dispatchGroup:{x:E},programUniforms:A}),getShaderSource:x}},Wl=(t,e)=>{Hg(t.inputs,e),e.blockSize===32&&t.adapterInfo.isVendor("intel")&&t.adapterInfo.isArchitecture("gen-12lp")?t.compute(qg(t.inputs,e)):t.compute(Fg(t.inputs,e))},Gl=t=>ee(t)});var Kg,jg,Zg,Qg,Yg,Xg,Jg,eb,Fl,ql=V(()=>{"use strict";J();re();oe();Kg=t=>{if(!t||t.length<1)throw new Error("Too few inputs");if(t[0].dataType!==1&&t[0].dataType!==10)throw new Error("Input type must be float or float16.");if(t.length>=2){let e=t[0].dims.length*2===t[1].dims[0];if(t.length===4&&(e=t[3].dims[0]*2===t[1].dims[0]),!e)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},jg=(t,e,r)=>{let n="";for(let o=e-1;o>=0;--o)n+=`
            k = i32(${t.indicesGet("indices",o)}) - ${F("uniforms.pads",o,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${F("uniforms.x_shape",o,e)})) {
              break;
            }
            offset += k * i32(${F("uniforms.x_strides",o,e)});
        `;return`
          value = ${t.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${n}
            value = x[offset];
          }
      `},Zg=(t,e,r)=>{let n="";for(let o=e-1;o>=0;--o)n+=`
                k = i32(${t.indicesGet("indices",o)}) - ${F("uniforms.pads",o,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${F("uniforms.x_shape",o,e)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${F("uniforms.x_shape",o,e)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${F("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},Qg=(t,e,r)=>{let n="";for(let o=e-1;o>=0;--o)n+=`
                k = i32(${t.indicesGet("indices",o)}) - ${F("uniforms.pads",o,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${F("uniforms.x_shape",o,e)})) {
                  k = i32(${F("uniforms.x_shape",o,e)}) - 1;
                }
                offset += k * i32(${F("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},Yg=(t,e,r)=>{let n="";for(let o=e-1;o>=0;--o)n+=`
                k = i32(${t.indicesGet("indices",o)}) - ${F("uniforms.pads",o,r)};
                if (k < 0)  {
                  k += i32(${F("uniforms.x_shape",o,e)}]);
                }
                if (k >= i32(${F("uniforms.x_shape",o,e)})) {
                  k -= i32(${F("uniforms.x_shape",o,e)});
                }
                offset += k * i32(${F("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},Xg=(t,e,r)=>{switch(r.mode){case 0:return jg(t,e,r.pads.length);case 1:return Zg(t,e,r.pads.length);case 2:return Qg(t,e,r.pads.length);case 3:return Yg(t,e,r.pads.length);default:throw new Error("Invalid mode")}},Jg=(t,e)=>{let r=k.padShape(t[0].dims.slice(),e.pads),n=t[0].dims,o=k.size(r),i=[{type:12,data:o},{type:6,data:e.pads}],s=t.length>=3&&t[2].data;e.mode===0&&i.push({type:s?t[2].dataType:1,data:e.value}),i.push(...L(t[0].dims,r));let u=["rank"],d=c=>{let p=U("output",t[0].dataType,r.length),m=O("x",t[0].dataType,n.length),h=m.type.value,_=Xg(p,n.length,e),y=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:e.pads.length}];return e.mode===0&&y.push({name:"constant_value",type:s?h:"f32"}),`
            ${c.registerUniforms(y).declareVariables(m,p)}
            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${p.offsetToIndices("global_idx")};

            var value = ${h}(0);
            ${_}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${e.mode}${s}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(r)/64)},programUniforms:i}),getShaderSource:d}},eb=(t,e)=>{if(t.length>1){let r=t[1].getBigInt64Array(),n=t.length>=3&&t[2].data?t[2].dataType===10?t[2].getUint16Array()[0]:t[2].getFloat32Array()[0]:0,o=t[0].dims.length,i=new Int32Array(2*o).fill(0);if(t.length>=4){let u=t[3].getBigInt64Array();for(let d=0;d<u.length;d++)i[Number(u[d])]=Number(r[d]),i[Number(u[d])+o]=Number(r[d+u.length])}else r.forEach((u,d)=>i[Number(d)]=Number(u));let s=[];return i.forEach(u=>s.push(u)),{mode:e.mode,value:n,pads:s}}else return e},Fl=(t,e)=>{Kg(t.inputs);let r=eb(t.inputs,e);t.compute(Jg(t.inputs,r),{inputs:[0]})}});var dn,Kl,jl,Zl,Ql,tb,rb,Yl,Xl,Jl,ec,tc,rc,nc,oc,ic,ac,sc,uc,dc=V(()=>{"use strict";Ne();J();re();oe();dn=t=>{if(_e.webgpu.validateInputContent&&(!t||t.length!==1))throw new Error("Pool ops requires 1 input.")},Kl=(t,e,r)=>{let n=e.format==="NHWC",o=t.dims.slice();n&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(e,"dilations"),s=e.kernelShape.slice(),u=e.strides.slice(),d=i?e.dilations.slice():[],c=e.pads.slice();zt.adjustPoolAttributes(r,o,s,u,d,c);let p=zt.computePoolOutputShape(r,o,u,d,s,c,e.autoPad),m=Object.assign({},e);i?Object.assign(m,{kernelShape:s,strides:u,pads:c,dilations:d,cacheKey:e.cacheKey}):Object.assign(m,{kernelShape:s,strides:u,pads:c,cacheKey:e.cacheKey});let h=p.slice();return h.push(h.splice(1,1)[0]),[m,n?h:p]},jl=(t,e)=>{let r=e.format==="NHWC",n=k.size(t),o=k.size(e.kernelShape),i=[{type:12,data:n},{type:12,data:o}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(e.kernelShape.length<=2){let u=e.kernelShape[e.kernelShape.length-1],d=e.strides[e.strides.length-1],c=e.pads[e.pads.length/2-1],p=e.pads[e.pads.length-1],m=!!(c+p);i.push({type:12,data:u},{type:12,data:d},{type:12,data:c},{type:12,data:p}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let h=!1;if(e.kernelShape.length===2){let _=e.kernelShape[e.kernelShape.length-2],y=e.strides[e.strides.length-2],w=e.pads[e.pads.length/2-2],S=e.pads[e.pads.length-2];h=!!(w+S),i.push({type:12,data:_},{type:12,data:y},{type:12,data:w},{type:12,data:S}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,s,!0,m,h]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=k.computeStrides(e.kernelShape);i.push({type:12,data:u},{type:12,data:e.pads},{type:12,data:e.strides}),s.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:e.pads.length},{name:"strides",type:"u32",length:e.strides.length});let d=e.pads.reduce((c,p)=>c+p);return[i,s,!!d,!1,!1]}},Zl=(t,e,r,n,o,i,s,u,d,c,p,m)=>{let h=o.format==="NHWC",_=e.type.value,y=U("output",e.type.tensor,n);if(o.kernelShape.length<=2){let w="",S="",$="",v=r-(h?2:1);if(p?w=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${v}] < 0 || xIndices[${v}]
                      >= uniforms.x_shape[${v}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`:w=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let I=r-(h?3:2);m?S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${I}] < 0 || xIndices[${I}] >= uniforms.x_shape[${I}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
                `,$=`
              }
            `}return`
            ${t.registerUniforms(d).declareVariables(e,y)}

            ${t.mainStart()}
              ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var value = ${_}(${u});
              var pad = 0;
              ${S}
              ${w}
              ${$}
              ${s}

              output[global_idx] = value;
            }`}else{if(h)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let w=o.kernelShape.length,S=o.pads.length,$="";return c?$=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${e.indicesToOffset("xIndices")}];
                ${i}
              }`:$=`
              }
              let x_val = x[${e.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${t.registerUniforms(d).declareVariables(e,y)}

            ${t.mainStart()}
              ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var offsets: array<u32, ${w}>;

              var value = ${_}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${w-1}u; j++) {
                  offsets[j] = offset / ${F("uniforms.kernelStrides","j",w)};
                  offset -= offsets[j] * ${F("uniforms.kernelStrides","j",w)};
                }
                offsets[${w-1}] = offset;

                isPad = false;
                for (var j = ${r-w}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${F("uniforms.strides",`j - ${r-w}u`,w)}
                    + offsets[j - ${r-w}u] - ${F("uniforms.pads","j - 2u",S)};
                  ${$}
              }
              ${s}

              output[global_idx] = value;
            }`}},Ql=t=>`${t.format};${t.ceilMode};${t.autoPad};${t.kernelShape.length}`,tb=t=>`${Ql(t)};${t.countIncludePad}`,rb=t=>`${Ql(t)};${t.storageOrder};${t.dilations}`,Yl=t=>({format:t.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][t.auto_pad],ceilMode:t.ceil_mode,kernelShape:t.kernel_shape,strides:t.strides,pads:t.pads}),Xl=(t,e,r,n)=>{let[o,i]=Kl(e,n,r),s=O("x",e.dataType,e.dims.length),u=s.type.value,d="value += x_val;",c="";o.countIncludePad?c+=`value /= ${u}(uniforms.kernelSize);`:c+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[p,m,h,_,y]=jl(i,o);p.push(...L(e.dims,i));let w=["rank"];return{name:t,shaderCache:{hint:`${n.cacheKey};${h};${_};${y}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:p}),getShaderSource:S=>Zl(S,s,e.dims.length,i.length,o,d,c,0,m,h,_,y)}},Jl=t=>{let e=t.count_include_pad!==0,r=Yl(t);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:e,...r,cacheKey:""};return{...n,cacheKey:tb(n)}},ec=(t,e)=>{dn(t.inputs),t.compute(Xl("AveragePool",t.inputs[0],!1,e))},tc={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},rc=t=>{let e=t.format;return{format:e,...tc,cacheKey:e}},nc=(t,e)=>{dn(t.inputs),t.compute(Xl("GlobalAveragePool",t.inputs[0],!0,e))},oc=(t,e,r,n)=>{let[o,i]=Kl(e,n,r),s=`
      value = max(x_val, value);
    `,u="",d=O("x",e.dataType,e.dims.length),c=["rank"],[p,m,h,_,y]=jl(i,o);return p.push(...L(e.dims,i)),{name:t,shaderCache:{hint:`${n.cacheKey};${h};${_};${y}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:p}),getShaderSource:w=>Zl(w,d,e.dims.length,i.length,o,s,u,e.dataType===10?-65504:-1e5,m,h,_,y)}},ic=(t,e)=>{dn(t.inputs),t.compute(oc("MaxPool",t.inputs[0],!1,e))},ac=t=>{let e=t.storage_order,r=t.dilations,n=Yl(t);if(e!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:e,dilations:r,...n,cacheKey:""};return{...o,cacheKey:rb(o)}},sc=t=>{let e=t.format;return{format:e,...tc,cacheKey:e}},uc=(t,e)=>{dn(t.inputs),t.compute(oc("GlobalMaxPool",t.inputs[0],!0,e))}});var ob,ib,lc,cc,pc=V(()=>{"use strict";J();re();Ie();oe();ob=(t,e)=>{if(t.length<2||t.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(t.length===3&&t[1].dims===t[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(t.length===3&&t[0].dataType!==t[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(t[0].dataType===6&&t.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(t[1].dims.length!==0&&t[1].dims.length!==1&&t[1].dims.length!==t[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(t.length>2){if(t[0].dataType!==t[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(t[1].dims.length!==t[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!t[1].dims.map((r,n)=>r===t[2].dims[n]).reduce((r,n)=>r&&n,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(e.blockSize>0){if(t[1].dims.length===0||t[1].dims.length===1&&t[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!t[1].dims.map((o,i)=>i===e.axis||o===t[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(t[1].dims.length!==t[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=t[0].dims[e.axis],n=t[1].dims[e.axis];if(e.blockSize<Math.ceil(r/n)||e.blockSize>Math.ceil(r/(n-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},ib=(t,e)=>{let r=k.normalizeAxis(e.axis,t[0].dims.length),n=t[0].dataType,o=n===3,i=t[0].dims,s=t[1].dataType,u=k.size(i),d=n===3||n===2,c=d?[Math.ceil(k.size(t[0].dims)/4)]:t[0].dims,p=t[1].dims,m=t.length>2?t[2]:void 0,h=m?d?[Math.ceil(k.size(m.dims)/4)]:m.dims:void 0,_=p.length===0||p.length===1&&p[0]===1,y=_===!1&&p.length===1,w=fe(u),S=_&&(!d||w===4),$=S?w:1,v=S&&!d?w:1,T=O("input",d?12:n,c.length,v),I=O("scale",s,p.length),E=m?O("zero_point",d?12:n,h.length):void 0,A=U("output",s,i.length,$),D=[T,I];E&&D.push(E);let B=[c,p];m&&B.push(h);let R=[{type:12,data:u/$},{type:12,data:r},{type:12,data:e.blockSize},...L(...B,i)],x=q=>{let j=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${q.registerUniforms(j).declareVariables(...D,A)}
      ${q.mainStart()}
          ${q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${A.offsetToIndices("global_idx")};

          // Set input x
          ${d?`
            let input = ${T.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${$===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${T.getByOffset("global_idx")};`};

          // Set scale input
          ${_?`let scale_value= ${I.getByOffset("0")}`:y?`
            let scale_index = ${A.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${I.getByOffset("scale_index")};`:`
            var scale_indices: ${I.type.indices} = output_indices;
            let index = ${I.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${I.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${I.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${E?_?d?`
                let zero_point_input = ${E.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${E.getByOffset("0")}`:y?d?`
                let zero_point_index = ${A.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${E.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${A.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${E.getByOffset("zero_point_index")};`:d?`
                let zero_point_offset = ${I.indicesToOffset("scale_indices")};
                let zero_point_input = ${E.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${E.getByIndices("scale_indices")};`:`let zero_point_value = ${d?o?"i32":"u32":T.type.value}(0);`};
      // Compute and write output
      ${A.setByOffset("global_idx",`${A.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:e.cacheKey,inputDependencies:E?["rank","rank","rank"]:["rank","rank"]},getShaderSource:x,getRunData:()=>({outputs:[{dims:i,dataType:s}],dispatchGroup:{x:Math.ceil(u/$/64),y:1,z:1},programUniforms:R})}},lc=(t,e)=>{ob(t.inputs,e),t.compute(ib(t.inputs,e))},cc=t=>ee({axis:t.axis,blockSize:t.blockSize})});var ab,sb,mc,fc=V(()=>{"use strict";Ne();J();oe();ab=(t,e,r)=>{let n=t===e,o=t<e&&r<0,i=t>e&&r>0;if(n||o||i)throw new Error("Range these inputs' contents are invalid.")},sb=(t,e,r,n)=>{let o=Math.abs(Math.ceil((e-t)/r)),i=[o],s=o,u=[{type:12,data:s},{type:n,data:t},{type:n,data:r},...L(i)],d=c=>{let p=U("output",n,i.length),m=p.type.value,h=[{name:"outputSize",type:"u32"},{name:"start",type:m},{name:"delta",type:m}];return`
        ${c.registerUniforms(h).declareVariables(p)}
        ${c.mainStart()}
        ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${m}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:d,getRunData:()=>({outputs:[{dims:i,dataType:n}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},mc=t=>{let e=0,r=0,n=0;t.inputs[0].dataType===6?(e=t.inputs[0].getInt32Array()[0],r=t.inputs[1].getInt32Array()[0],n=t.inputs[2].getInt32Array()[0]):t.inputs[0].dataType===1&&(e=t.inputs[0].getFloat32Array()[0],r=t.inputs[1].getFloat32Array()[0],n=t.inputs[2].getFloat32Array()[0]),_e.webgpu.validateInputContent&&ab(e,r,n),t.compute(sb(e,r,n,t.inputs[0].dataType),{inputs:[]})}});var ub,db,hc,gc,bc=V(()=>{"use strict";J();re();Ie();oe();ub=(t,e,r,n)=>{if(t!=="none"&&n!=="i32"&&n!=="u32"&&n!=="f32")throw new Error(`Input ${n} is not supported with reduction ${t}.`);let o=`{
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
              }`;switch(t){case"none":return`${e}=${r};`;case"add":return n==="i32"||n==="u32"?`atomicAdd(&${e}, bitcast<${n}>(${r}));`:`
              ${o}bitcast<${n}>(oldValue) + (${r})${i}`;case"max":return n==="i32"||n==="u32"?`atomicMax(&${e}, bitcast<${n}>(${r}));`:`
                ${o}max(bitcast<f32>(oldValue), (${r}))${i}`;case"min":return n==="i32"||n==="u32"?`atomicMin(&${e}, bitcast<${n}>(${r}));`:`${o}min(bitcast<${n}>(oldValue), (${r}))${i}`;case"mul":return`${o}(bitcast<${n}>(oldValue) * (${r}))${i}`;default:throw new Error(`Reduction ${t} is not supported.`)}},db=(t,e)=>{let r=t[0].dims,n=t[1].dims,o=r,i=1,s=Math.ceil(k.sizeToDimension(n,n.length-1)/i),u=n[n.length-1],d=k.sizeFromDimension(r,u),c=[{type:12,data:s},{type:12,data:u},{type:12,data:d},...L(t[1].dims,t[2].dims,o)],p=m=>{let h=O("indices",t[1].dataType,t[1].dims.length),_=O("updates",t[2].dataType,t[2].dims.length,i),y=e.reduction!=="none"&&e.reduction!==""?Gs("output",t[0].dataType,o.length):U("output",t[0].dataType,o.length,i);return`
      ${m.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(h,_,y)}
      ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${t[0].dims.length===1?`
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
    ${ub(e.reduction,"output[data_offset + i]","value",y.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${e.cacheKey}_${e.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:c}),getShaderSource:p}},hc=t=>ee({reduction:t.reduction}),gc=(t,e)=>{t.compute(db(t.inputs,e),{inputs:[t.inputs[1],t.inputs[2]],outputs:[]})}});var lb,cb,pb,yc,mb,fb,hb,gb,bb,yb,_b,wb,_c,vb,$b,xb,Sb,Tb,wc,vc,$c=V(()=>{"use strict";J();re();Ie();oe();lb=(t,e)=>{if(t.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),t.length>0){if(e.mode==="linear"){if(!(t.length===2||t.length===3||t.length===4&&t[0]===1&&t[1]===1||t.length===4&&t[0]===1&&t[3]===1||t.length===5&&t[0]===1&&t[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(e.mode==="cubic"&&!(t.length===2||t.length===4&&t[0]===1&&t[1]===1||t.length===4&&t[0]===1&&t[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},cb=(t,e,r)=>{e.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let n=new Array(r).fill(1);return e.forEach((o,i)=>n[o]=t[i]),n},pb=(t,e,r,n,o,i)=>{let[s,u,d]=r>10?[1,2,3]:[-1,t.length>1?1:-1,-1],c=t[0].dims.length;if(s>0&&t.length>s&&t[s].dims.length>0)t[s].getFloat32Array().forEach(p=>i.push(p));else if(e.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&t.length>u&&t[u].dims.length===1&&t[u].dims[0]>0){if(t[u].getFloat32Array().forEach(p=>n.push(p)),n.length!==0&&n.length!==c&&r>=18&&n.length!==e.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");lb(n,e),e.axes.length>0&&cb(n,e.axes,c).forEach((p,m)=>n[m]=p)}if(d>0&&t.length>d&&t[d].dims.length===1&&t[d].dims[0]>0&&(t[d].getBigInt64Array().forEach(p=>o.push(Number(p))),o.length!==0&&o.length!==c&&r>=18&&o.length!==e.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(e.axes.length>0){if(n.length!==0&&n.length!==e.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==e.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof n<"u"&&typeof o<"u"&&n.length>0&&o.length>c)throw new Error("Resize requires only of scales or sizes to be specified")},yc=(t,e,r,n)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${t}) * (${e});
  let whole = ${n}(big / (${r}));
  let fract = ${n}(big % (${r})) / ${n}(${r});
  return whole + fract;
`,mb=(t,e)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${e} { `+(()=>{switch(t){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${e}(xResized) / ${e}(xScale);
          } else {
            ${yc("xResized","lengthOriginal","lengthResized",e)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${e}(xResized) + 0.5) / ${e}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${e}(xResized) + 0.5) / ${e}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${yc("xResized","lengthOriginal - 1","lengthResized - 1",e)}
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
                  return offset + ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;case"half_pixel":return`return ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${t} is not supported`)}})()+"}",fb=(t,e,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(t){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(e<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${t} is not supported`)}})()+"}",hb=(t,e,r)=>{let n=new Array(r).fill(0).concat(new Array(r).fill(1)),o=t.length===0?n:t.slice();return e.length>0?(e.forEach((i,s)=>{n[i]=o[s],n[s+r]=o[e.length+s]}),n):o},gb=(t,e,r,n)=>{let o=[];if(r.length>0)if(n.length>0){if(t.forEach(i=>o.push(i)),Math.max(...n)>t.length)throw new Error("axes is out of bound");n.forEach((i,s)=>o[i]=r[s])}else r.forEach(i=>o.push(i));else{if(e.length===0)throw new Error("Resize requires either scales or sizes.");o=t.map((i,s)=>Math.round(i*e[s]))}return o},bb=(t,e,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>e[i]),Number.MAX_VALUE):Math.min(...e,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>e[i]),Number.MIN_VALUE):Math.max(...e,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();e.fill(1,0,e.length);let o=t.slice();return r.axes.length>0?(r.axes.forEach(i=>e[i]=n),r.axes.forEach(i=>o[i]=Math.round(t[i]*e[i]))):(e.fill(n,0,e.length),o.forEach((i,s)=>o[s]=Math.round(i*e[s]))),o},yb=(t,e,r,n,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> array<${t.type.value}, ${r.length}> {
      var original_indices: array<${t.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var scale = ${F("uniforms.scales","i",n)};
        var roi_low = ${F("uniforms.roi","i",o)};
        var roi_hi = ${F("uniforms.roi",`i + ${e.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${t.type.value}(output_index);
        } else {
          var input_shape_i = ${F("uniforms.input_shape","i",e.length)};
          var output_shape_i = ${F("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,_b=(t,e,r,n,o,i,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> ${t.type.indices} {
      var input_indices: ${t.type.indices};
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${F("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${F("uniforms.roi","i",i)};
          var roi_hi = ${F("uniforms.roi",`i + ${r.length}`,i)};
          var input_shape_i = ${F("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${F("uniforms.output_shape","i",n.length)};
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
        ${t.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,wb=(t,e)=>`
    fn checkInputIndices(input_indices: ${t.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${e.length}; i++) {
        var input_index = ${t.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${F("uniforms.input_shape","i",e.length)}) {
          return false;
        }
      }
      return true;
    }`,_c=(t,e,r,n)=>t.rank>n?`
    ${t.indicesSet("input_indices",e,"channel")};
    ${t.indicesSet("input_indices",r,"batch")};
`:"",vb=(t,e,r,n,o)=>{let[s,u,d,c]=r.length===2?[-1,0,1,-1]:[0,2,3,1],p=t.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${p} {
      var input_indices: ${t.type.indices};
      ${t.indicesSet("input_indices",u,`max(0, min(row, ${r[u]} - 1))`)};
      ${t.indicesSet("input_indices",d,`max(0, min(col, ${r[d]} - 1))`)};
      ${_c(t,c,s,2)}
      return ${t.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${e.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${p} = originalIndices[${u}];
      var col:${p} = originalIndices[${d}];
      ${n?`if (row < 0 || row > (${r[u]} - 1) || col < 0 || col > (${r[d]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${r[u]} - 1));
      col = max(0, min(col, ${r[d]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${c}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${s}])`:"0"};
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
    }`},$b=(t,e,r,n,o,i,s,u,d,c)=>{let p=r.length===2,m=!0,[h,_]=p?[0,1]:m?[2,3]:[1,2],y=t.type.value,w=S=>{let $=S===h?"row":"col";return`
      fn ${$}CubicInterpolation(input_indices: ${t.type.indices}, output_indices: ${e.type.indices}) -> ${y} {
        var output_index = ${e.indicesGet("output_indices",S)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[S]},
        ${n[S]}, ${r[S]}, ${i[S]}, ${i[S]} + ${r.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[S]} - 1))) {
          return ${d};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${$}: ${y} = originalIdx + ${y}(i);
          if (${$} < 0 || ${$} >= ${r[S]}) {
            ${c?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${d};`:`${$} = max(0, min(${$}, ${r[S]} - 1));`};
          }
        var input_indices_copy: ${t.type.indices} = input_indices;
          ${t.indicesSet("input_indices_copy",S,`u32(${$})`)};
          data[i + 1] = ${S===h?t.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${w(h)};
    ${w(_)};
  fn getCubicInterpolationCoefs(s: ${y}) -> array<${y}, 4> {
    var absS = abs(s);
    var coeffs: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${y} = 1.0 - absS;
    var twoMinusAbsS: ${y} = 2.0 - absS;
    var onePlusAbsS: ${y} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${y}, 4>, coefs: array<${y}, 4>) -> ${y} {
    var coefsSum: ${y} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${e.type.indices}) -> ${y} {
    var input_indices: ${t.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},xb=(t,e,r,n,o)=>{let[s,u,d,c,p]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],m=t.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${m} {
      var input_indices: ${t.type.indices};
      ${t.indicesSet("input_indices",u,`max(0, min(depth, ${r[u]} - 1))`)};
      ${t.indicesSet("input_indices",d,`max(0, min(height, ${r[d]} - 1))`)};
      ${t.indicesSet("input_indices",c,`max(0, min(width, ${r[c]} - 1))`)};
      ${_c(t,p,s,3)}
      return ${t.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${e.type.indices}) -> ${m} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${m} = originalIndices[${u}];
      var height:${m} = originalIndices[${d}];
      var width:${m} = originalIndices[${c}];
      ${n?`if (depth < 0 || depth > (${r[u]} - 1) || height < 0 || height > (${r[d]} - 1) || width < 0 || (width > ${r[c]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${r[u]} - 1));
      height = max(0, min(height, ${r[d]} - 1));
      width = max(0, min(width, ${r[c]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${p}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${s}])`:"0"};

      var x111: ${m} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${m} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${m} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${m} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${m} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${m} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${m} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${m} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${m} = abs(depth - ${m}(depth1));
      var dx2: ${m} = abs(${m}(depth2) - depth);
      var dy1: ${m} = abs(height - ${m}(height1));
      var dy2: ${m} = abs(${m}(height2) - height);
      var dz1: ${m} = abs(width - ${m}(width1));
      var dz2: ${m} = abs(${m}(width2) - width);
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
    }`},Sb=(t,e,r,n,o,i)=>{let s=t.dims,u=hb(i,e.axes,s.length),d=gb(s,n,o,e.axes),c=n.slice();n.length===0&&(c=s.map((v,T)=>v===0?1:d[T]/v),e.keepAspectRatioPolicy!=="stretch"&&(d=bb(s,c,e)));let p=U("output",t.dataType,d.length),m=O("input",t.dataType,s.length),h=k.size(d),_=s.length===d.length&&s.every((v,T)=>v===d[T]),y=e.coordinateTransformMode==="tf_crop_and_resize",w=e.extrapolationValue,S=m.type.value,$=v=>`
      ${_?"":`
      ${mb(e.coordinateTransformMode,S)};
      ${(()=>{switch(e.mode){case"nearest":return`
              ${wb(m,s)};
              ${fb(e.nearestMode,r,S)};
              ${_b(m,p,s,d,c.length,u.length,y)};
              `;case"linear":return`
              ${yb(p,s,d,c.length,u.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${vb(m,p,s,y,w)}`;if(s.length===3||s.length===5)return`${xb(m,p,s,y,w)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${$b(m,p,s,d,c,u,e.cubicCoeffA,y,e.extrapolationValue,e.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${v.registerUniform("output_size","u32").registerUniform("scales","f32",c.length).registerUniform("roi","f32",u.length).declareVariables(m,p)}
      ${v.mainStart()}
        ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${_?"output[global_idx] = input[global_idx];":`
        let output_indices = ${p.offsetToIndices("global_idx")};
        var input_indices: ${m.type.indices};
        ${(()=>{switch(e.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${m.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${e.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${e.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${e.cacheKey}|${r}|${c.length>0?e.mode==="cubic"?c:c.length:""}|${o.length>0?o:""}|${u.length>0?u:""}|${_}|${e.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:d,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},{type:1,data:c},{type:1,data:u},...L(s,d)]})}},Tb=t=>{let e=t.customDataBuffer;return new Uint32Array(e,e.byteOffset,1)[0]},wc=(t,e)=>{let r=[],n=[],o=[],i=Tb(t);if(e.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");pb(t.inputs,e,i,r,n,o),t.compute(Sb(t.inputs[0],e,i,r,n,o),{inputs:[0]})},vc=t=>{let e=t.antialias,r=t.axes,n=t.coordinateTransformMode,o=t.cubicCoeffA,i=t.excludeOutside!==0,s=t.extrapolationValue,u=t.keepAspectRatioPolicy,d=t.mode,c=t.nearestMode===""?"simple":t.nearestMode;return ee({antialias:e,axes:r,coordinateTransformMode:n,cubicCoeffA:o,excludeOutside:i,extrapolationValue:s,keepAspectRatioPolicy:u,mode:d,nearestMode:c})}});var Ib,Cb,xc,Sc=V(()=>{"use strict";J();re();oe();Ib=t=>{if(!t||t.length<3)throw new Error("layerNorm requires at least 3 inputs.");let e=t[0],r=t[1],n=t[2];if(e.dataType!==r.dataType||e.dataType!==n.dataType)throw new Error("All inputs must have the same data type");if(e.dims.length!==3&&e.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=e.dims[e.dims.length-1],i=e.dims[e.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(n.dims.length!==1)throw new Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(t.length>3){let s=t[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(t.length>4){let s=t[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},Cb=(t,e,r,n)=>{let o=e.simplified,i=t[0].dims,s=k.size(i),u=i,d=s,c=i.slice(-1)[0],p=n?i.slice(0,-1).concat(1):[],m=!o&&t.length>3,h=t.length>4,_=n&&r>1,y=n&&r>2,w=r>3,S=64,$=fe(c),v=[{type:12,data:d},{type:12,data:$},{type:12,data:c},{type:1,data:e.epsilon}],T=E=>{let A=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],D=[O("x",t[0].dataType,t[0].dims,$),O("skip",t[1].dataType,t[1].dims,$),O("gamma",t[2].dataType,t[2].dims,$)];m&&D.push(O("beta",t[3].dataType,t[3].dims,$)),h&&D.push(O("bias",t[4].dataType,t[4].dims,$)),D.push(U("output",t[0].dataType,u,$)),_&&D.push(U("mean_output",1,p)),y&&D.push(U("inv_std_output",1,p)),w&&D.push(U("input_skip_bias_sum",t[0].dataType,u,$));let B=we(t[0].dataType),R=we(1,$);return`

      ${E.registerUniforms(A).declareVariables(...D)}
      var<workgroup> sum_shared : array<${R}, ${S}>;
      var<workgroup> sum_squared_shared : array<${R}, ${S}>;

      ${E.mainStart([S,1,1])}
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
          let bias_value = ${h?"bias[offset1d + i]":B+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${w?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Dt(B,$,"value")};
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
        ${y?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${B}(mean)`}) *
            ${B}(inv_std_dev) * gamma[offset1d + i]
            ${m?"+ beta[offset1d + i]":""};
        }
      }`},I=[{dims:u,dataType:t[0].dataType}];return r>1&&I.push({dims:p,dataType:1}),r>2&&I.push({dims:p,dataType:1}),r>3&&I.push({dims:i,dataType:t[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${_};${y};${w}`,inputDependencies:t.map((E,A)=>"type")},getShaderSource:T,getRunData:()=>({outputs:I,dispatchGroup:{x:Math.ceil(d/c)},programUniforms:v})}},xc=(t,e)=>{Ib(t.inputs);let n=[0];t.outputCount>1&&n.push(-3),t.outputCount>2&&n.push(-3),t.outputCount>3&&n.push(3),t.compute(Cb(t.inputs,e,t.outputCount,!1),{outputs:n})}});var Ab,ln,Eb,Tc,kb,Pb,Ic,Cc,Ac=V(()=>{"use strict";J();re();Ie();oe();Ab=(t,e)=>{if(!t||t.length<1)throw new Error("too few inputs");if(e.axes.length!==0){if(e.axes.length!==e.starts.length||e.axes.length!==e.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(e.starts.length!==e.ends.length)throw new Error("starts and ends must have the same length");t.slice(1).forEach((r,n)=>{if(t[n+1].dataType!==6&&t[n+1].dataType!==7)throw new Error(`Input ${n} must be an array of int32 or int64`)})},ln=(t,e)=>{let r=[];if(t.length>e)if(t[e].dataType===7)t[e].getBigInt64Array().forEach(n=>r.push(Number(n)));else if(t[e].dataType===6)t[e].getInt32Array().forEach(n=>r.push(Number(n)));else throw new Error(`Input ${e} must be an array of int32 or int64`);return r},Eb=(t,e)=>{if(t.length>1){let r=ln(t,1),n=ln(t,2),o=ln(t,3);return o.length===0&&(o=[...Array(t[0].dims.length).keys()]),ee({starts:r,ends:n,axes:o})}else return e},Tc=(t,e,r,n,o)=>{let i=t;return t<0&&(i+=r[n[e]]),o[e]<0?Math.max(0,Math.min(i,r[n[e]]-1)):Math.max(0,Math.min(i,r[n[e]]))},kb=(t,e,r)=>`fn calculateInputIndices(output_indices: ${e.type.indices}) -> ${t.type.indices} {
          var input_indices: ${t.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${F("uniforms.input_shape","i",r.length)};
            let steps_i = ${F("uniforms.steps","i",r.length)};
            let signs_i = ${F("uniforms.signs","i",r.length)};
            let starts_i = ${F("uniforms.starts","i",r.length)};
            var output_index = ${e.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${t.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Pb=(t,e)=>{let r=t[0].dims,n=k.size(r),o=e.axes.length>0?k.normalizeAxes(e.axes,r.length):[...Array(r.length).keys()],i=ln(t,4);i.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let s=e.starts.map(($,v)=>Tc($,v,r,o,i)),u=e.ends.map(($,v)=>Tc($,v,r,o,i));if(o.length!==s.length||o.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let $=0;$<r.length;++$)o.includes($)||(s.splice($,0,0),u.splice($,0,r[$]),i.splice($,0,1));let d=i.map($=>Math.sign($));i.forEach(($,v,T)=>{if($<0){let I=(u[v]-s[v])/$,E=s[v],A=E+I*i[v];s[v]=A,u[v]=E,T[v]=-$}});let c=r.slice(0);o.forEach(($,v)=>{c[$]=Math.ceil((u[$]-s[$])/i[$])});let p={dims:c,dataType:t[0].dataType},m=U("output",t[0].dataType,c.length),h=O("input",t[0].dataType,t[0].dims.length),_=k.size(c),y=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:d.length},{name:"steps",type:"u32",length:i.length}],w=[{type:12,data:_},{type:12,data:s},{type:6,data:d},{type:12,data:i},...L(t[0].dims,c)],S=$=>`
      ${$.registerUniforms(y).declareVariables(h,m)}
        ${kb(h,m,r)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${m.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${m.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${d.length}_${s.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:S,getRunData:()=>({outputs:[p],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:w})}},Ic=(t,e)=>{Ab(t.inputs,e);let r=Eb(t.inputs,e);t.compute(Pb(t.inputs,r),{inputs:[0]})},Cc=t=>{let e=t.starts,r=t.ends,n=t.axes;return ee({starts:e,ends:r,axes:n})}});var zb,Ob,Ec,kc,Pc=V(()=>{"use strict";J();re();Ie();dt();oe();zb=t=>{if(!t||t.length!==1)throw new Error("Softmax op requires 1 input.")},Ob=(t,e)=>{let r=t.inputs[0],n=r.dims,o=k.size(n),i=n.length,s=k.normalizeAxis(e.axis,i),u=s<n.length-1,d,c=[];u?(c=Array.from({length:i},(D,B)=>B),c[s]=i-1,c[i-1]=s,d=t.compute(ze(r,c),{inputs:[r],outputs:[-1]})[0]):d=r;let p=d.dims,m=p[i-1],h=o/m,_=fe(m),y=m/_,w=64;h===1&&(w=256);let S=(D,B)=>B===4?`max(max(${D}.x, ${D}.y), max(${D}.z, ${D}.w))`:B===2?`max(${D}.x, ${D}.y)`:B===3?`max(max(${D}.x, ${D}.y), ${D}.z)`:D,$=O("x",d.dataType,d.dims,_),v=U("result",d.dataType,d.dims,_),T=$.type.value,I=we(d.dataType)==="f32"?`var threadMax = ${T}(-3.402823e+38f);`:`var threadMax = ${T}(-65504.0h);`,E=D=>`
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
      ${D.registerUniform("packedCols","i32").declareVariables($,v)}
      ${D.mainStart(w)}
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
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${T}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,A=t.compute({name:"Softmax",shaderCache:{hint:`${_};${w}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:p,dataType:d.dataType}],dispatchGroup:{x:h},programUniforms:[{type:6,data:y}]}),getShaderSource:E},{inputs:[d],outputs:[u?-1:0]})[0];u&&t.compute(ze(A,c),{inputs:[A]})},Ec=(t,e)=>{zb(t.inputs),Ob(t,e)},kc=t=>ee({axis:t.axis})});var zc,Db,Bb,Mb,Oc,Dc=V(()=>{"use strict";J();re();oe();zc=t=>Array.from(t.getBigInt64Array(),Number),Db=t=>{if(!t||t.length!==2)throw new Error("Tile requires 2 inputs.");if(t[0].dataType!==1&&t[0].dataType!==10&&t[0].dataType!==6&&t[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(t[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(t[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(zc(t[1]).length!==t[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Bb=(t,e)=>{let r=[];for(let n=0;n<t.length;++n)r.push(t[n]*e[n]);return r},Mb=(t,e)=>{let r=t[0].dims,n=e??zc(t[1]),o=Bb(r,n),i=k.size(o),s=t[0].dataType,u=O("input",s,r.length),d=U("output",s,o.length),c=p=>`
      const inputShape = ${u.indices(...r)};
      ${p.registerUniform("output_size","u32").declareVariables(u,d)}
      ${p.mainStart()}
      ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${d.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${d.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${d.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...L(t[0].dims,o)]}),getShaderSource:c}},Oc=t=>{Db(t.inputs),t.compute(Mb(t.inputs),{inputs:[0]})}});var Rb,Ub,Bc,Mc=V(()=>{"use strict";J();re();oe();Rb=(t,e,r,n,o)=>{let i=U("output_data",o,r.length,4),s=O("a_data",e[1].dataType,e[1].dims.length,4),u=O("b_data",e[2].dataType,e[2].dims.length,4),d=O("c_data",e[0].dataType,e[0].dims.length,4),c,p=(m,h,_)=>`select(${h}, ${m}, ${_})`;if(!n)c=i.setByOffset("global_idx",p(s.getByOffset("global_idx"),u.getByOffset("global_idx"),d.getByOffset("global_idx")));else{let m=(h,_,y="")=>{let w=`a_data[index_a${_}][component_a${_}]`,S=`b_data[index_b${_}][component_b${_}]`,$=`bool(c_data[index_c${_}] & (0xffu << (component_c${_} * 8)))`;return`
            let output_indices${_} = ${i.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offset_a${_} = ${s.broadcastedIndicesToOffset(`output_indices${_}`,i)};
            let offset_b${_} = ${u.broadcastedIndicesToOffset(`output_indices${_}`,i)};
            let offset_c${_} = ${d.broadcastedIndicesToOffset(`output_indices${_}`,i)};
            let index_a${_} = offset_a${_} / 4u;
            let index_b${_} = offset_b${_} / 4u;
            let index_c${_} = offset_c${_} / 4u;
            let component_a${_} = offset_a${_} % 4u;
            let component_b${_} = offset_b${_} % 4u;
            let component_c${_} = offset_c${_} % 4u;
            ${h}[${_}] = ${y}(${p(w,S,$)});
          `};o===9?c=`
            var data = vec4<u32>(0);
            ${m("data",0,"u32")}
            ${m("data",1,"u32")}
            ${m("data",2,"u32")}
            ${m("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:c=`
            ${m("output_data[global_idx]",0)}
            ${m("output_data[global_idx]",1)}
            ${m("output_data[global_idx]",2)}
            ${m("output_data[global_idx]",3)}
          `}return`
        ${t.registerUniform("vec_size","u32").declareVariables(d,s,u,i)}
        ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${c}
      }`},Ub=t=>{let e=t[1].dims,r=t[2].dims,n=t[0].dims,o=t[1].dataType,i=!(k.areEqual(e,r)&&k.areEqual(r,n)),s=e,u=k.size(e);if(i){let c=rt.calcShape(rt.calcShape(e,r,!1),n,!1);if(!c)throw new Error("Can't perform where op on the given tensors");s=c,u=k.size(s)}let d=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:c=>Rb(c,t,s,i,o),getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:d},...L(n,e,r,s)]})}},Bc=t=>{t.compute(Ub(t.inputs))}});var Rc,Uc=V(()=>{"use strict";yu();Yr();vu();xu();ud();_d();$d();Ud();Fd();jd();Yd();rl();il();sl();ll();ml();gl();_l();$l();Tl();Dl();Rl();Nl();Ll();Hl();Eo();ql();dc();pc();fc();bc();Zr();$c();zo();Sc();Ac();Pc();Po();Dc();dt();Jr();Mc();Rc=new Map([["Abs",[Su]],["Acos",[Tu]],["Acosh",[Iu]],["Add",[dd]],["ArgMax",[bu,go]],["ArgMin",[gu,go]],["Asin",[Cu]],["Asinh",[Au]],["Atan",[Eu]],["Atanh",[ku]],["Attention",[_u]],["AveragePool",[ec,Jl]],["BatchNormalization",[wu]],["BiasAdd",[$u]],["BiasSplitGelu",[sd]],["Cast",[zu,Pu]],["Ceil",[Du]],["Clip",[Ou]],["Concat",[wd,vd]],["Conv",[To,So]],["ConvTranspose",[Hd,Wd]],["Cos",[Bu]],["Cosh",[Mu]],["CumSum",[qd,Kd]],["DepthToSpace",[Zd,Qd]],["DequantizeLinear",[lc,cc]],["Div",[ld]],["Einsum",[el,tl]],["Elu",[Ru,nr]],["Equal",[cd]],["Erf",[Uu]],["Exp",[Nu]],["Expand",[ol]],["FastGelu",[al]],["Floor",[Vu]],["FusedConv",[To,So]],["Gather",[dl,ul]],["GatherElements",[yl,bl]],["GatherBlockQuantized",[fl,hl]],["GatherND",[cl,pl]],["Gelu",[Lu]],["Gemm",[vl,wl]],["GlobalAveragePool",[nc,rc]],["GlobalMaxPool",[uc,sc]],["Greater",[hd]],["GreaterOrEqual",[bd]],["GridSample",[xl,Sl]],["GroupQueryAttention",[Ol]],["HardSigmoid",[Zu,ju]],["InstanceNormalization",[Ml]],["LayerNormalization",[Ul]],["LeakyRelu",[Wu,nr]],["Less",[gd]],["LessOrEqual",[yd]],["Log",[od]],["MatMul",[Vl]],["MatMulNBits",[Wl,Gl]],["MaxPool",[ic,ac]],["Mul",[pd]],["MultiHeadAttention",[Al,Cl]],["Neg",[Hu]],["Not",[Gu]],["Pad",[Fl]],["Pow",[md]],["QuickGelu",[id,nr]],["Range",[mc]],["Reciprocal",[Fu]],["ReduceMin",[lu]],["ReduceMean",[iu]],["ReduceMax",[du]],["ReduceSum",[pu]],["ReduceProd",[cu]],["ReduceL1",[au]],["ReduceL2",[su]],["ReduceLogSum",[fu]],["ReduceLogSumExp",[uu]],["ReduceSumSquare",[mu]],["Relu",[qu]],["Resize",[wc,vc]],["RotaryEmbedding",[Pl]],["ScatterND",[gc,hc]],["Sigmoid",[Ku]],["Sin",[Qu]],["Sinh",[Yu]],["Slice",[Ic,Cc]],["SkipLayerNormalization",[xc]],["Split",[El,kl]],["Sqrt",[Xu]],["Softmax",[Ec,kc]],["Sub",[fd]],["Tan",[Ju]],["Tanh",[td]],["ThresholdedRelu",[nd,nr]],["Tile",[Oc]],["Transpose",[qs,Ks]],["Where",[Bc]]])});var cn,Nc=V(()=>{"use strict";Ne();tt();oe();cn=class{constructor(e){this.backend=e;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,r){this.repo.set(e,r)}run(e,r,n,o,i){Ue(e.programInfo.name);let s=this.backend.device,u=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let d=[];for(let p of r)d.push({binding:d.length,resource:{buffer:p.buffer}});for(let p of n)d.push({binding:d.length,resource:{buffer:p.buffer}});i&&d.push({binding:d.length,resource:i});let c=s.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:d,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let p={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:c,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(p)}u.setPipeline(e.computePipeline),u.setBindGroup(0,c),u.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Me(e.programInfo.name)}dispose(){}build(e,r){Ue(e.name);let n=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(m=>{n.features.has(m.feature)&&o.push(`enable ${m.extension};`)});let s=Hs(r,this.backend.device.limits),u=e.getShaderSource(s),d=`${o.join(`
`)}
${s.additionalImplementations}
${u}`,c=n.createShaderModule({code:d,label:e.name});ae("verbose",()=>`[WebGPU] ${e.name} shader code: ${d}`);let p=n.createComputePipeline({compute:{module:c,entryPoint:"main"},layout:"auto",label:e.name});return Me(e.name),{programInfo:e,computePipeline:p,uniformVariablesInfo:s.variablesInfo}}normalizeDispatchGroupSize(e){let r=typeof e=="number"?e:e.x,n=typeof e=="number"?1:e.y||1,o=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=i&&n<=i&&o<=i)return[r,n,o];let s=r*n*o,u=Math.ceil(Math.sqrt(s));if(u>i){if(u=Math.ceil(Math.cbrt(s)),u>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[u,u,u]}else return[u,u,1]}}});var Vc={};Nt(Vc,{WebGpuBackend:()=>Do});var Nb,Vb,Oo,Do,Lc=V(()=>{"use strict";Ne();J();tt();no();Ws();Uc();Nc();Nb=(t,e)=>{if(e.length!==t.length)throw new Error(`inputDependencies length ${e.length} is not equal to inputTensors length ${t.length}.`);let r=[];for(let n=0;n<t.length;++n){let o=t[n].dataType;switch(e[n]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let i=t[n].dims.length;r.push(`${o};${i}`);break}case"dims":{let i=t[n].dims.join(",");r.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${e[n]}`)}}return r.join("|")},Vb=(t,e,r)=>{let n=t.name;return t.shaderCache?.hint&&(n+="["+t.shaderCache.hint+"]"),n+=":"+r+`:${Nb(e,t.shaderCache?.inputDependencies??new Array(e.length).fill("dims"))}`,n},Oo=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Do=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,r){this.env=e;let n=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},i=s=>r.features.has(s)&&n.push(s)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups"),this.device=await r.requestDevice(o),this.adapterInfo=new Oo(r.info||await r.requestAdapterInfo()),this.gpuDataManager=Ls(this),this.programManager=new cn(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Nr(e.logLevel,!!e.debug),this.device.onuncapturederror=s=>{s.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${s.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Ue(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(e.getMappedRange()),n=this.pendingQueries.get(e);for(let o=0;o<r.length/2;o++){let i=n[o],s=i.kernelId,u=this.kernels.get(s),d=u.kernelType,c=u.kernelName,p=i.programName,m=i.inputTensorViews,h=i.outputTensorViews,_=r[o*2],y=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=_);let w=Number(_-this.queryTimeBase),S=Number(y-this.queryTimeBase);if(!Number.isSafeInteger(w)||!Number.isSafeInteger(S))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:m.map($=>({dims:$.dims,dataType:et($.dataType)})),outputsMetadata:h.map($=>({dims:$.dims,dataType:et($.dataType)})),kernelId:s,kernelType:d,kernelName:c,programName:p,startTime:w,endTime:S});else{let $="";m.forEach((T,I)=>{$+=`input[${I}]: [${T.dims}] | ${et(T.dataType)}, `});let v="";h.forEach((T,I)=>{v+=`output[${I}]: [${T.dims}] | ${et(T.dataType)}, `}),console.log(`[profiling] kernel "${s}|${d}|${c}|${p}" ${$}${v}start time: ${w} ns, execution time: ${S-w} ns`)}$r("GPU",`${p}::${_}::${y}`)}e.unmap(),this.pendingQueries.delete(e)}),Me()}run(e,r,n,o,i,s){Ue(e.name);let u=[];for(let T=0;T<r.length;++T){let I=r[T].data;if(I===0)continue;let E=this.gpuDataManager.get(I);if(!E)throw new Error(`no GPU data for input: ${I}`);u.push(E)}let{outputs:d,dispatchGroup:c,programUniforms:p}=e.getRunData(r),m=n.length===0?d.map((T,I)=>I):n;if(m.length!==d.length)throw new Error(`Output size ${m.length} must be equal to ${d.length}.`);let h=[],_=[];for(let T=0;T<d.length;++T){if(!Number.isInteger(m[T])||m[T]<-3||m[T]>=s)throw new Error(`Invalid output index: ${m[T]}`);if(m[T]===-3)continue;let I=m[T]===-1,E=m[T]===-2,A=I||E?i(d[T].dataType,d[T].dims):o(m[T],d[T].dataType,d[T].dims);if(h.push(A),A.data===0)continue;let D=this.gpuDataManager.get(A.data);if(!D)throw new Error(`no GPU data for output: ${A.data}`);if(I&&this.temporaryData.push(D),E){let B=this.kernelPersistentData.get(this.currentKernelId);B||(B=[],this.kernelPersistentData.set(this.currentKernelId,B)),B.push(D)}_.push(D)}if(u.length!==r.length||_.length!==h.length){if(_.length===0)return Me(e.name),h;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let y;if(p){let T=0,I=[];p.forEach(B=>{let R=typeof B.data=="number"?[B.data]:B.data;if(R.length===0)return;let x=B.type===10?2:4,q,j;B.type===10?(j=R.length>4?16:R.length>2?8:R.length*x,q=R.length>4?16:x*R.length):(j=R.length<=2?R.length*x:16,q=16),T=Math.ceil(T/j)*j,I.push(T);let Z=B.type===10?8:4;T+=R.length>4?Math.ceil(R.length/Z)*q:R.length*x});let E=16;T=Math.ceil(T/E)*E;let A=new ArrayBuffer(T);p.forEach((B,R)=>{let x=I[R],q=typeof B.data=="number"?[B.data]:B.data;if(B.type===6)new Int32Array(A,x,q.length).set(q);else if(B.type===12)new Uint32Array(A,x,q.length).set(q);else if(B.type===10)new Uint16Array(A,x,q.length).set(q);else if(B.type===1)new Float32Array(A,x,q.length).set(q);else throw new Error(`Unsupported uniform type: ${et(B.type)}`)});let D=this.gpuDataManager.create(T,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(D.buffer,0,A,0,T),this.gpuDataManager.release(D.id),y={offset:0,size:T,buffer:D.buffer}}let w=this.programManager.normalizeDispatchGroupSize(c),S=w[1]===1&&w[2]===1,$=Vb(e,r,S),v=this.programManager.getArtifact($);if(v||(v=this.programManager.build(e,w),this.programManager.setArtifact($,v),ae("info",()=>`[artifact] key: ${$}, programName: ${e.name}`)),p&&v.uniformVariablesInfo){if(p.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${p.length} in program "${v.programInfo.name}".`);for(let T=0;T<p.length;T++){let I=p[T],E=I.type,A=typeof I.data=="number"?1:I.data.length,[D,B]=v.uniformVariablesInfo[T];if(E!==D||A!==B)throw new Error(`Uniform variable ${T} mismatch: expect type ${D} with size ${B}, got type ${E} with size ${A} in program "${v.programInfo.name}".`)}}if(ae("info",()=>`[ProgramManager] run "${e.name}" (key=${$}) with ${w[0]}x${w[1]}x${w[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let T={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:r,outputTensorViews:h};this.pendingKernels.push(T),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(T)}return this.programManager.run(v,u,_,w,y),Me(e.name),h}upload(e,r){this.gpuDataManager.upload(e,r)}memcpy(e,r){this.gpuDataManager.memcpy(e,r)}async download(e,r){await this.gpuDataManager.download(e,r)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,r,n,o){let i=Rc.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let s={kernelType:e,kernelName:o,kernelEntry:i[0],attributes:[i[1],n]};this.kernels.set(r,s)}releaseKernel(e){let r=this.kernelPersistentData.get(e);if(r){for(let n of r)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,r,n){let o=this.kernels.get(e);if(!o)throw new Error(`kernel not created: ${e}`);let i=o.kernelType,s=o.kernelName,u=o.kernelEntry,d=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${s}" is not allowed to be called recursively`);this.currentKernelId=e,d[0]&&(d[1]=d[0](d[1]),d[0]=void 0),ae("info",()=>`[WebGPU] Start to run kernel "[${i}] ${s}"...`);let c=this.env.debug;this.temporaryData=[];try{return c&&this.device.pushErrorScope("validation"),u(r,d[1]),0}catch(p){return n.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${s}" failed. ${p}`)),1}finally{c&&n.push(this.device.popErrorScope().then(p=>p?`GPU validation error for kernel "[${i}] ${s}": ${p.message}`:null));for(let p of this.temporaryData)this.gpuDataManager.release(p.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,r,n,o){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let s=i.get(r),u=this.gpuDataManager.registerExternalBuffer(n,o,s);return i.set(r,[u,n]),u}unregisterBuffers(e){let r=this.sessionExternalDataMapping.get(e);r&&(r.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let r=this.gpuDataManager.get(e);if(!r)throw new Error(`no GPU data for buffer: ${e}`);return r.buffer}createDownloader(e,r,n){return async()=>{let o=await lo(this,e,r);return Lr(o.buffer,n)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ae("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ae("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ae("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),n=e.length;this.pendingKernels=[];for(let o=0;o<n;o++){let i=this.getComputePassEncoder(),s=e[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(s.computePipeline),i.setBindGroup(0,s.bindGroup),i.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}});var Wc={};Nt(Wc,{init:()=>Lb});var sr,Bo,Lb,Gc=V(()=>{"use strict";J();tt();re();Rs();sr=class t{constructor(e,r,n,o){this.module=e;this.dataType=r;this.data=n;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let e=k.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let e=k.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let e=k.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let e=k.size(this.dims);return e===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(e){if(k.size(e)!==k.size(this.dims))throw new Error("Invalid new shape");return new t(this.module,this.dataType,this.data,e)}},Bo=class{constructor(e,r,n){this.module=e;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo;let o=e.PTR_SIZE,i=n/e.PTR_SIZE,s=o===4?"i32":"i64";this.opKernelContext=Number(e.getValue(o*i++,s));let u=Number(e.getValue(o*i++,s));this.outputCount=Number(e.getValue(o*i++,s)),this.customDataOffset=Number(e.getValue(o*i++,"*")),this.customDataSize=Number(e.getValue(o*i++,s));let d=[];for(let c=0;c<u;c++){let p=Number(e.getValue(o*i++,s)),m=Number(e.getValue(o*i++,"*")),h=Number(e.getValue(o*i++,s)),_=[];for(let y=0;y<h;y++)_.push(Number(e.getValue(o*i++,s)));d.push(new sr(e,p,m,_))}this.inputs=d}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,r){let n=r?.inputs?.map(u=>typeof u=="number"?this.inputs[u]:u)??this.inputs,o=r?.outputs??[],i=(u,d,c)=>new sr(this.module,d,this.output(u,c),c),s=(u,d)=>{let c=$t(u,d);if(!c)throw new Error(`Unsupported data type: ${u}`);let p=c>0?this.backend.gpuDataManager.create(c).id:0;return new sr(this.module,u,p,d)};return this.backend.run(e,n,o,i,s,this.outputCount)}output(e,r){let n=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",s=this.module.stackAlloc((1+r.length)*o);this.module.setValue(s,r.length,i);for(let u=0;u<r.length;u++)this.module.setValue(s+o*(u+1),r[u],i);return this.module._JsepOutput(this.opKernelContext,e,s)}catch(o){throw new Error(`Failed to generate kernel's output[${e}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(n)}}},Lb=async(t,e,r,n)=>{let o=e.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(t==="webgpu"){let i=(Lc(),Yt(Vc)).WebGpuBackend,s=new i;await s.initialize(r,n),o("webgpu",[s,u=>s.alloc(Number(u)),u=>s.free(u),(u,d,c,p=!1)=>{if(p)ae("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(d)}, size=${Number(c)}`),s.memcpy(Number(u),Number(d));else{ae("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(d)}, size=${Number(c)}`);let m=e.HEAPU8.subarray(Number(u>>>0),Number(u>>>0)+Number(c));s.upload(Number(d),m)}},async(u,d,c)=>{ae("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${d}, size=${c}`),await s.download(Number(u),()=>e.HEAPU8.subarray(Number(d)>>>0,Number(d+c)>>>0))},(u,d,c)=>s.createKernel(u,Number(d),c,e.UTF8ToString(e._JsepGetNodeName(Number(d)))),u=>s.releaseKernel(u),(u,d,c,p)=>{ae("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${c}, kernel=${u}, contextDataOffset=${d}`);let m=new Bo(e,s,Number(d));return s.computeKernel(Number(u),m,p)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let i=new Fr(r);o("webnn",[i,()=>i.reserveTensorId(),s=>i.releaseTensorId(s),async(s,u,d,c,p)=>i.ensureTensor(s,u,d,c,p),(s,u)=>{i.uploadTensor(s,u)},async(s,u)=>i.downloadTensor(s,u),(s,u)=>i.registerMLContext(s,u),!!r.trace])}}});var Wb,Cr,Ar,Bt,Gb,Hc,Jt,Er,kr,Fc,Pr,zr,Or,Zn=V(()=>{"use strict";Ne();Ss();Is();J();wt();Br();to();Wb=(t,e)=>{be()._OrtInit(t,e)!==0&&he("Can't initialize onnxruntime.")},Cr=async t=>{Wb(t.wasm.numThreads,tr(t.logLevel))},Ar=async(t,e)=>{be().asyncInit?.();let r=t.webgpu.adapter;if(e==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let n=t.webgpu.powerPreference;if(n!==void 0&&n!=="low-power"&&n!=="high-performance")throw new Error(`Invalid powerPreference setting: "${n}"`);let o=t.webgpu.forceFallbackAdapter;if(o!==void 0&&typeof o!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${o}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:n,forceFallbackAdapter:o}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(e==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let n=(Gc(),Yt(Wc)).init;e==="webgpu"&&await n("webgpu",be(),t,r),e==="webnn"&&await n("webnn",be(),t)}},Bt=new Map,Gb=t=>{let e=be(),r=e.stackSave();try{let n=e.PTR_SIZE,o=e.stackAlloc(2*n);e._OrtGetInputOutputCount(t,o,o+n)!==0&&he("Can't get session input/output count.");let s=n===4?"i32":"i64";return[Number(e.getValue(o,s)),Number(e.getValue(o+n,s))]}finally{e.stackRestore(r)}},Hc=(t,e)=>{let r=be(),n=r.stackSave(),o=0;try{let i=r.PTR_SIZE,s=r.stackAlloc(2*i);r._OrtGetInputOutputMetadata(t,e,s,s+i)!==0&&he("Can't get session input/output metadata.");let d=Number(r.getValue(s,"*"));o=Number(r.getValue(s+i,"*"));let c=r.HEAP32[o/4];if(c===0)return[d,0];let p=r.HEAPU32[o/4+1],m=[];for(let h=0;h<p;h++){let _=Number(r.getValue(o+8+h*i,"*"));m.push(_!==0?r.UTF8ToString(_):Number(r.getValue(o+8+(h+p)*i,"*")))}return[d,c,m]}finally{r.stackRestore(n),o!==0&&r._OrtFree(o)}},Jt=t=>{let e=be(),r=e._malloc(t.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${t.byteLength}.`);return e.HEAPU8.set(t,r),[r,t.byteLength]},Er=async(t,e)=>{let r,n,o=be();Array.isArray(t)?[r,n]=t:t.buffer===o.HEAPU8.buffer?[r,n]=[t.byteOffset,t.byteLength]:[r,n]=Jt(t);let i=0,s=0,u=0,d=[],c=[],p=[];try{if([s,d]=await Ts(e),e?.externalData&&o.mountExternalData){let I=[];for(let E of e.externalData){let A=typeof E=="string"?E:E.path;I.push(rr(typeof E=="string"?E:E.data).then(D=>{o.mountExternalData(A,D)}))}await Promise.all(I)}for(let I of e?.executionProviders??[])if((typeof I=="string"?I:I.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof I!="string"){let A=I,D=A?.context,B=A?.gpuDevice,R=A?.deviceType,x=A?.powerPreference;D?o.currentContext=D:B?o.currentContext=await o.webnnCreateMLContext(B):o.currentContext=await o.webnnCreateMLContext({deviceType:R,powerPreference:x})}else o.currentContext=await o.webnnCreateMLContext();break}i=await o._OrtCreateSession(r,n,s),o.webgpuOnCreateSession?.(i),i===0&&he("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.webnnRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[m,h]=Gb(i),_=!!e?.enableGraphCapture,y=[],w=[],S=[],$=[],v=[];for(let I=0;I<m;I++){let[E,A,D]=Hc(i,I);E===0&&he("Can't get an input name."),c.push(E);let B=o.UTF8ToString(E);y.push(B),S.push(A===0?{name:B,isTensor:!1}:{name:B,isTensor:!0,type:et(A),shape:D})}for(let I=0;I<h;I++){let[E,A,D]=Hc(i,I+m);E===0&&he("Can't get an output name."),p.push(E);let B=o.UTF8ToString(E);w.push(B),$.push(A===0?{name:B,isTensor:!1}:{name:B,isTensor:!0,type:et(A),shape:D});{if(_&&e?.preferredOutputLocation===void 0){v.push("gpu-buffer");continue}let R=typeof e?.preferredOutputLocation=="string"?e.preferredOutputLocation:e?.preferredOutputLocation?.[B]??"cpu",x=o.webnnIsGraphOutput;if(R==="cpu"&&x&&x(i,B)){v.push("ml-tensor-cpu-output");continue}if(R!=="cpu"&&R!=="cpu-pinned"&&R!=="gpu-buffer"&&R!=="ml-tensor")throw new Error(`Not supported preferred output location: ${R}.`);if(_&&R!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${R}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);v.push(R)}}let T=null;return v.some(I=>I==="gpu-buffer"||I==="ml-tensor"||I==="ml-tensor-cpu-output")&&(u=o._OrtCreateBinding(i),u===0&&he("Can't create IO binding."),T={handle:u,outputPreferredLocations:v,outputPreferredLocationsEncoded:v.map(I=>I==="ml-tensor-cpu-output"?"ml-tensor":I).map(I=>eo(I))}),Bt.set(i,[i,c,p,T,_,!1]),[i,y,w,S,$]}catch(m){throw c.forEach(h=>o._OrtFree(h)),p.forEach(h=>o._OrtFree(h)),u!==0&&o._OrtReleaseBinding(u)!==0&&he("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&he("Can't release session."),m}finally{o._free(r),s!==0&&o._OrtReleaseSessionOptions(s)!==0&&he("Can't release session options."),d.forEach(m=>o._free(m)),o.unmountExternalData?.()}},kr=t=>{let e=be(),r=Bt.get(t);if(!r)throw new Error(`cannot release session. invalid session id: ${t}`);let[n,o,i,s,u]=r;s&&(u&&e._OrtClearBoundOutputs(s.handle)!==0&&he("Can't clear bound outputs."),e._OrtReleaseBinding(s.handle)!==0&&he("Can't release IO binding.")),e.jsepOnReleaseSession?.(t),e.webnnOnReleaseSession?.(t),e.webgpuOnReleaseSession?.(t),o.forEach(d=>e._OrtFree(d)),i.forEach(d=>e._OrtFree(d)),e._OrtReleaseSession(n)!==0&&he("Can't release session."),Bt.delete(t)},Fc=async(t,e,r,n,o,i,s=!1)=>{if(!t){e.push(0);return}let u=be(),d=u.PTR_SIZE,c=t[0],p=t[1],m=t[3],h=m,_,y;if(c==="string"&&(m==="gpu-buffer"||m==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&m!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${i} when enableGraphCapture is true.`);if(m==="gpu-buffer"){let $=t[2].gpuBuffer;y=$t(vt(c),p);{let v=u.jsepRegisterBuffer;if(!v)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');_=v(n,i,$,y)}}else if(m==="ml-tensor"){let $=t[2].mlTensor;y=$t(vt(c),p);let v=u.webnnRegisterMLTensor;if(!v)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');_=v(n,$,vt(c),p)}else{let $=t[2];if(Array.isArray($)){y=d*$.length,_=u._malloc(y),r.push(_);for(let v=0;v<$.length;v++){if(typeof $[v]!="string")throw new TypeError(`tensor data at index ${v} is not a string`);u.setValue(_+v*d,Le($[v],r),"*")}}else{let v=u.webnnIsGraphInput,T=u.webnnIsGraphOutput;if(c!=="string"&&v&&T){let I=u.UTF8ToString(o);if(v(n,I)||T(n,I)){let E=vt(c);y=$t(E,p),h="ml-tensor";let A=u.webnnCreateTemporaryTensor,D=u.webnnUploadTensor;if(!A||!D)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let B=await A(n,E,p);D(B,new Uint8Array($.buffer,$.byteOffset,$.byteLength)),_=B}else y=$.byteLength,_=u._malloc(y),r.push(_),u.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,y),_)}else y=$.byteLength,_=u._malloc(y),r.push(_),u.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,y),_)}}let w=u.stackSave(),S=u.stackAlloc(4*p.length);try{p.forEach((v,T)=>u.setValue(S+T*d,v,d===4?"i32":"i64"));let $=u._OrtCreateTensor(vt(c),_,y,S,p.length,eo(h));$===0&&he(`Can't create tensor for input/output. session=${n}, index=${i}.`),e.push($)}finally{u.stackRestore(w)}},Pr=async(t,e,r,n,o,i)=>{let s=be(),u=s.PTR_SIZE,d=Bt.get(t);if(!d)throw new Error(`cannot run inference. invalid session id: ${t}`);let c=d[0],p=d[1],m=d[2],h=d[3],_=d[4],y=d[5],w=e.length,S=n.length,$=0,v=[],T=[],I=[],E=[],A=s.stackSave(),D=s.stackAlloc(w*u),B=s.stackAlloc(w*u),R=s.stackAlloc(S*u),x=s.stackAlloc(S*u);try{[$,v]=xs(i),yt("wasm prepareInputOutputTensor");for(let W=0;W<w;W++)await Fc(r[W],T,E,t,p[e[W]],e[W],_);for(let W=0;W<S;W++)await Fc(o[W],I,E,t,m[n[W]],w+n[W],_);_t("wasm prepareInputOutputTensor");for(let W=0;W<w;W++)s.setValue(D+W*u,T[W],"*"),s.setValue(B+W*u,p[e[W]],"*");for(let W=0;W<S;W++)s.setValue(R+W*u,I[W],"*"),s.setValue(x+W*u,m[n[W]],"*");if(h&&!y){let{handle:W,outputPreferredLocations:le,outputPreferredLocationsEncoded:Y}=h;if(p.length!==w)throw new Error(`input count from feeds (${w}) is expected to be always equal to model's input count (${p.length}).`);yt("wasm bindInputsOutputs");for(let z=0;z<w;z++){let K=e[z];await s._OrtBindInput(W,p[K],T[z])!==0&&he(`Can't bind input[${z}] for session=${t}.`)}for(let z=0;z<S;z++){let K=n[z];o[z]?.[3]?s._OrtBindOutput(W,m[K],I[z],0)!==0&&he(`Can't bind pre-allocated output[${z}] for session=${t}.`):s._OrtBindOutput(W,m[K],0,Y[K])!==0&&he(`Can't bind output[${z}] to ${le[z]} for session=${t}.`)}_t("wasm bindInputsOutputs"),Bt.set(t,[c,p,m,h,_,!0])}s.jsepOnRunStart?.(c),s.webnnOnRunStart?.(c);let q;h?q=await s._OrtRunWithBinding(c,h.handle,S,R,$):q=await s._OrtRun(c,B,D,w,x,S,R,$),q!==0&&he("failed to call OrtRun().");let j=[],Z=[];yt("wasm ProcessOutputTensor");for(let W=0;W<S;W++){let le=Number(s.getValue(R+W*u,"*"));if(le===I[W]){j.push(o[W]);continue}let Y=s.stackSave(),z=s.stackAlloc(4*u),K=!1,Q,ie=0;try{s._OrtGetTensorData(le,z,z+u,z+2*u,z+3*u)!==0&&he(`Can't access output tensor data on index ${W}.`);let xe=u===4?"i32":"i64",te=Number(s.getValue(z,xe));ie=s.getValue(z+u,"*");let N=s.getValue(z+u*2,"*"),X=Number(s.getValue(z+u*3,xe)),me=[];for(let Ce=0;Ce<X;Ce++)me.push(Number(s.getValue(N+Ce*u,xe)));s._OrtFree(N)!==0&&he("Can't free memory for tensor dims.");let Oe=me.reduce((Ce,ye)=>Ce*ye,1);Q=et(te);let De=h?.outputPreferredLocations[n[W]];if(Q==="string"){if(De==="gpu-buffer"||De==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Ce=[];for(let ye=0;ye<Oe;ye++){let He=s.getValue(ie+ye*u,"*"),ct=s.getValue(ie+(ye+1)*u,"*"),qt=ye===Oe-1?void 0:ct-He;Ce.push(s.UTF8ToString(He,qt))}j.push([Q,me,Ce,"cpu"])}else if(De==="gpu-buffer"&&Oe>0){let Ce=s.jsepGetBuffer;if(!Ce)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let ye=Ce(ie),He=$t(te,Oe);if(He===void 0||!Rr(Q))throw new Error(`Unsupported data type: ${Q}`);K=!0,j.push([Q,me,{gpuBuffer:ye,download:s.jsepCreateDownloader(ye,He,Q),dispose:()=>{s._OrtReleaseTensor(le)!==0&&he("Can't release tensor.")}},"gpu-buffer"])}else if(De==="ml-tensor"&&Oe>0){let Ce=s.webnnEnsureTensor,ye=s.webnnIsGraphInputOutputTypeSupported;if(!Ce||!ye)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if($t(te,Oe)===void 0||!Ur(Q))throw new Error(`Unsupported data type: ${Q}`);if(!ye(t,Q,!1))throw new Error(`preferredLocation "ml-tensor" for ${Q} output is not supported by current WebNN Context.`);let ct=await Ce(t,ie,te,me,!1);K=!0,j.push([Q,me,{mlTensor:ct,download:s.webnnCreateMLTensorDownloader(ie,Q),dispose:()=>{s.webnnReleaseTensorId(ie),s._OrtReleaseTensor(le)}},"ml-tensor"])}else if(De==="ml-tensor-cpu-output"&&Oe>0){let Ce=s.webnnCreateMLTensorDownloader(ie,Q)(),ye=j.length;K=!0,Z.push((async()=>{let He=[ye,await Ce];return s.webnnReleaseTensorId(ie),s._OrtReleaseTensor(le),He})()),j.push([Q,me,[],"cpu"])}else{let Ce=Vt(Q),ye=new Ce(Oe);new Uint8Array(ye.buffer,ye.byteOffset,ye.byteLength).set(s.HEAPU8.subarray(ie,ie+ye.byteLength)),j.push([Q,me,ye,"cpu"])}}finally{s.stackRestore(Y),Q==="string"&&ie&&s._free(ie),K||s._OrtReleaseTensor(le)}}h&&!_&&(s._OrtClearBoundOutputs(h.handle)!==0&&he("Can't clear bound outputs."),Bt.set(t,[c,p,m,h,_,!1]));for(let[W,le]of await Promise.all(Z))j[W][2]=le;return _t("wasm ProcessOutputTensor"),j}finally{s.webnnOnRunEnd?.(c),s.stackRestore(A),T.forEach(q=>s._OrtReleaseTensor(q)),I.forEach(q=>s._OrtReleaseTensor(q)),E.forEach(q=>s._free(q)),$!==0&&s._OrtReleaseRunOptions($),v.forEach(q=>s._free(q))}},zr=t=>{let e=be(),r=Bt.get(t);if(!r)throw new Error("invalid session id");let n=r[0],o=e._OrtEndProfiling(n);o===0&&he("Can't get an profile file name."),e._OrtFree(o)},Or=t=>{let e=[];for(let r of t){let n=r[2];!Array.isArray(n)&&"buffer"in n&&e.push(n.buffer)}return e}});var Mt,Ge,ur,mn,fn,pn,Mo,Ro,Ht,Ft,Fb,qc,Kc,jc,Zc,Qc,Yc,Xc,Uo=V(()=>{"use strict";Ne();Zn();wt();Tr();Mt=()=>!!_e.wasm.proxy&&typeof document<"u",ur=!1,mn=!1,fn=!1,Ro=new Map,Ht=(t,e)=>{let r=Ro.get(t);r?r.push(e):Ro.set(t,[e])},Ft=()=>{if(ur||!mn||fn||!Ge)throw new Error("worker not ready")},Fb=t=>{switch(t.data.type){case"init-wasm":ur=!1,t.data.err?(fn=!0,Mo[1](t.data.err)):(mn=!0,Mo[0]()),pn&&(URL.revokeObjectURL(pn),pn=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let e=Ro.get(t.data.type);t.data.err?e.shift()[1](t.data.err):e.shift()[0](t.data.out);break}default:}},qc=async()=>{if(!mn){if(ur)throw new Error("multiple calls to 'initWasm()' detected.");if(fn)throw new Error("previous call to 'initWasm()' failed.");if(ur=!0,Mt())return new Promise((t,e)=>{Ge?.terminate(),ws().then(([r,n])=>{try{Ge=n,Ge.onerror=i=>e(i),Ge.onmessage=Fb,Mo=[t,e];let o={type:"init-wasm",in:_e};!o.in.wasm.wasmPaths&&(r||Yn)&&(o.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),Ge.postMessage(o),pn=r}catch(o){e(o)}},e)});try{await Ir(_e.wasm),await Cr(_e),mn=!0}catch(t){throw fn=!0,t}finally{ur=!1}}},Kc=async t=>{if(Mt())return Ft(),new Promise((e,r)=>{Ht("init-ep",[e,r]);let n={type:"init-ep",in:{epName:t,env:_e}};Ge.postMessage(n)});await Ar(_e,t)},jc=async t=>Mt()?(Ft(),new Promise((e,r)=>{Ht("copy-from",[e,r]);let n={type:"copy-from",in:{buffer:t}};Ge.postMessage(n,[t.buffer])})):Jt(t),Zc=async(t,e)=>{if(Mt()){if(e?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Ft(),new Promise((r,n)=>{Ht("create",[r,n]);let o={type:"create",in:{model:t,options:{...e}}},i=[];t instanceof Uint8Array&&i.push(t.buffer),Ge.postMessage(o,i)})}else return Er(t,e)},Qc=async t=>{if(Mt())return Ft(),new Promise((e,r)=>{Ht("release",[e,r]);let n={type:"release",in:t};Ge.postMessage(n)});kr(t)},Yc=async(t,e,r,n,o,i)=>{if(Mt()){if(r.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Ft(),new Promise((s,u)=>{Ht("run",[s,u]);let d=r,c={type:"run",in:{sessionId:t,inputIndices:e,inputs:d,outputIndices:n,options:i}};Ge.postMessage(c,Or(d))})}else return Pr(t,e,r,n,o,i)},Xc=async t=>{if(Mt())return Ft(),new Promise((e,r)=>{Ht("end-profiling",[e,r]);let n={type:"end-profiling",in:t};Ge.postMessage(n)});zr(t)}});var Jc,qb,hn,ep=V(()=>{"use strict";Ne();Uo();J();Sr();to();Jc=(t,e)=>{switch(t.location){case"cpu":return[t.type,t.dims,t.data,"cpu"];case"gpu-buffer":return[t.type,t.dims,{gpuBuffer:t.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[t.type,t.dims,{mlTensor:t.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${t.location} for ${e()}`)}},qb=t=>{switch(t[3]){case"cpu":return new qe(t[0],t[2],t[1]);case"gpu-buffer":{let e=t[0];if(!Rr(e))throw new Error(`not supported data type: ${e} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:o}=t[2];return qe.fromGpuBuffer(r,{dataType:e,dims:t[1],download:n,dispose:o})}case"ml-tensor":{let e=t[0];if(!Ur(e))throw new Error(`not supported data type: ${e} for deserializing MLTensor tensor`);let{mlTensor:r,download:n,dispose:o}=t[2];return qe.fromMLTensor(r,{dataType:e,dims:t[1],download:n,dispose:o})}default:throw new Error(`invalid data location: ${t[3]}`)}},hn=class{async fetchModelAndCopyToWasmMemory(e){return jc(await rr(e))}async loadModel(e,r){Ue();let n;typeof e=="string"?n=await this.fetchModelAndCopyToWasmMemory(e):n=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Zc(n,r),Me()}async dispose(){return Qc(this.sessionId)}async run(e,r,n){Ue();let o=[],i=[];Object.entries(e).forEach(h=>{let _=h[0],y=h[1],w=this.inputNames.indexOf(_);if(w===-1)throw new Error(`invalid input '${_}'`);o.push(y),i.push(w)});let s=[],u=[];Object.entries(r).forEach(h=>{let _=h[0],y=h[1],w=this.outputNames.indexOf(_);if(w===-1)throw new Error(`invalid output '${_}'`);s.push(y),u.push(w)});let d=o.map((h,_)=>Jc(h,()=>`input "${this.inputNames[i[_]]}"`)),c=s.map((h,_)=>h?Jc(h,()=>`output "${this.outputNames[u[_]]}"`):null),p=await Yc(this.sessionId,i,d,u,c,n),m={};for(let h=0;h<p.length;h++)m[this.outputNames[u[h]]]=s[h]??qb(p[h]);return Me(),m}startProfiling(){}endProfiling(){Xc(this.sessionId)}}});var rp={};Nt(rp,{OnnxruntimeWebAssemblyBackend:()=>gn,initializeFlags:()=>tp,wasmBackend:()=>Kb});var tp,gn,Kb,np=V(()=>{"use strict";Ne();Uo();ep();tp=()=>{(typeof _e.wasm.initTimeout!="number"||_e.wasm.initTimeout<0)&&(_e.wasm.initTimeout=0);let t=_e.wasm.simd;if(typeof t!="boolean"&&t!==void 0&&t!=="fixed"&&t!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${t}". Reset it to \`false\` and ignore SIMD feature checking.`),_e.wasm.simd=!1),typeof _e.wasm.proxy!="boolean"&&(_e.wasm.proxy=!1),typeof _e.wasm.trace!="boolean"&&(_e.wasm.trace=!1),typeof _e.wasm.numThreads!="number"||!Number.isInteger(_e.wasm.numThreads)||_e.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)_e.wasm.numThreads=1;else{let e=typeof navigator>"u"?Wn("node:os").cpus().length:navigator.hardwareConcurrency;_e.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},gn=class{async init(e){tp(),await qc(),await Kc(e)}async createInferenceSessionHandler(e,r){let n=new hn;return await n.loadModel(e,r),n}},Kb=new gn});Ne();Ne();Ne();var ss="1.23.0-dev.20250906-ecb26fb775";var oT=jn;{let t=(np(),Yt(rp)).wasmBackend;Et("webgpu",t,5),Et("webnn",t,5),Et("cpu",t,10),Et("wasm",t,10)}Object.defineProperty(_e.versions,"web",{value:ss,enumerable:!0});export{yf as InferenceSession,$r as TRACE,yt as TRACE_EVENT_BEGIN,_t as TRACE_EVENT_END,Ue as TRACE_FUNC_BEGIN,Me as TRACE_FUNC_END,qe as Tensor,oT as default,_e as env,Et as registerBackend};
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
