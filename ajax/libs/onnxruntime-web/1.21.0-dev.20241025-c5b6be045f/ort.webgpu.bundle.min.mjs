/*!
 * ONNX Runtime Web v1.21.0-dev.20241025-c5b6be045f
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var Vn=Object.defineProperty;var vp=Object.getOwnPropertyDescriptor;var $p=Object.getOwnPropertyNames;var xp=Object.prototype.hasOwnProperty;var Nn=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var M=(e,t)=>()=>(e&&(t=e(e=0)),t);var Lt=(e,t)=>{for(var r in t)Vn(e,r,{get:t[r],enumerable:!0})},Sp=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of $p(t))!xp.call(e,o)&&o!==r&&Vn(e,o,{get:()=>t[o],enumerable:!(n=vp(t,o))||n.enumerable});return e};var gr=e=>Sp(Vn({},"__esModule",{value:!0}),e);var br,_t,vt,Tp,yr,wr=M(()=>{"use strict";br=new Map,_t=[],vt=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let n=br.get(e);if(n===void 0)br.set(e,{backend:t,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let o=_t.indexOf(e);o!==-1&&_t.splice(o,1);for(let i=0;i<_t.length;i++)if(br.get(_t[i]).priority<=r){_t.splice(i,0,e);return}_t.push(e)}return}throw new TypeError("not a valid backend")},Tp=async e=>{let t=br.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(n){return r||(t.error=`${n}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},yr=async e=>{let t=e.executionProviders||[],r=t.map(l=>typeof l=="string"?l:l.name),n=r.length===0?_t:r,o,i=[],a=new Set;for(let l of n){let c=await Tp(l);typeof c=="string"?i.push({name:l,err:c}):(o||(o=c),o===c&&a.add(l))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:c}of i)r.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${c}`);let d=t.filter(l=>a.has(typeof l=="string"?l:l.name));return[o,new Proxy(e,{get:(l,c)=>c==="executionProviders"?d:Reflect.get(l,c)})]}});var Ji=M(()=>{"use strict";wr()});var ea,ta=M(()=>{"use strict";ea="1.20.0-dev.20241016-2b8fc5529b"});var ra,Ue,Wn=M(()=>{"use strict";ta();ra="warning",Ue={wasm:{},webgl:{},webgpu:{},versions:{common:ea},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);ra=e}},get logLevel(){return ra}};Object.defineProperty(Ue,"logLevel",{enumerable:!0})});var xe,na=M(()=>{"use strict";Wn();xe=Ue});var oa,ia,aa=M(()=>{"use strict";oa=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(n!=null){let o,i;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[3]):(o=e.dims[3],i=e.dims[2]);let a=t?.format!==void 0?t.format:"RGB",d=t?.norm,l,c;d===void 0||d.mean===void 0?l=[255,255,255,255]:typeof d.mean=="number"?l=[d.mean,d.mean,d.mean,d.mean]:(l=[d.mean[0],d.mean[1],d.mean[2],0],d.mean[3]!==void 0&&(l[3]=d.mean[3])),d===void 0||d.bias===void 0?c=[0,0,0,0]:typeof d.bias=="number"?c=[d.bias,d.bias,d.bias,d.bias]:(c=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(c[3]=d.bias[3]));let m=i*o,u=0,h=m,w=m*2,b=-1;a==="RGBA"?(u=0,h=m,w=m*2,b=m*3):a==="RGB"?(u=0,h=m,w=m*2):a==="RBG"&&(u=0,w=m,h=m*2);for(let g=0;g<i;g++)for(let $=0;$<o;$++){let x=(e.data[u++]-c[0])*l[0],v=(e.data[h++]-c[1])*l[1],S=(e.data[w++]-c[2])*l[2],T=b===-1?255:(e.data[b++]-c[3])*l[3];n.fillStyle="rgba("+x+","+v+","+S+","+T+")",n.fillRect($,g,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},ia=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(r!=null){let o,i,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[1],a=e.dims[3]):(o=e.dims[3],i=e.dims[2],a=e.dims[1]);let d=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,c,m;l===void 0||l.mean===void 0?c=[255,255,255,255]:typeof l.mean=="number"?c=[l.mean,l.mean,l.mean,l.mean]:(c=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(c[3]=l.mean[3])),l===void 0||l.bias===void 0?m=[0,0,0,0]:typeof l.bias=="number"?m=[l.bias,l.bias,l.bias,l.bias]:(m=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(m[3]=l.bias[3]));let u=i*o;if(t!==void 0&&(t.format!==void 0&&a===4&&t.format!=="RGBA"||a===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let h=4,w=0,b=1,g=2,$=3,x=0,v=u,S=u*2,T=-1;d==="RGBA"?(x=0,v=u,S=u*2,T=u*3):d==="RGB"?(x=0,v=u,S=u*2):d==="RBG"&&(x=0,S=u,v=u*2),n=r.createImageData(o,i);for(let C=0;C<i*o;w+=h,b+=h,g+=h,$+=h,C++)n.data[w]=(e.data[x++]-m[0])*c[0],n.data[b]=(e.data[v++]-m[1])*c[1],n.data[g]=(e.data[S++]-m[2])*c[2],n.data[$]=T===-1?255:(e.data[T++]-m[3])*c[3]}else throw new Error("Can not access image data");return n}});var Ln,sa,ua,da,la,ca,pa=M(()=>{"use strict";_r();Ln=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=t,o=t.norm??{mean:255,bias:0},i,a;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?a=[o.bias,o.bias,o.bias,o.bias]:a=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let d=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",c=r*n,m=l==="RGBA"?new Float32Array(c*4):new Float32Array(c*3),u=4,h=0,w=1,b=2,g=3,$=0,x=c,v=c*2,S=-1;d==="RGB"&&(u=3,h=0,w=1,b=2,g=-1),l==="RGBA"?S=c*3:l==="RBG"?($=0,v=c,x=c*2):l==="BGR"&&(v=0,x=c,$=c*2);for(let C=0;C<c;C++,h+=u,b+=u,w+=u,g+=u)m[$++]=(e[h]+a[0])/i[0],m[x++]=(e[w]+a[1])/i[1],m[v++]=(e[b]+a[2])/i[2],S!==-1&&g!==-1&&(m[S++]=(e[g]+a[3])/i[3]);return l==="RGBA"?new De("float32",m,[1,4,r,n]):new De("float32",m,[1,3,r,n])},sa=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,n=typeof ImageData<"u"&&e instanceof ImageData,o=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,i=typeof e=="string",a,d=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},c=m=>typeof HTMLCanvasElement<"u"&&m instanceof HTMLCanvasElement||m instanceof OffscreenCanvas?m.getContext("2d"):null;if(r){let m=l();m.width=e.width,m.height=e.height;let u=c(m);if(u!=null){let h=e.height,w=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(h=t.resizedHeight,w=t.resizedWidth),t!==void 0){if(d=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");d.tensorFormat="RGBA",d.height=h,d.width=w}else d.tensorFormat="RGBA",d.height=h,d.width=w;u.drawImage(e,0,0),a=u.getImageData(0,0,w,h).data}else throw new Error("Can not access image data")}else if(n){let m,u;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(m=t.resizedHeight,u=t.resizedWidth):(m=e.height,u=e.width),t!==void 0&&(d=t),d.format="RGBA",d.height=m,d.width=u,t!==void 0){let h=l();h.width=u,h.height=m;let w=c(h);if(w!=null)w.putImageData(e,0,0),a=w.getImageData(0,0,u,m).data;else throw new Error("Can not access image data")}else a=e.data}else if(o){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let m=l();m.width=e.width,m.height=e.height;let u=c(m);if(u!=null){let h=e.height,w=e.width;return u.drawImage(e,0,0,w,h),a=u.getImageData(0,0,w,h).data,d.height=h,d.width=w,Ln(a,d)}else throw new Error("Can not access image data")}else{if(i)return new Promise((m,u)=>{let h=l(),w=c(h);if(!e||!w)return u();let b=new Image;b.crossOrigin="Anonymous",b.src=e,b.onload=()=>{h.width=b.width,h.height=b.height,w.drawImage(b,0,0,h.width,h.height);let g=w.getImageData(0,0,h.width,h.height);d.height=h.height,d.width=h.width,m(Ln(g.data,d))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return Ln(a,d);throw new Error("Input data provided is not supported - aborted tensor creation")},ua=(e,t)=>{let{width:r,height:n,download:o,dispose:i}=t,a=[1,n,r,4];return new De({location:"texture",type:"float32",texture:e,dims:a,download:o,dispose:i})},da=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:i}=t;return new De({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:o,dispose:i})},la=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:i}=t;return new De({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:n,download:o,dispose:i})},ca=(e,t,r)=>new De({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})});var $t,Gt,ma,fa,ha=M(()=>{"use strict";$t=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Gt=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),ma=!1,fa=()=>{if(!ma){ma=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=typeof Float16Array<"u"&&Float16Array.from;e&&($t.set("int64",BigInt64Array),Gt.set(BigInt64Array,"int64")),t&&($t.set("uint64",BigUint64Array),Gt.set(BigUint64Array,"uint64")),r?($t.set("float16",Float16Array),Gt.set(Float16Array,"float16")):$t.set("float16",Uint16Array)}}});var ga,ba,ya=M(()=>{"use strict";_r();ga=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},ba=(e,t)=>{switch(e.location){case"cpu":return new De(e.type,e.data,t);case"cpu-pinned":return new De({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new De({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new De({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new De({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var De,_r=M(()=>{"use strict";aa();pa();ha();ya();De=class{constructor(t,r,n){fa();let o,i;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,o=t.type,i=t.dims,t.location){case"cpu-pinned":{let d=$t.get(o);if(!d)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(t.data instanceof d))throw new TypeError(`buffer should be of type ${d.name}`);this.cpuData=t.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let d,l;if(typeof t=="string")if(o=t,l=n,t==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");d=r}else{let c=$t.get(t);if(c===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(r)){if(t==="float16"&&c===Uint16Array||t==="uint4"||t==="int4")throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${c.name} as data.`);t==="uint64"||t==="int64"?d=c.from(r,BigInt):d=c.from(r)}else if(r instanceof c)d=r;else if(r instanceof Uint8ClampedArray)if(t==="uint8")d=Uint8Array.from(r);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else throw new TypeError(`A ${o} tensor's data must be type of ${c}`)}else if(l=r,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let c=typeof t[0];if(c==="string")o="string",d=t;else if(c==="boolean")o="bool",d=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${c}.`)}else if(t instanceof Uint8ClampedArray)o="uint8",d=Uint8Array.from(t);else{let c=Gt.get(t.constructor);if(c===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);o=c,d=t}if(l===void 0)l=[d.length];else if(!Array.isArray(l))throw new TypeError("A tensor's dims must be a number array");i=l,this.cpuData=d,this.dataLocation="cpu"}let a=ga(i);if(this.cpuData&&a!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=a}static async fromImage(t,r){return sa(t,r)}static fromTexture(t,r){return ua(t,r)}static fromGpuBuffer(t,r){return da(t,r)}static fromMLTensor(t,r){return la(t,r)}static fromPinnedBuffer(t,r,n){return ca(t,r,n)}toDataURL(t){return oa(this,t)}toImageData(t){return ia(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,t&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return ba(this,t)}}});var Be,vr=M(()=>{"use strict";_r();Be=De});var $r,wa,Ve,Re,Gn=M(()=>{"use strict";Wn();$r=(e,t)=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||console.timeStamp(`${e}::ORT::${t}`)},wa=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],n=!1;for(let o=0;o<r.length;o++){if(n&&!r[o].includes("TRACE_FUNC")){let i=`FUNC_${e}::${r[o].trim().split(" ")[1]}`;t&&(i+=`::${t}`),$r("CPU",i);return}r[o].includes("TRACE_FUNC")&&(n=!0)}},Ve=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||wa("BEGIN",e)},Re=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||wa("END",e)}});var xr,_a=M(()=>{"use strict";wr();vr();Gn();xr=class e{constructor(t){this.handler=t}async run(t,r,n){Ve();let o={},i={};if(typeof t!="object"||t===null||t instanceof Be||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Be)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let c of r){if(typeof c!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(c)===-1)throw new RangeError(`'fetches' contains invalid output name: ${c}.`);o[c]=null}if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let c=!1,m=Object.getOwnPropertyNames(r);for(let u of this.outputNames)if(m.indexOf(u)!==-1){let h=r[u];(h===null||h instanceof Be)&&(c=!0,a=!1,o[u]=h)}if(c){if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let c of this.inputNames)if(typeof t[c]>"u")throw new Error(`input '${c}' is missing in 'feeds'.`);if(a)for(let c of this.outputNames)o[c]=null;let d=await this.handler.run(t,o,i),l={};for(let c in d)if(Object.hasOwnProperty.call(d,c)){let m=d[c];m instanceof Be?l[c]=m:l[c]=new Be(m.type,m.data,m.dims)}return Re(),l}async release(){return this.handler.dispose()}static async create(t,r,n,o){Ve();let i,a={};if(typeof t=="string"){if(i=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(i=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let m=t,u=0,h=t.byteLength;if(typeof r=="object"&&r!==null)a=r;else if(typeof r=="number"){if(u=r,!Number.isSafeInteger(u))throw new RangeError("'byteOffset' must be an integer.");if(u<0||u>=m.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${m.byteLength}).`);if(h=t.byteLength-u,typeof n=="number"){if(h=n,!Number.isSafeInteger(h))throw new RangeError("'byteLength' must be an integer.");if(h<=0||u+h>m.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${m.byteLength-u}].`);if(typeof o=="object"&&o!==null)a=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof n<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(m,u,h)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[d,l]=await yr(a),c=await d.createInferenceSessionHandler(i,l);return Re(),new e(c)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var Ip,va=M(()=>{"use strict";_a();Ip=xr});var $a=M(()=>{"use strict"});var xa=M(()=>{"use strict"});var Sa=M(()=>{"use strict"});var Ta=M(()=>{"use strict"});var Cp,Sr,Ia=M(()=>{"use strict";wr();vr();Cp="Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.",Sr=class e{constructor(t,r,n){this.handler=t,this.hasOptimizerModel=r,this.hasEvalModel=n}get trainingInputNames(){return this.handler.inputNames}get trainingOutputNames(){return this.handler.outputNames}get evalInputNames(){if(this.hasEvalModel)return this.handler.evalInputNames;throw new Error("This training session has no evalModel loaded.")}get evalOutputNames(){if(this.hasEvalModel)return this.handler.evalOutputNames;throw new Error("This training session has no evalModel loaded.")}static async create(t,r){let n=t.evalModel||"",o=t.optimizerModel||"",i=r||{},[a,d]=await yr(i);if(a.createTrainingSessionHandler){let l=await a.createTrainingSessionHandler(t.checkpointState,t.trainModel,n,o,d);return new e(l,!!t.optimizerModel,!!t.evalModel)}else throw new Error(Cp)}typeNarrowingForRunStep(t,r,n,o,i){let a={},d={};if(typeof n!="object"||n===null||n instanceof Be||Array.isArray(n))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let l=!0;if(typeof o=="object"){if(o===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(o instanceof Be)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(o)){if(o.length===0)throw new TypeError("'fetches' cannot be an empty array.");l=!1;for(let c of o){if(typeof c!="string")throw new TypeError("'fetches' must be a string array or an object.");if(r.indexOf(c)===-1)throw new RangeError(`'fetches' contains invalid output name: ${c}.`);a[c]=null}if(typeof i=="object"&&i!==null)d=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let c=!1,m=Object.getOwnPropertyNames(o);for(let u of r)if(m.indexOf(u)!==-1){let h=o[u];(h===null||h instanceof Be)&&(c=!0,l=!1,a[u]=h)}if(c){if(typeof i=="object"&&i!==null)d=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else d=o}}else if(typeof o<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let c of t)if(typeof n[c]>"u")throw new Error(`input '${c}' is missing in 'feeds'.`);if(l)for(let c of r)a[c]=null;return[a,d]}convertHandlerReturnTypeToMapOfTensors(t){let r={};for(let n in t)if(Object.hasOwnProperty.call(t,n)){let o=t[n];o instanceof Be?r[n]=o:r[n]=new Be(o.type,o.data,o.dims)}return r}async lazyResetGrad(){await this.handler.lazyResetGrad()}async runTrainStep(t,r,n){let[o,i]=this.typeNarrowingForRunStep(this.trainingInputNames,this.trainingOutputNames,t,r,n),a=await this.handler.runTrainStep(t,o,i);return this.convertHandlerReturnTypeToMapOfTensors(a)}async runOptimizerStep(t){if(this.hasOptimizerModel)await this.handler.runOptimizerStep(t||{});else throw new Error("This TrainingSession has no OptimizerModel loaded.")}async runEvalStep(t,r,n){if(this.hasEvalModel){let[o,i]=this.typeNarrowingForRunStep(this.evalInputNames,this.evalOutputNames,t,r,n),a=await this.handler.runEvalStep(t,o,i);return this.convertHandlerReturnTypeToMapOfTensors(a)}else throw new Error("This TrainingSession has no EvalModel loaded.")}async getParametersSize(t=!0){return this.handler.getParametersSize(t)}async loadParametersBuffer(t,r=!0){let n=await this.getParametersSize(r);if(t.length!==4*n)throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");return this.handler.loadParametersBuffer(t,r)}async getContiguousParameters(t=!0){return this.handler.getContiguousParameters(t)}async release(){return this.handler.dispose()}}});var Ap,Ca=M(()=>{"use strict";Ia();Ap=Sr});var Hn={};Lt(Hn,{InferenceSession:()=>Ip,TRACE:()=>$r,TRACE_FUNC_BEGIN:()=>Ve,TRACE_FUNC_END:()=>Re,Tensor:()=>Be,TrainingSession:()=>Ap,env:()=>xe,registerBackend:()=>vt});var Fe=M(()=>{"use strict";Ji();na();va();vr();$a();xa();Gn();Sa();Ta();Ca()});var Tr=M(()=>{"use strict"});var Pa={};Lt(Pa,{default:()=>kp});var ka,Ea,kp,za=M(()=>{"use strict";Fn();ht();Ht();ka="ort-wasm-proxy-worker",Ea=globalThis.self?.name===ka;Ea&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":Ir(r.wasm).then(()=>{Cr(r).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})})},n=>{postMessage({type:t,err:n})});break;case"init-ep":{let{epName:n,env:o}=r;Ar(o,n).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})});break}case"copy-from":{let{buffer:n}=r,o=Ft(n);postMessage({type:t,out:o});break}case"create":{let{model:n,options:o}=r;kr(n,o).then(i=>{postMessage({type:t,out:i})},i=>{postMessage({type:t,err:i})});break}case"release":Er(r),postMessage({type:t});break;case"run":{let{sessionId:n,inputIndices:o,inputs:i,outputIndices:a,options:d}=r;Pr(n,o,i,a,new Array(a.length).fill(null),d).then(l=>{l.some(c=>c[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},Or([...i,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":zr(r),postMessage({type:t});break;default:}}catch(n){postMessage({type:t,err:n})}});kp=Ea?null:e=>new Worker(e??Ot,{type:"module",name:ka})});var Da={};Lt(Da,{default:()=>Ep});var qn,Oa,Ep,Ba=M(()=>{"use strict";Oa=(qn=import.meta.url,async function(e={}){function t(){return ue.buffer!=X.buffer&&ve(),X}function r(){return ue.buffer!=X.buffer&&ve(),Q}function n(){return ue.buffer!=X.buffer&&ve(),ye}function o(){return ue.buffer!=X.buffer&&ve(),we}function i(){return ue.buffer!=X.buffer&&ve(),ce}function a(){return ue.buffer!=X.buffer&&ve(),ne}function d(){return ue.buffer!=X.buffer&&ve(),U}function l(){return ue.buffer!=X.buffer&&ve(),Oe}var c,m,u=Object.assign({},e),h=new Promise((s,p)=>{c=s,m=p}),w=typeof window=="object",b=typeof importScripts=="function",g=b&&self.name=="em-pthread";u.mountExternalData=(s,p)=>{s.startsWith("./")&&(s=s.substring(2)),(u.Eb||(u.Eb=new Map)).set(s,p)},u.unmountExternalData=()=>{delete u.Eb};var $=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let x=()=>{let s=(f,y,_)=>(...I)=>{let O=Qe,B=y?.();I=f(...I);let L=y?.();return B!==L&&(f=L,_(B),y=_=null),Qe!=O?new Promise((F,Z)=>{Pn={resolve:F,reject:Z}}):I},p=f=>async(...y)=>{try{if(u.Fb)throw Error("Session already started");let _=u.Fb={fc:y[0],errors:[]},I=await f(...y);if(u.Fb!==_)throw Error("Session mismatch");u.Gb?.flush();let O=_.errors;if(0<O.length){let B=await Promise.all(O);if(B=B.filter(L=>L),0<B.length)throw Error(B.join(`
`))}return I}finally{u.Fb=null}};u._OrtCreateSession=s(u._OrtCreateSession,()=>u._OrtCreateSession,f=>u._OrtCreateSession=f),u._OrtRun=p(s(u._OrtRun,()=>u._OrtRun,f=>u._OrtRun=f)),u._OrtRunWithBinding=p(s(u._OrtRunWithBinding,()=>u._OrtRunWithBinding,f=>u._OrtRunWithBinding=f)),u._OrtBindInput=s(u._OrtBindInput,()=>u._OrtBindInput,f=>u._OrtBindInput=f),x=void 0};u.jsepInit=(s,p)=>{if(x?.(),s==="webgpu"){[u.Gb,u.Ub,u.Yb,u.Nb,u.Xb,u.jb,u.Zb,u.bc,u.Vb,u.Wb,u.$b]=p;let f=u.Gb;u.jsepRegisterBuffer=(y,_,I,O)=>f.registerBuffer(y,_,I,O),u.jsepGetBuffer=y=>f.getBuffer(y),u.jsepCreateDownloader=(y,_,I)=>f.createDownloader(y,_,I),u.jsepOnCreateSession=y=>{f.onCreateSession(y)},u.jsepOnReleaseSession=y=>{f.onReleaseSession(y)},u.jsepOnRunStart=y=>f.onRunStart(y),u.cc=(y,_)=>{f.upload(y,_)}}else if(s==="webnn"){[u.Gb,u.ac,u.Ob,u.jsepEnsureTensor,u.dc,u.jsepDownloadTensor]=p,u.jsepReleaseTensorId=u.Ob;let f=u.Gb;u.jsepOnRunStart=y=>f.onRunStart(y),u.jsepRegisterMLContext=(y,_)=>{f.registerMLContext(y,_)},u.jsepOnReleaseSession=y=>{f.onReleaseSession(y)},u.jsepCreateMLTensorDownloader=(y,_)=>f.createMLTensorDownloader(y,_),u.jsepRegisterMLTensor=(y,_,I)=>f.registerMLTensor(y,_,I),u.qc=(y,_,I,O,B)=>f.registerMLConstant(y,_,I,O,B,u.Eb)}};var v,S,T=Object.assign({},u),C="./this.program",A=(s,p)=>{throw p},P="";(w||b)&&(b?P=self.location.href:typeof document<"u"&&document.currentScript&&(P=document.currentScript.src),qn&&(P=qn),P=P.startsWith("blob:")?"":P.substr(0,P.replace(/[?#].*/,"").lastIndexOf("/")+1),b&&(S=s=>{var p=new XMLHttpRequest;return p.open("GET",s,!1),p.responseType="arraybuffer",p.send(null),new Uint8Array(p.response)}),v=(s,p,f)=>{var y=new XMLHttpRequest;y.open("GET",s,!0),y.responseType="arraybuffer",y.onload=()=>{y.status==200||y.status==0&&y.response?p(y.response):f()},y.onerror=f,y.send(null)});var D,N=console.log.bind(console),G=console.error.bind(console),q=N,K=G;if(Object.assign(u,T),T=null,g){let s=function(p){try{var f=p.data,y=f.cmd;if(y==="load"){let _=[];self.onmessage=I=>_.push(I),self.startWorker=()=>{postMessage({cmd:"loaded"});for(let I of _)s(I);self.onmessage=s};for(let I of f.handlers)u[I]&&!u[I].proxy||(u[I]=(...O)=>{postMessage({Mb:"callHandler",oc:I,args:O})},I=="print"&&(q=u[I]),I=="printErr"&&(K=u[I]));ue=f.wasmMemory,ve(),W(f.wasmModule)}else if(y==="run"){Bn(f.pthread_ptr,0,0,1,0,0),An(f.pthread_ptr),ic(),Ho(),J||(Wi(),J=!0);try{ac(f.start_routine,f.arg)}catch(_){if(_!="unwind")throw _}}else y==="cancel"?zt()&&fr(-1):f.target!=="setimmediate"&&(y==="checkMailbox"?J&&ir():y&&(K(`worker: received unknown command ${y}`),K(f)))}catch(_){throw Li(),_}};var jh=s,W,J=!1;K=function(...p){p=p.join(" "),console.error(p)},self.alert=function(...p){postMessage({Mb:"alert",text:p.join(" "),rc:zt()})},u.instantiateWasm=(p,f)=>new Promise(y=>{W=_=>{_=new WebAssembly.Instance(_,Vo()),f(_),y()}}),self.onunhandledrejection=p=>{throw p.reason||p},self.onmessage=s}u.wasmBinary&&(D=u.wasmBinary);var ue,ee,oe,X,Q,ye,we,ce,ne,U,H,pe,Oe,he=!1;function ve(){var s=ue.buffer;u.HEAP8=X=new Int8Array(s),u.HEAP16=ye=new Int16Array(s),u.HEAPU8=Q=new Uint8Array(s),u.HEAPU16=we=new Uint16Array(s),u.HEAP32=ce=new Int32Array(s),u.HEAPU32=ne=new Uint32Array(s),u.HEAPF32=U=new Float32Array(s),u.HEAPF64=Oe=new Float64Array(s),u.HEAP64=H=new BigInt64Array(s),u.HEAPU64=pe=new BigUint64Array(s)}if(!g){if(!((ue=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0})).buffer instanceof $))throw K("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),Error("bad memory");ve()}var Ye=[],Vt=[],fn=[],Nt=0,hn=null,Wt=null;function Do(){if(--Nt==0&&(hn!==null&&(clearInterval(hn),hn=null),Wt)){var s=Wt;Wt=null,s()}}function lt(s){throw K(s="Aborted("+s+")"),he=!0,oe=1,s=new WebAssembly.RuntimeError(s+". Build with -sASSERTIONS for more info."),m(s),s}var gn,Bo=s=>s.startsWith("data:application/octet-stream;base64,"),Ro=s=>s.startsWith("file://");function Mo(s){if(s==gn&&D)return new Uint8Array(D);if(S)return S(s);throw"both async and sync fetching of the wasm failed"}function Uo(s,p,f){return function(y){if(!D&&(w||b)){if(typeof fetch=="function"&&!Ro(y))return fetch(y,{credentials:"same-origin"}).then(_=>{if(!_.ok)throw`failed to load wasm binary file at '${y}'`;return _.arrayBuffer()}).catch(()=>Mo(y));if(v)return new Promise((_,I)=>{v(y,O=>_(new Uint8Array(O)),I)})}return Promise.resolve().then(()=>Mo(y))}(s).then(y=>WebAssembly.instantiate(y,p)).then(f,y=>{K(`failed to asynchronously prepare wasm: ${y}`),lt(y)})}function Vo(){return{a:{O:oc,Aa:nc,b:uc,aa:Ko,B:Xo,qa:Qo,Y:ei,_:ti,ra:ri,oa:ni,ha:oi,na:ii,L:ai,Z:si,W:ui,pa:di,X:li,wa:dc,F:cc,Q:pc,P:fc,E:gc,u:bc,q:yc,G:wc,A:Ic,R:Cc,ua:Ac,ka:kc,U:Ec,ba:Pc,H:zc,ja:An,ta:Oc,t:Dc,x:Mc,n:Uc,l:Nc,c:In,o:Wc,j:Hc,w:Fc,p:qc,g:jc,s:Kc,m:Yc,e:Zc,k:Xc,i:Qc,h:Jc,d:ep,ea:tp,fa:rp,ga:np,ca:Si,da:Ti,T:op,f:ip,D:ap,I:sp,M:up,y:dp,sa:lp,V:cp,v:Ci,z:pp,N:mp,S:fp,za:hp,ya:gp,la:Ei,ma:Pi,$:vn,C:zi,K:Oi,ia:Di,J:Bi,a:ue,xa:_n,va:Ui,r:wp}}}var bn={873940:(s,p,f,y,_)=>{if(u===void 0||!u.Eb)return 1;if((s=Pe(Number(s>>>0))).startsWith("./")&&(s=s.substring(2)),!(s=u.Eb.get(s)))return 2;if(p=Number(p>>>0),f=Number(f>>>0),y=Number(y>>>0),p+f>s.byteLength)return 3;try{let I=s.subarray(p,p+f);switch(_){case 0:r().set(I,y>>>0);break;case 1:u.cc(y,I);break;default:return 4}return 0}catch{return 4}},874655:(s,p,f)=>{u.dc(s,r().subarray(p>>>0,p+f>>>0))},874718:()=>u.ac(),874759:s=>{u.Ob(s)},874795:()=>{u.Vb()},874826:()=>{u.Wb()},874855:()=>{u.$b()},874880:s=>u.Ub(s),874913:s=>u.Yb(s),874945:(s,p,f)=>{u.Nb(Number(s),Number(p),Number(f),!0)},875008:(s,p,f)=>{u.Nb(Number(s),Number(p),Number(f))},875065:()=>typeof wasmOffsetConverter<"u",875122:s=>{u.jb("Abs",s,void 0)},875173:s=>{u.jb("Neg",s,void 0)},875224:s=>{u.jb("Floor",s,void 0)},875277:s=>{u.jb("Ceil",s,void 0)},875329:s=>{u.jb("Reciprocal",s,void 0)},875387:s=>{u.jb("Sqrt",s,void 0)},875439:s=>{u.jb("Exp",s,void 0)},875490:s=>{u.jb("Erf",s,void 0)},875541:s=>{u.jb("Sigmoid",s,void 0)},875596:(s,p,f)=>{u.jb("HardSigmoid",s,{alpha:p,beta:f})},875675:s=>{u.jb("Log",s,void 0)},875726:s=>{u.jb("Sin",s,void 0)},875777:s=>{u.jb("Cos",s,void 0)},875828:s=>{u.jb("Tan",s,void 0)},875879:s=>{u.jb("Asin",s,void 0)},875931:s=>{u.jb("Acos",s,void 0)},875983:s=>{u.jb("Atan",s,void 0)},876035:s=>{u.jb("Sinh",s,void 0)},876087:s=>{u.jb("Cosh",s,void 0)},876139:s=>{u.jb("Asinh",s,void 0)},876192:s=>{u.jb("Acosh",s,void 0)},876245:s=>{u.jb("Atanh",s,void 0)},876298:s=>{u.jb("Tanh",s,void 0)},876350:s=>{u.jb("Not",s,void 0)},876401:(s,p,f)=>{u.jb("Clip",s,{min:p,max:f})},876470:s=>{u.jb("Clip",s,void 0)},876522:(s,p)=>{u.jb("Elu",s,{alpha:p})},876580:s=>{u.jb("Gelu",s,void 0)},876632:s=>{u.jb("Relu",s,void 0)},876684:(s,p)=>{u.jb("LeakyRelu",s,{alpha:p})},876748:(s,p)=>{u.jb("ThresholdedRelu",s,{alpha:p})},876818:(s,p)=>{u.jb("Cast",s,{to:p})},876876:s=>{u.jb("Add",s,void 0)},876927:s=>{u.jb("Sub",s,void 0)},876978:s=>{u.jb("Mul",s,void 0)},877029:s=>{u.jb("Div",s,void 0)},877080:s=>{u.jb("Pow",s,void 0)},877131:s=>{u.jb("Equal",s,void 0)},877184:s=>{u.jb("Greater",s,void 0)},877239:s=>{u.jb("GreaterOrEqual",s,void 0)},877301:s=>{u.jb("Less",s,void 0)},877353:s=>{u.jb("LessOrEqual",s,void 0)},877412:(s,p,f,y,_)=>{u.jb("ReduceMean",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:y?Array.from(i().subarray(Number(y)>>>0,Number(_)>>>0)):[]})},877587:(s,p,f,y,_)=>{u.jb("ReduceMax",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:y?Array.from(i().subarray(Number(y)>>>0,Number(_)>>>0)):[]})},877761:(s,p,f,y,_)=>{u.jb("ReduceMin",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:y?Array.from(i().subarray(Number(y)>>>0,Number(_)>>>0)):[]})},877935:(s,p,f,y,_)=>{u.jb("ReduceProd",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:y?Array.from(i().subarray(Number(y)>>>0,Number(_)>>>0)):[]})},878110:(s,p,f,y,_)=>{u.jb("ReduceSum",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:y?Array.from(i().subarray(Number(y)>>>0,Number(_)>>>0)):[]})},878284:(s,p,f,y,_)=>{u.jb("ReduceL1",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:y?Array.from(i().subarray(Number(y)>>>0,Number(_)>>>0)):[]})},878457:(s,p,f,y,_)=>{u.jb("ReduceL2",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:y?Array.from(i().subarray(Number(y)>>>0,Number(_)>>>0)):[]})},878630:(s,p,f,y,_)=>{u.jb("ReduceLogSum",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:y?Array.from(i().subarray(Number(y)>>>0,Number(_)>>>0)):[]})},878807:(s,p,f,y,_)=>{u.jb("ReduceSumSquare",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:y?Array.from(i().subarray(Number(y)>>>0,Number(_)>>>0)):[]})},878987:(s,p,f,y,_)=>{u.jb("ReduceLogSumExp",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:y?Array.from(i().subarray(Number(y)>>>0,Number(_)>>>0)):[]})},879167:s=>{u.jb("Where",s,void 0)},879220:(s,p,f)=>{u.jb("Transpose",s,{perm:p?Array.from(i().subarray(Number(p)>>>0,Number(f)>>>0)):[]})},879344:(s,p,f,y)=>{u.jb("DepthToSpace",s,{blocksize:p,mode:Pe(f),format:y?"NHWC":"NCHW"})},879477:(s,p,f,y)=>{u.jb("DepthToSpace",s,{blocksize:p,mode:Pe(f),format:y?"NHWC":"NCHW"})},879610:(s,p,f,y,_,I,O,B,L,F,Z,me,_e,z,le)=>{u.jb("ConvTranspose",s,{format:L?"NHWC":"NCHW",autoPad:p,dilations:[f],group:y,kernelShape:[_],pads:[I,O],strides:[B],wIsConst:()=>!!t()[F>>>0],outputPadding:Z?Array.from(i().subarray(Number(Z)>>>0,Number(me)>>>0)):[],outputShape:_e?Array.from(i().subarray(Number(_e)>>>0,Number(z)>>>0)):[],activation:Pe(le)})},880043:(s,p,f,y,_,I,O,B,L,F,Z,me,_e,z)=>{u.jb("ConvTranspose",s,{format:B?"NHWC":"NCHW",autoPad:p,dilations:Array.from(i().subarray(Number(f)>>>0,2+(Number(f)>>>0)>>>0)),group:y,kernelShape:Array.from(i().subarray(Number(_)>>>0,2+(Number(_)>>>0)>>>0)),pads:Array.from(i().subarray(Number(I)>>>0,4+(Number(I)>>>0)>>>0)),strides:Array.from(i().subarray(Number(O)>>>0,2+(Number(O)>>>0)>>>0)),wIsConst:()=>!!t()[L>>>0],outputPadding:F?Array.from(i().subarray(Number(F)>>>0,Number(Z)>>>0)):[],outputShape:me?Array.from(i().subarray(Number(me)>>>0,Number(_e)>>>0)):[],activation:Pe(z)})},880704:(s,p,f,y,_,I,O,B,L,F,Z,me,_e,z,le)=>{u.jb("ConvTranspose",s,{format:L?"NHWC":"NCHW",autoPad:p,dilations:[f],group:y,kernelShape:[_],pads:[I,O],strides:[B],wIsConst:()=>!!t()[F>>>0],outputPadding:Z?Array.from(i().subarray(Number(Z)>>>0,Number(me)>>>0)):[],outputShape:_e?Array.from(i().subarray(Number(_e)>>>0,Number(z)>>>0)):[],activation:Pe(le)})},881137:(s,p,f,y,_,I,O,B,L,F,Z,me,_e,z)=>{u.jb("ConvTranspose",s,{format:B?"NHWC":"NCHW",autoPad:p,dilations:Array.from(i().subarray(Number(f)>>>0,2+(Number(f)>>>0)>>>0)),group:y,kernelShape:Array.from(i().subarray(Number(_)>>>0,2+(Number(_)>>>0)>>>0)),pads:Array.from(i().subarray(Number(I)>>>0,4+(Number(I)>>>0)>>>0)),strides:Array.from(i().subarray(Number(O)>>>0,2+(Number(O)>>>0)>>>0)),wIsConst:()=>!!t()[L>>>0],outputPadding:F?Array.from(i().subarray(Number(F)>>>0,Number(Z)>>>0)):[],outputShape:me?Array.from(i().subarray(Number(me)>>>0,Number(_e)>>>0)):[],activation:Pe(z)})},881798:(s,p)=>{u.jb("GlobalAveragePool",s,{format:p?"NHWC":"NCHW"})},881889:(s,p,f,y,_,I,O,B,L,F,Z,me,_e,z)=>{u.jb("AveragePool",s,{format:z?"NHWC":"NCHW",auto_pad:p,ceil_mode:f,count_include_pad:y,storage_order:_,dilations:I?Array.from(i().subarray(Number(I)>>>0,Number(O)>>>0)):[],kernel_shape:B?Array.from(i().subarray(Number(B)>>>0,Number(L)>>>0)):[],pads:F?Array.from(i().subarray(Number(F)>>>0,Number(Z)>>>0)):[],strides:me?Array.from(i().subarray(Number(me)>>>0,Number(_e)>>>0)):[]})},882368:(s,p)=>{u.jb("GlobalAveragePool",s,{format:p?"NHWC":"NCHW"})},882459:(s,p,f,y,_,I,O,B,L,F,Z,me,_e,z)=>{u.jb("AveragePool",s,{format:z?"NHWC":"NCHW",auto_pad:p,ceil_mode:f,count_include_pad:y,storage_order:_,dilations:I?Array.from(i().subarray(Number(I)>>>0,Number(O)>>>0)):[],kernel_shape:B?Array.from(i().subarray(Number(B)>>>0,Number(L)>>>0)):[],pads:F?Array.from(i().subarray(Number(F)>>>0,Number(Z)>>>0)):[],strides:me?Array.from(i().subarray(Number(me)>>>0,Number(_e)>>>0)):[]})},882938:(s,p)=>{u.jb("GlobalMaxPool",s,{format:p?"NHWC":"NCHW"})},883025:(s,p,f,y,_,I,O,B,L,F,Z,me,_e,z)=>{u.jb("MaxPool",s,{format:z?"NHWC":"NCHW",auto_pad:p,ceil_mode:f,count_include_pad:y,storage_order:_,dilations:I?Array.from(i().subarray(Number(I)>>>0,Number(O)>>>0)):[],kernel_shape:B?Array.from(i().subarray(Number(B)>>>0,Number(L)>>>0)):[],pads:F?Array.from(i().subarray(Number(F)>>>0,Number(Z)>>>0)):[],strides:me?Array.from(i().subarray(Number(me)>>>0,Number(_e)>>>0)):[]})},883500:(s,p)=>{u.jb("GlobalMaxPool",s,{format:p?"NHWC":"NCHW"})},883587:(s,p,f,y,_,I,O,B,L,F,Z,me,_e,z)=>{u.jb("MaxPool",s,{format:z?"NHWC":"NCHW",auto_pad:p,ceil_mode:f,count_include_pad:y,storage_order:_,dilations:I?Array.from(i().subarray(Number(I)>>>0,Number(O)>>>0)):[],kernel_shape:B?Array.from(i().subarray(Number(B)>>>0,Number(L)>>>0)):[],pads:F?Array.from(i().subarray(Number(F)>>>0,Number(Z)>>>0)):[],strides:me?Array.from(i().subarray(Number(me)>>>0,Number(_e)>>>0)):[]})},884062:(s,p,f,y,_)=>{u.jb("Gemm",s,{alpha:p,beta:f,transA:y,transB:_})},884166:s=>{u.jb("MatMul",s,void 0)},884220:(s,p,f,y)=>{u.jb("ArgMax",s,{keepDims:!!p,selectLastIndex:!!f,axis:y})},884328:(s,p,f,y)=>{u.jb("ArgMin",s,{keepDims:!!p,selectLastIndex:!!f,axis:y})},884436:(s,p)=>{u.jb("Softmax",s,{axis:p})},884499:(s,p)=>{u.jb("Concat",s,{axis:p})},884559:(s,p,f,y,_)=>{u.jb("Split",s,{axis:p,numOutputs:f,splitSizes:y?Array.from(i().subarray(Number(y)>>>0,Number(_)>>>0)):[]})},884715:s=>{u.jb("Expand",s,void 0)},884769:(s,p)=>{u.jb("Gather",s,{axis:Number(p)})},884840:(s,p)=>{u.jb("GatherElements",s,{axis:Number(p)})},884919:(s,p,f,y,_,I,O,B,L,F,Z)=>{u.jb("Resize",s,{antialias:p,axes:f?Array.from(i().subarray(Number(f)>>>0,Number(y)>>>0)):[],coordinateTransformMode:Pe(_),cubicCoeffA:I,excludeOutside:O,extrapolationValue:B,keepAspectRatioPolicy:Pe(L),mode:Pe(F),nearestMode:Pe(Z)})},885281:(s,p,f,y,_,I,O)=>{u.jb("Slice",s,{starts:p?Array.from(i().subarray(Number(p)>>>0,Number(f)>>>0)):[],ends:y?Array.from(i().subarray(Number(y)>>>0,Number(_)>>>0)):[],axes:I?Array.from(i().subarray(Number(I)>>>0,Number(O)>>>0)):[]})},885545:s=>{u.jb("Tile",s,void 0)},885597:(s,p,f)=>{u.jb("InstanceNormalization",s,{epsilon:p,format:f?"NHWC":"NCHW"})},885711:(s,p,f)=>{u.jb("InstanceNormalization",s,{epsilon:p,format:f?"NHWC":"NCHW"})},885825:s=>{u.jb("Range",s,void 0)},885878:(s,p)=>{u.jb("Einsum",s,{equation:Pe(p)})},885959:(s,p,f,y,_)=>{u.jb("Pad",s,{mode:p,value:f,pads:y?Array.from(i().subarray(Number(y)>>>0,Number(_)>>>0)):[]})},886102:(s,p,f,y,_,I)=>{u.jb("BatchNormalization",s,{epsilon:p,momentum:f,spatial:!!_,trainingMode:!!y,format:I?"NHWC":"NCHW"})},886271:(s,p,f,y,_,I)=>{u.jb("BatchNormalization",s,{epsilon:p,momentum:f,spatial:!!_,trainingMode:!!y,format:I?"NHWC":"NCHW"})},886440:(s,p,f)=>{u.jb("CumSum",s,{exclusive:Number(p),reverse:Number(f)})},886537:(s,p,f)=>{u.jb("DequantizeLinear",s,{axis:p,blockSize:f})},886627:(s,p,f,y,_,I,O,B,L)=>{u.jb("Attention",s,{numHeads:p,isUnidirectional:f,maskFilterValue:y,scale:_,doRotary:I,qkvHiddenSizes:O?Array.from(i().subarray(Number(B)>>>0,Number(B)+O>>>0)):[],pastPresentShareBuffer:!!L})},886899:s=>{u.jb("BiasAdd",s,void 0)},886954:s=>{u.jb("BiasSplitGelu",s,void 0)},887015:s=>{u.jb("FastGelu",s,void 0)},887071:(s,p,f,y,_,I,O,B,L,F,Z,me,_e,z,le,Te)=>{u.jb("Conv",s,{format:me?"NHWC":"NCHW",auto_pad:p,dilations:f?Array.from(i().subarray(Number(f)>>>0,Number(y)>>>0)):[],group:_,kernel_shape:I?Array.from(i().subarray(Number(I)>>>0,Number(O)>>>0)):[],pads:B?Array.from(i().subarray(Number(B)>>>0,Number(L)>>>0)):[],strides:F?Array.from(i().subarray(Number(F)>>>0,Number(Z)>>>0)):[],w_is_const:()=>!!t()[Number(_e)>>>0],activation:Pe(z),activation_params:le?Array.from(d().subarray(Number(le)>>>0,Number(Te)>>>0)):[]})},887655:s=>{u.jb("Gelu",s,void 0)},887707:(s,p,f,y,_,I,O,B,L)=>{u.jb("GroupQueryAttention",s,{numHeads:p,kvNumHeads:f,scale:y,softcap:_,doRotary:I,rotaryInterleaved:O,smoothSoftmax:B,localWindowSize:L})},887924:(s,p,f,y)=>{u.jb("LayerNormalization",s,{axis:p,epsilon:f,simplified:!!y})},888035:(s,p,f,y)=>{u.jb("LayerNormalization",s,{axis:p,epsilon:f,simplified:!!y})},888146:(s,p,f,y,_,I)=>{u.jb("MatMulNBits",s,{k:p,n:f,accuracyLevel:y,bits:_,blockSize:I})},888273:(s,p,f,y,_,I)=>{u.jb("MultiHeadAttention",s,{numHeads:p,isUnidirectional:f,maskFilterValue:y,scale:_,doRotary:I})},888432:(s,p)=>{u.jb("QuickGelu",s,{alpha:p})},888496:(s,p,f,y,_)=>{u.jb("RotaryEmbedding",s,{interleaved:!!p,numHeads:f,rotaryEmbeddingDim:y,scale:_})},888635:(s,p,f)=>{u.jb("SkipLayerNormalization",s,{epsilon:p,simplified:!!f})},888737:(s,p,f)=>{u.jb("SkipLayerNormalization",s,{epsilon:p,simplified:!!f})},888839:(s,p,f,y)=>{u.jb("GatherBlockQuantized",s,{gatherAxis:p,quantizeAxis:f,blockSize:y})},888960:s=>{u.Zb(s)},888994:(s,p)=>u.bc(Number(s),Number(p),u.Fb.fc,u.Fb.errors)};function nc(s,p,f){return wi(async()=>{await u.Xb(Number(s),Number(p),Number(f))})}function oc(){return typeof wasmOffsetConverter<"u"}function yn(s){this.name="ExitStatus",this.message=`Program terminated with exit(${s})`,this.status=s}var wn=s=>{s.terminate(),s.onmessage=()=>{}},No=s=>{ct.length==0&&(qo(),Fo(ct[0]));var p=ct.pop();if(!p)return 6;yt.push(p),Ze[s.Ab]=p,p.Ab=s.Ab;var f={cmd:"run",start_routine:s.hc,arg:s.Qb,pthread_ptr:s.Ab};return p.postMessage(f,s.mc),0},bt=0,Se=(s,p,...f)=>{for(var y=2*f.length,_=Un(),I=Mn(8*y),O=I>>>3,B=0;B<f.length;B++){var L=f[B];typeof L=="bigint"?(H[O+2*B]=1n,H[O+2*B+1]=L):(H[O+2*B]=0n,l()[O+2*B+1>>>0]=L)}return s=Gi(s,0,y,I,p),hr(_),s};function _n(s){if(g)return Se(0,1,s);if(oe=s,!(0<bt)){for(var p of yt)wn(p);for(p of ct)wn(p);ct=[],yt=[],Ze=[],he=!0}A(s,new yn(s))}function Wo(s){if(g)return Se(1,0,s);vn(s)}var vn=s=>{if(oe=s,g)throw Wo(s),"unwind";_n(s)},ct=[],yt=[],Lo=[],Ze={},Go=s=>{var p=s.Ab;delete Ze[p],ct.push(s),yt.splice(yt.indexOf(s),1),s.Ab=0,Rn(p)};function Ho(){Lo.forEach(s=>s())}var Fo=s=>new Promise(p=>{s.onmessage=_=>{var I=(_=_.data).cmd;if(_.targetThread&&_.targetThread!=zt()){var O=Ze[_.targetThread];O?O.postMessage(_,_.transferList):K(`Internal error! Worker sent a message "${I}" to target pthread ${_.targetThread}, but that thread no longer exists!`)}else I==="checkMailbox"?ir():I==="spawnThread"?No(_):I==="cleanupThread"?Go(Ze[_.thread]):I==="killThread"?(_=_.thread,I=Ze[_],delete Ze[_],wn(I),Rn(_),yt.splice(yt.indexOf(I),1),I.Ab=0):I==="cancelThread"?Ze[_.thread].postMessage({cmd:"cancel"}):I==="loaded"?(s.loaded=!0,p(s)):I==="alert"?alert(`Thread ${_.threadId}: ${_.text}`):_.target==="setimmediate"?s.postMessage(_):I==="callHandler"?u[_.handler](..._.args):I&&K(`worker sent an unknown command ${I}`)},s.onerror=_=>{throw K(`worker sent an error! ${_.filename}:${_.lineno}: ${_.message}`),_};var f,y=[];for(f of[])u.hasOwnProperty(f)&&y.push(f);s.postMessage({cmd:"load",handlers:y,wasmMemory:ue,wasmModule:ee})});function qo(){var s=new Worker(new URL(import.meta.url),{type:"module",workerData:"em-pthread",name:"em-pthread"});ct.push(s)}var or=s=>{for(;0<s.length;)s.shift()(u)},ic=()=>{var s=zt(),p=a()[s+52>>>2>>>0];s=a()[s+56>>>2>>>0],Fi(p,p-s),hr(p)},ac=(s,p)=>{bt=0,s=qi(s,p),0<bt?oe=s:fr(s)};class sc{constructor(p){this.Jb=p-24}}function uc(s,p,f){var y=new sc(s>>>=0);throw p>>>=0,f>>>=0,a()[y.Jb+16>>>2>>>0]=0,a()[y.Jb+4>>>2>>>0]=p,a()[y.Jb+8>>>2>>>0]=f,s}function jo(s,p,f,y){return g?Se(2,1,s,p,f,y):Ko(s,p,f,y)}function Ko(s,p,f,y){if(s>>>=0,p>>>=0,f>>>=0,y>>>=0,$===void 0)return K("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var _=[];return g&&_.length===0?jo(s,p,f,y):(s={hc:f,Ab:s,Qb:y,mc:_},g?(s.Mb="spawnThread",postMessage(s,_),0):No(s))}var Yo=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,Zo=(s,p,f)=>{var y=(p>>>=0)+f;for(f=p;s[f]&&!(f>=y);)++f;if(16<f-p&&s.buffer&&Yo)return Yo.decode(s.buffer instanceof $?s.slice(p,f):s.subarray(p,f));for(y="";p<f;){var _=s[p++];if(128&_){var I=63&s[p++];if((224&_)==192)y+=String.fromCharCode((31&_)<<6|I);else{var O=63&s[p++];65536>(_=(240&_)==224?(15&_)<<12|I<<6|O:(7&_)<<18|I<<12|O<<6|63&s[p++])?y+=String.fromCharCode(_):(_-=65536,y+=String.fromCharCode(55296|_>>10,56320|1023&_))}}else y+=String.fromCharCode(_)}return y},Pe=(s,p)=>(s>>>=0)?Zo(r(),s,p):"";function Xo(s,p,f){return g?Se(3,1,s,p,f):0}function Qo(s,p){if(g)return Se(4,1,s,p)}var $n=s=>{for(var p=0,f=0;f<s.length;++f){var y=s.charCodeAt(f);127>=y?p++:2047>=y?p+=2:55296<=y&&57343>=y?(p+=4,++f):p+=3}return p},Jo=(s,p,f,y)=>{if(!(0<y))return 0;var _=f>>>=0;y=f+y-1;for(var I=0;I<s.length;++I){var O=s.charCodeAt(I);if(55296<=O&&57343>=O&&(O=65536+((1023&O)<<10)|1023&s.charCodeAt(++I)),127>=O){if(f>=y)break;p[f++>>>0]=O}else{if(2047>=O){if(f+1>=y)break;p[f++>>>0]=192|O>>6}else{if(65535>=O){if(f+2>=y)break;p[f++>>>0]=224|O>>12}else{if(f+3>=y)break;p[f++>>>0]=240|O>>18,p[f++>>>0]=128|O>>12&63}p[f++>>>0]=128|O>>6&63}p[f++>>>0]=128|63&O}}return p[f>>>0]=0,f-_},kt=(s,p,f)=>Jo(s,r(),p,f);function ei(s,p){if(g)return Se(5,1,s,p)}function ti(s,p,f){if(g)return Se(6,1,s,p,f)}function ri(s,p,f){return g?Se(7,1,s,p,f):0}function ni(s,p){if(g)return Se(8,1,s,p)}function oi(s,p,f){if(g)return Se(9,1,s,p,f)}function ii(s,p,f,y){if(g)return Se(10,1,s,p,f,y)}function ai(s,p,f,y){if(g)return Se(11,1,s,p,f,y)}function si(s,p,f,y){if(g)return Se(12,1,s,p,f,y)}function ui(s){if(g)return Se(13,1,s)}function di(s,p){if(g)return Se(14,1,s,p)}function li(s,p,f){if(g)return Se(15,1,s,p,f)}var ci,pt,dc=()=>{lt("")},Xe=s=>{for(var p="";r()[s>>>0];)p+=ci[r()[s++>>>0]];return p},xn={},Sn={},lc={};function at(s,p,f={}){if(!("argPackAdvance"in p))throw new TypeError("registerType registeredInstance requires argPackAdvance");return function(y,_,I={}){var O=_.name;if(!y)throw new pt(`type "${O}" must have a positive integer typeid pointer`);if(Sn.hasOwnProperty(y)){if(I.Sb)return;throw new pt(`Cannot register type '${O}' twice`)}Sn[y]=_,delete lc[y],xn.hasOwnProperty(y)&&(_=xn[y],delete xn[y],_.forEach(B=>B()))}(s,p,f)}var pi=(s,p,f)=>{switch(p){case 1:return f?y=>t()[y>>>0]:y=>r()[y>>>0];case 2:return f?y=>n()[y>>>1>>>0]:y=>o()[y>>>1>>>0];case 4:return f?y=>i()[y>>>2>>>0]:y=>a()[y>>>2>>>0];case 8:return f?y=>H[y>>>3]:y=>pe[y>>>3];default:throw new TypeError(`invalid integer width (${p}): ${s}`)}};function cc(s,p,f){f>>>=0,at(s>>>=0,{name:p=Xe(p>>>0),fromWireType:y=>y,toWireType:function(y,_){if(typeof _!="bigint"&&typeof _!="number")throw _=_===null?"null":(y=typeof _)=="object"||y==="array"||y==="function"?_.toString():""+_,new TypeError(`Cannot convert "${_}" to ${this.name}`);return typeof _=="number"&&(_=BigInt(_)),_},argPackAdvance:mt,readValueFromPointer:pi(p,f,p.indexOf("u")==-1),Db:null})}var mt=8;function pc(s,p,f,y){at(s>>>=0,{name:p=Xe(p>>>0),fromWireType:function(_){return!!_},toWireType:function(_,I){return I?f:y},argPackAdvance:mt,readValueFromPointer:function(_){return this.fromWireType(r()[_>>>0])},Db:null})}var Tn=[],st=[];function In(s){9<(s>>>=0)&&--st[s+1]==0&&(st[s]=void 0,Tn.push(s))}var Ge=s=>{if(!s)throw new pt("Cannot use deleted val. handle = "+s);return st[s]},He=s=>{switch(s){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let p=Tn.pop()||st.length;return st[p]=s,st[p+1]=1,p}};function Cn(s){return this.fromWireType(a()[s>>>2>>>0])}var mc={name:"emscripten::val",fromWireType:s=>{var p=Ge(s);return In(s),p},toWireType:(s,p)=>He(p),argPackAdvance:mt,readValueFromPointer:Cn,Db:null};function fc(s){return at(s>>>0,mc)}var hc=(s,p)=>{switch(p){case 4:return function(f){return this.fromWireType(d()[f>>>2>>>0])};case 8:return function(f){return this.fromWireType(l()[f>>>3>>>0])};default:throw new TypeError(`invalid float width (${p}): ${s}`)}};function gc(s,p,f){f>>>=0,at(s>>>=0,{name:p=Xe(p>>>0),fromWireType:y=>y,toWireType:(y,_)=>_,argPackAdvance:mt,readValueFromPointer:hc(p,f),Db:null})}function bc(s,p,f,y,_){if(s>>>=0,f>>>=0,p=Xe(p>>>0),_===-1&&(_=4294967295),_=B=>B,y===0){var I=32-8*f;_=B=>B<<I>>>I}var O=p.includes("unsigned")?function(B,L){return L>>>0}:function(B,L){return L};at(s,{name:p,fromWireType:_,toWireType:O,argPackAdvance:mt,readValueFromPointer:pi(p,f,y!==0),Db:null})}function yc(s,p,f){function y(I){var O=a()[I>>>2>>>0];return I=a()[I+4>>>2>>>0],new _(t().buffer,I,O)}var _=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][p];at(s>>>=0,{name:f=Xe(f>>>0),fromWireType:y,argPackAdvance:mt,readValueFromPointer:y},{Sb:!0})}function wc(s,p){s>>>=0;var f=(p=Xe(p>>>0))==="std::string";at(s,{name:p,fromWireType:function(y){var _=a()[y>>>2>>>0],I=y+4;if(f)for(var O=I,B=0;B<=_;++B){var L=I+B;if(B==_||r()[L>>>0]==0){if(O=Pe(O,L-O),F===void 0)var F=O;else F+=String.fromCharCode(0),F+=O;O=L+1}}else{for(F=Array(_),B=0;B<_;++B)F[B]=String.fromCharCode(r()[I+B>>>0]);F=F.join("")}return Je(y),F},toWireType:function(y,_){_ instanceof ArrayBuffer&&(_=new Uint8Array(_));var I=typeof _=="string";if(!(I||_ instanceof Uint8Array||_ instanceof Uint8ClampedArray||_ instanceof Int8Array))throw new pt("Cannot pass non-string to std::string");var O=f&&I?$n(_):_.length,B=mr(4+O+1),L=B+4;if(a()[B>>>2>>>0]=O,f&&I)kt(_,L,O+1);else if(I)for(I=0;I<O;++I){var F=_.charCodeAt(I);if(255<F)throw Je(L),new pt("String has UTF-16 code units that do not fit in 8 bits");r()[L+I>>>0]=F}else for(I=0;I<O;++I)r()[L+I>>>0]=_[I];return y!==null&&y.push(Je,B),B},argPackAdvance:mt,readValueFromPointer:Cn,Db(y){Je(y)}})}var mi=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,_c=(s,p)=>{for(var f=s>>1,y=f+p/2;!(f>=y)&&o()[f>>>0];)++f;if(32<(f<<=1)-s&&mi)return mi.decode(r().slice(s,f));for(f="",y=0;!(y>=p/2);++y){var _=n()[s+2*y>>>1>>>0];if(_==0)break;f+=String.fromCharCode(_)}return f},vc=(s,p,f)=>{if(f??=2147483647,2>f)return 0;var y=p;f=(f-=2)<2*s.length?f/2:s.length;for(var _=0;_<f;++_){var I=s.charCodeAt(_);n()[p>>>1>>>0]=I,p+=2}return n()[p>>>1>>>0]=0,p-y},$c=s=>2*s.length,xc=(s,p)=>{for(var f=0,y="";!(f>=p/4);){var _=i()[s+4*f>>>2>>>0];if(_==0)break;++f,65536<=_?(_-=65536,y+=String.fromCharCode(55296|_>>10,56320|1023&_)):y+=String.fromCharCode(_)}return y},Sc=(s,p,f)=>{if(p>>>=0,f??=2147483647,4>f)return 0;var y=p;f=y+f-4;for(var _=0;_<s.length;++_){var I=s.charCodeAt(_);if(55296<=I&&57343>=I&&(I=65536+((1023&I)<<10)|1023&s.charCodeAt(++_)),i()[p>>>2>>>0]=I,(p+=4)+4>f)break}return i()[p>>>2>>>0]=0,p-y},Tc=s=>{for(var p=0,f=0;f<s.length;++f){var y=s.charCodeAt(f);55296<=y&&57343>=y&&++f,p+=4}return p};function Ic(s,p,f){if(s>>>=0,p>>>=0,f=Xe(f>>>=0),p===2)var y=_c,_=vc,I=$c,O=B=>o()[B>>>1>>>0];else p===4&&(y=xc,_=Sc,I=Tc,O=B=>a()[B>>>2>>>0]);at(s,{name:f,fromWireType:B=>{for(var L,F=a()[B>>>2>>>0],Z=B+4,me=0;me<=F;++me){var _e=B+4+me*p;me!=F&&O(_e)!=0||(Z=y(Z,_e-Z),L===void 0?L=Z:(L+=String.fromCharCode(0),L+=Z),Z=_e+p)}return Je(B),L},toWireType:(B,L)=>{if(typeof L!="string")throw new pt(`Cannot pass non-string to C++ string type ${f}`);var F=I(L),Z=mr(4+F+p);return a()[Z>>>2>>>0]=F/p,_(L,Z+4,F+p),B!==null&&B.push(Je,Z),Z},argPackAdvance:mt,readValueFromPointer:Cn,Db(B){Je(B)}})}function Cc(s,p){at(s>>>=0,{Tb:!0,name:p=Xe(p>>>0),argPackAdvance:0,fromWireType:()=>{},toWireType:()=>{}})}var Ac=()=>1;function kc(s){Bn(s>>>0,!b,1,!w,131072,!1),Ho()}var fi=s=>{if(!he)try{if(s(),!(0<bt))try{g?fr(oe):vn(oe)}catch(p){p instanceof yn||p=="unwind"||A(1,p)}}catch(p){p instanceof yn||p=="unwind"||A(1,p)}};function An(s){s>>>=0,typeof Atomics.nc=="function"&&(Atomics.nc(i(),s>>>2,s).value.then(ir),s+=128,Atomics.store(i(),s>>>2,1))}var ir=()=>{var s=zt();s&&(An(s),fi(Hi))};function Ec(s,p){(s>>>=0)==p>>>0?setTimeout(ir):g?postMessage({targetThread:s,cmd:"checkMailbox"}):(s=Ze[s])&&s.postMessage({cmd:"checkMailbox"})}var kn=[];function Pc(s,p,f,y,_){for(p>>>=0,y/=2,kn.length=y,f=_>>>0>>>3,_=0;_<y;_++)kn[_]=H[f+2*_]?H[f+2*_+1]:l()[f+2*_+1>>>0];return(p?bn[p]:_p[s])(...kn)}function zc(s){s>>>=0,g?postMessage({cmd:"cleanupThread",thread:s}):Go(Ze[s])}function Oc(s){}var En=(s,p)=>{var f=Sn[s];if(f===void 0)throw s=Ni(s),f=Xe(s),Je(s),new pt(`${p} has unknown type ${f}`);return f},hi=(s,p,f)=>{var y=[];return s=s.toWireType(y,f),y.length&&(a()[p>>>2>>>0]=He(y)),s};function Dc(s,p,f){return p>>>=0,f>>>=0,s=Ge(s>>>0),p=En(p,"emval::as"),hi(p,f,s)}var ar=s=>{try{s()}catch(p){lt(p)}},ft=0,Qe=null,gi=0,sr=[],bi={},yi={},Bc=0,Pn=null,Rc=[];function wi(s){return function(p){if(!he){if(ft===0){var f=!1,y=!1;p((_=0)=>{if(!he&&(gi=_,f=!0,y)){ft=2,ar(()=>Yi(Qe)),typeof Browser<"u"&&Browser.Kb.Rb&&Browser.Kb.resume(),_=!1;try{var I=function(){var L=i()[Qe+8>>>2>>>0];return L=Y[yi[L]],--bt,L()}()}catch(L){I=L,_=!0}var O=!1;if(!Qe){var B=Pn;B&&(Pn=null,(_?B.reject:B.resolve)(I),O=!0)}if(_&&!O)throw I}}),y=!0,f||(ft=1,Qe=function(){var _=mr(65548),I=_+12;a()[_>>>2>>>0]=I,a()[_+4>>>2>>>0]=I+65536,I=sr[0];var O=bi[I];return O===void 0&&(O=Bc++,bi[I]=O,yi[O]=I),I=O,i()[_+8>>>2>>>0]=I,_}(),typeof Browser<"u"&&Browser.Kb.Rb&&Browser.Kb.pause(),ar(()=>ji(Qe)))}else ft===2?(ft=0,ar(Zi),Je(Qe),Qe=null,Rc.forEach(fi)):lt(`invalid state: ${ft}`);return gi}}(p=>{s().then(p)})}function Mc(s){return s>>>=0,wi(()=>(s=Ge(s)).then(He))}var ur=[];function Uc(s,p,f,y){return f>>>=0,y>>>=0,(s=ur[s>>>0])(null,p=Ge(p>>>0),f,y)}var Vc={},dr=s=>{var p=Vc[s];return p===void 0?Xe(s):p};function Nc(s,p,f,y,_){return f>>>=0,y>>>=0,_>>>=0,(s=ur[s>>>0])(p=Ge(p>>>0),p[f=dr(f)],y,_)}var _i=()=>typeof globalThis=="object"?globalThis:Function("return this")();function Wc(s){return(s>>>=0)==0?He(_i()):(s=dr(s),He(_i()[s]))}var Lc=s=>{var p=ur.length;return ur.push(s),p},Gc=(s,p)=>{for(var f=Array(s),y=0;y<s;++y)f[y]=En(a()[p+4*y>>>2>>>0],"parameter "+y);return f},vi=(s,p)=>Object.defineProperty(p,"name",{value:s});function Hc(s,p,f){var y=(p=Gc(s,p>>>0)).shift();s--;var _=`return function (obj, func, destructorsRef, args) {
`,I=0,O=[];f===0&&O.push("obj");for(var B=["retType"],L=[y],F=0;F<s;++F)O.push("arg"+F),B.push("argType"+F),L.push(p[F]),_+=`  var arg${F} = argType${F}.readValueFromPointer(args${I?"+"+I:""});
`,I+=p[F].argPackAdvance;return _+=`  var rv = ${f===1?"new func":"func.call"}(${O.join(", ")});
`,y.Tb||(B.push("emval_returnValue"),L.push(hi),_+=`  return emval_returnValue(retType, destructorsRef, rv);
`),B.push(_+`};
`),s=function(Z){var me=Function;if(!(me instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof me} which is not a function`);var _e=vi(me.name||"unknownFunctionName",function(){});return _e.prototype=me.prototype,_e=new _e,(Z=me.apply(_e,Z))instanceof Object?Z:_e}(B)(...L),f=`methodCaller<(${p.map(Z=>Z.name).join(", ")}) => ${y.name}>`,Lc(vi(f,s))}function Fc(s){return s=dr(s>>>0),He(u[s])}function qc(s,p){return p>>>=0,s=Ge(s>>>0),p=Ge(p),He(s[p])}function jc(s){9<(s>>>=0)&&(st[s+1]+=1)}function Kc(){return He([])}function Yc(s){s=Ge(s>>>0);for(var p=Array(s.length),f=0;f<s.length;f++)p[f]=s[f];return He(p)}function Zc(s){return He(dr(s>>>0))}function Xc(){return He({})}function Qc(s){for(var p=Ge(s>>>=0);p.length;){var f=p.pop();p.pop()(f)}In(s)}function Jc(s,p,f){p>>>=0,f>>>=0,s=Ge(s>>>0),p=Ge(p),f=Ge(f),s[p]=f}function ep(s,p){return p>>>=0,s=(s=En(s>>>0,"_emval_take_value")).readValueFromPointer(p),He(s)}function tp(s,p){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),p>>>=0,s=new Date(1e3*s),i()[p>>>2>>>0]=s.getUTCSeconds(),i()[p+4>>>2>>>0]=s.getUTCMinutes(),i()[p+8>>>2>>>0]=s.getUTCHours(),i()[p+12>>>2>>>0]=s.getUTCDate(),i()[p+16>>>2>>>0]=s.getUTCMonth(),i()[p+20>>>2>>>0]=s.getUTCFullYear()-1900,i()[p+24>>>2>>>0]=s.getUTCDay(),s=(s.getTime()-Date.UTC(s.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,i()[p+28>>>2>>>0]=s}var Et=s=>s%4==0&&(s%100!=0||s%400==0),$i=[0,31,60,91,121,152,182,213,244,274,305,335],xi=[0,31,59,90,120,151,181,212,243,273,304,334];function rp(s,p){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),p>>>=0,s=new Date(1e3*s),i()[p>>>2>>>0]=s.getSeconds(),i()[p+4>>>2>>>0]=s.getMinutes(),i()[p+8>>>2>>>0]=s.getHours(),i()[p+12>>>2>>>0]=s.getDate(),i()[p+16>>>2>>>0]=s.getMonth(),i()[p+20>>>2>>>0]=s.getFullYear()-1900,i()[p+24>>>2>>>0]=s.getDay();var f=(Et(s.getFullYear())?$i:xi)[s.getMonth()]+s.getDate()-1|0;i()[p+28>>>2>>>0]=f,i()[p+36>>>2>>>0]=-60*s.getTimezoneOffset(),f=new Date(s.getFullYear(),6,1).getTimezoneOffset();var y=new Date(s.getFullYear(),0,1).getTimezoneOffset();s=0|(f!=y&&s.getTimezoneOffset()==Math.min(y,f)),i()[p+32>>>2>>>0]=s}function np(s){s>>>=0;var p=new Date(i()[s+20>>>2>>>0]+1900,i()[s+16>>>2>>>0],i()[s+12>>>2>>>0],i()[s+8>>>2>>>0],i()[s+4>>>2>>>0],i()[s>>>2>>>0],0),f=i()[s+32>>>2>>>0],y=p.getTimezoneOffset(),_=new Date(p.getFullYear(),6,1).getTimezoneOffset(),I=new Date(p.getFullYear(),0,1).getTimezoneOffset(),O=Math.min(I,_);return 0>f?i()[s+32>>>2>>>0]=+(_!=I&&O==y):0<f!=(O==y)&&(_=Math.max(I,_),p.setTime(p.getTime()+6e4*((0<f?O:_)-y))),i()[s+24>>>2>>>0]=p.getDay(),f=(Et(p.getFullYear())?$i:xi)[p.getMonth()]+p.getDate()-1|0,i()[s+28>>>2>>>0]=f,i()[s>>>2>>>0]=p.getSeconds(),i()[s+4>>>2>>>0]=p.getMinutes(),i()[s+8>>>2>>>0]=p.getHours(),i()[s+12>>>2>>>0]=p.getDate(),i()[s+16>>>2>>>0]=p.getMonth(),i()[s+20>>>2>>>0]=p.getYear(),s=p.getTime(),BigInt(isNaN(s)?-1:s/1e3)}function Si(s,p,f,y,_,I,O){return g?Se(16,1,s,p,f,y,_,I,O):-52}function Ti(s,p,f,y,_,I){if(g)return Se(17,1,s,p,f,y,_,I)}function op(s,p,f,y){s>>>=0,p>>>=0,f>>>=0,y>>>=0;var _=new Date().getFullYear(),I=new Date(_,0,1),O=new Date(_,6,1);_=I.getTimezoneOffset();var B=O.getTimezoneOffset(),L=Math.max(_,B);a()[s>>>2>>>0]=60*L,i()[p>>>2>>>0]=+(_!=B),I=(s=F=>F.toLocaleTimeString(void 0,{hour12:!1,timeZoneName:"short"}).split(" ")[1])(I),O=s(O),B<_?(kt(I,f,17),kt(O,y,17)):(kt(I,y,17),kt(O,f,17))}var zn=[],Ii=(s,p)=>{zn.length=0;for(var f;f=r()[s++>>>0];){var y=f!=105;p+=(y&=f!=112)&&p%8?4:0,zn.push(f==112?a()[p>>>2>>>0]:f==106?H[p>>>3]:f==105?i()[p>>>2>>>0]:l()[p>>>3>>>0]),p+=y?8:4}return zn};function ip(s,p,f){return s>>>=0,p=Ii(p>>>0,f>>>0),bn[s](...p)}function ap(s,p,f){return s>>>=0,p=Ii(p>>>0,f>>>0),bn[s](...p)}var sp=()=>{},up=()=>Date.now();function dp(s,p){return K(Pe(s>>>0,p>>>0))}var Ci,lp=()=>{throw bt+=1,"unwind"};function cp(){return 4294901760}Ci=()=>performance.timeOrigin+performance.now();var pp=()=>navigator.hardwareConcurrency;function mp(){return lt("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function fp(s){s>>>=0;var p=r().length;if(s<=p||4294901760<s)return!1;for(var f=1;4>=f;f*=2){var y=p*(1+.2/f);y=Math.min(y,s+100663296);var _=Math;y=Math.max(s,y);e:{_=(_.min.call(_,4294901760,y+(65536-y%65536)%65536)-ue.buffer.byteLength+65535)/65536;try{ue.grow(_),ve();var I=1;break e}catch{}I=void 0}if(I)return!0}return!1}var lr=()=>(lt("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Pt={},Ai=s=>{s.forEach(p=>{var f=lr();f&&(Pt[f]=p)})};function hp(){var s=Error().stack.toString().split(`
`);return s[0]=="Error"&&s.shift(),Ai(s),Pt.Pb=lr(),Pt.ec=s,Pt.Pb}function gp(s,p,f){if(s>>>=0,p>>>=0,Pt.Pb==s)var y=Pt.ec;else(y=Error().stack.toString().split(`
`))[0]=="Error"&&y.shift(),Ai(y);for(var _=3;y[_]&&lr()!=s;)++_;for(s=0;s<f&&y[s+_];++s)i()[p+4*s>>>2>>>0]=lr();return s}var On,Dn={},ki=()=>{if(!On){var s,p={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:C||"./this.program"};for(s in Dn)Dn[s]===void 0?delete p[s]:p[s]=Dn[s];var f=[];for(s in p)f.push(`${s}=${p[s]}`);On=f}return On};function Ei(s,p){if(g)return Se(18,1,s,p);s>>>=0,p>>>=0;var f=0;return ki().forEach((y,_)=>{var I=p+f;for(_=a()[s+4*_>>>2>>>0]=I,I=0;I<y.length;++I)t()[_++>>>0]=y.charCodeAt(I);t()[_>>>0]=0,f+=y.length+1}),0}function Pi(s,p){if(g)return Se(19,1,s,p);s>>>=0,p>>>=0;var f=ki();a()[s>>>2>>>0]=f.length;var y=0;return f.forEach(_=>y+=_.length+1),a()[p>>>2>>>0]=y,0}function zi(s){return g?Se(20,1,s):52}function Oi(s,p,f,y){return g?Se(21,1,s,p,f,y):52}function Di(s,p,f,y){return g?Se(22,1,s,p,f,y):70}var bp=[null,[],[]];function Bi(s,p,f,y){if(g)return Se(23,1,s,p,f,y);p>>>=0,f>>>=0,y>>>=0;for(var _=0,I=0;I<f;I++){var O=a()[p>>>2>>>0],B=a()[p+4>>>2>>>0];p+=8;for(var L=0;L<B;L++){var F=r()[O+L>>>0],Z=bp[s];F===0||F===10?((s===1?q:K)(Zo(Z,0)),Z.length=0):Z.push(F)}_+=B}return a()[y>>>2>>>0]=_,0}var Ri=[31,29,31,30,31,30,31,31,30,31,30,31],Mi=[31,28,31,30,31,30,31,31,30,31,30,31],yp=(s,p)=>{t().set(s,p>>>0)};function Ui(s,p,f,y){function _(z,le,Te){for(z=typeof z=="number"?z.toString():z||"";z.length<le;)z=Te[0]+z;return z}function I(z,le){return _(z,le,"0")}function O(z,le){function Te(Qi){return 0>Qi?-1:0<Qi?1:0}var wt;return(wt=Te(z.getFullYear()-le.getFullYear()))===0&&(wt=Te(z.getMonth()-le.getMonth()))===0&&(wt=Te(z.getDate()-le.getDate())),wt}function B(z){switch(z.getDay()){case 0:return new Date(z.getFullYear()-1,11,29);case 1:return z;case 2:return new Date(z.getFullYear(),0,3);case 3:return new Date(z.getFullYear(),0,2);case 4:return new Date(z.getFullYear(),0,1);case 5:return new Date(z.getFullYear()-1,11,31);case 6:return new Date(z.getFullYear()-1,11,30)}}function L(z){var le=z.Bb;for(z=new Date(new Date(z.Cb+1900,0,1).getTime());0<le;){var Te=z.getMonth(),wt=(Et(z.getFullYear())?Ri:Mi)[Te];if(!(le>wt-z.getDate())){z.setDate(z.getDate()+le);break}le-=wt-z.getDate()+1,z.setDate(1),11>Te?z.setMonth(Te+1):(z.setMonth(0),z.setFullYear(z.getFullYear()+1))}return Te=new Date(z.getFullYear()+1,0,4),le=B(new Date(z.getFullYear(),0,4)),Te=B(Te),0>=O(le,z)?0>=O(Te,z)?z.getFullYear()+1:z.getFullYear():z.getFullYear()-1}s>>>=0,p>>>=0,f>>>=0,y>>>=0;var F=a()[y+40>>>2>>>0];for(var Z in y={kc:i()[y>>>2>>>0],jc:i()[y+4>>>2>>>0],Hb:i()[y+8>>>2>>>0],Lb:i()[y+12>>>2>>>0],Ib:i()[y+16>>>2>>>0],Cb:i()[y+20>>>2>>>0],ub:i()[y+24>>>2>>>0],Bb:i()[y+28>>>2>>>0],sc:i()[y+32>>>2>>>0],ic:i()[y+36>>>2>>>0],lc:F?Pe(F):""},f=Pe(f),F={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"})f=f.replace(new RegExp(Z,"g"),F[Z]);var me="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),_e="January February March April May June July August September October November December".split(" ");for(Z in F={"%a":z=>me[z.ub].substring(0,3),"%A":z=>me[z.ub],"%b":z=>_e[z.Ib].substring(0,3),"%B":z=>_e[z.Ib],"%C":z=>I((z.Cb+1900)/100|0,2),"%d":z=>I(z.Lb,2),"%e":z=>_(z.Lb,2," "),"%g":z=>L(z).toString().substring(2),"%G":L,"%H":z=>I(z.Hb,2),"%I":z=>((z=z.Hb)==0?z=12:12<z&&(z-=12),I(z,2)),"%j":z=>{for(var le=0,Te=0;Te<=z.Ib-1;le+=(Et(z.Cb+1900)?Ri:Mi)[Te++]);return I(z.Lb+le,3)},"%m":z=>I(z.Ib+1,2),"%M":z=>I(z.jc,2),"%n":()=>`
`,"%p":z=>0<=z.Hb&&12>z.Hb?"AM":"PM","%S":z=>I(z.kc,2),"%t":()=>"	","%u":z=>z.ub||7,"%U":z=>I(Math.floor((z.Bb+7-z.ub)/7),2),"%V":z=>{var le=Math.floor((z.Bb+7-(z.ub+6)%7)/7);if(2>=(z.ub+371-z.Bb-2)%7&&le++,le)le==53&&((Te=(z.ub+371-z.Bb)%7)==4||Te==3&&Et(z.Cb)||(le=1));else{le=52;var Te=(z.ub+7-z.Bb-1)%7;(Te==4||Te==5&&Et(z.Cb%400-1))&&le++}return I(le,2)},"%w":z=>z.ub,"%W":z=>I(Math.floor((z.Bb+7-(z.ub+6)%7)/7),2),"%y":z=>(z.Cb+1900).toString().substring(2),"%Y":z=>z.Cb+1900,"%z":z=>{var le=0<=(z=z.ic);return z=Math.abs(z)/60,(le?"+":"-")+("0000"+(z/60*100+z%60)).slice(-4)},"%Z":z=>z.lc,"%%":()=>"%"},f=f.replace(/%%/g,"\0\0"),F)f.includes(Z)&&(f=f.replace(new RegExp(Z,"g"),F[Z](y)));return Z=function(z){var le=Array($n(z)+1);return Jo(z,le,0,le.length),le}(f=f.replace(/\0\0/g,"%")),Z.length>p?0:(yp(Z,s),Z.length-1)}function wp(s,p,f,y){return Ui(s>>>0,p>>>0,f>>>0,y>>>0)}g||function(){for(var s=u.numThreads-1;s--;)qo();Ye.unshift(()=>{Nt++,function(p){g?p():Promise.all(ct.map(Fo)).then(p)}(()=>Do())})}();for(var Vi=Array(256),cr=0;256>cr;++cr)Vi[cr]=String.fromCharCode(cr);ci=Vi,pt=u.BindingError=class extends Error{constructor(s){super(s),this.name="BindingError"}},u.InternalError=class extends Error{constructor(s){super(s),this.name="InternalError"}},st.push(0,1,void 0,1,null,1,!0,1,!1,1),u.count_emval_handles=()=>st.length/2-5-Tn.length;var _p=[_n,Wo,jo,Xo,Qo,ei,ti,ri,ni,oi,ii,ai,si,ui,di,li,Si,Ti,Ei,Pi,zi,Oi,Di,Bi],Y=function(){function s(f,y){return Y=f.exports,Y=function(){var _=Y,I={};for(let[O,B]of Object.entries(_))I[O]=typeof B=="function"?(...L)=>{sr.push(O);try{return B(...L)}finally{he||(sr.pop(),Qe&&ft===1&&sr.length===0&&(ft=0,bt+=1,ar(Ki),typeof Fibers<"u"&&Fibers.tc()))}}:B;return I}(),Y=function(){var _=Y,I=B=>L=>B(L)>>>0,O=B=>()=>B()>>>0;return(_=Object.assign({},_)).Ca=I(_.Ca),_.fb=O(_.fb),_.hb=I(_.hb),_.emscripten_main_runtime_thread_id=O(_.emscripten_main_runtime_thread_id),_.sb=I(_.sb),_.tb=O(_.tb),_}(),Lo.push(Y.ib),Vt.unshift(Y.Ba),ee=y,Do(),Y}var p=Vo();if(Nt++,u.instantiateWasm)try{return u.instantiateWasm(p,s)}catch(f){K(`Module.instantiateWasm callback failed with error: ${f}`),m(f)}return gn||=u.locateFile?Bo("ort-wasm-simd-threaded.jsep.wasm")?"ort-wasm-simd-threaded.jsep.wasm":u.locateFile?u.locateFile("ort-wasm-simd-threaded.jsep.wasm",P):P+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,function(f,y){var _=gn;return D||typeof WebAssembly.instantiateStreaming!="function"||Bo(_)||Ro(_)||typeof fetch!="function"?Uo(_,f,y):fetch(_,{credentials:"same-origin"}).then(I=>WebAssembly.instantiateStreaming(I,f).then(y,function(O){return K(`wasm streaming compile failed: ${O}`),K("falling back to ArrayBuffer instantiation"),Uo(_,f,y)}))}(p,function(f){s(f.instance,f.module)}).catch(m),{}}(),Ni=s=>(Ni=Y.Ca)(s),Wi=()=>(Wi=Y.Da)();u._OrtInit=(s,p)=>(u._OrtInit=Y.Ea)(s,p),u._OrtGetLastError=(s,p)=>(u._OrtGetLastError=Y.Fa)(s,p),u._OrtCreateSessionOptions=(s,p,f,y,_,I,O,B,L,F)=>(u._OrtCreateSessionOptions=Y.Ga)(s,p,f,y,_,I,O,B,L,F),u._OrtAppendExecutionProvider=(s,p)=>(u._OrtAppendExecutionProvider=Y.Ha)(s,p),u._OrtAddFreeDimensionOverride=(s,p,f)=>(u._OrtAddFreeDimensionOverride=Y.Ia)(s,p,f),u._OrtAddSessionConfigEntry=(s,p,f)=>(u._OrtAddSessionConfigEntry=Y.Ja)(s,p,f),u._OrtReleaseSessionOptions=s=>(u._OrtReleaseSessionOptions=Y.Ka)(s),u._OrtCreateSession=(s,p,f)=>(u._OrtCreateSession=Y.La)(s,p,f),u._OrtReleaseSession=s=>(u._OrtReleaseSession=Y.Ma)(s),u._OrtGetInputOutputCount=(s,p,f)=>(u._OrtGetInputOutputCount=Y.Na)(s,p,f),u._OrtGetInputName=(s,p)=>(u._OrtGetInputName=Y.Oa)(s,p),u._OrtGetOutputName=(s,p)=>(u._OrtGetOutputName=Y.Pa)(s,p),u._OrtFree=s=>(u._OrtFree=Y.Qa)(s),u._OrtCreateTensor=(s,p,f,y,_,I)=>(u._OrtCreateTensor=Y.Ra)(s,p,f,y,_,I),u._OrtGetTensorData=(s,p,f,y,_)=>(u._OrtGetTensorData=Y.Sa)(s,p,f,y,_),u._OrtReleaseTensor=s=>(u._OrtReleaseTensor=Y.Ta)(s),u._OrtCreateRunOptions=(s,p,f,y)=>(u._OrtCreateRunOptions=Y.Ua)(s,p,f,y),u._OrtAddRunConfigEntry=(s,p,f)=>(u._OrtAddRunConfigEntry=Y.Va)(s,p,f),u._OrtReleaseRunOptions=s=>(u._OrtReleaseRunOptions=Y.Wa)(s),u._OrtCreateBinding=s=>(u._OrtCreateBinding=Y.Xa)(s),u._OrtBindInput=(s,p,f)=>(u._OrtBindInput=Y.Ya)(s,p,f),u._OrtBindOutput=(s,p,f,y)=>(u._OrtBindOutput=Y.Za)(s,p,f,y),u._OrtClearBoundOutputs=s=>(u._OrtClearBoundOutputs=Y._a)(s),u._OrtReleaseBinding=s=>(u._OrtReleaseBinding=Y.$a)(s),u._OrtRunWithBinding=(s,p,f,y,_)=>(u._OrtRunWithBinding=Y.ab)(s,p,f,y,_),u._OrtRun=(s,p,f,y,_,I,O,B)=>(u._OrtRun=Y.bb)(s,p,f,y,_,I,O,B),u._OrtEndProfiling=s=>(u._OrtEndProfiling=Y.cb)(s),u._JsepOutput=(s,p,f)=>(u._JsepOutput=Y.db)(s,p,f),u._JsepGetNodeName=s=>(u._JsepGetNodeName=Y.eb)(s);var pr,zt=()=>(zt=Y.fb)(),Je=u._free=s=>(Je=u._free=Y.gb)(s),mr=u._malloc=s=>(mr=u._malloc=Y.hb)(s),Bn=(s,p,f,y,_,I)=>(Bn=Y.kb)(s,p,f,y,_,I),Li=()=>(Li=Y.lb)(),Gi=(s,p,f,y,_)=>(Gi=Y.mb)(s,p,f,y,_),Rn=s=>(Rn=Y.nb)(s),fr=s=>(fr=Y.ob)(s),Hi=()=>(Hi=Y.pb)(),Fi=(s,p)=>(Fi=Y.qb)(s,p),hr=s=>(hr=Y.rb)(s),Mn=s=>(Mn=Y.sb)(s),Un=()=>(Un=Y.tb)(),qi=u.dynCall_ii=(s,p)=>(qi=u.dynCall_ii=Y.vb)(s,p),ji=s=>(ji=Y.wb)(s),Ki=()=>(Ki=Y.xb)(),Yi=s=>(Yi=Y.yb)(s),Zi=()=>(Zi=Y.zb)();function Xi(){0<Nt||(g?(c(u),g||or(Vt),startWorker(u)):(or(Ye),0<Nt||pr||(pr=!0,u.calledRun=!0,he||(g||or(Vt),c(u),g||or(fn)))))}return u.___start_em_js=889122,u.___stop_em_js=889368,u.stackSave=()=>Un(),u.stackRestore=s=>hr(s),u.stackAlloc=s=>Mn(s),u.setValue=function(s,p,f="i8"){switch(f.endsWith("*")&&(f="*"),f){case"i1":case"i8":t()[s>>>0]=p;break;case"i16":n()[s>>>1>>>0]=p;break;case"i32":i()[s>>>2>>>0]=p;break;case"i64":H[s>>>3]=BigInt(p);break;case"float":d()[s>>>2>>>0]=p;break;case"double":l()[s>>>3>>>0]=p;break;case"*":a()[s>>>2>>>0]=p;break;default:lt(`invalid type for setValue: ${f}`)}},u.getValue=function(s,p="i8"){switch(p.endsWith("*")&&(p="*"),p){case"i1":case"i8":return t()[s>>>0];case"i16":return n()[s>>>1>>>0];case"i32":return i()[s>>>2>>>0];case"i64":return H[s>>>3];case"float":return d()[s>>>2>>>0];case"double":return l()[s>>>3>>>0];case"*":return a()[s>>>2>>>0];default:lt(`invalid type for getValue: ${p}`)}},u.UTF8ToString=Pe,u.stringToUTF8=kt,u.lengthBytesUTF8=$n,Wt=function s(){pr||Xi(),pr||(Wt=s)},Xi(),u.PTR_SIZE=4,h}),Ep=Oa;globalThis.self?.name==="em-pthread"&&Oa()});var Ot,Pp,zp,Op,Ra,Ma,Dp,Ua,Ht=M(()=>{"use strict";Tr();Ot=!1?void 0:import.meta.url??(typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0),Pp=!1||typeof location>"u"?void 0:location.origin,zp=(e,t)=>{try{let r=t??Ot;return(r?new URL(e,r):new URL(e)).origin===Pp}catch{return!1}},Op=async e=>{let r=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},Ra=(za(),gr(Pa)).default,Ma=async()=>{if(!Ot)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(zp(Ot))return[void 0,Ra()];let e=await Op(Ot);return[e,Ra(e)]},Dp=(Ba(),gr(Da)).default,Ua=async(e,t,r)=>[void 0,Dp]});var jn,Kn,Dr,Va,Bp,Rp,Ir,Ie,ht=M(()=>{"use strict";Ht();Kn=!1,Dr=!1,Va=!1,Bp=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Rp=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Ir=async e=>{if(Kn)return Promise.resolve();if(Dr)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Va)throw new Error("previous call to 'initializeWebAssembly()' failed.");Dr=!0;let t=e.initTimeout,r=e.numThreads;if(!Rp())throw new Error("WebAssembly SIMD is not supported in the current environment.");let n=Bp();r>1&&!n&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let o=e.wasmPaths,i=typeof o=="string"?o:void 0,a=o?.mjs,d=a?.href??a,l=o?.wasm,c=l?.href??l,m=e.wasmBinary,[u,h]=await Ua(d,i,r>1),w=!1,b=[];if(t>0&&b.push(new Promise(g=>{setTimeout(()=>{w=!0,g()},t)})),b.push(new Promise((g,$)=>{let x={numThreads:r};m?x.wasmBinary=m:(c||i)&&(x.locateFile=(v,S)=>c??(i??S)+v),h(x).then(v=>{Dr=!1,Kn=!0,jn=v,g(),u&&URL.revokeObjectURL(u)},v=>{Dr=!1,Va=!0,$(v)})})),await Promise.race(b),w)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Ie=()=>{if(Kn&&jn)return jn;throw new Error("WebAssembly is not initialized yet.")}});var Ae,qt,fe,Br=M(()=>{"use strict";ht();Ae=(e,t)=>{let r=Ie(),n=r.lengthBytesUTF8(e)+1,o=r._malloc(n);return r.stringToUTF8(e,o,n),t.push(o),o},qt=(e,t,r,n)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([o,i])=>{let a=t?t+o:o;if(typeof i=="object")qt(i,a+".",r,n);else if(typeof i=="string"||typeof i=="number")n(a,i.toString());else if(typeof i=="boolean")n(a,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},fe=e=>{let t=Ie(),r=t.stackSave();try{let n=t.PTR_SIZE,o=t.stackAlloc(2*n);t._OrtGetLastError(o,o+n);let i=Number(t.getValue(o,n===4?"i32":"i64")),a=t.getValue(o+n,"*"),d=a?t.UTF8ToString(a):"";throw new Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${d}`)}finally{t.stackRestore(r)}}});var Na,Wa=M(()=>{"use strict";ht();Br();Na=e=>{let t=Ie(),r=0,n=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let i=0;return e?.tag!==void 0&&(i=Ae(e.tag,n)),r=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),r===0&&fe("Can't create run options."),e?.extra!==void 0&&qt(e.extra,"",new WeakSet,(a,d)=>{let l=Ae(a,n),c=Ae(d,n);t._OrtAddRunConfigEntry(r,l,c)!==0&&fe(`Can't set a run config entry: ${a} - ${d}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseRunOptions(r),n.forEach(a=>t._free(a)),i}}});var Mp,Up,Vp,Np,La,Ga=M(()=>{"use strict";ht();Br();Mp=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Up=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Vp=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Np=(e,t,r)=>{for(let n of t){let o=typeof n=="string"?n:n.name;switch(o){case"webnn":if(o="WEBNN",typeof n!="string"){let d=n?.deviceType;if(d){let l=Ae("deviceType",r),c=Ae(d,r);Ie()._OrtAddSessionConfigEntry(e,l,c)!==0&&fe(`Can't set a session config entry: 'deviceType' - ${d}.`)}}break;case"webgpu":if(o="JS",typeof n!="string"){let a=n;if(a?.preferredLayout){if(a.preferredLayout!=="NCHW"&&a.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${a.preferredLayout}`);let d=Ae("preferredLayout",r),l=Ae(a.preferredLayout,r);Ie()._OrtAddSessionConfigEntry(e,d,l)!==0&&fe(`Can't set a session config entry: 'preferredLayout' - ${a.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let i=Ae(o,r);Ie()._OrtAppendExecutionProvider(e,i)!==0&&fe(`Can't append execution provider: ${o}.`)}},La=e=>{let t=Ie(),r=0,n=[],o=e||{};Vp(o);try{let i=Mp(o.graphOptimizationLevel??"all"),a=Up(o.executionMode??"sequential"),d=typeof o.logId=="string"?Ae(o.logId,n):0,l=o.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log serverity level is not valid: ${l}`);let c=o.logVerbosityLevel??0;if(!Number.isInteger(c)||c<0||c>4)throw new Error(`log verbosity level is not valid: ${c}`);let m=typeof o.optimizedModelFilePath=="string"?Ae(o.optimizedModelFilePath,n):0;if(r=t._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,a,!!o.enableProfiling,0,d,l,c,m),r===0&&fe("Can't create session options."),o.executionProviders&&Np(r,o.executionProviders,n),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let u=Ae("enableGraphCapture",n),h=Ae(o.enableGraphCapture.toString(),n);t._OrtAddSessionConfigEntry(r,u,h)!==0&&fe(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[u,h]of Object.entries(o.freeDimensionOverrides)){if(typeof u!="string")throw new Error(`free dimension override name must be a string: ${u}`);if(typeof h!="number"||!Number.isInteger(h)||h<0)throw new Error(`free dimension override value must be a non-negative integer: ${h}`);let w=Ae(u,n);t._OrtAddFreeDimensionOverride(r,w,h)!==0&&fe(`Can't set a free dimension override: ${u} - ${h}.`)}return o.extra!==void 0&&qt(o.extra,"",new WeakSet,(u,h)=>{let w=Ae(u,n),b=Ae(h,n);t._OrtAddSessionConfigEntry(r,w,b)!==0&&fe(`Can't set a session config entry: ${u} - ${h}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&fe("Can't release session options."),n.forEach(a=>t._free(a)),i}}});var jt,gt,xt,Rr,Kt,Mr,Ur,Yn,te=M(()=>{"use strict";jt=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},gt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},xt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],n=typeof t=="number"?t:t.reduce((o,i)=>o*i,1);return r>0?Math.ceil(n*r):void 0},Rr=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Kt=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Mr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Ur=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool",Yn=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}});var Yt,Zn=M(()=>{"use strict";Tr();Yt=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=Nn("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=Nn("node:fs"),n=r(e),o=[];for await(let i of n)o.push(i);return new Uint8Array(Buffer.concat(o))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let o=t.body.getReader(),i;try{i=new ArrayBuffer(n)}catch(d){if(d instanceof RangeError){let l=Math.ceil(n/65536);i=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw d}let a=0;for(;;){let{done:d,value:l}=await o.read();if(d)break;let c=l.byteLength;new Uint8Array(i,a,c).set(l),a+=c}return new Uint8Array(i,0,n)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var Wp,Lp,Ha,Fa,Vr,Gp,de,je=M(()=>{"use strict";te();Wp=["V","I","W","E","F"],Lp=(e,t)=>{console.log(`[${Wp[e]},${new Date().toISOString()}]${t}`)},Vr=(e,t)=>{Ha=e,Fa=t},Gp=(e,t)=>{let r=Kt(e),n=Kt(Ha);r>=n&&Lp(r,typeof t=="function"?t():t)},de=(...e)=>{Fa&&Gp(...e)}});var Nr,Xn=M(()=>{"use strict";te();Nr=(e,t)=>new(Rr(t))(e)});var Wr=M(()=>{"use strict"});var qa,Qn,Jn,Hp,Fp,ja,to,eo,Ya,Za=M(()=>{"use strict";je();Wr();qa=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Qn=[],Jn=e=>Math.ceil(Number(e)/16)*16,Hp=e=>{for(let t=0;t<Qn.length;t++){let r=Qn[t];if(e<=r)return r}return Math.ceil(e/16)*16},Fp=1,ja=()=>Fp++,to=async(e,t,r,n)=>{let o=Jn(r),i=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=e.getCommandEncoder();e.endComputePass(),a.copyBufferToBuffer(t,0,i,0,o),e.flush(),await i.mapAsync(GPUMapMode.READ);let d=i.getMappedRange();if(n){let l=n();return l.set(new Uint8Array(d,0,r)),l}else return new Uint8Array(d.slice(0,r))}finally{i.destroy()}},eo=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersForUploadingPending=[],this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[r]of qa)Qn.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(t,r){let n=r.buffer,o=r.byteOffset,i=r.byteLength,a=Jn(i),d=this.storageCache.get(t);if(!d)throw new Error("gpu data for uploading does not exist");if(Number(d.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${d.originalSize}, data size=${i}`);let l=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),c=l.getMappedRange();new Uint8Array(c).set(new Uint8Array(n,o,i)),l.unmap();let m=this.backend.getCommandEncoder();this.backend.endComputePass(),m.copyBufferToBuffer(l,0,d.gpuData.buffer,0,a),de("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`),this.buffersForUploadingPending.push(l)}memcpy(t,r){let n=this.storageCache.get(t);if(!n)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=Jn(n.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(n.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(t,r,n){let o;if(n){if(o=n[0],t===n[1])return de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=ja();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:t},originalSize:r}),de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(t){t!==void 0&&(this.storageCache.delete(t),de("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(t,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=Hp(t),o,i=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let c=(i?this.freeBuffers:this.freeUniformBuffers).get(n);c?c.length>0?o=c.pop():o=this.backend.device.createBuffer({size:n,usage:r}):o=this.backend.device.createBuffer({size:n,usage:r})}else o=this.backend.device.createBuffer({size:n,usage:r});let d={id:ja(),type:0,buffer:o};return this.storageCache.set(d.id,{gpuData:d,originalSize:Number(t)}),de("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${d.id}`),d}get(t){return this.storageCache.get(t)?.gpuData}release(t){let r=typeof t=="bigint"?Number(t):t,n=this.storageCache.get(r);if(!n){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return de("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(t,r){let n=this.storageCache.get(Number(t));if(!n)throw new Error("data does not exist");await to(this.backend,n.gpuData.buffer,n.originalSize,r)}refreshPendingBuffers(){for(let t of this.buffersForUploadingPending)t.destroy();if(this.buffersForUploadingPending=[],this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let r=qa.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let r of this.buffersPending)t.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(t){let r=this.capturedPendingBuffers.get(t);r&&(r.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(t)),this.sessionCount-=1,this.sessionCount===0&&(de("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(n=>{n.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Ya=(...e)=>new eo(...e)});var ro,re,Ce=M(()=>{"use strict";ro=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},re=e=>new ro(e)});var no,et,k,St,Lr,Xa,Qa,ae=M(()=>{"use strict";no=class{static calcMatMulShape(t,r){return t[1]!==r[0]?void 0:[t[0],r[1]]}},et=class{static calcShape(t,r,n=!1){let o=t.length,i=r.length;if(o===0)return r;if(i===0)return t;let a=Math.max(t.length,r.length),d=new Array(a);if(n){if(o<2||i<2)return;let l=no.calcMatMulShape([t[o-2],t[o-1]],[r[i-2],r[i-1]]);if(l===void 0)return;[d[a-2],d[a-1]]=l}for(let l=n?3:1;l<=a;l++){let c=o-l<0?1:t[o-l],m=i-l<0?1:r[i-l];if(c!==m&&c>1&&m>1)return;let u=Math.max(c,m);if(c&&m)d[a-l]=Math.max(c,m);else{if(u>1)return;d[a-l]=0}}return d}static isValidBroadcast(t,r){let n=t.length,o=r.length;if(n>o)return!1;for(let i=1;i<=n;i++)if(t[n-i]!==1&&t[n-i]!==r[o-i])return!1;return!0}},k=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let n=t.length;if(n===0)return[];let o=new Array(n),i=n-1;for(;i>=0;){if(t[i]%r===0){o[i]=t[i]/r;break}if(r%t[i]!==0)throw new Error("cannot convert shape");o[i]=1,r/=t[i],i--}for(i--;i>=0;i--)o[i]=t[i];return o}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,n){let o=1;for(let i=r;i<n;i++){if(t[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(t[i])}return o}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let n=new Array(r);n[r-1]=1,n[r-2]=t[r-1];for(let o=r-3;o>=0;--o)n[o]=n[o+1]*t[o+1];return n}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(n=>this.normalizeAxis(n,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(n=>t[n]):t.slice().reverse()}static padShape(t,r){let n=t.length;return t.map((o,i)=>o+r[i]+r[i+n])}static areEqual(t,r){return t.length!==r.length?!1:t.every((n,o)=>n===r[o])}},St=class e{static adjustPoolAttributes(t,r,n,o,i,a){if(!t&&n.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let d=0;d<r.length-2;d++)d>=n.length?n.push(r[d+2]):n[d]=r[d+2];for(let d=0;d<n.length;d++)if(d<o.length){if(o[d]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let d=0;d<n.length;d++)if(d<i.length){if(i[d]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let d=0;d<n.length*2;d++)if(d<a.length){if(a[d]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let d=0;d<n.length;d++){if(n[d]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[d]>=n[d]||a[d+n.length]>=n[d])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,o,i,a,d){if(d){if(i.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)e.adjustPadAndReturnShape(t[l+(a?1:2)],r[l],n[l],o[l],i,l,l+t.length-2,d)}}static computePoolOutputShape(t,r,n,o,i,a,d){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let l=[r[0],r[1]];return e.computeShapeHelper(t,r,l,n,o,i,a,d),l}static computeConvOutputShape(t,r,n,o,i,a,d){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],r[0]];return e.computeShapeHelper(!1,t,l,n,o,i,a,d),l}static computeShapeHelper(t,r,n,o,i,a,d,l){if(t)for(let c=0;c<r.length-2;c++)n.push(1);else for(let c=0;c<r.length-2;c++)n.push(e.adjustPadAndReturnShape(r[c+2],o[c],i[c],a[c],d,c,c+r.length-2,l))}static adjustPadAndReturnShape(t,r,n,o,i,a,d,l){let c=n*(o-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return i[a]=0,i[d]=0,Math.floor((t-c)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(n!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let u=((t+r-1)/r-1)*r+o-t;return i[a]=Math.floor(l==="SAME_LOWER"?(u+1)/2:u/2),i[d]=u-i[a],Math.floor((t+u-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+i[a]+i[d]-c)/r+1)}},Lr=class{static getShapeOfGemmResult(t,r,n,o,i){if(t.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let a,d,l;r?(a=t[1],d=t[0]):(a=t[0],d=t[1]);let c=-1;if(o?(l=n[0],c=1):(l=n[1],c=0),n[c]!==d)throw new Error("dimension mismatch");if(a<=0||l<=0||d<=0)throw new Error("invalid shape specified");if(i&&!et.isValidBroadcast(i,[a,l]))throw new Error("gemm: invalid bias shape for broadcast");return[a,l,d]}},Xa=-34028234663852886e22,Qa=34028234663852886e22});var Tt,io,ge,ke,V,$e,ao,It,Ke,j,so,E,R,Gr,oo,Ja,Bt,se=M(()=>{"use strict";te();ae();Tt=64,io=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},ge=(e,t=1)=>{let r=io(e,t);return typeof r=="string"?r:r[0]},ke=(e,t=1)=>{let r=io(e,t);return typeof r=="string"?r:r[1]},V=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:k.computeStrides(r)})}),t},$e=e=>e%4===0?4:e%2===0?2:1,ao=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,It=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,Ke=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,j=(e,t,r,n)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?n==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:n==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,so=(e,t,r,n,o)=>{let i=typeof r=="number",a=i?r:r.length,d=[...new Array(a).keys()],l=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,c=io(t,o),m=typeof c=="string"?c:c[1],u=typeof c=="string"?c:c[0],h={indices:l,value:m,storage:u,tensor:t},w=U=>typeof U=="string"?U:`${U}u`,b={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},g=i?"uniforms.":"",$=`${g}${e}_shape`,x=`${g}${e}_strides`,v="";for(let U=0;U<a-1;U++)v+=`
    let dim${U} = current / ${j(x,U,a)};
    let rest${U} = current % ${j(x,U,a)};
    indices[${U}] = dim${U};
    current = rest${U};
    `;v+=`indices[${a-1}] = current;`;let S=a<2?"":`
  fn o2i_${e}(offset: u32) -> ${h.indices} {
    var indices: ${h.indices};
    var current = offset;
    ${v}
    return indices;
  }`,T=U=>(b.offsetToIndices=!0,a<2?U:`o2i_${e}(${U})`),C=[];if(a>=2)for(let U=a-1;U>=0;U--)C.push(`${j(x,U,a)} * (indices[${U}])`);let A=a<2?"":`
  fn i2o_${e}(indices: ${h.indices}) -> u32 {
    return ${C.join("+")};
  }`,P=U=>(b.indicesToOffset=!0,a<2?U:`i2o_${e}(${U})`),D=(...U)=>a===0?"0u":`${h.indices}(${U.map(w).join(",")})`,N=(U,H)=>a<2?`${U}`:`${j(U,H,a)}`,G=(U,H,pe)=>a<2?`${U}=${pe};`:`${j(U,H,a)}=${pe};`,q={},K=(U,H)=>{b.broadcastedIndicesToOffset=!0;let pe=`${H.name}broadcastedIndicesTo${e}Offset`;if(pe in q)return`${pe}(${U})`;let Oe=[];for(let he=a-1;he>=0;he--){let ve=H.indicesGet("outputIndices",he+H.rank-a);Oe.push(`${N(x,he)} * (${ve} % ${N($,he)})`)}return q[pe]=`fn ${pe}(outputIndices: ${H.type.indices}) -> u32 {
             return ${Oe.length>0?Oe.join("+"):"0u"};
           }`,`${pe}(${U})`},W=(U,H)=>(()=>{if(h.storage===h.value)return`${e}[${U}]=${H};`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`${e}[${U}]=vec2<u32>(u32(${H}), select(0u, 0xFFFFFFFFu, ${H} < 0));`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`${e}[${U}]=vec2<u32>(u32(${H}), 0u);`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`${e}[${U}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${H}));`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),J=U=>(()=>{if(h.storage===h.value)return`${e}[${U}]`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`i32(${e}[${U}].x)`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`u32(${e}[${U}].x)`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${U}] & 0xFFu), bool(${e}[${U}] & 0xFF00u), bool(${e}[${U}] & 0xFF0000u), bool(${e}[${U}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),ue=a<2?"":`
  fn get_${e}ByIndices(indices: ${h.indices}) -> ${m} {
    return ${J(`i2o_${e}(indices)`)};
  }`,ee=a<2?"":(()=>{let U=d.map(pe=>`d${pe}: u32`).join(", "),H=d.map(pe=>`d${pe}`).join(", ");return`
  fn get_${e}(${U}) -> ${m} {
    return get_${e}ByIndices(${D(H)});
  }`})(),oe=(...U)=>{if(U.length!==a)throw new Error(`indices length must be ${a}`);let H=U.map(w).join(",");return a===0?J("0u"):a===1?J(H[0]):(b.get=!0,b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}(${H})`)},X=U=>a<2?J(U):(b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}ByIndices(${U})`),Q=a<2?"":`
  fn set_${e}ByIndices(indices: ${h.indices}, value: ${m}) {
    ${W(`i2o_${e}(indices)`,"value")}
  }`,ye=a<2?"":(()=>{let U=d.map(pe=>`d${pe}: u32`).join(", "),H=d.map(pe=>`d${pe}`).join(", ");return`
  fn set_${e}(${U}, value: ${m}) {
    set_${e}ByIndices(${D(H)}, value);
  }`})();return{impl:()=>{let U=[],H=!1;return b.offsetToIndices&&(U.push(S),H=!0),b.indicesToOffset&&(U.push(A),H=!0),b.broadcastedIndicesToOffset&&(Object.values(q).forEach(pe=>U.push(pe)),H=!0),b.set&&(U.push(ye),H=!0),b.setByIndices&&(U.push(Q),H=!0),b.get&&(U.push(ee),H=!0),b.getByIndices&&(U.push(ue),H=!0),!i&&H&&U.unshift(`const ${$} = ${h.indices}(${r.join(",")});`,`const ${x} = ${h.indices}(${k.computeStrides(r).join(",")});`),U.join(`
`)},type:h,offsetToIndices:T,indicesToOffset:P,broadcastedIndicesToOffset:K,indices:D,indicesGet:N,indicesSet:G,set:(...U)=>{if(U.length!==a+1)throw new Error(`indices length must be ${a}`);let H=U[a];if(typeof H!="string")throw new Error("value must be string");let pe=U.slice(0,a).map(w).join(",");return a===0?W("0u",H):a===1?W(pe[0],H):(b.set=!0,b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}(${pe}, ${H})`)},setByOffset:W,setByIndices:(U,H)=>a<2?W(U,H):(b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}ByIndices(${U}, ${H});`),get:oe,getByOffset:J,getByIndices:X,usage:n,name:e,strides:x,shape:$,rank:a}},E=(e,t,r,n=1)=>so(e,t,r,"input",n),R=(e,t,r,n=1)=>so(e,t,r,"output",n),Gr=(e,t,r,n=1)=>so(e,t,r,"internal",n),oo=class{constructor(t,r){this.normalizedDispatchGroup=t;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=Tt){let r=typeof t=="number"?t:t[0],n=typeof t=="number"?1:t[1],o=typeof t=="number"?1:t[2];if(r>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*n*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
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
  `}appendVariableUniforms(t){t.rank!==0&&(t.shape.startsWith("uniforms.")&&this.uniforms.push({name:t.shape.replace("uniforms.",""),type:"u32",length:t.rank}),t.strides.startsWith("uniforms.")&&this.uniforms.push({name:t.strides.replace("uniforms.",""),type:"u32",length:t.rank}))}declareVariable(t,r){if(t.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(t),this.appendVariableUniforms(t);let n=t.usage==="input"?"read":"read_write",o=t.type.storage;return`@group(0) @binding(${r}) var<storage, ${n}> ${t.name}: array<${o}>;`}declareVariables(...t){return t.map(r=>this.declareVariable(r,this.variableIndex++)).join(`
`)}registerInternalVariable(t){if(t.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(t),this.appendVariableUniforms(t)}registerInternalVariables(...t){return t.forEach(r=>this.registerInternalVariable(r)),this}registerUniform(t,r,n=1){return this.uniforms.push({name:t,type:r,length:n}),this}registerUniforms(t){return this.uniforms=this.uniforms.concat(t),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let t=[];for(let{name:r,type:n,length:o}of this.uniforms)if(o&&o>4)n==="f16"?t.push(`@align(16) ${r}:array<mat2x4<${n}>, ${Math.ceil(o/8)}>`):t.push(`${r}:array<vec4<${n}>, ${Math.ceil(o/4)}>`);else{let i=o==null||o===1?n:`vec${o}<${n}>`;t.push(`${r}:${i}`)}return`
      struct Uniforms { ${t.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(t=>t.impl()).join(`
`)+this.internalVariables.map(t=>t.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[t(r.type),r.length??1])}},Ja=(e,t)=>new oo(e,t),Bt=(e,t)=>{let r=e.length,n=[];for(let o=0;o<r;o++){let i=r-1-o,a=e[i]||1;(t[t.length-1-o]||1)>1&&a===1&&n.unshift(i)}return n}});var qp,es,jp,Kp,Yp,Ee,ts,rs,ut=M(()=>{"use strict";te();ae();Ce();se();qp=e=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.")},es=(e,t)=>t&&t.length!==e?[...new Array(e).keys()].reverse():t,jp=(e,t)=>k.sortBasedOnPerm(e,es(e.length,t)),Kp=(e,t,r,n)=>{let o=`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let i=0;i<t;++i)o+=r.indicesSet("a",e[i],`i[${i}]`);return o+="return a;}"},Yp=(e,t)=>{let r=[],n=[];for(let o=0;o<e.length;++o)e[o]!==1&&r.push(e[o]),e[t[o]]!==1&&n.push(t[o]);return{newShape:r,newPerm:n}},Ee=(e,t)=>{let r=e.dataType,n=e.dims.length,o=es(n,t),i=jp(e.dims,o),{newShape:a,newPerm:d}=Yp(e.dims,o),l=k.areEqual(d,[2,3,1]),c=k.areEqual(d,[3,1,2]),m=a.length===2&&d[0]>d[1]||l||c,u=m?a:e.dims,h=i;m&&(u=l?[a[0],a[1]*a[2]]:c?[a[0]*a[1],a[2]]:a,h=[u[1],u[0]]);let w=E("a",r,u.length),b=R("output",r,h.length),g=16,$;return m?$=x=>`
  ${x.registerUniform("output_size","u32").declareVariables(w,b)}
  var<workgroup> tile : array<array<${b.type.value}, ${g+1}>, ${g}>;
  ${x.mainStart([g,g,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${g} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${g}u + local_id.x;
    let input_row = workgroup_id_x * ${g}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${w.getByIndices(`${w.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${g}u + local_id.x;
    let output_row = workgroup_id_y * ${g}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${b.setByIndices(`${b.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`:$=x=>`
  ${x.registerUniform("output_size","u32").declareVariables(w,b)}

  ${Kp(o,n,w,b)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${b.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${b.setByOffset("global_idx",w.getByIndices("aIndices"))}
  }`,{name:m?"TransposeShared":"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let x=k.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:m?{x:Math.ceil(h[1]/g),y:Math.ceil(h[0]/g)}:{x:Math.ceil(x/64)},programUniforms:[{type:12,data:x},...V(u,h)]}},getShaderSource:$}},ts=(e,t)=>{qp(e.inputs),e.compute(Ee(e.inputs[0],t.perm))},rs=e=>re({perm:e.perm})});var Zp,Xp,Qp,Jp,em,tm,rm,nm,om,im,tt,ns,os,is,as,ss,us,ds,ls,cs,ps,ms=M(()=>{"use strict";te();ae();se();Hr();ut();Zp={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Xp={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Qp={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Jp={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},em=(e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r},tm=(e,t)=>{let r=[],n=e.length;for(let i=0;i<n;i++)t.indexOf(i)===-1&&r.push(e[i]);let o=t.map(i=>e[i]);return[r,o]},rm=(e,t)=>{let r=e.length+t.length,n=[],o=0;for(let i=0;i<r;i++)t.indexOf(i)===-1?n.push(e[o++]):n.push(1);return n},nm=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},om=(e,t)=>{let r=[];if(!nm(e,t)){for(let n=0;n<t;++n)e.indexOf(n)===-1&&r.push(n);e.forEach(n=>r.push(n))}return r},im=(e,t,r,n,o,i,a)=>{let d=r[0].dims,l=k.size(i),c=k.size(a),m=E("_A",r[0].dataType,d),u=R("output",o,i),h=32,w=`
          var<workgroup> aBestValues : array<f32, ${h}>;
       `;return{name:e,shaderCache:t,getShaderSource:g=>`
        ${g.registerUniform("reduceSize","u32").declareVariables(m,u)}
        ${w}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${g.mainStart(h)}

          let outputIndex = global_idx / ${h};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Qp[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${h}) {
           let candidate = f32(${m.getByOffset("offset + k")});
           bestValue = ${Zp[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${h}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Xp[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${u.setByOffset("outputIndex",`${n==="mean"?`${u.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${u.type.storage}(${Jp[n]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:l},programUniforms:[{type:12,data:c}]})}},tt=(e,t,r,n)=>{let o=e.inputs.length===1?r:uo(e.inputs,r),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=e.inputs[0].dims.map((w,b)=>b));let a=k.normalizeAxes(i,e.inputs[0].dims.length),d=a,l=e.inputs[0],c=om(d,e.inputs[0].dims.length);c.length>0&&(l=e.compute(Ee(e.inputs[0],c),{inputs:[0],outputs:[-1]})[0],d=em(d.length,l.dims.length));let[m,u]=tm(l.dims,d),h=m;o.keepDims&&(h=rm(m,a)),e.compute(im(t,{hint:o.cacheKey,inputDependencies:["type"]},[l],n,e.inputs[0].dataType,h,u),{inputs:[l]})},ns=(e,t)=>{tt(e,"ReduceMeanShared",t,"mean")},os=(e,t)=>{tt(e,"ReduceL1Shared",t,"l1")},is=(e,t)=>{tt(e,"ReduceL2Shared",t,"l2")},as=(e,t)=>{tt(e,"ReduceLogSumExpShared",t,"logSumExp")},ss=(e,t)=>{tt(e,"ReduceMaxShared",t,"max")},us=(e,t)=>{tt(e,"ReduceMinShared",t,"min")},ds=(e,t)=>{tt(e,"ReduceProdShared",t,"prod")},ls=(e,t)=>{tt(e,"ReduceSumShared",t,"sum")},cs=(e,t)=>{tt(e,"ReduceSumSquareShared",t,"sumSquare")},ps=(e,t)=>{tt(e,"ReduceLogSumShared",t,"logSum")}});var rt,am,Fr,uo,nt,sm,um,dm,lm,cm,pm,mm,fm,hm,gm,ot,fs,hs,gs,bs,ys,ws,_s,vs,$s,xs,Hr=M(()=>{"use strict";te();ae();Ce();se();ms();rt=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},am=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Fr=(e,t,r,n,o,i,a=!1,d=!1)=>{let l=[],c=r[0].dims,m=c.length,u=k.normalizeAxes(o,m),h=!d&&u.length===0;c.forEach(($,x)=>{h||u.indexOf(x)>=0?a&&l.push(1):l.push($)});let w=l.length,b=k.size(l);return{name:e,shaderCache:t,getShaderSource:$=>{let x=[],v=E("_A",r[0].dataType,m),S=R("output",i,w),T=n(v,S,u),C=T[2];for(let A=0,P=0;A<m;A++)h||u.indexOf(A)>=0?(a&&P++,C=`for(var j${A}: u32 = 0; j${A} < ${c[A]}; j${A}++) {
                  ${T[2].includes("last_index")?`let last_index = j${A};`:""}
                  ${v.indicesSet("input_indices",A,`j${A}`)}
                  ${C}
                }`):(x.push(`${v.indicesSet("input_indices",A,S.indicesGet("output_indices",P))};`),P++);return`

        ${$.registerUniform("output_size","u32").declareVariables(v,S)}

        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${S.offsetToIndices("global_idx")};

          ${x.join(`
`)}
          ${T[0]}       // init ops for reduce max/min
          ${T[1]}
          ${C}
          ${T[3]}
          ${T.length===4?S.setByOffset("global_idx","value"):T.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:i}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...V(c,l)]})}},uo=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),re({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},nt=(e,t,r,n)=>{let o=e.inputs,i=o.length===1?r:uo(o,r);e.compute(Fr(t,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?am:n,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},sm=(e,t)=>{rt(e.inputs),nt(e,"ReduceLogSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},um=(e,t)=>{rt(e.inputs),nt(e,"ReduceL1",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},dm=(e,t)=>{rt(e.inputs),nt(e,"ReduceL2",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},lm=(e,t)=>{rt(e.inputs),nt(e,"ReduceLogSumExp",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},cm=(e,t)=>{rt(e.inputs),nt(e,"ReduceMax",t,(n,o,i)=>{let a=[];for(let d=0;d<n.rank;d++)(i.indexOf(d)>=0||i.length===0)&&a.push(n.indicesSet("input_indices",d,0));return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},pm=(e,t)=>{rt(e.inputs),nt(e,"ReduceMean",t,(n,o,i)=>{let a=1;for(let d=0;d<n.rank;d++)(i.indexOf(d)>=0||i.length===0)&&(a*=e.inputs[0].dims[d]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${a});`]})},mm=(e,t)=>{rt(e.inputs),nt(e,"ReduceMin",t,(n,o,i)=>{let a=[];for(let d=0;d<n.rank;d++)(i.indexOf(d)>=0||i.length===0)&&a.push(`input_indices[${d}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},fm=(e,t)=>{rt(e.inputs),nt(e,"ReduceProd",t,(n,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},hm=(e,t)=>{rt(e.inputs),nt(e,"ReduceSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},gm=(e,t)=>{rt(e.inputs),nt(e,"ReduceSumSquare",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},ot=(e,t,r)=>{if(t.length===0)return r;let n=1,o=1;for(let i=0;i<t.length;i++)t.indexOf(i)===-1?n*=e[i]:o*=e[i];return o<32&&n>1024},fs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?pm(e,t):ns(e,t)},hs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?um(e,t):os(e,t)},gs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?dm(e,t):is(e,t)},bs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?lm(e,t):as(e,t)},ys=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?cm(e,t):ss(e,t)},ws=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?mm(e,t):us(e,t)},_s=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?fm(e,t):ds(e,t)},vs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?hm(e,t):ls(e,t)},$s=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?gm(e,t):cs(e,t)},xs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?sm(e,t):ps(e,t)}});var Ss,Ts,Is,lo,Cs=M(()=>{"use strict";te();Ce();Hr();Ss=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Ts=(e,t)=>{Ss(e.inputs);let r=(n,o,i)=>{let a=[];for(let d=0;d<n.rank;d++)(i.indexOf(d)>=0||i.length===0)&&a.push(`input_indices[${d}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Fr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Is=(e,t)=>{Ss(e.inputs);let r=(n,o,i)=>{let a=[];for(let d=0;d<n.rank;d++)(i.indexOf(d)>=0||i.length===0)&&a.push(`input_indices[${d}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Fr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},lo=e=>re(e)});var bm,co,ym,wm,_m,Rt,vm,As,qr=M(()=>{"use strict";te();ae();Wr();se();bm=(e,t)=>{let r=e[0],n=e[1],o=e[2],i=e[3],a=e[4],d=e[5];if(a&&d)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=r.dims[0],c=r.dims[1],m=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(n.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==m)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==n.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let u=o.dims[0]/3,h=u,w=h;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let S of t.qkvHiddenSizes)if(S%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");u=t.qkvHiddenSizes[0],h=t.qkvHiddenSizes[1],w=t.qkvHiddenSizes[2]}let b=c;if(u!==h)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==u+h+w)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let g=0;if(a){if(h!==w)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==h/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(g=a.dims[3])}let $=b+g,x=-1,v=0;if(i)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(d){if(d.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(d.dims[0]!==l||d.dims[1]!==t.numHeads||d.dims[2]!==c||d.dims[3]!==$)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:c,pastSequenceLength:g,kvSequenceLength:b,totalSequenceLength:$,maxSequenceLength:x,inputHiddenSize:m,hiddenSize:u,vHiddenSize:w,headSize:Math.floor(u/t.numHeads),vHeadSize:Math.floor(w/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},co=(e,t,r)=>t&&e?`
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
    `,ym=(e,t,r,n,o,i,a,d)=>{let l=$e(a?1:i),c=64,m=i/l;m<c&&(c=32);let u=Math.ceil(i/l/c),h=[{type:12,data:t},{type:12,data:r},{type:12,data:n},{type:12,data:o},{type:12,data:m},{type:12,data:u}],w=ge(e.dataType,l),b=ke(1,l),g=["type"];a&&g.push("type"),d&&g.push("type");let $=x=>{let v=R("x",e.dataType,e.dims,l),S=[v],T=a?E("seq_lens",a.dataType,a.dims):void 0;T&&S.push(T);let C=d?E("total_sequence_length_input",d.dataType,d.dims):void 0;C&&S.push(C);let A=ke(e.dataType),P=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${c}>;
  var<workgroup> thread_sum: array<f32, ${c}>;
  ${x.registerUniforms(P).declareVariables(...S)}
  ${x.mainStart([c,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${co(T,C,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${c}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${a?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${b}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${b}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${c}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${b}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${b}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${l}`)}})()};
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
        var f32input = ${b}(x[offset + i]);
        x[offset + i] = ${v.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${v.type.value}(${A}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${c};${w};${l}`,inputDependencies:g},getShaderSource:$,getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(i/c),y:o,z:t*r},programUniforms:h})}},wm=(e,t,r,n,o,i,a,d,l)=>{let c=a+i.kvSequenceLength,m=[i.batchSize,i.numHeads,i.sequenceLength,c],u=e>1&&n,h=i.kvNumHeads?i.kvNumHeads:i.numHeads,w=u?[i.batchSize,h,c,i.headSize]:void 0,b=i.nReps?i.nReps:1,g=i.scale===0?1/Math.sqrt(i.headSize):i.scale,$=$e(i.headSize),x=i.headSize/$,v=12,S={x:Math.ceil(c/v),y:Math.ceil(i.sequenceLength/v),z:i.batchSize*i.numHeads},T=[{type:12,data:i.sequenceLength},{type:12,data:x},{type:12,data:c},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:g},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:b}],C=u&&n&&k.size(n.dims)>0,A=["type","type"];C&&A.push("type"),o&&A.push("type"),d&&A.push("type"),l&&A.push("type");let P=[{dims:m,dataType:t.dataType,gpuDataType:0}];u&&P.push({dims:w,dataType:t.dataType,gpuDataType:0});let D=N=>{let G=E("q",t.dataType,t.dims,$),q=E("key",r.dataType,r.dims,$),K=[G,q];if(C){let Q=E("past_key",n.dataType,n.dims,$);K.push(Q)}o&&K.push(E("attention_bias",o.dataType,o.dims));let W=d?E("seq_lens",d.dataType,d.dims):void 0;W&&K.push(W);let J=l?E("total_sequence_length_input",l.dataType,l.dims):void 0;J&&K.push(J);let ue=R("output",t.dataType,m),ee=[ue];u&&ee.push(R("present_key",t.dataType,w,$));let oe=ke(1,$),X=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;

  var<workgroup> tileQ: array<${G.type.storage}, ${v*v}>;
  var<workgroup> tileK: array<${G.type.storage}, ${v*v}>;
  ${N.registerUniforms(X).declareVariables(...K,...ee)}
  ${N.mainStart([v,v,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${b===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${b===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${co(W,J,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${C&&u?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${u?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${oe}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${(()=>C&&u?`
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
          value += ${oe}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch($){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${$}`)}})()};
        output[outputIdx] = ${ue.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${$};${o!==void 0};${n!==void 0};${e}`,inputDependencies:A},getRunData:()=>({outputs:P,dispatchGroup:S,programUniforms:T}),getShaderSource:D}},_m=(e,t,r,n,o,i,a=void 0,d=void 0)=>{let l=i+o.kvSequenceLength,c=o.nReps?o.nReps:1,m=o.vHiddenSize*c,u=e>1&&n,h=o.kvNumHeads?o.kvNumHeads:o.numHeads,w=u?[o.batchSize,h,l,o.headSize]:void 0,b=[o.batchSize,o.sequenceLength,m],g=12,$={x:Math.ceil(o.vHeadSize/g),y:Math.ceil(o.sequenceLength/g),z:o.batchSize*o.numHeads},x=[{type:12,data:o.sequenceLength},{type:12,data:l},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:m},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:c}],v=u&&n&&k.size(n.dims)>0,S=["type","type"];v&&S.push("type"),a&&S.push("type"),d&&S.push("type");let T=[{dims:b,dataType:t.dataType,gpuDataType:0}];u&&T.push({dims:w,dataType:t.dataType,gpuDataType:0});let C=A=>{let P=E("probs",t.dataType,t.dims),D=E("v",r.dataType,r.dims),N=[P,D];v&&N.push(E("past_value",n.dataType,n.dims));let G=a?E("seq_lens",a.dataType,a.dims):void 0;a&&N.push(G);let q=d?E("total_sequence_length_input",d.dataType,d.dims):void 0;d&&N.push(q);let W=[R("output",t.dataType,b)];u&&W.push(R("present_value",t.dataType,w));let J=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${g}u;
  var<workgroup> tileQ: array<${P.type.value}, ${g*g}>;
  var<workgroup> tileV: array<${P.type.value}, ${g*g}>;
  ${A.registerUniforms(J).declareVariables(...N,...W)}
  ${A.mainStart([g,g,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${c===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${c===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${n!==void 0};${e}`,inputDependencies:S},getRunData:()=>({outputs:T,dispatchGroup:$,programUniforms:x}),getShaderSource:C}},Rt=(e,t,r,n,o,i,a,d,l,c,m=void 0,u=void 0)=>{let h=Math.min(e.outputCount,1+(a?1:0)+(d?1:0)),w=h>1?c.pastSequenceLength:0,b=w+c.kvSequenceLength,g=l&&k.size(l.dims)>0?l:void 0,$=[t,r];h>1&&a&&k.size(a.dims)>0&&$.push(a),g&&$.push(g),m&&$.push(m),u&&$.push(u);let x=e.compute(wm(h,t,r,a,g,c,w,m,u),{inputs:$,outputs:h>1?[-1,1]:[-1]})[0];e.compute(ym(x,c.batchSize,c.numHeads,w,c.sequenceLength,b,m,u),{inputs:m&&u?[x,m,u]:[x],outputs:[]});let v=[x,n];h>1&&d&&k.size(d.dims)>0&&v.push(d),m&&v.push(m),u&&v.push(u),e.compute(_m(h,x,n,d,c,w,m,u),{inputs:v,outputs:h>1?[0,2]:[0]})},vm=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],n=t.sequenceLength,o=t.inputHiddenSize,i=t.headSize,a=12,d={x:Math.ceil(t.headSize/a),y:Math.ceil(t.sequenceLength/a),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],c=[{type:12,data:n},{type:12,data:o},{type:12,data:i},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],m=u=>{let h=R("output_q",l[0].dataType,r),w=R("output_k",l[0].dataType,r),b=R("output_v",l[0].dataType,r),g=E("input",l[0].dataType,l[0].dims),$=E("weight",l[1].dataType,l[1].dims),x=E("bias",l[2].dataType,l[2].dims),v=g.type.storage,S=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${v}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${v}, ${a*a}>;
  var<workgroup> tileWeightK: array<${v}, ${a*a}>;
  var<workgroup> tileWeightV: array<${v}, ${a*a}>;
  ${u.registerUniforms(S).declareVariables(g,$,x,h,w,b)}
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:d,programUniforms:c}),getShaderSource:m},{inputs:l,outputs:[-1,-1,-1]})},As=(e,t)=>{let r=bm(e.inputs,t),[n,o,i]=vm(e,r);return Rt(e,n,o,i,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}});var $m,xm,Sm,ks,Es=M(()=>{"use strict";Fe();te();ae();Ce();se();$m=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(n,o,i)=>{let a=o.length;if(a!==n.length)throw new Error(`${i}: num dimensions != ${a}`);o.forEach((d,l)=>{if(d!==n[l])throw new Error(`${i}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let n=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},xm=(e,t)=>{let{epsilon:r,spatial:n,format:o}=t,i=e[0].dims,a=n?$e(i[i.length-1]):1,d=o==="NHWC"&&i.length>1?a:1,l=k.size(i)/a,c=n,m=c?i.length:i,u=E("x",e[0].dataType,e[0].dims,a),h=E("scale",e[1].dataType,e[1].dims,d),w=E("bias",e[2].dataType,e[2].dims,d),b=E("inputMean",e[3].dataType,e[3].dims,d),g=E("inputVar",e[4].dataType,e[4].dims,d),$=R("y",e[0].dataType,m,a),x=()=>{let S="";if(n)S=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${a}`:"outputIndices[1]"};`;else if(o==="NCHW")S=`
            ${$.indicesSet("outputIndices","0","0")}
            let cOffset = ${$.indicesToOffset("outputIndices")};`;else{S=`var cIndices = ${h.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let T=1;T<h.rank;T++)S+=`cIndices[${T}] = outputIndices[${T}];`;S+=`let cOffset = ${h.indicesToOffset("cIndices")};`}return S},v=S=>`
  const epsilon = ${r};
  ${S.registerUniform("outputSize","u32").declareVariables(u,h,w,b,g,$)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${$.offsetToIndices(`global_idx * ${a}`)};
    ${x()}
    let scale = ${h.getByOffset("cOffset")};
    let bias = ${w.getByOffset("cOffset")};
    let inputMean = ${b.getByOffset("cOffset")};
    let inputVar = ${g.getByOffset("cOffset")};
    let x = ${u.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${$.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${a}`,inputDependencies:c?["rank","type","type","type","type"]:void 0},getShaderSource:v,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c?[{type:12,data:l},...V(i)]:[{type:12,data:l}]})}},Sm=e=>re(e),ks=(e,t)=>{let{inputs:r,outputCount:n}=e,o=Sm({...t,outputCount:n});if(xe.webgpu.validateInputContent&&$m(r,o),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(xm(r,o))}});var Tm,Im,Ps,zs=M(()=>{"use strict";ae();se();Tm=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Im=e=>{let t=e[0].dims,r=e[0].dims[2],n=k.size(t)/4,o=e[0].dataType,i=E("input",o,t,4),a=E("bias",o,[r],4),d=E("residual",o,t,4),l=R("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:m=>`
  const channels = ${r}u / 4;
  ${m.declareVariables(i,a,d,l)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${i.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${d.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},Ps=e=>{Tm(e.inputs),e.compute(Im(e.inputs))}});var Cm,be,Os,Ds,Bs,Rs,Ms,Us,Vs,Ns,Ws,Am,Ls,Gs,Hs,Fs,Zt,qs,jr,js,Ks,Ys,Zs,Xs,Qs,Js,eu,tu,ru,nu,ou,iu,au,su,uu,du,lu,po,mo,cu,pu,mu,km,Em,fu,Kr=M(()=>{"use strict";te();ae();Ce();se();Cm=(e,t,r,n,o,i,a)=>{let d=Math.ceil(t/4),l="";typeof o=="string"?l=`${o}(a)`:l=o("a");let c=E("inputData",r,[d],4),m=R("outputData",n,[d],4),u=[{name:"vec_size",type:"u32"}];return a&&u.push(...a),`
      ${e.registerUniforms(u).declareVariables(c,m)}

  ${i??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${c.getByOffset("global_idx")};
    ${m.setByOffset("global_idx",l)}
  }`},be=(e,t,r,n,o,i=e.dataType,a,d)=>{let l=[{type:12,data:Math.ceil(k.size(e.dims)/4)}];return a&&l.push(...a),{name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:c=>Cm(c,k.size(e.dims),e.dataType,i,r,n,d),getRunData:c=>({outputs:[{dims:e.dims,dataType:i}],dispatchGroup:{x:Math.ceil(k.size(c[0].dims)/64/4)},programUniforms:l})}},Os=e=>{e.compute(be(e.inputs[0],"Abs","abs"))},Ds=e=>{e.compute(be(e.inputs[0],"Acos","acos"))},Bs=e=>{e.compute(be(e.inputs[0],"Acosh","acosh"))},Rs=e=>{e.compute(be(e.inputs[0],"Asin","asin"))},Ms=e=>{e.compute(be(e.inputs[0],"Asinh","asinh"))},Us=e=>{e.compute(be(e.inputs[0],"Atan","atan"))},Vs=e=>{e.compute(be(e.inputs[0],"Atanh","atanh"))},Ns=e=>re(e),Ws=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(be(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Am=e=>{let t,r,n=e.length>=2&&e[1].data!==0,o=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=n?e[1].getFloat32Array()[0]:-34028234663852886e22,r=o?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=n?e[1].getUint16Array()[0]:64511,r=o?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return re({min:t,max:r})},Ls=(e,t)=>{let r=t||Am(e.inputs),n=ke(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Clip",o=>`clamp(${o}, vec4<${n}>(uniforms.min), vec4<${n}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:n},{name:"max",type:n}]),{inputs:[0]})},Gs=e=>{e.compute(be(e.inputs[0],"Ceil","ceil"))},Hs=e=>{e.compute(be(e.inputs[0],"Cos","cos"))},Fs=e=>{e.compute(be(e.inputs[0],"Cosh","cosh"))},Zt=e=>re(e),qs=(e,t)=>{let r=ke(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Elu",n=>`elu_vf32(${n})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},jr=(e="f32")=>`
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
}`,js=e=>{let t=ke(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,jr(t)))},Ks=e=>{e.compute(be(e.inputs[0],"Exp","exp"))},Ys=e=>{e.compute(be(e.inputs[0],"Floor","floor"))},Zs=e=>{let t=ke(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,jr(t)))},Xs=(e,t)=>{let r=ke(e.inputs[0].dataType);e.compute(be(e.inputs[0],"LeakyRelu",n=>`select(leaky_relu_alpha_ * ${n}, ${n}, ${n} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},Qs=e=>{e.compute(be(e.inputs[0],"Not",t=>`!${t}`))},Js=e=>{e.compute(be(e.inputs[0],"Neg",t=>`-${t}`))},eu=e=>{e.compute(be(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},tu=e=>{let t=ke(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},ru=e=>{e.compute(be(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},nu=e=>re(e),ou=(e,t)=>{let r=ke(e.inputs[0].dataType);e.compute(be(e.inputs[0],"HardSigmoid",n=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${n} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},iu=e=>{e.compute(be(e.inputs[0],"Sin","sin"))},au=e=>{e.compute(be(e.inputs[0],"Sinh","sinh"))},su=e=>{e.compute(be(e.inputs[0],"Sqrt","sqrt"))},uu=e=>{e.compute(be(e.inputs[0],"Tan","tan"))},du=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,lu=e=>{e.compute(be(e.inputs[0],"Tanh",du))},po=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${du("v")};
}
`,mo=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,cu=e=>{let t=ke(e.inputs[0].dataType);e.compute(be(e.inputs[0],"FastGelu",mo,po(t),void 0,e.inputs[0].dataType))},pu=(e,t)=>{let r=ke(e.inputs[0].dataType);return e.compute(be(e.inputs[0],"ThresholdedRelu",n=>`select(vec4<${r}>(0.0), ${n}, ${n} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},mu=e=>{e.compute(be(e.inputs[0],"Log","log"))},km=(e,t)=>`
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
`,Em=e=>`quick_gelu_impl(${e})`,fu=(e,t)=>{let r=ke(e.inputs[0].dataType);e.compute(be(e.inputs[0],"QuickGelu",Em,km(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}});var Pm,zm,gu,bu=M(()=>{"use strict";ae();se();Kr();Pm=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},zm=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=E("input",e[0].dataType,e[0].dims,4),n=E("bias",e[0].dataType,[e[0].dims[2]],4),o=R("output",e[0].dataType,t,4),i=k.size(t)/4,a=ge(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:l=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${l.declareVariables(r,n,o)}

  ${jr(a)}

  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},gu=e=>{Pm(e.inputs),e.compute(zm(e.inputs))}});var Om,Dm,it,yu,wu,_u,vu,$u,xu,Su,Tu,Iu,Cu,Au=M(()=>{"use strict";te();ae();se();Om=(e,t,r,n,o,i,a,d,l,c,m,u)=>{let h,w;typeof d=="string"?h=w=(v,S)=>`${d}((${v}),(${S}))`:typeof d=="function"?h=w=d:(h=d.scalar,w=d.vector);let b=R("outputData",m,n.length,4),g=E("aData",l,t.length,4),$=E("bData",c,r.length,4),x;if(o)if(i){let v=k.size(t)===1,S=k.size(r)===1,T=t.length>0&&t[t.length-1]%4===0,C=r.length>0&&r[r.length-1]%4===0;v||S?x=b.setByOffset("global_idx",w(v?`${g.type.value}(${g.getByOffset("0")}.x)`:g.getByOffset("global_idx"),S?`${$.type.value}(${$.getByOffset("0")}.x)`:$.getByOffset("global_idx"))):x=`
            let outputIndices = ${b.offsetToIndices("global_idx * 4u")};
            let offsetA = ${g.broadcastedIndicesToOffset("outputIndices",b)};
            let offsetB = ${$.broadcastedIndicesToOffset("outputIndices",b)};
            ${b.setByOffset("global_idx",w(a||T?g.getByOffset("offsetA / 4u"):`${g.type.value}(${g.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||C?$.getByOffset("offsetB / 4u"):`${$.type.value}(${$.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else x=b.setByOffset("global_idx",w(g.getByOffset("global_idx"),$.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let v=(S,T,C="")=>{let A=`aData[indexA${T}][componentA${T}]`,P=`bData[indexB${T}][componentB${T}]`;return`
            let outputIndices${T} = ${b.offsetToIndices(`global_idx * 4u + ${T}u`)};
            let offsetA${T} = ${g.broadcastedIndicesToOffset(`outputIndices${T}`,b)};
            let offsetB${T} = ${$.broadcastedIndicesToOffset(`outputIndices${T}`,b)};
            let indexA${T} = offsetA${T} / 4u;
            let indexB${T} = offsetB${T} / 4u;
            let componentA${T} = offsetA${T} % 4u;
            let componentB${T} = offsetB${T} % 4u;
            ${S}[${T}] = ${C}(${h(A,P)});
          `};m===9?x=`
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
        ${e.registerUniform("vec_size","u32").declareVariables(g,$,b)}

        ${u??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${x}
      }`},Dm=(e,t,r,n,o,i,a=r.dataType)=>{let d=r.dims.map(g=>Number(g)??1),l=n.dims.map(g=>Number(g)??1),c=!k.areEqual(d,l),m=d,u=k.size(d),h=!1,w=!1,b=[c];if(c){let g=et.calcShape(d,l,!1);if(!g)throw new Error("Can't perform binary op on the given tensors");m=g.slice(),u=k.size(m);let $=k.size(d)===1,x=k.size(l)===1,v=d.length>0&&d[d.length-1]%4===0,S=l.length>0&&l[l.length-1]%4===0;b.push($),b.push(x),b.push(v),b.push(S);let T=1;for(let C=1;C<m.length;C++){let A=d[d.length-C],P=l[l.length-C];if(A===P)T*=A;else break}T%4===0?(w=!0,h=!0):($||x||v||S)&&(h=!0)}else h=!0;return b.push(h),{name:e,shaderCache:{hint:t+b.map(g=>g.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:g=>Om(g,d,l,m,h,c,w,o,r.dataType,n.dataType,a,i),getRunData:()=>({outputs:[{dims:m,dataType:a}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:Math.ceil(k.size(m)/4)},...V(d,l,m)]})}},it=(e,t,r,n,o,i)=>{e.compute(Dm(t,o??"",e.inputs[0],e.inputs[1],r,n,i))},yu=e=>{it(e,"Add",(t,r)=>`${t}+${r}`)},wu=e=>{it(e,"Div",(t,r)=>`${t}/${r}`)},_u=e=>{it(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},vu=e=>{it(e,"Mul",(t,r)=>`${t}*${r}`)},$u=e=>{let t=E("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;it(e,"Pow",{scalar:(n,o)=>`pow_custom(${n},${o})`,vector:(n,o)=>`pow_vector_custom(${n},${o})`},`
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
      `)},xu=e=>{it(e,"Sub",(t,r)=>`${t}-${r}`)},Su=e=>{it(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Tu=e=>{it(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Iu=e=>{it(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Cu=e=>{it(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}});var Rm,Mm,Um,Vm,ku,Eu,Pu=M(()=>{"use strict";te();ae();Ce();se();Rm=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,n=e[r],o=n.dataType,i=n.dims.length;e.forEach((a,d)=>{if(d!==r){if(a.dataType!==o)throw new Error("input tensors should be one type");if(a.dims.length!==i)throw new Error("input tensors should have the same shape");a.dims.forEach((l,c)=>{if(c!==t&&l!==n.dims[c])throw new Error("non concat dimensions must match")})}})},Mm=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Um=(e,t)=>{let r=e.length,n=[];for(let o=0;o<r;++o){let i=t.setByOffset("global_idx",e[o].getByIndices("indices"));r===1?n.push(i):o===0?n.push(`if (inputIndex == ${o}u) { ${i} }`):o===r-1?n.push(`else { ${i} }`):n.push(`else if (inputIndex == ${o}) { ${i} }`)}return n.join(`
`)},Vm=(e,t,r,n)=>{let o=k.size(r),i=new Array(e.length),a=new Array(e.length),d=0,l=[],c=[],m=[{type:12,data:o}];for(let g=0;g<e.length;++g)d+=e[g].dims[t],i[g]=d,c.push(e[g].dims.length),a[g]=E(`input${g}`,n,c[g]),l.push("rank"),m.push({type:12,data:i[g]});for(let g=0;g<e.length;++g)m.push(...V(e[g].dims));m.push(...V(r));let u=R("output",n,r.length),h=u.indicesGet("indices",t),w=Array.from(Array(i.length).keys()).map(g=>`uniforms.sizeInConcatAxis${g}`).join(","),b=g=>`

  ${(()=>{g.registerUniform("outputSize","u32");for(let $=0;$<e.length;$++)g.registerUniform(`sizeInConcatAxis${$}`,"u32");return g.declareVariables(...a,u)})()}

  ${Mm(i.length,w)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${u.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${w});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Um(a,u)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:m}),getShaderSource:b}},ku=(e,t)=>{let r=e.inputs,n=r[0].dims,o=k.normalizeAxis(t.axis,n.length);Rm(r,o);let i=n.slice();i[o]=r.reduce((d,l)=>d+(l.dims.length>o?l.dims[o]:0),0);let a=r.filter(d=>k.size(d.dims)>0);e.compute(Vm(a,o,i,r[0].dataType),{inputs:a})},Eu=e=>re({axis:e.axis})});var Ne,We,Le,Yr,dt=M(()=>{"use strict";te();ae();Ne=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},We=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Le=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Yr=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,n]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:n}}else if(t==="Clip"){let[r,n]=e?.activation_params||[Xa,Qa];return{activation:t,clipMax:n,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}});var ze,Zr,Xt=M(()=>{"use strict";ze=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Zr=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Xr,fo=M(()=>{"use strict";Xr=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var Nm,Wm,Qt,zu,Lm,Jt,Gm,Qr,er=M(()=>{"use strict";te();ae();se();dt();Xt();Nm=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Wm=(e,t)=>e?`
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
        }`,Qt=(e,t,r="f32",n,o=!1,i=32,a=!1,d=32)=>{let l=t[1]*e[1],c=t[0]*e[0],m=o?l:i,u=o?i:l,h=m/t[0],w=i/t[1];if(!((o&&h===4&&e[1]===4||!o&&(h===3||h===4))&&m%t[0]===0&&i%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${h} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${h} must be 3 or 4.
  tileAWidth ${m} must be divisible by workgroupSize[0]${t[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${h}<${r}>, ${m/h}>, ${u}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${c/e[0]}>, ${i}>;

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
  let tileRowB = localRow * ${w};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Nm(o,n)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${w}; innerRow = innerRow + 1) {
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

          ${Wm(o,h)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},zu=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Lm=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Jt=(e,t,r="f32",n,o=!1,i=32,a=!1,d=32,l=!1)=>{let c=e[1]*t[1],m=e[0]*t[0],u=o?c:i,h=o?i:c;if(!(h%t[1]===0&&u%t[0]===0&&i%t[1]===0))throw new Error(`tileAHight ${h} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${u} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let w=h/t[1],b=u/t[0],g=i/t[1],$=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${c};
    let globalColStart = i32(workgroupId.x) * ${m};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${u}; inputCol = inputCol + ${t[0]}) {
          ${zu(o,n)}
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
let globalRowStart = i32(workgroupId.y) * ${c};

let tileRowA = i32(localId.y) * ${w};
let tileColA = i32(localId.x) * ${b};
let tileRowB = i32(localId.y) * ${g};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${w}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${b}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${zu(o,n)}
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
      ${Lm(o)}
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
    ${$}
  }
`},Gm=(e,t,r,n,o,i=!1)=>{let[a,d,l]=o,[c,m,u,h]=n,w=Bt(a,l),b=Bt(d,l),g=ge(n[0].type.tensor),$=()=>{let S=m.rank,T=c.rank,C=`var aIndices: ${m.type.indices};`;for(let A=S-2-1,P=T-1;A>=0;A--,P--)C+=`
aIndices[${A}] = ${T>1?`batchIndices[${P}]`:"batchIndices"};`;return w.forEach(A=>{C+=`
aIndices[${A}] = 0;`}),C+=`
aIndices[${S-2}] = u32(row);
                   aIndices[${S-1}] = u32(colIn);`,C},x=()=>{let S=u.rank,T=c.rank,C=`var bIndices: ${u.type.indices};`;for(let A=S-2-1,P=T-1;A>=0;A--,P--)C+=`
bIndices[${A}] = ${T>1?`batchIndices[${P}]`:"batchIndices"};`;return b.forEach(A=>{C+=`
bIndices[${A}] = 0;`}),C+=`
bIndices[${S-2}] = u32(row);
                   bIndices[${S-1}] = u32(colIn);`,C};return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${c.type.indices}) -> ${ze(e,g)} {
      var value = ${ze(e,g)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        ${$()}
        value = ${m.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${c.type.indices}) -> ${ze(e,g)} {
      var value = ${ze(e,g)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        ${x()}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${ze(e,g)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${i?"bias[colIn]":`${ze(e,g)}(bias[row])`};`:""}
        ${r}
        ${h.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Qr=(e,t,r,n,o=!1,i)=>{let a=e[0].dims,d=e[1].dims,l=a.slice(0,-2),c=d.slice(0,-2),m=n?n.slice(0,-2):r.slice(0,-2),u=k.size(m),h=a[a.length-2],w=a[a.length-1],b=d[d.length-1],g=w%4===0&&b%4===0,$=h<=8?[4,1,1]:[4,4,1],x=[8,8,1],v=[Math.ceil(b/x[0]/$[0]),Math.ceil(h/x[1]/$[1]),Math.ceil(u/x[2]/$[2])],S=g?4:1,T=[...l,h,w/S],C=T.length,A=[...c,w,b/S],P=A.length,D=[u,h,b/S],N=[{type:6,data:h},{type:6,data:b},{type:6,data:w}];We(t,N),N.push(...V(m,T,A));let G=["rank","rank"],q=e.length>2;q&&(N.push(...V(e[2].dims)),G.push("rank")),N.push(...V(D));let K=W=>{let J=m.length,ue=Gr("batchDims",e[0].dataType,J,1),ee=ge(e[0].dataType),oe=E("a",e[0].dataType,C,S),X=E("b",e[1].dataType,P,S),Q=R("result",e[0].dataType,D.length,S),ye=[oe,X];if(q){let H=o?S:1;ye.push(E("bias",e[2].dataType,e[2].dims.length,H))}let we=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Le(t,we);let ce=ge(Q.type.tensor),ne=Ne(t,Q.type.value,ce),U=Gm(S,q,ne,[ue,oe,X,Q],[l,c,m],o);return`
  ${W.registerUniforms(we).registerInternalVariables(ue).declareVariables(...ye,Q)}
  ${U}
  ${g?Qt($,x,ee,ue):Jt($,x,ee,ue)}
                   `};return{name:"MatMul",shaderCache:{hint:`${$};${t.activation};${g};${o}`,inputDependencies:G},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:N}),getShaderSource:K}}});var Hm,Ou,Du=M(()=>{"use strict";te();je();se();dt();Xt();fo();er();Hm=(e,t,r,n,o=!1,i,a=4,d=4,l=4,c="f32")=>{let m=G=>{switch(G){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${c}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${G} is not supported.`)}},u=G=>{switch(G){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${G} is not supported.`)}},h=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,w=e?`
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
    `,b=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",g=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",$=e?"row":"col",x=e?"col":"row",v=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${$} / outWidth;
    let outCol = ${$} % outWidth;

    let WRow = ${x} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${x} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${x} % inChannels;
    var resData = ${ze(a,c)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${b} && xCol >= 0 && xCol < ${g}) {
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
    return ${ze(a,c)}(0.0);`:n&&r?`
    let col = colIn * ${a};
    ${v}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${v}
    }
    return ${ze(a,c)}(0.0);`,T=`${u(d)}`,C=ze(l,c),A=e?ze(a,c):ze(d,c),P=e?ze(d,c):ze(a,c),D=Ne(i,C,c);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e?S:T}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${P} {
      ${e?T:S}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${C}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${w}
      ${Zr(o)}
      ${D}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Ou=(e,t,r,n,o,i,a,d,l)=>{let c=t.format==="NHWC",m=c?e[0].dims[3]:e[0].dims[1],u=r[0],h=c?r[2]:r[3],w=c?r[1]:r[2],b=c?r[3]:r[1],g=c&&(m%4===0||m%3===0)&&b%4===0,$=c?b:h*w,x=c?h*w:b,v=[8,8,1],S=n<=8?[4,1,1]:[4,4,1],T=[Math.ceil($/v[0]/S[0]),Math.ceil(x/v[1]/S[1]),Math.ceil(u/v[2]/S[2])];de("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${T}`);let C=g?c&&m%4!==0?3:4:1,A=v[1]*S[1],P=v[0]*S[0],D=Math.max(v[0]*C,v[1]),N=n%A===0,G=o%P===0,q=i%D===0,K=g?[C,4,4]:[1,1,1],W=[{type:6,data:n},{type:6,data:o},{type:6,data:i},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];We(t,W),W.push(...V(e[0].dims,e[1].dims));let J=["rank","rank"];a&&(W.push(...V(e[2].dims)),J.push("rank")),W.push(...V(r));let ue=ee=>{let oe=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Le(t,oe);let X=g?4:1,Q=ge(e[0].dataType),ye=`
      fn setOutputAtIndex(flatIndex : i32, value : ${g?`vec4<${Q}>`:Q}) {
        result[flatIndex] = ${g?`vec4<${Q}>`:Q}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${g?`vec4<${Q}>`:Q}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${g?"/ 4":""}, value);
      }`,we=E("x",e[0].dataType,e[0].dims.length,C===3?1:C),ce=E("w",e[1].dataType,e[1].dims.length,X),ne=[we,ce],U=R("result",e[0].dataType,r.length,X);if(a){let H=E("bias",e[2].dataType,e[2].dims.length,X);ne.push(H),ye+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${g?`vec4<${Q}>`:Q} {
          return bias[coords.${c?"w":"y"}${g?"/ 4":""}];
        }`}return`
        ${Xr("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${ee.registerUniforms(oe).declareVariables(...ne,U)}
        ${ye}
        ${Hm(c,N,G,q,a,t,K[0],K[1],K[2],Q)}
        ${g?Qt(S,v,Q,void 0,!c,D):Jt(S,v,Q,void 0,!c,D,!1,void 0,d)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${C};${g};${N};${G};${q};${A};${P};${D}`,inputDependencies:J},getRunData:()=>({outputs:[{dims:l?l(r):r,dataType:e[0].dataType}],dispatchGroup:{x:T[0],y:T[1],z:T[2]},programUniforms:W}),getShaderSource:ue}}});var Fm,Bu,Jr,qm,Ru,jm,Mu,Uu,Vu=M(()=>{"use strict";te();je();ae();se();dt();Xt();Fm=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Bu=e=>typeof e=="number"?[e,e,e]:e,Jr=(e,t)=>t<=1?e:e+(e-1)*(t-1),qm=(e,t,r,n=1)=>{let o=Jr(t,n);return Math.floor((e[0]*(r-1)-r+o)/2)},Ru=(e,t,r,n,o)=>{o==null&&(o=qm(e,t[0],n[0]));let i=[0,0,0,r];for(let a=0;a<3;a++)e[a]+2*o>=t[a]&&(i[a]=Math.trunc((e[a]-t[a]+2*o)/n[a]+1));return i},jm=(e,t,r,n,o,i,a,d,l,c)=>{let m,u,h,w;if(e==="VALID"&&(e=0),typeof e=="number"){m={top:e,bottom:e,left:e,right:e,front:e,back:e};let b=Ru([t,r,n,1],[d,l,c],1,[o,i,a],e);u=b[0],h=b[1],w=b[2]}else if(Array.isArray(e)){if(!e.every((g,$,x)=>g===x[0]))throw Error(`Unsupported padding parameter: ${e}`);m={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let b=Ru([t,r,n,1],[d,l,c],1,[o,i,a],e[0]);u=b[0],h=b[1],w=b[2]}else if(e==="SAME_UPPER"){u=Math.ceil(t/o),h=Math.ceil(r/i),w=Math.ceil(n/a);let b=(u-1)*o+d-t,g=(h-1)*i+l-r,$=(w-1)*a+c-n,x=Math.floor(b/2),v=b-x,S=Math.floor(g/2),T=g-S,C=Math.floor($/2),A=$-C;m={top:S,bottom:T,left:C,right:A,front:x,back:v}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:m,outDepth:u,outHeight:h,outWidth:w}},Mu=(e,t,r,n,o,i=!1,a="channelsLast")=>{let d,l,c,m,u;if(a==="channelsLast")[d,l,c,m,u]=e;else if(a==="channelsFirst")[d,u,l,c,m]=e;else throw new Error(`Unknown dataFormat ${a}`);let[h,,w,b,g]=t,[$,x,v]=Bu(r),[S,T,C]=Bu(n),A=Jr(w,S),P=Jr(b,T),D=Jr(g,C),{padInfo:N,outDepth:G,outHeight:q,outWidth:K}=jm(o,l,c,m,$,x,v,A,P,D),W=i?h*u:h,J=[0,0,0,0,0];return a==="channelsFirst"?J=[d,W,G,q,K]:a==="channelsLast"&&(J=[d,G,q,K,W]),{batchSize:d,dataFormat:a,inDepth:l,inHeight:c,inWidth:m,inChannels:u,outDepth:G,outHeight:q,outWidth:K,outChannels:W,padInfo:N,strideDepth:$,strideHeight:x,strideWidth:v,filterDepth:w,filterHeight:b,filterWidth:g,effectiveFilterDepth:A,effectiveFilterHeight:P,effectiveFilterWidth:D,dilationDepth:S,dilationHeight:T,dilationWidth:C,inShape:e,outShape:J,filterShape:t}},Uu=(e,t,r,n,o,i)=>{let a=i==="channelsLast",d=a?e[0].dims[3]:e[0].dims[1],l=!1,c=[64,1,1],m={x:r.map((v,S)=>S)},u=[Math.ceil(Fm(m.x.map(v=>r[v]))/c[0]),1,1];de("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${u}`);let h=l?a&&d%4!==0?3:4:1,w=k.size(r),b=[{type:12,data:w},{type:12,data:n},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];We(t,b),b.push(...V(e[0].dims,e[1].dims));let g=["rank","rank"],$=e.length===3;$&&(b.push(...V(e[2].dims)),g.push("rank")),b.push(...V(r));let x=v=>{let S=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:n.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Le(t,S);let T=l?4:1,C=ge(e[0].dataType),A=E("x",e[0].dataType,e[0].dims.length,h===3?1:h),P=E("W",e[1].dataType,e[1].dims.length,T),D=[A,P],N=R("result",e[0].dataType,r.length,T),G="";if($){let W=E("bias",e[2].dataType,e[2].dims.length,T);D.push(W),G+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l?`vec4<${C}>`:C} {
          return bias[${a?j("coords",4,5):j("coords",1,5)}${l?"/ 4":""}];
        }`}let q=ze(h,C),K=Ne(t,q,C);return`
            ${G}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${A.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${P.getByIndices("aIndices")};
            }
          ${v.registerUniforms(S).declareVariables(...D,N)}
          ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${N.offsetToIndices("global_idx")};
              let batch = ${j("coords",0,A.rank)};
              let d2 = ${a?j("coords",A.rank-1,A.rank):j("coords",1,A.rank)};
              let xFRCCorner = vec3<u32>(${a?j("coords",1,A.rank):j("coords",2,A.rank)},
              ${a?j("coords",2,A.rank):j("coords",3,A.rank)},
              ${a?j("coords",3,A.rank):j("coords",4,A.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?j("uniforms.x_shape",1,A.rank):j("uniforms.x_shape",2,A.rank)};
              let xShapeZ = ${a?j("uniforms.x_shape",2,A.rank):j("uniforms.x_shape",3,A.rank)};
              let xShapeW = ${a?j("uniforms.x_shape",3,A.rank):j("uniforms.x_shape",4,A.rank)};
              let xShapeU = ${a?j("uniforms.x_shape",4,A.rank):j("uniforms.x_shape",1,A.rank)};
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
              ${$?"value = value + getBiasByOutputCoords(coords)":""};
              ${K}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${a};${h};${$}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:u[0],y:u[1],z:u[2]},programUniforms:b}),getShaderSource:x}}});var Nu,Wu,Lu=M(()=>{"use strict";te();ae();se();dt();Nu=(e,t,r,n)=>{let o=e.length>2,i=o?"value += b[output_channel];":"",a=e[0].dims,d=e[1].dims,l=t.format==="NHWC",c=l?r[3]:r[1],m=c/t.group,u=l&&m>=4?$e(c):1,h=k.size(r)/u,w=[{type:12,data:h},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:m}];We(t,w),w.push(...V(a,[d[0],d[1],d[2],d[3]/u]));let b=o?["rank","rank","rank"]:["rank","rank"];w.push(...V([r[0],r[1],r[2],r[3]/u]));let g=$=>{let x=R("output",e[0].dataType,r.length,u),v=ge(x.type.tensor),S=Ne(t,x.type.value,v),T=E("x",e[0].dataType,a.length),C=E("w",e[1].dataType,d.length,u),A=[T,C];o&&A.push(E("b",e[2].dataType,e[2].dims,u));let P=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Le(t,P);let D=l?`
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
            let wVal = ${C.get("wHeight","wWidth","wInChannel","output_channel")};
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
            let wVal = ${C.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${$.registerUniforms(P).declareVariables(...A,x)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${x.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${u} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${x.type.value} = ${x.type.value}(0);
    ${D}
    ${i}
    ${S}
    ${x.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${u}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:w}),getShaderSource:g}},Wu=(e,t,r,n)=>{let o=e.length>2,i=$e(r[3]),a=$e(r[2]),d=k.size(r)/i/a,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/i],c=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/i],m=[r[0],r[1],r[2],r[3]/i],u=[{type:12,data:d},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];We(t,u),u.push(...V(l,c,m));let h=(a-1)*t.strides[1]+c[1],w=b=>{let g=R("output",e[0].dataType,m.length,i),$=ge(g.type.tensor),x=Ne(t,g.type.value,$),v=E("x",e[0].dataType,l.length,i),S=E("w",e[1].dataType,c.length,i),T=[v,S];o&&T.push(E("b",e[2].dataType,e[2].dims,i));let C=o?"value += b[output_channel];":"",A=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Le(t,A),`
  ${b.registerUniforms(A).declareVariables(...T,g)}
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

    var x_vals: array<${v.type.value}, ${h}>;
    var values: array<${g.type.value}, ${a}>;
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
          let w_val = ${S.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${a}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${a}u; i++) {
      var value = values[i];
      ${C}
      ${x}
      ${g.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${i};${a};${h};${c[0]};${c[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:u}),getShaderSource:w}}});var ho,Km,Gu,go=M(()=>{"use strict";te();ae();er();se();dt();ho=(e,t,r,n,o=!1,i)=>{let a=e[0].dims,d=e[1].dims,l=a[a.length-2],c=d[d.length-1],m=a[a.length-1],u=$e(c),h=$e(m),w=$e(l),b=k.size(r)/u/w,g=e.length>2,$=n?n.slice(0,-2):r.slice(0,-2),v=[k.size($),l,c],S=[{type:12,data:b},{type:12,data:l},{type:12,data:c},{type:12,data:m}];We(t,S),S.push(...V($,a,d)),g&&S.push(...V(e[2].dims)),S.push(...V(v));let T=C=>{let A=Gr("batch_dims",e[0].dataType,$.length),P=E("a",e[0].dataType,a.length,h),D=E("b",e[1].dataType,d.length,u),N=R("output",e[0].dataType,v.length,u),G=ge(N.type.tensor),q=Ne(t,N.type.value,G),K=[P,D],W="";if(g){let we=o?u:1;K.push(E("bias",e[2].dataType,e[2].dims.length,we)),W=`${o?`value += bias[col / ${we}];`:`value += ${N.type.value}(bias[row + i]);`}`}let J=a.slice(0,-2),ue=d.slice(0,-2),ee=Bt(J,$),oe=Bt(ue,$),X=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Le(t,X);let Q=(we,ce)=>{let ne=we.rank,U=we.name;if(ne===2)return`var ${U}_indices = ${we.type.indices}(0u, 0u);`;let H=A.rank,pe=`var ${U}_indices: ${we.type.indices};`;for(let Oe=ne-2-1,he=H-1;Oe>=0;Oe--,he--)pe+=`
${U}_indices[${Oe}] = ${H>1?`batch_indices[${he}]`:"batch_indices"};`;return ce.forEach(Oe=>{pe+=`
${U}_indices[${Oe}] = 0;`}),pe+=`${U}_indices[${ne-2}] = 0u;
                     ${U}_indices[${ne-1}] = 0u;`,pe},ye=()=>{let we=`var a_data: ${P.type.value};`;for(let ce=0;ce<h;ce++)we+=`
              let b_data${ce} = b[(b_offset + (k + ${ce}) * uniforms.N + col) / ${u}];`;for(let ce=0;ce<w;ce++){we+=`a_data = a[(a_offset + (row + ${ce}) * uniforms.K + k) / ${h}];`;for(let ne=0;ne<h;ne++)we+=`
            values[${ce}] = fma(${D.type.value}(a_data${h===1?"":`[${ne}]`}), b_data${ne}, values[${ce}]);
`}return we};return`
  ${C.registerUniforms(X).registerInternalVariables(A).declareVariables(...K,N)}
  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${u})) * ${u};
    var index1 = global_idx / (uniforms.N / ${u});
    let stride1 = uniforms.M / ${w};
    let row = (index1 % stride1) * ${w};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${A.offsetToIndices("batch")};`}
    ${Q(P,ee)}
    let a_offset = ${P.indicesToOffset("a_indices")};
    ${Q(D,oe)}
    let b_offset = ${D.indicesToOffset("b_indices")};
    var values: array<${N.type.value}, ${w}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${ye()}
    }
    for (var i = 0u; i < ${w}u; i++) {
      var value = values[i];
      ${W}
      ${q}
      let cur_indices = ${N.type.indices}(batch, row + i, col);
      let offset = ${N.indicesToOffset("cur_indices")};
      ${N.setByOffset(`offset / ${u}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${u};${h};${w};${o}`,inputDependencies:g?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:S}),getShaderSource:T}},Km=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Gu=e=>{Km(e.inputs);let t=et.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];r<8&&n<8?e.compute(ho(e.inputs,{activation:""},t)):e.compute(Qr(e.inputs,{activation:""},t))}});var Ym,bo,Zm,yo,wo,Hu,Xm,Qm,_o,Fu=M(()=>{"use strict";ae();Du();Vu();er();Lu();dt();go();ut();Ym=(e,t,r,n,o,i)=>{let a=e[0],d=e.slice(i?1:2,i?3:4),l=d.length,c=t[0],u=t.slice(2).map((b,g)=>b+(b-1)*(r[g]-1)),w=d.map((b,g)=>b+n[g]+n[g+l]).map((b,g)=>Math.floor((b-u[g]+o[g])/o[g]));return w.splice(0,0,a),w.splice(i?3:1,0,c),w},bo=[2,3,1,0],Zm=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[1]*t.group;if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},yo=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let i=2;i<t[1].dims.length;++i)r[i-2]===0&&(r[i-2]=t[1].dims[i]);let n=e.pads.slice();St.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.format==="NHWC",e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:r,pads:n}),o},wo=e=>{let t=Yr(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],o=e.dilations,i=e.group,a=e.kernel_shape,d=e.pads,l=e.strides,c=e.w_is_const();return{autoPad:n,format:r,dilations:o,group:i,kernelShape:a,pads:d,strides:l,wIsConst:c,...t,cacheKey:`${e.format};${t.activation};`}},Hu=(e,t,r,n)=>{let o=r.format==="NHWC",i=Ym(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,o);if(r.group!==1){let A=[t[0]];if(o){let D=e.kernelCustomData.wT??e.compute(Ee(t[1],bo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=D),A.push(D)}else A.push(t[1]);t.length===3&&A.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(Wu(A,r,i,n),{inputs:A}):e.compute(Nu(A,r,i,n),{inputs:A});return}let a=t.length===3,d=t[0].dims[o?1:2],l=t[0].dims[o?2:3],c=t[0].dims[o?3:1],m=t[1].dims[2],u=t[1].dims[3],h=i[o?1:2],w=i[o?2:3],b=i[o?3:1],g=o&&m===d&&u===l&&r.pads[0]===0&&r.pads[1]===0;if(g||m===1&&u===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let A=i[0],P,D,N,G=[];if(o){let W=e.kernelCustomData.wT??e.compute(Ee(t[1],bo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=W),g){let J=d*l*c;P=t[0].reshape([1,A,J]),D=W.reshape([1,J,b]),N=[1,A,b]}else P=t[0].reshape([A,d*l,c]),D=W.reshape([1,c,b]),N=[A,h*w,b];G.push(P),G.push(D)}else P=t[0].reshape([A,c,d*l]),D=t[1].reshape([1,b,c]),N=[A,b,h*w],G.push(D),G.push(P);a&&G.push(t[2]);let q=N[2],K=G[0].dims[G[0].dims.length-1];q<8&&K<8?e.compute(ho(G,r,i,N,o,n),{inputs:G}):e.compute(Qr(G,r,i,N,o,n),{inputs:G});return}let $=!0,x=e.kernelCustomData.wT??e.compute(Ee(t[1],bo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=x);let v=[t[0],x];a&&v.push(t[2]);let S=o?h*w:b,T=o?b:h*w,C=m*u*c;e.compute(Ou(v,r,i,S,T,C,a,$,n),{inputs:v})},Xm=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],i=[1].concat(t.strides),a=[1].concat(t.dilations),d=[1].concat(t.kernelShape),l=yo({...t,pads:o,strides:i,dilations:a,kernelShape:d},n);Hu(e,n,l,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},Qm=(e,t,r)=>{let n=r.format==="NHWC"?"channelsLast":"channelsFirst",o=yo(r,t),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,a=Mu(t[0].dims,t[1].dims,r.strides,r.dilations,i,!1,n);e.compute(Uu(t,o,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],n))},_o=(e,t)=>{if(Zm(e.inputs,t),e.inputs[0].dims.length===3)Xm(e,t);else if(e.inputs[0].dims.length===5)Qm(e,e.inputs,t);else{let r=yo(t,e.inputs);Hu(e,e.inputs,r)}}});var Jm,qu,ju=M(()=>{"use strict";te();je();se();dt();Xt();fo();er();Jm=(e,t=!1,r,n,o=4)=>{let i=x=>{switch(x){case 1:return"return w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];";case 4:return`
            let coord1 = vec4<i32>(coordX, coordY, col + 1, rowInner);
            let coord2 = vec4<i32>(coordX, coordY, col + 2, rowInner);
            let coord3 = vec4<i32>(coordX, coordY, col + 3, rowInner);
            let v0 = w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];
            let v1 = w[getIndexFromCoords4D(coord1, vec4<i32>(uniforms.w_shape))];
            let v2 = w[getIndexFromCoords4D(coord2, vec4<i32>(uniforms.w_shape))];
            let v3 = w[getIndexFromCoords4D(coord3, vec4<i32>(uniforms.w_shape))];
            return ${n}(v0, v1, v2, v3);
            `;default:throw new Error(`innerElementSize ${x} is not supported.`)}},a=e?`
      let coord = vec4<i32>(batch, iXR, iXC, xCh);
      `:`
      let coord = vec4<i32>(batch, xCh, iXR, iXC);
      `,d=e?`
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
    `,l=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",c=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",m=e?"row":"col",u=e?"col":"row",h=`
      let inChannels = ${e?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      let outRow = ${m} / outWidth;
      let outCol = ${m} % outWidth;

      let WRow = ${u} / (uniforms.filter_dims[1] * inChannels);
      let WCol = ${u} / inChannels % uniforms.filter_dims[1];
      let xR = f32(outRow - uniforms.pads[0] + uniforms.dilations[0] * WRow) / f32(uniforms.strides[0]);
      let xC = f32(outCol - uniforms.pads[1] + uniforms.dilations[1] * WCol) / f32(uniforms.strides[1]);
      if (xR < 0.0 || xR >= f32(${l}) || fract(xR) > 0.0) {
        return ${n}(0.0);
      }
      if (xC < 0.0 || xC >= f32(${c}) || fract(xC) > 0.0) {
        return ${n}(0.0);
      }
      let iXR = i32(xR);
      let iXC = i32(xC);
      let xCh = ${u} % inChannels;
      ${a}
      return x[getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape))/${o}];`,w=e?`
      let col = colIn * ${o};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
        ${h}
      }
      return ${n}(0.0);`:`
      let col = colIn * ${o};
      if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
        ${h}
      }
      return ${n}(0.0);`,b=`
      let col = colIn * ${o};
      let inChannels = ${e?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let coordX = uniforms.filter_dims[0] - 1 - row / (uniforms.filter_dims[1] * inChannels);
      let coordY = uniforms.filter_dims[1] - 1 - (row / inChannels) % uniforms.filter_dims[1];
      if (${e?"row < uniforms.dim_inner && col < uniforms.dim_b_outer":"row < uniforms.dim_inner && col < uniforms.dim_a_outer"}  && coordX >= 0 && coordY >= 0) {
        let rowInner = row % inChannels;
        let coord = vec4<i32>(coordX, coordY, col, rowInner);
        ${i(o)}
      }
      return ${n}(0.0);
      `,g=Ne(r,n);return`
  fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${n} {
    ${e?w:b}
  }

  fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${n} {
    ${e?b:w}
  }

  fn mm_write(batch: i32, row : i32, colIn : i32, valueInput : ${n}) {
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
      var value = valueInput;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${d}
      ${Zr(t)}
      ${g}
      result[getIndexFromCoords4D(coords, vec4<i32>(uniforms.result_shape))/${o}] = value;
    }
  }`},qu=(e,t,r,n,o,i,a,d)=>{let l=t.format==="NHWC",c=l?e[0].dims[3]:e[0].dims[1],m=r[0],u=l?r[2]:r[3],h=l?r[1]:r[2],w=l?r[3]:r[1],b=l&&c%4===0&&c%3&&w%4===0,g=l?w:u*h,$=l?u*h:w,x=[8,8,1],v=n<=8?[4,1,1]:[4,4,1],S=[Math.ceil(g/x[0]/v[0]),Math.ceil($/x[1]/v[1]),Math.ceil(m/x[2]/v[2])];de("verbose",()=>`[conv_backprop_mm_webgpu] dispatch = ${S}`);let T=b?4:1,C=Math.max(x[0]*T,x[1]),A=b?4:1,P=[t.kernelShape[l?1:2],t.kernelShape[l?2:3]],D=[P[0]+(t.dilations[0]<=1?0:(P[0]-1)*(t.dilations[0]-1)),P[1]+(t.dilations[1]<=1?0:(P[1]-1)*(t.dilations[1]-1))],N=[D[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),D[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],G=[{type:6,data:n},{type:6,data:o},{type:6,data:i},{type:6,data:t.strides},{type:6,data:t.dilations},{type:6,data:P},{type:6,data:N}];We(t,G),G.push(...V(e[0].dims,e[1].dims));let q=["rank","rank"];a&&(G.push(...V(e[2].dims)),q.push("rank")),G.push(...V(r));let K=W=>{let J=E("x",e[0].dataType,e[0].dims.length,A),ue=E("w",e[1].dataType,e[1].dims.length,1),ee=R("result",e[0].dataType,r.length,A),oe=[J,ue],X="";if(a){let we=E("bias",e[2].dataType,e[2].dims.length,A);oe.push(we),X+=`
          fn getBiasByOutputCoords(coords : vec4<i32>) -> ${we.type.value} {
            return bias[coords.${l?"w":"y"}${b?"/ 4":""}];
          }`}let Q=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"strides",type:"i32",length:2},{name:"dilations",type:"i32",length:2},{name:"filter_dims",type:"i32",length:P.length},{name:"pads",type:"i32",length:N.length}];Le(t,Q);let ye=ge(e[0].dataType,1);if(ye!=="f16"&&ye!=="f32")throw new Error(`elemType ${ye} is not supported.`);return`
        ${Xr("uniforms.result_strides")}
        ${W.registerUniforms(Q).declareVariables(...oe,ee)};
        ${X}
        ${Jm(l,a,t,J.type.value,T)}
        ${b?Qt(v,x,ye,void 0,!l,C):Jt(v,x,ye,void 0,!l,C,!1,void 0,d)}`};return{name:"Conv2DTransposeMatMul",shaderCache:{hint:`${t.cacheKey};${v};${x};${b}`,inputDependencies:q},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:S[0],y:S[1],z:S[2]},programUniforms:G}),getShaderSource:K}}});var ef,vo,Ku=M(()=>{"use strict";te();je();ae();se();ef=(e,t,r,n,o,i=!1,a,d,l=!1)=>{let c=l?1:2,m=l?2:3,u=l?3:1,h=i?2:1,w=`
  fn setOutputAtIndex(flatIndex : u32, value : ${i?`vec4<${a}>`:a}) {
    result[flatIndex] = ${i?`vec4<${a}>`:a}(value);
  }`;n&&(w+=`
    fn getBiasByOutputCoords(coords : vec4<u32>) -> ${i?`vec4<${a}>`:a} {
      return bias[coords.${l?"w":"y"}${i?"/ 4":""}];
    }`);let b=i?4:1,g=E("W",t[1].dataType,t[1].dims.length,b),$=E("Dy",t[0].dataType,t[0].dims.length,b),x=[$,g];n&&x.push(E("bias",t[2].dataType,[r[u]].length,b));let v=R("result",t[0].dataType,r.length,b),S=`{
        let batch: u32 = ${o?"global_id.z":"workgroup_id.z"} / uniforms.result_shape[1];
        let r = ${o?"global_id.z":"workgroup_id.z"} % uniforms.result_shape[1];
        let c = ${o?"global_id.y":"workgroup_id.y"} * ${h};
        let d1: u32 = ${o?"global_id.x":"workgroup_id.x"} * 4;

        let dyCorner = vec2<i32>(i32(r), i32(c)) - vec2<i32>(uniforms.pads);

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        var dotProd: array<vec4<${a}>, ${h}>;
        for (var i = 0; i < ${h}; i++) {
          dotProd[i] = vec4<${a}>(0.0);
        }
        for (var wR: u32 = 0; wR < uniforms.filter_dims[0]; wR = wR + 1) {
          var dyR = (${a}(dyCorner.x) + ${a}(wR)) / ${a}(uniforms.strides.x);
          let wRPerm = uniforms.filter_dims[0] - 1 - wR;
          if (dyR < 0.0 || dyR >= ${a}(uniforms.Dy_shape[1]) ||
              fract(dyR) > 0.0 || wRPerm < 0) {
            continue;
          }
          let idyR: u32 = u32(dyR);

          for (var wC: u32 = 0; wC < uniforms.filter_dims[1]; wC = wC + 1) {
            let dyC = (${a}(dyCorner.y) + ${a}(wC)) / ${a}(uniforms.strides.y);
            let dyC2 = (${a}(dyCorner.y) + 1.0 + ${a}(wC)) / ${a}(uniforms.strides.y);
            let wCPerm = uniforms.filter_dims[1] - 1 - wC;
            if (wCPerm < 0) {
              continue;
            }
            var bDyCVal = true;
            var bDyCVal2 = true;
            if (dyC < 0.0 || dyC >= ${a}(uniforms.Dy_shape[2]) ||
                fract(dyC) > 0.0) {
              bDyCVal = false;
            }
            if (dyC2 < 0.0 || dyC2 >= ${a}(uniforms.Dy_shape[2]) ||
                fract(dyC2) > 0.0) {
              bDyCVal2 = false;
            }

            let idyC: u32 = u32(dyC);
            let idyC2: u32 = u32(dyC2);
            if (bDyCVal && bDyCVal2) {
              let d2Length = uniforms.Dy_shape[3];
              for (var d2 :u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${$.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${a}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;

                xValue =  ${$.get("batch","idyR","idyC2","d2")};

                dotProd[1] = dotProd[1] + vec4<${a}>(dot(xValue, wValue0),
                                                    dot(xValue, wValue1),
                                                    dot(xValue, wValue2),
                                                    dot(xValue, wValue3));
              }
            } else if (bDyCVal) {
              let d2Length = uniforms.Dy_shape[${u}];
              for (var d2: u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${$.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${a}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;
              }
            } else if (bDyCVal2) {
              let d2Length = uniforms.Dy_shape[3];
              for (var d2: u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${$.get("batch","idyR","idyC2","d2")};
                let tmpval = vec4<${a}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[1] = dotProd[1] + tmpval;
              }
            }
          }
        }

        for (var i: u32 = 0; i < ${h}; i = i + 1) {
          let value = dotProd[i] + ${n?"bias[c+i]":`vec4<${a}>(0.0)`};
          ${v.set("batch","r","c + i","d1","value")};
        }
      }`,T=`
          let outputIndices = ${v.offsetToIndices("global_idx")};
          let batch = ${v.indicesGet("outputIndices",0)};
          let d1 = ${v.indicesGet("outputIndices",u)};
          let r = ${v.indicesGet("outputIndices",c)};
          let c = ${v.indicesGet("outputIndices",m)};
          let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
          let dyRCorner = dyCorner.x;
          let dyCCorner = dyCorner.y;
          let groupId = d1 / uniforms.output_channels_per_group;
          let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
          // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
          // ? = to be determined. : = across all values in that axis.
          var dotProd = ${a}(0.0);
          for (var wR: u32 = 0; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
            if (wR % uniforms.dilations.x != 0) {
              continue;
            }
            let dyR = (${a}(dyRCorner) + ${a}(wR)) / ${a}(uniforms.strides[0]);
            let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
            if (dyR < 0.0 || dyR >= ${a}(uniforms.Dy_shape[${c}]) || fract(dyR) > 0.0 ||
                wRPerm < 0) {
              continue;
            }
            let idyR: u32 = u32(dyR);

            for (var wC: u32 = 0; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
              if (wC % uniforms.dilations.y != 0) {
                continue;
              }
              let dyC = (${a}(dyCCorner) + ${a}(wC)) / ${a}(uniforms.strides.y);
              let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
              if (dyC < 0.0 || dyC >= ${a}(uniforms.Dy_shape[${m}]) ||
                  fract(dyC) > 0.0 || wCPerm < 0) {
                continue;
              }
              let idyC: u32 = u32(dyC);
              var inputChannel = groupId * uniforms.input_channels_per_group;
              for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + 1) {
                let xValue = ${l?$.get("batch","idyR","idyC","inputChannel"):$.get("batch","inputChannel","idyR","idyC")};
                let wValue = ${g.get("inputChannel","wOutChannel","u32(wRPerm)","u32(wCPerm)")};
                dotProd = dotProd + xValue * wValue;
                inputChannel = inputChannel + 1;
              }
            }
          }
          let value = dotProd + ${n?"bias[d1]":`${a}(0.0)`};
          ${v.setByOffset("global_idx","value")};
        `;return`
  ${e.registerUniforms(d).declareVariables(...x,v)}
  ${w}

    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
  ${i?S:T}}`},vo=(e,t,r)=>{let n=e.length>2,o=t.outputShape,i=k.size(o),a=[Math.ceil(i/64),1,1];de("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${a}`);let d=t.format==="NHWC",l=["rank","rank"],c=[t.strides[0],t.strides[1]],m=[t.kernelShape[d?1:2],t.kernelShape[d?2:3]],u=[t.dilations[0],t.dilations[1]],h=[m[0]+(t.dilations[0]<=1?0:(t.kernelShape[d?1:2]-1)*(t.dilations[0]-1)),m[1]+(t.dilations[1]<=1?0:(t.kernelShape[d?2:3]-1)*(t.dilations[1]-1))],w=[h[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),h[1]-1-Math.floor(t.pads[1]+t.pads[3])/2],b=!1,g=t.group,$=e[1].dims,x=$[0]/g,v=$[1],S=[{type:12,data:i},{type:12,data:c},{type:12,data:m},{type:12,data:u},{type:12,data:h},{type:6,data:w},{type:12,data:x},{type:12,data:v},...V(e[0].dims,e[1].dims)];n&&(S.push(...V(e[2].dims)),l.push("rank")),S.push(...V(o));let T=a[1]===1&&a[2]===1,C=A=>{let P=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:c.length},{name:"filter_dims",type:"u32",length:m.length},{name:"dilations",type:"u32",length:m.length},{name:"effective_filter_dims",type:"u32",length:h.length},{name:"pads",type:"i32",length:w.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],D=ge(e[0].dataType);return`${ef(A,e,o,n,T,b,D,P,d)}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};`,inputDependencies:l},getRunData:()=>({dispatchGroup:{x:a[0],y:a[1],z:a[2]},outputs:[{dims:r?r(o):o,dataType:e[0].dataType}],programUniforms:S}),getShaderSource:C}}});var tf,rf,nf,Yu,Zu,of,af,sf,uf,Xu,Qu=M(()=>{"use strict";ju();Ku();dt();ut();tf=(e,t,r,n,o,i)=>(e-1)*t+r+(n-1)*o+1-i,rf=(e,t,r,n,o)=>{let i=Math.floor(e/2);t==="SAME_UPPER"?(r[n]=i,r[o]=e-i):t==="SAME_LOWER"&&(r[n]=e-i,r[o]=i)},nf=(e,t,r,n,o,i,a,d,l,c)=>{let m=e.length-2,u=c.length===0;l.length<m&&l.push(...Array(m-l.length).fill(0));let h=e[0],w=t[d?3:1]*o;for(let b=0,g=e.length-m-(d?1:0);b<m;++b,++g){let $=e[g],x=u?$*a[b]:c[b],v=tf($,a[b],i[b],t[g],r[b],x);rf(v,n,i,b,b+m),u&&c.push(a[b]*($-1)+l[b]+(t[g]-1)*r[b]+1-i[b]-i[b+m])}c.splice(0,0,h),c.splice(d?3:1,0,w)},Yu=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((u,h)=>u*h,1)===0){r.length=0;for(let u=2;u<t[1].dims.length;++u)r.push(t[1].dims[u])}let n=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let o=e.pads.slice(),i=e.outputShape.slice(),a=e.outputPadding.slice(),d=t[0].dims,l=e.dilations.slice();if(l.reduce((u,h)=>u+h,0)===0){let u=t[0].dims.length-2;l=new Array(u).fill(1)}let c=e.strides.slice();if(c.reduce((u,h)=>u+h,0)===0){let u=t[0].dims.length-2;c=new Array(u).fill(1)}nf(d,r,l,e.autoPad,e.group,o,c,n,a,i);let m=Object.assign({},e);return Object.assign(m,{kernelShape:r,pads:o,outputPadding:a,outputShape:i,dilations:l,strides:c}),m},Zu=e=>{let t=Yr(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,i=e.group,a=e.kernelShape,d=e.pads,l=e.strides,c=e.wIsConst(),m=e.outputPadding,u=e.outputShape;return{autoPad:n,format:r,dilations:o,group:i,kernelShape:a,outputPadding:m,outputShape:u,pads:d,strides:l,wIsConst:c,...t,cacheKey:`${e.format};${t.activation};`}},of=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[0];if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==o))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((m,u)=>m+u,0)>0&&t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.reduce((m,u)=>m+u,0)>0&&t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.reduce((m,u)=>m+u,0)>0&&t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.outputPadding.length!==i&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((m,u)=>m+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},af=[2,3,1,0],sf=(e,t,r)=>{let n=Yu(r,t),o=r.format==="NHWC",i=n.outputShape,a=i[o?3:1],d=t[0].dims[o?3:1];if(n.group!==1||a===1&&d===1){e.compute(vo(t,n));return}let l=i[o?1:2],c=i[o?2:3],m=t[1].dims[2],u=t[1].dims[3],h=o?l*c:a,w=o?a:l*c,b=m*u*d,g=!0,$=e.kernelCustomData.wT??e.compute(Ee(t[1],af),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let x=[t[0],$],v=t.length===3;v&&(!o&&t[2].dims.length===1?x.push(t[2].reshape([t[2].dims[0],1,1])):x.push(t[2])),e.compute(qu(x,n,i,h,w,b,v,g),{inputs:x})},uf=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=t.kernelShape;(o.length===0||o[0]===0)&&(o=[e.inputs[1].dims[2]]);let i=t.dilations;(i.length===0||i[0]===0)&&(i=[1]);let a=t.strides;(a.length===0||a[0]===0)&&(a=[1]);let d=t.pads;d.length===0&&(d=[0,0]),d=[0,d[0],0,d[1]],a=[1].concat(a),i=[1].concat(i),o=[1].concat(o);let l=Yu({...t,pads:d,strides:a,dilations:i,kernelShape:o},n);e.compute(vo(n,l,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]]))},Xu=(e,t)=>{of(e.inputs,t),e.inputs[0].dims.length===3?uf(e,t):sf(e,e.inputs,t)}});var df,Ju,ed,td=M(()=>{"use strict";te();ae();Ce();se();df=(e,t,r,n)=>{let o=k.size(t),i=t.length,a=E("input",e,i),d=R("output",e,i),l=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),c=k.normalizeAxis(l,i),m=u=>{let h=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,w=j("uniforms.input_shape","uniforms.axis",i),b=n.reverse?h+(n.exclusive?" + 1":""):"0",g=n.reverse?w:h+(n.exclusive?"":" + 1");return`
                ${u.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,d)}
                ${u.mainStart()}
                  ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${d.offsetToIndices("global_idx")};
                  var sum = ${d.type.value}(0);
                  let first : i32 = ${b};
                  let last : i32 = ${g};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${d.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:c},...V(t,t)]}),getShaderSource:m}},Ju=(e,t)=>{let r=e.inputs[0].dims,n=e.inputs[0].dataType,o=e.inputs[1];e.compute(df(n,r,o,t),{inputs:[0]})},ed=e=>{let t=e.exclusive===1,r=e.reverse===1;return re({exclusive:t,reverse:r})}});var lf,cf,pf,rd,nd,od=M(()=>{"use strict";te();ae();Ce();se();lf=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},cf=(e,t,r,n)=>{let o=[];o.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<t;++i)o.push(r.indicesSet("a",e[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},pf=(e,t)=>{let r,n,o,i,a,d,l=t.format==="NHWC",c=t.blocksize,m=t.mode==="DCR";l?([r,n,o,i]=e.dims,a=m?[r,n,o,c,c,i/c**2]:[r,n,o,i/c**2,c,c],d=m?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,o,i]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],a=m?[r,c,c,i/c**2,n,o]:[r,i/c**2,c,c,n,o],d=m?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let u=e.reshape(a),h=u.dims.length,w=e.dataType,b=E("a",w,h),g=R("output",w,h),$=x=>`
  ${x.registerUniform("output_size","u32").declareVariables(b,g)}

  ${cf(d,h,b,g)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${g.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${g.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:x=>{let v=l?[r,n*c,o*c,i/c**2]:[r,i/c**2,n*c,o*c],S=k.size(v),T=u.dims,C=k.sortBasedOnPerm(T,d);return{outputs:[{dims:v,dataType:x[0].dataType}],dispatchGroup:{x:Math.ceil(S/64)},programUniforms:[{type:12,data:S},...V(T,C)]}},getShaderSource:$}},rd=(e,t)=>{lf(e.inputs),e.compute(pf(e.inputs[0],t))},nd=e=>re({blocksize:e.blocksize,mode:e.mode,format:e.format})});var $o,en,id,mf,ff,xo,So,ad,hf,sd,ud,dd=M(()=>{"use strict";te();ae();Ce();se();$o="[a-zA-Z]|\\.\\.\\.",en="("+$o+")+",id="^"+en+"$",mf="("+en+",)*"+en,ff="^"+mf+"$",xo=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,r){let n=this.symbolToIndices.get(t);n===void 0?n=[r]:n.push(r),this.symbolToIndices.set(t,n)}},So=class{constructor(t,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,o]=r.includes("->")?r.split("->",2):[r,""];if(!n.match(RegExp(ff)))throw new Error("Invalid LHS term");if(n.split(",").forEach((d,l)=>{let c=t[l].dims.slice();if(!d.match(RegExp(id)))throw new Error("Invalid LHS term");let m=this.processTerm(d,!0,c,l);this.lhs.push(m)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([d,l])=>l.count===1||d==="...").map(([d])=>d).join("");else if(!o.match(RegExp(en)))throw new Error("Invalid RHS");o.match(RegExp($o,"g"))?.forEach(d=>{if(d==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let l=this.symbolToInfo.get(d);if(l===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(l.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(t,r,n){let o=this.symbolToInfo.get(t);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(n)}else o={count:1,dimValue:r,inputIndices:[n]};this.symbolToInfo.set(t,o)}processTerm(t,r,n,o=-1){let i=n.length,a=!1,d=[],l=0;if(!t.match(RegExp(id))&&!r&&t!=="")throw new Error("Invalid LHS term");let c=t.match(RegExp($o,"g")),m=new xo(o);return c?.forEach((u,h)=>{if(u==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let w=i-c.length+1;if(w<0)throw new Error("Ellipsis out of bounds");if(d=n.slice(l,l+w),this.hasEllipsis){if(this.ellipsisDims.length!==d.length||this.ellipsisDims.toString()!==d.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=d;else throw new Error("Ellipsis must be specified in the LHS");for(let b=0;b<d.length;b++){let g=String.fromCharCode("0".charCodeAt(0)+b);m.addSymbol(g,h+b),this.addSymbol(g,n[l++],o)}}else m.addSymbol(u,h+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(u,n[l++],o)}),m}},ad=e=>e+"_max",hf=(e,t,r,n)=>{let i=e.map(m=>m.length).map((m,u)=>E(`input${u}`,t,m)),a=k.size(n),d=R("output",t,n.length),l=[...r.symbolToInfo.keys()].filter(m=>!r.rhs.symbolToIndices.has(m)),c=m=>{let u=[],h="var prod = 1.0;",w="var sum = 0.0;",b="sum += prod;",g=[],$=[],x=[],v=[],S=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((C,A)=>{if(r.rhs.symbolToIndices.has(A)){let P=r.rhs.symbolToIndices.get(A)?.[0];P!==void 0&&r.lhs.forEach((D,N)=>{if(C.inputIndices.includes(N)){let G=D.symbolToIndices.get(A);if(G===void 0)throw new Error("Invalid symbol error");G.forEach(q=>{u.push(`${i[N].indicesSet(`input${N}Indices`,q,d.indicesGet("outputIndices",P))}`)})}})}else r.lhs.forEach((P,D)=>{if(C.inputIndices.includes(D)){let N=P.symbolToIndices.get(A);if(N===void 0)throw new Error("Invalid symbol error");N.forEach(G=>{g.push(`${i[D].indicesSet(`input${D}Indices`,G,`${A}`)}`)}),v.push(`prod *= ${i[D].getByIndices(`input${D}Indices`)};`)}}),$.push(`for(var ${A}: u32 = 0; ${A} < uniforms.${ad(A)}; ${A}++) {`),x.push("}")});let T=S?[...u,`let sum = ${i.map((C,A)=>C.getByIndices(`input${A}Indices`)).join(" * ")};`]:[...u,w,...$,...g,h,...v,b,...x];return`
            ${m.registerUniforms(l.map(C=>({name:`${ad(C)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,d)}

            ${m.mainStart()}
            ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${d.offsetToIndices("global_idx")};
            ${i.map((C,A)=>`var input${A}Indices: ${i[A].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${d.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let m=l.filter(h=>r.symbolToInfo.has(h)).map(h=>({type:12,data:r.symbolToInfo.get(h)?.dimValue||0}));m.push({type:12,data:a});let u=e.map((h,w)=>[...V(h)]).reduce((h,w)=>h.concat(w),m);return u.push(...V(n)),{outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:u}},getShaderSource:c}},sd=(e,t)=>{let r=new So(e.inputs,t.equation),n=r.outputDims,o=e.inputs.map((i,a)=>i.dims);e.compute(hf(o,e.inputs[0].dataType,r,n))},ud=e=>{let t=e.equation.replace(/\s+/g,"");return re({equation:t})}});var gf,ld,bf,yf,cd,pd=M(()=>{"use strict";te();ae();se();gf=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,o=t.length<r.length?0:t.length-r.length;for(;n<r.length&&o<t.length;++n,++o)if(r[n]!==t[o]&&r[n]!==1&&t[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},ld=(e,t)=>{let r=e.length-t.length,n=[];for(let o=0;o<r;++o)n.push(e[o]);for(let o=0;o<t.length;++o)n.push(t[o]===1?e[o+r]:t[o]);return n},bf=(e,t)=>e.length>t.length?ld(e,t):ld(t,e),yf=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=bf(t,r),o=e[0].dataType,i=o===9?4:1,a=Math.ceil(k.size(n)/i),d=c=>{let m=E("input",o,t.length,i),u=R("output",o,n.length,i),h;if(o===9){let w=(b,g,$="")=>`
          let outputIndices${g} = ${u.offsetToIndices(`outputOffset + ${g}u`)};
          let offset${g} = ${m.broadcastedIndicesToOffset(`outputIndices${g}`,u)};
          let index${g} = offset${g} / 4u;
          let component${g} = offset${g} % 4u;
          ${b}[${g}] = ${$}(${m.getByOffset(`index${g}`)}[component${g}]);
        `;h=`
        let outputOffset = global_idx * ${i};
        var data = vec4<u32>(0);
        ${w("data",0,"u32")}
        ${w("data",1,"u32")}
        ${w("data",2,"u32")}
        ${w("data",3,"u32")}
        ${u.setByOffset("global_idx","data")}
      }`}else h=`
        let outputIndices = ${u.offsetToIndices("global_idx")};
        let inputOffset = ${m.broadcastedIndicesToOffset("outputIndices",u)};
        ${u.setByOffset("global_idx",m.getByOffset("inputOffset"))}
      }`;return`
    ${c.registerUniform("vec_size","u32").declareVariables(m,u)}
    ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${h}`},l=[{type:12,data:a},...V(t,n)];return{name:"Expand",shaderCache:{hint:`${n.length}`,inputDependencies:["rank"]},getShaderSource:d,getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l})}},cd=e=>{gf(e.inputs),e.compute(yf(e.inputs),{inputs:[0]})}});var wf,md,fd=M(()=>{"use strict";te();ae();se();Kr();wf=e=>{let t=e[0].dataType,r=k.size(e[0].dims),n=k.size(e[1].dims),o=n%4===0,i=a=>{let d=E("x",t,[1],4),l=E("bias",t,[1],4),c=R("y",t,[1],4),m=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],u=w=>`
      let bias${w}_offset: u32 = (global_idx * 4 + ${w}) % uniforms.bias_size;
      let bias${w} = ${l.getByOffset(`bias${w}_offset / 4`)}[bias${w}_offset % 4];`,h=o?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${u(0)}${u(1)}${u(2)}${u(3)}
      let bias = ${d.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(m).declareVariables(d,l,c)}

    ${po(ke(t))}

    ${a.mainStart(Tt)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${d.getByOffset("global_idx")};
      ${h}
      let x_in = x + bias;
      ${c.setByOffset("global_idx",mo("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/Tt/4)}})}},md=e=>{e.inputs.length<2||k.size(e.inputs[1].dims)===0?cu(e):e.compute(wf(e.inputs))}});var _f,vf,hd,gd,bd=M(()=>{"use strict";te();ae();Ce();se();_f=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},vf=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,i=k.normalizeAxis(t.axis,o),a=r.slice(0);a.splice(i,1,...n);let d=r[i],l=e[0].dataType===9?4:1,c=Math.ceil(k.size(a)/l),m=[{type:12,data:c},{type:6,data:d},{type:12,data:i},...V(e[0].dims,e[1].dims,a)],u=h=>{let w=E("data",e[0].dataType,e[0].dims.length,l),b=E("inputIndices",e[1].dataType,e[1].dims.length),g=R("output",e[0].dataType,a.length,l),$=v=>{let S=n.length,T=`var indicesIndices${v}  = ${b.type.indices}(0);`;for(let C=0;C<S;C++)T+=`${S>1?`indicesIndices${v}[${C}]`:`indicesIndices${v}`} = ${a.length>1?`outputIndices${v}[uniforms.axis + ${C}]`:`outputIndices${v}`};`;T+=`
          var idx${v} = ${b.getByIndices(`indicesIndices${v}`)};
          if (idx${v} < 0) {
            idx${v} = idx${v} + uniforms.axisDimLimit;
          }
          var dataIndices${v} : ${w.type.indices};
        `;for(let C=0,A=0;C<o;C++)C===i?(T+=`${o>1?`dataIndices${v}[${C}]`:`dataIndices${v}`} = u32(idx${v});`,A+=S):(T+=`${o>1?`dataIndices${v}[${C}]`:`dataIndices${v}`} = ${a.length>1?`outputIndices${v}[${A}]`:`outputIndices${v}`};`,A++);return T},x;if(e[0].dataType===9){let v=(S,T,C="")=>`
          let outputIndices${T} = ${g.offsetToIndices(`outputOffset + ${T}u`)};
          ${$(T)};
          let offset${T} = ${w.indicesToOffset(`dataIndices${T}`)};
          let index${T} = offset${T} / 4u;
          let component${T} = offset${T} % 4u;
          ${S}[${T}] = ${C}(${w.getByOffset(`index${T}`)}[component${T}]);
        `;x=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${v("value",0,"u32")}
        ${v("value",1,"u32")}
        ${v("value",2,"u32")}
        ${v("value",3,"u32")}
        ${g.setByOffset("global_idx","value")}
      `}else x=`
      let outputIndices = ${g.offsetToIndices("global_idx")};
      ${$("")};
      let value = ${w.getByIndices("dataIndices")};
      ${g.setByOffset("global_idx","value")};
      `;return`
      ${h.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(w,b,g)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${x}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:m}),getShaderSource:u}},hd=e=>re({axis:e.axis}),gd=(e,t)=>{let r=e.inputs;_f(r),e.compute(vf(e.inputs,t))}});var $f,xf,yd,wd,_d=M(()=>{"use strict";te();ae();Ce();se();$f=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=k.normalizeAxis(t.quantizeAxis,e[0].dims.length),n=t.blockSize,o=e[0],i=e[2],a=e.length===4?e[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((d,l)=>l===r?Math.ceil(d/n)===i.dims[l]:d===i.dims[l]).reduce((d,l)=>d&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==i.dims.length||!a.dims.map((d,l)=>d===i.dims[l]).reduce((d,l)=>d&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},xf=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,i=k.normalizeAxis(t.gatherAxis,o),a=k.normalizeAxis(t.quantizeAxis,o),d=r.slice(0);d.splice(i,1,...n);let l=k.size(d),c=e[2].dataType,u=e[0].dataType===22,h=[{type:12,data:l},{type:12,data:a},{type:12,data:i},{type:12,data:t.blockSize},...V(...e.map((b,g)=>b.dims),d)],w=b=>{let g=E("data",e[0].dataType,e[0].dims.length),$=E("inputIndices",e[1].dataType,e[1].dims.length),x=E("scales",e[2].dataType,e[2].dims.length),v=e.length>3?E("zeroPoint",e[3].dataType,e[3].dims.length):void 0,S=R("output",c,d.length),T=[g,$,x];v&&T.push(v);let C=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${b.registerUniforms(C).declareVariables(...T,S)}
        ${b.mainStart()}
        let output_indices = ${S.offsetToIndices("global_idx")};
        var indices_indices = ${$.type.indices}(0);
        ${(()=>n.length>1?`
          for (var i: u32 = 0; i < ${n.length}; i++) {
            let index = ${S.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${$.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${S.indicesGet("output_indices","uniforms.gather_axis")};`)()};
        var data_indices = ${g.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${S.indicesGet("output_indices","i")};
          ${g.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${$.getByIndices("indices_indices")};
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
        let quantize_axis_index = ${x.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${x.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${x.getByIndices("scale_indices")};
        ${(()=>v?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${u?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0")()};
        let dequantized_data = ${ke(c)}(quantized_data - zero_point) * scale;
        ${S.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((b,g)=>g!==1).map(b=>b.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(b,g)=>"rank")},getRunData:()=>({outputs:[{dims:d,dataType:c}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:h}),getShaderSource:w}},yd=(e,t)=>{let r=e.inputs;$f(r,t),e.compute(xf(e.inputs,t))},wd=e=>re({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})});var Sf,Tf,vd,$d,xd=M(()=>{"use strict";te();ae();Ce();se();Sf=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Tf=(e,t)=>{let r=e[0].dims,n=e[0].dataType,o=r.length,i=e[1].dims,a=e[1].dataType,d=k.normalizeAxis(t.axis,o),l=r[d],c=i.slice(0),m=k.size(c),u=E("input",n,o),h=E("indicesInput",a,i.length),w=R("output",n,c.length),b=[{type:12,data:m},{type:6,data:l},{type:12,data:d}];return b.push(...V(r,i,c)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:b}),getShaderSource:x=>`
      ${x.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(u,h,w)}
      ${x.mainStart()}
      ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${w.offsetToIndices("global_idx")};

      var idx = ${h.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${u.type.indices}(outputIndices);
      ${u.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${u.getByIndices("inputIndices")};

      ${w.setByOffset("global_idx","value")};
  }`}},vd=e=>re({axis:e.axis}),$d=(e,t)=>{let r=e.inputs;Sf(r),e.compute(Tf(e.inputs,t))}});var If,Cf,Sd,Td,Id=M(()=>{"use strict";te();ae();se();If=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Cf=(e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[o,i,a]=Lr.getShapeOfGemmResult(r,t.transA,n,t.transB,e.length===3?e[2].dims:void 0),d=[o,i];if(!d)throw new Error("Can't use gemm on the given tensors");let l=k.size(d),c=[{type:12,data:l},{type:12,data:o},{type:12,data:i},{type:12,data:a},{type:1,data:t.alpha},{type:1,data:t.beta}],m=["type","type"];e.length===3&&(c.push(...V(e[2].dims)),m.push("rank")),c.push(...V(d));let u=h=>{let w="";t.transA&&t.transB?w="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?w="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?w="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(w="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let b=t.alpha===1?"":"value *= uniforms.alpha;",g=E("a",e[0].dataType,e[0].dims),$=E("b",e[1].dataType,e[1].dims),x=g.type.value,v=null,S=[g,$];e.length===3&&(v=E("c",e[2].dataType,e[2].dims.length),S.push(v));let T=R("output",e[0].dataType,d.length);S.push(T);let C=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${h.registerUniforms(C).declareVariables(...S)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${x}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${w}
    }

    ${b}
    ${(()=>v!=null?`let cOffset = ${v.broadcastedIndicesToOffset("vec2(m, n)",T)}; value += ${x}(uniforms.beta) * ${v.getByOffset("cOffset")};`:"")()}
    output[global_idx] = value;
  }`};return{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:u}},Sd=e=>{let t=e.transA,r=e.transB,n=e.alpha,o=e.beta;return{transA:t,transB:r,alpha:n,beta:o,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Td=(e,t)=>{If(e.inputs),e.compute(Cf(e.inputs,t))}});var Me,Ef,Ad,Cd,Pf,tr,kd,To=M(()=>{"use strict";te();ae();Ce();Wr();qr();se();ut();Me=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Ef=(e,t)=>{let r=e[0],n=Me(e,1),o=Me(e,2),i=Me(e,3),a=Me(e,4),d=Me(e,5),l=Me(e,6),c=Me(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let m=r.dims[0],u=r.dims[1],h=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],w=u,b=0,g=0,$=Math.floor(h/t.numHeads);if(l&&c&&k.size(l.dims)&&k.size(c.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==m||l.dims[1]!==t.numHeads||l.dims[3]!==$)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(c.dims[0]!==m||c.dims[1]!==t.numHeads||c.dims[3]!==$)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==c.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(c.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');b=l.dims[2],g=l.dims[2]}else if(l&&k.size(l.dims)||c&&k.size(c.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let x;if(n&&k.size(n.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(n.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');x=2,w=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==$)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');x=5,w=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==$)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');x=0,w=n.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');x=3}if(i&&k.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(n&&n.dims.length===5&&n.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let v=b+w,S=0;if(a&&k.size(a.dims)>0){S=8;let P=a.dims;throw P.length===1?P[0]===m?S=1:P[0]===3*m+2&&(S=3):P.length===2&&P[0]===m&&P[1]===v&&(S=5),S===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let T=!1,C=h;if(o&&k.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(w!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');C=o.dims[2]}else{if(w!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');C=o.dims[1]*o.dims[3],T=!0}}let A=!1;if(a&&k.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(d&&k.size(d.dims)>0){if(d.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(d.dims[0]!==m||d.dims[1]!==t.numHeads||d.dims[2]!==u||d.dims[3]!==v)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:m,sequenceLength:u,pastSequenceLength:b,kvSequenceLength:w,totalSequenceLength:v,maxSequenceLength:g,inputHiddenSize:0,hiddenSize:h,vHiddenSize:C,headSize:$,vHeadSize:Math.floor(C/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:S,scale:t.scale,broadcastResPosBias:A,passPastInKv:T,qkvFormat:x}},Ad=e=>re({...e}),Cd=re({perm:[0,2,1,3]}),Pf=(e,t,r,n,o,i,a)=>{let d=[n,o,i],l=k.size(d),c=[{type:12,data:l},{type:12,data:a},{type:12,data:i}],m=u=>{let h=R("qkv_with_bias",t.dataType,d),w=E("qkv",t.dataType,d),b=E("bias",r.dataType,d),g=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${u.registerUniforms(g).declareVariables(w,b,h)}
  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:d,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:m},{inputs:[t,r],outputs:[-1]})[0]},tr=(e,t,r,n,o,i,a,d)=>{let l=i;if(a&&k.size(a.dims)>0){if(n===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=Pf(e,i,a,t,n,r*o,d),l=l.reshape([t,n,r,o]),r===1||n===1?l:e.compute(Ee(l,Cd.perm),{inputs:[l],outputs:[-1]})[0]}else return i.dims.length===3&&(l=i.reshape([t,n,r,o])),r===1||n===1?l:e.compute(Ee(l,Cd.perm),{inputs:[l],outputs:[-1]})[0]},kd=(e,t)=>{let r=Ef(e.inputs,t),n=e.inputs[0],o=Me(e.inputs,1),i=Me(e.inputs,2),a=Me(e.inputs,3),d=Me(e.inputs,4),l=Me(e.inputs,5),c=Me(e.inputs,6),m=Me(e.inputs,7);if(n.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let u=o&&i&&o.dims.length===4&&i.dims.length===4,h=tr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,a,0);if(u)return Rt(e,h,o,i,d,void 0,c,m,l,r);if(!o||!i)throw new Error("key and value must be provided");let w=tr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,a,r.hiddenSize),b=tr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,a,2*r.hiddenSize);Rt(e,h,w,b,d,void 0,c,m,l,r)}});var zf,Of,Df,Bf,Io,Ed,Pd,Co=M(()=>{"use strict";te();ae();Ce();se();zf=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Of=(e,t)=>{let r=[],n=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(o=>r.push(Number(o))),n=r.length),re({numOutputs:n,axis:t.axis,splitSizes:r})},Df=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${j("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Bf=e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let o=e[n].setByIndices("indices","input[global_idx]");t===1?r.push(o):n===0?r.push(`if (output_number == ${n}u) { ${o} }`):n===t-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${n}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Io=(e,t)=>{let r=e[0].dims,n=k.size(r),o=e[0].dataType,i=k.normalizeAxis(t.axis,r.length),a=new Array(t.numOutputs),d=E("input",o,r.length),l=new Array(t.numOutputs),c=[],m=[],u=0,h=[{type:12,data:n}];for(let b=0;b<t.numOutputs;b++){u+=t.splitSizes[b],l[b]=u;let g=r.slice();g[i]=t.splitSizes[b],m.push(g),a[b]=R(`output${b}`,o,g.length),c.push({dims:m[b],dataType:e[0].dataType})}h.push({type:12,data:l},...V(r,...m));let w=b=>`
  ${b.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(d,...a)}
  ${Df(l.length)}
  ${Bf(a)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${d.offsetToIndices("global_idx")};
    var index = ${d.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${j("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${d.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:w,getRunData:()=>({outputs:c,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:h})}},Ed=(e,t)=>{zf(e.inputs);let r=e.inputs.length===1?t:Of(e.inputs,t);e.compute(Io(e.inputs,r),{inputs:[0]})},Pd=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return re({axis:t,numOutputs:n,splitSizes:r})}});var Rf,Mf,zd,Od,Dd=M(()=>{"use strict";Ce();qr();To();Co();ut();Rf=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],n=e[1],o=e[2],i=e[3],a=e[4];if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let d=!1,l=r.dims[0],c=r.dims[1],m=r.dims.length===3?d?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],u=c,h=0,w=!n||n.dims.length===0,b=Math.floor(w?m/(t.numHeads+2*t.kvNumHeads):m/t.numHeads);w&&(m=b*t.numHeads);let g=i&&i.dims.length!==0,$=a&&a.dims.length!==0;if(g&&i.dims.length===4&&i.dims[0]===l&&i.dims[1]!==t.kvNumHeads&&i.dims[2]===t.kvNumHeads&&i.dims[3]===b)throw new Error("BSNH pastKey/pastValue is not supported");if(g&&$){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');h=i.dims[2]}else if(g||$)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(n&&n.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(r.dims[2]%n.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');u=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==b)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');u=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==b)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');u=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let S=0,T=!1,C=t.kvNumHeads?b*t.kvNumHeads:m;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(u!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');C=o.dims[2]}else{if(u!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');C=o.dims[1]*o.dims[3],T=!0}}let A=e.length>4?e[5]:void 0;if(A&&A.dims.length!==1&&A.dims[0]!==l)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');let P=-1,D=-1,N=!1;return{batchSize:l,sequenceLength:c,pastSequenceLength:h,kvSequenceLength:u,totalSequenceLength:P,maxSequenceLength:D,inputHiddenSize:0,hiddenSize:m,vHiddenSize:C,headSize:b,vHeadSize:Math.floor(C/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:S,scale:t.scale,broadcastResPosBias:N,passPastInKv:T,qkvFormat:v}},Mf=re({perm:[0,2,1,3]}),zd=(e,t,r)=>{let n=t,o=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(n=t.reshape([r.batchSize,r.kvSequenceLength,o,r.headSize]),n=e.compute(Ee(n,Mf.perm),{inputs:[n],outputs:[-1]})[0]),n},Od=(e,t)=>{let r=Rf(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let n=e.inputs[0],o=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,i=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,a=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,d=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,c=e.inputs.length>5?e.inputs[6]:void 0,m=r.kvNumHeads?r.kvNumHeads:r.numHeads,u=re({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,m*r.headSize,m*r.headSize]}),[h,w,b]=!o&&!i?e.compute(Io([n],u),{inputs:[n],outputs:[-1,-1,-1]}):[n,o,i],g=tr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,h,void 0,0);Rt(e,g,zd(e,w,r),zd(e,b,r),void 0,void 0,a,d,void 0,r,l,c)}});var Bd,Uf,Vf,Rd,Md=M(()=>{"use strict";te();ae();ut();se();Bd=(e,t,r,n,o,i,a,d)=>{let l=$e(i),c=l===1?"f32":`vec${l}f`,m=l===1?"vec2f":`mat2x${l}f`,u=o*a,h=[o,a,i/l],w=[o,a,2],b=["rank","type","type"],g=[];g.push(...V(h,w));let $=x=>{let v=E("x",t.dataType,3,l),S=E("scale",r.dataType,r.dims),T=E("bias",n.dataType,n.dims),C=R("output",1,3,2),A=[v,S,T,C],P=64;return`
  var<workgroup> workgroup_shared : array<${m}, ${P}>;
  const workgroup_size = ${P}u;
  ${x.declareVariables(...A)}
  ${x.mainStart(P)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${c}(0);
    var squared_sum = ${c}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${c}(${v.get("batch","channel","h")});
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
      let sum_final = ${Ke("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${Ke("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${d}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${d}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:w,dataType:1}],dispatchGroup:{x:u},programUniforms:g}),getShaderSource:$},{inputs:[t,r,n],outputs:[-1]})[0]},Uf=(e,t,r)=>{let n=t[0].dims,o=n,i=2,a=n[0],d=n[1],l=k.sizeFromDimension(n,i),c=$e(l),m=k.size(o)/c,u=Bd(e,t[0],t[1],t[2],a,l,d,r.epsilon),h=[a,d,l/c],w=[a,d],b=["type","none"],g=$=>{let x=E("x",t[0].dataType,h.length,c),v=E("scale_shift",1,w.length,2),S=R("output",t[0].dataType,h.length,c),T=[x,v,S];return`
  ${$.registerUniform("output_size","u32").declareVariables(...T)}
  ${$.mainStart()}
  ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${S.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${v.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${x.getByOffset("global_idx")} * ${S.type.value}(scale_shift.x) + ${S.type.value}(scale_shift.y);
      ${S.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${c}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...V(h,w,h)]}),getShaderSource:g},{inputs:[t[0],u]})},Vf=(e,t,r)=>{let n=t[0].dims,o=n,i=n[0],a=n[n.length-1],d=k.sizeFromDimension(n,1)/a,l=$e(a),c=k.size(o)/l,m=[{type:12,data:d},{type:12,data:Math.floor(a/l)}],u=["type","type"],h=[0,n.length-1];for(let $=0;$<n.length-2;$++)h.push($+1);let w=e.compute(Ee(e.inputs[0],h),{inputs:[e.inputs[0]],outputs:[-1]})[0],b=Bd(e,w,t[1],t[2],i,d,a,r.epsilon),g=$=>{let x=ge(t[0].dataType),v=l===1?"vec2f":`mat${l}x2f`,S=A=>{let P=A===0?"x":"y",D=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${x}(${D}(scale.${P}))`;case 2:return`vec2<${x}>(${D}(scale[0].${P}, scale[1].${P}))`;case 4:return`vec4<${x}>(${D}(scale[0].${P}, scale[1].${P}, scale[2].${P}, scale[3].${P}))`;default:throw new Error(`Not supported compoents ${l}`)}},T=E("input",t[0].dataType,t[0].dims,l),C=R("output",t[0].dataType,o,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${T.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${v}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${C.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${$.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${S(0)}, ${S(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:m}),getShaderSource:g},{inputs:[t[0],b]})},Rd=(e,t)=>{t.format==="NHWC"?Vf(e,e.inputs,t):Uf(e,e.inputs,t)}});var Nf,Wf,Ud,Vd=M(()=>{"use strict";te();ae();se();Nf=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Wf=(e,t,r)=>{let n=t.simplified,o=e[0].dims,i=e[1],a=!n&&e[2],d=o,l=k.normalizeAxis(t.axis,o.length),c=k.sizeToDimension(o,l),m=k.sizeFromDimension(o,l),u=k.size(i.dims),h=a?k.size(a.dims):0;if(u!==m||a&&h!==m)throw new Error(`Size of X.shape()[axis:] == ${m}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${u} and bias size of ${h}`);let w=[];for(let C=0;C<o.length;++C)C<l?w.push(o[C]):w.push(1);let b=$e(m),g=["type","type"],$=[{type:12,data:c},{type:1,data:m},{type:12,data:Math.floor(m/b)},{type:1,data:t.epsilon}];a&&g.push("type");let x=r>1,v=r>2,S=C=>{let A=ge(e[0].dataType),P=[E("x",e[0].dataType,e[0].dims,b),E("scale",i.dataType,i.dims,b)];a&&P.push(E("bias",a.dataType,a.dims,b)),P.push(R("output",e[0].dataType,d,b)),x&&P.push(R("mean_data_output",1,w)),v&&P.push(R("inv_std_output",1,w));let D=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${C.registerUniforms(D).declareVariables(...P)}
  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${ao("f32",b)};
    var mean_square_vector = ${ao("f32",b)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${It(A,b,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Ke("mean_vector",b)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Ke("mean_square_vector",b)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${It(A,b,"x[j + offset]")};
      let f32scale = ${It(A,b,"scale[j]")};
      output[j + offset] = ${P[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${It(A,b,"bias[j]")}`:""}
      );
    }

    ${x?"mean_data_output[global_idx] = mean":""};
    ${v?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},T=[{dims:d,dataType:e[0].dataType}];return x&&T.push({dims:w,dataType:1}),v&&T.push({dims:w,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${b};${r};${n}`,inputDependencies:g},getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(c/64)},programUniforms:$}),getShaderSource:S}},Ud=(e,t)=>{Nf(e.inputs),e.compute(Wf(e.inputs,t,e.outputCount))}});var Lf,Gf,Hf,Nd,Wd,Ld=M(()=>{"use strict";te();ae();Ce();se();Lf=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),i=t.blockSize/8*t.bits,a=e[1];if(!k.areEqual(a.dims,[t.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let l=e[2].dims;if(k.size(l)!==t.n*o)throw new Error("scales input size error.");if(e.length===4){let m=e[3].dims,u=t.bits>4?t.n*o:t.n*Math.floor((o+1)/2);if(k.size(m)!==u)throw new Error("zeroPoints input size error.")}},Gf=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],i=t.k,a=t.n,d=r.slice(0,n-2),l=k.size(d),m=e[1].dims[2]/4,u=e[0].dataType,h=$e(t.k),w=$e(m),b=$e(a),g=d.concat([o,a]),$=o>1&&a/b%2===0?2:1,x=k.size(g)/b/$,v=64,S=[],T=[l,o,i/h],C=k.convertShape(e[1].dims).slice();C.splice(-1,1,m/w),S.push(...V(T)),S.push(...V(C)),S.push(...V(e[2].dims)),e.length===4&&S.push(...V(k.convertShape(e[3].dims)));let A=[l,o,a/b];S.push(...V(A));let P=D=>{let N=T.length,G=E("a",e[0].dataType,N,h),q=E("b",12,C.length,w),K=E("scales",e[2].dataType,e[2].dims.length),W=[G,q,K],J=e.length===4?E("zero_points",12,e[3].dims.length):void 0;J&&W.push(J);let ue=A.length,ee=R("output",e[0].dataType,ue,b),oe=ge(e[0].dataType),X=(()=>{switch(h){case 1:return`array<${oe}, 8>`;case 2:return`mat4x2<${oe}>`;case 4:return`mat2x4<${oe}>`;default:throw new Error(`${h}-component is not supported.`)}})(),Q=()=>{let ce=`
          // reuse a data
            var input_offset = ${G.indicesToOffset(`${G.type.indices}(batch, row, word_offset)`)};
            var a_data: ${X};
            for (var j: u32 = 0; j < ${8/h}; j++) {
              a_data[j] = ${G.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let ne=0;ne<b*$;ne++)ce+=`
            b_value = ${w===1?`b${ne}_data`:`b${ne}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${X}(${Array.from({length:4},(U,H)=>`${oe}(b_value_lower[${H}]), ${oe}(b_value_upper[${H}])`).join(", ")});
            b_dequantized_values = ${(()=>h===1?`${X}(${Array.from({length:8},(U,H)=>`(b_quantized_values[${H}] - ${J?`zero_point${ne}`:"zero_point"}) * scale${ne}`).join(", ")});`:`(b_quantized_values - ${X}(${Array(8).fill(`${J?`zero_point${ne}`:"zero_point"}`).join(",")})) * scale${ne};`)()};
            workgroup_shared[local_id.x * ${$} + ${Math.floor(ne/b)}]${b>1?`[${ne%b}]`:""} += ${Array.from({length:8/h},(U,H)=>`${h===1?`a_data[${H}] * b_dequantized_values[${H}]`:`dot(a_data[${H}], b_dequantized_values[${H}])`}`).join(" + ")};
          `;return ce},ye=()=>{let ce=`
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
            let zero_point = ${oe}(8);`}
            `;for(let ne=0;ne<b*$;ne++)ce+=`
            let scale${ne} = ${K.getByOffset("col_index * nBlocksPerCol + block")};
            ${J?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${J.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${ne} = ${oe}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return ce},we=()=>{let ce=`col_index = col * ${b};`;for(let ne=0;ne<b*$;ne++)ce+=`
            let b${ne}_data = ${q.getByIndices(`${q.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return ce+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${X};
            var b_dequantized_values: ${X};`,ce};return`
        var<workgroup> workgroup_shared: array<${ee.type.value}, ${$*v}>;
        ${D.declareVariables(...W,ee)}
        ${D.mainStart([v,1,1])}
          let output_indices = ${ee.offsetToIndices(`(global_idx / ${v}) * ${$}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/h};
            ${ye()}
            for (var word: u32 = 0; word < ${m}; word += ${w}) {
              ${we()}
              for (var i: u32 = 0; i < ${w}; i++) {
                ${Q()}
                word_offset += ${8/h};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${$}) {
            var output_value: ${ee.type.value} = ${ee.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${$};
            }
            ${ee.setByIndices(`${ee.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${h};${w};${b};${$};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:g,dataType:u}],dispatchGroup:{x},programUniforms:S}),getShaderSource:P}},Hf=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],i=t.k,a=t.n,d=r.slice(0,n-2),l=k.size(d),m=e[1].dims[2]/4,u=e[0].dataType,h=$e(t.k),w=$e(m),b=d.concat([o,a]),g=128,$=a%8===0?8:a%4===0?4:1,x=g/$,v=x*w*8,S=v/h,T=v/t.blockSize,C=k.size(b)/$,A=[],P=[l,o,i/h],D=k.convertShape(e[1].dims).slice();D.splice(-1,1,m/w),A.push(...V(P)),A.push(...V(D)),A.push(...V(e[2].dims)),e.length===4&&A.push(...V(k.convertShape(e[3].dims)));let N=[l,o,a];A.push(...V(N));let G=q=>{let K=P.length,W=E("a",e[0].dataType,K,h),J=E("b",12,D.length,w),ue=E("scales",e[2].dataType,e[2].dims.length),ee=[W,J,ue],oe=e.length===4?E("zero_points",12,e[3].dims.length):void 0;oe&&ee.push(oe);let X=N.length,Q=R("output",e[0].dataType,X),ye=ge(e[0].dataType),we=()=>{switch(h){case 1:return`
          let a_data0 = vec4<${ye}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ye}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${ye}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ye}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${h}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${W.type.value}, ${S}>;
        var<workgroup> inter_results: array<array<${Q.type.value}, ${x}>, ${$}>;
        ${q.declareVariables(...ee,Q)}
        ${q.mainStart([x,$,1])}
          let output_indices = ${Q.offsetToIndices(`workgroup_index * ${$}`)};
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
            ${oe?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${oe.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${ye}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${ye}(8);`}
            let scale = ${ue.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${J.getByIndices(`${J.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/h};
            for (var i: u32 = 0; i < ${w}; i++) {
              ${we()}
              let b_value = ${w===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${ye}>(${Array.from({length:4},(ce,ne)=>`${ye}(b_value_lower[${ne}]), ${ye}(b_value_upper[${ne}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${ye}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(ce,ne)=>`${`dot(a_data${ne}, b_dequantized_values[${ne}])`}`).join(" + ")};
              word_offset += ${8/h};
            }
            workgroupBarrier();
          }

          if (local_idx < ${$}) {
            var output_value: ${Q.type.value} = ${Q.type.value}(0);
            for (var b = 0u; b < ${x}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${Q.setByIndices(`${Q.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${h};${w};${x};${$}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:b,dataType:u}],dispatchGroup:{x:C},programUniforms:A}),getShaderSource:G}},Nd=(e,t)=>{Lf(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Hf(e.inputs,t)):e.compute(Gf(e.inputs,t))},Wd=e=>re(e)});var Ff,qf,jf,Kf,Yf,Zf,Xf,Qf,Gd,Hd=M(()=>{"use strict";te();ae();se();Ff=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},qf=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
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
      `},jf=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
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
          `},Kf=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
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
          `},Yf=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
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
          `},Zf=(e,t,r)=>{switch(r.mode){case 0:return qf(e,t,r.pads.length);case 1:return jf(e,t,r.pads.length);case 2:return Kf(e,t,r.pads.length);case 3:return Yf(e,t,r.pads.length);default:throw new Error("Invalid mode")}},Xf=(e,t)=>{let r=k.padShape(e[0].dims.slice(),t.pads),n=e[0].dims,o=k.size(r),i=[{type:12,data:o},{type:6,data:t.pads}],a=e.length>=3&&e[2].data;t.mode===0&&i.push({type:a?e[2].dataType:1,data:t.value}),i.push(...V(e[0].dims,r));let d=["rank"],l=c=>{let m=R("output",e[0].dataType,r.length),u=E("x",e[0].dataType,n.length),h=u.type.value,w=Zf(m,n.length,t),b=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&b.push({name:"constant_value",type:a?h:"f32"}),`
            ${c.registerUniforms(b).declareVariables(u,m)}
            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${m.offsetToIndices("global_idx")};

            var value = ${h}(0);
            ${w}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${a}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(r)/64)},programUniforms:i}),getShaderSource:l}},Qf=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,o=e[0].dims.length,i=new Int32Array(2*o).fill(0);if(e.length>=4){let d=e[3].getBigInt64Array();for(let l=0;l<d.length;l++)i[Number(d[l])]=Number(r[l]),i[Number(d[l])+o]=Number(r[l+d.length])}else r.forEach((d,l)=>i[Number(l)]=Number(d));let a=[];return i.forEach(d=>a.push(d)),{mode:t.mode,value:n,pads:a}}else return t},Gd=(e,t)=>{Ff(e.inputs);let r=Qf(e.inputs,t);e.compute(Xf(e.inputs,r),{inputs:[0]})}});var tn,Fd,qd,jd,Kd,Jf,eh,Yd,Zd,Xd,Qd,Jd,el,tl,rl,nl,ol,il,al,sl=M(()=>{"use strict";Fe();te();ae();se();tn=e=>{if(xe.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Fd=(e,t,r)=>{let n=t.format==="NHWC",o=e.dims.slice();n&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(t,"dilations"),a=t.kernelShape.slice(),d=t.strides.slice(),l=i?t.dilations.slice():[],c=t.pads.slice();St.adjustPoolAttributes(r,o,a,d,l,c);let m=St.computePoolOutputShape(r,o,d,l,a,c,t.autoPad),u=Object.assign({},t);i?Object.assign(u,{kernelShape:a,strides:d,pads:c,dilations:l,cacheKey:t.cacheKey}):Object.assign(u,{kernelShape:a,strides:d,pads:c,cacheKey:t.cacheKey});let h=m.slice();return h.push(h.splice(1,1)[0]),[u,n?h:m]},qd=(e,t)=>{let r=t.format==="NHWC",n=k.size(e),o=k.size(t.kernelShape),i=[{type:12,data:n},{type:12,data:o}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let d=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],c=t.pads[t.pads.length/2-1],m=t.pads[t.pads.length-1],u=!!(c+m);i.push({type:12,data:d},{type:12,data:l},{type:12,data:c},{type:12,data:m}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let h=!1;if(t.kernelShape.length===2){let w=t.kernelShape[t.kernelShape.length-2],b=t.strides[t.strides.length-2],g=t.pads[t.pads.length/2-2],$=t.pads[t.pads.length-2];h=!!(g+$),i.push({type:12,data:w},{type:12,data:b},{type:12,data:g},{type:12,data:$}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,u,h]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let d=k.computeStrides(t.kernelShape);i.push({type:12,data:d},{type:12,data:t.pads},{type:12,data:t.strides}),a.push({name:"kernelStrides",type:"u32",length:d.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((c,m)=>c+m);return[i,a,!!l,!1,!1]}},jd=(e,t,r,n,o,i,a,d,l,c,m,u)=>{let h=o.format==="NHWC",w=t.type.value,b=R("output",t.type.tensor,n);if(o.kernelShape.length<=2){let g="",$="",x="",v=r-(h?2:1);if(m?g=`
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
                }`,o.kernelShape.length===2){let T=r-(h?3:2);u?$=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${T}] < 0 || xIndices[${T}] >= uniforms.x_shape[${T}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:$=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                `,x=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,b)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${b.offsetToIndices("global_idx")};
              var xIndices = ${b.offsetToIndices("global_idx")};

              var value = ${w}(${d});
              var pad = 0;
              ${$}
              ${g}
              ${x}
              ${a}

              output[global_idx] = value;
            }`}else{if(h)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let g=o.kernelShape.length,$=o.pads.length,x="";return c?x=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${i}
              }`:x=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${e.registerUniforms(l).declareVariables(t,b)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${b.offsetToIndices("global_idx")};
              var xIndices = ${b.offsetToIndices("global_idx")};

              var offsets: array<u32, ${g}>;

              var value = ${w}(${d});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${g-1}u; j++) {
                  offsets[j] = offset / ${j("uniforms.kernelStrides","j",g)};
                  offset -= offsets[j] * ${j("uniforms.kernelStrides","j",g)};
                }
                offsets[${g-1}] = offset;

                isPad = false;
                for (var j = ${r-g}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${j("uniforms.strides",`j - ${r-g}u`,g)}
                    + offsets[j - ${r-g}u] - ${j("uniforms.pads","j - 2u",$)};
                  ${x}
              }
              ${a}

              output[global_idx] = value;
            }`}},Kd=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Jf=e=>`${Kd(e)};${e.countIncludePad}`,eh=e=>`${Kd(e)};${e.storageOrder};${e.dilations}`,Yd=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Zd=(e,t,r,n)=>{let[o,i]=Fd(t,n,r),a=E("x",t.dataType,t.dims.length),d=a.type.value,l="value += x_val;",c="";o.countIncludePad?c+=`value /= ${d}(uniforms.kernelSize);`:c+=`value /= ${d}(i32(uniforms.kernelSize) - pad);`;let[m,u,h,w,b]=qd(i,o);m.push(...V(t.dims,i));let g=["rank"];return{name:e,shaderCache:{hint:`${n.cacheKey};${h};${w};${b}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:m}),getShaderSource:$=>jd($,a,t.dims.length,i.length,o,l,c,0,u,h,w,b)}},Xd=e=>{let t=e.count_include_pad!==0,r=Yd(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:t,...r,cacheKey:""};return{...n,cacheKey:Jf(n)}},Qd=(e,t)=>{tn(e.inputs),e.compute(Zd("AveragePool",e.inputs[0],!1,t))},Jd={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},el=e=>{let t=e.format;return{format:t,...Jd,cacheKey:t}},tl=(e,t)=>{tn(e.inputs),e.compute(Zd("GlobalAveragePool",e.inputs[0],!0,t))},rl=(e,t,r,n)=>{let[o,i]=Fd(t,n,r),a=`
      value = max(x_val, value);
    `,d="",l=E("x",t.dataType,t.dims.length),c=["rank"],[m,u,h,w,b]=qd(i,o);return m.push(...V(t.dims,i)),{name:e,shaderCache:{hint:`${n.cacheKey};${h};${w};${b}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:m}),getShaderSource:g=>jd(g,l,t.dims.length,i.length,o,a,d,t.dataType===10?-65504:-1e5,u,h,w,b)}},nl=(e,t)=>{tn(e.inputs),e.compute(rl("MaxPool",e.inputs[0],!1,t))},ol=e=>{let t=e.storage_order,r=e.dilations,n=Yd(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:r,...n,cacheKey:""};return{...o,cacheKey:eh(o)}},il=e=>{let t=e.format;return{format:t,...Jd,cacheKey:t}},al=(e,t)=>{tn(e.inputs),e.compute(rl("GlobalMaxPool",e.inputs[0],!0,t))}});var rh,nh,ul,dl,ll=M(()=>{"use strict";te();ae();Ce();se();rh=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,n)=>r===e[2].dims[n]).reduce((r,n)=>r&&n,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((o,i)=>i===t.axis||o===e[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],n=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/n)||t.blockSize>Math.ceil(r/(n-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},nh=(e,t)=>{let r=k.normalizeAxis(t.axis,e[0].dims.length),n=e[0].dataType,o=n===3,i=e[0].dims,a=e[1].dataType,d=k.size(i),l=n===3||n===2,c=l?[Math.ceil(k.size(e[0].dims)/4)]:e[0].dims,m=e[1].dims,u=e.length>2?e[2]:void 0,h=u?l?[Math.ceil(k.size(u.dims)/4)]:u.dims:void 0,w=m.length===0||m.length===1&&m[0]===1,b=w===!1&&m.length===1,g=$e(d),$=w&&(!l||g===4),x=$?g:1,v=$&&!l?g:1,S=E("input",l?12:n,c.length,v),T=E("scale",a,m.length),C=u?E("zero_point",l?12:n,h.length):void 0,A=R("output",a,i.length,x),P=[S,T];C&&P.push(C);let D=[c,m];u&&D.push(h);let N=[{type:12,data:d/x},{type:12,data:r},{type:12,data:t.blockSize},...V(...D,i)],G=q=>{let K=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${q.registerUniforms(K).declareVariables(...P,A)}
      ${q.mainStart()}
          ${q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${A.offsetToIndices("global_idx")};

          // Set input x
          ${(()=>l?`
            let input = ${S.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${x===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${S.getByOffset("global_idx")};`)()};

          // Set scale input
          ${(()=>w?`let scale_value= ${T.getByOffset("0")}`:b?`
            let scale_index = ${A.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${T.getByOffset("scale_index")};`:`
            var scale_indices: ${T.type.indices} = output_indices;
            let index = ${T.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${T.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${T.getByIndices("scale_indices")};`)()};

          // Set zero-point input
          ${(()=>C?w?l?`
                let zero_point_input = ${C.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${C.getByOffset("0")}`:b?l?`
                let zero_point_index = ${A.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${C.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${A.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${C.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${T.indicesToOffset("scale_indices")};
                let zero_point_input = ${C.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${C.getByIndices("scale_indices")};`:`let zero_point_value = ${l?o?"i32":"u32":S.type.value}(0);`)()};
      // Compute and write output
      ${A.setByOffset("global_idx",`${A.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:C?["rank","rank","rank"]:["rank","rank"]},getShaderSource:G,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(d/x/64),y:1,z:1},programUniforms:N})}},ul=(e,t)=>{rh(e.inputs,t),e.compute(nh(e.inputs,t))},dl=e=>re({axis:e.axis,blockSize:e.blockSize})});var oh,ih,cl,pl=M(()=>{"use strict";Fe();te();se();oh=(e,t,r)=>{let n=e===t,o=e<t&&r<0,i=e>t&&r>0;if(n||o||i)throw new Error("Range these inputs' contents are invalid.")},ih=(e,t,r,n)=>{let o=Math.abs(Math.ceil((t-e)/r)),i=[o],a=o,d=[{type:12,data:a},{type:n,data:e},{type:n,data:r},...V(i)],l=c=>{let m=R("output",n,i.length),u=m.type.value,h=[{name:"outputSize",type:"u32"},{name:"start",type:u},{name:"delta",type:u}];return`
        ${c.registerUniforms(h).declareVariables(m)}
        ${c.mainStart()}
        ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${u}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:i,dataType:n}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d})}},cl=e=>{let t=0,r=0,n=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],n=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],n=e.inputs[2].getFloat32Array()[0]),xe.webgpu.validateInputContent&&oh(t,r,n),e.compute(ih(t,r,n,e.inputs[0].dataType),{inputs:[]})}});var ah,sh,uh,dh,lh,ch,ph,mh,fh,hh,gh,ml,bh,yh,wh,_h,vh,fl,hl,gl=M(()=>{"use strict";te();ae();Ce();se();ah=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},sh=(e,t,r)=>{t.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let n=new Array(r).fill(1);return t.forEach((o,i)=>n[o]=e[i]),n},uh=(e,t,r,n,o,i)=>{let[a,d,l]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],c=e[0].dims.length;if(a>0&&e.length>a&&e[a].dims.length>0)e[a].getFloat32Array().forEach(m=>i.push(m));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(d>0&&e.length>d&&e[d].dims.length===1&&e[d].dims[0]>0){if(e[d].getFloat32Array().forEach(m=>n.push(m)),n.length!==0&&n.length!==c&&r>=18&&n.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");ah(n,t),t.axes.length>0&&sh(n,t.axes,c).forEach((m,u)=>n[u]=m)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(m=>o.push(Number(m))),o.length!==0&&o.length!==c&&r>=18&&o.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof n<"u"&&typeof o<"u"&&n.length>0&&o.length>c)throw new Error("Resize requires only of scales or sizes to be specified")},dh=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",lh=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",ch=(e,t,r)=>{let n=new Array(r).fill(0).concat(new Array(r).fill(1)),o=e.length===0?n:e.slice();return t.length>0?(t.forEach((i,a)=>{n[i]=o[a],n[a+r]=o[t.length+a]}),n):o},ph=(e,t,r,n)=>{let o=[];if(r.length>0)if(n.length>0){if(e.forEach(i=>o.push(i)),Math.max(...n)>e.length)throw new Error("axes is out of bound");n.forEach((i,a)=>o[i]=r[a])}else r.forEach(i=>o.push(i));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");o=e.map((i,a)=>Math.round(i*t[a]))}return o},mh=(e,t,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>t[i]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>t[i]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return r.axes.length>0?(r.axes.forEach(i=>t[i]=n),r.axes.forEach(i=>o[i]=Math.round(e[i]*t[i]))):(t.fill(n,0,t.length),o.forEach((i,a)=>o[a]=Math.round(i*t[a]))),o},fh=(e,t,r,n,o)=>`
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
    }`,hh=(e,t,r,n,o,i,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${j("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${j("uniforms.roi","i",i)};
          var roi_hi = ${j("uniforms.roi",`i + ${r.length}`,i)};
          var input_shape_i = ${j("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${j("uniforms.output_shape","i",n.length)};
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
    }`,gh=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${j("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,ml=(e,t,r,n)=>e.rank>n?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",bh=(e,t,r,n,o)=>{let[a,d,l,c]=r.length===2?[-1,0,1,-1]:[0,2,3,1],m=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${m} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",d,`max(0, min(row, ${r[d]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(col, ${r[l]} - 1))`)};
      ${ml(e,c,a,2)}
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
      var channel: u32 = ${r.length>2?`u32(originalIndices[${c}])`:"0"};
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
    }`},yh=(e,t,r,n,o,i,a,d,l,c)=>{let m=r.length===2,u=!0,[h,w]=m?[0,1]:u?[2,3]:[1,2],b=e.type.value,g=$=>{let x=$===h?"row":"col";return`
      fn ${x}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${b} {
        var output_index = ${t.indicesGet("output_indices",$)};
        var originalIdx: ${b} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[$]},
        ${n[$]}, ${r[$]}, ${i[$]}, ${i[$]} + ${r.length});
        var fractOriginalIdx: ${b} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${d} && (originalIdx < 0 || originalIdx > (${r[$]} - 1))) {
          return ${l};
        }
        var data: array<${b}, 4> = array<${b}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${x}: ${b} = originalIdx + ${b}(i);
          if (${x} < 0 || ${x} >= ${r[$]}) {
            ${(()=>c?`coefs[i + 1] = 0.0;
                        continue;`:d?`return ${l};`:`${x} = max(0, min(${x}, ${r[$]} - 1));`)()};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",$,`u32(${x})`)};
          data[i + 1] = ${$===h?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${g(h)};
    ${g(w)};
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

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${b} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},wh=(e,t,r,n,o)=>{let[a,d,l,c,m]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],u=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${u} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",d,`max(0, min(depth, ${r[d]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(height, ${r[l]} - 1))`)};
      ${e.indicesSet("input_indices",c,`max(0, min(width, ${r[c]} - 1))`)};
      ${ml(e,m,a,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${u} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${u} = originalIndices[${d}];
      var height:${u} = originalIndices[${l}];
      var width:${u} = originalIndices[${c}];
      ${n?`if (depth < 0 || depth > (${r[d]} - 1) || height < 0 || height > (${r[l]} - 1) || width < 0 || (width > ${r[c]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${r[d]} - 1));
      height = max(0, min(height, ${r[l]} - 1));
      width = max(0, min(width, ${r[c]} - 1));
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
    }`},_h=(e,t,r,n,o,i)=>{let a=e.dims,d=ch(i,t.axes,a.length),l=ph(a,n,o,t.axes),c=n.slice();n.length===0&&(c=a.map((v,S)=>v===0?1:l[S]/v),t.keepAspectRatioPolicy!=="stretch"&&(l=mh(a,c,t)));let m=R("output",e.dataType,l.length),u=E("input",e.dataType,a.length),h=k.size(l),w=a.length===l.length&&a.every((v,S)=>v===l[S]),b=t.coordinateTransformMode==="tf_crop_and_resize",g=t.extrapolationValue,$=u.type.value,x=v=>`
      ${w?"":`
      ${dh(t.coordinateTransformMode,$)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${gh(u,a)};
              ${lh(t.nearestMode,r,$)};
              ${hh(u,m,a,l,c.length,d.length,b)};
              `;case"linear":return`
              ${fh(m,a,l,c.length,d.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${bh(u,m,a,b,g)}`;if(a.length===3||a.length===5)return`${wh(u,m,a,b,g)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${yh(u,m,a,l,c,d,t.cubicCoeffA,b,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${v.registerUniform("output_size","u32").registerUniform("scales","f32",c.length).registerUniform("roi","f32",d.length).declareVariables(u,m)}
      ${v.mainStart()}
        ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${w?"output[global_idx] = input[global_idx];":`
        let output_indices = ${m.offsetToIndices("global_idx")};
        var input_indices: ${u.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${u.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${c.length>0?c:""}|${o.length>0?o:""}|${d.length>0?d:""}|${w}|${a}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},{type:1,data:c},{type:1,data:d},...V(a,l)]})}},vh=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},fl=(e,t)=>{let r=[],n=[],o=[],i=vh(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");uh(e.inputs,t,i,r,n,o),e.compute(_h(e.inputs[0],t,i,r,n,o),{inputs:[0]})},hl=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,o=e.cubicCoeffA,i=e.excludeOutside!==0,a=e.extrapolationValue,d=e.keepAspectRatioPolicy,l=e.mode,c=e.nearestMode===""?"simple":e.nearestMode;return re({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:o,excludeOutside:i,extrapolationValue:a,keepAspectRatioPolicy:d,mode:l,nearestMode:c})}});var $h,xh,bl,yl=M(()=>{"use strict";te();ae();Ce();se();$h=(e,t)=>{let[r,n,o,i]=e,{numHeads:a,rotaryEmbeddingDim:d}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!k.areEqual(n.dims,[])&&!k.areEqual(n.dims,[1])&&n.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!k.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(d>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=r.dims[0],c=r.dims[r.dims.length-2],m=o.dims[0],u=k.sizeFromDimension(r.dims,1)/c,h=d===0?o.dims[1]*2:u/a;if(d>h)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(n.dims.length===2){if(l!==n.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(c!==n.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(h/2!==o.dims[1]&&d/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(c>m)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},xh=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:o,scale:i}=t,a=e[0].dims[0],d=k.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],c=d/l,m=e[2].dims[1],u=o===0?m*2:c/n,h=new Array(a,l,c/u,u-m),w=k.computeStrides(h),b=[{type:1,data:i},{type:12,data:h},{type:12,data:w},...e[0].dims.length===3?new Array({type:12,data:[d,c,u,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[d,u,l*u,1]}):[],...V(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],g=$=>{let x=E("input",e[0].dataType,e[0].dims.length),v=E("position_ids",e[1].dataType,e[1].dims.length),S=E("cos_cache",e[2].dataType,e[2].dims.length),T=E("sin_cache",e[3].dataType,e[3].dims.length),C=R("output",e[0].dataType,e[0].dims.length);return $.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:w.length},{name:"input_output_strides",type:"u32",length:w.length}]),`
        ${$.declareVariables(x,v,S,T,C)}

        ${$.mainStart(Tt)}
          let half_rotary_emb_dim = uniforms.${S.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${v.broadcastedIndicesToOffset("bsnh.xy",R("",v.type.tensor,2))};
            let position_id =
                u32(${v.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${x.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} -
                ${x.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${C.setByOffset("i","re")}
            let im = ${x.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} +
                ${x.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${C.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${C.setByOffset("k",x.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:re({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:g,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(h)/Tt)},programUniforms:b})}},bl=(e,t)=>{$h(e.inputs,t),e.compute(xh(e.inputs,t))}});var Sh,Th,wl,_l=M(()=>{"use strict";te();ae();se();Sh=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],i=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(n.dims.length!==1)throw new Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let a=e[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let a=e[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},Th=(e,t,r,n)=>{let o=t.simplified,i=e[0].dims,a=k.size(i),d=i,l=a,c=i.slice(-1)[0],m=n?i.slice(0,-1).concat(1):[],u=!o&&e.length>3,h=e.length>4,w=n&&r>1,b=n&&r>2,g=r>3,$=64,x=$e(c),v=[{type:12,data:l},{type:12,data:x},{type:12,data:c},{type:1,data:t.epsilon}],S=C=>{let A=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],P=[E("x",e[0].dataType,e[0].dims,x),E("skip",e[1].dataType,e[1].dims,x),E("gamma",e[2].dataType,e[2].dims,x)];u&&P.push(E("beta",e[3].dataType,e[3].dims,x)),h&&P.push(E("bias",e[4].dataType,e[4].dims,x)),P.push(R("output",e[0].dataType,d,x)),w&&P.push(R("mean_output",1,m)),b&&P.push(R("inv_std_output",1,m)),g&&P.push(R("input_skip_bias_sum",e[0].dataType,d,x));let D=ge(e[0].dataType),N=ge(1,x);return`

      ${C.registerUniforms(A).declareVariables(...P)}
      var<workgroup> sum_shared : array<${N}, ${$}>;
      var<workgroup> sum_squared_shared : array<${N}, ${$}>;

      ${C.mainStart([$,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${$};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${$};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${$-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${h?"bias[offset1d + i]":D+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${g?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${It(D,x,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${$};
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
        let mean = ${Ke("sum",x)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Ke("square_sum",x)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${w?"mean_output[global_idx] = mean;":""}
        ${b?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${D}(mean)`}) *
            ${D}(inv_std_dev) * gamma[offset1d + i]
            ${u?"+ beta[offset1d + i]":""};
        }
      }`},T=[{dims:d,dataType:e[0].dataType}];return r>1&&T.push({dims:m,dataType:1}),r>2&&T.push({dims:m,dataType:1}),r>3&&T.push({dims:i,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${x};${w};${b};${g}`,inputDependencies:e.map((C,A)=>"type")},getShaderSource:S,getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(l/c)},programUniforms:v})}},wl=(e,t)=>{Sh(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(Th(e.inputs,t,e.outputCount,!1),{outputs:n})}});var Ih,rn,Ch,vl,Ah,kh,$l,xl,Sl=M(()=>{"use strict";te();ae();Ce();se();Ih=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw new Error(`Input ${n} must be an array of int32 or int64`)})},rn=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(n=>r.push(Number(n)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(n=>r.push(Number(n)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},Ch=(e,t)=>{if(e.length>1){let r=rn(e,1),n=rn(e,2),o=rn(e,3);return o.length===0&&(o=[...Array(e[0].dims.length).keys()]),re({starts:r,ends:n,axes:o})}else return t},vl=(e,t,r,n,o)=>{let i=e;return e<0&&(i+=r[n[t]]),o[t]<0?Math.max(0,Math.min(i,r[n[t]]-1)):Math.max(0,Math.min(i,r[n[t]]))},Ah=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
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
      }`,kh=(e,t)=>{let r=e[0].dims,n=k.size(r),o=t.axes.length>0?k.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],i=rn(e,4);i.forEach(x=>x!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let a=t.starts.map((x,v)=>vl(x,v,r,o,i)),d=t.ends.map((x,v)=>vl(x,v,r,o,i));if(o.length!==a.length||o.length!==d.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let x=0;x<r.length;++x)o.includes(x)||(a.splice(x,0,0),d.splice(x,0,r[x]),i.splice(x,0,1));let l=i.map(x=>Math.sign(x));i.forEach((x,v,S)=>{if(x<0){let T=(d[v]-a[v])/x,C=a[v],A=C+T*i[v];a[v]=A,d[v]=C,S[v]=-x}});let c=r.slice(0);o.forEach((x,v)=>{c[x]=Math.ceil((d[x]-a[x])/i[x])});let m={dims:c,dataType:e[0].dataType},u=R("output",e[0].dataType,c.length),h=E("input",e[0].dataType,e[0].dims.length),w=k.size(c),b=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:i.length}],g=[{type:12,data:w},{type:12,data:a},{type:6,data:l},{type:12,data:i},...V(e[0].dims,c)],$=x=>`
      ${x.registerUniforms(b).declareVariables(h,u)}
        ${Ah(h,u,r)}
        ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${u.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${u.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${a.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[m],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:g})}},$l=(e,t)=>{Ih(e.inputs,t);let r=Ch(e.inputs,t);e.compute(kh(e.inputs,r),{inputs:[0]})},xl=e=>{let t=e.starts,r=e.ends,n=e.axes;return re({starts:t,ends:r,axes:n})}});var Eh,Ph,Tl,Il,Cl=M(()=>{"use strict";te();ae();Ce();ut();se();Eh=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Ph=(e,t)=>{let r=e.inputs[0],n=r.dims,o=k.size(n),i=64,a=n.length,d=k.normalizeAxis(t.axis,a),l=d<n.length-1,c,m=[];l?(m=Array.from({length:a},(P,D)=>D),m[d]=a-1,m[a-1]=d,c=e.compute(Ee(r,m),{inputs:[r],outputs:[-1]})[0]):c=r;let u=c.dims,h=u[a-1],w=o/h,b=$e(h),g=h/b,$=(P,D)=>D===4?`max(max(${P}.x, ${P}.y), max(${P}.z, ${P}.w))`:D===2?`max(${P}.x, ${P}.y)`:D===3?`max(max(${P}.x, ${P}.y), ${P}.z)`:P,x=E("x",c.dataType,c.dims,b),v=R("result",c.dataType,c.dims,b),S=x.type.value,T=ge(c.dataType)==="f32"?`var threadMax = ${S}(-3.402823e+38f);`:`var threadMax = ${S}(-65504.0h);`,C=P=>`
      var<workgroup> rowMaxShared : ${S};
      var<workgroup> rowSumShared : ${S};
      var<workgroup> threadShared : array<${S}, ${i}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${S} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${S}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${P.registerUniform("packedCols","i32").declareVariables(x,v)}
      ${P.mainStart()}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${i};
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
          rowMaxShared = ${S}(${$("threadShared[0]",b)});
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
          rowSumShared = ${S}(${Ke("threadShared[0]",b)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,A=e.compute({name:"Softmax",shaderCache:{hint:`${b}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:u,dataType:c.dataType}],dispatchGroup:{x:w},programUniforms:[{type:6,data:g}]}),getShaderSource:C},{inputs:[c],outputs:[l?-1:0]})[0];l&&e.compute(Ee(A,m),{inputs:[A]})},Tl=(e,t)=>{Eh(e.inputs),Ph(e,t)},Il=e=>re({axis:e.axis})});var Al,zh,Oh,Dh,kl,El=M(()=>{"use strict";te();ae();se();Al=e=>Array.from(e.getBigInt64Array(),Number),zh=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Al(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Oh=(e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r},Dh=(e,t)=>{let r=e[0].dims,n=t??Al(e[1]),o=Oh(r,n),i=k.size(o),a=e[0].dataType,d=E("input",a,r.length),l=R("output",a,o.length),c=m=>`
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
    }`;return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...V(e[0].dims,o)]}),getShaderSource:c}},kl=e=>{zh(e.inputs),e.compute(Dh(e.inputs),{inputs:[0]})}});var Bh,Rh,Pl,zl=M(()=>{"use strict";te();ae();se();Bh=(e,t,r,n,o)=>{let i=R("output_data",o,r.length,4),a=E("a_data",t[1].dataType,t[1].dims.length,4),d=E("b_data",t[2].dataType,t[2].dims.length,4),l=E("c_data",t[0].dataType,t[0].dims.length,4),c,m=(u,h,w)=>`select(${h}, ${u}, ${w})`;if(!n)c=i.setByOffset("global_idx",m(a.getByOffset("global_idx"),d.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let u=(h,w,b="")=>{let g=`a_data[index_a${w}][component_a${w}]`,$=`b_data[index_b${w}][component_b${w}]`,x=`bool(c_data[index_c${w}] & (0xffu << (component_c${w} * 8)))`;return`
            let output_indices${w} = ${i.offsetToIndices(`global_idx * 4u + ${w}u`)};
            let offset_a${w} = ${a.broadcastedIndicesToOffset(`output_indices${w}`,i)};
            let offset_b${w} = ${d.broadcastedIndicesToOffset(`output_indices${w}`,i)};
            let offset_c${w} = ${l.broadcastedIndicesToOffset(`output_indices${w}`,i)};
            let index_a${w} = offset_a${w} / 4u;
            let index_b${w} = offset_b${w} / 4u;
            let index_c${w} = offset_c${w} / 4u;
            let component_a${w} = offset_a${w} % 4u;
            let component_b${w} = offset_b${w} % 4u;
            let component_c${w} = offset_c${w} % 4u;
            ${h}[${w}] = ${b}(${m(g,$,x)});
          `};o===9?c=`
            var data = vec4<u32>(0);
            ${u("data",0,"u32")}
            ${u("data",1,"u32")}
            ${u("data",2,"u32")}
            ${u("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:c=`
            ${u("output_data[global_idx]",0)}
            ${u("output_data[global_idx]",1)}
            ${u("output_data[global_idx]",2)}
            ${u("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,a,d,i)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${c}
      }`},Rh=e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,o=e[1].dataType,i=!(k.areEqual(t,r)&&k.areEqual(r,n)),a=t,d=k.size(t);if(i){let c=et.calcShape(et.calcShape(t,r,!1),n,!1);if(!c)throw new Error("Can't perform where op on the given tensors");a=c,d=k.size(a)}let l=Math.ceil(d/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:c=>Bh(c,e,a,i,o),getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(d/64/4)},programUniforms:[{type:12,data:l},...V(n,t,r,a)]})}},Pl=e=>{e.compute(Rh(e.inputs))}});var Ol,Dl=M(()=>{"use strict";Cs();qr();Es();zs();bu();Au();Pu();Fu();Qu();td();od();dd();pd();fd();bd();_d();xd();Id();Dd();Md();Vd();go();Ld();To();Hd();sl();ll();pl();Hr();gl();yl();_l();Sl();Cl();Co();El();ut();Kr();zl();Ol=new Map([["Abs",[Os]],["Acos",[Ds]],["Acosh",[Bs]],["Add",[yu]],["ArgMax",[Is,lo]],["ArgMin",[Ts,lo]],["Asin",[Rs]],["Asinh",[Ms]],["Atan",[Us]],["Atanh",[Vs]],["Attention",[As]],["AveragePool",[Qd,Xd]],["BatchNormalization",[ks]],["BiasAdd",[Ps]],["BiasSplitGelu",[gu]],["Cast",[Ws,Ns]],["Ceil",[Gs]],["Clip",[Ls]],["Concat",[ku,Eu]],["Conv",[_o,wo]],["ConvTranspose",[Xu,Zu]],["Cos",[Hs]],["Cosh",[Fs]],["CumSum",[Ju,ed]],["DepthToSpace",[rd,nd]],["DequantizeLinear",[ul,dl]],["Div",[wu]],["Einsum",[sd,ud]],["Elu",[qs,Zt]],["Equal",[_u]],["Erf",[js]],["Exp",[Ks]],["Expand",[cd]],["FastGelu",[md]],["Floor",[Ys]],["FusedConv",[_o,wo]],["Gather",[gd,hd]],["GatherElements",[$d,vd]],["GatherBlockQuantized",[yd,wd]],["Gelu",[Zs]],["Gemm",[Td,Sd]],["GlobalAveragePool",[tl,el]],["GlobalMaxPool",[al,il]],["Greater",[Su]],["GreaterOrEqual",[Iu]],["GroupQueryAttention",[Od]],["HardSigmoid",[ou,nu]],["InstanceNormalization",[Rd]],["LayerNormalization",[Ud]],["LeakyRelu",[Xs,Zt]],["Less",[Tu]],["LessOrEqual",[Cu]],["Log",[mu]],["MatMul",[Gu]],["MatMulNBits",[Nd,Wd]],["MaxPool",[nl,ol]],["Mul",[vu]],["MultiHeadAttention",[kd,Ad]],["Neg",[Js]],["Not",[Qs]],["Pad",[Gd]],["Pow",[$u]],["QuickGelu",[fu,Zt]],["Range",[cl]],["Reciprocal",[eu]],["ReduceMin",[ws]],["ReduceMean",[fs]],["ReduceMax",[ys]],["ReduceSum",[vs]],["ReduceProd",[_s]],["ReduceL1",[hs]],["ReduceL2",[gs]],["ReduceLogSum",[xs]],["ReduceLogSumExp",[bs]],["ReduceSumSquare",[$s]],["Relu",[tu]],["Resize",[fl,hl]],["RotaryEmbedding",[bl]],["Sigmoid",[ru]],["Sin",[iu]],["Sinh",[au]],["Slice",[$l,xl]],["SkipLayerNormalization",[wl]],["Split",[Ed,Pd]],["Sqrt",[su]],["Softmax",[Tl,Il]],["Sub",[xu]],["Tan",[uu]],["Tanh",[lu]],["ThresholdedRelu",[pu,Zt]],["Tile",[kl]],["Transpose",[ts,rs]],["Where",[Pl]]])});var nn,Bl=M(()=>{"use strict";Fe();je();se();nn=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,r){this.repo.set(t,r)}run(t,r,n,o,i){Ve(t.programInfo.name);let a=this.backend.device,d=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let l=[];for(let m of r)l.push({binding:l.length,resource:{buffer:m.buffer}});for(let m of n)l.push({binding:l.length,resource:{buffer:m.buffer}});i&&l.push({binding:l.length,resource:i});let c=a.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:l,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let m={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:c,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(m)}d.setPipeline(t.computePipeline),d.setBindGroup(0,c),d.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Re(t.programInfo.name)}dispose(){}build(t,r){Ve(t.name);let n=this.backend.device,o=[];n.features.has("shader-f16")&&o.push("enable f16;");let i=Ja(r,this.backend.device.limits),a=t.getShaderSource(i),d=`${o.join(`
`)}
${i.additionalImplementations}
${a}`,l=n.createShaderModule({code:d,label:t.name});de("verbose",()=>`[WebGPU] ${t.name} shader code: ${d}`);let c=n.createComputePipeline({compute:{module:l,entryPoint:"main"},layout:"auto",label:t.name});return Re(t.name),{programInfo:t,computePipeline:c,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(t){let r=typeof t=="number"?t:t.x,n=typeof t=="number"?1:t.y||1,o=typeof t=="number"?1:t.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=i&&n<=i&&o<=i)return[r,n,o];let a=r*n*o,d=Math.ceil(Math.sqrt(a));if(d>i){if(d=Math.ceil(Math.cbrt(a)),d>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[d,d,d]}else return[d,d,1]}}});var Mh,Uh,Ao,on,Rl=M(()=>{"use strict";Fe();te();je();Xn();Za();Dl();Bl();Mh=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let o=e[n].dataType;switch(t[n]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let i=e[n].dims.length;r.push(`${o};${i}`);break}case"dims":{let i=e[n].dims.join(",");r.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")},Uh=(e,t,r)=>{let n=e.name;return e.shaderCache?.hint&&(n+="["+e.shaderCache.hint+"]"),n+=":"+r+`:${Mh(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,n},Ao=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},on=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,r){this.env=t;let n=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n};r.features.has("chromium-experimental-timestamp-query-inside-passes")?n.push("chromium-experimental-timestamp-query-inside-passes"):r.features.has("timestamp-query")&&n.push("timestamp-query"),r.features.has("shader-f16")&&n.push("shader-f16"),this.device=await r.requestDevice(o),this.adapterInfo=new Ao(r.info||await r.requestAdapterInfo()),this.gpuDataManager=Ya(this),this.programManager=new nn(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Vr(t.logLevel,!!t.debug),this.device.onuncapturederror=i=>{i.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${i.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Ve(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(t.getMappedRange()),n=this.pendingQueries.get(t);for(let o=0;o<r.length/2;o++){let i=n[o],a=i.kernelId,d=this.kernels.get(a),l=d.kernelType,c=d.kernelName,m=i.programName,u=i.inputTensorViews,h=i.outputTensorViews,w=r[o*2],b=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=w);let g=Number(w-this.queryTimeBase),$=Number(b-this.queryTimeBase);if(!Number.isSafeInteger(g)||!Number.isSafeInteger($))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:u.map(x=>({dims:x.dims,dataType:gt(x.dataType)})),outputsMetadata:h.map(x=>({dims:x.dims,dataType:gt(x.dataType)})),kernelId:a,kernelType:l,kernelName:c,programName:m,startTime:g,endTime:$});else{let x="";u.forEach((S,T)=>{x+=`input[${T}]: [${S.dims}] | ${gt(S.dataType)}, `});let v="";h.forEach((S,T)=>{v+=`output[${T}]: [${S.dims}] | ${gt(S.dataType)}, `}),console.log(`[profiling] kernel "${a}|${l}|${c}|${m}" ${x}${v}execution time: ${$-g} ns`)}$r("GPU",`${m}::${w}::${b}`)}t.unmap(),this.pendingQueries.delete(t)}),Re()}run(t,r,n,o,i,a){Ve(t.name);let d=[];for(let S=0;S<r.length;++S){let T=r[S].data;if(T===0)continue;let C=this.gpuDataManager.get(T);if(!C)throw new Error(`no GPU data for input: ${T}`);d.push(C)}let{outputs:l,dispatchGroup:c,programUniforms:m}=t.getRunData(r),u=n.length===0?l.map((S,T)=>T):n;if(u.length!==l.length)throw new Error(`Output size ${u.length} must be equal to ${l.length}.`);let h=[],w=[];for(let S=0;S<l.length;++S){if(!Number.isInteger(u[S])||u[S]<-3||u[S]>=a)throw new Error(`Invalid output index: ${u[S]}`);if(u[S]===-3)continue;let T=u[S]===-1,C=u[S]===-2,A=T||C?i(l[S].dataType,l[S].dims):o(u[S],l[S].dataType,l[S].dims);if(h.push(A),A.data===0)continue;let P=this.gpuDataManager.get(A.data);if(!P)throw new Error(`no GPU data for output: ${A.data}`);if(T&&this.temporaryData.push(P),C){let D=this.kernelPersistentData.get(this.currentKernelId);D||(D=[],this.kernelPersistentData.set(this.currentKernelId,D)),D.push(P)}w.push(P)}if(d.length!==r.length||w.length!==h.length){if(w.length===0)return Re(t.name),h;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let b;if(m){let S=0,T=[];m.forEach(D=>{let N=typeof D.data=="number"?[D.data]:D.data;if(N.length===0)return;let G=D.type===10?2:4,q,K;D.type===10?(K=N.length>4?16:N.length>2?8:N.length*G,q=N.length>4?16:G*N.length):(K=N.length<=2?N.length*G:16,q=16),S=Math.ceil(S/K)*K,T.push(S);let W=D.type===10?8:4;S+=N.length>4?Math.ceil(N.length/W)*q:N.length*G});let C=16;S=Math.ceil(S/C)*C;let A=new ArrayBuffer(S);m.forEach((D,N)=>{let G=T[N],q=typeof D.data=="number"?[D.data]:D.data;if(D.type===6)new Int32Array(A,G,q.length).set(q);else if(D.type===12)new Uint32Array(A,G,q.length).set(q);else if(D.type===10)new Uint16Array(A,G,q.length).set(q);else if(D.type===1)new Float32Array(A,G,q.length).set(q);else throw new Error(`Unsupported uniform type: ${gt(D.type)}`)});let P=this.gpuDataManager.create(S,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(P.buffer,0,A,0,S),this.gpuDataManager.release(P.id),b={offset:0,size:S,buffer:P.buffer}}let g=this.programManager.normalizeDispatchGroupSize(c),$=g[1]===1&&g[2]===1,x=Uh(t,r,$),v=this.programManager.getArtifact(x);if(v||(v=this.programManager.build(t,g),this.programManager.setArtifact(x,v),de("info",()=>`[artifact] key: ${x}, programName: ${t.name}`)),m&&v.uniformVariablesInfo){if(m.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${m.length} in program "${v.programInfo.name}".`);for(let S=0;S<m.length;S++){let T=m[S],C=T.type,A=typeof T.data=="number"?1:T.data.length,[P,D]=v.uniformVariablesInfo[S];if(C!==P||A!==D)throw new Error(`Uniform variable ${S} mismatch: expect type ${P} with size ${D}, got type ${C} with size ${A} in program "${v.programInfo.name}".`)}}if(de("info",()=>`[ProgramManager] run "${t.name}" (key=${x}) with ${g[0]}x${g[1]}x${g[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let S={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:r,outputTensorViews:h};this.pendingKernels.push(S),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(S)}return this.programManager.run(v,d,w,g,b),Re(t.name),h}upload(t,r){this.gpuDataManager.upload(t,r)}memcpy(t,r){this.gpuDataManager.memcpy(t,r)}async download(t,r){await this.gpuDataManager.download(t,r)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,r,n,o){let i=Ol.get(t);if(!i)throw new Error(`kernel not implemented: ${t}`);let a={kernelType:t,kernelName:o,kernelEntry:i[0],attributes:[i[1],n]};this.kernels.set(r,a)}releaseKernel(t){let r=this.kernelPersistentData.get(t);if(r){for(let n of r)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,r,n){let o=this.kernels.get(t);if(!o)throw new Error(`kernel not created: ${t}`);let i=o.kernelType,a=o.kernelName,d=o.kernelEntry,l=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=t,l[0]&&(l[1]=l[0](l[1]),l[0]=void 0),de("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let c=this.env.debug;this.temporaryData=[];try{return c&&this.device.pushErrorScope("validation"),d(r,l[1]),0}catch(m){return n.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${m}`)),1}finally{c&&n.push(this.device.popErrorScope().then(m=>m?`GPU validation error for kernel "[${i}] ${a}": ${m.message}`:null));for(let m of this.temporaryData)this.gpuDataManager.release(m.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,r,n,o){let i=this.sessionExternalDataMapping.get(t);i||(i=new Map,this.sessionExternalDataMapping.set(t,i));let a=i.get(r),d=this.gpuDataManager.registerExternalBuffer(n,o,a);return i.set(r,[d,n]),d}unregisterBuffers(t){let r=this.sessionExternalDataMapping.get(t);r&&(r.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[0])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let r=this.gpuDataManager.get(t);if(!r)throw new Error(`no GPU data for buffer: ${t}`);return r.buffer}createDownloader(t,r,n){return async()=>{let o=await to(this,t,r);return Nr(o.buffer,n)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){de("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){de("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){de("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),n=t.length;this.pendingKernels=[];for(let o=0;o<n;o++){let i=this.getComputePassEncoder(),a=t[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});var Vh,Ml,an,sn,ko,Ul,Vl=M(()=>{"use strict";je();Vh=1,Ml=()=>Vh++,an=class{constructor(t){this.sessionId=t.sessionId,this.mlContext=t.context,this.mlTensor=t.tensor,this.dataType=t.dataType,this.tensorShape=t.shape}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}destroy(){de("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(t){this.mlContext.writeTensor(this.mlTensor,t)}async read(t){return t?this.mlContext.readTensor(this.mlTensor,t):this.mlContext.readTensor(this.mlTensor)}sameTypeAndShape(t,r){return this.dataType===t&&this.tensorShape.every((n,o)=>n===r[o])}},sn=class{constructor(t,r){this.tensorManager=t;this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&this.tensorManager.releaseTensor(this.tensorWrapper)}async ensureTensor(t,r,n){if(this.wrapper){if(this.wrapper.sameTypeAndShape(t,r))return this.wrapper.tensor;n&&(this.activeUpload=new Uint8Array(await this.wrapper.read())),this.tensorManager.releaseTensor(this.wrapper)}let o=MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(t,r,o,!0,!0),n&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(t){if(this.wrapper){this.wrapper.write(t);return}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(t){if(this.activeUpload)if(t){t instanceof ArrayBuffer?new Uint8Array(t).set(this.activeUpload):new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(this.activeUpload);return}else return this.activeUpload.buffer;if(!this.wrapper)throw new Error("Tensor has not been created.");return t?this.wrapper.read(t):this.wrapper.read()}},ko=class{constructor(t){this.backend=t;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}reserveTensorId(){let t=Ml();return this.tensorTrackersById.set(t,new sn(this)),t}releaseTensorId(t){let r=this.tensorTrackersById.get(t);r&&(this.tensorTrackersById.delete(t),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(t,r,n,o){de("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${n}, copyOld: ${o}}`);let i=this.tensorTrackersById.get(t);if(!i)throw new Error("Tensor not found.");return i.ensureTensor(r,n,o)}upload(t,r){let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");n.upload(r)}async download(t,r){de("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${t}, dstBuffer: ${r?.byteLength}}`);let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");return n.download(r)}releaseTensorsForSession(t){for(let r of this.freeTensors)r.sessionId===t&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==t)}registerTensor(t,r,n,o){let i=Ml(),a=new an({sessionId:this.backend.currentSessionId,context:t,tensor:r,dataType:n,shape:o});return this.tensorTrackersById.set(i,new sn(this,a)),this.externalTensors.add(a),i}async getCachedTensor(t,r,n,o,i){let a=this.backend.currentSessionId;for(let[c,m]of this.freeTensors.entries())if(m.sameTypeAndShape(t,r)){let u=this.freeTensors.splice(c,1)[0];return u.sessionId=a,u}let d=this.backend.currentContext;de("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, shape: ${r}}`);let l=await d.createTensor({dataType:t,shape:r,dimensions:r,usage:n,writable:o,readable:i});return new an({sessionId:a,context:d,tensor:l,dataType:t,shape:r})}releaseTensor(t){this.externalTensors.has(t)&&this.externalTensors.delete(t),this.freeTensors.push(t)}},Ul=(...e)=>new ko(...e)});var Nl,un,Wl=M(()=>{"use strict";te();ht();Xn();Vl();je();Nl=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),un=class{constructor(t){this.tensorManager=Ul(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;Vr(t.logLevel,!!t.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(t){this.activeSessionId=t}get currentContext(){let t=this.getMLContext(this.currentSessionId);if(!t)throw new Error(`No MLContext found for session ${this.currentSessionId}`);return t}registerMLContext(t,r){this.mlContextBySessionId.set(t,r);let n=this.sessionIdsByMLContext.get(r);n||(n=new Set,this.sessionIdsByMLContext.set(r,n)),n.add(t)}onReleaseSession(t){let r=this.mlContextBySessionId.get(t);if(!r)return;this.tensorManager.releaseTensorsForSession(t),this.mlContextBySessionId.delete(t);let n=this.sessionIdsByMLContext.get(r);n.delete(t),n.size===0&&this.sessionIdsByMLContext.delete(r)}getMLContext(t){return this.mlContextBySessionId.get(t)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(t){de("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t)}async ensureTensor(t,r,n,o){let i=Nl.get(r);if(!i)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(t,i,n,o)}uploadTensor(t,r){if(!Ie().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");de("verbose",()=>`[WebNN] uploadTensor {tensorId: ${t}, data: ${r.byteLength}}`),this.tensorManager.upload(t,r)}async downloadTensor(t,r){return this.tensorManager.download(t,r)}createMLTensorDownloader(t,r){return async()=>{let n=await this.tensorManager.download(t);return Nr(n,r)}}registerMLTensor(t,r,n){let o=Nl.get(r);if(!o)throw new Error(`Unsupported ONNX data type: ${r}`);let i=this.tensorManager.registerTensor(this.currentContext,t,o,n);return de("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${o}, dimensions: ${n}} -> {tensorId: ${i}}`),i}registerMLConstant(t,r,n,o,i,a){if(!a)throw new Error("External mounted files are not available.");let d=t;t.startsWith("./")&&(d=t.substring(2));let l=a.get(d);if(!l)throw new Error(`File with name ${d} not found in preloaded files.`);if(r+n>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let c=l.slice(r,r+n).buffer,m;switch(i.dataType){case"float32":m=new Float32Array(c);break;case"float16":m=new Uint16Array(c);break;case"int32":m=new Int32Array(c);break;case"uint32":m=new Uint32Array(c);break;case"int64":m=new BigInt64Array(c);break;case"uint64":m=new BigUint64Array(c);break;case"int8":m=new Int8Array(c);break;case"uint8":m=new Uint8Array(c);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return de("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}}`),o.constant(i,m)}flush(){}}});var Ll={};Lt(Ll,{init:()=>Nh});var rr,Eo,Nh,Gl=M(()=>{"use strict";te();Rl();je();ae();Wl();rr=class e{constructor(t,r,n,o){this.module=t;this.dataType=r;this.data=n;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(k.size(t)!==k.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},Eo=class{constructor(t,r,n){this.module=t;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo;let o=t.PTR_SIZE,i=n/t.PTR_SIZE,a=o===4?"i32":"i64";this.opKernelContext=Number(t.getValue(o*i++,a));let d=Number(t.getValue(o*i++,a));this.outputCount=Number(t.getValue(o*i++,a)),this.customDataOffset=Number(t.getValue(o*i++,"*")),this.customDataSize=Number(t.getValue(o*i++,a));let l=[];for(let c=0;c<d;c++){let m=Number(t.getValue(o*i++,a)),u=Number(t.getValue(o*i++,"*")),h=Number(t.getValue(o*i++,a)),w=[];for(let b=0;b<h;b++)w.push(Number(t.getValue(o*i++,a)));l.push(new rr(t,m,u,w))}this.inputs=l}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}getMaxComputeWorkgroupSizes(){return[this.backend.device.limits.maxComputeWorkgroupSizeX,this.backend.device.limits.maxComputeWorkgroupSizeY,this.backend.device.limits.maxComputeWorkgroupSizeZ]}getMaxComputeWorkgroupStoragesize(){return this.backend.device.limits.maxComputeWorkgroupStorageSize}compute(t,r){let n=r?.inputs?.map(d=>typeof d=="number"?this.inputs[d]:d)??this.inputs,o=r?.outputs??[],i=(d,l,c)=>new rr(this.module,l,this.output(d,c),c),a=(d,l)=>{let c=xt(d,l);if(!c)throw new Error(`Unsupported data type: ${d}`);let m=c>0?this.backend.gpuDataManager.create(c).id:0;return new rr(this.module,d,m,l)};return this.backend.run(t,n,o,i,a,this.outputCount)}output(t,r){let n=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",a=this.module.stackAlloc((1+r.length)*o);this.module.setValue(a,r.length,i);for(let d=0;d<r.length;d++)this.module.setValue(a+o*(d+1),r[d],i);return this.module._JsepOutput(this.opKernelContext,t,a)}catch(o){throw new Error(`Failed to generate kernel's output[${t}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(n)}}},Nh=async(e,t,r,n)=>{let o=t.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let i=new on;await i.initialize(r,n),o("webgpu",[i,a=>i.alloc(Number(a)),a=>i.free(a),(a,d,l,c=!1)=>{if(c)de("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(a)}, dst=${Number(d)}, size=${Number(l)}`),i.memcpy(Number(a),Number(d));else{de("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(a)}, gpuDataId=${Number(d)}, size=${Number(l)}`);let m=t.HEAPU8.subarray(Number(a>>>0),Number(a>>>0)+Number(l));i.upload(Number(d),m)}},async(a,d,l)=>{de("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${a}, dataOffset=${d}, size=${l}`),await i.download(Number(a),()=>t.HEAPU8.subarray(Number(d)>>>0,Number(d+l)>>>0))},(a,d,l)=>i.createKernel(a,Number(d),l,t.UTF8ToString(t._JsepGetNodeName(Number(d)))),a=>i.releaseKernel(a),(a,d,l,c)=>{de("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${l}, kernel=${a}, contextDataOffset=${d}`);let m=new Eo(t,i,Number(d));return i.computeKernel(Number(a),m,c)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else{let i=new un(r);o("webnn",[i,()=>i.reserveTensorId(),a=>i.releaseTensorId(a),async(a,d,l,c)=>i.ensureTensor(a,d,l,c),(a,d)=>{i.uploadTensor(a,d)},async(a,d)=>i.downloadTensor(a,d)])}}});var Wh,Cr,Ar,Ct,Lh,Ft,kr,Er,Hl,Pr,zr,Or,Fn=M(()=>{"use strict";Wa();Ga();te();ht();Br();Zn();Wh=(e,t)=>{Ie()._OrtInit(e,t)!==0&&fe("Can't initialize onnxruntime.")},Cr=async e=>{Wh(e.wasm.numThreads,Kt(e.logLevel))},Ar=async(e,t)=>{{let r=(Gl(),gr(Ll)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let n=e.webgpu.adapter;if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=e.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=e.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",Ie(),e,n)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",Ie(),e)}}},Ct=new Map,Lh=e=>{let t=Ie(),r=t.stackSave();try{let n=t.PTR_SIZE,o=t.stackAlloc(2*n);t._OrtGetInputOutputCount(e,o,o+n)!==0&&fe("Can't get session input/output count.");let a=n===4?"i32":"i64";return[Number(t.getValue(o,a)),Number(t.getValue(o+n,a))]}finally{t.stackRestore(r)}},Ft=e=>{let t=Ie(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},kr=async(e,t)=>{let r,n,o=Ie();Array.isArray(e)?[r,n]=e:e.buffer===o.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=Ft(e);let i=0,a=0,d=0,l=[],c=[],m=[];try{if([a,l]=La(t),t?.externalData&&o.mountExternalData){let v=[];for(let S of t.externalData){let T=typeof S=="string"?S:S.path;v.push(Yt(typeof S=="string"?S:S.data).then(C=>{o.mountExternalData(T,C)}))}await Promise.all(v)}for(let v of t?.executionProviders??[])if((typeof v=="string"?v:v.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,o.currentContext)throw new Error("WebNN execution provider is already set.");if(typeof v!="string"){let T=v,C=T?.context,A=T?.gpuDevice,P=T?.deviceType,D=T?.powerPreference;C?o.currentContext=C:A?o.currentContext=await navigator.ml.createContext(A):o.currentContext=await navigator.ml.createContext({deviceType:P,powerPreference:D})}else o.currentContext=await navigator.ml.createContext();break}i=await o._OrtCreateSession(r,n,a),i===0&&fe("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.jsepRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[u,h]=Lh(i),w=!!t?.enableGraphCapture,b=[],g=[],$=[];for(let v=0;v<u;v++){let S=o._OrtGetInputName(i,v);S===0&&fe("Can't get an input name."),c.push(S),b.push(o.UTF8ToString(S))}for(let v=0;v<h;v++){let S=o._OrtGetOutputName(i,v);S===0&&fe("Can't get an output name."),m.push(S);let T=o.UTF8ToString(S);g.push(T);{if(w&&t?.preferredOutputLocation===void 0){$.push("gpu-buffer");continue}let C=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[T]??"cpu";if(C!=="cpu"&&C!=="cpu-pinned"&&C!=="gpu-buffer"&&C!=="ml-tensor")throw new Error(`Not supported preferred output location: ${C}.`);if(w&&C!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${C}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);$.push(C)}}let x=null;return $.some(v=>v==="gpu-buffer"||v==="ml-tensor")&&(d=o._OrtCreateBinding(i),d===0&&fe("Can't create IO binding."),x={handle:d,outputPreferredLocations:$,outputPreferredLocationsEncoded:$.map(v=>Yn(v))}),Ct.set(i,[i,c,m,x,w,!1]),[i,b,g]}catch(u){throw c.forEach(h=>o._OrtFree(h)),m.forEach(h=>o._OrtFree(h)),d!==0&&o._OrtReleaseBinding(d)!==0&&fe("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&fe("Can't release session."),u}finally{o._free(r),a!==0&&o._OrtReleaseSessionOptions(a)!==0&&fe("Can't release session options."),l.forEach(u=>o._free(u)),o.unmountExternalData?.()}},Er=e=>{let t=Ie(),r=Ct.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[n,o,i,a,d]=r;a&&(d&&t._OrtClearBoundOutputs(a.handle)!==0&&fe("Can't clear bound outputs."),t._OrtReleaseBinding(a.handle)!==0&&fe("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),o.forEach(l=>t._OrtFree(l)),i.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(n)!==0&&fe("Can't release session."),Ct.delete(e)},Hl=(e,t,r,n,o,i=!1)=>{if(!e){t.push(0);return}let a=Ie(),d=a.PTR_SIZE,l=e[0],c=e[1],m=e[3],u,h;if(l==="string"&&(m==="gpu-buffer"||m==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(i&&m!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(m==="gpu-buffer"){let g=e[2].gpuBuffer;h=xt(jt(l),c);let $=a.jsepRegisterBuffer;if(!$)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');u=$(n,o,g,h)}else if(m==="ml-tensor"){let g=e[2].mlTensor;h=xt(jt(l),c);let $=a.jsepRegisterMLTensor;if(!$)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');u=$(g,jt(l),c)}else{let g=e[2];if(Array.isArray(g)){h=d*g.length,u=a._malloc(h),r.push(u);for(let $=0;$<g.length;$++){if(typeof g[$]!="string")throw new TypeError(`tensor data at index ${$} is not a string`);a.setValue(u+$*d,Ae(g[$],r),"*")}}else h=g.byteLength,u=a._malloc(h),r.push(u),a.HEAPU8.set(new Uint8Array(g.buffer,g.byteOffset,h),u)}let w=a.stackSave(),b=a.stackAlloc(4*c.length);try{c.forEach(($,x)=>a.setValue(b+x*d,$,d===4?"i32":"i64"));let g=a._OrtCreateTensor(jt(l),u,h,b,c.length,Yn(m));g===0&&fe(`Can't create tensor for input/output. session=${n}, index=${o}.`),t.push(g)}finally{a.stackRestore(w)}},Pr=async(e,t,r,n,o,i)=>{let a=Ie(),d=a.PTR_SIZE,l=Ct.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let c=l[0],m=l[1],u=l[2],h=l[3],w=l[4],b=l[5],g=t.length,$=n.length,x=0,v=[],S=[],T=[],C=[],A=a.stackSave(),P=a.stackAlloc(g*d),D=a.stackAlloc(g*d),N=a.stackAlloc($*d),G=a.stackAlloc($*d);try{a.jsepOnRunStart?.(c),[x,v]=Na(i);for(let W=0;W<g;W++)Hl(r[W],S,C,e,t[W],w);for(let W=0;W<$;W++)Hl(o[W],T,C,e,g+n[W],w);for(let W=0;W<g;W++)a.setValue(P+W*d,S[W],"*"),a.setValue(D+W*d,m[t[W]],"*");for(let W=0;W<$;W++)a.setValue(N+W*d,T[W],"*"),a.setValue(G+W*d,u[n[W]],"*");if(h&&!b){let{handle:W,outputPreferredLocations:J,outputPreferredLocationsEncoded:ue}=h;if(m.length!==g)throw new Error(`input count from feeds (${g}) is expected to be always equal to model's input count (${m.length}).`);for(let ee=0;ee<g;ee++){let oe=t[ee];await a._OrtBindInput(W,m[oe],S[ee])!==0&&fe(`Can't bind input[${ee}] for session=${e}.`)}for(let ee=0;ee<$;ee++){let oe=n[ee];o[ee]?.[3]?a._OrtBindOutput(W,u[oe],T[ee],0)!==0&&fe(`Can't bind pre-allocated output[${ee}] for session=${e}.`):a._OrtBindOutput(W,u[oe],0,ue[oe])!==0&&fe(`Can't bind output[${ee}] to ${J[ee]} for session=${e}.`)}Ct.set(e,[c,m,u,h,w,!0])}let q;h?q=await a._OrtRunWithBinding(c,h.handle,$,N,x):q=await a._OrtRun(c,D,P,g,G,$,N,x),q!==0&&fe("failed to call OrtRun().");let K=[];for(let W=0;W<$;W++){let J=Number(a.getValue(N+W*d,"*"));if(J===T[W]){K.push(o[W]);continue}let ue=a.stackSave(),ee=a.stackAlloc(4*d),oe=!1,X,Q=0;try{a._OrtGetTensorData(J,ee,ee+d,ee+2*d,ee+3*d)!==0&&fe(`Can't access output tensor data on index ${W}.`);let we=d===4?"i32":"i64",ce=Number(a.getValue(ee,we));Q=a.getValue(ee+d,"*");let ne=a.getValue(ee+d*2,"*"),U=Number(a.getValue(ee+d*3,we)),H=[];for(let he=0;he<U;he++)H.push(Number(a.getValue(ne+he*d,we)));a._OrtFree(ne)!==0&&fe("Can't free memory for tensor dims.");let pe=H.reduce((he,ve)=>he*ve,1);X=gt(ce);let Oe=h?.outputPreferredLocations[n[W]];if(X==="string"){if(Oe==="gpu-buffer"||Oe==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let he=[];for(let ve=0;ve<pe;ve++){let Ye=a.getValue(Q+ve*d,"*"),Vt=a.getValue(Q+(ve+1)*d,"*"),fn=ve===pe-1?void 0:Vt-Ye;he.push(a.UTF8ToString(Ye,fn))}K.push([X,H,he,"cpu"])}else if(Oe==="gpu-buffer"&&pe>0){let he=a.jsepGetBuffer;if(!he)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let ve=he(Q),Ye=xt(ce,pe);if(Ye===void 0||!Mr(X))throw new Error(`Unsupported data type: ${X}`);oe=!0,K.push([X,H,{gpuBuffer:ve,download:a.jsepCreateDownloader(ve,Ye,X),dispose:()=>{a._OrtReleaseTensor(J)!==0&&fe("Can't release tensor.")}},"gpu-buffer"])}else if(Oe==="ml-tensor"&&pe>0){let he=a.jsepEnsureTensor;if(!he)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(xt(ce,pe)===void 0||!Ur(X))throw new Error(`Unsupported data type: ${X}`);let Ye=await he(Q,ce,H,!1);oe=!0,K.push([X,H,{mlTensor:Ye,download:a.jsepCreateMLTensorDownloader(Q,X),dispose:()=>{a.jsepReleaseTensorId(Q),a._OrtReleaseTensor(J)}},"ml-tensor"])}else{let he=Rr(X),ve=new he(pe);new Uint8Array(ve.buffer,ve.byteOffset,ve.byteLength).set(a.HEAPU8.subarray(Q,Q+ve.byteLength)),K.push([X,H,ve,"cpu"])}}finally{a.stackRestore(ue),X==="string"&&Q&&a._free(Q),oe||a._OrtReleaseTensor(J)}}return h&&!w&&(a._OrtClearBoundOutputs(h.handle)!==0&&fe("Can't clear bound outputs."),Ct.set(e,[c,m,u,h,w,!1])),K}finally{a.stackRestore(A),S.forEach(q=>a._OrtReleaseTensor(q)),T.forEach(q=>a._OrtReleaseTensor(q)),C.forEach(q=>a._free(q)),x!==0&&a._OrtReleaseRunOptions(x),v.forEach(q=>a._free(q))}},zr=e=>{let t=Ie(),r=Ct.get(e);if(!r)throw new Error("invalid session id");let n=r[0],o=t._OrtEndProfiling(n);o===0&&fe("Can't get an profile file name."),t._OrtFree(o)},Or=e=>{let t=[];for(let r of e){let n=r[2];!Array.isArray(n)&&"buffer"in n&&t.push(n.buffer)}return t}});var At,qe,nr,ln,cn,dn,Po,zo,Mt,Ut,Hh,Fl,ql,jl,Kl,Yl,Zl,Xl,Oo=M(()=>{"use strict";Fe();Fn();ht();Ht();At=()=>!!xe.wasm.proxy&&typeof document<"u",nr=!1,ln=!1,cn=!1,zo=new Map,Mt=(e,t)=>{let r=zo.get(e);r?r.push(t):zo.set(e,[t])},Ut=()=>{if(nr||!ln||cn||!qe)throw new Error("worker not ready")},Hh=e=>{switch(e.data.type){case"init-wasm":nr=!1,e.data.err?(cn=!0,Po[1](e.data.err)):(ln=!0,Po[0]()),dn&&(URL.revokeObjectURL(dn),dn=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=zo.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},Fl=async()=>{if(!ln){if(nr)throw new Error("multiple calls to 'initWasm()' detected.");if(cn)throw new Error("previous call to 'initWasm()' failed.");if(nr=!0,At())return new Promise((e,t)=>{qe?.terminate(),Ma().then(([r,n])=>{try{qe=n,qe.onerror=i=>t(i),qe.onmessage=Hh,Po=[e,t];let o={type:"init-wasm",in:xe};qe.postMessage(o),dn=r}catch(o){t(o)}},t)});try{await Ir(xe.wasm),await Cr(xe),ln=!0}catch(e){throw cn=!0,e}finally{nr=!1}}},ql=async e=>{if(At())return Ut(),new Promise((t,r)=>{Mt("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:xe}};qe.postMessage(n)});await Ar(xe,e)},jl=async e=>At()?(Ut(),new Promise((t,r)=>{Mt("copy-from",[t,r]);let n={type:"copy-from",in:{buffer:e}};qe.postMessage(n,[e.buffer])})):Ft(e),Kl=async(e,t)=>{if(At()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Ut(),new Promise((r,n)=>{Mt("create",[r,n]);let o={type:"create",in:{model:e,options:{...t}}},i=[];e instanceof Uint8Array&&i.push(e.buffer),qe.postMessage(o,i)})}else return kr(e,t)},Yl=async e=>{if(At())return Ut(),new Promise((t,r)=>{Mt("release",[t,r]);let n={type:"release",in:e};qe.postMessage(n)});Er(e)},Zl=async(e,t,r,n,o,i)=>{if(At()){if(r.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return Ut(),new Promise((a,d)=>{Mt("run",[a,d]);let l=r,c={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:n,options:i}};qe.postMessage(c,Or(l))})}else return Pr(e,t,r,n,o,i)},Xl=async e=>{if(At())return Ut(),new Promise((t,r)=>{Mt("end-profiling",[t,r]);let n={type:"end-profiling",in:e};qe.postMessage(n)});zr(e)}});var Ql,Fh,pn,Jl=M(()=>{"use strict";Fe();Oo();te();Tr();Zn();Ql=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Fh=e=>{switch(e[3]){case"cpu":return new Be(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Mr(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:o}=e[2];return Be.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:o})}case"ml-tensor":{let t=e[0];if(!Ur(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:n,dispose:o}=e[2];return Be.fromMLTensor(r,{dataType:t,dims:e[1],download:n,dispose:o})}default:throw new Error(`invalid data location: ${e[3]}`)}},pn=class{async fetchModelAndCopyToWasmMemory(t){return jl(await Yt(t))}async loadModel(t,r){Ve();let n;typeof t=="string"?!1?n=await Yt(t):n=await this.fetchModelAndCopyToWasmMemory(t):n=t,[this.sessionId,this.inputNames,this.outputNames]=await Kl(n,r),Re()}async dispose(){return Yl(this.sessionId)}async run(t,r,n){Ve();let o=[],i=[];Object.entries(t).forEach(h=>{let w=h[0],b=h[1],g=this.inputNames.indexOf(w);if(g===-1)throw new Error(`invalid input '${w}'`);o.push(b),i.push(g)});let a=[],d=[];Object.entries(r).forEach(h=>{let w=h[0],b=h[1],g=this.outputNames.indexOf(w);if(g===-1)throw new Error(`invalid output '${w}'`);a.push(b),d.push(g)});let l=o.map((h,w)=>Ql(h,()=>`input "${this.inputNames[i[w]]}"`)),c=a.map((h,w)=>h?Ql(h,()=>`output "${this.outputNames[d[w]]}"`):null),m=await Zl(this.sessionId,i,l,d,c,n),u={};for(let h=0;h<m.length;h++)u[this.outputNames[d[h]]]=a[h]??Fh(m[h]);return Re(),u}startProfiling(){}endProfiling(){Xl(this.sessionId)}}});var tc={};Lt(tc,{OnnxruntimeWebAssemblyBackend:()=>mn,initializeFlags:()=>ec,wasmBackend:()=>qh});var ec,mn,qh,rc=M(()=>{"use strict";Fe();Oo();Jl();Ht();ec=()=>{if((typeof xe.wasm.initTimeout!="number"||xe.wasm.initTimeout<0)&&(xe.wasm.initTimeout=0),xe.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof xe.wasm.proxy!="boolean"&&(xe.wasm.proxy=!1),typeof xe.wasm.trace!="boolean"&&(xe.wasm.trace=!1),typeof xe.wasm.numThreads!="number"||!Number.isInteger(xe.wasm.numThreads)||xe.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)xe.wasm.numThreads=1;else{let e=typeof navigator>"u"?Nn("node:os").cpus().length:navigator.hardwareConcurrency;xe.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},mn=class{async init(t){ec(),await Fl(),await ql(t)}async createInferenceSessionHandler(t,r){let n=new pn;return await n.loadModel(t,r),Promise.resolve(n)}},qh=new mn});Fe();Fe();Fe();var Aa="1.21.0-dev.20241025-c5b6be045f";var Vx=Hn;{let e=(rc(),gr(tc)).wasmBackend;vt("webgpu",e,5),vt("webnn",e,5),vt("cpu",e,10),vt("wasm",e,10)}Object.defineProperty(xe.versions,"web",{value:Aa,enumerable:!0});export{Ip as InferenceSession,$r as TRACE,Ve as TRACE_FUNC_BEGIN,Re as TRACE_FUNC_END,Be as Tensor,Ap as TrainingSession,Vx as default,xe as env,vt as registerBackend};
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
//# sourceMappingURL=ort.webgpu.bundle.min.mjs.map
