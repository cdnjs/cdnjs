/*!
 * ONNX Runtime Web v1.21.0-dev.20241107-6a295eb75b
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var pr=Object.defineProperty;var hu=Object.getOwnPropertyDescriptor;var gu=Object.getOwnPropertyNames;var yu=Object.prototype.hasOwnProperty;var mr=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var k=(e,t)=>()=>(e&&(t=e(e=0)),t);var gt=(e,t)=>{for(var r in t)pr(e,r,{get:t[r],enumerable:!0})},bu=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of gu(t))!yu.call(e,n)&&n!==r&&pr(e,n,{get:()=>t[n],enumerable:!(o=hu(t,n))||o.enumerable});return e};var fr=e=>bu(pr({},"__esModule",{value:!0}),e);var yt,Ne,Le,wu,bt,wt=k(()=>{"use strict";yt=new Map,Ne=[],Le=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let o=yt.get(e);if(o===void 0)yt.set(e,{backend:t,priority:r});else{if(o.priority>r)return;if(o.priority===r&&o.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let n=Ne.indexOf(e);n!==-1&&Ne.splice(n,1);for(let s=0;s<Ne.length;s++)if(yt.get(Ne[s]).priority<=r){Ne.splice(s,0,e);return}Ne.push(e)}return}throw new TypeError("not a valid backend")},wu=async e=>{let t=yt.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(o){return r||(t.error=`${o}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},bt=async e=>{let t=e.executionProviders||[],r=t.map(u=>typeof u=="string"?u:u.name),o=r.length===0?Ne:r,n,s=[],i=new Set;for(let u of o){let l=await wu(u);typeof l=="string"?s.push({name:u,err:l}):(n||(n=l),n===l&&i.add(u))}if(!n)throw new Error(`no available backend found. ERR: ${s.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:l}of s)r.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${l}`);let a=t.filter(u=>i.has(typeof u=="string"?u:u.name));return[n,new Proxy(e,{get:(u,l)=>l==="executionProviders"?a:Reflect.get(u,l)})]}});var un=k(()=>{"use strict";wt()});var ln,dn=k(()=>{"use strict";ln="1.21.0-dev.20241026-05fbb43b34"});var cn,we,hr=k(()=>{"use strict";dn();cn="warning",we={wasm:{},webgl:{},webgpu:{},versions:{common:ln},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);cn=e}},get logLevel(){return cn}};Object.defineProperty(we,"logLevel",{enumerable:!0})});var te,pn=k(()=>{"use strict";hr();te=we});var mn,fn,hn=k(()=>{"use strict";mn=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let o=r.getContext("2d");if(o!=null){let n,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],s=e.dims[3]):(n=e.dims[3],s=e.dims[2]);let i=t?.format!==void 0?t.format:"RGB",a=t?.norm,u,l;a===void 0||a.mean===void 0?u=[255,255,255,255]:typeof a.mean=="number"?u=[a.mean,a.mean,a.mean,a.mean]:(u=[a.mean[0],a.mean[1],a.mean[2],0],a.mean[3]!==void 0&&(u[3]=a.mean[3])),a===void 0||a.bias===void 0?l=[0,0,0,0]:typeof a.bias=="number"?l=[a.bias,a.bias,a.bias,a.bias]:(l=[a.bias[0],a.bias[1],a.bias[2],0],a.bias[3]!==void 0&&(l[3]=a.bias[3]));let d=s*n,c=0,p=d,h=d*2,m=-1;i==="RGBA"?(c=0,p=d,h=d*2,m=d*3):i==="RGB"?(c=0,p=d,h=d*2):i==="RBG"&&(c=0,h=d,p=d*2);for(let f=0;f<s;f++)for(let b=0;b<n;b++){let y=(e.data[c++]-l[0])*u[0],g=(e.data[p++]-l[1])*u[1],w=(e.data[h++]-l[2])*u[2],_=m===-1?255:(e.data[m++]-l[3])*u[3];o.fillStyle="rgba("+y+","+g+","+w+","+_+")",o.fillRect(b,f,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},fn=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),o;if(r!=null){let n,s,i;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],s=e.dims[1],i=e.dims[3]):(n=e.dims[3],s=e.dims[2],i=e.dims[1]);let a=t!==void 0&&t.format!==void 0?t.format:"RGB",u=t?.norm,l,d;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?d=[0,0,0,0]:typeof u.bias=="number"?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(d[3]=u.bias[3]));let c=s*n;if(t!==void 0&&(t.format!==void 0&&i===4&&t.format!=="RGBA"||i===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let p=4,h=0,m=1,f=2,b=3,y=0,g=c,w=c*2,_=-1;a==="RGBA"?(y=0,g=c,w=c*2,_=c*3):a==="RGB"?(y=0,g=c,w=c*2):a==="RBG"&&(y=0,w=c,g=c*2),o=r.createImageData(n,s);for(let $=0;$<s*n;h+=p,m+=p,f+=p,b+=p,$++)o.data[h]=(e.data[y++]-d[0])*l[0],o.data[m]=(e.data[g++]-d[1])*l[1],o.data[f]=(e.data[w++]-d[2])*l[2],o.data[b]=_===-1?255:(e.data[_++]-d[3])*l[3]}else throw new Error("Can not access image data");return o}});var gr,gn,yn,bn,wn,_n,$n=k(()=>{"use strict";_t();gr=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:o}=t,n=t.norm??{mean:255,bias:0},s,i;typeof n.mean=="number"?s=[n.mean,n.mean,n.mean,n.mean]:s=[n.mean[0],n.mean[1],n.mean[2],n.mean[3]??255],typeof n.bias=="number"?i=[n.bias,n.bias,n.bias,n.bias]:i=[n.bias[0],n.bias[1],n.bias[2],n.bias[3]??0];let a=t.format!==void 0?t.format:"RGBA",u=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",l=r*o,d=u==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),c=4,p=0,h=1,m=2,f=3,b=0,y=l,g=l*2,w=-1;a==="RGB"&&(c=3,p=0,h=1,m=2,f=-1),u==="RGBA"?w=l*3:u==="RBG"?(b=0,g=l,y=l*2):u==="BGR"&&(g=0,y=l,b=l*2);for(let $=0;$<l;$++,p+=c,m+=c,h+=c,f+=c)d[b++]=(e[p]+i[0])/s[0],d[y++]=(e[h]+i[1])/s[1],d[g++]=(e[m]+i[2])/s[2],w!==-1&&f!==-1&&(d[w++]=(e[f]+i[3])/s[3]);return u==="RGBA"?new fe("float32",d,[1,4,r,o]):new fe("float32",d,[1,3,r,o])},gn=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,o=typeof ImageData<"u"&&e instanceof ImageData,n=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,s=typeof e=="string",i,a=t??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=d=>typeof HTMLCanvasElement<"u"&&d instanceof HTMLCanvasElement||d instanceof OffscreenCanvas?d.getContext("2d"):null;if(r){let d=u();d.width=e.width,d.height=e.height;let c=l(d);if(c!=null){let p=e.height,h=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(p=t.resizedHeight,h=t.resizedWidth),t!==void 0){if(a=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");a.tensorFormat="RGBA",a.height=p,a.width=h}else a.tensorFormat="RGBA",a.height=p,a.width=h;c.drawImage(e,0,0),i=c.getImageData(0,0,h,p).data}else throw new Error("Can not access image data")}else if(o){let d,c;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(d=t.resizedHeight,c=t.resizedWidth):(d=e.height,c=e.width),t!==void 0&&(a=t),a.format="RGBA",a.height=d,a.width=c,t!==void 0){let p=u();p.width=c,p.height=d;let h=l(p);if(h!=null)h.putImageData(e,0,0),i=h.getImageData(0,0,c,d).data;else throw new Error("Can not access image data")}else i=e.data}else if(n){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let d=u();d.width=e.width,d.height=e.height;let c=l(d);if(c!=null){let p=e.height,h=e.width;return c.drawImage(e,0,0,h,p),i=c.getImageData(0,0,h,p).data,a.height=p,a.width=h,gr(i,a)}else throw new Error("Can not access image data")}else{if(s)return new Promise((d,c)=>{let p=u(),h=l(p);if(!e||!h)return c();let m=new Image;m.crossOrigin="Anonymous",m.src=e,m.onload=()=>{p.width=m.width,p.height=m.height,h.drawImage(m,0,0,p.width,p.height);let f=h.getImageData(0,0,p.width,p.height);a.height=p.height,a.width=p.width,d(gr(f.data,a))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(i!==void 0)return gr(i,a);throw new Error("Input data provided is not supported - aborted tensor creation")},yn=(e,t)=>{let{width:r,height:o,download:n,dispose:s}=t,i=[1,o,r,4];return new fe({location:"texture",type:"float32",texture:e,dims:i,download:n,dispose:s})},bn=(e,t)=>{let{dataType:r,dims:o,download:n,dispose:s}=t;return new fe({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:o,download:n,dispose:s})},wn=(e,t)=>{let{dataType:r,dims:o,download:n,dispose:s}=t;return new fe({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:o,download:n,dispose:s})},_n=(e,t,r)=>new fe({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})});var We,et,vn,xn,Sn=k(()=>{"use strict";We=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),et=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),vn=!1,xn=()=>{if(!vn){vn=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=typeof Float16Array<"u"&&Float16Array.from;e&&(We.set("int64",BigInt64Array),et.set(BigInt64Array,"int64")),t&&(We.set("uint64",BigUint64Array),et.set(BigUint64Array,"uint64")),r?(We.set("float16",Float16Array),et.set(Float16Array,"float16")):We.set("float16",Uint16Array)}}});var In,Tn,Cn=k(()=>{"use strict";_t();In=e=>{let t=1;for(let r=0;r<e.length;r++){let o=e[r];if(typeof o!="number"||!Number.isSafeInteger(o))throw new TypeError(`dims[${r}] must be an integer, got: ${o}`);if(o<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${o}`);t*=o}return t},Tn=(e,t)=>{switch(e.location){case"cpu":return new fe(e.type,e.data,t);case"cpu-pinned":return new fe({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new fe({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new fe({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new fe({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var fe,_t=k(()=>{"use strict";hn();$n();Sn();Cn();fe=class{constructor(t,r,o){xn();let n,s;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,n=t.type,s=t.dims,t.location){case"cpu-pinned":{let a=We.get(n);if(!a)throw new TypeError(`unsupported type "${n}" to create tensor from pinned buffer`);if(!(t.data instanceof a))throw new TypeError(`buffer should be of type ${a.name}`);this.cpuData=t.data;break}case"texture":{if(n!=="float32")throw new TypeError(`unsupported type "${n}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(n!=="float32"&&n!=="float16"&&n!=="int32"&&n!=="int64"&&n!=="uint32"&&n!=="uint8"&&n!=="bool"&&n!=="uint4"&&n!=="int4")throw new TypeError(`unsupported type "${n}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}case"ml-tensor":{if(n!=="float32"&&n!=="float16"&&n!=="int32"&&n!=="int64"&&n!=="uint32"&&n!=="uint64"&&n!=="int8"&&n!=="uint8"&&n!=="bool"&&n!=="uint4"&&n!=="int4")throw new TypeError(`unsupported type "${n}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let a,u;if(typeof t=="string")if(n=t,u=o,t==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");a=r}else{let l=We.get(t);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(r)){if(t==="float16"&&l===Uint16Array||t==="uint4"||t==="int4")throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${l.name} as data.`);t==="uint64"||t==="int64"?a=l.from(r,BigInt):a=l.from(r)}else if(r instanceof l)a=r;else if(r instanceof Uint8ClampedArray)if(t==="uint8")a=Uint8Array.from(r);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else throw new TypeError(`A ${n} tensor's data must be type of ${l}`)}else if(u=r,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof t[0];if(l==="string")n="string",a=t;else if(l==="boolean")n="bool",a=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(t instanceof Uint8ClampedArray)n="uint8",a=Uint8Array.from(t);else{let l=et.get(t.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);n=l,a=t}if(u===void 0)u=[a.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");s=u,this.cpuData=a,this.dataLocation="cpu"}let i=In(s);if(this.cpuData&&i!==this.cpuData.length&&!((n==="uint4"||n==="int4")&&Math.ceil(i/2)===this.cpuData.length))throw new Error(`Tensor's size(${i}) does not match data length(${this.cpuData.length}).`);this.type=n,this.dims=s,this.size=i}static async fromImage(t,r){return gn(t,r)}static fromTexture(t,r){return yn(t,r)}static fromGpuBuffer(t,r){return bn(t,r)}static fromMLTensor(t,r){return wn(t,r)}static fromPinnedBuffer(t,r,o){return _n(t,r,o)}toDataURL(t){return mn(this,t)}toImageData(t){return fn(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,t&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Tn(this,t)}}});var he,$t=k(()=>{"use strict";_t();he=fe});var vt,An,_e,ye,yr=k(()=>{"use strict";hr();vt=(e,t)=>{(typeof we.trace>"u"?!we.wasm.trace:!we.trace)||console.timeStamp(`${e}::ORT::${t}`)},An=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],o=!1;for(let n=0;n<r.length;n++){if(o&&!r[n].includes("TRACE_FUNC")){let s=`FUNC_${e}::${r[n].trim().split(" ")[1]}`;t&&(s+=`::${t}`),vt("CPU",s);return}r[n].includes("TRACE_FUNC")&&(o=!0)}},_e=e=>{(typeof we.trace>"u"?!we.wasm.trace:!we.trace)||An("BEGIN",e)},ye=e=>{(typeof we.trace>"u"?!we.wasm.trace:!we.trace)||An("END",e)}});var xt,kn=k(()=>{"use strict";wt();$t();yr();xt=class e{constructor(t){this.handler=t}async run(t,r,o){_e();let n={},s={};if(typeof t!="object"||t===null||t instanceof he||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let i=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof he)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");i=!1;for(let l of r){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);n[l]=null}if(typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,d=Object.getOwnPropertyNames(r);for(let c of this.outputNames)if(d.indexOf(c)!==-1){let p=r[c];(p===null||p instanceof he)&&(l=!0,i=!1,n[c]=p)}if(l){if(typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else s=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof t[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(i)for(let l of this.outputNames)n[l]=null;let a=await this.handler.run(t,n,s),u={};for(let l in a)if(Object.hasOwnProperty.call(a,l)){let d=a[l];d instanceof he?u[l]=d:u[l]=new he(d.type,d.data,d.dims)}return ye(),u}async release(){return this.handler.dispose()}static async create(t,r,o,n){_e();let s,i={};if(typeof t=="string"){if(s=t,typeof r=="object"&&r!==null)i=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(s=t,typeof r=="object"&&r!==null)i=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let d=t,c=0,p=t.byteLength;if(typeof r=="object"&&r!==null)i=r;else if(typeof r=="number"){if(c=r,!Number.isSafeInteger(c))throw new RangeError("'byteOffset' must be an integer.");if(c<0||c>=d.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${d.byteLength}).`);if(p=t.byteLength-c,typeof o=="number"){if(p=o,!Number.isSafeInteger(p))throw new RangeError("'byteLength' must be an integer.");if(p<=0||c+p>d.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${d.byteLength-c}].`);if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(typeof o<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");s=new Uint8Array(d,c,p)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[a,u]=await bt(i),l=await a.createInferenceSessionHandler(s,u);return ye(),new e(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var _u,En=k(()=>{"use strict";kn();_u=xt});var Pn=k(()=>{"use strict"});var zn=k(()=>{"use strict"});var Bn=k(()=>{"use strict"});var Dn=k(()=>{"use strict"});var $u,St,On=k(()=>{"use strict";wt();$t();$u="Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.",St=class e{constructor(t,r,o){this.handler=t,this.hasOptimizerModel=r,this.hasEvalModel=o}get trainingInputNames(){return this.handler.inputNames}get trainingOutputNames(){return this.handler.outputNames}get evalInputNames(){if(this.hasEvalModel)return this.handler.evalInputNames;throw new Error("This training session has no evalModel loaded.")}get evalOutputNames(){if(this.hasEvalModel)return this.handler.evalOutputNames;throw new Error("This training session has no evalModel loaded.")}static async create(t,r){let o=t.evalModel||"",n=t.optimizerModel||"",s=r||{},[i,a]=await bt(s);if(i.createTrainingSessionHandler){let u=await i.createTrainingSessionHandler(t.checkpointState,t.trainModel,o,n,a);return new e(u,!!t.optimizerModel,!!t.evalModel)}else throw new Error($u)}typeNarrowingForRunStep(t,r,o,n,s){let i={},a={};if(typeof o!="object"||o===null||o instanceof he||Array.isArray(o))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let u=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof he)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");u=!1;for(let l of n){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(r.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);i[l]=null}if(typeof s=="object"&&s!==null)a=s;else if(typeof s<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,d=Object.getOwnPropertyNames(n);for(let c of r)if(d.indexOf(c)!==-1){let p=n[c];(p===null||p instanceof he)&&(l=!0,u=!1,i[c]=p)}if(l){if(typeof s=="object"&&s!==null)a=s;else if(typeof s<"u")throw new TypeError("'options' must be an object.")}else a=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of t)if(typeof o[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(u)for(let l of r)i[l]=null;return[i,a]}convertHandlerReturnTypeToMapOfTensors(t){let r={};for(let o in t)if(Object.hasOwnProperty.call(t,o)){let n=t[o];n instanceof he?r[o]=n:r[o]=new he(n.type,n.data,n.dims)}return r}async lazyResetGrad(){await this.handler.lazyResetGrad()}async runTrainStep(t,r,o){let[n,s]=this.typeNarrowingForRunStep(this.trainingInputNames,this.trainingOutputNames,t,r,o),i=await this.handler.runTrainStep(t,n,s);return this.convertHandlerReturnTypeToMapOfTensors(i)}async runOptimizerStep(t){if(this.hasOptimizerModel)await this.handler.runOptimizerStep(t||{});else throw new Error("This TrainingSession has no OptimizerModel loaded.")}async runEvalStep(t,r,o){if(this.hasEvalModel){let[n,s]=this.typeNarrowingForRunStep(this.evalInputNames,this.evalOutputNames,t,r,o),i=await this.handler.runEvalStep(t,n,s);return this.convertHandlerReturnTypeToMapOfTensors(i)}else throw new Error("This TrainingSession has no EvalModel loaded.")}async getParametersSize(t=!0){return this.handler.getParametersSize(t)}async loadParametersBuffer(t,r=!0){let o=await this.getParametersSize(r);if(t.length!==4*o)throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");return this.handler.loadParametersBuffer(t,r)}async getContiguousParameters(t=!0){return this.handler.getContiguousParameters(t)}async release(){return this.handler.dispose()}}});var vu,Rn=k(()=>{"use strict";On();vu=St});var br={};gt(br,{InferenceSession:()=>_u,TRACE:()=>vt,TRACE_FUNC_BEGIN:()=>_e,TRACE_FUNC_END:()=>ye,Tensor:()=>he,TrainingSession:()=>vu,env:()=>te,registerBackend:()=>Le});var Se=k(()=>{"use strict";un();pn();En();$t();Pn();zn();yr();Bn();Dn();Rn()});var It=k(()=>{"use strict"});var Nn={};gt(Nn,{default:()=>xu});var Vn,Un,xu,Ln=k(()=>{"use strict";wr();Me();tt();Vn="ort-wasm-proxy-worker",Un=globalThis.self?.name===Vn;Un&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":Tt(r.wasm).then(()=>{Ct(r).then(()=>{postMessage({type:t})},o=>{postMessage({type:t,err:o})})},o=>{postMessage({type:t,err:o})});break;case"init-ep":{let{epName:o,env:n}=r;At(n,o).then(()=>{postMessage({type:t})},s=>{postMessage({type:t,err:s})});break}case"copy-from":{let{buffer:o}=r,n=rt(o);postMessage({type:t,out:n});break}case"create":{let{model:o,options:n}=r;kt(o,n).then(s=>{postMessage({type:t,out:s})},s=>{postMessage({type:t,err:s})});break}case"release":Et(r),postMessage({type:t});break;case"run":{let{sessionId:o,inputIndices:n,inputs:s,outputIndices:i,options:a}=r;Pt(o,n,s,i,new Array(i.length).fill(null),a).then(u=>{u.some(l=>l[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:u},Bt([...s,...u]))},u=>{postMessage({type:t,err:u})});break}case"end-profiling":zt(r),postMessage({type:t});break;default:}}catch(o){postMessage({type:t,err:o})}});xu=Un?null:e=>new Worker(e??Ie,{type:"module",name:Vn})});var Ie,Su,Gn,Iu,Tu,Hn,Cu,Wn,qn,Fn,tt=k(()=>{"use strict";It();Ie=!1?void 0:import.meta.url??(typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0),Su=!1||typeof location>"u"?void 0:location.origin,Gn=(e,t)=>{try{let r=t??Ie;return(r?new URL(e,r):new URL(e)).origin===Su}catch{return!1}},Iu=(e,t)=>{let r=t??Ie;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},Tu=(e,t)=>`${t??"./"}${e}`,Hn=async e=>{let r=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},Cu=async e=>(await import(/*webpackIgnore:true*/e)).default,Wn=(Ln(),fr(Nn)).default,qn=async()=>{if(!Ie)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Gn(Ie))return[void 0,Wn()];let e=await Hn(Ie);return[e,Wn(e)]},Fn=async(e,t,r)=>{{let o="ort-wasm-simd-threaded.jsep.mjs",n=e??Iu(o,t),s=!!1&&r&&n&&!Gn(n,t),i=s?await Hn(n):n??Tu(o,t);return[s?i:void 0,await Cu(i)]}}});var _r,$r,Dt,Kn,Au,ku,Tt,ae,Me=k(()=>{"use strict";tt();$r=!1,Dt=!1,Kn=!1,Au=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},ku=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Tt=async e=>{if($r)return Promise.resolve();if(Dt)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Kn)throw new Error("previous call to 'initializeWebAssembly()' failed.");Dt=!0;let t=e.initTimeout,r=e.numThreads;if(!ku())throw new Error("WebAssembly SIMD is not supported in the current environment.");let o=Au();r>1&&!o&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let n=e.wasmPaths,s=typeof n=="string"?n:void 0,i=n?.mjs,a=i?.href??i,u=n?.wasm,l=u?.href??u,d=e.wasmBinary,[c,p]=await Fn(a,s,r>1),h=!1,m=[];if(t>0&&m.push(new Promise(f=>{setTimeout(()=>{h=!0,f()},t)})),m.push(new Promise((f,b)=>{let y={numThreads:r};d?y.wasmBinary=d:(l||s)&&(y.locateFile=(g,w)=>l??(s??w)+g),p(y).then(g=>{Dt=!1,$r=!0,_r=g,f(),c&&URL.revokeObjectURL(c)},g=>{Dt=!1,Kn=!0,b(g)})})),await Promise.race(m),h)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},ae=()=>{if($r&&_r)return _r;throw new Error("WebAssembly is not initialized yet.")}});var de,nt,X,Ot=k(()=>{"use strict";Me();de=(e,t)=>{let r=ae(),o=r.lengthBytesUTF8(e)+1,n=r._malloc(o);return r.stringToUTF8(e,n,o),t.push(n),n},nt=(e,t,r,o)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([n,s])=>{let i=t?t+n:n;if(typeof s=="object")nt(s,i+".",r,o);else if(typeof s=="string"||typeof s=="number")o(i,s.toString());else if(typeof s=="boolean")o(i,s?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof s}`)})},X=e=>{let t=ae(),r=t.stackSave();try{let o=t.PTR_SIZE,n=t.stackAlloc(2*o);t._OrtGetLastError(n,n+o);let s=Number(t.getValue(n,o===4?"i32":"i64")),i=t.getValue(n+o,"*"),a=i?t.UTF8ToString(i):"";throw new Error(`${e} ERROR_CODE: ${s}, ERROR_MESSAGE: ${a}`)}finally{t.stackRestore(r)}}});var jn,Zn=k(()=>{"use strict";Me();Ot();jn=e=>{let t=ae(),r=0,o=[],n=e||{};try{if(e?.logSeverityLevel===void 0)n.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)n.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(n.terminate=!1);let s=0;return e?.tag!==void 0&&(s=de(e.tag,o)),r=t._OrtCreateRunOptions(n.logSeverityLevel,n.logVerbosityLevel,!!n.terminate,s),r===0&&X("Can't create run options."),e?.extra!==void 0&&nt(e.extra,"",new WeakSet,(i,a)=>{let u=de(i,o),l=de(a,o);t._OrtAddRunConfigEntry(r,u,l)!==0&&X(`Can't set a run config entry: ${i} - ${a}.`)}),[r,o]}catch(s){throw r!==0&&t._OrtReleaseRunOptions(r),o.forEach(i=>t._free(i)),s}}});var Eu,Pu,zu,Bu,Xn,Qn=k(()=>{"use strict";Me();Ot();Eu=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Pu=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},zu=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Bu=(e,t,r)=>{for(let o of t){let n=typeof o=="string"?o:o.name;switch(n){case"webnn":if(n="WEBNN",typeof o!="string"){let a=o?.deviceType;if(a){let u=de("deviceType",r),l=de(a,r);ae()._OrtAddSessionConfigEntry(e,u,l)!==0&&X(`Can't set a session config entry: 'deviceType' - ${a}.`)}}break;case"webgpu":if(n="JS",typeof o!="string"){let i=o;if(i?.preferredLayout){if(i.preferredLayout!=="NCHW"&&i.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${i.preferredLayout}`);let a=de("preferredLayout",r),u=de(i.preferredLayout,r);ae()._OrtAddSessionConfigEntry(e,a,u)!==0&&X(`Can't set a session config entry: 'preferredLayout' - ${i.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${n}`)}let s=de(n,r);ae()._OrtAppendExecutionProvider(e,s)!==0&&X(`Can't append execution provider: ${n}.`)}},Xn=e=>{let t=ae(),r=0,o=[],n=e||{};zu(n);try{let s=Eu(n.graphOptimizationLevel??"all"),i=Pu(n.executionMode??"sequential"),a=typeof n.logId=="string"?de(n.logId,o):0,u=n.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log serverity level is not valid: ${u}`);let l=n.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let d=typeof n.optimizedModelFilePath=="string"?de(n.optimizedModelFilePath,o):0;if(r=t._OrtCreateSessionOptions(s,!!n.enableCpuMemArena,!!n.enableMemPattern,i,!!n.enableProfiling,0,a,u,l,d),r===0&&X("Can't create session options."),n.executionProviders&&Bu(r,n.executionProviders,o),n.enableGraphCapture!==void 0){if(typeof n.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${n.enableGraphCapture}`);let c=de("enableGraphCapture",o),p=de(n.enableGraphCapture.toString(),o);t._OrtAddSessionConfigEntry(r,c,p)!==0&&X(`Can't set a session config entry: 'enableGraphCapture' - ${n.enableGraphCapture}.`)}if(n.freeDimensionOverrides)for(let[c,p]of Object.entries(n.freeDimensionOverrides)){if(typeof c!="string")throw new Error(`free dimension override name must be a string: ${c}`);if(typeof p!="number"||!Number.isInteger(p)||p<0)throw new Error(`free dimension override value must be a non-negative integer: ${p}`);let h=de(c,o);t._OrtAddFreeDimensionOverride(r,h,p)!==0&&X(`Can't set a free dimension override: ${c} - ${p}.`)}return n.extra!==void 0&&nt(n.extra,"",new WeakSet,(c,p)=>{let h=de(c,o),m=de(p,o);t._OrtAddSessionConfigEntry(r,h,m)!==0&&X(`Can't set a session config entry: ${c} - ${p}.`)}),[r,o]}catch(s){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&X("Can't release session options."),o.forEach(i=>t._free(i)),s}}});var ot,Ve,He,Rt,it,Mt,Vt,vr,M=k(()=>{"use strict";ot=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},Ve=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},He=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],o=typeof t=="number"?t:t.reduce((n,s)=>n*s,1);return r>0?Math.ceil(o*r):void 0},Rt=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},it=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Mt=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Vt=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",vr=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}});var st,xr=k(()=>{"use strict";It();st=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=mr("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=mr("node:fs"),o=r(e),n=[];for await(let s of o)n.push(s);return new Uint8Array(Buffer.concat(n))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),o=r?parseInt(r,10):0;if(o<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let n=t.body.getReader(),s;try{s=new ArrayBuffer(o)}catch(a){if(a instanceof RangeError){let u=Math.ceil(o/65536);s=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw a}let i=0;for(;;){let{done:a,value:u}=await n.read();if(a)break;let l=u.byteLength;new Uint8Array(s,i,l).set(u),i+=l}return new Uint8Array(s,0,o)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var Du,Ou,Yn,Jn,Ut,Ru,j,Ce=k(()=>{"use strict";M();Du=["V","I","W","E","F"],Ou=(e,t)=>{console.log(`[${Du[e]},${new Date().toISOString()}]${t}`)},Ut=(e,t)=>{Yn=e,Jn=t},Ru=(e,t)=>{let r=it(e),o=it(Yn);r>=o&&Ou(r,typeof t=="function"?t():t)},j=(...e)=>{Jn&&Ru(...e)}});var Nt,Sr=k(()=>{"use strict";M();Nt=(e,t)=>new(Rt(t))(e)});var Lt=k(()=>{"use strict"});var eo,Ir,Tr,Mu,Vu,to,Ar,Cr,no,oo=k(()=>{"use strict";Ce();Lt();eo=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Ir=[],Tr=e=>Math.ceil(Number(e)/16)*16,Mu=e=>{for(let t=0;t<Ir.length;t++){let r=Ir[t];if(e<=r)return r}return Math.ceil(e/16)*16},Vu=1,to=()=>Vu++,Ar=async(e,t,r,o)=>{let n=Tr(r),s=e.device.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let i=e.getCommandEncoder();e.endComputePass(),i.copyBufferToBuffer(t,0,s,0,n),e.flush(),await s.mapAsync(GPUMapMode.READ);let a=s.getMappedRange();if(o){let u=o();return u.set(new Uint8Array(a,0,r)),u}else return new Uint8Array(a.slice(0,r))}finally{s.destroy()}},Cr=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[r]of eo)Ir.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(t,r){let o=r.buffer,n=r.byteOffset,s=r.byteLength,i=Tr(s),a=this.storageCache.get(t);if(!a)throw new Error("gpu data for uploading does not exist");if(Number(a.originalSize)!==s)throw new Error(`inconsistent data size. gpu data size=${a.originalSize}, data size=${s}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:i,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=u.getMappedRange();new Uint8Array(l).set(new Uint8Array(o,n,s)),u.unmap();let d=this.backend.device.createCommandEncoder();d.copyBufferToBuffer(u,0,a.gpuData.buffer,0,i),this.backend.device.queue.submit([d.finish()]),u.destroy(),j("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`)}memcpy(t,r){let o=this.storageCache.get(t);if(!o)throw new Error("source gpu data for memcpy does not exist");let n=this.storageCache.get(r);if(!n)throw new Error("destination gpu data for memcpy does not exist");if(o.originalSize!==n.originalSize)throw new Error("inconsistent source and destination gpu data size");let s=Tr(o.originalSize),i=this.backend.getCommandEncoder();this.backend.endComputePass(),i.copyBufferToBuffer(o.gpuData.buffer,0,n.gpuData.buffer,0,s)}registerExternalBuffer(t,r,o){let n;if(o){if(n=o[0],t===o[1])return j("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${n}, buffer is the same, skip.`),n;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else n=to();return this.storageCache.set(n,{gpuData:{id:n,type:0,buffer:t},originalSize:r}),j("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${n}, registered.`),n}unregisterExternalBuffer(t){t!==void 0&&(this.storageCache.delete(t),j("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(t,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let o=Mu(t),n,s=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,i=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(s||i){let l=(s?this.freeBuffers:this.freeUniformBuffers).get(o);l?l.length>0?n=l.pop():n=this.backend.device.createBuffer({size:o,usage:r}):n=this.backend.device.createBuffer({size:o,usage:r})}else n=this.backend.device.createBuffer({size:o,usage:r});let a={id:to(),type:0,buffer:n};return this.storageCache.set(a.id,{gpuData:a,originalSize:Number(t)}),j("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${a.id}`),a}get(t){return this.storageCache.get(t)?.gpuData}release(t){let r=typeof t=="bigint"?Number(t):t,o=this.storageCache.get(r);if(!o){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return j("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${o.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(o.gpuData.buffer),o.originalSize}async download(t,r){let o=this.storageCache.get(Number(t));if(!o)throw new Error("data does not exist");await Ar(this.backend,o.gpuData.buffer,o.originalSize,r)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let r=eo.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let o=this.freeBuffers.get(t.size)||[];r===void 0||o.length>=r?t.destroy():o.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let o=this.freeUniformBuffers.get(t.size)||[];r===void 0||o.length>=r?t.destroy():o.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let r of this.buffersPending)t.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(t){let r=this.capturedPendingBuffers.get(t);r&&(r.forEach(o=>{o.destroy()}),this.capturedPendingBuffers.delete(t)),this.sessionCount-=1,this.sessionCount===0&&(j("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(o=>{o.gpuData.buffer.destroy()}),this.storageCache=new Map)}},no=(...e)=>new Cr(...e)});var kr,U,ue=k(()=>{"use strict";kr=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},U=e=>new kr(e)});var Er,ke,x,qe,Wt,io,so,q=k(()=>{"use strict";Er=class{static calcMatMulShape(t,r){return t[1]!==r[0]?void 0:[t[0],r[1]]}},ke=class{static calcShape(t,r,o=!1){let n=t.length,s=r.length;if(n===0)return r;if(s===0)return t;let i=Math.max(t.length,r.length),a=new Array(i);if(o){if(n<2||s<2)return;let u=Er.calcMatMulShape([t[n-2],t[n-1]],[r[s-2],r[s-1]]);if(u===void 0)return;[a[i-2],a[i-1]]=u}for(let u=o?3:1;u<=i;u++){let l=n-u<0?1:t[n-u],d=s-u<0?1:r[s-u];if(l!==d&&l>1&&d>1)return;let c=Math.max(l,d);if(l&&d)a[i-u]=Math.max(l,d);else{if(c>1)return;a[i-u]=0}}return a}static isValidBroadcast(t,r){let o=t.length,n=r.length;if(o>n)return!1;for(let s=1;s<=o;s++)if(t[o-s]!==1&&t[o-s]!==r[n-s])return!1;return!0}},x=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let o=t.length;if(o===0)return[];let n=new Array(o),s=o-1;for(;s>=0;){if(t[s]%r===0){n[s]=t[s]/r;break}if(r%t[s]!==0)throw new Error("cannot convert shape");n[s]=1,r/=t[s],s--}for(s--;s>=0;s--)n[s]=t[s];return n}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,o){let n=1;for(let s=r;s<o;s++){if(t[s]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");n*=Number(t[s])}return n}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let o=new Array(r);o[r-1]=1,o[r-2]=t[r-1];for(let n=r-3;n>=0;--n)o[n]=o[n+1]*t[n+1];return o}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(o=>this.normalizeAxis(o,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(o=>t[o]):t.slice().reverse()}static padShape(t,r){let o=t.length;return t.map((n,s)=>n+r[s]+r[s+o])}static areEqual(t,r){return t.length!==r.length?!1:t.every((o,n)=>o===r[n])}},qe=class e{static adjustPoolAttributes(t,r,o,n,s,i){if(!t&&o.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let a=0;a<r.length-2;a++)a>=o.length?o.push(r[a+2]):o[a]=r[a+2];for(let a=0;a<o.length;a++)if(a<n.length){if(n[a]<0)throw new Error("strides should be greater than or equal to 1")}else n.push(1);for(let a=0;a<o.length;a++)if(a<s.length){if(s[a]<0)throw new Error("dilations should be greater than or equal to 1")}else s.push(1);for(let a=0;a<o.length*2;a++)if(a<i.length){if(i[a]<0)throw new Error("pad should be greater than or equal to 1")}else i.push(0);for(let a=0;a<o.length;a++){if(o[a]<=0)throw new Error("kernel shapes need to be greater than 0");if(i[a]>=o[a]||i[a+o.length]>=o[a])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,o,n,s,i,a){if(a){if(s.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<t.length-2;u++)e.adjustPadAndReturnShape(t[u+(i?1:2)],r[u],o[u],n[u],s,u,u+t.length-2,a)}}static computePoolOutputShape(t,r,o,n,s,i,a){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return e.computeShapeHelper(t,r,u,o,n,s,i,a),u}static computeConvOutputShape(t,r,o,n,s,i,a){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],r[0]];return e.computeShapeHelper(!1,t,u,o,n,s,i,a),u}static computeShapeHelper(t,r,o,n,s,i,a,u){if(t)for(let l=0;l<r.length-2;l++)o.push(1);else for(let l=0;l<r.length-2;l++)o.push(e.adjustPadAndReturnShape(r[l+2],n[l],s[l],i[l],a,l,l+r.length-2,u))}static adjustPadAndReturnShape(t,r,o,n,s,i,a,u){let l=o*(n-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return s[i]=0,s[a]=0,Math.floor((t-l)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(o!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((t+r-1)/r-1)*r+n-t;return s[i]=Math.floor(u==="SAME_LOWER"?(c+1)/2:c/2),s[a]=c-s[i],Math.floor((t+c-n)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+s[i]+s[a]-l)/r+1)}},Wt=class{static getShapeOfGemmResult(t,r,o,n,s){if(t.length!==2||o.length!==2)throw new Error("shape need to be of size 2");let i,a,u;r?(i=t[1],a=t[0]):(i=t[0],a=t[1]);let l=-1;if(n?(u=o[0],l=1):(u=o[1],l=0),o[l]!==a)throw new Error("dimension mismatch");if(i<=0||u<=0||a<=0)throw new Error("invalid shape specified");if(s&&!ke.isValidBroadcast(s,[i,u]))throw new Error("gemm: invalid bias shape for broadcast");return[i,u,a]}},io=-34028234663852886e22,so=34028234663852886e22});var Fe,zr,J,ce,E,re,Br,Ke,Ae,D,Dr,S,C,Gt,Pr,ao,Xe,F=k(()=>{"use strict";M();q();Fe=64,zr=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},J=(e,t=1)=>{let r=zr(e,t);return typeof r=="string"?r:r[0]},ce=(e,t=1)=>{let r=zr(e,t);return typeof r=="string"?r:r[1]},E=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:x.computeStrides(r)})}),t},re=e=>e%4===0?4:e%2===0?2:1,Br=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Ke=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,Ae=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,D=(e,t,r,o)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?o==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:o==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,Dr=(e,t,r,o,n)=>{let s=typeof r=="number",i=s?r:r.length,a=[...new Array(i).keys()],u=i<2?"u32":i<=4?`vec${i}<u32>`:`array<u32, ${i}>`,l=zr(t,n),d=typeof l=="string"?l:l[1],c=typeof l=="string"?l:l[0],p={indices:u,value:d,storage:c,tensor:t},h=P=>typeof P=="string"?P:`${P}u`,m={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},f=s?"uniforms.":"",b=`${f}${e}_shape`,y=`${f}${e}_strides`,g="";for(let P=0;P<i-1;P++)g+=`
    let dim${P} = current / ${D(y,P,i)};
    let rest${P} = current % ${D(y,P,i)};
    indices[${P}] = dim${P};
    current = rest${P};
    `;g+=`indices[${i-1}] = current;`;let w=i<2?"":`
  fn o2i_${e}(offset: u32) -> ${p.indices} {
    var indices: ${p.indices};
    var current = offset;
    ${g}
    return indices;
  }`,_=P=>(m.offsetToIndices=!0,i<2?P:`o2i_${e}(${P})`),$=[];if(i>=2)for(let P=i-1;P>=0;P--)$.push(`${D(y,P,i)} * (indices[${P}])`);let v=i<2?"":`
  fn i2o_${e}(indices: ${p.indices}) -> u32 {
    return ${$.join("+")};
  }`,I=P=>(m.indicesToOffset=!0,i<2?P:`i2o_${e}(${P})`),T=(...P)=>i===0?"0u":`${p.indices}(${P.map(h).join(",")})`,A=(P,R)=>i<2?`${P}`:`${D(P,R,i)}`,B=(P,R,Y)=>i<2?`${P}=${Y};`:`${D(P,R,i)}=${Y};`,O={},W=(P,R)=>{m.broadcastedIndicesToOffset=!0;let Y=`${R.name}broadcastedIndicesTo${e}Offset`;if(Y in O)return`${Y}(${P})`;let ge=[];for(let ie=i-1;ie>=0;ie--){let le=R.indicesGet("outputIndices",ie+R.rank-i);ge.push(`${A(y,ie)} * (${le} % ${A(b,ie)})`)}return O[Y]=`fn ${Y}(outputIndices: ${R.type.indices}) -> u32 {
             return ${ge.length>0?ge.join("+"):"0u"};
           }`,`${Y}(${P})`},z=(P,R)=>(()=>{if(p.storage===p.value)return`${e}[${P}]=${R};`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`${e}[${P}]=vec2<u32>(u32(${R}), select(0u, 0xFFFFFFFFu, ${R} < 0));`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`${e}[${P}]=vec2<u32>(u32(${R}), 0u);`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`${e}[${P}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${R}));`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),N=P=>(()=>{if(p.storage===p.value)return`${e}[${P}]`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`i32(${e}[${P}].x)`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`u32(${e}[${P}].x)`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${P}] & 0xFFu), bool(${e}[${P}] & 0xFF00u), bool(${e}[${P}] & 0xFF0000u), bool(${e}[${P}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),se=i<2?"":`
  fn get_${e}ByIndices(indices: ${p.indices}) -> ${d} {
    return ${N(`i2o_${e}(indices)`)};
  }`,L=i<2?"":(()=>{let P=a.map(Y=>`d${Y}: u32`).join(", "),R=a.map(Y=>`d${Y}`).join(", ");return`
  fn get_${e}(${P}) -> ${d} {
    return get_${e}ByIndices(${T(R)});
  }`})(),Z=(...P)=>{if(P.length!==i)throw new Error(`indices length must be ${i}`);let R=P.map(h).join(",");return i===0?N("0u"):i===1?N(R[0]):(m.get=!0,m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}(${R})`)},K=P=>i<2?N(P):(m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}ByIndices(${P})`),V=i<2?"":`
  fn set_${e}ByIndices(indices: ${p.indices}, value: ${d}) {
    ${z(`i2o_${e}(indices)`,"value")}
  }`,ne=i<2?"":(()=>{let P=a.map(Y=>`d${Y}: u32`).join(", "),R=a.map(Y=>`d${Y}`).join(", ");return`
  fn set_${e}(${P}, value: ${d}) {
    set_${e}ByIndices(${T(R)}, value);
  }`})();return{impl:()=>{let P=[],R=!1;return m.offsetToIndices&&(P.push(w),R=!0),m.indicesToOffset&&(P.push(v),R=!0),m.broadcastedIndicesToOffset&&(Object.values(O).forEach(Y=>P.push(Y)),R=!0),m.set&&(P.push(ne),R=!0),m.setByIndices&&(P.push(V),R=!0),m.get&&(P.push(L),R=!0),m.getByIndices&&(P.push(se),R=!0),!s&&R&&P.unshift(`const ${b} = ${p.indices}(${r.join(",")});`,`const ${y} = ${p.indices}(${x.computeStrides(r).join(",")});`),P.join(`
