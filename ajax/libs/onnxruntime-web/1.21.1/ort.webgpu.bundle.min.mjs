/*!
 * ONNX Runtime Web v1.21.1
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var En=Object.defineProperty;var kp=Object.getOwnPropertyDescriptor;var Ep=Object.getOwnPropertyNames;var Pp=Object.prototype.hasOwnProperty;var Pn=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var V=(e,t)=>()=>(e&&(t=e(e=0)),t);var Gt=(e,t)=>{for(var r in t)En(e,r,{get:t[r],enumerable:!0})},zp=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Ep(t))!Pp.call(e,o)&&o!==r&&En(e,o,{get:()=>t[o],enumerable:!(n=kp(t,o))||n.enumerable});return e};var pr=e=>zp(En({},"__esModule",{value:!0}),e);var mr,vt,$t,Op,Vi,zn=V(()=>{"use strict";mr=new Map,vt=[],$t=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let n=mr.get(e);if(n===void 0)mr.set(e,{backend:t,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let o=vt.indexOf(e);o!==-1&&vt.splice(o,1);for(let i=0;i<vt.length;i++)if(mr.get(vt[i]).priority<=r){vt.splice(i,0,e);return}vt.push(e)}return}throw new TypeError("not a valid backend")},Op=async e=>{let t=mr.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(n){return r||(t.error=`${n}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Vi=async e=>{let t=e.executionProviders||[],r=t.map(d=>typeof d=="string"?d:d.name),n=r.length===0?vt:r,o,i=[],a=new Set;for(let d of n){let c=await Op(d);typeof c=="string"?i.push({name:d,err:c}):(o||(o=c),o===c&&a.add(d))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(d=>`[${d.name}] ${d.err}`).join(", ")}`);for(let{name:d,err:c}of i)r.includes(d)&&console.warn(`removing requested execution provider "${d}" from session options because it is not available: ${c}`);let u=t.filter(d=>a.has(typeof d=="string"?d:d.name));return[o,new Proxy(e,{get:(d,c)=>c==="executionProviders"?u:Reflect.get(d,c)})]}});var Wi=V(()=>{"use strict";zn()});var Li,Gi=V(()=>{"use strict";Li="1.21.1"});var Hi,Be,On=V(()=>{"use strict";Gi();Hi="warning",Be={wasm:{},webgl:{},webgpu:{},versions:{common:Li},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Hi=e}},get logLevel(){return Hi}};Object.defineProperty(Be,"logLevel",{enumerable:!0})});var ge,Fi=V(()=>{"use strict";On();ge=Be});var qi,Ki,ji=V(()=>{"use strict";qi=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(n!=null){let o,i;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[3]):(o=e.dims[3],i=e.dims[2]);let a=t?.format!==void 0?t.format:"RGB",u=t?.norm,d,c;u===void 0||u.mean===void 0?d=[255,255,255,255]:typeof u.mean=="number"?d=[u.mean,u.mean,u.mean,u.mean]:(d=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(d[3]=u.mean[3])),u===void 0||u.bias===void 0?c=[0,0,0,0]:typeof u.bias=="number"?c=[u.bias,u.bias,u.bias,u.bias]:(c=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(c[3]=u.bias[3]));let p=i*o,m=0,f=p,y=p*2,g=-1;a==="RGBA"?(m=0,f=p,y=p*2,g=p*3):a==="RGB"?(m=0,f=p,y=p*2):a==="RBG"&&(m=0,y=p,f=p*2);for(let _=0;_<i;_++)for(let x=0;x<o;x++){let $=(e.data[m++]-c[0])*d[0],w=(e.data[f++]-c[1])*d[1],S=(e.data[y++]-c[2])*d[2],T=g===-1?255:(e.data[g++]-c[3])*d[3];n.fillStyle="rgba("+$+","+w+","+S+","+T+")",n.fillRect(x,_,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Ki=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(r!=null){let o,i,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[1],a=e.dims[3]):(o=e.dims[3],i=e.dims[2],a=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",d=t?.norm,c,p;d===void 0||d.mean===void 0?c=[255,255,255,255]:typeof d.mean=="number"?c=[d.mean,d.mean,d.mean,d.mean]:(c=[d.mean[0],d.mean[1],d.mean[2],255],d.mean[3]!==void 0&&(c[3]=d.mean[3])),d===void 0||d.bias===void 0?p=[0,0,0,0]:typeof d.bias=="number"?p=[d.bias,d.bias,d.bias,d.bias]:(p=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(p[3]=d.bias[3]));let m=i*o;if(t!==void 0&&(t.format!==void 0&&a===4&&t.format!=="RGBA"||a===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let f=4,y=0,g=1,_=2,x=3,$=0,w=m,S=m*2,T=-1;u==="RGBA"?($=0,w=m,S=m*2,T=m*3):u==="RGB"?($=0,w=m,S=m*2):u==="RBG"&&($=0,S=m,w=m*2),n=r.createImageData(o,i);for(let I=0;I<i*o;y+=f,g+=f,_+=f,x+=f,I++)n.data[y]=(e.data[$++]-p[0])*c[0],n.data[g]=(e.data[w++]-p[1])*c[1],n.data[_]=(e.data[S++]-p[2])*c[2],n.data[x]=T===-1?255:(e.data[T++]-p[3])*c[3]}else throw new Error("Can not access image data");return n}});var Dn,Zi,Qi,Yi,Xi,Ji,ea=V(()=>{"use strict";fr();Dn=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=t,o=t.norm??{mean:255,bias:0},i,a;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?a=[o.bias,o.bias,o.bias,o.bias]:a=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",d=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",c=r*n,p=d==="RGBA"?new Float32Array(c*4):new Float32Array(c*3),m=4,f=0,y=1,g=2,_=3,x=0,$=c,w=c*2,S=-1;u==="RGB"&&(m=3,f=0,y=1,g=2,_=-1),d==="RGBA"?S=c*3:d==="RBG"?(x=0,w=c,$=c*2):d==="BGR"&&(w=0,$=c,x=c*2);for(let I=0;I<c;I++,f+=m,g+=m,y+=m,_+=m)p[x++]=(e[f]+a[0])/i[0],p[$++]=(e[y]+a[1])/i[1],p[w++]=(e[g]+a[2])/i[2],S!==-1&&_!==-1&&(p[S++]=(e[_]+a[3])/i[3]);return d==="RGBA"?new Pe("float32",p,[1,4,r,n]):new Pe("float32",p,[1,3,r,n])},Zi=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,n=typeof ImageData<"u"&&e instanceof ImageData,o=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,i=typeof e=="string",a,u=t??{},d=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},c=p=>typeof HTMLCanvasElement<"u"&&p instanceof HTMLCanvasElement||p instanceof OffscreenCanvas?p.getContext("2d"):null;if(r){let p=d();p.width=e.width,p.height=e.height;let m=c(p);if(m!=null){let f=e.height,y=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(f=t.resizedHeight,y=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=f,u.width=y}else u.tensorFormat="RGBA",u.height=f,u.width=y;m.drawImage(e,0,0),a=m.getImageData(0,0,y,f).data}else throw new Error("Can not access image data")}else if(n){let p,m;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(p=t.resizedHeight,m=t.resizedWidth):(p=e.height,m=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=p,u.width=m,t!==void 0){let f=d();f.width=m,f.height=p;let y=c(f);if(y!=null)y.putImageData(e,0,0),a=y.getImageData(0,0,m,p).data;else throw new Error("Can not access image data")}else a=e.data}else if(o){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let p=d();p.width=e.width,p.height=e.height;let m=c(p);if(m!=null){let f=e.height,y=e.width;return m.drawImage(e,0,0,y,f),a=m.getImageData(0,0,y,f).data,u.height=f,u.width=y,Dn(a,u)}else throw new Error("Can not access image data")}else{if(i)return new Promise((p,m)=>{let f=d(),y=c(f);if(!e||!y)return m();let g=new Image;g.crossOrigin="Anonymous",g.src=e,g.onload=()=>{f.width=g.width,f.height=g.height,y.drawImage(g,0,0,f.width,f.height);let _=y.getImageData(0,0,f.width,f.height);u.height=f.height,u.width=f.width,p(Dn(_.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return Dn(a,u);throw new Error("Input data provided is not supported - aborted tensor creation")},Qi=(e,t)=>{let{width:r,height:n,download:o,dispose:i}=t,a=[1,n,r,4];return new Pe({location:"texture",type:"float32",texture:e,dims:a,download:o,dispose:i})},Yi=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:i}=t;return new Pe({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:o,dispose:i})},Xi=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:i}=t;return new Pe({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:n,download:o,dispose:i})},Ji=(e,t,r)=>new Pe({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})});var xt,Ht,ta,ra,na=V(()=>{"use strict";xt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Ht=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),ta=!1,ra=()=>{if(!ta){ta=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,n=typeof r<"u"&&r.from;e&&(xt.set("int64",BigInt64Array),Ht.set(BigInt64Array,"int64")),t&&(xt.set("uint64",BigUint64Array),Ht.set(BigUint64Array,"uint64")),n?(xt.set("float16",r),Ht.set(r,"float16")):xt.set("float16",Uint16Array)}}});var oa,ia,aa=V(()=>{"use strict";fr();oa=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},ia=(e,t)=>{switch(e.location){case"cpu":return new Pe(e.type,e.data,t);case"cpu-pinned":return new Pe({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Pe({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Pe({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Pe({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var Pe,fr=V(()=>{"use strict";ji();ea();na();aa();Pe=class{constructor(t,r,n){ra();let o,i;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,o=t.type,i=t.dims,t.location){case"cpu-pinned":{let u=xt.get(o);if(!u)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(t.data instanceof u))throw new TypeError(`buffer should be of type ${u.name}`);this.cpuData=t.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let u,d;if(typeof t=="string")if(o=t,d=n,t==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");u=r}else{let c=xt.get(t);if(c===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(r)){if(t==="float16"&&c===Uint16Array||t==="uint4"||t==="int4")throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${c.name} as data.`);t==="uint64"||t==="int64"?u=c.from(r,BigInt):u=c.from(r)}else if(r instanceof c)u=r;else if(r instanceof Uint8ClampedArray)if(t==="uint8")u=Uint8Array.from(r);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(t==="float16"&&r instanceof Uint16Array&&c!==Uint16Array)u=new globalThis.Float16Array(r.buffer,r.byteOffset,r.length);else throw new TypeError(`A ${o} tensor's data must be type of ${c}`)}else if(d=r,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let c=typeof t[0];if(c==="string")o="string",u=t;else if(c==="boolean")o="bool",u=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${c}.`)}else if(t instanceof Uint8ClampedArray)o="uint8",u=Uint8Array.from(t);else{let c=Ht.get(t.constructor);if(c===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);o=c,u=t}if(d===void 0)d=[u.length];else if(!Array.isArray(d))throw new TypeError("A tensor's dims must be a number array");i=d,this.cpuData=u,this.dataLocation="cpu"}let a=oa(i);if(this.cpuData&&a!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=a}static async fromImage(t,r){return Zi(t,r)}static fromTexture(t,r){return Qi(t,r)}static fromGpuBuffer(t,r){return Yi(t,r)}static fromMLTensor(t,r){return Xi(t,r)}static fromPinnedBuffer(t,r,n){return Ji(t,r,n)}toDataURL(t){return qi(this,t)}toImageData(t){return Ki(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,t&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return ia(this,t)}}});var Le,Bn=V(()=>{"use strict";fr();Le=Pe});var hr,sa,Me,ze,Mn=V(()=>{"use strict";On();hr=(e,t)=>{(typeof Be.trace>"u"?!Be.wasm.trace:!Be.trace)||console.timeStamp(`${e}::ORT::${t}`)},sa=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],n=!1;for(let o=0;o<r.length;o++){if(n&&!r[o].includes("TRACE_FUNC")){let i=`FUNC_${e}::${r[o].trim().split(" ")[1]}`;t&&(i+=`::${t}`),hr("CPU",i);return}r[o].includes("TRACE_FUNC")&&(n=!0)}},Me=e=>{(typeof Be.trace>"u"?!Be.wasm.trace:!Be.trace)||sa("BEGIN",e)},ze=e=>{(typeof Be.trace>"u"?!Be.wasm.trace:!Be.trace)||sa("END",e)}});var gr,ua=V(()=>{"use strict";zn();Bn();Mn();gr=class e{constructor(t){this.handler=t}async run(t,r,n){Me();let o={},i={};if(typeof t!="object"||t===null||t instanceof Le||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Le)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let c of r){if(typeof c!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(c)===-1)throw new RangeError(`'fetches' contains invalid output name: ${c}.`);o[c]=null}if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let c=!1,p=Object.getOwnPropertyNames(r);for(let m of this.outputNames)if(p.indexOf(m)!==-1){let f=r[m];(f===null||f instanceof Le)&&(c=!0,a=!1,o[m]=f)}if(c){if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let c of this.inputNames)if(typeof t[c]>"u")throw new Error(`input '${c}' is missing in 'feeds'.`);if(a)for(let c of this.outputNames)o[c]=null;let u=await this.handler.run(t,o,i),d={};for(let c in u)if(Object.hasOwnProperty.call(u,c)){let p=u[c];p instanceof Le?d[c]=p:d[c]=new Le(p.type,p.data,p.dims)}return ze(),d}async release(){return this.handler.dispose()}static async create(t,r,n,o){Me();let i,a={};if(typeof t=="string"){if(i=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(i=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let p=t,m=0,f=t.byteLength;if(typeof r=="object"&&r!==null)a=r;else if(typeof r=="number"){if(m=r,!Number.isSafeInteger(m))throw new RangeError("'byteOffset' must be an integer.");if(m<0||m>=p.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${p.byteLength}).`);if(f=t.byteLength-m,typeof n=="number"){if(f=n,!Number.isSafeInteger(f))throw new RangeError("'byteLength' must be an integer.");if(f<=0||m+f>p.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${p.byteLength-m}].`);if(typeof o=="object"&&o!==null)a=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof n<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(p,m,f)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,d]=await Vi(a),c=await u.createInferenceSessionHandler(i,d);return ze(),new e(c)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var Dp,da=V(()=>{"use strict";ua();Dp=gr});var la=V(()=>{"use strict"});var ca=V(()=>{"use strict"});var pa=V(()=>{"use strict"});var ma=V(()=>{"use strict"});var Rn={};Gt(Rn,{InferenceSession:()=>Dp,TRACE:()=>hr,TRACE_FUNC_BEGIN:()=>Me,TRACE_FUNC_END:()=>ze,Tensor:()=>Le,env:()=>ge,registerBackend:()=>$t});var Ne=V(()=>{"use strict";Wi();Fi();da();Bn();la();ca();Mn();pa();ma()});var br=V(()=>{"use strict"});var ba={};Gt(ba,{default:()=>Bp});var ha,ga,Bp,ya=V(()=>{"use strict";Un();ft();yr();ha="ort-wasm-proxy-worker",ga=globalThis.self?.name===ha;ga&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":_r(r.wasm).then(()=>{wr(r).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})})},n=>{postMessage({type:t,err:n})});break;case"init-ep":{let{epName:n,env:o}=r;vr(o,n).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})});break}case"copy-from":{let{buffer:n}=r,o=Ft(n);postMessage({type:t,out:o});break}case"create":{let{model:n,options:o}=r;$r(n,o).then(i=>{postMessage({type:t,out:i})},i=>{postMessage({type:t,err:i})});break}case"release":xr(r),postMessage({type:t});break;case"run":{let{sessionId:n,inputIndices:o,inputs:i,outputIndices:a,options:u}=r;Sr(n,o,i,a,new Array(a.length).fill(null),u).then(d=>{d.some(c=>c[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:d},Ir([...i,...d]))},d=>{postMessage({type:t,err:d})});break}case"end-profiling":Tr(r),postMessage({type:t});break;default:}}catch(n){postMessage({type:t,err:n})}});Bp=ga?null:e=>new Worker(e??Re,{type:"module",name:ha})});var wa={};Gt(wa,{default:()=>Mp});var Nn,_a,Mp,Rp,va=V(()=>{"use strict";_a=(Nn=import.meta.url,async function(e={}){var t,r,n=e,o=new Promise((s,l)=>{t=s,r=l}),i=typeof window=="object",a=typeof WorkerGlobalScope<"u",u=a&&self.name?.startsWith("em-pthread");n.mountExternalData=(s,l)=>{s.startsWith("./")&&(s=s.substring(2)),(n.Fb||(n.Fb=new Map)).set(s,l)},n.unmountExternalData=()=>{delete n.Fb};var d=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let c=()=>{let s=(h,b,v)=>(...A)=>{let D=Ze,R=b?.();A=h(...A);let L=b?.();return R!==L&&(h=L,v(R),b=v=null),Ze!=D?new Promise((j,ne)=>{$n={resolve:j,reject:ne}}):A},l=h=>async(...b)=>{try{if(n.Gb)throw Error("Session already started");let v=n.Gb={fc:b[0],errors:[]},A=await h(...b);if(n.Gb!==v)throw Error("Session mismatch");n.Hb?.flush();let D=v.errors;if(0<D.length){let R=await Promise.all(D);if(R=R.filter(L=>L),0<R.length)throw Error(R.join(`
`))}return A}finally{n.Gb=null}};n._OrtCreateSession=s(n._OrtCreateSession,()=>n._OrtCreateSession,h=>n._OrtCreateSession=h),n._OrtRun=l(s(n._OrtRun,()=>n._OrtRun,h=>n._OrtRun=h)),n._OrtRunWithBinding=l(s(n._OrtRunWithBinding,()=>n._OrtRunWithBinding,h=>n._OrtRunWithBinding=h)),n._OrtBindInput=s(n._OrtBindInput,()=>n._OrtBindInput,h=>n._OrtBindInput=h),c=void 0};n.jsepInit=(s,l)=>{if(c?.(),s==="webgpu"){[n.Hb,n.Vb,n.Zb,n.Lb,n.Yb,n.kb,n.$b,n.cc,n.Wb,n.Xb,n.ac]=l;let h=n.Hb;n.jsepRegisterBuffer=(b,v,A,D)=>h.registerBuffer(b,v,A,D),n.jsepGetBuffer=b=>h.getBuffer(b),n.jsepCreateDownloader=(b,v,A)=>h.createDownloader(b,v,A),n.jsepOnCreateSession=b=>{h.onCreateSession(b)},n.jsepOnReleaseSession=b=>{h.onReleaseSession(b)},n.jsepOnRunStart=b=>h.onRunStart(b),n.dc=(b,v)=>{h.upload(b,v)}}else if(s==="webnn"){[n.Hb,n.bc,n.Mb,n.jsepEnsureTensor,n.Nb,n.jsepDownloadTensor]=l,n.jsepReleaseTensorId=n.Mb,n.jsepUploadTensor=n.Nb;let h=n.Hb;n.jsepOnRunStart=b=>h.onRunStart(b),n.jsepOnRunEnd=h.onRunEnd.bind(h),n.jsepRegisterMLContext=(b,v)=>{h.registerMLContext(b,v)},n.jsepOnReleaseSession=b=>{h.onReleaseSession(b)},n.jsepCreateMLTensorDownloader=(b,v)=>h.createMLTensorDownloader(b,v),n.jsepRegisterMLTensor=(b,v,A,D)=>h.registerMLTensor(b,v,A,D),n.jsepCreateMLContext=b=>h.createMLContext(b),n.jsepRegisterMLConstant=(b,v,A,D,R)=>h.registerMLConstant(b,v,A,D,R,n.Fb),n.jsepRegisterGraphInput=h.registerGraphInput.bind(h),n.jsepIsGraphInput=h.isGraphInput.bind(h),n.jsepCreateTemporaryTensor=h.createTemporaryTensor.bind(h)}};var p,m,f=Object.assign({},n),y=(s,l)=>{throw l},g="";(i||a)&&(a?g=self.location.href:typeof document<"u"&&document.currentScript&&(g=document.currentScript.src),Nn&&(g=Nn),g=g.startsWith("blob:")?"":g.slice(0,g.replace(/[?#].*/,"").lastIndexOf("/")+1),a&&(m=s=>{var l=new XMLHttpRequest;return l.open("GET",s,!1),l.responseType="arraybuffer",l.send(null),new Uint8Array(l.response)}),p=async s=>{if(ie(s))return new Promise((h,b)=>{var v=new XMLHttpRequest;v.open("GET",s,!0),v.responseType="arraybuffer",v.onload=()=>{v.status==200||v.status==0&&v.response?h(v.response):b(v.status)},v.onerror=b,v.send(null)});var l=await fetch(s,{credentials:"same-origin"});if(l.ok)return l.arrayBuffer();throw Error(l.status+" : "+l.url)});var _=console.log.bind(console),x=console.error.bind(console),$=_,w=x;Object.assign(n,f),f=null;var S,T,I,C,P,O,U,G,F,te,N,Y,ye,q=n.wasmBinary,X=!1,ie=s=>s.startsWith("file://");function Z(){return S.buffer!=C.buffer&&fe(),C}function se(){return S.buffer!=C.buffer&&fe(),P}function Te(){return S.buffer!=C.buffer&&fe(),O}function we(){return S.buffer!=C.buffer&&fe(),U}function z(){return S.buffer!=C.buffer&&fe(),G}function B(){return S.buffer!=C.buffer&&fe(),F}function K(){return S.buffer!=C.buffer&&fe(),te}function de(){return S.buffer!=C.buffer&&fe(),ye}if(u){let s=function(l){try{var h=l.data,b=h.Cb;if(b==="load"){let v=[];self.onmessage=A=>v.push(A),self.startWorker=()=>{postMessage({Cb:"loaded"});for(let A of v)s(A);self.onmessage=s};for(let A of h.Sb)n[A]&&!n[A].proxy||(n[A]=(...D)=>{postMessage({Cb:"callHandler",Rb:A,args:D})},A=="print"&&($=n[A]),A=="printErr"&&(w=n[A]));S=h.mc,fe(),We(h.nc)}else if(b==="run"){lc(h.Bb),In(h.Bb,0,0,1,0,0),Do(),wn(h.Bb),_e||(Ai(),_e=!0);try{cc(h.ic,h.Jb)}catch(v){if(v!="unwind")throw v}}else h.target!=="setimmediate"&&(b==="checkMailbox"?_e&&tr():b&&(w(`worker: received unknown command ${b}`),w(h)))}catch(v){throw ki(),v}};var lg=s,We,_e=!1;w=function(...l){l=l.join(" "),console.error(l)},self.alert=function(...l){postMessage({Cb:"alert",text:l.join(" "),kc:dr()})},self.onunhandledrejection=l=>{throw l.reason||l},self.onmessage=s}function fe(){var s=S.buffer;n.HEAP8=C=new Int8Array(s),n.HEAP16=O=new Int16Array(s),n.HEAPU8=P=new Uint8Array(s),n.HEAPU16=U=new Uint16Array(s),n.HEAP32=G=new Int32Array(s),n.HEAPU32=F=new Uint32Array(s),n.HEAPF32=te=new Float32Array(s),n.HEAPF64=ye=new Float64Array(s),n.HEAP64=N=new BigInt64Array(s),n.HEAPU64=Y=new BigUint64Array(s)}function Ke(){u?startWorker(n):Q.Ca()}u||(S=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),fe());var Nt,_t=0,Vt=null;function Co(){if(--_t==0&&Vt){var s=Vt;Vt=null,s()}}function ut(s){throw w(s="Aborted("+s+")"),X=!0,s=new WebAssembly.RuntimeError(s+". Build with -sASSERTIONS for more info."),r(s),s}function Ao(){return{a:{L:dc,Aa:uc,b:mc,$:Uo,A:Wo,pa:Lo,X:Ho,Z:Fo,qa:qo,na:Ko,ga:jo,ma:Zo,J:Qo,Y:Yo,V:Xo,oa:Jo,W:ei,va:fc,E:gc,Q:bc,O:_c,D:vc,u:$c,r:xc,P:Sc,z:Pc,R:zc,ja:Oc,T:Dc,aa:Bc,M:Mc,F:Rc,ia:wn,sa:Uc,t:Nc,Ba:Vc,w:Gc,n:Hc,m:qc,c:bn,o:Kc,k:Qc,v:Yc,p:Xc,f:Jc,s:ep,l:tp,e:rp,j:np,i:op,g:ip,d:ap,da:sp,ea:up,fa:dp,ba:fi,ca:hi,N:gi,xa:cp,ua:fp,h:hp,C:gp,G:bp,ta:pp,x:yp,ra:_p,U:wp,q:lp,y:vp,K:$p,S:xp,za:Sp,ya:Tp,ka:wi,la:vi,_:mn,B:$i,I:xi,ha:Si,H:Ti,a:S,wa:pn}}}var dn={819692:(s,l,h,b,v)=>{if(n===void 0||!n.Fb)return 1;if((s=Se(Number(s>>>0))).startsWith("./")&&(s=s.substring(2)),!(s=n.Fb.get(s)))return 2;if(l=Number(l>>>0),h=Number(h>>>0),b=Number(b>>>0),l+h>s.byteLength)return 3;try{let A=s.subarray(l,l+h);switch(v){case 0:se().set(A,b>>>0);break;case 1:n.dc(b,A);break;default:return 4}return 0}catch{return 4}},820407:(s,l,h)=>{n.Nb(s,se().subarray(l>>>0,l+h>>>0))},820470:()=>n.bc(),820511:s=>{n.Mb(s)},820547:()=>{n.Wb()},820578:()=>{n.Xb()},820607:()=>{n.ac()},820632:s=>n.Vb(s),820665:s=>n.Zb(s),820697:(s,l,h)=>{n.Lb(Number(s),Number(l),Number(h),!0)},820760:(s,l,h)=>{n.Lb(Number(s),Number(l),Number(h))},820817:()=>typeof wasmOffsetConverter<"u",820874:s=>{n.kb("Abs",s,void 0)},820925:s=>{n.kb("Neg",s,void 0)},820976:s=>{n.kb("Floor",s,void 0)},821029:s=>{n.kb("Ceil",s,void 0)},821081:s=>{n.kb("Reciprocal",s,void 0)},821139:s=>{n.kb("Sqrt",s,void 0)},821191:s=>{n.kb("Exp",s,void 0)},821242:s=>{n.kb("Erf",s,void 0)},821293:s=>{n.kb("Sigmoid",s,void 0)},821348:(s,l,h)=>{n.kb("HardSigmoid",s,{alpha:l,beta:h})},821427:s=>{n.kb("Log",s,void 0)},821478:s=>{n.kb("Sin",s,void 0)},821529:s=>{n.kb("Cos",s,void 0)},821580:s=>{n.kb("Tan",s,void 0)},821631:s=>{n.kb("Asin",s,void 0)},821683:s=>{n.kb("Acos",s,void 0)},821735:s=>{n.kb("Atan",s,void 0)},821787:s=>{n.kb("Sinh",s,void 0)},821839:s=>{n.kb("Cosh",s,void 0)},821891:s=>{n.kb("Asinh",s,void 0)},821944:s=>{n.kb("Acosh",s,void 0)},821997:s=>{n.kb("Atanh",s,void 0)},822050:s=>{n.kb("Tanh",s,void 0)},822102:s=>{n.kb("Not",s,void 0)},822153:(s,l,h)=>{n.kb("Clip",s,{min:l,max:h})},822222:s=>{n.kb("Clip",s,void 0)},822274:(s,l)=>{n.kb("Elu",s,{alpha:l})},822332:s=>{n.kb("Gelu",s,void 0)},822384:s=>{n.kb("Relu",s,void 0)},822436:(s,l)=>{n.kb("LeakyRelu",s,{alpha:l})},822500:(s,l)=>{n.kb("ThresholdedRelu",s,{alpha:l})},822570:(s,l)=>{n.kb("Cast",s,{to:l})},822628:s=>{n.kb("Add",s,void 0)},822679:s=>{n.kb("Sub",s,void 0)},822730:s=>{n.kb("Mul",s,void 0)},822781:s=>{n.kb("Div",s,void 0)},822832:s=>{n.kb("Pow",s,void 0)},822883:s=>{n.kb("Equal",s,void 0)},822936:s=>{n.kb("Greater",s,void 0)},822991:s=>{n.kb("GreaterOrEqual",s,void 0)},823053:s=>{n.kb("Less",s,void 0)},823105:s=>{n.kb("LessOrEqual",s,void 0)},823164:(s,l,h,b,v)=>{n.kb("ReduceMean",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:b?Array.from(z().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},823339:(s,l,h,b,v)=>{n.kb("ReduceMax",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:b?Array.from(z().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},823513:(s,l,h,b,v)=>{n.kb("ReduceMin",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:b?Array.from(z().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},823687:(s,l,h,b,v)=>{n.kb("ReduceProd",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:b?Array.from(z().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},823862:(s,l,h,b,v)=>{n.kb("ReduceSum",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:b?Array.from(z().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},824036:(s,l,h,b,v)=>{n.kb("ReduceL1",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:b?Array.from(z().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},824209:(s,l,h,b,v)=>{n.kb("ReduceL2",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:b?Array.from(z().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},824382:(s,l,h,b,v)=>{n.kb("ReduceLogSum",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:b?Array.from(z().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},824559:(s,l,h,b,v)=>{n.kb("ReduceSumSquare",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:b?Array.from(z().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},824739:(s,l,h,b,v)=>{n.kb("ReduceLogSumExp",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:b?Array.from(z().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},824919:s=>{n.kb("Where",s,void 0)},824972:(s,l,h)=>{n.kb("Transpose",s,{perm:l?Array.from(z().subarray(Number(l)>>>0,Number(h)>>>0)):[]})},825096:(s,l,h,b)=>{n.kb("DepthToSpace",s,{blocksize:l,mode:Se(h),format:b?"NHWC":"NCHW"})},825229:(s,l,h,b)=>{n.kb("DepthToSpace",s,{blocksize:l,mode:Se(h),format:b?"NHWC":"NCHW"})},825362:(s,l,h,b,v,A,D,R,L,j,ne,ce,be,Ee,zt)=>{n.kb("ConvTranspose",s,{format:L?"NHWC":"NCHW",autoPad:l,dilations:[h],group:b,kernelShape:[v],pads:[A,D],strides:[R],wIsConst:()=>!!Z()[j>>>0],outputPadding:ne?Array.from(z().subarray(Number(ne)>>>0,Number(ce)>>>0)):[],outputShape:be?Array.from(z().subarray(Number(be)>>>0,Number(Ee)>>>0)):[],activation:Se(zt)})},825795:(s,l,h,b,v,A,D,R,L,j,ne,ce,be,Ee)=>{n.kb("ConvTranspose",s,{format:R?"NHWC":"NCHW",autoPad:l,dilations:Array.from(z().subarray(Number(h)>>>0,2+(Number(h)>>>0)>>>0)),group:b,kernelShape:Array.from(z().subarray(Number(v)>>>0,2+(Number(v)>>>0)>>>0)),pads:Array.from(z().subarray(Number(A)>>>0,4+(Number(A)>>>0)>>>0)),strides:Array.from(z().subarray(Number(D)>>>0,2+(Number(D)>>>0)>>>0)),wIsConst:()=>!!Z()[L>>>0],outputPadding:j?Array.from(z().subarray(Number(j)>>>0,Number(ne)>>>0)):[],outputShape:ce?Array.from(z().subarray(Number(ce)>>>0,Number(be)>>>0)):[],activation:Se(Ee)})},826456:(s,l,h,b,v,A,D,R,L,j,ne,ce,be,Ee,zt)=>{n.kb("ConvTranspose",s,{format:L?"NHWC":"NCHW",autoPad:l,dilations:[h],group:b,kernelShape:[v],pads:[A,D],strides:[R],wIsConst:()=>!!Z()[j>>>0],outputPadding:ne?Array.from(z().subarray(Number(ne)>>>0,Number(ce)>>>0)):[],outputShape:be?Array.from(z().subarray(Number(be)>>>0,Number(Ee)>>>0)):[],activation:Se(zt)})},826889:(s,l,h,b,v,A,D,R,L,j,ne,ce,be,Ee)=>{n.kb("ConvTranspose",s,{format:R?"NHWC":"NCHW",autoPad:l,dilations:Array.from(z().subarray(Number(h)>>>0,2+(Number(h)>>>0)>>>0)),group:b,kernelShape:Array.from(z().subarray(Number(v)>>>0,2+(Number(v)>>>0)>>>0)),pads:Array.from(z().subarray(Number(A)>>>0,4+(Number(A)>>>0)>>>0)),strides:Array.from(z().subarray(Number(D)>>>0,2+(Number(D)>>>0)>>>0)),wIsConst:()=>!!Z()[L>>>0],outputPadding:j?Array.from(z().subarray(Number(j)>>>0,Number(ne)>>>0)):[],outputShape:ce?Array.from(z().subarray(Number(ce)>>>0,Number(be)>>>0)):[],activation:Se(Ee)})},827550:(s,l)=>{n.kb("GlobalAveragePool",s,{format:l?"NHWC":"NCHW"})},827641:(s,l,h,b,v,A,D,R,L,j,ne,ce,be,Ee)=>{n.kb("AveragePool",s,{format:Ee?"NHWC":"NCHW",auto_pad:l,ceil_mode:h,count_include_pad:b,storage_order:v,dilations:A?Array.from(z().subarray(Number(A)>>>0,Number(D)>>>0)):[],kernel_shape:R?Array.from(z().subarray(Number(R)>>>0,Number(L)>>>0)):[],pads:j?Array.from(z().subarray(Number(j)>>>0,Number(ne)>>>0)):[],strides:ce?Array.from(z().subarray(Number(ce)>>>0,Number(be)>>>0)):[]})},828120:(s,l)=>{n.kb("GlobalAveragePool",s,{format:l?"NHWC":"NCHW"})},828211:(s,l,h,b,v,A,D,R,L,j,ne,ce,be,Ee)=>{n.kb("AveragePool",s,{format:Ee?"NHWC":"NCHW",auto_pad:l,ceil_mode:h,count_include_pad:b,storage_order:v,dilations:A?Array.from(z().subarray(Number(A)>>>0,Number(D)>>>0)):[],kernel_shape:R?Array.from(z().subarray(Number(R)>>>0,Number(L)>>>0)):[],pads:j?Array.from(z().subarray(Number(j)>>>0,Number(ne)>>>0)):[],strides:ce?Array.from(z().subarray(Number(ce)>>>0,Number(be)>>>0)):[]})},828690:(s,l)=>{n.kb("GlobalMaxPool",s,{format:l?"NHWC":"NCHW"})},828777:(s,l,h,b,v,A,D,R,L,j,ne,ce,be,Ee)=>{n.kb("MaxPool",s,{format:Ee?"NHWC":"NCHW",auto_pad:l,ceil_mode:h,count_include_pad:b,storage_order:v,dilations:A?Array.from(z().subarray(Number(A)>>>0,Number(D)>>>0)):[],kernel_shape:R?Array.from(z().subarray(Number(R)>>>0,Number(L)>>>0)):[],pads:j?Array.from(z().subarray(Number(j)>>>0,Number(ne)>>>0)):[],strides:ce?Array.from(z().subarray(Number(ce)>>>0,Number(be)>>>0)):[]})},829252:(s,l)=>{n.kb("GlobalMaxPool",s,{format:l?"NHWC":"NCHW"})},829339:(s,l,h,b,v,A,D,R,L,j,ne,ce,be,Ee)=>{n.kb("MaxPool",s,{format:Ee?"NHWC":"NCHW",auto_pad:l,ceil_mode:h,count_include_pad:b,storage_order:v,dilations:A?Array.from(z().subarray(Number(A)>>>0,Number(D)>>>0)):[],kernel_shape:R?Array.from(z().subarray(Number(R)>>>0,Number(L)>>>0)):[],pads:j?Array.from(z().subarray(Number(j)>>>0,Number(ne)>>>0)):[],strides:ce?Array.from(z().subarray(Number(ce)>>>0,Number(be)>>>0)):[]})},829814:(s,l,h,b,v)=>{n.kb("Gemm",s,{alpha:l,beta:h,transA:b,transB:v})},829918:s=>{n.kb("MatMul",s,void 0)},829972:(s,l,h,b)=>{n.kb("ArgMax",s,{keepDims:!!l,selectLastIndex:!!h,axis:b})},830080:(s,l,h,b)=>{n.kb("ArgMin",s,{keepDims:!!l,selectLastIndex:!!h,axis:b})},830188:(s,l)=>{n.kb("Softmax",s,{axis:l})},830251:(s,l)=>{n.kb("Concat",s,{axis:l})},830311:(s,l,h,b,v)=>{n.kb("Split",s,{axis:l,numOutputs:h,splitSizes:b?Array.from(z().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},830467:s=>{n.kb("Expand",s,void 0)},830521:(s,l)=>{n.kb("Gather",s,{axis:Number(l)})},830592:(s,l)=>{n.kb("GatherElements",s,{axis:Number(l)})},830671:(s,l)=>{n.kb("GatherND",s,{batch_dims:Number(l)})},830750:(s,l,h,b,v,A,D,R,L,j,ne)=>{n.kb("Resize",s,{antialias:l,axes:h?Array.from(z().subarray(Number(h)>>>0,Number(b)>>>0)):[],coordinateTransformMode:Se(v),cubicCoeffA:A,excludeOutside:D,extrapolationValue:R,keepAspectRatioPolicy:Se(L),mode:Se(j),nearestMode:Se(ne)})},831112:(s,l,h,b,v,A,D)=>{n.kb("Slice",s,{starts:l?Array.from(z().subarray(Number(l)>>>0,Number(h)>>>0)):[],ends:b?Array.from(z().subarray(Number(b)>>>0,Number(v)>>>0)):[],axes:A?Array.from(z().subarray(Number(A)>>>0,Number(D)>>>0)):[]})},831376:s=>{n.kb("Tile",s,void 0)},831428:(s,l,h)=>{n.kb("InstanceNormalization",s,{epsilon:l,format:h?"NHWC":"NCHW"})},831542:(s,l,h)=>{n.kb("InstanceNormalization",s,{epsilon:l,format:h?"NHWC":"NCHW"})},831656:s=>{n.kb("Range",s,void 0)},831709:(s,l)=>{n.kb("Einsum",s,{equation:Se(l)})},831790:(s,l,h,b,v)=>{n.kb("Pad",s,{mode:l,value:h,pads:b?Array.from(z().subarray(Number(b)>>>0,Number(v)>>>0)):[]})},831933:(s,l,h,b,v,A)=>{n.kb("BatchNormalization",s,{epsilon:l,momentum:h,spatial:!!v,trainingMode:!!b,format:A?"NHWC":"NCHW"})},832102:(s,l,h,b,v,A)=>{n.kb("BatchNormalization",s,{epsilon:l,momentum:h,spatial:!!v,trainingMode:!!b,format:A?"NHWC":"NCHW"})},832271:(s,l,h)=>{n.kb("CumSum",s,{exclusive:Number(l),reverse:Number(h)})},832368:(s,l,h)=>{n.kb("DequantizeLinear",s,{axis:l,blockSize:h})},832458:(s,l,h,b,v)=>{n.kb("GridSample",s,{align_corners:l,mode:Se(h),padding_mode:Se(b),format:v?"NHWC":"NCHW"})},832628:(s,l,h,b,v)=>{n.kb("GridSample",s,{align_corners:l,mode:Se(h),padding_mode:Se(b),format:v?"NHWC":"NCHW"})},832798:(s,l)=>{n.kb("ScatterND",s,{reduction:Se(l)})},832883:(s,l,h,b,v,A,D,R,L)=>{n.kb("Attention",s,{numHeads:l,isUnidirectional:h,maskFilterValue:b,scale:v,doRotary:A,qkvHiddenSizes:D?Array.from(z().subarray(Number(R)>>>0,Number(R)+D>>>0)):[],pastPresentShareBuffer:!!L})},833155:s=>{n.kb("BiasAdd",s,void 0)},833210:s=>{n.kb("BiasSplitGelu",s,void 0)},833271:s=>{n.kb("FastGelu",s,void 0)},833327:(s,l,h,b,v,A,D,R,L,j,ne,ce,be,Ee,zt,Ap)=>{n.kb("Conv",s,{format:ce?"NHWC":"NCHW",auto_pad:l,dilations:h?Array.from(z().subarray(Number(h)>>>0,Number(b)>>>0)):[],group:v,kernel_shape:A?Array.from(z().subarray(Number(A)>>>0,Number(D)>>>0)):[],pads:R?Array.from(z().subarray(Number(R)>>>0,Number(L)>>>0)):[],strides:j?Array.from(z().subarray(Number(j)>>>0,Number(ne)>>>0)):[],w_is_const:()=>!!Z()[Number(be)>>>0],activation:Se(Ee),activation_params:zt?Array.from(K().subarray(Number(zt)>>>0,Number(Ap)>>>0)):[]})},833911:s=>{n.kb("Gelu",s,void 0)},833963:(s,l,h,b,v,A,D,R,L)=>{n.kb("GroupQueryAttention",s,{numHeads:l,kvNumHeads:h,scale:b,softcap:v,doRotary:A,rotaryInterleaved:D,smoothSoftmax:R,localWindowSize:L})},834180:(s,l,h,b)=>{n.kb("LayerNormalization",s,{axis:l,epsilon:h,simplified:!!b})},834291:(s,l,h,b)=>{n.kb("LayerNormalization",s,{axis:l,epsilon:h,simplified:!!b})},834402:(s,l,h,b,v,A)=>{n.kb("MatMulNBits",s,{k:l,n:h,accuracyLevel:b,bits:v,blockSize:A})},834529:(s,l,h,b,v,A)=>{n.kb("MultiHeadAttention",s,{numHeads:l,isUnidirectional:h,maskFilterValue:b,scale:v,doRotary:A})},834688:(s,l)=>{n.kb("QuickGelu",s,{alpha:l})},834752:(s,l,h,b,v)=>{n.kb("RotaryEmbedding",s,{interleaved:!!l,numHeads:h,rotaryEmbeddingDim:b,scale:v})},834891:(s,l,h)=>{n.kb("SkipLayerNormalization",s,{epsilon:l,simplified:!!h})},834993:(s,l,h)=>{n.kb("SkipLayerNormalization",s,{epsilon:l,simplified:!!h})},835095:(s,l,h,b)=>{n.kb("GatherBlockQuantized",s,{gatherAxis:l,quantizeAxis:h,blockSize:b})},835216:s=>{n.$b(s)},835250:(s,l)=>n.cc(Number(s),Number(l),n.Gb.fc,n.Gb.errors)};function uc(s,l,h){return ui(async()=>{await n.Yb(Number(s),Number(l),Number(h))})}function dc(){return typeof wasmOffsetConverter<"u"}class ln{name="ExitStatus";constructor(l){this.message=`Program terminated with exit(${l})`,this.status=l}}var ko=s=>{s.terminate(),s.onmessage=()=>{}},cn=[],Eo=s=>{lt.length==0&&(Mo(),Bo(lt[0]));var l=lt.pop();if(!l)return 6;Wt.push(l),wt[s.Bb]=l,l.Bb=s.Bb;var h={Cb:"run",ic:s.hc,Jb:s.Jb,Bb:s.Bb};return l.postMessage(h,s.Pb),0},dt=0,ve=(s,l,...h)=>{for(var b=2*h.length,v=kn(),A=An(8*b),D=A>>>3,R=0;R<h.length;R++){var L=h[R];typeof L=="bigint"?(N[D+2*R]=1n,N[D+2*R+1]=L):(N[D+2*R]=0n,de()[D+2*R+1>>>0]=L)}return s=Ei(s,0,b,A,l),cr(v),s};function pn(s){if(u)return ve(0,1,s);if(I=s,!(0<dt)){for(var l of Wt)ko(l);for(l of lt)ko(l);lt=[],Wt=[],wt={},X=!0}y(0,new ln(s))}function Po(s){if(u)return ve(1,0,s);mn(s)}var mn=s=>{if(I=s,u)throw Po(s),"unwind";pn(s)},lt=[],Wt=[],zo=[],wt={},Oo=s=>{var l=s.Bb;delete wt[l],lt.push(s),Wt.splice(Wt.indexOf(s),1),s.Bb=0,Pi(l)};function Do(){zo.forEach(s=>s())}var Bo=s=>new Promise(l=>{s.onmessage=v=>{var A=(v=v.data).Cb;if(v.Ib&&v.Ib!=dr()){var D=wt[v.Ib];D?D.postMessage(v,v.Pb):w(`Internal error! Worker sent a message "${A}" to target pthread ${v.Ib}, but that thread no longer exists!`)}else A==="checkMailbox"?tr():A==="spawnThread"?Eo(v):A==="cleanupThread"?Oo(wt[v.jc]):A==="loaded"?(s.loaded=!0,l(s)):A==="alert"?alert(`Thread ${v.kc}: ${v.text}`):v.target==="setimmediate"?s.postMessage(v):A==="callHandler"?n[v.Rb](...v.args):A&&w(`worker sent an unknown command ${A}`)},s.onerror=v=>{throw w(`worker sent an error! ${v.filename}:${v.lineno}: ${v.message}`),v};var h,b=[];for(h of[])n.propertyIsEnumerable(h)&&b.push(h);s.postMessage({Cb:"load",Sb:b,mc:S,nc:T})});function Mo(){var s=new Worker(import.meta.url.startsWith("file:")?new URL("ort.webgpu.bundle.min.mjs",import.meta.url):new URL(import.meta.url),{type:"module",workerData:"em-pthread",name:"em-pthread"});lt.push(s)}var lc=s=>{fe();var l=B()[s+52>>>2>>>0];s=B()[s+56>>>2>>>0],Di(l,l-s),cr(l)},cc=(s,l)=>{dt=0,s=Bi(s,l),0<dt?I=s:Cn(s)};class pc{constructor(l){this.Kb=l-24}}function mc(s,l,h){var b=new pc(s>>>=0);throw l>>>=0,h>>>=0,B()[b.Kb+16>>>2>>>0]=0,B()[b.Kb+4>>>2>>>0]=l,B()[b.Kb+8>>>2>>>0]=h,s}function Ro(s,l,h,b){return u?ve(2,1,s,l,h,b):Uo(s,l,h,b)}function Uo(s,l,h,b){if(s>>>=0,h>>>=0,b>>>=0,d===void 0)return 6;var v=[];return u&&v.length===0?Ro(s,l>>>=0,h,b):(s={hc:h,Bb:s,Jb:b,Pb:v},u?(s.Cb="spawnThread",postMessage(s,v),0):Eo(s))}var No=typeof TextDecoder<"u"?new TextDecoder:void 0,Vo=(s,l=0,h=NaN)=>{var b=(l>>>=0)+h;for(h=l;s[h]&&!(h>=b);)++h;if(16<h-l&&s.buffer&&No)return No.decode(s.buffer instanceof ArrayBuffer?s.subarray(l,h):s.slice(l,h));for(b="";l<h;){var v=s[l++];if(128&v){var A=63&s[l++];if((224&v)==192)b+=String.fromCharCode((31&v)<<6|A);else{var D=63&s[l++];65536>(v=(240&v)==224?(15&v)<<12|A<<6|D:(7&v)<<18|A<<12|D<<6|63&s[l++])?b+=String.fromCharCode(v):(v-=65536,b+=String.fromCharCode(55296|v>>10,56320|1023&v))}}else b+=String.fromCharCode(v)}return b},Se=(s,l)=>(s>>>=0)?Vo(se(),s,l):"";function Wo(s,l,h){return u?ve(3,1,s,l,h):0}function Lo(s,l){if(u)return ve(4,1,s,l)}var Go=s=>{for(var l=0,h=0;h<s.length;++h){var b=s.charCodeAt(h);127>=b?l++:2047>=b?l+=2:55296<=b&&57343>=b?(l+=4,++h):l+=3}return l},Et=(s,l,h)=>{var b=se();if(l>>>=0,0<h){var v=l;h=l+h-1;for(var A=0;A<s.length;++A){var D=s.charCodeAt(A);if(55296<=D&&57343>=D&&(D=65536+((1023&D)<<10)|1023&s.charCodeAt(++A)),127>=D){if(l>=h)break;b[l++>>>0]=D}else{if(2047>=D){if(l+1>=h)break;b[l++>>>0]=192|D>>6}else{if(65535>=D){if(l+2>=h)break;b[l++>>>0]=224|D>>12}else{if(l+3>=h)break;b[l++>>>0]=240|D>>18,b[l++>>>0]=128|D>>12&63}b[l++>>>0]=128|D>>6&63}b[l++>>>0]=128|63&D}}b[l>>>0]=0,s=l-v}else s=0;return s};function Ho(s,l){if(u)return ve(5,1,s,l)}function Fo(s,l,h){if(u)return ve(6,1,s,l,h)}function qo(s,l,h){return u?ve(7,1,s,l,h):0}function Ko(s,l){if(u)return ve(8,1,s,l)}function jo(s,l,h){if(u)return ve(9,1,s,l,h)}function Zo(s,l,h,b){if(u)return ve(10,1,s,l,h,b)}function Qo(s,l,h,b){if(u)return ve(11,1,s,l,h,b)}function Yo(s,l,h,b){if(u)return ve(12,1,s,l,h,b)}function Xo(s){if(u)return ve(13,1,s)}function Jo(s,l){if(u)return ve(14,1,s,l)}function ei(s,l,h){if(u)return ve(15,1,s,l,h)}var ti,ct,fc=()=>ut(""),je=s=>{for(var l="";se()[s>>>0];)l+=ti[se()[s++>>>0]];return l},fn={},hn={},hc={};function ot(s,l,h={}){return function(b,v,A={}){var D=v.name;if(!b)throw new ct(`type "${D}" must have a positive integer typeid pointer`);if(hn.hasOwnProperty(b)){if(A.Tb)return;throw new ct(`Cannot register type '${D}' twice`)}hn[b]=v,delete hc[b],fn.hasOwnProperty(b)&&(v=fn[b],delete fn[b],v.forEach(R=>R()))}(s,l,h)}var ri=(s,l,h)=>{switch(l){case 1:return h?b=>Z()[b>>>0]:b=>se()[b>>>0];case 2:return h?b=>Te()[b>>>1>>>0]:b=>we()[b>>>1>>>0];case 4:return h?b=>z()[b>>>2>>>0]:b=>B()[b>>>2>>>0];case 8:return h?b=>N[b>>>3]:b=>Y[b>>>3];default:throw new TypeError(`invalid integer width (${l}): ${s}`)}};function gc(s,l,h){h>>>=0,ot(s>>>=0,{name:l=je(l>>>0),fromWireType:b=>b,toWireType:function(b,v){if(typeof v!="bigint"&&typeof v!="number")throw v=v===null?"null":(b=typeof v)=="object"||b==="array"||b==="function"?v.toString():""+v,new TypeError(`Cannot convert "${v}" to ${this.name}`);return typeof v=="number"&&(v=BigInt(v)),v},Db:pt,readValueFromPointer:ri(l,h,l.indexOf("u")==-1),Eb:null})}var pt=8;function bc(s,l,h,b){ot(s>>>=0,{name:l=je(l>>>0),fromWireType:function(v){return!!v},toWireType:function(v,A){return A?h:b},Db:pt,readValueFromPointer:function(v){return this.fromWireType(se()[v>>>0])},Eb:null})}var gn=[],it=[];function bn(s){9<(s>>>=0)&&--it[s+1]==0&&(it[s]=void 0,gn.push(s))}var De=s=>{if(!s)throw new ct("Cannot use deleted val. handle = "+s);return it[s]},Ue=s=>{switch(s){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let l=gn.pop()||it.length;return it[l]=s,it[l+1]=1,l}};function yn(s){return this.fromWireType(B()[s>>>2>>>0])}var yc={name:"emscripten::val",fromWireType:s=>{var l=De(s);return bn(s),l},toWireType:(s,l)=>Ue(l),Db:pt,readValueFromPointer:yn,Eb:null};function _c(s){return ot(s>>>0,yc)}var wc=(s,l)=>{switch(l){case 4:return function(h){return this.fromWireType(K()[h>>>2>>>0])};case 8:return function(h){return this.fromWireType(de()[h>>>3>>>0])};default:throw new TypeError(`invalid float width (${l}): ${s}`)}};function vc(s,l,h){h>>>=0,ot(s>>>=0,{name:l=je(l>>>0),fromWireType:b=>b,toWireType:(b,v)=>v,Db:pt,readValueFromPointer:wc(l,h),Eb:null})}function $c(s,l,h,b,v){if(s>>>=0,h>>>=0,l=je(l>>>0),v===-1&&(v=4294967295),v=R=>R,b===0){var A=32-8*h;v=R=>R<<A>>>A}var D=l.includes("unsigned")?function(R,L){return L>>>0}:function(R,L){return L};ot(s,{name:l,fromWireType:v,toWireType:D,Db:pt,readValueFromPointer:ri(l,h,b!==0),Eb:null})}function xc(s,l,h){function b(A){var D=B()[A>>>2>>>0];return A=B()[A+4>>>2>>>0],new v(Z().buffer,A,D)}var v=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][l];ot(s>>>=0,{name:h=je(h>>>0),fromWireType:b,Db:pt,readValueFromPointer:b},{Tb:!0})}function Sc(s,l){ot(s>>>=0,{name:l=je(l>>>0),fromWireType:function(h){for(var b,v=B()[h>>>2>>>0],A=h+4,D=A,R=0;R<=v;++R){var L=A+R;R!=v&&se()[L>>>0]!=0||(D=Se(D,L-D),b===void 0?b=D:(b+="\0",b+=D),D=L+1)}return Qe(h),b},toWireType:function(h,b){b instanceof ArrayBuffer&&(b=new Uint8Array(b));var v=typeof b=="string";if(!(v||b instanceof Uint8Array||b instanceof Uint8ClampedArray||b instanceof Int8Array))throw new ct("Cannot pass non-string to std::string");var A=v?Go(b):b.length,D=lr(4+A+1),R=D+4;if(B()[D>>>2>>>0]=A,v)Et(b,R,A+1);else if(v)for(v=0;v<A;++v){var L=b.charCodeAt(v);if(255<L)throw Qe(D),new ct("String has UTF-16 code units that do not fit in 8 bits");se()[R+v>>>0]=L}else for(v=0;v<A;++v)se()[R+v>>>0]=b[v];return h!==null&&h.push(Qe,D),D},Db:pt,readValueFromPointer:yn,Eb(h){Qe(h)}})}var ni=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Tc=(s,l)=>{for(var h=s>>1,b=h+l/2;!(h>=b)&&we()[h>>>0];)++h;if(32<(h<<=1)-s&&ni)return ni.decode(se().slice(s,h));for(h="",b=0;!(b>=l/2);++b){var v=Te()[s+2*b>>>1>>>0];if(v==0)break;h+=String.fromCharCode(v)}return h},Ic=(s,l,h)=>{if(h??=2147483647,2>h)return 0;var b=l;h=(h-=2)<2*s.length?h/2:s.length;for(var v=0;v<h;++v){var A=s.charCodeAt(v);Te()[l>>>1>>>0]=A,l+=2}return Te()[l>>>1>>>0]=0,l-b},Cc=s=>2*s.length,Ac=(s,l)=>{for(var h=0,b="";!(h>=l/4);){var v=z()[s+4*h>>>2>>>0];if(v==0)break;++h,65536<=v?(v-=65536,b+=String.fromCharCode(55296|v>>10,56320|1023&v)):b+=String.fromCharCode(v)}return b},kc=(s,l,h)=>{if(l>>>=0,h??=2147483647,4>h)return 0;var b=l;h=b+h-4;for(var v=0;v<s.length;++v){var A=s.charCodeAt(v);if(55296<=A&&57343>=A&&(A=65536+((1023&A)<<10)|1023&s.charCodeAt(++v)),z()[l>>>2>>>0]=A,(l+=4)+4>h)break}return z()[l>>>2>>>0]=0,l-b},Ec=s=>{for(var l=0,h=0;h<s.length;++h){var b=s.charCodeAt(h);55296<=b&&57343>=b&&++h,l+=4}return l};function Pc(s,l,h){if(s>>>=0,l>>>=0,h=je(h>>>=0),l===2)var b=Tc,v=Ic,A=Cc,D=R=>we()[R>>>1>>>0];else l===4&&(b=Ac,v=kc,A=Ec,D=R=>B()[R>>>2>>>0]);ot(s,{name:h,fromWireType:R=>{for(var L,j=B()[R>>>2>>>0],ne=R+4,ce=0;ce<=j;++ce){var be=R+4+ce*l;ce!=j&&D(be)!=0||(ne=b(ne,be-ne),L===void 0?L=ne:(L+="\0",L+=ne),ne=be+l)}return Qe(R),L},toWireType:(R,L)=>{if(typeof L!="string")throw new ct(`Cannot pass non-string to C++ string type ${h}`);var j=A(L),ne=lr(4+j+l);return B()[ne>>>2>>>0]=j/l,v(L,ne+4,j+l),R!==null&&R.push(Qe,ne),ne},Db:pt,readValueFromPointer:yn,Eb(R){Qe(R)}})}function zc(s,l){ot(s>>>=0,{Ub:!0,name:l=je(l>>>0),Db:0,fromWireType:()=>{},toWireType:()=>{}})}function Oc(s){In(s>>>0,!a,1,!i,131072,!1),Do()}var _n=s=>{if(!X)try{if(s(),!(0<dt))try{u?Cn(I):mn(I)}catch(l){l instanceof ln||l=="unwind"||y(0,l)}}catch(l){l instanceof ln||l=="unwind"||y(0,l)}};function wn(s){s>>>=0,typeof Atomics.lc=="function"&&(Atomics.lc(z(),s>>>2,s).value.then(tr),s+=128,Atomics.store(z(),s>>>2,1))}var tr=()=>{var s=dr();s&&(wn(s),_n(Oi))};function Dc(s,l){(s>>>=0)==l>>>0?setTimeout(tr):u?postMessage({Ib:s,Cb:"checkMailbox"}):(s=wt[s])&&s.postMessage({Cb:"checkMailbox"})}var vn=[];function Bc(s,l,h,b,v){for(l>>>=0,b/=2,vn.length=b,h=v>>>0>>>3,v=0;v<b;v++)vn[v]=N[h+2*v]?N[h+2*v+1]:de()[h+2*v+1>>>0];return(l?dn[l]:Cp[s])(...vn)}var Mc=()=>{dt=0};function Rc(s){s>>>=0,u?postMessage({Cb:"cleanupThread",jc:s}):Oo(wt[s])}function Uc(s){}var rr=(s,l)=>{var h=hn[s];if(h===void 0)throw s=Ci(s),h=je(s),Qe(s),new ct(`${l} has unknown type ${h}`);return h},oi=(s,l,h)=>{var b=[];return s=s.toWireType(b,h),b.length&&(B()[l>>>2>>>0]=Ue(b)),s};function Nc(s,l,h){return l>>>=0,h>>>=0,s=De(s>>>0),l=rr(l,"emval::as"),oi(l,h,s)}function Vc(s,l){return l>>>=0,s=De(s>>>0),(l=rr(l,"emval::as")).toWireType(null,s)}var nr=s=>{try{s()}catch(l){ut(l)}},mt=0,Ze=null,ii=0,or=[],ai={},si={},Wc=0,$n=null,Lc=[];function ui(s){return function(l){if(!X){if(mt===0){var h=!1,b=!1;l((v=0)=>{if(!X&&(ii=v,h=!0,b)){mt=2,nr(()=>Ui(Ze)),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.resume(),v=!1;try{var A=function(){var L=z()[Ze+8>>>2>>>0];return L=Q[si[L]],--dt,L()}()}catch(L){A=L,v=!0}var D=!1;if(!Ze){var R=$n;R&&($n=null,(v?R.reject:R.resolve)(A),D=!0)}if(v&&!D)throw A}}),b=!0,h||(mt=1,Ze=function(){var v=lr(65548),A=v+12;B()[v>>>2>>>0]=A,B()[v+4>>>2>>>0]=A+65536,A=or[0];var D=ai[A];return D===void 0&&(D=Wc++,ai[A]=D,si[D]=A),A=D,z()[v+8>>>2>>>0]=A,v}(),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.pause(),nr(()=>Mi(Ze)))}else mt===2?(mt=0,nr(Ni),Qe(Ze),Ze=null,Lc.forEach(_n)):ut(`invalid state: ${mt}`);return ii}}(l=>{s().then(l)})}function Gc(s){return s>>>=0,ui(async()=>{var l=await De(s);return Ue(l)})}var ir=[];function Hc(s,l,h,b){return h>>>=0,b>>>=0,(s=ir[s>>>0])(null,l=De(l>>>0),h,b)}var Fc={},ar=s=>{var l=Fc[s];return l===void 0?je(s):l};function qc(s,l,h,b,v){return h>>>=0,b>>>=0,v>>>=0,(s=ir[s>>>0])(l=De(l>>>0),l[h=ar(h)],b,v)}var di=()=>typeof globalThis=="object"?globalThis:Function("return this")();function Kc(s){return(s>>>=0)==0?Ue(di()):(s=ar(s),Ue(di()[s]))}var jc=s=>{var l=ir.length;return ir.push(s),l},Zc=(s,l)=>{for(var h=Array(s),b=0;b<s;++b)h[b]=rr(B()[l+4*b>>>2>>>0],"parameter "+b);return h},li=(s,l)=>Object.defineProperty(l,"name",{value:s});function Qc(s,l,h){var b=(l=Zc(s,l>>>0)).shift();s--;var v=`return function (obj, func, destructorsRef, args) {
`,A=0,D=[];h===0&&D.push("obj");for(var R=["retType"],L=[b],j=0;j<s;++j)D.push("arg"+j),R.push("argType"+j),L.push(l[j]),v+=`  var arg${j} = argType${j}.readValueFromPointer(args${A?"+"+A:""});
`,A+=l[j].Db;return v+=`  var rv = ${h===1?"new func":"func.call"}(${D.join(", ")});
`,b.Ub||(R.push("emval_returnValue"),L.push(oi),v+=`  return emval_returnValue(retType, destructorsRef, rv);
`),R.push(v+`};
`),s=function(ne){var ce=Function;if(!(ce instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof ce} which is not a function`);var be=li(ce.name||"unknownFunctionName",function(){});return be.prototype=ce.prototype,be=new be,(ne=ce.apply(be,ne))instanceof Object?ne:be}(R)(...L),h=`methodCaller<(${l.map(ne=>ne.name).join(", ")}) => ${b.name}>`,jc(li(h,s))}function Yc(s){return s=ar(s>>>0),Ue(n[s])}function Xc(s,l){return l>>>=0,s=De(s>>>0),l=De(l),Ue(s[l])}function Jc(s){9<(s>>>=0)&&(it[s+1]+=1)}function ep(){return Ue([])}function tp(s){s=De(s>>>0);for(var l=Array(s.length),h=0;h<s.length;h++)l[h]=s[h];return Ue(l)}function rp(s){return Ue(ar(s>>>0))}function np(){return Ue({})}function op(s){for(var l=De(s>>>=0);l.length;){var h=l.pop();l.pop()(h)}bn(s)}function ip(s,l,h){l>>>=0,h>>>=0,s=De(s>>>0),l=De(l),h=De(h),s[l]=h}function ap(s,l){return l>>>=0,s=(s=rr(s>>>0,"_emval_take_value")).readValueFromPointer(l),Ue(s)}function sp(s,l){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),l>>>=0,s=new Date(1e3*s),z()[l>>>2>>>0]=s.getUTCSeconds(),z()[l+4>>>2>>>0]=s.getUTCMinutes(),z()[l+8>>>2>>>0]=s.getUTCHours(),z()[l+12>>>2>>>0]=s.getUTCDate(),z()[l+16>>>2>>>0]=s.getUTCMonth(),z()[l+20>>>2>>>0]=s.getUTCFullYear()-1900,z()[l+24>>>2>>>0]=s.getUTCDay(),s=(s.getTime()-Date.UTC(s.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,z()[l+28>>>2>>>0]=s}var ci=s=>s%4==0&&(s%100!=0||s%400==0),pi=[0,31,60,91,121,152,182,213,244,274,305,335],mi=[0,31,59,90,120,151,181,212,243,273,304,334];function up(s,l){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),l>>>=0,s=new Date(1e3*s),z()[l>>>2>>>0]=s.getSeconds(),z()[l+4>>>2>>>0]=s.getMinutes(),z()[l+8>>>2>>>0]=s.getHours(),z()[l+12>>>2>>>0]=s.getDate(),z()[l+16>>>2>>>0]=s.getMonth(),z()[l+20>>>2>>>0]=s.getFullYear()-1900,z()[l+24>>>2>>>0]=s.getDay();var h=(ci(s.getFullYear())?pi:mi)[s.getMonth()]+s.getDate()-1|0;z()[l+28>>>2>>>0]=h,z()[l+36>>>2>>>0]=-60*s.getTimezoneOffset(),h=new Date(s.getFullYear(),6,1).getTimezoneOffset();var b=new Date(s.getFullYear(),0,1).getTimezoneOffset();s=0|(h!=b&&s.getTimezoneOffset()==Math.min(b,h)),z()[l+32>>>2>>>0]=s}function dp(s){s>>>=0;var l=new Date(z()[s+20>>>2>>>0]+1900,z()[s+16>>>2>>>0],z()[s+12>>>2>>>0],z()[s+8>>>2>>>0],z()[s+4>>>2>>>0],z()[s>>>2>>>0],0),h=z()[s+32>>>2>>>0],b=l.getTimezoneOffset(),v=new Date(l.getFullYear(),6,1).getTimezoneOffset(),A=new Date(l.getFullYear(),0,1).getTimezoneOffset(),D=Math.min(A,v);return 0>h?z()[s+32>>>2>>>0]=+(v!=A&&D==b):0<h!=(D==b)&&(v=Math.max(A,v),l.setTime(l.getTime()+6e4*((0<h?D:v)-b))),z()[s+24>>>2>>>0]=l.getDay(),h=(ci(l.getFullYear())?pi:mi)[l.getMonth()]+l.getDate()-1|0,z()[s+28>>>2>>>0]=h,z()[s>>>2>>>0]=l.getSeconds(),z()[s+4>>>2>>>0]=l.getMinutes(),z()[s+8>>>2>>>0]=l.getHours(),z()[s+12>>>2>>>0]=l.getDate(),z()[s+16>>>2>>>0]=l.getMonth(),z()[s+20>>>2>>>0]=l.getYear(),s=l.getTime(),BigInt(isNaN(s)?-1:s/1e3)}function fi(s,l,h,b,v,A,D){return u?ve(16,1,s,l,h,b,v,A,D):-52}function hi(s,l,h,b,v,A){if(u)return ve(17,1,s,l,h,b,v,A)}var Lt={},lp=()=>performance.timeOrigin+performance.now();function gi(s,l){if(u)return ve(18,1,s,l);if(Lt[s]&&(clearTimeout(Lt[s].id),delete Lt[s]),!l)return 0;var h=setTimeout(()=>{delete Lt[s],_n(()=>zi(s,performance.timeOrigin+performance.now()))},l);return Lt[s]={id:h,pc:l},0}function cp(s,l,h,b){s>>>=0,l>>>=0,h>>>=0,b>>>=0;var v=new Date().getFullYear(),A=new Date(v,0,1).getTimezoneOffset();v=new Date(v,6,1).getTimezoneOffset();var D=Math.max(A,v);B()[s>>>2>>>0]=60*D,z()[l>>>2>>>0]=+(A!=v),s=(l=R=>{var L=Math.abs(R);return`UTC${0<=R?"-":"+"}${String(Math.floor(L/60)).padStart(2,"0")}${String(L%60).padStart(2,"0")}`})(A),l=l(v),v<A?(Et(s,h,17),Et(l,b,17)):(Et(s,b,17),Et(l,h,17))}var pp=()=>Date.now(),mp=1;function fp(s,l,h){if(!(0<=s&&3>=s))return 28;if(s===0)s=Date.now();else{if(!mp)return 52;s=performance.timeOrigin+performance.now()}return N[h>>>0>>>3]=BigInt(Math.round(1e6*s)),0}var xn=[],bi=(s,l)=>{xn.length=0;for(var h;h=se()[s++>>>0];){var b=h!=105;l+=(b&=h!=112)&&l%8?4:0,xn.push(h==112?B()[l>>>2>>>0]:h==106?N[l>>>3]:h==105?z()[l>>>2>>>0]:de()[l>>>3>>>0]),l+=b?8:4}return xn};function hp(s,l,h){return s>>>=0,l=bi(l>>>0,h>>>0),dn[s](...l)}function gp(s,l,h){return s>>>=0,l=bi(l>>>0,h>>>0),dn[s](...l)}var bp=()=>{};function yp(s,l){return w(Se(s>>>0,l>>>0))}var _p=()=>{throw dt+=1,"unwind"};function wp(){return 4294901760}var vp=()=>navigator.hardwareConcurrency;function $p(){return ut("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function xp(s){s>>>=0;var l=se().length;if(s<=l||4294901760<s)return!1;for(var h=1;4>=h;h*=2){var b=l*(1+.2/h);b=Math.min(b,s+100663296);e:{b=(Math.min(4294901760,65536*Math.ceil(Math.max(s,b)/65536))-S.buffer.byteLength+65535)/65536|0;try{S.grow(b),fe();var v=1;break e}catch{}v=void 0}if(v)return!0}return!1}var sr=()=>(ut("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Pt={},yi=s=>{s.forEach(l=>{var h=sr();h&&(Pt[h]=l)})};function Sp(){var s=Error().stack.toString().split(`
`);return s[0]=="Error"&&s.shift(),yi(s),Pt.Ob=sr(),Pt.ec=s,Pt.Ob}function Tp(s,l,h){if(s>>>=0,l>>>=0,Pt.Ob==s)var b=Pt.ec;else(b=Error().stack.toString().split(`
`))[0]=="Error"&&b.shift(),yi(b);for(var v=3;b[v]&&sr()!=s;)++v;for(s=0;s<h&&b[s+v];++s)z()[l+4*s>>>2>>>0]=sr();return s}var Sn,Tn={},_i=()=>{if(!Sn){var s,l={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(s in Tn)Tn[s]===void 0?delete l[s]:l[s]=Tn[s];var h=[];for(s in l)h.push(`${s}=${l[s]}`);Sn=h}return Sn};function wi(s,l){if(u)return ve(19,1,s,l);s>>>=0,l>>>=0;var h=0;return _i().forEach((b,v)=>{var A=l+h;for(v=B()[s+4*v>>>2>>>0]=A,A=0;A<b.length;++A)Z()[v++>>>0]=b.charCodeAt(A);Z()[v>>>0]=0,h+=b.length+1}),0}function vi(s,l){if(u)return ve(20,1,s,l);s>>>=0,l>>>=0;var h=_i();B()[s>>>2>>>0]=h.length;var b=0;return h.forEach(v=>b+=v.length+1),B()[l>>>2>>>0]=b,0}function $i(s){return u?ve(21,1,s):52}function xi(s,l,h,b){return u?ve(22,1,s,l,h,b):52}function Si(s,l,h,b){return u?ve(23,1,s,l,h,b):70}var Ip=[null,[],[]];function Ti(s,l,h,b){if(u)return ve(24,1,s,l,h,b);l>>>=0,h>>>=0,b>>>=0;for(var v=0,A=0;A<h;A++){var D=B()[l>>>2>>>0],R=B()[l+4>>>2>>>0];l+=8;for(var L=0;L<R;L++){var j=se()[D+L>>>0],ne=Ip[s];j===0||j===10?((s===1?$:w)(Vo(ne)),ne.length=0):ne.push(j)}v+=R}return B()[b>>>2>>>0]=v,0}u||function(){for(var s=n.numThreads-1;s--;)Mo();cn.unshift(()=>{_t++,function(l){u?l():Promise.all(lt.map(Bo)).then(l)}(()=>Co())})}();for(var Ii=Array(256),ur=0;256>ur;++ur)Ii[ur]=String.fromCharCode(ur);ti=Ii,ct=n.BindingError=class extends Error{constructor(s){super(s),this.name="BindingError"}},n.InternalError=class extends Error{constructor(s){super(s),this.name="InternalError"}},it.push(0,1,void 0,1,null,1,!0,1,!1,1),n.count_emval_handles=()=>it.length/2-5-gn.length;var Q,Cp=[pn,Po,Ro,Wo,Lo,Ho,Fo,qo,Ko,jo,Zo,Qo,Yo,Xo,Jo,ei,fi,hi,gi,wi,vi,$i,xi,Si,Ti];(async function(){function s(b,v){return Q=b.exports,Q=function(){var A=Q,D={};for(let[R,L]of Object.entries(A))D[R]=typeof L=="function"?(...j)=>{or.push(R);try{return L(...j)}finally{X||(or.pop(),Ze&&mt===1&&or.length===0&&(mt=0,dt+=1,nr(Ri),typeof Fibers<"u"&&Fibers.qc()))}}:L;return D}(),Q=function(){var A=Q,D=L=>j=>L(j)>>>0,R=L=>()=>L()>>>0;return(A=Object.assign({},A)).Da=D(A.Da),A.gb=R(A.gb),A.ib=D(A.ib),A.ub=D(A.ub),A.vb=R(A.vb),A.__cxa_get_exception_ptr=D(A.__cxa_get_exception_ptr),A}(),zo.push(Q.jb),T=v,Co(),Q}_t++;var l=Ao();if(n.instantiateWasm)return new Promise(b=>{n.instantiateWasm(l,(v,A)=>{s(v,A),b(v.exports)})});if(u)return new Promise(b=>{We=v=>{var A=new WebAssembly.Instance(v,Ao());b(s(A,v))}});Nt??=n.locateFile?n.locateFile?n.locateFile("ort-wasm-simd-threaded.jsep.wasm",g):g+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href;try{var h=await async function(b){var v=Nt;if(!q&&typeof WebAssembly.instantiateStreaming=="function"&&!ie(v))try{var A=fetch(v,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(A,b)}catch(D){w(`wasm streaming compile failed: ${D}`),w("falling back to ArrayBuffer instantiation")}return async function(D,R){try{var L=await async function(j){if(!q)try{var ne=await p(j);return new Uint8Array(ne)}catch{}if(j==Nt&&q)j=new Uint8Array(q);else{if(!m)throw"both async and sync fetching of the wasm failed";j=m(j)}return j}(D);return await WebAssembly.instantiate(L,R)}catch(j){w(`failed to asynchronously prepare wasm: ${j}`),ut(j)}}(v,b)}(l);return s(h.instance,h.module)}catch(b){return r(b),Promise.reject(b)}})();var Ci=s=>(Ci=Q.Da)(s),Ai=()=>(Ai=Q.Ea)();n._OrtInit=(s,l)=>(n._OrtInit=Q.Fa)(s,l),n._OrtGetLastError=(s,l)=>(n._OrtGetLastError=Q.Ga)(s,l),n._OrtCreateSessionOptions=(s,l,h,b,v,A,D,R,L,j)=>(n._OrtCreateSessionOptions=Q.Ha)(s,l,h,b,v,A,D,R,L,j),n._OrtAppendExecutionProvider=(s,l)=>(n._OrtAppendExecutionProvider=Q.Ia)(s,l),n._OrtAddFreeDimensionOverride=(s,l,h)=>(n._OrtAddFreeDimensionOverride=Q.Ja)(s,l,h),n._OrtAddSessionConfigEntry=(s,l,h)=>(n._OrtAddSessionConfigEntry=Q.Ka)(s,l,h),n._OrtReleaseSessionOptions=s=>(n._OrtReleaseSessionOptions=Q.La)(s),n._OrtCreateSession=(s,l,h)=>(n._OrtCreateSession=Q.Ma)(s,l,h),n._OrtReleaseSession=s=>(n._OrtReleaseSession=Q.Na)(s),n._OrtGetInputOutputCount=(s,l,h)=>(n._OrtGetInputOutputCount=Q.Oa)(s,l,h),n._OrtGetInputName=(s,l)=>(n._OrtGetInputName=Q.Pa)(s,l),n._OrtGetOutputName=(s,l)=>(n._OrtGetOutputName=Q.Qa)(s,l),n._OrtFree=s=>(n._OrtFree=Q.Ra)(s),n._OrtCreateTensor=(s,l,h,b,v,A)=>(n._OrtCreateTensor=Q.Sa)(s,l,h,b,v,A),n._OrtGetTensorData=(s,l,h,b,v)=>(n._OrtGetTensorData=Q.Ta)(s,l,h,b,v),n._OrtReleaseTensor=s=>(n._OrtReleaseTensor=Q.Ua)(s),n._OrtCreateRunOptions=(s,l,h,b)=>(n._OrtCreateRunOptions=Q.Va)(s,l,h,b),n._OrtAddRunConfigEntry=(s,l,h)=>(n._OrtAddRunConfigEntry=Q.Wa)(s,l,h),n._OrtReleaseRunOptions=s=>(n._OrtReleaseRunOptions=Q.Xa)(s),n._OrtCreateBinding=s=>(n._OrtCreateBinding=Q.Ya)(s),n._OrtBindInput=(s,l,h)=>(n._OrtBindInput=Q.Za)(s,l,h),n._OrtBindOutput=(s,l,h,b)=>(n._OrtBindOutput=Q._a)(s,l,h,b),n._OrtClearBoundOutputs=s=>(n._OrtClearBoundOutputs=Q.$a)(s),n._OrtReleaseBinding=s=>(n._OrtReleaseBinding=Q.ab)(s),n._OrtRunWithBinding=(s,l,h,b,v)=>(n._OrtRunWithBinding=Q.bb)(s,l,h,b,v),n._OrtRun=(s,l,h,b,v,A,D,R)=>(n._OrtRun=Q.cb)(s,l,h,b,v,A,D,R),n._OrtEndProfiling=s=>(n._OrtEndProfiling=Q.db)(s),n._JsepOutput=(s,l,h)=>(n._JsepOutput=Q.eb)(s,l,h),n._JsepGetNodeName=s=>(n._JsepGetNodeName=Q.fb)(s);var dr=()=>(dr=Q.gb)(),Qe=n._free=s=>(Qe=n._free=Q.hb)(s),lr=n._malloc=s=>(lr=n._malloc=Q.ib)(s),In=(s,l,h,b,v,A)=>(In=Q.lb)(s,l,h,b,v,A),ki=()=>(ki=Q.mb)(),Ei=(s,l,h,b,v)=>(Ei=Q.nb)(s,l,h,b,v),Pi=s=>(Pi=Q.ob)(s),Cn=s=>(Cn=Q.pb)(s),zi=(s,l)=>(zi=Q.qb)(s,l),Oi=()=>(Oi=Q.rb)(),Di=(s,l)=>(Di=Q.sb)(s,l),cr=s=>(cr=Q.tb)(s),An=s=>(An=Q.ub)(s),kn=()=>(kn=Q.vb)(),Bi=n.dynCall_ii=(s,l)=>(Bi=n.dynCall_ii=Q.wb)(s,l),Mi=s=>(Mi=Q.xb)(s),Ri=()=>(Ri=Q.yb)(),Ui=s=>(Ui=Q.zb)(s),Ni=()=>(Ni=Q.Ab)();return n.stackSave=()=>kn(),n.stackRestore=s=>cr(s),n.stackAlloc=s=>An(s),n.setValue=function(s,l,h="i8"){switch(h.endsWith("*")&&(h="*"),h){case"i1":case"i8":Z()[s>>>0]=l;break;case"i16":Te()[s>>>1>>>0]=l;break;case"i32":z()[s>>>2>>>0]=l;break;case"i64":N[s>>>3]=BigInt(l);break;case"float":K()[s>>>2>>>0]=l;break;case"double":de()[s>>>3>>>0]=l;break;case"*":B()[s>>>2>>>0]=l;break;default:ut(`invalid type for setValue: ${h}`)}},n.getValue=function(s,l="i8"){switch(l.endsWith("*")&&(l="*"),l){case"i1":case"i8":return Z()[s>>>0];case"i16":return Te()[s>>>1>>>0];case"i32":return z()[s>>>2>>>0];case"i64":return N[s>>>3];case"float":return K()[s>>>2>>>0];case"double":return de()[s>>>3>>>0];case"*":return B()[s>>>2>>>0];default:ut(`invalid type for getValue: ${l}`)}},n.UTF8ToString=Se,n.stringToUTF8=Et,n.lengthBytesUTF8=Go,function s(){if(0<_t)Vt=s;else if(u)t(n),Ke();else{for(;0<cn.length;)cn.shift()(n);0<_t?Vt=s:(n.calledRun=!0,X||(Ke(),t(n)))}}(),n.PTR_SIZE=4,o}),Mp=_a,Rp=globalThis.self?.name?.startsWith("em-pthread");Rp&&_a()});var Sa,Up,Re,Ta,Vn,Np,Vp,Ia,Wp,$a,Ca,xa,Aa,yr=V(()=>{"use strict";br();Sa=typeof location>"u"?void 0:location.origin,Up=()=>{if(!!1)return import.meta.url?.startsWith("file:")?new URL(new URL("ort.webgpu.bundle.min.mjs",import.meta.url).href,Sa).href:import.meta.url},Re=Up(),Ta=()=>{if(Re&&!Re.startsWith("blob:"))return Re.substring(0,Re.lastIndexOf("/")+1)},Vn=(e,t)=>{try{let r=t??Re;return(r?new URL(e,r):new URL(e)).origin===Sa}catch{return!1}},Np=(e,t)=>{let r=t??Re;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},Vp=(e,t)=>`${t??"./"}${e}`,Ia=async e=>{let r=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},Wp=async e=>(await import(/*webpackIgnore:true*/e)).default,$a=(ya(),pr(ba)).default,Ca=async()=>{if(!Re)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Vn(Re))return[void 0,$a()];let e=await Ia(Re);return[e,$a(e)]},xa=(va(),pr(wa)).default,Aa=async(e,t,r)=>{if(!e&&!t&&xa&&Re&&Vn(Re))return[void 0,xa];{let n="ort-wasm-simd-threaded.jsep.mjs",o=e??Np(n,t),i=!!1&&r&&o&&!Vn(o,t),a=i?await Ia(o):o??Vp(n,t);return[i?a:void 0,await Wp(a)]}}});var Wn,Ln,Cr,ka,Lp,Gp,_r,xe,ft=V(()=>{"use strict";yr();Ln=!1,Cr=!1,ka=!1,Lp=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Gp=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},_r=async e=>{if(Ln)return Promise.resolve();if(Cr)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(ka)throw new Error("previous call to 'initializeWebAssembly()' failed.");Cr=!0;let t=e.initTimeout,r=e.numThreads;if(!Gp())throw new Error("WebAssembly SIMD is not supported in the current environment.");let n=Lp();r>1&&!n&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let o=e.wasmPaths,i=typeof o=="string"?o:void 0,a=o?.mjs,u=a?.href??a,d=o?.wasm,c=d?.href??d,p=e.wasmBinary,[m,f]=await Aa(u,i,r>1),y=!1,g=[];if(t>0&&g.push(new Promise(_=>{setTimeout(()=>{y=!0,_()},t)})),g.push(new Promise((_,x)=>{let $={numThreads:r};if(p)$.wasmBinary=p;else if(c||i)$.locateFile=w=>c??i+w;else if(u&&u.indexOf("blob:")!==0)$.locateFile=w=>new URL(w,u).href;else if(m){let w=Ta();w&&($.locateFile=S=>w+S)}f($).then(w=>{Cr=!1,Ln=!0,Wn=w,_(),m&&URL.revokeObjectURL(m)},w=>{Cr=!1,ka=!0,x(w)})})),await Promise.race(g),y)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},xe=()=>{if(Ln&&Wn)return Wn;throw new Error("WebAssembly is not initialized yet.")}});var Ce,qt,le,Ar=V(()=>{"use strict";ft();Ce=(e,t)=>{let r=xe(),n=r.lengthBytesUTF8(e)+1,o=r._malloc(n);return r.stringToUTF8(e,o,n),t.push(o),o},qt=(e,t,r,n)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([o,i])=>{let a=t?t+o:o;if(typeof i=="object")qt(i,a+".",r,n);else if(typeof i=="string"||typeof i=="number")n(a,i.toString());else if(typeof i=="boolean")n(a,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},le=e=>{let t=xe(),r=t.stackSave();try{let n=t.PTR_SIZE,o=t.stackAlloc(2*n);t._OrtGetLastError(o,o+n);let i=Number(t.getValue(o,n===4?"i32":"i64")),a=t.getValue(o+n,"*"),u=a?t.UTF8ToString(a):"";throw new Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${u}`)}finally{t.stackRestore(r)}}});var Ea,Pa=V(()=>{"use strict";ft();Ar();Ea=e=>{let t=xe(),r=0,n=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let i=0;return e?.tag!==void 0&&(i=Ce(e.tag,n)),r=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),r===0&&le("Can't create run options."),e?.extra!==void 0&&qt(e.extra,"",new WeakSet,(a,u)=>{let d=Ce(a,n),c=Ce(u,n);t._OrtAddRunConfigEntry(r,d,c)!==0&&le(`Can't set a run config entry: ${a} - ${u}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseRunOptions(r),n.forEach(a=>t._free(a)),i}}});var Hp,Fp,qp,Kp,za,Oa=V(()=>{"use strict";ft();Ar();Hp=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Fp=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},qp=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Kp=(e,t,r)=>{for(let n of t){let o=typeof n=="string"?n:n.name;switch(o){case"webnn":if(o="WEBNN",typeof n!="string"){let u=n?.deviceType;if(u){let d=Ce("deviceType",r),c=Ce(u,r);xe()._OrtAddSessionConfigEntry(e,d,c)!==0&&le(`Can't set a session config entry: 'deviceType' - ${u}.`)}}break;case"webgpu":if(o="JS",typeof n!="string"){let a=n;if(a?.preferredLayout){if(a.preferredLayout!=="NCHW"&&a.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${a.preferredLayout}`);let u=Ce("preferredLayout",r),d=Ce(a.preferredLayout,r);xe()._OrtAddSessionConfigEntry(e,u,d)!==0&&le(`Can't set a session config entry: 'preferredLayout' - ${a.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let i=Ce(o,r);xe()._OrtAppendExecutionProvider(e,i)!==0&&le(`Can't append execution provider: ${o}.`)}},za=e=>{let t=xe(),r=0,n=[],o=e||{};qp(o);try{let i=Hp(o.graphOptimizationLevel??"all"),a=Fp(o.executionMode??"sequential"),u=typeof o.logId=="string"?Ce(o.logId,n):0,d=o.logSeverityLevel??2;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log serverity level is not valid: ${d}`);let c=o.logVerbosityLevel??0;if(!Number.isInteger(c)||c<0||c>4)throw new Error(`log verbosity level is not valid: ${c}`);let p=typeof o.optimizedModelFilePath=="string"?Ce(o.optimizedModelFilePath,n):0;if(r=t._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,a,!!o.enableProfiling,0,u,d,c,p),r===0&&le("Can't create session options."),o.executionProviders&&Kp(r,o.executionProviders,n),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let m=Ce("enableGraphCapture",n),f=Ce(o.enableGraphCapture.toString(),n);t._OrtAddSessionConfigEntry(r,m,f)!==0&&le(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[m,f]of Object.entries(o.freeDimensionOverrides)){if(typeof m!="string")throw new Error(`free dimension override name must be a string: ${m}`);if(typeof f!="number"||!Number.isInteger(f)||f<0)throw new Error(`free dimension override value must be a non-negative integer: ${f}`);let y=Ce(m,n);t._OrtAddFreeDimensionOverride(r,y,f)!==0&&le(`Can't set a free dimension override: ${m} - ${f}.`)}return o.extra!==void 0&&qt(o.extra,"",new WeakSet,(m,f)=>{let y=Ce(m,n),g=Ce(f,n);t._OrtAddSessionConfigEntry(r,y,g)!==0&&le(`Can't set a session config entry: ${m} - ${f}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&le("Can't release session options."),n.forEach(a=>t._free(a)),i}}});var Ot,ht,gt,kr,Kt,Er,Pr,Gn,J=V(()=>{"use strict";Ot=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},ht=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},gt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],n=typeof t=="number"?t:t.reduce((o,i)=>o*i,1);return r>0?Math.ceil(n*r):void 0},kr=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Kt=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Er=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Pr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Gn=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}});var jt,Hn=V(()=>{"use strict";br();jt=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=Pn("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=Pn("node:fs"),n=r(e),o=[];for await(let i of n)o.push(i);return new Uint8Array(Buffer.concat(o))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let o=t.body.getReader(),i;try{i=new ArrayBuffer(n)}catch(u){if(u instanceof RangeError){let d=Math.ceil(n/65536);i=new WebAssembly.Memory({initial:d,maximum:d}).buffer}else throw u}let a=0;for(;;){let{done:u,value:d}=await o.read();if(u)break;let c=d.byteLength;new Uint8Array(i,a,c).set(d),a+=c}return new Uint8Array(i,0,n)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var jp,Zp,Da,Ba,zr,Qp,ue,Ye=V(()=>{"use strict";J();jp=["V","I","W","E","F"],Zp=(e,t)=>{console.log(`[${jp[e]},${new Date().toISOString()}]${t}`)},zr=(e,t)=>{Da=e,Ba=t},Qp=(e,t)=>{let r=Kt(e),n=Kt(Da);r>=n&&Zp(r,typeof t=="function"?t():t)},ue=(...e)=>{Ba&&Qp(...e)}});var Or,Fn=V(()=>{"use strict";J();Or=(e,t)=>new(kr(t))(e)});var Dr=V(()=>{"use strict"});var Ma,qn,Kn,Yp,Xp,Ra,Zn,jn,Na,Va=V(()=>{"use strict";Ye();Dr();Ma=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),qn=[],Kn=e=>Math.ceil(Number(e)/16)*16,Yp=e=>{for(let t=0;t<qn.length;t++){let r=qn[t];if(e<=r)return r}return Math.ceil(e/16)*16},Xp=1,Ra=()=>Xp++,Zn=async(e,t,r,n)=>{let o=Kn(r),i=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=e.getCommandEncoder();e.endComputePass(),a.copyBufferToBuffer(t,0,i,0,o),e.flush(),await i.mapAsync(GPUMapMode.READ);let u=i.getMappedRange();if(n){let d=n();return d.set(new Uint8Array(u,0,r)),d}else return new Uint8Array(u.slice(0,r))}finally{i.destroy()}},jn=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[r]of Ma)qn.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(t,r){let n=r.buffer,o=r.byteOffset,i=r.byteLength,a=Kn(i),u=this.storageCache.get(t);if(!u)throw new Error("gpu data for uploading does not exist");if(Number(u.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${u.originalSize}, data size=${i}`);let d=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),c=d.getMappedRange();new Uint8Array(c).set(new Uint8Array(n,o,i)),d.unmap();let p=this.backend.device.createCommandEncoder();p.copyBufferToBuffer(d,0,u.gpuData.buffer,0,a),this.backend.device.queue.submit([p.finish()]),d.destroy(),ue("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`)}memcpy(t,r){let n=this.storageCache.get(t);if(!n)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=Kn(n.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(n.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(t,r,n){let o;if(n){if(o=n[0],t===n[1])return ue("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=Ra();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:t},originalSize:r}),ue("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(t){t!==void 0&&(this.storageCache.delete(t),ue("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(t,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=Yp(t),o,i=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let c=(i?this.freeBuffers:this.freeUniformBuffers).get(n);c?c.length>0?o=c.pop():o=this.backend.device.createBuffer({size:n,usage:r}):o=this.backend.device.createBuffer({size:n,usage:r})}else o=this.backend.device.createBuffer({size:n,usage:r});let u={id:Ra(),type:0,buffer:o};return this.storageCache.set(u.id,{gpuData:u,originalSize:Number(t)}),ue("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${u.id}`),u}get(t){return this.storageCache.get(t)?.gpuData}release(t){let r=typeof t=="bigint"?Number(t):t,n=this.storageCache.get(r);if(!n){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return ue("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(t,r){let n=this.storageCache.get(Number(t));if(!n)throw new Error("data does not exist");await Zn(this.backend,n.gpuData.buffer,n.originalSize,r)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let r=Ma.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let r of this.buffersPending)t.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(t){let r=this.capturedPendingBuffers.get(t);r&&(r.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(t)),this.sessionCount-=1,this.sessionCount===0&&(ue("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(n=>{n.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Na=(...e)=>new jn(...e)});var Qn,ee,$e=V(()=>{"use strict";Qn=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},ee=e=>new Qn(e)});var Yn,Xe,k,Tt,Br,Wa,La,re=V(()=>{"use strict";Yn=class{static calcMatMulShape(t,r){return t[1]!==r[0]?void 0:[t[0],r[1]]}},Xe=class{static calcShape(t,r,n=!1){let o=t.length,i=r.length;if(o===0)return r;if(i===0)return t;let a=Math.max(t.length,r.length),u=new Array(a);if(n){if(o<2||i<2)return;let d=Yn.calcMatMulShape([t[o-2],t[o-1]],[r[i-2],r[i-1]]);if(d===void 0)return;[u[a-2],u[a-1]]=d}for(let d=n?3:1;d<=a;d++){let c=o-d<0?1:t[o-d],p=i-d<0?1:r[i-d];if(c!==p&&c>1&&p>1)return;let m=Math.max(c,p);if(c&&p)u[a-d]=Math.max(c,p);else{if(m>1)return;u[a-d]=0}}return u}static isValidBroadcast(t,r){let n=t.length,o=r.length;if(n>o)return!1;for(let i=1;i<=n;i++)if(t[n-i]!==1&&t[n-i]!==r[o-i])return!1;return!0}},k=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let n=t.length;if(n===0)return[];let o=new Array(n),i=n-1;for(;i>=0;){if(t[i]%r===0){o[i]=t[i]/r;break}if(r%t[i]!==0)throw new Error("cannot convert shape");o[i]=1,r/=t[i],i--}for(i--;i>=0;i--)o[i]=t[i];return o}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,n){let o=1;for(let i=r;i<n;i++){if(t[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(t[i])}return o}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let n=new Array(r);n[r-1]=1,n[r-2]=t[r-1];for(let o=r-3;o>=0;--o)n[o]=n[o+1]*t[o+1];return n}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(n=>this.normalizeAxis(n,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(n=>t[n]):t.slice().reverse()}static padShape(t,r){let n=t.length;return t.map((o,i)=>o+r[i]+r[i+n])}static areEqual(t,r){return t.length!==r.length?!1:t.every((n,o)=>n===r[o])}},Tt=class e{static adjustPoolAttributes(t,r,n,o,i,a){if(!t&&n.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<r.length-2;u++)u>=n.length?n.push(r[u+2]):n[u]=r[u+2];for(let u=0;u<n.length;u++)if(u<o.length){if(o[u]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let u=0;u<n.length;u++)if(u<i.length){if(i[u]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let u=0;u<n.length*2;u++)if(u<a.length){if(a[u]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let u=0;u<n.length;u++){if(n[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[u]>=n[u]||a[u+n.length]>=n[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,o,i,a,u){if(u){if(i.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let d=0;d<t.length-2;d++)e.adjustPadAndReturnShape(t[d+(a?1:2)],r[d],n[d],o[d],i,d,d+t.length-2,u)}}static computePoolOutputShape(t,r,n,o,i,a,u){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let d=[r[0],r[1]];return e.computeShapeHelper(t,r,d,n,o,i,a,u),d}static computeConvOutputShape(t,r,n,o,i,a,u){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let d=[t[0],r[0]];return e.computeShapeHelper(!1,t,d,n,o,i,a,u),d}static computeShapeHelper(t,r,n,o,i,a,u,d){if(t)for(let c=0;c<r.length-2;c++)n.push(1);else for(let c=0;c<r.length-2;c++)n.push(e.adjustPadAndReturnShape(r[c+2],o[c],i[c],a[c],u,c,c+r.length-2,d))}static adjustPadAndReturnShape(t,r,n,o,i,a,u,d){let c=n*(o-1)+1;if(d&&d!=="NOTSET")switch(d){case"VALID":return i[a]=0,i[u]=0,Math.floor((t-c)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(n!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let m=((t+r-1)/r-1)*r+o-t;return i[a]=Math.floor(d==="SAME_LOWER"?(m+1)/2:m/2),i[u]=m-i[a],Math.floor((t+m-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+i[a]+i[u]-c)/r+1)}},Br=class{static getShapeOfGemmResult(t,r,n,o,i){if(t.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let a,u,d;r?(a=t[1],u=t[0]):(a=t[0],u=t[1]);let c=-1;if(o?(d=n[0],c=1):(d=n[1],c=0),n[c]!==u)throw new Error("dimension mismatch");if(a<=0||d<=0||u<=0)throw new Error("invalid shape specified");if(i&&!Xe.isValidBroadcast(i,[a,d]))throw new Error("gemm: invalid bias shape for broadcast");return[a,d,u]}},Wa=-34028234663852886e22,La=34028234663852886e22});var It,Jn,he,Ae,W,pe,eo,Ct,Ge,H,Mr,E,M,Ga,Rr,Xn,Ha,ae=V(()=>{"use strict";J();re();It=64,Jn=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},he=(e,t=1)=>{let r=Jn(e,t);return typeof r=="string"?r:r[0]},Ae=(e,t=1)=>{let r=Jn(e,t);return typeof r=="string"?r:r[1]},W=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:k.computeStrides(r)})}),t},pe=e=>e%4===0?4:e%2===0?2:1,eo=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Ct=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,Ge=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,H=(e,t,r,n)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?n==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:n==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,Mr=(e,t,r,n,o)=>{let i=typeof r=="number",a=i?r:r.length,u=[...new Array(a).keys()],d=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,c=Jn(t,o),p=typeof c=="string"?c:c[1],m=typeof c=="string"?c:c[0],f={indices:d,value:p,storage:m,tensor:t},y=B=>typeof B=="string"?B:`${B}u`,g={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},_=i?"uniforms.":"",x=`${_}${e}_shape`,$=`${_}${e}_strides`,w="";for(let B=0;B<a-1;B++)w+=`
    let dim${B} = current / ${H($,B,a)};
    let rest${B} = current % ${H($,B,a)};
    indices[${B}] = dim${B};
    current = rest${B};
    `;w+=`indices[${a-1}] = current;`;let S=a<2?"":`
  fn o2i_${e}(offset: u32) -> ${f.indices} {
    var indices: ${f.indices};
    var current = offset;
    ${w}
    return indices;
  }`,T=B=>(g.offsetToIndices=!0,a<2?B:`o2i_${e}(${B})`),I=[];if(a>=2)for(let B=a-1;B>=0;B--)I.push(`${H($,B,a)} * (indices[${B}])`);let C=a<2?"":`
  fn i2o_${e}(indices: ${f.indices}) -> u32 {
    return ${I.join("+")};
  }`,P=B=>(g.indicesToOffset=!0,a<2?B:`i2o_${e}(${B})`),O=(...B)=>a===0?"0u":`${f.indices}(${B.map(y).join(",")})`,U=(B,K)=>a<2?`${B}`:`${H(B,K,a)}`,G=(B,K,de)=>a<2?`${B}=${de};`:`${H(B,K,a)}=${de};`,F={},te=(B,K)=>{g.broadcastedIndicesToOffset=!0;let de=`${K.name}broadcastedIndicesTo${e}Offset`;if(de in F)return`${de}(${B})`;let We=[];for(let _e=a-1;_e>=0;_e--){let fe=K.indicesGet("outputIndices",_e+K.rank-a);We.push(`${U($,_e)} * (${fe} % ${U(x,_e)})`)}return F[de]=`fn ${de}(outputIndices: ${K.type.indices}) -> u32 {
             return ${We.length>0?We.join("+"):"0u"};
           }`,`${de}(${B})`},N=(B,K)=>(()=>{if(f.storage===f.value)return`${e}[${B}]=${K};`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`${e}[${B}]=vec2<u32>(u32(${K}), select(0u, 0xFFFFFFFFu, ${K} < 0));`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`${e}[${B}]=vec2<u32>(u32(${K}), 0u);`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`${e}[${B}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${K}));`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),Y=B=>(()=>{if(f.storage===f.value)return`${e}[${B}]`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`i32(${e}[${B}].x)`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`u32(${e}[${B}].x)`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${B}] & 0xFFu), bool(${e}[${B}] & 0xFF00u), bool(${e}[${B}] & 0xFF0000u), bool(${e}[${B}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),ye=a<2?"":`
  fn get_${e}ByIndices(indices: ${f.indices}) -> ${p} {
    return ${Y(`i2o_${e}(indices)`)};
  }`,q=a<2?"":(()=>{let B=u.map(de=>`d${de}: u32`).join(", "),K=u.map(de=>`d${de}`).join(", ");return`
  fn get_${e}(${B}) -> ${p} {
    return get_${e}ByIndices(${O(K)});
  }`})(),X=(...B)=>{if(B.length!==a)throw new Error(`indices length must be ${a}`);let K=B.map(y).join(",");return a===0?Y("0u"):a===1?Y(K[0]):(g.get=!0,g.getByIndices=!0,g.indicesToOffset=!0,`get_${e}(${K})`)},ie=B=>a<2?Y(B):(g.getByIndices=!0,g.indicesToOffset=!0,`get_${e}ByIndices(${B})`),Z=a<2?"":`
  fn set_${e}ByIndices(indices: ${f.indices}, value: ${p}) {
    ${N(`i2o_${e}(indices)`,"value")}
  }`,se=a<2?"":(()=>{let B=u.map(de=>`d${de}: u32`).join(", "),K=u.map(de=>`d${de}`).join(", ");return`
  fn set_${e}(${B}, value: ${p}) {
    set_${e}ByIndices(${O(K)}, value);
  }`})();return{impl:()=>{let B=[],K=!1;return g.offsetToIndices&&(B.push(S),K=!0),g.indicesToOffset&&(B.push(C),K=!0),g.broadcastedIndicesToOffset&&(Object.values(F).forEach(de=>B.push(de)),K=!0),g.set&&(B.push(se),K=!0),g.setByIndices&&(B.push(Z),K=!0),g.get&&(B.push(q),K=!0),g.getByIndices&&(B.push(ye),K=!0),!i&&K&&B.unshift(`const ${x} = ${f.indices}(${r.join(",")});`,`const ${$} = ${f.indices}(${k.computeStrides(r).join(",")});`),B.join(`
`)},type:f,offsetToIndices:T,indicesToOffset:P,broadcastedIndicesToOffset:te,indices:O,indicesGet:U,indicesSet:G,set:(...B)=>{if(B.length!==a+1)throw new Error(`indices length must be ${a}`);let K=B[a];if(typeof K!="string")throw new Error("value must be string");let de=B.slice(0,a).map(y).join(",");return a===0?N("0u",K):a===1?N(de[0],K):(g.set=!0,g.setByIndices=!0,g.indicesToOffset=!0,`set_${e}(${de}, ${K})`)},setByOffset:N,setByIndices:(B,K)=>a<2?N(B,K):(g.setByIndices=!0,g.indicesToOffset=!0,`set_${e}ByIndices(${B}, ${K});`),get:X,getByOffset:Y,getByIndices:ie,usage:n,name:e,strides:$,shape:x,rank:a}},E=(e,t,r,n=1)=>Mr(e,t,r,"input",n),M=(e,t,r,n=1)=>Mr(e,t,r,"output",n),Ga=(e,t,r)=>Mr(e,t,r,"atomicOutput",1),Rr=(e,t,r,n=1)=>Mr(e,t,r,"internal",n),Xn=class{constructor(t,r){this.normalizedDispatchGroup=t;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=It){let r=typeof t=="number"?t:t[0],n=typeof t=="number"?1:t[1],o=typeof t=="number"?1:t[2];if(r>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*n*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
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
  fn main(${a}) {
    ${u}
  `}appendVariableUniforms(t){t.rank!==0&&(t.shape.startsWith("uniforms.")&&this.uniforms.push({name:t.shape.replace("uniforms.",""),type:"u32",length:t.rank}),t.strides.startsWith("uniforms.")&&this.uniforms.push({name:t.strides.replace("uniforms.",""),type:"u32",length:t.rank}))}declareVariable(t,r){if(t.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(t),this.appendVariableUniforms(t);let n=t.usage==="input"?"read":"read_write",o=t.usage==="atomicOutput"?"atomic<i32>":t.type.storage;return`@group(0) @binding(${r}) var<storage, ${n}> ${t.name}: array<${o}>;`}declareVariables(...t){return t.map(r=>this.declareVariable(r,this.variableIndex++)).join(`
`)}registerInternalVariable(t){if(t.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(t),this.appendVariableUniforms(t)}registerInternalVariables(...t){return t.forEach(r=>this.registerInternalVariable(r)),this}registerUniform(t,r,n=1){return this.uniforms.push({name:t,type:r,length:n}),this}registerUniforms(t){return this.uniforms=this.uniforms.concat(t),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let t=[];for(let{name:r,type:n,length:o}of this.uniforms)if(o&&o>4)n==="f16"?t.push(`@align(16) ${r}:array<mat2x4<${n}>, ${Math.ceil(o/8)}>`):t.push(`${r}:array<vec4<${n}>, ${Math.ceil(o/4)}>`);else{let i=o==null||o===1?n:`vec${o}<${n}>`;t.push(`${r}:${i}`)}return`
      struct Uniforms { ${t.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(t=>t.impl()).join(`
`)+this.internalVariables.map(t=>t.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[t(r.type),r.length??1])}},Ha=(e,t)=>new Xn(e,t)});var Jp,Fa,em,tm,rm,nm,ke,qa,Ka,at=V(()=>{"use strict";J();re();$e();ae();Jp=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Fa=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),em=(e,t)=>k.sortBasedOnPerm(e,Fa(e.length,t)),tm=(e,t,r,n)=>{let o=`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let i=0;i<t;++i)o+=`a[${e[i]}]=i[${i}];`;return o+="return a;}"},rm=(e,t)=>{let r=[],n=[];for(let o=0;o<e.length;++o)e[o]!==1&&r.push(e[o]),e[t[o]]!==1&&n.push(t[o]);return{newShape:r,newPerm:n}},nm=(e,t)=>{let r=0;for(let n=0;n<e.length;++n)if(t[e[n]]!==1){if(e[n]<r)return!1;r=e[n]}return!0},ke=(e,t)=>{let r=e.dataType,n=e.dims.length,o=Fa(n,t),i=em(e.dims,o),a=e.dims,u=i,d=n<2||nm(o,e.dims),c;if(d)return c=_=>{let x=E("input",r,a,4),$=M("output",r,u,4);return`
  ${_.registerUniform("output_size","u32").declareVariables(x,$)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=k.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64/4)},programUniforms:[{type:12,data:Math.ceil(_/4)}]}},getShaderSource:c};let{newShape:p,newPerm:m}=rm(e.dims,o),f=k.areEqual(m,[2,3,1]),y=k.areEqual(m,[3,1,2]);if(p.length===2||f||y){a=f?[p[0],p[1]*p[2]]:y?[p[0]*p[1],p[2]]:p,u=[a[1],a[0]];let _=16;return c=x=>{let $=E("a",r,a.length),w=M("output",r,u.length);return`
  ${x.registerUniform("output_size","u32").declareVariables($,w)}
  var<workgroup> tile : array<array<${w.type.value}, ${_+1}>, ${_}>;
  ${x.mainStart([_,_,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${_} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${_}u + local_id.x;
    let input_row = workgroup_id_x * ${_}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${$.getByIndices(`${$.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${_}u + local_id.x;
    let output_row = workgroup_id_y * ${_}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${w.setByIndices(`${w.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let x=k.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/_),y:Math.ceil(u[0]/_)},programUniforms:[{type:12,data:x},...W(a,u)]}},getShaderSource:c}}return c=_=>{let x=E("a",r,a.length),$=M("output",r,u.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(x,$)}

  ${tm(o,n,x,$)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${$.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${$.setByOffset("global_idx",x.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let _=k.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...W(a,u)]}},getShaderSource:c}},qa=(e,t)=>{Jp(e.inputs,t.perm),e.compute(ke(e.inputs[0],t.perm))},Ka=e=>ee({perm:e.perm})});var om,im,am,sm,um,dm,lm,cm,pm,mm,Je,ja,Za,Qa,Ya,Xa,Ja,es,ts,rs,ns,os=V(()=>{"use strict";J();re();ae();Ur();at();om={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},im={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},am={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},sm={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},um=(e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r},dm=(e,t)=>{let r=[],n=e.length;for(let i=0;i<n;i++)t.indexOf(i)===-1&&r.push(e[i]);let o=t.map(i=>e[i]);return[r,o]},lm=(e,t)=>{let r=e.length+t.length,n=[],o=0;for(let i=0;i<r;i++)t.indexOf(i)===-1?n.push(e[o++]):n.push(1);return n},cm=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},pm=(e,t)=>{let r=[];if(!cm(e,t)){for(let n=0;n<t;++n)e.indexOf(n)===-1&&r.push(n);e.forEach(n=>r.push(n))}return r},mm=(e,t,r,n,o,i,a)=>{let u=r[0].dims,d=k.size(i),c=k.size(a),p=E("_A",r[0].dataType,u),m=M("output",o,i),f=64;d===1&&(f=256);let y=`
          var<workgroup> aBestValues : array<f32, ${f}>;
       `,g=_=>`
        ${_.registerUniform("reduceSize","u32").declareVariables(p,m)}
        ${y}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${_.mainStart(f)}

          let outputIndex = global_idx / ${f};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${am[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${f}) {
           let candidate = f32(${p.getByOffset("offset + k")});
           bestValue = ${om[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${f}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${im[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${m.setByOffset("outputIndex",`${n==="mean"?`${m.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${m.type.storage}(${sm[n]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${f}`,inputDependencies:["type"]},getShaderSource:g,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:d},programUniforms:[{type:12,data:c}]})}},Je=(e,t,r,n)=>{let o=e.inputs.length===1?r:to(e.inputs,r),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=e.inputs[0].dims.map((y,g)=>g));let a=k.normalizeAxes(i,e.inputs[0].dims.length),u=a,d=e.inputs[0],c=pm(u,e.inputs[0].dims.length);c.length>0&&(d=e.compute(ke(e.inputs[0],c),{inputs:[0],outputs:[-1]})[0],u=um(u.length,d.dims.length));let[p,m]=dm(d.dims,u),f=p;o.keepDims&&(f=lm(p,a)),e.compute(mm(t,o.cacheKey,[d],n,e.inputs[0].dataType,f,m),{inputs:[d]})},ja=(e,t)=>{Je(e,"ReduceMeanShared",t,"mean")},Za=(e,t)=>{Je(e,"ReduceL1Shared",t,"l1")},Qa=(e,t)=>{Je(e,"ReduceL2Shared",t,"l2")},Ya=(e,t)=>{Je(e,"ReduceLogSumExpShared",t,"logSumExp")},Xa=(e,t)=>{Je(e,"ReduceMaxShared",t,"max")},Ja=(e,t)=>{Je(e,"ReduceMinShared",t,"min")},es=(e,t)=>{Je(e,"ReduceProdShared",t,"prod")},ts=(e,t)=>{Je(e,"ReduceSumShared",t,"sum")},rs=(e,t)=>{Je(e,"ReduceSumSquareShared",t,"sumSquare")},ns=(e,t)=>{Je(e,"ReduceLogSumShared",t,"logSum")}});var et,fm,Nr,to,tt,hm,gm,bm,ym,_m,wm,vm,$m,xm,Sm,rt,is,as,ss,us,ds,ls,cs,ps,ms,fs,Ur=V(()=>{"use strict";J();re();$e();ae();os();et=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},fm=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Nr=(e,t,r,n,o,i,a=!1,u=!1)=>{let d=[],c=r[0].dims,p=c.length,m=k.normalizeAxes(o,p),f=!u&&m.length===0;c.forEach((x,$)=>{f||m.indexOf($)>=0?a&&d.push(1):d.push(x)});let y=d.length,g=k.size(d);return{name:e,shaderCache:t,getShaderSource:x=>{let $=[],w=E("_A",r[0].dataType,p),S=M("output",i,y),T=n(w,S,m),I=T[2];for(let C=0,P=0;C<p;C++)f||m.indexOf(C)>=0?(a&&P++,I=`for(var j${C}: u32 = 0; j${C} < ${c[C]}; j${C}++) {
                  ${T[2].includes("last_index")?`let last_index = j${C};`:""}
                  ${w.indicesSet("input_indices",C,`j${C}`)}
                  ${I}
                }`):($.push(`${w.indicesSet("input_indices",C,S.indicesGet("output_indices",P))};`),P++);return`

        ${x.registerUniform("output_size","u32").declareVariables(w,S)}

        ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${w.type.indices};
          let output_indices = ${S.offsetToIndices("global_idx")};

          ${$.join(`
`)}
          ${T[0]}       // init ops for reduce max/min
          ${T[1]}
          ${I}
          ${T[3]}
          ${T.length===4?S.setByOffset("global_idx","value"):T.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:d,dataType:i}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},...W(c,d)]})}},to=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),ee({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},tt=(e,t,r,n)=>{let o=e.inputs,i=o.length===1?r:to(o,r);e.compute(Nr(t,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?fm:n,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},hm=(e,t)=>{et(e.inputs),tt(e,"ReduceLogSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},gm=(e,t)=>{et(e.inputs),tt(e,"ReduceL1",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},bm=(e,t)=>{et(e.inputs),tt(e,"ReduceL2",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},ym=(e,t)=>{et(e.inputs),tt(e,"ReduceLogSumExp",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},_m=(e,t)=>{et(e.inputs),tt(e,"ReduceMax",t,(n,o,i)=>{let a=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&a.push(n.indicesSet("input_indices",u,0));return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},wm=(e,t)=>{et(e.inputs),tt(e,"ReduceMean",t,(n,o,i)=>{let a=1;for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&(a*=e.inputs[0].dims[u]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${a});`]})},vm=(e,t)=>{et(e.inputs),tt(e,"ReduceMin",t,(n,o,i)=>{let a=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&a.push(`input_indices[${u}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},$m=(e,t)=>{et(e.inputs),tt(e,"ReduceProd",t,(n,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},xm=(e,t)=>{et(e.inputs),tt(e,"ReduceSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},Sm=(e,t)=>{et(e.inputs),tt(e,"ReduceSumSquare",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},rt=(e,t,r)=>{if(t.length===0)return r;let n=1,o=1;for(let i=0;i<t.length;i++)t.indexOf(i)===-1?n*=e[i]:o*=e[i];return o<32&&n>1024},is=(e,t)=>{rt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?wm(e,t):ja(e,t)},as=(e,t)=>{rt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?gm(e,t):Za(e,t)},ss=(e,t)=>{rt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?bm(e,t):Qa(e,t)},us=(e,t)=>{rt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ym(e,t):Ya(e,t)},ds=(e,t)=>{rt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?_m(e,t):Xa(e,t)},ls=(e,t)=>{rt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vm(e,t):Ja(e,t)},cs=(e,t)=>{rt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$m(e,t):es(e,t)},ps=(e,t)=>{rt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?xm(e,t):ts(e,t)},ms=(e,t)=>{rt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Sm(e,t):rs(e,t)},fs=(e,t)=>{rt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?hm(e,t):ns(e,t)}});var hs,gs,bs,ro,ys=V(()=>{"use strict";J();$e();Ur();hs=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},gs=(e,t)=>{hs(e.inputs);let r=(n,o,i)=>{let a=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&a.push(`input_indices[${u}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Nr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},bs=(e,t)=>{hs(e.inputs);let r=(n,o,i)=>{let a=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&a.push(`input_indices[${u}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Nr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},ro=e=>ee(e)});var Tm,no,Im,Cm,Am,Dt,km,_s,Vr=V(()=>{"use strict";J();re();Dr();ae();Tm=(e,t)=>{let r=e[0],n=e[1],o=e[2],i=e[3],a=e[4],u=e[5];if(a&&u)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let d=r.dims[0],c=r.dims[1],p=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(n.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==p)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==n.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let m=o.dims[0]/3,f=m,y=f;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let S of t.qkvHiddenSizes)if(S%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");m=t.qkvHiddenSizes[0],f=t.qkvHiddenSizes[1],y=t.qkvHiddenSizes[2]}let g=c;if(m!==f)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==m+f+y)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let _=0;if(a){if(f!==y)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==d)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==f/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(_=a.dims[3])}let x=g+_,$=-1,w=0;if(i)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==d||u.dims[1]!==t.numHeads||u.dims[2]!==c||u.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:c,pastSequenceLength:_,kvSequenceLength:g,totalSequenceLength:x,maxSequenceLength:$,inputHiddenSize:p,hiddenSize:m,vHiddenSize:y,headSize:Math.floor(m/t.numHeads),vHeadSize:Math.floor(y/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},no=(e,t,r)=>t&&e?`
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
    `,Im=(e,t,r,n,o,i,a,u)=>{let d=pe(a?1:i),c=64,p=i/d;p<c&&(c=32);let m=Math.ceil(i/d/c),f=[{type:12,data:t},{type:12,data:r},{type:12,data:n},{type:12,data:o},{type:12,data:p},{type:12,data:m}],y=he(e.dataType,d),g=Ae(1,d),_=["type"];a&&_.push("type"),u&&_.push("type");let x=$=>{let w=M("x",e.dataType,e.dims,d),S=[w],T=a?E("seq_lens",a.dataType,a.dims):void 0;T&&S.push(T);let I=u?E("total_sequence_length_input",u.dataType,u.dims):void 0;I&&S.push(I);let C=Ae(e.dataType),P=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${c}>;
  var<workgroup> thread_sum: array<f32, ${c}>;
  ${$.registerUniforms(P).declareVariables(...S)}
  ${$.mainStart([c,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${no(T,I,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${c}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${a?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${g}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${g}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(d){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${c}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${g}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${g}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(d){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${c}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${w.type.value}(${C}(1.0) / ${C}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${g}(x[offset + i]);
        x[offset + i] = ${w.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${w.type.value}(${C}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${c};${y};${d}`,inputDependencies:_},getShaderSource:x,getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(i/c),y:o,z:t*r},programUniforms:f})}},Cm=(e,t,r,n,o,i,a,u,d)=>{let c=a+i.kvSequenceLength,p=[i.batchSize,i.numHeads,i.sequenceLength,c],m=e>1&&n,f=i.kvNumHeads?i.kvNumHeads:i.numHeads,y=m?[i.batchSize,f,c,i.headSize]:void 0,g=i.nReps?i.nReps:1,_=i.scale===0?1/Math.sqrt(i.headSize):i.scale,x=pe(i.headSize),$=i.headSize/x,w=12,S={x:Math.ceil(c/w),y:Math.ceil(i.sequenceLength/w),z:i.batchSize*i.numHeads},T=[{type:12,data:i.sequenceLength},{type:12,data:$},{type:12,data:c},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:_},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:g}],I=m&&n&&k.size(n.dims)>0,C=["type","type"];I&&C.push("type"),o&&C.push("type"),u&&C.push("type"),d&&C.push("type");let P=[{dims:p,dataType:t.dataType,gpuDataType:0}];m&&P.push({dims:y,dataType:t.dataType,gpuDataType:0});let O=U=>{let G=E("q",t.dataType,t.dims,x),F=E("key",r.dataType,r.dims,x),te=[G,F];if(I){let Z=E("past_key",n.dataType,n.dims,x);te.push(Z)}o&&te.push(E("attention_bias",o.dataType,o.dims));let N=u?E("seq_lens",u.dataType,u.dims):void 0;N&&te.push(N);let Y=d?E("total_sequence_length_input",d.dataType,d.dims):void 0;Y&&te.push(Y);let ye=M("output",t.dataType,p),q=[ye];m&&q.push(M("present_key",t.dataType,y,x));let X=Ae(1,x),ie=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;

  var<workgroup> tileQ: array<${G.type.storage}, ${w*w}>;
  var<workgroup> tileK: array<${G.type.storage}, ${w*w}>;
  ${U.registerUniforms(ie).declareVariables(...te,...q)}
  ${U.mainStart([w,w,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${g===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${g===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${no(N,Y,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${I&&m?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${m?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${X}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${I&&m?`
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
          value += ${X}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(x){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${x}`)}})()};
        output[outputIdx] = ${ye.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${x};${o!==void 0};${n!==void 0};${e}`,inputDependencies:C},getRunData:()=>({outputs:P,dispatchGroup:S,programUniforms:T}),getShaderSource:O}},Am=(e,t,r,n,o,i,a=void 0,u=void 0)=>{let d=i+o.kvSequenceLength,c=o.nReps?o.nReps:1,p=o.vHiddenSize*c,m=e>1&&n,f=o.kvNumHeads?o.kvNumHeads:o.numHeads,y=m?[o.batchSize,f,d,o.headSize]:void 0,g=[o.batchSize,o.sequenceLength,p],_=12,x={x:Math.ceil(o.vHeadSize/_),y:Math.ceil(o.sequenceLength/_),z:o.batchSize*o.numHeads},$=[{type:12,data:o.sequenceLength},{type:12,data:d},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:p},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:c}],w=m&&n&&k.size(n.dims)>0,S=["type","type"];w&&S.push("type"),a&&S.push("type"),u&&S.push("type");let T=[{dims:g,dataType:t.dataType,gpuDataType:0}];m&&T.push({dims:y,dataType:t.dataType,gpuDataType:0});let I=C=>{let P=E("probs",t.dataType,t.dims),O=E("v",r.dataType,r.dims),U=[P,O];w&&U.push(E("past_value",n.dataType,n.dims));let G=a?E("seq_lens",a.dataType,a.dims):void 0;a&&U.push(G);let F=u?E("total_sequence_length_input",u.dataType,u.dims):void 0;u&&U.push(F);let N=[M("output",t.dataType,g)];m&&N.push(M("present_value",t.dataType,y));let Y=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;
  var<workgroup> tileQ: array<${P.type.value}, ${_*_}>;
  var<workgroup> tileV: array<${P.type.value}, ${_*_}>;
  ${C.registerUniforms(Y).declareVariables(...U,...N)}
  ${C.mainStart([_,_,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${c===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${c===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${no(G,F,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${w&&m?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${m?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${P.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${w&&m?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${n!==void 0};${e}`,inputDependencies:S},getRunData:()=>({outputs:T,dispatchGroup:x,programUniforms:$}),getShaderSource:I}},Dt=(e,t,r,n,o,i,a,u,d,c,p=void 0,m=void 0)=>{let f=Math.min(e.outputCount,1+(a?1:0)+(u?1:0)),y=f>1?c.pastSequenceLength:0,g=y+c.kvSequenceLength,_=d&&k.size(d.dims)>0?d:void 0,x=[t,r];f>1&&a&&k.size(a.dims)>0&&x.push(a),_&&x.push(_),p&&x.push(p),m&&x.push(m);let $=e.compute(Cm(f,t,r,a,_,c,y,p,m),{inputs:x,outputs:f>1?[-1,1]:[-1]})[0];e.compute(Im($,c.batchSize,c.numHeads,y,c.sequenceLength,g,p,m),{inputs:p&&m?[$,p,m]:[$],outputs:[]});let w=[$,n];f>1&&u&&k.size(u.dims)>0&&w.push(u),p&&w.push(p),m&&w.push(m),e.compute(Am(f,$,n,u,c,y,p,m),{inputs:w,outputs:f>1?[0,2]:[0]})},km=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],n=t.sequenceLength,o=t.inputHiddenSize,i=t.headSize,a=12,u={x:Math.ceil(t.headSize/a),y:Math.ceil(t.sequenceLength/a),z:t.batchSize*t.numHeads},d=[e.inputs[0],e.inputs[1],e.inputs[2]],c=[{type:12,data:n},{type:12,data:o},{type:12,data:i},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],p=m=>{let f=M("output_q",d[0].dataType,r),y=M("output_k",d[0].dataType,r),g=M("output_v",d[0].dataType,r),_=E("input",d[0].dataType,d[0].dims),x=E("weight",d[1].dataType,d[1].dims),$=E("bias",d[2].dataType,d[2].dims),w=_.type.storage,S=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${w}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${w}, ${a*a}>;
  var<workgroup> tileWeightK: array<${w}, ${a*a}>;
  var<workgroup> tileWeightV: array<${w}, ${a*a}>;
  ${m.registerUniforms(S).declareVariables(_,x,$,f,y,g)}
  ${m.mainStart([a,a,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${w}(0);
    var valueK = ${w}(0);
    var valueV = ${w}(0);
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:c}),getShaderSource:p},{inputs:d,outputs:[-1,-1,-1]})},_s=(e,t)=>{let r=Tm(e.inputs,t),[n,o,i]=km(e,r);return Dt(e,n,o,i,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}});var Em,Pm,zm,ws,vs=V(()=>{"use strict";Ne();J();re();$e();ae();Em=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(n,o,i)=>{let a=o.length;if(a!==n.length)throw new Error(`${i}: num dimensions != ${a}`);o.forEach((u,d)=>{if(u!==n[d])throw new Error(`${i}: dim[${d}] do not match`)})};if(e[0].dims.length>1){let n=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Pm=(e,t)=>{let{epsilon:r,spatial:n,format:o}=t,i=e[0].dims,a=n?pe(i[i.length-1]):1,u=o==="NHWC"&&i.length>1?a:1,d=k.size(i)/a,c=n,p=c?i.length:i,m=E("x",e[0].dataType,e[0].dims,a),f=E("scale",e[1].dataType,e[1].dims,u),y=E("bias",e[2].dataType,e[2].dims,u),g=E("inputMean",e[3].dataType,e[3].dims,u),_=E("inputVar",e[4].dataType,e[4].dims,u),x=M("y",e[0].dataType,p,a),$=()=>{let S="";if(n)S=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${a}`:"outputIndices[1]"};`;else if(o==="NCHW")S=`
            ${x.indicesSet("outputIndices","0","0")}
            let cOffset = ${x.indicesToOffset("outputIndices")};`;else{S=`var cIndices = ${f.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let T=1;T<f.rank;T++)S+=`cIndices[${T}] = outputIndices[${T}];`;S+=`let cOffset = ${f.indicesToOffset("cIndices")};`}return S},w=S=>`
  const epsilon = ${r};
  ${S.registerUniform("outputSize","u32").declareVariables(m,f,y,g,_,x)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${x.offsetToIndices(`global_idx * ${a}`)};
    ${$()}
    let scale = ${f.getByOffset("cOffset")};
    let bias = ${y.getByOffset("cOffset")};
    let inputMean = ${g.getByOffset("cOffset")};
    let inputVar = ${_.getByOffset("cOffset")};
    let x = ${m.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${x.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${a}`,inputDependencies:c?["rank","type","type","type","type"]:void 0},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c?[{type:12,data:d},...W(i)]:[{type:12,data:d}]})}},zm=e=>ee(e),ws=(e,t)=>{let{inputs:r,outputCount:n}=e,o=zm({...t,outputCount:n});if(ge.webgpu.validateInputContent&&Em(r,o),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Pm(r,o))}});var Om,Dm,$s,xs=V(()=>{"use strict";re();ae();Om=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Dm=e=>{let t=e[0].dims,r=e[0].dims[2],n=k.size(t)/4,o=e[0].dataType,i=E("input",o,t,4),a=E("bias",o,[r],4),u=E("residual",o,t,4),d=M("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:p=>`
  const channels = ${r}u / 4;
  ${p.declareVariables(i,a,u,d)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${i.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${d.setByOffset("global_idx","value")}
  }`}},$s=e=>{Om(e.inputs),e.compute(Dm(e.inputs))}});var Bm,me,Ss,Ts,Is,Cs,As,ks,Es,Ps,zs,Mm,Os,Ds,Bs,Ms,Zt,Rs,Wr,Us,Ns,Vs,Ws,Ls,Gs,Hs,Fs,qs,Ks,js,Zs,Qs,Ys,Xs,Js,eu,tu,oo,io,ru,nu,ou,Rm,Um,iu,Lr=V(()=>{"use strict";J();re();$e();ae();Bm=(e,t,r,n,o,i,a)=>{let u=Math.ceil(t/4),d="";typeof o=="string"?d=`${o}(a)`:d=o("a");let c=E("inputData",r,[u],4),p=M("outputData",n,[u],4),m=[{name:"vec_size",type:"u32"}];return a&&m.push(...a),`
      ${e.registerUniforms(m).declareVariables(c,p)}

  ${i??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${c.getByOffset("global_idx")};
    ${p.setByOffset("global_idx",d)}
  }`},me=(e,t,r,n,o,i=e.dataType,a,u)=>{let d=[{type:12,data:Math.ceil(k.size(e.dims)/4)}];return a&&d.push(...a),{name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:c=>Bm(c,k.size(e.dims),e.dataType,i,r,n,u),getRunData:c=>({outputs:[{dims:e.dims,dataType:i}],dispatchGroup:{x:Math.ceil(k.size(c[0].dims)/64/4)},programUniforms:d})}},Ss=e=>{e.compute(me(e.inputs[0],"Abs","abs"))},Ts=e=>{e.compute(me(e.inputs[0],"Acos","acos"))},Is=e=>{e.compute(me(e.inputs[0],"Acosh","acosh"))},Cs=e=>{e.compute(me(e.inputs[0],"Asin","asin"))},As=e=>{e.compute(me(e.inputs[0],"Asinh","asinh"))},ks=e=>{e.compute(me(e.inputs[0],"Atan","atan"))},Es=e=>{e.compute(me(e.inputs[0],"Atanh","atanh"))},Ps=e=>ee(e),zs=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(me(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Mm=e=>{let t,r,n=e.length>=2&&e[1].data!==0,o=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=n?e[1].getFloat32Array()[0]:-34028234663852886e22,r=o?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=n?e[1].getUint16Array()[0]:64511,r=o?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return ee({min:t,max:r})},Os=(e,t)=>{let r=t||Mm(e.inputs),n=Ae(e.inputs[0].dataType);e.compute(me(e.inputs[0],"Clip",o=>`clamp(${o}, vec4<${n}>(uniforms.min), vec4<${n}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:n},{name:"max",type:n}]),{inputs:[0]})},Ds=e=>{e.compute(me(e.inputs[0],"Ceil","ceil"))},Bs=e=>{e.compute(me(e.inputs[0],"Cos","cos"))},Ms=e=>{e.compute(me(e.inputs[0],"Cosh","cosh"))},Zt=e=>ee(e),Rs=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(me(e.inputs[0],"Elu",n=>`elu_vf32(${n})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Wr=(e="f32")=>`
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
}`,Us=e=>{let t=Ae(e.inputs[0].dataType);e.compute(me(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Wr(t)))},Ns=e=>{e.compute(me(e.inputs[0],"Exp","exp"))},Vs=e=>{e.compute(me(e.inputs[0],"Floor","floor"))},Ws=e=>{let t=Ae(e.inputs[0].dataType);e.compute(me(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Wr(t)))},Ls=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(me(e.inputs[0],"LeakyRelu",n=>`select(leaky_relu_alpha_ * ${n}, ${n}, ${n} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},Gs=e=>{e.compute(me(e.inputs[0],"Not",t=>`!${t}`))},Hs=e=>{e.compute(me(e.inputs[0],"Neg",t=>`-${t}`))},Fs=e=>{e.compute(me(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},qs=e=>{let t=Ae(e.inputs[0].dataType);e.compute(me(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},Ks=e=>{e.compute(me(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},js=e=>ee(e),Zs=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(me(e.inputs[0],"HardSigmoid",n=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${n} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},Qs=e=>{e.compute(me(e.inputs[0],"Sin","sin"))},Ys=e=>{e.compute(me(e.inputs[0],"Sinh","sinh"))},Xs=e=>{e.compute(me(e.inputs[0],"Sqrt","sqrt"))},Js=e=>{e.compute(me(e.inputs[0],"Tan","tan"))},eu=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,tu=e=>{e.compute(me(e.inputs[0],"Tanh",eu))},oo=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${eu("v")};
}
`,io=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,ru=e=>{let t=Ae(e.inputs[0].dataType);e.compute(me(e.inputs[0],"FastGelu",io,oo(t),void 0,e.inputs[0].dataType))},nu=(e,t)=>{let r=Ae(e.inputs[0].dataType);return e.compute(me(e.inputs[0],"ThresholdedRelu",n=>`select(vec4<${r}>(0.0), ${n}, ${n} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},ou=e=>{e.compute(me(e.inputs[0],"Log","log"))},Rm=(e,t)=>`
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
`,Um=e=>`quick_gelu_impl(${e})`,iu=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(me(e.inputs[0],"QuickGelu",Um,Rm(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}});var Nm,Vm,su,uu=V(()=>{"use strict";re();ae();Lr();Nm=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Vm=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=E("input",e[0].dataType,e[0].dims,4),n=E("bias",e[0].dataType,[e[0].dims[2]],4),o=M("output",e[0].dataType,t,4),i=k.size(t)/4,a=he(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:d=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${d.declareVariables(r,n,o)}

  ${Wr(a)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},su=e=>{Nm(e.inputs),e.compute(Vm(e.inputs))}});var Wm,Lm,nt,du,lu,cu,pu,mu,fu,hu,gu,bu,yu,_u=V(()=>{"use strict";J();re();ae();Wm=(e,t,r,n,o,i,a,u,d,c,p,m)=>{let f,y;typeof u=="string"?f=y=(w,S)=>`${u}((${w}),(${S}))`:typeof u=="function"?f=y=u:(f=u.scalar,y=u.vector);let g=M("outputData",p,n.length,4),_=E("aData",d,t.length,4),x=E("bData",c,r.length,4),$;if(o)if(i){let w=k.size(t)===1,S=k.size(r)===1,T=t.length>0&&t[t.length-1]%4===0,I=r.length>0&&r[r.length-1]%4===0;w||S?$=g.setByOffset("global_idx",y(w?`${_.type.value}(${_.getByOffset("0")}.x)`:_.getByOffset("global_idx"),S?`${x.type.value}(${x.getByOffset("0")}.x)`:x.getByOffset("global_idx"))):$=`
            let outputIndices = ${g.offsetToIndices("global_idx * 4u")};
            let offsetA = ${_.broadcastedIndicesToOffset("outputIndices",g)};
            let offsetB = ${x.broadcastedIndicesToOffset("outputIndices",g)};
            ${g.setByOffset("global_idx",y(a||T?_.getByOffset("offsetA / 4u"):`${_.type.value}(${_.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||I?x.getByOffset("offsetB / 4u"):`${x.type.value}(${x.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=g.setByOffset("global_idx",y(_.getByOffset("global_idx"),x.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let w=(S,T,I="")=>{let C=`aData[indexA${T}][componentA${T}]`,P=`bData[indexB${T}][componentB${T}]`;return`
            let outputIndices${T} = ${g.offsetToIndices(`global_idx * 4u + ${T}u`)};
            let offsetA${T} = ${_.broadcastedIndicesToOffset(`outputIndices${T}`,g)};
            let offsetB${T} = ${x.broadcastedIndicesToOffset(`outputIndices${T}`,g)};
            let indexA${T} = offsetA${T} / 4u;
            let indexB${T} = offsetB${T} / 4u;
            let componentA${T} = offsetA${T} % 4u;
            let componentB${T} = offsetB${T} % 4u;
            ${S}[${T}] = ${I}(${f(C,P)});
          `};p===9?$=`
            var data = vec4<u32>(0);
            ${w("data",0,"u32")}
            ${w("data",1,"u32")}
            ${w("data",2,"u32")}
            ${w("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:$=`
            ${w("outputData[global_idx]",0)}
            ${w("outputData[global_idx]",1)}
            ${w("outputData[global_idx]",2)}
            ${w("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(_,x,g)}

        ${m??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},Lm=(e,t,r,n,o,i,a=r.dataType)=>{let u=r.dims.map(_=>Number(_)??1),d=n.dims.map(_=>Number(_)??1),c=!k.areEqual(u,d),p=u,m=k.size(u),f=!1,y=!1,g=[c];if(c){let _=Xe.calcShape(u,d,!1);if(!_)throw new Error("Can't perform binary op on the given tensors");p=_.slice(),m=k.size(p);let x=k.size(u)===1,$=k.size(d)===1,w=u.length>0&&u[u.length-1]%4===0,S=d.length>0&&d[d.length-1]%4===0;g.push(x),g.push($),g.push(w),g.push(S);let T=1;for(let I=1;I<p.length;I++){let C=u[u.length-I],P=d[d.length-I];if(C===P)T*=C;else break}T%4===0?(y=!0,f=!0):(x||$||w||S)&&(f=!0)}else f=!0;return g.push(f),{name:e,shaderCache:{hint:t+g.map(_=>_.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:_=>Wm(_,u,d,p,f,c,y,o,r.dataType,n.dataType,a,i),getRunData:()=>({outputs:[{dims:p,dataType:a}],dispatchGroup:{x:Math.ceil(m/64/4)},programUniforms:[{type:12,data:Math.ceil(k.size(p)/4)},...W(u,d,p)]})}},nt=(e,t,r,n,o,i)=>{e.compute(Lm(t,o??"",e.inputs[0],e.inputs[1],r,n,i))},du=e=>{nt(e,"Add",(t,r)=>`${t}+${r}`)},lu=e=>{nt(e,"Div",(t,r)=>`${t}/${r}`)},cu=e=>{nt(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},pu=e=>{nt(e,"Mul",(t,r)=>`${t}*${r}`)},mu=e=>{let t=E("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;nt(e,"Pow",{scalar:(n,o)=>`pow_custom(${n},${o})`,vector:(n,o)=>`pow_vector_custom(${n},${o})`},`
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
      `)},fu=e=>{nt(e,"Sub",(t,r)=>`${t}-${r}`)},hu=e=>{nt(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},gu=e=>{nt(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},bu=e=>{nt(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},yu=e=>{nt(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}});var Hm,Fm,qm,Km,wu,vu,$u=V(()=>{"use strict";J();re();$e();ae();Hm=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,n=e[r],o=n.dataType,i=n.dims.length;e.forEach((a,u)=>{if(u!==r){if(a.dataType!==o)throw new Error("input tensors should be one type");if(a.dims.length!==i)throw new Error("input tensors should have the same shape");a.dims.forEach((d,c)=>{if(c!==t&&d!==n.dims[c])throw new Error("non concat dimensions must match")})}})},Fm=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,qm=(e,t)=>{let r=e.length,n=[];for(let o=0;o<r;++o){let i=t.setByOffset("global_idx",e[o].getByIndices("indices"));r===1?n.push(i):o===0?n.push(`if (inputIndex == ${o}u) { ${i} }`):o===r-1?n.push(`else { ${i} }`):n.push(`else if (inputIndex == ${o}) { ${i} }`)}return n.join(`
`)},Km=(e,t,r,n)=>{let o=k.size(r),i=new Array(e.length),a=new Array(e.length),u=0,d=[],c=[],p=[{type:12,data:o}];for(let _=0;_<e.length;++_)u+=e[_].dims[t],i[_]=u,c.push(e[_].dims.length),a[_]=E(`input${_}`,n,c[_]),d.push("rank"),p.push({type:12,data:i[_]});for(let _=0;_<e.length;++_)p.push(...W(e[_].dims));p.push(...W(r));let m=M("output",n,r.length),f=m.indicesGet("indices",t),y=Array.from(Array(i.length).keys()).map(_=>`uniforms.sizeInConcatAxis${_}`).join(","),g=_=>`

  ${(()=>{_.registerUniform("outputSize","u32");for(let x=0;x<e.length;x++)_.registerUniform(`sizeInConcatAxis${x}`,"u32");return _.declareVariables(...a,m)})()}

  ${Fm(i.length,y)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${m.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${f});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${y});
      ${f} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${qm(a,m)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:p}),getShaderSource:g}},wu=(e,t)=>{let r=e.inputs,n=r[0].dims,o=k.normalizeAxis(t.axis,n.length);Hm(r,o);let i=n.slice();i[o]=r.reduce((u,d)=>u+(d.dims.length>o?d.dims[o]:0),0);let a=r.filter(u=>k.size(u.dims)>0);e.compute(Km(a,o,i,r[0].dataType),{inputs:a})},vu=e=>ee({axis:e.axis})});var He,Fe,qe,Gr,bt=V(()=>{"use strict";J();re();He=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Fe=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},qe=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Gr=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,n]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:n}}else if(t==="Clip"){let[r,n]=e?.activation_params||[Wa,La];return{activation:t,clipMax:n,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}});var Ie,xu,Hr=V(()=>{"use strict";Ie=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},xu=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Su,Tu=V(()=>{"use strict";Su=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var Qt,Fr,qr=V(()=>{"use strict";J();re();ae();bt();Qt=(e,t,r,n,o)=>{let i=n-r;return`
      ${Array.from({length:r}).map((a,u)=>`
      if (${H(t.shape,u,t.rank)} != 1) {
        ${t.indicesSet(e,u,H(o,u+i,n))}
      } else {
        ${t.indicesSet(e,u,0)}
      }`).join("")}
`},Fr=(e,t,r,n,o=!1,i)=>{let a=e[0].dims,u=e[1].dims,d=a[a.length-2],c=u[u.length-1],p=a[a.length-1],m=pe(c),f=pe(p),y=pe(d),g=k.size(r)/m/y,_=e.length>2,x=n?n.slice(0,-2):r.slice(0,-2),w=[k.size(x),d,c],S=[{type:12,data:g},{type:12,data:d},{type:12,data:c},{type:12,data:p}];Fe(t,S),S.push(...W(x,a,u)),_&&S.push(...W(e[2].dims)),S.push(...W(w));let T=I=>{let C=Rr("batch_dims",e[0].dataType,x.length),P=E("a",e[0].dataType,a.length,f),O=E("b",e[1].dataType,u.length,m),U=M("output",e[0].dataType,w.length,m),G=he(U.type.tensor),F=He(t,U.type.value,G),te=[P,O],N="";if(_){let q=o?m:1;te.push(E("bias",e[2].dataType,e[2].dims.length,q)),N=`${o?`value += bias[col / ${q}];`:`value += ${U.type.value}(bias[row + i]);`}`}let Y=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];qe(t,Y);let ye=()=>{let q=`var a_data: ${P.type.value};`;for(let X=0;X<f;X++)q+=`
              let b_data${X} = b[(b_offset + (k + ${X}) * uniforms.N + col) / ${m}];`;for(let X=0;X<y;X++){q+=`a_data = a[(a_offset + (row + ${X}) * uniforms.K + k) / ${f}];`;for(let ie=0;ie<f;ie++)q+=`
            values[${X}] = fma(${O.type.value}(a_data${f===1?"":`[${ie}]`}), b_data${ie}, values[${X}]);
`}return q};return`
  ${I.registerUniforms(Y).registerInternalVariables(C).declareVariables(...te,U)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${m})) * ${m};
    var index1 = global_idx / (uniforms.N / ${m});
    let stride1 = uniforms.M / ${y};
    let row = (index1 % stride1) * ${y};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${C.offsetToIndices("batch")};`}

    var a_indices: ${P.type.indices};
    ${Qt("a_indices",P,P.rank-2,C.rank,"batch_indices")}
    ${P.indicesSet("a_indices",P.rank-2,0)}
    ${P.indicesSet("a_indices",P.rank-1,0)}
    let a_offset = ${P.indicesToOffset("a_indices")};

    var b_indices: ${O.type.indices};
    ${Qt("b_indices",O,O.rank-2,C.rank,"batch_indices")}
    ${O.indicesSet("b_indices",O.rank-2,0)}
    ${O.indicesSet("b_indices",O.rank-1,0)}
    let b_offset = ${O.indicesToOffset("b_indices")};
    var values: array<${U.type.value}, ${y}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${f}) {
      ${ye()}
    }
    for (var i = 0u; i < ${y}u; i++) {
      var value = values[i];
      ${N}
      ${F}
      let cur_indices = ${U.type.indices}(batch, row + i, col);
      let offset = ${U.indicesToOffset("cur_indices")};
      ${U.setByOffset(`offset / ${m}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${m};${f};${y};${o}`,inputDependencies:_?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:S}),getShaderSource:T}}});var jm,Zm,ao,Iu,Qm,so,Ym,Yt,Kr=V(()=>{"use strict";J();re();ae();bt();qr();Hr();jm=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Zm=(e,t)=>e?`
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
        }`,ao=(e,t,r="f32",n,o=!1,i=32,a=!1,u=32)=>{let d=t[1]*e[1],c=t[0]*e[0],p=o?d:i,m=o?i:d,f=p/t[0],y=i/t[1];if(!((o&&f===4&&e[1]===4||!o&&(f===3||f===4))&&p%t[0]===0&&i%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${f} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${f} must be 3 or 4.
  tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${f}<${r}>, ${p/f}>, ${m}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${c/e[0]}>, ${i}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${f};
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
  let globalRowStart = i32(workgroupId.y) * ${d};

  let num_tiles = ${a?`${Math.ceil(u/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${a?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${y};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${jm(o,n)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
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
          ${f===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Zm(o,f)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Iu=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Qm=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",so=(e,t,r="f32",n,o=!1,i=32,a=!1,u=32,d=!1)=>{let c=e[1]*t[1],p=e[0]*t[0],m=o?c:i,f=o?i:c;if(!(f%t[1]===0&&m%t[0]===0&&i%t[1]===0))throw new Error(`tileAHight ${f} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${m} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let y=f/t[1],g=m/t[0],_=i/t[1],x=d?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${c};
    let globalColStart = i32(workgroupId.x) * ${p};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${f}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${m}; inputCol = inputCol + ${t[0]}) {
          ${Iu(o,n)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
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

let tileRowA = i32(localId.y) * ${y};
let tileColA = i32(localId.x) * ${g};
let tileRowB = i32(localId.y) * ${_};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${g}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Iu(o,n)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
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
      ${Qm(o)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${m}>, ${f}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${p}>, ${i}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${a?"0":"i32(globalId.z)"};
    ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${a?`${Math.ceil(u/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${a?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${x}
  }
`},Ym=(e,t,r,n,o=!1)=>{let[i,a,u,d]=n,c=he(n[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Ie(e,c)} {
      var value = ${Ie(e,c)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${Qt("aIndices",a,a.rank-2,i.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Ie(e,c)} {
      var value = ${Ie(e,c)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${Qt("bIndices",u,u.rank-2,i.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ie(e,c)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${o?"bias[colIn]":`${Ie(e,c)}(bias[row])`};`:""}
        ${r}
        ${d.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Yt=(e,t,r,n,o=!1,i)=>{let a=e[0].dims,u=e[1].dims,d=a.slice(0,-2),c=u.slice(0,-2),p=n?n.slice(0,-2):r.slice(0,-2),m=k.size(p),f=a[a.length-2],y=a[a.length-1],g=u[u.length-1],_=y%4===0&&g%4===0,x=f<=8?[4,1,1]:[4,4,1],$=[8,8,1],w=[Math.ceil(g/$[0]/x[0]),Math.ceil(f/$[1]/x[1]),Math.ceil(m/$[2]/x[2])],S=_?4:1,T=[...d,f,y/S],I=T.length,C=[...c,y,g/S],P=C.length,O=[m,f,g/S],U=[{type:6,data:f},{type:6,data:g},{type:6,data:y}];Fe(t,U),U.push(...W(p,T,C));let G=["rank","rank"],F=e.length>2;F&&(U.push(...W(e[2].dims)),G.push("rank")),U.push(...W(O));let te=N=>{let Y=p.length,ye=Rr("batchDims",e[0].dataType,Y,1),q=he(e[0].dataType),X=E("a",e[0].dataType,I,S),ie=E("b",e[1].dataType,P,S),Z=M("result",e[0].dataType,O.length,S),se=[X,ie];if(F){let K=o?S:1;se.push(E("bias",e[2].dataType,e[2].dims.length,K))}let Te=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];qe(t,Te);let we=he(Z.type.tensor),z=He(t,Z.type.value,we),B=Ym(S,F,z,[ye,X,ie,Z],o);return`
  ${N.registerUniforms(Te).registerInternalVariables(ye).declareVariables(...se,Z)}
  ${B}
  ${_?ao(x,$,q,ye):so(x,$,q,ye)}
                   `};return{name:"MatMul",shaderCache:{hint:`${x};${t.activation};${_};${o}`,inputDependencies:G},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:U}),getShaderSource:te}}});var Xm,Cu,Au=V(()=>{"use strict";J();Ye();ae();bt();Hr();Tu();Kr();Xm=(e,t,r,n,o=!1,i,a=4,u=4,d=4,c="f32")=>{let p=G=>{switch(G){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${c}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${G} is not supported.`)}},m=G=>{switch(G){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${G} is not supported.`)}},f=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,y=e?`
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
    `,g=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",_=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",x=e?"row":"col",$=e?"col":"row",w=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${x} / outWidth;
    let outCol = ${x} % outWidth;

    let WRow = ${$} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${$} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${$} % inChannels;
    var resData = ${Ie(a,c)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${g} && xCol >= 0 && xCol < ${_}) {
      ${f}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${p(a)}
    }
    return resData;`,S=e?t&&n?`
    let col = colIn * ${a};
    ${w}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${w}
    }
    return ${Ie(a,c)}(0.0);`:n&&r?`
    let col = colIn * ${a};
    ${w}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${w}
    }
    return ${Ie(a,c)}(0.0);`,T=e?n&&r?m(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${m(u)}
    }
    return ${Ie(u,c)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${m(u)}
    }
    return ${Ie(u,c)}(0.0);`,I=Ie(d,c),C=e?Ie(a,c):Ie(u,c),P=e?Ie(u,c):Ie(a,c),O=He(i,I,c);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${e?S:T}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${P} {
      ${e?T:S}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${I}) {
      let col = colIn * ${d};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${y}
      ${xu(o)}
      ${O}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Cu=(e,t,r,n,o,i,a,u,d)=>{let c=t.format==="NHWC",p=c?e[0].dims[3]:e[0].dims[1],m=r[0],f=c?r[2]:r[3],y=c?r[1]:r[2],g=c?r[3]:r[1],_=c&&(p%4===0||p%3===0)&&g%4===0,x=c?g:f*y,$=c?f*y:g,w=[8,8,1],S=n<=8?[4,1,1]:[4,4,1],T=[Math.ceil(x/w[0]/S[0]),Math.ceil($/w[1]/S[1]),Math.ceil(m/w[2]/S[2])];ue("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${T}`);let I=_?c&&p%4!==0?3:4:1,C=w[1]*S[1],P=w[0]*S[0],O=Math.max(w[0]*I,w[1]),U=n%C===0,G=o%P===0,F=i%O===0,te=_?[I,4,4]:[1,1,1],N=[{type:6,data:n},{type:6,data:o},{type:6,data:i},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Fe(t,N),N.push(...W(e[0].dims,e[1].dims));let Y=["rank","rank"];a&&(N.push(...W(e[2].dims)),Y.push("rank")),N.push(...W(r));let ye=q=>{let X=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];qe(t,X);let ie=_?4:1,Z=he(e[0].dataType),se=`
      fn setOutputAtIndex(flatIndex : i32, value : ${_?`vec4<${Z}>`:Z}) {
        result[flatIndex] = ${_?`vec4<${Z}>`:Z}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${_?`vec4<${Z}>`:Z}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${_?"/ 4":""}, value);
      }`,Te=E("x",e[0].dataType,e[0].dims.length,I===3?1:I),we=E("w",e[1].dataType,e[1].dims.length,ie),z=[Te,we],B=M("result",e[0].dataType,r.length,ie);if(a){let K=E("bias",e[2].dataType,e[2].dims.length,ie);z.push(K),se+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${_?`vec4<${Z}>`:Z} {
          return bias[coords.${c?"w":"y"}${_?"/ 4":""}];
        }`}return`
        ${Su("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${q.registerUniforms(X).declareVariables(...z,B)}
        ${se}
        ${Xm(c,U,G,F,a,t,te[0],te[1],te[2],Z)}
        ${_?ao(S,w,Z,void 0,!c,O):so(S,w,Z,void 0,!c,O,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${I};${_};${U};${G};${F};${C};${P};${O}`,inputDependencies:Y},getRunData:()=>({outputs:[{dims:d?d(r):r,dataType:e[0].dataType}],dispatchGroup:{x:T[0],y:T[1],z:T[2]},programUniforms:N}),getShaderSource:ye}}});var Jm,ku,jr,ef,Eu,tf,Pu,zu,Ou=V(()=>{"use strict";J();Ye();re();ae();bt();Hr();Jm=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},ku=e=>typeof e=="number"?[e,e,e]:e,jr=(e,t)=>t<=1?e:e+(e-1)*(t-1),ef=(e,t,r,n=1)=>{let o=jr(t,n);return Math.floor((e[0]*(r-1)-r+o)/2)},Eu=(e,t,r,n,o)=>{o==null&&(o=ef(e,t[0],n[0]));let i=[0,0,0,r];for(let a=0;a<3;a++)e[a]+2*o>=t[a]&&(i[a]=Math.trunc((e[a]-t[a]+2*o)/n[a]+1));return i},tf=(e,t,r,n,o,i,a,u,d,c)=>{let p,m,f,y;if(e==="VALID"&&(e=0),typeof e=="number"){p={top:e,bottom:e,left:e,right:e,front:e,back:e};let g=Eu([t,r,n,1],[u,d,c],1,[o,i,a],e);m=g[0],f=g[1],y=g[2]}else if(Array.isArray(e)){if(!e.every((_,x,$)=>_===$[0]))throw Error(`Unsupported padding parameter: ${e}`);p={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let g=Eu([t,r,n,1],[u,d,c],1,[o,i,a],e[0]);m=g[0],f=g[1],y=g[2]}else if(e==="SAME_UPPER"){m=Math.ceil(t/o),f=Math.ceil(r/i),y=Math.ceil(n/a);let g=(m-1)*o+u-t,_=(f-1)*i+d-r,x=(y-1)*a+c-n,$=Math.floor(g/2),w=g-$,S=Math.floor(_/2),T=_-S,I=Math.floor(x/2),C=x-I;p={top:S,bottom:T,left:I,right:C,front:$,back:w}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:p,outDepth:m,outHeight:f,outWidth:y}},Pu=(e,t,r,n,o,i=!1,a="channelsLast")=>{let u,d,c,p,m;if(a==="channelsLast")[u,d,c,p,m]=e;else if(a==="channelsFirst")[u,m,d,c,p]=e;else throw new Error(`Unknown dataFormat ${a}`);let[f,,y,g,_]=t,[x,$,w]=ku(r),[S,T,I]=ku(n),C=jr(y,S),P=jr(g,T),O=jr(_,I),{padInfo:U,outDepth:G,outHeight:F,outWidth:te}=tf(o,d,c,p,x,$,w,C,P,O),N=i?f*m:f,Y=[0,0,0,0,0];return a==="channelsFirst"?Y=[u,N,G,F,te]:a==="channelsLast"&&(Y=[u,G,F,te,N]),{batchSize:u,dataFormat:a,inDepth:d,inHeight:c,inWidth:p,inChannels:m,outDepth:G,outHeight:F,outWidth:te,outChannels:N,padInfo:U,strideDepth:x,strideHeight:$,strideWidth:w,filterDepth:y,filterHeight:g,filterWidth:_,effectiveFilterDepth:C,effectiveFilterHeight:P,effectiveFilterWidth:O,dilationDepth:S,dilationHeight:T,dilationWidth:I,inShape:e,outShape:Y,filterShape:t}},zu=(e,t,r,n,o,i)=>{let a=i==="channelsLast",u=a?e[0].dims[3]:e[0].dims[1],d=!1,c=[64,1,1],p={x:r.map((w,S)=>S)},m=[Math.ceil(Jm(p.x.map(w=>r[w]))/c[0]),1,1];ue("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${m}`);let f=d?a&&u%4!==0?3:4:1,y=k.size(r),g=[{type:12,data:y},{type:12,data:n},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];Fe(t,g),g.push(...W(e[0].dims,e[1].dims));let _=["rank","rank"],x=e.length===3;x&&(g.push(...W(e[2].dims)),_.push("rank")),g.push(...W(r));let $=w=>{let S=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:n.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];qe(t,S);let T=d?4:1,I=he(e[0].dataType),C=E("x",e[0].dataType,e[0].dims.length,f===3?1:f),P=E("W",e[1].dataType,e[1].dims.length,T),O=[C,P],U=M("result",e[0].dataType,r.length,T),G="";if(x){let N=E("bias",e[2].dataType,e[2].dims.length,T);O.push(N),G+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${d?`vec4<${I}>`:I} {
          return bias[${a?H("coords",4,5):H("coords",1,5)}${d?"/ 4":""}];
        }`}let F=Ie(f,I),te=He(t,F,I);return`
            ${G}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${C.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${P.getByIndices("aIndices")};
            }
          ${w.registerUniforms(S).declareVariables(...O,U)}
          ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${U.offsetToIndices("global_idx")};
              let batch = ${H("coords",0,C.rank)};
              let d2 = ${a?H("coords",C.rank-1,C.rank):H("coords",1,C.rank)};
              let xFRCCorner = vec3<u32>(${a?H("coords",1,C.rank):H("coords",2,C.rank)},
              ${a?H("coords",2,C.rank):H("coords",3,C.rank)},
              ${a?H("coords",3,C.rank):H("coords",4,C.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?H("uniforms.x_shape",1,C.rank):H("uniforms.x_shape",2,C.rank)};
              let xShapeZ = ${a?H("uniforms.x_shape",2,C.rank):H("uniforms.x_shape",3,C.rank)};
              let xShapeW = ${a?H("uniforms.x_shape",3,C.rank):H("uniforms.x_shape",4,C.rank)};
              let xShapeU = ${a?H("uniforms.x_shape",4,C.rank):H("uniforms.x_shape",1,C.rank)};
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
              ${te}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${a};${f};${x}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:m[0],y:m[1],z:m[2]},programUniforms:g}),getShaderSource:$}}});var Du,Bu,Mu=V(()=>{"use strict";J();re();ae();bt();Du=(e,t,r,n)=>{let o=e.length>2,i=o?"value += b[output_channel];":"",a=e[0].dims,u=e[1].dims,d=t.format==="NHWC",c=d?r[3]:r[1],p=c/t.group,m=d&&p>=4?pe(c):1,f=k.size(r)/m,y=[{type:12,data:f},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:p}];Fe(t,y),y.push(...W(a,[u[0],u[1],u[2],u[3]/m]));let g=o?["rank","rank","rank"]:["rank","rank"];y.push(...W([r[0],r[1],r[2],r[3]/m]));let _=x=>{let $=M("output",e[0].dataType,r.length,m),w=he($.type.tensor),S=He(t,$.type.value,w),T=E("x",e[0].dataType,a.length),I=E("w",e[1].dataType,u.length,m),C=[T,I];o&&C.push(E("b",e[2].dataType,e[2].dims,m));let P=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];qe(t,P);let O=d?`
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
            let wVal = ${I.get("wHeight","wWidth","wInChannel","output_channel")};
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
            let wVal = ${I.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${x.registerUniforms(P).declareVariables(...C,$)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${$.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${d?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${d?1:2}], outputIndices[${d?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${m} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${d?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${O}
    ${i}
    ${S}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${m}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:y}),getShaderSource:_}},Bu=(e,t,r,n)=>{let o=e.length>2,i=pe(r[3]),a=pe(r[2]),u=k.size(r)/i/a,d=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/i],c=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/i],p=[r[0],r[1],r[2],r[3]/i],m=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Fe(t,m),m.push(...W(d,c,p));let f=(a-1)*t.strides[1]+c[1],y=g=>{let _=M("output",e[0].dataType,p.length,i),x=he(_.type.tensor),$=He(t,_.type.value,x),w=E("x",e[0].dataType,d.length,i),S=E("w",e[1].dataType,c.length,i),T=[w,S];o&&T.push(E("b",e[2].dataType,e[2].dims,i));let I=o?"value += b[output_channel];":"",C=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return qe(t,C),`
  ${g.registerUniforms(C).declareVariables(...T,_)}
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

    var x_vals: array<${w.type.value}, ${f}>;
    var values: array<${_.type.value}, ${a}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${c[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${f}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${w.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${w.type.value}(0);
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
      ${I}
      ${$}
      ${_.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${i};${a};${f};${c[0]};${c[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:m}),getShaderSource:y}}});var rf,uo,nf,lo,co,Ru,of,af,po,Uu=V(()=>{"use strict";re();Au();Ou();Kr();Mu();bt();qr();at();rf=(e,t,r,n,o,i)=>{let a=e[0],u=e.slice(i?1:2,i?3:4),d=u.length,c=t[0],m=t.slice(2).map((g,_)=>g+(g-1)*(r[_]-1)),y=u.map((g,_)=>g+n[_]+n[_+d]).map((g,_)=>Math.floor((g-m[_]+o[_])/o[_]));return y.splice(0,0,a),y.splice(i?3:1,0,c),y},uo=[2,3,1,0],nf=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[1]*t.group;if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},lo=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let i=2;i<t[1].dims.length;++i)r[i-2]===0&&(r[i-2]=t[1].dims[i]);let n=e.pads.slice();Tt.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.format==="NHWC",e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:r,pads:n}),o},co=e=>{let t=Gr(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],o=e.dilations,i=e.group,a=e.kernel_shape,u=e.pads,d=e.strides,c=e.w_is_const();return{autoPad:n,format:r,dilations:o,group:i,kernelShape:a,pads:u,strides:d,wIsConst:c,...t,cacheKey:`${e.format};${t.activation};`}},Ru=(e,t,r,n)=>{let o=r.format==="NHWC",i=rf(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,o);if(r.group!==1){let C=[t[0]];if(o){let O=e.kernelCustomData.wT??e.compute(ke(t[1],uo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=O),C.push(O)}else C.push(t[1]);t.length===3&&C.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(Bu(C,r,i,n),{inputs:C}):e.compute(Du(C,r,i,n),{inputs:C});return}let a=t.length===3,u=t[0].dims[o?1:2],d=t[0].dims[o?2:3],c=t[0].dims[o?3:1],p=t[1].dims[2],m=t[1].dims[3],f=i[o?1:2],y=i[o?2:3],g=i[o?3:1],_=o&&p===u&&m===d&&r.pads[0]===0&&r.pads[1]===0;if(_||p===1&&m===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let C=i[0],P,O,U,G=[];if(o){let N=e.kernelCustomData.wT??e.compute(ke(t[1],uo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=N),_){let Y=u*d*c;P=t[0].reshape([1,C,Y]),O=N.reshape([1,Y,g]),U=[1,C,g]}else P=t[0].reshape([C,u*d,c]),O=N.reshape([1,c,g]),U=[C,f*y,g];G.push(P),G.push(O)}else P=t[0].reshape([C,c,u*d]),O=t[1].reshape([1,g,c]),U=[C,g,f*y],G.push(O),G.push(P);a&&G.push(t[2]);let F=U[2],te=G[0].dims[G[0].dims.length-1];F<8&&te<8?e.compute(Fr(G,r,i,U,o,n),{inputs:G}):e.compute(Yt(G,r,i,U,o,n),{inputs:G});return}let x=!0,$=e.kernelCustomData.wT??e.compute(ke(t[1],uo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let w=[t[0],$];a&&w.push(t[2]);let S=o?f*y:g,T=o?g:f*y,I=p*m*c;e.compute(Cu(w,r,i,S,T,I,a,x,n),{inputs:w})},of=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],i=[1].concat(t.strides),a=[1].concat(t.dilations),u=[1].concat(t.kernelShape),d=lo({...t,pads:o,strides:i,dilations:a,kernelShape:u},n);Ru(e,n,d,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},af=(e,t,r)=>{let n=r.format==="NHWC"?"channelsLast":"channelsFirst",o=lo(r,t),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,a=Pu(t[0].dims,t[1].dims,r.strides,r.dilations,i,!1,n);e.compute(zu(t,o,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],n))},po=(e,t)=>{if(nf(e.inputs,t),e.inputs[0].dims.length===3)of(e,t);else if(e.inputs[0].dims.length===5)af(e,e.inputs,t);else{let r=lo(t,e.inputs);Ru(e,e.inputs,r)}}});var Nu,Vu=V(()=>{"use strict";J();Ye();re();ae();Nu=(e,t,r)=>{let n=e.length>2,o=t.outputShape,i=t.format==="NHWC",a=t.group,u=e[1].dims,d=u[2]/a,c=u[3],p=i?pe(d):1,m=i?pe(c):1,f=i?c===1?p:m:1,y=k.size(o)/m,g=[Math.ceil(y/64),1,1];ue("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${g}`);let _=["rank","rank"],x=[t.strides[0],t.strides[1]],$=[t.kernelShape[i?1:2],t.kernelShape[i?2:3]],w=[t.dilations[0],t.dilations[1]],S=[$[0]+(t.dilations[0]<=1?0:(t.kernelShape[i?1:2]-1)*(t.dilations[0]-1)),$[1]+(t.dilations[1]<=1?0:(t.kernelShape[i?2:3]-1)*(t.dilations[1]-1))],T=[S[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),S[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],I=[{type:12,data:y},{type:12,data:x},{type:12,data:$},{type:12,data:w},{type:12,data:S},{type:6,data:T},{type:12,data:d},{type:12,data:c},...W(e[0].dims,e[1].dims)];n&&(I.push(...W(e[2].dims)),_.push("rank")),I.push(...W(o));let C=P=>{let O=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:x.length},{name:"filter_dims",type:"u32",length:$.length},{name:"dilations",type:"u32",length:$.length},{name:"effective_filter_dims",type:"u32",length:S.length},{name:"pads",type:"i32",length:T.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],U=he(e[0].dataType),G=i?1:2,F=i?2:3,te=i?3:1,N=E("W",e[1].dataType,e[1].dims.length,f),Y=E("Dy",e[0].dataType,e[0].dims.length,p),ye=[Y,N];n&&ye.push(E("bias",e[2].dataType,[o[te]].length,m));let q=M("result",e[0].dataType,o.length,m),X=()=>{let Z="";if(p===1)Z+=`
        let w_offset = ${N.indicesToOffset(`${N.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
        let wValue = ${N.getByOffset(`w_offset / ${f}`)};
        dotProd = dotProd + xValue * wValue;`;else if(c===1)Z+=`
          let wValue = ${N.getByOffset(`${N.indicesToOffset(`${N.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)} / ${f}`)};
          dotProd = dotProd + dot(xValue, wValue);`;else for(let se=0;se<p;se++)Z+=`
            let wValue${se} = ${N.getByOffset(`${N.indicesToOffset(`${N.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${se}, wOutChannel)`)} / ${f}`)};
            dotProd = dotProd + xValue[${se}] * wValue${se};`;return Z},ie=`
            let outputIndices = ${q.offsetToIndices(`global_idx * ${m}`)};
            let batch = ${q.indicesGet("outputIndices",0)};
            let d1 = ${q.indicesGet("outputIndices",te)};
            let r = ${q.indicesGet("outputIndices",G)};
            let c = ${q.indicesGet("outputIndices",F)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${q.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${U}(dyRCorner) + ${U}(wR)) / ${U}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${U}(uniforms.Dy_shape[${G}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${U}(dyCCorner) + ${U}(wC)) / ${U}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${U}(uniforms.Dy_shape[${F}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + ${p}) {
                  let xValue = ${i?Y.getByOffset(`${Y.indicesToOffset(`${Y.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p}`):Y.get("batch","inputChannel","idyR","idyC")};
                  ${X()}
                  inputChannel = inputChannel + ${p};
                }
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${n?` + bias[d1 / ${m}]`:""};
            ${q.setByOffset("global_idx","value")};
          `;return`
    ${P.registerUniforms(O).declareVariables(...ye,q)}
      ${P.mainStart()}
      ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${ie}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${p}${f}${m}${c===1}`,inputDependencies:_},getRunData:()=>({dispatchGroup:{x:g[0],y:g[1],z:g[2]},outputs:[{dims:r?r(o):o,dataType:e[0].dataType}],programUniforms:I}),getShaderSource:C}}});var sf,uf,df,Wu,Lu,lf,Gu,cf,Hu,Fu=V(()=>{"use strict";Vu();bt();at();sf=(e,t,r,n,o,i)=>(e-1)*t+r+(n-1)*o+1-i,uf=(e,t,r,n,o)=>{let i=Math.floor(e/2);t==="SAME_UPPER"?(r[n]=i,r[o]=e-i):t==="SAME_LOWER"&&(r[n]=e-i,r[o]=i)},df=(e,t,r,n,o,i,a,u,d,c)=>{let p=e.length-2,m=c.length===0;d.length<p&&d.push(...Array(p-d.length).fill(0));let f=e[0],y=t[u?3:1]*o;for(let g=0,_=e.length-p-(u?1:0);g<p;++g,++_){let x=e[_],$=m?x*a[g]:c[g],w=sf(x,a[g],i[g],t[_],r[g],$);uf(w,n,i,g,g+p),m&&c.push(a[g]*(x-1)+d[g]+(t[_]-1)*r[g]+1-i[g]-i[g+p])}c.splice(0,0,f),c.splice(u?3:1,0,y)},Wu=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((m,f)=>m*f,1)===0){r.length=0;for(let m=2;m<t[1].dims.length;++m)r.push(t[1].dims[m])}let n=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let o=e.pads.slice(),i=e.outputShape.slice(),a=e.outputPadding.slice(),u=t[0].dims,d=e.dilations.slice();if(d.reduce((m,f)=>m+f,0)===0){let m=t[0].dims.length-2;d=new Array(m).fill(1)}let c=e.strides.slice();if(c.reduce((m,f)=>m+f,0)===0){let m=t[0].dims.length-2;c=new Array(m).fill(1)}df(u,r,d,e.autoPad,e.group,o,c,n,a,i);let p=Object.assign({},e);return Object.assign(p,{kernelShape:r,pads:o,outputPadding:a,outputShape:i,dilations:d,strides:c}),p},Lu=e=>{let t=Gr(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,i=e.group,a=e.kernelShape,u=e.pads,d=e.strides,c=e.wIsConst(),p=e.outputPadding,m=e.outputShape;return{autoPad:n,format:r,dilations:o,group:i,kernelShape:a,outputPadding:p,outputShape:m,pads:u,strides:d,wIsConst:c,...t,cacheKey:`${e.format};${t.activation};`}},lf=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[0];if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==o))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((p,m)=>p+m,0)>0&&t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.reduce((p,m)=>p+m,0)>0&&t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.reduce((p,m)=>p+m,0)>0&&t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.outputPadding.length!==i&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((p,m)=>p+m,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Gu=(e,t,r,n)=>{let o=e.kernelCustomData.wT??e.compute(ke(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=o);let i=[t[0],o];t.length===3&&i.push(t[2]),e.compute(Nu(i,r,n),{inputs:i})},cf=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=t.kernelShape;(o.length===0||o[0]===0)&&(o=[e.inputs[1].dims[2]]);let i=t.dilations;(i.length===0||i[0]===0)&&(i=[1]);let a=t.strides;(a.length===0||a[0]===0)&&(a=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],a=[1].concat(a),i=[1].concat(i),o=[1].concat(o);let d=t.outputPadding;d=[0].concat(d);let c=Wu({...t,pads:u,strides:a,dilations:i,kernelShape:o,outputPadding:d},n);Gu(e,n,c,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},Hu=(e,t)=>{if(lf(e.inputs,t),e.inputs[0].dims.length===3)cf(e,t);else{let r=Wu(t,e.inputs);Gu(e,e.inputs,r)}}});var pf,qu,Ku,ju=V(()=>{"use strict";J();re();$e();ae();pf=(e,t,r,n)=>{let o=k.size(t),i=t.length,a=E("input",e,i),u=M("output",e,i),d=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),c=k.normalizeAxis(d,i),p=m=>{let f=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,y=H("uniforms.input_shape","uniforms.axis",i),g=n.reverse?f+(n.exclusive?" + 1":""):"0",_=n.reverse?y:f+(n.exclusive?"":" + 1");return`
                ${m.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,u)}
                ${m.mainStart()}
                  ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${g};
                  let last : i32 = ${_};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:c},...W(t,t)]}),getShaderSource:p}},qu=(e,t)=>{let r=e.inputs[0].dims,n=e.inputs[0].dataType,o=e.inputs[1];e.compute(pf(n,r,o,t),{inputs:[0]})},Ku=e=>{let t=e.exclusive===1,r=e.reverse===1;return ee({exclusive:t,reverse:r})}});var mf,ff,hf,Zu,Qu,Yu=V(()=>{"use strict";J();re();$e();ae();mf=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},ff=(e,t,r,n)=>{let o=[];o.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<t;++i)o.push(r.indicesSet("a",e[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},hf=(e,t)=>{let r,n,o,i,a,u,d=t.format==="NHWC",c=t.blocksize,p=t.mode==="DCR";d?([r,n,o,i]=e.dims,a=p?[r,n,o,c,c,i/c**2]:[r,n,o,i/c**2,c,c],u=p?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,o,i]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],a=p?[r,c,c,i/c**2,n,o]:[r,i/c**2,c,c,n,o],u=p?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let m=e.reshape(a),f=m.dims.length,y=e.dataType,g=E("a",y,f),_=M("output",y,f),x=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(g,_)}

  ${ff(u,f,g,_)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${_.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${_.setByOffset("global_idx",g.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let w=d?[r,n*c,o*c,i/c**2]:[r,i/c**2,n*c,o*c],S=k.size(w),T=m.dims,I=k.sortBasedOnPerm(T,u);return{outputs:[{dims:w,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(S/64)},programUniforms:[{type:12,data:S},...W(T,I)]}},getShaderSource:x}},Zu=(e,t)=>{mf(e.inputs),e.compute(hf(e.inputs[0],t))},Qu=e=>ee({blocksize:e.blocksize,mode:e.mode,format:e.format})});var mo,Zr,Xu,gf,bf,fo,ho,Ju,yf,ed,td,rd=V(()=>{"use strict";J();re();$e();ae();mo="[a-zA-Z]|\\.\\.\\.",Zr="("+mo+")+",Xu="^"+Zr+"$",gf="("+Zr+",)*"+Zr,bf="^"+gf+"$",fo=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,r){let n=this.symbolToIndices.get(t);n===void 0?n=[r]:n.push(r),this.symbolToIndices.set(t,n)}},ho=class{constructor(t,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,o]=r.includes("->")?r.split("->",2):[r,""];if(!n.match(RegExp(bf)))throw new Error("Invalid LHS term");if(n.split(",").forEach((u,d)=>{let c=t[d].dims.slice();if(!u.match(RegExp(Xu)))throw new Error("Invalid LHS term");let p=this.processTerm(u,!0,c,d);this.lhs.push(p)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([u,d])=>d.count===1||u==="...").map(([u])=>u).join("");else if(!o.match(RegExp(Zr)))throw new Error("Invalid RHS");o.match(RegExp(mo,"g"))?.forEach(u=>{if(u==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let d=this.symbolToInfo.get(u);if(d===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(d.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(t,r,n){let o=this.symbolToInfo.get(t);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(n)}else o={count:1,dimValue:r,inputIndices:[n]};this.symbolToInfo.set(t,o)}processTerm(t,r,n,o=-1){let i=n.length,a=!1,u=[],d=0;if(!t.match(RegExp(Xu))&&!r&&t!=="")throw new Error("Invalid LHS term");let c=t.match(RegExp(mo,"g")),p=new fo(o);return c?.forEach((m,f)=>{if(m==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let y=i-c.length+1;if(y<0)throw new Error("Ellipsis out of bounds");if(u=n.slice(d,d+y),this.hasEllipsis){if(this.ellipsisDims.length!==u.length||this.ellipsisDims.toString()!==u.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=u;else throw new Error("Ellipsis must be specified in the LHS");for(let g=0;g<u.length;g++){let _=String.fromCharCode(48+g);p.addSymbol(_,f+g),this.addSymbol(_,n[d++],o)}}else p.addSymbol(m,f+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(m,n[d++],o)}),p}},Ju=e=>e+"_max",yf=(e,t,r,n)=>{let i=e.map(p=>p.length).map((p,m)=>E(`input${m}`,t,p)),a=k.size(n),u=M("output",t,n.length),d=[...r.symbolToInfo.keys()].filter(p=>!r.rhs.symbolToIndices.has(p)),c=p=>{let m=[],f="var prod = 1.0;",y="var sum = 0.0;",g="sum += prod;",_=[],x=[],$=[],w=[],S=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((I,C)=>{if(r.rhs.symbolToIndices.has(C)){let P=r.rhs.symbolToIndices.get(C)?.[0];P!==void 0&&r.lhs.forEach((O,U)=>{if(I.inputIndices.includes(U)){let G=O.symbolToIndices.get(C);if(G===void 0)throw new Error("Invalid symbol error");G.forEach(F=>{m.push(`${i[U].indicesSet(`input${U}Indices`,F,u.indicesGet("outputIndices",P))}`)})}})}else r.lhs.forEach((P,O)=>{if(I.inputIndices.includes(O)){let U=P.symbolToIndices.get(C);if(U===void 0)throw new Error("Invalid symbol error");U.forEach(G=>{_.push(`${i[O].indicesSet(`input${O}Indices`,G,`${C}`)}`)}),w.push(`prod *= ${i[O].getByIndices(`input${O}Indices`)};`)}}),x.push(`for(var ${C}: u32 = 0; ${C} < uniforms.${Ju(C)}; ${C}++) {`),$.push("}")});let T=S?[...m,`let sum = ${i.map((I,C)=>I.getByIndices(`input${C}Indices`)).join(" * ")};`]:[...m,y,...x,..._,f,...w,g,...$];return`
            ${p.registerUniforms(d.map(I=>({name:`${Ju(I)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,u)}

            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${u.offsetToIndices("global_idx")};
            ${i.map((I,C)=>`var input${C}Indices: ${i[C].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${u.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let p=d.filter(f=>r.symbolToInfo.has(f)).map(f=>({type:12,data:r.symbolToInfo.get(f)?.dimValue||0}));p.push({type:12,data:a});let m=e.map((f,y)=>[...W(f)]).reduce((f,y)=>f.concat(y),p);return m.push(...W(n)),{outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:m}},getShaderSource:c}},ed=(e,t)=>{let r=new ho(e.inputs,t.equation),n=r.outputDims,o=e.inputs.map((i,a)=>i.dims);e.compute(yf(o,e.inputs[0].dataType,r,n))},td=e=>{let t=e.equation.replace(/\s+/g,"");return ee({equation:t})}});var _f,nd,wf,vf,od,id=V(()=>{"use strict";J();re();ae();_f=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,o=t.length<r.length?0:t.length-r.length;for(;n<r.length&&o<t.length;++n,++o)if(r[n]!==t[o]&&r[n]!==1&&t[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},nd=(e,t)=>{let r=e.length-t.length,n=[];for(let o=0;o<r;++o)n.push(e[o]);for(let o=0;o<t.length;++o)n.push(t[o]===1?e[o+r]:t[o]);return n},wf=(e,t)=>e.length>t.length?nd(e,t):nd(t,e),vf=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=wf(t,r),o=e[0].dataType,i=o===9||k.size(t)===1,a=o===9||t.length>0&&t[t.length-1]%4===0?4:1,u=i||n.length>0&&n[n.length-1]%4===0?4:1,d=Math.ceil(k.size(n)/u),c=m=>{let f=E("input",o,t.length,a),y=M("output",o,n.length,u),g;if(o===9){let _=(x,$,w="")=>`
          let outputIndices${$} = ${y.offsetToIndices(`outputOffset + ${$}u`)};
          let offset${$} = ${f.broadcastedIndicesToOffset(`outputIndices${$}`,y)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${x}[${$}] = ${w}(${f.getByOffset(`index${$}`)}[component${$}]);
        `;g=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${_("data",0,"u32")}
        ${_("data",1,"u32")}
        ${_("data",2,"u32")}
        ${_("data",3,"u32")}
        ${y.setByOffset("global_idx","data")}
      }`}else g=`
        let outputIndices = ${y.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${f.broadcastedIndicesToOffset("outputIndices",y)};
        let data = ${y.type.value}(${f.getByOffset(`inputOffset / ${a}`)});
        ${y.setByOffset("global_idx","data")}
      }`;return`
    ${m.registerUniform("vec_size","u32").declareVariables(f,y)}
    ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${g}`},p=[{type:12,data:d},...W(t,n)];return{name:"Expand",shaderCache:{hint:`${n.length};${a}${u}`,inputDependencies:["rank"]},getShaderSource:c,getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p})}},od=e=>{_f(e.inputs),e.compute(vf(e.inputs),{inputs:[0]})}});var $f,ad,sd=V(()=>{"use strict";J();re();ae();Lr();$f=e=>{let t=e[0].dataType,r=k.size(e[0].dims),n=k.size(e[1].dims),o=n%4===0,i=a=>{let u=E("x",t,[1],4),d=E("bias",t,[1],4),c=M("y",t,[1],4),p=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],m=y=>`
      let bias${y}_offset: u32 = (global_idx * 4 + ${y}) % uniforms.bias_size;
      let bias${y} = ${d.getByOffset(`bias${y}_offset / 4`)}[bias${y}_offset % 4];`,f=o?`
      let bias = ${d.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${m(0)}${m(1)}${m(2)}${m(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(p).declareVariables(u,d,c)}

    ${oo(Ae(t))}

    ${a.mainStart(It)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${f}
      let x_in = x + bias;
      ${c.setByOffset("global_idx",io("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/It/4)}})}},ad=e=>{e.inputs.length<2||k.size(e.inputs[1].dims)===0?ru(e):e.compute($f(e.inputs))}});var xf,Sf,ud,dd,ld=V(()=>{"use strict";J();re();$e();ae();xf=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Sf=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,i=k.normalizeAxis(t.axis,o),a=r.slice(0);a.splice(i,1,...n);let u=r[i],d=e[0].dataType===9?4:1,c=Math.ceil(k.size(a)/d),p=[{type:12,data:c},{type:6,data:u},{type:12,data:i},...W(e[0].dims,e[1].dims,a)],m=f=>{let y=E("data",e[0].dataType,e[0].dims.length,d),g=E("inputIndices",e[1].dataType,e[1].dims.length),_=M("output",e[0].dataType,a.length,d),x=w=>{let S=n.length,T=`var indicesIndices${w}  = ${g.type.indices}(0);`;for(let I=0;I<S;I++)T+=`${S>1?`indicesIndices${w}[${I}]`:`indicesIndices${w}`} = ${a.length>1?`outputIndices${w}[uniforms.axis + ${I}]`:`outputIndices${w}`};`;T+=`
          var idx${w} = ${g.getByIndices(`indicesIndices${w}`)};
          if (idx${w} < 0) {
            idx${w} = idx${w} + uniforms.axisDimLimit;
          }
          var dataIndices${w} : ${y.type.indices};
        `;for(let I=0,C=0;I<o;I++)I===i?(T+=`${o>1?`dataIndices${w}[${I}]`:`dataIndices${w}`} = u32(idx${w});`,C+=S):(T+=`${o>1?`dataIndices${w}[${I}]`:`dataIndices${w}`} = ${a.length>1?`outputIndices${w}[${C}]`:`outputIndices${w}`};`,C++);return T},$;if(e[0].dataType===9){let w=(S,T,I="")=>`
          let outputIndices${T} = ${_.offsetToIndices(`outputOffset + ${T}u`)};
          ${x(T)};
          let offset${T} = ${y.indicesToOffset(`dataIndices${T}`)};
          let index${T} = offset${T} / 4u;
          let component${T} = offset${T} % 4u;
          ${S}[${T}] = ${I}(${y.getByOffset(`index${T}`)}[component${T}]);
        `;$=`
        let outputOffset = global_idx * ${d};
        var value = vec4<u32>(0);
        ${w("value",0,"u32")}
        ${w("value",1,"u32")}
        ${w("value",2,"u32")}
        ${w("value",3,"u32")}
        ${_.setByOffset("global_idx","value")}
      `}else $=`
      let outputIndices = ${_.offsetToIndices("global_idx")};
      ${x("")};
      let value = ${y.getByIndices("dataIndices")};
      ${_.setByOffset("global_idx","value")};
      `;return`
      ${f.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(y,g,_)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:p}),getShaderSource:m}},ud=e=>ee({axis:e.axis}),dd=(e,t)=>{let r=e.inputs;xf(r),e.compute(Sf(e.inputs,t))}});var Tf,cd,pd,md=V(()=>{"use strict";J();re();ae();Tf=(e,t,r,n,o,i,a,u,d)=>{let c=[{type:12,data:i},{type:12,data:n},{type:12,data:o},{type:12,data:r},{type:12,data:a},{type:12,data:u},{type:12,data:d}],p=[i];c.push(...W(t.dims,p));let m=f=>{let y=E("indices_data",t.dataType,t.dims.length),g=M("input_slice_offsets_data",12,1,1),_=[y,g],x=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${f.registerUniforms(x).declareVariables(..._)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:c}),getShaderSource:m},{inputs:[t],outputs:[-1]})[0]},cd=(e,t)=>{let r=e.inputs,n=r[0].dims,o=r[0].dataType,i=r[1].dims,a=i[i.length-1],u=k.sizeToDimension(i,i.length-1),d=k.sizeFromDimension(n,t.batchDims+a),c=k.sizeToDimension(n,t.batchDims),p=k.sizeFromDimension(n,t.batchDims),m=u/c,f=new Array(a),y=d;for(let T=0;T<a;++T)f[a-1-T]=y,y*=n[t.batchDims+a-1-T];let g=Tf(e,r[1],f,t.batchDims,n,u,m,p,a),_=t.batchDims+a;if(_>n.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let x=i.slice(0,-1).concat(n.slice(_)),$=k.size(x),w=[{type:12,data:$},{type:12,data:d},...W(r[0].dims,g.dims,x)],S=T=>{let I=E("data",r[0].dataType,r[0].dims.length),C=E("slice_offsets",12,g.dims.length),P=M("output",r[0].dataType,x.length);return`
          ${T.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(I,C,P)}
            ${T.mainStart()}
            ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:x,dataType:o}],dispatchGroup:{x:Math.ceil($/64)},programUniforms:w}),getShaderSource:S},{inputs:[r[0],g]})},pd=e=>({batchDims:e.batch_dims,cacheKey:""})});var If,Cf,fd,hd,gd=V(()=>{"use strict";J();re();$e();ae();If=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=k.normalizeAxis(t.quantizeAxis,e[0].dims.length),n=t.blockSize,o=e[0],i=e[2],a=e.length===4?e[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((u,d)=>d===r?Math.ceil(u/n)===i.dims[d]:u===i.dims[d]).reduce((u,d)=>u&&d,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==i.dims.length||!a.dims.map((u,d)=>u===i.dims[d]).reduce((u,d)=>u&&d,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Cf=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,i=k.normalizeAxis(t.gatherAxis,o),a=k.normalizeAxis(t.quantizeAxis,o),u=r.slice(0);u.splice(i,1,...n);let d=k.size(u),c=e[2].dataType,m=e[0].dataType===22,f=[{type:12,data:d},{type:12,data:a},{type:12,data:i},{type:12,data:t.blockSize},...W(...e.map((g,_)=>g.dims),u)],y=g=>{let _=E("data",e[0].dataType,e[0].dims.length),x=E("inputIndices",e[1].dataType,e[1].dims.length),$=E("scales",e[2].dataType,e[2].dims.length),w=e.length>3?E("zeroPoint",e[3].dataType,e[3].dims.length):void 0,S=M("output",c,u.length),T=[_,x,$];w&&T.push(w);let I=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${g.registerUniforms(I).declareVariables(...T,S)}
        ${g.mainStart()}
        let output_indices = ${S.offsetToIndices("global_idx")};
        var indices_indices = ${x.type.indices}(0);
        ${n.length>1?`
          for (var i: u32 = 0; i < ${n.length}; i++) {
            let index = ${S.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${x.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${S.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${_.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${S.indicesGet("output_indices","i")};
          ${_.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${x.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[i]};
        }
        ${_.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${S.indicesGet("output_indices",`i + ${n.length} - 1`)};
          ${_.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${_.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${_.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${m?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${$.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${$.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${$.getByIndices("scale_indices")};
        ${w?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${w.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${w.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${m?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Ae(c)}(quantized_data - zero_point) * scale;
        ${S.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((g,_)=>_!==1).map(g=>g.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(g,_)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:c}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:f}),getShaderSource:y}},fd=(e,t)=>{let r=e.inputs;If(r,t),e.compute(Cf(e.inputs,t))},hd=e=>ee({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})});var Af,kf,bd,yd,_d=V(()=>{"use strict";J();re();$e();ae();Af=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},kf=(e,t)=>{let r=e[0].dims,n=e[0].dataType,o=r.length,i=e[1].dims,a=e[1].dataType,u=k.normalizeAxis(t.axis,o),d=r[u],c=i.slice(0),p=k.size(c),m=E("input",n,o),f=E("indicesInput",a,i.length),y=M("output",n,c.length),g=[{type:12,data:p},{type:6,data:d},{type:12,data:u}];return g.push(...W(r,i,c)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:g}),getShaderSource:$=>`
      ${$.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(m,f,y)}
      ${$.mainStart()}
      ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${y.offsetToIndices("global_idx")};

      var idx = ${f.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${m.type.indices}(outputIndices);
      ${m.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${m.getByIndices("inputIndices")};

      ${y.setByOffset("global_idx","value")};
  }`}},bd=e=>ee({axis:e.axis}),yd=(e,t)=>{let r=e.inputs;Af(r),e.compute(kf(e.inputs,t))}});var Ef,Pf,wd,vd,$d=V(()=>{"use strict";J();re();ae();Ef=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Pf=(e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[o,i,a]=Br.getShapeOfGemmResult(r,t.transA,n,t.transB,e.length===3?e[2].dims:void 0),u=[o,i];if(!u)throw new Error("Can't use gemm on the given tensors");let d=16,c=Math.ceil(i/d),p=Math.ceil(o/d),m=!0,f=k.size(u),y=[{type:12,data:m?c:f},{type:12,data:o},{type:12,data:i},{type:12,data:a},{type:1,data:t.alpha},{type:1,data:t.beta}],g=["type","type"];e.length===3&&(y.push(...W(e[2].dims)),g.push("rank")),y.push(...W(u));let _=$=>{let w="";t.transA&&t.transB?w="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?w="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?w="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(w="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let S=t.alpha===1?"":"value *= uniforms.alpha;",T=E("a",e[0].dataType,e[0].dims),I=E("b",e[1].dataType,e[1].dims),C=T.type.value,P=null,O=[T,I];e.length===3&&(P=E("c",e[2].dataType,e[2].dims.length),O.push(P));let U=M("output",e[0].dataType,u.length);O.push(U);let G=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${$.registerUniforms(G).declareVariables(...O)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${C}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${w}
    }

    ${S}
    ${P!=null?`let cOffset = ${P.broadcastedIndicesToOffset("vec2(m, n)",U)}; value += ${C}(uniforms.beta) * ${P.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},x=$=>{let w=E("a",e[0].dataType,e[0].dims),S=E("b",e[1].dataType,e[1].dims),T=null,I=[w,S];e.length===3&&(T=E("c",e[2].dataType,e[2].dims.length),I.push(T));let C=M("output",e[0].dataType,u.length);I.push(C);let P=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],O="",U="";t.transA&&t.transB?(U=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,O="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(U=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,O="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(U=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,O="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(U=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,O="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let G=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${$.registerUniforms(P).declareVariables(...I)}
  var<workgroup> tile_a: array<array<${w.type.storage}, ${d}>, ${d}>;
  var<workgroup> tile_b: array<array<${S.type.storage}, ${d}>, ${d}>;
  ${$.mainStart([d,d,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${d};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${d};
    let num_tiles = (uniforms.K - 1) / ${d} + 1;
    var k_start = 0u;
    var value = ${C.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${U}
      k_start = k_start + ${d};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${d}; k++) {
        ${O}
      }
      workgroupBarrier();
    }

    ${G}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${T!=null?`let cOffset = ${T.broadcastedIndicesToOffset("vec2(m, n)",C)}; value += ${C.type.value}(uniforms.beta) * ${T.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return m?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:c*p},programUniforms:y}),getShaderSource:x}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:y}),getShaderSource:_}},wd=e=>{let t=e.transA,r=e.transB,n=e.alpha,o=e.beta;return{transA:t,transB:r,alpha:n,beta:o,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},vd=(e,t)=>{Ef(e.inputs),e.compute(Pf(e.inputs,t))}});var st,yt,Bt,Mt,zf,Of,Df,Bf,Mf,Rf,Uf,Nf,xd,Sd,Td=V(()=>{"use strict";J();re();$e();ae();[st,yt,Bt,Mt]=[0,1,2,3],zf=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Of=`
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
`,Df=e=>`
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
`,Bf=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Mf=e=>`
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
`,Rf=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${st}] = batch;
     indices[${yt}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Bt}] = u32(r);
            indices[${Mt}] = u32(c);
          }
        `;case"border":return`
          indices[${Bt}] = u32(clamp(r, 0, H - 1));
          indices[${Mt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Bt}] = gs_reflect(r, border[1], border[3]);
          indices[${Mt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Uf=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${st}], indices[${yt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${st}], indices[${yt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${st}], indices[${yt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${st}], indices[${yt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${st}], indices[${yt}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${st}], indices[${yt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Nf=(e,t)=>{let r=E("x",e[0].dataType,e[0].dims.length),n=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],o=E("grid",e[1].dataType,n.length,2),i=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(i=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[st,yt,Bt,Mt]=[0,3,1,2]);let a=M("output",e[0].dataType,i.length),u=r.type.value,d=k.size(i),c=[{type:12,data:d},...W(e[0].dims,n,i)],p=m=>`
  ${m.registerUniform("output_size","u32").declareVariables(r,o,a)}
  ${Of}
  ${Df(u)}
  ${Bf(t)}
  ${Mf(t)}
  ${Rf(r,u,t)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Bt}]);
      let W_in = i32(uniforms.x_shape[${Mt}]);

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
      var grid_indices = vec3<u32>(indices[${st}], indices[${Bt}], indices[${Mt}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Uf(a,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:m=>{let f=k.size(i);return{outputs:[{dims:i,dataType:m[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:c}},getShaderSource:p}},xd=(e,t)=>{zf(e.inputs),e.compute(Nf(e.inputs,t))},Sd=e=>ee({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})});var Oe,Lf,Cd,Id,Gf,Xt,Ad,go=V(()=>{"use strict";J();re();$e();Dr();Vr();ae();at();Oe=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Lf=(e,t)=>{let r=e[0],n=Oe(e,1),o=Oe(e,2),i=Oe(e,3),a=Oe(e,4),u=Oe(e,5),d=Oe(e,6),c=Oe(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let p=r.dims[0],m=r.dims[1],f=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],y=m,g=0,_=0,x=Math.floor(f/t.numHeads);if(d&&c&&k.size(d.dims)&&k.size(c.dims)){if(d.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==p||d.dims[1]!==t.numHeads||d.dims[3]!==x)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(c.dims[0]!==p||c.dims[1]!==t.numHeads||c.dims[3]!==x)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==c.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(c.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=d.dims[2],_=d.dims[2]}else if(d&&k.size(d.dims)||c&&k.size(c.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(n&&k.size(n.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(n.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,y=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==x)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,y=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==x)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,y=n.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(i&&k.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(n&&n.dims.length===5&&n.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let w=g+y,S=0;if(a&&k.size(a.dims)>0){S=8;let P=a.dims;throw P.length===1?P[0]===p?S=1:P[0]===3*p+2&&(S=3):P.length===2&&P[0]===p&&P[1]===w&&(S=5),S===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let T=!1,I=f;if(o&&k.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(y!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=o.dims[2]}else{if(y!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');I=o.dims[1]*o.dims[3],T=!0}}let C=!1;if(a&&k.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(u&&k.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==p||u.dims[1]!==t.numHeads||u.dims[2]!==m||u.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:p,sequenceLength:m,pastSequenceLength:g,kvSequenceLength:y,totalSequenceLength:w,maxSequenceLength:_,inputHiddenSize:0,hiddenSize:f,vHiddenSize:I,headSize:x,vHeadSize:Math.floor(I/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:S,scale:t.scale,broadcastResPosBias:C,passPastInKv:T,qkvFormat:$}},Cd=e=>ee({...e}),Id=ee({perm:[0,2,1,3]}),Gf=(e,t,r,n,o,i,a)=>{let u=[n,o,i],d=k.size(u),c=[{type:12,data:d},{type:12,data:a},{type:12,data:i}],p=m=>{let f=M("qkv_with_bias",t.dataType,u),y=E("qkv",t.dataType,u),g=E("bias",r.dataType,u),_=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${m.registerUniforms(_).declareVariables(y,g,f)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:p},{inputs:[t,r],outputs:[-1]})[0]},Xt=(e,t,r,n,o,i,a,u)=>{let d=i;if(a&&k.size(a.dims)>0){if(n===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return d=Gf(e,i,a,t,n,r*o,u),d=d.reshape([t,n,r,o]),r===1||n===1?d:e.compute(ke(d,Id.perm),{inputs:[d],outputs:[-1]})[0]}else return i.dims.length===3&&(d=i.reshape([t,n,r,o])),r===1||n===1?d:e.compute(ke(d,Id.perm),{inputs:[d],outputs:[-1]})[0]},Ad=(e,t)=>{let r=Lf(e.inputs,t),n=e.inputs[0],o=Oe(e.inputs,1),i=Oe(e.inputs,2),a=Oe(e.inputs,3),u=Oe(e.inputs,4),d=Oe(e.inputs,5),c=Oe(e.inputs,6),p=Oe(e.inputs,7);if(n.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let m=o&&i&&o.dims.length===4&&i.dims.length===4,f=Xt(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,a,0);if(m)return Dt(e,f,o,i,u,void 0,c,p,d,r);if(!o||!i)throw new Error("key and value must be provided");let y=Xt(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,a,r.hiddenSize),g=Xt(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,a,2*r.hiddenSize);Dt(e,f,y,g,u,void 0,c,p,d,r)}});var Hf,Ff,qf,Kf,bo,kd,Ed,yo=V(()=>{"use strict";J();re();$e();ae();Hf=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Ff=(e,t)=>{let r=[],n=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(o=>r.push(Number(o))),n=r.length),ee({numOutputs:n,axis:t.axis,splitSizes:r})},qf=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${H("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Kf=e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let o=e[n].setByIndices("indices","input[global_idx]");t===1?r.push(o):n===0?r.push(`if (output_number == ${n}u) { ${o} }`):n===t-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${n}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},bo=(e,t)=>{let r=e[0].dims,n=k.size(r),o=e[0].dataType,i=k.normalizeAxis(t.axis,r.length),a=new Array(t.numOutputs),u=E("input",o,r.length),d=new Array(t.numOutputs),c=[],p=[],m=0,f=[{type:12,data:n}];for(let g=0;g<t.numOutputs;g++){m+=t.splitSizes[g],d[g]=m;let _=r.slice();_[i]=t.splitSizes[g],p.push(_),a[g]=M(`output${g}`,o,_.length),c.push({dims:p[g],dataType:e[0].dataType})}f.push({type:12,data:d},...W(r,...p));let y=g=>`
  ${g.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",d.length).declareVariables(u,...a)}
  ${qf(d.length)}
  ${Kf(a)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${H("uniforms.size_in_split_axis","output_number - 1u",d.length)};
      ${u.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:c,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:f})}},kd=(e,t)=>{Hf(e.inputs);let r=e.inputs.length===1?t:Ff(e.inputs,t);e.compute(bo(e.inputs,r),{inputs:[0]})},Ed=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return ee({axis:t,numOutputs:n,splitSizes:r})}});var jf,Zf,Pd,zd,Od=V(()=>{"use strict";$e();Vr();go();yo();at();jf=(e,t)=>{if(t.doRotary)throw new Error("GroupQuerryAttention do_rotary attribute is not supported");if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],n=e[1],o=e[2],i=e[3],a=e[4];if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,d=r.dims[0],c=r.dims[1],p=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],m=c,f=0,y=!n||n.dims.length===0,g=Math.floor(y?p/(t.numHeads+2*t.kvNumHeads):p/t.numHeads);y&&(p=g*t.numHeads);let _=i&&i.dims.length!==0,x=a&&a.dims.length!==0;if(_&&i.dims.length===4&&i.dims[0]===d&&i.dims[1]!==t.kvNumHeads&&i.dims[2]===t.kvNumHeads&&i.dims[3]===g)throw new Error("BSNH pastKey/pastValue is not supported");if(_&&x){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');f=i.dims[2]}else if(_||x)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let w=1;if(n&&n.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(r.dims[2]%n.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');m=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==g)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');m=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==g)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');m=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');w=3}let S=0,T=!1,I=t.kvNumHeads?g*t.kvNumHeads:p;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(m!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=o.dims[2]}else{if(m!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');I=o.dims[1]*o.dims[3],T=!0}}let C=e.length>4?e[5]:void 0;if(C&&C.dims.length!==1&&C.dims[0]!==d)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:d,sequenceLength:c,pastSequenceLength:f,kvSequenceLength:m,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:p,vHiddenSize:I,headSize:g,vHeadSize:Math.floor(I/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:S,scale:t.scale,broadcastResPosBias:!1,passPastInKv:T,qkvFormat:w}},Zf=ee({perm:[0,2,1,3]}),Pd=(e,t,r)=>{let n=t,o=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(n=t.reshape([r.batchSize,r.kvSequenceLength,o,r.headSize]),n=e.compute(ke(n,Zf.perm),{inputs:[n],outputs:[-1]})[0]),n},zd=(e,t)=>{let r=jf(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let n=e.inputs[0],o=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,i=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,a=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,u=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,d=e.inputs.length>4?e.inputs[5]:void 0,c=e.inputs.length>5?e.inputs[6]:void 0,p=r.kvNumHeads?r.kvNumHeads:r.numHeads,m=ee({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,p*r.headSize,p*r.headSize]}),[f,y,g]=!o&&!i?e.compute(bo([n],m),{inputs:[n],outputs:[-1,-1,-1]}):[n,o,i],_=Xt(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,f,void 0,0);Dt(e,_,Pd(e,y,r),Pd(e,g,r),void 0,void 0,a,u,void 0,r,d,c)}});var Dd,Qf,Yf,Bd,Md=V(()=>{"use strict";J();re();at();ae();Dd=(e,t,r,n,o,i,a,u)=>{let d=pe(i),c=d===1?"f32":`vec${d}f`,p=d===1?"vec2f":`mat2x${d}f`,m=o*a,f=64;m===1&&(f=256);let y=[o,a,i/d],g=[o,a,2],_=["rank","type","type"],x=[];x.push(...W(y,g));let $=w=>{let S=E("x",t.dataType,3,d),T=E("scale",r.dataType,r.dims),I=E("bias",n.dataType,n.dims),C=M("output",1,3,2),P=[S,T,I,C];return`
  var<workgroup> workgroup_shared : array<${p}, ${f}>;
  const workgroup_size = ${f}u;
  ${w.declareVariables(...P)}
  ${w.mainStart(f)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${c}(0);
    var squared_sum = ${c}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${c}(${S.get("batch","channel","h")});
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
      let sum_final = ${Ge("workgroup_shared[0][0]",d)} / f32(hight * ${d});
      let squared_sum_final = ${Ge("workgroup_shared[0][1]",d)} / f32(hight * ${d});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${d};${u};${f}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:g,dataType:1}],dispatchGroup:{x:m},programUniforms:x}),getShaderSource:$},{inputs:[t,r,n],outputs:[-1]})[0]},Qf=(e,t,r)=>{let n=t[0].dims,o=n,i=2,a=n[0],u=n[1],d=k.sizeFromDimension(n,i),c=pe(d),p=k.size(o)/c,m=Dd(e,t[0],t[1],t[2],a,d,u,r.epsilon),f=[a,u,d/c],y=[a,u],g=["type","none"],_=x=>{let $=E("x",t[0].dataType,f.length,c),w=E("scale_shift",1,y.length,2),S=M("output",t[0].dataType,f.length,c),T=[$,w,S];return`
  ${x.registerUniform("output_size","u32").declareVariables(...T)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${S.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${w.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${S.type.value}(scale_shift.x) + ${S.type.value}(scale_shift.y);
      ${S.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${c}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},...W(f,y,f)]}),getShaderSource:_},{inputs:[t[0],m]})},Yf=(e,t,r)=>{let n=t[0].dims,o=n,i=n[0],a=n[n.length-1],u=k.sizeFromDimension(n,1)/a,d=pe(a),c=k.size(o)/d,p=[{type:12,data:u},{type:12,data:Math.floor(a/d)}],m=["type","type"],f=!1,y=[0,n.length-1];for(let $=0;$<n.length-2;$++)f=f||n[$+1]!==1,y.push($+1);f=f&&n[n.length-1]!==1;let g=f?e.compute(ke(e.inputs[0],y),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:n.length},($,w)=>n[y[w]])),_=Dd(e,g,t[1],t[2],i,u,a,r.epsilon),x=$=>{let w=he(t[0].dataType),S=d===1?"vec2f":`mat${d}x2f`,T=P=>{let O=P===0?"x":"y",U=d===1?"f32":`vec${d}f`;switch(d){case 1:return`${w}(${U}(scale.${O}))`;case 2:return`vec2<${w}>(${U}(scale[0].${O}, scale[1].${O}))`;case 4:return`vec4<${w}>(${U}(scale[0].${O}, scale[1].${O}, scale[2].${O}, scale[3].${O}))`;default:throw new Error(`Not supported compoents ${d}`)}},I=E("input",t[0].dataType,t[0].dims,d),C=M("output",t[0].dataType,o,d);return`
  @group(0) @binding(0) var<storage, read> input : array<${I.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${S}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${C.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${$.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${T(0)}, ${T(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${d}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:p}),getShaderSource:x},{inputs:[t[0],_]})},Bd=(e,t)=>{t.format==="NHWC"?Yf(e,e.inputs,t):Qf(e,e.inputs,t)}});var Xf,Jf,Rd,Ud=V(()=>{"use strict";J();re();ae();Xf=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Jf=(e,t,r)=>{let n=t.simplified,o=e[0].dims,i=e[1],a=!n&&e[2],u=o,d=k.normalizeAxis(t.axis,o.length),c=k.sizeToDimension(o,d),p=k.sizeFromDimension(o,d),m=k.size(i.dims),f=a?k.size(a.dims):0;if(m!==p||a&&f!==p)throw new Error(`Size of X.shape()[axis:] == ${p}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${m} and bias size of ${f}`);let y=[];for(let I=0;I<o.length;++I)I<d?y.push(o[I]):y.push(1);let g=pe(p),_=["type","type"],x=[{type:12,data:c},{type:1,data:p},{type:12,data:Math.floor(p/g)},{type:1,data:t.epsilon}];a&&_.push("type");let $=r>1,w=r>2,S=I=>{let C=he(e[0].dataType),P=[E("x",e[0].dataType,e[0].dims,g),E("scale",i.dataType,i.dims,g)];a&&P.push(E("bias",a.dataType,a.dims,g)),P.push(M("output",e[0].dataType,u,g)),$&&P.push(M("mean_data_output",1,y)),w&&P.push(M("inv_std_output",1,y));let O=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${I.registerUniforms(O).declareVariables(...P)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${eo("f32",g)};
    var mean_square_vector = ${eo("f32",g)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Ct(C,g,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Ge("mean_vector",g)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Ge("mean_square_vector",g)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Ct(C,g,"x[j + offset]")};
      let f32scale = ${Ct(C,g,"scale[j]")};
      output[j + offset] = ${P[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${Ct(C,g,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${w?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},T=[{dims:u,dataType:e[0].dataType}];return $&&T.push({dims:y,dataType:1}),w&&T.push({dims:y,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${g};${r};${n}`,inputDependencies:_},getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(c/64)},programUniforms:x}),getShaderSource:S}},Rd=(e,t)=>{Xf(e.inputs),e.compute(Jf(e.inputs,t,e.outputCount))}});var eh,Nd,Vd=V(()=>{"use strict";re();qr();Kr();eh=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Nd=e=>{eh(e.inputs);let t=Xe.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&n<8)e.compute(Fr(e.inputs,{activation:""},t));else{let o=t[t.length-2],i=k.size(e.inputs[0].dims.slice(0,-2)),a=k.size(e.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&a===1){let u=e.inputs[0].reshape([1,i,n]),d=e.inputs[1].reshape([1,n,r]),c=[1,i,r],p=[u,d];e.compute(Yt(p,{activation:""},t,c),{inputs:p})}else e.compute(Yt(e.inputs,{activation:""},t))}}});var th,rh,nh,Wd,Ld,Gd=V(()=>{"use strict";J();re();$e();ae();th=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),i=t.blockSize/8*t.bits,a=e[1];if(!k.areEqual(a.dims,[t.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let d=e[2].dims;if(k.size(d)!==t.n*o)throw new Error("scales input size error.");if(e.length===4){let p=e[3].dims,m=t.bits>4?t.n*o:t.n*Math.floor((o+1)/2);if(k.size(p)!==m)throw new Error("zeroPoints input size error.")}},rh=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],i=t.k,a=t.n,u=r.slice(0,n-2),d=k.size(u),p=e[1].dims[2]/4,m=e[0].dataType,f=pe(t.k),y=pe(p),g=pe(a),_=u.concat([o,a]),x=o>1&&a/g%2===0?2:1,$=k.size(_)/g/x,w=64,S=[],T=[d,o,i/f],I=k.convertShape(e[1].dims).slice();I.splice(-1,1,p/y),S.push(...W(T)),S.push(...W(I)),S.push(...W(e[2].dims)),e.length===4&&S.push(...W(k.convertShape(e[3].dims)));let C=[d,o,a/g];S.push(...W(C));let P=O=>{let U=T.length,G=E("a",e[0].dataType,U,f),F=E("b",12,I.length,y),te=E("scales",e[2].dataType,e[2].dims.length),N=[G,F,te],Y=e.length===4?E("zero_points",12,e[3].dims.length):void 0;Y&&N.push(Y);let ye=C.length,q=M("output",e[0].dataType,ye,g),X=he(e[0].dataType),ie=(()=>{switch(f){case 1:return`array<${X}, 8>`;case 2:return`mat4x2<${X}>`;case 4:return`mat2x4<${X}>`;default:throw new Error(`${f}-component is not supported.`)}})(),Z=()=>{let we=`
          // reuse a data
            var input_offset = ${G.indicesToOffset(`${G.type.indices}(batch, row, word_offset)`)};
            var a_data: ${ie};
            for (var j: u32 = 0; j < ${8/f}; j++) {
              a_data[j] = ${G.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let z=0;z<g*x;z++)we+=`
            b_value = ${y===1?`b${z}_data`:`b${z}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${ie}(${Array.from({length:4},(B,K)=>`${X}(b_value_lower[${K}]), ${X}(b_value_upper[${K}])`).join(", ")});
            b_dequantized_values = ${f===1?`${ie}(${Array.from({length:8},(B,K)=>`(b_quantized_values[${K}] - ${Y?`zero_point${z}`:"zero_point"}) * scale${z}`).join(", ")});`:`(b_quantized_values - ${ie}(${Array(8).fill(`${Y?`zero_point${z}`:"zero_point"}`).join(",")})) * scale${z};`};
            workgroup_shared[local_id.x * ${x} + ${Math.floor(z/g)}]${g>1?`[${z%g}]`:""} += ${Array.from({length:8/f},(B,K)=>`${f===1?`a_data[${K}] * b_dequantized_values[${K}]`:`dot(a_data[${K}], b_dequantized_values[${K}])`}`).join(" + ")};
          `;return we},se=()=>{let we=`
            var col_index = col * ${g};
            ${Y?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${X}(8);`}
            `;for(let z=0;z<g*x;z++)we+=`
            let scale${z} = ${te.getByOffset("col_index * nBlocksPerCol + block")};
            ${Y?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${Y.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${z} = ${X}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return we},Te=()=>{let we=`col_index = col * ${g};`;for(let z=0;z<g*x;z++)we+=`
            let b${z}_data = ${F.getByIndices(`${F.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return we+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ie};
            var b_dequantized_values: ${ie};`,we};return`
        var<workgroup> workgroup_shared: array<${q.type.value}, ${x*w}>;
        ${O.declareVariables(...N,q)}
        ${O.mainStart([w,1,1])}
          let output_indices = ${q.offsetToIndices(`(global_idx / ${w}) * ${x}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${w}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/f};
            ${se()}
            for (var word: u32 = 0; word < ${p}; word += ${y}) {
              ${Te()}
              for (var i: u32 = 0; i < ${y}; i++) {
                ${Z()}
                word_offset += ${8/f};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${x}) {
            var output_value: ${q.type.value} = ${q.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${w}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${x};
            }
            ${q.setByIndices(`${q.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${f};${y};${g};${x};${w}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:m}],dispatchGroup:{x:$},programUniforms:S}),getShaderSource:P}},nh=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],i=t.k,a=t.n,u=r.slice(0,n-2),d=k.size(u),p=e[1].dims[2]/4,m=e[0].dataType,f=pe(t.k),y=pe(p),g=u.concat([o,a]),_=128,x=a%8===0?8:a%4===0?4:1,$=_/x,w=$*y*8,S=w/f,T=w/t.blockSize,I=k.size(g)/x,C=[],P=[d,o,i/f],O=k.convertShape(e[1].dims).slice();O.splice(-1,1,p/y),C.push(...W(P)),C.push(...W(O)),C.push(...W(e[2].dims)),e.length===4&&C.push(...W(k.convertShape(e[3].dims)));let U=[d,o,a];C.push(...W(U));let G=F=>{let te=P.length,N=E("a",e[0].dataType,te,f),Y=E("b",12,O.length,y),ye=E("scales",e[2].dataType,e[2].dims.length),q=[N,Y,ye],X=e.length===4?E("zero_points",12,e[3].dims.length):void 0;X&&q.push(X);let ie=U.length,Z=M("output",e[0].dataType,ie),se=he(e[0].dataType),Te=()=>{switch(f){case 1:return`
          let a_data0 = vec4<${se}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${se}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${se}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${se}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${f}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${N.type.value}, ${S}>;
        var<workgroup> inter_results: array<array<${Z.type.value}, ${$}>, ${x}>;
        ${F.declareVariables(...q,Z)}
        ${F.mainStart([$,x,1])}
          let output_indices = ${Z.offsetToIndices(`workgroup_index * ${x}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${T} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${S};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${S}; a_offset += ${_})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${N.getByIndices(`${N.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${N.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${T} + local_id.x;
            ${X?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${X.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${se}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${se}(8);`}
            let scale = ${ye.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${Y.getByIndices(`${Y.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/f};
            for (var i: u32 = 0; i < ${y}; i++) {
              ${Te()}
              let b_value = ${y===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${se}>(${Array.from({length:4},(we,z)=>`${se}(b_value_lower[${z}]), ${se}(b_value_upper[${z}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${se}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(we,z)=>`${`dot(a_data${z}, b_dequantized_values[${z}])`}`).join(" + ")};
              word_offset += ${8/f};
            }
            workgroupBarrier();
          }

          if (local_idx < ${x}) {
            var output_value: ${Z.type.value} = ${Z.type.value}(0);
            for (var b = 0u; b < ${$}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${Z.setByIndices(`${Z.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${f};${y};${$};${x}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:g,dataType:m}],dispatchGroup:{x:I},programUniforms:C}),getShaderSource:G}},Wd=(e,t)=>{th(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(nh(e.inputs,t)):e.compute(rh(e.inputs,t))},Ld=e=>ee(e)});var oh,ih,ah,sh,uh,dh,lh,ch,Hd,Fd=V(()=>{"use strict";J();re();ae();oh=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},ih=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
            k = i32(${e.indicesGet("indices",o)}) - ${H("uniforms.pads",o,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${H("uniforms.x_shape",o,t)})) {
              break;
            }
            offset += k * i32(${H("uniforms.x_strides",o,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${n}
            value = x[offset];
          }
      `},ah=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${H("uniforms.pads",o,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${H("uniforms.x_shape",o,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${H("uniforms.x_shape",o,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${H("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},sh=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${H("uniforms.pads",o,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${H("uniforms.x_shape",o,t)})) {
                  k = i32(${H("uniforms.x_shape",o,t)}) - 1;
                }
                offset += k * i32(${H("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},uh=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${H("uniforms.pads",o,r)};
                if (k < 0)  {
                  k += i32(${H("uniforms.x_shape",o,t)}]);
                }
                if (k >= i32(${H("uniforms.x_shape",o,t)})) {
                  k -= i32(${H("uniforms.x_shape",o,t)});
                }
                offset += k * i32(${H("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},dh=(e,t,r)=>{switch(r.mode){case 0:return ih(e,t,r.pads.length);case 1:return ah(e,t,r.pads.length);case 2:return sh(e,t,r.pads.length);case 3:return uh(e,t,r.pads.length);default:throw new Error("Invalid mode")}},lh=(e,t)=>{let r=k.padShape(e[0].dims.slice(),t.pads),n=e[0].dims,o=k.size(r),i=[{type:12,data:o},{type:6,data:t.pads}],a=e.length>=3&&e[2].data;t.mode===0&&i.push({type:a?e[2].dataType:1,data:t.value}),i.push(...W(e[0].dims,r));let u=["rank"],d=c=>{let p=M("output",e[0].dataType,r.length),m=E("x",e[0].dataType,n.length),f=m.type.value,y=dh(p,n.length,t),g=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&g.push({name:"constant_value",type:a?f:"f32"}),`
            ${c.registerUniforms(g).declareVariables(m,p)}
            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${p.offsetToIndices("global_idx")};

            var value = ${f}(0);
            ${y}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${a}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(r)/64)},programUniforms:i}),getShaderSource:d}},ch=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,o=e[0].dims.length,i=new Int32Array(2*o).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let d=0;d<u.length;d++)i[Number(u[d])]=Number(r[d]),i[Number(u[d])+o]=Number(r[d+u.length])}else r.forEach((u,d)=>i[Number(d)]=Number(u));let a=[];return i.forEach(u=>a.push(u)),{mode:t.mode,value:n,pads:a}}else return t},Hd=(e,t)=>{oh(e.inputs);let r=ch(e.inputs,t);e.compute(lh(e.inputs,r),{inputs:[0]})}});var Qr,qd,Kd,jd,Zd,ph,mh,Qd,Yd,Xd,Jd,el,tl,rl,nl,ol,il,al,sl,ul=V(()=>{"use strict";Ne();J();re();ae();Qr=e=>{if(ge.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},qd=(e,t,r)=>{let n=t.format==="NHWC",o=e.dims.slice();n&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(t,"dilations"),a=t.kernelShape.slice(),u=t.strides.slice(),d=i?t.dilations.slice():[],c=t.pads.slice();Tt.adjustPoolAttributes(r,o,a,u,d,c);let p=Tt.computePoolOutputShape(r,o,u,d,a,c,t.autoPad),m=Object.assign({},t);i?Object.assign(m,{kernelShape:a,strides:u,pads:c,dilations:d,cacheKey:t.cacheKey}):Object.assign(m,{kernelShape:a,strides:u,pads:c,cacheKey:t.cacheKey});let f=p.slice();return f.push(f.splice(1,1)[0]),[m,n?f:p]},Kd=(e,t)=>{let r=t.format==="NHWC",n=k.size(e),o=k.size(t.kernelShape),i=[{type:12,data:n},{type:12,data:o}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],d=t.strides[t.strides.length-1],c=t.pads[t.pads.length/2-1],p=t.pads[t.pads.length-1],m=!!(c+p);i.push({type:12,data:u},{type:12,data:d},{type:12,data:c},{type:12,data:p}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let f=!1;if(t.kernelShape.length===2){let y=t.kernelShape[t.kernelShape.length-2],g=t.strides[t.strides.length-2],_=t.pads[t.pads.length/2-2],x=t.pads[t.pads.length-2];f=!!(_+x),i.push({type:12,data:y},{type:12,data:g},{type:12,data:_},{type:12,data:x}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,m,f]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=k.computeStrides(t.kernelShape);i.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),a.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let d=t.pads.reduce((c,p)=>c+p);return[i,a,!!d,!1,!1]}},jd=(e,t,r,n,o,i,a,u,d,c,p,m)=>{let f=o.format==="NHWC",y=t.type.value,g=M("output",t.type.tensor,n);if(o.kernelShape.length<=2){let _="",x="",$="",w=r-(f?2:1);if(p?_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${w}] < 0 || xIndices[${w}]
                      >= uniforms.x_shape[${w}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`:_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let T=r-(f?3:2);m?x=`
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
            ${e.registerUniforms(d).declareVariables(t,g)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${g.offsetToIndices("global_idx")};
              var xIndices = ${g.offsetToIndices("global_idx")};

              var value = ${y}(${u});
              var pad = 0;
              ${x}
              ${_}
              ${$}
              ${a}

              output[global_idx] = value;
            }`}else{if(f)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let _=o.kernelShape.length,x=o.pads.length,$="";return c?$=`
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
            ${e.registerUniforms(d).declareVariables(t,g)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${g.offsetToIndices("global_idx")};
              var xIndices = ${g.offsetToIndices("global_idx")};

              var offsets: array<u32, ${_}>;

              var value = ${y}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${_-1}u; j++) {
                  offsets[j] = offset / ${H("uniforms.kernelStrides","j",_)};
                  offset -= offsets[j] * ${H("uniforms.kernelStrides","j",_)};
                }
                offsets[${_-1}] = offset;

                isPad = false;
                for (var j = ${r-_}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${H("uniforms.strides",`j - ${r-_}u`,_)}
                    + offsets[j - ${r-_}u] - ${H("uniforms.pads","j - 2u",x)};
                  ${$}
              }
              ${a}

              output[global_idx] = value;
            }`}},Zd=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,ph=e=>`${Zd(e)};${e.countIncludePad}`,mh=e=>`${Zd(e)};${e.storageOrder};${e.dilations}`,Qd=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Yd=(e,t,r,n)=>{let[o,i]=qd(t,n,r),a=E("x",t.dataType,t.dims.length),u=a.type.value,d="value += x_val;",c="";o.countIncludePad?c+=`value /= ${u}(uniforms.kernelSize);`:c+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[p,m,f,y,g]=Kd(i,o);p.push(...W(t.dims,i));let _=["rank"];return{name:e,shaderCache:{hint:`${n.cacheKey};${f};${y};${g}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:p}),getShaderSource:x=>jd(x,a,t.dims.length,i.length,o,d,c,0,m,f,y,g)}},Xd=e=>{let t=e.count_include_pad!==0,r=Qd(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:t,...r,cacheKey:""};return{...n,cacheKey:ph(n)}},Jd=(e,t)=>{Qr(e.inputs),e.compute(Yd("AveragePool",e.inputs[0],!1,t))},el={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},tl=e=>{let t=e.format;return{format:t,...el,cacheKey:t}},rl=(e,t)=>{Qr(e.inputs),e.compute(Yd("GlobalAveragePool",e.inputs[0],!0,t))},nl=(e,t,r,n)=>{let[o,i]=qd(t,n,r),a=`
      value = max(x_val, value);
    `,u="",d=E("x",t.dataType,t.dims.length),c=["rank"],[p,m,f,y,g]=Kd(i,o);return p.push(...W(t.dims,i)),{name:e,shaderCache:{hint:`${n.cacheKey};${f};${y};${g}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:p}),getShaderSource:_=>jd(_,d,t.dims.length,i.length,o,a,u,t.dataType===10?-65504:-1e5,m,f,y,g)}},ol=(e,t)=>{Qr(e.inputs),e.compute(nl("MaxPool",e.inputs[0],!1,t))},il=e=>{let t=e.storage_order,r=e.dilations,n=Qd(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:r,...n,cacheKey:""};return{...o,cacheKey:mh(o)}},al=e=>{let t=e.format;return{format:t,...el,cacheKey:t}},sl=(e,t)=>{Qr(e.inputs),e.compute(nl("GlobalMaxPool",e.inputs[0],!0,t))}});var hh,gh,dl,ll,cl=V(()=>{"use strict";J();re();$e();ae();hh=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,n)=>r===e[2].dims[n]).reduce((r,n)=>r&&n,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((o,i)=>i===t.axis||o===e[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],n=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/n)||t.blockSize>Math.ceil(r/(n-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},gh=(e,t)=>{let r=k.normalizeAxis(t.axis,e[0].dims.length),n=e[0].dataType,o=n===3,i=e[0].dims,a=e[1].dataType,u=k.size(i),d=n===3||n===2,c=d?[Math.ceil(k.size(e[0].dims)/4)]:e[0].dims,p=e[1].dims,m=e.length>2?e[2]:void 0,f=m?d?[Math.ceil(k.size(m.dims)/4)]:m.dims:void 0,y=p.length===0||p.length===1&&p[0]===1,g=y===!1&&p.length===1,_=pe(u),x=y&&(!d||_===4),$=x?_:1,w=x&&!d?_:1,S=E("input",d?12:n,c.length,w),T=E("scale",a,p.length),I=m?E("zero_point",d?12:n,f.length):void 0,C=M("output",a,i.length,$),P=[S,T];I&&P.push(I);let O=[c,p];m&&O.push(f);let U=[{type:12,data:u/$},{type:12,data:r},{type:12,data:t.blockSize},...W(...O,i)],G=F=>{let te=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${F.registerUniforms(te).declareVariables(...P,C)}
      ${F.mainStart()}
          ${F.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${C.offsetToIndices("global_idx")};

          // Set input x
          ${d?`
            let input = ${S.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${$===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${S.getByOffset("global_idx")};`};

          // Set scale input
          ${y?`let scale_value= ${T.getByOffset("0")}`:g?`
            let scale_index = ${C.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${T.getByOffset("scale_index")};`:`
            var scale_indices: ${T.type.indices} = output_indices;
            let index = ${T.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${T.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${T.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${I?y?d?`
                let zero_point_input = ${I.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${I.getByOffset("0")}`:g?d?`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${I.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${I.getByOffset("zero_point_index")};`:d?`
                let zero_point_offset = ${T.indicesToOffset("scale_indices")};
                let zero_point_input = ${I.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${I.getByIndices("scale_indices")};`:`let zero_point_value = ${d?o?"i32":"u32":S.type.value}(0);`};
      // Compute and write output
      ${C.setByOffset("global_idx",`${C.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:I?["rank","rank","rank"]:["rank","rank"]},getShaderSource:G,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(u/$/64),y:1,z:1},programUniforms:U})}},dl=(e,t)=>{hh(e.inputs,t),e.compute(gh(e.inputs,t))},ll=e=>ee({axis:e.axis,blockSize:e.blockSize})});var bh,yh,pl,ml=V(()=>{"use strict";Ne();J();ae();bh=(e,t,r)=>{let n=e===t,o=e<t&&r<0,i=e>t&&r>0;if(n||o||i)throw new Error("Range these inputs' contents are invalid.")},yh=(e,t,r,n)=>{let o=Math.abs(Math.ceil((t-e)/r)),i=[o],a=o,u=[{type:12,data:a},{type:n,data:e},{type:n,data:r},...W(i)],d=c=>{let p=M("output",n,i.length),m=p.type.value,f=[{name:"outputSize",type:"u32"},{name:"start",type:m},{name:"delta",type:m}];return`
        ${c.registerUniforms(f).declareVariables(p)}
        ${c.mainStart()}
        ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${m}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:d,getRunData:()=>({outputs:[{dims:i,dataType:n}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:u})}},pl=e=>{let t=0,r=0,n=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],n=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],n=e.inputs[2].getFloat32Array()[0]),ge.webgpu.validateInputContent&&bh(t,r,n),e.compute(yh(t,r,n,e.inputs[0].dataType),{inputs:[]})}});var _h,wh,fl,hl,gl=V(()=>{"use strict";J();re();$e();ae();_h=(e,t,r,n)=>{if(e!=="none"&&n!=="i32"&&n!=="u32"&&n!=="f32")throw new Error(`Input ${n} is not supported with reduction ${e}.`);let o=`{
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
                ${o}max(bitcast<f32>(oldValue), (${r}))${i}`;case"min":return n==="i32"||n==="u32"?`atomicMin(&${t}, bitcast<${n}>(${r}));`:`${o}min(bitcast<${n}>(oldValue), (${r}))${i}`;case"mul":return`${o}(bitcast<${n}>(oldValue) * (${r}))${i}`;default:throw new Error(`Reduction ${e} is not supported.`)}},wh=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r,i=1,a=Math.ceil(k.size(n)/i),u=n[n.length-1],d=k.sizeFromDimension(r,u),c=[{type:12,data:a},{type:12,data:u},{type:12,data:d},...W(e[1].dims,e[2].dims,o)],p=m=>{let f=E("indices",e[1].dataType,e[1].dims.length),y=E("updates",e[2].dataType,e[2].dims.length,i),g=t.reduction!=="none"&&t.reduction!==""?Ga("output",e[0].dataType,o.length):M("output",e[0].dataType,o.length,i);return`
      ${m.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(f,y,g)}
      ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${t.reduction==="none"}) {
    let n = ${k.size(n)};
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
    ${_h(t.reduction,"output[data_offset + i]","value",g.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}),getShaderSource:p}},fl=e=>ee({reduction:e.reduction}),hl=(e,t)=>{e.compute(wh(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}});var vh,$h,xh,bl,Sh,Th,Ih,Ch,Ah,kh,Eh,Ph,yl,zh,Oh,Dh,Bh,Mh,_l,wl,vl=V(()=>{"use strict";J();re();$e();ae();vh=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},$h=(e,t,r)=>{t.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let n=new Array(r).fill(1);return t.forEach((o,i)=>n[o]=e[i]),n},xh=(e,t,r,n,o,i)=>{let[a,u,d]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],c=e[0].dims.length;if(a>0&&e.length>a&&e[a].dims.length>0)e[a].getFloat32Array().forEach(p=>i.push(p));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(p=>n.push(p)),n.length!==0&&n.length!==c&&r>=18&&n.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");vh(n,t),t.axes.length>0&&$h(n,t.axes,c).forEach((p,m)=>n[m]=p)}if(d>0&&e.length>d&&e[d].dims.length===1&&e[d].dims[0]>0&&(e[d].getBigInt64Array().forEach(p=>o.push(Number(p))),o.length!==0&&o.length!==c&&r>=18&&o.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof n<"u"&&typeof o<"u"&&n.length>0&&o.length>c)throw new Error("Resize requires only of scales or sizes to be specified")},bl=(e,t,r,n)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${n}(big / (${r}));
  let fract = ${n}(big % (${r})) / ${n}(${r});
  return whole + fract;
`,Sh=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${bl("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${bl("xResized","lengthOriginal - 1","lengthResized - 1",t)}
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Th=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Ih=(e,t,r)=>{let n=new Array(r).fill(0).concat(new Array(r).fill(1)),o=e.length===0?n:e.slice();return t.length>0?(t.forEach((i,a)=>{n[i]=o[a],n[a+r]=o[t.length+a]}),n):o},Ch=(e,t,r,n)=>{let o=[];if(r.length>0)if(n.length>0){if(e.forEach(i=>o.push(i)),Math.max(...n)>e.length)throw new Error("axes is out of bound");n.forEach((i,a)=>o[i]=r[a])}else r.forEach(i=>o.push(i));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");o=e.map((i,a)=>Math.round(i*t[a]))}return o},Ah=(e,t,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>t[i]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>t[i]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return r.axes.length>0?(r.axes.forEach(i=>t[i]=n),r.axes.forEach(i=>o[i]=Math.round(e[i]*t[i]))):(t.fill(n,0,t.length),o.forEach((i,a)=>o[a]=Math.round(i*t[a]))),o},kh=(e,t,r,n,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${H("uniforms.scales","i",n)};
        var roi_low = ${H("uniforms.roi","i",o)};
        var roi_hi = ${H("uniforms.roi",`i + ${t.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${H("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${H("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Eh=(e,t,r,n,o,i,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${H("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${H("uniforms.roi","i",i)};
          var roi_hi = ${H("uniforms.roi",`i + ${r.length}`,i)};
          var input_shape_i = ${H("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${H("uniforms.output_shape","i",n.length)};
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
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,Ph=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${H("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,yl=(e,t,r,n)=>e.rank>n?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",zh=(e,t,r,n,o)=>{let[a,u,d,c]=r.length===2?[-1,0,1,-1]:[0,2,3,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",u,`max(0, min(row, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(col, ${r[d]} - 1))`)};
      ${yl(e,c,a,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
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
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${a}])`:"0"};
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
    }`},Oh=(e,t,r,n,o,i,a,u,d,c)=>{let p=r.length===2,m=!0,[f,y]=p?[0,1]:m?[2,3]:[1,2],g=e.type.value,_=x=>{let $=x===f?"row":"col";return`
      fn ${$}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${g} {
        var output_index = ${t.indicesGet("output_indices",x)};
        var originalIdx: ${g} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[x]},
        ${n[x]}, ${r[x]}, ${i[x]}, ${i[x]} + ${r.length});
        var fractOriginalIdx: ${g} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[x]} - 1))) {
          return ${d};
        }
        var data: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${$}: ${g} = originalIdx + ${g}(i);
          if (${$} < 0 || ${$} >= ${r[x]}) {
            ${c?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${d};`:`${$} = max(0, min(${$}, ${r[x]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",x,`u32(${$})`)};
          data[i + 1] = ${x===f?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${_(f)};
    ${_(y)};
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

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${g} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Dh=(e,t,r,n,o)=>{let[a,u,d,c,p]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],m=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${m} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",u,`max(0, min(depth, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(height, ${r[d]} - 1))`)};
      ${e.indicesSet("input_indices",c,`max(0, min(width, ${r[c]} - 1))`)};
      ${yl(e,p,a,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${m} {
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
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${a}])`:"0"};

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
    }`},Bh=(e,t,r,n,o,i)=>{let a=e.dims,u=Ih(i,t.axes,a.length),d=Ch(a,n,o,t.axes),c=n.slice();n.length===0&&(c=a.map((w,S)=>w===0?1:d[S]/w),t.keepAspectRatioPolicy!=="stretch"&&(d=Ah(a,c,t)));let p=M("output",e.dataType,d.length),m=E("input",e.dataType,a.length),f=k.size(d),y=a.length===d.length&&a.every((w,S)=>w===d[S]),g=t.coordinateTransformMode==="tf_crop_and_resize",_=t.extrapolationValue,x=m.type.value,$=w=>`
      ${y?"":`
      ${Sh(t.coordinateTransformMode,x)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Ph(m,a)};
              ${Th(t.nearestMode,r,x)};
              ${Eh(m,p,a,d,c.length,u.length,g)};
              `;case"linear":return`
              ${kh(p,a,d,c.length,u.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${zh(m,p,a,g,_)}`;if(a.length===3||a.length===5)return`${Dh(m,p,a,g,_)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${Oh(m,p,a,d,c,u,t.cubicCoeffA,g,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${w.registerUniform("output_size","u32").registerUniform("scales","f32",c.length).registerUniform("roi","f32",u.length).declareVariables(m,p)}
      ${w.mainStart()}
        ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${y?"output[global_idx] = input[global_idx];":`
        let output_indices = ${p.offsetToIndices("global_idx")};
        var input_indices: ${m.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${m.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${c.length>0?t.mode==="cubic"?c:c.length:""}|${o.length>0?o:""}|${u.length>0?u:""}|${y}|${t.mode==="nearest"?a.length:a}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:d,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},{type:1,data:c},{type:1,data:u},...W(a,d)]})}},Mh=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},_l=(e,t)=>{let r=[],n=[],o=[],i=Mh(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");xh(e.inputs,t,i,r,n,o),e.compute(Bh(e.inputs[0],t,i,r,n,o),{inputs:[0]})},wl=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,o=e.cubicCoeffA,i=e.excludeOutside!==0,a=e.extrapolationValue,u=e.keepAspectRatioPolicy,d=e.mode,c=e.nearestMode===""?"simple":e.nearestMode;return ee({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:o,excludeOutside:i,extrapolationValue:a,keepAspectRatioPolicy:u,mode:d,nearestMode:c})}});var Rh,Uh,$l,xl=V(()=>{"use strict";J();re();$e();ae();Rh=(e,t)=>{let[r,n,o,i]=e,{numHeads:a,rotaryEmbeddingDim:u}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!k.areEqual(n.dims,[])&&!k.areEqual(n.dims,[1])&&n.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!k.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let d=r.dims[0],c=r.dims[r.dims.length-2],p=o.dims[0],m=k.sizeFromDimension(r.dims,1)/c,f=u===0?o.dims[1]*2:m/a;if(u>f)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(n.dims.length===2){if(d!==n.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(c!==n.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(f/2!==o.dims[1]&&u/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(c>p)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Uh=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:o,scale:i}=t,a=e[0].dims[0],u=k.sizeFromDimension(e[0].dims,1),d=e[0].dims[e[0].dims.length-2],c=u/d,p=e[2].dims[1],m=o===0?p*2:c/n,f=new Array(a,d,c/m,m-p),y=k.computeStrides(f),g=[{type:1,data:i},{type:12,data:f},{type:12,data:y},...e[0].dims.length===3?new Array({type:12,data:[u,c,m,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,m,d*m,1]}):[],...W(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],_=x=>{let $=E("input",e[0].dataType,e[0].dims.length),w=E("position_ids",e[1].dataType,e[1].dims.length),S=E("cos_cache",e[2].dataType,e[2].dims.length),T=E("sin_cache",e[3].dataType,e[3].dims.length),I=M("output",e[0].dataType,e[0].dims.length);return x.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:f.length},{name:"global_strides",type:"u32",length:y.length},{name:"input_output_strides",type:"u32",length:y.length}]),`
        ${x.declareVariables($,w,S,T,I)}

        ${x.mainStart(It)}
          let half_rotary_emb_dim = uniforms.${S.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${w.broadcastedIndicesToOffset("bsnh.xy",M("",w.type.tensor,2))};
            let position_id =
                u32(${w.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${$.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} -
                ${$.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${I.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${I.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${I.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:ee({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(f)/It)},programUniforms:g})}},$l=(e,t)=>{Rh(e.inputs,t),e.compute(Uh(e.inputs,t))}});var Nh,Vh,Sl,Tl=V(()=>{"use strict";J();re();ae();Nh=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],i=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(n.dims.length!==1)throw new Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let a=e[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let a=e[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},Vh=(e,t,r,n)=>{let o=t.simplified,i=e[0].dims,a=k.size(i),u=i,d=a,c=i.slice(-1)[0],p=n?i.slice(0,-1).concat(1):[],m=!o&&e.length>3,f=e.length>4,y=n&&r>1,g=n&&r>2,_=r>3,x=64,$=pe(c),w=[{type:12,data:d},{type:12,data:$},{type:12,data:c},{type:1,data:t.epsilon}],S=I=>{let C=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],P=[E("x",e[0].dataType,e[0].dims,$),E("skip",e[1].dataType,e[1].dims,$),E("gamma",e[2].dataType,e[2].dims,$)];m&&P.push(E("beta",e[3].dataType,e[3].dims,$)),f&&P.push(E("bias",e[4].dataType,e[4].dims,$)),P.push(M("output",e[0].dataType,u,$)),y&&P.push(M("mean_output",1,p)),g&&P.push(M("inv_std_output",1,p)),_&&P.push(M("input_skip_bias_sum",e[0].dataType,u,$));let O=he(e[0].dataType),U=he(1,$);return`

      ${I.registerUniforms(C).declareVariables(...P)}
      var<workgroup> sum_shared : array<${U}, ${x}>;
      var<workgroup> sum_squared_shared : array<${U}, ${x}>;

      ${I.mainStart([x,1,1])}
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
          let bias_value = ${f?"bias[offset1d + i]":O+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${_?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Ct(O,$,"value")};
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
        let mean = ${Ge("sum",$)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Ge("square_sum",$)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${y?"mean_output[global_idx] = mean;":""}
        ${g?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${O}(mean)`}) *
            ${O}(inv_std_dev) * gamma[offset1d + i]
            ${m?"+ beta[offset1d + i]":""};
        }
      }`},T=[{dims:u,dataType:e[0].dataType}];return r>1&&T.push({dims:p,dataType:1}),r>2&&T.push({dims:p,dataType:1}),r>3&&T.push({dims:i,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${y};${g};${_}`,inputDependencies:e.map((I,C)=>"type")},getShaderSource:S,getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(d/c)},programUniforms:w})}},Sl=(e,t)=>{Nh(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(Vh(e.inputs,t,e.outputCount,!1),{outputs:n})}});var Wh,Yr,Lh,Il,Gh,Hh,Cl,Al,kl=V(()=>{"use strict";J();re();$e();ae();Wh=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw new Error(`Input ${n} must be an array of int32 or int64`)})},Yr=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(n=>r.push(Number(n)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(n=>r.push(Number(n)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},Lh=(e,t)=>{if(e.length>1){let r=Yr(e,1),n=Yr(e,2),o=Yr(e,3);return o.length===0&&(o=[...Array(e[0].dims.length).keys()]),ee({starts:r,ends:n,axes:o})}else return t},Il=(e,t,r,n,o)=>{let i=e;return e<0&&(i+=r[n[t]]),o[t]<0?Math.max(0,Math.min(i,r[n[t]]-1)):Math.max(0,Math.min(i,r[n[t]]))},Gh=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${H("uniforms.input_shape","i",r.length)};
            let steps_i = ${H("uniforms.steps","i",r.length)};
            let signs_i = ${H("uniforms.signs","i",r.length)};
            let starts_i = ${H("uniforms.starts","i",r.length)};
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
      }`,Hh=(e,t)=>{let r=e[0].dims,n=k.size(r),o=t.axes.length>0?k.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],i=Yr(e,4);i.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let a=t.starts.map(($,w)=>Il($,w,r,o,i)),u=t.ends.map(($,w)=>Il($,w,r,o,i));if(o.length!==a.length||o.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let $=0;$<r.length;++$)o.includes($)||(a.splice($,0,0),u.splice($,0,r[$]),i.splice($,0,1));let d=i.map($=>Math.sign($));i.forEach(($,w,S)=>{if($<0){let T=(u[w]-a[w])/$,I=a[w],C=I+T*i[w];a[w]=C,u[w]=I,S[w]=-$}});let c=r.slice(0);o.forEach(($,w)=>{c[$]=Math.ceil((u[$]-a[$])/i[$])});let p={dims:c,dataType:e[0].dataType},m=M("output",e[0].dataType,c.length),f=E("input",e[0].dataType,e[0].dims.length),y=k.size(c),g=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:d.length},{name:"steps",type:"u32",length:i.length}],_=[{type:12,data:y},{type:12,data:a},{type:6,data:d},{type:12,data:i},...W(e[0].dims,c)],x=$=>`
      ${$.registerUniforms(g).declareVariables(f,m)}
        ${Gh(f,m,r)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${m.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${m.setByOffset("global_idx",f.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${d.length}_${a.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[p],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:_})}},Cl=(e,t)=>{Wh(e.inputs,t);let r=Lh(e.inputs,t);e.compute(Hh(e.inputs,r),{inputs:[0]})},Al=e=>{let t=e.starts,r=e.ends,n=e.axes;return ee({starts:t,ends:r,axes:n})}});var Fh,qh,El,Pl,zl=V(()=>{"use strict";J();re();$e();at();ae();Fh=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},qh=(e,t)=>{let r=e.inputs[0],n=r.dims,o=k.size(n),i=n.length,a=k.normalizeAxis(t.axis,i),u=a<n.length-1,d,c=[];u?(c=Array.from({length:i},(P,O)=>O),c[a]=i-1,c[i-1]=a,d=e.compute(ke(r,c),{inputs:[r],outputs:[-1]})[0]):d=r;let p=d.dims,m=p[i-1],f=o/m,y=pe(m),g=m/y,_=64;f===1&&(_=256);let x=(P,O)=>O===4?`max(max(${P}.x, ${P}.y), max(${P}.z, ${P}.w))`:O===2?`max(${P}.x, ${P}.y)`:O===3?`max(max(${P}.x, ${P}.y), ${P}.z)`:P,$=E("x",d.dataType,d.dims,y),w=M("result",d.dataType,d.dims,y),S=$.type.value,T=he(d.dataType)==="f32"?`var threadMax = ${S}(-3.402823e+38f);`:`var threadMax = ${S}(-65504.0h);`,I=P=>`
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
      ${P.registerUniform("packedCols","i32").declareVariables($,w)}
      ${P.mainStart(_)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${_};
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
          rowMaxShared = ${S}(${x("threadShared[0]",y)});
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
          rowSumShared = ${S}(${Ge("threadShared[0]",y)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,C=e.compute({name:"Softmax",shaderCache:{hint:`${y};${_}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:p,dataType:d.dataType}],dispatchGroup:{x:f},programUniforms:[{type:6,data:g}]}),getShaderSource:I},{inputs:[d],outputs:[u?-1:0]})[0];u&&e.compute(ke(C,c),{inputs:[C]})},El=(e,t)=>{Fh(e.inputs),qh(e,t)},Pl=e=>ee({axis:e.axis})});var Ol,Kh,jh,Zh,Dl,Bl=V(()=>{"use strict";J();re();ae();Ol=e=>Array.from(e.getBigInt64Array(),Number),Kh=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Ol(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},jh=(e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r},Zh=(e,t)=>{let r=e[0].dims,n=t??Ol(e[1]),o=jh(r,n),i=k.size(o),a=e[0].dataType,u=E("input",a,r.length),d=M("output",a,o.length),c=p=>`
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
    }`;return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...W(e[0].dims,o)]}),getShaderSource:c}},Dl=e=>{Kh(e.inputs),e.compute(Zh(e.inputs),{inputs:[0]})}});var Qh,Yh,Ml,Rl=V(()=>{"use strict";J();re();ae();Qh=(e,t,r,n,o)=>{let i=M("output_data",o,r.length,4),a=E("a_data",t[1].dataType,t[1].dims.length,4),u=E("b_data",t[2].dataType,t[2].dims.length,4),d=E("c_data",t[0].dataType,t[0].dims.length,4),c,p=(m,f,y)=>`select(${f}, ${m}, ${y})`;if(!n)c=i.setByOffset("global_idx",p(a.getByOffset("global_idx"),u.getByOffset("global_idx"),d.getByOffset("global_idx")));else{let m=(f,y,g="")=>{let _=`a_data[index_a${y}][component_a${y}]`,x=`b_data[index_b${y}][component_b${y}]`,$=`bool(c_data[index_c${y}] & (0xffu << (component_c${y} * 8)))`;return`
            let output_indices${y} = ${i.offsetToIndices(`global_idx * 4u + ${y}u`)};
            let offset_a${y} = ${a.broadcastedIndicesToOffset(`output_indices${y}`,i)};
            let offset_b${y} = ${u.broadcastedIndicesToOffset(`output_indices${y}`,i)};
            let offset_c${y} = ${d.broadcastedIndicesToOffset(`output_indices${y}`,i)};
            let index_a${y} = offset_a${y} / 4u;
            let index_b${y} = offset_b${y} / 4u;
            let index_c${y} = offset_c${y} / 4u;
            let component_a${y} = offset_a${y} % 4u;
            let component_b${y} = offset_b${y} % 4u;
            let component_c${y} = offset_c${y} % 4u;
            ${f}[${y}] = ${g}(${p(_,x,$)});
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
        ${e.registerUniform("vec_size","u32").declareVariables(d,a,u,i)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${c}
      }`},Yh=e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,o=e[1].dataType,i=!(k.areEqual(t,r)&&k.areEqual(r,n)),a=t,u=k.size(t);if(i){let c=Xe.calcShape(Xe.calcShape(t,r,!1),n,!1);if(!c)throw new Error("Can't perform where op on the given tensors");a=c,u=k.size(a)}let d=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:c=>Qh(c,e,a,i,o),getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:d},...W(n,t,r,a)]})}},Ml=e=>{e.compute(Yh(e.inputs))}});var Ul,Nl=V(()=>{"use strict";ys();Vr();vs();xs();uu();_u();$u();Uu();Fu();ju();Yu();rd();id();sd();ld();md();gd();_d();$d();Td();Od();Md();Ud();Vd();Gd();go();Fd();ul();cl();ml();gl();Ur();vl();xl();Tl();kl();zl();yo();Bl();at();Lr();Rl();Ul=new Map([["Abs",[Ss]],["Acos",[Ts]],["Acosh",[Is]],["Add",[du]],["ArgMax",[bs,ro]],["ArgMin",[gs,ro]],["Asin",[Cs]],["Asinh",[As]],["Atan",[ks]],["Atanh",[Es]],["Attention",[_s]],["AveragePool",[Jd,Xd]],["BatchNormalization",[ws]],["BiasAdd",[$s]],["BiasSplitGelu",[su]],["Cast",[zs,Ps]],["Ceil",[Ds]],["Clip",[Os]],["Concat",[wu,vu]],["Conv",[po,co]],["ConvTranspose",[Hu,Lu]],["Cos",[Bs]],["Cosh",[Ms]],["CumSum",[qu,Ku]],["DepthToSpace",[Zu,Qu]],["DequantizeLinear",[dl,ll]],["Div",[lu]],["Einsum",[ed,td]],["Elu",[Rs,Zt]],["Equal",[cu]],["Erf",[Us]],["Exp",[Ns]],["Expand",[od]],["FastGelu",[ad]],["Floor",[Vs]],["FusedConv",[po,co]],["Gather",[dd,ud]],["GatherElements",[yd,bd]],["GatherBlockQuantized",[fd,hd]],["GatherND",[cd,pd]],["Gelu",[Ws]],["Gemm",[vd,wd]],["GlobalAveragePool",[rl,tl]],["GlobalMaxPool",[sl,al]],["Greater",[hu]],["GreaterOrEqual",[bu]],["GridSample",[xd,Sd]],["GroupQueryAttention",[zd]],["HardSigmoid",[Zs,js]],["InstanceNormalization",[Bd]],["LayerNormalization",[Rd]],["LeakyRelu",[Ls,Zt]],["Less",[gu]],["LessOrEqual",[yu]],["Log",[ou]],["MatMul",[Nd]],["MatMulNBits",[Wd,Ld]],["MaxPool",[ol,il]],["Mul",[pu]],["MultiHeadAttention",[Ad,Cd]],["Neg",[Hs]],["Not",[Gs]],["Pad",[Hd]],["Pow",[mu]],["QuickGelu",[iu,Zt]],["Range",[pl]],["Reciprocal",[Fs]],["ReduceMin",[ls]],["ReduceMean",[is]],["ReduceMax",[ds]],["ReduceSum",[ps]],["ReduceProd",[cs]],["ReduceL1",[as]],["ReduceL2",[ss]],["ReduceLogSum",[fs]],["ReduceLogSumExp",[us]],["ReduceSumSquare",[ms]],["Relu",[qs]],["Resize",[_l,wl]],["RotaryEmbedding",[$l]],["ScatterND",[hl,fl]],["Sigmoid",[Ks]],["Sin",[Qs]],["Sinh",[Ys]],["Slice",[Cl,Al]],["SkipLayerNormalization",[Sl]],["Split",[kd,Ed]],["Sqrt",[Xs]],["Softmax",[El,Pl]],["Sub",[fu]],["Tan",[Js]],["Tanh",[tu]],["ThresholdedRelu",[nu,Zt]],["Tile",[Dl]],["Transpose",[qa,Ka]],["Where",[Ml]]])});var Xr,Vl=V(()=>{"use strict";Ne();Ye();ae();Xr=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,r){this.repo.set(t,r)}run(t,r,n,o,i){Me(t.programInfo.name);let a=this.backend.device,u=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let d=[];for(let p of r)d.push({binding:d.length,resource:{buffer:p.buffer}});for(let p of n)d.push({binding:d.length,resource:{buffer:p.buffer}});i&&d.push({binding:d.length,resource:i});let c=a.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:d,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let p={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:c,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(p)}u.setPipeline(t.computePipeline),u.setBindGroup(0,c),u.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),ze(t.programInfo.name)}dispose(){}build(t,r){Me(t.name);let n=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"},{feature:"subgroups-f16",extension:"subgroups_f16"}].forEach(m=>{n.features.has(m.feature)&&o.push(`enable ${m.extension};`)});let a=Ha(r,this.backend.device.limits),u=t.getShaderSource(a),d=`${o.join(`
`)}
${a.additionalImplementations}
${u}`,c=n.createShaderModule({code:d,label:t.name});ue("verbose",()=>`[WebGPU] ${t.name} shader code: ${d}`);let p=n.createComputePipeline({compute:{module:c,entryPoint:"main"},layout:"auto",label:t.name});return ze(t.name),{programInfo:t,computePipeline:p,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(t){let r=typeof t=="number"?t:t.x,n=typeof t=="number"?1:t.y||1,o=typeof t=="number"?1:t.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=i&&n<=i&&o<=i)return[r,n,o];let a=r*n*o,u=Math.ceil(Math.sqrt(a));if(u>i){if(u=Math.ceil(Math.cbrt(a)),u>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[u,u,u]}else return[u,u,1]}}});var Xh,Jh,_o,wo,Jr,Wl=V(()=>{"use strict";Ne();J();Ye();Fn();Va();Nl();Vl();Xh=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let o=e[n].dataType;switch(t[n]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let i=e[n].dims.length;r.push(`${o};${i}`);break}case"dims":{let i=e[n].dims.join(",");r.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")},Jh=(e,t,r)=>{let n=e.name;return e.shaderCache?.hint&&(n+="["+e.shaderCache.hint+"]"),n+=":"+r+`:${Xh(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,n},_o=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},wo=class{constructor(t){this.subgroupsSupported=t.features.has("subgroups"),this.subgroupsF16Supported=t.features.has("subgroups");let r=t.limits;!this.subgroupsSupported||!r.minSubgroupSize||!r.maxSubgroupSize?this.subgroupSizeRange=void 0:this.subgroupSizeRange=[r.minSubgroupSize,r.maxSubgroupSize]}},Jr=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,r){this.env=t;let n=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},i=a=>r.features.has(a)&&n.push(a)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups")&&i("subgroups-f16"),this.device=await r.requestDevice(o),this.deviceInfo=new wo(this.device),this.adapterInfo=new _o(r.info||await r.requestAdapterInfo()),this.gpuDataManager=Na(this),this.programManager=new Xr(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,zr(t.logLevel,!!t.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Me(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(t.getMappedRange()),n=this.pendingQueries.get(t);for(let o=0;o<r.length/2;o++){let i=n[o],a=i.kernelId,u=this.kernels.get(a),d=u.kernelType,c=u.kernelName,p=i.programName,m=i.inputTensorViews,f=i.outputTensorViews,y=r[o*2],g=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=y);let _=Number(y-this.queryTimeBase),x=Number(g-this.queryTimeBase);if(!Number.isSafeInteger(_)||!Number.isSafeInteger(x))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:m.map($=>({dims:$.dims,dataType:ht($.dataType)})),outputsMetadata:f.map($=>({dims:$.dims,dataType:ht($.dataType)})),kernelId:a,kernelType:d,kernelName:c,programName:p,startTime:_,endTime:x});else{let $="";m.forEach((S,T)=>{$+=`input[${T}]: [${S.dims}] | ${ht(S.dataType)}, `});let w="";f.forEach((S,T)=>{w+=`output[${T}]: [${S.dims}] | ${ht(S.dataType)}, `}),console.log(`[profiling] kernel "${a}|${d}|${c}|${p}" ${$}${w}execution time: ${x-_} ns`)}hr("GPU",`${p}::${y}::${g}`)}t.unmap(),this.pendingQueries.delete(t)}),ze()}run(t,r,n,o,i,a){Me(t.name);let u=[];for(let S=0;S<r.length;++S){let T=r[S].data;if(T===0)continue;let I=this.gpuDataManager.get(T);if(!I)throw new Error(`no GPU data for input: ${T}`);u.push(I)}let{outputs:d,dispatchGroup:c,programUniforms:p}=t.getRunData(r),m=n.length===0?d.map((S,T)=>T):n;if(m.length!==d.length)throw new Error(`Output size ${m.length} must be equal to ${d.length}.`);let f=[],y=[];for(let S=0;S<d.length;++S){if(!Number.isInteger(m[S])||m[S]<-3||m[S]>=a)throw new Error(`Invalid output index: ${m[S]}`);if(m[S]===-3)continue;let T=m[S]===-1,I=m[S]===-2,C=T||I?i(d[S].dataType,d[S].dims):o(m[S],d[S].dataType,d[S].dims);if(f.push(C),C.data===0)continue;let P=this.gpuDataManager.get(C.data);if(!P)throw new Error(`no GPU data for output: ${C.data}`);if(T&&this.temporaryData.push(P),I){let O=this.kernelPersistentData.get(this.currentKernelId);O||(O=[],this.kernelPersistentData.set(this.currentKernelId,O)),O.push(P)}y.push(P)}if(u.length!==r.length||y.length!==f.length){if(y.length===0)return ze(t.name),f;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let g;if(p){let S=0,T=[];p.forEach(O=>{let U=typeof O.data=="number"?[O.data]:O.data;if(U.length===0)return;let G=O.type===10?2:4,F,te;O.type===10?(te=U.length>4?16:U.length>2?8:U.length*G,F=U.length>4?16:G*U.length):(te=U.length<=2?U.length*G:16,F=16),S=Math.ceil(S/te)*te,T.push(S);let N=O.type===10?8:4;S+=U.length>4?Math.ceil(U.length/N)*F:U.length*G});let I=16;S=Math.ceil(S/I)*I;let C=new ArrayBuffer(S);p.forEach((O,U)=>{let G=T[U],F=typeof O.data=="number"?[O.data]:O.data;if(O.type===6)new Int32Array(C,G,F.length).set(F);else if(O.type===12)new Uint32Array(C,G,F.length).set(F);else if(O.type===10)new Uint16Array(C,G,F.length).set(F);else if(O.type===1)new Float32Array(C,G,F.length).set(F);else throw new Error(`Unsupported uniform type: ${ht(O.type)}`)});let P=this.gpuDataManager.create(S,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(P.buffer,0,C,0,S),this.gpuDataManager.release(P.id),g={offset:0,size:S,buffer:P.buffer}}let _=this.programManager.normalizeDispatchGroupSize(c),x=_[1]===1&&_[2]===1,$=Jh(t,r,x),w=this.programManager.getArtifact($);if(w||(w=this.programManager.build(t,_),this.programManager.setArtifact($,w),ue("info",()=>`[artifact] key: ${$}, programName: ${t.name}`)),p&&w.uniformVariablesInfo){if(p.length!==w.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${w.uniformVariablesInfo.length}, got ${p.length} in program "${w.programInfo.name}".`);for(let S=0;S<p.length;S++){let T=p[S],I=T.type,C=typeof T.data=="number"?1:T.data.length,[P,O]=w.uniformVariablesInfo[S];if(I!==P||C!==O)throw new Error(`Uniform variable ${S} mismatch: expect type ${P} with size ${O}, got type ${I} with size ${C} in program "${w.programInfo.name}".`)}}if(ue("info",()=>`[ProgramManager] run "${t.name}" (key=${$}) with ${_[0]}x${_[1]}x${_[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let S={kernelId:this.currentKernelId,programName:w.programInfo.name,inputTensorViews:r,outputTensorViews:f};this.pendingKernels.push(S),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(S)}return this.programManager.run(w,u,y,_,g),ze(t.name),f}upload(t,r){this.gpuDataManager.upload(t,r)}memcpy(t,r){this.gpuDataManager.memcpy(t,r)}async download(t,r){await this.gpuDataManager.download(t,r)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,r,n,o){let i=Ul.get(t);if(!i)throw new Error(`kernel not implemented: ${t}`);let a={kernelType:t,kernelName:o,kernelEntry:i[0],attributes:[i[1],n]};this.kernels.set(r,a)}releaseKernel(t){let r=this.kernelPersistentData.get(t);if(r){for(let n of r)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,r,n){let o=this.kernels.get(t);if(!o)throw new Error(`kernel not created: ${t}`);let i=o.kernelType,a=o.kernelName,u=o.kernelEntry,d=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=t,d[0]&&(d[1]=d[0](d[1]),d[0]=void 0),ue("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let c=this.env.debug;this.temporaryData=[];try{return c&&this.device.pushErrorScope("validation"),u(r,d[1]),0}catch(p){return n.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${p}`)),1}finally{c&&n.push(this.device.popErrorScope().then(p=>p?`GPU validation error for kernel "[${i}] ${a}": ${p.message}`:null));for(let p of this.temporaryData)this.gpuDataManager.release(p.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,r,n,o){let i=this.sessionExternalDataMapping.get(t);i||(i=new Map,this.sessionExternalDataMapping.set(t,i));let a=i.get(r),u=this.gpuDataManager.registerExternalBuffer(n,o,a);return i.set(r,[u,n]),u}unregisterBuffers(t){let r=this.sessionExternalDataMapping.get(t);r&&(r.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[0])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let r=this.gpuDataManager.get(t);if(!r)throw new Error(`no GPU data for buffer: ${t}`);return r.buffer}createDownloader(t,r,n){return async()=>{let o=await Zn(this,t,r);return Or(o.buffer,n)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ue("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ue("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ue("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),n=t.length;this.pendingKernels=[];for(let o=0;o<n;o++){let i=this.getComputePassEncoder(),a=t[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});var eg,Ll,tg,Gl,en,tn,vo,Hl,Fl=V(()=>{"use strict";Ye();eg=1,Ll=()=>eg++,tg=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Gl=(e,t)=>{let r=tg.get(e);if(!r)throw new Error("Unsupported data type.");return t.length>0?Math.ceil(t.reduce((n,o)=>n*o)*r/8):0},en=class{constructor(t){this.sessionId=t.sessionId,this.mlContext=t.context,this.mlTensor=t.tensor,this.dataType=t.dataType,this.tensorShape=t.shape}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return Gl(this.dataType,this.tensorShape)}destroy(){ue("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(t){this.mlContext.writeTensor(this.mlTensor,t)}async read(t){return t?this.mlContext.readTensor(this.mlTensor,t):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(t,r,n){return this.mlContext===t&&this.dataType===r&&this.tensorShape.length===n.length&&this.tensorShape.every((o,i)=>o===n[i])}},tn=class{constructor(t,r){this.tensorManager=t;this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(t,r,n,o){let i=this.tensorManager.getMLContext(t);if(this.wrapper){if(this.wrapper.canReuseTensor(i,r,n))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==Gl(r,n))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let a=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(t,r,n,a,!0,!0),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(t){if(this.wrapper)if(t.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else ue("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(t){if(this.activeUpload)if(t){t instanceof ArrayBuffer?new Uint8Array(t).set(this.activeUpload):new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(this.activeUpload);return}else return this.activeUpload.buffer;if(!this.wrapper)throw new Error("Tensor has not been created.");return t?this.wrapper.read(t):this.wrapper.read()}},vo=class{constructor(t){this.backend=t;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}getMLContext(t){let r=this.backend.getMLContext(t);if(!r)throw new Error("MLContext not found for session.");return r}reserveTensorId(){let t=Ll();return this.tensorTrackersById.set(t,new tn(this)),t}releaseTensorId(t){let r=this.tensorTrackersById.get(t);r&&(this.tensorTrackersById.delete(t),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(t,r,n,o,i){ue("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${r}, dataType: ${n}, shape: ${o}, copyOld: ${i}}`);let a=this.tensorTrackersById.get(r);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(t,n,o,i)}upload(t,r){let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");n.upload(r)}async download(t,r){ue("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${t}, dstBuffer: ${r?.byteLength}}`);let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");return n.download(r)}releaseTensorsForSession(t){for(let r of this.freeTensors)r.sessionId===t&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==t)}registerTensor(t,r,n,o){let i=this.getMLContext(t),a=Ll(),u=new en({sessionId:t,context:i,tensor:r,dataType:n,shape:o});return this.tensorTrackersById.set(a,new tn(this,u)),this.externalTensors.add(u),a}async getCachedTensor(t,r,n,o,i,a){let u=this.getMLContext(t);for(let[c,p]of this.freeTensors.entries())if(p.canReuseTensor(u,r,n)){ue("verbose",()=>`[WebNN] Reusing tensor {dataType: ${r}, shape: ${n}}`);let m=this.freeTensors.splice(c,1)[0];return m.sessionId=t,m}ue("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${r}, shape: ${n}}`);let d=await u.createTensor({dataType:r,shape:n,dimensions:n,usage:o,writable:i,readable:a});return new en({sessionId:t,context:u,tensor:d,dataType:r,shape:n})}releaseTensor(t){this.externalTensors.has(t)&&this.externalTensors.delete(t),this.freeTensors.push(t)}},Hl=(...e)=>new vo(...e)});var $o,rg,rn,ql=V(()=>{"use strict";J();ft();Fn();Fl();Ye();$o=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),rg=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),n=Object.keys(t).sort();return r.length===n.length&&r.every((o,i)=>o===n[i]&&e[o]===t[o])},rn=class{constructor(t){this.tensorManager=Hl(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];this.sessionGraphInputs=new Map;this.temporaryGraphInputs=[];this.temporarySessionTensorIds=new Map;zr(t.logLevel,!!t.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(t){ue("verbose",()=>`[WebNN] onRunStart {sessionId: ${t}}`),this.activeSessionId=t}onRunEnd(t){ue("verbose",()=>`[WebNN] onRunEnd {sessionId: ${t}}`);let r=this.temporarySessionTensorIds.get(t);if(r){for(let n of r)ue("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${n}}`),this.tensorManager.releaseTensorId(n);this.temporarySessionTensorIds.delete(t),this.activeSessionId=void 0}}async createMLContext(t){if(t instanceof GPUDevice){let n=this.mlContextCache.findIndex(o=>o.gpuDevice===t);if(n!==-1)return this.mlContextCache[n].mlContext;{let o=await navigator.ml.createContext(t);return this.mlContextCache.push({gpuDevice:t,mlContext:o}),o}}else if(t===void 0){let n=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(n!==-1)return this.mlContextCache[n].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let r=this.mlContextCache.findIndex(n=>rg(n.options,t));if(r!==-1)return this.mlContextCache[r].mlContext;{let n=await navigator.ml.createContext(t);return this.mlContextCache.push({options:t,mlContext:n}),n}}registerMLContext(t,r){this.mlContextBySessionId.set(t,r);let n=this.sessionIdsByMLContext.get(r);n||(n=new Set,this.sessionIdsByMLContext.set(r,n)),n.add(t),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(t,this.temporaryGraphInputs),this.temporaryGraphInputs=[])}onReleaseSession(t){this.sessionGraphInputs.delete(t);let r=this.mlContextBySessionId.get(t);if(!r)return;this.tensorManager.releaseTensorsForSession(t),this.mlContextBySessionId.delete(t);let n=this.sessionIdsByMLContext.get(r);if(n.delete(t),n.size===0){this.sessionIdsByMLContext.delete(r);let o=this.mlContextCache.findIndex(i=>i.mlContext===r);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(t){return this.mlContextBySessionId.get(t)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(t){ue("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t)}async ensureTensor(t,r,n,o,i){let a=$o.get(n);if(!a)throw new Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(t??this.currentSessionId,r,a,o,i)}async createTemporaryTensor(t,r,n){ue("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${r}, shape: ${n}}`);let o=$o.get(r);if(!o)throw new Error(`Unsupported ONNX data type: ${r}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(t,i,o,n,!1);let a=this.temporarySessionTensorIds.get(t);return a?a.push(i):this.temporarySessionTensorIds.set(t,[i]),i}uploadTensor(t,r){if(!xe().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ue("verbose",()=>`[WebNN] uploadTensor {tensorId: ${t}, data: ${r.byteLength}}`),this.tensorManager.upload(t,r)}async downloadTensor(t,r){return this.tensorManager.download(t,r)}createMLTensorDownloader(t,r){return async()=>{let n=await this.tensorManager.download(t);return Or(n,r)}}registerMLTensor(t,r,n,o){let i=$o.get(n);if(!i)throw new Error(`Unsupported ONNX data type: ${n}`);let a=this.tensorManager.registerTensor(t,r,i,o);return ue("verbose",()=>`[WebNN] registerMLTensor {tensor: ${r}, dataType: ${i}, dimensions: ${o}} -> {tensorId: ${a}}`),a}registerMLConstant(t,r,n,o,i,a){if(!a)throw new Error("External mounted files are not available.");let u=t;t.startsWith("./")&&(u=t.substring(2));let d=a.get(u);if(!d)throw new Error(`File with name ${u} not found in preloaded files.`);if(r+n>d.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let c=d.slice(r,r+n).buffer,p;switch(i.dataType){case"float32":p=new Float32Array(c);break;case"float16":p=new Uint16Array(c);break;case"int32":p=new Int32Array(c);break;case"uint32":p=new Uint32Array(c);break;case"int64":p=new BigInt64Array(c);break;case"uint64":p=new BigUint64Array(c);break;case"int8":p=new Int8Array(c);break;case"int4":case"uint4":case"uint8":p=new Uint8Array(c);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return ue("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}}`),o.constant(i,p)}registerGraphInput(t){this.temporaryGraphInputs.push(t)}isGraphInput(t,r){let n=this.sessionGraphInputs.get(t);return n?n.includes(r):!1}flush(){}}});var Kl={};Gt(Kl,{init:()=>ng});var Jt,xo,ng,jl=V(()=>{"use strict";J();Wl();Ye();re();ql();Jt=class e{constructor(t,r,n,o){this.module=t;this.dataType=r;this.data=n;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(k.size(t)!==k.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},xo=class{constructor(t,r,n){this.module=t;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo,this.deviceInfo=r.deviceInfo;let o=t.PTR_SIZE,i=n/t.PTR_SIZE,a=o===4?"i32":"i64";this.opKernelContext=Number(t.getValue(o*i++,a));let u=Number(t.getValue(o*i++,a));this.outputCount=Number(t.getValue(o*i++,a)),this.customDataOffset=Number(t.getValue(o*i++,"*")),this.customDataSize=Number(t.getValue(o*i++,a));let d=[];for(let c=0;c<u;c++){let p=Number(t.getValue(o*i++,a)),m=Number(t.getValue(o*i++,"*")),f=Number(t.getValue(o*i++,a)),y=[];for(let g=0;g<f;g++)y.push(Number(t.getValue(o*i++,a)));d.push(new Jt(t,p,m,y))}this.inputs=d}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(t,r){let n=r?.inputs?.map(u=>typeof u=="number"?this.inputs[u]:u)??this.inputs,o=r?.outputs??[],i=(u,d,c)=>new Jt(this.module,d,this.output(u,c),c),a=(u,d)=>{let c=gt(u,d);if(!c)throw new Error(`Unsupported data type: ${u}`);let p=c>0?this.backend.gpuDataManager.create(c).id:0;return new Jt(this.module,u,p,d)};return this.backend.run(t,n,o,i,a,this.outputCount)}output(t,r){let n=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",a=this.module.stackAlloc((1+r.length)*o);this.module.setValue(a,r.length,i);for(let u=0;u<r.length;u++)this.module.setValue(a+o*(u+1),r[u],i);return this.module._JsepOutput(this.opKernelContext,t,a)}catch(o){throw new Error(`Failed to generate kernel's output[${t}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(n)}}},ng=async(e,t,r,n)=>{let o=t.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let i=new Jr;await i.initialize(r,n),o("webgpu",[i,a=>i.alloc(Number(a)),a=>i.free(a),(a,u,d,c=!1)=>{if(c)ue("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(a)}, dst=${Number(u)}, size=${Number(d)}`),i.memcpy(Number(a),Number(u));else{ue("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(a)}, gpuDataId=${Number(u)}, size=${Number(d)}`);let p=t.HEAPU8.subarray(Number(a>>>0),Number(a>>>0)+Number(d));i.upload(Number(u),p)}},async(a,u,d)=>{ue("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${a}, dataOffset=${u}, size=${d}`),await i.download(Number(a),()=>t.HEAPU8.subarray(Number(u)>>>0,Number(u+d)>>>0))},(a,u,d)=>i.createKernel(a,Number(u),d,t.UTF8ToString(t._JsepGetNodeName(Number(u)))),a=>i.releaseKernel(a),(a,u,d,c)=>{ue("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${d}, kernel=${a}, contextDataOffset=${u}`);let p=new xo(t,i,Number(u));return i.computeKernel(Number(a),p,c)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else{let i=new rn(r);o("webnn",[i,()=>i.reserveTensorId(),a=>i.releaseTensorId(a),async(a,u,d,c,p)=>i.ensureTensor(a,u,d,c,p),(a,u)=>{i.uploadTensor(a,u)},async(a,u)=>i.downloadTensor(a,u)])}}});var og,wr,vr,At,ig,Ft,$r,xr,Zl,Sr,Tr,Ir,Un=V(()=>{"use strict";Pa();Oa();J();ft();Ar();Hn();og=(e,t)=>{xe()._OrtInit(e,t)!==0&&le("Can't initialize onnxruntime.")},wr=async e=>{og(e.wasm.numThreads,Kt(e.logLevel))},vr=async(e,t)=>{{let r=(jl(),pr(Kl)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let n=e.webgpu.adapter;if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=e.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=e.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",xe(),e,n)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",xe(),e)}}},At=new Map,ig=e=>{let t=xe(),r=t.stackSave();try{let n=t.PTR_SIZE,o=t.stackAlloc(2*n);t._OrtGetInputOutputCount(e,o,o+n)!==0&&le("Can't get session input/output count.");let a=n===4?"i32":"i64";return[Number(t.getValue(o,a)),Number(t.getValue(o+n,a))]}finally{t.stackRestore(r)}},Ft=e=>{let t=xe(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},$r=async(e,t)=>{let r,n,o=xe();Array.isArray(e)?[r,n]=e:e.buffer===o.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=Ft(e);let i=0,a=0,u=0,d=[],c=[],p=[];try{if([a,d]=za(t),t?.externalData&&o.mountExternalData){let w=[];for(let S of t.externalData){let T=typeof S=="string"?S:S.path;w.push(jt(typeof S=="string"?S:S.data).then(I=>{o.mountExternalData(T,I)}))}await Promise.all(w)}for(let w of t?.executionProviders??[])if((typeof w=="string"?w:w.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof w!="string"){let T=w,I=T?.context,C=T?.gpuDevice,P=T?.deviceType,O=T?.powerPreference;I?o.currentContext=I:C?o.currentContext=await o.jsepCreateMLContext(C):o.currentContext=await o.jsepCreateMLContext({deviceType:P,powerPreference:O})}else o.currentContext=await o.jsepCreateMLContext();break}i=await o._OrtCreateSession(r,n,a),i===0&&le("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.jsepRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[m,f]=ig(i),y=!!t?.enableGraphCapture,g=[],_=[],x=[];for(let w=0;w<m;w++){let S=o._OrtGetInputName(i,w);S===0&&le("Can't get an input name."),c.push(S),g.push(o.UTF8ToString(S))}for(let w=0;w<f;w++){let S=o._OrtGetOutputName(i,w);S===0&&le("Can't get an output name."),p.push(S);let T=o.UTF8ToString(S);_.push(T);{if(y&&t?.preferredOutputLocation===void 0){x.push("gpu-buffer");continue}let I=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[T]??"cpu";if(I!=="cpu"&&I!=="cpu-pinned"&&I!=="gpu-buffer"&&I!=="ml-tensor")throw new Error(`Not supported preferred output location: ${I}.`);if(y&&I!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${I}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);x.push(I)}}let $=null;return x.some(w=>w==="gpu-buffer"||w==="ml-tensor")&&(u=o._OrtCreateBinding(i),u===0&&le("Can't create IO binding."),$={handle:u,outputPreferredLocations:x,outputPreferredLocationsEncoded:x.map(w=>Gn(w))}),At.set(i,[i,c,p,$,y,!1]),[i,g,_]}catch(m){throw c.forEach(f=>o._OrtFree(f)),p.forEach(f=>o._OrtFree(f)),u!==0&&o._OrtReleaseBinding(u)!==0&&le("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&le("Can't release session."),m}finally{o._free(r),a!==0&&o._OrtReleaseSessionOptions(a)!==0&&le("Can't release session options."),d.forEach(m=>o._free(m)),o.unmountExternalData?.()}},xr=e=>{let t=xe(),r=At.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[n,o,i,a,u]=r;a&&(u&&t._OrtClearBoundOutputs(a.handle)!==0&&le("Can't clear bound outputs."),t._OrtReleaseBinding(a.handle)!==0&&le("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),o.forEach(d=>t._OrtFree(d)),i.forEach(d=>t._OrtFree(d)),t._OrtReleaseSession(n)!==0&&le("Can't release session."),At.delete(e)},Zl=async(e,t,r,n,o,i=!1)=>{if(!e){t.push(0);return}let a=xe(),u=a.PTR_SIZE,d=e[0],c=e[1],p=e[3],m=p,f,y;if(d==="string"&&(p==="gpu-buffer"||p==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(i&&p!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(p==="gpu-buffer"){let x=e[2].gpuBuffer;y=gt(Ot(d),c);let $=a.jsepRegisterBuffer;if(!$)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');f=$(n,o,x,y)}else if(p==="ml-tensor"){let x=e[2].mlTensor;y=gt(Ot(d),c);let $=a.jsepRegisterMLTensor;if(!$)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');f=$(n,x,Ot(d),c)}else{let x=e[2];if(Array.isArray(x)){y=u*x.length,f=a._malloc(y),r.push(f);for(let $=0;$<x.length;$++){if(typeof x[$]!="string")throw new TypeError(`tensor data at index ${$} is not a string`);a.setValue(f+$*u,Ce(x[$],r),"*")}}else{let $=a.jsepIsGraphInput;if(d!=="string"&&$){let w=a._OrtGetInputName(n,o),S=a.UTF8ToString(w);if($(n,S)){let T=Ot(d);y=gt(T,c),m="ml-tensor";let I=a.jsepCreateTemporaryTensor,C=a.jsepUploadTensor;if(!I||!C)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let P=await I(n,T,c);C(P,new Uint8Array(x.buffer,x.byteOffset,x.byteLength)),f=P}else y=x.byteLength,f=a._malloc(y),r.push(f),a.HEAPU8.set(new Uint8Array(x.buffer,x.byteOffset,y),f)}else y=x.byteLength,f=a._malloc(y),r.push(f),a.HEAPU8.set(new Uint8Array(x.buffer,x.byteOffset,y),f)}}let g=a.stackSave(),_=a.stackAlloc(4*c.length);try{c.forEach(($,w)=>a.setValue(_+w*u,$,u===4?"i32":"i64"));let x=a._OrtCreateTensor(Ot(d),f,y,_,c.length,Gn(m));x===0&&le(`Can't create tensor for input/output. session=${n}, index=${o}.`),t.push(x)}finally{a.stackRestore(g)}},Sr=async(e,t,r,n,o,i)=>{let a=xe(),u=a.PTR_SIZE,d=At.get(e);if(!d)throw new Error(`cannot run inference. invalid session id: ${e}`);let c=d[0],p=d[1],m=d[2],f=d[3],y=d[4],g=d[5],_=t.length,x=n.length,$=0,w=[],S=[],T=[],I=[],C=a.stackSave(),P=a.stackAlloc(_*u),O=a.stackAlloc(_*u),U=a.stackAlloc(x*u),G=a.stackAlloc(x*u);try{[$,w]=Ea(i);for(let N=0;N<_;N++)await Zl(r[N],S,I,e,t[N],y);for(let N=0;N<x;N++)await Zl(o[N],T,I,e,_+n[N],y);for(let N=0;N<_;N++)a.setValue(P+N*u,S[N],"*"),a.setValue(O+N*u,p[t[N]],"*");for(let N=0;N<x;N++)a.setValue(U+N*u,T[N],"*"),a.setValue(G+N*u,m[n[N]],"*");if(f&&!g){let{handle:N,outputPreferredLocations:Y,outputPreferredLocationsEncoded:ye}=f;if(p.length!==_)throw new Error(`input count from feeds (${_}) is expected to be always equal to model's input count (${p.length}).`);for(let q=0;q<_;q++){let X=t[q];await a._OrtBindInput(N,p[X],S[q])!==0&&le(`Can't bind input[${q}] for session=${e}.`)}for(let q=0;q<x;q++){let X=n[q];o[q]?.[3]?a._OrtBindOutput(N,m[X],T[q],0)!==0&&le(`Can't bind pre-allocated output[${q}] for session=${e}.`):a._OrtBindOutput(N,m[X],0,ye[X])!==0&&le(`Can't bind output[${q}] to ${Y[q]} for session=${e}.`)}At.set(e,[c,p,m,f,y,!0])}a.jsepOnRunStart?.(c);let F;f?F=await a._OrtRunWithBinding(c,f.handle,x,U,$):F=await a._OrtRun(c,O,P,_,G,x,U,$),F!==0&&le("failed to call OrtRun().");let te=[];for(let N=0;N<x;N++){let Y=Number(a.getValue(U+N*u,"*"));if(Y===T[N]){te.push(o[N]);continue}let ye=a.stackSave(),q=a.stackAlloc(4*u),X=!1,ie,Z=0;try{a._OrtGetTensorData(Y,q,q+u,q+2*u,q+3*u)!==0&&le(`Can't access output tensor data on index ${N}.`);let Te=u===4?"i32":"i64",we=Number(a.getValue(q,Te));Z=a.getValue(q+u,"*");let z=a.getValue(q+u*2,"*"),B=Number(a.getValue(q+u*3,Te)),K=[];for(let _e=0;_e<B;_e++)K.push(Number(a.getValue(z+_e*u,Te)));a._OrtFree(z)!==0&&le("Can't free memory for tensor dims.");let de=K.reduce((_e,fe)=>_e*fe,1);ie=ht(we);let We=f?.outputPreferredLocations[n[N]];if(ie==="string"){if(We==="gpu-buffer"||We==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let _e=[];for(let fe=0;fe<de;fe++){let Ke=a.getValue(Z+fe*u,"*"),Nt=a.getValue(Z+(fe+1)*u,"*"),_t=fe===de-1?void 0:Nt-Ke;_e.push(a.UTF8ToString(Ke,_t))}te.push([ie,K,_e,"cpu"])}else if(We==="gpu-buffer"&&de>0){let _e=a.jsepGetBuffer;if(!_e)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let fe=_e(Z),Ke=gt(we,de);if(Ke===void 0||!Er(ie))throw new Error(`Unsupported data type: ${ie}`);X=!0,te.push([ie,K,{gpuBuffer:fe,download:a.jsepCreateDownloader(fe,Ke,ie),dispose:()=>{a._OrtReleaseTensor(Y)!==0&&le("Can't release tensor.")}},"gpu-buffer"])}else if(We==="ml-tensor"&&de>0){let _e=a.jsepEnsureTensor;if(!_e)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(gt(we,de)===void 0||!Pr(ie))throw new Error(`Unsupported data type: ${ie}`);let Ke=await _e(e,Z,we,K,!1);X=!0,te.push([ie,K,{mlTensor:Ke,download:a.jsepCreateMLTensorDownloader(Z,ie),dispose:()=>{a.jsepReleaseTensorId(Z),a._OrtReleaseTensor(Y)}},"ml-tensor"])}else{let _e=kr(ie),fe=new _e(de);new Uint8Array(fe.buffer,fe.byteOffset,fe.byteLength).set(a.HEAPU8.subarray(Z,Z+fe.byteLength)),te.push([ie,K,fe,"cpu"])}}finally{a.stackRestore(ye),ie==="string"&&Z&&a._free(Z),X||a._OrtReleaseTensor(Y),a.jsepOnRunEnd?.(c)}}return f&&!y&&(a._OrtClearBoundOutputs(f.handle)!==0&&le("Can't clear bound outputs."),At.set(e,[c,p,m,f,y,!1])),te}finally{a.stackRestore(C),S.forEach(F=>a._OrtReleaseTensor(F)),T.forEach(F=>a._OrtReleaseTensor(F)),I.forEach(F=>a._free(F)),$!==0&&a._OrtReleaseRunOptions($),w.forEach(F=>a._free(F))}},Tr=e=>{let t=xe(),r=At.get(e);if(!r)throw new Error("invalid session id");let n=r[0],o=t._OrtEndProfiling(n);o===0&&le("Can't get an profile file name."),t._OrtFree(o)},Ir=e=>{let t=[];for(let r of e){let n=r[2];!Array.isArray(n)&&"buffer"in n&&t.push(n.buffer)}return t}});var kt,Ve,er,on,an,nn,So,To,Rt,Ut,sg,Ql,Yl,Xl,Jl,ec,tc,rc,Io=V(()=>{"use strict";Ne();Un();ft();yr();kt=()=>!!ge.wasm.proxy&&typeof document<"u",er=!1,on=!1,an=!1,To=new Map,Rt=(e,t)=>{let r=To.get(e);r?r.push(t):To.set(e,[t])},Ut=()=>{if(er||!on||an||!Ve)throw new Error("worker not ready")},sg=e=>{switch(e.data.type){case"init-wasm":er=!1,e.data.err?(an=!0,So[1](e.data.err)):(on=!0,So[0]()),nn&&(URL.revokeObjectURL(nn),nn=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=To.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},Ql=async()=>{if(!on){if(er)throw new Error("multiple calls to 'initWasm()' detected.");if(an)throw new Error("previous call to 'initWasm()' failed.");if(er=!0,kt())return new Promise((e,t)=>{Ve?.terminate(),Ca().then(([r,n])=>{try{Ve=n,Ve.onerror=i=>t(i),Ve.onmessage=sg,So=[e,t];let o={type:"init-wasm",in:ge};!o.in.wasm.wasmPaths&&(r||import.meta.url?.startsWith("file:"))&&(o.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),Ve.postMessage(o),nn=r}catch(o){t(o)}},t)});try{await _r(ge.wasm),await wr(ge),on=!0}catch(e){throw an=!0,e}finally{er=!1}}},Yl=async e=>{if(kt())return Ut(),new Promise((t,r)=>{Rt("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:ge}};Ve.postMessage(n)});await vr(ge,e)},Xl=async e=>kt()?(Ut(),new Promise((t,r)=>{Rt("copy-from",[t,r]);let n={type:"copy-from",in:{buffer:e}};Ve.postMessage(n,[e.buffer])})):Ft(e),Jl=async(e,t)=>{if(kt()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Ut(),new Promise((r,n)=>{Rt("create",[r,n]);let o={type:"create",in:{model:e,options:{...t}}},i=[];e instanceof Uint8Array&&i.push(e.buffer),Ve.postMessage(o,i)})}else return $r(e,t)},ec=async e=>{if(kt())return Ut(),new Promise((t,r)=>{Rt("release",[t,r]);let n={type:"release",in:e};Ve.postMessage(n)});xr(e)},tc=async(e,t,r,n,o,i)=>{if(kt()){if(r.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return Ut(),new Promise((a,u)=>{Rt("run",[a,u]);let d=r,c={type:"run",in:{sessionId:e,inputIndices:t,inputs:d,outputIndices:n,options:i}};Ve.postMessage(c,Ir(d))})}else return Sr(e,t,r,n,o,i)},rc=async e=>{if(kt())return Ut(),new Promise((t,r)=>{Rt("end-profiling",[t,r]);let n={type:"end-profiling",in:e};Ve.postMessage(n)});Tr(e)}});var nc,ug,sn,oc=V(()=>{"use strict";Ne();Io();J();br();Hn();nc=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},ug=e=>{switch(e[3]){case"cpu":return new Le(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Er(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:o}=e[2];return Le.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:o})}case"ml-tensor":{let t=e[0];if(!Pr(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:n,dispose:o}=e[2];return Le.fromMLTensor(r,{dataType:t,dims:e[1],download:n,dispose:o})}default:throw new Error(`invalid data location: ${e[3]}`)}},sn=class{async fetchModelAndCopyToWasmMemory(t){return Xl(await jt(t))}async loadModel(t,r){Me();let n;typeof t=="string"?n=await this.fetchModelAndCopyToWasmMemory(t):n=t,[this.sessionId,this.inputNames,this.outputNames]=await Jl(n,r),ze()}async dispose(){return ec(this.sessionId)}async run(t,r,n){Me();let o=[],i=[];Object.entries(t).forEach(f=>{let y=f[0],g=f[1],_=this.inputNames.indexOf(y);if(_===-1)throw new Error(`invalid input '${y}'`);o.push(g),i.push(_)});let a=[],u=[];Object.entries(r).forEach(f=>{let y=f[0],g=f[1],_=this.outputNames.indexOf(y);if(_===-1)throw new Error(`invalid output '${y}'`);a.push(g),u.push(_)});let d=o.map((f,y)=>nc(f,()=>`input "${this.inputNames[i[y]]}"`)),c=a.map((f,y)=>f?nc(f,()=>`output "${this.outputNames[u[y]]}"`):null),p=await tc(this.sessionId,i,d,u,c,n),m={};for(let f=0;f<p.length;f++)m[this.outputNames[u[f]]]=a[f]??ug(p[f]);return ze(),m}startProfiling(){}endProfiling(){rc(this.sessionId)}}});var ac={};Gt(ac,{OnnxruntimeWebAssemblyBackend:()=>un,initializeFlags:()=>ic,wasmBackend:()=>dg});var ic,un,dg,sc=V(()=>{"use strict";Ne();Io();oc();ic=()=>{if((typeof ge.wasm.initTimeout!="number"||ge.wasm.initTimeout<0)&&(ge.wasm.initTimeout=0),ge.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof ge.wasm.proxy!="boolean"&&(ge.wasm.proxy=!1),typeof ge.wasm.trace!="boolean"&&(ge.wasm.trace=!1),typeof ge.wasm.numThreads!="number"||!Number.isInteger(ge.wasm.numThreads)||ge.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ge.wasm.numThreads=1;else{let e=typeof navigator>"u"?Pn("node:os").cpus().length:navigator.hardwareConcurrency;ge.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},un=class{async init(t){ic(),await Ql(),await Yl(t)}async createInferenceSessionHandler(t,r){let n=new sn;return await n.loadModel(t,r),Promise.resolve(n)}},dg=new un});Ne();Ne();Ne();var fa="1.21.1";var pS=Rn;{let e=(sc(),pr(ac)).wasmBackend;$t("webgpu",e,5),$t("webnn",e,5),$t("cpu",e,10),$t("wasm",e,10)}Object.defineProperty(ge.versions,"web",{value:fa,enumerable:!0});export{Dp as InferenceSession,hr as TRACE,Me as TRACE_FUNC_BEGIN,ze as TRACE_FUNC_END,Le as Tensor,pS as default,ge as env,$t as registerBackend};
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
