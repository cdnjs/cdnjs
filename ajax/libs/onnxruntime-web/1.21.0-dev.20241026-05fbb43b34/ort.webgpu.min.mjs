/*!
 * ONNX Runtime Web v1.21.0-dev.20241026-05fbb43b34
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var pr=Object.defineProperty;var mu=Object.getOwnPropertyDescriptor;var fu=Object.getOwnPropertyNames;var hu=Object.prototype.hasOwnProperty;var mr=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var A=(e,t)=>()=>(e&&(t=e(e=0)),t);var ht=(e,t)=>{for(var r in t)pr(e,r,{get:t[r],enumerable:!0})},gu=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of fu(t))!hu.call(e,o)&&o!==r&&pr(e,o,{get:()=>t[o],enumerable:!(n=mu(t,o))||n.enumerable});return e};var fr=e=>gu(pr({},"__esModule",{value:!0}),e);var gt,Ne,We,yu,yt,bt=A(()=>{"use strict";gt=new Map,Ne=[],We=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let n=gt.get(e);if(n===void 0)gt.set(e,{backend:t,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let o=Ne.indexOf(e);o!==-1&&Ne.splice(o,1);for(let s=0;s<Ne.length;s++)if(gt.get(Ne[s]).priority<=r){Ne.splice(s,0,e);return}Ne.push(e)}return}throw new TypeError("not a valid backend")},yu=async e=>{let t=gt.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(n){return r||(t.error=`${n}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},yt=async e=>{let t=e.executionProviders||[],r=t.map(u=>typeof u=="string"?u:u.name),n=r.length===0?Ne:r,o,s=[],i=new Set;for(let u of n){let d=await yu(u);typeof d=="string"?s.push({name:u,err:d}):(o||(o=d),o===d&&i.add(u))}if(!o)throw new Error(`no available backend found. ERR: ${s.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:d}of s)r.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${d}`);let a=t.filter(u=>i.has(typeof u=="string"?u:u.name));return[o,new Proxy(e,{get:(u,d)=>d==="executionProviders"?a:Reflect.get(u,d)})]}});var an=A(()=>{"use strict";bt()});var un,dn=A(()=>{"use strict";un="1.21.0-dev.20241026-05fbb43b34"});var ln,we,hr=A(()=>{"use strict";dn();ln="warning",we={wasm:{},webgl:{},webgpu:{},versions:{common:un},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);ln=e}},get logLevel(){return ln}};Object.defineProperty(we,"logLevel",{enumerable:!0})});var te,cn=A(()=>{"use strict";hr();te=we});var pn,mn,fn=A(()=>{"use strict";pn=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(n!=null){let o,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],s=e.dims[3]):(o=e.dims[3],s=e.dims[2]);let i=t?.format!==void 0?t.format:"RGB",a=t?.norm,u,d;a===void 0||a.mean===void 0?u=[255,255,255,255]:typeof a.mean=="number"?u=[a.mean,a.mean,a.mean,a.mean]:(u=[a.mean[0],a.mean[1],a.mean[2],0],a.mean[3]!==void 0&&(u[3]=a.mean[3])),a===void 0||a.bias===void 0?d=[0,0,0,0]:typeof a.bias=="number"?d=[a.bias,a.bias,a.bias,a.bias]:(d=[a.bias[0],a.bias[1],a.bias[2],0],a.bias[3]!==void 0&&(d[3]=a.bias[3]));let l=s*o,c=0,p=l,h=l*2,m=-1;i==="RGBA"?(c=0,p=l,h=l*2,m=l*3):i==="RGB"?(c=0,p=l,h=l*2):i==="RBG"&&(c=0,h=l,p=l*2);for(let f=0;f<s;f++)for(let y=0;y<o;y++){let b=(e.data[c++]-d[0])*u[0],g=(e.data[p++]-d[1])*u[1],w=(e.data[h++]-d[2])*u[2],_=m===-1?255:(e.data[m++]-d[3])*u[3];n.fillStyle="rgba("+b+","+g+","+w+","+_+")",n.fillRect(y,f,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},mn=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(r!=null){let o,s,i;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],s=e.dims[1],i=e.dims[3]):(o=e.dims[3],s=e.dims[2],i=e.dims[1]);let a=t!==void 0&&t.format!==void 0?t.format:"RGB",u=t?.norm,d,l;u===void 0||u.mean===void 0?d=[255,255,255,255]:typeof u.mean=="number"?d=[u.mean,u.mean,u.mean,u.mean]:(d=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(d[3]=u.mean[3])),u===void 0||u.bias===void 0?l=[0,0,0,0]:typeof u.bias=="number"?l=[u.bias,u.bias,u.bias,u.bias]:(l=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(l[3]=u.bias[3]));let c=s*o;if(t!==void 0&&(t.format!==void 0&&i===4&&t.format!=="RGBA"||i===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let p=4,h=0,m=1,f=2,y=3,b=0,g=c,w=c*2,_=-1;a==="RGBA"?(b=0,g=c,w=c*2,_=c*3):a==="RGB"?(b=0,g=c,w=c*2):a==="RBG"&&(b=0,w=c,g=c*2),n=r.createImageData(o,s);for(let $=0;$<s*o;h+=p,m+=p,f+=p,y+=p,$++)n.data[h]=(e.data[b++]-l[0])*d[0],n.data[m]=(e.data[g++]-l[1])*d[1],n.data[f]=(e.data[w++]-l[2])*d[2],n.data[y]=_===-1?255:(e.data[_++]-l[3])*d[3]}else throw new Error("Can not access image data");return n}});var gr,hn,gn,yn,bn,wn,_n=A(()=>{"use strict";wt();gr=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=t,o=t.norm??{mean:255,bias:0},s,i;typeof o.mean=="number"?s=[o.mean,o.mean,o.mean,o.mean]:s=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?i=[o.bias,o.bias,o.bias,o.bias]:i=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let a=t.format!==void 0?t.format:"RGBA",u=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",d=r*n,l=u==="RGBA"?new Float32Array(d*4):new Float32Array(d*3),c=4,p=0,h=1,m=2,f=3,y=0,b=d,g=d*2,w=-1;a==="RGB"&&(c=3,p=0,h=1,m=2,f=-1),u==="RGBA"?w=d*3:u==="RBG"?(y=0,g=d,b=d*2):u==="BGR"&&(g=0,b=d,y=d*2);for(let $=0;$<d;$++,p+=c,m+=c,h+=c,f+=c)l[y++]=(e[p]+i[0])/s[0],l[b++]=(e[h]+i[1])/s[1],l[g++]=(e[m]+i[2])/s[2],w!==-1&&f!==-1&&(l[w++]=(e[f]+i[3])/s[3]);return u==="RGBA"?new fe("float32",l,[1,4,r,n]):new fe("float32",l,[1,3,r,n])},hn=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,n=typeof ImageData<"u"&&e instanceof ImageData,o=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,s=typeof e=="string",i,a=t??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},d=l=>typeof HTMLCanvasElement<"u"&&l instanceof HTMLCanvasElement||l instanceof OffscreenCanvas?l.getContext("2d"):null;if(r){let l=u();l.width=e.width,l.height=e.height;let c=d(l);if(c!=null){let p=e.height,h=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(p=t.resizedHeight,h=t.resizedWidth),t!==void 0){if(a=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");a.tensorFormat="RGBA",a.height=p,a.width=h}else a.tensorFormat="RGBA",a.height=p,a.width=h;c.drawImage(e,0,0),i=c.getImageData(0,0,h,p).data}else throw new Error("Can not access image data")}else if(n){let l,c;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(l=t.resizedHeight,c=t.resizedWidth):(l=e.height,c=e.width),t!==void 0&&(a=t),a.format="RGBA",a.height=l,a.width=c,t!==void 0){let p=u();p.width=c,p.height=l;let h=d(p);if(h!=null)h.putImageData(e,0,0),i=h.getImageData(0,0,c,l).data;else throw new Error("Can not access image data")}else i=e.data}else if(o){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let l=u();l.width=e.width,l.height=e.height;let c=d(l);if(c!=null){let p=e.height,h=e.width;return c.drawImage(e,0,0,h,p),i=c.getImageData(0,0,h,p).data,a.height=p,a.width=h,gr(i,a)}else throw new Error("Can not access image data")}else{if(s)return new Promise((l,c)=>{let p=u(),h=d(p);if(!e||!h)return c();let m=new Image;m.crossOrigin="Anonymous",m.src=e,m.onload=()=>{p.width=m.width,p.height=m.height,h.drawImage(m,0,0,p.width,p.height);let f=h.getImageData(0,0,p.width,p.height);a.height=p.height,a.width=p.width,l(gr(f.data,a))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(i!==void 0)return gr(i,a);throw new Error("Input data provided is not supported - aborted tensor creation")},gn=(e,t)=>{let{width:r,height:n,download:o,dispose:s}=t,i=[1,n,r,4];return new fe({location:"texture",type:"float32",texture:e,dims:i,download:o,dispose:s})},yn=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:s}=t;return new fe({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:o,dispose:s})},bn=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:s}=t;return new fe({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:n,download:o,dispose:s})},wn=(e,t,r)=>new fe({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})});var Le,et,$n,vn,xn=A(()=>{"use strict";Le=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),et=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),$n=!1,vn=()=>{if(!$n){$n=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=typeof Float16Array<"u"&&Float16Array.from;e&&(Le.set("int64",BigInt64Array),et.set(BigInt64Array,"int64")),t&&(Le.set("uint64",BigUint64Array),et.set(BigUint64Array,"uint64")),r?(Le.set("float16",Float16Array),et.set(Float16Array,"float16")):Le.set("float16",Uint16Array)}}});var Sn,Tn,In=A(()=>{"use strict";wt();Sn=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},Tn=(e,t)=>{switch(e.location){case"cpu":return new fe(e.type,e.data,t);case"cpu-pinned":return new fe({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new fe({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new fe({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new fe({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var fe,wt=A(()=>{"use strict";fn();_n();xn();In();fe=class{constructor(t,r,n){vn();let o,s;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,o=t.type,s=t.dims,t.location){case"cpu-pinned":{let a=Le.get(o);if(!a)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(t.data instanceof a))throw new TypeError(`buffer should be of type ${a.name}`);this.cpuData=t.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let a,u;if(typeof t=="string")if(o=t,u=n,t==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");a=r}else{let d=Le.get(t);if(d===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(r)){if(t==="float16"&&d===Uint16Array||t==="uint4"||t==="int4")throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${d.name} as data.`);t==="uint64"||t==="int64"?a=d.from(r,BigInt):a=d.from(r)}else if(r instanceof d)a=r;else if(r instanceof Uint8ClampedArray)if(t==="uint8")a=Uint8Array.from(r);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else throw new TypeError(`A ${o} tensor's data must be type of ${d}`)}else if(u=r,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let d=typeof t[0];if(d==="string")o="string",a=t;else if(d==="boolean")o="bool",a=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${d}.`)}else if(t instanceof Uint8ClampedArray)o="uint8",a=Uint8Array.from(t);else{let d=et.get(t.constructor);if(d===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);o=d,a=t}if(u===void 0)u=[a.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");s=u,this.cpuData=a,this.dataLocation="cpu"}let i=Sn(s);if(this.cpuData&&i!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(i/2)===this.cpuData.length))throw new Error(`Tensor's size(${i}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=s,this.size=i}static async fromImage(t,r){return hn(t,r)}static fromTexture(t,r){return gn(t,r)}static fromGpuBuffer(t,r){return yn(t,r)}static fromMLTensor(t,r){return bn(t,r)}static fromPinnedBuffer(t,r,n){return wn(t,r,n)}toDataURL(t){return pn(this,t)}toImageData(t){return mn(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,t&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Tn(this,t)}}});var he,_t=A(()=>{"use strict";wt();he=fe});var $t,Cn,_e,ye,yr=A(()=>{"use strict";hr();$t=(e,t)=>{(typeof we.trace>"u"?!we.wasm.trace:!we.trace)||console.timeStamp(`${e}::ORT::${t}`)},Cn=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],n=!1;for(let o=0;o<r.length;o++){if(n&&!r[o].includes("TRACE_FUNC")){let s=`FUNC_${e}::${r[o].trim().split(" ")[1]}`;t&&(s+=`::${t}`),$t("CPU",s);return}r[o].includes("TRACE_FUNC")&&(n=!0)}},_e=e=>{(typeof we.trace>"u"?!we.wasm.trace:!we.trace)||Cn("BEGIN",e)},ye=e=>{(typeof we.trace>"u"?!we.wasm.trace:!we.trace)||Cn("END",e)}});var vt,An=A(()=>{"use strict";bt();_t();yr();vt=class e{constructor(t){this.handler=t}async run(t,r,n){_e();let o={},s={};if(typeof t!="object"||t===null||t instanceof he||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let i=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof he)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");i=!1;for(let d of r){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);o[d]=null}if(typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,l=Object.getOwnPropertyNames(r);for(let c of this.outputNames)if(l.indexOf(c)!==-1){let p=r[c];(p===null||p instanceof he)&&(d=!0,i=!1,o[c]=p)}if(d){if(typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else s=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of this.inputNames)if(typeof t[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(i)for(let d of this.outputNames)o[d]=null;let a=await this.handler.run(t,o,s),u={};for(let d in a)if(Object.hasOwnProperty.call(a,d)){let l=a[d];l instanceof he?u[d]=l:u[d]=new he(l.type,l.data,l.dims)}return ye(),u}async release(){return this.handler.dispose()}static async create(t,r,n,o){_e();let s,i={};if(typeof t=="string"){if(s=t,typeof r=="object"&&r!==null)i=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(s=t,typeof r=="object"&&r!==null)i=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let l=t,c=0,p=t.byteLength;if(typeof r=="object"&&r!==null)i=r;else if(typeof r=="number"){if(c=r,!Number.isSafeInteger(c))throw new RangeError("'byteOffset' must be an integer.");if(c<0||c>=l.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${l.byteLength}).`);if(p=t.byteLength-c,typeof n=="number"){if(p=n,!Number.isSafeInteger(p))throw new RangeError("'byteLength' must be an integer.");if(p<=0||c+p>l.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${l.byteLength-c}].`);if(typeof o=="object"&&o!==null)i=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof n<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");s=new Uint8Array(l,c,p)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[a,u]=await yt(i),d=await a.createInferenceSessionHandler(s,u);return ye(),new e(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var bu,kn=A(()=>{"use strict";An();bu=vt});var En=A(()=>{"use strict"});var Pn=A(()=>{"use strict"});var zn=A(()=>{"use strict"});var Bn=A(()=>{"use strict"});var wu,xt,On=A(()=>{"use strict";bt();_t();wu="Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.",xt=class e{constructor(t,r,n){this.handler=t,this.hasOptimizerModel=r,this.hasEvalModel=n}get trainingInputNames(){return this.handler.inputNames}get trainingOutputNames(){return this.handler.outputNames}get evalInputNames(){if(this.hasEvalModel)return this.handler.evalInputNames;throw new Error("This training session has no evalModel loaded.")}get evalOutputNames(){if(this.hasEvalModel)return this.handler.evalOutputNames;throw new Error("This training session has no evalModel loaded.")}static async create(t,r){let n=t.evalModel||"",o=t.optimizerModel||"",s=r||{},[i,a]=await yt(s);if(i.createTrainingSessionHandler){let u=await i.createTrainingSessionHandler(t.checkpointState,t.trainModel,n,o,a);return new e(u,!!t.optimizerModel,!!t.evalModel)}else throw new Error(wu)}typeNarrowingForRunStep(t,r,n,o,s){let i={},a={};if(typeof n!="object"||n===null||n instanceof he||Array.isArray(n))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let u=!0;if(typeof o=="object"){if(o===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(o instanceof he)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(o)){if(o.length===0)throw new TypeError("'fetches' cannot be an empty array.");u=!1;for(let d of o){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(r.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);i[d]=null}if(typeof s=="object"&&s!==null)a=s;else if(typeof s<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,l=Object.getOwnPropertyNames(o);for(let c of r)if(l.indexOf(c)!==-1){let p=o[c];(p===null||p instanceof he)&&(d=!0,u=!1,i[c]=p)}if(d){if(typeof s=="object"&&s!==null)a=s;else if(typeof s<"u")throw new TypeError("'options' must be an object.")}else a=o}}else if(typeof o<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of t)if(typeof n[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(u)for(let d of r)i[d]=null;return[i,a]}convertHandlerReturnTypeToMapOfTensors(t){let r={};for(let n in t)if(Object.hasOwnProperty.call(t,n)){let o=t[n];o instanceof he?r[n]=o:r[n]=new he(o.type,o.data,o.dims)}return r}async lazyResetGrad(){await this.handler.lazyResetGrad()}async runTrainStep(t,r,n){let[o,s]=this.typeNarrowingForRunStep(this.trainingInputNames,this.trainingOutputNames,t,r,n),i=await this.handler.runTrainStep(t,o,s);return this.convertHandlerReturnTypeToMapOfTensors(i)}async runOptimizerStep(t){if(this.hasOptimizerModel)await this.handler.runOptimizerStep(t||{});else throw new Error("This TrainingSession has no OptimizerModel loaded.")}async runEvalStep(t,r,n){if(this.hasEvalModel){let[o,s]=this.typeNarrowingForRunStep(this.evalInputNames,this.evalOutputNames,t,r,n),i=await this.handler.runEvalStep(t,o,s);return this.convertHandlerReturnTypeToMapOfTensors(i)}else throw new Error("This TrainingSession has no EvalModel loaded.")}async getParametersSize(t=!0){return this.handler.getParametersSize(t)}async loadParametersBuffer(t,r=!0){let n=await this.getParametersSize(r);if(t.length!==4*n)throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");return this.handler.loadParametersBuffer(t,r)}async getContiguousParameters(t=!0){return this.handler.getContiguousParameters(t)}async release(){return this.handler.dispose()}}});var _u,Dn=A(()=>{"use strict";On();_u=xt});var br={};ht(br,{InferenceSession:()=>bu,TRACE:()=>$t,TRACE_FUNC_BEGIN:()=>_e,TRACE_FUNC_END:()=>ye,Tensor:()=>he,TrainingSession:()=>_u,env:()=>te,registerBackend:()=>We});var Se=A(()=>{"use strict";an();cn();kn();_t();En();Pn();yr();zn();Bn();Dn()});var St=A(()=>{"use strict"});var Un={};ht(Un,{default:()=>$u});var Mn,Vn,$u,Nn=A(()=>{"use strict";wr();Me();tt();Mn="ort-wasm-proxy-worker",Vn=globalThis.self?.name===Mn;Vn&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":Tt(r.wasm).then(()=>{It(r).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})})},n=>{postMessage({type:t,err:n})});break;case"init-ep":{let{epName:n,env:o}=r;Ct(o,n).then(()=>{postMessage({type:t})},s=>{postMessage({type:t,err:s})});break}case"copy-from":{let{buffer:n}=r,o=rt(n);postMessage({type:t,out:o});break}case"create":{let{model:n,options:o}=r;At(n,o).then(s=>{postMessage({type:t,out:s})},s=>{postMessage({type:t,err:s})});break}case"release":kt(r),postMessage({type:t});break;case"run":{let{sessionId:n,inputIndices:o,inputs:s,outputIndices:i,options:a}=r;Et(n,o,s,i,new Array(i.length).fill(null),a).then(u=>{u.some(d=>d[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:u},zt([...s,...u]))},u=>{postMessage({type:t,err:u})});break}case"end-profiling":Pt(r),postMessage({type:t});break;default:}}catch(n){postMessage({type:t,err:n})}});$u=Vn?null:e=>new Worker(e??Te,{type:"module",name:Mn})});var Te,vu,Ln,xu,Su,Gn,Tu,Wn,Hn,qn,tt=A(()=>{"use strict";St();Te=!1?void 0:import.meta.url??(typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0),vu=!1||typeof location>"u"?void 0:location.origin,Ln=(e,t)=>{try{let r=t??Te;return(r?new URL(e,r):new URL(e)).origin===vu}catch{return!1}},xu=(e,t)=>{let r=t??Te;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},Su=(e,t)=>`${t??"./"}${e}`,Gn=async e=>{let r=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},Tu=async e=>(await import(/*webpackIgnore:true*/e)).default,Wn=(Nn(),fr(Un)).default,Hn=async()=>{if(!Te)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Ln(Te))return[void 0,Wn()];let e=await Gn(Te);return[e,Wn(e)]},qn=async(e,t,r)=>{{let n="ort-wasm-simd-threaded.jsep.mjs",o=e??xu(n,t),s=!!1&&r&&o&&!Ln(o,t),i=s?await Gn(o):o??Su(n,t);return[s?i:void 0,await Tu(i)]}}});var _r,$r,Bt,Fn,Iu,Cu,Tt,ae,Me=A(()=>{"use strict";tt();$r=!1,Bt=!1,Fn=!1,Iu=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Cu=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Tt=async e=>{if($r)return Promise.resolve();if(Bt)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Fn)throw new Error("previous call to 'initializeWebAssembly()' failed.");Bt=!0;let t=e.initTimeout,r=e.numThreads;if(!Cu())throw new Error("WebAssembly SIMD is not supported in the current environment.");let n=Iu();r>1&&!n&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let o=e.wasmPaths,s=typeof o=="string"?o:void 0,i=o?.mjs,a=i?.href??i,u=o?.wasm,d=u?.href??u,l=e.wasmBinary,[c,p]=await qn(a,s,r>1),h=!1,m=[];if(t>0&&m.push(new Promise(f=>{setTimeout(()=>{h=!0,f()},t)})),m.push(new Promise((f,y)=>{let b={numThreads:r};l?b.wasmBinary=l:(d||s)&&(b.locateFile=(g,w)=>d??(s??w)+g),p(b).then(g=>{Bt=!1,$r=!0,_r=g,f(),c&&URL.revokeObjectURL(c)},g=>{Bt=!1,Fn=!0,y(g)})})),await Promise.race(m),h)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},ae=()=>{if($r&&_r)return _r;throw new Error("WebAssembly is not initialized yet.")}});var le,nt,X,Ot=A(()=>{"use strict";Me();le=(e,t)=>{let r=ae(),n=r.lengthBytesUTF8(e)+1,o=r._malloc(n);return r.stringToUTF8(e,o,n),t.push(o),o},nt=(e,t,r,n)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([o,s])=>{let i=t?t+o:o;if(typeof s=="object")nt(s,i+".",r,n);else if(typeof s=="string"||typeof s=="number")n(i,s.toString());else if(typeof s=="boolean")n(i,s?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof s}`)})},X=e=>{let t=ae(),r=t.stackSave();try{let n=t.PTR_SIZE,o=t.stackAlloc(2*n);t._OrtGetLastError(o,o+n);let s=Number(t.getValue(o,n===4?"i32":"i64")),i=t.getValue(o+n,"*"),a=i?t.UTF8ToString(i):"";throw new Error(`${e} ERROR_CODE: ${s}, ERROR_MESSAGE: ${a}`)}finally{t.stackRestore(r)}}});var Kn,jn=A(()=>{"use strict";Me();Ot();Kn=e=>{let t=ae(),r=0,n=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let s=0;return e?.tag!==void 0&&(s=le(e.tag,n)),r=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,s),r===0&&X("Can't create run options."),e?.extra!==void 0&&nt(e.extra,"",new WeakSet,(i,a)=>{let u=le(i,n),d=le(a,n);t._OrtAddRunConfigEntry(r,u,d)!==0&&X(`Can't set a run config entry: ${i} - ${a}.`)}),[r,n]}catch(s){throw r!==0&&t._OrtReleaseRunOptions(r),n.forEach(i=>t._free(i)),s}}});var Au,ku,Eu,Pu,Zn,Xn=A(()=>{"use strict";Me();Ot();Au=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},ku=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Eu=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Pu=(e,t,r)=>{for(let n of t){let o=typeof n=="string"?n:n.name;switch(o){case"webnn":if(o="WEBNN",typeof n!="string"){let a=n?.deviceType;if(a){let u=le("deviceType",r),d=le(a,r);ae()._OrtAddSessionConfigEntry(e,u,d)!==0&&X(`Can't set a session config entry: 'deviceType' - ${a}.`)}}break;case"webgpu":if(o="JS",typeof n!="string"){let i=n;if(i?.preferredLayout){if(i.preferredLayout!=="NCHW"&&i.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${i.preferredLayout}`);let a=le("preferredLayout",r),u=le(i.preferredLayout,r);ae()._OrtAddSessionConfigEntry(e,a,u)!==0&&X(`Can't set a session config entry: 'preferredLayout' - ${i.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let s=le(o,r);ae()._OrtAppendExecutionProvider(e,s)!==0&&X(`Can't append execution provider: ${o}.`)}},Zn=e=>{let t=ae(),r=0,n=[],o=e||{};Eu(o);try{let s=Au(o.graphOptimizationLevel??"all"),i=ku(o.executionMode??"sequential"),a=typeof o.logId=="string"?le(o.logId,n):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log serverity level is not valid: ${u}`);let d=o.logVerbosityLevel??0;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log verbosity level is not valid: ${d}`);let l=typeof o.optimizedModelFilePath=="string"?le(o.optimizedModelFilePath,n):0;if(r=t._OrtCreateSessionOptions(s,!!o.enableCpuMemArena,!!o.enableMemPattern,i,!!o.enableProfiling,0,a,u,d,l),r===0&&X("Can't create session options."),o.executionProviders&&Pu(r,o.executionProviders,n),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let c=le("enableGraphCapture",n),p=le(o.enableGraphCapture.toString(),n);t._OrtAddSessionConfigEntry(r,c,p)!==0&&X(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[c,p]of Object.entries(o.freeDimensionOverrides)){if(typeof c!="string")throw new Error(`free dimension override name must be a string: ${c}`);if(typeof p!="number"||!Number.isInteger(p)||p<0)throw new Error(`free dimension override value must be a non-negative integer: ${p}`);let h=le(c,n);t._OrtAddFreeDimensionOverride(r,h,p)!==0&&X(`Can't set a free dimension override: ${c} - ${p}.`)}return o.extra!==void 0&&nt(o.extra,"",new WeakSet,(c,p)=>{let h=le(c,n),m=le(p,n);t._OrtAddSessionConfigEntry(r,h,m)!==0&&X(`Can't set a session config entry: ${c} - ${p}.`)}),[r,n]}catch(s){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&X("Can't release session options."),n.forEach(i=>t._free(i)),s}}});var ot,Ve,He,Dt,it,Rt,Mt,vr,M=A(()=>{"use strict";ot=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},Ve=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},He=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],n=typeof t=="number"?t:t.reduce((o,s)=>o*s,1);return r>0?Math.ceil(n*r):void 0},Dt=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},it=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Rt=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Mt=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",vr=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}});var st,xr=A(()=>{"use strict";St();st=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=mr("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=mr("node:fs"),n=r(e),o=[];for await(let s of n)o.push(s);return new Uint8Array(Buffer.concat(o))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let o=t.body.getReader(),s;try{s=new ArrayBuffer(n)}catch(a){if(a instanceof RangeError){let u=Math.ceil(n/65536);s=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw a}let i=0;for(;;){let{done:a,value:u}=await o.read();if(a)break;let d=u.byteLength;new Uint8Array(s,i,d).set(u),i+=d}return new Uint8Array(s,0,n)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var zu,Bu,Qn,Yn,Vt,Ou,j,Ce=A(()=>{"use strict";M();zu=["V","I","W","E","F"],Bu=(e,t)=>{console.log(`[${zu[e]},${new Date().toISOString()}]${t}`)},Vt=(e,t)=>{Qn=e,Yn=t},Ou=(e,t)=>{let r=it(e),n=it(Qn);r>=n&&Bu(r,typeof t=="function"?t():t)},j=(...e)=>{Yn&&Ou(...e)}});var Ut,Sr=A(()=>{"use strict";M();Ut=(e,t)=>new(Dt(t))(e)});var Nt=A(()=>{"use strict"});var Jn,Tr,Ir,Du,Ru,eo,Ar,Cr,ro,no=A(()=>{"use strict";Ce();Nt();Jn=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Tr=[],Ir=e=>Math.ceil(Number(e)/16)*16,Du=e=>{for(let t=0;t<Tr.length;t++){let r=Tr[t];if(e<=r)return r}return Math.ceil(e/16)*16},Ru=1,eo=()=>Ru++,Ar=async(e,t,r,n)=>{let o=Ir(r),s=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let i=e.getCommandEncoder();e.endComputePass(),i.copyBufferToBuffer(t,0,s,0,o),e.flush(),await s.mapAsync(GPUMapMode.READ);let a=s.getMappedRange();if(n){let u=n();return u.set(new Uint8Array(a,0,r)),u}else return new Uint8Array(a.slice(0,r))}finally{s.destroy()}},Cr=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersForUploadingPending=[],this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[r]of Jn)Tr.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(t,r){let n=r.buffer,o=r.byteOffset,s=r.byteLength,i=Ir(s),a=this.storageCache.get(t);if(!a)throw new Error("gpu data for uploading does not exist");if(Number(a.originalSize)!==s)throw new Error(`inconsistent data size. gpu data size=${a.originalSize}, data size=${s}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:i,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),d=u.getMappedRange();new Uint8Array(d).set(new Uint8Array(n,o,s)),u.unmap();let l=this.backend.getCommandEncoder();this.backend.endComputePass(),l.copyBufferToBuffer(u,0,a.gpuData.buffer,0,i),j("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`),this.buffersForUploadingPending.push(u)}memcpy(t,r){let n=this.storageCache.get(t);if(!n)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let s=Ir(n.originalSize),i=this.backend.getCommandEncoder();this.backend.endComputePass(),i.copyBufferToBuffer(n.gpuData.buffer,0,o.gpuData.buffer,0,s)}registerExternalBuffer(t,r,n){let o;if(n){if(o=n[0],t===n[1])return j("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=eo();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:t},originalSize:r}),j("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(t){t!==void 0&&(this.storageCache.delete(t),j("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(t,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=Du(t),o,s=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,i=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(s||i){let d=(s?this.freeBuffers:this.freeUniformBuffers).get(n);d?d.length>0?o=d.pop():o=this.backend.device.createBuffer({size:n,usage:r}):o=this.backend.device.createBuffer({size:n,usage:r})}else o=this.backend.device.createBuffer({size:n,usage:r});let a={id:eo(),type:0,buffer:o};return this.storageCache.set(a.id,{gpuData:a,originalSize:Number(t)}),j("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${a.id}`),a}get(t){return this.storageCache.get(t)?.gpuData}release(t){let r=typeof t=="bigint"?Number(t):t,n=this.storageCache.get(r);if(!n){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return j("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(t,r){let n=this.storageCache.get(Number(t));if(!n)throw new Error("data does not exist");await Ar(this.backend,n.gpuData.buffer,n.originalSize,r)}refreshPendingBuffers(){for(let t of this.buffersForUploadingPending)t.destroy();if(this.buffersForUploadingPending=[],this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let r=Jn.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let r of this.buffersPending)t.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(t){let r=this.capturedPendingBuffers.get(t);r&&(r.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(t)),this.sessionCount-=1,this.sessionCount===0&&(j("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(n=>{n.gpuData.buffer.destroy()}),this.storageCache=new Map)}},ro=(...e)=>new Cr(...e)});var kr,U,ue=A(()=>{"use strict";kr=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},U=e=>new kr(e)});var Er,ke,x,qe,Wt,oo,io,q=A(()=>{"use strict";Er=class{static calcMatMulShape(t,r){return t[1]!==r[0]?void 0:[t[0],r[1]]}},ke=class{static calcShape(t,r,n=!1){let o=t.length,s=r.length;if(o===0)return r;if(s===0)return t;let i=Math.max(t.length,r.length),a=new Array(i);if(n){if(o<2||s<2)return;let u=Er.calcMatMulShape([t[o-2],t[o-1]],[r[s-2],r[s-1]]);if(u===void 0)return;[a[i-2],a[i-1]]=u}for(let u=n?3:1;u<=i;u++){let d=o-u<0?1:t[o-u],l=s-u<0?1:r[s-u];if(d!==l&&d>1&&l>1)return;let c=Math.max(d,l);if(d&&l)a[i-u]=Math.max(d,l);else{if(c>1)return;a[i-u]=0}}return a}static isValidBroadcast(t,r){let n=t.length,o=r.length;if(n>o)return!1;for(let s=1;s<=n;s++)if(t[n-s]!==1&&t[n-s]!==r[o-s])return!1;return!0}},x=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let n=t.length;if(n===0)return[];let o=new Array(n),s=n-1;for(;s>=0;){if(t[s]%r===0){o[s]=t[s]/r;break}if(r%t[s]!==0)throw new Error("cannot convert shape");o[s]=1,r/=t[s],s--}for(s--;s>=0;s--)o[s]=t[s];return o}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,n){let o=1;for(let s=r;s<n;s++){if(t[s]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(t[s])}return o}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let n=new Array(r);n[r-1]=1,n[r-2]=t[r-1];for(let o=r-3;o>=0;--o)n[o]=n[o+1]*t[o+1];return n}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(n=>this.normalizeAxis(n,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(n=>t[n]):t.slice().reverse()}static padShape(t,r){let n=t.length;return t.map((o,s)=>o+r[s]+r[s+n])}static areEqual(t,r){return t.length!==r.length?!1:t.every((n,o)=>n===r[o])}},qe=class e{static adjustPoolAttributes(t,r,n,o,s,i){if(!t&&n.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let a=0;a<r.length-2;a++)a>=n.length?n.push(r[a+2]):n[a]=r[a+2];for(let a=0;a<n.length;a++)if(a<o.length){if(o[a]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let a=0;a<n.length;a++)if(a<s.length){if(s[a]<0)throw new Error("dilations should be greater than or equal to 1")}else s.push(1);for(let a=0;a<n.length*2;a++)if(a<i.length){if(i[a]<0)throw new Error("pad should be greater than or equal to 1")}else i.push(0);for(let a=0;a<n.length;a++){if(n[a]<=0)throw new Error("kernel shapes need to be greater than 0");if(i[a]>=n[a]||i[a+n.length]>=n[a])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,o,s,i,a){if(a){if(s.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<t.length-2;u++)e.adjustPadAndReturnShape(t[u+(i?1:2)],r[u],n[u],o[u],s,u,u+t.length-2,a)}}static computePoolOutputShape(t,r,n,o,s,i,a){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return e.computeShapeHelper(t,r,u,n,o,s,i,a),u}static computeConvOutputShape(t,r,n,o,s,i,a){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],r[0]];return e.computeShapeHelper(!1,t,u,n,o,s,i,a),u}static computeShapeHelper(t,r,n,o,s,i,a,u){if(t)for(let d=0;d<r.length-2;d++)n.push(1);else for(let d=0;d<r.length-2;d++)n.push(e.adjustPadAndReturnShape(r[d+2],o[d],s[d],i[d],a,d,d+r.length-2,u))}static adjustPadAndReturnShape(t,r,n,o,s,i,a,u){let d=n*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return s[i]=0,s[a]=0,Math.floor((t-d)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(n!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((t+r-1)/r-1)*r+o-t;return s[i]=Math.floor(u==="SAME_LOWER"?(c+1)/2:c/2),s[a]=c-s[i],Math.floor((t+c-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+s[i]+s[a]-d)/r+1)}},Wt=class{static getShapeOfGemmResult(t,r,n,o,s){if(t.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let i,a,u;r?(i=t[1],a=t[0]):(i=t[0],a=t[1]);let d=-1;if(o?(u=n[0],d=1):(u=n[1],d=0),n[d]!==a)throw new Error("dimension mismatch");if(i<=0||u<=0||a<=0)throw new Error("invalid shape specified");if(s&&!ke.isValidBroadcast(s,[i,u]))throw new Error("gemm: invalid bias shape for broadcast");return[i,u,a]}},oo=-34028234663852886e22,io=34028234663852886e22});var Fe,zr,J,ce,k,re,Br,Ke,Ae,O,Or,S,C,Lt,Pr,so,Xe,F=A(()=>{"use strict";M();q();Fe=64,zr=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},J=(e,t=1)=>{let r=zr(e,t);return typeof r=="string"?r:r[0]},ce=(e,t=1)=>{let r=zr(e,t);return typeof r=="string"?r:r[1]},k=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:x.computeStrides(r)})}),t},re=e=>e%4===0?4:e%2===0?2:1,Br=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Ke=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,Ae=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,O=(e,t,r,n)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?n==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:n==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,Or=(e,t,r,n,o)=>{let s=typeof r=="number",i=s?r:r.length,a=[...new Array(i).keys()],u=i<2?"u32":i<=4?`vec${i}<u32>`:`array<u32, ${i}>`,d=zr(t,o),l=typeof d=="string"?d:d[1],c=typeof d=="string"?d:d[0],p={indices:u,value:l,storage:c,tensor:t},h=E=>typeof E=="string"?E:`${E}u`,m={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},f=s?"uniforms.":"",y=`${f}${e}_shape`,b=`${f}${e}_strides`,g="";for(let E=0;E<i-1;E++)g+=`
    let dim${E} = current / ${O(b,E,i)};
    let rest${E} = current % ${O(b,E,i)};
    indices[${E}] = dim${E};
    current = rest${E};
    `;g+=`indices[${i-1}] = current;`;let w=i<2?"":`
  fn o2i_${e}(offset: u32) -> ${p.indices} {
    var indices: ${p.indices};
    var current = offset;
    ${g}
    return indices;
  }`,_=E=>(m.offsetToIndices=!0,i<2?E:`o2i_${e}(${E})`),$=[];if(i>=2)for(let E=i-1;E>=0;E--)$.push(`${O(b,E,i)} * (indices[${E}])`);let v=i<2?"":`
  fn i2o_${e}(indices: ${p.indices}) -> u32 {
    return ${$.join("+")};
  }`,T=E=>(m.indicesToOffset=!0,i<2?E:`i2o_${e}(${E})`),I=(...E)=>i===0?"0u":`${p.indices}(${E.map(h).join(",")})`,P=(E,R)=>i<2?`${E}`:`${O(E,R,i)}`,B=(E,R,Y)=>i<2?`${E}=${Y};`:`${O(E,R,i)}=${Y};`,D={},L=(E,R)=>{m.broadcastedIndicesToOffset=!0;let Y=`${R.name}broadcastedIndicesTo${e}Offset`;if(Y in D)return`${Y}(${E})`;let ge=[];for(let ie=i-1;ie>=0;ie--){let de=R.indicesGet("outputIndices",ie+R.rank-i);ge.push(`${P(b,ie)} * (${de} % ${P(y,ie)})`)}return D[Y]=`fn ${Y}(outputIndices: ${R.type.indices}) -> u32 {
             return ${ge.length>0?ge.join("+"):"0u"};
           }`,`${Y}(${E})`},z=(E,R)=>(()=>{if(p.storage===p.value)return`${e}[${E}]=${R};`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`${e}[${E}]=vec2<u32>(u32(${R}), select(0u, 0xFFFFFFFFu, ${R} < 0));`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`${e}[${E}]=vec2<u32>(u32(${R}), 0u);`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`${e}[${E}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${R}));`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),N=E=>(()=>{if(p.storage===p.value)return`${e}[${E}]`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`i32(${e}[${E}].x)`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`u32(${e}[${E}].x)`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${E}] & 0xFFu), bool(${e}[${E}] & 0xFF00u), bool(${e}[${E}] & 0xFF0000u), bool(${e}[${E}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),se=i<2?"":`
  fn get_${e}ByIndices(indices: ${p.indices}) -> ${l} {
    return ${N(`i2o_${e}(indices)`)};
  }`,W=i<2?"":(()=>{let E=a.map(Y=>`d${Y}: u32`).join(", "),R=a.map(Y=>`d${Y}`).join(", ");return`
  fn get_${e}(${E}) -> ${l} {
    return get_${e}ByIndices(${I(R)});
  }`})(),Z=(...E)=>{if(E.length!==i)throw new Error(`indices length must be ${i}`);let R=E.map(h).join(",");return i===0?N("0u"):i===1?N(R[0]):(m.get=!0,m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}(${R})`)},K=E=>i<2?N(E):(m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}ByIndices(${E})`),V=i<2?"":`
  fn set_${e}ByIndices(indices: ${p.indices}, value: ${l}) {
    ${z(`i2o_${e}(indices)`,"value")}
  }`,ne=i<2?"":(()=>{let E=a.map(Y=>`d${Y}: u32`).join(", "),R=a.map(Y=>`d${Y}`).join(", ");return`
  fn set_${e}(${E}, value: ${l}) {
    set_${e}ByIndices(${I(R)}, value);
  }`})();return{impl:()=>{let E=[],R=!1;return m.offsetToIndices&&(E.push(w),R=!0),m.indicesToOffset&&(E.push(v),R=!0),m.broadcastedIndicesToOffset&&(Object.values(D).forEach(Y=>E.push(Y)),R=!0),m.set&&(E.push(ne),R=!0),m.setByIndices&&(E.push(V),R=!0),m.get&&(E.push(W),R=!0),m.getByIndices&&(E.push(se),R=!0),!s&&R&&E.unshift(`const ${y} = ${p.indices}(${r.join(",")});`,`const ${b} = ${p.indices}(${x.computeStrides(r).join(",")});`),E.join(`
