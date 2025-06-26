/*!
 * ONNX Runtime Web v1.21.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
"use strict";var ort=(()=>{var gx=Object.create;var ro=Object.defineProperty;var bx=Object.getOwnPropertyDescriptor;var yx=Object.getOwnPropertyNames;var _x=Object.getPrototypeOf,xx=Object.prototype.hasOwnProperty;var ta=(r=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(r,{get:(e,n)=>(typeof require<"u"?require:e)[n]}):r)(function(r){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+r+'" is not supported')});var $=(r,e)=>()=>(r&&(e=r(r=0)),e);var G=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports),ar=(r,e)=>{for(var n in e)ro(r,n,{get:e[n],enumerable:!0})},bl=(r,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of yx(e))!xx.call(r,o)&&o!==n&&ro(r,o,{get:()=>e[o],enumerable:!(t=bx(e,o))||t.enumerable});return r};var re=(r,e,n)=>(n=r!=null?gx(_x(r)):{},bl(e||!r||!r.__esModule?ro(n,"default",{value:r,enumerable:!0}):n,r)),Sr=r=>bl(ro({},"__esModule",{value:!0}),r);var oo,Bn,_n,Tx,yl,na=$(()=>{"use strict";oo=new Map,Bn=[],_n=(r,e,n)=>{if(e&&typeof e.init=="function"&&typeof e.createInferenceSessionHandler=="function"){let t=oo.get(r);if(t===void 0)oo.set(r,{backend:e,priority:n});else{if(t.priority>n)return;if(t.priority===n&&t.backend!==e)throw new Error(`cannot register backend "${r}" using priority ${n}`)}if(n>=0){let o=Bn.indexOf(r);o!==-1&&Bn.splice(o,1);for(let i=0;i<Bn.length;i++)if(oo.get(Bn[i]).priority<=n){Bn.splice(i,0,r);return}Bn.push(r)}return}throw new TypeError("not a valid backend")},Tx=async r=>{let e=oo.get(r);if(!e)return"backend not found.";if(e.initialized)return e.backend;if(e.aborted)return e.error;{let n=!!e.initPromise;try{return n||(e.initPromise=e.backend.init(r)),await e.initPromise,e.initialized=!0,e.backend}catch(t){return n||(e.error=`${t}`,e.aborted=!0),e.error}finally{delete e.initPromise}}},yl=async r=>{let e=r.executionProviders||[],n=e.map(u=>typeof u=="string"?u:u.name),t=n.length===0?Bn:n,o,i=[],a=new Set;for(let u of t){let l=await Tx(u);typeof l=="string"?i.push({name:u,err:l}):(o||(o=l),o===l&&a.add(u))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:l}of i)n.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${l}`);let s=e.filter(u=>a.has(typeof u=="string"?u:u.name));return[o,new Proxy(r,{get:(u,l)=>l==="executionProviders"?s:Reflect.get(u,l)})]}});var _l=$(()=>{"use strict";na()});var xl,Tl=$(()=>{"use strict";xl="1.21.0"});var vl,it,ra=$(()=>{"use strict";Tl();vl="warning",it={wasm:{},webgl:{},webgpu:{},versions:{common:xl},set logLevel(r){if(r!==void 0){if(typeof r!="string"||["verbose","info","warning","error","fatal"].indexOf(r)===-1)throw new Error(`Unsupported logging level: ${r}`);vl=r}},get logLevel(){return vl}};Object.defineProperty(it,"logLevel",{enumerable:!0})});var J,wl=$(()=>{"use strict";ra();J=it});var Il,Sl,$l=$(()=>{"use strict";Il=(r,e)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=r.dims[3],n.height=r.dims[2];let t=n.getContext("2d");if(t!=null){let o,i;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=r.dims[2],i=r.dims[3]):(o=r.dims[3],i=r.dims[2]);let a=e?.format!==void 0?e.format:"RGB",s=e?.norm,u,l;s===void 0||s.mean===void 0?u=[255,255,255,255]:typeof s.mean=="number"?u=[s.mean,s.mean,s.mean,s.mean]:(u=[s.mean[0],s.mean[1],s.mean[2],0],s.mean[3]!==void 0&&(u[3]=s.mean[3])),s===void 0||s.bias===void 0?l=[0,0,0,0]:typeof s.bias=="number"?l=[s.bias,s.bias,s.bias,s.bias]:(l=[s.bias[0],s.bias[1],s.bias[2],0],s.bias[3]!==void 0&&(l[3]=s.bias[3]));let c=i*o,d=0,p=c,f=c*2,h=-1;a==="RGBA"?(d=0,p=c,f=c*2,h=c*3):a==="RGB"?(d=0,p=c,f=c*2):a==="RBG"&&(d=0,f=c,p=c*2);for(let m=0;m<i;m++)for(let y=0;y<o;y++){let g=(r.data[d++]-l[0])*u[0],b=(r.data[p++]-l[1])*u[1],_=(r.data[f++]-l[2])*u[2],T=h===-1?255:(r.data[h++]-l[3])*u[3];t.fillStyle="rgba("+g+","+b+","+_+","+T+")",t.fillRect(y,m,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Sl=(r,e)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),t;if(n!=null){let o,i,a;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=r.dims[2],i=r.dims[1],a=r.dims[3]):(o=r.dims[3],i=r.dims[2],a=r.dims[1]);let s=e!==void 0&&e.format!==void 0?e.format:"RGB",u=e?.norm,l,c;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?c=[0,0,0,0]:typeof u.bias=="number"?c=[u.bias,u.bias,u.bias,u.bias]:(c=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(c[3]=u.bias[3]));let d=i*o;if(e!==void 0&&(e.format!==void 0&&a===4&&e.format!=="RGBA"||a===3&&e.format!=="RGB"&&e.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let p=4,f=0,h=1,m=2,y=3,g=0,b=d,_=d*2,T=-1;s==="RGBA"?(g=0,b=d,_=d*2,T=d*3):s==="RGB"?(g=0,b=d,_=d*2):s==="RBG"&&(g=0,_=d,b=d*2),t=n.createImageData(o,i);for(let w=0;w<i*o;f+=p,h+=p,m+=p,y+=p,w++)t.data[f]=(r.data[g++]-c[0])*l[0],t.data[h]=(r.data[b++]-c[1])*l[1],t.data[m]=(r.data[_++]-c[2])*l[2],t.data[y]=T===-1?255:(r.data[T++]-c[3])*l[3]}else throw new Error("Can not access image data");return t}});var oa,Al,Pl,Ol,El,Cl,Dl=$(()=>{"use strict";io();oa=(r,e)=>{if(r===void 0)throw new Error("Image buffer must be defined");if(e.height===void 0||e.width===void 0)throw new Error("Image height and width must be defined");if(e.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:t}=e,o=e.norm??{mean:255,bias:0},i,a;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?a=[o.bias,o.bias,o.bias,o.bias]:a=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let s=e.format!==void 0?e.format:"RGBA",u=e.tensorFormat!==void 0&&e.tensorFormat!==void 0?e.tensorFormat:"RGB",l=n*t,c=u==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),d=4,p=0,f=1,h=2,m=3,y=0,g=l,b=l*2,_=-1;s==="RGB"&&(d=3,p=0,f=1,h=2,m=-1),u==="RGBA"?_=l*3:u==="RBG"?(y=0,b=l,g=l*2):u==="BGR"&&(b=0,g=l,y=l*2);for(let w=0;w<l;w++,p+=d,h+=d,f+=d,m+=d)c[y++]=(r[p]+a[0])/i[0],c[g++]=(r[f]+a[1])/i[1],c[b++]=(r[h]+a[2])/i[2],_!==-1&&m!==-1&&(c[_++]=(r[m]+a[3])/i[3]);return u==="RGBA"?new We("float32",c,[1,4,n,t]):new We("float32",c,[1,3,n,t])},Al=async(r,e)=>{let n=typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement,t=typeof ImageData<"u"&&r instanceof ImageData,o=typeof ImageBitmap<"u"&&r instanceof ImageBitmap,i=typeof r=="string",a,s=e??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(n){let c=u();c.width=r.width,c.height=r.height;let d=l(c);if(d!=null){let p=r.height,f=r.width;if(e!==void 0&&e.resizedHeight!==void 0&&e.resizedWidth!==void 0&&(p=e.resizedHeight,f=e.resizedWidth),e!==void 0){if(s=e,e.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");s.tensorFormat="RGBA",s.height=p,s.width=f}else s.tensorFormat="RGBA",s.height=p,s.width=f;d.drawImage(r,0,0),a=d.getImageData(0,0,f,p).data}else throw new Error("Can not access image data")}else if(t){let c,d;if(e!==void 0&&e.resizedWidth!==void 0&&e.resizedHeight!==void 0?(c=e.resizedHeight,d=e.resizedWidth):(c=r.height,d=r.width),e!==void 0&&(s=e),s.format="RGBA",s.height=c,s.width=d,e!==void 0){let p=u();p.width=d,p.height=c;let f=l(p);if(f!=null)f.putImageData(r,0,0),a=f.getImageData(0,0,d,c).data;else throw new Error("Can not access image data")}else a=r.data}else if(o){if(e===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=u();c.width=r.width,c.height=r.height;let d=l(c);if(d!=null){let p=r.height,f=r.width;return d.drawImage(r,0,0,f,p),a=d.getImageData(0,0,f,p).data,s.height=p,s.width=f,oa(a,s)}else throw new Error("Can not access image data")}else{if(i)return new Promise((c,d)=>{let p=u(),f=l(p);if(!r||!f)return d();let h=new Image;h.crossOrigin="Anonymous",h.src=r,h.onload=()=>{p.width=h.width,p.height=h.height,f.drawImage(h,0,0,p.width,p.height);let m=f.getImageData(0,0,p.width,p.height);s.height=p.height,s.width=p.width,c(oa(m.data,s))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return oa(a,s);throw new Error("Input data provided is not supported - aborted tensor creation")},Pl=(r,e)=>{let{width:n,height:t,download:o,dispose:i}=e,a=[1,t,n,4];return new We({location:"texture",type:"float32",texture:r,dims:a,download:o,dispose:i})},Ol=(r,e)=>{let{dataType:n,dims:t,download:o,dispose:i}=e;return new We({location:"gpu-buffer",type:n??"float32",gpuBuffer:r,dims:t,download:o,dispose:i})},El=(r,e)=>{let{dataType:n,dims:t,download:o,dispose:i}=e;return new We({location:"ml-tensor",type:n??"float32",mlTensor:r,dims:t,download:o,dispose:i})},Cl=(r,e,n)=>new We({location:"cpu-pinned",type:r,data:e,dims:n??[e.length]})});var Vn,$r,kl,Ll,zl=$(()=>{"use strict";Vn=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),$r=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),kl=!1,Ll=()=>{if(!kl){kl=!0;let r=typeof BigInt64Array<"u"&&BigInt64Array.from,e=typeof BigUint64Array<"u"&&BigUint64Array.from,n=globalThis.Float16Array,t=typeof n<"u"&&n.from;r&&(Vn.set("int64",BigInt64Array),$r.set(BigInt64Array,"int64")),e&&(Vn.set("uint64",BigUint64Array),$r.set(BigUint64Array,"uint64")),t?(Vn.set("float16",n),$r.set(n,"float16")):Vn.set("float16",Uint16Array)}}});var Rl,Nl,Ml=$(()=>{"use strict";io();Rl=r=>{let e=1;for(let n=0;n<r.length;n++){let t=r[n];if(typeof t!="number"||!Number.isSafeInteger(t))throw new TypeError(`dims[${n}] must be an integer, got: ${t}`);if(t<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${t}`);e*=t}return e},Nl=(r,e)=>{switch(r.location){case"cpu":return new We(r.type,r.data,e);case"cpu-pinned":return new We({location:"cpu-pinned",data:r.data,type:r.type,dims:e});case"texture":return new We({location:"texture",texture:r.texture,type:r.type,dims:e});case"gpu-buffer":return new We({location:"gpu-buffer",gpuBuffer:r.gpuBuffer,type:r.type,dims:e});case"ml-tensor":return new We({location:"ml-tensor",mlTensor:r.mlTensor,type:r.type,dims:e});default:throw new Error(`tensorReshape: tensor location ${r.location} is not supported`)}}});var We,io=$(()=>{"use strict";$l();Dl();zl();Ml();We=class{constructor(e,n,t){Ll();let o,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,o=e.type,i=e.dims,e.location){case"cpu-pinned":{let s=Vn.get(o);if(!s)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(o=e,u=t,e==="string"){if(!Array.isArray(n))throw new TypeError("A string tensor's data must be a string array.");s=n}else{let l=Vn.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(n)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?s=l.from(n,BigInt):s=l.from(n)}else if(n instanceof l)s=n;else if(n instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(n);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&n instanceof Uint16Array&&l!==Uint16Array)s=new globalThis.Float16Array(n.buffer,n.byteOffset,n.length);else throw new TypeError(`A ${o} tensor's data must be type of ${l}`)}else if(u=n,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")o="string",s=e;else if(l==="boolean")o="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)o="uint8",s=Uint8Array.from(e);else{let l=$r.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);o=l,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");i=u,this.cpuData=s,this.dataLocation="cpu"}let a=Rl(i);if(this.cpuData&&a!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=a}static async fromImage(e,n){return Al(e,n)}static fromTexture(e,n){return Pl(e,n)}static fromGpuBuffer(e,n){return Ol(e,n)}static fromMLTensor(e,n){return El(e,n)}static fromPinnedBuffer(e,n,t){return Cl(e,n,t)}toDataURL(e){return Il(this,e)}toImageData(e){return Sl(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let n=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=n,e&&this.disposer&&(this.disposer(),this.disposer=void 0),n}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Nl(this,e)}}});var Je,ia=$(()=>{"use strict";io();Je=We});var Ar,Bl,Qe,Ke,aa=$(()=>{"use strict";ra();Ar=(r,e)=>{(typeof it.trace>"u"?!it.wasm.trace:!it.trace)||console.timeStamp(`${r}::ORT::${e}`)},Bl=(r,e)=>{let n=new Error().stack?.split(/\r\n|\r|\n/g)||[],t=!1;for(let o=0;o<n.length;o++){if(t&&!n[o].includes("TRACE_FUNC")){let i=`FUNC_${r}::${n[o].trim().split(" ")[1]}`;e&&(i+=`::${e}`),Ar("CPU",i);return}n[o].includes("TRACE_FUNC")&&(t=!0)}},Qe=r=>{(typeof it.trace>"u"?!it.wasm.trace:!it.trace)||Bl("BEGIN",r)},Ke=r=>{(typeof it.trace>"u"?!it.wasm.trace:!it.trace)||Bl("END",r)}});var ao,Vl=$(()=>{"use strict";na();ia();aa();ao=class r{constructor(e){this.handler=e}async run(e,n,t){Qe();let o={},i={};if(typeof e!="object"||e===null||e instanceof Je||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof Je)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let l of n){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);o[l]=null}if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,c=Object.getOwnPropertyNames(n);for(let d of this.outputNames)if(c.indexOf(d)!==-1){let p=n[d];(p===null||p instanceof Je)&&(l=!0,a=!1,o[d]=p)}if(l){if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else i=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof e[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(a)for(let l of this.outputNames)o[l]=null;let s=await this.handler.run(e,o,i),u={};for(let l in s)if(Object.hasOwnProperty.call(s,l)){let c=s[l];c instanceof Je?u[l]=c:u[l]=new Je(c.type,c.data,c.dims)}return Ke(),u}async release(){return this.handler.dispose()}static async create(e,n,t,o){Qe();let i,a={};if(typeof e=="string"){if(i=e,typeof n=="object"&&n!==null)a=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof Uint8Array){if(i=e,typeof n=="object"&&n!==null)a=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer){let c=e,d=0,p=e.byteLength;if(typeof n=="object"&&n!==null)a=n;else if(typeof n=="number"){if(d=n,!Number.isSafeInteger(d))throw new RangeError("'byteOffset' must be an integer.");if(d<0||d>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(p=e.byteLength-d,typeof t=="number"){if(p=t,!Number.isSafeInteger(p))throw new RangeError("'byteLength' must be an integer.");if(p<=0||d+p>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-d}].`);if(typeof o=="object"&&o!==null)a=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof t<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(c,d,p)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[s,u]=await yl(a),l=await s.createInferenceSessionHandler(i,u);return Ke(),new r(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var Fl,Gl=$(()=>{"use strict";Vl();Fl=ao});var Ul=$(()=>{"use strict"});var Wl=$(()=>{"use strict"});var Hl=$(()=>{"use strict"});var ql=$(()=>{"use strict"});var sa={};ar(sa,{InferenceSession:()=>Fl,TRACE:()=>Ar,TRACE_FUNC_BEGIN:()=>Qe,TRACE_FUNC_END:()=>Ke,Tensor:()=>Je,env:()=>J,registerBackend:()=>_n});var qe=$(()=>{"use strict";_l();wl();Gl();ia();Ul();Wl();aa();Hl();ql()});function Sn(r,e,n,t){if(e===void 0)return wx(r);if(n===void 0)so(r,e,1);else if(typeof n=="number"&&t===void 0)so(r,e,n);else if(typeof n=="string"&&t===void 0)so(r,n,1,e);else if(typeof n=="string"&&typeof t=="number")so(r,n,t,e);else throw new TypeError("input is valid")}function wx(r){return{verbose:Sn.verbose.bind(null,r),info:Sn.info.bind(null,r),warning:Sn.warning.bind(null,r),error:Sn.error.bind(null,r),fatal:Sn.fatal.bind(null,r)}}function so(r,e,n,t){let o=Pr[t||""]||Pr[""];Kl[r]<Kl[o.minimalSeverity]||(o.logDateTime&&(e=`${new Date().toISOString()}|${e}`),o.logSourceLocation,vx[o.provider].log(r,e,t))}var ua,la,Kl,vx,Xl,Pr,_e,lo,co,po,uo,ut=$(()=>{"use strict";ua=class{log(e,n,t){}},la=class{log(e,n,t){console.log(`${this.color(e)} ${t?"\x1B[35m"+t+"\x1B[0m ":""}${n}`)}color(e){switch(e){case"verbose":return"\x1B[34;40mv\x1B[0m";case"info":return"\x1B[32mi\x1B[0m";case"warning":return"\x1B[30;43mw\x1B[0m";case"error":return"\x1B[31;40me\x1B[0m";case"fatal":return"\x1B[101mf\x1B[0m";default:throw new Error(`unsupported severity: ${e}`)}}},Kl={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},vx={none:new ua,console:new la},Xl={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1},Pr={"":Xl};(u=>{function r(l,c){u("verbose",l,c)}u.verbose=r;function e(l,c){u("info",l,c)}u.info=e;function n(l,c){u("warning",l,c)}u.warning=n;function t(l,c){u("error",l,c)}u.error=t;function o(l,c){u("fatal",l,c)}u.fatal=o;function i(l){Pr={},a("",l||{})}u.reset=i;function a(l,c){if(l==="*")i(c);else{let d=Pr[l]||Xl;Pr[l]={provider:c.provider||d.provider,minimalSeverity:c.minimalSeverity||d.minimalSeverity,logDateTime:c.logDateTime===void 0?d.logDateTime:c.logDateTime,logSourceLocation:c.logSourceLocation===void 0?d.logSourceLocation:c.logSourceLocation}}}u.set=a;function s(l){let c={};l.logLevel&&(c.minimalSeverity=l.logLevel),a("",c)}u.setWithEnv=s})(Sn||={});_e=Sn,lo=class{constructor(e,n,t,o,i,a){this.category=e;this.name=n;this.startTime=t;this.endCallback=o;this.timer=i;this.ctx=a}async end(){return this.endCallback(this)}async checkTimer(){if(this.ctx===void 0||this.timer===void 0)throw new Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},co=class{constructor(e,n,t,o){this.category=e;this.name=n;this.startTime=t;this.endTime=o}},po=class{constructor(e,n,t){this._started=!1;this._flushPointer=0;this._started=!1,this._maxNumberEvents=e===void 0?1e4:e,this._flushBatchSize=n===void 0?10:n,this._flushIntervalInMilliseconds=t===void 0?5e3:t}static create(e){return e===void 0?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=uo(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,n,t,o){let i=this._started?this.begin(e,n,o):void 0,a=!1,s=t();if(s&&typeof s.then=="function")return a=!0,new Promise((u,l)=>{s.then(async c=>{i&&await i.end(),u(c)},async c=>{i&&await i.end(),l(c)})});if(!a&&i){let u=i.end();if(u&&typeof u.then=="function")return new Promise((l,c)=>{u.then(()=>{l(s)},d=>{c(d)})})}return s}begin(e,n,t){if(!this._started)throw new Error("profiler is not started yet");if(t===void 0){let o=uo();return this.flush(o),new lo(e,n,o,i=>this.endSync(i))}else{let o=t.beginTimer();return new lo(e,n,0,async i=>this.end(i),o,t)}}async end(e){let n=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new co(e.category,e.name,e.startTime,n)),this.flush(n))}endSync(e){let n=uo();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new co(e.category,e.name,e.startTime,n)),this.flush(n))}logOneEvent(e){_e.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let n=this._flushPointer;this._flushPointer<n+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=uo()}}get started(){return this._started}},uo=typeof performance<"u"&&performance.now?()=>performance.now():Date.now});function Zl(r,e,n){for(let t of n){let o=t[0],i=t[1],a=t[2],s=t[3],u=t[4];if(r.opType===o){for(let l of e)if((l.domain===i||l.domain==="ai.onnx"&&i==="")&&Ix(l.version,a))return{opImpl:s,opInit:u}}}throw new TypeError(`cannot resolve operator '${r.opType}' with opsets: ${e.map(t=>`${t.domain||"ai.onnx"} v${t.version}`).join(", ")}`)}function Ix(r,e){if(e.endsWith("+")){let n=Number.parseInt(e.substring(0,e.length-1),10);return!isNaN(n)&&n<=r}else if(e.split("-").length===2){let n=e.split("-"),t=Number.parseInt(n[0],10),o=Number.parseInt(n[1],10);return!isNaN(t)&&!isNaN(o)&&t<=r&&r<=o}else return Number.parseInt(e,10)===r}var Jl=$(()=>{"use strict"});var Ql=G(ca=>{"use strict";ca.__esModule=!0;var Sx=function(){function r(e){if(!e)throw new TypeError("Invalid argument; `value` has no value.");this.value=r.EMPTY,e&&r.isGuid(e)&&(this.value=e)}return r.isGuid=function(e){var n=e.toString();return e&&(e instanceof r||r.validator.test(n))},r.create=function(){return new r([r.gen(2),r.gen(1),r.gen(1),r.gen(1),r.gen(3)].join("-"))},r.createEmpty=function(){return new r("emptyguid")},r.parse=function(e){return new r(e)},r.raw=function(){return[r.gen(2),r.gen(1),r.gen(1),r.gen(1),r.gen(3)].join("-")},r.gen=function(e){for(var n="",t=0;t<e;t++)n+=((1+Math.random())*65536|0).toString(16).substring(1);return n},r.prototype.equals=function(e){return r.isGuid(e)&&this.value===e.toString()},r.prototype.isEmpty=function(){return this.value===r.EMPTY},r.prototype.toString=function(){return this.value},r.prototype.toJSON=function(){return{value:this.value}},r.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),r.EMPTY="00000000-0000-0000-0000-000000000000",r}();ca.Guid=Sx});function we(r,e,n){this.low=r|0,this.high=e|0,this.unsigned=!!n}function je(r){return(r&&r.__isLong__)===!0}function Yl(r){var e=Math.clz32(r&-r);return r?31-e:e}function Fn(r,e){var n,t,o;return e?(r>>>=0,(o=0<=r&&r<256)&&(t=tc[r],t)?t:(n=ge(r,0,!0),o&&(tc[r]=n),n)):(r|=0,(o=-128<=r&&r<128)&&(t=ec[r],t)?t:(n=ge(r,r<0?-1:0,!1),o&&(ec[r]=n),n))}function ct(r,e){if(isNaN(r))return e?xn:yt;if(e){if(r<0)return xn;if(r>=ic)return uc}else{if(r<=-rc)return Ye;if(r+1>=rc)return sc}return r<0?ct(-r,e).neg():ge(r%ur|0,r/ur|0,e)}function ge(r,e,n){return new we(r,e,n)}function pa(r,e,n){if(r.length===0)throw Error("empty string");if(typeof e=="number"?(n=e,e=!1):e=!!e,r==="NaN"||r==="Infinity"||r==="+Infinity"||r==="-Infinity")return e?xn:yt;if(n=n||10,n<2||36<n)throw RangeError("radix");var t;if((t=r.indexOf("-"))>0)throw Error("interior hyphen");if(t===0)return pa(r.substring(1),e,n).neg();for(var o=ct(fo(n,8)),i=yt,a=0;a<r.length;a+=8){var s=Math.min(8,r.length-a),u=parseInt(r.substring(a,a+s),n);if(s<8){var l=ct(fo(n,s));i=i.mul(l).add(ct(u))}else i=i.mul(o),i=i.add(ct(u))}return i.unsigned=e,i}function _t(r,e){return typeof r=="number"?ct(r,e):typeof r=="string"?pa(r,e):ge(r.low,r.high,typeof e=="boolean"?e:r.unsigned)}var lt,ec,tc,fo,nc,$x,ur,ic,rc,oc,yt,xn,sr,ac,da,sc,uc,Ye,k,$n,fa=$(()=>{lt=null;try{lt=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}we.prototype.__isLong__;Object.defineProperty(we.prototype,"__isLong__",{value:!0});we.isLong=je;ec={},tc={};we.fromInt=Fn;we.fromNumber=ct;we.fromBits=ge;fo=Math.pow;we.fromString=pa;we.fromValue=_t;nc=65536,$x=1<<24,ur=nc*nc,ic=ur*ur,rc=ic/2,oc=Fn($x),yt=Fn(0);we.ZERO=yt;xn=Fn(0,!0);we.UZERO=xn;sr=Fn(1);we.ONE=sr;ac=Fn(1,!0);we.UONE=ac;da=Fn(-1);we.NEG_ONE=da;sc=ge(-1,2147483647,!1);we.MAX_VALUE=sc;uc=ge(-1,-1,!0);we.MAX_UNSIGNED_VALUE=uc;Ye=ge(0,-2147483648,!1);we.MIN_VALUE=Ye;k=we.prototype;k.toInt=function(){return this.unsigned?this.low>>>0:this.low};k.toNumber=function(){return this.unsigned?(this.high>>>0)*ur+(this.low>>>0):this.high*ur+(this.low>>>0)};k.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(Ye)){var n=ct(e),t=this.div(n),o=t.mul(n).sub(this);return t.toString(e)+o.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var i=ct(fo(e,6),this.unsigned),a=this,s="";;){var u=a.div(i),l=a.sub(u.mul(i)).toInt()>>>0,c=l.toString(e);if(a=u,a.isZero())return c+s;for(;c.length<6;)c="0"+c;s=""+c+s}};k.getHighBits=function(){return this.high};k.getHighBitsUnsigned=function(){return this.high>>>0};k.getLowBits=function(){return this.low};k.getLowBitsUnsigned=function(){return this.low>>>0};k.getNumBitsAbs=function(){if(this.isNegative())return this.eq(Ye)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,n=31;n>0&&(e&1<<n)==0;n--);return this.high!=0?n+33:n+1};k.isZero=function(){return this.high===0&&this.low===0};k.eqz=k.isZero;k.isNegative=function(){return!this.unsigned&&this.high<0};k.isPositive=function(){return this.unsigned||this.high>=0};k.isOdd=function(){return(this.low&1)===1};k.isEven=function(){return(this.low&1)===0};k.equals=function(e){return je(e)||(e=_t(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low};k.eq=k.equals;k.notEquals=function(e){return!this.eq(e)};k.neq=k.notEquals;k.ne=k.notEquals;k.lessThan=function(e){return this.comp(e)<0};k.lt=k.lessThan;k.lessThanOrEqual=function(e){return this.comp(e)<=0};k.lte=k.lessThanOrEqual;k.le=k.lessThanOrEqual;k.greaterThan=function(e){return this.comp(e)>0};k.gt=k.greaterThan;k.greaterThanOrEqual=function(e){return this.comp(e)>=0};k.gte=k.greaterThanOrEqual;k.ge=k.greaterThanOrEqual;k.compare=function(e){if(je(e)||(e=_t(e)),this.eq(e))return 0;var n=this.isNegative(),t=e.isNegative();return n&&!t?-1:!n&&t?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1};k.comp=k.compare;k.negate=function(){return!this.unsigned&&this.eq(Ye)?Ye:this.not().add(sr)};k.neg=k.negate;k.add=function(e){je(e)||(e=_t(e));var n=this.high>>>16,t=this.high&65535,o=this.low>>>16,i=this.low&65535,a=e.high>>>16,s=e.high&65535,u=e.low>>>16,l=e.low&65535,c=0,d=0,p=0,f=0;return f+=i+l,p+=f>>>16,f&=65535,p+=o+u,d+=p>>>16,p&=65535,d+=t+s,c+=d>>>16,d&=65535,c+=n+a,c&=65535,ge(p<<16|f,c<<16|d,this.unsigned)};k.subtract=function(e){return je(e)||(e=_t(e)),this.add(e.neg())};k.sub=k.subtract;k.multiply=function(e){if(this.isZero())return this;if(je(e)||(e=_t(e)),lt){var n=lt.mul(this.low,this.high,e.low,e.high);return ge(n,lt.get_high(),this.unsigned)}if(e.isZero())return this.unsigned?xn:yt;if(this.eq(Ye))return e.isOdd()?Ye:yt;if(e.eq(Ye))return this.isOdd()?Ye:yt;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(oc)&&e.lt(oc))return ct(this.toNumber()*e.toNumber(),this.unsigned);var t=this.high>>>16,o=this.high&65535,i=this.low>>>16,a=this.low&65535,s=e.high>>>16,u=e.high&65535,l=e.low>>>16,c=e.low&65535,d=0,p=0,f=0,h=0;return h+=a*c,f+=h>>>16,h&=65535,f+=i*c,p+=f>>>16,f&=65535,f+=a*l,p+=f>>>16,f&=65535,p+=o*c,d+=p>>>16,p&=65535,p+=i*l,d+=p>>>16,p&=65535,p+=a*u,d+=p>>>16,p&=65535,d+=t*c+o*l+i*u+a*s,d&=65535,ge(f<<16|h,d<<16|p,this.unsigned)};k.mul=k.multiply;k.divide=function(e){if(je(e)||(e=_t(e)),e.isZero())throw Error("division by zero");if(lt){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var n=(this.unsigned?lt.div_u:lt.div_s)(this.low,this.high,e.low,e.high);return ge(n,lt.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?xn:yt;var t,o,i;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return xn;if(e.gt(this.shru(1)))return ac;i=xn}else{if(this.eq(Ye)){if(e.eq(sr)||e.eq(da))return Ye;if(e.eq(Ye))return sr;var a=this.shr(1);return t=a.div(e).shl(1),t.eq(yt)?e.isNegative()?sr:da:(o=this.sub(e.mul(t)),i=t.add(o.div(e)),i)}else if(e.eq(Ye))return this.unsigned?xn:yt;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();i=yt}for(o=this;o.gte(e);){t=Math.max(1,Math.floor(o.toNumber()/e.toNumber()));for(var s=Math.ceil(Math.log(t)/Math.LN2),u=s<=48?1:fo(2,s-48),l=ct(t),c=l.mul(e);c.isNegative()||c.gt(o);)t-=u,l=ct(t,this.unsigned),c=l.mul(e);l.isZero()&&(l=sr),i=i.add(l),o=o.sub(c)}return i};k.div=k.divide;k.modulo=function(e){if(je(e)||(e=_t(e)),lt){var n=(this.unsigned?lt.rem_u:lt.rem_s)(this.low,this.high,e.low,e.high);return ge(n,lt.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))};k.mod=k.modulo;k.rem=k.modulo;k.not=function(){return ge(~this.low,~this.high,this.unsigned)};k.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32};k.clz=k.countLeadingZeros;k.countTrailingZeros=function(){return this.low?Yl(this.low):Yl(this.high)+32};k.ctz=k.countTrailingZeros;k.and=function(e){return je(e)||(e=_t(e)),ge(this.low&e.low,this.high&e.high,this.unsigned)};k.or=function(e){return je(e)||(e=_t(e)),ge(this.low|e.low,this.high|e.high,this.unsigned)};k.xor=function(e){return je(e)||(e=_t(e)),ge(this.low^e.low,this.high^e.high,this.unsigned)};k.shiftLeft=function(e){return je(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?ge(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):ge(0,this.low<<e-32,this.unsigned)};k.shl=k.shiftLeft;k.shiftRight=function(e){return je(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?ge(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):ge(this.high>>e-32,this.high>=0?0:-1,this.unsigned)};k.shr=k.shiftRight;k.shiftRightUnsigned=function(e){return je(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?ge(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):e===32?ge(this.high,0,this.unsigned):ge(this.high>>>e-32,0,this.unsigned)};k.shru=k.shiftRightUnsigned;k.shr_u=k.shiftRightUnsigned;k.rotateLeft=function(e){var n;return je(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?ge(this.high,this.low,this.unsigned):e<32?(n=32-e,ge(this.low<<e|this.high>>>n,this.high<<e|this.low>>>n,this.unsigned)):(e-=32,n=32-e,ge(this.high<<e|this.low>>>n,this.low<<e|this.high>>>n,this.unsigned))};k.rotl=k.rotateLeft;k.rotateRight=function(e){var n;return je(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?ge(this.high,this.low,this.unsigned):e<32?(n=32-e,ge(this.high<<n|this.low>>>e,this.low<<n|this.high>>>e,this.unsigned)):(e-=32,n=32-e,ge(this.low<<n|this.high>>>e,this.high<<n|this.low>>>e,this.unsigned))};k.rotr=k.rotateRight;k.toSigned=function(){return this.unsigned?ge(this.low,this.high,!1):this};k.toUnsigned=function(){return this.unsigned?this:ge(this.low,this.high,!0)};k.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()};k.toBytesLE=function(){var e=this.high,n=this.low;return[n&255,n>>>8&255,n>>>16&255,n>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]};k.toBytesBE=function(){var e=this.high,n=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,n>>>24,n>>>16&255,n>>>8&255,n&255]};we.fromBytes=function(e,n,t){return t?we.fromBytesLE(e,n):we.fromBytesBE(e,n)};we.fromBytesLE=function(e,n){return new we(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,n)};we.fromBytesBE=function(e,n){return new we(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],n)};$n=we});var ha=G(ho=>{"use strict";Object.defineProperty(ho,"__esModule",{value:!0});ho.ArgType=void 0;var lc;(function(r){r[r.INPUT=0]="INPUT",r[r.OUTPUT=1]="OUTPUT"})(lc||(ho.ArgType=lc={}))});var Gn=G(Pt=>{"use strict";Object.defineProperty(Pt,"__esModule",{value:!0});Pt.SIZE_PREFIX_LENGTH=Pt.FILE_IDENTIFIER_LENGTH=Pt.SIZEOF_INT=Pt.SIZEOF_SHORT=void 0;Pt.SIZEOF_SHORT=2;Pt.SIZEOF_INT=4;Pt.FILE_IDENTIFIER_LENGTH=4;Pt.SIZE_PREFIX_LENGTH=4});var ma=G(dt=>{"use strict";Object.defineProperty(dt,"__esModule",{value:!0});dt.isLittleEndian=dt.float64=dt.float32=dt.int32=void 0;dt.int32=new Int32Array(2);dt.float32=new Float32Array(dt.int32.buffer);dt.float64=new Float64Array(dt.int32.buffer);dt.isLittleEndian=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1});var ga=G(mo=>{"use strict";Object.defineProperty(mo,"__esModule",{value:!0});mo.Encoding=void 0;var cc;(function(r){r[r.UTF8_BYTES=1]="UTF8_BYTES",r[r.UTF16_STRING=2]="UTF16_STRING"})(cc||(mo.Encoding=cc={}))});var ya=G(go=>{"use strict";Object.defineProperty(go,"__esModule",{value:!0});go.ByteBuffer=void 0;var Ot=Gn(),et=ma(),Ax=ga(),ba=class r{constructor(e){this.bytes_=e,this.position_=0,this.text_decoder_=new TextDecoder}static allocate(e){return new r(new Uint8Array(e))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(e){this.position_=e}capacity(){return this.bytes_.length}readInt8(e){return this.readUint8(e)<<24>>24}readUint8(e){return this.bytes_[e]}readInt16(e){return this.readUint16(e)<<16>>16}readUint16(e){return this.bytes_[e]|this.bytes_[e+1]<<8}readInt32(e){return this.bytes_[e]|this.bytes_[e+1]<<8|this.bytes_[e+2]<<16|this.bytes_[e+3]<<24}readUint32(e){return this.readInt32(e)>>>0}readInt64(e){return BigInt.asIntN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readUint64(e){return BigInt.asUintN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readFloat32(e){return et.int32[0]=this.readInt32(e),et.float32[0]}readFloat64(e){return et.int32[et.isLittleEndian?0:1]=this.readInt32(e),et.int32[et.isLittleEndian?1:0]=this.readInt32(e+4),et.float64[0]}writeInt8(e,n){this.bytes_[e]=n}writeUint8(e,n){this.bytes_[e]=n}writeInt16(e,n){this.bytes_[e]=n,this.bytes_[e+1]=n>>8}writeUint16(e,n){this.bytes_[e]=n,this.bytes_[e+1]=n>>8}writeInt32(e,n){this.bytes_[e]=n,this.bytes_[e+1]=n>>8,this.bytes_[e+2]=n>>16,this.bytes_[e+3]=n>>24}writeUint32(e,n){this.bytes_[e]=n,this.bytes_[e+1]=n>>8,this.bytes_[e+2]=n>>16,this.bytes_[e+3]=n>>24}writeInt64(e,n){this.writeInt32(e,Number(BigInt.asIntN(32,n))),this.writeInt32(e+4,Number(BigInt.asIntN(32,n>>BigInt(32))))}writeUint64(e,n){this.writeUint32(e,Number(BigInt.asUintN(32,n))),this.writeUint32(e+4,Number(BigInt.asUintN(32,n>>BigInt(32))))}writeFloat32(e,n){et.float32[0]=n,this.writeInt32(e,et.int32[0])}writeFloat64(e,n){et.float64[0]=n,this.writeInt32(e,et.int32[et.isLittleEndian?0:1]),this.writeInt32(e+4,et.int32[et.isLittleEndian?1:0])}getBufferIdentifier(){if(this.bytes_.length<this.position_+Ot.SIZEOF_INT+Ot.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let e="";for(let n=0;n<Ot.FILE_IDENTIFIER_LENGTH;n++)e+=String.fromCharCode(this.readInt8(this.position_+Ot.SIZEOF_INT+n));return e}__offset(e,n){let t=e-this.readInt32(e);return n<this.readInt16(t)?this.readInt16(t+n):0}__union(e,n){return e.bb_pos=n+this.readInt32(n),e.bb=this,e}__string(e,n){e+=this.readInt32(e);let t=this.readInt32(e);e+=Ot.SIZEOF_INT;let o=this.bytes_.subarray(e,e+t);return n===Ax.Encoding.UTF8_BYTES?o:this.text_decoder_.decode(o)}__union_with_string(e,n){return typeof e=="string"?this.__string(n):this.__union(e,n)}__indirect(e){return e+this.readInt32(e)}__vector(e){return e+this.readInt32(e)+Ot.SIZEOF_INT}__vector_len(e){return this.readInt32(e+this.readInt32(e))}__has_identifier(e){if(e.length!=Ot.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+Ot.FILE_IDENTIFIER_LENGTH);for(let n=0;n<Ot.FILE_IDENTIFIER_LENGTH;n++)if(e.charCodeAt(n)!=this.readInt8(this.position()+Ot.SIZEOF_INT+n))return!1;return!0}createScalarList(e,n){let t=[];for(let o=0;o<n;++o){let i=e(o);i!==null&&t.push(i)}return t}createObjList(e,n){let t=[];for(let o=0;o<n;++o){let i=e(o);i!==null&&t.push(i.unpack())}return t}};go.ByteBuffer=ba});var pc=G(bo=>{"use strict";Object.defineProperty(bo,"__esModule",{value:!0});bo.Builder=void 0;var dc=ya(),at=Gn(),_a=class r{constructor(e){this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null,this.text_encoder=new TextEncoder;let n;e?n=e:n=1024,this.bb=dc.ByteBuffer.allocate(n),this.space=n}clear(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null}forceDefaults(e){this.force_defaults=e}dataBuffer(){return this.bb}asUint8Array(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())}prep(e,n){e>this.minalign&&(this.minalign=e);let t=~(this.bb.capacity()-this.space+n)+1&e-1;for(;this.space<t+e+n;){let o=this.bb.capacity();this.bb=r.growByteBuffer(this.bb),this.space+=this.bb.capacity()-o}this.pad(t)}pad(e){for(let n=0;n<e;n++)this.bb.writeInt8(--this.space,0)}writeInt8(e){this.bb.writeInt8(this.space-=1,e)}writeInt16(e){this.bb.writeInt16(this.space-=2,e)}writeInt32(e){this.bb.writeInt32(this.space-=4,e)}writeInt64(e){this.bb.writeInt64(this.space-=8,e)}writeFloat32(e){this.bb.writeFloat32(this.space-=4,e)}writeFloat64(e){this.bb.writeFloat64(this.space-=8,e)}addInt8(e){this.prep(1,0),this.writeInt8(e)}addInt16(e){this.prep(2,0),this.writeInt16(e)}addInt32(e){this.prep(4,0),this.writeInt32(e)}addInt64(e){this.prep(8,0),this.writeInt64(e)}addFloat32(e){this.prep(4,0),this.writeFloat32(e)}addFloat64(e){this.prep(8,0),this.writeFloat64(e)}addFieldInt8(e,n,t){(this.force_defaults||n!=t)&&(this.addInt8(n),this.slot(e))}addFieldInt16(e,n,t){(this.force_defaults||n!=t)&&(this.addInt16(n),this.slot(e))}addFieldInt32(e,n,t){(this.force_defaults||n!=t)&&(this.addInt32(n),this.slot(e))}addFieldInt64(e,n,t){(this.force_defaults||n!==t)&&(this.addInt64(n),this.slot(e))}addFieldFloat32(e,n,t){(this.force_defaults||n!=t)&&(this.addFloat32(n),this.slot(e))}addFieldFloat64(e,n,t){(this.force_defaults||n!=t)&&(this.addFloat64(n),this.slot(e))}addFieldOffset(e,n,t){(this.force_defaults||n!=t)&&(this.addOffset(n),this.slot(e))}addFieldStruct(e,n,t){n!=t&&(this.nested(n),this.slot(e))}nested(e){if(e!=this.offset())throw new TypeError("FlatBuffers: struct must be serialized inline.")}notNested(){if(this.isNested)throw new TypeError("FlatBuffers: object serialization must not be nested.")}slot(e){this.vtable!==null&&(this.vtable[e]=this.offset())}offset(){return this.bb.capacity()-this.space}static growByteBuffer(e){let n=e.capacity();if(n&3221225472)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");let t=n<<1,o=dc.ByteBuffer.allocate(t);return o.setPosition(t-n),o.bytes().set(e.bytes(),t-n),o}addOffset(e){this.prep(at.SIZEOF_INT,0),this.writeInt32(this.offset()-e+at.SIZEOF_INT)}startObject(e){this.notNested(),this.vtable==null&&(this.vtable=[]),this.vtable_in_use=e;for(let n=0;n<e;n++)this.vtable[n]=0;this.isNested=!0,this.object_start=this.offset()}endObject(){if(this.vtable==null||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);let e=this.offset(),n=this.vtable_in_use-1;for(;n>=0&&this.vtable[n]==0;n--);let t=n+1;for(;n>=0;n--)this.addInt16(this.vtable[n]!=0?e-this.vtable[n]:0);let o=2;this.addInt16(e-this.object_start);let i=(t+o)*at.SIZEOF_SHORT;this.addInt16(i);let a=0,s=this.space;e:for(n=0;n<this.vtables.length;n++){let u=this.bb.capacity()-this.vtables[n];if(i==this.bb.readInt16(u)){for(let l=at.SIZEOF_SHORT;l<i;l+=at.SIZEOF_SHORT)if(this.bb.readInt16(s+l)!=this.bb.readInt16(u+l))continue e;a=this.vtables[n];break}}return a?(this.space=this.bb.capacity()-e,this.bb.writeInt32(this.space,a-e)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-e,this.offset()-e)),this.isNested=!1,e}finish(e,n,t){let o=t?at.SIZE_PREFIX_LENGTH:0;if(n){let i=n;if(this.prep(this.minalign,at.SIZEOF_INT+at.FILE_IDENTIFIER_LENGTH+o),i.length!=at.FILE_IDENTIFIER_LENGTH)throw new TypeError("FlatBuffers: file identifier must be length "+at.FILE_IDENTIFIER_LENGTH);for(let a=at.FILE_IDENTIFIER_LENGTH-1;a>=0;a--)this.writeInt8(i.charCodeAt(a))}this.prep(this.minalign,at.SIZEOF_INT+o),this.addOffset(e),o&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)}finishSizePrefixed(e,n){this.finish(e,n,!0)}requiredField(e,n){let t=this.bb.capacity()-e,o=t-this.bb.readInt32(t);if(!(n<this.bb.readInt16(o)&&this.bb.readInt16(o+n)!=0))throw new TypeError("FlatBuffers: field "+n+" must be set")}startVector(e,n,t){this.notNested(),this.vector_num_elems=n,this.prep(at.SIZEOF_INT,e*n),this.prep(t,e*n)}endVector(){return this.writeInt32(this.vector_num_elems),this.offset()}createSharedString(e){if(!e)return 0;if(this.string_maps||(this.string_maps=new Map),this.string_maps.has(e))return this.string_maps.get(e);let n=this.createString(e);return this.string_maps.set(e,n),n}createString(e){if(e==null)return 0;let n;return e instanceof Uint8Array?n=e:n=this.text_encoder.encode(e),this.addInt8(0),this.startVector(1,n.length,1),this.bb.setPosition(this.space-=n.length),this.bb.bytes().set(n,this.space),this.endVector()}createByteVector(e){return e==null?0:(this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length),this.bb.bytes().set(e,this.space),this.endVector())}createObjectOffset(e){return e===null?0:typeof e=="string"?this.createString(e):e.pack(this)}createObjectOffsetList(e){let n=[];for(let t=0;t<e.length;++t){let o=e[t];if(o!==null)n.push(this.createObjectOffset(o));else throw new TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.")}return n}createStructOffsetList(e,n){return n(this,e.length),this.createObjectOffsetList(e.slice().reverse()),this.endVector()}};bo.Builder=_a});var be=G(Ae=>{"use strict";Object.defineProperty(Ae,"__esModule",{value:!0});Ae.ByteBuffer=Ae.Builder=Ae.Encoding=Ae.isLittleEndian=Ae.float64=Ae.float32=Ae.int32=Ae.SIZE_PREFIX_LENGTH=Ae.FILE_IDENTIFIER_LENGTH=Ae.SIZEOF_INT=Ae.SIZEOF_SHORT=void 0;var Px=Gn();Object.defineProperty(Ae,"SIZEOF_SHORT",{enumerable:!0,get:function(){return Px.SIZEOF_SHORT}});var Ox=Gn();Object.defineProperty(Ae,"SIZEOF_INT",{enumerable:!0,get:function(){return Ox.SIZEOF_INT}});var Ex=Gn();Object.defineProperty(Ae,"FILE_IDENTIFIER_LENGTH",{enumerable:!0,get:function(){return Ex.FILE_IDENTIFIER_LENGTH}});var Cx=Gn();Object.defineProperty(Ae,"SIZE_PREFIX_LENGTH",{enumerable:!0,get:function(){return Cx.SIZE_PREFIX_LENGTH}});var yo=ma();Object.defineProperty(Ae,"int32",{enumerable:!0,get:function(){return yo.int32}});Object.defineProperty(Ae,"float32",{enumerable:!0,get:function(){return yo.float32}});Object.defineProperty(Ae,"float64",{enumerable:!0,get:function(){return yo.float64}});Object.defineProperty(Ae,"isLittleEndian",{enumerable:!0,get:function(){return yo.isLittleEndian}});var Dx=ga();Object.defineProperty(Ae,"Encoding",{enumerable:!0,get:function(){return Dx.Encoding}});var kx=pc();Object.defineProperty(Ae,"Builder",{enumerable:!0,get:function(){return kx.Builder}});var Lx=ya();Object.defineProperty(Ae,"ByteBuffer",{enumerable:!0,get:function(){return Lx.ByteBuffer}})});var Ta=G(Et=>{"use strict";var zx=Et&&Et.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),Rx=Et&&Et.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),Nx=Et&&Et.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&zx(e,r,n);return Rx(e,r),e};Object.defineProperty(Et,"__esModule",{value:!0});Et.ArgTypeAndIndex=void 0;var Mx=Nx(be()),fc=ha(),xa=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsArgTypeAndIndex(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsArgTypeAndIndex(e,n){return e.setPosition(e.position()+Mx.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}argType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):fc.ArgType.INPUT}index(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}static startArgTypeAndIndex(e){e.startObject(2)}static addArgType(e,n){e.addFieldInt8(0,n,fc.ArgType.INPUT)}static addIndex(e,n){e.addFieldInt32(1,n,0)}static endArgTypeAndIndex(e){return e.endObject()}static createArgTypeAndIndex(e,n,t){return r.startArgTypeAndIndex(e),r.addArgType(e,n),r.addIndex(e,t),r.endArgTypeAndIndex(e)}};Et.ArgTypeAndIndex=xa});var va=G(_o=>{"use strict";Object.defineProperty(_o,"__esModule",{value:!0});_o.AttributeType=void 0;var hc;(function(r){r[r.UNDEFINED=0]="UNDEFINED",r[r.FLOAT=1]="FLOAT",r[r.INT=2]="INT",r[r.STRING=3]="STRING",r[r.TENSOR=4]="TENSOR",r[r.GRAPH=5]="GRAPH",r[r.FLOATS=6]="FLOATS",r[r.INTS=7]="INTS",r[r.STRINGS=8]="STRINGS",r[r.TENSORS=9]="TENSORS",r[r.GRAPHS=10]="GRAPHS",r[r.SPARSE_TENSOR=11]="SPARSE_TENSOR",r[r.SPARSE_TENSORS=12]="SPARSE_TENSORS"})(hc||(_o.AttributeType=hc={}))});var wa=G(xo=>{"use strict";Object.defineProperty(xo,"__esModule",{value:!0});xo.NodeType=void 0;var mc;(function(r){r[r.Primitive=0]="Primitive",r[r.Fused=1]="Fused"})(mc||(xo.NodeType=mc={}))});var Sa=G(Ct=>{"use strict";var Bx=Ct&&Ct.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),Vx=Ct&&Ct.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),Fx=Ct&&Ct.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&Bx(e,r,n);return Vx(e,r),e};Object.defineProperty(Ct,"__esModule",{value:!0});Ct.Node=void 0;var Gx=Fx(be()),Ux=$a(),gc=wa(),Ia=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsNode(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNode(e,n){return e.setPosition(e.position()+Gx.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}name(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}docString(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}domain(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.__string(this.bb_pos+n,e):null}sinceVersion(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):0}index(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readUint32(this.bb_pos+e):0}opType(e){let n=this.bb.__offset(this.bb_pos,14);return n?this.bb.__string(this.bb_pos+n,e):null}type(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt32(this.bb_pos+e):gc.NodeType.Primitive}executionProviderType(e){let n=this.bb.__offset(this.bb_pos,18);return n?this.bb.__string(this.bb_pos+n,e):null}inputs(e,n){let t=this.bb.__offset(this.bb_pos,20);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,n){let t=this.bb.__offset(this.bb_pos,22);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}attributes(e,n){let t=this.bb.__offset(this.bb_pos,24);return t?(n||new Ux.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}attributesLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCounts(e){let n=this.bb.__offset(this.bb_pos,26);return n?this.bb.readInt32(this.bb.__vector(this.bb_pos+n)+e*4):0}inputArgCountsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCountsArray(){let e=this.bb.__offset(this.bb_pos,26);return e?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}implicitInputs(e,n){let t=this.bb.__offset(this.bb_pos,28);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}implicitInputsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNode(e){e.startObject(13)}static addName(e,n){e.addFieldOffset(0,n,0)}static addDocString(e,n){e.addFieldOffset(1,n,0)}static addDomain(e,n){e.addFieldOffset(2,n,0)}static addSinceVersion(e,n){e.addFieldInt32(3,n,0)}static addIndex(e,n){e.addFieldInt32(4,n,0)}static addOpType(e,n){e.addFieldOffset(5,n,0)}static addType(e,n){e.addFieldInt32(6,n,gc.NodeType.Primitive)}static addExecutionProviderType(e,n){e.addFieldOffset(7,n,0)}static addInputs(e,n){e.addFieldOffset(8,n,0)}static createInputsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startInputsVector(e,n){e.startVector(4,n,4)}static addOutputs(e,n){e.addFieldOffset(9,n,0)}static createOutputsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startOutputsVector(e,n){e.startVector(4,n,4)}static addAttributes(e,n){e.addFieldOffset(10,n,0)}static createAttributesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startAttributesVector(e,n){e.startVector(4,n,4)}static addInputArgCounts(e,n){e.addFieldOffset(11,n,0)}static createInputArgCountsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addInt32(n[t]);return e.endVector()}static startInputArgCountsVector(e,n){e.startVector(4,n,4)}static addImplicitInputs(e,n){e.addFieldOffset(12,n,0)}static createImplicitInputsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startImplicitInputsVector(e,n){e.startVector(4,n,4)}static endNode(e){return e.endObject()}static createNode(e,n,t,o,i,a,s,u,l,c,d,p,f,h){return r.startNode(e),r.addName(e,n),r.addDocString(e,t),r.addDomain(e,o),r.addSinceVersion(e,i),r.addIndex(e,a),r.addOpType(e,s),r.addType(e,u),r.addExecutionProviderType(e,l),r.addInputs(e,c),r.addOutputs(e,d),r.addAttributes(e,p),r.addInputArgCounts(e,f),r.addImplicitInputs(e,h),r.endNode(e)}};Ct.Node=Ia});var Pa=G(To=>{"use strict";Object.defineProperty(To,"__esModule",{value:!0});To.EdgeEnd=void 0;var Aa=class{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static sizeOf(){return 12}static createEdgeEnd(e,n,t,o){return e.prep(4,12),e.writeInt32(o),e.writeInt32(t),e.writeInt32(n),e.offset()}};To.EdgeEnd=Aa});var Ea=G(Dt=>{"use strict";var Wx=Dt&&Dt.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),Hx=Dt&&Dt.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),qx=Dt&&Dt.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&Wx(e,r,n);return Hx(e,r),e};Object.defineProperty(Dt,"__esModule",{value:!0});Dt.NodeEdge=void 0;var jx=qx(be()),bc=Pa(),Oa=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsNodeEdge(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodeEdge(e,n){return e.setPosition(e.position()+jx.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}inputEdges(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new bc.EdgeEnd).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}inputEdgesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}outputEdges(e,n){let t=this.bb.__offset(this.bb_pos,8);return t?(n||new bc.EdgeEnd).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}outputEdgesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNodeEdge(e){e.startObject(3)}static addNodeIndex(e,n){e.addFieldInt32(0,n,0)}static addInputEdges(e,n){e.addFieldOffset(1,n,0)}static startInputEdgesVector(e,n){e.startVector(12,n,4)}static addOutputEdges(e,n){e.addFieldOffset(2,n,0)}static startOutputEdgesVector(e,n){e.startVector(12,n,4)}static endNodeEdge(e){return e.endObject()}static createNodeEdge(e,n,t,o){return r.startNodeEdge(e),r.addNodeIndex(e,n),r.addInputEdges(e,t),r.addOutputEdges(e,o),r.endNodeEdge(e)}};Dt.NodeEdge=Oa});var Da=G(kt=>{"use strict";var Kx=kt&&kt.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),Xx=kt&&kt.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),Zx=kt&&kt.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&Kx(e,r,n);return Xx(e,r),e};Object.defineProperty(kt,"__esModule",{value:!0});kt.NodesToOptimizeIndices=void 0;var Jx=Zx(be()),Ca=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsNodesToOptimizeIndices(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodesToOptimizeIndices(e,n){return e.setPosition(e.position()+Jx.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}nodeIndices(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.readUint32(this.bb.__vector(this.bb_pos+n)+e*4):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}numInputs(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}numOutputs(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readUint32(this.bb_pos+e):0}hasVariadicInput(){let e=this.bb.__offset(this.bb_pos,10);return e?!!this.bb.readInt8(this.bb_pos+e):!1}hasVariadicOutput(){let e=this.bb.__offset(this.bb_pos,12);return e?!!this.bb.readInt8(this.bb_pos+e):!1}numVariadicInputs(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readUint32(this.bb_pos+e):0}numVariadicOutputs(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readUint32(this.bb_pos+e):0}static startNodesToOptimizeIndices(e){e.startObject(7)}static addNodeIndices(e,n){e.addFieldOffset(0,n,0)}static createNodeIndicesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addInt32(n[t]);return e.endVector()}static startNodeIndicesVector(e,n){e.startVector(4,n,4)}static addNumInputs(e,n){e.addFieldInt32(1,n,0)}static addNumOutputs(e,n){e.addFieldInt32(2,n,0)}static addHasVariadicInput(e,n){e.addFieldInt8(3,+n,0)}static addHasVariadicOutput(e,n){e.addFieldInt8(4,+n,0)}static addNumVariadicInputs(e,n){e.addFieldInt32(5,n,0)}static addNumVariadicOutputs(e,n){e.addFieldInt32(6,n,0)}static endNodesToOptimizeIndices(e){return e.endObject()}static createNodesToOptimizeIndices(e,n,t,o,i,a,s,u){return r.startNodesToOptimizeIndices(e),r.addNodeIndices(e,n),r.addNumInputs(e,t),r.addNumOutputs(e,o),r.addHasVariadicInput(e,i),r.addHasVariadicOutput(e,a),r.addNumVariadicInputs(e,s),r.addNumVariadicOutputs(e,u),r.endNodesToOptimizeIndices(e)}};kt.NodesToOptimizeIndices=Ca});var La=G(Lt=>{"use strict";var Qx=Lt&&Lt.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),Yx=Lt&&Lt.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),eT=Lt&&Lt.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&Qx(e,r,n);return Yx(e,r),e};Object.defineProperty(Lt,"__esModule",{value:!0});Lt.RuntimeOptimizationRecord=void 0;var tT=eT(be()),nT=Da(),ka=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsRuntimeOptimizationRecord(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecord(e,n){return e.setPosition(e.position()+tT.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}actionId(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}nodesToOptimizeIndices(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new nT.NodesToOptimizeIndices).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}producedOpIds(e,n){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}producedOpIdsLength(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecord(e){e.startObject(4)}static addActionId(e,n){e.addFieldOffset(0,n,0)}static addNodesToOptimizeIndices(e,n){e.addFieldOffset(1,n,0)}static addProducedOpIds(e,n){e.addFieldOffset(3,n,0)}static createProducedOpIdsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startProducedOpIdsVector(e,n){e.startVector(4,n,4)}static endRuntimeOptimizationRecord(e){return e.endObject()}};Lt.RuntimeOptimizationRecord=ka});var Ra=G(zt=>{"use strict";var rT=zt&&zt.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),oT=zt&&zt.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),iT=zt&&zt.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&rT(e,r,n);return oT(e,r),e};Object.defineProperty(zt,"__esModule",{value:!0});zt.RuntimeOptimizationRecordContainerEntry=void 0;var aT=iT(be()),sT=La(),za=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsRuntimeOptimizationRecordContainerEntry(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecordContainerEntry(e,n){return e.setPosition(e.position()+aT.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}optimizerName(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}runtimeOptimizationRecords(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new sT.RuntimeOptimizationRecord).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}runtimeOptimizationRecordsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecordContainerEntry(e){e.startObject(2)}static addOptimizerName(e,n){e.addFieldOffset(0,n,0)}static addRuntimeOptimizationRecords(e,n){e.addFieldOffset(1,n,0)}static createRuntimeOptimizationRecordsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startRuntimeOptimizationRecordsVector(e,n){e.startVector(4,n,4)}static endRuntimeOptimizationRecordContainerEntry(e){let n=e.endObject();return e.requiredField(n,4),n}static createRuntimeOptimizationRecordContainerEntry(e,n,t){return r.startRuntimeOptimizationRecordContainerEntry(e),r.addOptimizerName(e,n),r.addRuntimeOptimizationRecords(e,t),r.endRuntimeOptimizationRecordContainerEntry(e)}};zt.RuntimeOptimizationRecordContainerEntry=za});var Ma=G(Rt=>{"use strict";var uT=Rt&&Rt.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),lT=Rt&&Rt.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),cT=Rt&&Rt.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&uT(e,r,n);return lT(e,r),e};Object.defineProperty(Rt,"__esModule",{value:!0});Rt.RuntimeOptimizations=void 0;var dT=cT(be()),pT=Ra(),Na=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsRuntimeOptimizations(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizations(e,n){return e.setPosition(e.position()+dT.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}records(e,n){let t=this.bb.__offset(this.bb_pos,4);return t?(n||new pT.RuntimeOptimizationRecordContainerEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}recordsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizations(e){e.startObject(1)}static addRecords(e,n){e.addFieldOffset(0,n,0)}static createRecordsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startRecordsVector(e,n){e.startVector(4,n,4)}static endRuntimeOptimizations(e){return e.endObject()}static createRuntimeOptimizations(e,n){return r.startRuntimeOptimizations(e),r.addRecords(e,n),r.endRuntimeOptimizations(e)}};Rt.RuntimeOptimizations=Na});var Or=G(vo=>{"use strict";Object.defineProperty(vo,"__esModule",{value:!0});vo.TensorDataType=void 0;var yc;(function(r){r[r.UNDEFINED=0]="UNDEFINED",r[r.FLOAT=1]="FLOAT",r[r.UINT8=2]="UINT8",r[r.INT8=3]="INT8",r[r.UINT16=4]="UINT16",r[r.INT16=5]="INT16",r[r.INT32=6]="INT32",r[r.INT64=7]="INT64",r[r.STRING=8]="STRING",r[r.BOOL=9]="BOOL",r[r.FLOAT16=10]="FLOAT16",r[r.DOUBLE=11]="DOUBLE",r[r.UINT32=12]="UINT32",r[r.UINT64=13]="UINT64",r[r.COMPLEX64=14]="COMPLEX64",r[r.COMPLEX128=15]="COMPLEX128",r[r.BFLOAT16=16]="BFLOAT16",r[r.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",r[r.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",r[r.FLOAT8E5M2=19]="FLOAT8E5M2",r[r.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"})(yc||(vo.TensorDataType=yc={}))});var Er=G(Nt=>{"use strict";var fT=Nt&&Nt.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),hT=Nt&&Nt.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),mT=Nt&&Nt.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&fT(e,r,n);return hT(e,r),e};Object.defineProperty(Nt,"__esModule",{value:!0});Nt.Tensor=void 0;var gT=mT(be()),_c=Or(),Ba=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsTensor(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensor(e,n){return e.setPosition(e.position()+gT.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}name(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}docString(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}dims(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.readInt64(this.bb.__vector(this.bb_pos+n)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}dataType(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):_c.TensorDataType.UNDEFINED}rawData(e){let n=this.bb.__offset(this.bb_pos,12);return n?this.bb.readUint8(this.bb.__vector(this.bb_pos+n)+e):0}rawDataLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}rawDataArray(){let e=this.bb.__offset(this.bb_pos,12);return e?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}stringData(e,n){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}stringDataLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}externalDataOffset(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt64(this.bb_pos+e):BigInt("-1")}static startTensor(e){e.startObject(7)}static addName(e,n){e.addFieldOffset(0,n,0)}static addDocString(e,n){e.addFieldOffset(1,n,0)}static addDims(e,n){e.addFieldOffset(2,n,0)}static createDimsVector(e,n){e.startVector(8,n.length,8);for(let t=n.length-1;t>=0;t--)e.addInt64(n[t]);return e.endVector()}static startDimsVector(e,n){e.startVector(8,n,8)}static addDataType(e,n){e.addFieldInt32(3,n,_c.TensorDataType.UNDEFINED)}static addRawData(e,n){e.addFieldOffset(4,n,0)}static createRawDataVector(e,n){e.startVector(1,n.length,1);for(let t=n.length-1;t>=0;t--)e.addInt8(n[t]);return e.endVector()}static startRawDataVector(e,n){e.startVector(1,n,1)}static addStringData(e,n){e.addFieldOffset(5,n,0)}static createStringDataVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startStringDataVector(e,n){e.startVector(4,n,4)}static addExternalDataOffset(e,n){e.addFieldInt64(6,n,BigInt("-1"))}static endTensor(e){return e.endObject()}static createTensor(e,n,t,o,i,a,s,u){return r.startTensor(e),r.addName(e,n),r.addDocString(e,t),r.addDims(e,o),r.addDataType(e,i),r.addRawData(e,a),r.addStringData(e,s),r.addExternalDataOffset(e,u),r.endTensor(e)}};Nt.Tensor=Ba});var Fa=G(Mt=>{"use strict";var bT=Mt&&Mt.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),yT=Mt&&Mt.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),_T=Mt&&Mt.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&bT(e,r,n);return yT(e,r),e};Object.defineProperty(Mt,"__esModule",{value:!0});Mt.SparseTensor=void 0;var xT=_T(be()),xc=Er(),Va=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsSparseTensor(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsSparseTensor(e,n){return e.setPosition(e.position()+xT.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}values(e){let n=this.bb.__offset(this.bb_pos,4);return n?(e||new xc.Tensor).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}indices(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new xc.Tensor).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}dims(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.readInt64(this.bb.__vector(this.bb_pos+n)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startSparseTensor(e){e.startObject(3)}static addValues(e,n){e.addFieldOffset(0,n,0)}static addIndices(e,n){e.addFieldOffset(1,n,0)}static addDims(e,n){e.addFieldOffset(2,n,0)}static createDimsVector(e,n){e.startVector(8,n.length,8);for(let t=n.length-1;t>=0;t--)e.addInt64(n[t]);return e.endVector()}static startDimsVector(e,n){e.startVector(8,n,8)}static endSparseTensor(e){return e.endObject()}};Mt.SparseTensor=Va});var Ua=G(Bt=>{"use strict";var TT=Bt&&Bt.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),vT=Bt&&Bt.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),wT=Bt&&Bt.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&TT(e,r,n);return vT(e,r),e};Object.defineProperty(Bt,"__esModule",{value:!0});Bt.MapType=void 0;var IT=wT(be()),Tc=Or(),ST=Cr(),Ga=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsMapType(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsMapType(e,n){return e.setPosition(e.position()+IT.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}keyType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):Tc.TensorDataType.UNDEFINED}valueType(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new ST.TypeInfo).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startMapType(e){e.startObject(2)}static addKeyType(e,n){e.addFieldInt32(0,n,Tc.TensorDataType.UNDEFINED)}static addValueType(e,n){e.addFieldOffset(1,n,0)}static endMapType(e){return e.endObject()}};Bt.MapType=Ga});var Ha=G(Vt=>{"use strict";var $T=Vt&&Vt.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),AT=Vt&&Vt.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),PT=Vt&&Vt.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&$T(e,r,n);return AT(e,r),e};Object.defineProperty(Vt,"__esModule",{value:!0});Vt.SequenceType=void 0;var OT=PT(be()),ET=Cr(),Wa=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsSequenceType(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsSequenceType(e,n){return e.setPosition(e.position()+OT.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}elemType(e){let n=this.bb.__offset(this.bb_pos,4);return n?(e||new ET.TypeInfo).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startSequenceType(e){e.startObject(1)}static addElemType(e,n){e.addFieldOffset(0,n,0)}static endSequenceType(e){return e.endObject()}static createSequenceType(e,n){return r.startSequenceType(e),r.addElemType(e,n),r.endSequenceType(e)}};Vt.SequenceType=Wa});var qa=G(wo=>{"use strict";Object.defineProperty(wo,"__esModule",{value:!0});wo.DimensionValueType=void 0;var vc;(function(r){r[r.UNKNOWN=0]="UNKNOWN",r[r.VALUE=1]="VALUE",r[r.PARAM=2]="PARAM"})(vc||(wo.DimensionValueType=vc={}))});var Ka=G(Ft=>{"use strict";var CT=Ft&&Ft.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),DT=Ft&&Ft.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),kT=Ft&&Ft.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&CT(e,r,n);return DT(e,r),e};Object.defineProperty(Ft,"__esModule",{value:!0});Ft.DimensionValue=void 0;var LT=kT(be()),wc=qa(),ja=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDimensionValue(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimensionValue(e,n){return e.setPosition(e.position()+LT.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}dimType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):wc.DimensionValueType.UNKNOWN}dimValue(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}dimParam(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.__string(this.bb_pos+n,e):null}static startDimensionValue(e){e.startObject(3)}static addDimType(e,n){e.addFieldInt8(0,n,wc.DimensionValueType.UNKNOWN)}static addDimValue(e,n){e.addFieldInt64(1,n,BigInt("0"))}static addDimParam(e,n){e.addFieldOffset(2,n,0)}static endDimensionValue(e){return e.endObject()}static createDimensionValue(e,n,t,o){return r.startDimensionValue(e),r.addDimType(e,n),r.addDimValue(e,t),r.addDimParam(e,o),r.endDimensionValue(e)}};Ft.DimensionValue=ja});var Za=G(Gt=>{"use strict";var zT=Gt&&Gt.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),RT=Gt&&Gt.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),NT=Gt&&Gt.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&zT(e,r,n);return RT(e,r),e};Object.defineProperty(Gt,"__esModule",{value:!0});Gt.Dimension=void 0;var MT=NT(be()),BT=Ka(),Xa=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDimension(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimension(e,n){return e.setPosition(e.position()+MT.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}value(e){let n=this.bb.__offset(this.bb_pos,4);return n?(e||new BT.DimensionValue).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}denotation(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}static startDimension(e){e.startObject(2)}static addValue(e,n){e.addFieldOffset(0,n,0)}static addDenotation(e,n){e.addFieldOffset(1,n,0)}static endDimension(e){return e.endObject()}static createDimension(e,n,t){return r.startDimension(e),r.addValue(e,n),r.addDenotation(e,t),r.endDimension(e)}};Gt.Dimension=Xa});var Qa=G(Ut=>{"use strict";var VT=Ut&&Ut.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),FT=Ut&&Ut.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),GT=Ut&&Ut.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&VT(e,r,n);return FT(e,r),e};Object.defineProperty(Ut,"__esModule",{value:!0});Ut.Shape=void 0;var UT=GT(be()),WT=Za(),Ja=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsShape(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsShape(e,n){return e.setPosition(e.position()+UT.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}dim(e,n){let t=this.bb.__offset(this.bb_pos,4);return t?(n||new WT.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}dimLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startShape(e){e.startObject(1)}static addDim(e,n){e.addFieldOffset(0,n,0)}static createDimVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startDimVector(e,n){e.startVector(4,n,4)}static endShape(e){return e.endObject()}static createShape(e,n){return r.startShape(e),r.addDim(e,n),r.endShape(e)}};Ut.Shape=Ja});var es=G(Wt=>{"use strict";var HT=Wt&&Wt.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),qT=Wt&&Wt.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),jT=Wt&&Wt.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&HT(e,r,n);return qT(e,r),e};Object.defineProperty(Wt,"__esModule",{value:!0});Wt.TensorTypeAndShape=void 0;var KT=jT(be()),XT=Qa(),Ic=Or(),Ya=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsTensorTypeAndShape(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensorTypeAndShape(e,n){return e.setPosition(e.position()+KT.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}elemType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):Ic.TensorDataType.UNDEFINED}shape(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new XT.Shape).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startTensorTypeAndShape(e){e.startObject(2)}static addElemType(e,n){e.addFieldInt32(0,n,Ic.TensorDataType.UNDEFINED)}static addShape(e,n){e.addFieldOffset(1,n,0)}static endTensorTypeAndShape(e){return e.endObject()}};Wt.TensorTypeAndShape=Ya});var ts=G(An=>{"use strict";Object.defineProperty(An,"__esModule",{value:!0});An.unionListToTypeInfoValue=An.unionToTypeInfoValue=An.TypeInfoValue=void 0;var Sc=Ua(),$c=Ha(),Ac=es(),Io;(function(r){r[r.NONE=0]="NONE",r[r.tensor_type=1]="tensor_type",r[r.sequence_type=2]="sequence_type",r[r.map_type=3]="map_type"})(Io||(An.TypeInfoValue=Io={}));function ZT(r,e){switch(Io[r]){case"NONE":return null;case"tensor_type":return e(new Ac.TensorTypeAndShape);case"sequence_type":return e(new $c.SequenceType);case"map_type":return e(new Sc.MapType);default:return null}}An.unionToTypeInfoValue=ZT;function JT(r,e,n){switch(Io[r]){case"NONE":return null;case"tensor_type":return e(n,new Ac.TensorTypeAndShape);case"sequence_type":return e(n,new $c.SequenceType);case"map_type":return e(n,new Sc.MapType);default:return null}}An.unionListToTypeInfoValue=JT});var Cr=G(Ht=>{"use strict";var QT=Ht&&Ht.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),YT=Ht&&Ht.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),ev=Ht&&Ht.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&QT(e,r,n);return YT(e,r),e};Object.defineProperty(Ht,"__esModule",{value:!0});Ht.TypeInfo=void 0;var tv=ev(be()),Pc=ts(),ns=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsTypeInfo(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTypeInfo(e,n){return e.setPosition(e.position()+tv.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}denotation(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}valueType(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint8(this.bb_pos+e):Pc.TypeInfoValue.NONE}value(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.__union(e,this.bb_pos+n):null}static startTypeInfo(e){e.startObject(3)}static addDenotation(e,n){e.addFieldOffset(0,n,0)}static addValueType(e,n){e.addFieldInt8(1,n,Pc.TypeInfoValue.NONE)}static addValue(e,n){e.addFieldOffset(2,n,0)}static endTypeInfo(e){return e.endObject()}static createTypeInfo(e,n,t,o){return r.startTypeInfo(e),r.addDenotation(e,n),r.addValueType(e,t),r.addValue(e,o),r.endTypeInfo(e)}};Ht.TypeInfo=ns});var os=G(qt=>{"use strict";var nv=qt&&qt.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),rv=qt&&qt.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),ov=qt&&qt.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&nv(e,r,n);return rv(e,r),e};Object.defineProperty(qt,"__esModule",{value:!0});qt.ValueInfo=void 0;var iv=ov(be()),av=Cr(),rs=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsValueInfo(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsValueInfo(e,n){return e.setPosition(e.position()+iv.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}name(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}docString(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}type(e){let n=this.bb.__offset(this.bb_pos,8);return n?(e||new av.TypeInfo).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startValueInfo(e){e.startObject(3)}static addName(e,n){e.addFieldOffset(0,n,0)}static addDocString(e,n){e.addFieldOffset(1,n,0)}static addType(e,n){e.addFieldOffset(2,n,0)}static endValueInfo(e){return e.endObject()}};qt.ValueInfo=rs});var So=G(jt=>{"use strict";var sv=jt&&jt.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),uv=jt&&jt.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),lv=jt&&jt.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&sv(e,r,n);return uv(e,r),e};Object.defineProperty(jt,"__esModule",{value:!0});jt.Graph=void 0;var cv=lv(be()),dv=Sa(),pv=Ea(),fv=Ma(),hv=Fa(),mv=Er(),gv=os(),is=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsGraph(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsGraph(e,n){return e.setPosition(e.position()+cv.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}initializers(e,n){let t=this.bb.__offset(this.bb_pos,4);return t?(n||new mv.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}initializersLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeArgs(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new gv.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}nodes(e,n){let t=this.bb.__offset(this.bb_pos,8);return t?(n||new dv.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}maxNodeIndex(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readUint32(this.bb_pos+e):0}nodeEdges(e,n){let t=this.bb.__offset(this.bb_pos,12);return t?(n||new pv.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeEdgesLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}inputs(e,n){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,n){let t=this.bb.__offset(this.bb_pos,16);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.__vector_len(this.bb_pos+e):0}sparseInitializers(e,n){let t=this.bb.__offset(this.bb_pos,18);return t?(n||new hv.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}sparseInitializersLength(){let e=this.bb.__offset(this.bb_pos,18);return e?this.bb.__vector_len(this.bb_pos+e):0}runtimeOptimizations(e){let n=this.bb.__offset(this.bb_pos,20);return n?(e||new fv.RuntimeOptimizations).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startGraph(e){e.startObject(9)}static addInitializers(e,n){e.addFieldOffset(0,n,0)}static createInitializersVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startInitializersVector(e,n){e.startVector(4,n,4)}static addNodeArgs(e,n){e.addFieldOffset(1,n,0)}static createNodeArgsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startNodeArgsVector(e,n){e.startVector(4,n,4)}static addNodes(e,n){e.addFieldOffset(2,n,0)}static createNodesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startNodesVector(e,n){e.startVector(4,n,4)}static addMaxNodeIndex(e,n){e.addFieldInt32(3,n,0)}static addNodeEdges(e,n){e.addFieldOffset(4,n,0)}static createNodeEdgesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startNodeEdgesVector(e,n){e.startVector(4,n,4)}static addInputs(e,n){e.addFieldOffset(5,n,0)}static createInputsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startInputsVector(e,n){e.startVector(4,n,4)}static addOutputs(e,n){e.addFieldOffset(6,n,0)}static createOutputsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startOutputsVector(e,n){e.startVector(4,n,4)}static addSparseInitializers(e,n){e.addFieldOffset(7,n,0)}static createSparseInitializersVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startSparseInitializersVector(e,n){e.startVector(4,n,4)}static addRuntimeOptimizations(e,n){e.addFieldOffset(8,n,0)}static endGraph(e){return e.endObject()}};jt.Graph=is});var $a=G(Kt=>{"use strict";var bv=Kt&&Kt.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),yv=Kt&&Kt.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),_v=Kt&&Kt.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&bv(e,r,n);return yv(e,r),e};Object.defineProperty(Kt,"__esModule",{value:!0});Kt.Attribute=void 0;var xv=_v(be()),Oc=va(),Ec=So(),Cc=Er(),as=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsAttribute(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsAttribute(e,n){return e.setPosition(e.position()+xv.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}name(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}docString(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}type(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readInt32(this.bb_pos+e):Oc.AttributeType.UNDEFINED}f(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readFloat32(this.bb_pos+e):0}i(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}s(e){let n=this.bb.__offset(this.bb_pos,14);return n?this.bb.__string(this.bb_pos+n,e):null}t(e){let n=this.bb.__offset(this.bb_pos,16);return n?(e||new Cc.Tensor).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}g(e){let n=this.bb.__offset(this.bb_pos,18);return n?(e||new Ec.Graph).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}floats(e){let n=this.bb.__offset(this.bb_pos,20);return n?this.bb.readFloat32(this.bb.__vector(this.bb_pos+n)+e*4):0}floatsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}floatsArray(){let e=this.bb.__offset(this.bb_pos,20);return e?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}ints(e){let n=this.bb.__offset(this.bb_pos,22);return n?this.bb.readInt64(this.bb.__vector(this.bb_pos+n)+e*8):BigInt(0)}intsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}strings(e,n){let t=this.bb.__offset(this.bb_pos,24);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}stringsLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}tensors(e,n){let t=this.bb.__offset(this.bb_pos,26);return t?(n||new Cc.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}tensorsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}graphs(e,n){let t=this.bb.__offset(this.bb_pos,28);return t?(n||new Ec.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}graphsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startAttribute(e){e.startObject(13)}static addName(e,n){e.addFieldOffset(0,n,0)}static addDocString(e,n){e.addFieldOffset(1,n,0)}static addType(e,n){e.addFieldInt32(2,n,Oc.AttributeType.UNDEFINED)}static addF(e,n){e.addFieldFloat32(3,n,0)}static addI(e,n){e.addFieldInt64(4,n,BigInt("0"))}static addS(e,n){e.addFieldOffset(5,n,0)}static addT(e,n){e.addFieldOffset(6,n,0)}static addG(e,n){e.addFieldOffset(7,n,0)}static addFloats(e,n){e.addFieldOffset(8,n,0)}static createFloatsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addFloat32(n[t]);return e.endVector()}static startFloatsVector(e,n){e.startVector(4,n,4)}static addInts(e,n){e.addFieldOffset(9,n,0)}static createIntsVector(e,n){e.startVector(8,n.length,8);for(let t=n.length-1;t>=0;t--)e.addInt64(n[t]);return e.endVector()}static startIntsVector(e,n){e.startVector(8,n,8)}static addStrings(e,n){e.addFieldOffset(10,n,0)}static createStringsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startStringsVector(e,n){e.startVector(4,n,4)}static addTensors(e,n){e.addFieldOffset(11,n,0)}static createTensorsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startTensorsVector(e,n){e.startVector(4,n,4)}static addGraphs(e,n){e.addFieldOffset(12,n,0)}static createGraphsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startGraphsVector(e,n){e.startVector(4,n,4)}static endAttribute(e){return e.endObject()}};Kt.Attribute=as});var us=G(Xt=>{"use strict";var Tv=Xt&&Xt.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),vv=Xt&&Xt.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),wv=Xt&&Xt.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&Tv(e,r,n);return vv(e,r),e};Object.defineProperty(Xt,"__esModule",{value:!0});Xt.DeprecatedKernelCreateInfos=void 0;var Iv=wv(be()),ss=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDeprecatedKernelCreateInfos(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedKernelCreateInfos(e,n){return e.setPosition(e.position()+Iv.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}nodeIndices(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.readUint32(this.bb.__vector(this.bb_pos+n)+e*4):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}kernelDefHashes(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.readUint64(this.bb.__vector(this.bb_pos+n)+e*8):BigInt(0)}kernelDefHashesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedKernelCreateInfos(e){e.startObject(2)}static addNodeIndices(e,n){e.addFieldOffset(0,n,0)}static createNodeIndicesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addInt32(n[t]);return e.endVector()}static startNodeIndicesVector(e,n){e.startVector(4,n,4)}static addKernelDefHashes(e,n){e.addFieldOffset(1,n,0)}static createKernelDefHashesVector(e,n){e.startVector(8,n.length,8);for(let t=n.length-1;t>=0;t--)e.addInt64(n[t]);return e.endVector()}static startKernelDefHashesVector(e,n){e.startVector(8,n,8)}static endDeprecatedKernelCreateInfos(e){return e.endObject()}static createDeprecatedKernelCreateInfos(e,n,t){return r.startDeprecatedKernelCreateInfos(e),r.addNodeIndices(e,n),r.addKernelDefHashes(e,t),r.endDeprecatedKernelCreateInfos(e)}};Xt.DeprecatedKernelCreateInfos=ss});var Dc=G(Zt=>{"use strict";var Sv=Zt&&Zt.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),$v=Zt&&Zt.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),Av=Zt&&Zt.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&Sv(e,r,n);return $v(e,r),e};Object.defineProperty(Zt,"__esModule",{value:!0});Zt.DeprecatedNodeIndexAndKernelDefHash=void 0;var Pv=Av(be()),ls=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDeprecatedNodeIndexAndKernelDefHash(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedNodeIndexAndKernelDefHash(e,n){return e.setPosition(e.position()+Pv.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}kernelDefHash(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint64(this.bb_pos+e):BigInt("0")}static startDeprecatedNodeIndexAndKernelDefHash(e){e.startObject(2)}static addNodeIndex(e,n){e.addFieldInt32(0,n,0)}static addKernelDefHash(e,n){e.addFieldInt64(1,n,BigInt("0"))}static endDeprecatedNodeIndexAndKernelDefHash(e){return e.endObject()}static createDeprecatedNodeIndexAndKernelDefHash(e,n,t){return r.startDeprecatedNodeIndexAndKernelDefHash(e),r.addNodeIndex(e,n),r.addKernelDefHash(e,t),r.endDeprecatedNodeIndexAndKernelDefHash(e)}};Zt.DeprecatedNodeIndexAndKernelDefHash=ls});var ds=G(Jt=>{"use strict";var Ov=Jt&&Jt.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),Ev=Jt&&Jt.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),Cv=Jt&&Jt.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&Ov(e,r,n);return Ev(e,r),e};Object.defineProperty(Jt,"__esModule",{value:!0});Jt.DeprecatedSubGraphSessionState=void 0;var Dv=Cv(be()),kv=ps(),cs=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDeprecatedSubGraphSessionState(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedSubGraphSessionState(e,n){return e.setPosition(e.position()+Dv.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}graphId(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}sessionState(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new kv.DeprecatedSessionState).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startDeprecatedSubGraphSessionState(e){e.startObject(2)}static addGraphId(e,n){e.addFieldOffset(0,n,0)}static addSessionState(e,n){e.addFieldOffset(1,n,0)}static endDeprecatedSubGraphSessionState(e){let n=e.endObject();return e.requiredField(n,4),n}};Jt.DeprecatedSubGraphSessionState=cs});var ps=G(Qt=>{"use strict";var Lv=Qt&&Qt.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),zv=Qt&&Qt.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),Rv=Qt&&Qt.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&Lv(e,r,n);return zv(e,r),e};Object.defineProperty(Qt,"__esModule",{value:!0});Qt.DeprecatedSessionState=void 0;var Nv=Rv(be()),Mv=us(),Bv=ds(),fs=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDeprecatedSessionState(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedSessionState(e,n){return e.setPosition(e.position()+Nv.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}kernels(e){let n=this.bb.__offset(this.bb_pos,4);return n?(e||new Mv.DeprecatedKernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}subGraphSessionStates(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new Bv.DeprecatedSubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}subGraphSessionStatesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedSessionState(e){e.startObject(2)}static addKernels(e,n){e.addFieldOffset(0,n,0)}static addSubGraphSessionStates(e,n){e.addFieldOffset(1,n,0)}static createSubGraphSessionStatesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startSubGraphSessionStatesVector(e,n){e.startVector(4,n,4)}static endDeprecatedSessionState(e){return e.endObject()}static createDeprecatedSessionState(e,n,t){return r.startDeprecatedSessionState(e),r.addKernels(e,n),r.addSubGraphSessionStates(e,t),r.endDeprecatedSessionState(e)}};Qt.DeprecatedSessionState=fs});var ms=G(Yt=>{"use strict";var Vv=Yt&&Yt.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),Fv=Yt&&Yt.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),Gv=Yt&&Yt.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&Vv(e,r,n);return Fv(e,r),e};Object.defineProperty(Yt,"__esModule",{value:!0});Yt.KernelTypeStrArgsEntry=void 0;var Uv=Gv(be()),Wv=Ta(),hs=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsKernelTypeStrArgsEntry(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrArgsEntry(e,n){return e.setPosition(e.position()+Uv.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}kernelTypeStr(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}args(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new Wv.ArgTypeAndIndex).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}argsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrArgsEntry(e){e.startObject(2)}static addKernelTypeStr(e,n){e.addFieldOffset(0,n,0)}static addArgs(e,n){e.addFieldOffset(1,n,0)}static createArgsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startArgsVector(e,n){e.startVector(4,n,4)}static endKernelTypeStrArgsEntry(e){let n=e.endObject();return e.requiredField(n,4),n}static createKernelTypeStrArgsEntry(e,n,t){return r.startKernelTypeStrArgsEntry(e),r.addKernelTypeStr(e,n),r.addArgs(e,t),r.endKernelTypeStrArgsEntry(e)}};Yt.KernelTypeStrArgsEntry=hs});var bs=G(en=>{"use strict";var Hv=en&&en.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),qv=en&&en.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),jv=en&&en.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&Hv(e,r,n);return qv(e,r),e};Object.defineProperty(en,"__esModule",{value:!0});en.OpIdKernelTypeStrArgsEntry=void 0;var Kv=jv(be()),Xv=ms(),gs=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsOpIdKernelTypeStrArgsEntry(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOpIdKernelTypeStrArgsEntry(e,n){return e.setPosition(e.position()+Kv.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}opId(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}kernelTypeStrArgs(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new Xv.KernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}kernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startOpIdKernelTypeStrArgsEntry(e){e.startObject(2)}static addOpId(e,n){e.addFieldOffset(0,n,0)}static addKernelTypeStrArgs(e,n){e.addFieldOffset(1,n,0)}static createKernelTypeStrArgsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startKernelTypeStrArgsVector(e,n){e.startVector(4,n,4)}static endOpIdKernelTypeStrArgsEntry(e){let n=e.endObject();return e.requiredField(n,4),n}static createOpIdKernelTypeStrArgsEntry(e,n,t){return r.startOpIdKernelTypeStrArgsEntry(e),r.addOpId(e,n),r.addKernelTypeStrArgs(e,t),r.endOpIdKernelTypeStrArgsEntry(e)}};en.OpIdKernelTypeStrArgsEntry=gs});var _s=G(tn=>{"use strict";var Zv=tn&&tn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),Jv=tn&&tn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),Qv=tn&&tn.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&Zv(e,r,n);return Jv(e,r),e};Object.defineProperty(tn,"__esModule",{value:!0});tn.KernelTypeStrResolver=void 0;var Yv=Qv(be()),ew=bs(),ys=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsKernelTypeStrResolver(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrResolver(e,n){return e.setPosition(e.position()+Yv.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}opKernelTypeStrArgs(e,n){let t=this.bb.__offset(this.bb_pos,4);return t?(n||new ew.OpIdKernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opKernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrResolver(e){e.startObject(1)}static addOpKernelTypeStrArgs(e,n){e.addFieldOffset(0,n,0)}static createOpKernelTypeStrArgsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startOpKernelTypeStrArgsVector(e,n){e.startVector(4,n,4)}static endKernelTypeStrResolver(e){return e.endObject()}static createKernelTypeStrResolver(e,n){return r.startKernelTypeStrResolver(e),r.addOpKernelTypeStrArgs(e,n),r.endKernelTypeStrResolver(e)}};tn.KernelTypeStrResolver=ys});var Ts=G(nn=>{"use strict";var tw=nn&&nn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),nw=nn&&nn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),rw=nn&&nn.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&tw(e,r,n);return nw(e,r),e};Object.defineProperty(nn,"__esModule",{value:!0});nn.OperatorSetId=void 0;var ow=rw(be()),xs=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsOperatorSetId(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOperatorSetId(e,n){return e.setPosition(e.position()+ow.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}domain(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}version(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}static startOperatorSetId(e){e.startObject(2)}static addDomain(e,n){e.addFieldOffset(0,n,0)}static addVersion(e,n){e.addFieldInt64(1,n,BigInt("0"))}static endOperatorSetId(e){return e.endObject()}static createOperatorSetId(e,n,t){return r.startOperatorSetId(e),r.addDomain(e,n),r.addVersion(e,t),r.endOperatorSetId(e)}};nn.OperatorSetId=xs});var ws=G(rn=>{"use strict";var iw=rn&&rn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),aw=rn&&rn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),sw=rn&&rn.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&iw(e,r,n);return aw(e,r),e};Object.defineProperty(rn,"__esModule",{value:!0});rn.StringStringEntry=void 0;var uw=sw(be()),vs=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsStringStringEntry(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsStringStringEntry(e,n){return e.setPosition(e.position()+uw.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}key(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}value(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}static startStringStringEntry(e){e.startObject(2)}static addKey(e,n){e.addFieldOffset(0,n,0)}static addValue(e,n){e.addFieldOffset(1,n,0)}static endStringStringEntry(e){return e.endObject()}static createStringStringEntry(e,n,t){return r.startStringStringEntry(e),r.addKey(e,n),r.addValue(e,t),r.endStringStringEntry(e)}};rn.StringStringEntry=vs});var Ss=G(on=>{"use strict";var lw=on&&on.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),cw=on&&on.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),dw=on&&on.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&lw(e,r,n);return cw(e,r),e};Object.defineProperty(on,"__esModule",{value:!0});on.Model=void 0;var pw=dw(be()),fw=So(),hw=Ts(),mw=ws(),Is=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsModel(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsModel(e,n){return e.setPosition(e.position()+pw.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}irVersion(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}opsetImport(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new hw.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opsetImportLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}producerName(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.__string(this.bb_pos+n,e):null}producerVersion(e){let n=this.bb.__offset(this.bb_pos,10);return n?this.bb.__string(this.bb_pos+n,e):null}domain(e){let n=this.bb.__offset(this.bb_pos,12);return n?this.bb.__string(this.bb_pos+n,e):null}modelVersion(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}docString(e){let n=this.bb.__offset(this.bb_pos,16);return n?this.bb.__string(this.bb_pos+n,e):null}graph(e){let n=this.bb.__offset(this.bb_pos,18);return n?(e||new fw.Graph).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}graphDocString(e){let n=this.bb.__offset(this.bb_pos,20);return n?this.bb.__string(this.bb_pos+n,e):null}metadataProps(e,n){let t=this.bb.__offset(this.bb_pos,22);return t?(n||new mw.StringStringEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}metadataPropsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}static startModel(e){e.startObject(10)}static addIrVersion(e,n){e.addFieldInt64(0,n,BigInt("0"))}static addOpsetImport(e,n){e.addFieldOffset(1,n,0)}static createOpsetImportVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startOpsetImportVector(e,n){e.startVector(4,n,4)}static addProducerName(e,n){e.addFieldOffset(2,n,0)}static addProducerVersion(e,n){e.addFieldOffset(3,n,0)}static addDomain(e,n){e.addFieldOffset(4,n,0)}static addModelVersion(e,n){e.addFieldInt64(5,n,BigInt("0"))}static addDocString(e,n){e.addFieldOffset(6,n,0)}static addGraph(e,n){e.addFieldOffset(7,n,0)}static addGraphDocString(e,n){e.addFieldOffset(8,n,0)}static addMetadataProps(e,n){e.addFieldOffset(9,n,0)}static createMetadataPropsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startMetadataPropsVector(e,n){e.startVector(4,n,4)}static endModel(e){return e.endObject()}};on.Model=Is});var kc=G(an=>{"use strict";var gw=an&&an.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),bw=an&&an.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),yw=an&&an.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var n in r)n!=="default"&&Object.prototype.hasOwnProperty.call(r,n)&&gw(e,r,n);return bw(e,r),e};Object.defineProperty(an,"__esModule",{value:!0});an.InferenceSession=void 0;var _w=yw(be()),xw=_s(),Tw=Ss(),$s=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsInferenceSession(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsInferenceSession(e,n){return e.setPosition(e.position()+_w.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static bufferHasIdentifier(e){return e.__has_identifier("ORTM")}ortVersion(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}model(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new Tw.Model).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}kernelTypeStrResolver(e){let n=this.bb.__offset(this.bb_pos,10);return n?(e||new xw.KernelTypeStrResolver).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startInferenceSession(e){e.startObject(4)}static addOrtVersion(e,n){e.addFieldOffset(0,n,0)}static addModel(e,n){e.addFieldOffset(1,n,0)}static addKernelTypeStrResolver(e,n){e.addFieldOffset(3,n,0)}static endInferenceSession(e){return e.endObject()}static finishInferenceSessionBuffer(e,n){e.finish(n,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(e,n){e.finish(n,"ORTM",!0)}};an.InferenceSession=$s});var vw,ww,$o,pt,Iw,Sw,$w,Aw,Pw,Ow,Ew,Cw,As,Ps,Dw,kw,Lw,zw,Os,Rw,Nw,Mw,Bw,Vw,Fw,Gw,Uw,Ww,Hw,qw,jw,Kw,Dr,Es,Xw,Cs,Zw,Lc=$(()=>{"use strict";vw=re(ha()),ww=re(Ta()),$o=re($a()),pt=re(va()),Iw=re(us()),Sw=re(Dc()),$w=re(ps()),Aw=re(ds()),Pw=re(Za()),Ow=re(Ka()),Ew=re(qa()),Cw=re(Pa()),As=re(So()),Ps=re(kc()),Dw=re(ms()),kw=re(_s()),Lw=re(Ua()),zw=re(Ss()),Os=re(Sa()),Rw=re(Ea()),Nw=re(wa()),Mw=re(Da()),Bw=re(bs()),Vw=re(Ts()),Fw=re(La()),Gw=re(Ra()),Uw=re(Ma()),Ww=re(Ha()),Hw=re(Qa()),qw=re(Fa()),jw=re(ws()),Kw=re(Er()),Dr=re(Or()),Es=re(es()),Xw=re(Cr()),Cs=re(ts()),Zw=re(os())});var kr=$(()=>{"use strict";Lc()});var Rc=G((SO,zc)=>{"use strict";zc.exports=Jw;function Jw(r,e){for(var n=new Array(arguments.length-1),t=0,o=2,i=!0;o<arguments.length;)n[t++]=arguments[o++];return new Promise(function(s,u){n[t]=function(c){if(i)if(i=!1,c)u(c);else{for(var d=new Array(arguments.length-1),p=0;p<d.length;)d[p++]=arguments[p];s.apply(null,d)}};try{r.apply(e||null,n)}catch(l){i&&(i=!1,u(l))}})}});var Vc=G(Bc=>{"use strict";var Po=Bc;Po.length=function(e){var n=e.length;if(!n)return 0;for(var t=0;--n%4>1&&e.charAt(n)==="=";)++t;return Math.ceil(e.length*3)/4-t};var lr=new Array(64),Mc=new Array(123);for(xt=0;xt<64;)Mc[lr[xt]=xt<26?xt+65:xt<52?xt+71:xt<62?xt-4:xt-59|43]=xt++;var xt;Po.encode=function(e,n,t){for(var o=null,i=[],a=0,s=0,u;n<t;){var l=e[n++];switch(s){case 0:i[a++]=lr[l>>2],u=(l&3)<<4,s=1;break;case 1:i[a++]=lr[u|l>>4],u=(l&15)<<2,s=2;break;case 2:i[a++]=lr[u|l>>6],i[a++]=lr[l&63],s=0;break}a>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,i)),a=0)}return s&&(i[a++]=lr[u],i[a++]=61,s===1&&(i[a++]=61)),o?(a&&o.push(String.fromCharCode.apply(String,i.slice(0,a))),o.join("")):String.fromCharCode.apply(String,i.slice(0,a))};var Nc="invalid encoding";Po.decode=function(e,n,t){for(var o=t,i=0,a,s=0;s<e.length;){var u=e.charCodeAt(s++);if(u===61&&i>1)break;if((u=Mc[u])===void 0)throw Error(Nc);switch(i){case 0:a=u,i=1;break;case 1:n[t++]=a<<2|(u&48)>>4,a=u,i=2;break;case 2:n[t++]=(a&15)<<4|(u&60)>>2,a=u,i=3;break;case 3:n[t++]=(a&3)<<6|u,i=0;break}}if(i===1)throw Error(Nc);return t-o};Po.test=function(e){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)}});var Gc=G((AO,Fc)=>{"use strict";Fc.exports=Oo;function Oo(){this._listeners={}}Oo.prototype.on=function(e,n,t){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:n,ctx:t||this}),this};Oo.prototype.off=function(e,n){if(e===void 0)this._listeners={};else if(n===void 0)this._listeners[e]=[];else for(var t=this._listeners[e],o=0;o<t.length;)t[o].fn===n?t.splice(o,1):++o;return this};Oo.prototype.emit=function(e){var n=this._listeners[e];if(n){for(var t=[],o=1;o<arguments.length;)t.push(arguments[o++]);for(o=0;o<n.length;)n[o].fn.apply(n[o++].ctx,t)}return this}});var Xc=G((PO,Kc)=>{"use strict";Kc.exports=Uc(Uc);function Uc(r){return typeof Float32Array<"u"?function(){var e=new Float32Array([-0]),n=new Uint8Array(e.buffer),t=n[3]===128;function o(u,l,c){e[0]=u,l[c]=n[0],l[c+1]=n[1],l[c+2]=n[2],l[c+3]=n[3]}function i(u,l,c){e[0]=u,l[c]=n[3],l[c+1]=n[2],l[c+2]=n[1],l[c+3]=n[0]}r.writeFloatLE=t?o:i,r.writeFloatBE=t?i:o;function a(u,l){return n[0]=u[l],n[1]=u[l+1],n[2]=u[l+2],n[3]=u[l+3],e[0]}function s(u,l){return n[3]=u[l],n[2]=u[l+1],n[1]=u[l+2],n[0]=u[l+3],e[0]}r.readFloatLE=t?a:s,r.readFloatBE=t?s:a}():function(){function e(t,o,i,a){var s=o<0?1:0;if(s&&(o=-o),o===0)t(1/o>0?0:2147483648,i,a);else if(isNaN(o))t(2143289344,i,a);else if(o>34028234663852886e22)t((s<<31|2139095040)>>>0,i,a);else if(o<11754943508222875e-54)t((s<<31|Math.round(o/1401298464324817e-60))>>>0,i,a);else{var u=Math.floor(Math.log(o)/Math.LN2),l=Math.round(o*Math.pow(2,-u)*8388608)&8388607;t((s<<31|u+127<<23|l)>>>0,i,a)}}r.writeFloatLE=e.bind(null,Wc),r.writeFloatBE=e.bind(null,Hc);function n(t,o,i){var a=t(o,i),s=(a>>31)*2+1,u=a>>>23&255,l=a&8388607;return u===255?l?NaN:s*(1/0):u===0?s*1401298464324817e-60*l:s*Math.pow(2,u-150)*(l+8388608)}r.readFloatLE=n.bind(null,qc),r.readFloatBE=n.bind(null,jc)}(),typeof Float64Array<"u"?function(){var e=new Float64Array([-0]),n=new Uint8Array(e.buffer),t=n[7]===128;function o(u,l,c){e[0]=u,l[c]=n[0],l[c+1]=n[1],l[c+2]=n[2],l[c+3]=n[3],l[c+4]=n[4],l[c+5]=n[5],l[c+6]=n[6],l[c+7]=n[7]}function i(u,l,c){e[0]=u,l[c]=n[7],l[c+1]=n[6],l[c+2]=n[5],l[c+3]=n[4],l[c+4]=n[3],l[c+5]=n[2],l[c+6]=n[1],l[c+7]=n[0]}r.writeDoubleLE=t?o:i,r.writeDoubleBE=t?i:o;function a(u,l){return n[0]=u[l],n[1]=u[l+1],n[2]=u[l+2],n[3]=u[l+3],n[4]=u[l+4],n[5]=u[l+5],n[6]=u[l+6],n[7]=u[l+7],e[0]}function s(u,l){return n[7]=u[l],n[6]=u[l+1],n[5]=u[l+2],n[4]=u[l+3],n[3]=u[l+4],n[2]=u[l+5],n[1]=u[l+6],n[0]=u[l+7],e[0]}r.readDoubleLE=t?a:s,r.readDoubleBE=t?s:a}():function(){function e(t,o,i,a,s,u){var l=a<0?1:0;if(l&&(a=-a),a===0)t(0,s,u+o),t(1/a>0?0:2147483648,s,u+i);else if(isNaN(a))t(0,s,u+o),t(2146959360,s,u+i);else if(a>17976931348623157e292)t(0,s,u+o),t((l<<31|2146435072)>>>0,s,u+i);else{var c;if(a<22250738585072014e-324)c=a/5e-324,t(c>>>0,s,u+o),t((l<<31|c/4294967296)>>>0,s,u+i);else{var d=Math.floor(Math.log(a)/Math.LN2);d===1024&&(d=1023),c=a*Math.pow(2,-d),t(c*4503599627370496>>>0,s,u+o),t((l<<31|d+1023<<20|c*1048576&1048575)>>>0,s,u+i)}}}r.writeDoubleLE=e.bind(null,Wc,0,4),r.writeDoubleBE=e.bind(null,Hc,4,0);function n(t,o,i,a,s){var u=t(a,s+o),l=t(a,s+i),c=(l>>31)*2+1,d=l>>>20&2047,p=4294967296*(l&1048575)+u;return d===2047?p?NaN:c*(1/0):d===0?c*5e-324*p:c*Math.pow(2,d-1075)*(p+4503599627370496)}r.readDoubleLE=n.bind(null,qc,0,4),r.readDoubleBE=n.bind(null,jc,4,0)}(),r}function Wc(r,e,n){e[n]=r&255,e[n+1]=r>>>8&255,e[n+2]=r>>>16&255,e[n+3]=r>>>24}function Hc(r,e,n){e[n]=r>>>24,e[n+1]=r>>>16&255,e[n+2]=r>>>8&255,e[n+3]=r&255}function qc(r,e){return(r[e]|r[e+1]<<8|r[e+2]<<16|r[e+3]<<24)>>>0}function jc(r,e){return(r[e]<<24|r[e+1]<<16|r[e+2]<<8|r[e+3])>>>0}});var Zc=G((exports,module)=>{"use strict";module.exports=inquire;function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(r){}return null}});var Qc=G(Jc=>{"use strict";var Ds=Jc;Ds.length=function(e){for(var n=0,t=0,o=0;o<e.length;++o)t=e.charCodeAt(o),t<128?n+=1:t<2048?n+=2:(t&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320?(++o,n+=4):n+=3;return n};Ds.read=function(e,n,t){var o=t-n;if(o<1)return"";for(var i=null,a=[],s=0,u;n<t;)u=e[n++],u<128?a[s++]=u:u>191&&u<224?a[s++]=(u&31)<<6|e[n++]&63:u>239&&u<365?(u=((u&7)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,a[s++]=55296+(u>>10),a[s++]=56320+(u&1023)):a[s++]=(u&15)<<12|(e[n++]&63)<<6|e[n++]&63,s>8191&&((i||(i=[])).push(String.fromCharCode.apply(String,a)),s=0);return i?(s&&i.push(String.fromCharCode.apply(String,a.slice(0,s))),i.join("")):String.fromCharCode.apply(String,a.slice(0,s))};Ds.write=function(e,n,t){for(var o=t,i,a,s=0;s<e.length;++s)i=e.charCodeAt(s),i<128?n[t++]=i:i<2048?(n[t++]=i>>6|192,n[t++]=i&63|128):(i&64512)===55296&&((a=e.charCodeAt(s+1))&64512)===56320?(i=65536+((i&1023)<<10)+(a&1023),++s,n[t++]=i>>18|240,n[t++]=i>>12&63|128,n[t++]=i>>6&63|128,n[t++]=i&63|128):(n[t++]=i>>12|224,n[t++]=i>>6&63|128,n[t++]=i&63|128);return t-o}});var ed=G((EO,Yc)=>{"use strict";Yc.exports=Qw;function Qw(r,e,n){var t=n||8192,o=t>>>1,i=null,a=t;return function(u){if(u<1||u>o)return r(u);a+u>t&&(i=r(t),a=0);var l=e.call(i,a,a+=u);return a&7&&(a=(a|7)+1),l}}});var nd=G((CO,td)=>{"use strict";td.exports=Ge;var Lr=On();function Ge(r,e){this.lo=r>>>0,this.hi=e>>>0}var Un=Ge.zero=new Ge(0,0);Un.toNumber=function(){return 0};Un.zzEncode=Un.zzDecode=function(){return this};Un.length=function(){return 1};var Yw=Ge.zeroHash="\0\0\0\0\0\0\0\0";Ge.fromNumber=function(e){if(e===0)return Un;var n=e<0;n&&(e=-e);var t=e>>>0,o=(e-t)/4294967296>>>0;return n&&(o=~o>>>0,t=~t>>>0,++t>4294967295&&(t=0,++o>4294967295&&(o=0))),new Ge(t,o)};Ge.from=function(e){if(typeof e=="number")return Ge.fromNumber(e);if(Lr.isString(e))if(Lr.Long)e=Lr.Long.fromString(e);else return Ge.fromNumber(parseInt(e,10));return e.low||e.high?new Ge(e.low>>>0,e.high>>>0):Un};Ge.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var n=~this.lo+1>>>0,t=~this.hi>>>0;return n||(t=t+1>>>0),-(n+t*4294967296)}return this.lo+this.hi*4294967296};Ge.prototype.toLong=function(e){return Lr.Long?new Lr.Long(this.lo|0,this.hi|0,!!e):{low:this.lo|0,high:this.hi|0,unsigned:!!e}};var Pn=String.prototype.charCodeAt;Ge.fromHash=function(e){return e===Yw?Un:new Ge((Pn.call(e,0)|Pn.call(e,1)<<8|Pn.call(e,2)<<16|Pn.call(e,3)<<24)>>>0,(Pn.call(e,4)|Pn.call(e,5)<<8|Pn.call(e,6)<<16|Pn.call(e,7)<<24)>>>0)};Ge.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)};Ge.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this};Ge.prototype.zzDecode=function(){var e=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this};Ge.prototype.length=function(){var e=this.lo,n=(this.lo>>>28|this.hi<<4)>>>0,t=this.hi>>>24;return t===0?n===0?e<16384?e<128?1:2:e<2097152?3:4:n<16384?n<128?5:6:n<2097152?7:8:t<128?9:10}});var On=G(ks=>{"use strict";var H=ks;H.asPromise=Rc();H.base64=Vc();H.EventEmitter=Gc();H.float=Xc();H.inquire=Zc();H.utf8=Qc();H.pool=ed();H.LongBits=nd();H.isNode=!!(typeof global<"u"&&global&&global.process&&global.process.versions&&global.process.versions.node);H.global=H.isNode&&global||typeof window<"u"&&window||typeof self<"u"&&self||ks;H.emptyArray=Object.freeze?Object.freeze([]):[];H.emptyObject=Object.freeze?Object.freeze({}):{};H.isInteger=Number.isInteger||function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e};H.isString=function(e){return typeof e=="string"||e instanceof String};H.isObject=function(e){return e&&typeof e=="object"};H.isset=H.isSet=function(e,n){var t=e[n];return t!=null&&e.hasOwnProperty(n)?typeof t!="object"||(Array.isArray(t)?t.length:Object.keys(t).length)>0:!1};H.Buffer=function(){try{var r=H.inquire("buffer").Buffer;return r.prototype.utf8Write?r:null}catch{return null}}();H._Buffer_from=null;H._Buffer_allocUnsafe=null;H.newBuffer=function(e){return typeof e=="number"?H.Buffer?H._Buffer_allocUnsafe(e):new H.Array(e):H.Buffer?H._Buffer_from(e):typeof Uint8Array>"u"?e:new Uint8Array(e)};H.Array=typeof Uint8Array<"u"?Uint8Array:Array;H.Long=H.global.dcodeIO&&H.global.dcodeIO.Long||H.global.Long||H.inquire("long");H.key2Re=/^true|false|0|1$/;H.key32Re=/^-?(?:0|[1-9][0-9]*)$/;H.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;H.longToHash=function(e){return e?H.LongBits.from(e).toHash():H.LongBits.zeroHash};H.longFromHash=function(e,n){var t=H.LongBits.fromHash(e);return H.Long?H.Long.fromBits(t.lo,t.hi,n):t.toNumber(!!n)};function rd(r,e,n){for(var t=Object.keys(e),o=0;o<t.length;++o)(r[t[o]]===void 0||!n)&&(r[t[o]]=e[t[o]]);return r}H.merge=rd;H.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)};function od(r){function e(n,t){if(!(this instanceof e))return new e(n,t);Object.defineProperty(this,"message",{get:function(){return n}}),Error.captureStackTrace?Error.captureStackTrace(this,e):Object.defineProperty(this,"stack",{value:new Error().stack||""}),t&&rd(this,t)}return e.prototype=Object.create(Error.prototype,{constructor:{value:e,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return r},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),e}H.newError=od;H.ProtocolError=od("ProtocolError");H.oneOfGetter=function(e){for(var n={},t=0;t<e.length;++t)n[e[t]]=1;return function(){for(var o=Object.keys(this),i=o.length-1;i>-1;--i)if(n[o[i]]===1&&this[o[i]]!==void 0&&this[o[i]]!==null)return o[i]}};H.oneOfSetter=function(e){return function(n){for(var t=0;t<e.length;++t)e[t]!==n&&delete this[e[t]]}};H.toJSONOptions={longs:String,enums:String,bytes:String,json:!0};H._configure=function(){var r=H.Buffer;if(!r){H._Buffer_from=H._Buffer_allocUnsafe=null;return}H._Buffer_from=r.from!==Uint8Array.from&&r.from||function(n,t){return new r(n,t)},H._Buffer_allocUnsafe=r.allocUnsafe||function(n){return new r(n)}}});var Vs=G((kO,ud)=>{"use strict";ud.exports=fe;var ft=On(),Ls,Eo=ft.LongBits,id=ft.base64,ad=ft.utf8;function zr(r,e,n){this.fn=r,this.len=e,this.next=void 0,this.val=n}function Rs(){}function e0(r){this.head=r.head,this.tail=r.tail,this.len=r.len,this.next=r.states}function fe(){this.len=0,this.head=new zr(Rs,0,0),this.tail=this.head,this.states=null}var sd=function(){return ft.Buffer?function(){return(fe.create=function(){return new Ls})()}:function(){return new fe}};fe.create=sd();fe.alloc=function(e){return new ft.Array(e)};ft.Array!==Array&&(fe.alloc=ft.pool(fe.alloc,ft.Array.prototype.subarray));fe.prototype._push=function(e,n,t){return this.tail=this.tail.next=new zr(e,n,t),this.len+=n,this};function Ns(r,e,n){e[n]=r&255}function t0(r,e,n){for(;r>127;)e[n++]=r&127|128,r>>>=7;e[n]=r}function Ms(r,e){this.len=r,this.next=void 0,this.val=e}Ms.prototype=Object.create(zr.prototype);Ms.prototype.fn=t0;fe.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new Ms((e=e>>>0)<128?1:e<16384?2:e<2097152?3:e<268435456?4:5,e)).len,this};fe.prototype.int32=function(e){return e<0?this._push(Bs,10,Eo.fromNumber(e)):this.uint32(e)};fe.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)};function Bs(r,e,n){for(;r.hi;)e[n++]=r.lo&127|128,r.lo=(r.lo>>>7|r.hi<<25)>>>0,r.hi>>>=7;for(;r.lo>127;)e[n++]=r.lo&127|128,r.lo=r.lo>>>7;e[n++]=r.lo}fe.prototype.uint64=function(e){var n=Eo.from(e);return this._push(Bs,n.length(),n)};fe.prototype.int64=fe.prototype.uint64;fe.prototype.sint64=function(e){var n=Eo.from(e).zzEncode();return this._push(Bs,n.length(),n)};fe.prototype.bool=function(e){return this._push(Ns,1,e?1:0)};function zs(r,e,n){e[n]=r&255,e[n+1]=r>>>8&255,e[n+2]=r>>>16&255,e[n+3]=r>>>24}fe.prototype.fixed32=function(e){return this._push(zs,4,e>>>0)};fe.prototype.sfixed32=fe.prototype.fixed32;fe.prototype.fixed64=function(e){var n=Eo.from(e);return this._push(zs,4,n.lo)._push(zs,4,n.hi)};fe.prototype.sfixed64=fe.prototype.fixed64;fe.prototype.float=function(e){return this._push(ft.float.writeFloatLE,4,e)};fe.prototype.double=function(e){return this._push(ft.float.writeDoubleLE,8,e)};var n0=ft.Array.prototype.set?function(e,n,t){n.set(e,t)}:function(e,n,t){for(var o=0;o<e.length;++o)n[t+o]=e[o]};fe.prototype.bytes=function(e){var n=e.length>>>0;if(!n)return this._push(Ns,1,0);if(ft.isString(e)){var t=fe.alloc(n=id.length(e));id.decode(e,t,0),e=t}return this.uint32(n)._push(n0,n,e)};fe.prototype.string=function(e){var n=ad.length(e);return n?this.uint32(n)._push(ad.write,n,e):this._push(Ns,1,0)};fe.prototype.fork=function(){return this.states=new e0(this),this.head=this.tail=new zr(Rs,0,0),this.len=0,this};fe.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new zr(Rs,0,0),this.len=0),this};fe.prototype.ldelim=function(){var e=this.head,n=this.tail,t=this.len;return this.reset().uint32(t),t&&(this.tail.next=e.next,this.tail=n,this.len+=t),this};fe.prototype.finish=function(){for(var e=this.head.next,n=this.constructor.alloc(this.len),t=0;e;)e.fn(e.val,n,t),t+=e.len,e=e.next;return n};fe._configure=function(r){Ls=r,fe.create=sd(),Ls._configure()}});var dd=G((LO,cd)=>{"use strict";cd.exports=sn;var ld=Vs();(sn.prototype=Object.create(ld.prototype)).constructor=sn;var En=On();function sn(){ld.call(this)}sn._configure=function(){sn.alloc=En._Buffer_allocUnsafe,sn.writeBytesBuffer=En.Buffer&&En.Buffer.prototype instanceof Uint8Array&&En.Buffer.prototype.set.name==="set"?function(e,n,t){n.set(e,t)}:function(e,n,t){if(e.copy)e.copy(n,t,0,e.length);else for(var o=0;o<e.length;)n[t++]=e[o++]}};sn.prototype.bytes=function(e){En.isString(e)&&(e=En._Buffer_from(e,"base64"));var n=e.length>>>0;return this.uint32(n),n&&this._push(sn.writeBytesBuffer,n,e),this};function r0(r,e,n){r.length<40?En.utf8.write(r,e,n):e.utf8Write?e.utf8Write(r,n):e.write(r,n)}sn.prototype.string=function(e){var n=En.Buffer.byteLength(e);return this.uint32(n),n&&this._push(r0,n,e),this};sn._configure()});var Us=G((zO,gd)=>{"use strict";gd.exports=ke;var Tt=On(),Gs,hd=Tt.LongBits,o0=Tt.utf8;function vt(r,e){return RangeError("index out of range: "+r.pos+" + "+(e||1)+" > "+r.len)}function ke(r){this.buf=r,this.pos=0,this.len=r.length}var pd=typeof Uint8Array<"u"?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new ke(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new ke(e);throw Error("illegal buffer")},md=function(){return Tt.Buffer?function(n){return(ke.create=function(o){return Tt.Buffer.isBuffer(o)?new Gs(o):pd(o)})(n)}:pd};ke.create=md();ke.prototype._slice=Tt.Array.prototype.subarray||Tt.Array.prototype.slice;ke.prototype.uint32=function(){var e=4294967295;return function(){if(e=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(e=(e|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return e;if((this.pos+=5)>this.len)throw this.pos=this.len,vt(this,10);return e}}();ke.prototype.int32=function(){return this.uint32()|0};ke.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(e&1)|0};function Fs(){var r=new hd(0,0),e=0;if(this.len-this.pos>4){for(;e<4;++e)if(r.lo=(r.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return r;if(r.lo=(r.lo|(this.buf[this.pos]&127)<<28)>>>0,r.hi=(r.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return r;e=0}else{for(;e<3;++e){if(this.pos>=this.len)throw vt(this);if(r.lo=(r.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return r}return r.lo=(r.lo|(this.buf[this.pos++]&127)<<e*7)>>>0,r}if(this.len-this.pos>4){for(;e<5;++e)if(r.hi=(r.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return r}else for(;e<5;++e){if(this.pos>=this.len)throw vt(this);if(r.hi=(r.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return r}throw Error("invalid varint encoding")}ke.prototype.bool=function(){return this.uint32()!==0};function Co(r,e){return(r[e-4]|r[e-3]<<8|r[e-2]<<16|r[e-1]<<24)>>>0}ke.prototype.fixed32=function(){if(this.pos+4>this.len)throw vt(this,4);return Co(this.buf,this.pos+=4)};ke.prototype.sfixed32=function(){if(this.pos+4>this.len)throw vt(this,4);return Co(this.buf,this.pos+=4)|0};function fd(){if(this.pos+8>this.len)throw vt(this,8);return new hd(Co(this.buf,this.pos+=4),Co(this.buf,this.pos+=4))}ke.prototype.float=function(){if(this.pos+4>this.len)throw vt(this,4);var e=Tt.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e};ke.prototype.double=function(){if(this.pos+8>this.len)throw vt(this,4);var e=Tt.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e};ke.prototype.bytes=function(){var e=this.uint32(),n=this.pos,t=this.pos+e;if(t>this.len)throw vt(this,e);if(this.pos+=e,Array.isArray(this.buf))return this.buf.slice(n,t);if(n===t){var o=Tt.Buffer;return o?o.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,n,t)};ke.prototype.string=function(){var e=this.bytes();return o0.read(e,0,e.length)};ke.prototype.skip=function(e){if(typeof e=="number"){if(this.pos+e>this.len)throw vt(this,e);this.pos+=e}else do if(this.pos>=this.len)throw vt(this);while(this.buf[this.pos++]&128);return this};ke.prototype.skipType=function(r){switch(r){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(r=this.uint32()&7)!==4;)this.skipType(r);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+r+" at offset "+this.pos)}return this};ke._configure=function(r){Gs=r,ke.create=md(),Gs._configure();var e=Tt.Long?"toLong":"toNumber";Tt.merge(ke.prototype,{int64:function(){return Fs.call(this)[e](!1)},uint64:function(){return Fs.call(this)[e](!0)},sint64:function(){return Fs.call(this).zzDecode()[e](!1)},fixed64:function(){return fd.call(this)[e](!0)},sfixed64:function(){return fd.call(this)[e](!1)}})}});var xd=G((RO,_d)=>{"use strict";_d.exports=Wn;var yd=Us();(Wn.prototype=Object.create(yd.prototype)).constructor=Wn;var bd=On();function Wn(r){yd.call(this,r)}Wn._configure=function(){bd.Buffer&&(Wn.prototype._slice=bd.Buffer.prototype.slice)};Wn.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+e,this.len))};Wn._configure()});var vd=G((NO,Td)=>{"use strict";Td.exports=Rr;var Ws=On();(Rr.prototype=Object.create(Ws.EventEmitter.prototype)).constructor=Rr;function Rr(r,e,n){if(typeof r!="function")throw TypeError("rpcImpl must be a function");Ws.EventEmitter.call(this),this.rpcImpl=r,this.requestDelimited=!!e,this.responseDelimited=!!n}Rr.prototype.rpcCall=function r(e,n,t,o,i){if(!o)throw TypeError("request must be specified");var a=this;if(!i)return Ws.asPromise(r,a,e,n,t,o);if(!a.rpcImpl){setTimeout(function(){i(Error("already ended"))},0);return}try{return a.rpcImpl(e,n[a.requestDelimited?"encodeDelimited":"encode"](o).finish(),function(u,l){if(u)return a.emit("error",u,e),i(u);if(l===null){a.end(!0);return}if(!(l instanceof t))try{l=t[a.responseDelimited?"decodeDelimited":"decode"](l)}catch(c){return a.emit("error",c,e),i(c)}return a.emit("data",l,e),i(null,l)})}catch(s){a.emit("error",s,e),setTimeout(function(){i(s)},0);return}};Rr.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}});var Id=G(wd=>{"use strict";var i0=wd;i0.Service=vd()});var $d=G((BO,Sd)=>{"use strict";Sd.exports={}});var Od=G(Pd=>{"use strict";var tt=Pd;tt.build="minimal";tt.Writer=Vs();tt.BufferWriter=dd();tt.Reader=Us();tt.BufferReader=xd();tt.util=On();tt.rpc=Id();tt.roots=$d();tt.configure=Ad;function Ad(){tt.util._configure(),tt.Writer._configure(tt.BufferWriter),tt.Reader._configure(tt.BufferReader)}Ad()});var Cd=G((FO,Ed)=>{"use strict";Ed.exports=Od()});var cr=G((GO,Dd)=>{"use strict";var Ie=Cd(),R=Ie.Reader,Le=Ie.Writer,v=Ie.util,x=Ie.roots.default||(Ie.roots.default={});x.onnx=function(){var r={};return r.Version=function(){var e={},n=Object.create(e);return n[e[0]="_START_VERSION"]=0,n[e[1]="IR_VERSION_2017_10_10"]=1,n[e[2]="IR_VERSION_2017_10_30"]=2,n[e[3]="IR_VERSION_2017_11_3"]=3,n[e[4]="IR_VERSION_2019_1_22"]=4,n[e[5]="IR_VERSION_2019_3_18"]=5,n[e[6]="IR_VERSION_2019_9_19"]=6,n[e[7]="IR_VERSION_2020_5_8"]=7,n[e[8]="IR_VERSION_2021_7_30"]=8,n[e[9]="IR_VERSION"]=9,n}(),r.AttributeProto=function(){function e(n){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.refAttrName="",e.prototype.docString="",e.prototype.type=0,e.prototype.f=0,e.prototype.i=v.Long?v.Long.fromBits(0,0,!1):0,e.prototype.s=v.newBuffer([]),e.prototype.t=null,e.prototype.g=null,e.prototype.sparseTensor=null,e.prototype.tp=null,e.prototype.floats=v.emptyArray,e.prototype.ints=v.emptyArray,e.prototype.strings=v.emptyArray,e.prototype.tensors=v.emptyArray,e.prototype.graphs=v.emptyArray,e.prototype.sparseTensors=v.emptyArray,e.prototype.typeProtos=v.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Le.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.f!=null&&Object.hasOwnProperty.call(t,"f")&&o.uint32(21).float(t.f),t.i!=null&&Object.hasOwnProperty.call(t,"i")&&o.uint32(24).int64(t.i),t.s!=null&&Object.hasOwnProperty.call(t,"s")&&o.uint32(34).bytes(t.s),t.t!=null&&Object.hasOwnProperty.call(t,"t")&&x.onnx.TensorProto.encode(t.t,o.uint32(42).fork()).ldelim(),t.g!=null&&Object.hasOwnProperty.call(t,"g")&&x.onnx.GraphProto.encode(t.g,o.uint32(50).fork()).ldelim(),t.floats!=null&&t.floats.length){o.uint32(58).fork();for(var i=0;i<t.floats.length;++i)o.float(t.floats[i]);o.ldelim()}if(t.ints!=null&&t.ints.length){o.uint32(66).fork();for(var i=0;i<t.ints.length;++i)o.int64(t.ints[i]);o.ldelim()}if(t.strings!=null&&t.strings.length)for(var i=0;i<t.strings.length;++i)o.uint32(74).bytes(t.strings[i]);if(t.tensors!=null&&t.tensors.length)for(var i=0;i<t.tensors.length;++i)x.onnx.TensorProto.encode(t.tensors[i],o.uint32(82).fork()).ldelim();if(t.graphs!=null&&t.graphs.length)for(var i=0;i<t.graphs.length;++i)x.onnx.GraphProto.encode(t.graphs[i],o.uint32(90).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(106).string(t.docString),t.tp!=null&&Object.hasOwnProperty.call(t,"tp")&&x.onnx.TypeProto.encode(t.tp,o.uint32(114).fork()).ldelim(),t.typeProtos!=null&&t.typeProtos.length)for(var i=0;i<t.typeProtos.length;++i)x.onnx.TypeProto.encode(t.typeProtos[i],o.uint32(122).fork()).ldelim();if(t.type!=null&&Object.hasOwnProperty.call(t,"type")&&o.uint32(160).int32(t.type),t.refAttrName!=null&&Object.hasOwnProperty.call(t,"refAttrName")&&o.uint32(170).string(t.refAttrName),t.sparseTensor!=null&&Object.hasOwnProperty.call(t,"sparseTensor")&&x.onnx.SparseTensorProto.encode(t.sparseTensor,o.uint32(178).fork()).ldelim(),t.sparseTensors!=null&&t.sparseTensors.length)for(var i=0;i<t.sparseTensors.length;++i)x.onnx.SparseTensorProto.encode(t.sparseTensors[i],o.uint32(186).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new x.onnx.AttributeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 21:{a.refAttrName=t.string();break}case 13:{a.docString=t.string();break}case 20:{a.type=t.int32();break}case 2:{a.f=t.float();break}case 3:{a.i=t.int64();break}case 4:{a.s=t.bytes();break}case 5:{a.t=x.onnx.TensorProto.decode(t,t.uint32());break}case 6:{a.g=x.onnx.GraphProto.decode(t,t.uint32());break}case 22:{a.sparseTensor=x.onnx.SparseTensorProto.decode(t,t.uint32());break}case 14:{a.tp=x.onnx.TypeProto.decode(t,t.uint32());break}case 7:{if(a.floats&&a.floats.length||(a.floats=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.floats.push(t.float());else a.floats.push(t.float());break}case 8:{if(a.ints&&a.ints.length||(a.ints=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.ints.push(t.int64());else a.ints.push(t.int64());break}case 9:{a.strings&&a.strings.length||(a.strings=[]),a.strings.push(t.bytes());break}case 10:{a.tensors&&a.tensors.length||(a.tensors=[]),a.tensors.push(x.onnx.TensorProto.decode(t,t.uint32()));break}case 11:{a.graphs&&a.graphs.length||(a.graphs=[]),a.graphs.push(x.onnx.GraphProto.decode(t,t.uint32()));break}case 23:{a.sparseTensors&&a.sparseTensors.length||(a.sparseTensors=[]),a.sparseTensors.push(x.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 15:{a.typeProtos&&a.typeProtos.length||(a.typeProtos=[]),a.typeProtos.push(x.onnx.TypeProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!v.isString(t.name))return"name: string expected";if(t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&!v.isString(t.refAttrName))return"refAttrName: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!v.isString(t.docString))return"docString: string expected";if(t.type!=null&&t.hasOwnProperty("type"))switch(t.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:break}if(t.f!=null&&t.hasOwnProperty("f")&&typeof t.f!="number")return"f: number expected";if(t.i!=null&&t.hasOwnProperty("i")&&!v.isInteger(t.i)&&!(t.i&&v.isInteger(t.i.low)&&v.isInteger(t.i.high)))return"i: integer|Long expected";if(t.s!=null&&t.hasOwnProperty("s")&&!(t.s&&typeof t.s.length=="number"||v.isString(t.s)))return"s: buffer expected";if(t.t!=null&&t.hasOwnProperty("t")){var o=x.onnx.TensorProto.verify(t.t);if(o)return"t."+o}if(t.g!=null&&t.hasOwnProperty("g")){var o=x.onnx.GraphProto.verify(t.g);if(o)return"g."+o}if(t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")){var o=x.onnx.SparseTensorProto.verify(t.sparseTensor);if(o)return"sparseTensor."+o}if(t.tp!=null&&t.hasOwnProperty("tp")){var o=x.onnx.TypeProto.verify(t.tp);if(o)return"tp."+o}if(t.floats!=null&&t.hasOwnProperty("floats")){if(!Array.isArray(t.floats))return"floats: array expected";for(var i=0;i<t.floats.length;++i)if(typeof t.floats[i]!="number")return"floats: number[] expected"}if(t.ints!=null&&t.hasOwnProperty("ints")){if(!Array.isArray(t.ints))return"ints: array expected";for(var i=0;i<t.ints.length;++i)if(!v.isInteger(t.ints[i])&&!(t.ints[i]&&v.isInteger(t.ints[i].low)&&v.isInteger(t.ints[i].high)))return"ints: integer|Long[] expected"}if(t.strings!=null&&t.hasOwnProperty("strings")){if(!Array.isArray(t.strings))return"strings: array expected";for(var i=0;i<t.strings.length;++i)if(!(t.strings[i]&&typeof t.strings[i].length=="number"||v.isString(t.strings[i])))return"strings: buffer[] expected"}if(t.tensors!=null&&t.hasOwnProperty("tensors")){if(!Array.isArray(t.tensors))return"tensors: array expected";for(var i=0;i<t.tensors.length;++i){var o=x.onnx.TensorProto.verify(t.tensors[i]);if(o)return"tensors."+o}}if(t.graphs!=null&&t.hasOwnProperty("graphs")){if(!Array.isArray(t.graphs))return"graphs: array expected";for(var i=0;i<t.graphs.length;++i){var o=x.onnx.GraphProto.verify(t.graphs[i]);if(o)return"graphs."+o}}if(t.sparseTensors!=null&&t.hasOwnProperty("sparseTensors")){if(!Array.isArray(t.sparseTensors))return"sparseTensors: array expected";for(var i=0;i<t.sparseTensors.length;++i){var o=x.onnx.SparseTensorProto.verify(t.sparseTensors[i]);if(o)return"sparseTensors."+o}}if(t.typeProtos!=null&&t.hasOwnProperty("typeProtos")){if(!Array.isArray(t.typeProtos))return"typeProtos: array expected";for(var i=0;i<t.typeProtos.length;++i){var o=x.onnx.TypeProto.verify(t.typeProtos[i]);if(o)return"typeProtos."+o}}return null},e.fromObject=function(t){if(t instanceof x.onnx.AttributeProto)return t;var o=new x.onnx.AttributeProto;switch(t.name!=null&&(o.name=String(t.name)),t.refAttrName!=null&&(o.refAttrName=String(t.refAttrName)),t.docString!=null&&(o.docString=String(t.docString)),t.type){default:if(typeof t.type=="number"){o.type=t.type;break}break;case"UNDEFINED":case 0:o.type=0;break;case"FLOAT":case 1:o.type=1;break;case"INT":case 2:o.type=2;break;case"STRING":case 3:o.type=3;break;case"TENSOR":case 4:o.type=4;break;case"GRAPH":case 5:o.type=5;break;case"SPARSE_TENSOR":case 11:o.type=11;break;case"TYPE_PROTO":case 13:o.type=13;break;case"FLOATS":case 6:o.type=6;break;case"INTS":case 7:o.type=7;break;case"STRINGS":case 8:o.type=8;break;case"TENSORS":case 9:o.type=9;break;case"GRAPHS":case 10:o.type=10;break;case"SPARSE_TENSORS":case 12:o.type=12;break;case"TYPE_PROTOS":case 14:o.type=14;break}if(t.f!=null&&(o.f=Number(t.f)),t.i!=null&&(v.Long?(o.i=v.Long.fromValue(t.i)).unsigned=!1:typeof t.i=="string"?o.i=parseInt(t.i,10):typeof t.i=="number"?o.i=t.i:typeof t.i=="object"&&(o.i=new v.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber())),t.s!=null&&(typeof t.s=="string"?v.base64.decode(t.s,o.s=v.newBuffer(v.base64.length(t.s)),0):t.s.length>=0&&(o.s=t.s)),t.t!=null){if(typeof t.t!="object")throw TypeError(".onnx.AttributeProto.t: object expected");o.t=x.onnx.TensorProto.fromObject(t.t)}if(t.g!=null){if(typeof t.g!="object")throw TypeError(".onnx.AttributeProto.g: object expected");o.g=x.onnx.GraphProto.fromObject(t.g)}if(t.sparseTensor!=null){if(typeof t.sparseTensor!="object")throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");o.sparseTensor=x.onnx.SparseTensorProto.fromObject(t.sparseTensor)}if(t.tp!=null){if(typeof t.tp!="object")throw TypeError(".onnx.AttributeProto.tp: object expected");o.tp=x.onnx.TypeProto.fromObject(t.tp)}if(t.floats){if(!Array.isArray(t.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");o.floats=[];for(var i=0;i<t.floats.length;++i)o.floats[i]=Number(t.floats[i])}if(t.ints){if(!Array.isArray(t.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");o.ints=[];for(var i=0;i<t.ints.length;++i)v.Long?(o.ints[i]=v.Long.fromValue(t.ints[i])).unsigned=!1:typeof t.ints[i]=="string"?o.ints[i]=parseInt(t.ints[i],10):typeof t.ints[i]=="number"?o.ints[i]=t.ints[i]:typeof t.ints[i]=="object"&&(o.ints[i]=new v.LongBits(t.ints[i].low>>>0,t.ints[i].high>>>0).toNumber())}if(t.strings){if(!Array.isArray(t.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");o.strings=[];for(var i=0;i<t.strings.length;++i)typeof t.strings[i]=="string"?v.base64.decode(t.strings[i],o.strings[i]=v.newBuffer(v.base64.length(t.strings[i])),0):t.strings[i].length>=0&&(o.strings[i]=t.strings[i])}if(t.tensors){if(!Array.isArray(t.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");o.tensors=[];for(var i=0;i<t.tensors.length;++i){if(typeof t.tensors[i]!="object")throw TypeError(".onnx.AttributeProto.tensors: object expected");o.tensors[i]=x.onnx.TensorProto.fromObject(t.tensors[i])}}if(t.graphs){if(!Array.isArray(t.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");o.graphs=[];for(var i=0;i<t.graphs.length;++i){if(typeof t.graphs[i]!="object")throw TypeError(".onnx.AttributeProto.graphs: object expected");o.graphs[i]=x.onnx.GraphProto.fromObject(t.graphs[i])}}if(t.sparseTensors){if(!Array.isArray(t.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");o.sparseTensors=[];for(var i=0;i<t.sparseTensors.length;++i){if(typeof t.sparseTensors[i]!="object")throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");o.sparseTensors[i]=x.onnx.SparseTensorProto.fromObject(t.sparseTensors[i])}}if(t.typeProtos){if(!Array.isArray(t.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");o.typeProtos=[];for(var i=0;i<t.typeProtos.length;++i){if(typeof t.typeProtos[i]!="object")throw TypeError(".onnx.AttributeProto.typeProtos: object expected");o.typeProtos[i]=x.onnx.TypeProto.fromObject(t.typeProtos[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.floats=[],i.ints=[],i.strings=[],i.tensors=[],i.graphs=[],i.typeProtos=[],i.sparseTensors=[]),o.defaults){if(i.name="",i.f=0,v.Long){var a=new v.Long(0,0,!1);i.i=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.i=o.longs===String?"0":0;o.bytes===String?i.s="":(i.s=[],o.bytes!==Array&&(i.s=v.newBuffer(i.s))),i.t=null,i.g=null,i.docString="",i.tp=null,i.type=o.enums===String?"UNDEFINED":0,i.refAttrName="",i.sparseTensor=null}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.f!=null&&t.hasOwnProperty("f")&&(i.f=o.json&&!isFinite(t.f)?String(t.f):t.f),t.i!=null&&t.hasOwnProperty("i")&&(typeof t.i=="number"?i.i=o.longs===String?String(t.i):t.i:i.i=o.longs===String?v.Long.prototype.toString.call(t.i):o.longs===Number?new v.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber():t.i),t.s!=null&&t.hasOwnProperty("s")&&(i.s=o.bytes===String?v.base64.encode(t.s,0,t.s.length):o.bytes===Array?Array.prototype.slice.call(t.s):t.s),t.t!=null&&t.hasOwnProperty("t")&&(i.t=x.onnx.TensorProto.toObject(t.t,o)),t.g!=null&&t.hasOwnProperty("g")&&(i.g=x.onnx.GraphProto.toObject(t.g,o)),t.floats&&t.floats.length){i.floats=[];for(var s=0;s<t.floats.length;++s)i.floats[s]=o.json&&!isFinite(t.floats[s])?String(t.floats[s]):t.floats[s]}if(t.ints&&t.ints.length){i.ints=[];for(var s=0;s<t.ints.length;++s)typeof t.ints[s]=="number"?i.ints[s]=o.longs===String?String(t.ints[s]):t.ints[s]:i.ints[s]=o.longs===String?v.Long.prototype.toString.call(t.ints[s]):o.longs===Number?new v.LongBits(t.ints[s].low>>>0,t.ints[s].high>>>0).toNumber():t.ints[s]}if(t.strings&&t.strings.length){i.strings=[];for(var s=0;s<t.strings.length;++s)i.strings[s]=o.bytes===String?v.base64.encode(t.strings[s],0,t.strings[s].length):o.bytes===Array?Array.prototype.slice.call(t.strings[s]):t.strings[s]}if(t.tensors&&t.tensors.length){i.tensors=[];for(var s=0;s<t.tensors.length;++s)i.tensors[s]=x.onnx.TensorProto.toObject(t.tensors[s],o)}if(t.graphs&&t.graphs.length){i.graphs=[];for(var s=0;s<t.graphs.length;++s)i.graphs[s]=x.onnx.GraphProto.toObject(t.graphs[s],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.tp!=null&&t.hasOwnProperty("tp")&&(i.tp=x.onnx.TypeProto.toObject(t.tp,o)),t.typeProtos&&t.typeProtos.length){i.typeProtos=[];for(var s=0;s<t.typeProtos.length;++s)i.typeProtos[s]=x.onnx.TypeProto.toObject(t.typeProtos[s],o)}if(t.type!=null&&t.hasOwnProperty("type")&&(i.type=o.enums===String?x.onnx.AttributeProto.AttributeType[t.type]===void 0?t.type:x.onnx.AttributeProto.AttributeType[t.type]:t.type),t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&(i.refAttrName=t.refAttrName),t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")&&(i.sparseTensor=x.onnx.SparseTensorProto.toObject(t.sparseTensor,o)),t.sparseTensors&&t.sparseTensors.length){i.sparseTensors=[];for(var s=0;s<t.sparseTensors.length;++s)i.sparseTensors[s]=x.onnx.SparseTensorProto.toObject(t.sparseTensors[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ie.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.AttributeProto"},e.AttributeType=function(){var n={},t=Object.create(n);return t[n[0]="UNDEFINED"]=0,t[n[1]="FLOAT"]=1,t[n[2]="INT"]=2,t[n[3]="STRING"]=3,t[n[4]="TENSOR"]=4,t[n[5]="GRAPH"]=5,t[n[11]="SPARSE_TENSOR"]=11,t[n[13]="TYPE_PROTO"]=13,t[n[6]="FLOATS"]=6,t[n[7]="INTS"]=7,t[n[8]="STRINGS"]=8,t[n[9]="TENSORS"]=9,t[n[10]="GRAPHS"]=10,t[n[12]="SPARSE_TENSORS"]=12,t[n[14]="TYPE_PROTOS"]=14,t}(),e}(),r.ValueInfoProto=function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.type=null,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Le.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.type!=null&&Object.hasOwnProperty.call(t,"type")&&x.onnx.TypeProto.encode(t.type,o.uint32(18).fork()).ldelim(),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(26).string(t.docString),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new x.onnx.ValueInfoProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 2:{a.type=x.onnx.TypeProto.decode(t,t.uint32());break}case 3:{a.docString=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!v.isString(t.name))return"name: string expected";if(t.type!=null&&t.hasOwnProperty("type")){var o=x.onnx.TypeProto.verify(t.type);if(o)return"type."+o}return t.docString!=null&&t.hasOwnProperty("docString")&&!v.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof x.onnx.ValueInfoProto)return t;var o=new x.onnx.ValueInfoProto;if(t.name!=null&&(o.name=String(t.name)),t.type!=null){if(typeof t.type!="object")throw TypeError(".onnx.ValueInfoProto.type: object expected");o.type=x.onnx.TypeProto.fromObject(t.type)}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.name="",i.type=null,i.docString=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.type!=null&&t.hasOwnProperty("type")&&(i.type=x.onnx.TypeProto.toObject(t.type,o)),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ie.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ValueInfoProto"},e}(),r.NodeProto=function(){function e(n){if(this.input=[],this.output=[],this.attribute=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.input=v.emptyArray,e.prototype.output=v.emptyArray,e.prototype.name="",e.prototype.opType="",e.prototype.domain="",e.prototype.attribute=v.emptyArray,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Le.create()),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(10).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(18).string(t.output[i]);if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(26).string(t.name),t.opType!=null&&Object.hasOwnProperty.call(t,"opType")&&o.uint32(34).string(t.opType),t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)x.onnx.AttributeProto.encode(t.attribute[i],o.uint32(42).fork()).ldelim();return t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(58).string(t.domain),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new x.onnx.NodeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.input&&a.input.length||(a.input=[]),a.input.push(t.string());break}case 2:{a.output&&a.output.length||(a.output=[]),a.output.push(t.string());break}case 3:{a.name=t.string();break}case 4:{a.opType=t.string();break}case 7:{a.domain=t.string();break}case 5:{a.attribute&&a.attribute.length||(a.attribute=[]),a.attribute.push(x.onnx.AttributeProto.decode(t,t.uint32()));break}case 6:{a.docString=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!v.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!v.isString(t.output[o]))return"output: string[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!v.isString(t.name))return"name: string expected";if(t.opType!=null&&t.hasOwnProperty("opType")&&!v.isString(t.opType))return"opType: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!v.isString(t.domain))return"domain: string expected";if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o){var i=x.onnx.AttributeProto.verify(t.attribute[o]);if(i)return"attribute."+i}}return t.docString!=null&&t.hasOwnProperty("docString")&&!v.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof x.onnx.NodeProto)return t;var o=new x.onnx.NodeProto;if(t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.NodeProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.NodeProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.name!=null&&(o.name=String(t.name)),t.opType!=null&&(o.opType=String(t.opType)),t.domain!=null&&(o.domain=String(t.domain)),t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i){if(typeof t.attribute[i]!="object")throw TypeError(".onnx.NodeProto.attribute: object expected");o.attribute[i]=x.onnx.AttributeProto.fromObject(t.attribute[i])}}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[]),o.defaults&&(i.name="",i.opType="",i.docString="",i.domain=""),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=t.input[a]}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=t.output[a]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.opType!=null&&t.hasOwnProperty("opType")&&(i.opType=t.opType),t.attribute&&t.attribute.length){i.attribute=[];for(var a=0;a<t.attribute.length;++a)i.attribute[a]=x.onnx.AttributeProto.toObject(t.attribute[a],o)}return t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ie.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.NodeProto"},e}(),r.TrainingInfoProto=function(){function e(n){if(this.initializationBinding=[],this.updateBinding=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.initialization=null,e.prototype.algorithm=null,e.prototype.initializationBinding=v.emptyArray,e.prototype.updateBinding=v.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Le.create()),t.initialization!=null&&Object.hasOwnProperty.call(t,"initialization")&&x.onnx.GraphProto.encode(t.initialization,o.uint32(10).fork()).ldelim(),t.algorithm!=null&&Object.hasOwnProperty.call(t,"algorithm")&&x.onnx.GraphProto.encode(t.algorithm,o.uint32(18).fork()).ldelim(),t.initializationBinding!=null&&t.initializationBinding.length)for(var i=0;i<t.initializationBinding.length;++i)x.onnx.StringStringEntryProto.encode(t.initializationBinding[i],o.uint32(26).fork()).ldelim();if(t.updateBinding!=null&&t.updateBinding.length)for(var i=0;i<t.updateBinding.length;++i)x.onnx.StringStringEntryProto.encode(t.updateBinding[i],o.uint32(34).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new x.onnx.TrainingInfoProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.initialization=x.onnx.GraphProto.decode(t,t.uint32());break}case 2:{a.algorithm=x.onnx.GraphProto.decode(t,t.uint32());break}case 3:{a.initializationBinding&&a.initializationBinding.length||(a.initializationBinding=[]),a.initializationBinding.push(x.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 4:{a.updateBinding&&a.updateBinding.length||(a.updateBinding=[]),a.updateBinding.push(x.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.initialization!=null&&t.hasOwnProperty("initialization")){var o=x.onnx.GraphProto.verify(t.initialization);if(o)return"initialization."+o}if(t.algorithm!=null&&t.hasOwnProperty("algorithm")){var o=x.onnx.GraphProto.verify(t.algorithm);if(o)return"algorithm."+o}if(t.initializationBinding!=null&&t.hasOwnProperty("initializationBinding")){if(!Array.isArray(t.initializationBinding))return"initializationBinding: array expected";for(var i=0;i<t.initializationBinding.length;++i){var o=x.onnx.StringStringEntryProto.verify(t.initializationBinding[i]);if(o)return"initializationBinding."+o}}if(t.updateBinding!=null&&t.hasOwnProperty("updateBinding")){if(!Array.isArray(t.updateBinding))return"updateBinding: array expected";for(var i=0;i<t.updateBinding.length;++i){var o=x.onnx.StringStringEntryProto.verify(t.updateBinding[i]);if(o)return"updateBinding."+o}}return null},e.fromObject=function(t){if(t instanceof x.onnx.TrainingInfoProto)return t;var o=new x.onnx.TrainingInfoProto;if(t.initialization!=null){if(typeof t.initialization!="object")throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");o.initialization=x.onnx.GraphProto.fromObject(t.initialization)}if(t.algorithm!=null){if(typeof t.algorithm!="object")throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");o.algorithm=x.onnx.GraphProto.fromObject(t.algorithm)}if(t.initializationBinding){if(!Array.isArray(t.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");o.initializationBinding=[];for(var i=0;i<t.initializationBinding.length;++i){if(typeof t.initializationBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");o.initializationBinding[i]=x.onnx.StringStringEntryProto.fromObject(t.initializationBinding[i])}}if(t.updateBinding){if(!Array.isArray(t.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");o.updateBinding=[];for(var i=0;i<t.updateBinding.length;++i){if(typeof t.updateBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");o.updateBinding[i]=x.onnx.StringStringEntryProto.fromObject(t.updateBinding[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.initializationBinding=[],i.updateBinding=[]),o.defaults&&(i.initialization=null,i.algorithm=null),t.initialization!=null&&t.hasOwnProperty("initialization")&&(i.initialization=x.onnx.GraphProto.toObject(t.initialization,o)),t.algorithm!=null&&t.hasOwnProperty("algorithm")&&(i.algorithm=x.onnx.GraphProto.toObject(t.algorithm,o)),t.initializationBinding&&t.initializationBinding.length){i.initializationBinding=[];for(var a=0;a<t.initializationBinding.length;++a)i.initializationBinding[a]=x.onnx.StringStringEntryProto.toObject(t.initializationBinding[a],o)}if(t.updateBinding&&t.updateBinding.length){i.updateBinding=[];for(var a=0;a<t.updateBinding.length;++a)i.updateBinding[a]=x.onnx.StringStringEntryProto.toObject(t.updateBinding[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ie.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TrainingInfoProto"},e}(),r.ModelProto=function(){function e(n){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.irVersion=v.Long?v.Long.fromBits(0,0,!1):0,e.prototype.opsetImport=v.emptyArray,e.prototype.producerName="",e.prototype.producerVersion="",e.prototype.domain="",e.prototype.modelVersion=v.Long?v.Long.fromBits(0,0,!1):0,e.prototype.docString="",e.prototype.graph=null,e.prototype.metadataProps=v.emptyArray,e.prototype.trainingInfo=v.emptyArray,e.prototype.functions=v.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Le.create()),t.irVersion!=null&&Object.hasOwnProperty.call(t,"irVersion")&&o.uint32(8).int64(t.irVersion),t.producerName!=null&&Object.hasOwnProperty.call(t,"producerName")&&o.uint32(18).string(t.producerName),t.producerVersion!=null&&Object.hasOwnProperty.call(t,"producerVersion")&&o.uint32(26).string(t.producerVersion),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(34).string(t.domain),t.modelVersion!=null&&Object.hasOwnProperty.call(t,"modelVersion")&&o.uint32(40).int64(t.modelVersion),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.graph!=null&&Object.hasOwnProperty.call(t,"graph")&&x.onnx.GraphProto.encode(t.graph,o.uint32(58).fork()).ldelim(),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)x.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(66).fork()).ldelim();if(t.metadataProps!=null&&t.metadataProps.length)for(var i=0;i<t.metadataProps.length;++i)x.onnx.StringStringEntryProto.encode(t.metadataProps[i],o.uint32(114).fork()).ldelim();if(t.trainingInfo!=null&&t.trainingInfo.length)for(var i=0;i<t.trainingInfo.length;++i)x.onnx.TrainingInfoProto.encode(t.trainingInfo[i],o.uint32(162).fork()).ldelim();if(t.functions!=null&&t.functions.length)for(var i=0;i<t.functions.length;++i)x.onnx.FunctionProto.encode(t.functions[i],o.uint32(202).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new x.onnx.ModelProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.irVersion=t.int64();break}case 8:{a.opsetImport&&a.opsetImport.length||(a.opsetImport=[]),a.opsetImport.push(x.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 2:{a.producerName=t.string();break}case 3:{a.producerVersion=t.string();break}case 4:{a.domain=t.string();break}case 5:{a.modelVersion=t.int64();break}case 6:{a.docString=t.string();break}case 7:{a.graph=x.onnx.GraphProto.decode(t,t.uint32());break}case 14:{a.metadataProps&&a.metadataProps.length||(a.metadataProps=[]),a.metadataProps.push(x.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 20:{a.trainingInfo&&a.trainingInfo.length||(a.trainingInfo=[]),a.trainingInfo.push(x.onnx.TrainingInfoProto.decode(t,t.uint32()));break}case 25:{a.functions&&a.functions.length||(a.functions=[]),a.functions.push(x.onnx.FunctionProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&!v.isInteger(t.irVersion)&&!(t.irVersion&&v.isInteger(t.irVersion.low)&&v.isInteger(t.irVersion.high)))return"irVersion: integer|Long expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=x.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}if(t.producerName!=null&&t.hasOwnProperty("producerName")&&!v.isString(t.producerName))return"producerName: string expected";if(t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&!v.isString(t.producerVersion))return"producerVersion: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!v.isString(t.domain))return"domain: string expected";if(t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&!v.isInteger(t.modelVersion)&&!(t.modelVersion&&v.isInteger(t.modelVersion.low)&&v.isInteger(t.modelVersion.high)))return"modelVersion: integer|Long expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!v.isString(t.docString))return"docString: string expected";if(t.graph!=null&&t.hasOwnProperty("graph")){var i=x.onnx.GraphProto.verify(t.graph);if(i)return"graph."+i}if(t.metadataProps!=null&&t.hasOwnProperty("metadataProps")){if(!Array.isArray(t.metadataProps))return"metadataProps: array expected";for(var o=0;o<t.metadataProps.length;++o){var i=x.onnx.StringStringEntryProto.verify(t.metadataProps[o]);if(i)return"metadataProps."+i}}if(t.trainingInfo!=null&&t.hasOwnProperty("trainingInfo")){if(!Array.isArray(t.trainingInfo))return"trainingInfo: array expected";for(var o=0;o<t.trainingInfo.length;++o){var i=x.onnx.TrainingInfoProto.verify(t.trainingInfo[o]);if(i)return"trainingInfo."+i}}if(t.functions!=null&&t.hasOwnProperty("functions")){if(!Array.isArray(t.functions))return"functions: array expected";for(var o=0;o<t.functions.length;++o){var i=x.onnx.FunctionProto.verify(t.functions[o]);if(i)return"functions."+i}}return null},e.fromObject=function(t){if(t instanceof x.onnx.ModelProto)return t;var o=new x.onnx.ModelProto;if(t.irVersion!=null&&(v.Long?(o.irVersion=v.Long.fromValue(t.irVersion)).unsigned=!1:typeof t.irVersion=="string"?o.irVersion=parseInt(t.irVersion,10):typeof t.irVersion=="number"?o.irVersion=t.irVersion:typeof t.irVersion=="object"&&(o.irVersion=new v.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber())),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.ModelProto.opsetImport: object expected");o.opsetImport[i]=x.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}if(t.producerName!=null&&(o.producerName=String(t.producerName)),t.producerVersion!=null&&(o.producerVersion=String(t.producerVersion)),t.domain!=null&&(o.domain=String(t.domain)),t.modelVersion!=null&&(v.Long?(o.modelVersion=v.Long.fromValue(t.modelVersion)).unsigned=!1:typeof t.modelVersion=="string"?o.modelVersion=parseInt(t.modelVersion,10):typeof t.modelVersion=="number"?o.modelVersion=t.modelVersion:typeof t.modelVersion=="object"&&(o.modelVersion=new v.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber())),t.docString!=null&&(o.docString=String(t.docString)),t.graph!=null){if(typeof t.graph!="object")throw TypeError(".onnx.ModelProto.graph: object expected");o.graph=x.onnx.GraphProto.fromObject(t.graph)}if(t.metadataProps){if(!Array.isArray(t.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");o.metadataProps=[];for(var i=0;i<t.metadataProps.length;++i){if(typeof t.metadataProps[i]!="object")throw TypeError(".onnx.ModelProto.metadataProps: object expected");o.metadataProps[i]=x.onnx.StringStringEntryProto.fromObject(t.metadataProps[i])}}if(t.trainingInfo){if(!Array.isArray(t.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");o.trainingInfo=[];for(var i=0;i<t.trainingInfo.length;++i){if(typeof t.trainingInfo[i]!="object")throw TypeError(".onnx.ModelProto.trainingInfo: object expected");o.trainingInfo[i]=x.onnx.TrainingInfoProto.fromObject(t.trainingInfo[i])}}if(t.functions){if(!Array.isArray(t.functions))throw TypeError(".onnx.ModelProto.functions: array expected");o.functions=[];for(var i=0;i<t.functions.length;++i){if(typeof t.functions[i]!="object")throw TypeError(".onnx.ModelProto.functions: object expected");o.functions[i]=x.onnx.FunctionProto.fromObject(t.functions[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.opsetImport=[],i.metadataProps=[],i.trainingInfo=[],i.functions=[]),o.defaults){if(v.Long){var a=new v.Long(0,0,!1);i.irVersion=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.irVersion=o.longs===String?"0":0;if(i.producerName="",i.producerVersion="",i.domain="",v.Long){var a=new v.Long(0,0,!1);i.modelVersion=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.modelVersion=o.longs===String?"0":0;i.docString="",i.graph=null}if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&(typeof t.irVersion=="number"?i.irVersion=o.longs===String?String(t.irVersion):t.irVersion:i.irVersion=o.longs===String?v.Long.prototype.toString.call(t.irVersion):o.longs===Number?new v.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber():t.irVersion),t.producerName!=null&&t.hasOwnProperty("producerName")&&(i.producerName=t.producerName),t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&(i.producerVersion=t.producerVersion),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&(typeof t.modelVersion=="number"?i.modelVersion=o.longs===String?String(t.modelVersion):t.modelVersion:i.modelVersion=o.longs===String?v.Long.prototype.toString.call(t.modelVersion):o.longs===Number?new v.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber():t.modelVersion),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.graph!=null&&t.hasOwnProperty("graph")&&(i.graph=x.onnx.GraphProto.toObject(t.graph,o)),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var s=0;s<t.opsetImport.length;++s)i.opsetImport[s]=x.onnx.OperatorSetIdProto.toObject(t.opsetImport[s],o)}if(t.metadataProps&&t.metadataProps.length){i.metadataProps=[];for(var s=0;s<t.metadataProps.length;++s)i.metadataProps[s]=x.onnx.StringStringEntryProto.toObject(t.metadataProps[s],o)}if(t.trainingInfo&&t.trainingInfo.length){i.trainingInfo=[];for(var s=0;s<t.trainingInfo.length;++s)i.trainingInfo[s]=x.onnx.TrainingInfoProto.toObject(t.trainingInfo[s],o)}if(t.functions&&t.functions.length){i.functions=[];for(var s=0;s<t.functions.length;++s)i.functions[s]=x.onnx.FunctionProto.toObject(t.functions[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ie.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ModelProto"},e}(),r.StringStringEntryProto=function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.key="",e.prototype.value="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Le.create()),t.key!=null&&Object.hasOwnProperty.call(t,"key")&&o.uint32(10).string(t.key),t.value!=null&&Object.hasOwnProperty.call(t,"value")&&o.uint32(18).string(t.value),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new x.onnx.StringStringEntryProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.key=t.string();break}case 2:{a.value=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.key!=null&&t.hasOwnProperty("key")&&!v.isString(t.key)?"key: string expected":t.value!=null&&t.hasOwnProperty("value")&&!v.isString(t.value)?"value: string expected":null},e.fromObject=function(t){if(t instanceof x.onnx.StringStringEntryProto)return t;var o=new x.onnx.StringStringEntryProto;return t.key!=null&&(o.key=String(t.key)),t.value!=null&&(o.value=String(t.value)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.key="",i.value=""),t.key!=null&&t.hasOwnProperty("key")&&(i.key=t.key),t.value!=null&&t.hasOwnProperty("value")&&(i.value=t.value),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ie.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.StringStringEntryProto"},e}(),r.TensorAnnotation=function(){function e(n){if(this.quantParameterTensorNames=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.tensorName="",e.prototype.quantParameterTensorNames=v.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Le.create()),t.tensorName!=null&&Object.hasOwnProperty.call(t,"tensorName")&&o.uint32(10).string(t.tensorName),t.quantParameterTensorNames!=null&&t.quantParameterTensorNames.length)for(var i=0;i<t.quantParameterTensorNames.length;++i)x.onnx.StringStringEntryProto.encode(t.quantParameterTensorNames[i],o.uint32(18).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new x.onnx.TensorAnnotation;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.tensorName=t.string();break}case 2:{a.quantParameterTensorNames&&a.quantParameterTensorNames.length||(a.quantParameterTensorNames=[]),a.quantParameterTensorNames.push(x.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.tensorName!=null&&t.hasOwnProperty("tensorName")&&!v.isString(t.tensorName))return"tensorName: string expected";if(t.quantParameterTensorNames!=null&&t.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(t.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var o=0;o<t.quantParameterTensorNames.length;++o){var i=x.onnx.StringStringEntryProto.verify(t.quantParameterTensorNames[o]);if(i)return"quantParameterTensorNames."+i}}return null},e.fromObject=function(t){if(t instanceof x.onnx.TensorAnnotation)return t;var o=new x.onnx.TensorAnnotation;if(t.tensorName!=null&&(o.tensorName=String(t.tensorName)),t.quantParameterTensorNames){if(!Array.isArray(t.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");o.quantParameterTensorNames=[];for(var i=0;i<t.quantParameterTensorNames.length;++i){if(typeof t.quantParameterTensorNames[i]!="object")throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");o.quantParameterTensorNames[i]=x.onnx.StringStringEntryProto.fromObject(t.quantParameterTensorNames[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.quantParameterTensorNames=[]),o.defaults&&(i.tensorName=""),t.tensorName!=null&&t.hasOwnProperty("tensorName")&&(i.tensorName=t.tensorName),t.quantParameterTensorNames&&t.quantParameterTensorNames.length){i.quantParameterTensorNames=[];for(var a=0;a<t.quantParameterTensorNames.length;++a)i.quantParameterTensorNames[a]=x.onnx.StringStringEntryProto.toObject(t.quantParameterTensorNames[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ie.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorAnnotation"},e}(),r.GraphProto=function(){function e(n){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.node=v.emptyArray,e.prototype.name="",e.prototype.initializer=v.emptyArray,e.prototype.sparseInitializer=v.emptyArray,e.prototype.docString="",e.prototype.input=v.emptyArray,e.prototype.output=v.emptyArray,e.prototype.valueInfo=v.emptyArray,e.prototype.quantizationAnnotation=v.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Le.create()),t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)x.onnx.NodeProto.encode(t.node[i],o.uint32(10).fork()).ldelim();if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(18).string(t.name),t.initializer!=null&&t.initializer.length)for(var i=0;i<t.initializer.length;++i)x.onnx.TensorProto.encode(t.initializer[i],o.uint32(42).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(82).string(t.docString),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)x.onnx.ValueInfoProto.encode(t.input[i],o.uint32(90).fork()).ldelim();if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)x.onnx.ValueInfoProto.encode(t.output[i],o.uint32(98).fork()).ldelim();if(t.valueInfo!=null&&t.valueInfo.length)for(var i=0;i<t.valueInfo.length;++i)x.onnx.ValueInfoProto.encode(t.valueInfo[i],o.uint32(106).fork()).ldelim();if(t.quantizationAnnotation!=null&&t.quantizationAnnotation.length)for(var i=0;i<t.quantizationAnnotation.length;++i)x.onnx.TensorAnnotation.encode(t.quantizationAnnotation[i],o.uint32(114).fork()).ldelim();if(t.sparseInitializer!=null&&t.sparseInitializer.length)for(var i=0;i<t.sparseInitializer.length;++i)x.onnx.SparseTensorProto.encode(t.sparseInitializer[i],o.uint32(122).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new x.onnx.GraphProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.node&&a.node.length||(a.node=[]),a.node.push(x.onnx.NodeProto.decode(t,t.uint32()));break}case 2:{a.name=t.string();break}case 5:{a.initializer&&a.initializer.length||(a.initializer=[]),a.initializer.push(x.onnx.TensorProto.decode(t,t.uint32()));break}case 15:{a.sparseInitializer&&a.sparseInitializer.length||(a.sparseInitializer=[]),a.sparseInitializer.push(x.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 10:{a.docString=t.string();break}case 11:{a.input&&a.input.length||(a.input=[]),a.input.push(x.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 12:{a.output&&a.output.length||(a.output=[]),a.output.push(x.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 13:{a.valueInfo&&a.valueInfo.length||(a.valueInfo=[]),a.valueInfo.push(x.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 14:{a.quantizationAnnotation&&a.quantizationAnnotation.length||(a.quantizationAnnotation=[]),a.quantizationAnnotation.push(x.onnx.TensorAnnotation.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=x.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.name!=null&&t.hasOwnProperty("name")&&!v.isString(t.name))return"name: string expected";if(t.initializer!=null&&t.hasOwnProperty("initializer")){if(!Array.isArray(t.initializer))return"initializer: array expected";for(var o=0;o<t.initializer.length;++o){var i=x.onnx.TensorProto.verify(t.initializer[o]);if(i)return"initializer."+i}}if(t.sparseInitializer!=null&&t.hasOwnProperty("sparseInitializer")){if(!Array.isArray(t.sparseInitializer))return"sparseInitializer: array expected";for(var o=0;o<t.sparseInitializer.length;++o){var i=x.onnx.SparseTensorProto.verify(t.sparseInitializer[o]);if(i)return"sparseInitializer."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!v.isString(t.docString))return"docString: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o){var i=x.onnx.ValueInfoProto.verify(t.input[o]);if(i)return"input."+i}}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o){var i=x.onnx.ValueInfoProto.verify(t.output[o]);if(i)return"output."+i}}if(t.valueInfo!=null&&t.hasOwnProperty("valueInfo")){if(!Array.isArray(t.valueInfo))return"valueInfo: array expected";for(var o=0;o<t.valueInfo.length;++o){var i=x.onnx.ValueInfoProto.verify(t.valueInfo[o]);if(i)return"valueInfo."+i}}if(t.quantizationAnnotation!=null&&t.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(t.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var o=0;o<t.quantizationAnnotation.length;++o){var i=x.onnx.TensorAnnotation.verify(t.quantizationAnnotation[o]);if(i)return"quantizationAnnotation."+i}}return null},e.fromObject=function(t){if(t instanceof x.onnx.GraphProto)return t;var o=new x.onnx.GraphProto;if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.GraphProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.GraphProto.node: object expected");o.node[i]=x.onnx.NodeProto.fromObject(t.node[i])}}if(t.name!=null&&(o.name=String(t.name)),t.initializer){if(!Array.isArray(t.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");o.initializer=[];for(var i=0;i<t.initializer.length;++i){if(typeof t.initializer[i]!="object")throw TypeError(".onnx.GraphProto.initializer: object expected");o.initializer[i]=x.onnx.TensorProto.fromObject(t.initializer[i])}}if(t.sparseInitializer){if(!Array.isArray(t.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");o.sparseInitializer=[];for(var i=0;i<t.sparseInitializer.length;++i){if(typeof t.sparseInitializer[i]!="object")throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");o.sparseInitializer[i]=x.onnx.SparseTensorProto.fromObject(t.sparseInitializer[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.GraphProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i){if(typeof t.input[i]!="object")throw TypeError(".onnx.GraphProto.input: object expected");o.input[i]=x.onnx.ValueInfoProto.fromObject(t.input[i])}}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.GraphProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i){if(typeof t.output[i]!="object")throw TypeError(".onnx.GraphProto.output: object expected");o.output[i]=x.onnx.ValueInfoProto.fromObject(t.output[i])}}if(t.valueInfo){if(!Array.isArray(t.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");o.valueInfo=[];for(var i=0;i<t.valueInfo.length;++i){if(typeof t.valueInfo[i]!="object")throw TypeError(".onnx.GraphProto.valueInfo: object expected");o.valueInfo[i]=x.onnx.ValueInfoProto.fromObject(t.valueInfo[i])}}if(t.quantizationAnnotation){if(!Array.isArray(t.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");o.quantizationAnnotation=[];for(var i=0;i<t.quantizationAnnotation.length;++i){if(typeof t.quantizationAnnotation[i]!="object")throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");o.quantizationAnnotation[i]=x.onnx.TensorAnnotation.fromObject(t.quantizationAnnotation[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.node=[],i.initializer=[],i.input=[],i.output=[],i.valueInfo=[],i.quantizationAnnotation=[],i.sparseInitializer=[]),o.defaults&&(i.name="",i.docString=""),t.node&&t.node.length){i.node=[];for(var a=0;a<t.node.length;++a)i.node[a]=x.onnx.NodeProto.toObject(t.node[a],o)}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.initializer&&t.initializer.length){i.initializer=[];for(var a=0;a<t.initializer.length;++a)i.initializer[a]=x.onnx.TensorProto.toObject(t.initializer[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=x.onnx.ValueInfoProto.toObject(t.input[a],o)}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=x.onnx.ValueInfoProto.toObject(t.output[a],o)}if(t.valueInfo&&t.valueInfo.length){i.valueInfo=[];for(var a=0;a<t.valueInfo.length;++a)i.valueInfo[a]=x.onnx.ValueInfoProto.toObject(t.valueInfo[a],o)}if(t.quantizationAnnotation&&t.quantizationAnnotation.length){i.quantizationAnnotation=[];for(var a=0;a<t.quantizationAnnotation.length;++a)i.quantizationAnnotation[a]=x.onnx.TensorAnnotation.toObject(t.quantizationAnnotation[a],o)}if(t.sparseInitializer&&t.sparseInitializer.length){i.sparseInitializer=[];for(var a=0;a<t.sparseInitializer.length;++a)i.sparseInitializer[a]=x.onnx.SparseTensorProto.toObject(t.sparseInitializer[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ie.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.GraphProto"},e}(),r.TensorProto=function(){function e(n){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.dims=v.emptyArray,e.prototype.dataType=0,e.prototype.segment=null,e.prototype.floatData=v.emptyArray,e.prototype.int32Data=v.emptyArray,e.prototype.stringData=v.emptyArray,e.prototype.int64Data=v.emptyArray,e.prototype.name="",e.prototype.docString="",e.prototype.rawData=v.newBuffer([]),e.prototype.externalData=v.emptyArray,e.prototype.dataLocation=0,e.prototype.doubleData=v.emptyArray,e.prototype.uint64Data=v.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Le.create()),t.dims!=null&&t.dims.length){o.uint32(10).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}if(t.dataType!=null&&Object.hasOwnProperty.call(t,"dataType")&&o.uint32(16).int32(t.dataType),t.segment!=null&&Object.hasOwnProperty.call(t,"segment")&&x.onnx.TensorProto.Segment.encode(t.segment,o.uint32(26).fork()).ldelim(),t.floatData!=null&&t.floatData.length){o.uint32(34).fork();for(var i=0;i<t.floatData.length;++i)o.float(t.floatData[i]);o.ldelim()}if(t.int32Data!=null&&t.int32Data.length){o.uint32(42).fork();for(var i=0;i<t.int32Data.length;++i)o.int32(t.int32Data[i]);o.ldelim()}if(t.stringData!=null&&t.stringData.length)for(var i=0;i<t.stringData.length;++i)o.uint32(50).bytes(t.stringData[i]);if(t.int64Data!=null&&t.int64Data.length){o.uint32(58).fork();for(var i=0;i<t.int64Data.length;++i)o.int64(t.int64Data[i]);o.ldelim()}if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(66).string(t.name),t.rawData!=null&&Object.hasOwnProperty.call(t,"rawData")&&o.uint32(74).bytes(t.rawData),t.doubleData!=null&&t.doubleData.length){o.uint32(82).fork();for(var i=0;i<t.doubleData.length;++i)o.double(t.doubleData[i]);o.ldelim()}if(t.uint64Data!=null&&t.uint64Data.length){o.uint32(90).fork();for(var i=0;i<t.uint64Data.length;++i)o.uint64(t.uint64Data[i]);o.ldelim()}if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(98).string(t.docString),t.externalData!=null&&t.externalData.length)for(var i=0;i<t.externalData.length;++i)x.onnx.StringStringEntryProto.encode(t.externalData[i],o.uint32(106).fork()).ldelim();return t.dataLocation!=null&&Object.hasOwnProperty.call(t,"dataLocation")&&o.uint32(112).int32(t.dataLocation),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new x.onnx.TensorProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{if(a.dims&&a.dims.length||(a.dims=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.dims.push(t.int64());else a.dims.push(t.int64());break}case 2:{a.dataType=t.int32();break}case 3:{a.segment=x.onnx.TensorProto.Segment.decode(t,t.uint32());break}case 4:{if(a.floatData&&a.floatData.length||(a.floatData=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.floatData.push(t.float());else a.floatData.push(t.float());break}case 5:{if(a.int32Data&&a.int32Data.length||(a.int32Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.int32Data.push(t.int32());else a.int32Data.push(t.int32());break}case 6:{a.stringData&&a.stringData.length||(a.stringData=[]),a.stringData.push(t.bytes());break}case 7:{if(a.int64Data&&a.int64Data.length||(a.int64Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.int64Data.push(t.int64());else a.int64Data.push(t.int64());break}case 8:{a.name=t.string();break}case 12:{a.docString=t.string();break}case 9:{a.rawData=t.bytes();break}case 13:{a.externalData&&a.externalData.length||(a.externalData=[]),a.externalData.push(x.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 14:{a.dataLocation=t.int32();break}case 10:{if(a.doubleData&&a.doubleData.length||(a.doubleData=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.doubleData.push(t.double());else a.doubleData.push(t.double());break}case 11:{if(a.uint64Data&&a.uint64Data.length||(a.uint64Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.uint64Data.push(t.uint64());else a.uint64Data.push(t.uint64());break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var o=0;o<t.dims.length;++o)if(!v.isInteger(t.dims[o])&&!(t.dims[o]&&v.isInteger(t.dims[o].low)&&v.isInteger(t.dims[o].high)))return"dims: integer|Long[] expected"}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&!v.isInteger(t.dataType))return"dataType: integer expected";if(t.segment!=null&&t.hasOwnProperty("segment")){var i=x.onnx.TensorProto.Segment.verify(t.segment);if(i)return"segment."+i}if(t.floatData!=null&&t.hasOwnProperty("floatData")){if(!Array.isArray(t.floatData))return"floatData: array expected";for(var o=0;o<t.floatData.length;++o)if(typeof t.floatData[o]!="number")return"floatData: number[] expected"}if(t.int32Data!=null&&t.hasOwnProperty("int32Data")){if(!Array.isArray(t.int32Data))return"int32Data: array expected";for(var o=0;o<t.int32Data.length;++o)if(!v.isInteger(t.int32Data[o]))return"int32Data: integer[] expected"}if(t.stringData!=null&&t.hasOwnProperty("stringData")){if(!Array.isArray(t.stringData))return"stringData: array expected";for(var o=0;o<t.stringData.length;++o)if(!(t.stringData[o]&&typeof t.stringData[o].length=="number"||v.isString(t.stringData[o])))return"stringData: buffer[] expected"}if(t.int64Data!=null&&t.hasOwnProperty("int64Data")){if(!Array.isArray(t.int64Data))return"int64Data: array expected";for(var o=0;o<t.int64Data.length;++o)if(!v.isInteger(t.int64Data[o])&&!(t.int64Data[o]&&v.isInteger(t.int64Data[o].low)&&v.isInteger(t.int64Data[o].high)))return"int64Data: integer|Long[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!v.isString(t.name))return"name: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!v.isString(t.docString))return"docString: string expected";if(t.rawData!=null&&t.hasOwnProperty("rawData")&&!(t.rawData&&typeof t.rawData.length=="number"||v.isString(t.rawData)))return"rawData: buffer expected";if(t.externalData!=null&&t.hasOwnProperty("externalData")){if(!Array.isArray(t.externalData))return"externalData: array expected";for(var o=0;o<t.externalData.length;++o){var i=x.onnx.StringStringEntryProto.verify(t.externalData[o]);if(i)return"externalData."+i}}if(t.dataLocation!=null&&t.hasOwnProperty("dataLocation"))switch(t.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:break}if(t.doubleData!=null&&t.hasOwnProperty("doubleData")){if(!Array.isArray(t.doubleData))return"doubleData: array expected";for(var o=0;o<t.doubleData.length;++o)if(typeof t.doubleData[o]!="number")return"doubleData: number[] expected"}if(t.uint64Data!=null&&t.hasOwnProperty("uint64Data")){if(!Array.isArray(t.uint64Data))return"uint64Data: array expected";for(var o=0;o<t.uint64Data.length;++o)if(!v.isInteger(t.uint64Data[o])&&!(t.uint64Data[o]&&v.isInteger(t.uint64Data[o].low)&&v.isInteger(t.uint64Data[o].high)))return"uint64Data: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof x.onnx.TensorProto)return t;var o=new x.onnx.TensorProto;if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.TensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)v.Long?(o.dims[i]=v.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new v.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}if(t.dataType!=null&&(o.dataType=t.dataType|0),t.segment!=null){if(typeof t.segment!="object")throw TypeError(".onnx.TensorProto.segment: object expected");o.segment=x.onnx.TensorProto.Segment.fromObject(t.segment)}if(t.floatData){if(!Array.isArray(t.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");o.floatData=[];for(var i=0;i<t.floatData.length;++i)o.floatData[i]=Number(t.floatData[i])}if(t.int32Data){if(!Array.isArray(t.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");o.int32Data=[];for(var i=0;i<t.int32Data.length;++i)o.int32Data[i]=t.int32Data[i]|0}if(t.stringData){if(!Array.isArray(t.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");o.stringData=[];for(var i=0;i<t.stringData.length;++i)typeof t.stringData[i]=="string"?v.base64.decode(t.stringData[i],o.stringData[i]=v.newBuffer(v.base64.length(t.stringData[i])),0):t.stringData[i].length>=0&&(o.stringData[i]=t.stringData[i])}if(t.int64Data){if(!Array.isArray(t.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");o.int64Data=[];for(var i=0;i<t.int64Data.length;++i)v.Long?(o.int64Data[i]=v.Long.fromValue(t.int64Data[i])).unsigned=!1:typeof t.int64Data[i]=="string"?o.int64Data[i]=parseInt(t.int64Data[i],10):typeof t.int64Data[i]=="number"?o.int64Data[i]=t.int64Data[i]:typeof t.int64Data[i]=="object"&&(o.int64Data[i]=new v.LongBits(t.int64Data[i].low>>>0,t.int64Data[i].high>>>0).toNumber())}if(t.name!=null&&(o.name=String(t.name)),t.docString!=null&&(o.docString=String(t.docString)),t.rawData!=null&&(typeof t.rawData=="string"?v.base64.decode(t.rawData,o.rawData=v.newBuffer(v.base64.length(t.rawData)),0):t.rawData.length>=0&&(o.rawData=t.rawData)),t.externalData){if(!Array.isArray(t.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");o.externalData=[];for(var i=0;i<t.externalData.length;++i){if(typeof t.externalData[i]!="object")throw TypeError(".onnx.TensorProto.externalData: object expected");o.externalData[i]=x.onnx.StringStringEntryProto.fromObject(t.externalData[i])}}switch(t.dataLocation){default:if(typeof t.dataLocation=="number"){o.dataLocation=t.dataLocation;break}break;case"DEFAULT":case 0:o.dataLocation=0;break;case"EXTERNAL":case 1:o.dataLocation=1;break}if(t.doubleData){if(!Array.isArray(t.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");o.doubleData=[];for(var i=0;i<t.doubleData.length;++i)o.doubleData[i]=Number(t.doubleData[i])}if(t.uint64Data){if(!Array.isArray(t.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");o.uint64Data=[];for(var i=0;i<t.uint64Data.length;++i)v.Long?(o.uint64Data[i]=v.Long.fromValue(t.uint64Data[i])).unsigned=!0:typeof t.uint64Data[i]=="string"?o.uint64Data[i]=parseInt(t.uint64Data[i],10):typeof t.uint64Data[i]=="number"?o.uint64Data[i]=t.uint64Data[i]:typeof t.uint64Data[i]=="object"&&(o.uint64Data[i]=new v.LongBits(t.uint64Data[i].low>>>0,t.uint64Data[i].high>>>0).toNumber(!0))}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[],i.floatData=[],i.int32Data=[],i.stringData=[],i.int64Data=[],i.doubleData=[],i.uint64Data=[],i.externalData=[]),o.defaults&&(i.dataType=0,i.segment=null,i.name="",o.bytes===String?i.rawData="":(i.rawData=[],o.bytes!==Array&&(i.rawData=v.newBuffer(i.rawData))),i.docString="",i.dataLocation=o.enums===String?"DEFAULT":0),t.dims&&t.dims.length){i.dims=[];for(var a=0;a<t.dims.length;++a)typeof t.dims[a]=="number"?i.dims[a]=o.longs===String?String(t.dims[a]):t.dims[a]:i.dims[a]=o.longs===String?v.Long.prototype.toString.call(t.dims[a]):o.longs===Number?new v.LongBits(t.dims[a].low>>>0,t.dims[a].high>>>0).toNumber():t.dims[a]}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&(i.dataType=t.dataType),t.segment!=null&&t.hasOwnProperty("segment")&&(i.segment=x.onnx.TensorProto.Segment.toObject(t.segment,o)),t.floatData&&t.floatData.length){i.floatData=[];for(var a=0;a<t.floatData.length;++a)i.floatData[a]=o.json&&!isFinite(t.floatData[a])?String(t.floatData[a]):t.floatData[a]}if(t.int32Data&&t.int32Data.length){i.int32Data=[];for(var a=0;a<t.int32Data.length;++a)i.int32Data[a]=t.int32Data[a]}if(t.stringData&&t.stringData.length){i.stringData=[];for(var a=0;a<t.stringData.length;++a)i.stringData[a]=o.bytes===String?v.base64.encode(t.stringData[a],0,t.stringData[a].length):o.bytes===Array?Array.prototype.slice.call(t.stringData[a]):t.stringData[a]}if(t.int64Data&&t.int64Data.length){i.int64Data=[];for(var a=0;a<t.int64Data.length;++a)typeof t.int64Data[a]=="number"?i.int64Data[a]=o.longs===String?String(t.int64Data[a]):t.int64Data[a]:i.int64Data[a]=o.longs===String?v.Long.prototype.toString.call(t.int64Data[a]):o.longs===Number?new v.LongBits(t.int64Data[a].low>>>0,t.int64Data[a].high>>>0).toNumber():t.int64Data[a]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.rawData!=null&&t.hasOwnProperty("rawData")&&(i.rawData=o.bytes===String?v.base64.encode(t.rawData,0,t.rawData.length):o.bytes===Array?Array.prototype.slice.call(t.rawData):t.rawData),t.doubleData&&t.doubleData.length){i.doubleData=[];for(var a=0;a<t.doubleData.length;++a)i.doubleData[a]=o.json&&!isFinite(t.doubleData[a])?String(t.doubleData[a]):t.doubleData[a]}if(t.uint64Data&&t.uint64Data.length){i.uint64Data=[];for(var a=0;a<t.uint64Data.length;++a)typeof t.uint64Data[a]=="number"?i.uint64Data[a]=o.longs===String?String(t.uint64Data[a]):t.uint64Data[a]:i.uint64Data[a]=o.longs===String?v.Long.prototype.toString.call(t.uint64Data[a]):o.longs===Number?new v.LongBits(t.uint64Data[a].low>>>0,t.uint64Data[a].high>>>0).toNumber(!0):t.uint64Data[a]}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.externalData&&t.externalData.length){i.externalData=[];for(var a=0;a<t.externalData.length;++a)i.externalData[a]=x.onnx.StringStringEntryProto.toObject(t.externalData[a],o)}return t.dataLocation!=null&&t.hasOwnProperty("dataLocation")&&(i.dataLocation=o.enums===String?x.onnx.TensorProto.DataLocation[t.dataLocation]===void 0?t.dataLocation:x.onnx.TensorProto.DataLocation[t.dataLocation]:t.dataLocation),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ie.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorProto"},e.DataType=function(){var n={},t=Object.create(n);return t[n[0]="UNDEFINED"]=0,t[n[1]="FLOAT"]=1,t[n[2]="UINT8"]=2,t[n[3]="INT8"]=3,t[n[4]="UINT16"]=4,t[n[5]="INT16"]=5,t[n[6]="INT32"]=6,t[n[7]="INT64"]=7,t[n[8]="STRING"]=8,t[n[9]="BOOL"]=9,t[n[10]="FLOAT16"]=10,t[n[11]="DOUBLE"]=11,t[n[12]="UINT32"]=12,t[n[13]="UINT64"]=13,t[n[14]="COMPLEX64"]=14,t[n[15]="COMPLEX128"]=15,t[n[16]="BFLOAT16"]=16,t[n[17]="FLOAT8E4M3FN"]=17,t[n[18]="FLOAT8E4M3FNUZ"]=18,t[n[19]="FLOAT8E5M2"]=19,t[n[20]="FLOAT8E5M2FNUZ"]=20,t}(),e.Segment=function(){function n(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}return n.prototype.begin=v.Long?v.Long.fromBits(0,0,!1):0,n.prototype.end=v.Long?v.Long.fromBits(0,0,!1):0,n.create=function(o){return new n(o)},n.encode=function(o,i){return i||(i=Le.create()),o.begin!=null&&Object.hasOwnProperty.call(o,"begin")&&i.uint32(8).int64(o.begin),o.end!=null&&Object.hasOwnProperty.call(o,"end")&&i.uint32(16).int64(o.end),i},n.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},n.decode=function(o,i){o instanceof R||(o=R.create(o));for(var a=i===void 0?o.len:o.pos+i,s=new x.onnx.TensorProto.Segment;o.pos<a;){var u=o.uint32();switch(u>>>3){case 1:{s.begin=o.int64();break}case 2:{s.end=o.int64();break}default:o.skipType(u&7);break}}return s},n.decodeDelimited=function(o){return o instanceof R||(o=new R(o)),this.decode(o,o.uint32())},n.verify=function(o){return typeof o!="object"||o===null?"object expected":o.begin!=null&&o.hasOwnProperty("begin")&&!v.isInteger(o.begin)&&!(o.begin&&v.isInteger(o.begin.low)&&v.isInteger(o.begin.high))?"begin: integer|Long expected":o.end!=null&&o.hasOwnProperty("end")&&!v.isInteger(o.end)&&!(o.end&&v.isInteger(o.end.low)&&v.isInteger(o.end.high))?"end: integer|Long expected":null},n.fromObject=function(o){if(o instanceof x.onnx.TensorProto.Segment)return o;var i=new x.onnx.TensorProto.Segment;return o.begin!=null&&(v.Long?(i.begin=v.Long.fromValue(o.begin)).unsigned=!1:typeof o.begin=="string"?i.begin=parseInt(o.begin,10):typeof o.begin=="number"?i.begin=o.begin:typeof o.begin=="object"&&(i.begin=new v.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber())),o.end!=null&&(v.Long?(i.end=v.Long.fromValue(o.end)).unsigned=!1:typeof o.end=="string"?i.end=parseInt(o.end,10):typeof o.end=="number"?i.end=o.end:typeof o.end=="object"&&(i.end=new v.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber())),i},n.toObject=function(o,i){i||(i={});var a={};if(i.defaults){if(v.Long){var s=new v.Long(0,0,!1);a.begin=i.longs===String?s.toString():i.longs===Number?s.toNumber():s}else a.begin=i.longs===String?"0":0;if(v.Long){var s=new v.Long(0,0,!1);a.end=i.longs===String?s.toString():i.longs===Number?s.toNumber():s}else a.end=i.longs===String?"0":0}return o.begin!=null&&o.hasOwnProperty("begin")&&(typeof o.begin=="number"?a.begin=i.longs===String?String(o.begin):o.begin:a.begin=i.longs===String?v.Long.prototype.toString.call(o.begin):i.longs===Number?new v.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber():o.begin),o.end!=null&&o.hasOwnProperty("end")&&(typeof o.end=="number"?a.end=i.longs===String?String(o.end):o.end:a.end=i.longs===String?v.Long.prototype.toString.call(o.end):i.longs===Number?new v.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber():o.end),a},n.prototype.toJSON=function(){return this.constructor.toObject(this,Ie.util.toJSONOptions)},n.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TensorProto.Segment"},n}(),e.DataLocation=function(){var n={},t=Object.create(n);return t[n[0]="DEFAULT"]=0,t[n[1]="EXTERNAL"]=1,t}(),e}(),r.SparseTensorProto=function(){function e(n){if(this.dims=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.values=null,e.prototype.indices=null,e.prototype.dims=v.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Le.create()),t.values!=null&&Object.hasOwnProperty.call(t,"values")&&x.onnx.TensorProto.encode(t.values,o.uint32(10).fork()).ldelim(),t.indices!=null&&Object.hasOwnProperty.call(t,"indices")&&x.onnx.TensorProto.encode(t.indices,o.uint32(18).fork()).ldelim(),t.dims!=null&&t.dims.length){o.uint32(26).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new x.onnx.SparseTensorProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.values=x.onnx.TensorProto.decode(t,t.uint32());break}case 2:{a.indices=x.onnx.TensorProto.decode(t,t.uint32());break}case 3:{if(a.dims&&a.dims.length||(a.dims=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.dims.push(t.int64());else a.dims.push(t.int64());break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.values!=null&&t.hasOwnProperty("values")){var o=x.onnx.TensorProto.verify(t.values);if(o)return"values."+o}if(t.indices!=null&&t.hasOwnProperty("indices")){var o=x.onnx.TensorProto.verify(t.indices);if(o)return"indices."+o}if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var i=0;i<t.dims.length;++i)if(!v.isInteger(t.dims[i])&&!(t.dims[i]&&v.isInteger(t.dims[i].low)&&v.isInteger(t.dims[i].high)))return"dims: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof x.onnx.SparseTensorProto)return t;var o=new x.onnx.SparseTensorProto;if(t.values!=null){if(typeof t.values!="object")throw TypeError(".onnx.SparseTensorProto.values: object expected");o.values=x.onnx.TensorProto.fromObject(t.values)}if(t.indices!=null){if(typeof t.indices!="object")throw TypeError(".onnx.SparseTensorProto.indices: object expected");o.indices=x.onnx.TensorProto.fromObject(t.indices)}if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)v.Long?(o.dims[i]=v.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new v.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[]),o.defaults&&(i.values=null,i.indices=null),t.values!=null&&t.hasOwnProperty("values")&&(i.values=x.onnx.TensorProto.toObject(t.values,o)),t.indices!=null&&t.hasOwnProperty("indices")&&(i.indices=x.onnx.TensorProto.toObject(t.indices,o)),t.dims&&t.dims.length){i.dims=[];for(var a=0;a<t.dims.length;++a)typeof t.dims[a]=="number"?i.dims[a]=o.longs===String?String(t.dims[a]):t.dims[a]:i.dims[a]=o.longs===String?v.Long.prototype.toString.call(t.dims[a]):o.longs===Number?new v.LongBits(t.dims[a].low>>>0,t.dims[a].high>>>0).toNumber():t.dims[a]}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ie.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.SparseTensorProto"},e}(),r.TensorShapeProto=function(){function e(n){if(this.dim=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.dim=v.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Le.create()),t.dim!=null&&t.dim.length)for(var i=0;i<t.dim.length;++i)x.onnx.TensorShapeProto.Dimension.encode(t.dim[i],o.uint32(10).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new x.onnx.TensorShapeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.dim&&a.dim.length||(a.dim=[]),a.dim.push(x.onnx.TensorShapeProto.Dimension.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dim!=null&&t.hasOwnProperty("dim")){if(!Array.isArray(t.dim))return"dim: array expected";for(var o=0;o<t.dim.length;++o){var i=x.onnx.TensorShapeProto.Dimension.verify(t.dim[o]);if(i)return"dim."+i}}return null},e.fromObject=function(t){if(t instanceof x.onnx.TensorShapeProto)return t;var o=new x.onnx.TensorShapeProto;if(t.dim){if(!Array.isArray(t.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");o.dim=[];for(var i=0;i<t.dim.length;++i){if(typeof t.dim[i]!="object")throw TypeError(".onnx.TensorShapeProto.dim: object expected");o.dim[i]=x.onnx.TensorShapeProto.Dimension.fromObject(t.dim[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dim=[]),t.dim&&t.dim.length){i.dim=[];for(var a=0;a<t.dim.length;++a)i.dim[a]=x.onnx.TensorShapeProto.Dimension.toObject(t.dim[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ie.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorShapeProto"},e.Dimension=function(){function n(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}n.prototype.dimValue=null,n.prototype.dimParam=null,n.prototype.denotation="";var t;return Object.defineProperty(n.prototype,"value",{get:v.oneOfGetter(t=["dimValue","dimParam"]),set:v.oneOfSetter(t)}),n.create=function(i){return new n(i)},n.encode=function(i,a){return a||(a=Le.create()),i.dimValue!=null&&Object.hasOwnProperty.call(i,"dimValue")&&a.uint32(8).int64(i.dimValue),i.dimParam!=null&&Object.hasOwnProperty.call(i,"dimParam")&&a.uint32(18).string(i.dimParam),i.denotation!=null&&Object.hasOwnProperty.call(i,"denotation")&&a.uint32(26).string(i.denotation),a},n.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},n.decode=function(i,a){i instanceof R||(i=R.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new x.onnx.TensorShapeProto.Dimension;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.dimValue=i.int64();break}case 2:{u.dimParam=i.string();break}case 3:{u.denotation=i.string();break}default:i.skipType(l&7);break}}return u},n.decodeDelimited=function(i){return i instanceof R||(i=new R(i)),this.decode(i,i.uint32())},n.verify=function(i){if(typeof i!="object"||i===null)return"object expected";var a={};if(i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(a.value=1,!v.isInteger(i.dimValue)&&!(i.dimValue&&v.isInteger(i.dimValue.low)&&v.isInteger(i.dimValue.high))))return"dimValue: integer|Long expected";if(i.dimParam!=null&&i.hasOwnProperty("dimParam")){if(a.value===1)return"value: multiple values";if(a.value=1,!v.isString(i.dimParam))return"dimParam: string expected"}return i.denotation!=null&&i.hasOwnProperty("denotation")&&!v.isString(i.denotation)?"denotation: string expected":null},n.fromObject=function(i){if(i instanceof x.onnx.TensorShapeProto.Dimension)return i;var a=new x.onnx.TensorShapeProto.Dimension;return i.dimValue!=null&&(v.Long?(a.dimValue=v.Long.fromValue(i.dimValue)).unsigned=!1:typeof i.dimValue=="string"?a.dimValue=parseInt(i.dimValue,10):typeof i.dimValue=="number"?a.dimValue=i.dimValue:typeof i.dimValue=="object"&&(a.dimValue=new v.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber())),i.dimParam!=null&&(a.dimParam=String(i.dimParam)),i.denotation!=null&&(a.denotation=String(i.denotation)),a},n.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.denotation=""),i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(typeof i.dimValue=="number"?s.dimValue=a.longs===String?String(i.dimValue):i.dimValue:s.dimValue=a.longs===String?v.Long.prototype.toString.call(i.dimValue):a.longs===Number?new v.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber():i.dimValue,a.oneofs&&(s.value="dimValue")),i.dimParam!=null&&i.hasOwnProperty("dimParam")&&(s.dimParam=i.dimParam,a.oneofs&&(s.value="dimParam")),i.denotation!=null&&i.hasOwnProperty("denotation")&&(s.denotation=i.denotation),s},n.prototype.toJSON=function(){return this.constructor.toObject(this,Ie.util.toJSONOptions)},n.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TensorShapeProto.Dimension"},n}(),e}(),r.TypeProto=function(){function e(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}e.prototype.tensorType=null,e.prototype.sequenceType=null,e.prototype.mapType=null,e.prototype.optionalType=null,e.prototype.sparseTensorType=null,e.prototype.denotation="";var n;return Object.defineProperty(e.prototype,"value",{get:v.oneOfGetter(n=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:v.oneOfSetter(n)}),e.create=function(o){return new e(o)},e.encode=function(o,i){return i||(i=Le.create()),o.tensorType!=null&&Object.hasOwnProperty.call(o,"tensorType")&&x.onnx.TypeProto.Tensor.encode(o.tensorType,i.uint32(10).fork()).ldelim(),o.sequenceType!=null&&Object.hasOwnProperty.call(o,"sequenceType")&&x.onnx.TypeProto.Sequence.encode(o.sequenceType,i.uint32(34).fork()).ldelim(),o.mapType!=null&&Object.hasOwnProperty.call(o,"mapType")&&x.onnx.TypeProto.Map.encode(o.mapType,i.uint32(42).fork()).ldelim(),o.denotation!=null&&Object.hasOwnProperty.call(o,"denotation")&&i.uint32(50).string(o.denotation),o.sparseTensorType!=null&&Object.hasOwnProperty.call(o,"sparseTensorType")&&x.onnx.TypeProto.SparseTensor.encode(o.sparseTensorType,i.uint32(66).fork()).ldelim(),o.optionalType!=null&&Object.hasOwnProperty.call(o,"optionalType")&&x.onnx.TypeProto.Optional.encode(o.optionalType,i.uint32(74).fork()).ldelim(),i},e.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},e.decode=function(o,i){o instanceof R||(o=R.create(o));for(var a=i===void 0?o.len:o.pos+i,s=new x.onnx.TypeProto;o.pos<a;){var u=o.uint32();switch(u>>>3){case 1:{s.tensorType=x.onnx.TypeProto.Tensor.decode(o,o.uint32());break}case 4:{s.sequenceType=x.onnx.TypeProto.Sequence.decode(o,o.uint32());break}case 5:{s.mapType=x.onnx.TypeProto.Map.decode(o,o.uint32());break}case 9:{s.optionalType=x.onnx.TypeProto.Optional.decode(o,o.uint32());break}case 8:{s.sparseTensorType=x.onnx.TypeProto.SparseTensor.decode(o,o.uint32());break}case 6:{s.denotation=o.string();break}default:o.skipType(u&7);break}}return s},e.decodeDelimited=function(o){return o instanceof R||(o=new R(o)),this.decode(o,o.uint32())},e.verify=function(o){if(typeof o!="object"||o===null)return"object expected";var i={};if(o.tensorType!=null&&o.hasOwnProperty("tensorType")){i.value=1;{var a=x.onnx.TypeProto.Tensor.verify(o.tensorType);if(a)return"tensorType."+a}}if(o.sequenceType!=null&&o.hasOwnProperty("sequenceType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=x.onnx.TypeProto.Sequence.verify(o.sequenceType);if(a)return"sequenceType."+a}}if(o.mapType!=null&&o.hasOwnProperty("mapType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=x.onnx.TypeProto.Map.verify(o.mapType);if(a)return"mapType."+a}}if(o.optionalType!=null&&o.hasOwnProperty("optionalType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=x.onnx.TypeProto.Optional.verify(o.optionalType);if(a)return"optionalType."+a}}if(o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=x.onnx.TypeProto.SparseTensor.verify(o.sparseTensorType);if(a)return"sparseTensorType."+a}}return o.denotation!=null&&o.hasOwnProperty("denotation")&&!v.isString(o.denotation)?"denotation: string expected":null},e.fromObject=function(o){if(o instanceof x.onnx.TypeProto)return o;var i=new x.onnx.TypeProto;if(o.tensorType!=null){if(typeof o.tensorType!="object")throw TypeError(".onnx.TypeProto.tensorType: object expected");i.tensorType=x.onnx.TypeProto.Tensor.fromObject(o.tensorType)}if(o.sequenceType!=null){if(typeof o.sequenceType!="object")throw TypeError(".onnx.TypeProto.sequenceType: object expected");i.sequenceType=x.onnx.TypeProto.Sequence.fromObject(o.sequenceType)}if(o.mapType!=null){if(typeof o.mapType!="object")throw TypeError(".onnx.TypeProto.mapType: object expected");i.mapType=x.onnx.TypeProto.Map.fromObject(o.mapType)}if(o.optionalType!=null){if(typeof o.optionalType!="object")throw TypeError(".onnx.TypeProto.optionalType: object expected");i.optionalType=x.onnx.TypeProto.Optional.fromObject(o.optionalType)}if(o.sparseTensorType!=null){if(typeof o.sparseTensorType!="object")throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");i.sparseTensorType=x.onnx.TypeProto.SparseTensor.fromObject(o.sparseTensorType)}return o.denotation!=null&&(i.denotation=String(o.denotation)),i},e.toObject=function(o,i){i||(i={});var a={};return i.defaults&&(a.denotation=""),o.tensorType!=null&&o.hasOwnProperty("tensorType")&&(a.tensorType=x.onnx.TypeProto.Tensor.toObject(o.tensorType,i),i.oneofs&&(a.value="tensorType")),o.sequenceType!=null&&o.hasOwnProperty("sequenceType")&&(a.sequenceType=x.onnx.TypeProto.Sequence.toObject(o.sequenceType,i),i.oneofs&&(a.value="sequenceType")),o.mapType!=null&&o.hasOwnProperty("mapType")&&(a.mapType=x.onnx.TypeProto.Map.toObject(o.mapType,i),i.oneofs&&(a.value="mapType")),o.denotation!=null&&o.hasOwnProperty("denotation")&&(a.denotation=o.denotation),o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")&&(a.sparseTensorType=x.onnx.TypeProto.SparseTensor.toObject(o.sparseTensorType,i),i.oneofs&&(a.value="sparseTensorType")),o.optionalType!=null&&o.hasOwnProperty("optionalType")&&(a.optionalType=x.onnx.TypeProto.Optional.toObject(o.optionalType,i),i.oneofs&&(a.value="optionalType")),a},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ie.util.toJSONOptions)},e.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TypeProto"},e.Tensor=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=Le.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&a.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&x.onnx.TensorShapeProto.encode(i.shape,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof R||(i=R.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new x.onnx.TypeProto.Tensor;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=x.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof R||(i=new R(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!v.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var a=x.onnx.TensorShapeProto.verify(i.shape);if(a)return"shape."+a}return null},t.fromObject=function(i){if(i instanceof x.onnx.TypeProto.Tensor)return i;var a=new x.onnx.TypeProto.Tensor;if(i.elemType!=null&&(a.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");a.shape=x.onnx.TensorShapeProto.fromObject(i.shape)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=0,s.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(s.shape=x.onnx.TensorShapeProto.toObject(i.shape,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ie.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Tensor"},t}(),e.Sequence=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=Le.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&x.onnx.TypeProto.encode(i.elemType,a.uint32(10).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof R||(i=R.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new x.onnx.TypeProto.Sequence;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=x.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof R||(i=new R(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var a=x.onnx.TypeProto.verify(i.elemType);if(a)return"elemType."+a}return null},t.fromObject=function(i){if(i instanceof x.onnx.TypeProto.Sequence)return i;var a=new x.onnx.TypeProto.Sequence;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");a.elemType=x.onnx.TypeProto.fromObject(i.elemType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=x.onnx.TypeProto.toObject(i.elemType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ie.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Sequence"},t}(),e.Map=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.keyType=0,t.prototype.valueType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=Le.create()),i.keyType!=null&&Object.hasOwnProperty.call(i,"keyType")&&a.uint32(8).int32(i.keyType),i.valueType!=null&&Object.hasOwnProperty.call(i,"valueType")&&x.onnx.TypeProto.encode(i.valueType,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof R||(i=R.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new x.onnx.TypeProto.Map;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.keyType=i.int32();break}case 2:{u.valueType=x.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof R||(i=new R(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.keyType!=null&&i.hasOwnProperty("keyType")&&!v.isInteger(i.keyType))return"keyType: integer expected";if(i.valueType!=null&&i.hasOwnProperty("valueType")){var a=x.onnx.TypeProto.verify(i.valueType);if(a)return"valueType."+a}return null},t.fromObject=function(i){if(i instanceof x.onnx.TypeProto.Map)return i;var a=new x.onnx.TypeProto.Map;if(i.keyType!=null&&(a.keyType=i.keyType|0),i.valueType!=null){if(typeof i.valueType!="object")throw TypeError(".onnx.TypeProto.Map.valueType: object expected");a.valueType=x.onnx.TypeProto.fromObject(i.valueType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.keyType=0,s.valueType=null),i.keyType!=null&&i.hasOwnProperty("keyType")&&(s.keyType=i.keyType),i.valueType!=null&&i.hasOwnProperty("valueType")&&(s.valueType=x.onnx.TypeProto.toObject(i.valueType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ie.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Map"},t}(),e.Optional=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=Le.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&x.onnx.TypeProto.encode(i.elemType,a.uint32(10).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof R||(i=R.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new x.onnx.TypeProto.Optional;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=x.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof R||(i=new R(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var a=x.onnx.TypeProto.verify(i.elemType);if(a)return"elemType."+a}return null},t.fromObject=function(i){if(i instanceof x.onnx.TypeProto.Optional)return i;var a=new x.onnx.TypeProto.Optional;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");a.elemType=x.onnx.TypeProto.fromObject(i.elemType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=x.onnx.TypeProto.toObject(i.elemType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ie.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Optional"},t}(),e.SparseTensor=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=Le.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&a.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&x.onnx.TensorShapeProto.encode(i.shape,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof R||(i=R.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new x.onnx.TypeProto.SparseTensor;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=x.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof R||(i=new R(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!v.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var a=x.onnx.TensorShapeProto.verify(i.shape);if(a)return"shape."+a}return null},t.fromObject=function(i){if(i instanceof x.onnx.TypeProto.SparseTensor)return i;var a=new x.onnx.TypeProto.SparseTensor;if(i.elemType!=null&&(a.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");a.shape=x.onnx.TensorShapeProto.fromObject(i.shape)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=0,s.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(s.shape=x.onnx.TensorShapeProto.toObject(i.shape,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,Ie.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.SparseTensor"},t}(),e}(),r.OperatorSetIdProto=function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.domain="",e.prototype.version=v.Long?v.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Le.create()),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(10).string(t.domain),t.version!=null&&Object.hasOwnProperty.call(t,"version")&&o.uint32(16).int64(t.version),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new x.onnx.OperatorSetIdProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.domain=t.string();break}case 2:{a.version=t.int64();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.domain!=null&&t.hasOwnProperty("domain")&&!v.isString(t.domain)?"domain: string expected":t.version!=null&&t.hasOwnProperty("version")&&!v.isInteger(t.version)&&!(t.version&&v.isInteger(t.version.low)&&v.isInteger(t.version.high))?"version: integer|Long expected":null},e.fromObject=function(t){if(t instanceof x.onnx.OperatorSetIdProto)return t;var o=new x.onnx.OperatorSetIdProto;return t.domain!=null&&(o.domain=String(t.domain)),t.version!=null&&(v.Long?(o.version=v.Long.fromValue(t.version)).unsigned=!1:typeof t.version=="string"?o.version=parseInt(t.version,10):typeof t.version=="number"?o.version=t.version:typeof t.version=="object"&&(o.version=new v.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber())),o},e.toObject=function(t,o){o||(o={});var i={};if(o.defaults)if(i.domain="",v.Long){var a=new v.Long(0,0,!1);i.version=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.version=o.longs===String?"0":0;return t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.version!=null&&t.hasOwnProperty("version")&&(typeof t.version=="number"?i.version=o.longs===String?String(t.version):t.version:i.version=o.longs===String?v.Long.prototype.toString.call(t.version):o.longs===Number?new v.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber():t.version),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ie.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.OperatorSetIdProto"},e}(),r.OperatorStatus=function(){var e={},n=Object.create(e);return n[e[0]="EXPERIMENTAL"]=0,n[e[1]="STABLE"]=1,n}(),r.FunctionProto=function(){function e(n){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.input=v.emptyArray,e.prototype.output=v.emptyArray,e.prototype.attribute=v.emptyArray,e.prototype.attributeProto=v.emptyArray,e.prototype.node=v.emptyArray,e.prototype.docString="",e.prototype.opsetImport=v.emptyArray,e.prototype.domain="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Le.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(34).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(42).string(t.output[i]);if(t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)o.uint32(50).string(t.attribute[i]);if(t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)x.onnx.NodeProto.encode(t.node[i],o.uint32(58).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(66).string(t.docString),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)x.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(74).fork()).ldelim();if(t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(82).string(t.domain),t.attributeProto!=null&&t.attributeProto.length)for(var i=0;i<t.attributeProto.length;++i)x.onnx.AttributeProto.encode(t.attributeProto[i],o.uint32(90).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new x.onnx.FunctionProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 4:{a.input&&a.input.length||(a.input=[]),a.input.push(t.string());break}case 5:{a.output&&a.output.length||(a.output=[]),a.output.push(t.string());break}case 6:{a.attribute&&a.attribute.length||(a.attribute=[]),a.attribute.push(t.string());break}case 11:{a.attributeProto&&a.attributeProto.length||(a.attributeProto=[]),a.attributeProto.push(x.onnx.AttributeProto.decode(t,t.uint32()));break}case 7:{a.node&&a.node.length||(a.node=[]),a.node.push(x.onnx.NodeProto.decode(t,t.uint32()));break}case 8:{a.docString=t.string();break}case 9:{a.opsetImport&&a.opsetImport.length||(a.opsetImport=[]),a.opsetImport.push(x.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 10:{a.domain=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!v.isString(t.name))return"name: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!v.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!v.isString(t.output[o]))return"output: string[] expected"}if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o)if(!v.isString(t.attribute[o]))return"attribute: string[] expected"}if(t.attributeProto!=null&&t.hasOwnProperty("attributeProto")){if(!Array.isArray(t.attributeProto))return"attributeProto: array expected";for(var o=0;o<t.attributeProto.length;++o){var i=x.onnx.AttributeProto.verify(t.attributeProto[o]);if(i)return"attributeProto."+i}}if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=x.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!v.isString(t.docString))return"docString: string expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=x.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}return t.domain!=null&&t.hasOwnProperty("domain")&&!v.isString(t.domain)?"domain: string expected":null},e.fromObject=function(t){if(t instanceof x.onnx.FunctionProto)return t;var o=new x.onnx.FunctionProto;if(t.name!=null&&(o.name=String(t.name)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.FunctionProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.FunctionProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i)o.attribute[i]=String(t.attribute[i])}if(t.attributeProto){if(!Array.isArray(t.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");o.attributeProto=[];for(var i=0;i<t.attributeProto.length;++i){if(typeof t.attributeProto[i]!="object")throw TypeError(".onnx.FunctionProto.attributeProto: object expected");o.attributeProto[i]=x.onnx.AttributeProto.fromObject(t.attributeProto[i])}}if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.FunctionProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.FunctionProto.node: object expected");o.node[i]=x.onnx.NodeProto.fromObject(t.node[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.FunctionProto.opsetImport: object expected");o.opsetImport[i]=x.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}return t.domain!=null&&(o.domain=String(t.domain)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[],i.node=[],i.opsetImport=[],i.attributeProto=[]),o.defaults&&(i.name="",i.docString="",i.domain=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=t.input[a]}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=t.output[a]}if(t.attribute&&t.attribute.length){i.attribute=[];for(var a=0;a<t.attribute.length;++a)i.attribute[a]=t.attribute[a]}if(t.node&&t.node.length){i.node=[];for(var a=0;a<t.node.length;++a)i.node[a]=x.onnx.NodeProto.toObject(t.node[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var a=0;a<t.opsetImport.length;++a)i.opsetImport[a]=x.onnx.OperatorSetIdProto.toObject(t.opsetImport[a],o)}if(t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.attributeProto&&t.attributeProto.length){i.attributeProto=[];for(var a=0;a<t.attributeProto.length;++a)i.attributeProto[a]=x.onnx.AttributeProto.toObject(t.attributeProto[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,Ie.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.FunctionProto"},e}(),r}();Dd.exports=x});function dr(r,e){if(!r)throw new Error(typeof e=="string"?e:e())}function Mr(r){return new TextDecoder().decode(r)}var Se,Hn,Hs,Xe,Do,He,nt,F,Nr,qn,jn,Kn,ye=$(()=>{"use strict";fa();Se=re(cr());Xn();Hn=class{static arraysEqual(e,n){if(e.length!==n.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!==n[t])return!1;return!0}},Hs=class{static preprocessInputShapes(e,n){let t=e.length===1?[1,e[0]]:e,o=n.length===1?[n[0],1]:n;return[t,o]}static postprocessOutputShape(e,n,t){n===1&&e.splice(e.length-2,1),t===1&&e.pop()}static calcMatMulShape(e,n){return e[1]!==n[0]?void 0:[e[0],n[1]]}},Xe=class r{static calcShape(e,n,t=!1){let o=e.length,i=n.length;if(o===0)return n;if(i===0)return e;let a=Math.max(e.length,n.length),s=new Array(a);if(t){if(o<2||i<2)return;let u=Hs.calcMatMulShape([e[o-2],e[o-1]],[n[i-2],n[i-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=t?3:1;u<=a;u++){let l=o-u<0?1:e[o-u],c=i-u<0?1:n[i-u];if(l!==c&&l>1&&c>1)return;s[a-u]=Math.max(l,c)}return s}static index(e,n){let t=new Array(n.length);return r.fillIndex(e,n,t),t}static fillIndex(e,n,t){let o=e.length-n.length;for(let i=0;i<n.length;i++)t[i]=e[o+i]%n[i]}static calc(e,n,t,o,i){let a=r.calcShape(e.dims,n.dims);if(a){if(o&&!F.areEqual(a,e.dims))return;let s=F.size(a),u=o?e:new Re(a,i||e.type);if(a.length===0)u.set([],t(e.get([]),n.get([])));else{let l=new Array(a.length),c=new Array(e.dims.length),d=new Array(n.dims.length),p=0,f=0,h=!1,m=!1;e.dims.length===0&&(p=e.get([]),h=!0),n.dims.length===0&&(f=n.get([]),m=!0);let y;for(let g=0;g<s;g++){y=g;for(let b=a.length-1;b>=0;b--)l[b]=y%a[b],y=Math.floor(y/a[b]);h||(r.fillIndex(l,e.dims,c),p=e.get(c)),m||(r.fillIndex(l,n.dims,d),f=n.get(d)),u.set(l,t(p,f))}}return u}}static isValidBroadcast(e,n){let t=e.length,o=n.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==n[o-i])return!1;return!0}static getBroadcastDims(e,n){let t=e.length,o=[];for(let i=0;i<t;i++){let a=t-1-i,s=e[a]||1;(n[n.length-1-i]||1)>1&&s===1&&o.unshift(a)}return o}},Do=class{static getShapeOfGemmResult(e,n,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let a,s,u;n?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(i&&!Xe.isValidBroadcast(i,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},He=class r{static tensorDataTypeFromProto(e){switch(e){case Se.onnx.TensorProto.DataType.INT8:return"int8";case Se.onnx.TensorProto.DataType.UINT8:return"uint8";case Se.onnx.TensorProto.DataType.BOOL:return"bool";case Se.onnx.TensorProto.DataType.INT16:return"int16";case Se.onnx.TensorProto.DataType.UINT16:return"uint16";case Se.onnx.TensorProto.DataType.INT32:return"int32";case Se.onnx.TensorProto.DataType.UINT32:return"uint32";case Se.onnx.TensorProto.DataType.FLOAT:return"float32";case Se.onnx.TensorProto.DataType.DOUBLE:return"float64";case Se.onnx.TensorProto.DataType.STRING:return"string";case Se.onnx.TensorProto.DataType.INT64:return"int32";case Se.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw new Error(`unsupported data type: ${Se.onnx.TensorProto.DataType[e]}`)}}static tensorDataTypeStringToEnum(e){switch(e){case"int8":return Se.onnx.TensorProto.DataType.INT8;case"uint8":return Se.onnx.TensorProto.DataType.UINT8;case"bool":return Se.onnx.TensorProto.DataType.BOOL;case"int16":return Se.onnx.TensorProto.DataType.INT16;case"uint16":return Se.onnx.TensorProto.DataType.UINT16;case"int32":return Se.onnx.TensorProto.DataType.INT32;case"uint32":return Se.onnx.TensorProto.DataType.UINT32;case"float32":return Se.onnx.TensorProto.DataType.FLOAT;case"float64":return Se.onnx.TensorProto.DataType.DOUBLE;case"string":return Se.onnx.TensorProto.DataType.STRING;case"int64":return Se.onnx.TensorProto.DataType.INT64;case"uint64":return Se.onnx.TensorProto.DataType.UINT64;default:throw new Error(`unsupported data type: ${e}`)}}static tensorDimsFromProto(e){return e.map(n=>$n.isLong(n)?n.toNumber():n)}static tensorValueTypeFromProto(e){return{tensorType:r.tensorDataTypeFromProto(e.elemType),shape:{dims:r.tensorDimsFromProto(e.shape.dim.map(n=>n.dimValue))}}}static tensorDimsFromORTFormat(e){let n=[];for(let t=0;t<e.dimsLength();t++)n.push(nt.longToNumber(e.dims(t)));return n}static tensorAttributesFromORTFormat(e){let n=[];for(let t=0;t<e.attributesLength();t++)n.push(e.attributes(t));return n}},nt=class{static longToNumber(e){return $n.isLong(e)?e.toNumber():typeof e=="bigint"?Number(e):e}static isLong(e){return $n.isLong(e)||typeof e=="bigint"}},F=class r{static size(e){return r.getSizeFromDimensionRange(e,0,e.length)}static sizeFromDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,n,e.length)}static sizeToDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,0,n)}static getSizeFromDimensionRange(e,n,t){let o=1;for(let i=n;i<t;i++){if(e[i]<=0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");o*=e[i]}return o}static computeStrides(e){let n=e.length;if(n===0)return[];if(n===1)return[1];let t=new Array(n);t[n-1]=1,t[n-2]=e[n-1];for(let o=n-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static transpose(e){return e.slice().reverse()}static indicesToOffset(e,n,t){t===void 0&&(t=e.length);let o=0;for(let i=0;i<t;++i)o+=n[i]*e[i];return o}static offsetToIndices(e,n){let t=n.length;if(t===0)return[];if(t===1)return[e*n[0]];let o=new Array(n.length);for(let i=0;i<o.length-1;++i)o[i]=Math.floor(e/n[i]),e-=o[i]*n[i];return o[o.length-1]=e,o}static normalizeAxis(e,n){if(e<-n&&e>=n)throw new Error("unsupported axis for this operation.");return e<0?e+n:e}static normalizeAxes(e,n){return e.map(t=>this.normalizeAxis(t,n))}static incrementIndex(e,n,t){if(n.length===0||e.length===0)throw new Error("Index incrementing unsupported for scalar Tensor");if(t===void 0)t=n.length;else if(t<=0||t>n.length)throw new Error("Incorrect axis to increment on");for(let o=t-1;o>=0&&(e[o]++,!(e[o]<n[o]));--o)e[o]=0}static calculateReshapedDims(e,n){if(n.length===0){if(e.length===0||r.size(e)===1)return[];throw new Error("cannot reshape to a scalar Tensor")}let t=n.length,o=new Array(t),i=-1,a=1;for(let u=0;u<t;u++){if(n[u]<-1)throw new Error("a dimension in shape hints cannot be less than -1");if(n[u]===-1){if(i!==-1)throw new Error("at most one dimension in shape hints can be -1");i=u}else{if(n[u]===0){if(u>=e.length)throw new Error("the dimension with value zero exceeds the dimension size of the input tensor");o[u]=e[u]}else o[u]=n[u];a*=o[u]}}let s=r.size(e);if(i!==-1){if(s%a!==0)throw new Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${e}] Output shape: [${n}]`);o[i]=s/a}else if(a!==s)throw new Error("reshapedDims and originalDims don't have matching sizes");return o}static sortBasedOnPerm(e,n){return n?n.map(t=>e[t]):e.slice().reverse()}static padShape(e,n){let t=e.length;return e.map((o,i)=>o+n[i]+n[i+t])}static areEqual(e,n){return e.length!==n.length?!1:e.every((t,o)=>t===n[o])}static validateDimsAndCalcSize(e){if(e.length>6)throw new TypeError("Only rank 0 to 6 is supported for tensor shape.");let n=1;for(let t of e){if(!Number.isInteger(t))throw new TypeError(`Invalid shape: ${t} is not an integer`);if(t<0||t>2147483647)throw new TypeError(`Invalid shape: length ${t} is not allowed`);n*=t}return n}static flattenShape(e,n){n<0&&(n+=e.length);let t=e.reduce((a,s)=>a*s,1),o=e.slice(n).reduce((a,s)=>a*s,1);return[t/o,o]}static squeezeShape(e,n){let t=new Array;n=r.normalizeAxes(n,e.length);for(let o=0;o<e.length;o++){let i=n.indexOf(o)>=0;if(i&&e[o]!==1)throw new Error("squeeze an axis of size different than 1");(n.length===0&&e[o]>1||n.length>0&&!i)&&t.push(e[o])}return t}static unsqueezeShape(e,n){let t=new Array(e.length+n.length);t.fill(0);for(let i=0;i<n.length;i++){let a=r.normalizeAxis(n[i],t.length);if(a>=t.length)throw new Error("'axes' has an out of range axis");if(t[a]!==0)throw new Error("'axes' has a duplicate axis");t[a]=1}let o=0;for(let i=0;i<t.length;i++)t[i]===0&&(t[i]=e[o++]);if(o!==e.length)throw new Error("the unsqueezed dimension could not be established");return t}},Nr=class r{static splitShape(e,n,t,o){if(t.length===0){if(!o)throw new Error("need to know number of outputs when the 'split' attribute is not specified");r.determineSplit(e[n],o,t)}let i=[],a=[0];for(let s=0;s<t.length;++s){s!==0&&a.push(a[s-1]+t[s-1]);let u=e.slice();u[n]=t[s],i.push(u)}return[i,a]}static determineSplit(e,n,t){if(e%n!==0)throw new Error("cannot split tensor to equal sized parts");for(let o=0;o<n;++o)t.push(e/n)}},qn=class r{static adjustPoolAttributes(e,n,t,o,i,a){if(!e&&t.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let s=0;s<n.length-2;s++)s>=t.length?t.push(n[s+2]):t[s]=n[s+2];for(let s=0;s<t.length;s++)if(s<o.length){if(o[s]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let s=0;s<t.length;s++)if(s<i.length){if(i[s]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let s=0;s<t.length*2;s++)if(s<a.length){if(a[s]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let s=0;s<t.length;s++){if(t[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[s]>=t[s]||a[s+t.length]>=t[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,n,t,o,i,a){if(a){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let s=0;s<e.length-2;s++)r.adjustPadAndReturnShape(e[s+2],n[s],t[s],o[s],i,s,s+e.length-2,a)}}static computePoolOutputShape(e,n,t,o,i,a,s){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let u=[n[0],n[1]];return r.computeShapeHelper(e,n,u,t,o,i,a,s),u}static computeConvOutputShape(e,n,t,o,i,a,s){if(e.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],n[0]];return r.computeShapeHelper(!1,e,u,t,o,i,a,s),u}static computeShapeHelper(e,n,t,o,i,a,s,u){if(e)for(let l=0;l<n.length-2;l++)t.push(1);else for(let l=0;l<n.length-2;l++)t.push(r.adjustPadAndReturnShape(n[l+2],o[l],i[l],a[l],s,l,l+n.length-2,u))}static adjustPadAndReturnShape(e,n,t,o,i,a,s,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[a]=0,i[s]=0,Math.floor((e-l)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let d=((e+n-1)/n-1)*n+o-e;return i[a]=Math.floor(u==="SAME_LOWER"?(d+1)/2:d/2),i[s]=d-i[a],Math.floor((e+d-o)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[a]+i[s]-l)/n+1)}},jn=-34028234663852886e22,Kn=34028234663852886e22});function a0(r){switch(r){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw new Error(`cannot calculate sizeof() on type ${r}`)}}function kd(r){switch(r){case se.onnx.TensorProto.DataType.UINT8:case se.onnx.TensorProto.DataType.INT8:case se.onnx.TensorProto.DataType.BOOL:return 1;case se.onnx.TensorProto.DataType.UINT16:case se.onnx.TensorProto.DataType.INT16:return 2;case se.onnx.TensorProto.DataType.FLOAT:case se.onnx.TensorProto.DataType.INT32:case se.onnx.TensorProto.DataType.UINT32:return 4;case se.onnx.TensorProto.DataType.INT64:case se.onnx.TensorProto.DataType.DOUBLE:case se.onnx.TensorProto.DataType.UINT64:return 8;default:throw new Error(`cannot calculate sizeof() on type ${se.onnx.TensorProto.DataType[r]}`)}}function s0(r,e){return new(Rd(e))(r)}function Rd(r){switch(r){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw new Error("unspecified error")}}function qs(r,e){if(e===se.onnx.TensorProto.DataType.INT64||e===Dr.TensorDataType.INT64){if(r.greaterThanOrEqual(2147483648)||r.lessThan(-2147483648))throw new TypeError("int64 is not supported")}else if(e===se.onnx.TensorProto.DataType.UINT32||e===Dr.TensorDataType.UINT32||e===se.onnx.TensorProto.DataType.UINT64||e===Dr.TensorDataType.UINT64){if(r.greaterThanOrEqual(4294967296)||r.lessThan(0))throw new TypeError("uint64 is not supported")}else throw new TypeError(`not a LONG type: ${se.onnx.TensorProto.DataType[e]}`);return r.toNumber()}function Ld(r,e,n){switch(e){case se.onnx.TensorProto.DataType.BOOL:case se.onnx.TensorProto.DataType.UINT8:return r.getUint8(n);case se.onnx.TensorProto.DataType.INT8:return r.getInt8(n);case se.onnx.TensorProto.DataType.UINT16:return r.getUint16(n,!0);case se.onnx.TensorProto.DataType.INT16:return r.getInt16(n,!0);case se.onnx.TensorProto.DataType.FLOAT:return r.getFloat32(n,!0);case se.onnx.TensorProto.DataType.INT32:return r.getInt32(n,!0);case se.onnx.TensorProto.DataType.UINT32:return r.getUint32(n,!0);case se.onnx.TensorProto.DataType.INT64:return qs($n.fromBits(r.getUint32(n,!0),r.getUint32(n+4,!0),!1),e);case se.onnx.TensorProto.DataType.DOUBLE:return r.getFloat64(n,!0);case se.onnx.TensorProto.DataType.UINT64:return qs($n.fromBits(r.getUint32(n,!0),r.getUint32(n+4,!0),!0),e);default:throw new Error(`cannot read from DataView for type ${se.onnx.TensorProto.DataType[e]}`)}}var zd,se,Re,Xn=$(()=>{"use strict";zd=re(Ql());fa();kr();se=re(cr());ye();Re=class r{constructor(e,n,t,o,i,a=zd.Guid.create()){this.dims=e;this.type=n;this.dataProvider=t;this.asyncDataProvider=o;this.cache=i;this.dataId=a;this.size=F.validateDimsAndCalcSize(e);let s=this.size,u=t===void 0&&o===void 0&&i===void 0;if(i!==void 0&&i.length!==s)throw new RangeError("Input dims doesn't match data length.");if(n==="string"){if(i!==void 0&&(!Array.isArray(i)||!i.every(l=>typeof l=="string")))throw new TypeError("cache should be a string array");u&&(this.cache=new Array(s))}else{if(i!==void 0){let l=Rd(n);if(!(i instanceof l))throw new TypeError(`cache should be type ${l.name}`)}if(u){let l=new ArrayBuffer(s*a0(n));this.cache=s0(l,n)}}}get data(){if(this.cache===void 0){let e=this.dataProvider(this.dataId);if(e.length!==this.size)throw new Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=e}return this.cache}get stringData(){if(this.type!=="string")throw new TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw new TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw new TypeError("data type is not float (float32, float64)")}}get numberData(){if(this.type!=="string")return this.data;throw new TypeError("type cannot be non-number (string)")}get(e){return this.data[F.indicesToOffset(e,this.strides)]}set(e,n){this.data[F.indicesToOffset(e,this.strides)]=n}async getData(){return this.cache===void 0&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=F.computeStrides(this.dims)),this._strides}static fromProto(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let n=He.tensorDataTypeFromProto(e.dataType),t=He.tensorDimsFromProto(e.dims),o=new r(t,n);if(n==="string")e.stringData.forEach((i,a)=>{o.data[a]=Mr(i)});else if(e.rawData&&typeof e.rawData.byteLength=="number"&&e.rawData.byteLength>0){let i=o.data,a=new DataView(e.rawData.buffer,e.rawData.byteOffset,e.rawData.byteLength),s=kd(e.dataType),u=e.rawData.byteLength/s;if(e.rawData.byteLength%s!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let c=Ld(a,e.dataType,l*s);i[l]=c}}else{let i;switch(e.dataType){case se.onnx.TensorProto.DataType.FLOAT:i=e.floatData;break;case se.onnx.TensorProto.DataType.INT32:case se.onnx.TensorProto.DataType.INT16:case se.onnx.TensorProto.DataType.UINT16:case se.onnx.TensorProto.DataType.INT8:case se.onnx.TensorProto.DataType.UINT8:case se.onnx.TensorProto.DataType.BOOL:i=e.int32Data;break;case se.onnx.TensorProto.DataType.INT64:i=e.int64Data;break;case se.onnx.TensorProto.DataType.DOUBLE:i=e.doubleData;break;case se.onnx.TensorProto.DataType.UINT32:case se.onnx.TensorProto.DataType.UINT64:i=e.uint64Data;break;default:throw new Error("unspecific error")}if(i==null)throw new Error("failed to populate data from a tensorproto value");let a=o.data;if(a.length!==i.length)throw new Error("array length mismatch");for(let s=0;s<i.length;s++){let u=i[s];$n.isLong(u)?a[s]=qs(u,e.dataType):a[s]=u}}return o}static fromData(e,n,t){return new r(n,t,void 0,void 0,e)}static fromOrtTensor(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let n=He.tensorDimsFromORTFormat(e),t=He.tensorDataTypeFromProto(e.dataType()),o=new r(n,t);if(t==="string")for(let i=0;i<e.stringDataLength();i++)o.data[i]=e.stringData(i);else if(e.rawDataArray()&&typeof e.rawDataLength()=="number"&&e.rawDataLength()>0){let i=o.data,a=new DataView(e.rawDataArray().buffer,e.rawDataArray().byteOffset,e.rawDataLength()),s=kd(e.dataType()),u=e.rawDataLength()/s;if(e.rawDataLength()%s!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let c=Ld(a,e.dataType(),l*s);i[l]=c}}return o}}});function q(r){return r===1?u0:l0}function Nd(r){let e=q(r);return`${e.version}
      precision highp float;
      ${e.attribute} vec3 position;
      ${e.attribute} vec2 textureCoord;

      ${e.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function Md(r){let e=q(r);return`${e.version}
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

    `}function Bd(r,e){let n=q(r);return`
  void main() {
    int indices[${e}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${n.output} = result;
  }
  `}var u0,l0,Pe=$(()=>{"use strict";u0={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},l0={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}});var le=$(()=>{"use strict"});async function js(r,e=t=>0,n){return new Promise((t,o)=>{let i=0,a=()=>{if(r()){t();return}i++;let s=e(i);if(n!=null&&i>=n){o();return}setTimeout(a,s)};a()})}function ko(r){return dr(typeof r<"u"&&r.length!==0,()=>"empty string found for sampler name"),"get"+r.charAt(0).toUpperCase()+r.slice(1)}function Vd(r){return dr(typeof r<"u"&&r.length!==0,()=>"empty string found for sampler name"),"get"+r.charAt(0).toUpperCase()+r.slice(1)+"AtOutCoords"}function pr(r,e){let n=JSON.parse(JSON.stringify(r));return n=e,n}function fr(r,e){return e.map(n=>r[n]).join(", ")}function Ze(r){if(r<=1)return"int";if(r===2)return"ivec2";if(r===3)return"ivec3";if(r===4)return"ivec4";if(r===5)return"ivec5";if(r===6)return"ivec6";throw Error(`GPU for rank ${r} is not yet supported`)}function wt(r=6){return["x","y","z","w","u","v"].slice(0,r)}var un=$(()=>{"use strict";ye()});function c0(r,e){return wt(e).map(n=>`${r}.${n}`)}function hr(r,e){return e===1?[r]:c0(r,e)}function ln(){return`
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
  `}var Zn=$(()=>{"use strict";un()});function p0(r,e,n){if(r===0)return"false";if(r===1)return`rc > ${e[0]}`;let t="";for(let o=r-2;o<r;o++)t+=`${n[o]} >= ${e[o-r+2]}`,o<r-1&&(t+="||");return t}function f0(r,e){let n=r.length;if(n===0)return"getA(), 0, 0, 0";if(n===1)return`getA(rc),
            rc + 1 >= ${r[0]} ? 0. : getA(rc + 1),
            0, 0`;let t="r, c",o="r, cp1",i="rp1, c",a="rp1, cp1",s="";if(n>2)for(let u=0;u<n-2;++u)s=s+`${e[u]},`;return`getA(${s}${t}),
          rEdge ? 0. : getA(${s}${i}),
          cEdge ? 0. : getA(${s}${o}),
          rEdge || cEdge ? 0. : getA(${s}${a})`}function h0(r,e,n,t){return r===0||r===1?"":`
    int r = ${e[r-2]};
    int c = ${e[r-1]};
    int rp1 = ${e[r-2]} + 1;
    int cp1 = ${e[r-1]} + 1;
    bool rEdge = rp1 >= ${t};
    bool cEdge = cp1 >= ${n};
    `}var Fd,d0,Gd,Ud=$(()=>{"use strict";Pe();le();un();Zn();Fd={name:"pack",inputNames:["A"],inputTypes:[1]},d0=(r,e)=>{let n=q(r.session.backend.glContext.version),t=e.dims,o=t.length,i=e.dims.length,a=Ze(i),s=hr("rc",i),u=h0(i,s,t[t.length-2],t[t.length-1]),l;o===0?l=[1,1]:o===1?l=[t[0],1]:l=[t[i-1],t[i-2]];let c=p0(i,l,s),d=f0(t,s),p=`
        void main() {
          ${a} rc = getOutputCoords();

          if(${c}) {
            ${n.output} = vec4(0);
          } else {
            ${u}

            ${n.output} = vec4(${d});
          }
        }
      `;return{...Fd,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:2},shaderSource:p}},Gd=(r,e)=>({...Fd,get:()=>d0(r,e)})});function Ks(r){if(r.length===0)return[1,1,1];let e=1;for(let n=0;n<r.length-2;++n)e*=r[n];return[e,r.length>1?r[r.length-2]:1,r[r.length-1]]}function Hd(r,e){let n=!1;return r.length===0||e.length===0?n=!0:r.length<2||e.length<2?n=r[r.length-1]===e[e.length-1]:n=r[r.length-1]===e[e.length-1]&&r[r.length-2]===e[e.length-2],n}function b0(r){let e=F.computeStrides(r),n=["b","r","c"],t="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${e.map((i,a)=>{let s=`int ${n[a]} = ${t} / ${i}`,u=a===e.length-1?`int ${n[a+1]} = ${t} - ${n[a]} * ${i}`:`index -= ${n[a]} * ${i}`;return`${s}; ${u};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function y0(r){let e=F.computeStrides(r);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${e[0]} + coords.z * ${e[1]} + coords.y;
  }
`}var m0,g0,Wd,qd=$(()=>{"use strict";ye();Pe();le();Zn();m0=r=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${r}`}),g0=(r,e,n,t)=>{let o=e.dims,i=t,a="";for(let l=0;l<4;l++){let c="";switch(l){case 0:c="outputCoords = rc;";break;case 1:c="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:c="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:c="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw new Error}a+=`
        ${c}
        ${l>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${l}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${l>0?"}":""}
      `}let s=q(r.session.backend.glContext.version),u=`
      ${b0(o)}
      ${y0(i)}
      ${ln()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${i[2]};
        int cols = ${i[1]};

        ${a}
        ${s.output} = result;
      }
    `;return{...n,output:{dims:i,type:e.type,textureType:2},shaderSource:u,hasMain:!0}},Wd=(r,e,n)=>{let t=m0(n);return{...t,get:()=>g0(r,e,t,n)}}});var Xs,jd=$(()=>{"use strict";Pe();le();Xs=(r,e)=>{let n=e.shape,t=q(r.session.backend.glContext.version),o=`
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
    }`,i={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:n,type:e.tensor.type,textureType:3},shaderSource:o,hasMain:!0};return r.executeProgram(i,[e.tensor])}});function x0(r,e){if(r===1)return"rc";let n="";for(let t=0;t<r;t++)n+=e[t],t<r-1&&(n+=",");return n}var Kd,_0,Xd,Zd=$(()=>{"use strict";Pe();le();un();Zn();Kd={name:"unpack",inputNames:["A"],inputTypes:[2]},_0=(r,e)=>{let n=e.dims.length,t=hr("rc",n),o=t.slice(-2),i=Ze(n),a=ln(),u=e.dims.length===0?"":x0(n,t),l=n<=1?"rc":`vec2(${o.join(",")})`,c=q(r.session.backend.glContext.version),d=`
    ${a}
    void main() {
      ${i} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${u});

       ${c.output} = vec4(getChannel(packedInput, ${l}), 0, 0, 0);
     }
   `;return{...Kd,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:d}},Xd=(r,e)=>({...Kd,get:()=>_0(r,e)})});var Lo,Br,zo,Vr=$(()=>{"use strict";ut();Lo=class{constructor(e,n=1){if(n===1)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=n;else if(n===4)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=n;else throw new Error(`Invalid number of channels: ${n}`)}encode(e,n){let t,o;return e.constructor!==Float32Array&&(_e.warning("Encoder","data was not of type Float32; creating new Float32Array"),o=new Float32Array(e)),n*this.channelSize>e.length?(_e.warning("Encoder","Source data too small. Allocating larger array"),o=e,t=this.allocate(n*this.channelSize),o.forEach((i,a)=>t[a]=i)):(o=e,t=o),t}allocate(e){return new Float32Array(e*4)}decode(e,n){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,n):e.subarray(0,n)}},Br=class{constructor(e,n=1,t){if(n!==1&&n!==4)throw new Error(`Invalid number of channels: ${n}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=n,this.textureType=t||e.FLOAT}encode(e,n){let t=e;return this.channelSize===1&&(_e.verbose("Encoder","Exploding into a larger array"),t=this.allocate(n),e.forEach((o,i)=>t[i*4]=o)),t}allocate(e){return new Float32Array(e*4)}decode(e,n){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,n):e.subarray(0,n)}},zo=class{constructor(e,n=1){this.channelSize=4;if(n===1)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=n;else if(n===4)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=n;else throw new Error(`Invalid number of channels: ${n}`)}encode(e,n){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,n){if(e instanceof Uint8Array)return e.subarray(0,n);throw new Error(`Invalid array type: ${e.constructor}`)}}});var Fr,Jd,Zs,Qd=$(()=>{"use strict";ye();le();Fr=(r,e,n)=>{let t=n===0||n===1?1:4,o=n===2,i=n===1||n===2,a=n===4?e.length-1:void 0,s=n===4?e.map((u,l)=>l===e.length-1?u*4:u):void 0;return Zs(r,e,t,s,{isPacked:o,reverseWH:i,breakAxis:a})},Jd=(r,e,n)=>{let t=Fr(r,e,n);return[t.width,t.height]},Zs=(r,e,n=1,t,o)=>{let i=!!(o&&o.isPacked),[a,s]=r.computeTextureWH(i&&t||e,o),u=e.length,l=e.slice(0);if(u===0&&(l=[1]),n===1)t=e;else if(i){if(n!==4)throw new Error("a packed texture must be 4-channel");t=e,u>0&&(l[u-1]=Math.ceil(l[u-1]/2)),u>1&&(l[u-2]=Math.ceil(l[u-2]/2))}else if(!t)throw new Error("Unpacked shape is needed when using channels > 1");return{width:a,height:s,channels:n,isPacked:i,shape:l,strides:F.computeStrides(l),unpackedShape:t,reversedWH:o&&o.reverseWH}}});var v0,Ro,ep=$(()=>{"use strict";ut();Xn();ye();Ud();qd();jd();Zd();Vr();Qd();le();v0=(r,e)=>{let n=e.map(o=>`${o.unpackedShape.join(",")};${o.width}x${o.height}`).join("_"),t=r.name;return r.cacheHint&&(t+="["+r.cacheHint+"]"),t+=":"+n,t},Ro=class{constructor(e){this.session=e;this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,n){return Jd(this.session.layoutStrategy,e,n)}executeProgram(e,n){if(n.length<e.inputNames.length)throw new Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw new Error("input names size does not match input types");let t=[];for(let l=0;l<e.inputNames.length;++l)t[l]=this.getOrCreateTextureData(n[l],e.inputTypes[l]);let o=v0(e,t),i=this.session.programManager.getArtifact(o),a=i?i.programInfo:typeof e.get=="function"?e.get():e,s=Fr(this.session.layoutStrategy,a.output.dims,a.output.textureType),u=this.createTextureData(s,a.output.type);return i||(i=this.session.programManager.build(a,t,u),this.session.programManager.setArtifact(o,i)),this.runProgram(i,t,u),u}run(e,n){return this.executeProgram(e,n).tensor}runProgram(e,n,t){for(let o=0;o<n.length;++o)if(!!n[o].isPacked!=(e.programInfo.inputTypes[o]===2))throw new Error(`input[${o}] property packed inconsistent`);if(!!t.isPacked!=(e.programInfo.output.textureType===2))throw new Error("output property packed inconsistent");this.session.programManager.run(e,n,t)}getOrCreateTextureData(e,n){let t=this.getTextureData(e.dataId,n===2);if(!t&&(t=this.getTextureData(e.dataId,n!==2),t))return n===2?this.pack(t):this.unpack(t);if(!t){let o=Fr(this.session.layoutStrategy,e.dims,n);if(n===4){let s=e.dims;if(s.length===4){let u=[s[0],Math.ceil(s[1]*s[2]*s[3]/4)],l=Fr(this.session.layoutStrategy,u,n),c=e.numberData;if(s[1]*s[2]*s[3]%4!==0){let d=s[0],p=s[1]*s[2]*s[3],f=Math.ceil(p*1/4)*4,h=d*f;c=new Float32Array(h);for(let m=0;m<d;++m){let y=m*p,g=m*f+m%1*p;c.set(e.numberData.subarray(y,y+p),g)}}return this.createTextureData(l,e.type,c,e,1)}}if(n===2){let i=Zs(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),a=this.createTextureData(i,e.type,e.numberData,e,1);t=this.pack(a)}else t=this.createTextureData(o,e.type,e.numberData,e,1)}return t}createTextureDataFromLayoutBindTensor(e,n,t,o){return this.createTextureData(e,n,t,o,1)}createTextureData(e,n,t,o,i){_e.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let a=this.session.textureManager.createTextureFromLayout(n,e,t,i);return this.createTextureDataFromTexture(e,n,a,o)}reshapeUnpacked(e,n){let t=this.getOrCreateTextureData(e,0),o={channels:t.channels,height:t.height,width:t.width,shape:n.length!==0?n:[1],strides:F.computeStrides(n),unpackedShape:n};return this.createTextureDataFromTexture(o,e.type,t.texture).tensor}reshapePacked(e,n){let t=this.getOrCreateTextureData(e,2);if(Hd(e.dims,n)){let l={channels:t.channels,height:t.height,width:t.width,shape:n.length!==0?n:[1],strides:F.computeStrides(n),unpackedShape:n,isPacked:!0};return this.createTextureDataFromTexture(l,e.type,t.texture).tensor}let o=Ks(e.dims),i=Ks(n),a=this.reshapePacked(e,o),s=this.run(Wd(this,a,i),[a]);return this.reshapePacked(s,n)}cast(e,n){let t=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(t,n,t.texture).tensor}createTextureDataFromTexture(e,n,t,o,i){let a={...e,tensor:o||new Re(e.unpackedShape,n,s=>this.readTexture(a),async s=>this.readTextureAsync(a),void 0,i),texture:t};return this.setTextureData(a.tensor.dataId,a,e.isPacked),a}getTextureData(e,n=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,n):n?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,n,t=!1){this.session.isInitializer(e)?this.session.setTextureData(e,n,t):(t?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,n)}isTextureLayoutCached(e,n=!1){return!!this.getTextureData(e.dataId,n)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(Xs(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(Xs(this,e))}pack(e){return this.executeProgram(Gd(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(Xd(this,e.tensor),[e.tensor])}}});var Js,ae,Ue=$(()=>{"use strict";Js=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},ae=r=>new Js(r)});var tp,np,rp,w0,I0,op=$(()=>{"use strict";Ue();Pe();le();tp={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},np=(r,e,n)=>(I0(e),[r.run({...tp,cacheHint:n.cacheKey,get:()=>w0(r,e,n)},e)]),rp=r=>{let e=r.attributes.getFloat("epsilon",1e-5),n=r.attributes.getFloat("momentum",.9),t=r.attributes.getInt("spatial",1);return ae({epsilon:e,momentum:n,spatial:t})},w0=(r,e,n)=>{let t=q(r.session.backend.glContext.version),o=e[0].dims.length,[i,a]=r.calculateTextureWidthAndHeight(e[1].dims,0),s=`
  float process(int[${o}] indices) {
    vec2 position = offsetToCoords(indices[1], ${i}, ${a});
    float scale = getColorAsFloat(${t.texture2D}(Scale, position));
    float mean = getColorAsFloat(${t.texture2D}(Mean, position));
    float variance = getColorAsFloat(${t.texture2D}(Variance, position));
    float b = getColorAsFloat(${t.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${n.epsilon})) ) + b;
  }`;return{...tp,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:s}},I0=r=>{if(!r||r.length!==5)throw new Error("BatchNormalization requires 5 inputs.");let e=r[0],n=r[1],t=r[2],o=r[3],i=r[4];if(e.dims.length<3||n.dims.length!==1||t.dims.length!==1||o.dims.length!==1||i.dims.length!==1)throw new Error("invalid input shape.");if(n.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1]||o.dims[0]!==e.dims[1]||i.dims[0]!==e.dims[1])throw new Error("invalid input shape.");if(e.type!=="float32"&&e.type!=="float64"||n.type!=="float32"&&n.type!=="float64"||t.type!=="float32"&&t.type!=="float64"||o.type!=="float32"&&o.type!=="float64"||i.type!=="float32"&&i.type!=="float64")throw new Error("invalid input tensor types.")}});var No,ht,N,Gr,Mo,Tn=$(()=>{"use strict";No=class{constructor(e,n,t,o){this.glContext=e;this.programInfo=n;this.inputTextureLayouts=t;this.outputTextureLayout=o}},ht=class{constructor(e){this.context=e}},N=class{constructor(e,n){this.routineBody=e;this.dependencies=n}},Gr=class{constructor(e,n,t){this.name=e;t?this.dependencies=t:this.dependencies=[],n&&(this.routineBody=n)}addDependency(e){e&&this.dependencies.push(e)}},Mo=class{static returnOrderedNodes(e){if(!e||e.length===0)return[];if(e.length===1)return e;let n=new Set,t=new Set,o=new Array;return this.createOrderedNodes(e,n,t,o),o}static createOrderedNodes(e,n,t,o){for(let i=0;i<e.length;++i)this.dfsTraverse(e[i],n,t,o)}static dfsTraverse(e,n,t,o){if(!e||t.has(e.name))return;if(n.has(e.name))throw new Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");n.add(e.name);let i=e.dependencies;if(i&&i.length>0)for(let a=0;a<i.length;++a)this.dfsTraverse(i[a],n,t,o);o.push(e),t.add(e.name),n.delete(e.name)}}});function $0(){let r="add_";return{body:`
  float ${r}(float a, float b) {
    return a + b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:r,type:0}}function A0(){let r="div_";return{body:`
  float ${r}(float a, float b) {
    return a / b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:r,type:0}}function P0(){let r="mul_";return{body:`
  float ${r}(float a, float b) {
    return a * b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:r,type:0}}function O0(){let r="sub_";return{body:`
  float ${r}(float a, float b) {
    return a - b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:r,type:0}}function E0(){let r="equal_";return{body:`
  float ${r}(float a, float b) {
    return float(a == b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:r,type:0}}function C0(){let r="greater_";return{body:`
  float ${r}(float a, float b) {
    return float(a > b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:r,type:0}}function D0(){let r="less_";return{body:`
  float ${r}(float a, float b) {
    return float(a < b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:r,type:0}}function k0(){let r="and_";return{body:`
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
  `,name:r,type:0}}function L0(){let r="or_";return{body:`
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
  `,name:r,type:0}}function z0(){let r="xor_";return{body:`
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
  `,name:r,type:0}}function R0(){return M0("pow")}function N0(){let r="prelu_";return{body:`
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
  `,name:r,type:0}}function M0(r){let e=`${r}_`;return{body:`
  float ${e}(float a, float b) {
    return ${r}(a, b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return ${r}(v1, v2);
  }
  `,name:e,type:0}}var mt,B0,ip,ap,sp,up,lp,cp,dp,pp,fp,hp,mp,gp,bp=$(()=>{"use strict";ye();Tn();Pe();le();mt=(r,e,n,t=e[0].type,o)=>{let i=r.session.pack?2:0;return{name:n.name,inputNames:["A","B"],inputTypes:[i,i],cacheHint:o,get:()=>B0(r,e,n,t)}},B0=(r,e,n,t=e[0].type)=>{let o=r.session.pack?2:0,i=!F.areEqual(e[0].dims,e[1].dims),a=e[0].dims,s=r.session.pack;if(i){let c=Xe.calcShape(e[0].dims,e[1].dims,!1);if(!c)throw new Error("Can't perform binary op on the given tensors");a=c;let d=a.length,p=e[0].dims.length!==0?e[0].dims.length:1,f=e[1].dims.length!==0?e[1].dims.length:1,h=e[0].dims.length!==0?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",m=e[1].dims.length!==0?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",y=q(r.session.backend.glContext.version),g=s?`
      ${n.body}
      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();
        vec4 result = ${n.name}(a, b);
        ${y.output} = result;
      }`:`
      ${n.body}
      float process(int indices[${d}]) {
        int aindices[${p}];
        int bindices[${f}];
        ${h}
        ${m}
        return ${n.name}(_A(aindices), _B(bindices));
      }`;return{name:n.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:a,type:t,textureType:o},shaderSource:g,hasMain:s}}let u=q(r.session.backend.glContext.version),l=`
    ${n.body}
    void main() {
      vec4 v1 = ${u.texture2D}(A, TexCoords);
      vec4 v2 = ${u.texture2D}(B, TexCoords);
      vec4 result = ${n.name}(v1, v2);
      ${u.output} = result;
    }
    `;return{name:n.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:e[0].dims,type:t,textureType:o},shaderSource:l,hasMain:!0}},ip=(r,e)=>[r.run(mt(r,e,$0()),e)],ap=(r,e)=>[r.run(mt(r,e,k0(),"bool"),e)],sp=(r,e)=>[r.run(mt(r,e,A0()),e)],up=(r,e)=>[r.run(mt(r,e,E0(),"bool"),e)],lp=(r,e)=>[r.run(mt(r,e,C0(),"bool"),e)],cp=(r,e)=>[r.run(mt(r,e,D0(),"bool"),e)],dp=(r,e)=>[r.run(mt(r,e,P0()),e)],pp=(r,e)=>[r.run(mt(r,e,L0(),"bool"),e)],fp=(r,e)=>[r.run(mt(r,e,R0()),e)],hp=(r,e)=>[r.run(mt(r,e,N0()),e)],mp=(r,e)=>[r.run(mt(r,e,O0()),e)],gp=(r,e)=>[r.run(mt(r,e,z0(),"bool"),e)]});var yp,_p,F0,xp=$(()=>{"use strict";ye();yp=(r,e,n)=>(F0(e),[r.cast(e[0],n)]),_p=r=>He.tensorDataTypeFromProto(r.attributes.getInt("to")),F0=r=>{if(!r||r.length!==1)throw new Error("Cast requires 1 input.");if(r[0].type==="string")throw new Error("Invalid input type.")}});var G0,U0,Tp,Bo,vp=$(()=>{"use strict";Pe();le();un();Zn();G0=(r,e)=>({name:"Concat (packed)",inputNames:Array.from({length:r},(n,t)=>`X${t}`),inputTypes:Array(r).fill(2),cacheHint:e}),U0=(r,e,n,t)=>{let o=n[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let w=1;w<n.length;w++){let I=n[w].dims.slice();for(let P=0;P<o.length;P++)if(P===t)i[t]+=I[P];else if(o[P]!==I[P])throw new Error("non concat dimensions must match")}let a=i.length,s=hr("coords",a),u=Ze(a),l=ln(),c=n.map(w=>w.dims),d=wt(a),p=new Array(c.length-1);p[0]=c[0][t];for(let w=1;w<p.length;w++)p[w]=p[w-1]+c[w][t];let f=d[t],h=d.slice(-2),m=d.join(),y=`if (${f} < ${p[0]}) {
        return getChannel(
            getX0(${m}), vec2(${h.join()}));
        }`;for(let w=1;w<p.length;w++){let I=p[w-1];y+=`
            if (${f} < ${p[w]}  && ${f} >= ${p[w-1]}) {
              return getChannel(
                getX${w}(${Bo(d,f,I)}),
                vec2(${Bo(h,f,I)}));
            }`}let g=p.length,b=p[p.length-1];y+=`
            return getChannel(
              getX${g}(${Bo(d,f,b)}),
              vec2(${Bo(h,f,b)}));`;let _=q(r.session.backend.glContext.version),T=`
          ${l}
          float getValue(${d.map(w=>"int "+w)}) {
            ${y}
          }

          void main() {
            ${u} coords = getOutputCoords();
            int lastDim = coords.${d[a-1]};
            coords.${d[a-1]} = coords.${d[a-2]};
            coords.${d[a-2]} = lastDim;

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
            ${_.output} = result;
          }
        `;return{...e,output:{dims:i,type:n[0].type,textureType:2},shaderSource:T,hasMain:!0}},Tp=(r,e,n)=>{let t=G0(e.length,n.cacheKey);return{...t,get:()=>U0(r,t,e,n.axis)}},Bo=(r,e,n)=>{let t=r.indexOf(e);return r.map((i,a)=>a===t?`${i} - ${n}`:i).join()}});var wp,W0,H0,q0,Ip,j0,K0,X0,Sp,Z0,$p=$(()=>{"use strict";Ue();le();vp();wp=(r,e,n)=>(Z0(e),r.session.pack&&e[0].dims.length>1?[r.run(Tp(r,e,n),e)]:[r.run(q0(r,e,n),e)]),W0=(r,e)=>({name:"Concat",inputNames:Array.from({length:r},(n,t)=>`X${t}`),inputTypes:Array(r).fill(0),cacheHint:e}),H0=(r,e,n,t)=>{let o=n[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let f=1;f<n.length;f++){let h=n[f].dims.slice();for(let m=0;m<o.length;m++)if(m===t)i[t]+=h[m];else if(o[m]!==h[m])throw new Error("non concat dimensions must match")}let a=i.length,s=new Array(n.length),u=0;for(let f=0;f<s.length;++f)u+=n[f].dims[t],s[f]=u;let l="";n.length<5?l=Ip(s):l=j0(s);let c=K0(n.length,a),d=X0(s),p=`
        ${c}
        ${d}
        ${l}
        float process(int indices[${a}]) {
          int textureIndex = getTextureWhereDataResides (indices[${t}]);

          if(textureIndex != 0) {
            indices[${t}] = indices[${t}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:p}},q0=(r,e,n)=>{let t=W0(e.length,n.cacheKey);return{...t,get:()=>H0(r,t,e,n.axis)}},Ip=r=>`int getTextureWhereDataResides(int index) {
      ${r.map((n,t)=>`if(index<${n}) {return ${t};}
`).join("")}
    }`,j0=r=>Ip(r),K0=(r,e)=>{let n=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${e}]) {`];for(let t=0;t<r;++t)t===0?n.push(`	if (textureIndex == ${t}) { return _X${t}(indices); }`):t===r-1?n.push(`	else { return _X${t}(indices); }`):n.push(`	else if (textureIndex == ${t}) { return _X${t}(indices); }`);return n.push("	}"),n.join(`
`)},X0=r=>{let e=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let n=0;n<r.length;++n)n===0?e.push(`	if (index == ${n}) { return ${r[n]}; }`):n===r.length-1?e.push(`	else { return ${r[n]}; }`):e.push(`	else if (index == ${n}) { return ${r[n]}; }`);return e.push("	}"),e.join(`
`)},Sp=r=>ae({axis:r.attributes.getInt("axis")}),Z0=r=>{if(!r||r.length<1)throw new Error("too few inputs");let e=r[0].type,n=r[0].dims.length;if(e==="string")throw new Error("string tensor is not supported yet");for(let t of r){if(t.type!==e)throw new Error("input tensors should be one type");if(t.dims.length!==n)throw new Error("input tensors should have the same shape")}}});function J0(){return gt("abs")}function Q0(){return gt("acos")}function Y0(){return gt("asin")}function eI(){return gt("atan")}function tI(){return gt("ceil")}function nI(){return gt("cos")}function rI(r){let e="elu";return{body:`
  const float alpha = float(${r});

  float ${e}_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function oI(){return gt("exp")}function iI(){return gt("floor")}function Qs(r,e){let n="clip";return{body:`
  const float min = float(${r});
  const float max = float(${e});

  float ${n}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${n}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:n,type:0}}function aI(){let r="indentity";return{body:`
  float ${r}_(float a) {
    return a;
  }
  vec4 ${r}_(vec4 v) {
    return v;
  }
  `,name:r,type:0}}function sI(r){let e="leakyRelu";return{body:`
  const float alpha = float(${r});

  float ${e}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function uI(){return gt("log")}function lI(){let r="neg";return{body:`
  float ${r}_(float a) {
    return -a;
  }
  vec4 ${r}_(vec4 v) {
    return -v;
  }
  `,name:r,type:0}}function cI(){let r="not";return{body:`
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
  `,name:r,type:0}}function dI(){return gt("sin")}function Ys(){let r="relu";return{body:`
  float ${r}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${r}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:r,type:0}}function eu(){let r="sigmoid";return{body:`
  float ${r}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${r}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:r,type:0}}function pI(){return gt("sqrt")}function fI(){return gt("tan")}function hI(){let r="tanh";return{body:`
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
  `,name:r,type:0}}function gt(r){return{body:`
  float ${r}_(float a) {
    return ${r}(a);
  }
  vec4 ${r}_(vec4 v) {
    return ${r}(v);
  }
  `,name:r,type:0}}var mI,ze,Ap,Pp,Op,Ep,tu,Cp,Dp,gI,kp,Lp,zp,Rp,Np,Mp,nu,Bp,Vp,Fp,Gp,Up,Wp,Hp,qp,jp,Kp,Xp,ru=$(()=>{"use strict";Ue();ye();Tn();Pe();le();mI=(r,e,n,t)=>{let o=r.session.pack?2:0,i=q(r.session.backend.glContext.version);return{...e,output:{dims:n.dims,type:n.type,textureType:o},shaderSource:`
     ${t.body}
     void main() {
       vec4 v = ${i.texture2D}(A, TexCoords);
       v = ${t.name}_(v);
       ${i.output} = v;
     }
     `,hasMain:!0}},ze=(r,e,n,t)=>{let o=r.session.pack?2:0,i={name:n.name,inputTypes:[o],inputNames:["A"],cacheHint:t};return{...i,get:()=>mI(r,i,e,n)}},Ap=(r,e)=>[r.run(ze(r,e[0],J0()),e)],Pp=(r,e)=>[r.run(ze(r,e[0],Q0()),e)],Op=(r,e)=>[r.run(ze(r,e[0],Y0()),e)],Ep=(r,e)=>[r.run(ze(r,e[0],eI()),e)],tu=(r,e,n)=>[r.run(ze(r,e[0],Qs(n.min,n.max),n.cacheKey),e)],Cp=r=>ae({min:r.attributes.getFloat("min",jn),max:r.attributes.getFloat("max",Kn)}),Dp=(r,e)=>{let n=gI(r,e);return tu(r,[e[0]],n)},gI=(r,e)=>{if(e.length>=3&&(!r.session.isInitializer(e[1].dataId)||!r.session.isInitializer(e[2].dataId)))throw new Error("dynamic clip attributes are not allowed");let n=e.length>=3?e[1].numberData[0]:jn,t=e.length>=3?e[2].numberData[0]:Kn;return ae({min:n,max:t})},kp=(r,e)=>[r.run(ze(r,e[0],tI()),e)],Lp=(r,e)=>[r.run(ze(r,e[0],nI()),e)],zp=(r,e,n)=>[r.run(ze(r,e[0],rI(n.alpha),n.cacheKey),e)],Rp=r=>ae({alpha:r.attributes.getFloat("alpha",1)}),Np=(r,e)=>[r.run(ze(r,e[0],oI()),e)],Mp=(r,e)=>[r.run(ze(r,e[0],iI()),e)],nu=(r,e)=>[r.run(ze(r,e[0],aI()),e)],Bp=(r,e,n)=>[r.run(ze(r,e[0],sI(n.alpha),n.cacheKey),e)],Vp=r=>ae({alpha:r.attributes.getFloat("alpha",.01)}),Fp=(r,e)=>[r.run(ze(r,e[0],uI()),e)],Gp=(r,e)=>[r.run(ze(r,e[0],lI()),e)],Up=(r,e)=>[r.run(ze(r,e[0],cI()),e)],Wp=(r,e)=>[r.run(ze(r,e[0],Ys()),e)],Hp=(r,e)=>[r.run(ze(r,e[0],eu()),e)],qp=(r,e)=>[r.run(ze(r,e[0],dI()),e)],jp=(r,e)=>[r.run(ze(r,e[0],pI()),e)],Kp=(r,e)=>[r.run(ze(r,e[0],fI()),e)],Xp=(r,e)=>[r.run(ze(r,e[0],hI()),e)]});function cn(r){let e;switch(r.activation){case"Relu":e=Ys();break;case"Sigmoid":e=eu();break;case"Clip":e=Qs(r.clipMin,r.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let n=e.name,t=e.body,o=`value = ${n}_(value);`;return{activationFunction:t,applyActivation:o}}var mr,Jn=$(()=>{"use strict";ye();ru();mr=r=>{let e=r.getString("activation","");if(e==="Clip"){let[n,t]=r.getFloats("activation_params",[jn,Kn]);return{activation:e,clipMax:t,clipMin:n,activationCacheKey:`${e}:${n},${t}`}}return{activation:e,activationCacheKey:e}}});var yI,_I,Zp,Jp=$(()=>{"use strict";ut();Pe();le();Vo();Jn();yI=(r,e)=>({name:"GroupedConv",inputNames:r?["X","W","Bias"]:["X","W"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e}),_I=(r,e,n,t)=>{let i=e.length>2?"value += getBias(output_channel);":"",a=e[0].dims.slice(),s=e[1].dims.slice(),u=s[0]/t.group;_e.verbose("GroupedConv",`autpPad:${t.autoPad}, dilations:${t.dilations}, group:${t.group}, kernelShape:${t.kernelShape}, pads:${t.pads}, strides:${t.strides}`);let l=gr(a,s,t.dilations,t.pads,t.strides),c=q(r.session.backend.glContext.version),{activationFunction:d,applyActivation:p}=cn(t),f=`
  const ivec2 strides = ivec2(${t.strides[0]}, ${t.strides[1]});
  const ivec2 pads = ivec2(${t.pads[0]}, ${t.pads[1]});
  ${d}
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
    ${p}
    ${c.output} = vec4(value, .0, .0, .0);
  }
`;return{...n,output:{dims:l,type:e[0].type,textureType:0},shaderSource:f,hasMain:!0}},Zp=(r,e,n)=>{let t=yI(e.length>2,n.cacheKey);return{...t,get:()=>_I(r,e,t,n)}}});var xI,TI,Qp,Yp=$(()=>{"use strict";Pe();le();Zn();xI=r=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:r}),TI=(r,e,n,t,o,i)=>{let a=n.dims,s=t.dims,u=2,l=3,c=o.length,d=[s[1]*s[2]*s[3],o[2]*o[3]],p=s[2]*s[3],f=ln(),h=q(r.session.backend.glContext.version),m="";for(let g=0;g<=1;g++)for(let b=0;b<=1;b++)m+=`
            blockIndex = rc.x + ${b};
            pos = rc.y + ${g};

            if(blockIndex < ${d[1]} && pos < ${d[0]}) {
              offsetY = int(blockIndex / (${o[c-1]})) * ${i.strides[0]} -
                ${i.pads[0]};
              d0 = offsetY + ${i.dilations[0]} * (imod(pos, ${p}) / ${s[2]});

              if(d0 < ${a[u]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${o[c-1]}) * ${i.strides[1]} -
                  ${i.pads[1]};
                d1 = offsetX + ${i.dilations[1]} * imod(imod(pos, ${p}), ${s[2]});

                if(d1 < ${a[l]} && d1 >= 0) {

                  ch = int(float(pos)/ ${p}.);
                    innerDims = vec2(d0, d1);
                    result[${g*2+b}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;let y=`
      ${f}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${m}
          ${h.output} = result;
      }
            `;return{...e,output:{dims:d,type:n.type,textureType:2},shaderSource:y,hasMain:!0}},Qp=(r,e,n,t,o)=>{let i=xI(o.cacheKey);return{...i,get:()=>TI(r,i,e,n,t,o)}}});function wI(r,e,n){let t=e[0].dims,o=e[1].dims,i=Xe.calcShape(t,o,!0);if(!i)throw new Error("Can't use matmul on the given tensors");let a=Ze(i.length),s=wt(),{activationFunction:u,applyActivation:l}=cn(n),c=e.length>2,d=c?"value += getBiasForMatmul();":"",p=c?`${iu(a,s,e[2].dims,i,!1)}`:"",f=i.length,h=t.length,m=o.length,y=t[t.length-1],g=`
    ${u}
    ${p}
    float process(int indices[${f}]) {
        int a[${h}];
        int b[${m}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${y}; ++k) {
            a[${h-1}] = k;
            b[${m-2}] = k;
            value += _A(a) * _B(b);
        }
        ${d}
        ${l}
        return value;
    }`;return{...r,output:{dims:i,type:e[0].type,textureType:0},shaderSource:g}}function ou(r,e){let n=vI(r.length>2,e.activationCacheKey);return{...n,get:()=>wI(n,r,e)}}function iu(r,e,n,t,o){let i="",a=n.length,s=t.length,u=s-a;s<2&&a>0?i="coords":i=n.map((m,y)=>`coords.${e[y+u]}`).join(", ");let c=Xe.getBroadcastDims(n,t).map(m=>`coords.${e[m+u]} = 0;`).join(`
`),p=F.size(n)===1,f="vec4(outputValue.xx, outputValue.yy)";return p&&(f="vec4(outputValue.x)"),o?`
vec4 getBiasForMatmul() {
  ${r} coords = getOutputCoords();
  ${c}
  vec4 outputValue = getBias(${i});
  return ${f};
}`:`
float getBiasForMatmul() {
  ${r} coords = getOutputCoords();
  ${c}
  return getBias(coords.x);
}`}var ef,tf,vI,II,Fo=$(()=>{"use strict";ye();le();un();Jn();au();ef=(r,e,n)=>(II(e),r.session.pack?[r.run(Go(r,e,n),e)]:[r.run(ou(e,n),e)]),tf=r=>mr(r.attributes),vI=(r,e)=>({name:"MatMul",inputNames:r?["A","B","Bias"]:["A","B"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e});II=r=>{if(!r||r.length!==2)throw new Error("MatMul requires 2 inputs.");if(r[0].dims[r[0].dims.length-1]!==r[1].dims[r[1].dims.length-2])throw new Error("shared dimension does not match.");if(r[0].type!=="float32"&&r[0].type!=="float64"||r[1].type!=="float32"&&r[1].type!=="float64")throw new Error("inputs should be float type");if(r[0].type!==r[1].type)throw new Error("inputs types should match")}});function AI(r,e,n,t){let o=[],i=[],a=n[0].dims,s=n[1].dims,u=a.length,l=s.length,c=t.length,d=c-u,p=c-l;o=a.map((_,T)=>`coords.${e[T+d]}`),o[u-1]="i*2",o.join(", "),i=s.map((_,T)=>`coords.${e[T+p]}`),i[l-2]="i*2",i.join(", ");let f=Xe.getBroadcastDims(a,t),h=Xe.getBroadcastDims(s,t),m=f.map(_=>`coords.${e[_+d]} = 0;`).join(`
`),y=h.map(_=>`coords.${e[_+p]} = 0;`).join(`
`),g=`int lastDim = coords.${e[c-1]};
  coords.${e[c-1]} = coords.${e[c-2]};
  coords.${e[c-2]} = lastDim;`;return`
vec4 getAAtOutCoordsMatmul(int i) {
  ${r} coords = getOutputCoords();
  ${g}
  ${m}
  vec4 outputValue = getA(${o});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${r} coords = getOutputCoords();
  ${g}
  ${y}
  vec4 outputValue = getB(${i});
  return outputValue;
}`}function PI(r,e){let n="";for(let t=0;t<e-2;t++)n+=`rc.${r[t]}, `;return n+=`rc.${r[e-2]}, i*2`,n}function OI(r,e){let n="";for(let t=0;t<e-2;t++)n+=`rc.${r[t]}, `;return n+=`i*2, rc.${r[e-1]}`,n}var SI,$I,Go,au=$(()=>{"use strict";ye();Pe();le();un();Jn();Fo();SI=(r,e)=>({name:"MatMul (packed)",inputNames:r?["A","B","Bias"]:["A","B"],inputTypes:r?[2,2,2]:[2,2],cacheHint:e}),$I=(r,e,n,t)=>{let o=n.length>2,i=o?"value += getBiasForMatmul();":"",a=n[0].dims,s=n[1].dims,u=Xe.calcShape(a,s,!0),l=!F.areEqual(n[0].dims,n[1].dims);if(!u)throw new Error("Can't use matmul on the given tensors");let c=a[a.length-1],d=Math.ceil(c/2),p=a.length,f=s.length,h=q(r.session.backend.glContext.version),m=Ze(u.length),y=u.length,g=wt(),{activationFunction:b,applyActivation:_}=cn(t),T=o?`${iu(m,g,n[2].dims,u,!0)}`:"",w=l?`${AI(m,g,n,u)}`:"",I=l?"getAAtOutCoordsMatmul(i)":`getA(${PI(g,p)})`,P=l?"getBAtOutCoordsMatmul(i)":`getB(${OI(g,f)})`,O=l?"":`${m} rc =
          getOutputCoords(); int lastDim = rc.${g[y-1]}; rc.${g[y-1]} =
          rc.${g[y-2]}; rc.${g[y-2]} = lastDim;
      `,C=`
            ${w}
            ${T}
            ${b}
            void main() {
              ${O}

              vec4 value = vec4(0);
              for (int i = 0; i < ${d}; i++) {
                vec4 a = ${I};
                vec4 b = ${P};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${i}
              ${_}
              ${h.output} = value;
            }`;return{...e,output:{dims:u,type:n[0].type,textureType:2},shaderSource:C,hasMain:!0}},Go=(r,e,n)=>{let t=SI(e.length>2,n.activationCacheKey);return{...t,get:()=>$I(r,t,e,n)}}});var nf,rf=$(()=>{"use strict";Vo();Yp();au();nf=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=gr(t,o,n.dilations,n.pads,n.strides),a=r.run(Qp(r,e[0],e[1],i,n),[e[0]]),s=r.reshapePacked(e[1],[o[0],o[1]*o[2]*o[3]]),u=e.length===3?[s,a,e[2]]:[s,a],l=r.run(Go(r,u,n),u);return r.reshapePacked(l,i)}});var EI,CI,of,su,uu=$(()=>{"use strict";le();EI=r=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:r}),CI=(r,e,n,t,o,i)=>{let a=n.dims,s=t.dims,u=o.length,l=su(a,s,o,4),c=`
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
        `;return{...e,output:{dims:l,type:n.type,textureType:4},shaderSource:c}},of=(r,e,n,t,o)=>{let i=EI(o.cacheKey);return{...i,get:()=>CI(r,i,e,n,t,o)}},su=(r,e,n,t=4)=>[n[0],n[2],n[3],Math.ceil(r[1]*e[2]*e[3]/t)]});var DI,kI,af,sf=$(()=>{"use strict";ye();Pe();le();Jn();uu();DI=(r,e)=>({name:"ConvDotProduct",inputNames:r?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:r?[0,4,0]:[0,4],cacheKey:e.activationCacheKey}),kI=(r,e,n,t,o)=>{let i=n[0].dims,a=n[1].dims,s=[a[0],Math.ceil(i[1]*a[2]*a[3]/4)],u=su(i,a,t),[l,c]=r.calculateTextureWidthAndHeight(s,4),d=F.computeStrides(u),[p,f]=r.calculateTextureWidthAndHeight(u,4),h=t.length,m=n.length<3?"0.0":"_B(b)",y=Math.ceil(i[1]*a[2]*a[3]/4),{activationFunction:g,applyActivation:b}=cn(o),_=q(r.session.backend.glContext.version),T=`
${g}
float process(int indices[${h}]) {
  int b[1];
  b[0] = indices[1];
  int im2col[4];
  im2col[0] = indices[0];
  im2col[1] = indices[2];
  im2col[2] = indices[3];
  int im2colOffset = im2col[0] * ${d[0]} + im2col[1] * ${d[1]} + im2col[2] * ${d[2]};
  int kernelOffset = indices[1] * ${s[1]};
  float value = ${m};
  for (int i = 0; i < ${y}; ++i) {
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${p}, ${f});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${l}, ${c});
    value += dot(${_.texture2D}(Im2Col, im2colCoords), ${_.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${b}
  return value;
}`;return{...e,output:{dims:t,type:n[0].type,textureType:0},shaderSource:T}},af=(r,e,n,t)=>{let o=DI(e.length>2,t);return{...o,get:()=>kI(r,o,e,n,t)}}});var gr,lu,LI,zI,RI,NI,cu,MI,Vo=$(()=>{"use strict";Ue();ye();Jp();rf();sf();Jn();uu();Fo();gr=(r,e,n,t,o)=>{let i=r[0],a=r.slice(2),s=a.length,u=e[0],c=e.slice(2).map((h,m)=>h+(h-1)*(n[m]-1)),p=a.map((h,m)=>h+t[m]+t[m+s]).map((h,m)=>Math.floor((h-c[m]+o[m])/o[m]));return[i,u].concat(...p)},lu=(r,e,n)=>(MI(e,n),LI(r,e,n)),LI=(r,e,n)=>{let t=NI(n,e),o=r.session.pack,i=t.kernelShape[0]===1&&t.kernelShape[1]===1;return t.group>1?[r.run(Zp(r,e,t),e)]:i&&o?[zI(r,e,t)]:o&&e[0].dims.length===4&&e[0].dims[0]===1&&!i?[nf(r,e,t)]:[RI(r,e,t)]},zI=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=gr(t,o,n.dilations,n.pads,n.strides),a=r.reshapeUnpacked(e[0],[t[1],t[2]*t[3]]),s=r.reshapeUnpacked(e[1],[o[0],o[1]]),u=e.length>2?[s,a,e[2]]:[s,a],l=r.run(ou(u,n),u);return r.reshapeUnpacked(l,i)},RI=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=gr(t,o,n.dilations,n.pads,n.strides),a=r.run(of(r,e[0],e[1],i,n),[e[0]]),s=e.length===3?[a,e[1],e[2]]:[a,e[1]];return r.run(af(r,e,i,n),s)},NI=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0)for(let i=2;i<e[1].dims.length;++i)n.push(e[1].dims[i]);let t=r.pads.slice();qn.adjustPadsBasedOnAutoPad(e[0].dims,r.strides,r.dilations,n,t,r.autoPad);let o=Object.assign({},r);return Object.assign(o,{kernelShape:n,pads:t,cacheKey:r.cacheKey}),o},cu=r=>{let e=r.attributes,n=mr(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),a=e.getInts("kernel_shape",[]),s=e.getInts("pads",[0,0,0,0]),u=e.getInts("strides",[1,1]);return ae({autoPad:t,dilations:o,group:i,kernelShape:a,pads:s,strides:u,...n})},MI=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4||r[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let n=r[0].dims[1],t=r[1].dims[1]*e.group;if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(r.length===3&&(r[2].dims.length!==1||r[1].dims[0]!==r[2].dims[0]))throw new Error("invalid bias");let o=r[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(r[0].type!=="float32"||r[1].type!=="float32")throw new Error("Conv input(X,W) should be float tensor");if(r.length===3&&r[2].type!=="float32")throw new Error("Conv input(bias) should be float tensor")}});var BI,VI,FI,uf,GI,UI,WI,HI,qI,jI,lf,KI,cf=$(()=>{"use strict";Ue();Pe();le();Jn();BI=(r,e,n,t,o,i)=>(r-1)*e+n+(t-1)*o+1-i,VI=(r,e,n,t,o)=>{let i=Math.floor(r/2);e==="SAME_UPPER"?(n[t]=i,n[o]=r-i):e==="SAME_LOWER"&&(n[t]=r-i,n[o]=i)},FI=(r,e,n,t,o,i,a,s)=>{let u=r.length-2,l=s.length===0;for(let c=0;c<u;++c){let d=l?r[c+2]*i[c]:s[c],p=BI(r[c+2],i[c],o[c],e[c],n[c],d);VI(p,t,o,c,c+u),l&&s.push(i[c]*(r[c+2]-1)+a[c]+(e[c]-1)*n[c]+1-o[c]-o[c+u])}},uf=(r,e,n)=>(KI(e,n),GI(r,e,n)),GI=(r,e,n)=>{let t=jI(n,e);return[qI(r,e,t)]},UI=(r,e)=>({name:"ConvTranspose",inputNames:r?["X","W","B"]:["X","W"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e}),WI=(r,e,n,t)=>{let i=e.length>2?"getB(output_channel)":"0.0",a=e[0].dims,s=e[1].dims,u=s[1],l=s[0]/t.group,c=[e[0].dims[0],e[1].dims[1]*t.group,...t.outputShape],d=q(r.session.backend.glContext.version),{activationFunction:p,applyActivation:f}=cn(t),h=`
  const ivec2 strides = ivec2(${t.strides[0]}, ${t.strides[1]});
  const ivec2 pads = ivec2(${t.pads[0]}, ${t.pads[1]});
  ${p}
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
    ${f}
    ${d.output} = vec4(value, .0, .0, .0);
  }
`;return{...n,output:{dims:c,type:e[0].type,textureType:0},shaderSource:h,hasMain:!0}},HI=(r,e,n)=>{let t=UI(e.length>2,n.cacheKey);return{...t,get:()=>WI(r,e,t,n)}},qI=(r,e,n)=>r.run(HI(r,e,n),e),jI=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0)for(let s=2;s<e[1].dims.length;++s)n.push(e[1].dims[s]);let t=r.pads.slice(),o=r.outputShape.slice(),i=e[0].dims;FI(i,n,r.dilations,r.autoPad,t,r.strides,r.outputPadding,o);let a=Object.assign({},r);return Object.assign(a,{kernelShape:n,pads:t,outputShape:o,cacheKey:r.cacheKey}),a},lf=r=>{let e=r.attributes,n=mr(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),a=e.getInts("kernel_shape",[]),s=e.getInts("output_padding",[0,0]),u=e.getInts("output_shape",[]),l=e.getInts("pads",[0,0,0,0]),c=e.getInts("strides",[1,1]);return ae({autoPad:t,dilations:o,group:i,kernelShape:a,outputPadding:s,outputShape:u,pads:l,strides:c,...n})},KI=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4||r[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let n=r[0].dims[1],t=r[1].dims[0];if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=r[1].dims[1]*e.group;if(r.length===3&&(r[2].dims.length!==1||r[2].dims[0]!==o))throw new Error("invalid bias");let i=r[0].dims.length-2;if(e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==r[0].dims.length-2)throw new Error("invalid output shape");if(r[0].type!=="float32"||r[1].type!=="float32")throw new Error("ConvTranspose input(X,W) should be float tensor");if(r.length===3&&r[2].type!=="float32")throw new Error("ConvTranspose input(bias) should be float tensor")}});var df,Qn,pf,XI,ff,ZI,JI,QI,Uo=$(()=>{"use strict";Ue();ye();le();df={name:"Transpose",inputNames:["A"],inputTypes:[0]},Qn=(r,e,n)=>(QI(e),[r.run({...df,cacheHint:n.cacheKey,get:()=>XI(r,e[0],n.perm)},e)]),pf=r=>ae({perm:r.attributes.getInts("perm",[])}),XI=(r,e,n)=>{let t=e.dims;n=ff(t,n);let o=ZI(t,n),i=t.length,a=`
      ${JI("perm",n,i)}
      float process(int indices[${i}]) {
        int a[${i}];
        perm(a, indices);
        return _A(a);
      }`;return{...df,output:{dims:o,type:e.type,textureType:0},shaderSource:a}},ff=(r,e)=>(e&&e.length!==r.length&&(e=[...r.keys()].reverse()),e),ZI=(r,e)=>(e=ff(r,e),F.sortBasedOnPerm(r,e)),JI=(r,e,n)=>{let t=[];t.push(`void ${r}(out int a[${n}], int src[${n}]) {`);for(let o=0;o<n;++o)t.push(`	a[${e[o]}]=src[${o}];`);return t.push("	}"),t.join(`
`)},QI=r=>{if(!r||r.length!==1)throw new Error("Transpose requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("input should be float tensor")}});var hf,mf,YI,gf=$(()=>{"use strict";Uo();hf=(r,e,n)=>{YI(e);let t=n.blocksize,o=t*t,i=n.mode==="DCR"?[0,3,4,1,5,2]:[0,1,4,2,5,3],a=n.mode==="DCR"?[e[0].dims[0],t,t,e[0].dims[1]/o,e[0].dims[2],e[0].dims[3]]:[e[0].dims[0],e[0].dims[1]/o,t,t,e[0].dims[2],e[0].dims[3]],s=r.reshapeUnpacked(e[0],a),u={perm:i,cacheKey:`${i}`},[l]=Qn(r,[s],u),c=[e[0].dims[0],e[0].dims[1]/o,e[0].dims[2]*t,e[0].dims[3]*t];return[r.reshapeUnpacked(l,c)]},mf=r=>{let e=r.attributes.getInt("blocksize");if(e<1)throw new Error(`blocksize must be >= 1, but got : ${e} for DepthToSpace`);let n=r.attributes.getString("mode","DCR");if(n!=="DCR"&&n!=="CRD")throw new Error(`unrecognized mode: ${n} for DepthToSpace`);return{mode:n,blocksize:e}},YI=r=>{if(r.length!==1)throw new Error(`DepthToSpace expect 1 inputs, but got ${r.length}`);if(r[0].type==="string"||r[0].dims.length!==4)throw new TypeError("DepthToSpace input should be a 4-D numeric tensor")}});var bf,yf,e2,_f=$(()=>{"use strict";ye();bf=(r,e,n)=>{e2(e,n);let t=F.flattenShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},yf=r=>r.attributes.getInt("axis",1),e2=(r,e)=>{if(!r||r.length!==1)throw new Error("Flatten requires 1 input.");let n=r[0].dims.length;if(n===0)throw new Error("scalar tensor is not supported.");if(e<-n||e>n)throw new Error("Invalid axis");if(r[0].type==="string")throw new Error("string tensor is not supported.")}});var Cn,Ur=$(()=>{"use strict";Cn=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]});var xf,Tf,t2,n2,r2,o2,vf=$(()=>{"use strict";Ue();Ur();ye();le();xf=(r,e,n)=>(o2(e,n.axis),[r.run(r2(r,e,n),e)]),Tf=r=>ae({axis:r.attributes.getInt("axis",0)}),t2={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},n2=(r,e,n,t)=>{let o=n[0].dims.slice(),i=n[1].dims.slice(),a=new Array(o.length+i.length-1);t=F.normalizeAxis(t,o.length);let s=[];for(let p=0;p<a.length;p++)p<t?(a[p]=o[p],s.push(`inputIdx[${p}] = outputIdx[${p}];`)):p<t+i.length?(a[p]=i[p-t],s.push(`indexDataIdx[${p-t}] = outputIdx[${p}];`)):(a[p]=o[p-i.length+1],s.push(`inputIdx[${p-i.length+1}] = outputIdx[${p}];`));let u=a.length||1,l=o.length,c=i.length||1,d=`
      float process(int outputIdx[${u}]) {
        int inputIdx[${l}];
        int indexDataIdx[${c}];
        indexDataIdx[0] = 0;
        ${s.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${t}] = idx < 0 ? idx + ${o[t]} : idx;
        return _A(inputIdx);
      }`;return{...e,output:{dims:a,type:n[0].type,textureType:0},shaderSource:d}},r2=(r,e,n)=>{let t={...t2,cacheHint:n.cacheKey};return{...t,get:()=>n2(r,t,e,n.axis)}},o2=(r,e)=>{if(!r||r.length!==2)throw new Error("Gather requires 2 inputs.");let n=r[0].dims.length;if(n<1)throw new Error("Invalid input shape.");if(e<-n||e>n-1)throw new Error("Invalid axis.");if(Cn.indexOf(r[0].type)===-1)throw new Error("Invaid input type.");if(r[1].type!=="int32"&&r[1].type!=="int16")throw new Error("Invaid input type.")}});var du,wf,If,Sf,i2,a2,s2,$f=$(()=>{"use strict";Ue();ye();le();du=(r,e,n)=>(s2(e,n),[r.run(i2(e,n),e)]),wf=(r,e)=>{let n=r.attributes.getInt("transA",0)!==0,t=r.attributes.getInt("transB",0)!==0,o=r.attributes.getFloat("alpha",1),i=r.attributes.getFloat("beta",1);return ae({transA:n,transB:t,alpha:o,beta:i,isOptionalC:e})},If=r=>wf(r,!1),Sf=r=>wf(r,!0),i2=(r,e)=>{let n={name:"Gemm",inputNames:r.length===3?["A","B","C"]:["A","B"],inputTypes:r.length===3?[0,0,0]:[0,0],key:e.cacheKey};return{...n,get:()=>a2(n,r,e)}},a2=(r,e,n)=>{let t=e[0].dims.slice(),o=e[1].dims.slice(),[i,a]=Do.getShapeOfGemmResult(t,n.transA,o,n.transB,e.length===3?e[2].dims:void 0),s=[i,a];if(!s)throw new Error("Can't use gemm on the given tensors");let u=t[t.length-1],l="";n.transA&&(u=t[0]),n.transA&&n.transB?l="value += _A_T(a) * _B_T(b);":n.transA&&!n.transB?l="value += _A_T(a) * _B(b);":!n.transA&&n.transB?l="value += _A(a) * _B_T(b);":!n.transA&&!n.transB&&(l="value += _A(a) * _B(b);");let c=s.length,d=e.length===3?`int c[${e[2].dims.length}];`:"",p=e.length===3?"bcastIndices_C(indices, c);":"",f=e.length===3?"value += beta * _C(c);":"",h=`
      float process(int indices[${c}]) {
          int a[${c}];
          int b[${c}];
          ${d}

          copyVec(indices, a);
          copyVec(indices, b);
          ${p}

          float value = 0.0;
          for (int k=0; k<${u}; ++k) {
              a[${c-1}] = k;
              b[${c-2}] = k;
              ${l}
          }

          value = value * alpha;
          ${f}
          return value;
      }`;return{...r,output:{dims:s,type:e[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:n.alpha},{name:"beta",type:"float",data:n.beta}],shaderSource:h}},s2=(r,e)=>{if(!r)throw new Error("Input is missing");if(e.isOptionalC&&(r.length<2||r.length>3))throw new Error("Invaid input shape.");if(!e.isOptionalC&&r.length!==3)throw new Error("Gemm requires 3 inputs");if(r.length===3&&r[2].dims.length!==1&&r[2].dims.length!==2)throw new Error("Invalid input shape of C");if(r[0].type!=="float32"&&r[0].type!=="float64"||r[1].type!=="float32"&&r[1].type!=="float64"||r.length===3&&r[2].type!=="float32"&&r[2].type!=="float64")throw new Error("Invalid input type.");if(r[0].type!==r[1].type||r.length===3&&r[0].type!==r[2].type)throw new Error("Input types are mismatched")}});var Af,Pf,u2,l2,c2,d2,p2,Of=$(()=>{"use strict";Ue();le();Af=(r,e,n)=>(p2(e),[r.run(c2(r,e,n),e)]),Pf=r=>{let e=r.attributes.getFloat("scale"),n=r.attributes.getFloats("bias");return ae({scale:e,bias:n})},u2={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},l2=(r,e,n,t)=>{let o=n[0].dims.slice(),i=o.length,s=`
      ${d2(t.bias.length)}
      float process(int indices[${i}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...e,output:{dims:o,type:n[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:t.bias.length,data:t.bias},{name:"scale",type:"float",data:t.scale}],shaderSource:s}},c2=(r,e,n)=>{let t={...u2,cacheHint:n.cacheKey};return{...t,get:()=>l2(r,t,e,n)}},d2=r=>{let e=[`float getBias(float bias[${r}], int channel) {`];for(let n=0;n<r;++n)n===0?e.push(`	if (channel == ${n}) { return bias[${n}]; }`):n===r-1?e.push(`	else { return bias[${n}]; }`):e.push(`	else if (channel == ${n}) { return bias[${n}]; }`);return e.push("	}"),e.join(`
`)},p2=r=>{if(!r||r.length!==1)throw new Error("ImageScaler requires 1 input.");if(r[0].dims.length!==4)throw new Error("Invalid input shape.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")}});var Cf,Df,Ef,f2,h2,m2,g2,b2,y2,kf=$(()=>{"use strict";Pe();le();Cf=(r,e,n)=>{y2(e);let t=r.run(h2(e[0]),e);return[r.run(b2(r,e[0],n,t.dims),[e[0],t,e[1],e[2]])]},Df=r=>r.attributes.getFloat("epsilon",1e-5),Ef={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},f2=(r,e)=>{let n=e.dims.slice(),t=n[1],o=n[2]*n[3],i=[n[0],t],a=`
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
      }`;return{...r,output:{dims:i,type:e.type,textureType:4},shaderSource:a}},h2=r=>({...Ef,get:()=>f2(Ef,r)}),m2={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},g2=(r,e,n,t,o)=>{let i=q(r.session.backend.glContext.version),[a,s]=r.calculateTextureWidthAndHeight(o,4),[u,l]=[a/4,s],c=`
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
      }`;return{...e,output:{dims:n.dims,type:n.type,textureType:0},variables:[{name:"epsilon",type:"float",data:t}],shaderSource:c}},b2=(r,e,n,t)=>{let o={...m2,cacheHint:`${n}`};return{...o,get:()=>g2(r,o,e,n,t)}},y2=r=>{if(!r||r.length!==3)throw new Error("InstanceNormalization requires 3 inputs.");let e=r[0],n=r[1],t=r[2];if(e.dims.length<3||n.dims.length!==1||t.dims.length!==1)throw new Error("Invalid input shape.");if(n.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1])throw new Error("Input shapes are mismatched.");if(e.type!=="float32"&&e.type!=="float64"||n.type!=="float32"&&n.type!=="float64"||t.type!=="float32"&&t.type!=="float64")throw new Error("Invalid input type.");if(r[0].dims.length!==4)throw new Error("Only support 4-D input shape.")}});function _2(r,e){let n=r[0].dims[1],t=r[0].dims.length,o=-Math.floor((e.size-1)/2),i=Math.ceil((e.size-1)/2),a=`float(${e.alpha}) / float(${e.size})`,s=`float(${e.bias})`,u=`float(${e.beta})`,l=`
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
    }`;return{...Rf,cacheHint:e.cacheKey,output:{dims:r[0].dims,type:r[0].type,textureType:0},shaderSource:l}}function x2(r,e){return{...Rf,cacheHint:e.cacheKey,get:()=>_2(r,e)}}var Lf,zf,Rf,T2,Nf=$(()=>{"use strict";Ue();le();Lf=(r,e,n)=>(T2(e),[r.run(x2(e,n),e)]),zf=r=>{let e=r.attributes.getFloat("alpha",1e-4),n=r.attributes.getFloat("beta",.75),t=r.attributes.getFloat("bias",1),o=r.attributes.getInt("size");return ae({alpha:e,beta:n,bias:t,size:o})},Rf={name:"LRN",inputNames:["X"],inputTypes:[0]};T2=r=>{if(!r||r.length!==1)throw new Error("LRN requires 1 input.");if(r[0].dims.length!==4)throw new Error('currently only support LRN for input with "NCHW" format');if(r[0].type!=="float32")throw new Error("input should be float type")}});var v2,pu,Mf,Bf,Vf,w2,I2,S2,$2,A2,P2,O2,E2,Ff=$(()=>{"use strict";Ue();ye();Pe();le();v2={name:"Pad",inputNames:["A"],inputTypes:[0]},pu=(r,e,n)=>(S2(e),[r.run({...v2,cacheHint:n.cacheKey,get:()=>I2(r,e[0],n)},e)]),Mf=r=>{let e=r.attributes.getString("mode","constant"),n=r.attributes.getFloat("value",0),t=r.attributes.getInts("pads");return ae({mode:e,value:n,pads:t})},Bf=(r,e,n)=>{$2(e);let t=w2(r,e,n);return pu(r,[e[0]],t)},Vf=r=>r.attributes.getString("mode","constant"),w2=(r,e,n)=>{if(!r.session.isInitializer(e[1].dataId)||e.length>=3&&!r.session.isInitializer(e[2].dataId))throw new Error("dynamic pad attributes are not allowed");let t=Array.from(e[1].integerData),o=e.length>=3?e[2].floatData[0]:0;return ae({mode:n,pads:t,value:o})},I2=(r,e,n)=>{let t=F.padShape(e.dims.slice(),n.pads),o=t.length,a=`
      ${A2(r,e,n)}
      float process(int[${o}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:t,type:e.type,textureType:0},shaderSource:a}},S2=r=>{if(!r||r.length!==1)throw new Error("Pad requires 1 input");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")},$2=r=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Pad requires 2 or 3 inputs");if(r[1].type!=="int32")throw new Error("Invalid input type.");if(r.length>=3&&r[2].type==="string")throw new Error("Invalid input type.")},A2=(r,e,n)=>{let t=q(r.session.backend.glContext.version),[o,i]=r.calculateTextureWidthAndHeight(e.dims,0),a=F.computeStrides(e.dims);switch(n.mode){case"constant":return P2(t,e.dims,a,o,i,n.pads,n.value);case"reflect":return O2(t,e.dims,a,o,i,n.pads);case"edge":return E2(t,e.dims,a,o,i,n.pads);default:throw new Error("Invalid mode")}},P2=(r,e,n,t,o,i,a)=>{let s=e.length,u="";for(let l=s-1;l>=0;--l)u+=`
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
      `},O2=(r,e,n,t,o,i)=>{let a=e.length,s="";for(let u=a-1;u>=0;--u)s+=`
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
      `},E2=(r,e,n,t,o,i)=>{let a=e.length,s="";for(let u=a-1;u>=0;--u)s+=`
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
      `}});var Uf,Wf,Hf,qf,jf,Kf,Xf,Zf,Jf,C2,Gf,Qf,Ho,Yf,Wo,D2,eh=$(()=>{"use strict";Ue();ye();le();Uf=(r,e,n)=>{Ho(e);let t={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[r.run({...t,get:()=>Hf(e,t,!1,n)},e)]},Wf=r=>{let e=r.attributes.getString("auto_pad","NOTSET"),n=r.attributes.getInt("ceil_mode",0),t=r.attributes.getInt("count_include_pad",0)!==0,o=r.attributes.getInts("kernel_shape"),i=r.attributes.getInts("strides",[]),a=r.attributes.getInts("pads",[]);if(n!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");return ae({autoPad:e,ceilMode:n,countIncludePad:t,kernelShape:o,strides:i,pads:a})},Hf=(r,e,n,t)=>{let[o,i]=Jf(r,t,n),a=F.size(o.kernelShape),s="value += _X(x);",u="";o.countIncludePad?u+=`value /= float(${a});`:u+=`value /= float(${a} - pad);`;let c=`
        ${Yf(r[0].dims,o,s,u,"0.0")}
      `;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:c}},qf=(r,e,n)=>{Ho(e);let t={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${n.countIncludePad}`};return[r.run({...t,get:()=>Hf(e,t,!0,n)},e)]},jf=r=>{let e=r.attributes.getInt("count_include_pad",0)!==0;return ae({autoPad:"",ceilMode:0,countIncludePad:e,kernelShape:[],strides:[],pads:[]})},Kf=(r,e,n)=>{Ho(e);let t={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[r.run({...t,get:()=>Zf(e,t,!1,n)},e)]},Xf=r=>{let e=r.attributes.getString("auto_pad","NOTSET"),n=r.attributes.getInt("ceil_mode",0),t=r.attributes.getInts("kernel_shape"),o=r.attributes.getInts("strides",[]),i=r.attributes.getInts("pads",[]),a=r.attributes.getInt("storage_order",0),s=r.attributes.getInts("dilations",[]);if(a!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");return ae({autoPad:e,ceilMode:n,countIncludePad:!1,kernelShape:t,strides:o,pads:i,storageOrder:a,dilations:s})},Zf=(r,e,n,t)=>{let[o,i]=Jf(r,t,n),l=`
      ${Yf(r[0].dims,o,`
      value = max(_X(x), value);
    `,"","-1e5")}
    `;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:l}},Jf=(r,e,n)=>{let t=r[0].dims.slice(),o=Object.hasOwnProperty.call(e,"dilations"),i=e.kernelShape.slice(),a=e.strides.slice(),s=o?e.dilations.slice():[],u=e.pads.slice();qn.adjustPoolAttributes(n,t,i,a,s,u);let l=qn.computePoolOutputShape(n,t,a,s,i,u,e.autoPad),c=Object.assign({},e);return o?Object.assign(c,{kernelShape:i,strides:a,pads:u,dilations:s,cacheKey:e.cacheKey}):Object.assign(c,{kernelShape:i,strides:a,pads:u,cacheKey:e.cacheKey}),[c,l]},C2={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},Gf={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},Qf=(r,e)=>(Ho(e),[r.run({...Gf,get:()=>Zf(e,Gf,!0,C2)},e)]),Ho=r=>{if(!r||r.length!==1)throw new Error("Pool ops requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")},Yf=(r,e,n,t,o)=>{let i=r.length;if(e.kernelShape.length<=2){let a=e.kernelShape[e.kernelShape.length-1],s=e.strides[e.strides.length-1],u=e.pads[e.pads.length/2-1],l=e.pads[e.pads.length-1],c=r[i-1],d="",p="",f="";if(u+l!==0?d=`
          for (int i = 0; i < ${a}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${s} - ${u} + i;
            if (x[${i} - 1] < 0 || x[${i} - 1] >= ${c}) {
              pad++;
              continue;
            }
            ${n}
          }`:d=`
          for (int i = 0; i < ${a}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${s} - ${u} + i;
            ${n}
          }`,e.kernelShape.length===2){let m=e.kernelShape[e.kernelShape.length-2],y=e.strides[e.strides.length-2],g=e.pads[e.pads.length/2-2],b=e.pads[e.pads.length-2],_=r[i-2];g+b!==0?p=`
            for (int j = 0; j < ${m}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${y} - ${g} + j;
              if (x[${i} - 2] < 0 || x[${i} - 2] >= ${_}) {
                pad+= ${a};
                continue;
              }
          `:p=`
            for (int j = 0; j < ${m}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${y} - ${g} + j;
            `,f=`
          }
        `}return`
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);

          float value = ${o};
          int pad = 0;
          ${p}
          ${d}
          ${f}
          ${t}
          return value;
        }
      `}else{let a=F.size(e.kernelShape),s=F.computeStrides(e.kernelShape),u=s.length,l=e.pads.length,c=D2(u),d=Wo(r,"inputDims"),p=Wo(e.pads,"pads"),f=Wo(s,"kernelStrides"),h=Wo(e.strides,"strides"),m=e.pads.reduce((b,_)=>b+_),y="";return m?y=`
            if (x[j] >= inputDims[j] || x[j] < 0) {
              pad++;
              isPad = true;
              break;
            }
          }
          if (!isPad) {
            ${n}
          }`:y=`
          }
          ${n}
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
          ${p}
          ${d}
          ${h}
          ${f}

          float value = ${o};
          int pad = 0;
          bool isPad = false;
          for (int i = 0; i < ${a}; i++) {
            offsetToIndices(i, kernelStrides, offset);
            isPad = false;
            for (int j = ${i} - ${u}; j < ${i}; j++) {
              x[j] = indices[j] * strides[j - ${i} + ${u}]
                + offset[j - ${i} + ${u}] - pads[j - 2];
              ${y}
          }
          ${t}

          return value;
        }
      `}},Wo=(r,e)=>{let n="";for(let t=0;t<r.length;t++)n+=`
      ${e}[${t}] = ${r[t]};
    `;return n},D2=r=>`
  void offsetToIndices(int offset, int[${r}] strides, out int[${r}] indices) {
    if (${r} == 0) {
      return;
    }
    for (int i = 0; i < ${r} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${r} - 1] = offset;
  }`});var Yn,Dn,k2,L2,th,nh,rh,oh,ih,ah,sh,uh=$(()=>{"use strict";Ue();Ur();ye();le();Yn=(r,e,n,t,o)=>{L2(e);let i={name:t,inputNames:["A"],inputTypes:[0]};return[r.run({...i,cacheHint:n.cacheKey,get:()=>k2(r,e,n,t,o,i)},e)]},Dn=r=>{let e=r.attributes.getInts("axes",[]),n=r.attributes.getInt("keepdims",1)===1;return ae({axes:e,keepDims:n})},k2=(r,e,n,t,o,i)=>{let a=[],s=e[0].dims.length||1,u=[],l=F.normalizeAxes(n.axes,e[0].dims.length),c=o(e,l),d=c[1];for(let h=0;h<e[0].dims.length;h++)l.indexOf(h)>=0||l.length===0?(n.keepDims&&a.push(1),d=`
          for(int j${h} = 0; j${h} < ${e[0].dims[h]}; j${h}++) {
            inputIdx[${h}] = j${h};
            ${d}
          }`):(u.push(`inputIdx[${h}] = outputIdx[${a.length}];`),a.push(e[0].dims[h]));let f=`
      float process(int outputIdx[${a.length||1}]) {
        float value;                 // final result
        int inputIdx[${s}];      // addressing input data
        ${u.join(`
`)}
        ${c[0]}       // init ops for reduce max/min
        ${d}
        ${c[2]}       // final computation for reduce mean
        return value;
      }`;return{...i,output:{dims:a,type:e[0].type,textureType:0},shaderSource:f}},L2=r=>{if(!r||r.length!==1)throw new Error("Reduce op requires 1 input.");if(Cn.indexOf(r[0].type)===-1)throw new Error("Invalid input type.")},th=(r,e,n)=>Yn(r,e,n,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),nh=(r,e,n)=>Yn(r,e,n,"ReduceMean",(o,i)=>{let a=1;for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=o[0].dims[s]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${a}.;`]}),rh=(r,e,n)=>Yn(r,e,n,"ReduceMax",(o,i)=>{let a=[];for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`inputIdx[${s}] = 0;`);return[`${a.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),oh=(r,e,n)=>Yn(r,e,n,"ReduceMin",(o,i)=>{let a=[];for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`inputIdx[${s}] = 0;`);return[`${a.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),ih=(r,e,n)=>Yn(r,e,n,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),ah=(r,e,n)=>Yn(r,e,n,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),sh=(r,e,n)=>Yn(r,e,n,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])});var lh,ch=$(()=>{"use strict";ye();lh=(r,e)=>{let n=F.calculateReshapedDims(e[0].dims,e[1].integerData);return r.session.pack?[r.reshapePacked(e[0],n)]:[r.reshapeUnpacked(e[0],n)]}});var dh,fu,ph,fh,Wr,z2,hu,qo,mu=$(()=>{"use strict";Ue();Pe();le();dh={name:"Upsample",inputNames:["X"],inputTypes:[0]},fu=(r,e,n)=>(hu(e,n),[r.run({...dh,cacheHint:n.cacheKey,get:()=>z2(r,e,n)},e)]),ph=r=>Wr(r,7),fh=r=>Wr(r,9),Wr=(r,e)=>{let n=e>=10,t=r.attributes.getString("mode","nearest");if(t!=="nearest"&&t!=="linear"&&(e<11||t!=="cubic"))throw new Error(`unrecognized mode: ${t}`);let o=[];e<9&&(o=r.attributes.getFloats("scales"),qo(o,t,n));let i=r.attributes.getFloat("extrapolation_value",0),a=e>10?r.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(a)===-1)throw new Error(`coordinate_transform_mode '${a}' is not supported`);let s=a==="tf_crop_and_resize",u=s,l=t==="nearest"&&e>=11?r.attributes.getString("nearest_mode","round_prefer_floor"):"";if(["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(l)===-1)throw new Error(`nearest_mode '${l}' is not supported`);let c=r.attributes.getFloat("cubic_coeff_a",-.75),d=r.attributes.getInt("exclude_outside",0)!==0;if(d&&t!=="cubic")throw new Error("exclude_outside can be set to 1 only when mode is CUBIC.");let p=e<11?!0:t==="nearest"&&a==="asymmetric"&&l==="floor",f=0,h=0,m=0;return e>10?r.inputs.length>2?(f=1,h=2,m=3):(h=1,m=2):e===9&&(h=1),ae({opset:e,isResize:n,mode:t,scales:o,extrapolationValue:i,coordinateTransformMode:a,useExtrapolation:u,needRoiInput:s,nearestMode:l,cubicCoefficientA:c,excludeOutside:d,useNearest2xOptimization:p,roiInputIdx:f,scalesInputIdx:h,sizesInputIdx:m})},z2=(r,e,n)=>{let t=q(r.session.backend.glContext.version),[o,i]=r.calculateTextureWidthAndHeight(e[0].dims,0),a=e[0].dims.map((m,y)=>Math.floor(m*n.scales[y])),[s,u]=r.calculateTextureWidthAndHeight(a,0),l=a.length,c=new Array(l),d=new Array(l),p=`
      int output_pitches[${l}];
      int input_pitches[${l}];
      `;for(let m=l-1;m>=0;m--)c[m]=m===l-1?1:c[m+1]*a[m+1],d[m]=m===l-1?1:d[m+1]*e[0].dims[m+1],p+=`
        output_pitches[${m}] = ${c[m]};
        input_pitches[${m}] = ${d[m]};
        `;let f=`
      float getInputFloat(int index) {
        vec2 coords = offsetToCoords(index, ${o}, ${i});
        float value = getColorAsFloat(${t.texture2D}(X, coords));
        return value;
      }
      `,h=n.mode==="nearest"?`
    ${f}
    float process(int indices[${l}]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${p}

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
    ${f}
    float process(int indices[4]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${p}

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
    ${f}
    float process(int indices[2]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${p}

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
    }`;return{...dh,output:{dims:a,type:e[0].type,textureType:0},shaderSource:h,variables:[{name:"scales",type:"int",arrayLength:n.scales.length,data:n.scales.map(m=>Math.ceil(m))}]}},hu=(r,e)=>{if(!r||e.opset<9&&r.length!==1||e.opset>=9&&e.opset<11&&r.length!==2||e.opset>=11&&r.length<2)throw new Error("invalid inputs.");if(e.scales.length>0&&r[0].dims.length!==e.scales.length)throw new Error("Invalid input shape.");if(r[0].type==="string")throw new Error("Invalid input tensor types.")},qo=(r,e,n)=>{if(n){for(let t of r)if(t<=0)throw new Error("Scale value should be greater than 0.")}else for(let t of r)if(t<1)throw new Error("Scale value should be greater than or equal to 1.");if((e==="linear"||e==="cubic")&&r.length!==2&&(r.length!==4||r[0]!==1||r[1]!==1))throw new Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${n?"Resize":"Upsample"} opeartor.`)}});var gu,bu,hh,mh,R2,N2,M2,B2,gh=$(()=>{"use strict";Pe();le();un();Zn();mu();gu={name:"Resize",inputNames:["A"],inputTypes:[2]},bu=(r,e,n)=>(hu(e,n),[r.run({...gu,cacheHint:n.cacheKey,get:()=>R2(r,e,n)},e)]),hh=r=>Wr(r,10),mh=r=>Wr(r,11),R2=(r,e,n)=>{let t=q(r.session.backend.glContext.version),[o,i]=N2(e,n);if(o.every(_=>_===1)&&n.coordinateTransformMode!=="tf_crop_and_resize")return{...gu,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${t.texture2D}(X, TexCoords);
                    ${t.output} = v;
                }`};let s=i.length;if(s<2)throw new Error(`output dimension should be at least 2, but got ${s}`);let u=i[s-2],l=i[s-1],c=e[0].dims;if(s!==c.length)throw new Error(`output dimension should match input ${c.length}, but got ${s}`);let d=c[s-2],p=c[s-1],f=o[s-2],h=o[s-1],m="";if(n.mode!=="linear")throw new Error(`resize (packed) does not support mode: '${n.mode}'`);switch(n.coordinateTransformMode){case"asymmetric":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return vec4(coords) / scaleWHWH;
                    }
                `;break;case"half_pixel":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return (vec4(coords) + 0.5) / scaleWHWH - 0.5;
                    }
                `;break;case"pytorch_half_pixel":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 fcoords = vec4(coords);
                        return vec4(
                            ${l}.0 > 1.0 ? (fcoords.x + 0.5) / scaleWHWH.x - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.y + 0.5) / scaleWHWH.y - 0.5 : 0.0,
                            ${l}.0 > 1.0 ? (fcoords.z + 0.5) / scaleWHWH.z - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.w + 0.5) / scaleWHWH.w - 0.5 : 0.0
                          );
                    }
                `;break;case"align_corners":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 resized = vec4(${l}.0 - 1.0, ${u}.0 - 1.0, ${l}.0 - 1.0,
                            ${u}.0 - 1.0);
                        vec4 original = vec4(${p}.0 - 1.0, ${d}.0 - 1.0, ${p}.0 - 1.0,
                            ${d}.0 - 1.0);
                        vec4 new_scale = original / resized;
                        return vec4(coords) * new_scale;
                    }
                `;break;default:throw new Error(`resize (packed) does not support coordinateTransformMode:                                 '${n.coordinateTransformMode}'`)}let y=Ze(s),g=ln(),b=`
            const vec2 inputWH = vec2(${d}.0, ${p}.0);
            const vec4 scaleWHWH = vec4(float(${f}), float(${h}), float(${f}), float(${h}));
            ${g}
            ${m}
            float getAValue(int x10, int r, int c, int d) {
                return getChannel(getA(x10, r, c, d), vec2(c, d));
            }
            void main() {
                ${y} rc = getOutputCoords();

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
        `;return{...gu,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:b}},N2=(r,e)=>{let t=r[0].dims,o=e.scales,i;if(o.length===0){let s=r[e.scalesInputIdx];if(s&&s.size!==0){if(r[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");o=M2(s,e.mode,e.isResize)}else{let u=r[e.sizesInputIdx];if(!u||u.size===0)throw new Error("Either scales or sizes MUST be provided as input.");i=Array.from(u.integerData),o=B2(i,t,e.mode,e.isResize)}}else if(r[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");let a=i||t.map((s,u)=>Math.floor(s*o[u]));return[o,a]},M2=(r,e,n)=>{let t=Array.from(r.floatData);return qo(t,e,n),t},B2=(r,e,n,t)=>{let o=e.length,i=new Array(o);for(let a=0,s=o;a<s;a++)if(e[a]===0){if(r[a]!==0)throw new Error("Input dim is zero but required output dim is non-zero.");i[a]=1}else i[a]=r[a]/e[a];return qo(i,n,t),i}});var bh,V2,yh=$(()=>{"use strict";Xn();bh=(r,e)=>(V2(e),[new Re([e[0].dims.length],"int32",void 0,void 0,new Int32Array(e[0].dims))]),V2=r=>{if(!r||r.length!==1)throw new Error("Shape requires 1 input.")}});var yu,_h,xh,Th,F2,vh,G2,U2,wh=$(()=>{"use strict";Ue();Ur();ye();le();yu={name:"Slice",inputNames:["A"],inputTypes:[0]},_h=(r,e,n)=>(F2(e),[r.run({...yu,cacheHint:n.cacheKey,get:()=>Th(r,e[0],n)},e)]),xh=r=>{let e=r.attributes.getInts("starts"),n=r.attributes.getInts("ends"),t=r.attributes.getInts("axes",[]);return ae({starts:e,ends:n,axes:t})},Th=(r,e,n)=>{let t=n.axes.length===0?e.dims.slice(0).map((d,p)=>p):n.axes,o=F.normalizeAxes(t,e.dims.length),i=n.starts.map((d,p)=>d>e.dims[o[p]]-1?e.dims[o[p]]:F.normalizeAxis(d,e.dims[o[p]])),a=n.ends.map((d,p)=>d>e.dims[o[p]]-1?e.dims[o[p]]:F.normalizeAxis(d,e.dims[o[p]])),s=e.dims.slice(),u=[];for(let d=0;d<o.length;d++)s[o[d]]=a[d]-i[d],i[d]>0&&u.push(`outputIdx[${o[d]}] += ${i[d]};`);let c=`
      float process(int outputIdx[${s.length}]) {
        ${u.join(`
      `)}
        return _A(outputIdx);
      }`;return{...yu,output:{dims:s,type:e.type,textureType:0},shaderSource:c}},F2=r=>{if(!r||r.length!==1)throw new Error("Slice requires 1 input.");if(Cn.indexOf(r[0].type)===-1)throw new Error("Invalid input type.")},vh=(r,e)=>{U2(e);let n=G2(r,e);return[r.run({...yu,cacheHint:n.cacheKey,get:()=>Th(r,e[0],n)},[e[0]])]},G2=(r,e)=>{if(!r.session.isInitializer(e[1].dataId)||!r.session.isInitializer(e[2].dataId)||e.length>=4&&!r.session.isInitializer(e[3].dataId)||e.length>=5&&!r.session.isInitializer(e[4].dataId))throw new Error("dynamic slice attributes are not allowed");if(e.length>=5&&e[4].integerData.some(a=>a!==1))throw new Error("currently non-1 steps is not supported for Slice");let n=Array.from(e[1].integerData),t=Array.from(e[2].integerData),o=e.length>=4?Array.from(e[3].integerData):[],i=`${o};${n};${t}`;return{starts:n,ends:t,axes:o,cacheKey:i}},U2=r=>{if(!r||r.length<3||r.length>5)throw new Error("Invalid input number.");if(r[1].type!=="int32"||r[1].dims.length!==1)throw new Error("Invalid input type.");if(r[2].type!=="int32"||r[2].dims.length!==1)throw new Error("Invalid input type.");if(r.length>=4&&(r[3].type!=="int32"||r[3].dims.length!==1))throw new Error("Invalid input type.");if(r.length>=5&&(r[4].type!=="int32"||r[4].dims.length!==1))throw new Error("Invalid input type.")}});var Ih,Sh,$h,Ah,Ph,Oh,Eh,Ch,W2,H2,q2,Dh,kh=$(()=>{"use strict";Ue();ye();Pe();le();Uo();Ih={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},Sh={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},$h={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},Ah=(r,e,n)=>{Dh(e);let t=e[0].dims.slice(),o=F.normalizeAxis(n.axis,t.length),i=F.sizeToDimension(t,o),a=F.sizeFromDimension(t,o);return Ch(r,e,n,i,a)},Ph=r=>ae({axis:r.attributes.getInt("axis",1)}),Oh=r=>ae({axis:r.attributes.getInt("axis",-1)}),Eh=(r,e,n)=>{Dh(e);let t=e[0].dims.slice(),o=F.normalizeAxis(n.axis,t.length),i=t.length,a=o!==i-1,s=[],u=[],l=[],c;a&&(u=Array.from({length:i}).map((h,m)=>m),u[o]=i-1,u[i-1]=o,u.map(h=>s.push(t[h])),c=ae({perm:u}),l=Qn(r,e,c));let d=a?F.sizeToDimension(s,i-1):F.sizeToDimension(t,i-1),p=a?F.sizeFromDimension(s,i-1):F.sizeFromDimension(t,i-1),f=Ch(r,a?l:e,n,d,p);return a?Qn(r,f,c):f},Ch=(r,e,n,t,o)=>{let i=W2(r,e[0],t,o,[t]),a=r.run({...Ih,cacheHint:n.cacheKey,get:()=>i},e),s=H2(r,e[0],t,o,i.output.dims,[t]),u=r.run({...Sh,cacheHint:n.cacheKey,get:()=>s},[e[0],a]),l=q2(r,e[0],t,o,i.output.dims,s.output.dims);return[r.run({...$h,cacheHint:n.cacheKey,get:()=>l},[e[0],a,u])]},W2=(r,e,n,t,o)=>{let[i,a]=r.calculateTextureWidthAndHeight(e.dims,0),s=o.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1)throw new Error("Dimensionality of the output should be 1");if(o[0]!==n)throw new Error("Shape of the output should be equal to logical row count");let u=q(r.session.backend.glContext.version),l=`
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
      }`;return{...Ih,output:{dims:o,type:e.type,textureType:0},shaderSource:l}},H2=(r,e,n,t,o,i)=>{let[a,s]=r.calculateTextureWidthAndHeight(e.dims,0),u=i.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(i.length!==1)throw new Error("Dimensionality of the output should be 1");if(i[0]!==n)throw new Error("Shape of the output should be equal to logical row count");if(o.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==n)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=q(r.session.backend.glContext.version),c=`
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
      }`;return{...Sh,output:{dims:i,type:e.type,textureType:0},shaderSource:c}},q2=(r,e,n,t,o,i)=>{let[a,s]=r.calculateTextureWidthAndHeight(e.dims,0),u=e.dims.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1||i.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==n||i[0]!==n)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=`
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
    }`;return{...$h,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:l}},Dh=r=>{if(!r||r.length!==1)throw new Error("Softmax requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type")}});var Lh,zh,Rh,j2,K2,X2,Nh=$(()=>{"use strict";Ue();ye();le();Lh={name:"Split",inputNames:["A"],inputTypes:[0]},zh=(r,e,n)=>{X2(e);let t=F.normalizeAxis(n.axis,e[0].dims.length),o=j2(r,e,t,n),i=[];for(let a=0;a<o;++a)i.push(r.run({...Lh,cacheHint:`${n.cacheKey};${a}`,get:()=>K2(r,e[0],n,t,a)},e));return i},Rh=r=>{let e=r.attributes.getInt("axis",0),n=r.attributes.getInts("split",[]),t=r.outputs.length;return ae({axis:e,split:n,numOutputs:t})},j2=(r,e,n,t)=>{let[,o]=Nr.splitShape(e[0].dims,n,t.split,t.numOutputs);return o.length},K2=(r,e,n,t,o)=>{let[i,a]=Nr.splitShape(e.dims,t,n.split,n.numOutputs),s=a[o],u=i[o],c=`
      float process(int indices[${u.length}]) {
        indices[${t}] += ${s};
        return _A(indices);
      }
    `;return{...Lh,cacheHint:`${n.cacheKey}:${o}`,output:{dims:u,type:e.type,textureType:0},shaderSource:c}},X2=r=>{if(!r||r.length!==1)throw new Error("Split requires one input.");if(r[0].type!=="int8"&&r[0].type!=="uint8"&&r[0].type!=="int16"&&r[0].type!=="uint16"&&r[0].type!=="int32"&&r[0].type!=="uint32"&&r[0].type!=="float32"&&r[0].type!=="float64"&&r[0].type!=="bool")throw new Error("Invalid input type.")}});var _u,Mh,Bh,Z2,J2,Vh=$(()=>{"use strict";ye();_u=(r,e,n)=>{Z2(e);let t=F.squeezeShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},Mh=(r,e)=>(J2(e),_u(r,[e[0]],Array.from(e[1].integerData))),Bh=r=>r.attributes.getInts("axes"),Z2=r=>{if(!r||r.length!==1)throw new Error("Squeeze requires 1 input.");if(r[0].type==="string")throw new Error("invalid input tensor types.")},J2=r=>{if(!r||r.length!==2)throw new Error("Squeeze requires 2 inputs.");if(r[1].type!=="int32")throw new Error("Invalid input type.")}});var Fh,Q2,Y2,Gh=$(()=>{"use strict";Pe();le();Fh=(r,e)=>{Y2(e);let n={name:"Sum",inputNames:e.map((o,i)=>`X${i}`),inputTypes:new Array(e.length).fill(0)};return[r.run({...n,get:()=>Q2(r,e,n)},e)]},Q2=(r,e,n)=>{let t=q(r.session.backend.glContext.version),o=e[0].dims.slice(),a=`
      void main() {
        vec4 result = ${e.map((s,u)=>`${t.texture2D}(X${u},TexCoords)`).join(" + ")};
        ${t.output} = result;
      }
    `;return{...n,output:{dims:o,type:e[0].type,textureType:0},hasMain:!0,shaderSource:a}},Y2=r=>{if(!r||r.length===0)throw new Error("Sum requires inputs.");let e=r[0].dims.length;for(let n=1;n<r.length;n++){if(e!==r[n].dims.length)throw new Error("Input shapes are mismatched.");for(let t=0;t<e;t++)if(r[0].dims[t]!==r[n].dims[t])throw new Error("Input shapes are not matched.")}if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.");for(let n=1;n<r.length;n++)if(r[0].type!==r[n].type)throw new Error("Input types are not matched.")}});var Uh,eS,tS,Wh=$(()=>{"use strict";Ur();le();Uh=(r,e)=>{tS(e);let n={name:"Tile",inputNames:["A"],inputTypes:[0]};return[r.run({...n,get:()=>eS(r,e,n)},e)]},eS=(r,e,n)=>{let t=e[0].dims.slice(),o=new Array(t.length),i=[];for(let u=0;u<t.length;u++)o[u]=t[u]*e[1].numberData[u],i.push(`inputIdx[${u}] = int(mod(float(outputIdx[${u}]), ${t[u]}.));`);let a=o.length,s=`
      float process(int outputIdx[${a}]) {
        int inputIdx[${a}];
        ${i.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...n,output:{dims:o,type:e[0].type,textureType:0},shaderSource:s}},tS=r=>{if(!r||r.length!==2)throw new Error("Tile requires 2 input.");if(r[1].dims.length!==1)throw new Error("The second input shape must 1 dimension.");if(r[1].dims[0]!==r[0].dims.length)throw new Error("Invalid input shape.");if(Cn.indexOf(r[0].type)===-1)throw new Error("Invalid input type.");if(r[1].type!=="int32"&&r[1].type!=="int16")throw new Error("Invalid repeat type.")}});var xu,Hh,qh,nS,rS,jh=$(()=>{"use strict";ye();xu=(r,e,n)=>{nS(e);let t=F.unsqueezeShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},Hh=(r,e)=>(rS(e),xu(r,[e[0]],Array.from(e[1].integerData))),qh=r=>r.attributes.getInts("axes"),nS=r=>{if(!r||r.length!==1)throw new Error("Unsqueeze requires 1 input.");if(r[0].type==="string")throw new Error("invalid input tensor types.")},rS=r=>{if(!r||r.length!==2)throw new Error("Unsqueeze requires 2 inputs.");if(r[1].type!=="int32")throw new Error("Invalid input type.")}});var Kh,Xh=$(()=>{"use strict";op();bp();xp();$p();Vo();cf();gf();_f();vf();$f();Of();kf();Nf();Fo();Ff();eh();uh();ch();gh();yh();wh();kh();Nh();Vh();Gh();Wh();Uo();ru();jh();mu();Kh=[["Abs","","6+",Ap],["Acos","","7+",Pp],["Add","","7+",ip],["And","","7+",ap],["Asin","","7+",Op],["Atan","","7+",Ep],["AveragePool","","7+",Uf,Wf],["BatchNormalization","","7+",np,rp],["Cast","","6+",yp,_p],["Ceil","","6+",kp],["Clip","","6-10",tu,Cp],["Clip","","11+",Dp],["Concat","","4+",wp,Sp],["Conv","","1+",lu,cu],["ConvTranspose","","1+",uf,lf],["Cos","","7+",Lp],["Div","","7+",sp],["Dropout","","7+",nu],["DepthToSpace","","1+",hf,mf],["Equal","","7+",up],["Elu","","6+",zp,Rp],["Exp","","6+",Np],["Flatten","","1+",bf,yf],["Floor","","6+",Mp],["FusedConv","com.microsoft","1+",lu,cu],["Gather","","1+",xf,Tf],["Gemm","","7-10",du,If],["Gemm","","11+",du,Sf],["GlobalAveragePool","","1+",qf,jf],["GlobalMaxPool","","1+",Qf],["Greater","","7+",lp],["Identity","","1+",nu],["ImageScaler","","1+",Af,Pf],["InstanceNormalization","","6+",Cf,Df],["LeakyRelu","","6+",Bp,Vp],["Less","","7+",cp],["LRN","","1+",Lf,zf],["Log","","6+",Fp],["MatMul","","1+",ef,tf],["MaxPool","","1+",Kf,Xf],["Mul","","7+",dp],["Neg","","6+",Gp],["Not","","1+",Up],["Or","","7+",pp],["Pad","","2-10",pu,Mf],["Pad","","11+",Bf,Vf],["Pow","","7+",fp],["PRelu","","7+",hp],["ReduceLogSum","","1+",ah,Dn],["ReduceMax","","1+",rh,Dn],["ReduceMean","","1+",nh,Dn],["ReduceMin","","1+",oh,Dn],["ReduceProd","","1+",ih,Dn],["ReduceSum","","1-12",th,Dn],["ReduceSumSquare","","1+",sh,Dn],["Relu","","6+",Wp],["Reshape","","5+",lh],["Resize","","10",bu,hh],["Resize","","11+",bu,mh],["Shape","","1+",bh],["Sigmoid","","6+",Hp],["Sin","","7+",qp],["Slice","","10+",vh],["Slice","","1-9",_h,xh],["Softmax","","1-12",Ah,Ph],["Softmax","","13+",Eh,Oh],["Split","","2-12",zh,Rh],["Sqrt","","6+",jp],["Squeeze","","1-12",_u,Bh],["Squeeze","","13+",Mh],["Sub","","7+",mp],["Sum","","6+",Fh],["Tan","","7+",Kp],["Tanh","","6+",Xp],["Tile","","6+",Uh],["Transpose","","1+",Qn,pf],["Upsample","","7-8",fu,ph],["Upsample","","9",fu,fh],["Unsqueeze","","1-12",xu,qh],["Unsqueeze","","13+",Hh],["Xor","","7+",gp]]});function Jh(r){let e={},n;for(;(n=Zh.exec(r))!==null;){let t=n[3].split(",").map(o=>{let i=o.trim().split(" ");return i&&i.length===2?{type:i[0],name:i[1]}:null}).filter(o=>o!==null);e[n[2]]={params:t,body:n[4]}}for(let t in e){let o=oS.replace("__FUNC__",t),i=new RegExp(o,"gm");for(;(n=i.exec(r))!==null;){let a=n[1],s=n[2],u=n[3].split(","),l=a?`${a} ${s};`:"",c=e[t].body,d="";e[t].params.forEach((f,h)=>{f&&(d+=`${f.type} ${f.name} = ${u[h]};
`)}),c=`${d}
 ${c}`,c=c.replace("return",`${s} = `);let p=`
      ${l}
      {
        ${c}
      }
      `;r=r.replace(n[0],p)}}return r=r.replace(Zh,""),r}var Zh,oS,Qh=$(()=>{"use strict";Zh=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,oS="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function br(r,e){let n=[],t=[],o=e!=null&&Array.isArray(e)&&e.length===0,i=e==null||o?null:iS(e,r).sort(),a=0;for(let s=0;s<r.length;++s){if(i!=null){if(i[a]===s&&r[s]!==1)throw new Error(`Can't squeeze axis ${s} since its dim '${r[s]}' is not 1`);(i[a]==null||i[a]>s)&&r[s]===1&&(n.push(r[s]),t.push(s)),i[a]<=s&&a++}r[s]!==1&&(n.push(r[s]),t.push(s))}return{newShape:n,keptDims:t}}function iS(r,e){let n=e.length;return r=r==null?e.map((t,o)=>o):[].concat(r),dr(r.every(t=>t>=-n&&t<n),()=>`All values in axis param must be in range [-${n}, ${n}) but got axis ${r}`),dr(r.every(aS),()=>`All values in axis param must be integers but got axis ${r}`),r.map(t=>t<0?n+t:t)}function aS(r){return r%1===0}function sS(r){if(r.length===0)return 1;let e=r[0];for(let n=1;n<r.length;n++)e*=r[n];return e}function Yh(r){let e=Math.ceil(Math.sqrt(r));return[e,Math.ceil(r/e)]}var jo,Tu=$(()=>{"use strict";ut();ye();jo=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,n){let t=this.computeTexture(e,n);return n&&n.isPacked&&(t[0]/=2,t[1]/=2),n&&n.reverseWH?[t[1],t[0]]:t}computeTexture(e,n){let t=n&&n.isPacked;if(e.length===0)return t?[2,2]:[1,1];let o=this.maxTextureSize;if(n&&n.breakAxis!==void 0){let s=n.breakAxis>=e.length?1:e.slice(n.breakAxis).reduce((l,c)=>l*c),u=n.breakAxis<=0?1:e.slice(0,n.breakAxis).reduce((l,c)=>l*c);if(s>o||u>o)_e.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${n.breakAxis}`);else return[s,u]}let i=e.slice(0);t&&(o=o*2,i=i.map((s,u)=>u>=i.length-2?i[u]%2===0?i[u]:i[u]+1:i[u]),i.length===1&&(i=[2,i[0]])),i.length!==2&&(i=br(i).newShape);let a=sS(i);return i.length<=1&&a<=o?[1,a]:i.length===2&&i[0]<=o&&i[1]<=o?i:i.length===3&&i[0]*i[1]<=o&&i[2]<=o?[i[0]*i[1],i[2]]:i.length===3&&i[0]<=o&&i[1]*i[2]<=o?[i[0],i[1]*i[2]]:i.length===4&&i[0]*i[1]*i[2]<=o&&i[3]<=o?[i[0]*i[1]*i[2],i[3]]:i.length===4&&i[0]<=o&&i[1]*i[2]*i[3]<=o?[i[0],i[1]*i[2]*i[3]]:t?Yh(a/4).map(s=>s*2):Yh(a)}}});var Ko,em=$(()=>{"use strict";ye();Tn();Pe();Tu();un();Ko=class extends ht{constructor(e){super(e)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let e="offsetToCoords";return{offsetToCoords:new N(`
      vec2 ${e}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){let e="coordsToOffset";return{coordsToOffset:new N(`
      int ${e}(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let e=this.context.outputTextureLayout;return e.isPacked?this.getPackedOutputSamplingSnippet(e):this.getUnpackedOutputSamplingSnippet(e)}getPackedOutputSamplingSnippet(e){let n=e.unpackedShape,t=[e.width,e.height],o={},i="getOutputCoords";switch(n.length){case 0:o[i]=this.getOutputScalarCoords();break;case 1:o[i]=this.getOutputPacked1DCoords(n,t);break;case 2:o[i]=this.getOutputPacked2DCoords(n,t);break;case 3:o[i]=this.getOutputPacked3DCoords(n,t);break;default:o[i]=this.getOutputPackedNDCoords(n,t)}let s=`
      void setOutput(vec4 val) {
        ${q(this.context.glContext.version).output} = val;
      }
    `,u="floatTextureSetRGBA";return o[u]=new N(s),o}getUnpackedOutputSamplingSnippet(e){let n=e.unpackedShape,t=[e.width,e.height],o={},i="getOutputCoords";switch(n.length){case 0:o[i]=this.getOutputScalarCoords();break;case 1:o[i]=this.getOutputUnpacked1DCoords(n,t);break;case 2:o[i]=this.getOutputUnpacked2DCoords(n,t);break;case 3:o[i]=this.getOutputUnpacked3DCoords(n,t);break;case 4:o[i]=this.getOutputUnpacked4DCoords(n,t);break;case 5:o[i]=this.getOutputUnpacked5DCoords(n,t);break;case 6:o[i]=this.getOutputUnpacked6DCoords(n,t);break;default:throw new Error(`Unsupported output dimensionality: ${n.length}`)}let s=`
        void setOutput(float val) {
          ${q(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `,u="floatTextureSetR";return o[u]=new N(s),o}getOutputScalarCoords(){return new N(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(e,n){let t=n,o="";return t[0]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${t[1]}.0);
          }
        `,new N(o)):t[1]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${t[0]}.0);
          }
        `,new N(o)):(o=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${t[0]}, ${t[1]}));
          return 2 * (resTexRC.y * ${t[0]} + resTexRC.x);
        }
      `,new N(o))}getOutputPacked2DCoords(e,n){let t="";if(Hn.arraysEqual(e,n))return t=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${n[0]}, ${n[1]}));
        }
      `,new N(t);let o=n,i=Math.ceil(e[1]/2);return t=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${o[0]}, ${o[1]}));

          int index = resTexRC.y * ${o[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${i}) * 2;
          int c = 2 * (index / ${i});

          return ivec2(r, c);
        }
      `,new N(t)}getOutputPacked3DCoords(e,n){let t=[n[0],n[1]],o=Math.ceil(e[2]/2),i=o*Math.ceil(e[1]/2),a=`
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
      `;return new N(a)}getOutputPackedNDCoords(e,n){let t=[n[0],n[1]],o=Math.ceil(e[e.length-1]/2),i=o*Math.ceil(e[e.length-2]/2),a=i,s="",u="b, r, c";for(let c=2;c<e.length-1;c++)a*=e[e.length-c-1],s=`
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
    `;return new N(l)}getOutputUnpacked1DCoords(e,n){let t=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));
          return resTexRC.y * ${n[0]} + resTexRC.x;
        }
      `;return new N(t)}getOutputUnpacked2DCoords(e,n){let t=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));
          int index = resTexRC.y * ${n[0]} + resTexRC.x;
          int r = index / ${e[1]};
          int c = index - r * ${e[1]};
          return ivec2(r, c);
        }
      `;return new N(t)}getOutputUnpacked3DCoords(e,n){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d"],s=i.map((u,l)=>{let c=`int ${a[l]} = index / ${u}`,d=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${c}; ${d};`}).join("");return t=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));
          int index = resTexRC.y * ${n[0]} + resTexRC.x;
          ${s}
          return ivec3(r, c, d);
        }
      `,new N(t)}getOutputUnpacked4DCoords(e,n){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2"],s=i.map((u,l)=>{let c=`int ${a[l]} = index / ${u}`,d=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${c}; ${d};`}).join("");return t=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));
          int index = resTexRC.y * ${n[0]} + resTexRC.x;
          ${s}
          return ivec4(r, c, d, d2);
        }
      `,new N(t)}getOutputUnpacked5DCoords(e,n){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2","d3"],s=i.map((u,l)=>{let c=`int ${a[l]} = index / ${u}`,d=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${c}; ${d};`}).join("");return t=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));
          int index = resTexRC.y * ${n[0]} + resTexRC.x;
          ${s}
          return ivec5(r, c, d, d2, d3);
        }
      `,new N(t)}getOutputUnpacked6DCoords(e,n){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2","d3","d4"],s=i.map((u,l)=>{let c=`int ${a[l]} = index / ${u}`,d=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${c}; ${d};`}).join("");return t=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${n[0]}, ${n[1]}));
         int index = resTexRC.y * ${n[0]} + resTexRC.x;
         ${s}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new N(t)}getCommonUtilFuncs(){let e={},n="uvFromFlat";e[n]=new N(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),n="packedUVfrom1D",e[n]=new N(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),n="packedUVfrom2D",e[n]=new N(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),n="packedUVfrom3D",e[n]=new N(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),n="sampleTexture";let t=q(this.context.glContext.version);return e[n]=new N(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${t.texture2D}(textureSampler, uv).r;
        }`),e}getInputsSamplingSnippets(){let e={},n=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o],a=ko(t);i.isPacked?e[a]=this.getPackedSamplerFromInput(a,t,i):e[a]=this.getUnpackedSamplerFromInput(a,t,i);let s=Vd(t);i.unpackedShape.length<=n.unpackedShape.length&&(i.isPacked?e[s]=this.getPackedSamplerAtOutputCoords(s,i,n,t):e[s]=this.getUnpackedSamplerAtOutputCoords(s,i,n,t))}),e}getPackedSamplerAtOutputCoords(e,n,t,o){let i=n.unpackedShape,a=t.unpackedShape,u=ko(o),l=i.length,c=a.length,d=Xe.getBroadcastDims(i,a),p=Ze(c),f=c-l,h,m=wt();l===0?h="":c<2&&d.length>=1?h="coords = 0;":h=d.map(O=>`coords.${m[O+f]} = 0;`).join(`
`);let y="";c<2&&l>0?y="coords":y=i.map((O,C)=>`coords.${m[C+f]}`).join(", ");let g="return outputValue;",_=F.size(i)===1,w=F.size(a)===1;if(l===1&&!_&&!w)g=`
        return vec4(outputValue.xy, outputValue.xy);
      `;else if(_&&!w)c===1?g=`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:g=`
          return vec4(outputValue.x);
        `;else if(d.length){let O=l-2,C=l-1;d.indexOf(O)>-1&&d.indexOf(C)>-1?g="return vec4(outputValue.x);":d.indexOf(O)>-1?g="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":d.indexOf(C)>-1&&(g="return vec4(outputValue.xx, outputValue.zz);")}let I=`
        int lastDim = coords.${m[c-1]};
        coords.${m[c-1]} = coords.${m[c-2]};
        coords.${m[c-2]} = lastDim;
      `,P=`
      vec4 ${e}() {
        ${p} coords = getOutputCoords();
        ${I}
        ${h}
        vec4 outputValue = ${u}(${y});
        ${g}
      }
    `;return new N(P,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(e,n,t,o){let i=[t.width,t.height],a=[n.width,n.height],s=n.unpackedShape.length,u=t.unpackedShape.length,l=n.unpackedShape,c=t.unpackedShape,d=ko(o);if(s===u&&Hn.arraysEqual(a,i)){let _=`
          float ${e}() {
            return sampleTexture(${o}, TexCoords);
          }
        `;return new N(_,["coordinates.sampleTexture"])}let p=Ze(u),f=Xe.getBroadcastDims(l,c),h=u-s,m,y=wt();s===0?m="":u<2&&f.length>=1?m="coords = 0;":m=f.map(_=>`coords.${y[_+h]} = 0;`).join(`
`);let g="";u<2&&s>0?g="coords":g=n.unpackedShape.map((_,T)=>`coords.${y[T+h]}`).join(", ");let b=`
        float ${e}() {
          ${p} coords = getOutputCoords();
          ${m}
          return ${d}(${g});
        }
      `;return new N(b,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(e,n,t){switch(t.unpackedShape.length){case 0:return this.getPackedSamplerScalar(e,n);case 1:return this.getPackedSampler1D(e,n,t);case 2:return this.getPackedSampler2D(e,n,t);case 3:return this.getPackedSampler3D(e,n,t);default:return this.getPackedSamplerND(e,n,t)}}getUnpackedSamplerFromInput(e,n,t){let o=t.unpackedShape;switch(o.length){case 0:return this.getUnpackedSamplerScalar(e,n,t);case 1:return this.getUnpackedSampler1D(e,n,t);case 2:return this.getUnpackedSampler2D(e,n,t);case 3:return this.getUnpackedSampler3D(e,n,t);case 4:return this.getUnpackedSampler4D(e,n,t);case 5:return this.getUnpackedSampler5D(e,n,t);case 6:return this.getUnpackedSampler6D(e,n,t);default:throw new Error(`Unsupported dimension ${o.length}-D`)}}getPackedSamplerScalar(e,n){let t=q(this.context.glContext.version),o=`
          vec4 ${e}() {
            return ${t.texture2D}(${n}, halfCR);
          }
        `;return new N(o)}getPackedSampler1D(e,n,t){let o=[t.width,t.height],i=[o[1],o[0]],a=q(this.context.glContext.version),u=`vec4 ${e}(int index) {
      vec2 uv = packedUVfrom1D(
      ${i[0]}, ${i[1]}, index);
      return ${a.texture2D}(${n}, uv);
    }`;return new N(u,["coordinates.packedUVfrom1D"])}getPackedSampler2D(e,n,t){let o=t.unpackedShape,i=[t.width,t.height],a=q(this.context.glContext.version),s=i[0],u=i[1];if(i!=null&&Hn.arraysEqual(o,i)){let f=`vec4 ${e}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${u}.0, ${s}.0);
        return ${a.texture2D}(${n}, uv);
      }`;return new N(f)}let l=i,c=Math.ceil(o[1]/2),p=`vec4 ${e}(int row, int col) {
      vec2 uv = packedUVfrom2D(${l[1]}, ${l[0]}, ${c}, row, col);
      return ${a.texture2D}(${n}, uv);
    }`;return new N(p,["coordinates.packedUVfrom2D"])}getPackedSampler3D(e,n,t){let o=t.unpackedShape,i=[t.width,t.height],a=[i[0],i[1]],s=q(this.context.glContext.version);if(o[0]===1){let h=o.slice(1),m=[1,2],y=pr(o,h),g=["b","row","col"],b=JSON.parse(JSON.stringify(t));b.unpackedShape=y;let _=this.getPackedSamplerFromInput(e,n,b),w=`${_.routineBody}
      vec4 ${e}(int b, int row, int col) {
        return ${e}(${fr(g,m)});
      } `;return new N(w,_.dependencies)}let u=a[0],l=a[1],c=Math.ceil(o[2]/2),d=c*Math.ceil(o[1]/2),f=`vec4 ${e}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${l}, ${u}, ${d}, ${c}, b, row, col);
      return ${s.texture2D}(${n}, uv);}`;return new N(f,["coordinates.packedUVfrom3D"])}getPackedSamplerND(e,n,t){let o=t.unpackedShape,i=o.length,a=[t.width,t.height],s=q(this.context.glContext.version),u=[a[0],a[1]],l=u[1],c=u[0],d=Math.ceil(o[i-1]/2),p=d*Math.ceil(o[i-2]/2),f="int b, int row, int col",h=`b * ${p} + (row / 2) * ${d} + (col / 2)`;for(let g=2;g<i-1;g++)f=`int b${g}, `+f,p*=o[i-g-1],h=`b${g} * ${p} + `+h;let y=`vec4 ${e}(${f}) {
      int index = ${h};
      int texR = index / ${c};
      int texC = index - texR * ${c};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${c}, ${l});
      return ${s.texture2D}(${n}, uv);
    }`;return new N(y)}getUnpackedSamplerScalar(e,n,t){let[o,i]=[t.width,t.height];if(o===1&&i===1){let s=`
          float ${e}() {
            return sampleTexture(${n}, halfCR);
          }
        `;return new N(s,["coordinates.sampleTexture"])}let a=`
        float ${e}() {
          int offset_${n} = coordsToOffset(TexCoords, ${o}, ${i});
          vec2 uv = uvFromFlat(${o}, ${i}, offset_${n});
          return sampleTexture(${n}, uv);
        }
      `;return new N(a,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(e,n,t){let o=t.width,i=t.height;if(i===1&&o===1){let s=`
        float ${e}(int index) {
          return sampleTexture(${n}, halfCR);
        }
      `;return new N(s,["coordinates.sampleTexture"])}if(i===1){let s=`
          float ${e}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${o}.0, 0.5);
            return sampleTexture(${n}, uv);
          }
        `;return new N(s,["coordinates.sampleTexture"])}if(o===1){let s=`
          float ${e}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${i}.0);
            return sampleTexture(${n}, uv);
          }
        `;return new N(s,["coordinates.sampleTexture"])}let a=`
        float ${e}(int index) {
          vec2 uv = uvFromFlat(${o}, ${i}, index);
          return sampleTexture(${n}, uv);
        }
      `;return new N(a,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(e,n,t){let o=t.unpackedShape,i=[t.height,t.width];if(i!=null&&Hn.arraysEqual(o,i)){let p=i[1],f=i[0],h=`
          float ${e}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${p}.0, ${f}.0);
            return sampleTexture(${n}, uv);
          }
        `;return new N(h,["coordinates.sampleTexture"])}let{newShape:a,keptDims:s}=br(o),u=a;if(u.length<o.length){let p=pr(o,u),f=JSON.parse(JSON.stringify(t));f.unpackedShape=p;let h=["col","row"],m=`
          ${this.getUnpackedSamplerFromInput(e,n,f).routineBody}
          float ${e}(int row, int col) {
            return ${e}(${fr(h,s)});
          }
        `;return new N(m,["coordinates.sampleTexture"])}let l=i[1],c=i[0];if(c===1){let p=`
          float ${e}(int row, int col) {
            int offset_${n} = coordsToOffset(TexCoords, ${l}, ${c});
            float index = dot(vec3(row, col, offset_${n}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${l}.0);
            return sampleTexture(${n}, uv);
          }
        `;return new N(p,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(l===1){let p=`
          float ${e}(int row, int col) {
            int offset_${n} = coordsToOffset(TexCoords, ${l}, ${c});
            float index = dot(vec3(row, col, offset_${n}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${c}.0, 0.5);
            return sampleTexture(${n}, uv);
          }
        `;return new N(p,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let d=`
        float ${e}(int row, int col) {
          int index = col * ${o[1]} + row;
          vec2 uv = uvFromFlat(${l}, ${c}, index);
          return sampleTexture(${n}, uv);
        }
      `;return new N(d,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(e,n,t){let o=t.unpackedShape,i=o[1]*o[2],a=o[2],{newShape:s,keptDims:u}=br(o),l=s;if(l.length<o.length){let f=pr(o,l),h=["batch","col","row"],m=JSON.parse(JSON.stringify(t));m.unpackedShape=f;let y=this.getUnpackedSamplerFromInput(e,n,m),g=u.reverse(),b=`
          ${y.routineBody}
          float ${e}(int batch, int row, int col) {
            return ${e}(${fr(h,g)});
          }
        `;return new N(b,y.dependencies)}let c=t.width,d=t.height,p=`
          float ${e}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${i} + col * ${a} + row;
            vec2 uv = uvFromFlat(${c}, ${d}, index);
            return sampleTexture(${n}, uv);
          }
      `;return new N(p,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(e,n,t){let o=t.unpackedShape,i=o[3],a=o[2]*i,s=o[1]*a,u=t.width,l=t.height,c=`
        float ${e}(int row, int col, int depth, int depth2) {
          int index = row * ${s} + col * ${a} +
              depth2 * ${i} + depth;
          vec2 uv = uvFromFlat(${u}, ${l}, index);
          return sampleTexture(${n}, uv);
        }
      `;return new N(c,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(e,n,t){let o=t.unpackedShape,i=o[4],a=o[3]*i,s=o[2]*a,u=o[1]*s,{newShape:l,keptDims:c}=br(o);if(l.length<o.length){let h=pr(o,l),m=["row","col","depth","depth2","depth3"],y=JSON.parse(JSON.stringify(t));y.unpackedShape=h;let g=`
          ${this.getUnpackedSamplerFromInput(e,n,y).routineBody}
          float ${e}(int row, int col, int depth, int depth2, int depth3) {
            return ${e}(${fr(m,c)});
          }
        `;return new N(g,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let d=t.width,p=t.height,f=`
        float ${e}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${u} + col * ${s} + depth * ${a} +
          depth3 * ${i} + depth2;
          vec2 uv = uvFromFlat(${d}, ${p}, index);
          return sampleTexture(${n}, uv);
        }
      `;return new N(f,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(e,n,t){let o=t.unpackedShape,i=o[5],a=o[4]*i,s=o[3]*a,u=o[2]*s,l=o[1]*u,{newShape:c,keptDims:d}=br(o);if(c.length<o.length){let m=pr(o,c),y=["row","col","depth","depth2","depth3","depth4"],g=JSON.parse(JSON.stringify(t));g.unpackedShape=m;let b=`
            ${this.getUnpackedSamplerFromInput(e,n,g).routineBody}
            float ${e}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${e}(${fr(y,d)});
            }
          `;return new N(b,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let p=t.width,f=t.height,h=`
          float ${e}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${l} + col * ${u} + depth * ${s} +
            depth2 * ${a} + depth3 * ${i} + depth4;
            vec2 uv = uvFromFlat(${p}, ${f}, index);
            return sampleTexture(${n}, uv);
          }
        `;return new N(h,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let e=this.context.outputTextureLayout,n=e.shape.length,t=e.strides,o=e.width,i=e.height,a=[];for(let u=0;u<n-1;++u)a.push(`
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
    `;return{toVec:new N(s,["coordinates.coordsToOffset"])}}valueFrom(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t],a=(o.unpackedShape.length>0?o.unpackedShape:o.shape).length,s=`_${n}`;e[s]=new N(this.getValueFromSingle(n,a,o.width,o.height,!1),[`shapeUtils.indicesToOffset${s}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),s=s+"_T",e[s]=new N(this.getValueFromSingle(n,a,o.width,o.height,!0),[`shapeUtils.indicesToOffset${s}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),e}getValueFromSingle(e,n,t,o,i){let a=`_${e}`;i&&(a=a+"_T");let s=q(this.context.glContext.version);return`
        float ${a}(int m[${n}]) {
          int offset = indicesToOffset${a}(m);
          vec2 coords = offsetToCoords(offset, ${t}, ${o});
          float value = getColorAsFloat(${s.texture2D}(${e}, coords));
          return value;
        }
        `}getPackedValueFrom(e,n,t,o,i){let a=`_${e}_Pack`;i&&(a=a+"_T");let s=q(this.context.glContext.version);return`
        vec4 ${a}(int m[${n}]) {
          int offset = indicesToOffset_${e}(m);
          vec2 coords = offsetToCoords(offset, ${t}, ${o});
          return ${s.texture2D}(${e}, coords);
        }
        `}}});var Xo,tm=$(()=>{"use strict";Tn();Xo=class r extends ht{constructor(e){super(e)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new N(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new N(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){let e=r.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new N(`
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
        `)}}decodeUint8(){let e=r.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new N(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${e}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){let e=new ArrayBuffer(4),n=new Uint32Array(e),t=new Uint8Array(e);if(n[0]=3735928559,t[0]===239)return!0;if(t[0]===222)return!1;throw new Error("unknown endianness")}}});var Zo,nm=$(()=>{"use strict";Tn();Pe();Zo=class extends ht{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=q(this.context.glContext.version);return{setFragColor:new N(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new N(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}});var Jo,rm=$(()=>{"use strict";Tn();Jo=class r extends ht{constructor(e){super(e)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let e=this.context.outputTextureLayout.shape.length,n={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].unpackedShape;if(i.length<=e){let a=i.length,s=e-a,u=`bcastIndices_${t}`,l="";for(let d=0;d<a;++d)l+=`
          realIndices[${d}] = int( mod(float(bcastedIndices[${s+d}]), ${i[d]}.0) );
          `;let c=`
        void ${u} (int bcastedIndices[${e}], out int realIndices[${a}]) {
          ${l}
        }
        `;n[u]=new N(c)}}),n}bcastMatmulIndex(){let e=this.context.outputTextureLayout.shape.length,n={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].shape;if(!(i.length<2||i.length>e)){let a=i.length,s=e-a,u=`bcastMatmulIndices_${t}`,l="";for(let d=0;d<a-2;++d)l+=`
          realIndices[${d}] = int( mod(float(bcastedIndices[${s+d}]), ${i[d]}.0) );
          `;let c=`
        void ${u}(int bcastedIndices[${e}], out int realIndices[${a}]) {
          ${l}
          realIndices[${a-1}] = bcastedIndices[${e-1}];
          realIndices[${a-2}] = bcastedIndices[${e-2}];
        }
        `;n[u]=new N(c)}}),n}indicesToOffset(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,a=o.length,s=`indicesToOffset_${n}`;e[s]=new N(r.indexToOffsetSingle(s,a,i)),s=`indicesToOffset_${n}_T`,e[s]=new N(r.indexToOffsetSingle(s,a,i.slice().reverse()))}),e}static indexToOffsetSingle(e,n,t){let o="";for(let i=n-1;i>=0;--i)o+=`
        offset += indices[${i}] * ${t[i]};
        `;return`
      int ${e}(int indices[${n}]) {
        int offset = 0;
        ${o}
        return offset;
      }
      `}offsetToIndices(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,a=o.length,s=`offsetToIndices_${n}`;e[s]=new N(r.offsetToIndicesSingle(s,a,i)),s=`offsetToIndices_${n}_T`,e[s]=new N(r.offsetToIndicesSingle(s,a,i.slice().reverse()))}),e}static offsetToIndicesSingle(e,n,t){let o=[];for(let i=0;i<n-1;++i)o.push(`
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
        `;e[a]=new N(u)}),e}}});var Qo,om=$(()=>{"use strict";Tn();Qo=class extends ht{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let n=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},o={};for(let i in t){let a=`${i}Vec`,s="";for(let l=0;l<n;++l)s+=`
          dest[${l}] ${t[i]} src[${l}];
          `;let u=`
        void ${a}(int src[${n}], out int dest[${n}]) {
          ${s}
        }
        `;o[a]=new N(u)}return o}copyVec(){let n=this.context.outputTextureLayout.shape.length,t="";for(let i=0;i<n;++i)t+=`
        dest[${i}] = src[${i}];
        `;let o=`
      void copyVec(int src[${n}], out int dest[${n}]) {
        ${t}
      }
      `;return{copyVec:new N(o)}}setVecItem(){let n=this.context.outputTextureLayout.shape.length,t=`
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
        `;return{setVecItem:new N(o)}}getVecItem(){let n=this.context.outputTextureLayout.shape.length,t=`
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
    `;return{getVecItem:new N(o)}}}});var vu,im=$(()=>{"use strict";em();tm();nm();rm();om();vu={encoding:Xo,fragcolor:Zo,vec:Qo,shapeUtils:Jo,coordinates:Ko}});var Yo,am=$(()=>{"use strict";Tn();Qh();im();Pe();Yo=class{constructor(e,n,t,o){this.libs={};this.glslLibRoutineDependencyGraph={};this.context=new No(e,n,t,o),Object.keys(vu).forEach(a=>{let s=new vu[a](this.context);this.libs[a]=s});let i=this.glslLibRoutineDependencyGraph;for(let a in this.libs){let u=this.libs[a].getFunctions();for(let l in u){let c=a+"."+l,d;i[c]?(d=i[c],d.routineBody=u[l].routineBody):(d=new Gr(c,u[l].routineBody),i[c]=d);let p=u[l].dependencies;if(p)for(let f=0;f<p.length;++f)if(i[p[f]])d.addDependency(i[p[f]]);else{let h=new Gr(p[f]);i[p[f]]=h,d.addDependency(h)}}}}preprocess(){let e=this.context.programInfo,n=e.shaderSource;return this.context.programInfo.hasMain||(n=`${n}
      ${Bd(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),n=Jh(n),`${Md(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(n)}
    ${n}`}getImports(e){let n=this.selectGlslLibRoutinesToBeIncluded(e);if(n.length===0)return"";let t="";for(let o=0;o<n.length;++o)if(n[o].routineBody)t+=n[o].routineBody+`
`;else throw new Error(`Missing body for the Glsl Library routine: ${n[o].name}`);return t}selectGlslLibRoutinesToBeIncluded(e){let n=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(t=>{let o=t.split(".")[1];e.indexOf(o)!==-1&&n.push(this.glslLibRoutineDependencyGraph[t])}),Mo.returnOrderedNodes(n)}getUniforms(e,n){let t=[];if(e)for(let o of e)t.push(`uniform sampler2D ${o};`);if(n)for(let o of n)t.push(`uniform ${o.type} ${o.name}${o.arrayLength?`[${o.arrayLength}]`:""};`);return t.join(`
`)}}});var ei,sm=$(()=>{"use strict";qe();ut();am();Pe();ei=class{constructor(e,n,t){this.profiler=e;this.glContext=n;this.textureLayoutStrategy=t;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,n){this.repo.set(e,n)}run(e,n,t){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let o=this.glContext.gl,i=e.program;o.useProgram(i);try{this.bindOutput(t),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],n)}catch(a){throw _e.error("ProgramManager",e.programInfo.shaderSource),a}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,n,t){return this.profiler.event("backend","ProgramManager.build",()=>{let o=new Yo(this.glContext,e,n,t),i=o.preprocess(),a=this.compile(i);return{programInfo:e,program:a,uniformLocations:this.getUniformLocations(a,o.context.programInfo.inputNames,o.context.programInfo.variables),attribLocations:this.getAttribLocations(a)}})}compile(e){if(!this.vertexShader){_e.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let o=Nd(this.glContext.version);this.vertexShader=this.glContext.compileShader(o,this.glContext.gl.VERTEX_SHADER)}J.debug&&_e.verbose("ProrgramManager",`FragShader:
${e}
`);let n=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),t=this.glContext.createProgram(this.vertexShader,n);return this.glContext.deleteShader(n),t}bindOutput(e){let n=e.width,t=e.height;_e.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${n}/${t}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,n,t)}bindAttributes(e){let n=e.position,t=e.textureCoord;this.glContext.setVertexAttributes(n,t),this.attributesBound=!0}bindUniforms(e,n,t){let o=this.glContext.gl,i=0;for(let{name:a,type:s,location:u,arrayLength:l}of e){let c=n.find(d=>d.name===a)?.data;if(s!=="sampler2D"&&!c)throw new Error(`variable '${a}' does not have data defined in program info`);switch(s){case"sampler2D":this.bindTexture(t[i],u,i),i++;break;case"float":l?o.uniform1fv(u,c):o.uniform1f(u,c);break;case"int":l?o.uniform1iv(u,c):o.uniform1i(u,c);break;default:throw new Error(`Uniform not implemented: ${s}`)}}}bindTexture(e,n,t){this.glContext.bindTextureToUniform(e.texture,t,n)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,n,t){let o=[];if(n)for(let i of n)o.push({name:i,type:"sampler2D",location:this.getUniformLocation(e,i)});if(t)for(let i of t)o.push({...i,location:this.getUniformLocation(e,i.name)});return o}getUniformLocation(e,n){let o=this.glContext.gl.getUniformLocation(e,n);if(o===null)throw new Error(`Uniform ${n} not found.`);return o}getAttribLocation(e,n){return this.glContext.gl.getAttribLocation(e,n)}}});var ti,um=$(()=>{"use strict";ut();Vr();ti=class{constructor(e,n,t,o){this.glContext=e;this.layoutStrategy=n;this.profiler=t;this.config=o;this.pendingRead=new Map;o.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,n,t,o){let i=this.toEncoderType(e),a=this.glContext.getEncoder(i,n.channels||1,o);if(n.isPacked&&o===1)throw new Error("not implemented");let s=n.width,u=n.height,l,c;if(this.config.reuseTextures){l=`${s}x${u}_${a.format}_${a.internalFormat}_${a.textureType}`,c=this.inUseTextures.get(l),c||(c=[],this.inUseTextures.set(l,c));let p=this.idleTextures.get(l);if(p&&p.length>0){let f=p.pop();return c.push(f),o===1&&this.glContext.updateTexture(f,s,u,a,this.toTextureData(e,t)),f}}_e.verbose("TextureManager",`Creating new texture of size ${n.width}x${n.height}`);let d=this.glContext.allocateTexture(s,u,a,this.toTextureData(e,t));return this.config.reuseTextures&&(c.push(d),this.textureLookup.set(d,l)),d}readTexture(e,n,t){return t||(t=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let o=e.shape.reduce((a,s)=>a*s)*t,i=this.glContext.readTexture(e.texture,e.width,e.height,o,this.toEncoderType(n),t);return this.toTensorData(n,i)})}async readTextureAsync(e,n,t){let o=e.tensor.dataId;if(t||(t=1),this.pendingRead.has(o)){let i=this.pendingRead.get(o);return new Promise(a=>i?.push(a))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(o,[]);let i=e.shape.reduce((l,c)=>l*c)*t;await this.glContext.createAndWaitForFence();let a=this.glContext.readTexture(e.texture,e.width,e.height,i,this.toEncoderType(n),t),s=this.toTensorData(n,a),u=this.pendingRead.get(o);return this.pendingRead.delete(o),u?.forEach(l=>l(s)),s})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let n=e.shape.reduce((o,i)=>o*i),t=this.glContext.readTexture(e.texture,e.width,e.height,n*4,"byte",4);return new Float32Array(t.buffer,t.byteOffset,n)})}releaseTexture(e,n){let t;if(this.config.reuseTextures&&(t=this.textureLookup.get(e.texture),t)){n&&this.textureLookup.delete(t);let o=this.inUseTextures.get(t);if(o){let i=o.indexOf(e.texture);if(i!==-1){o.splice(i,1);let a=this.idleTextures.get(t);a||(a=[],this.idleTextures.set(t,a)),a.push(e.texture)}}}(!t||n)&&(_e.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,n){switch(e){case"int16":return n instanceof Int16Array?n:Int16Array.from(n);case"int32":return n instanceof Int32Array?n:Int32Array.from(n);case"int8":return n instanceof Int8Array?n:Int8Array.from(n);case"uint16":return n instanceof Uint16Array?n:Uint16Array.from(n);case"uint32":return n instanceof Uint32Array?n:Uint32Array.from(n);case"uint8":case"bool":return n instanceof Uint8Array?n:Uint8Array.from(n);case"float32":return n instanceof Float32Array?n:Float32Array.from(n);case"float64":return n instanceof Float64Array?n:Float64Array.from(n);default:throw new Error(`TensorData type ${e} is not supported`)}}toTextureData(e,n){if(n)return n instanceof Float32Array?n:new Float32Array(n)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}});var ni,lm=$(()=>{"use strict";ut();Jl();ep();Xh();sm();Tu();um();ni=class{constructor(e,n){this.backend=e;this.context=n;this.layoutStrategy=new jo(e.glContext.maxTextureSize),this.programManager=new ei(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new ti(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:e.textureCacheMode==="full"}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new Ro(this)}onGraphInitialized(e){let n=e.getValues().filter(t=>t.from===-1&&t.tensor).map(t=>t.tensor.dataId);this.initializers=new Set(n)}isInitializer(e){return this.initializers?this.initializers.has(e):!1}addInitializer(e){this.initializers.add(e)}getTextureData(e,n){return n?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,n,t=!1){_e.verbose("WebGLSessionHandler","Storing Texture data in cache"),t?this.packedTextureDataCache.set(e,n):this.unpackedTextureDataCache.set(e,n)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,n,t){let o=Zl(e,n,Kh);return{impl:o.opImpl,context:o.opInit?o.opInit(e,t):e}}}});function uS(r){let e=0;for(;e<r.length&&r[e]();++e);return e-1}var Hr,cm=$(()=>{"use strict";qe();Vr();Vr();un();Hr=class{constructor(e,n){this.frameBufferBound=!1;this.itemsToPoll=[];this.gl=e,this.version=n,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,n,t,o){let i=this.gl,a=i.createTexture();i.bindTexture(i.TEXTURE_2D,a),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);let s=o?t.encode(o,e*n):null;return i.texImage2D(i.TEXTURE_2D,0,t.internalFormat,e,n,0,t.format,t.textureType,s),this.checkError(),a}updateTexture(e,n,t,o,i){let a=this.gl;a.bindTexture(a.TEXTURE_2D,e);let s=o.encode(i,n*t);a.texSubImage2D(a.TEXTURE_2D,0,0,0,n,t,o.format,o.textureType,s),this.checkError()}attachFramebuffer(e,n,t){let o=this.gl;o.bindTexture(o.TEXTURE_2D,e),o.bindFramebuffer(o.FRAMEBUFFER,this.framebuffer),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0),this.checkError(),o.viewport(0,0,n,t),o.scissor(0,0,n,t)}readTexture(e,n,t,o,i,a){let s=this.gl;a||(a=1),this.frameBufferBound||this.attachFramebuffer(e,n,t);let u=this.getEncoder(i,a),l=u.allocate(n*t);return s.bindTexture(s.TEXTURE_2D,e),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,e,0),s.readPixels(0,0,n,t,s.RGBA,u.textureType,l),this.checkError(),u.decode(l,o)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,n){let t=this.gl;t.vertexAttribPointer(e,3,t.FLOAT,!1,20,0),t.enableVertexAttribArray(e),n!==-1&&(t.vertexAttribPointer(n,2,t.FLOAT,!1,20,12),t.enableVertexAttribArray(n)),this.checkError()}createProgram(e,n){let t=this.gl,o=t.createProgram();return t.attachShader(o,e),t.attachShader(o,n),t.linkProgram(o),o}compileShader(e,n){let t=this.gl,o=t.createShader(n);if(!o)throw new Error(`createShader() returned null with type ${n}`);if(t.shaderSource(o,e),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)===!1)throw new Error(`Failed to compile shader: ${t.getShaderInfoLog(o)}
Shader source:
${e}`);return o}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,n,t){let o=this.gl;o.activeTexture(o.TEXTURE0+n),this.checkError(),o.bindTexture(o.TEXTURE_2D,e),this.checkError(),o.uniform1i(t,n),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(J.debug){let e=this.gl,n=e.getError(),t="";switch(n){case e.NO_ERROR:return;case e.INVALID_ENUM:t="INVALID_ENUM";break;case e.INVALID_VALUE:t="INVALID_VALUE";break;case e.INVALID_OPERATION:t="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:t="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:t="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:t="CONTEXT_LOST_WEBGL";break;default:t=`Unknown WebGL Error: ${n.toString(16)}`}throw new Error(t)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,n,t=0){if(this.version===2)return new Lo(this.gl,n);switch(e){case"float":return t===1||this.isRenderFloat32Supported?new Br(this.gl,n):new Br(this.gl,n,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw new Error("not implemented");case"byte":return new zo(this.gl,n);default:throw new Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let n=0;n<this.maxTextureImageUnits;++n)e.activeTexture(e.TEXTURE0+n),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,n=e.createBuffer();if(!n)throw new Error("createBuffer() returned null");let t=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,n),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),this.checkError(),n}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw new Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),this.version===1&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw new Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){this.version===2?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n);let t=this.version===2?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,t,1,1,0,e.RGBA,e.FLOAT,null);let o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(n),e.deleteFramebuffer(o),i}checkRenderFloat32(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e=this.gl,n,t,o,i,a;try{n=e.createTexture(),t=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,n);let s=this.version===2?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,s,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.enable(e.BLEND),o=e.createShader(e.VERTEX_SHADER),!o||(e.shaderSource(o,"void main(){}"),e.compileShader(o),i=e.createShader(e.FRAGMENT_SHADER),!i)||(e.shaderSource(i,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(i),a=e.createProgram(),!a)?!1:(e.attachShader(a,o),e.attachShader(a,i),e.linkProgram(a),e.useProgram(a),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),a&&e.deleteProgram(a),o&&e.deleteShader(o),i&&e.deleteShader(i),t&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(t)),n&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(n))}}beginTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,n=this.disjointTimerQueryWebgl2Extension,t=e.createQuery();return e.beginQuery(n.TIME_ELAPSED_EXT,t),t}else throw new Error("WebGL1 profiling currently not supported.")}endTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,n=this.disjointTimerQueryWebgl2Extension;e.endQuery(n.TIME_ELAPSED_EXT);return}else throw new Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let n=!1,t=!1;if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let o=this.gl,i=this.disjointTimerQueryWebgl2Extension;n=o.getQueryParameter(e,o.QUERY_RESULT_AVAILABLE),t=o.getParameter(i.GPU_DISJOINT_EXT)}else throw new Error("WebGL1 profiling currently not supported");return n&&!t}getTimerResult(e){let n=0;if(this.version===2){let t=this.gl;n=t.getQueryParameter(e,t.QUERY_RESULT),t.deleteQuery(e)}else throw new Error("WebGL1 profiling currently not supported");return n/1e6}async waitForQueryAndGetTime(e){return await js(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let n,t=e,o=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),o===null?n=()=>!0:n=()=>{let i=t.clientWaitSync(o,0,0);return i===t.ALREADY_SIGNALED||i===t.CONDITION_SATISFIED},{query:o,isFencePassed:n}}async pollFence(e){return new Promise(n=>{this.addItemToPoll(()=>e.isFencePassed(),()=>n())})}pollItems(){let e=uS(this.itemsToPoll.map(n=>n.isDoneFn));for(let n=0;n<=e;++n){let{resolveFn:t}=this.itemsToPoll[n];t()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,n){this.itemsToPoll.push({isDoneFn:e,resolveFn:n}),!(this.itemsToPoll.length>1)&&await js(()=>(this.pollItems(),this.itemsToPoll.length===0))}}});function wu(r){let e;if((!r||r==="webgl2")&&"webgl2"in yr?e=yr.webgl2:(!r||r==="webgl")&&"webgl"in yr&&(e=yr.webgl),!e)try{let t=cS();e=dm(t,r)}catch{let o=lS();e=dm(o,r)}r=r||e.version===1?"webgl":"webgl2";let n=e.gl;return yr[r]=e,n.isContextLost()?(delete yr[r],wu(r)):(n.disable(n.DEPTH_TEST),n.disable(n.STENCIL_TEST),n.disable(n.BLEND),n.disable(n.DITHER),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SAMPLE_COVERAGE),n.enable(n.SCISSOR_TEST),n.enable(n.CULL_FACE),n.cullFace(n.BACK),e)}function dm(r,e){let n={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1},t,o=n;if((!e||e==="webgl2")&&(t=r.getContext("webgl2",o),t))try{return new Hr(t,2)}catch(i){_e.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${i}`)}if((!e||e==="webgl")&&(t=r.getContext("webgl",o)||r.getContext("experimental-webgl",o),t))try{return new Hr(t,1)}catch(i){_e.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${i}`)}throw new Error("WebGL is not supported")}function lS(){if(typeof document>"u")throw new TypeError("failed to create canvas: document is not supported");let r=document.createElement("canvas");return r.width=1,r.height=1,r}function cS(){if(typeof OffscreenCanvas>"u")throw new TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var yr,pm=$(()=>{"use strict";ut();cm();yr={}});var ri,fm=$(()=>{"use strict";qe();ut();lm();pm();ri=class{get contextId(){return J.webgl.contextId}set contextId(e){J.webgl.contextId=e}get matmulMaxBatchSize(){return J.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){J.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return J.webgl.textureCacheMode}set textureCacheMode(e){J.webgl.textureCacheMode=e}get pack(){return J.webgl.pack}set pack(e){J.webgl.pack=e}get async(){return J.webgl.async}set async(e){J.webgl.async=e}initialize(){try{return this.glContext=wu(this.contextId),typeof this.matmulMaxBatchSize!="number"&&(this.matmulMaxBatchSize=16),typeof this.textureCacheMode!="string"&&(this.textureCacheMode="full"),typeof this.pack!="boolean"&&(this.pack=!1),typeof this.async!="boolean"&&(this.async=!1),_e.setWithEnv(J),J.webgl.context||Object.defineProperty(J.webgl,"context",{value:this.glContext.gl}),_e.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return _e.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new ni(this,e)}dispose(){this.glContext.dispose()}}});async function Iu(r){if(r){let e=typeof r=="string"?[r]:r;for(let n of e){let t=hm.get(n);if(t)return t;let o=await pS(n);if(o)return o}}else return Iu(["webgl"]);throw new Error("no available backend to use")}async function pS(r){let e=dS;if(typeof e[r]<"u"&&fS(e[r])){let n=e[r],t=n.initialize();if(typeof t=="object"&&"then"in t&&(t=await t),t)return hm.set(r,n),n}}function fS(r){let e=r;return"initialize"in e&&typeof e.initialize=="function"&&"createSessionHandler"in e&&typeof e.createSessionHandler=="function"&&"dispose"in e&&typeof e.dispose=="function"}var hm,dS,mm=$(()=>{"use strict";fm();hm=new Map,dS={webgl:new ri}});var Su,oi,gm=$(()=>{"use strict";ut();Su=class{constructor(e,n){this.op=e;this.node=n}},oi=class{constructor(e,n,t){this.graph=e;this.profiler=t;this.initialize(n)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let n=this.graph.getNodes();if(n.length!==e.length)throw new Error("The size of nodes and OPs do not match.");this._ops=e.map((t,o)=>new Su(t,n[o])),this.reset(),this._starter=[],this._ops.forEach((t,o)=>{let i=!0;for(let a of t.node.inputs)if(!this._values[a]&&this.graph.getInputIndices().indexOf(a)===-1){i=!1;break}i&&this._starter.push(o)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,n){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let t=e.createInferenceHandler(),o=this.graph.getInputIndices();if(n.length!==o.length)throw new Error(`number of input tensors don't match the number of inputs to the model: actual: ${n.length} expected: ${o.length}`);n.forEach((c,d)=>{let p=o[d];this._values[p]=c});let i=this._starter.slice(0),a=this.graph.getValues(),s=this.graph.getNodes(),u=0;for(;u<i.length;){let c=i[u++],d=this._ops[c],p=d.node.inputs.map(y=>this._values[y]);if(p.indexOf(void 0)!==-1)throw new Error(`unresolved input detected: op: ${d.node}`);let f=p;_e.verbose("ExecPlan",`Running op:${d.node.name} (${f.map((y,g)=>`'${d.node.inputs[g]}': ${y.type}[${y.dims.join(",")}]`).join(", ")})`);let h=await this.profiler.event("node",d.node.name,async()=>d.op.impl(t,f,d.op.context));if(h.length!==d.node.outputs.length)throw new Error("the size of output does not match model definition.");h.forEach((y,g)=>{let b=d.node.outputs[g];if(this._values[b])throw new Error(`output [${b}] already has value: op:${d.node.name}`);this._values[b]=y});let m=new Set;h.forEach((y,g)=>{let b=d.node.outputs[g];for(let _ of a[b].to){let T=s[_],w=!0;for(let I of T.inputs)if(!this._values[I]){w=!1;break}w&&m.add(_)}}),i.push(...m)}let l=[];for(let c=0;c<this.graph.getOutputIndices().length;c++){let d=this.graph.getOutputIndices()[c],p=this._values[d];if(p===void 0)throw new Error(`required output [${d}] does not have value`);d===0?await p.getData():p.data,l.push(p)}return _e.verbose("ExecPlan","disposing of inferenceHandler"),t.dispose(),l})}}});var ue,qr,bm=$(()=>{"use strict";kr();ue=re(cr());Xn();ye();qr=class r{constructor(e){if(this._attributes=new Map,e!=null){for(let n of e)n instanceof ue.onnx.AttributeProto?this._attributes.set(n.name,[r.getValue(n),r.getType(n)]):n instanceof $o.Attribute&&this._attributes.set(n.name(),[r.getValue(n),r.getType(n)]);if(this._attributes.size<e.length)throw new Error("duplicated attribute names")}}set(e,n,t){this._attributes.set(e,[t,n])}delete(e){this._attributes.delete(e)}getFloat(e,n){return this.get(e,"float",n)}getInt(e,n){return this.get(e,"int",n)}getString(e,n){return this.get(e,"string",n)}getTensor(e,n){return this.get(e,"tensor",n)}getFloats(e,n){return this.get(e,"floats",n)}getInts(e,n){return this.get(e,"ints",n)}getStrings(e,n){return this.get(e,"strings",n)}getTensors(e,n){return this.get(e,"tensors",n)}get(e,n,t){let o=this._attributes.get(e);if(o===void 0){if(t!==void 0)return t;throw new Error(`required attribute not found: ${e}`)}if(o[1]!==n)throw new Error(`type mismatch: expected ${n} but got ${o[1]}`);return o[0]}static getType(e){let n=e instanceof ue.onnx.AttributeProto?e.type:e.type();switch(n){case ue.onnx.AttributeProto.AttributeType.FLOAT:return"float";case ue.onnx.AttributeProto.AttributeType.INT:return"int";case ue.onnx.AttributeProto.AttributeType.STRING:return"string";case ue.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case ue.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case ue.onnx.AttributeProto.AttributeType.INTS:return"ints";case ue.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case ue.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw new Error(`attribute type is not supported yet: ${ue.onnx.AttributeProto.AttributeType[n]}`)}}static getValue(e){let n=e instanceof ue.onnx.AttributeProto?e.type:e.type();if(n===ue.onnx.AttributeProto.AttributeType.GRAPH||n===ue.onnx.AttributeProto.AttributeType.GRAPHS)throw new Error("graph attribute is not supported yet");let t=this.getValueNoCheck(e);if(n===ue.onnx.AttributeProto.AttributeType.INT&&nt.isLong(t))return nt.longToNumber(t);if(n===ue.onnx.AttributeProto.AttributeType.INTS){let o=t,i=new Array(o.length);for(let a=0;a<o.length;a++){let s=o[a];i[a]=nt.longToNumber(s)}return i}if(n===ue.onnx.AttributeProto.AttributeType.TENSOR)return e instanceof ue.onnx.AttributeProto?Re.fromProto(t):Re.fromOrtTensor(t);if(n===ue.onnx.AttributeProto.AttributeType.TENSORS){if(e instanceof ue.onnx.AttributeProto)return t.map(i=>Re.fromProto(i));if(e instanceof $o.Attribute)return t.map(i=>Re.fromOrtTensor(i))}return n===ue.onnx.AttributeProto.AttributeType.STRING&&e instanceof ue.onnx.AttributeProto?Mr(t):n===ue.onnx.AttributeProto.AttributeType.STRINGS&&e instanceof ue.onnx.AttributeProto?t.map(Mr):t}static getValueNoCheck(e){return e instanceof ue.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(e):this.getValueNoCheckFromOrtFormat(e)}static getValueNoCheckFromOnnxFormat(e){switch(e.type){case ue.onnx.AttributeProto.AttributeType.FLOAT:return e.f;case ue.onnx.AttributeProto.AttributeType.INT:return e.i;case ue.onnx.AttributeProto.AttributeType.STRING:return e.s;case ue.onnx.AttributeProto.AttributeType.TENSOR:return e.t;case ue.onnx.AttributeProto.AttributeType.GRAPH:return e.g;case ue.onnx.AttributeProto.AttributeType.FLOATS:return e.floats;case ue.onnx.AttributeProto.AttributeType.INTS:return e.ints;case ue.onnx.AttributeProto.AttributeType.STRINGS:return e.strings;case ue.onnx.AttributeProto.AttributeType.TENSORS:return e.tensors;case ue.onnx.AttributeProto.AttributeType.GRAPHS:return e.graphs;default:throw new Error(`unsupported attribute type: ${ue.onnx.AttributeProto.AttributeType[e.type]}`)}}static getValueNoCheckFromOrtFormat(e){switch(e.type()){case pt.AttributeType.FLOAT:return e.f();case pt.AttributeType.INT:return e.i();case pt.AttributeType.STRING:return e.s();case pt.AttributeType.TENSOR:return e.t();case pt.AttributeType.GRAPH:return e.g();case pt.AttributeType.FLOATS:return e.floatsArray();case pt.AttributeType.INTS:{let n=[];for(let t=0;t<e.intsLength();t++)n.push(e.ints(t));return n}case pt.AttributeType.STRINGS:{let n=[];for(let t=0;t<e.stringsLength();t++)n.push(e.strings(t));return n}case pt.AttributeType.TENSORS:{let n=[];for(let t=0;t<e.tensorsLength();t++)n.push(e.tensors(t));return n}default:throw new Error(`unsupported attribute type: ${pt.AttributeType[e.type()]}`)}}}});var Au,Pu,dn,ii,$u,ym=$(()=>{"use strict";bm();kr();Au=re(cr());Xn();ye();Pu={from:(r,e)=>new $u(r,e)},dn=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=He.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},ii=class{constructor(e,n){e instanceof Au.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new qr(e.attribute)):e instanceof Os.Node&&(this.name=n??e.name(),this.opType=e.opType(),this.attributes=new qr(He.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},$u=class{constructor(e,n){if(!e)throw new TypeError("graph is empty");this.buildGraph(e),this.transformGraph(n),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof Au.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof As.Graph)this.buildGraphFromOrtFormat(e);else throw new TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let n=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map;if(!e.input)throw new Error("missing information in graph: input");let o=[];for(let i of e.input){if(n.has(i.name))throw new Error(`duplicated input name: ${i.name}`);let a=this._allData.push(new dn(i))-1;n.set(i.name,a),o.push(i.name)}if(!e.initializer)throw new Error("missing information in graph: initializer");for(let i of e.initializer){let a=n.get(i.name);if(a===void 0){let s=new dn;s.type={shape:{dims:He.tensorDimsFromProto(i.dims)},tensorType:He.tensorDataTypeFromProto(i.dataType)},a=this._allData.push(s)-1,n.set(i.name,a)}this._allData[a]._from=-1,this._allData[a].tensor=Re.fromProto(i)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));if(!e.output)throw new Error("missing information in graph: output");for(let i of e.output){if(n.has(i.name))throw new Error(`duplicated output name: ${i.name}`);let a=this._allData.push(new dn(i))-1;n.set(i.name,a),this._allOutputIndices.push(a),this._allOutputNames.push(i.name)}if(!e.node)throw new Error("missing information in graph: node");for(let i of e.node){if(!i.name)for(let s=0;;s++){let u=`unnamed_${i.opType}_${s}`;if(!t.has(u)){i.name=u;break}}if(t.has(i.name))throw new Error(`duplicated node name: ${i.name}`);let a=this._nodes.push(new ii(i))-1;t.set(i.name,a)}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.node[i];if(!s.output)throw new Error(`missing output for node: ${s.name}`);for(let u of s.output){let l=n.get(u);if(typeof l>"u"&&(l=this._allData.push(new dn)-1,n.set(u,l)),a.outputs.push(l),this._allData[l]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${l}`);if(this._allData[l]._from=i,s.opType==="Constant"){if(!s.attribute||s.attribute.length!==1||!s.attribute[0].t)throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!s.output||s.output.length!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");a.outputs.pop(),a.executeNode=!1,this._allData[l]._from=-1,this._allData[l].tensor=Re.fromProto(s.attribute[0].t)}}}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.node[i];if(!s.input)throw new Error(`missing input for node: ${s.name}`);for(let u of s.input){let l=n.get(u);if(typeof l>"u"){if(u===""&&(s.input.length===3||s.input.length===4)&&s.opType==="Resize")continue;throw new Error(`unrecognized input '${u}' for node: ${s.name}`)}a.inputs.push(l),this._allData[l]._to.push(i)}}return!0}buildGraphFromOrtFormat(e){let n=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map,o=[];for(let i=0;i<e.inputsLength();i++){let a=e.inputs(i);if(n.has(a))throw new Error(`duplicated input name: ${a}`);for(let s=0;s<e.nodeArgsLength();s++)if(e.nodeArgs(s)?.name()===a){let u=new dn;if(e.nodeArgs(s)?.type()?.valueType()!==Cs.TypeInfoValue.tensor_type)throw new Error("Unexpected value type for the nodeArg.");let c=e.nodeArgs(s).type().value(new Es.TensorTypeAndShape),d=He.tensorDataTypeFromProto(c.elemType()),p=c.shape(),f=[];for(let m=0;m<p.dimLength();m++)f.push(nt.longToNumber(p.dim(m).value().dimValue()));u.type={shape:{dims:f},tensorType:d};let h=this._allData.push(u)-1;n.set(a,h),o.push(a)}}for(let i=0;i<e.initializersLength();i++){let a=e.initializers(i),s=n.get(a.name());if(s===void 0){let u=new dn,l=He.tensorDimsFromORTFormat(a),c=He.tensorDataTypeFromProto(a.dataType());u.type={shape:{dims:l},tensorType:c},s=this._allData.push(u)-1,n.set(a.name(),s)}this._allData[s]._from=-1,this._allData[s].tensor=Re.fromOrtTensor(a)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));for(let i=0;i<e.outputsLength();i++){let a=e.outputs(i);if(n.has(a))throw new Error(`duplicated output name: ${a}`);let s=this._allData.push(new dn)-1;n.set(a,s),this._allOutputIndices.push(s),this._allOutputNames.push(a)}if(!e.nodes)throw new Error("missing information in graph: node");for(let i=0;i<e.nodesLength();i++){let a=e.nodes(i),s=a.name();if(!s)for(let l=0;s=`unnamed_${a.opType()}_${l}`,!!t.has(s);l++);if(t.has(s))throw new Error(`duplicated node name: ${s}`);let u=this._nodes.push(new ii(a,s))-1;t.set(s,u)}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.nodes(i);if(s==null)throw new Error(`No node exists at index ${i}`);if(s?.outputsLength()===0)throw new Error(`missing output for node: ${s.name}`);for(let u=0;u<s?.outputsLength();u++){let l=s?.outputs(u),c=n.get(l);if(typeof c>"u"&&(c=this._allData.push(new dn)-1,n.set(l,c)),a.outputs.push(c),this._allData[c]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${c}`);if(this._allData[c]._from=i,s.opType()==="Constant"){if(s.attributesLength()!==1||!s.attributes(0).t())throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(s.outputsLength()!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");a.outputs.pop(),a.executeNode=!1,this._allData[c]._from=-1,this._allData[c].tensor=Re.fromOrtTensor(s.attributes(0).t())}}}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.nodes(i);if(s.inputsLength()===0)throw new Error(`missing input for node: ${s.name}`);for(let u=0;u<s.inputsLength();u++){let l=s.inputs(u),c=n.get(l);if(typeof c>"u")throw new Error(`unrecognized input '${l}' for node: ${s.name()}`);a.inputs.push(c),this._allData[c]._to.push(i)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(o=>{this._allData[o]._to.forEach(a=>{e.add(a)})});let n=Array.from(e),t=new Array(this._nodes.length).fill("white");for(;n.length>0;){let o=n.pop();t[o]==="gray"?t[o]="black":(n.push(o),t[o]="gray",this._nodes[o].outputs.forEach(i=>{let a=this._allData[i];if(typeof a.tensor<"u")throw new Error("node outputs should not be initialized");if(a._from!==o)throw new Error("from property of the Value object doesn't match index of Node being processed");a._to.forEach(s=>{if(t[s]==="gray")throw new Error("model graph is cyclic");t[s]==="white"&&n.push(s)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,n=new Array(this._nodes.length,0),t=0;for(let o=0;o<this._nodes.length;o++)n[o]=t,this._nodes[o].executeNode?(t!==o&&(this._nodes[t]=this._nodes[o]),t++):this._nodes[o].outputs.forEach(i=>{this._allData[i]._from=-2});this._nodes.splice(t,this._nodes.length-t);for(let o=0;o<this._allData.length;o++){let i=this._allData[o];i._from!==void 0&&i._from!==-1&&i._from!==-2&&(i._from=n[i._from]);for(let a=0;a<i._to.length;a++)if(i._to[a]>=0)i._to[a]=n[i._to[a]];else throw new Error("Trying to update a removed node")}e=0;for(let o=0;o<this._allData.length;o++){if(this._allData[o].from===-2&&this._allOutputIndices.indexOf(o+e)===-1){e++,this._allData.splice(o,1),o--;continue}if(e>0){let i=-1;this._allData[o].from!==void 0&&this._allData[o].from!==-1?(i=this._nodes[this._allData[o].from].outputs.indexOf(o+e),i!==-1&&(this._nodes[this._allData[o].from].outputs[i]=o)):(i=this._allInputIndices.indexOf(o+e),i!==-1&&(this._allInputIndices[i]=o)),this._allData[o].to.forEach(a=>{i=this._nodes[a].inputs.indexOf(o+e),i!==-1&&(this._nodes[a].inputs[i]=o)}),this._allData[o].to.length===0&&(i=this._allOutputIndices.indexOf(o+e),i!==-1&&(this._allOutputIndices[i]=o))}}}deleteNode(e){let n=this._nodes[e];if(n.outputs.length>1){for(let s=1;s<n.outputs.length;s++)if(this._allData[n.outputs[s]].to.length>0)throw new Error("Node deletion with more than one output connected to other nodes is not supported. ")}n.executeNode=!1;let t=n.inputs[0],o=n.outputs[0],i=this._allData[o].to;for(let s=0;s<n.inputs.length;s++){let u=this._allData[n.inputs[s]].to.indexOf(e);if(u===-1)throw new Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[n.inputs[s]].to.splice(u,1)}this._allData[o]._to=[];let a=this._allOutputIndices.indexOf(o);if(a!==-1&&(this._allOutputIndices[a]=t),i&&i.length>0)for(let s of i){let u=this._nodes[s].inputs.indexOf(o);if(u===-1)throw new Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[s].inputs[u]=t,this._allData[t].to.push(s)}}removeAllDropoutNodes(){let e=0;for(let n of this._nodes){if(n.opType==="Dropout"){if(n.inputs.length!==1)throw new Error("Dropout nodes should only contain one input. ");if(n.outputs.length!==1&&n.outputs.length!==2)throw new Error("Dropout nodes should contain either 1 or 2 output(s)");if(n.outputs.length===2&&this._allData[n.outputs[1]]._to.length!==0)throw new Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let n of this._nodes)n.opType==="Identity"&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if(e.opType==="Conv"){let n=this._allData[e.outputs[0]]._to;if(n.length===1&&this.isActivation(this._nodes[n[0]])){let t=this._nodes[n[0]];if(t.opType==="Clip")if(t.inputs.length===1)try{e.attributes.set("activation_params","floats",[t.attributes.getFloat("min"),t.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[jn,Kn])}else if(t.inputs.length>=3&&this._allData[t.inputs[1]].tensor!==void 0&&this._allData[t.inputs[2]].tensor!==void 0)e.attributes.set("activation_params","floats",[this._allData[t.inputs[1]].tensor.floatData[0],this._allData[t.inputs[2]].tensor.floatData[0]]);else continue;e.attributes.set("activation","string",t.opType),this.deleteNode(n[0])}}}}});var _m,xm,ai,Tm=$(()=>{"use strict";_m=re(be());ym();kr();xm=re(cr());ye();ai=class{constructor(){}load(e,n,t){let o;if(!t)try{this.loadFromOnnxFormat(e,n);return}catch(i){if(t!==void 0)throw i;o=i}try{this.loadFromOrtFormat(e,n)}catch(i){throw t!==void 0?i:new Error(`Failed to load model as ONNX format: ${o}
as ORT format: ${i}`)}}loadFromOnnxFormat(e,n){let t=xm.onnx.ModelProto.decode(e);if(nt.longToNumber(t.irVersion)<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=t.opsetImport.map(i=>({domain:i.domain,version:nt.longToNumber(i.version)})),this._graph=Pu.from(t.graph,n)}loadFromOrtFormat(e,n){let t=new _m.ByteBuffer(e),o=Ps.InferenceSession.getRootAsInferenceSession(t).model();if(nt.longToNumber(o.irVersion())<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let a=0;a<o.opsetImportLength();a++){let s=o.opsetImport(a);this._opsets.push({domain:s?.domain(),version:nt.longToNumber(s.version())})}this._graph=Pu.from(o.graph(),n)}get graph(){return this._graph}get opsets(){return this._opsets}}});var si,vm=$(()=>{"use strict";mm();gm();ut();Tm();si=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=po.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,n,t){await this.profiler.event("session","Session.loadModel",async()=>{let o=await Iu(this.backendHint);if(this.sessionHandler=o.createSessionHandler(this.context),this._model=new ai,typeof e=="string"){let i=e.endsWith(".ort");{let s=await(await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(s),i)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let i=new Uint8Array(e,n||0,t||e.byteLength);this.initialize(i)}})}initialize(e,n){if(this._initialized)throw new Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let t=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,t,n),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new oi(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw new Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let n=this.normalizeAndValidateInputs(e),t=await this._executionPlan.execute(this.sessionHandler,n);return this.createOutput(t)})}normalizeAndValidateInputs(e){let n=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==n.length)throw new Error(`incorrect input array length: expected ${n.length} but got ${e.length}`)}else{if(e.size!==n.length)throw new Error(`incorrect input map size: expected ${n.length} but got ${e.size}`);let t=new Array(e.size),o=0;for(let i=0;i<n.length;++i){let a=e.get(n[i]);if(!a)throw new Error(`missing input tensor for: '${name}'`);t[o++]=a}e=t}if(!this.context.graphInputTypes||this.context.graphInputTypes.length===0||!this.context.graphInputDims||this.context.graphInputDims.length===0){let t=this._model.graph.getInputIndices(),o=this._model.graph.getValues(),i=new Array(t.length);for(let a=0;a<t.length;++a){let s=o[t[a]];i[a]=s.type.shape.dims,this.context.graphInputTypes.push(s.type.tensorType),this.context.graphInputDims.push(e[a].dims)}this.validateInputTensorDims(i,e,!0)}else this.validateInputTensorDims(this.context.graphInputDims,e,!1);return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,n){for(let t=0;t<n.length;t++){let o=e[t],i=n[t].type;if(o!==i)throw new Error(`input tensor[${t}] check failed: expected type '${o}' but got ${i}`)}}validateInputTensorDims(e,n,t){for(let o=0;o<n.length;o++){let i=e[o],a=n[o].dims;if(!this.compareTensorDims(i,a,t))throw new Error(`input tensor[${o}] check failed: expected shape '[${i.join(",")}]' but got [${a.join(",")}]`)}}compareTensorDims(e,n,t){if(e.length!==n.length)return!1;for(let o=0;o<e.length;++o)if(e[o]!==n[o]&&(!t||e[o]!==0))return!1;return!0}createOutput(e){let n=this._model.graph.getOutputNames();if(e.length!==n.length)throw new Error("expected number of outputs do not match number of generated outputs");let t=new Map;for(let o=0;o<n.length;++o)t.set(n[o],e[o]);return t}initializeOps(e){let n=e.getNodes();this._ops=new Array(n.length);for(let t=0;t<n.length;t++)this._ops[t]=this.sessionHandler.resolve(n[t],this._model.opsets,e)}}});var ui,wm=$(()=>{"use strict";qe();Xn();ui=class{constructor(e){this.session=e;this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}async dispose(){}async run(e,n,t){let o=new Map;for(let s in e)if(Object.hasOwnProperty.call(e,s)){let u=e[s];o.set(s,new Re(u.dims,u.type,void 0,void 0,u.data))}let i=await this.session.run(o),a={};return i.forEach((s,u)=>{a[u]=new Je(s.type,s.data,s.dims)}),a}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}});var Im={};ar(Im,{onnxjsBackend:()=>hS});var Ou,hS,Sm=$(()=>{"use strict";vm();wm();Ou=class{async init(){}async createInferenceSessionHandler(e,n){let t=new si(n);return typeof e=="string"?await t.loadModel(e):await t.loadModel(e),new ui(t)}},hS=new Ou});var li=$(()=>{"use strict"});var Pm={};ar(Pm,{default:()=>mS});var $m,Am,mS,Om=$(()=>{"use strict";Eu();kn();ci();$m="ort-wasm-proxy-worker",Am=globalThis.self?.name===$m;Am&&(self.onmessage=r=>{let{type:e,in:n}=r.data;try{switch(e){case"init-wasm":di(n.wasm).then(()=>{pi(n).then(()=>{postMessage({type:e})},t=>{postMessage({type:e,err:t})})},t=>{postMessage({type:e,err:t})});break;case"init-ep":{let{epName:t,env:o}=n;fi(o,t).then(()=>{postMessage({type:e})},i=>{postMessage({type:e,err:i})});break}case"copy-from":{let{buffer:t}=n,o=jr(t);postMessage({type:e,out:o});break}case"create":{let{model:t,options:o}=n;hi(t,o).then(i=>{postMessage({type:e,out:i})},i=>{postMessage({type:e,err:i})});break}case"release":mi(n),postMessage({type:e});break;case"run":{let{sessionId:t,inputIndices:o,inputs:i,outputIndices:a,options:s}=n;gi(t,o,i,a,new Array(a.length).fill(null),s).then(u=>{u.some(l=>l[3]!=="cpu")?postMessage({type:e,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:e,out:u},yi([...i,...u]))},u=>{postMessage({type:e,err:u})});break}case"end-profiling":bi(n),postMessage({type:e});break;default:}}catch(t){postMessage({type:e,err:t})}});mS=Am?null:r=>new Worker(r??st,{type:"classic",name:$m})});var gS,bS,st,_i,Cu,yS,_S,Dm,xS,Em,km,Cm,Lm,ci=$(()=>{"use strict";li();gS=typeof location>"u"?void 0:location.origin,bS=()=>{if(!!1)return typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0},st=bS(),_i=()=>{if(st&&!st.startsWith("blob:"))return st.substring(0,st.lastIndexOf("/")+1)},Cu=(r,e)=>{try{let n=e??st;return(n?new URL(r,n):new URL(r)).origin===gS}catch{return!1}},yS=(r,e)=>{let n=e??st;try{return(n?new URL(r,n):new URL(r)).href}catch{return}},_S=(r,e)=>`${e??"./"}${r}`,Dm=async r=>{let n=await(await fetch(r,{credentials:"same-origin"})).blob();return URL.createObjectURL(n)},xS=async r=>(await import(/*webpackIgnore:true*/r)).default,Em=(Om(),Sr(Pm)).default,km=async()=>{if(!st)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Cu(st))return[void 0,Em()];let r=await Dm(st);return[r,Em(r)]},Cm=void 0,Lm=async(r,e,n)=>{if(!r&&!e&&Cm&&st&&Cu(st))return[void 0,Cm];{let t="ort-wasm-simd-threaded.jsep.mjs",o=r??yS(t,e),i=!!1&&n&&o&&!Cu(o,e),a=i?await Dm(o):o??_S(t,e);return[i?a:void 0,await xS(a)]}}});var Du,ku,xi,zm,TS,vS,di,Ee,kn=$(()=>{"use strict";ci();ku=!1,xi=!1,zm=!1,TS=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},vS=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},di=async r=>{if(ku)return Promise.resolve();if(xi)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(zm)throw new Error("previous call to 'initializeWebAssembly()' failed.");xi=!0;let e=r.initTimeout,n=r.numThreads;if(!vS())throw new Error("WebAssembly SIMD is not supported in the current environment.");let t=TS();n>1&&!t&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),r.numThreads=n=1);let o=r.wasmPaths,i=typeof o=="string"?o:void 0,a=o?.mjs,s=a?.href??a,u=o?.wasm,l=u?.href??u,c=r.wasmBinary,[d,p]=await Lm(s,i,n>1),f=!1,h=[];if(e>0&&h.push(new Promise(m=>{setTimeout(()=>{f=!0,m()},e)})),h.push(new Promise((m,y)=>{let g={numThreads:n};if(c)g.wasmBinary=c;else if(l||i)g.locateFile=b=>l??i+b;else if(s&&s.indexOf("blob:")!==0)g.locateFile=b=>new URL(b,s).href;else if(d){let b=_i();b&&(g.locateFile=_=>b+_)}p(g).then(b=>{xi=!1,ku=!0,Du=b,m(),d&&URL.revokeObjectURL(d)},b=>{xi=!1,zm=!0,y(b)})})),await Promise.race(h),f)throw new Error(`WebAssembly backend initializing failed due to timeout: ${e}ms`)},Ee=()=>{if(ku&&Du)return Du;throw new Error("WebAssembly is not initialized yet.")}});var Be,Kr,ce,Ti=$(()=>{"use strict";kn();Be=(r,e)=>{let n=Ee(),t=n.lengthBytesUTF8(r)+1,o=n._malloc(t);return n.stringToUTF8(r,o,t),e.push(o),o},Kr=(r,e,n,t)=>{if(typeof r=="object"&&r!==null){if(n.has(r))throw new Error("Circular reference in options");n.add(r)}Object.entries(r).forEach(([o,i])=>{let a=e?e+o:o;if(typeof i=="object")Kr(i,a+".",n,t);else if(typeof i=="string"||typeof i=="number")t(a,i.toString());else if(typeof i=="boolean")t(a,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},ce=r=>{let e=Ee(),n=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetLastError(o,o+t);let i=Number(e.getValue(o,t===4?"i32":"i64")),a=e.getValue(o+t,"*"),s=a?e.UTF8ToString(a):"";throw new Error(`${r} ERROR_CODE: ${i}, ERROR_MESSAGE: ${s}`)}finally{e.stackRestore(n)}}});var Rm,Nm=$(()=>{"use strict";kn();Ti();Rm=r=>{let e=Ee(),n=0,t=[],o=r||{};try{if(r?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof r.logSeverityLevel!="number"||!Number.isInteger(r.logSeverityLevel)||r.logSeverityLevel<0||r.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${r.logSeverityLevel}`);if(r?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof r.logVerbosityLevel!="number"||!Number.isInteger(r.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${r.logVerbosityLevel}`);r?.terminate===void 0&&(o.terminate=!1);let i=0;return r?.tag!==void 0&&(i=Be(r.tag,t)),n=e._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),n===0&&ce("Can't create run options."),r?.extra!==void 0&&Kr(r.extra,"",new WeakSet,(a,s)=>{let u=Be(a,t),l=Be(s,t);e._OrtAddRunConfigEntry(n,u,l)!==0&&ce(`Can't set a run config entry: ${a} - ${s}.`)}),[n,t]}catch(i){throw n!==0&&e._OrtReleaseRunOptions(n),t.forEach(a=>e._free(a)),i}}});var wS,IS,SS,$S,Mm,Bm=$(()=>{"use strict";kn();Ti();wS=r=>{switch(r){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${r}`)}},IS=r=>{switch(r){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${r}`)}},SS=r=>{r.extra||(r.extra={}),r.extra.session||(r.extra.session={});let e=r.extra.session;e.use_ort_model_bytes_directly||(e.use_ort_model_bytes_directly="1"),r.executionProviders&&r.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(r.enableMemPattern=!1)},$S=(r,e,n)=>{for(let t of e){let o=typeof t=="string"?t:t.name;switch(o){case"webnn":if(o="WEBNN",typeof t!="string"){let s=t?.deviceType;if(s){let u=Be("deviceType",n),l=Be(s,n);Ee()._OrtAddSessionConfigEntry(r,u,l)!==0&&ce(`Can't set a session config entry: 'deviceType' - ${s}.`)}}break;case"webgpu":if(o="JS",typeof t!="string"){let a=t;if(a?.preferredLayout){if(a.preferredLayout!=="NCHW"&&a.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${a.preferredLayout}`);let s=Be("preferredLayout",n),u=Be(a.preferredLayout,n);Ee()._OrtAddSessionConfigEntry(r,s,u)!==0&&ce(`Can't set a session config entry: 'preferredLayout' - ${a.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let i=Be(o,n);Ee()._OrtAppendExecutionProvider(r,i)!==0&&ce(`Can't append execution provider: ${o}.`)}},Mm=r=>{let e=Ee(),n=0,t=[],o=r||{};SS(o);try{let i=wS(o.graphOptimizationLevel??"all"),a=IS(o.executionMode??"sequential"),s=typeof o.logId=="string"?Be(o.logId,t):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log serverity level is not valid: ${u}`);let l=o.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let c=typeof o.optimizedModelFilePath=="string"?Be(o.optimizedModelFilePath,t):0;if(n=e._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,a,!!o.enableProfiling,0,s,u,l,c),n===0&&ce("Can't create session options."),o.executionProviders&&$S(n,o.executionProviders,t),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let d=Be("enableGraphCapture",t),p=Be(o.enableGraphCapture.toString(),t);e._OrtAddSessionConfigEntry(n,d,p)!==0&&ce(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[d,p]of Object.entries(o.freeDimensionOverrides)){if(typeof d!="string")throw new Error(`free dimension override name must be a string: ${d}`);if(typeof p!="number"||!Number.isInteger(p)||p<0)throw new Error(`free dimension override value must be a non-negative integer: ${p}`);let f=Be(d,t);e._OrtAddFreeDimensionOverride(n,f,p)!==0&&ce(`Can't set a free dimension override: ${d} - ${p}.`)}return o.extra!==void 0&&Kr(o.extra,"",new WeakSet,(d,p)=>{let f=Be(d,t),h=Be(p,t);e._OrtAddSessionConfigEntry(n,f,h)!==0&&ce(`Can't set a session config entry: ${d} - ${p}.`)}),[n,t]}catch(i){throw n!==0&&e._OrtReleaseSessionOptions(n)!==0&&ce("Can't release session options."),t.forEach(a=>e._free(a)),i}}});var _r,Ln,zn,vi,Xr,wi,Ii,Lu,j=$(()=>{"use strict";_r=r=>{switch(r){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${r}`)}},Ln=r=>{switch(r){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${r}`)}},zn=(r,e)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][r],t=typeof e=="number"?e:e.reduce((o,i)=>o*i,1);return n>0?Math.ceil(t*n):void 0},vi=r=>{switch(r){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${r}`)}},Xr=r=>{switch(r){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${r}`)}},wi=r=>r==="float32"||r==="float16"||r==="int32"||r==="int64"||r==="uint32"||r==="uint8"||r==="bool"||r==="uint4"||r==="int4",Ii=r=>r==="float32"||r==="float16"||r==="int32"||r==="int64"||r==="uint32"||r==="uint64"||r==="int8"||r==="uint8"||r==="bool"||r==="uint4"||r==="int4",Lu=r=>{switch(r){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${r}`)}}});var Zr,zu=$(()=>{"use strict";li();Zr=async r=>{if(typeof r=="string")if(!1)try{let{readFile:e}=ta("node:fs/promises");return new Uint8Array(await e(r))}catch(e){if(e.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:n}=ta("node:fs"),t=n(r),o=[];for await(let i of t)o.push(i);return new Uint8Array(Buffer.concat(o))}throw e}else{let e=await fetch(r);if(!e.ok)throw new Error(`failed to load external data file: ${r}`);let n=e.headers.get("Content-Length"),t=n?parseInt(n,10):0;if(t<1073741824)return new Uint8Array(await e.arrayBuffer());{if(!e.body)throw new Error(`failed to load external data file: ${r}, no response body.`);let o=e.body.getReader(),i;try{i=new ArrayBuffer(t)}catch(s){if(s instanceof RangeError){let u=Math.ceil(t/65536);i=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw s}let a=0;for(;;){let{done:s,value:u}=await o.read();if(s)break;let l=u.byteLength;new Uint8Array(i,a,l).set(u),a+=l}return new Uint8Array(i,0,t)}}else return r instanceof Blob?new Uint8Array(await r.arrayBuffer()):r instanceof Uint8Array?r:new Uint8Array(r)}});var AS,PS,Vm,Fm,Si,OS,oe,pn=$(()=>{"use strict";j();AS=["V","I","W","E","F"],PS=(r,e)=>{console.log(`[${AS[r]},${new Date().toISOString()}]${e}`)},Si=(r,e)=>{Vm=r,Fm=e},OS=(r,e)=>{let n=Xr(r),t=Xr(Vm);n>=t&&PS(n,typeof e=="function"?e():e)},oe=(...r)=>{Fm&&OS(...r)}});var $i,Ru=$(()=>{"use strict";j();$i=(r,e)=>new(vi(e))(r)});var Ai=$(()=>{"use strict"});var Gm,Nu,Mu,ES,CS,Um,Vu,Bu,Hm,qm=$(()=>{"use strict";pn();Ai();Gm=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Nu=[],Mu=r=>Math.ceil(Number(r)/16)*16,ES=r=>{for(let e=0;e<Nu.length;e++){let n=Nu[e];if(r<=n)return n}return Math.ceil(r/16)*16},CS=1,Um=()=>CS++,Vu=async(r,e,n,t)=>{let o=Mu(n),i=r.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=r.getCommandEncoder();r.endComputePass(),a.copyBufferToBuffer(e,0,i,0,o),r.flush(),await i.mapAsync(GPUMapMode.READ);let s=i.getMappedRange();if(t){let u=t();return u.set(new Uint8Array(s,0,n)),u}else return new Uint8Array(s.slice(0,n))}finally{i.destroy()}},Bu=class{constructor(e){this.backend=e;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[n]of Gm)Nu.push(n),this.freeBuffers.set(n,[]),this.freeUniformBuffers.set(n,[]);this.sessionCount=0}upload(e,n){let t=n.buffer,o=n.byteOffset,i=n.byteLength,a=Mu(i),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${i}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=u.getMappedRange();new Uint8Array(l).set(new Uint8Array(t,o,i)),u.unmap();let c=this.backend.device.createCommandEncoder();c.copyBufferToBuffer(u,0,s.gpuData.buffer,0,a),this.backend.device.queue.submit([c.finish()]),u.destroy(),oe("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,n){let t=this.storageCache.get(e);if(!t)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(n);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(t.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=Mu(t.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(t.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(e,n,t){let o;if(t){if(o=t[0],e===t[1])return oe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=Um();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:e},originalSize:n}),oe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, registered.`),o}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),oe("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,n=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let t=ES(e),o,i=(n&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(n&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let l=(i?this.freeBuffers:this.freeUniformBuffers).get(t);l?l.length>0?o=l.pop():o=this.backend.device.createBuffer({size:t,usage:n}):o=this.backend.device.createBuffer({size:t,usage:n})}else o=this.backend.device.createBuffer({size:t,usage:n});let s={id:Um(),type:0,buffer:o};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),oe("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let n=typeof e=="bigint"?Number(e):e,t=this.storageCache.get(n);if(!t){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return oe("verbose",()=>`[WebGPU] GpuDataManager.release(id=${n}), gpuDataId=${t.gpuData.id}`),this.storageCache.delete(n),this.buffersPending.push(t.gpuData.buffer),t.originalSize}async download(e,n){let t=this.storageCache.get(Number(e));if(!t)throw new Error("data does not exist");await Vu(this.backend,t.gpuData.buffer,t.originalSize,n)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let n=Gm.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let t=this.freeBuffers.get(e.size)||[];n===void 0||t.length>=n?e.destroy():t.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let t=this.freeUniformBuffers.get(e.size)||[];n===void 0||t.length>=n?e.destroy():t.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let n of this.buffersPending)e.push(n);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let n=this.capturedPendingBuffers.get(e);n&&(n.forEach(t=>{t.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(oe("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Hm=(...r)=>new Bu(...r)});var Fu,K,Oe=$(()=>{"use strict";Fu=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},K=r=>new Fu(r)});var Gu,fn,S,tr,Pi,jm,Km,Q=$(()=>{"use strict";Gu=class{static calcMatMulShape(e,n){return e[1]!==n[0]?void 0:[e[0],n[1]]}},fn=class{static calcShape(e,n,t=!1){let o=e.length,i=n.length;if(o===0)return n;if(i===0)return e;let a=Math.max(e.length,n.length),s=new Array(a);if(t){if(o<2||i<2)return;let u=Gu.calcMatMulShape([e[o-2],e[o-1]],[n[i-2],n[i-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=t?3:1;u<=a;u++){let l=o-u<0?1:e[o-u],c=i-u<0?1:n[i-u];if(l!==c&&l>1&&c>1)return;let d=Math.max(l,c);if(l&&c)s[a-u]=Math.max(l,c);else{if(d>1)return;s[a-u]=0}}return s}static isValidBroadcast(e,n){let t=e.length,o=n.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==n[o-i])return!1;return!0}},S=class r{static size(e){return r.getSizeFromDimensionRange(e,0,e.length)}static convertShape(e,n=4){let t=e.length;if(t===0)return[];let o=new Array(t),i=t-1;for(;i>=0;){if(e[i]%n===0){o[i]=e[i]/n;break}if(n%e[i]!==0)throw new Error("cannot convert shape");o[i]=1,n/=e[i],i--}for(i--;i>=0;i--)o[i]=e[i];return o}static sizeFromDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,n,e.length)}static sizeToDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,0,n)}static getSizeFromDimensionRange(e,n,t){let o=1;for(let i=n;i<t;i++){if(e[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(e[i])}return o}static computeStrides(e){let n=e.length;if(n===0)return[];if(n===1)return[1];let t=new Array(n);t[n-1]=1,t[n-2]=e[n-1];for(let o=n-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static normalizeAxis(e,n){if(e<-n&&e>=n)throw new Error("unsupported axis for this operation.");return e<0?e+n:e}static normalizeAxes(e,n){return e.map(t=>this.normalizeAxis(t,n??e.length))}static sortBasedOnPerm(e,n){return n?n.map(t=>e[t]):e.slice().reverse()}static padShape(e,n){let t=e.length;return e.map((o,i)=>o+n[i]+n[i+t])}static areEqual(e,n){return e.length!==n.length?!1:e.every((t,o)=>t===n[o])}},tr=class r{static adjustPoolAttributes(e,n,t,o,i,a){if(!e&&t.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let s=0;s<n.length-2;s++)s>=t.length?t.push(n[s+2]):t[s]=n[s+2];for(let s=0;s<t.length;s++)if(s<o.length){if(o[s]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let s=0;s<t.length;s++)if(s<i.length){if(i[s]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let s=0;s<t.length*2;s++)if(s<a.length){if(a[s]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let s=0;s<t.length;s++){if(t[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[s]>=t[s]||a[s+t.length]>=t[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,n,t,o,i,a,s){if(s){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<e.length-2;u++)r.adjustPadAndReturnShape(e[u+(a?1:2)],n[u],t[u],o[u],i,u,u+e.length-2,s)}}static computePoolOutputShape(e,n,t,o,i,a,s){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let u=[n[0],n[1]];return r.computeShapeHelper(e,n,u,t,o,i,a,s),u}static computeConvOutputShape(e,n,t,o,i,a,s){if(e.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],n[0]];return r.computeShapeHelper(!1,e,u,t,o,i,a,s),u}static computeShapeHelper(e,n,t,o,i,a,s,u){if(e)for(let l=0;l<n.length-2;l++)t.push(1);else for(let l=0;l<n.length-2;l++)t.push(r.adjustPadAndReturnShape(n[l+2],o[l],i[l],a[l],s,l,l+n.length-2,u))}static adjustPadAndReturnShape(e,n,t,o,i,a,s,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[a]=0,i[s]=0,Math.floor((e-l)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let d=((e+n-1)/n-1)*n+o-e;return i[a]=Math.floor(u==="SAME_LOWER"?(d+1)/2:d/2),i[s]=d-i[a],Math.floor((e+d-o)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[a]+i[s]-l)/n+1)}},Pi=class{static getShapeOfGemmResult(e,n,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let a,s,u;n?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(i&&!fn.isValidBroadcast(i,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},jm=-34028234663852886e22,Km=34028234663852886e22});var nr,Wu,xe,Ve,D,pe,Hu,rr,It,B,Oi,A,E,Xm,Ei,Uu,Zm,ne=$(()=>{"use strict";j();Q();nr=64,Wu=(r,e)=>{if(e===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(r)){case 10:return e>1?`vec${e}<f16>`:"f16";case 1:return e>1?`vec${e}<f32>`:"f32";case 6:return e>1?`vec${e}<i32>`:"i32";case 12:return e>1?`vec${e}<u32>`:"u32";case 7:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(e!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${r}`)}},xe=(r,e=1)=>{let n=Wu(r,e);return typeof n=="string"?n:n[0]},Ve=(r,e=1)=>{let n=Wu(r,e);return typeof n=="string"?n:n[1]},D=(...r)=>{let e=[];return r.forEach(n=>{n.length!==0&&e.push({type:12,data:n},{type:12,data:S.computeStrides(n)})}),e},pe=r=>r%4===0?4:r%2===0?2:1,Hu=(r="f32",e,n="0")=>!e||e===1?`${r}(${n})`:`vec${e}<${r}>(${n})`,rr=(r,e,n)=>r==="f32"?n:e===1?`f32(${n})`:`vec${e}<f32>(${n})`,It=(r,e)=>e===4?`(${r}.x + ${r}.y + ${r}.z + ${r}.w)`:e===2?`(${r}.x + ${r}.y)`:e===3?`(${r}.x + ${r}.y + ${r}.z)`:r,B=(r,e,n,t)=>r.startsWith("uniforms.")&&n>4?typeof e=="string"?t==="f16"?`${r}[(${e}) / 8][(${e}) % 8 / 4][(${e}) % 8 % 4]`:`${r}[(${e}) / 4][(${e}) % 4]`:t==="f16"?`${r}[${Math.floor(e/8)}][${Math.floor(e%8/4)}][${e%8%4}]`:`${r}[${Math.floor(e/4)}][${e%4}]`:n>1?`${r}[${e}]`:r,Oi=(r,e,n,t,o)=>{let i=typeof n=="number",a=i?n:n.length,s=[...new Array(a).keys()],u=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,l=Wu(e,o),c=typeof l=="string"?l:l[1],d=typeof l=="string"?l:l[0],p={indices:u,value:c,storage:d,tensor:e},f=z=>typeof z=="string"?z:`${z}u`,h={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},m=i?"uniforms.":"",y=`${m}${r}_shape`,g=`${m}${r}_strides`,b="";for(let z=0;z<a-1;z++)b+=`
    let dim${z} = current / ${B(g,z,a)};
    let rest${z} = current % ${B(g,z,a)};
    indices[${z}] = dim${z};
    current = rest${z};
    `;b+=`indices[${a-1}] = current;`;let _=a<2?"":`
  fn o2i_${r}(offset: u32) -> ${p.indices} {
    var indices: ${p.indices};
    var current = offset;
    ${b}
    return indices;
  }`,T=z=>(h.offsetToIndices=!0,a<2?z:`o2i_${r}(${z})`),w=[];if(a>=2)for(let z=a-1;z>=0;z--)w.push(`${B(g,z,a)} * (indices[${z}])`);let I=a<2?"":`
  fn i2o_${r}(indices: ${p.indices}) -> u32 {
    return ${w.join("+")};
  }`,P=z=>(h.indicesToOffset=!0,a<2?z:`i2o_${r}(${z})`),O=(...z)=>a===0?"0u":`${p.indices}(${z.map(f).join(",")})`,C=(z,W)=>a<2?`${z}`:`${B(z,W,a)}`,M=(z,W,Te)=>a<2?`${z}=${Te};`:`${B(z,W,a)}=${Te};`,V={},Y=(z,W)=>{h.broadcastedIndicesToOffset=!0;let Te=`${W.name}broadcastedIndicesTo${r}Offset`;if(Te in V)return`${Te}(${z})`;let In=[];for(let Ce=a-1;Ce>=0;Ce--){let Me=W.indicesGet("outputIndices",Ce+W.rank-a);In.push(`${C(g,Ce)} * (${Me} % ${C(y,Ce)})`)}return V[Te]=`fn ${Te}(outputIndices: ${W.type.indices}) -> u32 {
             return ${In.length>0?In.join("+"):"0u"};
           }`,`${Te}(${z})`},L=(z,W)=>(()=>{if(p.storage===p.value)return`${r}[${z}]=${W};`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`${r}[${z}]=vec2<u32>(u32(${W}), select(0u, 0xFFFFFFFFu, ${W} < 0));`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`${r}[${z}]=vec2<u32>(u32(${W}), 0u);`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`${r}[${z}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${W}));`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),X=z=>(()=>{if(p.storage===p.value)return`${r}[${z}]`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`i32(${r}[${z}].x)`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`u32(${r}[${z}].x)`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`vec4<bool>(bool(${r}[${z}] & 0xFFu), bool(${r}[${z}] & 0xFF00u), bool(${r}[${z}] & 0xFF0000u), bool(${r}[${z}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),$e=a<2?"":`
  fn get_${r}ByIndices(indices: ${p.indices}) -> ${c} {
    return ${X(`i2o_${r}(indices)`)};
  }`,U=a<2?"":(()=>{let z=s.map(Te=>`d${Te}: u32`).join(", "),W=s.map(Te=>`d${Te}`).join(", ");return`
  fn get_${r}(${z}) -> ${c} {
    return get_${r}ByIndices(${O(W)});
  }`})(),te=(...z)=>{if(z.length!==a)throw new Error(`indices length must be ${a}`);let W=z.map(f).join(",");return a===0?X("0u"):a===1?X(W[0]):(h.get=!0,h.getByIndices=!0,h.indicesToOffset=!0,`get_${r}(${W})`)},ie=z=>a<2?X(z):(h.getByIndices=!0,h.indicesToOffset=!0,`get_${r}ByIndices(${z})`),Z=a<2?"":`
  fn set_${r}ByIndices(indices: ${p.indices}, value: ${c}) {
    ${L(`i2o_${r}(indices)`,"value")}
  }`,ve=a<2?"":(()=>{let z=s.map(Te=>`d${Te}: u32`).join(", "),W=s.map(Te=>`d${Te}`).join(", ");return`
  fn set_${r}(${z}, value: ${c}) {
    set_${r}ByIndices(${O(W)}, value);
  }`})();return{impl:()=>{let z=[],W=!1;return h.offsetToIndices&&(z.push(_),W=!0),h.indicesToOffset&&(z.push(I),W=!0),h.broadcastedIndicesToOffset&&(Object.values(V).forEach(Te=>z.push(Te)),W=!0),h.set&&(z.push(ve),W=!0),h.setByIndices&&(z.push(Z),W=!0),h.get&&(z.push(U),W=!0),h.getByIndices&&(z.push($e),W=!0),!i&&W&&z.unshift(`const ${y} = ${p.indices}(${n.join(",")});`,`const ${g} = ${p.indices}(${S.computeStrides(n).join(",")});`),z.join(`
`)},type:p,offsetToIndices:T,indicesToOffset:P,broadcastedIndicesToOffset:Y,indices:O,indicesGet:C,indicesSet:M,set:(...z)=>{if(z.length!==a+1)throw new Error(`indices length must be ${a}`);let W=z[a];if(typeof W!="string")throw new Error("value must be string");let Te=z.slice(0,a).map(f).join(",");return a===0?L("0u",W):a===1?L(Te[0],W):(h.set=!0,h.setByIndices=!0,h.indicesToOffset=!0,`set_${r}(${Te}, ${W})`)},setByOffset:L,setByIndices:(z,W)=>a<2?L(z,W):(h.setByIndices=!0,h.indicesToOffset=!0,`set_${r}ByIndices(${z}, ${W});`),get:te,getByOffset:X,getByIndices:ie,usage:t,name:r,strides:g,shape:y,rank:a}},A=(r,e,n,t=1)=>Oi(r,e,n,"input",t),E=(r,e,n,t=1)=>Oi(r,e,n,"output",t),Xm=(r,e,n)=>Oi(r,e,n,"atomicOutput",1),Ei=(r,e,n,t=1)=>Oi(r,e,n,"internal",t),Uu=class{constructor(e,n){this.normalizedDispatchGroup=e;this.limits=n;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=nr){let n=typeof e=="number"?e:e[0],t=typeof e=="number"?1:e[1],o=typeof e=="number"?1:e[2];if(n>this.limits.maxComputeWorkgroupSizeX||t>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${n}, ${t}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(n*t*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${n}, ${t}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
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
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=n=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(n)];return this.uniforms.map(n=>[e(n.type),n.length??1])}},Zm=(r,e)=>new Uu(r,e)});var DS,Jm,kS,LS,zS,RS,Fe,Qm,Ym,vn=$(()=>{"use strict";j();Q();Oe();ne();DS=(r,e)=>{if(!r||r.length!==1)throw new Error("Transpose requires 1 input.");if(e.length!==0&&e.length!==r[0].dims.length)throw new Error(`perm size ${e.length} does not match input rank ${r[0].dims.length}`)},Jm=(r,e)=>e.length!==0?e:[...new Array(r).keys()].reverse(),kS=(r,e)=>S.sortBasedOnPerm(r,Jm(r.length,e)),LS=(r,e,n,t)=>{let o=`fn perm(i: ${t.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let i=0;i<e;++i)o+=`a[${r[i]}]=i[${i}];`;return o+="return a;}"},zS=(r,e)=>{let n=[],t=[];for(let o=0;o<r.length;++o)r[o]!==1&&n.push(r[o]),r[e[o]]!==1&&t.push(e[o]);return{newShape:n,newPerm:t}},RS=(r,e)=>{let n=0;for(let t=0;t<r.length;++t)if(e[r[t]]!==1){if(r[t]<n)return!1;n=r[t]}return!0},Fe=(r,e)=>{let n=r.dataType,t=r.dims.length,o=Jm(t,e),i=kS(r.dims,o),a=r.dims,s=i,u=t<2||RS(o,r.dims),l;if(u)return l=m=>{let y=A("input",n,a,4),g=E("output",n,s,4);return`
  ${m.registerUniform("output_size","u32").declareVariables(y,g)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let m=S.size(i);return{outputs:[{dims:i,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(m/64/4)},programUniforms:[{type:12,data:Math.ceil(m/4)}]}},getShaderSource:l};let{newShape:c,newPerm:d}=zS(r.dims,o),p=S.areEqual(d,[2,3,1]),f=S.areEqual(d,[3,1,2]);if(c.length===2||p||f){a=p?[c[0],c[1]*c[2]]:f?[c[0]*c[1],c[2]]:c,s=[a[1],a[0]];let m=16;return l=y=>{let g=A("a",n,a.length),b=E("output",n,s.length);return`
  ${y.registerUniform("output_size","u32").declareVariables(g,b)}
  var<workgroup> tile : array<array<${b.type.value}, ${m+1}>, ${m}>;
  ${y.mainStart([m,m,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${m} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${m}u + local_id.x;
    let input_row = workgroup_id_x * ${m}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${g.getByIndices(`${g.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${m}u + local_id.x;
    let output_row = workgroup_id_y * ${m}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${b.setByIndices(`${b.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let y=S.size(i);return{outputs:[{dims:i,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(s[1]/m),y:Math.ceil(s[0]/m)},programUniforms:[{type:12,data:y},...D(a,s)]}},getShaderSource:l}}return l=m=>{let y=A("a",n,a.length),g=E("output",n,s.length);return`
  ${m.registerUniform("output_size","u32").declareVariables(y,g)}

  ${LS(o,t,y,g)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${g.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${g.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${e}`,inputDependencies:["rank"]},getRunData:()=>{let m=S.size(i);return{outputs:[{dims:i,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...D(a,s)]}},getShaderSource:l}},Qm=(r,e)=>{DS(r.inputs,e.perm),r.compute(Fe(r.inputs[0],e.perm))},Ym=r=>K({perm:r.perm})});var NS,MS,BS,VS,FS,GS,US,WS,HS,qS,hn,eg,tg,ng,rg,og,ig,ag,sg,ug,lg,cg=$(()=>{"use strict";j();Q();ne();Ci();vn();NS={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},MS={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},BS={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},VS={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},FS=(r,e)=>{let n=[];for(let t=e-r;t<e;++t)n.push(t);return n},GS=(r,e)=>{let n=[],t=r.length;for(let i=0;i<t;i++)e.indexOf(i)===-1&&n.push(r[i]);let o=e.map(i=>r[i]);return[n,o]},US=(r,e)=>{let n=r.length+e.length,t=[],o=0;for(let i=0;i<n;i++)e.indexOf(i)===-1?t.push(r[o++]):t.push(1);return t},WS=(r,e)=>{for(let n=0;n<r.length;++n)if(r[r.length-n-1]!==e-1-n)return!1;return!0},HS=(r,e)=>{let n=[];if(!WS(r,e)){for(let t=0;t<e;++t)r.indexOf(t)===-1&&n.push(t);r.forEach(t=>n.push(t))}return n},qS=(r,e,n,t,o,i,a)=>{let s=n[0].dims,u=S.size(i),l=S.size(a),c=A("_A",n[0].dataType,s),d=E("output",o,i),p=64;u===1&&(p=256);let f=`
          var<workgroup> aBestValues : array<f32, ${p}>;
       `,h=m=>`
        ${m.registerUniform("reduceSize","u32").declareVariables(c,d)}
        ${f}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${m.mainStart(p)}

          let outputIndex = global_idx / ${p};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${BS[t]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${p}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${NS[t]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${p}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${MS[t]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${d.setByOffset("outputIndex",`${t==="mean"?`${d.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${d.type.storage}(${VS[t]})`}`)};
         }
        }`;return{name:r,shaderCache:{hint:`${e};${p}`,inputDependencies:["type"]},getShaderSource:h,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:u},programUniforms:[{type:12,data:l}]})}},hn=(r,e,n,t)=>{let o=r.inputs.length===1?n:qu(r.inputs,n),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=r.inputs[0].dims.map((f,h)=>h));let a=S.normalizeAxes(i,r.inputs[0].dims.length),s=a,u=r.inputs[0],l=HS(s,r.inputs[0].dims.length);l.length>0&&(u=r.compute(Fe(r.inputs[0],l),{inputs:[0],outputs:[-1]})[0],s=FS(s.length,u.dims.length));let[c,d]=GS(u.dims,s),p=c;o.keepDims&&(p=US(c,a)),r.compute(qS(e,o.cacheKey,[u],t,r.inputs[0].dataType,p,d),{inputs:[u]})},eg=(r,e)=>{hn(r,"ReduceMeanShared",e,"mean")},tg=(r,e)=>{hn(r,"ReduceL1Shared",e,"l1")},ng=(r,e)=>{hn(r,"ReduceL2Shared",e,"l2")},rg=(r,e)=>{hn(r,"ReduceLogSumExpShared",e,"logSumExp")},og=(r,e)=>{hn(r,"ReduceMaxShared",e,"max")},ig=(r,e)=>{hn(r,"ReduceMinShared",e,"min")},ag=(r,e)=>{hn(r,"ReduceProdShared",e,"prod")},sg=(r,e)=>{hn(r,"ReduceSumShared",e,"sum")},ug=(r,e)=>{hn(r,"ReduceSumSquareShared",e,"sumSquare")},lg=(r,e)=>{hn(r,"ReduceLogSumShared",e,"logSum")}});var mn,jS,Di,qu,gn,KS,XS,ZS,JS,QS,YS,e1,t1,n1,r1,bn,dg,pg,fg,hg,mg,gg,bg,yg,_g,xg,Ci=$(()=>{"use strict";j();Q();Oe();ne();cg();mn=r=>{if(!r||r.length===0||r.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(r.length===2&&r[1].dims.length!==1)throw new Error("Invalid axes input dims.")},jS=r=>["","",`var value = ${r.getByIndices("input_indices")};`,""],Di=(r,e,n,t,o,i,a=!1,s=!1)=>{let u=[],l=n[0].dims,c=l.length,d=S.normalizeAxes(o,c),p=!s&&d.length===0;l.forEach((y,g)=>{p||d.indexOf(g)>=0?a&&u.push(1):u.push(y)});let f=u.length,h=S.size(u);return{name:r,shaderCache:e,getShaderSource:y=>{let g=[],b=A("_A",n[0].dataType,c),_=E("output",i,f),T=t(b,_,d),w=T[2];for(let I=0,P=0;I<c;I++)p||d.indexOf(I)>=0?(a&&P++,w=`for(var j${I}: u32 = 0; j${I} < ${l[I]}; j${I}++) {
                  ${T[2].includes("last_index")?`let last_index = j${I};`:""}
                  ${b.indicesSet("input_indices",I,`j${I}`)}
                  ${w}
                }`):(g.push(`${b.indicesSet("input_indices",I,_.indicesGet("output_indices",P))};`),P++);return`

        ${y.registerUniform("output_size","u32").declareVariables(b,_)}

        ${y.mainStart()}
          ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${b.type.indices};
          let output_indices = ${_.offsetToIndices("global_idx")};

          ${g.join(`
`)}
          ${T[0]}       // init ops for reduce max/min
          ${T[1]}
          ${w}
          ${T[3]}
          ${T.length===4?_.setByOffset("global_idx","value"):T.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:i}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},...D(l,u)]})}},qu=(r,e)=>{let n=[];return r[1].dims[0]>0&&r[1].getBigInt64Array().forEach(t=>n.push(Number(t))),K({axes:n,keepDims:e.keepDims,noopWithEmptyAxes:e.noopWithEmptyAxes})},gn=(r,e,n,t)=>{let o=r.inputs,i=o.length===1?n:qu(o,n);r.compute(Di(e,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?jS:t,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},KS=(r,e)=>{mn(r.inputs),gn(r,"ReduceLogSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,"value = log(value);"])},XS=(r,e)=>{mn(r.inputs),gn(r,"ReduceL1",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${t.getByIndices("input_indices")});`,""])},ZS=(r,e)=>{mn(r.inputs),gn(r,"ReduceL2",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},JS=(r,e)=>{mn(r.inputs),gn(r,"ReduceLogSumExp",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${t.getByIndices("input_indices")});`,"value = log(value);"])},QS=(r,e)=>{mn(r.inputs),gn(r,"ReduceMax",e,(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(t.indicesSet("input_indices",s,0));return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = max(value, ${t.getByIndices("input_indices")});`,""]})},YS=(r,e)=>{mn(r.inputs),gn(r,"ReduceMean",e,(t,o,i)=>{let a=1;for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=r.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${a});`]})},e1=(r,e)=>{mn(r.inputs),gn(r,"ReduceMin",e,(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = min(value, ${t.getByIndices("input_indices")});`,""]})},t1=(r,e)=>{mn(r.inputs),gn(r,"ReduceProd",e,(t,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${t.getByIndices("input_indices")};`,""])},n1=(r,e)=>{mn(r.inputs),gn(r,"ReduceSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,""])},r1=(r,e)=>{mn(r.inputs),gn(r,"ReduceSumSquare",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += t * t;`,""])},bn=(r,e,n)=>{if(e.length===0)return n;let t=1,o=1;for(let i=0;i<e.length;i++)e.indexOf(i)===-1?t*=r[i]:o*=r[i];return o<32&&t>1024},dg=(r,e)=>{bn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?YS(r,e):eg(r,e)},pg=(r,e)=>{bn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?XS(r,e):tg(r,e)},fg=(r,e)=>{bn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?ZS(r,e):ng(r,e)},hg=(r,e)=>{bn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?JS(r,e):rg(r,e)},mg=(r,e)=>{bn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?QS(r,e):og(r,e)},gg=(r,e)=>{bn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?e1(r,e):ig(r,e)},bg=(r,e)=>{bn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?t1(r,e):ag(r,e)},yg=(r,e)=>{bn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?n1(r,e):sg(r,e)},_g=(r,e)=>{bn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?r1(r,e):ug(r,e)},xg=(r,e)=>{bn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?KS(r,e):lg(r,e)}});var Tg,vg,wg,ju,Ig=$(()=>{"use strict";j();Oe();Ci();Tg=r=>{if(!r||r.length===0||r.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(r[0].dataType!==1)throw new Error("Invalid input type.")},vg=(r,e)=>{Tg(r.inputs);let n=(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?"<=":"<"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};r.compute(Di("ArgMin",{hint:e.cacheKey,inputDependencies:["rank"]},[r.inputs[0]],n,[e.axis],7,e.keepDims),{inputs:[0]})},wg=(r,e)=>{Tg(r.inputs);let n=(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?">=":">"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};r.compute(Di("argMax",{hint:e.cacheKey,inputDependencies:["rank"]},[r.inputs[0]],n,[e.axis],7,e.keepDims),{inputs:[0]})},ju=r=>K(r)});var o1,Ku,i1,a1,s1,xr,u1,Sg,ki=$(()=>{"use strict";j();Q();Ai();ne();o1=(r,e)=>{let n=r[0],t=r[1],o=r[2],i=r[3],a=r[4],s=r[5];if(a&&s)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=n.dims[0],l=n.dims[1],c=n.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(t.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(t.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==t.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let d=o.dims[0]/3,p=d,f=p;if(e.qkvHiddenSizes.length>0){if(e.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let _ of e.qkvHiddenSizes)if(_%e.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");d=e.qkvHiddenSizes[0],p=e.qkvHiddenSizes[1],f=e.qkvHiddenSizes[2]}let h=l;if(d!==p)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==d+p+f)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let m=0;if(a){if(p!==f)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==e.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==p/e.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');e.pastPresentShareBuffer||(m=a.dims[3])}let y=h+m,g=-1,b=0;if(i)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(s){if(s.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(s.dims[0]!==u||s.dims[1]!==e.numHeads||s.dims[2]!==l||s.dims[3]!==y)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:m,kvSequenceLength:h,totalSequenceLength:y,maxSequenceLength:g,inputHiddenSize:c,hiddenSize:d,vHiddenSize:f,headSize:Math.floor(d/e.numHeads),vHeadSize:Math.floor(f/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:b,scale:e.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Ku=(r,e,n)=>e&&r?`
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
    `,i1=(r,e,n,t,o,i,a,s)=>{let u=pe(a?1:i),l=64,c=i/u;c<l&&(l=32);let d=Math.ceil(i/u/l),p=[{type:12,data:e},{type:12,data:n},{type:12,data:t},{type:12,data:o},{type:12,data:c},{type:12,data:d}],f=xe(r.dataType,u),h=Ve(1,u),m=["type"];a&&m.push("type"),s&&m.push("type");let y=g=>{let b=E("x",r.dataType,r.dims,u),_=[b],T=a?A("seq_lens",a.dataType,a.dims):void 0;T&&_.push(T);let w=s?A("total_sequence_length_input",s.dataType,s.dims):void 0;w&&_.push(w);let I=Ve(r.dataType),P=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${g.registerUniforms(P).declareVariables(..._)}
  ${g.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Ku(T,w,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${l}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${a?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${h}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${h}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${l}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${h}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${h}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${l}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${b.type.value}(${I}(1.0) / ${I}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${h}(x[offset + i]);
        x[offset + i] = ${b.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${b.type.value}(${I}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${l};${f};${u}`,inputDependencies:m},getShaderSource:y,getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(i/l),y:o,z:e*n},programUniforms:p})}},a1=(r,e,n,t,o,i,a,s,u)=>{let l=a+i.kvSequenceLength,c=[i.batchSize,i.numHeads,i.sequenceLength,l],d=r>1&&t,p=i.kvNumHeads?i.kvNumHeads:i.numHeads,f=d?[i.batchSize,p,l,i.headSize]:void 0,h=i.nReps?i.nReps:1,m=i.scale===0?1/Math.sqrt(i.headSize):i.scale,y=pe(i.headSize),g=i.headSize/y,b=12,_={x:Math.ceil(l/b),y:Math.ceil(i.sequenceLength/b),z:i.batchSize*i.numHeads},T=[{type:12,data:i.sequenceLength},{type:12,data:g},{type:12,data:l},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:m},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:h}],w=d&&t&&S.size(t.dims)>0,I=["type","type"];w&&I.push("type"),o&&I.push("type"),s&&I.push("type"),u&&I.push("type");let P=[{dims:c,dataType:e.dataType,gpuDataType:0}];d&&P.push({dims:f,dataType:e.dataType,gpuDataType:0});let O=C=>{let M=A("q",e.dataType,e.dims,y),V=A("key",n.dataType,n.dims,y),Y=[M,V];if(w){let Z=A("past_key",t.dataType,t.dims,y);Y.push(Z)}o&&Y.push(A("attention_bias",o.dataType,o.dims));let L=s?A("seq_lens",s.dataType,s.dims):void 0;L&&Y.push(L);let X=u?A("total_sequence_length_input",u.dataType,u.dims):void 0;X&&Y.push(X);let $e=E("output",e.dataType,c),U=[$e];d&&U.push(E("present_key",e.dataType,f,y));let te=Ve(1,y),ie=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${b}u;

  var<workgroup> tileQ: array<${M.type.storage}, ${b*b}>;
  var<workgroup> tileK: array<${M.type.storage}, ${b*b}>;
  ${C.registerUniforms(ie).declareVariables(...Y,...U)}
  ${C.mainStart([b,b,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${h===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${h===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Ku(L,X,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${w&&d?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${d?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${te}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${w&&d?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${d?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${te}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(y){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${y}`)}})()};
        output[outputIdx] = ${$e.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${y};${o!==void 0};${t!==void 0};${r}`,inputDependencies:I},getRunData:()=>({outputs:P,dispatchGroup:_,programUniforms:T}),getShaderSource:O}},s1=(r,e,n,t,o,i,a=void 0,s=void 0)=>{let u=i+o.kvSequenceLength,l=o.nReps?o.nReps:1,c=o.vHiddenSize*l,d=r>1&&t,p=o.kvNumHeads?o.kvNumHeads:o.numHeads,f=d?[o.batchSize,p,u,o.headSize]:void 0,h=[o.batchSize,o.sequenceLength,c],m=12,y={x:Math.ceil(o.vHeadSize/m),y:Math.ceil(o.sequenceLength/m),z:o.batchSize*o.numHeads},g=[{type:12,data:o.sequenceLength},{type:12,data:u},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:c},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:l}],b=d&&t&&S.size(t.dims)>0,_=["type","type"];b&&_.push("type"),a&&_.push("type"),s&&_.push("type");let T=[{dims:h,dataType:e.dataType,gpuDataType:0}];d&&T.push({dims:f,dataType:e.dataType,gpuDataType:0});let w=I=>{let P=A("probs",e.dataType,e.dims),O=A("v",n.dataType,n.dims),C=[P,O];b&&C.push(A("past_value",t.dataType,t.dims));let M=a?A("seq_lens",a.dataType,a.dims):void 0;a&&C.push(M);let V=s?A("total_sequence_length_input",s.dataType,s.dims):void 0;s&&C.push(V);let L=[E("output",e.dataType,h)];d&&L.push(E("present_value",e.dataType,f));let X=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${m}u;
  var<workgroup> tileQ: array<${P.type.value}, ${m*m}>;
  var<workgroup> tileV: array<${P.type.value}, ${m*m}>;
  ${I.registerUniforms(X).declareVariables(...C,...L)}
  ${I.mainStart([m,m,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${l===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${l===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Ku(M,V,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${b&&d?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${d?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${P.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${b&&d?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${d?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${t!==void 0};${r}`,inputDependencies:_},getRunData:()=>({outputs:T,dispatchGroup:y,programUniforms:g}),getShaderSource:w}},xr=(r,e,n,t,o,i,a,s,u,l,c=void 0,d=void 0)=>{let p=Math.min(r.outputCount,1+(a?1:0)+(s?1:0)),f=p>1?l.pastSequenceLength:0,h=f+l.kvSequenceLength,m=u&&S.size(u.dims)>0?u:void 0,y=[e,n];p>1&&a&&S.size(a.dims)>0&&y.push(a),m&&y.push(m),c&&y.push(c),d&&y.push(d);let g=r.compute(a1(p,e,n,a,m,l,f,c,d),{inputs:y,outputs:p>1?[-1,1]:[-1]})[0];r.compute(i1(g,l.batchSize,l.numHeads,f,l.sequenceLength,h,c,d),{inputs:c&&d?[g,c,d]:[g],outputs:[]});let b=[g,t];p>1&&s&&S.size(s.dims)>0&&b.push(s),c&&b.push(c),d&&b.push(d),r.compute(s1(p,g,t,s,l,f,c,d),{inputs:b,outputs:p>1?[0,2]:[0]})},u1=(r,e)=>{let n=[e.batchSize,e.numHeads,e.sequenceLength,e.headSize],t=e.sequenceLength,o=e.inputHiddenSize,i=e.headSize,a=12,s={x:Math.ceil(e.headSize/a),y:Math.ceil(e.sequenceLength/a),z:e.batchSize*e.numHeads},u=[r.inputs[0],r.inputs[1],r.inputs[2]],l=[{type:12,data:t},{type:12,data:o},{type:12,data:i},{type:12,data:e.numHeads},{type:12,data:e.headSize},{type:12,data:e.hiddenSize},{type:12,data:e.hiddenSize+e.hiddenSize+e.vHiddenSize}],c=d=>{let p=E("output_q",u[0].dataType,n),f=E("output_k",u[0].dataType,n),h=E("output_v",u[0].dataType,n),m=A("input",u[0].dataType,u[0].dims),y=A("weight",u[1].dataType,u[1].dims),g=A("bias",u[2].dataType,u[2].dims),b=m.type.storage,_=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${b}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${b}, ${a*a}>;
  var<workgroup> tileWeightK: array<${b}, ${a*a}>;
  var<workgroup> tileWeightV: array<${b}, ${a*a}>;
  ${d.registerUniforms(_).declareVariables(m,y,g,p,f,h)}
  ${d.mainStart([a,a,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${b}(0);
    var valueK = ${b}(0);
    var valueV = ${b}(0);
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
  }`};return r.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0}],dispatchGroup:s,programUniforms:l}),getShaderSource:c},{inputs:u,outputs:[-1,-1,-1]})},Sg=(r,e)=>{let n=o1(r.inputs,e),[t,o,i]=u1(r,n);return xr(r,t,o,i,r.inputs[4],void 0,void 0,void 0,r.inputs[5],n)}});var l1,c1,d1,$g,Ag=$(()=>{"use strict";qe();j();Q();Oe();ne();l1=(r,e)=>{if(!r||r.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(t,o,i)=>{let a=o.length;if(a!==t.length)throw new Error(`${i}: num dimensions != ${a}`);o.forEach((s,u)=>{if(s!==t[u])throw new Error(`${i}: dim[${u}] do not match`)})};if(r[0].dims.length>1){let t=e.format==="NHWC"?e.spatial?r[0].dims.slice(-1):r[0].dims.slice(-1).concat(r[0].dims.slice(1,r[0].dims.length-1)):r[0].dims.slice(1,e.spatial?2:void 0);n(r[1].dims,t,"Invalid input scale"),n(r[2].dims,t,"Invalid input B"),n(r[3].dims,t,"Invalid input mean"),n(r[4].dims,t,"Invalid input var")}else n(r[1].dims,[1],"Invalid input scale"),n(r[2].dims,[1],"Invalid input B"),n(r[3].dims,[1],"Invalid input mean"),n(r[4].dims,[1],"Invalid input var")},c1=(r,e)=>{let{epsilon:n,spatial:t,format:o}=e,i=r[0].dims,a=t?pe(i[i.length-1]):1,s=o==="NHWC"&&i.length>1?a:1,u=S.size(i)/a,l=t,c=l?i.length:i,d=A("x",r[0].dataType,r[0].dims,a),p=A("scale",r[1].dataType,r[1].dims,s),f=A("bias",r[2].dataType,r[2].dims,s),h=A("inputMean",r[3].dataType,r[3].dims,s),m=A("inputVar",r[4].dataType,r[4].dims,s),y=E("y",r[0].dataType,c,a),g=()=>{let _="";if(t)_=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${a}`:"outputIndices[1]"};`;else if(o==="NCHW")_=`
            ${y.indicesSet("outputIndices","0","0")}
            let cOffset = ${y.indicesToOffset("outputIndices")};`;else{_=`var cIndices = ${p.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let T=1;T<p.rank;T++)_+=`cIndices[${T}] = outputIndices[${T}];`;_+=`let cOffset = ${p.indicesToOffset("cIndices")};`}return _},b=_=>`
  const epsilon = ${n};
  ${_.registerUniform("outputSize","u32").declareVariables(d,p,f,h,m,y)}
  ${_.mainStart()}
  ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${y.offsetToIndices(`global_idx * ${a}`)};
    ${g()}
    let scale = ${p.getByOffset("cOffset")};
    let bias = ${f.getByOffset("cOffset")};
    let inputMean = ${h.getByOffset("cOffset")};
    let inputVar = ${m.getByOffset("cOffset")};
    let x = ${d.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${y.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${e.epsilon}_${e.format}_${t}_${a}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:b,getRunData:()=>({outputs:[{dims:r[0].dims,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l?[{type:12,data:u},...D(i)]:[{type:12,data:u}]})}},d1=r=>K(r),$g=(r,e)=>{let{inputs:n,outputCount:t}=r,o=d1({...e,outputCount:t});if(J.webgpu.validateInputContent&&l1(n,o),e.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");r.compute(c1(n,o))}});var p1,f1,Pg,Og=$(()=>{"use strict";Q();ne();p1=r=>{if(r[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(r[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(r[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(r[0].dims[2]!==r[1].dims[0])throw new Error("last dimension of input and bias are not the same")},f1=r=>{let e=r[0].dims,n=r[0].dims[2],t=S.size(e)/4,o=r[0].dataType,i=A("input",o,e,4),a=A("bias",o,[n],4),s=A("residual",o,e,4),u=E("output",o,e,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:e,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)}}),getShaderSource:c=>`
  const channels = ${n}u / 4;
  ${c.declareVariables(i,a,s,u)}

  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes(t)}
    let value = ${i.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${s.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},Pg=r=>{p1(r.inputs),r.compute(f1(r.inputs))}});var h1,me,Eg,Cg,Dg,kg,Lg,zg,Rg,Ng,Mg,m1,Bg,Vg,Fg,Gg,Jr,Ug,Li,Wg,Hg,qg,jg,Kg,Xg,Zg,Jg,Qg,Yg,eb,tb,nb,rb,ob,ib,ab,sb,Xu,Zu,ub,lb,cb,g1,b1,db,zi=$(()=>{"use strict";j();Q();Oe();ne();h1=(r,e,n,t,o,i,a)=>{let s=Math.ceil(e/4),u="";typeof o=="string"?u=`${o}(a)`:u=o("a");let l=A("inputData",n,[s],4),c=E("outputData",t,[s],4),d=[{name:"vec_size",type:"u32"}];return a&&d.push(...a),`
      ${r.registerUniforms(d).declareVariables(l,c)}

  ${i??""}

  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",u)}
  }`},me=(r,e,n,t,o,i=r.dataType,a,s)=>{let u=[{type:12,data:Math.ceil(S.size(r.dims)/4)}];return a&&u.push(...a),{name:e,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:l=>h1(l,S.size(r.dims),r.dataType,i,n,t,s),getRunData:l=>({outputs:[{dims:r.dims,dataType:i}],dispatchGroup:{x:Math.ceil(S.size(l[0].dims)/64/4)},programUniforms:u})}},Eg=r=>{r.compute(me(r.inputs[0],"Abs","abs"))},Cg=r=>{r.compute(me(r.inputs[0],"Acos","acos"))},Dg=r=>{r.compute(me(r.inputs[0],"Acosh","acosh"))},kg=r=>{r.compute(me(r.inputs[0],"Asin","asin"))},Lg=r=>{r.compute(me(r.inputs[0],"Asinh","asinh"))},zg=r=>{r.compute(me(r.inputs[0],"Atan","atan"))},Rg=r=>{r.compute(me(r.inputs[0],"Atanh","atanh"))},Ng=r=>K(r),Mg=(r,e)=>{let n;switch(e.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${e.to}`)}r.compute(me(r.inputs[0],"Cast",n,void 0,e.cacheKey,e.to))},m1=r=>{let e,n,t=r.length>=2&&r[1].data!==0,o=r.length>=3&&r[2].data!==0;switch(r[0].dataType){case 1:e=t?r[1].getFloat32Array()[0]:-34028234663852886e22,n=o?r[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:e=t?r[1].getUint16Array()[0]:64511,n=o?r[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return K({min:e,max:n})},Bg=(r,e)=>{let n=e||m1(r.inputs),t=Ve(r.inputs[0].dataType);r.compute(me(r.inputs[0],"Clip",o=>`clamp(${o}, vec4<${t}>(uniforms.min), vec4<${t}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:r.inputs[0].dataType,data:n.min},{type:r.inputs[0].dataType,data:n.max}],[{name:"min",type:t},{name:"max",type:t}]),{inputs:[0]})},Vg=r=>{r.compute(me(r.inputs[0],"Ceil","ceil"))},Fg=r=>{r.compute(me(r.inputs[0],"Cos","cos"))},Gg=r=>{r.compute(me(r.inputs[0],"Cosh","cosh"))},Jr=r=>K(r),Ug=(r,e)=>{let n=Ve(r.inputs[0].dataType);r.compute(me(r.inputs[0],"Elu",t=>`elu_vf32(${t})`,`
  const elu_alpha_ = ${n}(${e.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,e.cacheKey))},Li=(r="f32")=>`
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
}`,Wg=r=>{let e=Ve(r.inputs[0].dataType);r.compute(me(r.inputs[0],"Erf",n=>`erf_vf32(${n})`,Li(e)))},Hg=r=>{r.compute(me(r.inputs[0],"Exp","exp"))},qg=r=>{r.compute(me(r.inputs[0],"Floor","floor"))},jg=r=>{let e=Ve(r.inputs[0].dataType);r.compute(me(r.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,Li(e)))},Kg=(r,e)=>{let n=Ve(r.inputs[0].dataType);r.compute(me(r.inputs[0],"LeakyRelu",t=>`select(leaky_relu_alpha_ * ${t}, ${t}, ${t} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${e.alpha});`,e.cacheKey))},Xg=r=>{r.compute(me(r.inputs[0],"Not",e=>`!${e}`))},Zg=r=>{r.compute(me(r.inputs[0],"Neg",e=>`-${e}`))},Jg=r=>{r.compute(me(r.inputs[0],"Reciprocal",e=>`1.0/${e}`))},Qg=r=>{let e=Ve(r.inputs[0].dataType);r.compute(me(r.inputs[0],"Relu",n=>`select(vec4<${e}>(0.0), ${n}, ${n} > vec4<${e}>(0.0))`))},Yg=r=>{r.compute(me(r.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},eb=r=>K(r),tb=(r,e)=>{let n=Ve(r.inputs[0].dataType);r.compute(me(r.inputs[0],"HardSigmoid",t=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${e.alpha} * ${t} + vec4<${n}>(${e.beta})))`,void 0,e.cacheKey))},nb=r=>{r.compute(me(r.inputs[0],"Sin","sin"))},rb=r=>{r.compute(me(r.inputs[0],"Sinh","sinh"))},ob=r=>{r.compute(me(r.inputs[0],"Sqrt","sqrt"))},ib=r=>{r.compute(me(r.inputs[0],"Tan","tan"))},ab=r=>`sign(${r}) * (1 - exp(-2 * abs(${r}))) / (1 + exp(-2 * abs(${r})))`,sb=r=>{r.compute(me(r.inputs[0],"Tanh",ab))},Xu=(r="f32")=>`
const fast_gelu_a: ${r} = 0.5;
const fast_gelu_b: ${r} = 0.7978845608028654;
const fast_gelu_c: ${r} = 0.035677408136300125;

fn tanh_v(v: vec4<${r}>) -> vec4<${r}> {
  return ${ab("v")};
}
`,Zu=r=>`(fast_gelu_a + fast_gelu_a * tanh_v(${r} * (fast_gelu_c * ${r} * ${r} + fast_gelu_b))) * ${r}`,ub=r=>{let e=Ve(r.inputs[0].dataType);r.compute(me(r.inputs[0],"FastGelu",Zu,Xu(e),void 0,r.inputs[0].dataType))},lb=(r,e)=>{let n=Ve(r.inputs[0].dataType);return r.compute(me(r.inputs[0],"ThresholdedRelu",t=>`select(vec4<${n}>(0.0), ${t}, ${t} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${e.alpha});`,e.cacheKey)),0},cb=r=>{r.compute(me(r.inputs[0],"Log","log"))},g1=(r,e)=>`
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
`,b1=r=>`quick_gelu_impl(${r})`,db=(r,e)=>{let n=Ve(r.inputs[0].dataType);r.compute(me(r.inputs[0],"QuickGelu",b1,g1(n,e.alpha),e.cacheKey,r.inputs[0].dataType))}});var y1,_1,fb,hb=$(()=>{"use strict";Q();ne();zi();y1=r=>{if(r[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(r[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(r[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(r[0].dims[2]!==r[1].dims[0])throw new Error("last dimension of input and bias are not the same")},_1=r=>{let e=r[0].dims.slice();e[2]=e[2]/2;let n=A("input",r[0].dataType,r[0].dims,4),t=A("bias",r[0].dataType,[r[0].dims[2]],4),o=E("output",r[0].dataType,e,4),i=S.size(e)/4,a=xe(r[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:e,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${r[0].dims[2]/4/2}u;

  ${u.declareVariables(n,t,o)}

  ${Li(a)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},fb=r=>{y1(r.inputs),r.compute(_1(r.inputs))}});var x1,T1,yn,mb,gb,bb,yb,_b,xb,Tb,vb,wb,Ib,Sb=$(()=>{"use strict";j();Q();ne();x1=(r,e,n,t,o,i,a,s,u,l,c,d)=>{let p,f;typeof s=="string"?p=f=(b,_)=>`${s}((${b}),(${_}))`:typeof s=="function"?p=f=s:(p=s.scalar,f=s.vector);let h=E("outputData",c,t.length,4),m=A("aData",u,e.length,4),y=A("bData",l,n.length,4),g;if(o)if(i){let b=S.size(e)===1,_=S.size(n)===1,T=e.length>0&&e[e.length-1]%4===0,w=n.length>0&&n[n.length-1]%4===0;b||_?g=h.setByOffset("global_idx",f(b?`${m.type.value}(${m.getByOffset("0")}.x)`:m.getByOffset("global_idx"),_?`${y.type.value}(${y.getByOffset("0")}.x)`:y.getByOffset("global_idx"))):g=`
            let outputIndices = ${h.offsetToIndices("global_idx * 4u")};
            let offsetA = ${m.broadcastedIndicesToOffset("outputIndices",h)};
            let offsetB = ${y.broadcastedIndicesToOffset("outputIndices",h)};
            ${h.setByOffset("global_idx",f(a||T?m.getByOffset("offsetA / 4u"):`${m.type.value}(${m.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||w?y.getByOffset("offsetB / 4u"):`${y.type.value}(${y.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else g=h.setByOffset("global_idx",f(m.getByOffset("global_idx"),y.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let b=(_,T,w="")=>{let I=`aData[indexA${T}][componentA${T}]`,P=`bData[indexB${T}][componentB${T}]`;return`
            let outputIndices${T} = ${h.offsetToIndices(`global_idx * 4u + ${T}u`)};
            let offsetA${T} = ${m.broadcastedIndicesToOffset(`outputIndices${T}`,h)};
            let offsetB${T} = ${y.broadcastedIndicesToOffset(`outputIndices${T}`,h)};
            let indexA${T} = offsetA${T} / 4u;
            let indexB${T} = offsetB${T} / 4u;
            let componentA${T} = offsetA${T} % 4u;
            let componentB${T} = offsetB${T} % 4u;
            ${_}[${T}] = ${w}(${p(I,P)});
          `};c===9?g=`
            var data = vec4<u32>(0);
            ${b("data",0,"u32")}
            ${b("data",1,"u32")}
            ${b("data",2,"u32")}
            ${b("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:g=`
            ${b("outputData[global_idx]",0)}
            ${b("outputData[global_idx]",1)}
            ${b("outputData[global_idx]",2)}
            ${b("outputData[global_idx]",3)}
          `}return`
        ${r.registerUniform("vec_size","u32").declareVariables(m,y,h)}

        ${d??""}

        ${r.mainStart()}
        ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${g}
      }`},T1=(r,e,n,t,o,i,a=n.dataType)=>{let s=n.dims.map(m=>Number(m)??1),u=t.dims.map(m=>Number(m)??1),l=!S.areEqual(s,u),c=s,d=S.size(s),p=!1,f=!1,h=[l];if(l){let m=fn.calcShape(s,u,!1);if(!m)throw new Error("Can't perform binary op on the given tensors");c=m.slice(),d=S.size(c);let y=S.size(s)===1,g=S.size(u)===1,b=s.length>0&&s[s.length-1]%4===0,_=u.length>0&&u[u.length-1]%4===0;h.push(y),h.push(g),h.push(b),h.push(_);let T=1;for(let w=1;w<c.length;w++){let I=s[s.length-w],P=u[u.length-w];if(I===P)T*=I;else break}T%4===0?(f=!0,p=!0):(y||g||b||_)&&(p=!0)}else p=!0;return h.push(p),{name:r,shaderCache:{hint:e+h.map(m=>m.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:m=>x1(m,s,u,c,p,l,f,o,n.dataType,t.dataType,a,i),getRunData:()=>({outputs:[{dims:c,dataType:a}],dispatchGroup:{x:Math.ceil(d/64/4)},programUniforms:[{type:12,data:Math.ceil(S.size(c)/4)},...D(s,u,c)]})}},yn=(r,e,n,t,o,i)=>{r.compute(T1(e,o??"",r.inputs[0],r.inputs[1],n,t,i))},mb=r=>{yn(r,"Add",(e,n)=>`${e}+${n}`)},gb=r=>{yn(r,"Div",(e,n)=>`${e}/${n}`)},bb=r=>{yn(r,"Equal",{scalar:(e,n)=>`u32(${e}==${n})`,vector:(e,n)=>`vec4<u32>(${e}==${n})`},void 0,void 0,9)},yb=r=>{yn(r,"Mul",(e,n)=>`${e}*${n}`)},_b=r=>{let e=A("input",r.inputs[0].dataType,r.inputs[0].dims).type.value;yn(r,"Pow",{scalar:(t,o)=>`pow_custom(${t},${o})`,vector:(t,o)=>`pow_vector_custom(${t},${o})`},`
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
      `)},xb=r=>{yn(r,"Sub",(e,n)=>`${e}-${n}`)},Tb=r=>{yn(r,"Greater",{scalar:(e,n)=>`u32(${e}>${n})`,vector:(e,n)=>`vec4<u32>(${e}>${n})`},void 0,void 0,9)},vb=r=>{yn(r,"Less",{scalar:(e,n)=>`u32(${e}<${n})`,vector:(e,n)=>`vec4<u32>(${e}<${n})`},void 0,void 0,9)},wb=r=>{yn(r,"GreaterOrEqual",{scalar:(e,n)=>`u32(${e}>=${n})`,vector:(e,n)=>`vec4<u32>(${e}>=${n})`},void 0,void 0,9)},Ib=r=>{yn(r,"LessOrEqual",{scalar:(e,n)=>`u32(${e}<=${n})`,vector:(e,n)=>`vec4<u32>(${e}<=${n})`},void 0,void 0,9)}});var w1,I1,S1,$1,$b,Ab,Pb=$(()=>{"use strict";j();Q();Oe();ne();w1=(r,e)=>{if(!r||r.length<1)throw new Error("too few inputs");let n=0,t=r[n],o=t.dataType,i=t.dims.length;r.forEach((a,s)=>{if(s!==n){if(a.dataType!==o)throw new Error("input tensors should be one type");if(a.dims.length!==i)throw new Error("input tensors should have the same shape");a.dims.forEach((u,l)=>{if(l!==e&&u!==t.dims[l])throw new Error("non concat dimensions must match")})}})},I1=(r,e)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${r}u>(${e});
    for (var i: u32 = 0u; i < ${r}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${r}u;
  }`,S1=(r,e)=>{let n=r.length,t=[];for(let o=0;o<n;++o){let i=e.setByOffset("global_idx",r[o].getByIndices("indices"));n===1?t.push(i):o===0?t.push(`if (inputIndex == ${o}u) { ${i} }`):o===n-1?t.push(`else { ${i} }`):t.push(`else if (inputIndex == ${o}) { ${i} }`)}return t.join(`
`)},$1=(r,e,n,t)=>{let o=S.size(n),i=new Array(r.length),a=new Array(r.length),s=0,u=[],l=[],c=[{type:12,data:o}];for(let m=0;m<r.length;++m)s+=r[m].dims[e],i[m]=s,l.push(r[m].dims.length),a[m]=A(`input${m}`,t,l[m]),u.push("rank"),c.push({type:12,data:i[m]});for(let m=0;m<r.length;++m)c.push(...D(r[m].dims));c.push(...D(n));let d=E("output",t,n.length),p=d.indicesGet("indices",e),f=Array.from(Array(i.length).keys()).map(m=>`uniforms.sizeInConcatAxis${m}`).join(","),h=m=>`

  ${(()=>{m.registerUniform("outputSize","u32");for(let y=0;y<r.length;y++)m.registerUniform(`sizeInConcatAxis${y}`,"u32");return m.declareVariables(...a,d)})()}

  ${I1(i.length,f)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${d.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${p});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${f});
      ${p} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${S1(a,d)}
  }`;return{name:"Concat",shaderCache:{hint:`${e}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:c}),getShaderSource:h}},$b=(r,e)=>{let n=r.inputs,t=n[0].dims,o=S.normalizeAxis(e.axis,t.length);w1(n,o);let i=t.slice();i[o]=n.reduce((s,u)=>s+(u.dims.length>o?u.dims[o]:0),0);let a=n.filter(s=>S.size(s.dims)>0);r.compute($1(a,o,i,n[0].dataType),{inputs:a})},Ab=r=>K({axis:r.axis})});var St,$t,At,Ri,Rn=$(()=>{"use strict";j();Q();St=(r,e,n="f32")=>{switch(r.activation){case"Relu":return`value = max(value, ${e}(0.0));`;case"Sigmoid":return`value = (${e}(1.0) / (${e}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${e}(${n}(uniforms.clip_min)), ${e}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${e}(0.0), min(${e}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${e}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${r.activation}`)}},$t=(r,e)=>{r.activation==="Clip"?e.push({type:1,data:r.clipMax},{type:1,data:r.clipMin}):r.activation==="HardSigmoid"?e.push({type:1,data:r.alpha},{type:1,data:r.beta}):r.activation==="LeakyRelu"&&e.push({type:1,data:r.alpha})},At=(r,e)=>{r.activation==="Clip"?e.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):r.activation==="HardSigmoid"?e.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):r.activation==="LeakyRelu"&&e.push({name:"alpha",type:"f32"})},Ri=r=>{let e=r?.activation||"";if(e==="HardSigmoid"){let[n,t]=r?.activation_params||[.2,.5];return{activation:e,alpha:n,beta:t}}else if(e==="Clip"){let[n,t]=r?.activation_params||[jm,Km];return{activation:e,clipMax:t,clipMin:n}}else if(e==="LeakyRelu"){let[n]=r?.activation_params||[.01];return{activation:e,alpha:n}}return{activation:e}}});var Ne,Ob,Ni=$(()=>{"use strict";Ne=(r,e)=>{switch(r){case 1:return e;case 2:return`vec2<${e}>`;case 3:return`vec3<${e}>`;case 4:return`vec4<${e}>`;default:throw new Error(`${r}-component is not supported.`)}},Ob=r=>`
      ${r?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Eb,Cb=$(()=>{"use strict";Eb=r=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${r}.x), i32(${r}.y), i32(${r}.z), 1));
}
`});var Qr,Mi,Bi=$(()=>{"use strict";j();Q();ne();Rn();Qr=(r,e,n,t,o)=>{let i=t-n;return`
      ${Array.from({length:n}).map((a,s)=>`
      if (${B(e.shape,s,e.rank)} != 1) {
        ${e.indicesSet(r,s,B(o,s+i,t))}
      } else {
        ${e.indicesSet(r,s,0)}
      }`).join("")}
`},Mi=(r,e,n,t,o=!1,i)=>{let a=r[0].dims,s=r[1].dims,u=a[a.length-2],l=s[s.length-1],c=a[a.length-1],d=pe(l),p=pe(c),f=pe(u),h=S.size(n)/d/f,m=r.length>2,y=t?t.slice(0,-2):n.slice(0,-2),b=[S.size(y),u,l],_=[{type:12,data:h},{type:12,data:u},{type:12,data:l},{type:12,data:c}];$t(e,_),_.push(...D(y,a,s)),m&&_.push(...D(r[2].dims)),_.push(...D(b));let T=w=>{let I=Ei("batch_dims",r[0].dataType,y.length),P=A("a",r[0].dataType,a.length,p),O=A("b",r[1].dataType,s.length,d),C=E("output",r[0].dataType,b.length,d),M=xe(C.type.tensor),V=St(e,C.type.value,M),Y=[P,O],L="";if(m){let U=o?d:1;Y.push(A("bias",r[2].dataType,r[2].dims.length,U)),L=`${o?`value += bias[col / ${U}];`:`value += ${C.type.value}(bias[row + i]);`}`}let X=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];At(e,X);let $e=()=>{let U=`var a_data: ${P.type.value};`;for(let te=0;te<p;te++)U+=`
              let b_data${te} = b[(b_offset + (k + ${te}) * uniforms.N + col) / ${d}];`;for(let te=0;te<f;te++){U+=`a_data = a[(a_offset + (row + ${te}) * uniforms.K + k) / ${p}];`;for(let ie=0;ie<p;ie++)U+=`
            values[${te}] = fma(${O.type.value}(a_data${p===1?"":`[${ie}]`}), b_data${ie}, values[${te}]);
`}return U};return`
  ${w.registerUniforms(X).registerInternalVariables(I).declareVariables(...Y,C)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${d})) * ${d};
    var index1 = global_idx / (uniforms.N / ${d});
    let stride1 = uniforms.M / ${f};
    let row = (index1 % stride1) * ${f};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${I.offsetToIndices("batch")};`}

    var a_indices: ${P.type.indices};
    ${Qr("a_indices",P,P.rank-2,I.rank,"batch_indices")}
    ${P.indicesSet("a_indices",P.rank-2,0)}
    ${P.indicesSet("a_indices",P.rank-1,0)}
    let a_offset = ${P.indicesToOffset("a_indices")};

    var b_indices: ${O.type.indices};
    ${Qr("b_indices",O,O.rank-2,I.rank,"batch_indices")}
    ${O.indicesSet("b_indices",O.rank-2,0)}
    ${O.indicesSet("b_indices",O.rank-1,0)}
    let b_offset = ${O.indicesToOffset("b_indices")};
    var values: array<${C.type.value}, ${f}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${p}) {
      ${$e()}
    }
    for (var i = 0u; i < ${f}u; i++) {
      var value = values[i];
      ${L}
      ${V}
      let cur_indices = ${C.type.indices}(batch, row + i, col);
      let offset = ${C.indicesToOffset("cur_indices")};
      ${C.setByOffset(`offset / ${d}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${e.activation};${d};${p};${f};${o}`,inputDependencies:m?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:_}),getShaderSource:T}}});var A1,P1,Ju,Db,O1,Qu,E1,Yr,Vi=$(()=>{"use strict";j();Q();ne();Rn();Bi();Ni();A1=(r,e)=>r?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${e?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${e?", batchIndices":""});
        `,P1=(r,e)=>r?`
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
        }`,Ju=(r,e,n="f32",t,o=!1,i=32,a=!1,s=32)=>{let u=e[1]*r[1],l=e[0]*r[0],c=o?u:i,d=o?i:u,p=c/e[0],f=i/e[1];if(!((o&&p===4&&r[1]===4||!o&&(p===3||p===4))&&c%e[0]===0&&i%e[1]===0&&r[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${p} and workPerThread[1] ${r[1]} must be 4.
      Otherwise, innerElementSize ${p} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${e[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${e[1]}. colPerThread ${r[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${p}<${n}>, ${c/p}>, ${d}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${l/r[0]}>, ${i}>;

const rowPerThread = ${r[1]};
const colPerThread = ${r[0]};
const innerElementSize = ${p};
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
  let tileRowB = localRow * ${f};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${A1(o,t)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
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
          ${p===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${P1(o,p)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Db=(r,e)=>r?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${e?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${e?", batchIndices":""});
            `,O1=r=>r?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Qu=(r,e,n="f32",t,o=!1,i=32,a=!1,s=32,u=!1)=>{let l=r[1]*e[1],c=r[0]*e[0],d=o?l:i,p=o?i:l;if(!(p%e[1]===0&&d%e[0]===0&&i%e[1]===0))throw new Error(`tileAHight ${p} must be divisible by workgroupSize[1]${e[1]}, tileAWidth ${d} must be divisible by workgroupSize[0]${e[0]}, tileInner ${i} must be divisible by workgroupSize[1]${e[1]}`);let f=p/e[1],h=d/e[0],m=i/e[1],y=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${p}; inputRow = inputRow + ${e[1]}) {
        for (var inputCol = localCol; inputCol < ${d}; inputCol = inputCol + ${e[0]}) {
          ${Db(o,t)}
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

let tileRowA = i32(localId.y) * ${f};
let tileColA = i32(localId.x) * ${h};
let tileRowB = i32(localId.y) * ${m};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${h}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Db(o,t)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${m}; innerRow = innerRow + 1) {
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
      ${O1(o)}
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
  var<workgroup> mm_Asub : array<array<${n}, ${d}>, ${p}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${c}>, ${i}>;
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
    ${y}
  }
`},E1=(r,e,n,t,o=!1)=>{let[i,a,s,u]=t,l=xe(t[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Ne(r,l)} {
      var value = ${Ne(r,l)}(0.0);
      let col = colIn * ${r};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${Qr("aIndices",a,a.rank-2,i.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Ne(r,l)} {
      var value = ${Ne(r,l)}(0.0);
      let col = colIn * ${r};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${s.type.indices};
        ${Qr("bIndices",s,s.rank-2,i.rank,"batchIndices")}
        ${s.indicesSet("bIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("bIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ne(r,l)}) {
      let col = colIn * ${r};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${e?`value = value + ${o?"bias[colIn]":`${Ne(r,l)}(bias[row])`};`:""}
        ${n}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Yr=(r,e,n,t,o=!1,i)=>{let a=r[0].dims,s=r[1].dims,u=a.slice(0,-2),l=s.slice(0,-2),c=t?t.slice(0,-2):n.slice(0,-2),d=S.size(c),p=a[a.length-2],f=a[a.length-1],h=s[s.length-1],m=f%4===0&&h%4===0,y=p<=8?[4,1,1]:[4,4,1],g=[8,8,1],b=[Math.ceil(h/g[0]/y[0]),Math.ceil(p/g[1]/y[1]),Math.ceil(d/g[2]/y[2])],_=m?4:1,T=[...u,p,f/_],w=T.length,I=[...l,f,h/_],P=I.length,O=[d,p,h/_],C=[{type:6,data:p},{type:6,data:h},{type:6,data:f}];$t(e,C),C.push(...D(c,T,I));let M=["rank","rank"],V=r.length>2;V&&(C.push(...D(r[2].dims)),M.push("rank")),C.push(...D(O));let Y=L=>{let X=c.length,$e=Ei("batchDims",r[0].dataType,X,1),U=xe(r[0].dataType),te=A("a",r[0].dataType,w,_),ie=A("b",r[1].dataType,P,_),Z=E("result",r[0].dataType,O.length,_),ve=[te,ie];if(V){let W=o?_:1;ve.push(A("bias",r[2].dataType,r[2].dims.length,W))}let ot=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];At(e,ot);let De=xe(Z.type.tensor),de=St(e,Z.type.value,De),z=E1(_,V,de,[$e,te,ie,Z],o);return`
  ${L.registerUniforms(ot).registerInternalVariables($e).declareVariables(...ve,Z)}
  ${z}
  ${m?Ju(y,g,U,$e):Qu(y,g,U,$e)}
                   `};return{name:"MatMul",shaderCache:{hint:`${y};${e.activation};${m};${o}`,inputDependencies:M},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:r[0].dataType}],dispatchGroup:{x:b[0],y:b[1],z:b[2]},programUniforms:C}),getShaderSource:Y}}});var C1,kb,Lb=$(()=>{"use strict";j();pn();ne();Rn();Ni();Cb();Vi();C1=(r,e,n,t,o=!1,i,a=4,s=4,u=4,l="f32")=>{let c=M=>{switch(M){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${M} is not supported.`)}},d=M=>{switch(M){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${M} is not supported.`)}},p=r?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,f=r?`
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
    `,h=r?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",m=r?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",y=r?"row":"col",g=r?"col":"row",b=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${r?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${y} / outWidth;
    let outCol = ${y} % outWidth;

    let WRow = ${g} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${g} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${g} % inChannels;
    var resData = ${Ne(a,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${h} && xCol >= 0 && xCol < ${m}) {
      ${p}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(a)}
    }
    return resData;`,_=r?e&&t?`
    let col = colIn * ${a};
    ${b}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${b}
    }
    return ${Ne(a,l)}(0.0);`:t&&n?`
    let col = colIn * ${a};
    ${b}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${b}
    }
    return ${Ne(a,l)}(0.0);`,T=r?t&&n?d(s):`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${d(s)}
    }
    return ${Ne(s,l)}(0.0);`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${d(s)}
    }
    return ${Ne(s,l)}(0.0);`,w=Ne(u,l),I=r?Ne(a,l):Ne(s,l),P=r?Ne(s,l):Ne(a,l),O=St(i,w,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${I} {
      ${r?_:T}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${P} {
      ${r?T:_}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${w}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${r?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${f}
      ${Ob(o)}
      ${O}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},kb=(r,e,n,t,o,i,a,s,u)=>{let l=e.format==="NHWC",c=l?r[0].dims[3]:r[0].dims[1],d=n[0],p=l?n[2]:n[3],f=l?n[1]:n[2],h=l?n[3]:n[1],m=l&&(c%4===0||c%3===0)&&h%4===0,y=l?h:p*f,g=l?p*f:h,b=[8,8,1],_=t<=8?[4,1,1]:[4,4,1],T=[Math.ceil(y/b[0]/_[0]),Math.ceil(g/b[1]/_[1]),Math.ceil(d/b[2]/_[2])];oe("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${T}`);let w=m?l&&c%4!==0?3:4:1,I=b[1]*_[1],P=b[0]*_[0],O=Math.max(b[0]*w,b[1]),C=t%I===0,M=o%P===0,V=i%O===0,Y=m?[w,4,4]:[1,1,1],L=[{type:6,data:t},{type:6,data:o},{type:6,data:i},{type:6,data:[e.pads[0],e.pads[1]]},{type:6,data:e.strides},{type:6,data:e.dilations}];$t(e,L),L.push(...D(r[0].dims,r[1].dims));let X=["rank","rank"];a&&(L.push(...D(r[2].dims)),X.push("rank")),L.push(...D(n));let $e=U=>{let te=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];At(e,te);let ie=m?4:1,Z=xe(r[0].dataType),ve=`
      fn setOutputAtIndex(flatIndex : i32, value : ${m?`vec4<${Z}>`:Z}) {
        result[flatIndex] = ${m?`vec4<${Z}>`:Z}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${m?`vec4<${Z}>`:Z}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${m?"/ 4":""}, value);
      }`,ot=A("x",r[0].dataType,r[0].dims.length,w===3?1:w),De=A("w",r[1].dataType,r[1].dims.length,ie),de=[ot,De],z=E("result",r[0].dataType,n.length,ie);if(a){let W=A("bias",r[2].dataType,r[2].dims.length,ie);de.push(W),ve+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${m?`vec4<${Z}>`:Z} {
          return bias[coords.${l?"w":"y"}${m?"/ 4":""}];
        }`}return`
        ${Eb("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${U.registerUniforms(te).declareVariables(...de,z)}
        ${ve}
        ${C1(l,C,M,V,a,e,Y[0],Y[1],Y[2],Z)}
        ${m?Ju(_,b,Z,void 0,!l,O):Qu(_,b,Z,void 0,!l,O,!1,void 0,s)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${e.cacheKey};${w};${m};${C};${M};${V};${I};${P};${O}`,inputDependencies:X},getRunData:()=>({outputs:[{dims:u?u(n):n,dataType:r[0].dataType}],dispatchGroup:{x:T[0],y:T[1],z:T[2]},programUniforms:L}),getShaderSource:$e}}});var D1,zb,Fi,k1,Rb,L1,Nb,Mb,Bb=$(()=>{"use strict";j();pn();Q();ne();Rn();Ni();D1=r=>{let e=1;for(let n=0;n<r.length;n++)e*=r[n];return e},zb=r=>typeof r=="number"?[r,r,r]:r,Fi=(r,e)=>e<=1?r:r+(r-1)*(e-1),k1=(r,e,n,t=1)=>{let o=Fi(e,t);return Math.floor((r[0]*(n-1)-n+o)/2)},Rb=(r,e,n,t,o)=>{o==null&&(o=k1(r,e[0],t[0]));let i=[0,0,0,n];for(let a=0;a<3;a++)r[a]+2*o>=e[a]&&(i[a]=Math.trunc((r[a]-e[a]+2*o)/t[a]+1));return i},L1=(r,e,n,t,o,i,a,s,u,l)=>{let c,d,p,f;if(r==="VALID"&&(r=0),typeof r=="number"){c={top:r,bottom:r,left:r,right:r,front:r,back:r};let h=Rb([e,n,t,1],[s,u,l],1,[o,i,a],r);d=h[0],p=h[1],f=h[2]}else if(Array.isArray(r)){if(!r.every((m,y,g)=>m===g[0]))throw Error(`Unsupported padding parameter: ${r}`);c={top:r[0],bottom:r[1],left:r[2],right:r[3],front:r[4],back:r[5]};let h=Rb([e,n,t,1],[s,u,l],1,[o,i,a],r[0]);d=h[0],p=h[1],f=h[2]}else if(r==="SAME_UPPER"){d=Math.ceil(e/o),p=Math.ceil(n/i),f=Math.ceil(t/a);let h=(d-1)*o+s-e,m=(p-1)*i+u-n,y=(f-1)*a+l-t,g=Math.floor(h/2),b=h-g,_=Math.floor(m/2),T=m-_,w=Math.floor(y/2),I=y-w;c={top:_,bottom:T,left:w,right:I,front:g,back:b}}else throw Error(`Unknown padding parameter: ${r}`);return{padInfo:c,outDepth:d,outHeight:p,outWidth:f}},Nb=(r,e,n,t,o,i=!1,a="channelsLast")=>{let s,u,l,c,d;if(a==="channelsLast")[s,u,l,c,d]=r;else if(a==="channelsFirst")[s,d,u,l,c]=r;else throw new Error(`Unknown dataFormat ${a}`);let[p,,f,h,m]=e,[y,g,b]=zb(n),[_,T,w]=zb(t),I=Fi(f,_),P=Fi(h,T),O=Fi(m,w),{padInfo:C,outDepth:M,outHeight:V,outWidth:Y}=L1(o,u,l,c,y,g,b,I,P,O),L=i?p*d:p,X=[0,0,0,0,0];return a==="channelsFirst"?X=[s,L,M,V,Y]:a==="channelsLast"&&(X=[s,M,V,Y,L]),{batchSize:s,dataFormat:a,inDepth:u,inHeight:l,inWidth:c,inChannels:d,outDepth:M,outHeight:V,outWidth:Y,outChannels:L,padInfo:C,strideDepth:y,strideHeight:g,strideWidth:b,filterDepth:f,filterHeight:h,filterWidth:m,effectiveFilterDepth:I,effectiveFilterHeight:P,effectiveFilterWidth:O,dilationDepth:_,dilationHeight:T,dilationWidth:w,inShape:r,outShape:X,filterShape:e}},Mb=(r,e,n,t,o,i)=>{let a=i==="channelsLast",s=a?r[0].dims[3]:r[0].dims[1],u=!1,l=[64,1,1],c={x:n.map((b,_)=>_)},d=[Math.ceil(D1(c.x.map(b=>n[b]))/l[0]),1,1];oe("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${d}`);let p=u?a&&s%4!==0?3:4:1,f=S.size(n),h=[{type:12,data:f},{type:12,data:t},{type:12,data:o},{type:12,data:e.strides},{type:12,data:e.dilations}];$t(e,h),h.push(...D(r[0].dims,r[1].dims));let m=["rank","rank"],y=r.length===3;y&&(h.push(...D(r[2].dims)),m.push("rank")),h.push(...D(n));let g=b=>{let _=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:t.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:e.strides.length},{name:"dilations",type:"u32",length:e.dilations.length}];At(e,_);let T=u?4:1,w=xe(r[0].dataType),I=A("x",r[0].dataType,r[0].dims.length,p===3?1:p),P=A("W",r[1].dataType,r[1].dims.length,T),O=[I,P],C=E("result",r[0].dataType,n.length,T),M="";if(y){let L=A("bias",r[2].dataType,r[2].dims.length,T);O.push(L),M+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${w}>`:w} {
          return bias[${a?B("coords",4,5):B("coords",1,5)}${u?"/ 4":""}];
        }`}let V=Ne(p,w),Y=St(e,V,w);return`
            ${M}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${P.getByIndices("aIndices")};
            }
          ${b.registerUniforms(_).declareVariables(...O,C)}
          ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${C.offsetToIndices("global_idx")};
              let batch = ${B("coords",0,I.rank)};
              let d2 = ${a?B("coords",I.rank-1,I.rank):B("coords",1,I.rank)};
              let xFRCCorner = vec3<u32>(${a?B("coords",1,I.rank):B("coords",2,I.rank)},
              ${a?B("coords",2,I.rank):B("coords",3,I.rank)},
              ${a?B("coords",3,I.rank):B("coords",4,I.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?B("uniforms.x_shape",1,I.rank):B("uniforms.x_shape",2,I.rank)};
              let xShapeZ = ${a?B("uniforms.x_shape",2,I.rank):B("uniforms.x_shape",3,I.rank)};
              let xShapeW = ${a?B("uniforms.x_shape",3,I.rank):B("uniforms.x_shape",4,I.rank)};
              let xShapeU = ${a?B("uniforms.x_shape",4,I.rank):B("uniforms.x_shape",1,I.rank)};
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
              ${y?"value = value + getBiasByOutputCoords(coords)":""};
              ${Y}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${e.cacheKey};${a};${p};${y}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:n,dataType:r[0].dataType}],dispatchGroup:{x:d[0],y:d[1],z:d[2]},programUniforms:h}),getShaderSource:g}}});var Vb,Fb,Gb=$(()=>{"use strict";j();Q();ne();Rn();Vb=(r,e,n,t)=>{let o=r.length>2,i=o?"value += b[output_channel];":"",a=r[0].dims,s=r[1].dims,u=e.format==="NHWC",l=u?n[3]:n[1],c=l/e.group,d=u&&c>=4?pe(l):1,p=S.size(n)/d,f=[{type:12,data:p},{type:12,data:e.dilations},{type:12,data:[e.strides[0],e.strides[1]]},{type:12,data:[e.pads[0],e.pads[1]]},{type:12,data:c}];$t(e,f),f.push(...D(a,[s[0],s[1],s[2],s[3]/d]));let h=o?["rank","rank","rank"]:["rank","rank"];f.push(...D([n[0],n[1],n[2],n[3]/d]));let m=y=>{let g=E("output",r[0].dataType,n.length,d),b=xe(g.type.tensor),_=St(e,g.type.value,b),T=A("x",r[0].dataType,a.length),w=A("w",r[1].dataType,s.length,d),I=[T,w];o&&I.push(A("b",r[2].dataType,r[2].dims,d));let P=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:e.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];At(e,P);let O=u?`
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
            let wVal = ${w.get("wHeight","wWidth","wInChannel","output_channel")};
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
            let wVal = ${w.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${y.registerUniforms(P).declareVariables(...I,g)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${g.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${d} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${g.type.value} = ${g.type.value}(0);
    ${O}
    ${i}
    ${_}
    ${g.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${e.cacheKey}_${d}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:t?t(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:m}},Fb=(r,e,n,t)=>{let o=r.length>2,i=pe(n[3]),a=pe(n[2]),s=S.size(n)/i/a,u=[r[0].dims[0],r[0].dims[1],r[0].dims[2],r[0].dims[3]/i],l=[r[1].dims[0],r[1].dims[1],r[1].dims[2],r[1].dims[3]/i],c=[n[0],n[1],n[2],n[3]/i],d=[{type:12,data:s},{type:6,data:[e.strides[0],e.strides[1]]},{type:6,data:[e.pads[0],e.pads[1]]}];$t(e,d),d.push(...D(u,l,c));let p=(a-1)*e.strides[1]+l[1],f=h=>{let m=E("output",r[0].dataType,c.length,i),y=xe(m.type.tensor),g=St(e,m.type.value,y),b=A("x",r[0].dataType,u.length,i),_=A("w",r[1].dataType,l.length,i),T=[b,_];o&&T.push(A("b",r[2].dataType,r[2].dims,i));let w=o?"value += b[output_channel];":"",I=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return At(e,I),`
  ${h.registerUniforms(I).declareVariables(...T,m)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${a}u;
    let col = (index1 % width1) * ${a}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${b.type.value}, ${p}>;
    var values: array<${m.type.value}, ${a}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${p}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${b.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${b.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${_.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${a}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${a}u; i++) {
      var value = values[i];
      ${w}
      ${g}
      ${m.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${e.cacheKey};${i};${a};${p};${l[0]};${l[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:t?t(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d}),getShaderSource:f}}});var z1,Yu,R1,el,tl,Ub,N1,M1,nl,Wb=$(()=>{"use strict";Q();Lb();Bb();Vi();Gb();Rn();Bi();vn();z1=(r,e,n,t,o,i)=>{let a=r[0],s=r.slice(i?1:2,i?3:4),u=s.length,l=e[0],d=e.slice(2).map((h,m)=>h+(h-1)*(n[m]-1)),f=s.map((h,m)=>h+t[m]+t[m+u]).map((h,m)=>Math.floor((h-d[m]+o[m])/o[m]));return f.splice(0,0,a),f.splice(i?3:1,0,l),f},Yu=[2,3,1,0],R1=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length>5)throw new Error("greater than 5D is not supported");if(r[0].dims.length!==r[1].dims.length)throw new Error("filter does not have same dimension as input");let n=r[0].dims[e.format==="NHWC"?r[0].dims.length-1:1],t=r[1].dims[1]*e.group;if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(r.length===3&&(r[2].dims.length!==1||r[1].dims[0]!==r[2].dims[0]))throw new Error("invalid bias");let o=r[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape")},el=(r,e)=>{let n=r.kernelShape.slice();n.length<e[1].dims.length-2&&n.push(...Array(e[1].dims.length-2-n.length).fill(0));for(let i=2;i<e[1].dims.length;++i)n[i-2]===0&&(n[i-2]=e[1].dims[i]);let t=r.pads.slice();tr.adjustPadsBasedOnAutoPad(e[0].dims,r.strides,r.dilations,n,t,r.format==="NHWC",r.autoPad);let o=Object.assign({},r);return Object.assign(o,{kernelShape:n,pads:t}),o},tl=r=>{let e=Ri(r),n=r.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][r.auto_pad],o=r.dilations,i=r.group,a=r.kernel_shape,s=r.pads,u=r.strides,l=r.w_is_const();return{autoPad:t,format:n,dilations:o,group:i,kernelShape:a,pads:s,strides:u,wIsConst:l,...e,cacheKey:`${r.format};${e.activation};`}},Ub=(r,e,n,t)=>{let o=n.format==="NHWC",i=z1(e[0].dims,e[1].dims,n.dilations,n.pads,n.strides,o);if(n.group!==1){let I=[e[0]];if(o){let O=r.kernelCustomData.wT??r.compute(Fe(e[1],Yu),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=O),I.push(O)}else I.push(e[1]);e.length===3&&I.push(e[2]),!r.adapterInfo.isArchitecture("ampere")&&o&&e[1].dims[0]===n.group&&e[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?r.compute(Fb(I,n,i,t),{inputs:I}):r.compute(Vb(I,n,i,t),{inputs:I});return}let a=e.length===3,s=e[0].dims[o?1:2],u=e[0].dims[o?2:3],l=e[0].dims[o?3:1],c=e[1].dims[2],d=e[1].dims[3],p=i[o?1:2],f=i[o?2:3],h=i[o?3:1],m=o&&c===s&&d===u&&n.pads[0]===0&&n.pads[1]===0;if(m||c===1&&d===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let I=i[0],P,O,C,M=[];if(o){let L=r.kernelCustomData.wT??r.compute(Fe(e[1],Yu),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=L),m){let X=s*u*l;P=e[0].reshape([1,I,X]),O=L.reshape([1,X,h]),C=[1,I,h]}else P=e[0].reshape([I,s*u,l]),O=L.reshape([1,l,h]),C=[I,p*f,h];M.push(P),M.push(O)}else P=e[0].reshape([I,l,s*u]),O=e[1].reshape([1,h,l]),C=[I,h,p*f],M.push(O),M.push(P);a&&M.push(e[2]);let V=C[2],Y=M[0].dims[M[0].dims.length-1];V<8&&Y<8?r.compute(Mi(M,n,i,C,o,t),{inputs:M}):r.compute(Yr(M,n,i,C,o,t),{inputs:M});return}let y=!0,g=r.kernelCustomData.wT??r.compute(Fe(e[1],Yu),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=g);let b=[e[0],g];a&&b.push(e[2]);let _=o?p*f:h,T=o?h:p*f,w=c*d*l;r.compute(kb(b,n,i,_,T,w,a,y,t),{inputs:b})},N1=(r,e)=>{let n=e.format==="NHWC",t=[r.inputs[0].reshape(n?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])];r.inputs.length===3&&t.push(r.inputs[2]);let o=[0,e.pads[0],0,e.pads[1]],i=[1].concat(e.strides),a=[1].concat(e.dilations),s=[1].concat(e.kernelShape),u=el({...e,pads:o,strides:i,dilations:a,kernelShape:s},t);Ub(r,t,u,l=>n?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},M1=(r,e,n)=>{let t=n.format==="NHWC"?"channelsLast":"channelsFirst",o=el(n,e),i=n.autoPad==="NOTSET"?n.pads:n.autoPad,a=Nb(e[0].dims,e[1].dims,n.strides,n.dilations,i,!1,t);r.compute(Mb(e,o,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],t))},nl=(r,e)=>{if(R1(r.inputs,e),r.inputs[0].dims.length===3)N1(r,e);else if(r.inputs[0].dims.length===5)M1(r,r.inputs,e);else{let n=el(e,r.inputs);Ub(r,r.inputs,n)}}});var Hb,qb=$(()=>{"use strict";j();pn();Q();ne();Hb=(r,e,n)=>{let t=r.length>2,o=e.outputShape,i=e.format==="NHWC",a=e.group,s=r[1].dims,u=s[2]/a,l=s[3],c=i?pe(u):1,d=i?pe(l):1,p=i?l===1?c:d:1,f=S.size(o)/d,h=[Math.ceil(f/64),1,1];oe("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${h}`);let m=["rank","rank"],y=[e.strides[0],e.strides[1]],g=[e.kernelShape[i?1:2],e.kernelShape[i?2:3]],b=[e.dilations[0],e.dilations[1]],_=[g[0]+(e.dilations[0]<=1?0:(e.kernelShape[i?1:2]-1)*(e.dilations[0]-1)),g[1]+(e.dilations[1]<=1?0:(e.kernelShape[i?2:3]-1)*(e.dilations[1]-1))],T=[_[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),_[1]-1-Math.floor((e.pads[1]+e.pads[3])/2)],w=[{type:12,data:f},{type:12,data:y},{type:12,data:g},{type:12,data:b},{type:12,data:_},{type:6,data:T},{type:12,data:u},{type:12,data:l},...D(r[0].dims,r[1].dims)];t&&(w.push(...D(r[2].dims)),m.push("rank")),w.push(...D(o));let I=P=>{let O=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:y.length},{name:"filter_dims",type:"u32",length:g.length},{name:"dilations",type:"u32",length:g.length},{name:"effective_filter_dims",type:"u32",length:_.length},{name:"pads",type:"i32",length:T.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],C=xe(r[0].dataType),M=i?1:2,V=i?2:3,Y=i?3:1,L=A("W",r[1].dataType,r[1].dims.length,p),X=A("Dy",r[0].dataType,r[0].dims.length,c),$e=[X,L];t&&$e.push(A("bias",r[2].dataType,[o[Y]].length,d));let U=E("result",r[0].dataType,o.length,d),te=()=>{let Z="";if(c===1)Z+=`
        let w_offset = ${L.indicesToOffset(`${L.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
        let wValue = ${L.getByOffset(`w_offset / ${p}`)};
        dotProd = dotProd + xValue * wValue;`;else if(l===1)Z+=`
          let wValue = ${L.getByOffset(`${L.indicesToOffset(`${L.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)} / ${p}`)};
          dotProd = dotProd + dot(xValue, wValue);`;else for(let ve=0;ve<c;ve++)Z+=`
            let wValue${ve} = ${L.getByOffset(`${L.indicesToOffset(`${L.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${ve}, wOutChannel)`)} / ${p}`)};
            dotProd = dotProd + xValue[${ve}] * wValue${ve};`;return Z},ie=`
            let outputIndices = ${U.offsetToIndices(`global_idx * ${d}`)};
            let batch = ${U.indicesGet("outputIndices",0)};
            let d1 = ${U.indicesGet("outputIndices",Y)};
            let r = ${U.indicesGet("outputIndices",M)};
            let c = ${U.indicesGet("outputIndices",V)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${U.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${C}(dyRCorner) + ${C}(wR)) / ${C}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${C}(uniforms.Dy_shape[${M}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${C}(dyCCorner) + ${C}(wC)) / ${C}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${C}(uniforms.Dy_shape[${V}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + ${c}) {
                  let xValue = ${i?X.getByOffset(`${X.indicesToOffset(`${X.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c}`):X.get("batch","inputChannel","idyR","idyC")};
                  ${te()}
                  inputChannel = inputChannel + ${c};
                }
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${t?` + bias[d1 / ${d}]`:""};
            ${U.setByOffset("global_idx","value")};
          `;return`
    ${P.registerUniforms(O).declareVariables(...$e,U)}
      ${P.mainStart()}
      ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${ie}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${e.cacheKey};${c}${p}${d}${l===1}`,inputDependencies:m},getRunData:()=>({dispatchGroup:{x:h[0],y:h[1],z:h[2]},outputs:[{dims:n?n(o):o,dataType:r[0].dataType}],programUniforms:w}),getShaderSource:I}}});var B1,V1,F1,jb,Kb,G1,Xb,U1,Zb,Jb=$(()=>{"use strict";qb();Rn();vn();B1=(r,e,n,t,o,i)=>(r-1)*e+n+(t-1)*o+1-i,V1=(r,e,n,t,o)=>{let i=Math.floor(r/2);e==="SAME_UPPER"?(n[t]=i,n[o]=r-i):e==="SAME_LOWER"&&(n[t]=r-i,n[o]=i)},F1=(r,e,n,t,o,i,a,s,u,l)=>{let c=r.length-2,d=l.length===0;u.length<c&&u.push(...Array(c-u.length).fill(0));let p=r[0],f=e[s?3:1]*o;for(let h=0,m=r.length-c-(s?1:0);h<c;++h,++m){let y=r[m],g=d?y*a[h]:l[h],b=B1(y,a[h],i[h],e[m],n[h],g);V1(b,t,i,h,h+c),d&&l.push(a[h]*(y-1)+u[h]+(e[m]-1)*n[h]+1-i[h]-i[h+c])}l.splice(0,0,p),l.splice(s?3:1,0,f)},jb=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0||r.kernelShape.reduce((d,p)=>d*p,1)===0){n.length=0;for(let d=2;d<e[1].dims.length;++d)n.push(e[1].dims[d])}let t=r.format==="NHWC";n.splice(0,0,e[1].dims[0]),n.splice(t?3:1,0,e[1].dims[1]);let o=r.pads.slice(),i=r.outputShape.slice(),a=r.outputPadding.slice(),s=e[0].dims,u=r.dilations.slice();if(u.reduce((d,p)=>d+p,0)===0){let d=e[0].dims.length-2;u=new Array(d).fill(1)}let l=r.strides.slice();if(l.reduce((d,p)=>d+p,0)===0){let d=e[0].dims.length-2;l=new Array(d).fill(1)}F1(s,n,u,r.autoPad,r.group,o,l,t,a,i);let c=Object.assign({},r);return Object.assign(c,{kernelShape:n,pads:o,outputPadding:a,outputShape:i,dilations:u,strides:l}),c},Kb=r=>{let e=Ri(r),n=r.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof r.autoPad>"u"?0:r.autoPad],o=r.dilations,i=r.group,a=r.kernelShape,s=r.pads,u=r.strides,l=r.wIsConst(),c=r.outputPadding,d=r.outputShape;return{autoPad:t,format:n,dilations:o,group:i,kernelShape:a,outputPadding:c,outputShape:d,pads:s,strides:u,wIsConst:l,...e,cacheKey:`${r.format};${e.activation};`}},G1=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4&&r[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(r[0].dims.length!==r[1].dims.length)throw new Error("filter does not have same dimension as input");let n=r[0].dims[e.format==="NHWC"?r[0].dims.length-1:1],t=r[1].dims[0];if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=r[1].dims[1]*e.group;if(r.length===3&&(r[2].dims.length!==1||r[2].dims[0]!==o))throw new Error("invalid bias");let i=r[0].dims.length-2;if(e.dilations.reduce((c,d)=>c+d,0)>0&&e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.reduce((c,d)=>c+d,0)>0&&e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.reduce((c,d)=>c+d,0)>0&&e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i&&e.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.reduce((c,d)=>c+d,0)>0&&e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==r[0].dims.length-2)throw new Error("invalid output shape")},Xb=(r,e,n,t)=>{let o=r.kernelCustomData.wT??r.compute(Fe(e[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=o);let i=[e[0],o];e.length===3&&i.push(e[2]),r.compute(Hb(i,n,t),{inputs:i})},U1=(r,e)=>{let n=e.format==="NHWC",t=[r.inputs[0].reshape(n?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])];r.inputs.length===3&&t.push(r.inputs[2]);let o=e.kernelShape;(o.length===0||o[0]===0)&&(o=[r.inputs[1].dims[2]]);let i=e.dilations;(i.length===0||i[0]===0)&&(i=[1]);let a=e.strides;(a.length===0||a[0]===0)&&(a=[1]);let s=e.pads;s.length===0&&(s=[0,0]),s=[0,s[0],0,s[1]],a=[1].concat(a),i=[1].concat(i),o=[1].concat(o);let u=e.outputPadding;u=[0].concat(u);let l=jb({...e,pads:s,strides:a,dilations:i,kernelShape:o,outputPadding:u},t);Xb(r,t,l,c=>n?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},Zb=(r,e)=>{if(G1(r.inputs,e),r.inputs[0].dims.length===3)U1(r,e);else{let n=jb(e,r.inputs);Xb(r,r.inputs,n)}}});var W1,Qb,Yb,ey=$(()=>{"use strict";j();Q();Oe();ne();W1=(r,e,n,t)=>{let o=S.size(e),i=e.length,a=A("input",r,i),s=E("output",r,i),u=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),l=S.normalizeAxis(u,i),c=d=>{let p=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,f=B("uniforms.input_shape","uniforms.axis",i),h=t.reverse?p+(t.exclusive?" + 1":""):"0",m=t.reverse?f:p+(t.exclusive?"":" + 1");return`
                ${d.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,s)}
                ${d.mainStart()}
                  ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${s.offsetToIndices("global_idx")};
                  var sum = ${s.type.value}(0);
                  let first : i32 = ${h};
                  let last : i32 = ${m};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${s.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:e,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:l},...D(e,e)]}),getShaderSource:c}},Qb=(r,e)=>{let n=r.inputs[0].dims,t=r.inputs[0].dataType,o=r.inputs[1];r.compute(W1(t,n,o,e),{inputs:[0]})},Yb=r=>{let e=r.exclusive===1,n=r.reverse===1;return K({exclusive:e,reverse:n})}});var H1,q1,j1,ty,ny,ry=$(()=>{"use strict";j();Q();Oe();ne();H1=r=>{if(!r||r.length!==1)throw new Error("DepthToSpace requires 1 input.");if(r[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},q1=(r,e,n,t)=>{let o=[];o.push(`fn perm(i: ${t.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let i=0;i<e;++i)o.push(n.indicesSet("a",r[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},j1=(r,e)=>{let n,t,o,i,a,s,u=e.format==="NHWC",l=e.blocksize,c=e.mode==="DCR";u?([n,t,o,i]=r.dims,a=c?[n,t,o,l,l,i/l**2]:[n,t,o,i/l**2,l,l],s=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,t,o,i]=[r.dims[0],r.dims[2],r.dims[3],r.dims[1]],a=c?[n,l,l,i/l**2,t,o]:[n,i/l**2,l,l,t,o],s=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let d=r.reshape(a),p=d.dims.length,f=r.dataType,h=A("a",f,p),m=E("output",f,p),y=g=>`
  ${g.registerUniform("output_size","u32").declareVariables(h,m)}

  ${q1(s,p,h,m)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${m.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${m.setByOffset("global_idx",h.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${r.dims};${e.blocksize};${e.mode}`,inputDependencies:["rank"]},getRunData:g=>{let b=u?[n,t*l,o*l,i/l**2]:[n,i/l**2,t*l,o*l],_=S.size(b),T=d.dims,w=S.sortBasedOnPerm(T,s);return{outputs:[{dims:b,dataType:g[0].dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...D(T,w)]}},getShaderSource:y}},ty=(r,e)=>{H1(r.inputs),r.compute(j1(r.inputs[0],e))},ny=r=>K({blocksize:r.blocksize,mode:r.mode,format:r.format})});var rl,Gi,oy,K1,X1,ol,il,iy,Z1,ay,sy,uy=$(()=>{"use strict";j();Q();Oe();ne();rl="[a-zA-Z]|\\.\\.\\.",Gi="("+rl+")+",oy="^"+Gi+"$",K1="("+Gi+",)*"+Gi,X1="^"+K1+"$",ol=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,n){let t=this.symbolToIndices.get(e);t===void 0?t=[n]:t.push(n),this.symbolToIndices.set(e,t)}},il=class{constructor(e,n){this.equation=n;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[t,o]=n.includes("->")?n.split("->",2):[n,""];if(!t.match(RegExp(X1)))throw new Error("Invalid LHS term");if(t.split(",").forEach((s,u)=>{let l=e[u].dims.slice();if(!s.match(RegExp(oy)))throw new Error("Invalid LHS term");let c=this.processTerm(s,!0,l,u);this.lhs.push(c)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([s,u])=>u.count===1||s==="...").map(([s])=>s).join("");else if(!o.match(RegExp(Gi)))throw new Error("Invalid RHS");o.match(RegExp(rl,"g"))?.forEach(s=>{if(s==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let u=this.symbolToInfo.get(s);if(u===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(u.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(e,n,t){let o=this.symbolToInfo.get(e);if(o!==void 0){if(o.dimValue!==n&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(t)}else o={count:1,dimValue:n,inputIndices:[t]};this.symbolToInfo.set(e,o)}processTerm(e,n,t,o=-1){let i=t.length,a=!1,s=[],u=0;if(!e.match(RegExp(oy))&&!n&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(rl,"g")),c=new ol(o);return l?.forEach((d,p)=>{if(d==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let f=i-l.length+1;if(f<0)throw new Error("Ellipsis out of bounds");if(s=t.slice(u,u+f),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(n)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let h=0;h<s.length;h++){let m=String.fromCharCode(48+h);c.addSymbol(m,p+h),this.addSymbol(m,t[u++],o)}}else c.addSymbol(d,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(d,t[u++],o)}),c}},iy=r=>r+"_max",Z1=(r,e,n,t)=>{let i=r.map(c=>c.length).map((c,d)=>A(`input${d}`,e,c)),a=S.size(t),s=E("output",e,t.length),u=[...n.symbolToInfo.keys()].filter(c=>!n.rhs.symbolToIndices.has(c)),l=c=>{let d=[],p="var prod = 1.0;",f="var sum = 0.0;",h="sum += prod;",m=[],y=[],g=[],b=[],_=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((w,I)=>{if(n.rhs.symbolToIndices.has(I)){let P=n.rhs.symbolToIndices.get(I)?.[0];P!==void 0&&n.lhs.forEach((O,C)=>{if(w.inputIndices.includes(C)){let M=O.symbolToIndices.get(I);if(M===void 0)throw new Error("Invalid symbol error");M.forEach(V=>{d.push(`${i[C].indicesSet(`input${C}Indices`,V,s.indicesGet("outputIndices",P))}`)})}})}else n.lhs.forEach((P,O)=>{if(w.inputIndices.includes(O)){let C=P.symbolToIndices.get(I);if(C===void 0)throw new Error("Invalid symbol error");C.forEach(M=>{m.push(`${i[O].indicesSet(`input${O}Indices`,M,`${I}`)}`)}),b.push(`prod *= ${i[O].getByIndices(`input${O}Indices`)};`)}}),y.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${iy(I)}; ${I}++) {`),g.push("}")});let T=_?[...d,`let sum = ${i.map((w,I)=>w.getByIndices(`input${I}Indices`)).join(" * ")};`]:[...d,f,...y,...m,p,...b,h,...g];return`
            ${c.registerUniforms(u.map(w=>({name:`${iy(w)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,s)}

            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${i.map((w,I)=>`var input${I}Indices: ${i[I].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:r.map(()=>"rank")},getRunData:()=>{let c=u.filter(p=>n.symbolToInfo.has(p)).map(p=>({type:12,data:n.symbolToInfo.get(p)?.dimValue||0}));c.push({type:12,data:a});let d=r.map((p,f)=>[...D(p)]).reduce((p,f)=>p.concat(f),c);return d.push(...D(t)),{outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}},getShaderSource:l}},ay=(r,e)=>{let n=new il(r.inputs,e.equation),t=n.outputDims,o=r.inputs.map((i,a)=>i.dims);r.compute(Z1(o,r.inputs[0].dataType,n,t))},sy=r=>{let e=r.equation.replace(/\s+/g,"");return K({equation:e})}});var J1,ly,Q1,Y1,cy,dy=$(()=>{"use strict";j();Q();ne();J1=r=>{if(!r||r.length!==2)throw new Error("Expand requires 2 input.");let e=r[0].dims,n=Array.from(r[1].getBigInt64Array(),Number),t=n.length<e.length?0:n.length-e.length,o=e.length<n.length?0:e.length-n.length;for(;t<n.length&&o<e.length;++t,++o)if(n[t]!==e[o]&&n[t]!==1&&e[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},ly=(r,e)=>{let n=r.length-e.length,t=[];for(let o=0;o<n;++o)t.push(r[o]);for(let o=0;o<e.length;++o)t.push(e[o]===1?r[o+n]:e[o]);return t},Q1=(r,e)=>r.length>e.length?ly(r,e):ly(e,r),Y1=r=>{let e=r[0].dims,n=Array.from(r[1].getBigInt64Array(),Number),t=Q1(e,n),o=r[0].dataType,i=o===9||S.size(e)===1,a=o===9||e.length>0&&e[e.length-1]%4===0?4:1,s=i||t.length>0&&t[t.length-1]%4===0?4:1,u=Math.ceil(S.size(t)/s),l=d=>{let p=A("input",o,e.length,a),f=E("output",o,t.length,s),h;if(o===9){let m=(y,g,b="")=>`
          let outputIndices${g} = ${f.offsetToIndices(`outputOffset + ${g}u`)};
          let offset${g} = ${p.broadcastedIndicesToOffset(`outputIndices${g}`,f)};
          let index${g} = offset${g} / 4u;
          let component${g} = offset${g} % 4u;
          ${y}[${g}] = ${b}(${p.getByOffset(`index${g}`)}[component${g}]);
        `;h=`
        let outputOffset = global_idx * ${s};
        var data = vec4<u32>(0);
        ${m("data",0,"u32")}
        ${m("data",1,"u32")}
        ${m("data",2,"u32")}
        ${m("data",3,"u32")}
        ${f.setByOffset("global_idx","data")}
      }`}else h=`
        let outputIndices = ${f.offsetToIndices(`global_idx * ${s}`)};
        let inputOffset = ${p.broadcastedIndicesToOffset("outputIndices",f)};
        let data = ${f.type.value}(${p.getByOffset(`inputOffset / ${a}`)});
        ${f.setByOffset("global_idx","data")}
      }`;return`
    ${d.registerUniform("vec_size","u32").declareVariables(p,f)}
    ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${h}`},c=[{type:12,data:u},...D(e,t)];return{name:"Expand",shaderCache:{hint:`${t.length};${a}${s}`,inputDependencies:["rank"]},getShaderSource:l,getRunData:()=>({outputs:[{dims:t,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c})}},cy=r=>{J1(r.inputs),r.compute(Y1(r.inputs),{inputs:[0]})}});var e$,py,fy=$(()=>{"use strict";j();Q();ne();zi();e$=r=>{let e=r[0].dataType,n=S.size(r[0].dims),t=S.size(r[1].dims),o=t%4===0,i=a=>{let s=A("x",e,[1],4),u=A("bias",e,[1],4),l=E("y",e,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],d=f=>`
      let bias${f}_offset: u32 = (global_idx * 4 + ${f}) % uniforms.bias_size;
      let bias${f} = ${u.getByOffset(`bias${f}_offset / 4`)}[bias${f}_offset % 4];`,p=o?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${d(0)}${d(1)}${d(2)}${d(3)}
      let bias = ${s.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(c).declareVariables(s,u,l)}

    ${Xu(Ve(e))}

    ${a.mainStart(nr)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${s.getByOffset("global_idx")};
      ${p}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",Zu("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:t}],dispatchGroup:{x:Math.ceil(n/nr/4)}})}},py=r=>{r.inputs.length<2||S.size(r.inputs[1].dims)===0?ub(r):r.compute(e$(r.inputs))}});var t$,n$,hy,my,gy=$(()=>{"use strict";j();Q();Oe();ne();t$=r=>{if(!r||r.length!==2)throw new Error("Gather requires 2 inputs.")},n$=(r,e)=>{let n=r[0].dims,t=r[1].dims,o=n.length,i=S.normalizeAxis(e.axis,o),a=n.slice(0);a.splice(i,1,...t);let s=n[i],u=r[0].dataType===9?4:1,l=Math.ceil(S.size(a)/u),c=[{type:12,data:l},{type:6,data:s},{type:12,data:i},...D(r[0].dims,r[1].dims,a)],d=p=>{let f=A("data",r[0].dataType,r[0].dims.length,u),h=A("inputIndices",r[1].dataType,r[1].dims.length),m=E("output",r[0].dataType,a.length,u),y=b=>{let _=t.length,T=`var indicesIndices${b}  = ${h.type.indices}(0);`;for(let w=0;w<_;w++)T+=`${_>1?`indicesIndices${b}[${w}]`:`indicesIndices${b}`} = ${a.length>1?`outputIndices${b}[uniforms.axis + ${w}]`:`outputIndices${b}`};`;T+=`
          var idx${b} = ${h.getByIndices(`indicesIndices${b}`)};
          if (idx${b} < 0) {
            idx${b} = idx${b} + uniforms.axisDimLimit;
          }
          var dataIndices${b} : ${f.type.indices};
        `;for(let w=0,I=0;w<o;w++)w===i?(T+=`${o>1?`dataIndices${b}[${w}]`:`dataIndices${b}`} = u32(idx${b});`,I+=_):(T+=`${o>1?`dataIndices${b}[${w}]`:`dataIndices${b}`} = ${a.length>1?`outputIndices${b}[${I}]`:`outputIndices${b}`};`,I++);return T},g;if(r[0].dataType===9){let b=(_,T,w="")=>`
          let outputIndices${T} = ${m.offsetToIndices(`outputOffset + ${T}u`)};
          ${y(T)};
          let offset${T} = ${f.indicesToOffset(`dataIndices${T}`)};
          let index${T} = offset${T} / 4u;
          let component${T} = offset${T} % 4u;
          ${_}[${T}] = ${w}(${f.getByOffset(`index${T}`)}[component${T}]);
        `;g=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${b("value",0,"u32")}
        ${b("value",1,"u32")}
        ${b("value",2,"u32")}
        ${b("value",3,"u32")}
        ${m.setByOffset("global_idx","value")}
      `}else g=`
      let outputIndices = ${m.offsetToIndices("global_idx")};
      ${y("")};
      let value = ${f.getByIndices("dataIndices")};
      ${m.setByOffset("global_idx","value")};
      `;return`
      ${p.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,h,m)}
      ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${g}
      }`};return{name:"Gather",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:d}},hy=r=>K({axis:r.axis}),my=(r,e)=>{let n=r.inputs;t$(n),r.compute(n$(r.inputs,e))}});var r$,by,yy,_y=$(()=>{"use strict";j();Q();ne();r$=(r,e,n,t,o,i,a,s,u)=>{let l=[{type:12,data:i},{type:12,data:t},{type:12,data:o},{type:12,data:n},{type:12,data:a},{type:12,data:s},{type:12,data:u}],c=[i];l.push(...D(e.dims,c));let d=p=>{let f=A("indices_data",e.dataType,e.dims.length),h=E("input_slice_offsets_data",12,1,1),m=[f,h],y=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${p.registerUniforms(y).declareVariables(...m)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
  }`};return r.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:c,dataType:r.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:l}),getShaderSource:d},{inputs:[e],outputs:[-1]})[0]},by=(r,e)=>{let n=r.inputs,t=n[0].dims,o=n[0].dataType,i=n[1].dims,a=i[i.length-1],s=S.sizeToDimension(i,i.length-1),u=S.sizeFromDimension(t,e.batchDims+a),l=S.sizeToDimension(t,e.batchDims),c=S.sizeFromDimension(t,e.batchDims),d=s/l,p=new Array(a),f=u;for(let T=0;T<a;++T)p[a-1-T]=f,f*=t[e.batchDims+a-1-T];let h=r$(r,n[1],p,e.batchDims,t,s,d,c,a),m=e.batchDims+a;if(m>t.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let y=i.slice(0,-1).concat(t.slice(m)),g=S.size(y),b=[{type:12,data:g},{type:12,data:u},...D(n[0].dims,h.dims,y)],_=T=>{let w=A("data",n[0].dataType,n[0].dims.length),I=A("slice_offsets",12,h.dims.length),P=E("output",n[0].dataType,y.length);return`
          ${T.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(w,I,P)}
            ${T.mainStart()}
            ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};r.compute({name:"GatherND",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:y,dataType:o}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:b}),getShaderSource:_},{inputs:[n[0],h]})},yy=r=>({batchDims:r.batch_dims,cacheKey:""})});var o$,i$,xy,Ty,vy=$(()=>{"use strict";j();Q();Oe();ne();o$=(r,e)=>{if(r.length<3||r.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=S.normalizeAxis(e.quantizeAxis,r[0].dims.length),t=e.blockSize,o=r[0],i=r[2],a=r.length===4?r[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((s,u)=>u===n?Math.ceil(s/t)===i.dims[u]:s===i.dims[u]).reduce((s,u)=>s&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==i.dims.length||!a.dims.map((s,u)=>s===i.dims[u]).reduce((s,u)=>s&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},i$=(r,e)=>{let n=r[0].dims,t=r[1].dims,o=n.length,i=S.normalizeAxis(e.gatherAxis,o),a=S.normalizeAxis(e.quantizeAxis,o),s=n.slice(0);s.splice(i,1,...t);let u=S.size(s),l=r[2].dataType,d=r[0].dataType===22,p=[{type:12,data:u},{type:12,data:a},{type:12,data:i},{type:12,data:e.blockSize},...D(...r.map((h,m)=>h.dims),s)],f=h=>{let m=A("data",r[0].dataType,r[0].dims.length),y=A("inputIndices",r[1].dataType,r[1].dims.length),g=A("scales",r[2].dataType,r[2].dims.length),b=r.length>3?A("zeroPoint",r[3].dataType,r[3].dims.length):void 0,_=E("output",l,s.length),T=[m,y,g];b&&T.push(b);let w=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${h.registerUniforms(w).declareVariables(...T,_)}
        ${h.mainStart()}
        let output_indices = ${_.offsetToIndices("global_idx")};
        var indices_indices = ${y.type.indices}(0);
        ${t.length>1?`
          for (var i: u32 = 0; i < ${t.length}; i++) {
            let index = ${_.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${y.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${_.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${m.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${_.indicesGet("output_indices","i")};
          ${m.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${y.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[i]};
        }
        ${m.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${s.length}; i++) {
          let index = ${_.indicesGet("output_indices",`i + ${t.length} - 1`)};
          ${m.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${m.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${m.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${d?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${g.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${g.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${g.getByIndices("scale_indices")};
        ${b?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${b.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${b.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${d?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Ve(l)}(quantized_data - zero_point) * scale;
        ${_.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${e.cacheKey};${r.filter((h,m)=>m!==1).map(h=>h.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:r.length},(h,m)=>"rank")},getRunData:()=>({outputs:[{dims:s,dataType:l}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:p}),getShaderSource:f}},xy=(r,e)=>{let n=r.inputs;o$(n,e),r.compute(i$(r.inputs,e))},Ty=r=>K({blockSize:r.blockSize,gatherAxis:r.gatherAxis,quantizeAxis:r.quantizeAxis})});var a$,s$,wy,Iy,Sy=$(()=>{"use strict";j();Q();Oe();ne();a$=r=>{if(!r||r.length!==2)throw new Error("GatherElements requires 2 inputs.");if(r[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(r[0].dims.length!==r[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},s$=(r,e)=>{let n=r[0].dims,t=r[0].dataType,o=n.length,i=r[1].dims,a=r[1].dataType,s=S.normalizeAxis(e.axis,o),u=n[s],l=i.slice(0),c=S.size(l),d=A("input",t,o),p=A("indicesInput",a,i.length),f=E("output",t,l.length),h=[{type:12,data:c},{type:6,data:u},{type:12,data:s}];return h.push(...D(n,i,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:h}),getShaderSource:g=>`
      ${g.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(d,p,f)}
      ${g.mainStart()}
      ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${f.offsetToIndices("global_idx")};

      var idx = ${p.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${d.type.indices}(outputIndices);
      ${d.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${d.getByIndices("inputIndices")};

      ${f.setByOffset("global_idx","value")};
  }`}},wy=r=>K({axis:r.axis}),Iy=(r,e)=>{let n=r.inputs;a$(n),r.compute(s$(r.inputs,e))}});var u$,l$,$y,Ay,Py=$(()=>{"use strict";j();Q();ne();u$=r=>{if(!r)throw new Error("Input is missing");if(r.length<2||r.length>3)throw new Error("Invaid input number.");if(r.length===3&&r[2].dims.length>2)throw new Error("Invalid input shape of C");if(r[0].dataType!==r[1].dataType||r.length===3&&r[0].dataType!==r[2].dataType)throw new Error("Input types are mismatched")},l$=(r,e)=>{let n=r[0].dims.slice(),t=r[1].dims.slice(),[o,i,a]=Pi.getShapeOfGemmResult(n,e.transA,t,e.transB,r.length===3?r[2].dims:void 0),s=[o,i];if(!s)throw new Error("Can't use gemm on the given tensors");let u=16,l=Math.ceil(i/u),c=Math.ceil(o/u),d=!0,p=S.size(s),f=[{type:12,data:d?l:p},{type:12,data:o},{type:12,data:i},{type:12,data:a},{type:1,data:e.alpha},{type:1,data:e.beta}],h=["type","type"];r.length===3&&(f.push(...D(r[2].dims)),h.push("rank")),f.push(...D(s));let m=g=>{let b="";e.transA&&e.transB?b="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":e.transA&&!e.transB?b="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!e.transA&&e.transB?b="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!e.transA&&!e.transB&&(b="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let _=e.alpha===1?"":"value *= uniforms.alpha;",T=A("a",r[0].dataType,r[0].dims),w=A("b",r[1].dataType,r[1].dims),I=T.type.value,P=null,O=[T,w];r.length===3&&(P=A("c",r[2].dataType,r[2].dims.length),O.push(P));let C=E("output",r[0].dataType,s.length);O.push(C);let M=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${g.registerUniforms(M).declareVariables(...O)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${I}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${b}
    }

    ${_}
    ${P!=null?`let cOffset = ${P.broadcastedIndicesToOffset("vec2(m, n)",C)}; value += ${I}(uniforms.beta) * ${P.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},y=g=>{let b=A("a",r[0].dataType,r[0].dims),_=A("b",r[1].dataType,r[1].dims),T=null,w=[b,_];r.length===3&&(T=A("c",r[2].dataType,r[2].dims.length),w.push(T));let I=E("output",r[0].dataType,s.length);w.push(I);let P=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],O="",C="";e.transA&&e.transB?(C=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${_.type.value}(0);
      }
      `,O="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):e.transA&&!e.transB?(C=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${_.type.value}(0);
      }
      `,O="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!e.transA&&e.transB?(C=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${_.type.value}(0);
      }
      `,O="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!e.transA&&!e.transB&&(C=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${_.type.value}(0);
      }
      `,O="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let M=e.alpha===1?"":"value *= uniforms.alpha;";return`
  ${g.registerUniforms(P).declareVariables(...w)}
  var<workgroup> tile_a: array<array<${b.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${_.type.storage}, ${u}>, ${u}>;
  ${g.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${I.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${C}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${O}
      }
      workgroupBarrier();
    }

    ${M}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${T!=null?`let cOffset = ${T.broadcastedIndicesToOffset("vec2(m, n)",I)}; value += ${I.type.value}(uniforms.beta) * ${T.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return d?{name:"GemmShared",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:s,dataType:r[0].dataType}],dispatchGroup:{x:l*c},programUniforms:f}),getShaderSource:y}:{name:"Gemm",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:s,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:m}},$y=r=>{let e=r.transA,n=r.transB,t=r.alpha,o=r.beta;return{transA:e,transB:n,alpha:t,beta:o,cacheKey:`${r.transA};${r.transB};${r.alpha===1}`}},Ay=(r,e)=>{u$(r.inputs),r.compute(l$(r.inputs,e))}});var wn,Nn,Tr,vr,c$,d$,p$,f$,h$,m$,g$,b$,Oy,Ey,Cy=$(()=>{"use strict";j();Q();Oe();ne();[wn,Nn,Tr,vr]=[0,1,2,3],c$=r=>{if(r[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(r[0].dims.length!==r[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(r[0].dims.length-2!==r[1].dims[r[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${r[0].dims.length-2}`);if(r[0].dims[0]!==r[1].dims[0])throw new Error("grid batch size must match input batch size")},d$=`
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
`,p$=r=>`
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
`,f$=r=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${r.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,h$=r=>`
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
`,m$=(r,e,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${e} {
     var pixel = ${e}(0);
     var indices = vec4<u32>(0);
     indices[${wn}] = batch;
     indices[${Nn}] = channel;`+(()=>{switch(n.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Tr}] = u32(r);
            indices[${vr}] = u32(c);
          }
        `;case"border":return`
          indices[${Tr}] = u32(clamp(r, 0, H - 1));
          indices[${vr}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Tr}] = gs_reflect(r, border[1], border[3]);
          indices[${vr}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${r.getByIndices("indices")};
  }
`,g$=(r,e,n)=>(()=>{switch(n.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${wn}], indices[${Nn}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${wn}], indices[${Nn}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${wn}], indices[${Nn}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${wn}], indices[${Nn}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${wn}], indices[${Nn}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${wn}], indices[${Nn}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${n.mode} is not supported`)}})()+`${r.setByOffset("global_idx","result")}`,b$=(r,e)=>{let n=A("x",r[0].dataType,r[0].dims.length),t=[r[1].dims[0],r[1].dims[1],r[1].dims[2]],o=A("grid",r[1].dataType,t.length,2),i=[r[0].dims[0],r[0].dims[1],r[1].dims[1],r[1].dims[2]];e.format==="NHWC"&&(i=[r[0].dims[0],r[1].dims[1],r[1].dims[2],r[0].dims[3]],[wn,Nn,Tr,vr]=[0,3,1,2]);let a=E("output",r[0].dataType,i.length),s=n.type.value,u=S.size(i),l=[{type:12,data:u},...D(r[0].dims,t,i)],c=d=>`
  ${d.registerUniform("output_size","u32").declareVariables(n,o,a)}
  ${d$}
  ${p$(s)}
  ${f$(e)}
  ${h$(e)}
  ${m$(n,s,e)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Tr}]);
      let W_in = i32(uniforms.x_shape[${vr}]);

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
      var grid_indices = vec3<u32>(indices[${wn}], indices[${Tr}], indices[${vr}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${g$(a,s,e)}
  }`;return{name:"GridSample",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:["type","type"]},getRunData:d=>{let p=S.size(i);return{outputs:[{dims:i,dataType:d[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:l}},getShaderSource:c}},Oy=(r,e)=>{c$(r.inputs),r.compute(b$(r.inputs,e))},Ey=r=>K({alignCorners:r.align_corners,mode:r.mode,paddingMode:r.padding_mode,format:r.format})});var rt,x$,ky,Dy,T$,eo,Ly,al=$(()=>{"use strict";j();Q();Oe();Ai();ki();ne();vn();rt=(r,e)=>r.length>e&&r[e].dims.length>0?r[e]:void 0,x$=(r,e)=>{let n=r[0],t=rt(r,1),o=rt(r,2),i=rt(r,3),a=rt(r,4),s=rt(r,5),u=rt(r,6),l=rt(r,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=n.dims[0],d=n.dims[1],p=n.dims.length===3?n.dims[2]:e.numHeads*n.dims[4],f=d,h=0,m=0,y=Math.floor(p/e.numHeads);if(u&&l&&S.size(u.dims)&&S.size(l.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==c||u.dims[1]!==e.numHeads||u.dims[3]!==y)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==c||l.dims[1]!==e.numHeads||l.dims[3]!==y)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');h=u.dims[2],m=u.dims[2]}else if(u&&S.size(u.dims)||l&&S.size(l.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let g;if(t&&S.size(t.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(t.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');g=2,f=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==y)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');g=5,f=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==y)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');g=0,f=t.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==e.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');g=3}if(i&&S.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(t&&t.dims.length===5&&t.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let b=h+f,_=0;if(a&&S.size(a.dims)>0){_=8;let P=a.dims;throw P.length===1?P[0]===c?_=1:P[0]===3*c+2&&(_=3):P.length===2&&P[0]===c&&P[1]===b&&(_=5),_===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let T=!1,w=p;if(o&&S.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(f!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');w=o.dims[2]}else{if(f!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');w=o.dims[1]*o.dims[3],T=!0}}let I=!1;if(a&&S.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(s&&S.size(s.dims)>0){if(s.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(s.dims[0]!==c||s.dims[1]!==e.numHeads||s.dims[2]!==d||s.dims[3]!==b)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:d,pastSequenceLength:h,kvSequenceLength:f,totalSequenceLength:b,maxSequenceLength:m,inputHiddenSize:0,hiddenSize:p,vHiddenSize:w,headSize:y,vHeadSize:Math.floor(w/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:_,scale:e.scale,broadcastResPosBias:I,passPastInKv:T,qkvFormat:g}},ky=r=>K({...r}),Dy=K({perm:[0,2,1,3]}),T$=(r,e,n,t,o,i,a)=>{let s=[t,o,i],u=S.size(s),l=[{type:12,data:u},{type:12,data:a},{type:12,data:i}],c=d=>{let p=E("qkv_with_bias",e.dataType,s),f=A("qkv",e.dataType,s),h=A("bias",n.dataType,s),m=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${d.registerUniforms(m).declareVariables(f,h,p)}
  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return r.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:s,dataType:e.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:c},{inputs:[e,n],outputs:[-1]})[0]},eo=(r,e,n,t,o,i,a,s)=>{let u=i;if(a&&S.size(a.dims)>0){if(t===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=T$(r,i,a,e,t,n*o,s),u=u.reshape([e,t,n,o]),n===1||t===1?u:r.compute(Fe(u,Dy.perm),{inputs:[u],outputs:[-1]})[0]}else return i.dims.length===3&&(u=i.reshape([e,t,n,o])),n===1||t===1?u:r.compute(Fe(u,Dy.perm),{inputs:[u],outputs:[-1]})[0]},Ly=(r,e)=>{let n=x$(r.inputs,e),t=r.inputs[0],o=rt(r.inputs,1),i=rt(r.inputs,2),a=rt(r.inputs,3),s=rt(r.inputs,4),u=rt(r.inputs,5),l=rt(r.inputs,6),c=rt(r.inputs,7);if(t.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let d=o&&i&&o.dims.length===4&&i.dims.length===4,p=eo(r,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t,a,0);if(d)return xr(r,p,o,i,s,void 0,l,c,u,n);if(!o||!i)throw new Error("key and value must be provided");let f=eo(r,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,o,a,n.hiddenSize),h=eo(r,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,i,a,2*n.hiddenSize);xr(r,p,f,h,s,void 0,l,c,u,n)}});var v$,w$,I$,S$,sl,zy,Ry,ul=$(()=>{"use strict";j();Q();Oe();ne();v$=r=>{if(!r||r.length<1)throw new Error("too few inputs")},w$=(r,e)=>{let n=[],t=e.numOutputs;return r[1].dims[0]>0&&(r[1].getBigInt64Array().forEach(o=>n.push(Number(o))),t=n.length),K({numOutputs:t,axis:e.axis,splitSizes:n})},I$=r=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${r}u; i += 1u ) {
    if (index < ${B("uniforms.size_in_split_axis","i",r)}) {
        return i;
    }
    }
    return ${r}u;
}`,S$=r=>{let e=r.length,n=[];for(let t=0;t<e;++t){let o=r[t].setByIndices("indices","input[global_idx]");e===1?n.push(o):t===0?n.push(`if (output_number == ${t}u) { ${o} }`):t===e-1?n.push(`else { ${o} }`):n.push(`else if (output_number == ${t}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${r[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},sl=(r,e)=>{let n=r[0].dims,t=S.size(n),o=r[0].dataType,i=S.normalizeAxis(e.axis,n.length),a=new Array(e.numOutputs),s=A("input",o,n.length),u=new Array(e.numOutputs),l=[],c=[],d=0,p=[{type:12,data:t}];for(let h=0;h<e.numOutputs;h++){d+=e.splitSizes[h],u[h]=d;let m=n.slice();m[i]=e.splitSizes[h],c.push(m),a[h]=E(`output${h}`,o,m.length),l.push({dims:c[h],dataType:r[0].dataType})}p.push({type:12,data:u},...D(n,...c));let f=h=>`
  ${h.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(s,...a)}
  ${I$(u.length)}
  ${S$(a)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${s.offsetToIndices("global_idx")};
    var index = ${s.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${B("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${s.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:e.cacheKey,inputDependencies:["rank"]},getShaderSource:f,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(t/64)},programUniforms:p})}},zy=(r,e)=>{v$(r.inputs);let n=r.inputs.length===1?e:w$(r.inputs,e);r.compute(sl(r.inputs,n),{inputs:[0]})},Ry=r=>{let e=r.axis,n=r.splitSizes,t=r.numOutputs<0?n.length:r.numOutputs;if(t!==n.length)throw new Error("numOutputs and splitSizes lengh must be equal");return K({axis:e,numOutputs:t,splitSizes:n})}});var $$,A$,Ny,My,By=$(()=>{"use strict";Oe();ki();al();ul();vn();$$=(r,e)=>{if(e.doRotary)throw new Error("GroupQuerryAttention do_rotary attribute is not supported");if(e.doRotary&&r.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=r[0],t=r[1],o=r[2],i=r[3],a=r[4];if(e.localWindowSize!==-1)throw new Error("Local attention is not supported");if(e.softcap!==0)throw new Error("Softcap is not supported");if(e.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(e.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let s=!1,u=n.dims[0],l=n.dims[1],c=n.dims.length===3?s?n.dims[2]/3:n.dims[2]:e.numHeads*n.dims[4],d=l,p=0,f=!t||t.dims.length===0,h=Math.floor(f?c/(e.numHeads+2*e.kvNumHeads):c/e.numHeads);f&&(c=h*e.numHeads);let m=i&&i.dims.length!==0,y=a&&a.dims.length!==0;if(m&&i.dims.length===4&&i.dims[0]===u&&i.dims[1]!==e.kvNumHeads&&i.dims[2]===e.kvNumHeads&&i.dims[3]===h)throw new Error("BSNH pastKey/pastValue is not supported");if(m&&y){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');p=i.dims[2]}else if(m||y)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let b=1;if(t&&t.dims.length>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(n.dims[2]%t.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');d=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==h)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');d=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==h)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');d=t.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==e.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');b=3}let _=0,T=!1,w=e.kvNumHeads?h*e.kvNumHeads:c;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(d!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');w=o.dims[2]}else{if(d!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');w=o.dims[1]*o.dims[3],T=!0}}let I=r.length>4?r[5]:void 0;if(I&&I.dims.length!==1&&I.dims[0]!==u)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:u,sequenceLength:l,pastSequenceLength:p,kvSequenceLength:d,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:c,vHiddenSize:w,headSize:h,vHeadSize:Math.floor(w/e.kvNumHeads),numHeads:e.numHeads,kvNumHeads:e.kvNumHeads,nReps:e.numHeads/e.kvNumHeads,pastPresentShareBuffer:!1,maskType:_,scale:e.scale,broadcastResPosBias:!1,passPastInKv:T,qkvFormat:b}},A$=K({perm:[0,2,1,3]}),Ny=(r,e,n)=>{let t=e,o=n.kvNumHeads;return e.dims.length===3&&n.kvSequenceLength!==0&&(t=e.reshape([n.batchSize,n.kvSequenceLength,o,n.headSize]),t=r.compute(Fe(t,A$.perm),{inputs:[t],outputs:[-1]})[0]),t},My=(r,e)=>{let n=$$(r.inputs,e);if(r.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(r.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let t=r.inputs[0],o=r.inputs[1]&&r.inputs[1].dims.length>0?r.inputs[1]:void 0,i=r.inputs[2]&&r.inputs[2].dims.length>0?r.inputs[2]:void 0,a=r.inputs[3]&&r.inputs[3].dims.length!==0?r.inputs[3]:void 0,s=r.inputs[4]&&r.inputs[4].dims.length!==0?r.inputs[4]:void 0,u=r.inputs.length>4?r.inputs[5]:void 0,l=r.inputs.length>5?r.inputs[6]:void 0,c=n.kvNumHeads?n.kvNumHeads:n.numHeads,d=K({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,c*n.headSize,c*n.headSize]}),[p,f,h]=!o&&!i?r.compute(sl([t],d),{inputs:[t],outputs:[-1,-1,-1]}):[t,o,i],m=eo(r,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,p,void 0,0);xr(r,m,Ny(r,f,n),Ny(r,h,n),void 0,void 0,a,s,void 0,n,u,l)}});var Vy,P$,O$,Fy,Gy=$(()=>{"use strict";j();Q();vn();ne();Vy=(r,e,n,t,o,i,a,s)=>{let u=pe(i),l=u===1?"f32":`vec${u}f`,c=u===1?"vec2f":`mat2x${u}f`,d=o*a,p=64;d===1&&(p=256);let f=[o,a,i/u],h=[o,a,2],m=["rank","type","type"],y=[];y.push(...D(f,h));let g=b=>{let _=A("x",e.dataType,3,u),T=A("scale",n.dataType,n.dims),w=A("bias",t.dataType,t.dims),I=E("output",1,3,2),P=[_,T,w,I];return`
  var<workgroup> workgroup_shared : array<${c}, ${p}>;
  const workgroup_size = ${p}u;
  ${b.declareVariables(...P)}
  ${b.mainStart(p)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${l}(0);
    var squared_sum = ${l}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${l}(${_.get("batch","channel","h")});
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
      let sum_final = ${It("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${It("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${s}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return r.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${s};${p}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:h,dataType:1}],dispatchGroup:{x:d},programUniforms:y}),getShaderSource:g},{inputs:[e,n,t],outputs:[-1]})[0]},P$=(r,e,n)=>{let t=e[0].dims,o=t,i=2,a=t[0],s=t[1],u=S.sizeFromDimension(t,i),l=pe(u),c=S.size(o)/l,d=Vy(r,e[0],e[1],e[2],a,u,s,n.epsilon),p=[a,s,u/l],f=[a,s],h=["type","none"],m=y=>{let g=A("x",e[0].dataType,p.length,l),b=A("scale_shift",1,f.length,2),_=E("output",e[0].dataType,p.length,l),T=[g,b,_];return`
  ${y.registerUniform("output_size","u32").declareVariables(...T)}
  ${y.mainStart()}
  ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${_.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${b.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${g.getByOffset("global_idx")} * ${_.type.value}(scale_shift.x) + ${_.type.value}(scale_shift.y);
      ${_.setByOffset("global_idx","value")};
  }`};r.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...D(p,f,p)]}),getShaderSource:m},{inputs:[e[0],d]})},O$=(r,e,n)=>{let t=e[0].dims,o=t,i=t[0],a=t[t.length-1],s=S.sizeFromDimension(t,1)/a,u=pe(a),l=S.size(o)/u,c=[{type:12,data:s},{type:12,data:Math.floor(a/u)}],d=["type","type"],p=!1,f=[0,t.length-1];for(let g=0;g<t.length-2;g++)p=p||t[g+1]!==1,f.push(g+1);p=p&&t[t.length-1]!==1;let h=p?r.compute(Fe(r.inputs[0],f),{inputs:[r.inputs[0]],outputs:[-1]})[0]:r.inputs[0].reshape(Array.from({length:t.length},(g,b)=>t[f[b]])),m=Vy(r,h,e[1],e[2],i,s,a,n.epsilon),y=g=>{let b=xe(e[0].dataType),_=u===1?"vec2f":`mat${u}x2f`,T=P=>{let O=P===0?"x":"y",C=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${b}(${C}(scale.${O}))`;case 2:return`vec2<${b}>(${C}(scale[0].${O}, scale[1].${O}))`;case 4:return`vec4<${b}>(${C}(scale[0].${O}, scale[1].${O}, scale[2].${O}, scale[3].${O}))`;default:throw new Error(`Not supported compoents ${u}`)}},w=A("input",e[0].dataType,e[0].dims,u),I=E("output",e[0].dataType,o,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${w.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${_}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${I.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${g.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${T(0)}, ${T(1)});
  }`};r.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:y},{inputs:[e[0],m]})},Fy=(r,e)=>{e.format==="NHWC"?O$(r,r.inputs,e):P$(r,r.inputs,e)}});var E$,C$,Uy,Wy=$(()=>{"use strict";j();Q();ne();E$=r=>{if(!r||r.length<2)throw new Error("layerNorm requires at least 2 inputs.")},C$=(r,e,n)=>{let t=e.simplified,o=r[0].dims,i=r[1],a=!t&&r[2],s=o,u=S.normalizeAxis(e.axis,o.length),l=S.sizeToDimension(o,u),c=S.sizeFromDimension(o,u),d=S.size(i.dims),p=a?S.size(a.dims):0;if(d!==c||a&&p!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${d} and bias size of ${p}`);let f=[];for(let w=0;w<o.length;++w)w<u?f.push(o[w]):f.push(1);let h=pe(c),m=["type","type"],y=[{type:12,data:l},{type:1,data:c},{type:12,data:Math.floor(c/h)},{type:1,data:e.epsilon}];a&&m.push("type");let g=n>1,b=n>2,_=w=>{let I=xe(r[0].dataType),P=[A("x",r[0].dataType,r[0].dims,h),A("scale",i.dataType,i.dims,h)];a&&P.push(A("bias",a.dataType,a.dims,h)),P.push(E("output",r[0].dataType,s,h)),g&&P.push(E("mean_data_output",1,f)),b&&P.push(E("inv_std_output",1,f));let O=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${w.registerUniforms(O).declareVariables(...P)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Hu("f32",h)};
    var mean_square_vector = ${Hu("f32",h)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${rr(I,h,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${It("mean_vector",h)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${It("mean_square_vector",h)} / uniforms.norm_size ${t?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${rr(I,h,"x[j + offset]")};
      let f32scale = ${rr(I,h,"scale[j]")};
      output[j + offset] = ${P[0].type.value}((f32input ${t?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${rr(I,h,"bias[j]")}`:""}
      );
    }

    ${g?"mean_data_output[global_idx] = mean":""};
    ${b?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},T=[{dims:s,dataType:r[0].dataType}];return g&&T.push({dims:f,dataType:1}),b&&T.push({dims:f,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${h};${n};${t}`,inputDependencies:m},getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:y}),getShaderSource:_}},Uy=(r,e)=>{E$(r.inputs),r.compute(C$(r.inputs,e,r.outputCount))}});var D$,Hy,qy=$(()=>{"use strict";Q();Bi();Vi();D$=r=>{if(!r||r.length!==2)throw new Error("MatMul requires 2 inputs.");if(r[0].dims[r[0].dims.length-1]!==r[1].dims[r[1].dims.length-2])throw new Error("shared dimension does not match.")},Hy=r=>{D$(r.inputs);let e=fn.calcShape(r.inputs[0].dims,r.inputs[1].dims,!0);if(!e)throw new Error("Can't use matmul on the given tensors");let n=e[e.length-1],t=r.inputs[0].dims[r.inputs[0].dims.length-1];if(n<8&&t<8)r.compute(Mi(r.inputs,{activation:""},e));else{let o=e[e.length-2],i=S.size(r.inputs[0].dims.slice(0,-2)),a=S.size(r.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&a===1){let s=r.inputs[0].reshape([1,i,t]),u=r.inputs[1].reshape([1,t,n]),l=[1,i,n],c=[s,u];r.compute(Yr(c,{activation:""},e,l),{inputs:c})}else r.compute(Yr(r.inputs,{activation:""},e))}}});var k$,L$,z$,jy,Ky,Xy=$(()=>{"use strict";j();Q();Oe();ne();k$=(r,e)=>{if(r.length<3||r.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=r[0],t=n.dims.length;if(n.dims[t-1]!==e.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((e.k+e.blockSize-1)/e.blockSize),i=e.blockSize/8*e.bits,a=r[1];if(!S.areEqual(a.dims,[e.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=r[2].dims;if(S.size(u)!==e.n*o)throw new Error("scales input size error.");if(r.length===4){let c=r[3].dims,d=e.bits>4?e.n*o:e.n*Math.floor((o+1)/2);if(S.size(c)!==d)throw new Error("zeroPoints input size error.")}},L$=(r,e)=>{let n=r[0].dims,t=n.length,o=n[t-2],i=e.k,a=e.n,s=n.slice(0,t-2),u=S.size(s),c=r[1].dims[2]/4,d=r[0].dataType,p=pe(e.k),f=pe(c),h=pe(a),m=s.concat([o,a]),y=o>1&&a/h%2===0?2:1,g=S.size(m)/h/y,b=64,_=[],T=[u,o,i/p],w=S.convertShape(r[1].dims).slice();w.splice(-1,1,c/f),_.push(...D(T)),_.push(...D(w)),_.push(...D(r[2].dims)),r.length===4&&_.push(...D(S.convertShape(r[3].dims)));let I=[u,o,a/h];_.push(...D(I));let P=O=>{let C=T.length,M=A("a",r[0].dataType,C,p),V=A("b",12,w.length,f),Y=A("scales",r[2].dataType,r[2].dims.length),L=[M,V,Y],X=r.length===4?A("zero_points",12,r[3].dims.length):void 0;X&&L.push(X);let $e=I.length,U=E("output",r[0].dataType,$e,h),te=xe(r[0].dataType),ie=(()=>{switch(p){case 1:return`array<${te}, 8>`;case 2:return`mat4x2<${te}>`;case 4:return`mat2x4<${te}>`;default:throw new Error(`${p}-component is not supported.`)}})(),Z=()=>{let De=`
          // reuse a data
            var input_offset = ${M.indicesToOffset(`${M.type.indices}(batch, row, word_offset)`)};
            var a_data: ${ie};
            for (var j: u32 = 0; j < ${8/p}; j++) {
              a_data[j] = ${M.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let de=0;de<h*y;de++)De+=`
            b_value = ${f===1?`b${de}_data`:`b${de}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${ie}(${Array.from({length:4},(z,W)=>`${te}(b_value_lower[${W}]), ${te}(b_value_upper[${W}])`).join(", ")});
            b_dequantized_values = ${p===1?`${ie}(${Array.from({length:8},(z,W)=>`(b_quantized_values[${W}] - ${X?`zero_point${de}`:"zero_point"}) * scale${de}`).join(", ")});`:`(b_quantized_values - ${ie}(${Array(8).fill(`${X?`zero_point${de}`:"zero_point"}`).join(",")})) * scale${de};`};
            workgroup_shared[local_id.x * ${y} + ${Math.floor(de/h)}]${h>1?`[${de%h}]`:""} += ${Array.from({length:8/p},(z,W)=>`${p===1?`a_data[${W}] * b_dequantized_values[${W}]`:`dot(a_data[${W}], b_dequantized_values[${W}])`}`).join(" + ")};
          `;return De},ve=()=>{let De=`
            var col_index = col * ${h};
            ${X?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${te}(8);`}
            `;for(let de=0;de<h*y;de++)De+=`
            let scale${de} = ${Y.getByOffset("col_index * nBlocksPerCol + block")};
            ${X?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${X.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${de} = ${te}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return De},ot=()=>{let De=`col_index = col * ${h};`;for(let de=0;de<h*y;de++)De+=`
            let b${de}_data = ${V.getByIndices(`${V.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return De+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ie};
            var b_dequantized_values: ${ie};`,De};return`
        var<workgroup> workgroup_shared: array<${U.type.value}, ${y*b}>;
        ${O.declareVariables(...L,U)}
        ${O.mainStart([b,1,1])}
          let output_indices = ${U.offsetToIndices(`(global_idx / ${b}) * ${y}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${b}) {
            //process one block
            var word_offset: u32 = block * ${e.blockSize/p};
            ${ve()}
            for (var word: u32 = 0; word < ${c}; word += ${f}) {
              ${ot()}
              for (var i: u32 = 0; i < ${f}; i++) {
                ${Z()}
                word_offset += ${8/p};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${y}) {
            var output_value: ${U.type.value} = ${U.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${b}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${y};
            }
            ${U.setByIndices(`${U.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${e.blockSize};${e.bits};${p};${f};${h};${y};${b}`,inputDependencies:Array(r.length).fill("rank")},getRunData:()=>({outputs:[{dims:m,dataType:d}],dispatchGroup:{x:g},programUniforms:_}),getShaderSource:P}},z$=(r,e)=>{let n=r[0].dims,t=n.length,o=n[t-2],i=e.k,a=e.n,s=n.slice(0,t-2),u=S.size(s),c=r[1].dims[2]/4,d=r[0].dataType,p=pe(e.k),f=pe(c),h=s.concat([o,a]),m=128,y=a%8===0?8:a%4===0?4:1,g=m/y,b=g*f*8,_=b/p,T=b/e.blockSize,w=S.size(h)/y,I=[],P=[u,o,i/p],O=S.convertShape(r[1].dims).slice();O.splice(-1,1,c/f),I.push(...D(P)),I.push(...D(O)),I.push(...D(r[2].dims)),r.length===4&&I.push(...D(S.convertShape(r[3].dims)));let C=[u,o,a];I.push(...D(C));let M=V=>{let Y=P.length,L=A("a",r[0].dataType,Y,p),X=A("b",12,O.length,f),$e=A("scales",r[2].dataType,r[2].dims.length),U=[L,X,$e],te=r.length===4?A("zero_points",12,r[3].dims.length):void 0;te&&U.push(te);let ie=C.length,Z=E("output",r[0].dataType,ie),ve=xe(r[0].dataType),ot=()=>{switch(p){case 1:return`
          let a_data0 = vec4<${ve}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ve}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${ve}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ve}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${p}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${L.type.value}, ${_}>;
        var<workgroup> inter_results: array<array<${Z.type.value}, ${g}>, ${y}>;
        ${V.declareVariables(...U,Z)}
        ${V.mainStart([g,y,1])}
          let output_indices = ${Z.offsetToIndices(`workgroup_index * ${y}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${T} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${_};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${_}; a_offset += ${m})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${L.getByIndices(`${L.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${L.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${T} + local_id.x;
            ${te?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${te.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${ve}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${ve}(8);`}
            let scale = ${$e.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${X.getByIndices(`${X.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${e.blockSize/p};
            for (var i: u32 = 0; i < ${f}; i++) {
              ${ot()}
              let b_value = ${f===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${ve}>(${Array.from({length:4},(De,de)=>`${ve}(b_value_lower[${de}]), ${ve}(b_value_upper[${de}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${ve}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(De,de)=>`${`dot(a_data${de}, b_dequantized_values[${de}])`}`).join(" + ")};
              word_offset += ${8/p};
            }
            workgroupBarrier();
          }

          if (local_idx < ${y}) {
            var output_value: ${Z.type.value} = ${Z.type.value}(0);
            for (var b = 0u; b < ${g}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${Z.setByIndices(`${Z.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${e.blockSize};${p};${f};${g};${y}`,inputDependencies:Array(r.length).fill("rank")},getRunData:()=>({outputs:[{dims:h,dataType:d}],dispatchGroup:{x:w},programUniforms:I}),getShaderSource:M}},jy=(r,e)=>{k$(r.inputs,e),e.blockSize===32&&r.adapterInfo.isVendor("intel")&&r.adapterInfo.isArchitecture("gen-12lp")?r.compute(z$(r.inputs,e)):r.compute(L$(r.inputs,e))},Ky=r=>K(r)});var R$,N$,M$,B$,V$,F$,G$,U$,Zy,Jy=$(()=>{"use strict";j();Q();ne();R$=r=>{if(!r||r.length<1)throw new Error("Too few inputs");if(r[0].dataType!==1&&r[0].dataType!==10)throw new Error("Input type must be float or float16.");if(r.length>=2){let e=r[0].dims.length*2===r[1].dims[0];if(r.length===4&&(e=r[3].dims[0]*2===r[1].dims[0]),!e)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},N$=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
            k = i32(${r.indicesGet("indices",o)}) - ${B("uniforms.pads",o,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${B("uniforms.x_shape",o,e)})) {
              break;
            }
            offset += k * i32(${B("uniforms.x_strides",o,e)});
        `;return`
          value = ${r.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${t}
            value = x[offset];
          }
      `},M$=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${B("uniforms.pads",o,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${B("uniforms.x_shape",o,e)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${B("uniforms.x_shape",o,e)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${B("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},B$=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${B("uniforms.pads",o,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${B("uniforms.x_shape",o,e)})) {
                  k = i32(${B("uniforms.x_shape",o,e)}) - 1;
                }
                offset += k * i32(${B("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},V$=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${B("uniforms.pads",o,n)};
                if (k < 0)  {
                  k += i32(${B("uniforms.x_shape",o,e)}]);
                }
                if (k >= i32(${B("uniforms.x_shape",o,e)})) {
                  k -= i32(${B("uniforms.x_shape",o,e)});
                }
                offset += k * i32(${B("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},F$=(r,e,n)=>{switch(n.mode){case 0:return N$(r,e,n.pads.length);case 1:return M$(r,e,n.pads.length);case 2:return B$(r,e,n.pads.length);case 3:return V$(r,e,n.pads.length);default:throw new Error("Invalid mode")}},G$=(r,e)=>{let n=S.padShape(r[0].dims.slice(),e.pads),t=r[0].dims,o=S.size(n),i=[{type:12,data:o},{type:6,data:e.pads}],a=r.length>=3&&r[2].data;e.mode===0&&i.push({type:a?r[2].dataType:1,data:e.value}),i.push(...D(r[0].dims,n));let s=["rank"],u=l=>{let c=E("output",r[0].dataType,n.length),d=A("x",r[0].dataType,t.length),p=d.type.value,f=F$(c,t.length,e),h=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:e.pads.length}];return e.mode===0&&h.push({name:"constant_value",type:a?p:"f32"}),`
            ${l.registerUniforms(h).declareVariables(d,c)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${p}(0);
            ${f}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${e.mode}${a}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(S.size(n)/64)},programUniforms:i}),getShaderSource:u}},U$=(r,e)=>{if(r.length>1){let n=r[1].getBigInt64Array(),t=r.length>=3&&r[2].data?r[2].dataType===10?r[2].getUint16Array()[0]:r[2].getFloat32Array()[0]:0,o=r[0].dims.length,i=new Int32Array(2*o).fill(0);if(r.length>=4){let s=r[3].getBigInt64Array();for(let u=0;u<s.length;u++)i[Number(s[u])]=Number(n[u]),i[Number(s[u])+o]=Number(n[u+s.length])}else n.forEach((s,u)=>i[Number(u)]=Number(s));let a=[];return i.forEach(s=>a.push(s)),{mode:e.mode,value:t,pads:a}}else return e},Zy=(r,e)=>{R$(r.inputs);let n=U$(r.inputs,e);r.compute(G$(r.inputs,n),{inputs:[0]})}});var Ui,Qy,Yy,e_,t_,W$,H$,n_,r_,o_,i_,a_,s_,u_,l_,c_,d_,p_,f_,h_=$(()=>{"use strict";qe();j();Q();ne();Ui=r=>{if(J.webgpu.validateInputContent&&(!r||r.length!==1))throw new Error("Pool ops requires 1 input.")},Qy=(r,e,n)=>{let t=e.format==="NHWC",o=r.dims.slice();t&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(e,"dilations"),a=e.kernelShape.slice(),s=e.strides.slice(),u=i?e.dilations.slice():[],l=e.pads.slice();tr.adjustPoolAttributes(n,o,a,s,u,l);let c=tr.computePoolOutputShape(n,o,s,u,a,l,e.autoPad),d=Object.assign({},e);i?Object.assign(d,{kernelShape:a,strides:s,pads:l,dilations:u,cacheKey:e.cacheKey}):Object.assign(d,{kernelShape:a,strides:s,pads:l,cacheKey:e.cacheKey});let p=c.slice();return p.push(p.splice(1,1)[0]),[d,t?p:c]},Yy=(r,e)=>{let n=e.format==="NHWC",t=S.size(r),o=S.size(e.kernelShape),i=[{type:12,data:t},{type:12,data:o}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(e.kernelShape.length<=2){let s=e.kernelShape[e.kernelShape.length-1],u=e.strides[e.strides.length-1],l=e.pads[e.pads.length/2-1],c=e.pads[e.pads.length-1],d=!!(l+c);i.push({type:12,data:s},{type:12,data:u},{type:12,data:l},{type:12,data:c}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let p=!1;if(e.kernelShape.length===2){let f=e.kernelShape[e.kernelShape.length-2],h=e.strides[e.strides.length-2],m=e.pads[e.pads.length/2-2],y=e.pads[e.pads.length-2];p=!!(m+y),i.push({type:12,data:f},{type:12,data:h},{type:12,data:m},{type:12,data:y}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,d,p]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let s=S.computeStrides(e.kernelShape);i.push({type:12,data:s},{type:12,data:e.pads},{type:12,data:e.strides}),a.push({name:"kernelStrides",type:"u32",length:s.length},{name:"pads",type:"u32",length:e.pads.length},{name:"strides",type:"u32",length:e.strides.length});let u=e.pads.reduce((l,c)=>l+c);return[i,a,!!u,!1,!1]}},e_=(r,e,n,t,o,i,a,s,u,l,c,d)=>{let p=o.format==="NHWC",f=e.type.value,h=E("output",e.type.tensor,t);if(o.kernelShape.length<=2){let m="",y="",g="",b=n-(p?2:1);if(c?m=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${b}] < 0 || xIndices[${b}]
                      >= uniforms.x_shape[${b}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`:m=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let T=n-(p?3:2);d?y=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${T}] < 0 || xIndices[${T}] >= uniforms.x_shape[${T}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:y=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                `,g=`
              }
            `}return`
            ${r.registerUniforms(u).declareVariables(e,h)}

            ${r.mainStart()}
              ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${h.offsetToIndices("global_idx")};
              var xIndices = ${h.offsetToIndices("global_idx")};

              var value = ${f}(${s});
              var pad = 0;
              ${y}
              ${m}
              ${g}
              ${a}

              output[global_idx] = value;
            }`}else{if(p)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let m=o.kernelShape.length,y=o.pads.length,g="";return l?g=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${e.indicesToOffset("xIndices")}];
                ${i}
              }`:g=`
              }
              let x_val = x[${e.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${r.registerUniforms(u).declareVariables(e,h)}

            ${r.mainStart()}
              ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${h.offsetToIndices("global_idx")};
              var xIndices = ${h.offsetToIndices("global_idx")};

              var offsets: array<u32, ${m}>;

              var value = ${f}(${s});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${m-1}u; j++) {
                  offsets[j] = offset / ${B("uniforms.kernelStrides","j",m)};
                  offset -= offsets[j] * ${B("uniforms.kernelStrides","j",m)};
                }
                offsets[${m-1}] = offset;

                isPad = false;
                for (var j = ${n-m}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${B("uniforms.strides",`j - ${n-m}u`,m)}
                    + offsets[j - ${n-m}u] - ${B("uniforms.pads","j - 2u",y)};
                  ${g}
              }
              ${a}

              output[global_idx] = value;
            }`}},t_=r=>`${r.format};${r.ceilMode};${r.autoPad};${r.kernelShape.length}`,W$=r=>`${t_(r)};${r.countIncludePad}`,H$=r=>`${t_(r)};${r.storageOrder};${r.dilations}`,n_=r=>({format:r.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][r.auto_pad],ceilMode:r.ceil_mode,kernelShape:r.kernel_shape,strides:r.strides,pads:r.pads}),r_=(r,e,n,t)=>{let[o,i]=Qy(e,t,n),a=A("x",e.dataType,e.dims.length),s=a.type.value,u="value += x_val;",l="";o.countIncludePad?l+=`value /= ${s}(uniforms.kernelSize);`:l+=`value /= ${s}(i32(uniforms.kernelSize) - pad);`;let[c,d,p,f,h]=Yy(i,o);c.push(...D(e.dims,i));let m=["rank"];return{name:r,shaderCache:{hint:`${t.cacheKey};${p};${f};${h}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(S.size(i)/64)},programUniforms:c}),getShaderSource:y=>e_(y,a,e.dims.length,i.length,o,u,l,0,d,p,f,h)}},o_=r=>{let e=r.count_include_pad!==0,n=n_(r);if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let t={countIncludePad:e,...n,cacheKey:""};return{...t,cacheKey:W$(t)}},i_=(r,e)=>{Ui(r.inputs),r.compute(r_("AveragePool",r.inputs[0],!1,e))},a_={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},s_=r=>{let e=r.format;return{format:e,...a_,cacheKey:e}},u_=(r,e)=>{Ui(r.inputs),r.compute(r_("GlobalAveragePool",r.inputs[0],!0,e))},l_=(r,e,n,t)=>{let[o,i]=Qy(e,t,n),a=`
      value = max(x_val, value);
    `,s="",u=A("x",e.dataType,e.dims.length),l=["rank"],[c,d,p,f,h]=Yy(i,o);return c.push(...D(e.dims,i)),{name:r,shaderCache:{hint:`${t.cacheKey};${p};${f};${h}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(S.size(i)/64)},programUniforms:c}),getShaderSource:m=>e_(m,u,e.dims.length,i.length,o,a,s,e.dataType===10?-65504:-1e5,d,p,f,h)}},c_=(r,e)=>{Ui(r.inputs),r.compute(l_("MaxPool",r.inputs[0],!1,e))},d_=r=>{let e=r.storage_order,n=r.dilations,t=n_(r);if(e!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(t.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:e,dilations:n,...t,cacheKey:""};return{...o,cacheKey:H$(o)}},p_=r=>{let e=r.format;return{format:e,...a_,cacheKey:e}},f_=(r,e)=>{Ui(r.inputs),r.compute(l_("GlobalMaxPool",r.inputs[0],!0,e))}});var j$,K$,m_,g_,b_=$(()=>{"use strict";j();Q();Oe();ne();j$=(r,e)=>{if(r.length<2||r.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(r.length===3&&r[1].dims===r[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(r.length===3&&r[0].dataType!==r[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(r[0].dataType===6&&r.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(r[1].dims.length!==0&&r[1].dims.length!==1&&r[1].dims.length!==r[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(r.length>2){if(r[0].dataType!==r[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(r[1].dims.length!==r[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!r[1].dims.map((n,t)=>n===r[2].dims[t]).reduce((n,t)=>n&&t,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(e.blockSize>0){if(r[1].dims.length===0||r[1].dims.length===1&&r[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!r[1].dims.map((o,i)=>i===e.axis||o===r[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(r[1].dims.length!==r[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=r[0].dims[e.axis],t=r[1].dims[e.axis];if(e.blockSize<Math.ceil(n/t)||e.blockSize>Math.ceil(n/(t-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},K$=(r,e)=>{let n=S.normalizeAxis(e.axis,r[0].dims.length),t=r[0].dataType,o=t===3,i=r[0].dims,a=r[1].dataType,s=S.size(i),u=t===3||t===2,l=u?[Math.ceil(S.size(r[0].dims)/4)]:r[0].dims,c=r[1].dims,d=r.length>2?r[2]:void 0,p=d?u?[Math.ceil(S.size(d.dims)/4)]:d.dims:void 0,f=c.length===0||c.length===1&&c[0]===1,h=f===!1&&c.length===1,m=pe(s),y=f&&(!u||m===4),g=y?m:1,b=y&&!u?m:1,_=A("input",u?12:t,l.length,b),T=A("scale",a,c.length),w=d?A("zero_point",u?12:t,p.length):void 0,I=E("output",a,i.length,g),P=[_,T];w&&P.push(w);let O=[l,c];d&&O.push(p);let C=[{type:12,data:s/g},{type:12,data:n},{type:12,data:e.blockSize},...D(...O,i)],M=V=>{let Y=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${V.registerUniforms(Y).declareVariables(...P,I)}
      ${V.mainStart()}
          ${V.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${I.offsetToIndices("global_idx")};

          // Set input x
          ${u?`
            let input = ${_.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${g===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${_.getByOffset("global_idx")};`};

          // Set scale input
          ${f?`let scale_value= ${T.getByOffset("0")}`:h?`
            let scale_index = ${I.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${T.getByOffset("scale_index")};`:`
            var scale_indices: ${T.type.indices} = output_indices;
            let index = ${T.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${T.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${T.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${w?f?u?`
                let zero_point_input = ${w.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${w.getByOffset("0")}`:h?u?`
                let zero_point_index = ${I.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${w.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${I.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${w.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${T.indicesToOffset("scale_indices")};
                let zero_point_input = ${w.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${w.getByIndices("scale_indices")};`:`let zero_point_value = ${u?o?"i32":"u32":_.type.value}(0);`};
      // Compute and write output
      ${I.setByOffset("global_idx",`${I.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:e.cacheKey,inputDependencies:w?["rank","rank","rank"]:["rank","rank"]},getShaderSource:M,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(s/g/64),y:1,z:1},programUniforms:C})}},m_=(r,e)=>{j$(r.inputs,e),r.compute(K$(r.inputs,e))},g_=r=>K({axis:r.axis,blockSize:r.blockSize})});var X$,Z$,y_,__=$(()=>{"use strict";qe();j();ne();X$=(r,e,n)=>{let t=r===e,o=r<e&&n<0,i=r>e&&n>0;if(t||o||i)throw new Error("Range these inputs' contents are invalid.")},Z$=(r,e,n,t)=>{let o=Math.abs(Math.ceil((e-r)/n)),i=[o],a=o,s=[{type:12,data:a},{type:t,data:r},{type:t,data:n},...D(i)],u=l=>{let c=E("output",t,i.length),d=c.type.value,p=[{name:"outputSize",type:"u32"},{name:"start",type:d},{name:"delta",type:d}];return`
        ${l.registerUniforms(p).declareVariables(c)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${d}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${t}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:s})}},y_=r=>{let e=0,n=0,t=0;r.inputs[0].dataType===6?(e=r.inputs[0].getInt32Array()[0],n=r.inputs[1].getInt32Array()[0],t=r.inputs[2].getInt32Array()[0]):r.inputs[0].dataType===1&&(e=r.inputs[0].getFloat32Array()[0],n=r.inputs[1].getFloat32Array()[0],t=r.inputs[2].getFloat32Array()[0]),J.webgpu.validateInputContent&&X$(e,n,t),r.compute(Z$(e,n,t,r.inputs[0].dataType),{inputs:[]})}});var J$,Q$,x_,T_,v_=$(()=>{"use strict";j();Q();Oe();ne();J$=(r,e,n,t)=>{if(r!=="none"&&t!=="i32"&&t!=="u32"&&t!=="f32")throw new Error(`Input ${t} is not supported with reduction ${r}.`);let o=`{
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
                ${o}max(bitcast<f32>(oldValue), (${n}))${i}`;case"min":return t==="i32"||t==="u32"?`atomicMin(&${e}, bitcast<${t}>(${n}));`:`${o}min(bitcast<${t}>(oldValue), (${n}))${i}`;case"mul":return`${o}(bitcast<${t}>(oldValue) * (${n}))${i}`;default:throw new Error(`Reduction ${r} is not supported.`)}},Q$=(r,e)=>{let n=r[0].dims,t=r[1].dims,o=n,i=1,a=Math.ceil(S.size(t)/i),s=t[t.length-1],u=S.sizeFromDimension(n,s),l=[{type:12,data:a},{type:12,data:s},{type:12,data:u},...D(r[1].dims,r[2].dims,o)],c=d=>{let p=A("indices",r[1].dataType,r[1].dims.length),f=A("updates",r[2].dataType,r[2].dims.length,i),h=e.reduction!=="none"&&e.reduction!==""?Xm("output",r[0].dataType,o.length):E("output",r[0].dataType,o.length,i);return`
      ${d.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(p,f,h)}
      ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${e.reduction==="none"}) {
    let n = ${S.size(t)};
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
  if (${e.reduction==="none"} && hasDuplicates) {
    if (global_idx != 0u) {
      return;
    }
    indices_start = 0u;
  }
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${r[0].dims.length===1?`
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
    ${J$(e.reduction,"output[data_offset + i]","value",h.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${e.cacheKey}_${e.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l}),getShaderSource:c}},x_=r=>K({reduction:r.reduction}),T_=(r,e)=>{r.compute(Q$(r.inputs,e),{inputs:[r.inputs[1],r.inputs[2]],outputs:[]})}});var Y$,eA,tA,w_,nA,rA,oA,iA,aA,sA,uA,lA,I_,cA,dA,pA,fA,hA,S_,$_,A_=$(()=>{"use strict";j();Q();Oe();ne();Y$=(r,e)=>{if(r.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),r.length>0){if(e.mode==="linear"){if(!(r.length===2||r.length===3||r.length===4&&r[0]===1&&r[1]===1||r.length===4&&r[0]===1&&r[3]===1||r.length===5&&r[0]===1&&r[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(e.mode==="cubic"&&!(r.length===2||r.length===4&&r[0]===1&&r[1]===1||r.length===4&&r[0]===1&&r[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},eA=(r,e,n)=>{e.every(o=>o>=0&&o<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let t=new Array(n).fill(1);return e.forEach((o,i)=>t[o]=r[i]),t},tA=(r,e,n,t,o,i)=>{let[a,s,u]=n>10?[1,2,3]:[-1,r.length>1?1:-1,-1],l=r[0].dims.length;if(a>0&&r.length>a&&r[a].dims.length>0)r[a].getFloat32Array().forEach(c=>i.push(c));else if(e.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(s>0&&r.length>s&&r[s].dims.length===1&&r[s].dims[0]>0){if(r[s].getFloat32Array().forEach(c=>t.push(c)),t.length!==0&&t.length!==l&&n>=18&&t.length!==e.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Y$(t,e),e.axes.length>0&&eA(t,e.axes,l).forEach((c,d)=>t[d]=c)}if(u>0&&r.length>u&&r[u].dims.length===1&&r[u].dims[0]>0&&(r[u].getBigInt64Array().forEach(c=>o.push(Number(c))),o.length!==0&&o.length!==l&&n>=18&&o.length!==e.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(e.axes.length>0){if(t.length!==0&&t.length!==e.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==e.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof t<"u"&&typeof o<"u"&&t.length>0&&o.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},w_=(r,e,n,t)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${r}) * (${e});
  let whole = ${t}(big / (${n}));
  let fract = ${t}(big % (${n})) / ${t}(${n});
  return whole + fract;
`,nA=(r,e)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${e} { `+(()=>{switch(r){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${e}(xResized) / ${e}(xScale);
          } else {
            ${w_("xResized","lengthOriginal","lengthResized",e)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${e}(xResized) + 0.5) / ${e}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${e}(xResized) + 0.5) / ${e}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${w_("xResized","lengthOriginal - 1","lengthResized - 1",e)}
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
                  return offset + ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;case"half_pixel":return`return ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${r} is not supported`)}})()+"}",rA=(r,e,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(r){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(e<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${r} is not supported`)}})()+"}",oA=(r,e,n)=>{let t=new Array(n).fill(0).concat(new Array(n).fill(1)),o=r.length===0?t:r.slice();return e.length>0?(e.forEach((i,a)=>{t[i]=o[a],t[a+n]=o[e.length+a]}),t):o},iA=(r,e,n,t)=>{let o=[];if(n.length>0)if(t.length>0){if(r.forEach(i=>o.push(i)),Math.max(...t)>r.length)throw new Error("axes is out of bound");t.forEach((i,a)=>o[i]=n[a])}else n.forEach(i=>o.push(i));else{if(e.length===0)throw new Error("Resize requires either scales or sizes.");o=r.map((i,a)=>Math.round(i*e[a]))}return o},aA=(r,e,n)=>{let t=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(i=>e[i]),Number.MAX_VALUE):Math.min(...e,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(i=>e[i]),Number.MIN_VALUE):Math.max(...e,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();e.fill(1,0,e.length);let o=r.slice();return n.axes.length>0?(n.axes.forEach(i=>e[i]=t),n.axes.forEach(i=>o[i]=Math.round(r[i]*e[i]))):(e.fill(t,0,e.length),o.forEach((i,a)=>o[a]=Math.round(i*e[a]))),o},sA=(r,e,n,t,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${r.type.indices}) -> array<${r.type.value}, ${n.length}> {
      var original_indices: array<${r.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${r.indicesGet("output_indices","i")};
        var scale = ${B("uniforms.scales","i",t)};
        var roi_low = ${B("uniforms.roi","i",o)};
        var roi_hi = ${B("uniforms.roi",`i + ${e.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${r.type.value}(output_index);
        } else {
          var input_shape_i = ${B("uniforms.input_shape","i",e.length)};
          var output_shape_i = ${B("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,uA=(r,e,n,t,o,i,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> ${r.type.indices} {
      var input_indices: ${r.type.indices};
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${B("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${B("uniforms.roi","i",i)};
          var roi_hi = ${B("uniforms.roi",`i + ${n.length}`,i)};
          var input_shape_i = ${B("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${B("uniforms.output_shape","i",t.length)};
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
    }`,lA=(r,e)=>`
    fn checkInputIndices(input_indices: ${r.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${e.length}; i++) {
        var input_index = ${r.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${B("uniforms.input_shape","i",e.length)}) {
          return false;
        }
      }
      return true;
    }`,I_=(r,e,n,t)=>r.rank>t?`
    ${r.indicesSet("input_indices",e,"channel")};
    ${r.indicesSet("input_indices",n,"batch")};
`:"",cA=(r,e,n,t,o)=>{let[a,s,u,l]=n.length===2?[-1,0,1,-1]:[0,2,3,1],c=r.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${c} {
      var input_indices: ${r.type.indices};
      ${r.indicesSet("input_indices",s,`max(0, min(row, ${n[s]} - 1))`)};
      ${r.indicesSet("input_indices",u,`max(0, min(col, ${n[u]} - 1))`)};
      ${I_(r,l,a,2)}
      return ${r.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${e.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${c} = originalIndices[${s}];
      var col:${c} = originalIndices[${u}];
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
    }`},dA=(r,e,n,t,o,i,a,s,u,l)=>{let c=n.length===2,d=!0,[p,f]=c?[0,1]:d?[2,3]:[1,2],h=r.type.value,m=y=>{let g=y===p?"row":"col";return`
      fn ${g}CubicInterpolation(input_indices: ${r.type.indices}, output_indices: ${e.type.indices}) -> ${h} {
        var output_index = ${e.indicesGet("output_indices",y)};
        var originalIdx: ${h} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[y]},
        ${t[y]}, ${n[y]}, ${i[y]}, ${i[y]} + ${n.length});
        var fractOriginalIdx: ${h} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${s} && (originalIdx < 0 || originalIdx > (${n[y]} - 1))) {
          return ${u};
        }
        var data: array<${h}, 4> = array<${h}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${g}: ${h} = originalIdx + ${h}(i);
          if (${g} < 0 || ${g} >= ${n[y]}) {
            ${l?`coefs[i + 1] = 0.0;
                        continue;`:s?`return ${u};`:`${g} = max(0, min(${g}, ${n[y]} - 1));`};
          }
        var input_indices_copy: ${r.type.indices} = input_indices;
          ${r.indicesSet("input_indices_copy",y,`u32(${g})`)};
          data[i + 1] = ${y===p?r.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${m(p)};
    ${m(f)};
  fn getCubicInterpolationCoefs(s: ${h}) -> array<${h}, 4> {
    var absS = abs(s);
    var coeffs: array<${h}, 4> = array<${h}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${h} = 1.0 - absS;
    var twoMinusAbsS: ${h} = 2.0 - absS;
    var onePlusAbsS: ${h} = 1.0 + absS;
    coeffs[0] = ((${a} * onePlusAbsS - 5 * ${a}) * onePlusAbsS + 8 * ${a}) * onePlusAbsS - 4 * ${a};
    coeffs[1] = ((${a} + 2) * absS - (${a} + 3)) * absS * absS + 1;
    coeffs[2] = ((${a} + 2) * oneMinusAbsS - (${a} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${a} * twoMinusAbsS - 5 * ${a}) * twoMinusAbsS + 8 * ${a}) * twoMinusAbsS - 4 * ${a};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${h}, 4>, coefs: array<${h}, 4>) -> ${h} {
    var coefsSum: ${h} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${e.type.indices}) -> ${h} {
    var input_indices: ${r.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},pA=(r,e,n,t,o)=>{let[a,s,u,l,c]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],d=r.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${d} {
      var input_indices: ${r.type.indices};
      ${r.indicesSet("input_indices",s,`max(0, min(depth, ${n[s]} - 1))`)};
      ${r.indicesSet("input_indices",u,`max(0, min(height, ${n[u]} - 1))`)};
      ${r.indicesSet("input_indices",l,`max(0, min(width, ${n[l]} - 1))`)};
      ${I_(r,c,a,3)}
      return ${r.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${e.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${d} = originalIndices[${s}];
      var height:${d} = originalIndices[${u}];
      var width:${d} = originalIndices[${l}];
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
      var channel: u32 = ${n.length>3?`u32(originalIndices[${c}])`:"0"};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${a}])`:"0"};

      var x111: ${d} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${d} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${d} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${d} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${d} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${d} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${d} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${d} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${d} = abs(depth - ${d}(depth1));
      var dx2: ${d} = abs(${d}(depth2) - depth);
      var dy1: ${d} = abs(height - ${d}(height1));
      var dy2: ${d} = abs(${d}(height2) - height);
      var dz1: ${d} = abs(width - ${d}(width1));
      var dz2: ${d} = abs(${d}(width2) - width);
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
    }`},fA=(r,e,n,t,o,i)=>{let a=r.dims,s=oA(i,e.axes,a.length),u=iA(a,t,o,e.axes),l=t.slice();t.length===0&&(l=a.map((b,_)=>b===0?1:u[_]/b),e.keepAspectRatioPolicy!=="stretch"&&(u=aA(a,l,e)));let c=E("output",r.dataType,u.length),d=A("input",r.dataType,a.length),p=S.size(u),f=a.length===u.length&&a.every((b,_)=>b===u[_]),h=e.coordinateTransformMode==="tf_crop_and_resize",m=e.extrapolationValue,y=d.type.value,g=b=>`
      ${f?"":`
      ${nA(e.coordinateTransformMode,y)};
      ${(()=>{switch(e.mode){case"nearest":return`
              ${lA(d,a)};
              ${rA(e.nearestMode,n,y)};
              ${uA(d,c,a,u,l.length,s.length,h)};
              `;case"linear":return`
              ${sA(c,a,u,l.length,s.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${cA(d,c,a,h,m)}`;if(a.length===3||a.length===5)return`${pA(d,c,a,h,m)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${dA(d,c,a,u,l,s,e.cubicCoeffA,h,e.extrapolationValue,e.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${b.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",s.length).declareVariables(d,c)}
      ${b.mainStart()}
        ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${f?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${d.type.indices};
        ${(()=>{switch(e.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${d.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${e.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${e.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${e.cacheKey}|${n}|${l.length>0?e.mode==="cubic"?l:l.length:""}|${o.length>0?o:""}|${s.length>0?s:""}|${f}|${e.mode==="nearest"?a.length:a}`,inputDependencies:["rank"]},getShaderSource:g,getRunData:()=>({outputs:[{dims:u,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},{type:1,data:l},{type:1,data:s},...D(a,u)]})}},hA=r=>{let e=r.customDataBuffer;return new Uint32Array(e,e.byteOffset,1)[0]},S_=(r,e)=>{let n=[],t=[],o=[],i=hA(r);if(e.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");tA(r.inputs,e,i,n,t,o),r.compute(fA(r.inputs[0],e,i,n,t,o),{inputs:[0]})},$_=r=>{let e=r.antialias,n=r.axes,t=r.coordinateTransformMode,o=r.cubicCoeffA,i=r.excludeOutside!==0,a=r.extrapolationValue,s=r.keepAspectRatioPolicy,u=r.mode,l=r.nearestMode===""?"simple":r.nearestMode;return K({antialias:e,axes:n,coordinateTransformMode:t,cubicCoeffA:o,excludeOutside:i,extrapolationValue:a,keepAspectRatioPolicy:s,mode:u,nearestMode:l})}});var mA,gA,P_,O_=$(()=>{"use strict";j();Q();Oe();ne();mA=(r,e)=>{let[n,t,o,i]=r,{numHeads:a,rotaryEmbeddingDim:s}=e;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!S.areEqual(t.dims,[])&&!S.areEqual(t.dims,[1])&&t.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${t.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!S.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(s>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=n.dims[0],l=n.dims[n.dims.length-2],c=o.dims[0],d=S.sizeFromDimension(n.dims,1)/l,p=s===0?o.dims[1]*2:d/a;if(s>p)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(t.dims.length===2){if(u!==t.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${t.dims[0]}`);if(l!==t.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${t.dims[1]}`)}if(p/2!==o.dims[1]&&s/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(l>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},gA=(r,e)=>{let{interleaved:n,numHeads:t,rotaryEmbeddingDim:o,scale:i}=e,a=r[0].dims[0],s=S.sizeFromDimension(r[0].dims,1),u=r[0].dims[r[0].dims.length-2],l=s/u,c=r[2].dims[1],d=o===0?c*2:l/t,p=new Array(a,u,l/d,d-c),f=S.computeStrides(p),h=[{type:1,data:i},{type:12,data:p},{type:12,data:f},...r[0].dims.length===3?new Array({type:12,data:[s,l,d,1]}):[],...r[0].dims.length===4?new Array({type:12,data:[s,d,u*d,1]}):[],...D(r[0].dims,r[1].dims,r[2].dims,r[3].dims,r[0].dims)],m=y=>{let g=A("input",r[0].dataType,r[0].dims.length),b=A("position_ids",r[1].dataType,r[1].dims.length),_=A("cos_cache",r[2].dataType,r[2].dims.length),T=A("sin_cache",r[3].dataType,r[3].dims.length),w=E("output",r[0].dataType,r[0].dims.length);return y.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:p.length},{name:"global_strides",type:"u32",length:f.length},{name:"input_output_strides",type:"u32",length:f.length}]),`
        ${y.declareVariables(g,b,_,T,w)}

        ${y.mainStart(nr)}
          let half_rotary_emb_dim = uniforms.${_.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${y.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${b.broadcastedIndicesToOffset("bsnh.xy",E("",b.type.tensor,2))};
            let position_id =
                u32(${b.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${g.getByOffset("i")} * ${_.get("position_id","bsnh[3]")} -
                ${g.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${w.setByOffset("i","re")}
            let im = ${g.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} +
                ${g.getByOffset("j")} * ${_.get("position_id","bsnh[3]")};
            ${w.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${w.setByOffset("k",g.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:K({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:r[0].dims,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(S.size(p)/nr)},programUniforms:h})}},P_=(r,e)=>{mA(r.inputs,e),r.compute(gA(r.inputs,e))}});var bA,yA,E_,C_=$(()=>{"use strict";j();Q();ne();bA=r=>{if(!r||r.length<3)throw new Error("layerNorm requires at least 3 inputs.");let e=r[0],n=r[1],t=r[2];if(e.dataType!==n.dataType||e.dataType!==t.dataType)throw new Error("All inputs must have the same data type");if(e.dims.length!==3&&e.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=e.dims[e.dims.length-1],i=e.dims[e.dims.length-2];if(n.dims[n.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(t.dims.length!==1)throw new Error("Gamma must be 1D");if(t.dims[t.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(r.length>3){let a=r[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(r.length>4){let a=r[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},yA=(r,e,n,t)=>{let o=e.simplified,i=r[0].dims,a=S.size(i),s=i,u=a,l=i.slice(-1)[0],c=t?i.slice(0,-1).concat(1):[],d=!o&&r.length>3,p=r.length>4,f=t&&n>1,h=t&&n>2,m=n>3,y=64,g=pe(l),b=[{type:12,data:u},{type:12,data:g},{type:12,data:l},{type:1,data:e.epsilon}],_=w=>{let I=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],P=[A("x",r[0].dataType,r[0].dims,g),A("skip",r[1].dataType,r[1].dims,g),A("gamma",r[2].dataType,r[2].dims,g)];d&&P.push(A("beta",r[3].dataType,r[3].dims,g)),p&&P.push(A("bias",r[4].dataType,r[4].dims,g)),P.push(E("output",r[0].dataType,s,g)),f&&P.push(E("mean_output",1,c)),h&&P.push(E("inv_std_output",1,c)),m&&P.push(E("input_skip_bias_sum",r[0].dataType,s,g));let O=xe(r[0].dataType),C=xe(1,g);return`

      ${w.registerUniforms(I).declareVariables(...P)}
      var<workgroup> sum_shared : array<${C}, ${y}>;
      var<workgroup> sum_squared_shared : array<${C}, ${y}>;

      ${w.mainStart([y,1,1])}
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
          let bias_value = ${p?"bias[offset1d + i]":O+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${m?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${rr(O,g,"value")};
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
        let mean = ${It("sum",g)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${It("square_sum",g)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${f?"mean_output[global_idx] = mean;":""}
        ${h?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${O}(mean)`}) *
            ${O}(inv_std_dev) * gamma[offset1d + i]
            ${d?"+ beta[offset1d + i]":""};
        }
      }`},T=[{dims:s,dataType:r[0].dataType}];return n>1&&T.push({dims:c,dataType:1}),n>2&&T.push({dims:c,dataType:1}),n>3&&T.push({dims:i,dataType:r[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${g};${f};${h};${m}`,inputDependencies:r.map((w,I)=>"type")},getShaderSource:_,getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(u/l)},programUniforms:b})}},E_=(r,e)=>{bA(r.inputs);let t=[0];r.outputCount>1&&t.push(-3),r.outputCount>2&&t.push(-3),r.outputCount>3&&t.push(3),r.compute(yA(r.inputs,e,r.outputCount,!1),{outputs:t})}});var _A,Wi,xA,D_,TA,vA,k_,L_,z_=$(()=>{"use strict";j();Q();Oe();ne();_A=(r,e)=>{if(!r||r.length<1)throw new Error("too few inputs");if(e.axes.length!==0){if(e.axes.length!==e.starts.length||e.axes.length!==e.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(e.starts.length!==e.ends.length)throw new Error("starts and ends must have the same length");r.slice(1).forEach((n,t)=>{if(r[t+1].dataType!==6&&r[t+1].dataType!==7)throw new Error(`Input ${t} must be an array of int32 or int64`)})},Wi=(r,e)=>{let n=[];if(r.length>e)if(r[e].dataType===7)r[e].getBigInt64Array().forEach(t=>n.push(Number(t)));else if(r[e].dataType===6)r[e].getInt32Array().forEach(t=>n.push(Number(t)));else throw new Error(`Input ${e} must be an array of int32 or int64`);return n},xA=(r,e)=>{if(r.length>1){let n=Wi(r,1),t=Wi(r,2),o=Wi(r,3);return o.length===0&&(o=[...Array(r[0].dims.length).keys()]),K({starts:n,ends:t,axes:o})}else return e},D_=(r,e,n,t,o)=>{let i=r;return r<0&&(i+=n[t[e]]),o[e]<0?Math.max(0,Math.min(i,n[t[e]]-1)):Math.max(0,Math.min(i,n[t[e]]))},TA=(r,e,n)=>`fn calculateInputIndices(output_indices: ${e.type.indices}) -> ${r.type.indices} {
          var input_indices: ${r.type.indices};
          var carry = 0u;
          for (var i = ${n.length}; i >= 0; i--) {
            let input_shape_i = ${B("uniforms.input_shape","i",n.length)};
            let steps_i = ${B("uniforms.steps","i",n.length)};
            let signs_i = ${B("uniforms.signs","i",n.length)};
            let starts_i = ${B("uniforms.starts","i",n.length)};
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
      }`,vA=(r,e)=>{let n=r[0].dims,t=S.size(n),o=e.axes.length>0?S.normalizeAxes(e.axes,n.length):[...Array(n.length).keys()],i=Wi(r,4);i.forEach(g=>g!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let a=e.starts.map((g,b)=>D_(g,b,n,o,i)),s=e.ends.map((g,b)=>D_(g,b,n,o,i));if(o.length!==a.length||o.length!==s.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==n.length)for(let g=0;g<n.length;++g)o.includes(g)||(a.splice(g,0,0),s.splice(g,0,n[g]),i.splice(g,0,1));let u=i.map(g=>Math.sign(g));i.forEach((g,b,_)=>{if(g<0){let T=(s[b]-a[b])/g,w=a[b],I=w+T*i[b];a[b]=I,s[b]=w,_[b]=-g}});let l=n.slice(0);o.forEach((g,b)=>{l[g]=Math.ceil((s[g]-a[g])/i[g])});let c={dims:l,dataType:r[0].dataType},d=E("output",r[0].dataType,l.length),p=A("input",r[0].dataType,r[0].dims.length),f=S.size(l),h=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:i.length}],m=[{type:12,data:f},{type:12,data:a},{type:6,data:u},{type:12,data:i},...D(r[0].dims,l)],y=g=>`
      ${g.registerUniforms(h).declareVariables(p,d)}
        ${TA(p,d,n)}
        ${g.mainStart()}
          ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${d.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${d.setByOffset("global_idx",p.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${a.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:m})}},k_=(r,e)=>{_A(r.inputs,e);let n=xA(r.inputs,e);r.compute(vA(r.inputs,n),{inputs:[0]})},L_=r=>{let e=r.starts,n=r.ends,t=r.axes;return K({starts:e,ends:n,axes:t})}});var wA,IA,R_,N_,M_=$(()=>{"use strict";j();Q();Oe();vn();ne();wA=r=>{if(!r||r.length!==1)throw new Error("Softmax op requires 1 input.")},IA=(r,e)=>{let n=r.inputs[0],t=n.dims,o=S.size(t),i=t.length,a=S.normalizeAxis(e.axis,i),s=a<t.length-1,u,l=[];s?(l=Array.from({length:i},(P,O)=>O),l[a]=i-1,l[i-1]=a,u=r.compute(Fe(n,l),{inputs:[n],outputs:[-1]})[0]):u=n;let c=u.dims,d=c[i-1],p=o/d,f=pe(d),h=d/f,m=64;p===1&&(m=256);let y=(P,O)=>O===4?`max(max(${P}.x, ${P}.y), max(${P}.z, ${P}.w))`:O===2?`max(${P}.x, ${P}.y)`:O===3?`max(max(${P}.x, ${P}.y), ${P}.z)`:P,g=A("x",u.dataType,u.dims,f),b=E("result",u.dataType,u.dims,f),_=g.type.value,T=xe(u.dataType)==="f32"?`var threadMax = ${_}(-3.402823e+38f);`:`var threadMax = ${_}(-65504.0h);`,w=P=>`
      var<workgroup> rowMaxShared : ${_};
      var<workgroup> rowSumShared : ${_};
      var<workgroup> threadShared : array<${_}, ${m}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${_} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${_}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${P.registerUniform("packedCols","i32").declareVariables(g,b)}
      ${P.mainStart(m)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${m};
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
          rowMaxShared = ${_}(${y("threadShared[0]",f)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${_}(0.0);
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
          rowSumShared = ${_}(${It("threadShared[0]",f)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,I=r.compute({name:"Softmax",shaderCache:{hint:`${f};${m}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:u.dataType}],dispatchGroup:{x:p},programUniforms:[{type:6,data:h}]}),getShaderSource:w},{inputs:[u],outputs:[s?-1:0]})[0];s&&r.compute(Fe(I,l),{inputs:[I]})},R_=(r,e)=>{wA(r.inputs),IA(r,e)},N_=r=>K({axis:r.axis})});var B_,SA,$A,AA,V_,F_=$(()=>{"use strict";j();Q();ne();B_=r=>Array.from(r.getBigInt64Array(),Number),SA=r=>{if(!r||r.length!==2)throw new Error("Tile requires 2 inputs.");if(r[0].dataType!==1&&r[0].dataType!==10&&r[0].dataType!==6&&r[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(r[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(r[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(B_(r[1]).length!==r[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},$A=(r,e)=>{let n=[];for(let t=0;t<r.length;++t)n.push(r[t]*e[t]);return n},AA=(r,e)=>{let n=r[0].dims,t=e??B_(r[1]),o=$A(n,t),i=S.size(o),a=r[0].dataType,s=A("input",a,n.length),u=E("output",a,o.length),l=c=>`
      const inputShape = ${s.indices(...n)};
      ${c.registerUniform("output_size","u32").declareVariables(s,u)}
      ${c.mainStart()}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${s.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${s.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${s.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",s.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...D(r[0].dims,o)]}),getShaderSource:l}},V_=r=>{SA(r.inputs),r.compute(AA(r.inputs),{inputs:[0]})}});var PA,OA,G_,U_=$(()=>{"use strict";j();Q();ne();PA=(r,e,n,t,o)=>{let i=E("output_data",o,n.length,4),a=A("a_data",e[1].dataType,e[1].dims.length,4),s=A("b_data",e[2].dataType,e[2].dims.length,4),u=A("c_data",e[0].dataType,e[0].dims.length,4),l,c=(d,p,f)=>`select(${p}, ${d}, ${f})`;if(!t)l=i.setByOffset("global_idx",c(a.getByOffset("global_idx"),s.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let d=(p,f,h="")=>{let m=`a_data[index_a${f}][component_a${f}]`,y=`b_data[index_b${f}][component_b${f}]`,g=`bool(c_data[index_c${f}] & (0xffu << (component_c${f} * 8)))`;return`
            let output_indices${f} = ${i.offsetToIndices(`global_idx * 4u + ${f}u`)};
            let offset_a${f} = ${a.broadcastedIndicesToOffset(`output_indices${f}`,i)};
            let offset_b${f} = ${s.broadcastedIndicesToOffset(`output_indices${f}`,i)};
            let offset_c${f} = ${u.broadcastedIndicesToOffset(`output_indices${f}`,i)};
            let index_a${f} = offset_a${f} / 4u;
            let index_b${f} = offset_b${f} / 4u;
            let index_c${f} = offset_c${f} / 4u;
            let component_a${f} = offset_a${f} % 4u;
            let component_b${f} = offset_b${f} % 4u;
            let component_c${f} = offset_c${f} % 4u;
            ${p}[${f}] = ${h}(${c(m,y,g)});
          `};o===9?l=`
            var data = vec4<u32>(0);
            ${d("data",0,"u32")}
            ${d("data",1,"u32")}
            ${d("data",2,"u32")}
            ${d("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:l=`
            ${d("output_data[global_idx]",0)}
            ${d("output_data[global_idx]",1)}
            ${d("output_data[global_idx]",2)}
            ${d("output_data[global_idx]",3)}
          `}return`
        ${r.registerUniform("vec_size","u32").declareVariables(u,a,s,i)}
        ${r.mainStart()}
        ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`},OA=r=>{let e=r[1].dims,n=r[2].dims,t=r[0].dims,o=r[1].dataType,i=!(S.areEqual(e,n)&&S.areEqual(n,t)),a=e,s=S.size(e);if(i){let l=fn.calcShape(fn.calcShape(e,n,!1),t,!1);if(!l)throw new Error("Can't perform where op on the given tensors");a=l,s=S.size(a)}let u=Math.ceil(s/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>PA(l,r,a,i,o),getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/64/4)},programUniforms:[{type:12,data:u},...D(t,e,n,a)]})}},G_=r=>{r.compute(OA(r.inputs))}});var W_,H_=$(()=>{"use strict";Ig();ki();Ag();Og();hb();Sb();Pb();Wb();Jb();ey();ry();uy();dy();fy();gy();_y();vy();Sy();Py();Cy();By();Gy();Wy();qy();Xy();al();Jy();h_();b_();__();v_();Ci();A_();O_();C_();z_();M_();ul();F_();vn();zi();U_();W_=new Map([["Abs",[Eg]],["Acos",[Cg]],["Acosh",[Dg]],["Add",[mb]],["ArgMax",[wg,ju]],["ArgMin",[vg,ju]],["Asin",[kg]],["Asinh",[Lg]],["Atan",[zg]],["Atanh",[Rg]],["Attention",[Sg]],["AveragePool",[i_,o_]],["BatchNormalization",[$g]],["BiasAdd",[Pg]],["BiasSplitGelu",[fb]],["Cast",[Mg,Ng]],["Ceil",[Vg]],["Clip",[Bg]],["Concat",[$b,Ab]],["Conv",[nl,tl]],["ConvTranspose",[Zb,Kb]],["Cos",[Fg]],["Cosh",[Gg]],["CumSum",[Qb,Yb]],["DepthToSpace",[ty,ny]],["DequantizeLinear",[m_,g_]],["Div",[gb]],["Einsum",[ay,sy]],["Elu",[Ug,Jr]],["Equal",[bb]],["Erf",[Wg]],["Exp",[Hg]],["Expand",[cy]],["FastGelu",[py]],["Floor",[qg]],["FusedConv",[nl,tl]],["Gather",[my,hy]],["GatherElements",[Iy,wy]],["GatherBlockQuantized",[xy,Ty]],["GatherND",[by,yy]],["Gelu",[jg]],["Gemm",[Ay,$y]],["GlobalAveragePool",[u_,s_]],["GlobalMaxPool",[f_,p_]],["Greater",[Tb]],["GreaterOrEqual",[wb]],["GridSample",[Oy,Ey]],["GroupQueryAttention",[My]],["HardSigmoid",[tb,eb]],["InstanceNormalization",[Fy]],["LayerNormalization",[Uy]],["LeakyRelu",[Kg,Jr]],["Less",[vb]],["LessOrEqual",[Ib]],["Log",[cb]],["MatMul",[Hy]],["MatMulNBits",[jy,Ky]],["MaxPool",[c_,d_]],["Mul",[yb]],["MultiHeadAttention",[Ly,ky]],["Neg",[Zg]],["Not",[Xg]],["Pad",[Zy]],["Pow",[_b]],["QuickGelu",[db,Jr]],["Range",[y_]],["Reciprocal",[Jg]],["ReduceMin",[gg]],["ReduceMean",[dg]],["ReduceMax",[mg]],["ReduceSum",[yg]],["ReduceProd",[bg]],["ReduceL1",[pg]],["ReduceL2",[fg]],["ReduceLogSum",[xg]],["ReduceLogSumExp",[hg]],["ReduceSumSquare",[_g]],["Relu",[Qg]],["Resize",[S_,$_]],["RotaryEmbedding",[P_]],["ScatterND",[T_,x_]],["Sigmoid",[Yg]],["Sin",[nb]],["Sinh",[rb]],["Slice",[k_,L_]],["SkipLayerNormalization",[E_]],["Split",[zy,Ry]],["Sqrt",[ob]],["Softmax",[R_,N_]],["Sub",[xb]],["Tan",[ib]],["Tanh",[sb]],["ThresholdedRelu",[lb,Jr]],["Tile",[V_]],["Transpose",[Qm,Ym]],["Where",[G_]]])});var Hi,q_=$(()=>{"use strict";qe();pn();ne();Hi=class{constructor(e){this.backend=e;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,n){this.repo.set(e,n)}run(e,n,t,o,i){Qe(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let c of n)u.push({binding:u.length,resource:{buffer:c.buffer}});for(let c of t)u.push({binding:u.length,resource:{buffer:c.buffer}});i&&u.push({binding:u.length,resource:i});let l=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let c={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(c)}s.setPipeline(e.computePipeline),s.setBindGroup(0,l),s.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Ke(e.programInfo.name)}dispose(){}build(e,n){Qe(e.name);let t=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"},{feature:"subgroups-f16",extension:"subgroups_f16"}].forEach(d=>{t.features.has(d.feature)&&o.push(`enable ${d.extension};`)});let a=Zm(n,this.backend.device.limits),s=e.getShaderSource(a),u=`${o.join(`
`)}
${a.additionalImplementations}
${s}`,l=t.createShaderModule({code:u,label:e.name});oe("verbose",()=>`[WebGPU] ${e.name} shader code: ${u}`);let c=t.createComputePipeline({compute:{module:l,entryPoint:"main"},layout:"auto",label:e.name});return Ke(e.name),{programInfo:e,computePipeline:c,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let n=typeof e=="number"?e:e.x,t=typeof e=="number"?1:e.y||1,o=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(n<=i&&t<=i&&o<=i)return[n,t,o];let a=n*t*o,s=Math.ceil(Math.sqrt(a));if(s>i){if(s=Math.ceil(Math.cbrt(a)),s>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}});var EA,CA,ll,cl,qi,j_=$(()=>{"use strict";qe();j();pn();Ru();qm();H_();q_();EA=(r,e)=>{if(e.length!==r.length)throw new Error(`inputDependencies length ${e.length} is not equal to inputTensors length ${r.length}.`);let n=[];for(let t=0;t<r.length;++t){let o=r[t].dataType;switch(e[t]){case"none":{n.push("");break}case"type":{n.push(`${o}`);break}case"rank":{let i=r[t].dims.length;n.push(`${o};${i}`);break}case"dims":{let i=r[t].dims.join(",");n.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${e[t]}`)}}return n.join("|")},CA=(r,e,n)=>{let t=r.name;return r.shaderCache?.hint&&(t+="["+r.shaderCache.hint+"]"),t+=":"+n+`:${EA(e,r.shaderCache?.inputDependencies??new Array(e.length).fill("dims"))}`,t},ll=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},cl=class{constructor(e){this.subgroupsSupported=e.features.has("subgroups"),this.subgroupsF16Supported=e.features.has("subgroups");let n=e.limits;!this.subgroupsSupported||!n.minSubgroupSize||!n.maxSubgroupSize?this.subgroupSizeRange=void 0:this.subgroupSizeRange=[n.minSubgroupSize,n.maxSubgroupSize]}},qi=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,n){this.env=e;let t=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:n.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:n.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:n.limits.maxStorageBufferBindingSize,maxBufferSize:n.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:n.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:n.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:n.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:n.limits.maxComputeWorkgroupSizeZ},requiredFeatures:t},i=a=>n.features.has(a)&&t.push(a)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups")&&i("subgroups-f16"),this.device=await n.requestDevice(o),this.deviceInfo=new cl(this.device),this.adapterInfo=new ll(n.info||await n.requestAdapterInfo()),this.gpuDataManager=Hm(this),this.programManager=new Hi(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Si(e.logLevel,!!e.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:n,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),n={};this.queryType==="at-passes"&&(n.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(n)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Qe(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let n=new BigUint64Array(e.getMappedRange()),t=this.pendingQueries.get(e);for(let o=0;o<n.length/2;o++){let i=t[o],a=i.kernelId,s=this.kernels.get(a),u=s.kernelType,l=s.kernelName,c=i.programName,d=i.inputTensorViews,p=i.outputTensorViews,f=n[o*2],h=n[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=f);let m=Number(f-this.queryTimeBase),y=Number(h-this.queryTimeBase);if(!Number.isSafeInteger(m)||!Number.isSafeInteger(y))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:d.map(g=>({dims:g.dims,dataType:Ln(g.dataType)})),outputsMetadata:p.map(g=>({dims:g.dims,dataType:Ln(g.dataType)})),kernelId:a,kernelType:u,kernelName:l,programName:c,startTime:m,endTime:y});else{let g="";d.forEach((_,T)=>{g+=`input[${T}]: [${_.dims}] | ${Ln(_.dataType)}, `});let b="";p.forEach((_,T)=>{b+=`output[${T}]: [${_.dims}] | ${Ln(_.dataType)}, `}),console.log(`[profiling] kernel "${a}|${u}|${l}|${c}" ${g}${b}execution time: ${y-m} ns`)}Ar("GPU",`${c}::${f}::${h}`)}e.unmap(),this.pendingQueries.delete(e)}),Ke()}run(e,n,t,o,i,a){Qe(e.name);let s=[];for(let _=0;_<n.length;++_){let T=n[_].data;if(T===0)continue;let w=this.gpuDataManager.get(T);if(!w)throw new Error(`no GPU data for input: ${T}`);s.push(w)}let{outputs:u,dispatchGroup:l,programUniforms:c}=e.getRunData(n),d=t.length===0?u.map((_,T)=>T):t;if(d.length!==u.length)throw new Error(`Output size ${d.length} must be equal to ${u.length}.`);let p=[],f=[];for(let _=0;_<u.length;++_){if(!Number.isInteger(d[_])||d[_]<-3||d[_]>=a)throw new Error(`Invalid output index: ${d[_]}`);if(d[_]===-3)continue;let T=d[_]===-1,w=d[_]===-2,I=T||w?i(u[_].dataType,u[_].dims):o(d[_],u[_].dataType,u[_].dims);if(p.push(I),I.data===0)continue;let P=this.gpuDataManager.get(I.data);if(!P)throw new Error(`no GPU data for output: ${I.data}`);if(T&&this.temporaryData.push(P),w){let O=this.kernelPersistentData.get(this.currentKernelId);O||(O=[],this.kernelPersistentData.set(this.currentKernelId,O)),O.push(P)}f.push(P)}if(s.length!==n.length||f.length!==p.length){if(f.length===0)return Ke(e.name),p;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let h;if(c){let _=0,T=[];c.forEach(O=>{let C=typeof O.data=="number"?[O.data]:O.data;if(C.length===0)return;let M=O.type===10?2:4,V,Y;O.type===10?(Y=C.length>4?16:C.length>2?8:C.length*M,V=C.length>4?16:M*C.length):(Y=C.length<=2?C.length*M:16,V=16),_=Math.ceil(_/Y)*Y,T.push(_);let L=O.type===10?8:4;_+=C.length>4?Math.ceil(C.length/L)*V:C.length*M});let w=16;_=Math.ceil(_/w)*w;let I=new ArrayBuffer(_);c.forEach((O,C)=>{let M=T[C],V=typeof O.data=="number"?[O.data]:O.data;if(O.type===6)new Int32Array(I,M,V.length).set(V);else if(O.type===12)new Uint32Array(I,M,V.length).set(V);else if(O.type===10)new Uint16Array(I,M,V.length).set(V);else if(O.type===1)new Float32Array(I,M,V.length).set(V);else throw new Error(`Unsupported uniform type: ${Ln(O.type)}`)});let P=this.gpuDataManager.create(_,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(P.buffer,0,I,0,_),this.gpuDataManager.release(P.id),h={offset:0,size:_,buffer:P.buffer}}let m=this.programManager.normalizeDispatchGroupSize(l),y=m[1]===1&&m[2]===1,g=CA(e,n,y),b=this.programManager.getArtifact(g);if(b||(b=this.programManager.build(e,m),this.programManager.setArtifact(g,b),oe("info",()=>`[artifact] key: ${g}, programName: ${e.name}`)),c&&b.uniformVariablesInfo){if(c.length!==b.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${b.uniformVariablesInfo.length}, got ${c.length} in program "${b.programInfo.name}".`);for(let _=0;_<c.length;_++){let T=c[_],w=T.type,I=typeof T.data=="number"?1:T.data.length,[P,O]=b.uniformVariablesInfo[_];if(w!==P||I!==O)throw new Error(`Uniform variable ${_} mismatch: expect type ${P} with size ${O}, got type ${w} with size ${I} in program "${b.programInfo.name}".`)}}if(oe("info",()=>`[ProgramManager] run "${e.name}" (key=${g}) with ${m[0]}x${m[1]}x${m[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let _={kernelId:this.currentKernelId,programName:b.programInfo.name,inputTensorViews:n,outputTensorViews:p};this.pendingKernels.push(_),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(_)}return this.programManager.run(b,s,f,m,h),Ke(e.name),p}upload(e,n){this.gpuDataManager.upload(e,n)}memcpy(e,n){this.gpuDataManager.memcpy(e,n)}async download(e,n){await this.gpuDataManager.download(e,n)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,n,t,o){let i=W_.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:o,kernelEntry:i[0],attributes:[i[1],t]};this.kernels.set(n,a)}releaseKernel(e){let n=this.kernelPersistentData.get(e);if(n){for(let t of n)this.gpuDataManager.release(t.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,n,t){let o=this.kernels.get(e);if(!o)throw new Error(`kernel not created: ${e}`);let i=o.kernelType,a=o.kernelName,s=o.kernelEntry,u=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),oe("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),s(n,u[1]),0}catch(c){return t.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${c}`)),1}finally{l&&t.push(this.device.popErrorScope().then(c=>c?`GPU validation error for kernel "[${i}] ${a}": ${c.message}`:null));for(let c of this.temporaryData)this.gpuDataManager.release(c.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,n,t,o){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let a=i.get(n),s=this.gpuDataManager.registerExternalBuffer(t,o,a);return i.set(n,[s,t]),s}unregisterBuffers(e){let n=this.sessionExternalDataMapping.get(e);n&&(n.forEach(t=>this.gpuDataManager.unregisterExternalBuffer(t[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let n=this.gpuDataManager.get(e);if(!n)throw new Error(`no GPU data for buffer: ${e}`);return n.buffer}createDownloader(e,n,t){return async()=>{let o=await Vu(this,e,n);return $i(o.buffer,t)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){oe("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){oe("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){oe("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),n=this.capturedPendingKernels.get(this.currentSessionId),t=e.length;this.pendingKernels=[];for(let o=0;o<t;o++){let i=this.getComputePassEncoder(),a=e[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(n[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}});var DA,K_,kA,X_,ji,Ki,dl,Z_,J_=$(()=>{"use strict";pn();DA=1,K_=()=>DA++,kA=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),X_=(r,e)=>{let n=kA.get(r);if(!n)throw new Error("Unsupported data type.");return e.length>0?Math.ceil(e.reduce((t,o)=>t*o)*n/8):0},ji=class{constructor(e){this.sessionId=e.sessionId,this.mlContext=e.context,this.mlTensor=e.tensor,this.dataType=e.dataType,this.tensorShape=e.shape}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return X_(this.dataType,this.tensorShape)}destroy(){oe("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,n,t){return this.mlContext===e&&this.dataType===n&&this.tensorShape.length===t.length&&this.tensorShape.every((o,i)=>o===t[i])}},Ki=class{constructor(e,n){this.tensorManager=e;this.wrapper=n}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,n,t,o){let i=this.tensorManager.getMLContext(e);if(this.wrapper){if(this.wrapper.canReuseTensor(i,n,t))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==X_(n,t))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let a=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,n,t,a,!0,!0),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){if(this.wrapper)if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(e);return}else oe("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(e):this.activeUpload=new Uint8Array(e)}async download(e){if(this.activeUpload)if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(this.activeUpload):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(this.activeUpload);return}else return this.activeUpload.buffer;if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},dl=class{constructor(e){this.backend=e;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}getMLContext(e){let n=this.backend.getMLContext(e);if(!n)throw new Error("MLContext not found for session.");return n}reserveTensorId(){let e=K_();return this.tensorTrackersById.set(e,new Ki(this)),e}releaseTensorId(e){let n=this.tensorTrackersById.get(e);n&&(this.tensorTrackersById.delete(e),n.tensorWrapper&&this.releaseTensor(n.tensorWrapper))}async ensureTensor(e,n,t,o,i){oe("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${n}, dataType: ${t}, shape: ${o}, copyOld: ${i}}`);let a=this.tensorTrackersById.get(n);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,t,o,i)}upload(e,n){let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");t.upload(n)}async download(e,n){oe("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${n?.byteLength}}`);let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");return t.download(n)}releaseTensorsForSession(e){for(let n of this.freeTensors)n.sessionId===e&&n.destroy();this.freeTensors=this.freeTensors.filter(n=>n.sessionId!==e)}registerTensor(e,n,t,o){let i=this.getMLContext(e),a=K_(),s=new ji({sessionId:e,context:i,tensor:n,dataType:t,shape:o});return this.tensorTrackersById.set(a,new Ki(this,s)),this.externalTensors.add(s),a}async getCachedTensor(e,n,t,o,i,a){let s=this.getMLContext(e);for(let[l,c]of this.freeTensors.entries())if(c.canReuseTensor(s,n,t)){oe("verbose",()=>`[WebNN] Reusing tensor {dataType: ${n}, shape: ${t}}`);let d=this.freeTensors.splice(l,1)[0];return d.sessionId=e,d}oe("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${n}, shape: ${t}}`);let u=await s.createTensor({dataType:n,shape:t,dimensions:t,usage:o,writable:i,readable:a});return new ji({sessionId:e,context:s,tensor:u,dataType:n,shape:t})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Z_=(...r)=>new dl(...r)});var pl,LA,Xi,Q_=$(()=>{"use strict";j();kn();Ru();J_();pn();pl=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),LA=(r,e)=>{if(r===e)return!0;if(r===void 0||e===void 0)return!1;let n=Object.keys(r).sort(),t=Object.keys(e).sort();return n.length===t.length&&n.every((o,i)=>o===t[i]&&r[o]===e[o])},Xi=class{constructor(e){this.tensorManager=Z_(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];this.sessionGraphInputs=new Map;this.temporaryGraphInputs=[];this.temporarySessionTensorIds=new Map;Si(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){oe("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){oe("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let n=this.temporarySessionTensorIds.get(e);if(n){for(let t of n)oe("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(o=>o.gpuDevice===e);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:o}),o}}else if(e===void 0){let t=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let n=this.mlContextCache.findIndex(t=>LA(t.options,e));if(n!==-1)return this.mlContextCache[n].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}registerMLContext(e,n){this.mlContextBySessionId.set(e,n);let t=this.sessionIdsByMLContext.get(n);t||(t=new Set,this.sessionIdsByMLContext.set(n,t)),t.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e);let n=this.mlContextBySessionId.get(e);if(!n)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let t=this.sessionIdsByMLContext.get(n);if(t.delete(e),t.size===0){this.sessionIdsByMLContext.delete(n);let o=this.mlContextCache.findIndex(i=>i.mlContext===n);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){oe("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,n,t,o,i){let a=pl.get(t);if(!a)throw new Error(`Unsupported ONNX data type: ${t}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,n,a,o,i)}async createTemporaryTensor(e,n,t){oe("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${n}, shape: ${t}}`);let o=pl.get(n);if(!o)throw new Error(`Unsupported ONNX data type: ${n}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,o,t,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,n){if(!Ee().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");oe("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${n.byteLength}}`),this.tensorManager.upload(e,n)}async downloadTensor(e,n){return this.tensorManager.download(e,n)}createMLTensorDownloader(e,n){return async()=>{let t=await this.tensorManager.download(e);return $i(t,n)}}registerMLTensor(e,n,t,o){let i=pl.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.registerTensor(e,n,i,o);return oe("verbose",()=>`[WebNN] registerMLTensor {tensor: ${n}, dataType: ${i}, dimensions: ${o}} -> {tensorId: ${a}}`),a}registerMLConstant(e,n,t,o,i,a){if(!a)throw new Error("External mounted files are not available.");let s=e;e.startsWith("./")&&(s=e.substring(2));let u=a.get(s);if(!u)throw new Error(`File with name ${s} not found in preloaded files.`);if(n+t>u.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let l=u.slice(n,n+t).buffer,c;switch(i.dataType){case"float32":c=new Float32Array(l);break;case"float16":c=new Uint16Array(l);break;case"int32":c=new Int32Array(l);break;case"uint32":c=new Uint32Array(l);break;case"int64":c=new BigInt64Array(l);break;case"uint64":c=new BigUint64Array(l);break;case"int8":c=new Int8Array(l);break;case"int4":case"uint4":case"uint8":c=new Uint8Array(l);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return oe("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}}`),o.constant(i,c)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}isGraphInput(e,n){let t=this.sessionGraphInputs.get(e);return t?t.includes(n):!1}flush(){}}});var Y_={};ar(Y_,{init:()=>zA});var to,fl,zA,ex=$(()=>{"use strict";j();j_();pn();Q();Q_();to=class r{constructor(e,n,t,o){this.module=e;this.dataType=n;this.data=t;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let e=S.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let e=S.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let e=S.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let e=S.size(this.dims);return e===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(e){if(S.size(e)!==S.size(this.dims))throw new Error("Invalid new shape");return new r(this.module,this.dataType,this.data,e)}},fl=class{constructor(e,n,t){this.module=e;this.backend=n;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=n.adapterInfo,this.deviceInfo=n.deviceInfo;let o=e.PTR_SIZE,i=t/e.PTR_SIZE,a=o===4?"i32":"i64";this.opKernelContext=Number(e.getValue(o*i++,a));let s=Number(e.getValue(o*i++,a));this.outputCount=Number(e.getValue(o*i++,a)),this.customDataOffset=Number(e.getValue(o*i++,"*")),this.customDataSize=Number(e.getValue(o*i++,a));let u=[];for(let l=0;l<s;l++){let c=Number(e.getValue(o*i++,a)),d=Number(e.getValue(o*i++,"*")),p=Number(e.getValue(o*i++,a)),f=[];for(let h=0;h<p;h++)f.push(Number(e.getValue(o*i++,a)));u.push(new to(e,c,d,f))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,n){let t=n?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,o=n?.outputs??[],i=(s,u,l)=>new to(this.module,u,this.output(s,l),l),a=(s,u)=>{let l=zn(s,u);if(!l)throw new Error(`Unsupported data type: ${s}`);let c=l>0?this.backend.gpuDataManager.create(l).id:0;return new to(this.module,s,c,u)};return this.backend.run(e,t,o,i,a,this.outputCount)}output(e,n){let t=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",a=this.module.stackAlloc((1+n.length)*o);this.module.setValue(a,n.length,i);for(let s=0;s<n.length;s++)this.module.setValue(a+o*(s+1),n[s],i);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(o){throw new Error(`Failed to generate kernel's output[${e}] with dims [${n}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(t)}}},zA=async(r,e,n,t)=>{let o=e.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(r==="webgpu"){let i=new qi;await i.initialize(n,t),o("webgpu",[i,a=>i.alloc(Number(a)),a=>i.free(a),(a,s,u,l=!1)=>{if(l)oe("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(a)}, dst=${Number(s)}, size=${Number(u)}`),i.memcpy(Number(a),Number(s));else{oe("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(a)}, gpuDataId=${Number(s)}, size=${Number(u)}`);let c=e.HEAPU8.subarray(Number(a>>>0),Number(a>>>0)+Number(u));i.upload(Number(s),c)}},async(a,s,u)=>{oe("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${a}, dataOffset=${s}, size=${u}`),await i.download(Number(a),()=>e.HEAPU8.subarray(Number(s)>>>0,Number(s+u)>>>0))},(a,s,u)=>i.createKernel(a,Number(s),u,e.UTF8ToString(e._JsepGetNodeName(Number(s)))),a=>i.releaseKernel(a),(a,s,u,l)=>{oe("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${u}, kernel=${a}, contextDataOffset=${s}`);let c=new fl(e,i,Number(s));return i.computeKernel(Number(a),c,l)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else{let i=new Xi(n);o("webnn",[i,()=>i.reserveTensorId(),a=>i.releaseTensorId(a),async(a,s,u,l,c)=>i.ensureTensor(a,s,u,l,c),(a,s)=>{i.uploadTensor(a,s)},async(a,s)=>i.downloadTensor(a,s)])}}});var RA,pi,fi,or,NA,jr,hi,mi,tx,gi,bi,yi,Eu=$(()=>{"use strict";Nm();Bm();j();kn();Ti();zu();RA=(r,e)=>{Ee()._OrtInit(r,e)!==0&&ce("Can't initialize onnxruntime.")},pi=async r=>{RA(r.wasm.numThreads,Xr(r.logLevel))},fi=async(r,e)=>{{let n=(ex(),Sr(Y_)).init;if(e==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let t=r.webgpu.adapter;if(t){if(typeof t.limits!="object"||typeof t.features!="object"||typeof t.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=r.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=r.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(t=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!t)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await n("webgpu",Ee(),r,t)}if(e==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await n("webnn",Ee(),r)}}},or=new Map,NA=r=>{let e=Ee(),n=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetInputOutputCount(r,o,o+t)!==0&&ce("Can't get session input/output count.");let a=t===4?"i32":"i64";return[Number(e.getValue(o,a)),Number(e.getValue(o+t,a))]}finally{e.stackRestore(n)}},jr=r=>{let e=Ee(),n=e._malloc(r.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${r.byteLength}.`);return e.HEAPU8.set(r,n),[n,r.byteLength]},hi=async(r,e)=>{let n,t,o=Ee();Array.isArray(r)?[n,t]=r:r.buffer===o.HEAPU8.buffer?[n,t]=[r.byteOffset,r.byteLength]:[n,t]=jr(r);let i=0,a=0,s=0,u=[],l=[],c=[];try{if([a,u]=Mm(e),e?.externalData&&o.mountExternalData){let b=[];for(let _ of e.externalData){let T=typeof _=="string"?_:_.path;b.push(Zr(typeof _=="string"?_:_.data).then(w=>{o.mountExternalData(T,w)}))}await Promise.all(b)}for(let b of e?.executionProviders??[])if((typeof b=="string"?b:b.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof b!="string"){let T=b,w=T?.context,I=T?.gpuDevice,P=T?.deviceType,O=T?.powerPreference;w?o.currentContext=w:I?o.currentContext=await o.jsepCreateMLContext(I):o.currentContext=await o.jsepCreateMLContext({deviceType:P,powerPreference:O})}else o.currentContext=await o.jsepCreateMLContext();break}i=await o._OrtCreateSession(n,t,a),i===0&&ce("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.jsepRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[d,p]=NA(i),f=!!e?.enableGraphCapture,h=[],m=[],y=[];for(let b=0;b<d;b++){let _=o._OrtGetInputName(i,b);_===0&&ce("Can't get an input name."),l.push(_),h.push(o.UTF8ToString(_))}for(let b=0;b<p;b++){let _=o._OrtGetOutputName(i,b);_===0&&ce("Can't get an output name."),c.push(_);let T=o.UTF8ToString(_);m.push(T);{if(f&&e?.preferredOutputLocation===void 0){y.push("gpu-buffer");continue}let w=typeof e?.preferredOutputLocation=="string"?e.preferredOutputLocation:e?.preferredOutputLocation?.[T]??"cpu";if(w!=="cpu"&&w!=="cpu-pinned"&&w!=="gpu-buffer"&&w!=="ml-tensor")throw new Error(`Not supported preferred output location: ${w}.`);if(f&&w!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${w}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);y.push(w)}}let g=null;return y.some(b=>b==="gpu-buffer"||b==="ml-tensor")&&(s=o._OrtCreateBinding(i),s===0&&ce("Can't create IO binding."),g={handle:s,outputPreferredLocations:y,outputPreferredLocationsEncoded:y.map(b=>Lu(b))}),or.set(i,[i,l,c,g,f,!1]),[i,h,m]}catch(d){throw l.forEach(p=>o._OrtFree(p)),c.forEach(p=>o._OrtFree(p)),s!==0&&o._OrtReleaseBinding(s)!==0&&ce("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&ce("Can't release session."),d}finally{o._free(n),a!==0&&o._OrtReleaseSessionOptions(a)!==0&&ce("Can't release session options."),u.forEach(d=>o._free(d)),o.unmountExternalData?.()}},mi=r=>{let e=Ee(),n=or.get(r);if(!n)throw new Error(`cannot release session. invalid session id: ${r}`);let[t,o,i,a,s]=n;a&&(s&&e._OrtClearBoundOutputs(a.handle)!==0&&ce("Can't clear bound outputs."),e._OrtReleaseBinding(a.handle)!==0&&ce("Can't release IO binding.")),e.jsepOnReleaseSession?.(r),o.forEach(u=>e._OrtFree(u)),i.forEach(u=>e._OrtFree(u)),e._OrtReleaseSession(t)!==0&&ce("Can't release session."),or.delete(r)},tx=async(r,e,n,t,o,i=!1)=>{if(!r){e.push(0);return}let a=Ee(),s=a.PTR_SIZE,u=r[0],l=r[1],c=r[3],d=c,p,f;if(u==="string"&&(c==="gpu-buffer"||c==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(i&&c!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(c==="gpu-buffer"){let y=r[2].gpuBuffer;f=zn(_r(u),l);let g=a.jsepRegisterBuffer;if(!g)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');p=g(t,o,y,f)}else if(c==="ml-tensor"){let y=r[2].mlTensor;f=zn(_r(u),l);let g=a.jsepRegisterMLTensor;if(!g)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');p=g(t,y,_r(u),l)}else{let y=r[2];if(Array.isArray(y)){f=s*y.length,p=a._malloc(f),n.push(p);for(let g=0;g<y.length;g++){if(typeof y[g]!="string")throw new TypeError(`tensor data at index ${g} is not a string`);a.setValue(p+g*s,Be(y[g],n),"*")}}else{let g=a.jsepIsGraphInput;if(u!=="string"&&g){let b=a._OrtGetInputName(t,o),_=a.UTF8ToString(b);if(g(t,_)){let T=_r(u);f=zn(T,l),d="ml-tensor";let w=a.jsepCreateTemporaryTensor,I=a.jsepUploadTensor;if(!w||!I)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let P=await w(t,T,l);I(P,new Uint8Array(y.buffer,y.byteOffset,y.byteLength)),p=P}else f=y.byteLength,p=a._malloc(f),n.push(p),a.HEAPU8.set(new Uint8Array(y.buffer,y.byteOffset,f),p)}else f=y.byteLength,p=a._malloc(f),n.push(p),a.HEAPU8.set(new Uint8Array(y.buffer,y.byteOffset,f),p)}}let h=a.stackSave(),m=a.stackAlloc(4*l.length);try{l.forEach((g,b)=>a.setValue(m+b*s,g,s===4?"i32":"i64"));let y=a._OrtCreateTensor(_r(u),p,f,m,l.length,Lu(d));y===0&&ce(`Can't create tensor for input/output. session=${t}, index=${o}.`),e.push(y)}finally{a.stackRestore(h)}},gi=async(r,e,n,t,o,i)=>{let a=Ee(),s=a.PTR_SIZE,u=or.get(r);if(!u)throw new Error(`cannot run inference. invalid session id: ${r}`);let l=u[0],c=u[1],d=u[2],p=u[3],f=u[4],h=u[5],m=e.length,y=t.length,g=0,b=[],_=[],T=[],w=[],I=a.stackSave(),P=a.stackAlloc(m*s),O=a.stackAlloc(m*s),C=a.stackAlloc(y*s),M=a.stackAlloc(y*s);try{[g,b]=Rm(i);for(let L=0;L<m;L++)await tx(n[L],_,w,r,e[L],f);for(let L=0;L<y;L++)await tx(o[L],T,w,r,m+t[L],f);for(let L=0;L<m;L++)a.setValue(P+L*s,_[L],"*"),a.setValue(O+L*s,c[e[L]],"*");for(let L=0;L<y;L++)a.setValue(C+L*s,T[L],"*"),a.setValue(M+L*s,d[t[L]],"*");if(p&&!h){let{handle:L,outputPreferredLocations:X,outputPreferredLocationsEncoded:$e}=p;if(c.length!==m)throw new Error(`input count from feeds (${m}) is expected to be always equal to model's input count (${c.length}).`);for(let U=0;U<m;U++){let te=e[U];await a._OrtBindInput(L,c[te],_[U])!==0&&ce(`Can't bind input[${U}] for session=${r}.`)}for(let U=0;U<y;U++){let te=t[U];o[U]?.[3]?a._OrtBindOutput(L,d[te],T[U],0)!==0&&ce(`Can't bind pre-allocated output[${U}] for session=${r}.`):a._OrtBindOutput(L,d[te],0,$e[te])!==0&&ce(`Can't bind output[${U}] to ${X[U]} for session=${r}.`)}or.set(r,[l,c,d,p,f,!0])}a.jsepOnRunStart?.(l);let V;p?V=await a._OrtRunWithBinding(l,p.handle,y,C,g):V=await a._OrtRun(l,O,P,m,M,y,C,g),V!==0&&ce("failed to call OrtRun().");let Y=[];for(let L=0;L<y;L++){let X=Number(a.getValue(C+L*s,"*"));if(X===T[L]){Y.push(o[L]);continue}let $e=a.stackSave(),U=a.stackAlloc(4*s),te=!1,ie,Z=0;try{a._OrtGetTensorData(X,U,U+s,U+2*s,U+3*s)!==0&&ce(`Can't access output tensor data on index ${L}.`);let ot=s===4?"i32":"i64",De=Number(a.getValue(U,ot));Z=a.getValue(U+s,"*");let de=a.getValue(U+s*2,"*"),z=Number(a.getValue(U+s*3,ot)),W=[];for(let Ce=0;Ce<z;Ce++)W.push(Number(a.getValue(de+Ce*s,ot)));a._OrtFree(de)!==0&&ce("Can't free memory for tensor dims.");let Te=W.reduce((Ce,Me)=>Ce*Me,1);ie=Ln(De);let In=p?.outputPreferredLocations[t[L]];if(ie==="string"){if(In==="gpu-buffer"||In==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Ce=[];for(let Me=0;Me<Te;Me++){let Mn=a.getValue(Z+Me*s,"*"),hx=a.getValue(Z+(Me+1)*s,"*"),mx=Me===Te-1?void 0:hx-Mn;Ce.push(a.UTF8ToString(Mn,mx))}Y.push([ie,W,Ce,"cpu"])}else if(In==="gpu-buffer"&&Te>0){let Ce=a.jsepGetBuffer;if(!Ce)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Me=Ce(Z),Mn=zn(De,Te);if(Mn===void 0||!wi(ie))throw new Error(`Unsupported data type: ${ie}`);te=!0,Y.push([ie,W,{gpuBuffer:Me,download:a.jsepCreateDownloader(Me,Mn,ie),dispose:()=>{a._OrtReleaseTensor(X)!==0&&ce("Can't release tensor.")}},"gpu-buffer"])}else if(In==="ml-tensor"&&Te>0){let Ce=a.jsepEnsureTensor;if(!Ce)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(zn(De,Te)===void 0||!Ii(ie))throw new Error(`Unsupported data type: ${ie}`);let Mn=await Ce(r,Z,De,W,!1);te=!0,Y.push([ie,W,{mlTensor:Mn,download:a.jsepCreateMLTensorDownloader(Z,ie),dispose:()=>{a.jsepReleaseTensorId(Z),a._OrtReleaseTensor(X)}},"ml-tensor"])}else{let Ce=vi(ie),Me=new Ce(Te);new Uint8Array(Me.buffer,Me.byteOffset,Me.byteLength).set(a.HEAPU8.subarray(Z,Z+Me.byteLength)),Y.push([ie,W,Me,"cpu"])}}finally{a.stackRestore($e),ie==="string"&&Z&&a._free(Z),te||a._OrtReleaseTensor(X),a.jsepOnRunEnd?.(l)}}return p&&!f&&(a._OrtClearBoundOutputs(p.handle)!==0&&ce("Can't clear bound outputs."),or.set(r,[l,c,d,p,f,!1])),Y}finally{a.stackRestore(I),_.forEach(V=>a._OrtReleaseTensor(V)),T.forEach(V=>a._OrtReleaseTensor(V)),w.forEach(V=>a._free(V)),g!==0&&a._OrtReleaseRunOptions(g),b.forEach(V=>a._free(V))}},bi=r=>{let e=Ee(),n=or.get(r);if(!n)throw new Error("invalid session id");let t=n[0],o=e._OrtEndProfiling(t);o===0&&ce("Can't get an profile file name."),e._OrtFree(o)},yi=r=>{let e=[];for(let n of r){let t=n[2];!Array.isArray(t)&&"buffer"in t&&e.push(t.buffer)}return e}});var ir,bt,no,Ji,Qi,Zi,hl,ml,wr,Ir,BA,nx,rx,ox,ix,ax,sx,ux,gl=$(()=>{"use strict";qe();Eu();kn();ci();ir=()=>!!J.wasm.proxy&&typeof document<"u",no=!1,Ji=!1,Qi=!1,ml=new Map,wr=(r,e)=>{let n=ml.get(r);n?n.push(e):ml.set(r,[e])},Ir=()=>{if(no||!Ji||Qi||!bt)throw new Error("worker not ready")},BA=r=>{switch(r.data.type){case"init-wasm":no=!1,r.data.err?(Qi=!0,hl[1](r.data.err)):(Ji=!0,hl[0]()),Zi&&(URL.revokeObjectURL(Zi),Zi=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let e=ml.get(r.data.type);r.data.err?e.shift()[1](r.data.err):e.shift()[0](r.data.out);break}default:}},nx=async()=>{if(!Ji){if(no)throw new Error("multiple calls to 'initWasm()' detected.");if(Qi)throw new Error("previous call to 'initWasm()' failed.");if(no=!0,ir())return new Promise((r,e)=>{bt?.terminate(),km().then(([n,t])=>{try{bt=t,bt.onerror=i=>e(i),bt.onmessage=BA,hl=[r,e];let o={type:"init-wasm",in:J};if(!o.in.wasm.wasmPaths&&n){let i=_i();i&&(o.in.wasm.wasmPaths=i)}bt.postMessage(o),Zi=n}catch(o){e(o)}},e)});try{await di(J.wasm),await pi(J),Ji=!0}catch(r){throw Qi=!0,r}finally{no=!1}}},rx=async r=>{if(ir())return Ir(),new Promise((e,n)=>{wr("init-ep",[e,n]);let t={type:"init-ep",in:{epName:r,env:J}};bt.postMessage(t)});await fi(J,r)},ox=async r=>ir()?(Ir(),new Promise((e,n)=>{wr("copy-from",[e,n]);let t={type:"copy-from",in:{buffer:r}};bt.postMessage(t,[r.buffer])})):jr(r),ix=async(r,e)=>{if(ir()){if(e?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Ir(),new Promise((n,t)=>{wr("create",[n,t]);let o={type:"create",in:{model:r,options:{...e}}},i=[];r instanceof Uint8Array&&i.push(r.buffer),bt.postMessage(o,i)})}else return hi(r,e)},ax=async r=>{if(ir())return Ir(),new Promise((e,n)=>{wr("release",[e,n]);let t={type:"release",in:r};bt.postMessage(t)});mi(r)},sx=async(r,e,n,t,o,i)=>{if(ir()){if(n.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return Ir(),new Promise((a,s)=>{wr("run",[a,s]);let u=n,l={type:"run",in:{sessionId:r,inputIndices:e,inputs:u,outputIndices:t,options:i}};bt.postMessage(l,yi(u))})}else return gi(r,e,n,t,o,i)},ux=async r=>{if(ir())return Ir(),new Promise((e,n)=>{wr("end-profiling",[e,n]);let t={type:"end-profiling",in:r};bt.postMessage(t)});bi(r)}});var lx,VA,Yi,cx=$(()=>{"use strict";qe();gl();j();li();zu();lx=(r,e)=>{switch(r.location){case"cpu":return[r.type,r.dims,r.data,"cpu"];case"gpu-buffer":return[r.type,r.dims,{gpuBuffer:r.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[r.type,r.dims,{mlTensor:r.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${r.location} for ${e()}`)}},VA=r=>{switch(r[3]){case"cpu":return new Je(r[0],r[2],r[1]);case"gpu-buffer":{let e=r[0];if(!wi(e))throw new Error(`not supported data type: ${e} for deserializing GPU tensor`);let{gpuBuffer:n,download:t,dispose:o}=r[2];return Je.fromGpuBuffer(n,{dataType:e,dims:r[1],download:t,dispose:o})}case"ml-tensor":{let e=r[0];if(!Ii(e))throw new Error(`not supported data type: ${e} for deserializing MLTensor tensor`);let{mlTensor:n,download:t,dispose:o}=r[2];return Je.fromMLTensor(n,{dataType:e,dims:r[1],download:t,dispose:o})}default:throw new Error(`invalid data location: ${r[3]}`)}},Yi=class{async fetchModelAndCopyToWasmMemory(e){return ox(await Zr(e))}async loadModel(e,n){Qe();let t;typeof e=="string"?t=await this.fetchModelAndCopyToWasmMemory(e):t=e,[this.sessionId,this.inputNames,this.outputNames]=await ix(t,n),Ke()}async dispose(){return ax(this.sessionId)}async run(e,n,t){Qe();let o=[],i=[];Object.entries(e).forEach(p=>{let f=p[0],h=p[1],m=this.inputNames.indexOf(f);if(m===-1)throw new Error(`invalid input '${f}'`);o.push(h),i.push(m)});let a=[],s=[];Object.entries(n).forEach(p=>{let f=p[0],h=p[1],m=this.outputNames.indexOf(f);if(m===-1)throw new Error(`invalid output '${f}'`);a.push(h),s.push(m)});let u=o.map((p,f)=>lx(p,()=>`input "${this.inputNames[i[f]]}"`)),l=a.map((p,f)=>p?lx(p,()=>`output "${this.outputNames[s[f]]}"`):null),c=await sx(this.sessionId,i,u,s,l,t),d={};for(let p=0;p<c.length;p++)d[this.outputNames[s[p]]]=a[p]??VA(c[p]);return Ke(),d}startProfiling(){}endProfiling(){ux(this.sessionId)}}});var px={};ar(px,{OnnxruntimeWebAssemblyBackend:()=>ea,initializeFlags:()=>dx,wasmBackend:()=>FA});var dx,ea,FA,fx=$(()=>{"use strict";qe();gl();cx();dx=()=>{if((typeof J.wasm.initTimeout!="number"||J.wasm.initTimeout<0)&&(J.wasm.initTimeout=0),J.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof J.wasm.proxy!="boolean"&&(J.wasm.proxy=!1),typeof J.wasm.trace!="boolean"&&(J.wasm.trace=!1),typeof J.wasm.numThreads!="number"||!Number.isInteger(J.wasm.numThreads)||J.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)J.wasm.numThreads=1;else{let r=typeof navigator>"u"?ta("node:os").cpus().length:navigator.hardwareConcurrency;J.wasm.numThreads=Math.min(4,Math.ceil((r||1)/2))}},ea=class{async init(e){dx(),await nx(),await rx(e)}async createInferenceSessionHandler(e,n){let t=new Yi;return await t.loadModel(e,n),Promise.resolve(t)}},FA=new ea});var UA={};ar(UA,{InferenceSession:()=>Fl,TRACE:()=>Ar,TRACE_FUNC_BEGIN:()=>Qe,TRACE_FUNC_END:()=>Ke,Tensor:()=>Je,default:()=>GA,env:()=>J,registerBackend:()=>_n});qe();qe();qe();var jl="1.21.0";var GA=sa;{let r=(Sm(),Sr(Im)).onnxjsBackend;_n("webgl",r,-10)}{let r=(fx(),Sr(px)).wasmBackend;_n("webgpu",r,5),_n("webnn",r,5),_n("cpu",r,10),_n("wasm",r,10)}Object.defineProperty(J.versions,"web",{value:jl,enumerable:!0});return Sr(UA);})();
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
typeof exports=="object"&&typeof module=="object"&&(module.exports=ort);
//# sourceMappingURL=ort.all.min.js.map
