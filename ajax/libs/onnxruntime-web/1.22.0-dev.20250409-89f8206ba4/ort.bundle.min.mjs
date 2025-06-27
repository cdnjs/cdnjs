/*!
 * ONNX Runtime Web v1.22.0-dev.20250409-89f8206ba4
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var zn=Object.defineProperty;var Up=Object.getOwnPropertyDescriptor;var Np=Object.getOwnPropertyNames;var Vp=Object.prototype.hasOwnProperty;var On=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var U=(e,t)=>()=>(e&&(t=e(e=0)),t);var Dt=(e,t)=>{for(var r in t)zn(e,r,{get:t[r],enumerable:!0})},Wp=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Np(t))!Vp.call(e,o)&&o!==r&&zn(e,o,{get:()=>t[o],enumerable:!(n=Up(t,o))||n.enumerable});return e};var Ft=e=>Wp(zn({},"__esModule",{value:!0}),e);var fr,vt,$t,Lp,Fi,Bn=U(()=>{"use strict";fr=new Map,vt=[],$t=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let n=fr.get(e);if(n===void 0)fr.set(e,{backend:t,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let o=vt.indexOf(e);o!==-1&&vt.splice(o,1);for(let i=0;i<vt.length;i++)if(fr.get(vt[i]).priority<=r){vt.splice(i,0,e);return}vt.push(e)}return}throw new TypeError("not a valid backend")},Lp=async e=>{let t=fr.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(n){return r||(t.error=`${n}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Fi=async e=>{let t=e.executionProviders||[],r=t.map(d=>typeof d=="string"?d:d.name),n=r.length===0?vt:r,o,i=[],a=new Set;for(let d of n){let c=await Lp(d);typeof c=="string"?i.push({name:d,err:c}):(o||(o=c),o===c&&a.add(d))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(d=>`[${d.name}] ${d.err}`).join(", ")}`);for(let{name:d,err:c}of i)r.includes(d)&&console.warn(`removing requested execution provider "${d}" from session options because it is not available: ${c}`);let u=t.filter(d=>a.has(typeof d=="string"?d:d.name));return[o,new Proxy(e,{get:(d,c)=>c==="executionProviders"?u:Reflect.get(d,c)})]}});var qi=U(()=>{"use strict";Bn()});var ji,Ki=U(()=>{"use strict";ji="1.22.0-dev.20250409-89f8206ba4"});var Zi,Me,Dn=U(()=>{"use strict";Ki();Zi="warning",Me={wasm:{},webgl:{},webgpu:{},versions:{common:ji},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Zi=e}},get logLevel(){return Zi}};Object.defineProperty(Me,"logLevel",{enumerable:!0})});var ge,Qi=U(()=>{"use strict";Dn();ge=Me});var Yi,Xi,Ji=U(()=>{"use strict";Yi=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(n!=null){let o,i;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[3]):(o=e.dims[3],i=e.dims[2]);let a=t?.format!==void 0?t.format:"RGB",u=t?.norm,d,c;u===void 0||u.mean===void 0?d=[255,255,255,255]:typeof u.mean=="number"?d=[u.mean,u.mean,u.mean,u.mean]:(d=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(d[3]=u.mean[3])),u===void 0||u.bias===void 0?c=[0,0,0,0]:typeof u.bias=="number"?c=[u.bias,u.bias,u.bias,u.bias]:(c=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(c[3]=u.bias[3]));let p=i*o,m=0,f=p,b=p*2,g=-1;a==="RGBA"?(m=0,f=p,b=p*2,g=p*3):a==="RGB"?(m=0,f=p,b=p*2):a==="RBG"&&(m=0,b=p,f=p*2);for(let _=0;_<i;_++)for(let S=0;S<o;S++){let $=(e.data[m++]-c[0])*d[0],v=(e.data[f++]-c[1])*d[1],x=(e.data[b++]-c[2])*d[2],T=g===-1?255:(e.data[g++]-c[3])*d[3];n.fillStyle="rgba("+$+","+v+","+x+","+T+")",n.fillRect(S,_,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Xi=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(r!=null){let o,i,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[1],a=e.dims[3]):(o=e.dims[3],i=e.dims[2],a=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",d=t?.norm,c,p;d===void 0||d.mean===void 0?c=[255,255,255,255]:typeof d.mean=="number"?c=[d.mean,d.mean,d.mean,d.mean]:(c=[d.mean[0],d.mean[1],d.mean[2],255],d.mean[3]!==void 0&&(c[3]=d.mean[3])),d===void 0||d.bias===void 0?p=[0,0,0,0]:typeof d.bias=="number"?p=[d.bias,d.bias,d.bias,d.bias]:(p=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(p[3]=d.bias[3]));let m=i*o;if(t!==void 0&&(t.format!==void 0&&a===4&&t.format!=="RGBA"||a===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let f=4,b=0,g=1,_=2,S=3,$=0,v=m,x=m*2,T=-1;u==="RGBA"?($=0,v=m,x=m*2,T=m*3):u==="RGB"?($=0,v=m,x=m*2):u==="RBG"&&($=0,x=m,v=m*2),n=r.createImageData(o,i);for(let E=0;E<i*o;b+=f,g+=f,_+=f,S+=f,E++)n.data[b]=(e.data[$++]-p[0])*c[0],n.data[g]=(e.data[v++]-p[1])*c[1],n.data[_]=(e.data[x++]-p[2])*c[2],n.data[S]=T===-1?255:(e.data[T++]-p[3])*c[3]}else throw new Error("Can not access image data");return n}});var Mn,ea,ta,ra,na,oa,ia=U(()=>{"use strict";hr();Mn=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=t,o=t.norm??{mean:255,bias:0},i,a;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?a=[o.bias,o.bias,o.bias,o.bias]:a=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",d=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",c=r*n,p=d==="RGBA"?new Float32Array(c*4):new Float32Array(c*3),m=4,f=0,b=1,g=2,_=3,S=0,$=c,v=c*2,x=-1;u==="RGB"&&(m=3,f=0,b=1,g=2,_=-1),d==="RGBA"?x=c*3:d==="RBG"?(S=0,v=c,$=c*2):d==="BGR"&&(v=0,$=c,S=c*2);for(let E=0;E<c;E++,f+=m,g+=m,b+=m,_+=m)p[S++]=(e[f]+a[0])/i[0],p[$++]=(e[b]+a[1])/i[1],p[v++]=(e[g]+a[2])/i[2],x!==-1&&_!==-1&&(p[x++]=(e[_]+a[3])/i[3]);return d==="RGBA"?new Pe("float32",p,[1,4,r,n]):new Pe("float32",p,[1,3,r,n])},ea=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,n=typeof ImageData<"u"&&e instanceof ImageData,o=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,i=typeof e=="string",a,u=t??{},d=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},c=p=>typeof HTMLCanvasElement<"u"&&p instanceof HTMLCanvasElement||p instanceof OffscreenCanvas?p.getContext("2d"):null;if(r){let p=d();p.width=e.width,p.height=e.height;let m=c(p);if(m!=null){let f=e.height,b=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(f=t.resizedHeight,b=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=f,u.width=b}else u.tensorFormat="RGBA",u.height=f,u.width=b;m.drawImage(e,0,0),a=m.getImageData(0,0,b,f).data}else throw new Error("Can not access image data")}else if(n){let p,m;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(p=t.resizedHeight,m=t.resizedWidth):(p=e.height,m=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=p,u.width=m,t!==void 0){let f=d();f.width=m,f.height=p;let b=c(f);if(b!=null)b.putImageData(e,0,0),a=b.getImageData(0,0,m,p).data;else throw new Error("Can not access image data")}else a=e.data}else if(o){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let p=d();p.width=e.width,p.height=e.height;let m=c(p);if(m!=null){let f=e.height,b=e.width;return m.drawImage(e,0,0,b,f),a=m.getImageData(0,0,b,f).data,u.height=f,u.width=b,Mn(a,u)}else throw new Error("Can not access image data")}else{if(i)return new Promise((p,m)=>{let f=d(),b=c(f);if(!e||!b)return m();let g=new Image;g.crossOrigin="Anonymous",g.src=e,g.onload=()=>{f.width=g.width,f.height=g.height,b.drawImage(g,0,0,f.width,f.height);let _=b.getImageData(0,0,f.width,f.height);u.height=f.height,u.width=f.width,p(Mn(_.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return Mn(a,u);throw new Error("Input data provided is not supported - aborted tensor creation")},ta=(e,t)=>{let{width:r,height:n,download:o,dispose:i}=t,a=[1,n,r,4];return new Pe({location:"texture",type:"float32",texture:e,dims:a,download:o,dispose:i})},ra=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:i}=t;return new Pe({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:o,dispose:i})},na=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:i}=t;return new Pe({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:n,download:o,dispose:i})},oa=(e,t,r)=>new Pe({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})});var xt,qt,aa,sa,ua=U(()=>{"use strict";xt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),qt=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),aa=!1,sa=()=>{if(!aa){aa=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,n=typeof r<"u"&&r.from;e&&(xt.set("int64",BigInt64Array),qt.set(BigInt64Array,"int64")),t&&(xt.set("uint64",BigUint64Array),qt.set(BigUint64Array,"uint64")),n?(xt.set("float16",r),qt.set(r,"float16")):xt.set("float16",Uint16Array)}}});var da,la,ca=U(()=>{"use strict";hr();da=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},la=(e,t)=>{switch(e.location){case"cpu":return new Pe(e.type,e.data,t);case"cpu-pinned":return new Pe({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Pe({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Pe({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Pe({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var Pe,hr=U(()=>{"use strict";Ji();ia();ua();ca();Pe=class{constructor(t,r,n){sa();let o,i;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,o=t.type,i=t.dims,t.location){case"cpu-pinned":{let u=xt.get(o);if(!u)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(t.data instanceof u))throw new TypeError(`buffer should be of type ${u.name}`);this.cpuData=t.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let u,d;if(typeof t=="string")if(o=t,d=n,t==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");u=r}else{let c=xt.get(t);if(c===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(r)){if(t==="float16"&&c===Uint16Array||t==="uint4"||t==="int4")throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${c.name} as data.`);t==="uint64"||t==="int64"?u=c.from(r,BigInt):u=c.from(r)}else if(r instanceof c)u=r;else if(r instanceof Uint8ClampedArray)if(t==="uint8")u=Uint8Array.from(r);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(t==="float16"&&r instanceof Uint16Array&&c!==Uint16Array)u=new globalThis.Float16Array(r.buffer,r.byteOffset,r.length);else throw new TypeError(`A ${o} tensor's data must be type of ${c}`)}else if(d=r,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let c=typeof t[0];if(c==="string")o="string",u=t;else if(c==="boolean")o="bool",u=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${c}.`)}else if(t instanceof Uint8ClampedArray)o="uint8",u=Uint8Array.from(t);else{let c=qt.get(t.constructor);if(c===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);o=c,u=t}if(d===void 0)d=[u.length];else if(!Array.isArray(d))throw new TypeError("A tensor's dims must be a number array");i=d,this.cpuData=u,this.dataLocation="cpu"}let a=da(i);if(this.cpuData&&a!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=a}static async fromImage(t,r){return ea(t,r)}static fromTexture(t,r){return ta(t,r)}static fromGpuBuffer(t,r){return ra(t,r)}static fromMLTensor(t,r){return na(t,r)}static fromPinnedBuffer(t,r,n){return oa(t,r,n)}toDataURL(t){return Yi(this,t)}toImageData(t){return Xi(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,t&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return la(this,t)}}});var Ge,Rn=U(()=>{"use strict";hr();Ge=Pe});var gr,pa,Re,Oe,Un=U(()=>{"use strict";Dn();gr=(e,t)=>{(typeof Me.trace>"u"?!Me.wasm.trace:!Me.trace)||console.timeStamp(`${e}::ORT::${t}`)},pa=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],n=!1;for(let o=0;o<r.length;o++){if(n&&!r[o].includes("TRACE_FUNC")){let i=`FUNC_${e}::${r[o].trim().split(" ")[1]}`;t&&(i+=`::${t}`),gr("CPU",i);return}r[o].includes("TRACE_FUNC")&&(n=!0)}},Re=e=>{(typeof Me.trace>"u"?!Me.wasm.trace:!Me.trace)||pa("BEGIN",e)},Oe=e=>{(typeof Me.trace>"u"?!Me.wasm.trace:!Me.trace)||pa("END",e)}});var br,ma=U(()=>{"use strict";Bn();Rn();Un();br=class e{constructor(t){this.handler=t}async run(t,r,n){Re();let o={},i={};if(typeof t!="object"||t===null||t instanceof Ge||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Ge)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let c of r){if(typeof c!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(c)===-1)throw new RangeError(`'fetches' contains invalid output name: ${c}.`);o[c]=null}if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let c=!1,p=Object.getOwnPropertyNames(r);for(let m of this.outputNames)if(p.indexOf(m)!==-1){let f=r[m];(f===null||f instanceof Ge)&&(c=!0,a=!1,o[m]=f)}if(c){if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let c of this.inputNames)if(typeof t[c]>"u")throw new Error(`input '${c}' is missing in 'feeds'.`);if(a)for(let c of this.outputNames)o[c]=null;let u=await this.handler.run(t,o,i),d={};for(let c in u)if(Object.hasOwnProperty.call(u,c)){let p=u[c];p instanceof Ge?d[c]=p:d[c]=new Ge(p.type,p.data,p.dims)}return Oe(),d}async release(){return this.handler.dispose()}static async create(t,r,n,o){Re();let i,a={};if(typeof t=="string"){if(i=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(i=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let p=t,m=0,f=t.byteLength;if(typeof r=="object"&&r!==null)a=r;else if(typeof r=="number"){if(m=r,!Number.isSafeInteger(m))throw new RangeError("'byteOffset' must be an integer.");if(m<0||m>=p.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${p.byteLength}).`);if(f=t.byteLength-m,typeof n=="number"){if(f=n,!Number.isSafeInteger(f))throw new RangeError("'byteLength' must be an integer.");if(f<=0||m+f>p.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${p.byteLength-m}].`);if(typeof o=="object"&&o!==null)a=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof n<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(p,m,f)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,d]=await Fi(a),c=await u.createInferenceSessionHandler(i,d);return Oe(),new e(c)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}});var Gp,fa=U(()=>{"use strict";ma();Gp=br});var ha=U(()=>{"use strict"});var ga=U(()=>{"use strict"});var ba=U(()=>{"use strict"});var ya=U(()=>{"use strict"});var Nn={};Dt(Nn,{InferenceSession:()=>Gp,TRACE:()=>gr,TRACE_FUNC_BEGIN:()=>Re,TRACE_FUNC_END:()=>Oe,Tensor:()=>Ge,env:()=>ge,registerBackend:()=>$t});var We=U(()=>{"use strict";qi();Qi();fa();Rn();ha();ga();Un();ba();ya()});var yr=U(()=>{"use strict"});var $a={};Dt($a,{default:()=>Hp});var wa,va,Hp,xa=U(()=>{"use strict";Vn();ht();_r();wa="ort-wasm-proxy-worker",va=globalThis.self?.name===wa;va&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":wr(r.wasm).then(()=>{vr(r).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})})},n=>{postMessage({type:t,err:n})});break;case"init-ep":{let{epName:n,env:o}=r;$r(o,n).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})});break}case"copy-from":{let{buffer:n}=r,o=jt(n);postMessage({type:t,out:o});break}case"create":{let{model:n,options:o}=r;xr(n,o).then(i=>{postMessage({type:t,out:i})},i=>{postMessage({type:t,err:i})});break}case"release":Sr(r),postMessage({type:t});break;case"run":{let{sessionId:n,inputIndices:o,inputs:i,outputIndices:a,options:u}=r;Tr(n,o,i,a,new Array(a.length).fill(null),u).then(d=>{d.some(c=>c[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:d},Cr([...i,...d]))},d=>{postMessage({type:t,err:d})});break}case"end-profiling":Ir(r),postMessage({type:t});break;default:}}catch(n){postMessage({type:t,err:n})}});Hp=va?null:e=>new Worker(e??Ue,{type:"module",name:wa})});var Ta={};Dt(Ta,{default:()=>Fp});var Wn,Sa,Fp,qp,Ia=U(()=>{"use strict";Sa=(Wn=import.meta.url,async function(e={}){var t,r,n=e,o=new Promise((s,l)=>{t=s,r=l}),i=typeof window=="object",a=typeof WorkerGlobalScope<"u",u=a&&self.name?.startsWith("em-pthread");n.mountExternalData=(s,l)=>{s.startsWith("./")&&(s=s.substring(2)),(n.Eb||(n.Eb=new Map)).set(s,l)},n.unmountExternalData=()=>{delete n.Eb};var d=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,pc:!0}).buffer.constructor;let c=s=>async(...l)=>{try{if(n.Fb)throw Error("Session already started");let h=n.Fb={dc:l[0],errors:[]},y=await s(...l);if(n.Fb!==h)throw Error("Session mismatch");n.Jb?.flush();let w=h.errors;if(0<w.length){let A=await Promise.all(w);if(A=A.filter(B=>B),0<A.length)throw Error(A.join(`
`))}return y}finally{n.Fb=null}};n.jsepInit=(s,l)=>{if(s==="webgpu"){[n.Jb,n.Ub,n.Yb,n.Kb,n.Xb,n.jb,n.Zb,n.ac,n.Vb,n.Wb,n.$b]=l;let h=n.Jb;n.jsepRegisterBuffer=(y,w,A,B)=>h.registerBuffer(y,w,A,B),n.jsepGetBuffer=y=>h.getBuffer(y),n.jsepCreateDownloader=(y,w,A)=>h.createDownloader(y,w,A),n.jsepOnCreateSession=y=>{h.onCreateSession(y)},n.jsepOnReleaseSession=y=>{h.onReleaseSession(y)},n.jsepOnRunStart=y=>h.onRunStart(y),n.bc=(y,w)=>{h.upload(y,w)}}else if(s==="webnn"){let h=l[0];[n.nc,n.Nb,n.webnnEnsureTensor,n.Ob,n.webnnDownloadTensor]=l.slice(1),n.webnnReleaseTensorId=n.Nb,n.webnnUploadTensor=n.Ob,n.webnnOnRunStart=y=>h.onRunStart(y),n.webnnOnRunEnd=h.onRunEnd.bind(h),n.webnnRegisterMLContext=(y,w)=>{h.registerMLContext(y,w)},n.webnnOnReleaseSession=y=>{h.onReleaseSession(y)},n.webnnCreateMLTensorDownloader=(y,w)=>h.createMLTensorDownloader(y,w),n.webnnRegisterMLTensor=(y,w,A,B)=>h.registerMLTensor(y,w,A,B),n.webnnCreateMLContext=y=>h.createMLContext(y),n.webnnRegisterMLConstant=(y,w,A,B,R,G)=>h.registerMLConstant(y,w,A,B,R,n.Eb,G),n.webnnRegisterGraphInput=h.registerGraphInput.bind(h),n.webnnIsGraphInput=h.isGraphInput.bind(h),n.webnnCreateTemporaryTensor=h.createTemporaryTensor.bind(h),n.webnnIsInt64Supported=h.isInt64Supported.bind(h)}};let p=()=>{let s=(l,h,y)=>(...w)=>{let A=Ze,B=h?.();w=l(...w);let R=h?.();return B!==R&&(l=R,y(B),h=y=null),Ze!=A?new Promise((G,K)=>{Sn={resolve:G,reject:K}}):w};(()=>{for(let l of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])n[l]=s(n[l],()=>n[l],h=>n[l]=h)})(),c!==void 0&&(n._OrtRun=c(n._OrtRun),n._OrtRunWithBinding=c(n._OrtRunWithBinding)),p=void 0};n.asyncInit=()=>{p?.()};var m,f,b=Object.assign({},n),g=(s,l)=>{throw l},_="";(i||a)&&(a?_=self.location.href:typeof document<"u"&&document.currentScript&&(_=document.currentScript.src),Wn&&(_=Wn),_=_.startsWith("blob:")?"":_.slice(0,_.replace(/[?#].*/,"").lastIndexOf("/")+1),a&&(f=s=>{var l=new XMLHttpRequest;return l.open("GET",s,!1),l.responseType="arraybuffer",l.send(null),new Uint8Array(l.response)}),m=async s=>{if(X(s))return new Promise((h,y)=>{var w=new XMLHttpRequest;w.open("GET",s,!0),w.responseType="arraybuffer",w.onload=()=>{w.status==200||w.status==0&&w.response?h(w.response):y(w.status)},w.onerror=y,w.send(null)});var l=await fetch(s,{credentials:"same-origin"});if(l.ok)return l.arrayBuffer();throw Error(l.status+" : "+l.url)});var S=console.log.bind(console),$=console.error.bind(console),v=S,x=$;Object.assign(n,b),b=null;var T,E,I,z,O,D,L,q,Q,W,Z,we,H,j=n.wasmBinary,te=!1,X=s=>s.startsWith("file://");function ue(){return T.buffer!=z.buffer&&Ce(),z}function he(){return T.buffer!=z.buffer&&Ce(),O}function ye(){return T.buffer!=z.buffer&&Ce(),D}function re(){return T.buffer!=z.buffer&&Ce(),L}function C(){return T.buffer!=z.buffer&&Ce(),q}function V(){return T.buffer!=z.buffer&&Ce(),Q}function de(){return T.buffer!=z.buffer&&Ce(),W}function ze(){return T.buffer!=z.buffer&&Ce(),H}if(u){let s=function(l){try{var h=l.data,y=h.Bb;if(y==="load"){let w=[];self.onmessage=A=>w.push(A),self.startWorker=()=>{postMessage({Bb:"loaded"});for(let A of w)s(A);self.onmessage=s};for(let A of h.Rb)n[A]&&!n[A].proxy||(n[A]=(...B)=>{postMessage({Bb:"callHandler",Qb:A,args:B})},A=="print"&&(v=n[A]),A=="printErr"&&(x=n[A]));T=h.kc,Ce(),ve(h.lc)}else if(y==="run"){_c(h.Ab),An(h.Ab,0,0,1,0,0),No(),$n(h.Ab),$e||(Oi(),$e=!0);try{wc(h.fc,h.Hb)}catch(w){if(w!="unwind")throw w}}else h.target!=="setimmediate"&&(y==="checkMailbox"?$e&&nr():y&&(x(`worker: received unknown command ${y}`),x(h)))}catch(w){throw Bi(),w}};var wg=s,ve,$e=!1;x=function(...l){l=l.join(" "),console.error(l)},self.alert=function(...l){postMessage({Bb:"alert",text:l.join(" "),ic:cr()})},self.onunhandledrejection=l=>{throw l.reason||l},self.onmessage=s}function Ce(){var s=T.buffer;n.HEAP8=z=new Int8Array(s),n.HEAP16=D=new Int16Array(s),n.HEAPU8=O=new Uint8Array(s),n.HEAPU16=L=new Uint16Array(s),n.HEAP32=q=new Int32Array(s),n.HEAPU32=Q=new Uint32Array(s),n.HEAPF32=W=new Float32Array(s),n.HEAPF64=H=new Float64Array(s),n.HEAP64=Z=new BigInt64Array(s),n.HEAPU64=we=new BigUint64Array(s)}function _t(){u?startWorker(n):Y.Ca()}u||(T=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),Ce());var kt,Pt=0,Lt=null;function zo(){if(--Pt==0&&Lt){var s=Lt;Lt=null,s()}}function dt(s){throw x(s="Aborted("+s+")"),te=!0,s=new WebAssembly.RuntimeError(s+". Build with -sASSERTIONS for more info."),r(s),s}function Oo(){return{a:{L:yc,Aa:bc,b:$c,$:Go,A:qo,pa:jo,X:Zo,Z:Qo,qa:Yo,na:Xo,ga:Jo,ma:ei,J:ti,Y:ri,V:ni,oa:oi,W:ii,va:xc,E:Tc,Q:Ic,O:Ac,D:kc,u:Pc,r:zc,P:Oc,z:Vc,R:Wc,ja:Lc,T:Gc,aa:Hc,M:Fc,F:qc,ia:$n,sa:jc,t:Kc,Ba:Zc,w:Xc,o:Jc,l:tp,c:_n,n:rp,j:ip,v:ap,p:sp,f:up,s:dp,m:lp,e:cp,k:pp,i:mp,g:fp,d:hp,da:gp,ea:bp,fa:yp,ba:_i,ca:wi,N:vi,xa:wp,ua:xp,h:Sp,C:Tp,G:Ip,ta:vp,x:Cp,ra:Ap,U:Ep,q:_p,y:kp,K:Pp,S:zp,za:Op,ya:Bp,ka:Ti,la:Ii,_:hn,B:Ci,I:Ai,ha:Ei,H:ki,a:T,wa:fn}}}var cn={829644:(s,l,h,y,w)=>{if(n===void 0||!n.Eb)return 1;if((s=Te(Number(s>>>0))).startsWith("./")&&(s=s.substring(2)),!(s=n.Eb.get(s)))return 2;if(l=Number(l>>>0),h=Number(h>>>0),y=Number(y>>>0),l+h>s.byteLength)return 3;try{let A=s.subarray(l,l+h);switch(w){case 0:he().set(A,y>>>0);break;case 1:n.mc?n.mc(y,A):n.bc(y,A);break;default:return 4}return 0}catch{return 4}},830468:(s,l,h)=>{n.Ob(s,he().subarray(l>>>0,l+h>>>0))},830532:()=>n.nc(),830574:s=>{n.Nb(s)},830611:()=>{n.Vb()},830642:()=>{n.Wb()},830671:()=>{n.$b()},830696:s=>n.Ub(s),830729:s=>n.Yb(s),830761:(s,l,h)=>{n.Kb(Number(s),Number(l),Number(h),!0)},830824:(s,l,h)=>{n.Kb(Number(s),Number(l),Number(h))},830881:()=>typeof wasmOffsetConverter<"u",830938:s=>{n.jb("Abs",s,void 0)},830989:s=>{n.jb("Neg",s,void 0)},831040:s=>{n.jb("Floor",s,void 0)},831093:s=>{n.jb("Ceil",s,void 0)},831145:s=>{n.jb("Reciprocal",s,void 0)},831203:s=>{n.jb("Sqrt",s,void 0)},831255:s=>{n.jb("Exp",s,void 0)},831306:s=>{n.jb("Erf",s,void 0)},831357:s=>{n.jb("Sigmoid",s,void 0)},831412:(s,l,h)=>{n.jb("HardSigmoid",s,{alpha:l,beta:h})},831491:s=>{n.jb("Log",s,void 0)},831542:s=>{n.jb("Sin",s,void 0)},831593:s=>{n.jb("Cos",s,void 0)},831644:s=>{n.jb("Tan",s,void 0)},831695:s=>{n.jb("Asin",s,void 0)},831747:s=>{n.jb("Acos",s,void 0)},831799:s=>{n.jb("Atan",s,void 0)},831851:s=>{n.jb("Sinh",s,void 0)},831903:s=>{n.jb("Cosh",s,void 0)},831955:s=>{n.jb("Asinh",s,void 0)},832008:s=>{n.jb("Acosh",s,void 0)},832061:s=>{n.jb("Atanh",s,void 0)},832114:s=>{n.jb("Tanh",s,void 0)},832166:s=>{n.jb("Not",s,void 0)},832217:(s,l,h)=>{n.jb("Clip",s,{min:l,max:h})},832286:s=>{n.jb("Clip",s,void 0)},832338:(s,l)=>{n.jb("Elu",s,{alpha:l})},832396:s=>{n.jb("Gelu",s,void 0)},832448:s=>{n.jb("Relu",s,void 0)},832500:(s,l)=>{n.jb("LeakyRelu",s,{alpha:l})},832564:(s,l)=>{n.jb("ThresholdedRelu",s,{alpha:l})},832634:(s,l)=>{n.jb("Cast",s,{to:l})},832692:s=>{n.jb("Add",s,void 0)},832743:s=>{n.jb("Sub",s,void 0)},832794:s=>{n.jb("Mul",s,void 0)},832845:s=>{n.jb("Div",s,void 0)},832896:s=>{n.jb("Pow",s,void 0)},832947:s=>{n.jb("Equal",s,void 0)},833e3:s=>{n.jb("Greater",s,void 0)},833055:s=>{n.jb("GreaterOrEqual",s,void 0)},833117:s=>{n.jb("Less",s,void 0)},833169:s=>{n.jb("LessOrEqual",s,void 0)},833228:(s,l,h,y,w)=>{n.jb("ReduceMean",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:y?Array.from(C().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},833403:(s,l,h,y,w)=>{n.jb("ReduceMax",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:y?Array.from(C().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},833577:(s,l,h,y,w)=>{n.jb("ReduceMin",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:y?Array.from(C().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},833751:(s,l,h,y,w)=>{n.jb("ReduceProd",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:y?Array.from(C().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},833926:(s,l,h,y,w)=>{n.jb("ReduceSum",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:y?Array.from(C().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},834100:(s,l,h,y,w)=>{n.jb("ReduceL1",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:y?Array.from(C().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},834273:(s,l,h,y,w)=>{n.jb("ReduceL2",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:y?Array.from(C().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},834446:(s,l,h,y,w)=>{n.jb("ReduceLogSum",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:y?Array.from(C().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},834623:(s,l,h,y,w)=>{n.jb("ReduceSumSquare",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:y?Array.from(C().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},834803:(s,l,h,y,w)=>{n.jb("ReduceLogSumExp",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:y?Array.from(C().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},834983:s=>{n.jb("Where",s,void 0)},835036:(s,l,h)=>{n.jb("Transpose",s,{perm:l?Array.from(C().subarray(Number(l)>>>0,Number(h)>>>0)):[]})},835160:(s,l,h,y)=>{n.jb("DepthToSpace",s,{blocksize:l,mode:Te(h),format:y?"NHWC":"NCHW"})},835293:(s,l,h,y)=>{n.jb("DepthToSpace",s,{blocksize:l,mode:Te(h),format:y?"NHWC":"NCHW"})},835426:(s,l,h,y,w,A,B,R,G,K,ae,le,_e,ke,Bt)=>{n.jb("ConvTranspose",s,{format:G?"NHWC":"NCHW",autoPad:l,dilations:[h],group:y,kernelShape:[w],pads:[A,B],strides:[R],wIsConst:()=>!!ue()[K>>>0],outputPadding:ae?Array.from(C().subarray(Number(ae)>>>0,Number(le)>>>0)):[],outputShape:_e?Array.from(C().subarray(Number(_e)>>>0,Number(ke)>>>0)):[],activation:Te(Bt)})},835859:(s,l,h,y,w,A,B,R,G,K,ae,le,_e,ke)=>{n.jb("ConvTranspose",s,{format:R?"NHWC":"NCHW",autoPad:l,dilations:Array.from(C().subarray(Number(h)>>>0,2+(Number(h)>>>0)>>>0)),group:y,kernelShape:Array.from(C().subarray(Number(w)>>>0,2+(Number(w)>>>0)>>>0)),pads:Array.from(C().subarray(Number(A)>>>0,4+(Number(A)>>>0)>>>0)),strides:Array.from(C().subarray(Number(B)>>>0,2+(Number(B)>>>0)>>>0)),wIsConst:()=>!!ue()[G>>>0],outputPadding:K?Array.from(C().subarray(Number(K)>>>0,Number(ae)>>>0)):[],outputShape:le?Array.from(C().subarray(Number(le)>>>0,Number(_e)>>>0)):[],activation:Te(ke)})},836520:(s,l,h,y,w,A,B,R,G,K,ae,le,_e,ke,Bt)=>{n.jb("ConvTranspose",s,{format:G?"NHWC":"NCHW",autoPad:l,dilations:[h],group:y,kernelShape:[w],pads:[A,B],strides:[R],wIsConst:()=>!!ue()[K>>>0],outputPadding:ae?Array.from(C().subarray(Number(ae)>>>0,Number(le)>>>0)):[],outputShape:_e?Array.from(C().subarray(Number(_e)>>>0,Number(ke)>>>0)):[],activation:Te(Bt)})},836953:(s,l,h,y,w,A,B,R,G,K,ae,le,_e,ke)=>{n.jb("ConvTranspose",s,{format:R?"NHWC":"NCHW",autoPad:l,dilations:Array.from(C().subarray(Number(h)>>>0,2+(Number(h)>>>0)>>>0)),group:y,kernelShape:Array.from(C().subarray(Number(w)>>>0,2+(Number(w)>>>0)>>>0)),pads:Array.from(C().subarray(Number(A)>>>0,4+(Number(A)>>>0)>>>0)),strides:Array.from(C().subarray(Number(B)>>>0,2+(Number(B)>>>0)>>>0)),wIsConst:()=>!!ue()[G>>>0],outputPadding:K?Array.from(C().subarray(Number(K)>>>0,Number(ae)>>>0)):[],outputShape:le?Array.from(C().subarray(Number(le)>>>0,Number(_e)>>>0)):[],activation:Te(ke)})},837614:(s,l)=>{n.jb("GlobalAveragePool",s,{format:l?"NHWC":"NCHW"})},837705:(s,l,h,y,w,A,B,R,G,K,ae,le,_e,ke)=>{n.jb("AveragePool",s,{format:ke?"NHWC":"NCHW",auto_pad:l,ceil_mode:h,count_include_pad:y,storage_order:w,dilations:A?Array.from(C().subarray(Number(A)>>>0,Number(B)>>>0)):[],kernel_shape:R?Array.from(C().subarray(Number(R)>>>0,Number(G)>>>0)):[],pads:K?Array.from(C().subarray(Number(K)>>>0,Number(ae)>>>0)):[],strides:le?Array.from(C().subarray(Number(le)>>>0,Number(_e)>>>0)):[]})},838184:(s,l)=>{n.jb("GlobalAveragePool",s,{format:l?"NHWC":"NCHW"})},838275:(s,l,h,y,w,A,B,R,G,K,ae,le,_e,ke)=>{n.jb("AveragePool",s,{format:ke?"NHWC":"NCHW",auto_pad:l,ceil_mode:h,count_include_pad:y,storage_order:w,dilations:A?Array.from(C().subarray(Number(A)>>>0,Number(B)>>>0)):[],kernel_shape:R?Array.from(C().subarray(Number(R)>>>0,Number(G)>>>0)):[],pads:K?Array.from(C().subarray(Number(K)>>>0,Number(ae)>>>0)):[],strides:le?Array.from(C().subarray(Number(le)>>>0,Number(_e)>>>0)):[]})},838754:(s,l)=>{n.jb("GlobalMaxPool",s,{format:l?"NHWC":"NCHW"})},838841:(s,l,h,y,w,A,B,R,G,K,ae,le,_e,ke)=>{n.jb("MaxPool",s,{format:ke?"NHWC":"NCHW",auto_pad:l,ceil_mode:h,count_include_pad:y,storage_order:w,dilations:A?Array.from(C().subarray(Number(A)>>>0,Number(B)>>>0)):[],kernel_shape:R?Array.from(C().subarray(Number(R)>>>0,Number(G)>>>0)):[],pads:K?Array.from(C().subarray(Number(K)>>>0,Number(ae)>>>0)):[],strides:le?Array.from(C().subarray(Number(le)>>>0,Number(_e)>>>0)):[]})},839316:(s,l)=>{n.jb("GlobalMaxPool",s,{format:l?"NHWC":"NCHW"})},839403:(s,l,h,y,w,A,B,R,G,K,ae,le,_e,ke)=>{n.jb("MaxPool",s,{format:ke?"NHWC":"NCHW",auto_pad:l,ceil_mode:h,count_include_pad:y,storage_order:w,dilations:A?Array.from(C().subarray(Number(A)>>>0,Number(B)>>>0)):[],kernel_shape:R?Array.from(C().subarray(Number(R)>>>0,Number(G)>>>0)):[],pads:K?Array.from(C().subarray(Number(K)>>>0,Number(ae)>>>0)):[],strides:le?Array.from(C().subarray(Number(le)>>>0,Number(_e)>>>0)):[]})},839878:(s,l,h,y,w)=>{n.jb("Gemm",s,{alpha:l,beta:h,transA:y,transB:w})},839982:s=>{n.jb("MatMul",s,void 0)},840036:(s,l,h,y)=>{n.jb("ArgMax",s,{keepDims:!!l,selectLastIndex:!!h,axis:y})},840144:(s,l,h,y)=>{n.jb("ArgMin",s,{keepDims:!!l,selectLastIndex:!!h,axis:y})},840252:(s,l)=>{n.jb("Softmax",s,{axis:l})},840315:(s,l)=>{n.jb("Concat",s,{axis:l})},840375:(s,l,h,y,w)=>{n.jb("Split",s,{axis:l,numOutputs:h,splitSizes:y?Array.from(C().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},840531:s=>{n.jb("Expand",s,void 0)},840585:(s,l)=>{n.jb("Gather",s,{axis:Number(l)})},840656:(s,l)=>{n.jb("GatherElements",s,{axis:Number(l)})},840735:(s,l)=>{n.jb("GatherND",s,{batch_dims:Number(l)})},840814:(s,l,h,y,w,A,B,R,G,K,ae)=>{n.jb("Resize",s,{antialias:l,axes:h?Array.from(C().subarray(Number(h)>>>0,Number(y)>>>0)):[],coordinateTransformMode:Te(w),cubicCoeffA:A,excludeOutside:B,extrapolationValue:R,keepAspectRatioPolicy:Te(G),mode:Te(K),nearestMode:Te(ae)})},841176:(s,l,h,y,w,A,B)=>{n.jb("Slice",s,{starts:l?Array.from(C().subarray(Number(l)>>>0,Number(h)>>>0)):[],ends:y?Array.from(C().subarray(Number(y)>>>0,Number(w)>>>0)):[],axes:A?Array.from(C().subarray(Number(A)>>>0,Number(B)>>>0)):[]})},841440:s=>{n.jb("Tile",s,void 0)},841492:(s,l,h)=>{n.jb("InstanceNormalization",s,{epsilon:l,format:h?"NHWC":"NCHW"})},841606:(s,l,h)=>{n.jb("InstanceNormalization",s,{epsilon:l,format:h?"NHWC":"NCHW"})},841720:s=>{n.jb("Range",s,void 0)},841773:(s,l)=>{n.jb("Einsum",s,{equation:Te(l)})},841854:(s,l,h,y,w)=>{n.jb("Pad",s,{mode:l,value:h,pads:y?Array.from(C().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},841997:(s,l,h,y,w,A)=>{n.jb("BatchNormalization",s,{epsilon:l,momentum:h,spatial:!!w,trainingMode:!!y,format:A?"NHWC":"NCHW"})},842166:(s,l,h,y,w,A)=>{n.jb("BatchNormalization",s,{epsilon:l,momentum:h,spatial:!!w,trainingMode:!!y,format:A?"NHWC":"NCHW"})},842335:(s,l,h)=>{n.jb("CumSum",s,{exclusive:Number(l),reverse:Number(h)})},842432:(s,l,h)=>{n.jb("DequantizeLinear",s,{axis:l,blockSize:h})},842522:(s,l,h,y,w)=>{n.jb("GridSample",s,{align_corners:l,mode:Te(h),padding_mode:Te(y),format:w?"NHWC":"NCHW"})},842692:(s,l,h,y,w)=>{n.jb("GridSample",s,{align_corners:l,mode:Te(h),padding_mode:Te(y),format:w?"NHWC":"NCHW"})},842862:(s,l)=>{n.jb("ScatterND",s,{reduction:Te(l)})},842947:(s,l,h,y,w,A,B,R,G)=>{n.jb("Attention",s,{numHeads:l,isUnidirectional:h,maskFilterValue:y,scale:w,doRotary:A,qkvHiddenSizes:B?Array.from(C().subarray(Number(R)>>>0,Number(R)+B>>>0)):[],pastPresentShareBuffer:!!G})},843219:s=>{n.jb("BiasAdd",s,void 0)},843274:s=>{n.jb("BiasSplitGelu",s,void 0)},843335:s=>{n.jb("FastGelu",s,void 0)},843391:(s,l,h,y,w,A,B,R,G,K,ae,le,_e,ke,Bt,Rp)=>{n.jb("Conv",s,{format:le?"NHWC":"NCHW",auto_pad:l,dilations:h?Array.from(C().subarray(Number(h)>>>0,Number(y)>>>0)):[],group:w,kernel_shape:A?Array.from(C().subarray(Number(A)>>>0,Number(B)>>>0)):[],pads:R?Array.from(C().subarray(Number(R)>>>0,Number(G)>>>0)):[],strides:K?Array.from(C().subarray(Number(K)>>>0,Number(ae)>>>0)):[],w_is_const:()=>!!ue()[Number(_e)>>>0],activation:Te(ke),activation_params:Bt?Array.from(de().subarray(Number(Bt)>>>0,Number(Rp)>>>0)):[]})},843975:s=>{n.jb("Gelu",s,void 0)},844027:(s,l,h,y,w,A,B,R,G)=>{n.jb("GroupQueryAttention",s,{numHeads:l,kvNumHeads:h,scale:y,softcap:w,doRotary:A,rotaryInterleaved:B,smoothSoftmax:R,localWindowSize:G})},844244:(s,l,h,y)=>{n.jb("LayerNormalization",s,{axis:l,epsilon:h,simplified:!!y})},844355:(s,l,h,y)=>{n.jb("LayerNormalization",s,{axis:l,epsilon:h,simplified:!!y})},844466:(s,l,h,y,w,A)=>{n.jb("MatMulNBits",s,{k:l,n:h,accuracyLevel:y,bits:w,blockSize:A})},844593:(s,l,h,y,w,A)=>{n.jb("MultiHeadAttention",s,{numHeads:l,isUnidirectional:h,maskFilterValue:y,scale:w,doRotary:A})},844752:(s,l)=>{n.jb("QuickGelu",s,{alpha:l})},844816:(s,l,h,y,w)=>{n.jb("RotaryEmbedding",s,{interleaved:!!l,numHeads:h,rotaryEmbeddingDim:y,scale:w})},844955:(s,l,h)=>{n.jb("SkipLayerNormalization",s,{epsilon:l,simplified:!!h})},845057:(s,l,h)=>{n.jb("SkipLayerNormalization",s,{epsilon:l,simplified:!!h})},845159:(s,l,h,y)=>{n.jb("GatherBlockQuantized",s,{gatherAxis:l,quantizeAxis:h,blockSize:y})},845280:s=>{n.Zb(s)},845314:(s,l)=>n.ac(Number(s),Number(l),n.Fb.dc,n.Fb.errors)};function bc(s,l,h){return mi(async()=>{await n.Xb(Number(s),Number(l),Number(h))})}function yc(){return typeof wasmOffsetConverter<"u"}class pn{name="ExitStatus";constructor(l){this.message=`Program terminated with exit(${l})`,this.status=l}}var Bo=s=>{s.terminate(),s.onmessage=()=>{}},mn=[],Do=s=>{ct.length==0&&(Wo(),Vo(ct[0]));var l=ct.pop();if(!l)return 6;Gt.push(l),wt[s.Ab]=l,l.Ab=s.Ab;var h={Bb:"run",fc:s.ec,Hb:s.Hb,Ab:s.Ab};return l.postMessage(h,s.Mb),0},lt=0,xe=(s,l,...h)=>{for(var y=2*h.length,w=Pn(),A=kn(8*y),B=A>>>3,R=0;R<h.length;R++){var G=h[R];typeof G=="bigint"?(Z[B+2*R]=1n,Z[B+2*R+1]=G):(Z[B+2*R]=0n,ze()[B+2*R+1>>>0]=G)}return s=Di(s,0,y,A,l),mr(w),s};function fn(s){if(u)return xe(0,1,s);if(I=s,!(0<lt)){for(var l of Gt)Bo(l);for(l of ct)Bo(l);ct=[],Gt=[],wt={},te=!0}g(0,new pn(s))}function Mo(s){if(u)return xe(1,0,s);hn(s)}var hn=s=>{if(I=s,u)throw Mo(s),"unwind";fn(s)},ct=[],Gt=[],Ro=[],wt={},Uo=s=>{var l=s.Ab;delete wt[l],ct.push(s),Gt.splice(Gt.indexOf(s),1),s.Ab=0,Mi(l)};function No(){Ro.forEach(s=>s())}var Vo=s=>new Promise(l=>{s.onmessage=w=>{var A=(w=w.data).Bb;if(w.Gb&&w.Gb!=cr()){var B=wt[w.Gb];B?B.postMessage(w,w.Mb):x(`Internal error! Worker sent a message "${A}" to target pthread ${w.Gb}, but that thread no longer exists!`)}else A==="checkMailbox"?nr():A==="spawnThread"?Do(w):A==="cleanupThread"?Uo(wt[w.hc]):A==="loaded"?(s.loaded=!0,l(s)):A==="alert"?alert(`Thread ${w.ic}: ${w.text}`):w.target==="setimmediate"?s.postMessage(w):A==="callHandler"?n[w.Qb](...w.args):A&&x(`worker sent an unknown command ${A}`)},s.onerror=w=>{throw x(`worker sent an error! ${w.filename}:${w.lineno}: ${w.message}`),w};var h,y=[];for(h of[])n.propertyIsEnumerable(h)&&y.push(h);s.postMessage({Bb:"load",Rb:y,kc:T,lc:E})});function Wo(){var s=new Worker((()=>{let l=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new l("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});ct.push(s)}var _c=s=>{Ce();var l=V()[s+52>>>2>>>0];s=V()[s+56>>>2>>>0],Ni(l,l-s),mr(l)},wc=(s,l)=>{lt=0,s=Vi(s,l),0<lt?I=s:En(s)};class vc{constructor(l){this.Ib=l-24}}function $c(s,l,h){var y=new vc(s>>>=0);throw l>>>=0,h>>>=0,V()[y.Ib+16>>>2>>>0]=0,V()[y.Ib+4>>>2>>>0]=l,V()[y.Ib+8>>>2>>>0]=h,s}function Lo(s,l,h,y){return u?xe(2,1,s,l,h,y):Go(s,l,h,y)}function Go(s,l,h,y){if(s>>>=0,h>>>=0,y>>>=0,d===void 0)return 6;var w=[];return u&&w.length===0?Lo(s,l>>>=0,h,y):(s={ec:h,Ab:s,Hb:y,Mb:w},u?(s.Bb="spawnThread",postMessage(s,w),0):Do(s))}var Ho=typeof TextDecoder<"u"?new TextDecoder:void 0,Fo=(s,l=0,h=NaN)=>{var y=(l>>>=0)+h;for(h=l;s[h]&&!(h>=y);)++h;if(16<h-l&&s.buffer&&Ho)return Ho.decode(s.buffer instanceof ArrayBuffer?s.subarray(l,h):s.slice(l,h));for(y="";l<h;){var w=s[l++];if(128&w){var A=63&s[l++];if((224&w)==192)y+=String.fromCharCode((31&w)<<6|A);else{var B=63&s[l++];65536>(w=(240&w)==224?(15&w)<<12|A<<6|B:(7&w)<<18|A<<12|B<<6|63&s[l++])?y+=String.fromCharCode(w):(w-=65536,y+=String.fromCharCode(55296|w>>10,56320|1023&w))}}else y+=String.fromCharCode(w)}return y},Te=(s,l)=>(s>>>=0)?Fo(he(),s,l):"";function qo(s,l,h){return u?xe(3,1,s,l,h):0}function jo(s,l){if(u)return xe(4,1,s,l)}var Ko=s=>{for(var l=0,h=0;h<s.length;++h){var y=s.charCodeAt(h);127>=y?l++:2047>=y?l+=2:55296<=y&&57343>=y?(l+=4,++h):l+=3}return l},zt=(s,l,h)=>{var y=he();if(l>>>=0,0<h){var w=l;h=l+h-1;for(var A=0;A<s.length;++A){var B=s.charCodeAt(A);if(55296<=B&&57343>=B&&(B=65536+((1023&B)<<10)|1023&s.charCodeAt(++A)),127>=B){if(l>=h)break;y[l++>>>0]=B}else{if(2047>=B){if(l+1>=h)break;y[l++>>>0]=192|B>>6}else{if(65535>=B){if(l+2>=h)break;y[l++>>>0]=224|B>>12}else{if(l+3>=h)break;y[l++>>>0]=240|B>>18,y[l++>>>0]=128|B>>12&63}y[l++>>>0]=128|B>>6&63}y[l++>>>0]=128|63&B}}y[l>>>0]=0,s=l-w}else s=0;return s};function Zo(s,l){if(u)return xe(5,1,s,l)}function Qo(s,l,h){if(u)return xe(6,1,s,l,h)}function Yo(s,l,h){return u?xe(7,1,s,l,h):0}function Xo(s,l){if(u)return xe(8,1,s,l)}function Jo(s,l,h){if(u)return xe(9,1,s,l,h)}function ei(s,l,h,y){if(u)return xe(10,1,s,l,h,y)}function ti(s,l,h,y){if(u)return xe(11,1,s,l,h,y)}function ri(s,l,h,y){if(u)return xe(12,1,s,l,h,y)}function ni(s){if(u)return xe(13,1,s)}function oi(s,l){if(u)return xe(14,1,s,l)}function ii(s,l,h){if(u)return xe(15,1,s,l,h)}var ai,pt,xc=()=>dt(""),Ke=s=>{for(var l="";he()[s>>>0];)l+=ai[he()[s++>>>0]];return l},gn={},bn={},Sc={};function it(s,l,h={}){return function(y,w,A={}){var B=w.name;if(!y)throw new pt(`type "${B}" must have a positive integer typeid pointer`);if(bn.hasOwnProperty(y)){if(A.Sb)return;throw new pt(`Cannot register type '${B}' twice`)}bn[y]=w,delete Sc[y],gn.hasOwnProperty(y)&&(w=gn[y],delete gn[y],w.forEach(R=>R()))}(s,l,h)}var si=(s,l,h)=>{switch(l){case 1:return h?y=>ue()[y>>>0]:y=>he()[y>>>0];case 2:return h?y=>ye()[y>>>1>>>0]:y=>re()[y>>>1>>>0];case 4:return h?y=>C()[y>>>2>>>0]:y=>V()[y>>>2>>>0];case 8:return h?y=>Z[y>>>3]:y=>we[y>>>3];default:throw new TypeError(`invalid integer width (${l}): ${s}`)}};function Tc(s,l,h){h>>>=0,it(s>>>=0,{name:l=Ke(l>>>0),fromWireType:y=>y,toWireType:function(y,w){if(typeof w!="bigint"&&typeof w!="number")throw w=w===null?"null":(y=typeof w)=="object"||y==="array"||y==="function"?w.toString():""+w,new TypeError(`Cannot convert "${w}" to ${this.name}`);return typeof w=="number"&&(w=BigInt(w)),w},Cb:mt,readValueFromPointer:si(l,h,l.indexOf("u")==-1),Db:null})}var mt=8;function Ic(s,l,h,y){it(s>>>=0,{name:l=Ke(l>>>0),fromWireType:function(w){return!!w},toWireType:function(w,A){return A?h:y},Cb:mt,readValueFromPointer:function(w){return this.fromWireType(he()[w>>>0])},Db:null})}var yn=[],at=[];function _n(s){9<(s>>>=0)&&--at[s+1]==0&&(at[s]=void 0,yn.push(s))}var De=s=>{if(!s)throw new pt("Cannot use deleted val. handle = "+s);return at[s]},Ve=s=>{switch(s){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let l=yn.pop()||at.length;return at[l]=s,at[l+1]=1,l}};function wn(s){return this.fromWireType(V()[s>>>2>>>0])}var Cc={name:"emscripten::val",fromWireType:s=>{var l=De(s);return _n(s),l},toWireType:(s,l)=>Ve(l),Cb:mt,readValueFromPointer:wn,Db:null};function Ac(s){return it(s>>>0,Cc)}var Ec=(s,l)=>{switch(l){case 4:return function(h){return this.fromWireType(de()[h>>>2>>>0])};case 8:return function(h){return this.fromWireType(ze()[h>>>3>>>0])};default:throw new TypeError(`invalid float width (${l}): ${s}`)}};function kc(s,l,h){h>>>=0,it(s>>>=0,{name:l=Ke(l>>>0),fromWireType:y=>y,toWireType:(y,w)=>w,Cb:mt,readValueFromPointer:Ec(l,h),Db:null})}function Pc(s,l,h,y,w){if(s>>>=0,h>>>=0,l=Ke(l>>>0),w===-1&&(w=4294967295),w=R=>R,y===0){var A=32-8*h;w=R=>R<<A>>>A}var B=l.includes("unsigned")?function(R,G){return G>>>0}:function(R,G){return G};it(s,{name:l,fromWireType:w,toWireType:B,Cb:mt,readValueFromPointer:si(l,h,y!==0),Db:null})}function zc(s,l,h){function y(A){var B=V()[A>>>2>>>0];return A=V()[A+4>>>2>>>0],new w(ue().buffer,A,B)}var w=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][l];it(s>>>=0,{name:h=Ke(h>>>0),fromWireType:y,Cb:mt,readValueFromPointer:y},{Sb:!0})}function Oc(s,l){it(s>>>=0,{name:l=Ke(l>>>0),fromWireType:function(h){for(var y,w=V()[h>>>2>>>0],A=h+4,B=A,R=0;R<=w;++R){var G=A+R;R!=w&&he()[G>>>0]!=0||(B=Te(B,G-B),y===void 0?y=B:(y+="\0",y+=B),B=G+1)}return Qe(h),y},toWireType:function(h,y){y instanceof ArrayBuffer&&(y=new Uint8Array(y));var w=typeof y=="string";if(!(w||y instanceof Uint8Array||y instanceof Uint8ClampedArray||y instanceof Int8Array))throw new pt("Cannot pass non-string to std::string");var A=w?Ko(y):y.length,B=pr(4+A+1),R=B+4;if(V()[B>>>2>>>0]=A,w)zt(y,R,A+1);else if(w)for(w=0;w<A;++w){var G=y.charCodeAt(w);if(255<G)throw Qe(B),new pt("String has UTF-16 code units that do not fit in 8 bits");he()[R+w>>>0]=G}else for(w=0;w<A;++w)he()[R+w>>>0]=y[w];return h!==null&&h.push(Qe,B),B},Cb:mt,readValueFromPointer:wn,Db(h){Qe(h)}})}var ui=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Bc=(s,l)=>{for(var h=s>>1,y=h+l/2;!(h>=y)&&re()[h>>>0];)++h;if(32<(h<<=1)-s&&ui)return ui.decode(he().slice(s,h));for(h="",y=0;!(y>=l/2);++y){var w=ye()[s+2*y>>>1>>>0];if(w==0)break;h+=String.fromCharCode(w)}return h},Dc=(s,l,h)=>{if(h??=2147483647,2>h)return 0;var y=l;h=(h-=2)<2*s.length?h/2:s.length;for(var w=0;w<h;++w){var A=s.charCodeAt(w);ye()[l>>>1>>>0]=A,l+=2}return ye()[l>>>1>>>0]=0,l-y},Mc=s=>2*s.length,Rc=(s,l)=>{for(var h=0,y="";!(h>=l/4);){var w=C()[s+4*h>>>2>>>0];if(w==0)break;++h,65536<=w?(w-=65536,y+=String.fromCharCode(55296|w>>10,56320|1023&w)):y+=String.fromCharCode(w)}return y},Uc=(s,l,h)=>{if(l>>>=0,h??=2147483647,4>h)return 0;var y=l;h=y+h-4;for(var w=0;w<s.length;++w){var A=s.charCodeAt(w);if(55296<=A&&57343>=A&&(A=65536+((1023&A)<<10)|1023&s.charCodeAt(++w)),C()[l>>>2>>>0]=A,(l+=4)+4>h)break}return C()[l>>>2>>>0]=0,l-y},Nc=s=>{for(var l=0,h=0;h<s.length;++h){var y=s.charCodeAt(h);55296<=y&&57343>=y&&++h,l+=4}return l};function Vc(s,l,h){if(s>>>=0,l>>>=0,h=Ke(h>>>=0),l===2)var y=Bc,w=Dc,A=Mc,B=R=>re()[R>>>1>>>0];else l===4&&(y=Rc,w=Uc,A=Nc,B=R=>V()[R>>>2>>>0]);it(s,{name:h,fromWireType:R=>{for(var G,K=V()[R>>>2>>>0],ae=R+4,le=0;le<=K;++le){var _e=R+4+le*l;le!=K&&B(_e)!=0||(ae=y(ae,_e-ae),G===void 0?G=ae:(G+="\0",G+=ae),ae=_e+l)}return Qe(R),G},toWireType:(R,G)=>{if(typeof G!="string")throw new pt(`Cannot pass non-string to C++ string type ${h}`);var K=A(G),ae=pr(4+K+l);return V()[ae>>>2>>>0]=K/l,w(G,ae+4,K+l),R!==null&&R.push(Qe,ae),ae},Cb:mt,readValueFromPointer:wn,Db(R){Qe(R)}})}function Wc(s,l){it(s>>>=0,{Tb:!0,name:l=Ke(l>>>0),Cb:0,fromWireType:()=>{},toWireType:()=>{}})}function Lc(s){An(s>>>0,!a,1,!i,131072,!1),No()}var vn=s=>{if(!te)try{if(s(),!(0<lt))try{u?En(I):hn(I)}catch(l){l instanceof pn||l=="unwind"||g(0,l)}}catch(l){l instanceof pn||l=="unwind"||g(0,l)}};function $n(s){s>>>=0,typeof Atomics.jc=="function"&&(Atomics.jc(C(),s>>>2,s).value.then(nr),s+=128,Atomics.store(C(),s>>>2,1))}var nr=()=>{var s=cr();s&&($n(s),vn(Ui))};function Gc(s,l){(s>>>=0)==l>>>0?setTimeout(nr):u?postMessage({Gb:s,Bb:"checkMailbox"}):(s=wt[s])&&s.postMessage({Bb:"checkMailbox"})}var xn=[];function Hc(s,l,h,y,w){for(l>>>=0,y/=2,xn.length=y,h=w>>>0>>>3,w=0;w<y;w++)xn[w]=Z[h+2*w]?Z[h+2*w+1]:ze()[h+2*w+1>>>0];return(l?cn[l]:Mp[s])(...xn)}var Fc=()=>{lt=0};function qc(s){s>>>=0,u?postMessage({Bb:"cleanupThread",hc:s}):Uo(wt[s])}function jc(s){}var or=(s,l)=>{var h=bn[s];if(h===void 0)throw s=zi(s),h=Ke(s),Qe(s),new pt(`${l} has unknown type ${h}`);return h},di=(s,l,h)=>{var y=[];return s=s.toWireType(y,h),y.length&&(V()[l>>>2>>>0]=Ve(y)),s};function Kc(s,l,h){return l>>>=0,h>>>=0,s=De(s>>>0),l=or(l,"emval::as"),di(l,h,s)}function Zc(s,l){return l>>>=0,s=De(s>>>0),(l=or(l,"emval::as")).toWireType(null,s)}var ir=s=>{try{s()}catch(l){dt(l)}},ft=0,Ze=null,li=0,ar=[],ci={},pi={},Qc=0,Sn=null,Yc=[];function mi(s){return function(l){if(!te){if(ft===0){var h=!1,y=!1;l((w=0)=>{if(!te&&(li=w,h=!0,y)){ft=2,ir(()=>Gi(Ze)),typeof MainLoop<"u"&&MainLoop.Pb&&MainLoop.resume(),w=!1;try{var A=function(){var G=C()[Ze+8>>>2>>>0];return G=Y[pi[G]],--lt,G()}()}catch(G){A=G,w=!0}var B=!1;if(!Ze){var R=Sn;R&&(Sn=null,(w?R.reject:R.resolve)(A),B=!0)}if(w&&!B)throw A}}),y=!0,h||(ft=1,Ze=function(){var w=pr(65548),A=w+12;V()[w>>>2>>>0]=A,V()[w+4>>>2>>>0]=A+65536,A=ar[0];var B=ci[A];return B===void 0&&(B=Qc++,ci[A]=B,pi[B]=A),A=B,C()[w+8>>>2>>>0]=A,w}(),typeof MainLoop<"u"&&MainLoop.Pb&&MainLoop.pause(),ir(()=>Wi(Ze)))}else ft===2?(ft=0,ir(Hi),Qe(Ze),Ze=null,Yc.forEach(vn)):dt(`invalid state: ${ft}`);return li}}(l=>{s().then(l)})}function Xc(s){return s>>>=0,mi(async()=>{var l=await De(s);return Ve(l)})}var sr=[];function Jc(s,l,h,y){return h>>>=0,y>>>=0,(s=sr[s>>>0])(null,l=De(l>>>0),h,y)}var ep={},ur=s=>{var l=ep[s];return l===void 0?Ke(s):l};function tp(s,l,h,y,w){return h>>>=0,y>>>=0,w>>>=0,(s=sr[s>>>0])(l=De(l>>>0),l[h=ur(h)],y,w)}var fi=()=>typeof globalThis=="object"?globalThis:Function("return this")();function rp(s){return(s>>>=0)==0?Ve(fi()):(s=ur(s),Ve(fi()[s]))}var np=s=>{var l=sr.length;return sr.push(s),l},op=(s,l)=>{for(var h=Array(s),y=0;y<s;++y)h[y]=or(V()[l+4*y>>>2>>>0],"parameter "+y);return h},hi=(s,l)=>Object.defineProperty(l,"name",{value:s});function ip(s,l,h){var y=(l=op(s,l>>>0)).shift();s--;var w=`return function (obj, func, destructorsRef, args) {
`,A=0,B=[];h===0&&B.push("obj");for(var R=["retType"],G=[y],K=0;K<s;++K)B.push("arg"+K),R.push("argType"+K),G.push(l[K]),w+=`  var arg${K} = argType${K}.readValueFromPointer(args${A?"+"+A:""});
`,A+=l[K].Cb;return w+=`  var rv = ${h===1?"new func":"func.call"}(${B.join(", ")});
`,y.Tb||(R.push("emval_returnValue"),G.push(di),w+=`  return emval_returnValue(retType, destructorsRef, rv);
`),R.push(w+`};
`),s=function(ae){var le=Function;if(!(le instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof le} which is not a function`);var _e=hi(le.name||"unknownFunctionName",function(){});return _e.prototype=le.prototype,_e=new _e,(ae=le.apply(_e,ae))instanceof Object?ae:_e}(R)(...G),h=`methodCaller<(${l.map(ae=>ae.name).join(", ")}) => ${y.name}>`,np(hi(h,s))}function ap(s){return s=ur(s>>>0),Ve(n[s])}function sp(s,l){return l>>>=0,s=De(s>>>0),l=De(l),Ve(s[l])}function up(s){9<(s>>>=0)&&(at[s+1]+=1)}function dp(){return Ve([])}function lp(s){s=De(s>>>0);for(var l=Array(s.length),h=0;h<s.length;h++)l[h]=s[h];return Ve(l)}function cp(s){return Ve(ur(s>>>0))}function pp(){return Ve({})}function mp(s){for(var l=De(s>>>=0);l.length;){var h=l.pop();l.pop()(h)}_n(s)}function fp(s,l,h){l>>>=0,h>>>=0,s=De(s>>>0),l=De(l),h=De(h),s[l]=h}function hp(s,l){return l>>>=0,s=(s=or(s>>>0,"_emval_take_value")).readValueFromPointer(l),Ve(s)}function gp(s,l){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),l>>>=0,s=new Date(1e3*s),C()[l>>>2>>>0]=s.getUTCSeconds(),C()[l+4>>>2>>>0]=s.getUTCMinutes(),C()[l+8>>>2>>>0]=s.getUTCHours(),C()[l+12>>>2>>>0]=s.getUTCDate(),C()[l+16>>>2>>>0]=s.getUTCMonth(),C()[l+20>>>2>>>0]=s.getUTCFullYear()-1900,C()[l+24>>>2>>>0]=s.getUTCDay(),s=(s.getTime()-Date.UTC(s.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,C()[l+28>>>2>>>0]=s}var gi=s=>s%4==0&&(s%100!=0||s%400==0),bi=[0,31,60,91,121,152,182,213,244,274,305,335],yi=[0,31,59,90,120,151,181,212,243,273,304,334];function bp(s,l){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),l>>>=0,s=new Date(1e3*s),C()[l>>>2>>>0]=s.getSeconds(),C()[l+4>>>2>>>0]=s.getMinutes(),C()[l+8>>>2>>>0]=s.getHours(),C()[l+12>>>2>>>0]=s.getDate(),C()[l+16>>>2>>>0]=s.getMonth(),C()[l+20>>>2>>>0]=s.getFullYear()-1900,C()[l+24>>>2>>>0]=s.getDay();var h=(gi(s.getFullYear())?bi:yi)[s.getMonth()]+s.getDate()-1|0;C()[l+28>>>2>>>0]=h,C()[l+36>>>2>>>0]=-60*s.getTimezoneOffset(),h=new Date(s.getFullYear(),6,1).getTimezoneOffset();var y=new Date(s.getFullYear(),0,1).getTimezoneOffset();s=0|(h!=y&&s.getTimezoneOffset()==Math.min(y,h)),C()[l+32>>>2>>>0]=s}function yp(s){s>>>=0;var l=new Date(C()[s+20>>>2>>>0]+1900,C()[s+16>>>2>>>0],C()[s+12>>>2>>>0],C()[s+8>>>2>>>0],C()[s+4>>>2>>>0],C()[s>>>2>>>0],0),h=C()[s+32>>>2>>>0],y=l.getTimezoneOffset(),w=new Date(l.getFullYear(),6,1).getTimezoneOffset(),A=new Date(l.getFullYear(),0,1).getTimezoneOffset(),B=Math.min(A,w);return 0>h?C()[s+32>>>2>>>0]=+(w!=A&&B==y):0<h!=(B==y)&&(w=Math.max(A,w),l.setTime(l.getTime()+6e4*((0<h?B:w)-y))),C()[s+24>>>2>>>0]=l.getDay(),h=(gi(l.getFullYear())?bi:yi)[l.getMonth()]+l.getDate()-1|0,C()[s+28>>>2>>>0]=h,C()[s>>>2>>>0]=l.getSeconds(),C()[s+4>>>2>>>0]=l.getMinutes(),C()[s+8>>>2>>>0]=l.getHours(),C()[s+12>>>2>>>0]=l.getDate(),C()[s+16>>>2>>>0]=l.getMonth(),C()[s+20>>>2>>>0]=l.getYear(),s=l.getTime(),BigInt(isNaN(s)?-1:s/1e3)}function _i(s,l,h,y,w,A,B){return u?xe(16,1,s,l,h,y,w,A,B):-52}function wi(s,l,h,y,w,A){if(u)return xe(17,1,s,l,h,y,w,A)}var Ht={},_p=()=>performance.timeOrigin+performance.now();function vi(s,l){if(u)return xe(18,1,s,l);if(Ht[s]&&(clearTimeout(Ht[s].id),delete Ht[s]),!l)return 0;var h=setTimeout(()=>{delete Ht[s],vn(()=>Ri(s,performance.timeOrigin+performance.now()))},l);return Ht[s]={id:h,qc:l},0}function wp(s,l,h,y){s>>>=0,l>>>=0,h>>>=0,y>>>=0;var w=new Date().getFullYear(),A=new Date(w,0,1).getTimezoneOffset();w=new Date(w,6,1).getTimezoneOffset();var B=Math.max(A,w);V()[s>>>2>>>0]=60*B,C()[l>>>2>>>0]=+(A!=w),s=(l=R=>{var G=Math.abs(R);return`UTC${0<=R?"-":"+"}${String(Math.floor(G/60)).padStart(2,"0")}${String(G%60).padStart(2,"0")}`})(A),l=l(w),w<A?(zt(s,h,17),zt(l,y,17)):(zt(s,y,17),zt(l,h,17))}var vp=()=>Date.now(),$p=1;function xp(s,l,h){if(!(0<=s&&3>=s))return 28;if(s===0)s=Date.now();else{if(!$p)return 52;s=performance.timeOrigin+performance.now()}return Z[h>>>0>>>3]=BigInt(Math.round(1e6*s)),0}var Tn=[],$i=(s,l)=>{Tn.length=0;for(var h;h=he()[s++>>>0];){var y=h!=105;l+=(y&=h!=112)&&l%8?4:0,Tn.push(h==112?V()[l>>>2>>>0]:h==106?Z[l>>>3]:h==105?C()[l>>>2>>>0]:ze()[l>>>3>>>0]),l+=y?8:4}return Tn};function Sp(s,l,h){return s>>>=0,l=$i(l>>>0,h>>>0),cn[s](...l)}function Tp(s,l,h){return s>>>=0,l=$i(l>>>0,h>>>0),cn[s](...l)}var Ip=()=>{};function Cp(s,l){return x(Te(s>>>0,l>>>0))}var Ap=()=>{throw lt+=1,"unwind"};function Ep(){return 4294901760}var kp=()=>navigator.hardwareConcurrency;function Pp(){return dt("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function zp(s){s>>>=0;var l=he().length;if(s<=l||4294901760<s)return!1;for(var h=1;4>=h;h*=2){var y=l*(1+.2/h);y=Math.min(y,s+100663296);e:{y=(Math.min(4294901760,65536*Math.ceil(Math.max(s,y)/65536))-T.buffer.byteLength+65535)/65536|0;try{T.grow(y),Ce();var w=1;break e}catch{}w=void 0}if(w)return!0}return!1}var dr=()=>(dt("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Ot={},xi=s=>{s.forEach(l=>{var h=dr();h&&(Ot[h]=l)})};function Op(){var s=Error().stack.toString().split(`
`);return s[0]=="Error"&&s.shift(),xi(s),Ot.Lb=dr(),Ot.cc=s,Ot.Lb}function Bp(s,l,h){if(s>>>=0,l>>>=0,Ot.Lb==s)var y=Ot.cc;else(y=Error().stack.toString().split(`
`))[0]=="Error"&&y.shift(),xi(y);for(var w=3;y[w]&&dr()!=s;)++w;for(s=0;s<h&&y[s+w];++s)C()[l+4*s>>>2>>>0]=dr();return s}var In,Cn={},Si=()=>{if(!In){var s,l={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(s in Cn)Cn[s]===void 0?delete l[s]:l[s]=Cn[s];var h=[];for(s in l)h.push(`${s}=${l[s]}`);In=h}return In};function Ti(s,l){if(u)return xe(19,1,s,l);s>>>=0,l>>>=0;var h=0;return Si().forEach((y,w)=>{var A=l+h;for(w=V()[s+4*w>>>2>>>0]=A,A=0;A<y.length;++A)ue()[w++>>>0]=y.charCodeAt(A);ue()[w>>>0]=0,h+=y.length+1}),0}function Ii(s,l){if(u)return xe(20,1,s,l);s>>>=0,l>>>=0;var h=Si();V()[s>>>2>>>0]=h.length;var y=0;return h.forEach(w=>y+=w.length+1),V()[l>>>2>>>0]=y,0}function Ci(s){return u?xe(21,1,s):52}function Ai(s,l,h,y){return u?xe(22,1,s,l,h,y):52}function Ei(s,l,h,y){return u?xe(23,1,s,l,h,y):70}var Dp=[null,[],[]];function ki(s,l,h,y){if(u)return xe(24,1,s,l,h,y);l>>>=0,h>>>=0,y>>>=0;for(var w=0,A=0;A<h;A++){var B=V()[l>>>2>>>0],R=V()[l+4>>>2>>>0];l+=8;for(var G=0;G<R;G++){var K=he()[B+G>>>0],ae=Dp[s];K===0||K===10?((s===1?v:x)(Fo(ae)),ae.length=0):ae.push(K)}w+=R}return V()[y>>>2>>>0]=w,0}u||function(){for(var s=n.numThreads-1;s--;)Wo();mn.unshift(()=>{Pt++,function(l){u?l():Promise.all(ct.map(Vo)).then(l)}(()=>zo())})}();for(var Pi=Array(256),lr=0;256>lr;++lr)Pi[lr]=String.fromCharCode(lr);ai=Pi,pt=n.BindingError=class extends Error{constructor(s){super(s),this.name="BindingError"}},n.InternalError=class extends Error{constructor(s){super(s),this.name="InternalError"}},at.push(0,1,void 0,1,null,1,!0,1,!1,1),n.count_emval_handles=()=>at.length/2-5-yn.length;var Y,Mp=[fn,Mo,Lo,qo,jo,Zo,Qo,Yo,Xo,Jo,ei,ti,ri,ni,oi,ii,_i,wi,vi,Ti,Ii,Ci,Ai,Ei,ki];(async function(){function s(y,w){return Y=y.exports,Y=function(){var A=Y,B={};for(let[R,G]of Object.entries(A))B[R]=typeof G=="function"?(...K)=>{ar.push(R);try{return G(...K)}finally{te||(ar.pop(),Ze&&ft===1&&ar.length===0&&(ft=0,lt+=1,ir(Li),typeof Fibers<"u"&&Fibers.rc()))}}:G;return B}(),Y=function(){var A=Y,B=G=>K=>G(K)>>>0,R=G=>()=>G()>>>0;return(A=Object.assign({},A)).Da=B(A.Da),A.fb=R(A.fb),A.hb=B(A.hb),A.tb=B(A.tb),A.ub=R(A.ub),A.__cxa_get_exception_ptr=B(A.__cxa_get_exception_ptr),A}(),Ro.push(Y.ib),E=w,zo(),Y}Pt++;var l=Oo();if(n.instantiateWasm)return new Promise(y=>{n.instantiateWasm(l,(w,A)=>{s(w,A),y(w.exports)})});if(u)return new Promise(y=>{ve=w=>{var A=new WebAssembly.Instance(w,Oo());y(s(A,w))}});kt??=n.locateFile?n.locateFile?n.locateFile("ort-wasm-simd-threaded.jsep.wasm",_):_+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href;try{var h=await async function(y){var w=kt;if(!j&&typeof WebAssembly.instantiateStreaming=="function"&&!X(w))try{var A=fetch(w,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(A,y)}catch(B){x(`wasm streaming compile failed: ${B}`),x("falling back to ArrayBuffer instantiation")}return async function(B,R){try{var G=await async function(K){if(!j)try{var ae=await m(K);return new Uint8Array(ae)}catch{}if(K==kt&&j)K=new Uint8Array(j);else{if(!f)throw"both async and sync fetching of the wasm failed";K=f(K)}return K}(B);return await WebAssembly.instantiate(G,R)}catch(K){x(`failed to asynchronously prepare wasm: ${K}`),dt(K)}}(w,y)}(l);return s(h.instance,h.module)}catch(y){return r(y),Promise.reject(y)}})();var zi=s=>(zi=Y.Da)(s),Oi=()=>(Oi=Y.Ea)();n._OrtInit=(s,l)=>(n._OrtInit=Y.Fa)(s,l),n._OrtGetLastError=(s,l)=>(n._OrtGetLastError=Y.Ga)(s,l),n._OrtCreateSessionOptions=(s,l,h,y,w,A,B,R,G,K)=>(n._OrtCreateSessionOptions=Y.Ha)(s,l,h,y,w,A,B,R,G,K),n._OrtAppendExecutionProvider=(s,l,h,y,w)=>(n._OrtAppendExecutionProvider=Y.Ia)(s,l,h,y,w),n._OrtAddFreeDimensionOverride=(s,l,h)=>(n._OrtAddFreeDimensionOverride=Y.Ja)(s,l,h),n._OrtAddSessionConfigEntry=(s,l,h)=>(n._OrtAddSessionConfigEntry=Y.Ka)(s,l,h),n._OrtReleaseSessionOptions=s=>(n._OrtReleaseSessionOptions=Y.La)(s),n._OrtCreateSession=(s,l,h)=>(n._OrtCreateSession=Y.Ma)(s,l,h),n._OrtReleaseSession=s=>(n._OrtReleaseSession=Y.Na)(s),n._OrtGetInputOutputCount=(s,l,h)=>(n._OrtGetInputOutputCount=Y.Oa)(s,l,h),n._OrtGetInputOutputMetadata=(s,l,h,y)=>(n._OrtGetInputOutputMetadata=Y.Pa)(s,l,h,y),n._OrtFree=s=>(n._OrtFree=Y.Qa)(s),n._OrtCreateTensor=(s,l,h,y,w,A)=>(n._OrtCreateTensor=Y.Ra)(s,l,h,y,w,A),n._OrtGetTensorData=(s,l,h,y,w)=>(n._OrtGetTensorData=Y.Sa)(s,l,h,y,w),n._OrtReleaseTensor=s=>(n._OrtReleaseTensor=Y.Ta)(s),n._OrtCreateRunOptions=(s,l,h,y)=>(n._OrtCreateRunOptions=Y.Ua)(s,l,h,y),n._OrtAddRunConfigEntry=(s,l,h)=>(n._OrtAddRunConfigEntry=Y.Va)(s,l,h),n._OrtReleaseRunOptions=s=>(n._OrtReleaseRunOptions=Y.Wa)(s),n._OrtCreateBinding=s=>(n._OrtCreateBinding=Y.Xa)(s),n._OrtBindInput=(s,l,h)=>(n._OrtBindInput=Y.Ya)(s,l,h),n._OrtBindOutput=(s,l,h,y)=>(n._OrtBindOutput=Y.Za)(s,l,h,y),n._OrtClearBoundOutputs=s=>(n._OrtClearBoundOutputs=Y._a)(s),n._OrtReleaseBinding=s=>(n._OrtReleaseBinding=Y.$a)(s),n._OrtRunWithBinding=(s,l,h,y,w)=>(n._OrtRunWithBinding=Y.ab)(s,l,h,y,w),n._OrtRun=(s,l,h,y,w,A,B,R)=>(n._OrtRun=Y.bb)(s,l,h,y,w,A,B,R),n._OrtEndProfiling=s=>(n._OrtEndProfiling=Y.cb)(s),n._JsepOutput=(s,l,h)=>(n._JsepOutput=Y.db)(s,l,h),n._JsepGetNodeName=s=>(n._JsepGetNodeName=Y.eb)(s);var cr=()=>(cr=Y.fb)(),Qe=n._free=s=>(Qe=n._free=Y.gb)(s),pr=n._malloc=s=>(pr=n._malloc=Y.hb)(s),An=(s,l,h,y,w,A)=>(An=Y.kb)(s,l,h,y,w,A),Bi=()=>(Bi=Y.lb)(),Di=(s,l,h,y,w)=>(Di=Y.mb)(s,l,h,y,w),Mi=s=>(Mi=Y.nb)(s),En=s=>(En=Y.ob)(s),Ri=(s,l)=>(Ri=Y.pb)(s,l),Ui=()=>(Ui=Y.qb)(),Ni=(s,l)=>(Ni=Y.rb)(s,l),mr=s=>(mr=Y.sb)(s),kn=s=>(kn=Y.tb)(s),Pn=()=>(Pn=Y.ub)(),Vi=n.dynCall_ii=(s,l)=>(Vi=n.dynCall_ii=Y.vb)(s,l),Wi=s=>(Wi=Y.wb)(s),Li=()=>(Li=Y.xb)(),Gi=s=>(Gi=Y.yb)(s),Hi=()=>(Hi=Y.zb)();return n.stackSave=()=>Pn(),n.stackRestore=s=>mr(s),n.stackAlloc=s=>kn(s),n.setValue=function(s,l,h="i8"){switch(h.endsWith("*")&&(h="*"),h){case"i1":case"i8":ue()[s>>>0]=l;break;case"i16":ye()[s>>>1>>>0]=l;break;case"i32":C()[s>>>2>>>0]=l;break;case"i64":Z[s>>>3]=BigInt(l);break;case"float":de()[s>>>2>>>0]=l;break;case"double":ze()[s>>>3>>>0]=l;break;case"*":V()[s>>>2>>>0]=l;break;default:dt(`invalid type for setValue: ${h}`)}},n.getValue=function(s,l="i8"){switch(l.endsWith("*")&&(l="*"),l){case"i1":case"i8":return ue()[s>>>0];case"i16":return ye()[s>>>1>>>0];case"i32":return C()[s>>>2>>>0];case"i64":return Z[s>>>3];case"float":return de()[s>>>2>>>0];case"double":return ze()[s>>>3>>>0];case"*":return V()[s>>>2>>>0];default:dt(`invalid type for getValue: ${l}`)}},n.UTF8ToString=Te,n.stringToUTF8=zt,n.lengthBytesUTF8=Ko,function s(){if(0<Pt)Lt=s;else if(u)t(n),_t();else{for(;0<mn.length;)mn.shift()(n);0<Pt?Lt=s:(n.calledRun=!0,te||(_t(),t(n)))}}(),n.PTR_SIZE=4,o}),Fp=Sa,qp=globalThis.self?.name?.startsWith("em-pthread");qp&&Sa()});var Ea,Gn,jp,Ue,ka,Ln,Kp,Zp,Pa,Qp,Ca,za,Aa,Oa,_r=U(()=>{"use strict";yr();Ea=typeof location>"u"?void 0:location.origin,Gn=import.meta.url>"file:"&&import.meta.url<"file;",jp=()=>{if(!!1){if(Gn){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,Ea).href}return import.meta.url}},Ue=jp(),ka=()=>{if(Ue&&!Ue.startsWith("blob:"))return Ue.substring(0,Ue.lastIndexOf("/")+1)},Ln=(e,t)=>{try{let r=t??Ue;return(r?new URL(e,r):new URL(e)).origin===Ea}catch{return!1}},Kp=(e,t)=>{let r=t??Ue;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},Zp=(e,t)=>`${t??"./"}${e}`,Pa=async e=>{let r=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},Qp=async e=>(await import(/*webpackIgnore:true*/e)).default,Ca=(xa(),Ft($a)).default,za=async()=>{if(!Ue)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Ln(Ue))return[void 0,Ca()];let e=await Pa(Ue);return[e,Ca(e)]},Aa=(Ia(),Ft(Ta)).default,Oa=async(e,t,r)=>{if(!e&&!t&&Aa&&Ue&&Ln(Ue))return[void 0,Aa];{let n="ort-wasm-simd-threaded.jsep.mjs",o=e??Kp(n,t),i=!!1&&r&&o&&!Ln(o,t),a=i?await Pa(o):o??Zp(n,t);return[i?a:void 0,await Qp(a)]}}});var Hn,Fn,Ar,Ba,Yp,Xp,Jp,wr,fe,ht=U(()=>{"use strict";_r();Fn=!1,Ar=!1,Ba=!1,Yp=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Xp=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Jp=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},wr=async e=>{if(Fn)return Promise.resolve();if(Ar)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Ba)throw new Error("previous call to 'initializeWebAssembly()' failed.");Ar=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!Jp())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!Xp())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let n=Yp();r>1&&!n&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let o=e.wasmPaths,i=typeof o=="string"?o:void 0,a=o?.mjs,u=a?.href??a,d=o?.wasm,c=d?.href??d,p=e.wasmBinary,[m,f]=await Oa(u,i,r>1),b=!1,g=[];if(t>0&&g.push(new Promise(_=>{setTimeout(()=>{b=!0,_()},t)})),g.push(new Promise((_,S)=>{let $={numThreads:r};if(p)$.wasmBinary=p;else if(c||i)$.locateFile=v=>c??i+v;else if(u&&u.indexOf("blob:")!==0)$.locateFile=v=>new URL(v,u).href;else if(m){let v=ka();v&&($.locateFile=x=>v+x)}f($).then(v=>{Ar=!1,Fn=!0,Hn=v,_(),m&&URL.revokeObjectURL(m)},v=>{Ar=!1,Ba=!0,S(v)})})),await Promise.race(g),b)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},fe=()=>{if(Fn&&Hn)return Hn;throw new Error("WebAssembly is not initialized yet.")}});var Ne,Kt,pe,Er=U(()=>{"use strict";ht();Ne=(e,t)=>{let r=fe(),n=r.lengthBytesUTF8(e)+1,o=r._malloc(n);return r.stringToUTF8(e,o,n),t.push(o),o},Kt=(e,t,r,n)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([o,i])=>{let a=t?t+o:o;if(typeof i=="object")Kt(i,a+".",r,n);else if(typeof i=="string"||typeof i=="number")n(a,i.toString());else if(typeof i=="boolean")n(a,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},pe=e=>{let t=fe(),r=t.stackSave();try{let n=t.PTR_SIZE,o=t.stackAlloc(2*n);t._OrtGetLastError(o,o+n);let i=Number(t.getValue(o,n===4?"i32":"i64")),a=t.getValue(o+n,"*"),u=a?t.UTF8ToString(a):"";throw new Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${u}`)}finally{t.stackRestore(r)}}});var Da,Ma=U(()=>{"use strict";ht();Er();Da=e=>{let t=fe(),r=0,n=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let i=0;return e?.tag!==void 0&&(i=Ne(e.tag,n)),r=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),r===0&&pe("Can't create run options."),e?.extra!==void 0&&Kt(e.extra,"",new WeakSet,(a,u)=>{let d=Ne(a,n),c=Ne(u,n);t._OrtAddRunConfigEntry(r,d,c)!==0&&pe(`Can't set a run config entry: ${a} - ${u}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseRunOptions(r),n.forEach(a=>t._free(a)),i}}});var em,tm,rm,kr,nm,Ra,Ua=U(()=>{"use strict";ht();Er();em=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},tm=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},rm=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},kr=(e,t,r,n)=>{let o=Ne(t,n),i=Ne(r,n);fe()._OrtAddSessionConfigEntry(e,o,i)!==0&&pe(`Can't set a session config entry: ${t} - ${r}.`)},nm=async(e,t,r)=>{for(let n of t){let o=typeof n=="string"?n:n.name,i=[];switch(o){case"webnn":if(o="WEBNN",typeof n!="string"){let m=n?.deviceType;m&&kr(e,"deviceType",m,r)}break;case"webgpu":if(o="JS",typeof n!="string"){let p=n;if(p?.preferredLayout){if(p.preferredLayout!=="NCHW"&&p.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${p.preferredLayout}`);kr(e,"preferredLayout",p.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let a=Ne(o,r),u=i.length,d=0,c=0;if(u>0){d=fe()._malloc(u*fe().PTR_SIZE),r.push(d),c=fe()._malloc(u*fe().PTR_SIZE),r.push(c);for(let p=0;p<u;p++)fe().setValue(d+p*fe().PTR_SIZE,i[p][0],"*"),fe().setValue(c+p*fe().PTR_SIZE,i[p][1],"*")}await fe()._OrtAppendExecutionProvider(e,a,d,c,u)!==0&&pe(`Can't append execution provider: ${o}.`)}},Ra=async e=>{let t=fe(),r=0,n=[],o=e||{};rm(o);try{let i=em(o.graphOptimizationLevel??"all"),a=tm(o.executionMode??"sequential"),u=typeof o.logId=="string"?Ne(o.logId,n):0,d=o.logSeverityLevel??2;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log serverity level is not valid: ${d}`);let c=o.logVerbosityLevel??0;if(!Number.isInteger(c)||c<0||c>4)throw new Error(`log verbosity level is not valid: ${c}`);let p=typeof o.optimizedModelFilePath=="string"?Ne(o.optimizedModelFilePath,n):0;if(r=t._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,a,!!o.enableProfiling,0,u,d,c,p),r===0&&pe("Can't create session options."),o.executionProviders&&await nm(r,o.executionProviders,n),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);kr(r,"enableGraphCapture",o.enableGraphCapture.toString(),n)}if(o.freeDimensionOverrides)for(let[m,f]of Object.entries(o.freeDimensionOverrides)){if(typeof m!="string")throw new Error(`free dimension override name must be a string: ${m}`);if(typeof f!="number"||!Number.isInteger(f)||f<0)throw new Error(`free dimension override value must be a non-negative integer: ${f}`);let b=Ne(m,n);t._OrtAddFreeDimensionOverride(r,b,f)!==0&&pe(`Can't set a free dimension override: ${m} - ${f}.`)}return o.extra!==void 0&&Kt(o.extra,"",new WeakSet,(m,f)=>{kr(r,m,f,n)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&pe("Can't release session options."),n.forEach(a=>t._free(a)),i}}});var Mt,Ye,gt,Pr,Zt,zr,Or,qn,ee=U(()=>{"use strict";Mt=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},Ye=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},gt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],n=typeof t=="number"?t:t.reduce((o,i)=>o*i,1);return r>0?Math.ceil(n*r):void 0},Pr=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Zt=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},zr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Or=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",qn=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}});var Qt,jn=U(()=>{"use strict";yr();Qt=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=On("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=On("node:fs"),n=r(e),o=[];for await(let i of n)o.push(i);return new Uint8Array(Buffer.concat(o))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let o=t.body.getReader(),i;try{i=new ArrayBuffer(n)}catch(u){if(u instanceof RangeError){let d=Math.ceil(n/65536);i=new WebAssembly.Memory({initial:d,maximum:d}).buffer}else throw u}let a=0;for(;;){let{done:u,value:d}=await o.read();if(u)break;let c=d.byteLength;new Uint8Array(i,a,c).set(d),a+=c}return new Uint8Array(i,0,n)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var om,im,Na,Va,Br,am,se,Xe=U(()=>{"use strict";ee();om=["V","I","W","E","F"],im=(e,t)=>{console.log(`[${om[e]},${new Date().toISOString()}]${t}`)},Br=(e,t)=>{Na=e,Va=t},am=(e,t)=>{let r=Zt(e),n=Zt(Na);r>=n&&im(r,typeof t=="function"?t():t)},se=(...e)=>{Va&&am(...e)}});var Kn,Je,k,Tt,Dr,Wa,La,ne=U(()=>{"use strict";Kn=class{static calcMatMulShape(t,r){return t[1]!==r[0]?void 0:[t[0],r[1]]}},Je=class{static calcShape(t,r,n=!1){let o=t.length,i=r.length;if(o===0)return r;if(i===0)return t;let a=Math.max(t.length,r.length),u=new Array(a);if(n){if(o<2||i<2)return;let d=Kn.calcMatMulShape([t[o-2],t[o-1]],[r[i-2],r[i-1]]);if(d===void 0)return;[u[a-2],u[a-1]]=d}for(let d=n?3:1;d<=a;d++){let c=o-d<0?1:t[o-d],p=i-d<0?1:r[i-d];if(c!==p&&c>1&&p>1)return;let m=Math.max(c,p);if(c&&p)u[a-d]=Math.max(c,p);else{if(m>1)return;u[a-d]=0}}return u}static isValidBroadcast(t,r){let n=t.length,o=r.length;if(n>o)return!1;for(let i=1;i<=n;i++)if(t[n-i]!==1&&t[n-i]!==r[o-i])return!1;return!0}},k=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let n=t.length;if(n===0)return[];let o=new Array(n),i=n-1;for(;i>=0;){if(t[i]%r===0){o[i]=t[i]/r;break}if(r%t[i]!==0)throw new Error("cannot convert shape");o[i]=1,r/=t[i],i--}for(i--;i>=0;i--)o[i]=t[i];return o}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,n){let o=1;for(let i=r;i<n;i++){if(t[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(t[i])}return o}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let n=new Array(r);n[r-1]=1,n[r-2]=t[r-1];for(let o=r-3;o>=0;--o)n[o]=n[o+1]*t[o+1];return n}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(n=>this.normalizeAxis(n,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(n=>t[n]):t.slice().reverse()}static padShape(t,r){let n=t.length;return t.map((o,i)=>o+r[i]+r[i+n])}static areEqual(t,r){return t.length!==r.length?!1:t.every((n,o)=>n===r[o])}},Tt=class e{static adjustPoolAttributes(t,r,n,o,i,a){if(!t&&n.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<r.length-2;u++)u>=n.length?n.push(r[u+2]):n[u]=r[u+2];for(let u=0;u<n.length;u++)if(u<o.length){if(o[u]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let u=0;u<n.length;u++)if(u<i.length){if(i[u]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let u=0;u<n.length*2;u++)if(u<a.length){if(a[u]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let u=0;u<n.length;u++){if(n[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[u]>=n[u]||a[u+n.length]>=n[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,o,i,a,u){if(u){if(i.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let d=0;d<t.length-2;d++)e.adjustPadAndReturnShape(t[d+(a?1:2)],r[d],n[d],o[d],i,d,d+t.length-2,u)}}static computePoolOutputShape(t,r,n,o,i,a,u){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let d=[r[0],r[1]];return e.computeShapeHelper(t,r,d,n,o,i,a,u),d}static computeConvOutputShape(t,r,n,o,i,a,u){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let d=[t[0],r[0]];return e.computeShapeHelper(!1,t,d,n,o,i,a,u),d}static computeShapeHelper(t,r,n,o,i,a,u,d){if(t)for(let c=0;c<r.length-2;c++)n.push(1);else for(let c=0;c<r.length-2;c++)n.push(e.adjustPadAndReturnShape(r[c+2],o[c],i[c],a[c],u,c,c+r.length-2,d))}static adjustPadAndReturnShape(t,r,n,o,i,a,u,d){let c=n*(o-1)+1;if(d&&d!=="NOTSET")switch(d){case"VALID":return i[a]=0,i[u]=0,Math.floor((t-c)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(n!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let m=((t+r-1)/r-1)*r+o-t;return i[a]=Math.floor(d==="SAME_LOWER"?(m+1)/2:m/2),i[u]=m-i[a],Math.floor((t+m-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+i[a]+i[u]-c)/r+1)}},Dr=class{static getShapeOfGemmResult(t,r,n,o,i){if(t.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let a,u,d;r?(a=t[1],u=t[0]):(a=t[0],u=t[1]);let c=-1;if(o?(d=n[0],c=1):(d=n[1],c=0),n[c]!==u)throw new Error("dimension mismatch");if(a<=0||d<=0||u<=0)throw new Error("invalid shape specified");if(i&&!Je.isValidBroadcast(i,[a,d]))throw new Error("gemm: invalid bias shape for broadcast");return[a,d,u]}},Wa=-34028234663852886e22,La=34028234663852886e22});var Mr,Zn=U(()=>{"use strict";ee();Mr=(e,t)=>new(Pr(t))(e)});var Yn,Ha,sm,Ga,um,Fa,Rr,Ur,Qn,qa,ja=U(()=>{"use strict";Xe();Yn=(e,t=!0)=>{if(e.byteLength%8!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 8 (BigInt).");let r=e.byteLength/8,n=new BigInt64Array(e.buffer,e.byteOffset,r),o=new Int32Array(r);for(let i=0;i<r;i++){let a=n[i];if(a>2147483647n||a<-2147483648n)throw new Error(`Overflow occurred when converting BigInt to Int32 at index ${i}: ${a}`);o[i]=Number(a)}return t?new Uint8Array(o.buffer):o},Ha=(e,t=!0)=>{if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (Int32).");let r=e.byteLength/4,n=new Int32Array(e.buffer,e.byteOffset,r),o=BigInt64Array.from(n,BigInt);return t?new Uint8Array(o.buffer):o},sm=1,Ga=()=>sm++,um=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Fa=(e,t)=>{let r=um.get(e);if(!r)throw new Error("Unsupported data type.");return t.length>0?Math.ceil(t.reduce((n,o)=>n*o)*r/8):0},Rr=class{constructor(t){this.shouldConvertInt64toInt32=!1;this.isInt64ToInt32Converted=!1;let{sessionId:r,context:n,tensor:o,dataType:i,shape:a,shouldConvertInt64toInt32:u=!1}=t;this.sessionId=r,this.mlContext=n,this.mlTensor=o,this.dataType=i,this.tensorShape=a,this.shouldConvertInt64toInt32=u}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return Fa(this.dataType,this.tensorShape)}destroy(){se("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(t){this.mlContext.writeTensor(this.mlTensor,t)}async read(t,r){if(t){let n=await this.mlContext.readTensor(this.mlTensor),o=Ha(new Uint8Array(n));if(r){(r instanceof ArrayBuffer?new Uint8Array(r):new Uint8Array(r.buffer,r.byteOffset,r.byteLength)).set(o);return}else return o.buffer}else return r?this.mlContext.readTensor(this.mlTensor,r):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(t,r,n){return this.mlContext===t&&this.dataType===r&&this.tensorShape.length===n.length&&this.tensorShape.every((o,i)=>o===n[i])}setIsInt64ToInt32Converted(t){this.isInt64ToInt32Converted=t}},Ur=class{constructor(t,r){this.tensorManager=t;this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(t,r,n,o){let i=r,a=this.tensorManager.getMLContext(t),u=i==="int64"&&!a.opSupportLimits().input.dataTypes.includes("int64");if(u&&(i="int32",se("verbose",()=>"[WebNN] TensorIdTracker.ensureTensor: convert dataType from int64 to int32")),this.wrapper){if(this.wrapper.canReuseTensor(a,i,n))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==Fa(i,n))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let d=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(t,i,n,d,!0,!0,u),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(t){let r=t;if(this.wrapper)if(this.wrapper.shouldConvertInt64toInt32&&(r=Yn(t,!0),this.wrapper.setIsInt64ToInt32Converted(!0)),r.byteLength===this.wrapper.byteLength){this.wrapper.write(r);return}else se("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(r):this.activeUpload=new Uint8Array(r)}async download(t){if(this.activeUpload){let r=this.wrapper?.isInt64ToInt32Converted?Ha(this.activeUpload):this.activeUpload;if(t){t instanceof ArrayBuffer?new Uint8Array(t).set(r):new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(r);return}else return r.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return t?this.wrapper.read(this.wrapper?.shouldConvertInt64toInt32,t):this.wrapper.read(this.wrapper?.shouldConvertInt64toInt32)}},Qn=class{constructor(t){this.backend=t;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}getMLContext(t){let r=this.backend.getMLContext(t);if(!r)throw new Error("MLContext not found for session.");return r}reserveTensorId(){let t=Ga();return this.tensorTrackersById.set(t,new Ur(this)),t}releaseTensorId(t){let r=this.tensorTrackersById.get(t);r&&(this.tensorTrackersById.delete(t),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(t,r,n,o,i){se("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${r}, dataType: ${n}, shape: ${o}, copyOld: ${i}}`);let a=this.tensorTrackersById.get(r);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(t,n,o,i)}upload(t,r){let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");n.upload(r)}async download(t,r){se("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${t}, dstBuffer: ${r?.byteLength}}`);let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");return n.download(r)}releaseTensorsForSession(t){for(let r of this.freeTensors)r.sessionId===t&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==t)}registerTensor(t,r,n,o){let i=this.getMLContext(t),a=Ga(),u=new Rr({sessionId:t,context:i,tensor:r,dataType:n,shape:o});return this.tensorTrackersById.set(a,new Ur(this,u)),this.externalTensors.add(u),a}async getCachedTensor(t,r,n,o,i,a,u=!1){let d=this.getMLContext(t);for(let[p,m]of this.freeTensors.entries())if(m.canReuseTensor(d,r,n)){se("verbose",()=>`[WebNN] Reusing tensor {dataType: ${r}, shape: ${n}}`);let f=this.freeTensors.splice(p,1)[0];return f.sessionId=t,f}se("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${r}, shape: ${n}}`);let c=await d.createTensor({dataType:r,shape:n,dimensions:n,usage:o,writable:i,readable:a});return new Rr({sessionId:t,context:d,tensor:c,dataType:r,shape:n,shouldConvertInt64toInt32:u})}releaseTensor(t){this.externalTensors.has(t)&&this.externalTensors.delete(t),this.freeTensors.push(t)}},qa=(...e)=>new Qn(...e)});var Xn,dm,Nr,Ka=U(()=>{"use strict";ee();ht();Zn();ja();Xe();Xn=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),dm=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),n=Object.keys(t).sort();return r.length===n.length&&r.every((o,i)=>o===n[i]&&e[o]===t[o])},Nr=class{constructor(t){this.tensorManager=qa(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];this.sessionGraphInputs=new Map;this.temporaryGraphInputs=[];this.temporarySessionTensorIds=new Map;Br(t.logLevel,!!t.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(t){se("verbose",()=>`[WebNN] onRunStart {sessionId: ${t}}`),this.activeSessionId=t}onRunEnd(t){se("verbose",()=>`[WebNN] onRunEnd {sessionId: ${t}}`);let r=this.temporarySessionTensorIds.get(t);if(r){for(let n of r)se("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${n}}`),this.tensorManager.releaseTensorId(n);this.temporarySessionTensorIds.delete(t),this.activeSessionId=void 0}}async createMLContext(t){if(t instanceof GPUDevice){let n=this.mlContextCache.findIndex(o=>o.gpuDevice===t);if(n!==-1)return this.mlContextCache[n].mlContext;{let o=await navigator.ml.createContext(t);return this.mlContextCache.push({gpuDevice:t,mlContext:o}),o}}else if(t===void 0){let n=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(n!==-1)return this.mlContextCache[n].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let r=this.mlContextCache.findIndex(n=>dm(n.options,t));if(r!==-1)return this.mlContextCache[r].mlContext;{let n=await navigator.ml.createContext(t);return this.mlContextCache.push({options:t,mlContext:n}),n}}registerMLContext(t,r){this.mlContextBySessionId.set(t,r);let n=this.sessionIdsByMLContext.get(r);n||(n=new Set,this.sessionIdsByMLContext.set(r,n)),n.add(t),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(t,this.temporaryGraphInputs),this.temporaryGraphInputs=[])}onReleaseSession(t){this.sessionGraphInputs.delete(t);let r=this.mlContextBySessionId.get(t);if(!r)return;this.tensorManager.releaseTensorsForSession(t),this.mlContextBySessionId.delete(t);let n=this.sessionIdsByMLContext.get(r);if(n.delete(t),n.size===0){this.sessionIdsByMLContext.delete(r);let o=this.mlContextCache.findIndex(i=>i.mlContext===r);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(t){return this.mlContextBySessionId.get(t)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(t){se("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t)}async ensureTensor(t,r,n,o,i){let a=Xn.get(n);if(!a)throw new Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(t??this.currentSessionId,r,a,o,i)}async createTemporaryTensor(t,r,n){se("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${r}, shape: ${n}}`);let o=Xn.get(r);if(!o)throw new Error(`Unsupported ONNX data type: ${r}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(t,i,o,n,!1);let a=this.temporarySessionTensorIds.get(t);return a?a.push(i):this.temporarySessionTensorIds.set(t,[i]),i}uploadTensor(t,r){if(!fe().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");se("verbose",()=>`[WebNN] uploadTensor {tensorId: ${t}, data: ${r.byteLength}}`),this.tensorManager.upload(t,r)}async downloadTensor(t,r){return this.tensorManager.download(t,r)}createMLTensorDownloader(t,r){return async()=>{let n=await this.tensorManager.download(t);return Mr(n,r)}}registerMLTensor(t,r,n,o){let i=Xn.get(n);if(!i)throw new Error(`Unsupported ONNX data type: ${n}`);let a=this.tensorManager.registerTensor(t,r,i,o);return se("verbose",()=>`[WebNN] registerMLTensor {tensor: ${r}, dataType: ${i}, dimensions: ${o}} -> {tensorId: ${a}}`),a}registerMLConstant(t,r,n,o,i,a,u=!1){if(!a)throw new Error("External mounted files are not available.");let d=t;t.startsWith("./")&&(d=t.substring(2));let c=a.get(d);if(!c)throw new Error(`File with name ${d} not found in preloaded files.`);if(r+n>c.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let p=c.slice(r,r+n).buffer,m;switch(i.dataType){case"float32":m=new Float32Array(p);break;case"float16":m=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(p):new Uint16Array(p);break;case"int32":m=new Int32Array(p);break;case"uint32":m=new Uint32Array(p);break;case"int64":u?(m=Yn(new Uint8Array(p),!1),i.dataType="int32"):m=new BigInt64Array(p);break;case"uint64":m=new BigUint64Array(p);break;case"int8":m=new Int8Array(p);break;case"int4":case"uint4":case"uint8":m=new Uint8Array(p);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return se("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}} ${u?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),o.constant(i,m)}registerGraphInput(t){this.temporaryGraphInputs.push(t)}isGraphInput(t,r){let n=this.sessionGraphInputs.get(t);return n?n.includes(r):!1}isInt64Supported(t){return!!this.mlContextBySessionId.get(t)?.opSupportLimits().input.dataTypes.includes("int64")}flush(){}}});var Vr=U(()=>{"use strict"});var Za,Jn,eo,lm,cm,Qa,ro,to,Xa,Ja=U(()=>{"use strict";Xe();Vr();Za=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Jn=[],eo=e=>Math.ceil(Number(e)/16)*16,lm=e=>{for(let t=0;t<Jn.length;t++){let r=Jn[t];if(e<=r)return r}return Math.ceil(e/16)*16},cm=1,Qa=()=>cm++,ro=async(e,t,r,n)=>{let o=eo(r),i=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=e.getCommandEncoder();e.endComputePass(),a.copyBufferToBuffer(t,0,i,0,o),e.flush(),await i.mapAsync(GPUMapMode.READ);let u=i.getMappedRange();if(n){let d=n();return d.set(new Uint8Array(u,0,r)),d}else return new Uint8Array(u.slice(0,r))}finally{i.destroy()}},to=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[r]of Za)Jn.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(t,r){let n=r.buffer,o=r.byteOffset,i=r.byteLength,a=eo(i),u=this.storageCache.get(t);if(!u)throw new Error("gpu data for uploading does not exist");if(Number(u.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${u.originalSize}, data size=${i}`);let d=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),c=d.getMappedRange();new Uint8Array(c).set(new Uint8Array(n,o,i)),d.unmap();let p=this.backend.device.createCommandEncoder();p.copyBufferToBuffer(d,0,u.gpuData.buffer,0,a),this.backend.device.queue.submit([p.finish()]),d.destroy(),se("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`)}memcpy(t,r){let n=this.storageCache.get(t);if(!n)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=eo(n.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(n.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(t,r,n){let o;if(n){if(o=n[0],t===n[1])return se("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=Qa();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:t},originalSize:r}),se("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(t){t!==void 0&&(this.storageCache.delete(t),se("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(t,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=lm(t),o,i=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let c=(i?this.freeBuffers:this.freeUniformBuffers).get(n);c?c.length>0?o=c.pop():o=this.backend.device.createBuffer({size:n,usage:r}):o=this.backend.device.createBuffer({size:n,usage:r})}else o=this.backend.device.createBuffer({size:n,usage:r});let u={id:Qa(),type:0,buffer:o};return this.storageCache.set(u.id,{gpuData:u,originalSize:Number(t)}),se("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${u.id}`),u}get(t){return this.storageCache.get(t)?.gpuData}release(t){let r=typeof t=="bigint"?Number(t):t,n=this.storageCache.get(r);if(!n){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return se("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(t,r){let n=this.storageCache.get(Number(t));if(!n)throw new Error("data does not exist");await ro(this.backend,n.gpuData.buffer,n.originalSize,r)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let r=Za.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let r of this.buffersPending)t.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(t){let r=this.capturedPendingBuffers.get(t);r&&(r.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(t)),this.sessionCount-=1,this.sessionCount===0&&(se("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(n=>{n.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Xa=(...e)=>new to(...e)});var no,J,Se=U(()=>{"use strict";no=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},J=e=>new no(e)});var It,io,be,Ae,N,ce,ao,Ct,He,F,Wr,P,M,es,Lr,oo,ts,ie=U(()=>{"use strict";ee();ne();It=64,io=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},be=(e,t=1)=>{let r=io(e,t);return typeof r=="string"?r:r[0]},Ae=(e,t=1)=>{let r=io(e,t);return typeof r=="string"?r:r[1]},N=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:k.computeStrides(r)})}),t},ce=e=>e%4===0?4:e%2===0?2:1,ao=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Ct=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,He=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,F=(e,t,r,n)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?n==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:n==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,Wr=(e,t,r,n,o)=>{let i=typeof r=="number",a=i?r:r.length,u=[...new Array(a).keys()],d=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,c=io(t,o),p=typeof c=="string"?c:c[1],m=typeof c=="string"?c:c[0],f={indices:d,value:p,storage:m,tensor:t},b=C=>typeof C=="string"?C:`${C}u`,g={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},_=i?"uniforms.":"",S=`${_}${e}_shape`,$=`${_}${e}_strides`,v="";for(let C=0;C<a-1;C++)v+=`
    let dim${C} = current / ${F($,C,a)};
    let rest${C} = current % ${F($,C,a)};
    indices[${C}] = dim${C};
    current = rest${C};
    `;v+=`indices[${a-1}] = current;`;let x=a<2?"":`
  fn o2i_${e}(offset: u32) -> ${f.indices} {
    var indices: ${f.indices};
    var current = offset;
    ${v}
    return indices;
  }`,T=C=>(g.offsetToIndices=!0,a<2?C:`o2i_${e}(${C})`),E=[];if(a>=2)for(let C=a-1;C>=0;C--)E.push(`${F($,C,a)} * (indices[${C}])`);let I=a<2?"":`
  fn i2o_${e}(indices: ${f.indices}) -> u32 {
    return ${E.join("+")};
  }`,z=C=>(g.indicesToOffset=!0,a<2?C:`i2o_${e}(${C})`),O=(...C)=>a===0?"0u":`${f.indices}(${C.map(b).join(",")})`,D=(C,V)=>a<2?`${C}`:`${F(C,V,a)}`,L=(C,V,de)=>a<2?`${C}=${de};`:`${F(C,V,a)}=${de};`,q={},Q=(C,V)=>{g.broadcastedIndicesToOffset=!0;let de=`${V.name}broadcastedIndicesTo${e}Offset`;if(de in q)return`${de}(${C})`;let ze=[];for(let ve=a-1;ve>=0;ve--){let $e=V.indicesGet("outputIndices",ve+V.rank-a);ze.push(`${D($,ve)} * (${$e} % ${D(S,ve)})`)}return q[de]=`fn ${de}(outputIndices: ${V.type.indices}) -> u32 {
             return ${ze.length>0?ze.join("+"):"0u"};
           }`,`${de}(${C})`},W=(C,V)=>(()=>{if(f.storage===f.value)return`${e}[${C}]=${V};`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`${e}[${C}]=vec2<u32>(u32(${V}), select(0u, 0xFFFFFFFFu, ${V} < 0));`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`${e}[${C}]=vec2<u32>(u32(${V}), 0u);`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`${e}[${C}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${V}));`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),Z=C=>(()=>{if(f.storage===f.value)return`${e}[${C}]`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`i32(${e}[${C}].x)`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`u32(${e}[${C}].x)`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${C}] & 0xFFu), bool(${e}[${C}] & 0xFF00u), bool(${e}[${C}] & 0xFF0000u), bool(${e}[${C}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),we=a<2?"":`
  fn get_${e}ByIndices(indices: ${f.indices}) -> ${p} {
    return ${Z(`i2o_${e}(indices)`)};
  }`,H=a<2?"":(()=>{let C=u.map(de=>`d${de}: u32`).join(", "),V=u.map(de=>`d${de}`).join(", ");return`
  fn get_${e}(${C}) -> ${p} {
    return get_${e}ByIndices(${O(V)});
  }`})(),j=(...C)=>{if(C.length!==a)throw new Error(`indices length must be ${a}`);let V=C.map(b).join(",");return a===0?Z("0u"):a===1?Z(V[0]):(g.get=!0,g.getByIndices=!0,g.indicesToOffset=!0,`get_${e}(${V})`)},te=C=>a<2?Z(C):(g.getByIndices=!0,g.indicesToOffset=!0,`get_${e}ByIndices(${C})`),X=a<2?"":`
  fn set_${e}ByIndices(indices: ${f.indices}, value: ${p}) {
    ${W(`i2o_${e}(indices)`,"value")}
  }`,ue=a<2?"":(()=>{let C=u.map(de=>`d${de}: u32`).join(", "),V=u.map(de=>`d${de}`).join(", ");return`
  fn set_${e}(${C}, value: ${p}) {
    set_${e}ByIndices(${O(V)}, value);
  }`})();return{impl:()=>{let C=[],V=!1;return g.offsetToIndices&&(C.push(x),V=!0),g.indicesToOffset&&(C.push(I),V=!0),g.broadcastedIndicesToOffset&&(Object.values(q).forEach(de=>C.push(de)),V=!0),g.set&&(C.push(ue),V=!0),g.setByIndices&&(C.push(X),V=!0),g.get&&(C.push(H),V=!0),g.getByIndices&&(C.push(we),V=!0),!i&&V&&C.unshift(`const ${S} = ${f.indices}(${r.join(",")});`,`const ${$} = ${f.indices}(${k.computeStrides(r).join(",")});`),C.join(`
`)},type:f,offsetToIndices:T,indicesToOffset:z,broadcastedIndicesToOffset:Q,indices:O,indicesGet:D,indicesSet:L,set:(...C)=>{if(C.length!==a+1)throw new Error(`indices length must be ${a}`);let V=C[a];if(typeof V!="string")throw new Error("value must be string");let de=C.slice(0,a).map(b).join(",");return a===0?W("0u",V):a===1?W(de[0],V):(g.set=!0,g.setByIndices=!0,g.indicesToOffset=!0,`set_${e}(${de}, ${V})`)},setByOffset:W,setByIndices:(C,V)=>a<2?W(C,V):(g.setByIndices=!0,g.indicesToOffset=!0,`set_${e}ByIndices(${C}, ${V});`),get:j,getByOffset:Z,getByIndices:te,usage:n,name:e,strides:$,shape:S,rank:a}},P=(e,t,r,n=1)=>Wr(e,t,r,"input",n),M=(e,t,r,n=1)=>Wr(e,t,r,"output",n),es=(e,t,r)=>Wr(e,t,r,"atomicOutput",1),Lr=(e,t,r,n=1)=>Wr(e,t,r,"internal",n),oo=class{constructor(t,r){this.normalizedDispatchGroup=t;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=It){let r=typeof t=="number"?t:t[0],n=typeof t=="number"?1:t[1],o=typeof t=="number"?1:t[2];if(r>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*n*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
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
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[t(r.type),r.length??1])}},ts=(e,t)=>new oo(e,t)});var pm,rs,mm,fm,hm,gm,Ee,ns,os,st=U(()=>{"use strict";ee();ne();Se();ie();pm=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},rs=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),mm=(e,t)=>k.sortBasedOnPerm(e,rs(e.length,t)),fm=(e,t,r,n)=>{let o=`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let i=0;i<t;++i)o+=`a[${e[i]}]=i[${i}];`;return o+="return a;}"},hm=(e,t)=>{let r=[],n=[];for(let o=0;o<e.length;++o)e[o]!==1&&r.push(e[o]),e[t[o]]!==1&&n.push(t[o]);return{newShape:r,newPerm:n}},gm=(e,t)=>{let r=0;for(let n=0;n<e.length;++n)if(t[e[n]]!==1){if(e[n]<r)return!1;r=e[n]}return!0},Ee=(e,t)=>{let r=e.dataType,n=e.dims.length,o=rs(n,t),i=mm(e.dims,o),a=e.dims,u=i,d=n<2||gm(o,e.dims),c;if(d)return c=_=>{let S=P("input",r,a,4),$=M("output",r,u,4);return`
  ${_.registerUniform("output_size","u32").declareVariables(S,$)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=k.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64/4)},programUniforms:[{type:12,data:Math.ceil(_/4)}]}},getShaderSource:c};let{newShape:p,newPerm:m}=hm(e.dims,o),f=k.areEqual(m,[2,3,1]),b=k.areEqual(m,[3,1,2]);if(p.length===2||f||b){a=f?[p[0],p[1]*p[2]]:b?[p[0]*p[1],p[2]]:p,u=[a[1],a[0]];let _=16;return c=S=>{let $=P("a",r,a.length),v=M("output",r,u.length);return`
  ${S.registerUniform("output_size","u32").declareVariables($,v)}
  var<workgroup> tile : array<array<${v.type.value}, ${_+1}>, ${_}>;
  ${S.mainStart([_,_,1])}
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
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let S=k.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/_),y:Math.ceil(u[0]/_)},programUniforms:[{type:12,data:S},...N(a,u)]}},getShaderSource:c}}return c=_=>{let S=P("a",r,a.length),$=M("output",r,u.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(S,$)}

  ${fm(o,n,S,$)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${$.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${$.setByOffset("global_idx",S.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let _=k.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...N(a,u)]}},getShaderSource:c}},ns=(e,t)=>{pm(e.inputs,t.perm),e.compute(Ee(e.inputs[0],t.perm))},os=e=>J({perm:e.perm})});var bm,ym,_m,wm,vm,$m,xm,Sm,Tm,Im,et,is,as,ss,us,ds,ls,cs,ps,ms,fs,hs=U(()=>{"use strict";ee();ne();ie();Gr();st();bm={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},ym={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},_m={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},wm={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},vm=(e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r},$m=(e,t)=>{let r=[],n=e.length;for(let i=0;i<n;i++)t.indexOf(i)===-1&&r.push(e[i]);let o=t.map(i=>e[i]);return[r,o]},xm=(e,t)=>{let r=e.length+t.length,n=[],o=0;for(let i=0;i<r;i++)t.indexOf(i)===-1?n.push(e[o++]):n.push(1);return n},Sm=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},Tm=(e,t)=>{let r=[];if(!Sm(e,t)){for(let n=0;n<t;++n)e.indexOf(n)===-1&&r.push(n);e.forEach(n=>r.push(n))}return r},Im=(e,t,r,n,o,i,a)=>{let u=r[0].dims,d=k.size(i),c=k.size(a),p=P("_A",r[0].dataType,u),m=M("output",o,i),f=64;d===1&&(f=256);let b=`
          var<workgroup> aBestValues : array<f32, ${f}>;
       `,g=_=>`
        ${_.registerUniform("reduceSize","u32").declareVariables(p,m)}
        ${b}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${_.mainStart(f)}

          let outputIndex = global_idx / ${f};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${_m[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${f}) {
           let candidate = f32(${p.getByOffset("offset + k")});
           bestValue = ${bm[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${f}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${ym[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${m.setByOffset("outputIndex",`${n==="mean"?`${m.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${m.type.storage}(${wm[n]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${f}`,inputDependencies:["type"]},getShaderSource:g,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:d},programUniforms:[{type:12,data:c}]})}},et=(e,t,r,n)=>{let o=e.inputs.length===1?r:so(e.inputs,r),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=e.inputs[0].dims.map((b,g)=>g));let a=k.normalizeAxes(i,e.inputs[0].dims.length),u=a,d=e.inputs[0],c=Tm(u,e.inputs[0].dims.length);c.length>0&&(d=e.compute(Ee(e.inputs[0],c),{inputs:[0],outputs:[-1]})[0],u=vm(u.length,d.dims.length));let[p,m]=$m(d.dims,u),f=p;o.keepDims&&(f=xm(p,a)),e.compute(Im(t,o.cacheKey,[d],n,e.inputs[0].dataType,f,m),{inputs:[d]})},is=(e,t)=>{et(e,"ReduceMeanShared",t,"mean")},as=(e,t)=>{et(e,"ReduceL1Shared",t,"l1")},ss=(e,t)=>{et(e,"ReduceL2Shared",t,"l2")},us=(e,t)=>{et(e,"ReduceLogSumExpShared",t,"logSumExp")},ds=(e,t)=>{et(e,"ReduceMaxShared",t,"max")},ls=(e,t)=>{et(e,"ReduceMinShared",t,"min")},cs=(e,t)=>{et(e,"ReduceProdShared",t,"prod")},ps=(e,t)=>{et(e,"ReduceSumShared",t,"sum")},ms=(e,t)=>{et(e,"ReduceSumSquareShared",t,"sumSquare")},fs=(e,t)=>{et(e,"ReduceLogSumShared",t,"logSum")}});var tt,Cm,Hr,so,rt,Am,Em,km,Pm,zm,Om,Bm,Dm,Mm,Rm,nt,gs,bs,ys,_s,ws,vs,$s,xs,Ss,Ts,Gr=U(()=>{"use strict";ee();ne();Se();ie();hs();tt=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},Cm=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Hr=(e,t,r,n,o,i,a=!1,u=!1)=>{let d=[],c=r[0].dims,p=c.length,m=k.normalizeAxes(o,p),f=!u&&m.length===0;c.forEach((S,$)=>{f||m.indexOf($)>=0?a&&d.push(1):d.push(S)});let b=d.length,g=k.size(d);return{name:e,shaderCache:t,getShaderSource:S=>{let $=[],v=P("_A",r[0].dataType,p),x=M("output",i,b),T=n(v,x,m),E=T[2];for(let I=0,z=0;I<p;I++)f||m.indexOf(I)>=0?(a&&z++,E=`for(var j${I}: u32 = 0; j${I} < ${c[I]}; j${I}++) {
                  ${T[2].includes("last_index")?`let last_index = j${I};`:""}
                  ${v.indicesSet("input_indices",I,`j${I}`)}
                  ${E}
                }`):($.push(`${v.indicesSet("input_indices",I,x.indicesGet("output_indices",z))};`),z++);return`

        ${S.registerUniform("output_size","u32").declareVariables(v,x)}

        ${S.mainStart()}
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${x.offsetToIndices("global_idx")};

          ${$.join(`
`)}
          ${T[0]}       // init ops for reduce max/min
          ${T[1]}
          ${E}
          ${T[3]}
          ${T.length===4?x.setByOffset("global_idx","value"):T.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:d,dataType:i}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},...N(c,d)]})}},so=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),J({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},rt=(e,t,r,n)=>{let o=e.inputs,i=o.length===1?r:so(o,r);e.compute(Hr(t,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?Cm:n,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},Am=(e,t)=>{tt(e.inputs),rt(e,"ReduceLogSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},Em=(e,t)=>{tt(e.inputs),rt(e,"ReduceL1",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},km=(e,t)=>{tt(e.inputs),rt(e,"ReduceL2",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Pm=(e,t)=>{tt(e.inputs),rt(e,"ReduceLogSumExp",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},zm=(e,t)=>{tt(e.inputs),rt(e,"ReduceMax",t,(n,o,i)=>{let a=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&a.push(n.indicesSet("input_indices",u,0));return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},Om=(e,t)=>{tt(e.inputs),rt(e,"ReduceMean",t,(n,o,i)=>{let a=1;for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&(a*=e.inputs[0].dims[u]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${a});`]})},Bm=(e,t)=>{tt(e.inputs),rt(e,"ReduceMin",t,(n,o,i)=>{let a=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&a.push(`input_indices[${u}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},Dm=(e,t)=>{tt(e.inputs),rt(e,"ReduceProd",t,(n,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},Mm=(e,t)=>{tt(e.inputs),rt(e,"ReduceSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},Rm=(e,t)=>{tt(e.inputs),rt(e,"ReduceSumSquare",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},nt=(e,t,r)=>{if(t.length===0)return r;let n=1,o=1;for(let i=0;i<t.length;i++)t.indexOf(i)===-1?n*=e[i]:o*=e[i];return o<32&&n>1024},gs=(e,t)=>{nt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Om(e,t):is(e,t)},bs=(e,t)=>{nt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Em(e,t):as(e,t)},ys=(e,t)=>{nt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?km(e,t):ss(e,t)},_s=(e,t)=>{nt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Pm(e,t):us(e,t)},ws=(e,t)=>{nt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?zm(e,t):ds(e,t)},vs=(e,t)=>{nt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Bm(e,t):ls(e,t)},$s=(e,t)=>{nt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Dm(e,t):cs(e,t)},xs=(e,t)=>{nt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Mm(e,t):ps(e,t)},Ss=(e,t)=>{nt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Rm(e,t):ms(e,t)},Ts=(e,t)=>{nt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Am(e,t):fs(e,t)}});var Is,Cs,As,uo,Es=U(()=>{"use strict";ee();Se();Gr();Is=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Cs=(e,t)=>{Is(e.inputs);let r=(n,o,i)=>{let a=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&a.push(`input_indices[${u}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Hr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},As=(e,t)=>{Is(e.inputs);let r=(n,o,i)=>{let a=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&a.push(`input_indices[${u}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Hr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},uo=e=>J(e)});var Um,lo,Nm,Vm,Wm,Rt,Lm,ks,Fr=U(()=>{"use strict";ee();ne();Vr();ie();Um=(e,t)=>{let r=e[0],n=e[1],o=e[2],i=e[3],a=e[4],u=e[5];if(a&&u)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let d=r.dims[0],c=r.dims[1],p=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(n.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==p)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==n.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let m=o.dims[0]/3,f=m,b=f;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let x of t.qkvHiddenSizes)if(x%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");m=t.qkvHiddenSizes[0],f=t.qkvHiddenSizes[1],b=t.qkvHiddenSizes[2]}let g=c;if(m!==f)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==m+f+b)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let _=0;if(a){if(f!==b)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==d)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==f/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(_=a.dims[3])}let S=g+_,$=-1,v=0;if(i)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==d||u.dims[1]!==t.numHeads||u.dims[2]!==c||u.dims[3]!==S)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:c,pastSequenceLength:_,kvSequenceLength:g,totalSequenceLength:S,maxSequenceLength:$,inputHiddenSize:p,hiddenSize:m,vHiddenSize:b,headSize:Math.floor(m/t.numHeads),vHeadSize:Math.floor(b/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},lo=(e,t,r)=>t&&e?`
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
    `,Nm=(e,t,r,n,o,i,a,u)=>{let d=ce(a?1:i),c=64,p=i/d;p<c&&(c=32);let m=Math.ceil(i/d/c),f=[{type:12,data:t},{type:12,data:r},{type:12,data:n},{type:12,data:o},{type:12,data:p},{type:12,data:m}],b=be(e.dataType,d),g=Ae(1,d),_=["type"];a&&_.push("type"),u&&_.push("type");let S=$=>{let v=M("x",e.dataType,e.dims,d),x=[v],T=a?P("seq_lens",a.dataType,a.dims):void 0;T&&x.push(T);let E=u?P("total_sequence_length_input",u.dataType,u.dims):void 0;E&&x.push(E);let I=Ae(e.dataType),z=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${c}>;
  var<workgroup> thread_sum: array<f32, ${c}>;
  ${$.registerUniforms(z).declareVariables(...x)}
  ${$.mainStart([c,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${lo(T,E,!1)}
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
        x[offset + i] = ${v.type.value}(${I}(1.0) / ${I}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${g}(x[offset + i]);
        x[offset + i] = ${v.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${v.type.value}(${I}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${c};${b};${d}`,inputDependencies:_},getShaderSource:S,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:o,z:t*r},programUniforms:f})}},Vm=(e,t,r,n,o,i,a,u,d)=>{let c=a+i.kvSequenceLength,p=[i.batchSize,i.numHeads,i.sequenceLength,c],m=e>1&&n,f=i.kvNumHeads?i.kvNumHeads:i.numHeads,b=m?[i.batchSize,f,c,i.headSize]:void 0,g=i.nReps?i.nReps:1,_=i.scale===0?1/Math.sqrt(i.headSize):i.scale,S=ce(i.headSize),$=i.headSize/S,v=12,x={x:Math.ceil(c/v),y:Math.ceil(i.sequenceLength/v),z:i.batchSize*i.numHeads},T=[{type:12,data:i.sequenceLength},{type:12,data:$},{type:12,data:c},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:_},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:g}],E=m&&n&&k.size(n.dims)>0,I=["type","type"];E&&I.push("type"),o&&I.push("type"),u&&I.push("type"),d&&I.push("type");let z=[{dims:p,dataType:t.dataType,gpuDataType:0}];m&&z.push({dims:b,dataType:t.dataType,gpuDataType:0});let O=D=>{let L=P("q",t.dataType,t.dims,S),q=P("key",r.dataType,r.dims,S),Q=[L,q];if(E){let X=P("past_key",n.dataType,n.dims,S);Q.push(X)}o&&Q.push(P("attention_bias",o.dataType,o.dims));let W=u?P("seq_lens",u.dataType,u.dims):void 0;W&&Q.push(W);let Z=d?P("total_sequence_length_input",d.dataType,d.dims):void 0;Z&&Q.push(Z);let we=M("output",t.dataType,p),H=[we];m&&H.push(M("present_key",t.dataType,b,S));let j=Ae(1,S),te=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;

  var<workgroup> tileQ: array<${L.type.storage}, ${v*v}>;
  var<workgroup> tileK: array<${L.type.storage}, ${v*v}>;
  ${D.registerUniforms(te).declareVariables(...Q,...H)}
  ${D.mainStart([v,v,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${g===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${g===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${lo(W,Z,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${E&&m?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${m?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${j}(0);
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
          value += ${j}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(S){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${S}`)}})()};
        output[outputIdx] = ${we.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${S};${o!==void 0};${n!==void 0};${e}`,inputDependencies:I},getRunData:()=>({outputs:z,dispatchGroup:x,programUniforms:T}),getShaderSource:O}},Wm=(e,t,r,n,o,i,a=void 0,u=void 0)=>{let d=i+o.kvSequenceLength,c=o.nReps?o.nReps:1,p=o.vHiddenSize*c,m=e>1&&n,f=o.kvNumHeads?o.kvNumHeads:o.numHeads,b=m?[o.batchSize,f,d,o.headSize]:void 0,g=[o.batchSize,o.sequenceLength,p],_=12,S={x:Math.ceil(o.vHeadSize/_),y:Math.ceil(o.sequenceLength/_),z:o.batchSize*o.numHeads},$=[{type:12,data:o.sequenceLength},{type:12,data:d},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:p},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:c}],v=m&&n&&k.size(n.dims)>0,x=["type","type"];v&&x.push("type"),a&&x.push("type"),u&&x.push("type");let T=[{dims:g,dataType:t.dataType,gpuDataType:0}];m&&T.push({dims:b,dataType:t.dataType,gpuDataType:0});let E=I=>{let z=P("probs",t.dataType,t.dims),O=P("v",r.dataType,r.dims),D=[z,O];v&&D.push(P("past_value",n.dataType,n.dims));let L=a?P("seq_lens",a.dataType,a.dims):void 0;a&&D.push(L);let q=u?P("total_sequence_length_input",u.dataType,u.dims):void 0;u&&D.push(q);let W=[M("output",t.dataType,g)];m&&W.push(M("present_value",t.dataType,b));let Z=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;
  var<workgroup> tileQ: array<${z.type.value}, ${_*_}>;
  var<workgroup> tileV: array<${z.type.value}, ${_*_}>;
  ${I.registerUniforms(Z).declareVariables(...D,...W)}
  ${I.mainStart([_,_,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${c===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${c===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${lo(L,q,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${v&&m?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${m?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${z.type.storage}(0);
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${n!==void 0};${e}`,inputDependencies:x},getRunData:()=>({outputs:T,dispatchGroup:S,programUniforms:$}),getShaderSource:E}},Rt=(e,t,r,n,o,i,a,u,d,c,p=void 0,m=void 0)=>{let f=Math.min(e.outputCount,1+(a?1:0)+(u?1:0)),b=f>1?c.pastSequenceLength:0,g=b+c.kvSequenceLength,_=d&&k.size(d.dims)>0?d:void 0,S=[t,r];f>1&&a&&k.size(a.dims)>0&&S.push(a),_&&S.push(_),p&&S.push(p),m&&S.push(m);let $=e.compute(Vm(f,t,r,a,_,c,b,p,m),{inputs:S,outputs:f>1?[-1,1]:[-1]})[0];e.compute(Nm($,c.batchSize,c.numHeads,b,c.sequenceLength,g,p,m),{inputs:p&&m?[$,p,m]:[$],outputs:[]});let v=[$,n];f>1&&u&&k.size(u.dims)>0&&v.push(u),p&&v.push(p),m&&v.push(m),e.compute(Wm(f,$,n,u,c,b,p,m),{inputs:v,outputs:f>1?[0,2]:[0]})},Lm=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],n=t.sequenceLength,o=t.inputHiddenSize,i=t.headSize,a=12,u={x:Math.ceil(t.headSize/a),y:Math.ceil(t.sequenceLength/a),z:t.batchSize*t.numHeads},d=[e.inputs[0],e.inputs[1],e.inputs[2]],c=[{type:12,data:n},{type:12,data:o},{type:12,data:i},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],p=m=>{let f=M("output_q",d[0].dataType,r),b=M("output_k",d[0].dataType,r),g=M("output_v",d[0].dataType,r),_=P("input",d[0].dataType,d[0].dims),S=P("weight",d[1].dataType,d[1].dims),$=P("bias",d[2].dataType,d[2].dims),v=_.type.storage,x=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${v}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${v}, ${a*a}>;
  var<workgroup> tileWeightK: array<${v}, ${a*a}>;
  var<workgroup> tileWeightV: array<${v}, ${a*a}>;
  ${m.registerUniforms(x).declareVariables(_,S,$,f,b,g)}
  ${m.mainStart([a,a,1])}
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:c}),getShaderSource:p},{inputs:d,outputs:[-1,-1,-1]})},ks=(e,t)=>{let r=Um(e.inputs,t),[n,o,i]=Lm(e,r);return Rt(e,n,o,i,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}});var Gm,Hm,Fm,Ps,zs=U(()=>{"use strict";We();ee();ne();Se();ie();Gm=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(n,o,i)=>{let a=o.length;if(a!==n.length)throw new Error(`${i}: num dimensions != ${a}`);o.forEach((u,d)=>{if(u!==n[d])throw new Error(`${i}: dim[${d}] do not match`)})};if(e[0].dims.length>1){let n=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Hm=(e,t)=>{let{epsilon:r,spatial:n,format:o}=t,i=e[0].dims,a=n?ce(i[i.length-1]):1,u=o==="NHWC"&&i.length>1?a:1,d=k.size(i)/a,c=n,p=c?i.length:i,m=P("x",e[0].dataType,e[0].dims,a),f=P("scale",e[1].dataType,e[1].dims,u),b=P("bias",e[2].dataType,e[2].dims,u),g=P("inputMean",e[3].dataType,e[3].dims,u),_=P("inputVar",e[4].dataType,e[4].dims,u),S=M("y",e[0].dataType,p,a),$=()=>{let x="";if(n)x=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${a}`:"outputIndices[1]"};`;else if(o==="NCHW")x=`
            ${S.indicesSet("outputIndices","0","0")}
            let cOffset = ${S.indicesToOffset("outputIndices")};`;else{x=`var cIndices = ${f.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let T=1;T<f.rank;T++)x+=`cIndices[${T}] = outputIndices[${T}];`;x+=`let cOffset = ${f.indicesToOffset("cIndices")};`}return x},v=x=>`
  const epsilon = ${r};
  ${x.registerUniform("outputSize","u32").declareVariables(m,f,b,g,_,S)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${S.offsetToIndices(`global_idx * ${a}`)};
    ${$()}
    let scale = ${f.getByOffset("cOffset")};
    let bias = ${b.getByOffset("cOffset")};
    let inputMean = ${g.getByOffset("cOffset")};
    let inputVar = ${_.getByOffset("cOffset")};
    let x = ${m.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${S.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${a}`,inputDependencies:c?["rank","type","type","type","type"]:void 0},getShaderSource:v,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c?[{type:12,data:d},...N(i)]:[{type:12,data:d}]})}},Fm=e=>J(e),Ps=(e,t)=>{let{inputs:r,outputCount:n}=e,o=Fm({...t,outputCount:n});if(ge.webgpu.validateInputContent&&Gm(r,o),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Hm(r,o))}});var qm,jm,Os,Bs=U(()=>{"use strict";ne();ie();qm=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},jm=e=>{let t=e[0].dims,r=e[0].dims[2],n=k.size(t)/4,o=e[0].dataType,i=P("input",o,t,4),a=P("bias",o,[r],4),u=P("residual",o,t,4),d=M("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:p=>`
  const channels = ${r}u / 4;
  ${p.declareVariables(i,a,u,d)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${i.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${d.setByOffset("global_idx","value")}
  }`}},Os=e=>{qm(e.inputs),e.compute(jm(e.inputs))}});var Km,me,Ds,Ms,Rs,Us,Ns,Vs,Ws,Ls,Gs,Zm,Hs,Fs,qs,js,Yt,Ks,qr,Zs,Qs,Ys,Xs,Js,eu,tu,ru,nu,ou,iu,au,su,uu,du,lu,cu,pu,co,po,mu,fu,hu,Qm,Ym,gu,jr=U(()=>{"use strict";ee();ne();Se();ie();Km=(e,t,r,n,o,i,a)=>{let u=Math.ceil(t/4),d="";typeof o=="string"?d=`${o}(a)`:d=o("a");let c=P("inputData",r,[u],4),p=M("outputData",n,[u],4),m=[{name:"vec_size",type:"u32"}];return a&&m.push(...a),`
      ${e.registerUniforms(m).declareVariables(c,p)}

  ${i??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${c.getByOffset("global_idx")};
    ${p.setByOffset("global_idx",d)}
  }`},me=(e,t,r,n,o,i=e.dataType,a,u)=>{let d=[{type:12,data:Math.ceil(k.size(e.dims)/4)}];return a&&d.push(...a),{name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:c=>Km(c,k.size(e.dims),e.dataType,i,r,n,u),getRunData:c=>({outputs:[{dims:e.dims,dataType:i}],dispatchGroup:{x:Math.ceil(k.size(c[0].dims)/64/4)},programUniforms:d})}},Ds=e=>{e.compute(me(e.inputs[0],"Abs","abs"))},Ms=e=>{e.compute(me(e.inputs[0],"Acos","acos"))},Rs=e=>{e.compute(me(e.inputs[0],"Acosh","acosh"))},Us=e=>{e.compute(me(e.inputs[0],"Asin","asin"))},Ns=e=>{e.compute(me(e.inputs[0],"Asinh","asinh"))},Vs=e=>{e.compute(me(e.inputs[0],"Atan","atan"))},Ws=e=>{e.compute(me(e.inputs[0],"Atanh","atanh"))},Ls=e=>J(e),Gs=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(me(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Zm=e=>{let t,r,n=e.length>=2&&e[1].data!==0,o=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=n?e[1].getFloat32Array()[0]:-34028234663852886e22,r=o?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=n?e[1].getUint16Array()[0]:64511,r=o?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return J({min:t,max:r})},Hs=(e,t)=>{let r=t||Zm(e.inputs),n=Ae(e.inputs[0].dataType);e.compute(me(e.inputs[0],"Clip",o=>`clamp(${o}, vec4<${n}>(uniforms.min), vec4<${n}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:n},{name:"max",type:n}]),{inputs:[0]})},Fs=e=>{e.compute(me(e.inputs[0],"Ceil","ceil"))},qs=e=>{e.compute(me(e.inputs[0],"Cos","cos"))},js=e=>{e.compute(me(e.inputs[0],"Cosh","cosh"))},Yt=e=>J(e),Ks=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(me(e.inputs[0],"Elu",n=>`elu_vf32(${n})`,`
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
}`,Zs=e=>{let t=Ae(e.inputs[0].dataType);e.compute(me(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,qr(t)))},Qs=e=>{e.compute(me(e.inputs[0],"Exp","exp"))},Ys=e=>{e.compute(me(e.inputs[0],"Floor","floor"))},Xs=e=>{let t=Ae(e.inputs[0].dataType);e.compute(me(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,qr(t)))},Js=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(me(e.inputs[0],"LeakyRelu",n=>`select(leaky_relu_alpha_ * ${n}, ${n}, ${n} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},eu=e=>{e.compute(me(e.inputs[0],"Not",t=>`!${t}`))},tu=e=>{e.compute(me(e.inputs[0],"Neg",t=>`-${t}`))},ru=e=>{e.compute(me(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},nu=e=>{let t=Ae(e.inputs[0].dataType);e.compute(me(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},ou=e=>{e.compute(me(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},iu=e=>J(e),au=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(me(e.inputs[0],"HardSigmoid",n=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${n} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},su=e=>{e.compute(me(e.inputs[0],"Sin","sin"))},uu=e=>{e.compute(me(e.inputs[0],"Sinh","sinh"))},du=e=>{e.compute(me(e.inputs[0],"Sqrt","sqrt"))},lu=e=>{e.compute(me(e.inputs[0],"Tan","tan"))},cu=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,pu=e=>{e.compute(me(e.inputs[0],"Tanh",cu))},co=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${cu("v")};
}
`,po=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,mu=e=>{let t=Ae(e.inputs[0].dataType);e.compute(me(e.inputs[0],"FastGelu",po,co(t),void 0,e.inputs[0].dataType))},fu=(e,t)=>{let r=Ae(e.inputs[0].dataType);return e.compute(me(e.inputs[0],"ThresholdedRelu",n=>`select(vec4<${r}>(0.0), ${n}, ${n} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},hu=e=>{e.compute(me(e.inputs[0],"Log","log"))},Qm=(e,t)=>`
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
`,Ym=e=>`quick_gelu_impl(${e})`,gu=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(me(e.inputs[0],"QuickGelu",Ym,Qm(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}});var Xm,Jm,yu,_u=U(()=>{"use strict";ne();ie();jr();Xm=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Jm=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=P("input",e[0].dataType,e[0].dims,4),n=P("bias",e[0].dataType,[e[0].dims[2]],4),o=M("output",e[0].dataType,t,4),i=k.size(t)/4,a=be(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:d=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${d.declareVariables(r,n,o)}

  ${qr(a)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},yu=e=>{Xm(e.inputs),e.compute(Jm(e.inputs))}});var ef,tf,ot,wu,vu,$u,xu,Su,Tu,Iu,Cu,Au,Eu,ku=U(()=>{"use strict";ee();ne();ie();ef=(e,t,r,n,o,i,a,u,d,c,p,m)=>{let f,b;typeof u=="string"?f=b=(v,x)=>`${u}((${v}),(${x}))`:typeof u=="function"?f=b=u:(f=u.scalar,b=u.vector);let g=M("outputData",p,n.length,4),_=P("aData",d,t.length,4),S=P("bData",c,r.length,4),$;if(o)if(i){let v=k.size(t)===1,x=k.size(r)===1,T=t.length>0&&t[t.length-1]%4===0,E=r.length>0&&r[r.length-1]%4===0;v||x?$=g.setByOffset("global_idx",b(v?`${_.type.value}(${_.getByOffset("0")}.x)`:_.getByOffset("global_idx"),x?`${S.type.value}(${S.getByOffset("0")}.x)`:S.getByOffset("global_idx"))):$=`
            let outputIndices = ${g.offsetToIndices("global_idx * 4u")};
            let offsetA = ${_.broadcastedIndicesToOffset("outputIndices",g)};
            let offsetB = ${S.broadcastedIndicesToOffset("outputIndices",g)};
            ${g.setByOffset("global_idx",b(a||T?_.getByOffset("offsetA / 4u"):`${_.type.value}(${_.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||E?S.getByOffset("offsetB / 4u"):`${S.type.value}(${S.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=g.setByOffset("global_idx",b(_.getByOffset("global_idx"),S.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let v=(x,T,E="")=>{let I=`aData[indexA${T}][componentA${T}]`,z=`bData[indexB${T}][componentB${T}]`;return`
            let outputIndices${T} = ${g.offsetToIndices(`global_idx * 4u + ${T}u`)};
            let offsetA${T} = ${_.broadcastedIndicesToOffset(`outputIndices${T}`,g)};
            let offsetB${T} = ${S.broadcastedIndicesToOffset(`outputIndices${T}`,g)};
            let indexA${T} = offsetA${T} / 4u;
            let indexB${T} = offsetB${T} / 4u;
            let componentA${T} = offsetA${T} % 4u;
            let componentB${T} = offsetB${T} % 4u;
            ${x}[${T}] = ${E}(${f(I,z)});
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
        ${e.registerUniform("vec_size","u32").declareVariables(_,S,g)}

        ${m??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},tf=(e,t,r,n,o,i,a=r.dataType)=>{let u=r.dims.map(_=>Number(_)??1),d=n.dims.map(_=>Number(_)??1),c=!k.areEqual(u,d),p=u,m=k.size(u),f=!1,b=!1,g=[c];if(c){let _=Je.calcShape(u,d,!1);if(!_)throw new Error("Can't perform binary op on the given tensors");p=_.slice(),m=k.size(p);let S=k.size(u)===1,$=k.size(d)===1,v=u.length>0&&u[u.length-1]%4===0,x=d.length>0&&d[d.length-1]%4===0;g.push(S),g.push($),g.push(v),g.push(x);let T=1;for(let E=1;E<p.length;E++){let I=u[u.length-E],z=d[d.length-E];if(I===z)T*=I;else break}T%4===0?(b=!0,f=!0):(S||$||v||x)&&(f=!0)}else f=!0;return g.push(f),{name:e,shaderCache:{hint:t+g.map(_=>_.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:_=>ef(_,u,d,p,f,c,b,o,r.dataType,n.dataType,a,i),getRunData:()=>({outputs:[{dims:p,dataType:a}],dispatchGroup:{x:Math.ceil(m/64/4)},programUniforms:[{type:12,data:Math.ceil(k.size(p)/4)},...N(u,d,p)]})}},ot=(e,t,r,n,o,i)=>{e.compute(tf(t,o??"",e.inputs[0],e.inputs[1],r,n,i))},wu=e=>{ot(e,"Add",(t,r)=>`${t}+${r}`)},vu=e=>{ot(e,"Div",(t,r)=>`${t}/${r}`)},$u=e=>{ot(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},xu=e=>{ot(e,"Mul",(t,r)=>`${t}*${r}`)},Su=e=>{let t=P("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;ot(e,"Pow",{scalar:(n,o)=>`pow_custom(${n},${o})`,vector:(n,o)=>`pow_vector_custom(${n},${o})`},`
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
      `)},Tu=e=>{ot(e,"Sub",(t,r)=>`${t}-${r}`)},Iu=e=>{ot(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Cu=e=>{ot(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Au=e=>{ot(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Eu=e=>{ot(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}});var nf,of,af,sf,Pu,zu,Ou=U(()=>{"use strict";ee();ne();Se();ie();nf=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,n=e[r],o=n.dataType,i=n.dims.length;e.forEach((a,u)=>{if(u!==r){if(a.dataType!==o)throw new Error("input tensors should be one type");if(a.dims.length!==i)throw new Error("input tensors should have the same shape");a.dims.forEach((d,c)=>{if(c!==t&&d!==n.dims[c])throw new Error("non concat dimensions must match")})}})},of=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,af=(e,t)=>{let r=e.length,n=[];for(let o=0;o<r;++o){let i=t.setByOffset("global_idx",e[o].getByIndices("indices"));r===1?n.push(i):o===0?n.push(`if (inputIndex == ${o}u) { ${i} }`):o===r-1?n.push(`else { ${i} }`):n.push(`else if (inputIndex == ${o}) { ${i} }`)}return n.join(`
`)},sf=(e,t,r,n)=>{let o=k.size(r),i=new Array(e.length),a=new Array(e.length),u=0,d=[],c=[],p=[{type:12,data:o}];for(let _=0;_<e.length;++_)u+=e[_].dims[t],i[_]=u,c.push(e[_].dims.length),a[_]=P(`input${_}`,n,c[_]),d.push("rank"),p.push({type:12,data:i[_]});for(let _=0;_<e.length;++_)p.push(...N(e[_].dims));p.push(...N(r));let m=M("output",n,r.length),f=m.indicesGet("indices",t),b=Array.from(Array(i.length).keys()).map(_=>`uniforms.sizeInConcatAxis${_}`).join(","),g=_=>`

  ${(()=>{_.registerUniform("outputSize","u32");for(let S=0;S<e.length;S++)_.registerUniform(`sizeInConcatAxis${S}`,"u32");return _.declareVariables(...a,m)})()}

  ${of(i.length,b)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${m.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${f});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${b});
      ${f} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${af(a,m)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:p}),getShaderSource:g}},Pu=(e,t)=>{let r=e.inputs,n=r[0].dims,o=k.normalizeAxis(t.axis,n.length);nf(r,o);let i=n.slice();i[o]=r.reduce((u,d)=>u+(d.dims.length>o?d.dims[o]:0),0);let a=r.filter(u=>k.size(u.dims)>0);e.compute(sf(a,o,i,r[0].dataType),{inputs:a})},zu=e=>J({axis:e.axis})});var Fe,qe,je,Kr,bt=U(()=>{"use strict";ee();ne();Fe=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},qe=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},je=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Kr=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,n]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:n}}else if(t==="Clip"){let[r,n]=e?.activation_params||[Wa,La];return{activation:t,clipMax:n,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}});var Ie,Bu,Zr=U(()=>{"use strict";Ie=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Bu=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Du,Mu=U(()=>{"use strict";Du=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var Xt,Qr,Yr=U(()=>{"use strict";ee();ne();ie();bt();Xt=(e,t,r,n,o)=>{let i=n-r;return`
      ${Array.from({length:r}).map((a,u)=>`
      if (${F(t.shape,u,t.rank)} != 1) {
        ${t.indicesSet(e,u,F(o,u+i,n))}
      } else {
        ${t.indicesSet(e,u,0)}
      }`).join("")}
`},Qr=(e,t,r,n,o=!1,i)=>{let a=e[0].dims,u=e[1].dims,d=a[a.length-2],c=u[u.length-1],p=a[a.length-1],m=ce(c),f=ce(p),b=ce(d),g=k.size(r)/m/b,_=e.length>2,S=n?n.slice(0,-2):r.slice(0,-2),v=[k.size(S),d,c],x=[{type:12,data:g},{type:12,data:d},{type:12,data:c},{type:12,data:p}];qe(t,x),x.push(...N(S,a,u)),_&&x.push(...N(e[2].dims)),x.push(...N(v));let T=E=>{let I=Lr("batch_dims",e[0].dataType,S.length),z=P("a",e[0].dataType,a.length,f),O=P("b",e[1].dataType,u.length,m),D=M("output",e[0].dataType,v.length,m),L=be(D.type.tensor),q=Fe(t,D.type.value,L),Q=[z,O],W="";if(_){let H=o?m:1;Q.push(P("bias",e[2].dataType,e[2].dims.length,H)),W=`${o?`value += bias[col / ${H}];`:`value += ${D.type.value}(bias[row + i]);`}`}let Z=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];je(t,Z);let we=()=>{let H=`var a_data: ${z.type.value};`;for(let j=0;j<f;j++)H+=`
              let b_data${j} = b[(b_offset + (k + ${j}) * uniforms.N + col) / ${m}];`;for(let j=0;j<b;j++){H+=`a_data = a[(a_offset + (row + ${j}) * uniforms.K + k) / ${f}];`;for(let te=0;te<f;te++)H+=`
            values[${j}] = fma(${O.type.value}(a_data${f===1?"":`[${te}]`}), b_data${te}, values[${j}]);
`}return H};return`
  ${E.registerUniforms(Z).registerInternalVariables(I).declareVariables(...Q,D)}
  ${E.mainStart()}
    ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${m})) * ${m};
    var index1 = global_idx / (uniforms.N / ${m});
    let stride1 = uniforms.M / ${b};
    let row = (index1 % stride1) * ${b};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${I.offsetToIndices("batch")};`}

    var a_indices: ${z.type.indices};
    ${Xt("a_indices",z,z.rank-2,I.rank,"batch_indices")}
    ${z.indicesSet("a_indices",z.rank-2,0)}
    ${z.indicesSet("a_indices",z.rank-1,0)}
    let a_offset = ${z.indicesToOffset("a_indices")};

    var b_indices: ${O.type.indices};
    ${Xt("b_indices",O,O.rank-2,I.rank,"batch_indices")}
    ${O.indicesSet("b_indices",O.rank-2,0)}
    ${O.indicesSet("b_indices",O.rank-1,0)}
    let b_offset = ${O.indicesToOffset("b_indices")};
    var values: array<${D.type.value}, ${b}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${f}) {
      ${we()}
    }
    for (var i = 0u; i < ${b}u; i++) {
      var value = values[i];
      ${W}
      ${q}
      let cur_indices = ${D.type.indices}(batch, row + i, col);
      let offset = ${D.indicesToOffset("cur_indices")};
      ${D.setByOffset(`offset / ${m}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${m};${f};${b};${o}`,inputDependencies:_?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:x}),getShaderSource:T}}});var uf,df,mo,Ru,lf,fo,cf,Jt,Xr=U(()=>{"use strict";ee();ne();ie();bt();Yr();Zr();uf=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,df=(e,t)=>e?`
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
        }`,mo=(e,t,r="f32",n,o=!1,i=32,a=!1,u=32)=>{let d=t[1]*e[1],c=t[0]*e[0],p=o?d:i,m=o?i:d,f=p/t[0],b=i/t[1];if(!((o&&f===4&&e[1]===4||!o&&(f===3||f===4))&&p%t[0]===0&&i%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${f} and workPerThread[1] ${e[1]} must be 4.
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
  let tileRowB = localRow * ${b};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${uf(o,n)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
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

          ${df(o,f)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Ru=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,lf=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",fo=(e,t,r="f32",n,o=!1,i=32,a=!1,u=32,d=!1)=>{let c=e[1]*t[1],p=e[0]*t[0],m=o?c:i,f=o?i:c;if(!(f%t[1]===0&&m%t[0]===0&&i%t[1]===0))throw new Error(`tileAHight ${f} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${m} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let b=f/t[1],g=m/t[0],_=i/t[1],S=d?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${c};
    let globalColStart = i32(workgroupId.x) * ${p};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${f}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${m}; inputCol = inputCol + ${t[0]}) {
          ${Ru(o,n)}
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

let tileRowA = i32(localId.y) * ${b};
let tileColA = i32(localId.x) * ${g};
let tileRowB = i32(localId.y) * ${_};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${g}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Ru(o,n)}
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
      ${lf(o)}
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
    ${S}
  }
`},cf=(e,t,r,n,o=!1)=>{let[i,a,u,d]=n,c=be(n[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Ie(e,c)} {
      var value = ${Ie(e,c)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${Xt("aIndices",a,a.rank-2,i.rank,"batchIndices")}
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
        ${Xt("bIndices",u,u.rank-2,i.rank,"batchIndices")}
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
    `},Jt=(e,t,r,n,o=!1,i)=>{let a=e[0].dims,u=e[1].dims,d=a.slice(0,-2),c=u.slice(0,-2),p=n?n.slice(0,-2):r.slice(0,-2),m=k.size(p),f=a[a.length-2],b=a[a.length-1],g=u[u.length-1],_=b%4===0&&g%4===0,S=f<=8?[4,1,1]:[4,4,1],$=[8,8,1],v=[Math.ceil(g/$[0]/S[0]),Math.ceil(f/$[1]/S[1]),Math.ceil(m/$[2]/S[2])],x=_?4:1,T=[...d,f,b/x],E=T.length,I=[...c,b,g/x],z=I.length,O=[m,f,g/x],D=[{type:6,data:f},{type:6,data:g},{type:6,data:b}];qe(t,D),D.push(...N(p,T,I));let L=["rank","rank"],q=e.length>2;q&&(D.push(...N(e[2].dims)),L.push("rank")),D.push(...N(O));let Q=W=>{let Z=p.length,we=Lr("batchDims",e[0].dataType,Z,1),H=be(e[0].dataType),j=P("a",e[0].dataType,E,x),te=P("b",e[1].dataType,z,x),X=M("result",e[0].dataType,O.length,x),ue=[j,te];if(q){let V=o?x:1;ue.push(P("bias",e[2].dataType,e[2].dims.length,V))}let he=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];je(t,he);let ye=be(X.type.tensor),re=Fe(t,X.type.value,ye),C=cf(x,q,re,[we,j,te,X],o);return`
  ${W.registerUniforms(he).registerInternalVariables(we).declareVariables(...ue,X)}
  ${C}
  ${_?mo(S,$,H,we):fo(S,$,H,we)}
                   `};return{name:"MatMul",shaderCache:{hint:`${S};${t.activation};${_};${o}`,inputDependencies:L},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:D}),getShaderSource:Q}}});var pf,Uu,Nu=U(()=>{"use strict";ee();Xe();ie();bt();Zr();Mu();Xr();pf=(e,t,r,n,o=!1,i,a=4,u=4,d=4,c="f32")=>{let p=L=>{switch(L){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${c}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${L} is not supported.`)}},m=L=>{switch(L){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${L} is not supported.`)}},f=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,b=e?`
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
    `,g=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",_=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",S=e?"row":"col",$=e?"col":"row",v=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${S} / outWidth;
    let outCol = ${S} % outWidth;

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
    return resData;`,x=e?t&&n?`
    let col = colIn * ${a};
    ${v}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${v}
    }
    return ${Ie(a,c)}(0.0);`:n&&r?`
    let col = colIn * ${a};
    ${v}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${v}
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
    return ${Ie(u,c)}(0.0);`,E=Ie(d,c),I=e?Ie(a,c):Ie(u,c),z=e?Ie(u,c):Ie(a,c),O=Fe(i,E,c);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${I} {
      ${e?x:T}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${z} {
      ${e?T:x}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${E}) {
      let col = colIn * ${d};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${b}
      ${Bu(o)}
      ${O}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Uu=(e,t,r,n,o,i,a,u,d)=>{let c=t.format==="NHWC",p=c?e[0].dims[3]:e[0].dims[1],m=r[0],f=c?r[2]:r[3],b=c?r[1]:r[2],g=c?r[3]:r[1],_=c&&(p%4===0||p%3===0)&&g%4===0,S=c?g:f*b,$=c?f*b:g,v=[8,8,1],x=n<=8?[4,1,1]:[4,4,1],T=[Math.ceil(S/v[0]/x[0]),Math.ceil($/v[1]/x[1]),Math.ceil(m/v[2]/x[2])];se("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${T}`);let E=_?c&&p%4!==0?3:4:1,I=v[1]*x[1],z=v[0]*x[0],O=Math.max(v[0]*E,v[1]),D=n%I===0,L=o%z===0,q=i%O===0,Q=_?[E,4,4]:[1,1,1],W=[{type:6,data:n},{type:6,data:o},{type:6,data:i},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];qe(t,W),W.push(...N(e[0].dims,e[1].dims));let Z=["rank","rank"];a&&(W.push(...N(e[2].dims)),Z.push("rank")),W.push(...N(r));let we=H=>{let j=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];je(t,j);let te=_?4:1,X=be(e[0].dataType),ue=`
      fn setOutputAtIndex(flatIndex : i32, value : ${_?`vec4<${X}>`:X}) {
        result[flatIndex] = ${_?`vec4<${X}>`:X}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${_?`vec4<${X}>`:X}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${_?"/ 4":""}, value);
      }`,he=P("x",e[0].dataType,e[0].dims.length,E===3?1:E),ye=P("w",e[1].dataType,e[1].dims.length,te),re=[he,ye],C=M("result",e[0].dataType,r.length,te);if(a){let V=P("bias",e[2].dataType,e[2].dims.length,te);re.push(V),ue+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${_?`vec4<${X}>`:X} {
          return bias[coords.${c?"w":"y"}${_?"/ 4":""}];
        }`}return`
        ${Du("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${H.registerUniforms(j).declareVariables(...re,C)}
        ${ue}
        ${pf(c,D,L,q,a,t,Q[0],Q[1],Q[2],X)}
        ${_?mo(x,v,X,void 0,!c,O):fo(x,v,X,void 0,!c,O,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${E};${_};${D};${L};${q};${I};${z};${O}`,inputDependencies:Z},getRunData:()=>({outputs:[{dims:d?d(r):r,dataType:e[0].dataType}],dispatchGroup:{x:T[0],y:T[1],z:T[2]},programUniforms:W}),getShaderSource:we}}});var mf,Vu,Jr,ff,Wu,hf,Lu,Gu,Hu=U(()=>{"use strict";ee();Xe();ne();ie();bt();Zr();mf=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Vu=e=>typeof e=="number"?[e,e,e]:e,Jr=(e,t)=>t<=1?e:e+(e-1)*(t-1),ff=(e,t,r,n=1)=>{let o=Jr(t,n);return Math.floor((e[0]*(r-1)-r+o)/2)},Wu=(e,t,r,n,o)=>{o==null&&(o=ff(e,t[0],n[0]));let i=[0,0,0,r];for(let a=0;a<3;a++)e[a]+2*o>=t[a]&&(i[a]=Math.trunc((e[a]-t[a]+2*o)/n[a]+1));return i},hf=(e,t,r,n,o,i,a,u,d,c)=>{let p,m,f,b;if(e==="VALID"&&(e=0),typeof e=="number"){p={top:e,bottom:e,left:e,right:e,front:e,back:e};let g=Wu([t,r,n,1],[u,d,c],1,[o,i,a],e);m=g[0],f=g[1],b=g[2]}else if(Array.isArray(e)){if(!e.every((_,S,$)=>_===$[0]))throw Error(`Unsupported padding parameter: ${e}`);p={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let g=Wu([t,r,n,1],[u,d,c],1,[o,i,a],e[0]);m=g[0],f=g[1],b=g[2]}else if(e==="SAME_UPPER"){m=Math.ceil(t/o),f=Math.ceil(r/i),b=Math.ceil(n/a);let g=(m-1)*o+u-t,_=(f-1)*i+d-r,S=(b-1)*a+c-n,$=Math.floor(g/2),v=g-$,x=Math.floor(_/2),T=_-x,E=Math.floor(S/2),I=S-E;p={top:x,bottom:T,left:E,right:I,front:$,back:v}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:p,outDepth:m,outHeight:f,outWidth:b}},Lu=(e,t,r,n,o,i=!1,a="channelsLast")=>{let u,d,c,p,m;if(a==="channelsLast")[u,d,c,p,m]=e;else if(a==="channelsFirst")[u,m,d,c,p]=e;else throw new Error(`Unknown dataFormat ${a}`);let[f,,b,g,_]=t,[S,$,v]=Vu(r),[x,T,E]=Vu(n),I=Jr(b,x),z=Jr(g,T),O=Jr(_,E),{padInfo:D,outDepth:L,outHeight:q,outWidth:Q}=hf(o,d,c,p,S,$,v,I,z,O),W=i?f*m:f,Z=[0,0,0,0,0];return a==="channelsFirst"?Z=[u,W,L,q,Q]:a==="channelsLast"&&(Z=[u,L,q,Q,W]),{batchSize:u,dataFormat:a,inDepth:d,inHeight:c,inWidth:p,inChannels:m,outDepth:L,outHeight:q,outWidth:Q,outChannels:W,padInfo:D,strideDepth:S,strideHeight:$,strideWidth:v,filterDepth:b,filterHeight:g,filterWidth:_,effectiveFilterDepth:I,effectiveFilterHeight:z,effectiveFilterWidth:O,dilationDepth:x,dilationHeight:T,dilationWidth:E,inShape:e,outShape:Z,filterShape:t}},Gu=(e,t,r,n,o,i)=>{let a=i==="channelsLast",u=a?e[0].dims[3]:e[0].dims[1],d=!1,c=[64,1,1],p={x:r.map((v,x)=>x)},m=[Math.ceil(mf(p.x.map(v=>r[v]))/c[0]),1,1];se("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${m}`);let f=d?a&&u%4!==0?3:4:1,b=k.size(r),g=[{type:12,data:b},{type:12,data:n},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];qe(t,g),g.push(...N(e[0].dims,e[1].dims));let _=["rank","rank"],S=e.length===3;S&&(g.push(...N(e[2].dims)),_.push("rank")),g.push(...N(r));let $=v=>{let x=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:n.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];je(t,x);let T=d?4:1,E=be(e[0].dataType),I=P("x",e[0].dataType,e[0].dims.length,f===3?1:f),z=P("W",e[1].dataType,e[1].dims.length,T),O=[I,z],D=M("result",e[0].dataType,r.length,T),L="";if(S){let W=P("bias",e[2].dataType,e[2].dims.length,T);O.push(W),L+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${d?`vec4<${E}>`:E} {
          return bias[${a?F("coords",4,5):F("coords",1,5)}${d?"/ 4":""}];
        }`}let q=Ie(f,E),Q=Fe(t,q,E);return`
            ${L}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${z.getByIndices("aIndices")};
            }
          ${v.registerUniforms(x).declareVariables(...O,D)}
          ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${D.offsetToIndices("global_idx")};
              let batch = ${F("coords",0,I.rank)};
              let d2 = ${a?F("coords",I.rank-1,I.rank):F("coords",1,I.rank)};
              let xFRCCorner = vec3<u32>(${a?F("coords",1,I.rank):F("coords",2,I.rank)},
              ${a?F("coords",2,I.rank):F("coords",3,I.rank)},
              ${a?F("coords",3,I.rank):F("coords",4,I.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?F("uniforms.x_shape",1,I.rank):F("uniforms.x_shape",2,I.rank)};
              let xShapeZ = ${a?F("uniforms.x_shape",2,I.rank):F("uniforms.x_shape",3,I.rank)};
              let xShapeW = ${a?F("uniforms.x_shape",3,I.rank):F("uniforms.x_shape",4,I.rank)};
              let xShapeU = ${a?F("uniforms.x_shape",4,I.rank):F("uniforms.x_shape",1,I.rank)};
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
              ${S?"value = value + getBiasByOutputCoords(coords)":""};
              ${Q}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${a};${f};${S}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:m[0],y:m[1],z:m[2]},programUniforms:g}),getShaderSource:$}}});var Fu,qu,ju=U(()=>{"use strict";ee();ne();ie();bt();Fu=(e,t,r,n)=>{let o=e.length>2,i=o?"value += b[output_channel];":"",a=e[0].dims,u=e[1].dims,d=t.format==="NHWC",c=d?r[3]:r[1],p=c/t.group,m=d&&p>=4?ce(c):1,f=k.size(r)/m,b=[{type:12,data:f},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:p}];qe(t,b),b.push(...N(a,[u[0],u[1],u[2],u[3]/m]));let g=o?["rank","rank","rank"]:["rank","rank"];b.push(...N([r[0],r[1],r[2],r[3]/m]));let _=S=>{let $=M("output",e[0].dataType,r.length,m),v=be($.type.tensor),x=Fe(t,$.type.value,v),T=P("x",e[0].dataType,a.length),E=P("w",e[1].dataType,u.length,m),I=[T,E];o&&I.push(P("b",e[2].dataType,e[2].dims,m));let z=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];je(t,z);let O=d?`
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

            let xVal = ${T.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${E.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${S.registerUniforms(z).declareVariables(...I,$)}

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${$.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${d?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${d?1:2}], outputIndices[${d?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${m} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${d?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${O}
    ${i}
    ${x}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${m}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:b}),getShaderSource:_}},qu=(e,t,r,n)=>{let o=e.length>2,i=ce(r[3]),a=ce(r[2]),u=k.size(r)/i/a,d=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/i],c=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/i],p=[r[0],r[1],r[2],r[3]/i],m=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];qe(t,m),m.push(...N(d,c,p));let f=(a-1)*t.strides[1]+c[1],b=g=>{let _=M("output",e[0].dataType,p.length,i),S=be(_.type.tensor),$=Fe(t,_.type.value,S),v=P("x",e[0].dataType,d.length,i),x=P("w",e[1].dataType,c.length,i),T=[v,x];o&&T.push(P("b",e[2].dataType,e[2].dims,i));let E=o?"value += b[output_channel];":"",I=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return je(t,I),`
  ${g.registerUniforms(I).declareVariables(...T,_)}
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

    var x_vals: array<${v.type.value}, ${f}>;
    var values: array<${_.type.value}, ${a}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${c[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${f}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${v.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${v.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${c[1]}; w_width++) {
          let w_val = ${x.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${a}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${a}u; i++) {
      var value = values[i];
      ${E}
      ${$}
      ${_.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${i};${a};${f};${c[0]};${c[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:m}),getShaderSource:b}}});var gf,ho,bf,go,bo,Ku,yf,_f,yo,Zu=U(()=>{"use strict";ne();Nu();Hu();Xr();ju();bt();Yr();st();gf=(e,t,r,n,o,i)=>{let a=e[0],u=e.slice(i?1:2,i?3:4),d=u.length,c=t[0],m=t.slice(2).map((g,_)=>g+(g-1)*(r[_]-1)),b=u.map((g,_)=>g+n[_]+n[_+d]).map((g,_)=>Math.floor((g-m[_]+o[_])/o[_]));return b.splice(0,0,a),b.splice(i?3:1,0,c),b},ho=[2,3,1,0],bf=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[1]*t.group;if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},go=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let i=2;i<t[1].dims.length;++i)r[i-2]===0&&(r[i-2]=t[1].dims[i]);let n=e.pads.slice();Tt.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.format==="NHWC",e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:r,pads:n}),o},bo=e=>{let t=Kr(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],o=e.dilations,i=e.group,a=e.kernel_shape,u=e.pads,d=e.strides,c=e.w_is_const();return{autoPad:n,format:r,dilations:o,group:i,kernelShape:a,pads:u,strides:d,wIsConst:c,...t,cacheKey:`${e.format};${t.activation};`}},Ku=(e,t,r,n)=>{let o=r.format==="NHWC",i=gf(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,o);if(r.group!==1){let I=[t[0]];if(o){let O=e.kernelCustomData.wT??e.compute(Ee(t[1],ho),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=O),I.push(O)}else I.push(t[1]);t.length===3&&I.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(qu(I,r,i,n),{inputs:I}):e.compute(Fu(I,r,i,n),{inputs:I});return}let a=t.length===3,u=t[0].dims[o?1:2],d=t[0].dims[o?2:3],c=t[0].dims[o?3:1],p=t[1].dims[2],m=t[1].dims[3],f=i[o?1:2],b=i[o?2:3],g=i[o?3:1],_=o&&p===u&&m===d&&r.pads[0]===0&&r.pads[1]===0;if(_||p===1&&m===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let I=i[0],z,O,D,L=[];if(o){let W=e.kernelCustomData.wT??e.compute(Ee(t[1],ho),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=W),_){let Z=u*d*c;z=t[0].reshape([1,I,Z]),O=W.reshape([1,Z,g]),D=[1,I,g]}else z=t[0].reshape([I,u*d,c]),O=W.reshape([1,c,g]),D=[I,f*b,g];L.push(z),L.push(O)}else z=t[0].reshape([I,c,u*d]),O=t[1].reshape([1,g,c]),D=[I,g,f*b],L.push(O),L.push(z);a&&L.push(t[2]);let q=D[2],Q=L[0].dims[L[0].dims.length-1];q<8&&Q<8?e.compute(Qr(L,r,i,D,o,n),{inputs:L}):e.compute(Jt(L,r,i,D,o,n),{inputs:L});return}let S=!0,$=e.kernelCustomData.wT??e.compute(Ee(t[1],ho),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let v=[t[0],$];a&&v.push(t[2]);let x=o?f*b:g,T=o?g:f*b,E=p*m*c;e.compute(Uu(v,r,i,x,T,E,a,S,n),{inputs:v})},yf=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],i=[1].concat(t.strides),a=[1].concat(t.dilations),u=[1].concat(t.kernelShape),d=go({...t,pads:o,strides:i,dilations:a,kernelShape:u},n);Ku(e,n,d,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},_f=(e,t,r)=>{let n=r.format==="NHWC"?"channelsLast":"channelsFirst",o=go(r,t),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,a=Lu(t[0].dims,t[1].dims,r.strides,r.dilations,i,!1,n);e.compute(Gu(t,o,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],n))},yo=(e,t)=>{if(bf(e.inputs,t),e.inputs[0].dims.length===3)yf(e,t);else if(e.inputs[0].dims.length===5)_f(e,e.inputs,t);else{let r=go(t,e.inputs);Ku(e,e.inputs,r)}}});var Qu,Yu=U(()=>{"use strict";ee();Xe();ne();ie();Qu=(e,t,r)=>{let n=e.length>2,o=t.outputShape,i=t.format==="NHWC",a=t.group,u=e[1].dims,d=u[2]/a,c=u[3],p=i?ce(d):1,m=i&&c===1&&d>=4,f=m?Math.floor(d/4)*4:Math.floor(d/p)*p,b=d-f,g=i?ce(c):1,_=i?c===1?p:g:1,S=k.size(o)/g,$=[Math.ceil(S/64),1,1];se("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${$}`);let v=["rank","rank"],x=[t.strides[0],t.strides[1]],T=[t.kernelShape[i?1:2],t.kernelShape[i?2:3]],E=[t.dilations[0],t.dilations[1]],I=[T[0]+(t.dilations[0]<=1?0:(t.kernelShape[i?1:2]-1)*(t.dilations[0]-1)),T[1]+(t.dilations[1]<=1?0:(t.kernelShape[i?2:3]-1)*(t.dilations[1]-1))],z=[I[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),I[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],O=[{type:12,data:S},{type:12,data:x},{type:12,data:T},{type:12,data:E},{type:12,data:I},{type:6,data:z},{type:12,data:f},{type:12,data:d},{type:12,data:c},...N(e[0].dims,e[1].dims)];n&&(O.push(...N(e[2].dims)),v.push("rank")),O.push(...N(o));let D=L=>{let q=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:x.length},{name:"filter_dims",type:"u32",length:T.length},{name:"dilations",type:"u32",length:T.length},{name:"effective_filter_dims",type:"u32",length:I.length},{name:"pads",type:"i32",length:z.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],Q=be(e[0].dataType),W=i?1:2,Z=i?2:3,we=i?3:1,H=P("W",e[1].dataType,e[1].dims.length,_),j=P("Dy",e[0].dataType,e[0].dims.length,p),te=[j,H];n&&te.push(P("bias",e[2].dataType,[o[we]].length,g));let X=M("result",e[0].dataType,o.length,g),ue=()=>{let re="";if(m)p===4?re+=`
        let xValue = ${j.getByOffset("x_offset")};
        let wValue = ${H.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:p===2?re+=`
          dotProd = dotProd + dot(vec4<${Q}>(${j.getByOffset("x_offset")}, ${j.getByOffset("x_offset + 1u")}), vec4<${Q}>(${H.getByOffset("w_offset")}, ${H.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:p===1&&(re+=`
          dotProd = dotProd + dot(vec4<${Q}>(${j.getByOffset("x_offset")}, ${j.getByOffset("x_offset + 1u")}, ${j.getByOffset("x_offset + 2u")}, ${j.getByOffset("x_offset + 3u")}), vec4<${Q}>(${H.getByOffset("w_offset")}, ${H.getByOffset("w_offset + 1u")}, ${H.getByOffset("w_offset + 2u")}, ${H.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(re+=`
                  let xValue = ${i?j.getByOffset(`${j.indicesToOffset(`${j.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p}`):j.get("batch","inputChannel","idyR","idyC")};
        `,p===1)re+=`
          let w_offset = ${H.indicesToOffset(`${H.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${H.getByOffset(`w_offset / ${_}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let C=0;C<p;C++)re+=`
            let wValue${C} = ${H.getByOffset(`${H.indicesToOffset(`${H.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${C}, wOutChannel)`)} / ${_}`)};
            dotProd = dotProd + xValue[${C}] * wValue${C};`;return re},he=()=>{if(b===0)return"";if(!m)throw new Error(`packInputAs4 ${m} is not true.`);let re="";if(p===1){re+="dotProd = dotProd";for(let C=0;C<b;C++)re+=`
            + ${j.getByOffset(`x_offset + ${C}`)} * ${H.getByOffset(`w_offset + ${C}`)}`;re+=";"}else if(p===2){if(b!==2)throw new Error(`Invalid inputChannelsRemainder ${b}.`);re+=`
          let xValue = ${j.getByOffset("x_offset")};
          let wValue = ${H.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return re},ye=`
            let outputIndices = ${X.offsetToIndices(`global_idx * ${g}`)};
            let batch = ${X.indicesGet("outputIndices",0)};
            let d1 = ${X.indicesGet("outputIndices",we)};
            let r = ${X.indicesGet("outputIndices",W)};
            let c = ${X.indicesGet("outputIndices",Z)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${X.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${Q}(dyRCorner) + ${Q}(wR)) / ${Q}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${Q}(uniforms.Dy_shape[${W}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${Q}(dyCCorner) + ${Q}(wC)) / ${Q}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${Q}(uniforms.Dy_shape[${Z}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${m?`
                var x_offset = ${j.indicesToOffset(`${j.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p};
                var w_offset = ${H.indicesToOffset(`${H.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${_};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${m?4:p}) {
                  ${ue()}
                  inputChannel = inputChannel + ${m?4:p};
                }
                ${he()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${n?` + bias[d1 / ${g}]`:""};
            ${X.setByOffset("global_idx","value")};
          `;return`
    ${L.registerUniforms(q).declareVariables(...te,X)}
      ${L.mainStart()}
      ${L.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${ye}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${p}${_}${g}${m}${b}`,inputDependencies:v},getRunData:()=>({dispatchGroup:{x:$[0],y:$[1],z:$[2]},outputs:[{dims:r?r(o):o,dataType:e[0].dataType}],programUniforms:O}),getShaderSource:D}}});var wf,vf,$f,Xu,Ju,xf,ed,Sf,td,rd=U(()=>{"use strict";Yu();bt();st();wf=(e,t,r,n,o,i)=>(e-1)*t+r+(n-1)*o+1-i,vf=(e,t,r,n,o)=>{let i=Math.floor(e/2);t==="SAME_UPPER"?(r[n]=i,r[o]=e-i):t==="SAME_LOWER"&&(r[n]=e-i,r[o]=i)},$f=(e,t,r,n,o,i,a,u,d,c)=>{let p=e.length-2,m=c.length===0;d.length<p&&d.push(...Array(p-d.length).fill(0));let f=e[0],b=t[u?3:1]*o;for(let g=0,_=e.length-p-(u?1:0);g<p;++g,++_){let S=e[_],$=m?S*a[g]:c[g],v=wf(S,a[g],i[g],t[_],r[g],$);vf(v,n,i,g,g+p),m&&c.push(a[g]*(S-1)+d[g]+(t[_]-1)*r[g]+1-i[g]-i[g+p])}c.splice(0,0,f),c.splice(u?3:1,0,b)},Xu=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((m,f)=>m*f,1)===0){r.length=0;for(let m=2;m<t[1].dims.length;++m)r.push(t[1].dims[m])}let n=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let o=e.pads.slice(),i=e.outputShape.slice(),a=e.outputPadding.slice(),u=t[0].dims,d=e.dilations.slice();if(d.reduce((m,f)=>m+f,0)===0){let m=t[0].dims.length-2;d=new Array(m).fill(1)}let c=e.strides.slice();if(c.reduce((m,f)=>m+f,0)===0){let m=t[0].dims.length-2;c=new Array(m).fill(1)}$f(u,r,d,e.autoPad,e.group,o,c,n,a,i);let p=Object.assign({},e);return Object.assign(p,{kernelShape:r,pads:o,outputPadding:a,outputShape:i,dilations:d,strides:c}),p},Ju=e=>{let t=Kr(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,i=e.group,a=e.kernelShape,u=e.pads,d=e.strides,c=e.wIsConst(),p=e.outputPadding,m=e.outputShape;return{autoPad:n,format:r,dilations:o,group:i,kernelShape:a,outputPadding:p,outputShape:m,pads:u,strides:d,wIsConst:c,...t,cacheKey:`${e.format};${t.activation};`}},xf=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[0];if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==o))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((p,m)=>p+m,0)>0&&t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.reduce((p,m)=>p+m,0)>0&&t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.reduce((p,m)=>p+m,0)>0&&t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.outputPadding.length!==i&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((p,m)=>p+m,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},ed=(e,t,r,n)=>{let o=e.kernelCustomData.wT??e.compute(Ee(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=o);let i=[t[0],o];t.length===3&&i.push(t[2]),e.compute(Qu(i,r,n),{inputs:i})},Sf=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=t.kernelShape;(o.length===0||o[0]===0)&&(o=[e.inputs[1].dims[2]]);let i=t.dilations;(i.length===0||i[0]===0)&&(i=[1]);let a=t.strides;(a.length===0||a[0]===0)&&(a=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],a=[1].concat(a),i=[1].concat(i),o=[1].concat(o);let d=t.outputPadding;d=[0].concat(d);let c=Xu({...t,pads:u,strides:a,dilations:i,kernelShape:o,outputPadding:d},n);ed(e,n,c,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},td=(e,t)=>{if(xf(e.inputs,t),e.inputs[0].dims.length===3)Sf(e,t);else{let r=Xu(t,e.inputs);ed(e,e.inputs,r)}}});var Tf,nd,od,id=U(()=>{"use strict";ee();ne();Se();ie();Tf=(e,t,r,n)=>{let o=k.size(t),i=t.length,a=P("input",e,i),u=M("output",e,i),d=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),c=k.normalizeAxis(d,i),p=m=>{let f=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,b=F("uniforms.input_shape","uniforms.axis",i),g=n.reverse?f+(n.exclusive?" + 1":""):"0",_=n.reverse?b:f+(n.exclusive?"":" + 1");return`
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
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:c},...N(t,t)]}),getShaderSource:p}},nd=(e,t)=>{let r=e.inputs[0].dims,n=e.inputs[0].dataType,o=e.inputs[1];e.compute(Tf(n,r,o,t),{inputs:[0]})},od=e=>{let t=e.exclusive===1,r=e.reverse===1;return J({exclusive:t,reverse:r})}});var If,Cf,Af,ad,sd,ud=U(()=>{"use strict";ee();ne();Se();ie();If=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Cf=(e,t,r,n)=>{let o=[];o.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<t;++i)o.push(r.indicesSet("a",e[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},Af=(e,t)=>{let r,n,o,i,a,u,d=t.format==="NHWC",c=t.blocksize,p=t.mode==="DCR";d?([r,n,o,i]=e.dims,a=p?[r,n,o,c,c,i/c**2]:[r,n,o,i/c**2,c,c],u=p?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,o,i]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],a=p?[r,c,c,i/c**2,n,o]:[r,i/c**2,c,c,n,o],u=p?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let m=e.reshape(a),f=m.dims.length,b=e.dataType,g=P("a",b,f),_=M("output",b,f),S=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(g,_)}

  ${Cf(u,f,g,_)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${_.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${_.setByOffset("global_idx",g.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let v=d?[r,n*c,o*c,i/c**2]:[r,i/c**2,n*c,o*c],x=k.size(v),T=m.dims,E=k.sortBasedOnPerm(T,u);return{outputs:[{dims:v,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(x/64)},programUniforms:[{type:12,data:x},...N(T,E)]}},getShaderSource:S}},ad=(e,t)=>{If(e.inputs),e.compute(Af(e.inputs[0],t))},sd=e=>J({blocksize:e.blocksize,mode:e.mode,format:e.format})});var _o,en,dd,Ef,kf,wo,vo,ld,Pf,cd,pd,md=U(()=>{"use strict";ee();ne();Se();ie();_o="[a-zA-Z]|\\.\\.\\.",en="("+_o+")+",dd="^"+en+"$",Ef="("+en+",)*"+en,kf="^"+Ef+"$",wo=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,r){let n=this.symbolToIndices.get(t);n===void 0?n=[r]:n.push(r),this.symbolToIndices.set(t,n)}},vo=class{constructor(t,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,o]=r.includes("->")?r.split("->",2):[r,""];if(!n.match(RegExp(kf)))throw new Error("Invalid LHS term");if(n.split(",").forEach((u,d)=>{let c=t[d].dims.slice();if(!u.match(RegExp(dd)))throw new Error("Invalid LHS term");let p=this.processTerm(u,!0,c,d);this.lhs.push(p)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([u,d])=>d.count===1||u==="...").map(([u])=>u).join("");else if(!o.match(RegExp(en)))throw new Error("Invalid RHS");o.match(RegExp(_o,"g"))?.forEach(u=>{if(u==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let d=this.symbolToInfo.get(u);if(d===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(d.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(t,r,n){let o=this.symbolToInfo.get(t);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(n)}else o={count:1,dimValue:r,inputIndices:[n]};this.symbolToInfo.set(t,o)}processTerm(t,r,n,o=-1){let i=n.length,a=!1,u=[],d=0;if(!t.match(RegExp(dd))&&!r&&t!=="")throw new Error("Invalid LHS term");let c=t.match(RegExp(_o,"g")),p=new wo(o);return c?.forEach((m,f)=>{if(m==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let b=i-c.length+1;if(b<0)throw new Error("Ellipsis out of bounds");if(u=n.slice(d,d+b),this.hasEllipsis){if(this.ellipsisDims.length!==u.length||this.ellipsisDims.toString()!==u.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=u;else throw new Error("Ellipsis must be specified in the LHS");for(let g=0;g<u.length;g++){let _=String.fromCharCode(48+g);p.addSymbol(_,f+g),this.addSymbol(_,n[d++],o)}}else p.addSymbol(m,f+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(m,n[d++],o)}),p}},ld=e=>e+"_max",Pf=(e,t,r,n)=>{let i=e.map(p=>p.length).map((p,m)=>P(`input${m}`,t,p)),a=k.size(n),u=M("output",t,n.length),d=[...r.symbolToInfo.keys()].filter(p=>!r.rhs.symbolToIndices.has(p)),c=p=>{let m=[],f="var prod = 1.0;",b="var sum = 0.0;",g="sum += prod;",_=[],S=[],$=[],v=[],x=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((E,I)=>{if(r.rhs.symbolToIndices.has(I)){let z=r.rhs.symbolToIndices.get(I)?.[0];z!==void 0&&r.lhs.forEach((O,D)=>{if(E.inputIndices.includes(D)){let L=O.symbolToIndices.get(I);if(L===void 0)throw new Error("Invalid symbol error");L.forEach(q=>{m.push(`${i[D].indicesSet(`input${D}Indices`,q,u.indicesGet("outputIndices",z))}`)})}})}else r.lhs.forEach((z,O)=>{if(E.inputIndices.includes(O)){let D=z.symbolToIndices.get(I);if(D===void 0)throw new Error("Invalid symbol error");D.forEach(L=>{_.push(`${i[O].indicesSet(`input${O}Indices`,L,`${I}`)}`)}),v.push(`prod *= ${i[O].getByIndices(`input${O}Indices`)};`)}}),S.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${ld(I)}; ${I}++) {`),$.push("}")});let T=x?[...m,`let sum = ${i.map((E,I)=>E.getByIndices(`input${I}Indices`)).join(" * ")};`]:[...m,b,...S,..._,f,...v,g,...$];return`
            ${p.registerUniforms(d.map(E=>({name:`${ld(E)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,u)}

            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${u.offsetToIndices("global_idx")};
            ${i.map((E,I)=>`var input${I}Indices: ${i[I].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${u.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let p=d.filter(f=>r.symbolToInfo.has(f)).map(f=>({type:12,data:r.symbolToInfo.get(f)?.dimValue||0}));p.push({type:12,data:a});let m=e.map((f,b)=>[...N(f)]).reduce((f,b)=>f.concat(b),p);return m.push(...N(n)),{outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:m}},getShaderSource:c}},cd=(e,t)=>{let r=new vo(e.inputs,t.equation),n=r.outputDims,o=e.inputs.map((i,a)=>i.dims);e.compute(Pf(o,e.inputs[0].dataType,r,n))},pd=e=>{let t=e.equation.replace(/\s+/g,"");return J({equation:t})}});var zf,fd,Of,Bf,hd,gd=U(()=>{"use strict";ee();ne();ie();zf=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,o=t.length<r.length?0:t.length-r.length;for(;n<r.length&&o<t.length;++n,++o)if(r[n]!==t[o]&&r[n]!==1&&t[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},fd=(e,t)=>{let r=e.length-t.length,n=[];for(let o=0;o<r;++o)n.push(e[o]);for(let o=0;o<t.length;++o)n.push(t[o]===1?e[o+r]:t[o]);return n},Of=(e,t)=>e.length>t.length?fd(e,t):fd(t,e),Bf=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=Of(t,r),o=e[0].dataType,i=o===9||k.size(t)===1,a=o===9||t.length>0&&t[t.length-1]%4===0?4:1,u=i||n.length>0&&n[n.length-1]%4===0?4:1,d=Math.ceil(k.size(n)/u),c=m=>{let f=P("input",o,t.length,a),b=M("output",o,n.length,u),g;if(o===9){let _=(S,$,v="")=>`
          let outputIndices${$} = ${b.offsetToIndices(`outputOffset + ${$}u`)};
          let offset${$} = ${f.broadcastedIndicesToOffset(`outputIndices${$}`,b)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${S}[${$}] = ${v}(${f.getByOffset(`index${$}`)}[component${$}]);
        `;g=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${_("data",0,"u32")}
        ${_("data",1,"u32")}
        ${_("data",2,"u32")}
        ${_("data",3,"u32")}
        ${b.setByOffset("global_idx","data")}
      }`}else g=`
        let outputIndices = ${b.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${f.broadcastedIndicesToOffset("outputIndices",b)};
        let data = ${b.type.value}(${f.getByOffset(`inputOffset / ${a}`)});
        ${b.setByOffset("global_idx","data")}
      }`;return`
    ${m.registerUniform("vec_size","u32").declareVariables(f,b)}
    ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${g}`},p=[{type:12,data:d},...N(t,n)];return{name:"Expand",shaderCache:{hint:`${n.length};${a}${u}`,inputDependencies:["rank"]},getShaderSource:c,getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p})}},hd=e=>{zf(e.inputs),e.compute(Bf(e.inputs),{inputs:[0]})}});var Df,bd,yd=U(()=>{"use strict";ee();ne();ie();jr();Df=e=>{let t=e[0].dataType,r=k.size(e[0].dims),n=k.size(e[1].dims),o=n%4===0,i=a=>{let u=P("x",t,[1],4),d=P("bias",t,[1],4),c=M("y",t,[1],4),p=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],m=b=>`
      let bias${b}_offset: u32 = (global_idx * 4 + ${b}) % uniforms.bias_size;
      let bias${b} = ${d.getByOffset(`bias${b}_offset / 4`)}[bias${b}_offset % 4];`,f=o?`
      let bias = ${d.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${m(0)}${m(1)}${m(2)}${m(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(p).declareVariables(u,d,c)}

    ${co(Ae(t))}

    ${a.mainStart(It)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${f}
      let x_in = x + bias;
      ${c.setByOffset("global_idx",po("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/It/4)}})}},bd=e=>{e.inputs.length<2||k.size(e.inputs[1].dims)===0?mu(e):e.compute(Df(e.inputs))}});var Mf,Rf,_d,wd,vd=U(()=>{"use strict";ee();ne();Se();ie();Mf=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Rf=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,i=k.normalizeAxis(t.axis,o),a=r.slice(0);a.splice(i,1,...n);let u=r[i],d=e[0].dataType===9?4:1,c=Math.ceil(k.size(a)/d),p=[{type:12,data:c},{type:6,data:u},{type:12,data:i},...N(e[0].dims,e[1].dims,a)],m=f=>{let b=P("data",e[0].dataType,e[0].dims.length,d),g=P("inputIndices",e[1].dataType,e[1].dims.length),_=M("output",e[0].dataType,a.length,d),S=v=>{let x=n.length,T=`var indicesIndices${v}  = ${g.type.indices}(0);`;for(let E=0;E<x;E++)T+=`${x>1?`indicesIndices${v}[${E}]`:`indicesIndices${v}`} = ${a.length>1?`outputIndices${v}[uniforms.axis + ${E}]`:`outputIndices${v}`};`;T+=`
          var idx${v} = ${g.getByIndices(`indicesIndices${v}`)};
          if (idx${v} < 0) {
            idx${v} = idx${v} + uniforms.axisDimLimit;
          }
          var dataIndices${v} : ${b.type.indices};
        `;for(let E=0,I=0;E<o;E++)E===i?(T+=`${o>1?`dataIndices${v}[${E}]`:`dataIndices${v}`} = u32(idx${v});`,I+=x):(T+=`${o>1?`dataIndices${v}[${E}]`:`dataIndices${v}`} = ${a.length>1?`outputIndices${v}[${I}]`:`outputIndices${v}`};`,I++);return T},$;if(e[0].dataType===9){let v=(x,T,E="")=>`
          let outputIndices${T} = ${_.offsetToIndices(`outputOffset + ${T}u`)};
          ${S(T)};
          let offset${T} = ${b.indicesToOffset(`dataIndices${T}`)};
          let index${T} = offset${T} / 4u;
          let component${T} = offset${T} % 4u;
          ${x}[${T}] = ${E}(${b.getByOffset(`index${T}`)}[component${T}]);
        `;$=`
        let outputOffset = global_idx * ${d};
        var value = vec4<u32>(0);
        ${v("value",0,"u32")}
        ${v("value",1,"u32")}
        ${v("value",2,"u32")}
        ${v("value",3,"u32")}
        ${_.setByOffset("global_idx","value")}
      `}else $=`
      let outputIndices = ${_.offsetToIndices("global_idx")};
      ${S("")};
      let value = ${b.getByIndices("dataIndices")};
      ${_.setByOffset("global_idx","value")};
      `;return`
      ${f.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(b,g,_)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:p}),getShaderSource:m}},_d=e=>J({axis:e.axis}),wd=(e,t)=>{let r=e.inputs;Mf(r),e.compute(Rf(e.inputs,t))}});var Uf,$d,xd,Sd=U(()=>{"use strict";ee();ne();ie();Uf=(e,t,r,n,o,i,a,u,d)=>{let c=[{type:12,data:i},{type:12,data:n},{type:12,data:o},{type:12,data:r},{type:12,data:a},{type:12,data:u},{type:12,data:d}],p=[i];c.push(...N(t.dims,p));let m=f=>{let b=P("indices_data",t.dataType,t.dims.length),g=M("input_slice_offsets_data",12,1,1),_=[b,g],S=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${f.registerUniforms(S).declareVariables(..._)}
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
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:c}),getShaderSource:m},{inputs:[t],outputs:[-1]})[0]},$d=(e,t)=>{let r=e.inputs,n=r[0].dims,o=r[0].dataType,i=r[1].dims,a=i[i.length-1],u=k.sizeToDimension(i,i.length-1),d=k.sizeFromDimension(n,t.batchDims+a),c=k.sizeToDimension(n,t.batchDims),p=k.sizeFromDimension(n,t.batchDims),m=u/c,f=new Array(a),b=d;for(let T=0;T<a;++T)f[a-1-T]=b,b*=n[t.batchDims+a-1-T];let g=Uf(e,r[1],f,t.batchDims,n,u,m,p,a),_=t.batchDims+a;if(_>n.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let S=i.slice(0,-1).concat(n.slice(_)),$=k.size(S),v=[{type:12,data:$},{type:12,data:d},...N(r[0].dims,g.dims,S)],x=T=>{let E=P("data",r[0].dataType,r[0].dims.length),I=P("slice_offsets",12,g.dims.length),z=M("output",r[0].dataType,S.length);return`
          ${T.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(E,I,z)}
            ${T.mainStart()}
            ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:S,dataType:o}],dispatchGroup:{x:Math.ceil($/64)},programUniforms:v}),getShaderSource:x},{inputs:[r[0],g]})},xd=e=>({batchDims:e.batch_dims,cacheKey:""})});var Nf,Vf,Td,Id,Cd=U(()=>{"use strict";ee();ne();Se();ie();Nf=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=k.normalizeAxis(t.quantizeAxis,e[0].dims.length),n=t.blockSize,o=e[0],i=e[2],a=e.length===4?e[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((u,d)=>d===r?Math.ceil(u/n)===i.dims[d]:u===i.dims[d]).reduce((u,d)=>u&&d,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==i.dims.length||!a.dims.map((u,d)=>u===i.dims[d]).reduce((u,d)=>u&&d,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Vf=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,i=k.normalizeAxis(t.gatherAxis,o),a=k.normalizeAxis(t.quantizeAxis,o),u=r.slice(0);u.splice(i,1,...n);let d=k.size(u),c=e[2].dataType,m=e[0].dataType===22,f=[{type:12,data:d},{type:12,data:a},{type:12,data:i},{type:12,data:t.blockSize},...N(...e.map((g,_)=>g.dims),u)],b=g=>{let _=P("data",e[0].dataType,e[0].dims.length),S=P("inputIndices",e[1].dataType,e[1].dims.length),$=P("scales",e[2].dataType,e[2].dims.length),v=e.length>3?P("zeroPoint",e[3].dataType,e[3].dims.length):void 0,x=M("output",c,u.length),T=[_,S,$];v&&T.push(v);let E=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${g.registerUniforms(E).declareVariables(...T,x)}
        ${g.mainStart()}
        let output_indices = ${x.offsetToIndices("global_idx")};
        var indices_indices = ${S.type.indices}(0);
        ${n.length>1?`
          for (var i: u32 = 0; i < ${n.length}; i++) {
            let index = ${x.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${S.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${x.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${_.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${x.indicesGet("output_indices","i")};
          ${_.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${S.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[i]};
        }
        ${_.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${x.indicesGet("output_indices",`i + ${n.length} - 1`)};
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
        ${v?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${m?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Ae(c)}(quantized_data - zero_point) * scale;
        ${x.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((g,_)=>_!==1).map(g=>g.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(g,_)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:c}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:f}),getShaderSource:b}},Td=(e,t)=>{let r=e.inputs;Nf(r,t),e.compute(Vf(e.inputs,t))},Id=e=>J({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})});var Wf,Lf,Ad,Ed,kd=U(()=>{"use strict";ee();ne();Se();ie();Wf=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Lf=(e,t)=>{let r=e[0].dims,n=e[0].dataType,o=r.length,i=e[1].dims,a=e[1].dataType,u=k.normalizeAxis(t.axis,o),d=r[u],c=i.slice(0),p=k.size(c),m=P("input",n,o),f=P("indicesInput",a,i.length),b=M("output",n,c.length),g=[{type:12,data:p},{type:6,data:d},{type:12,data:u}];return g.push(...N(r,i,c)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:g}),getShaderSource:$=>`
      ${$.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(m,f,b)}
      ${$.mainStart()}
      ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${b.offsetToIndices("global_idx")};

      var idx = ${f.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${m.type.indices}(outputIndices);
      ${m.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${m.getByIndices("inputIndices")};

      ${b.setByOffset("global_idx","value")};
  }`}},Ad=e=>J({axis:e.axis}),Ed=(e,t)=>{let r=e.inputs;Wf(r),e.compute(Lf(e.inputs,t))}});var Gf,Hf,Pd,zd,Od=U(()=>{"use strict";ee();ne();ie();Gf=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Hf=(e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[o,i,a]=Dr.getShapeOfGemmResult(r,t.transA,n,t.transB,e.length===3?e[2].dims:void 0),u=[o,i];if(!u)throw new Error("Can't use gemm on the given tensors");let d=16,c=Math.ceil(i/d),p=Math.ceil(o/d),m=!0,f=k.size(u),b=[{type:12,data:m?c:f},{type:12,data:o},{type:12,data:i},{type:12,data:a},{type:1,data:t.alpha},{type:1,data:t.beta}],g=["type","type"];e.length===3&&(b.push(...N(e[2].dims)),g.push("rank")),b.push(...N(u));let _=$=>{let v="";t.transA&&t.transB?v="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?v="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?v="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(v="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let x=t.alpha===1?"":"value *= uniforms.alpha;",T=P("a",e[0].dataType,e[0].dims),E=P("b",e[1].dataType,e[1].dims),I=T.type.value,z=null,O=[T,E];e.length===3&&(z=P("c",e[2].dataType,e[2].dims.length),O.push(z));let D=M("output",e[0].dataType,u.length);O.push(D);let L=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${$.registerUniforms(L).declareVariables(...O)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${I}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${v}
    }

    ${x}
    ${z!=null?`let cOffset = ${z.broadcastedIndicesToOffset("vec2(m, n)",D)}; value += ${I}(uniforms.beta) * ${z.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},S=$=>{let v=P("a",e[0].dataType,e[0].dims),x=P("b",e[1].dataType,e[1].dims),T=null,E=[v,x];e.length===3&&(T=P("c",e[2].dataType,e[2].dims.length),E.push(T));let I=M("output",e[0].dataType,u.length);E.push(I);let z=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],O="",D="";t.transA&&t.transB?(D=`
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
        tile_b[local_id.y][local_id.x] = ${x.type.value}(0);
      }
      `,O="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(D=`
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
        tile_b[local_id.y][local_id.x] = ${x.type.value}(0);
      }
      `,O="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(D=`
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
        tile_b[local_id.y][local_id.x] = ${x.type.value}(0);
      }
      `,O="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(D=`
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
        tile_b[local_id.y][local_id.x] = ${x.type.value}(0);
      }
      `,O="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let L=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${$.registerUniforms(z).declareVariables(...E)}
  var<workgroup> tile_a: array<array<${v.type.storage}, ${d}>, ${d}>;
  var<workgroup> tile_b: array<array<${x.type.storage}, ${d}>, ${d}>;
  ${$.mainStart([d,d,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${d};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${d};
    let num_tiles = (uniforms.K - 1) / ${d} + 1;
    var k_start = 0u;
    var value = ${I.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${D}
      k_start = k_start + ${d};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${d}; k++) {
        ${O}
      }
      workgroupBarrier();
    }

    ${L}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${T!=null?`let cOffset = ${T.broadcastedIndicesToOffset("vec2(m, n)",I)}; value += ${I.type.value}(uniforms.beta) * ${T.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return m?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:c*p},programUniforms:b}),getShaderSource:S}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:b}),getShaderSource:_}},Pd=e=>{let t=e.transA,r=e.transB,n=e.alpha,o=e.beta;return{transA:t,transB:r,alpha:n,beta:o,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},zd=(e,t)=>{Gf(e.inputs),e.compute(Hf(e.inputs,t))}});var ut,yt,Ut,Nt,Ff,qf,jf,Kf,Zf,Qf,Yf,Xf,Bd,Dd,Md=U(()=>{"use strict";ee();ne();Se();ie();[ut,yt,Ut,Nt]=[0,1,2,3],Ff=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},qf=`
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
`,jf=e=>`
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
`,Kf=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Zf=e=>`
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
`,Qf=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${ut}] = batch;
     indices[${yt}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Ut}] = u32(r);
            indices[${Nt}] = u32(c);
          } else {
            return ${t}(0);
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
`,Yf=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${ut}], indices[${yt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${ut}], indices[${yt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${ut}], indices[${yt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${ut}], indices[${yt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${ut}], indices[${yt}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${ut}], indices[${yt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Xf=(e,t)=>{let r=P("x",e[0].dataType,e[0].dims.length),n=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],o=P("grid",e[1].dataType,n.length,2),i=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(i=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[ut,yt,Ut,Nt]=[0,3,1,2]);let a=M("output",e[0].dataType,i.length),u=r.type.value,d=k.size(i),c=[{type:12,data:d},...N(e[0].dims,n,i)],p=m=>`
  ${m.registerUniform("output_size","u32").declareVariables(r,o,a)}
  ${qf}
  ${jf(u)}
  ${Kf(t)}
  ${Zf(t)}
  ${Qf(r,u,t)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
      var grid_indices = vec3<u32>(indices[${ut}], indices[${Ut}], indices[${Nt}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Yf(a,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:m=>{let f=k.size(i);return{outputs:[{dims:i,dataType:m[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:c}},getShaderSource:p}},Bd=(e,t)=>{Ff(e.inputs),e.compute(Xf(e.inputs,t))},Dd=e=>J({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})});var Be,th,Ud,Rd,rh,er,Nd,$o=U(()=>{"use strict";ee();ne();Se();Vr();Fr();ie();st();Be=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,th=(e,t)=>{let r=e[0],n=Be(e,1),o=Be(e,2),i=Be(e,3),a=Be(e,4),u=Be(e,5),d=Be(e,6),c=Be(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let p=r.dims[0],m=r.dims[1],f=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],b=m,g=0,_=0,S=Math.floor(f/t.numHeads);if(d&&c&&k.size(d.dims)&&k.size(c.dims)){if(d.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==p||d.dims[1]!==t.numHeads||d.dims[3]!==S)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(c.dims[0]!==p||c.dims[1]!==t.numHeads||c.dims[3]!==S)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==c.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(c.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=d.dims[2],_=d.dims[2]}else if(d&&k.size(d.dims)||c&&k.size(c.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(n&&k.size(n.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(n.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,b=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==S)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,b=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==S)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,b=n.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(i&&k.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(n&&n.dims.length===5&&n.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let v=g+b,x=0;if(a&&k.size(a.dims)>0){x=8;let z=a.dims;throw z.length===1?z[0]===p?x=1:z[0]===3*p+2&&(x=3):z.length===2&&z[0]===p&&z[1]===v&&(x=5),x===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let T=!1,E=f;if(o&&k.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(b!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');E=o.dims[2]}else{if(b!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');E=o.dims[1]*o.dims[3],T=!0}}let I=!1;if(a&&k.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(u&&k.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==p||u.dims[1]!==t.numHeads||u.dims[2]!==m||u.dims[3]!==v)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:p,sequenceLength:m,pastSequenceLength:g,kvSequenceLength:b,totalSequenceLength:v,maxSequenceLength:_,inputHiddenSize:0,hiddenSize:f,vHiddenSize:E,headSize:S,vHeadSize:Math.floor(E/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:x,scale:t.scale,broadcastResPosBias:I,passPastInKv:T,qkvFormat:$}},Ud=e=>J({...e}),Rd=J({perm:[0,2,1,3]}),rh=(e,t,r,n,o,i,a)=>{let u=[n,o,i],d=k.size(u),c=[{type:12,data:d},{type:12,data:a},{type:12,data:i}],p=m=>{let f=M("qkv_with_bias",t.dataType,u),b=P("qkv",t.dataType,u),g=P("bias",r.dataType,u),_=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${m.registerUniforms(_).declareVariables(b,g,f)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:p},{inputs:[t,r],outputs:[-1]})[0]},er=(e,t,r,n,o,i,a,u)=>{let d=i;if(a&&k.size(a.dims)>0){if(n===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return d=rh(e,i,a,t,n,r*o,u),d=d.reshape([t,n,r,o]),r===1||n===1?d:e.compute(Ee(d,Rd.perm),{inputs:[d],outputs:[-1]})[0]}else return i.dims.length===3&&(d=i.reshape([t,n,r,o])),r===1||n===1?d:e.compute(Ee(d,Rd.perm),{inputs:[d],outputs:[-1]})[0]},Nd=(e,t)=>{let r=th(e.inputs,t),n=e.inputs[0],o=Be(e.inputs,1),i=Be(e.inputs,2),a=Be(e.inputs,3),u=Be(e.inputs,4),d=Be(e.inputs,5),c=Be(e.inputs,6),p=Be(e.inputs,7);if(n.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let m=o&&i&&o.dims.length===4&&i.dims.length===4,f=er(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,a,0);if(m)return Rt(e,f,o,i,u,void 0,c,p,d,r);if(!o||!i)throw new Error("key and value must be provided");let b=er(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,a,r.hiddenSize),g=er(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,a,2*r.hiddenSize);Rt(e,f,b,g,u,void 0,c,p,d,r)}});var nh,oh,ih,ah,xo,Vd,Wd,So=U(()=>{"use strict";ee();ne();Se();ie();nh=e=>{if(!e||e.length<1)throw new Error("too few inputs")},oh=(e,t)=>{let r=[],n=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(o=>r.push(Number(o))),n=r.length),J({numOutputs:n,axis:t.axis,splitSizes:r})},ih=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${F("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,ah=e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let o=e[n].setByIndices("indices","input[global_idx]");t===1?r.push(o):n===0?r.push(`if (output_number == ${n}u) { ${o} }`):n===t-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${n}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},xo=(e,t)=>{let r=e[0].dims,n=k.size(r),o=e[0].dataType,i=k.normalizeAxis(t.axis,r.length),a=new Array(t.numOutputs),u=P("input",o,r.length),d=new Array(t.numOutputs),c=[],p=[],m=0,f=[{type:12,data:n}];for(let g=0;g<t.numOutputs;g++){m+=t.splitSizes[g],d[g]=m;let _=r.slice();_[i]=t.splitSizes[g],p.push(_),a[g]=M(`output${g}`,o,_.length),c.push({dims:p[g],dataType:e[0].dataType})}f.push({type:12,data:d},...N(r,...p));let b=g=>`
  ${g.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",d.length).declareVariables(u,...a)}
  ${ih(d.length)}
  ${ah(a)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${F("uniforms.size_in_split_axis","output_number - 1u",d.length)};
      ${u.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:c,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:f})}},Vd=(e,t)=>{nh(e.inputs);let r=e.inputs.length===1?t:oh(e.inputs,t);e.compute(xo(e.inputs,r),{inputs:[0]})},Wd=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return J({axis:t,numOutputs:n,splitSizes:r})}});var sh,tn,Ld,To=U(()=>{"use strict";ee();ne();Se();ie();sh=(e,t)=>{let[r,n,o,i]=e,{numHeads:a,rotaryEmbeddingDim:u}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!k.areEqual(n.dims,[])&&!k.areEqual(n.dims,[1])&&n.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!k.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let d=r.dims[0],c=r.dims[r.dims.length-2],p=o.dims[0],m=k.sizeFromDimension(r.dims,1)/c,f=u===0?o.dims[1]*2:m/a;if(u>f)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(n.dims.length===2){if(d!==n.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(c!==n.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(f/2!==o.dims[1]&&u/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(c>p)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},tn=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:o,scale:i}=t,a=e[0].dims[0],u=k.sizeFromDimension(e[0].dims,1),d=e[0].dims[e[0].dims.length-2],c=u/d,p=e[2].dims[1],m=o===0?p*2:c/n,f=new Array(a,d,c/m,m-p),b=k.computeStrides(f),g=[{type:1,data:i},{type:12,data:f},{type:12,data:b},...e[0].dims.length===3?new Array({type:12,data:[u,c,m,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,m,d*m,1]}):[],...N(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],_=S=>{let $=P("input",e[0].dataType,e[0].dims.length),v=P("position_ids",e[1].dataType,e[1].dims.length),x=P("cos_cache",e[2].dataType,e[2].dims.length),T=P("sin_cache",e[3].dataType,e[3].dims.length),E=M("output",e[0].dataType,e[0].dims.length);return S.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:f.length},{name:"global_strides",type:"u32",length:b.length},{name:"input_output_strides",type:"u32",length:b.length}]),`
        ${S.declareVariables($,v,x,T,E)}

        ${S.mainStart(It)}
          let half_rotary_emb_dim = uniforms.${x.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${v.broadcastedIndicesToOffset("bsnh.xy",M("",v.type.tensor,2))};
            let position_id =
                u32(${v.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${$.getByOffset("i")} * ${x.get("position_id","bsnh[3]")} -
                ${$.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${E.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${x.get("position_id","bsnh[3]")};
            ${E.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${E.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:J({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(f)/It)},programUniforms:g})}},Ld=(e,t)=>{sh(e.inputs,t),e.compute(tn(e.inputs,t))}});var uh,dh,Gd,lh,Hd,Fd=U(()=>{"use strict";Se();ee();Fr();$o();So();st();To();ie();uh=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],n=e[1],o=e[2],i=e[3],a=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,d=r.dims[0],c=r.dims[1],p=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],m=c,f=0,b=!n||n.dims.length===0,g=Math.floor(b?p/(t.numHeads+2*t.kvNumHeads):p/t.numHeads);b&&(p=g*t.numHeads);let _=i&&i.dims.length!==0,S=a&&a.dims.length!==0;if(_&&i.dims.length===4&&i.dims[0]===d&&i.dims[1]!==t.kvNumHeads&&i.dims[2]===t.kvNumHeads&&i.dims[3]===g)throw new Error("BSNH pastKey/pastValue is not supported");if(_&&S){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');f=i.dims[2]}else if(_||S)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(n&&n.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(r.dims[2]%n.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');m=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==g)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');m=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==g)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');m=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let x=0,T=!1,E=t.kvNumHeads?g*t.kvNumHeads:p;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(m!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');E=o.dims[2]}else{if(m!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');E=o.dims[1]*o.dims[3],T=!0}}let I=e.length>4?e[5]:void 0;if(I&&I.dims.length!==1&&I.dims[0]!==d)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:d,sequenceLength:c,pastSequenceLength:f,kvSequenceLength:m,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:p,vHiddenSize:E,headSize:g,vHeadSize:Math.floor(E/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:x,scale:t.scale,broadcastResPosBias:!1,passPastInKv:T,qkvFormat:v}},dh=J({perm:[0,2,1,3]}),Gd=(e,t,r)=>{let n=t,o=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(n=t.reshape([r.batchSize,r.kvSequenceLength,o,r.headSize]),n=e.compute(Ee(n,dh.perm),{inputs:[n],outputs:[-1]})[0]),n},lh=(e,t,r,n)=>{let o=7,i=["type","type"],a=[e*t],u=e*t,d=[{type:12,data:u},{type:12,data:t},{type:12,data:e}],c=p=>{let m=P("seq_lens",r.dataType,r.dims),f=P("total_seq_lens",n.dataType,n.dims),b=M("pos_ids",o,a),g=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${p.registerUniforms(g).declareVariables(m,f,b)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${f.getByOffset("0")});
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
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:i},getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:c}},Hd=(e,t)=>{let r=uh(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let n=e.inputs[0],o=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,i=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,a=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,u=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,d=e.inputs.length>4?e.inputs[5]:void 0,c=e.inputs.length>5?e.inputs[6]:void 0,p=r.kvNumHeads?r.kvNumHeads:r.numHeads,m=J({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,p*r.headSize,p*r.headSize]}),[f,b,g]=!o&&!i?e.compute(xo([n],m),{inputs:[n],outputs:[-1,-1,-1]}):[n,o,i],_,S;if(t.doRotary){let T=e.compute(lh(r.batchSize,r.sequenceLength,d,c),{inputs:[d,c],outputs:[-1]})[0],E=e.inputs[7],I=e.inputs[8],z=J({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),O=[f,T,E,I],D=[-1];_=e.compute(tn(O,z),{inputs:O,outputs:D})[0],O.splice(0,1,b);let L=J({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});S=e.compute(tn(O,L),{inputs:O,outputs:D})[0]}let $=er(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?_:f,void 0,0),v=Gd(e,t.doRotary?S:b,r),x=Gd(e,g,r);Rt(e,$,v,x,void 0,void 0,a,u,void 0,r,d,c)}});var qd,ch,ph,jd,Kd=U(()=>{"use strict";ee();ne();st();ie();qd=(e,t,r,n,o,i,a,u)=>{let d=ce(i),c=d===1?"f32":`vec${d}f`,p=d===1?"vec2f":`mat2x${d}f`,m=o*a,f=64;m===1&&(f=256);let b=[o,a,i/d],g=[o,a,2],_=["rank","type","type"],S=[];S.push(...N(b,g));let $=v=>{let x=P("x",t.dataType,3,d),T=P("scale",r.dataType,r.dims),E=P("bias",n.dataType,n.dims),I=M("output",1,3,2),z=[x,T,E,I];return`
  var<workgroup> workgroup_shared : array<${p}, ${f}>;
  const workgroup_size = ${f}u;
  ${v.declareVariables(...z)}
  ${v.mainStart(f)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${c}(0);
    var squared_sum = ${c}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${c}(${x.get("batch","channel","h")});
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
      let sum_final = ${He("workgroup_shared[0][0]",d)} / f32(hight * ${d});
      let squared_sum_final = ${He("workgroup_shared[0][1]",d)} / f32(hight * ${d});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${d};${u};${f}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:g,dataType:1}],dispatchGroup:{x:m},programUniforms:S}),getShaderSource:$},{inputs:[t,r,n],outputs:[-1]})[0]},ch=(e,t,r)=>{let n=t[0].dims,o=n,i=2,a=n[0],u=n[1],d=k.sizeFromDimension(n,i),c=ce(d),p=k.size(o)/c,m=qd(e,t[0],t[1],t[2],a,d,u,r.epsilon),f=[a,u,d/c],b=[a,u],g=["type","none"],_=S=>{let $=P("x",t[0].dataType,f.length,c),v=P("scale_shift",1,b.length,2),x=M("output",t[0].dataType,f.length,c),T=[$,v,x];return`
  ${S.registerUniform("output_size","u32").declareVariables(...T)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${x.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${v.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${x.type.value}(scale_shift.x) + ${x.type.value}(scale_shift.y);
      ${x.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${c}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},...N(f,b,f)]}),getShaderSource:_},{inputs:[t[0],m]})},ph=(e,t,r)=>{let n=t[0].dims,o=n,i=n[0],a=n[n.length-1],u=k.sizeFromDimension(n,1)/a,d=ce(a),c=k.size(o)/d,p=[{type:12,data:u},{type:12,data:Math.floor(a/d)}],m=["type","type"],f=!1,b=[0,n.length-1];for(let $=0;$<n.length-2;$++)f=f||n[$+1]!==1,b.push($+1);f=f&&n[n.length-1]!==1;let g=f?e.compute(Ee(e.inputs[0],b),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:n.length},($,v)=>n[b[v]])),_=qd(e,g,t[1],t[2],i,u,a,r.epsilon),S=$=>{let v=be(t[0].dataType),x=d===1?"vec2f":`mat${d}x2f`,T=z=>{let O=z===0?"x":"y",D=d===1?"f32":`vec${d}f`;switch(d){case 1:return`${v}(${D}(scale.${O}))`;case 2:return`vec2<${v}>(${D}(scale[0].${O}, scale[1].${O}))`;case 4:return`vec4<${v}>(${D}(scale[0].${O}, scale[1].${O}, scale[2].${O}, scale[3].${O}))`;default:throw new Error(`Not supported compoents ${d}`)}},E=P("input",t[0].dataType,t[0].dims,d),I=M("output",t[0].dataType,o,d);return`
  @group(0) @binding(0) var<storage, read> input : array<${E.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${x}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${I.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${$.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${T(0)}, ${T(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${d}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:p}),getShaderSource:S},{inputs:[t[0],_]})},jd=(e,t)=>{t.format==="NHWC"?ph(e,e.inputs,t):ch(e,e.inputs,t)}});var mh,fh,Zd,Qd=U(()=>{"use strict";ee();ne();ie();mh=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},fh=(e,t,r)=>{let n=t.simplified,o=e[0].dims,i=e[1],a=!n&&e[2],u=o,d=k.normalizeAxis(t.axis,o.length),c=k.sizeToDimension(o,d),p=k.sizeFromDimension(o,d),m=k.size(i.dims),f=a?k.size(a.dims):0;if(m!==p||a&&f!==p)throw new Error(`Size of X.shape()[axis:] == ${p}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${m} and bias size of ${f}`);let b=[];for(let E=0;E<o.length;++E)E<d?b.push(o[E]):b.push(1);let g=ce(p),_=["type","type"],S=[{type:12,data:c},{type:1,data:p},{type:12,data:Math.floor(p/g)},{type:1,data:t.epsilon}];a&&_.push("type");let $=r>1,v=r>2,x=E=>{let I=be(e[0].dataType),z=[P("x",e[0].dataType,e[0].dims,g),P("scale",i.dataType,i.dims,g)];a&&z.push(P("bias",a.dataType,a.dims,g)),z.push(M("output",e[0].dataType,u,g)),$&&z.push(M("mean_data_output",1,b)),v&&z.push(M("inv_std_output",1,b));let O=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${E.registerUniforms(O).declareVariables(...z)}
  ${E.mainStart()}
    ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${ao("f32",g)};
    var mean_square_vector = ${ao("f32",g)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Ct(I,g,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${He("mean_vector",g)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${He("mean_square_vector",g)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Ct(I,g,"x[j + offset]")};
      let f32scale = ${Ct(I,g,"scale[j]")};
      output[j + offset] = ${z[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${Ct(I,g,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${v?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},T=[{dims:u,dataType:e[0].dataType}];return $&&T.push({dims:b,dataType:1}),v&&T.push({dims:b,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${g};${r};${n}`,inputDependencies:_},getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(c/64)},programUniforms:S}),getShaderSource:x}},Zd=(e,t)=>{mh(e.inputs),e.compute(fh(e.inputs,t,e.outputCount))}});var hh,Yd,Xd=U(()=>{"use strict";ne();Yr();Xr();hh=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Yd=e=>{hh(e.inputs);let t=Je.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&n<8)e.compute(Qr(e.inputs,{activation:""},t));else{let o=t[t.length-2],i=k.size(e.inputs[0].dims.slice(0,-2)),a=k.size(e.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&a===1){let u=e.inputs[0].reshape([1,i,n]),d=e.inputs[1].reshape([1,n,r]),c=[1,i,r],p=[u,d];e.compute(Jt(p,{activation:""},t,c),{inputs:p})}else e.compute(Jt(e.inputs,{activation:""},t))}}});var gh,bh,yh,Jd,el,tl=U(()=>{"use strict";ee();ne();Se();ie();gh=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),i=t.blockSize/8*t.bits,a=e[1];if(!k.areEqual(a.dims,[t.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let d=e[2].dims;if(k.size(d)!==t.n*o)throw new Error("scales input size error.");if(e.length===4){let p=e[3].dims,m=t.bits>4?t.n*o:t.n*Math.floor((o+1)/2);if(k.size(p)!==m)throw new Error("zeroPoints input size error.")}},bh=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],i=t.k,a=t.n,u=r.slice(0,n-2),d=k.size(u),p=e[1].dims[2]/4,m=e[0].dataType,f=ce(t.k),b=ce(p),g=ce(a),_=u.concat([o,a]),S=o>1&&a/g%2===0?2:1,$=k.size(_)/g/S,v=64,x=[],T=[d,o,i/f],E=k.convertShape(e[1].dims).slice();E.splice(-1,1,p/b),x.push(...N(T)),x.push(...N(E)),x.push(...N(e[2].dims)),e.length===4&&x.push(...N(k.convertShape(e[3].dims)));let I=[d,o,a/g];x.push(...N(I));let z=O=>{let D=T.length,L=P("a",e[0].dataType,D,f),q=P("b",12,E.length,b),Q=P("scales",e[2].dataType,e[2].dims.length),W=[L,q,Q],Z=e.length===4?P("zero_points",12,e[3].dims.length):void 0;Z&&W.push(Z);let we=I.length,H=M("output",e[0].dataType,we,g),j=be(e[0].dataType),te=(()=>{switch(f){case 1:return`array<${j}, 8>`;case 2:return`mat4x2<${j}>`;case 4:return`mat2x4<${j}>`;default:throw new Error(`${f}-component is not supported.`)}})(),X=()=>{let ye=`
          // reuse a data
            var input_offset = ${L.indicesToOffset(`${L.type.indices}(batch, row, word_offset)`)};
            var a_data: ${te};
            for (var j: u32 = 0; j < ${8/f}; j++) {
              a_data[j] = ${L.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let re=0;re<g*S;re++)ye+=`
            b_value = ${b===1?`b${re}_data`:`b${re}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${te}(${Array.from({length:4},(C,V)=>`${j}(b_value_lower[${V}]), ${j}(b_value_upper[${V}])`).join(", ")});
            b_dequantized_values = ${f===1?`${te}(${Array.from({length:8},(C,V)=>`(b_quantized_values[${V}] - ${Z?`zero_point${re}`:"zero_point"}) * scale${re}`).join(", ")});`:`(b_quantized_values - ${te}(${Array(8).fill(`${Z?`zero_point${re}`:"zero_point"}`).join(",")})) * scale${re};`};
            workgroup_shared[local_id.x * ${S} + ${Math.floor(re/g)}]${g>1?`[${re%g}]`:""} += ${Array.from({length:8/f},(C,V)=>`${f===1?`a_data[${V}] * b_dequantized_values[${V}]`:`dot(a_data[${V}], b_dequantized_values[${V}])`}`).join(" + ")};
          `;return ye},ue=()=>{let ye=`
            var col_index = col * ${g};
            ${Z?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${j}(8);`}
            `;for(let re=0;re<g*S;re++)ye+=`
            let scale${re} = ${Q.getByOffset("col_index * nBlocksPerCol + block")};
            ${Z?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${Z.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${re} = ${j}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return ye},he=()=>{let ye=`col_index = col * ${g};`;for(let re=0;re<g*S;re++)ye+=`
            let b${re}_data = ${q.getByIndices(`${q.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return ye+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${te};
            var b_dequantized_values: ${te};`,ye};return`
        var<workgroup> workgroup_shared: array<${H.type.value}, ${S*v}>;
        ${O.declareVariables(...W,H)}
        ${O.mainStart([v,1,1])}
          let output_indices = ${H.offsetToIndices(`(global_idx / ${v}) * ${S}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/f};
            ${ue()}
            for (var word: u32 = 0; word < ${p}; word += ${b}) {
              ${he()}
              for (var i: u32 = 0; i < ${b}; i++) {
                ${X()}
                word_offset += ${8/f};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${S}) {
            var output_value: ${H.type.value} = ${H.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${S};
            }
            ${H.setByIndices(`${H.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${f};${b};${g};${S};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:m}],dispatchGroup:{x:$},programUniforms:x}),getShaderSource:z}},yh=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],i=t.k,a=t.n,u=r.slice(0,n-2),d=k.size(u),p=e[1].dims[2]/4,m=e[0].dataType,f=ce(t.k),b=ce(p),g=u.concat([o,a]),_=128,S=a%8===0?8:a%4===0?4:1,$=_/S,v=$*b*8,x=v/f,T=v/t.blockSize,E=k.size(g)/S,I=[],z=[d,o,i/f],O=k.convertShape(e[1].dims).slice();O.splice(-1,1,p/b),I.push(...N(z)),I.push(...N(O)),I.push(...N(e[2].dims)),e.length===4&&I.push(...N(k.convertShape(e[3].dims)));let D=[d,o,a];I.push(...N(D));let L=q=>{let Q=z.length,W=P("a",e[0].dataType,Q,f),Z=P("b",12,O.length,b),we=P("scales",e[2].dataType,e[2].dims.length),H=[W,Z,we],j=e.length===4?P("zero_points",12,e[3].dims.length):void 0;j&&H.push(j);let te=D.length,X=M("output",e[0].dataType,te),ue=be(e[0].dataType),he=()=>{switch(f){case 1:return`
          let a_data0 = vec4<${ue}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ue}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${ue}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ue}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${f}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${W.type.value}, ${x}>;
        var<workgroup> inter_results: array<array<${X.type.value}, ${$}>, ${S}>;
        ${q.declareVariables(...H,X)}
        ${q.mainStart([$,S,1])}
          let output_indices = ${X.offsetToIndices(`workgroup_index * ${S}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${T} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${x};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${x}; a_offset += ${_})
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
            ${j?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${j.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${ue}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${ue}(8);`}
            let scale = ${we.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${Z.getByIndices(`${Z.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/f};
            for (var i: u32 = 0; i < ${b}; i++) {
              ${he()}
              let b_value = ${b===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${ue}>(${Array.from({length:4},(ye,re)=>`${ue}(b_value_lower[${re}]), ${ue}(b_value_upper[${re}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${ue}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(ye,re)=>`${`dot(a_data${re}, b_dequantized_values[${re}])`}`).join(" + ")};
              word_offset += ${8/f};
            }
            workgroupBarrier();
          }

          if (local_idx < ${S}) {
            var output_value: ${X.type.value} = ${X.type.value}(0);
            for (var b = 0u; b < ${$}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${X.setByIndices(`${X.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${f};${b};${$};${S}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:g,dataType:m}],dispatchGroup:{x:E},programUniforms:I}),getShaderSource:L}},Jd=(e,t)=>{gh(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(yh(e.inputs,t)):e.compute(bh(e.inputs,t))},el=e=>J(e)});var _h,wh,vh,$h,xh,Sh,Th,Ih,rl,nl=U(()=>{"use strict";ee();ne();ie();_h=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},wh=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
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
      `},vh=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
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
          `},$h=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
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
          `},xh=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
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
          `},Sh=(e,t,r)=>{switch(r.mode){case 0:return wh(e,t,r.pads.length);case 1:return vh(e,t,r.pads.length);case 2:return $h(e,t,r.pads.length);case 3:return xh(e,t,r.pads.length);default:throw new Error("Invalid mode")}},Th=(e,t)=>{let r=k.padShape(e[0].dims.slice(),t.pads),n=e[0].dims,o=k.size(r),i=[{type:12,data:o},{type:6,data:t.pads}],a=e.length>=3&&e[2].data;t.mode===0&&i.push({type:a?e[2].dataType:1,data:t.value}),i.push(...N(e[0].dims,r));let u=["rank"],d=c=>{let p=M("output",e[0].dataType,r.length),m=P("x",e[0].dataType,n.length),f=m.type.value,b=Sh(p,n.length,t),g=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&g.push({name:"constant_value",type:a?f:"f32"}),`
            ${c.registerUniforms(g).declareVariables(m,p)}
            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${p.offsetToIndices("global_idx")};

            var value = ${f}(0);
            ${b}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${a}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(r)/64)},programUniforms:i}),getShaderSource:d}},Ih=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,o=e[0].dims.length,i=new Int32Array(2*o).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let d=0;d<u.length;d++)i[Number(u[d])]=Number(r[d]),i[Number(u[d])+o]=Number(r[d+u.length])}else r.forEach((u,d)=>i[Number(d)]=Number(u));let a=[];return i.forEach(u=>a.push(u)),{mode:t.mode,value:n,pads:a}}else return t},rl=(e,t)=>{_h(e.inputs);let r=Ih(e.inputs,t);e.compute(Th(e.inputs,r),{inputs:[0]})}});var rn,ol,il,al,sl,Ch,Ah,ul,dl,ll,cl,pl,ml,fl,hl,gl,bl,yl,_l,wl=U(()=>{"use strict";We();ee();ne();ie();rn=e=>{if(ge.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},ol=(e,t,r)=>{let n=t.format==="NHWC",o=e.dims.slice();n&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(t,"dilations"),a=t.kernelShape.slice(),u=t.strides.slice(),d=i?t.dilations.slice():[],c=t.pads.slice();Tt.adjustPoolAttributes(r,o,a,u,d,c);let p=Tt.computePoolOutputShape(r,o,u,d,a,c,t.autoPad),m=Object.assign({},t);i?Object.assign(m,{kernelShape:a,strides:u,pads:c,dilations:d,cacheKey:t.cacheKey}):Object.assign(m,{kernelShape:a,strides:u,pads:c,cacheKey:t.cacheKey});let f=p.slice();return f.push(f.splice(1,1)[0]),[m,n?f:p]},il=(e,t)=>{let r=t.format==="NHWC",n=k.size(e),o=k.size(t.kernelShape),i=[{type:12,data:n},{type:12,data:o}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],d=t.strides[t.strides.length-1],c=t.pads[t.pads.length/2-1],p=t.pads[t.pads.length-1],m=!!(c+p);i.push({type:12,data:u},{type:12,data:d},{type:12,data:c},{type:12,data:p}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let f=!1;if(t.kernelShape.length===2){let b=t.kernelShape[t.kernelShape.length-2],g=t.strides[t.strides.length-2],_=t.pads[t.pads.length/2-2],S=t.pads[t.pads.length-2];f=!!(_+S),i.push({type:12,data:b},{type:12,data:g},{type:12,data:_},{type:12,data:S}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,m,f]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=k.computeStrides(t.kernelShape);i.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),a.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let d=t.pads.reduce((c,p)=>c+p);return[i,a,!!d,!1,!1]}},al=(e,t,r,n,o,i,a,u,d,c,p,m)=>{let f=o.format==="NHWC",b=t.type.value,g=M("output",t.type.tensor,n);if(o.kernelShape.length<=2){let _="",S="",$="",v=r-(f?2:1);if(p?_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${v}] < 0 || xIndices[${v}]
                      >= uniforms.x_shape[${v}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`:_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let T=r-(f?3:2);m?S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${T}] < 0 || xIndices[${T}] >= uniforms.x_shape[${T}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:S=`
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

              var value = ${b}(${u});
              var pad = 0;
              ${S}
              ${_}
              ${$}
              ${a}

              output[global_idx] = value;
            }`}else{if(f)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let _=o.kernelShape.length,S=o.pads.length,$="";return c?$=`
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

              var value = ${b}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${_-1}u; j++) {
                  offsets[j] = offset / ${F("uniforms.kernelStrides","j",_)};
                  offset -= offsets[j] * ${F("uniforms.kernelStrides","j",_)};
                }
                offsets[${_-1}] = offset;

                isPad = false;
                for (var j = ${r-_}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${F("uniforms.strides",`j - ${r-_}u`,_)}
                    + offsets[j - ${r-_}u] - ${F("uniforms.pads","j - 2u",S)};
                  ${$}
              }
              ${a}

              output[global_idx] = value;
            }`}},sl=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Ch=e=>`${sl(e)};${e.countIncludePad}`,Ah=e=>`${sl(e)};${e.storageOrder};${e.dilations}`,ul=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),dl=(e,t,r,n)=>{let[o,i]=ol(t,n,r),a=P("x",t.dataType,t.dims.length),u=a.type.value,d="value += x_val;",c="";o.countIncludePad?c+=`value /= ${u}(uniforms.kernelSize);`:c+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[p,m,f,b,g]=il(i,o);p.push(...N(t.dims,i));let _=["rank"];return{name:e,shaderCache:{hint:`${n.cacheKey};${f};${b};${g}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:p}),getShaderSource:S=>al(S,a,t.dims.length,i.length,o,d,c,0,m,f,b,g)}},ll=e=>{let t=e.count_include_pad!==0,r=ul(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:t,...r,cacheKey:""};return{...n,cacheKey:Ch(n)}},cl=(e,t)=>{rn(e.inputs),e.compute(dl("AveragePool",e.inputs[0],!1,t))},pl={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},ml=e=>{let t=e.format;return{format:t,...pl,cacheKey:t}},fl=(e,t)=>{rn(e.inputs),e.compute(dl("GlobalAveragePool",e.inputs[0],!0,t))},hl=(e,t,r,n)=>{let[o,i]=ol(t,n,r),a=`
      value = max(x_val, value);
    `,u="",d=P("x",t.dataType,t.dims.length),c=["rank"],[p,m,f,b,g]=il(i,o);return p.push(...N(t.dims,i)),{name:e,shaderCache:{hint:`${n.cacheKey};${f};${b};${g}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:p}),getShaderSource:_=>al(_,d,t.dims.length,i.length,o,a,u,t.dataType===10?-65504:-1e5,m,f,b,g)}},gl=(e,t)=>{rn(e.inputs),e.compute(hl("MaxPool",e.inputs[0],!1,t))},bl=e=>{let t=e.storage_order,r=e.dilations,n=ul(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:r,...n,cacheKey:""};return{...o,cacheKey:Ah(o)}},yl=e=>{let t=e.format;return{format:t,...pl,cacheKey:t}},_l=(e,t)=>{rn(e.inputs),e.compute(hl("GlobalMaxPool",e.inputs[0],!0,t))}});var kh,Ph,vl,$l,xl=U(()=>{"use strict";ee();ne();Se();ie();kh=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,n)=>r===e[2].dims[n]).reduce((r,n)=>r&&n,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((o,i)=>i===t.axis||o===e[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],n=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/n)||t.blockSize>Math.ceil(r/(n-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Ph=(e,t)=>{let r=k.normalizeAxis(t.axis,e[0].dims.length),n=e[0].dataType,o=n===3,i=e[0].dims,a=e[1].dataType,u=k.size(i),d=n===3||n===2,c=d?[Math.ceil(k.size(e[0].dims)/4)]:e[0].dims,p=e[1].dims,m=e.length>2?e[2]:void 0,f=m?d?[Math.ceil(k.size(m.dims)/4)]:m.dims:void 0,b=p.length===0||p.length===1&&p[0]===1,g=b===!1&&p.length===1,_=ce(u),S=b&&(!d||_===4),$=S?_:1,v=S&&!d?_:1,x=P("input",d?12:n,c.length,v),T=P("scale",a,p.length),E=m?P("zero_point",d?12:n,f.length):void 0,I=M("output",a,i.length,$),z=[x,T];E&&z.push(E);let O=[c,p];m&&O.push(f);let D=[{type:12,data:u/$},{type:12,data:r},{type:12,data:t.blockSize},...N(...O,i)],L=q=>{let Q=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${q.registerUniforms(Q).declareVariables(...z,I)}
      ${q.mainStart()}
          ${q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${I.offsetToIndices("global_idx")};

          // Set input x
          ${d?`
            let input = ${x.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${$===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${x.getByOffset("global_idx")};`};

          // Set scale input
          ${b?`let scale_value= ${T.getByOffset("0")}`:g?`
            let scale_index = ${I.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${T.getByOffset("scale_index")};`:`
            var scale_indices: ${T.type.indices} = output_indices;
            let index = ${T.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${T.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${T.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${E?b?d?`
                let zero_point_input = ${E.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${E.getByOffset("0")}`:g?d?`
                let zero_point_index = ${I.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${E.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${I.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${E.getByOffset("zero_point_index")};`:d?`
                let zero_point_offset = ${T.indicesToOffset("scale_indices")};
                let zero_point_input = ${E.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${E.getByIndices("scale_indices")};`:`let zero_point_value = ${d?o?"i32":"u32":x.type.value}(0);`};
      // Compute and write output
      ${I.setByOffset("global_idx",`${I.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:E?["rank","rank","rank"]:["rank","rank"]},getShaderSource:L,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(u/$/64),y:1,z:1},programUniforms:D})}},vl=(e,t)=>{kh(e.inputs,t),e.compute(Ph(e.inputs,t))},$l=e=>J({axis:e.axis,blockSize:e.blockSize})});var zh,Oh,Sl,Tl=U(()=>{"use strict";We();ee();ie();zh=(e,t,r)=>{let n=e===t,o=e<t&&r<0,i=e>t&&r>0;if(n||o||i)throw new Error("Range these inputs' contents are invalid.")},Oh=(e,t,r,n)=>{let o=Math.abs(Math.ceil((t-e)/r)),i=[o],a=o,u=[{type:12,data:a},{type:n,data:e},{type:n,data:r},...N(i)],d=c=>{let p=M("output",n,i.length),m=p.type.value,f=[{name:"outputSize",type:"u32"},{name:"start",type:m},{name:"delta",type:m}];return`
        ${c.registerUniforms(f).declareVariables(p)}
        ${c.mainStart()}
        ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${m}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:d,getRunData:()=>({outputs:[{dims:i,dataType:n}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:u})}},Sl=e=>{let t=0,r=0,n=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],n=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],n=e.inputs[2].getFloat32Array()[0]),ge.webgpu.validateInputContent&&zh(t,r,n),e.compute(Oh(t,r,n,e.inputs[0].dataType),{inputs:[]})}});var Bh,Il,Cl,Dh,Al,El,kl=U(()=>{"use strict";ee();ne();Se();ie();Bh=(e,t,r,n)=>{if(e!=="none"&&n!=="i32"&&n!=="u32"&&n!=="f32")throw new Error(`Input ${n} is not supported with reduction ${e}.`);let o=`{
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
                ${o}max(bitcast<f32>(oldValue), (${r}))${i}`;case"min":return n==="i32"||n==="u32"?`atomicMin(&${t}, bitcast<${n}>(${r}));`:`${o}min(bitcast<${n}>(oldValue), (${r}))${i}`;case"mul":return`${o}(bitcast<${n}>(oldValue) * (${r}))${i}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Il=(e,t)=>`${e===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[${t?"i - indices_start":"i"}];
    let dim_value = uniforms.output_shape[${t?"i - indices_start":"i"} + uniforms.last_index_dimension];`}
    
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
    data_offset += u32((u32(index) * element_count_dim));`,Cl=(e,t,r)=>`for (var i = 0u; i < uniforms.num_updates_elements; i++) {
        let value = updates[uniforms.num_updates_elements * ${r?"global_idx":"idx"} + i];
        ${Bh(e.reduction,"output[data_offset + i]","value",t)}
      }`,Dh=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r,i=1,a=Math.ceil(k.size(n)/i),u=n[n.length-1],d=k.sizeFromDimension(r,u),c=k.sizeFromDimension(n,0)/u,p=[{type:12,data:a},{type:12,data:u},{type:12,data:d},...N(e[1].dims,e[2].dims,o)],m=f=>{let b=P("indices",e[1].dataType,e[1].dims.length),g=P("updates",e[2].dataType,e[2].dims.length,i),_=t.reduction!=="none"&&t.reduction!==""?es("output",e[0].dataType,o.length):M("output",e[0].dataType,o.length,i);return`
      ${f.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(b,g,_)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${t.reduction==="none"}) {
    for (var i = 0; i < ${c}; i = i + 1) {
      for (var j = i + 1; j < ${c}; j = j + 1) {
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

  if (${t.reduction==="none"} && hasDuplicates) {
    if (global_idx != 0u) {
      return;
    }
    // Process each index-update pair individually when duplicates exist
    for (var idx = 0u; idx < ${c}u; idx++) {
      var data_offset = 0u;
      for (var i = 0u; i < uniforms.last_index_dimension; i++) {
        var index = i32(indices[idx * uniforms.last_index_dimension + i].x);
        ${Il(r.length,!1)}
      }
      ${Cl(t,_.type.value,!1)}
    }
    return;
  }

  var data_offset = 0u;
  var indices_start = uniforms.last_index_dimension * global_idx;
  var indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${Il(r.length,!0)}
  }
  ${Cl(t,_.type.value,!0)}
  }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:p}),getShaderSource:m}},Al=e=>J({reduction:e.reduction}),El=(e,t)=>{e.compute(Dh(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}});var Mh,Rh,Uh,Pl,Nh,Vh,Wh,Lh,Gh,Hh,Fh,qh,zl,jh,Kh,Zh,Qh,Yh,Ol,Bl,Dl=U(()=>{"use strict";ee();ne();Se();ie();Mh=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Rh=(e,t,r)=>{t.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let n=new Array(r).fill(1);return t.forEach((o,i)=>n[o]=e[i]),n},Uh=(e,t,r,n,o,i)=>{let[a,u,d]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],c=e[0].dims.length;if(a>0&&e.length>a&&e[a].dims.length>0)e[a].getFloat32Array().forEach(p=>i.push(p));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(p=>n.push(p)),n.length!==0&&n.length!==c&&r>=18&&n.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Mh(n,t),t.axes.length>0&&Rh(n,t.axes,c).forEach((p,m)=>n[m]=p)}if(d>0&&e.length>d&&e[d].dims.length===1&&e[d].dims[0]>0&&(e[d].getBigInt64Array().forEach(p=>o.push(Number(p))),o.length!==0&&o.length!==c&&r>=18&&o.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof n<"u"&&typeof o<"u"&&n.length>0&&o.length>c)throw new Error("Resize requires only of scales or sizes to be specified")},Pl=(e,t,r,n)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${n}(big / (${r}));
  let fract = ${n}(big % (${r})) / ${n}(${r});
  return whole + fract;
`,Nh=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Pl("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Pl("xResized","lengthOriginal - 1","lengthResized - 1",t)}
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Vh=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Wh=(e,t,r)=>{let n=new Array(r).fill(0).concat(new Array(r).fill(1)),o=e.length===0?n:e.slice();return t.length>0?(t.forEach((i,a)=>{n[i]=o[a],n[a+r]=o[t.length+a]}),n):o},Lh=(e,t,r,n)=>{let o=[];if(r.length>0)if(n.length>0){if(e.forEach(i=>o.push(i)),Math.max(...n)>e.length)throw new Error("axes is out of bound");n.forEach((i,a)=>o[i]=r[a])}else r.forEach(i=>o.push(i));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");o=e.map((i,a)=>Math.round(i*t[a]))}return o},Gh=(e,t,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>t[i]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>t[i]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return r.axes.length>0?(r.axes.forEach(i=>t[i]=n),r.axes.forEach(i=>o[i]=Math.round(e[i]*t[i]))):(t.fill(n,0,t.length),o.forEach((i,a)=>o[a]=Math.round(i*t[a]))),o},Hh=(e,t,r,n,o)=>`
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
    }`,Fh=(e,t,r,n,o,i,a)=>`
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
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,qh=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${F("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,zl=(e,t,r,n)=>e.rank>n?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",jh=(e,t,r,n,o)=>{let[a,u,d,c]=r.length===2?[-1,0,1,-1]:[0,2,3,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",u,`max(0, min(row, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(col, ${r[d]} - 1))`)};
      ${zl(e,c,a,2)}
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
    }`},Kh=(e,t,r,n,o,i,a,u,d,c)=>{let p=r.length===2,m=!0,[f,b]=p?[0,1]:m?[2,3]:[1,2],g=e.type.value,_=S=>{let $=S===f?"row":"col";return`
      fn ${$}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${g} {
        var output_index = ${t.indicesGet("output_indices",S)};
        var originalIdx: ${g} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[S]},
        ${n[S]}, ${r[S]}, ${i[S]}, ${i[S]} + ${r.length});
        var fractOriginalIdx: ${g} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[S]} - 1))) {
          return ${d};
        }
        var data: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${$}: ${g} = originalIdx + ${g}(i);
          if (${$} < 0 || ${$} >= ${r[S]}) {
            ${c?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${d};`:`${$} = max(0, min(${$}, ${r[S]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",S,`u32(${$})`)};
          data[i + 1] = ${S===f?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${_(f)};
    ${_(b)};
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
    `},Zh=(e,t,r,n,o)=>{let[a,u,d,c,p]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],m=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${m} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",u,`max(0, min(depth, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(height, ${r[d]} - 1))`)};
      ${e.indicesSet("input_indices",c,`max(0, min(width, ${r[c]} - 1))`)};
      ${zl(e,p,a,3)}
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
    }`},Qh=(e,t,r,n,o,i)=>{let a=e.dims,u=Wh(i,t.axes,a.length),d=Lh(a,n,o,t.axes),c=n.slice();n.length===0&&(c=a.map((v,x)=>v===0?1:d[x]/v),t.keepAspectRatioPolicy!=="stretch"&&(d=Gh(a,c,t)));let p=M("output",e.dataType,d.length),m=P("input",e.dataType,a.length),f=k.size(d),b=a.length===d.length&&a.every((v,x)=>v===d[x]),g=t.coordinateTransformMode==="tf_crop_and_resize",_=t.extrapolationValue,S=m.type.value,$=v=>`
      ${b?"":`
      ${Nh(t.coordinateTransformMode,S)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${qh(m,a)};
              ${Vh(t.nearestMode,r,S)};
              ${Fh(m,p,a,d,c.length,u.length,g)};
              `;case"linear":return`
              ${Hh(p,a,d,c.length,u.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${jh(m,p,a,g,_)}`;if(a.length===3||a.length===5)return`${Zh(m,p,a,g,_)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${Kh(m,p,a,d,c,u,t.cubicCoeffA,g,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${v.registerUniform("output_size","u32").registerUniform("scales","f32",c.length).registerUniform("roi","f32",u.length).declareVariables(m,p)}
      ${v.mainStart()}
        ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${b?"output[global_idx] = input[global_idx];":`
        let output_indices = ${p.offsetToIndices("global_idx")};
        var input_indices: ${m.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${m.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${c.length>0?t.mode==="cubic"?c:c.length:""}|${o.length>0?o:""}|${u.length>0?u:""}|${b}|${t.mode==="nearest"?a.length:a}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:d,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},{type:1,data:c},{type:1,data:u},...N(a,d)]})}},Yh=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},Ol=(e,t)=>{let r=[],n=[],o=[],i=Yh(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Uh(e.inputs,t,i,r,n,o),e.compute(Qh(e.inputs[0],t,i,r,n,o),{inputs:[0]})},Bl=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,o=e.cubicCoeffA,i=e.excludeOutside!==0,a=e.extrapolationValue,u=e.keepAspectRatioPolicy,d=e.mode,c=e.nearestMode===""?"simple":e.nearestMode;return J({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:o,excludeOutside:i,extrapolationValue:a,keepAspectRatioPolicy:u,mode:d,nearestMode:c})}});var Xh,Jh,Ml,Rl=U(()=>{"use strict";ee();ne();ie();Xh=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],i=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(n.dims.length!==1)throw new Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let a=e[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let a=e[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},Jh=(e,t,r,n)=>{let o=t.simplified,i=e[0].dims,a=k.size(i),u=i,d=a,c=i.slice(-1)[0],p=n?i.slice(0,-1).concat(1):[],m=!o&&e.length>3,f=e.length>4,b=n&&r>1,g=n&&r>2,_=r>3,S=64,$=ce(c),v=[{type:12,data:d},{type:12,data:$},{type:12,data:c},{type:1,data:t.epsilon}],x=E=>{let I=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],z=[P("x",e[0].dataType,e[0].dims,$),P("skip",e[1].dataType,e[1].dims,$),P("gamma",e[2].dataType,e[2].dims,$)];m&&z.push(P("beta",e[3].dataType,e[3].dims,$)),f&&z.push(P("bias",e[4].dataType,e[4].dims,$)),z.push(M("output",e[0].dataType,u,$)),b&&z.push(M("mean_output",1,p)),g&&z.push(M("inv_std_output",1,p)),_&&z.push(M("input_skip_bias_sum",e[0].dataType,u,$));let O=be(e[0].dataType),D=be(1,$);return`

      ${E.registerUniforms(I).declareVariables(...z)}
      var<workgroup> sum_shared : array<${D}, ${S}>;
      var<workgroup> sum_squared_shared : array<${D}, ${S}>;

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
        let mean = ${He("sum",$)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${He("square_sum",$)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${b?"mean_output[global_idx] = mean;":""}
        ${g?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${O}(mean)`}) *
            ${O}(inv_std_dev) * gamma[offset1d + i]
            ${m?"+ beta[offset1d + i]":""};
        }
      }`},T=[{dims:u,dataType:e[0].dataType}];return r>1&&T.push({dims:p,dataType:1}),r>2&&T.push({dims:p,dataType:1}),r>3&&T.push({dims:i,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${b};${g};${_}`,inputDependencies:e.map((E,I)=>"type")},getShaderSource:x,getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(d/c)},programUniforms:v})}},Ml=(e,t)=>{Xh(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(Jh(e.inputs,t,e.outputCount,!1),{outputs:n})}});var eg,nn,tg,Ul,rg,ng,Nl,Vl,Wl=U(()=>{"use strict";ee();ne();Se();ie();eg=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw new Error(`Input ${n} must be an array of int32 or int64`)})},nn=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(n=>r.push(Number(n)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(n=>r.push(Number(n)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},tg=(e,t)=>{if(e.length>1){let r=nn(e,1),n=nn(e,2),o=nn(e,3);return o.length===0&&(o=[...Array(e[0].dims.length).keys()]),J({starts:r,ends:n,axes:o})}else return t},Ul=(e,t,r,n,o)=>{let i=e;return e<0&&(i+=r[n[t]]),o[t]<0?Math.max(0,Math.min(i,r[n[t]]-1)):Math.max(0,Math.min(i,r[n[t]]))},rg=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
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
      }`,ng=(e,t)=>{let r=e[0].dims,n=k.size(r),o=t.axes.length>0?k.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],i=nn(e,4);i.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let a=t.starts.map(($,v)=>Ul($,v,r,o,i)),u=t.ends.map(($,v)=>Ul($,v,r,o,i));if(o.length!==a.length||o.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let $=0;$<r.length;++$)o.includes($)||(a.splice($,0,0),u.splice($,0,r[$]),i.splice($,0,1));let d=i.map($=>Math.sign($));i.forEach(($,v,x)=>{if($<0){let T=(u[v]-a[v])/$,E=a[v],I=E+T*i[v];a[v]=I,u[v]=E,x[v]=-$}});let c=r.slice(0);o.forEach(($,v)=>{c[$]=Math.ceil((u[$]-a[$])/i[$])});let p={dims:c,dataType:e[0].dataType},m=M("output",e[0].dataType,c.length),f=P("input",e[0].dataType,e[0].dims.length),b=k.size(c),g=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:d.length},{name:"steps",type:"u32",length:i.length}],_=[{type:12,data:b},{type:12,data:a},{type:6,data:d},{type:12,data:i},...N(e[0].dims,c)],S=$=>`
      ${$.registerUniforms(g).declareVariables(f,m)}
        ${rg(f,m,r)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${m.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${m.setByOffset("global_idx",f.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${d.length}_${a.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:S,getRunData:()=>({outputs:[p],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:_})}},Nl=(e,t)=>{eg(e.inputs,t);let r=tg(e.inputs,t);e.compute(ng(e.inputs,r),{inputs:[0]})},Vl=e=>{let t=e.starts,r=e.ends,n=e.axes;return J({starts:t,ends:r,axes:n})}});var og,ig,Ll,Gl,Hl=U(()=>{"use strict";ee();ne();Se();st();ie();og=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},ig=(e,t)=>{let r=e.inputs[0],n=r.dims,o=k.size(n),i=n.length,a=k.normalizeAxis(t.axis,i),u=a<n.length-1,d,c=[];u?(c=Array.from({length:i},(z,O)=>O),c[a]=i-1,c[i-1]=a,d=e.compute(Ee(r,c),{inputs:[r],outputs:[-1]})[0]):d=r;let p=d.dims,m=p[i-1],f=o/m,b=ce(m),g=m/b,_=64;f===1&&(_=256);let S=(z,O)=>O===4?`max(max(${z}.x, ${z}.y), max(${z}.z, ${z}.w))`:O===2?`max(${z}.x, ${z}.y)`:O===3?`max(max(${z}.x, ${z}.y), ${z}.z)`:z,$=P("x",d.dataType,d.dims,b),v=M("result",d.dataType,d.dims,b),x=$.type.value,T=be(d.dataType)==="f32"?`var threadMax = ${x}(-3.402823e+38f);`:`var threadMax = ${x}(-65504.0h);`,E=z=>`
      var<workgroup> rowMaxShared : ${x};
      var<workgroup> rowSumShared : ${x};
      var<workgroup> threadShared : array<${x}, ${_}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${x} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${x}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${z.registerUniform("packedCols","i32").declareVariables($,v)}
      ${z.mainStart(_)}
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
          rowMaxShared = ${x}(${S("threadShared[0]",b)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${x}(0.0);
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
          rowSumShared = ${x}(${He("threadShared[0]",b)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,I=e.compute({name:"Softmax",shaderCache:{hint:`${b};${_}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:p,dataType:d.dataType}],dispatchGroup:{x:f},programUniforms:[{type:6,data:g}]}),getShaderSource:E},{inputs:[d],outputs:[u?-1:0]})[0];u&&e.compute(Ee(I,c),{inputs:[I]})},Ll=(e,t)=>{og(e.inputs),ig(e,t)},Gl=e=>J({axis:e.axis})});var Fl,ag,sg,ug,ql,jl=U(()=>{"use strict";ee();ne();ie();Fl=e=>Array.from(e.getBigInt64Array(),Number),ag=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Fl(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},sg=(e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r},ug=(e,t)=>{let r=e[0].dims,n=t??Fl(e[1]),o=sg(r,n),i=k.size(o),a=e[0].dataType,u=P("input",a,r.length),d=M("output",a,o.length),c=p=>`
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
    }`;return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...N(e[0].dims,o)]}),getShaderSource:c}},ql=e=>{ag(e.inputs),e.compute(ug(e.inputs),{inputs:[0]})}});var dg,lg,Kl,Zl=U(()=>{"use strict";ee();ne();ie();dg=(e,t,r,n,o)=>{let i=M("output_data",o,r.length,4),a=P("a_data",t[1].dataType,t[1].dims.length,4),u=P("b_data",t[2].dataType,t[2].dims.length,4),d=P("c_data",t[0].dataType,t[0].dims.length,4),c,p=(m,f,b)=>`select(${f}, ${m}, ${b})`;if(!n)c=i.setByOffset("global_idx",p(a.getByOffset("global_idx"),u.getByOffset("global_idx"),d.getByOffset("global_idx")));else{let m=(f,b,g="")=>{let _=`a_data[index_a${b}][component_a${b}]`,S=`b_data[index_b${b}][component_b${b}]`,$=`bool(c_data[index_c${b}] & (0xffu << (component_c${b} * 8)))`;return`
            let output_indices${b} = ${i.offsetToIndices(`global_idx * 4u + ${b}u`)};
            let offset_a${b} = ${a.broadcastedIndicesToOffset(`output_indices${b}`,i)};
            let offset_b${b} = ${u.broadcastedIndicesToOffset(`output_indices${b}`,i)};
            let offset_c${b} = ${d.broadcastedIndicesToOffset(`output_indices${b}`,i)};
            let index_a${b} = offset_a${b} / 4u;
            let index_b${b} = offset_b${b} / 4u;
            let index_c${b} = offset_c${b} / 4u;
            let component_a${b} = offset_a${b} % 4u;
            let component_b${b} = offset_b${b} % 4u;
            let component_c${b} = offset_c${b} % 4u;
            ${f}[${b}] = ${g}(${p(_,S,$)});
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
      }`},lg=e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,o=e[1].dataType,i=!(k.areEqual(t,r)&&k.areEqual(r,n)),a=t,u=k.size(t);if(i){let c=Je.calcShape(Je.calcShape(t,r,!1),n,!1);if(!c)throw new Error("Can't perform where op on the given tensors");a=c,u=k.size(a)}let d=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:c=>dg(c,e,a,i,o),getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:d},...N(n,t,r,a)]})}},Kl=e=>{e.compute(lg(e.inputs))}});var Ql,Yl=U(()=>{"use strict";Es();Fr();zs();Bs();_u();ku();Ou();Zu();rd();id();ud();md();gd();yd();vd();Sd();Cd();kd();Od();Md();Fd();Kd();Qd();Xd();tl();$o();nl();wl();xl();Tl();kl();Gr();Dl();To();Rl();Wl();Hl();So();jl();st();jr();Zl();Ql=new Map([["Abs",[Ds]],["Acos",[Ms]],["Acosh",[Rs]],["Add",[wu]],["ArgMax",[As,uo]],["ArgMin",[Cs,uo]],["Asin",[Us]],["Asinh",[Ns]],["Atan",[Vs]],["Atanh",[Ws]],["Attention",[ks]],["AveragePool",[cl,ll]],["BatchNormalization",[Ps]],["BiasAdd",[Os]],["BiasSplitGelu",[yu]],["Cast",[Gs,Ls]],["Ceil",[Fs]],["Clip",[Hs]],["Concat",[Pu,zu]],["Conv",[yo,bo]],["ConvTranspose",[td,Ju]],["Cos",[qs]],["Cosh",[js]],["CumSum",[nd,od]],["DepthToSpace",[ad,sd]],["DequantizeLinear",[vl,$l]],["Div",[vu]],["Einsum",[cd,pd]],["Elu",[Ks,Yt]],["Equal",[$u]],["Erf",[Zs]],["Exp",[Qs]],["Expand",[hd]],["FastGelu",[bd]],["Floor",[Ys]],["FusedConv",[yo,bo]],["Gather",[wd,_d]],["GatherElements",[Ed,Ad]],["GatherBlockQuantized",[Td,Id]],["GatherND",[$d,xd]],["Gelu",[Xs]],["Gemm",[zd,Pd]],["GlobalAveragePool",[fl,ml]],["GlobalMaxPool",[_l,yl]],["Greater",[Iu]],["GreaterOrEqual",[Au]],["GridSample",[Bd,Dd]],["GroupQueryAttention",[Hd]],["HardSigmoid",[au,iu]],["InstanceNormalization",[jd]],["LayerNormalization",[Zd]],["LeakyRelu",[Js,Yt]],["Less",[Cu]],["LessOrEqual",[Eu]],["Log",[hu]],["MatMul",[Yd]],["MatMulNBits",[Jd,el]],["MaxPool",[gl,bl]],["Mul",[xu]],["MultiHeadAttention",[Nd,Ud]],["Neg",[tu]],["Not",[eu]],["Pad",[rl]],["Pow",[Su]],["QuickGelu",[gu,Yt]],["Range",[Sl]],["Reciprocal",[ru]],["ReduceMin",[vs]],["ReduceMean",[gs]],["ReduceMax",[ws]],["ReduceSum",[xs]],["ReduceProd",[$s]],["ReduceL1",[bs]],["ReduceL2",[ys]],["ReduceLogSum",[Ts]],["ReduceLogSumExp",[_s]],["ReduceSumSquare",[Ss]],["Relu",[nu]],["Resize",[Ol,Bl]],["RotaryEmbedding",[Ld]],["ScatterND",[El,Al]],["Sigmoid",[ou]],["Sin",[su]],["Sinh",[uu]],["Slice",[Nl,Vl]],["SkipLayerNormalization",[Ml]],["Split",[Vd,Wd]],["Sqrt",[du]],["Softmax",[Ll,Gl]],["Sub",[Tu]],["Tan",[lu]],["Tanh",[pu]],["ThresholdedRelu",[fu,Yt]],["Tile",[ql]],["Transpose",[ns,os]],["Where",[Kl]]])});var on,Xl=U(()=>{"use strict";We();Xe();ie();on=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,r){this.repo.set(t,r)}run(t,r,n,o,i){Re(t.programInfo.name);let a=this.backend.device,u=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let d=[];for(let p of r)d.push({binding:d.length,resource:{buffer:p.buffer}});for(let p of n)d.push({binding:d.length,resource:{buffer:p.buffer}});i&&d.push({binding:d.length,resource:i});let c=a.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:d,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let p={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:c,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(p)}u.setPipeline(t.computePipeline),u.setBindGroup(0,c),u.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Oe(t.programInfo.name)}dispose(){}build(t,r){Re(t.name);let n=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(m=>{n.features.has(m.feature)&&o.push(`enable ${m.extension};`)});let a=ts(r,this.backend.device.limits),u=t.getShaderSource(a),d=`${o.join(`
`)}
${a.additionalImplementations}
${u}`,c=n.createShaderModule({code:d,label:t.name});se("verbose",()=>`[WebGPU] ${t.name} shader code: ${d}`);let p=n.createComputePipeline({compute:{module:c,entryPoint:"main"},layout:"auto",label:t.name});return Oe(t.name),{programInfo:t,computePipeline:p,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(t){let r=typeof t=="number"?t:t.x,n=typeof t=="number"?1:t.y||1,o=typeof t=="number"?1:t.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=i&&n<=i&&o<=i)return[r,n,o];let a=r*n*o,u=Math.ceil(Math.sqrt(a));if(u>i){if(u=Math.ceil(Math.cbrt(a)),u>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[u,u,u]}else return[u,u,1]}}});var Jl={};Dt(Jl,{WebGpuBackend:()=>Co});var cg,pg,Io,Co,ec=U(()=>{"use strict";We();ee();Xe();Zn();Ja();Yl();Xl();cg=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let o=e[n].dataType;switch(t[n]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let i=e[n].dims.length;r.push(`${o};${i}`);break}case"dims":{let i=e[n].dims.join(",");r.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")},pg=(e,t,r)=>{let n=e.name;return e.shaderCache?.hint&&(n+="["+e.shaderCache.hint+"]"),n+=":"+r+`:${cg(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,n},Io=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},Co=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,r){this.env=t;let n=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},i=a=>r.features.has(a)&&n.push(a)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups"),this.device=await r.requestDevice(o),this.adapterInfo=new Io(r.info||await r.requestAdapterInfo()),this.gpuDataManager=Xa(this),this.programManager=new on(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Br(t.logLevel,!!t.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Re(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(t.getMappedRange()),n=this.pendingQueries.get(t);for(let o=0;o<r.length/2;o++){let i=n[o],a=i.kernelId,u=this.kernels.get(a),d=u.kernelType,c=u.kernelName,p=i.programName,m=i.inputTensorViews,f=i.outputTensorViews,b=r[o*2],g=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=b);let _=Number(b-this.queryTimeBase),S=Number(g-this.queryTimeBase);if(!Number.isSafeInteger(_)||!Number.isSafeInteger(S))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:m.map($=>({dims:$.dims,dataType:Ye($.dataType)})),outputsMetadata:f.map($=>({dims:$.dims,dataType:Ye($.dataType)})),kernelId:a,kernelType:d,kernelName:c,programName:p,startTime:_,endTime:S});else{let $="";m.forEach((x,T)=>{$+=`input[${T}]: [${x.dims}] | ${Ye(x.dataType)}, `});let v="";f.forEach((x,T)=>{v+=`output[${T}]: [${x.dims}] | ${Ye(x.dataType)}, `}),console.log(`[profiling] kernel "${a}|${d}|${c}|${p}" ${$}${v}execution time: ${S-_} ns`)}gr("GPU",`${p}::${b}::${g}`)}t.unmap(),this.pendingQueries.delete(t)}),Oe()}run(t,r,n,o,i,a){Re(t.name);let u=[];for(let x=0;x<r.length;++x){let T=r[x].data;if(T===0)continue;let E=this.gpuDataManager.get(T);if(!E)throw new Error(`no GPU data for input: ${T}`);u.push(E)}let{outputs:d,dispatchGroup:c,programUniforms:p}=t.getRunData(r),m=n.length===0?d.map((x,T)=>T):n;if(m.length!==d.length)throw new Error(`Output size ${m.length} must be equal to ${d.length}.`);let f=[],b=[];for(let x=0;x<d.length;++x){if(!Number.isInteger(m[x])||m[x]<-3||m[x]>=a)throw new Error(`Invalid output index: ${m[x]}`);if(m[x]===-3)continue;let T=m[x]===-1,E=m[x]===-2,I=T||E?i(d[x].dataType,d[x].dims):o(m[x],d[x].dataType,d[x].dims);if(f.push(I),I.data===0)continue;let z=this.gpuDataManager.get(I.data);if(!z)throw new Error(`no GPU data for output: ${I.data}`);if(T&&this.temporaryData.push(z),E){let O=this.kernelPersistentData.get(this.currentKernelId);O||(O=[],this.kernelPersistentData.set(this.currentKernelId,O)),O.push(z)}b.push(z)}if(u.length!==r.length||b.length!==f.length){if(b.length===0)return Oe(t.name),f;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let g;if(p){let x=0,T=[];p.forEach(O=>{let D=typeof O.data=="number"?[O.data]:O.data;if(D.length===0)return;let L=O.type===10?2:4,q,Q;O.type===10?(Q=D.length>4?16:D.length>2?8:D.length*L,q=D.length>4?16:L*D.length):(Q=D.length<=2?D.length*L:16,q=16),x=Math.ceil(x/Q)*Q,T.push(x);let W=O.type===10?8:4;x+=D.length>4?Math.ceil(D.length/W)*q:D.length*L});let E=16;x=Math.ceil(x/E)*E;let I=new ArrayBuffer(x);p.forEach((O,D)=>{let L=T[D],q=typeof O.data=="number"?[O.data]:O.data;if(O.type===6)new Int32Array(I,L,q.length).set(q);else if(O.type===12)new Uint32Array(I,L,q.length).set(q);else if(O.type===10)new Uint16Array(I,L,q.length).set(q);else if(O.type===1)new Float32Array(I,L,q.length).set(q);else throw new Error(`Unsupported uniform type: ${Ye(O.type)}`)});let z=this.gpuDataManager.create(x,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(z.buffer,0,I,0,x),this.gpuDataManager.release(z.id),g={offset:0,size:x,buffer:z.buffer}}let _=this.programManager.normalizeDispatchGroupSize(c),S=_[1]===1&&_[2]===1,$=pg(t,r,S),v=this.programManager.getArtifact($);if(v||(v=this.programManager.build(t,_),this.programManager.setArtifact($,v),se("info",()=>`[artifact] key: ${$}, programName: ${t.name}`)),p&&v.uniformVariablesInfo){if(p.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${p.length} in program "${v.programInfo.name}".`);for(let x=0;x<p.length;x++){let T=p[x],E=T.type,I=typeof T.data=="number"?1:T.data.length,[z,O]=v.uniformVariablesInfo[x];if(E!==z||I!==O)throw new Error(`Uniform variable ${x} mismatch: expect type ${z} with size ${O}, got type ${E} with size ${I} in program "${v.programInfo.name}".`)}}if(se("info",()=>`[ProgramManager] run "${t.name}" (key=${$}) with ${_[0]}x${_[1]}x${_[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let x={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:r,outputTensorViews:f};this.pendingKernels.push(x),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(x)}return this.programManager.run(v,u,b,_,g),Oe(t.name),f}upload(t,r){this.gpuDataManager.upload(t,r)}memcpy(t,r){this.gpuDataManager.memcpy(t,r)}async download(t,r){await this.gpuDataManager.download(t,r)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,r,n,o){let i=Ql.get(t);if(!i)throw new Error(`kernel not implemented: ${t}`);let a={kernelType:t,kernelName:o,kernelEntry:i[0],attributes:[i[1],n]};this.kernels.set(r,a)}releaseKernel(t){let r=this.kernelPersistentData.get(t);if(r){for(let n of r)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,r,n){let o=this.kernels.get(t);if(!o)throw new Error(`kernel not created: ${t}`);let i=o.kernelType,a=o.kernelName,u=o.kernelEntry,d=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=t,d[0]&&(d[1]=d[0](d[1]),d[0]=void 0),se("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let c=this.env.debug;this.temporaryData=[];try{return c&&this.device.pushErrorScope("validation"),u(r,d[1]),0}catch(p){return n.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${p}`)),1}finally{c&&n.push(this.device.popErrorScope().then(p=>p?`GPU validation error for kernel "[${i}] ${a}": ${p.message}`:null));for(let p of this.temporaryData)this.gpuDataManager.release(p.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,r,n,o){let i=this.sessionExternalDataMapping.get(t);i||(i=new Map,this.sessionExternalDataMapping.set(t,i));let a=i.get(r),u=this.gpuDataManager.registerExternalBuffer(n,o,a);return i.set(r,[u,n]),u}unregisterBuffers(t){let r=this.sessionExternalDataMapping.get(t);r&&(r.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[0])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let r=this.gpuDataManager.get(t);if(!r)throw new Error(`no GPU data for buffer: ${t}`);return r.buffer}createDownloader(t,r,n){return async()=>{let o=await ro(this,t,r);return Mr(o.buffer,n)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){se("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){se("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){se("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),n=t.length;this.pendingKernels=[];for(let o=0;o<n;o++){let i=this.getComputePassEncoder(),a=t[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});var tc={};Dt(tc,{init:()=>mg});var tr,Ao,mg,rc=U(()=>{"use strict";ee();Xe();ne();Ka();tr=class e{constructor(t,r,n,o){this.module=t;this.dataType=r;this.data=n;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(k.size(t)!==k.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},Ao=class{constructor(t,r,n){this.module=t;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo;let o=t.PTR_SIZE,i=n/t.PTR_SIZE,a=o===4?"i32":"i64";this.opKernelContext=Number(t.getValue(o*i++,a));let u=Number(t.getValue(o*i++,a));this.outputCount=Number(t.getValue(o*i++,a)),this.customDataOffset=Number(t.getValue(o*i++,"*")),this.customDataSize=Number(t.getValue(o*i++,a));let d=[];for(let c=0;c<u;c++){let p=Number(t.getValue(o*i++,a)),m=Number(t.getValue(o*i++,"*")),f=Number(t.getValue(o*i++,a)),b=[];for(let g=0;g<f;g++)b.push(Number(t.getValue(o*i++,a)));d.push(new tr(t,p,m,b))}this.inputs=d}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(t,r){let n=r?.inputs?.map(u=>typeof u=="number"?this.inputs[u]:u)??this.inputs,o=r?.outputs??[],i=(u,d,c)=>new tr(this.module,d,this.output(u,c),c),a=(u,d)=>{let c=gt(u,d);if(!c)throw new Error(`Unsupported data type: ${u}`);let p=c>0?this.backend.gpuDataManager.create(c).id:0;return new tr(this.module,u,p,d)};return this.backend.run(t,n,o,i,a,this.outputCount)}output(t,r){let n=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",a=this.module.stackAlloc((1+r.length)*o);this.module.setValue(a,r.length,i);for(let u=0;u<r.length;u++)this.module.setValue(a+o*(u+1),r[u],i);return this.module._JsepOutput(this.opKernelContext,t,a)}catch(o){throw new Error(`Failed to generate kernel's output[${t}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(n)}}},mg=async(e,t,r,n)=>{let o=t.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let i=(ec(),Ft(Jl)).WebGpuBackend,a=new i;await a.initialize(r,n),o("webgpu",[a,u=>a.alloc(Number(u)),u=>a.free(u),(u,d,c,p=!1)=>{if(p)se("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(d)}, size=${Number(c)}`),a.memcpy(Number(u),Number(d));else{se("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(d)}, size=${Number(c)}`);let m=t.HEAPU8.subarray(Number(u>>>0),Number(u>>>0)+Number(c));a.upload(Number(d),m)}},async(u,d,c)=>{se("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${d}, size=${c}`),await a.download(Number(u),()=>t.HEAPU8.subarray(Number(d)>>>0,Number(d+c)>>>0))},(u,d,c)=>a.createKernel(u,Number(d),c,t.UTF8ToString(t._JsepGetNodeName(Number(d)))),u=>a.releaseKernel(u),(u,d,c,p)=>{se("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${c}, kernel=${u}, contextDataOffset=${d}`);let m=new Ao(t,a,Number(d));return a.computeKernel(Number(u),m,p)},()=>a.captureBegin(),()=>a.captureEnd(),()=>a.replay()])}else{let i=new Nr(r);o("webnn",[i,()=>i.reserveTensorId(),a=>i.releaseTensorId(a),async(a,u,d,c,p)=>i.ensureTensor(a,u,d,c,p),(a,u)=>{i.uploadTensor(a,u)},async(a,u)=>i.downloadTensor(a,u)])}}});var fg,vr,$r,At,hg,nc,jt,xr,Sr,oc,Tr,Ir,Cr,Vn=U(()=>{"use strict";Ma();Ua();ee();ht();Er();jn();fg=(e,t)=>{fe()._OrtInit(e,t)!==0&&pe("Can't initialize onnxruntime.")},vr=async e=>{fg(e.wasm.numThreads,Zt(e.logLevel))},$r=async(e,t)=>{fe().asyncInit?.();{let r=(rc(),Ft(tc)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let n=e.webgpu.adapter;if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=e.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=e.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",fe(),e,n)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",fe(),e)}}},At=new Map,hg=e=>{let t=fe(),r=t.stackSave();try{let n=t.PTR_SIZE,o=t.stackAlloc(2*n);t._OrtGetInputOutputCount(e,o,o+n)!==0&&pe("Can't get session input/output count.");let a=n===4?"i32":"i64";return[Number(t.getValue(o,a)),Number(t.getValue(o+n,a))]}finally{t.stackRestore(r)}},nc=(e,t)=>{let r=fe(),n=r.stackSave(),o=0;try{let i=r.PTR_SIZE,a=r.stackAlloc(2*i);r._OrtGetInputOutputMetadata(e,t,a,a+i)!==0&&pe("Can't get session input/output metadata.");let d=Number(r.getValue(a,"*"));o=Number(r.getValue(a+i,"*"));let c=r.HEAP32[o/4];if(c===0)return[d,0];let p=r.HEAPU32[o/4+1],m=[];for(let f=0;f<p;f++){let b=Number(r.getValue(o+8+f*i,"*"));m.push(b!==0?r.UTF8ToString(b):Number(r.getValue(o+8+(f+p)*i,"*")))}return[d,c,m]}finally{r.stackRestore(n),o!==0&&r._OrtFree(o)}},jt=e=>{let t=fe(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},xr=async(e,t)=>{let r,n,o=fe();Array.isArray(e)?[r,n]=e:e.buffer===o.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=jt(e);let i=0,a=0,u=0,d=[],c=[],p=[];try{if([a,d]=await Ra(t),t?.externalData&&o.mountExternalData){let T=[];for(let E of t.externalData){let I=typeof E=="string"?E:E.path;T.push(Qt(typeof E=="string"?E:E.data).then(z=>{o.mountExternalData(I,z)}))}await Promise.all(T)}for(let T of t?.executionProviders??[])if((typeof T=="string"?T:T.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof T!="string"){let I=T,z=I?.context,O=I?.gpuDevice,D=I?.deviceType,L=I?.powerPreference;z?o.currentContext=z:O?o.currentContext=await o.webnnCreateMLContext(O):o.currentContext=await o.webnnCreateMLContext({deviceType:D,powerPreference:L})}else o.currentContext=await o.webnnCreateMLContext();break}i=await o._OrtCreateSession(r,n,a),o.webgpuOnCreateSession?.(i),i===0&&pe("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.webnnRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[m,f]=hg(i),b=!!t?.enableGraphCapture,g=[],_=[],S=[],$=[],v=[];for(let T=0;T<m;T++){let[E,I,z]=nc(i,T);E===0&&pe("Can't get an input name."),c.push(E);let O=o.UTF8ToString(E);g.push(O),S.push(I===0?{name:O,isTensor:!1}:{name:O,isTensor:!0,type:Ye(I),shape:z})}for(let T=0;T<f;T++){let[E,I,z]=nc(i,T+m);E===0&&pe("Can't get an output name."),p.push(E);let O=o.UTF8ToString(E);_.push(O),$.push(I===0?{name:O,isTensor:!1}:{name:O,isTensor:!0,type:Ye(I),shape:z});{if(b&&t?.preferredOutputLocation===void 0){v.push("gpu-buffer");continue}let D=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[O]??"cpu";if(D!=="cpu"&&D!=="cpu-pinned"&&D!=="gpu-buffer"&&D!=="ml-tensor")throw new Error(`Not supported preferred output location: ${D}.`);if(b&&D!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${D}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);v.push(D)}}let x=null;return v.some(T=>T==="gpu-buffer"||T==="ml-tensor")&&(u=o._OrtCreateBinding(i),u===0&&pe("Can't create IO binding."),x={handle:u,outputPreferredLocations:v,outputPreferredLocationsEncoded:v.map(T=>qn(T))}),At.set(i,[i,c,p,x,b,!1]),[i,g,_,S,$]}catch(m){throw c.forEach(f=>o._OrtFree(f)),p.forEach(f=>o._OrtFree(f)),u!==0&&o._OrtReleaseBinding(u)!==0&&pe("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&pe("Can't release session."),m}finally{o._free(r),a!==0&&o._OrtReleaseSessionOptions(a)!==0&&pe("Can't release session options."),d.forEach(m=>o._free(m)),o.unmountExternalData?.()}},Sr=e=>{let t=fe(),r=At.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[n,o,i,a,u]=r;a&&(u&&t._OrtClearBoundOutputs(a.handle)!==0&&pe("Can't clear bound outputs."),t._OrtReleaseBinding(a.handle)!==0&&pe("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),o.forEach(d=>t._OrtFree(d)),i.forEach(d=>t._OrtFree(d)),t._OrtReleaseSession(n)!==0&&pe("Can't release session."),At.delete(e)},oc=async(e,t,r,n,o,i,a=!1)=>{if(!e){t.push(0);return}let u=fe(),d=u.PTR_SIZE,c=e[0],p=e[1],m=e[3],f=m,b,g;if(c==="string"&&(m==="gpu-buffer"||m==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(a&&m!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${i} when enableGraphCapture is true.`);if(m==="gpu-buffer"){let $=e[2].gpuBuffer;g=gt(Mt(c),p);{let v=u.jsepRegisterBuffer;if(!v)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');b=v(n,i,$,g)}}else if(m==="ml-tensor"){let $=e[2].mlTensor;g=gt(Mt(c),p);let v=u.webnnRegisterMLTensor;if(!v)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');b=v(n,$,Mt(c),p)}else{let $=e[2];if(Array.isArray($)){g=d*$.length,b=u._malloc(g),r.push(b);for(let v=0;v<$.length;v++){if(typeof $[v]!="string")throw new TypeError(`tensor data at index ${v} is not a string`);u.setValue(b+v*d,Ne($[v],r),"*")}}else{let v=u.webnnIsGraphInput;if(c!=="string"&&v){let x=u.UTF8ToString(o);if(v(n,x)){let T=Mt(c);g=gt(T,p),f="ml-tensor";let E=u.webnnCreateTemporaryTensor,I=u.webnnUploadTensor;if(!E||!I)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let z=await E(n,T,p);I(z,new Uint8Array($.buffer,$.byteOffset,$.byteLength)),b=z}else g=$.byteLength,b=u._malloc(g),r.push(b),u.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,g),b)}else g=$.byteLength,b=u._malloc(g),r.push(b),u.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,g),b)}}let _=u.stackSave(),S=u.stackAlloc(4*p.length);try{p.forEach((v,x)=>u.setValue(S+x*d,v,d===4?"i32":"i64"));let $=u._OrtCreateTensor(Mt(c),b,g,S,p.length,qn(f));$===0&&pe(`Can't create tensor for input/output. session=${n}, index=${i}.`),t.push($)}finally{u.stackRestore(_)}},Tr=async(e,t,r,n,o,i)=>{let a=fe(),u=a.PTR_SIZE,d=At.get(e);if(!d)throw new Error(`cannot run inference. invalid session id: ${e}`);let c=d[0],p=d[1],m=d[2],f=d[3],b=d[4],g=d[5],_=t.length,S=n.length,$=0,v=[],x=[],T=[],E=[],I=a.stackSave(),z=a.stackAlloc(_*u),O=a.stackAlloc(_*u),D=a.stackAlloc(S*u),L=a.stackAlloc(S*u);try{[$,v]=Da(i);for(let W=0;W<_;W++)await oc(r[W],x,E,e,p[t[W]],t[W],b);for(let W=0;W<S;W++)await oc(o[W],T,E,e,m[n[W]],_+n[W],b);for(let W=0;W<_;W++)a.setValue(z+W*u,x[W],"*"),a.setValue(O+W*u,p[t[W]],"*");for(let W=0;W<S;W++)a.setValue(D+W*u,T[W],"*"),a.setValue(L+W*u,m[n[W]],"*");if(f&&!g){let{handle:W,outputPreferredLocations:Z,outputPreferredLocationsEncoded:we}=f;if(p.length!==_)throw new Error(`input count from feeds (${_}) is expected to be always equal to model's input count (${p.length}).`);for(let H=0;H<_;H++){let j=t[H];await a._OrtBindInput(W,p[j],x[H])!==0&&pe(`Can't bind input[${H}] for session=${e}.`)}for(let H=0;H<S;H++){let j=n[H];o[H]?.[3]?a._OrtBindOutput(W,m[j],T[H],0)!==0&&pe(`Can't bind pre-allocated output[${H}] for session=${e}.`):a._OrtBindOutput(W,m[j],0,we[j])!==0&&pe(`Can't bind output[${H}] to ${Z[H]} for session=${e}.`)}At.set(e,[c,p,m,f,b,!0])}a.jsepOnRunStart?.(c),a.webnnOnRunStart?.(c);let q;f?q=await a._OrtRunWithBinding(c,f.handle,S,D,$):q=await a._OrtRun(c,O,z,_,L,S,D,$),q!==0&&pe("failed to call OrtRun().");let Q=[];for(let W=0;W<S;W++){let Z=Number(a.getValue(D+W*u,"*"));if(Z===T[W]){Q.push(o[W]);continue}let we=a.stackSave(),H=a.stackAlloc(4*u),j=!1,te,X=0;try{a._OrtGetTensorData(Z,H,H+u,H+2*u,H+3*u)!==0&&pe(`Can't access output tensor data on index ${W}.`);let he=u===4?"i32":"i64",ye=Number(a.getValue(H,he));X=a.getValue(H+u,"*");let re=a.getValue(H+u*2,"*"),C=Number(a.getValue(H+u*3,he)),V=[];for(let ve=0;ve<C;ve++)V.push(Number(a.getValue(re+ve*u,he)));a._OrtFree(re)!==0&&pe("Can't free memory for tensor dims.");let de=V.reduce((ve,$e)=>ve*$e,1);te=Ye(ye);let ze=f?.outputPreferredLocations[n[W]];if(te==="string"){if(ze==="gpu-buffer"||ze==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let ve=[];for(let $e=0;$e<de;$e++){let Ce=a.getValue(X+$e*u,"*"),_t=a.getValue(X+($e+1)*u,"*"),kt=$e===de-1?void 0:_t-Ce;ve.push(a.UTF8ToString(Ce,kt))}Q.push([te,V,ve,"cpu"])}else if(ze==="gpu-buffer"&&de>0){let ve=a.jsepGetBuffer;if(!ve)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let $e=ve(X),Ce=gt(ye,de);if(Ce===void 0||!zr(te))throw new Error(`Unsupported data type: ${te}`);j=!0,Q.push([te,V,{gpuBuffer:$e,download:a.jsepCreateDownloader($e,Ce,te),dispose:()=>{a._OrtReleaseTensor(Z)!==0&&pe("Can't release tensor.")}},"gpu-buffer"])}else if(ze==="ml-tensor"&&de>0){let ve=a.webnnEnsureTensor,$e=a.webnnIsInt64Supported;if(!ve||!$e)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(gt(ye,de)===void 0||!Or(te))throw new Error(`Unsupported data type: ${te}`);if(te==="int64"&&!$e(e))throw new Error('preferredLocation "ml-tensor" for int64 output is not supported by current WebNN Context.');let _t=await ve(e,X,ye,V,!1);j=!0,Q.push([te,V,{mlTensor:_t,download:a.webnnCreateMLTensorDownloader(X,te),dispose:()=>{a.webnnReleaseTensorId(X),a._OrtReleaseTensor(Z)}},"ml-tensor"])}else{let ve=Pr(te),$e=new ve(de);new Uint8Array($e.buffer,$e.byteOffset,$e.byteLength).set(a.HEAPU8.subarray(X,X+$e.byteLength)),Q.push([te,V,$e,"cpu"])}}finally{a.stackRestore(we),te==="string"&&X&&a._free(X),j||a._OrtReleaseTensor(Z),a.webnnOnRunEnd?.(c)}}return f&&!b&&(a._OrtClearBoundOutputs(f.handle)!==0&&pe("Can't clear bound outputs."),At.set(e,[c,p,m,f,b,!1])),Q}finally{a.stackRestore(I),x.forEach(q=>a._OrtReleaseTensor(q)),T.forEach(q=>a._OrtReleaseTensor(q)),E.forEach(q=>a._free(q)),$!==0&&a._OrtReleaseRunOptions($),v.forEach(q=>a._free(q))}},Ir=e=>{let t=fe(),r=At.get(e);if(!r)throw new Error("invalid session id");let n=r[0],o=t._OrtEndProfiling(n);o===0&&pe("Can't get an profile file name."),t._OrtFree(o)},Cr=e=>{let t=[];for(let r of e){let n=r[2];!Array.isArray(n)&&"buffer"in n&&t.push(n.buffer)}return t}});var Et,Le,rr,sn,un,an,Eo,ko,Vt,Wt,bg,ic,ac,sc,uc,dc,lc,cc,Po=U(()=>{"use strict";We();Vn();ht();_r();Et=()=>!!ge.wasm.proxy&&typeof document<"u",rr=!1,sn=!1,un=!1,ko=new Map,Vt=(e,t)=>{let r=ko.get(e);r?r.push(t):ko.set(e,[t])},Wt=()=>{if(rr||!sn||un||!Le)throw new Error("worker not ready")},bg=e=>{switch(e.data.type){case"init-wasm":rr=!1,e.data.err?(un=!0,Eo[1](e.data.err)):(sn=!0,Eo[0]()),an&&(URL.revokeObjectURL(an),an=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=ko.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},ic=async()=>{if(!sn){if(rr)throw new Error("multiple calls to 'initWasm()' detected.");if(un)throw new Error("previous call to 'initWasm()' failed.");if(rr=!0,Et())return new Promise((e,t)=>{Le?.terminate(),za().then(([r,n])=>{try{Le=n,Le.onerror=i=>t(i),Le.onmessage=bg,Eo=[e,t];let o={type:"init-wasm",in:ge};!o.in.wasm.wasmPaths&&(r||Gn)&&(o.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),Le.postMessage(o),an=r}catch(o){t(o)}},t)});try{await wr(ge.wasm),await vr(ge),sn=!0}catch(e){throw un=!0,e}finally{rr=!1}}},ac=async e=>{if(Et())return Wt(),new Promise((t,r)=>{Vt("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:ge}};Le.postMessage(n)});await $r(ge,e)},sc=async e=>Et()?(Wt(),new Promise((t,r)=>{Vt("copy-from",[t,r]);let n={type:"copy-from",in:{buffer:e}};Le.postMessage(n,[e.buffer])})):jt(e),uc=async(e,t)=>{if(Et()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Wt(),new Promise((r,n)=>{Vt("create",[r,n]);let o={type:"create",in:{model:e,options:{...t}}},i=[];e instanceof Uint8Array&&i.push(e.buffer),Le.postMessage(o,i)})}else return xr(e,t)},dc=async e=>{if(Et())return Wt(),new Promise((t,r)=>{Vt("release",[t,r]);let n={type:"release",in:e};Le.postMessage(n)});Sr(e)},lc=async(e,t,r,n,o,i)=>{if(Et()){if(r.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return Wt(),new Promise((a,u)=>{Vt("run",[a,u]);let d=r,c={type:"run",in:{sessionId:e,inputIndices:t,inputs:d,outputIndices:n,options:i}};Le.postMessage(c,Cr(d))})}else return Tr(e,t,r,n,o,i)},cc=async e=>{if(Et())return Wt(),new Promise((t,r)=>{Vt("end-profiling",[t,r]);let n={type:"end-profiling",in:e};Le.postMessage(n)});Ir(e)}});var pc,yg,dn,mc=U(()=>{"use strict";We();Po();ee();yr();jn();pc=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},yg=e=>{switch(e[3]){case"cpu":return new Ge(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!zr(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:o}=e[2];return Ge.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:o})}case"ml-tensor":{let t=e[0];if(!Or(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:n,dispose:o}=e[2];return Ge.fromMLTensor(r,{dataType:t,dims:e[1],download:n,dispose:o})}default:throw new Error(`invalid data location: ${e[3]}`)}},dn=class{async fetchModelAndCopyToWasmMemory(t){return sc(await Qt(t))}async loadModel(t,r){Re();let n;typeof t=="string"?n=await this.fetchModelAndCopyToWasmMemory(t):n=t,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await uc(n,r),Oe()}async dispose(){return dc(this.sessionId)}async run(t,r,n){Re();let o=[],i=[];Object.entries(t).forEach(f=>{let b=f[0],g=f[1],_=this.inputNames.indexOf(b);if(_===-1)throw new Error(`invalid input '${b}'`);o.push(g),i.push(_)});let a=[],u=[];Object.entries(r).forEach(f=>{let b=f[0],g=f[1],_=this.outputNames.indexOf(b);if(_===-1)throw new Error(`invalid output '${b}'`);a.push(g),u.push(_)});let d=o.map((f,b)=>pc(f,()=>`input "${this.inputNames[i[b]]}"`)),c=a.map((f,b)=>f?pc(f,()=>`output "${this.outputNames[u[b]]}"`):null),p=await lc(this.sessionId,i,d,u,c,n),m={};for(let f=0;f<p.length;f++)m[this.outputNames[u[f]]]=a[f]??yg(p[f]);return Oe(),m}startProfiling(){}endProfiling(){cc(this.sessionId)}}});var hc={};Dt(hc,{OnnxruntimeWebAssemblyBackend:()=>ln,initializeFlags:()=>fc,wasmBackend:()=>_g});var fc,ln,_g,gc=U(()=>{"use strict";We();Po();mc();fc=()=>{(typeof ge.wasm.initTimeout!="number"||ge.wasm.initTimeout<0)&&(ge.wasm.initTimeout=0);let e=ge.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),ge.wasm.simd=!1),typeof ge.wasm.proxy!="boolean"&&(ge.wasm.proxy=!1),typeof ge.wasm.trace!="boolean"&&(ge.wasm.trace=!1),typeof ge.wasm.numThreads!="number"||!Number.isInteger(ge.wasm.numThreads)||ge.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ge.wasm.numThreads=1;else{let t=typeof navigator>"u"?On("node:os").cpus().length:navigator.hardwareConcurrency;ge.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},ln=class{async init(t){fc(),await ic(),await ac(t)}async createInferenceSessionHandler(t,r){let n=new dn;return await n.loadModel(t,r),n}},_g=new ln});We();We();We();var _a="1.22.0-dev.20250409-89f8206ba4";var IS=Nn;{let e=(gc(),Ft(hc)).wasmBackend;$t("webgpu",e,5),$t("webnn",e,5),$t("cpu",e,10),$t("wasm",e,10)}Object.defineProperty(ge.versions,"web",{value:_a,enumerable:!0});export{Gp as InferenceSession,gr as TRACE,Re as TRACE_FUNC_BEGIN,Oe as TRACE_FUNC_END,Ge as Tensor,IS as default,ge as env,$t as registerBackend};
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
