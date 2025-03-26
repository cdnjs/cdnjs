/*!
 * ONNX Runtime Web v1.21.0-dev.20241205-d27fecd3d3
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var Un=Object.defineProperty;var Bp=Object.getOwnPropertyDescriptor;var Mp=Object.getOwnPropertyNames;var Rp=Object.prototype.hasOwnProperty;var Nn=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var U=(e,t)=>()=>(e&&(t=e(e=0)),t);var Ft=(e,t)=>{for(var r in t)Un(e,r,{get:t[r],enumerable:!0})},Up=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Mp(t))!Rp.call(e,o)&&o!==r&&Un(e,o,{get:()=>t[o],enumerable:!(n=Bp(t,o))||n.enumerable});return e};var yr=e=>Up(Un({},"__esModule",{value:!0}),e);var _r,$t,xt,Np,Xi,Vn=U(()=>{"use strict";_r=new Map,$t=[],xt=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let n=_r.get(e);if(n===void 0)_r.set(e,{backend:t,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let o=$t.indexOf(e);o!==-1&&$t.splice(o,1);for(let i=0;i<$t.length;i++)if(_r.get($t[i]).priority<=r){$t.splice(i,0,e);return}$t.push(e)}return}throw new TypeError("not a valid backend")},Np=async e=>{let t=_r.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(n){return r||(t.error=`${n}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Xi=async e=>{let t=e.executionProviders||[],r=t.map(l=>typeof l=="string"?l:l.name),n=r.length===0?$t:r,o,i=[],a=new Set;for(let l of n){let p=await Np(l);typeof p=="string"?i.push({name:l,err:p}):(o||(o=p),o===p&&a.add(l))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:p}of i)r.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${p}`);let d=t.filter(l=>a.has(typeof l=="string"?l:l.name));return[o,new Proxy(e,{get:(l,p)=>p==="executionProviders"?d:Reflect.get(l,p)})]}});var Ji=U(()=>{"use strict";Vn()});var ea,ta=U(()=>{"use strict";ea="1.21.0-dev.20241205-6ed77cc374"});var ra,Re,Wn=U(()=>{"use strict";ta();ra="warning",Re={wasm:{},webgl:{},webgpu:{},versions:{common:ea},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);ra=e}},get logLevel(){return ra}};Object.defineProperty(Re,"logLevel",{enumerable:!0})});var we,na=U(()=>{"use strict";Wn();we=Re});var oa,ia,aa=U(()=>{"use strict";oa=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(n!=null){let o,i;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[3]):(o=e.dims[3],i=e.dims[2]);let a=t?.format!==void 0?t.format:"RGB",d=t?.norm,l,p;d===void 0||d.mean===void 0?l=[255,255,255,255]:typeof d.mean=="number"?l=[d.mean,d.mean,d.mean,d.mean]:(l=[d.mean[0],d.mean[1],d.mean[2],0],d.mean[3]!==void 0&&(l[3]=d.mean[3])),d===void 0||d.bias===void 0?p=[0,0,0,0]:typeof d.bias=="number"?p=[d.bias,d.bias,d.bias,d.bias]:(p=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(p[3]=d.bias[3]));let m=i*o,u=0,h=m,_=m*2,y=-1;a==="RGBA"?(u=0,h=m,_=m*2,y=m*3):a==="RGB"?(u=0,h=m,_=m*2):a==="RBG"&&(u=0,_=m,h=m*2);for(let g=0;g<i;g++)for(let x=0;x<o;x++){let $=(e.data[u++]-p[0])*l[0],v=(e.data[h++]-p[1])*l[1],S=(e.data[_++]-p[2])*l[2],T=y===-1?255:(e.data[y++]-p[3])*l[3];n.fillStyle="rgba("+$+","+v+","+S+","+T+")",n.fillRect(x,g,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},ia=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(r!=null){let o,i,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[1],a=e.dims[3]):(o=e.dims[3],i=e.dims[2],a=e.dims[1]);let d=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,p,m;l===void 0||l.mean===void 0?p=[255,255,255,255]:typeof l.mean=="number"?p=[l.mean,l.mean,l.mean,l.mean]:(p=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(p[3]=l.mean[3])),l===void 0||l.bias===void 0?m=[0,0,0,0]:typeof l.bias=="number"?m=[l.bias,l.bias,l.bias,l.bias]:(m=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(m[3]=l.bias[3]));let u=i*o;if(t!==void 0&&(t.format!==void 0&&a===4&&t.format!=="RGBA"||a===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let h=4,_=0,y=1,g=2,x=3,$=0,v=u,S=u*2,T=-1;d==="RGBA"?($=0,v=u,S=u*2,T=u*3):d==="RGB"?($=0,v=u,S=u*2):d==="RBG"&&($=0,S=u,v=u*2),n=r.createImageData(o,i);for(let A=0;A<i*o;_+=h,y+=h,g+=h,x+=h,A++)n.data[_]=(e.data[$++]-m[0])*p[0],n.data[y]=(e.data[v++]-m[1])*p[1],n.data[g]=(e.data[S++]-m[2])*p[2],n.data[x]=T===-1?255:(e.data[T++]-m[3])*p[3]}else throw new Error("Can not access image data");return n}});var Ln,sa,ua,da,la,ca,pa=U(()=>{"use strict";wr();Ln=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=t,o=t.norm??{mean:255,bias:0},i,a;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?a=[o.bias,o.bias,o.bias,o.bias]:a=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let d=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",p=r*n,m=l==="RGBA"?new Float32Array(p*4):new Float32Array(p*3),u=4,h=0,_=1,y=2,g=3,x=0,$=p,v=p*2,S=-1;d==="RGB"&&(u=3,h=0,_=1,y=2,g=-1),l==="RGBA"?S=p*3:l==="RBG"?(x=0,v=p,$=p*2):l==="BGR"&&(v=0,$=p,x=p*2);for(let A=0;A<p;A++,h+=u,y+=u,_+=u,g+=u)m[x++]=(e[h]+a[0])/i[0],m[$++]=(e[_]+a[1])/i[1],m[v++]=(e[y]+a[2])/i[2],S!==-1&&g!==-1&&(m[S++]=(e[g]+a[3])/i[3]);return l==="RGBA"?new ze("float32",m,[1,4,r,n]):new ze("float32",m,[1,3,r,n])},sa=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,n=typeof ImageData<"u"&&e instanceof ImageData,o=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,i=typeof e=="string",a,d=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},p=m=>typeof HTMLCanvasElement<"u"&&m instanceof HTMLCanvasElement||m instanceof OffscreenCanvas?m.getContext("2d"):null;if(r){let m=l();m.width=e.width,m.height=e.height;let u=p(m);if(u!=null){let h=e.height,_=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(h=t.resizedHeight,_=t.resizedWidth),t!==void 0){if(d=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");d.tensorFormat="RGBA",d.height=h,d.width=_}else d.tensorFormat="RGBA",d.height=h,d.width=_;u.drawImage(e,0,0),a=u.getImageData(0,0,_,h).data}else throw new Error("Can not access image data")}else if(n){let m,u;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(m=t.resizedHeight,u=t.resizedWidth):(m=e.height,u=e.width),t!==void 0&&(d=t),d.format="RGBA",d.height=m,d.width=u,t!==void 0){let h=l();h.width=u,h.height=m;let _=p(h);if(_!=null)_.putImageData(e,0,0),a=_.getImageData(0,0,u,m).data;else throw new Error("Can not access image data")}else a=e.data}else if(o){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let m=l();m.width=e.width,m.height=e.height;let u=p(m);if(u!=null){let h=e.height,_=e.width;return u.drawImage(e,0,0,_,h),a=u.getImageData(0,0,_,h).data,d.height=h,d.width=_,Ln(a,d)}else throw new Error("Can not access image data")}else{if(i)return new Promise((m,u)=>{let h=l(),_=p(h);if(!e||!_)return u();let y=new Image;y.crossOrigin="Anonymous",y.src=e,y.onload=()=>{h.width=y.width,h.height=y.height,_.drawImage(y,0,0,h.width,h.height);let g=_.getImageData(0,0,h.width,h.height);d.height=h.height,d.width=h.width,m(Ln(g.data,d))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return Ln(a,d);throw new Error("Input data provided is not supported - aborted tensor creation")},ua=(e,t)=>{let{width:r,height:n,download:o,dispose:i}=t,a=[1,n,r,4];return new ze({location:"texture",type:"float32",texture:e,dims:a,download:o,dispose:i})},da=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:i}=t;return new ze({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:o,dispose:i})},la=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:i}=t;return new ze({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:n,download:o,dispose:i})},ca=(e,t,r)=>new ze({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})});var St,qt,ma,fa,ha=U(()=>{"use strict";St=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),qt=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),ma=!1,fa=()=>{if(!ma){ma=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=typeof Float16Array<"u"&&Float16Array.from;e&&(St.set("int64",BigInt64Array),qt.set(BigInt64Array,"int64")),t&&(St.set("uint64",BigUint64Array),qt.set(BigUint64Array,"uint64")),r?(St.set("float16",Float16Array),qt.set(Float16Array,"float16")):St.set("float16",Uint16Array)}}});var ga,ba,ya=U(()=>{"use strict";wr();ga=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},ba=(e,t)=>{switch(e.location){case"cpu":return new ze(e.type,e.data,t);case"cpu-pinned":return new ze({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new ze({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new ze({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new ze({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var ze,wr=U(()=>{"use strict";aa();pa();ha();ya();ze=class{constructor(t,r,n){fa();let o,i;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,o=t.type,i=t.dims,t.location){case"cpu-pinned":{let d=St.get(o);if(!d)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(t.data instanceof d))throw new TypeError(`buffer should be of type ${d.name}`);this.cpuData=t.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let d,l;if(typeof t=="string")if(o=t,l=n,t==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");d=r}else{let p=St.get(t);if(p===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(r)){if(t==="float16"&&p===Uint16Array||t==="uint4"||t==="int4")throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${p.name} as data.`);t==="uint64"||t==="int64"?d=p.from(r,BigInt):d=p.from(r)}else if(r instanceof p)d=r;else if(r instanceof Uint8ClampedArray)if(t==="uint8")d=Uint8Array.from(r);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else throw new TypeError(`A ${o} tensor's data must be type of ${p}`)}else if(l=r,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let p=typeof t[0];if(p==="string")o="string",d=t;else if(p==="boolean")o="bool",d=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${p}.`)}else if(t instanceof Uint8ClampedArray)o="uint8",d=Uint8Array.from(t);else{let p=qt.get(t.constructor);if(p===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);o=p,d=t}if(l===void 0)l=[d.length];else if(!Array.isArray(l))throw new TypeError("A tensor's dims must be a number array");i=l,this.cpuData=d,this.dataLocation="cpu"}let a=ga(i);if(this.cpuData&&a!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=a}static async fromImage(t,r){return sa(t,r)}static fromTexture(t,r){return ua(t,r)}static fromGpuBuffer(t,r){return da(t,r)}static fromMLTensor(t,r){return la(t,r)}static fromPinnedBuffer(t,r,n){return ca(t,r,n)}toDataURL(t){return oa(this,t)}toImageData(t){return ia(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,t&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return ba(this,t)}}});var Ge,Gn=U(()=>{"use strict";wr();Ge=ze});var vr,_a,Ue,De,Hn=U(()=>{"use strict";Wn();vr=(e,t)=>{(typeof Re.trace>"u"?!Re.wasm.trace:!Re.trace)||console.timeStamp(`${e}::ORT::${t}`)},_a=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],n=!1;for(let o=0;o<r.length;o++){if(n&&!r[o].includes("TRACE_FUNC")){let i=`FUNC_${e}::${r[o].trim().split(" ")[1]}`;t&&(i+=`::${t}`),vr("CPU",i);return}r[o].includes("TRACE_FUNC")&&(n=!0)}},Ue=e=>{(typeof Re.trace>"u"?!Re.wasm.trace:!Re.trace)||_a("BEGIN",e)},De=e=>{(typeof Re.trace>"u"?!Re.wasm.trace:!Re.trace)||_a("END",e)}});var $r,wa=U(()=>{"use strict";Vn();Gn();Hn();$r=class e{constructor(t){this.handler=t}async run(t,r,n){Ue();let o={},i={};if(typeof t!="object"||t===null||t instanceof Ge||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Ge)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let p of r){if(typeof p!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(p)===-1)throw new RangeError(`'fetches' contains invalid output name: ${p}.`);o[p]=null}if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let p=!1,m=Object.getOwnPropertyNames(r);for(let u of this.outputNames)if(m.indexOf(u)!==-1){let h=r[u];(h===null||h instanceof Ge)&&(p=!0,a=!1,o[u]=h)}if(p){if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let p of this.inputNames)if(typeof t[p]>"u")throw new Error(`input '${p}' is missing in 'feeds'.`);if(a)for(let p of this.outputNames)o[p]=null;let d=await this.handler.run(t,o,i),l={};for(let p in d)if(Object.hasOwnProperty.call(d,p)){let m=d[p];m instanceof Ge?l[p]=m:l[p]=new Ge(m.type,m.data,m.dims)}return De(),l}async release(){return this.handler.dispose()}static async create(t,r,n,o){Ue();let i,a={};if(typeof t=="string"){if(i=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(i=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let m=t,u=0,h=t.byteLength;if(typeof r=="object"&&r!==null)a=r;else if(typeof r=="number"){if(u=r,!Number.isSafeInteger(u))throw new RangeError("'byteOffset' must be an integer.");if(u<0||u>=m.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${m.byteLength}).`);if(h=t.byteLength-u,typeof n=="number"){if(h=n,!Number.isSafeInteger(h))throw new RangeError("'byteLength' must be an integer.");if(h<=0||u+h>m.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${m.byteLength-u}].`);if(typeof o=="object"&&o!==null)a=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof n<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(m,u,h)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[d,l]=await Xi(a),p=await d.createInferenceSessionHandler(i,l);return De(),new e(p)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var Vp,va=U(()=>{"use strict";wa();Vp=$r});var $a=U(()=>{"use strict"});var xa=U(()=>{"use strict"});var Sa=U(()=>{"use strict"});var Ta=U(()=>{"use strict"});var Fn={};Ft(Fn,{InferenceSession:()=>Vp,TRACE:()=>vr,TRACE_FUNC_BEGIN:()=>Ue,TRACE_FUNC_END:()=>De,Tensor:()=>Ge,env:()=>we,registerBackend:()=>xt});var Ve=U(()=>{"use strict";Ji();na();va();Gn();$a();xa();Hn();Sa();Ta()});var xr=U(()=>{"use strict"});var ka={};Ft(ka,{default:()=>Wp});var Ca,Aa,Wp,Ea=U(()=>{"use strict";qn();ht();Kt();Ca="ort-wasm-proxy-worker",Aa=globalThis.self?.name===Ca;Aa&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":Sr(r.wasm).then(()=>{Tr(r).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})})},n=>{postMessage({type:t,err:n})});break;case"init-ep":{let{epName:n,env:o}=r;Ir(o,n).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})});break}case"copy-from":{let{buffer:n}=r,o=jt(n);postMessage({type:t,out:o});break}case"create":{let{model:n,options:o}=r;Cr(n,o).then(i=>{postMessage({type:t,out:i})},i=>{postMessage({type:t,err:i})});break}case"release":Ar(r),postMessage({type:t});break;case"run":{let{sessionId:n,inputIndices:o,inputs:i,outputIndices:a,options:d}=r;kr(n,o,i,a,new Array(a.length).fill(null),d).then(l=>{l.some(p=>p[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},Pr([...i,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":Er(r),postMessage({type:t});break;default:}}catch(n){postMessage({type:t,err:n})}});Wp=Aa?null:e=>new Worker(e??Bt,{type:"module",name:Ca})});var za={};Ft(za,{default:()=>Lp});var Kn,Pa,Lp,Oa=U(()=>{"use strict";Pa=(Kn=import.meta.url,async function(e={}){function t(){return se.buffer!=te.buffer&&be(),te}function r(){return se.buffer!=te.buffer&&be(),oe}function n(){return se.buffer!=te.buffer&&be(),ve}function o(){return se.buffer!=te.buffer&&be(),Oe}function i(){return se.buffer!=te.buffer&&be(),$e}function a(){return se.buffer!=te.buffer&&be(),le}function d(){return se.buffer!=te.buffer&&be(),V}function l(){return se.buffer!=te.buffer&&be(),Le}var p,m,u=Object.assign({},e),h=new Promise((s,c)=>{p=s,m=c}),_=typeof window=="object",y=typeof importScripts=="function",g=y&&self.name=="em-pthread";u.mountExternalData=(s,c)=>{s.startsWith("./")&&(s=s.substring(2)),(u.Fb||(u.Fb=new Map)).set(s,c)},u.unmountExternalData=()=>{delete u.Fb};var x=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let $=()=>{let s=(f,b,w)=>(...I)=>{let D=Qe,B=b?.();I=f(...I);let L=b?.();return B!==L&&(f=L,w(B),b=w=null),Qe!=D?new Promise((H,Q)=>{En={resolve:H,reject:Q}}):I},c=f=>async(...b)=>{try{if(u.Gb)throw Error("Session already started");let w=u.Gb={hc:b[0],errors:[]},I=await f(...b);if(u.Gb!==w)throw Error("Session mismatch");u.Hb?.flush();let D=w.errors;if(0<D.length){let B=await Promise.all(D);if(B=B.filter(L=>L),0<B.length)throw Error(B.join(`
`))}return I}finally{u.Gb=null}};u._OrtCreateSession=s(u._OrtCreateSession,()=>u._OrtCreateSession,f=>u._OrtCreateSession=f),u._OrtRun=c(s(u._OrtRun,()=>u._OrtRun,f=>u._OrtRun=f)),u._OrtRunWithBinding=c(s(u._OrtRunWithBinding,()=>u._OrtRunWithBinding,f=>u._OrtRunWithBinding=f)),u._OrtBindInput=s(u._OrtBindInput,()=>u._OrtBindInput,f=>u._OrtBindInput=f),$=void 0};u.jsepInit=(s,c)=>{if($?.(),s==="webgpu"){[u.Hb,u.Vb,u.Zb,u.Ob,u.Yb,u.kb,u.$b,u.cc,u.Wb,u.Xb,u.ac]=c;let f=u.Hb;u.jsepRegisterBuffer=(b,w,I,D)=>f.registerBuffer(b,w,I,D),u.jsepGetBuffer=b=>f.getBuffer(b),u.jsepCreateDownloader=(b,w,I)=>f.createDownloader(b,w,I),u.jsepOnCreateSession=b=>{f.onCreateSession(b)},u.jsepOnReleaseSession=b=>{f.onReleaseSession(b)},u.jsepOnRunStart=b=>f.onRunStart(b),u.dc=(b,w)=>{f.upload(b,w)}}else if(s==="webnn"){[u.Hb,u.bc,u.Pb,u.jsepEnsureTensor,u.ec,u.jsepDownloadTensor]=c,u.jsepReleaseTensorId=u.Pb;let f=u.Hb;u.jsepOnRunStart=b=>f.onRunStart(b),u.jsepRegisterMLContext=(b,w)=>{f.registerMLContext(b,w)},u.jsepOnReleaseSession=b=>{f.onReleaseSession(b)},u.jsepCreateMLTensorDownloader=(b,w)=>f.createMLTensorDownloader(b,w),u.jsepRegisterMLTensor=(b,w,I)=>f.registerMLTensor(b,w,I),u.jsepCreateMLContext=b=>f.createMLContext(b),u.jsepRegisterMLConstant=(b,w,I,D,B)=>f.registerMLConstant(b,w,I,D,B,u.Fb)}};var v,S,T=Object.assign({},u),A="./this.program",k=(s,c)=>{throw c},P="";(_||y)&&(y?P=self.location.href:typeof document<"u"&&document.currentScript&&(P=document.currentScript.src),Kn&&(P=Kn),P=P.startsWith("blob:")?"":P.substr(0,P.replace(/[?#].*/,"").lastIndexOf("/")+1),y&&(S=s=>{var c=new XMLHttpRequest;return c.open("GET",s,!1),c.responseType="arraybuffer",c.send(null),new Uint8Array(c.response)}),v=(s,c,f)=>{var b=new XMLHttpRequest;b.open("GET",s,!0),b.responseType="arraybuffer",b.onload=()=>{b.status==200||b.status==0&&b.response?c(b.response):f()},b.onerror=f,b.send(null)});var O,R=console.log.bind(console),G=console.error.bind(console),q=R,j=G;if(Object.assign(u,T),T=null,g){let s=function(c){try{var f=c.data,b=f.cmd;if(b==="load"){let w=[];self.onmessage=I=>w.push(I),self.startWorker=()=>{postMessage({cmd:"loaded"});for(let I of w)s(I);self.onmessage=s};for(let I of f.handlers)u[I]&&!u[I].proxy||(u[I]=(...D)=>{postMessage({Nb:"callHandler",pc:I,args:D})},I=="print"&&(q=u[I]),I=="printErr"&&(j=u[I]));se=f.wasmMemory,be(),W(f.wasmModule)}else if(b==="run"){Dn(f.pthread_ptr,0,0,1,0,0),An(f.pthread_ptr),yc(),Go(),Y||(Vi(),Y=!0);try{_c(f.start_routine,f.arg)}catch(w){if(w!="unwind")throw w}}else b==="cancel"?Dt()&&gr(-1):f.target!=="setimmediate"&&(b==="checkMailbox"?Y&&ar():b&&(j(`worker: received unknown command ${b}`),j(f)))}catch(w){throw Wi(),w}};var hg=s,W,Y=!1;j=function(...c){c=c.join(" "),console.error(c)},self.alert=function(...c){postMessage({Nb:"alert",text:c.join(" "),rc:Dt()})},u.instantiateWasm=(c,f)=>new Promise(b=>{W=w=>{w=new WebAssembly.Instance(w,Uo()),f(w),b()}}),self.onunhandledrejection=c=>{throw c.reason||c},self.onmessage=s}u.wasmBinary&&(O=u.wasmBinary);var se,X,re,te,oe,ve,Oe,$e,le,V,K,he,Le,_e=!1;function be(){var s=se.buffer;u.HEAP8=te=new Int8Array(s),u.HEAP16=ve=new Int16Array(s),u.HEAPU8=oe=new Uint8Array(s),u.HEAPU16=Oe=new Uint16Array(s),u.HEAP32=$e=new Int32Array(s),u.HEAPU32=le=new Uint32Array(s),u.HEAPF32=V=new Float32Array(s),u.HEAPF64=Le=new Float64Array(s),u.HEAP64=K=new BigInt64Array(s),u.HEAPU64=he=new BigUint64Array(s)}if(!g){if(!((se=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0})).buffer instanceof x))throw j("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),Error("bad memory");be()}var je=[],Lt=[],fn=[],Gt=0,hn=null,Ht=null;function Oo(){if(--Gt==0&&(hn!==null&&(clearInterval(hn),hn=null),Ht)){var s=Ht;Ht=null,s()}}function lt(s){throw j(s="Aborted("+s+")"),_e=!0,re=1,s=new WebAssembly.RuntimeError(s+". Build with -sASSERTIONS for more info."),m(s),s}var gn,Do=s=>s.startsWith("data:application/octet-stream;base64,"),Bo=s=>s.startsWith("file://");function Mo(s){if(s==gn&&O)return new Uint8Array(O);if(S)return S(s);throw"both async and sync fetching of the wasm failed"}function Ro(s,c,f){return function(b){if(!O&&(_||y)){if(typeof fetch=="function"&&!Bo(b))return fetch(b,{credentials:"same-origin"}).then(w=>{if(!w.ok)throw`failed to load wasm binary file at '${b}'`;return w.arrayBuffer()}).catch(()=>Mo(b));if(v)return new Promise((w,I)=>{v(b,D=>w(new Uint8Array(D)),I)})}return Promise.resolve().then(()=>Mo(b))}(s).then(b=>WebAssembly.instantiate(b,c)).then(f,b=>{j(`failed to asynchronously prepare wasm: ${b}`),lt(b)})}function Uo(){return{a:{O:bc,Aa:gc,b:vc,aa:Ko,B:Zo,qa:Qo,Y:Jo,_:ei,ra:ti,oa:ri,ha:ni,na:oi,L:ii,Z:ai,W:si,pa:ui,X:di,va:$c,F:Sc,Q:Tc,P:Cc,E:kc,u:Ec,q:Pc,G:zc,A:Nc,R:Vc,ua:Wc,ka:Lc,U:Gc,ba:Hc,H:Fc,ja:An,ta:qc,t:Kc,Ba:jc,x:Qc,n:Xc,l:ep,c:In,o:tp,j:op,w:ip,p:ap,f:sp,s:up,m:dp,e:lp,k:cp,i:pp,h:mp,d:fp,ea:hp,fa:gp,ga:bp,ca:xi,da:Si,T:yp,g:_p,D:wp,I:vp,M:$p,y:xp,sa:Sp,V:Tp,v:Ii,z:Ip,N:Cp,S:Ap,za:kp,ya:Ep,la:ki,ma:Ei,$:vn,C:Pi,K:zi,ia:Oi,J:Di,a:se,xa:wn,wa:Ri,r:Op}}}var bn={874308:(s,c,f,b,w)=>{if(u===void 0||!u.Fb)return 1;if((s=Te(Number(s>>>0))).startsWith("./")&&(s=s.substring(2)),!(s=u.Fb.get(s)))return 2;if(c=Number(c>>>0),f=Number(f>>>0),b=Number(b>>>0),c+f>s.byteLength)return 3;try{let I=s.subarray(c,c+f);switch(w){case 0:r().set(I,b>>>0);break;case 1:u.dc(b,I);break;default:return 4}return 0}catch{return 4}},875023:(s,c,f)=>{u.ec(s,r().subarray(c>>>0,c+f>>>0))},875086:()=>u.bc(),875127:s=>{u.Pb(s)},875163:()=>{u.Wb()},875194:()=>{u.Xb()},875223:()=>{u.ac()},875248:s=>u.Vb(s),875281:s=>u.Zb(s),875313:(s,c,f)=>{u.Ob(Number(s),Number(c),Number(f),!0)},875376:(s,c,f)=>{u.Ob(Number(s),Number(c),Number(f))},875433:()=>typeof wasmOffsetConverter<"u",875490:s=>{u.kb("Abs",s,void 0)},875541:s=>{u.kb("Neg",s,void 0)},875592:s=>{u.kb("Floor",s,void 0)},875645:s=>{u.kb("Ceil",s,void 0)},875697:s=>{u.kb("Reciprocal",s,void 0)},875755:s=>{u.kb("Sqrt",s,void 0)},875807:s=>{u.kb("Exp",s,void 0)},875858:s=>{u.kb("Erf",s,void 0)},875909:s=>{u.kb("Sigmoid",s,void 0)},875964:(s,c,f)=>{u.kb("HardSigmoid",s,{alpha:c,beta:f})},876043:s=>{u.kb("Log",s,void 0)},876094:s=>{u.kb("Sin",s,void 0)},876145:s=>{u.kb("Cos",s,void 0)},876196:s=>{u.kb("Tan",s,void 0)},876247:s=>{u.kb("Asin",s,void 0)},876299:s=>{u.kb("Acos",s,void 0)},876351:s=>{u.kb("Atan",s,void 0)},876403:s=>{u.kb("Sinh",s,void 0)},876455:s=>{u.kb("Cosh",s,void 0)},876507:s=>{u.kb("Asinh",s,void 0)},876560:s=>{u.kb("Acosh",s,void 0)},876613:s=>{u.kb("Atanh",s,void 0)},876666:s=>{u.kb("Tanh",s,void 0)},876718:s=>{u.kb("Not",s,void 0)},876769:(s,c,f)=>{u.kb("Clip",s,{min:c,max:f})},876838:s=>{u.kb("Clip",s,void 0)},876890:(s,c)=>{u.kb("Elu",s,{alpha:c})},876948:s=>{u.kb("Gelu",s,void 0)},877e3:s=>{u.kb("Relu",s,void 0)},877052:(s,c)=>{u.kb("LeakyRelu",s,{alpha:c})},877116:(s,c)=>{u.kb("ThresholdedRelu",s,{alpha:c})},877186:(s,c)=>{u.kb("Cast",s,{to:c})},877244:s=>{u.kb("Add",s,void 0)},877295:s=>{u.kb("Sub",s,void 0)},877346:s=>{u.kb("Mul",s,void 0)},877397:s=>{u.kb("Div",s,void 0)},877448:s=>{u.kb("Pow",s,void 0)},877499:s=>{u.kb("Equal",s,void 0)},877552:s=>{u.kb("Greater",s,void 0)},877607:s=>{u.kb("GreaterOrEqual",s,void 0)},877669:s=>{u.kb("Less",s,void 0)},877721:s=>{u.kb("LessOrEqual",s,void 0)},877780:(s,c,f,b,w)=>{u.kb("ReduceMean",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},877955:(s,c,f,b,w)=>{u.kb("ReduceMax",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},878129:(s,c,f,b,w)=>{u.kb("ReduceMin",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},878303:(s,c,f,b,w)=>{u.kb("ReduceProd",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},878478:(s,c,f,b,w)=>{u.kb("ReduceSum",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},878652:(s,c,f,b,w)=>{u.kb("ReduceL1",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},878825:(s,c,f,b,w)=>{u.kb("ReduceL2",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},878998:(s,c,f,b,w)=>{u.kb("ReduceLogSum",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},879175:(s,c,f,b,w)=>{u.kb("ReduceSumSquare",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},879355:(s,c,f,b,w)=>{u.kb("ReduceLogSumExp",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},879535:s=>{u.kb("Where",s,void 0)},879588:(s,c,f)=>{u.kb("Transpose",s,{perm:c?Array.from(i().subarray(Number(c)>>>0,Number(f)>>>0)):[]})},879712:(s,c,f,b)=>{u.kb("DepthToSpace",s,{blocksize:c,mode:Te(f),format:b?"NHWC":"NCHW"})},879845:(s,c,f,b)=>{u.kb("DepthToSpace",s,{blocksize:c,mode:Te(f),format:b?"NHWC":"NCHW"})},879978:(s,c,f,b,w,I,D,B,L,H,Q,ce,ge,z,de)=>{u.kb("ConvTranspose",s,{format:L?"NHWC":"NCHW",autoPad:c,dilations:[f],group:b,kernelShape:[w],pads:[I,D],strides:[B],wIsConst:()=>!!t()[H>>>0],outputPadding:Q?Array.from(i().subarray(Number(Q)>>>0,Number(ce)>>>0)):[],outputShape:ge?Array.from(i().subarray(Number(ge)>>>0,Number(z)>>>0)):[],activation:Te(de)})},880411:(s,c,f,b,w,I,D,B,L,H,Q,ce,ge,z)=>{u.kb("ConvTranspose",s,{format:B?"NHWC":"NCHW",autoPad:c,dilations:Array.from(i().subarray(Number(f)>>>0,2+(Number(f)>>>0)>>>0)),group:b,kernelShape:Array.from(i().subarray(Number(w)>>>0,2+(Number(w)>>>0)>>>0)),pads:Array.from(i().subarray(Number(I)>>>0,4+(Number(I)>>>0)>>>0)),strides:Array.from(i().subarray(Number(D)>>>0,2+(Number(D)>>>0)>>>0)),wIsConst:()=>!!t()[L>>>0],outputPadding:H?Array.from(i().subarray(Number(H)>>>0,Number(Q)>>>0)):[],outputShape:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[],activation:Te(z)})},881072:(s,c,f,b,w,I,D,B,L,H,Q,ce,ge,z,de)=>{u.kb("ConvTranspose",s,{format:L?"NHWC":"NCHW",autoPad:c,dilations:[f],group:b,kernelShape:[w],pads:[I,D],strides:[B],wIsConst:()=>!!t()[H>>>0],outputPadding:Q?Array.from(i().subarray(Number(Q)>>>0,Number(ce)>>>0)):[],outputShape:ge?Array.from(i().subarray(Number(ge)>>>0,Number(z)>>>0)):[],activation:Te(de)})},881505:(s,c,f,b,w,I,D,B,L,H,Q,ce,ge,z)=>{u.kb("ConvTranspose",s,{format:B?"NHWC":"NCHW",autoPad:c,dilations:Array.from(i().subarray(Number(f)>>>0,2+(Number(f)>>>0)>>>0)),group:b,kernelShape:Array.from(i().subarray(Number(w)>>>0,2+(Number(w)>>>0)>>>0)),pads:Array.from(i().subarray(Number(I)>>>0,4+(Number(I)>>>0)>>>0)),strides:Array.from(i().subarray(Number(D)>>>0,2+(Number(D)>>>0)>>>0)),wIsConst:()=>!!t()[L>>>0],outputPadding:H?Array.from(i().subarray(Number(H)>>>0,Number(Q)>>>0)):[],outputShape:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[],activation:Te(z)})},882166:(s,c)=>{u.kb("GlobalAveragePool",s,{format:c?"NHWC":"NCHW"})},882257:(s,c,f,b,w,I,D,B,L,H,Q,ce,ge,z)=>{u.kb("AveragePool",s,{format:z?"NHWC":"NCHW",auto_pad:c,ceil_mode:f,count_include_pad:b,storage_order:w,dilations:I?Array.from(i().subarray(Number(I)>>>0,Number(D)>>>0)):[],kernel_shape:B?Array.from(i().subarray(Number(B)>>>0,Number(L)>>>0)):[],pads:H?Array.from(i().subarray(Number(H)>>>0,Number(Q)>>>0)):[],strides:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[]})},882736:(s,c)=>{u.kb("GlobalAveragePool",s,{format:c?"NHWC":"NCHW"})},882827:(s,c,f,b,w,I,D,B,L,H,Q,ce,ge,z)=>{u.kb("AveragePool",s,{format:z?"NHWC":"NCHW",auto_pad:c,ceil_mode:f,count_include_pad:b,storage_order:w,dilations:I?Array.from(i().subarray(Number(I)>>>0,Number(D)>>>0)):[],kernel_shape:B?Array.from(i().subarray(Number(B)>>>0,Number(L)>>>0)):[],pads:H?Array.from(i().subarray(Number(H)>>>0,Number(Q)>>>0)):[],strides:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[]})},883306:(s,c)=>{u.kb("GlobalMaxPool",s,{format:c?"NHWC":"NCHW"})},883393:(s,c,f,b,w,I,D,B,L,H,Q,ce,ge,z)=>{u.kb("MaxPool",s,{format:z?"NHWC":"NCHW",auto_pad:c,ceil_mode:f,count_include_pad:b,storage_order:w,dilations:I?Array.from(i().subarray(Number(I)>>>0,Number(D)>>>0)):[],kernel_shape:B?Array.from(i().subarray(Number(B)>>>0,Number(L)>>>0)):[],pads:H?Array.from(i().subarray(Number(H)>>>0,Number(Q)>>>0)):[],strides:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[]})},883868:(s,c)=>{u.kb("GlobalMaxPool",s,{format:c?"NHWC":"NCHW"})},883955:(s,c,f,b,w,I,D,B,L,H,Q,ce,ge,z)=>{u.kb("MaxPool",s,{format:z?"NHWC":"NCHW",auto_pad:c,ceil_mode:f,count_include_pad:b,storage_order:w,dilations:I?Array.from(i().subarray(Number(I)>>>0,Number(D)>>>0)):[],kernel_shape:B?Array.from(i().subarray(Number(B)>>>0,Number(L)>>>0)):[],pads:H?Array.from(i().subarray(Number(H)>>>0,Number(Q)>>>0)):[],strides:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[]})},884430:(s,c,f,b,w)=>{u.kb("Gemm",s,{alpha:c,beta:f,transA:b,transB:w})},884534:s=>{u.kb("MatMul",s,void 0)},884588:(s,c,f,b)=>{u.kb("ArgMax",s,{keepDims:!!c,selectLastIndex:!!f,axis:b})},884696:(s,c,f,b)=>{u.kb("ArgMin",s,{keepDims:!!c,selectLastIndex:!!f,axis:b})},884804:(s,c)=>{u.kb("Softmax",s,{axis:c})},884867:(s,c)=>{u.kb("Concat",s,{axis:c})},884927:(s,c,f,b,w)=>{u.kb("Split",s,{axis:c,numOutputs:f,splitSizes:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},885083:s=>{u.kb("Expand",s,void 0)},885137:(s,c)=>{u.kb("Gather",s,{axis:Number(c)})},885208:(s,c)=>{u.kb("GatherElements",s,{axis:Number(c)})},885287:(s,c)=>{u.kb("GatherND",s,{batch_dims:Number(c)})},885366:(s,c,f,b,w,I,D,B,L,H,Q)=>{u.kb("Resize",s,{antialias:c,axes:f?Array.from(i().subarray(Number(f)>>>0,Number(b)>>>0)):[],coordinateTransformMode:Te(w),cubicCoeffA:I,excludeOutside:D,extrapolationValue:B,keepAspectRatioPolicy:Te(L),mode:Te(H),nearestMode:Te(Q)})},885728:(s,c,f,b,w,I,D)=>{u.kb("Slice",s,{starts:c?Array.from(i().subarray(Number(c)>>>0,Number(f)>>>0)):[],ends:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[],axes:I?Array.from(i().subarray(Number(I)>>>0,Number(D)>>>0)):[]})},885992:s=>{u.kb("Tile",s,void 0)},886044:(s,c,f)=>{u.kb("InstanceNormalization",s,{epsilon:c,format:f?"NHWC":"NCHW"})},886158:(s,c,f)=>{u.kb("InstanceNormalization",s,{epsilon:c,format:f?"NHWC":"NCHW"})},886272:s=>{u.kb("Range",s,void 0)},886325:(s,c)=>{u.kb("Einsum",s,{equation:Te(c)})},886406:(s,c,f,b,w)=>{u.kb("Pad",s,{mode:c,value:f,pads:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},886549:(s,c,f,b,w,I)=>{u.kb("BatchNormalization",s,{epsilon:c,momentum:f,spatial:!!w,trainingMode:!!b,format:I?"NHWC":"NCHW"})},886718:(s,c,f,b,w,I)=>{u.kb("BatchNormalization",s,{epsilon:c,momentum:f,spatial:!!w,trainingMode:!!b,format:I?"NHWC":"NCHW"})},886887:(s,c,f)=>{u.kb("CumSum",s,{exclusive:Number(c),reverse:Number(f)})},886984:(s,c,f)=>{u.kb("DequantizeLinear",s,{axis:c,blockSize:f})},887074:(s,c,f,b,w)=>{u.kb("GridSample",s,{align_corners:c,mode:Te(f),padding_mode:Te(b),format:w?"NHWC":"NCHW"})},887244:(s,c,f,b,w)=>{u.kb("GridSample",s,{align_corners:c,mode:Te(f),padding_mode:Te(b),format:w?"NHWC":"NCHW"})},887414:(s,c)=>{u.kb("ScatterND",s,{reduction:Te(c)})},887499:(s,c,f,b,w,I,D,B,L)=>{u.kb("Attention",s,{numHeads:c,isUnidirectional:f,maskFilterValue:b,scale:w,doRotary:I,qkvHiddenSizes:D?Array.from(i().subarray(Number(B)>>>0,Number(B)+D>>>0)):[],pastPresentShareBuffer:!!L})},887771:s=>{u.kb("BiasAdd",s,void 0)},887826:s=>{u.kb("BiasSplitGelu",s,void 0)},887887:s=>{u.kb("FastGelu",s,void 0)},887943:(s,c,f,b,w,I,D,B,L,H,Q,ce,ge,z,de,Ie)=>{u.kb("Conv",s,{format:ce?"NHWC":"NCHW",auto_pad:c,dilations:f?Array.from(i().subarray(Number(f)>>>0,Number(b)>>>0)):[],group:w,kernel_shape:I?Array.from(i().subarray(Number(I)>>>0,Number(D)>>>0)):[],pads:B?Array.from(i().subarray(Number(B)>>>0,Number(L)>>>0)):[],strides:H?Array.from(i().subarray(Number(H)>>>0,Number(Q)>>>0)):[],w_is_const:()=>!!t()[Number(ge)>>>0],activation:Te(z),activation_params:de?Array.from(d().subarray(Number(de)>>>0,Number(Ie)>>>0)):[]})},888527:s=>{u.kb("Gelu",s,void 0)},888579:(s,c,f,b,w,I,D,B,L)=>{u.kb("GroupQueryAttention",s,{numHeads:c,kvNumHeads:f,scale:b,softcap:w,doRotary:I,rotaryInterleaved:D,smoothSoftmax:B,localWindowSize:L})},888796:(s,c,f,b)=>{u.kb("LayerNormalization",s,{axis:c,epsilon:f,simplified:!!b})},888907:(s,c,f,b)=>{u.kb("LayerNormalization",s,{axis:c,epsilon:f,simplified:!!b})},889018:(s,c,f,b,w,I)=>{u.kb("MatMulNBits",s,{k:c,n:f,accuracyLevel:b,bits:w,blockSize:I})},889145:(s,c,f,b,w,I)=>{u.kb("MultiHeadAttention",s,{numHeads:c,isUnidirectional:f,maskFilterValue:b,scale:w,doRotary:I})},889304:(s,c)=>{u.kb("QuickGelu",s,{alpha:c})},889368:(s,c,f,b,w)=>{u.kb("RotaryEmbedding",s,{interleaved:!!c,numHeads:f,rotaryEmbeddingDim:b,scale:w})},889507:(s,c,f)=>{u.kb("SkipLayerNormalization",s,{epsilon:c,simplified:!!f})},889609:(s,c,f)=>{u.kb("SkipLayerNormalization",s,{epsilon:c,simplified:!!f})},889711:(s,c,f,b)=>{u.kb("GatherBlockQuantized",s,{gatherAxis:c,quantizeAxis:f,blockSize:b})},889832:s=>{u.$b(s)},889866:(s,c)=>u.cc(Number(s),Number(c),u.Gb.hc,u.Gb.errors)};function gc(s,c,f){return yi(async()=>{await u.Yb(Number(s),Number(c),Number(f))})}function bc(){return typeof wasmOffsetConverter<"u"}function yn(s){this.name="ExitStatus",this.message=`Program terminated with exit(${s})`,this.status=s}var _n=s=>{s.terminate(),s.onmessage=()=>{}},No=s=>{ct.length==0&&(Fo(),Ho(ct[0]));var c=ct.pop();if(!c)return 6;wt.push(c),Ye[s.Bb]=c,c.Bb=s.Bb;var f={cmd:"run",start_routine:s.ic,arg:s.Rb,pthread_ptr:s.Bb};return c.postMessage(f,s.nc),0},_t=0,xe=(s,c,...f)=>{for(var b=2*f.length,w=Rn(),I=Mn(8*b),D=I>>>3,B=0;B<f.length;B++){var L=f[B];typeof L=="bigint"?(K[D+2*B]=1n,K[D+2*B+1]=L):(K[D+2*B]=0n,l()[D+2*B+1>>>0]=L)}return s=Li(s,0,b,I,c),br(w),s};function wn(s){if(g)return xe(0,1,s);if(re=s,!(0<_t)){for(var c of wt)_n(c);for(c of ct)_n(c);ct=[],wt=[],Ye=[],_e=!0}k(s,new yn(s))}function Vo(s){if(g)return xe(1,0,s);vn(s)}var vn=s=>{if(re=s,g)throw Vo(s),"unwind";wn(s)},ct=[],wt=[],Wo=[],Ye={},Lo=s=>{var c=s.Bb;delete Ye[c],ct.push(s),wt.splice(wt.indexOf(s),1),s.Bb=0,Bn(c)};function Go(){Wo.forEach(s=>s())}var Ho=s=>new Promise(c=>{s.onmessage=w=>{var I=(w=w.data).cmd;if(w.targetThread&&w.targetThread!=Dt()){var D=Ye[w.targetThread];D?D.postMessage(w,w.transferList):j(`Internal error! Worker sent a message "${I}" to target pthread ${w.targetThread}, but that thread no longer exists!`)}else I==="checkMailbox"?ar():I==="spawnThread"?No(w):I==="cleanupThread"?Lo(Ye[w.thread]):I==="killThread"?(w=w.thread,I=Ye[w],delete Ye[w],_n(I),Bn(w),wt.splice(wt.indexOf(I),1),I.Bb=0):I==="cancelThread"?Ye[w.thread].postMessage({cmd:"cancel"}):I==="loaded"?(s.loaded=!0,c(s)):I==="alert"?alert(`Thread ${w.threadId}: ${w.text}`):w.target==="setimmediate"?s.postMessage(w):I==="callHandler"?u[w.handler](...w.args):I&&j(`worker sent an unknown command ${I}`)},s.onerror=w=>{throw j(`worker sent an error! ${w.filename}:${w.lineno}: ${w.message}`),w};var f,b=[];for(f of[])u.hasOwnProperty(f)&&b.push(f);s.postMessage({cmd:"load",handlers:b,wasmMemory:se,wasmModule:X})});function Fo(){var s=new Worker(new URL(import.meta.url),{type:"module",workerData:"em-pthread",name:"em-pthread"});ct.push(s)}var ir=s=>{for(;0<s.length;)s.shift()(u)},yc=()=>{var s=Dt(),c=a()[s+52>>>2>>>0];s=a()[s+56>>>2>>>0],Hi(c,c-s),br(c)},_c=(s,c)=>{_t=0,s=Fi(s,c),0<_t?re=s:gr(s)};class wc{constructor(c){this.Kb=c-24}}function vc(s,c,f){var b=new wc(s>>>=0);throw c>>>=0,f>>>=0,a()[b.Kb+16>>>2>>>0]=0,a()[b.Kb+4>>>2>>>0]=c,a()[b.Kb+8>>>2>>>0]=f,s}function qo(s,c,f,b){return g?xe(2,1,s,c,f,b):Ko(s,c,f,b)}function Ko(s,c,f,b){if(s>>>=0,c>>>=0,f>>>=0,b>>>=0,x===void 0)return j("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var w=[];return g&&w.length===0?qo(s,c,f,b):(s={ic:f,Bb:s,Rb:b,nc:w},g?(s.Nb="spawnThread",postMessage(s,w),0):No(s))}var jo=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,Yo=(s,c,f)=>{var b=(c>>>=0)+f;for(f=c;s[f]&&!(f>=b);)++f;if(16<f-c&&s.buffer&&jo)return jo.decode(s.buffer instanceof x?s.slice(c,f):s.subarray(c,f));for(b="";c<f;){var w=s[c++];if(128&w){var I=63&s[c++];if((224&w)==192)b+=String.fromCharCode((31&w)<<6|I);else{var D=63&s[c++];65536>(w=(240&w)==224?(15&w)<<12|I<<6|D:(7&w)<<18|I<<12|D<<6|63&s[c++])?b+=String.fromCharCode(w):(w-=65536,b+=String.fromCharCode(55296|w>>10,56320|1023&w))}}else b+=String.fromCharCode(w)}return b},Te=(s,c)=>(s>>>=0)?Yo(r(),s,c):"";function Zo(s,c,f){return g?xe(3,1,s,c,f):0}function Qo(s,c){if(g)return xe(4,1,s,c)}var $n=s=>{for(var c=0,f=0;f<s.length;++f){var b=s.charCodeAt(f);127>=b?c++:2047>=b?c+=2:55296<=b&&57343>=b?(c+=4,++f):c+=3}return c},Xo=(s,c,f,b)=>{if(!(0<b))return 0;var w=f>>>=0;b=f+b-1;for(var I=0;I<s.length;++I){var D=s.charCodeAt(I);if(55296<=D&&57343>=D&&(D=65536+((1023&D)<<10)|1023&s.charCodeAt(++I)),127>=D){if(f>=b)break;c[f++>>>0]=D}else{if(2047>=D){if(f+1>=b)break;c[f++>>>0]=192|D>>6}else{if(65535>=D){if(f+2>=b)break;c[f++>>>0]=224|D>>12}else{if(f+3>=b)break;c[f++>>>0]=240|D>>18,c[f++>>>0]=128|D>>12&63}c[f++>>>0]=128|D>>6&63}c[f++>>>0]=128|63&D}}return c[f>>>0]=0,f-w},Pt=(s,c,f)=>Xo(s,r(),c,f);function Jo(s,c){if(g)return xe(5,1,s,c)}function ei(s,c,f){if(g)return xe(6,1,s,c,f)}function ti(s,c,f){return g?xe(7,1,s,c,f):0}function ri(s,c){if(g)return xe(8,1,s,c)}function ni(s,c,f){if(g)return xe(9,1,s,c,f)}function oi(s,c,f,b){if(g)return xe(10,1,s,c,f,b)}function ii(s,c,f,b){if(g)return xe(11,1,s,c,f,b)}function ai(s,c,f,b){if(g)return xe(12,1,s,c,f,b)}function si(s){if(g)return xe(13,1,s)}function ui(s,c){if(g)return xe(14,1,s,c)}function di(s,c,f){if(g)return xe(15,1,s,c,f)}var li,pt,$c=()=>{lt("")},Ze=s=>{for(var c="";r()[s>>>0];)c+=li[r()[s++>>>0]];return c},xn={},Sn={},xc={};function at(s,c,f={}){if(!("argPackAdvance"in c))throw new TypeError("registerType registeredInstance requires argPackAdvance");return function(b,w,I={}){var D=w.name;if(!b)throw new pt(`type "${D}" must have a positive integer typeid pointer`);if(Sn.hasOwnProperty(b)){if(I.Tb)return;throw new pt(`Cannot register type '${D}' twice`)}Sn[b]=w,delete xc[b],xn.hasOwnProperty(b)&&(w=xn[b],delete xn[b],w.forEach(B=>B()))}(s,c,f)}var ci=(s,c,f)=>{switch(c){case 1:return f?b=>t()[b>>>0]:b=>r()[b>>>0];case 2:return f?b=>n()[b>>>1>>>0]:b=>o()[b>>>1>>>0];case 4:return f?b=>i()[b>>>2>>>0]:b=>a()[b>>>2>>>0];case 8:return f?b=>K[b>>>3]:b=>he[b>>>3];default:throw new TypeError(`invalid integer width (${c}): ${s}`)}};function Sc(s,c,f){f>>>=0,at(s>>>=0,{name:c=Ze(c>>>0),fromWireType:b=>b,toWireType:function(b,w){if(typeof w!="bigint"&&typeof w!="number")throw w=w===null?"null":(b=typeof w)=="object"||b==="array"||b==="function"?w.toString():""+w,new TypeError(`Cannot convert "${w}" to ${this.name}`);return typeof w=="number"&&(w=BigInt(w)),w},argPackAdvance:mt,readValueFromPointer:ci(c,f,c.indexOf("u")==-1),Eb:null})}var mt=8;function Tc(s,c,f,b){at(s>>>=0,{name:c=Ze(c>>>0),fromWireType:function(w){return!!w},toWireType:function(w,I){return I?f:b},argPackAdvance:mt,readValueFromPointer:function(w){return this.fromWireType(r()[w>>>0])},Eb:null})}var Tn=[],st=[];function In(s){9<(s>>>=0)&&--st[s+1]==0&&(st[s]=void 0,Tn.push(s))}var Me=s=>{if(!s)throw new pt("Cannot use deleted val. handle = "+s);return st[s]},Ne=s=>{switch(s){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let c=Tn.pop()||st.length;return st[c]=s,st[c+1]=1,c}};function Cn(s){return this.fromWireType(a()[s>>>2>>>0])}var Ic={name:"emscripten::val",fromWireType:s=>{var c=Me(s);return In(s),c},toWireType:(s,c)=>Ne(c),argPackAdvance:mt,readValueFromPointer:Cn,Eb:null};function Cc(s){return at(s>>>0,Ic)}var Ac=(s,c)=>{switch(c){case 4:return function(f){return this.fromWireType(d()[f>>>2>>>0])};case 8:return function(f){return this.fromWireType(l()[f>>>3>>>0])};default:throw new TypeError(`invalid float width (${c}): ${s}`)}};function kc(s,c,f){f>>>=0,at(s>>>=0,{name:c=Ze(c>>>0),fromWireType:b=>b,toWireType:(b,w)=>w,argPackAdvance:mt,readValueFromPointer:Ac(c,f),Eb:null})}function Ec(s,c,f,b,w){if(s>>>=0,f>>>=0,c=Ze(c>>>0),w===-1&&(w=4294967295),w=B=>B,b===0){var I=32-8*f;w=B=>B<<I>>>I}var D=c.includes("unsigned")?function(B,L){return L>>>0}:function(B,L){return L};at(s,{name:c,fromWireType:w,toWireType:D,argPackAdvance:mt,readValueFromPointer:ci(c,f,b!==0),Eb:null})}function Pc(s,c,f){function b(I){var D=a()[I>>>2>>>0];return I=a()[I+4>>>2>>>0],new w(t().buffer,I,D)}var w=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][c];at(s>>>=0,{name:f=Ze(f>>>0),fromWireType:b,argPackAdvance:mt,readValueFromPointer:b},{Tb:!0})}function zc(s,c){s>>>=0;var f=(c=Ze(c>>>0))==="std::string";at(s,{name:c,fromWireType:function(b){var w=a()[b>>>2>>>0],I=b+4;if(f)for(var D=I,B=0;B<=w;++B){var L=I+B;if(B==w||r()[L>>>0]==0){if(D=Te(D,L-D),H===void 0)var H=D;else H+=String.fromCharCode(0),H+=D;D=L+1}}else{for(H=Array(w),B=0;B<w;++B)H[B]=String.fromCharCode(r()[I+B>>>0]);H=H.join("")}return Xe(b),H},toWireType:function(b,w){w instanceof ArrayBuffer&&(w=new Uint8Array(w));var I=typeof w=="string";if(!(I||w instanceof Uint8Array||w instanceof Uint8ClampedArray||w instanceof Int8Array))throw new pt("Cannot pass non-string to std::string");var D=f&&I?$n(w):w.length,B=hr(4+D+1),L=B+4;if(a()[B>>>2>>>0]=D,f&&I)Pt(w,L,D+1);else if(I)for(I=0;I<D;++I){var H=w.charCodeAt(I);if(255<H)throw Xe(L),new pt("String has UTF-16 code units that do not fit in 8 bits");r()[L+I>>>0]=H}else for(I=0;I<D;++I)r()[L+I>>>0]=w[I];return b!==null&&b.push(Xe,B),B},argPackAdvance:mt,readValueFromPointer:Cn,Eb(b){Xe(b)}})}var pi=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Oc=(s,c)=>{for(var f=s>>1,b=f+c/2;!(f>=b)&&o()[f>>>0];)++f;if(32<(f<<=1)-s&&pi)return pi.decode(r().slice(s,f));for(f="",b=0;!(b>=c/2);++b){var w=n()[s+2*b>>>1>>>0];if(w==0)break;f+=String.fromCharCode(w)}return f},Dc=(s,c,f)=>{if(f??=2147483647,2>f)return 0;var b=c;f=(f-=2)<2*s.length?f/2:s.length;for(var w=0;w<f;++w){var I=s.charCodeAt(w);n()[c>>>1>>>0]=I,c+=2}return n()[c>>>1>>>0]=0,c-b},Bc=s=>2*s.length,Mc=(s,c)=>{for(var f=0,b="";!(f>=c/4);){var w=i()[s+4*f>>>2>>>0];if(w==0)break;++f,65536<=w?(w-=65536,b+=String.fromCharCode(55296|w>>10,56320|1023&w)):b+=String.fromCharCode(w)}return b},Rc=(s,c,f)=>{if(c>>>=0,f??=2147483647,4>f)return 0;var b=c;f=b+f-4;for(var w=0;w<s.length;++w){var I=s.charCodeAt(w);if(55296<=I&&57343>=I&&(I=65536+((1023&I)<<10)|1023&s.charCodeAt(++w)),i()[c>>>2>>>0]=I,(c+=4)+4>f)break}return i()[c>>>2>>>0]=0,c-b},Uc=s=>{for(var c=0,f=0;f<s.length;++f){var b=s.charCodeAt(f);55296<=b&&57343>=b&&++f,c+=4}return c};function Nc(s,c,f){if(s>>>=0,c>>>=0,f=Ze(f>>>=0),c===2)var b=Oc,w=Dc,I=Bc,D=B=>o()[B>>>1>>>0];else c===4&&(b=Mc,w=Rc,I=Uc,D=B=>a()[B>>>2>>>0]);at(s,{name:f,fromWireType:B=>{for(var L,H=a()[B>>>2>>>0],Q=B+4,ce=0;ce<=H;++ce){var ge=B+4+ce*c;ce!=H&&D(ge)!=0||(Q=b(Q,ge-Q),L===void 0?L=Q:(L+=String.fromCharCode(0),L+=Q),Q=ge+c)}return Xe(B),L},toWireType:(B,L)=>{if(typeof L!="string")throw new pt(`Cannot pass non-string to C++ string type ${f}`);var H=I(L),Q=hr(4+H+c);return a()[Q>>>2>>>0]=H/c,w(L,Q+4,H+c),B!==null&&B.push(Xe,Q),Q},argPackAdvance:mt,readValueFromPointer:Cn,Eb(B){Xe(B)}})}function Vc(s,c){at(s>>>=0,{Ub:!0,name:c=Ze(c>>>0),argPackAdvance:0,fromWireType:()=>{},toWireType:()=>{}})}var Wc=()=>1;function Lc(s){Dn(s>>>0,!y,1,!_,131072,!1),Go()}var mi=s=>{if(!_e)try{if(s(),!(0<_t))try{g?gr(re):vn(re)}catch(c){c instanceof yn||c=="unwind"||k(1,c)}}catch(c){c instanceof yn||c=="unwind"||k(1,c)}};function An(s){s>>>=0,typeof Atomics.oc=="function"&&(Atomics.oc(i(),s>>>2,s).value.then(ar),s+=128,Atomics.store(i(),s>>>2,1))}var ar=()=>{var s=Dt();s&&(An(s),mi(Gi))};function Gc(s,c){(s>>>=0)==c>>>0?setTimeout(ar):g?postMessage({targetThread:s,cmd:"checkMailbox"}):(s=Ye[s])&&s.postMessage({cmd:"checkMailbox"})}var kn=[];function Hc(s,c,f,b,w){for(c>>>=0,b/=2,kn.length=b,f=w>>>0>>>3,w=0;w<b;w++)kn[w]=K[f+2*w]?K[f+2*w+1]:l()[f+2*w+1>>>0];return(c?bn[c]:Dp[s])(...kn)}function Fc(s){s>>>=0,g?postMessage({cmd:"cleanupThread",thread:s}):Lo(Ye[s])}function qc(s){}var sr=(s,c)=>{var f=Sn[s];if(f===void 0)throw s=Ni(s),f=Ze(s),Xe(s),new pt(`${c} has unknown type ${f}`);return f},fi=(s,c,f)=>{var b=[];return s=s.toWireType(b,f),b.length&&(a()[c>>>2>>>0]=Ne(b)),s};function Kc(s,c,f){return c>>>=0,f>>>=0,s=Me(s>>>0),c=sr(c,"emval::as"),fi(c,f,s)}function jc(s,c){return c>>>=0,s=Me(s>>>0),(c=sr(c,"emval::as")).toWireType(null,s)}var ur=s=>{try{s()}catch(c){lt(c)}},ft=0,Qe=null,hi=0,dr=[],gi={},bi={},Yc=0,En=null,Zc=[];function yi(s){return function(c){if(!_e){if(ft===0){var f=!1,b=!1;c((w=0)=>{if(!_e&&(hi=w,f=!0,b)){ft=2,ur(()=>ji(Qe)),typeof Browser<"u"&&Browser.Lb.Sb&&Browser.Lb.resume(),w=!1;try{var I=function(){var L=i()[Qe+8>>>2>>>0];return L=Z[bi[L]],--_t,L()}()}catch(L){I=L,w=!0}var D=!1;if(!Qe){var B=En;B&&(En=null,(w?B.reject:B.resolve)(I),D=!0)}if(w&&!D)throw I}}),b=!0,f||(ft=1,Qe=function(){var w=hr(65548),I=w+12;a()[w>>>2>>>0]=I,a()[w+4>>>2>>>0]=I+65536,I=dr[0];var D=gi[I];return D===void 0&&(D=Yc++,gi[I]=D,bi[D]=I),I=D,i()[w+8>>>2>>>0]=I,w}(),typeof Browser<"u"&&Browser.Lb.Sb&&Browser.Lb.pause(),ur(()=>qi(Qe)))}else ft===2?(ft=0,ur(Yi),Xe(Qe),Qe=null,Zc.forEach(mi)):lt(`invalid state: ${ft}`);return hi}}(c=>{s().then(c)})}function Qc(s){return s>>>=0,yi(()=>(s=Me(s)).then(Ne))}var lr=[];function Xc(s,c,f,b){return f>>>=0,b>>>=0,(s=lr[s>>>0])(null,c=Me(c>>>0),f,b)}var Jc={},cr=s=>{var c=Jc[s];return c===void 0?Ze(s):c};function ep(s,c,f,b,w){return f>>>=0,b>>>=0,w>>>=0,(s=lr[s>>>0])(c=Me(c>>>0),c[f=cr(f)],b,w)}var _i=()=>typeof globalThis=="object"?globalThis:Function("return this")();function tp(s){return(s>>>=0)==0?Ne(_i()):(s=cr(s),Ne(_i()[s]))}var rp=s=>{var c=lr.length;return lr.push(s),c},np=(s,c)=>{for(var f=Array(s),b=0;b<s;++b)f[b]=sr(a()[c+4*b>>>2>>>0],"parameter "+b);return f},wi=(s,c)=>Object.defineProperty(c,"name",{value:s});function op(s,c,f){var b=(c=np(s,c>>>0)).shift();s--;var w=`return function (obj, func, destructorsRef, args) {
`,I=0,D=[];f===0&&D.push("obj");for(var B=["retType"],L=[b],H=0;H<s;++H)D.push("arg"+H),B.push("argType"+H),L.push(c[H]),w+=`  var arg${H} = argType${H}.readValueFromPointer(args${I?"+"+I:""});
`,I+=c[H].argPackAdvance;return w+=`  var rv = ${f===1?"new func":"func.call"}(${D.join(", ")});
`,b.Ub||(B.push("emval_returnValue"),L.push(fi),w+=`  return emval_returnValue(retType, destructorsRef, rv);
`),B.push(w+`};
`),s=function(Q){var ce=Function;if(!(ce instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof ce} which is not a function`);var ge=wi(ce.name||"unknownFunctionName",function(){});return ge.prototype=ce.prototype,ge=new ge,(Q=ce.apply(ge,Q))instanceof Object?Q:ge}(B)(...L),f=`methodCaller<(${c.map(Q=>Q.name).join(", ")}) => ${b.name}>`,rp(wi(f,s))}function ip(s){return s=cr(s>>>0),Ne(u[s])}function ap(s,c){return c>>>=0,s=Me(s>>>0),c=Me(c),Ne(s[c])}function sp(s){9<(s>>>=0)&&(st[s+1]+=1)}function up(){return Ne([])}function dp(s){s=Me(s>>>0);for(var c=Array(s.length),f=0;f<s.length;f++)c[f]=s[f];return Ne(c)}function lp(s){return Ne(cr(s>>>0))}function cp(){return Ne({})}function pp(s){for(var c=Me(s>>>=0);c.length;){var f=c.pop();c.pop()(f)}In(s)}function mp(s,c,f){c>>>=0,f>>>=0,s=Me(s>>>0),c=Me(c),f=Me(f),s[c]=f}function fp(s,c){return c>>>=0,s=(s=sr(s>>>0,"_emval_take_value")).readValueFromPointer(c),Ne(s)}function hp(s,c){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),c>>>=0,s=new Date(1e3*s),i()[c>>>2>>>0]=s.getUTCSeconds(),i()[c+4>>>2>>>0]=s.getUTCMinutes(),i()[c+8>>>2>>>0]=s.getUTCHours(),i()[c+12>>>2>>>0]=s.getUTCDate(),i()[c+16>>>2>>>0]=s.getUTCMonth(),i()[c+20>>>2>>>0]=s.getUTCFullYear()-1900,i()[c+24>>>2>>>0]=s.getUTCDay(),s=(s.getTime()-Date.UTC(s.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,i()[c+28>>>2>>>0]=s}var zt=s=>s%4==0&&(s%100!=0||s%400==0),vi=[0,31,60,91,121,152,182,213,244,274,305,335],$i=[0,31,59,90,120,151,181,212,243,273,304,334];function gp(s,c){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),c>>>=0,s=new Date(1e3*s),i()[c>>>2>>>0]=s.getSeconds(),i()[c+4>>>2>>>0]=s.getMinutes(),i()[c+8>>>2>>>0]=s.getHours(),i()[c+12>>>2>>>0]=s.getDate(),i()[c+16>>>2>>>0]=s.getMonth(),i()[c+20>>>2>>>0]=s.getFullYear()-1900,i()[c+24>>>2>>>0]=s.getDay();var f=(zt(s.getFullYear())?vi:$i)[s.getMonth()]+s.getDate()-1|0;i()[c+28>>>2>>>0]=f,i()[c+36>>>2>>>0]=-60*s.getTimezoneOffset(),f=new Date(s.getFullYear(),6,1).getTimezoneOffset();var b=new Date(s.getFullYear(),0,1).getTimezoneOffset();s=0|(f!=b&&s.getTimezoneOffset()==Math.min(b,f)),i()[c+32>>>2>>>0]=s}function bp(s){s>>>=0;var c=new Date(i()[s+20>>>2>>>0]+1900,i()[s+16>>>2>>>0],i()[s+12>>>2>>>0],i()[s+8>>>2>>>0],i()[s+4>>>2>>>0],i()[s>>>2>>>0],0),f=i()[s+32>>>2>>>0],b=c.getTimezoneOffset(),w=new Date(c.getFullYear(),6,1).getTimezoneOffset(),I=new Date(c.getFullYear(),0,1).getTimezoneOffset(),D=Math.min(I,w);return 0>f?i()[s+32>>>2>>>0]=+(w!=I&&D==b):0<f!=(D==b)&&(w=Math.max(I,w),c.setTime(c.getTime()+6e4*((0<f?D:w)-b))),i()[s+24>>>2>>>0]=c.getDay(),f=(zt(c.getFullYear())?vi:$i)[c.getMonth()]+c.getDate()-1|0,i()[s+28>>>2>>>0]=f,i()[s>>>2>>>0]=c.getSeconds(),i()[s+4>>>2>>>0]=c.getMinutes(),i()[s+8>>>2>>>0]=c.getHours(),i()[s+12>>>2>>>0]=c.getDate(),i()[s+16>>>2>>>0]=c.getMonth(),i()[s+20>>>2>>>0]=c.getYear(),s=c.getTime(),BigInt(isNaN(s)?-1:s/1e3)}function xi(s,c,f,b,w,I,D){return g?xe(16,1,s,c,f,b,w,I,D):-52}function Si(s,c,f,b,w,I){if(g)return xe(17,1,s,c,f,b,w,I)}function yp(s,c,f,b){s>>>=0,c>>>=0,f>>>=0,b>>>=0;var w=new Date().getFullYear(),I=new Date(w,0,1),D=new Date(w,6,1);w=I.getTimezoneOffset();var B=D.getTimezoneOffset(),L=Math.max(w,B);a()[s>>>2>>>0]=60*L,i()[c>>>2>>>0]=+(w!=B),I=(s=H=>H.toLocaleTimeString(void 0,{hour12:!1,timeZoneName:"short"}).split(" ")[1])(I),D=s(D),B<w?(Pt(I,f,17),Pt(D,b,17)):(Pt(I,b,17),Pt(D,f,17))}var Pn=[],Ti=(s,c)=>{Pn.length=0;for(var f;f=r()[s++>>>0];){var b=f!=105;c+=(b&=f!=112)&&c%8?4:0,Pn.push(f==112?a()[c>>>2>>>0]:f==106?K[c>>>3]:f==105?i()[c>>>2>>>0]:l()[c>>>3>>>0]),c+=b?8:4}return Pn};function _p(s,c,f){return s>>>=0,c=Ti(c>>>0,f>>>0),bn[s](...c)}function wp(s,c,f){return s>>>=0,c=Ti(c>>>0,f>>>0),bn[s](...c)}var vp=()=>{},$p=()=>Date.now();function xp(s,c){return j(Te(s>>>0,c>>>0))}var Ii,Sp=()=>{throw _t+=1,"unwind"};function Tp(){return 4294901760}Ii=()=>performance.timeOrigin+performance.now();var Ip=()=>navigator.hardwareConcurrency;function Cp(){return lt("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function Ap(s){s>>>=0;var c=r().length;if(s<=c||4294901760<s)return!1;for(var f=1;4>=f;f*=2){var b=c*(1+.2/f);b=Math.min(b,s+100663296);var w=Math;b=Math.max(s,b);e:{w=(w.min.call(w,4294901760,b+(65536-b%65536)%65536)-se.buffer.byteLength+65535)/65536;try{se.grow(w),be();var I=1;break e}catch{}I=void 0}if(I)return!0}return!1}var pr=()=>(lt("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Ot={},Ci=s=>{s.forEach(c=>{var f=pr();f&&(Ot[f]=c)})};function kp(){var s=Error().stack.toString().split(`
`);return s[0]=="Error"&&s.shift(),Ci(s),Ot.Qb=pr(),Ot.fc=s,Ot.Qb}function Ep(s,c,f){if(s>>>=0,c>>>=0,Ot.Qb==s)var b=Ot.fc;else(b=Error().stack.toString().split(`
`))[0]=="Error"&&b.shift(),Ci(b);for(var w=3;b[w]&&pr()!=s;)++w;for(s=0;s<f&&b[s+w];++s)i()[c+4*s>>>2>>>0]=pr();return s}var zn,On={},Ai=()=>{if(!zn){var s,c={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:A||"./this.program"};for(s in On)On[s]===void 0?delete c[s]:c[s]=On[s];var f=[];for(s in c)f.push(`${s}=${c[s]}`);zn=f}return zn};function ki(s,c){if(g)return xe(18,1,s,c);s>>>=0,c>>>=0;var f=0;return Ai().forEach((b,w)=>{var I=c+f;for(w=a()[s+4*w>>>2>>>0]=I,I=0;I<b.length;++I)t()[w++>>>0]=b.charCodeAt(I);t()[w>>>0]=0,f+=b.length+1}),0}function Ei(s,c){if(g)return xe(19,1,s,c);s>>>=0,c>>>=0;var f=Ai();a()[s>>>2>>>0]=f.length;var b=0;return f.forEach(w=>b+=w.length+1),a()[c>>>2>>>0]=b,0}function Pi(s){return g?xe(20,1,s):52}function zi(s,c,f,b){return g?xe(21,1,s,c,f,b):52}function Oi(s,c,f,b){return g?xe(22,1,s,c,f,b):70}var Pp=[null,[],[]];function Di(s,c,f,b){if(g)return xe(23,1,s,c,f,b);c>>>=0,f>>>=0,b>>>=0;for(var w=0,I=0;I<f;I++){var D=a()[c>>>2>>>0],B=a()[c+4>>>2>>>0];c+=8;for(var L=0;L<B;L++){var H=r()[D+L>>>0],Q=Pp[s];H===0||H===10?((s===1?q:j)(Yo(Q,0)),Q.length=0):Q.push(H)}w+=B}return a()[b>>>2>>>0]=w,0}var Bi=[31,29,31,30,31,30,31,31,30,31,30,31],Mi=[31,28,31,30,31,30,31,31,30,31,30,31],zp=(s,c)=>{t().set(s,c>>>0)};function Ri(s,c,f,b){function w(z,de,Ie){for(z=typeof z=="number"?z.toString():z||"";z.length<de;)z=Ie[0]+z;return z}function I(z,de){return w(z,de,"0")}function D(z,de){function Ie(Qi){return 0>Qi?-1:0<Qi?1:0}var vt;return(vt=Ie(z.getFullYear()-de.getFullYear()))===0&&(vt=Ie(z.getMonth()-de.getMonth()))===0&&(vt=Ie(z.getDate()-de.getDate())),vt}function B(z){switch(z.getDay()){case 0:return new Date(z.getFullYear()-1,11,29);case 1:return z;case 2:return new Date(z.getFullYear(),0,3);case 3:return new Date(z.getFullYear(),0,2);case 4:return new Date(z.getFullYear(),0,1);case 5:return new Date(z.getFullYear()-1,11,31);case 6:return new Date(z.getFullYear()-1,11,30)}}function L(z){var de=z.Cb;for(z=new Date(new Date(z.Db+1900,0,1).getTime());0<de;){var Ie=z.getMonth(),vt=(zt(z.getFullYear())?Bi:Mi)[Ie];if(!(de>vt-z.getDate())){z.setDate(z.getDate()+de);break}de-=vt-z.getDate()+1,z.setDate(1),11>Ie?z.setMonth(Ie+1):(z.setMonth(0),z.setFullYear(z.getFullYear()+1))}return Ie=new Date(z.getFullYear()+1,0,4),de=B(new Date(z.getFullYear(),0,4)),Ie=B(Ie),0>=D(de,z)?0>=D(Ie,z)?z.getFullYear()+1:z.getFullYear():z.getFullYear()-1}s>>>=0,c>>>=0,f>>>=0,b>>>=0;var H=a()[b+40>>>2>>>0];for(var Q in b={lc:i()[b>>>2>>>0],kc:i()[b+4>>>2>>>0],Ib:i()[b+8>>>2>>>0],Mb:i()[b+12>>>2>>>0],Jb:i()[b+16>>>2>>>0],Db:i()[b+20>>>2>>>0],vb:i()[b+24>>>2>>>0],Cb:i()[b+28>>>2>>>0],sc:i()[b+32>>>2>>>0],jc:i()[b+36>>>2>>>0],mc:H?Te(H):""},f=Te(f),H={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"})f=f.replace(new RegExp(Q,"g"),H[Q]);var ce="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),ge="January February March April May June July August September October November December".split(" ");for(Q in H={"%a":z=>ce[z.vb].substring(0,3),"%A":z=>ce[z.vb],"%b":z=>ge[z.Jb].substring(0,3),"%B":z=>ge[z.Jb],"%C":z=>I((z.Db+1900)/100|0,2),"%d":z=>I(z.Mb,2),"%e":z=>w(z.Mb,2," "),"%g":z=>L(z).toString().substring(2),"%G":L,"%H":z=>I(z.Ib,2),"%I":z=>((z=z.Ib)==0?z=12:12<z&&(z-=12),I(z,2)),"%j":z=>{for(var de=0,Ie=0;Ie<=z.Jb-1;de+=(zt(z.Db+1900)?Bi:Mi)[Ie++]);return I(z.Mb+de,3)},"%m":z=>I(z.Jb+1,2),"%M":z=>I(z.kc,2),"%n":()=>`
`,"%p":z=>0<=z.Ib&&12>z.Ib?"AM":"PM","%S":z=>I(z.lc,2),"%t":()=>"	","%u":z=>z.vb||7,"%U":z=>I(Math.floor((z.Cb+7-z.vb)/7),2),"%V":z=>{var de=Math.floor((z.Cb+7-(z.vb+6)%7)/7);if(2>=(z.vb+371-z.Cb-2)%7&&de++,de)de==53&&((Ie=(z.vb+371-z.Cb)%7)==4||Ie==3&&zt(z.Db)||(de=1));else{de=52;var Ie=(z.vb+7-z.Cb-1)%7;(Ie==4||Ie==5&&zt(z.Db%400-1))&&de++}return I(de,2)},"%w":z=>z.vb,"%W":z=>I(Math.floor((z.Cb+7-(z.vb+6)%7)/7),2),"%y":z=>(z.Db+1900).toString().substring(2),"%Y":z=>z.Db+1900,"%z":z=>{var de=0<=(z=z.jc);return z=Math.abs(z)/60,(de?"+":"-")+("0000"+(z/60*100+z%60)).slice(-4)},"%Z":z=>z.mc,"%%":()=>"%"},f=f.replace(/%%/g,"\0\0"),H)f.includes(Q)&&(f=f.replace(new RegExp(Q,"g"),H[Q](b)));return Q=function(z){var de=Array($n(z)+1);return Xo(z,de,0,de.length),de}(f=f.replace(/\0\0/g,"%")),Q.length>c?0:(zp(Q,s),Q.length-1)}function Op(s,c,f,b){return Ri(s>>>0,c>>>0,f>>>0,b>>>0)}g||function(){for(var s=u.numThreads-1;s--;)Fo();je.unshift(()=>{Gt++,function(c){g?c():Promise.all(ct.map(Ho)).then(c)}(()=>Oo())})}();for(var Ui=Array(256),mr=0;256>mr;++mr)Ui[mr]=String.fromCharCode(mr);li=Ui,pt=u.BindingError=class extends Error{constructor(s){super(s),this.name="BindingError"}},u.InternalError=class extends Error{constructor(s){super(s),this.name="InternalError"}},st.push(0,1,void 0,1,null,1,!0,1,!1,1),u.count_emval_handles=()=>st.length/2-5-Tn.length;var Dp=[wn,Vo,qo,Zo,Qo,Jo,ei,ti,ri,ni,oi,ii,ai,si,ui,di,xi,Si,ki,Ei,Pi,zi,Oi,Di],Z=function(){function s(f,b){return Z=f.exports,Z=function(){var w=Z,I={};for(let[D,B]of Object.entries(w))I[D]=typeof B=="function"?(...L)=>{dr.push(D);try{return B(...L)}finally{_e||(dr.pop(),Qe&&ft===1&&dr.length===0&&(ft=0,_t+=1,ur(Ki),typeof Fibers<"u"&&Fibers.tc()))}}:B;return I}(),Z=function(){var w=Z,I=B=>L=>B(L)>>>0,D=B=>()=>B()>>>0;return(w=Object.assign({},w)).Da=I(w.Da),w.gb=D(w.gb),w.ib=I(w.ib),w.emscripten_main_runtime_thread_id=D(w.emscripten_main_runtime_thread_id),w.tb=I(w.tb),w.ub=D(w.ub),w}(),Wo.push(Z.jb),Lt.unshift(Z.Ca),X=b,Oo(),Z}var c=Uo();if(Gt++,u.instantiateWasm)try{return u.instantiateWasm(c,s)}catch(f){j(`Module.instantiateWasm callback failed with error: ${f}`),m(f)}return gn||=u.locateFile?Do("ort-wasm-simd-threaded.jsep.wasm")?"ort-wasm-simd-threaded.jsep.wasm":u.locateFile?u.locateFile("ort-wasm-simd-threaded.jsep.wasm",P):P+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,function(f,b){var w=gn;return O||typeof WebAssembly.instantiateStreaming!="function"||Do(w)||Bo(w)||typeof fetch!="function"?Ro(w,f,b):fetch(w,{credentials:"same-origin"}).then(I=>WebAssembly.instantiateStreaming(I,f).then(b,function(D){return j(`wasm streaming compile failed: ${D}`),j("falling back to ArrayBuffer instantiation"),Ro(w,f,b)}))}(c,function(f){s(f.instance,f.module)}).catch(m),{}}(),Ni=s=>(Ni=Z.Da)(s),Vi=()=>(Vi=Z.Ea)();u._OrtInit=(s,c)=>(u._OrtInit=Z.Fa)(s,c),u._OrtGetLastError=(s,c)=>(u._OrtGetLastError=Z.Ga)(s,c),u._OrtCreateSessionOptions=(s,c,f,b,w,I,D,B,L,H)=>(u._OrtCreateSessionOptions=Z.Ha)(s,c,f,b,w,I,D,B,L,H),u._OrtAppendExecutionProvider=(s,c)=>(u._OrtAppendExecutionProvider=Z.Ia)(s,c),u._OrtAddFreeDimensionOverride=(s,c,f)=>(u._OrtAddFreeDimensionOverride=Z.Ja)(s,c,f),u._OrtAddSessionConfigEntry=(s,c,f)=>(u._OrtAddSessionConfigEntry=Z.Ka)(s,c,f),u._OrtReleaseSessionOptions=s=>(u._OrtReleaseSessionOptions=Z.La)(s),u._OrtCreateSession=(s,c,f)=>(u._OrtCreateSession=Z.Ma)(s,c,f),u._OrtReleaseSession=s=>(u._OrtReleaseSession=Z.Na)(s),u._OrtGetInputOutputCount=(s,c,f)=>(u._OrtGetInputOutputCount=Z.Oa)(s,c,f),u._OrtGetInputName=(s,c)=>(u._OrtGetInputName=Z.Pa)(s,c),u._OrtGetOutputName=(s,c)=>(u._OrtGetOutputName=Z.Qa)(s,c),u._OrtFree=s=>(u._OrtFree=Z.Ra)(s),u._OrtCreateTensor=(s,c,f,b,w,I)=>(u._OrtCreateTensor=Z.Sa)(s,c,f,b,w,I),u._OrtGetTensorData=(s,c,f,b,w)=>(u._OrtGetTensorData=Z.Ta)(s,c,f,b,w),u._OrtReleaseTensor=s=>(u._OrtReleaseTensor=Z.Ua)(s),u._OrtCreateRunOptions=(s,c,f,b)=>(u._OrtCreateRunOptions=Z.Va)(s,c,f,b),u._OrtAddRunConfigEntry=(s,c,f)=>(u._OrtAddRunConfigEntry=Z.Wa)(s,c,f),u._OrtReleaseRunOptions=s=>(u._OrtReleaseRunOptions=Z.Xa)(s),u._OrtCreateBinding=s=>(u._OrtCreateBinding=Z.Ya)(s),u._OrtBindInput=(s,c,f)=>(u._OrtBindInput=Z.Za)(s,c,f),u._OrtBindOutput=(s,c,f,b)=>(u._OrtBindOutput=Z._a)(s,c,f,b),u._OrtClearBoundOutputs=s=>(u._OrtClearBoundOutputs=Z.$a)(s),u._OrtReleaseBinding=s=>(u._OrtReleaseBinding=Z.ab)(s),u._OrtRunWithBinding=(s,c,f,b,w)=>(u._OrtRunWithBinding=Z.bb)(s,c,f,b,w),u._OrtRun=(s,c,f,b,w,I,D,B)=>(u._OrtRun=Z.cb)(s,c,f,b,w,I,D,B),u._OrtEndProfiling=s=>(u._OrtEndProfiling=Z.db)(s),u._JsepOutput=(s,c,f)=>(u._JsepOutput=Z.eb)(s,c,f),u._JsepGetNodeName=s=>(u._JsepGetNodeName=Z.fb)(s);var fr,Dt=()=>(Dt=Z.gb)(),Xe=u._free=s=>(Xe=u._free=Z.hb)(s),hr=u._malloc=s=>(hr=u._malloc=Z.ib)(s),Dn=(s,c,f,b,w,I)=>(Dn=Z.lb)(s,c,f,b,w,I),Wi=()=>(Wi=Z.mb)(),Li=(s,c,f,b,w)=>(Li=Z.nb)(s,c,f,b,w),Bn=s=>(Bn=Z.ob)(s),gr=s=>(gr=Z.pb)(s),Gi=()=>(Gi=Z.qb)(),Hi=(s,c)=>(Hi=Z.rb)(s,c),br=s=>(br=Z.sb)(s),Mn=s=>(Mn=Z.tb)(s),Rn=()=>(Rn=Z.ub)(),Fi=u.dynCall_ii=(s,c)=>(Fi=u.dynCall_ii=Z.wb)(s,c),qi=s=>(qi=Z.xb)(s),Ki=()=>(Ki=Z.yb)(),ji=s=>(ji=Z.zb)(s),Yi=()=>(Yi=Z.Ab)();function Zi(){0<Gt||(g?(p(u),g||ir(Lt),startWorker(u)):(ir(je),0<Gt||fr||(fr=!0,u.calledRun=!0,_e||(g||ir(Lt),p(u),g||ir(fn)))))}return u.___start_em_js=889994,u.___stop_em_js=890240,u.stackSave=()=>Rn(),u.stackRestore=s=>br(s),u.stackAlloc=s=>Mn(s),u.setValue=function(s,c,f="i8"){switch(f.endsWith("*")&&(f="*"),f){case"i1":case"i8":t()[s>>>0]=c;break;case"i16":n()[s>>>1>>>0]=c;break;case"i32":i()[s>>>2>>>0]=c;break;case"i64":K[s>>>3]=BigInt(c);break;case"float":d()[s>>>2>>>0]=c;break;case"double":l()[s>>>3>>>0]=c;break;case"*":a()[s>>>2>>>0]=c;break;default:lt(`invalid type for setValue: ${f}`)}},u.getValue=function(s,c="i8"){switch(c.endsWith("*")&&(c="*"),c){case"i1":case"i8":return t()[s>>>0];case"i16":return n()[s>>>1>>>0];case"i32":return i()[s>>>2>>>0];case"i64":return K[s>>>3];case"float":return d()[s>>>2>>>0];case"double":return l()[s>>>3>>>0];case"*":return a()[s>>>2>>>0];default:lt(`invalid type for getValue: ${c}`)}},u.UTF8ToString=Te,u.stringToUTF8=Pt,u.lengthBytesUTF8=$n,Ht=function s(){fr||Zi(),fr||(Ht=s)},Zi(),u.PTR_SIZE=4,h}),Lp=Pa;globalThis.self?.name==="em-pthread"&&Pa()});var Bt,Gp,Hp,Fp,Da,Ba,qp,Ma,Kt=U(()=>{"use strict";xr();Bt=!1?void 0:import.meta.url??(typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0),Gp=!1||typeof location>"u"?void 0:location.origin,Hp=(e,t)=>{try{let r=t??Bt;return(r?new URL(e,r):new URL(e)).origin===Gp}catch{return!1}},Fp=async e=>{let r=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},Da=(Ea(),yr(ka)).default,Ba=async()=>{if(!Bt)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Hp(Bt))return[void 0,Da()];let e=await Fp(Bt);return[e,Da(e)]},qp=(Oa(),yr(za)).default,Ma=async(e,t,r)=>[void 0,qp]});var jn,Yn,zr,Ra,Kp,jp,Sr,Ce,ht=U(()=>{"use strict";Kt();Yn=!1,zr=!1,Ra=!1,Kp=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},jp=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Sr=async e=>{if(Yn)return Promise.resolve();if(zr)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Ra)throw new Error("previous call to 'initializeWebAssembly()' failed.");zr=!0;let t=e.initTimeout,r=e.numThreads;if(!jp())throw new Error("WebAssembly SIMD is not supported in the current environment.");let n=Kp();r>1&&!n&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let o=e.wasmPaths,i=typeof o=="string"?o:void 0,a=o?.mjs,d=a?.href??a,l=o?.wasm,p=l?.href??l,m=e.wasmBinary,[u,h]=await Ma(d,i,r>1),_=!1,y=[];if(t>0&&y.push(new Promise(g=>{setTimeout(()=>{_=!0,g()},t)})),y.push(new Promise((g,x)=>{let $={numThreads:r};m?$.wasmBinary=m:(p||i)&&($.locateFile=(v,S)=>p??(i??S)+v),h($).then(v=>{zr=!1,Yn=!0,jn=v,g(),u&&URL.revokeObjectURL(u)},v=>{zr=!1,Ra=!0,x(v)})})),await Promise.race(y),_)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Ce=()=>{if(Yn&&jn)return jn;throw new Error("WebAssembly is not initialized yet.")}});var Ae,Yt,pe,Or=U(()=>{"use strict";ht();Ae=(e,t)=>{let r=Ce(),n=r.lengthBytesUTF8(e)+1,o=r._malloc(n);return r.stringToUTF8(e,o,n),t.push(o),o},Yt=(e,t,r,n)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([o,i])=>{let a=t?t+o:o;if(typeof i=="object")Yt(i,a+".",r,n);else if(typeof i=="string"||typeof i=="number")n(a,i.toString());else if(typeof i=="boolean")n(a,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},pe=e=>{let t=Ce(),r=t.stackSave();try{let n=t.PTR_SIZE,o=t.stackAlloc(2*n);t._OrtGetLastError(o,o+n);let i=Number(t.getValue(o,n===4?"i32":"i64")),a=t.getValue(o+n,"*"),d=a?t.UTF8ToString(a):"";throw new Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${d}`)}finally{t.stackRestore(r)}}});var Ua,Na=U(()=>{"use strict";ht();Or();Ua=e=>{let t=Ce(),r=0,n=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let i=0;return e?.tag!==void 0&&(i=Ae(e.tag,n)),r=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),r===0&&pe("Can't create run options."),e?.extra!==void 0&&Yt(e.extra,"",new WeakSet,(a,d)=>{let l=Ae(a,n),p=Ae(d,n);t._OrtAddRunConfigEntry(r,l,p)!==0&&pe(`Can't set a run config entry: ${a} - ${d}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseRunOptions(r),n.forEach(a=>t._free(a)),i}}});var Yp,Zp,Qp,Xp,Va,Wa=U(()=>{"use strict";ht();Or();Yp=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Zp=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Qp=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Xp=(e,t,r)=>{for(let n of t){let o=typeof n=="string"?n:n.name;switch(o){case"webnn":if(o="WEBNN",typeof n!="string"){let d=n?.deviceType;if(d){let l=Ae("deviceType",r),p=Ae(d,r);Ce()._OrtAddSessionConfigEntry(e,l,p)!==0&&pe(`Can't set a session config entry: 'deviceType' - ${d}.`)}}break;case"webgpu":if(o="JS",typeof n!="string"){let a=n;if(a?.preferredLayout){if(a.preferredLayout!=="NCHW"&&a.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${a.preferredLayout}`);let d=Ae("preferredLayout",r),l=Ae(a.preferredLayout,r);Ce()._OrtAddSessionConfigEntry(e,d,l)!==0&&pe(`Can't set a session config entry: 'preferredLayout' - ${a.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let i=Ae(o,r);Ce()._OrtAppendExecutionProvider(e,i)!==0&&pe(`Can't append execution provider: ${o}.`)}},Va=e=>{let t=Ce(),r=0,n=[],o=e||{};Qp(o);try{let i=Yp(o.graphOptimizationLevel??"all"),a=Zp(o.executionMode??"sequential"),d=typeof o.logId=="string"?Ae(o.logId,n):0,l=o.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log serverity level is not valid: ${l}`);let p=o.logVerbosityLevel??0;if(!Number.isInteger(p)||p<0||p>4)throw new Error(`log verbosity level is not valid: ${p}`);let m=typeof o.optimizedModelFilePath=="string"?Ae(o.optimizedModelFilePath,n):0;if(r=t._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,a,!!o.enableProfiling,0,d,l,p,m),r===0&&pe("Can't create session options."),o.executionProviders&&Xp(r,o.executionProviders,n),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let u=Ae("enableGraphCapture",n),h=Ae(o.enableGraphCapture.toString(),n);t._OrtAddSessionConfigEntry(r,u,h)!==0&&pe(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[u,h]of Object.entries(o.freeDimensionOverrides)){if(typeof u!="string")throw new Error(`free dimension override name must be a string: ${u}`);if(typeof h!="number"||!Number.isInteger(h)||h<0)throw new Error(`free dimension override value must be a non-negative integer: ${h}`);let _=Ae(u,n);t._OrtAddFreeDimensionOverride(r,_,h)!==0&&pe(`Can't set a free dimension override: ${u} - ${h}.`)}return o.extra!==void 0&&Yt(o.extra,"",new WeakSet,(u,h)=>{let _=Ae(u,n),y=Ae(h,n);t._OrtAddSessionConfigEntry(r,_,y)!==0&&pe(`Can't set a session config entry: ${u} - ${h}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&pe("Can't release session options."),n.forEach(a=>t._free(a)),i}}});var Zt,gt,Tt,Dr,Qt,Br,Mr,Zn,J=U(()=>{"use strict";Zt=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},gt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Tt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],n=typeof t=="number"?t:t.reduce((o,i)=>o*i,1);return r>0?Math.ceil(n*r):void 0},Dr=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Qt=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Br=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Mr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Zn=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}});var Xt,Qn=U(()=>{"use strict";xr();Xt=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=Nn("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=Nn("node:fs"),n=r(e),o=[];for await(let i of n)o.push(i);return new Uint8Array(Buffer.concat(o))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let o=t.body.getReader(),i;try{i=new ArrayBuffer(n)}catch(d){if(d instanceof RangeError){let l=Math.ceil(n/65536);i=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw d}let a=0;for(;;){let{done:d,value:l}=await o.read();if(d)break;let p=l.byteLength;new Uint8Array(i,a,p).set(l),a+=p}return new Uint8Array(i,0,n)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var Jp,em,La,Ga,Rr,tm,ue,Je=U(()=>{"use strict";J();Jp=["V","I","W","E","F"],em=(e,t)=>{console.log(`[${Jp[e]},${new Date().toISOString()}]${t}`)},Rr=(e,t)=>{La=e,Ga=t},tm=(e,t)=>{let r=Qt(e),n=Qt(La);r>=n&&em(r,typeof t=="function"?t():t)},ue=(...e)=>{Ga&&tm(...e)}});var Ur,Xn=U(()=>{"use strict";J();Ur=(e,t)=>new(Dr(t))(e)});var Nr=U(()=>{"use strict"});var Ha,Jn,eo,rm,nm,Fa,ro,to,Ka,ja=U(()=>{"use strict";Je();Nr();Ha=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Jn=[],eo=e=>Math.ceil(Number(e)/16)*16,rm=e=>{for(let t=0;t<Jn.length;t++){let r=Jn[t];if(e<=r)return r}return Math.ceil(e/16)*16},nm=1,Fa=()=>nm++,ro=async(e,t,r,n)=>{let o=eo(r),i=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=e.getCommandEncoder();e.endComputePass(),a.copyBufferToBuffer(t,0,i,0,o),e.flush(),await i.mapAsync(GPUMapMode.READ);let d=i.getMappedRange();if(n){let l=n();return l.set(new Uint8Array(d,0,r)),l}else return new Uint8Array(d.slice(0,r))}finally{i.destroy()}},to=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[r]of Ha)Jn.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(t,r){let n=r.buffer,o=r.byteOffset,i=r.byteLength,a=eo(i),d=this.storageCache.get(t);if(!d)throw new Error("gpu data for uploading does not exist");if(Number(d.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${d.originalSize}, data size=${i}`);let l=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),p=l.getMappedRange();new Uint8Array(p).set(new Uint8Array(n,o,i)),l.unmap();let m=this.backend.device.createCommandEncoder();m.copyBufferToBuffer(l,0,d.gpuData.buffer,0,a),this.backend.device.queue.submit([m.finish()]),l.destroy(),ue("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`)}memcpy(t,r){let n=this.storageCache.get(t);if(!n)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=eo(n.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(n.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(t,r,n){let o;if(n){if(o=n[0],t===n[1])return ue("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=Fa();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:t},originalSize:r}),ue("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(t){t!==void 0&&(this.storageCache.delete(t),ue("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(t,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=rm(t),o,i=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let p=(i?this.freeBuffers:this.freeUniformBuffers).get(n);p?p.length>0?o=p.pop():o=this.backend.device.createBuffer({size:n,usage:r}):o=this.backend.device.createBuffer({size:n,usage:r})}else o=this.backend.device.createBuffer({size:n,usage:r});let d={id:Fa(),type:0,buffer:o};return this.storageCache.set(d.id,{gpuData:d,originalSize:Number(t)}),ue("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${d.id}`),d}get(t){return this.storageCache.get(t)?.gpuData}release(t){let r=typeof t=="bigint"?Number(t):t,n=this.storageCache.get(r);if(!n){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return ue("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(t,r){let n=this.storageCache.get(Number(t));if(!n)throw new Error("data does not exist");await ro(this.backend,n.gpuData.buffer,n.originalSize,r)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let r=Ha.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let r of this.buffersPending)t.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(t){let r=this.capturedPendingBuffers.get(t);r&&(r.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(t)),this.sessionCount-=1,this.sessionCount===0&&(ue("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(n=>{n.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Ka=(...e)=>new to(...e)});var no,ee,Se=U(()=>{"use strict";no=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},ee=e=>new no(e)});var oo,et,C,It,Vr,Ya,Za,ne=U(()=>{"use strict";oo=class{static calcMatMulShape(t,r){return t[1]!==r[0]?void 0:[t[0],r[1]]}},et=class{static calcShape(t,r,n=!1){let o=t.length,i=r.length;if(o===0)return r;if(i===0)return t;let a=Math.max(t.length,r.length),d=new Array(a);if(n){if(o<2||i<2)return;let l=oo.calcMatMulShape([t[o-2],t[o-1]],[r[i-2],r[i-1]]);if(l===void 0)return;[d[a-2],d[a-1]]=l}for(let l=n?3:1;l<=a;l++){let p=o-l<0?1:t[o-l],m=i-l<0?1:r[i-l];if(p!==m&&p>1&&m>1)return;let u=Math.max(p,m);if(p&&m)d[a-l]=Math.max(p,m);else{if(u>1)return;d[a-l]=0}}return d}static isValidBroadcast(t,r){let n=t.length,o=r.length;if(n>o)return!1;for(let i=1;i<=n;i++)if(t[n-i]!==1&&t[n-i]!==r[o-i])return!1;return!0}},C=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let n=t.length;if(n===0)return[];let o=new Array(n),i=n-1;for(;i>=0;){if(t[i]%r===0){o[i]=t[i]/r;break}if(r%t[i]!==0)throw new Error("cannot convert shape");o[i]=1,r/=t[i],i--}for(i--;i>=0;i--)o[i]=t[i];return o}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,n){let o=1;for(let i=r;i<n;i++){if(t[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(t[i])}return o}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let n=new Array(r);n[r-1]=1,n[r-2]=t[r-1];for(let o=r-3;o>=0;--o)n[o]=n[o+1]*t[o+1];return n}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(n=>this.normalizeAxis(n,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(n=>t[n]):t.slice().reverse()}static padShape(t,r){let n=t.length;return t.map((o,i)=>o+r[i]+r[i+n])}static areEqual(t,r){return t.length!==r.length?!1:t.every((n,o)=>n===r[o])}},It=class e{static adjustPoolAttributes(t,r,n,o,i,a){if(!t&&n.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let d=0;d<r.length-2;d++)d>=n.length?n.push(r[d+2]):n[d]=r[d+2];for(let d=0;d<n.length;d++)if(d<o.length){if(o[d]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let d=0;d<n.length;d++)if(d<i.length){if(i[d]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let d=0;d<n.length*2;d++)if(d<a.length){if(a[d]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let d=0;d<n.length;d++){if(n[d]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[d]>=n[d]||a[d+n.length]>=n[d])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,o,i,a,d){if(d){if(i.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)e.adjustPadAndReturnShape(t[l+(a?1:2)],r[l],n[l],o[l],i,l,l+t.length-2,d)}}static computePoolOutputShape(t,r,n,o,i,a,d){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let l=[r[0],r[1]];return e.computeShapeHelper(t,r,l,n,o,i,a,d),l}static computeConvOutputShape(t,r,n,o,i,a,d){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],r[0]];return e.computeShapeHelper(!1,t,l,n,o,i,a,d),l}static computeShapeHelper(t,r,n,o,i,a,d,l){if(t)for(let p=0;p<r.length-2;p++)n.push(1);else for(let p=0;p<r.length-2;p++)n.push(e.adjustPadAndReturnShape(r[p+2],o[p],i[p],a[p],d,p,p+r.length-2,l))}static adjustPadAndReturnShape(t,r,n,o,i,a,d,l){let p=n*(o-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return i[a]=0,i[d]=0,Math.floor((t-p)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(n!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let u=((t+r-1)/r-1)*r+o-t;return i[a]=Math.floor(l==="SAME_LOWER"?(u+1)/2:u/2),i[d]=u-i[a],Math.floor((t+u-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+i[a]+i[d]-p)/r+1)}},Vr=class{static getShapeOfGemmResult(t,r,n,o,i){if(t.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let a,d,l;r?(a=t[1],d=t[0]):(a=t[0],d=t[1]);let p=-1;if(o?(l=n[0],p=1):(l=n[1],p=0),n[p]!==d)throw new Error("dimension mismatch");if(a<=0||l<=0||d<=0)throw new Error("invalid shape specified");if(i&&!et.isValidBroadcast(i,[a,l]))throw new Error("gemm: invalid bias shape for broadcast");return[a,l,d]}},Ya=-34028234663852886e22,Za=34028234663852886e22});var Ct,ao,ye,ke,N,me,so,At,He,F,Wr,E,M,Qa,Lr,io,Xa,ae=U(()=>{"use strict";J();ne();Ct=64,ao=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},ye=(e,t=1)=>{let r=ao(e,t);return typeof r=="string"?r:r[0]},ke=(e,t=1)=>{let r=ao(e,t);return typeof r=="string"?r:r[1]},N=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:C.computeStrides(r)})}),t},me=e=>e%4===0?4:e%2===0?2:1,so=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,At=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,He=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,F=(e,t,r,n)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?n==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:n==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,Wr=(e,t,r,n,o)=>{let i=typeof r=="number",a=i?r:r.length,d=[...new Array(a).keys()],l=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,p=ao(t,o),m=typeof p=="string"?p:p[1],u=typeof p=="string"?p:p[0],h={indices:l,value:m,storage:u,tensor:t},_=V=>typeof V=="string"?V:`${V}u`,y={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},g=i?"uniforms.":"",x=`${g}${e}_shape`,$=`${g}${e}_strides`,v="";for(let V=0;V<a-1;V++)v+=`
    let dim${V} = current / ${F($,V,a)};
    let rest${V} = current % ${F($,V,a)};
    indices[${V}] = dim${V};
    current = rest${V};
    `;v+=`indices[${a-1}] = current;`;let S=a<2?"":`
  fn o2i_${e}(offset: u32) -> ${h.indices} {
    var indices: ${h.indices};
    var current = offset;
    ${v}
    return indices;
  }`,T=V=>(y.offsetToIndices=!0,a<2?V:`o2i_${e}(${V})`),A=[];if(a>=2)for(let V=a-1;V>=0;V--)A.push(`${F($,V,a)} * (indices[${V}])`);let k=a<2?"":`
  fn i2o_${e}(indices: ${h.indices}) -> u32 {
    return ${A.join("+")};
  }`,P=V=>(y.indicesToOffset=!0,a<2?V:`i2o_${e}(${V})`),O=(...V)=>a===0?"0u":`${h.indices}(${V.map(_).join(",")})`,R=(V,K)=>a<2?`${V}`:`${F(V,K,a)}`,G=(V,K,he)=>a<2?`${V}=${he};`:`${F(V,K,a)}=${he};`,q={},j=(V,K)=>{y.broadcastedIndicesToOffset=!0;let he=`${K.name}broadcastedIndicesTo${e}Offset`;if(he in q)return`${he}(${V})`;let Le=[];for(let _e=a-1;_e>=0;_e--){let be=K.indicesGet("outputIndices",_e+K.rank-a);Le.push(`${R($,_e)} * (${be} % ${R(x,_e)})`)}return q[he]=`fn ${he}(outputIndices: ${K.type.indices}) -> u32 {
             return ${Le.length>0?Le.join("+"):"0u"};
           }`,`${he}(${V})`},W=(V,K)=>(()=>{if(h.storage===h.value)return`${e}[${V}]=${K};`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`${e}[${V}]=vec2<u32>(u32(${K}), select(0u, 0xFFFFFFFFu, ${K} < 0));`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`${e}[${V}]=vec2<u32>(u32(${K}), 0u);`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`${e}[${V}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${K}));`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),Y=V=>(()=>{if(h.storage===h.value)return`${e}[${V}]`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`i32(${e}[${V}].x)`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`u32(${e}[${V}].x)`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${V}] & 0xFFu), bool(${e}[${V}] & 0xFF00u), bool(${e}[${V}] & 0xFF0000u), bool(${e}[${V}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),se=a<2?"":`
  fn get_${e}ByIndices(indices: ${h.indices}) -> ${m} {
    return ${Y(`i2o_${e}(indices)`)};
  }`,X=a<2?"":(()=>{let V=d.map(he=>`d${he}: u32`).join(", "),K=d.map(he=>`d${he}`).join(", ");return`
  fn get_${e}(${V}) -> ${m} {
    return get_${e}ByIndices(${O(K)});
  }`})(),re=(...V)=>{if(V.length!==a)throw new Error(`indices length must be ${a}`);let K=V.map(_).join(",");return a===0?Y("0u"):a===1?Y(K[0]):(y.get=!0,y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}(${K})`)},te=V=>a<2?Y(V):(y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}ByIndices(${V})`),oe=a<2?"":`
  fn set_${e}ByIndices(indices: ${h.indices}, value: ${m}) {
    ${W(`i2o_${e}(indices)`,"value")}
  }`,ve=a<2?"":(()=>{let V=d.map(he=>`d${he}: u32`).join(", "),K=d.map(he=>`d${he}`).join(", ");return`
  fn set_${e}(${V}, value: ${m}) {
    set_${e}ByIndices(${O(K)}, value);
  }`})();return{impl:()=>{let V=[],K=!1;return y.offsetToIndices&&(V.push(S),K=!0),y.indicesToOffset&&(V.push(k),K=!0),y.broadcastedIndicesToOffset&&(Object.values(q).forEach(he=>V.push(he)),K=!0),y.set&&(V.push(ve),K=!0),y.setByIndices&&(V.push(oe),K=!0),y.get&&(V.push(X),K=!0),y.getByIndices&&(V.push(se),K=!0),!i&&K&&V.unshift(`const ${x} = ${h.indices}(${r.join(",")});`,`const ${$} = ${h.indices}(${C.computeStrides(r).join(",")});`),V.join(`
`)},type:h,offsetToIndices:T,indicesToOffset:P,broadcastedIndicesToOffset:j,indices:O,indicesGet:R,indicesSet:G,set:(...V)=>{if(V.length!==a+1)throw new Error(`indices length must be ${a}`);let K=V[a];if(typeof K!="string")throw new Error("value must be string");let he=V.slice(0,a).map(_).join(",");return a===0?W("0u",K):a===1?W(he[0],K):(y.set=!0,y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}(${he}, ${K})`)},setByOffset:W,setByIndices:(V,K)=>a<2?W(V,K):(y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}ByIndices(${V}, ${K});`),get:re,getByOffset:Y,getByIndices:te,usage:n,name:e,strides:$,shape:x,rank:a}},E=(e,t,r,n=1)=>Wr(e,t,r,"input",n),M=(e,t,r,n=1)=>Wr(e,t,r,"output",n),Qa=(e,t,r)=>Wr(e,t,r,"atomicOutput",1),Lr=(e,t,r,n=1)=>Wr(e,t,r,"internal",n),io=class{constructor(t,r){this.normalizedDispatchGroup=t;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=Ct){let r=typeof t=="number"?t:t[0],n=typeof t=="number"?1:t[1],o=typeof t=="number"?1:t[2];if(r>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*n*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,d=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${r*n*o}u + local_idx;`;return`@compute @workgroup_size(${r}, ${n}, ${o})
  fn main(${a}) {
    ${d}
  `}appendVariableUniforms(t){t.rank!==0&&(t.shape.startsWith("uniforms.")&&this.uniforms.push({name:t.shape.replace("uniforms.",""),type:"u32",length:t.rank}),t.strides.startsWith("uniforms.")&&this.uniforms.push({name:t.strides.replace("uniforms.",""),type:"u32",length:t.rank}))}declareVariable(t,r){if(t.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(t),this.appendVariableUniforms(t);let n=t.usage==="input"?"read":"read_write",o=t.usage==="atomicOutput"?"atomic<i32>":t.type.storage;return`@group(0) @binding(${r}) var<storage, ${n}> ${t.name}: array<${o}>;`}declareVariables(...t){return t.map(r=>this.declareVariable(r,this.variableIndex++)).join(`
`)}registerInternalVariable(t){if(t.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(t),this.appendVariableUniforms(t)}registerInternalVariables(...t){return t.forEach(r=>this.registerInternalVariable(r)),this}registerUniform(t,r,n=1){return this.uniforms.push({name:t,type:r,length:n}),this}registerUniforms(t){return this.uniforms=this.uniforms.concat(t),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let t=[];for(let{name:r,type:n,length:o}of this.uniforms)if(o&&o>4)n==="f16"?t.push(`@align(16) ${r}:array<mat2x4<${n}>, ${Math.ceil(o/8)}>`):t.push(`${r}:array<vec4<${n}>, ${Math.ceil(o/4)}>`);else{let i=o==null||o===1?n:`vec${o}<${n}>`;t.push(`${r}:${i}`)}return`
      struct Uniforms { ${t.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(t=>t.impl()).join(`
`)+this.internalVariables.map(t=>t.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[t(r.type),r.length??1])}},Xa=(e,t)=>new io(e,t)});var om,Ja,im,am,sm,um,Ee,es,ts,ut=U(()=>{"use strict";J();ne();Se();ae();om=e=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.")},Ja=(e,t)=>t&&t.length!==e?[...new Array(e).keys()].reverse():t,im=(e,t)=>C.sortBasedOnPerm(e,Ja(e.length,t)),am=(e,t,r,n)=>{let o=`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let i=0;i<t;++i)o+=`a[${e[i]}]=i[${i}];`;return o+="return a;}"},sm=(e,t)=>{let r=[],n=[];for(let o=0;o<e.length;++o)e[o]!==1&&r.push(e[o]),e[t[o]]!==1&&n.push(t[o]);return{newShape:r,newPerm:n}},um=(e,t)=>{let r=0;for(let n=0;n<e.length;++n)if(t[e[n]]!==1){if(e[n]<r)return!1;r=e[n]}return!0},Ee=(e,t)=>{let r=e.dataType,n=e.dims.length,o=Ja(n,t),i=im(e.dims,o),a=e.dims,d=i,l=n<2||um(o,e.dims),p;if(l)return p=g=>{let x=E("input",r,a,4),$=M("output",r,d,4);return`
  ${g.registerUniform("output_size","u32").declareVariables(x,$)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let g=C.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64/4)},programUniforms:[{type:12,data:Math.ceil(g/4)}]}},getShaderSource:p};let{newShape:m,newPerm:u}=sm(e.dims,o),h=C.areEqual(u,[2,3,1]),_=C.areEqual(u,[3,1,2]);if(m.length===2||h||_){a=h?[m[0],m[1]*m[2]]:_?[m[0]*m[1],m[2]]:m,d=[a[1],a[0]];let g=16;return p=x=>{let $=E("a",r,a.length),v=M("output",r,d.length);return`
  ${x.registerUniform("output_size","u32").declareVariables($,v)}
  var<workgroup> tile : array<array<${v.type.value}, ${g+1}>, ${g}>;
  ${x.mainStart([g,g,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${g} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${g}u + local_id.x;
    let input_row = workgroup_id_x * ${g}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${$.getByIndices(`${$.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${g}u + local_id.x;
    let output_row = workgroup_id_y * ${g}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let x=C.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(d[1]/g),y:Math.ceil(d[0]/g)},programUniforms:[{type:12,data:x},...N(a,d)]}},getShaderSource:p}}return p=g=>{let x=E("a",r,a.length),$=M("output",r,d.length);return`
  ${g.registerUniform("output_size","u32").declareVariables(x,$)}

  ${am(o,n,x,$)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${$.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${$.setByOffset("global_idx",x.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let g=C.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},...N(a,d)]}},getShaderSource:p}},es=(e,t)=>{om(e.inputs),e.compute(Ee(e.inputs[0],t.perm))},ts=e=>ee({perm:e.perm})});var dm,lm,cm,pm,mm,fm,hm,gm,bm,ym,tt,rs,ns,os,is,as,ss,us,ds,ls,cs,ps=U(()=>{"use strict";J();ne();ae();Gr();ut();dm={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},lm={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},cm={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},pm={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},mm=(e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r},fm=(e,t)=>{let r=[],n=e.length;for(let i=0;i<n;i++)t.indexOf(i)===-1&&r.push(e[i]);let o=t.map(i=>e[i]);return[r,o]},hm=(e,t)=>{let r=e.length+t.length,n=[],o=0;for(let i=0;i<r;i++)t.indexOf(i)===-1?n.push(e[o++]):n.push(1);return n},gm=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},bm=(e,t)=>{let r=[];if(!gm(e,t)){for(let n=0;n<t;++n)e.indexOf(n)===-1&&r.push(n);e.forEach(n=>r.push(n))}return r},ym=(e,t,r,n,o,i,a)=>{let d=r[0].dims,l=C.size(i),p=C.size(a),m=E("_A",r[0].dataType,d),u=M("output",o,i),h=64;l===1&&(h=256);let _=`
          var<workgroup> aBestValues : array<f32, ${h}>;
       `,y=g=>`
        ${g.registerUniform("reduceSize","u32").declareVariables(m,u)}
        ${_}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${g.mainStart(h)}

          let outputIndex = global_idx / ${h};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${cm[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${h}) {
           let candidate = f32(${m.getByOffset("offset + k")});
           bestValue = ${dm[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${h}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${lm[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${u.setByOffset("outputIndex",`${n==="mean"?`${u.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${u.type.storage}(${pm[n]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${h}`,inputDependencies:["type"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:l},programUniforms:[{type:12,data:p}]})}},tt=(e,t,r,n)=>{let o=e.inputs.length===1?r:uo(e.inputs,r),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=e.inputs[0].dims.map((_,y)=>y));let a=C.normalizeAxes(i,e.inputs[0].dims.length),d=a,l=e.inputs[0],p=bm(d,e.inputs[0].dims.length);p.length>0&&(l=e.compute(Ee(e.inputs[0],p),{inputs:[0],outputs:[-1]})[0],d=mm(d.length,l.dims.length));let[m,u]=fm(l.dims,d),h=m;o.keepDims&&(h=hm(m,a)),e.compute(ym(t,o.cacheKey,[l],n,e.inputs[0].dataType,h,u),{inputs:[l]})},rs=(e,t)=>{tt(e,"ReduceMeanShared",t,"mean")},ns=(e,t)=>{tt(e,"ReduceL1Shared",t,"l1")},os=(e,t)=>{tt(e,"ReduceL2Shared",t,"l2")},is=(e,t)=>{tt(e,"ReduceLogSumExpShared",t,"logSumExp")},as=(e,t)=>{tt(e,"ReduceMaxShared",t,"max")},ss=(e,t)=>{tt(e,"ReduceMinShared",t,"min")},us=(e,t)=>{tt(e,"ReduceProdShared",t,"prod")},ds=(e,t)=>{tt(e,"ReduceSumShared",t,"sum")},ls=(e,t)=>{tt(e,"ReduceSumSquareShared",t,"sumSquare")},cs=(e,t)=>{tt(e,"ReduceLogSumShared",t,"logSum")}});var rt,_m,Hr,uo,nt,wm,vm,$m,xm,Sm,Tm,Im,Cm,Am,km,ot,ms,fs,hs,gs,bs,ys,_s,ws,vs,$s,Gr=U(()=>{"use strict";J();ne();Se();ae();ps();rt=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},_m=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Hr=(e,t,r,n,o,i,a=!1,d=!1)=>{let l=[],p=r[0].dims,m=p.length,u=C.normalizeAxes(o,m),h=!d&&u.length===0;p.forEach((x,$)=>{h||u.indexOf($)>=0?a&&l.push(1):l.push(x)});let _=l.length,y=C.size(l);return{name:e,shaderCache:t,getShaderSource:x=>{let $=[],v=E("_A",r[0].dataType,m),S=M("output",i,_),T=n(v,S,u),A=T[2];for(let k=0,P=0;k<m;k++)h||u.indexOf(k)>=0?(a&&P++,A=`for(var j${k}: u32 = 0; j${k} < ${p[k]}; j${k}++) {
                  ${T[2].includes("last_index")?`let last_index = j${k};`:""}
                  ${v.indicesSet("input_indices",k,`j${k}`)}
                  ${A}
                }`):($.push(`${v.indicesSet("input_indices",k,S.indicesGet("output_indices",P))};`),P++);return`

        ${x.registerUniform("output_size","u32").declareVariables(v,S)}

        ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${S.offsetToIndices("global_idx")};

          ${$.join(`
`)}
          ${T[0]}       // init ops for reduce max/min
          ${T[1]}
          ${A}
          ${T[3]}
          ${T.length===4?S.setByOffset("global_idx","value"):T.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:i}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...N(p,l)]})}},uo=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),ee({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},nt=(e,t,r,n)=>{let o=e.inputs,i=o.length===1?r:uo(o,r);e.compute(Hr(t,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?_m:n,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},wm=(e,t)=>{rt(e.inputs),nt(e,"ReduceLogSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},vm=(e,t)=>{rt(e.inputs),nt(e,"ReduceL1",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},$m=(e,t)=>{rt(e.inputs),nt(e,"ReduceL2",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},xm=(e,t)=>{rt(e.inputs),nt(e,"ReduceLogSumExp",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},Sm=(e,t)=>{rt(e.inputs),nt(e,"ReduceMax",t,(n,o,i)=>{let a=[];for(let d=0;d<n.rank;d++)(i.indexOf(d)>=0||i.length===0)&&a.push(n.indicesSet("input_indices",d,0));return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},Tm=(e,t)=>{rt(e.inputs),nt(e,"ReduceMean",t,(n,o,i)=>{let a=1;for(let d=0;d<n.rank;d++)(i.indexOf(d)>=0||i.length===0)&&(a*=e.inputs[0].dims[d]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${a});`]})},Im=(e,t)=>{rt(e.inputs),nt(e,"ReduceMin",t,(n,o,i)=>{let a=[];for(let d=0;d<n.rank;d++)(i.indexOf(d)>=0||i.length===0)&&a.push(`input_indices[${d}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},Cm=(e,t)=>{rt(e.inputs),nt(e,"ReduceProd",t,(n,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},Am=(e,t)=>{rt(e.inputs),nt(e,"ReduceSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},km=(e,t)=>{rt(e.inputs),nt(e,"ReduceSumSquare",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},ot=(e,t,r)=>{if(t.length===0)return r;let n=1,o=1;for(let i=0;i<t.length;i++)t.indexOf(i)===-1?n*=e[i]:o*=e[i];return o<32&&n>1024},ms=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Tm(e,t):rs(e,t)},fs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vm(e,t):ns(e,t)},hs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$m(e,t):os(e,t)},gs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?xm(e,t):is(e,t)},bs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Sm(e,t):as(e,t)},ys=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Im(e,t):ss(e,t)},_s=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Cm(e,t):us(e,t)},ws=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Am(e,t):ds(e,t)},vs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?km(e,t):ls(e,t)},$s=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?wm(e,t):cs(e,t)}});var xs,Ss,Ts,lo,Is=U(()=>{"use strict";J();Se();Gr();xs=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Ss=(e,t)=>{xs(e.inputs);let r=(n,o,i)=>{let a=[];for(let d=0;d<n.rank;d++)(i.indexOf(d)>=0||i.length===0)&&a.push(`input_indices[${d}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Hr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Ts=(e,t)=>{xs(e.inputs);let r=(n,o,i)=>{let a=[];for(let d=0;d<n.rank;d++)(i.indexOf(d)>=0||i.length===0)&&a.push(`input_indices[${d}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Hr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},lo=e=>ee(e)});var Em,co,Pm,zm,Om,Rt,Dm,Cs,Fr=U(()=>{"use strict";J();ne();Nr();ae();Em=(e,t)=>{let r=e[0],n=e[1],o=e[2],i=e[3],a=e[4],d=e[5];if(a&&d)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=r.dims[0],p=r.dims[1],m=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(n.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==m)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==n.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let u=o.dims[0]/3,h=u,_=h;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let S of t.qkvHiddenSizes)if(S%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");u=t.qkvHiddenSizes[0],h=t.qkvHiddenSizes[1],_=t.qkvHiddenSizes[2]}let y=p;if(u!==h)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==u+h+_)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let g=0;if(a){if(h!==_)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==h/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(g=a.dims[3])}let x=y+g,$=-1,v=0;if(i)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(d){if(d.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(d.dims[0]!==l||d.dims[1]!==t.numHeads||d.dims[2]!==p||d.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:p,pastSequenceLength:g,kvSequenceLength:y,totalSequenceLength:x,maxSequenceLength:$,inputHiddenSize:m,hiddenSize:u,vHiddenSize:_,headSize:Math.floor(u/t.numHeads),vHeadSize:Math.floor(_/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},co=(e,t,r)=>t&&e?`
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
    `,Pm=(e,t,r,n,o,i,a,d)=>{let l=me(a?1:i),p=64,m=i/l;m<p&&(p=32);let u=Math.ceil(i/l/p),h=[{type:12,data:t},{type:12,data:r},{type:12,data:n},{type:12,data:o},{type:12,data:m},{type:12,data:u}],_=ye(e.dataType,l),y=ke(1,l),g=["type"];a&&g.push("type"),d&&g.push("type");let x=$=>{let v=M("x",e.dataType,e.dims,l),S=[v],T=a?E("seq_lens",a.dataType,a.dims):void 0;T&&S.push(T);let A=d?E("total_sequence_length_input",d.dataType,d.dims):void 0;A&&S.push(A);let k=ke(e.dataType),P=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${p}>;
  var<workgroup> thread_sum: array<f32, ${p}>;
  ${$.registerUniforms(P).declareVariables(...S)}
  ${$.mainStart([p,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${co(T,A,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${p}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${a?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${y}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${y}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${p}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${y}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${y}(x[offset + i]) - max_value);
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
        var f32input = ${y}(x[offset + i]);
        x[offset + i] = ${v.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${v.type.value}(${k}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${p};${_};${l}`,inputDependencies:g},getShaderSource:x,getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(i/p),y:o,z:t*r},programUniforms:h})}},zm=(e,t,r,n,o,i,a,d,l)=>{let p=a+i.kvSequenceLength,m=[i.batchSize,i.numHeads,i.sequenceLength,p],u=e>1&&n,h=i.kvNumHeads?i.kvNumHeads:i.numHeads,_=u?[i.batchSize,h,p,i.headSize]:void 0,y=i.nReps?i.nReps:1,g=i.scale===0?1/Math.sqrt(i.headSize):i.scale,x=me(i.headSize),$=i.headSize/x,v=12,S={x:Math.ceil(p/v),y:Math.ceil(i.sequenceLength/v),z:i.batchSize*i.numHeads},T=[{type:12,data:i.sequenceLength},{type:12,data:$},{type:12,data:p},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:g},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:y}],A=u&&n&&C.size(n.dims)>0,k=["type","type"];A&&k.push("type"),o&&k.push("type"),d&&k.push("type"),l&&k.push("type");let P=[{dims:m,dataType:t.dataType,gpuDataType:0}];u&&P.push({dims:_,dataType:t.dataType,gpuDataType:0});let O=R=>{let G=E("q",t.dataType,t.dims,x),q=E("key",r.dataType,r.dims,x),j=[G,q];if(A){let oe=E("past_key",n.dataType,n.dims,x);j.push(oe)}o&&j.push(E("attention_bias",o.dataType,o.dims));let W=d?E("seq_lens",d.dataType,d.dims):void 0;W&&j.push(W);let Y=l?E("total_sequence_length_input",l.dataType,l.dims):void 0;Y&&j.push(Y);let se=M("output",t.dataType,m),X=[se];u&&X.push(M("present_key",t.dataType,_,x));let re=ke(1,x),te=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;

  var<workgroup> tileQ: array<${G.type.storage}, ${v*v}>;
  var<workgroup> tileK: array<${G.type.storage}, ${v*v}>;
  ${R.registerUniforms(te).declareVariables(...j,...X)}
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
    ${co(W,Y,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${A&&u?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${u?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${re}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${(()=>A&&u?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`)()}
      ${u?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${re}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(x){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${x}`)}})()};
        output[outputIdx] = ${se.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${x};${o!==void 0};${n!==void 0};${e}`,inputDependencies:k},getRunData:()=>({outputs:P,dispatchGroup:S,programUniforms:T}),getShaderSource:O}},Om=(e,t,r,n,o,i,a=void 0,d=void 0)=>{let l=i+o.kvSequenceLength,p=o.nReps?o.nReps:1,m=o.vHiddenSize*p,u=e>1&&n,h=o.kvNumHeads?o.kvNumHeads:o.numHeads,_=u?[o.batchSize,h,l,o.headSize]:void 0,y=[o.batchSize,o.sequenceLength,m],g=12,x={x:Math.ceil(o.vHeadSize/g),y:Math.ceil(o.sequenceLength/g),z:o.batchSize*o.numHeads},$=[{type:12,data:o.sequenceLength},{type:12,data:l},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:m},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:p}],v=u&&n&&C.size(n.dims)>0,S=["type","type"];v&&S.push("type"),a&&S.push("type"),d&&S.push("type");let T=[{dims:y,dataType:t.dataType,gpuDataType:0}];u&&T.push({dims:_,dataType:t.dataType,gpuDataType:0});let A=k=>{let P=E("probs",t.dataType,t.dims),O=E("v",r.dataType,r.dims),R=[P,O];v&&R.push(E("past_value",n.dataType,n.dims));let G=a?E("seq_lens",a.dataType,a.dims):void 0;a&&R.push(G);let q=d?E("total_sequence_length_input",d.dataType,d.dims):void 0;d&&R.push(q);let W=[M("output",t.dataType,y)];u&&W.push(M("present_value",t.dataType,_));let Y=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${g}u;
  var<workgroup> tileQ: array<${P.type.value}, ${g*g}>;
  var<workgroup> tileV: array<${P.type.value}, ${g*g}>;
  ${k.registerUniforms(Y).declareVariables(...R,...W)}
  ${k.mainStart([g,g,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${p===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${p===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${co(G,q,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${v&&u?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${u?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${P.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${(()=>v&&u?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`)()}
        ${u?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${n!==void 0};${e}`,inputDependencies:S},getRunData:()=>({outputs:T,dispatchGroup:x,programUniforms:$}),getShaderSource:A}},Rt=(e,t,r,n,o,i,a,d,l,p,m=void 0,u=void 0)=>{let h=Math.min(e.outputCount,1+(a?1:0)+(d?1:0)),_=h>1?p.pastSequenceLength:0,y=_+p.kvSequenceLength,g=l&&C.size(l.dims)>0?l:void 0,x=[t,r];h>1&&a&&C.size(a.dims)>0&&x.push(a),g&&x.push(g),m&&x.push(m),u&&x.push(u);let $=e.compute(zm(h,t,r,a,g,p,_,m,u),{inputs:x,outputs:h>1?[-1,1]:[-1]})[0];e.compute(Pm($,p.batchSize,p.numHeads,_,p.sequenceLength,y,m,u),{inputs:m&&u?[$,m,u]:[$],outputs:[]});let v=[$,n];h>1&&d&&C.size(d.dims)>0&&v.push(d),m&&v.push(m),u&&v.push(u),e.compute(Om(h,$,n,d,p,_,m,u),{inputs:v,outputs:h>1?[0,2]:[0]})},Dm=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],n=t.sequenceLength,o=t.inputHiddenSize,i=t.headSize,a=12,d={x:Math.ceil(t.headSize/a),y:Math.ceil(t.sequenceLength/a),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],p=[{type:12,data:n},{type:12,data:o},{type:12,data:i},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],m=u=>{let h=M("output_q",l[0].dataType,r),_=M("output_k",l[0].dataType,r),y=M("output_v",l[0].dataType,r),g=E("input",l[0].dataType,l[0].dims),x=E("weight",l[1].dataType,l[1].dims),$=E("bias",l[2].dataType,l[2].dims),v=g.type.storage,S=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${v}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${v}, ${a*a}>;
  var<workgroup> tileWeightK: array<${v}, ${a*a}>;
  var<workgroup> tileWeightV: array<${v}, ${a*a}>;
  ${u.registerUniforms(S).declareVariables(g,x,$,h,_,y)}
  ${u.mainStart([a,a,1])}
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:d,programUniforms:p}),getShaderSource:m},{inputs:l,outputs:[-1,-1,-1]})},Cs=(e,t)=>{let r=Em(e.inputs,t),[n,o,i]=Dm(e,r);return Rt(e,n,o,i,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}});var Bm,Mm,Rm,As,ks=U(()=>{"use strict";Ve();J();ne();Se();ae();Bm=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(n,o,i)=>{let a=o.length;if(a!==n.length)throw new Error(`${i}: num dimensions != ${a}`);o.forEach((d,l)=>{if(d!==n[l])throw new Error(`${i}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let n=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Mm=(e,t)=>{let{epsilon:r,spatial:n,format:o}=t,i=e[0].dims,a=n?me(i[i.length-1]):1,d=o==="NHWC"&&i.length>1?a:1,l=C.size(i)/a,p=n,m=p?i.length:i,u=E("x",e[0].dataType,e[0].dims,a),h=E("scale",e[1].dataType,e[1].dims,d),_=E("bias",e[2].dataType,e[2].dims,d),y=E("inputMean",e[3].dataType,e[3].dims,d),g=E("inputVar",e[4].dataType,e[4].dims,d),x=M("y",e[0].dataType,m,a),$=()=>{let S="";if(n)S=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${a}`:"outputIndices[1]"};`;else if(o==="NCHW")S=`
            ${x.indicesSet("outputIndices","0","0")}
            let cOffset = ${x.indicesToOffset("outputIndices")};`;else{S=`var cIndices = ${h.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let T=1;T<h.rank;T++)S+=`cIndices[${T}] = outputIndices[${T}];`;S+=`let cOffset = ${h.indicesToOffset("cIndices")};`}return S},v=S=>`
  const epsilon = ${r};
  ${S.registerUniform("outputSize","u32").declareVariables(u,h,_,y,g,x)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${x.offsetToIndices(`global_idx * ${a}`)};
    ${$()}
    let scale = ${h.getByOffset("cOffset")};
    let bias = ${_.getByOffset("cOffset")};
    let inputMean = ${y.getByOffset("cOffset")};
    let inputVar = ${g.getByOffset("cOffset")};
    let x = ${u.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${x.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${a}`,inputDependencies:p?["rank","type","type","type","type"]:void 0},getShaderSource:v,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p?[{type:12,data:l},...N(i)]:[{type:12,data:l}]})}},Rm=e=>ee(e),As=(e,t)=>{let{inputs:r,outputCount:n}=e,o=Rm({...t,outputCount:n});if(we.webgpu.validateInputContent&&Bm(r,o),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Mm(r,o))}});var Um,Nm,Es,Ps=U(()=>{"use strict";ne();ae();Um=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Nm=e=>{let t=e[0].dims,r=e[0].dims[2],n=C.size(t)/4,o=e[0].dataType,i=E("input",o,t,4),a=E("bias",o,[r],4),d=E("residual",o,t,4),l=M("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:m=>`
  const channels = ${r}u / 4;
  ${m.declareVariables(i,a,d,l)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${i.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${d.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},Es=e=>{Um(e.inputs),e.compute(Nm(e.inputs))}});var Vm,fe,zs,Os,Ds,Bs,Ms,Rs,Us,Ns,Vs,Wm,Ws,Ls,Gs,Hs,Jt,Fs,qr,qs,Ks,js,Ys,Zs,Qs,Xs,Js,eu,tu,ru,nu,ou,iu,au,su,uu,du,po,mo,lu,cu,pu,Lm,Gm,mu,Kr=U(()=>{"use strict";J();ne();Se();ae();Vm=(e,t,r,n,o,i,a)=>{let d=Math.ceil(t/4),l="";typeof o=="string"?l=`${o}(a)`:l=o("a");let p=E("inputData",r,[d],4),m=M("outputData",n,[d],4),u=[{name:"vec_size",type:"u32"}];return a&&u.push(...a),`
      ${e.registerUniforms(u).declareVariables(p,m)}

  ${i??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${p.getByOffset("global_idx")};
    ${m.setByOffset("global_idx",l)}
  }`},fe=(e,t,r,n,o,i=e.dataType,a,d)=>{let l=[{type:12,data:Math.ceil(C.size(e.dims)/4)}];return a&&l.push(...a),{name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:p=>Vm(p,C.size(e.dims),e.dataType,i,r,n,d),getRunData:p=>({outputs:[{dims:e.dims,dataType:i}],dispatchGroup:{x:Math.ceil(C.size(p[0].dims)/64/4)},programUniforms:l})}},zs=e=>{e.compute(fe(e.inputs[0],"Abs","abs"))},Os=e=>{e.compute(fe(e.inputs[0],"Acos","acos"))},Ds=e=>{e.compute(fe(e.inputs[0],"Acosh","acosh"))},Bs=e=>{e.compute(fe(e.inputs[0],"Asin","asin"))},Ms=e=>{e.compute(fe(e.inputs[0],"Asinh","asinh"))},Rs=e=>{e.compute(fe(e.inputs[0],"Atan","atan"))},Us=e=>{e.compute(fe(e.inputs[0],"Atanh","atanh"))},Ns=e=>ee(e),Vs=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(fe(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Wm=e=>{let t,r,n=e.length>=2&&e[1].data!==0,o=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=n?e[1].getFloat32Array()[0]:-34028234663852886e22,r=o?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=n?e[1].getUint16Array()[0]:64511,r=o?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return ee({min:t,max:r})},Ws=(e,t)=>{let r=t||Wm(e.inputs),n=ke(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Clip",o=>`clamp(${o}, vec4<${n}>(uniforms.min), vec4<${n}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:n},{name:"max",type:n}]),{inputs:[0]})},Ls=e=>{e.compute(fe(e.inputs[0],"Ceil","ceil"))},Gs=e=>{e.compute(fe(e.inputs[0],"Cos","cos"))},Hs=e=>{e.compute(fe(e.inputs[0],"Cosh","cosh"))},Jt=e=>ee(e),Fs=(e,t)=>{let r=ke(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Elu",n=>`elu_vf32(${n})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},qr=(e="f32")=>`
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
}`,qs=e=>{let t=ke(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,qr(t)))},Ks=e=>{e.compute(fe(e.inputs[0],"Exp","exp"))},js=e=>{e.compute(fe(e.inputs[0],"Floor","floor"))},Ys=e=>{let t=ke(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,qr(t)))},Zs=(e,t)=>{let r=ke(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"LeakyRelu",n=>`select(leaky_relu_alpha_ * ${n}, ${n}, ${n} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},Qs=e=>{e.compute(fe(e.inputs[0],"Not",t=>`!${t}`))},Xs=e=>{e.compute(fe(e.inputs[0],"Neg",t=>`-${t}`))},Js=e=>{e.compute(fe(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},eu=e=>{let t=ke(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},tu=e=>{e.compute(fe(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},ru=e=>ee(e),nu=(e,t)=>{let r=ke(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"HardSigmoid",n=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${n} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},ou=e=>{e.compute(fe(e.inputs[0],"Sin","sin"))},iu=e=>{e.compute(fe(e.inputs[0],"Sinh","sinh"))},au=e=>{e.compute(fe(e.inputs[0],"Sqrt","sqrt"))},su=e=>{e.compute(fe(e.inputs[0],"Tan","tan"))},uu=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,du=e=>{e.compute(fe(e.inputs[0],"Tanh",uu))},po=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${uu("v")};
}
`,mo=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,lu=e=>{let t=ke(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"FastGelu",mo,po(t),void 0,e.inputs[0].dataType))},cu=(e,t)=>{let r=ke(e.inputs[0].dataType);return e.compute(fe(e.inputs[0],"ThresholdedRelu",n=>`select(vec4<${r}>(0.0), ${n}, ${n} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},pu=e=>{e.compute(fe(e.inputs[0],"Log","log"))},Lm=(e,t)=>`
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
`,Gm=e=>`quick_gelu_impl(${e})`,mu=(e,t)=>{let r=ke(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"QuickGelu",Gm,Lm(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}});var Hm,Fm,hu,gu=U(()=>{"use strict";ne();ae();Kr();Hm=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Fm=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=E("input",e[0].dataType,e[0].dims,4),n=E("bias",e[0].dataType,[e[0].dims[2]],4),o=M("output",e[0].dataType,t,4),i=C.size(t)/4,a=ye(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:l=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${l.declareVariables(r,n,o)}

  ${qr(a)}

  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},hu=e=>{Hm(e.inputs),e.compute(Fm(e.inputs))}});var qm,Km,it,bu,yu,_u,wu,vu,$u,xu,Su,Tu,Iu,Cu=U(()=>{"use strict";J();ne();ae();qm=(e,t,r,n,o,i,a,d,l,p,m,u)=>{let h,_;typeof d=="string"?h=_=(v,S)=>`${d}((${v}),(${S}))`:typeof d=="function"?h=_=d:(h=d.scalar,_=d.vector);let y=M("outputData",m,n.length,4),g=E("aData",l,t.length,4),x=E("bData",p,r.length,4),$;if(o)if(i){let v=C.size(t)===1,S=C.size(r)===1,T=t.length>0&&t[t.length-1]%4===0,A=r.length>0&&r[r.length-1]%4===0;v||S?$=y.setByOffset("global_idx",_(v?`${g.type.value}(${g.getByOffset("0")}.x)`:g.getByOffset("global_idx"),S?`${x.type.value}(${x.getByOffset("0")}.x)`:x.getByOffset("global_idx"))):$=`
            let outputIndices = ${y.offsetToIndices("global_idx * 4u")};
            let offsetA = ${g.broadcastedIndicesToOffset("outputIndices",y)};
            let offsetB = ${x.broadcastedIndicesToOffset("outputIndices",y)};
            ${y.setByOffset("global_idx",_(a||T?g.getByOffset("offsetA / 4u"):`${g.type.value}(${g.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||A?x.getByOffset("offsetB / 4u"):`${x.type.value}(${x.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=y.setByOffset("global_idx",_(g.getByOffset("global_idx"),x.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let v=(S,T,A="")=>{let k=`aData[indexA${T}][componentA${T}]`,P=`bData[indexB${T}][componentB${T}]`;return`
            let outputIndices${T} = ${y.offsetToIndices(`global_idx * 4u + ${T}u`)};
            let offsetA${T} = ${g.broadcastedIndicesToOffset(`outputIndices${T}`,y)};
            let offsetB${T} = ${x.broadcastedIndicesToOffset(`outputIndices${T}`,y)};
            let indexA${T} = offsetA${T} / 4u;
            let indexB${T} = offsetB${T} / 4u;
            let componentA${T} = offsetA${T} % 4u;
            let componentB${T} = offsetB${T} % 4u;
            ${S}[${T}] = ${A}(${h(k,P)});
          `};m===9?$=`
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
        ${e.registerUniform("vec_size","u32").declareVariables(g,x,y)}

        ${u??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},Km=(e,t,r,n,o,i,a=r.dataType)=>{let d=r.dims.map(g=>Number(g)??1),l=n.dims.map(g=>Number(g)??1),p=!C.areEqual(d,l),m=d,u=C.size(d),h=!1,_=!1,y=[p];if(p){let g=et.calcShape(d,l,!1);if(!g)throw new Error("Can't perform binary op on the given tensors");m=g.slice(),u=C.size(m);let x=C.size(d)===1,$=C.size(l)===1,v=d.length>0&&d[d.length-1]%4===0,S=l.length>0&&l[l.length-1]%4===0;y.push(x),y.push($),y.push(v),y.push(S);let T=1;for(let A=1;A<m.length;A++){let k=d[d.length-A],P=l[l.length-A];if(k===P)T*=k;else break}T%4===0?(_=!0,h=!0):(x||$||v||S)&&(h=!0)}else h=!0;return y.push(h),{name:e,shaderCache:{hint:t+y.map(g=>g.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:g=>qm(g,d,l,m,h,p,_,o,r.dataType,n.dataType,a,i),getRunData:()=>({outputs:[{dims:m,dataType:a}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:Math.ceil(C.size(m)/4)},...N(d,l,m)]})}},it=(e,t,r,n,o,i)=>{e.compute(Km(t,o??"",e.inputs[0],e.inputs[1],r,n,i))},bu=e=>{it(e,"Add",(t,r)=>`${t}+${r}`)},yu=e=>{it(e,"Div",(t,r)=>`${t}/${r}`)},_u=e=>{it(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},wu=e=>{it(e,"Mul",(t,r)=>`${t}*${r}`)},vu=e=>{let t=E("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;it(e,"Pow",{scalar:(n,o)=>`pow_custom(${n},${o})`,vector:(n,o)=>`pow_vector_custom(${n},${o})`},`
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
      `)},$u=e=>{it(e,"Sub",(t,r)=>`${t}-${r}`)},xu=e=>{it(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Su=e=>{it(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Tu=e=>{it(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Iu=e=>{it(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}});var Ym,Zm,Qm,Xm,Au,ku,Eu=U(()=>{"use strict";J();ne();Se();ae();Ym=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,n=e[r],o=n.dataType,i=n.dims.length;e.forEach((a,d)=>{if(d!==r){if(a.dataType!==o)throw new Error("input tensors should be one type");if(a.dims.length!==i)throw new Error("input tensors should have the same shape");a.dims.forEach((l,p)=>{if(p!==t&&l!==n.dims[p])throw new Error("non concat dimensions must match")})}})},Zm=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Qm=(e,t)=>{let r=e.length,n=[];for(let o=0;o<r;++o){let i=t.setByOffset("global_idx",e[o].getByIndices("indices"));r===1?n.push(i):o===0?n.push(`if (inputIndex == ${o}u) { ${i} }`):o===r-1?n.push(`else { ${i} }`):n.push(`else if (inputIndex == ${o}) { ${i} }`)}return n.join(`
`)},Xm=(e,t,r,n)=>{let o=C.size(r),i=new Array(e.length),a=new Array(e.length),d=0,l=[],p=[],m=[{type:12,data:o}];for(let g=0;g<e.length;++g)d+=e[g].dims[t],i[g]=d,p.push(e[g].dims.length),a[g]=E(`input${g}`,n,p[g]),l.push("rank"),m.push({type:12,data:i[g]});for(let g=0;g<e.length;++g)m.push(...N(e[g].dims));m.push(...N(r));let u=M("output",n,r.length),h=u.indicesGet("indices",t),_=Array.from(Array(i.length).keys()).map(g=>`uniforms.sizeInConcatAxis${g}`).join(","),y=g=>`

  ${(()=>{g.registerUniform("outputSize","u32");for(let x=0;x<e.length;x++)g.registerUniform(`sizeInConcatAxis${x}`,"u32");return g.declareVariables(...a,u)})()}

  ${Zm(i.length,_)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${u.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${_});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Qm(a,u)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:m}),getShaderSource:y}},Au=(e,t)=>{let r=e.inputs,n=r[0].dims,o=C.normalizeAxis(t.axis,n.length);Ym(r,o);let i=n.slice();i[o]=r.reduce((d,l)=>d+(l.dims.length>o?l.dims[o]:0),0);let a=r.filter(d=>C.size(d.dims)>0);e.compute(Xm(a,o,i,r[0].dataType),{inputs:a})},ku=e=>ee({axis:e.axis})});var Fe,qe,Ke,jr,bt=U(()=>{"use strict";J();ne();Fe=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},qe=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Ke=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},jr=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,n]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:n}}else if(t==="Clip"){let[r,n]=e?.activation_params||[Ya,Za];return{activation:t,clipMax:n,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}});var Pe,Pu,Yr=U(()=>{"use strict";Pe=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Pu=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var zu,Ou=U(()=>{"use strict";zu=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var er,Zr,Qr=U(()=>{"use strict";J();ne();ae();bt();er=(e,t,r,n,o)=>{let i=n-r;return`
      ${Array.from({length:r}).map((a,d)=>`
      if (${F(t.shape,d,t.rank)} != 1) {
        ${t.indicesSet(e,d,F(o,d+i,n))}
      } else {
        ${t.indicesSet(e,d,0)}
      }`).join("")}
`},Zr=(e,t,r,n,o=!1,i)=>{let a=e[0].dims,d=e[1].dims,l=a[a.length-2],p=d[d.length-1],m=a[a.length-1],u=me(p),h=me(m),_=me(l),y=C.size(r)/u/_,g=e.length>2,x=n?n.slice(0,-2):r.slice(0,-2),v=[C.size(x),l,p],S=[{type:12,data:y},{type:12,data:l},{type:12,data:p},{type:12,data:m}];qe(t,S),S.push(...N(x,a,d)),g&&S.push(...N(e[2].dims)),S.push(...N(v));let T=A=>{let k=Lr("batch_dims",e[0].dataType,x.length),P=E("a",e[0].dataType,a.length,h),O=E("b",e[1].dataType,d.length,u),R=M("output",e[0].dataType,v.length,u),G=ye(R.type.tensor),q=Fe(t,R.type.value,G),j=[P,O],W="";if(g){let X=o?u:1;j.push(E("bias",e[2].dataType,e[2].dims.length,X)),W=`${o?`value += bias[col / ${X}];`:`value += ${R.type.value}(bias[row + i]);`}`}let Y=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Ke(t,Y);let se=()=>{let X=`var a_data: ${P.type.value};`;for(let re=0;re<h;re++)X+=`
              let b_data${re} = b[(b_offset + (k + ${re}) * uniforms.N + col) / ${u}];`;for(let re=0;re<_;re++){X+=`a_data = a[(a_offset + (row + ${re}) * uniforms.K + k) / ${h}];`;for(let te=0;te<h;te++)X+=`
            values[${re}] = fma(${O.type.value}(a_data${h===1?"":`[${te}]`}), b_data${te}, values[${re}]);
`}return X};return`
  ${A.registerUniforms(Y).registerInternalVariables(k).declareVariables(...j,R)}
  ${A.mainStart()}
    ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${u})) * ${u};
    var index1 = global_idx / (uniforms.N / ${u});
    let stride1 = uniforms.M / ${_};
    let row = (index1 % stride1) * ${_};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${k.offsetToIndices("batch")};`}

    var a_indices: ${P.type.indices};
    ${er("a_indices",P,P.rank-2,k.rank,"batch_indices")}
    ${P.indicesSet("a_indices",P.rank-2,0)}
    ${P.indicesSet("a_indices",P.rank-1,0)}
    let a_offset = ${P.indicesToOffset("a_indices")};

    var b_indices: ${O.type.indices};
    ${er("b_indices",O,O.rank-2,k.rank,"batch_indices")}
    ${O.indicesSet("b_indices",O.rank-2,0)}
    ${O.indicesSet("b_indices",O.rank-1,0)}
    let b_offset = ${O.indicesToOffset("b_indices")};
    var values: array<${R.type.value}, ${_}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${se()}
    }
    for (var i = 0u; i < ${_}u; i++) {
      var value = values[i];
      ${W}
      ${q}
      let cur_indices = ${R.type.indices}(batch, row + i, col);
      let offset = ${R.indicesToOffset("cur_indices")};
      ${R.setByOffset(`offset / ${u}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${u};${h};${_};${o}`,inputDependencies:g?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:S}),getShaderSource:T}}});var Jm,ef,fo,Du,tf,ho,rf,tr,Xr=U(()=>{"use strict";J();ne();ae();bt();Qr();Yr();Jm=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,ef=(e,t)=>e?`
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
        }`,fo=(e,t,r="f32",n,o=!1,i=32,a=!1,d=32)=>{let l=t[1]*e[1],p=t[0]*e[0],m=o?l:i,u=o?i:l,h=m/t[0],_=i/t[1];if(!((o&&h===4&&e[1]===4||!o&&(h===3||h===4))&&m%t[0]===0&&i%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${h} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${h} must be 3 or 4.
  tileAWidth ${m} must be divisible by workgroupSize[0]${t[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${h}<${r}>, ${m/h}>, ${u}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${p/e[0]}>, ${i}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${h};
const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${a?"0":"i32(globalId.z)"};
  ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${a?`${Math.ceil(d/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${a?`i32(globalId.z) * ${d}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Jm(o,n)}
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

          ${ef(o,h)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Du=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,tf=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",ho=(e,t,r="f32",n,o=!1,i=32,a=!1,d=32,l=!1)=>{let p=e[1]*t[1],m=e[0]*t[0],u=o?p:i,h=o?i:p;if(!(h%t[1]===0&&u%t[0]===0&&i%t[1]===0))throw new Error(`tileAHight ${h} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${u} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let _=h/t[1],y=u/t[0],g=i/t[1],x=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${p};
    let globalColStart = i32(workgroupId.x) * ${m};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${u}; inputCol = inputCol + ${t[0]}) {
          ${Du(o,n)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${m}; inputCol = inputCol + ${t[0]}) {
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
let tileColA = i32(localId.x) * ${y};
let tileRowB = i32(localId.y) * ${g};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${y}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Du(o,n)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
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
      ${tf(o)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${u}>, ${h}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${m}>, ${i}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${a?"0":"i32(globalId.z)"};
    ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${a?`${Math.ceil(d/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${a?`i32(globalId.z) * ${d}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${x}
  }
`},rf=(e,t,r,n,o=!1)=>{let[i,a,d,l]=n,p=ye(n[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Pe(e,p)} {
      var value = ${Pe(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${er("aIndices",a,a.rank-2,i.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Pe(e,p)} {
      var value = ${Pe(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${d.type.indices};
        ${er("bIndices",d,d.rank-2,i.rank,"batchIndices")}
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
        ${r}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},tr=(e,t,r,n,o=!1,i)=>{let a=e[0].dims,d=e[1].dims,l=a.slice(0,-2),p=d.slice(0,-2),m=n?n.slice(0,-2):r.slice(0,-2),u=C.size(m),h=a[a.length-2],_=a[a.length-1],y=d[d.length-1],g=_%4===0&&y%4===0,x=h<=8?[4,1,1]:[4,4,1],$=[8,8,1],v=[Math.ceil(y/$[0]/x[0]),Math.ceil(h/$[1]/x[1]),Math.ceil(u/$[2]/x[2])],S=g?4:1,T=[...l,h,_/S],A=T.length,k=[...p,_,y/S],P=k.length,O=[u,h,y/S],R=[{type:6,data:h},{type:6,data:y},{type:6,data:_}];qe(t,R),R.push(...N(m,T,k));let G=["rank","rank"],q=e.length>2;q&&(R.push(...N(e[2].dims)),G.push("rank")),R.push(...N(O));let j=W=>{let Y=m.length,se=Lr("batchDims",e[0].dataType,Y,1),X=ye(e[0].dataType),re=E("a",e[0].dataType,A,S),te=E("b",e[1].dataType,P,S),oe=M("result",e[0].dataType,O.length,S),ve=[re,te];if(q){let K=o?S:1;ve.push(E("bias",e[2].dataType,e[2].dims.length,K))}let Oe=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Ke(t,Oe);let $e=ye(oe.type.tensor),le=Fe(t,oe.type.value,$e),V=rf(S,q,le,[se,re,te,oe],o);return`
  ${W.registerUniforms(Oe).registerInternalVariables(se).declareVariables(...ve,oe)}
  ${V}
  ${g?fo(x,$,X,se):ho(x,$,X,se)}
                   `};return{name:"MatMul",shaderCache:{hint:`${x};${t.activation};${g};${o}`,inputDependencies:G},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:R}),getShaderSource:j}}});var nf,Bu,Mu=U(()=>{"use strict";J();Je();ae();bt();Yr();Ou();Xr();nf=(e,t,r,n,o=!1,i,a=4,d=4,l=4,p="f32")=>{let m=G=>{switch(G){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${p}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${G} is not supported.`)}},u=G=>{switch(G){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${G} is not supported.`)}},h=e?`
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
    `,y=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",g=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",x=e?"row":"col",$=e?"col":"row",v=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${x} / outWidth;
    let outCol = ${x} % outWidth;

    let WRow = ${$} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${$} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${$} % inChannels;
    var resData = ${Pe(a,p)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${y} && xCol >= 0 && xCol < ${g}) {
      ${h}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${m(a)}
    }
    return resData;`,S=e?t&&n?`
    let col = colIn * ${a};
    ${v}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${v}
    }
    return ${Pe(a,p)}(0.0);`:n&&r?`
    let col = colIn * ${a};
    ${v}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${v}
    }
    return ${Pe(a,p)}(0.0);`,T=`${u(d)}`,A=Pe(l,p),k=e?Pe(a,p):Pe(d,p),P=e?Pe(d,p):Pe(a,p),O=Fe(i,A,p);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${k} {
      ${e?S:T}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${P} {
      ${e?T:S}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${A}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${_}
      ${Pu(o)}
      ${O}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Bu=(e,t,r,n,o,i,a,d,l)=>{let p=t.format==="NHWC",m=p?e[0].dims[3]:e[0].dims[1],u=r[0],h=p?r[2]:r[3],_=p?r[1]:r[2],y=p?r[3]:r[1],g=p&&(m%4===0||m%3===0)&&y%4===0,x=p?y:h*_,$=p?h*_:y,v=[8,8,1],S=n<=8?[4,1,1]:[4,4,1],T=[Math.ceil(x/v[0]/S[0]),Math.ceil($/v[1]/S[1]),Math.ceil(u/v[2]/S[2])];ue("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${T}`);let A=g?p&&m%4!==0?3:4:1,k=v[1]*S[1],P=v[0]*S[0],O=Math.max(v[0]*A,v[1]),R=n%k===0,G=o%P===0,q=i%O===0,j=g?[A,4,4]:[1,1,1],W=[{type:6,data:n},{type:6,data:o},{type:6,data:i},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];qe(t,W),W.push(...N(e[0].dims,e[1].dims));let Y=["rank","rank"];a&&(W.push(...N(e[2].dims)),Y.push("rank")),W.push(...N(r));let se=X=>{let re=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Ke(t,re);let te=g?4:1,oe=ye(e[0].dataType),ve=`
      fn setOutputAtIndex(flatIndex : i32, value : ${g?`vec4<${oe}>`:oe}) {
        result[flatIndex] = ${g?`vec4<${oe}>`:oe}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${g?`vec4<${oe}>`:oe}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${g?"/ 4":""}, value);
      }`,Oe=E("x",e[0].dataType,e[0].dims.length,A===3?1:A),$e=E("w",e[1].dataType,e[1].dims.length,te),le=[Oe,$e],V=M("result",e[0].dataType,r.length,te);if(a){let K=E("bias",e[2].dataType,e[2].dims.length,te);le.push(K),ve+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${g?`vec4<${oe}>`:oe} {
          return bias[coords.${p?"w":"y"}${g?"/ 4":""}];
        }`}return`
        ${zu("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${X.registerUniforms(re).declareVariables(...le,V)}
        ${ve}
        ${nf(p,R,G,q,a,t,j[0],j[1],j[2],oe)}
        ${g?fo(S,v,oe,void 0,!p,O):ho(S,v,oe,void 0,!p,O,!1,void 0,d)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${A};${g};${R};${G};${q};${k};${P};${O}`,inputDependencies:Y},getRunData:()=>({outputs:[{dims:l?l(r):r,dataType:e[0].dataType}],dispatchGroup:{x:T[0],y:T[1],z:T[2]},programUniforms:W}),getShaderSource:se}}});var of,Ru,Jr,af,Uu,sf,Nu,Vu,Wu=U(()=>{"use strict";J();Je();ne();ae();bt();Yr();of=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Ru=e=>typeof e=="number"?[e,e,e]:e,Jr=(e,t)=>t<=1?e:e+(e-1)*(t-1),af=(e,t,r,n=1)=>{let o=Jr(t,n);return Math.floor((e[0]*(r-1)-r+o)/2)},Uu=(e,t,r,n,o)=>{o==null&&(o=af(e,t[0],n[0]));let i=[0,0,0,r];for(let a=0;a<3;a++)e[a]+2*o>=t[a]&&(i[a]=Math.trunc((e[a]-t[a]+2*o)/n[a]+1));return i},sf=(e,t,r,n,o,i,a,d,l,p)=>{let m,u,h,_;if(e==="VALID"&&(e=0),typeof e=="number"){m={top:e,bottom:e,left:e,right:e,front:e,back:e};let y=Uu([t,r,n,1],[d,l,p],1,[o,i,a],e);u=y[0],h=y[1],_=y[2]}else if(Array.isArray(e)){if(!e.every((g,x,$)=>g===$[0]))throw Error(`Unsupported padding parameter: ${e}`);m={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let y=Uu([t,r,n,1],[d,l,p],1,[o,i,a],e[0]);u=y[0],h=y[1],_=y[2]}else if(e==="SAME_UPPER"){u=Math.ceil(t/o),h=Math.ceil(r/i),_=Math.ceil(n/a);let y=(u-1)*o+d-t,g=(h-1)*i+l-r,x=(_-1)*a+p-n,$=Math.floor(y/2),v=y-$,S=Math.floor(g/2),T=g-S,A=Math.floor(x/2),k=x-A;m={top:S,bottom:T,left:A,right:k,front:$,back:v}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:m,outDepth:u,outHeight:h,outWidth:_}},Nu=(e,t,r,n,o,i=!1,a="channelsLast")=>{let d,l,p,m,u;if(a==="channelsLast")[d,l,p,m,u]=e;else if(a==="channelsFirst")[d,u,l,p,m]=e;else throw new Error(`Unknown dataFormat ${a}`);let[h,,_,y,g]=t,[x,$,v]=Ru(r),[S,T,A]=Ru(n),k=Jr(_,S),P=Jr(y,T),O=Jr(g,A),{padInfo:R,outDepth:G,outHeight:q,outWidth:j}=sf(o,l,p,m,x,$,v,k,P,O),W=i?h*u:h,Y=[0,0,0,0,0];return a==="channelsFirst"?Y=[d,W,G,q,j]:a==="channelsLast"&&(Y=[d,G,q,j,W]),{batchSize:d,dataFormat:a,inDepth:l,inHeight:p,inWidth:m,inChannels:u,outDepth:G,outHeight:q,outWidth:j,outChannels:W,padInfo:R,strideDepth:x,strideHeight:$,strideWidth:v,filterDepth:_,filterHeight:y,filterWidth:g,effectiveFilterDepth:k,effectiveFilterHeight:P,effectiveFilterWidth:O,dilationDepth:S,dilationHeight:T,dilationWidth:A,inShape:e,outShape:Y,filterShape:t}},Vu=(e,t,r,n,o,i)=>{let a=i==="channelsLast",d=a?e[0].dims[3]:e[0].dims[1],l=!1,p=[64,1,1],m={x:r.map((v,S)=>S)},u=[Math.ceil(of(m.x.map(v=>r[v]))/p[0]),1,1];ue("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${u}`);let h=l?a&&d%4!==0?3:4:1,_=C.size(r),y=[{type:12,data:_},{type:12,data:n},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];qe(t,y),y.push(...N(e[0].dims,e[1].dims));let g=["rank","rank"],x=e.length===3;x&&(y.push(...N(e[2].dims)),g.push("rank")),y.push(...N(r));let $=v=>{let S=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:n.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Ke(t,S);let T=l?4:1,A=ye(e[0].dataType),k=E("x",e[0].dataType,e[0].dims.length,h===3?1:h),P=E("W",e[1].dataType,e[1].dims.length,T),O=[k,P],R=M("result",e[0].dataType,r.length,T),G="";if(x){let W=E("bias",e[2].dataType,e[2].dims.length,T);O.push(W),G+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l?`vec4<${A}>`:A} {
          return bias[${a?F("coords",4,5):F("coords",1,5)}${l?"/ 4":""}];
        }`}let q=Pe(h,A),j=Fe(t,q,A);return`
            ${G}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${k.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${P.getByIndices("aIndices")};
            }
          ${v.registerUniforms(S).declareVariables(...O,R)}
          ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${R.offsetToIndices("global_idx")};
              let batch = ${F("coords",0,k.rank)};
              let d2 = ${a?F("coords",k.rank-1,k.rank):F("coords",1,k.rank)};
              let xFRCCorner = vec3<u32>(${a?F("coords",1,k.rank):F("coords",2,k.rank)},
              ${a?F("coords",2,k.rank):F("coords",3,k.rank)},
              ${a?F("coords",3,k.rank):F("coords",4,k.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?F("uniforms.x_shape",1,k.rank):F("uniforms.x_shape",2,k.rank)};
              let xShapeZ = ${a?F("uniforms.x_shape",2,k.rank):F("uniforms.x_shape",3,k.rank)};
              let xShapeW = ${a?F("uniforms.x_shape",3,k.rank):F("uniforms.x_shape",4,k.rank)};
              let xShapeU = ${a?F("uniforms.x_shape",4,k.rank):F("uniforms.x_shape",1,k.rank)};
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
              ${x?"value = value + getBiasByOutputCoords(coords)":""};
              ${j}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${a};${h};${x}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:u[0],y:u[1],z:u[2]},programUniforms:y}),getShaderSource:$}}});var Lu,Gu,Hu=U(()=>{"use strict";J();ne();ae();bt();Lu=(e,t,r,n)=>{let o=e.length>2,i=o?"value += b[output_channel];":"",a=e[0].dims,d=e[1].dims,l=t.format==="NHWC",p=l?r[3]:r[1],m=p/t.group,u=l&&m>=4?me(p):1,h=C.size(r)/u,_=[{type:12,data:h},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:m}];qe(t,_),_.push(...N(a,[d[0],d[1],d[2],d[3]/u]));let y=o?["rank","rank","rank"]:["rank","rank"];_.push(...N([r[0],r[1],r[2],r[3]/u]));let g=x=>{let $=M("output",e[0].dataType,r.length,u),v=ye($.type.tensor),S=Fe(t,$.type.value,v),T=E("x",e[0].dataType,a.length),A=E("w",e[1].dataType,d.length,u),k=[T,A];o&&k.push(E("b",e[2].dataType,e[2].dims,u));let P=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Ke(t,P);let O=l?`
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
            let xVal = ${T.get("batch","xHeight","xWidth","input_channel")};
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

            let xVal = ${T.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${A.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${x.registerUniforms(P).declareVariables(...k,$)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${$.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${u} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${O}
    ${i}
    ${S}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${u}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:_}),getShaderSource:g}},Gu=(e,t,r,n)=>{let o=e.length>2,i=me(r[3]),a=me(r[2]),d=C.size(r)/i/a,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/i],p=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/i],m=[r[0],r[1],r[2],r[3]/i],u=[{type:12,data:d},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];qe(t,u),u.push(...N(l,p,m));let h=(a-1)*t.strides[1]+p[1],_=y=>{let g=M("output",e[0].dataType,m.length,i),x=ye(g.type.tensor),$=Fe(t,g.type.value,x),v=E("x",e[0].dataType,l.length,i),S=E("w",e[1].dataType,p.length,i),T=[v,S];o&&T.push(E("b",e[2].dataType,e[2].dims,i));let A=o?"value += b[output_channel];":"",k=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Ke(t,k),`
  ${y.registerUniforms(k).declareVariables(...T,g)}
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

    var x_vals: array<${v.type.value}, ${h}>;
    var values: array<${g.type.value}, ${a}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${p[0]}; w_height++) {
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
        for (var w_width: u32 = 0u; w_width < ${p[1]}; w_width++) {
          let w_val = ${S.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${a}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${a}u; i++) {
      var value = values[i];
      ${A}
      ${$}
      ${g.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${i};${a};${h};${p[0]};${p[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:u}),getShaderSource:_}}});var uf,go,df,bo,yo,Fu,lf,cf,_o,qu=U(()=>{"use strict";ne();Mu();Wu();Xr();Hu();bt();Qr();ut();uf=(e,t,r,n,o,i)=>{let a=e[0],d=e.slice(i?1:2,i?3:4),l=d.length,p=t[0],u=t.slice(2).map((y,g)=>y+(y-1)*(r[g]-1)),_=d.map((y,g)=>y+n[g]+n[g+l]).map((y,g)=>Math.floor((y-u[g]+o[g])/o[g]));return _.splice(0,0,a),_.splice(i?3:1,0,p),_},go=[2,3,1,0],df=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[1]*t.group;if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},bo=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let i=2;i<t[1].dims.length;++i)r[i-2]===0&&(r[i-2]=t[1].dims[i]);let n=e.pads.slice();It.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.format==="NHWC",e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:r,pads:n}),o},yo=e=>{let t=jr(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],o=e.dilations,i=e.group,a=e.kernel_shape,d=e.pads,l=e.strides,p=e.w_is_const();return{autoPad:n,format:r,dilations:o,group:i,kernelShape:a,pads:d,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},Fu=(e,t,r,n)=>{let o=r.format==="NHWC",i=uf(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,o);if(r.group!==1){let k=[t[0]];if(o){let O=e.kernelCustomData.wT??e.compute(Ee(t[1],go),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=O),k.push(O)}else k.push(t[1]);t.length===3&&k.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(Gu(k,r,i,n),{inputs:k}):e.compute(Lu(k,r,i,n),{inputs:k});return}let a=t.length===3,d=t[0].dims[o?1:2],l=t[0].dims[o?2:3],p=t[0].dims[o?3:1],m=t[1].dims[2],u=t[1].dims[3],h=i[o?1:2],_=i[o?2:3],y=i[o?3:1],g=o&&m===d&&u===l&&r.pads[0]===0&&r.pads[1]===0;if(g||m===1&&u===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let k=i[0],P,O,R,G=[];if(o){let W=e.kernelCustomData.wT??e.compute(Ee(t[1],go),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=W),g){let Y=d*l*p;P=t[0].reshape([1,k,Y]),O=W.reshape([1,Y,y]),R=[1,k,y]}else P=t[0].reshape([k,d*l,p]),O=W.reshape([1,p,y]),R=[k,h*_,y];G.push(P),G.push(O)}else P=t[0].reshape([k,p,d*l]),O=t[1].reshape([1,y,p]),R=[k,y,h*_],G.push(O),G.push(P);a&&G.push(t[2]);let q=R[2],j=G[0].dims[G[0].dims.length-1];q<8&&j<8?e.compute(Zr(G,r,i,R,o,n),{inputs:G}):e.compute(tr(G,r,i,R,o,n),{inputs:G});return}let x=!0,$=e.kernelCustomData.wT??e.compute(Ee(t[1],go),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let v=[t[0],$];a&&v.push(t[2]);let S=o?h*_:y,T=o?y:h*_,A=m*u*p;e.compute(Bu(v,r,i,S,T,A,a,x,n),{inputs:v})},lf=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],i=[1].concat(t.strides),a=[1].concat(t.dilations),d=[1].concat(t.kernelShape),l=bo({...t,pads:o,strides:i,dilations:a,kernelShape:d},n);Fu(e,n,l,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},cf=(e,t,r)=>{let n=r.format==="NHWC"?"channelsLast":"channelsFirst",o=bo(r,t),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,a=Nu(t[0].dims,t[1].dims,r.strides,r.dilations,i,!1,n);e.compute(Vu(t,o,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],n))},_o=(e,t)=>{if(df(e.inputs,t),e.inputs[0].dims.length===3)lf(e,t);else if(e.inputs[0].dims.length===5)cf(e,e.inputs,t);else{let r=bo(t,e.inputs);Fu(e,e.inputs,r)}}});var Ku,ju=U(()=>{"use strict";J();Je();ne();ae();Ku=(e,t,r)=>{let n=e.length>2,o=t.outputShape,i=t.format==="NHWC",a=t.group,d=e[1].dims,l=d[2]/a,p=d[3],m=i?me(p):1,u=C.size(o)/m,h=[Math.ceil(u/64),1,1];ue("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${h}`);let _=["rank","rank"],y=[t.strides[0],t.strides[1]],g=[t.kernelShape[i?1:2],t.kernelShape[i?2:3]],x=[t.dilations[0],t.dilations[1]],$=[g[0]+(t.dilations[0]<=1?0:(t.kernelShape[i?1:2]-1)*(t.dilations[0]-1)),g[1]+(t.dilations[1]<=1?0:(t.kernelShape[i?2:3]-1)*(t.dilations[1]-1))],v=[$[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),$[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],S=[{type:12,data:u},{type:12,data:y},{type:12,data:g},{type:12,data:x},{type:12,data:$},{type:6,data:v},{type:12,data:l},{type:12,data:p},...N(e[0].dims,e[1].dims)];n&&(S.push(...N(e[2].dims)),_.push("rank")),S.push(...N(o));let T=A=>{let k=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:y.length},{name:"filter_dims",type:"u32",length:g.length},{name:"dilations",type:"u32",length:g.length},{name:"effective_filter_dims",type:"u32",length:$.length},{name:"pads",type:"i32",length:v.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],P=ye(e[0].dataType),O=i?1:2,R=i?2:3,G=i?3:1,q=E("W",e[1].dataType,e[1].dims.length,m),j=E("Dy",e[0].dataType,e[0].dims.length),W=[j,q];n&&W.push(E("bias",e[2].dataType,[o[G]].length,m));let Y=M("result",e[0].dataType,o.length,m),se=`
            let outputIndices = ${Y.offsetToIndices(`global_idx * ${m}`)};
            let batch = ${Y.indicesGet("outputIndices",0)};
            let d1 = ${Y.indicesGet("outputIndices",G)};
            let r = ${Y.indicesGet("outputIndices",O)};
            let c = ${Y.indicesGet("outputIndices",R)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${Y.type.value}(0.0);
            for (var wR: u32 = 0; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${P}(dyRCorner) + ${P}(wR)) / ${P}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${P}(uniforms.Dy_shape[${O}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);

              for (var wC: u32 = 0; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${P}(dyCCorner) + ${P}(wC)) / ${P}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${P}(uniforms.Dy_shape[${R}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + 1) {
                  let xValue = ${i?j.get("batch","idyR","idyC","inputChannel"):j.get("batch","inputChannel","idyR","idyC")};
                  let w_offset = ${q.indicesToOffset(`${q.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
                  let wValue = ${q.getByOffset(`w_offset / ${m}`)};
                  dotProd = dotProd + xValue * wValue;
                  inputChannel = inputChannel + 1;
                }
              }
            }
            let value = dotProd${n?` + bias[d1 / ${m}]`:""};
            ${Y.setByOffset("global_idx","value")};
          `;return`
    ${A.registerUniforms(k).declareVariables(...W,Y)}
      ${A.mainStart()}
      ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${se}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${m}`,inputDependencies:_},getRunData:()=>({dispatchGroup:{x:h[0],y:h[1],z:h[2]},outputs:[{dims:r?r(o):o,dataType:e[0].dataType}],programUniforms:S}),getShaderSource:T}}});var pf,mf,ff,Yu,Zu,hf,Qu,gf,Xu,Ju=U(()=>{"use strict";ju();bt();ut();pf=(e,t,r,n,o,i)=>(e-1)*t+r+(n-1)*o+1-i,mf=(e,t,r,n,o)=>{let i=Math.floor(e/2);t==="SAME_UPPER"?(r[n]=i,r[o]=e-i):t==="SAME_LOWER"&&(r[n]=e-i,r[o]=i)},ff=(e,t,r,n,o,i,a,d,l,p)=>{let m=e.length-2,u=p.length===0;l.length<m&&l.push(...Array(m-l.length).fill(0));let h=e[0],_=t[d?3:1]*o;for(let y=0,g=e.length-m-(d?1:0);y<m;++y,++g){let x=e[g],$=u?x*a[y]:p[y],v=pf(x,a[y],i[y],t[g],r[y],$);mf(v,n,i,y,y+m),u&&p.push(a[y]*(x-1)+l[y]+(t[g]-1)*r[y]+1-i[y]-i[y+m])}p.splice(0,0,h),p.splice(d?3:1,0,_)},Yu=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((u,h)=>u*h,1)===0){r.length=0;for(let u=2;u<t[1].dims.length;++u)r.push(t[1].dims[u])}let n=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let o=e.pads.slice(),i=e.outputShape.slice(),a=e.outputPadding.slice(),d=t[0].dims,l=e.dilations.slice();if(l.reduce((u,h)=>u+h,0)===0){let u=t[0].dims.length-2;l=new Array(u).fill(1)}let p=e.strides.slice();if(p.reduce((u,h)=>u+h,0)===0){let u=t[0].dims.length-2;p=new Array(u).fill(1)}ff(d,r,l,e.autoPad,e.group,o,p,n,a,i);let m=Object.assign({},e);return Object.assign(m,{kernelShape:r,pads:o,outputPadding:a,outputShape:i,dilations:l,strides:p}),m},Zu=e=>{let t=jr(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,i=e.group,a=e.kernelShape,d=e.pads,l=e.strides,p=e.wIsConst(),m=e.outputPadding,u=e.outputShape;return{autoPad:n,format:r,dilations:o,group:i,kernelShape:a,outputPadding:m,outputShape:u,pads:d,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},hf=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[0];if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==o))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((m,u)=>m+u,0)>0&&t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.reduce((m,u)=>m+u,0)>0&&t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.reduce((m,u)=>m+u,0)>0&&t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.outputPadding.length!==i&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((m,u)=>m+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Qu=(e,t,r,n)=>{let o=e.kernelCustomData.wT??e.compute(Ee(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=o);let i=[t[0],o];t.length===3&&i.push(t[2]),e.compute(Ku(i,r,n),{inputs:i})},gf=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=t.kernelShape;(o.length===0||o[0]===0)&&(o=[e.inputs[1].dims[2]]);let i=t.dilations;(i.length===0||i[0]===0)&&(i=[1]);let a=t.strides;(a.length===0||a[0]===0)&&(a=[1]);let d=t.pads;d.length===0&&(d=[0,0]),d=[0,d[0],0,d[1]],a=[1].concat(a),i=[1].concat(i),o=[1].concat(o);let l=Yu({...t,pads:d,strides:a,dilations:i,kernelShape:o},n);Qu(e,n,l,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},Xu=(e,t)=>{if(hf(e.inputs,t),e.inputs[0].dims.length===3)gf(e,t);else{let r=Yu(t,e.inputs);Qu(e,e.inputs,r)}}});var bf,ed,td,rd=U(()=>{"use strict";J();ne();Se();ae();bf=(e,t,r,n)=>{let o=C.size(t),i=t.length,a=E("input",e,i),d=M("output",e,i),l=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),p=C.normalizeAxis(l,i),m=u=>{let h=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,_=F("uniforms.input_shape","uniforms.axis",i),y=n.reverse?h+(n.exclusive?" + 1":""):"0",g=n.reverse?_:h+(n.exclusive?"":" + 1");return`
                ${u.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,d)}
                ${u.mainStart()}
                  ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${d.offsetToIndices("global_idx")};
                  var sum = ${d.type.value}(0);
                  let first : i32 = ${y};
                  let last : i32 = ${g};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${d.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:p},...N(t,t)]}),getShaderSource:m}},ed=(e,t)=>{let r=e.inputs[0].dims,n=e.inputs[0].dataType,o=e.inputs[1];e.compute(bf(n,r,o,t),{inputs:[0]})},td=e=>{let t=e.exclusive===1,r=e.reverse===1;return ee({exclusive:t,reverse:r})}});var yf,_f,wf,nd,od,id=U(()=>{"use strict";J();ne();Se();ae();yf=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},_f=(e,t,r,n)=>{let o=[];o.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<t;++i)o.push(r.indicesSet("a",e[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},wf=(e,t)=>{let r,n,o,i,a,d,l=t.format==="NHWC",p=t.blocksize,m=t.mode==="DCR";l?([r,n,o,i]=e.dims,a=m?[r,n,o,p,p,i/p**2]:[r,n,o,i/p**2,p,p],d=m?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,o,i]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],a=m?[r,p,p,i/p**2,n,o]:[r,i/p**2,p,p,n,o],d=m?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let u=e.reshape(a),h=u.dims.length,_=e.dataType,y=E("a",_,h),g=M("output",_,h),x=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(y,g)}

  ${_f(d,h,y,g)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${g.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${g.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let v=l?[r,n*p,o*p,i/p**2]:[r,i/p**2,n*p,o*p],S=C.size(v),T=u.dims,A=C.sortBasedOnPerm(T,d);return{outputs:[{dims:v,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(S/64)},programUniforms:[{type:12,data:S},...N(T,A)]}},getShaderSource:x}},nd=(e,t)=>{yf(e.inputs),e.compute(wf(e.inputs[0],t))},od=e=>ee({blocksize:e.blocksize,mode:e.mode,format:e.format})});var wo,en,ad,vf,$f,vo,$o,sd,xf,ud,dd,ld=U(()=>{"use strict";J();ne();Se();ae();wo="[a-zA-Z]|\\.\\.\\.",en="("+wo+")+",ad="^"+en+"$",vf="("+en+",)*"+en,$f="^"+vf+"$",vo=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,r){let n=this.symbolToIndices.get(t);n===void 0?n=[r]:n.push(r),this.symbolToIndices.set(t,n)}},$o=class{constructor(t,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,o]=r.includes("->")?r.split("->",2):[r,""];if(!n.match(RegExp($f)))throw new Error("Invalid LHS term");if(n.split(",").forEach((d,l)=>{let p=t[l].dims.slice();if(!d.match(RegExp(ad)))throw new Error("Invalid LHS term");let m=this.processTerm(d,!0,p,l);this.lhs.push(m)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([d,l])=>l.count===1||d==="...").map(([d])=>d).join("");else if(!o.match(RegExp(en)))throw new Error("Invalid RHS");o.match(RegExp(wo,"g"))?.forEach(d=>{if(d==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let l=this.symbolToInfo.get(d);if(l===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(l.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(t,r,n){let o=this.symbolToInfo.get(t);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(n)}else o={count:1,dimValue:r,inputIndices:[n]};this.symbolToInfo.set(t,o)}processTerm(t,r,n,o=-1){let i=n.length,a=!1,d=[],l=0;if(!t.match(RegExp(ad))&&!r&&t!=="")throw new Error("Invalid LHS term");let p=t.match(RegExp(wo,"g")),m=new vo(o);return p?.forEach((u,h)=>{if(u==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let _=i-p.length+1;if(_<0)throw new Error("Ellipsis out of bounds");if(d=n.slice(l,l+_),this.hasEllipsis){if(this.ellipsisDims.length!==d.length||this.ellipsisDims.toString()!==d.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=d;else throw new Error("Ellipsis must be specified in the LHS");for(let y=0;y<d.length;y++){let g=String.fromCharCode("0".charCodeAt(0)+y);m.addSymbol(g,h+y),this.addSymbol(g,n[l++],o)}}else m.addSymbol(u,h+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(u,n[l++],o)}),m}},sd=e=>e+"_max",xf=(e,t,r,n)=>{let i=e.map(m=>m.length).map((m,u)=>E(`input${u}`,t,m)),a=C.size(n),d=M("output",t,n.length),l=[...r.symbolToInfo.keys()].filter(m=>!r.rhs.symbolToIndices.has(m)),p=m=>{let u=[],h="var prod = 1.0;",_="var sum = 0.0;",y="sum += prod;",g=[],x=[],$=[],v=[],S=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((A,k)=>{if(r.rhs.symbolToIndices.has(k)){let P=r.rhs.symbolToIndices.get(k)?.[0];P!==void 0&&r.lhs.forEach((O,R)=>{if(A.inputIndices.includes(R)){let G=O.symbolToIndices.get(k);if(G===void 0)throw new Error("Invalid symbol error");G.forEach(q=>{u.push(`${i[R].indicesSet(`input${R}Indices`,q,d.indicesGet("outputIndices",P))}`)})}})}else r.lhs.forEach((P,O)=>{if(A.inputIndices.includes(O)){let R=P.symbolToIndices.get(k);if(R===void 0)throw new Error("Invalid symbol error");R.forEach(G=>{g.push(`${i[O].indicesSet(`input${O}Indices`,G,`${k}`)}`)}),v.push(`prod *= ${i[O].getByIndices(`input${O}Indices`)};`)}}),x.push(`for(var ${k}: u32 = 0; ${k} < uniforms.${sd(k)}; ${k}++) {`),$.push("}")});let T=S?[...u,`let sum = ${i.map((A,k)=>A.getByIndices(`input${k}Indices`)).join(" * ")};`]:[...u,_,...x,...g,h,...v,y,...$];return`
            ${m.registerUniforms(l.map(A=>({name:`${sd(A)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,d)}

            ${m.mainStart()}
            ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${d.offsetToIndices("global_idx")};
            ${i.map((A,k)=>`var input${k}Indices: ${i[k].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${d.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let m=l.filter(h=>r.symbolToInfo.has(h)).map(h=>({type:12,data:r.symbolToInfo.get(h)?.dimValue||0}));m.push({type:12,data:a});let u=e.map((h,_)=>[...N(h)]).reduce((h,_)=>h.concat(_),m);return u.push(...N(n)),{outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:u}},getShaderSource:p}},ud=(e,t)=>{let r=new $o(e.inputs,t.equation),n=r.outputDims,o=e.inputs.map((i,a)=>i.dims);e.compute(xf(o,e.inputs[0].dataType,r,n))},dd=e=>{let t=e.equation.replace(/\s+/g,"");return ee({equation:t})}});var Sf,cd,Tf,If,pd,md=U(()=>{"use strict";J();ne();ae();Sf=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,o=t.length<r.length?0:t.length-r.length;for(;n<r.length&&o<t.length;++n,++o)if(r[n]!==t[o]&&r[n]!==1&&t[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},cd=(e,t)=>{let r=e.length-t.length,n=[];for(let o=0;o<r;++o)n.push(e[o]);for(let o=0;o<t.length;++o)n.push(t[o]===1?e[o+r]:t[o]);return n},Tf=(e,t)=>e.length>t.length?cd(e,t):cd(t,e),If=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=Tf(t,r),o=e[0].dataType,i=o===9||C.size(t)===1,a=o===9||t.length>0&&t[t.length-1]%4===0?4:1,d=i||n.length>0&&n[n.length-1]%4===0?4:1,l=Math.ceil(C.size(n)/d),p=u=>{let h=E("input",o,t.length,a),_=M("output",o,n.length,d),y;if(o===9){let g=(x,$,v="")=>`
          let outputIndices${$} = ${_.offsetToIndices(`outputOffset + ${$}u`)};
          let offset${$} = ${h.broadcastedIndicesToOffset(`outputIndices${$}`,_)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${x}[${$}] = ${v}(${h.getByOffset(`index${$}`)}[component${$}]);
        `;y=`
        let outputOffset = global_idx * ${d};
        var data = vec4<u32>(0);
        ${g("data",0,"u32")}
        ${g("data",1,"u32")}
        ${g("data",2,"u32")}
        ${g("data",3,"u32")}
        ${_.setByOffset("global_idx","data")}
      }`}else y=`
        let outputIndices = ${_.offsetToIndices(`global_idx * ${d}`)};
        let inputOffset = ${h.broadcastedIndicesToOffset("outputIndices",_)};
        let data = ${_.type.value}(${h.getByOffset(`inputOffset / ${a}`)});
        ${_.setByOffset("global_idx","data")}
      }`;return`
    ${u.registerUniform("vec_size","u32").declareVariables(h,_)}
    ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${y}`},m=[{type:12,data:l},...N(t,n)];return{name:"Expand",shaderCache:{hint:`${n.length};${a}${d}`,inputDependencies:["rank"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:m})}},pd=e=>{Sf(e.inputs),e.compute(If(e.inputs),{inputs:[0]})}});var Cf,fd,hd=U(()=>{"use strict";J();ne();ae();Kr();Cf=e=>{let t=e[0].dataType,r=C.size(e[0].dims),n=C.size(e[1].dims),o=n%4===0,i=a=>{let d=E("x",t,[1],4),l=E("bias",t,[1],4),p=M("y",t,[1],4),m=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],u=_=>`
      let bias${_}_offset: u32 = (global_idx * 4 + ${_}) % uniforms.bias_size;
      let bias${_} = ${l.getByOffset(`bias${_}_offset / 4`)}[bias${_}_offset % 4];`,h=o?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${u(0)}${u(1)}${u(2)}${u(3)}
      let bias = ${d.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(m).declareVariables(d,l,p)}

    ${po(ke(t))}

    ${a.mainStart(Ct)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${d.getByOffset("global_idx")};
      ${h}
      let x_in = x + bias;
      ${p.setByOffset("global_idx",mo("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/Ct/4)}})}},fd=e=>{e.inputs.length<2||C.size(e.inputs[1].dims)===0?lu(e):e.compute(Cf(e.inputs))}});var Af,kf,gd,bd,yd=U(()=>{"use strict";J();ne();Se();ae();Af=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},kf=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,i=C.normalizeAxis(t.axis,o),a=r.slice(0);a.splice(i,1,...n);let d=r[i],l=e[0].dataType===9?4:1,p=Math.ceil(C.size(a)/l),m=[{type:12,data:p},{type:6,data:d},{type:12,data:i},...N(e[0].dims,e[1].dims,a)],u=h=>{let _=E("data",e[0].dataType,e[0].dims.length,l),y=E("inputIndices",e[1].dataType,e[1].dims.length),g=M("output",e[0].dataType,a.length,l),x=v=>{let S=n.length,T=`var indicesIndices${v}  = ${y.type.indices}(0);`;for(let A=0;A<S;A++)T+=`${S>1?`indicesIndices${v}[${A}]`:`indicesIndices${v}`} = ${a.length>1?`outputIndices${v}[uniforms.axis + ${A}]`:`outputIndices${v}`};`;T+=`
          var idx${v} = ${y.getByIndices(`indicesIndices${v}`)};
          if (idx${v} < 0) {
            idx${v} = idx${v} + uniforms.axisDimLimit;
          }
          var dataIndices${v} : ${_.type.indices};
        `;for(let A=0,k=0;A<o;A++)A===i?(T+=`${o>1?`dataIndices${v}[${A}]`:`dataIndices${v}`} = u32(idx${v});`,k+=S):(T+=`${o>1?`dataIndices${v}[${A}]`:`dataIndices${v}`} = ${a.length>1?`outputIndices${v}[${k}]`:`outputIndices${v}`};`,k++);return T},$;if(e[0].dataType===9){let v=(S,T,A="")=>`
          let outputIndices${T} = ${g.offsetToIndices(`outputOffset + ${T}u`)};
          ${x(T)};
          let offset${T} = ${_.indicesToOffset(`dataIndices${T}`)};
          let index${T} = offset${T} / 4u;
          let component${T} = offset${T} % 4u;
          ${S}[${T}] = ${A}(${_.getByOffset(`index${T}`)}[component${T}]);
        `;$=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${v("value",0,"u32")}
        ${v("value",1,"u32")}
        ${v("value",2,"u32")}
        ${v("value",3,"u32")}
        ${g.setByOffset("global_idx","value")}
      `}else $=`
      let outputIndices = ${g.offsetToIndices("global_idx")};
      ${x("")};
      let value = ${_.getByIndices("dataIndices")};
      ${g.setByOffset("global_idx","value")};
      `;return`
      ${h.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(_,y,g)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:m}),getShaderSource:u}},gd=e=>ee({axis:e.axis}),bd=(e,t)=>{let r=e.inputs;Af(r),e.compute(kf(e.inputs,t))}});var Ef,_d,wd,vd=U(()=>{"use strict";J();ne();ae();Ef=(e,t,r,n,o,i,a,d,l)=>{let p=[{type:12,data:i},{type:12,data:n},{type:12,data:o},{type:12,data:r},{type:12,data:a},{type:12,data:d},{type:12,data:l}],m=[i];p.push(...N(t.dims,m));let u=h=>{let _=E("indices_data",t.dataType,t.dims.length),y=M("input_slice_offsets_data",12,1,1),g=[_,y],x=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${h.registerUniforms(x).declareVariables(...g)}
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
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:m,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:p}),getShaderSource:u},{inputs:[t],outputs:[-1]})[0]},_d=(e,t)=>{let r=e.inputs,n=r[0].dims,o=r[0].dataType,i=r[1].dims,a=i[i.length-1],d=C.sizeToDimension(i,i.length-1),l=C.sizeFromDimension(n,t.batchDims+a),p=C.sizeToDimension(n,t.batchDims),m=C.sizeFromDimension(n,t.batchDims),u=d/p,h=new Array(a),_=l;for(let T=0;T<a;++T)h[a-1-T]=_,_*=n[t.batchDims+a-1-T];let y=Ef(e,r[1],h,t.batchDims,n,d,u,m,a),g=t.batchDims+a;if(g>n.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let x=i.slice(0,-1).concat(n.slice(g)),$=C.size(x),v=[{type:12,data:$},{type:12,data:l},...N(r[0].dims,y.dims,x)],S=T=>{let A=E("data",r[0].dataType,r[0].dims.length),k=E("slice_offsets",12,y.dims.length),P=M("output",r[0].dataType,x.length);return`
          ${T.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(A,k,P)}
            ${T.mainStart()}
            ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:x,dataType:o}],dispatchGroup:{x:Math.ceil($/64)},programUniforms:v}),getShaderSource:S},{inputs:[r[0],y]})},wd=e=>({batchDims:e.batch_dims,cacheKey:""})});var Pf,zf,$d,xd,Sd=U(()=>{"use strict";J();ne();Se();ae();Pf=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=C.normalizeAxis(t.quantizeAxis,e[0].dims.length),n=t.blockSize,o=e[0],i=e[2],a=e.length===4?e[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((d,l)=>l===r?Math.ceil(d/n)===i.dims[l]:d===i.dims[l]).reduce((d,l)=>d&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==i.dims.length||!a.dims.map((d,l)=>d===i.dims[l]).reduce((d,l)=>d&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},zf=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,i=C.normalizeAxis(t.gatherAxis,o),a=C.normalizeAxis(t.quantizeAxis,o),d=r.slice(0);d.splice(i,1,...n);let l=C.size(d),p=e[2].dataType,u=e[0].dataType===22,h=[{type:12,data:l},{type:12,data:a},{type:12,data:i},{type:12,data:t.blockSize},...N(...e.map((y,g)=>y.dims),d)],_=y=>{let g=E("data",e[0].dataType,e[0].dims.length),x=E("inputIndices",e[1].dataType,e[1].dims.length),$=E("scales",e[2].dataType,e[2].dims.length),v=e.length>3?E("zeroPoint",e[3].dataType,e[3].dims.length):void 0,S=M("output",p,d.length),T=[g,x,$];v&&T.push(v);let A=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${y.registerUniforms(A).declareVariables(...T,S)}
        ${y.mainStart()}
        let output_indices = ${S.offsetToIndices("global_idx")};
        var indices_indices = ${x.type.indices}(0);
        ${(()=>n.length>1?`
          for (var i: u32 = 0; i < ${n.length}; i++) {
            let index = ${S.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${x.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${S.indicesGet("output_indices","uniforms.gather_axis")};`)()};
        var data_indices = ${g.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${S.indicesGet("output_indices","i")};
          ${g.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${x.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[i]};
        }
        ${g.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${d.length}; i++) {
          let index = ${S.indicesGet("output_indices",`i + ${n.length} - 1`)};
          ${g.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${g.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${g.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${u?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${$.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${$.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${$.getByIndices("scale_indices")};
        ${(()=>v?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${u?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0")()};
        let dequantized_data = ${ke(p)}(quantized_data - zero_point) * scale;
        ${S.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((y,g)=>g!==1).map(y=>y.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(y,g)=>"rank")},getRunData:()=>({outputs:[{dims:d,dataType:p}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:h}),getShaderSource:_}},$d=(e,t)=>{let r=e.inputs;Pf(r,t),e.compute(zf(e.inputs,t))},xd=e=>ee({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})});var Of,Df,Td,Id,Cd=U(()=>{"use strict";J();ne();Se();ae();Of=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Df=(e,t)=>{let r=e[0].dims,n=e[0].dataType,o=r.length,i=e[1].dims,a=e[1].dataType,d=C.normalizeAxis(t.axis,o),l=r[d],p=i.slice(0),m=C.size(p),u=E("input",n,o),h=E("indicesInput",a,i.length),_=M("output",n,p.length),y=[{type:12,data:m},{type:6,data:l},{type:12,data:d}];return y.push(...N(r,i,p)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:y}),getShaderSource:$=>`
      ${$.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(u,h,_)}
      ${$.mainStart()}
      ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${_.offsetToIndices("global_idx")};

      var idx = ${h.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${u.type.indices}(outputIndices);
      ${u.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${u.getByIndices("inputIndices")};

      ${_.setByOffset("global_idx","value")};
  }`}},Td=e=>ee({axis:e.axis}),Id=(e,t)=>{let r=e.inputs;Of(r),e.compute(Df(e.inputs,t))}});var Bf,Mf,Ad,kd,Ed=U(()=>{"use strict";J();ne();ae();Bf=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Mf=(e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[o,i,a]=Vr.getShapeOfGemmResult(r,t.transA,n,t.transB,e.length===3?e[2].dims:void 0),d=[o,i];if(!d)throw new Error("Can't use gemm on the given tensors");let l=16,p=Math.ceil(i/l),m=Math.ceil(o/l),u=!0,h=C.size(d),_=[{type:12,data:u?p:h},{type:12,data:o},{type:12,data:i},{type:12,data:a},{type:1,data:t.alpha},{type:1,data:t.beta}],y=["type","type"];e.length===3&&(_.push(...N(e[2].dims)),y.push("rank")),_.push(...N(d));let g=$=>{let v="";t.transA&&t.transB?v="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?v="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?v="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(v="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let S=t.alpha===1?"":"value *= uniforms.alpha;",T=E("a",e[0].dataType,e[0].dims),A=E("b",e[1].dataType,e[1].dims),k=T.type.value,P=null,O=[T,A];e.length===3&&(P=E("c",e[2].dataType,e[2].dims.length),O.push(P));let R=M("output",e[0].dataType,d.length);O.push(R);let G=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${$.registerUniforms(G).declareVariables(...O)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${k}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${v}
    }

    ${S}
    ${(()=>P!=null?`let cOffset = ${P.broadcastedIndicesToOffset("vec2(m, n)",R)}; value += ${k}(uniforms.beta) * ${P.getByOffset("cOffset")};`:"")()}
    output[global_idx] = value;
  }`},x=$=>{let v=E("a",e[0].dataType,e[0].dims),S=E("b",e[1].dataType,e[1].dims),T=null,A=[v,S];e.length===3&&(T=E("c",e[2].dataType,e[2].dims.length),A.push(T));let k=M("output",e[0].dataType,d.length);A.push(k);let P=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],O="",R="";t.transA&&t.transB?(R=`
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
      `,O="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(R=`
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
      `,O="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(R=`
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
      `,O="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(R=`
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
      `,O="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let G=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${$.registerUniforms(P).declareVariables(...A)}
  var<workgroup> tile_a: array<array<${v.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${S.type.storage}, ${l}>, ${l}>;
  ${$.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${k.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${R}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${O}
      }
      workgroupBarrier();
    }

    ${G}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${(()=>T!=null?`let cOffset = ${T.broadcastedIndicesToOffset("vec2(m, n)",k)}; value += ${k.type.value}(uniforms.beta) * ${T.getByOffset("cOffset")};`:"")()}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return u?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:p*m},programUniforms:_}),getShaderSource:x}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:_}),getShaderSource:g}},Ad=e=>{let t=e.transA,r=e.transB,n=e.alpha,o=e.beta;return{transA:t,transB:r,alpha:n,beta:o,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},kd=(e,t)=>{Bf(e.inputs),e.compute(Mf(e.inputs,t))}});var dt,yt,Ut,Nt,Rf,Uf,Nf,Vf,Wf,Lf,Gf,Hf,Pd,zd,Od=U(()=>{"use strict";J();ne();Se();ae();[dt,yt,Ut,Nt]=[0,1,2,3],Rf=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Uf=`
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
`,Nf=e=>`
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
`,Vf=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Wf=e=>`
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
`,Lf=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${dt}] = batch;
     indices[${yt}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Ut}] = u32(r);
            indices[${Nt}] = u32(c);
          }
        `;case"border":return`
          indices[${Ut}] = u32(clamp(r, 0, H - 1));
          indices[${Nt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Ut}] = gs_reflect(r, border[1], border[3]);
          indices[${Nt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Gf=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${dt}], indices[${yt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${dt}], indices[${yt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${dt}], indices[${yt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${dt}], indices[${yt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${dt}], indices[${yt}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${dt}], indices[${yt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Hf=(e,t)=>{let r=E("x",e[0].dataType,e[0].dims.length),n=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],o=E("grid",e[1].dataType,n.length,2),i=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(i=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[dt,yt,Ut,Nt]=[0,3,1,2]);let a=M("output",e[0].dataType,i.length),d=r.type.value,l=C.size(i),p=[{type:12,data:l},...N(e[0].dims,n,i)],m=u=>`
  ${u.registerUniform("output_size","u32").declareVariables(r,o,a)}
  ${Uf}
  ${Nf(d)}
  ${Vf(t)}
  ${Wf(t)}
  ${Lf(r,d,t)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Ut}]);
      let W_in = i32(uniforms.x_shape[${Nt}]);

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

      let indices = ${a.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${dt}], indices[${Ut}], indices[${Nt}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Gf(a,d,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:u=>{let h=C.size(i);return{outputs:[{dims:i,dataType:u[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:p}},getShaderSource:m}},Pd=(e,t)=>{Rf(e.inputs),e.compute(Hf(e.inputs,t))},zd=e=>ee({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})});var Be,Kf,Bd,Dd,jf,rr,Md,xo=U(()=>{"use strict";J();ne();Se();Nr();Fr();ae();ut();Be=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Kf=(e,t)=>{let r=e[0],n=Be(e,1),o=Be(e,2),i=Be(e,3),a=Be(e,4),d=Be(e,5),l=Be(e,6),p=Be(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let m=r.dims[0],u=r.dims[1],h=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],_=u,y=0,g=0,x=Math.floor(h/t.numHeads);if(l&&p&&C.size(l.dims)&&C.size(p.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==m||l.dims[1]!==t.numHeads||l.dims[3]!==x)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==m||p.dims[1]!==t.numHeads||p.dims[3]!==x)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==p.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(p.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=l.dims[2],g=l.dims[2]}else if(l&&C.size(l.dims)||p&&C.size(p.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(n&&C.size(n.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(n.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,_=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==x)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,_=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==x)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,_=n.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(i&&C.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(n&&n.dims.length===5&&n.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let v=y+_,S=0;if(a&&C.size(a.dims)>0){S=8;let P=a.dims;throw P.length===1?P[0]===m?S=1:P[0]===3*m+2&&(S=3):P.length===2&&P[0]===m&&P[1]===v&&(S=5),S===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let T=!1,A=h;if(o&&C.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(_!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');A=o.dims[2]}else{if(_!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');A=o.dims[1]*o.dims[3],T=!0}}let k=!1;if(a&&C.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(d&&C.size(d.dims)>0){if(d.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(d.dims[0]!==m||d.dims[1]!==t.numHeads||d.dims[2]!==u||d.dims[3]!==v)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:m,sequenceLength:u,pastSequenceLength:y,kvSequenceLength:_,totalSequenceLength:v,maxSequenceLength:g,inputHiddenSize:0,hiddenSize:h,vHiddenSize:A,headSize:x,vHeadSize:Math.floor(A/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:S,scale:t.scale,broadcastResPosBias:k,passPastInKv:T,qkvFormat:$}},Bd=e=>ee({...e}),Dd=ee({perm:[0,2,1,3]}),jf=(e,t,r,n,o,i,a)=>{let d=[n,o,i],l=C.size(d),p=[{type:12,data:l},{type:12,data:a},{type:12,data:i}],m=u=>{let h=M("qkv_with_bias",t.dataType,d),_=E("qkv",t.dataType,d),y=E("bias",r.dataType,d),g=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${u.registerUniforms(g).declareVariables(_,y,h)}
  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:d,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p}),getShaderSource:m},{inputs:[t,r],outputs:[-1]})[0]},rr=(e,t,r,n,o,i,a,d)=>{let l=i;if(a&&C.size(a.dims)>0){if(n===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=jf(e,i,a,t,n,r*o,d),l=l.reshape([t,n,r,o]),r===1||n===1?l:e.compute(Ee(l,Dd.perm),{inputs:[l],outputs:[-1]})[0]}else return i.dims.length===3&&(l=i.reshape([t,n,r,o])),r===1||n===1?l:e.compute(Ee(l,Dd.perm),{inputs:[l],outputs:[-1]})[0]},Md=(e,t)=>{let r=Kf(e.inputs,t),n=e.inputs[0],o=Be(e.inputs,1),i=Be(e.inputs,2),a=Be(e.inputs,3),d=Be(e.inputs,4),l=Be(e.inputs,5),p=Be(e.inputs,6),m=Be(e.inputs,7);if(n.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let u=o&&i&&o.dims.length===4&&i.dims.length===4,h=rr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,a,0);if(u)return Rt(e,h,o,i,d,void 0,p,m,l,r);if(!o||!i)throw new Error("key and value must be provided");let _=rr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,a,r.hiddenSize),y=rr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,a,2*r.hiddenSize);Rt(e,h,_,y,d,void 0,p,m,l,r)}});var Yf,Zf,Qf,Xf,So,Rd,Ud,To=U(()=>{"use strict";J();ne();Se();ae();Yf=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Zf=(e,t)=>{let r=[],n=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(o=>r.push(Number(o))),n=r.length),ee({numOutputs:n,axis:t.axis,splitSizes:r})},Qf=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${F("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Xf=e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let o=e[n].setByIndices("indices","input[global_idx]");t===1?r.push(o):n===0?r.push(`if (output_number == ${n}u) { ${o} }`):n===t-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${n}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},So=(e,t)=>{let r=e[0].dims,n=C.size(r),o=e[0].dataType,i=C.normalizeAxis(t.axis,r.length),a=new Array(t.numOutputs),d=E("input",o,r.length),l=new Array(t.numOutputs),p=[],m=[],u=0,h=[{type:12,data:n}];for(let y=0;y<t.numOutputs;y++){u+=t.splitSizes[y],l[y]=u;let g=r.slice();g[i]=t.splitSizes[y],m.push(g),a[y]=M(`output${y}`,o,g.length),p.push({dims:m[y],dataType:e[0].dataType})}h.push({type:12,data:l},...N(r,...m));let _=y=>`
  ${y.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(d,...a)}
  ${Qf(l.length)}
  ${Xf(a)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${d.offsetToIndices("global_idx")};
    var index = ${d.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${F("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${d.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:p,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:h})}},Rd=(e,t)=>{Yf(e.inputs);let r=e.inputs.length===1?t:Zf(e.inputs,t);e.compute(So(e.inputs,r),{inputs:[0]})},Ud=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return ee({axis:t,numOutputs:n,splitSizes:r})}});var Jf,eh,Nd,Vd,Wd=U(()=>{"use strict";Se();Fr();xo();To();ut();Jf=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],n=e[1],o=e[2],i=e[3],a=e[4];if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let d=!1,l=r.dims[0],p=r.dims[1],m=r.dims.length===3?d?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],u=p,h=0,_=!n||n.dims.length===0,y=Math.floor(_?m/(t.numHeads+2*t.kvNumHeads):m/t.numHeads);_&&(m=y*t.numHeads);let g=i&&i.dims.length!==0,x=a&&a.dims.length!==0;if(g&&i.dims.length===4&&i.dims[0]===l&&i.dims[1]!==t.kvNumHeads&&i.dims[2]===t.kvNumHeads&&i.dims[3]===y)throw new Error("BSNH pastKey/pastValue is not supported");if(g&&x){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');h=i.dims[2]}else if(g||x)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(n&&n.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(r.dims[2]%n.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');u=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==y)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');u=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==y)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');u=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let S=0,T=!1,A=t.kvNumHeads?y*t.kvNumHeads:m;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(u!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');A=o.dims[2]}else{if(u!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');A=o.dims[1]*o.dims[3],T=!0}}let k=e.length>4?e[5]:void 0;if(k&&k.dims.length!==1&&k.dims[0]!==l)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');let P=-1,O=-1,R=!1;return{batchSize:l,sequenceLength:p,pastSequenceLength:h,kvSequenceLength:u,totalSequenceLength:P,maxSequenceLength:O,inputHiddenSize:0,hiddenSize:m,vHiddenSize:A,headSize:y,vHeadSize:Math.floor(A/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:S,scale:t.scale,broadcastResPosBias:R,passPastInKv:T,qkvFormat:v}},eh=ee({perm:[0,2,1,3]}),Nd=(e,t,r)=>{let n=t,o=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(n=t.reshape([r.batchSize,r.kvSequenceLength,o,r.headSize]),n=e.compute(Ee(n,eh.perm),{inputs:[n],outputs:[-1]})[0]),n},Vd=(e,t)=>{let r=Jf(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let n=e.inputs[0],o=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,i=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,a=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,d=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,p=e.inputs.length>5?e.inputs[6]:void 0,m=r.kvNumHeads?r.kvNumHeads:r.numHeads,u=ee({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,m*r.headSize,m*r.headSize]}),[h,_,y]=!o&&!i?e.compute(So([n],u),{inputs:[n],outputs:[-1,-1,-1]}):[n,o,i],g=rr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,h,void 0,0);Rt(e,g,Nd(e,_,r),Nd(e,y,r),void 0,void 0,a,d,void 0,r,l,p)}});var Ld,th,rh,Gd,Hd=U(()=>{"use strict";J();ne();ut();ae();Ld=(e,t,r,n,o,i,a,d)=>{let l=me(i),p=l===1?"f32":`vec${l}f`,m=l===1?"vec2f":`mat2x${l}f`,u=o*a,h=64;u===1&&(h=256);let _=[o,a,i/l],y=[o,a,2],g=["rank","type","type"],x=[];x.push(...N(_,y));let $=v=>{let S=E("x",t.dataType,3,l),T=E("scale",r.dataType,r.dims),A=E("bias",n.dataType,n.dims),k=M("output",1,3,2),P=[S,T,A,k];return`
  var<workgroup> workgroup_shared : array<${m}, ${h}>;
  const workgroup_size = ${h}u;
  ${v.declareVariables(...P)}
  ${v.mainStart(h)}
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
    workgroup_shared[local_idx] = ${m}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${He("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${He("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${d}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${d};${h}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:y,dataType:1}],dispatchGroup:{x:u},programUniforms:x}),getShaderSource:$},{inputs:[t,r,n],outputs:[-1]})[0]},th=(e,t,r)=>{let n=t[0].dims,o=n,i=2,a=n[0],d=n[1],l=C.sizeFromDimension(n,i),p=me(l),m=C.size(o)/p,u=Ld(e,t[0],t[1],t[2],a,l,d,r.epsilon),h=[a,d,l/p],_=[a,d],y=["type","none"],g=x=>{let $=E("x",t[0].dataType,h.length,p),v=E("scale_shift",1,_.length,2),S=M("output",t[0].dataType,h.length,p),T=[$,v,S];return`
  ${x.registerUniform("output_size","u32").declareVariables(...T)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${S.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${v.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${S.type.value}(scale_shift.x) + ${S.type.value}(scale_shift.y);
      ${S.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${p}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...N(h,_,h)]}),getShaderSource:g},{inputs:[t[0],u]})},rh=(e,t,r)=>{let n=t[0].dims,o=n,i=n[0],a=n[n.length-1],d=C.sizeFromDimension(n,1)/a,l=me(a),p=C.size(o)/l,m=[{type:12,data:d},{type:12,data:Math.floor(a/l)}],u=["type","type"],h=!1,_=[0,n.length-1];for(let $=0;$<n.length-2;$++)h=h||n[$+1]!==1,_.push($+1);h=h&&n[n.length-1]!==1;let y=h?e.compute(Ee(e.inputs[0],_),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:n.length},($,v)=>n[_[v]])),g=Ld(e,y,t[1],t[2],i,d,a,r.epsilon),x=$=>{let v=ye(t[0].dataType),S=l===1?"vec2f":`mat${l}x2f`,T=P=>{let O=P===0?"x":"y",R=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${v}(${R}(scale.${O}))`;case 2:return`vec2<${v}>(${R}(scale[0].${O}, scale[1].${O}))`;case 4:return`vec4<${v}>(${R}(scale[0].${O}, scale[1].${O}, scale[2].${O}, scale[3].${O}))`;default:throw new Error(`Not supported compoents ${l}`)}},A=E("input",t[0].dataType,t[0].dims,l),k=M("output",t[0].dataType,o,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${A.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${S}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${k.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${$.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${T(0)}, ${T(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:m}),getShaderSource:x},{inputs:[t[0],g]})},Gd=(e,t)=>{t.format==="NHWC"?rh(e,e.inputs,t):th(e,e.inputs,t)}});var nh,oh,Fd,qd=U(()=>{"use strict";J();ne();ae();nh=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},oh=(e,t,r)=>{let n=t.simplified,o=e[0].dims,i=e[1],a=!n&&e[2],d=o,l=C.normalizeAxis(t.axis,o.length),p=C.sizeToDimension(o,l),m=C.sizeFromDimension(o,l),u=C.size(i.dims),h=a?C.size(a.dims):0;if(u!==m||a&&h!==m)throw new Error(`Size of X.shape()[axis:] == ${m}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${u} and bias size of ${h}`);let _=[];for(let A=0;A<o.length;++A)A<l?_.push(o[A]):_.push(1);let y=me(m),g=["type","type"],x=[{type:12,data:p},{type:1,data:m},{type:12,data:Math.floor(m/y)},{type:1,data:t.epsilon}];a&&g.push("type");let $=r>1,v=r>2,S=A=>{let k=ye(e[0].dataType),P=[E("x",e[0].dataType,e[0].dims,y),E("scale",i.dataType,i.dims,y)];a&&P.push(E("bias",a.dataType,a.dims,y)),P.push(M("output",e[0].dataType,d,y)),$&&P.push(M("mean_data_output",1,_)),v&&P.push(M("inv_std_output",1,_));let O=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${A.registerUniforms(O).declareVariables(...P)}
  ${A.mainStart()}
    ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${so("f32",y)};
    var mean_square_vector = ${so("f32",y)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${At(k,y,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${He("mean_vector",y)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${He("mean_square_vector",y)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${At(k,y,"x[j + offset]")};
      let f32scale = ${At(k,y,"scale[j]")};
      output[j + offset] = ${P[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${At(k,y,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${v?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},T=[{dims:d,dataType:e[0].dataType}];return $&&T.push({dims:_,dataType:1}),v&&T.push({dims:_,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${y};${r};${n}`,inputDependencies:g},getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(p/64)},programUniforms:x}),getShaderSource:S}},Fd=(e,t)=>{nh(e.inputs),e.compute(oh(e.inputs,t,e.outputCount))}});var ih,Kd,jd=U(()=>{"use strict";ne();Qr();Xr();ih=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Kd=e=>{ih(e.inputs);let t=et.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&n<8)e.compute(Zr(e.inputs,{activation:""},t));else{let o=t[t.length-2],i=C.size(e.inputs[0].dims.slice(0,-2)),a=C.size(e.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&a===1){let d=e.inputs[0].reshape([1,i,n]),l=e.inputs[1].reshape([1,n,r]),p=[1,i,r],m=[d,l];e.compute(tr(m,{activation:""},t,p),{inputs:m})}else e.compute(tr(e.inputs,{activation:""},t))}}});var ah,sh,uh,Yd,Zd,Qd=U(()=>{"use strict";J();ne();Se();ae();ah=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),i=t.blockSize/8*t.bits,a=e[1];if(!C.areEqual(a.dims,[t.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let l=e[2].dims;if(C.size(l)!==t.n*o)throw new Error("scales input size error.");if(e.length===4){let m=e[3].dims,u=t.bits>4?t.n*o:t.n*Math.floor((o+1)/2);if(C.size(m)!==u)throw new Error("zeroPoints input size error.")}},sh=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],i=t.k,a=t.n,d=r.slice(0,n-2),l=C.size(d),m=e[1].dims[2]/4,u=e[0].dataType,h=me(t.k),_=me(m),y=me(a),g=d.concat([o,a]),x=o>1&&a/y%2===0?2:1,$=C.size(g)/y/x,v=64,S=[],T=[l,o,i/h],A=C.convertShape(e[1].dims).slice();A.splice(-1,1,m/_),S.push(...N(T)),S.push(...N(A)),S.push(...N(e[2].dims)),e.length===4&&S.push(...N(C.convertShape(e[3].dims)));let k=[l,o,a/y];S.push(...N(k));let P=O=>{let R=T.length,G=E("a",e[0].dataType,R,h),q=E("b",12,A.length,_),j=E("scales",e[2].dataType,e[2].dims.length),W=[G,q,j],Y=e.length===4?E("zero_points",12,e[3].dims.length):void 0;Y&&W.push(Y);let se=k.length,X=M("output",e[0].dataType,se,y),re=ye(e[0].dataType),te=(()=>{switch(h){case 1:return`array<${re}, 8>`;case 2:return`mat4x2<${re}>`;case 4:return`mat2x4<${re}>`;default:throw new Error(`${h}-component is not supported.`)}})(),oe=()=>{let $e=`
          // reuse a data
            var input_offset = ${G.indicesToOffset(`${G.type.indices}(batch, row, word_offset)`)};
            var a_data: ${te};
            for (var j: u32 = 0; j < ${8/h}; j++) {
              a_data[j] = ${G.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let le=0;le<y*x;le++)$e+=`
            b_value = ${_===1?`b${le}_data`:`b${le}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${te}(${Array.from({length:4},(V,K)=>`${re}(b_value_lower[${K}]), ${re}(b_value_upper[${K}])`).join(", ")});
            b_dequantized_values = ${(()=>h===1?`${te}(${Array.from({length:8},(V,K)=>`(b_quantized_values[${K}] - ${Y?`zero_point${le}`:"zero_point"}) * scale${le}`).join(", ")});`:`(b_quantized_values - ${te}(${Array(8).fill(`${Y?`zero_point${le}`:"zero_point"}`).join(",")})) * scale${le};`)()};
            workgroup_shared[local_id.x * ${x} + ${Math.floor(le/y)}]${y>1?`[${le%y}]`:""} += ${Array.from({length:8/h},(V,K)=>`${h===1?`a_data[${K}] * b_dequantized_values[${K}]`:`dot(a_data[${K}], b_dequantized_values[${K}])`}`).join(" + ")};
          `;return $e},ve=()=>{let $e=`
            var col_index = col * ${y};
            ${Y?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${re}(8);`}
            `;for(let le=0;le<y*x;le++)$e+=`
            let scale${le} = ${j.getByOffset("col_index * nBlocksPerCol + block")};
            ${Y?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${Y.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${le} = ${re}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return $e},Oe=()=>{let $e=`col_index = col * ${y};`;for(let le=0;le<y*x;le++)$e+=`
            let b${le}_data = ${q.getByIndices(`${q.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return $e+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${te};
            var b_dequantized_values: ${te};`,$e};return`
        var<workgroup> workgroup_shared: array<${X.type.value}, ${x*v}>;
        ${O.declareVariables(...W,X)}
        ${O.mainStart([v,1,1])}
          let output_indices = ${X.offsetToIndices(`(global_idx / ${v}) * ${x}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/h};
            ${ve()}
            for (var word: u32 = 0; word < ${m}; word += ${_}) {
              ${Oe()}
              for (var i: u32 = 0; i < ${_}; i++) {
                ${oe()}
                word_offset += ${8/h};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${x}) {
            var output_value: ${X.type.value} = ${X.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${x};
            }
            ${X.setByIndices(`${X.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${h};${_};${y};${x};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:g,dataType:u}],dispatchGroup:{x:$},programUniforms:S}),getShaderSource:P}},uh=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],i=t.k,a=t.n,d=r.slice(0,n-2),l=C.size(d),m=e[1].dims[2]/4,u=e[0].dataType,h=me(t.k),_=me(m),y=d.concat([o,a]),g=128,x=a%8===0?8:a%4===0?4:1,$=g/x,v=$*_*8,S=v/h,T=v/t.blockSize,A=C.size(y)/x,k=[],P=[l,o,i/h],O=C.convertShape(e[1].dims).slice();O.splice(-1,1,m/_),k.push(...N(P)),k.push(...N(O)),k.push(...N(e[2].dims)),e.length===4&&k.push(...N(C.convertShape(e[3].dims)));let R=[l,o,a];k.push(...N(R));let G=q=>{let j=P.length,W=E("a",e[0].dataType,j,h),Y=E("b",12,O.length,_),se=E("scales",e[2].dataType,e[2].dims.length),X=[W,Y,se],re=e.length===4?E("zero_points",12,e[3].dims.length):void 0;re&&X.push(re);let te=R.length,oe=M("output",e[0].dataType,te),ve=ye(e[0].dataType),Oe=()=>{switch(h){case 1:return`
          let a_data0 = vec4<${ve}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ve}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${ve}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ve}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${h}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${W.type.value}, ${S}>;
        var<workgroup> inter_results: array<array<${oe.type.value}, ${$}>, ${x}>;
        ${q.declareVariables(...X,oe)}
        ${q.mainStart([$,x,1])}
          let output_indices = ${oe.offsetToIndices(`workgroup_index * ${x}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${T} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${S};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${S}; a_offset += ${g})
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
            let block = tile * ${T} + local_id.x;
            ${re?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${re.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${ve}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${ve}(8);`}
            let scale = ${se.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${Y.getByIndices(`${Y.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/h};
            for (var i: u32 = 0; i < ${_}; i++) {
              ${Oe()}
              let b_value = ${_===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${ve}>(${Array.from({length:4},($e,le)=>`${ve}(b_value_lower[${le}]), ${ve}(b_value_upper[${le}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${ve}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},($e,le)=>`${`dot(a_data${le}, b_dequantized_values[${le}])`}`).join(" + ")};
              word_offset += ${8/h};
            }
            workgroupBarrier();
          }

          if (local_idx < ${x}) {
            var output_value: ${oe.type.value} = ${oe.type.value}(0);
            for (var b = 0u; b < ${$}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${oe.setByIndices(`${oe.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${h};${_};${$};${x}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:u}],dispatchGroup:{x:A},programUniforms:k}),getShaderSource:G}},Yd=(e,t)=>{ah(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(uh(e.inputs,t)):e.compute(sh(e.inputs,t))},Zd=e=>ee(e)});var dh,lh,ch,ph,mh,fh,hh,gh,Xd,Jd=U(()=>{"use strict";J();ne();ae();dh=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},lh=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
            k = i32(${e.indicesGet("indices",o)}) - ${F("uniforms.pads",o,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${F("uniforms.x_shape",o,t)})) {
              break;
            }
            offset += k * i32(${F("uniforms.x_strides",o,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${n}
            value = x[offset];
          }
      `},ch=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${F("uniforms.pads",o,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${F("uniforms.x_shape",o,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${F("uniforms.x_shape",o,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${F("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},ph=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${F("uniforms.pads",o,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${F("uniforms.x_shape",o,t)})) {
                  k = i32(${F("uniforms.x_shape",o,t)}) - 1;
                }
                offset += k * i32(${F("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},mh=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${F("uniforms.pads",o,r)};
                if (k < 0)  {
                  k += i32(${F("uniforms.x_shape",o,t)}]);
                }
                if (k >= i32(${F("uniforms.x_shape",o,t)})) {
                  k -= i32(${F("uniforms.x_shape",o,t)});
                }
                offset += k * i32(${F("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},fh=(e,t,r)=>{switch(r.mode){case 0:return lh(e,t,r.pads.length);case 1:return ch(e,t,r.pads.length);case 2:return ph(e,t,r.pads.length);case 3:return mh(e,t,r.pads.length);default:throw new Error("Invalid mode")}},hh=(e,t)=>{let r=C.padShape(e[0].dims.slice(),t.pads),n=e[0].dims,o=C.size(r),i=[{type:12,data:o},{type:6,data:t.pads}],a=e.length>=3&&e[2].data;t.mode===0&&i.push({type:a?e[2].dataType:1,data:t.value}),i.push(...N(e[0].dims,r));let d=["rank"],l=p=>{let m=M("output",e[0].dataType,r.length),u=E("x",e[0].dataType,n.length),h=u.type.value,_=fh(m,n.length,t),y=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&y.push({name:"constant_value",type:a?h:"f32"}),`
            ${p.registerUniforms(y).declareVariables(u,m)}
            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${m.offsetToIndices("global_idx")};

            var value = ${h}(0);
            ${_}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${a}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(C.size(r)/64)},programUniforms:i}),getShaderSource:l}},gh=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,o=e[0].dims.length,i=new Int32Array(2*o).fill(0);if(e.length>=4){let d=e[3].getBigInt64Array();for(let l=0;l<d.length;l++)i[Number(d[l])]=Number(r[l]),i[Number(d[l])+o]=Number(r[l+d.length])}else r.forEach((d,l)=>i[Number(l)]=Number(d));let a=[];return i.forEach(d=>a.push(d)),{mode:t.mode,value:n,pads:a}}else return t},Xd=(e,t)=>{dh(e.inputs);let r=gh(e.inputs,t);e.compute(hh(e.inputs,r),{inputs:[0]})}});var tn,el,tl,rl,nl,bh,yh,ol,il,al,sl,ul,dl,ll,cl,pl,ml,fl,hl,gl=U(()=>{"use strict";Ve();J();ne();ae();tn=e=>{if(we.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},el=(e,t,r)=>{let n=t.format==="NHWC",o=e.dims.slice();n&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(t,"dilations"),a=t.kernelShape.slice(),d=t.strides.slice(),l=i?t.dilations.slice():[],p=t.pads.slice();It.adjustPoolAttributes(r,o,a,d,l,p);let m=It.computePoolOutputShape(r,o,d,l,a,p,t.autoPad),u=Object.assign({},t);i?Object.assign(u,{kernelShape:a,strides:d,pads:p,dilations:l,cacheKey:t.cacheKey}):Object.assign(u,{kernelShape:a,strides:d,pads:p,cacheKey:t.cacheKey});let h=m.slice();return h.push(h.splice(1,1)[0]),[u,n?h:m]},tl=(e,t)=>{let r=t.format==="NHWC",n=C.size(e),o=C.size(t.kernelShape),i=[{type:12,data:n},{type:12,data:o}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let d=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],p=t.pads[t.pads.length/2-1],m=t.pads[t.pads.length-1],u=!!(p+m);i.push({type:12,data:d},{type:12,data:l},{type:12,data:p},{type:12,data:m}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let h=!1;if(t.kernelShape.length===2){let _=t.kernelShape[t.kernelShape.length-2],y=t.strides[t.strides.length-2],g=t.pads[t.pads.length/2-2],x=t.pads[t.pads.length-2];h=!!(g+x),i.push({type:12,data:_},{type:12,data:y},{type:12,data:g},{type:12,data:x}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,u,h]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let d=C.computeStrides(t.kernelShape);i.push({type:12,data:d},{type:12,data:t.pads},{type:12,data:t.strides}),a.push({name:"kernelStrides",type:"u32",length:d.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((p,m)=>p+m);return[i,a,!!l,!1,!1]}},rl=(e,t,r,n,o,i,a,d,l,p,m,u)=>{let h=o.format==="NHWC",_=t.type.value,y=M("output",t.type.tensor,n);if(o.kernelShape.length<=2){let g="",x="",$="",v=r-(h?2:1);if(m?g=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${v}] < 0 || xIndices[${v}]
                      >= uniforms.x_shape[${v}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`:g=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let T=r-(h?3:2);u?x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${T}] < 0 || xIndices[${T}] >= uniforms.x_shape[${T}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                `,$=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var value = ${_}(${d});
              var pad = 0;
              ${x}
              ${g}
              ${$}
              ${a}

              output[global_idx] = value;
            }`}else{if(h)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let g=o.kernelShape.length,x=o.pads.length,$="";return p?$=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${i}
              }`:$=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${e.registerUniforms(l).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var offsets: array<u32, ${g}>;

              var value = ${_}(${d});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${g-1}u; j++) {
                  offsets[j] = offset / ${F("uniforms.kernelStrides","j",g)};
                  offset -= offsets[j] * ${F("uniforms.kernelStrides","j",g)};
                }
                offsets[${g-1}] = offset;

                isPad = false;
                for (var j = ${r-g}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${F("uniforms.strides",`j - ${r-g}u`,g)}
                    + offsets[j - ${r-g}u] - ${F("uniforms.pads","j - 2u",x)};
                  ${$}
              }
              ${a}

              output[global_idx] = value;
            }`}},nl=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,bh=e=>`${nl(e)};${e.countIncludePad}`,yh=e=>`${nl(e)};${e.storageOrder};${e.dilations}`,ol=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),il=(e,t,r,n)=>{let[o,i]=el(t,n,r),a=E("x",t.dataType,t.dims.length),d=a.type.value,l="value += x_val;",p="";o.countIncludePad?p+=`value /= ${d}(uniforms.kernelSize);`:p+=`value /= ${d}(i32(uniforms.kernelSize) - pad);`;let[m,u,h,_,y]=tl(i,o);m.push(...N(t.dims,i));let g=["rank"];return{name:e,shaderCache:{hint:`${n.cacheKey};${h};${_};${y}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(C.size(i)/64)},programUniforms:m}),getShaderSource:x=>rl(x,a,t.dims.length,i.length,o,l,p,0,u,h,_,y)}},al=e=>{let t=e.count_include_pad!==0,r=ol(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:t,...r,cacheKey:""};return{...n,cacheKey:bh(n)}},sl=(e,t)=>{tn(e.inputs),e.compute(il("AveragePool",e.inputs[0],!1,t))},ul={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},dl=e=>{let t=e.format;return{format:t,...ul,cacheKey:t}},ll=(e,t)=>{tn(e.inputs),e.compute(il("GlobalAveragePool",e.inputs[0],!0,t))},cl=(e,t,r,n)=>{let[o,i]=el(t,n,r),a=`
      value = max(x_val, value);
    `,d="",l=E("x",t.dataType,t.dims.length),p=["rank"],[m,u,h,_,y]=tl(i,o);return m.push(...N(t.dims,i)),{name:e,shaderCache:{hint:`${n.cacheKey};${h};${_};${y}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(C.size(i)/64)},programUniforms:m}),getShaderSource:g=>rl(g,l,t.dims.length,i.length,o,a,d,t.dataType===10?-65504:-1e5,u,h,_,y)}},pl=(e,t)=>{tn(e.inputs),e.compute(cl("MaxPool",e.inputs[0],!1,t))},ml=e=>{let t=e.storage_order,r=e.dilations,n=ol(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:r,...n,cacheKey:""};return{...o,cacheKey:yh(o)}},fl=e=>{let t=e.format;return{format:t,...ul,cacheKey:t}},hl=(e,t)=>{tn(e.inputs),e.compute(cl("GlobalMaxPool",e.inputs[0],!0,t))}});var wh,vh,bl,yl,_l=U(()=>{"use strict";J();ne();Se();ae();wh=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,n)=>r===e[2].dims[n]).reduce((r,n)=>r&&n,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((o,i)=>i===t.axis||o===e[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],n=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/n)||t.blockSize>Math.ceil(r/(n-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},vh=(e,t)=>{let r=C.normalizeAxis(t.axis,e[0].dims.length),n=e[0].dataType,o=n===3,i=e[0].dims,a=e[1].dataType,d=C.size(i),l=n===3||n===2,p=l?[Math.ceil(C.size(e[0].dims)/4)]:e[0].dims,m=e[1].dims,u=e.length>2?e[2]:void 0,h=u?l?[Math.ceil(C.size(u.dims)/4)]:u.dims:void 0,_=m.length===0||m.length===1&&m[0]===1,y=_===!1&&m.length===1,g=me(d),x=_&&(!l||g===4),$=x?g:1,v=x&&!l?g:1,S=E("input",l?12:n,p.length,v),T=E("scale",a,m.length),A=u?E("zero_point",l?12:n,h.length):void 0,k=M("output",a,i.length,$),P=[S,T];A&&P.push(A);let O=[p,m];u&&O.push(h);let R=[{type:12,data:d/$},{type:12,data:r},{type:12,data:t.blockSize},...N(...O,i)],G=q=>{let j=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${q.registerUniforms(j).declareVariables(...P,k)}
      ${q.mainStart()}
          ${q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${k.offsetToIndices("global_idx")};

          // Set input x
          ${(()=>l?`
            let input = ${S.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${$===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${S.getByOffset("global_idx")};`)()};

          // Set scale input
          ${(()=>_?`let scale_value= ${T.getByOffset("0")}`:y?`
            let scale_index = ${k.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${T.getByOffset("scale_index")};`:`
            var scale_indices: ${T.type.indices} = output_indices;
            let index = ${T.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${T.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${T.getByIndices("scale_indices")};`)()};

          // Set zero-point input
          ${(()=>A?_?l?`
                let zero_point_input = ${A.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${A.getByOffset("0")}`:y?l?`
                let zero_point_index = ${k.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${A.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${k.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${A.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${T.indicesToOffset("scale_indices")};
                let zero_point_input = ${A.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${A.getByIndices("scale_indices")};`:`let zero_point_value = ${l?o?"i32":"u32":S.type.value}(0);`)()};
      // Compute and write output
      ${k.setByOffset("global_idx",`${k.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:A?["rank","rank","rank"]:["rank","rank"]},getShaderSource:G,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(d/$/64),y:1,z:1},programUniforms:R})}},bl=(e,t)=>{wh(e.inputs,t),e.compute(vh(e.inputs,t))},yl=e=>ee({axis:e.axis,blockSize:e.blockSize})});var $h,xh,wl,vl=U(()=>{"use strict";Ve();J();ae();$h=(e,t,r)=>{let n=e===t,o=e<t&&r<0,i=e>t&&r>0;if(n||o||i)throw new Error("Range these inputs' contents are invalid.")},xh=(e,t,r,n)=>{let o=Math.abs(Math.ceil((t-e)/r)),i=[o],a=o,d=[{type:12,data:a},{type:n,data:e},{type:n,data:r},...N(i)],l=p=>{let m=M("output",n,i.length),u=m.type.value,h=[{name:"outputSize",type:"u32"},{name:"start",type:u},{name:"delta",type:u}];return`
        ${p.registerUniforms(h).declareVariables(m)}
        ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${u}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:i,dataType:n}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d})}},wl=e=>{let t=0,r=0,n=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],n=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],n=e.inputs[2].getFloat32Array()[0]),we.webgpu.validateInputContent&&$h(t,r,n),e.compute(xh(t,r,n,e.inputs[0].dataType),{inputs:[]})}});var Sh,Th,$l,xl,Sl=U(()=>{"use strict";J();ne();Se();ae();Sh=(e,t,r,n)=>{if(e!=="none"&&n!=="i32"&&n!=="u32"&&n!=="f32")throw new Error(`Input ${n} is not supported with reduction ${e}.`);let o=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,i=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return n==="i32"||n==="u32"?`atomicAdd(&${t}, bitcast<${n}>(${r}));`:`
              ${o}bitcast<${n}>(oldValue) + (${r})${i}`;case"max":return n==="i32"||n==="u32"?`atomicMax(&${t}, bitcast<${n}>(${r}));`:`
                ${o}max(bitcast<f32>(oldValue), (${r}))${i}`;case"min":return n==="i32"||n==="u32"?`atomicMin(&${t}, bitcast<${n}>(${r}));`:`${o}min(bitcast<${n}>(oldValue), (${r}))${i}`;case"mul":return`${o}(bitcast<${n}>(oldValue) * (${r}))${i}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Th=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r,i=1,a=Math.ceil(C.size(n)/i),d=n[n.length-1],l=C.sizeFromDimension(r,d),p=[{type:12,data:a},{type:12,data:d},{type:12,data:l},...N(e[1].dims,e[2].dims,o)],m=u=>{let h=E("indices",e[1].dataType,e[1].dims.length),_=E("updates",e[2].dataType,e[2].dims.length,i),y=t.reduction!=="none"&&t.reduction!==""?Qa("output",e[0].dataType,o.length):M("output",e[0].dataType,o.length,i);return`
      ${u.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(h,_,y)}
      ${u.mainStart()}
        ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
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
    ${Sh(t.reduction,"output[data_offset + i]","value",y.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:p}),getShaderSource:m}},$l=e=>ee({reduction:e.reduction}),xl=(e,t)=>{e.compute(Th(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}});var Ih,Ch,Ah,kh,Eh,Ph,zh,Oh,Dh,Bh,Mh,Tl,Rh,Uh,Nh,Vh,Wh,Il,Cl,Al=U(()=>{"use strict";J();ne();Se();ae();Ih=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Ch=(e,t,r)=>{t.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let n=new Array(r).fill(1);return t.forEach((o,i)=>n[o]=e[i]),n},Ah=(e,t,r,n,o,i)=>{let[a,d,l]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],p=e[0].dims.length;if(a>0&&e.length>a&&e[a].dims.length>0)e[a].getFloat32Array().forEach(m=>i.push(m));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(d>0&&e.length>d&&e[d].dims.length===1&&e[d].dims[0]>0){if(e[d].getFloat32Array().forEach(m=>n.push(m)),n.length!==0&&n.length!==p&&r>=18&&n.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Ih(n,t),t.axes.length>0&&Ch(n,t.axes,p).forEach((m,u)=>n[u]=m)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(m=>o.push(Number(m))),o.length!==0&&o.length!==p&&r>=18&&o.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof n<"u"&&typeof o<"u"&&n.length>0&&o.length>p)throw new Error("Resize requires only of scales or sizes to be specified")},kh=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`return ${t}(xResized) / ${t}(xScale);`;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    // The whole part and the fractional part are calculated separately due to inaccuracy of floating
                    // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
                    // offset-by-one error later in floor().
                    let whole = ${t}(xResized * (lengthOriginal - 1) / (lengthResized - 1));
                    let fract =
                        ${t}(xResized * (lengthOriginal - 1) % (lengthResized - 1)) / ${t}(lengthResized - 1);
                    return whole + fract;
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Eh=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Ph=(e,t,r)=>{let n=new Array(r).fill(0).concat(new Array(r).fill(1)),o=e.length===0?n:e.slice();return t.length>0?(t.forEach((i,a)=>{n[i]=o[a],n[a+r]=o[t.length+a]}),n):o},zh=(e,t,r,n)=>{let o=[];if(r.length>0)if(n.length>0){if(e.forEach(i=>o.push(i)),Math.max(...n)>e.length)throw new Error("axes is out of bound");n.forEach((i,a)=>o[i]=r[a])}else r.forEach(i=>o.push(i));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");o=e.map((i,a)=>Math.round(i*t[a]))}return o},Oh=(e,t,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>t[i]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>t[i]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return r.axes.length>0?(r.axes.forEach(i=>t[i]=n),r.axes.forEach(i=>o[i]=Math.round(e[i]*t[i]))):(t.fill(n,0,t.length),o.forEach((i,a)=>o[a]=Math.round(i*t[a]))),o},Dh=(e,t,r,n,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${F("uniforms.scales","i",n)};
        var roi_low = ${F("uniforms.roi","i",o)};
        var roi_hi = ${F("uniforms.roi",`i + ${t.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${F("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${F("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Bh=(e,t,r,n,o,i,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
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
          if (!${a} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
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
        ${e.indicesSet("input_indices","i"," input_index")}
      }
      return input_indices;
    }`,Mh=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${F("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Tl=(e,t,r,n)=>e.rank>n?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Rh=(e,t,r,n,o)=>{let[a,d,l,p]=r.length===2?[-1,0,1,-1]:[0,2,3,1],m=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${m} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",d,`max(0, min(row, ${r[d]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(col, ${r[l]} - 1))`)};
      ${Tl(e,p,a,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${m} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${m} = originalIndices[${d}];
      var col:${m} = originalIndices[${l}];
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
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${a}])`:"0"};
      var x11: ${m} = getInputValue(batch, channel, row1, col1);
      var x12: ${m} = getInputValue(batch, channel, row1, col2);
      var x21: ${m} = getInputValue(batch, channel, row2, col1);
      var x22: ${m} = getInputValue(batch, channel, row2, col2);
      var dx1: ${m} = abs(row - ${m}(row1));
      var dx2: ${m} = abs(${m}(row2) - row);
      var dy1: ${m} = abs(col - ${m}(col1));
      var dy2: ${m} = abs(${m}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Uh=(e,t,r,n,o,i,a,d,l,p)=>{let m=r.length===2,u=!0,[h,_]=m?[0,1]:u?[2,3]:[1,2],y=e.type.value,g=x=>{let $=x===h?"row":"col";return`
      fn ${$}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${y} {
        var output_index = ${t.indicesGet("output_indices",x)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[x]},
        ${n[x]}, ${r[x]}, ${i[x]}, ${i[x]} + ${r.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${d} && (originalIdx < 0 || originalIdx > (${r[x]} - 1))) {
          return ${l};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${$}: ${y} = originalIdx + ${y}(i);
          if (${$} < 0 || ${$} >= ${r[x]}) {
            ${(()=>p?`coefs[i + 1] = 0.0;
                        continue;`:d?`return ${l};`:`${$} = max(0, min(${$}, ${r[x]} - 1));`)()};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",x,`u32(${$})`)};
          data[i + 1] = ${x===h?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${g(h)};
    ${g(_)};
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

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${y} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Nh=(e,t,r,n,o)=>{let[a,d,l,p,m]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],u=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${u} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",d,`max(0, min(depth, ${r[d]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(height, ${r[l]} - 1))`)};
      ${e.indicesSet("input_indices",p,`max(0, min(width, ${r[p]} - 1))`)};
      ${Tl(e,m,a,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${u} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${u} = originalIndices[${d}];
      var height:${u} = originalIndices[${l}];
      var width:${u} = originalIndices[${p}];
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
      var channel: u32 = ${r.length>3?`u32(originalIndices[${m}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${a}])`:"0"};

      var x111: ${u} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${u} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${u} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${u} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${u} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${u} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${u} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${u} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${u} = abs(depth - ${u}(depth1));
      var dx2: ${u} = abs(${u}(depth2) - depth);
      var dy1: ${u} = abs(height - ${u}(height1));
      var dy2: ${u} = abs(${u}(height2) - height);
      var dz1: ${u} = abs(width - ${u}(width1));
      var dz2: ${u} = abs(${u}(width2) - width);
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
    }`},Vh=(e,t,r,n,o,i)=>{let a=e.dims,d=Ph(i,t.axes,a.length),l=zh(a,n,o,t.axes),p=n.slice();n.length===0&&(p=a.map((v,S)=>v===0?1:l[S]/v),t.keepAspectRatioPolicy!=="stretch"&&(l=Oh(a,p,t)));let m=M("output",e.dataType,l.length),u=E("input",e.dataType,a.length),h=C.size(l),_=a.length===l.length&&a.every((v,S)=>v===l[S]),y=t.coordinateTransformMode==="tf_crop_and_resize",g=t.extrapolationValue,x=u.type.value,$=v=>`
      ${_?"":`
      ${kh(t.coordinateTransformMode,x)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Mh(u,a)};
              ${Eh(t.nearestMode,r,x)};
              ${Bh(u,m,a,l,p.length,d.length,y)};
              `;case"linear":return`
              ${Dh(m,a,l,p.length,d.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${Rh(u,m,a,y,g)}`;if(a.length===3||a.length===5)return`${Nh(u,m,a,y,g)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${Uh(u,m,a,l,p,d,t.cubicCoeffA,y,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${v.registerUniform("output_size","u32").registerUniform("scales","f32",p.length).registerUniform("roi","f32",d.length).declareVariables(u,m)}
      ${v.mainStart()}
        ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${_?"output[global_idx] = input[global_idx];":`
        let output_indices = ${m.offsetToIndices("global_idx")};
        var input_indices: ${u.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${u.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${p.length>0?p:""}|${o.length>0?o:""}|${d.length>0?d:""}|${_}|${a}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},{type:1,data:p},{type:1,data:d},...N(a,l)]})}},Wh=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},Il=(e,t)=>{let r=[],n=[],o=[],i=Wh(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Ah(e.inputs,t,i,r,n,o),e.compute(Vh(e.inputs[0],t,i,r,n,o),{inputs:[0]})},Cl=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,o=e.cubicCoeffA,i=e.excludeOutside!==0,a=e.extrapolationValue,d=e.keepAspectRatioPolicy,l=e.mode,p=e.nearestMode===""?"simple":e.nearestMode;return ee({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:o,excludeOutside:i,extrapolationValue:a,keepAspectRatioPolicy:d,mode:l,nearestMode:p})}});var Lh,Gh,kl,El=U(()=>{"use strict";J();ne();Se();ae();Lh=(e,t)=>{let[r,n,o,i]=e,{numHeads:a,rotaryEmbeddingDim:d}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!C.areEqual(n.dims,[])&&!C.areEqual(n.dims,[1])&&n.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!C.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(d>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=r.dims[0],p=r.dims[r.dims.length-2],m=o.dims[0],u=C.sizeFromDimension(r.dims,1)/p,h=d===0?o.dims[1]*2:u/a;if(d>h)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(n.dims.length===2){if(l!==n.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(p!==n.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(h/2!==o.dims[1]&&d/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(p>m)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Gh=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:o,scale:i}=t,a=e[0].dims[0],d=C.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],p=d/l,m=e[2].dims[1],u=o===0?m*2:p/n,h=new Array(a,l,p/u,u-m),_=C.computeStrides(h),y=[{type:1,data:i},{type:12,data:h},{type:12,data:_},...e[0].dims.length===3?new Array({type:12,data:[d,p,u,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[d,u,l*u,1]}):[],...N(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],g=x=>{let $=E("input",e[0].dataType,e[0].dims.length),v=E("position_ids",e[1].dataType,e[1].dims.length),S=E("cos_cache",e[2].dataType,e[2].dims.length),T=E("sin_cache",e[3].dataType,e[3].dims.length),A=M("output",e[0].dataType,e[0].dims.length);return x.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:_.length},{name:"input_output_strides",type:"u32",length:_.length}]),`
        ${x.declareVariables($,v,S,T,A)}

        ${x.mainStart(Ct)}
          let half_rotary_emb_dim = uniforms.${S.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${v.broadcastedIndicesToOffset("bsnh.xy",M("",v.type.tensor,2))};
            let position_id =
                u32(${v.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${$.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} -
                ${$.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${A.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${A.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${A.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:ee({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:g,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(C.size(h)/Ct)},programUniforms:y})}},kl=(e,t)=>{Lh(e.inputs,t),e.compute(Gh(e.inputs,t))}});var Hh,Fh,Pl,zl=U(()=>{"use strict";J();ne();ae();Hh=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],i=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(n.dims.length!==1)throw new Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let a=e[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let a=e[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},Fh=(e,t,r,n)=>{let o=t.simplified,i=e[0].dims,a=C.size(i),d=i,l=a,p=i.slice(-1)[0],m=n?i.slice(0,-1).concat(1):[],u=!o&&e.length>3,h=e.length>4,_=n&&r>1,y=n&&r>2,g=r>3,x=64,$=me(p),v=[{type:12,data:l},{type:12,data:$},{type:12,data:p},{type:1,data:t.epsilon}],S=A=>{let k=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],P=[E("x",e[0].dataType,e[0].dims,$),E("skip",e[1].dataType,e[1].dims,$),E("gamma",e[2].dataType,e[2].dims,$)];u&&P.push(E("beta",e[3].dataType,e[3].dims,$)),h&&P.push(E("bias",e[4].dataType,e[4].dims,$)),P.push(M("output",e[0].dataType,d,$)),_&&P.push(M("mean_output",1,m)),y&&P.push(M("inv_std_output",1,m)),g&&P.push(M("input_skip_bias_sum",e[0].dataType,d,$));let O=ye(e[0].dataType),R=ye(1,$);return`

      ${A.registerUniforms(k).declareVariables(...P)}
      var<workgroup> sum_shared : array<${R}, ${x}>;
      var<workgroup> sum_squared_shared : array<${R}, ${x}>;

      ${A.mainStart([x,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${x};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${x};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${x-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${h?"bias[offset1d + i]":O+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${g?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${At(O,$,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${x};
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
        let mean = ${He("sum",$)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${He("square_sum",$)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${_?"mean_output[global_idx] = mean;":""}
        ${y?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${O}(mean)`}) *
            ${O}(inv_std_dev) * gamma[offset1d + i]
            ${u?"+ beta[offset1d + i]":""};
        }
      }`},T=[{dims:d,dataType:e[0].dataType}];return r>1&&T.push({dims:m,dataType:1}),r>2&&T.push({dims:m,dataType:1}),r>3&&T.push({dims:i,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${_};${y};${g}`,inputDependencies:e.map((A,k)=>"type")},getShaderSource:S,getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(l/p)},programUniforms:v})}},Pl=(e,t)=>{Hh(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(Fh(e.inputs,t,e.outputCount,!1),{outputs:n})}});var qh,rn,Kh,Ol,jh,Yh,Dl,Bl,Ml=U(()=>{"use strict";J();ne();Se();ae();qh=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw new Error(`Input ${n} must be an array of int32 or int64`)})},rn=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(n=>r.push(Number(n)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(n=>r.push(Number(n)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},Kh=(e,t)=>{if(e.length>1){let r=rn(e,1),n=rn(e,2),o=rn(e,3);return o.length===0&&(o=[...Array(e[0].dims.length).keys()]),ee({starts:r,ends:n,axes:o})}else return t},Ol=(e,t,r,n,o)=>{let i=e;return e<0&&(i+=r[n[t]]),o[t]<0?Math.max(0,Math.min(i,r[n[t]]-1)):Math.max(0,Math.min(i,r[n[t]]))},jh=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${F("uniforms.input_shape","i",r.length)};
            let steps_i = ${F("uniforms.steps","i",r.length)};
            let signs_i = ${F("uniforms.signs","i",r.length)};
            let starts_i = ${F("uniforms.starts","i",r.length)};
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
      }`,Yh=(e,t)=>{let r=e[0].dims,n=C.size(r),o=t.axes.length>0?C.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],i=rn(e,4);i.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let a=t.starts.map(($,v)=>Ol($,v,r,o,i)),d=t.ends.map(($,v)=>Ol($,v,r,o,i));if(o.length!==a.length||o.length!==d.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let $=0;$<r.length;++$)o.includes($)||(a.splice($,0,0),d.splice($,0,r[$]),i.splice($,0,1));let l=i.map($=>Math.sign($));i.forEach(($,v,S)=>{if($<0){let T=(d[v]-a[v])/$,A=a[v],k=A+T*i[v];a[v]=k,d[v]=A,S[v]=-$}});let p=r.slice(0);o.forEach(($,v)=>{p[$]=Math.ceil((d[$]-a[$])/i[$])});let m={dims:p,dataType:e[0].dataType},u=M("output",e[0].dataType,p.length),h=E("input",e[0].dataType,e[0].dims.length),_=C.size(p),y=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:i.length}],g=[{type:12,data:_},{type:12,data:a},{type:6,data:l},{type:12,data:i},...N(e[0].dims,p)],x=$=>`
      ${$.registerUniforms(y).declareVariables(h,u)}
        ${jh(h,u,r)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${u.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${u.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${a.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[m],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:g})}},Dl=(e,t)=>{qh(e.inputs,t);let r=Kh(e.inputs,t);e.compute(Yh(e.inputs,r),{inputs:[0]})},Bl=e=>{let t=e.starts,r=e.ends,n=e.axes;return ee({starts:t,ends:r,axes:n})}});var Zh,Qh,Rl,Ul,Nl=U(()=>{"use strict";J();ne();Se();ut();ae();Zh=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Qh=(e,t)=>{let r=e.inputs[0],n=r.dims,o=C.size(n),i=n.length,a=C.normalizeAxis(t.axis,i),d=a<n.length-1,l,p=[];d?(p=Array.from({length:i},(P,O)=>O),p[a]=i-1,p[i-1]=a,l=e.compute(Ee(r,p),{inputs:[r],outputs:[-1]})[0]):l=r;let m=l.dims,u=m[i-1],h=o/u,_=me(u),y=u/_,g=64;h===1&&(g=256);let x=(P,O)=>O===4?`max(max(${P}.x, ${P}.y), max(${P}.z, ${P}.w))`:O===2?`max(${P}.x, ${P}.y)`:O===3?`max(max(${P}.x, ${P}.y), ${P}.z)`:P,$=E("x",l.dataType,l.dims,_),v=M("result",l.dataType,l.dims,_),S=$.type.value,T=ye(l.dataType)==="f32"?`var threadMax = ${S}(-3.402823e+38f);`:`var threadMax = ${S}(-65504.0h);`,A=P=>`
      var<workgroup> rowMaxShared : ${S};
      var<workgroup> rowSumShared : ${S};
      var<workgroup> threadShared : array<${S}, ${g}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${S} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${S}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${P.registerUniform("packedCols","i32").declareVariables($,v)}
      ${P.mainStart(g)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${g};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${T}
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
          rowMaxShared = ${S}(${x("threadShared[0]",_)});
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
          rowSumShared = ${S}(${He("threadShared[0]",_)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,k=e.compute({name:"Softmax",shaderCache:{hint:`${_};${g}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:m,dataType:l.dataType}],dispatchGroup:{x:h},programUniforms:[{type:6,data:y}]}),getShaderSource:A},{inputs:[l],outputs:[d?-1:0]})[0];d&&e.compute(Ee(k,p),{inputs:[k]})},Rl=(e,t)=>{Zh(e.inputs),Qh(e,t)},Ul=e=>ee({axis:e.axis})});var Vl,Xh,Jh,eg,Wl,Ll=U(()=>{"use strict";J();ne();ae();Vl=e=>Array.from(e.getBigInt64Array(),Number),Xh=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Vl(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Jh=(e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r},eg=(e,t)=>{let r=e[0].dims,n=t??Vl(e[1]),o=Jh(r,n),i=C.size(o),a=e[0].dataType,d=E("input",a,r.length),l=M("output",a,o.length),p=m=>`
      const inputShape = ${d.indices(...r)};
      ${m.registerUniform("output_size","u32").declareVariables(d,l)}
      ${m.mainStart()}
      ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${d.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${d.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${d.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",d.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...N(e[0].dims,o)]}),getShaderSource:p}},Wl=e=>{Xh(e.inputs),e.compute(eg(e.inputs),{inputs:[0]})}});var tg,rg,Gl,Hl=U(()=>{"use strict";J();ne();ae();tg=(e,t,r,n,o)=>{let i=M("output_data",o,r.length,4),a=E("a_data",t[1].dataType,t[1].dims.length,4),d=E("b_data",t[2].dataType,t[2].dims.length,4),l=E("c_data",t[0].dataType,t[0].dims.length,4),p,m=(u,h,_)=>`select(${h}, ${u}, ${_})`;if(!n)p=i.setByOffset("global_idx",m(a.getByOffset("global_idx"),d.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let u=(h,_,y="")=>{let g=`a_data[index_a${_}][component_a${_}]`,x=`b_data[index_b${_}][component_b${_}]`,$=`bool(c_data[index_c${_}] & (0xffu << (component_c${_} * 8)))`;return`
            let output_indices${_} = ${i.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offset_a${_} = ${a.broadcastedIndicesToOffset(`output_indices${_}`,i)};
            let offset_b${_} = ${d.broadcastedIndicesToOffset(`output_indices${_}`,i)};
            let offset_c${_} = ${l.broadcastedIndicesToOffset(`output_indices${_}`,i)};
            let index_a${_} = offset_a${_} / 4u;
            let index_b${_} = offset_b${_} / 4u;
            let index_c${_} = offset_c${_} / 4u;
            let component_a${_} = offset_a${_} % 4u;
            let component_b${_} = offset_b${_} % 4u;
            let component_c${_} = offset_c${_} % 4u;
            ${h}[${_}] = ${y}(${m(g,x,$)});
          `};o===9?p=`
            var data = vec4<u32>(0);
            ${u("data",0,"u32")}
            ${u("data",1,"u32")}
            ${u("data",2,"u32")}
            ${u("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:p=`
            ${u("output_data[global_idx]",0)}
            ${u("output_data[global_idx]",1)}
            ${u("output_data[global_idx]",2)}
            ${u("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,a,d,i)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${p}
      }`},rg=e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,o=e[1].dataType,i=!(C.areEqual(t,r)&&C.areEqual(r,n)),a=t,d=C.size(t);if(i){let p=et.calcShape(et.calcShape(t,r,!1),n,!1);if(!p)throw new Error("Can't perform where op on the given tensors");a=p,d=C.size(a)}let l=Math.ceil(d/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:p=>tg(p,e,a,i,o),getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(d/64/4)},programUniforms:[{type:12,data:l},...N(n,t,r,a)]})}},Gl=e=>{e.compute(rg(e.inputs))}});var Fl,ql=U(()=>{"use strict";Is();Fr();ks();Ps();gu();Cu();Eu();qu();Ju();rd();id();ld();md();hd();yd();vd();Sd();Cd();Ed();Od();Wd();Hd();qd();jd();Qd();xo();Jd();gl();_l();vl();Sl();Gr();Al();El();zl();Ml();Nl();To();Ll();ut();Kr();Hl();Fl=new Map([["Abs",[zs]],["Acos",[Os]],["Acosh",[Ds]],["Add",[bu]],["ArgMax",[Ts,lo]],["ArgMin",[Ss,lo]],["Asin",[Bs]],["Asinh",[Ms]],["Atan",[Rs]],["Atanh",[Us]],["Attention",[Cs]],["AveragePool",[sl,al]],["BatchNormalization",[As]],["BiasAdd",[Es]],["BiasSplitGelu",[hu]],["Cast",[Vs,Ns]],["Ceil",[Ls]],["Clip",[Ws]],["Concat",[Au,ku]],["Conv",[_o,yo]],["ConvTranspose",[Xu,Zu]],["Cos",[Gs]],["Cosh",[Hs]],["CumSum",[ed,td]],["DepthToSpace",[nd,od]],["DequantizeLinear",[bl,yl]],["Div",[yu]],["Einsum",[ud,dd]],["Elu",[Fs,Jt]],["Equal",[_u]],["Erf",[qs]],["Exp",[Ks]],["Expand",[pd]],["FastGelu",[fd]],["Floor",[js]],["FusedConv",[_o,yo]],["Gather",[bd,gd]],["GatherElements",[Id,Td]],["GatherBlockQuantized",[$d,xd]],["GatherND",[_d,wd]],["Gelu",[Ys]],["Gemm",[kd,Ad]],["GlobalAveragePool",[ll,dl]],["GlobalMaxPool",[hl,fl]],["Greater",[xu]],["GreaterOrEqual",[Tu]],["GridSample",[Pd,zd]],["GroupQueryAttention",[Vd]],["HardSigmoid",[nu,ru]],["InstanceNormalization",[Gd]],["LayerNormalization",[Fd]],["LeakyRelu",[Zs,Jt]],["Less",[Su]],["LessOrEqual",[Iu]],["Log",[pu]],["MatMul",[Kd]],["MatMulNBits",[Yd,Zd]],["MaxPool",[pl,ml]],["Mul",[wu]],["MultiHeadAttention",[Md,Bd]],["Neg",[Xs]],["Not",[Qs]],["Pad",[Xd]],["Pow",[vu]],["QuickGelu",[mu,Jt]],["Range",[wl]],["Reciprocal",[Js]],["ReduceMin",[ys]],["ReduceMean",[ms]],["ReduceMax",[bs]],["ReduceSum",[ws]],["ReduceProd",[_s]],["ReduceL1",[fs]],["ReduceL2",[hs]],["ReduceLogSum",[$s]],["ReduceLogSumExp",[gs]],["ReduceSumSquare",[vs]],["Relu",[eu]],["Resize",[Il,Cl]],["RotaryEmbedding",[kl]],["ScatterND",[xl,$l]],["Sigmoid",[tu]],["Sin",[ou]],["Sinh",[iu]],["Slice",[Dl,Bl]],["SkipLayerNormalization",[Pl]],["Split",[Rd,Ud]],["Sqrt",[au]],["Softmax",[Rl,Ul]],["Sub",[$u]],["Tan",[su]],["Tanh",[du]],["ThresholdedRelu",[cu,Jt]],["Tile",[Wl]],["Transpose",[es,ts]],["Where",[Gl]]])});var nn,Kl=U(()=>{"use strict";Ve();Je();ae();nn=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,r){this.repo.set(t,r)}run(t,r,n,o,i){Ue(t.programInfo.name);let a=this.backend.device,d=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let l=[];for(let m of r)l.push({binding:l.length,resource:{buffer:m.buffer}});for(let m of n)l.push({binding:l.length,resource:{buffer:m.buffer}});i&&l.push({binding:l.length,resource:i});let p=a.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:l,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let m={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:p,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(m)}d.setPipeline(t.computePipeline),d.setBindGroup(0,p),d.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),De(t.programInfo.name)}dispose(){}build(t,r){Ue(t.name);let n=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"},{feature:"subgroups-f16",extension:"subgroups_f16"}].forEach(u=>{n.features.has(u.feature)&&o.push(`enable ${u.extension};`)});let a=Xa(r,this.backend.device.limits),d=t.getShaderSource(a),l=`${o.join(`
`)}
${a.additionalImplementations}
${d}`,p=n.createShaderModule({code:l,label:t.name});ue("verbose",()=>`[WebGPU] ${t.name} shader code: ${l}`);let m=n.createComputePipeline({compute:{module:p,entryPoint:"main"},layout:"auto",label:t.name});return De(t.name),{programInfo:t,computePipeline:m,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(t){let r=typeof t=="number"?t:t.x,n=typeof t=="number"?1:t.y||1,o=typeof t=="number"?1:t.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=i&&n<=i&&o<=i)return[r,n,o];let a=r*n*o,d=Math.ceil(Math.sqrt(a));if(d>i){if(d=Math.ceil(Math.cbrt(a)),d>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[d,d,d]}else return[d,d,1]}}});var ng,og,Io,Co,on,jl=U(()=>{"use strict";Ve();J();Je();Xn();ja();ql();Kl();ng=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let o=e[n].dataType;switch(t[n]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let i=e[n].dims.length;r.push(`${o};${i}`);break}case"dims":{let i=e[n].dims.join(",");r.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")},og=(e,t,r)=>{let n=e.name;return e.shaderCache?.hint&&(n+="["+e.shaderCache.hint+"]"),n+=":"+r+`:${ng(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,n},Io=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},Co=class{constructor(t){this.subgroupsSupported=t.features.has("subgroups"),this.subgroupsF16Supported=t.features.has("subgroups");let r=t.limits;!this.subgroupsSupported||!r.minSubgroupSize||!r.maxSubgroupSize?this.subgroupSizeRange=void 0:this.subgroupSizeRange=[r.minSubgroupSize,r.maxSubgroupSize]}},on=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,r){this.env=t;let n=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},i=a=>r.features.has(a)&&n.push(a)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups")&&i("subgroups-f16"),this.device=await r.requestDevice(o),this.deviceInfo=new Co(this.device),this.adapterInfo=new Io(r.info||await r.requestAdapterInfo()),this.gpuDataManager=Ka(this),this.programManager=new nn(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Rr(t.logLevel,!!t.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Ue(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(t.getMappedRange()),n=this.pendingQueries.get(t);for(let o=0;o<r.length/2;o++){let i=n[o],a=i.kernelId,d=this.kernels.get(a),l=d.kernelType,p=d.kernelName,m=i.programName,u=i.inputTensorViews,h=i.outputTensorViews,_=r[o*2],y=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=_);let g=Number(_-this.queryTimeBase),x=Number(y-this.queryTimeBase);if(!Number.isSafeInteger(g)||!Number.isSafeInteger(x))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:u.map($=>({dims:$.dims,dataType:gt($.dataType)})),outputsMetadata:h.map($=>({dims:$.dims,dataType:gt($.dataType)})),kernelId:a,kernelType:l,kernelName:p,programName:m,startTime:g,endTime:x});else{let $="";u.forEach((S,T)=>{$+=`input[${T}]: [${S.dims}] | ${gt(S.dataType)}, `});let v="";h.forEach((S,T)=>{v+=`output[${T}]: [${S.dims}] | ${gt(S.dataType)}, `}),console.log(`[profiling] kernel "${a}|${l}|${p}|${m}" ${$}${v}execution time: ${x-g} ns`)}vr("GPU",`${m}::${_}::${y}`)}t.unmap(),this.pendingQueries.delete(t)}),De()}run(t,r,n,o,i,a){Ue(t.name);let d=[];for(let S=0;S<r.length;++S){let T=r[S].data;if(T===0)continue;let A=this.gpuDataManager.get(T);if(!A)throw new Error(`no GPU data for input: ${T}`);d.push(A)}let{outputs:l,dispatchGroup:p,programUniforms:m}=t.getRunData(r),u=n.length===0?l.map((S,T)=>T):n;if(u.length!==l.length)throw new Error(`Output size ${u.length} must be equal to ${l.length}.`);let h=[],_=[];for(let S=0;S<l.length;++S){if(!Number.isInteger(u[S])||u[S]<-3||u[S]>=a)throw new Error(`Invalid output index: ${u[S]}`);if(u[S]===-3)continue;let T=u[S]===-1,A=u[S]===-2,k=T||A?i(l[S].dataType,l[S].dims):o(u[S],l[S].dataType,l[S].dims);if(h.push(k),k.data===0)continue;let P=this.gpuDataManager.get(k.data);if(!P)throw new Error(`no GPU data for output: ${k.data}`);if(T&&this.temporaryData.push(P),A){let O=this.kernelPersistentData.get(this.currentKernelId);O||(O=[],this.kernelPersistentData.set(this.currentKernelId,O)),O.push(P)}_.push(P)}if(d.length!==r.length||_.length!==h.length){if(_.length===0)return De(t.name),h;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let y;if(m){let S=0,T=[];m.forEach(O=>{let R=typeof O.data=="number"?[O.data]:O.data;if(R.length===0)return;let G=O.type===10?2:4,q,j;O.type===10?(j=R.length>4?16:R.length>2?8:R.length*G,q=R.length>4?16:G*R.length):(j=R.length<=2?R.length*G:16,q=16),S=Math.ceil(S/j)*j,T.push(S);let W=O.type===10?8:4;S+=R.length>4?Math.ceil(R.length/W)*q:R.length*G});let A=16;S=Math.ceil(S/A)*A;let k=new ArrayBuffer(S);m.forEach((O,R)=>{let G=T[R],q=typeof O.data=="number"?[O.data]:O.data;if(O.type===6)new Int32Array(k,G,q.length).set(q);else if(O.type===12)new Uint32Array(k,G,q.length).set(q);else if(O.type===10)new Uint16Array(k,G,q.length).set(q);else if(O.type===1)new Float32Array(k,G,q.length).set(q);else throw new Error(`Unsupported uniform type: ${gt(O.type)}`)});let P=this.gpuDataManager.create(S,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(P.buffer,0,k,0,S),this.gpuDataManager.release(P.id),y={offset:0,size:S,buffer:P.buffer}}let g=this.programManager.normalizeDispatchGroupSize(p),x=g[1]===1&&g[2]===1,$=og(t,r,x),v=this.programManager.getArtifact($);if(v||(v=this.programManager.build(t,g),this.programManager.setArtifact($,v),ue("info",()=>`[artifact] key: ${$}, programName: ${t.name}`)),m&&v.uniformVariablesInfo){if(m.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${m.length} in program "${v.programInfo.name}".`);for(let S=0;S<m.length;S++){let T=m[S],A=T.type,k=typeof T.data=="number"?1:T.data.length,[P,O]=v.uniformVariablesInfo[S];if(A!==P||k!==O)throw new Error(`Uniform variable ${S} mismatch: expect type ${P} with size ${O}, got type ${A} with size ${k} in program "${v.programInfo.name}".`)}}if(ue("info",()=>`[ProgramManager] run "${t.name}" (key=${$}) with ${g[0]}x${g[1]}x${g[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let S={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:r,outputTensorViews:h};this.pendingKernels.push(S),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(S)}return this.programManager.run(v,d,_,g,y),De(t.name),h}upload(t,r){this.gpuDataManager.upload(t,r)}memcpy(t,r){this.gpuDataManager.memcpy(t,r)}async download(t,r){await this.gpuDataManager.download(t,r)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,r,n,o){let i=Fl.get(t);if(!i)throw new Error(`kernel not implemented: ${t}`);let a={kernelType:t,kernelName:o,kernelEntry:i[0],attributes:[i[1],n]};this.kernels.set(r,a)}releaseKernel(t){let r=this.kernelPersistentData.get(t);if(r){for(let n of r)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,r,n){let o=this.kernels.get(t);if(!o)throw new Error(`kernel not created: ${t}`);let i=o.kernelType,a=o.kernelName,d=o.kernelEntry,l=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=t,l[0]&&(l[1]=l[0](l[1]),l[0]=void 0),ue("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let p=this.env.debug;this.temporaryData=[];try{return p&&this.device.pushErrorScope("validation"),d(r,l[1]),0}catch(m){return n.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${m}`)),1}finally{p&&n.push(this.device.popErrorScope().then(m=>m?`GPU validation error for kernel "[${i}] ${a}": ${m.message}`:null));for(let m of this.temporaryData)this.gpuDataManager.release(m.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,r,n,o){let i=this.sessionExternalDataMapping.get(t);i||(i=new Map,this.sessionExternalDataMapping.set(t,i));let a=i.get(r),d=this.gpuDataManager.registerExternalBuffer(n,o,a);return i.set(r,[d,n]),d}unregisterBuffers(t){let r=this.sessionExternalDataMapping.get(t);r&&(r.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[0])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let r=this.gpuDataManager.get(t);if(!r)throw new Error(`no GPU data for buffer: ${t}`);return r.buffer}createDownloader(t,r,n){return async()=>{let o=await ro(this,t,r);return Ur(o.buffer,n)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ue("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ue("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ue("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),n=t.length;this.pendingKernels=[];for(let o=0;o<n;o++){let i=this.getComputePassEncoder(),a=t[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});var ig,Yl,ag,Zl,an,sn,Ao,Ql,Xl=U(()=>{"use strict";Je();ig=1,Yl=()=>ig++,ag=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Zl=(e,t)=>{let r=ag.get(e);if(!r)throw new Error("Unsupported data type.");return t.length>0?Math.ceil(t.reduce((n,o)=>n*o)*r/8):0},an=class{constructor(t){this.sessionId=t.sessionId,this.mlContext=t.context,this.mlTensor=t.tensor,this.dataType=t.dataType,this.tensorShape=t.shape}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return Zl(this.dataType,this.tensorShape)}destroy(){ue("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(t){this.mlContext.writeTensor(this.mlTensor,t)}async read(t){return t?this.mlContext.readTensor(this.mlTensor,t):this.mlContext.readTensor(this.mlTensor)}sameTypeAndShape(t,r){return this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((n,o)=>n===r[o])}},sn=class{constructor(t,r){this.tensorManager=t;this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(t,r,n){if(this.wrapper){if(this.wrapper.sameTypeAndShape(t,r))return this.wrapper.tensor;if(n){if(this.wrapper.byteLength!==Zl(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let o=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(t,r,o,!0,!0),n&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(t){if(this.wrapper)if(t.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else ue("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(t){if(this.activeUpload)if(t){t instanceof ArrayBuffer?new Uint8Array(t).set(this.activeUpload):new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(this.activeUpload);return}else return this.activeUpload.buffer;if(!this.wrapper)throw new Error("Tensor has not been created.");return t?this.wrapper.read(t):this.wrapper.read()}},Ao=class{constructor(t){this.backend=t;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}reserveTensorId(){let t=Yl();return this.tensorTrackersById.set(t,new sn(this)),t}releaseTensorId(t){let r=this.tensorTrackersById.get(t);r&&(this.tensorTrackersById.delete(t),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(t,r,n,o){ue("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${n}, copyOld: ${o}}`);let i=this.tensorTrackersById.get(t);if(!i)throw new Error("Tensor not found.");return i.ensureTensor(r,n,o)}upload(t,r){let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");n.upload(r)}async download(t,r){ue("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${t}, dstBuffer: ${r?.byteLength}}`);let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");return n.download(r)}releaseTensorsForSession(t){for(let r of this.freeTensors)r.sessionId===t&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==t)}registerTensor(t,r,n,o){let i=Yl(),a=new an({sessionId:this.backend.currentSessionId,context:t,tensor:r,dataType:n,shape:o});return this.tensorTrackersById.set(i,new sn(this,a)),this.externalTensors.add(a),i}async getCachedTensor(t,r,n,o,i){let a=this.backend.currentSessionId;for(let[p,m]of this.freeTensors.entries())if(m.sameTypeAndShape(t,r)){ue("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, shape: ${r}}`);let u=this.freeTensors.splice(p,1)[0];return u.sessionId=a,u}let d=this.backend.currentContext;ue("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, shape: ${r}}`);let l=await d.createTensor({dataType:t,shape:r,dimensions:r,usage:n,writable:o,readable:i});return new an({sessionId:a,context:d,tensor:l,dataType:t,shape:r})}releaseTensor(t){this.externalTensors.has(t)&&this.externalTensors.delete(t),this.freeTensors.push(t)}},Ql=(...e)=>new Ao(...e)});var Jl,sg,un,ec=U(()=>{"use strict";J();ht();Xn();Xl();Je();Jl=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),sg=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),n=Object.keys(t).sort();return r.length===n.length&&r.every((o,i)=>o===n[i]&&e[o]===t[o])},un=class{constructor(t){this.tensorManager=Ql(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];Rr(t.logLevel,!!t.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(t){this.activeSessionId=t}async createMLContext(t){if(t instanceof GPUDevice){let n=this.mlContextCache.findIndex(o=>o.gpuDevice===t);if(n!==-1)return this.mlContextCache[n].mlContext;{let o=await navigator.ml.createContext(t);return this.mlContextCache.push({gpuDevice:t,mlContext:o}),o}}else if(t===void 0){let n=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(n!==-1)return this.mlContextCache[n].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let r=this.mlContextCache.findIndex(n=>sg(n.options,t));if(r!==-1)return this.mlContextCache[r].mlContext;{let n=await navigator.ml.createContext(t);return this.mlContextCache.push({options:t,mlContext:n}),n}}get currentContext(){let t=this.getMLContext(this.currentSessionId);if(!t)throw new Error(`No MLContext found for session ${this.currentSessionId}`);return t}registerMLContext(t,r){this.mlContextBySessionId.set(t,r);let n=this.sessionIdsByMLContext.get(r);n||(n=new Set,this.sessionIdsByMLContext.set(r,n)),n.add(t)}onReleaseSession(t){let r=this.mlContextBySessionId.get(t);if(!r)return;this.tensorManager.releaseTensorsForSession(t),this.mlContextBySessionId.delete(t);let n=this.sessionIdsByMLContext.get(r);if(n.delete(t),n.size===0){this.sessionIdsByMLContext.delete(r);let o=this.mlContextCache.findIndex(i=>i.mlContext===r);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(t){return this.mlContextBySessionId.get(t)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(t){ue("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t)}async ensureTensor(t,r,n,o){let i=Jl.get(r);if(!i)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(t,i,n,o)}uploadTensor(t,r){if(!Ce().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ue("verbose",()=>`[WebNN] uploadTensor {tensorId: ${t}, data: ${r.byteLength}}`),this.tensorManager.upload(t,r)}async downloadTensor(t,r){return this.tensorManager.download(t,r)}createMLTensorDownloader(t,r){return async()=>{let n=await this.tensorManager.download(t);return Ur(n,r)}}registerMLTensor(t,r,n){let o=Jl.get(r);if(!o)throw new Error(`Unsupported ONNX data type: ${r}`);let i=this.tensorManager.registerTensor(this.currentContext,t,o,n);return ue("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${o}, dimensions: ${n}} -> {tensorId: ${i}}`),i}registerMLConstant(t,r,n,o,i,a){if(!a)throw new Error("External mounted files are not available.");let d=t;t.startsWith("./")&&(d=t.substring(2));let l=a.get(d);if(!l)throw new Error(`File with name ${d} not found in preloaded files.`);if(r+n>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let p=l.slice(r,r+n).buffer,m;switch(i.dataType){case"float32":m=new Float32Array(p);break;case"float16":m=new Uint16Array(p);break;case"int32":m=new Int32Array(p);break;case"uint32":m=new Uint32Array(p);break;case"int64":m=new BigInt64Array(p);break;case"uint64":m=new BigUint64Array(p);break;case"int8":m=new Int8Array(p);break;case"int4":case"uint4":case"uint8":m=new Uint8Array(p);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return ue("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}}`),o.constant(i,m)}flush(){}}});var tc={};Ft(tc,{init:()=>ug});var nr,ko,ug,rc=U(()=>{"use strict";J();jl();Je();ne();ec();nr=class e{constructor(t,r,n,o){this.module=t;this.dataType=r;this.data=n;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=C.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=C.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=C.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=C.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(C.size(t)!==C.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},ko=class{constructor(t,r,n){this.module=t;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo,this.deviceInfo=r.deviceInfo;let o=t.PTR_SIZE,i=n/t.PTR_SIZE,a=o===4?"i32":"i64";this.opKernelContext=Number(t.getValue(o*i++,a));let d=Number(t.getValue(o*i++,a));this.outputCount=Number(t.getValue(o*i++,a)),this.customDataOffset=Number(t.getValue(o*i++,"*")),this.customDataSize=Number(t.getValue(o*i++,a));let l=[];for(let p=0;p<d;p++){let m=Number(t.getValue(o*i++,a)),u=Number(t.getValue(o*i++,"*")),h=Number(t.getValue(o*i++,a)),_=[];for(let y=0;y<h;y++)_.push(Number(t.getValue(o*i++,a)));l.push(new nr(t,m,u,_))}this.inputs=l}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(t,r){let n=r?.inputs?.map(d=>typeof d=="number"?this.inputs[d]:d)??this.inputs,o=r?.outputs??[],i=(d,l,p)=>new nr(this.module,l,this.output(d,p),p),a=(d,l)=>{let p=Tt(d,l);if(!p)throw new Error(`Unsupported data type: ${d}`);let m=p>0?this.backend.gpuDataManager.create(p).id:0;return new nr(this.module,d,m,l)};return this.backend.run(t,n,o,i,a,this.outputCount)}output(t,r){let n=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",a=this.module.stackAlloc((1+r.length)*o);this.module.setValue(a,r.length,i);for(let d=0;d<r.length;d++)this.module.setValue(a+o*(d+1),r[d],i);return this.module._JsepOutput(this.opKernelContext,t,a)}catch(o){throw new Error(`Failed to generate kernel's output[${t}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(n)}}},ug=async(e,t,r,n)=>{let o=t.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let i=new on;await i.initialize(r,n),o("webgpu",[i,a=>i.alloc(Number(a)),a=>i.free(a),(a,d,l,p=!1)=>{if(p)ue("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(a)}, dst=${Number(d)}, size=${Number(l)}`),i.memcpy(Number(a),Number(d));else{ue("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(a)}, gpuDataId=${Number(d)}, size=${Number(l)}`);let m=t.HEAPU8.subarray(Number(a>>>0),Number(a>>>0)+Number(l));i.upload(Number(d),m)}},async(a,d,l)=>{ue("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${a}, dataOffset=${d}, size=${l}`),await i.download(Number(a),()=>t.HEAPU8.subarray(Number(d)>>>0,Number(d+l)>>>0))},(a,d,l)=>i.createKernel(a,Number(d),l,t.UTF8ToString(t._JsepGetNodeName(Number(d)))),a=>i.releaseKernel(a),(a,d,l,p)=>{ue("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${l}, kernel=${a}, contextDataOffset=${d}`);let m=new ko(t,i,Number(d));return i.computeKernel(Number(a),m,p)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else{let i=new un(r);o("webnn",[i,()=>i.reserveTensorId(),a=>i.releaseTensorId(a),async(a,d,l,p)=>i.ensureTensor(a,d,l,p),(a,d)=>{i.uploadTensor(a,d)},async(a,d)=>i.downloadTensor(a,d)])}}});var dg,Tr,Ir,kt,lg,jt,Cr,Ar,nc,kr,Er,Pr,qn=U(()=>{"use strict";Na();Wa();J();ht();Or();Qn();dg=(e,t)=>{Ce()._OrtInit(e,t)!==0&&pe("Can't initialize onnxruntime.")},Tr=async e=>{dg(e.wasm.numThreads,Qt(e.logLevel))},Ir=async(e,t)=>{{let r=(rc(),yr(tc)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let n=e.webgpu.adapter;if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=e.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=e.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",Ce(),e,n)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",Ce(),e)}}},kt=new Map,lg=e=>{let t=Ce(),r=t.stackSave();try{let n=t.PTR_SIZE,o=t.stackAlloc(2*n);t._OrtGetInputOutputCount(e,o,o+n)!==0&&pe("Can't get session input/output count.");let a=n===4?"i32":"i64";return[Number(t.getValue(o,a)),Number(t.getValue(o+n,a))]}finally{t.stackRestore(r)}},jt=e=>{let t=Ce(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},Cr=async(e,t)=>{let r,n,o=Ce();Array.isArray(e)?[r,n]=e:e.buffer===o.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=jt(e);let i=0,a=0,d=0,l=[],p=[],m=[];try{if([a,l]=Va(t),t?.externalData&&o.mountExternalData){let v=[];for(let S of t.externalData){let T=typeof S=="string"?S:S.path;v.push(Xt(typeof S=="string"?S:S.data).then(A=>{o.mountExternalData(T,A)}))}await Promise.all(v)}for(let v of t?.executionProviders??[])if((typeof v=="string"?v:v.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof v!="string"){let T=v,A=T?.context,k=T?.gpuDevice,P=T?.deviceType,O=T?.powerPreference;A?o.currentContext=A:k?o.currentContext=await o.jsepCreateMLContext(k):o.currentContext=await o.jsepCreateMLContext({deviceType:P,powerPreference:O})}else o.currentContext=await o.jsepCreateMLContext();break}i=await o._OrtCreateSession(r,n,a),i===0&&pe("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.jsepRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[u,h]=lg(i),_=!!t?.enableGraphCapture,y=[],g=[],x=[];for(let v=0;v<u;v++){let S=o._OrtGetInputName(i,v);S===0&&pe("Can't get an input name."),p.push(S),y.push(o.UTF8ToString(S))}for(let v=0;v<h;v++){let S=o._OrtGetOutputName(i,v);S===0&&pe("Can't get an output name."),m.push(S);let T=o.UTF8ToString(S);g.push(T);{if(_&&t?.preferredOutputLocation===void 0){x.push("gpu-buffer");continue}let A=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[T]??"cpu";if(A!=="cpu"&&A!=="cpu-pinned"&&A!=="gpu-buffer"&&A!=="ml-tensor")throw new Error(`Not supported preferred output location: ${A}.`);if(_&&A!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${A}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);x.push(A)}}let $=null;return x.some(v=>v==="gpu-buffer"||v==="ml-tensor")&&(d=o._OrtCreateBinding(i),d===0&&pe("Can't create IO binding."),$={handle:d,outputPreferredLocations:x,outputPreferredLocationsEncoded:x.map(v=>Zn(v))}),kt.set(i,[i,p,m,$,_,!1]),[i,y,g]}catch(u){throw p.forEach(h=>o._OrtFree(h)),m.forEach(h=>o._OrtFree(h)),d!==0&&o._OrtReleaseBinding(d)!==0&&pe("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&pe("Can't release session."),u}finally{o._free(r),a!==0&&o._OrtReleaseSessionOptions(a)!==0&&pe("Can't release session options."),l.forEach(u=>o._free(u)),o.unmountExternalData?.()}},Ar=e=>{let t=Ce(),r=kt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[n,o,i,a,d]=r;a&&(d&&t._OrtClearBoundOutputs(a.handle)!==0&&pe("Can't clear bound outputs."),t._OrtReleaseBinding(a.handle)!==0&&pe("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),o.forEach(l=>t._OrtFree(l)),i.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(n)!==0&&pe("Can't release session."),kt.delete(e)},nc=(e,t,r,n,o,i=!1)=>{if(!e){t.push(0);return}let a=Ce(),d=a.PTR_SIZE,l=e[0],p=e[1],m=e[3],u,h;if(l==="string"&&(m==="gpu-buffer"||m==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(i&&m!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(m==="gpu-buffer"){let g=e[2].gpuBuffer;h=Tt(Zt(l),p);let x=a.jsepRegisterBuffer;if(!x)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');u=x(n,o,g,h)}else if(m==="ml-tensor"){let g=e[2].mlTensor;h=Tt(Zt(l),p);let x=a.jsepRegisterMLTensor;if(!x)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');u=x(g,Zt(l),p)}else{let g=e[2];if(Array.isArray(g)){h=d*g.length,u=a._malloc(h),r.push(u);for(let x=0;x<g.length;x++){if(typeof g[x]!="string")throw new TypeError(`tensor data at index ${x} is not a string`);a.setValue(u+x*d,Ae(g[x],r),"*")}}else h=g.byteLength,u=a._malloc(h),r.push(u),a.HEAPU8.set(new Uint8Array(g.buffer,g.byteOffset,h),u)}let _=a.stackSave(),y=a.stackAlloc(4*p.length);try{p.forEach((x,$)=>a.setValue(y+$*d,x,d===4?"i32":"i64"));let g=a._OrtCreateTensor(Zt(l),u,h,y,p.length,Zn(m));g===0&&pe(`Can't create tensor for input/output. session=${n}, index=${o}.`),t.push(g)}finally{a.stackRestore(_)}},kr=async(e,t,r,n,o,i)=>{let a=Ce(),d=a.PTR_SIZE,l=kt.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let p=l[0],m=l[1],u=l[2],h=l[3],_=l[4],y=l[5],g=t.length,x=n.length,$=0,v=[],S=[],T=[],A=[],k=a.stackSave(),P=a.stackAlloc(g*d),O=a.stackAlloc(g*d),R=a.stackAlloc(x*d),G=a.stackAlloc(x*d);try{a.jsepOnRunStart?.(p),[$,v]=Ua(i);for(let W=0;W<g;W++)nc(r[W],S,A,e,t[W],_);for(let W=0;W<x;W++)nc(o[W],T,A,e,g+n[W],_);for(let W=0;W<g;W++)a.setValue(P+W*d,S[W],"*"),a.setValue(O+W*d,m[t[W]],"*");for(let W=0;W<x;W++)a.setValue(R+W*d,T[W],"*"),a.setValue(G+W*d,u[n[W]],"*");if(h&&!y){let{handle:W,outputPreferredLocations:Y,outputPreferredLocationsEncoded:se}=h;if(m.length!==g)throw new Error(`input count from feeds (${g}) is expected to be always equal to model's input count (${m.length}).`);for(let X=0;X<g;X++){let re=t[X];await a._OrtBindInput(W,m[re],S[X])!==0&&pe(`Can't bind input[${X}] for session=${e}.`)}for(let X=0;X<x;X++){let re=n[X];o[X]?.[3]?a._OrtBindOutput(W,u[re],T[X],0)!==0&&pe(`Can't bind pre-allocated output[${X}] for session=${e}.`):a._OrtBindOutput(W,u[re],0,se[re])!==0&&pe(`Can't bind output[${X}] to ${Y[X]} for session=${e}.`)}kt.set(e,[p,m,u,h,_,!0])}let q;h?q=await a._OrtRunWithBinding(p,h.handle,x,R,$):q=await a._OrtRun(p,O,P,g,G,x,R,$),q!==0&&pe("failed to call OrtRun().");let j=[];for(let W=0;W<x;W++){let Y=Number(a.getValue(R+W*d,"*"));if(Y===T[W]){j.push(o[W]);continue}let se=a.stackSave(),X=a.stackAlloc(4*d),re=!1,te,oe=0;try{a._OrtGetTensorData(Y,X,X+d,X+2*d,X+3*d)!==0&&pe(`Can't access output tensor data on index ${W}.`);let Oe=d===4?"i32":"i64",$e=Number(a.getValue(X,Oe));oe=a.getValue(X+d,"*");let le=a.getValue(X+d*2,"*"),V=Number(a.getValue(X+d*3,Oe)),K=[];for(let _e=0;_e<V;_e++)K.push(Number(a.getValue(le+_e*d,Oe)));a._OrtFree(le)!==0&&pe("Can't free memory for tensor dims.");let he=K.reduce((_e,be)=>_e*be,1);te=gt($e);let Le=h?.outputPreferredLocations[n[W]];if(te==="string"){if(Le==="gpu-buffer"||Le==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let _e=[];for(let be=0;be<he;be++){let je=a.getValue(oe+be*d,"*"),Lt=a.getValue(oe+(be+1)*d,"*"),fn=be===he-1?void 0:Lt-je;_e.push(a.UTF8ToString(je,fn))}j.push([te,K,_e,"cpu"])}else if(Le==="gpu-buffer"&&he>0){let _e=a.jsepGetBuffer;if(!_e)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let be=_e(oe),je=Tt($e,he);if(je===void 0||!Br(te))throw new Error(`Unsupported data type: ${te}`);re=!0,j.push([te,K,{gpuBuffer:be,download:a.jsepCreateDownloader(be,je,te),dispose:()=>{a._OrtReleaseTensor(Y)!==0&&pe("Can't release tensor.")}},"gpu-buffer"])}else if(Le==="ml-tensor"&&he>0){let _e=a.jsepEnsureTensor;if(!_e)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Tt($e,he)===void 0||!Mr(te))throw new Error(`Unsupported data type: ${te}`);let je=await _e(oe,$e,K,!1);re=!0,j.push([te,K,{mlTensor:je,download:a.jsepCreateMLTensorDownloader(oe,te),dispose:()=>{a.jsepReleaseTensorId(oe),a._OrtReleaseTensor(Y)}},"ml-tensor"])}else{let _e=Dr(te),be=new _e(he);new Uint8Array(be.buffer,be.byteOffset,be.byteLength).set(a.HEAPU8.subarray(oe,oe+be.byteLength)),j.push([te,K,be,"cpu"])}}finally{a.stackRestore(se),te==="string"&&oe&&a._free(oe),re||a._OrtReleaseTensor(Y)}}return h&&!_&&(a._OrtClearBoundOutputs(h.handle)!==0&&pe("Can't clear bound outputs."),kt.set(e,[p,m,u,h,_,!1])),j}finally{a.stackRestore(k),S.forEach(q=>a._OrtReleaseTensor(q)),T.forEach(q=>a._OrtReleaseTensor(q)),A.forEach(q=>a._free(q)),$!==0&&a._OrtReleaseRunOptions($),v.forEach(q=>a._free(q))}},Er=e=>{let t=Ce(),r=kt.get(e);if(!r)throw new Error("invalid session id");let n=r[0],o=t._OrtEndProfiling(n);o===0&&pe("Can't get an profile file name."),t._OrtFree(o)},Pr=e=>{let t=[];for(let r of e){let n=r[2];!Array.isArray(n)&&"buffer"in n&&t.push(n.buffer)}return t}});var Et,We,or,ln,cn,dn,Eo,Po,Vt,Wt,pg,oc,ic,ac,sc,uc,dc,lc,zo=U(()=>{"use strict";Ve();qn();ht();Kt();Et=()=>!!we.wasm.proxy&&typeof document<"u",or=!1,ln=!1,cn=!1,Po=new Map,Vt=(e,t)=>{let r=Po.get(e);r?r.push(t):Po.set(e,[t])},Wt=()=>{if(or||!ln||cn||!We)throw new Error("worker not ready")},pg=e=>{switch(e.data.type){case"init-wasm":or=!1,e.data.err?(cn=!0,Eo[1](e.data.err)):(ln=!0,Eo[0]()),dn&&(URL.revokeObjectURL(dn),dn=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Po.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},oc=async()=>{if(!ln){if(or)throw new Error("multiple calls to 'initWasm()' detected.");if(cn)throw new Error("previous call to 'initWasm()' failed.");if(or=!0,Et())return new Promise((e,t)=>{We?.terminate(),Ba().then(([r,n])=>{try{We=n,We.onerror=i=>t(i),We.onmessage=pg,Eo=[e,t];let o={type:"init-wasm",in:we};We.postMessage(o),dn=r}catch(o){t(o)}},t)});try{await Sr(we.wasm),await Tr(we),ln=!0}catch(e){throw cn=!0,e}finally{or=!1}}},ic=async e=>{if(Et())return Wt(),new Promise((t,r)=>{Vt("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:we}};We.postMessage(n)});await Ir(we,e)},ac=async e=>Et()?(Wt(),new Promise((t,r)=>{Vt("copy-from",[t,r]);let n={type:"copy-from",in:{buffer:e}};We.postMessage(n,[e.buffer])})):jt(e),sc=async(e,t)=>{if(Et()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Wt(),new Promise((r,n)=>{Vt("create",[r,n]);let o={type:"create",in:{model:e,options:{...t}}},i=[];e instanceof Uint8Array&&i.push(e.buffer),We.postMessage(o,i)})}else return Cr(e,t)},uc=async e=>{if(Et())return Wt(),new Promise((t,r)=>{Vt("release",[t,r]);let n={type:"release",in:e};We.postMessage(n)});Ar(e)},dc=async(e,t,r,n,o,i)=>{if(Et()){if(r.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return Wt(),new Promise((a,d)=>{Vt("run",[a,d]);let l=r,p={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:n,options:i}};We.postMessage(p,Pr(l))})}else return kr(e,t,r,n,o,i)},lc=async e=>{if(Et())return Wt(),new Promise((t,r)=>{Vt("end-profiling",[t,r]);let n={type:"end-profiling",in:e};We.postMessage(n)});Er(e)}});var cc,mg,pn,pc=U(()=>{"use strict";Ve();zo();J();xr();Qn();cc=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},mg=e=>{switch(e[3]){case"cpu":return new Ge(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Br(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:o}=e[2];return Ge.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:o})}case"ml-tensor":{let t=e[0];if(!Mr(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:n,dispose:o}=e[2];return Ge.fromMLTensor(r,{dataType:t,dims:e[1],download:n,dispose:o})}default:throw new Error(`invalid data location: ${e[3]}`)}},pn=class{async fetchModelAndCopyToWasmMemory(t){return ac(await Xt(t))}async loadModel(t,r){Ue();let n;typeof t=="string"?!1?n=await Xt(t):n=await this.fetchModelAndCopyToWasmMemory(t):n=t,[this.sessionId,this.inputNames,this.outputNames]=await sc(n,r),De()}async dispose(){return uc(this.sessionId)}async run(t,r,n){Ue();let o=[],i=[];Object.entries(t).forEach(h=>{let _=h[0],y=h[1],g=this.inputNames.indexOf(_);if(g===-1)throw new Error(`invalid input '${_}'`);o.push(y),i.push(g)});let a=[],d=[];Object.entries(r).forEach(h=>{let _=h[0],y=h[1],g=this.outputNames.indexOf(_);if(g===-1)throw new Error(`invalid output '${_}'`);a.push(y),d.push(g)});let l=o.map((h,_)=>cc(h,()=>`input "${this.inputNames[i[_]]}"`)),p=a.map((h,_)=>h?cc(h,()=>`output "${this.outputNames[d[_]]}"`):null),m=await dc(this.sessionId,i,l,d,p,n),u={};for(let h=0;h<m.length;h++)u[this.outputNames[d[h]]]=a[h]??mg(m[h]);return De(),u}startProfiling(){}endProfiling(){lc(this.sessionId)}}});var fc={};Ft(fc,{OnnxruntimeWebAssemblyBackend:()=>mn,initializeFlags:()=>mc,wasmBackend:()=>fg});var mc,mn,fg,hc=U(()=>{"use strict";Ve();zo();pc();Kt();mc=()=>{if((typeof we.wasm.initTimeout!="number"||we.wasm.initTimeout<0)&&(we.wasm.initTimeout=0),we.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof we.wasm.proxy!="boolean"&&(we.wasm.proxy=!1),typeof we.wasm.trace!="boolean"&&(we.wasm.trace=!1),typeof we.wasm.numThreads!="number"||!Number.isInteger(we.wasm.numThreads)||we.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)we.wasm.numThreads=1;else{let e=typeof navigator>"u"?Nn("node:os").cpus().length:navigator.hardwareConcurrency;we.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},mn=class{async init(t){mc(),await oc(),await ic(t)}async createInferenceSessionHandler(t,r){let n=new pn;return await n.loadModel(t,r),Promise.resolve(n)}},fg=new mn});Ve();Ve();Ve();var Ia="1.21.0-dev.20241205-d27fecd3d3";var yS=Fn;{let e=(hc(),yr(fc)).wasmBackend;xt("webgpu",e,5),xt("webnn",e,5),xt("cpu",e,10),xt("wasm",e,10)}Object.defineProperty(we.versions,"web",{value:Ia,enumerable:!0});export{Vp as InferenceSession,vr as TRACE,Ue as TRACE_FUNC_BEGIN,De as TRACE_FUNC_END,Ge as Tensor,yS as default,we as env,xt as registerBackend};
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
