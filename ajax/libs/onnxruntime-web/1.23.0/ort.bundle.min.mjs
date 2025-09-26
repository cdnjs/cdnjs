/*!
 * ONNX Runtime Web v1.23.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var Ln=Object.defineProperty;var Gp=Object.getOwnPropertyDescriptor;var Hp=Object.getOwnPropertyNames;var Fp=Object.prototype.hasOwnProperty;var Wn=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var L=(e,t)=>()=>(e&&(t=e(e=0)),t);var Wt=(e,t)=>{for(var n in t)Ln(e,n,{get:t[n],enumerable:!0})},qp=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Hp(t))!Fp.call(e,o)&&o!==n&&Ln(e,o,{get:()=>t[o],enumerable:!(r=Gp(t,o))||r.enumerable});return e};var Xt=e=>qp(Ln({},"__esModule",{value:!0}),e);var wr,kt,Pt,jp,Qi,Gn=L(()=>{"use strict";wr=new Map,kt=[],Pt=(e,t,n)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let r=wr.get(e);if(r===void 0)wr.set(e,{backend:t,priority:n});else{if(r.priority>n)return;if(r.priority===n&&r.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${n}`)}if(n>=0){let o=kt.indexOf(e);o!==-1&&kt.splice(o,1);for(let a=0;a<kt.length;a++)if(wr.get(kt[a]).priority<=n){kt.splice(a,0,e);return}kt.push(e)}return}throw new TypeError("not a valid backend")},jp=async e=>{let t=wr.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let n=!!t.initPromise;try{return n||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(r){return n||(t.error=`${r}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Qi=async e=>{let t=e.executionProviders||[],n=t.map(d=>typeof d=="string"?d:d.name),r=n.length===0?kt:n,o,a=[],s=new Set;for(let d of r){let c=await jp(d);typeof c=="string"?a.push({name:d,err:c}):(o||(o=c),o===c&&s.add(d))}if(!o)throw new Error(`no available backend found. ERR: ${a.map(d=>`[${d.name}] ${d.err}`).join(", ")}`);for(let{name:d,err:c}of a)n.includes(d)&&console.warn(`removing requested execution provider "${d}" from session options because it is not available: ${c}`);let u=t.filter(d=>s.has(typeof d=="string"?d:d.name));return[o,new Proxy(e,{get:(d,c)=>c==="executionProviders"?u:Reflect.get(d,c)})]}});var Yi=L(()=>{"use strict";Gn()});var Xi,Ji=L(()=>{"use strict";Xi="1.23.0"});var ea,Ee,Hn=L(()=>{"use strict";Ji();ea="warning",Ee={wasm:{},webgl:{},webgpu:{},versions:{common:Xi},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);ea=e}},get logLevel(){return ea}};Object.defineProperty(Ee,"logLevel",{enumerable:!0})});var we,ta=L(()=>{"use strict";Hn();we=Ee});var ra,na,oa=L(()=>{"use strict";ra=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=e.dims[3],n.height=e.dims[2];let r=n.getContext("2d");if(r!=null){let o,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],a=e.dims[3]):(o=e.dims[3],a=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",u=t?.norm,d,c;u===void 0||u.mean===void 0?d=[255,255,255,255]:typeof u.mean=="number"?d=[u.mean,u.mean,u.mean,u.mean]:(d=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(d[3]=u.mean[3])),u===void 0||u.bias===void 0?c=[0,0,0,0]:typeof u.bias=="number"?c=[u.bias,u.bias,u.bias,u.bias]:(c=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(c[3]=u.bias[3]));let m=a*o,f=0,g=m,_=m*2,b=-1;s==="RGBA"?(f=0,g=m,_=m*2,b=m*3):s==="RGB"?(f=0,g=m,_=m*2):s==="RBG"&&(f=0,_=m,g=m*2);for(let w=0;w<a;w++)for(let x=0;x<o;x++){let v=(e.data[f++]-c[0])*d[0],$=(e.data[g++]-c[1])*d[1],T=(e.data[_++]-c[2])*d[2],C=b===-1?255:(e.data[b++]-c[3])*d[3];r.fillStyle="rgba("+v+","+$+","+T+","+C+")",r.fillRect(x,w,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},na=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),r;if(n!=null){let o,a,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],a=e.dims[1],s=e.dims[3]):(o=e.dims[3],a=e.dims[2],s=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",d=t?.norm,c,m;d===void 0||d.mean===void 0?c=[255,255,255,255]:typeof d.mean=="number"?c=[d.mean,d.mean,d.mean,d.mean]:(c=[d.mean[0],d.mean[1],d.mean[2],255],d.mean[3]!==void 0&&(c[3]=d.mean[3])),d===void 0||d.bias===void 0?m=[0,0,0,0]:typeof d.bias=="number"?m=[d.bias,d.bias,d.bias,d.bias]:(m=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(m[3]=d.bias[3]));let f=a*o;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let g=4,_=0,b=1,w=2,x=3,v=0,$=f,T=f*2,C=-1;u==="RGBA"?(v=0,$=f,T=f*2,C=f*3):u==="RGB"?(v=0,$=f,T=f*2):u==="RBG"&&(v=0,T=f,$=f*2),r=n.createImageData(o,a);for(let A=0;A<a*o;_+=g,b+=g,w+=g,x+=g,A++)r.data[_]=(e.data[v++]-m[0])*c[0],r.data[b]=(e.data[$++]-m[1])*c[1],r.data[w]=(e.data[T++]-m[2])*c[2],r.data[x]=C===-1?255:(e.data[C++]-m[3])*c[3]}else throw new Error("Can not access image data");return r}});var Fn,ia,aa,sa,ua,la,da=L(()=>{"use strict";vr();Fn=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:r}=t,o=t.norm??{mean:255,bias:0},a,s;typeof o.mean=="number"?a=[o.mean,o.mean,o.mean,o.mean]:a=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?s=[o.bias,o.bias,o.bias,o.bias]:s=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",d=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",c=n*r,m=d==="RGBA"?new Float32Array(c*4):new Float32Array(c*3),f=4,g=0,_=1,b=2,w=3,x=0,v=c,$=c*2,T=-1;u==="RGB"&&(f=3,g=0,_=1,b=2,w=-1),d==="RGBA"?T=c*3:d==="RBG"?(x=0,$=c,v=c*2):d==="BGR"&&($=0,v=c,x=c*2);for(let A=0;A<c;A++,g+=f,b+=f,_+=f,w+=f)m[x++]=(e[g]+s[0])/a[0],m[v++]=(e[_]+s[1])/a[1],m[$++]=(e[b]+s[2])/a[2],T!==-1&&w!==-1&&(m[T++]=(e[w]+s[3])/a[3]);return d==="RGBA"?new De("float32",m,[1,4,n,r]):new De("float32",m,[1,3,n,r])},ia=async(e,t)=>{let n=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,r=typeof ImageData<"u"&&e instanceof ImageData,o=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,a=typeof e=="string",s,u=t??{},d=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},c=m=>typeof HTMLCanvasElement<"u"&&m instanceof HTMLCanvasElement||m instanceof OffscreenCanvas?m.getContext("2d"):null;if(n){let m=d();m.width=e.width,m.height=e.height;let f=c(m);if(f!=null){let g=e.height,_=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(g=t.resizedHeight,_=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=g,u.width=_}else u.tensorFormat="RGBA",u.height=g,u.width=_;f.drawImage(e,0,0),s=f.getImageData(0,0,_,g).data}else throw new Error("Can not access image data")}else if(r){let m,f;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(m=t.resizedHeight,f=t.resizedWidth):(m=e.height,f=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=m,u.width=f,t!==void 0){let g=d();g.width=f,g.height=m;let _=c(g);if(_!=null)_.putImageData(e,0,0),s=_.getImageData(0,0,f,m).data;else throw new Error("Can not access image data")}else s=e.data}else if(o){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let m=d();m.width=e.width,m.height=e.height;let f=c(m);if(f!=null){let g=e.height,_=e.width;return f.drawImage(e,0,0,_,g),s=f.getImageData(0,0,_,g).data,u.height=g,u.width=_,Fn(s,u)}else throw new Error("Can not access image data")}else{if(a)return new Promise((m,f)=>{let g=d(),_=c(g);if(!e||!_)return f();let b=new Image;b.crossOrigin="Anonymous",b.src=e,b.onload=()=>{g.width=b.width,g.height=b.height,_.drawImage(b,0,0,g.width,g.height);let w=_.getImageData(0,0,g.width,g.height);u.height=g.height,u.width=g.width,m(Fn(w.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Fn(s,u);throw new Error("Input data provided is not supported - aborted tensor creation")},aa=(e,t)=>{let{width:n,height:r,download:o,dispose:a}=t,s=[1,r,n,4];return new De({location:"texture",type:"float32",texture:e,dims:s,download:o,dispose:a})},sa=(e,t)=>{let{dataType:n,dims:r,download:o,dispose:a}=t;return new De({location:"gpu-buffer",type:n??"float32",gpuBuffer:e,dims:r,download:o,dispose:a})},ua=(e,t)=>{let{dataType:n,dims:r,download:o,dispose:a}=t;return new De({location:"ml-tensor",type:n??"float32",mlTensor:e,dims:r,download:o,dispose:a})},la=(e,t,n)=>new De({location:"cpu-pinned",type:e,data:t,dims:n??[t.length]})});var Ot,Jt,ca,pa,ma=L(()=>{"use strict";Ot=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Jt=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),ca=!1,pa=()=>{if(!ca){ca=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,n=globalThis.Float16Array,r=typeof n<"u"&&n.from;e&&(Ot.set("int64",BigInt64Array),Jt.set(BigInt64Array,"int64")),t&&(Ot.set("uint64",BigUint64Array),Jt.set(BigUint64Array,"uint64")),r?(Ot.set("float16",n),Jt.set(n,"float16")):Ot.set("float16",Uint16Array)}}});var fa,ha,ga=L(()=>{"use strict";vr();fa=e=>{let t=1;for(let n=0;n<e.length;n++){let r=e[n];if(typeof r!="number"||!Number.isSafeInteger(r))throw new TypeError(`dims[${n}] must be an integer, got: ${r}`);if(r<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${r}`);t*=r}return t},ha=(e,t)=>{switch(e.location){case"cpu":return new De(e.type,e.data,t);case"cpu-pinned":return new De({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new De({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new De({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new De({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var De,vr=L(()=>{"use strict";oa();da();ma();ga();De=class{constructor(t,n,r){pa();let o,a;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,o=t.type,a=t.dims,t.location){case"cpu-pinned":{let u=Ot.get(o);if(!u)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(t.data instanceof u))throw new TypeError(`buffer should be of type ${u.name}`);this.cpuData=t.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let u,d;if(typeof t=="string")if(o=t,d=r,t==="string"){if(!Array.isArray(n))throw new TypeError("A string tensor's data must be a string array.");u=n}else{let c=Ot.get(t);if(c===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(n)){if(t==="float16"&&c===Uint16Array||t==="uint4"||t==="int4")throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${c.name} as data.`);t==="uint64"||t==="int64"?u=c.from(n,BigInt):u=c.from(n)}else if(n instanceof c)u=n;else if(n instanceof Uint8ClampedArray)if(t==="uint8")u=Uint8Array.from(n);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(t==="float16"&&n instanceof Uint16Array&&c!==Uint16Array)u=new globalThis.Float16Array(n.buffer,n.byteOffset,n.length);else throw new TypeError(`A ${o} tensor's data must be type of ${c}`)}else if(d=n,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let c=typeof t[0];if(c==="string")o="string",u=t;else if(c==="boolean")o="bool",u=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${c}.`)}else if(t instanceof Uint8ClampedArray)o="uint8",u=Uint8Array.from(t);else{let c=Jt.get(t.constructor);if(c===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);o=c,u=t}if(d===void 0)d=[u.length];else if(!Array.isArray(d))throw new TypeError("A tensor's dims must be a number array");a=d,this.cpuData=u,this.dataLocation="cpu"}let s=fa(a);if(this.cpuData&&s!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=a,this.size=s}static async fromImage(t,n){return ia(t,n)}static fromTexture(t,n){return aa(t,n)}static fromGpuBuffer(t,n){return sa(t,n)}static fromMLTensor(t,n){return ua(t,n)}static fromPinnedBuffer(t,n,r){return la(t,n,r)}toDataURL(t){return ra(this,t)}toImageData(t){return na(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let n=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=n,t&&this.disposer&&(this.disposer(),this.disposer=void 0),n}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return ha(this,t)}}});var qe,qn=L(()=>{"use strict";vr();qe=De});var $r,ya,Ne,Me,wt,vt,jn=L(()=>{"use strict";Hn();$r=(e,t)=>{(typeof Ee.trace>"u"?!Ee.wasm.trace:!Ee.trace)||console.timeStamp(`${e}::ORT::${t}`)},ya=(e,t)=>{let n=new Error().stack?.split(/\r\n|\r|\n/g)||[],r=!1;for(let o=0;o<n.length;o++){if(r&&!n[o].includes("TRACE_FUNC")){let a=`FUNC_${e}::${n[o].trim().split(" ")[1]}`;t&&(a+=`::${t}`),$r("CPU",a);return}n[o].includes("TRACE_FUNC")&&(r=!0)}},Ne=e=>{(typeof Ee.trace>"u"?!Ee.wasm.trace:!Ee.trace)||ya("BEGIN",e)},Me=e=>{(typeof Ee.trace>"u"?!Ee.wasm.trace:!Ee.trace)||ya("END",e)},wt=e=>{(typeof Ee.trace>"u"?!Ee.wasm.trace:!Ee.trace)||console.time(`ORT::${e}`)},vt=e=>{(typeof Ee.trace>"u"?!Ee.wasm.trace:!Ee.trace)||console.timeEnd(`ORT::${e}`)}});var xr,ba=L(()=>{"use strict";Gn();qn();jn();xr=class e{constructor(t){this.handler=t}async run(t,n,r){Ne(),wt("InferenceSession.run");let o={},a={};if(typeof t!="object"||t===null||t instanceof qe||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof qe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let c of n){if(typeof c!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(c)===-1)throw new RangeError(`'fetches' contains invalid output name: ${c}.`);o[c]=null}if(typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else{let c=!1,m=Object.getOwnPropertyNames(n);for(let f of this.outputNames)if(m.indexOf(f)!==-1){let g=n[f];(g===null||g instanceof qe)&&(c=!0,s=!1,o[f]=g)}if(c){if(typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else a=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let c of this.inputNames)if(typeof t[c]>"u")throw new Error(`input '${c}' is missing in 'feeds'.`);if(s)for(let c of this.outputNames)o[c]=null;let u=await this.handler.run(t,o,a),d={};for(let c in u)if(Object.hasOwnProperty.call(u,c)){let m=u[c];m instanceof qe?d[c]=m:d[c]=new qe(m.type,m.data,m.dims)}return vt("InferenceSession.run"),Me(),d}async release(){return this.handler.dispose()}static async create(t,n,r,o){Ne(),wt("InferenceSession.create");let a,s={};if(typeof t=="string"){if(a=t,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let m=t,f=0,g=t.byteLength;if(typeof n=="object"&&n!==null)s=n;else if(typeof n=="number"){if(f=n,!Number.isSafeInteger(f))throw new RangeError("'byteOffset' must be an integer.");if(f<0||f>=m.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${m.byteLength}).`);if(g=t.byteLength-f,typeof r=="number"){if(g=r,!Number.isSafeInteger(g))throw new RangeError("'byteLength' must be an integer.");if(g<=0||f+g>m.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${m.byteLength-f}].`);if(typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof r<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");a=new Uint8Array(m,f,g)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,d]=await Qi(s),c=await u.createInferenceSessionHandler(a,d);return vt("InferenceSession.create"),Me(),new e(c)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}});var Kp,_a=L(()=>{"use strict";ba();Kp=xr});var wa=L(()=>{"use strict"});var va=L(()=>{"use strict"});var $a=L(()=>{"use strict"});var xa=L(()=>{"use strict"});var Kn={};Wt(Kn,{InferenceSession:()=>Kp,TRACE:()=>$r,TRACE_EVENT_BEGIN:()=>wt,TRACE_EVENT_END:()=>vt,TRACE_FUNC_BEGIN:()=>Ne,TRACE_FUNC_END:()=>Me,Tensor:()=>qe,env:()=>we,registerBackend:()=>Pt});var Ve=L(()=>{"use strict";Yi();ta();_a();qn();wa();va();jn();$a();xa()});var Sr=L(()=>{"use strict"});var Ia={};Wt(Ia,{default:()=>Zp});var Ta,Ca,Zp,Aa=L(()=>{"use strict";Zn();$t();Tr();Ta="ort-wasm-proxy-worker",Ca=globalThis.self?.name===Ta;Ca&&(self.onmessage=e=>{let{type:t,in:n}=e.data;try{switch(t){case"init-wasm":Cr(n.wasm).then(()=>{Ir(n).then(()=>{postMessage({type:t})},r=>{postMessage({type:t,err:r})})},r=>{postMessage({type:t,err:r})});break;case"init-ep":{let{epName:r,env:o}=n;Ar(o,r).then(()=>{postMessage({type:t})},a=>{postMessage({type:t,err:a})});break}case"copy-from":{let{buffer:r}=n,o=er(r);postMessage({type:t,out:o});break}case"create":{let{model:r,options:o}=n;Er(r,o).then(a=>{postMessage({type:t,out:a})},a=>{postMessage({type:t,err:a})});break}case"release":kr(n),postMessage({type:t});break;case"run":{let{sessionId:r,inputIndices:o,inputs:a,outputIndices:s,options:u}=n;Pr(r,o,a,s,new Array(s.length).fill(null),u).then(d=>{d.some(c=>c[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:d},zr([...a,...d]))},d=>{postMessage({type:t,err:d})});break}case"end-profiling":Or(n),postMessage({type:t});break;default:}}catch(r){postMessage({type:t,err:r})}});Zp=Ca?null:e=>new Worker(e??Le,{type:"module",name:Ta})});var ka={};Wt(ka,{default:()=>Qp});var Ea,Qp,Yp,Pa=L(()=>{"use strict";Ea=async function(e={}){var t,n,r=e,o=new Promise((i,l)=>{t=i,n=l}),a=typeof window=="object",s=typeof WorkerGlobalScope<"u",u=s&&self.name?.startsWith("em-pthread");r.mountExternalData=(i,l)=>{i.startsWith("./")&&(i=i.substring(2)),(r.Fb||(r.Fb=new Map)).set(i,l)},r.unmountExternalData=()=>{delete r.Fb};var d=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,qc:!0}).buffer.constructor;let c=i=>async(...l)=>{try{if(r.Gb)throw Error("Session already started");let p=r.Gb={ec:l[0],errors:[]},h=await i(...l);if(r.Gb!==p)throw Error("Session mismatch");r.Kb?.flush();let y=p.errors;if(0<y.length){let S=await Promise.all(y);if(S=S.filter(k=>k),0<S.length)throw Error(S.join(`
`))}return h}finally{r.Gb=null}};r.jsepInit=(i,l)=>{if(i==="webgpu"){[r.Kb,r.Vb,r.Zb,r.Lb,r.Yb,r.Ab,r.$b,r.bc,r.Wb,r.Xb,r.ac]=l;let p=r.Kb;r.jsepRegisterBuffer=(h,y,S,k)=>p.registerBuffer(h,y,S,k),r.jsepGetBuffer=h=>p.getBuffer(h),r.jsepCreateDownloader=(h,y,S)=>p.createDownloader(h,y,S),r.jsepOnCreateSession=h=>{p.onCreateSession(h)},r.jsepOnReleaseSession=h=>{p.onReleaseSession(h)},r.jsepOnRunStart=h=>p.onRunStart(h),r.cc=(h,y)=>{p.upload(h,y)}}else if(i==="webnn"){let p=l[0];[r.oc,r.Ob,r.webnnEnsureTensor,r.Pb,r.webnnDownloadTensor,r.nc,r.webnnEnableTraceEvent]=l.slice(1),r.webnnReleaseTensorId=r.Ob,r.webnnUploadTensor=r.Pb,r.webnnRegisterMLContext=r.nc,r.webnnOnRunStart=h=>p.onRunStart(h),r.webnnOnRunEnd=p.onRunEnd.bind(p),r.webnnOnReleaseSession=h=>{p.onReleaseSession(h)},r.webnnCreateMLTensorDownloader=(h,y)=>p.createMLTensorDownloader(h,y),r.webnnRegisterMLTensor=(h,y,S,k)=>p.registerMLTensor(h,y,S,k),r.webnnCreateMLContext=h=>p.createMLContext(h),r.webnnRegisterMLConstant=(h,y,S,k,B,U)=>p.registerMLConstant(h,y,S,k,B,r.Fb,U),r.webnnRegisterGraphInput=p.registerGraphInput.bind(p),r.webnnIsGraphInput=p.isGraphInput.bind(p),r.webnnRegisterGraphOutput=p.registerGraphOutput.bind(p),r.webnnIsGraphOutput=p.isGraphOutput.bind(p),r.webnnCreateTemporaryTensor=p.createTemporaryTensor.bind(p),r.webnnIsGraphInputOutputTypeSupported=p.isGraphInputOutputTypeSupported.bind(p)}};let m=()=>{let i=(l,p,h)=>(...y)=>{let S=Xe,k=p?.();y=l(...y);let B=p?.();return k!==B&&(l=B,h(k),p=h=null),Xe!=S?new Promise((U,G)=>{kn={resolve:U,reject:G}}):y};(()=>{for(let l of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])r[l]=i(r[l],()=>r[l],p=>r[l]=p)})(),c!==void 0&&(r._OrtRun=c(r._OrtRun),r._OrtRunWithBinding=c(r._OrtRunWithBinding)),m=void 0};r.asyncInit=()=>{m?.()};var f,g,_=(i,l)=>{throw l},b=import.meta.url,w="";if(a||s){try{w=new URL(".",b).href}catch{}s&&(g=i=>{var l=new XMLHttpRequest;return l.open("GET",i,!1),l.responseType="arraybuffer",l.send(null),new Uint8Array(l.response)}),f=async i=>{if(ce(i))return new Promise((p,h)=>{var y=new XMLHttpRequest;y.open("GET",i,!0),y.responseType="arraybuffer",y.onload=()=>{y.status==200||y.status==0&&y.response?p(y.response):h(y.status)},y.onerror=h,y.send(null)});var l=await fetch(i,{credentials:"same-origin"});if(l.ok)return l.arrayBuffer();throw Error(l.status+" : "+l.url)}}var x,v,$,T,C,A,I,z,D,R,H,q,Y,ne,F,me=console.log.bind(console),oe=console.error.bind(console),j=me,ie=oe,Z=!1,ce=i=>i.startsWith("file://");function Te(){return v.buffer!=C.buffer&&fe(),C}function pe(){return v.buffer!=C.buffer&&fe(),A}function J(){return v.buffer!=C.buffer&&fe(),I}function V(){return v.buffer!=C.buffer&&fe(),z}function O(){return v.buffer!=C.buffer&&fe(),D}function X(){return v.buffer!=C.buffer&&fe(),R}function ze(){return v.buffer!=C.buffer&&fe(),H}function Oe(){return v.buffer!=C.buffer&&fe(),ne}if(u){let i=function(l){try{var p=l.data,h=p.Db;if(h==="load"){let y=[];self.onmessage=S=>y.push(S),self.startWorker=()=>{postMessage({Db:"loaded"});for(let S of y)i(S);self.onmessage=i};for(let S of p.Sb)r[S]&&!r[S].proxy||(r[S]=(...k)=>{postMessage({Db:"callHandler",Rb:S,args:k})},S=="print"&&(j=r[S]),S=="printErr"&&(ie=r[S]));v=p.kc,fe(),F(p.lc)}else if(h==="run"){vc(p.Bb),Mn(p.Bb,0,0,1,0,0),qo(),An(p.Bb),xe||(Ui(),xe=!0);try{$c(p.hc,p.Jb)}catch(y){if(y!="unwind")throw y}}else p.target!=="setimmediate"&&(h==="checkMailbox"?xe&&dr():h&&(ie(`worker: received unknown command ${h}`),ie(p)))}catch(y){throw Ni(),y}};var Tg=i,xe=!1;self.onunhandledrejection=l=>{throw l.reason||l},self.onmessage=i}function fe(){var i=v.buffer;r.HEAP8=C=new Int8Array(i),I=new Int16Array(i),r.HEAPU8=A=new Uint8Array(i),z=new Uint16Array(i),r.HEAP32=D=new Int32Array(i),r.HEAPU32=R=new Uint32Array(i),H=new Float32Array(i),ne=new Float64Array(i),q=new BigInt64Array(i),Y=new BigUint64Array(i)}function Fe(){u?startWorker(r):M.Da()}var mt,ft=0,Nt=null;function No(){if(--ft==0&&Nt){var i=Nt;Nt=null,i()}}function ht(i){throw ie(i="Aborted("+i+")"),Z=!0,i=new WebAssembly.RuntimeError(i+". Build with -sASSERTIONS for more info."),n(i),i}function Vo(){return{a:{L:Lp,Aa:Vp,b:Sc,$:Qo,A:Jo,pa:ei,X:ti,Z:ri,qa:ni,na:oi,ga:ii,ma:ai,J:si,Y:ui,V:li,oa:di,W:ci,va:Tc,E:Ic,Q:Ac,O:kc,D:Oc,v:zc,s:Dc,P:Bc,z:Wc,R:Gc,ja:Hc,T:Fc,aa:qc,M:jc,F:Kc,ia:An,sa:Zc,r:Qc,Ca:Yc,w:ep,o:tp,m:np,c:Sn,Ba:op,n:ip,j:up,u:lp,p:dp,f:cp,t:pp,l:mp,e:fp,k:hp,h:gp,g:yp,d:bp,da:_p,ea:wp,fa:vp,ba:Si,ca:Ti,N:Ci,xa:xp,ua:Cp,i:Ip,C:Ap,G:Ep,ta:Sp,x:kp,ra:Pp,U:Op,q:$p,y:zp,K:Dp,S:Bp,za:Mp,ya:Rp,ka:ki,la:Pi,_:wn,B:Oi,I:zi,ha:Di,H:Bi,a:v,wa:_n}}}class yn{name="ExitStatus";constructor(l){this.message=`Program terminated with exit(${l})`,this.status=l}}var Lo=i=>{i.terminate(),i.onmessage=()=>{}},bn=[],Wo=i=>{yt.length==0&&(Ko(),jo(yt[0]));var l=yt.pop();if(!l)return 6;Zt.push(l),It[i.Bb]=l,l.Bb=i.Bb;var p={Db:"run",hc:i.fc,Jb:i.Jb,Bb:i.Bb};return l.postMessage(p,i.Nb),0},gt=0,$e=(i,l,...p)=>{for(var h=2*p.length,y=Nn(),S=Un(8*h),k=S>>>3,B=0;B<p.length;B++){var U=p[B];typeof U=="bigint"?(q[k+2*B]=1n,q[k+2*B+1]=U):(q[k+2*B]=0n,Oe()[k+2*B+1>>>0]=U)}return i=Vi(i,0,h,S,l),_r(y),i};function _n(i){if(u)return $e(0,1,i);if(T=i,!(0<gt)){for(var l of Zt)Lo(l);for(l of yt)Lo(l);yt=[],Zt=[],It={},Z=!0}_(0,new yn(i))}function Go(i){if(u)return $e(1,0,i);wn(i)}var wn=i=>{if(T=i,u)throw Go(i),"unwind";_n(i)},yt=[],Zt=[],Ho=[],It={},Fo=i=>{var l=i.Bb;delete It[l],yt.push(i),Zt.splice(Zt.indexOf(i),1),i.Bb=0,Li(l)};function qo(){Ho.forEach(i=>i())}var jo=i=>new Promise(l=>{i.onmessage=y=>{var S=(y=y.data).Db;if(y.Hb&&y.Hb!=Bn()){var k=It[y.Hb];k?k.postMessage(y,y.Nb):ie(`Internal error! Worker sent a message "${S}" to target pthread ${y.Hb}, but that thread no longer exists!`)}else S==="checkMailbox"?dr():S==="spawnThread"?Wo(y):S==="cleanupThread"?Fo(It[y.ic]):S==="loaded"?(i.loaded=!0,l(i)):y.target==="setimmediate"?i.postMessage(y):S==="callHandler"?r[y.Rb](...y.args):S&&ie(`worker sent an unknown command ${S}`)},i.onerror=y=>{throw ie(`worker sent an error! ${y.filename}:${y.lineno}: ${y.message}`),y};var p,h=[];for(p of[])r.propertyIsEnumerable(p)&&h.push(p);i.postMessage({Db:"load",Sb:h,kc:v,lc:$})});function Ko(){var i=new Worker((()=>{let l=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new l("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});yt.push(i)}var vc=i=>{fe();var l=X()[i+52>>>2>>>0];i=X()[i+56>>>2>>>0],Hi(l,l-i),_r(l)},$c=(i,l)=>{gt=0,i=Fi(i,l),0<gt?T=i:Rn(i)};class xc{constructor(l){this.Ib=l-24}}function Sc(i,l,p){var h=new xc(i>>>=0);throw l>>>=0,p>>>=0,X()[h.Ib+16>>>2>>>0]=0,X()[h.Ib+4>>>2>>>0]=l,X()[h.Ib+8>>>2>>>0]=p,i}function Zo(i,l,p,h){return u?$e(2,1,i,l,p,h):Qo(i,l,p,h)}function Qo(i,l,p,h){if(i>>>=0,p>>>=0,h>>>=0,d===void 0)return 6;var y=[];return u&&y.length===0?Zo(i,l>>>=0,p,h):(i={fc:p,Bb:i,Jb:h,Nb:y},u?(i.Db="spawnThread",postMessage(i,y),0):Wo(i))}var Yo=typeof TextDecoder<"u"?new TextDecoder:void 0,Xo=(i,l=0,p=NaN)=>{var h=(l>>>=0)+p;for(p=l;i[p]&&!(p>=h);)++p;if(16<p-l&&i.buffer&&Yo)return Yo.decode(i.buffer instanceof ArrayBuffer?i.subarray(l,p):i.slice(l,p));for(h="";l<p;){var y=i[l++];if(128&y){var S=63&i[l++];if((224&y)==192)h+=String.fromCharCode((31&y)<<6|S);else{var k=63&i[l++];65536>(y=(240&y)==224?(15&y)<<12|S<<6|k:(7&y)<<18|S<<12|k<<6|63&i[l++])?h+=String.fromCharCode(y):(y-=65536,h+=String.fromCharCode(55296|y>>10,56320|1023&y))}}else h+=String.fromCharCode(y)}return h},Ce=(i,l)=>(i>>>=0)?Xo(pe(),i,l):"";function Jo(i,l,p){return u?$e(3,1,i,l,p):0}function ei(i,l){if(u)return $e(4,1,i,l)}function ti(i,l){if(u)return $e(5,1,i,l)}function ri(i,l,p){if(u)return $e(6,1,i,l,p)}function ni(i,l,p){return u?$e(7,1,i,l,p):0}function oi(i,l){if(u)return $e(8,1,i,l)}function ii(i,l,p){if(u)return $e(9,1,i,l,p)}function ai(i,l,p,h){if(u)return $e(10,1,i,l,p,h)}function si(i,l,p,h){if(u)return $e(11,1,i,l,p,h)}function ui(i,l,p,h){if(u)return $e(12,1,i,l,p,h)}function li(i){if(u)return $e(13,1,i)}function di(i,l){if(u)return $e(14,1,i,l)}function ci(i,l,p){if(u)return $e(15,1,i,l,p)}var pi,Tc=()=>ht(""),Ye=i=>{for(var l="";pe()[i>>>0];)l+=pi[pe()[i++>>>0]];return l},vn={},$n={},Cc={},Vt=r.BindingError=class extends Error{constructor(i){super(i),this.name="BindingError"}};function st(i,l,p={}){return function(h,y,S={}){var k=y.name;if(!h)throw new Vt(`type "${k}" must have a positive integer typeid pointer`);if($n.hasOwnProperty(h)){if(S.Tb)return;throw new Vt(`Cannot register type '${k}' twice`)}$n[h]=y,delete Cc[h],vn.hasOwnProperty(h)&&(y=vn[h],delete vn[h],y.forEach(B=>B()))}(i,l,p)}var mi=(i,l,p)=>{switch(l){case 1:return p?h=>Te()[h>>>0]:h=>pe()[h>>>0];case 2:return p?h=>J()[h>>>1>>>0]:h=>V()[h>>>1>>>0];case 4:return p?h=>O()[h>>>2>>>0]:h=>X()[h>>>2>>>0];case 8:return p?h=>q[h>>>3]:h=>Y[h>>>3];default:throw new TypeError(`invalid integer width (${l}): ${i}`)}};function Ic(i,l,p){p>>>=0,st(i>>>=0,{name:l=Ye(l>>>0),fromWireType:h=>h,toWireType:function(h,y){if(typeof y!="bigint"&&typeof y!="number")throw y=y===null?"null":(h=typeof y)=="object"||h==="array"||h==="function"?y.toString():""+y,new TypeError(`Cannot convert "${y}" to ${this.name}`);return typeof y=="number"&&(y=BigInt(y)),y},Cb:bt,readValueFromPointer:mi(l,p,l.indexOf("u")==-1),Eb:null})}var bt=8;function Ac(i,l,p,h){st(i>>>=0,{name:l=Ye(l>>>0),fromWireType:function(y){return!!y},toWireType:function(y,S){return S?p:h},Cb:bt,readValueFromPointer:function(y){return this.fromWireType(pe()[y>>>0])},Eb:null})}var xn=[],ut=[];function Sn(i){9<(i>>>=0)&&--ut[i+1]==0&&(ut[i]=void 0,xn.push(i))}var Be=i=>{if(!i)throw new Vt(`Cannot use deleted val. handle = ${i}`);return ut[i]},Ge=i=>{switch(i){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let l=xn.pop()||ut.length;return ut[l]=i,ut[l+1]=1,l}};function Tn(i){return this.fromWireType(X()[i>>>2>>>0])}var Ec={name:"emscripten::val",fromWireType:i=>{var l=Be(i);return Sn(i),l},toWireType:(i,l)=>Ge(l),Cb:bt,readValueFromPointer:Tn,Eb:null};function kc(i){return st(i>>>0,Ec)}var Pc=(i,l)=>{switch(l){case 4:return function(p){return this.fromWireType(ze()[p>>>2>>>0])};case 8:return function(p){return this.fromWireType(Oe()[p>>>3>>>0])};default:throw new TypeError(`invalid float width (${l}): ${i}`)}};function Oc(i,l,p){p>>>=0,st(i>>>=0,{name:l=Ye(l>>>0),fromWireType:h=>h,toWireType:(h,y)=>y,Cb:bt,readValueFromPointer:Pc(l,p),Eb:null})}function zc(i,l,p,h,y){if(i>>>=0,p>>>=0,l=Ye(l>>>0),y===-1&&(y=4294967295),y=B=>B,h===0){var S=32-8*p;y=B=>B<<S>>>S}var k=l.includes("unsigned")?function(B,U){return U>>>0}:function(B,U){return U};st(i,{name:l,fromWireType:y,toWireType:k,Cb:bt,readValueFromPointer:mi(l,p,h!==0),Eb:null})}function Dc(i,l,p){function h(S){var k=X()[S>>>2>>>0];return S=X()[S+4>>>2>>>0],new y(Te().buffer,S,k)}var y=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][l];st(i>>>=0,{name:p=Ye(p>>>0),fromWireType:h,Cb:bt,readValueFromPointer:h},{Tb:!0})}var At=(i,l,p)=>{var h=pe();if(l>>>=0,0<p){var y=l;p=l+p-1;for(var S=0;S<i.length;++S){var k=i.charCodeAt(S);if(55296<=k&&57343>=k&&(k=65536+((1023&k)<<10)|1023&i.charCodeAt(++S)),127>=k){if(l>=p)break;h[l++>>>0]=k}else{if(2047>=k){if(l+1>=p)break;h[l++>>>0]=192|k>>6}else{if(65535>=k){if(l+2>=p)break;h[l++>>>0]=224|k>>12}else{if(l+3>=p)break;h[l++>>>0]=240|k>>18,h[l++>>>0]=128|k>>12&63}h[l++>>>0]=128|k>>6&63}h[l++>>>0]=128|63&k}}h[l>>>0]=0,i=l-y}else i=0;return i},Cn=i=>{for(var l=0,p=0;p<i.length;++p){var h=i.charCodeAt(p);127>=h?l++:2047>=h?l+=2:55296<=h&&57343>=h?(l+=4,++p):l+=3}return l};function Bc(i,l){st(i>>>=0,{name:l=Ye(l>>>0),fromWireType:function(p){for(var h,y=X()[p>>>2>>>0],S=p+4,k=S,B=0;B<=y;++B){var U=S+B;B!=y&&pe()[U>>>0]!=0||(k=Ce(k,U-k),h===void 0?h=k:(h+="\0",h+=k),k=U+1)}return lt(p),h},toWireType:function(p,h){h instanceof ArrayBuffer&&(h=new Uint8Array(h));var y=typeof h=="string";if(!(y||ArrayBuffer.isView(h)&&h.BYTES_PER_ELEMENT==1))throw new Vt("Cannot pass non-string to std::string");var S=y?Cn(h):h.length,k=br(4+S+1),B=k+4;return X()[k>>>2>>>0]=S,y?At(h,B,S+1):pe().set(h,B>>>0),p!==null&&p.push(lt,k),k},Cb:bt,readValueFromPointer:Tn,Eb(p){lt(p)}})}var fi=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Mc=(i,l)=>{for(var p=i>>1,h=p+l/2;!(p>=h)&&V()[p>>>0];)++p;if(32<(p<<=1)-i&&fi)return fi.decode(pe().slice(i,p));for(p="",h=0;!(h>=l/2);++h){var y=J()[i+2*h>>>1>>>0];if(y==0)break;p+=String.fromCharCode(y)}return p},Rc=(i,l,p)=>{if(p??=2147483647,2>p)return 0;var h=l;p=(p-=2)<2*i.length?p/2:i.length;for(var y=0;y<p;++y){var S=i.charCodeAt(y);J()[l>>>1>>>0]=S,l+=2}return J()[l>>>1>>>0]=0,l-h},Uc=i=>2*i.length,Nc=(i,l)=>{for(var p=0,h="";!(p>=l/4);){var y=O()[i+4*p>>>2>>>0];if(y==0)break;++p,65536<=y?(y-=65536,h+=String.fromCharCode(55296|y>>10,56320|1023&y)):h+=String.fromCharCode(y)}return h},Vc=(i,l,p)=>{if(l>>>=0,p??=2147483647,4>p)return 0;var h=l;p=h+p-4;for(var y=0;y<i.length;++y){var S=i.charCodeAt(y);if(55296<=S&&57343>=S&&(S=65536+((1023&S)<<10)|1023&i.charCodeAt(++y)),O()[l>>>2>>>0]=S,(l+=4)+4>p)break}return O()[l>>>2>>>0]=0,l-h},Lc=i=>{for(var l=0,p=0;p<i.length;++p){var h=i.charCodeAt(p);55296<=h&&57343>=h&&++p,l+=4}return l};function Wc(i,l,p){if(i>>>=0,l>>>=0,p=Ye(p>>>=0),l===2)var h=Mc,y=Rc,S=Uc,k=B=>V()[B>>>1>>>0];else l===4&&(h=Nc,y=Vc,S=Lc,k=B=>X()[B>>>2>>>0]);st(i,{name:p,fromWireType:B=>{for(var U,G=X()[B>>>2>>>0],Q=B+4,re=0;re<=G;++re){var de=B+4+re*l;re!=G&&k(de)!=0||(Q=h(Q,de-Q),U===void 0?U=Q:(U+="\0",U+=Q),Q=de+l)}return lt(B),U},toWireType:(B,U)=>{if(typeof U!="string")throw new Vt(`Cannot pass non-string to C++ string type ${p}`);var G=S(U),Q=br(4+G+l);return X()[Q>>>2>>>0]=G/l,y(U,Q+4,G+l),B!==null&&B.push(lt,Q),Q},Cb:bt,readValueFromPointer:Tn,Eb(B){lt(B)}})}function Gc(i,l){st(i>>>=0,{Ub:!0,name:l=Ye(l>>>0),Cb:0,fromWireType:()=>{},toWireType:()=>{}})}function Hc(i){Mn(i>>>0,!s,1,!a,131072,!1),qo()}var In=i=>{if(!Z)try{if(i(),!(0<gt))try{u?Rn(T):wn(T)}catch(l){l instanceof yn||l=="unwind"||_(0,l)}}catch(l){l instanceof yn||l=="unwind"||_(0,l)}};function An(i){i>>>=0,typeof Atomics.jc=="function"&&(Atomics.jc(O(),i>>>2,i).value.then(dr),i+=128,Atomics.store(O(),i>>>2,1))}var dr=()=>{var i=Bn();i&&(An(i),In(Gi))};function Fc(i,l){(i>>>=0)==l>>>0?setTimeout(dr):u?postMessage({Hb:i,Db:"checkMailbox"}):(i=It[i])&&i.postMessage({Db:"checkMailbox"})}var En=[];function qc(i,l,p,h,y){for(l>>>=0,h/=2,En.length=h,p=y>>>0>>>3,y=0;y<h;y++)En[y]=q[p+2*y]?q[p+2*y+1]:Oe()[p+2*y+1>>>0];return(l?Dn[l]:Np[i])(...En)}var jc=()=>{gt=0};function Kc(i){i>>>=0,u?postMessage({Db:"cleanupThread",ic:i}):Fo(It[i])}function Zc(i){}var cr=(i,l)=>{var p=$n[i];if(p===void 0)throw i=Ri(i),p=Ye(i),lt(i),new Vt(`${l} has unknown type ${p}`);return p},hi=(i,l,p)=>{var h=[];return i=i.toWireType(h,p),h.length&&(X()[l>>>2>>>0]=Ge(h)),i};function Qc(i,l,p){return l>>>=0,p>>>=0,i=Be(i>>>0),l=cr(l,"emval::as"),hi(l,p,i)}function Yc(i,l){return l>>>=0,i=Be(i>>>0),(l=cr(l,"emval::as")).toWireType(null,i)}var pr=i=>{try{i()}catch(l){ht(l)}},_t=0,Xe=null,gi=0,mr=[],yi={},bi={},Xc=0,kn=null,Jc=[];function _i(i){return function(l){if(!Z){if(_t===0){var p=!1,h=!1;l((y=0)=>{if(!Z&&(gi=y,p=!0,h)){_t=2,pr(()=>Ki(Xe)),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.resume(),y=!1;try{var S=function(){var U=O()[Xe+8>>>2>>>0];return U=M[bi[U]],--gt,U()}()}catch(U){S=U,y=!0}var k=!1;if(!Xe){var B=kn;B&&(kn=null,(y?B.reject:B.resolve)(S),k=!0)}if(y&&!k)throw S}}),h=!0,p||(_t=1,Xe=function(){var y=br(65548),S=y+12;X()[y>>>2>>>0]=S,X()[y+4>>>2>>>0]=S+65536,S=mr[0];var k=yi[S];return k===void 0&&(k=Xc++,yi[S]=k,bi[k]=S),S=k,O()[y+8>>>2>>>0]=S,y}(),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.pause(),pr(()=>qi(Xe)))}else _t===2?(_t=0,pr(Zi),lt(Xe),Xe=null,Jc.forEach(In)):ht(`invalid state: ${_t}`);return gi}}(l=>{i().then(l)})}function ep(i){return i>>>=0,_i(async()=>{var l=await Be(i);return Ge(l)})}var fr=[];function tp(i,l,p,h){return p>>>=0,h>>>=0,(i=fr[i>>>0])(null,l=Be(l>>>0),p,h)}var rp={},hr=i=>{var l=rp[i];return l===void 0?Ye(i):l};function np(i,l,p,h,y){return p>>>=0,h>>>=0,y>>>=0,(i=fr[i>>>0])(l=Be(l>>>0),l[p=hr(p)],h,y)}function op(i,l){return l>>>=0,(i=Be(i>>>0))==Be(l)}var wi=()=>typeof globalThis=="object"?globalThis:Function("return this")();function ip(i){return(i>>>=0)==0?Ge(wi()):(i=hr(i),Ge(wi()[i]))}var ap=i=>{var l=fr.length;return fr.push(i),l},sp=(i,l)=>{for(var p=Array(i),h=0;h<i;++h)p[h]=cr(X()[l+4*h>>>2>>>0],`parameter ${h}`);return p};function up(i,l,p){var h=(l=sp(i,l>>>0)).shift();i--;var y=`return function (obj, func, destructorsRef, args) {
`,S=0,k=[];p===0&&k.push("obj");for(var B=["retType"],U=[h],G=0;G<i;++G)k.push(`arg${G}`),B.push(`argType${G}`),U.push(l[G]),y+=`  var arg${G} = argType${G}.readValueFromPointer(args${S?"+"+S:""});
`,S+=l[G].Cb;return y+=`  var rv = ${p===1?"new func":"func.call"}(${k.join(", ")});
`,h.Ub||(B.push("emval_returnValue"),U.push(hi),y+=`  return emval_returnValue(retType, destructorsRef, rv);
`),i=new Function(...B,y+`};
`)(...U),p=`methodCaller<(${l.map(Q=>Q.name).join(", ")}) => ${h.name}>`,ap(Object.defineProperty(i,"name",{value:p}))}function lp(i){return i=hr(i>>>0),Ge(r[i])}function dp(i,l){return l>>>=0,i=Be(i>>>0),l=Be(l),Ge(i[l])}function cp(i){9<(i>>>=0)&&(ut[i+1]+=1)}function pp(){return Ge([])}function mp(i){i=Be(i>>>0);for(var l=Array(i.length),p=0;p<i.length;p++)l[p]=i[p];return Ge(l)}function fp(i){return Ge(hr(i>>>0))}function hp(){return Ge({})}function gp(i){for(var l=Be(i>>>=0);l.length;){var p=l.pop();l.pop()(p)}Sn(i)}function yp(i,l,p){l>>>=0,p>>>=0,i=Be(i>>>0),l=Be(l),p=Be(p),i[l]=p}function bp(i,l){return l>>>=0,i=(i=cr(i>>>0,"_emval_take_value")).readValueFromPointer(l),Ge(i)}function _p(i,l){i=-9007199254740992>i||9007199254740992<i?NaN:Number(i),l>>>=0,i=new Date(1e3*i),O()[l>>>2>>>0]=i.getUTCSeconds(),O()[l+4>>>2>>>0]=i.getUTCMinutes(),O()[l+8>>>2>>>0]=i.getUTCHours(),O()[l+12>>>2>>>0]=i.getUTCDate(),O()[l+16>>>2>>>0]=i.getUTCMonth(),O()[l+20>>>2>>>0]=i.getUTCFullYear()-1900,O()[l+24>>>2>>>0]=i.getUTCDay(),i=(i.getTime()-Date.UTC(i.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,O()[l+28>>>2>>>0]=i}var vi=i=>i%4==0&&(i%100!=0||i%400==0),$i=[0,31,60,91,121,152,182,213,244,274,305,335],xi=[0,31,59,90,120,151,181,212,243,273,304,334];function wp(i,l){i=-9007199254740992>i||9007199254740992<i?NaN:Number(i),l>>>=0,i=new Date(1e3*i),O()[l>>>2>>>0]=i.getSeconds(),O()[l+4>>>2>>>0]=i.getMinutes(),O()[l+8>>>2>>>0]=i.getHours(),O()[l+12>>>2>>>0]=i.getDate(),O()[l+16>>>2>>>0]=i.getMonth(),O()[l+20>>>2>>>0]=i.getFullYear()-1900,O()[l+24>>>2>>>0]=i.getDay();var p=(vi(i.getFullYear())?$i:xi)[i.getMonth()]+i.getDate()-1|0;O()[l+28>>>2>>>0]=p,O()[l+36>>>2>>>0]=-60*i.getTimezoneOffset(),p=new Date(i.getFullYear(),6,1).getTimezoneOffset();var h=new Date(i.getFullYear(),0,1).getTimezoneOffset();i=0|(p!=h&&i.getTimezoneOffset()==Math.min(h,p)),O()[l+32>>>2>>>0]=i}function vp(i){i>>>=0;var l=new Date(O()[i+20>>>2>>>0]+1900,O()[i+16>>>2>>>0],O()[i+12>>>2>>>0],O()[i+8>>>2>>>0],O()[i+4>>>2>>>0],O()[i>>>2>>>0],0),p=O()[i+32>>>2>>>0],h=l.getTimezoneOffset(),y=new Date(l.getFullYear(),6,1).getTimezoneOffset(),S=new Date(l.getFullYear(),0,1).getTimezoneOffset(),k=Math.min(S,y);return 0>p?O()[i+32>>>2>>>0]=+(y!=S&&k==h):0<p!=(k==h)&&(y=Math.max(S,y),l.setTime(l.getTime()+6e4*((0<p?k:y)-h))),O()[i+24>>>2>>>0]=l.getDay(),p=(vi(l.getFullYear())?$i:xi)[l.getMonth()]+l.getDate()-1|0,O()[i+28>>>2>>>0]=p,O()[i>>>2>>>0]=l.getSeconds(),O()[i+4>>>2>>>0]=l.getMinutes(),O()[i+8>>>2>>>0]=l.getHours(),O()[i+12>>>2>>>0]=l.getDate(),O()[i+16>>>2>>>0]=l.getMonth(),O()[i+20>>>2>>>0]=l.getYear(),i=l.getTime(),BigInt(isNaN(i)?-1:i/1e3)}function Si(i,l,p,h,y,S,k){return u?$e(16,1,i,l,p,h,y,S,k):-52}function Ti(i,l,p,h,y,S){if(u)return $e(17,1,i,l,p,h,y,S)}var Qt={},$p=()=>performance.timeOrigin+performance.now();function Ci(i,l){if(u)return $e(18,1,i,l);if(Qt[i]&&(clearTimeout(Qt[i].id),delete Qt[i]),!l)return 0;var p=setTimeout(()=>{delete Qt[i],In(()=>Wi(i,performance.timeOrigin+performance.now()))},l);return Qt[i]={id:p,rc:l},0}function xp(i,l,p,h){i>>>=0,l>>>=0,p>>>=0,h>>>=0;var y=new Date().getFullYear(),S=new Date(y,0,1).getTimezoneOffset();y=new Date(y,6,1).getTimezoneOffset();var k=Math.max(S,y);X()[i>>>2>>>0]=60*k,O()[l>>>2>>>0]=+(S!=y),i=(l=B=>{var U=Math.abs(B);return`UTC${0<=B?"-":"+"}${String(Math.floor(U/60)).padStart(2,"0")}${String(U%60).padStart(2,"0")}`})(S),l=l(y),y<S?(At(i,p,17),At(l,h,17)):(At(i,h,17),At(l,p,17))}var Sp=()=>Date.now(),Tp=1;function Cp(i,l,p){if(!(0<=i&&3>=i))return 28;if(i===0)i=Date.now();else{if(!Tp)return 52;i=performance.timeOrigin+performance.now()}return q[p>>>0>>>3]=BigInt(Math.round(1e6*i)),0}var Pn=[],Ii=(i,l)=>{Pn.length=0;for(var p;p=pe()[i++>>>0];){var h=p!=105;l+=(h&=p!=112)&&l%8?4:0,Pn.push(p==112?X()[l>>>2>>>0]:p==106?q[l>>>3]:p==105?O()[l>>>2>>>0]:Oe()[l>>>3>>>0]),l+=h?8:4}return Pn};function Ip(i,l,p){return i>>>=0,l=Ii(l>>>0,p>>>0),Dn[i](...l)}function Ap(i,l,p){return i>>>=0,l=Ii(l>>>0,p>>>0),Dn[i](...l)}var Ep=()=>{};function kp(i,l){return ie(Ce(i>>>0,l>>>0))}var Pp=()=>{throw gt+=1,"unwind"};function Op(){return 4294901760}var zp=()=>navigator.hardwareConcurrency;function Dp(){return ht("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function Bp(i){i>>>=0;var l=pe().length;if(i<=l||4294901760<i)return!1;for(var p=1;4>=p;p*=2){var h=l*(1+.2/p);h=Math.min(h,i+100663296);e:{h=(Math.min(4294901760,65536*Math.ceil(Math.max(i,h)/65536))-v.buffer.byteLength+65535)/65536|0;try{v.grow(h),fe();var y=1;break e}catch{}y=void 0}if(y)return!0}return!1}var gr=()=>(ht("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Lt={},Ai=i=>{i.forEach(l=>{var p=gr();p&&(Lt[p]=l)})};function Mp(){var i=Error().stack.toString().split(`
`);return i[0]=="Error"&&i.shift(),Ai(i),Lt.Mb=gr(),Lt.dc=i,Lt.Mb}function Rp(i,l,p){if(i>>>=0,l>>>=0,Lt.Mb==i)var h=Lt.dc;else(h=Error().stack.toString().split(`
`))[0]=="Error"&&h.shift(),Ai(h);for(var y=3;h[y]&&gr()!=i;)++y;for(i=0;i<p&&h[i+y];++i)O()[l+4*i>>>2>>>0]=gr();return i}var On,zn={},Ei=()=>{if(!On){var i,l={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(i in zn)zn[i]===void 0?delete l[i]:l[i]=zn[i];var p=[];for(i in l)p.push(`${i}=${l[i]}`);On=p}return On};function ki(i,l){if(u)return $e(19,1,i,l);i>>>=0,l>>>=0;var p,h=0,y=0;for(p of Ei()){var S=l+h;X()[i+y>>>2>>>0]=S,h+=At(p,S,1/0)+1,y+=4}return 0}function Pi(i,l){if(u)return $e(20,1,i,l);i>>>=0,l>>>=0;var p=Ei();for(var h of(X()[i>>>2>>>0]=p.length,i=0,p))i+=Cn(h)+1;return X()[l>>>2>>>0]=i,0}function Oi(i){return u?$e(21,1,i):52}function zi(i,l,p,h){return u?$e(22,1,i,l,p,h):52}function Di(i,l,p,h){return u?$e(23,1,i,l,p,h):70}var Up=[null,[],[]];function Bi(i,l,p,h){if(u)return $e(24,1,i,l,p,h);l>>>=0,p>>>=0,h>>>=0;for(var y=0,S=0;S<p;S++){var k=X()[l>>>2>>>0],B=X()[l+4>>>2>>>0];l+=8;for(var U=0;U<B;U++){var G=i,Q=pe()[k+U>>>0],re=Up[G];Q===0||Q===10?((G===1?j:ie)(Xo(re)),re.length=0):re.push(Q)}y+=B}return X()[h>>>2>>>0]=y,0}u||function(){for(var i=r.numThreads-1;i--;)Ko();bn.push(()=>{ft++,function(l){u?l():Promise.all(yt.map(jo)).then(l)}(()=>No())})}();for(var Mi=Array(256),yr=0;256>yr;++yr)Mi[yr]=String.fromCharCode(yr);pi=Mi,ut.push(0,1,void 0,1,null,1,!0,1,!1,1),r.count_emval_handles=()=>ut.length/2-5-xn.length,u||(v=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),fe()),r.wasmBinary&&(x=r.wasmBinary),r.stackSave=()=>Nn(),r.stackRestore=i=>_r(i),r.stackAlloc=i=>Un(i),r.setValue=function(i,l,p="i8"){switch(p.endsWith("*")&&(p="*"),p){case"i1":case"i8":Te()[i>>>0]=l;break;case"i16":J()[i>>>1>>>0]=l;break;case"i32":O()[i>>>2>>>0]=l;break;case"i64":q[i>>>3]=BigInt(l);break;case"float":ze()[i>>>2>>>0]=l;break;case"double":Oe()[i>>>3>>>0]=l;break;case"*":X()[i>>>2>>>0]=l;break;default:ht(`invalid type for setValue: ${p}`)}},r.getValue=function(i,l="i8"){switch(l.endsWith("*")&&(l="*"),l){case"i1":case"i8":return Te()[i>>>0];case"i16":return J()[i>>>1>>>0];case"i32":return O()[i>>>2>>>0];case"i64":return q[i>>>3];case"float":return ze()[i>>>2>>>0];case"double":return Oe()[i>>>3>>>0];case"*":return X()[i>>>2>>>0];default:ht(`invalid type for getValue: ${l}`)}},r.UTF8ToString=Ce,r.stringToUTF8=At,r.lengthBytesUTF8=Cn;var Np=[_n,Go,Zo,Jo,ei,ti,ri,ni,oi,ii,ai,si,ui,li,di,ci,Si,Ti,Ci,ki,Pi,Oi,zi,Di,Bi],Dn={892060:(i,l,p,h,y)=>{if(r===void 0||!r.Fb)return 1;if((i=Ce(Number(i>>>0))).startsWith("./")&&(i=i.substring(2)),!(i=r.Fb.get(i)))return 2;if(l=Number(l>>>0),p=Number(p>>>0),h=Number(h>>>0),l+p>i.byteLength)return 3;try{let S=i.subarray(l,l+p);switch(y){case 0:pe().set(S,h>>>0);break;case 1:r.mc?r.mc(h,S):r.cc(h,S);break;default:return 4}return 0}catch{return 4}},892884:(i,l,p)=>{r.Pb(i,pe().subarray(l>>>0,l+p>>>0))},892948:()=>r.oc(),892990:i=>{r.Ob(i)},893027:()=>{r.Wb()},893058:()=>{r.Xb()},893087:()=>{r.ac()},893112:i=>r.Vb(i),893145:i=>r.Zb(i),893177:(i,l,p)=>{r.Lb(Number(i),Number(l),Number(p),!0)},893240:(i,l,p)=>{r.Lb(Number(i),Number(l),Number(p))},893297:()=>typeof wasmOffsetConverter<"u",893354:i=>{r.Ab("Abs",i,void 0)},893405:i=>{r.Ab("Neg",i,void 0)},893456:i=>{r.Ab("Floor",i,void 0)},893509:i=>{r.Ab("Ceil",i,void 0)},893561:i=>{r.Ab("Reciprocal",i,void 0)},893619:i=>{r.Ab("Sqrt",i,void 0)},893671:i=>{r.Ab("Exp",i,void 0)},893722:i=>{r.Ab("Erf",i,void 0)},893773:i=>{r.Ab("Sigmoid",i,void 0)},893828:(i,l,p)=>{r.Ab("HardSigmoid",i,{alpha:l,beta:p})},893907:i=>{r.Ab("Log",i,void 0)},893958:i=>{r.Ab("Sin",i,void 0)},894009:i=>{r.Ab("Cos",i,void 0)},894060:i=>{r.Ab("Tan",i,void 0)},894111:i=>{r.Ab("Asin",i,void 0)},894163:i=>{r.Ab("Acos",i,void 0)},894215:i=>{r.Ab("Atan",i,void 0)},894267:i=>{r.Ab("Sinh",i,void 0)},894319:i=>{r.Ab("Cosh",i,void 0)},894371:i=>{r.Ab("Asinh",i,void 0)},894424:i=>{r.Ab("Acosh",i,void 0)},894477:i=>{r.Ab("Atanh",i,void 0)},894530:i=>{r.Ab("Tanh",i,void 0)},894582:i=>{r.Ab("Not",i,void 0)},894633:(i,l,p)=>{r.Ab("Clip",i,{min:l,max:p})},894702:i=>{r.Ab("Clip",i,void 0)},894754:(i,l)=>{r.Ab("Elu",i,{alpha:l})},894812:i=>{r.Ab("Gelu",i,void 0)},894864:i=>{r.Ab("Relu",i,void 0)},894916:(i,l)=>{r.Ab("LeakyRelu",i,{alpha:l})},894980:(i,l)=>{r.Ab("ThresholdedRelu",i,{alpha:l})},895050:(i,l)=>{r.Ab("Cast",i,{to:l})},895108:i=>{r.Ab("Add",i,void 0)},895159:i=>{r.Ab("Sub",i,void 0)},895210:i=>{r.Ab("Mul",i,void 0)},895261:i=>{r.Ab("Div",i,void 0)},895312:i=>{r.Ab("Pow",i,void 0)},895363:i=>{r.Ab("Equal",i,void 0)},895416:i=>{r.Ab("Greater",i,void 0)},895471:i=>{r.Ab("GreaterOrEqual",i,void 0)},895533:i=>{r.Ab("Less",i,void 0)},895585:i=>{r.Ab("LessOrEqual",i,void 0)},895644:(i,l,p,h,y)=>{r.Ab("ReduceMean",i,{keepDims:!!l,noopWithEmptyAxes:!!p,axes:h?Array.from(O().subarray(Number(h)>>>0,Number(y)>>>0)):[]})},895819:(i,l,p,h,y)=>{r.Ab("ReduceMax",i,{keepDims:!!l,noopWithEmptyAxes:!!p,axes:h?Array.from(O().subarray(Number(h)>>>0,Number(y)>>>0)):[]})},895993:(i,l,p,h,y)=>{r.Ab("ReduceMin",i,{keepDims:!!l,noopWithEmptyAxes:!!p,axes:h?Array.from(O().subarray(Number(h)>>>0,Number(y)>>>0)):[]})},896167:(i,l,p,h,y)=>{r.Ab("ReduceProd",i,{keepDims:!!l,noopWithEmptyAxes:!!p,axes:h?Array.from(O().subarray(Number(h)>>>0,Number(y)>>>0)):[]})},896342:(i,l,p,h,y)=>{r.Ab("ReduceSum",i,{keepDims:!!l,noopWithEmptyAxes:!!p,axes:h?Array.from(O().subarray(Number(h)>>>0,Number(y)>>>0)):[]})},896516:(i,l,p,h,y)=>{r.Ab("ReduceL1",i,{keepDims:!!l,noopWithEmptyAxes:!!p,axes:h?Array.from(O().subarray(Number(h)>>>0,Number(y)>>>0)):[]})},896689:(i,l,p,h,y)=>{r.Ab("ReduceL2",i,{keepDims:!!l,noopWithEmptyAxes:!!p,axes:h?Array.from(O().subarray(Number(h)>>>0,Number(y)>>>0)):[]})},896862:(i,l,p,h,y)=>{r.Ab("ReduceLogSum",i,{keepDims:!!l,noopWithEmptyAxes:!!p,axes:h?Array.from(O().subarray(Number(h)>>>0,Number(y)>>>0)):[]})},897039:(i,l,p,h,y)=>{r.Ab("ReduceSumSquare",i,{keepDims:!!l,noopWithEmptyAxes:!!p,axes:h?Array.from(O().subarray(Number(h)>>>0,Number(y)>>>0)):[]})},897219:(i,l,p,h,y)=>{r.Ab("ReduceLogSumExp",i,{keepDims:!!l,noopWithEmptyAxes:!!p,axes:h?Array.from(O().subarray(Number(h)>>>0,Number(y)>>>0)):[]})},897399:i=>{r.Ab("Where",i,void 0)},897452:(i,l,p)=>{r.Ab("Transpose",i,{perm:l?Array.from(O().subarray(Number(l)>>>0,Number(p)>>>0)):[]})},897576:(i,l,p,h)=>{r.Ab("DepthToSpace",i,{blocksize:l,mode:Ce(p),format:h?"NHWC":"NCHW"})},897709:(i,l,p,h)=>{r.Ab("DepthToSpace",i,{blocksize:l,mode:Ce(p),format:h?"NHWC":"NCHW"})},897842:(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge,Ie)=>{r.Ab("ConvTranspose",i,{format:U?"NHWC":"NCHW",autoPad:l,dilations:[p],group:h,kernelShape:[y],pads:[S,k],strides:[B],wIsConst:()=>!!Te()[G>>>0],outputPadding:Q?Array.from(O().subarray(Number(Q)>>>0,Number(re)>>>0)):[],outputShape:de?Array.from(O().subarray(Number(de)>>>0,Number(ge)>>>0)):[],activation:Ce(Ie)})},898275:(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge)=>{r.Ab("ConvTranspose",i,{format:B?"NHWC":"NCHW",autoPad:l,dilations:Array.from(O().subarray(Number(p)>>>0,2+(Number(p)>>>0)>>>0)),group:h,kernelShape:Array.from(O().subarray(Number(y)>>>0,2+(Number(y)>>>0)>>>0)),pads:Array.from(O().subarray(Number(S)>>>0,4+(Number(S)>>>0)>>>0)),strides:Array.from(O().subarray(Number(k)>>>0,2+(Number(k)>>>0)>>>0)),wIsConst:()=>!!Te()[U>>>0],outputPadding:G?Array.from(O().subarray(Number(G)>>>0,Number(Q)>>>0)):[],outputShape:re?Array.from(O().subarray(Number(re)>>>0,Number(de)>>>0)):[],activation:Ce(ge)})},898936:(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge,Ie)=>{r.Ab("ConvTranspose",i,{format:U?"NHWC":"NCHW",autoPad:l,dilations:[p],group:h,kernelShape:[y],pads:[S,k],strides:[B],wIsConst:()=>!!Te()[G>>>0],outputPadding:Q?Array.from(O().subarray(Number(Q)>>>0,Number(re)>>>0)):[],outputShape:de?Array.from(O().subarray(Number(de)>>>0,Number(ge)>>>0)):[],activation:Ce(Ie)})},899369:(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge)=>{r.Ab("ConvTranspose",i,{format:B?"NHWC":"NCHW",autoPad:l,dilations:Array.from(O().subarray(Number(p)>>>0,2+(Number(p)>>>0)>>>0)),group:h,kernelShape:Array.from(O().subarray(Number(y)>>>0,2+(Number(y)>>>0)>>>0)),pads:Array.from(O().subarray(Number(S)>>>0,4+(Number(S)>>>0)>>>0)),strides:Array.from(O().subarray(Number(k)>>>0,2+(Number(k)>>>0)>>>0)),wIsConst:()=>!!Te()[U>>>0],outputPadding:G?Array.from(O().subarray(Number(G)>>>0,Number(Q)>>>0)):[],outputShape:re?Array.from(O().subarray(Number(re)>>>0,Number(de)>>>0)):[],activation:Ce(ge)})},900030:(i,l)=>{r.Ab("GlobalAveragePool",i,{format:l?"NHWC":"NCHW"})},900121:(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge)=>{r.Ab("AveragePool",i,{format:ge?"NHWC":"NCHW",auto_pad:l,ceil_mode:p,count_include_pad:h,storage_order:y,dilations:S?Array.from(O().subarray(Number(S)>>>0,Number(k)>>>0)):[],kernel_shape:B?Array.from(O().subarray(Number(B)>>>0,Number(U)>>>0)):[],pads:G?Array.from(O().subarray(Number(G)>>>0,Number(Q)>>>0)):[],strides:re?Array.from(O().subarray(Number(re)>>>0,Number(de)>>>0)):[]})},900600:(i,l)=>{r.Ab("GlobalAveragePool",i,{format:l?"NHWC":"NCHW"})},900691:(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge)=>{r.Ab("AveragePool",i,{format:ge?"NHWC":"NCHW",auto_pad:l,ceil_mode:p,count_include_pad:h,storage_order:y,dilations:S?Array.from(O().subarray(Number(S)>>>0,Number(k)>>>0)):[],kernel_shape:B?Array.from(O().subarray(Number(B)>>>0,Number(U)>>>0)):[],pads:G?Array.from(O().subarray(Number(G)>>>0,Number(Q)>>>0)):[],strides:re?Array.from(O().subarray(Number(re)>>>0,Number(de)>>>0)):[]})},901170:(i,l)=>{r.Ab("GlobalMaxPool",i,{format:l?"NHWC":"NCHW"})},901257:(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge)=>{r.Ab("MaxPool",i,{format:ge?"NHWC":"NCHW",auto_pad:l,ceil_mode:p,count_include_pad:h,storage_order:y,dilations:S?Array.from(O().subarray(Number(S)>>>0,Number(k)>>>0)):[],kernel_shape:B?Array.from(O().subarray(Number(B)>>>0,Number(U)>>>0)):[],pads:G?Array.from(O().subarray(Number(G)>>>0,Number(Q)>>>0)):[],strides:re?Array.from(O().subarray(Number(re)>>>0,Number(de)>>>0)):[]})},901732:(i,l)=>{r.Ab("GlobalMaxPool",i,{format:l?"NHWC":"NCHW"})},901819:(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge)=>{r.Ab("MaxPool",i,{format:ge?"NHWC":"NCHW",auto_pad:l,ceil_mode:p,count_include_pad:h,storage_order:y,dilations:S?Array.from(O().subarray(Number(S)>>>0,Number(k)>>>0)):[],kernel_shape:B?Array.from(O().subarray(Number(B)>>>0,Number(U)>>>0)):[],pads:G?Array.from(O().subarray(Number(G)>>>0,Number(Q)>>>0)):[],strides:re?Array.from(O().subarray(Number(re)>>>0,Number(de)>>>0)):[]})},902294:(i,l,p,h,y)=>{r.Ab("Gemm",i,{alpha:l,beta:p,transA:h,transB:y})},902398:i=>{r.Ab("MatMul",i,void 0)},902452:(i,l,p,h)=>{r.Ab("ArgMax",i,{keepDims:!!l,selectLastIndex:!!p,axis:h})},902560:(i,l,p,h)=>{r.Ab("ArgMin",i,{keepDims:!!l,selectLastIndex:!!p,axis:h})},902668:(i,l)=>{r.Ab("Softmax",i,{axis:l})},902731:(i,l)=>{r.Ab("Concat",i,{axis:l})},902791:(i,l,p,h,y)=>{r.Ab("Split",i,{axis:l,numOutputs:p,splitSizes:h?Array.from(O().subarray(Number(h)>>>0,Number(y)>>>0)):[]})},902947:i=>{r.Ab("Expand",i,void 0)},903001:(i,l)=>{r.Ab("Gather",i,{axis:Number(l)})},903072:(i,l)=>{r.Ab("GatherElements",i,{axis:Number(l)})},903151:(i,l)=>{r.Ab("GatherND",i,{batch_dims:Number(l)})},903230:(i,l,p,h,y,S,k,B,U,G,Q)=>{r.Ab("Resize",i,{antialias:l,axes:p?Array.from(O().subarray(Number(p)>>>0,Number(h)>>>0)):[],coordinateTransformMode:Ce(y),cubicCoeffA:S,excludeOutside:k,extrapolationValue:B,keepAspectRatioPolicy:Ce(U),mode:Ce(G),nearestMode:Ce(Q)})},903592:(i,l,p,h,y,S,k)=>{r.Ab("Slice",i,{starts:l?Array.from(O().subarray(Number(l)>>>0,Number(p)>>>0)):[],ends:h?Array.from(O().subarray(Number(h)>>>0,Number(y)>>>0)):[],axes:S?Array.from(O().subarray(Number(S)>>>0,Number(k)>>>0)):[]})},903856:i=>{r.Ab("Tile",i,void 0)},903908:(i,l,p)=>{r.Ab("InstanceNormalization",i,{epsilon:l,format:p?"NHWC":"NCHW"})},904022:(i,l,p)=>{r.Ab("InstanceNormalization",i,{epsilon:l,format:p?"NHWC":"NCHW"})},904136:i=>{r.Ab("Range",i,void 0)},904189:(i,l)=>{r.Ab("Einsum",i,{equation:Ce(l)})},904270:(i,l,p,h,y)=>{r.Ab("Pad",i,{mode:l,value:p,pads:h?Array.from(O().subarray(Number(h)>>>0,Number(y)>>>0)):[]})},904413:(i,l,p,h,y,S)=>{r.Ab("BatchNormalization",i,{epsilon:l,momentum:p,spatial:!!y,trainingMode:!!h,format:S?"NHWC":"NCHW"})},904582:(i,l,p,h,y,S)=>{r.Ab("BatchNormalization",i,{epsilon:l,momentum:p,spatial:!!y,trainingMode:!!h,format:S?"NHWC":"NCHW"})},904751:(i,l,p)=>{r.Ab("CumSum",i,{exclusive:Number(l),reverse:Number(p)})},904848:(i,l,p)=>{r.Ab("DequantizeLinear",i,{axis:l,blockSize:p})},904938:(i,l,p,h,y)=>{r.Ab("GridSample",i,{align_corners:l,mode:Ce(p),padding_mode:Ce(h),format:y?"NHWC":"NCHW"})},905108:(i,l,p,h,y)=>{r.Ab("GridSample",i,{align_corners:l,mode:Ce(p),padding_mode:Ce(h),format:y?"NHWC":"NCHW"})},905278:(i,l)=>{r.Ab("ScatterND",i,{reduction:Ce(l)})},905363:(i,l,p,h,y,S,k,B,U)=>{r.Ab("Attention",i,{numHeads:l,isUnidirectional:p,maskFilterValue:h,scale:y,doRotary:S,qkvHiddenSizes:k?Array.from(O().subarray(Number(B)>>>0,Number(B)+k>>>0)):[],pastPresentShareBuffer:!!U})},905635:i=>{r.Ab("BiasAdd",i,void 0)},905690:i=>{r.Ab("BiasSplitGelu",i,void 0)},905751:i=>{r.Ab("FastGelu",i,void 0)},905807:(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge,Ie,Ue)=>{r.Ab("Conv",i,{format:re?"NHWC":"NCHW",auto_pad:l,dilations:p?Array.from(O().subarray(Number(p)>>>0,Number(h)>>>0)):[],group:y,kernel_shape:S?Array.from(O().subarray(Number(S)>>>0,Number(k)>>>0)):[],pads:B?Array.from(O().subarray(Number(B)>>>0,Number(U)>>>0)):[],strides:G?Array.from(O().subarray(Number(G)>>>0,Number(Q)>>>0)):[],w_is_const:()=>!!Te()[Number(de)>>>0],activation:Ce(ge),activation_params:Ie?Array.from(ze().subarray(Number(Ie)>>>0,Number(Ue)>>>0)):[]})},906391:i=>{r.Ab("Gelu",i,void 0)},906443:(i,l,p,h,y,S,k,B,U)=>{r.Ab("GroupQueryAttention",i,{numHeads:l,kvNumHeads:p,scale:h,softcap:y,doRotary:S,rotaryInterleaved:k,smoothSoftmax:B,localWindowSize:U})},906660:(i,l,p,h)=>{r.Ab("LayerNormalization",i,{axis:l,epsilon:p,simplified:!!h})},906771:(i,l,p,h)=>{r.Ab("LayerNormalization",i,{axis:l,epsilon:p,simplified:!!h})},906882:(i,l,p,h,y,S)=>{r.Ab("MatMulNBits",i,{k:l,n:p,accuracyLevel:h,bits:y,blockSize:S})},907009:(i,l,p,h,y,S)=>{r.Ab("MultiHeadAttention",i,{numHeads:l,isUnidirectional:p,maskFilterValue:h,scale:y,doRotary:S})},907168:(i,l)=>{r.Ab("QuickGelu",i,{alpha:l})},907232:(i,l,p,h,y)=>{r.Ab("RotaryEmbedding",i,{interleaved:!!l,numHeads:p,rotaryEmbeddingDim:h,scale:y})},907371:(i,l,p)=>{r.Ab("SkipLayerNormalization",i,{epsilon:l,simplified:!!p})},907473:(i,l,p)=>{r.Ab("SkipLayerNormalization",i,{epsilon:l,simplified:!!p})},907575:(i,l,p,h)=>{r.Ab("GatherBlockQuantized",i,{gatherAxis:l,quantizeAxis:p,blockSize:h})},907696:i=>{r.$b(i)},907730:(i,l)=>r.bc(Number(i),Number(l),r.Gb.ec,r.Gb.errors)};function Vp(i,l,p){return _i(async()=>{await r.Yb(Number(i),Number(l),Number(p))})}function Lp(){return typeof wasmOffsetConverter<"u"}var M=await async function(){function i(h,y){return M=h.exports,M=function(){var S=M,k={};for(let[B,U]of Object.entries(S))k[B]=typeof U=="function"?(...G)=>{mr.push(B);try{return U(...G)}finally{Z||(mr.pop(),Xe&&_t===1&&mr.length===0&&(_t=0,gt+=1,pr(ji),typeof Fibers<"u"&&Fibers.sc()))}}:U;return k}(),M=function(){var S=M,k=U=>G=>U(G)>>>0,B=U=>()=>U()>>>0;return(S=Object.assign({},S)).Ea=k(S.Ea),S.gb=B(S.gb),S.ib=k(S.ib),S.tb=k(S.tb),S.ub=B(S.ub),S.__cxa_get_exception_ptr=k(S.__cxa_get_exception_ptr),S}(),Ho.push(M.jb),$=y,No(),M}ft++;var l=Vo();if(r.instantiateWasm)return new Promise(h=>{r.instantiateWasm(l,(y,S)=>{h(i(y,S))})});if(u)return new Promise(h=>{F=y=>{var S=new WebAssembly.Instance(y,Vo());h(i(S,y))}});mt??=r.locateFile?r.locateFile?r.locateFile("ort-wasm-simd-threaded.jsep.wasm",w):w+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href;try{var p=await async function(h){var y=mt;if(!x&&typeof WebAssembly.instantiateStreaming=="function"&&!ce(y))try{var S=fetch(y,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(S,h)}catch(k){ie(`wasm streaming compile failed: ${k}`),ie("falling back to ArrayBuffer instantiation")}return async function(k,B){try{var U=await async function(G){if(!x)try{var Q=await f(G);return new Uint8Array(Q)}catch{}if(G==mt&&x)G=new Uint8Array(x);else{if(!g)throw"both async and sync fetching of the wasm failed";G=g(G)}return G}(k);return await WebAssembly.instantiate(U,B)}catch(G){ie(`failed to asynchronously prepare wasm: ${G}`),ht(G)}}(y,h)}(l);return i(p.instance,p.module)}catch(h){return n(h),Promise.reject(h)}}(),Ri=i=>(Ri=M.Ea)(i),Ui=()=>(Ui=M.Fa)();r._OrtInit=(i,l)=>(r._OrtInit=M.Ga)(i,l),r._OrtGetLastError=(i,l)=>(r._OrtGetLastError=M.Ha)(i,l),r._OrtCreateSessionOptions=(i,l,p,h,y,S,k,B,U,G)=>(r._OrtCreateSessionOptions=M.Ia)(i,l,p,h,y,S,k,B,U,G),r._OrtAppendExecutionProvider=(i,l,p,h,y)=>(r._OrtAppendExecutionProvider=M.Ja)(i,l,p,h,y),r._OrtAddFreeDimensionOverride=(i,l,p)=>(r._OrtAddFreeDimensionOverride=M.Ka)(i,l,p),r._OrtAddSessionConfigEntry=(i,l,p)=>(r._OrtAddSessionConfigEntry=M.La)(i,l,p),r._OrtReleaseSessionOptions=i=>(r._OrtReleaseSessionOptions=M.Ma)(i),r._OrtCreateSession=(i,l,p)=>(r._OrtCreateSession=M.Na)(i,l,p),r._OrtReleaseSession=i=>(r._OrtReleaseSession=M.Oa)(i),r._OrtGetInputOutputCount=(i,l,p)=>(r._OrtGetInputOutputCount=M.Pa)(i,l,p),r._OrtGetInputOutputMetadata=(i,l,p,h)=>(r._OrtGetInputOutputMetadata=M.Qa)(i,l,p,h),r._OrtFree=i=>(r._OrtFree=M.Ra)(i),r._OrtCreateTensor=(i,l,p,h,y,S)=>(r._OrtCreateTensor=M.Sa)(i,l,p,h,y,S),r._OrtGetTensorData=(i,l,p,h,y)=>(r._OrtGetTensorData=M.Ta)(i,l,p,h,y),r._OrtReleaseTensor=i=>(r._OrtReleaseTensor=M.Ua)(i),r._OrtCreateRunOptions=(i,l,p,h)=>(r._OrtCreateRunOptions=M.Va)(i,l,p,h),r._OrtAddRunConfigEntry=(i,l,p)=>(r._OrtAddRunConfigEntry=M.Wa)(i,l,p),r._OrtReleaseRunOptions=i=>(r._OrtReleaseRunOptions=M.Xa)(i),r._OrtCreateBinding=i=>(r._OrtCreateBinding=M.Ya)(i),r._OrtBindInput=(i,l,p)=>(r._OrtBindInput=M.Za)(i,l,p),r._OrtBindOutput=(i,l,p,h)=>(r._OrtBindOutput=M._a)(i,l,p,h),r._OrtClearBoundOutputs=i=>(r._OrtClearBoundOutputs=M.$a)(i),r._OrtReleaseBinding=i=>(r._OrtReleaseBinding=M.ab)(i),r._OrtRunWithBinding=(i,l,p,h,y)=>(r._OrtRunWithBinding=M.bb)(i,l,p,h,y),r._OrtRun=(i,l,p,h,y,S,k,B)=>(r._OrtRun=M.cb)(i,l,p,h,y,S,k,B),r._OrtEndProfiling=i=>(r._OrtEndProfiling=M.db)(i),r._JsepOutput=(i,l,p)=>(r._JsepOutput=M.eb)(i,l,p),r._JsepGetNodeName=i=>(r._JsepGetNodeName=M.fb)(i);var Bn=()=>(Bn=M.gb)(),lt=r._free=i=>(lt=r._free=M.hb)(i),br=r._malloc=i=>(br=r._malloc=M.ib)(i),Mn=(i,l,p,h,y,S)=>(Mn=M.kb)(i,l,p,h,y,S),Ni=()=>(Ni=M.lb)(),Vi=(i,l,p,h,y)=>(Vi=M.mb)(i,l,p,h,y),Li=i=>(Li=M.nb)(i),Rn=i=>(Rn=M.ob)(i),Wi=(i,l)=>(Wi=M.pb)(i,l),Gi=()=>(Gi=M.qb)(),Hi=(i,l)=>(Hi=M.rb)(i,l),_r=i=>(_r=M.sb)(i),Un=i=>(Un=M.tb)(i),Nn=()=>(Nn=M.ub)(),Fi=r.dynCall_ii=(i,l)=>(Fi=r.dynCall_ii=M.vb)(i,l);r.dynCall_vii=(i,l,p)=>(r.dynCall_vii=M.dynCall_vii)(i,l,p),r.dynCall_iiiii=(i,l,p,h,y)=>(r.dynCall_iiiii=M.dynCall_iiiii)(i,l,p,h,y),r.dynCall_iii=(i,l,p)=>(r.dynCall_iii=M.dynCall_iii)(i,l,p),r.dynCall_iiiiii=(i,l,p,h,y,S)=>(r.dynCall_iiiiii=M.dynCall_iiiiii)(i,l,p,h,y,S),r.dynCall_iiiiiiii=(i,l,p,h,y,S,k,B)=>(r.dynCall_iiiiiiii=M.dynCall_iiiiiiii)(i,l,p,h,y,S,k,B),r.dynCall_iiiiiii=(i,l,p,h,y,S,k)=>(r.dynCall_iiiiiii=M.dynCall_iiiiiii)(i,l,p,h,y,S,k),r.dynCall_vi=(i,l)=>(r.dynCall_vi=M.dynCall_vi)(i,l),r.dynCall_iiii=(i,l,p,h)=>(r.dynCall_iiii=M.dynCall_iiii)(i,l,p,h),r.dynCall_i=i=>(r.dynCall_i=M.dynCall_i)(i),r.dynCall_viiiiiiii=(i,l,p,h,y,S,k,B,U)=>(r.dynCall_viiiiiiii=M.dynCall_viiiiiiii)(i,l,p,h,y,S,k,B,U),r.dynCall_viii=(i,l,p,h)=>(r.dynCall_viii=M.dynCall_viii)(i,l,p,h),r.dynCall_viijj=(i,l,p,h,y)=>(r.dynCall_viijj=M.dynCall_viijj)(i,l,p,h,y),r.dynCall_viiiiii=(i,l,p,h,y,S,k)=>(r.dynCall_viiiiii=M.dynCall_viiiiii)(i,l,p,h,y,S,k),r.dynCall_viiii=(i,l,p,h,y)=>(r.dynCall_viiii=M.dynCall_viiii)(i,l,p,h,y),r.dynCall_viiiii=(i,l,p,h,y,S)=>(r.dynCall_viiiii=M.dynCall_viiiii)(i,l,p,h,y,S),r.dynCall_vfiii=(i,l,p,h,y)=>(r.dynCall_vfiii=M.dynCall_vfiii)(i,l,p,h,y),r.dynCall_viiiiff=(i,l,p,h,y,S,k)=>(r.dynCall_viiiiff=M.dynCall_viiiiff)(i,l,p,h,y,S,k),r.dynCall_viiiiiff=(i,l,p,h,y,S,k,B)=>(r.dynCall_viiiiiff=M.dynCall_viiiiiff)(i,l,p,h,y,S,k,B),r.dynCall_ffff=(i,l,p,h)=>(r.dynCall_ffff=M.dynCall_ffff)(i,l,p,h),r.dynCall_viiff=(i,l,p,h,y)=>(r.dynCall_viiff=M.dynCall_viiff)(i,l,p,h,y),r.dynCall_fffffff=(i,l,p,h,y,S,k)=>(r.dynCall_fffffff=M.dynCall_fffffff)(i,l,p,h,y,S,k),r.dynCall_jjjjjjj=(i,l,p,h,y,S,k)=>(r.dynCall_jjjjjjj=M.dynCall_jjjjjjj)(i,l,p,h,y,S,k),r.dynCall_jjjjjj=(i,l,p,h,y,S)=>(r.dynCall_jjjjjj=M.dynCall_jjjjjj)(i,l,p,h,y,S),r.dynCall_iijjii=(i,l,p,h,y,S)=>(r.dynCall_iijjii=M.dynCall_iijjii)(i,l,p,h,y,S),r.dynCall_viiiiiiiiiiiii=(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge)=>(r.dynCall_viiiiiiiiiiiii=M.dynCall_viiiiiiiiiiiii)(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge),r.dynCall_viiiiiiiiii=(i,l,p,h,y,S,k,B,U,G,Q)=>(r.dynCall_viiiiiiiiii=M.dynCall_viiiiiiiiii)(i,l,p,h,y,S,k,B,U,G,Q),r.dynCall_viiiiiiiiiii=(i,l,p,h,y,S,k,B,U,G,Q,re)=>(r.dynCall_viiiiiiiiiii=M.dynCall_viiiiiiiiiii)(i,l,p,h,y,S,k,B,U,G,Q,re),r.dynCall_viiiiiiiiiiii=(i,l,p,h,y,S,k,B,U,G,Q,re,de)=>(r.dynCall_viiiiiiiiiiii=M.dynCall_viiiiiiiiiiii)(i,l,p,h,y,S,k,B,U,G,Q,re,de),r.dynCall_viiiiiiiiiiiiiiiiii=(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge,Ie,Ue,dt,Et,Yt)=>(r.dynCall_viiiiiiiiiiiiiiiiii=M.dynCall_viiiiiiiiiiiiiiiiii)(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge,Ie,Ue,dt,Et,Yt),r.dynCall_viiiiiiiii=(i,l,p,h,y,S,k,B,U,G)=>(r.dynCall_viiiiiiiii=M.dynCall_viiiiiiiii)(i,l,p,h,y,S,k,B,U,G),r.dynCall_viiiiiiiiiiiiiiiiiii=(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge,Ie,Ue,dt,Et,Yt,Vn)=>(r.dynCall_viiiiiiiiiiiiiiiiiii=M.dynCall_viiiiiiiiiiiiiiiiiii)(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge,Ie,Ue,dt,Et,Yt,Vn),r.dynCall_viiiiiii=(i,l,p,h,y,S,k,B)=>(r.dynCall_viiiiiii=M.dynCall_viiiiiii)(i,l,p,h,y,S,k,B),r.dynCall_viiiiiiiiiiiiiii=(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge,Ie,Ue)=>(r.dynCall_viiiiiiiiiiiiiii=M.dynCall_viiiiiiiiiiiiiii)(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge,Ie,Ue),r.dynCall_jiji=(i,l,p,h)=>(r.dynCall_jiji=M.dynCall_jiji)(i,l,p,h),r.dynCall_v=i=>(r.dynCall_v=M.dynCall_v)(i),r.dynCall_iidiiii=(i,l,p,h,y,S,k)=>(r.dynCall_iidiiii=M.dynCall_iidiiii)(i,l,p,h,y,S,k),r.dynCall_iiiiiiiii=(i,l,p,h,y,S,k,B,U)=>(r.dynCall_iiiiiiiii=M.dynCall_iiiiiiiii)(i,l,p,h,y,S,k,B,U),r.dynCall_iiij=(i,l,p,h)=>(r.dynCall_iiij=M.dynCall_iiij)(i,l,p,h),r.dynCall_iiiiiiiiii=(i,l,p,h,y,S,k,B,U,G)=>(r.dynCall_iiiiiiiiii=M.dynCall_iiiiiiiiii)(i,l,p,h,y,S,k,B,U,G),r.dynCall_iiiiiiiiiiiii=(i,l,p,h,y,S,k,B,U,G,Q,re,de)=>(r.dynCall_iiiiiiiiiiiii=M.dynCall_iiiiiiiiiiiii)(i,l,p,h,y,S,k,B,U,G,Q,re,de),r.dynCall_iiiiiiiiiii=(i,l,p,h,y,S,k,B,U,G,Q)=>(r.dynCall_iiiiiiiiiii=M.dynCall_iiiiiiiiiii)(i,l,p,h,y,S,k,B,U,G,Q),r.dynCall_ji=(i,l)=>(r.dynCall_ji=M.dynCall_ji)(i,l),r.dynCall_iijii=(i,l,p,h,y)=>(r.dynCall_iijii=M.dynCall_iijii)(i,l,p,h,y),r.dynCall_vij=(i,l,p)=>(r.dynCall_vij=M.dynCall_vij)(i,l,p),r.dynCall_viiijii=(i,l,p,h,y,S,k)=>(r.dynCall_viiijii=M.dynCall_viiijii)(i,l,p,h,y,S,k),r.dynCall_viijiiiiiiiiiiiiii=(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge,Ie,Ue,dt,Et)=>(r.dynCall_viijiiiiiiiiiiiiii=M.dynCall_viijiiiiiiiiiiiiii)(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge,Ie,Ue,dt,Et),r.dynCall_viiiji=(i,l,p,h,y,S)=>(r.dynCall_viiiji=M.dynCall_viiiji)(i,l,p,h,y,S),r.dynCall_fiii=(i,l,p,h)=>(r.dynCall_fiii=M.dynCall_fiii)(i,l,p,h),r.dynCall_viijii=(i,l,p,h,y,S)=>(r.dynCall_viijii=M.dynCall_viijii)(i,l,p,h,y,S),r.dynCall_viij=(i,l,p,h)=>(r.dynCall_viij=M.dynCall_viij)(i,l,p,h),r.dynCall_jiij=(i,l,p,h)=>(r.dynCall_jiij=M.dynCall_jiij)(i,l,p,h),r.dynCall_fi=(i,l)=>(r.dynCall_fi=M.dynCall_fi)(i,l),r.dynCall_fii=(i,l,p)=>(r.dynCall_fii=M.dynCall_fii)(i,l,p),r.dynCall_jii=(i,l,p)=>(r.dynCall_jii=M.dynCall_jii)(i,l,p),r.dynCall_dii=(i,l,p)=>(r.dynCall_dii=M.dynCall_dii)(i,l,p),r.dynCall_fiiii=(i,l,p,h,y)=>(r.dynCall_fiiii=M.dynCall_fiiii)(i,l,p,h,y),r.dynCall_fif=(i,l,p)=>(r.dynCall_fif=M.dynCall_fif)(i,l,p),r.dynCall_jfi=(i,l,p)=>(r.dynCall_jfi=M.dynCall_jfi)(i,l,p),r.dynCall_viiiiiiiiiiiiii=(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge,Ie)=>(r.dynCall_viiiiiiiiiiiiii=M.dynCall_viiiiiiiiiiiiii)(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge,Ie),r.dynCall_viiiiiiiiiiiiiiiiiiii=(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge,Ie,Ue,dt,Et,Yt,Vn,Wp)=>(r.dynCall_viiiiiiiiiiiiiiiiiiii=M.dynCall_viiiiiiiiiiiiiiiiiiii)(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge,Ie,Ue,dt,Et,Yt,Vn,Wp),r.dynCall_viiiiiiiiiiiiiiii=(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge,Ie,Ue,dt)=>(r.dynCall_viiiiiiiiiiiiiiii=M.dynCall_viiiiiiiiiiiiiiii)(i,l,p,h,y,S,k,B,U,G,Q,re,de,ge,Ie,Ue,dt),r.dynCall_iif=(i,l,p)=>(r.dynCall_iif=M.dynCall_iif)(i,l,p),r.dynCall_jiiii=(i,l,p,h,y)=>(r.dynCall_jiiii=M.dynCall_jiiii)(i,l,p,h,y),r.dynCall_jiii=(i,l,p,h)=>(r.dynCall_jiii=M.dynCall_jiii)(i,l,p,h),r.dynCall_viif=(i,l,p,h)=>(r.dynCall_viif=M.dynCall_viif)(i,l,p,h),r.dynCall_viiij=(i,l,p,h,y)=>(r.dynCall_viiij=M.dynCall_viiij)(i,l,p,h,y),r.dynCall_viiiijii=(i,l,p,h,y,S,k,B)=>(r.dynCall_viiiijii=M.dynCall_viiiijii)(i,l,p,h,y,S,k,B),r.dynCall_iiiiij=(i,l,p,h,y,S)=>(r.dynCall_iiiiij=M.dynCall_iiiiij)(i,l,p,h,y,S),r.dynCall_iiiiid=(i,l,p,h,y,S)=>(r.dynCall_iiiiid=M.dynCall_iiiiid)(i,l,p,h,y,S),r.dynCall_iiiiijj=(i,l,p,h,y,S,k)=>(r.dynCall_iiiiijj=M.dynCall_iiiiijj)(i,l,p,h,y,S,k),r.dynCall_iiiiiijj=(i,l,p,h,y,S,k,B)=>(r.dynCall_iiiiiijj=M.dynCall_iiiiiijj)(i,l,p,h,y,S,k,B);var qi=i=>(qi=M.wb)(i),ji=()=>(ji=M.xb)(),Ki=i=>(Ki=M.yb)(i),Zi=()=>(Zi=M.zb)();return function i(){if(0<ft)Nt=i;else if(u)t(r),Fe();else{for(;0<bn.length;)bn.shift()(r);0<ft?Nt=i:(r.calledRun=!0,Z||(Fe(),t(r)))}}(),r.PTR_SIZE=4,o},Qp=Ea,Yp=globalThis.self?.name?.startsWith("em-pthread");Yp&&Ea()});var Da,Yn,Xp,Le,Ba,Qn,Jp,em,Ma,tm,Oa,Ra,za,Ua,Tr=L(()=>{"use strict";Sr();Da=typeof location>"u"?void 0:location.origin,Yn=import.meta.url>"file:"&&import.meta.url<"file;",Xp=()=>{if(!!1){if(Yn){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,Da).href}return import.meta.url}},Le=Xp(),Ba=()=>{if(Le&&!Le.startsWith("blob:"))return Le.substring(0,Le.lastIndexOf("/")+1)},Qn=(e,t)=>{try{let n=t??Le;return(n?new URL(e,n):new URL(e)).origin===Da}catch{return!1}},Jp=(e,t)=>{let n=t??Le;try{return(n?new URL(e,n):new URL(e)).href}catch{return}},em=(e,t)=>`${t??"./"}${e}`,Ma=async e=>{let n=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(n)},tm=async e=>(await import(/*webpackIgnore:true*/e)).default,Oa=(Aa(),Xt(Ia)).default,Ra=async()=>{if(!Le)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Qn(Le))return[void 0,Oa()];let e=await Ma(Le);return[e,Oa(e)]},za=(Pa(),Xt(ka)).default,Ua=async(e,t,n,r)=>{let o=za&&!(e||t);if(o)if(Le)o=Qn(Le);else if(r&&!n)o=!0;else throw new Error("cannot determine the script source URL.");if(o)return[void 0,za];{let a="ort-wasm-simd-threaded.jsep.mjs",s=e??Jp(a,t),u=!!1&&n&&s&&!Qn(s,t),d=u?await Ma(s):s??em(a,t);return[u?d:void 0,await tm(d)]}}});var Xn,Jn,Dr,Na,rm,nm,om,Cr,_e,$t=L(()=>{"use strict";Tr();Jn=!1,Dr=!1,Na=!1,rm=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},nm=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},om=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Cr=async e=>{if(Jn)return Promise.resolve();if(Dr)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Na)throw new Error("previous call to 'initializeWebAssembly()' failed.");Dr=!0;let t=e.initTimeout,n=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!om())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!nm())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let r=rm();n>1&&!r&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=n=1);let o=e.wasmPaths,a=typeof o=="string"?o:void 0,s=o?.mjs,u=s?.href??s,d=o?.wasm,c=d?.href??d,m=e.wasmBinary,[f,g]=await Ua(u,a,n>1,!!m||!!c),_=!1,b=[];if(t>0&&b.push(new Promise(w=>{setTimeout(()=>{_=!0,w()},t)})),b.push(new Promise((w,x)=>{let v={numThreads:n};if(m)v.wasmBinary=m;else if(c||a)v.locateFile=$=>c??a+$;else if(u&&u.indexOf("blob:")!==0)v.locateFile=$=>new URL($,u).href;else if(f){let $=Ba();$&&(v.locateFile=T=>$+T)}g(v).then($=>{Dr=!1,Jn=!0,Xn=$,w(),f&&URL.revokeObjectURL(f)},$=>{Dr=!1,Na=!0,x($)})})),await Promise.race(b),_)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},_e=()=>{if(Jn&&Xn)return Xn;throw new Error("WebAssembly is not initialized yet.")}});var We,tr,ye,Br=L(()=>{"use strict";$t();We=(e,t)=>{let n=_e(),r=n.lengthBytesUTF8(e)+1,o=n._malloc(r);return n.stringToUTF8(e,o,r),t.push(o),o},tr=(e,t,n,r)=>{if(typeof e=="object"&&e!==null){if(n.has(e))throw new Error("Circular reference in options");n.add(e)}Object.entries(e).forEach(([o,a])=>{let s=t?t+o:o;if(typeof a=="object")tr(a,s+".",n,r);else if(typeof a=="string"||typeof a=="number")r(s,a.toString());else if(typeof a=="boolean")r(s,a?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof a}`)})},ye=e=>{let t=_e(),n=t.stackSave();try{let r=t.PTR_SIZE,o=t.stackAlloc(2*r);t._OrtGetLastError(o,o+r);let a=Number(t.getValue(o,r===4?"i32":"i64")),s=t.getValue(o+r,"*"),u=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${u}`)}finally{t.stackRestore(n)}}});var Va,La=L(()=>{"use strict";$t();Br();Va=e=>{let t=_e(),n=0,r=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let a=0;return e?.tag!==void 0&&(a=We(e.tag,r)),n=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,a),n===0&&ye("Can't create run options."),e?.extra!==void 0&&tr(e.extra,"",new WeakSet,(s,u)=>{let d=We(s,r),c=We(u,r);t._OrtAddRunConfigEntry(n,d,c)!==0&&ye(`Can't set a run config entry: ${s} - ${u}.`)}),[n,r]}catch(a){throw n!==0&&t._OrtReleaseRunOptions(n),r.forEach(s=>t._free(s)),a}}});var im,am,sm,Mr,um,Wa,Ga=L(()=>{"use strict";$t();Br();im=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},am=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},sm=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(e.enableMemPattern=!1)},Mr=(e,t,n,r)=>{let o=We(t,r),a=We(n,r);_e()._OrtAddSessionConfigEntry(e,o,a)!==0&&ye(`Can't set a session config entry: ${t} - ${n}.`)},um=async(e,t,n)=>{for(let r of t){let o=typeof r=="string"?r:r.name,a=[];switch(o){case"webnn":if(o="WEBNN",typeof r!="string"){let f=r?.deviceType;f&&Mr(e,"deviceType",f,n)}break;case"webgpu":if(o="JS",typeof r!="string"){let m=r;if(m?.preferredLayout){if(m.preferredLayout!=="NCHW"&&m.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${m.preferredLayout}`);Mr(e,"preferredLayout",m.preferredLayout,n)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let s=We(o,n),u=a.length,d=0,c=0;if(u>0){d=_e()._malloc(u*_e().PTR_SIZE),n.push(d),c=_e()._malloc(u*_e().PTR_SIZE),n.push(c);for(let m=0;m<u;m++)_e().setValue(d+m*_e().PTR_SIZE,a[m][0],"*"),_e().setValue(c+m*_e().PTR_SIZE,a[m][1],"*")}await _e()._OrtAppendExecutionProvider(e,s,d,c,u)!==0&&ye(`Can't append execution provider: ${o}.`)}},Wa=async e=>{let t=_e(),n=0,r=[],o=e||{};sm(o);try{let a=im(o.graphOptimizationLevel??"all"),s=am(o.executionMode??"sequential"),u=typeof o.logId=="string"?We(o.logId,r):0,d=o.logSeverityLevel??2;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log severity level is not valid: ${d}`);let c=o.logVerbosityLevel??0;if(!Number.isInteger(c)||c<0||c>4)throw new Error(`log verbosity level is not valid: ${c}`);let m=typeof o.optimizedModelFilePath=="string"?We(o.optimizedModelFilePath,r):0;if(n=t._OrtCreateSessionOptions(a,!!o.enableCpuMemArena,!!o.enableMemPattern,s,!!o.enableProfiling,0,u,d,c,m),n===0&&ye("Can't create session options."),o.executionProviders&&await um(n,o.executionProviders,r),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);Mr(n,"enableGraphCapture",o.enableGraphCapture.toString(),r)}if(o.freeDimensionOverrides)for(let[f,g]of Object.entries(o.freeDimensionOverrides)){if(typeof f!="string")throw new Error(`free dimension override name must be a string: ${f}`);if(typeof g!="number"||!Number.isInteger(g)||g<0)throw new Error(`free dimension override value must be a non-negative integer: ${g}`);let _=We(f,r);t._OrtAddFreeDimensionOverride(n,_,g)!==0&&ye(`Can't set a free dimension override: ${f} - ${g}.`)}return o.extra!==void 0&&tr(o.extra,"",new WeakSet,(f,g)=>{Mr(n,f,g,r)}),[n,r]}catch(a){throw n!==0&&t._OrtReleaseSessionOptions(n)!==0&&ye("Can't release session options."),r.forEach(s=>t._free(s)),a}}});var xt,Je,St,Gt,rr,Rr,Ur,eo,ee=L(()=>{"use strict";xt=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},Je=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},St=(e,t)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],r=typeof t=="number"?t:t.reduce((o,a)=>o*a,1);return n>0?Math.ceil(r*n):void 0},Gt=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},rr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Rr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Ur=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",eo=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}});var nr,to=L(()=>{"use strict";Sr();nr=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=Wn("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:n}=Wn("node:fs"),r=n(e),o=[];for await(let a of r)o.push(a);return new Uint8Array(Buffer.concat(o))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let n=t.headers.get("Content-Length"),r=n?parseInt(n,10):0;if(r<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let o=t.body.getReader(),a;try{a=new ArrayBuffer(r)}catch(u){if(u instanceof RangeError){let d=Math.ceil(r/65536);a=new WebAssembly.Memory({initial:d,maximum:d}).buffer}else throw u}let s=0;for(;;){let{done:u,value:d}=await o.read();if(u)break;let c=d.byteLength;new Uint8Array(a,s,c).set(d),s+=c}return new Uint8Array(a,0,r)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var lm,dm,Ha,Fa,Nr,cm,le,et=L(()=>{"use strict";ee();lm=["V","I","W","E","F"],dm=(e,t)=>{console.log(`[${lm[e]},${new Date().toISOString()}]${t}`)},Nr=(e,t)=>{Ha=e,Fa=t},cm=(e,t)=>{let n=rr(e),r=rr(Ha);n>=r&&dm(n,typeof t=="function"?t():t)},le=(...e)=>{Fa&&cm(...e)}});var ro,tt,E,Dt,Vr,qa,ja,ae=L(()=>{"use strict";ro=class{static calcMatMulShape(t,n){return t[1]!==n[0]?void 0:[t[0],n[1]]}},tt=class{static calcShape(t,n,r=!1){let o=t.length,a=n.length;if(o===0)return n;if(a===0)return t;let s=Math.max(t.length,n.length),u=new Array(s);if(r){if(o<2||a<2)return;let d=ro.calcMatMulShape([t[o-2],t[o-1]],[n[a-2],n[a-1]]);if(d===void 0)return;[u[s-2],u[s-1]]=d}for(let d=r?3:1;d<=s;d++){let c=o-d<0?1:t[o-d],m=a-d<0?1:n[a-d];if(c!==m&&c>1&&m>1)return;let f=Math.max(c,m);if(c&&m)u[s-d]=Math.max(c,m);else{if(f>1)return;u[s-d]=0}}return u}static isValidBroadcast(t,n){let r=t.length,o=n.length;if(r>o)return!1;for(let a=1;a<=r;a++)if(t[r-a]!==1&&t[r-a]!==n[o-a])return!1;return!0}},E=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,n=4){let r=t.length;if(r===0)return[];let o=new Array(r),a=r-1;for(;a>=0;){if(t[a]%n===0){o[a]=t[a]/n;break}if(n%t[a]!==0)throw new Error("cannot convert shape");o[a]=1,n/=t[a],a--}for(a--;a>=0;a--)o[a]=t[a];return o}static sizeFromDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(t,n,r){let o=1;for(let a=n;a<r;a++){if(t[a]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(t[a])}return o}static computeStrides(t){let n=t.length;if(n===0)return[];if(n===1)return[1];let r=new Array(n);r[n-1]=1,r[n-2]=t[n-1];for(let o=n-3;o>=0;--o)r[o]=r[o+1]*t[o+1];return r}static normalizeAxis(t,n){if(t<-n&&t>=n)throw new Error("unsupported axis for this operation.");return t<0?t+n:t}static normalizeAxes(t,n){return t.map(r=>this.normalizeAxis(r,n??t.length))}static sortBasedOnPerm(t,n){return n?n.map(r=>t[r]):t.slice().reverse()}static padShape(t,n){let r=t.length;return t.map((o,a)=>o+n[a]+n[a+r])}static areEqual(t,n){return t.length!==n.length?!1:t.every((r,o)=>r===n[o])}},Dt=class e{static adjustPoolAttributes(t,n,r,o,a,s){if(!t&&r.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<n.length-2;u++)u>=r.length?r.push(n[u+2]):r[u]=n[u+2];for(let u=0;u<r.length;u++)if(u<o.length){if(o[u]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let u=0;u<r.length;u++)if(u<a.length){if(a[u]<0)throw new Error("dilations should be greater than or equal to 1")}else a.push(1);for(let u=0;u<r.length*2;u++)if(u<s.length){if(s[u]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let u=0;u<r.length;u++){if(r[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[u]>=r[u]||s[u+r.length]>=r[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,n,r,o,a,s,u){if(u){if(a.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let d=0;d<t.length-2;d++)e.adjustPadAndReturnShape(t[d+(s?1:2)],n[d],r[d],o[d],a,d,d+t.length-2,u)}}static computePoolOutputShape(t,n,r,o,a,s,u){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let d=[n[0],n[1]];return e.computeShapeHelper(t,n,d,r,o,a,s,u),d}static computeConvOutputShape(t,n,r,o,a,s,u){if(t.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let d=[t[0],n[0]];return e.computeShapeHelper(!1,t,d,r,o,a,s,u),d}static computeShapeHelper(t,n,r,o,a,s,u,d){if(t)for(let c=0;c<n.length-2;c++)r.push(1);else for(let c=0;c<n.length-2;c++)r.push(e.adjustPadAndReturnShape(n[c+2],o[c],a[c],s[c],u,c,c+n.length-2,d))}static adjustPadAndReturnShape(t,n,r,o,a,s,u,d){let c=r*(o-1)+1;if(d&&d!=="NOTSET")switch(d){case"VALID":return a[s]=0,a[u]=0,Math.floor((t-c)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(r!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let f=((t+n-1)/n-1)*n+o-t;return a[s]=Math.floor(d==="SAME_LOWER"?(f+1)/2:f/2),a[u]=f-a[s],Math.floor((t+f-o)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+a[s]+a[u]-c)/n+1)}},Vr=class{static getShapeOfGemmResult(t,n,r,o,a){if(t.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let s,u,d;n?(s=t[1],u=t[0]):(s=t[0],u=t[1]);let c=-1;if(o?(d=r[0],c=1):(d=r[1],c=0),r[c]!==u)throw new Error("dimension mismatch");if(s<=0||d<=0||u<=0)throw new Error("invalid shape specified");if(a&&!tt.isValidBroadcast(a,[s,d]))throw new Error("gemm: invalid bias shape for broadcast");return[s,d,u]}},qa=-34028234663852886e22,ja=34028234663852886e22});var Lr,no=L(()=>{"use strict";ee();Lr=(e,t)=>new(Gt(t))(e)});var Za,io,Qa,pm,Ka,mm,Ya,Wr,Gr,oo,Xa,Ja=L(()=>{"use strict";ee();et();Za=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),io=(e,t)=>{if(t==="int32")return e;let n=Za.get(t);if(!n)throw new Error(`WebNN backend does not support data type: ${t}`);let r=n/8;if(e.byteLength%r!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${r}.`);let o=e.byteLength/r,a=new(Gt(t))(e.buffer,e.byteOffset,o);switch(t){case"int64":case"uint64":{let s=new Int32Array(o);for(let u=0;u<o;u++){let d=a[u];if(d>2147483647n||d<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[u]=Number(d)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&a.some(u=>u>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(a,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Qa=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let n=e.byteLength/4,r=new Int32Array(e.buffer,e.byteOffset,n);switch(t){case"int64":{let o=BigInt64Array.from(r,BigInt);return new Uint8Array(o.buffer)}case"uint64":{if(r.some(a=>a<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let o=BigUint64Array.from(r,BigInt);return new Uint8Array(o.buffer)}case"int8":{if(r.some(a=>a<-128||a>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let o=Int8Array.from(r,Number);return new Uint8Array(o.buffer)}case"uint8":{if(r.some(o=>o<0||o>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(r,Number)}case"uint32":{if(r.some(a=>a<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let o=Uint32Array.from(r,Number);return new Uint8Array(o.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},pm=1,Ka=()=>pm++,mm=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Ya=(e,t)=>{let n=Za.get(e);if(!n)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((r,o)=>r*o)*n/8):0},Wr=class{constructor(t){this.isDataConverted=!1;let{sessionId:n,context:r,tensor:o,dataType:a,shape:s,fallbackDataType:u}=t;this.sessionId=n,this.mlContext=r,this.mlTensor=o,this.dataType=a,this.tensorShape=s,this.fallbackDataType=u}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Ya(this.dataType,this.tensorShape)}destroy(){le("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(t){this.mlContext.writeTensor(this.mlTensor,t)}async read(t){if(this.fallbackDataType){let n=await this.mlContext.readTensor(this.mlTensor),r=Qa(new Uint8Array(n),this.dataType);if(t){(t instanceof ArrayBuffer?new Uint8Array(t):new Uint8Array(t.buffer,t.byteOffset,t.byteLength)).set(r);return}else return r.buffer}else return t?this.mlContext.readTensor(this.mlTensor,t):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(t,n,r){return this.mlContext===t&&this.dataType===n&&this.tensorShape.length===r.length&&this.tensorShape.every((o,a)=>o===r[a])}setIsDataConverted(t){this.isDataConverted=t}},Gr=class{constructor(t,n){this.tensorManager=t;this.wrapper=n}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(t,n,r,o){let a=this.tensorManager.getMLContext(t),s;if(!a.opSupportLimits().input.dataTypes.includes(n)){if(s=mm.get(n),!s||!a.opSupportLimits().input.dataTypes.includes(s))throw new Error(`WebNN backend does not support data type: ${n}`);le("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${n} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(a,n,r))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==Ya(n,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(t,n,r,u,!0,!0,s),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(t){let n=t;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")n=io(t,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(t.byteLength===this.wrapper.byteLength){this.wrapper.write(n);return}else le("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(n):this.activeUpload=new Uint8Array(n)}async download(t){if(this.activeUpload){let n=this.wrapper?.isDataConverted?Qa(this.activeUpload,this.wrapper?.type):this.activeUpload;if(t){t instanceof ArrayBuffer?new Uint8Array(t).set(n):new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(n);return}else return n.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return t?this.wrapper.read(t):this.wrapper.read()}},oo=class{constructor(t){this.backend=t;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}getMLContext(t){let n=this.backend.getMLContext(t);if(!n)throw new Error("MLContext not found for session.");return n}reserveTensorId(){let t=Ka();return this.tensorTrackersById.set(t,new Gr(this)),t}releaseTensorId(t){let n=this.tensorTrackersById.get(t);n&&(this.tensorTrackersById.delete(t),n.tensorWrapper&&this.releaseTensor(n.tensorWrapper))}async ensureTensor(t,n,r,o,a){le("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${n}, dataType: ${r}, shape: ${o}, copyOld: ${a}}`);let s=this.tensorTrackersById.get(n);if(!s)throw new Error("Tensor not found.");return s.ensureTensor(t,r,o,a)}upload(t,n){let r=this.tensorTrackersById.get(t);if(!r)throw new Error("Tensor not found.");r.upload(n)}async download(t,n){le("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${t}, dstBuffer: ${n?.byteLength}}`);let r=this.tensorTrackersById.get(t);if(!r)throw new Error("Tensor not found.");return r.download(n)}releaseTensorsForSession(t){for(let n of this.freeTensors)n.sessionId===t&&n.destroy();this.freeTensors=this.freeTensors.filter(n=>n.sessionId!==t)}registerTensor(t,n,r,o){let a=this.getMLContext(t),s=Ka(),u=new Wr({sessionId:t,context:a,tensor:n,dataType:r,shape:o});return this.tensorTrackersById.set(s,new Gr(this,u)),this.externalTensors.add(u),s}async getCachedTensor(t,n,r,o,a,s,u){let d=this.getMLContext(t);for(let[m,f]of this.freeTensors.entries())if(f.canReuseTensor(d,n,r)){le("verbose",()=>`[WebNN] Reusing tensor {dataType: ${n}, ${u?`fallbackDataType: ${u},`:""} shape: ${r}`);let g=this.freeTensors.splice(m,1)[0];return g.sessionId=t,g}le("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${n}, ${u?`fallbackDataType: ${u},`:""} shape: ${r}}`);let c=await d.createTensor({dataType:u??n,shape:r,dimensions:r,usage:o,writable:a,readable:s});return new Wr({sessionId:t,context:d,tensor:c,dataType:n,shape:r,fallbackDataType:u})}releaseTensor(t){this.externalTensors.has(t)&&this.externalTensors.delete(t),this.freeTensors.push(t)}},Xa=(...e)=>new oo(...e)});var Hr,fm,Fr,es=L(()=>{"use strict";ee();$t();no();Ja();et();Hr=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),fm=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let n=Object.keys(e).sort(),r=Object.keys(t).sort();return n.length===r.length&&n.every((o,a)=>o===r[a]&&e[o]===t[o])},Fr=class{constructor(t){this.tensorManager=Xa(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];this.sessionGraphInputs=new Map;this.sessionGraphOutputs=new Map;this.temporaryGraphInputs=[];this.temporaryGraphOutputs=[];this.temporarySessionTensorIds=new Map;Nr(t.logLevel,!!t.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(t){le("verbose",()=>`[WebNN] onRunStart {sessionId: ${t}}`),this.activeSessionId=t}onRunEnd(t){le("verbose",()=>`[WebNN] onRunEnd {sessionId: ${t}}`);let n=this.temporarySessionTensorIds.get(t);if(n){for(let r of n)le("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(t),this.activeSessionId=void 0}}async createMLContext(t){if(t instanceof GPUDevice){let r=this.mlContextCache.findIndex(o=>o.gpuDevice===t);if(r!==-1)return this.mlContextCache[r].mlContext;{let o=await navigator.ml.createContext(t);return this.mlContextCache.push({gpuDevice:t,mlContext:o}),o}}else if(t===void 0){let r=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let n=this.mlContextCache.findIndex(r=>fm(r.options,t));if(n!==-1)return this.mlContextCache[n].mlContext;{let r=await navigator.ml.createContext(t);return this.mlContextCache.push({options:t,mlContext:r}),r}}registerMLContext(t,n){this.mlContextBySessionId.set(t,n);let r=this.sessionIdsByMLContext.get(n);r||(r=new Set,this.sessionIdsByMLContext.set(n,r)),r.add(t),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(t,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(t,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(t){this.sessionGraphInputs.delete(t),this.sessionGraphOutputs.delete(t);let n=this.mlContextBySessionId.get(t);if(!n)return;this.tensorManager.releaseTensorsForSession(t),this.mlContextBySessionId.delete(t);let r=this.sessionIdsByMLContext.get(n);if(r.delete(t),r.size===0){this.sessionIdsByMLContext.delete(n);let o=this.mlContextCache.findIndex(a=>a.mlContext===n);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(t){return this.mlContextBySessionId.get(t)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(t){le("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t)}async ensureTensor(t,n,r,o,a){let s=Hr.get(r);if(!s)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(t??this.currentSessionId,n,s,o,a)}async createTemporaryTensor(t,n,r){le("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${n}, shape: ${r}}`);let o=Hr.get(n);if(!o)throw new Error(`Unsupported ONNX data type: ${n}`);let a=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(t,a,o,r,!1);let s=this.temporarySessionTensorIds.get(t);return s?s.push(a):this.temporarySessionTensorIds.set(t,[a]),a}uploadTensor(t,n){if(!_e().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");le("verbose",()=>`[WebNN] uploadTensor {tensorId: ${t}, data: ${n.byteLength}}`),this.tensorManager.upload(t,n)}async downloadTensor(t,n){return this.tensorManager.download(t,n)}createMLTensorDownloader(t,n){return async()=>{let r=await this.tensorManager.download(t);return Lr(r,n)}}registerMLTensor(t,n,r,o){let a=Hr.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);let s=this.tensorManager.registerTensor(t,n,a,o);return le("verbose",()=>`[WebNN] registerMLTensor {tensor: ${n}, dataType: ${a}, dimensions: ${o}} -> {tensorId: ${s}}`),s}registerMLConstant(t,n,r,o,a,s,u=!1){if(!s)throw new Error("External mounted files are not available.");let d=t;t.startsWith("./")&&(d=t.substring(2));let c=s.get(d);if(!c)throw new Error(`File with name ${d} not found in preloaded files.`);if(n+r>c.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let m=c.slice(n,n+r).buffer,f;switch(a.dataType){case"float32":f=new Float32Array(m);break;case"float16":f=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(m):new Uint16Array(m);break;case"int32":f=new Int32Array(m);break;case"uint32":f=new Uint32Array(m);break;case"int64":if(u){let g=io(new Uint8Array(m),"int64");f=new Int32Array(g.buffer),a.dataType="int32"}else f=new BigInt64Array(m);break;case"uint64":f=new BigUint64Array(m);break;case"int8":f=new Int8Array(m);break;case"int4":case"uint4":case"uint8":f=new Uint8Array(m);break;default:throw new Error(`Unsupported data type: ${a.dataType} in creating WebNN Constant from external data.`)}return le("verbose",()=>`[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}} ${u?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),o.constant(a,f)}registerGraphInput(t){this.temporaryGraphInputs.push(t)}registerGraphOutput(t){this.temporaryGraphOutputs.push(t)}isGraphInput(t,n){let r=this.sessionGraphInputs.get(t);return r?r.includes(n):!1}isGraphOutput(t,n){let r=this.sessionGraphOutputs.get(t);return r?r.includes(n):!1}isGraphInputOutputTypeSupported(t,n,r=!0){let o=this.mlContextBySessionId.get(t),a=Hr.get(xt(n));return typeof a>"u"?!1:r?!!o?.opSupportLimits().input.dataTypes.includes(a):!!o?.opSupportLimits().output.dataTypes.includes(a)}flush(){}}});var qr=L(()=>{"use strict"});var ts,ao,so,hm,gm,rs,lo,uo,os,is=L(()=>{"use strict";et();qr();ts=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),ao=[],so=e=>Math.ceil(Number(e)/16)*16,hm=e=>{for(let t=0;t<ao.length;t++){let n=ao[t];if(e<=n)return n}return Math.ceil(e/16)*16},gm=1,rs=()=>gm++,lo=async(e,t,n,r)=>{let o=so(n),a=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,a,0,o),e.flush(),await a.mapAsync(GPUMapMode.READ);let u=a.getMappedRange();if(r){let d=r();return d.set(new Uint8Array(u,0,n)),d}else return new Uint8Array(u.slice(0,n))}finally{a.destroy()}},uo=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[n]of ts)ao.push(n),this.freeBuffers.set(n,[]),this.freeUniformBuffers.set(n,[]);this.sessionCount=0}upload(t,n){let r=n.buffer,o=n.byteOffset,a=n.byteLength,s=so(a),u=this.storageCache.get(t);if(!u)throw new Error("gpu data for uploading does not exist");if(Number(u.originalSize)!==a)throw new Error(`inconsistent data size. gpu data size=${u.originalSize}, data size=${a}`);let d=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),c=d.getMappedRange();new Uint8Array(c).set(new Uint8Array(r,o,a)),d.unmap();let m=this.backend.device.createCommandEncoder();m.copyBufferToBuffer(d,0,u.gpuData.buffer,0,s),this.backend.device.queue.submit([m.finish()]),d.destroy(),le("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`)}memcpy(t,n){let r=this.storageCache.get(t);if(!r)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(n);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let a=so(r.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(r.gpuData.buffer,0,o.gpuData.buffer,0,a)}registerExternalBuffer(t,n,r){let o;if(r){if(o=r[0],t===r[1])return le("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=rs();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:t},originalSize:n}),le("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, registered.`),o}unregisterExternalBuffer(t){t!==void 0&&(this.storageCache.delete(t),le("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(t,n=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=hm(t),o,a=(n&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(n&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||s){let c=(a?this.freeBuffers:this.freeUniformBuffers).get(r);c?c.length>0?o=c.pop():o=this.backend.device.createBuffer({size:r,usage:n}):o=this.backend.device.createBuffer({size:r,usage:n})}else o=this.backend.device.createBuffer({size:r,usage:n});let u={id:rs(),type:0,buffer:o};return this.storageCache.set(u.id,{gpuData:u,originalSize:Number(t)}),le("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${u.id}`),u}get(t){return this.storageCache.get(t)?.gpuData}release(t){let n=typeof t=="bigint"?Number(t):t,r=this.storageCache.get(n);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return le("verbose",()=>`[WebGPU] GpuDataManager.release(id=${n}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(n),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(t,n){let r=this.storageCache.get(Number(t));if(!r)throw new Error("data does not exist");await lo(this.backend,r.gpuData.buffer,r.originalSize,n)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let n=ts.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(t.size)||[];n===void 0||r.length>=n?t.destroy():r.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(t.size)||[];n===void 0||r.length>=n?t.destroy():r.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let n of this.buffersPending)t.push(n);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(n=>{n.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(n=>{n.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(n=>{n.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(t){let n=this.capturedPendingBuffers.get(t);n&&(n.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(t)),this.sessionCount-=1,this.sessionCount===0&&(le("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},os=(...e)=>new uo(...e)});var co,te,Se=L(()=>{"use strict";co=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},te=e=>new co(e)});var Bt,mo,ve,ke,W,he,fo,Mt,je,K,jr,P,N,as,Kr,po,ss,ue=L(()=>{"use strict";ee();ae();Bt=64,mo=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},ve=(e,t=1)=>{let n=mo(e,t);return typeof n=="string"?n:n[0]},ke=(e,t=1)=>{let n=mo(e,t);return typeof n=="string"?n:n[1]},W=(...e)=>{let t=[];return e.forEach(n=>{n.length!==0&&t.push({type:12,data:n},{type:12,data:E.computeStrides(n)})}),t},he=e=>e%4===0?4:e%2===0?2:1,fo=(e="f32",t,n="0")=>!t||t===1?`${e}(${n})`:`vec${t}<${e}>(${n})`,Mt=(e,t,n)=>e==="f32"?n:t===1?`f32(${n})`:`vec${t}<f32>(${n})`,je=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,K=(e,t,n,r)=>e.startsWith("uniforms.")&&n>4?typeof t=="string"?r==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:r==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:n>1?`${e}[${t}]`:e,jr=(e,t,n,r,o)=>{let a=typeof n=="number",s=a?n:n.length,u=[...new Array(s).keys()],d=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,c=mo(t,o),m=typeof c=="string"?c:c[1],f=typeof c=="string"?c:c[0],g={indices:d,value:m,storage:f,tensor:t},_=V=>typeof V=="string"?V:`${V}u`,b={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},w=a?"uniforms.":"",x=`${w}${e}_shape`,v=`${w}${e}_strides`,$="";for(let V=0;V<s-1;V++)$+=`
    let dim${V} = current / ${K(v,V,s)};
    let rest${V} = current % ${K(v,V,s)};
    indices[${V}] = dim${V};
    current = rest${V};
    `;$+=`indices[${s-1}] = current;`;let T=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${g.indices} {
    var indices: ${g.indices};
    var current = offset;
    ${$}
    return indices;
  }`,C=V=>(b.offsetToIndices=!0,s<2?V:`o2i_${e}(${V})`),A=[];if(s>=2)for(let V=s-1;V>=0;V--)A.push(`${K(v,V,s)} * (indices[${V}])`);let I=s<2?"":`
  fn i2o_${e}(indices: ${g.indices}) -> u32 {
    return ${A.join("+")};
  }`,z=V=>(b.indicesToOffset=!0,s<2?V:`i2o_${e}(${V})`),D=(...V)=>s===0?"0u":`${g.indices}(${V.map(_).join(",")})`,R=(V,O)=>s<2?`${V}`:`${K(V,O,s)}`,H=(V,O,X)=>s<2?`${V}=${X};`:`${K(V,O,s)}=${X};`,q={},Y=(V,O)=>{b.broadcastedIndicesToOffset=!0;let X=`${O.name}broadcastedIndicesTo${e}Offset`;if(X in q)return`${X}(${V})`;let ze=[];for(let Oe=s-1;Oe>=0;Oe--){let xe=O.indicesGet("outputIndices",Oe+O.rank-s);ze.push(`${R(v,Oe)} * (${xe} % ${R(x,Oe)})`)}return q[X]=`fn ${X}(outputIndices: ${O.type.indices}) -> u32 {
             return ${ze.length>0?ze.join("+"):"0u"};
           }`,`${X}(${V})`},ne=(V,O)=>(()=>{if(g.storage===g.value)return`${e}[${V}]=${O};`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`${e}[${V}]=vec2<u32>(u32(${O}), select(0u, 0xFFFFFFFFu, ${O} < 0));`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`${e}[${V}]=vec2<u32>(u32(${O}), 0u);`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`${e}[${V}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${O}));`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),F=V=>(()=>{if(g.storage===g.value)return`${e}[${V}]`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`i32(${e}[${V}].x)`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`u32(${e}[${V}].x)`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${V}] & 0xFFu), bool(${e}[${V}] & 0xFF00u), bool(${e}[${V}] & 0xFF0000u), bool(${e}[${V}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),me=s<2?"":`
  fn get_${e}ByIndices(indices: ${g.indices}) -> ${m} {
    return ${F(`i2o_${e}(indices)`)};
  }`,oe=s<2?"":(()=>{let V=u.map(X=>`d${X}: u32`).join(", "),O=u.map(X=>`d${X}`).join(", ");return`
  fn get_${e}(${V}) -> ${m} {
    return get_${e}ByIndices(${D(O)});
  }`})(),j=(...V)=>{if(V.length!==s)throw new Error(`indices length must be ${s}`);let O=V.map(_).join(",");return s===0?F("0u"):s===1?F(O[0]):(b.get=!0,b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}(${O})`)},ie=V=>s<2?F(V):(b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}ByIndices(${V})`),Z=s<2?"":`
  fn set_${e}ByIndices(indices: ${g.indices}, value: ${m}) {
    ${ne(`i2o_${e}(indices)`,"value")}
  }`,ce=s<2?"":(()=>{let V=u.map(X=>`d${X}: u32`).join(", "),O=u.map(X=>`d${X}`).join(", ");return`
  fn set_${e}(${V}, value: ${m}) {
    set_${e}ByIndices(${D(O)}, value);
  }`})();return{impl:()=>{let V=[],O=!1;return b.offsetToIndices&&(V.push(T),O=!0),b.indicesToOffset&&(V.push(I),O=!0),b.broadcastedIndicesToOffset&&(Object.values(q).forEach(X=>V.push(X)),O=!0),b.set&&(V.push(ce),O=!0),b.setByIndices&&(V.push(Z),O=!0),b.get&&(V.push(oe),O=!0),b.getByIndices&&(V.push(me),O=!0),!a&&O&&V.unshift(`const ${x} = ${g.indices}(${n.join(",")});`,`const ${v} = ${g.indices}(${E.computeStrides(n).join(",")});`),V.join(`
`)},type:g,offsetToIndices:C,indicesToOffset:z,broadcastedIndicesToOffset:Y,indices:D,indicesGet:R,indicesSet:H,set:(...V)=>{if(V.length!==s+1)throw new Error(`indices length must be ${s}`);let O=V[s];if(typeof O!="string")throw new Error("value must be string");let X=V.slice(0,s).map(_).join(",");return s===0?ne("0u",O):s===1?ne(X[0],O):(b.set=!0,b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}(${X}, ${O})`)},setByOffset:ne,setByIndices:(V,O)=>s<2?ne(V,O):(b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}ByIndices(${V}, ${O});`),get:j,getByOffset:F,getByIndices:ie,usage:r,name:e,strides:v,shape:x,rank:s}},P=(e,t,n,r=1)=>jr(e,t,n,"input",r),N=(e,t,n,r=1)=>jr(e,t,n,"output",r),as=(e,t,n)=>jr(e,t,n,"atomicOutput",1),Kr=(e,t,n,r=1)=>jr(e,t,n,"internal",r),po=class{constructor(t,n){this.normalizedDispatchGroup=t;this.limits=n;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=Bt){let n=typeof t=="number"?t:t[0],r=typeof t=="number"?1:t[1],o=typeof t=="number"?1:t[2];if(n>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${n}, ${r}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(n*r*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${n}, ${r}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,u=a?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${n*r*o}u + local_idx;`;return`@compute @workgroup_size(${n}, ${r}, ${o})
  fn main(${s}) {
    ${u}
  `}appendVariableUniforms(t){t.rank!==0&&(t.shape.startsWith("uniforms.")&&this.uniforms.push({name:t.shape.replace("uniforms.",""),type:"u32",length:t.rank}),t.strides.startsWith("uniforms.")&&this.uniforms.push({name:t.strides.replace("uniforms.",""),type:"u32",length:t.rank}))}declareVariable(t,n){if(t.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(t),this.appendVariableUniforms(t);let r=t.usage==="input"?"read":"read_write",o=t.usage==="atomicOutput"?"atomic<i32>":t.type.storage;return`@group(0) @binding(${n}) var<storage, ${r}> ${t.name}: array<${o}>;`}declareVariables(...t){return t.map(n=>this.declareVariable(n,this.variableIndex++)).join(`
`)}registerInternalVariable(t){if(t.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(t),this.appendVariableUniforms(t)}registerInternalVariables(...t){return t.forEach(n=>this.registerInternalVariable(n)),this}registerUniform(t,n,r=1){return this.uniforms.push({name:t,type:n,length:r}),this}registerUniforms(t){return this.uniforms=this.uniforms.concat(t),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let t=[];for(let{name:n,type:r,length:o}of this.uniforms)if(o&&o>4)r==="f16"?t.push(`@align(16) ${n}:array<mat2x4<${r}>, ${Math.ceil(o/8)}>`):t.push(`${n}:array<vec4<${r}>, ${Math.ceil(o/4)}>`);else{let a=o==null||o===1?r:`vec${o}<${r}>`;t.push(`${n}:${a}`)}return`
      struct Uniforms { ${t.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(t=>t.impl()).join(`
`)+this.internalVariables.map(t=>t.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=n=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(n)];return this.uniforms.map(n=>[t(n.type),n.length??1])}},ss=(e,t)=>new po(e,t)});var ym,us,bm,_m,wm,vm,Pe,ls,ds,ct=L(()=>{"use strict";ee();ae();Se();ue();ym=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},us=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),bm=(e,t)=>E.sortBasedOnPerm(e,us(e.length,t)),_m=(e,t,n,r)=>{let o=`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let a=0;a<t;++a)o+=`a[${e[a]}]=i[${a}];`;return o+="return a;}"},wm=(e,t)=>{let n=[],r=[];for(let o=0;o<e.length;++o)e[o]!==1&&n.push(e[o]),e[t[o]]!==1&&r.push(t[o]);return{newShape:n,newPerm:r}},vm=(e,t)=>{let n=0;for(let r=0;r<e.length;++r)if(t[e[r]]!==1){if(e[r]<n)return!1;n=e[r]}return!0},Pe=(e,t)=>{let n=e.dataType,r=e.dims.length,o=us(r,t),a=bm(e.dims,o),s=e.dims,u=a,d=r<2||vm(o,e.dims),c;if(d)return c=w=>{let x=P("input",n,s,4),v=N("output",n,u,4);return`
  ${w.registerUniform("output_size","u32").declareVariables(x,v)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let w=E.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64/4)},programUniforms:[{type:12,data:Math.ceil(w/4)}]}},getShaderSource:c};let{newShape:m,newPerm:f}=wm(e.dims,o),g=E.areEqual(f,[2,3,1]),_=E.areEqual(f,[3,1,2]);if(m.length===2||g||_){s=g?[m[0],m[1]*m[2]]:_?[m[0]*m[1],m[2]]:m,u=[s[1],s[0]];let w=16;return c=x=>{let v=P("a",n,s.length),$=N("output",n,u.length);return`
  ${x.registerUniform("output_size","u32").declareVariables(v,$)}
  var<workgroup> tile : array<array<${$.type.value}, ${w+1}>, ${w}>;
  ${x.mainStart([w,w,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${w} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${w}u + local_id.x;
    let input_row = workgroup_id_x * ${w}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${v.getByIndices(`${v.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${w}u + local_id.x;
    let output_row = workgroup_id_y * ${w}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${$.setByIndices(`${$.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let x=E.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/w),y:Math.ceil(u[0]/w)},programUniforms:[{type:12,data:x},...W(s,u)]}},getShaderSource:c}}return c=w=>{let x=P("a",n,s.length),v=N("output",n,u.length);return`
  ${w.registerUniform("output_size","u32").declareVariables(x,v)}

  ${_m(o,r,x,v)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${v.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${v.setByOffset("global_idx",x.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let w=E.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...W(s,u)]}},getShaderSource:c}},ls=(e,t)=>{ym(e.inputs,t.perm),e.compute(Pe(e.inputs[0],t.perm))},ds=e=>te({perm:e.perm})});var $m,xm,Sm,Tm,Cm,Im,Am,Em,km,Pm,rt,cs,ps,ms,fs,hs,gs,ys,bs,_s,ws,vs=L(()=>{"use strict";ee();ae();ue();Zr();ct();$m={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},xm={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Sm={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Tm={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Cm=(e,t)=>{let n=[];for(let r=t-e;r<t;++r)n.push(r);return n},Im=(e,t)=>{let n=[],r=e.length;for(let a=0;a<r;a++)t.indexOf(a)===-1&&n.push(e[a]);let o=t.map(a=>e[a]);return[n,o]},Am=(e,t)=>{let n=e.length+t.length,r=[],o=0;for(let a=0;a<n;a++)t.indexOf(a)===-1?r.push(e[o++]):r.push(1);return r},Em=(e,t)=>{for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0},km=(e,t)=>{let n=[];if(!Em(e,t)){for(let r=0;r<t;++r)e.indexOf(r)===-1&&n.push(r);e.forEach(r=>n.push(r))}return n},Pm=(e,t,n,r,o,a,s)=>{let u=n[0].dims,d=E.size(a),c=E.size(s),m=P("_A",n[0].dataType,u),f=N("output",o,a),g=64;d===1&&(g=256);let _=`
          var<workgroup> aBestValues : array<f32, ${g}>;
       `,b=w=>`
        ${w.registerUniform("reduceSize","u32").declareVariables(m,f)}
        ${_}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${w.mainStart(g)}

          let outputIndex = global_idx / ${g};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Sm[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${g}) {
           let candidate = f32(${m.getByOffset("offset + k")});
           bestValue = ${$m[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${g}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${xm[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${f.setByOffset("outputIndex",`${r==="mean"?`${f.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${f.type.storage}(${Tm[r]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${g}`,inputDependencies:["type"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:d},programUniforms:[{type:12,data:c}]})}},rt=(e,t,n,r)=>{let o=e.inputs.length===1?n:ho(e.inputs,n),a=o.axes;a.length===0&&!o.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((_,b)=>b));let s=E.normalizeAxes(a,e.inputs[0].dims.length),u=s,d=e.inputs[0],c=km(u,e.inputs[0].dims.length);c.length>0&&(d=e.compute(Pe(e.inputs[0],c),{inputs:[0],outputs:[-1]})[0],u=Cm(u.length,d.dims.length));let[m,f]=Im(d.dims,u),g=m;o.keepDims&&(g=Am(m,s)),e.compute(Pm(t,o.cacheKey,[d],r,e.inputs[0].dataType,g,f),{inputs:[d]})},cs=(e,t)=>{rt(e,"ReduceMeanShared",t,"mean")},ps=(e,t)=>{rt(e,"ReduceL1Shared",t,"l1")},ms=(e,t)=>{rt(e,"ReduceL2Shared",t,"l2")},fs=(e,t)=>{rt(e,"ReduceLogSumExpShared",t,"logSumExp")},hs=(e,t)=>{rt(e,"ReduceMaxShared",t,"max")},gs=(e,t)=>{rt(e,"ReduceMinShared",t,"min")},ys=(e,t)=>{rt(e,"ReduceProdShared",t,"prod")},bs=(e,t)=>{rt(e,"ReduceSumShared",t,"sum")},_s=(e,t)=>{rt(e,"ReduceSumSquareShared",t,"sumSquare")},ws=(e,t)=>{rt(e,"ReduceLogSumShared",t,"logSum")}});var nt,Om,Qr,ho,ot,zm,Dm,Bm,Mm,Rm,Um,Nm,Vm,Lm,Wm,it,$s,xs,Ss,Ts,Cs,Is,As,Es,ks,Ps,Zr=L(()=>{"use strict";ee();ae();Se();ue();vs();nt=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},Om=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Qr=(e,t,n,r,o,a,s=!1,u=!1)=>{let d=[],c=n[0].dims,m=c.length,f=E.normalizeAxes(o,m),g=!u&&f.length===0;c.forEach((x,v)=>{g||f.indexOf(v)>=0?s&&d.push(1):d.push(x)});let _=d.length,b=E.size(d);return{name:e,shaderCache:t,getShaderSource:x=>{let v=[],$=P("_A",n[0].dataType,m),T=N("output",a,_),C=r($,T,f),A=C[2];for(let I=0,z=0;I<m;I++)g||f.indexOf(I)>=0?(s&&z++,A=`for(var j${I}: u32 = 0; j${I} < ${c[I]}; j${I}++) {
                  ${C[2].includes("last_index")?`let last_index = j${I};`:""}
                  ${$.indicesSet("input_indices",I,`j${I}`)}
                  ${A}
                }`):(v.push(`${$.indicesSet("input_indices",I,T.indicesGet("output_indices",z))};`),z++);return`

        ${x.registerUniform("output_size","u32").declareVariables($,T)}

        ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${$.type.indices};
          let output_indices = ${T.offsetToIndices("global_idx")};

          ${v.join(`
`)}
          ${C[0]}       // init ops for reduce max/min
          ${C[1]}
          ${A}
          ${C[3]}
          ${C.length===4?T.setByOffset("global_idx","value"):C.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:d,dataType:a}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...W(c,d)]})}},ho=(e,t)=>{let n=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(r=>n.push(Number(r))),te({axes:n,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},ot=(e,t,n,r)=>{let o=e.inputs,a=o.length===1?n:ho(o,n);e.compute(Qr(t,{hint:a.cacheKey,inputDependencies:["rank"]},[o[0]],a.noopWithEmptyAxes&&a.axes.length===0?Om:r,a.axes,o[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},zm=(e,t)=>{nt(e.inputs),ot(e,"ReduceLogSum",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},Dm=(e,t)=>{nt(e.inputs),ot(e,"ReduceL1",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},Bm=(e,t)=>{nt(e.inputs),ot(e,"ReduceL2",t,(r,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Mm=(e,t)=>{nt(e.inputs),ot(e,"ReduceLogSumExp",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},Rm=(e,t)=>{nt(e.inputs),ot(e,"ReduceMax",t,(r,o,a)=>{let s=[];for(let u=0;u<r.rank;u++)(a.indexOf(u)>=0||a.length===0)&&s.push(r.indicesSet("input_indices",u,0));return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},Um=(e,t)=>{nt(e.inputs),ot(e,"ReduceMean",t,(r,o,a)=>{let s=1;for(let u=0;u<r.rank;u++)(a.indexOf(u)>=0||a.length===0)&&(s*=e.inputs[0].dims[u]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${s});`]})},Nm=(e,t)=>{nt(e.inputs),ot(e,"ReduceMin",t,(r,o,a)=>{let s=[];for(let u=0;u<r.rank;u++)(a.indexOf(u)>=0||a.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},Vm=(e,t)=>{nt(e.inputs),ot(e,"ReduceProd",t,(r,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},Lm=(e,t)=>{nt(e.inputs),ot(e,"ReduceSum",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},Wm=(e,t)=>{nt(e.inputs),ot(e,"ReduceSumSquare",t,(r,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},it=(e,t,n)=>{if(t.length===0)return n;let r=1,o=1;for(let a=0;a<t.length;a++)t.indexOf(a)===-1?r*=e[a]:o*=e[a];return o<32&&r>1024},$s=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Um(e,t):cs(e,t)},xs=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Dm(e,t):ps(e,t)},Ss=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Bm(e,t):ms(e,t)},Ts=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Mm(e,t):fs(e,t)},Cs=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Rm(e,t):hs(e,t)},Is=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Nm(e,t):gs(e,t)},As=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Vm(e,t):ys(e,t)},Es=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Lm(e,t):bs(e,t)},ks=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Wm(e,t):_s(e,t)},Ps=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?zm(e,t):ws(e,t)}});var Os,zs,Ds,go,Bs=L(()=>{"use strict";ee();Se();Zr();Os=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},zs=(e,t)=>{Os(e.inputs);let n=(r,o,a)=>{let s=[];for(let u=0;u<r.rank;u++)(a.indexOf(u)>=0||a.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Qr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},Ds=(e,t)=>{Os(e.inputs);let n=(r,o,a)=>{let s=[];for(let u=0;u<r.rank;u++)(a.indexOf(u)>=0||a.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Qr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},go=e=>te(e)});var Gm,yo,Hm,Fm,qm,Ht,jm,Ms,Yr=L(()=>{"use strict";ee();ae();qr();ue();Gm=(e,t)=>{let n=e[0],r=e[1],o=e[2],a=e[3],s=e[4],u=e[5];if(s&&u)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let d=n.dims[0],c=n.dims[1],m=n.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(r.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(r.dims[0]!==m)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==r.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let f=o.dims[0]/3,g=f,_=g;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let T of t.qkvHiddenSizes)if(T%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");f=t.qkvHiddenSizes[0],g=t.qkvHiddenSizes[1],_=t.qkvHiddenSizes[2]}let b=c;if(f!==g)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==f+g+_)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let w=0;if(s){if(g!==_)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==d)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==g/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(w=s.dims[3])}let x=b+w,v=-1,$=0;if(a)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==d||u.dims[1]!==t.numHeads||u.dims[2]!==c||u.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:c,pastSequenceLength:w,kvSequenceLength:b,totalSequenceLength:x,maxSequenceLength:v,inputHiddenSize:m,hiddenSize:f,vHiddenSize:_,headSize:Math.floor(f/t.numHeads),vHeadSize:Math.floor(_/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:$,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},yo=(e,t,n)=>t&&e?`
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
    `,Hm=(e,t,n,r,o,a,s,u)=>{let d=he(s?1:a),c=64,m=a/d;m<c&&(c=32);let f=Math.ceil(a/d/c),g=[{type:12,data:t},{type:12,data:n},{type:12,data:r},{type:12,data:o},{type:12,data:m},{type:12,data:f}],_=ve(e.dataType,d),b=ke(1,d),w=["type"];s&&w.push("type"),u&&w.push("type");let x=v=>{let $=N("x",e.dataType,e.dims,d),T=[$],C=s?P("seq_lens",s.dataType,s.dims):void 0;C&&T.push(C);let A=u?P("total_sequence_length_input",u.dataType,u.dims):void 0;A&&T.push(A);let I=ke(e.dataType),z=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${c}>;
  var<workgroup> thread_sum: array<f32, ${c}>;
  ${v.registerUniforms(z).declareVariables(...T)}
  ${v.mainStart([c,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${yo(C,A,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${c}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${b}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${b}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(d){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${c}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${b}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${b}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(d){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${c}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${$.type.value}(${I}(1.0) / ${I}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${b}(x[offset + i]);
        x[offset + i] = ${$.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${$.type.value}(${I}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${c};${_};${d}`,inputDependencies:w},getShaderSource:x,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:o,z:t*n},programUniforms:g})}},Fm=(e,t,n,r,o,a,s,u,d)=>{let c=s+a.kvSequenceLength,m=[a.batchSize,a.numHeads,a.sequenceLength,c],f=e>1&&r,g=a.kvNumHeads?a.kvNumHeads:a.numHeads,_=f?[a.batchSize,g,c,a.headSize]:void 0,b=a.nReps?a.nReps:1,w=a.scale===0?1/Math.sqrt(a.headSize):a.scale,x=he(a.headSize),v=a.headSize/x,$=12,T={x:Math.ceil(c/$),y:Math.ceil(a.sequenceLength/$),z:a.batchSize*a.numHeads},C=[{type:12,data:a.sequenceLength},{type:12,data:v},{type:12,data:c},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:w},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:b}],A=f&&r&&E.size(r.dims)>0,I=["type","type"];A&&I.push("type"),o&&I.push("type"),u&&I.push("type"),d&&I.push("type");let z=[{dims:m,dataType:t.dataType,gpuDataType:0}];f&&z.push({dims:_,dataType:t.dataType,gpuDataType:0});let D=R=>{let H=P("q",t.dataType,t.dims,x),q=P("key",n.dataType,n.dims,x),Y=[H,q];if(A){let Z=P("past_key",r.dataType,r.dims,x);Y.push(Z)}o&&Y.push(P("attention_bias",o.dataType,o.dims));let ne=u?P("seq_lens",u.dataType,u.dims):void 0;ne&&Y.push(ne);let F=d?P("total_sequence_length_input",d.dataType,d.dims):void 0;F&&Y.push(F);let me=N("output",t.dataType,m),oe=[me];f&&oe.push(N("present_key",t.dataType,_,x));let j=ke(1,x),ie=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${$}u;

  var<workgroup> tileQ: array<${H.type.storage}, ${$*$}>;
  var<workgroup> tileK: array<${H.type.storage}, ${$*$}>;
  ${R.registerUniforms(ie).declareVariables(...Y,...oe)}
  ${R.mainStart([$,$,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${b===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${b===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${yo(ne,F,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${A&&f?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${f?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${j}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${A&&f?`
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
          value += ${j}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(x){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${x}`)}})()};
        output[outputIdx] = ${me.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${x};${o!==void 0};${r!==void 0};${e}`,inputDependencies:I},getRunData:()=>({outputs:z,dispatchGroup:T,programUniforms:C}),getShaderSource:D}},qm=(e,t,n,r,o,a,s=void 0,u=void 0)=>{let d=a+o.kvSequenceLength,c=o.nReps?o.nReps:1,m=o.vHiddenSize*c,f=e>1&&r,g=o.kvNumHeads?o.kvNumHeads:o.numHeads,_=f?[o.batchSize,g,d,o.headSize]:void 0,b=[o.batchSize,o.sequenceLength,m],w=12,x={x:Math.ceil(o.vHeadSize/w),y:Math.ceil(o.sequenceLength/w),z:o.batchSize*o.numHeads},v=[{type:12,data:o.sequenceLength},{type:12,data:d},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:m},{type:12,data:a},{type:12,data:o.kvSequenceLength},{type:12,data:c}],$=f&&r&&E.size(r.dims)>0,T=["type","type"];$&&T.push("type"),s&&T.push("type"),u&&T.push("type");let C=[{dims:b,dataType:t.dataType,gpuDataType:0}];f&&C.push({dims:_,dataType:t.dataType,gpuDataType:0});let A=I=>{let z=P("probs",t.dataType,t.dims),D=P("v",n.dataType,n.dims),R=[z,D];$&&R.push(P("past_value",r.dataType,r.dims));let H=s?P("seq_lens",s.dataType,s.dims):void 0;s&&R.push(H);let q=u?P("total_sequence_length_input",u.dataType,u.dims):void 0;u&&R.push(q);let ne=[N("output",t.dataType,b)];f&&ne.push(N("present_value",t.dataType,_));let F=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;
  var<workgroup> tileQ: array<${z.type.value}, ${w*w}>;
  var<workgroup> tileV: array<${z.type.value}, ${w*w}>;
  ${I.registerUniforms(F).declareVariables(...R,...ne)}
  ${I.mainStart([w,w,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${c===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${c===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${yo(H,q,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${$&&f?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${f?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${z.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${$&&f?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${r!==void 0};${e}`,inputDependencies:T},getRunData:()=>({outputs:C,dispatchGroup:x,programUniforms:v}),getShaderSource:A}},Ht=(e,t,n,r,o,a,s,u,d,c,m=void 0,f=void 0)=>{let g=Math.min(e.outputCount,1+(s?1:0)+(u?1:0)),_=g>1?c.pastSequenceLength:0,b=_+c.kvSequenceLength,w=d&&E.size(d.dims)>0?d:void 0,x=[t,n];g>1&&s&&E.size(s.dims)>0&&x.push(s),w&&x.push(w),m&&x.push(m),f&&x.push(f);let v=e.compute(Fm(g,t,n,s,w,c,_,m,f),{inputs:x,outputs:g>1?[-1,1]:[-1]})[0];e.compute(Hm(v,c.batchSize,c.numHeads,_,c.sequenceLength,b,m,f),{inputs:m&&f?[v,m,f]:[v],outputs:[]});let $=[v,r];g>1&&u&&E.size(u.dims)>0&&$.push(u),m&&$.push(m),f&&$.push(f),e.compute(qm(g,v,r,u,c,_,m,f),{inputs:$,outputs:g>1?[0,2]:[0]})},jm=(e,t)=>{let n=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],r=t.sequenceLength,o=t.inputHiddenSize,a=t.headSize,s=12,u={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},d=[e.inputs[0],e.inputs[1],e.inputs[2]],c=[{type:12,data:r},{type:12,data:o},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],m=f=>{let g=N("output_q",d[0].dataType,n),_=N("output_k",d[0].dataType,n),b=N("output_v",d[0].dataType,n),w=P("input",d[0].dataType,d[0].dims),x=P("weight",d[1].dataType,d[1].dims),v=P("bias",d[2].dataType,d[2].dims),$=w.type.storage,T=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${$}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${$}, ${s*s}>;
  var<workgroup> tileWeightK: array<${$}, ${s*s}>;
  var<workgroup> tileWeightV: array<${$}, ${s*s}>;
  ${f.registerUniforms(T).declareVariables(w,x,v,g,_,b)}
  ${f.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${$}(0);
    var valueK = ${$}(0);
    var valueV = ${$}(0);
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:c}),getShaderSource:m},{inputs:d,outputs:[-1,-1,-1]})},Ms=(e,t)=>{let n=Gm(e.inputs,t),[r,o,a]=jm(e,n);return Ht(e,r,o,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],n)}});var Km,Zm,Qm,Rs,Us=L(()=>{"use strict";Ve();ee();ae();Se();ue();Km=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(r,o,a)=>{let s=o.length;if(s!==r.length)throw new Error(`${a}: num dimensions != ${s}`);o.forEach((u,d)=>{if(u!==r[d])throw new Error(`${a}: dim[${d}] do not match`)})};if(e[0].dims.length>1){let r=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);n(e[1].dims,r,"Invalid input scale"),n(e[2].dims,r,"Invalid input B"),n(e[3].dims,r,"Invalid input mean"),n(e[4].dims,r,"Invalid input var")}else n(e[1].dims,[1],"Invalid input scale"),n(e[2].dims,[1],"Invalid input B"),n(e[3].dims,[1],"Invalid input mean"),n(e[4].dims,[1],"Invalid input var")},Zm=(e,t)=>{let{epsilon:n,spatial:r,format:o}=t,a=e[0].dims,s=r?he(a[a.length-1]):1,u=o==="NHWC"&&a.length>1?s:1,d=E.size(a)/s,c=r,m=c?a.length:a,f=P("x",e[0].dataType,e[0].dims,s),g=P("scale",e[1].dataType,e[1].dims,u),_=P("bias",e[2].dataType,e[2].dims,u),b=P("inputMean",e[3].dataType,e[3].dims,u),w=P("inputVar",e[4].dataType,e[4].dims,u),x=N("y",e[0].dataType,m,s),v=()=>{let T="";if(r)T=`let cOffset = ${a.length===1?"0u":o==="NHWC"?`outputIndices[${a.length-1}] / ${s}`:"outputIndices[1]"};`;else if(o==="NCHW")T=`
            ${x.indicesSet("outputIndices","0","0")}
            let cOffset = ${x.indicesToOffset("outputIndices")};`;else{T=`var cIndices = ${g.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let C=1;C<g.rank;C++)T+=`cIndices[${C}] = outputIndices[${C}];`;T+=`let cOffset = ${g.indicesToOffset("cIndices")};`}return T},$=T=>`
  const epsilon = ${n};
  ${T.registerUniform("outputSize","u32").declareVariables(f,g,_,b,w,x)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${x.offsetToIndices(`global_idx * ${s}`)};
    ${v()}
    let scale = ${g.getByOffset("cOffset")};
    let bias = ${_.getByOffset("cOffset")};
    let inputMean = ${b.getByOffset("cOffset")};
    let inputVar = ${w.getByOffset("cOffset")};
    let x = ${f.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${x.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${r}_${s}`,inputDependencies:c?["rank","type","type","type","type"]:void 0},getShaderSource:$,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c?[{type:12,data:d},...W(a)]:[{type:12,data:d}]})}},Qm=e=>te(e),Rs=(e,t)=>{let{inputs:n,outputCount:r}=e,o=Qm({...t,outputCount:r});if(we.webgpu.validateInputContent&&Km(n,o),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Zm(n,o))}});var Ym,Xm,Ns,Vs=L(()=>{"use strict";ae();ue();Ym=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Xm=e=>{let t=e[0].dims,n=e[0].dims[2],r=E.size(t)/4,o=e[0].dataType,a=P("input",o,t,4),s=P("bias",o,[n],4),u=P("residual",o,t,4),d=N("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)}}),getShaderSource:m=>`
  const channels = ${n}u / 4;
  ${m.declareVariables(a,s,u,d)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes(r)}
    let value = ${a.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${d.setByOffset("global_idx","value")}
  }`}},Ns=e=>{Ym(e.inputs),e.compute(Xm(e.inputs))}});var Jm,be,Ls,Ws,Gs,Hs,Fs,qs,js,Ks,Zs,ef,Qs,Ys,Xs,Js,or,eu,Xr,tu,ru,nu,ou,iu,au,su,uu,lu,du,cu,pu,mu,fu,hu,gu,yu,bu,bo,_o,_u,wu,vu,tf,rf,$u,Jr=L(()=>{"use strict";ee();ae();Se();ue();Jm=(e,t,n,r,o,a,s)=>{let u=Math.ceil(t/4),d="";typeof o=="string"?d=`${o}(a)`:d=o("a");let c=P("inputData",n,[u],4),m=N("outputData",r,[u],4),f=[{name:"vec_size",type:"u32"}];return s&&f.push(...s),`
      ${e.registerUniforms(f).declareVariables(c,m)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${c.getByOffset("global_idx")};
    ${m.setByOffset("global_idx",d)}
  }`},be=(e,t,n,r,o,a=e.dataType,s,u)=>{let d=[{type:12,data:Math.ceil(E.size(e.dims)/4)}];return s&&d.push(...s),{name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:c=>Jm(c,E.size(e.dims),e.dataType,a,n,r,u),getRunData:c=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(E.size(c[0].dims)/64/4)},programUniforms:d})}},Ls=e=>{e.compute(be(e.inputs[0],"Abs","abs"))},Ws=e=>{e.compute(be(e.inputs[0],"Acos","acos"))},Gs=e=>{e.compute(be(e.inputs[0],"Acosh","acosh"))},Hs=e=>{e.compute(be(e.inputs[0],"Asin","asin"))},Fs=e=>{e.compute(be(e.inputs[0],"Asinh","asinh"))},qs=e=>{e.compute(be(e.inputs[0],"Atan","atan"))},js=e=>{e.compute(be(e.inputs[0],"Atanh","atanh"))},Ks=e=>te(e),Zs=(e,t)=>{let n;switch(t.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(be(e.inputs[0],"Cast",n,void 0,t.cacheKey,t.to))},ef=e=>{let t,n,r=e.length>=2&&e[1].data!==0,o=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=r?e[1].getFloat32Array()[0]:-34028234663852886e22,n=o?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=r?e[1].getUint16Array()[0]:64511,n=o?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return te({min:t,max:n})},Qs=(e,t)=>{let n=t||ef(e.inputs),r=ke(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Clip",o=>`clamp(${o}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:e.inputs[0].dataType,data:n.min},{type:e.inputs[0].dataType,data:n.max}],[{name:"min",type:r},{name:"max",type:r}]),{inputs:[0]})},Ys=e=>{e.compute(be(e.inputs[0],"Ceil","ceil"))},Xs=e=>{e.compute(be(e.inputs[0],"Cos","cos"))},Js=e=>{e.compute(be(e.inputs[0],"Cosh","cosh"))},or=e=>te(e),eu=(e,t)=>{let n=ke(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Elu",r=>`elu_vf32(${r})`,`
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
}`,tu=e=>{let t=ke(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Erf",n=>`erf_vf32(${n})`,Xr(t)))},ru=e=>{e.compute(be(e.inputs[0],"Exp","exp"))},nu=e=>{e.compute(be(e.inputs[0],"Floor","floor"))},ou=e=>{let t=ke(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,Xr(t)))},iu=(e,t)=>{let n=ke(e.inputs[0].dataType);e.compute(be(e.inputs[0],"LeakyRelu",r=>`select(leaky_relu_alpha_ * ${r}, ${r}, ${r} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${t.alpha});`,t.cacheKey))},au=e=>{e.compute(be(e.inputs[0],"Not",t=>`!${t}`))},su=e=>{e.compute(be(e.inputs[0],"Neg",t=>`-${t}`))},uu=e=>{e.compute(be(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},lu=e=>{let t=ke(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Relu",n=>`select(vec4<${t}>(0.0), ${n}, ${n} > vec4<${t}>(0.0))`))},du=e=>{e.compute(be(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},cu=e=>te(e),pu=(e,t)=>{let n=ke(e.inputs[0].dataType);e.compute(be(e.inputs[0],"HardSigmoid",r=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${r} + vec4<${n}>(${t.beta})))`,void 0,t.cacheKey))},mu=e=>{e.compute(be(e.inputs[0],"Sin","sin"))},fu=e=>{e.compute(be(e.inputs[0],"Sinh","sinh"))},hu=e=>{e.compute(be(e.inputs[0],"Sqrt","sqrt"))},gu=e=>{e.compute(be(e.inputs[0],"Tan","tan"))},yu=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,bu=e=>{e.compute(be(e.inputs[0],"Tanh",yu))},bo=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${yu("v")};
}
`,_o=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,_u=e=>{let t=ke(e.inputs[0].dataType);e.compute(be(e.inputs[0],"FastGelu",_o,bo(t),void 0,e.inputs[0].dataType))},wu=(e,t)=>{let n=ke(e.inputs[0].dataType);return e.compute(be(e.inputs[0],"ThresholdedRelu",r=>`select(vec4<${n}>(0.0), ${r}, ${r} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`,t.cacheKey)),0},vu=e=>{e.compute(be(e.inputs[0],"Log","log"))},tf=(e,t)=>`
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
`,rf=e=>`quick_gelu_impl(${e})`,$u=(e,t)=>{let n=ke(e.inputs[0].dataType);e.compute(be(e.inputs[0],"QuickGelu",rf,tf(n,t.alpha),t.cacheKey,e.inputs[0].dataType))}});var nf,of,Su,Tu=L(()=>{"use strict";ae();ue();Jr();nf=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},of=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let n=P("input",e[0].dataType,e[0].dims,4),r=P("bias",e[0].dataType,[e[0].dims[2]],4),o=N("output",e[0].dataType,t,4),a=E.size(t)/4,s=ve(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:d=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${d.declareVariables(n,r,o)}

  ${Xr(s)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Su=e=>{nf(e.inputs),e.compute(of(e.inputs))}});var af,sf,at,Cu,Iu,Au,Eu,ku,Pu,Ou,zu,Du,Bu,Mu=L(()=>{"use strict";ee();ae();ue();af=(e,t,n,r,o,a,s,u,d,c,m,f)=>{let g,_;typeof u=="string"?g=_=($,T)=>`${u}((${$}),(${T}))`:typeof u=="function"?g=_=u:(g=u.scalar,_=u.vector);let b=N("outputData",m,r.length,4),w=P("aData",d,t.length,4),x=P("bData",c,n.length,4),v;if(o)if(a){let $=E.size(t)===1,T=E.size(n)===1,C=t.length>0&&t[t.length-1]%4===0,A=n.length>0&&n[n.length-1]%4===0;$||T?v=b.setByOffset("global_idx",_($?`${w.type.value}(${w.getByOffset("0")}.x)`:w.getByOffset("global_idx"),T?`${x.type.value}(${x.getByOffset("0")}.x)`:x.getByOffset("global_idx"))):v=`
            let outputIndices = ${b.offsetToIndices("global_idx * 4u")};
            let offsetA = ${w.broadcastedIndicesToOffset("outputIndices",b)};
            let offsetB = ${x.broadcastedIndicesToOffset("outputIndices",b)};
            ${b.setByOffset("global_idx",_(s||C?w.getByOffset("offsetA / 4u"):`${w.type.value}(${w.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||A?x.getByOffset("offsetB / 4u"):`${x.type.value}(${x.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else v=b.setByOffset("global_idx",_(w.getByOffset("global_idx"),x.getByOffset("global_idx")));else{if(!a)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let $=(T,C,A="")=>{let I=`aData[indexA${C}][componentA${C}]`,z=`bData[indexB${C}][componentB${C}]`;return`
            let outputIndices${C} = ${b.offsetToIndices(`global_idx * 4u + ${C}u`)};
            let offsetA${C} = ${w.broadcastedIndicesToOffset(`outputIndices${C}`,b)};
            let offsetB${C} = ${x.broadcastedIndicesToOffset(`outputIndices${C}`,b)};
            let indexA${C} = offsetA${C} / 4u;
            let indexB${C} = offsetB${C} / 4u;
            let componentA${C} = offsetA${C} % 4u;
            let componentB${C} = offsetB${C} % 4u;
            ${T}[${C}] = ${A}(${g(I,z)});
          `};m===9?v=`
            var data = vec4<u32>(0);
            ${$("data",0,"u32")}
            ${$("data",1,"u32")}
            ${$("data",2,"u32")}
            ${$("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:v=`
            ${$("outputData[global_idx]",0)}
            ${$("outputData[global_idx]",1)}
            ${$("outputData[global_idx]",2)}
            ${$("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(w,x,b)}

        ${f??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`},sf=(e,t,n,r,o,a,s=n.dataType)=>{let u=n.dims.map(w=>Number(w)??1),d=r.dims.map(w=>Number(w)??1),c=!E.areEqual(u,d),m=u,f=E.size(u),g=!1,_=!1,b=[c];if(c){let w=tt.calcShape(u,d,!1);if(!w)throw new Error("Can't perform binary op on the given tensors");m=w.slice(),f=E.size(m);let x=E.size(u)===1,v=E.size(d)===1,$=u.length>0&&u[u.length-1]%4===0,T=d.length>0&&d[d.length-1]%4===0;b.push(x),b.push(v),b.push($),b.push(T);let C=1;for(let A=1;A<m.length;A++){let I=u[u.length-A],z=d[d.length-A];if(I===z)C*=I;else break}C%4===0?(_=!0,g=!0):(x||v||$||T)&&(g=!0)}else g=!0;return b.push(g),{name:e,shaderCache:{hint:t+b.map(w=>w.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:w=>af(w,u,d,m,g,c,_,o,n.dataType,r.dataType,s,a),getRunData:()=>({outputs:[{dims:m,dataType:s}],dispatchGroup:{x:Math.ceil(f/64/4)},programUniforms:[{type:12,data:Math.ceil(E.size(m)/4)},...W(u,d,m)]})}},at=(e,t,n,r,o,a)=>{e.compute(sf(t,o??"",e.inputs[0],e.inputs[1],n,r,a))},Cu=e=>{at(e,"Add",(t,n)=>`${t}+${n}`)},Iu=e=>{at(e,"Div",(t,n)=>`${t}/${n}`)},Au=e=>{at(e,"Equal",{scalar:(t,n)=>`u32(${t}==${n})`,vector:(t,n)=>`vec4<u32>(${t}==${n})`},void 0,void 0,9)},Eu=e=>{at(e,"Mul",(t,n)=>`${t}*${n}`)},ku=e=>{let t=P("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;at(e,"Pow",{scalar:(r,o)=>`pow_custom(${r},${o})`,vector:(r,o)=>`pow_vector_custom(${r},${o})`},`
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
      `)},Pu=e=>{at(e,"Sub",(t,n)=>`${t}-${n}`)},Ou=e=>{at(e,"Greater",{scalar:(t,n)=>`u32(${t}>${n})`,vector:(t,n)=>`vec4<u32>(${t}>${n})`},void 0,void 0,9)},zu=e=>{at(e,"Less",{scalar:(t,n)=>`u32(${t}<${n})`,vector:(t,n)=>`vec4<u32>(${t}<${n})`},void 0,void 0,9)},Du=e=>{at(e,"GreaterOrEqual",{scalar:(t,n)=>`u32(${t}>=${n})`,vector:(t,n)=>`vec4<u32>(${t}>=${n})`},void 0,void 0,9)},Bu=e=>{at(e,"LessOrEqual",{scalar:(t,n)=>`u32(${t}<=${n})`,vector:(t,n)=>`vec4<u32>(${t}<=${n})`},void 0,void 0,9)}});var lf,df,cf,pf,Ru,Uu,Nu=L(()=>{"use strict";ee();ae();Se();ue();lf=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let n=0,r=e[n],o=r.dataType,a=r.dims.length;e.forEach((s,u)=>{if(u!==n){if(s.dataType!==o)throw new Error("input tensors should be one type");if(s.dims.length!==a)throw new Error("input tensors should have the same shape");s.dims.forEach((d,c)=>{if(c!==t&&d!==r.dims[c])throw new Error("non concat dimensions must match")})}})},df=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,cf=(e,t)=>{let n=e.length,r=[];for(let o=0;o<n;++o){let a=t.setByOffset("global_idx",e[o].getByIndices("indices"));n===1?r.push(a):o===0?r.push(`if (inputIndex == ${o}u) { ${a} }`):o===n-1?r.push(`else { ${a} }`):r.push(`else if (inputIndex == ${o}) { ${a} }`)}return r.join(`
`)},pf=(e,t,n,r)=>{let o=E.size(n),a=new Array(e.length),s=new Array(e.length),u=0,d=[],c=[],m=[{type:12,data:o}];for(let w=0;w<e.length;++w)u+=e[w].dims[t],a[w]=u,c.push(e[w].dims.length),s[w]=P(`input${w}`,r,c[w]),d.push("rank"),m.push({type:12,data:a[w]});for(let w=0;w<e.length;++w)m.push(...W(e[w].dims));m.push(...W(n));let f=N("output",r,n.length),g=f.indicesGet("indices",t),_=Array.from(Array(a.length).keys()).map(w=>`uniforms.sizeInConcatAxis${w}`).join(","),b=w=>`

  ${(()=>{w.registerUniform("outputSize","u32");for(let x=0;x<e.length;x++)w.registerUniform(`sizeInConcatAxis${x}`,"u32");return w.declareVariables(...s,f)})()}

  ${df(a.length,_)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${f.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${g});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${a.length}u>(${_});
      ${g} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${cf(s,f)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:n,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:m}),getShaderSource:b}},Ru=(e,t)=>{let n=e.inputs,r=n[0].dims,o=E.normalizeAxis(t.axis,r.length);lf(n,o);let a=r.slice();a[o]=n.reduce((u,d)=>u+(d.dims.length>o?d.dims[o]:0),0);let s=n.filter(u=>E.size(u.dims)>0);e.compute(pf(s,o,a,n[0].dataType),{inputs:s})},Uu=e=>te({axis:e.axis})});var Ke,Ze,Qe,en,Tt=L(()=>{"use strict";ee();ae();Ke=(e,t,n="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${n}(uniforms.clip_min)), ${t}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Ze=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Qe=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},en=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[n,r]=e?.activation_params||[.2,.5];return{activation:t,alpha:n,beta:r}}else if(t==="Clip"){let[n,r]=e?.activation_params||[qa,ja];return{activation:t,clipMax:r,clipMin:n}}else if(t==="LeakyRelu"){let[n]=e?.activation_params||[.01];return{activation:t,alpha:n}}return{activation:t}}});var Ae,Vu,tn=L(()=>{"use strict";Ae=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Vu=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Lu,Wu=L(()=>{"use strict";Lu=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var ir,rn,nn=L(()=>{"use strict";ee();ae();ue();Tt();ir=(e,t,n,r,o)=>{let a=r-n;return`
      ${Array.from({length:n}).map((s,u)=>`
      if (${K(t.shape,u,t.rank)} != 1) {
        ${t.indicesSet(e,u,K(o,u+a,r))}
      } else {
        ${t.indicesSet(e,u,0)}
      }`).join("")}
`},rn=(e,t,n,r,o=!1,a)=>{let s=e[0].dims,u=e[1].dims,d=s[s.length-2],c=u[u.length-1],m=s[s.length-1],f=he(c),g=he(m),_=he(d),b=E.size(n)/f/_,w=e.length>2,x=r?r.slice(0,-2):n.slice(0,-2),$=[E.size(x),d,c],T=[{type:12,data:b},{type:12,data:d},{type:12,data:c},{type:12,data:m}];Ze(t,T),T.push(...W(x,s,u)),w&&T.push(...W(e[2].dims)),T.push(...W($));let C=A=>{let I=Kr("batch_dims",e[0].dataType,x.length),z=P("a",e[0].dataType,s.length,g),D=P("b",e[1].dataType,u.length,f),R=N("output",e[0].dataType,$.length,f),H=ve(R.type.tensor),q=Ke(t,R.type.value,H),Y=[z,D],ne="";if(w){let oe=o?f:1;Y.push(P("bias",e[2].dataType,e[2].dims.length,oe)),ne=`${o?`value += bias[col / ${oe}];`:`value += ${R.type.value}(bias[row + i]);`}`}let F=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Qe(t,F);let me=()=>{let oe=`var a_data: ${z.type.value};`;for(let j=0;j<g;j++)oe+=`
              let b_data${j} = b[(b_offset + (k + ${j}) * uniforms.N + col) / ${f}];`;for(let j=0;j<_;j++){oe+=`a_data = a[(a_offset + (row + ${j}) * uniforms.K + k) / ${g}];`;for(let ie=0;ie<g;ie++)oe+=`
            values[${j}] = fma(${D.type.value}(a_data${g===1?"":`[${ie}]`}), b_data${ie}, values[${j}]);
`}return oe};return`
  ${A.registerUniforms(F).registerInternalVariables(I).declareVariables(...Y,R)}
  ${A.mainStart()}
    ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${f})) * ${f};
    var index1 = global_idx / (uniforms.N / ${f});
    let stride1 = uniforms.M / ${_};
    let row = (index1 % stride1) * ${_};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${I.offsetToIndices("batch")};`}

    var a_indices: ${z.type.indices};
    ${ir("a_indices",z,z.rank-2,I.rank,"batch_indices")}
    ${z.indicesSet("a_indices",z.rank-2,0)}
    ${z.indicesSet("a_indices",z.rank-1,0)}
    let a_offset = ${z.indicesToOffset("a_indices")};

    var b_indices: ${D.type.indices};
    ${ir("b_indices",D,D.rank-2,I.rank,"batch_indices")}
    ${D.indicesSet("b_indices",D.rank-2,0)}
    ${D.indicesSet("b_indices",D.rank-1,0)}
    let b_offset = ${D.indicesToOffset("b_indices")};
    var values: array<${R.type.value}, ${_}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${g}) {
      ${me()}
    }
    for (var i = 0u; i < ${_}u; i++) {
      var value = values[i];
      ${ne}
      ${q}
      let cur_indices = ${R.type.indices}(batch, row + i, col);
      let offset = ${R.indicesToOffset("cur_indices")};
      ${R.setByOffset(`offset / ${f}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${f};${g};${_};${o}`,inputDependencies:w?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:T}),getShaderSource:C}}});var mf,ff,wo,Gu,hf,vo,gf,ar,on=L(()=>{"use strict";ee();ae();ue();Tt();nn();tn();mf=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,ff=(e,t)=>e?`
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
        }`,wo=(e,t,n="f32",r,o=!1,a=32,s=!1,u=32)=>{let d=t[1]*e[1],c=t[0]*e[0],m=o?d:a,f=o?a:d,g=m/t[0],_=a/t[1];if(!((o&&g===4&&e[1]===4||!o&&(g===3||g===4))&&m%t[0]===0&&a%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${g} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${g} must be 3 or 4.
  tileAWidth ${m} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${g}<${n}>, ${m/g}>, ${f}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${c/e[0]}>, ${a}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${g};
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
  let globalRowStart = i32(workgroupId.y) * ${d};

  let num_tiles = ${s?`${Math.ceil(u/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${mf(o,r)}
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
          ${g===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${ff(o,g)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Gu=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,hf=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",vo=(e,t,n="f32",r,o=!1,a=32,s=!1,u=32,d=!1)=>{let c=e[1]*t[1],m=e[0]*t[0],f=o?c:a,g=o?a:c;if(!(g%t[1]===0&&f%t[0]===0&&a%t[1]===0))throw new Error(`tileAHight ${g} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let _=g/t[1],b=f/t[0],w=a/t[1],x=d?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${c};
    let globalColStart = i32(workgroupId.x) * ${m};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${g}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          ${Gu(o,r)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${m}; inputCol = inputCol + ${t[0]}) {
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
let globalRowStart = i32(workgroupId.y) * ${c};

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
      ${Gu(o,r)}
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
      ${hf(o)}
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
  var<workgroup> mm_Asub : array<array<${n}, ${f}>, ${g}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${m}>, ${a}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(u/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${x}
  }
`},gf=(e,t,n,r,o=!1)=>{let[a,s,u,d]=r,c=ve(r[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Ae(e,c)} {
      var value = ${Ae(e,c)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${ir("aIndices",s,s.rank-2,a.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Ae(e,c)} {
      var value = ${Ae(e,c)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${ir("bIndices",u,u.rank-2,a.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ae(e,c)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${o?"bias[colIn]":`${Ae(e,c)}(bias[row])`};`:""}
        ${n}
        ${d.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},ar=(e,t,n,r,o=!1,a)=>{let s=e[0].dims,u=e[1].dims,d=s.slice(0,-2),c=u.slice(0,-2),m=r?r.slice(0,-2):n.slice(0,-2),f=E.size(m),g=s[s.length-2],_=s[s.length-1],b=u[u.length-1],w=_%4===0&&b%4===0,x=g<=8?[4,1,1]:[4,4,1],v=[8,8,1],$=[Math.ceil(b/v[0]/x[0]),Math.ceil(g/v[1]/x[1]),Math.ceil(f/v[2]/x[2])],T=w?4:1,C=[...d,g,_/T],A=C.length,I=[...c,_,b/T],z=I.length,D=[f,g,b/T],R=[{type:6,data:g},{type:6,data:b},{type:6,data:_}];Ze(t,R),R.push(...W(m,C,I));let H=["rank","rank"],q=e.length>2;q&&(R.push(...W(e[2].dims)),H.push("rank")),R.push(...W(D));let Y=ne=>{let F=m.length,me=Kr("batchDims",e[0].dataType,F,1),oe=ve(e[0].dataType),j=P("a",e[0].dataType,A,T),ie=P("b",e[1].dataType,z,T),Z=N("result",e[0].dataType,D.length,T),ce=[j,ie];if(q){let O=o?T:1;ce.push(P("bias",e[2].dataType,e[2].dims.length,O))}let Te=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Qe(t,Te);let pe=ve(Z.type.tensor),J=Ke(t,Z.type.value,pe),V=gf(T,q,J,[me,j,ie,Z],o);return`
  ${ne.registerUniforms(Te).registerInternalVariables(me).declareVariables(...ce,Z)}
  ${V}
  ${w?wo(x,v,oe,me):vo(x,v,oe,me)}
                   `};return{name:"MatMul",shaderCache:{hint:`${x};${t.activation};${w};${o}`,inputDependencies:H},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:$[0],y:$[1],z:$[2]},programUniforms:R}),getShaderSource:Y}}});var yf,Hu,Fu=L(()=>{"use strict";ee();et();ue();Tt();tn();Wu();on();yf=(e,t,n,r,o=!1,a,s=4,u=4,d=4,c="f32")=>{let m=H=>{switch(H){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${c}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${H} is not supported.`)}},f=H=>{switch(H){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${H} is not supported.`)}},g=e?`
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
    `,b=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",w=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",x=e?"row":"col",v=e?"col":"row",$=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${x} / outWidth;
    let outCol = ${x} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${Ae(s,c)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${b} && xCol >= 0 && xCol < ${w}) {
      ${g}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${m(s)}
    }
    return resData;`,T=e?t&&r?`
    let col = colIn * ${s};
    ${$}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${$}
    }
    return ${Ae(s,c)}(0.0);`:r&&n?`
    let col = colIn * ${s};
    ${$}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${$}
    }
    return ${Ae(s,c)}(0.0);`,C=e?r&&n?f(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${f(u)}
    }
    return ${Ae(u,c)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${f(u)}
    }
    return ${Ae(u,c)}(0.0);`,A=Ae(d,c),I=e?Ae(s,c):Ae(u,c),z=e?Ae(u,c):Ae(s,c),D=Ke(a,A,c);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${I} {
      ${e?T:C}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${z} {
      ${e?C:T}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${A}) {
      let col = colIn * ${d};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${_}
      ${Vu(o)}
      ${D}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Hu=(e,t,n,r,o,a,s,u,d)=>{let c=t.format==="NHWC",m=c?e[0].dims[3]:e[0].dims[1],f=n[0],g=c?n[2]:n[3],_=c?n[1]:n[2],b=c?n[3]:n[1],w=c&&(m%4===0||m%3===0)&&b%4===0,x=c?b:g*_,v=c?g*_:b,$=[8,8,1],T=r<=8?[4,1,1]:[4,4,1],C=[Math.ceil(x/$[0]/T[0]),Math.ceil(v/$[1]/T[1]),Math.ceil(f/$[2]/T[2])];le("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${C}`);let A=w?c&&m%4!==0?3:4:1,I=$[1]*T[1],z=$[0]*T[0],D=Math.max($[0]*A,$[1]),R=r%I===0,H=o%z===0,q=a%D===0,Y=w?[A,4,4]:[1,1,1],ne=[{type:6,data:r},{type:6,data:o},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Ze(t,ne),ne.push(...W(e[0].dims,e[1].dims));let F=["rank","rank"];s&&(ne.push(...W(e[2].dims)),F.push("rank")),ne.push(...W(n));let me=oe=>{let j=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Qe(t,j);let ie=w?4:1,Z=ve(e[0].dataType),ce=`
      fn setOutputAtIndex(flatIndex : i32, value : ${w?`vec4<${Z}>`:Z}) {
        result[flatIndex] = ${w?`vec4<${Z}>`:Z}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${w?`vec4<${Z}>`:Z}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${w?"/ 4":""}, value);
      }`,Te=P("x",e[0].dataType,e[0].dims.length,A===3?1:A),pe=P("w",e[1].dataType,e[1].dims.length,ie),J=[Te,pe],V=N("result",e[0].dataType,n.length,ie);if(s){let O=P("bias",e[2].dataType,e[2].dims.length,ie);J.push(O),ce+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${w?`vec4<${Z}>`:Z} {
          return bias[coords.${c?"w":"y"}${w?"/ 4":""}];
        }`}return`
        ${Lu("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${oe.registerUniforms(j).declareVariables(...J,V)}
        ${ce}
        ${yf(c,R,H,q,s,t,Y[0],Y[1],Y[2],Z)}
        ${w?wo(T,$,Z,void 0,!c,D):vo(T,$,Z,void 0,!c,D,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${A};${w};${R};${H};${q};${I};${z};${D}`,inputDependencies:F},getRunData:()=>({outputs:[{dims:d?d(n):n,dataType:e[0].dataType}],dispatchGroup:{x:C[0],y:C[1],z:C[2]},programUniforms:ne}),getShaderSource:me}}});var bf,qu,an,_f,ju,wf,Ku,Zu,Qu=L(()=>{"use strict";ee();et();ae();ue();Tt();tn();bf=e=>{let t=1;for(let n=0;n<e.length;n++)t*=e[n];return t},qu=e=>typeof e=="number"?[e,e,e]:e,an=(e,t)=>t<=1?e:e+(e-1)*(t-1),_f=(e,t,n,r=1)=>{let o=an(t,r);return Math.floor((e[0]*(n-1)-n+o)/2)},ju=(e,t,n,r,o)=>{o==null&&(o=_f(e,t[0],r[0]));let a=[0,0,0,n];for(let s=0;s<3;s++)e[s]+2*o>=t[s]&&(a[s]=Math.trunc((e[s]-t[s]+2*o)/r[s]+1));return a},wf=(e,t,n,r,o,a,s,u,d,c)=>{let m,f,g,_;if(e==="VALID"&&(e=0),typeof e=="number"){m={top:e,bottom:e,left:e,right:e,front:e,back:e};let b=ju([t,n,r,1],[u,d,c],1,[o,a,s],e);f=b[0],g=b[1],_=b[2]}else if(Array.isArray(e)){if(!e.every((w,x,v)=>w===v[0]))throw Error(`Unsupported padding parameter: ${e}`);m={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let b=ju([t,n,r,1],[u,d,c],1,[o,a,s],e[0]);f=b[0],g=b[1],_=b[2]}else if(e==="SAME_UPPER"){f=Math.ceil(t/o),g=Math.ceil(n/a),_=Math.ceil(r/s);let b=(f-1)*o+u-t,w=(g-1)*a+d-n,x=(_-1)*s+c-r,v=Math.floor(b/2),$=b-v,T=Math.floor(w/2),C=w-T,A=Math.floor(x/2),I=x-A;m={top:T,bottom:C,left:A,right:I,front:v,back:$}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:m,outDepth:f,outHeight:g,outWidth:_}},Ku=(e,t,n,r,o,a=!1,s="channelsLast")=>{let u,d,c,m,f;if(s==="channelsLast")[u,d,c,m,f]=e;else if(s==="channelsFirst")[u,f,d,c,m]=e;else throw new Error(`Unknown dataFormat ${s}`);let[g,,_,b,w]=t,[x,v,$]=qu(n),[T,C,A]=qu(r),I=an(_,T),z=an(b,C),D=an(w,A),{padInfo:R,outDepth:H,outHeight:q,outWidth:Y}=wf(o,d,c,m,x,v,$,I,z,D),ne=a?g*f:g,F=[0,0,0,0,0];return s==="channelsFirst"?F=[u,ne,H,q,Y]:s==="channelsLast"&&(F=[u,H,q,Y,ne]),{batchSize:u,dataFormat:s,inDepth:d,inHeight:c,inWidth:m,inChannels:f,outDepth:H,outHeight:q,outWidth:Y,outChannels:ne,padInfo:R,strideDepth:x,strideHeight:v,strideWidth:$,filterDepth:_,filterHeight:b,filterWidth:w,effectiveFilterDepth:I,effectiveFilterHeight:z,effectiveFilterWidth:D,dilationDepth:T,dilationHeight:C,dilationWidth:A,inShape:e,outShape:F,filterShape:t}},Zu=(e,t,n,r,o,a)=>{let s=a==="channelsLast",u=s?e[0].dims[3]:e[0].dims[1],d=!1,c=[64,1,1],m={x:n.map(($,T)=>T)},f=[Math.ceil(bf(m.x.map($=>n[$]))/c[0]),1,1];le("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${f}`);let g=d?s&&u%4!==0?3:4:1,_=E.size(n),b=[{type:12,data:_},{type:12,data:r},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];Ze(t,b),b.push(...W(e[0].dims,e[1].dims));let w=["rank","rank"],x=e.length===3;x&&(b.push(...W(e[2].dims)),w.push("rank")),b.push(...W(n));let v=$=>{let T=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:r.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Qe(t,T);let C=d?4:1,A=ve(e[0].dataType),I=P("x",e[0].dataType,e[0].dims.length,g===3?1:g),z=P("W",e[1].dataType,e[1].dims.length,C),D=[I,z],R=N("result",e[0].dataType,n.length,C),H="";if(x){let ne=P("bias",e[2].dataType,e[2].dims.length,C);D.push(ne),H+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${d?`vec4<${A}>`:A} {
          return bias[${s?K("coords",4,5):K("coords",1,5)}${d?"/ 4":""}];
        }`}let q=Ae(g,A),Y=Ke(t,q,A);return`
            ${H}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${z.getByIndices("aIndices")};
            }
          ${$.registerUniforms(T).declareVariables(...D,R)}
          ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${R.offsetToIndices("global_idx")};
              let batch = ${K("coords",0,I.rank)};
              let d2 = ${s?K("coords",I.rank-1,I.rank):K("coords",1,I.rank)};
              let xFRCCorner = vec3<u32>(${s?K("coords",1,I.rank):K("coords",2,I.rank)},
              ${s?K("coords",2,I.rank):K("coords",3,I.rank)},
              ${s?K("coords",3,I.rank):K("coords",4,I.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?K("uniforms.x_shape",1,I.rank):K("uniforms.x_shape",2,I.rank)};
              let xShapeZ = ${s?K("uniforms.x_shape",2,I.rank):K("uniforms.x_shape",3,I.rank)};
              let xShapeW = ${s?K("uniforms.x_shape",3,I.rank):K("uniforms.x_shape",4,I.rank)};
              let xShapeU = ${s?K("uniforms.x_shape",4,I.rank):K("uniforms.x_shape",1,I.rank)};
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
              ${x?"value = value + getBiasByOutputCoords(coords)":""};
              ${Y}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${g};${x}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:f[0],y:f[1],z:f[2]},programUniforms:b}),getShaderSource:v}}});var Yu,Xu,Ju=L(()=>{"use strict";ee();ae();ue();Tt();Yu=(e,t,n,r)=>{let o=e.length>2,a=o?"value += b[output_channel];":"",s=e[0].dims,u=e[1].dims,d=t.format==="NHWC",c=d?n[3]:n[1],m=c/t.group,f=d&&m>=4?he(c):1,g=E.size(n)/f,_=[{type:12,data:g},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:m}];Ze(t,_),_.push(...W(s,[u[0],u[1],u[2],u[3]/f]));let b=o?["rank","rank","rank"]:["rank","rank"];_.push(...W([n[0],n[1],n[2],n[3]/f]));let w=x=>{let v=N("output",e[0].dataType,n.length,f),$=ve(v.type.tensor),T=Ke(t,v.type.value,$),C=P("x",e[0].dataType,s.length),A=P("w",e[1].dataType,u.length,f),I=[C,A];o&&I.push(P("b",e[2].dataType,e[2].dims,f));let z=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Qe(t,z);let D=d?`
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

            let xVal = ${C.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${A.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${x.registerUniforms(z).declareVariables(...I,v)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${v.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${d?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${d?1:2}], outputIndices[${d?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${f} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${d?2:1}];

    var value: ${v.type.value} = ${v.type.value}(0);
    ${D}
    ${a}
    ${T}
    ${v.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${f}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:_}),getShaderSource:w}},Xu=(e,t,n,r)=>{let o=e.length>2,a=he(n[3]),s=he(n[2]),u=E.size(n)/a/s,d=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],c=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],m=[n[0],n[1],n[2],n[3]/a],f=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Ze(t,f),f.push(...W(d,c,m));let g=(s-1)*t.strides[1]+c[1],_=b=>{let w=N("output",e[0].dataType,m.length,a),x=ve(w.type.tensor),v=Ke(t,w.type.value,x),$=P("x",e[0].dataType,d.length,a),T=P("w",e[1].dataType,c.length,a),C=[$,T];o&&C.push(P("b",e[2].dataType,e[2].dims,a));let A=o?"value += b[output_channel];":"",I=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Qe(t,I),`
  ${b.registerUniforms(I).declareVariables(...C,w)}
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

    var x_vals: array<${$.type.value}, ${g}>;
    var values: array<${w.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${c[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${g}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${$.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${$.type.value}(0);
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
      ${A}
      ${v}
      ${w.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${a};${s};${g};${c[0]};${c[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:f}),getShaderSource:_}}});var vf,$o,$f,xo,So,el,xf,Sf,To,tl=L(()=>{"use strict";ae();Fu();Qu();on();Ju();Tt();nn();ct();vf=(e,t,n,r,o,a)=>{let s=e[0],u=e.slice(a?1:2,a?3:4),d=u.length,c=t[0],f=t.slice(2).map((b,w)=>b+(b-1)*(n[w]-1)),_=u.map((b,w)=>b+r[w]+r[w+d]).map((b,w)=>Math.floor((b-f[w]+o[w])/o[w]));return _.splice(0,0,s),_.splice(a?3:1,0,c),_},$o=[2,3,1,0],$f=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[1]*t.group;if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},xo=(e,t)=>{let n=e.kernelShape.slice();n.length<t[1].dims.length-2&&n.push(...Array(t[1].dims.length-2-n.length).fill(0));for(let a=2;a<t[1].dims.length;++a)n[a-2]===0&&(n[a-2]=t[1].dims[a]);let r=e.pads.slice();Dt.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,r,e.format==="NHWC",e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:n,pads:r}),o},So=e=>{let t=en(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],o=e.dilations,a=e.group,s=e.kernel_shape,u=e.pads,d=e.strides,c=e.w_is_const();return{autoPad:r,format:n,dilations:o,group:a,kernelShape:s,pads:u,strides:d,wIsConst:c,...t,cacheKey:`${e.format};${t.activation};`}},el=(e,t,n,r)=>{let o=n.format==="NHWC",a=vf(t[0].dims,t[1].dims,n.dilations,n.pads,n.strides,o);if(n.group!==1){let I=[t[0]];if(o){let D=e.kernelCustomData.wT??e.compute(Pe(t[1],$o),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=D),I.push(D)}else I.push(t[1]);t.length===3&&I.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===n.group&&t[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?e.compute(Xu(I,n,a,r),{inputs:I}):e.compute(Yu(I,n,a,r),{inputs:I});return}let s=t.length===3,u=t[0].dims[o?1:2],d=t[0].dims[o?2:3],c=t[0].dims[o?3:1],m=t[1].dims[2],f=t[1].dims[3],g=a[o?1:2],_=a[o?2:3],b=a[o?3:1],w=o&&m===u&&f===d&&n.pads[0]===0&&n.pads[1]===0;if(w||m===1&&f===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let I=a[0],z,D,R,H=[];if(o){let ne=e.kernelCustomData.wT??e.compute(Pe(t[1],$o),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=ne),w){let F=u*d*c;z=t[0].reshape([1,I,F]),D=ne.reshape([1,F,b]),R=[1,I,b]}else z=t[0].reshape([I,u*d,c]),D=ne.reshape([1,c,b]),R=[I,g*_,b];H.push(z),H.push(D)}else z=t[0].reshape([I,c,u*d]),D=t[1].reshape([1,b,c]),R=[I,b,g*_],H.push(D),H.push(z);s&&H.push(t[2]);let q=R[2],Y=H[0].dims[H[0].dims.length-1];q<8&&Y<8?e.compute(rn(H,n,a,R,o,r),{inputs:H}):e.compute(ar(H,n,a,R,o,r),{inputs:H});return}let x=!0,v=e.kernelCustomData.wT??e.compute(Pe(t[1],$o),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=v);let $=[t[0],v];s&&$.push(t[2]);let T=o?g*_:b,C=o?b:g*_,A=m*f*c;e.compute(Hu($,n,a,T,C,A,s,x,r),{inputs:$})},xf=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),s=[1].concat(t.dilations),u=[1].concat(t.kernelShape),d=xo({...t,pads:o,strides:a,dilations:s,kernelShape:u},r);el(e,r,d,c=>n?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},Sf=(e,t,n)=>{let r=n.format==="NHWC"?"channelsLast":"channelsFirst",o=xo(n,t),a=n.autoPad==="NOTSET"?n.pads:n.autoPad,s=Ku(t[0].dims,t[1].dims,n.strides,n.dilations,a,!1,r);e.compute(Zu(t,o,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],r))},To=(e,t)=>{if($f(e.inputs,t),e.inputs[0].dims.length===3)xf(e,t);else if(e.inputs[0].dims.length===5)Sf(e,e.inputs,t);else{let n=xo(t,e.inputs);el(e,e.inputs,n)}}});var rl,nl=L(()=>{"use strict";ee();et();ae();ue();rl=(e,t,n)=>{let r=e.length>2,o=t.outputShape,a=t.format==="NHWC",s=t.group,u=e[1].dims,d=u[2]/s,c=u[3],m=a?he(d):1,f=a&&c===1&&d>=4,g=f?Math.floor(d/4)*4:Math.floor(d/m)*m,_=d-g,b=a?he(c):1,w=a?c===1?m:b:1,x=E.size(o)/b,v=[Math.ceil(x/64),1,1];le("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${v}`);let $=["rank","rank"],T=[t.strides[0],t.strides[1]],C=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],A=[t.dilations[0],t.dilations[1]],I=[C[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),C[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],z=[I[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),I[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],D=[{type:12,data:x},{type:12,data:T},{type:12,data:C},{type:12,data:A},{type:12,data:I},{type:6,data:z},{type:12,data:g},{type:12,data:d},{type:12,data:c},...W(e[0].dims,e[1].dims)];r&&(D.push(...W(e[2].dims)),$.push("rank")),D.push(...W(o));let R=H=>{let q=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:T.length},{name:"filter_dims",type:"u32",length:C.length},{name:"dilations",type:"u32",length:C.length},{name:"effective_filter_dims",type:"u32",length:I.length},{name:"pads",type:"i32",length:z.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],Y=ve(e[0].dataType),ne=a?1:2,F=a?2:3,me=a?3:1,oe=P("W",e[1].dataType,e[1].dims.length,w),j=P("Dy",e[0].dataType,e[0].dims.length,m),ie=[j,oe];r&&ie.push(P("bias",e[2].dataType,[o[me]].length,b));let Z=N("result",e[0].dataType,o.length,b),ce=()=>{let J="";if(f)m===4?J+=`
        let xValue = ${j.getByOffset("x_offset")};
        let wValue = ${oe.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:m===2?J+=`
          dotProd = dotProd + dot(vec4<${Y}>(${j.getByOffset("x_offset")}, ${j.getByOffset("x_offset + 1u")}), vec4<${Y}>(${oe.getByOffset("w_offset")}, ${oe.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:m===1&&(J+=`
          dotProd = dotProd + dot(vec4<${Y}>(${j.getByOffset("x_offset")}, ${j.getByOffset("x_offset + 1u")}, ${j.getByOffset("x_offset + 2u")}, ${j.getByOffset("x_offset + 3u")}), vec4<${Y}>(${oe.getByOffset("w_offset")}, ${oe.getByOffset("w_offset + 1u")}, ${oe.getByOffset("w_offset + 2u")}, ${oe.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(J+=`
                  let xValue = ${a?j.getByOffset(`${j.indicesToOffset(`${j.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${m}`):j.get("batch","inputChannel","idyR","idyC")};
        `,m===1)J+=`
          let w_offset = ${oe.indicesToOffset(`${oe.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${oe.getByOffset(`w_offset / ${w}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let V=0;V<m;V++)J+=`
            let wValue${V} = ${oe.getByOffset(`${oe.indicesToOffset(`${oe.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${V}, wOutChannel)`)} / ${w}`)};
            dotProd = dotProd + xValue[${V}] * wValue${V};`;return J},Te=()=>{if(_===0)return"";if(!f)throw new Error(`packInputAs4 ${f} is not true.`);let J="";if(m===1){J+="dotProd = dotProd";for(let V=0;V<_;V++)J+=`
            + ${j.getByOffset(`x_offset + ${V}`)} * ${oe.getByOffset(`w_offset + ${V}`)}`;J+=";"}else if(m===2){if(_!==2)throw new Error(`Invalid inputChannelsRemainder ${_}.`);J+=`
          let xValue = ${j.getByOffset("x_offset")};
          let wValue = ${oe.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return J},pe=`
            let outputIndices = ${Z.offsetToIndices(`global_idx * ${b}`)};
            let batch = ${Z.indicesGet("outputIndices",0)};
            let d1 = ${Z.indicesGet("outputIndices",me)};
            let r = ${Z.indicesGet("outputIndices",ne)};
            let c = ${Z.indicesGet("outputIndices",F)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${Z.type.value}(0.0);
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
              if (dyR < 0.0 || dyR >= ${Y}(uniforms.Dy_shape[${ne}]) || fract(dyR) > 0.0 ||
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
                if (dyC < 0.0 || dyC >= ${Y}(uniforms.Dy_shape[${F}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${f?`
                var x_offset = ${j.indicesToOffset(`${j.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${m};
                var w_offset = ${oe.indicesToOffset(`${oe.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${w};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${f?4:m}) {
                  ${ce()}
                  inputChannel = inputChannel + ${f?4:m};
                }
                ${Te()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${r?` + bias[d1 / ${b}]`:""};
            ${Z.setByOffset("global_idx","value")};
          `;return`
    ${H.registerUniforms(q).declareVariables(...ie,Z)}
      ${H.mainStart()}
      ${H.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${pe}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${m}${w}${b}${f}${_}`,inputDependencies:$},getRunData:()=>({dispatchGroup:{x:v[0],y:v[1],z:v[2]},outputs:[{dims:n?n(o):o,dataType:e[0].dataType}],programUniforms:D}),getShaderSource:R}}});var Tf,Cf,If,ol,il,Af,al,Ef,sl,ul=L(()=>{"use strict";nl();Tt();ct();Tf=(e,t,n,r,o,a)=>(e-1)*t+n+(r-1)*o+1-a,Cf=(e,t,n,r,o)=>{let a=Math.floor(e/2);t==="SAME_UPPER"?(n[r]=a,n[o]=e-a):t==="SAME_LOWER"&&(n[r]=e-a,n[o]=a)},If=(e,t,n,r,o,a,s,u,d,c)=>{let m=e.length-2,f=c.length===0;d.length<m&&d.push(...Array(m-d.length).fill(0));let g=e[0],_=t[u?3:1]*o;for(let b=0,w=e.length-m-(u?1:0);b<m;++b,++w){let x=e[w],v=f?x*s[b]:c[b],$=Tf(x,s[b],a[b],t[w],n[b],v);Cf($,r,a,b,b+m),f&&c.push(s[b]*(x-1)+d[b]+(t[w]-1)*n[b]+1-a[b]-a[b+m])}c.splice(0,0,g),c.splice(u?3:1,0,_)},ol=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((f,g)=>f*g,1)===0){n.length=0;for(let f=2;f<t[1].dims.length;++f)n.push(t[1].dims[f])}let r=e.format==="NHWC";n.splice(0,0,t[1].dims[0]),n.splice(r?3:1,0,t[1].dims[1]);let o=e.pads.slice(),a=e.outputShape.slice(),s=e.outputPadding.slice(),u=t[0].dims,d=e.dilations.slice();if(d.reduce((f,g)=>f+g,0)===0){let f=t[0].dims.length-2;d=new Array(f).fill(1)}let c=e.strides.slice();if(c.reduce((f,g)=>f+g,0)===0){let f=t[0].dims.length-2;c=new Array(f).fill(1)}If(u,n,d,e.autoPad,e.group,o,c,r,s,a);let m=Object.assign({},e);return Object.assign(m,{kernelShape:n,pads:o,outputPadding:s,outputShape:a,dilations:d,strides:c}),m},il=e=>{let t=en(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,a=e.group,s=e.kernelShape,u=e.pads,d=e.strides,c=e.wIsConst(),m=e.outputPadding,f=e.outputShape;return{autoPad:r,format:n,dilations:o,group:a,kernelShape:s,outputPadding:m,outputShape:f,pads:u,strides:d,wIsConst:c,...t,cacheKey:`${e.format};${t.activation};`}},Af=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[0];if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==o))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.reduce((m,f)=>m+f,0)>0&&t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.reduce((m,f)=>m+f,0)>0&&t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.reduce((m,f)=>m+f,0)>0&&t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.outputPadding.length!==a&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${a}D`);if(t.kernelShape.reduce((m,f)=>m+f,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},al=(e,t,n,r)=>{let o=e.kernelCustomData.wT??e.compute(Pe(t[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=o);let a=[t[0],o];t.length===3&&a.push(t[2]),e.compute(rl(a,n,r),{inputs:a})},Ef=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let o=t.kernelShape;(o.length===0||o[0]===0)&&(o=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],s=[1].concat(s),a=[1].concat(a),o=[1].concat(o);let d=t.outputPadding;d=[0].concat(d);let c=ol({...t,pads:u,strides:s,dilations:a,kernelShape:o,outputPadding:d},r);al(e,r,c,m=>n?[m[0],m[2],m[3]]:[m[0],m[1],m[3]])},sl=(e,t)=>{if(Af(e.inputs,t),e.inputs[0].dims.length===3)Ef(e,t);else{let n=ol(t,e.inputs);al(e,e.inputs,n)}}});var kf,ll,dl,cl=L(()=>{"use strict";ee();ae();Se();ue();kf=(e,t,n,r)=>{let o=E.size(t),a=t.length,s=P("input",e,a),u=N("output",e,a),d=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),c=E.normalizeAxis(d,a),m=f=>{let g=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,_=K("uniforms.input_shape","uniforms.axis",a),b=r.reverse?g+(r.exclusive?" + 1":""):"0",w=r.reverse?_:g+(r.exclusive?"":" + 1");return`
                ${f.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,u)}
                ${f.mainStart()}
                  ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${b};
                  let last : i32 = ${w};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:r.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:c},...W(t,t)]}),getShaderSource:m}},ll=(e,t)=>{let n=e.inputs[0].dims,r=e.inputs[0].dataType,o=e.inputs[1];e.compute(kf(r,n,o,t),{inputs:[0]})},dl=e=>{let t=e.exclusive===1,n=e.reverse===1;return te({exclusive:t,reverse:n})}});var Pf,Of,zf,pl,ml,fl=L(()=>{"use strict";ee();ae();Se();ue();Pf=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Of=(e,t,n,r)=>{let o=[];o.push(`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let a=0;a<t;++a)o.push(n.indicesSet("a",e[a],`i[${a}]`));return o.push("return a;}"),o.join(`
`)},zf=(e,t)=>{let n,r,o,a,s,u,d=t.format==="NHWC",c=t.blocksize,m=t.mode==="DCR";d?([n,r,o,a]=e.dims,s=m?[n,r,o,c,c,a/c**2]:[n,r,o,a/c**2,c,c],u=m?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,r,o,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=m?[n,c,c,a/c**2,r,o]:[n,a/c**2,c,c,r,o],u=m?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let f=e.reshape(s),g=f.dims.length,_=e.dataType,b=P("a",_,g),w=N("output",_,g),x=v=>`
  ${v.registerUniform("output_size","u32").declareVariables(b,w)}

  ${Of(u,g,b,w)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${w.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${w.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:v=>{let $=d?[n,r*c,o*c,a/c**2]:[n,a/c**2,r*c,o*c],T=E.size($),C=f.dims,A=E.sortBasedOnPerm(C,u);return{outputs:[{dims:$,dataType:v[0].dataType}],dispatchGroup:{x:Math.ceil(T/64)},programUniforms:[{type:12,data:T},...W(C,A)]}},getShaderSource:x}},pl=(e,t)=>{Pf(e.inputs),e.compute(zf(e.inputs[0],t))},ml=e=>te({blocksize:e.blocksize,mode:e.mode,format:e.format})});var Co,sn,hl,Df,Bf,Io,Ao,gl,Mf,yl,bl,_l=L(()=>{"use strict";ee();ae();Se();ue();Co="[a-zA-Z]|\\.\\.\\.",sn="("+Co+")+",hl="^"+sn+"$",Df="("+sn+",)*"+sn,Bf="^"+Df+"$",Io=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,n){let r=this.symbolToIndices.get(t);r===void 0?r=[n]:r.push(n),this.symbolToIndices.set(t,r)}},Ao=class{constructor(t,n){this.equation=n;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,o]=n.includes("->")?n.split("->",2):[n,""];if(!r.match(RegExp(Bf)))throw new Error("Invalid LHS term");if(r.split(",").forEach((u,d)=>{let c=t[d].dims.slice();if(!u.match(RegExp(hl)))throw new Error("Invalid LHS term");let m=this.processTerm(u,!0,c,d);this.lhs.push(m)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([u,d])=>d.count===1||u==="...").map(([u])=>u).join("");else if(!o.match(RegExp(sn)))throw new Error("Invalid RHS");o.match(RegExp(Co,"g"))?.forEach(u=>{if(u==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let d=this.symbolToInfo.get(u);if(d===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(d.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(t,n,r){let o=this.symbolToInfo.get(t);if(o!==void 0){if(o.dimValue!==n&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(r)}else o={count:1,dimValue:n,inputIndices:[r]};this.symbolToInfo.set(t,o)}processTerm(t,n,r,o=-1){let a=r.length,s=!1,u=[],d=0;if(!t.match(RegExp(hl))&&!n&&t!=="")throw new Error("Invalid LHS term");let c=t.match(RegExp(Co,"g")),m=new Io(o);return c?.forEach((f,g)=>{if(f==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let _=a-c.length+1;if(_<0)throw new Error("Ellipsis out of bounds");if(u=r.slice(d,d+_),this.hasEllipsis){if(this.ellipsisDims.length!==u.length||this.ellipsisDims.toString()!==u.toString())throw new Error("Ellipsis dimensions mismatch")}else if(n)this.hasEllipsis=!0,this.ellipsisDims=u;else throw new Error("Ellipsis must be specified in the LHS");for(let b=0;b<u.length;b++){let w=String.fromCharCode(48+b);m.addSymbol(w,g+b),this.addSymbol(w,r[d++],o)}}else m.addSymbol(f,g+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(f,r[d++],o)}),m}},gl=e=>e+"_max",Mf=(e,t,n,r)=>{let a=e.map(m=>m.length).map((m,f)=>P(`input${f}`,t,m)),s=E.size(r),u=N("output",t,r.length),d=[...n.symbolToInfo.keys()].filter(m=>!n.rhs.symbolToIndices.has(m)),c=m=>{let f=[],g="var prod = 1.0;",_="var sum = 0.0;",b="sum += prod;",w=[],x=[],v=[],$=[],T=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((A,I)=>{if(n.rhs.symbolToIndices.has(I)){let z=n.rhs.symbolToIndices.get(I)?.[0];z!==void 0&&n.lhs.forEach((D,R)=>{if(A.inputIndices.includes(R)){let H=D.symbolToIndices.get(I);if(H===void 0)throw new Error("Invalid symbol error");H.forEach(q=>{f.push(`${a[R].indicesSet(`input${R}Indices`,q,u.indicesGet("outputIndices",z))}`)})}})}else n.lhs.forEach((z,D)=>{if(A.inputIndices.includes(D)){let R=z.symbolToIndices.get(I);if(R===void 0)throw new Error("Invalid symbol error");R.forEach(H=>{w.push(`${a[D].indicesSet(`input${D}Indices`,H,`${I}`)}`)}),$.push(`prod *= ${a[D].getByIndices(`input${D}Indices`)};`)}}),x.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${gl(I)}; ${I}++) {`),v.push("}")});let C=T?[...f,`let sum = ${a.map((A,I)=>A.getByIndices(`input${I}Indices`)).join(" * ")};`]:[...f,_,...x,...w,g,...$,b,...v];return`
            ${m.registerUniforms(d.map(A=>({name:`${gl(A)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...a,u)}

            ${m.mainStart()}
            ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${u.offsetToIndices("global_idx")};
            ${a.map((A,I)=>`var input${I}Indices: ${a[I].type.indices};`).join(`
`)}
            ${C.join(`
`)};
            ${u.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let m=d.filter(g=>n.symbolToInfo.has(g)).map(g=>({type:12,data:n.symbolToInfo.get(g)?.dimValue||0}));m.push({type:12,data:s});let f=e.map((g,_)=>[...W(g)]).reduce((g,_)=>g.concat(_),m);return f.push(...W(r)),{outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:f}},getShaderSource:c}},yl=(e,t)=>{let n=new Ao(e.inputs,t.equation),r=n.outputDims,o=e.inputs.map((a,s)=>a.dims);e.compute(Mf(o,e.inputs[0].dataType,n,r))},bl=e=>{let t=e.equation.replace(/\s+/g,"");return te({equation:t})}});var Rf,wl,Uf,Nf,vl,$l=L(()=>{"use strict";ee();ae();ue();Rf=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=n.length<t.length?0:n.length-t.length,o=t.length<n.length?0:t.length-n.length;for(;r<n.length&&o<t.length;++r,++o)if(n[r]!==t[o]&&n[r]!==1&&t[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},wl=(e,t)=>{let n=e.length-t.length,r=[];for(let o=0;o<n;++o)r.push(e[o]);for(let o=0;o<t.length;++o)r.push(t[o]===1?e[o+n]:t[o]);return r},Uf=(e,t)=>e.length>t.length?wl(e,t):wl(t,e),Nf=e=>{let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=Uf(t,n),o=e[0].dataType,a=o===9||E.size(t)===1,s=o===9||t.length>0&&t[t.length-1]%4===0?4:1,u=a||r.length>0&&r[r.length-1]%4===0?4:1,d=Math.ceil(E.size(r)/u),c=f=>{let g=P("input",o,t.length,s),_=N("output",o,r.length,u),b;if(o===9){let w=(x,v,$="")=>`
          let outputIndices${v} = ${_.offsetToIndices(`outputOffset + ${v}u`)};
          let offset${v} = ${g.broadcastedIndicesToOffset(`outputIndices${v}`,_)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${x}[${v}] = ${$}(${g.getByOffset(`index${v}`)}[component${v}]);
        `;b=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${w("data",0,"u32")}
        ${w("data",1,"u32")}
        ${w("data",2,"u32")}
        ${w("data",3,"u32")}
        ${_.setByOffset("global_idx","data")}
      }`}else b=`
        let outputIndices = ${_.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${g.broadcastedIndicesToOffset("outputIndices",_)};
        let data = ${_.type.value}(${g.getByOffset(`inputOffset / ${s}`)});
        ${_.setByOffset("global_idx","data")}
      }`;return`
    ${f.registerUniform("vec_size","u32").declareVariables(g,_)}
    ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${b}`},m=[{type:12,data:d},...W(t,r)];return{name:"Expand",shaderCache:{hint:`${r.length};${s}${u}`,inputDependencies:["rank"]},getShaderSource:c,getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:m})}},vl=e=>{Rf(e.inputs),e.compute(Nf(e.inputs),{inputs:[0]})}});var Vf,xl,Sl=L(()=>{"use strict";ee();ae();ue();Jr();Vf=e=>{let t=e[0].dataType,n=E.size(e[0].dims),r=E.size(e[1].dims),o=r%4===0,a=s=>{let u=P("x",t,[1],4),d=P("bias",t,[1],4),c=N("y",t,[1],4),m=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],f=_=>`
      let bias${_}_offset: u32 = (global_idx * 4 + ${_}) % uniforms.bias_size;
      let bias${_} = ${d.getByOffset(`bias${_}_offset / 4`)}[bias${_}_offset % 4];`,g=o?`
      let bias = ${d.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${f(0)}${f(1)}${f(2)}${f(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(m).declareVariables(u,d,c)}

    ${bo(ke(t))}

    ${s.mainStart(Bt)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${g}
      let x_in = x + bias;
      ${c.setByOffset("global_idx",_o("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:r}],dispatchGroup:{x:Math.ceil(n/Bt/4)}})}},xl=e=>{e.inputs.length<2||E.size(e.inputs[1].dims)===0?_u(e):e.compute(Vf(e.inputs))}});var Lf,Wf,Tl,Cl,Il=L(()=>{"use strict";ee();ae();Se();ue();Lf=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Wf=(e,t)=>{let n=e[0].dims,r=e[1].dims,o=n.length,a=E.normalizeAxis(t.axis,o),s=n.slice(0);s.splice(a,1,...r);let u=n[a],d=e[0].dataType===9?4:1,c=Math.ceil(E.size(s)/d),m=[{type:12,data:c},{type:6,data:u},{type:12,data:a},...W(e[0].dims,e[1].dims,s)],f=g=>{let _=P("data",e[0].dataType,e[0].dims.length,d),b=P("inputIndices",e[1].dataType,e[1].dims.length),w=N("output",e[0].dataType,s.length,d),x=$=>{let T=r.length,C=`var indicesIndices${$}  = ${b.type.indices}(0);`;for(let A=0;A<T;A++)C+=`${T>1?`indicesIndices${$}[${A}]`:`indicesIndices${$}`} = ${s.length>1?`outputIndices${$}[uniforms.axis + ${A}]`:`outputIndices${$}`};`;C+=`
          var idx${$} = ${b.getByIndices(`indicesIndices${$}`)};
          if (idx${$} < 0) {
            idx${$} = idx${$} + uniforms.axisDimLimit;
          }
          var dataIndices${$} : ${_.type.indices};
        `;for(let A=0,I=0;A<o;A++)A===a?(C+=`${o>1?`dataIndices${$}[${A}]`:`dataIndices${$}`} = u32(idx${$});`,I+=T):(C+=`${o>1?`dataIndices${$}[${A}]`:`dataIndices${$}`} = ${s.length>1?`outputIndices${$}[${I}]`:`outputIndices${$}`};`,I++);return C},v;if(e[0].dataType===9){let $=(T,C,A="")=>`
          let outputIndices${C} = ${w.offsetToIndices(`outputOffset + ${C}u`)};
          ${x(C)};
          let offset${C} = ${_.indicesToOffset(`dataIndices${C}`)};
          let index${C} = offset${C} / 4u;
          let component${C} = offset${C} % 4u;
          ${T}[${C}] = ${A}(${_.getByOffset(`index${C}`)}[component${C}]);
        `;v=`
        let outputOffset = global_idx * ${d};
        var value = vec4<u32>(0);
        ${$("value",0,"u32")}
        ${$("value",1,"u32")}
        ${$("value",2,"u32")}
        ${$("value",3,"u32")}
        ${w.setByOffset("global_idx","value")}
      `}else v=`
      let outputIndices = ${w.offsetToIndices("global_idx")};
      ${x("")};
      let value = ${_.getByIndices("dataIndices")};
      ${w.setByOffset("global_idx","value")};
      `;return`
      ${g.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(_,b,w)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:m}),getShaderSource:f}},Tl=e=>te({axis:e.axis}),Cl=(e,t)=>{let n=e.inputs;Lf(n),e.compute(Wf(e.inputs,t))}});var Gf,Al,El,kl=L(()=>{"use strict";ee();ae();ue();Gf=(e,t,n,r,o,a,s,u,d)=>{let c=[{type:12,data:a},{type:12,data:r},{type:12,data:o},{type:12,data:n},{type:12,data:s},{type:12,data:u},{type:12,data:d}],m=[a];c.push(...W(t.dims,m));let f=g=>{let _=P("indices_data",t.dataType,t.dims.length),b=N("input_slice_offsets_data",12,1,1),w=[_,b],x=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${g.registerUniforms(x).declareVariables(...w)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:m,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}),getShaderSource:f},{inputs:[t],outputs:[-1]})[0]},Al=(e,t)=>{let n=e.inputs,r=n[0].dims,o=n[0].dataType,a=n[1].dims,s=a[a.length-1],u=E.sizeToDimension(a,a.length-1),d=E.sizeFromDimension(r,t.batchDims+s),c=E.sizeToDimension(r,t.batchDims),m=E.sizeFromDimension(r,t.batchDims),f=u/c,g=new Array(s),_=d;for(let C=0;C<s;++C)g[s-1-C]=_,_*=r[t.batchDims+s-1-C];let b=Gf(e,n[1],g,t.batchDims,r,u,f,m,s),w=t.batchDims+s;if(w>r.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let x=a.slice(0,-1).concat(r.slice(w)),v=E.size(x),$=[{type:12,data:v},{type:12,data:d},...W(n[0].dims,b.dims,x)],T=C=>{let A=P("data",n[0].dataType,n[0].dims.length),I=P("slice_offsets",12,b.dims.length),z=N("output",n[0].dataType,x.length);return`
          ${C.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(A,I,z)}
            ${C.mainStart()}
            ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:x,dataType:o}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:$}),getShaderSource:T},{inputs:[n[0],b]})},El=e=>({batchDims:e.batch_dims,cacheKey:""})});var Hf,Ff,Pl,Ol,zl=L(()=>{"use strict";ee();ae();Se();ue();Hf=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=E.normalizeAxis(t.quantizeAxis,e[0].dims.length),r=t.blockSize,o=e[0],a=e[2],s=e.length===4?e[3]:void 0;if(a.dims.length!==o.dims.length||!o.dims.map((u,d)=>d===n?Math.ceil(u/r)===a.dims[d]:u===a.dims[d]).reduce((u,d)=>u&&d,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==a.dims.length||!s.dims.map((u,d)=>u===a.dims[d]).reduce((u,d)=>u&&d,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Ff=(e,t)=>{let n=e[0].dims,r=e[1].dims,o=n.length,a=E.normalizeAxis(t.gatherAxis,o),s=E.normalizeAxis(t.quantizeAxis,o),u=n.slice(0);u.splice(a,1,...r);let d=E.size(u),c=e[2].dataType,f=e[0].dataType===22,g=[{type:12,data:d},{type:12,data:s},{type:12,data:a},{type:12,data:t.blockSize},...W(...e.map((b,w)=>b.dims),u)],_=b=>{let w=P("data",e[0].dataType,e[0].dims.length),x=P("inputIndices",e[1].dataType,e[1].dims.length),v=P("scales",e[2].dataType,e[2].dims.length),$=e.length>3?P("zeroPoint",e[3].dataType,e[3].dims.length):void 0,T=N("output",c,u.length),C=[w,x,v];$&&C.push($);let A=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${b.registerUniforms(A).declareVariables(...C,T)}
        ${b.mainStart()}
        let output_indices = ${T.offsetToIndices("global_idx")};
        var indices_indices = ${x.type.indices}(0);
        ${r.length>1?`
          for (var i: u32 = 0; i < ${r.length}; i++) {
            let index = ${T.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${x.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${T.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${w.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${T.indicesGet("output_indices","i")};
          ${w.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${x.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[a]};
        }
        ${w.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${T.indicesGet("output_indices",`i + ${r.length} - 1`)};
          ${w.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${w.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${w.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${v.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${v.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${v.getByIndices("scale_indices")};
        ${$?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${$.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${$.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${ke(c)}(quantized_data - zero_point) * scale;
        ${T.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((b,w)=>w!==1).map(b=>b.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(b,w)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:c}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:g}),getShaderSource:_}},Pl=(e,t)=>{let n=e.inputs;Hf(n,t),e.compute(Ff(e.inputs,t))},Ol=e=>te({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})});var qf,jf,Dl,Bl,Ml=L(()=>{"use strict";ee();ae();Se();ue();qf=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},jf=(e,t)=>{let n=e[0].dims,r=e[0].dataType,o=n.length,a=e[1].dims,s=e[1].dataType,u=E.normalizeAxis(t.axis,o),d=n[u],c=a.slice(0),m=E.size(c),f=P("input",r,o),g=P("indicesInput",s,a.length),_=N("output",r,c.length),b=[{type:12,data:m},{type:6,data:d},{type:12,data:u}];return b.push(...W(n,a,c)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:b}),getShaderSource:v=>`
      ${v.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,g,_)}
      ${v.mainStart()}
      ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${_.offsetToIndices("global_idx")};

      var idx = ${g.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${_.setByOffset("global_idx","value")};
  }`}},Dl=e=>te({axis:e.axis}),Bl=(e,t)=>{let n=e.inputs;qf(n),e.compute(jf(e.inputs,t))}});var Kf,Zf,Rl,Ul,Nl=L(()=>{"use strict";ee();ae();ue();Kf=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Zf=(e,t)=>{let n=e[0].dims.slice(),r=e[1].dims.slice(),[o,a,s]=Vr.getShapeOfGemmResult(n,t.transA,r,t.transB,e.length===3?e[2].dims:void 0),u=[o,a];if(!u)throw new Error("Can't use gemm on the given tensors");let d=16,c=Math.ceil(a/d),m=Math.ceil(o/d),f=!0,g=E.size(u),_=[{type:12,data:f?c:g},{type:12,data:o},{type:12,data:a},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],b=["type","type"];e.length===3&&(_.push(...W(e[2].dims)),b.push("rank")),_.push(...W(u));let w=v=>{let $="";t.transA&&t.transB?$="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?$="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?$="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&($="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let T=t.alpha===1?"":"value *= uniforms.alpha;",C=P("a",e[0].dataType,e[0].dims),A=P("b",e[1].dataType,e[1].dims),I=C.type.value,z=null,D=[C,A];e.length===3&&(z=P("c",e[2].dataType,e[2].dims.length),D.push(z));let R=N("output",e[0].dataType,u.length);D.push(R);let H=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${v.registerUniforms(H).declareVariables(...D)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${I}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${$}
    }

    ${T}
    ${z!=null?`let cOffset = ${z.broadcastedIndicesToOffset("vec2(m, n)",R)}; value += ${I}(uniforms.beta) * ${z.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},x=v=>{let $=P("a",e[0].dataType,e[0].dims),T=P("b",e[1].dataType,e[1].dims),C=null,A=[$,T];e.length===3&&(C=P("c",e[2].dataType,e[2].dims.length),A.push(C));let I=N("output",e[0].dataType,u.length);A.push(I);let z=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],D="",R="";t.transA&&t.transB?(R=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,D="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(R=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,D="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(R=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,D="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(R=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,D="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let H=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${v.registerUniforms(z).declareVariables(...A)}
  var<workgroup> tile_a: array<array<${$.type.storage}, ${d}>, ${d}>;
  var<workgroup> tile_b: array<array<${T.type.storage}, ${d}>, ${d}>;
  ${v.mainStart([d,d,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${d};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${d};
    let num_tiles = (uniforms.K - 1) / ${d} + 1;
    var k_start = 0u;
    var value = ${I.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${R}
      k_start = k_start + ${d};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${d}; k++) {
        ${D}
      }
      workgroupBarrier();
    }

    ${H}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${C!=null?`let cOffset = ${C.broadcastedIndicesToOffset("vec2(m, n)",I)}; value += ${I.type.value}(uniforms.beta) * ${C.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return f?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:c*m},programUniforms:_}),getShaderSource:x}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:_}),getShaderSource:w}},Rl=e=>{let t=e.transA,n=e.transB,r=e.alpha,o=e.beta;return{transA:t,transB:n,alpha:r,beta:o,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Ul=(e,t)=>{Kf(e.inputs),e.compute(Zf(e.inputs,t))}});var pt,Ct,Ft,qt,Qf,Yf,Xf,Jf,eh,th,rh,nh,Vl,Ll,Wl=L(()=>{"use strict";ee();ae();Se();ue();[pt,Ct,Ft,qt]=[0,1,2,3],Qf=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Yf=`
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
`,Xf=e=>`
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
`,Jf=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,eh=e=>`
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
`,th=(e,t,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${pt}] = batch;
     indices[${Ct}] = channel;`+(()=>{switch(n.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Ft}] = u32(r);
            indices[${qt}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${Ft}] = u32(clamp(r, 0, H - 1));
          indices[${qt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Ft}] = gs_reflect(r, border[1], border[3]);
          indices[${qt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,rh=(e,t,n)=>(()=>{switch(n.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${pt}], indices[${Ct}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${pt}], indices[${Ct}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${pt}], indices[${Ct}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${pt}], indices[${Ct}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${pt}], indices[${Ct}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${pt}], indices[${Ct}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${n.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,nh=(e,t)=>{let n=P("x",e[0].dataType,e[0].dims.length),r=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],o=P("grid",e[1].dataType,r.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[pt,Ct,Ft,qt]=[0,3,1,2]);let s=N("output",e[0].dataType,a.length),u=n.type.value,d=E.size(a),c=[{type:12,data:d},...W(e[0].dims,r,a)],m=f=>`
  ${f.registerUniform("output_size","u32").declareVariables(n,o,s)}
  ${Yf}
  ${Xf(u)}
  ${Jf(t)}
  ${eh(t)}
  ${th(n,u,t)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Ft}]);
      let W_in = i32(uniforms.x_shape[${qt}]);

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
      var grid_indices = vec3<u32>(indices[${pt}], indices[${Ft}], indices[${qt}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${rh(s,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:f=>{let g=E.size(a);return{outputs:[{dims:a,dataType:f[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:c}},getShaderSource:m}},Vl=(e,t)=>{Qf(e.inputs),e.compute(nh(e.inputs,t))},Ll=e=>te({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})});var Re,ah,Hl,Gl,sh,sr,Fl,Eo=L(()=>{"use strict";ee();ae();Se();qr();Yr();ue();ct();Re=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,ah=(e,t)=>{let n=e[0],r=Re(e,1),o=Re(e,2),a=Re(e,3),s=Re(e,4),u=Re(e,5),d=Re(e,6),c=Re(e,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let m=n.dims[0],f=n.dims[1],g=n.dims.length===3?n.dims[2]:t.numHeads*n.dims[4],_=f,b=0,w=0,x=Math.floor(g/t.numHeads);if(d&&c&&E.size(d.dims)&&E.size(c.dims)){if(d.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==m||d.dims[1]!==t.numHeads||d.dims[3]!==x)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(c.dims[0]!==m||c.dims[1]!==t.numHeads||c.dims[3]!==x)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==c.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(c.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');b=d.dims[2],w=d.dims[2]}else if(d&&E.size(d.dims)||c&&E.size(c.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v;if(r&&E.size(r.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(r.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');v=2,_=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==x)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');v=5,_=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==x)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');v=0,_=r.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==t.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}if(a&&E.size(a.dims)>0){if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(r&&r.dims.length===5&&r.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let $=b+_,T=0;if(s&&E.size(s.dims)>0){T=8;let z=s.dims;throw z.length===1?z[0]===m?T=1:z[0]===3*m+2&&(T=3):z.length===2&&z[0]===m&&z[1]===$&&(T=5),T===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let C=!1,A=g;if(o&&E.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(_!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');A=o.dims[2]}else{if(_!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');A=o.dims[1]*o.dims[3],C=!0}}let I=!1;if(s&&E.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(u&&E.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==m||u.dims[1]!==t.numHeads||u.dims[2]!==f||u.dims[3]!==$)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:m,sequenceLength:f,pastSequenceLength:b,kvSequenceLength:_,totalSequenceLength:$,maxSequenceLength:w,inputHiddenSize:0,hiddenSize:g,vHiddenSize:A,headSize:x,vHeadSize:Math.floor(A/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:T,scale:t.scale,broadcastResPosBias:I,passPastInKv:C,qkvFormat:v}},Hl=e=>te({...e}),Gl=te({perm:[0,2,1,3]}),sh=(e,t,n,r,o,a,s)=>{let u=[r,o,a],d=E.size(u),c=[{type:12,data:d},{type:12,data:s},{type:12,data:a}],m=f=>{let g=N("qkv_with_bias",t.dataType,u),_=P("qkv",t.dataType,u),b=P("bias",n.dataType,u),w=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${f.registerUniforms(w).declareVariables(_,b,g)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:m},{inputs:[t,n],outputs:[-1]})[0]},sr=(e,t,n,r,o,a,s,u)=>{let d=a;if(s&&E.size(s.dims)>0){if(r===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return d=sh(e,a,s,t,r,n*o,u),d=d.reshape([t,r,n,o]),n===1||r===1?d:e.compute(Pe(d,Gl.perm),{inputs:[d],outputs:[-1]})[0]}else return a.dims.length===3&&(d=a.reshape([t,r,n,o])),n===1||r===1?d:e.compute(Pe(d,Gl.perm),{inputs:[d],outputs:[-1]})[0]},Fl=(e,t)=>{let n=ah(e.inputs,t),r=e.inputs[0],o=Re(e.inputs,1),a=Re(e.inputs,2),s=Re(e.inputs,3),u=Re(e.inputs,4),d=Re(e.inputs,5),c=Re(e.inputs,6),m=Re(e.inputs,7);if(r.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let f=o&&a&&o.dims.length===4&&a.dims.length===4,g=sr(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,r,s,0);if(f)return Ht(e,g,o,a,u,void 0,c,m,d,n);if(!o||!a)throw new Error("key and value must be provided");let _=sr(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,o,s,n.hiddenSize),b=sr(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,a,s,2*n.hiddenSize);Ht(e,g,_,b,u,void 0,c,m,d,n)}});var uh,lh,dh,ch,ko,ql,jl,Po=L(()=>{"use strict";ee();ae();Se();ue();uh=e=>{if(!e||e.length<1)throw new Error("too few inputs")},lh=(e,t)=>{let n=[],r=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(o=>n.push(Number(o))),r=n.length),te({numOutputs:r,axis:t.axis,splitSizes:n})},dh=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${K("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,ch=e=>{let t=e.length,n=[];for(let r=0;r<t;++r){let o=e[r].setByIndices("indices","input[global_idx]");t===1?n.push(o):r===0?n.push(`if (output_number == ${r}u) { ${o} }`):r===t-1?n.push(`else { ${o} }`):n.push(`else if (output_number == ${r}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},ko=(e,t)=>{let n=e[0].dims,r=E.size(n),o=e[0].dataType,a=E.normalizeAxis(t.axis,n.length),s=new Array(t.numOutputs),u=P("input",o,n.length),d=new Array(t.numOutputs),c=[],m=[],f=0,g=[{type:12,data:r}];for(let b=0;b<t.numOutputs;b++){f+=t.splitSizes[b],d[b]=f;let w=n.slice();w[a]=t.splitSizes[b],m.push(w),s[b]=N(`output${b}`,o,w.length),c.push({dims:m[b],dataType:e[0].dataType})}g.push({type:12,data:d},...W(n,...m));let _=b=>`
  ${b.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",d.length).declareVariables(u,...s)}
  ${dh(d.length)}
  ${ch(s)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${K("uniforms.size_in_split_axis","output_number - 1u",d.length)};
      ${u.indicesSet("indices",a,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:c,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:g})}},ql=(e,t)=>{uh(e.inputs);let n=e.inputs.length===1?t:lh(e.inputs,t);e.compute(ko(e.inputs,n),{inputs:[0]})},jl=e=>{let t=e.axis,n=e.splitSizes,r=e.numOutputs<0?n.length:e.numOutputs;if(r!==n.length)throw new Error("numOutputs and splitSizes length must be equal");return te({axis:t,numOutputs:r,splitSizes:n})}});var ph,un,Kl,Oo=L(()=>{"use strict";ee();ae();Se();ue();ph=(e,t)=>{let[n,r,o,a]=e,{numHeads:s,rotaryEmbeddingDim:u}=t;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!E.areEqual(r.dims,[])&&!E.areEqual(r.dims,[1])&&r.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!E.areEqual(o.dims,a.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let d=n.dims[0],c=n.dims[n.dims.length-2],m=o.dims[0],f=E.sizeFromDimension(n.dims,1)/c,g=u===0?o.dims[1]*2:f/s;if(u>g)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(r.dims.length===2){if(d!==r.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);if(c!==r.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`)}if(g/2!==o.dims[1]&&u/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(c>m)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},un=(e,t)=>{let{interleaved:n,numHeads:r,rotaryEmbeddingDim:o,scale:a}=t,s=e[0].dims[0],u=E.sizeFromDimension(e[0].dims,1),d=e[0].dims[e[0].dims.length-2],c=u/d,m=e[2].dims[1],f=o===0?m*2:c/r,g=new Array(s,d,c/f,f-m),_=E.computeStrides(g),b=[{type:1,data:a},{type:12,data:g},{type:12,data:_},...e[0].dims.length===3?new Array({type:12,data:[u,c,f,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,f,d*f,1]}):[],...W(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],w=x=>{let v=P("input",e[0].dataType,e[0].dims.length),$=P("position_ids",e[1].dataType,e[1].dims.length),T=P("cos_cache",e[2].dataType,e[2].dims.length),C=P("sin_cache",e[3].dataType,e[3].dims.length),A=N("output",e[0].dataType,e[0].dims.length);return x.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:g.length},{name:"global_strides",type:"u32",length:_.length},{name:"input_output_strides",type:"u32",length:_.length}]),`
        ${x.declareVariables(v,$,T,C,A)}

        ${x.mainStart(Bt)}
          let half_rotary_emb_dim = uniforms.${T.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${$.broadcastedIndicesToOffset("bsnh.xy",N("",$.type.tensor,2))};
            let position_id =
                u32(${$.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${v.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} -
                ${v.getByOffset("j")} * ${C.get("position_id","bsnh[3]")};
            ${A.setByOffset("i","re")}
            let im = ${v.getByOffset("i")} * ${C.get("position_id","bsnh[3]")} +
                ${v.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${A.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${A.setByOffset("k",v.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:te({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(E.size(g)/Bt)},programUniforms:b})}},Kl=(e,t)=>{ph(e.inputs,t),e.compute(un(e.inputs,t))}});var mh,fh,Zl,hh,Ql,Yl=L(()=>{"use strict";Se();ee();Yr();Eo();Po();ct();Oo();ue();mh=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=e[0],r=e[1],o=e[2],a=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,d=n.dims[0],c=n.dims[1],m=n.dims.length===3?u?n.dims[2]/3:n.dims[2]:t.numHeads*n.dims[4],f=c,g=0,_=!r||r.dims.length===0,b=Math.floor(_?m/(t.numHeads+2*t.kvNumHeads):m/t.numHeads);_&&(m=b*t.numHeads);let w=a&&a.dims.length!==0,x=s&&s.dims.length!==0;if(w&&a.dims.length===4&&a.dims[0]===d&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===b)throw new Error("BSNH pastKey/pastValue is not supported");if(w&&x){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=a.dims[2]}else if(w||x)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $=1;if(r&&r.dims.length>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(n.dims[2]%r.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');f=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==b)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');f=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==b)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');f=r.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==t.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}let T=0,C=!1,A=t.kvNumHeads?b*t.kvNumHeads:m;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(f!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');A=o.dims[2]}else{if(f!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');A=o.dims[1]*o.dims[3],C=!0}}let I=e.length>4?e[5]:void 0;if(I&&I.dims.length!==1&&I.dims[0]!==d)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:d,sequenceLength:c,pastSequenceLength:g,kvSequenceLength:f,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:m,vHiddenSize:A,headSize:b,vHeadSize:Math.floor(A/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:T,scale:t.scale,broadcastResPosBias:!1,passPastInKv:C,qkvFormat:$}},fh=te({perm:[0,2,1,3]}),Zl=(e,t,n)=>{let r=t,o=n.kvNumHeads;return t.dims.length===3&&n.kvSequenceLength!==0&&(r=t.reshape([n.batchSize,n.kvSequenceLength,o,n.headSize]),r=e.compute(Pe(r,fh.perm),{inputs:[r],outputs:[-1]})[0]),r},hh=(e,t,n,r)=>{let o=7,a=["type","type"],s=[e*t],u=e*t,d=[{type:12,data:u},{type:12,data:t},{type:12,data:e}],c=m=>{let f=P("seq_lens",n.dataType,n.dims),g=P("total_seq_lens",r.dataType,r.dims),_=N("pos_ids",o,s),b=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${m.registerUniforms(b).declareVariables(f,g,_)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${g.getByOffset("0")});
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
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:c}},Ql=(e,t)=>{let n=mh(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let r=e.inputs[0],o=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,u=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,d=e.inputs.length>4?e.inputs[5]:void 0,c=e.inputs.length>5?e.inputs[6]:void 0,m=n.kvNumHeads?n.kvNumHeads:n.numHeads,f=te({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,m*n.headSize,m*n.headSize]}),[g,_,b]=!o&&!a?e.compute(ko([r],f),{inputs:[r],outputs:[-1,-1,-1]}):[r,o,a],w,x;if(t.doRotary){let C=e.compute(hh(n.batchSize,n.sequenceLength,d,c),{inputs:[d,c],outputs:[-1]})[0],A=e.inputs[7],I=e.inputs[8],z=te({interleaved:t.rotaryInterleaved!==0,numHeads:n.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),D=[g,C,A,I],R=[-1];w=e.compute(un(D,z),{inputs:D,outputs:R})[0],D.splice(0,1,_);let H=te({interleaved:t.rotaryInterleaved!==0,numHeads:n.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});x=e.compute(un(D,H),{inputs:D,outputs:R})[0]}let v=sr(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t.doRotary?w:g,void 0,0),$=Zl(e,t.doRotary?x:_,n),T=Zl(e,b,n);Ht(e,v,$,T,void 0,void 0,s,u,void 0,n,d,c)}});var Xl,gh,yh,Jl,ed=L(()=>{"use strict";ee();ae();ct();ue();Xl=(e,t,n,r,o,a,s,u)=>{let d=he(a),c=d===1?"f32":`vec${d}f`,m=d===1?"vec2f":`mat2x${d}f`,f=o*s,g=64;f===1&&(g=256);let _=[o,s,a/d],b=[o,s,2],w=["rank","type","type"],x=[];x.push(...W(_,b));let v=$=>{let T=P("x",t.dataType,3,d),C=P("scale",n.dataType,n.dims),A=P("bias",r.dataType,r.dims),I=N("output",1,3,2),z=[T,C,A,I];return`
  var<workgroup> workgroup_shared : array<${m}, ${g}>;
  const workgroup_size = ${g}u;
  ${$.declareVariables(...z)}
  ${$.mainStart(g)}
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
    workgroup_shared[local_idx] = ${m}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${je("workgroup_shared[0][0]",d)} / f32(hight * ${d});
      let squared_sum_final = ${je("workgroup_shared[0][1]",d)} / f32(hight * ${d});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${d};${u};${g}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:b,dataType:1}],dispatchGroup:{x:f},programUniforms:x}),getShaderSource:v},{inputs:[t,n,r],outputs:[-1]})[0]},gh=(e,t,n)=>{let r=t[0].dims,o=r,a=2,s=r[0],u=r[1],d=E.sizeFromDimension(r,a),c=he(d),m=E.size(o)/c,f=Xl(e,t[0],t[1],t[2],s,d,u,n.epsilon),g=[s,u,d/c],_=[s,u],b=["type","none"],w=x=>{let v=P("x",t[0].dataType,g.length,c),$=P("scale_shift",1,_.length,2),T=N("output",t[0].dataType,g.length,c),C=[v,$,T];return`
  ${x.registerUniform("output_size","u32").declareVariables(...C)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${T.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${$.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${v.getByOffset("global_idx")} * ${T.type.value}(scale_shift.x) + ${T.type.value}(scale_shift.y);
      ${T.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${c}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...W(g,_,g)]}),getShaderSource:w},{inputs:[t[0],f]})},yh=(e,t,n)=>{let r=t[0].dims,o=r,a=r[0],s=r[r.length-1],u=E.sizeFromDimension(r,1)/s,d=he(s),c=E.size(o)/d,m=[{type:12,data:u},{type:12,data:Math.floor(s/d)}],f=["type","type"],g=!1,_=[0,r.length-1];for(let v=0;v<r.length-2;v++)g=g||r[v+1]!==1,_.push(v+1);g=g&&r[r.length-1]!==1;let b=g?e.compute(Pe(e.inputs[0],_),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:r.length},(v,$)=>r[_[$]])),w=Xl(e,b,t[1],t[2],a,u,s,n.epsilon),x=v=>{let $=ve(t[0].dataType),T=d===1?"vec2f":`mat${d}x2f`,C=z=>{let D=z===0?"x":"y",R=d===1?"f32":`vec${d}f`;switch(d){case 1:return`${$}(${R}(scale.${D}))`;case 2:return`vec2<${$}>(${R}(scale[0].${D}, scale[1].${D}))`;case 4:return`vec4<${$}>(${R}(scale[0].${D}, scale[1].${D}, scale[2].${D}, scale[3].${D}))`;default:throw new Error(`Not supported compoents ${d}`)}},A=P("input",t[0].dataType,t[0].dims,d),I=N("output",t[0].dataType,o,d);return`
  @group(0) @binding(0) var<storage, read> input : array<${A.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${T}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${I.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${v.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${C(0)}, ${C(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${d}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:m}),getShaderSource:x},{inputs:[t[0],w]})},Jl=(e,t)=>{t.format==="NHWC"?yh(e,e.inputs,t):gh(e,e.inputs,t)}});var bh,_h,td,rd=L(()=>{"use strict";ee();ae();ue();bh=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},_h=(e,t,n)=>{let r=t.simplified,o=e[0].dims,a=e[1],s=!r&&e[2],u=o,d=E.normalizeAxis(t.axis,o.length),c=E.sizeToDimension(o,d),m=E.sizeFromDimension(o,d),f=E.size(a.dims),g=s?E.size(s.dims):0;if(f!==m||s&&g!==m)throw new Error(`Size of X.shape()[axis:] == ${m}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${f} and bias size of ${g}`);let _=[];for(let A=0;A<o.length;++A)A<d?_.push(o[A]):_.push(1);let b=he(m),w=["type","type"],x=[{type:12,data:c},{type:1,data:m},{type:12,data:Math.floor(m/b)},{type:1,data:t.epsilon}];s&&w.push("type");let v=n>1,$=n>2,T=A=>{let I=ve(e[0].dataType),z=[P("x",e[0].dataType,e[0].dims,b),P("scale",a.dataType,a.dims,b)];s&&z.push(P("bias",s.dataType,s.dims,b)),z.push(N("output",e[0].dataType,u,b)),v&&z.push(N("mean_data_output",1,_)),$&&z.push(N("inv_std_output",1,_));let D=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${A.registerUniforms(D).declareVariables(...z)}
  ${A.mainStart()}
    ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${fo("f32",b)};
    var mean_square_vector = ${fo("f32",b)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Mt(I,b,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${je("mean_vector",b)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${je("mean_square_vector",b)} / uniforms.norm_size ${r?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Mt(I,b,"x[j + offset]")};
      let f32scale = ${Mt(I,b,"scale[j]")};
      output[j + offset] = ${z[0].type.value}((f32input ${r?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Mt(I,b,"bias[j]")}`:""}
      );
    }

    ${v?"mean_data_output[global_idx] = mean":""};
    ${$?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},C=[{dims:u,dataType:e[0].dataType}];return v&&C.push({dims:_,dataType:1}),$&&C.push({dims:_,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${b};${n};${r}`,inputDependencies:w},getRunData:()=>({outputs:C,dispatchGroup:{x:Math.ceil(c/64)},programUniforms:x}),getShaderSource:T}},td=(e,t)=>{bh(e.inputs),e.compute(_h(e.inputs,t,e.outputCount))}});var wh,nd,od=L(()=>{"use strict";ae();nn();on();wh=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},nd=e=>{wh(e.inputs);let t=tt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let n=t[t.length-1],r=e.inputs[0].dims[e.inputs[0].dims.length-1];if(n<8&&r<8)e.compute(rn(e.inputs,{activation:""},t));else{let o=t[t.length-2],a=E.size(e.inputs[0].dims.slice(0,-2)),s=E.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&o===1&&s===1){let u=e.inputs[0].reshape([1,a,r]),d=e.inputs[1].reshape([1,r,n]),c=[1,a,n],m=[u,d];e.compute(ar(m,{activation:""},t,c),{inputs:m})}else e.compute(ar(e.inputs,{activation:""},t))}}});var vh,$h,xh,id,ad,sd=L(()=>{"use strict";ee();ae();Se();ue();vh=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=e[0],r=n.dims.length;if(n.dims[r-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,s=e[1];if(!E.areEqual(s.dims,[t.n,o,a]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let d=e[2].dims;if(E.size(d)!==t.n*o)throw new Error("scales input size error.");if(e.length===4){let m=e[3].dims,f=t.n*(t.bits===8?o:Math.floor((o*t.bits+7)/8));if(E.size(m)!==f)throw new Error("zeroPoints input size error.")}},$h=(e,t)=>{let n=e[0].dims,r=n.length,o=n[r-2],a=t.k,s=t.n,u=n.slice(0,r-2),d=E.size(u),m=e[1].dims[2]/4,f=e[0].dataType,g=he(t.k),_=he(m),b=he(s),w=u.concat([o,s]),x=o>1&&s/b%2===0?2:1,v=E.size(w)/b/x,$=64,T=[],C=[d,o,a/g],A=E.convertShape(e[1].dims).slice();A.splice(-1,1,m/_),T.push(...W(C)),T.push(...W(A)),T.push(...W(e[2].dims)),e.length===4&&T.push(...W(E.convertShape(e[3].dims)));let I=[d,o,s/b];T.push(...W(I));let z=D=>{let R=C.length,H=P("a",e[0].dataType,R,g),q=P("b",12,A.length,_),Y=P("scales",e[2].dataType,e[2].dims.length),ne=[H,q,Y],F=e.length===4?P("zero_points",12,e[3].dims.length):void 0;F&&ne.push(F);let me=I.length,oe=N("output",e[0].dataType,me,b),j=ve(e[0].dataType),ie=(()=>{switch(g){case 1:return`array<${j}, 8>`;case 2:return`mat4x2<${j}>`;case 4:return`mat2x4<${j}>`;default:throw new Error(`${g}-component is not supported.`)}})(),Z=()=>{let pe=`
          // reuse a data
            var input_offset = ${H.indicesToOffset(`${H.type.indices}(batch, row, word_offset)`)};
            var a_data: ${ie};
            for (var j: u32 = 0; j < ${8/g}; j++) {
              a_data[j] = ${H.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let J=0;J<b*x;J++)pe+=`
            b_value = ${_===1?`b${J}_data`:`b${J}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${ie}(${Array.from({length:4},(V,O)=>`${j}(b_value_lower[${O}]), ${j}(b_value_upper[${O}])`).join(", ")});
            b_dequantized_values = ${g===1?`${ie}(${Array.from({length:8},(V,O)=>`(b_quantized_values[${O}] - ${F?`zero_point${J}`:"zero_point"}) * scale${J}`).join(", ")});`:`(b_quantized_values - ${ie}(${Array(8).fill(`${F?`zero_point${J}`:"zero_point"}`).join(",")})) * scale${J};`};
            workgroup_shared[local_id.x * ${x} + ${Math.floor(J/b)}]${b>1?`[${J%b}]`:""} += ${Array.from({length:8/g},(V,O)=>`${g===1?`a_data[${O}] * b_dequantized_values[${O}]`:`dot(a_data[${O}], b_dequantized_values[${O}])`}`).join(" + ")};
          `;return pe},ce=()=>{let pe=`
            var col_index = col * ${b};
            ${F?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${j}(8);`}
            `;for(let J=0;J<b*x;J++)pe+=`
            let scale${J} = ${Y.getByOffset("col_index * nBlocksPerCol + block")};
            ${F?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${F.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${J} = ${j}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return pe},Te=()=>{let pe=`col_index = col * ${b};`;for(let J=0;J<b*x;J++)pe+=`
            let b${J}_data = ${q.getByIndices(`${q.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return pe+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ie};
            var b_dequantized_values: ${ie};`,pe};return`
        var<workgroup> workgroup_shared: array<${oe.type.value}, ${x*$}>;
        ${D.declareVariables(...ne,oe)}
        ${D.mainStart([$,1,1])}
          let output_indices = ${oe.offsetToIndices(`(global_idx / ${$}) * ${x}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${$}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/g};
            ${ce()}
            for (var word: u32 = 0; word < ${m}; word += ${_}) {
              ${Te()}
              for (var i: u32 = 0; i < ${_}; i++) {
                ${Z()}
                word_offset += ${8/g};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${x}) {
            var output_value: ${oe.type.value} = ${oe.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${$}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${x};
            }
            ${oe.setByIndices(`${oe.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${g};${_};${b};${x};${$}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:w,dataType:f}],dispatchGroup:{x:v},programUniforms:T}),getShaderSource:z}},xh=(e,t)=>{let n=e[0].dims,r=n.length,o=n[r-2],a=t.k,s=t.n,u=n.slice(0,r-2),d=E.size(u),m=e[1].dims[2]/4,f=e[0].dataType,g=he(t.k),_=he(m),b=u.concat([o,s]),w=128,x=s%8===0?8:s%4===0?4:1,v=w/x,$=v*_*8,T=$/g,C=$/t.blockSize,A=E.size(b)/x,I=[],z=[d,o,a/g],D=E.convertShape(e[1].dims).slice();D.splice(-1,1,m/_),I.push(...W(z)),I.push(...W(D)),I.push(...W(e[2].dims)),e.length===4&&I.push(...W(E.convertShape(e[3].dims)));let R=[d,o,s];I.push(...W(R));let H=q=>{let Y=z.length,ne=P("a",e[0].dataType,Y,g),F=P("b",12,D.length,_),me=P("scales",e[2].dataType,e[2].dims.length),oe=[ne,F,me],j=e.length===4?P("zero_points",12,e[3].dims.length):void 0;j&&oe.push(j);let ie=R.length,Z=N("output",e[0].dataType,ie),ce=ve(e[0].dataType),Te=()=>{switch(g){case 1:return`
          let a_data0 = vec4<${ce}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ce}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${ce}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ce}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${g}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${ne.type.value}, ${T}>;
        var<workgroup> inter_results: array<array<${Z.type.value}, ${v}>, ${x}>;
        ${q.declareVariables(...oe,Z)}
        ${q.mainStart([v,x,1])}
          let output_indices = ${Z.offsetToIndices(`workgroup_index * ${x}`)};
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
                sub_a[a_offset] = ${ne.getByIndices(`${ne.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${ne.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${C} + local_id.x;
            ${j?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${j.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${ce}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${ce}(8);`}
            let scale = ${me.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${F.getByIndices(`${F.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/g};
            for (var i: u32 = 0; i < ${_}; i++) {
              ${Te()}
              let b_value = ${_===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${ce}>(${Array.from({length:4},(pe,J)=>`${ce}(b_value_lower[${J}]), ${ce}(b_value_upper[${J}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${ce}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(pe,J)=>`${`dot(a_data${J}, b_dequantized_values[${J}])`}`).join(" + ")};
              word_offset += ${8/g};
            }
            workgroupBarrier();
          }

          if (local_idx < ${x}) {
            var output_value: ${Z.type.value} = ${Z.type.value}(0);
            for (var b = 0u; b < ${v}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${Z.setByIndices(`${Z.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${g};${_};${v};${x}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:b,dataType:f}],dispatchGroup:{x:A},programUniforms:I}),getShaderSource:H}},id=(e,t)=>{vh(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(xh(e.inputs,t)):e.compute($h(e.inputs,t))},ad=e=>te(e)});var Sh,Th,Ch,Ih,Ah,Eh,kh,Ph,ud,ld=L(()=>{"use strict";ee();ae();ue();Sh=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Th=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
            k = i32(${e.indicesGet("indices",o)}) - ${K("uniforms.pads",o,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${K("uniforms.x_shape",o,t)})) {
              break;
            }
            offset += k * i32(${K("uniforms.x_strides",o,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${r}
            value = x[offset];
          }
      `},Ch=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
                k = i32(${e.indicesGet("indices",o)}) - ${K("uniforms.pads",o,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${K("uniforms.x_shape",o,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${K("uniforms.x_shape",o,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${K("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Ih=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
                k = i32(${e.indicesGet("indices",o)}) - ${K("uniforms.pads",o,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${K("uniforms.x_shape",o,t)})) {
                  k = i32(${K("uniforms.x_shape",o,t)}) - 1;
                }
                offset += k * i32(${K("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Ah=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
                k = i32(${e.indicesGet("indices",o)}) - ${K("uniforms.pads",o,n)};
                if (k < 0)  {
                  k += i32(${K("uniforms.x_shape",o,t)}]);
                }
                if (k >= i32(${K("uniforms.x_shape",o,t)})) {
                  k -= i32(${K("uniforms.x_shape",o,t)});
                }
                offset += k * i32(${K("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Eh=(e,t,n)=>{switch(n.mode){case 0:return Th(e,t,n.pads.length);case 1:return Ch(e,t,n.pads.length);case 2:return Ih(e,t,n.pads.length);case 3:return Ah(e,t,n.pads.length);default:throw new Error("Invalid mode")}},kh=(e,t)=>{let n=E.padShape(e[0].dims.slice(),t.pads),r=e[0].dims,o=E.size(n),a=[{type:12,data:o},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&a.push({type:s?e[2].dataType:1,data:t.value}),a.push(...W(e[0].dims,n));let u=["rank"],d=c=>{let m=N("output",e[0].dataType,n.length),f=P("x",e[0].dataType,r.length),g=f.type.value,_=Eh(m,r.length,t),b=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&b.push({name:"constant_value",type:s?g:"f32"}),`
            ${c.registerUniforms(b).declareVariables(f,m)}
            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${m.offsetToIndices("global_idx")};

            var value = ${g}(0);
            ${_}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(E.size(n)/64)},programUniforms:a}),getShaderSource:d}},Ph=(e,t)=>{if(e.length>1){let n=e[1].getBigInt64Array(),r=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,o=e[0].dims.length,a=new Int32Array(2*o).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let d=0;d<u.length;d++)a[Number(u[d])]=Number(n[d]),a[Number(u[d])+o]=Number(n[d+u.length])}else n.forEach((u,d)=>a[Number(d)]=Number(u));let s=[];return a.forEach(u=>s.push(u)),{mode:t.mode,value:r,pads:s}}else return t},ud=(e,t)=>{Sh(e.inputs);let n=Ph(e.inputs,t);e.compute(kh(e.inputs,n),{inputs:[0]})}});var ln,dd,cd,pd,md,Oh,zh,fd,hd,gd,yd,bd,_d,wd,vd,$d,xd,Sd,Td,Cd=L(()=>{"use strict";Ve();ee();ae();ue();ln=e=>{if(we.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},dd=(e,t,n)=>{let r=t.format==="NHWC",o=e.dims.slice();r&&o.splice(1,0,o.pop());let a=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),u=t.strides.slice(),d=a?t.dilations.slice():[],c=t.pads.slice();Dt.adjustPoolAttributes(n,o,s,u,d,c);let m=Dt.computePoolOutputShape(n,o,u,d,s,c,t.autoPad),f=Object.assign({},t);a?Object.assign(f,{kernelShape:s,strides:u,pads:c,dilations:d,cacheKey:t.cacheKey}):Object.assign(f,{kernelShape:s,strides:u,pads:c,cacheKey:t.cacheKey});let g=m.slice();return g.push(g.splice(1,1)[0]),[f,r?g:m]},cd=(e,t)=>{let n=t.format==="NHWC",r=E.size(e),o=E.size(t.kernelShape),a=[{type:12,data:r},{type:12,data:o}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],d=t.strides[t.strides.length-1],c=t.pads[t.pads.length/2-1],m=t.pads[t.pads.length-1],f=!!(c+m);a.push({type:12,data:u},{type:12,data:d},{type:12,data:c},{type:12,data:m}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let g=!1;if(t.kernelShape.length===2){let _=t.kernelShape[t.kernelShape.length-2],b=t.strides[t.strides.length-2],w=t.pads[t.pads.length/2-2],x=t.pads[t.pads.length-2];g=!!(w+x),a.push({type:12,data:_},{type:12,data:b},{type:12,data:w},{type:12,data:x}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,s,!0,f,g]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=E.computeStrides(t.kernelShape);a.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let d=t.pads.reduce((c,m)=>c+m);return[a,s,!!d,!1,!1]}},pd=(e,t,n,r,o,a,s,u,d,c,m,f)=>{let g=o.format==="NHWC",_=t.type.value,b=N("output",t.type.tensor,r);if(o.kernelShape.length<=2){let w="",x="",v="",$=n-(g?2:1);if(m?w=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${$}] < 0 || xIndices[${$}]
                      >= uniforms.x_shape[${$}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`:w=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`,o.kernelShape.length===2){let C=n-(g?3:2);f?x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${C}] = indices[${C}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${C}] < 0 || xIndices[${C}] >= uniforms.x_shape[${C}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${C}] = indices[${C}] * uniforms.sh - uniforms.phStart + j;
                `,v=`
              }
            `}return`
            ${e.registerUniforms(d).declareVariables(t,b)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${b.offsetToIndices("global_idx")};
              var xIndices = ${b.offsetToIndices("global_idx")};

              var value = ${_}(${u});
              var pad = 0;
              ${x}
              ${w}
              ${v}
              ${s}

              output[global_idx] = value;
            }`}else{if(g)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let w=o.kernelShape.length,x=o.pads.length,v="";return c?v=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${a}
              }`:v=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${a}
            `,`
            ${e.registerUniforms(d).declareVariables(t,b)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${b.offsetToIndices("global_idx")};
              var xIndices = ${b.offsetToIndices("global_idx")};

              var offsets: array<u32, ${w}>;

              var value = ${_}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${w-1}u; j++) {
                  offsets[j] = offset / ${K("uniforms.kernelStrides","j",w)};
                  offset -= offsets[j] * ${K("uniforms.kernelStrides","j",w)};
                }
                offsets[${w-1}] = offset;

                isPad = false;
                for (var j = ${n-w}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${K("uniforms.strides",`j - ${n-w}u`,w)}
                    + offsets[j - ${n-w}u] - ${K("uniforms.pads","j - 2u",x)};
                  ${v}
              }
              ${s}

              output[global_idx] = value;
            }`}},md=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Oh=e=>`${md(e)};${e.countIncludePad}`,zh=e=>`${md(e)};${e.storageOrder};${e.dilations}`,fd=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),hd=(e,t,n,r)=>{let[o,a]=dd(t,r,n),s=P("x",t.dataType,t.dims.length),u=s.type.value,d="value += x_val;",c="";o.countIncludePad?c+=`value /= ${u}(uniforms.kernelSize);`:c+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[m,f,g,_,b]=cd(a,o);m.push(...W(t.dims,a));let w=["rank"];return{name:e,shaderCache:{hint:`${r.cacheKey};${g};${_};${b}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(E.size(a)/64)},programUniforms:m}),getShaderSource:x=>pd(x,s,t.dims.length,a.length,o,d,c,0,f,g,_,b)}},gd=e=>{let t=e.count_include_pad!==0,n=fd(e);if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let r={countIncludePad:t,...n,cacheKey:""};return{...r,cacheKey:Oh(r)}},yd=(e,t)=>{ln(e.inputs),e.compute(hd("AveragePool",e.inputs[0],!1,t))},bd={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},_d=e=>{let t=e.format;return{format:t,...bd,cacheKey:t}},wd=(e,t)=>{ln(e.inputs),e.compute(hd("GlobalAveragePool",e.inputs[0],!0,t))},vd=(e,t,n,r)=>{let[o,a]=dd(t,r,n),s=`
      value = max(x_val, value);
    `,u="",d=P("x",t.dataType,t.dims.length),c=["rank"],[m,f,g,_,b]=cd(a,o);return m.push(...W(t.dims,a)),{name:e,shaderCache:{hint:`${r.cacheKey};${g};${_};${b}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(E.size(a)/64)},programUniforms:m}),getShaderSource:w=>pd(w,d,t.dims.length,a.length,o,s,u,t.dataType===10?-65504:-1e5,f,g,_,b)}},$d=(e,t)=>{ln(e.inputs),e.compute(vd("MaxPool",e.inputs[0],!1,t))},xd=e=>{let t=e.storage_order,n=e.dilations,r=fd(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:n,...r,cacheKey:""};return{...o,cacheKey:zh(o)}},Sd=e=>{let t=e.format;return{format:t,...bd,cacheKey:t}},Td=(e,t)=>{ln(e.inputs),e.compute(vd("GlobalMaxPool",e.inputs[0],!0,t))}});var Bh,Mh,Id,Ad,Ed=L(()=>{"use strict";ee();ae();Se();ue();Bh=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((n,r)=>n===e[2].dims[r]).reduce((n,r)=>n&&r,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((o,a)=>a===t.axis||o===e[0].dims[a]).reduce((o,a)=>o&&a,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=e[0].dims[t.axis],r=e[1].dims[t.axis];if(t.blockSize<Math.ceil(n/r)||t.blockSize>Math.ceil(n/(r-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Mh=(e,t)=>{let n=E.normalizeAxis(t.axis,e[0].dims.length),r=e[0].dataType,o=r===3,a=e[0].dims,s=e[1].dataType,u=E.size(a),d=r===3||r===2,c=d?[Math.ceil(E.size(e[0].dims)/4)]:e[0].dims,m=e[1].dims,f=e.length>2?e[2]:void 0,g=f?d?[Math.ceil(E.size(f.dims)/4)]:f.dims:void 0,_=m.length===0||m.length===1&&m[0]===1,b=_===!1&&m.length===1,w=he(u),x=_&&(!d||w===4),v=x?w:1,$=x&&!d?w:1,T=P("input",d?12:r,c.length,$),C=P("scale",s,m.length),A=f?P("zero_point",d?12:r,g.length):void 0,I=N("output",s,a.length,v),z=[T,C];A&&z.push(A);let D=[c,m];f&&D.push(g);let R=[{type:12,data:u/v},{type:12,data:n},{type:12,data:t.blockSize},...W(...D,a)],H=q=>{let Y=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${q.registerUniforms(Y).declareVariables(...z,I)}
      ${q.mainStart()}
          ${q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${I.offsetToIndices("global_idx")};

          // Set input x
          ${d?`
            let input = ${T.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${v===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${T.getByOffset("global_idx")};`};

          // Set scale input
          ${_?`let scale_value= ${C.getByOffset("0")}`:b?`
            let scale_index = ${I.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${C.getByOffset("scale_index")};`:`
            var scale_indices: ${C.type.indices} = output_indices;
            let index = ${C.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${C.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${C.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${A?_?d?`
                let zero_point_input = ${A.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${A.getByOffset("0")}`:b?d?`
                let zero_point_index = ${I.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${A.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${I.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${A.getByOffset("zero_point_index")};`:d?`
                let zero_point_offset = ${C.indicesToOffset("scale_indices")};
                let zero_point_input = ${A.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${A.getByIndices("scale_indices")};`:`let zero_point_value = ${d?o?"i32":"u32":T.type.value}(0);`};
      // Compute and write output
      ${I.setByOffset("global_idx",`${I.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:A?["rank","rank","rank"]:["rank","rank"]},getShaderSource:H,getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(u/v/64),y:1,z:1},programUniforms:R})}},Id=(e,t)=>{Bh(e.inputs,t),e.compute(Mh(e.inputs,t))},Ad=e=>te({axis:e.axis,blockSize:e.blockSize})});var Rh,Uh,kd,Pd=L(()=>{"use strict";Ve();ee();ue();Rh=(e,t,n)=>{let r=e===t,o=e<t&&n<0,a=e>t&&n>0;if(r||o||a)throw new Error("Range these inputs' contents are invalid.")},Uh=(e,t,n,r)=>{let o=Math.abs(Math.ceil((t-e)/n)),a=[o],s=o,u=[{type:12,data:s},{type:r,data:e},{type:r,data:n},...W(a)],d=c=>{let m=N("output",r,a.length),f=m.type.value,g=[{name:"outputSize",type:"u32"},{name:"start",type:f},{name:"delta",type:f}];return`
        ${c.registerUniforms(g).declareVariables(m)}
        ${c.mainStart()}
        ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${f}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${r}`},getShaderSource:d,getRunData:()=>({outputs:[{dims:a,dataType:r}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},kd=e=>{let t=0,n=0,r=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],n=e.inputs[1].getInt32Array()[0],r=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],n=e.inputs[1].getFloat32Array()[0],r=e.inputs[2].getFloat32Array()[0]),we.webgpu.validateInputContent&&Rh(t,n,r),e.compute(Uh(t,n,r,e.inputs[0].dataType),{inputs:[]})}});var Nh,Vh,Od,zd,Dd=L(()=>{"use strict";ee();ae();Se();ue();Nh=(e,t,n,r)=>{if(e!=="none"&&r!=="i32"&&r!=="u32"&&r!=="f32")throw new Error(`Input ${r} is not supported with reduction ${e}.`);let o=`{
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
                ${o}max(bitcast<f32>(oldValue), (${n}))${a}`;case"min":return r==="i32"||r==="u32"?`atomicMin(&${t}, bitcast<${r}>(${n}));`:`${o}min(bitcast<${r}>(oldValue), (${n}))${a}`;case"mul":return`${o}(bitcast<${r}>(oldValue) * (${n}))${a}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Vh=(e,t)=>{let n=e[0].dims,r=e[1].dims,o=n,a=1,s=Math.ceil(E.sizeToDimension(r,r.length-1)/a),u=r[r.length-1],d=E.sizeFromDimension(n,u),c=[{type:12,data:s},{type:12,data:u},{type:12,data:d},...W(e[1].dims,e[2].dims,o)],m=f=>{let g=P("indices",e[1].dataType,e[1].dims.length),_=P("updates",e[2].dataType,e[2].dims.length,a),b=t.reduction!=="none"&&t.reduction!==""?as("output",e[0].dataType,o.length):N("output",e[0].dataType,o.length,a);return`
      ${f.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(g,_,b)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
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
    ${Nh(t.reduction,"output[data_offset + i]","value",b.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:c}),getShaderSource:m}},Od=e=>te({reduction:e.reduction}),zd=(e,t)=>{e.compute(Vh(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}});var Lh,Wh,Gh,Bd,Hh,Fh,qh,jh,Kh,Zh,Qh,Yh,Md,Xh,Jh,eg,tg,rg,Rd,Ud,Nd=L(()=>{"use strict";ee();ae();Se();ue();Lh=(e,t)=>{if(e.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Wh=(e,t,n)=>{t.every(o=>o>=0&&o<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let r=new Array(n).fill(1);return t.forEach((o,a)=>r[o]=e[a]),r},Gh=(e,t,n,r,o,a)=>{let[s,u,d]=n>10?[1,2,3]:[-1,e.length>1?1:-1,-1],c=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(m=>a.push(m));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(m=>r.push(m)),r.length!==0&&r.length!==c&&n>=18&&r.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Lh(r,t),t.axes.length>0&&Wh(r,t.axes,c).forEach((m,f)=>r[f]=m)}if(d>0&&e.length>d&&e[d].dims.length===1&&e[d].dims[0]>0&&(e[d].getBigInt64Array().forEach(m=>o.push(Number(m))),o.length!==0&&o.length!==c&&n>=18&&o.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(r.length!==0&&r.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof r<"u"&&typeof o<"u"&&r.length>0&&o.length>c)throw new Error("Resize requires only of scales or sizes to be specified")},Bd=(e,t,n,r)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${r}(big / (${n}));
  let fract = ${r}(big % (${n})) / ${r}(${n});
  return whole + fract;
`,Hh=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Bd("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Bd("xResized","lengthOriginal - 1","lengthResized - 1",t)}
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Fh=(e,t,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",qh=(e,t,n)=>{let r=new Array(n).fill(0).concat(new Array(n).fill(1)),o=e.length===0?r:e.slice();return t.length>0?(t.forEach((a,s)=>{r[a]=o[s],r[s+n]=o[t.length+s]}),r):o},jh=(e,t,n,r)=>{let o=[];if(n.length>0)if(r.length>0){if(e.forEach(a=>o.push(a)),Math.max(...r)>e.length)throw new Error("axes is out of bound");r.forEach((a,s)=>o[a]=n[s])}else n.forEach(a=>o.push(a));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");o=e.map((a,s)=>Math.round(a*t[s]))}return o},Kh=(e,t,n)=>{let r=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(a=>t[a]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(a=>t[a]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return n.axes.length>0?(n.axes.forEach(a=>t[a]=r),n.axes.forEach(a=>o[a]=Math.round(e[a]*t[a]))):(t.fill(r,0,t.length),o.forEach((a,s)=>o[s]=Math.round(a*t[s]))),o},Zh=(e,t,n,r,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${n.length}> {
      var original_indices: array<${e.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${K("uniforms.scales","i",r)};
        var roi_low = ${K("uniforms.roi","i",o)};
        var roi_hi = ${K("uniforms.roi",`i + ${t.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${K("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${K("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Qh=(e,t,n,r,o,a,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${K("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${K("uniforms.roi","i",a)};
          var roi_hi = ${K("uniforms.roi",`i + ${n.length}`,a)};
          var input_shape_i = ${K("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${K("uniforms.output_shape","i",r.length)};
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
    }`,Yh=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${K("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Md=(e,t,n,r)=>e.rank>r?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",n,"batch")};
`:"",Xh=(e,t,n,r,o)=>{let[s,u,d,c]=n.length===2?[-1,0,1,-1]:[0,2,3,1],m=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${m} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",u,`max(0, min(row, ${n[u]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(col, ${n[d]} - 1))`)};
      ${Md(e,c,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${m} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${m} = originalIndices[${u}];
      var col:${m} = originalIndices[${d}];
      ${r?`if (row < 0 || row > (${n[u]} - 1) || col < 0 || col > (${n[d]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${n[u]} - 1));
      col = max(0, min(col, ${n[d]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n.length>2?`u32(originalIndices[${c}])`:"0"};
      var batch: u32 =  ${n.length>2?`u32(originalIndices[${s}])`:"0"};
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
    }`},Jh=(e,t,n,r,o,a,s,u,d,c)=>{let m=n.length===2,f=!0,[g,_]=m?[0,1]:f?[2,3]:[1,2],b=e.type.value,w=x=>{let v=x===g?"row":"col";return`
      fn ${v}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${b} {
        var output_index = ${t.indicesGet("output_indices",x)};
        var originalIdx: ${b} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[x]},
        ${r[x]}, ${n[x]}, ${a[x]}, ${a[x]} + ${n.length});
        var fractOriginalIdx: ${b} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${n[x]} - 1))) {
          return ${d};
        }
        var data: array<${b}, 4> = array<${b}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${v}: ${b} = originalIdx + ${b}(i);
          if (${v} < 0 || ${v} >= ${n[x]}) {
            ${c?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${d};`:`${v} = max(0, min(${v}, ${n[x]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",x,`u32(${v})`)};
          data[i + 1] = ${x===g?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${w(g)};
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
    `},eg=(e,t,n,r,o)=>{let[s,u,d,c,m]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],f=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${f} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",u,`max(0, min(depth, ${n[u]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(height, ${n[d]} - 1))`)};
      ${e.indicesSet("input_indices",c,`max(0, min(width, ${n[c]} - 1))`)};
      ${Md(e,m,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${f} = originalIndices[${u}];
      var height:${f} = originalIndices[${d}];
      var width:${f} = originalIndices[${c}];
      ${r?`if (depth < 0 || depth > (${n[u]} - 1) || height < 0 || height > (${n[d]} - 1) || width < 0 || (width > ${n[c]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${n[u]} - 1));
      height = max(0, min(height, ${n[d]} - 1));
      width = max(0, min(width, ${n[c]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n.length>3?`u32(originalIndices[${m}])`:"0"};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${s}])`:"0"};

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
    }`},tg=(e,t,n,r,o,a)=>{let s=e.dims,u=qh(a,t.axes,s.length),d=jh(s,r,o,t.axes),c=r.slice();r.length===0&&(c=s.map(($,T)=>$===0?1:d[T]/$),t.keepAspectRatioPolicy!=="stretch"&&(d=Kh(s,c,t)));let m=N("output",e.dataType,d.length),f=P("input",e.dataType,s.length),g=E.size(d),_=s.length===d.length&&s.every(($,T)=>$===d[T]),b=t.coordinateTransformMode==="tf_crop_and_resize",w=t.extrapolationValue,x=f.type.value,v=$=>`
      ${_?"":`
      ${Hh(t.coordinateTransformMode,x)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Yh(f,s)};
              ${Fh(t.nearestMode,n,x)};
              ${Qh(f,m,s,d,c.length,u.length,b)};
              `;case"linear":return`
              ${Zh(m,s,d,c.length,u.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${Xh(f,m,s,b,w)}`;if(s.length===3||s.length===5)return`${eg(f,m,s,b,w)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${Jh(f,m,s,d,c,u,t.cubicCoeffA,b,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${$.registerUniform("output_size","u32").registerUniform("scales","f32",c.length).registerUniform("roi","f32",u.length).declareVariables(f,m)}
      ${$.mainStart()}
        ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${_?"output[global_idx] = input[global_idx];":`
        let output_indices = ${m.offsetToIndices("global_idx")};
        var input_indices: ${f.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${f.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${n}|${c.length>0?t.mode==="cubic"?c:c.length:""}|${o.length>0?o:""}|${u.length>0?u:""}|${_}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:d,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},{type:1,data:c},{type:1,data:u},...W(s,d)]})}},rg=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},Rd=(e,t)=>{let n=[],r=[],o=[],a=rg(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Gh(e.inputs,t,a,n,r,o),e.compute(tg(e.inputs[0],t,a,n,r,o),{inputs:[0]})},Ud=e=>{let t=e.antialias,n=e.axes,r=e.coordinateTransformMode,o=e.cubicCoeffA,a=e.excludeOutside!==0,s=e.extrapolationValue,u=e.keepAspectRatioPolicy,d=e.mode,c=e.nearestMode===""?"simple":e.nearestMode;return te({antialias:t,axes:n,coordinateTransformMode:r,cubicCoeffA:o,excludeOutside:a,extrapolationValue:s,keepAspectRatioPolicy:u,mode:d,nearestMode:c})}});var ng,og,Vd,Ld=L(()=>{"use strict";ee();ae();ue();ng=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],n=e[1],r=e[2];if(t.dataType!==n.dataType||t.dataType!==r.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(n.dims[n.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==a)throw new Error("Skip must have the same sequence length as input");if(r.dims.length!==1)throw new Error("Gamma must be 1D");if(r.dims[r.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},og=(e,t,n,r)=>{let o=t.simplified,a=e[0].dims,s=E.size(a),u=a,d=s,c=a.slice(-1)[0],m=r?a.slice(0,-1).concat(1):[],f=!o&&e.length>3,g=e.length>4,_=r&&n>1,b=r&&n>2,w=n>3,x=64,v=he(c),$=[{type:12,data:d},{type:12,data:v},{type:12,data:c},{type:1,data:t.epsilon}],T=A=>{let I=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],z=[P("x",e[0].dataType,e[0].dims,v),P("skip",e[1].dataType,e[1].dims,v),P("gamma",e[2].dataType,e[2].dims,v)];f&&z.push(P("beta",e[3].dataType,e[3].dims,v)),g&&z.push(P("bias",e[4].dataType,e[4].dims,v)),z.push(N("output",e[0].dataType,u,v)),_&&z.push(N("mean_output",1,m)),b&&z.push(N("inv_std_output",1,m)),w&&z.push(N("input_skip_bias_sum",e[0].dataType,u,v));let D=ve(e[0].dataType),R=ve(1,v);return`

      ${A.registerUniforms(I).declareVariables(...z)}
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
          let bias_value = ${g?"bias[offset1d + i]":D+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${w?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Mt(D,v,"value")};
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
        let mean = ${je("sum",v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${je("square_sum",v)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${_?"mean_output[global_idx] = mean;":""}
        ${b?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${D}(mean)`}) *
            ${D}(inv_std_dev) * gamma[offset1d + i]
            ${f?"+ beta[offset1d + i]":""};
        }
      }`},C=[{dims:u,dataType:e[0].dataType}];return n>1&&C.push({dims:m,dataType:1}),n>2&&C.push({dims:m,dataType:1}),n>3&&C.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${v};${_};${b};${w}`,inputDependencies:e.map((A,I)=>"type")},getShaderSource:T,getRunData:()=>({outputs:C,dispatchGroup:{x:Math.ceil(d/c)},programUniforms:$})}},Vd=(e,t)=>{ng(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(og(e.inputs,t,e.outputCount,!1),{outputs:r})}});var ig,dn,ag,Wd,sg,ug,Gd,Hd,Fd=L(()=>{"use strict";ee();ae();Se();ue();ig=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((n,r)=>{if(e[r+1].dataType!==6&&e[r+1].dataType!==7)throw new Error(`Input ${r} must be an array of int32 or int64`)})},dn=(e,t)=>{let n=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(r=>n.push(Number(r)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(r=>n.push(Number(r)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return n},ag=(e,t)=>{if(e.length>1){let n=dn(e,1),r=dn(e,2),o=dn(e,3);return o.length===0&&(o=[...Array(e[0].dims.length).keys()]),te({starts:n,ends:r,axes:o})}else return t},Wd=(e,t,n,r,o)=>{let a=e;return e<0&&(a+=n[r[t]]),o[t]<0?Math.max(0,Math.min(a,n[r[t]]-1)):Math.max(0,Math.min(a,n[r[t]]))},sg=(e,t,n)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${n.length-1}; i >= 0; i--) {
            let input_shape_i = ${K("uniforms.input_shape","i",n.length)};
            let steps_i = ${K("uniforms.steps","i",n.length)};
            let signs_i = ${K("uniforms.signs","i",n.length)};
            let starts_i = ${K("uniforms.starts","i",n.length)};
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
      }`,ug=(e,t)=>{let n=e[0].dims,r=E.size(n),o=t.axes.length>0?E.normalizeAxes(t.axes,n.length):[...Array(n.length).keys()],a=dn(e,4);a.forEach(v=>v!==0||(()=>{throw new Error("step cannot be 0")})),a.length===0&&(a=Array(o.length).fill(1));let s=t.starts.map((v,$)=>Wd(v,$,n,o,a)),u=t.ends.map((v,$)=>Wd(v,$,n,o,a));if(o.length!==s.length||o.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==n.length)for(let v=0;v<n.length;++v)o.includes(v)||(s.splice(v,0,0),u.splice(v,0,n[v]),a.splice(v,0,1));let d=a.map(v=>Math.sign(v));a.forEach((v,$,T)=>{if(v<0){let C=(u[$]-s[$])/v,A=s[$],I=A+C*a[$];s[$]=I,u[$]=A,T[$]=-v}});let c=n.slice(0);o.forEach((v,$)=>{c[v]=Math.ceil((u[v]-s[v])/a[v])});let m={dims:c,dataType:e[0].dataType},f=N("output",e[0].dataType,c.length),g=P("input",e[0].dataType,e[0].dims.length),_=E.size(c),b=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:d.length},{name:"steps",type:"u32",length:a.length}],w=[{type:12,data:_},{type:12,data:s},{type:6,data:d},{type:12,data:a},...W(e[0].dims,c)],x=v=>`
      ${v.registerUniforms(b).declareVariables(g,f)}
        ${sg(g,f,n)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${f.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${f.setByOffset("global_idx",g.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${d.length}_${s.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[m],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:w})}},Gd=(e,t)=>{ig(e.inputs,t);let n=ag(e.inputs,t);e.compute(ug(e.inputs,n),{inputs:[0]})},Hd=e=>{let t=e.starts,n=e.ends,r=e.axes;return te({starts:t,ends:n,axes:r})}});var lg,dg,qd,jd,Kd=L(()=>{"use strict";ee();ae();Se();ct();ue();lg=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},dg=(e,t)=>{let n=e.inputs[0],r=n.dims,o=E.size(r),a=r.length,s=E.normalizeAxis(t.axis,a),u=s<r.length-1,d,c=[];u?(c=Array.from({length:a},(z,D)=>D),c[s]=a-1,c[a-1]=s,d=e.compute(Pe(n,c),{inputs:[n],outputs:[-1]})[0]):d=n;let m=d.dims,f=m[a-1],g=o/f,_=he(f),b=f/_,w=64;g===1&&(w=256);let x=(z,D)=>D===4?`max(max(${z}.x, ${z}.y), max(${z}.z, ${z}.w))`:D===2?`max(${z}.x, ${z}.y)`:D===3?`max(max(${z}.x, ${z}.y), ${z}.z)`:z,v=P("x",d.dataType,d.dims,_),$=N("result",d.dataType,d.dims,_),T=v.type.value,C=ve(d.dataType)==="f32"?`var threadMax = ${T}(-3.402823e+38f);`:`var threadMax = ${T}(-65504.0h);`,A=z=>`
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
      ${z.registerUniform("packedCols","i32").declareVariables(v,$)}
      ${z.mainStart(w)}
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
          rowMaxShared = ${T}(${x("threadShared[0]",_)});
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
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${T}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,I=e.compute({name:"Softmax",shaderCache:{hint:`${_};${w}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:m,dataType:d.dataType}],dispatchGroup:{x:g},programUniforms:[{type:6,data:b}]}),getShaderSource:A},{inputs:[d],outputs:[u?-1:0]})[0];u&&e.compute(Pe(I,c),{inputs:[I]})},qd=(e,t)=>{lg(e.inputs),dg(e,t)},jd=e=>te({axis:e.axis})});var Zd,cg,pg,mg,Qd,Yd=L(()=>{"use strict";ee();ae();ue();Zd=e=>Array.from(e.getBigInt64Array(),Number),cg=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Zd(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},pg=(e,t)=>{let n=[];for(let r=0;r<e.length;++r)n.push(e[r]*t[r]);return n},mg=(e,t)=>{let n=e[0].dims,r=t??Zd(e[1]),o=pg(n,r),a=E.size(o),s=e[0].dataType,u=P("input",s,n.length),d=N("output",s,o.length),c=m=>`
      const inputShape = ${u.indices(...n)};
      ${m.registerUniform("output_size","u32").declareVariables(u,d)}
      ${m.mainStart()}
      ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${d.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${d.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${d.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${r}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...W(e[0].dims,o)]}),getShaderSource:c}},Qd=e=>{cg(e.inputs),e.compute(mg(e.inputs),{inputs:[0]})}});var fg,hg,Xd,Jd=L(()=>{"use strict";ee();ae();ue();fg=(e,t,n,r,o)=>{let a=N("output_data",o,n.length,4),s=P("a_data",t[1].dataType,t[1].dims.length,4),u=P("b_data",t[2].dataType,t[2].dims.length,4),d=P("c_data",t[0].dataType,t[0].dims.length,4),c,m=(f,g,_)=>`select(${g}, ${f}, ${_})`;if(!r)c=a.setByOffset("global_idx",m(s.getByOffset("global_idx"),u.getByOffset("global_idx"),d.getByOffset("global_idx")));else{let f=(g,_,b="")=>{let w=`a_data[index_a${_}][component_a${_}]`,x=`b_data[index_b${_}][component_b${_}]`,v=`bool(c_data[index_c${_}] & (0xffu << (component_c${_} * 8)))`;return`
            let output_indices${_} = ${a.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offset_a${_} = ${s.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let offset_b${_} = ${u.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let offset_c${_} = ${d.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let index_a${_} = offset_a${_} / 4u;
            let index_b${_} = offset_b${_} / 4u;
            let index_c${_} = offset_c${_} / 4u;
            let component_a${_} = offset_a${_} % 4u;
            let component_b${_} = offset_b${_} % 4u;
            let component_c${_} = offset_c${_} % 4u;
            ${g}[${_}] = ${b}(${m(w,x,v)});
          `};o===9?c=`
            var data = vec4<u32>(0);
            ${f("data",0,"u32")}
            ${f("data",1,"u32")}
            ${f("data",2,"u32")}
            ${f("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:c=`
            ${f("output_data[global_idx]",0)}
            ${f("output_data[global_idx]",1)}
            ${f("output_data[global_idx]",2)}
            ${f("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(d,s,u,a)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${c}
      }`},hg=e=>{let t=e[1].dims,n=e[2].dims,r=e[0].dims,o=e[1].dataType,a=!(E.areEqual(t,n)&&E.areEqual(n,r)),s=t,u=E.size(t);if(a){let c=tt.calcShape(tt.calcShape(t,n,!1),r,!1);if(!c)throw new Error("Can't perform where op on the given tensors");s=c,u=E.size(s)}let d=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:c=>fg(c,e,s,a,o),getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:d},...W(r,t,n,s)]})}},Xd=e=>{e.compute(hg(e.inputs))}});var ec,tc=L(()=>{"use strict";Bs();Yr();Us();Vs();Tu();Mu();Nu();tl();ul();cl();fl();_l();$l();Sl();Il();kl();zl();Ml();Nl();Wl();Yl();ed();rd();od();sd();Eo();ld();Cd();Ed();Pd();Dd();Zr();Nd();Oo();Ld();Fd();Kd();Po();Yd();ct();Jr();Jd();ec=new Map([["Abs",[Ls]],["Acos",[Ws]],["Acosh",[Gs]],["Add",[Cu]],["ArgMax",[Ds,go]],["ArgMin",[zs,go]],["Asin",[Hs]],["Asinh",[Fs]],["Atan",[qs]],["Atanh",[js]],["Attention",[Ms]],["AveragePool",[yd,gd]],["BatchNormalization",[Rs]],["BiasAdd",[Ns]],["BiasSplitGelu",[Su]],["Cast",[Zs,Ks]],["Ceil",[Ys]],["Clip",[Qs]],["Concat",[Ru,Uu]],["Conv",[To,So]],["ConvTranspose",[sl,il]],["Cos",[Xs]],["Cosh",[Js]],["CumSum",[ll,dl]],["DepthToSpace",[pl,ml]],["DequantizeLinear",[Id,Ad]],["Div",[Iu]],["Einsum",[yl,bl]],["Elu",[eu,or]],["Equal",[Au]],["Erf",[tu]],["Exp",[ru]],["Expand",[vl]],["FastGelu",[xl]],["Floor",[nu]],["FusedConv",[To,So]],["Gather",[Cl,Tl]],["GatherElements",[Bl,Dl]],["GatherBlockQuantized",[Pl,Ol]],["GatherND",[Al,El]],["Gelu",[ou]],["Gemm",[Ul,Rl]],["GlobalAveragePool",[wd,_d]],["GlobalMaxPool",[Td,Sd]],["Greater",[Ou]],["GreaterOrEqual",[Du]],["GridSample",[Vl,Ll]],["GroupQueryAttention",[Ql]],["HardSigmoid",[pu,cu]],["InstanceNormalization",[Jl]],["LayerNormalization",[td]],["LeakyRelu",[iu,or]],["Less",[zu]],["LessOrEqual",[Bu]],["Log",[vu]],["MatMul",[nd]],["MatMulNBits",[id,ad]],["MaxPool",[$d,xd]],["Mul",[Eu]],["MultiHeadAttention",[Fl,Hl]],["Neg",[su]],["Not",[au]],["Pad",[ud]],["Pow",[ku]],["QuickGelu",[$u,or]],["Range",[kd]],["Reciprocal",[uu]],["ReduceMin",[Is]],["ReduceMean",[$s]],["ReduceMax",[Cs]],["ReduceSum",[Es]],["ReduceProd",[As]],["ReduceL1",[xs]],["ReduceL2",[Ss]],["ReduceLogSum",[Ps]],["ReduceLogSumExp",[Ts]],["ReduceSumSquare",[ks]],["Relu",[lu]],["Resize",[Rd,Ud]],["RotaryEmbedding",[Kl]],["ScatterND",[zd,Od]],["Sigmoid",[du]],["Sin",[mu]],["Sinh",[fu]],["Slice",[Gd,Hd]],["SkipLayerNormalization",[Vd]],["Split",[ql,jl]],["Sqrt",[hu]],["Softmax",[qd,jd]],["Sub",[Pu]],["Tan",[gu]],["Tanh",[bu]],["ThresholdedRelu",[wu,or]],["Tile",[Qd]],["Transpose",[ls,ds]],["Where",[Xd]]])});var cn,rc=L(()=>{"use strict";Ve();et();ue();cn=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,n){this.repo.set(t,n)}run(t,n,r,o,a){Ne(t.programInfo.name);let s=this.backend.device,u=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let d=[];for(let m of n)d.push({binding:d.length,resource:{buffer:m.buffer}});for(let m of r)d.push({binding:d.length,resource:{buffer:m.buffer}});a&&d.push({binding:d.length,resource:a});let c=s.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:d,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let m={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:c,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(m)}u.setPipeline(t.computePipeline),u.setBindGroup(0,c),u.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Me(t.programInfo.name)}dispose(){}build(t,n){Ne(t.name);let r=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(f=>{r.features.has(f.feature)&&o.push(`enable ${f.extension};`)});let s=ss(n,this.backend.device.limits),u=t.getShaderSource(s),d=`${o.join(`
`)}
${s.additionalImplementations}
${u}`,c=r.createShaderModule({code:d,label:t.name});le("verbose",()=>`[WebGPU] ${t.name} shader code: ${d}`);let m=r.createComputePipeline({compute:{module:c,entryPoint:"main"},layout:"auto",label:t.name});return Me(t.name),{programInfo:t,computePipeline:m,uniformVariablesInfo:s.variablesInfo}}normalizeDispatchGroupSize(t){let n=typeof t=="number"?t:t.x,r=typeof t=="number"?1:t.y||1,o=typeof t=="number"?1:t.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(n<=a&&r<=a&&o<=a)return[n,r,o];let s=n*r*o,u=Math.ceil(Math.sqrt(s));if(u>a){if(u=Math.ceil(Math.cbrt(s)),u>a)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[u,u,u]}else return[u,u,1]}}});var nc={};Wt(nc,{WebGpuBackend:()=>Do});var gg,yg,zo,Do,oc=L(()=>{"use strict";Ve();ee();et();no();is();tc();rc();gg=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let n=[];for(let r=0;r<e.length;++r){let o=e[r].dataType;switch(t[r]){case"none":{n.push("");break}case"type":{n.push(`${o}`);break}case"rank":{let a=e[r].dims.length;n.push(`${o};${a}`);break}case"dims":{let a=e[r].dims.join(",");n.push(`${o};${a}`);break}default:throw new Error(`unsupported input dependency: ${t[r]}`)}}return n.join("|")},yg=(e,t,n)=>{let r=e.name;return e.shaderCache?.hint&&(r+="["+e.shaderCache.hint+"]"),r+=":"+n+`:${gg(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,r},zo=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},Do=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,n){this.env=t;let r=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:n.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:n.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:n.limits.maxStorageBufferBindingSize,maxBufferSize:n.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:n.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:n.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:n.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:n.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},a=s=>n.features.has(s)&&r.push(s)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups"),this.device=await n.requestDevice(o),this.adapterInfo=new zo(n.info||await n.requestAdapterInfo()),this.gpuDataManager=os(this),this.programManager=new cn(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Nr(t.logLevel,!!t.debug),this.device.onuncapturederror=s=>{s.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${s.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:n,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),n={};this.queryType==="at-passes"&&(n.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(n)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Ne(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let n=new BigUint64Array(t.getMappedRange()),r=this.pendingQueries.get(t);for(let o=0;o<n.length/2;o++){let a=r[o],s=a.kernelId,u=this.kernels.get(s),d=u.kernelType,c=u.kernelName,m=a.programName,f=a.inputTensorViews,g=a.outputTensorViews,_=n[o*2],b=n[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=_);let w=Number(_-this.queryTimeBase),x=Number(b-this.queryTimeBase);if(!Number.isSafeInteger(w)||!Number.isSafeInteger(x))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:f.map(v=>({dims:v.dims,dataType:Je(v.dataType)})),outputsMetadata:g.map(v=>({dims:v.dims,dataType:Je(v.dataType)})),kernelId:s,kernelType:d,kernelName:c,programName:m,startTime:w,endTime:x});else{let v="";f.forEach((T,C)=>{v+=`input[${C}]: [${T.dims}] | ${Je(T.dataType)}, `});let $="";g.forEach((T,C)=>{$+=`output[${C}]: [${T.dims}] | ${Je(T.dataType)}, `}),console.log(`[profiling] kernel "${s}|${d}|${c}|${m}" ${v}${$}start time: ${w} ns, execution time: ${x-w} ns`)}$r("GPU",`${m}::${_}::${b}`)}t.unmap(),this.pendingQueries.delete(t)}),Me()}run(t,n,r,o,a,s){Ne(t.name);let u=[];for(let T=0;T<n.length;++T){let C=n[T].data;if(C===0)continue;let A=this.gpuDataManager.get(C);if(!A)throw new Error(`no GPU data for input: ${C}`);u.push(A)}let{outputs:d,dispatchGroup:c,programUniforms:m}=t.getRunData(n),f=r.length===0?d.map((T,C)=>C):r;if(f.length!==d.length)throw new Error(`Output size ${f.length} must be equal to ${d.length}.`);let g=[],_=[];for(let T=0;T<d.length;++T){if(!Number.isInteger(f[T])||f[T]<-3||f[T]>=s)throw new Error(`Invalid output index: ${f[T]}`);if(f[T]===-3)continue;let C=f[T]===-1,A=f[T]===-2,I=C||A?a(d[T].dataType,d[T].dims):o(f[T],d[T].dataType,d[T].dims);if(g.push(I),I.data===0)continue;let z=this.gpuDataManager.get(I.data);if(!z)throw new Error(`no GPU data for output: ${I.data}`);if(C&&this.temporaryData.push(z),A){let D=this.kernelPersistentData.get(this.currentKernelId);D||(D=[],this.kernelPersistentData.set(this.currentKernelId,D)),D.push(z)}_.push(z)}if(u.length!==n.length||_.length!==g.length){if(_.length===0)return Me(t.name),g;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let b;if(m){let T=0,C=[];m.forEach(D=>{let R=typeof D.data=="number"?[D.data]:D.data;if(R.length===0)return;let H=D.type===10?2:4,q,Y;D.type===10?(Y=R.length>4?16:R.length>2?8:R.length*H,q=R.length>4?16:H*R.length):(Y=R.length<=2?R.length*H:16,q=16),T=Math.ceil(T/Y)*Y,C.push(T);let ne=D.type===10?8:4;T+=R.length>4?Math.ceil(R.length/ne)*q:R.length*H});let A=16;T=Math.ceil(T/A)*A;let I=new ArrayBuffer(T);m.forEach((D,R)=>{let H=C[R],q=typeof D.data=="number"?[D.data]:D.data;if(D.type===6)new Int32Array(I,H,q.length).set(q);else if(D.type===12)new Uint32Array(I,H,q.length).set(q);else if(D.type===10)new Uint16Array(I,H,q.length).set(q);else if(D.type===1)new Float32Array(I,H,q.length).set(q);else throw new Error(`Unsupported uniform type: ${Je(D.type)}`)});let z=this.gpuDataManager.create(T,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(z.buffer,0,I,0,T),this.gpuDataManager.release(z.id),b={offset:0,size:T,buffer:z.buffer}}let w=this.programManager.normalizeDispatchGroupSize(c),x=w[1]===1&&w[2]===1,v=yg(t,n,x),$=this.programManager.getArtifact(v);if($||($=this.programManager.build(t,w),this.programManager.setArtifact(v,$),le("info",()=>`[artifact] key: ${v}, programName: ${t.name}`)),m&&$.uniformVariablesInfo){if(m.length!==$.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${$.uniformVariablesInfo.length}, got ${m.length} in program "${$.programInfo.name}".`);for(let T=0;T<m.length;T++){let C=m[T],A=C.type,I=typeof C.data=="number"?1:C.data.length,[z,D]=$.uniformVariablesInfo[T];if(A!==z||I!==D)throw new Error(`Uniform variable ${T} mismatch: expect type ${z} with size ${D}, got type ${A} with size ${I} in program "${$.programInfo.name}".`)}}if(le("info",()=>`[ProgramManager] run "${t.name}" (key=${v}) with ${w[0]}x${w[1]}x${w[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let T={kernelId:this.currentKernelId,programName:$.programInfo.name,inputTensorViews:n,outputTensorViews:g};this.pendingKernels.push(T),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(T)}return this.programManager.run($,u,_,w,b),Me(t.name),g}upload(t,n){this.gpuDataManager.upload(t,n)}memcpy(t,n){this.gpuDataManager.memcpy(t,n)}async download(t,n){await this.gpuDataManager.download(t,n)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,n,r,o){let a=ec.get(t);if(!a)throw new Error(`kernel not implemented: ${t}`);let s={kernelType:t,kernelName:o,kernelEntry:a[0],attributes:[a[1],r]};this.kernels.set(n,s)}releaseKernel(t){let n=this.kernelPersistentData.get(t);if(n){for(let r of n)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,n,r){let o=this.kernels.get(t);if(!o)throw new Error(`kernel not created: ${t}`);let a=o.kernelType,s=o.kernelName,u=o.kernelEntry,d=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${a}] ${s}" is not allowed to be called recursively`);this.currentKernelId=t,d[0]&&(d[1]=d[0](d[1]),d[0]=void 0),le("info",()=>`[WebGPU] Start to run kernel "[${a}] ${s}"...`);let c=this.env.debug;this.temporaryData=[];try{return c&&this.device.pushErrorScope("validation"),u(n,d[1]),0}catch(m){return r.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${s}" failed. ${m}`)),1}finally{c&&r.push(this.device.popErrorScope().then(m=>m?`GPU validation error for kernel "[${a}] ${s}": ${m.message}`:null));for(let m of this.temporaryData)this.gpuDataManager.release(m.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,n,r,o){let a=this.sessionExternalDataMapping.get(t);a||(a=new Map,this.sessionExternalDataMapping.set(t,a));let s=a.get(n),u=this.gpuDataManager.registerExternalBuffer(r,o,s);return a.set(n,[u,r]),u}unregisterBuffers(t){let n=this.sessionExternalDataMapping.get(t);n&&(n.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let n=this.gpuDataManager.get(t);if(!n)throw new Error(`no GPU data for buffer: ${t}`);return n.buffer}createDownloader(t,n,r){return async()=>{let o=await lo(this,t,n);return Lr(o.buffer,r)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){le("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){le("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){le("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),n=this.capturedPendingKernels.get(this.currentSessionId),r=t.length;this.pendingKernels=[];for(let o=0;o<r;o++){let a=this.getComputePassEncoder(),s=t[o];this.writeTimestamp(this.pendingDispatchNumber*2),a.setPipeline(s.computePipeline),a.setBindGroup(0,s.bindGroup),a.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(n[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});var ic={};Wt(ic,{init:()=>bg});var ur,Bo,bg,ac=L(()=>{"use strict";ee();et();ae();es();ur=class e{constructor(t,n,r,o){this.module=t;this.dataType=n;this.data=r;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=E.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=E.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=E.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=E.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(E.size(t)!==E.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},Bo=class{constructor(t,n,r){this.module=t;this.backend=n;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=n.adapterInfo;let o=t.PTR_SIZE,a=r/t.PTR_SIZE,s=o===4?"i32":"i64";this.opKernelContext=Number(t.getValue(o*a++,s));let u=Number(t.getValue(o*a++,s));this.outputCount=Number(t.getValue(o*a++,s)),this.customDataOffset=Number(t.getValue(o*a++,"*")),this.customDataSize=Number(t.getValue(o*a++,s));let d=[];for(let c=0;c<u;c++){let m=Number(t.getValue(o*a++,s)),f=Number(t.getValue(o*a++,"*")),g=Number(t.getValue(o*a++,s)),_=[];for(let b=0;b<g;b++)_.push(Number(t.getValue(o*a++,s)));d.push(new ur(t,m,f,_))}this.inputs=d}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(t,n){let r=n?.inputs?.map(u=>typeof u=="number"?this.inputs[u]:u)??this.inputs,o=n?.outputs??[],a=(u,d,c)=>new ur(this.module,d,this.output(u,c),c),s=(u,d)=>{let c=St(u,d);if(!c)throw new Error(`Unsupported data type: ${u}`);let m=c>0?this.backend.gpuDataManager.create(c).id:0;return new ur(this.module,u,m,d)};return this.backend.run(t,r,o,a,s,this.outputCount)}output(t,n){let r=this.module.stackSave();try{let o=this.module.PTR_SIZE,a=o===4?"i32":"i64",s=this.module.stackAlloc((1+n.length)*o);this.module.setValue(s,n.length,a);for(let u=0;u<n.length;u++)this.module.setValue(s+o*(u+1),n[u],a);return this.module._JsepOutput(this.opKernelContext,t,s)}catch(o){throw new Error(`Failed to generate kernel's output[${t}] with dims [${n}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(r)}}},bg=async(e,t,n,r)=>{let o=t.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let a=(oc(),Xt(nc)).WebGpuBackend,s=new a;await s.initialize(n,r),o("webgpu",[s,u=>s.alloc(Number(u)),u=>s.free(u),(u,d,c,m=!1)=>{if(m)le("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(d)}, size=${Number(c)}`),s.memcpy(Number(u),Number(d));else{le("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(d)}, size=${Number(c)}`);let f=t.HEAPU8.subarray(Number(u>>>0),Number(u>>>0)+Number(c));s.upload(Number(d),f)}},async(u,d,c)=>{le("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${d}, size=${c}`),await s.download(Number(u),()=>t.HEAPU8.subarray(Number(d)>>>0,Number(d+c)>>>0))},(u,d,c)=>s.createKernel(u,Number(d),c,t.UTF8ToString(t._JsepGetNodeName(Number(d)))),u=>s.releaseKernel(u),(u,d,c,m)=>{le("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${c}, kernel=${u}, contextDataOffset=${d}`);let f=new Bo(t,s,Number(d));return s.computeKernel(Number(u),f,m)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let a=new Fr(n);o("webnn",[a,()=>a.reserveTensorId(),s=>a.releaseTensorId(s),async(s,u,d,c,m)=>a.ensureTensor(s,u,d,c,m),(s,u)=>{a.uploadTensor(s,u)},async(s,u)=>a.downloadTensor(s,u),(s,u)=>a.registerMLContext(s,u),!!n.trace])}}});var _g,Ir,Ar,Rt,wg,sc,er,Er,kr,uc,Pr,Or,zr,Zn=L(()=>{"use strict";Ve();La();Ga();ee();$t();Br();to();_g=(e,t)=>{_e()._OrtInit(e,t)!==0&&ye("Can't initialize onnxruntime.")},Ir=async e=>{_g(e.wasm.numThreads,rr(e.logLevel))},Ar=async(e,t)=>{_e().asyncInit?.();let n=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let r=e.webgpu.powerPreference;if(r!==void 0&&r!=="low-power"&&r!=="high-performance")throw new Error(`Invalid powerPreference setting: "${r}"`);let o=e.webgpu.forceFallbackAdapter;if(o!==void 0&&typeof o!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${o}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:r,forceFallbackAdapter:o}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let r=(ac(),Xt(ic)).init;t==="webgpu"&&await r("webgpu",_e(),e,n),t==="webnn"&&await r("webnn",_e(),e)}},Rt=new Map,wg=e=>{let t=_e(),n=t.stackSave();try{let r=t.PTR_SIZE,o=t.stackAlloc(2*r);t._OrtGetInputOutputCount(e,o,o+r)!==0&&ye("Can't get session input/output count.");let s=r===4?"i32":"i64";return[Number(t.getValue(o,s)),Number(t.getValue(o+r,s))]}finally{t.stackRestore(n)}},sc=(e,t)=>{let n=_e(),r=n.stackSave(),o=0;try{let a=n.PTR_SIZE,s=n.stackAlloc(2*a);n._OrtGetInputOutputMetadata(e,t,s,s+a)!==0&&ye("Can't get session input/output metadata.");let d=Number(n.getValue(s,"*"));o=Number(n.getValue(s+a,"*"));let c=n.HEAP32[o/4];if(c===0)return[d,0];let m=n.HEAPU32[o/4+1],f=[];for(let g=0;g<m;g++){let _=Number(n.getValue(o+8+g*a,"*"));f.push(_!==0?n.UTF8ToString(_):Number(n.getValue(o+8+(g+m)*a,"*")))}return[d,c,f]}finally{n.stackRestore(r),o!==0&&n._OrtFree(o)}},er=e=>{let t=_e(),n=t._malloc(e.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,n),[n,e.byteLength]},Er=async(e,t)=>{let n,r,o=_e();Array.isArray(e)?[n,r]=e:e.buffer===o.HEAPU8.buffer?[n,r]=[e.byteOffset,e.byteLength]:[n,r]=er(e);let a=0,s=0,u=0,d=[],c=[],m=[];try{if([s,d]=await Wa(t),t?.externalData&&o.mountExternalData){let C=[];for(let A of t.externalData){let I=typeof A=="string"?A:A.path;C.push(nr(typeof A=="string"?A:A.data).then(z=>{o.mountExternalData(I,z)}))}await Promise.all(C)}for(let C of t?.executionProviders??[])if((typeof C=="string"?C:C.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof C!="string"){let I=C,z=I?.context,D=I?.gpuDevice,R=I?.deviceType,H=I?.powerPreference;z?o.currentContext=z:D?o.currentContext=await o.webnnCreateMLContext(D):o.currentContext=await o.webnnCreateMLContext({deviceType:R,powerPreference:H})}else o.currentContext=await o.webnnCreateMLContext();break}a=await o._OrtCreateSession(n,r,s),o.webgpuOnCreateSession?.(a),a===0&&ye("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.webnnRegisterMLContext(a,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[f,g]=wg(a),_=!!t?.enableGraphCapture,b=[],w=[],x=[],v=[],$=[];for(let C=0;C<f;C++){let[A,I,z]=sc(a,C);A===0&&ye("Can't get an input name."),c.push(A);let D=o.UTF8ToString(A);b.push(D),x.push(I===0?{name:D,isTensor:!1}:{name:D,isTensor:!0,type:Je(I),shape:z})}for(let C=0;C<g;C++){let[A,I,z]=sc(a,C+f);A===0&&ye("Can't get an output name."),m.push(A);let D=o.UTF8ToString(A);w.push(D),v.push(I===0?{name:D,isTensor:!1}:{name:D,isTensor:!0,type:Je(I),shape:z});{if(_&&t?.preferredOutputLocation===void 0){$.push("gpu-buffer");continue}let R=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[D]??"cpu",H=o.webnnIsGraphOutput;if(R==="cpu"&&H&&H(a,D)){$.push("ml-tensor-cpu-output");continue}if(R!=="cpu"&&R!=="cpu-pinned"&&R!=="gpu-buffer"&&R!=="ml-tensor")throw new Error(`Not supported preferred output location: ${R}.`);if(_&&R!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${R}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);$.push(R)}}let T=null;return $.some(C=>C==="gpu-buffer"||C==="ml-tensor"||C==="ml-tensor-cpu-output")&&(u=o._OrtCreateBinding(a),u===0&&ye("Can't create IO binding."),T={handle:u,outputPreferredLocations:$,outputPreferredLocationsEncoded:$.map(C=>C==="ml-tensor-cpu-output"?"ml-tensor":C).map(C=>eo(C))}),Rt.set(a,[a,c,m,T,_,!1]),[a,b,w,x,v]}catch(f){throw c.forEach(g=>o._OrtFree(g)),m.forEach(g=>o._OrtFree(g)),u!==0&&o._OrtReleaseBinding(u)!==0&&ye("Can't release IO binding."),a!==0&&o._OrtReleaseSession(a)!==0&&ye("Can't release session."),f}finally{o._free(n),s!==0&&o._OrtReleaseSessionOptions(s)!==0&&ye("Can't release session options."),d.forEach(f=>o._free(f)),o.unmountExternalData?.()}},kr=e=>{let t=_e(),n=Rt.get(e);if(!n)throw new Error(`cannot release session. invalid session id: ${e}`);let[r,o,a,s,u]=n;s&&(u&&t._OrtClearBoundOutputs(s.handle)!==0&&ye("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&ye("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),o.forEach(d=>t._OrtFree(d)),a.forEach(d=>t._OrtFree(d)),t._OrtReleaseSession(r)!==0&&ye("Can't release session."),Rt.delete(e)},uc=async(e,t,n,r,o,a,s=!1)=>{if(!e){t.push(0);return}let u=_e(),d=u.PTR_SIZE,c=e[0],m=e[1],f=e[3],g=f,_,b;if(c==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let v=e[2].gpuBuffer;b=St(xt(c),m);{let $=u.jsepRegisterBuffer;if(!$)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');_=$(r,a,v,b)}}else if(f==="ml-tensor"){let v=e[2].mlTensor;b=St(xt(c),m);let $=u.webnnRegisterMLTensor;if(!$)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');_=$(r,v,xt(c),m)}else{let v=e[2];if(Array.isArray(v)){b=d*v.length,_=u._malloc(b),n.push(_);for(let $=0;$<v.length;$++){if(typeof v[$]!="string")throw new TypeError(`tensor data at index ${$} is not a string`);u.setValue(_+$*d,We(v[$],n),"*")}}else{let $=u.webnnIsGraphInput,T=u.webnnIsGraphOutput;if(c!=="string"&&$&&T){let C=u.UTF8ToString(o);if($(r,C)||T(r,C)){let A=xt(c);b=St(A,m),g="ml-tensor";let I=u.webnnCreateTemporaryTensor,z=u.webnnUploadTensor;if(!I||!z)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let D=await I(r,A,m);z(D,new Uint8Array(v.buffer,v.byteOffset,v.byteLength)),_=D}else b=v.byteLength,_=u._malloc(b),n.push(_),u.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,b),_)}else b=v.byteLength,_=u._malloc(b),n.push(_),u.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,b),_)}}let w=u.stackSave(),x=u.stackAlloc(4*m.length);try{m.forEach(($,T)=>u.setValue(x+T*d,$,d===4?"i32":"i64"));let v=u._OrtCreateTensor(xt(c),_,b,x,m.length,eo(g));v===0&&ye(`Can't create tensor for input/output. session=${r}, index=${a}.`),t.push(v)}finally{u.stackRestore(w)}},Pr=async(e,t,n,r,o,a)=>{let s=_e(),u=s.PTR_SIZE,d=Rt.get(e);if(!d)throw new Error(`cannot run inference. invalid session id: ${e}`);let c=d[0],m=d[1],f=d[2],g=d[3],_=d[4],b=d[5],w=t.length,x=r.length,v=0,$=[],T=[],C=[],A=[],I=s.stackSave(),z=s.stackAlloc(w*u),D=s.stackAlloc(w*u),R=s.stackAlloc(x*u),H=s.stackAlloc(x*u);try{[v,$]=Va(a),wt("wasm prepareInputOutputTensor");for(let F=0;F<w;F++)await uc(n[F],T,A,e,m[t[F]],t[F],_);for(let F=0;F<x;F++)await uc(o[F],C,A,e,f[r[F]],w+r[F],_);vt("wasm prepareInputOutputTensor");for(let F=0;F<w;F++)s.setValue(z+F*u,T[F],"*"),s.setValue(D+F*u,m[t[F]],"*");for(let F=0;F<x;F++)s.setValue(R+F*u,C[F],"*"),s.setValue(H+F*u,f[r[F]],"*");if(g&&!b){let{handle:F,outputPreferredLocations:me,outputPreferredLocationsEncoded:oe}=g;if(m.length!==w)throw new Error(`input count from feeds (${w}) is expected to be always equal to model's input count (${m.length}).`);wt("wasm bindInputsOutputs");for(let j=0;j<w;j++){let ie=t[j];await s._OrtBindInput(F,m[ie],T[j])!==0&&ye(`Can't bind input[${j}] for session=${e}.`)}for(let j=0;j<x;j++){let ie=r[j];o[j]?.[3]?s._OrtBindOutput(F,f[ie],C[j],0)!==0&&ye(`Can't bind pre-allocated output[${j}] for session=${e}.`):s._OrtBindOutput(F,f[ie],0,oe[ie])!==0&&ye(`Can't bind output[${j}] to ${me[j]} for session=${e}.`)}vt("wasm bindInputsOutputs"),Rt.set(e,[c,m,f,g,_,!0])}s.jsepOnRunStart?.(c),s.webnnOnRunStart?.(c);let q;g?q=await s._OrtRunWithBinding(c,g.handle,x,R,v):q=await s._OrtRun(c,D,z,w,H,x,R,v),q!==0&&ye("failed to call OrtRun().");let Y=[],ne=[];wt("wasm ProcessOutputTensor");for(let F=0;F<x;F++){let me=Number(s.getValue(R+F*u,"*"));if(me===C[F]){Y.push(o[F]);continue}let oe=s.stackSave(),j=s.stackAlloc(4*u),ie=!1,Z,ce=0;try{s._OrtGetTensorData(me,j,j+u,j+2*u,j+3*u)!==0&&ye(`Can't access output tensor data on index ${F}.`);let pe=u===4?"i32":"i64",J=Number(s.getValue(j,pe));ce=s.getValue(j+u,"*");let V=s.getValue(j+u*2,"*"),O=Number(s.getValue(j+u*3,pe)),X=[];for(let xe=0;xe<O;xe++)X.push(Number(s.getValue(V+xe*u,pe)));s._OrtFree(V)!==0&&ye("Can't free memory for tensor dims.");let ze=X.reduce((xe,fe)=>xe*fe,1);Z=Je(J);let Oe=g?.outputPreferredLocations[r[F]];if(Z==="string"){if(Oe==="gpu-buffer"||Oe==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let xe=[];for(let fe=0;fe<ze;fe++){let Fe=s.getValue(ce+fe*u,"*"),mt=s.getValue(ce+(fe+1)*u,"*"),ft=fe===ze-1?void 0:mt-Fe;xe.push(s.UTF8ToString(Fe,ft))}Y.push([Z,X,xe,"cpu"])}else if(Oe==="gpu-buffer"&&ze>0){let xe=s.jsepGetBuffer;if(!xe)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let fe=xe(ce),Fe=St(J,ze);if(Fe===void 0||!Rr(Z))throw new Error(`Unsupported data type: ${Z}`);ie=!0,Y.push([Z,X,{gpuBuffer:fe,download:s.jsepCreateDownloader(fe,Fe,Z),dispose:()=>{s._OrtReleaseTensor(me)!==0&&ye("Can't release tensor.")}},"gpu-buffer"])}else if(Oe==="ml-tensor"&&ze>0){let xe=s.webnnEnsureTensor,fe=s.webnnIsGraphInputOutputTypeSupported;if(!xe||!fe)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(St(J,ze)===void 0||!Ur(Z))throw new Error(`Unsupported data type: ${Z}`);if(!fe(e,Z,!1))throw new Error(`preferredLocation "ml-tensor" for ${Z} output is not supported by current WebNN Context.`);let mt=await xe(e,ce,J,X,!1);ie=!0,Y.push([Z,X,{mlTensor:mt,download:s.webnnCreateMLTensorDownloader(ce,Z),dispose:()=>{s.webnnReleaseTensorId(ce),s._OrtReleaseTensor(me)}},"ml-tensor"])}else if(Oe==="ml-tensor-cpu-output"&&ze>0){let xe=s.webnnCreateMLTensorDownloader(ce,Z)(),fe=Y.length;ie=!0,ne.push((async()=>{let Fe=[fe,await xe];return s.webnnReleaseTensorId(ce),s._OrtReleaseTensor(me),Fe})()),Y.push([Z,X,[],"cpu"])}else{let xe=Gt(Z),fe=new xe(ze);new Uint8Array(fe.buffer,fe.byteOffset,fe.byteLength).set(s.HEAPU8.subarray(ce,ce+fe.byteLength)),Y.push([Z,X,fe,"cpu"])}}finally{s.stackRestore(oe),Z==="string"&&ce&&s._free(ce),ie||s._OrtReleaseTensor(me)}}g&&!_&&(s._OrtClearBoundOutputs(g.handle)!==0&&ye("Can't clear bound outputs."),Rt.set(e,[c,m,f,g,_,!1]));for(let[F,me]of await Promise.all(ne))Y[F][2]=me;return vt("wasm ProcessOutputTensor"),Y}finally{s.webnnOnRunEnd?.(c),s.stackRestore(I),T.forEach(q=>s._OrtReleaseTensor(q)),C.forEach(q=>s._OrtReleaseTensor(q)),A.forEach(q=>s._free(q)),v!==0&&s._OrtReleaseRunOptions(v),$.forEach(q=>s._free(q))}},Or=e=>{let t=_e(),n=Rt.get(e);if(!n)throw new Error("invalid session id");let r=n[0],o=t._OrtEndProfiling(r);o===0&&ye("Can't get an profile file name."),t._OrtFree(o)},zr=e=>{let t=[];for(let n of e){let r=n[2];!Array.isArray(r)&&"buffer"in r&&t.push(r.buffer)}return t}});var Ut,He,lr,mn,fn,pn,Mo,Ro,jt,Kt,$g,lc,dc,cc,pc,mc,fc,hc,Uo=L(()=>{"use strict";Ve();Zn();$t();Tr();Ut=()=>!!we.wasm.proxy&&typeof document<"u",lr=!1,mn=!1,fn=!1,Ro=new Map,jt=(e,t)=>{let n=Ro.get(e);n?n.push(t):Ro.set(e,[t])},Kt=()=>{if(lr||!mn||fn||!He)throw new Error("worker not ready")},$g=e=>{switch(e.data.type){case"init-wasm":lr=!1,e.data.err?(fn=!0,Mo[1](e.data.err)):(mn=!0,Mo[0]()),pn&&(URL.revokeObjectURL(pn),pn=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Ro.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},lc=async()=>{if(!mn){if(lr)throw new Error("multiple calls to 'initWasm()' detected.");if(fn)throw new Error("previous call to 'initWasm()' failed.");if(lr=!0,Ut())return new Promise((e,t)=>{He?.terminate(),Ra().then(([n,r])=>{try{He=r,He.onerror=a=>t(a),He.onmessage=$g,Mo=[e,t];let o={type:"init-wasm",in:we};!o.in.wasm.wasmPaths&&(n||Yn)&&(o.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),He.postMessage(o),pn=n}catch(o){t(o)}},t)});try{await Cr(we.wasm),await Ir(we),mn=!0}catch(e){throw fn=!0,e}finally{lr=!1}}},dc=async e=>{if(Ut())return Kt(),new Promise((t,n)=>{jt("init-ep",[t,n]);let r={type:"init-ep",in:{epName:e,env:we}};He.postMessage(r)});await Ar(we,e)},cc=async e=>Ut()?(Kt(),new Promise((t,n)=>{jt("copy-from",[t,n]);let r={type:"copy-from",in:{buffer:e}};He.postMessage(r,[e.buffer])})):er(e),pc=async(e,t)=>{if(Ut()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Kt(),new Promise((n,r)=>{jt("create",[n,r]);let o={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),He.postMessage(o,a)})}else return Er(e,t)},mc=async e=>{if(Ut())return Kt(),new Promise((t,n)=>{jt("release",[t,n]);let r={type:"release",in:e};He.postMessage(r)});kr(e)},fc=async(e,t,n,r,o,a)=>{if(Ut()){if(n.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Kt(),new Promise((s,u)=>{jt("run",[s,u]);let d=n,c={type:"run",in:{sessionId:e,inputIndices:t,inputs:d,outputIndices:r,options:a}};He.postMessage(c,zr(d))})}else return Pr(e,t,n,r,o,a)},hc=async e=>{if(Ut())return Kt(),new Promise((t,n)=>{jt("end-profiling",[t,n]);let r={type:"end-profiling",in:e};He.postMessage(r)});Or(e)}});var gc,xg,hn,yc=L(()=>{"use strict";Ve();Uo();ee();Sr();to();gc=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},xg=e=>{switch(e[3]){case"cpu":return new qe(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Rr(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:n,download:r,dispose:o}=e[2];return qe.fromGpuBuffer(n,{dataType:t,dims:e[1],download:r,dispose:o})}case"ml-tensor":{let t=e[0];if(!Ur(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:n,download:r,dispose:o}=e[2];return qe.fromMLTensor(n,{dataType:t,dims:e[1],download:r,dispose:o})}default:throw new Error(`invalid data location: ${e[3]}`)}},hn=class{async fetchModelAndCopyToWasmMemory(t){return cc(await nr(t))}async loadModel(t,n){Ne();let r;typeof t=="string"?r=await this.fetchModelAndCopyToWasmMemory(t):r=t,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await pc(r,n),Me()}async dispose(){return mc(this.sessionId)}async run(t,n,r){Ne();let o=[],a=[];Object.entries(t).forEach(g=>{let _=g[0],b=g[1],w=this.inputNames.indexOf(_);if(w===-1)throw new Error(`invalid input '${_}'`);o.push(b),a.push(w)});let s=[],u=[];Object.entries(n).forEach(g=>{let _=g[0],b=g[1],w=this.outputNames.indexOf(_);if(w===-1)throw new Error(`invalid output '${_}'`);s.push(b),u.push(w)});let d=o.map((g,_)=>gc(g,()=>`input "${this.inputNames[a[_]]}"`)),c=s.map((g,_)=>g?gc(g,()=>`output "${this.outputNames[u[_]]}"`):null),m=await fc(this.sessionId,a,d,u,c,r),f={};for(let g=0;g<m.length;g++)f[this.outputNames[u[g]]]=s[g]??xg(m[g]);return Me(),f}startProfiling(){}endProfiling(){hc(this.sessionId)}}});var _c={};Wt(_c,{OnnxruntimeWebAssemblyBackend:()=>gn,initializeFlags:()=>bc,wasmBackend:()=>Sg});var bc,gn,Sg,wc=L(()=>{"use strict";Ve();Uo();yc();bc=()=>{(typeof we.wasm.initTimeout!="number"||we.wasm.initTimeout<0)&&(we.wasm.initTimeout=0);let e=we.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),we.wasm.simd=!1),typeof we.wasm.proxy!="boolean"&&(we.wasm.proxy=!1),typeof we.wasm.trace!="boolean"&&(we.wasm.trace=!1),typeof we.wasm.numThreads!="number"||!Number.isInteger(we.wasm.numThreads)||we.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)we.wasm.numThreads=1;else{let t=typeof navigator>"u"?Wn("node:os").cpus().length:navigator.hardwareConcurrency;we.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},gn=class{async init(t){bc(),await lc(),await dc(t)}async createInferenceSessionHandler(t,n){let r=new hn;return await r.loadModel(t,n),r}},Sg=new gn});Ve();Ve();Ve();var Sa="1.23.0";var BS=Kn;{let e=(wc(),Xt(_c)).wasmBackend;Pt("webgpu",e,5),Pt("webnn",e,5),Pt("cpu",e,10),Pt("wasm",e,10)}Object.defineProperty(we.versions,"web",{value:Sa,enumerable:!0});export{Kp as InferenceSession,$r as TRACE,wt as TRACE_EVENT_BEGIN,vt as TRACE_EVENT_END,Ne as TRACE_FUNC_BEGIN,Me as TRACE_FUNC_END,qe as Tensor,BS as default,we as env,Pt as registerBackend};
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