`)},type:p,offsetToIndices:_,indicesToOffset:I,broadcastedIndicesToOffset:W,indices:T,indicesGet:A,indicesSet:B,set:(...P)=>{if(P.length!==i+1)throw new Error(`indices length must be ${i}`);let R=P[i];if(typeof R!="string")throw new Error("value must be string");let Y=P.slice(0,i).map(h).join(",");return i===0?z("0u",R):i===1?z(Y[0],R):(m.set=!0,m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}(${Y}, ${R})`)},setByOffset:z,setByIndices:(P,R)=>i<2?z(P,R):(m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}ByIndices(${P}, ${R});`),get:Z,getByOffset:N,getByIndices:K,usage:o,name:e,strides:y,shape:b,rank:i}},S=(e,t,r,o=1)=>Dr(e,t,r,"input",o),C=(e,t,r,o=1)=>Dr(e,t,r,"output",o),Gt=(e,t,r,o=1)=>Dr(e,t,r,"internal",o),Pr=class{constructor(t,r){this.normalizedDispatchGroup=t;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=Fe){let r=typeof t=="number"?t:t[0],o=typeof t=="number"?1:t[1],n=typeof t=="number"?1:t[2];if(r>this.limits.maxComputeWorkgroupSizeX||o>this.limits.maxComputeWorkgroupSizeY||n>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${o}, ${n}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*o*n>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${o}, ${n}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let s=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,i=s?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,a=s?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${r*o*n}u + local_idx;`;return`@compute @workgroup_size(${r}, ${o}, ${n})
  fn main(${i}) {
    ${a}
  `}appendVariableUniforms(t){t.rank!==0&&(t.shape.startsWith("uniforms.")&&this.uniforms.push({name:t.shape.replace("uniforms.",""),type:"u32",length:t.rank}),t.strides.startsWith("uniforms.")&&this.uniforms.push({name:t.strides.replace("uniforms.",""),type:"u32",length:t.rank}))}declareVariable(t,r){if(t.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(t),this.appendVariableUniforms(t);let o=t.usage==="input"?"read":"read_write",n=t.type.storage;return`@group(0) @binding(${r}) var<storage, ${o}> ${t.name}: array<${n}>;`}declareVariables(...t){return t.map(r=>this.declareVariable(r,this.variableIndex++)).join(`
`)}registerInternalVariable(t){if(t.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(t),this.appendVariableUniforms(t)}registerInternalVariables(...t){return t.forEach(r=>this.registerInternalVariable(r)),this}registerUniform(t,r,o=1){return this.uniforms.push({name:t,type:r,length:o}),this}registerUniforms(t){return this.uniforms=this.uniforms.concat(t),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let t=[];for(let{name:r,type:o,length:n}of this.uniforms)if(n&&n>4)o==="f16"?t.push(`@align(16) ${r}:array<mat2x4<${o}>, ${Math.ceil(n/8)}>`):t.push(`${r}:array<vec4<${o}>, ${Math.ceil(n/4)}>`);else{let s=n==null||n===1?o:`vec${n}<${o}>`;t.push(`${r}:${s}`)}return`
      struct Uniforms { ${t.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(t=>t.impl()).join(`
`)+this.internalVariables.map(t=>t.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[t(r.type),r.length??1])}},ao=(e,t)=>new Pr(e,t),Xe=(e,t)=>{let r=e.length,o=[];for(let n=0;n<r;n++){let s=r-1-n,i=e[s]||1;(t[t.length-1-n]||1)>1&&i===1&&o.unshift(s)}return o}});var Uu,uo,Nu,Lu,Wu,pe,lo,co,Oe=k(()=>{"use strict";M();q();ue();F();Uu=e=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.")},uo=(e,t)=>t&&t.length!==e?[...new Array(e).keys()].reverse():t,Nu=(e,t)=>x.sortBasedOnPerm(e,uo(e.length,t)),Lu=(e,t,r,o)=>{let n=`fn perm(i: ${o.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let s=0;s<t;++s)n+=r.indicesSet("a",e[s],`i[${s}]`);return n+="return a;}"},Wu=(e,t)=>{let r=[],o=[];for(let n=0;n<e.length;++n)e[n]!==1&&r.push(e[n]),e[t[n]]!==1&&o.push(t[n]);return{newShape:r,newPerm:o}},pe=(e,t)=>{let r=e.dataType,o=e.dims.length,n=uo(o,t),s=Nu(e.dims,n),{newShape:i,newPerm:a}=Wu(e.dims,n),u=x.areEqual(a,[2,3,1]),l=x.areEqual(a,[3,1,2]),d=i.length===2&&a[0]>a[1]||u||l,c=d?i:e.dims,p=s;d&&(c=u?[i[0],i[1]*i[2]]:l?[i[0]*i[1],i[2]]:i,p=[c[1],c[0]]);let h=S("a",r,c.length),m=C("output",r,p.length),f=16,b;return d?b=y=>`
  ${y.registerUniform("output_size","u32").declareVariables(h,m)}
  var<workgroup> tile : array<array<${m.type.value}, ${f+1}>, ${f}>;
  ${y.mainStart([f,f,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${f} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${f}u + local_id.x;
    let input_row = workgroup_id_x * ${f}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${h.getByIndices(`${h.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${f}u + local_id.x;
    let output_row = workgroup_id_y * ${f}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${m.setByIndices(`${m.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`:b=y=>`
  ${y.registerUniform("output_size","u32").declareVariables(h,m)}

  ${Lu(n,o,h,m)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${m.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${m.setByOffset("global_idx",h.getByIndices("aIndices"))}
  }`,{name:d?"TransposeShared":"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let y=x.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:d?{x:Math.ceil(p[1]/f),y:Math.ceil(p[0]/f)}:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...E(c,p)]}},getShaderSource:b}},lo=(e,t)=>{Uu(e.inputs),e.compute(pe(e.inputs[0],t.perm))},co=e=>U({perm:e.perm})});var Gu,Hu,qu,Fu,Ku,ju,Zu,Xu,Qu,Yu,Ee,po,mo,fo,ho,go,yo,bo,wo,_o,$o,vo=k(()=>{"use strict";M();q();F();Ht();Oe();Gu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Hu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},qu={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Fu={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Ku=(e,t)=>{let r=[];for(let o=t-e;o<t;++o)r.push(o);return r},ju=(e,t)=>{let r=[],o=e.length;for(let s=0;s<o;s++)t.indexOf(s)===-1&&r.push(e[s]);let n=t.map(s=>e[s]);return[r,n]},Zu=(e,t)=>{let r=e.length+t.length,o=[],n=0;for(let s=0;s<r;s++)t.indexOf(s)===-1?o.push(e[n++]):o.push(1);return o},Xu=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},Qu=(e,t)=>{let r=[];if(!Xu(e,t)){for(let o=0;o<t;++o)e.indexOf(o)===-1&&r.push(o);e.forEach(o=>r.push(o))}return r},Yu=(e,t,r,o,n,s,i)=>{let a=r[0].dims,u=x.size(s),l=x.size(i),d=S("_A",r[0].dataType,a),c=C("output",n,s),p=64;u===1&&(p=256);let h=`
          var<workgroup> aBestValues : array<f32, ${p}>;
       `,m=f=>`
        ${f.registerUniform("reduceSize","u32").declareVariables(d,c)}
        ${h}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${f.mainStart(p)}

          let outputIndex = global_idx / ${p};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${qu[o]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${p}) {
           let candidate = f32(${d.getByOffset("offset + k")});
           bestValue = ${Gu[o]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${p}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Hu[o]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${c.setByOffset("outputIndex",`${o==="mean"?`${c.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${c.type.storage}(${Fu[o]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${p}`,inputDependencies:["type"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:u},programUniforms:[{type:12,data:l}]})}},Ee=(e,t,r,o)=>{let n=e.inputs.length===1?r:Or(e.inputs,r),s=n.axes;s.length===0&&!n.noopWithEmptyAxes&&(s=e.inputs[0].dims.map((h,m)=>m));let i=x.normalizeAxes(s,e.inputs[0].dims.length),a=i,u=e.inputs[0],l=Qu(a,e.inputs[0].dims.length);l.length>0&&(u=e.compute(pe(e.inputs[0],l),{inputs:[0],outputs:[-1]})[0],a=Ku(a.length,u.dims.length));let[d,c]=ju(u.dims,a),p=d;n.keepDims&&(p=Zu(d,i)),e.compute(Yu(t,n.cacheKey,[u],o,e.inputs[0].dataType,p,c),{inputs:[u]})},po=(e,t)=>{Ee(e,"ReduceMeanShared",t,"mean")},mo=(e,t)=>{Ee(e,"ReduceL1Shared",t,"l1")},fo=(e,t)=>{Ee(e,"ReduceL2Shared",t,"l2")},ho=(e,t)=>{Ee(e,"ReduceLogSumExpShared",t,"logSumExp")},go=(e,t)=>{Ee(e,"ReduceMaxShared",t,"max")},yo=(e,t)=>{Ee(e,"ReduceMinShared",t,"min")},bo=(e,t)=>{Ee(e,"ReduceProdShared",t,"prod")},wo=(e,t)=>{Ee(e,"ReduceSumShared",t,"sum")},_o=(e,t)=>{Ee(e,"ReduceSumSquareShared",t,"sumSquare")},$o=(e,t)=>{Ee(e,"ReduceLogSumShared",t,"logSum")}});var Pe,Ju,qt,Or,ze,el,tl,rl,nl,ol,il,sl,al,ul,ll,Be,xo,So,Io,To,Co,Ao,ko,Eo,Po,zo,Ht=k(()=>{"use strict";M();q();ue();F();vo();Pe=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},Ju=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],qt=(e,t,r,o,n,s,i=!1,a=!1)=>{let u=[],l=r[0].dims,d=l.length,c=x.normalizeAxes(n,d),p=!a&&c.length===0;l.forEach((b,y)=>{p||c.indexOf(y)>=0?i&&u.push(1):u.push(b)});let h=u.length,m=x.size(u);return{name:e,shaderCache:t,getShaderSource:b=>{let y=[],g=S("_A",r[0].dataType,d),w=C("output",s,h),_=o(g,w,c),$=_[2];for(let v=0,I=0;v<d;v++)p||c.indexOf(v)>=0?(i&&I++,$=`for(var j${v}: u32 = 0; j${v} < ${l[v]}; j${v}++) {
                  ${_[2].includes("last_index")?`let last_index = j${v};`:""}
                  ${g.indicesSet("input_indices",v,`j${v}`)}
                  ${$}
                }`):(y.push(`${g.indicesSet("input_indices",v,w.indicesGet("output_indices",I))};`),I++);return`

        ${b.registerUniform("output_size","u32").declareVariables(g,w)}

        ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${g.type.indices};
          let output_indices = ${w.offsetToIndices("global_idx")};

          ${y.join(`
`)}
          ${_[0]}       // init ops for reduce max/min
          ${_[1]}
          ${$}
          ${_[3]}
          ${_.length===4?w.setByOffset("global_idx","value"):_.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:s}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...E(l,u)]})}},Or=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(o=>r.push(Number(o))),U({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},ze=(e,t,r,o)=>{let n=e.inputs,s=n.length===1?r:Or(n,r);e.compute(qt(t,{hint:s.cacheKey,inputDependencies:["rank"]},[n[0]],s.noopWithEmptyAxes&&s.axes.length===0?Ju:o,s.axes,n[0].dataType,s.keepDims,s.noopWithEmptyAxes),{inputs:[0]})},el=(e,t)=>{Pe(e.inputs),ze(e,"ReduceLogSum",t,(o,n)=>[`var value = ${n.type.storage}(0);`,"",`value += ${o.getByIndices("input_indices")};`,"value = log(value);"])},tl=(e,t)=>{Pe(e.inputs),ze(e,"ReduceL1",t,(o,n)=>[`var value = ${n.type.storage}(0);`,"",`value += abs(${o.getByIndices("input_indices")});`,""])},rl=(e,t)=>{Pe(e.inputs),ze(e,"ReduceL2",t,(o,n)=>[`var t = ${n.type.value}(0); var value = ${n.type.value}(0);`,"",`t = ${o.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},nl=(e,t)=>{Pe(e.inputs),ze(e,"ReduceLogSumExp",t,(o,n)=>[`var value = ${n.type.storage}(0);`,"",`value += exp(${o.getByIndices("input_indices")});`,"value = log(value);"])},ol=(e,t)=>{Pe(e.inputs),ze(e,"ReduceMax",t,(o,n,s)=>{let i=[];for(let a=0;a<o.rank;a++)(s.indexOf(a)>=0||s.length===0)&&i.push(o.indicesSet("input_indices",a,0));return[`${i.join(`
`)}`,`var value = ${o.getByIndices("input_indices")};`,`value = max(value, ${o.getByIndices("input_indices")});`,""]})},il=(e,t)=>{Pe(e.inputs),ze(e,"ReduceMean",t,(o,n,s)=>{let i=1;for(let a=0;a<o.rank;a++)(s.indexOf(a)>=0||s.length===0)&&(i*=e.inputs[0].dims[a]);return["var sum = f32(0);","",`sum += f32(${o.getByIndices("input_indices")});`,`let value = ${n.type.value}(sum / ${i});`]})},sl=(e,t)=>{Pe(e.inputs),ze(e,"ReduceMin",t,(o,n,s)=>{let i=[];for(let a=0;a<o.rank;a++)(s.indexOf(a)>=0||s.length===0)&&i.push(`input_indices[${a}] = 0;`);return[`${i.join(`
`)}`,`var value = ${o.getByIndices("input_indices")};`,`value = min(value, ${o.getByIndices("input_indices")});`,""]})},al=(e,t)=>{Pe(e.inputs),ze(e,"ReduceProd",t,(o,n)=>[`var value = ${n.type.storage}(1);`,"",`value *= ${o.getByIndices("input_indices")};`,""])},ul=(e,t)=>{Pe(e.inputs),ze(e,"ReduceSum",t,(o,n)=>[`var value = ${n.type.storage}(0);`,"",`value += ${o.getByIndices("input_indices")};`,""])},ll=(e,t)=>{Pe(e.inputs),ze(e,"ReduceSumSquare",t,(o,n)=>[`var t = ${n.type.value}(0); var value = ${n.type.value}(0);`,"",`t = ${o.getByIndices("input_indices")}; value += t * t;`,""])},Be=(e,t,r)=>{if(t.length===0)return r;let o=1,n=1;for(let s=0;s<t.length;s++)t.indexOf(s)===-1?o*=e[s]:n*=e[s];return n<32&&o>1024},xo=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?il(e,t):po(e,t)},So=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?tl(e,t):mo(e,t)},Io=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?rl(e,t):fo(e,t)},To=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?nl(e,t):ho(e,t)},Co=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ol(e,t):go(e,t)},Ao=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?sl(e,t):yo(e,t)},ko=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?al(e,t):bo(e,t)},Eo=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ul(e,t):wo(e,t)},Po=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ll(e,t):_o(e,t)},zo=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?el(e,t):$o(e,t)}});var Bo,Do,Oo,Rr,Ro=k(()=>{"use strict";M();ue();Ht();Bo=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Do=(e,t)=>{Bo(e.inputs);let r=(o,n,s)=>{let i=[];for(let a=0;a<o.rank;a++)(s.indexOf(a)>=0||s.length===0)&&i.push(`input_indices[${a}] = 0;`);return[`${i.join(`
`)}`,`var value = ${o.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${o.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${o.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(qt("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Oo=(e,t)=>{Bo(e.inputs);let r=(o,n,s)=>{let i=[];for(let a=0;a<o.rank;a++)(s.indexOf(a)>=0||s.length===0)&&i.push(`input_indices[${a}] = 0;`);return[`${i.join(`
`)}`,`var value = ${o.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${o.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${o.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(qt("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Rr=e=>U(e)});var dl,Mr,cl,pl,ml,Qe,fl,Mo,Ft=k(()=>{"use strict";M();q();Lt();F();dl=(e,t)=>{let r=e[0],o=e[1],n=e[2],s=e[3],i=e[4],a=e[5];if(i&&a)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=r.dims[0],l=r.dims[1],d=r.dims[2];if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(o.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(o.dims[0]!==d)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(n.dims[0]!==o.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let c=n.dims[0]/3,p=c,h=p;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let w of t.qkvHiddenSizes)if(w%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");c=t.qkvHiddenSizes[0],p=t.qkvHiddenSizes[1],h=t.qkvHiddenSizes[2]}let m=l;if(c!==p)throw new Error("qkv_hidden_sizes first element should be same as the second");if(n.dims[0]!==c+p+h)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let f=0;if(i){if(p!==h)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(i.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(i.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(i.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(i.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(i.dims[4]!==p/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(f=i.dims[3])}let b=m+f,y=-1,g=0;if(s)throw new Error("Mask not supported");if(i)throw new Error("past is not supported");if(a){if(a.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(a.dims[0]!==u||a.dims[1]!==t.numHeads||a.dims[2]!==l||a.dims[3]!==b)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:f,kvSequenceLength:m,totalSequenceLength:b,maxSequenceLength:y,inputHiddenSize:d,hiddenSize:c,vHiddenSize:h,headSize:Math.floor(c/t.numHeads),vHeadSize:Math.floor(h/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:g,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Mr=(e,t,r)=>t&&e?`
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
    `,cl=(e,t,r,o,n,s,i,a)=>{let u=re(i?1:s),l=64,d=s/u;d<l&&(l=32);let c=Math.ceil(s/u/l),p=[{type:12,data:t},{type:12,data:r},{type:12,data:o},{type:12,data:n},{type:12,data:d},{type:12,data:c}],h=J(e.dataType,u),m=ce(1,u),f=["type"];i&&f.push("type"),a&&f.push("type");let b=y=>{let g=C("x",e.dataType,e.dims,u),w=[g],_=i?S("seq_lens",i.dataType,i.dims):void 0;_&&w.push(_);let $=a?S("total_sequence_length_input",a.dataType,a.dims):void 0;$&&w.push($);let v=ce(e.dataType),I=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${y.registerUniforms(I).declareVariables(...w)}
  ${y.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Mr(_,$,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${l}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${i?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${m}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${m}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${l}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${m}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${m}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${l}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${g.type.value}(${v}(1.0) / ${v}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${m}(x[offset + i]);
        x[offset + i] = ${g.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${i?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${g.type.value}(${v}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${l};${h};${u}`,inputDependencies:f},getShaderSource:b,getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(s/l),y:n,z:t*r},programUniforms:p})}},pl=(e,t,r,o,n,s,i,a,u)=>{let l=i+s.kvSequenceLength,d=[s.batchSize,s.numHeads,s.sequenceLength,l],c=e>1&&o,p=s.kvNumHeads?s.kvNumHeads:s.numHeads,h=c?[s.batchSize,p,l,s.headSize]:void 0,m=s.nReps?s.nReps:1,f=s.scale===0?1/Math.sqrt(s.headSize):s.scale,b=re(s.headSize),y=s.headSize/b,g=12,w={x:Math.ceil(l/g),y:Math.ceil(s.sequenceLength/g),z:s.batchSize*s.numHeads},_=[{type:12,data:s.sequenceLength},{type:12,data:y},{type:12,data:l},{type:12,data:s.numHeads},{type:12,data:s.headSize},{type:1,data:f},{type:12,data:i},{type:12,data:s.kvSequenceLength},{type:12,data:m}],$=c&&o&&x.size(o.dims)>0,v=["type","type"];$&&v.push("type"),n&&v.push("type"),a&&v.push("type"),u&&v.push("type");let I=[{dims:d,dataType:t.dataType,gpuDataType:0}];c&&I.push({dims:h,dataType:t.dataType,gpuDataType:0});let T=A=>{let B=S("q",t.dataType,t.dims,b),O=S("key",r.dataType,r.dims,b),W=[B,O];if($){let V=S("past_key",o.dataType,o.dims,b);W.push(V)}n&&W.push(S("attention_bias",n.dataType,n.dims));let z=a?S("seq_lens",a.dataType,a.dims):void 0;z&&W.push(z);let N=u?S("total_sequence_length_input",u.dataType,u.dims):void 0;N&&W.push(N);let se=C("output",t.dataType,d),L=[se];c&&L.push(C("present_key",t.dataType,h,b));let Z=ce(1,b),K=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${g}u;

  var<workgroup> tileQ: array<${B.type.storage}, ${g*g}>;
  var<workgroup> tileK: array<${B.type.storage}, ${g*g}>;
  ${A.registerUniforms(K).declareVariables(...W,...L)}
  ${A.mainStart([g,g,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${m===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${m===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Mr(z,N,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${$&&c?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${c?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${Z}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${(()=>$&&c?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`)()}
      ${c?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${Z}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(b){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${b}`)}})()};
        output[outputIdx] = ${se.type.value} (sum * uniforms.alpha) + ${n?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${b};${n!==void 0};${o!==void 0};${e}`,inputDependencies:v},getRunData:()=>({outputs:I,dispatchGroup:w,programUniforms:_}),getShaderSource:T}},ml=(e,t,r,o,n,s,i=void 0,a=void 0)=>{let u=s+n.kvSequenceLength,l=n.nReps?n.nReps:1,d=n.vHiddenSize*l,c=e>1&&o,p=n.kvNumHeads?n.kvNumHeads:n.numHeads,h=c?[n.batchSize,p,u,n.headSize]:void 0,m=[n.batchSize,n.sequenceLength,d],f=12,b={x:Math.ceil(n.vHeadSize/f),y:Math.ceil(n.sequenceLength/f),z:n.batchSize*n.numHeads},y=[{type:12,data:n.sequenceLength},{type:12,data:u},{type:12,data:n.vHeadSize},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:12,data:d},{type:12,data:s},{type:12,data:n.kvSequenceLength},{type:12,data:l}],g=c&&o&&x.size(o.dims)>0,w=["type","type"];g&&w.push("type"),i&&w.push("type"),a&&w.push("type");let _=[{dims:m,dataType:t.dataType,gpuDataType:0}];c&&_.push({dims:h,dataType:t.dataType,gpuDataType:0});let $=v=>{let I=S("probs",t.dataType,t.dims),T=S("v",r.dataType,r.dims),A=[I,T];g&&A.push(S("past_value",o.dataType,o.dims));let B=i?S("seq_lens",i.dataType,i.dims):void 0;i&&A.push(B);let O=a?S("total_sequence_length_input",a.dataType,a.dims):void 0;a&&A.push(O);let z=[C("output",t.dataType,m)];c&&z.push(C("present_value",t.dataType,h));let N=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${f}u;
  var<workgroup> tileQ: array<${I.type.value}, ${f*f}>;
  var<workgroup> tileV: array<${I.type.value}, ${f*f}>;
  ${v.registerUniforms(N).declareVariables(...A,...z)}
  ${v.mainStart([f,f,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${l===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${l===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Mr(B,O,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${g&&c?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${c?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${I.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${(()=>g&&c?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`)()}
        ${c?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${o!==void 0};${e}`,inputDependencies:w},getRunData:()=>({outputs:_,dispatchGroup:b,programUniforms:y}),getShaderSource:$}},Qe=(e,t,r,o,n,s,i,a,u,l,d=void 0,c=void 0)=>{let p=Math.min(e.outputCount,1+(i?1:0)+(a?1:0)),h=p>1?l.pastSequenceLength:0,m=h+l.kvSequenceLength,f=u&&x.size(u.dims)>0?u:void 0,b=[t,r];p>1&&i&&x.size(i.dims)>0&&b.push(i),f&&b.push(f),d&&b.push(d),c&&b.push(c);let y=e.compute(pl(p,t,r,i,f,l,h,d,c),{inputs:b,outputs:p>1?[-1,1]:[-1]})[0];e.compute(cl(y,l.batchSize,l.numHeads,h,l.sequenceLength,m,d,c),{inputs:d&&c?[y,d,c]:[y],outputs:[]});let g=[y,o];p>1&&a&&x.size(a.dims)>0&&g.push(a),d&&g.push(d),c&&g.push(c),e.compute(ml(p,y,o,a,l,h,d,c),{inputs:g,outputs:p>1?[0,2]:[0]})},fl=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],o=t.sequenceLength,n=t.inputHiddenSize,s=t.headSize,i=12,a={x:Math.ceil(t.headSize/i),y:Math.ceil(t.sequenceLength/i),z:t.batchSize*t.numHeads},u=[e.inputs[0],e.inputs[1],e.inputs[2]],l=[{type:12,data:o},{type:12,data:n},{type:12,data:s},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],d=c=>{let p=C("output_q",u[0].dataType,r),h=C("output_k",u[0].dataType,r),m=C("output_v",u[0].dataType,r),f=S("input",u[0].dataType,u[0].dims),b=S("weight",u[1].dataType,u[1].dims),y=S("bias",u[2].dataType,u[2].dims),g=f.type.storage,w=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${i}u;
  var<workgroup> tileInput: array<${g}, ${i*i}>;
  var<workgroup> tileWeightQ: array<${g}, ${i*i}>;
  var<workgroup> tileWeightK: array<${g}, ${i*i}>;
  var<workgroup> tileWeightV: array<${g}, ${i*i}>;
  ${c.registerUniforms(w).declareVariables(f,b,y,p,h,m)}
  ${c.mainStart([i,i,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${g}(0);
    var valueK = ${g}(0);
    var valueV = ${g}(0);
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:a,programUniforms:l}),getShaderSource:d},{inputs:u,outputs:[-1,-1,-1]})},Mo=(e,t)=>{let r=dl(e.inputs,t),[o,n,s]=fl(e,r);return Qe(e,o,n,s,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}});var hl,gl,yl,Vo,Uo=k(()=>{"use strict";Se();M();q();ue();F();hl=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(o,n,s)=>{let i=n.length;if(i!==o.length)throw new Error(`${s}: num dimensions != ${i}`);n.forEach((a,u)=>{if(a!==o[u])throw new Error(`${s}: dim[${u}] do not match`)})};if(e[0].dims.length>1){let o=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,o,"Invalid input scale"),r(e[2].dims,o,"Invalid input B"),r(e[3].dims,o,"Invalid input mean"),r(e[4].dims,o,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},gl=(e,t)=>{let{epsilon:r,spatial:o,format:n}=t,s=e[0].dims,i=o?re(s[s.length-1]):1,a=n==="NHWC"&&s.length>1?i:1,u=x.size(s)/i,l=o,d=l?s.length:s,c=S("x",e[0].dataType,e[0].dims,i),p=S("scale",e[1].dataType,e[1].dims,a),h=S("bias",e[2].dataType,e[2].dims,a),m=S("inputMean",e[3].dataType,e[3].dims,a),f=S("inputVar",e[4].dataType,e[4].dims,a),b=C("y",e[0].dataType,d,i),y=()=>{let w="";if(o)w=`let cOffset = ${s.length===1?"0u":n==="NHWC"?`outputIndices[${s.length-1}] / ${i}`:"outputIndices[1]"};`;else if(n==="NCHW")w=`
            ${b.indicesSet("outputIndices","0","0")}
            let cOffset = ${b.indicesToOffset("outputIndices")};`;else{w=`var cIndices = ${p.type.indices}(0);
                       cIndices[0] = outputIndices[${s.length-1}];`;for(let _=1;_<p.rank;_++)w+=`cIndices[${_}] = outputIndices[${_}];`;w+=`let cOffset = ${p.indicesToOffset("cIndices")};`}return w},g=w=>`
  const epsilon = ${r};
  ${w.registerUniform("outputSize","u32").declareVariables(c,p,h,m,f,b)}
  ${w.mainStart()}
  ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${b.offsetToIndices(`global_idx * ${i}`)};
    ${y()}
    let scale = ${p.getByOffset("cOffset")};
    let bias = ${h.getByOffset("cOffset")};
    let inputMean = ${m.getByOffset("cOffset")};
    let inputVar = ${f.getByOffset("cOffset")};
    let x = ${c.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${b.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${o}_${i}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:g,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l?[{type:12,data:u},...E(s)]:[{type:12,data:u}]})}},yl=e=>U(e),Vo=(e,t)=>{let{inputs:r,outputCount:o}=e,n=yl({...t,outputCount:o});if(te.webgpu.validateInputContent&&hl(r,n),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(gl(r,n))}});var bl,wl,No,Lo=k(()=>{"use strict";q();F();bl=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},wl=e=>{let t=e[0].dims,r=e[0].dims[2],o=x.size(t)/4,n=e[0].dataType,s=S("input",n,t,4),i=S("bias",n,[r],4),a=S("residual",n,t,4),u=C("output",n,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)}}),getShaderSource:d=>`
  const channels = ${r}u / 4;
  ${d.declareVariables(s,i,a,u)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(o)}
    let value = ${s.getByOffset("global_idx")}
      + ${i.getByOffset("global_idx % channels")} + ${a.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},No=e=>{bl(e.inputs),e.compute(wl(e.inputs))}});var _l,ee,Wo,Go,Ho,qo,Fo,Ko,jo,Zo,Xo,$l,Qo,Yo,Jo,ei,at,ti,Kt,ri,ni,oi,ii,si,ai,ui,li,di,ci,pi,mi,fi,hi,gi,yi,bi,wi,Vr,Ur,_i,$i,vi,vl,xl,xi,jt=k(()=>{"use strict";M();q();ue();F();_l=(e,t,r,o,n,s,i)=>{let a=Math.ceil(t/4),u="";typeof n=="string"?u=`${n}(a)`:u=n("a");let l=S("inputData",r,[a],4),d=C("outputData",o,[a],4),c=[{name:"vec_size",type:"u32"}];return i&&c.push(...i),`
      ${e.registerUniforms(c).declareVariables(l,d)}

  ${s??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${d.setByOffset("global_idx",u)}
  }`},ee=(e,t,r,o,n,s=e.dataType,i,a)=>{let u=[{type:12,data:Math.ceil(x.size(e.dims)/4)}];return i&&u.push(...i),{name:t,shaderCache:{hint:n,inputDependencies:["type"]},getShaderSource:l=>_l(l,x.size(e.dims),e.dataType,s,r,o,a),getRunData:l=>({outputs:[{dims:e.dims,dataType:s}],dispatchGroup:{x:Math.ceil(x.size(l[0].dims)/64/4)},programUniforms:u})}},Wo=e=>{e.compute(ee(e.inputs[0],"Abs","abs"))},Go=e=>{e.compute(ee(e.inputs[0],"Acos","acos"))},Ho=e=>{e.compute(ee(e.inputs[0],"Acosh","acosh"))},qo=e=>{e.compute(ee(e.inputs[0],"Asin","asin"))},Fo=e=>{e.compute(ee(e.inputs[0],"Asinh","asinh"))},Ko=e=>{e.compute(ee(e.inputs[0],"Atan","atan"))},jo=e=>{e.compute(ee(e.inputs[0],"Atanh","atanh"))},Zo=e=>U(e),Xo=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ee(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},$l=e=>{let t,r,o=e.length>=2&&e[1].data!==0,n=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=o?e[1].getFloat32Array()[0]:-34028234663852886e22,r=n?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=o?e[1].getUint16Array()[0]:64511,r=n?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return U({min:t,max:r})},Qo=(e,t)=>{let r=t||$l(e.inputs),o=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"Clip",n=>`clamp(${n}, vec4<${o}>(uniforms.min), vec4<${o}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:o},{name:"max",type:o}]),{inputs:[0]})},Yo=e=>{e.compute(ee(e.inputs[0],"Ceil","ceil"))},Jo=e=>{e.compute(ee(e.inputs[0],"Cos","cos"))},ei=e=>{e.compute(ee(e.inputs[0],"Cosh","cosh"))},at=e=>U(e),ti=(e,t)=>{let r=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"Elu",o=>`elu_vf32(${o})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Kt=(e="f32")=>`
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
}`,ri=e=>{let t=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Kt(t)))},ni=e=>{e.compute(ee(e.inputs[0],"Exp","exp"))},oi=e=>{e.compute(ee(e.inputs[0],"Floor","floor"))},ii=e=>{let t=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Kt(t)))},si=(e,t)=>{let r=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"LeakyRelu",o=>`select(leaky_relu_alpha_ * ${o}, ${o}, ${o} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},ai=e=>{e.compute(ee(e.inputs[0],"Not",t=>`!${t}`))},ui=e=>{e.compute(ee(e.inputs[0],"Neg",t=>`-${t}`))},li=e=>{e.compute(ee(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},di=e=>{let t=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},ci=e=>{e.compute(ee(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},pi=e=>U(e),mi=(e,t)=>{let r=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"HardSigmoid",o=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${o} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},fi=e=>{e.compute(ee(e.inputs[0],"Sin","sin"))},hi=e=>{e.compute(ee(e.inputs[0],"Sinh","sinh"))},gi=e=>{e.compute(ee(e.inputs[0],"Sqrt","sqrt"))},yi=e=>{e.compute(ee(e.inputs[0],"Tan","tan"))},bi=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,wi=e=>{e.compute(ee(e.inputs[0],"Tanh",bi))},Vr=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${bi("v")};
}
`,Ur=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,_i=e=>{let t=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"FastGelu",Ur,Vr(t),void 0,e.inputs[0].dataType))},$i=(e,t)=>{let r=ce(e.inputs[0].dataType);return e.compute(ee(e.inputs[0],"ThresholdedRelu",o=>`select(vec4<${r}>(0.0), ${o}, ${o} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},vi=e=>{e.compute(ee(e.inputs[0],"Log","log"))},vl=(e,t)=>`
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
`,xl=e=>`quick_gelu_impl(${e})`,xi=(e,t)=>{let r=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"QuickGelu",xl,vl(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}});var Sl,Il,Ii,Ti=k(()=>{"use strict";q();F();jt();Sl=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Il=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=S("input",e[0].dataType,e[0].dims,4),o=S("bias",e[0].dataType,[e[0].dims[2]],4),n=C("output",e[0].dataType,t,4),s=x.size(t)/4,i=J(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${u.declareVariables(r,o,n)}

  ${Kt(i)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(s)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${n.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Ii=e=>{Sl(e.inputs),e.compute(Il(e.inputs))}});var Tl,Cl,De,Ci,Ai,ki,Ei,Pi,zi,Bi,Di,Oi,Ri,Mi=k(()=>{"use strict";M();q();F();Tl=(e,t,r,o,n,s,i,a,u,l,d,c)=>{let p,h;typeof a=="string"?p=h=(g,w)=>`${a}((${g}),(${w}))`:typeof a=="function"?p=h=a:(p=a.scalar,h=a.vector);let m=C("outputData",d,o.length,4),f=S("aData",u,t.length,4),b=S("bData",l,r.length,4),y;if(n)if(s){let g=x.size(t)===1,w=x.size(r)===1,_=t.length>0&&t[t.length-1]%4===0,$=r.length>0&&r[r.length-1]%4===0;g||w?y=m.setByOffset("global_idx",h(g?`${f.type.value}(${f.getByOffset("0")}.x)`:f.getByOffset("global_idx"),w?`${b.type.value}(${b.getByOffset("0")}.x)`:b.getByOffset("global_idx"))):y=`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${f.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${b.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",h(i||_?f.getByOffset("offsetA / 4u"):`${f.type.value}(${f.getByOffset("offsetA / 4u")}[offsetA % 4u])`,i||$?b.getByOffset("offsetB / 4u"):`${b.type.value}(${b.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else y=m.setByOffset("global_idx",h(f.getByOffset("global_idx"),b.getByOffset("global_idx")));else{if(!s)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let g=(w,_,$="")=>{let v=`aData[indexA${_}][componentA${_}]`,I=`bData[indexB${_}][componentB${_}]`;return`
            let outputIndices${_} = ${m.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offsetA${_} = ${f.broadcastedIndicesToOffset(`outputIndices${_}`,m)};
            let offsetB${_} = ${b.broadcastedIndicesToOffset(`outputIndices${_}`,m)};
            let indexA${_} = offsetA${_} / 4u;
            let indexB${_} = offsetB${_} / 4u;
            let componentA${_} = offsetA${_} % 4u;
            let componentB${_} = offsetB${_} % 4u;
            ${w}[${_}] = ${$}(${p(v,I)});
          `};d===9?y=`
            var data = vec4<u32>(0);
            ${g("data",0,"u32")}
            ${g("data",1,"u32")}
            ${g("data",2,"u32")}
            ${g("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:y=`
            ${g("outputData[global_idx]",0)}
            ${g("outputData[global_idx]",1)}
            ${g("outputData[global_idx]",2)}
            ${g("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(f,b,m)}

        ${c??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${y}
      }`},Cl=(e,t,r,o,n,s,i=r.dataType)=>{let a=r.dims.map(f=>Number(f)??1),u=o.dims.map(f=>Number(f)??1),l=!x.areEqual(a,u),d=a,c=x.size(a),p=!1,h=!1,m=[l];if(l){let f=ke.calcShape(a,u,!1);if(!f)throw new Error("Can't perform binary op on the given tensors");d=f.slice(),c=x.size(d);let b=x.size(a)===1,y=x.size(u)===1,g=a.length>0&&a[a.length-1]%4===0,w=u.length>0&&u[u.length-1]%4===0;m.push(b),m.push(y),m.push(g),m.push(w);let _=1;for(let $=1;$<d.length;$++){let v=a[a.length-$],I=u[u.length-$];if(v===I)_*=v;else break}_%4===0?(h=!0,p=!0):(b||y||g||w)&&(p=!0)}else p=!0;return m.push(p),{name:e,shaderCache:{hint:t+m.map(f=>f.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:f=>Tl(f,a,u,d,p,l,h,n,r.dataType,o.dataType,i,s),getRunData:()=>({outputs:[{dims:d,dataType:i}],dispatchGroup:{x:Math.ceil(c/64/4)},programUniforms:[{type:12,data:Math.ceil(x.size(d)/4)},...E(a,u,d)]})}},De=(e,t,r,o,n,s)=>{e.compute(Cl(t,n??"",e.inputs[0],e.inputs[1],r,o,s))},Ci=e=>{De(e,"Add",(t,r)=>`${t}+${r}`)},Ai=e=>{De(e,"Div",(t,r)=>`${t}/${r}`)},ki=e=>{De(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},Ei=e=>{De(e,"Mul",(t,r)=>`${t}*${r}`)},Pi=e=>{let t=S("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;De(e,"Pow",{scalar:(o,n)=>`pow_custom(${o},${n})`,vector:(o,n)=>`pow_vector_custom(${o},${n})`},`
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
      `)},zi=e=>{De(e,"Sub",(t,r)=>`${t}-${r}`)},Bi=e=>{De(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Di=e=>{De(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Oi=e=>{De(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Ri=e=>{De(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}});var kl,El,Pl,zl,Vi,Ui,Ni=k(()=>{"use strict";M();q();ue();F();kl=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,o=e[r],n=o.dataType,s=o.dims.length;e.forEach((i,a)=>{if(a!==r){if(i.dataType!==n)throw new Error("input tensors should be one type");if(i.dims.length!==s)throw new Error("input tensors should have the same shape");i.dims.forEach((u,l)=>{if(l!==t&&u!==o.dims[l])throw new Error("non concat dimensions must match")})}})},El=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Pl=(e,t)=>{let r=e.length,o=[];for(let n=0;n<r;++n){let s=t.setByOffset("global_idx",e[n].getByIndices("indices"));r===1?o.push(s):n===0?o.push(`if (inputIndex == ${n}u) { ${s} }`):n===r-1?o.push(`else { ${s} }`):o.push(`else if (inputIndex == ${n}) { ${s} }`)}return o.join(`
`)},zl=(e,t,r,o)=>{let n=x.size(r),s=new Array(e.length),i=new Array(e.length),a=0,u=[],l=[],d=[{type:12,data:n}];for(let f=0;f<e.length;++f)a+=e[f].dims[t],s[f]=a,l.push(e[f].dims.length),i[f]=S(`input${f}`,o,l[f]),u.push("rank"),d.push({type:12,data:s[f]});for(let f=0;f<e.length;++f)d.push(...E(e[f].dims));d.push(...E(r));let c=C("output",o,r.length),p=c.indicesGet("indices",t),h=Array.from(Array(s.length).keys()).map(f=>`uniforms.sizeInConcatAxis${f}`).join(","),m=f=>`

  ${(()=>{f.registerUniform("outputSize","u32");for(let b=0;b<e.length;b++)f.registerUniform(`sizeInConcatAxis${b}`,"u32");return f.declareVariables(...i,c)})()}

  ${El(s.length,h)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${c.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${p});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${s.length}u>(${h});
      ${p} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Pl(i,c)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:o}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:d}),getShaderSource:m}},Vi=(e,t)=>{let r=e.inputs,o=r[0].dims,n=x.normalizeAxis(t.axis,o.length);kl(r,n);let s=o.slice();s[n]=r.reduce((a,u)=>a+(u.dims.length>n?u.dims[n]:0),0);let i=r.filter(a=>x.size(a.dims)>0);e.compute(zl(i,n,s,r[0].dataType),{inputs:i})},Ui=e=>U({axis:e.axis})});var $e,ve,xe,Zt,Re=k(()=>{"use strict";M();q();$e=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},ve=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},xe=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Zt=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,o]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:o}}else if(t==="Clip"){let[r,o]=e?.activation_params||[io,so];return{activation:t,clipMax:o,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}});var me,Xt,ut=k(()=>{"use strict";me=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Xt=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Qt,Nr=k(()=>{"use strict";Qt=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var Bl,Dl,lt,Li,Ol,dt,Rl,ct,pt=k(()=>{"use strict";M();q();F();Re();ut();Bl=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Dl=(e,t)=>e?`
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
        }`,lt=(e,t,r="f32",o,n=!1,s=32,i=!1,a=32)=>{let u=t[1]*e[1],l=t[0]*e[0],d=n?u:s,c=n?s:u,p=d/t[0],h=s/t[1];if(!((n&&p===4&&e[1]===4||!n&&(p===3||p===4))&&d%t[0]===0&&s%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${n} is true, innerElementSize ${p} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${p} must be 3 or 4.
  tileAWidth ${d} must be divisible by workgroupSize[0]${t[0]}. tileInner ${s} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${p}<${r}>, ${d/p}>, ${c}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${l/e[0]}>, ${s}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${p};
const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${i?"0":"i32(globalId.z)"};
  ${o?`let batchIndices = ${o.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${i?`${Math.ceil(a/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${i?`i32(globalId.z) * ${a}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${h};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Bl(n,o)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${o?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${p===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Dl(n,p)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Li=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Ol=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",dt=(e,t,r="f32",o,n=!1,s=32,i=!1,a=32,u=!1)=>{let l=e[1]*t[1],d=e[0]*t[0],c=n?l:s,p=n?s:l;if(!(p%t[1]===0&&c%t[0]===0&&s%t[1]===0))throw new Error(`tileAHight ${p} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}, tileInner ${s} must be divisible by workgroupSize[1]${t[1]}`);let h=p/t[1],m=c/t[0],f=s/t[1],b=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${d};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${p}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          ${Li(n,o)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${s}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${d}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${o?", batchIndices":""});
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
          let ACached = ${n?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
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
let globalRowStart = i32(workgroupId.y) * ${l};

let tileRowA = i32(localId.y) * ${h};
let tileColA = i32(localId.x) * ${m};
let tileRowB = i32(localId.y) * ${f};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${m}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Li(n,o)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${o?", batchIndices":""});
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
      ${Ol(n)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${c}>, ${p}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${d}>, ${s}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${i?"0":"i32(globalId.z)"};
    ${o?`let batchIndices = ${o.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${i?`${Math.ceil(a/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${i?`i32(globalId.z) * ${a}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${b}
  }
`},Rl=(e,t,r,o,n,s=!1)=>{let[i,a,u]=n,[l,d,c,p]=o,h=Xe(i,u),m=Xe(a,u),f=J(o[0].type.tensor),b=()=>{let w=d.rank,_=l.rank,$=`var aIndices: ${d.type.indices};`;for(let v=w-2-1,I=_-1;v>=0;v--,I--)$+=`
aIndices[${v}] = ${_>1?`batchIndices[${I}]`:"batchIndices"};`;return h.forEach(v=>{$+=`
aIndices[${v}] = 0;`}),$+=`
aIndices[${w-2}] = u32(row);
                   aIndices[${w-1}] = u32(colIn);`,$},y=()=>{let w=c.rank,_=l.rank,$=`var bIndices: ${c.type.indices};`;for(let v=w-2-1,I=_-1;v>=0;v--,I--)$+=`
bIndices[${v}] = ${_>1?`batchIndices[${I}]`:"batchIndices"};`;return m.forEach(v=>{$+=`
bIndices[${v}] = 0;`}),$+=`
bIndices[${w-2}] = u32(row);
                   bIndices[${w-1}] = u32(colIn);`,$};return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${l.type.indices}) -> ${me(e,f)} {
      var value = ${me(e,f)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        ${b()}
        value = ${d.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${l.type.indices}) -> ${me(e,f)} {
      var value = ${me(e,f)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        ${y()}
        value = ${c.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${me(e,f)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${s?"bias[colIn]":`${me(e,f)}(bias[row])`};`:""}
        ${r}
        ${p.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},ct=(e,t,r,o,n=!1,s)=>{let i=e[0].dims,a=e[1].dims,u=i.slice(0,-2),l=a.slice(0,-2),d=o?o.slice(0,-2):r.slice(0,-2),c=x.size(d),p=i[i.length-2],h=i[i.length-1],m=a[a.length-1],f=h%4===0&&m%4===0,b=p<=8?[4,1,1]:[4,4,1],y=[8,8,1],g=[Math.ceil(m/y[0]/b[0]),Math.ceil(p/y[1]/b[1]),Math.ceil(c/y[2]/b[2])],w=f?4:1,_=[...u,p,h/w],$=_.length,v=[...l,h,m/w],I=v.length,T=[c,p,m/w],A=[{type:6,data:p},{type:6,data:m},{type:6,data:h}];ve(t,A),A.push(...E(d,_,v));let B=["rank","rank"],O=e.length>2;O&&(A.push(...E(e[2].dims)),B.push("rank")),A.push(...E(T));let W=z=>{let N=d.length,se=Gt("batchDims",e[0].dataType,N,1),L=J(e[0].dataType),Z=S("a",e[0].dataType,$,w),K=S("b",e[1].dataType,I,w),V=C("result",e[0].dataType,T.length,w),ne=[Z,K];if(O){let R=n?w:1;ne.push(S("bias",e[2].dataType,e[2].dims.length,R))}let oe=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];xe(t,oe);let Q=J(V.type.tensor),H=$e(t,V.type.value,Q),P=Rl(w,O,H,[se,Z,K,V],[u,l,d],n);return`
  ${z.registerUniforms(oe).registerInternalVariables(se).declareVariables(...ne,V)}
  ${P}
  ${f?lt(b,y,L,se):dt(b,y,L,se)}
                   `};return{name:"MatMul",shaderCache:{hint:`${b};${t.activation};${f};${n}`,inputDependencies:B},getRunData:()=>({outputs:[{dims:s?s(r):r,dataType:e[0].dataType}],dispatchGroup:{x:g[0],y:g[1],z:g[2]},programUniforms:A}),getShaderSource:W}}});var Ml,Wi,Gi=k(()=>{"use strict";M();Ce();F();Re();ut();Nr();pt();Ml=(e,t,r,o,n=!1,s,i=4,a=4,u=4,l="f32")=>{let d=B=>{switch(B){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${B} is not supported.`)}},c=B=>{switch(B){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${B} is not supported.`)}},p=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,h=e?`
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
    `,m=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",f=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",b=e?"row":"col",y=e?"col":"row",g=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${b} / outWidth;
    let outCol = ${b} % outWidth;

    let WRow = ${y} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${y} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${y} % inChannels;
    var resData = ${me(i,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${m} && xCol >= 0 && xCol < ${f}) {
      ${p}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${d(i)}
    }
    return resData;`,w=e?t&&o?`
    let col = colIn * ${i};
    ${g}`:`
    let col = colIn * ${i};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${g}
    }
    return ${me(i,l)}(0.0);`:o&&r?`
    let col = colIn * ${i};
    ${g}`:`
    let col = colIn * ${i};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${g}
    }
    return ${me(i,l)}(0.0);`,_=`${c(a)}`,$=me(u,l),v=e?me(i,l):me(a,l),I=e?me(a,l):me(i,l),T=$e(s,$,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${v} {
      ${e?w:_}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${I} {
      ${e?_:w}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${$}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${h}
      ${Xt(n)}
      ${T}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Wi=(e,t,r,o,n,s,i,a,u)=>{let l=t.format==="NHWC",d=l?e[0].dims[3]:e[0].dims[1],c=r[0],p=l?r[2]:r[3],h=l?r[1]:r[2],m=l?r[3]:r[1],f=l&&(d%4===0||d%3===0)&&m%4===0,b=l?m:p*h,y=l?p*h:m,g=[8,8,1],w=o<=8?[4,1,1]:[4,4,1],_=[Math.ceil(b/g[0]/w[0]),Math.ceil(y/g[1]/w[1]),Math.ceil(c/g[2]/w[2])];j("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${_}`);let $=f?l&&d%4!==0?3:4:1,v=g[1]*w[1],I=g[0]*w[0],T=Math.max(g[0]*$,g[1]),A=o%v===0,B=n%I===0,O=s%T===0,W=f?[$,4,4]:[1,1,1],z=[{type:6,data:o},{type:6,data:n},{type:6,data:s},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];ve(t,z),z.push(...E(e[0].dims,e[1].dims));let N=["rank","rank"];i&&(z.push(...E(e[2].dims)),N.push("rank")),z.push(...E(r));let se=L=>{let Z=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];xe(t,Z);let K=f?4:1,V=J(e[0].dataType),ne=`
      fn setOutputAtIndex(flatIndex : i32, value : ${f?`vec4<${V}>`:V}) {
        result[flatIndex] = ${f?`vec4<${V}>`:V}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${f?`vec4<${V}>`:V}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${f?"/ 4":""}, value);
      }`,oe=S("x",e[0].dataType,e[0].dims.length,$===3?1:$),Q=S("w",e[1].dataType,e[1].dims.length,K),H=[oe,Q],P=C("result",e[0].dataType,r.length,K);if(i){let R=S("bias",e[2].dataType,e[2].dims.length,K);H.push(R),ne+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${f?`vec4<${V}>`:V} {
          return bias[coords.${l?"w":"y"}${f?"/ 4":""}];
        }`}return`
        ${Qt("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${L.registerUniforms(Z).declareVariables(...H,P)}
        ${ne}
        ${Ml(l,A,B,O,i,t,W[0],W[1],W[2],V)}
        ${f?lt(w,g,V,void 0,!l,T):dt(w,g,V,void 0,!l,T,!1,void 0,a)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${$};${f};${A};${B};${O};${v};${I};${T}`,inputDependencies:N},getRunData:()=>({outputs:[{dims:u?u(r):r,dataType:e[0].dataType}],dispatchGroup:{x:_[0],y:_[1],z:_[2]},programUniforms:z}),getShaderSource:se}}});var Vl,Hi,Yt,Ul,qi,Nl,Fi,Ki,ji=k(()=>{"use strict";M();Ce();q();F();Re();ut();Vl=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Hi=e=>typeof e=="number"?[e,e,e]:e,Yt=(e,t)=>t<=1?e:e+(e-1)*(t-1),Ul=(e,t,r,o=1)=>{let n=Yt(t,o);return Math.floor((e[0]*(r-1)-r+n)/2)},qi=(e,t,r,o,n)=>{n==null&&(n=Ul(e,t[0],o[0]));let s=[0,0,0,r];for(let i=0;i<3;i++)e[i]+2*n>=t[i]&&(s[i]=Math.trunc((e[i]-t[i]+2*n)/o[i]+1));return s},Nl=(e,t,r,o,n,s,i,a,u,l)=>{let d,c,p,h;if(e==="VALID"&&(e=0),typeof e=="number"){d={top:e,bottom:e,left:e,right:e,front:e,back:e};let m=qi([t,r,o,1],[a,u,l],1,[n,s,i],e);c=m[0],p=m[1],h=m[2]}else if(Array.isArray(e)){if(!e.every((f,b,y)=>f===y[0]))throw Error(`Unsupported padding parameter: ${e}`);d={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let m=qi([t,r,o,1],[a,u,l],1,[n,s,i],e[0]);c=m[0],p=m[1],h=m[2]}else if(e==="SAME_UPPER"){c=Math.ceil(t/n),p=Math.ceil(r/s),h=Math.ceil(o/i);let m=(c-1)*n+a-t,f=(p-1)*s+u-r,b=(h-1)*i+l-o,y=Math.floor(m/2),g=m-y,w=Math.floor(f/2),_=f-w,$=Math.floor(b/2),v=b-$;d={top:w,bottom:_,left:$,right:v,front:y,back:g}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:d,outDepth:c,outHeight:p,outWidth:h}},Fi=(e,t,r,o,n,s=!1,i="channelsLast")=>{let a,u,l,d,c;if(i==="channelsLast")[a,u,l,d,c]=e;else if(i==="channelsFirst")[a,c,u,l,d]=e;else throw new Error(`Unknown dataFormat ${i}`);let[p,,h,m,f]=t,[b,y,g]=Hi(r),[w,_,$]=Hi(o),v=Yt(h,w),I=Yt(m,_),T=Yt(f,$),{padInfo:A,outDepth:B,outHeight:O,outWidth:W}=Nl(n,u,l,d,b,y,g,v,I,T),z=s?p*c:p,N=[0,0,0,0,0];return i==="channelsFirst"?N=[a,z,B,O,W]:i==="channelsLast"&&(N=[a,B,O,W,z]),{batchSize:a,dataFormat:i,inDepth:u,inHeight:l,inWidth:d,inChannels:c,outDepth:B,outHeight:O,outWidth:W,outChannels:z,padInfo:A,strideDepth:b,strideHeight:y,strideWidth:g,filterDepth:h,filterHeight:m,filterWidth:f,effectiveFilterDepth:v,effectiveFilterHeight:I,effectiveFilterWidth:T,dilationDepth:w,dilationHeight:_,dilationWidth:$,inShape:e,outShape:N,filterShape:t}},Ki=(e,t,r,o,n,s)=>{let i=s==="channelsLast",a=i?e[0].dims[3]:e[0].dims[1],u=!1,l=[64,1,1],d={x:r.map((g,w)=>w)},c=[Math.ceil(Vl(d.x.map(g=>r[g]))/l[0]),1,1];j("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${c}`);let p=u?i&&a%4!==0?3:4:1,h=x.size(r),m=[{type:12,data:h},{type:12,data:o},{type:12,data:n},{type:12,data:t.strides},{type:12,data:t.dilations}];ve(t,m),m.push(...E(e[0].dims,e[1].dims));let f=["rank","rank"],b=e.length===3;b&&(m.push(...E(e[2].dims)),f.push("rank")),m.push(...E(r));let y=g=>{let w=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:o.length},{name:"pads",type:"u32",length:n.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];xe(t,w);let _=u?4:1,$=J(e[0].dataType),v=S("x",e[0].dataType,e[0].dims.length,p===3?1:p),I=S("W",e[1].dataType,e[1].dims.length,_),T=[v,I],A=C("result",e[0].dataType,r.length,_),B="";if(b){let z=S("bias",e[2].dataType,e[2].dims.length,_);T.push(z),B+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${$}>`:$} {
          return bias[${i?D("coords",4,5):D("coords",1,5)}${u?"/ 4":""}];
        }`}let O=me(p,$),W=$e(t,O,$);return`
            ${B}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${v.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
          ${g.registerUniforms(w).declareVariables(...T,A)}
          ${g.mainStart()}
          ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${A.offsetToIndices("global_idx")};
              let batch = ${D("coords",0,v.rank)};
              let d2 = ${i?D("coords",v.rank-1,v.rank):D("coords",1,v.rank)};
              let xFRCCorner = vec3<u32>(${i?D("coords",1,v.rank):D("coords",2,v.rank)},
              ${i?D("coords",2,v.rank):D("coords",3,v.rank)},
              ${i?D("coords",3,v.rank):D("coords",4,v.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${i?D("uniforms.x_shape",1,v.rank):D("uniforms.x_shape",2,v.rank)};
              let xShapeZ = ${i?D("uniforms.x_shape",2,v.rank):D("uniforms.x_shape",3,v.rank)};
              let xShapeW = ${i?D("uniforms.x_shape",3,v.rank):D("uniforms.x_shape",4,v.rank)};
              let xShapeU = ${i?D("uniforms.x_shape",4,v.rank):D("uniforms.x_shape",1,v.rank)};
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
                      ${i?`let xValues = vec4<f32>(
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
                        ${i?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${i?`let xValues = vec2<f32>(
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
                      ${i?`let xValues = vec3<f32>(
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
              ${b?"value = value + getBiasByOutputCoords(coords)":""};
              ${W}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${i};${p};${b}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:c[0],y:c[1],z:c[2]},programUniforms:m}),getShaderSource:y}}});var Zi,Xi,Qi=k(()=>{"use strict";M();q();F();Re();Zi=(e,t,r,o)=>{let n=e.length>2,s=n?"value += b[output_channel];":"",i=e[0].dims,a=e[1].dims,u=t.format==="NHWC",l=u?r[3]:r[1],d=l/t.group,c=u&&d>=4?re(l):1,p=x.size(r)/c,h=[{type:12,data:p},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:d}];ve(t,h),h.push(...E(i,[a[0],a[1],a[2],a[3]/c]));let m=n?["rank","rank","rank"]:["rank","rank"];h.push(...E([r[0],r[1],r[2],r[3]/c]));let f=b=>{let y=C("output",e[0].dataType,r.length,c),g=J(y.type.tensor),w=$e(t,y.type.value,g),_=S("x",e[0].dataType,i.length),$=S("w",e[1].dataType,a.length,c),v=[_,$];n&&v.push(S("b",e[2].dataType,e[2].dims,c));let I=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];xe(t,I);let T=u?`
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
            let xVal = ${_.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${$.get("wHeight","wWidth","wInChannel","output_channel")};
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

            let xVal = ${_.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${$.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${b.registerUniforms(I).declareVariables(...v,y)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${y.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${c} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${y.type.value} = ${y.type.value}(0);
    ${T}
    ${s}
    ${w}
    ${y.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${c}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o?o(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:h}),getShaderSource:f}},Xi=(e,t,r,o)=>{let n=e.length>2,s=re(r[3]),i=re(r[2]),a=x.size(r)/s/i,u=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/s],l=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/s],d=[r[0],r[1],r[2],r[3]/s],c=[{type:12,data:a},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];ve(t,c),c.push(...E(u,l,d));let p=(i-1)*t.strides[1]+l[1],h=m=>{let f=C("output",e[0].dataType,d.length,s),b=J(f.type.tensor),y=$e(t,f.type.value,b),g=S("x",e[0].dataType,u.length,s),w=S("w",e[1].dataType,l.length,s),_=[g,w];n&&_.push(S("b",e[2].dataType,e[2].dims,s));let $=n?"value += b[output_channel];":"",v=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return xe(t,v),`
  ${m.registerUniforms(v).declareVariables(..._,f)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${i}u;
    let col = (index1 % width1) * ${i}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${g.type.value}, ${p}>;
    var values: array<${f.type.value}, ${i}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${p}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${g.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${g.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${w.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${i}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${i}u; i++) {
      var value = values[i];
      ${$}
      ${y}
      ${f.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${s};${i};${p};${l[0]};${l[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:o?o(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}),getShaderSource:h}}});var Lr,Ll,Yi,Wr=k(()=>{"use strict";M();q();pt();F();Re();Lr=(e,t,r,o,n=!1,s)=>{let i=e[0].dims,a=e[1].dims,u=i[i.length-2],l=a[a.length-1],d=i[i.length-1],c=re(l),p=re(d),h=re(u),m=x.size(r)/c/h,f=e.length>2,b=o?o.slice(0,-2):r.slice(0,-2),g=[x.size(b),u,l],w=[{type:12,data:m},{type:12,data:u},{type:12,data:l},{type:12,data:d}];ve(t,w),w.push(...E(b,i,a)),f&&w.push(...E(e[2].dims)),w.push(...E(g));let _=$=>{let v=Gt("batch_dims",e[0].dataType,b.length),I=S("a",e[0].dataType,i.length,p),T=S("b",e[1].dataType,a.length,c),A=C("output",e[0].dataType,g.length,c),B=J(A.type.tensor),O=$e(t,A.type.value,B),W=[I,T],z="";if(f){let oe=n?c:1;W.push(S("bias",e[2].dataType,e[2].dims.length,oe)),z=`${n?`value += bias[col / ${oe}];`:`value += ${A.type.value}(bias[row + i]);`}`}let N=i.slice(0,-2),se=a.slice(0,-2),L=Xe(N,b),Z=Xe(se,b),K=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];xe(t,K);let V=(oe,Q)=>{let H=oe.rank,P=oe.name;if(H===2)return`var ${P}_indices = ${oe.type.indices}(0u, 0u);`;let R=v.rank,Y=`var ${P}_indices: ${oe.type.indices};`;for(let ge=H-2-1,ie=R-1;ge>=0;ge--,ie--)Y+=`
${P}_indices[${ge}] = ${R>1?`batch_indices[${ie}]`:"batch_indices"};`;return Q.forEach(ge=>{Y+=`
${P}_indices[${ge}] = 0;`}),Y+=`${P}_indices[${H-2}] = 0u;
                     ${P}_indices[${H-1}] = 0u;`,Y},ne=()=>{let oe=`var a_data: ${I.type.value};`;for(let Q=0;Q<p;Q++)oe+=`
              let b_data${Q} = b[(b_offset + (k + ${Q}) * uniforms.N + col) / ${c}];`;for(let Q=0;Q<h;Q++){oe+=`a_data = a[(a_offset + (row + ${Q}) * uniforms.K + k) / ${p}];`;for(let H=0;H<p;H++)oe+=`
            values[${Q}] = fma(${T.type.value}(a_data${p===1?"":`[${H}]`}), b_data${H}, values[${Q}]);
`}return oe};return`
  ${$.registerUniforms(K).registerInternalVariables(v).declareVariables(...W,A)}
  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${c})) * ${c};
    var index1 = global_idx / (uniforms.N / ${c});
    let stride1 = uniforms.M / ${h};
    let row = (index1 % stride1) * ${h};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${v.offsetToIndices("batch")};`}
    ${V(I,L)}
    let a_offset = ${I.indicesToOffset("a_indices")};
    ${V(T,Z)}
    let b_offset = ${T.indicesToOffset("b_indices")};
    var values: array<${A.type.value}, ${h}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${p}) {
      ${ne()}
    }
    for (var i = 0u; i < ${h}u; i++) {
      var value = values[i];
      ${z}
      ${O}
      let cur_indices = ${A.type.indices}(batch, row + i, col);
      let offset = ${A.indicesToOffset("cur_indices")};
      ${A.setByOffset(`offset / ${c}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${c};${p};${h};${n}`,inputDependencies:f?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:s?s(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:w}),getShaderSource:_}},Ll=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Yi=e=>{Ll(e.inputs);let t=ke.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],o=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&o<8)e.compute(Lr(e.inputs,{activation:""},t));else{let n=t[t.length-2],s=x.size(e.inputs[0].dims.slice(0,-2)),i=x.size(e.inputs[1].dims.slice(0,-2));if(s!==1&&n===1&&i===1){let a=e.inputs[0].reshape([1,s,o]),u=e.inputs[1].reshape([1,o,r]),l=[1,s,r],d=[a,u];e.compute(ct(d,{activation:""},t,l),{inputs:d})}else e.compute(ct(e.inputs,{activation:""},t))}}});var Wl,Gr,Gl,Hr,qr,Ji,Hl,ql,Fr,es=k(()=>{"use strict";q();Gi();ji();pt();Qi();Re();Wr();Oe();Wl=(e,t,r,o,n,s)=>{let i=e[0],a=e.slice(s?1:2,s?3:4),u=a.length,l=t[0],c=t.slice(2).map((m,f)=>m+(m-1)*(r[f]-1)),h=a.map((m,f)=>m+o[f]+o[f+u]).map((m,f)=>Math.floor((m-c[f]+n[f])/n[f]));return h.splice(0,0,i),h.splice(s?3:1,0,l),h},Gr=[2,3,1,0],Gl=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],o=e[1].dims[1]*t.group;if(r!==o)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Hr=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let s=2;s<t[1].dims.length;++s)r[s-2]===0&&(r[s-2]=t[1].dims[s]);let o=e.pads.slice();qe.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,o,e.format==="NHWC",e.autoPad);let n=Object.assign({},e);return Object.assign(n,{kernelShape:r,pads:o}),n},qr=e=>{let t=Zt(e),r=e.format,o=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],n=e.dilations,s=e.group,i=e.kernel_shape,a=e.pads,u=e.strides,l=e.w_is_const();return{autoPad:o,format:r,dilations:n,group:s,kernelShape:i,pads:a,strides:u,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},Ji=(e,t,r,o)=>{let n=r.format==="NHWC",s=Wl(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,n);if(r.group!==1){let v=[t[0]];if(n){let T=e.kernelCustomData.wT??e.compute(pe(t[1],Gr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=T),v.push(T)}else v.push(t[1]);t.length===3&&v.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&n&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(Xi(v,r,s,o),{inputs:v}):e.compute(Zi(v,r,s,o),{inputs:v});return}let i=t.length===3,a=t[0].dims[n?1:2],u=t[0].dims[n?2:3],l=t[0].dims[n?3:1],d=t[1].dims[2],c=t[1].dims[3],p=s[n?1:2],h=s[n?2:3],m=s[n?3:1],f=n&&d===a&&c===u&&r.pads[0]===0&&r.pads[1]===0;if(f||d===1&&c===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let v=s[0],I,T,A,B=[];if(n){let z=e.kernelCustomData.wT??e.compute(pe(t[1],Gr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=z),f){let N=a*u*l;I=t[0].reshape([1,v,N]),T=z.reshape([1,N,m]),A=[1,v,m]}else I=t[0].reshape([v,a*u,l]),T=z.reshape([1,l,m]),A=[v,p*h,m];B.push(I),B.push(T)}else I=t[0].reshape([v,l,a*u]),T=t[1].reshape([1,m,l]),A=[v,m,p*h],B.push(T),B.push(I);i&&B.push(t[2]);let O=A[2],W=B[0].dims[B[0].dims.length-1];O<8&&W<8?e.compute(Lr(B,r,s,A,n,o),{inputs:B}):e.compute(ct(B,r,s,A,n,o),{inputs:B});return}let b=!0,y=e.kernelCustomData.wT??e.compute(pe(t[1],Gr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=y);let g=[t[0],y];i&&g.push(t[2]);let w=n?p*h:m,_=n?m:p*h,$=d*c*l;e.compute(Wi(g,r,s,w,_,$,i,b,o),{inputs:g})},Hl=(e,t)=>{let r=t.format==="NHWC",o=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&o.push(e.inputs[2]);let n=[0,t.pads[0],0,t.pads[1]],s=[1].concat(t.strides),i=[1].concat(t.dilations),a=[1].concat(t.kernelShape),u=Hr({...t,pads:n,strides:s,dilations:i,kernelShape:a},o);Ji(e,o,u,l=>r?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},ql=(e,t,r)=>{let o=r.format==="NHWC"?"channelsLast":"channelsFirst",n=Hr(r,t),s=r.autoPad==="NOTSET"?r.pads:r.autoPad,i=Fi(t[0].dims,t[1].dims,r.strides,r.dilations,s,!1,o);e.compute(Ki(t,n,i.outShape,[i.filterDepth,i.filterHeight,i.filterWidth],[i.padInfo.front,i.padInfo.top,i.padInfo.left],o))},Fr=(e,t)=>{if(Gl(e.inputs,t),e.inputs[0].dims.length===3)Hl(e,t);else if(e.inputs[0].dims.length===5)ql(e,e.inputs,t);else{let r=Hr(t,e.inputs);Ji(e,e.inputs,r)}}});var Fl,ts,rs=k(()=>{"use strict";M();Ce();F();Re();ut();Nr();pt();Fl=(e,t=!1,r,o,n=4)=>{let s=y=>{switch(y){case 1:return"return w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];";case 4:return`
            let coord1 = vec4<i32>(coordX, coordY, col + 1, rowInner);
            let coord2 = vec4<i32>(coordX, coordY, col + 2, rowInner);
            let coord3 = vec4<i32>(coordX, coordY, col + 3, rowInner);
            let v0 = w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];
            let v1 = w[getIndexFromCoords4D(coord1, vec4<i32>(uniforms.w_shape))];
            let v2 = w[getIndexFromCoords4D(coord2, vec4<i32>(uniforms.w_shape))];
            let v3 = w[getIndexFromCoords4D(coord3, vec4<i32>(uniforms.w_shape))];
            return ${o}(v0, v1, v2, v3);
            `;default:throw new Error(`innerElementSize ${y} is not supported.`)}},i=e?`
      let coord = vec4<i32>(batch, iXR, iXC, xCh);
      `:`
      let coord = vec4<i32>(batch, xCh, iXR, iXC);
      `,a=e?`
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
    `,u=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",l=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",d=e?"row":"col",c=e?"col":"row",p=`
      let inChannels = ${e?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      let outRow = ${d} / outWidth;
      let outCol = ${d} % outWidth;

      let WRow = ${c} / (uniforms.filter_dims[1] * inChannels);
      let WCol = ${c} / inChannels % uniforms.filter_dims[1];
      let xR = f32(outRow - uniforms.pads[0] + uniforms.dilations[0] * WRow) / f32(uniforms.strides[0]);
      let xC = f32(outCol - uniforms.pads[1] + uniforms.dilations[1] * WCol) / f32(uniforms.strides[1]);
      if (xR < 0.0 || xR >= f32(${u}) || fract(xR) > 0.0) {
        return ${o}(0.0);
      }
      if (xC < 0.0 || xC >= f32(${l}) || fract(xC) > 0.0) {
        return ${o}(0.0);
      }
      let iXR = i32(xR);
      let iXC = i32(xC);
      let xCh = ${c} % inChannels;
      ${i}
      return x[getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape))/${n}];`,h=e?`
      let col = colIn * ${n};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
        ${p}
      }
      return ${o}(0.0);`:`
      let col = colIn * ${n};
      if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
        ${p}
      }
      return ${o}(0.0);`,m=`
      let col = colIn * ${n};
      let inChannels = ${e?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let coordX = uniforms.filter_dims[0] - 1 - row / (uniforms.filter_dims[1] * inChannels);
      let coordY = uniforms.filter_dims[1] - 1 - (row / inChannels) % uniforms.filter_dims[1];
      if (${e?"row < uniforms.dim_inner && col < uniforms.dim_b_outer":"row < uniforms.dim_inner && col < uniforms.dim_a_outer"}  && coordX >= 0 && coordY >= 0) {
        let rowInner = row % inChannels;
        let coord = vec4<i32>(coordX, coordY, col, rowInner);
        ${s(n)}
      }
      return ${o}(0.0);
      `,f=$e(r,o);return`
  fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${o} {
    ${e?h:m}
  }

  fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${o} {
    ${e?m:h}
  }

  fn mm_write(batch: i32, row : i32, colIn : i32, valueInput : ${o}) {
    let col = colIn * ${n};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
      var value = valueInput;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${a}
      ${Xt(t)}
      ${f}
      result[getIndexFromCoords4D(coords, vec4<i32>(uniforms.result_shape))/${n}] = value;
    }
  }`},ts=(e,t,r,o,n,s,i,a)=>{let u=t.format==="NHWC",l=u?e[0].dims[3]:e[0].dims[1],d=r[0],c=u?r[2]:r[3],p=u?r[1]:r[2],h=u?r[3]:r[1],m=u&&l%4===0&&l%3&&h%4===0,f=u?h:c*p,b=u?c*p:h,y=[8,8,1],g=o<=8?[4,1,1]:[4,4,1],w=[Math.ceil(f/y[0]/g[0]),Math.ceil(b/y[1]/g[1]),Math.ceil(d/y[2]/g[2])];j("verbose",()=>`[conv_backprop_mm_webgpu] dispatch = ${w}`);let _=m?4:1,$=Math.max(y[0]*_,y[1]),v=m?4:1,I=[t.kernelShape[u?1:2],t.kernelShape[u?2:3]],T=[I[0]+(t.dilations[0]<=1?0:(I[0]-1)*(t.dilations[0]-1)),I[1]+(t.dilations[1]<=1?0:(I[1]-1)*(t.dilations[1]-1))],A=[T[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),T[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],B=[{type:6,data:o},{type:6,data:n},{type:6,data:s},{type:6,data:t.strides},{type:6,data:t.dilations},{type:6,data:I},{type:6,data:A}];ve(t,B),B.push(...E(e[0].dims,e[1].dims));let O=["rank","rank"];i&&(B.push(...E(e[2].dims)),O.push("rank")),B.push(...E(r));let W=z=>{let N=S("x",e[0].dataType,e[0].dims.length,v),se=S("w",e[1].dataType,e[1].dims.length,1),L=C("result",e[0].dataType,r.length,v),Z=[N,se],K="";if(i){let oe=S("bias",e[2].dataType,e[2].dims.length,v);Z.push(oe),K+=`
          fn getBiasByOutputCoords(coords : vec4<i32>) -> ${oe.type.value} {
            return bias[coords.${u?"w":"y"}${m?"/ 4":""}];
          }`}let V=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"strides",type:"i32",length:2},{name:"dilations",type:"i32",length:2},{name:"filter_dims",type:"i32",length:I.length},{name:"pads",type:"i32",length:A.length}];xe(t,V);let ne=J(e[0].dataType,1);if(ne!=="f16"&&ne!=="f32")throw new Error(`elemType ${ne} is not supported.`);return`
        ${Qt("uniforms.result_strides")}
        ${z.registerUniforms(V).declareVariables(...Z,L)};
        ${K}
        ${Fl(u,i,t,N.type.value,_)}
        ${m?lt(g,y,ne,void 0,!u,$):dt(g,y,ne,void 0,!u,$,!1,void 0,a)}`};return{name:"Conv2DTransposeMatMul",shaderCache:{hint:`${t.cacheKey};${g};${y};${m}`,inputDependencies:O},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:B}),getShaderSource:W}}});var Kl,Kr,ns=k(()=>{"use strict";M();Ce();q();F();Kl=(e,t,r,o,n,s=!1,i,a,u=!1)=>{let l=u?1:2,d=u?2:3,c=u?3:1,p=s?2:1,h=`
  fn setOutputAtIndex(flatIndex : u32, value : ${s?`vec4<${i}>`:i}) {
    result[flatIndex] = ${s?`vec4<${i}>`:i}(value);
  }`;o&&(h+=`
    fn getBiasByOutputCoords(coords : vec4<u32>) -> ${s?`vec4<${i}>`:i} {
      return bias[coords.${u?"w":"y"}${s?"/ 4":""}];
    }`);let m=s?4:1,f=S("W",t[1].dataType,t[1].dims.length,m),b=S("Dy",t[0].dataType,t[0].dims.length,m),y=[b,f];o&&y.push(S("bias",t[2].dataType,[r[c]].length,m));let g=C("result",t[0].dataType,r.length,m),w=`{
        let batch: u32 = ${n?"global_id.z":"workgroup_id.z"} / uniforms.result_shape[1];
        let r = ${n?"global_id.z":"workgroup_id.z"} % uniforms.result_shape[1];
        let c = ${n?"global_id.y":"workgroup_id.y"} * ${p};
        let d1: u32 = ${n?"global_id.x":"workgroup_id.x"} * 4;

        let dyCorner = vec2<i32>(i32(r), i32(c)) - vec2<i32>(uniforms.pads);

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        var dotProd: array<vec4<${i}>, ${p}>;
        for (var i = 0; i < ${p}; i++) {
          dotProd[i] = vec4<${i}>(0.0);
        }
        for (var wR: u32 = 0; wR < uniforms.filter_dims[0]; wR = wR + 1) {
          var dyR = (${i}(dyCorner.x) + ${i}(wR)) / ${i}(uniforms.strides.x);
          let wRPerm = uniforms.filter_dims[0] - 1 - wR;
          if (dyR < 0.0 || dyR >= ${i}(uniforms.Dy_shape[1]) ||
              fract(dyR) > 0.0 || wRPerm < 0) {
            continue;
          }
          let idyR: u32 = u32(dyR);

          for (var wC: u32 = 0; wC < uniforms.filter_dims[1]; wC = wC + 1) {
            let dyC = (${i}(dyCorner.y) + ${i}(wC)) / ${i}(uniforms.strides.y);
            let dyC2 = (${i}(dyCorner.y) + 1.0 + ${i}(wC)) / ${i}(uniforms.strides.y);
            let wCPerm = uniforms.filter_dims[1] - 1 - wC;
            if (wCPerm < 0) {
              continue;
            }
            var bDyCVal = true;
            var bDyCVal2 = true;
            if (dyC < 0.0 || dyC >= ${i}(uniforms.Dy_shape[2]) ||
                fract(dyC) > 0.0) {
              bDyCVal = false;
            }
            if (dyC2 < 0.0 || dyC2 >= ${i}(uniforms.Dy_shape[2]) ||
                fract(dyC2) > 0.0) {
              bDyCVal2 = false;
            }

            let idyC: u32 = u32(dyC);
            let idyC2: u32 = u32(dyC2);
            if (bDyCVal && bDyCVal2) {
              let d2Length = uniforms.Dy_shape[3];
              for (var d2 :u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${b.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${i}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;

                xValue =  ${b.get("batch","idyR","idyC2","d2")};

                dotProd[1] = dotProd[1] + vec4<${i}>(dot(xValue, wValue0),
                                                    dot(xValue, wValue1),
                                                    dot(xValue, wValue2),
                                                    dot(xValue, wValue3));
              }
            } else if (bDyCVal) {
              let d2Length = uniforms.Dy_shape[${c}];
              for (var d2: u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${b.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${i}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;
              }
            } else if (bDyCVal2) {
              let d2Length = uniforms.Dy_shape[3];
              for (var d2: u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${b.get("batch","idyR","idyC2","d2")};
                let tmpval = vec4<${i}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[1] = dotProd[1] + tmpval;
              }
            }
          }
        }

        for (var i: u32 = 0; i < ${p}; i = i + 1) {
          let value = dotProd[i] + ${o?"bias[c+i]":`vec4<${i}>(0.0)`};
          ${g.set("batch","r","c + i","d1","value")};
        }
      }`,_=`
          let outputIndices = ${g.offsetToIndices("global_idx")};
          let batch = ${g.indicesGet("outputIndices",0)};
          let d1 = ${g.indicesGet("outputIndices",c)};
          let r = ${g.indicesGet("outputIndices",l)};
          let c = ${g.indicesGet("outputIndices",d)};
          let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
          let dyRCorner = dyCorner.x;
          let dyCCorner = dyCorner.y;
          let groupId = d1 / uniforms.output_channels_per_group;
          let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
          // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
          // ? = to be determined. : = across all values in that axis.
          var dotProd = ${i}(0.0);
          for (var wR: u32 = 0; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
            if (wR % uniforms.dilations.x != 0) {
              continue;
            }
            let dyR = (${i}(dyRCorner) + ${i}(wR)) / ${i}(uniforms.strides[0]);
            let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
            if (dyR < 0.0 || dyR >= ${i}(uniforms.Dy_shape[${l}]) || fract(dyR) > 0.0 ||
                wRPerm < 0) {
              continue;
            }
            let idyR: u32 = u32(dyR);

            for (var wC: u32 = 0; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
              if (wC % uniforms.dilations.y != 0) {
                continue;
              }
              let dyC = (${i}(dyCCorner) + ${i}(wC)) / ${i}(uniforms.strides.y);
              let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
              if (dyC < 0.0 || dyC >= ${i}(uniforms.Dy_shape[${d}]) ||
                  fract(dyC) > 0.0 || wCPerm < 0) {
                continue;
              }
              let idyC: u32 = u32(dyC);
              var inputChannel = groupId * uniforms.input_channels_per_group;
              for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + 1) {
                let xValue = ${u?b.get("batch","idyR","idyC","inputChannel"):b.get("batch","inputChannel","idyR","idyC")};
                let wValue = ${f.get("inputChannel","wOutChannel","u32(wRPerm)","u32(wCPerm)")};
                dotProd = dotProd + xValue * wValue;
                inputChannel = inputChannel + 1;
              }
            }
          }
          let value = dotProd + ${o?"bias[d1]":`${i}(0.0)`};
          ${g.setByOffset("global_idx","value")};
        `;return`
  ${e.registerUniforms(a).declareVariables(...y,g)}
  ${h}

    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
  ${s?w:_}}`},Kr=(e,t,r)=>{let o=e.length>2,n=t.outputShape,s=x.size(n),i=[Math.ceil(s/64),1,1];j("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${i}`);let a=t.format==="NHWC",u=["rank","rank"],l=[t.strides[0],t.strides[1]],d=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],c=[t.dilations[0],t.dilations[1]],p=[d[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),d[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],h=[p[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),p[1]-1-Math.floor(t.pads[1]+t.pads[3])/2],m=!1,f=t.group,b=e[1].dims,y=b[0]/f,g=b[1],w=[{type:12,data:s},{type:12,data:l},{type:12,data:d},{type:12,data:c},{type:12,data:p},{type:6,data:h},{type:12,data:y},{type:12,data:g},...E(e[0].dims,e[1].dims)];o&&(w.push(...E(e[2].dims)),u.push("rank")),w.push(...E(n));let _=i[1]===1&&i[2]===1,$=v=>{let I=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:l.length},{name:"filter_dims",type:"u32",length:d.length},{name:"dilations",type:"u32",length:d.length},{name:"effective_filter_dims",type:"u32",length:p.length},{name:"pads",type:"i32",length:h.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],T=J(e[0].dataType);return`${Kl(v,e,n,o,_,m,T,I,a)}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};`,inputDependencies:u},getRunData:()=>({dispatchGroup:{x:i[0],y:i[1],z:i[2]},outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],programUniforms:w}),getShaderSource:$}}});var jl,Zl,Xl,os,is,Ql,Yl,Jl,ed,ss,as=k(()=>{"use strict";rs();ns();Re();Oe();jl=(e,t,r,o,n,s)=>(e-1)*t+r+(o-1)*n+1-s,Zl=(e,t,r,o,n)=>{let s=Math.floor(e/2);t==="SAME_UPPER"?(r[o]=s,r[n]=e-s):t==="SAME_LOWER"&&(r[o]=e-s,r[n]=s)},Xl=(e,t,r,o,n,s,i,a,u,l)=>{let d=e.length-2,c=l.length===0;u.length<d&&u.push(...Array(d-u.length).fill(0));let p=e[0],h=t[a?3:1]*n;for(let m=0,f=e.length-d-(a?1:0);m<d;++m,++f){let b=e[f],y=c?b*i[m]:l[m],g=jl(b,i[m],s[m],t[f],r[m],y);Zl(g,o,s,m,m+d),c&&l.push(i[m]*(b-1)+u[m]+(t[f]-1)*r[m]+1-s[m]-s[m+d])}l.splice(0,0,p),l.splice(a?3:1,0,h)},os=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((c,p)=>c*p,1)===0){r.length=0;for(let c=2;c<t[1].dims.length;++c)r.push(t[1].dims[c])}let o=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(o?3:1,0,t[1].dims[1]);let n=e.pads.slice(),s=e.outputShape.slice(),i=e.outputPadding.slice(),a=t[0].dims,u=e.dilations.slice();if(u.reduce((c,p)=>c+p,0)===0){let c=t[0].dims.length-2;u=new Array(c).fill(1)}let l=e.strides.slice();if(l.reduce((c,p)=>c+p,0)===0){let c=t[0].dims.length-2;l=new Array(c).fill(1)}Xl(a,r,u,e.autoPad,e.group,n,l,o,i,s);let d=Object.assign({},e);return Object.assign(d,{kernelShape:r,pads:n,outputPadding:i,outputShape:s,dilations:u,strides:l}),d},is=e=>{let t=Zt(e),r=e.format,o=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],n=e.dilations,s=e.group,i=e.kernelShape,a=e.pads,u=e.strides,l=e.wIsConst(),d=e.outputPadding,c=e.outputShape;return{autoPad:o,format:r,dilations:n,group:s,kernelShape:i,outputPadding:d,outputShape:c,pads:a,strides:u,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},Ql=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],o=e[1].dims[0];if(r!==o)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let n=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==n))throw new Error("invalid bias");let s=e[0].dims.length-2;if(t.dilations.reduce((d,c)=>d+c,0)>0&&t.dilations.length!==s)throw new Error(`dilations should be ${s}D`);if(t.strides.reduce((d,c)=>d+c,0)>0&&t.strides.length!==s)throw new Error(`strides should be ${s}D`);if(t.pads.reduce((d,c)=>d+c,0)>0&&t.pads.length!==s*2)throw new Error(`pads should be ${s*2}D`);if(t.outputPadding.length!==s&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${s}D`);if(t.kernelShape.reduce((d,c)=>d+c,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Yl=[2,3,1,0],Jl=(e,t,r)=>{let o=os(r,t),n=r.format==="NHWC",s=o.outputShape,i=s[n?3:1],a=t[0].dims[n?3:1];if(o.group!==1||i===1&&a===1){e.compute(Kr(t,o));return}let u=s[n?1:2],l=s[n?2:3],d=t[1].dims[2],c=t[1].dims[3],p=n?u*l:i,h=n?i:u*l,m=d*c*a,f=!0,b=e.kernelCustomData.wT??e.compute(pe(t[1],Yl),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=b);let y=[t[0],b],g=t.length===3;g&&(!n&&t[2].dims.length===1?y.push(t[2].reshape([t[2].dims[0],1,1])):y.push(t[2])),e.compute(ts(y,o,s,p,h,m,g,f),{inputs:y})},ed=(e,t)=>{let r=t.format==="NHWC",o=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&o.push(e.inputs[2]);let n=t.kernelShape;(n.length===0||n[0]===0)&&(n=[e.inputs[1].dims[2]]);let s=t.dilations;(s.length===0||s[0]===0)&&(s=[1]);let i=t.strides;(i.length===0||i[0]===0)&&(i=[1]);let a=t.pads;a.length===0&&(a=[0,0]),a=[0,a[0],0,a[1]],i=[1].concat(i),s=[1].concat(s),n=[1].concat(n);let u=os({...t,pads:a,strides:i,dilations:s,kernelShape:n},o);e.compute(Kr(o,u,l=>r?[l[0],l[2],l[3]]:[l[0],l[1],l[3]]))},ss=(e,t)=>{Ql(e.inputs,t),e.inputs[0].dims.length===3?ed(e,t):Jl(e,e.inputs,t)}});var td,us,ls,ds=k(()=>{"use strict";M();q();ue();F();td=(e,t,r,o)=>{let n=x.size(t),s=t.length,i=S("input",e,s),a=C("output",e,s),u=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),l=x.normalizeAxis(u,s),d=c=>{let p=` i32(${i.indicesGet("inputIndices","uniforms.axis")}) `,h=D("uniforms.input_shape","uniforms.axis",s),m=o.reverse?p+(o.exclusive?" + 1":""):"0",f=o.reverse?h:p+(o.exclusive?"":" + 1");return`
                ${c.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(i,a)}
                ${c.mainStart()}
                  ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${a.offsetToIndices("global_idx")};
                  var sum = ${a.type.value}(0);
                  let first : i32 = ${m};
                  let last : i32 = ${f};
                  for (var i : i32 = first; i < last; i++) {
                    ${i.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${i.getByIndices("inputIndices")};
                  }
                  ${a.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:o.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},{type:12,data:l},...E(t,t)]}),getShaderSource:d}},us=(e,t)=>{let r=e.inputs[0].dims,o=e.inputs[0].dataType,n=e.inputs[1];e.compute(td(o,r,n,t),{inputs:[0]})},ls=e=>{let t=e.exclusive===1,r=e.reverse===1;return U({exclusive:t,reverse:r})}});var rd,nd,od,cs,ps,ms=k(()=>{"use strict";M();q();ue();F();rd=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},nd=(e,t,r,o)=>{let n=[];n.push(`fn perm(i: ${o.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let s=0;s<t;++s)n.push(r.indicesSet("a",e[s],`i[${s}]`));return n.push("return a;}"),n.join(`
`)},od=(e,t)=>{let r,o,n,s,i,a,u=t.format==="NHWC",l=t.blocksize,d=t.mode==="DCR";u?([r,o,n,s]=e.dims,i=d?[r,o,n,l,l,s/l**2]:[r,o,n,s/l**2,l,l],a=d?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,o,n,s]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],i=d?[r,l,l,s/l**2,o,n]:[r,s/l**2,l,l,o,n],a=d?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let c=e.reshape(i),p=c.dims.length,h=e.dataType,m=S("a",h,p),f=C("output",h,p),b=y=>`
  ${y.registerUniform("output_size","u32").declareVariables(m,f)}

  ${nd(a,p,m,f)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${f.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${f.setByOffset("global_idx",m.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:y=>{let g=u?[r,o*l,n*l,s/l**2]:[r,s/l**2,o*l,n*l],w=x.size(g),_=c.dims,$=x.sortBasedOnPerm(_,a);return{outputs:[{dims:g,dataType:y[0].dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...E(_,$)]}},getShaderSource:b}},cs=(e,t)=>{rd(e.inputs),e.compute(od(e.inputs[0],t))},ps=e=>U({blocksize:e.blocksize,mode:e.mode,format:e.format})});var jr,Jt,fs,id,sd,Zr,Xr,hs,ad,gs,ys,bs=k(()=>{"use strict";M();q();ue();F();jr="[a-zA-Z]|\\.\\.\\.",Jt="("+jr+")+",fs="^"+Jt+"$",id="("+Jt+",)*"+Jt,sd="^"+id+"$",Zr=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,r){let o=this.symbolToIndices.get(t);o===void 0?o=[r]:o.push(r),this.symbolToIndices.set(t,o)}},Xr=class{constructor(t,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[o,n]=r.includes("->")?r.split("->",2):[r,""];if(!o.match(RegExp(sd)))throw new Error("Invalid LHS term");if(o.split(",").forEach((a,u)=>{let l=t[u].dims.slice();if(!a.match(RegExp(fs)))throw new Error("Invalid LHS term");let d=this.processTerm(a,!0,l,u);this.lhs.push(d)}),n==="")n+=[...this.symbolToInfo.entries()].filter(([a,u])=>u.count===1||a==="...").map(([a])=>a).join("");else if(!n.match(RegExp(Jt)))throw new Error("Invalid RHS");n.match(RegExp(jr,"g"))?.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let u=this.symbolToInfo.get(a);if(u===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(u.dimValue)}}),this.rhs=this.processTerm(n,!1,this.outputDims)}addSymbol(t,r,o){let n=this.symbolToInfo.get(t);if(n!==void 0){if(n.dimValue!==r&&n.count!==1)throw new Error("Dimension mismatch");n.count++,n.inputIndices.push(o)}else n={count:1,dimValue:r,inputIndices:[o]};this.symbolToInfo.set(t,n)}processTerm(t,r,o,n=-1){let s=o.length,i=!1,a=[],u=0;if(!t.match(RegExp(fs))&&!r&&t!=="")throw new Error("Invalid LHS term");let l=t.match(RegExp(jr,"g")),d=new Zr(n);return l?.forEach((c,p)=>{if(c==="..."){if(i)throw new Error("Only one ellipsis is allowed per input term");i=!0;let h=s-l.length+1;if(h<0)throw new Error("Ellipsis out of bounds");if(a=o.slice(u,u+h),this.hasEllipsis){if(this.ellipsisDims.length!==a.length||this.ellipsisDims.toString()!==a.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=a;else throw new Error("Ellipsis must be specified in the LHS");for(let m=0;m<a.length;m++){let f=String.fromCharCode("0".charCodeAt(0)+m);d.addSymbol(f,p+m),this.addSymbol(f,o[u++],n)}}else d.addSymbol(c,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,o[u++],n)}),d}},hs=e=>e+"_max",ad=(e,t,r,o)=>{let s=e.map(d=>d.length).map((d,c)=>S(`input${c}`,t,d)),i=x.size(o),a=C("output",t,o.length),u=[...r.symbolToInfo.keys()].filter(d=>!r.rhs.symbolToIndices.has(d)),l=d=>{let c=[],p="var prod = 1.0;",h="var sum = 0.0;",m="sum += prod;",f=[],b=[],y=[],g=[],w=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach(($,v)=>{if(r.rhs.symbolToIndices.has(v)){let I=r.rhs.symbolToIndices.get(v)?.[0];I!==void 0&&r.lhs.forEach((T,A)=>{if($.inputIndices.includes(A)){let B=T.symbolToIndices.get(v);if(B===void 0)throw new Error("Invalid symbol error");B.forEach(O=>{c.push(`${s[A].indicesSet(`input${A}Indices`,O,a.indicesGet("outputIndices",I))}`)})}})}else r.lhs.forEach((I,T)=>{if($.inputIndices.includes(T)){let A=I.symbolToIndices.get(v);if(A===void 0)throw new Error("Invalid symbol error");A.forEach(B=>{f.push(`${s[T].indicesSet(`input${T}Indices`,B,`${v}`)}`)}),g.push(`prod *= ${s[T].getByIndices(`input${T}Indices`)};`)}}),b.push(`for(var ${v}: u32 = 0; ${v} < uniforms.${hs(v)}; ${v}++) {`),y.push("}")});let _=w?[...c,`let sum = ${s.map(($,v)=>$.getByIndices(`input${v}Indices`)).join(" * ")};`]:[...c,h,...b,...f,p,...g,m,...y];return`
            ${d.registerUniforms(u.map($=>({name:`${hs($)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...s,a)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${a.offsetToIndices("global_idx")};
            ${s.map(($,v)=>`var input${v}Indices: ${s[v].type.indices};`).join(`
`)}
            ${_.join(`
`)};
            ${a.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let d=u.filter(p=>r.symbolToInfo.has(p)).map(p=>({type:12,data:r.symbolToInfo.get(p)?.dimValue||0}));d.push({type:12,data:i});let c=e.map((p,h)=>[...E(p)]).reduce((p,h)=>p.concat(h),d);return c.push(...E(o)),{outputs:[{dims:o,dataType:t}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:c}},getShaderSource:l}},gs=(e,t)=>{let r=new Xr(e.inputs,t.equation),o=r.outputDims,n=e.inputs.map((s,i)=>s.dims);e.compute(ad(n,e.inputs[0].dataType,r,o))},ys=e=>{let t=e.equation.replace(/\s+/g,"");return U({equation:t})}});var ud,ws,ld,dd,_s,$s=k(()=>{"use strict";M();q();F();ud=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),o=r.length<t.length?0:r.length-t.length,n=t.length<r.length?0:t.length-r.length;for(;o<r.length&&n<t.length;++o,++n)if(r[o]!==t[n]&&r[o]!==1&&t[n]!==1)throw new Error("Expand requires shape to be broadcastable to input")},ws=(e,t)=>{let r=e.length-t.length,o=[];for(let n=0;n<r;++n)o.push(e[n]);for(let n=0;n<t.length;++n)o.push(t[n]===1?e[n+r]:t[n]);return o},ld=(e,t)=>e.length>t.length?ws(e,t):ws(t,e),dd=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),o=ld(t,r),n=e[0].dataType,s=n===9?4:1,i=Math.ceil(x.size(o)/s),a=l=>{let d=S("input",n,t.length,s),c=C("output",n,o.length,s),p;if(n===9){let h=(m,f,b="")=>`
          let outputIndices${f} = ${c.offsetToIndices(`outputOffset + ${f}u`)};
          let offset${f} = ${d.broadcastedIndicesToOffset(`outputIndices${f}`,c)};
          let index${f} = offset${f} / 4u;
          let component${f} = offset${f} % 4u;
          ${m}[${f}] = ${b}(${d.getByOffset(`index${f}`)}[component${f}]);
        `;p=`
        let outputOffset = global_idx * ${s};
        var data = vec4<u32>(0);
        ${h("data",0,"u32")}
        ${h("data",1,"u32")}
        ${h("data",2,"u32")}
        ${h("data",3,"u32")}
        ${c.setByOffset("global_idx","data")}
      }`}else p=`
        let outputIndices = ${c.offsetToIndices("global_idx")};
        let inputOffset = ${d.broadcastedIndicesToOffset("outputIndices",c)};
        ${c.setByOffset("global_idx",d.getByOffset("inputOffset"))}
      }`;return`
    ${l.registerUniform("vec_size","u32").declareVariables(d,c)}
    ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${p}`},u=[{type:12,data:i},...E(t,o)];return{name:"Expand",shaderCache:{hint:`${o.length}`,inputDependencies:["rank"]},getShaderSource:a,getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:u})}},_s=e=>{ud(e.inputs),e.compute(dd(e.inputs),{inputs:[0]})}});var cd,vs,xs=k(()=>{"use strict";M();q();F();jt();cd=e=>{let t=e[0].dataType,r=x.size(e[0].dims),o=x.size(e[1].dims),n=o%4===0,s=i=>{let a=S("x",t,[1],4),u=S("bias",t,[1],4),l=C("y",t,[1],4),d=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],c=h=>`
      let bias${h}_offset: u32 = (global_idx * 4 + ${h}) % uniforms.bias_size;
      let bias${h} = ${u.getByOffset(`bias${h}_offset / 4`)}[bias${h}_offset % 4];`,p=n?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${c(0)}${c(1)}${c(2)}${c(3)}
      let bias = ${a.type.value}(bias0, bias1, bias2, bias3);`;return`${i.registerUniforms(d).declareVariables(a,u,l)}

    ${Vr(ce(t))}

    ${i.mainStart(Fe)}
      ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${a.getByOffset("global_idx")};
      ${p}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",Ur("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${n}`,inputDependencies:["type","type"]},getShaderSource:s,getRunData:i=>({outputs:[{dims:i[0].dims,dataType:i[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:o}],dispatchGroup:{x:Math.ceil(r/Fe/4)}})}},vs=e=>{e.inputs.length<2||x.size(e.inputs[1].dims)===0?_i(e):e.compute(cd(e.inputs))}});var pd,md,Ss,Is,Ts=k(()=>{"use strict";M();q();ue();F();pd=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},md=(e,t)=>{let r=e[0].dims,o=e[1].dims,n=r.length,s=x.normalizeAxis(t.axis,n),i=r.slice(0);i.splice(s,1,...o);let a=r[s],u=e[0].dataType===9?4:1,l=Math.ceil(x.size(i)/u),d=[{type:12,data:l},{type:6,data:a},{type:12,data:s},...E(e[0].dims,e[1].dims,i)],c=p=>{let h=S("data",e[0].dataType,e[0].dims.length,u),m=S("inputIndices",e[1].dataType,e[1].dims.length),f=C("output",e[0].dataType,i.length,u),b=g=>{let w=o.length,_=`var indicesIndices${g}  = ${m.type.indices}(0);`;for(let $=0;$<w;$++)_+=`${w>1?`indicesIndices${g}[${$}]`:`indicesIndices${g}`} = ${i.length>1?`outputIndices${g}[uniforms.axis + ${$}]`:`outputIndices${g}`};`;_+=`
          var idx${g} = ${m.getByIndices(`indicesIndices${g}`)};
          if (idx${g} < 0) {
            idx${g} = idx${g} + uniforms.axisDimLimit;
          }
          var dataIndices${g} : ${h.type.indices};
        `;for(let $=0,v=0;$<n;$++)$===s?(_+=`${n>1?`dataIndices${g}[${$}]`:`dataIndices${g}`} = u32(idx${g});`,v+=w):(_+=`${n>1?`dataIndices${g}[${$}]`:`dataIndices${g}`} = ${i.length>1?`outputIndices${g}[${v}]`:`outputIndices${g}`};`,v++);return _},y;if(e[0].dataType===9){let g=(w,_,$="")=>`
          let outputIndices${_} = ${f.offsetToIndices(`outputOffset + ${_}u`)};
          ${b(_)};
          let offset${_} = ${h.indicesToOffset(`dataIndices${_}`)};
          let index${_} = offset${_} / 4u;
          let component${_} = offset${_} % 4u;
          ${w}[${_}] = ${$}(${h.getByOffset(`index${_}`)}[component${_}]);
        `;y=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${g("value",0,"u32")}
        ${g("value",1,"u32")}
        ${g("value",2,"u32")}
        ${g("value",3,"u32")}
        ${f.setByOffset("global_idx","value")}
      `}else y=`
      let outputIndices = ${f.offsetToIndices("global_idx")};
      ${b("")};
      let value = ${h.getByIndices("dataIndices")};
      ${f.setByOffset("global_idx","value")};
      `;return`
      ${p.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(h,m,f)}
      ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${y}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:c}},Ss=e=>U({axis:e.axis}),Is=(e,t)=>{let r=e.inputs;pd(r),e.compute(md(e.inputs,t))}});var fd,hd,Cs,As,ks=k(()=>{"use strict";M();q();ue();F();fd=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=x.normalizeAxis(t.quantizeAxis,e[0].dims.length),o=t.blockSize,n=e[0],s=e[2],i=e.length===4?e[3]:void 0;if(s.dims.length!==n.dims.length||!n.dims.map((a,u)=>u===r?Math.ceil(a/o)===s.dims[u]:a===s.dims[u]).reduce((a,u)=>a&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(i){if(i.dataType!==n.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(i.dims.length!==s.dims.length||!i.dims.map((a,u)=>a===s.dims[u]).reduce((a,u)=>a&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},hd=(e,t)=>{let r=e[0].dims,o=e[1].dims,n=r.length,s=x.normalizeAxis(t.gatherAxis,n),i=x.normalizeAxis(t.quantizeAxis,n),a=r.slice(0);a.splice(s,1,...o);let u=x.size(a),l=e[2].dataType,c=e[0].dataType===22,p=[{type:12,data:u},{type:12,data:i},{type:12,data:s},{type:12,data:t.blockSize},...E(...e.map((m,f)=>m.dims),a)],h=m=>{let f=S("data",e[0].dataType,e[0].dims.length),b=S("inputIndices",e[1].dataType,e[1].dims.length),y=S("scales",e[2].dataType,e[2].dims.length),g=e.length>3?S("zeroPoint",e[3].dataType,e[3].dims.length):void 0,w=C("output",l,a.length),_=[f,b,y];g&&_.push(g);let $=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${m.registerUniforms($).declareVariables(..._,w)}
        ${m.mainStart()}
        let output_indices = ${w.offsetToIndices("global_idx")};
        var indices_indices = ${b.type.indices}(0);
        ${(()=>o.length>1?`
          for (var i: u32 = 0; i < ${o.length}; i++) {
            let index = ${w.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${b.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${w.indicesGet("output_indices","uniforms.gather_axis")};`)()};
        var data_indices = ${f.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${w.indicesGet("output_indices","i")};
          ${f.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${b.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[s]};
        }
        ${f.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${a.length}; i++) {
          let index = ${w.indicesGet("output_indices",`i + ${o.length} - 1`)};
          ${f.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${f.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${f.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${y.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${y.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${y.getByIndices("scale_indices")};
        ${(()=>g?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${g.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${g.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0")()};
        let dequantized_data = ${ce(l)}(quantized_data - zero_point) * scale;
        ${w.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((m,f)=>f!==1).map(m=>m.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(m,f)=>"rank")},getRunData:()=>({outputs:[{dims:a,dataType:l}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:p}),getShaderSource:h}},Cs=(e,t)=>{let r=e.inputs;fd(r,t),e.compute(hd(e.inputs,t))},As=e=>U({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})});var gd,yd,Es,Ps,zs=k(()=>{"use strict";M();q();ue();F();gd=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},yd=(e,t)=>{let r=e[0].dims,o=e[0].dataType,n=r.length,s=e[1].dims,i=e[1].dataType,a=x.normalizeAxis(t.axis,n),u=r[a],l=s.slice(0),d=x.size(l),c=S("input",o,n),p=S("indicesInput",i,s.length),h=C("output",o,l.length),m=[{type:12,data:d},{type:6,data:u},{type:12,data:a}];return m.push(...E(r,s,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:m}),getShaderSource:y=>`
      ${y.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(c,p,h)}
      ${y.mainStart()}
      ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${h.offsetToIndices("global_idx")};

      var idx = ${p.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${c.type.indices}(outputIndices);
      ${c.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${c.getByIndices("inputIndices")};

      ${h.setByOffset("global_idx","value")};
  }`}},Es=e=>U({axis:e.axis}),Ps=(e,t)=>{let r=e.inputs;gd(r),e.compute(yd(e.inputs,t))}});var bd,wd,Bs,Ds,Os=k(()=>{"use strict";M();q();F();bd=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},wd=(e,t)=>{let r=e[0].dims.slice(),o=e[1].dims.slice(),[n,s,i]=Wt.getShapeOfGemmResult(r,t.transA,o,t.transB,e.length===3?e[2].dims:void 0),a=[n,s];if(!a)throw new Error("Can't use gemm on the given tensors");let u=16,l=Math.ceil(s/u),d=Math.ceil(n/u),c=!0,p=x.size(a),h=[{type:12,data:c?l:p},{type:12,data:n},{type:12,data:s},{type:12,data:i},{type:1,data:t.alpha},{type:1,data:t.beta}],m=["type","type"];e.length===3&&(h.push(...E(e[2].dims)),m.push("rank")),h.push(...E(a));let f=y=>{let g="";t.transA&&t.transB?g="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?g="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?g="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(g="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let w=t.alpha===1?"":"value *= uniforms.alpha;",_=S("a",e[0].dataType,e[0].dims),$=S("b",e[1].dataType,e[1].dims),v=_.type.value,I=null,T=[_,$];e.length===3&&(I=S("c",e[2].dataType,e[2].dims.length),T.push(I));let A=C("output",e[0].dataType,a.length);T.push(A);let B=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${y.registerUniforms(B).declareVariables(...T)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${v}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${g}
    }

    ${w}
    ${(()=>I!=null?`let cOffset = ${I.broadcastedIndicesToOffset("vec2(m, n)",A)}; value += ${v}(uniforms.beta) * ${I.getByOffset("cOffset")};`:"")()}
    output[global_idx] = value;
  }`},b=y=>{let g=S("a",e[0].dataType,e[0].dims),w=S("b",e[1].dataType,e[1].dims),_=null,$=[g,w];e.length===3&&(_=S("c",e[2].dataType,e[2].dims.length),$.push(_));let v=C("output",e[0].dataType,a.length);$.push(v);let I=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],T="",A="";t.transA&&t.transB?(A=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${g.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${w.type.value}(0);
      }
      `,T="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(A=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${g.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${w.type.value}(0);
      }
      `,T="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(A=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${g.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${w.type.value}(0);
      }
      `,T="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(A=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${g.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${w.type.value}(0);
      }
      `,T="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let B=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${y.registerUniforms(I).declareVariables(...$)}
  var<workgroup> tile_a: array<array<${g.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${w.type.storage}, ${u}>, ${u}>;
  ${y.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${v.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${A}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${T}
      }
      workgroupBarrier();
    }

    ${B}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${(()=>_!=null?`let cOffset = ${_.broadcastedIndicesToOffset("vec2(m, n)",v)}; value += ${v.type.value}(uniforms.beta) * ${_.getByOffset("cOffset")};`:"")()}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return c?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:l*d},programUniforms:h}),getShaderSource:b}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:h}),getShaderSource:f}},Bs=e=>{let t=e.transA,r=e.transB,o=e.alpha,n=e.beta;return{transA:t,transB:r,alpha:o,beta:n,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Ds=(e,t)=>{bd(e.inputs),e.compute(wd(e.inputs,t))}});var be,vd,Ms,Rs,xd,mt,Vs,Qr=k(()=>{"use strict";M();q();ue();Lt();Ft();F();Oe();be=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,vd=(e,t)=>{let r=e[0],o=be(e,1),n=be(e,2),s=be(e,3),i=be(e,4),a=be(e,5),u=be(e,6),l=be(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let d=r.dims[0],c=r.dims[1],p=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],h=c,m=0,f=0,b=Math.floor(p/t.numHeads);if(u&&l&&x.size(u.dims)&&x.size(l.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==d||u.dims[1]!==t.numHeads||u.dims[3]!==b)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==d||l.dims[1]!==t.numHeads||l.dims[3]!==b)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=u.dims[2],f=u.dims[2]}else if(u&&x.size(u.dims)||l&&x.size(l.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let y;if(o&&x.size(o.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(o.dims.length<3||o.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(o.dims.length===3){if(o.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');y=2,h=o.dims[1]}else if(o.dims.length===5){if(o.dims[2]!==t.numHeads||o.dims[3]!==2||o.dims[4]!==b)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');y=5,h=o.dims[1]}else{if(o.dims[1]!==t.numHeads||o.dims[3]!==b)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');y=0,h=o.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');y=3}if(s&&x.size(s.dims)>0){if(s.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(o&&o.dims.length===5&&o.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let g=m+h,w=0;if(i&&x.size(i.dims)>0){w=8;let I=i.dims;throw I.length===1?I[0]===d?w=1:I[0]===3*d+2&&(w=3):I.length===2&&I[0]===d&&I[1]===g&&(w=5),w===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let _=!1,$=p;if(n&&x.size(n.dims)>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(h!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');$=n.dims[2]}else{if(h!==n.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');$=n.dims[1]*n.dims[3],_=!0}}let v=!1;if(i&&x.size(i.dims)>0)throw new Error("Key padding mask is not supported");if(a&&x.size(a.dims)>0){if(a.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(a.dims[0]!==d||a.dims[1]!==t.numHeads||a.dims[2]!==c||a.dims[3]!==g)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:c,pastSequenceLength:m,kvSequenceLength:h,totalSequenceLength:g,maxSequenceLength:f,inputHiddenSize:0,hiddenSize:p,vHiddenSize:$,headSize:b,vHeadSize:Math.floor($/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:w,scale:t.scale,broadcastResPosBias:v,passPastInKv:_,qkvFormat:y}},Ms=e=>U({...e}),Rs=U({perm:[0,2,1,3]}),xd=(e,t,r,o,n,s,i)=>{let a=[o,n,s],u=x.size(a),l=[{type:12,data:u},{type:12,data:i},{type:12,data:s}],d=c=>{let p=C("qkv_with_bias",t.dataType,a),h=S("qkv",t.dataType,a),m=S("bias",r.dataType,a),f=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${c.registerUniforms(f).declareVariables(h,m,p)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:d},{inputs:[t,r],outputs:[-1]})[0]},mt=(e,t,r,o,n,s,i,a)=>{let u=s;if(i&&x.size(i.dims)>0){if(o===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=xd(e,s,i,t,o,r*n,a),u=u.reshape([t,o,r,n]),r===1||o===1?u:e.compute(pe(u,Rs.perm),{inputs:[u],outputs:[-1]})[0]}else return s.dims.length===3&&(u=s.reshape([t,o,r,n])),r===1||o===1?u:e.compute(pe(u,Rs.perm),{inputs:[u],outputs:[-1]})[0]},Vs=(e,t)=>{let r=vd(e.inputs,t),o=e.inputs[0],n=be(e.inputs,1),s=be(e.inputs,2),i=be(e.inputs,3),a=be(e.inputs,4),u=be(e.inputs,5),l=be(e.inputs,6),d=be(e.inputs,7);if(o.dims.length===5)throw new Error("Packed QKV is not implemented");if(n?.dims.length===5)throw new Error("Packed KV is not implemented");let c=n&&s&&n.dims.length===4&&s.dims.length===4,p=mt(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,o,i,0);if(c)return Qe(e,p,n,s,a,void 0,l,d,u,r);if(!n||!s)throw new Error("key and value must be provided");let h=mt(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,n,i,r.hiddenSize),m=mt(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,s,i,2*r.hiddenSize);Qe(e,p,h,m,a,void 0,l,d,u,r)}});var Sd,Id,Td,Cd,Yr,Us,Ns,Jr=k(()=>{"use strict";M();q();ue();F();Sd=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Id=(e,t)=>{let r=[],o=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),o=r.length),U({numOutputs:o,axis:t.axis,splitSizes:r})},Td=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${D("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Cd=e=>{let t=e.length,r=[];for(let o=0;o<t;++o){let n=e[o].setByIndices("indices","input[global_idx]");t===1?r.push(n):o===0?r.push(`if (output_number == ${o}u) { ${n} }`):o===t-1?r.push(`else { ${n} }`):r.push(`else if (output_number == ${o}) { ${n} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Yr=(e,t)=>{let r=e[0].dims,o=x.size(r),n=e[0].dataType,s=x.normalizeAxis(t.axis,r.length),i=new Array(t.numOutputs),a=S("input",n,r.length),u=new Array(t.numOutputs),l=[],d=[],c=0,p=[{type:12,data:o}];for(let m=0;m<t.numOutputs;m++){c+=t.splitSizes[m],u[m]=c;let f=r.slice();f[s]=t.splitSizes[m],d.push(f),i[m]=C(`output${m}`,n,f.length),l.push({dims:d[m],dataType:e[0].dataType})}p.push({type:12,data:u},...E(r,...d));let h=m=>`
  ${m.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(a,...i)}
  ${Td(u.length)}
  ${Cd(i)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${a.offsetToIndices("global_idx")};
    var index = ${a.indicesGet("indices",s)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${D("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${a.indicesSet("indices",s,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:h,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(o/64)},programUniforms:p})}},Us=(e,t)=>{Sd(e.inputs);let r=e.inputs.length===1?t:Id(e.inputs,t);e.compute(Yr(e.inputs,r),{inputs:[0]})},Ns=e=>{let t=e.axis,r=e.splitSizes,o=e.numOutputs<0?r.length:e.numOutputs;if(o!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return U({axis:t,numOutputs:o,splitSizes:r})}});var Ad,kd,Ls,Ws,Gs=k(()=>{"use strict";ue();Ft();Qr();Jr();Oe();Ad=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],o=e[1],n=e[2],s=e[3],i=e[4];if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let a=!1,u=r.dims[0],l=r.dims[1],d=r.dims.length===3?a?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],c=l,p=0,h=!o||o.dims.length===0,m=Math.floor(h?d/(t.numHeads+2*t.kvNumHeads):d/t.numHeads);h&&(d=m*t.numHeads);let f=s&&s.dims.length!==0,b=i&&i.dims.length!==0;if(f&&s.dims.length===4&&s.dims[0]===u&&s.dims[1]!==t.kvNumHeads&&s.dims[2]===t.kvNumHeads&&s.dims[3]===m)throw new Error("BSNH pastKey/pastValue is not supported");if(f&&b){if(s.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(i.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');p=s.dims[2]}else if(f||b)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let g=1;if(o&&o.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(o.dims.length<3||o.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(o.dims.length===3){if(r.dims[2]%o.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');c=o.dims[1]}else if(o.dims.length===5){if(o.dims[2]!==t.numHeads||o.dims[3]!==2||o.dims[4]!==m)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');c=o.dims[1]}else{if(o.dims[1]!==t.numHeads||o.dims[3]!==m)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');c=o.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');g=3}let w=0,_=!1,$=t.kvNumHeads?m*t.kvNumHeads:d;if(n&&n.dims.length>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(c!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');$=n.dims[2]}else{if(c!==n.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');$=n.dims[1]*n.dims[3],_=!0}}let v=e.length>4?e[5]:void 0;if(v&&v.dims.length!==1&&v.dims[0]!==u)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');let I=-1,T=-1,A=!1;return{batchSize:u,sequenceLength:l,pastSequenceLength:p,kvSequenceLength:c,totalSequenceLength:I,maxSequenceLength:T,inputHiddenSize:0,hiddenSize:d,vHiddenSize:$,headSize:m,vHeadSize:Math.floor($/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:w,scale:t.scale,broadcastResPosBias:A,passPastInKv:_,qkvFormat:g}},kd=U({perm:[0,2,1,3]}),Ls=(e,t,r)=>{let o=t,n=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(o=t.reshape([r.batchSize,r.kvSequenceLength,n,r.headSize]),o=e.compute(pe(o,kd.perm),{inputs:[o],outputs:[-1]})[0]),o},Ws=(e,t)=>{let r=Ad(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let o=e.inputs[0],n=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,s=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,i=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,a=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,u=e.inputs.length>4?e.inputs[5]:void 0,l=e.inputs.length>5?e.inputs[6]:void 0,d=r.kvNumHeads?r.kvNumHeads:r.numHeads,c=U({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,d*r.headSize,d*r.headSize]}),[p,h,m]=!n&&!s?e.compute(Yr([o],c),{inputs:[o],outputs:[-1,-1,-1]}):[o,n,s],f=mt(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,p,void 0,0);Qe(e,f,Ls(e,h,r),Ls(e,m,r),void 0,void 0,i,a,void 0,r,u,l)}});var Hs,Ed,Pd,qs,Fs=k(()=>{"use strict";M();q();Oe();F();Hs=(e,t,r,o,n,s,i,a)=>{let u=re(s),l=u===1?"f32":`vec${u}f`,d=u===1?"vec2f":`mat2x${u}f`,c=n*i,p=64;c===1&&(p=256);let h=[n,i,s/u],m=[n,i,2],f=["rank","type","type"],b=[];b.push(...E(h,m));let y=g=>{let w=S("x",t.dataType,3,u),_=S("scale",r.dataType,r.dims),$=S("bias",o.dataType,o.dims),v=C("output",1,3,2),I=[w,_,$,v];return`
  var<workgroup> workgroup_shared : array<${d}, ${p}>;
  const workgroup_size = ${p}u;
  ${g.declareVariables(...I)}
  ${g.mainStart(p)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${l}(0);
    var squared_sum = ${l}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${l}(${w.get("batch","channel","h")});
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
      let sum_final = ${Ae("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${Ae("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${a}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${a};${p}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:m,dataType:1}],dispatchGroup:{x:c},programUniforms:b}),getShaderSource:y},{inputs:[t,r,o],outputs:[-1]})[0]},Ed=(e,t,r)=>{let o=t[0].dims,n=o,s=2,i=o[0],a=o[1],u=x.sizeFromDimension(o,s),l=re(u),d=x.size(n)/l,c=Hs(e,t[0],t[1],t[2],i,u,a,r.epsilon),p=[i,a,u/l],h=[i,a],m=["type","none"],f=b=>{let y=S("x",t[0].dataType,p.length,l),g=S("scale_shift",1,h.length,2),w=C("output",t[0].dataType,p.length,l),_=[y,g,w];return`
  ${b.registerUniform("output_size","u32").declareVariables(..._)}
  ${b.mainStart()}
  ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${w.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${g.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${y.getByOffset("global_idx")} * ${w.type.value}(scale_shift.x) + ${w.type.value}(scale_shift.y);
      ${w.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:[{type:12,data:d},...E(p,h,p)]}),getShaderSource:f},{inputs:[t[0],c]})},Pd=(e,t,r)=>{let o=t[0].dims,n=o,s=o[0],i=o[o.length-1],a=x.sizeFromDimension(o,1)/i,u=re(i),l=x.size(n)/u,d=[{type:12,data:a},{type:12,data:Math.floor(i/u)}],c=["type","type"],p=!1,h=[0,o.length-1];for(let y=0;y<o.length-2;y++)p=p||o[y+1]!==1,h.push(y+1);p=p&&o[o.length-1]!==1;let m=p?e.compute(pe(e.inputs[0],h),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:o.length},(y,g)=>o[h[g]])),f=Hs(e,m,t[1],t[2],s,a,i,r.epsilon),b=y=>{let g=J(t[0].dataType),w=u===1?"vec2f":`mat${u}x2f`,_=I=>{let T=I===0?"x":"y",A=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${g}(${A}(scale.${T}))`;case 2:return`vec2<${g}>(${A}(scale[0].${T}, scale[1].${T}))`;case 4:return`vec4<${g}>(${A}(scale[0].${T}, scale[1].${T}, scale[2].${T}, scale[3].${T}))`;default:throw new Error(`Not supported compoents ${u}`)}},$=S("input",t[0].dataType,t[0].dims,u),v=C("output",t[0].dataType,n,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${$.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${w}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${v.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${y.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${_(0)}, ${_(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:b},{inputs:[t[0],f]})},qs=(e,t)=>{t.format==="NHWC"?Pd(e,e.inputs,t):Ed(e,e.inputs,t)}});var zd,Bd,Ks,js=k(()=>{"use strict";M();q();F();zd=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Bd=(e,t,r)=>{let o=t.simplified,n=e[0].dims,s=e[1],i=!o&&e[2],a=n,u=x.normalizeAxis(t.axis,n.length),l=x.sizeToDimension(n,u),d=x.sizeFromDimension(n,u),c=x.size(s.dims),p=i?x.size(i.dims):0;if(c!==d||i&&p!==d)throw new Error(`Size of X.shape()[axis:] == ${d}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${c} and bias size of ${p}`);let h=[];for(let $=0;$<n.length;++$)$<u?h.push(n[$]):h.push(1);let m=re(d),f=["type","type"],b=[{type:12,data:l},{type:1,data:d},{type:12,data:Math.floor(d/m)},{type:1,data:t.epsilon}];i&&f.push("type");let y=r>1,g=r>2,w=$=>{let v=J(e[0].dataType),I=[S("x",e[0].dataType,e[0].dims,m),S("scale",s.dataType,s.dims,m)];i&&I.push(S("bias",i.dataType,i.dims,m)),I.push(C("output",e[0].dataType,a,m)),y&&I.push(C("mean_data_output",1,h)),g&&I.push(C("inv_std_output",1,h));let T=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${$.registerUniforms(T).declareVariables(...I)}
  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Br("f32",m)};
    var mean_square_vector = ${Br("f32",m)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Ke(v,m,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Ae("mean_vector",m)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Ae("mean_square_vector",m)} / uniforms.norm_size ${o?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Ke(v,m,"x[j + offset]")};
      let f32scale = ${Ke(v,m,"scale[j]")};
      output[j + offset] = ${I[0].type.value}((f32input ${o?"":"- mean"}) * inv_std_dev * f32scale
        ${i?`+ ${Ke(v,m,"bias[j]")}`:""}
      );
    }

    ${y?"mean_data_output[global_idx] = mean":""};
    ${g?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},_=[{dims:a,dataType:e[0].dataType}];return y&&_.push({dims:h,dataType:1}),g&&_.push({dims:h,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${m};${r};${o}`,inputDependencies:f},getRunData:()=>({outputs:_,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:b}),getShaderSource:w}},Ks=(e,t)=>{zd(e.inputs),e.compute(Bd(e.inputs,t,e.outputCount))}});var Dd,Od,Rd,Zs,Xs,Qs=k(()=>{"use strict";M();q();ue();F();Dd=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],o=r.dims.length;if(r.dims[o-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let n=Math.floor((t.k+t.blockSize-1)/t.blockSize),s=t.blockSize/8*t.bits,i=e[1];if(!x.areEqual(i.dims,[t.n,n,s]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(x.size(u)!==t.n*n)throw new Error("scales input size error.");if(e.length===4){let d=e[3].dims,c=t.bits>4?t.n*n:t.n*Math.floor((n+1)/2);if(x.size(d)!==c)throw new Error("zeroPoints input size error.")}},Od=(e,t)=>{let r=e[0].dims,o=r.length,n=r[o-2],s=t.k,i=t.n,a=r.slice(0,o-2),u=x.size(a),d=e[1].dims[2]/4,c=e[0].dataType,p=re(t.k),h=re(d),m=re(i),f=a.concat([n,i]),b=n>1&&i/m%2===0?2:1,y=x.size(f)/m/b,g=64,w=[],_=[u,n,s/p],$=x.convertShape(e[1].dims).slice();$.splice(-1,1,d/h),w.push(...E(_)),w.push(...E($)),w.push(...E(e[2].dims)),e.length===4&&w.push(...E(x.convertShape(e[3].dims)));let v=[u,n,i/m];w.push(...E(v));let I=T=>{let A=_.length,B=S("a",e[0].dataType,A,p),O=S("b",12,$.length,h),W=S("scales",e[2].dataType,e[2].dims.length),z=[B,O,W],N=e.length===4?S("zero_points",12,e[3].dims.length):void 0;N&&z.push(N);let se=v.length,L=C("output",e[0].dataType,se,m),Z=J(e[0].dataType),K=(()=>{switch(p){case 1:return`array<${Z}, 8>`;case 2:return`mat4x2<${Z}>`;case 4:return`mat2x4<${Z}>`;default:throw new Error(`${p}-component is not supported.`)}})(),V=()=>{let Q=`
          // reuse a data
            var input_offset = ${B.indicesToOffset(`${B.type.indices}(batch, row, word_offset)`)};
            var a_data: ${K};
            for (var j: u32 = 0; j < ${8/p}; j++) {
              a_data[j] = ${B.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let H=0;H<m*b;H++)Q+=`
            b_value = ${h===1?`b${H}_data`:`b${H}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${K}(${Array.from({length:4},(P,R)=>`${Z}(b_value_lower[${R}]), ${Z}(b_value_upper[${R}])`).join(", ")});
            b_dequantized_values = ${(()=>p===1?`${K}(${Array.from({length:8},(P,R)=>`(b_quantized_values[${R}] - ${N?`zero_point${H}`:"zero_point"}) * scale${H}`).join(", ")});`:`(b_quantized_values - ${K}(${Array(8).fill(`${N?`zero_point${H}`:"zero_point"}`).join(",")})) * scale${H};`)()};
            workgroup_shared[local_id.x * ${b} + ${Math.floor(H/m)}]${m>1?`[${H%m}]`:""} += ${Array.from({length:8/p},(P,R)=>`${p===1?`a_data[${R}] * b_dequantized_values[${R}]`:`dot(a_data[${R}], b_dequantized_values[${R}])`}`).join(" + ")};
          `;return Q},ne=()=>{let Q=`
            var col_index = col * ${m};
            ${N?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${Z}(8);`}
            `;for(let H=0;H<m*b;H++)Q+=`
            let scale${H} = ${W.getByOffset("col_index * nBlocksPerCol + block")};
            ${N?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${N.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${H} = ${Z}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return Q},oe=()=>{let Q=`col_index = col * ${m};`;for(let H=0;H<m*b;H++)Q+=`
            let b${H}_data = ${O.getByIndices(`${O.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return Q+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${K};
            var b_dequantized_values: ${K};`,Q};return`
        var<workgroup> workgroup_shared: array<${L.type.value}, ${b*g}>;
        ${T.declareVariables(...z,L)}
        ${T.mainStart([g,1,1])}
          let output_indices = ${L.offsetToIndices(`(global_idx / ${g}) * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${g}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/p};
            ${ne()}
            for (var word: u32 = 0; word < ${d}; word += ${h}) {
              ${oe()}
              for (var i: u32 = 0; i < ${h}; i++) {
                ${V()}
                word_offset += ${8/p};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${b}) {
            var output_value: ${L.type.value} = ${L.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${g}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${b};
            }
            ${L.setByIndices(`${L.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${p};${h};${m};${b};${g}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:f,dataType:c}],dispatchGroup:{x:y},programUniforms:w}),getShaderSource:I}},Rd=(e,t)=>{let r=e[0].dims,o=r.length,n=r[o-2],s=t.k,i=t.n,a=r.slice(0,o-2),u=x.size(a),d=e[1].dims[2]/4,c=e[0].dataType,p=re(t.k),h=re(d),m=a.concat([n,i]),f=128,b=i%8===0?8:i%4===0?4:1,y=f/b,g=y*h*8,w=g/p,_=g/t.blockSize,$=x.size(m)/b,v=[],I=[u,n,s/p],T=x.convertShape(e[1].dims).slice();T.splice(-1,1,d/h),v.push(...E(I)),v.push(...E(T)),v.push(...E(e[2].dims)),e.length===4&&v.push(...E(x.convertShape(e[3].dims)));let A=[u,n,i];v.push(...E(A));let B=O=>{let W=I.length,z=S("a",e[0].dataType,W,p),N=S("b",12,T.length,h),se=S("scales",e[2].dataType,e[2].dims.length),L=[z,N,se],Z=e.length===4?S("zero_points",12,e[3].dims.length):void 0;Z&&L.push(Z);let K=A.length,V=C("output",e[0].dataType,K),ne=J(e[0].dataType),oe=()=>{switch(p){case 1:return`
          let a_data0 = vec4<${ne}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ne}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${ne}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ne}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${p}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${z.type.value}, ${w}>;
        var<workgroup> inter_results: array<array<${V.type.value}, ${y}>, ${b}>;
        ${O.declareVariables(...L,V)}
        ${O.mainStart([y,b,1])}
          let output_indices = ${V.offsetToIndices(`workgroup_index * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${_} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${w};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${w}; a_offset += ${f})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${z.getByIndices(`${z.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${z.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${_} + local_id.x;
            ${Z?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${Z.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${ne}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${ne}(8);`}
            let scale = ${se.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${N.getByIndices(`${N.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/p};
            for (var i: u32 = 0; i < ${h}; i++) {
              ${oe()}
              let b_value = ${h===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${ne}>(${Array.from({length:4},(Q,H)=>`${ne}(b_value_lower[${H}]), ${ne}(b_value_upper[${H}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${ne}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(Q,H)=>`${`dot(a_data${H}, b_dequantized_values[${H}])`}`).join(" + ")};
              word_offset += ${8/p};
            }
            workgroupBarrier();
          }

          if (local_idx < ${b}) {
            var output_value: ${V.type.value} = ${V.type.value}(0);
            for (var b = 0u; b < ${y}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${V.setByIndices(`${V.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${p};${h};${y};${b}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:m,dataType:c}],dispatchGroup:{x:$},programUniforms:v}),getShaderSource:B}},Zs=(e,t)=>{Dd(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Rd(e.inputs,t)):e.compute(Od(e.inputs,t))},Xs=e=>U(e)});var Md,Vd,Ud,Nd,Ld,Wd,Gd,Hd,Ys,Js=k(()=>{"use strict";M();q();F();Md=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Vd=(e,t,r)=>{let o="";for(let n=t-1;n>=0;--n)o+=`
            k = i32(${e.indicesGet("indices",n)}) - ${D("uniforms.pads",n,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${D("uniforms.x_shape",n,t)})) {
              break;
            }
            offset += k * i32(${D("uniforms.x_strides",n,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${o}
            value = x[offset];
          }
      `},Ud=(e,t,r)=>{let o="";for(let n=t-1;n>=0;--n)o+=`
                k = i32(${e.indicesGet("indices",n)}) - ${D("uniforms.pads",n,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${D("uniforms.x_shape",n,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${D("uniforms.x_shape",n,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${D("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${o}
              value = x[offset];
          `},Nd=(e,t,r)=>{let o="";for(let n=t-1;n>=0;--n)o+=`
                k = i32(${e.indicesGet("indices",n)}) - ${D("uniforms.pads",n,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${D("uniforms.x_shape",n,t)})) {
                  k = i32(${D("uniforms.x_shape",n,t)}) - 1;
                }
                offset += k * i32(${D("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${o}
              value = x[offset];
          `},Ld=(e,t,r)=>{let o="";for(let n=t-1;n>=0;--n)o+=`
                k = i32(${e.indicesGet("indices",n)}) - ${D("uniforms.pads",n,r)};
                if (k < 0)  {
                  k += i32(${D("uniforms.x_shape",n,t)}]);
                }
                if (k >= i32(${D("uniforms.x_shape",n,t)})) {
                  k -= i32(${D("uniforms.x_shape",n,t)});
                }
                offset += k * i32(${D("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${o}
              value = x[offset];
          `},Wd=(e,t,r)=>{switch(r.mode){case 0:return Vd(e,t,r.pads.length);case 1:return Ud(e,t,r.pads.length);case 2:return Nd(e,t,r.pads.length);case 3:return Ld(e,t,r.pads.length);default:throw new Error("Invalid mode")}},Gd=(e,t)=>{let r=x.padShape(e[0].dims.slice(),t.pads),o=e[0].dims,n=x.size(r),s=[{type:12,data:n},{type:6,data:t.pads}],i=e.length>=3&&e[2].data;t.mode===0&&s.push({type:i?e[2].dataType:1,data:t.value}),s.push(...E(e[0].dims,r));let a=["rank"],u=l=>{let d=C("output",e[0].dataType,r.length),c=S("x",e[0].dataType,o.length),p=c.type.value,h=Wd(d,o.length,t),m=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&m.push({name:"constant_value",type:i?p:"f32"}),`
            ${l.registerUniforms(m).declareVariables(c,d)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${d.offsetToIndices("global_idx")};

            var value = ${p}(0);
            ${h}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${i}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(x.size(r)/64)},programUniforms:s}),getShaderSource:u}},Hd=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),o=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,n=e[0].dims.length,s=new Int32Array(2*n).fill(0);if(e.length>=4){let a=e[3].getBigInt64Array();for(let u=0;u<a.length;u++)s[Number(a[u])]=Number(r[u]),s[Number(a[u])+n]=Number(r[u+a.length])}else r.forEach((a,u)=>s[Number(u)]=Number(a));let i=[];return s.forEach(a=>i.push(a)),{mode:t.mode,value:o,pads:i}}else return t},Ys=(e,t)=>{Md(e.inputs);let r=Hd(e.inputs,t);e.compute(Gd(e.inputs,r),{inputs:[0]})}});var er,ea,ta,ra,na,qd,Fd,oa,ia,sa,aa,ua,la,da,ca,pa,ma,fa,ha,ga=k(()=>{"use strict";Se();M();q();F();er=e=>{if(te.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},ea=(e,t,r)=>{let o=t.format==="NHWC",n=e.dims.slice();o&&n.splice(1,0,n.pop());let s=Object.hasOwnProperty.call(t,"dilations"),i=t.kernelShape.slice(),a=t.strides.slice(),u=s?t.dilations.slice():[],l=t.pads.slice();qe.adjustPoolAttributes(r,n,i,a,u,l);let d=qe.computePoolOutputShape(r,n,a,u,i,l,t.autoPad),c=Object.assign({},t);s?Object.assign(c,{kernelShape:i,strides:a,pads:l,dilations:u,cacheKey:t.cacheKey}):Object.assign(c,{kernelShape:i,strides:a,pads:l,cacheKey:t.cacheKey});let p=d.slice();return p.push(p.splice(1,1)[0]),[c,o?p:d]},ta=(e,t)=>{let r=t.format==="NHWC",o=x.size(e),n=x.size(t.kernelShape),s=[{type:12,data:o},{type:12,data:n}],i=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let a=t.kernelShape[t.kernelShape.length-1],u=t.strides[t.strides.length-1],l=t.pads[t.pads.length/2-1],d=t.pads[t.pads.length-1],c=!!(l+d);s.push({type:12,data:a},{type:12,data:u},{type:12,data:l},{type:12,data:d}),i.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let p=!1;if(t.kernelShape.length===2){let h=t.kernelShape[t.kernelShape.length-2],m=t.strides[t.strides.length-2],f=t.pads[t.pads.length/2-2],b=t.pads[t.pads.length-2];p=!!(f+b),s.push({type:12,data:h},{type:12,data:m},{type:12,data:f},{type:12,data:b}),i.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[s,i,!0,c,p]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let a=x.computeStrides(t.kernelShape);s.push({type:12,data:a},{type:12,data:t.pads},{type:12,data:t.strides}),i.push({name:"kernelStrides",type:"u32",length:a.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let u=t.pads.reduce((l,d)=>l+d);return[s,i,!!u,!1,!1]}},ra=(e,t,r,o,n,s,i,a,u,l,d,c)=>{let p=n.format==="NHWC",h=t.type.value,m=C("output",t.type.tensor,o);if(n.kernelShape.length<=2){let f="",b="",y="",g=r-(p?2:1);if(d?f=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${g}] < 0 || xIndices[${g}]
                      >= uniforms.x_shape[${g}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`:f=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`,n.kernelShape.length===2){let _=r-(p?3:2);c?b=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${_}] < 0 || xIndices[${_}] >= uniforms.x_shape[${_}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:b=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sh - uniforms.phStart + j;
                `,y=`
              }
            `}return`
            ${e.registerUniforms(u).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var value = ${h}(${a});
              var pad = 0;
              ${b}
              ${f}
              ${y}
              ${i}

              output[global_idx] = value;
            }`}else{if(p)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let f=n.kernelShape.length,b=n.pads.length,y="";return l?y=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${s}
              }`:y=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${s}
            `,`
            ${e.registerUniforms(u).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var offsets: array<u32, ${f}>;

              var value = ${h}(${a});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${f-1}u; j++) {
                  offsets[j] = offset / ${D("uniforms.kernelStrides","j",f)};
                  offset -= offsets[j] * ${D("uniforms.kernelStrides","j",f)};
                }
                offsets[${f-1}] = offset;

                isPad = false;
                for (var j = ${r-f}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${D("uniforms.strides",`j - ${r-f}u`,f)}
                    + offsets[j - ${r-f}u] - ${D("uniforms.pads","j - 2u",b)};
                  ${y}
              }
              ${i}

              output[global_idx] = value;
            }`}},na=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,qd=e=>`${na(e)};${e.countIncludePad}`,Fd=e=>`${na(e)};${e.storageOrder};${e.dilations}`,oa=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),ia=(e,t,r,o)=>{let[n,s]=ea(t,o,r),i=S("x",t.dataType,t.dims.length),a=i.type.value,u="value += x_val;",l="";n.countIncludePad?l+=`value /= ${a}(uniforms.kernelSize);`:l+=`value /= ${a}(i32(uniforms.kernelSize) - pad);`;let[d,c,p,h,m]=ta(s,n);d.push(...E(t.dims,s));let f=["rank"];return{name:e,shaderCache:{hint:`${o.cacheKey};${p};${h};${m}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(x.size(s)/64)},programUniforms:d}),getShaderSource:b=>ra(b,i,t.dims.length,s.length,n,u,l,0,c,p,h,m)}},sa=e=>{let t=e.count_include_pad!==0,r=oa(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let o={countIncludePad:t,...r,cacheKey:""};return{...o,cacheKey:qd(o)}},aa=(e,t)=>{er(e.inputs),e.compute(ia("AveragePool",e.inputs[0],!1,t))},ua={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},la=e=>{let t=e.format;return{format:t,...ua,cacheKey:t}},da=(e,t)=>{er(e.inputs),e.compute(ia("GlobalAveragePool",e.inputs[0],!0,t))},ca=(e,t,r,o)=>{let[n,s]=ea(t,o,r),i=`
      value = max(x_val, value);
    `,a="",u=S("x",t.dataType,t.dims.length),l=["rank"],[d,c,p,h,m]=ta(s,n);return d.push(...E(t.dims,s)),{name:e,shaderCache:{hint:`${o.cacheKey};${p};${h};${m}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(x.size(s)/64)},programUniforms:d}),getShaderSource:f=>ra(f,u,t.dims.length,s.length,n,i,a,t.dataType===10?-65504:-1e5,c,p,h,m)}},pa=(e,t)=>{er(e.inputs),e.compute(ca("MaxPool",e.inputs[0],!1,t))},ma=e=>{let t=e.storage_order,r=e.dilations,o=oa(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(o.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let n={storageOrder:t,dilations:r,...o,cacheKey:""};return{...n,cacheKey:Fd(n)}},fa=e=>{let t=e.format;return{format:t,...ua,cacheKey:t}},ha=(e,t)=>{er(e.inputs),e.compute(ca("GlobalMaxPool",e.inputs[0],!0,t))}});var jd,Zd,ya,ba,wa=k(()=>{"use strict";M();q();ue();F();jd=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,o)=>r===e[2].dims[o]).reduce((r,o)=>r&&o,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((n,s)=>s===t.axis||n===e[0].dims[s]).reduce((n,s)=>n&&s,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],o=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/o)||t.blockSize>Math.ceil(r/(o-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Zd=(e,t)=>{let r=x.normalizeAxis(t.axis,e[0].dims.length),o=e[0].dataType,n=o===3,s=e[0].dims,i=e[1].dataType,a=x.size(s),u=o===3||o===2,l=u?[Math.ceil(x.size(e[0].dims)/4)]:e[0].dims,d=e[1].dims,c=e.length>2?e[2]:void 0,p=c?u?[Math.ceil(x.size(c.dims)/4)]:c.dims:void 0,h=d.length===0||d.length===1&&d[0]===1,m=h===!1&&d.length===1,f=re(a),b=h&&(!u||f===4),y=b?f:1,g=b&&!u?f:1,w=S("input",u?12:o,l.length,g),_=S("scale",i,d.length),$=c?S("zero_point",u?12:o,p.length):void 0,v=C("output",i,s.length,y),I=[w,_];$&&I.push($);let T=[l,d];c&&T.push(p);let A=[{type:12,data:a/y},{type:12,data:r},{type:12,data:t.blockSize},...E(...T,s)],B=O=>{let W=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${O.registerUniforms(W).declareVariables(...I,v)}
      ${O.mainStart()}
          ${O.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${v.offsetToIndices("global_idx")};

          // Set input x
          ${(()=>u?`
            let input = ${w.getByOffset("global_idx / 4")};
            let x_vec = ${n?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${y===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${w.getByOffset("global_idx")};`)()};

          // Set scale input
          ${(()=>h?`let scale_value= ${_.getByOffset("0")}`:m?`
            let scale_index = ${v.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${_.getByOffset("scale_index")};`:`
            var scale_indices: ${_.type.indices} = output_indices;
            let index = ${_.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${_.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${_.getByIndices("scale_indices")};`)()};

          // Set zero-point input
          ${(()=>$?h?u?`
                let zero_point_input = ${$.getByOffset("0")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${$.getByOffset("0")}`:m?u?`
                let zero_point_index = ${v.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${$.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${v.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${$.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${_.indicesToOffset("scale_indices")};
                let zero_point_input = ${$.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${$.getByIndices("scale_indices")};`:`let zero_point_value = ${u?n?"i32":"u32":w.type.value}(0);`)()};
      // Compute and write output
      ${v.setByOffset("global_idx",`${v.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:$?["rank","rank","rank"]:["rank","rank"]},getShaderSource:B,getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:Math.ceil(a/y/64),y:1,z:1},programUniforms:A})}},ya=(e,t)=>{jd(e.inputs,t),e.compute(Zd(e.inputs,t))},ba=e=>U({axis:e.axis,blockSize:e.blockSize})});var Xd,Qd,_a,$a=k(()=>{"use strict";Se();M();F();Xd=(e,t,r)=>{let o=e===t,n=e<t&&r<0,s=e>t&&r>0;if(o||n||s)throw new Error("Range these inputs' contents are invalid.")},Qd=(e,t,r,o)=>{let n=Math.abs(Math.ceil((t-e)/r)),s=[n],i=n,a=[{type:12,data:i},{type:o,data:e},{type:o,data:r},...E(s)],u=l=>{let d=C("output",o,s.length),c=d.type.value,p=[{name:"outputSize",type:"u32"},{name:"start",type:c},{name:"delta",type:c}];return`
        ${l.registerUniforms(p).declareVariables(d)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${c}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${o}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:a})}},_a=e=>{let t=0,r=0,o=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],o=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],o=e.inputs[2].getFloat32Array()[0]),te.webgpu.validateInputContent&&Xd(t,r,o),e.compute(Qd(t,r,o,e.inputs[0].dataType),{inputs:[]})}});var Yd,Jd,ec,tc,rc,nc,oc,ic,sc,ac,uc,va,lc,dc,cc,pc,mc,xa,Sa,Ia=k(()=>{"use strict";M();q();ue();F();Yd=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Jd=(e,t,r)=>{t.every(n=>n>=0&&n<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let o=new Array(r).fill(1);return t.forEach((n,s)=>o[n]=e[s]),o},ec=(e,t,r,o,n,s)=>{let[i,a,u]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],l=e[0].dims.length;if(i>0&&e.length>i&&e[i].dims.length>0)e[i].getFloat32Array().forEach(d=>s.push(d));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(a>0&&e.length>a&&e[a].dims.length===1&&e[a].dims[0]>0){if(e[a].getFloat32Array().forEach(d=>o.push(d)),o.length!==0&&o.length!==l&&r>=18&&o.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Yd(o,t),t.axes.length>0&&Jd(o,t.axes,l).forEach((d,c)=>o[c]=d)}if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0&&(e[u].getBigInt64Array().forEach(d=>n.push(Number(d))),n.length!==0&&n.length!==l&&r>=18&&n.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(o.length!==0&&o.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof o<"u"&&typeof n<"u"&&o.length>0&&n.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},tc=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",rc=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",nc=(e,t,r)=>{let o=new Array(r).fill(0).concat(new Array(r).fill(1)),n=e.length===0?o:e.slice();return t.length>0?(t.forEach((s,i)=>{o[s]=n[i],o[i+r]=n[t.length+i]}),o):n},oc=(e,t,r,o)=>{let n=[];if(r.length>0)if(o.length>0){if(e.forEach(s=>n.push(s)),Math.max(...o)>e.length)throw new Error("axes is out of bound");o.forEach((s,i)=>n[s]=r[i])}else r.forEach(s=>n.push(s));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");n=e.map((s,i)=>Math.round(s*t[i]))}return n},ic=(e,t,r)=>{let o=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(s=>t[s]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(s=>t[s]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let n=e.slice();return r.axes.length>0?(r.axes.forEach(s=>t[s]=o),r.axes.forEach(s=>n[s]=Math.round(e[s]*t[s]))):(t.fill(o,0,t.length),n.forEach((s,i)=>n[i]=Math.round(s*t[i]))),n},sc=(e,t,r,o,n)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${D("uniforms.scales","i",o)};
        var roi_low = ${D("uniforms.roi","i",n)};
        var roi_hi = ${D("uniforms.roi",`i + ${t.length}`,n)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${D("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${D("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,ac=(e,t,r,o,n,s,i)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${o.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${D("uniforms.scales","i",n)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${D("uniforms.roi","i",s)};
          var roi_hi = ${D("uniforms.roi",`i + ${r.length}`,s)};
          var input_shape_i = ${D("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${D("uniforms.output_shape","i",o.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${i} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
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
    }`,uc=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${D("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,va=(e,t,r,o)=>e.rank>o?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",lc=(e,t,r,o,n)=>{let[i,a,u,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(row, ${r[a]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${va(e,l,i,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${a}];
      var col:${d} = originalIndices[${u}];
      ${o?`if (row < 0 || row > (${r[a]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${n};
      }`:""};
      row = max(0, min(row, ${r[a]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${i}])`:"0"};
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
    }`},dc=(e,t,r,o,n,s,i,a,u,l)=>{let d=r.length===2,c=!0,[p,h]=d?[0,1]:c?[2,3]:[1,2],m=e.type.value,f=b=>{let y=b===p?"row":"col";return`
      fn ${y}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${m} {
        var output_index = ${t.indicesGet("output_indices",b)};
        var originalIdx: ${m} = getOriginalCoordinateFromResizedCoordinate(output_index, ${n[b]},
        ${o[b]}, ${r[b]}, ${s[b]}, ${s[b]} + ${r.length});
        var fractOriginalIdx: ${m} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${a} && (originalIdx < 0 || originalIdx > (${r[b]} - 1))) {
          return ${u};
        }
        var data: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${y}: ${m} = originalIdx + ${m}(i);
          if (${y} < 0 || ${y} >= ${r[b]}) {
            ${(()=>l?`coefs[i + 1] = 0.0;
                        continue;`:a?`return ${u};`:`${y} = max(0, min(${y}, ${r[b]} - 1));`)()};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",b,`u32(${y})`)};
          data[i + 1] = ${b===p?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${f(p)};
    ${f(h)};
  fn getCubicInterpolationCoefs(s: ${m}) -> array<${m}, 4> {
    var absS = abs(s);
    var coeffs: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${m} = 1.0 - absS;
    var twoMinusAbsS: ${m} = 2.0 - absS;
    var onePlusAbsS: ${m} = 1.0 + absS;
    coeffs[0] = ((${i} * onePlusAbsS - 5 * ${i}) * onePlusAbsS + 8 * ${i}) * onePlusAbsS - 4 * ${i};
    coeffs[1] = ((${i} + 2) * absS - (${i} + 3)) * absS * absS + 1;
    coeffs[2] = ((${i} + 2) * oneMinusAbsS - (${i} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${i} * twoMinusAbsS - 5 * ${i}) * twoMinusAbsS + 8 * ${i}) * twoMinusAbsS - 4 * ${i};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${m}, 4>, coefs: array<${m}, 4>) -> ${m} {
    var coefsSum: ${m} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${m} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},cc=(e,t,r,o,n)=>{let[i,a,u,l,d]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(depth, ${r[a]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${va(e,d,i,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${c} = originalIndices[${a}];
      var height:${c} = originalIndices[${u}];
      var width:${c} = originalIndices[${l}];
      ${o?`if (depth < 0 || depth > (${r[a]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[l]} - 1)) {
      return ${n};
        }`:""};

    depth = max(0, min(depth, ${r[a]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${i}])`:"0"};

      var x111: ${c} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${c} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${c} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${c} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${c} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${c} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${c} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${c} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${c} = abs(depth - ${c}(depth1));
      var dx2: ${c} = abs(${c}(depth2) - depth);
      var dy1: ${c} = abs(height - ${c}(height1));
      var dy2: ${c} = abs(${c}(height2) - height);
      var dz1: ${c} = abs(width - ${c}(width1));
      var dz2: ${c} = abs(${c}(width2) - width);
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
    }`},pc=(e,t,r,o,n,s)=>{let i=e.dims,a=nc(s,t.axes,i.length),u=oc(i,o,n,t.axes),l=o.slice();o.length===0&&(l=i.map((g,w)=>g===0?1:u[w]/g),t.keepAspectRatioPolicy!=="stretch"&&(u=ic(i,l,t)));let d=C("output",e.dataType,u.length),c=S("input",e.dataType,i.length),p=x.size(u),h=i.length===u.length&&i.every((g,w)=>g===u[w]),m=t.coordinateTransformMode==="tf_crop_and_resize",f=t.extrapolationValue,b=c.type.value,y=g=>`
      ${h?"":`
      ${tc(t.coordinateTransformMode,b)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${uc(c,i)};
              ${rc(t.nearestMode,r,b)};
              ${ac(c,d,i,u,l.length,a.length,m)};
              `;case"linear":return`
              ${sc(d,i,u,l.length,a.length)};
              ${(()=>{if(i.length===2||i.length===4)return`${lc(c,d,i,m,f)}`;if(i.length===3||i.length===5)return`${cc(c,d,i,m,f)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(i.length===2||i.length===4)return`${dc(c,d,i,u,l,a,t.cubicCoeffA,m,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${g.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",a.length).declareVariables(c,d)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${h?"output[global_idx] = input[global_idx];":`
        let output_indices = ${d.offsetToIndices("global_idx")};
        var input_indices: ${c.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${c.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${i.length===2||i.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${l.length>0?l:""}|${n.length>0?n:""}|${a.length>0?a:""}|${h}|${i}`,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},{type:1,data:l},{type:1,data:a},...E(i,u)]})}},mc=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},xa=(e,t)=>{let r=[],o=[],n=[],s=mc(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");ec(e.inputs,t,s,r,o,n),e.compute(pc(e.inputs[0],t,s,r,o,n),{inputs:[0]})},Sa=e=>{let t=e.antialias,r=e.axes,o=e.coordinateTransformMode,n=e.cubicCoeffA,s=e.excludeOutside!==0,i=e.extrapolationValue,a=e.keepAspectRatioPolicy,u=e.mode,l=e.nearestMode===""?"simple":e.nearestMode;return U({antialias:t,axes:r,coordinateTransformMode:o,cubicCoeffA:n,excludeOutside:s,extrapolationValue:i,keepAspectRatioPolicy:a,mode:u,nearestMode:l})}});var fc,hc,Ta,Ca=k(()=>{"use strict";M();q();ue();F();fc=(e,t)=>{let[r,o,n,s]=e,{numHeads:i,rotaryEmbeddingDim:a}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!x.areEqual(o.dims,[])&&!x.areEqual(o.dims,[1])&&o.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${o.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(s.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(!x.areEqual(n.dims,s.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(a>0&&i===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=r.dims[0],l=r.dims[r.dims.length-2],d=n.dims[0],c=x.sizeFromDimension(r.dims,1)/l,p=a===0?n.dims[1]*2:c/i;if(a>p)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(o.dims.length===2){if(u!==o.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${o.dims[0]}`);if(l!==o.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${o.dims[1]}`)}if(p/2!==n.dims[1]&&a/2!==n.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${n.dims[1]}`);if(l>d)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},hc=(e,t)=>{let{interleaved:r,numHeads:o,rotaryEmbeddingDim:n,scale:s}=t,i=e[0].dims[0],a=x.sizeFromDimension(e[0].dims,1),u=e[0].dims[e[0].dims.length-2],l=a/u,d=e[2].dims[1],c=n===0?d*2:l/o,p=new Array(i,u,l/c,c-d),h=x.computeStrides(p),m=[{type:1,data:s},{type:12,data:p},{type:12,data:h},...e[0].dims.length===3?new Array({type:12,data:[a,l,c,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[a,c,u*c,1]}):[],...E(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],f=b=>{let y=S("input",e[0].dataType,e[0].dims.length),g=S("position_ids",e[1].dataType,e[1].dims.length),w=S("cos_cache",e[2].dataType,e[2].dims.length),_=S("sin_cache",e[3].dataType,e[3].dims.length),$=C("output",e[0].dataType,e[0].dims.length);return b.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:p.length},{name:"global_strides",type:"u32",length:h.length},{name:"input_output_strides",type:"u32",length:h.length}]),`
        ${b.declareVariables(y,g,w,_,$)}

        ${b.mainStart(Fe)}
          let half_rotary_emb_dim = uniforms.${w.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${g.broadcastedIndicesToOffset("bsnh.xy",C("",g.type.tensor,2))};
            let position_id =
                u32(${g.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${y.getByOffset("i")} * ${w.get("position_id","bsnh[3]")} -
                ${y.getByOffset("j")} * ${_.get("position_id","bsnh[3]")};
            ${$.setByOffset("i","re")}
            let im = ${y.getByOffset("i")} * ${_.get("position_id","bsnh[3]")} +
                ${y.getByOffset("j")} * ${w.get("position_id","bsnh[3]")};
            ${$.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${$.setByOffset("k",y.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:U({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:f,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(x.size(p)/Fe)},programUniforms:m})}},Ta=(e,t)=>{fc(e.inputs,t),e.compute(hc(e.inputs,t))}});var gc,yc,Aa,ka=k(()=>{"use strict";M();q();F();gc=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],o=e[2];if(t.dataType!==r.dataType||t.dataType!==o.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let n=t.dims[t.dims.length-1],s=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==n)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==s)throw new Error("Skip must have the same sequence length as input");if(o.dims.length!==1)throw new Error("Gamma must be 1D");if(o.dims[o.dims.length-1]!==n)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let i=e[3];if(i.dims.length!==1)throw new Error("Beta must be 1D");if(i.dims[i.dims.length-1]!==n)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let i=e[4];if(i.dims.length!==1)throw new Error("Bias must be 1D");if(i.dims[i.dims.length-1]!==n)throw new Error("Bias must have the same hidden size as input")}},yc=(e,t,r,o)=>{let n=t.simplified,s=e[0].dims,i=x.size(s),a=s,u=i,l=s.slice(-1)[0],d=o?s.slice(0,-1).concat(1):[],c=!n&&e.length>3,p=e.length>4,h=o&&r>1,m=o&&r>2,f=r>3,b=64,y=re(l),g=[{type:12,data:u},{type:12,data:y},{type:12,data:l},{type:1,data:t.epsilon}],w=$=>{let v=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],I=[S("x",e[0].dataType,e[0].dims,y),S("skip",e[1].dataType,e[1].dims,y),S("gamma",e[2].dataType,e[2].dims,y)];c&&I.push(S("beta",e[3].dataType,e[3].dims,y)),p&&I.push(S("bias",e[4].dataType,e[4].dims,y)),I.push(C("output",e[0].dataType,a,y)),h&&I.push(C("mean_output",1,d)),m&&I.push(C("inv_std_output",1,d)),f&&I.push(C("input_skip_bias_sum",e[0].dataType,a,y));let T=J(e[0].dataType),A=J(1,y);return`

      ${$.registerUniforms(v).declareVariables(...I)}
      var<workgroup> sum_shared : array<${A}, ${b}>;
      var<workgroup> sum_squared_shared : array<${A}, ${b}>;

      ${$.mainStart([b,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${b};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${b};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${b-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${p?"bias[offset1d + i]":T+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${f?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Ke(T,y,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${b};
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
        let mean = ${Ae("sum",y)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Ae("square_sum",y)} / f32(uniforms.hidden_size) ${n?"":"- mean * mean"} + uniforms.epsilon);
        ${h?"mean_output[global_idx] = mean;":""}
        ${m?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${n?"":`- ${T}(mean)`}) *
            ${T}(inv_std_dev) * gamma[offset1d + i]
            ${c?"+ beta[offset1d + i]":""};
        }
      }`},_=[{dims:a,dataType:e[0].dataType}];return r>1&&_.push({dims:d,dataType:1}),r>2&&_.push({dims:d,dataType:1}),r>3&&_.push({dims:s,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${y};${h};${m};${f}`,inputDependencies:e.map(($,v)=>"type")},getShaderSource:w,getRunData:()=>({outputs:_,dispatchGroup:{x:Math.ceil(u/l)},programUniforms:g})}},Aa=(e,t)=>{gc(e.inputs);let o=[0];e.outputCount>1&&o.push(-3),e.outputCount>2&&o.push(-3),e.outputCount>3&&o.push(3),e.compute(yc(e.inputs,t,e.outputCount,!1),{outputs:o})}});var bc,tr,wc,Ea,_c,$c,Pa,za,Ba=k(()=>{"use strict";M();q();ue();F();bc=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,o)=>{if(e[o+1].dataType!==6&&e[o+1].dataType!==7)throw new Error(`Input ${o} must be an array of int32 or int64`)})},tr=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(o=>r.push(Number(o)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(o=>r.push(Number(o)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},wc=(e,t)=>{if(e.length>1){let r=tr(e,1),o=tr(e,2),n=tr(e,3);return n.length===0&&(n=[...Array(e[0].dims.length).keys()]),U({starts:r,ends:o,axes:n})}else return t},Ea=(e,t,r,o,n)=>{let s=e;return e<0&&(s+=r[o[t]]),n[t]<0?Math.max(0,Math.min(s,r[o[t]]-1)):Math.max(0,Math.min(s,r[o[t]]))},_c=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${D("uniforms.input_shape","i",r.length)};
            let steps_i = ${D("uniforms.steps","i",r.length)};
            let signs_i = ${D("uniforms.signs","i",r.length)};
            let starts_i = ${D("uniforms.starts","i",r.length)};
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
      }`,$c=(e,t)=>{let r=e[0].dims,o=x.size(r),n=t.axes.length>0?x.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],s=tr(e,4);s.forEach(y=>y!==0||(()=>{throw new Error("step cannot be 0")})),s.length===0&&(s=Array(n.length).fill(1));let i=t.starts.map((y,g)=>Ea(y,g,r,n,s)),a=t.ends.map((y,g)=>Ea(y,g,r,n,s));if(n.length!==i.length||n.length!==a.length)throw new Error("start, ends and axes should have the same number of elements");if(n.length!==r.length)for(let y=0;y<r.length;++y)n.includes(y)||(i.splice(y,0,0),a.splice(y,0,r[y]),s.splice(y,0,1));let u=s.map(y=>Math.sign(y));s.forEach((y,g,w)=>{if(y<0){let _=(a[g]-i[g])/y,$=i[g],v=$+_*s[g];i[g]=v,a[g]=$,w[g]=-y}});let l=r.slice(0);n.forEach((y,g)=>{l[y]=Math.ceil((a[y]-i[y])/s[y])});let d={dims:l,dataType:e[0].dataType},c=C("output",e[0].dataType,l.length),p=S("input",e[0].dataType,e[0].dims.length),h=x.size(l),m=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:i.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:s.length}],f=[{type:12,data:h},{type:12,data:i},{type:6,data:u},{type:12,data:s},...E(e[0].dims,l)],b=y=>`
      ${y.registerUniforms(m).declareVariables(p,c)}
        ${_c(p,c,r)}
        ${y.mainStart()}
          ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${c.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${c.setByOffset("global_idx",p.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${i.length}_${s.length}`,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:[d],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:f})}},Pa=(e,t)=>{bc(e.inputs,t);let r=wc(e.inputs,t);e.compute($c(e.inputs,r),{inputs:[0]})},za=e=>{let t=e.starts,r=e.ends,o=e.axes;return U({starts:t,ends:r,axes:o})}});var vc,xc,Da,Oa,Ra=k(()=>{"use strict";M();q();ue();Oe();F();vc=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},xc=(e,t)=>{let r=e.inputs[0],o=r.dims,n=x.size(o),s=o.length,i=x.normalizeAxis(t.axis,s),a=i<o.length-1,u,l=[];a?(l=Array.from({length:s},(I,T)=>T),l[i]=s-1,l[s-1]=i,u=e.compute(pe(r,l),{inputs:[r],outputs:[-1]})[0]):u=r;let d=u.dims,c=d[s-1],p=n/c,h=re(c),m=c/h,f=64;p===1&&(f=256);let b=(I,T)=>T===4?`max(max(${I}.x, ${I}.y), max(${I}.z, ${I}.w))`:T===2?`max(${I}.x, ${I}.y)`:T===3?`max(max(${I}.x, ${I}.y), ${I}.z)`:I,y=S("x",u.dataType,u.dims,h),g=C("result",u.dataType,u.dims,h),w=y.type.value,_=J(u.dataType)==="f32"?`var threadMax = ${w}(-3.402823e+38f);`:`var threadMax = ${w}(-65504.0h);`,$=I=>`
      var<workgroup> rowMaxShared : ${w};
      var<workgroup> rowSumShared : ${w};
      var<workgroup> threadShared : array<${w}, ${f}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${w} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${w}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${I.registerUniform("packedCols","i32").declareVariables(y,g)}
      ${I.mainStart(f)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${f};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${_}
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
          rowMaxShared = ${w}(${b("threadShared[0]",h)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${w}(0.0);
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
          rowSumShared = ${w}(${Ae("threadShared[0]",h)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,v=e.compute({name:"Softmax",shaderCache:{hint:`${h};${f}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:d,dataType:u.dataType}],dispatchGroup:{x:p},programUniforms:[{type:6,data:m}]}),getShaderSource:$},{inputs:[u],outputs:[a?-1:0]})[0];a&&e.compute(pe(v,l),{inputs:[v]})},Da=(e,t)=>{vc(e.inputs),xc(e,t)},Oa=e=>U({axis:e.axis})});var Ma,Sc,Ic,Tc,Va,Ua=k(()=>{"use strict";M();q();F();Ma=e=>Array.from(e.getBigInt64Array(),Number),Sc=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Ma(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Ic=(e,t)=>{let r=[];for(let o=0;o<e.length;++o)r.push(e[o]*t[o]);return r},Tc=(e,t)=>{let r=e[0].dims,o=t??Ma(e[1]),n=Ic(r,o),s=x.size(n),i=e[0].dataType,a=S("input",i,r.length),u=C("output",i,n.length),l=d=>`
      const inputShape = ${a.indices(...r)};
      ${d.registerUniform("output_size","u32").declareVariables(a,u)}
      ${d.mainStart()}
      ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${a.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${a.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${a.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",a.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${o}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:[{type:12,data:s},...E(e[0].dims,n)]}),getShaderSource:l}},Va=e=>{Sc(e.inputs),e.compute(Tc(e.inputs),{inputs:[0]})}});var Cc,Ac,Na,La=k(()=>{"use strict";M();q();F();Cc=(e,t,r,o,n)=>{let s=C("output_data",n,r.length,4),i=S("a_data",t[1].dataType,t[1].dims.length,4),a=S("b_data",t[2].dataType,t[2].dims.length,4),u=S("c_data",t[0].dataType,t[0].dims.length,4),l,d=(c,p,h)=>`select(${p}, ${c}, ${h})`;if(!o)l=s.setByOffset("global_idx",d(i.getByOffset("global_idx"),a.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let c=(p,h,m="")=>{let f=`a_data[index_a${h}][component_a${h}]`,b=`b_data[index_b${h}][component_b${h}]`,y=`bool(c_data[index_c${h}] & (0xffu << (component_c${h} * 8)))`;return`
            let output_indices${h} = ${s.offsetToIndices(`global_idx * 4u + ${h}u`)};
            let offset_a${h} = ${i.broadcastedIndicesToOffset(`output_indices${h}`,s)};
            let offset_b${h} = ${a.broadcastedIndicesToOffset(`output_indices${h}`,s)};
            let offset_c${h} = ${u.broadcastedIndicesToOffset(`output_indices${h}`,s)};
            let index_a${h} = offset_a${h} / 4u;
            let index_b${h} = offset_b${h} / 4u;
            let index_c${h} = offset_c${h} / 4u;
            let component_a${h} = offset_a${h} % 4u;
            let component_b${h} = offset_b${h} % 4u;
            let component_c${h} = offset_c${h} % 4u;
            ${p}[${h}] = ${m}(${d(f,b,y)});
          `};n===9?l=`
            var data = vec4<u32>(0);
            ${c("data",0,"u32")}
            ${c("data",1,"u32")}
            ${c("data",2,"u32")}
            ${c("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:l=`
            ${c("output_data[global_idx]",0)}
            ${c("output_data[global_idx]",1)}
            ${c("output_data[global_idx]",2)}
            ${c("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(u,i,a,s)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`},Ac=e=>{let t=e[1].dims,r=e[2].dims,o=e[0].dims,n=e[1].dataType,s=!(x.areEqual(t,r)&&x.areEqual(r,o)),i=t,a=x.size(t);if(s){let l=ke.calcShape(ke.calcShape(t,r,!1),o,!1);if(!l)throw new Error("Can't perform where op on the given tensors");i=l,a=x.size(i)}let u=Math.ceil(a/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>Cc(l,e,i,s,n),getRunData:()=>({outputs:[{dims:i,dataType:n}],dispatchGroup:{x:Math.ceil(a/64/4)},programUniforms:[{type:12,data:u},...E(o,t,r,i)]})}},Na=e=>{e.compute(Ac(e.inputs))}});var Wa,Ga=k(()=>{"use strict";Ro();Ft();Uo();Lo();Ti();Mi();Ni();es();as();ds();ms();bs();$s();xs();Ts();ks();zs();Os();Gs();Fs();js();Wr();Qs();Qr();Js();ga();wa();$a();Ht();Ia();Ca();ka();Ba();Ra();Jr();Ua();Oe();jt();La();Wa=new Map([["Abs",[Wo]],["Acos",[Go]],["Acosh",[Ho]],["Add",[Ci]],["ArgMax",[Oo,Rr]],["ArgMin",[Do,Rr]],["Asin",[qo]],["Asinh",[Fo]],["Atan",[Ko]],["Atanh",[jo]],["Attention",[Mo]],["AveragePool",[aa,sa]],["BatchNormalization",[Vo]],["BiasAdd",[No]],["BiasSplitGelu",[Ii]],["Cast",[Xo,Zo]],["Ceil",[Yo]],["Clip",[Qo]],["Concat",[Vi,Ui]],["Conv",[Fr,qr]],["ConvTranspose",[ss,is]],["Cos",[Jo]],["Cosh",[ei]],["CumSum",[us,ls]],["DepthToSpace",[cs,ps]],["DequantizeLinear",[ya,ba]],["Div",[Ai]],["Einsum",[gs,ys]],["Elu",[ti,at]],["Equal",[ki]],["Erf",[ri]],["Exp",[ni]],["Expand",[_s]],["FastGelu",[vs]],["Floor",[oi]],["FusedConv",[Fr,qr]],["Gather",[Is,Ss]],["GatherElements",[Ps,Es]],["GatherBlockQuantized",[Cs,As]],["Gelu",[ii]],["Gemm",[Ds,Bs]],["GlobalAveragePool",[da,la]],["GlobalMaxPool",[ha,fa]],["Greater",[Bi]],["GreaterOrEqual",[Oi]],["GroupQueryAttention",[Ws]],["HardSigmoid",[mi,pi]],["InstanceNormalization",[qs]],["LayerNormalization",[Ks]],["LeakyRelu",[si,at]],["Less",[Di]],["LessOrEqual",[Ri]],["Log",[vi]],["MatMul",[Yi]],["MatMulNBits",[Zs,Xs]],["MaxPool",[pa,ma]],["Mul",[Ei]],["MultiHeadAttention",[Vs,Ms]],["Neg",[ui]],["Not",[ai]],["Pad",[Ys]],["Pow",[Pi]],["QuickGelu",[xi,at]],["Range",[_a]],["Reciprocal",[li]],["ReduceMin",[Ao]],["ReduceMean",[xo]],["ReduceMax",[Co]],["ReduceSum",[Eo]],["ReduceProd",[ko]],["ReduceL1",[So]],["ReduceL2",[Io]],["ReduceLogSum",[zo]],["ReduceLogSumExp",[To]],["ReduceSumSquare",[Po]],["Relu",[di]],["Resize",[xa,Sa]],["RotaryEmbedding",[Ta]],["Sigmoid",[ci]],["Sin",[fi]],["Sinh",[hi]],["Slice",[Pa,za]],["SkipLayerNormalization",[Aa]],["Split",[Us,Ns]],["Sqrt",[gi]],["Softmax",[Da,Oa]],["Sub",[zi]],["Tan",[yi]],["Tanh",[wi]],["ThresholdedRelu",[$i,at]],["Tile",[Va]],["Transpose",[lo,co]],["Where",[Na]]])});var rr,Ha=k(()=>{"use strict";Se();Ce();F();rr=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,r){this.repo.set(t,r)}run(t,r,o,n,s){_e(t.programInfo.name);let i=this.backend.device,a=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let d of r)u.push({binding:u.length,resource:{buffer:d.buffer}});for(let d of o)u.push({binding:u.length,resource:{buffer:d.buffer}});s&&u.push({binding:u.length,resource:s});let l=i.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:u,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let d={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:l,dispatchGroup:n};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d)}a.setPipeline(t.computePipeline),a.setBindGroup(0,l),a.dispatchWorkgroups(...n),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),ye(t.programInfo.name)}dispose(){}build(t,r){_e(t.name);let o=this.backend.device,n=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"},{feature:"subgroups-f16",extension:"subgroups_f16"}].forEach(c=>{o.features.has(c.feature)&&n.push(`enable ${c.extension};`)});let i=ao(r,this.backend.device.limits),a=t.getShaderSource(i),u=`${n.join(`
`)}
${i.additionalImplementations}
${a}`,l=o.createShaderModule({code:u,label:t.name});j("verbose",()=>`[WebGPU] ${t.name} shader code: ${u}`);let d=o.createComputePipeline({compute:{module:l,entryPoint:"main"},layout:"auto",label:t.name});return ye(t.name),{programInfo:t,computePipeline:d,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(t){let r=typeof t=="number"?t:t.x,o=typeof t=="number"?1:t.y||1,n=typeof t=="number"?1:t.z||1,s=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=s&&o<=s&&n<=s)return[r,o,n];let i=r*o*n,a=Math.ceil(Math.sqrt(i));if(a>s){if(a=Math.ceil(Math.cbrt(i)),a>s)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[a,a,a]}else return[a,a,1]}}});var kc,Ec,en,tn,nr,qa=k(()=>{"use strict";Se();M();Ce();Sr();oo();Ga();Ha();kc=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let o=0;o<e.length;++o){let n=e[o].dataType;switch(t[o]){case"none":{r.push("");break}case"type":{r.push(`${n}`);break}case"rank":{let s=e[o].dims.length;r.push(`${n};${s}`);break}case"dims":{let s=e[o].dims.join(",");r.push(`${n};${s}`);break}default:throw new Error(`unsupported input dependency: ${t[o]}`)}}return r.join("|")},Ec=(e,t,r)=>{let o=e.name;return e.shaderCache?.hint&&(o+="["+e.shaderCache.hint+"]"),o+=":"+r+`:${kc(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,o},en=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},tn=class{constructor(t){this.subgroupsSupported=t.features.has("subgroups"),this.subgroupsF16Supported=t.features.has("subgroups");let r=t.limits;!this.subgroupsSupported||!r.minSubgroupSize||!r.maxSubgroupSize?this.subgroupSizeRange=void 0:this.subgroupSizeRange=[r.minSubgroupSize,r.maxSubgroupSize]}},nr=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,r){this.env=t;let o=[],n={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:o},s=i=>r.features.has(i)&&o.push(i)&&!0;s("chromium-experimental-timestamp-query-inside-passes")||s("timestamp-query"),s("shader-f16"),s("subgroups")&&s("subgroups-f16"),this.device=await r.requestDevice(n),this.deviceInfo=new tn(this.device),this.adapterInfo=new en(r.info||await r.requestAdapterInfo()),this.gpuDataManager=no(this),this.programManager=new rr(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Ut(t.logLevel,!!t.debug),this.device.onuncapturederror=i=>{i.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${i.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;_e(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(t.getMappedRange()),o=this.pendingQueries.get(t);for(let n=0;n<r.length/2;n++){let s=o[n],i=s.kernelId,a=this.kernels.get(i),u=a.kernelType,l=a.kernelName,d=s.programName,c=s.inputTensorViews,p=s.outputTensorViews,h=r[n*2],m=r[n*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=h);let f=Number(h-this.queryTimeBase),b=Number(m-this.queryTimeBase);if(!Number.isSafeInteger(f)||!Number.isSafeInteger(b))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map(y=>({dims:y.dims,dataType:Ve(y.dataType)})),outputsMetadata:p.map(y=>({dims:y.dims,dataType:Ve(y.dataType)})),kernelId:i,kernelType:u,kernelName:l,programName:d,startTime:f,endTime:b});else{let y="";c.forEach((w,_)=>{y+=`input[${_}]: [${w.dims}] | ${Ve(w.dataType)}, `});let g="";p.forEach((w,_)=>{g+=`output[${_}]: [${w.dims}] | ${Ve(w.dataType)}, `}),console.log(`[profiling] kernel "${i}|${u}|${l}|${d}" ${y}${g}execution time: ${b-f} ns`)}vt("GPU",`${d}::${h}::${m}`)}t.unmap(),this.pendingQueries.delete(t)}),ye()}run(t,r,o,n,s,i){_e(t.name);let a=[];for(let w=0;w<r.length;++w){let _=r[w].data;if(_===0)continue;let $=this.gpuDataManager.get(_);if(!$)throw new Error(`no GPU data for input: ${_}`);a.push($)}let{outputs:u,dispatchGroup:l,programUniforms:d}=t.getRunData(r),c=o.length===0?u.map((w,_)=>_):o;if(c.length!==u.length)throw new Error(`Output size ${c.length} must be equal to ${u.length}.`);let p=[],h=[];for(let w=0;w<u.length;++w){if(!Number.isInteger(c[w])||c[w]<-3||c[w]>=i)throw new Error(`Invalid output index: ${c[w]}`);if(c[w]===-3)continue;let _=c[w]===-1,$=c[w]===-2,v=_||$?s(u[w].dataType,u[w].dims):n(c[w],u[w].dataType,u[w].dims);if(p.push(v),v.data===0)continue;let I=this.gpuDataManager.get(v.data);if(!I)throw new Error(`no GPU data for output: ${v.data}`);if(_&&this.temporaryData.push(I),$){let T=this.kernelPersistentData.get(this.currentKernelId);T||(T=[],this.kernelPersistentData.set(this.currentKernelId,T)),T.push(I)}h.push(I)}if(a.length!==r.length||h.length!==p.length){if(h.length===0)return ye(t.name),p;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let m;if(d){let w=0,_=[];d.forEach(T=>{let A=typeof T.data=="number"?[T.data]:T.data;if(A.length===0)return;let B=T.type===10?2:4,O,W;T.type===10?(W=A.length>4?16:A.length>2?8:A.length*B,O=A.length>4?16:B*A.length):(W=A.length<=2?A.length*B:16,O=16),w=Math.ceil(w/W)*W,_.push(w);let z=T.type===10?8:4;w+=A.length>4?Math.ceil(A.length/z)*O:A.length*B});let $=16;w=Math.ceil(w/$)*$;let v=new ArrayBuffer(w);d.forEach((T,A)=>{let B=_[A],O=typeof T.data=="number"?[T.data]:T.data;if(T.type===6)new Int32Array(v,B,O.length).set(O);else if(T.type===12)new Uint32Array(v,B,O.length).set(O);else if(T.type===10)new Uint16Array(v,B,O.length).set(O);else if(T.type===1)new Float32Array(v,B,O.length).set(O);else throw new Error(`Unsupported uniform type: ${Ve(T.type)}`)});let I=this.gpuDataManager.create(w,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(I.buffer,0,v,0,w),this.gpuDataManager.release(I.id),m={offset:0,size:w,buffer:I.buffer}}let f=this.programManager.normalizeDispatchGroupSize(l),b=f[1]===1&&f[2]===1,y=Ec(t,r,b),g=this.programManager.getArtifact(y);if(g||(g=this.programManager.build(t,f),this.programManager.setArtifact(y,g),j("info",()=>`[artifact] key: ${y}, programName: ${t.name}`)),d&&g.uniformVariablesInfo){if(d.length!==g.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${g.uniformVariablesInfo.length}, got ${d.length} in program "${g.programInfo.name}".`);for(let w=0;w<d.length;w++){let _=d[w],$=_.type,v=typeof _.data=="number"?1:_.data.length,[I,T]=g.uniformVariablesInfo[w];if($!==I||v!==T)throw new Error(`Uniform variable ${w} mismatch: expect type ${I} with size ${T}, got type ${$} with size ${v} in program "${g.programInfo.name}".`)}}if(j("info",()=>`[ProgramManager] run "${t.name}" (key=${y}) with ${f[0]}x${f[1]}x${f[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let w={kernelId:this.currentKernelId,programName:g.programInfo.name,inputTensorViews:r,outputTensorViews:p};this.pendingKernels.push(w),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(w)}return this.programManager.run(g,a,h,f,m),ye(t.name),p}upload(t,r){this.gpuDataManager.upload(t,r)}memcpy(t,r){this.gpuDataManager.memcpy(t,r)}async download(t,r){await this.gpuDataManager.download(t,r)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,r,o,n){let s=Wa.get(t);if(!s)throw new Error(`kernel not implemented: ${t}`);let i={kernelType:t,kernelName:n,kernelEntry:s[0],attributes:[s[1],o]};this.kernels.set(r,i)}releaseKernel(t){let r=this.kernelPersistentData.get(t);if(r){for(let o of r)this.gpuDataManager.release(o.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,r,o){let n=this.kernels.get(t);if(!n)throw new Error(`kernel not created: ${t}`);let s=n.kernelType,i=n.kernelName,a=n.kernelEntry,u=n.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${s}] ${i}" is not allowed to be called recursively`);this.currentKernelId=t,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),j("info",()=>`[WebGPU] Start to run kernel "[${s}] ${i}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),a(r,u[1]),0}catch(d){return o.push(Promise.resolve(`[WebGPU] Kernel "[${s}] ${i}" failed. ${d}`)),1}finally{l&&o.push(this.device.popErrorScope().then(d=>d?`GPU validation error for kernel "[${s}] ${i}": ${d.message}`:null));for(let d of this.temporaryData)this.gpuDataManager.release(d.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,r,o,n){let s=this.sessionExternalDataMapping.get(t);s||(s=new Map,this.sessionExternalDataMapping.set(t,s));let i=s.get(r),a=this.gpuDataManager.registerExternalBuffer(o,n,i);return s.set(r,[a,o]),a}unregisterBuffers(t){let r=this.sessionExternalDataMapping.get(t);r&&(r.forEach(o=>this.gpuDataManager.unregisterExternalBuffer(o[0])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let r=this.gpuDataManager.get(t);if(!r)throw new Error(`no GPU data for buffer: ${t}`);return r.buffer}createDownloader(t,r,o){return async()=>{let n=await Ar(this,t,r);return Nt(n.buffer,o)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){j("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){j("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){j("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),o=t.length;this.pendingKernels=[];for(let n=0;n<o;n++){let s=this.getComputePassEncoder(),i=t[n];this.writeTimestamp(this.pendingDispatchNumber*2),s.setPipeline(i.computePipeline),s.setBindGroup(0,i.bindGroup),s.dispatchWorkgroups(...i.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[n]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});var Pc,Fa,zc,Ka,or,ir,rn,ja,Za=k(()=>{"use strict";Ce();Pc=1,Fa=()=>Pc++,zc=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Ka=(e,t)=>{let r=zc.get(e);if(!r)throw new Error("Unsupported data type.");return Math.ceil(t.reduce((o,n)=>o*n)*r/8)},or=class{constructor(t){this.sessionId=t.sessionId,this.mlContext=t.context,this.mlTensor=t.tensor,this.dataType=t.dataType,this.tensorShape=t.shape}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return Ka(this.dataType,this.tensorShape)}destroy(){j("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(t){this.mlContext.writeTensor(this.mlTensor,t)}async read(t){return t?this.mlContext.readTensor(this.mlTensor,t):this.mlContext.readTensor(this.mlTensor)}sameTypeAndShape(t,r){return this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((o,n)=>o===r[n])}},ir=class{constructor(t,r){this.tensorManager=t;this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(t,r,o){if(this.wrapper){if(this.wrapper.sameTypeAndShape(t,r))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==Ka(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let n=MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(t,r,n,!0,!0),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(t){if(this.wrapper)if(t.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else j("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(t){if(this.activeUpload)if(t){t instanceof ArrayBuffer?new Uint8Array(t).set(this.activeUpload):new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(this.activeUpload);return}else return this.activeUpload.buffer;if(!this.wrapper)throw new Error("Tensor has not been created.");return t?this.wrapper.read(t):this.wrapper.read()}},rn=class{constructor(t){this.backend=t;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}reserveTensorId(){let t=Fa();return this.tensorTrackersById.set(t,new ir(this)),t}releaseTensorId(t){let r=this.tensorTrackersById.get(t);r&&(this.tensorTrackersById.delete(t),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(t,r,o,n){j("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${o}, copyOld: ${n}}`);let s=this.tensorTrackersById.get(t);if(!s)throw new Error("Tensor not found.");return s.ensureTensor(r,o,n)}upload(t,r){let o=this.tensorTrackersById.get(t);if(!o)throw new Error("Tensor not found.");o.upload(r)}async download(t,r){j("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${t}, dstBuffer: ${r?.byteLength}}`);let o=this.tensorTrackersById.get(t);if(!o)throw new Error("Tensor not found.");return o.download(r)}releaseTensorsForSession(t){for(let r of this.freeTensors)r.sessionId===t&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==t)}registerTensor(t,r,o,n){let s=Fa(),i=new or({sessionId:this.backend.currentSessionId,context:t,tensor:r,dataType:o,shape:n});return this.tensorTrackersById.set(s,new ir(this,i)),this.externalTensors.add(i),s}async getCachedTensor(t,r,o,n,s){let i=this.backend.currentSessionId;for(let[l,d]of this.freeTensors.entries())if(d.sameTypeAndShape(t,r)){j("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, shape: ${r}}`);let c=this.freeTensors.splice(l,1)[0];return c.sessionId=i,c}let a=this.backend.currentContext;j("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, shape: ${r}}`);let u=await a.createTensor({dataType:t,shape:r,dimensions:r,usage:o,writable:n,readable:s});return new or({sessionId:i,context:a,tensor:u,dataType:t,shape:r})}releaseTensor(t){this.externalTensors.has(t)&&this.externalTensors.delete(t),this.freeTensors.push(t)}},ja=(...e)=>new rn(...e)});var Xa,Bc,sr,Qa=k(()=>{"use strict";M();Me();Sr();Za();Ce();Xa=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Bc=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),o=Object.keys(t).sort();return r.length===o.length&&r.every((n,s)=>n===o[s]&&e[n]===t[n])},sr=class{constructor(t){this.tensorManager=ja(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];Ut(t.logLevel,!!t.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(t){this.activeSessionId=t}async createMLContext(t){if(t instanceof GPUDevice){let o=this.mlContextCache.findIndex(n=>n.gpuDevice===t);if(o!==-1)return this.mlContextCache[o].mlContext;{let n=await navigator.ml.createContext(t);return this.mlContextCache.push({gpuDevice:t,mlContext:n}),n}}else if(t===void 0){let o=this.mlContextCache.findIndex(n=>n.options===void 0&&n.gpuDevice===void 0);if(o!==-1)return this.mlContextCache[o].mlContext;{let n=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:n}),n}}let r=this.mlContextCache.findIndex(o=>Bc(o.options,t));if(r!==-1)return this.mlContextCache[r].mlContext;{let o=await navigator.ml.createContext(t);return this.mlContextCache.push({options:t,mlContext:o}),o}}get currentContext(){let t=this.getMLContext(this.currentSessionId);if(!t)throw new Error(`No MLContext found for session ${this.currentSessionId}`);return t}registerMLContext(t,r){this.mlContextBySessionId.set(t,r);let o=this.sessionIdsByMLContext.get(r);o||(o=new Set,this.sessionIdsByMLContext.set(r,o)),o.add(t)}onReleaseSession(t){let r=this.mlContextBySessionId.get(t);if(!r)return;this.tensorManager.releaseTensorsForSession(t),this.mlContextBySessionId.delete(t);let o=this.sessionIdsByMLContext.get(r);if(o.delete(t),o.size===0){this.sessionIdsByMLContext.delete(r);let n=this.mlContextCache.findIndex(s=>s.mlContext===r);n!==-1&&this.mlContextCache.splice(n,1)}}getMLContext(t){return this.mlContextBySessionId.get(t)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(t){j("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t)}async ensureTensor(t,r,o,n){let s=Xa.get(r);if(!s)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(t,s,o,n)}uploadTensor(t,r){if(!ae().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");j("verbose",()=>`[WebNN] uploadTensor {tensorId: ${t}, data: ${r.byteLength}}`),this.tensorManager.upload(t,r)}async downloadTensor(t,r){return this.tensorManager.download(t,r)}createMLTensorDownloader(t,r){return async()=>{let o=await this.tensorManager.download(t);return Nt(o,r)}}registerMLTensor(t,r,o){let n=Xa.get(r);if(!n)throw new Error(`Unsupported ONNX data type: ${r}`);let s=this.tensorManager.registerTensor(this.currentContext,t,n,o);return j("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${n}, dimensions: ${o}} -> {tensorId: ${s}}`),s}registerMLConstant(t,r,o,n,s,i){if(!i)throw new Error("External mounted files are not available.");let a=t;t.startsWith("./")&&(a=t.substring(2));let u=i.get(a);if(!u)throw new Error(`File with name ${a} not found in preloaded files.`);if(r+o>u.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let l=u.slice(r,r+o).buffer,d;switch(s.dataType){case"float32":d=new Float32Array(l);break;case"float16":d=new Uint16Array(l);break;case"int32":d=new Int32Array(l);break;case"uint32":d=new Uint32Array(l);break;case"int64":d=new BigInt64Array(l);break;case"uint64":d=new BigUint64Array(l);break;case"int8":d=new Int8Array(l);break;case"int4":case"uint4":case"uint8":d=new Uint8Array(l);break;default:throw new Error(`Unsupported data type: ${s.dataType} in creating WebNN Constant from external data.`)}return j("verbose",()=>`[WebNN] registerMLConstant {dataType: ${s.dataType}, shape: ${s.shape}}}`),n.constant(s,d)}flush(){}}});var Ya={};gt(Ya,{init:()=>Dc});var ft,nn,Dc,Ja=k(()=>{"use strict";M();qa();Ce();q();Qa();ft=class e{constructor(t,r,o,n){this.module=t;this.dataType=r;this.data=o;this.dims=n}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=x.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=x.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=x.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=x.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(x.size(t)!==x.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},nn=class{constructor(t,r,o){this.module=t;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo,this.deviceInfo=r.deviceInfo;let n=t.PTR_SIZE,s=o/t.PTR_SIZE,i=n===4?"i32":"i64";this.opKernelContext=Number(t.getValue(n*s++,i));let a=Number(t.getValue(n*s++,i));this.outputCount=Number(t.getValue(n*s++,i)),this.customDataOffset=Number(t.getValue(n*s++,"*")),this.customDataSize=Number(t.getValue(n*s++,i));let u=[];for(let l=0;l<a;l++){let d=Number(t.getValue(n*s++,i)),c=Number(t.getValue(n*s++,"*")),p=Number(t.getValue(n*s++,i)),h=[];for(let m=0;m<p;m++)h.push(Number(t.getValue(n*s++,i)));u.push(new ft(t,d,c,h))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(t,r){let o=r?.inputs?.map(a=>typeof a=="number"?this.inputs[a]:a)??this.inputs,n=r?.outputs??[],s=(a,u,l)=>new ft(this.module,u,this.output(a,l),l),i=(a,u)=>{let l=He(a,u);if(!l)throw new Error(`Unsupported data type: ${a}`);let d=l>0?this.backend.gpuDataManager.create(l).id:0;return new ft(this.module,a,d,u)};return this.backend.run(t,o,n,s,i,this.outputCount)}output(t,r){let o=this.module.stackSave();try{let n=this.module.PTR_SIZE,s=n===4?"i32":"i64",i=this.module.stackAlloc((1+r.length)*n);this.module.setValue(i,r.length,s);for(let a=0;a<r.length;a++)this.module.setValue(i+n*(a+1),r[a],s);return this.module._JsepOutput(this.opKernelContext,t,i)}catch(n){throw new Error(`Failed to generate kernel's output[${t}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${n}`)}finally{this.module.stackRestore(o)}}},Dc=async(e,t,r,o)=>{let n=t.jsepInit;if(!n)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let s=new nr;await s.initialize(r,o),n("webgpu",[s,i=>s.alloc(Number(i)),i=>s.free(i),(i,a,u,l=!1)=>{if(l)j("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(i)}, dst=${Number(a)}, size=${Number(u)}`),s.memcpy(Number(i),Number(a));else{j("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(i)}, gpuDataId=${Number(a)}, size=${Number(u)}`);let d=t.HEAPU8.subarray(Number(i>>>0),Number(i>>>0)+Number(u));s.upload(Number(a),d)}},async(i,a,u)=>{j("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${i}, dataOffset=${a}, size=${u}`),await s.download(Number(i),()=>t.HEAPU8.subarray(Number(a)>>>0,Number(a+u)>>>0))},(i,a,u)=>s.createKernel(i,Number(a),u,t.UTF8ToString(t._JsepGetNodeName(Number(a)))),i=>s.releaseKernel(i),(i,a,u,l)=>{j("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${u}, kernel=${i}, contextDataOffset=${a}`);let d=new nn(t,s,Number(a));return s.computeKernel(Number(i),d,l)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let s=new sr(r);n("webnn",[s,()=>s.reserveTensorId(),i=>s.releaseTensorId(i),async(i,a,u,l)=>s.ensureTensor(i,a,u,l),(i,a)=>{s.uploadTensor(i,a)},async(i,a)=>s.downloadTensor(i,a)])}}});var Oc,Ct,At,je,Rc,rt,kt,Et,eu,Pt,zt,Bt,wr=k(()=>{"use strict";Zn();Qn();M();Me();Ot();xr();Oc=(e,t)=>{ae()._OrtInit(e,t)!==0&&X("Can't initialize onnxruntime.")},Ct=async e=>{Oc(e.wasm.numThreads,it(e.logLevel))},At=async(e,t)=>{{let r=(Ja(),fr(Ya)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let o=e.webgpu.adapter;if(o){if(typeof o.limits!="object"||typeof o.features!="object"||typeof o.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let n=e.webgpu.powerPreference;if(n!==void 0&&n!=="low-power"&&n!=="high-performance")throw new Error(`Invalid powerPreference setting: "${n}"`);let s=e.webgpu.forceFallbackAdapter;if(s!==void 0&&typeof s!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${s}"`);if(o=await navigator.gpu.requestAdapter({powerPreference:n,forceFallbackAdapter:s}),!o)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",ae(),e,o)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",ae(),e)}}},je=new Map,Rc=e=>{let t=ae(),r=t.stackSave();try{let o=t.PTR_SIZE,n=t.stackAlloc(2*o);t._OrtGetInputOutputCount(e,n,n+o)!==0&&X("Can't get session input/output count.");let i=o===4?"i32":"i64";return[Number(t.getValue(n,i)),Number(t.getValue(n+o,i))]}finally{t.stackRestore(r)}},rt=e=>{let t=ae(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},kt=async(e,t)=>{let r,o,n=ae();Array.isArray(e)?[r,o]=e:e.buffer===n.HEAPU8.buffer?[r,o]=[e.byteOffset,e.byteLength]:[r,o]=rt(e);let s=0,i=0,a=0,u=[],l=[],d=[];try{if([i,u]=Xn(t),t?.externalData&&n.mountExternalData){let g=[];for(let w of t.externalData){let _=typeof w=="string"?w:w.path;g.push(st(typeof w=="string"?w:w.data).then($=>{n.mountExternalData(_,$)}))}await Promise.all(g)}for(let g of t?.executionProviders??[])if((typeof g=="string"?g:g.name)==="webnn"){if(n.shouldTransferToMLTensor=!1,n.currentContext)throw new Error("WebNN execution provider is already set.");if(typeof g!="string"){let _=g,$=_?.context,v=_?.gpuDevice,I=_?.deviceType,T=_?.powerPreference;$?n.currentContext=$:v?n.currentContext=await n.jsepCreateMLContext(v):n.currentContext=await n.jsepCreateMLContext({deviceType:I,powerPreference:T})}else n.currentContext=await n.jsepCreateMLContext();break}s=await n._OrtCreateSession(r,o,i),s===0&&X("Can't create a session."),n.jsepOnCreateSession?.(),n.currentContext&&(n.jsepRegisterMLContext(s,n.currentContext),n.currentContext=void 0,n.shouldTransferToMLTensor=!0);let[c,p]=Rc(s),h=!!t?.enableGraphCapture,m=[],f=[],b=[];for(let g=0;g<c;g++){let w=n._OrtGetInputName(s,g);w===0&&X("Can't get an input name."),l.push(w),m.push(n.UTF8ToString(w))}for(let g=0;g<p;g++){let w=n._OrtGetOutputName(s,g);w===0&&X("Can't get an output name."),d.push(w);let _=n.UTF8ToString(w);f.push(_);{if(h&&t?.preferredOutputLocation===void 0){b.push("gpu-buffer");continue}let $=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[_]??"cpu";if($!=="cpu"&&$!=="cpu-pinned"&&$!=="gpu-buffer"&&$!=="ml-tensor")throw new Error(`Not supported preferred output location: ${$}.`);if(h&&$!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${$}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);b.push($)}}let y=null;return b.some(g=>g==="gpu-buffer"||g==="ml-tensor")&&(a=n._OrtCreateBinding(s),a===0&&X("Can't create IO binding."),y={handle:a,outputPreferredLocations:b,outputPreferredLocationsEncoded:b.map(g=>vr(g))}),je.set(s,[s,l,d,y,h,!1]),[s,m,f]}catch(c){throw l.forEach(p=>n._OrtFree(p)),d.forEach(p=>n._OrtFree(p)),a!==0&&n._OrtReleaseBinding(a)!==0&&X("Can't release IO binding."),s!==0&&n._OrtReleaseSession(s)!==0&&X("Can't release session."),c}finally{n._free(r),i!==0&&n._OrtReleaseSessionOptions(i)!==0&&X("Can't release session options."),u.forEach(c=>n._free(c)),n.unmountExternalData?.()}},Et=e=>{let t=ae(),r=je.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[o,n,s,i,a]=r;i&&(a&&t._OrtClearBoundOutputs(i.handle)!==0&&X("Can't clear bound outputs."),t._OrtReleaseBinding(i.handle)!==0&&X("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),n.forEach(u=>t._OrtFree(u)),s.forEach(u=>t._OrtFree(u)),t._OrtReleaseSession(o)!==0&&X("Can't release session."),je.delete(e)},eu=(e,t,r,o,n,s=!1)=>{if(!e){t.push(0);return}let i=ae(),a=i.PTR_SIZE,u=e[0],l=e[1],d=e[3],c,p;if(u==="string"&&(d==="gpu-buffer"||d==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&d!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${n} when enableGraphCapture is true.`);if(d==="gpu-buffer"){let f=e[2].gpuBuffer;p=He(ot(u),l);let b=i.jsepRegisterBuffer;if(!b)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');c=b(o,n,f,p)}else if(d==="ml-tensor"){let f=e[2].mlTensor;p=He(ot(u),l);let b=i.jsepRegisterMLTensor;if(!b)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');c=b(f,ot(u),l)}else{let f=e[2];if(Array.isArray(f)){p=a*f.length,c=i._malloc(p),r.push(c);for(let b=0;b<f.length;b++){if(typeof f[b]!="string")throw new TypeError(`tensor data at index ${b} is not a string`);i.setValue(c+b*a,de(f[b],r),"*")}}else p=f.byteLength,c=i._malloc(p),r.push(c),i.HEAPU8.set(new Uint8Array(f.buffer,f.byteOffset,p),c)}let h=i.stackSave(),m=i.stackAlloc(4*l.length);try{l.forEach((b,y)=>i.setValue(m+y*a,b,a===4?"i32":"i64"));let f=i._OrtCreateTensor(ot(u),c,p,m,l.length,vr(d));f===0&&X(`Can't create tensor for input/output. session=${o}, index=${n}.`),t.push(f)}finally{i.stackRestore(h)}},Pt=async(e,t,r,o,n,s)=>{let i=ae(),a=i.PTR_SIZE,u=je.get(e);if(!u)throw new Error(`cannot run inference. invalid session id: ${e}`);let l=u[0],d=u[1],c=u[2],p=u[3],h=u[4],m=u[5],f=t.length,b=o.length,y=0,g=[],w=[],_=[],$=[],v=i.stackSave(),I=i.stackAlloc(f*a),T=i.stackAlloc(f*a),A=i.stackAlloc(b*a),B=i.stackAlloc(b*a);try{i.jsepOnRunStart?.(l),[y,g]=jn(s);for(let z=0;z<f;z++)eu(r[z],w,$,e,t[z],h);for(let z=0;z<b;z++)eu(n[z],_,$,e,f+o[z],h);for(let z=0;z<f;z++)i.setValue(I+z*a,w[z],"*"),i.setValue(T+z*a,d[t[z]],"*");for(let z=0;z<b;z++)i.setValue(A+z*a,_[z],"*"),i.setValue(B+z*a,c[o[z]],"*");if(p&&!m){let{handle:z,outputPreferredLocations:N,outputPreferredLocationsEncoded:se}=p;if(d.length!==f)throw new Error(`input count from feeds (${f}) is expected to be always equal to model's input count (${d.length}).`);for(let L=0;L<f;L++){let Z=t[L];await i._OrtBindInput(z,d[Z],w[L])!==0&&X(`Can't bind input[${L}] for session=${e}.`)}for(let L=0;L<b;L++){let Z=o[L];n[L]?.[3]?i._OrtBindOutput(z,c[Z],_[L],0)!==0&&X(`Can't bind pre-allocated output[${L}] for session=${e}.`):i._OrtBindOutput(z,c[Z],0,se[Z])!==0&&X(`Can't bind output[${L}] to ${N[L]} for session=${e}.`)}je.set(e,[l,d,c,p,h,!0])}let O;p?O=await i._OrtRunWithBinding(l,p.handle,b,A,y):O=await i._OrtRun(l,T,I,f,B,b,A,y),O!==0&&X("failed to call OrtRun().");let W=[];for(let z=0;z<b;z++){let N=Number(i.getValue(A+z*a,"*"));if(N===_[z]){W.push(n[z]);continue}let se=i.stackSave(),L=i.stackAlloc(4*a),Z=!1,K,V=0;try{i._OrtGetTensorData(N,L,L+a,L+2*a,L+3*a)!==0&&X(`Can't access output tensor data on index ${z}.`);let oe=a===4?"i32":"i64",Q=Number(i.getValue(L,oe));V=i.getValue(L+a,"*");let H=i.getValue(L+a*2,"*"),P=Number(i.getValue(L+a*3,oe)),R=[];for(let ie=0;ie<P;ie++)R.push(Number(i.getValue(H+ie*a,oe)));i._OrtFree(H)!==0&&X("Can't free memory for tensor dims.");let Y=R.reduce((ie,le)=>ie*le,1);K=Ve(Q);let ge=p?.outputPreferredLocations[o[z]];if(K==="string"){if(ge==="gpu-buffer"||ge==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let ie=[];for(let le=0;le<Y;le++){let Ue=i.getValue(V+le*a,"*"),mu=i.getValue(V+(le+1)*a,"*"),fu=le===Y-1?void 0:mu-Ue;ie.push(i.UTF8ToString(Ue,fu))}W.push([K,R,ie,"cpu"])}else if(ge==="gpu-buffer"&&Y>0){let ie=i.jsepGetBuffer;if(!ie)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let le=ie(V),Ue=He(Q,Y);if(Ue===void 0||!Mt(K))throw new Error(`Unsupported data type: ${K}`);Z=!0,W.push([K,R,{gpuBuffer:le,download:i.jsepCreateDownloader(le,Ue,K),dispose:()=>{i._OrtReleaseTensor(N)!==0&&X("Can't release tensor.")}},"gpu-buffer"])}else if(ge==="ml-tensor"&&Y>0){let ie=i.jsepEnsureTensor;if(!ie)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(He(Q,Y)===void 0||!Vt(K))throw new Error(`Unsupported data type: ${K}`);let Ue=await ie(V,Q,R,!1);Z=!0,W.push([K,R,{mlTensor:Ue,download:i.jsepCreateMLTensorDownloader(V,K),dispose:()=>{i.jsepReleaseTensorId(V),i._OrtReleaseTensor(N)}},"ml-tensor"])}else{let ie=Rt(K),le=new ie(Y);new Uint8Array(le.buffer,le.byteOffset,le.byteLength).set(i.HEAPU8.subarray(V,V+le.byteLength)),W.push([K,R,le,"cpu"])}}finally{i.stackRestore(se),K==="string"&&V&&i._free(V),Z||i._OrtReleaseTensor(N)}}return p&&!h&&(i._OrtClearBoundOutputs(p.handle)!==0&&X("Can't clear bound outputs."),je.set(e,[l,d,c,p,h,!1])),W}finally{i.stackRestore(v),w.forEach(O=>i._OrtReleaseTensor(O)),_.forEach(O=>i._OrtReleaseTensor(O)),$.forEach(O=>i._free(O)),y!==0&&i._OrtReleaseRunOptions(y),g.forEach(O=>i._free(O))}},zt=e=>{let t=ae(),r=je.get(e);if(!r)throw new Error("invalid session id");let o=r[0],n=t._OrtEndProfiling(o);n===0&&X("Can't get an profile file name."),t._OrtFree(n)},Bt=e=>{let t=[];for(let r of e){let o=r[2];!Array.isArray(o)&&"buffer"in o&&t.push(o.buffer)}return t}});var Ze,Te,ht,ur,lr,ar,on,sn,Ye,Je,Vc,tu,ru,nu,ou,iu,su,au,an=k(()=>{"use strict";Se();wr();Me();tt();Ze=()=>!!te.wasm.proxy&&typeof document<"u",ht=!1,ur=!1,lr=!1,sn=new Map,Ye=(e,t)=>{let r=sn.get(e);r?r.push(t):sn.set(e,[t])},Je=()=>{if(ht||!ur||lr||!Te)throw new Error("worker not ready")},Vc=e=>{switch(e.data.type){case"init-wasm":ht=!1,e.data.err?(lr=!0,on[1](e.data.err)):(ur=!0,on[0]()),ar&&(URL.revokeObjectURL(ar),ar=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=sn.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},tu=async()=>{if(!ur){if(ht)throw new Error("multiple calls to 'initWasm()' detected.");if(lr)throw new Error("previous call to 'initWasm()' failed.");if(ht=!0,Ze())return new Promise((e,t)=>{Te?.terminate(),qn().then(([r,o])=>{try{Te=o,Te.onerror=s=>t(s),Te.onmessage=Vc,on=[e,t];let n={type:"init-wasm",in:te};Te.postMessage(n),ar=r}catch(n){t(n)}},t)});try{await Tt(te.wasm),await Ct(te),ur=!0}catch(e){throw lr=!0,e}finally{ht=!1}}},ru=async e=>{if(Ze())return Je(),new Promise((t,r)=>{Ye("init-ep",[t,r]);let o={type:"init-ep",in:{epName:e,env:te}};Te.postMessage(o)});await At(te,e)},nu=async e=>Ze()?(Je(),new Promise((t,r)=>{Ye("copy-from",[t,r]);let o={type:"copy-from",in:{buffer:e}};Te.postMessage(o,[e.buffer])})):rt(e),ou=async(e,t)=>{if(Ze()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Je(),new Promise((r,o)=>{Ye("create",[r,o]);let n={type:"create",in:{model:e,options:{...t}}},s=[];e instanceof Uint8Array&&s.push(e.buffer),Te.postMessage(n,s)})}else return kt(e,t)},iu=async e=>{if(Ze())return Je(),new Promise((t,r)=>{Ye("release",[t,r]);let o={type:"release",in:e};Te.postMessage(o)});Et(e)},su=async(e,t,r,o,n,s)=>{if(Ze()){if(r.some(i=>i[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(n.some(i=>i))throw new Error("pre-allocated output tensor is not supported for proxy.");return Je(),new Promise((i,a)=>{Ye("run",[i,a]);let u=r,l={type:"run",in:{sessionId:e,inputIndices:t,inputs:u,outputIndices:o,options:s}};Te.postMessage(l,Bt(u))})}else return Pt(e,t,r,o,n,s)},au=async e=>{if(Ze())return Je(),new Promise((t,r)=>{Ye("end-profiling",[t,r]);let o={type:"end-profiling",in:e};Te.postMessage(o)});zt(e)}});var uu,Uc,dr,lu=k(()=>{"use strict";Se();an();M();It();xr();uu=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Uc=e=>{switch(e[3]){case"cpu":return new he(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Mt(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:o,dispose:n}=e[2];return he.fromGpuBuffer(r,{dataType:t,dims:e[1],download:o,dispose:n})}case"ml-tensor":{let t=e[0];if(!Vt(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:o,dispose:n}=e[2];return he.fromMLTensor(r,{dataType:t,dims:e[1],download:o,dispose:n})}default:throw new Error(`invalid data location: ${e[3]}`)}},dr=class{async fetchModelAndCopyToWasmMemory(t){return nu(await st(t))}async loadModel(t,r){_e();let o;typeof t=="string"?!1?o=await st(t):o=await this.fetchModelAndCopyToWasmMemory(t):o=t,[this.sessionId,this.inputNames,this.outputNames]=await ou(o,r),ye()}async dispose(){return iu(this.sessionId)}async run(t,r,o){_e();let n=[],s=[];Object.entries(t).forEach(p=>{let h=p[0],m=p[1],f=this.inputNames.indexOf(h);if(f===-1)throw new Error(`invalid input '${h}'`);n.push(m),s.push(f)});let i=[],a=[];Object.entries(r).forEach(p=>{let h=p[0],m=p[1],f=this.outputNames.indexOf(h);if(f===-1)throw new Error(`invalid output '${h}'`);i.push(m),a.push(f)});let u=n.map((p,h)=>uu(p,()=>`input "${this.inputNames[s[h]]}"`)),l=i.map((p,h)=>p?uu(p,()=>`output "${this.outputNames[a[h]]}"`):null),d=await su(this.sessionId,s,u,a,l,o),c={};for(let p=0;p<d.length;p++)c[this.outputNames[a[p]]]=i[p]??Uc(d[p]);return ye(),c}startProfiling(){}endProfiling(){au(this.sessionId)}}});var cu={};gt(cu,{OnnxruntimeWebAssemblyBackend:()=>cr,initializeFlags:()=>du,wasmBackend:()=>Nc});var du,cr,Nc,pu=k(()=>{"use strict";Se();an();lu();tt();du=()=>{if((typeof te.wasm.initTimeout!="number"||te.wasm.initTimeout<0)&&(te.wasm.initTimeout=0),te.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof te.wasm.proxy!="boolean"&&(te.wasm.proxy=!1),typeof te.wasm.trace!="boolean"&&(te.wasm.trace=!1),typeof te.wasm.numThreads!="number"||!Number.isInteger(te.wasm.numThreads)||te.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)te.wasm.numThreads=1;else{let e=typeof navigator>"u"?mr("node:os").cpus().length:navigator.hardwareConcurrency;te.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}te.wasm.wasmPaths===void 0&&Ie&&Ie.indexOf("blob:")!==0&&(te.wasm.wasmPaths=Ie.substring(0,Ie.lastIndexOf("/")+1))},cr=class{async init(t){du(),await tu(),await ru(t)}async createInferenceSessionHandler(t,r){let o=new dr;return await o.loadModel(t,r),Promise.resolve(o)}},Nc=new cr});Se();Se();Se();var Mn="1.21.0-dev.20241107-6a295eb75b";var E$=br;{let e=(pu(),fr(cu)).wasmBackend;Le("webgpu",e,5),Le("webnn",e,5),Le("cpu",e,10),Le("wasm",e,10)}Object.defineProperty(te.versions,"web",{value:Mn,enumerable:!0});export{_u as InferenceSession,vt as TRACE,_e as TRACE_FUNC_BEGIN,ye as TRACE_FUNC_END,he as Tensor,vu as TrainingSession,E$ as default,te as env,Le as registerBackend};
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
//# sourceMappingURL=ort.webgpu.min.mjs.map