`)},type:p,offsetToIndices:_,indicesToOffset:T,broadcastedIndicesToOffset:L,indices:I,indicesGet:P,indicesSet:B,set:(...E)=>{if(E.length!==i+1)throw new Error(`indices length must be ${i}`);let R=E[i];if(typeof R!="string")throw new Error("value must be string");let Y=E.slice(0,i).map(h).join(",");return i===0?z("0u",R):i===1?z(Y[0],R):(m.set=!0,m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}(${Y}, ${R})`)},setByOffset:z,setByIndices:(E,R)=>i<2?z(E,R):(m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}ByIndices(${E}, ${R});`),get:Z,getByOffset:N,getByIndices:K,usage:n,name:e,strides:b,shape:y,rank:i}},S=(e,t,r,n=1)=>Or(e,t,r,"input",n),C=(e,t,r,n=1)=>Or(e,t,r,"output",n),Lt=(e,t,r,n=1)=>Or(e,t,r,"internal",n),Pr=class{constructor(t,r){this.normalizedDispatchGroup=t;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=Fe){let r=typeof t=="number"?t:t[0],n=typeof t=="number"?1:t[1],o=typeof t=="number"?1:t[2];if(r>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*n*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let s=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,i=s?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,a=s?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${r*n*o}u + local_idx;`;return`@compute @workgroup_size(${r}, ${n}, ${o})
  fn main(${i}) {
    ${a}
  `}appendVariableUniforms(t){t.rank!==0&&(t.shape.startsWith("uniforms.")&&this.uniforms.push({name:t.shape.replace("uniforms.",""),type:"u32",length:t.rank}),t.strides.startsWith("uniforms.")&&this.uniforms.push({name:t.strides.replace("uniforms.",""),type:"u32",length:t.rank}))}declareVariable(t,r){if(t.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(t),this.appendVariableUniforms(t);let n=t.usage==="input"?"read":"read_write",o=t.type.storage;return`@group(0) @binding(${r}) var<storage, ${n}> ${t.name}: array<${o}>;`}declareVariables(...t){return t.map(r=>this.declareVariable(r,this.variableIndex++)).join(`
`)}registerInternalVariable(t){if(t.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(t),this.appendVariableUniforms(t)}registerInternalVariables(...t){return t.forEach(r=>this.registerInternalVariable(r)),this}registerUniform(t,r,n=1){return this.uniforms.push({name:t,type:r,length:n}),this}registerUniforms(t){return this.uniforms=this.uniforms.concat(t),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let t=[];for(let{name:r,type:n,length:o}of this.uniforms)if(o&&o>4)n==="f16"?t.push(`@align(16) ${r}:array<mat2x4<${n}>, ${Math.ceil(o/8)}>`):t.push(`${r}:array<vec4<${n}>, ${Math.ceil(o/4)}>`);else{let s=o==null||o===1?n:`vec${o}<${n}>`;t.push(`${r}:${s}`)}return`
      struct Uniforms { ${t.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(t=>t.impl()).join(`
`)+this.internalVariables.map(t=>t.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[t(r.type),r.length??1])}},so=(e,t)=>new Pr(e,t),Xe=(e,t)=>{let r=e.length,n=[];for(let o=0;o<r;o++){let s=r-1-o,i=e[s]||1;(t[t.length-1-o]||1)>1&&i===1&&n.unshift(s)}return n}});var Mu,ao,Vu,Uu,Nu,pe,uo,lo,De=A(()=>{"use strict";M();q();ue();F();Mu=e=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.")},ao=(e,t)=>t&&t.length!==e?[...new Array(e).keys()].reverse():t,Vu=(e,t)=>x.sortBasedOnPerm(e,ao(e.length,t)),Uu=(e,t,r,n)=>{let o=`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let s=0;s<t;++s)o+=r.indicesSet("a",e[s],`i[${s}]`);return o+="return a;}"},Nu=(e,t)=>{let r=[],n=[];for(let o=0;o<e.length;++o)e[o]!==1&&r.push(e[o]),e[t[o]]!==1&&n.push(t[o]);return{newShape:r,newPerm:n}},pe=(e,t)=>{let r=e.dataType,n=e.dims.length,o=ao(n,t),s=Vu(e.dims,o),{newShape:i,newPerm:a}=Nu(e.dims,o),u=x.areEqual(a,[2,3,1]),d=x.areEqual(a,[3,1,2]),l=i.length===2&&a[0]>a[1]||u||d,c=l?i:e.dims,p=s;l&&(c=u?[i[0],i[1]*i[2]]:d?[i[0]*i[1],i[2]]:i,p=[c[1],c[0]]);let h=S("a",r,c.length),m=C("output",r,p.length),f=16,y;return l?y=b=>`
  ${b.registerUniform("output_size","u32").declareVariables(h,m)}
  var<workgroup> tile : array<array<${m.type.value}, ${f+1}>, ${f}>;
  ${b.mainStart([f,f,1])}
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
  }`:y=b=>`
  ${b.registerUniform("output_size","u32").declareVariables(h,m)}

  ${Uu(o,n,h,m)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${m.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${m.setByOffset("global_idx",h.getByIndices("aIndices"))}
  }`,{name:l?"TransposeShared":"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let b=x.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:l?{x:Math.ceil(p[1]/f),y:Math.ceil(p[0]/f)}:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...k(c,p)]}},getShaderSource:y}},uo=(e,t)=>{Mu(e.inputs),e.compute(pe(e.inputs[0],t.perm))},lo=e=>U({perm:e.perm})});var Wu,Lu,Gu,Hu,qu,Fu,Ku,ju,Zu,Xu,Ee,co,po,mo,fo,ho,go,yo,bo,wo,_o,$o=A(()=>{"use strict";M();q();F();Gt();De();Wu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Lu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Gu={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Hu={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},qu=(e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r},Fu=(e,t)=>{let r=[],n=e.length;for(let s=0;s<n;s++)t.indexOf(s)===-1&&r.push(e[s]);let o=t.map(s=>e[s]);return[r,o]},Ku=(e,t)=>{let r=e.length+t.length,n=[],o=0;for(let s=0;s<r;s++)t.indexOf(s)===-1?n.push(e[o++]):n.push(1);return n},ju=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},Zu=(e,t)=>{let r=[];if(!ju(e,t)){for(let n=0;n<t;++n)e.indexOf(n)===-1&&r.push(n);e.forEach(n=>r.push(n))}return r},Xu=(e,t,r,n,o,s,i)=>{let a=r[0].dims,u=x.size(s),d=x.size(i),l=S("_A",r[0].dataType,a),c=C("output",o,s),p=32,h=`
          var<workgroup> aBestValues : array<f32, ${p}>;
       `;return{name:e,shaderCache:t,getShaderSource:f=>`
        ${f.registerUniform("reduceSize","u32").declareVariables(l,c)}
        ${h}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${f.mainStart(p)}

          let outputIndex = global_idx / ${p};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Gu[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${p}) {
           let candidate = f32(${l.getByOffset("offset + k")});
           bestValue = ${Wu[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${p}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Lu[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${c.setByOffset("outputIndex",`${n==="mean"?`${c.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${c.type.storage}(${Hu[n]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:u},programUniforms:[{type:12,data:d}]})}},Ee=(e,t,r,n)=>{let o=e.inputs.length===1?r:Dr(e.inputs,r),s=o.axes;s.length===0&&!o.noopWithEmptyAxes&&(s=e.inputs[0].dims.map((h,m)=>m));let i=x.normalizeAxes(s,e.inputs[0].dims.length),a=i,u=e.inputs[0],d=Zu(a,e.inputs[0].dims.length);d.length>0&&(u=e.compute(pe(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],a=qu(a.length,u.dims.length));let[l,c]=Fu(u.dims,a),p=l;o.keepDims&&(p=Ku(l,i)),e.compute(Xu(t,{hint:o.cacheKey,inputDependencies:["type"]},[u],n,e.inputs[0].dataType,p,c),{inputs:[u]})},co=(e,t)=>{Ee(e,"ReduceMeanShared",t,"mean")},po=(e,t)=>{Ee(e,"ReduceL1Shared",t,"l1")},mo=(e,t)=>{Ee(e,"ReduceL2Shared",t,"l2")},fo=(e,t)=>{Ee(e,"ReduceLogSumExpShared",t,"logSumExp")},ho=(e,t)=>{Ee(e,"ReduceMaxShared",t,"max")},go=(e,t)=>{Ee(e,"ReduceMinShared",t,"min")},yo=(e,t)=>{Ee(e,"ReduceProdShared",t,"prod")},bo=(e,t)=>{Ee(e,"ReduceSumShared",t,"sum")},wo=(e,t)=>{Ee(e,"ReduceSumSquareShared",t,"sumSquare")},_o=(e,t)=>{Ee(e,"ReduceLogSumShared",t,"logSum")}});var Pe,Qu,Ht,Dr,ze,Yu,Ju,ed,td,rd,nd,od,id,sd,ad,Be,vo,xo,So,To,Io,Co,Ao,ko,Eo,Po,Gt=A(()=>{"use strict";M();q();ue();F();$o();Pe=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},Qu=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Ht=(e,t,r,n,o,s,i=!1,a=!1)=>{let u=[],d=r[0].dims,l=d.length,c=x.normalizeAxes(o,l),p=!a&&c.length===0;d.forEach((y,b)=>{p||c.indexOf(b)>=0?i&&u.push(1):u.push(y)});let h=u.length,m=x.size(u);return{name:e,shaderCache:t,getShaderSource:y=>{let b=[],g=S("_A",r[0].dataType,l),w=C("output",s,h),_=n(g,w,c),$=_[2];for(let v=0,T=0;v<l;v++)p||c.indexOf(v)>=0?(i&&T++,$=`for(var j${v}: u32 = 0; j${v} < ${d[v]}; j${v}++) {
                  ${_[2].includes("last_index")?`let last_index = j${v};`:""}
                  ${g.indicesSet("input_indices",v,`j${v}`)}
                  ${$}
                }`):(b.push(`${g.indicesSet("input_indices",v,w.indicesGet("output_indices",T))};`),T++);return`

        ${y.registerUniform("output_size","u32").declareVariables(g,w)}

        ${y.mainStart()}
          ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${g.type.indices};
          let output_indices = ${w.offsetToIndices("global_idx")};

          ${b.join(`
`)}
          ${_[0]}       // init ops for reduce max/min
          ${_[1]}
          ${$}
          ${_[3]}
          ${_.length===4?w.setByOffset("global_idx","value"):_.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:s}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...k(d,u)]})}},Dr=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),U({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},ze=(e,t,r,n)=>{let o=e.inputs,s=o.length===1?r:Dr(o,r);e.compute(Ht(t,{hint:s.cacheKey,inputDependencies:["rank"]},[o[0]],s.noopWithEmptyAxes&&s.axes.length===0?Qu:n,s.axes,o[0].dataType,s.keepDims,s.noopWithEmptyAxes),{inputs:[0]})},Yu=(e,t)=>{Pe(e.inputs),ze(e,"ReduceLogSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},Ju=(e,t)=>{Pe(e.inputs),ze(e,"ReduceL1",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},ed=(e,t)=>{Pe(e.inputs),ze(e,"ReduceL2",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},td=(e,t)=>{Pe(e.inputs),ze(e,"ReduceLogSumExp",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},rd=(e,t)=>{Pe(e.inputs),ze(e,"ReduceMax",t,(n,o,s)=>{let i=[];for(let a=0;a<n.rank;a++)(s.indexOf(a)>=0||s.length===0)&&i.push(n.indicesSet("input_indices",a,0));return[`${i.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},nd=(e,t)=>{Pe(e.inputs),ze(e,"ReduceMean",t,(n,o,s)=>{let i=1;for(let a=0;a<n.rank;a++)(s.indexOf(a)>=0||s.length===0)&&(i*=e.inputs[0].dims[a]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${i});`]})},od=(e,t)=>{Pe(e.inputs),ze(e,"ReduceMin",t,(n,o,s)=>{let i=[];for(let a=0;a<n.rank;a++)(s.indexOf(a)>=0||s.length===0)&&i.push(`input_indices[${a}] = 0;`);return[`${i.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},id=(e,t)=>{Pe(e.inputs),ze(e,"ReduceProd",t,(n,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},sd=(e,t)=>{Pe(e.inputs),ze(e,"ReduceSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},ad=(e,t)=>{Pe(e.inputs),ze(e,"ReduceSumSquare",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},Be=(e,t,r)=>{if(t.length===0)return r;let n=1,o=1;for(let s=0;s<t.length;s++)t.indexOf(s)===-1?n*=e[s]:o*=e[s];return o<32&&n>1024},vo=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?nd(e,t):co(e,t)},xo=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ju(e,t):po(e,t)},So=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ed(e,t):mo(e,t)},To=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?td(e,t):fo(e,t)},Io=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?rd(e,t):ho(e,t)},Co=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?od(e,t):go(e,t)},Ao=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?id(e,t):yo(e,t)},ko=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?sd(e,t):bo(e,t)},Eo=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ad(e,t):wo(e,t)},Po=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Yu(e,t):_o(e,t)}});var zo,Bo,Oo,Rr,Do=A(()=>{"use strict";M();ue();Gt();zo=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Bo=(e,t)=>{zo(e.inputs);let r=(n,o,s)=>{let i=[];for(let a=0;a<n.rank;a++)(s.indexOf(a)>=0||s.length===0)&&i.push(`input_indices[${a}] = 0;`);return[`${i.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Ht("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Oo=(e,t)=>{zo(e.inputs);let r=(n,o,s)=>{let i=[];for(let a=0;a<n.rank;a++)(s.indexOf(a)>=0||s.length===0)&&i.push(`input_indices[${a}] = 0;`);return[`${i.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Ht("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Rr=e=>U(e)});var ud,Mr,dd,ld,cd,Qe,pd,Ro,qt=A(()=>{"use strict";M();q();Nt();F();ud=(e,t)=>{let r=e[0],n=e[1],o=e[2],s=e[3],i=e[4],a=e[5];if(i&&a)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=r.dims[0],d=r.dims[1],l=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(n.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==l)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==n.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let c=o.dims[0]/3,p=c,h=p;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let w of t.qkvHiddenSizes)if(w%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");c=t.qkvHiddenSizes[0],p=t.qkvHiddenSizes[1],h=t.qkvHiddenSizes[2]}let m=d;if(c!==p)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==c+p+h)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let f=0;if(i){if(p!==h)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(i.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(i.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(i.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(i.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(i.dims[4]!==p/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(f=i.dims[3])}let y=m+f,b=-1,g=0;if(s)throw new Error("Mask not supported");if(i)throw new Error("past is not supported");if(a){if(a.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(a.dims[0]!==u||a.dims[1]!==t.numHeads||a.dims[2]!==d||a.dims[3]!==y)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:d,pastSequenceLength:f,kvSequenceLength:m,totalSequenceLength:y,maxSequenceLength:b,inputHiddenSize:l,hiddenSize:c,vHiddenSize:h,headSize:Math.floor(c/t.numHeads),vHeadSize:Math.floor(h/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:g,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Mr=(e,t,r)=>t&&e?`
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
    `,dd=(e,t,r,n,o,s,i,a)=>{let u=re(i?1:s),d=64,l=s/u;l<d&&(d=32);let c=Math.ceil(s/u/d),p=[{type:12,data:t},{type:12,data:r},{type:12,data:n},{type:12,data:o},{type:12,data:l},{type:12,data:c}],h=J(e.dataType,u),m=ce(1,u),f=["type"];i&&f.push("type"),a&&f.push("type");let y=b=>{let g=C("x",e.dataType,e.dims,u),w=[g],_=i?S("seq_lens",i.dataType,i.dims):void 0;_&&w.push(_);let $=a?S("total_sequence_length_input",a.dataType,a.dims):void 0;$&&w.push($);let v=ce(e.dataType),T=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${d}>;
  var<workgroup> thread_sum: array<f32, ${d}>;
  ${b.registerUniforms(T).declareVariables(...w)}
  ${b.mainStart([d,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Mr(_,$,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${d}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${i?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${m}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${m}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${d}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${m}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${m}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${d}; i++) {
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
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${d};${h};${u}`,inputDependencies:f},getShaderSource:y,getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(s/d),y:o,z:t*r},programUniforms:p})}},ld=(e,t,r,n,o,s,i,a,u)=>{let d=i+s.kvSequenceLength,l=[s.batchSize,s.numHeads,s.sequenceLength,d],c=e>1&&n,p=s.kvNumHeads?s.kvNumHeads:s.numHeads,h=c?[s.batchSize,p,d,s.headSize]:void 0,m=s.nReps?s.nReps:1,f=s.scale===0?1/Math.sqrt(s.headSize):s.scale,y=re(s.headSize),b=s.headSize/y,g=12,w={x:Math.ceil(d/g),y:Math.ceil(s.sequenceLength/g),z:s.batchSize*s.numHeads},_=[{type:12,data:s.sequenceLength},{type:12,data:b},{type:12,data:d},{type:12,data:s.numHeads},{type:12,data:s.headSize},{type:1,data:f},{type:12,data:i},{type:12,data:s.kvSequenceLength},{type:12,data:m}],$=c&&n&&x.size(n.dims)>0,v=["type","type"];$&&v.push("type"),o&&v.push("type"),a&&v.push("type"),u&&v.push("type");let T=[{dims:l,dataType:t.dataType,gpuDataType:0}];c&&T.push({dims:h,dataType:t.dataType,gpuDataType:0});let I=P=>{let B=S("q",t.dataType,t.dims,y),D=S("key",r.dataType,r.dims,y),L=[B,D];if($){let V=S("past_key",n.dataType,n.dims,y);L.push(V)}o&&L.push(S("attention_bias",o.dataType,o.dims));let z=a?S("seq_lens",a.dataType,a.dims):void 0;z&&L.push(z);let N=u?S("total_sequence_length_input",u.dataType,u.dims):void 0;N&&L.push(N);let se=C("output",t.dataType,l),W=[se];c&&W.push(C("present_key",t.dataType,h,y));let Z=ce(1,y),K=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${g}u;

  var<workgroup> tileQ: array<${B.type.storage}, ${g*g}>;
  var<workgroup> tileK: array<${B.type.storage}, ${g*g}>;
  ${P.registerUniforms(K).declareVariables(...L,...W)}
  ${P.mainStart([g,g,1])}
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
      var sum: f32 = ${(()=>{switch(y){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${y}`)}})()};
        output[outputIdx] = ${se.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${y};${o!==void 0};${n!==void 0};${e}`,inputDependencies:v},getRunData:()=>({outputs:T,dispatchGroup:w,programUniforms:_}),getShaderSource:I}},cd=(e,t,r,n,o,s,i=void 0,a=void 0)=>{let u=s+o.kvSequenceLength,d=o.nReps?o.nReps:1,l=o.vHiddenSize*d,c=e>1&&n,p=o.kvNumHeads?o.kvNumHeads:o.numHeads,h=c?[o.batchSize,p,u,o.headSize]:void 0,m=[o.batchSize,o.sequenceLength,l],f=12,y={x:Math.ceil(o.vHeadSize/f),y:Math.ceil(o.sequenceLength/f),z:o.batchSize*o.numHeads},b=[{type:12,data:o.sequenceLength},{type:12,data:u},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:l},{type:12,data:s},{type:12,data:o.kvSequenceLength},{type:12,data:d}],g=c&&n&&x.size(n.dims)>0,w=["type","type"];g&&w.push("type"),i&&w.push("type"),a&&w.push("type");let _=[{dims:m,dataType:t.dataType,gpuDataType:0}];c&&_.push({dims:h,dataType:t.dataType,gpuDataType:0});let $=v=>{let T=S("probs",t.dataType,t.dims),I=S("v",r.dataType,r.dims),P=[T,I];g&&P.push(S("past_value",n.dataType,n.dims));let B=i?S("seq_lens",i.dataType,i.dims):void 0;i&&P.push(B);let D=a?S("total_sequence_length_input",a.dataType,a.dims):void 0;a&&P.push(D);let z=[C("output",t.dataType,m)];c&&z.push(C("present_value",t.dataType,h));let N=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${f}u;
  var<workgroup> tileQ: array<${T.type.value}, ${f*f}>;
  var<workgroup> tileV: array<${T.type.value}, ${f*f}>;
  ${v.registerUniforms(N).declareVariables(...P,...z)}
  ${v.mainStart([f,f,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${d===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${d===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Mr(B,D,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${g&&c?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${c?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${T.type.storage}(0);
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${n!==void 0};${e}`,inputDependencies:w},getRunData:()=>({outputs:_,dispatchGroup:y,programUniforms:b}),getShaderSource:$}},Qe=(e,t,r,n,o,s,i,a,u,d,l=void 0,c=void 0)=>{let p=Math.min(e.outputCount,1+(i?1:0)+(a?1:0)),h=p>1?d.pastSequenceLength:0,m=h+d.kvSequenceLength,f=u&&x.size(u.dims)>0?u:void 0,y=[t,r];p>1&&i&&x.size(i.dims)>0&&y.push(i),f&&y.push(f),l&&y.push(l),c&&y.push(c);let b=e.compute(ld(p,t,r,i,f,d,h,l,c),{inputs:y,outputs:p>1?[-1,1]:[-1]})[0];e.compute(dd(b,d.batchSize,d.numHeads,h,d.sequenceLength,m,l,c),{inputs:l&&c?[b,l,c]:[b],outputs:[]});let g=[b,n];p>1&&a&&x.size(a.dims)>0&&g.push(a),l&&g.push(l),c&&g.push(c),e.compute(cd(p,b,n,a,d,h,l,c),{inputs:g,outputs:p>1?[0,2]:[0]})},pd=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],n=t.sequenceLength,o=t.inputHiddenSize,s=t.headSize,i=12,a={x:Math.ceil(t.headSize/i),y:Math.ceil(t.sequenceLength/i),z:t.batchSize*t.numHeads},u=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:n},{type:12,data:o},{type:12,data:s},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],l=c=>{let p=C("output_q",u[0].dataType,r),h=C("output_k",u[0].dataType,r),m=C("output_v",u[0].dataType,r),f=S("input",u[0].dataType,u[0].dims),y=S("weight",u[1].dataType,u[1].dims),b=S("bias",u[2].dataType,u[2].dims),g=f.type.storage,w=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${i}u;
  var<workgroup> tileInput: array<${g}, ${i*i}>;
  var<workgroup> tileWeightQ: array<${g}, ${i*i}>;
  var<workgroup> tileWeightK: array<${g}, ${i*i}>;
  var<workgroup> tileWeightV: array<${g}, ${i*i}>;
  ${c.registerUniforms(w).declareVariables(f,y,b,p,h,m)}
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:a,programUniforms:d}),getShaderSource:l},{inputs:u,outputs:[-1,-1,-1]})},Ro=(e,t)=>{let r=ud(e.inputs,t),[n,o,s]=pd(e,r);return Qe(e,n,o,s,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}});var md,fd,hd,Mo,Vo=A(()=>{"use strict";Se();M();q();ue();F();md=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(n,o,s)=>{let i=o.length;if(i!==n.length)throw new Error(`${s}: num dimensions != ${i}`);o.forEach((a,u)=>{if(a!==n[u])throw new Error(`${s}: dim[${u}] do not match`)})};if(e[0].dims.length>1){let n=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},fd=(e,t)=>{let{epsilon:r,spatial:n,format:o}=t,s=e[0].dims,i=n?re(s[s.length-1]):1,a=o==="NHWC"&&s.length>1?i:1,u=x.size(s)/i,d=n,l=d?s.length:s,c=S("x",e[0].dataType,e[0].dims,i),p=S("scale",e[1].dataType,e[1].dims,a),h=S("bias",e[2].dataType,e[2].dims,a),m=S("inputMean",e[3].dataType,e[3].dims,a),f=S("inputVar",e[4].dataType,e[4].dims,a),y=C("y",e[0].dataType,l,i),b=()=>{let w="";if(n)w=`let cOffset = ${s.length===1?"0u":o==="NHWC"?`outputIndices[${s.length-1}] / ${i}`:"outputIndices[1]"};`;else if(o==="NCHW")w=`
            ${y.indicesSet("outputIndices","0","0")}
            let cOffset = ${y.indicesToOffset("outputIndices")};`;else{w=`var cIndices = ${p.type.indices}(0);
                       cIndices[0] = outputIndices[${s.length-1}];`;for(let _=1;_<p.rank;_++)w+=`cIndices[${_}] = outputIndices[${_}];`;w+=`let cOffset = ${p.indicesToOffset("cIndices")};`}return w},g=w=>`
  const epsilon = ${r};
  ${w.registerUniform("outputSize","u32").declareVariables(c,p,h,m,f,y)}
  ${w.mainStart()}
  ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${y.offsetToIndices(`global_idx * ${i}`)};
    ${b()}
    let scale = ${p.getByOffset("cOffset")};
    let bias = ${h.getByOffset("cOffset")};
    let inputMean = ${m.getByOffset("cOffset")};
    let inputVar = ${f.getByOffset("cOffset")};
    let x = ${c.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${y.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${i}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:g,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d?[{type:12,data:u},...k(s)]:[{type:12,data:u}]})}},hd=e=>U(e),Mo=(e,t)=>{let{inputs:r,outputCount:n}=e,o=hd({...t,outputCount:n});if(te.webgpu.validateInputContent&&md(r,o),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(fd(r,o))}});var gd,yd,Uo,No=A(()=>{"use strict";q();F();gd=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},yd=e=>{let t=e[0].dims,r=e[0].dims[2],n=x.size(t)/4,o=e[0].dataType,s=S("input",o,t,4),i=S("bias",o,[r],4),a=S("residual",o,t,4),u=C("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:l=>`
  const channels = ${r}u / 4;
  ${l.declareVariables(s,i,a,u)}

  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${s.getByOffset("global_idx")}
      + ${i.getByOffset("global_idx % channels")} + ${a.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},Uo=e=>{gd(e.inputs),e.compute(yd(e.inputs))}});var bd,ee,Wo,Lo,Go,Ho,qo,Fo,Ko,jo,Zo,wd,Xo,Qo,Yo,Jo,at,ei,Ft,ti,ri,ni,oi,ii,si,ai,ui,di,li,ci,pi,mi,fi,hi,gi,yi,bi,Vr,Ur,wi,_i,$i,_d,$d,vi,Kt=A(()=>{"use strict";M();q();ue();F();bd=(e,t,r,n,o,s,i)=>{let a=Math.ceil(t/4),u="";typeof o=="string"?u=`${o}(a)`:u=o("a");let d=S("inputData",r,[a],4),l=C("outputData",n,[a],4),c=[{name:"vec_size",type:"u32"}];return i&&c.push(...i),`
      ${e.registerUniforms(c).declareVariables(d,l)}

  ${s??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${l.setByOffset("global_idx",u)}
  }`},ee=(e,t,r,n,o,s=e.dataType,i,a)=>{let u=[{type:12,data:Math.ceil(x.size(e.dims)/4)}];return i&&u.push(...i),{name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:d=>bd(d,x.size(e.dims),e.dataType,s,r,n,a),getRunData:d=>({outputs:[{dims:e.dims,dataType:s}],dispatchGroup:{x:Math.ceil(x.size(d[0].dims)/64/4)},programUniforms:u})}},Wo=e=>{e.compute(ee(e.inputs[0],"Abs","abs"))},Lo=e=>{e.compute(ee(e.inputs[0],"Acos","acos"))},Go=e=>{e.compute(ee(e.inputs[0],"Acosh","acosh"))},Ho=e=>{e.compute(ee(e.inputs[0],"Asin","asin"))},qo=e=>{e.compute(ee(e.inputs[0],"Asinh","asinh"))},Fo=e=>{e.compute(ee(e.inputs[0],"Atan","atan"))},Ko=e=>{e.compute(ee(e.inputs[0],"Atanh","atanh"))},jo=e=>U(e),Zo=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ee(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},wd=e=>{let t,r,n=e.length>=2&&e[1].data!==0,o=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=n?e[1].getFloat32Array()[0]:-34028234663852886e22,r=o?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=n?e[1].getUint16Array()[0]:64511,r=o?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return U({min:t,max:r})},Xo=(e,t)=>{let r=t||wd(e.inputs),n=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"Clip",o=>`clamp(${o}, vec4<${n}>(uniforms.min), vec4<${n}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:n},{name:"max",type:n}]),{inputs:[0]})},Qo=e=>{e.compute(ee(e.inputs[0],"Ceil","ceil"))},Yo=e=>{e.compute(ee(e.inputs[0],"Cos","cos"))},Jo=e=>{e.compute(ee(e.inputs[0],"Cosh","cosh"))},at=e=>U(e),ei=(e,t)=>{let r=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"Elu",n=>`elu_vf32(${n})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Ft=(e="f32")=>`
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
}`,ti=e=>{let t=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Ft(t)))},ri=e=>{e.compute(ee(e.inputs[0],"Exp","exp"))},ni=e=>{e.compute(ee(e.inputs[0],"Floor","floor"))},oi=e=>{let t=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Ft(t)))},ii=(e,t)=>{let r=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"LeakyRelu",n=>`select(leaky_relu_alpha_ * ${n}, ${n}, ${n} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},si=e=>{e.compute(ee(e.inputs[0],"Not",t=>`!${t}`))},ai=e=>{e.compute(ee(e.inputs[0],"Neg",t=>`-${t}`))},ui=e=>{e.compute(ee(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},di=e=>{let t=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},li=e=>{e.compute(ee(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},ci=e=>U(e),pi=(e,t)=>{let r=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"HardSigmoid",n=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${n} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},mi=e=>{e.compute(ee(e.inputs[0],"Sin","sin"))},fi=e=>{e.compute(ee(e.inputs[0],"Sinh","sinh"))},hi=e=>{e.compute(ee(e.inputs[0],"Sqrt","sqrt"))},gi=e=>{e.compute(ee(e.inputs[0],"Tan","tan"))},yi=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,bi=e=>{e.compute(ee(e.inputs[0],"Tanh",yi))},Vr=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${yi("v")};
}
`,Ur=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,wi=e=>{let t=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"FastGelu",Ur,Vr(t),void 0,e.inputs[0].dataType))},_i=(e,t)=>{let r=ce(e.inputs[0].dataType);return e.compute(ee(e.inputs[0],"ThresholdedRelu",n=>`select(vec4<${r}>(0.0), ${n}, ${n} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},$i=e=>{e.compute(ee(e.inputs[0],"Log","log"))},_d=(e,t)=>`
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
`,$d=e=>`quick_gelu_impl(${e})`,vi=(e,t)=>{let r=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"QuickGelu",$d,_d(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}});var vd,xd,Si,Ti=A(()=>{"use strict";q();F();Kt();vd=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},xd=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=S("input",e[0].dataType,e[0].dims,4),n=S("bias",e[0].dataType,[e[0].dims[2]],4),o=C("output",e[0].dataType,t,4),s=x.size(t)/4,i=J(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${u.declareVariables(r,n,o)}

  ${Ft(i)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(s)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Si=e=>{vd(e.inputs),e.compute(xd(e.inputs))}});var Sd,Td,Oe,Ii,Ci,Ai,ki,Ei,Pi,zi,Bi,Oi,Di,Ri=A(()=>{"use strict";M();q();F();Sd=(e,t,r,n,o,s,i,a,u,d,l,c)=>{let p,h;typeof a=="string"?p=h=(g,w)=>`${a}((${g}),(${w}))`:typeof a=="function"?p=h=a:(p=a.scalar,h=a.vector);let m=C("outputData",l,n.length,4),f=S("aData",u,t.length,4),y=S("bData",d,r.length,4),b;if(o)if(s){let g=x.size(t)===1,w=x.size(r)===1,_=t.length>0&&t[t.length-1]%4===0,$=r.length>0&&r[r.length-1]%4===0;g||w?b=m.setByOffset("global_idx",h(g?`${f.type.value}(${f.getByOffset("0")}.x)`:f.getByOffset("global_idx"),w?`${y.type.value}(${y.getByOffset("0")}.x)`:y.getByOffset("global_idx"))):b=`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${f.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${y.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",h(i||_?f.getByOffset("offsetA / 4u"):`${f.type.value}(${f.getByOffset("offsetA / 4u")}[offsetA % 4u])`,i||$?y.getByOffset("offsetB / 4u"):`${y.type.value}(${y.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else b=m.setByOffset("global_idx",h(f.getByOffset("global_idx"),y.getByOffset("global_idx")));else{if(!s)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let g=(w,_,$="")=>{let v=`aData[indexA${_}][componentA${_}]`,T=`bData[indexB${_}][componentB${_}]`;return`
            let outputIndices${_} = ${m.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offsetA${_} = ${f.broadcastedIndicesToOffset(`outputIndices${_}`,m)};
            let offsetB${_} = ${y.broadcastedIndicesToOffset(`outputIndices${_}`,m)};
            let indexA${_} = offsetA${_} / 4u;
            let indexB${_} = offsetB${_} / 4u;
            let componentA${_} = offsetA${_} % 4u;
            let componentB${_} = offsetB${_} % 4u;
            ${w}[${_}] = ${$}(${p(v,T)});
          `};l===9?b=`
            var data = vec4<u32>(0);
            ${g("data",0,"u32")}
            ${g("data",1,"u32")}
            ${g("data",2,"u32")}
            ${g("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:b=`
            ${g("outputData[global_idx]",0)}
            ${g("outputData[global_idx]",1)}
            ${g("outputData[global_idx]",2)}
            ${g("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(f,y,m)}

        ${c??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${b}
      }`},Td=(e,t,r,n,o,s,i=r.dataType)=>{let a=r.dims.map(f=>Number(f)??1),u=n.dims.map(f=>Number(f)??1),d=!x.areEqual(a,u),l=a,c=x.size(a),p=!1,h=!1,m=[d];if(d){let f=ke.calcShape(a,u,!1);if(!f)throw new Error("Can't perform binary op on the given tensors");l=f.slice(),c=x.size(l);let y=x.size(a)===1,b=x.size(u)===1,g=a.length>0&&a[a.length-1]%4===0,w=u.length>0&&u[u.length-1]%4===0;m.push(y),m.push(b),m.push(g),m.push(w);let _=1;for(let $=1;$<l.length;$++){let v=a[a.length-$],T=u[u.length-$];if(v===T)_*=v;else break}_%4===0?(h=!0,p=!0):(y||b||g||w)&&(p=!0)}else p=!0;return m.push(p),{name:e,shaderCache:{hint:t+m.map(f=>f.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:f=>Sd(f,a,u,l,p,d,h,o,r.dataType,n.dataType,i,s),getRunData:()=>({outputs:[{dims:l,dataType:i}],dispatchGroup:{x:Math.ceil(c/64/4)},programUniforms:[{type:12,data:Math.ceil(x.size(l)/4)},...k(a,u,l)]})}},Oe=(e,t,r,n,o,s)=>{e.compute(Td(t,o??"",e.inputs[0],e.inputs[1],r,n,s))},Ii=e=>{Oe(e,"Add",(t,r)=>`${t}+${r}`)},Ci=e=>{Oe(e,"Div",(t,r)=>`${t}/${r}`)},Ai=e=>{Oe(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},ki=e=>{Oe(e,"Mul",(t,r)=>`${t}*${r}`)},Ei=e=>{let t=S("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Oe(e,"Pow",{scalar:(n,o)=>`pow_custom(${n},${o})`,vector:(n,o)=>`pow_vector_custom(${n},${o})`},`
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
      `)},Pi=e=>{Oe(e,"Sub",(t,r)=>`${t}-${r}`)},zi=e=>{Oe(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Bi=e=>{Oe(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Oi=e=>{Oe(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Di=e=>{Oe(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}});var Cd,Ad,kd,Ed,Mi,Vi,Ui=A(()=>{"use strict";M();q();ue();F();Cd=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,n=e[r],o=n.dataType,s=n.dims.length;e.forEach((i,a)=>{if(a!==r){if(i.dataType!==o)throw new Error("input tensors should be one type");if(i.dims.length!==s)throw new Error("input tensors should have the same shape");i.dims.forEach((u,d)=>{if(d!==t&&u!==n.dims[d])throw new Error("non concat dimensions must match")})}})},Ad=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,kd=(e,t)=>{let r=e.length,n=[];for(let o=0;o<r;++o){let s=t.setByOffset("global_idx",e[o].getByIndices("indices"));r===1?n.push(s):o===0?n.push(`if (inputIndex == ${o}u) { ${s} }`):o===r-1?n.push(`else { ${s} }`):n.push(`else if (inputIndex == ${o}) { ${s} }`)}return n.join(`
`)},Ed=(e,t,r,n)=>{let o=x.size(r),s=new Array(e.length),i=new Array(e.length),a=0,u=[],d=[],l=[{type:12,data:o}];for(let f=0;f<e.length;++f)a+=e[f].dims[t],s[f]=a,d.push(e[f].dims.length),i[f]=S(`input${f}`,n,d[f]),u.push("rank"),l.push({type:12,data:s[f]});for(let f=0;f<e.length;++f)l.push(...k(e[f].dims));l.push(...k(r));let c=C("output",n,r.length),p=c.indicesGet("indices",t),h=Array.from(Array(s.length).keys()).map(f=>`uniforms.sizeInConcatAxis${f}`).join(","),m=f=>`

  ${(()=>{f.registerUniform("outputSize","u32");for(let y=0;y<e.length;y++)f.registerUniform(`sizeInConcatAxis${y}`,"u32");return f.declareVariables(...i,c)})()}

  ${Ad(s.length,h)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${c.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${p});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${s.length}u>(${h});
      ${p} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${kd(i,c)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:l}),getShaderSource:m}},Mi=(e,t)=>{let r=e.inputs,n=r[0].dims,o=x.normalizeAxis(t.axis,n.length);Cd(r,o);let s=n.slice();s[o]=r.reduce((a,u)=>a+(u.dims.length>o?u.dims[o]:0),0);let i=r.filter(a=>x.size(a.dims)>0);e.compute(Ed(i,o,s,r[0].dataType),{inputs:i})},Vi=e=>U({axis:e.axis})});var $e,ve,xe,jt,Re=A(()=>{"use strict";M();q();$e=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},ve=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},xe=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},jt=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,n]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:n}}else if(t==="Clip"){let[r,n]=e?.activation_params||[oo,io];return{activation:t,clipMax:n,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}});var me,Zt,ut=A(()=>{"use strict";me=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Zt=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Xt,Nr=A(()=>{"use strict";Xt=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var Pd,zd,dt,Ni,Bd,lt,Od,Qt,ct=A(()=>{"use strict";M();q();F();Re();ut();Pd=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,zd=(e,t)=>e?`
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
        }`,dt=(e,t,r="f32",n,o=!1,s=32,i=!1,a=32)=>{let u=t[1]*e[1],d=t[0]*e[0],l=o?u:s,c=o?s:u,p=l/t[0],h=s/t[1];if(!((o&&p===4&&e[1]===4||!o&&(p===3||p===4))&&l%t[0]===0&&s%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${p} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${p} must be 3 or 4.
  tileAWidth ${l} must be divisible by workgroupSize[0]${t[0]}. tileInner ${s} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${p}<${r}>, ${l/p}>, ${c}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${d/e[0]}>, ${s}>;

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
  ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
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
          ${Pd(o,n)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
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
          ${p===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${zd(o,p)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Ni=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Bd=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",lt=(e,t,r="f32",n,o=!1,s=32,i=!1,a=32,u=!1)=>{let d=e[1]*t[1],l=e[0]*t[0],c=o?d:s,p=o?s:d;if(!(p%t[1]===0&&c%t[0]===0&&s%t[1]===0))throw new Error(`tileAHight ${p} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}, tileInner ${s} must be divisible by workgroupSize[1]${t[1]}`);let h=p/t[1],m=c/t[0],f=s/t[1],y=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${l};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${p}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          ${Ni(o,n)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${s}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${l}; inputCol = inputCol + ${t[0]}) {
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
let globalRowStart = i32(workgroupId.y) * ${d};

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
      ${Ni(o,n)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
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
      ${Bd(o)}
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
  var<workgroup> mm_Bsub : array<array<${r}, ${l}>, ${s}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${i?"0":"i32(globalId.z)"};
    ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${i?`${Math.ceil(a/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${i?`i32(globalId.z) * ${a}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${y}
  }
`},Od=(e,t,r,n,o,s=!1)=>{let[i,a,u]=o,[d,l,c,p]=n,h=Xe(i,u),m=Xe(a,u),f=J(n[0].type.tensor),y=()=>{let w=l.rank,_=d.rank,$=`var aIndices: ${l.type.indices};`;for(let v=w-2-1,T=_-1;v>=0;v--,T--)$+=`
aIndices[${v}] = ${_>1?`batchIndices[${T}]`:"batchIndices"};`;return h.forEach(v=>{$+=`
aIndices[${v}] = 0;`}),$+=`
aIndices[${w-2}] = u32(row);
                   aIndices[${w-1}] = u32(colIn);`,$},b=()=>{let w=c.rank,_=d.rank,$=`var bIndices: ${c.type.indices};`;for(let v=w-2-1,T=_-1;v>=0;v--,T--)$+=`
bIndices[${v}] = ${_>1?`batchIndices[${T}]`:"batchIndices"};`;return m.forEach(v=>{$+=`
bIndices[${v}] = 0;`}),$+=`
bIndices[${w-2}] = u32(row);
                   bIndices[${w-1}] = u32(colIn);`,$};return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${d.type.indices}) -> ${me(e,f)} {
      var value = ${me(e,f)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        ${y()}
        value = ${l.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${d.type.indices}) -> ${me(e,f)} {
      var value = ${me(e,f)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        ${b()}
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
    `},Qt=(e,t,r,n,o=!1,s)=>{let i=e[0].dims,a=e[1].dims,u=i.slice(0,-2),d=a.slice(0,-2),l=n?n.slice(0,-2):r.slice(0,-2),c=x.size(l),p=i[i.length-2],h=i[i.length-1],m=a[a.length-1],f=h%4===0&&m%4===0,y=p<=8?[4,1,1]:[4,4,1],b=[8,8,1],g=[Math.ceil(m/b[0]/y[0]),Math.ceil(p/b[1]/y[1]),Math.ceil(c/b[2]/y[2])],w=f?4:1,_=[...u,p,h/w],$=_.length,v=[...d,h,m/w],T=v.length,I=[c,p,m/w],P=[{type:6,data:p},{type:6,data:m},{type:6,data:h}];ve(t,P),P.push(...k(l,_,v));let B=["rank","rank"],D=e.length>2;D&&(P.push(...k(e[2].dims)),B.push("rank")),P.push(...k(I));let L=z=>{let N=l.length,se=Lt("batchDims",e[0].dataType,N,1),W=J(e[0].dataType),Z=S("a",e[0].dataType,$,w),K=S("b",e[1].dataType,T,w),V=C("result",e[0].dataType,I.length,w),ne=[Z,K];if(D){let R=o?w:1;ne.push(S("bias",e[2].dataType,e[2].dims.length,R))}let oe=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];xe(t,oe);let Q=J(V.type.tensor),H=$e(t,V.type.value,Q),E=Od(w,D,H,[se,Z,K,V],[u,d,l],o);return`
  ${z.registerUniforms(oe).registerInternalVariables(se).declareVariables(...ne,V)}
  ${E}
  ${f?dt(y,b,W,se):lt(y,b,W,se)}
                   `};return{name:"MatMul",shaderCache:{hint:`${y};${t.activation};${f};${o}`,inputDependencies:B},getRunData:()=>({outputs:[{dims:s?s(r):r,dataType:e[0].dataType}],dispatchGroup:{x:g[0],y:g[1],z:g[2]},programUniforms:P}),getShaderSource:L}}});var Dd,Wi,Li=A(()=>{"use strict";M();Ce();F();Re();ut();Nr();ct();Dd=(e,t,r,n,o=!1,s,i=4,a=4,u=4,d="f32")=>{let l=B=>{switch(B){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${B} is not supported.`)}},c=B=>{switch(B){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${B} is not supported.`)}},p=e?`
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
    `,m=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",f=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",y=e?"row":"col",b=e?"col":"row",g=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${y} / outWidth;
    let outCol = ${y} % outWidth;

    let WRow = ${b} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${b} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${b} % inChannels;
    var resData = ${me(i,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${m} && xCol >= 0 && xCol < ${f}) {
      ${p}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${l(i)}
    }
    return resData;`,w=e?t&&n?`
    let col = colIn * ${i};
    ${g}`:`
    let col = colIn * ${i};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${g}
    }
    return ${me(i,d)}(0.0);`:n&&r?`
    let col = colIn * ${i};
    ${g}`:`
    let col = colIn * ${i};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${g}
    }
    return ${me(i,d)}(0.0);`,_=`${c(a)}`,$=me(u,d),v=e?me(i,d):me(a,d),T=e?me(a,d):me(i,d),I=$e(s,$,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${v} {
      ${e?w:_}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${T} {
      ${e?_:w}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${$}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${h}
      ${Zt(o)}
      ${I}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Wi=(e,t,r,n,o,s,i,a,u)=>{let d=t.format==="NHWC",l=d?e[0].dims[3]:e[0].dims[1],c=r[0],p=d?r[2]:r[3],h=d?r[1]:r[2],m=d?r[3]:r[1],f=d&&(l%4===0||l%3===0)&&m%4===0,y=d?m:p*h,b=d?p*h:m,g=[8,8,1],w=n<=8?[4,1,1]:[4,4,1],_=[Math.ceil(y/g[0]/w[0]),Math.ceil(b/g[1]/w[1]),Math.ceil(c/g[2]/w[2])];j("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${_}`);let $=f?d&&l%4!==0?3:4:1,v=g[1]*w[1],T=g[0]*w[0],I=Math.max(g[0]*$,g[1]),P=n%v===0,B=o%T===0,D=s%I===0,L=f?[$,4,4]:[1,1,1],z=[{type:6,data:n},{type:6,data:o},{type:6,data:s},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];ve(t,z),z.push(...k(e[0].dims,e[1].dims));let N=["rank","rank"];i&&(z.push(...k(e[2].dims)),N.push("rank")),z.push(...k(r));let se=W=>{let Z=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];xe(t,Z);let K=f?4:1,V=J(e[0].dataType),ne=`
      fn setOutputAtIndex(flatIndex : i32, value : ${f?`vec4<${V}>`:V}) {
        result[flatIndex] = ${f?`vec4<${V}>`:V}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${f?`vec4<${V}>`:V}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${f?"/ 4":""}, value);
      }`,oe=S("x",e[0].dataType,e[0].dims.length,$===3?1:$),Q=S("w",e[1].dataType,e[1].dims.length,K),H=[oe,Q],E=C("result",e[0].dataType,r.length,K);if(i){let R=S("bias",e[2].dataType,e[2].dims.length,K);H.push(R),ne+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${f?`vec4<${V}>`:V} {
          return bias[coords.${d?"w":"y"}${f?"/ 4":""}];
        }`}return`
        ${Xt("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${W.registerUniforms(Z).declareVariables(...H,E)}
        ${ne}
        ${Dd(d,P,B,D,i,t,L[0],L[1],L[2],V)}
        ${f?dt(w,g,V,void 0,!d,I):lt(w,g,V,void 0,!d,I,!1,void 0,a)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${$};${f};${P};${B};${D};${v};${T};${I}`,inputDependencies:N},getRunData:()=>({outputs:[{dims:u?u(r):r,dataType:e[0].dataType}],dispatchGroup:{x:_[0],y:_[1],z:_[2]},programUniforms:z}),getShaderSource:se}}});var Rd,Gi,Yt,Md,Hi,Vd,qi,Fi,Ki=A(()=>{"use strict";M();Ce();q();F();Re();ut();Rd=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Gi=e=>typeof e=="number"?[e,e,e]:e,Yt=(e,t)=>t<=1?e:e+(e-1)*(t-1),Md=(e,t,r,n=1)=>{let o=Yt(t,n);return Math.floor((e[0]*(r-1)-r+o)/2)},Hi=(e,t,r,n,o)=>{o==null&&(o=Md(e,t[0],n[0]));let s=[0,0,0,r];for(let i=0;i<3;i++)e[i]+2*o>=t[i]&&(s[i]=Math.trunc((e[i]-t[i]+2*o)/n[i]+1));return s},Vd=(e,t,r,n,o,s,i,a,u,d)=>{let l,c,p,h;if(e==="VALID"&&(e=0),typeof e=="number"){l={top:e,bottom:e,left:e,right:e,front:e,back:e};let m=Hi([t,r,n,1],[a,u,d],1,[o,s,i],e);c=m[0],p=m[1],h=m[2]}else if(Array.isArray(e)){if(!e.every((f,y,b)=>f===b[0]))throw Error(`Unsupported padding parameter: ${e}`);l={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let m=Hi([t,r,n,1],[a,u,d],1,[o,s,i],e[0]);c=m[0],p=m[1],h=m[2]}else if(e==="SAME_UPPER"){c=Math.ceil(t/o),p=Math.ceil(r/s),h=Math.ceil(n/i);let m=(c-1)*o+a-t,f=(p-1)*s+u-r,y=(h-1)*i+d-n,b=Math.floor(m/2),g=m-b,w=Math.floor(f/2),_=f-w,$=Math.floor(y/2),v=y-$;l={top:w,bottom:_,left:$,right:v,front:b,back:g}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:l,outDepth:c,outHeight:p,outWidth:h}},qi=(e,t,r,n,o,s=!1,i="channelsLast")=>{let a,u,d,l,c;if(i==="channelsLast")[a,u,d,l,c]=e;else if(i==="channelsFirst")[a,c,u,d,l]=e;else throw new Error(`Unknown dataFormat ${i}`);let[p,,h,m,f]=t,[y,b,g]=Gi(r),[w,_,$]=Gi(n),v=Yt(h,w),T=Yt(m,_),I=Yt(f,$),{padInfo:P,outDepth:B,outHeight:D,outWidth:L}=Vd(o,u,d,l,y,b,g,v,T,I),z=s?p*c:p,N=[0,0,0,0,0];return i==="channelsFirst"?N=[a,z,B,D,L]:i==="channelsLast"&&(N=[a,B,D,L,z]),{batchSize:a,dataFormat:i,inDepth:u,inHeight:d,inWidth:l,inChannels:c,outDepth:B,outHeight:D,outWidth:L,outChannels:z,padInfo:P,strideDepth:y,strideHeight:b,strideWidth:g,filterDepth:h,filterHeight:m,filterWidth:f,effectiveFilterDepth:v,effectiveFilterHeight:T,effectiveFilterWidth:I,dilationDepth:w,dilationHeight:_,dilationWidth:$,inShape:e,outShape:N,filterShape:t}},Fi=(e,t,r,n,o,s)=>{let i=s==="channelsLast",a=i?e[0].dims[3]:e[0].dims[1],u=!1,d=[64,1,1],l={x:r.map((g,w)=>w)},c=[Math.ceil(Rd(l.x.map(g=>r[g]))/d[0]),1,1];j("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${c}`);let p=u?i&&a%4!==0?3:4:1,h=x.size(r),m=[{type:12,data:h},{type:12,data:n},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];ve(t,m),m.push(...k(e[0].dims,e[1].dims));let f=["rank","rank"],y=e.length===3;y&&(m.push(...k(e[2].dims)),f.push("rank")),m.push(...k(r));let b=g=>{let w=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:n.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];xe(t,w);let _=u?4:1,$=J(e[0].dataType),v=S("x",e[0].dataType,e[0].dims.length,p===3?1:p),T=S("W",e[1].dataType,e[1].dims.length,_),I=[v,T],P=C("result",e[0].dataType,r.length,_),B="";if(y){let z=S("bias",e[2].dataType,e[2].dims.length,_);I.push(z),B+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${$}>`:$} {
          return bias[${i?O("coords",4,5):O("coords",1,5)}${u?"/ 4":""}];
        }`}let D=me(p,$),L=$e(t,D,$);return`
            ${B}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${v.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${T.getByIndices("aIndices")};
            }
          ${g.registerUniforms(w).declareVariables(...I,P)}
          ${g.mainStart()}
          ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${P.offsetToIndices("global_idx")};
              let batch = ${O("coords",0,v.rank)};
              let d2 = ${i?O("coords",v.rank-1,v.rank):O("coords",1,v.rank)};
              let xFRCCorner = vec3<u32>(${i?O("coords",1,v.rank):O("coords",2,v.rank)},
              ${i?O("coords",2,v.rank):O("coords",3,v.rank)},
              ${i?O("coords",3,v.rank):O("coords",4,v.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${i?O("uniforms.x_shape",1,v.rank):O("uniforms.x_shape",2,v.rank)};
              let xShapeZ = ${i?O("uniforms.x_shape",2,v.rank):O("uniforms.x_shape",3,v.rank)};
              let xShapeW = ${i?O("uniforms.x_shape",3,v.rank):O("uniforms.x_shape",4,v.rank)};
              let xShapeU = ${i?O("uniforms.x_shape",4,v.rank):O("uniforms.x_shape",1,v.rank)};
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
              ${y?"value = value + getBiasByOutputCoords(coords)":""};
              ${L}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${i};${p};${y}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:c[0],y:c[1],z:c[2]},programUniforms:m}),getShaderSource:b}}});var ji,Zi,Xi=A(()=>{"use strict";M();q();F();Re();ji=(e,t,r,n)=>{let o=e.length>2,s=o?"value += b[output_channel];":"",i=e[0].dims,a=e[1].dims,u=t.format==="NHWC",d=u?r[3]:r[1],l=d/t.group,c=u&&l>=4?re(d):1,p=x.size(r)/c,h=[{type:12,data:p},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:l}];ve(t,h),h.push(...k(i,[a[0],a[1],a[2],a[3]/c]));let m=o?["rank","rank","rank"]:["rank","rank"];h.push(...k([r[0],r[1],r[2],r[3]/c]));let f=y=>{let b=C("output",e[0].dataType,r.length,c),g=J(b.type.tensor),w=$e(t,b.type.value,g),_=S("x",e[0].dataType,i.length),$=S("w",e[1].dataType,a.length,c),v=[_,$];o&&v.push(S("b",e[2].dataType,e[2].dims,c));let T=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];xe(t,T);let I=u?`
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
  ${y.registerUniforms(T).declareVariables(...v,b)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${b.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${c} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${b.type.value} = ${b.type.value}(0);
    ${I}
    ${s}
    ${w}
    ${b.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${c}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:h}),getShaderSource:f}},Zi=(e,t,r,n)=>{let o=e.length>2,s=re(r[3]),i=re(r[2]),a=x.size(r)/s/i,u=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/s],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/s],l=[r[0],r[1],r[2],r[3]/s],c=[{type:12,data:a},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];ve(t,c),c.push(...k(u,d,l));let p=(i-1)*t.strides[1]+d[1],h=m=>{let f=C("output",e[0].dataType,l.length,s),y=J(f.type.tensor),b=$e(t,f.type.value,y),g=S("x",e[0].dataType,u.length,s),w=S("w",e[1].dataType,d.length,s),_=[g,w];o&&_.push(S("b",e[2].dataType,e[2].dims,s));let $=o?"value += b[output_channel];":"",v=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return xe(t,v),`
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
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
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
        for (var w_width: u32 = 0u; w_width < ${d[1]}; w_width++) {
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
      ${b}
      ${f.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${s};${i};${p};${d[0]};${d[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}),getShaderSource:h}}});var Wr,Ud,Qi,Lr=A(()=>{"use strict";M();q();ct();F();Re();Wr=(e,t,r,n,o=!1,s)=>{let i=e[0].dims,a=e[1].dims,u=i[i.length-2],d=a[a.length-1],l=i[i.length-1],c=re(d),p=re(l),h=re(u),m=x.size(r)/c/h,f=e.length>2,y=n?n.slice(0,-2):r.slice(0,-2),g=[x.size(y),u,d],w=[{type:12,data:m},{type:12,data:u},{type:12,data:d},{type:12,data:l}];ve(t,w),w.push(...k(y,i,a)),f&&w.push(...k(e[2].dims)),w.push(...k(g));let _=$=>{let v=Lt("batch_dims",e[0].dataType,y.length),T=S("a",e[0].dataType,i.length,p),I=S("b",e[1].dataType,a.length,c),P=C("output",e[0].dataType,g.length,c),B=J(P.type.tensor),D=$e(t,P.type.value,B),L=[T,I],z="";if(f){let oe=o?c:1;L.push(S("bias",e[2].dataType,e[2].dims.length,oe)),z=`${o?`value += bias[col / ${oe}];`:`value += ${P.type.value}(bias[row + i]);`}`}let N=i.slice(0,-2),se=a.slice(0,-2),W=Xe(N,y),Z=Xe(se,y),K=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];xe(t,K);let V=(oe,Q)=>{let H=oe.rank,E=oe.name;if(H===2)return`var ${E}_indices = ${oe.type.indices}(0u, 0u);`;let R=v.rank,Y=`var ${E}_indices: ${oe.type.indices};`;for(let ge=H-2-1,ie=R-1;ge>=0;ge--,ie--)Y+=`
${E}_indices[${ge}] = ${R>1?`batch_indices[${ie}]`:"batch_indices"};`;return Q.forEach(ge=>{Y+=`
${E}_indices[${ge}] = 0;`}),Y+=`${E}_indices[${H-2}] = 0u;
                     ${E}_indices[${H-1}] = 0u;`,Y},ne=()=>{let oe=`var a_data: ${T.type.value};`;for(let Q=0;Q<p;Q++)oe+=`
              let b_data${Q} = b[(b_offset + (k + ${Q}) * uniforms.N + col) / ${c}];`;for(let Q=0;Q<h;Q++){oe+=`a_data = a[(a_offset + (row + ${Q}) * uniforms.K + k) / ${p}];`;for(let H=0;H<p;H++)oe+=`
            values[${Q}] = fma(${I.type.value}(a_data${p===1?"":`[${H}]`}), b_data${H}, values[${Q}]);
`}return oe};return`
  ${$.registerUniforms(K).registerInternalVariables(v).declareVariables(...L,P)}
  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${c})) * ${c};
    var index1 = global_idx / (uniforms.N / ${c});
    let stride1 = uniforms.M / ${h};
    let row = (index1 % stride1) * ${h};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${v.offsetToIndices("batch")};`}
    ${V(T,W)}
    let a_offset = ${T.indicesToOffset("a_indices")};
    ${V(I,Z)}
    let b_offset = ${I.indicesToOffset("b_indices")};
    var values: array<${P.type.value}, ${h}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${p}) {
      ${ne()}
    }
    for (var i = 0u; i < ${h}u; i++) {
      var value = values[i];
      ${z}
      ${D}
      let cur_indices = ${P.type.indices}(batch, row + i, col);
      let offset = ${P.indicesToOffset("cur_indices")};
      ${P.setByOffset(`offset / ${c}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${c};${p};${h};${o}`,inputDependencies:f?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:s?s(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:w}),getShaderSource:_}},Ud=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Qi=e=>{Ud(e.inputs);let t=ke.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];r<8&&n<8?e.compute(Wr(e.inputs,{activation:""},t)):e.compute(Qt(e.inputs,{activation:""},t))}});var Nd,Gr,Wd,Hr,qr,Yi,Ld,Gd,Fr,Ji=A(()=>{"use strict";q();Li();Ki();ct();Xi();Re();Lr();De();Nd=(e,t,r,n,o,s)=>{let i=e[0],a=e.slice(s?1:2,s?3:4),u=a.length,d=t[0],c=t.slice(2).map((m,f)=>m+(m-1)*(r[f]-1)),h=a.map((m,f)=>m+n[f]+n[f+u]).map((m,f)=>Math.floor((m-c[f]+o[f])/o[f]));return h.splice(0,0,i),h.splice(s?3:1,0,d),h},Gr=[2,3,1,0],Wd=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[1]*t.group;if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Hr=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let s=2;s<t[1].dims.length;++s)r[s-2]===0&&(r[s-2]=t[1].dims[s]);let n=e.pads.slice();qe.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.format==="NHWC",e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:r,pads:n}),o},qr=e=>{let t=jt(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],o=e.dilations,s=e.group,i=e.kernel_shape,a=e.pads,u=e.strides,d=e.w_is_const();return{autoPad:n,format:r,dilations:o,group:s,kernelShape:i,pads:a,strides:u,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},Yi=(e,t,r,n)=>{let o=r.format==="NHWC",s=Nd(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,o);if(r.group!==1){let v=[t[0]];if(o){let I=e.kernelCustomData.wT??e.compute(pe(t[1],Gr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=I),v.push(I)}else v.push(t[1]);t.length===3&&v.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(Zi(v,r,s,n),{inputs:v}):e.compute(ji(v,r,s,n),{inputs:v});return}let i=t.length===3,a=t[0].dims[o?1:2],u=t[0].dims[o?2:3],d=t[0].dims[o?3:1],l=t[1].dims[2],c=t[1].dims[3],p=s[o?1:2],h=s[o?2:3],m=s[o?3:1],f=o&&l===a&&c===u&&r.pads[0]===0&&r.pads[1]===0;if(f||l===1&&c===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let v=s[0],T,I,P,B=[];if(o){let z=e.kernelCustomData.wT??e.compute(pe(t[1],Gr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=z),f){let N=a*u*d;T=t[0].reshape([1,v,N]),I=z.reshape([1,N,m]),P=[1,v,m]}else T=t[0].reshape([v,a*u,d]),I=z.reshape([1,d,m]),P=[v,p*h,m];B.push(T),B.push(I)}else T=t[0].reshape([v,d,a*u]),I=t[1].reshape([1,m,d]),P=[v,m,p*h],B.push(I),B.push(T);i&&B.push(t[2]);let D=P[2],L=B[0].dims[B[0].dims.length-1];D<8&&L<8?e.compute(Wr(B,r,s,P,o,n),{inputs:B}):e.compute(Qt(B,r,s,P,o,n),{inputs:B});return}let y=!0,b=e.kernelCustomData.wT??e.compute(pe(t[1],Gr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=b);let g=[t[0],b];i&&g.push(t[2]);let w=o?p*h:m,_=o?m:p*h,$=l*c*d;e.compute(Wi(g,r,s,w,_,$,i,y,n),{inputs:g})},Ld=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],s=[1].concat(t.strides),i=[1].concat(t.dilations),a=[1].concat(t.kernelShape),u=Hr({...t,pads:o,strides:s,dilations:i,kernelShape:a},n);Yi(e,n,u,d=>r?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},Gd=(e,t,r)=>{let n=r.format==="NHWC"?"channelsLast":"channelsFirst",o=Hr(r,t),s=r.autoPad==="NOTSET"?r.pads:r.autoPad,i=qi(t[0].dims,t[1].dims,r.strides,r.dilations,s,!1,n);e.compute(Fi(t,o,i.outShape,[i.filterDepth,i.filterHeight,i.filterWidth],[i.padInfo.front,i.padInfo.top,i.padInfo.left],n))},Fr=(e,t)=>{if(Wd(e.inputs,t),e.inputs[0].dims.length===3)Ld(e,t);else if(e.inputs[0].dims.length===5)Gd(e,e.inputs,t);else{let r=Hr(t,e.inputs);Yi(e,e.inputs,r)}}});var Hd,es,ts=A(()=>{"use strict";M();Ce();F();Re();ut();Nr();ct();Hd=(e,t=!1,r,n,o=4)=>{let s=b=>{switch(b){case 1:return"return w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];";case 4:return`
            let coord1 = vec4<i32>(coordX, coordY, col + 1, rowInner);
            let coord2 = vec4<i32>(coordX, coordY, col + 2, rowInner);
            let coord3 = vec4<i32>(coordX, coordY, col + 3, rowInner);
            let v0 = w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];
            let v1 = w[getIndexFromCoords4D(coord1, vec4<i32>(uniforms.w_shape))];
            let v2 = w[getIndexFromCoords4D(coord2, vec4<i32>(uniforms.w_shape))];
            let v3 = w[getIndexFromCoords4D(coord3, vec4<i32>(uniforms.w_shape))];
            return ${n}(v0, v1, v2, v3);
            `;default:throw new Error(`innerElementSize ${b} is not supported.`)}},i=e?`
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
    `,u=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",d=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",l=e?"row":"col",c=e?"col":"row",p=`
      let inChannels = ${e?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      let outRow = ${l} / outWidth;
      let outCol = ${l} % outWidth;

      let WRow = ${c} / (uniforms.filter_dims[1] * inChannels);
      let WCol = ${c} / inChannels % uniforms.filter_dims[1];
      let xR = f32(outRow - uniforms.pads[0] + uniforms.dilations[0] * WRow) / f32(uniforms.strides[0]);
      let xC = f32(outCol - uniforms.pads[1] + uniforms.dilations[1] * WCol) / f32(uniforms.strides[1]);
      if (xR < 0.0 || xR >= f32(${u}) || fract(xR) > 0.0) {
        return ${n}(0.0);
      }
      if (xC < 0.0 || xC >= f32(${d}) || fract(xC) > 0.0) {
        return ${n}(0.0);
      }
      let iXR = i32(xR);
      let iXC = i32(xC);
      let xCh = ${c} % inChannels;
      ${i}
      return x[getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape))/${o}];`,h=e?`
      let col = colIn * ${o};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
        ${p}
      }
      return ${n}(0.0);`:`
      let col = colIn * ${o};
      if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
        ${p}
      }
      return ${n}(0.0);`,m=`
      let col = colIn * ${o};
      let inChannels = ${e?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let coordX = uniforms.filter_dims[0] - 1 - row / (uniforms.filter_dims[1] * inChannels);
      let coordY = uniforms.filter_dims[1] - 1 - (row / inChannels) % uniforms.filter_dims[1];
      if (${e?"row < uniforms.dim_inner && col < uniforms.dim_b_outer":"row < uniforms.dim_inner && col < uniforms.dim_a_outer"}  && coordX >= 0 && coordY >= 0) {
        let rowInner = row % inChannels;
        let coord = vec4<i32>(coordX, coordY, col, rowInner);
        ${s(o)}
      }
      return ${n}(0.0);
      `,f=$e(r,n);return`
  fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${n} {
    ${e?h:m}
  }

  fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${n} {
    ${e?m:h}
  }

  fn mm_write(batch: i32, row : i32, colIn : i32, valueInput : ${n}) {
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
      var value = valueInput;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${a}
      ${Zt(t)}
      ${f}
      result[getIndexFromCoords4D(coords, vec4<i32>(uniforms.result_shape))/${o}] = value;
    }
  }`},es=(e,t,r,n,o,s,i,a)=>{let u=t.format==="NHWC",d=u?e[0].dims[3]:e[0].dims[1],l=r[0],c=u?r[2]:r[3],p=u?r[1]:r[2],h=u?r[3]:r[1],m=u&&d%4===0&&d%3&&h%4===0,f=u?h:c*p,y=u?c*p:h,b=[8,8,1],g=n<=8?[4,1,1]:[4,4,1],w=[Math.ceil(f/b[0]/g[0]),Math.ceil(y/b[1]/g[1]),Math.ceil(l/b[2]/g[2])];j("verbose",()=>`[conv_backprop_mm_webgpu] dispatch = ${w}`);let _=m?4:1,$=Math.max(b[0]*_,b[1]),v=m?4:1,T=[t.kernelShape[u?1:2],t.kernelShape[u?2:3]],I=[T[0]+(t.dilations[0]<=1?0:(T[0]-1)*(t.dilations[0]-1)),T[1]+(t.dilations[1]<=1?0:(T[1]-1)*(t.dilations[1]-1))],P=[I[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),I[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],B=[{type:6,data:n},{type:6,data:o},{type:6,data:s},{type:6,data:t.strides},{type:6,data:t.dilations},{type:6,data:T},{type:6,data:P}];ve(t,B),B.push(...k(e[0].dims,e[1].dims));let D=["rank","rank"];i&&(B.push(...k(e[2].dims)),D.push("rank")),B.push(...k(r));let L=z=>{let N=S("x",e[0].dataType,e[0].dims.length,v),se=S("w",e[1].dataType,e[1].dims.length,1),W=C("result",e[0].dataType,r.length,v),Z=[N,se],K="";if(i){let oe=S("bias",e[2].dataType,e[2].dims.length,v);Z.push(oe),K+=`
          fn getBiasByOutputCoords(coords : vec4<i32>) -> ${oe.type.value} {
            return bias[coords.${u?"w":"y"}${m?"/ 4":""}];
          }`}let V=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"strides",type:"i32",length:2},{name:"dilations",type:"i32",length:2},{name:"filter_dims",type:"i32",length:T.length},{name:"pads",type:"i32",length:P.length}];xe(t,V);let ne=J(e[0].dataType,1);if(ne!=="f16"&&ne!=="f32")throw new Error(`elemType ${ne} is not supported.`);return`
        ${Xt("uniforms.result_strides")}
        ${z.registerUniforms(V).declareVariables(...Z,W)};
        ${K}
        ${Hd(u,i,t,N.type.value,_)}
        ${m?dt(g,b,ne,void 0,!u,$):lt(g,b,ne,void 0,!u,$,!1,void 0,a)}`};return{name:"Conv2DTransposeMatMul",shaderCache:{hint:`${t.cacheKey};${g};${b};${m}`,inputDependencies:D},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:B}),getShaderSource:L}}});var qd,Kr,rs=A(()=>{"use strict";M();Ce();q();F();qd=(e,t,r,n,o,s=!1,i,a,u=!1)=>{let d=u?1:2,l=u?2:3,c=u?3:1,p=s?2:1,h=`
  fn setOutputAtIndex(flatIndex : u32, value : ${s?`vec4<${i}>`:i}) {
    result[flatIndex] = ${s?`vec4<${i}>`:i}(value);
  }`;n&&(h+=`
    fn getBiasByOutputCoords(coords : vec4<u32>) -> ${s?`vec4<${i}>`:i} {
      return bias[coords.${u?"w":"y"}${s?"/ 4":""}];
    }`);let m=s?4:1,f=S("W",t[1].dataType,t[1].dims.length,m),y=S("Dy",t[0].dataType,t[0].dims.length,m),b=[y,f];n&&b.push(S("bias",t[2].dataType,[r[c]].length,m));let g=C("result",t[0].dataType,r.length,m),w=`{
        let batch: u32 = ${o?"global_id.z":"workgroup_id.z"} / uniforms.result_shape[1];
        let r = ${o?"global_id.z":"workgroup_id.z"} % uniforms.result_shape[1];
        let c = ${o?"global_id.y":"workgroup_id.y"} * ${p};
        let d1: u32 = ${o?"global_id.x":"workgroup_id.x"} * 4;

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

                var xValue = ${y.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${i}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;

                xValue =  ${y.get("batch","idyR","idyC2","d2")};

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

                var xValue = ${y.get("batch","idyR","idyC","d2")};
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

                var xValue = ${y.get("batch","idyR","idyC2","d2")};
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
          let value = dotProd[i] + ${n?"bias[c+i]":`vec4<${i}>(0.0)`};
          ${g.set("batch","r","c + i","d1","value")};
        }
      }`,_=`
          let outputIndices = ${g.offsetToIndices("global_idx")};
          let batch = ${g.indicesGet("outputIndices",0)};
          let d1 = ${g.indicesGet("outputIndices",c)};
          let r = ${g.indicesGet("outputIndices",d)};
          let c = ${g.indicesGet("outputIndices",l)};
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
            if (dyR < 0.0 || dyR >= ${i}(uniforms.Dy_shape[${d}]) || fract(dyR) > 0.0 ||
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
              if (dyC < 0.0 || dyC >= ${i}(uniforms.Dy_shape[${l}]) ||
                  fract(dyC) > 0.0 || wCPerm < 0) {
                continue;
              }
              let idyC: u32 = u32(dyC);
              var inputChannel = groupId * uniforms.input_channels_per_group;
              for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + 1) {
                let xValue = ${u?y.get("batch","idyR","idyC","inputChannel"):y.get("batch","inputChannel","idyR","idyC")};
                let wValue = ${f.get("inputChannel","wOutChannel","u32(wRPerm)","u32(wCPerm)")};
                dotProd = dotProd + xValue * wValue;
                inputChannel = inputChannel + 1;
              }
            }
          }
          let value = dotProd + ${n?"bias[d1]":`${i}(0.0)`};
          ${g.setByOffset("global_idx","value")};
        `;return`
  ${e.registerUniforms(a).declareVariables(...b,g)}
  ${h}

    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
  ${s?w:_}}`},Kr=(e,t,r)=>{let n=e.length>2,o=t.outputShape,s=x.size(o),i=[Math.ceil(s/64),1,1];j("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${i}`);let a=t.format==="NHWC",u=["rank","rank"],d=[t.strides[0],t.strides[1]],l=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],c=[t.dilations[0],t.dilations[1]],p=[l[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),l[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],h=[p[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),p[1]-1-Math.floor(t.pads[1]+t.pads[3])/2],m=!1,f=t.group,y=e[1].dims,b=y[0]/f,g=y[1],w=[{type:12,data:s},{type:12,data:d},{type:12,data:l},{type:12,data:c},{type:12,data:p},{type:6,data:h},{type:12,data:b},{type:12,data:g},...k(e[0].dims,e[1].dims)];n&&(w.push(...k(e[2].dims)),u.push("rank")),w.push(...k(o));let _=i[1]===1&&i[2]===1,$=v=>{let T=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:d.length},{name:"filter_dims",type:"u32",length:l.length},{name:"dilations",type:"u32",length:l.length},{name:"effective_filter_dims",type:"u32",length:p.length},{name:"pads",type:"i32",length:h.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],I=J(e[0].dataType);return`${qd(v,e,o,n,_,m,I,T,a)}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};`,inputDependencies:u},getRunData:()=>({dispatchGroup:{x:i[0],y:i[1],z:i[2]},outputs:[{dims:r?r(o):o,dataType:e[0].dataType}],programUniforms:w}),getShaderSource:$}}});var Fd,Kd,jd,ns,os,Zd,Xd,Qd,Yd,is,ss=A(()=>{"use strict";ts();rs();Re();De();Fd=(e,t,r,n,o,s)=>(e-1)*t+r+(n-1)*o+1-s,Kd=(e,t,r,n,o)=>{let s=Math.floor(e/2);t==="SAME_UPPER"?(r[n]=s,r[o]=e-s):t==="SAME_LOWER"&&(r[n]=e-s,r[o]=s)},jd=(e,t,r,n,o,s,i,a,u,d)=>{let l=e.length-2,c=d.length===0;u.length<l&&u.push(...Array(l-u.length).fill(0));let p=e[0],h=t[a?3:1]*o;for(let m=0,f=e.length-l-(a?1:0);m<l;++m,++f){let y=e[f],b=c?y*i[m]:d[m],g=Fd(y,i[m],s[m],t[f],r[m],b);Kd(g,n,s,m,m+l),c&&d.push(i[m]*(y-1)+u[m]+(t[f]-1)*r[m]+1-s[m]-s[m+l])}d.splice(0,0,p),d.splice(a?3:1,0,h)},ns=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((c,p)=>c*p,1)===0){r.length=0;for(let c=2;c<t[1].dims.length;++c)r.push(t[1].dims[c])}let n=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let o=e.pads.slice(),s=e.outputShape.slice(),i=e.outputPadding.slice(),a=t[0].dims,u=e.dilations.slice();if(u.reduce((c,p)=>c+p,0)===0){let c=t[0].dims.length-2;u=new Array(c).fill(1)}let d=e.strides.slice();if(d.reduce((c,p)=>c+p,0)===0){let c=t[0].dims.length-2;d=new Array(c).fill(1)}jd(a,r,u,e.autoPad,e.group,o,d,n,i,s);let l=Object.assign({},e);return Object.assign(l,{kernelShape:r,pads:o,outputPadding:i,outputShape:s,dilations:u,strides:d}),l},os=e=>{let t=jt(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,s=e.group,i=e.kernelShape,a=e.pads,u=e.strides,d=e.wIsConst(),l=e.outputPadding,c=e.outputShape;return{autoPad:n,format:r,dilations:o,group:s,kernelShape:i,outputPadding:l,outputShape:c,pads:a,strides:u,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},Zd=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[0];if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==o))throw new Error("invalid bias");let s=e[0].dims.length-2;if(t.dilations.reduce((l,c)=>l+c,0)>0&&t.dilations.length!==s)throw new Error(`dilations should be ${s}D`);if(t.strides.reduce((l,c)=>l+c,0)>0&&t.strides.length!==s)throw new Error(`strides should be ${s}D`);if(t.pads.reduce((l,c)=>l+c,0)>0&&t.pads.length!==s*2)throw new Error(`pads should be ${s*2}D`);if(t.outputPadding.length!==s&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${s}D`);if(t.kernelShape.reduce((l,c)=>l+c,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Xd=[2,3,1,0],Qd=(e,t,r)=>{let n=ns(r,t),o=r.format==="NHWC",s=n.outputShape,i=s[o?3:1],a=t[0].dims[o?3:1];if(n.group!==1||i===1&&a===1){e.compute(Kr(t,n));return}let u=s[o?1:2],d=s[o?2:3],l=t[1].dims[2],c=t[1].dims[3],p=o?u*d:i,h=o?i:u*d,m=l*c*a,f=!0,y=e.kernelCustomData.wT??e.compute(pe(t[1],Xd),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=y);let b=[t[0],y],g=t.length===3;g&&(!o&&t[2].dims.length===1?b.push(t[2].reshape([t[2].dims[0],1,1])):b.push(t[2])),e.compute(es(b,n,s,p,h,m,g,f),{inputs:b})},Yd=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=t.kernelShape;(o.length===0||o[0]===0)&&(o=[e.inputs[1].dims[2]]);let s=t.dilations;(s.length===0||s[0]===0)&&(s=[1]);let i=t.strides;(i.length===0||i[0]===0)&&(i=[1]);let a=t.pads;a.length===0&&(a=[0,0]),a=[0,a[0],0,a[1]],i=[1].concat(i),s=[1].concat(s),o=[1].concat(o);let u=ns({...t,pads:a,strides:i,dilations:s,kernelShape:o},n);e.compute(Kr(n,u,d=>r?[d[0],d[2],d[3]]:[d[0],d[1],d[3]]))},is=(e,t)=>{Zd(e.inputs,t),e.inputs[0].dims.length===3?Yd(e,t):Qd(e,e.inputs,t)}});var Jd,as,us,ds=A(()=>{"use strict";M();q();ue();F();Jd=(e,t,r,n)=>{let o=x.size(t),s=t.length,i=S("input",e,s),a=C("output",e,s),u=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),d=x.normalizeAxis(u,s),l=c=>{let p=` i32(${i.indicesGet("inputIndices","uniforms.axis")}) `,h=O("uniforms.input_shape","uniforms.axis",s),m=n.reverse?p+(n.exclusive?" + 1":""):"0",f=n.reverse?h:p+(n.exclusive?"":" + 1");return`
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
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:d},...k(t,t)]}),getShaderSource:l}},as=(e,t)=>{let r=e.inputs[0].dims,n=e.inputs[0].dataType,o=e.inputs[1];e.compute(Jd(n,r,o,t),{inputs:[0]})},us=e=>{let t=e.exclusive===1,r=e.reverse===1;return U({exclusive:t,reverse:r})}});var el,tl,rl,ls,cs,ps=A(()=>{"use strict";M();q();ue();F();el=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},tl=(e,t,r,n)=>{let o=[];o.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let s=0;s<t;++s)o.push(r.indicesSet("a",e[s],`i[${s}]`));return o.push("return a;}"),o.join(`
`)},rl=(e,t)=>{let r,n,o,s,i,a,u=t.format==="NHWC",d=t.blocksize,l=t.mode==="DCR";u?([r,n,o,s]=e.dims,i=l?[r,n,o,d,d,s/d**2]:[r,n,o,s/d**2,d,d],a=l?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,o,s]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],i=l?[r,d,d,s/d**2,n,o]:[r,s/d**2,d,d,n,o],a=l?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let c=e.reshape(i),p=c.dims.length,h=e.dataType,m=S("a",h,p),f=C("output",h,p),y=b=>`
  ${b.registerUniform("output_size","u32").declareVariables(m,f)}

  ${tl(a,p,m,f)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${f.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${f.setByOffset("global_idx",m.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:b=>{let g=u?[r,n*d,o*d,s/d**2]:[r,s/d**2,n*d,o*d],w=x.size(g),_=c.dims,$=x.sortBasedOnPerm(_,a);return{outputs:[{dims:g,dataType:b[0].dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...k(_,$)]}},getShaderSource:y}},ls=(e,t)=>{el(e.inputs),e.compute(rl(e.inputs[0],t))},cs=e=>U({blocksize:e.blocksize,mode:e.mode,format:e.format})});var jr,Jt,ms,nl,ol,Zr,Xr,fs,il,hs,gs,ys=A(()=>{"use strict";M();q();ue();F();jr="[a-zA-Z]|\\.\\.\\.",Jt="("+jr+")+",ms="^"+Jt+"$",nl="("+Jt+",)*"+Jt,ol="^"+nl+"$",Zr=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,r){let n=this.symbolToIndices.get(t);n===void 0?n=[r]:n.push(r),this.symbolToIndices.set(t,n)}},Xr=class{constructor(t,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,o]=r.includes("->")?r.split("->",2):[r,""];if(!n.match(RegExp(ol)))throw new Error("Invalid LHS term");if(n.split(",").forEach((a,u)=>{let d=t[u].dims.slice();if(!a.match(RegExp(ms)))throw new Error("Invalid LHS term");let l=this.processTerm(a,!0,d,u);this.lhs.push(l)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([a,u])=>u.count===1||a==="...").map(([a])=>a).join("");else if(!o.match(RegExp(Jt)))throw new Error("Invalid RHS");o.match(RegExp(jr,"g"))?.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let u=this.symbolToInfo.get(a);if(u===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(u.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(t,r,n){let o=this.symbolToInfo.get(t);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(n)}else o={count:1,dimValue:r,inputIndices:[n]};this.symbolToInfo.set(t,o)}processTerm(t,r,n,o=-1){let s=n.length,i=!1,a=[],u=0;if(!t.match(RegExp(ms))&&!r&&t!=="")throw new Error("Invalid LHS term");let d=t.match(RegExp(jr,"g")),l=new Zr(o);return d?.forEach((c,p)=>{if(c==="..."){if(i)throw new Error("Only one ellipsis is allowed per input term");i=!0;let h=s-d.length+1;if(h<0)throw new Error("Ellipsis out of bounds");if(a=n.slice(u,u+h),this.hasEllipsis){if(this.ellipsisDims.length!==a.length||this.ellipsisDims.toString()!==a.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=a;else throw new Error("Ellipsis must be specified in the LHS");for(let m=0;m<a.length;m++){let f=String.fromCharCode("0".charCodeAt(0)+m);l.addSymbol(f,p+m),this.addSymbol(f,n[u++],o)}}else l.addSymbol(c,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,n[u++],o)}),l}},fs=e=>e+"_max",il=(e,t,r,n)=>{let s=e.map(l=>l.length).map((l,c)=>S(`input${c}`,t,l)),i=x.size(n),a=C("output",t,n.length),u=[...r.symbolToInfo.keys()].filter(l=>!r.rhs.symbolToIndices.has(l)),d=l=>{let c=[],p="var prod = 1.0;",h="var sum = 0.0;",m="sum += prod;",f=[],y=[],b=[],g=[],w=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach(($,v)=>{if(r.rhs.symbolToIndices.has(v)){let T=r.rhs.symbolToIndices.get(v)?.[0];T!==void 0&&r.lhs.forEach((I,P)=>{if($.inputIndices.includes(P)){let B=I.symbolToIndices.get(v);if(B===void 0)throw new Error("Invalid symbol error");B.forEach(D=>{c.push(`${s[P].indicesSet(`input${P}Indices`,D,a.indicesGet("outputIndices",T))}`)})}})}else r.lhs.forEach((T,I)=>{if($.inputIndices.includes(I)){let P=T.symbolToIndices.get(v);if(P===void 0)throw new Error("Invalid symbol error");P.forEach(B=>{f.push(`${s[I].indicesSet(`input${I}Indices`,B,`${v}`)}`)}),g.push(`prod *= ${s[I].getByIndices(`input${I}Indices`)};`)}}),y.push(`for(var ${v}: u32 = 0; ${v} < uniforms.${fs(v)}; ${v}++) {`),b.push("}")});let _=w?[...c,`let sum = ${s.map(($,v)=>$.getByIndices(`input${v}Indices`)).join(" * ")};`]:[...c,h,...y,...f,p,...g,m,...b];return`
            ${l.registerUniforms(u.map($=>({name:`${fs($)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...s,a)}

            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${a.offsetToIndices("global_idx")};
            ${s.map(($,v)=>`var input${v}Indices: ${s[v].type.indices};`).join(`
`)}
            ${_.join(`
`)};
            ${a.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let l=u.filter(p=>r.symbolToInfo.has(p)).map(p=>({type:12,data:r.symbolToInfo.get(p)?.dimValue||0}));l.push({type:12,data:i});let c=e.map((p,h)=>[...k(p)]).reduce((p,h)=>p.concat(h),l);return c.push(...k(n)),{outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:c}},getShaderSource:d}},hs=(e,t)=>{let r=new Xr(e.inputs,t.equation),n=r.outputDims,o=e.inputs.map((s,i)=>s.dims);e.compute(il(o,e.inputs[0].dataType,r,n))},gs=e=>{let t=e.equation.replace(/\s+/g,"");return U({equation:t})}});var sl,bs,al,ul,ws,_s=A(()=>{"use strict";M();q();F();sl=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,o=t.length<r.length?0:t.length-r.length;for(;n<r.length&&o<t.length;++n,++o)if(r[n]!==t[o]&&r[n]!==1&&t[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},bs=(e,t)=>{let r=e.length-t.length,n=[];for(let o=0;o<r;++o)n.push(e[o]);for(let o=0;o<t.length;++o)n.push(t[o]===1?e[o+r]:t[o]);return n},al=(e,t)=>e.length>t.length?bs(e,t):bs(t,e),ul=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=al(t,r),o=e[0].dataType,s=o===9?4:1,i=Math.ceil(x.size(n)/s),a=d=>{let l=S("input",o,t.length,s),c=C("output",o,n.length,s),p;if(o===9){let h=(m,f,y="")=>`
          let outputIndices${f} = ${c.offsetToIndices(`outputOffset + ${f}u`)};
          let offset${f} = ${l.broadcastedIndicesToOffset(`outputIndices${f}`,c)};
          let index${f} = offset${f} / 4u;
          let component${f} = offset${f} % 4u;
          ${m}[${f}] = ${y}(${l.getByOffset(`index${f}`)}[component${f}]);
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
        let inputOffset = ${l.broadcastedIndicesToOffset("outputIndices",c)};
        ${c.setByOffset("global_idx",l.getByOffset("inputOffset"))}
      }`;return`
    ${d.registerUniform("vec_size","u32").declareVariables(l,c)}
    ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${p}`},u=[{type:12,data:i},...k(t,n)];return{name:"Expand",shaderCache:{hint:`${n.length}`,inputDependencies:["rank"]},getShaderSource:a,getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:u})}},ws=e=>{sl(e.inputs),e.compute(ul(e.inputs),{inputs:[0]})}});var dl,$s,vs=A(()=>{"use strict";M();q();F();Kt();dl=e=>{let t=e[0].dataType,r=x.size(e[0].dims),n=x.size(e[1].dims),o=n%4===0,s=i=>{let a=S("x",t,[1],4),u=S("bias",t,[1],4),d=C("y",t,[1],4),l=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],c=h=>`
      let bias${h}_offset: u32 = (global_idx * 4 + ${h}) % uniforms.bias_size;
      let bias${h} = ${u.getByOffset(`bias${h}_offset / 4`)}[bias${h}_offset % 4];`,p=o?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${c(0)}${c(1)}${c(2)}${c(3)}
      let bias = ${a.type.value}(bias0, bias1, bias2, bias3);`;return`${i.registerUniforms(l).declareVariables(a,u,d)}

    ${Vr(ce(t))}

    ${i.mainStart(Fe)}
      ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${a.getByOffset("global_idx")};
      ${p}
      let x_in = x + bias;
      ${d.setByOffset("global_idx",Ur("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:s,getRunData:i=>({outputs:[{dims:i[0].dims,dataType:i[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/Fe/4)}})}},$s=e=>{e.inputs.length<2||x.size(e.inputs[1].dims)===0?wi(e):e.compute(dl(e.inputs))}});var ll,cl,xs,Ss,Ts=A(()=>{"use strict";M();q();ue();F();ll=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},cl=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,s=x.normalizeAxis(t.axis,o),i=r.slice(0);i.splice(s,1,...n);let a=r[s],u=e[0].dataType===9?4:1,d=Math.ceil(x.size(i)/u),l=[{type:12,data:d},{type:6,data:a},{type:12,data:s},...k(e[0].dims,e[1].dims,i)],c=p=>{let h=S("data",e[0].dataType,e[0].dims.length,u),m=S("inputIndices",e[1].dataType,e[1].dims.length),f=C("output",e[0].dataType,i.length,u),y=g=>{let w=n.length,_=`var indicesIndices${g}  = ${m.type.indices}(0);`;for(let $=0;$<w;$++)_+=`${w>1?`indicesIndices${g}[${$}]`:`indicesIndices${g}`} = ${i.length>1?`outputIndices${g}[uniforms.axis + ${$}]`:`outputIndices${g}`};`;_+=`
          var idx${g} = ${m.getByIndices(`indicesIndices${g}`)};
          if (idx${g} < 0) {
            idx${g} = idx${g} + uniforms.axisDimLimit;
          }
          var dataIndices${g} : ${h.type.indices};
        `;for(let $=0,v=0;$<o;$++)$===s?(_+=`${o>1?`dataIndices${g}[${$}]`:`dataIndices${g}`} = u32(idx${g});`,v+=w):(_+=`${o>1?`dataIndices${g}[${$}]`:`dataIndices${g}`} = ${i.length>1?`outputIndices${g}[${v}]`:`outputIndices${g}`};`,v++);return _},b;if(e[0].dataType===9){let g=(w,_,$="")=>`
          let outputIndices${_} = ${f.offsetToIndices(`outputOffset + ${_}u`)};
          ${y(_)};
          let offset${_} = ${h.indicesToOffset(`dataIndices${_}`)};
          let index${_} = offset${_} / 4u;
          let component${_} = offset${_} % 4u;
          ${w}[${_}] = ${$}(${h.getByOffset(`index${_}`)}[component${_}]);
        `;b=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${g("value",0,"u32")}
        ${g("value",1,"u32")}
        ${g("value",2,"u32")}
        ${g("value",3,"u32")}
        ${f.setByOffset("global_idx","value")}
      `}else b=`
      let outputIndices = ${f.offsetToIndices("global_idx")};
      ${y("")};
      let value = ${h.getByIndices("dataIndices")};
      ${f.setByOffset("global_idx","value")};
      `;return`
      ${p.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(h,m,f)}
      ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${b}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:l}),getShaderSource:c}},xs=e=>U({axis:e.axis}),Ss=(e,t)=>{let r=e.inputs;ll(r),e.compute(cl(e.inputs,t))}});var pl,ml,Is,Cs,As=A(()=>{"use strict";M();q();ue();F();pl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=x.normalizeAxis(t.quantizeAxis,e[0].dims.length),n=t.blockSize,o=e[0],s=e[2],i=e.length===4?e[3]:void 0;if(s.dims.length!==o.dims.length||!o.dims.map((a,u)=>u===r?Math.ceil(a/n)===s.dims[u]:a===s.dims[u]).reduce((a,u)=>a&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(i){if(i.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(i.dims.length!==s.dims.length||!i.dims.map((a,u)=>a===s.dims[u]).reduce((a,u)=>a&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},ml=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,s=x.normalizeAxis(t.gatherAxis,o),i=x.normalizeAxis(t.quantizeAxis,o),a=r.slice(0);a.splice(s,1,...n);let u=x.size(a),d=e[2].dataType,c=e[0].dataType===22,p=[{type:12,data:u},{type:12,data:i},{type:12,data:s},{type:12,data:t.blockSize},...k(...e.map((m,f)=>m.dims),a)],h=m=>{let f=S("data",e[0].dataType,e[0].dims.length),y=S("inputIndices",e[1].dataType,e[1].dims.length),b=S("scales",e[2].dataType,e[2].dims.length),g=e.length>3?S("zeroPoint",e[3].dataType,e[3].dims.length):void 0,w=C("output",d,a.length),_=[f,y,b];g&&_.push(g);let $=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${m.registerUniforms($).declareVariables(..._,w)}
        ${m.mainStart()}
        let output_indices = ${w.offsetToIndices("global_idx")};
        var indices_indices = ${y.type.indices}(0);
        ${(()=>n.length>1?`
          for (var i: u32 = 0; i < ${n.length}; i++) {
            let index = ${w.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${y.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${w.indicesGet("output_indices","uniforms.gather_axis")};`)()};
        var data_indices = ${f.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${w.indicesGet("output_indices","i")};
          ${f.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${y.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[s]};
        }
        ${f.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${a.length}; i++) {
          let index = ${w.indicesGet("output_indices",`i + ${n.length} - 1`)};
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
        let quantize_axis_index = ${b.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${b.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${b.getByIndices("scale_indices")};
        ${(()=>g?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${g.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${g.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0")()};
        let dequantized_data = ${ce(d)}(quantized_data - zero_point) * scale;
        ${w.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((m,f)=>f!==1).map(m=>m.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(m,f)=>"rank")},getRunData:()=>({outputs:[{dims:a,dataType:d}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:p}),getShaderSource:h}},Is=(e,t)=>{let r=e.inputs;pl(r,t),e.compute(ml(e.inputs,t))},Cs=e=>U({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})});var fl,hl,ks,Es,Ps=A(()=>{"use strict";M();q();ue();F();fl=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},hl=(e,t)=>{let r=e[0].dims,n=e[0].dataType,o=r.length,s=e[1].dims,i=e[1].dataType,a=x.normalizeAxis(t.axis,o),u=r[a],d=s.slice(0),l=x.size(d),c=S("input",n,o),p=S("indicesInput",i,s.length),h=C("output",n,d.length),m=[{type:12,data:l},{type:6,data:u},{type:12,data:a}];return m.push(...k(r,s,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:m}),getShaderSource:b=>`
      ${b.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(c,p,h)}
      ${b.mainStart()}
      ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${h.offsetToIndices("global_idx")};

      var idx = ${p.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${c.type.indices}(outputIndices);
      ${c.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${c.getByIndices("inputIndices")};

      ${h.setByOffset("global_idx","value")};
  }`}},ks=e=>U({axis:e.axis}),Es=(e,t)=>{let r=e.inputs;fl(r),e.compute(hl(e.inputs,t))}});var gl,yl,zs,Bs,Os=A(()=>{"use strict";M();q();F();gl=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},yl=(e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[o,s,i]=Wt.getShapeOfGemmResult(r,t.transA,n,t.transB,e.length===3?e[2].dims:void 0),a=[o,s];if(!a)throw new Error("Can't use gemm on the given tensors");let u=x.size(a),d=[{type:12,data:u},{type:12,data:o},{type:12,data:s},{type:12,data:i},{type:1,data:t.alpha},{type:1,data:t.beta}],l=["type","type"];e.length===3&&(d.push(...k(e[2].dims)),l.push("rank")),d.push(...k(a));let c=p=>{let h="";t.transA&&t.transB?h="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?h="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?h="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(h="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let m=t.alpha===1?"":"value *= uniforms.alpha;",f=S("a",e[0].dataType,e[0].dims),y=S("b",e[1].dataType,e[1].dims),b=f.type.value,g=null,w=[f,y];e.length===3&&(g=S("c",e[2].dataType,e[2].dims.length),w.push(g));let _=C("output",e[0].dataType,a.length);w.push(_);let $=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${p.registerUniforms($).declareVariables(...w)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${b}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${h}
    }

    ${m}
    ${(()=>g!=null?`let cOffset = ${g.broadcastedIndicesToOffset("vec2(m, n)",_)}; value += ${b}(uniforms.beta) * ${g.getByOffset("cOffset")};`:"")()}
    output[global_idx] = value;
  }`};return{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:c}},zs=e=>{let t=e.transA,r=e.transB,n=e.alpha,o=e.beta;return{transA:t,transB:r,alpha:n,beta:o,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Bs=(e,t)=>{gl(e.inputs),e.compute(yl(e.inputs,t))}});var be,_l,Rs,Ds,$l,pt,Ms,Qr=A(()=>{"use strict";M();q();ue();Nt();qt();F();De();be=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,_l=(e,t)=>{let r=e[0],n=be(e,1),o=be(e,2),s=be(e,3),i=be(e,4),a=be(e,5),u=be(e,6),d=be(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let l=r.dims[0],c=r.dims[1],p=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],h=c,m=0,f=0,y=Math.floor(p/t.numHeads);if(u&&d&&x.size(u.dims)&&x.size(d.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==t.numHeads||u.dims[3]!==y)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==l||d.dims[1]!==t.numHeads||d.dims[3]!==y)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==d.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=u.dims[2],f=u.dims[2]}else if(u&&x.size(u.dims)||d&&x.size(d.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let b;if(n&&x.size(n.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(n.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');b=2,h=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==y)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');b=5,h=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==y)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');b=0,h=n.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');b=3}if(s&&x.size(s.dims)>0){if(s.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(n&&n.dims.length===5&&n.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let g=m+h,w=0;if(i&&x.size(i.dims)>0){w=8;let T=i.dims;throw T.length===1?T[0]===l?w=1:T[0]===3*l+2&&(w=3):T.length===2&&T[0]===l&&T[1]===g&&(w=5),w===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let _=!1,$=p;if(o&&x.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(h!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');$=o.dims[2]}else{if(h!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');$=o.dims[1]*o.dims[3],_=!0}}let v=!1;if(i&&x.size(i.dims)>0)throw new Error("Key padding mask is not supported");if(a&&x.size(a.dims)>0){if(a.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(a.dims[0]!==l||a.dims[1]!==t.numHeads||a.dims[2]!==c||a.dims[3]!==g)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:c,pastSequenceLength:m,kvSequenceLength:h,totalSequenceLength:g,maxSequenceLength:f,inputHiddenSize:0,hiddenSize:p,vHiddenSize:$,headSize:y,vHeadSize:Math.floor($/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:w,scale:t.scale,broadcastResPosBias:v,passPastInKv:_,qkvFormat:b}},Rs=e=>U({...e}),Ds=U({perm:[0,2,1,3]}),$l=(e,t,r,n,o,s,i)=>{let a=[n,o,s],u=x.size(a),d=[{type:12,data:u},{type:12,data:i},{type:12,data:s}],l=c=>{let p=C("qkv_with_bias",t.dataType,a),h=S("qkv",t.dataType,a),m=S("bias",r.dataType,a),f=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${c.registerUniforms(f).declareVariables(h,m,p)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:l},{inputs:[t,r],outputs:[-1]})[0]},pt=(e,t,r,n,o,s,i,a)=>{let u=s;if(i&&x.size(i.dims)>0){if(n===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=$l(e,s,i,t,n,r*o,a),u=u.reshape([t,n,r,o]),r===1||n===1?u:e.compute(pe(u,Ds.perm),{inputs:[u],outputs:[-1]})[0]}else return s.dims.length===3&&(u=s.reshape([t,n,r,o])),r===1||n===1?u:e.compute(pe(u,Ds.perm),{inputs:[u],outputs:[-1]})[0]},Ms=(e,t)=>{let r=_l(e.inputs,t),n=e.inputs[0],o=be(e.inputs,1),s=be(e.inputs,2),i=be(e.inputs,3),a=be(e.inputs,4),u=be(e.inputs,5),d=be(e.inputs,6),l=be(e.inputs,7);if(n.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let c=o&&s&&o.dims.length===4&&s.dims.length===4,p=pt(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,i,0);if(c)return Qe(e,p,o,s,a,void 0,d,l,u,r);if(!o||!s)throw new Error("key and value must be provided");let h=pt(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,i,r.hiddenSize),m=pt(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,s,i,2*r.hiddenSize);Qe(e,p,h,m,a,void 0,d,l,u,r)}});var vl,xl,Sl,Tl,Yr,Vs,Us,Jr=A(()=>{"use strict";M();q();ue();F();vl=e=>{if(!e||e.length<1)throw new Error("too few inputs")},xl=(e,t)=>{let r=[],n=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(o=>r.push(Number(o))),n=r.length),U({numOutputs:n,axis:t.axis,splitSizes:r})},Sl=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${O("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Tl=e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let o=e[n].setByIndices("indices","input[global_idx]");t===1?r.push(o):n===0?r.push(`if (output_number == ${n}u) { ${o} }`):n===t-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${n}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Yr=(e,t)=>{let r=e[0].dims,n=x.size(r),o=e[0].dataType,s=x.normalizeAxis(t.axis,r.length),i=new Array(t.numOutputs),a=S("input",o,r.length),u=new Array(t.numOutputs),d=[],l=[],c=0,p=[{type:12,data:n}];for(let m=0;m<t.numOutputs;m++){c+=t.splitSizes[m],u[m]=c;let f=r.slice();f[s]=t.splitSizes[m],l.push(f),i[m]=C(`output${m}`,o,f.length),d.push({dims:l[m],dataType:e[0].dataType})}p.push({type:12,data:u},...k(r,...l));let h=m=>`
  ${m.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(a,...i)}
  ${Sl(u.length)}
  ${Tl(i)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${a.offsetToIndices("global_idx")};
    var index = ${a.indicesGet("indices",s)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${O("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${a.indicesSet("indices",s,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:h,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:p})}},Vs=(e,t)=>{vl(e.inputs);let r=e.inputs.length===1?t:xl(e.inputs,t);e.compute(Yr(e.inputs,r),{inputs:[0]})},Us=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return U({axis:t,numOutputs:n,splitSizes:r})}});var Il,Cl,Ns,Ws,Ls=A(()=>{"use strict";ue();qt();Qr();Jr();De();Il=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],n=e[1],o=e[2],s=e[3],i=e[4];if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let a=!1,u=r.dims[0],d=r.dims[1],l=r.dims.length===3?a?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],c=d,p=0,h=!n||n.dims.length===0,m=Math.floor(h?l/(t.numHeads+2*t.kvNumHeads):l/t.numHeads);h&&(l=m*t.numHeads);let f=s&&s.dims.length!==0,y=i&&i.dims.length!==0;if(f&&s.dims.length===4&&s.dims[0]===u&&s.dims[1]!==t.kvNumHeads&&s.dims[2]===t.kvNumHeads&&s.dims[3]===m)throw new Error("BSNH pastKey/pastValue is not supported");if(f&&y){if(s.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(i.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');p=s.dims[2]}else if(f||y)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let g=1;if(n&&n.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(r.dims[2]%n.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');c=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==m)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');c=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==m)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');c=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');g=3}let w=0,_=!1,$=t.kvNumHeads?m*t.kvNumHeads:l;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(c!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');$=o.dims[2]}else{if(c!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');$=o.dims[1]*o.dims[3],_=!0}}let v=e.length>4?e[5]:void 0;if(v&&v.dims.length!==1&&v.dims[0]!==u)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');let T=-1,I=-1,P=!1;return{batchSize:u,sequenceLength:d,pastSequenceLength:p,kvSequenceLength:c,totalSequenceLength:T,maxSequenceLength:I,inputHiddenSize:0,hiddenSize:l,vHiddenSize:$,headSize:m,vHeadSize:Math.floor($/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:w,scale:t.scale,broadcastResPosBias:P,passPastInKv:_,qkvFormat:g}},Cl=U({perm:[0,2,1,3]}),Ns=(e,t,r)=>{let n=t,o=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(n=t.reshape([r.batchSize,r.kvSequenceLength,o,r.headSize]),n=e.compute(pe(n,Cl.perm),{inputs:[n],outputs:[-1]})[0]),n},Ws=(e,t)=>{let r=Il(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let n=e.inputs[0],o=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,s=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,i=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,a=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,u=e.inputs.length>4?e.inputs[5]:void 0,d=e.inputs.length>5?e.inputs[6]:void 0,l=r.kvNumHeads?r.kvNumHeads:r.numHeads,c=U({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,l*r.headSize,l*r.headSize]}),[p,h,m]=!o&&!s?e.compute(Yr([n],c),{inputs:[n],outputs:[-1,-1,-1]}):[n,o,s],f=pt(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,p,void 0,0);Qe(e,f,Ns(e,h,r),Ns(e,m,r),void 0,void 0,i,a,void 0,r,u,d)}});var Gs,Al,kl,Hs,qs=A(()=>{"use strict";M();q();De();F();Gs=(e,t,r,n,o,s,i,a)=>{let u=re(s),d=u===1?"f32":`vec${u}f`,l=u===1?"vec2f":`mat2x${u}f`,c=o*i,p=[o,i,s/u],h=[o,i,2],m=["rank","type","type"],f=[];f.push(...k(p,h));let y=b=>{let g=S("x",t.dataType,3,u),w=S("scale",r.dataType,r.dims),_=S("bias",n.dataType,n.dims),$=C("output",1,3,2),v=[g,w,_,$],T=64;return`
  var<workgroup> workgroup_shared : array<${l}, ${T}>;
  const workgroup_size = ${T}u;
  ${b.declareVariables(...v)}
  ${b.mainStart(T)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${g.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${l}(sum, squared_sum);
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
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${a}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:h,dataType:1}],dispatchGroup:{x:c},programUniforms:f}),getShaderSource:y},{inputs:[t,r,n],outputs:[-1]})[0]},Al=(e,t,r)=>{let n=t[0].dims,o=n,s=2,i=n[0],a=n[1],u=x.sizeFromDimension(n,s),d=re(u),l=x.size(o)/d,c=Gs(e,t[0],t[1],t[2],i,u,a,r.epsilon),p=[i,a,u/d],h=[i,a],m=["type","none"],f=y=>{let b=S("x",t[0].dataType,p.length,d),g=S("scale_shift",1,h.length,2),w=C("output",t[0].dataType,p.length,d),_=[b,g,w];return`
  ${y.registerUniform("output_size","u32").declareVariables(..._)}
  ${y.mainStart()}
  ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${w.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${g.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${b.getByOffset("global_idx")} * ${w.type.value}(scale_shift.x) + ${w.type.value}(scale_shift.y);
      ${w.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:[{type:12,data:l},...k(p,h,p)]}),getShaderSource:f},{inputs:[t[0],c]})},kl=(e,t,r)=>{let n=t[0].dims,o=n,s=n[0],i=n[n.length-1],a=x.sizeFromDimension(n,1)/i,u=re(i),d=x.size(o)/u,l=[{type:12,data:a},{type:12,data:Math.floor(i/u)}],c=["type","type"],p=[0,n.length-1];for(let y=0;y<n.length-2;y++)p.push(y+1);let h=e.compute(pe(e.inputs[0],p),{inputs:[e.inputs[0]],outputs:[-1]})[0],m=Gs(e,h,t[1],t[2],s,a,i,r.epsilon),f=y=>{let b=J(t[0].dataType),g=u===1?"vec2f":`mat${u}x2f`,w=v=>{let T=v===0?"x":"y",I=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${b}(${I}(scale.${T}))`;case 2:return`vec2<${b}>(${I}(scale[0].${T}, scale[1].${T}))`;case 4:return`vec4<${b}>(${I}(scale[0].${T}, scale[1].${T}, scale[2].${T}, scale[3].${T}))`;default:throw new Error(`Not supported compoents ${u}`)}},_=S("input",t[0].dataType,t[0].dims,u),$=C("output",t[0].dataType,o,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${_.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${g}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${$.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${y.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${w(0)}, ${w(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:l}),getShaderSource:f},{inputs:[t[0],m]})},Hs=(e,t)=>{t.format==="NHWC"?kl(e,e.inputs,t):Al(e,e.inputs,t)}});var El,Pl,Fs,Ks=A(()=>{"use strict";M();q();F();El=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Pl=(e,t,r)=>{let n=t.simplified,o=e[0].dims,s=e[1],i=!n&&e[2],a=o,u=x.normalizeAxis(t.axis,o.length),d=x.sizeToDimension(o,u),l=x.sizeFromDimension(o,u),c=x.size(s.dims),p=i?x.size(i.dims):0;if(c!==l||i&&p!==l)throw new Error(`Size of X.shape()[axis:] == ${l}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${c} and bias size of ${p}`);let h=[];for(let $=0;$<o.length;++$)$<u?h.push(o[$]):h.push(1);let m=re(l),f=["type","type"],y=[{type:12,data:d},{type:1,data:l},{type:12,data:Math.floor(l/m)},{type:1,data:t.epsilon}];i&&f.push("type");let b=r>1,g=r>2,w=$=>{let v=J(e[0].dataType),T=[S("x",e[0].dataType,e[0].dims,m),S("scale",s.dataType,s.dims,m)];i&&T.push(S("bias",i.dataType,i.dims,m)),T.push(C("output",e[0].dataType,a,m)),b&&T.push(C("mean_data_output",1,h)),g&&T.push(C("inv_std_output",1,h));let I=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${$.registerUniforms(I).declareVariables(...T)}
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
    let inv_std_dev = inverseSqrt(${Ae("mean_square_vector",m)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Ke(v,m,"x[j + offset]")};
      let f32scale = ${Ke(v,m,"scale[j]")};
      output[j + offset] = ${T[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${i?`+ ${Ke(v,m,"bias[j]")}`:""}
      );
    }

    ${b?"mean_data_output[global_idx] = mean":""};
    ${g?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},_=[{dims:a,dataType:e[0].dataType}];return b&&_.push({dims:h,dataType:1}),g&&_.push({dims:h,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${m};${r};${n}`,inputDependencies:f},getRunData:()=>({outputs:_,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:y}),getShaderSource:w}},Fs=(e,t)=>{El(e.inputs),e.compute(Pl(e.inputs,t,e.outputCount))}});var zl,Bl,Ol,js,Zs,Xs=A(()=>{"use strict";M();q();ue();F();zl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),s=t.blockSize/8*t.bits,i=e[1];if(!x.areEqual(i.dims,[t.n,o,s]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(x.size(u)!==t.n*o)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,c=t.bits>4?t.n*o:t.n*Math.floor((o+1)/2);if(x.size(l)!==c)throw new Error("zeroPoints input size error.")}},Bl=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],s=t.k,i=t.n,a=r.slice(0,n-2),u=x.size(a),l=e[1].dims[2]/4,c=e[0].dataType,p=re(t.k),h=re(l),m=re(i),f=a.concat([o,i]),y=o>1&&i/m%2===0?2:1,b=x.size(f)/m/y,g=64,w=[],_=[u,o,s/p],$=x.convertShape(e[1].dims).slice();$.splice(-1,1,l/h),w.push(...k(_)),w.push(...k($)),w.push(...k(e[2].dims)),e.length===4&&w.push(...k(x.convertShape(e[3].dims)));let v=[u,o,i/m];w.push(...k(v));let T=I=>{let P=_.length,B=S("a",e[0].dataType,P,p),D=S("b",12,$.length,h),L=S("scales",e[2].dataType,e[2].dims.length),z=[B,D,L],N=e.length===4?S("zero_points",12,e[3].dims.length):void 0;N&&z.push(N);let se=v.length,W=C("output",e[0].dataType,se,m),Z=J(e[0].dataType),K=(()=>{switch(p){case 1:return`array<${Z}, 8>`;case 2:return`mat4x2<${Z}>`;case 4:return`mat2x4<${Z}>`;default:throw new Error(`${p}-component is not supported.`)}})(),V=()=>{let Q=`
          // reuse a data
            var input_offset = ${B.indicesToOffset(`${B.type.indices}(batch, row, word_offset)`)};
            var a_data: ${K};
            for (var j: u32 = 0; j < ${8/p}; j++) {
              a_data[j] = ${B.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let H=0;H<m*y;H++)Q+=`
            b_value = ${h===1?`b${H}_data`:`b${H}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${K}(${Array.from({length:4},(E,R)=>`${Z}(b_value_lower[${R}]), ${Z}(b_value_upper[${R}])`).join(", ")});
            b_dequantized_values = ${(()=>p===1?`${K}(${Array.from({length:8},(E,R)=>`(b_quantized_values[${R}] - ${N?`zero_point${H}`:"zero_point"}) * scale${H}`).join(", ")});`:`(b_quantized_values - ${K}(${Array(8).fill(`${N?`zero_point${H}`:"zero_point"}`).join(",")})) * scale${H};`)()};
            workgroup_shared[local_id.x * ${y} + ${Math.floor(H/m)}]${m>1?`[${H%m}]`:""} += ${Array.from({length:8/p},(E,R)=>`${p===1?`a_data[${R}] * b_dequantized_values[${R}]`:`dot(a_data[${R}], b_dequantized_values[${R}])`}`).join(" + ")};
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
            `;for(let H=0;H<m*y;H++)Q+=`
            let scale${H} = ${L.getByOffset("col_index * nBlocksPerCol + block")};
            ${N?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${N.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${H} = ${Z}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return Q},oe=()=>{let Q=`col_index = col * ${m};`;for(let H=0;H<m*y;H++)Q+=`
            let b${H}_data = ${D.getByIndices(`${D.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return Q+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${K};
            var b_dequantized_values: ${K};`,Q};return`
        var<workgroup> workgroup_shared: array<${W.type.value}, ${y*g}>;
        ${I.declareVariables(...z,W)}
        ${I.mainStart([g,1,1])}
          let output_indices = ${W.offsetToIndices(`(global_idx / ${g}) * ${y}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${g}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/p};
            ${ne()}
            for (var word: u32 = 0; word < ${l}; word += ${h}) {
              ${oe()}
              for (var i: u32 = 0; i < ${h}; i++) {
                ${V()}
                word_offset += ${8/p};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${y}) {
            var output_value: ${W.type.value} = ${W.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${g}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${y};
            }
            ${W.setByIndices(`${W.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${p};${h};${m};${y};${g}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:f,dataType:c}],dispatchGroup:{x:b},programUniforms:w}),getShaderSource:T}},Ol=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],s=t.k,i=t.n,a=r.slice(0,n-2),u=x.size(a),l=e[1].dims[2]/4,c=e[0].dataType,p=re(t.k),h=re(l),m=a.concat([o,i]),f=128,y=i%8===0?8:i%4===0?4:1,b=f/y,g=b*h*8,w=g/p,_=g/t.blockSize,$=x.size(m)/y,v=[],T=[u,o,s/p],I=x.convertShape(e[1].dims).slice();I.splice(-1,1,l/h),v.push(...k(T)),v.push(...k(I)),v.push(...k(e[2].dims)),e.length===4&&v.push(...k(x.convertShape(e[3].dims)));let P=[u,o,i];v.push(...k(P));let B=D=>{let L=T.length,z=S("a",e[0].dataType,L,p),N=S("b",12,I.length,h),se=S("scales",e[2].dataType,e[2].dims.length),W=[z,N,se],Z=e.length===4?S("zero_points",12,e[3].dims.length):void 0;Z&&W.push(Z);let K=P.length,V=C("output",e[0].dataType,K),ne=J(e[0].dataType),oe=()=>{switch(p){case 1:return`
          let a_data0 = vec4<${ne}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ne}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${ne}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ne}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${p}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${z.type.value}, ${w}>;
        var<workgroup> inter_results: array<array<${V.type.value}, ${b}>, ${y}>;
        ${D.declareVariables(...W,V)}
        ${D.mainStart([b,y,1])}
          let output_indices = ${V.offsetToIndices(`workgroup_index * ${y}`)};
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

          if (local_idx < ${y}) {
            var output_value: ${V.type.value} = ${V.type.value}(0);
            for (var b = 0u; b < ${b}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${V.setByIndices(`${V.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${p};${h};${b};${y}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:m,dataType:c}],dispatchGroup:{x:$},programUniforms:v}),getShaderSource:B}},js=(e,t)=>{zl(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Ol(e.inputs,t)):e.compute(Bl(e.inputs,t))},Zs=e=>U(e)});var Dl,Rl,Ml,Vl,Ul,Nl,Wl,Ll,Qs,Ys=A(()=>{"use strict";M();q();F();Dl=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Rl=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
            k = i32(${e.indicesGet("indices",o)}) - ${O("uniforms.pads",o,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${O("uniforms.x_shape",o,t)})) {
              break;
            }
            offset += k * i32(${O("uniforms.x_strides",o,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${n}
            value = x[offset];
          }
      `},Ml=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${O("uniforms.pads",o,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${O("uniforms.x_shape",o,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${O("uniforms.x_shape",o,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${O("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},Vl=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${O("uniforms.pads",o,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${O("uniforms.x_shape",o,t)})) {
                  k = i32(${O("uniforms.x_shape",o,t)}) - 1;
                }
                offset += k * i32(${O("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},Ul=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${O("uniforms.pads",o,r)};
                if (k < 0)  {
                  k += i32(${O("uniforms.x_shape",o,t)}]);
                }
                if (k >= i32(${O("uniforms.x_shape",o,t)})) {
                  k -= i32(${O("uniforms.x_shape",o,t)});
                }
                offset += k * i32(${O("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},Nl=(e,t,r)=>{switch(r.mode){case 0:return Rl(e,t,r.pads.length);case 1:return Ml(e,t,r.pads.length);case 2:return Vl(e,t,r.pads.length);case 3:return Ul(e,t,r.pads.length);default:throw new Error("Invalid mode")}},Wl=(e,t)=>{let r=x.padShape(e[0].dims.slice(),t.pads),n=e[0].dims,o=x.size(r),s=[{type:12,data:o},{type:6,data:t.pads}],i=e.length>=3&&e[2].data;t.mode===0&&s.push({type:i?e[2].dataType:1,data:t.value}),s.push(...k(e[0].dims,r));let a=["rank"],u=d=>{let l=C("output",e[0].dataType,r.length),c=S("x",e[0].dataType,n.length),p=c.type.value,h=Nl(l,n.length,t),m=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&m.push({name:"constant_value",type:i?p:"f32"}),`
            ${d.registerUniforms(m).declareVariables(c,l)}
            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${l.offsetToIndices("global_idx")};

            var value = ${p}(0);
            ${h}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${i}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(x.size(r)/64)},programUniforms:s}),getShaderSource:u}},Ll=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,o=e[0].dims.length,s=new Int32Array(2*o).fill(0);if(e.length>=4){let a=e[3].getBigInt64Array();for(let u=0;u<a.length;u++)s[Number(a[u])]=Number(r[u]),s[Number(a[u])+o]=Number(r[u+a.length])}else r.forEach((a,u)=>s[Number(u)]=Number(a));let i=[];return s.forEach(a=>i.push(a)),{mode:t.mode,value:n,pads:i}}else return t},Qs=(e,t)=>{Dl(e.inputs);let r=Ll(e.inputs,t);e.compute(Wl(e.inputs,r),{inputs:[0]})}});var er,Js,ea,ta,ra,Gl,Hl,na,oa,ia,sa,aa,ua,da,la,ca,pa,ma,fa,ha=A(()=>{"use strict";Se();M();q();F();er=e=>{if(te.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Js=(e,t,r)=>{let n=t.format==="NHWC",o=e.dims.slice();n&&o.splice(1,0,o.pop());let s=Object.hasOwnProperty.call(t,"dilations"),i=t.kernelShape.slice(),a=t.strides.slice(),u=s?t.dilations.slice():[],d=t.pads.slice();qe.adjustPoolAttributes(r,o,i,a,u,d);let l=qe.computePoolOutputShape(r,o,a,u,i,d,t.autoPad),c=Object.assign({},t);s?Object.assign(c,{kernelShape:i,strides:a,pads:d,dilations:u,cacheKey:t.cacheKey}):Object.assign(c,{kernelShape:i,strides:a,pads:d,cacheKey:t.cacheKey});let p=l.slice();return p.push(p.splice(1,1)[0]),[c,n?p:l]},ea=(e,t)=>{let r=t.format==="NHWC",n=x.size(e),o=x.size(t.kernelShape),s=[{type:12,data:n},{type:12,data:o}],i=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let a=t.kernelShape[t.kernelShape.length-1],u=t.strides[t.strides.length-1],d=t.pads[t.pads.length/2-1],l=t.pads[t.pads.length-1],c=!!(d+l);s.push({type:12,data:a},{type:12,data:u},{type:12,data:d},{type:12,data:l}),i.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let p=!1;if(t.kernelShape.length===2){let h=t.kernelShape[t.kernelShape.length-2],m=t.strides[t.strides.length-2],f=t.pads[t.pads.length/2-2],y=t.pads[t.pads.length-2];p=!!(f+y),s.push({type:12,data:h},{type:12,data:m},{type:12,data:f},{type:12,data:y}),i.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[s,i,!0,c,p]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let a=x.computeStrides(t.kernelShape);s.push({type:12,data:a},{type:12,data:t.pads},{type:12,data:t.strides}),i.push({name:"kernelStrides",type:"u32",length:a.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let u=t.pads.reduce((d,l)=>d+l);return[s,i,!!u,!1,!1]}},ta=(e,t,r,n,o,s,i,a,u,d,l,c)=>{let p=o.format==="NHWC",h=t.type.value,m=C("output",t.type.tensor,n);if(o.kernelShape.length<=2){let f="",y="",b="",g=r-(p?2:1);if(l?f=`
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
                }`,o.kernelShape.length===2){let _=r-(p?3:2);c?y=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${_}] < 0 || xIndices[${_}] >= uniforms.x_shape[${_}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:y=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sh - uniforms.phStart + j;
                `,b=`
              }
            `}return`
            ${e.registerUniforms(u).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var value = ${h}(${a});
              var pad = 0;
              ${y}
              ${f}
              ${b}
              ${i}

              output[global_idx] = value;
            }`}else{if(p)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let f=o.kernelShape.length,y=o.pads.length,b="";return d?b=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${s}
              }`:b=`
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
                  offsets[j] = offset / ${O("uniforms.kernelStrides","j",f)};
                  offset -= offsets[j] * ${O("uniforms.kernelStrides","j",f)};
                }
                offsets[${f-1}] = offset;

                isPad = false;
                for (var j = ${r-f}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${O("uniforms.strides",`j - ${r-f}u`,f)}
                    + offsets[j - ${r-f}u] - ${O("uniforms.pads","j - 2u",y)};
                  ${b}
              }
              ${i}

              output[global_idx] = value;
            }`}},ra=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Gl=e=>`${ra(e)};${e.countIncludePad}`,Hl=e=>`${ra(e)};${e.storageOrder};${e.dilations}`,na=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),oa=(e,t,r,n)=>{let[o,s]=Js(t,n,r),i=S("x",t.dataType,t.dims.length),a=i.type.value,u="value += x_val;",d="";o.countIncludePad?d+=`value /= ${a}(uniforms.kernelSize);`:d+=`value /= ${a}(i32(uniforms.kernelSize) - pad);`;let[l,c,p,h,m]=ea(s,o);l.push(...k(t.dims,s));let f=["rank"];return{name:e,shaderCache:{hint:`${n.cacheKey};${p};${h};${m}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(x.size(s)/64)},programUniforms:l}),getShaderSource:y=>ta(y,i,t.dims.length,s.length,o,u,d,0,c,p,h,m)}},ia=e=>{let t=e.count_include_pad!==0,r=na(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:t,...r,cacheKey:""};return{...n,cacheKey:Gl(n)}},sa=(e,t)=>{er(e.inputs),e.compute(oa("AveragePool",e.inputs[0],!1,t))},aa={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},ua=e=>{let t=e.format;return{format:t,...aa,cacheKey:t}},da=(e,t)=>{er(e.inputs),e.compute(oa("GlobalAveragePool",e.inputs[0],!0,t))},la=(e,t,r,n)=>{let[o,s]=Js(t,n,r),i=`
      value = max(x_val, value);
    `,a="",u=S("x",t.dataType,t.dims.length),d=["rank"],[l,c,p,h,m]=ea(s,o);return l.push(...k(t.dims,s)),{name:e,shaderCache:{hint:`${n.cacheKey};${p};${h};${m}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(x.size(s)/64)},programUniforms:l}),getShaderSource:f=>ta(f,u,t.dims.length,s.length,o,i,a,t.dataType===10?-65504:-1e5,c,p,h,m)}},ca=(e,t)=>{er(e.inputs),e.compute(la("MaxPool",e.inputs[0],!1,t))},pa=e=>{let t=e.storage_order,r=e.dilations,n=na(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:r,...n,cacheKey:""};return{...o,cacheKey:Hl(o)}},ma=e=>{let t=e.format;return{format:t,...aa,cacheKey:t}},fa=(e,t)=>{er(e.inputs),e.compute(la("GlobalMaxPool",e.inputs[0],!0,t))}});var Fl,Kl,ga,ya,ba=A(()=>{"use strict";M();q();ue();F();Fl=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,n)=>r===e[2].dims[n]).reduce((r,n)=>r&&n,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((o,s)=>s===t.axis||o===e[0].dims[s]).reduce((o,s)=>o&&s,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],n=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/n)||t.blockSize>Math.ceil(r/(n-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Kl=(e,t)=>{let r=x.normalizeAxis(t.axis,e[0].dims.length),n=e[0].dataType,o=n===3,s=e[0].dims,i=e[1].dataType,a=x.size(s),u=n===3||n===2,d=u?[Math.ceil(x.size(e[0].dims)/4)]:e[0].dims,l=e[1].dims,c=e.length>2?e[2]:void 0,p=c?u?[Math.ceil(x.size(c.dims)/4)]:c.dims:void 0,h=l.length===0||l.length===1&&l[0]===1,m=h===!1&&l.length===1,f=re(a),y=h&&(!u||f===4),b=y?f:1,g=y&&!u?f:1,w=S("input",u?12:n,d.length,g),_=S("scale",i,l.length),$=c?S("zero_point",u?12:n,p.length):void 0,v=C("output",i,s.length,b),T=[w,_];$&&T.push($);let I=[d,l];c&&I.push(p);let P=[{type:12,data:a/b},{type:12,data:r},{type:12,data:t.blockSize},...k(...I,s)],B=D=>{let L=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${D.registerUniforms(L).declareVariables(...T,v)}
      ${D.mainStart()}
          ${D.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${v.offsetToIndices("global_idx")};

          // Set input x
          ${(()=>u?`
            let input = ${w.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${b===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${w.getByOffset("global_idx")};`)()};

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
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${$.getByOffset("0")}`:m?u?`
                let zero_point_index = ${v.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${$.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${v.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${$.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${_.indicesToOffset("scale_indices")};
                let zero_point_input = ${$.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${$.getByIndices("scale_indices")};`:`let zero_point_value = ${u?o?"i32":"u32":w.type.value}(0);`)()};
      // Compute and write output
      ${v.setByOffset("global_idx",`${v.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:$?["rank","rank","rank"]:["rank","rank"]},getShaderSource:B,getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:Math.ceil(a/b/64),y:1,z:1},programUniforms:P})}},ga=(e,t)=>{Fl(e.inputs,t),e.compute(Kl(e.inputs,t))},ya=e=>U({axis:e.axis,blockSize:e.blockSize})});var jl,Zl,wa,_a=A(()=>{"use strict";Se();M();F();jl=(e,t,r)=>{let n=e===t,o=e<t&&r<0,s=e>t&&r>0;if(n||o||s)throw new Error("Range these inputs' contents are invalid.")},Zl=(e,t,r,n)=>{let o=Math.abs(Math.ceil((t-e)/r)),s=[o],i=o,a=[{type:12,data:i},{type:n,data:e},{type:n,data:r},...k(s)],u=d=>{let l=C("output",n,s.length),c=l.type.value,p=[{name:"outputSize",type:"u32"},{name:"start",type:c},{name:"delta",type:c}];return`
        ${d.registerUniforms(p).declareVariables(l)}
        ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${c}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:a})}},wa=e=>{let t=0,r=0,n=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],n=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],n=e.inputs[2].getFloat32Array()[0]),te.webgpu.validateInputContent&&jl(t,r,n),e.compute(Zl(t,r,n,e.inputs[0].dataType),{inputs:[]})}});var Xl,Ql,Yl,Jl,ec,tc,rc,nc,oc,ic,sc,$a,ac,uc,dc,lc,cc,va,xa,Sa=A(()=>{"use strict";M();q();ue();F();Xl=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Ql=(e,t,r)=>{t.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let n=new Array(r).fill(1);return t.forEach((o,s)=>n[o]=e[s]),n},Yl=(e,t,r,n,o,s)=>{let[i,a,u]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(i>0&&e.length>i&&e[i].dims.length>0)e[i].getFloat32Array().forEach(l=>s.push(l));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(a>0&&e.length>a&&e[a].dims.length===1&&e[a].dims[0]>0){if(e[a].getFloat32Array().forEach(l=>n.push(l)),n.length!==0&&n.length!==d&&r>=18&&n.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Xl(n,t),t.axes.length>0&&Ql(n,t.axes,d).forEach((l,c)=>n[c]=l)}if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0&&(e[u].getBigInt64Array().forEach(l=>o.push(Number(l))),o.length!==0&&o.length!==d&&r>=18&&o.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof n<"u"&&typeof o<"u"&&n.length>0&&o.length>d)throw new Error("Resize requires only of scales or sizes to be specified")},Jl=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",ec=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",tc=(e,t,r)=>{let n=new Array(r).fill(0).concat(new Array(r).fill(1)),o=e.length===0?n:e.slice();return t.length>0?(t.forEach((s,i)=>{n[s]=o[i],n[i+r]=o[t.length+i]}),n):o},rc=(e,t,r,n)=>{let o=[];if(r.length>0)if(n.length>0){if(e.forEach(s=>o.push(s)),Math.max(...n)>e.length)throw new Error("axes is out of bound");n.forEach((s,i)=>o[s]=r[i])}else r.forEach(s=>o.push(s));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");o=e.map((s,i)=>Math.round(s*t[i]))}return o},nc=(e,t,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(s=>t[s]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(s=>t[s]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return r.axes.length>0?(r.axes.forEach(s=>t[s]=n),r.axes.forEach(s=>o[s]=Math.round(e[s]*t[s]))):(t.fill(n,0,t.length),o.forEach((s,i)=>o[i]=Math.round(s*t[i]))),o},oc=(e,t,r,n,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${O("uniforms.scales","i",n)};
        var roi_low = ${O("uniforms.roi","i",o)};
        var roi_hi = ${O("uniforms.roi",`i + ${t.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${O("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${O("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,ic=(e,t,r,n,o,s,i)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${O("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${O("uniforms.roi","i",s)};
          var roi_hi = ${O("uniforms.roi",`i + ${r.length}`,s)};
          var input_shape_i = ${O("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${O("uniforms.output_shape","i",n.length)};
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
    }`,sc=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${O("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,$a=(e,t,r,n)=>e.rank>n?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",ac=(e,t,r,n,o)=>{let[i,a,u,d]=r.length===2?[-1,0,1,-1]:[0,2,3,1],l=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${l} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(row, ${r[a]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${$a(e,d,i,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${l} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${l} = originalIndices[${a}];
      var col:${l} = originalIndices[${u}];
      ${n?`if (row < 0 || row > (${r[a]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${r[a]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${i}])`:"0"};
      var x11: ${l} = getInputValue(batch, channel, row1, col1);
      var x12: ${l} = getInputValue(batch, channel, row1, col2);
      var x21: ${l} = getInputValue(batch, channel, row2, col1);
      var x22: ${l} = getInputValue(batch, channel, row2, col2);
      var dx1: ${l} = abs(row - ${l}(row1));
      var dx2: ${l} = abs(${l}(row2) - row);
      var dy1: ${l} = abs(col - ${l}(col1));
      var dy2: ${l} = abs(${l}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},uc=(e,t,r,n,o,s,i,a,u,d)=>{let l=r.length===2,c=!0,[p,h]=l?[0,1]:c?[2,3]:[1,2],m=e.type.value,f=y=>{let b=y===p?"row":"col";return`
      fn ${b}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${m} {
        var output_index = ${t.indicesGet("output_indices",y)};
        var originalIdx: ${m} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[y]},
        ${n[y]}, ${r[y]}, ${s[y]}, ${s[y]} + ${r.length});
        var fractOriginalIdx: ${m} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${a} && (originalIdx < 0 || originalIdx > (${r[y]} - 1))) {
          return ${u};
        }
        var data: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${b}: ${m} = originalIdx + ${m}(i);
          if (${b} < 0 || ${b} >= ${r[y]}) {
            ${(()=>d?`coefs[i + 1] = 0.0;
                        continue;`:a?`return ${u};`:`${b} = max(0, min(${b}, ${r[y]} - 1));`)()};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",y,`u32(${b})`)};
          data[i + 1] = ${y===p?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
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
    `},dc=(e,t,r,n,o)=>{let[i,a,u,d,l]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(depth, ${r[a]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(width, ${r[d]} - 1))`)};
      ${$a(e,l,i,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${c} = originalIndices[${a}];
      var height:${c} = originalIndices[${u}];
      var width:${c} = originalIndices[${d}];
      ${n?`if (depth < 0 || depth > (${r[a]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[d]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${r[a]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[d]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${l}])`:"0"};
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
    }`},lc=(e,t,r,n,o,s)=>{let i=e.dims,a=tc(s,t.axes,i.length),u=rc(i,n,o,t.axes),d=n.slice();n.length===0&&(d=i.map((g,w)=>g===0?1:u[w]/g),t.keepAspectRatioPolicy!=="stretch"&&(u=nc(i,d,t)));let l=C("output",e.dataType,u.length),c=S("input",e.dataType,i.length),p=x.size(u),h=i.length===u.length&&i.every((g,w)=>g===u[w]),m=t.coordinateTransformMode==="tf_crop_and_resize",f=t.extrapolationValue,y=c.type.value,b=g=>`
      ${h?"":`
      ${Jl(t.coordinateTransformMode,y)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${sc(c,i)};
              ${ec(t.nearestMode,r,y)};
              ${ic(c,l,i,u,d.length,a.length,m)};
              `;case"linear":return`
              ${oc(l,i,u,d.length,a.length)};
              ${(()=>{if(i.length===2||i.length===4)return`${ac(c,l,i,m,f)}`;if(i.length===3||i.length===5)return`${dc(c,l,i,m,f)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(i.length===2||i.length===4)return`${uc(c,l,i,u,d,a,t.cubicCoeffA,m,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${g.registerUniform("output_size","u32").registerUniform("scales","f32",d.length).registerUniform("roi","f32",a.length).declareVariables(c,l)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${h?"output[global_idx] = input[global_idx];":`
        let output_indices = ${l.offsetToIndices("global_idx")};
        var input_indices: ${c.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${c.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${i.length===2||i.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${d.length>0?d:""}|${o.length>0?o:""}|${a.length>0?a:""}|${h}|${i}`,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},{type:1,data:d},{type:1,data:a},...k(i,u)]})}},cc=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},va=(e,t)=>{let r=[],n=[],o=[],s=cc(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Yl(e.inputs,t,s,r,n,o),e.compute(lc(e.inputs[0],t,s,r,n,o),{inputs:[0]})},xa=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,o=e.cubicCoeffA,s=e.excludeOutside!==0,i=e.extrapolationValue,a=e.keepAspectRatioPolicy,u=e.mode,d=e.nearestMode===""?"simple":e.nearestMode;return U({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:o,excludeOutside:s,extrapolationValue:i,keepAspectRatioPolicy:a,mode:u,nearestMode:d})}});var pc,mc,Ta,Ia=A(()=>{"use strict";M();q();ue();F();pc=(e,t)=>{let[r,n,o,s]=e,{numHeads:i,rotaryEmbeddingDim:a}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!x.areEqual(n.dims,[])&&!x.areEqual(n.dims,[1])&&n.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(s.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(!x.areEqual(o.dims,s.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(a>0&&i===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=r.dims[0],d=r.dims[r.dims.length-2],l=o.dims[0],c=x.sizeFromDimension(r.dims,1)/d,p=a===0?o.dims[1]*2:c/i;if(a>p)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(n.dims.length===2){if(u!==n.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(d!==n.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(p/2!==o.dims[1]&&a/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(d>l)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},mc=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:o,scale:s}=t,i=e[0].dims[0],a=x.sizeFromDimension(e[0].dims,1),u=e[0].dims[e[0].dims.length-2],d=a/u,l=e[2].dims[1],c=o===0?l*2:d/n,p=new Array(i,u,d/c,c-l),h=x.computeStrides(p),m=[{type:1,data:s},{type:12,data:p},{type:12,data:h},...e[0].dims.length===3?new Array({type:12,data:[a,d,c,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[a,c,u*c,1]}):[],...k(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],f=y=>{let b=S("input",e[0].dataType,e[0].dims.length),g=S("position_ids",e[1].dataType,e[1].dims.length),w=S("cos_cache",e[2].dataType,e[2].dims.length),_=S("sin_cache",e[3].dataType,e[3].dims.length),$=C("output",e[0].dataType,e[0].dims.length);return y.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:p.length},{name:"global_strides",type:"u32",length:h.length},{name:"input_output_strides",type:"u32",length:h.length}]),`
        ${y.declareVariables(b,g,w,_,$)}

        ${y.mainStart(Fe)}
          let half_rotary_emb_dim = uniforms.${w.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${y.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${g.broadcastedIndicesToOffset("bsnh.xy",C("",g.type.tensor,2))};
            let position_id =
                u32(${g.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${b.getByOffset("i")} * ${w.get("position_id","bsnh[3]")} -
                ${b.getByOffset("j")} * ${_.get("position_id","bsnh[3]")};
            ${$.setByOffset("i","re")}
            let im = ${b.getByOffset("i")} * ${_.get("position_id","bsnh[3]")} +
                ${b.getByOffset("j")} * ${w.get("position_id","bsnh[3]")};
            ${$.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${$.setByOffset("k",b.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:U({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:f,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(x.size(p)/Fe)},programUniforms:m})}},Ta=(e,t)=>{pc(e.inputs,t),e.compute(mc(e.inputs,t))}});var fc,hc,Ca,Aa=A(()=>{"use strict";M();q();F();fc=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],s=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==s)throw new Error("Skip must have the same sequence length as input");if(n.dims.length!==1)throw new Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let i=e[3];if(i.dims.length!==1)throw new Error("Beta must be 1D");if(i.dims[i.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let i=e[4];if(i.dims.length!==1)throw new Error("Bias must be 1D");if(i.dims[i.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},hc=(e,t,r,n)=>{let o=t.simplified,s=e[0].dims,i=x.size(s),a=s,u=i,d=s.slice(-1)[0],l=n?s.slice(0,-1).concat(1):[],c=!o&&e.length>3,p=e.length>4,h=n&&r>1,m=n&&r>2,f=r>3,y=64,b=re(d),g=[{type:12,data:u},{type:12,data:b},{type:12,data:d},{type:1,data:t.epsilon}],w=$=>{let v=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],T=[S("x",e[0].dataType,e[0].dims,b),S("skip",e[1].dataType,e[1].dims,b),S("gamma",e[2].dataType,e[2].dims,b)];c&&T.push(S("beta",e[3].dataType,e[3].dims,b)),p&&T.push(S("bias",e[4].dataType,e[4].dims,b)),T.push(C("output",e[0].dataType,a,b)),h&&T.push(C("mean_output",1,l)),m&&T.push(C("inv_std_output",1,l)),f&&T.push(C("input_skip_bias_sum",e[0].dataType,a,b));let I=J(e[0].dataType),P=J(1,b);return`

      ${$.registerUniforms(v).declareVariables(...T)}
      var<workgroup> sum_shared : array<${P}, ${y}>;
      var<workgroup> sum_squared_shared : array<${P}, ${y}>;

      ${$.mainStart([y,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${y};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${y};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${y-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${p?"bias[offset1d + i]":I+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${f?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Ke(I,b,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${y};
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
        let mean = ${Ae("sum",b)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Ae("square_sum",b)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${h?"mean_output[global_idx] = mean;":""}
        ${m?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${I}(mean)`}) *
            ${I}(inv_std_dev) * gamma[offset1d + i]
            ${c?"+ beta[offset1d + i]":""};
        }
      }`},_=[{dims:a,dataType:e[0].dataType}];return r>1&&_.push({dims:l,dataType:1}),r>2&&_.push({dims:l,dataType:1}),r>3&&_.push({dims:s,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${b};${h};${m};${f}`,inputDependencies:e.map(($,v)=>"type")},getShaderSource:w,getRunData:()=>({outputs:_,dispatchGroup:{x:Math.ceil(u/d)},programUniforms:g})}},Ca=(e,t)=>{fc(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(hc(e.inputs,t,e.outputCount,!1),{outputs:n})}});var gc,tr,yc,ka,bc,wc,Ea,Pa,za=A(()=>{"use strict";M();q();ue();F();gc=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw new Error(`Input ${n} must be an array of int32 or int64`)})},tr=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(n=>r.push(Number(n)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(n=>r.push(Number(n)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},yc=(e,t)=>{if(e.length>1){let r=tr(e,1),n=tr(e,2),o=tr(e,3);return o.length===0&&(o=[...Array(e[0].dims.length).keys()]),U({starts:r,ends:n,axes:o})}else return t},ka=(e,t,r,n,o)=>{let s=e;return e<0&&(s+=r[n[t]]),o[t]<0?Math.max(0,Math.min(s,r[n[t]]-1)):Math.max(0,Math.min(s,r[n[t]]))},bc=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${O("uniforms.input_shape","i",r.length)};
            let steps_i = ${O("uniforms.steps","i",r.length)};
            let signs_i = ${O("uniforms.signs","i",r.length)};
            let starts_i = ${O("uniforms.starts","i",r.length)};
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
      }`,wc=(e,t)=>{let r=e[0].dims,n=x.size(r),o=t.axes.length>0?x.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],s=tr(e,4);s.forEach(b=>b!==0||(()=>{throw new Error("step cannot be 0")})),s.length===0&&(s=Array(o.length).fill(1));let i=t.starts.map((b,g)=>ka(b,g,r,o,s)),a=t.ends.map((b,g)=>ka(b,g,r,o,s));if(o.length!==i.length||o.length!==a.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let b=0;b<r.length;++b)o.includes(b)||(i.splice(b,0,0),a.splice(b,0,r[b]),s.splice(b,0,1));let u=s.map(b=>Math.sign(b));s.forEach((b,g,w)=>{if(b<0){let _=(a[g]-i[g])/b,$=i[g],v=$+_*s[g];i[g]=v,a[g]=$,w[g]=-b}});let d=r.slice(0);o.forEach((b,g)=>{d[b]=Math.ceil((a[b]-i[b])/s[b])});let l={dims:d,dataType:e[0].dataType},c=C("output",e[0].dataType,d.length),p=S("input",e[0].dataType,e[0].dims.length),h=x.size(d),m=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:i.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:s.length}],f=[{type:12,data:h},{type:12,data:i},{type:6,data:u},{type:12,data:s},...k(e[0].dims,d)],y=b=>`
      ${b.registerUniforms(m).declareVariables(p,c)}
        ${bc(p,c,r)}
        ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${c.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${c.setByOffset("global_idx",p.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${i.length}_${s.length}`,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:[l],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:f})}},Ea=(e,t)=>{gc(e.inputs,t);let r=yc(e.inputs,t);e.compute(wc(e.inputs,r),{inputs:[0]})},Pa=e=>{let t=e.starts,r=e.ends,n=e.axes;return U({starts:t,ends:r,axes:n})}});var _c,$c,Ba,Oa,Da=A(()=>{"use strict";M();q();ue();De();F();_c=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},$c=(e,t)=>{let r=e.inputs[0],n=r.dims,o=x.size(n),s=64,i=n.length,a=x.normalizeAxis(t.axis,i),u=a<n.length-1,d,l=[];u?(l=Array.from({length:i},(T,I)=>I),l[a]=i-1,l[i-1]=a,d=e.compute(pe(r,l),{inputs:[r],outputs:[-1]})[0]):d=r;let c=d.dims,p=c[i-1],h=o/p,m=re(p),f=p/m,y=(T,I)=>I===4?`max(max(${T}.x, ${T}.y), max(${T}.z, ${T}.w))`:I===2?`max(${T}.x, ${T}.y)`:I===3?`max(max(${T}.x, ${T}.y), ${T}.z)`:T,b=S("x",d.dataType,d.dims,m),g=C("result",d.dataType,d.dims,m),w=b.type.value,_=J(d.dataType)==="f32"?`var threadMax = ${w}(-3.402823e+38f);`:`var threadMax = ${w}(-65504.0h);`,$=T=>`
      var<workgroup> rowMaxShared : ${w};
      var<workgroup> rowSumShared : ${w};
      var<workgroup> threadShared : array<${w}, ${s}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${w} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${w}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${T.registerUniform("packedCols","i32").declareVariables(b,g)}
      ${T.mainStart()}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${s};
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
          rowMaxShared = ${w}(${y("threadShared[0]",m)});
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
          rowSumShared = ${w}(${Ae("threadShared[0]",m)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,v=e.compute({name:"Softmax",shaderCache:{hint:`${m}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:d.dataType}],dispatchGroup:{x:h},programUniforms:[{type:6,data:f}]}),getShaderSource:$},{inputs:[d],outputs:[u?-1:0]})[0];u&&e.compute(pe(v,l),{inputs:[v]})},Ba=(e,t)=>{_c(e.inputs),$c(e,t)},Oa=e=>U({axis:e.axis})});var Ra,vc,xc,Sc,Ma,Va=A(()=>{"use strict";M();q();F();Ra=e=>Array.from(e.getBigInt64Array(),Number),vc=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Ra(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},xc=(e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r},Sc=(e,t)=>{let r=e[0].dims,n=t??Ra(e[1]),o=xc(r,n),s=x.size(o),i=e[0].dataType,a=S("input",i,r.length),u=C("output",i,o.length),d=l=>`
      const inputShape = ${a.indices(...r)};
      ${l.registerUniform("output_size","u32").declareVariables(a,u)}
      ${l.mainStart()}
      ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${a.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${a.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${a.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",a.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:[{type:12,data:s},...k(e[0].dims,o)]}),getShaderSource:d}},Ma=e=>{vc(e.inputs),e.compute(Sc(e.inputs),{inputs:[0]})}});var Tc,Ic,Ua,Na=A(()=>{"use strict";M();q();F();Tc=(e,t,r,n,o)=>{let s=C("output_data",o,r.length,4),i=S("a_data",t[1].dataType,t[1].dims.length,4),a=S("b_data",t[2].dataType,t[2].dims.length,4),u=S("c_data",t[0].dataType,t[0].dims.length,4),d,l=(c,p,h)=>`select(${p}, ${c}, ${h})`;if(!n)d=s.setByOffset("global_idx",l(i.getByOffset("global_idx"),a.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let c=(p,h,m="")=>{let f=`a_data[index_a${h}][component_a${h}]`,y=`b_data[index_b${h}][component_b${h}]`,b=`bool(c_data[index_c${h}] & (0xffu << (component_c${h} * 8)))`;return`
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
            ${p}[${h}] = ${m}(${l(f,y,b)});
          `};o===9?d=`
            var data = vec4<u32>(0);
            ${c("data",0,"u32")}
            ${c("data",1,"u32")}
            ${c("data",2,"u32")}
            ${c("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:d=`
            ${c("output_data[global_idx]",0)}
            ${c("output_data[global_idx]",1)}
            ${c("output_data[global_idx]",2)}
            ${c("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(u,i,a,s)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},Ic=e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,o=e[1].dataType,s=!(x.areEqual(t,r)&&x.areEqual(r,n)),i=t,a=x.size(t);if(s){let d=ke.calcShape(ke.calcShape(t,r,!1),n,!1);if(!d)throw new Error("Can't perform where op on the given tensors");i=d,a=x.size(i)}let u=Math.ceil(a/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:d=>Tc(d,e,i,s,o),getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:Math.ceil(a/64/4)},programUniforms:[{type:12,data:u},...k(n,t,r,i)]})}},Ua=e=>{e.compute(Ic(e.inputs))}});var Wa,La=A(()=>{"use strict";Do();qt();Vo();No();Ti();Ri();Ui();Ji();ss();ds();ps();ys();_s();vs();Ts();As();Ps();Os();Ls();qs();Ks();Lr();Xs();Qr();Ys();ha();ba();_a();Gt();Sa();Ia();Aa();za();Da();Jr();Va();De();Kt();Na();Wa=new Map([["Abs",[Wo]],["Acos",[Lo]],["Acosh",[Go]],["Add",[Ii]],["ArgMax",[Oo,Rr]],["ArgMin",[Bo,Rr]],["Asin",[Ho]],["Asinh",[qo]],["Atan",[Fo]],["Atanh",[Ko]],["Attention",[Ro]],["AveragePool",[sa,ia]],["BatchNormalization",[Mo]],["BiasAdd",[Uo]],["BiasSplitGelu",[Si]],["Cast",[Zo,jo]],["Ceil",[Qo]],["Clip",[Xo]],["Concat",[Mi,Vi]],["Conv",[Fr,qr]],["ConvTranspose",[is,os]],["Cos",[Yo]],["Cosh",[Jo]],["CumSum",[as,us]],["DepthToSpace",[ls,cs]],["DequantizeLinear",[ga,ya]],["Div",[Ci]],["Einsum",[hs,gs]],["Elu",[ei,at]],["Equal",[Ai]],["Erf",[ti]],["Exp",[ri]],["Expand",[ws]],["FastGelu",[$s]],["Floor",[ni]],["FusedConv",[Fr,qr]],["Gather",[Ss,xs]],["GatherElements",[Es,ks]],["GatherBlockQuantized",[Is,Cs]],["Gelu",[oi]],["Gemm",[Bs,zs]],["GlobalAveragePool",[da,ua]],["GlobalMaxPool",[fa,ma]],["Greater",[zi]],["GreaterOrEqual",[Oi]],["GroupQueryAttention",[Ws]],["HardSigmoid",[pi,ci]],["InstanceNormalization",[Hs]],["LayerNormalization",[Fs]],["LeakyRelu",[ii,at]],["Less",[Bi]],["LessOrEqual",[Di]],["Log",[$i]],["MatMul",[Qi]],["MatMulNBits",[js,Zs]],["MaxPool",[ca,pa]],["Mul",[ki]],["MultiHeadAttention",[Ms,Rs]],["Neg",[ai]],["Not",[si]],["Pad",[Qs]],["Pow",[Ei]],["QuickGelu",[vi,at]],["Range",[wa]],["Reciprocal",[ui]],["ReduceMin",[Co]],["ReduceMean",[vo]],["ReduceMax",[Io]],["ReduceSum",[ko]],["ReduceProd",[Ao]],["ReduceL1",[xo]],["ReduceL2",[So]],["ReduceLogSum",[Po]],["ReduceLogSumExp",[To]],["ReduceSumSquare",[Eo]],["Relu",[di]],["Resize",[va,xa]],["RotaryEmbedding",[Ta]],["Sigmoid",[li]],["Sin",[mi]],["Sinh",[fi]],["Slice",[Ea,Pa]],["SkipLayerNormalization",[Ca]],["Split",[Vs,Us]],["Sqrt",[hi]],["Softmax",[Ba,Oa]],["Sub",[Pi]],["Tan",[gi]],["Tanh",[bi]],["ThresholdedRelu",[_i,at]],["Tile",[Ma]],["Transpose",[uo,lo]],["Where",[Ua]]])});var rr,Ga=A(()=>{"use strict";Se();Ce();F();rr=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,r){this.repo.set(t,r)}run(t,r,n,o,s){_e(t.programInfo.name);let i=this.backend.device,a=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let l of r)u.push({binding:u.length,resource:{buffer:l.buffer}});for(let l of n)u.push({binding:u.length,resource:{buffer:l.buffer}});s&&u.push({binding:u.length,resource:s});let d=i.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:u,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let l={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:d,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(l)}a.setPipeline(t.computePipeline),a.setBindGroup(0,d),a.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),ye(t.programInfo.name)}dispose(){}build(t,r){_e(t.name);let n=this.backend.device,o=[];n.features.has("shader-f16")&&o.push("enable f16;");let s=so(r,this.backend.device.limits),i=t.getShaderSource(s),a=`${o.join(`
`)}
${s.additionalImplementations}
${i}`,u=n.createShaderModule({code:a,label:t.name});j("verbose",()=>`[WebGPU] ${t.name} shader code: ${a}`);let d=n.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:t.name});return ye(t.name),{programInfo:t,computePipeline:d,uniformVariablesInfo:s.variablesInfo}}normalizeDispatchGroupSize(t){let r=typeof t=="number"?t:t.x,n=typeof t=="number"?1:t.y||1,o=typeof t=="number"?1:t.z||1,s=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=s&&n<=s&&o<=s)return[r,n,o];let i=r*n*o,a=Math.ceil(Math.sqrt(i));if(a>s){if(a=Math.ceil(Math.cbrt(i)),a>s)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[a,a,a]}else return[a,a,1]}}});var Cc,Ac,en,nr,Ha=A(()=>{"use strict";Se();M();Ce();Sr();no();La();Ga();Cc=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let o=e[n].dataType;switch(t[n]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let s=e[n].dims.length;r.push(`${o};${s}`);break}case"dims":{let s=e[n].dims.join(",");r.push(`${o};${s}`);break}default:throw new Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")},Ac=(e,t,r)=>{let n=e.name;return e.shaderCache?.hint&&(n+="["+e.shaderCache.hint+"]"),n+=":"+r+`:${Cc(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,n},en=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},nr=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,r){this.env=t;let n=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n};r.features.has("chromium-experimental-timestamp-query-inside-passes")?n.push("chromium-experimental-timestamp-query-inside-passes"):r.features.has("timestamp-query")&&n.push("timestamp-query"),r.features.has("shader-f16")&&n.push("shader-f16"),this.device=await r.requestDevice(o),this.adapterInfo=new en(r.info||await r.requestAdapterInfo()),this.gpuDataManager=ro(this),this.programManager=new rr(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Vt(t.logLevel,!!t.debug),this.device.onuncapturederror=s=>{s.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${s.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;_e(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(t.getMappedRange()),n=this.pendingQueries.get(t);for(let o=0;o<r.length/2;o++){let s=n[o],i=s.kernelId,a=this.kernels.get(i),u=a.kernelType,d=a.kernelName,l=s.programName,c=s.inputTensorViews,p=s.outputTensorViews,h=r[o*2],m=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=h);let f=Number(h-this.queryTimeBase),y=Number(m-this.queryTimeBase);if(!Number.isSafeInteger(f)||!Number.isSafeInteger(y))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map(b=>({dims:b.dims,dataType:Ve(b.dataType)})),outputsMetadata:p.map(b=>({dims:b.dims,dataType:Ve(b.dataType)})),kernelId:i,kernelType:u,kernelName:d,programName:l,startTime:f,endTime:y});else{let b="";c.forEach((w,_)=>{b+=`input[${_}]: [${w.dims}] | ${Ve(w.dataType)}, `});let g="";p.forEach((w,_)=>{g+=`output[${_}]: [${w.dims}] | ${Ve(w.dataType)}, `}),console.log(`[profiling] kernel "${i}|${u}|${d}|${l}" ${b}${g}execution time: ${y-f} ns`)}$t("GPU",`${l}::${h}::${m}`)}t.unmap(),this.pendingQueries.delete(t)}),ye()}run(t,r,n,o,s,i){_e(t.name);let a=[];for(let w=0;w<r.length;++w){let _=r[w].data;if(_===0)continue;let $=this.gpuDataManager.get(_);if(!$)throw new Error(`no GPU data for input: ${_}`);a.push($)}let{outputs:u,dispatchGroup:d,programUniforms:l}=t.getRunData(r),c=n.length===0?u.map((w,_)=>_):n;if(c.length!==u.length)throw new Error(`Output size ${c.length} must be equal to ${u.length}.`);let p=[],h=[];for(let w=0;w<u.length;++w){if(!Number.isInteger(c[w])||c[w]<-3||c[w]>=i)throw new Error(`Invalid output index: ${c[w]}`);if(c[w]===-3)continue;let _=c[w]===-1,$=c[w]===-2,v=_||$?s(u[w].dataType,u[w].dims):o(c[w],u[w].dataType,u[w].dims);if(p.push(v),v.data===0)continue;let T=this.gpuDataManager.get(v.data);if(!T)throw new Error(`no GPU data for output: ${v.data}`);if(_&&this.temporaryData.push(T),$){let I=this.kernelPersistentData.get(this.currentKernelId);I||(I=[],this.kernelPersistentData.set(this.currentKernelId,I)),I.push(T)}h.push(T)}if(a.length!==r.length||h.length!==p.length){if(h.length===0)return ye(t.name),p;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let m;if(l){let w=0,_=[];l.forEach(I=>{let P=typeof I.data=="number"?[I.data]:I.data;if(P.length===0)return;let B=I.type===10?2:4,D,L;I.type===10?(L=P.length>4?16:P.length>2?8:P.length*B,D=P.length>4?16:B*P.length):(L=P.length<=2?P.length*B:16,D=16),w=Math.ceil(w/L)*L,_.push(w);let z=I.type===10?8:4;w+=P.length>4?Math.ceil(P.length/z)*D:P.length*B});let $=16;w=Math.ceil(w/$)*$;let v=new ArrayBuffer(w);l.forEach((I,P)=>{let B=_[P],D=typeof I.data=="number"?[I.data]:I.data;if(I.type===6)new Int32Array(v,B,D.length).set(D);else if(I.type===12)new Uint32Array(v,B,D.length).set(D);else if(I.type===10)new Uint16Array(v,B,D.length).set(D);else if(I.type===1)new Float32Array(v,B,D.length).set(D);else throw new Error(`Unsupported uniform type: ${Ve(I.type)}`)});let T=this.gpuDataManager.create(w,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(T.buffer,0,v,0,w),this.gpuDataManager.release(T.id),m={offset:0,size:w,buffer:T.buffer}}let f=this.programManager.normalizeDispatchGroupSize(d),y=f[1]===1&&f[2]===1,b=Ac(t,r,y),g=this.programManager.getArtifact(b);if(g||(g=this.programManager.build(t,f),this.programManager.setArtifact(b,g),j("info",()=>`[artifact] key: ${b}, programName: ${t.name}`)),l&&g.uniformVariablesInfo){if(l.length!==g.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${g.uniformVariablesInfo.length}, got ${l.length} in program "${g.programInfo.name}".`);for(let w=0;w<l.length;w++){let _=l[w],$=_.type,v=typeof _.data=="number"?1:_.data.length,[T,I]=g.uniformVariablesInfo[w];if($!==T||v!==I)throw new Error(`Uniform variable ${w} mismatch: expect type ${T} with size ${I}, got type ${$} with size ${v} in program "${g.programInfo.name}".`)}}if(j("info",()=>`[ProgramManager] run "${t.name}" (key=${b}) with ${f[0]}x${f[1]}x${f[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let w={kernelId:this.currentKernelId,programName:g.programInfo.name,inputTensorViews:r,outputTensorViews:p};this.pendingKernels.push(w),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(w)}return this.programManager.run(g,a,h,f,m),ye(t.name),p}upload(t,r){this.gpuDataManager.upload(t,r)}memcpy(t,r){this.gpuDataManager.memcpy(t,r)}async download(t,r){await this.gpuDataManager.download(t,r)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,r,n,o){let s=Wa.get(t);if(!s)throw new Error(`kernel not implemented: ${t}`);let i={kernelType:t,kernelName:o,kernelEntry:s[0],attributes:[s[1],n]};this.kernels.set(r,i)}releaseKernel(t){let r=this.kernelPersistentData.get(t);if(r){for(let n of r)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,r,n){let o=this.kernels.get(t);if(!o)throw new Error(`kernel not created: ${t}`);let s=o.kernelType,i=o.kernelName,a=o.kernelEntry,u=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${s}] ${i}" is not allowed to be called recursively`);this.currentKernelId=t,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),j("info",()=>`[WebGPU] Start to run kernel "[${s}] ${i}"...`);let d=this.env.debug;this.temporaryData=[];try{return d&&this.device.pushErrorScope("validation"),a(r,u[1]),0}catch(l){return n.push(Promise.resolve(`[WebGPU] Kernel "[${s}] ${i}" failed. ${l}`)),1}finally{d&&n.push(this.device.popErrorScope().then(l=>l?`GPU validation error for kernel "[${s}] ${i}": ${l.message}`:null));for(let l of this.temporaryData)this.gpuDataManager.release(l.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,r,n,o){let s=this.sessionExternalDataMapping.get(t);s||(s=new Map,this.sessionExternalDataMapping.set(t,s));let i=s.get(r),a=this.gpuDataManager.registerExternalBuffer(n,o,i);return s.set(r,[a,n]),a}unregisterBuffers(t){let r=this.sessionExternalDataMapping.get(t);r&&(r.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[0])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let r=this.gpuDataManager.get(t);if(!r)throw new Error(`no GPU data for buffer: ${t}`);return r.buffer}createDownloader(t,r,n){return async()=>{let o=await Ar(this,t,r);return Ut(o.buffer,n)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){j("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){j("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){j("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),n=t.length;this.pendingKernels=[];for(let o=0;o<n;o++){let s=this.getComputePassEncoder(),i=t[o];this.writeTimestamp(this.pendingDispatchNumber*2),s.setPipeline(i.computePipeline),s.setBindGroup(0,i.bindGroup),s.dispatchWorkgroups(...i.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});var kc,qa,or,ir,tn,Fa,Ka=A(()=>{"use strict";Ce();kc=1,qa=()=>kc++,or=class{constructor(t){this.sessionId=t.sessionId,this.mlContext=t.context,this.mlTensor=t.tensor,this.dataType=t.dataType,this.tensorShape=t.shape}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}destroy(){j("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(t){this.mlContext.writeTensor(this.mlTensor,t)}async read(t){return t?this.mlContext.readTensor(this.mlTensor,t):this.mlContext.readTensor(this.mlTensor)}sameTypeAndShape(t,r){return this.dataType===t&&this.tensorShape.every((n,o)=>n===r[o])}},ir=class{constructor(t,r){this.tensorManager=t;this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&this.tensorManager.releaseTensor(this.tensorWrapper)}async ensureTensor(t,r,n){if(this.wrapper){if(this.wrapper.sameTypeAndShape(t,r))return this.wrapper.tensor;n&&(this.activeUpload=new Uint8Array(await this.wrapper.read())),this.tensorManager.releaseTensor(this.wrapper)}let o=MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(t,r,o,!0,!0),n&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(t){if(this.wrapper){this.wrapper.write(t);return}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(t){if(this.activeUpload)if(t){t instanceof ArrayBuffer?new Uint8Array(t).set(this.activeUpload):new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(this.activeUpload);return}else return this.activeUpload.buffer;if(!this.wrapper)throw new Error("Tensor has not been created.");return t?this.wrapper.read(t):this.wrapper.read()}},tn=class{constructor(t){this.backend=t;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}reserveTensorId(){let t=qa();return this.tensorTrackersById.set(t,new ir(this)),t}releaseTensorId(t){let r=this.tensorTrackersById.get(t);r&&(this.tensorTrackersById.delete(t),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(t,r,n,o){j("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${n}, copyOld: ${o}}`);let s=this.tensorTrackersById.get(t);if(!s)throw new Error("Tensor not found.");return s.ensureTensor(r,n,o)}upload(t,r){let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");n.upload(r)}async download(t,r){j("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${t}, dstBuffer: ${r?.byteLength}}`);let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");return n.download(r)}releaseTensorsForSession(t){for(let r of this.freeTensors)r.sessionId===t&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==t)}registerTensor(t,r,n,o){let s=qa(),i=new or({sessionId:this.backend.currentSessionId,context:t,tensor:r,dataType:n,shape:o});return this.tensorTrackersById.set(s,new ir(this,i)),this.externalTensors.add(i),s}async getCachedTensor(t,r,n,o,s){let i=this.backend.currentSessionId;for(let[d,l]of this.freeTensors.entries())if(l.sameTypeAndShape(t,r)){let c=this.freeTensors.splice(d,1)[0];return c.sessionId=i,c}let a=this.backend.currentContext;j("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, shape: ${r}}`);let u=await a.createTensor({dataType:t,shape:r,dimensions:r,usage:n,writable:o,readable:s});return new or({sessionId:i,context:a,tensor:u,dataType:t,shape:r})}releaseTensor(t){this.externalTensors.has(t)&&this.externalTensors.delete(t),this.freeTensors.push(t)}},Fa=(...e)=>new tn(...e)});var ja,sr,Za=A(()=>{"use strict";M();Me();Sr();Ka();Ce();ja=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),sr=class{constructor(t){this.tensorManager=Fa(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;Vt(t.logLevel,!!t.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(t){this.activeSessionId=t}get currentContext(){let t=this.getMLContext(this.currentSessionId);if(!t)throw new Error(`No MLContext found for session ${this.currentSessionId}`);return t}registerMLContext(t,r){this.mlContextBySessionId.set(t,r);let n=this.sessionIdsByMLContext.get(r);n||(n=new Set,this.sessionIdsByMLContext.set(r,n)),n.add(t)}onReleaseSession(t){let r=this.mlContextBySessionId.get(t);if(!r)return;this.tensorManager.releaseTensorsForSession(t),this.mlContextBySessionId.delete(t);let n=this.sessionIdsByMLContext.get(r);n.delete(t),n.size===0&&this.sessionIdsByMLContext.delete(r)}getMLContext(t){return this.mlContextBySessionId.get(t)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(t){j("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t)}async ensureTensor(t,r,n,o){let s=ja.get(r);if(!s)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(t,s,n,o)}uploadTensor(t,r){if(!ae().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");j("verbose",()=>`[WebNN] uploadTensor {tensorId: ${t}, data: ${r.byteLength}}`),this.tensorManager.upload(t,r)}async downloadTensor(t,r){return this.tensorManager.download(t,r)}createMLTensorDownloader(t,r){return async()=>{let n=await this.tensorManager.download(t);return Ut(n,r)}}registerMLTensor(t,r,n){let o=ja.get(r);if(!o)throw new Error(`Unsupported ONNX data type: ${r}`);let s=this.tensorManager.registerTensor(this.currentContext,t,o,n);return j("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${o}, dimensions: ${n}} -> {tensorId: ${s}}`),s}registerMLConstant(t,r,n,o,s,i){if(!i)throw new Error("External mounted files are not available.");let a=t;t.startsWith("./")&&(a=t.substring(2));let u=i.get(a);if(!u)throw new Error(`File with name ${a} not found in preloaded files.`);if(r+n>u.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let d=u.slice(r,r+n).buffer,l;switch(s.dataType){case"float32":l=new Float32Array(d);break;case"float16":l=new Uint16Array(d);break;case"int32":l=new Int32Array(d);break;case"uint32":l=new Uint32Array(d);break;case"int64":l=new BigInt64Array(d);break;case"uint64":l=new BigUint64Array(d);break;case"int8":l=new Int8Array(d);break;case"int4":case"uint4":case"uint8":l=new Uint8Array(d);break;default:throw new Error(`Unsupported data type: ${s.dataType} in creating WebNN Constant from external data.`)}return j("verbose",()=>`[WebNN] registerMLConstant {dataType: ${s.dataType}, shape: ${s.shape}}}`),o.constant(s,l)}flush(){}}});var Xa={};ht(Xa,{init:()=>Ec});var mt,rn,Ec,Qa=A(()=>{"use strict";M();Ha();Ce();q();Za();mt=class e{constructor(t,r,n,o){this.module=t;this.dataType=r;this.data=n;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=x.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=x.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=x.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=x.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(x.size(t)!==x.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},rn=class{constructor(t,r,n){this.module=t;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo;let o=t.PTR_SIZE,s=n/t.PTR_SIZE,i=o===4?"i32":"i64";this.opKernelContext=Number(t.getValue(o*s++,i));let a=Number(t.getValue(o*s++,i));this.outputCount=Number(t.getValue(o*s++,i)),this.customDataOffset=Number(t.getValue(o*s++,"*")),this.customDataSize=Number(t.getValue(o*s++,i));let u=[];for(let d=0;d<a;d++){let l=Number(t.getValue(o*s++,i)),c=Number(t.getValue(o*s++,"*")),p=Number(t.getValue(o*s++,i)),h=[];for(let m=0;m<p;m++)h.push(Number(t.getValue(o*s++,i)));u.push(new mt(t,l,c,h))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}getMaxComputeWorkgroupSizes(){return[this.backend.device.limits.maxComputeWorkgroupSizeX,this.backend.device.limits.maxComputeWorkgroupSizeY,this.backend.device.limits.maxComputeWorkgroupSizeZ]}getMaxComputeWorkgroupStoragesize(){return this.backend.device.limits.maxComputeWorkgroupStorageSize}compute(t,r){let n=r?.inputs?.map(a=>typeof a=="number"?this.inputs[a]:a)??this.inputs,o=r?.outputs??[],s=(a,u,d)=>new mt(this.module,u,this.output(a,d),d),i=(a,u)=>{let d=He(a,u);if(!d)throw new Error(`Unsupported data type: ${a}`);let l=d>0?this.backend.gpuDataManager.create(d).id:0;return new mt(this.module,a,l,u)};return this.backend.run(t,n,o,s,i,this.outputCount)}output(t,r){let n=this.module.stackSave();try{let o=this.module.PTR_SIZE,s=o===4?"i32":"i64",i=this.module.stackAlloc((1+r.length)*o);this.module.setValue(i,r.length,s);for(let a=0;a<r.length;a++)this.module.setValue(i+o*(a+1),r[a],s);return this.module._JsepOutput(this.opKernelContext,t,i)}catch(o){throw new Error(`Failed to generate kernel's output[${t}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(n)}}},Ec=async(e,t,r,n)=>{let o=t.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let s=new nr;await s.initialize(r,n),o("webgpu",[s,i=>s.alloc(Number(i)),i=>s.free(i),(i,a,u,d=!1)=>{if(d)j("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(i)}, dst=${Number(a)}, size=${Number(u)}`),s.memcpy(Number(i),Number(a));else{j("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(i)}, gpuDataId=${Number(a)}, size=${Number(u)}`);let l=t.HEAPU8.subarray(Number(i>>>0),Number(i>>>0)+Number(u));s.upload(Number(a),l)}},async(i,a,u)=>{j("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${i}, dataOffset=${a}, size=${u}`),await s.download(Number(i),()=>t.HEAPU8.subarray(Number(a)>>>0,Number(a+u)>>>0))},(i,a,u)=>s.createKernel(i,Number(a),u,t.UTF8ToString(t._JsepGetNodeName(Number(a)))),i=>s.releaseKernel(i),(i,a,u,d)=>{j("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${u}, kernel=${i}, contextDataOffset=${a}`);let l=new rn(t,s,Number(a));return s.computeKernel(Number(i),l,d)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let s=new sr(r);o("webnn",[s,()=>s.reserveTensorId(),i=>s.releaseTensorId(i),async(i,a,u,d)=>s.ensureTensor(i,a,u,d),(i,a)=>{s.uploadTensor(i,a)},async(i,a)=>s.downloadTensor(i,a)])}}});var Pc,It,Ct,je,zc,rt,At,kt,Ya,Et,Pt,zt,wr=A(()=>{"use strict";jn();Xn();M();Me();Ot();xr();Pc=(e,t)=>{ae()._OrtInit(e,t)!==0&&X("Can't initialize onnxruntime.")},It=async e=>{Pc(e.wasm.numThreads,it(e.logLevel))},Ct=async(e,t)=>{{let r=(Qa(),fr(Xa)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let n=e.webgpu.adapter;if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=e.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let s=e.webgpu.forceFallbackAdapter;if(s!==void 0&&typeof s!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${s}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:s}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",ae(),e,n)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",ae(),e)}}},je=new Map,zc=e=>{let t=ae(),r=t.stackSave();try{let n=t.PTR_SIZE,o=t.stackAlloc(2*n);t._OrtGetInputOutputCount(e,o,o+n)!==0&&X("Can't get session input/output count.");let i=n===4?"i32":"i64";return[Number(t.getValue(o,i)),Number(t.getValue(o+n,i))]}finally{t.stackRestore(r)}},rt=e=>{let t=ae(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},At=async(e,t)=>{let r,n,o=ae();Array.isArray(e)?[r,n]=e:e.buffer===o.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=rt(e);let s=0,i=0,a=0,u=[],d=[],l=[];try{if([i,u]=Zn(t),t?.externalData&&o.mountExternalData){let g=[];for(let w of t.externalData){let _=typeof w=="string"?w:w.path;g.push(st(typeof w=="string"?w:w.data).then($=>{o.mountExternalData(_,$)}))}await Promise.all(g)}for(let g of t?.executionProviders??[])if((typeof g=="string"?g:g.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,o.currentContext)throw new Error("WebNN execution provider is already set.");if(typeof g!="string"){let _=g,$=_?.context,v=_?.gpuDevice,T=_?.deviceType,I=_?.powerPreference;$?o.currentContext=$:v?o.currentContext=await navigator.ml.createContext(v):o.currentContext=await navigator.ml.createContext({deviceType:T,powerPreference:I})}else o.currentContext=await navigator.ml.createContext();break}s=await o._OrtCreateSession(r,n,i),s===0&&X("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.jsepRegisterMLContext(s,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[c,p]=zc(s),h=!!t?.enableGraphCapture,m=[],f=[],y=[];for(let g=0;g<c;g++){let w=o._OrtGetInputName(s,g);w===0&&X("Can't get an input name."),d.push(w),m.push(o.UTF8ToString(w))}for(let g=0;g<p;g++){let w=o._OrtGetOutputName(s,g);w===0&&X("Can't get an output name."),l.push(w);let _=o.UTF8ToString(w);f.push(_);{if(h&&t?.preferredOutputLocation===void 0){y.push("gpu-buffer");continue}let $=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[_]??"cpu";if($!=="cpu"&&$!=="cpu-pinned"&&$!=="gpu-buffer"&&$!=="ml-tensor")throw new Error(`Not supported preferred output location: ${$}.`);if(h&&$!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${$}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);y.push($)}}let b=null;return y.some(g=>g==="gpu-buffer"||g==="ml-tensor")&&(a=o._OrtCreateBinding(s),a===0&&X("Can't create IO binding."),b={handle:a,outputPreferredLocations:y,outputPreferredLocationsEncoded:y.map(g=>vr(g))}),je.set(s,[s,d,l,b,h,!1]),[s,m,f]}catch(c){throw d.forEach(p=>o._OrtFree(p)),l.forEach(p=>o._OrtFree(p)),a!==0&&o._OrtReleaseBinding(a)!==0&&X("Can't release IO binding."),s!==0&&o._OrtReleaseSession(s)!==0&&X("Can't release session."),c}finally{o._free(r),i!==0&&o._OrtReleaseSessionOptions(i)!==0&&X("Can't release session options."),u.forEach(c=>o._free(c)),o.unmountExternalData?.()}},kt=e=>{let t=ae(),r=je.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[n,o,s,i,a]=r;i&&(a&&t._OrtClearBoundOutputs(i.handle)!==0&&X("Can't clear bound outputs."),t._OrtReleaseBinding(i.handle)!==0&&X("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),o.forEach(u=>t._OrtFree(u)),s.forEach(u=>t._OrtFree(u)),t._OrtReleaseSession(n)!==0&&X("Can't release session."),je.delete(e)},Ya=(e,t,r,n,o,s=!1)=>{if(!e){t.push(0);return}let i=ae(),a=i.PTR_SIZE,u=e[0],d=e[1],l=e[3],c,p;if(u==="string"&&(l==="gpu-buffer"||l==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&l!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(l==="gpu-buffer"){let f=e[2].gpuBuffer;p=He(ot(u),d);let y=i.jsepRegisterBuffer;if(!y)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');c=y(n,o,f,p)}else if(l==="ml-tensor"){let f=e[2].mlTensor;p=He(ot(u),d);let y=i.jsepRegisterMLTensor;if(!y)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');c=y(f,ot(u),d)}else{let f=e[2];if(Array.isArray(f)){p=a*f.length,c=i._malloc(p),r.push(c);for(let y=0;y<f.length;y++){if(typeof f[y]!="string")throw new TypeError(`tensor data at index ${y} is not a string`);i.setValue(c+y*a,le(f[y],r),"*")}}else p=f.byteLength,c=i._malloc(p),r.push(c),i.HEAPU8.set(new Uint8Array(f.buffer,f.byteOffset,p),c)}let h=i.stackSave(),m=i.stackAlloc(4*d.length);try{d.forEach((y,b)=>i.setValue(m+b*a,y,a===4?"i32":"i64"));let f=i._OrtCreateTensor(ot(u),c,p,m,d.length,vr(l));f===0&&X(`Can't create tensor for input/output. session=${n}, index=${o}.`),t.push(f)}finally{i.stackRestore(h)}},Et=async(e,t,r,n,o,s)=>{let i=ae(),a=i.PTR_SIZE,u=je.get(e);if(!u)throw new Error(`cannot run inference. invalid session id: ${e}`);let d=u[0],l=u[1],c=u[2],p=u[3],h=u[4],m=u[5],f=t.length,y=n.length,b=0,g=[],w=[],_=[],$=[],v=i.stackSave(),T=i.stackAlloc(f*a),I=i.stackAlloc(f*a),P=i.stackAlloc(y*a),B=i.stackAlloc(y*a);try{i.jsepOnRunStart?.(d),[b,g]=Kn(s);for(let z=0;z<f;z++)Ya(r[z],w,$,e,t[z],h);for(let z=0;z<y;z++)Ya(o[z],_,$,e,f+n[z],h);for(let z=0;z<f;z++)i.setValue(T+z*a,w[z],"*"),i.setValue(I+z*a,l[t[z]],"*");for(let z=0;z<y;z++)i.setValue(P+z*a,_[z],"*"),i.setValue(B+z*a,c[n[z]],"*");if(p&&!m){let{handle:z,outputPreferredLocations:N,outputPreferredLocationsEncoded:se}=p;if(l.length!==f)throw new Error(`input count from feeds (${f}) is expected to be always equal to model's input count (${l.length}).`);for(let W=0;W<f;W++){let Z=t[W];await i._OrtBindInput(z,l[Z],w[W])!==0&&X(`Can't bind input[${W}] for session=${e}.`)}for(let W=0;W<y;W++){let Z=n[W];o[W]?.[3]?i._OrtBindOutput(z,c[Z],_[W],0)!==0&&X(`Can't bind pre-allocated output[${W}] for session=${e}.`):i._OrtBindOutput(z,c[Z],0,se[Z])!==0&&X(`Can't bind output[${W}] to ${N[W]} for session=${e}.`)}je.set(e,[d,l,c,p,h,!0])}let D;p?D=await i._OrtRunWithBinding(d,p.handle,y,P,b):D=await i._OrtRun(d,I,T,f,B,y,P,b),D!==0&&X("failed to call OrtRun().");let L=[];for(let z=0;z<y;z++){let N=Number(i.getValue(P+z*a,"*"));if(N===_[z]){L.push(o[z]);continue}let se=i.stackSave(),W=i.stackAlloc(4*a),Z=!1,K,V=0;try{i._OrtGetTensorData(N,W,W+a,W+2*a,W+3*a)!==0&&X(`Can't access output tensor data on index ${z}.`);let oe=a===4?"i32":"i64",Q=Number(i.getValue(W,oe));V=i.getValue(W+a,"*");let H=i.getValue(W+a*2,"*"),E=Number(i.getValue(W+a*3,oe)),R=[];for(let ie=0;ie<E;ie++)R.push(Number(i.getValue(H+ie*a,oe)));i._OrtFree(H)!==0&&X("Can't free memory for tensor dims.");let Y=R.reduce((ie,de)=>ie*de,1);K=Ve(Q);let ge=p?.outputPreferredLocations[n[z]];if(K==="string"){if(ge==="gpu-buffer"||ge==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let ie=[];for(let de=0;de<Y;de++){let Ue=i.getValue(V+de*a,"*"),cu=i.getValue(V+(de+1)*a,"*"),pu=de===Y-1?void 0:cu-Ue;ie.push(i.UTF8ToString(Ue,pu))}L.push([K,R,ie,"cpu"])}else if(ge==="gpu-buffer"&&Y>0){let ie=i.jsepGetBuffer;if(!ie)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let de=ie(V),Ue=He(Q,Y);if(Ue===void 0||!Rt(K))throw new Error(`Unsupported data type: ${K}`);Z=!0,L.push([K,R,{gpuBuffer:de,download:i.jsepCreateDownloader(de,Ue,K),dispose:()=>{i._OrtReleaseTensor(N)!==0&&X("Can't release tensor.")}},"gpu-buffer"])}else if(ge==="ml-tensor"&&Y>0){let ie=i.jsepEnsureTensor;if(!ie)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(He(Q,Y)===void 0||!Mt(K))throw new Error(`Unsupported data type: ${K}`);let Ue=await ie(V,Q,R,!1);Z=!0,L.push([K,R,{mlTensor:Ue,download:i.jsepCreateMLTensorDownloader(V,K),dispose:()=>{i.jsepReleaseTensorId(V),i._OrtReleaseTensor(N)}},"ml-tensor"])}else{let ie=Dt(K),de=new ie(Y);new Uint8Array(de.buffer,de.byteOffset,de.byteLength).set(i.HEAPU8.subarray(V,V+de.byteLength)),L.push([K,R,de,"cpu"])}}finally{i.stackRestore(se),K==="string"&&V&&i._free(V),Z||i._OrtReleaseTensor(N)}}return p&&!h&&(i._OrtClearBoundOutputs(p.handle)!==0&&X("Can't clear bound outputs."),je.set(e,[d,l,c,p,h,!1])),L}finally{i.stackRestore(v),w.forEach(D=>i._OrtReleaseTensor(D)),_.forEach(D=>i._OrtReleaseTensor(D)),$.forEach(D=>i._free(D)),b!==0&&i._OrtReleaseRunOptions(b),g.forEach(D=>i._free(D))}},Pt=e=>{let t=ae(),r=je.get(e);if(!r)throw new Error("invalid session id");let n=r[0],o=t._OrtEndProfiling(n);o===0&&X("Can't get an profile file name."),t._OrtFree(o)},zt=e=>{let t=[];for(let r of e){let n=r[2];!Array.isArray(n)&&"buffer"in n&&t.push(n.buffer)}return t}});var Ze,Ie,ft,ur,dr,ar,nn,on,Ye,Je,Oc,Ja,eu,tu,ru,nu,ou,iu,sn=A(()=>{"use strict";Se();wr();Me();tt();Ze=()=>!!te.wasm.proxy&&typeof document<"u",ft=!1,ur=!1,dr=!1,on=new Map,Ye=(e,t)=>{let r=on.get(e);r?r.push(t):on.set(e,[t])},Je=()=>{if(ft||!ur||dr||!Ie)throw new Error("worker not ready")},Oc=e=>{switch(e.data.type){case"init-wasm":ft=!1,e.data.err?(dr=!0,nn[1](e.data.err)):(ur=!0,nn[0]()),ar&&(URL.revokeObjectURL(ar),ar=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=on.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},Ja=async()=>{if(!ur){if(ft)throw new Error("multiple calls to 'initWasm()' detected.");if(dr)throw new Error("previous call to 'initWasm()' failed.");if(ft=!0,Ze())return new Promise((e,t)=>{Ie?.terminate(),Hn().then(([r,n])=>{try{Ie=n,Ie.onerror=s=>t(s),Ie.onmessage=Oc,nn=[e,t];let o={type:"init-wasm",in:te};Ie.postMessage(o),ar=r}catch(o){t(o)}},t)});try{await Tt(te.wasm),await It(te),ur=!0}catch(e){throw dr=!0,e}finally{ft=!1}}},eu=async e=>{if(Ze())return Je(),new Promise((t,r)=>{Ye("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:te}};Ie.postMessage(n)});await Ct(te,e)},tu=async e=>Ze()?(Je(),new Promise((t,r)=>{Ye("copy-from",[t,r]);let n={type:"copy-from",in:{buffer:e}};Ie.postMessage(n,[e.buffer])})):rt(e),ru=async(e,t)=>{if(Ze()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Je(),new Promise((r,n)=>{Ye("create",[r,n]);let o={type:"create",in:{model:e,options:{...t}}},s=[];e instanceof Uint8Array&&s.push(e.buffer),Ie.postMessage(o,s)})}else return At(e,t)},nu=async e=>{if(Ze())return Je(),new Promise((t,r)=>{Ye("release",[t,r]);let n={type:"release",in:e};Ie.postMessage(n)});kt(e)},ou=async(e,t,r,n,o,s)=>{if(Ze()){if(r.some(i=>i[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(i=>i))throw new Error("pre-allocated output tensor is not supported for proxy.");return Je(),new Promise((i,a)=>{Ye("run",[i,a]);let u=r,d={type:"run",in:{sessionId:e,inputIndices:t,inputs:u,outputIndices:n,options:s}};Ie.postMessage(d,zt(u))})}else return Et(e,t,r,n,o,s)},iu=async e=>{if(Ze())return Je(),new Promise((t,r)=>{Ye("end-profiling",[t,r]);let n={type:"end-profiling",in:e};Ie.postMessage(n)});Pt(e)}});var su,Dc,lr,au=A(()=>{"use strict";Se();sn();M();St();xr();su=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Dc=e=>{switch(e[3]){case"cpu":return new he(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Rt(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:o}=e[2];return he.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:o})}case"ml-tensor":{let t=e[0];if(!Mt(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:n,dispose:o}=e[2];return he.fromMLTensor(r,{dataType:t,dims:e[1],download:n,dispose:o})}default:throw new Error(`invalid data location: ${e[3]}`)}},lr=class{async fetchModelAndCopyToWasmMemory(t){return tu(await st(t))}async loadModel(t,r){_e();let n;typeof t=="string"?!1?n=await st(t):n=await this.fetchModelAndCopyToWasmMemory(t):n=t,[this.sessionId,this.inputNames,this.outputNames]=await ru(n,r),ye()}async dispose(){return nu(this.sessionId)}async run(t,r,n){_e();let o=[],s=[];Object.entries(t).forEach(p=>{let h=p[0],m=p[1],f=this.inputNames.indexOf(h);if(f===-1)throw new Error(`invalid input '${h}'`);o.push(m),s.push(f)});let i=[],a=[];Object.entries(r).forEach(p=>{let h=p[0],m=p[1],f=this.outputNames.indexOf(h);if(f===-1)throw new Error(`invalid output '${h}'`);i.push(m),a.push(f)});let u=o.map((p,h)=>su(p,()=>`input "${this.inputNames[s[h]]}"`)),d=i.map((p,h)=>p?su(p,()=>`output "${this.outputNames[a[h]]}"`):null),l=await ou(this.sessionId,s,u,a,d,n),c={};for(let p=0;p<l.length;p++)c[this.outputNames[a[p]]]=i[p]??Dc(l[p]);return ye(),c}startProfiling(){}endProfiling(){iu(this.sessionId)}}});var du={};ht(du,{OnnxruntimeWebAssemblyBackend:()=>cr,initializeFlags:()=>uu,wasmBackend:()=>Rc});var uu,cr,Rc,lu=A(()=>{"use strict";Se();sn();au();tt();uu=()=>{if((typeof te.wasm.initTimeout!="number"||te.wasm.initTimeout<0)&&(te.wasm.initTimeout=0),te.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof te.wasm.proxy!="boolean"&&(te.wasm.proxy=!1),typeof te.wasm.trace!="boolean"&&(te.wasm.trace=!1),typeof te.wasm.numThreads!="number"||!Number.isInteger(te.wasm.numThreads)||te.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)te.wasm.numThreads=1;else{let e=typeof navigator>"u"?mr("node:os").cpus().length:navigator.hardwareConcurrency;te.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}te.wasm.wasmPaths===void 0&&Te&&Te.indexOf("blob:")!==0&&(te.wasm.wasmPaths=Te.substring(0,Te.lastIndexOf("/")+1))},cr=class{async init(t){uu(),await Ja(),await eu(t)}async createInferenceSessionHandler(t,r){let n=new lr;return await n.loadModel(t,r),Promise.resolve(n)}},Rc=new cr});Se();Se();Se();var Rn="1.21.0-dev.20241026-05fbb43b34";var I$=br;{let e=(lu(),fr(du)).wasmBackend;We("webgpu",e,5),We("webnn",e,5),We("cpu",e,10),We("wasm",e,10)}Object.defineProperty(te.versions,"web",{value:Rn,enumerable:!0});export{bu as InferenceSession,$t as TRACE,_e as TRACE_FUNC_BEGIN,ye as TRACE_FUNC_END,he as Tensor,_u as TrainingSession,I$ as default,te as env,We as registerBackend};
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
