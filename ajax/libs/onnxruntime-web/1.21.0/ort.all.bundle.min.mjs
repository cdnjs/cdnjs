/*!
 * ONNX Runtime Web v1.21.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var f1=Object.create;var ii=Object.defineProperty;var h1=Object.getOwnPropertyDescriptor;var m1=Object.getOwnPropertyNames;var g1=Object.getPrototypeOf,b1=Object.prototype.hasOwnProperty;var Ss=(n=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(n,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):n)(function(n){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+n+'" is not supported')});var k=(n,e)=>()=>(n&&(e=n(n=0)),e);var oe=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports),Hn=(n,e)=>{for(var r in e)ii(n,r,{get:e[r],enumerable:!0})},Kp=(n,e,r,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of m1(e))!b1.call(n,o)&&o!==r&&ii(n,o,{get:()=>e[o],enumerable:!(t=h1(e,o))||t.enumerable});return n};var Te=(n,e,r)=>(r=n!=null?f1(g1(n)):{},Kp(e||!n||!n.__esModule?ii(r,"default",{value:n,enumerable:!0}):r,n)),bo=n=>Kp(ii({},"__esModule",{value:!0}),n);var ai,xn,on,y1,Xp,$s=k(()=>{"use strict";ai=new Map,xn=[],on=(n,e,r)=>{if(e&&typeof e.init=="function"&&typeof e.createInferenceSessionHandler=="function"){let t=ai.get(n);if(t===void 0)ai.set(n,{backend:e,priority:r});else{if(t.priority>r)return;if(t.priority===r&&t.backend!==e)throw new Error(`cannot register backend "${n}" using priority ${r}`)}if(r>=0){let o=xn.indexOf(n);o!==-1&&xn.splice(o,1);for(let i=0;i<xn.length;i++)if(ai.get(xn[i]).priority<=r){xn.splice(i,0,n);return}xn.push(n)}return}throw new TypeError("not a valid backend")},y1=async n=>{let e=ai.get(n);if(!e)return"backend not found.";if(e.initialized)return e.backend;if(e.aborted)return e.error;{let r=!!e.initPromise;try{return r||(e.initPromise=e.backend.init(n)),await e.initPromise,e.initialized=!0,e.backend}catch(t){return r||(e.error=`${t}`,e.aborted=!0),e.error}finally{delete e.initPromise}}},Xp=async n=>{let e=n.executionProviders||[],r=e.map(u=>typeof u=="string"?u:u.name),t=r.length===0?xn:r,o,i=[],a=new Set;for(let u of t){let c=await y1(u);typeof c=="string"?i.push({name:u,err:c}):(o||(o=c),o===c&&a.add(u))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:c}of i)r.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${c}`);let s=e.filter(u=>a.has(typeof u=="string"?u:u.name));return[o,new Proxy(n,{get:(u,c)=>c==="executionProviders"?s:Reflect.get(u,c)})]}});var Zp=k(()=>{"use strict";$s()});var Jp,Yp=k(()=>{"use strict";Jp="1.21.0"});var Qp,It,As=k(()=>{"use strict";Yp();Qp="warning",It={wasm:{},webgl:{},webgpu:{},versions:{common:Jp},set logLevel(n){if(n!==void 0){if(typeof n!="string"||["verbose","info","warning","error","fatal"].indexOf(n)===-1)throw new Error(`Unsupported logging level: ${n}`);Qp=n}},get logLevel(){return Qp}};Object.defineProperty(It,"logLevel",{enumerable:!0})});var me,ef=k(()=>{"use strict";As();me=It});var tf,rf,nf=k(()=>{"use strict";tf=(n,e)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=n.dims[3],r.height=n.dims[2];let t=r.getContext("2d");if(t!=null){let o,i;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=n.dims[2],i=n.dims[3]):(o=n.dims[3],i=n.dims[2]);let a=e?.format!==void 0?e.format:"RGB",s=e?.norm,u,c;s===void 0||s.mean===void 0?u=[255,255,255,255]:typeof s.mean=="number"?u=[s.mean,s.mean,s.mean,s.mean]:(u=[s.mean[0],s.mean[1],s.mean[2],0],s.mean[3]!==void 0&&(u[3]=s.mean[3])),s===void 0||s.bias===void 0?c=[0,0,0,0]:typeof s.bias=="number"?c=[s.bias,s.bias,s.bias,s.bias]:(c=[s.bias[0],s.bias[1],s.bias[2],0],s.bias[3]!==void 0&&(c[3]=s.bias[3]));let d=i*o,f=0,h=d,b=d*2,y=-1;a==="RGBA"?(f=0,h=d,b=d*2,y=d*3):a==="RGB"?(f=0,h=d,b=d*2):a==="RBG"&&(f=0,b=d,h=d*2);for(let v=0;v<i;v++)for(let T=0;T<o;T++){let x=(n.data[f++]-c[0])*u[0],w=(n.data[h++]-c[1])*u[1],I=(n.data[b++]-c[2])*u[2],A=y===-1?255:(n.data[y++]-c[3])*u[3];t.fillStyle="rgba("+x+","+w+","+I+","+A+")",t.fillRect(T,v,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},rf=(n,e)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),t;if(r!=null){let o,i,a;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=n.dims[2],i=n.dims[1],a=n.dims[3]):(o=n.dims[3],i=n.dims[2],a=n.dims[1]);let s=e!==void 0&&e.format!==void 0?e.format:"RGB",u=e?.norm,c,d;u===void 0||u.mean===void 0?c=[255,255,255,255]:typeof u.mean=="number"?c=[u.mean,u.mean,u.mean,u.mean]:(c=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(c[3]=u.mean[3])),u===void 0||u.bias===void 0?d=[0,0,0,0]:typeof u.bias=="number"?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(d[3]=u.bias[3]));let f=i*o;if(e!==void 0&&(e.format!==void 0&&a===4&&e.format!=="RGBA"||a===3&&e.format!=="RGB"&&e.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let h=4,b=0,y=1,v=2,T=3,x=0,w=f,I=f*2,A=-1;s==="RGBA"?(x=0,w=f,I=f*2,A=f*3):s==="RGB"?(x=0,w=f,I=f*2):s==="RBG"&&(x=0,I=f,w=f*2),t=r.createImageData(o,i);for(let P=0;P<i*o;b+=h,y+=h,v+=h,T+=h,P++)t.data[b]=(n.data[x++]-d[0])*c[0],t.data[y]=(n.data[w++]-d[1])*c[1],t.data[v]=(n.data[I++]-d[2])*c[2],t.data[T]=A===-1?255:(n.data[A++]-d[3])*c[3]}else throw new Error("Can not access image data");return t}});var Os,of,af,sf,uf,lf,cf=k(()=>{"use strict";si();Os=(n,e)=>{if(n===void 0)throw new Error("Image buffer must be defined");if(e.height===void 0||e.width===void 0)throw new Error("Image height and width must be defined");if(e.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:t}=e,o=e.norm??{mean:255,bias:0},i,a;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?a=[o.bias,o.bias,o.bias,o.bias]:a=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let s=e.format!==void 0?e.format:"RGBA",u=e.tensorFormat!==void 0&&e.tensorFormat!==void 0?e.tensorFormat:"RGB",c=r*t,d=u==="RGBA"?new Float32Array(c*4):new Float32Array(c*3),f=4,h=0,b=1,y=2,v=3,T=0,x=c,w=c*2,I=-1;s==="RGB"&&(f=3,h=0,b=1,y=2,v=-1),u==="RGBA"?I=c*3:u==="RBG"?(T=0,w=c,x=c*2):u==="BGR"&&(w=0,x=c,T=c*2);for(let P=0;P<c;P++,h+=f,y+=f,b+=f,v+=f)d[T++]=(n[h]+a[0])/i[0],d[x++]=(n[b]+a[1])/i[1],d[w++]=(n[y]+a[2])/i[2],I!==-1&&v!==-1&&(d[I++]=(n[v]+a[3])/i[3]);return u==="RGBA"?new dt("float32",d,[1,4,r,t]):new dt("float32",d,[1,3,r,t])},of=async(n,e)=>{let r=typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement,t=typeof ImageData<"u"&&n instanceof ImageData,o=typeof ImageBitmap<"u"&&n instanceof ImageBitmap,i=typeof n=="string",a,s=e??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},c=d=>typeof HTMLCanvasElement<"u"&&d instanceof HTMLCanvasElement||d instanceof OffscreenCanvas?d.getContext("2d"):null;if(r){let d=u();d.width=n.width,d.height=n.height;let f=c(d);if(f!=null){let h=n.height,b=n.width;if(e!==void 0&&e.resizedHeight!==void 0&&e.resizedWidth!==void 0&&(h=e.resizedHeight,b=e.resizedWidth),e!==void 0){if(s=e,e.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");s.tensorFormat="RGBA",s.height=h,s.width=b}else s.tensorFormat="RGBA",s.height=h,s.width=b;f.drawImage(n,0,0),a=f.getImageData(0,0,b,h).data}else throw new Error("Can not access image data")}else if(t){let d,f;if(e!==void 0&&e.resizedWidth!==void 0&&e.resizedHeight!==void 0?(d=e.resizedHeight,f=e.resizedWidth):(d=n.height,f=n.width),e!==void 0&&(s=e),s.format="RGBA",s.height=d,s.width=f,e!==void 0){let h=u();h.width=f,h.height=d;let b=c(h);if(b!=null)b.putImageData(n,0,0),a=b.getImageData(0,0,f,d).data;else throw new Error("Can not access image data")}else a=n.data}else if(o){if(e===void 0)throw new Error("Please provide image config with format for Imagebitmap");let d=u();d.width=n.width,d.height=n.height;let f=c(d);if(f!=null){let h=n.height,b=n.width;return f.drawImage(n,0,0,b,h),a=f.getImageData(0,0,b,h).data,s.height=h,s.width=b,Os(a,s)}else throw new Error("Can not access image data")}else{if(i)return new Promise((d,f)=>{let h=u(),b=c(h);if(!n||!b)return f();let y=new Image;y.crossOrigin="Anonymous",y.src=n,y.onload=()=>{h.width=y.width,h.height=y.height,b.drawImage(y,0,0,h.width,h.height);let v=b.getImageData(0,0,h.width,h.height);s.height=h.height,s.width=h.width,d(Os(v.data,s))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return Os(a,s);throw new Error("Input data provided is not supported - aborted tensor creation")},af=(n,e)=>{let{width:r,height:t,download:o,dispose:i}=e,a=[1,t,r,4];return new dt({location:"texture",type:"float32",texture:n,dims:a,download:o,dispose:i})},sf=(n,e)=>{let{dataType:r,dims:t,download:o,dispose:i}=e;return new dt({location:"gpu-buffer",type:r??"float32",gpuBuffer:n,dims:t,download:o,dispose:i})},uf=(n,e)=>{let{dataType:r,dims:t,download:o,dispose:i}=e;return new dt({location:"ml-tensor",type:r??"float32",mlTensor:n,dims:t,download:o,dispose:i})},lf=(n,e,r)=>new dt({location:"cpu-pinned",type:n,data:e,dims:r??[e.length]})});var wn,yo,df,pf,ff=k(()=>{"use strict";wn=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),yo=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),df=!1,pf=()=>{if(!df){df=!0;let n=typeof BigInt64Array<"u"&&BigInt64Array.from,e=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,t=typeof r<"u"&&r.from;n&&(wn.set("int64",BigInt64Array),yo.set(BigInt64Array,"int64")),e&&(wn.set("uint64",BigUint64Array),yo.set(BigUint64Array,"uint64")),t?(wn.set("float16",r),yo.set(r,"float16")):wn.set("float16",Uint16Array)}}});var hf,mf,gf=k(()=>{"use strict";si();hf=n=>{let e=1;for(let r=0;r<n.length;r++){let t=n[r];if(typeof t!="number"||!Number.isSafeInteger(t))throw new TypeError(`dims[${r}] must be an integer, got: ${t}`);if(t<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${t}`);e*=t}return e},mf=(n,e)=>{switch(n.location){case"cpu":return new dt(n.type,n.data,e);case"cpu-pinned":return new dt({location:"cpu-pinned",data:n.data,type:n.type,dims:e});case"texture":return new dt({location:"texture",texture:n.texture,type:n.type,dims:e});case"gpu-buffer":return new dt({location:"gpu-buffer",gpuBuffer:n.gpuBuffer,type:n.type,dims:e});case"ml-tensor":return new dt({location:"ml-tensor",mlTensor:n.mlTensor,type:n.type,dims:e});default:throw new Error(`tensorReshape: tensor location ${n.location} is not supported`)}}});var dt,si=k(()=>{"use strict";nf();cf();ff();gf();dt=class{constructor(e,r,t){pf();let o,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,o=e.type,i=e.dims,e.location){case"cpu-pinned":{let s=wn.get(o);if(!s)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(o=e,u=t,e==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");s=r}else{let c=wn.get(e);if(c===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(r)){if(e==="float16"&&c===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${c.name} as data.`);e==="uint64"||e==="int64"?s=c.from(r,BigInt):s=c.from(r)}else if(r instanceof c)s=r;else if(r instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(r);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&r instanceof Uint16Array&&c!==Uint16Array)s=new globalThis.Float16Array(r.buffer,r.byteOffset,r.length);else throw new TypeError(`A ${o} tensor's data must be type of ${c}`)}else if(u=r,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let c=typeof e[0];if(c==="string")o="string",s=e;else if(c==="boolean")o="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${c}.`)}else if(e instanceof Uint8ClampedArray)o="uint8",s=Uint8Array.from(e);else{let c=yo.get(e.constructor);if(c===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);o=c,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");i=u,this.cpuData=s,this.dataLocation="cpu"}let a=hf(i);if(this.cpuData&&a!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=a}static async fromImage(e,r){return of(e,r)}static fromTexture(e,r){return af(e,r)}static fromGpuBuffer(e,r){return sf(e,r)}static fromMLTensor(e,r){return uf(e,r)}static fromPinnedBuffer(e,r,t){return lf(e,r,t)}toDataURL(e){return tf(this,e)}toImageData(e){return rf(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,e&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return mf(this,e)}}});var St,Ps=k(()=>{"use strict";si();St=dt});var ui,bf,$t,bt,Es=k(()=>{"use strict";As();ui=(n,e)=>{(typeof It.trace>"u"?!It.wasm.trace:!It.trace)||console.timeStamp(`${n}::ORT::${e}`)},bf=(n,e)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],t=!1;for(let o=0;o<r.length;o++){if(t&&!r[o].includes("TRACE_FUNC")){let i=`FUNC_${n}::${r[o].trim().split(" ")[1]}`;e&&(i+=`::${e}`),ui("CPU",i);return}r[o].includes("TRACE_FUNC")&&(t=!0)}},$t=n=>{(typeof It.trace>"u"?!It.wasm.trace:!It.trace)||bf("BEGIN",n)},bt=n=>{(typeof It.trace>"u"?!It.wasm.trace:!It.trace)||bf("END",n)}});var li,yf=k(()=>{"use strict";$s();Ps();Es();li=class n{constructor(e){this.handler=e}async run(e,r,t){$t();let o={},i={};if(typeof e!="object"||e===null||e instanceof St||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof St)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let c of r){if(typeof c!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(c)===-1)throw new RangeError(`'fetches' contains invalid output name: ${c}.`);o[c]=null}if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else{let c=!1,d=Object.getOwnPropertyNames(r);for(let f of this.outputNames)if(d.indexOf(f)!==-1){let h=r[f];(h===null||h instanceof St)&&(c=!0,a=!1,o[f]=h)}if(c){if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let c of this.inputNames)if(typeof e[c]>"u")throw new Error(`input '${c}' is missing in 'feeds'.`);if(a)for(let c of this.outputNames)o[c]=null;let s=await this.handler.run(e,o,i),u={};for(let c in s)if(Object.hasOwnProperty.call(s,c)){let d=s[c];d instanceof St?u[c]=d:u[c]=new St(d.type,d.data,d.dims)}return bt(),u}async release(){return this.handler.dispose()}static async create(e,r,t,o){$t();let i,a={};if(typeof e=="string"){if(i=e,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof Uint8Array){if(i=e,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer){let d=e,f=0,h=e.byteLength;if(typeof r=="object"&&r!==null)a=r;else if(typeof r=="number"){if(f=r,!Number.isSafeInteger(f))throw new RangeError("'byteOffset' must be an integer.");if(f<0||f>=d.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${d.byteLength}).`);if(h=e.byteLength-f,typeof t=="number"){if(h=t,!Number.isSafeInteger(h))throw new RangeError("'byteLength' must be an integer.");if(h<=0||f+h>d.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${d.byteLength-f}].`);if(typeof o=="object"&&o!==null)a=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof t<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(d,f,h)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[s,u]=await Xp(a),c=await s.createInferenceSessionHandler(i,u);return bt(),new n(c)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var _1,_f=k(()=>{"use strict";yf();_1=li});var vf=k(()=>{"use strict"});var xf=k(()=>{"use strict"});var wf=k(()=>{"use strict"});var Tf=k(()=>{"use strict"});var Cs={};Hn(Cs,{InferenceSession:()=>_1,TRACE:()=>ui,TRACE_FUNC_BEGIN:()=>$t,TRACE_FUNC_END:()=>bt,Tensor:()=>St,env:()=>me,registerBackend:()=>on});var ft=k(()=>{"use strict";Zp();ef();_f();Ps();vf();xf();Es();wf();Tf()});function an(n,e,r,t){if(e===void 0)return x1(n);if(r===void 0)ci(n,e,1);else if(typeof r=="number"&&t===void 0)ci(n,e,r);else if(typeof r=="string"&&t===void 0)ci(n,r,1,e);else if(typeof r=="string"&&typeof t=="number")ci(n,r,t,e);else throw new TypeError("input is valid")}function x1(n){return{verbose:an.verbose.bind(null,n),info:an.info.bind(null,n),warning:an.warning.bind(null,n),error:an.error.bind(null,n),fatal:an.fatal.bind(null,n)}}function ci(n,e,r,t){let o=_o[t||""]||_o[""];Sf[n]<Sf[o.minimalSeverity]||(o.logDateTime&&(e=`${new Date().toISOString()}|${e}`),o.logSourceLocation,v1[o.provider].log(n,e,t))}var Ds,ks,Sf,v1,$f,_o,Be,pi,fi,hi,di,Ct=k(()=>{"use strict";Ds=class{log(e,r,t){}},ks=class{log(e,r,t){console.log(`${this.color(e)} ${t?"\x1B[35m"+t+"\x1B[0m ":""}${r}`)}color(e){switch(e){case"verbose":return"\x1B[34;40mv\x1B[0m";case"info":return"\x1B[32mi\x1B[0m";case"warning":return"\x1B[30;43mw\x1B[0m";case"error":return"\x1B[31;40me\x1B[0m";case"fatal":return"\x1B[101mf\x1B[0m";default:throw new Error(`unsupported severity: ${e}`)}}},Sf={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},v1={none:new Ds,console:new ks},$f={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1},_o={"":$f};(u=>{function n(c,d){u("verbose",c,d)}u.verbose=n;function e(c,d){u("info",c,d)}u.info=e;function r(c,d){u("warning",c,d)}u.warning=r;function t(c,d){u("error",c,d)}u.error=t;function o(c,d){u("fatal",c,d)}u.fatal=o;function i(c){_o={},a("",c||{})}u.reset=i;function a(c,d){if(c==="*")i(d);else{let f=_o[c]||$f;_o[c]={provider:d.provider||f.provider,minimalSeverity:d.minimalSeverity||f.minimalSeverity,logDateTime:d.logDateTime===void 0?f.logDateTime:d.logDateTime,logSourceLocation:d.logSourceLocation===void 0?f.logSourceLocation:d.logSourceLocation}}}u.set=a;function s(c){let d={};c.logLevel&&(d.minimalSeverity=c.logLevel),a("",d)}u.setWithEnv=s})(an||={});Be=an,pi=class{constructor(e,r,t,o,i,a){this.category=e;this.name=r;this.startTime=t;this.endCallback=o;this.timer=i;this.ctx=a}async end(){return this.endCallback(this)}async checkTimer(){if(this.ctx===void 0||this.timer===void 0)throw new Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},fi=class{constructor(e,r,t,o){this.category=e;this.name=r;this.startTime=t;this.endTime=o}},hi=class{constructor(e,r,t){this._started=!1;this._flushPointer=0;this._started=!1,this._maxNumberEvents=e===void 0?1e4:e,this._flushBatchSize=r===void 0?10:r,this._flushIntervalInMilliseconds=t===void 0?5e3:t}static create(e){return e===void 0?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=di(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,r,t,o){let i=this._started?this.begin(e,r,o):void 0,a=!1,s=t();if(s&&typeof s.then=="function")return a=!0,new Promise((u,c)=>{s.then(async d=>{i&&await i.end(),u(d)},async d=>{i&&await i.end(),c(d)})});if(!a&&i){let u=i.end();if(u&&typeof u.then=="function")return new Promise((c,d)=>{u.then(()=>{c(s)},f=>{d(f)})})}return s}begin(e,r,t){if(!this._started)throw new Error("profiler is not started yet");if(t===void 0){let o=di();return this.flush(o),new pi(e,r,o,i=>this.endSync(i))}else{let o=t.beginTimer();return new pi(e,r,0,async i=>this.end(i),o,t)}}async end(e){let r=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new fi(e.category,e.name,e.startTime,r)),this.flush(r))}endSync(e){let r=di();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new fi(e.category,e.name,e.startTime,r)),this.flush(r))}logOneEvent(e){Be.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let r=this._flushPointer;this._flushPointer<r+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=di()}}get started(){return this._started}},di=typeof performance<"u"&&performance.now?()=>performance.now():Date.now});function Af(n,e,r){for(let t of r){let o=t[0],i=t[1],a=t[2],s=t[3],u=t[4];if(n.opType===o){for(let c of e)if((c.domain===i||c.domain==="ai.onnx"&&i==="")&&w1(c.version,a))return{opImpl:s,opInit:u}}}throw new TypeError(`cannot resolve operator '${n.opType}' with opsets: ${e.map(t=>`${t.domain||"ai.onnx"} v${t.version}`).join(", ")}`)}function w1(n,e){if(e.endsWith("+")){let r=Number.parseInt(e.substring(0,e.length-1),10);return!isNaN(r)&&r<=n}else if(e.split("-").length===2){let r=e.split("-"),t=Number.parseInt(r[0],10),o=Number.parseInt(r[1],10);return!isNaN(t)&&!isNaN(o)&&t<=n&&n<=o}else return Number.parseInt(e,10)===n}var Of=k(()=>{"use strict"});var Pf=oe(Ns=>{"use strict";Ns.__esModule=!0;var T1=function(){function n(e){if(!e)throw new TypeError("Invalid argument; `value` has no value.");this.value=n.EMPTY,e&&n.isGuid(e)&&(this.value=e)}return n.isGuid=function(e){var r=e.toString();return e&&(e instanceof n||n.validator.test(r))},n.create=function(){return new n([n.gen(2),n.gen(1),n.gen(1),n.gen(1),n.gen(3)].join("-"))},n.createEmpty=function(){return new n("emptyguid")},n.parse=function(e){return new n(e)},n.raw=function(){return[n.gen(2),n.gen(1),n.gen(1),n.gen(1),n.gen(3)].join("-")},n.gen=function(e){for(var r="",t=0;t<e;t++)r+=((1+Math.random())*65536|0).toString(16).substring(1);return r},n.prototype.equals=function(e){return n.isGuid(e)&&this.value===e.toString()},n.prototype.isEmpty=function(){return this.value===n.EMPTY},n.prototype.toString=function(){return this.value},n.prototype.toJSON=function(){return{value:this.value}},n.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),n.EMPTY="00000000-0000-0000-0000-000000000000",n}();Ns.Guid=T1});function We(n,e,r){this.low=n|0,this.high=e|0,this.unsigned=!!r}function ht(n){return(n&&n.__isLong__)===!0}function Ef(n){var e=Math.clz32(n&-n);return n?31-e:e}function Tn(n,e){var r,t,o;return e?(n>>>=0,(o=0<=n&&n<256)&&(t=Df[n],t)?t:(r=Re(n,0,!0),o&&(Df[n]=r),r)):(n|=0,(o=-128<=n&&n<128)&&(t=Cf[n],t)?t:(r=Re(n,n<0?-1:0,!1),o&&(Cf[n]=r),r))}function kt(n,e){if(isNaN(n))return e?Xr:Gt;if(e){if(n<0)return Xr;if(n>=Rf)return Bf}else{if(n<=-Nf)return yt;if(n+1>=Nf)return Mf}return n<0?kt(-n,e).neg():Re(n%jn|0,n/jn|0,e)}function Re(n,e,r){return new We(n,e,r)}function Rs(n,e,r){if(n.length===0)throw Error("empty string");if(typeof e=="number"?(r=e,e=!1):e=!!e,n==="NaN"||n==="Infinity"||n==="+Infinity"||n==="-Infinity")return e?Xr:Gt;if(r=r||10,r<2||36<r)throw RangeError("radix");var t;if((t=n.indexOf("-"))>0)throw Error("interior hyphen");if(t===0)return Rs(n.substring(1),e,r).neg();for(var o=kt(mi(r,8)),i=Gt,a=0;a<n.length;a+=8){var s=Math.min(8,n.length-a),u=parseInt(n.substring(a,a+s),r);if(s<8){var c=kt(mi(r,s));i=i.mul(c).add(kt(u))}else i=i.mul(o),i=i.add(kt(u))}return i.unsigned=e,i}function Ut(n,e){return typeof n=="number"?kt(n,e):typeof n=="string"?Rs(n,e):Re(n.low,n.high,typeof e=="boolean"?e:n.unsigned)}var Dt,Cf,Df,mi,kf,I1,jn,Rf,Nf,Lf,Gt,Xr,qn,zf,Ls,Mf,Bf,yt,j,sn,zs=k(()=>{Dt=null;try{Dt=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}We.prototype.__isLong__;Object.defineProperty(We.prototype,"__isLong__",{value:!0});We.isLong=ht;Cf={},Df={};We.fromInt=Tn;We.fromNumber=kt;We.fromBits=Re;mi=Math.pow;We.fromString=Rs;We.fromValue=Ut;kf=65536,I1=1<<24,jn=kf*kf,Rf=jn*jn,Nf=Rf/2,Lf=Tn(I1),Gt=Tn(0);We.ZERO=Gt;Xr=Tn(0,!0);We.UZERO=Xr;qn=Tn(1);We.ONE=qn;zf=Tn(1,!0);We.UONE=zf;Ls=Tn(-1);We.NEG_ONE=Ls;Mf=Re(-1,2147483647,!1);We.MAX_VALUE=Mf;Bf=Re(-1,-1,!0);We.MAX_UNSIGNED_VALUE=Bf;yt=Re(0,-2147483648,!1);We.MIN_VALUE=yt;j=We.prototype;j.toInt=function(){return this.unsigned?this.low>>>0:this.low};j.toNumber=function(){return this.unsigned?(this.high>>>0)*jn+(this.low>>>0):this.high*jn+(this.low>>>0)};j.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(yt)){var r=kt(e),t=this.div(r),o=t.mul(r).sub(this);return t.toString(e)+o.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var i=kt(mi(e,6),this.unsigned),a=this,s="";;){var u=a.div(i),c=a.sub(u.mul(i)).toInt()>>>0,d=c.toString(e);if(a=u,a.isZero())return d+s;for(;d.length<6;)d="0"+d;s=""+d+s}};j.getHighBits=function(){return this.high};j.getHighBitsUnsigned=function(){return this.high>>>0};j.getLowBits=function(){return this.low};j.getLowBitsUnsigned=function(){return this.low>>>0};j.getNumBitsAbs=function(){if(this.isNegative())return this.eq(yt)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,r=31;r>0&&(e&1<<r)==0;r--);return this.high!=0?r+33:r+1};j.isZero=function(){return this.high===0&&this.low===0};j.eqz=j.isZero;j.isNegative=function(){return!this.unsigned&&this.high<0};j.isPositive=function(){return this.unsigned||this.high>=0};j.isOdd=function(){return(this.low&1)===1};j.isEven=function(){return(this.low&1)===0};j.equals=function(e){return ht(e)||(e=Ut(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low};j.eq=j.equals;j.notEquals=function(e){return!this.eq(e)};j.neq=j.notEquals;j.ne=j.notEquals;j.lessThan=function(e){return this.comp(e)<0};j.lt=j.lessThan;j.lessThanOrEqual=function(e){return this.comp(e)<=0};j.lte=j.lessThanOrEqual;j.le=j.lessThanOrEqual;j.greaterThan=function(e){return this.comp(e)>0};j.gt=j.greaterThan;j.greaterThanOrEqual=function(e){return this.comp(e)>=0};j.gte=j.greaterThanOrEqual;j.ge=j.greaterThanOrEqual;j.compare=function(e){if(ht(e)||(e=Ut(e)),this.eq(e))return 0;var r=this.isNegative(),t=e.isNegative();return r&&!t?-1:!r&&t?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1};j.comp=j.compare;j.negate=function(){return!this.unsigned&&this.eq(yt)?yt:this.not().add(qn)};j.neg=j.negate;j.add=function(e){ht(e)||(e=Ut(e));var r=this.high>>>16,t=this.high&65535,o=this.low>>>16,i=this.low&65535,a=e.high>>>16,s=e.high&65535,u=e.low>>>16,c=e.low&65535,d=0,f=0,h=0,b=0;return b+=i+c,h+=b>>>16,b&=65535,h+=o+u,f+=h>>>16,h&=65535,f+=t+s,d+=f>>>16,f&=65535,d+=r+a,d&=65535,Re(h<<16|b,d<<16|f,this.unsigned)};j.subtract=function(e){return ht(e)||(e=Ut(e)),this.add(e.neg())};j.sub=j.subtract;j.multiply=function(e){if(this.isZero())return this;if(ht(e)||(e=Ut(e)),Dt){var r=Dt.mul(this.low,this.high,e.low,e.high);return Re(r,Dt.get_high(),this.unsigned)}if(e.isZero())return this.unsigned?Xr:Gt;if(this.eq(yt))return e.isOdd()?yt:Gt;if(e.eq(yt))return this.isOdd()?yt:Gt;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(Lf)&&e.lt(Lf))return kt(this.toNumber()*e.toNumber(),this.unsigned);var t=this.high>>>16,o=this.high&65535,i=this.low>>>16,a=this.low&65535,s=e.high>>>16,u=e.high&65535,c=e.low>>>16,d=e.low&65535,f=0,h=0,b=0,y=0;return y+=a*d,b+=y>>>16,y&=65535,b+=i*d,h+=b>>>16,b&=65535,b+=a*c,h+=b>>>16,b&=65535,h+=o*d,f+=h>>>16,h&=65535,h+=i*c,f+=h>>>16,h&=65535,h+=a*u,f+=h>>>16,h&=65535,f+=t*d+o*c+i*u+a*s,f&=65535,Re(b<<16|y,f<<16|h,this.unsigned)};j.mul=j.multiply;j.divide=function(e){if(ht(e)||(e=Ut(e)),e.isZero())throw Error("division by zero");if(Dt){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var r=(this.unsigned?Dt.div_u:Dt.div_s)(this.low,this.high,e.low,e.high);return Re(r,Dt.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?Xr:Gt;var t,o,i;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return Xr;if(e.gt(this.shru(1)))return zf;i=Xr}else{if(this.eq(yt)){if(e.eq(qn)||e.eq(Ls))return yt;if(e.eq(yt))return qn;var a=this.shr(1);return t=a.div(e).shl(1),t.eq(Gt)?e.isNegative()?qn:Ls:(o=this.sub(e.mul(t)),i=t.add(o.div(e)),i)}else if(e.eq(yt))return this.unsigned?Xr:Gt;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();i=Gt}for(o=this;o.gte(e);){t=Math.max(1,Math.floor(o.toNumber()/e.toNumber()));for(var s=Math.ceil(Math.log(t)/Math.LN2),u=s<=48?1:mi(2,s-48),c=kt(t),d=c.mul(e);d.isNegative()||d.gt(o);)t-=u,c=kt(t,this.unsigned),d=c.mul(e);c.isZero()&&(c=qn),i=i.add(c),o=o.sub(d)}return i};j.div=j.divide;j.modulo=function(e){if(ht(e)||(e=Ut(e)),Dt){var r=(this.unsigned?Dt.rem_u:Dt.rem_s)(this.low,this.high,e.low,e.high);return Re(r,Dt.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))};j.mod=j.modulo;j.rem=j.modulo;j.not=function(){return Re(~this.low,~this.high,this.unsigned)};j.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32};j.clz=j.countLeadingZeros;j.countTrailingZeros=function(){return this.low?Ef(this.low):Ef(this.high)+32};j.ctz=j.countTrailingZeros;j.and=function(e){return ht(e)||(e=Ut(e)),Re(this.low&e.low,this.high&e.high,this.unsigned)};j.or=function(e){return ht(e)||(e=Ut(e)),Re(this.low|e.low,this.high|e.high,this.unsigned)};j.xor=function(e){return ht(e)||(e=Ut(e)),Re(this.low^e.low,this.high^e.high,this.unsigned)};j.shiftLeft=function(e){return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Re(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):Re(0,this.low<<e-32,this.unsigned)};j.shl=j.shiftLeft;j.shiftRight=function(e){return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Re(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):Re(this.high>>e-32,this.high>=0?0:-1,this.unsigned)};j.shr=j.shiftRight;j.shiftRightUnsigned=function(e){return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Re(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):e===32?Re(this.high,0,this.unsigned):Re(this.high>>>e-32,0,this.unsigned)};j.shru=j.shiftRightUnsigned;j.shr_u=j.shiftRightUnsigned;j.rotateLeft=function(e){var r;return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Re(this.high,this.low,this.unsigned):e<32?(r=32-e,Re(this.low<<e|this.high>>>r,this.high<<e|this.low>>>r,this.unsigned)):(e-=32,r=32-e,Re(this.high<<e|this.low>>>r,this.low<<e|this.high>>>r,this.unsigned))};j.rotl=j.rotateLeft;j.rotateRight=function(e){var r;return ht(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Re(this.high,this.low,this.unsigned):e<32?(r=32-e,Re(this.high<<r|this.low>>>e,this.low<<r|this.high>>>e,this.unsigned)):(e-=32,r=32-e,Re(this.low<<r|this.high>>>e,this.high<<r|this.low>>>e,this.unsigned))};j.rotr=j.rotateRight;j.toSigned=function(){return this.unsigned?Re(this.low,this.high,!1):this};j.toUnsigned=function(){return this.unsigned?this:Re(this.low,this.high,!0)};j.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()};j.toBytesLE=function(){var e=this.high,r=this.low;return[r&255,r>>>8&255,r>>>16&255,r>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]};j.toBytesBE=function(){var e=this.high,r=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,r>>>24,r>>>16&255,r>>>8&255,r&255]};We.fromBytes=function(e,r,t){return t?We.fromBytesLE(e,r):We.fromBytesBE(e,r)};We.fromBytesLE=function(e,r){return new We(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,r)};We.fromBytesBE=function(e,r){return new We(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],r)};sn=We});var Ms=oe(gi=>{"use strict";Object.defineProperty(gi,"__esModule",{value:!0});gi.ArgType=void 0;var Ff;(function(n){n[n.INPUT=0]="INPUT",n[n.OUTPUT=1]="OUTPUT"})(Ff||(gi.ArgType=Ff={}))});var In=oe(rr=>{"use strict";Object.defineProperty(rr,"__esModule",{value:!0});rr.SIZE_PREFIX_LENGTH=rr.FILE_IDENTIFIER_LENGTH=rr.SIZEOF_INT=rr.SIZEOF_SHORT=void 0;rr.SIZEOF_SHORT=2;rr.SIZEOF_INT=4;rr.FILE_IDENTIFIER_LENGTH=4;rr.SIZE_PREFIX_LENGTH=4});var Bs=oe(Nt=>{"use strict";Object.defineProperty(Nt,"__esModule",{value:!0});Nt.isLittleEndian=Nt.float64=Nt.float32=Nt.int32=void 0;Nt.int32=new Int32Array(2);Nt.float32=new Float32Array(Nt.int32.buffer);Nt.float64=new Float64Array(Nt.int32.buffer);Nt.isLittleEndian=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1});var Fs=oe(bi=>{"use strict";Object.defineProperty(bi,"__esModule",{value:!0});bi.Encoding=void 0;var Vf;(function(n){n[n.UTF8_BYTES=1]="UTF8_BYTES",n[n.UTF16_STRING=2]="UTF16_STRING"})(Vf||(bi.Encoding=Vf={}))});var Gs=oe(yi=>{"use strict";Object.defineProperty(yi,"__esModule",{value:!0});yi.ByteBuffer=void 0;var nr=In(),_t=Bs(),S1=Fs(),Vs=class n{constructor(e){this.bytes_=e,this.position_=0,this.text_decoder_=new TextDecoder}static allocate(e){return new n(new Uint8Array(e))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(e){this.position_=e}capacity(){return this.bytes_.length}readInt8(e){return this.readUint8(e)<<24>>24}readUint8(e){return this.bytes_[e]}readInt16(e){return this.readUint16(e)<<16>>16}readUint16(e){return this.bytes_[e]|this.bytes_[e+1]<<8}readInt32(e){return this.bytes_[e]|this.bytes_[e+1]<<8|this.bytes_[e+2]<<16|this.bytes_[e+3]<<24}readUint32(e){return this.readInt32(e)>>>0}readInt64(e){return BigInt.asIntN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readUint64(e){return BigInt.asUintN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readFloat32(e){return _t.int32[0]=this.readInt32(e),_t.float32[0]}readFloat64(e){return _t.int32[_t.isLittleEndian?0:1]=this.readInt32(e),_t.int32[_t.isLittleEndian?1:0]=this.readInt32(e+4),_t.float64[0]}writeInt8(e,r){this.bytes_[e]=r}writeUint8(e,r){this.bytes_[e]=r}writeInt16(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8}writeUint16(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8}writeInt32(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8,this.bytes_[e+2]=r>>16,this.bytes_[e+3]=r>>24}writeUint32(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8,this.bytes_[e+2]=r>>16,this.bytes_[e+3]=r>>24}writeInt64(e,r){this.writeInt32(e,Number(BigInt.asIntN(32,r))),this.writeInt32(e+4,Number(BigInt.asIntN(32,r>>BigInt(32))))}writeUint64(e,r){this.writeUint32(e,Number(BigInt.asUintN(32,r))),this.writeUint32(e+4,Number(BigInt.asUintN(32,r>>BigInt(32))))}writeFloat32(e,r){_t.float32[0]=r,this.writeInt32(e,_t.int32[0])}writeFloat64(e,r){_t.float64[0]=r,this.writeInt32(e,_t.int32[_t.isLittleEndian?0:1]),this.writeInt32(e+4,_t.int32[_t.isLittleEndian?1:0])}getBufferIdentifier(){if(this.bytes_.length<this.position_+nr.SIZEOF_INT+nr.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let e="";for(let r=0;r<nr.FILE_IDENTIFIER_LENGTH;r++)e+=String.fromCharCode(this.readInt8(this.position_+nr.SIZEOF_INT+r));return e}__offset(e,r){let t=e-this.readInt32(e);return r<this.readInt16(t)?this.readInt16(t+r):0}__union(e,r){return e.bb_pos=r+this.readInt32(r),e.bb=this,e}__string(e,r){e+=this.readInt32(e);let t=this.readInt32(e);e+=nr.SIZEOF_INT;let o=this.bytes_.subarray(e,e+t);return r===S1.Encoding.UTF8_BYTES?o:this.text_decoder_.decode(o)}__union_with_string(e,r){return typeof e=="string"?this.__string(r):this.__union(e,r)}__indirect(e){return e+this.readInt32(e)}__vector(e){return e+this.readInt32(e)+nr.SIZEOF_INT}__vector_len(e){return this.readInt32(e+this.readInt32(e))}__has_identifier(e){if(e.length!=nr.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+nr.FILE_IDENTIFIER_LENGTH);for(let r=0;r<nr.FILE_IDENTIFIER_LENGTH;r++)if(e.charCodeAt(r)!=this.readInt8(this.position()+nr.SIZEOF_INT+r))return!1;return!0}createScalarList(e,r){let t=[];for(let o=0;o<r;++o){let i=e(o);i!==null&&t.push(i)}return t}createObjList(e,r){let t=[];for(let o=0;o<r;++o){let i=e(o);i!==null&&t.push(i.unpack())}return t}};yi.ByteBuffer=Vs});var Uf=oe(_i=>{"use strict";Object.defineProperty(_i,"__esModule",{value:!0});_i.Builder=void 0;var Gf=Gs(),At=In(),Us=class n{constructor(e){this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null,this.text_encoder=new TextEncoder;let r;e?r=e:r=1024,this.bb=Gf.ByteBuffer.allocate(r),this.space=r}clear(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null}forceDefaults(e){this.force_defaults=e}dataBuffer(){return this.bb}asUint8Array(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())}prep(e,r){e>this.minalign&&(this.minalign=e);let t=~(this.bb.capacity()-this.space+r)+1&e-1;for(;this.space<t+e+r;){let o=this.bb.capacity();this.bb=n.growByteBuffer(this.bb),this.space+=this.bb.capacity()-o}this.pad(t)}pad(e){for(let r=0;r<e;r++)this.bb.writeInt8(--this.space,0)}writeInt8(e){this.bb.writeInt8(this.space-=1,e)}writeInt16(e){this.bb.writeInt16(this.space-=2,e)}writeInt32(e){this.bb.writeInt32(this.space-=4,e)}writeInt64(e){this.bb.writeInt64(this.space-=8,e)}writeFloat32(e){this.bb.writeFloat32(this.space-=4,e)}writeFloat64(e){this.bb.writeFloat64(this.space-=8,e)}addInt8(e){this.prep(1,0),this.writeInt8(e)}addInt16(e){this.prep(2,0),this.writeInt16(e)}addInt32(e){this.prep(4,0),this.writeInt32(e)}addInt64(e){this.prep(8,0),this.writeInt64(e)}addFloat32(e){this.prep(4,0),this.writeFloat32(e)}addFloat64(e){this.prep(8,0),this.writeFloat64(e)}addFieldInt8(e,r,t){(this.force_defaults||r!=t)&&(this.addInt8(r),this.slot(e))}addFieldInt16(e,r,t){(this.force_defaults||r!=t)&&(this.addInt16(r),this.slot(e))}addFieldInt32(e,r,t){(this.force_defaults||r!=t)&&(this.addInt32(r),this.slot(e))}addFieldInt64(e,r,t){(this.force_defaults||r!==t)&&(this.addInt64(r),this.slot(e))}addFieldFloat32(e,r,t){(this.force_defaults||r!=t)&&(this.addFloat32(r),this.slot(e))}addFieldFloat64(e,r,t){(this.force_defaults||r!=t)&&(this.addFloat64(r),this.slot(e))}addFieldOffset(e,r,t){(this.force_defaults||r!=t)&&(this.addOffset(r),this.slot(e))}addFieldStruct(e,r,t){r!=t&&(this.nested(r),this.slot(e))}nested(e){if(e!=this.offset())throw new TypeError("FlatBuffers: struct must be serialized inline.")}notNested(){if(this.isNested)throw new TypeError("FlatBuffers: object serialization must not be nested.")}slot(e){this.vtable!==null&&(this.vtable[e]=this.offset())}offset(){return this.bb.capacity()-this.space}static growByteBuffer(e){let r=e.capacity();if(r&3221225472)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");let t=r<<1,o=Gf.ByteBuffer.allocate(t);return o.setPosition(t-r),o.bytes().set(e.bytes(),t-r),o}addOffset(e){this.prep(At.SIZEOF_INT,0),this.writeInt32(this.offset()-e+At.SIZEOF_INT)}startObject(e){this.notNested(),this.vtable==null&&(this.vtable=[]),this.vtable_in_use=e;for(let r=0;r<e;r++)this.vtable[r]=0;this.isNested=!0,this.object_start=this.offset()}endObject(){if(this.vtable==null||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);let e=this.offset(),r=this.vtable_in_use-1;for(;r>=0&&this.vtable[r]==0;r--);let t=r+1;for(;r>=0;r--)this.addInt16(this.vtable[r]!=0?e-this.vtable[r]:0);let o=2;this.addInt16(e-this.object_start);let i=(t+o)*At.SIZEOF_SHORT;this.addInt16(i);let a=0,s=this.space;e:for(r=0;r<this.vtables.length;r++){let u=this.bb.capacity()-this.vtables[r];if(i==this.bb.readInt16(u)){for(let c=At.SIZEOF_SHORT;c<i;c+=At.SIZEOF_SHORT)if(this.bb.readInt16(s+c)!=this.bb.readInt16(u+c))continue e;a=this.vtables[r];break}}return a?(this.space=this.bb.capacity()-e,this.bb.writeInt32(this.space,a-e)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-e,this.offset()-e)),this.isNested=!1,e}finish(e,r,t){let o=t?At.SIZE_PREFIX_LENGTH:0;if(r){let i=r;if(this.prep(this.minalign,At.SIZEOF_INT+At.FILE_IDENTIFIER_LENGTH+o),i.length!=At.FILE_IDENTIFIER_LENGTH)throw new TypeError("FlatBuffers: file identifier must be length "+At.FILE_IDENTIFIER_LENGTH);for(let a=At.FILE_IDENTIFIER_LENGTH-1;a>=0;a--)this.writeInt8(i.charCodeAt(a))}this.prep(this.minalign,At.SIZEOF_INT+o),this.addOffset(e),o&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)}finishSizePrefixed(e,r){this.finish(e,r,!0)}requiredField(e,r){let t=this.bb.capacity()-e,o=t-this.bb.readInt32(t);if(!(r<this.bb.readInt16(o)&&this.bb.readInt16(o+r)!=0))throw new TypeError("FlatBuffers: field "+r+" must be set")}startVector(e,r,t){this.notNested(),this.vector_num_elems=r,this.prep(At.SIZEOF_INT,e*r),this.prep(t,e*r)}endVector(){return this.writeInt32(this.vector_num_elems),this.offset()}createSharedString(e){if(!e)return 0;if(this.string_maps||(this.string_maps=new Map),this.string_maps.has(e))return this.string_maps.get(e);let r=this.createString(e);return this.string_maps.set(e,r),r}createString(e){if(e==null)return 0;let r;return e instanceof Uint8Array?r=e:r=this.text_encoder.encode(e),this.addInt8(0),this.startVector(1,r.length,1),this.bb.setPosition(this.space-=r.length),this.bb.bytes().set(r,this.space),this.endVector()}createByteVector(e){return e==null?0:(this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length),this.bb.bytes().set(e,this.space),this.endVector())}createObjectOffset(e){return e===null?0:typeof e=="string"?this.createString(e):e.pack(this)}createObjectOffsetList(e){let r=[];for(let t=0;t<e.length;++t){let o=e[t];if(o!==null)r.push(this.createObjectOffset(o));else throw new TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.")}return r}createStructOffsetList(e,r){return r(this,e.length),this.createObjectOffsetList(e.slice().reverse()),this.endVector()}};_i.Builder=Us});var ze=oe(Xe=>{"use strict";Object.defineProperty(Xe,"__esModule",{value:!0});Xe.ByteBuffer=Xe.Builder=Xe.Encoding=Xe.isLittleEndian=Xe.float64=Xe.float32=Xe.int32=Xe.SIZE_PREFIX_LENGTH=Xe.FILE_IDENTIFIER_LENGTH=Xe.SIZEOF_INT=Xe.SIZEOF_SHORT=void 0;var $1=In();Object.defineProperty(Xe,"SIZEOF_SHORT",{enumerable:!0,get:function(){return $1.SIZEOF_SHORT}});var A1=In();Object.defineProperty(Xe,"SIZEOF_INT",{enumerable:!0,get:function(){return A1.SIZEOF_INT}});var O1=In();Object.defineProperty(Xe,"FILE_IDENTIFIER_LENGTH",{enumerable:!0,get:function(){return O1.FILE_IDENTIFIER_LENGTH}});var P1=In();Object.defineProperty(Xe,"SIZE_PREFIX_LENGTH",{enumerable:!0,get:function(){return P1.SIZE_PREFIX_LENGTH}});var vi=Bs();Object.defineProperty(Xe,"int32",{enumerable:!0,get:function(){return vi.int32}});Object.defineProperty(Xe,"float32",{enumerable:!0,get:function(){return vi.float32}});Object.defineProperty(Xe,"float64",{enumerable:!0,get:function(){return vi.float64}});Object.defineProperty(Xe,"isLittleEndian",{enumerable:!0,get:function(){return vi.isLittleEndian}});var E1=Fs();Object.defineProperty(Xe,"Encoding",{enumerable:!0,get:function(){return E1.Encoding}});var C1=Uf();Object.defineProperty(Xe,"Builder",{enumerable:!0,get:function(){return C1.Builder}});var D1=Gs();Object.defineProperty(Xe,"ByteBuffer",{enumerable:!0,get:function(){return D1.ByteBuffer}})});var Hs=oe(or=>{"use strict";var k1=or&&or.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),N1=or&&or.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),L1=or&&or.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&k1(e,n,r);return N1(e,n),e};Object.defineProperty(or,"__esModule",{value:!0});or.ArgTypeAndIndex=void 0;var R1=L1(ze()),Wf=Ms(),Ws=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsArgTypeAndIndex(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsArgTypeAndIndex(e,r){return e.setPosition(e.position()+R1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}argType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):Wf.ArgType.INPUT}index(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}static startArgTypeAndIndex(e){e.startObject(2)}static addArgType(e,r){e.addFieldInt8(0,r,Wf.ArgType.INPUT)}static addIndex(e,r){e.addFieldInt32(1,r,0)}static endArgTypeAndIndex(e){return e.endObject()}static createArgTypeAndIndex(e,r,t){return n.startArgTypeAndIndex(e),n.addArgType(e,r),n.addIndex(e,t),n.endArgTypeAndIndex(e)}};or.ArgTypeAndIndex=Ws});var qs=oe(xi=>{"use strict";Object.defineProperty(xi,"__esModule",{value:!0});xi.AttributeType=void 0;var Hf;(function(n){n[n.UNDEFINED=0]="UNDEFINED",n[n.FLOAT=1]="FLOAT",n[n.INT=2]="INT",n[n.STRING=3]="STRING",n[n.TENSOR=4]="TENSOR",n[n.GRAPH=5]="GRAPH",n[n.FLOATS=6]="FLOATS",n[n.INTS=7]="INTS",n[n.STRINGS=8]="STRINGS",n[n.TENSORS=9]="TENSORS",n[n.GRAPHS=10]="GRAPHS",n[n.SPARSE_TENSOR=11]="SPARSE_TENSOR",n[n.SPARSE_TENSORS=12]="SPARSE_TENSORS"})(Hf||(xi.AttributeType=Hf={}))});var js=oe(wi=>{"use strict";Object.defineProperty(wi,"__esModule",{value:!0});wi.NodeType=void 0;var qf;(function(n){n[n.Primitive=0]="Primitive",n[n.Fused=1]="Fused"})(qf||(wi.NodeType=qf={}))});var Xs=oe(ir=>{"use strict";var z1=ir&&ir.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),M1=ir&&ir.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),B1=ir&&ir.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&z1(e,n,r);return M1(e,n),e};Object.defineProperty(ir,"__esModule",{value:!0});ir.Node=void 0;var F1=B1(ze()),V1=Zs(),jf=js(),Ks=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNode(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNode(e,r){return e.setPosition(e.position()+F1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}domain(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}sinceVersion(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):0}index(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readUint32(this.bb_pos+e):0}opType(e){let r=this.bb.__offset(this.bb_pos,14);return r?this.bb.__string(this.bb_pos+r,e):null}type(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt32(this.bb_pos+e):jf.NodeType.Primitive}executionProviderType(e){let r=this.bb.__offset(this.bb_pos,18);return r?this.bb.__string(this.bb_pos+r,e):null}inputs(e,r){let t=this.bb.__offset(this.bb_pos,20);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,r){let t=this.bb.__offset(this.bb_pos,22);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}attributes(e,r){let t=this.bb.__offset(this.bb_pos,24);return t?(r||new V1.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}attributesLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCounts(e){let r=this.bb.__offset(this.bb_pos,26);return r?this.bb.readInt32(this.bb.__vector(this.bb_pos+r)+e*4):0}inputArgCountsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCountsArray(){let e=this.bb.__offset(this.bb_pos,26);return e?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}implicitInputs(e,r){let t=this.bb.__offset(this.bb_pos,28);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}implicitInputsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNode(e){e.startObject(13)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addDomain(e,r){e.addFieldOffset(2,r,0)}static addSinceVersion(e,r){e.addFieldInt32(3,r,0)}static addIndex(e,r){e.addFieldInt32(4,r,0)}static addOpType(e,r){e.addFieldOffset(5,r,0)}static addType(e,r){e.addFieldInt32(6,r,jf.NodeType.Primitive)}static addExecutionProviderType(e,r){e.addFieldOffset(7,r,0)}static addInputs(e,r){e.addFieldOffset(8,r,0)}static createInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInputsVector(e,r){e.startVector(4,r,4)}static addOutputs(e,r){e.addFieldOffset(9,r,0)}static createOutputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOutputsVector(e,r){e.startVector(4,r,4)}static addAttributes(e,r){e.addFieldOffset(10,r,0)}static createAttributesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startAttributesVector(e,r){e.startVector(4,r,4)}static addInputArgCounts(e,r){e.addFieldOffset(11,r,0)}static createInputArgCountsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addInt32(r[t]);return e.endVector()}static startInputArgCountsVector(e,r){e.startVector(4,r,4)}static addImplicitInputs(e,r){e.addFieldOffset(12,r,0)}static createImplicitInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startImplicitInputsVector(e,r){e.startVector(4,r,4)}static endNode(e){return e.endObject()}static createNode(e,r,t,o,i,a,s,u,c,d,f,h,b,y){return n.startNode(e),n.addName(e,r),n.addDocString(e,t),n.addDomain(e,o),n.addSinceVersion(e,i),n.addIndex(e,a),n.addOpType(e,s),n.addType(e,u),n.addExecutionProviderType(e,c),n.addInputs(e,d),n.addOutputs(e,f),n.addAttributes(e,h),n.addInputArgCounts(e,b),n.addImplicitInputs(e,y),n.endNode(e)}};ir.Node=Ks});var Ys=oe(Ti=>{"use strict";Object.defineProperty(Ti,"__esModule",{value:!0});Ti.EdgeEnd=void 0;var Js=class{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static sizeOf(){return 12}static createEdgeEnd(e,r,t,o){return e.prep(4,12),e.writeInt32(o),e.writeInt32(t),e.writeInt32(r),e.offset()}};Ti.EdgeEnd=Js});var eu=oe(ar=>{"use strict";var G1=ar&&ar.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),U1=ar&&ar.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),W1=ar&&ar.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&G1(e,n,r);return U1(e,n),e};Object.defineProperty(ar,"__esModule",{value:!0});ar.NodeEdge=void 0;var H1=W1(ze()),Kf=Ys(),Qs=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNodeEdge(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodeEdge(e,r){return e.setPosition(e.position()+H1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}inputEdges(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new Kf.EdgeEnd).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}inputEdgesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}outputEdges(e,r){let t=this.bb.__offset(this.bb_pos,8);return t?(r||new Kf.EdgeEnd).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}outputEdgesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNodeEdge(e){e.startObject(3)}static addNodeIndex(e,r){e.addFieldInt32(0,r,0)}static addInputEdges(e,r){e.addFieldOffset(1,r,0)}static startInputEdgesVector(e,r){e.startVector(12,r,4)}static addOutputEdges(e,r){e.addFieldOffset(2,r,0)}static startOutputEdgesVector(e,r){e.startVector(12,r,4)}static endNodeEdge(e){return e.endObject()}static createNodeEdge(e,r,t,o){return n.startNodeEdge(e),n.addNodeIndex(e,r),n.addInputEdges(e,t),n.addOutputEdges(e,o),n.endNodeEdge(e)}};ar.NodeEdge=Qs});var ru=oe(sr=>{"use strict";var q1=sr&&sr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),j1=sr&&sr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),K1=sr&&sr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&q1(e,n,r);return j1(e,n),e};Object.defineProperty(sr,"__esModule",{value:!0});sr.NodesToOptimizeIndices=void 0;var X1=K1(ze()),tu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNodesToOptimizeIndices(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodesToOptimizeIndices(e,r){return e.setPosition(e.position()+X1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndices(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.readUint32(this.bb.__vector(this.bb_pos+r)+e*4):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}numInputs(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}numOutputs(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readUint32(this.bb_pos+e):0}hasVariadicInput(){let e=this.bb.__offset(this.bb_pos,10);return e?!!this.bb.readInt8(this.bb_pos+e):!1}hasVariadicOutput(){let e=this.bb.__offset(this.bb_pos,12);return e?!!this.bb.readInt8(this.bb_pos+e):!1}numVariadicInputs(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readUint32(this.bb_pos+e):0}numVariadicOutputs(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readUint32(this.bb_pos+e):0}static startNodesToOptimizeIndices(e){e.startObject(7)}static addNodeIndices(e,r){e.addFieldOffset(0,r,0)}static createNodeIndicesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addInt32(r[t]);return e.endVector()}static startNodeIndicesVector(e,r){e.startVector(4,r,4)}static addNumInputs(e,r){e.addFieldInt32(1,r,0)}static addNumOutputs(e,r){e.addFieldInt32(2,r,0)}static addHasVariadicInput(e,r){e.addFieldInt8(3,+r,0)}static addHasVariadicOutput(e,r){e.addFieldInt8(4,+r,0)}static addNumVariadicInputs(e,r){e.addFieldInt32(5,r,0)}static addNumVariadicOutputs(e,r){e.addFieldInt32(6,r,0)}static endNodesToOptimizeIndices(e){return e.endObject()}static createNodesToOptimizeIndices(e,r,t,o,i,a,s,u){return n.startNodesToOptimizeIndices(e),n.addNodeIndices(e,r),n.addNumInputs(e,t),n.addNumOutputs(e,o),n.addHasVariadicInput(e,i),n.addHasVariadicOutput(e,a),n.addNumVariadicInputs(e,s),n.addNumVariadicOutputs(e,u),n.endNodesToOptimizeIndices(e)}};sr.NodesToOptimizeIndices=tu});var ou=oe(ur=>{"use strict";var Z1=ur&&ur.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),J1=ur&&ur.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),Y1=ur&&ur.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&Z1(e,n,r);return J1(e,n),e};Object.defineProperty(ur,"__esModule",{value:!0});ur.RuntimeOptimizationRecord=void 0;var Q1=Y1(ze()),eI=ru(),nu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizationRecord(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecord(e,r){return e.setPosition(e.position()+Q1.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}actionId(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}nodesToOptimizeIndices(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new eI.NodesToOptimizeIndices).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}producedOpIds(e,r){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}producedOpIdsLength(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecord(e){e.startObject(4)}static addActionId(e,r){e.addFieldOffset(0,r,0)}static addNodesToOptimizeIndices(e,r){e.addFieldOffset(1,r,0)}static addProducedOpIds(e,r){e.addFieldOffset(3,r,0)}static createProducedOpIdsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startProducedOpIdsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizationRecord(e){return e.endObject()}};ur.RuntimeOptimizationRecord=nu});var au=oe(lr=>{"use strict";var tI=lr&&lr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),rI=lr&&lr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),nI=lr&&lr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&tI(e,n,r);return rI(e,n),e};Object.defineProperty(lr,"__esModule",{value:!0});lr.RuntimeOptimizationRecordContainerEntry=void 0;var oI=nI(ze()),iI=ou(),iu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizationRecordContainerEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecordContainerEntry(e,r){return e.setPosition(e.position()+oI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}optimizerName(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}runtimeOptimizationRecords(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new iI.RuntimeOptimizationRecord).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}runtimeOptimizationRecordsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecordContainerEntry(e){e.startObject(2)}static addOptimizerName(e,r){e.addFieldOffset(0,r,0)}static addRuntimeOptimizationRecords(e,r){e.addFieldOffset(1,r,0)}static createRuntimeOptimizationRecordsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startRuntimeOptimizationRecordsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizationRecordContainerEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createRuntimeOptimizationRecordContainerEntry(e,r,t){return n.startRuntimeOptimizationRecordContainerEntry(e),n.addOptimizerName(e,r),n.addRuntimeOptimizationRecords(e,t),n.endRuntimeOptimizationRecordContainerEntry(e)}};lr.RuntimeOptimizationRecordContainerEntry=iu});var uu=oe(cr=>{"use strict";var aI=cr&&cr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),sI=cr&&cr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),uI=cr&&cr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&aI(e,n,r);return sI(e,n),e};Object.defineProperty(cr,"__esModule",{value:!0});cr.RuntimeOptimizations=void 0;var lI=uI(ze()),cI=au(),su=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizations(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizations(e,r){return e.setPosition(e.position()+lI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}records(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new cI.RuntimeOptimizationRecordContainerEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}recordsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizations(e){e.startObject(1)}static addRecords(e,r){e.addFieldOffset(0,r,0)}static createRecordsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startRecordsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizations(e){return e.endObject()}static createRuntimeOptimizations(e,r){return n.startRuntimeOptimizations(e),n.addRecords(e,r),n.endRuntimeOptimizations(e)}};cr.RuntimeOptimizations=su});var vo=oe(Ii=>{"use strict";Object.defineProperty(Ii,"__esModule",{value:!0});Ii.TensorDataType=void 0;var Xf;(function(n){n[n.UNDEFINED=0]="UNDEFINED",n[n.FLOAT=1]="FLOAT",n[n.UINT8=2]="UINT8",n[n.INT8=3]="INT8",n[n.UINT16=4]="UINT16",n[n.INT16=5]="INT16",n[n.INT32=6]="INT32",n[n.INT64=7]="INT64",n[n.STRING=8]="STRING",n[n.BOOL=9]="BOOL",n[n.FLOAT16=10]="FLOAT16",n[n.DOUBLE=11]="DOUBLE",n[n.UINT32=12]="UINT32",n[n.UINT64=13]="UINT64",n[n.COMPLEX64=14]="COMPLEX64",n[n.COMPLEX128=15]="COMPLEX128",n[n.BFLOAT16=16]="BFLOAT16",n[n.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",n[n.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",n[n.FLOAT8E5M2=19]="FLOAT8E5M2",n[n.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"})(Xf||(Ii.TensorDataType=Xf={}))});var xo=oe(dr=>{"use strict";var dI=dr&&dr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),pI=dr&&dr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),fI=dr&&dr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&dI(e,n,r);return pI(e,n),e};Object.defineProperty(dr,"__esModule",{value:!0});dr.Tensor=void 0;var hI=fI(ze()),Zf=vo(),lu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTensor(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensor(e,r){return e.setPosition(e.position()+hI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}dims(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}dataType(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):Zf.TensorDataType.UNDEFINED}rawData(e){let r=this.bb.__offset(this.bb_pos,12);return r?this.bb.readUint8(this.bb.__vector(this.bb_pos+r)+e):0}rawDataLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}rawDataArray(){let e=this.bb.__offset(this.bb_pos,12);return e?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}stringData(e,r){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}stringDataLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}externalDataOffset(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt64(this.bb_pos+e):BigInt("-1")}static startTensor(e){e.startObject(7)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addDims(e,r){e.addFieldOffset(2,r,0)}static createDimsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startDimsVector(e,r){e.startVector(8,r,8)}static addDataType(e,r){e.addFieldInt32(3,r,Zf.TensorDataType.UNDEFINED)}static addRawData(e,r){e.addFieldOffset(4,r,0)}static createRawDataVector(e,r){e.startVector(1,r.length,1);for(let t=r.length-1;t>=0;t--)e.addInt8(r[t]);return e.endVector()}static startRawDataVector(e,r){e.startVector(1,r,1)}static addStringData(e,r){e.addFieldOffset(5,r,0)}static createStringDataVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startStringDataVector(e,r){e.startVector(4,r,4)}static addExternalDataOffset(e,r){e.addFieldInt64(6,r,BigInt("-1"))}static endTensor(e){return e.endObject()}static createTensor(e,r,t,o,i,a,s,u){return n.startTensor(e),n.addName(e,r),n.addDocString(e,t),n.addDims(e,o),n.addDataType(e,i),n.addRawData(e,a),n.addStringData(e,s),n.addExternalDataOffset(e,u),n.endTensor(e)}};dr.Tensor=lu});var du=oe(pr=>{"use strict";var mI=pr&&pr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),gI=pr&&pr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),bI=pr&&pr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&mI(e,n,r);return gI(e,n),e};Object.defineProperty(pr,"__esModule",{value:!0});pr.SparseTensor=void 0;var yI=bI(ze()),Jf=xo(),cu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsSparseTensor(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsSparseTensor(e,r){return e.setPosition(e.position()+yI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}values(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new Jf.Tensor).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}indices(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new Jf.Tensor).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}dims(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startSparseTensor(e){e.startObject(3)}static addValues(e,r){e.addFieldOffset(0,r,0)}static addIndices(e,r){e.addFieldOffset(1,r,0)}static addDims(e,r){e.addFieldOffset(2,r,0)}static createDimsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startDimsVector(e,r){e.startVector(8,r,8)}static endSparseTensor(e){return e.endObject()}};pr.SparseTensor=cu});var fu=oe(fr=>{"use strict";var _I=fr&&fr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),vI=fr&&fr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),xI=fr&&fr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&_I(e,n,r);return vI(e,n),e};Object.defineProperty(fr,"__esModule",{value:!0});fr.MapType=void 0;var wI=xI(ze()),Yf=vo(),TI=wo(),pu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsMapType(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsMapType(e,r){return e.setPosition(e.position()+wI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}keyType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):Yf.TensorDataType.UNDEFINED}valueType(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new TI.TypeInfo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startMapType(e){e.startObject(2)}static addKeyType(e,r){e.addFieldInt32(0,r,Yf.TensorDataType.UNDEFINED)}static addValueType(e,r){e.addFieldOffset(1,r,0)}static endMapType(e){return e.endObject()}};fr.MapType=pu});var mu=oe(hr=>{"use strict";var II=hr&&hr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),SI=hr&&hr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),$I=hr&&hr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&II(e,n,r);return SI(e,n),e};Object.defineProperty(hr,"__esModule",{value:!0});hr.SequenceType=void 0;var AI=$I(ze()),OI=wo(),hu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsSequenceType(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsSequenceType(e,r){return e.setPosition(e.position()+AI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}elemType(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new OI.TypeInfo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startSequenceType(e){e.startObject(1)}static addElemType(e,r){e.addFieldOffset(0,r,0)}static endSequenceType(e){return e.endObject()}static createSequenceType(e,r){return n.startSequenceType(e),n.addElemType(e,r),n.endSequenceType(e)}};hr.SequenceType=hu});var gu=oe(Si=>{"use strict";Object.defineProperty(Si,"__esModule",{value:!0});Si.DimensionValueType=void 0;var Qf;(function(n){n[n.UNKNOWN=0]="UNKNOWN",n[n.VALUE=1]="VALUE",n[n.PARAM=2]="PARAM"})(Qf||(Si.DimensionValueType=Qf={}))});var yu=oe(mr=>{"use strict";var PI=mr&&mr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),EI=mr&&mr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),CI=mr&&mr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&PI(e,n,r);return EI(e,n),e};Object.defineProperty(mr,"__esModule",{value:!0});mr.DimensionValue=void 0;var DI=CI(ze()),eh=gu(),bu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDimensionValue(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimensionValue(e,r){return e.setPosition(e.position()+DI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}dimType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):eh.DimensionValueType.UNKNOWN}dimValue(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}dimParam(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}static startDimensionValue(e){e.startObject(3)}static addDimType(e,r){e.addFieldInt8(0,r,eh.DimensionValueType.UNKNOWN)}static addDimValue(e,r){e.addFieldInt64(1,r,BigInt("0"))}static addDimParam(e,r){e.addFieldOffset(2,r,0)}static endDimensionValue(e){return e.endObject()}static createDimensionValue(e,r,t,o){return n.startDimensionValue(e),n.addDimType(e,r),n.addDimValue(e,t),n.addDimParam(e,o),n.endDimensionValue(e)}};mr.DimensionValue=bu});var vu=oe(gr=>{"use strict";var kI=gr&&gr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),NI=gr&&gr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),LI=gr&&gr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&kI(e,n,r);return NI(e,n),e};Object.defineProperty(gr,"__esModule",{value:!0});gr.Dimension=void 0;var RI=LI(ze()),zI=yu(),_u=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDimension(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimension(e,r){return e.setPosition(e.position()+RI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}value(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new zI.DimensionValue).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}denotation(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}static startDimension(e){e.startObject(2)}static addValue(e,r){e.addFieldOffset(0,r,0)}static addDenotation(e,r){e.addFieldOffset(1,r,0)}static endDimension(e){return e.endObject()}static createDimension(e,r,t){return n.startDimension(e),n.addValue(e,r),n.addDenotation(e,t),n.endDimension(e)}};gr.Dimension=_u});var wu=oe(br=>{"use strict";var MI=br&&br.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),BI=br&&br.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),FI=br&&br.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&MI(e,n,r);return BI(e,n),e};Object.defineProperty(br,"__esModule",{value:!0});br.Shape=void 0;var VI=FI(ze()),GI=vu(),xu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsShape(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsShape(e,r){return e.setPosition(e.position()+VI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}dim(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new GI.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}dimLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startShape(e){e.startObject(1)}static addDim(e,r){e.addFieldOffset(0,r,0)}static createDimVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startDimVector(e,r){e.startVector(4,r,4)}static endShape(e){return e.endObject()}static createShape(e,r){return n.startShape(e),n.addDim(e,r),n.endShape(e)}};br.Shape=xu});var Iu=oe(yr=>{"use strict";var UI=yr&&yr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),WI=yr&&yr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),HI=yr&&yr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&UI(e,n,r);return WI(e,n),e};Object.defineProperty(yr,"__esModule",{value:!0});yr.TensorTypeAndShape=void 0;var qI=HI(ze()),jI=wu(),th=vo(),Tu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTensorTypeAndShape(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensorTypeAndShape(e,r){return e.setPosition(e.position()+qI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}elemType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):th.TensorDataType.UNDEFINED}shape(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new jI.Shape).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startTensorTypeAndShape(e){e.startObject(2)}static addElemType(e,r){e.addFieldInt32(0,r,th.TensorDataType.UNDEFINED)}static addShape(e,r){e.addFieldOffset(1,r,0)}static endTensorTypeAndShape(e){return e.endObject()}};yr.TensorTypeAndShape=Tu});var Su=oe(un=>{"use strict";Object.defineProperty(un,"__esModule",{value:!0});un.unionListToTypeInfoValue=un.unionToTypeInfoValue=un.TypeInfoValue=void 0;var rh=fu(),nh=mu(),oh=Iu(),$i;(function(n){n[n.NONE=0]="NONE",n[n.tensor_type=1]="tensor_type",n[n.sequence_type=2]="sequence_type",n[n.map_type=3]="map_type"})($i||(un.TypeInfoValue=$i={}));function KI(n,e){switch($i[n]){case"NONE":return null;case"tensor_type":return e(new oh.TensorTypeAndShape);case"sequence_type":return e(new nh.SequenceType);case"map_type":return e(new rh.MapType);default:return null}}un.unionToTypeInfoValue=KI;function XI(n,e,r){switch($i[n]){case"NONE":return null;case"tensor_type":return e(r,new oh.TensorTypeAndShape);case"sequence_type":return e(r,new nh.SequenceType);case"map_type":return e(r,new rh.MapType);default:return null}}un.unionListToTypeInfoValue=XI});var wo=oe(_r=>{"use strict";var ZI=_r&&_r.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),JI=_r&&_r.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),YI=_r&&_r.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&ZI(e,n,r);return JI(e,n),e};Object.defineProperty(_r,"__esModule",{value:!0});_r.TypeInfo=void 0;var QI=YI(ze()),ih=Su(),$u=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTypeInfo(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTypeInfo(e,r){return e.setPosition(e.position()+QI.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}denotation(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}valueType(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint8(this.bb_pos+e):ih.TypeInfoValue.NONE}value(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__union(e,this.bb_pos+r):null}static startTypeInfo(e){e.startObject(3)}static addDenotation(e,r){e.addFieldOffset(0,r,0)}static addValueType(e,r){e.addFieldInt8(1,r,ih.TypeInfoValue.NONE)}static addValue(e,r){e.addFieldOffset(2,r,0)}static endTypeInfo(e){return e.endObject()}static createTypeInfo(e,r,t,o){return n.startTypeInfo(e),n.addDenotation(e,r),n.addValueType(e,t),n.addValue(e,o),n.endTypeInfo(e)}};_r.TypeInfo=$u});var Ou=oe(vr=>{"use strict";var eS=vr&&vr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),tS=vr&&vr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),rS=vr&&vr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&eS(e,n,r);return tS(e,n),e};Object.defineProperty(vr,"__esModule",{value:!0});vr.ValueInfo=void 0;var nS=rS(ze()),oS=wo(),Au=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsValueInfo(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsValueInfo(e,r){return e.setPosition(e.position()+nS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}type(e){let r=this.bb.__offset(this.bb_pos,8);return r?(e||new oS.TypeInfo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startValueInfo(e){e.startObject(3)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addType(e,r){e.addFieldOffset(2,r,0)}static endValueInfo(e){return e.endObject()}};vr.ValueInfo=Au});var Ai=oe(xr=>{"use strict";var iS=xr&&xr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),aS=xr&&xr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),sS=xr&&xr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&iS(e,n,r);return aS(e,n),e};Object.defineProperty(xr,"__esModule",{value:!0});xr.Graph=void 0;var uS=sS(ze()),lS=Xs(),cS=eu(),dS=uu(),pS=du(),fS=xo(),hS=Ou(),Pu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsGraph(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsGraph(e,r){return e.setPosition(e.position()+uS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}initializers(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new fS.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}initializersLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeArgs(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new hS.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}nodes(e,r){let t=this.bb.__offset(this.bb_pos,8);return t?(r||new lS.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}maxNodeIndex(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readUint32(this.bb_pos+e):0}nodeEdges(e,r){let t=this.bb.__offset(this.bb_pos,12);return t?(r||new cS.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeEdgesLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}inputs(e,r){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,r){let t=this.bb.__offset(this.bb_pos,16);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.__vector_len(this.bb_pos+e):0}sparseInitializers(e,r){let t=this.bb.__offset(this.bb_pos,18);return t?(r||new pS.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}sparseInitializersLength(){let e=this.bb.__offset(this.bb_pos,18);return e?this.bb.__vector_len(this.bb_pos+e):0}runtimeOptimizations(e){let r=this.bb.__offset(this.bb_pos,20);return r?(e||new dS.RuntimeOptimizations).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startGraph(e){e.startObject(9)}static addInitializers(e,r){e.addFieldOffset(0,r,0)}static createInitializersVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInitializersVector(e,r){e.startVector(4,r,4)}static addNodeArgs(e,r){e.addFieldOffset(1,r,0)}static createNodeArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodeArgsVector(e,r){e.startVector(4,r,4)}static addNodes(e,r){e.addFieldOffset(2,r,0)}static createNodesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodesVector(e,r){e.startVector(4,r,4)}static addMaxNodeIndex(e,r){e.addFieldInt32(3,r,0)}static addNodeEdges(e,r){e.addFieldOffset(4,r,0)}static createNodeEdgesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodeEdgesVector(e,r){e.startVector(4,r,4)}static addInputs(e,r){e.addFieldOffset(5,r,0)}static createInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInputsVector(e,r){e.startVector(4,r,4)}static addOutputs(e,r){e.addFieldOffset(6,r,0)}static createOutputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOutputsVector(e,r){e.startVector(4,r,4)}static addSparseInitializers(e,r){e.addFieldOffset(7,r,0)}static createSparseInitializersVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startSparseInitializersVector(e,r){e.startVector(4,r,4)}static addRuntimeOptimizations(e,r){e.addFieldOffset(8,r,0)}static endGraph(e){return e.endObject()}};xr.Graph=Pu});var Zs=oe(wr=>{"use strict";var mS=wr&&wr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),gS=wr&&wr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),bS=wr&&wr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&mS(e,n,r);return gS(e,n),e};Object.defineProperty(wr,"__esModule",{value:!0});wr.Attribute=void 0;var yS=bS(ze()),ah=qs(),sh=Ai(),uh=xo(),Eu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsAttribute(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsAttribute(e,r){return e.setPosition(e.position()+yS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}type(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readInt32(this.bb_pos+e):ah.AttributeType.UNDEFINED}f(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readFloat32(this.bb_pos+e):0}i(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}s(e){let r=this.bb.__offset(this.bb_pos,14);return r?this.bb.__string(this.bb_pos+r,e):null}t(e){let r=this.bb.__offset(this.bb_pos,16);return r?(e||new uh.Tensor).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}g(e){let r=this.bb.__offset(this.bb_pos,18);return r?(e||new sh.Graph).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}floats(e){let r=this.bb.__offset(this.bb_pos,20);return r?this.bb.readFloat32(this.bb.__vector(this.bb_pos+r)+e*4):0}floatsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}floatsArray(){let e=this.bb.__offset(this.bb_pos,20);return e?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}ints(e){let r=this.bb.__offset(this.bb_pos,22);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}intsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}strings(e,r){let t=this.bb.__offset(this.bb_pos,24);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}stringsLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}tensors(e,r){let t=this.bb.__offset(this.bb_pos,26);return t?(r||new uh.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}tensorsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}graphs(e,r){let t=this.bb.__offset(this.bb_pos,28);return t?(r||new sh.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}graphsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startAttribute(e){e.startObject(13)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addType(e,r){e.addFieldInt32(2,r,ah.AttributeType.UNDEFINED)}static addF(e,r){e.addFieldFloat32(3,r,0)}static addI(e,r){e.addFieldInt64(4,r,BigInt("0"))}static addS(e,r){e.addFieldOffset(5,r,0)}static addT(e,r){e.addFieldOffset(6,r,0)}static addG(e,r){e.addFieldOffset(7,r,0)}static addFloats(e,r){e.addFieldOffset(8,r,0)}static createFloatsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addFloat32(r[t]);return e.endVector()}static startFloatsVector(e,r){e.startVector(4,r,4)}static addInts(e,r){e.addFieldOffset(9,r,0)}static createIntsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startIntsVector(e,r){e.startVector(8,r,8)}static addStrings(e,r){e.addFieldOffset(10,r,0)}static createStringsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startStringsVector(e,r){e.startVector(4,r,4)}static addTensors(e,r){e.addFieldOffset(11,r,0)}static createTensorsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startTensorsVector(e,r){e.startVector(4,r,4)}static addGraphs(e,r){e.addFieldOffset(12,r,0)}static createGraphsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startGraphsVector(e,r){e.startVector(4,r,4)}static endAttribute(e){return e.endObject()}};wr.Attribute=Eu});var Du=oe(Tr=>{"use strict";var _S=Tr&&Tr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),vS=Tr&&Tr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),xS=Tr&&Tr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&_S(e,n,r);return vS(e,n),e};Object.defineProperty(Tr,"__esModule",{value:!0});Tr.DeprecatedKernelCreateInfos=void 0;var wS=xS(ze()),Cu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedKernelCreateInfos(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedKernelCreateInfos(e,r){return e.setPosition(e.position()+wS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndices(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.readUint32(this.bb.__vector(this.bb_pos+r)+e*4):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}kernelDefHashes(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.readUint64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}kernelDefHashesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedKernelCreateInfos(e){e.startObject(2)}static addNodeIndices(e,r){e.addFieldOffset(0,r,0)}static createNodeIndicesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addInt32(r[t]);return e.endVector()}static startNodeIndicesVector(e,r){e.startVector(4,r,4)}static addKernelDefHashes(e,r){e.addFieldOffset(1,r,0)}static createKernelDefHashesVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startKernelDefHashesVector(e,r){e.startVector(8,r,8)}static endDeprecatedKernelCreateInfos(e){return e.endObject()}static createDeprecatedKernelCreateInfos(e,r,t){return n.startDeprecatedKernelCreateInfos(e),n.addNodeIndices(e,r),n.addKernelDefHashes(e,t),n.endDeprecatedKernelCreateInfos(e)}};Tr.DeprecatedKernelCreateInfos=Cu});var lh=oe(Ir=>{"use strict";var TS=Ir&&Ir.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),IS=Ir&&Ir.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),SS=Ir&&Ir.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&TS(e,n,r);return IS(e,n),e};Object.defineProperty(Ir,"__esModule",{value:!0});Ir.DeprecatedNodeIndexAndKernelDefHash=void 0;var $S=SS(ze()),ku=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedNodeIndexAndKernelDefHash(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedNodeIndexAndKernelDefHash(e,r){return e.setPosition(e.position()+$S.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}kernelDefHash(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint64(this.bb_pos+e):BigInt("0")}static startDeprecatedNodeIndexAndKernelDefHash(e){e.startObject(2)}static addNodeIndex(e,r){e.addFieldInt32(0,r,0)}static addKernelDefHash(e,r){e.addFieldInt64(1,r,BigInt("0"))}static endDeprecatedNodeIndexAndKernelDefHash(e){return e.endObject()}static createDeprecatedNodeIndexAndKernelDefHash(e,r,t){return n.startDeprecatedNodeIndexAndKernelDefHash(e),n.addNodeIndex(e,r),n.addKernelDefHash(e,t),n.endDeprecatedNodeIndexAndKernelDefHash(e)}};Ir.DeprecatedNodeIndexAndKernelDefHash=ku});var Lu=oe(Sr=>{"use strict";var AS=Sr&&Sr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),OS=Sr&&Sr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),PS=Sr&&Sr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&AS(e,n,r);return OS(e,n),e};Object.defineProperty(Sr,"__esModule",{value:!0});Sr.DeprecatedSubGraphSessionState=void 0;var ES=PS(ze()),CS=Ru(),Nu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedSubGraphSessionState(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedSubGraphSessionState(e,r){return e.setPosition(e.position()+ES.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}graphId(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}sessionState(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new CS.DeprecatedSessionState).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startDeprecatedSubGraphSessionState(e){e.startObject(2)}static addGraphId(e,r){e.addFieldOffset(0,r,0)}static addSessionState(e,r){e.addFieldOffset(1,r,0)}static endDeprecatedSubGraphSessionState(e){let r=e.endObject();return e.requiredField(r,4),r}};Sr.DeprecatedSubGraphSessionState=Nu});var Ru=oe($r=>{"use strict";var DS=$r&&$r.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),kS=$r&&$r.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),NS=$r&&$r.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&DS(e,n,r);return kS(e,n),e};Object.defineProperty($r,"__esModule",{value:!0});$r.DeprecatedSessionState=void 0;var LS=NS(ze()),RS=Du(),zS=Lu(),zu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedSessionState(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedSessionState(e,r){return e.setPosition(e.position()+LS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}kernels(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new RS.DeprecatedKernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}subGraphSessionStates(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new zS.DeprecatedSubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}subGraphSessionStatesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedSessionState(e){e.startObject(2)}static addKernels(e,r){e.addFieldOffset(0,r,0)}static addSubGraphSessionStates(e,r){e.addFieldOffset(1,r,0)}static createSubGraphSessionStatesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startSubGraphSessionStatesVector(e,r){e.startVector(4,r,4)}static endDeprecatedSessionState(e){return e.endObject()}static createDeprecatedSessionState(e,r,t){return n.startDeprecatedSessionState(e),n.addKernels(e,r),n.addSubGraphSessionStates(e,t),n.endDeprecatedSessionState(e)}};$r.DeprecatedSessionState=zu});var Bu=oe(Ar=>{"use strict";var MS=Ar&&Ar.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),BS=Ar&&Ar.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),FS=Ar&&Ar.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&MS(e,n,r);return BS(e,n),e};Object.defineProperty(Ar,"__esModule",{value:!0});Ar.KernelTypeStrArgsEntry=void 0;var VS=FS(ze()),GS=Hs(),Mu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsKernelTypeStrArgsEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrArgsEntry(e,r){return e.setPosition(e.position()+VS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}kernelTypeStr(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}args(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new GS.ArgTypeAndIndex).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}argsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrArgsEntry(e){e.startObject(2)}static addKernelTypeStr(e,r){e.addFieldOffset(0,r,0)}static addArgs(e,r){e.addFieldOffset(1,r,0)}static createArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startArgsVector(e,r){e.startVector(4,r,4)}static endKernelTypeStrArgsEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createKernelTypeStrArgsEntry(e,r,t){return n.startKernelTypeStrArgsEntry(e),n.addKernelTypeStr(e,r),n.addArgs(e,t),n.endKernelTypeStrArgsEntry(e)}};Ar.KernelTypeStrArgsEntry=Mu});var Vu=oe(Or=>{"use strict";var US=Or&&Or.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),WS=Or&&Or.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),HS=Or&&Or.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&US(e,n,r);return WS(e,n),e};Object.defineProperty(Or,"__esModule",{value:!0});Or.OpIdKernelTypeStrArgsEntry=void 0;var qS=HS(ze()),jS=Bu(),Fu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsOpIdKernelTypeStrArgsEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOpIdKernelTypeStrArgsEntry(e,r){return e.setPosition(e.position()+qS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}opId(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}kernelTypeStrArgs(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new jS.KernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}kernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startOpIdKernelTypeStrArgsEntry(e){e.startObject(2)}static addOpId(e,r){e.addFieldOffset(0,r,0)}static addKernelTypeStrArgs(e,r){e.addFieldOffset(1,r,0)}static createKernelTypeStrArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startKernelTypeStrArgsVector(e,r){e.startVector(4,r,4)}static endOpIdKernelTypeStrArgsEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createOpIdKernelTypeStrArgsEntry(e,r,t){return n.startOpIdKernelTypeStrArgsEntry(e),n.addOpId(e,r),n.addKernelTypeStrArgs(e,t),n.endOpIdKernelTypeStrArgsEntry(e)}};Or.OpIdKernelTypeStrArgsEntry=Fu});var Uu=oe(Pr=>{"use strict";var KS=Pr&&Pr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),XS=Pr&&Pr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),ZS=Pr&&Pr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&KS(e,n,r);return XS(e,n),e};Object.defineProperty(Pr,"__esModule",{value:!0});Pr.KernelTypeStrResolver=void 0;var JS=ZS(ze()),YS=Vu(),Gu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsKernelTypeStrResolver(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrResolver(e,r){return e.setPosition(e.position()+JS.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}opKernelTypeStrArgs(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new YS.OpIdKernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opKernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrResolver(e){e.startObject(1)}static addOpKernelTypeStrArgs(e,r){e.addFieldOffset(0,r,0)}static createOpKernelTypeStrArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOpKernelTypeStrArgsVector(e,r){e.startVector(4,r,4)}static endKernelTypeStrResolver(e){return e.endObject()}static createKernelTypeStrResolver(e,r){return n.startKernelTypeStrResolver(e),n.addOpKernelTypeStrArgs(e,r),n.endKernelTypeStrResolver(e)}};Pr.KernelTypeStrResolver=Gu});var Hu=oe(Er=>{"use strict";var QS=Er&&Er.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),e$=Er&&Er.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),t$=Er&&Er.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&QS(e,n,r);return e$(e,n),e};Object.defineProperty(Er,"__esModule",{value:!0});Er.OperatorSetId=void 0;var r$=t$(ze()),Wu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsOperatorSetId(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOperatorSetId(e,r){return e.setPosition(e.position()+r$.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}domain(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}version(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}static startOperatorSetId(e){e.startObject(2)}static addDomain(e,r){e.addFieldOffset(0,r,0)}static addVersion(e,r){e.addFieldInt64(1,r,BigInt("0"))}static endOperatorSetId(e){return e.endObject()}static createOperatorSetId(e,r,t){return n.startOperatorSetId(e),n.addDomain(e,r),n.addVersion(e,t),n.endOperatorSetId(e)}};Er.OperatorSetId=Wu});var ju=oe(Cr=>{"use strict";var n$=Cr&&Cr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),o$=Cr&&Cr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),i$=Cr&&Cr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&n$(e,n,r);return o$(e,n),e};Object.defineProperty(Cr,"__esModule",{value:!0});Cr.StringStringEntry=void 0;var a$=i$(ze()),qu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsStringStringEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsStringStringEntry(e,r){return e.setPosition(e.position()+a$.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}key(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}value(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}static startStringStringEntry(e){e.startObject(2)}static addKey(e,r){e.addFieldOffset(0,r,0)}static addValue(e,r){e.addFieldOffset(1,r,0)}static endStringStringEntry(e){return e.endObject()}static createStringStringEntry(e,r,t){return n.startStringStringEntry(e),n.addKey(e,r),n.addValue(e,t),n.endStringStringEntry(e)}};Cr.StringStringEntry=qu});var Xu=oe(Dr=>{"use strict";var s$=Dr&&Dr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),u$=Dr&&Dr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),l$=Dr&&Dr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&s$(e,n,r);return u$(e,n),e};Object.defineProperty(Dr,"__esModule",{value:!0});Dr.Model=void 0;var c$=l$(ze()),d$=Ai(),p$=Hu(),f$=ju(),Ku=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsModel(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsModel(e,r){return e.setPosition(e.position()+c$.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}irVersion(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}opsetImport(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new p$.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opsetImportLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}producerName(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}producerVersion(e){let r=this.bb.__offset(this.bb_pos,10);return r?this.bb.__string(this.bb_pos+r,e):null}domain(e){let r=this.bb.__offset(this.bb_pos,12);return r?this.bb.__string(this.bb_pos+r,e):null}modelVersion(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}docString(e){let r=this.bb.__offset(this.bb_pos,16);return r?this.bb.__string(this.bb_pos+r,e):null}graph(e){let r=this.bb.__offset(this.bb_pos,18);return r?(e||new d$.Graph).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}graphDocString(e){let r=this.bb.__offset(this.bb_pos,20);return r?this.bb.__string(this.bb_pos+r,e):null}metadataProps(e,r){let t=this.bb.__offset(this.bb_pos,22);return t?(r||new f$.StringStringEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}metadataPropsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}static startModel(e){e.startObject(10)}static addIrVersion(e,r){e.addFieldInt64(0,r,BigInt("0"))}static addOpsetImport(e,r){e.addFieldOffset(1,r,0)}static createOpsetImportVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOpsetImportVector(e,r){e.startVector(4,r,4)}static addProducerName(e,r){e.addFieldOffset(2,r,0)}static addProducerVersion(e,r){e.addFieldOffset(3,r,0)}static addDomain(e,r){e.addFieldOffset(4,r,0)}static addModelVersion(e,r){e.addFieldInt64(5,r,BigInt("0"))}static addDocString(e,r){e.addFieldOffset(6,r,0)}static addGraph(e,r){e.addFieldOffset(7,r,0)}static addGraphDocString(e,r){e.addFieldOffset(8,r,0)}static addMetadataProps(e,r){e.addFieldOffset(9,r,0)}static createMetadataPropsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startMetadataPropsVector(e,r){e.startVector(4,r,4)}static endModel(e){return e.endObject()}};Dr.Model=Ku});var ch=oe(kr=>{"use strict";var h$=kr&&kr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),m$=kr&&kr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),g$=kr&&kr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&h$(e,n,r);return m$(e,n),e};Object.defineProperty(kr,"__esModule",{value:!0});kr.InferenceSession=void 0;var b$=g$(ze()),y$=Uu(),_$=Xu(),Zu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsInferenceSession(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsInferenceSession(e,r){return e.setPosition(e.position()+b$.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static bufferHasIdentifier(e){return e.__has_identifier("ORTM")}ortVersion(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}model(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new _$.Model).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}kernelTypeStrResolver(e){let r=this.bb.__offset(this.bb_pos,10);return r?(e||new y$.KernelTypeStrResolver).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startInferenceSession(e){e.startObject(4)}static addOrtVersion(e,r){e.addFieldOffset(0,r,0)}static addModel(e,r){e.addFieldOffset(1,r,0)}static addKernelTypeStrResolver(e,r){e.addFieldOffset(3,r,0)}static endInferenceSession(e){return e.endObject()}static finishInferenceSessionBuffer(e,r){e.finish(r,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(e,r){e.finish(r,"ORTM",!0)}};kr.InferenceSession=Zu});var v$,x$,Oi,Lt,w$,T$,I$,S$,$$,A$,O$,P$,Ju,Yu,E$,C$,D$,k$,Qu,N$,L$,R$,z$,M$,B$,F$,V$,G$,U$,W$,H$,q$,To,el,j$,tl,K$,dh=k(()=>{"use strict";v$=Te(Ms()),x$=Te(Hs()),Oi=Te(Zs()),Lt=Te(qs()),w$=Te(Du()),T$=Te(lh()),I$=Te(Ru()),S$=Te(Lu()),$$=Te(vu()),A$=Te(yu()),O$=Te(gu()),P$=Te(Ys()),Ju=Te(Ai()),Yu=Te(ch()),E$=Te(Bu()),C$=Te(Uu()),D$=Te(fu()),k$=Te(Xu()),Qu=Te(Xs()),N$=Te(eu()),L$=Te(js()),R$=Te(ru()),z$=Te(Vu()),M$=Te(Hu()),B$=Te(ou()),F$=Te(au()),V$=Te(uu()),G$=Te(mu()),U$=Te(wu()),W$=Te(du()),H$=Te(ju()),q$=Te(xo()),To=Te(vo()),el=Te(Iu()),j$=Te(wo()),tl=Te(Su()),K$=Te(Ou())});var Io=k(()=>{"use strict";dh()});var fh=oe((T4,ph)=>{"use strict";ph.exports=X$;function X$(n,e){for(var r=new Array(arguments.length-1),t=0,o=2,i=!0;o<arguments.length;)r[t++]=arguments[o++];return new Promise(function(s,u){r[t]=function(d){if(i)if(i=!1,d)u(d);else{for(var f=new Array(arguments.length-1),h=0;h<f.length;)f[h++]=arguments[h];s.apply(null,f)}};try{n.apply(e||null,r)}catch(c){i&&(i=!1,u(c))}})}});var bh=oe(gh=>{"use strict";var Ei=gh;Ei.length=function(e){var r=e.length;if(!r)return 0;for(var t=0;--r%4>1&&e.charAt(r)==="=";)++t;return Math.ceil(e.length*3)/4-t};var Kn=new Array(64),mh=new Array(123);for(Wt=0;Wt<64;)mh[Kn[Wt]=Wt<26?Wt+65:Wt<52?Wt+71:Wt<62?Wt-4:Wt-59|43]=Wt++;var Wt;Ei.encode=function(e,r,t){for(var o=null,i=[],a=0,s=0,u;r<t;){var c=e[r++];switch(s){case 0:i[a++]=Kn[c>>2],u=(c&3)<<4,s=1;break;case 1:i[a++]=Kn[u|c>>4],u=(c&15)<<2,s=2;break;case 2:i[a++]=Kn[u|c>>6],i[a++]=Kn[c&63],s=0;break}a>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,i)),a=0)}return s&&(i[a++]=Kn[u],i[a++]=61,s===1&&(i[a++]=61)),o?(a&&o.push(String.fromCharCode.apply(String,i.slice(0,a))),o.join("")):String.fromCharCode.apply(String,i.slice(0,a))};var hh="invalid encoding";Ei.decode=function(e,r,t){for(var o=t,i=0,a,s=0;s<e.length;){var u=e.charCodeAt(s++);if(u===61&&i>1)break;if((u=mh[u])===void 0)throw Error(hh);switch(i){case 0:a=u,i=1;break;case 1:r[t++]=a<<2|(u&48)>>4,a=u,i=2;break;case 2:r[t++]=(a&15)<<4|(u&60)>>2,a=u,i=3;break;case 3:r[t++]=(a&3)<<6|u,i=0;break}}if(i===1)throw Error(hh);return t-o};Ei.test=function(e){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)}});var _h=oe((S4,yh)=>{"use strict";yh.exports=Ci;function Ci(){this._listeners={}}Ci.prototype.on=function(e,r,t){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:r,ctx:t||this}),this};Ci.prototype.off=function(e,r){if(e===void 0)this._listeners={};else if(r===void 0)this._listeners[e]=[];else for(var t=this._listeners[e],o=0;o<t.length;)t[o].fn===r?t.splice(o,1):++o;return this};Ci.prototype.emit=function(e){var r=this._listeners[e];if(r){for(var t=[],o=1;o<arguments.length;)t.push(arguments[o++]);for(o=0;o<r.length;)r[o].fn.apply(r[o++].ctx,t)}return this}});var $h=oe(($4,Sh)=>{"use strict";Sh.exports=vh(vh);function vh(n){return typeof Float32Array<"u"?function(){var e=new Float32Array([-0]),r=new Uint8Array(e.buffer),t=r[3]===128;function o(u,c,d){e[0]=u,c[d]=r[0],c[d+1]=r[1],c[d+2]=r[2],c[d+3]=r[3]}function i(u,c,d){e[0]=u,c[d]=r[3],c[d+1]=r[2],c[d+2]=r[1],c[d+3]=r[0]}n.writeFloatLE=t?o:i,n.writeFloatBE=t?i:o;function a(u,c){return r[0]=u[c],r[1]=u[c+1],r[2]=u[c+2],r[3]=u[c+3],e[0]}function s(u,c){return r[3]=u[c],r[2]=u[c+1],r[1]=u[c+2],r[0]=u[c+3],e[0]}n.readFloatLE=t?a:s,n.readFloatBE=t?s:a}():function(){function e(t,o,i,a){var s=o<0?1:0;if(s&&(o=-o),o===0)t(1/o>0?0:2147483648,i,a);else if(isNaN(o))t(2143289344,i,a);else if(o>34028234663852886e22)t((s<<31|2139095040)>>>0,i,a);else if(o<11754943508222875e-54)t((s<<31|Math.round(o/1401298464324817e-60))>>>0,i,a);else{var u=Math.floor(Math.log(o)/Math.LN2),c=Math.round(o*Math.pow(2,-u)*8388608)&8388607;t((s<<31|u+127<<23|c)>>>0,i,a)}}n.writeFloatLE=e.bind(null,xh),n.writeFloatBE=e.bind(null,wh);function r(t,o,i){var a=t(o,i),s=(a>>31)*2+1,u=a>>>23&255,c=a&8388607;return u===255?c?NaN:s*(1/0):u===0?s*1401298464324817e-60*c:s*Math.pow(2,u-150)*(c+8388608)}n.readFloatLE=r.bind(null,Th),n.readFloatBE=r.bind(null,Ih)}(),typeof Float64Array<"u"?function(){var e=new Float64Array([-0]),r=new Uint8Array(e.buffer),t=r[7]===128;function o(u,c,d){e[0]=u,c[d]=r[0],c[d+1]=r[1],c[d+2]=r[2],c[d+3]=r[3],c[d+4]=r[4],c[d+5]=r[5],c[d+6]=r[6],c[d+7]=r[7]}function i(u,c,d){e[0]=u,c[d]=r[7],c[d+1]=r[6],c[d+2]=r[5],c[d+3]=r[4],c[d+4]=r[3],c[d+5]=r[2],c[d+6]=r[1],c[d+7]=r[0]}n.writeDoubleLE=t?o:i,n.writeDoubleBE=t?i:o;function a(u,c){return r[0]=u[c],r[1]=u[c+1],r[2]=u[c+2],r[3]=u[c+3],r[4]=u[c+4],r[5]=u[c+5],r[6]=u[c+6],r[7]=u[c+7],e[0]}function s(u,c){return r[7]=u[c],r[6]=u[c+1],r[5]=u[c+2],r[4]=u[c+3],r[3]=u[c+4],r[2]=u[c+5],r[1]=u[c+6],r[0]=u[c+7],e[0]}n.readDoubleLE=t?a:s,n.readDoubleBE=t?s:a}():function(){function e(t,o,i,a,s,u){var c=a<0?1:0;if(c&&(a=-a),a===0)t(0,s,u+o),t(1/a>0?0:2147483648,s,u+i);else if(isNaN(a))t(0,s,u+o),t(2146959360,s,u+i);else if(a>17976931348623157e292)t(0,s,u+o),t((c<<31|2146435072)>>>0,s,u+i);else{var d;if(a<22250738585072014e-324)d=a/5e-324,t(d>>>0,s,u+o),t((c<<31|d/4294967296)>>>0,s,u+i);else{var f=Math.floor(Math.log(a)/Math.LN2);f===1024&&(f=1023),d=a*Math.pow(2,-f),t(d*4503599627370496>>>0,s,u+o),t((c<<31|f+1023<<20|d*1048576&1048575)>>>0,s,u+i)}}}n.writeDoubleLE=e.bind(null,xh,0,4),n.writeDoubleBE=e.bind(null,wh,4,0);function r(t,o,i,a,s){var u=t(a,s+o),c=t(a,s+i),d=(c>>31)*2+1,f=c>>>20&2047,h=4294967296*(c&1048575)+u;return f===2047?h?NaN:d*(1/0):f===0?d*5e-324*h:d*Math.pow(2,f-1075)*(h+4503599627370496)}n.readDoubleLE=r.bind(null,Th,0,4),n.readDoubleBE=r.bind(null,Ih,4,0)}(),n}function xh(n,e,r){e[r]=n&255,e[r+1]=n>>>8&255,e[r+2]=n>>>16&255,e[r+3]=n>>>24}function wh(n,e,r){e[r]=n>>>24,e[r+1]=n>>>16&255,e[r+2]=n>>>8&255,e[r+3]=n&255}function Th(n,e){return(n[e]|n[e+1]<<8|n[e+2]<<16|n[e+3]<<24)>>>0}function Ih(n,e){return(n[e]<<24|n[e+1]<<16|n[e+2]<<8|n[e+3])>>>0}});var Ah=oe((exports,module)=>{"use strict";module.exports=inquire;function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(n){}return null}});var Ph=oe(Oh=>{"use strict";var rl=Oh;rl.length=function(e){for(var r=0,t=0,o=0;o<e.length;++o)t=e.charCodeAt(o),t<128?r+=1:t<2048?r+=2:(t&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320?(++o,r+=4):r+=3;return r};rl.read=function(e,r,t){var o=t-r;if(o<1)return"";for(var i=null,a=[],s=0,u;r<t;)u=e[r++],u<128?a[s++]=u:u>191&&u<224?a[s++]=(u&31)<<6|e[r++]&63:u>239&&u<365?(u=((u&7)<<18|(e[r++]&63)<<12|(e[r++]&63)<<6|e[r++]&63)-65536,a[s++]=55296+(u>>10),a[s++]=56320+(u&1023)):a[s++]=(u&15)<<12|(e[r++]&63)<<6|e[r++]&63,s>8191&&((i||(i=[])).push(String.fromCharCode.apply(String,a)),s=0);return i?(s&&i.push(String.fromCharCode.apply(String,a.slice(0,s))),i.join("")):String.fromCharCode.apply(String,a.slice(0,s))};rl.write=function(e,r,t){for(var o=t,i,a,s=0;s<e.length;++s)i=e.charCodeAt(s),i<128?r[t++]=i:i<2048?(r[t++]=i>>6|192,r[t++]=i&63|128):(i&64512)===55296&&((a=e.charCodeAt(s+1))&64512)===56320?(i=65536+((i&1023)<<10)+(a&1023),++s,r[t++]=i>>18|240,r[t++]=i>>12&63|128,r[t++]=i>>6&63|128,r[t++]=i&63|128):(r[t++]=i>>12|224,r[t++]=i>>6&63|128,r[t++]=i&63|128);return t-o}});var Ch=oe((O4,Eh)=>{"use strict";Eh.exports=Z$;function Z$(n,e,r){var t=r||8192,o=t>>>1,i=null,a=t;return function(u){if(u<1||u>o)return n(u);a+u>t&&(i=n(t),a=0);var c=e.call(i,a,a+=u);return a&7&&(a=(a|7)+1),c}}});var kh=oe((P4,Dh)=>{"use strict";Dh.exports=lt;var So=cn();function lt(n,e){this.lo=n>>>0,this.hi=e>>>0}var Sn=lt.zero=new lt(0,0);Sn.toNumber=function(){return 0};Sn.zzEncode=Sn.zzDecode=function(){return this};Sn.length=function(){return 1};var J$=lt.zeroHash="\0\0\0\0\0\0\0\0";lt.fromNumber=function(e){if(e===0)return Sn;var r=e<0;r&&(e=-e);var t=e>>>0,o=(e-t)/4294967296>>>0;return r&&(o=~o>>>0,t=~t>>>0,++t>4294967295&&(t=0,++o>4294967295&&(o=0))),new lt(t,o)};lt.from=function(e){if(typeof e=="number")return lt.fromNumber(e);if(So.isString(e))if(So.Long)e=So.Long.fromString(e);else return lt.fromNumber(parseInt(e,10));return e.low||e.high?new lt(e.low>>>0,e.high>>>0):Sn};lt.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var r=~this.lo+1>>>0,t=~this.hi>>>0;return r||(t=t+1>>>0),-(r+t*4294967296)}return this.lo+this.hi*4294967296};lt.prototype.toLong=function(e){return So.Long?new So.Long(this.lo|0,this.hi|0,!!e):{low:this.lo|0,high:this.hi|0,unsigned:!!e}};var ln=String.prototype.charCodeAt;lt.fromHash=function(e){return e===J$?Sn:new lt((ln.call(e,0)|ln.call(e,1)<<8|ln.call(e,2)<<16|ln.call(e,3)<<24)>>>0,(ln.call(e,4)|ln.call(e,5)<<8|ln.call(e,6)<<16|ln.call(e,7)<<24)>>>0)};lt.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)};lt.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this};lt.prototype.zzDecode=function(){var e=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this};lt.prototype.length=function(){var e=this.lo,r=(this.lo>>>28|this.hi<<4)>>>0,t=this.hi>>>24;return t===0?r===0?e<16384?e<128?1:2:e<2097152?3:4:r<16384?r<128?5:6:r<2097152?7:8:t<128?9:10}});var cn=oe(nl=>{"use strict";var ae=nl;ae.asPromise=fh();ae.base64=bh();ae.EventEmitter=_h();ae.float=$h();ae.inquire=Ah();ae.utf8=Ph();ae.pool=Ch();ae.LongBits=kh();ae.isNode=!!(typeof global<"u"&&global&&global.process&&global.process.versions&&global.process.versions.node);ae.global=ae.isNode&&global||typeof window<"u"&&window||typeof self<"u"&&self||nl;ae.emptyArray=Object.freeze?Object.freeze([]):[];ae.emptyObject=Object.freeze?Object.freeze({}):{};ae.isInteger=Number.isInteger||function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e};ae.isString=function(e){return typeof e=="string"||e instanceof String};ae.isObject=function(e){return e&&typeof e=="object"};ae.isset=ae.isSet=function(e,r){var t=e[r];return t!=null&&e.hasOwnProperty(r)?typeof t!="object"||(Array.isArray(t)?t.length:Object.keys(t).length)>0:!1};ae.Buffer=function(){try{var n=ae.inquire("buffer").Buffer;return n.prototype.utf8Write?n:null}catch{return null}}();ae._Buffer_from=null;ae._Buffer_allocUnsafe=null;ae.newBuffer=function(e){return typeof e=="number"?ae.Buffer?ae._Buffer_allocUnsafe(e):new ae.Array(e):ae.Buffer?ae._Buffer_from(e):typeof Uint8Array>"u"?e:new Uint8Array(e)};ae.Array=typeof Uint8Array<"u"?Uint8Array:Array;ae.Long=ae.global.dcodeIO&&ae.global.dcodeIO.Long||ae.global.Long||ae.inquire("long");ae.key2Re=/^true|false|0|1$/;ae.key32Re=/^-?(?:0|[1-9][0-9]*)$/;ae.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;ae.longToHash=function(e){return e?ae.LongBits.from(e).toHash():ae.LongBits.zeroHash};ae.longFromHash=function(e,r){var t=ae.LongBits.fromHash(e);return ae.Long?ae.Long.fromBits(t.lo,t.hi,r):t.toNumber(!!r)};function Nh(n,e,r){for(var t=Object.keys(e),o=0;o<t.length;++o)(n[t[o]]===void 0||!r)&&(n[t[o]]=e[t[o]]);return n}ae.merge=Nh;ae.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)};function Lh(n){function e(r,t){if(!(this instanceof e))return new e(r,t);Object.defineProperty(this,"message",{get:function(){return r}}),Error.captureStackTrace?Error.captureStackTrace(this,e):Object.defineProperty(this,"stack",{value:new Error().stack||""}),t&&Nh(this,t)}return e.prototype=Object.create(Error.prototype,{constructor:{value:e,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return n},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),e}ae.newError=Lh;ae.ProtocolError=Lh("ProtocolError");ae.oneOfGetter=function(e){for(var r={},t=0;t<e.length;++t)r[e[t]]=1;return function(){for(var o=Object.keys(this),i=o.length-1;i>-1;--i)if(r[o[i]]===1&&this[o[i]]!==void 0&&this[o[i]]!==null)return o[i]}};ae.oneOfSetter=function(e){return function(r){for(var t=0;t<e.length;++t)e[t]!==r&&delete this[e[t]]}};ae.toJSONOptions={longs:String,enums:String,bytes:String,json:!0};ae._configure=function(){var n=ae.Buffer;if(!n){ae._Buffer_from=ae._Buffer_allocUnsafe=null;return}ae._Buffer_from=n.from!==Uint8Array.from&&n.from||function(r,t){return new n(r,t)},ae._Buffer_allocUnsafe=n.allocUnsafe||function(r){return new n(r)}}});var cl=oe((C4,Bh)=>{"use strict";Bh.exports=De;var Rt=cn(),ol,Di=Rt.LongBits,Rh=Rt.base64,zh=Rt.utf8;function $o(n,e,r){this.fn=n,this.len=e,this.next=void 0,this.val=r}function al(){}function Y$(n){this.head=n.head,this.tail=n.tail,this.len=n.len,this.next=n.states}function De(){this.len=0,this.head=new $o(al,0,0),this.tail=this.head,this.states=null}var Mh=function(){return Rt.Buffer?function(){return(De.create=function(){return new ol})()}:function(){return new De}};De.create=Mh();De.alloc=function(e){return new Rt.Array(e)};Rt.Array!==Array&&(De.alloc=Rt.pool(De.alloc,Rt.Array.prototype.subarray));De.prototype._push=function(e,r,t){return this.tail=this.tail.next=new $o(e,r,t),this.len+=r,this};function sl(n,e,r){e[r]=n&255}function Q$(n,e,r){for(;n>127;)e[r++]=n&127|128,n>>>=7;e[r]=n}function ul(n,e){this.len=n,this.next=void 0,this.val=e}ul.prototype=Object.create($o.prototype);ul.prototype.fn=Q$;De.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new ul((e=e>>>0)<128?1:e<16384?2:e<2097152?3:e<268435456?4:5,e)).len,this};De.prototype.int32=function(e){return e<0?this._push(ll,10,Di.fromNumber(e)):this.uint32(e)};De.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)};function ll(n,e,r){for(;n.hi;)e[r++]=n.lo&127|128,n.lo=(n.lo>>>7|n.hi<<25)>>>0,n.hi>>>=7;for(;n.lo>127;)e[r++]=n.lo&127|128,n.lo=n.lo>>>7;e[r++]=n.lo}De.prototype.uint64=function(e){var r=Di.from(e);return this._push(ll,r.length(),r)};De.prototype.int64=De.prototype.uint64;De.prototype.sint64=function(e){var r=Di.from(e).zzEncode();return this._push(ll,r.length(),r)};De.prototype.bool=function(e){return this._push(sl,1,e?1:0)};function il(n,e,r){e[r]=n&255,e[r+1]=n>>>8&255,e[r+2]=n>>>16&255,e[r+3]=n>>>24}De.prototype.fixed32=function(e){return this._push(il,4,e>>>0)};De.prototype.sfixed32=De.prototype.fixed32;De.prototype.fixed64=function(e){var r=Di.from(e);return this._push(il,4,r.lo)._push(il,4,r.hi)};De.prototype.sfixed64=De.prototype.fixed64;De.prototype.float=function(e){return this._push(Rt.float.writeFloatLE,4,e)};De.prototype.double=function(e){return this._push(Rt.float.writeDoubleLE,8,e)};var eA=Rt.Array.prototype.set?function(e,r,t){r.set(e,t)}:function(e,r,t){for(var o=0;o<e.length;++o)r[t+o]=e[o]};De.prototype.bytes=function(e){var r=e.length>>>0;if(!r)return this._push(sl,1,0);if(Rt.isString(e)){var t=De.alloc(r=Rh.length(e));Rh.decode(e,t,0),e=t}return this.uint32(r)._push(eA,r,e)};De.prototype.string=function(e){var r=zh.length(e);return r?this.uint32(r)._push(zh.write,r,e):this._push(sl,1,0)};De.prototype.fork=function(){return this.states=new Y$(this),this.head=this.tail=new $o(al,0,0),this.len=0,this};De.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new $o(al,0,0),this.len=0),this};De.prototype.ldelim=function(){var e=this.head,r=this.tail,t=this.len;return this.reset().uint32(t),t&&(this.tail.next=e.next,this.tail=r,this.len+=t),this};De.prototype.finish=function(){for(var e=this.head.next,r=this.constructor.alloc(this.len),t=0;e;)e.fn(e.val,r,t),t+=e.len,e=e.next;return r};De._configure=function(n){ol=n,De.create=Mh(),ol._configure()}});var Gh=oe((D4,Vh)=>{"use strict";Vh.exports=Nr;var Fh=cl();(Nr.prototype=Object.create(Fh.prototype)).constructor=Nr;var dn=cn();function Nr(){Fh.call(this)}Nr._configure=function(){Nr.alloc=dn._Buffer_allocUnsafe,Nr.writeBytesBuffer=dn.Buffer&&dn.Buffer.prototype instanceof Uint8Array&&dn.Buffer.prototype.set.name==="set"?function(e,r,t){r.set(e,t)}:function(e,r,t){if(e.copy)e.copy(r,t,0,e.length);else for(var o=0;o<e.length;)r[t++]=e[o++]}};Nr.prototype.bytes=function(e){dn.isString(e)&&(e=dn._Buffer_from(e,"base64"));var r=e.length>>>0;return this.uint32(r),r&&this._push(Nr.writeBytesBuffer,r,e),this};function tA(n,e,r){n.length<40?dn.utf8.write(n,e,r):e.utf8Write?e.utf8Write(n,r):e.write(n,r)}Nr.prototype.string=function(e){var r=dn.Buffer.byteLength(e);return this.uint32(r),r&&this._push(tA,r,e),this};Nr._configure()});var fl=oe((k4,jh)=>{"use strict";jh.exports=et;var Ht=cn(),pl,Hh=Ht.LongBits,rA=Ht.utf8;function qt(n,e){return RangeError("index out of range: "+n.pos+" + "+(e||1)+" > "+n.len)}function et(n){this.buf=n,this.pos=0,this.len=n.length}var Uh=typeof Uint8Array<"u"?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new et(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new et(e);throw Error("illegal buffer")},qh=function(){return Ht.Buffer?function(r){return(et.create=function(o){return Ht.Buffer.isBuffer(o)?new pl(o):Uh(o)})(r)}:Uh};et.create=qh();et.prototype._slice=Ht.Array.prototype.subarray||Ht.Array.prototype.slice;et.prototype.uint32=function(){var e=4294967295;return function(){if(e=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(e=(e|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return e;if((this.pos+=5)>this.len)throw this.pos=this.len,qt(this,10);return e}}();et.prototype.int32=function(){return this.uint32()|0};et.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(e&1)|0};function dl(){var n=new Hh(0,0),e=0;if(this.len-this.pos>4){for(;e<4;++e)if(n.lo=(n.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return n;if(n.lo=(n.lo|(this.buf[this.pos]&127)<<28)>>>0,n.hi=(n.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return n;e=0}else{for(;e<3;++e){if(this.pos>=this.len)throw qt(this);if(n.lo=(n.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return n}return n.lo=(n.lo|(this.buf[this.pos++]&127)<<e*7)>>>0,n}if(this.len-this.pos>4){for(;e<5;++e)if(n.hi=(n.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return n}else for(;e<5;++e){if(this.pos>=this.len)throw qt(this);if(n.hi=(n.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return n}throw Error("invalid varint encoding")}et.prototype.bool=function(){return this.uint32()!==0};function ki(n,e){return(n[e-4]|n[e-3]<<8|n[e-2]<<16|n[e-1]<<24)>>>0}et.prototype.fixed32=function(){if(this.pos+4>this.len)throw qt(this,4);return ki(this.buf,this.pos+=4)};et.prototype.sfixed32=function(){if(this.pos+4>this.len)throw qt(this,4);return ki(this.buf,this.pos+=4)|0};function Wh(){if(this.pos+8>this.len)throw qt(this,8);return new Hh(ki(this.buf,this.pos+=4),ki(this.buf,this.pos+=4))}et.prototype.float=function(){if(this.pos+4>this.len)throw qt(this,4);var e=Ht.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e};et.prototype.double=function(){if(this.pos+8>this.len)throw qt(this,4);var e=Ht.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e};et.prototype.bytes=function(){var e=this.uint32(),r=this.pos,t=this.pos+e;if(t>this.len)throw qt(this,e);if(this.pos+=e,Array.isArray(this.buf))return this.buf.slice(r,t);if(r===t){var o=Ht.Buffer;return o?o.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,r,t)};et.prototype.string=function(){var e=this.bytes();return rA.read(e,0,e.length)};et.prototype.skip=function(e){if(typeof e=="number"){if(this.pos+e>this.len)throw qt(this,e);this.pos+=e}else do if(this.pos>=this.len)throw qt(this);while(this.buf[this.pos++]&128);return this};et.prototype.skipType=function(n){switch(n){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(n=this.uint32()&7)!==4;)this.skipType(n);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+n+" at offset "+this.pos)}return this};et._configure=function(n){pl=n,et.create=qh(),pl._configure();var e=Ht.Long?"toLong":"toNumber";Ht.merge(et.prototype,{int64:function(){return dl.call(this)[e](!1)},uint64:function(){return dl.call(this)[e](!0)},sint64:function(){return dl.call(this).zzDecode()[e](!1)},fixed64:function(){return Wh.call(this)[e](!0)},sfixed64:function(){return Wh.call(this)[e](!1)}})}});var Jh=oe((N4,Zh)=>{"use strict";Zh.exports=$n;var Xh=fl();($n.prototype=Object.create(Xh.prototype)).constructor=$n;var Kh=cn();function $n(n){Xh.call(this,n)}$n._configure=function(){Kh.Buffer&&($n.prototype._slice=Kh.Buffer.prototype.slice)};$n.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+e,this.len))};$n._configure()});var Qh=oe((L4,Yh)=>{"use strict";Yh.exports=Ao;var hl=cn();(Ao.prototype=Object.create(hl.EventEmitter.prototype)).constructor=Ao;function Ao(n,e,r){if(typeof n!="function")throw TypeError("rpcImpl must be a function");hl.EventEmitter.call(this),this.rpcImpl=n,this.requestDelimited=!!e,this.responseDelimited=!!r}Ao.prototype.rpcCall=function n(e,r,t,o,i){if(!o)throw TypeError("request must be specified");var a=this;if(!i)return hl.asPromise(n,a,e,r,t,o);if(!a.rpcImpl){setTimeout(function(){i(Error("already ended"))},0);return}try{return a.rpcImpl(e,r[a.requestDelimited?"encodeDelimited":"encode"](o).finish(),function(u,c){if(u)return a.emit("error",u,e),i(u);if(c===null){a.end(!0);return}if(!(c instanceof t))try{c=t[a.responseDelimited?"decodeDelimited":"decode"](c)}catch(d){return a.emit("error",d,e),i(d)}return a.emit("data",c,e),i(null,c)})}catch(s){a.emit("error",s,e),setTimeout(function(){i(s)},0);return}};Ao.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}});var tm=oe(em=>{"use strict";var nA=em;nA.Service=Qh()});var nm=oe((z4,rm)=>{"use strict";rm.exports={}});var am=oe(im=>{"use strict";var vt=im;vt.build="minimal";vt.Writer=cl();vt.BufferWriter=Gh();vt.Reader=fl();vt.BufferReader=Jh();vt.util=cn();vt.rpc=tm();vt.roots=nm();vt.configure=om;function om(){vt.util._configure(),vt.Writer._configure(vt.BufferWriter),vt.Reader._configure(vt.BufferReader)}om()});var um=oe((B4,sm)=>{"use strict";sm.exports=am()});var Xn=oe((F4,lm)=>{"use strict";var He=um(),K=He.Reader,tt=He.Writer,E=He.util,$=He.roots.default||(He.roots.default={});$.onnx=function(){var n={};return n.Version=function(){var e={},r=Object.create(e);return r[e[0]="_START_VERSION"]=0,r[e[1]="IR_VERSION_2017_10_10"]=1,r[e[2]="IR_VERSION_2017_10_30"]=2,r[e[3]="IR_VERSION_2017_11_3"]=3,r[e[4]="IR_VERSION_2019_1_22"]=4,r[e[5]="IR_VERSION_2019_3_18"]=5,r[e[6]="IR_VERSION_2019_9_19"]=6,r[e[7]="IR_VERSION_2020_5_8"]=7,r[e[8]="IR_VERSION_2021_7_30"]=8,r[e[9]="IR_VERSION"]=9,r}(),n.AttributeProto=function(){function e(r){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.refAttrName="",e.prototype.docString="",e.prototype.type=0,e.prototype.f=0,e.prototype.i=E.Long?E.Long.fromBits(0,0,!1):0,e.prototype.s=E.newBuffer([]),e.prototype.t=null,e.prototype.g=null,e.prototype.sparseTensor=null,e.prototype.tp=null,e.prototype.floats=E.emptyArray,e.prototype.ints=E.emptyArray,e.prototype.strings=E.emptyArray,e.prototype.tensors=E.emptyArray,e.prototype.graphs=E.emptyArray,e.prototype.sparseTensors=E.emptyArray,e.prototype.typeProtos=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=tt.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.f!=null&&Object.hasOwnProperty.call(t,"f")&&o.uint32(21).float(t.f),t.i!=null&&Object.hasOwnProperty.call(t,"i")&&o.uint32(24).int64(t.i),t.s!=null&&Object.hasOwnProperty.call(t,"s")&&o.uint32(34).bytes(t.s),t.t!=null&&Object.hasOwnProperty.call(t,"t")&&$.onnx.TensorProto.encode(t.t,o.uint32(42).fork()).ldelim(),t.g!=null&&Object.hasOwnProperty.call(t,"g")&&$.onnx.GraphProto.encode(t.g,o.uint32(50).fork()).ldelim(),t.floats!=null&&t.floats.length){o.uint32(58).fork();for(var i=0;i<t.floats.length;++i)o.float(t.floats[i]);o.ldelim()}if(t.ints!=null&&t.ints.length){o.uint32(66).fork();for(var i=0;i<t.ints.length;++i)o.int64(t.ints[i]);o.ldelim()}if(t.strings!=null&&t.strings.length)for(var i=0;i<t.strings.length;++i)o.uint32(74).bytes(t.strings[i]);if(t.tensors!=null&&t.tensors.length)for(var i=0;i<t.tensors.length;++i)$.onnx.TensorProto.encode(t.tensors[i],o.uint32(82).fork()).ldelim();if(t.graphs!=null&&t.graphs.length)for(var i=0;i<t.graphs.length;++i)$.onnx.GraphProto.encode(t.graphs[i],o.uint32(90).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(106).string(t.docString),t.tp!=null&&Object.hasOwnProperty.call(t,"tp")&&$.onnx.TypeProto.encode(t.tp,o.uint32(114).fork()).ldelim(),t.typeProtos!=null&&t.typeProtos.length)for(var i=0;i<t.typeProtos.length;++i)$.onnx.TypeProto.encode(t.typeProtos[i],o.uint32(122).fork()).ldelim();if(t.type!=null&&Object.hasOwnProperty.call(t,"type")&&o.uint32(160).int32(t.type),t.refAttrName!=null&&Object.hasOwnProperty.call(t,"refAttrName")&&o.uint32(170).string(t.refAttrName),t.sparseTensor!=null&&Object.hasOwnProperty.call(t,"sparseTensor")&&$.onnx.SparseTensorProto.encode(t.sparseTensor,o.uint32(178).fork()).ldelim(),t.sparseTensors!=null&&t.sparseTensors.length)for(var i=0;i<t.sparseTensors.length;++i)$.onnx.SparseTensorProto.encode(t.sparseTensors[i],o.uint32(186).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.AttributeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 21:{a.refAttrName=t.string();break}case 13:{a.docString=t.string();break}case 20:{a.type=t.int32();break}case 2:{a.f=t.float();break}case 3:{a.i=t.int64();break}case 4:{a.s=t.bytes();break}case 5:{a.t=$.onnx.TensorProto.decode(t,t.uint32());break}case 6:{a.g=$.onnx.GraphProto.decode(t,t.uint32());break}case 22:{a.sparseTensor=$.onnx.SparseTensorProto.decode(t,t.uint32());break}case 14:{a.tp=$.onnx.TypeProto.decode(t,t.uint32());break}case 7:{if(a.floats&&a.floats.length||(a.floats=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.floats.push(t.float());else a.floats.push(t.float());break}case 8:{if(a.ints&&a.ints.length||(a.ints=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.ints.push(t.int64());else a.ints.push(t.int64());break}case 9:{a.strings&&a.strings.length||(a.strings=[]),a.strings.push(t.bytes());break}case 10:{a.tensors&&a.tensors.length||(a.tensors=[]),a.tensors.push($.onnx.TensorProto.decode(t,t.uint32()));break}case 11:{a.graphs&&a.graphs.length||(a.graphs=[]),a.graphs.push($.onnx.GraphProto.decode(t,t.uint32()));break}case 23:{a.sparseTensors&&a.sparseTensors.length||(a.sparseTensors=[]),a.sparseTensors.push($.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 15:{a.typeProtos&&a.typeProtos.length||(a.typeProtos=[]),a.typeProtos.push($.onnx.TypeProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!E.isString(t.name))return"name: string expected";if(t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&!E.isString(t.refAttrName))return"refAttrName: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!E.isString(t.docString))return"docString: string expected";if(t.type!=null&&t.hasOwnProperty("type"))switch(t.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:break}if(t.f!=null&&t.hasOwnProperty("f")&&typeof t.f!="number")return"f: number expected";if(t.i!=null&&t.hasOwnProperty("i")&&!E.isInteger(t.i)&&!(t.i&&E.isInteger(t.i.low)&&E.isInteger(t.i.high)))return"i: integer|Long expected";if(t.s!=null&&t.hasOwnProperty("s")&&!(t.s&&typeof t.s.length=="number"||E.isString(t.s)))return"s: buffer expected";if(t.t!=null&&t.hasOwnProperty("t")){var o=$.onnx.TensorProto.verify(t.t);if(o)return"t."+o}if(t.g!=null&&t.hasOwnProperty("g")){var o=$.onnx.GraphProto.verify(t.g);if(o)return"g."+o}if(t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")){var o=$.onnx.SparseTensorProto.verify(t.sparseTensor);if(o)return"sparseTensor."+o}if(t.tp!=null&&t.hasOwnProperty("tp")){var o=$.onnx.TypeProto.verify(t.tp);if(o)return"tp."+o}if(t.floats!=null&&t.hasOwnProperty("floats")){if(!Array.isArray(t.floats))return"floats: array expected";for(var i=0;i<t.floats.length;++i)if(typeof t.floats[i]!="number")return"floats: number[] expected"}if(t.ints!=null&&t.hasOwnProperty("ints")){if(!Array.isArray(t.ints))return"ints: array expected";for(var i=0;i<t.ints.length;++i)if(!E.isInteger(t.ints[i])&&!(t.ints[i]&&E.isInteger(t.ints[i].low)&&E.isInteger(t.ints[i].high)))return"ints: integer|Long[] expected"}if(t.strings!=null&&t.hasOwnProperty("strings")){if(!Array.isArray(t.strings))return"strings: array expected";for(var i=0;i<t.strings.length;++i)if(!(t.strings[i]&&typeof t.strings[i].length=="number"||E.isString(t.strings[i])))return"strings: buffer[] expected"}if(t.tensors!=null&&t.hasOwnProperty("tensors")){if(!Array.isArray(t.tensors))return"tensors: array expected";for(var i=0;i<t.tensors.length;++i){var o=$.onnx.TensorProto.verify(t.tensors[i]);if(o)return"tensors."+o}}if(t.graphs!=null&&t.hasOwnProperty("graphs")){if(!Array.isArray(t.graphs))return"graphs: array expected";for(var i=0;i<t.graphs.length;++i){var o=$.onnx.GraphProto.verify(t.graphs[i]);if(o)return"graphs."+o}}if(t.sparseTensors!=null&&t.hasOwnProperty("sparseTensors")){if(!Array.isArray(t.sparseTensors))return"sparseTensors: array expected";for(var i=0;i<t.sparseTensors.length;++i){var o=$.onnx.SparseTensorProto.verify(t.sparseTensors[i]);if(o)return"sparseTensors."+o}}if(t.typeProtos!=null&&t.hasOwnProperty("typeProtos")){if(!Array.isArray(t.typeProtos))return"typeProtos: array expected";for(var i=0;i<t.typeProtos.length;++i){var o=$.onnx.TypeProto.verify(t.typeProtos[i]);if(o)return"typeProtos."+o}}return null},e.fromObject=function(t){if(t instanceof $.onnx.AttributeProto)return t;var o=new $.onnx.AttributeProto;switch(t.name!=null&&(o.name=String(t.name)),t.refAttrName!=null&&(o.refAttrName=String(t.refAttrName)),t.docString!=null&&(o.docString=String(t.docString)),t.type){default:if(typeof t.type=="number"){o.type=t.type;break}break;case"UNDEFINED":case 0:o.type=0;break;case"FLOAT":case 1:o.type=1;break;case"INT":case 2:o.type=2;break;case"STRING":case 3:o.type=3;break;case"TENSOR":case 4:o.type=4;break;case"GRAPH":case 5:o.type=5;break;case"SPARSE_TENSOR":case 11:o.type=11;break;case"TYPE_PROTO":case 13:o.type=13;break;case"FLOATS":case 6:o.type=6;break;case"INTS":case 7:o.type=7;break;case"STRINGS":case 8:o.type=8;break;case"TENSORS":case 9:o.type=9;break;case"GRAPHS":case 10:o.type=10;break;case"SPARSE_TENSORS":case 12:o.type=12;break;case"TYPE_PROTOS":case 14:o.type=14;break}if(t.f!=null&&(o.f=Number(t.f)),t.i!=null&&(E.Long?(o.i=E.Long.fromValue(t.i)).unsigned=!1:typeof t.i=="string"?o.i=parseInt(t.i,10):typeof t.i=="number"?o.i=t.i:typeof t.i=="object"&&(o.i=new E.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber())),t.s!=null&&(typeof t.s=="string"?E.base64.decode(t.s,o.s=E.newBuffer(E.base64.length(t.s)),0):t.s.length>=0&&(o.s=t.s)),t.t!=null){if(typeof t.t!="object")throw TypeError(".onnx.AttributeProto.t: object expected");o.t=$.onnx.TensorProto.fromObject(t.t)}if(t.g!=null){if(typeof t.g!="object")throw TypeError(".onnx.AttributeProto.g: object expected");o.g=$.onnx.GraphProto.fromObject(t.g)}if(t.sparseTensor!=null){if(typeof t.sparseTensor!="object")throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");o.sparseTensor=$.onnx.SparseTensorProto.fromObject(t.sparseTensor)}if(t.tp!=null){if(typeof t.tp!="object")throw TypeError(".onnx.AttributeProto.tp: object expected");o.tp=$.onnx.TypeProto.fromObject(t.tp)}if(t.floats){if(!Array.isArray(t.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");o.floats=[];for(var i=0;i<t.floats.length;++i)o.floats[i]=Number(t.floats[i])}if(t.ints){if(!Array.isArray(t.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");o.ints=[];for(var i=0;i<t.ints.length;++i)E.Long?(o.ints[i]=E.Long.fromValue(t.ints[i])).unsigned=!1:typeof t.ints[i]=="string"?o.ints[i]=parseInt(t.ints[i],10):typeof t.ints[i]=="number"?o.ints[i]=t.ints[i]:typeof t.ints[i]=="object"&&(o.ints[i]=new E.LongBits(t.ints[i].low>>>0,t.ints[i].high>>>0).toNumber())}if(t.strings){if(!Array.isArray(t.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");o.strings=[];for(var i=0;i<t.strings.length;++i)typeof t.strings[i]=="string"?E.base64.decode(t.strings[i],o.strings[i]=E.newBuffer(E.base64.length(t.strings[i])),0):t.strings[i].length>=0&&(o.strings[i]=t.strings[i])}if(t.tensors){if(!Array.isArray(t.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");o.tensors=[];for(var i=0;i<t.tensors.length;++i){if(typeof t.tensors[i]!="object")throw TypeError(".onnx.AttributeProto.tensors: object expected");o.tensors[i]=$.onnx.TensorProto.fromObject(t.tensors[i])}}if(t.graphs){if(!Array.isArray(t.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");o.graphs=[];for(var i=0;i<t.graphs.length;++i){if(typeof t.graphs[i]!="object")throw TypeError(".onnx.AttributeProto.graphs: object expected");o.graphs[i]=$.onnx.GraphProto.fromObject(t.graphs[i])}}if(t.sparseTensors){if(!Array.isArray(t.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");o.sparseTensors=[];for(var i=0;i<t.sparseTensors.length;++i){if(typeof t.sparseTensors[i]!="object")throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");o.sparseTensors[i]=$.onnx.SparseTensorProto.fromObject(t.sparseTensors[i])}}if(t.typeProtos){if(!Array.isArray(t.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");o.typeProtos=[];for(var i=0;i<t.typeProtos.length;++i){if(typeof t.typeProtos[i]!="object")throw TypeError(".onnx.AttributeProto.typeProtos: object expected");o.typeProtos[i]=$.onnx.TypeProto.fromObject(t.typeProtos[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.floats=[],i.ints=[],i.strings=[],i.tensors=[],i.graphs=[],i.typeProtos=[],i.sparseTensors=[]),o.defaults){if(i.name="",i.f=0,E.Long){var a=new E.Long(0,0,!1);i.i=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.i=o.longs===String?"0":0;o.bytes===String?i.s="":(i.s=[],o.bytes!==Array&&(i.s=E.newBuffer(i.s))),i.t=null,i.g=null,i.docString="",i.tp=null,i.type=o.enums===String?"UNDEFINED":0,i.refAttrName="",i.sparseTensor=null}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.f!=null&&t.hasOwnProperty("f")&&(i.f=o.json&&!isFinite(t.f)?String(t.f):t.f),t.i!=null&&t.hasOwnProperty("i")&&(typeof t.i=="number"?i.i=o.longs===String?String(t.i):t.i:i.i=o.longs===String?E.Long.prototype.toString.call(t.i):o.longs===Number?new E.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber():t.i),t.s!=null&&t.hasOwnProperty("s")&&(i.s=o.bytes===String?E.base64.encode(t.s,0,t.s.length):o.bytes===Array?Array.prototype.slice.call(t.s):t.s),t.t!=null&&t.hasOwnProperty("t")&&(i.t=$.onnx.TensorProto.toObject(t.t,o)),t.g!=null&&t.hasOwnProperty("g")&&(i.g=$.onnx.GraphProto.toObject(t.g,o)),t.floats&&t.floats.length){i.floats=[];for(var s=0;s<t.floats.length;++s)i.floats[s]=o.json&&!isFinite(t.floats[s])?String(t.floats[s]):t.floats[s]}if(t.ints&&t.ints.length){i.ints=[];for(var s=0;s<t.ints.length;++s)typeof t.ints[s]=="number"?i.ints[s]=o.longs===String?String(t.ints[s]):t.ints[s]:i.ints[s]=o.longs===String?E.Long.prototype.toString.call(t.ints[s]):o.longs===Number?new E.LongBits(t.ints[s].low>>>0,t.ints[s].high>>>0).toNumber():t.ints[s]}if(t.strings&&t.strings.length){i.strings=[];for(var s=0;s<t.strings.length;++s)i.strings[s]=o.bytes===String?E.base64.encode(t.strings[s],0,t.strings[s].length):o.bytes===Array?Array.prototype.slice.call(t.strings[s]):t.strings[s]}if(t.tensors&&t.tensors.length){i.tensors=[];for(var s=0;s<t.tensors.length;++s)i.tensors[s]=$.onnx.TensorProto.toObject(t.tensors[s],o)}if(t.graphs&&t.graphs.length){i.graphs=[];for(var s=0;s<t.graphs.length;++s)i.graphs[s]=$.onnx.GraphProto.toObject(t.graphs[s],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.tp!=null&&t.hasOwnProperty("tp")&&(i.tp=$.onnx.TypeProto.toObject(t.tp,o)),t.typeProtos&&t.typeProtos.length){i.typeProtos=[];for(var s=0;s<t.typeProtos.length;++s)i.typeProtos[s]=$.onnx.TypeProto.toObject(t.typeProtos[s],o)}if(t.type!=null&&t.hasOwnProperty("type")&&(i.type=o.enums===String?$.onnx.AttributeProto.AttributeType[t.type]===void 0?t.type:$.onnx.AttributeProto.AttributeType[t.type]:t.type),t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&(i.refAttrName=t.refAttrName),t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")&&(i.sparseTensor=$.onnx.SparseTensorProto.toObject(t.sparseTensor,o)),t.sparseTensors&&t.sparseTensors.length){i.sparseTensors=[];for(var s=0;s<t.sparseTensors.length;++s)i.sparseTensors[s]=$.onnx.SparseTensorProto.toObject(t.sparseTensors[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.AttributeProto"},e.AttributeType=function(){var r={},t=Object.create(r);return t[r[0]="UNDEFINED"]=0,t[r[1]="FLOAT"]=1,t[r[2]="INT"]=2,t[r[3]="STRING"]=3,t[r[4]="TENSOR"]=4,t[r[5]="GRAPH"]=5,t[r[11]="SPARSE_TENSOR"]=11,t[r[13]="TYPE_PROTO"]=13,t[r[6]="FLOATS"]=6,t[r[7]="INTS"]=7,t[r[8]="STRINGS"]=8,t[r[9]="TENSORS"]=9,t[r[10]="GRAPHS"]=10,t[r[12]="SPARSE_TENSORS"]=12,t[r[14]="TYPE_PROTOS"]=14,t}(),e}(),n.ValueInfoProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.type=null,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=tt.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.type!=null&&Object.hasOwnProperty.call(t,"type")&&$.onnx.TypeProto.encode(t.type,o.uint32(18).fork()).ldelim(),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(26).string(t.docString),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.ValueInfoProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 2:{a.type=$.onnx.TypeProto.decode(t,t.uint32());break}case 3:{a.docString=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!E.isString(t.name))return"name: string expected";if(t.type!=null&&t.hasOwnProperty("type")){var o=$.onnx.TypeProto.verify(t.type);if(o)return"type."+o}return t.docString!=null&&t.hasOwnProperty("docString")&&!E.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof $.onnx.ValueInfoProto)return t;var o=new $.onnx.ValueInfoProto;if(t.name!=null&&(o.name=String(t.name)),t.type!=null){if(typeof t.type!="object")throw TypeError(".onnx.ValueInfoProto.type: object expected");o.type=$.onnx.TypeProto.fromObject(t.type)}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.name="",i.type=null,i.docString=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.type!=null&&t.hasOwnProperty("type")&&(i.type=$.onnx.TypeProto.toObject(t.type,o)),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ValueInfoProto"},e}(),n.NodeProto=function(){function e(r){if(this.input=[],this.output=[],this.attribute=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.input=E.emptyArray,e.prototype.output=E.emptyArray,e.prototype.name="",e.prototype.opType="",e.prototype.domain="",e.prototype.attribute=E.emptyArray,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=tt.create()),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(10).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(18).string(t.output[i]);if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(26).string(t.name),t.opType!=null&&Object.hasOwnProperty.call(t,"opType")&&o.uint32(34).string(t.opType),t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)$.onnx.AttributeProto.encode(t.attribute[i],o.uint32(42).fork()).ldelim();return t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(58).string(t.domain),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.NodeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.input&&a.input.length||(a.input=[]),a.input.push(t.string());break}case 2:{a.output&&a.output.length||(a.output=[]),a.output.push(t.string());break}case 3:{a.name=t.string();break}case 4:{a.opType=t.string();break}case 7:{a.domain=t.string();break}case 5:{a.attribute&&a.attribute.length||(a.attribute=[]),a.attribute.push($.onnx.AttributeProto.decode(t,t.uint32()));break}case 6:{a.docString=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!E.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!E.isString(t.output[o]))return"output: string[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!E.isString(t.name))return"name: string expected";if(t.opType!=null&&t.hasOwnProperty("opType")&&!E.isString(t.opType))return"opType: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!E.isString(t.domain))return"domain: string expected";if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o){var i=$.onnx.AttributeProto.verify(t.attribute[o]);if(i)return"attribute."+i}}return t.docString!=null&&t.hasOwnProperty("docString")&&!E.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof $.onnx.NodeProto)return t;var o=new $.onnx.NodeProto;if(t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.NodeProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.NodeProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.name!=null&&(o.name=String(t.name)),t.opType!=null&&(o.opType=String(t.opType)),t.domain!=null&&(o.domain=String(t.domain)),t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i){if(typeof t.attribute[i]!="object")throw TypeError(".onnx.NodeProto.attribute: object expected");o.attribute[i]=$.onnx.AttributeProto.fromObject(t.attribute[i])}}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[]),o.defaults&&(i.name="",i.opType="",i.docString="",i.domain=""),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=t.input[a]}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=t.output[a]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.opType!=null&&t.hasOwnProperty("opType")&&(i.opType=t.opType),t.attribute&&t.attribute.length){i.attribute=[];for(var a=0;a<t.attribute.length;++a)i.attribute[a]=$.onnx.AttributeProto.toObject(t.attribute[a],o)}return t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.NodeProto"},e}(),n.TrainingInfoProto=function(){function e(r){if(this.initializationBinding=[],this.updateBinding=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.initialization=null,e.prototype.algorithm=null,e.prototype.initializationBinding=E.emptyArray,e.prototype.updateBinding=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=tt.create()),t.initialization!=null&&Object.hasOwnProperty.call(t,"initialization")&&$.onnx.GraphProto.encode(t.initialization,o.uint32(10).fork()).ldelim(),t.algorithm!=null&&Object.hasOwnProperty.call(t,"algorithm")&&$.onnx.GraphProto.encode(t.algorithm,o.uint32(18).fork()).ldelim(),t.initializationBinding!=null&&t.initializationBinding.length)for(var i=0;i<t.initializationBinding.length;++i)$.onnx.StringStringEntryProto.encode(t.initializationBinding[i],o.uint32(26).fork()).ldelim();if(t.updateBinding!=null&&t.updateBinding.length)for(var i=0;i<t.updateBinding.length;++i)$.onnx.StringStringEntryProto.encode(t.updateBinding[i],o.uint32(34).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.TrainingInfoProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.initialization=$.onnx.GraphProto.decode(t,t.uint32());break}case 2:{a.algorithm=$.onnx.GraphProto.decode(t,t.uint32());break}case 3:{a.initializationBinding&&a.initializationBinding.length||(a.initializationBinding=[]),a.initializationBinding.push($.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 4:{a.updateBinding&&a.updateBinding.length||(a.updateBinding=[]),a.updateBinding.push($.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.initialization!=null&&t.hasOwnProperty("initialization")){var o=$.onnx.GraphProto.verify(t.initialization);if(o)return"initialization."+o}if(t.algorithm!=null&&t.hasOwnProperty("algorithm")){var o=$.onnx.GraphProto.verify(t.algorithm);if(o)return"algorithm."+o}if(t.initializationBinding!=null&&t.hasOwnProperty("initializationBinding")){if(!Array.isArray(t.initializationBinding))return"initializationBinding: array expected";for(var i=0;i<t.initializationBinding.length;++i){var o=$.onnx.StringStringEntryProto.verify(t.initializationBinding[i]);if(o)return"initializationBinding."+o}}if(t.updateBinding!=null&&t.hasOwnProperty("updateBinding")){if(!Array.isArray(t.updateBinding))return"updateBinding: array expected";for(var i=0;i<t.updateBinding.length;++i){var o=$.onnx.StringStringEntryProto.verify(t.updateBinding[i]);if(o)return"updateBinding."+o}}return null},e.fromObject=function(t){if(t instanceof $.onnx.TrainingInfoProto)return t;var o=new $.onnx.TrainingInfoProto;if(t.initialization!=null){if(typeof t.initialization!="object")throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");o.initialization=$.onnx.GraphProto.fromObject(t.initialization)}if(t.algorithm!=null){if(typeof t.algorithm!="object")throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");o.algorithm=$.onnx.GraphProto.fromObject(t.algorithm)}if(t.initializationBinding){if(!Array.isArray(t.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");o.initializationBinding=[];for(var i=0;i<t.initializationBinding.length;++i){if(typeof t.initializationBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");o.initializationBinding[i]=$.onnx.StringStringEntryProto.fromObject(t.initializationBinding[i])}}if(t.updateBinding){if(!Array.isArray(t.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");o.updateBinding=[];for(var i=0;i<t.updateBinding.length;++i){if(typeof t.updateBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");o.updateBinding[i]=$.onnx.StringStringEntryProto.fromObject(t.updateBinding[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.initializationBinding=[],i.updateBinding=[]),o.defaults&&(i.initialization=null,i.algorithm=null),t.initialization!=null&&t.hasOwnProperty("initialization")&&(i.initialization=$.onnx.GraphProto.toObject(t.initialization,o)),t.algorithm!=null&&t.hasOwnProperty("algorithm")&&(i.algorithm=$.onnx.GraphProto.toObject(t.algorithm,o)),t.initializationBinding&&t.initializationBinding.length){i.initializationBinding=[];for(var a=0;a<t.initializationBinding.length;++a)i.initializationBinding[a]=$.onnx.StringStringEntryProto.toObject(t.initializationBinding[a],o)}if(t.updateBinding&&t.updateBinding.length){i.updateBinding=[];for(var a=0;a<t.updateBinding.length;++a)i.updateBinding[a]=$.onnx.StringStringEntryProto.toObject(t.updateBinding[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TrainingInfoProto"},e}(),n.ModelProto=function(){function e(r){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.irVersion=E.Long?E.Long.fromBits(0,0,!1):0,e.prototype.opsetImport=E.emptyArray,e.prototype.producerName="",e.prototype.producerVersion="",e.prototype.domain="",e.prototype.modelVersion=E.Long?E.Long.fromBits(0,0,!1):0,e.prototype.docString="",e.prototype.graph=null,e.prototype.metadataProps=E.emptyArray,e.prototype.trainingInfo=E.emptyArray,e.prototype.functions=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=tt.create()),t.irVersion!=null&&Object.hasOwnProperty.call(t,"irVersion")&&o.uint32(8).int64(t.irVersion),t.producerName!=null&&Object.hasOwnProperty.call(t,"producerName")&&o.uint32(18).string(t.producerName),t.producerVersion!=null&&Object.hasOwnProperty.call(t,"producerVersion")&&o.uint32(26).string(t.producerVersion),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(34).string(t.domain),t.modelVersion!=null&&Object.hasOwnProperty.call(t,"modelVersion")&&o.uint32(40).int64(t.modelVersion),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.graph!=null&&Object.hasOwnProperty.call(t,"graph")&&$.onnx.GraphProto.encode(t.graph,o.uint32(58).fork()).ldelim(),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)$.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(66).fork()).ldelim();if(t.metadataProps!=null&&t.metadataProps.length)for(var i=0;i<t.metadataProps.length;++i)$.onnx.StringStringEntryProto.encode(t.metadataProps[i],o.uint32(114).fork()).ldelim();if(t.trainingInfo!=null&&t.trainingInfo.length)for(var i=0;i<t.trainingInfo.length;++i)$.onnx.TrainingInfoProto.encode(t.trainingInfo[i],o.uint32(162).fork()).ldelim();if(t.functions!=null&&t.functions.length)for(var i=0;i<t.functions.length;++i)$.onnx.FunctionProto.encode(t.functions[i],o.uint32(202).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.ModelProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.irVersion=t.int64();break}case 8:{a.opsetImport&&a.opsetImport.length||(a.opsetImport=[]),a.opsetImport.push($.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 2:{a.producerName=t.string();break}case 3:{a.producerVersion=t.string();break}case 4:{a.domain=t.string();break}case 5:{a.modelVersion=t.int64();break}case 6:{a.docString=t.string();break}case 7:{a.graph=$.onnx.GraphProto.decode(t,t.uint32());break}case 14:{a.metadataProps&&a.metadataProps.length||(a.metadataProps=[]),a.metadataProps.push($.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 20:{a.trainingInfo&&a.trainingInfo.length||(a.trainingInfo=[]),a.trainingInfo.push($.onnx.TrainingInfoProto.decode(t,t.uint32()));break}case 25:{a.functions&&a.functions.length||(a.functions=[]),a.functions.push($.onnx.FunctionProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&!E.isInteger(t.irVersion)&&!(t.irVersion&&E.isInteger(t.irVersion.low)&&E.isInteger(t.irVersion.high)))return"irVersion: integer|Long expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=$.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}if(t.producerName!=null&&t.hasOwnProperty("producerName")&&!E.isString(t.producerName))return"producerName: string expected";if(t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&!E.isString(t.producerVersion))return"producerVersion: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!E.isString(t.domain))return"domain: string expected";if(t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&!E.isInteger(t.modelVersion)&&!(t.modelVersion&&E.isInteger(t.modelVersion.low)&&E.isInteger(t.modelVersion.high)))return"modelVersion: integer|Long expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!E.isString(t.docString))return"docString: string expected";if(t.graph!=null&&t.hasOwnProperty("graph")){var i=$.onnx.GraphProto.verify(t.graph);if(i)return"graph."+i}if(t.metadataProps!=null&&t.hasOwnProperty("metadataProps")){if(!Array.isArray(t.metadataProps))return"metadataProps: array expected";for(var o=0;o<t.metadataProps.length;++o){var i=$.onnx.StringStringEntryProto.verify(t.metadataProps[o]);if(i)return"metadataProps."+i}}if(t.trainingInfo!=null&&t.hasOwnProperty("trainingInfo")){if(!Array.isArray(t.trainingInfo))return"trainingInfo: array expected";for(var o=0;o<t.trainingInfo.length;++o){var i=$.onnx.TrainingInfoProto.verify(t.trainingInfo[o]);if(i)return"trainingInfo."+i}}if(t.functions!=null&&t.hasOwnProperty("functions")){if(!Array.isArray(t.functions))return"functions: array expected";for(var o=0;o<t.functions.length;++o){var i=$.onnx.FunctionProto.verify(t.functions[o]);if(i)return"functions."+i}}return null},e.fromObject=function(t){if(t instanceof $.onnx.ModelProto)return t;var o=new $.onnx.ModelProto;if(t.irVersion!=null&&(E.Long?(o.irVersion=E.Long.fromValue(t.irVersion)).unsigned=!1:typeof t.irVersion=="string"?o.irVersion=parseInt(t.irVersion,10):typeof t.irVersion=="number"?o.irVersion=t.irVersion:typeof t.irVersion=="object"&&(o.irVersion=new E.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber())),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.ModelProto.opsetImport: object expected");o.opsetImport[i]=$.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}if(t.producerName!=null&&(o.producerName=String(t.producerName)),t.producerVersion!=null&&(o.producerVersion=String(t.producerVersion)),t.domain!=null&&(o.domain=String(t.domain)),t.modelVersion!=null&&(E.Long?(o.modelVersion=E.Long.fromValue(t.modelVersion)).unsigned=!1:typeof t.modelVersion=="string"?o.modelVersion=parseInt(t.modelVersion,10):typeof t.modelVersion=="number"?o.modelVersion=t.modelVersion:typeof t.modelVersion=="object"&&(o.modelVersion=new E.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber())),t.docString!=null&&(o.docString=String(t.docString)),t.graph!=null){if(typeof t.graph!="object")throw TypeError(".onnx.ModelProto.graph: object expected");o.graph=$.onnx.GraphProto.fromObject(t.graph)}if(t.metadataProps){if(!Array.isArray(t.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");o.metadataProps=[];for(var i=0;i<t.metadataProps.length;++i){if(typeof t.metadataProps[i]!="object")throw TypeError(".onnx.ModelProto.metadataProps: object expected");o.metadataProps[i]=$.onnx.StringStringEntryProto.fromObject(t.metadataProps[i])}}if(t.trainingInfo){if(!Array.isArray(t.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");o.trainingInfo=[];for(var i=0;i<t.trainingInfo.length;++i){if(typeof t.trainingInfo[i]!="object")throw TypeError(".onnx.ModelProto.trainingInfo: object expected");o.trainingInfo[i]=$.onnx.TrainingInfoProto.fromObject(t.trainingInfo[i])}}if(t.functions){if(!Array.isArray(t.functions))throw TypeError(".onnx.ModelProto.functions: array expected");o.functions=[];for(var i=0;i<t.functions.length;++i){if(typeof t.functions[i]!="object")throw TypeError(".onnx.ModelProto.functions: object expected");o.functions[i]=$.onnx.FunctionProto.fromObject(t.functions[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.opsetImport=[],i.metadataProps=[],i.trainingInfo=[],i.functions=[]),o.defaults){if(E.Long){var a=new E.Long(0,0,!1);i.irVersion=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.irVersion=o.longs===String?"0":0;if(i.producerName="",i.producerVersion="",i.domain="",E.Long){var a=new E.Long(0,0,!1);i.modelVersion=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.modelVersion=o.longs===String?"0":0;i.docString="",i.graph=null}if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&(typeof t.irVersion=="number"?i.irVersion=o.longs===String?String(t.irVersion):t.irVersion:i.irVersion=o.longs===String?E.Long.prototype.toString.call(t.irVersion):o.longs===Number?new E.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber():t.irVersion),t.producerName!=null&&t.hasOwnProperty("producerName")&&(i.producerName=t.producerName),t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&(i.producerVersion=t.producerVersion),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&(typeof t.modelVersion=="number"?i.modelVersion=o.longs===String?String(t.modelVersion):t.modelVersion:i.modelVersion=o.longs===String?E.Long.prototype.toString.call(t.modelVersion):o.longs===Number?new E.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber():t.modelVersion),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.graph!=null&&t.hasOwnProperty("graph")&&(i.graph=$.onnx.GraphProto.toObject(t.graph,o)),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var s=0;s<t.opsetImport.length;++s)i.opsetImport[s]=$.onnx.OperatorSetIdProto.toObject(t.opsetImport[s],o)}if(t.metadataProps&&t.metadataProps.length){i.metadataProps=[];for(var s=0;s<t.metadataProps.length;++s)i.metadataProps[s]=$.onnx.StringStringEntryProto.toObject(t.metadataProps[s],o)}if(t.trainingInfo&&t.trainingInfo.length){i.trainingInfo=[];for(var s=0;s<t.trainingInfo.length;++s)i.trainingInfo[s]=$.onnx.TrainingInfoProto.toObject(t.trainingInfo[s],o)}if(t.functions&&t.functions.length){i.functions=[];for(var s=0;s<t.functions.length;++s)i.functions[s]=$.onnx.FunctionProto.toObject(t.functions[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ModelProto"},e}(),n.StringStringEntryProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.key="",e.prototype.value="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=tt.create()),t.key!=null&&Object.hasOwnProperty.call(t,"key")&&o.uint32(10).string(t.key),t.value!=null&&Object.hasOwnProperty.call(t,"value")&&o.uint32(18).string(t.value),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.StringStringEntryProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.key=t.string();break}case 2:{a.value=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.key!=null&&t.hasOwnProperty("key")&&!E.isString(t.key)?"key: string expected":t.value!=null&&t.hasOwnProperty("value")&&!E.isString(t.value)?"value: string expected":null},e.fromObject=function(t){if(t instanceof $.onnx.StringStringEntryProto)return t;var o=new $.onnx.StringStringEntryProto;return t.key!=null&&(o.key=String(t.key)),t.value!=null&&(o.value=String(t.value)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.key="",i.value=""),t.key!=null&&t.hasOwnProperty("key")&&(i.key=t.key),t.value!=null&&t.hasOwnProperty("value")&&(i.value=t.value),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.StringStringEntryProto"},e}(),n.TensorAnnotation=function(){function e(r){if(this.quantParameterTensorNames=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.tensorName="",e.prototype.quantParameterTensorNames=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=tt.create()),t.tensorName!=null&&Object.hasOwnProperty.call(t,"tensorName")&&o.uint32(10).string(t.tensorName),t.quantParameterTensorNames!=null&&t.quantParameterTensorNames.length)for(var i=0;i<t.quantParameterTensorNames.length;++i)$.onnx.StringStringEntryProto.encode(t.quantParameterTensorNames[i],o.uint32(18).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.TensorAnnotation;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.tensorName=t.string();break}case 2:{a.quantParameterTensorNames&&a.quantParameterTensorNames.length||(a.quantParameterTensorNames=[]),a.quantParameterTensorNames.push($.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.tensorName!=null&&t.hasOwnProperty("tensorName")&&!E.isString(t.tensorName))return"tensorName: string expected";if(t.quantParameterTensorNames!=null&&t.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(t.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var o=0;o<t.quantParameterTensorNames.length;++o){var i=$.onnx.StringStringEntryProto.verify(t.quantParameterTensorNames[o]);if(i)return"quantParameterTensorNames."+i}}return null},e.fromObject=function(t){if(t instanceof $.onnx.TensorAnnotation)return t;var o=new $.onnx.TensorAnnotation;if(t.tensorName!=null&&(o.tensorName=String(t.tensorName)),t.quantParameterTensorNames){if(!Array.isArray(t.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");o.quantParameterTensorNames=[];for(var i=0;i<t.quantParameterTensorNames.length;++i){if(typeof t.quantParameterTensorNames[i]!="object")throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");o.quantParameterTensorNames[i]=$.onnx.StringStringEntryProto.fromObject(t.quantParameterTensorNames[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.quantParameterTensorNames=[]),o.defaults&&(i.tensorName=""),t.tensorName!=null&&t.hasOwnProperty("tensorName")&&(i.tensorName=t.tensorName),t.quantParameterTensorNames&&t.quantParameterTensorNames.length){i.quantParameterTensorNames=[];for(var a=0;a<t.quantParameterTensorNames.length;++a)i.quantParameterTensorNames[a]=$.onnx.StringStringEntryProto.toObject(t.quantParameterTensorNames[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorAnnotation"},e}(),n.GraphProto=function(){function e(r){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.node=E.emptyArray,e.prototype.name="",e.prototype.initializer=E.emptyArray,e.prototype.sparseInitializer=E.emptyArray,e.prototype.docString="",e.prototype.input=E.emptyArray,e.prototype.output=E.emptyArray,e.prototype.valueInfo=E.emptyArray,e.prototype.quantizationAnnotation=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=tt.create()),t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)$.onnx.NodeProto.encode(t.node[i],o.uint32(10).fork()).ldelim();if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(18).string(t.name),t.initializer!=null&&t.initializer.length)for(var i=0;i<t.initializer.length;++i)$.onnx.TensorProto.encode(t.initializer[i],o.uint32(42).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(82).string(t.docString),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)$.onnx.ValueInfoProto.encode(t.input[i],o.uint32(90).fork()).ldelim();if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)$.onnx.ValueInfoProto.encode(t.output[i],o.uint32(98).fork()).ldelim();if(t.valueInfo!=null&&t.valueInfo.length)for(var i=0;i<t.valueInfo.length;++i)$.onnx.ValueInfoProto.encode(t.valueInfo[i],o.uint32(106).fork()).ldelim();if(t.quantizationAnnotation!=null&&t.quantizationAnnotation.length)for(var i=0;i<t.quantizationAnnotation.length;++i)$.onnx.TensorAnnotation.encode(t.quantizationAnnotation[i],o.uint32(114).fork()).ldelim();if(t.sparseInitializer!=null&&t.sparseInitializer.length)for(var i=0;i<t.sparseInitializer.length;++i)$.onnx.SparseTensorProto.encode(t.sparseInitializer[i],o.uint32(122).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.GraphProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.node&&a.node.length||(a.node=[]),a.node.push($.onnx.NodeProto.decode(t,t.uint32()));break}case 2:{a.name=t.string();break}case 5:{a.initializer&&a.initializer.length||(a.initializer=[]),a.initializer.push($.onnx.TensorProto.decode(t,t.uint32()));break}case 15:{a.sparseInitializer&&a.sparseInitializer.length||(a.sparseInitializer=[]),a.sparseInitializer.push($.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 10:{a.docString=t.string();break}case 11:{a.input&&a.input.length||(a.input=[]),a.input.push($.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 12:{a.output&&a.output.length||(a.output=[]),a.output.push($.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 13:{a.valueInfo&&a.valueInfo.length||(a.valueInfo=[]),a.valueInfo.push($.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 14:{a.quantizationAnnotation&&a.quantizationAnnotation.length||(a.quantizationAnnotation=[]),a.quantizationAnnotation.push($.onnx.TensorAnnotation.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=$.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.name!=null&&t.hasOwnProperty("name")&&!E.isString(t.name))return"name: string expected";if(t.initializer!=null&&t.hasOwnProperty("initializer")){if(!Array.isArray(t.initializer))return"initializer: array expected";for(var o=0;o<t.initializer.length;++o){var i=$.onnx.TensorProto.verify(t.initializer[o]);if(i)return"initializer."+i}}if(t.sparseInitializer!=null&&t.hasOwnProperty("sparseInitializer")){if(!Array.isArray(t.sparseInitializer))return"sparseInitializer: array expected";for(var o=0;o<t.sparseInitializer.length;++o){var i=$.onnx.SparseTensorProto.verify(t.sparseInitializer[o]);if(i)return"sparseInitializer."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!E.isString(t.docString))return"docString: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o){var i=$.onnx.ValueInfoProto.verify(t.input[o]);if(i)return"input."+i}}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o){var i=$.onnx.ValueInfoProto.verify(t.output[o]);if(i)return"output."+i}}if(t.valueInfo!=null&&t.hasOwnProperty("valueInfo")){if(!Array.isArray(t.valueInfo))return"valueInfo: array expected";for(var o=0;o<t.valueInfo.length;++o){var i=$.onnx.ValueInfoProto.verify(t.valueInfo[o]);if(i)return"valueInfo."+i}}if(t.quantizationAnnotation!=null&&t.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(t.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var o=0;o<t.quantizationAnnotation.length;++o){var i=$.onnx.TensorAnnotation.verify(t.quantizationAnnotation[o]);if(i)return"quantizationAnnotation."+i}}return null},e.fromObject=function(t){if(t instanceof $.onnx.GraphProto)return t;var o=new $.onnx.GraphProto;if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.GraphProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.GraphProto.node: object expected");o.node[i]=$.onnx.NodeProto.fromObject(t.node[i])}}if(t.name!=null&&(o.name=String(t.name)),t.initializer){if(!Array.isArray(t.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");o.initializer=[];for(var i=0;i<t.initializer.length;++i){if(typeof t.initializer[i]!="object")throw TypeError(".onnx.GraphProto.initializer: object expected");o.initializer[i]=$.onnx.TensorProto.fromObject(t.initializer[i])}}if(t.sparseInitializer){if(!Array.isArray(t.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");o.sparseInitializer=[];for(var i=0;i<t.sparseInitializer.length;++i){if(typeof t.sparseInitializer[i]!="object")throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");o.sparseInitializer[i]=$.onnx.SparseTensorProto.fromObject(t.sparseInitializer[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.GraphProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i){if(typeof t.input[i]!="object")throw TypeError(".onnx.GraphProto.input: object expected");o.input[i]=$.onnx.ValueInfoProto.fromObject(t.input[i])}}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.GraphProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i){if(typeof t.output[i]!="object")throw TypeError(".onnx.GraphProto.output: object expected");o.output[i]=$.onnx.ValueInfoProto.fromObject(t.output[i])}}if(t.valueInfo){if(!Array.isArray(t.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");o.valueInfo=[];for(var i=0;i<t.valueInfo.length;++i){if(typeof t.valueInfo[i]!="object")throw TypeError(".onnx.GraphProto.valueInfo: object expected");o.valueInfo[i]=$.onnx.ValueInfoProto.fromObject(t.valueInfo[i])}}if(t.quantizationAnnotation){if(!Array.isArray(t.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");o.quantizationAnnotation=[];for(var i=0;i<t.quantizationAnnotation.length;++i){if(typeof t.quantizationAnnotation[i]!="object")throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");o.quantizationAnnotation[i]=$.onnx.TensorAnnotation.fromObject(t.quantizationAnnotation[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.node=[],i.initializer=[],i.input=[],i.output=[],i.valueInfo=[],i.quantizationAnnotation=[],i.sparseInitializer=[]),o.defaults&&(i.name="",i.docString=""),t.node&&t.node.length){i.node=[];for(var a=0;a<t.node.length;++a)i.node[a]=$.onnx.NodeProto.toObject(t.node[a],o)}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.initializer&&t.initializer.length){i.initializer=[];for(var a=0;a<t.initializer.length;++a)i.initializer[a]=$.onnx.TensorProto.toObject(t.initializer[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=$.onnx.ValueInfoProto.toObject(t.input[a],o)}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=$.onnx.ValueInfoProto.toObject(t.output[a],o)}if(t.valueInfo&&t.valueInfo.length){i.valueInfo=[];for(var a=0;a<t.valueInfo.length;++a)i.valueInfo[a]=$.onnx.ValueInfoProto.toObject(t.valueInfo[a],o)}if(t.quantizationAnnotation&&t.quantizationAnnotation.length){i.quantizationAnnotation=[];for(var a=0;a<t.quantizationAnnotation.length;++a)i.quantizationAnnotation[a]=$.onnx.TensorAnnotation.toObject(t.quantizationAnnotation[a],o)}if(t.sparseInitializer&&t.sparseInitializer.length){i.sparseInitializer=[];for(var a=0;a<t.sparseInitializer.length;++a)i.sparseInitializer[a]=$.onnx.SparseTensorProto.toObject(t.sparseInitializer[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.GraphProto"},e}(),n.TensorProto=function(){function e(r){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.dims=E.emptyArray,e.prototype.dataType=0,e.prototype.segment=null,e.prototype.floatData=E.emptyArray,e.prototype.int32Data=E.emptyArray,e.prototype.stringData=E.emptyArray,e.prototype.int64Data=E.emptyArray,e.prototype.name="",e.prototype.docString="",e.prototype.rawData=E.newBuffer([]),e.prototype.externalData=E.emptyArray,e.prototype.dataLocation=0,e.prototype.doubleData=E.emptyArray,e.prototype.uint64Data=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=tt.create()),t.dims!=null&&t.dims.length){o.uint32(10).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}if(t.dataType!=null&&Object.hasOwnProperty.call(t,"dataType")&&o.uint32(16).int32(t.dataType),t.segment!=null&&Object.hasOwnProperty.call(t,"segment")&&$.onnx.TensorProto.Segment.encode(t.segment,o.uint32(26).fork()).ldelim(),t.floatData!=null&&t.floatData.length){o.uint32(34).fork();for(var i=0;i<t.floatData.length;++i)o.float(t.floatData[i]);o.ldelim()}if(t.int32Data!=null&&t.int32Data.length){o.uint32(42).fork();for(var i=0;i<t.int32Data.length;++i)o.int32(t.int32Data[i]);o.ldelim()}if(t.stringData!=null&&t.stringData.length)for(var i=0;i<t.stringData.length;++i)o.uint32(50).bytes(t.stringData[i]);if(t.int64Data!=null&&t.int64Data.length){o.uint32(58).fork();for(var i=0;i<t.int64Data.length;++i)o.int64(t.int64Data[i]);o.ldelim()}if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(66).string(t.name),t.rawData!=null&&Object.hasOwnProperty.call(t,"rawData")&&o.uint32(74).bytes(t.rawData),t.doubleData!=null&&t.doubleData.length){o.uint32(82).fork();for(var i=0;i<t.doubleData.length;++i)o.double(t.doubleData[i]);o.ldelim()}if(t.uint64Data!=null&&t.uint64Data.length){o.uint32(90).fork();for(var i=0;i<t.uint64Data.length;++i)o.uint64(t.uint64Data[i]);o.ldelim()}if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(98).string(t.docString),t.externalData!=null&&t.externalData.length)for(var i=0;i<t.externalData.length;++i)$.onnx.StringStringEntryProto.encode(t.externalData[i],o.uint32(106).fork()).ldelim();return t.dataLocation!=null&&Object.hasOwnProperty.call(t,"dataLocation")&&o.uint32(112).int32(t.dataLocation),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.TensorProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{if(a.dims&&a.dims.length||(a.dims=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.dims.push(t.int64());else a.dims.push(t.int64());break}case 2:{a.dataType=t.int32();break}case 3:{a.segment=$.onnx.TensorProto.Segment.decode(t,t.uint32());break}case 4:{if(a.floatData&&a.floatData.length||(a.floatData=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.floatData.push(t.float());else a.floatData.push(t.float());break}case 5:{if(a.int32Data&&a.int32Data.length||(a.int32Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.int32Data.push(t.int32());else a.int32Data.push(t.int32());break}case 6:{a.stringData&&a.stringData.length||(a.stringData=[]),a.stringData.push(t.bytes());break}case 7:{if(a.int64Data&&a.int64Data.length||(a.int64Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.int64Data.push(t.int64());else a.int64Data.push(t.int64());break}case 8:{a.name=t.string();break}case 12:{a.docString=t.string();break}case 9:{a.rawData=t.bytes();break}case 13:{a.externalData&&a.externalData.length||(a.externalData=[]),a.externalData.push($.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 14:{a.dataLocation=t.int32();break}case 10:{if(a.doubleData&&a.doubleData.length||(a.doubleData=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.doubleData.push(t.double());else a.doubleData.push(t.double());break}case 11:{if(a.uint64Data&&a.uint64Data.length||(a.uint64Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.uint64Data.push(t.uint64());else a.uint64Data.push(t.uint64());break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var o=0;o<t.dims.length;++o)if(!E.isInteger(t.dims[o])&&!(t.dims[o]&&E.isInteger(t.dims[o].low)&&E.isInteger(t.dims[o].high)))return"dims: integer|Long[] expected"}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&!E.isInteger(t.dataType))return"dataType: integer expected";if(t.segment!=null&&t.hasOwnProperty("segment")){var i=$.onnx.TensorProto.Segment.verify(t.segment);if(i)return"segment."+i}if(t.floatData!=null&&t.hasOwnProperty("floatData")){if(!Array.isArray(t.floatData))return"floatData: array expected";for(var o=0;o<t.floatData.length;++o)if(typeof t.floatData[o]!="number")return"floatData: number[] expected"}if(t.int32Data!=null&&t.hasOwnProperty("int32Data")){if(!Array.isArray(t.int32Data))return"int32Data: array expected";for(var o=0;o<t.int32Data.length;++o)if(!E.isInteger(t.int32Data[o]))return"int32Data: integer[] expected"}if(t.stringData!=null&&t.hasOwnProperty("stringData")){if(!Array.isArray(t.stringData))return"stringData: array expected";for(var o=0;o<t.stringData.length;++o)if(!(t.stringData[o]&&typeof t.stringData[o].length=="number"||E.isString(t.stringData[o])))return"stringData: buffer[] expected"}if(t.int64Data!=null&&t.hasOwnProperty("int64Data")){if(!Array.isArray(t.int64Data))return"int64Data: array expected";for(var o=0;o<t.int64Data.length;++o)if(!E.isInteger(t.int64Data[o])&&!(t.int64Data[o]&&E.isInteger(t.int64Data[o].low)&&E.isInteger(t.int64Data[o].high)))return"int64Data: integer|Long[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!E.isString(t.name))return"name: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!E.isString(t.docString))return"docString: string expected";if(t.rawData!=null&&t.hasOwnProperty("rawData")&&!(t.rawData&&typeof t.rawData.length=="number"||E.isString(t.rawData)))return"rawData: buffer expected";if(t.externalData!=null&&t.hasOwnProperty("externalData")){if(!Array.isArray(t.externalData))return"externalData: array expected";for(var o=0;o<t.externalData.length;++o){var i=$.onnx.StringStringEntryProto.verify(t.externalData[o]);if(i)return"externalData."+i}}if(t.dataLocation!=null&&t.hasOwnProperty("dataLocation"))switch(t.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:break}if(t.doubleData!=null&&t.hasOwnProperty("doubleData")){if(!Array.isArray(t.doubleData))return"doubleData: array expected";for(var o=0;o<t.doubleData.length;++o)if(typeof t.doubleData[o]!="number")return"doubleData: number[] expected"}if(t.uint64Data!=null&&t.hasOwnProperty("uint64Data")){if(!Array.isArray(t.uint64Data))return"uint64Data: array expected";for(var o=0;o<t.uint64Data.length;++o)if(!E.isInteger(t.uint64Data[o])&&!(t.uint64Data[o]&&E.isInteger(t.uint64Data[o].low)&&E.isInteger(t.uint64Data[o].high)))return"uint64Data: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof $.onnx.TensorProto)return t;var o=new $.onnx.TensorProto;if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.TensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)E.Long?(o.dims[i]=E.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new E.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}if(t.dataType!=null&&(o.dataType=t.dataType|0),t.segment!=null){if(typeof t.segment!="object")throw TypeError(".onnx.TensorProto.segment: object expected");o.segment=$.onnx.TensorProto.Segment.fromObject(t.segment)}if(t.floatData){if(!Array.isArray(t.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");o.floatData=[];for(var i=0;i<t.floatData.length;++i)o.floatData[i]=Number(t.floatData[i])}if(t.int32Data){if(!Array.isArray(t.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");o.int32Data=[];for(var i=0;i<t.int32Data.length;++i)o.int32Data[i]=t.int32Data[i]|0}if(t.stringData){if(!Array.isArray(t.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");o.stringData=[];for(var i=0;i<t.stringData.length;++i)typeof t.stringData[i]=="string"?E.base64.decode(t.stringData[i],o.stringData[i]=E.newBuffer(E.base64.length(t.stringData[i])),0):t.stringData[i].length>=0&&(o.stringData[i]=t.stringData[i])}if(t.int64Data){if(!Array.isArray(t.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");o.int64Data=[];for(var i=0;i<t.int64Data.length;++i)E.Long?(o.int64Data[i]=E.Long.fromValue(t.int64Data[i])).unsigned=!1:typeof t.int64Data[i]=="string"?o.int64Data[i]=parseInt(t.int64Data[i],10):typeof t.int64Data[i]=="number"?o.int64Data[i]=t.int64Data[i]:typeof t.int64Data[i]=="object"&&(o.int64Data[i]=new E.LongBits(t.int64Data[i].low>>>0,t.int64Data[i].high>>>0).toNumber())}if(t.name!=null&&(o.name=String(t.name)),t.docString!=null&&(o.docString=String(t.docString)),t.rawData!=null&&(typeof t.rawData=="string"?E.base64.decode(t.rawData,o.rawData=E.newBuffer(E.base64.length(t.rawData)),0):t.rawData.length>=0&&(o.rawData=t.rawData)),t.externalData){if(!Array.isArray(t.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");o.externalData=[];for(var i=0;i<t.externalData.length;++i){if(typeof t.externalData[i]!="object")throw TypeError(".onnx.TensorProto.externalData: object expected");o.externalData[i]=$.onnx.StringStringEntryProto.fromObject(t.externalData[i])}}switch(t.dataLocation){default:if(typeof t.dataLocation=="number"){o.dataLocation=t.dataLocation;break}break;case"DEFAULT":case 0:o.dataLocation=0;break;case"EXTERNAL":case 1:o.dataLocation=1;break}if(t.doubleData){if(!Array.isArray(t.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");o.doubleData=[];for(var i=0;i<t.doubleData.length;++i)o.doubleData[i]=Number(t.doubleData[i])}if(t.uint64Data){if(!Array.isArray(t.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");o.uint64Data=[];for(var i=0;i<t.uint64Data.length;++i)E.Long?(o.uint64Data[i]=E.Long.fromValue(t.uint64Data[i])).unsigned=!0:typeof t.uint64Data[i]=="string"?o.uint64Data[i]=parseInt(t.uint64Data[i],10):typeof t.uint64Data[i]=="number"?o.uint64Data[i]=t.uint64Data[i]:typeof t.uint64Data[i]=="object"&&(o.uint64Data[i]=new E.LongBits(t.uint64Data[i].low>>>0,t.uint64Data[i].high>>>0).toNumber(!0))}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[],i.floatData=[],i.int32Data=[],i.stringData=[],i.int64Data=[],i.doubleData=[],i.uint64Data=[],i.externalData=[]),o.defaults&&(i.dataType=0,i.segment=null,i.name="",o.bytes===String?i.rawData="":(i.rawData=[],o.bytes!==Array&&(i.rawData=E.newBuffer(i.rawData))),i.docString="",i.dataLocation=o.enums===String?"DEFAULT":0),t.dims&&t.dims.length){i.dims=[];for(var a=0;a<t.dims.length;++a)typeof t.dims[a]=="number"?i.dims[a]=o.longs===String?String(t.dims[a]):t.dims[a]:i.dims[a]=o.longs===String?E.Long.prototype.toString.call(t.dims[a]):o.longs===Number?new E.LongBits(t.dims[a].low>>>0,t.dims[a].high>>>0).toNumber():t.dims[a]}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&(i.dataType=t.dataType),t.segment!=null&&t.hasOwnProperty("segment")&&(i.segment=$.onnx.TensorProto.Segment.toObject(t.segment,o)),t.floatData&&t.floatData.length){i.floatData=[];for(var a=0;a<t.floatData.length;++a)i.floatData[a]=o.json&&!isFinite(t.floatData[a])?String(t.floatData[a]):t.floatData[a]}if(t.int32Data&&t.int32Data.length){i.int32Data=[];for(var a=0;a<t.int32Data.length;++a)i.int32Data[a]=t.int32Data[a]}if(t.stringData&&t.stringData.length){i.stringData=[];for(var a=0;a<t.stringData.length;++a)i.stringData[a]=o.bytes===String?E.base64.encode(t.stringData[a],0,t.stringData[a].length):o.bytes===Array?Array.prototype.slice.call(t.stringData[a]):t.stringData[a]}if(t.int64Data&&t.int64Data.length){i.int64Data=[];for(var a=0;a<t.int64Data.length;++a)typeof t.int64Data[a]=="number"?i.int64Data[a]=o.longs===String?String(t.int64Data[a]):t.int64Data[a]:i.int64Data[a]=o.longs===String?E.Long.prototype.toString.call(t.int64Data[a]):o.longs===Number?new E.LongBits(t.int64Data[a].low>>>0,t.int64Data[a].high>>>0).toNumber():t.int64Data[a]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.rawData!=null&&t.hasOwnProperty("rawData")&&(i.rawData=o.bytes===String?E.base64.encode(t.rawData,0,t.rawData.length):o.bytes===Array?Array.prototype.slice.call(t.rawData):t.rawData),t.doubleData&&t.doubleData.length){i.doubleData=[];for(var a=0;a<t.doubleData.length;++a)i.doubleData[a]=o.json&&!isFinite(t.doubleData[a])?String(t.doubleData[a]):t.doubleData[a]}if(t.uint64Data&&t.uint64Data.length){i.uint64Data=[];for(var a=0;a<t.uint64Data.length;++a)typeof t.uint64Data[a]=="number"?i.uint64Data[a]=o.longs===String?String(t.uint64Data[a]):t.uint64Data[a]:i.uint64Data[a]=o.longs===String?E.Long.prototype.toString.call(t.uint64Data[a]):o.longs===Number?new E.LongBits(t.uint64Data[a].low>>>0,t.uint64Data[a].high>>>0).toNumber(!0):t.uint64Data[a]}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.externalData&&t.externalData.length){i.externalData=[];for(var a=0;a<t.externalData.length;++a)i.externalData[a]=$.onnx.StringStringEntryProto.toObject(t.externalData[a],o)}return t.dataLocation!=null&&t.hasOwnProperty("dataLocation")&&(i.dataLocation=o.enums===String?$.onnx.TensorProto.DataLocation[t.dataLocation]===void 0?t.dataLocation:$.onnx.TensorProto.DataLocation[t.dataLocation]:t.dataLocation),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorProto"},e.DataType=function(){var r={},t=Object.create(r);return t[r[0]="UNDEFINED"]=0,t[r[1]="FLOAT"]=1,t[r[2]="UINT8"]=2,t[r[3]="INT8"]=3,t[r[4]="UINT16"]=4,t[r[5]="INT16"]=5,t[r[6]="INT32"]=6,t[r[7]="INT64"]=7,t[r[8]="STRING"]=8,t[r[9]="BOOL"]=9,t[r[10]="FLOAT16"]=10,t[r[11]="DOUBLE"]=11,t[r[12]="UINT32"]=12,t[r[13]="UINT64"]=13,t[r[14]="COMPLEX64"]=14,t[r[15]="COMPLEX128"]=15,t[r[16]="BFLOAT16"]=16,t[r[17]="FLOAT8E4M3FN"]=17,t[r[18]="FLOAT8E4M3FNUZ"]=18,t[r[19]="FLOAT8E5M2"]=19,t[r[20]="FLOAT8E5M2FNUZ"]=20,t}(),e.Segment=function(){function r(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}return r.prototype.begin=E.Long?E.Long.fromBits(0,0,!1):0,r.prototype.end=E.Long?E.Long.fromBits(0,0,!1):0,r.create=function(o){return new r(o)},r.encode=function(o,i){return i||(i=tt.create()),o.begin!=null&&Object.hasOwnProperty.call(o,"begin")&&i.uint32(8).int64(o.begin),o.end!=null&&Object.hasOwnProperty.call(o,"end")&&i.uint32(16).int64(o.end),i},r.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},r.decode=function(o,i){o instanceof K||(o=K.create(o));for(var a=i===void 0?o.len:o.pos+i,s=new $.onnx.TensorProto.Segment;o.pos<a;){var u=o.uint32();switch(u>>>3){case 1:{s.begin=o.int64();break}case 2:{s.end=o.int64();break}default:o.skipType(u&7);break}}return s},r.decodeDelimited=function(o){return o instanceof K||(o=new K(o)),this.decode(o,o.uint32())},r.verify=function(o){return typeof o!="object"||o===null?"object expected":o.begin!=null&&o.hasOwnProperty("begin")&&!E.isInteger(o.begin)&&!(o.begin&&E.isInteger(o.begin.low)&&E.isInteger(o.begin.high))?"begin: integer|Long expected":o.end!=null&&o.hasOwnProperty("end")&&!E.isInteger(o.end)&&!(o.end&&E.isInteger(o.end.low)&&E.isInteger(o.end.high))?"end: integer|Long expected":null},r.fromObject=function(o){if(o instanceof $.onnx.TensorProto.Segment)return o;var i=new $.onnx.TensorProto.Segment;return o.begin!=null&&(E.Long?(i.begin=E.Long.fromValue(o.begin)).unsigned=!1:typeof o.begin=="string"?i.begin=parseInt(o.begin,10):typeof o.begin=="number"?i.begin=o.begin:typeof o.begin=="object"&&(i.begin=new E.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber())),o.end!=null&&(E.Long?(i.end=E.Long.fromValue(o.end)).unsigned=!1:typeof o.end=="string"?i.end=parseInt(o.end,10):typeof o.end=="number"?i.end=o.end:typeof o.end=="object"&&(i.end=new E.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber())),i},r.toObject=function(o,i){i||(i={});var a={};if(i.defaults){if(E.Long){var s=new E.Long(0,0,!1);a.begin=i.longs===String?s.toString():i.longs===Number?s.toNumber():s}else a.begin=i.longs===String?"0":0;if(E.Long){var s=new E.Long(0,0,!1);a.end=i.longs===String?s.toString():i.longs===Number?s.toNumber():s}else a.end=i.longs===String?"0":0}return o.begin!=null&&o.hasOwnProperty("begin")&&(typeof o.begin=="number"?a.begin=i.longs===String?String(o.begin):o.begin:a.begin=i.longs===String?E.Long.prototype.toString.call(o.begin):i.longs===Number?new E.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber():o.begin),o.end!=null&&o.hasOwnProperty("end")&&(typeof o.end=="number"?a.end=i.longs===String?String(o.end):o.end:a.end=i.longs===String?E.Long.prototype.toString.call(o.end):i.longs===Number?new E.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber():o.end),a},r.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},r.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TensorProto.Segment"},r}(),e.DataLocation=function(){var r={},t=Object.create(r);return t[r[0]="DEFAULT"]=0,t[r[1]="EXTERNAL"]=1,t}(),e}(),n.SparseTensorProto=function(){function e(r){if(this.dims=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.values=null,e.prototype.indices=null,e.prototype.dims=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=tt.create()),t.values!=null&&Object.hasOwnProperty.call(t,"values")&&$.onnx.TensorProto.encode(t.values,o.uint32(10).fork()).ldelim(),t.indices!=null&&Object.hasOwnProperty.call(t,"indices")&&$.onnx.TensorProto.encode(t.indices,o.uint32(18).fork()).ldelim(),t.dims!=null&&t.dims.length){o.uint32(26).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.SparseTensorProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.values=$.onnx.TensorProto.decode(t,t.uint32());break}case 2:{a.indices=$.onnx.TensorProto.decode(t,t.uint32());break}case 3:{if(a.dims&&a.dims.length||(a.dims=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.dims.push(t.int64());else a.dims.push(t.int64());break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.values!=null&&t.hasOwnProperty("values")){var o=$.onnx.TensorProto.verify(t.values);if(o)return"values."+o}if(t.indices!=null&&t.hasOwnProperty("indices")){var o=$.onnx.TensorProto.verify(t.indices);if(o)return"indices."+o}if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var i=0;i<t.dims.length;++i)if(!E.isInteger(t.dims[i])&&!(t.dims[i]&&E.isInteger(t.dims[i].low)&&E.isInteger(t.dims[i].high)))return"dims: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof $.onnx.SparseTensorProto)return t;var o=new $.onnx.SparseTensorProto;if(t.values!=null){if(typeof t.values!="object")throw TypeError(".onnx.SparseTensorProto.values: object expected");o.values=$.onnx.TensorProto.fromObject(t.values)}if(t.indices!=null){if(typeof t.indices!="object")throw TypeError(".onnx.SparseTensorProto.indices: object expected");o.indices=$.onnx.TensorProto.fromObject(t.indices)}if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)E.Long?(o.dims[i]=E.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new E.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[]),o.defaults&&(i.values=null,i.indices=null),t.values!=null&&t.hasOwnProperty("values")&&(i.values=$.onnx.TensorProto.toObject(t.values,o)),t.indices!=null&&t.hasOwnProperty("indices")&&(i.indices=$.onnx.TensorProto.toObject(t.indices,o)),t.dims&&t.dims.length){i.dims=[];for(var a=0;a<t.dims.length;++a)typeof t.dims[a]=="number"?i.dims[a]=o.longs===String?String(t.dims[a]):t.dims[a]:i.dims[a]=o.longs===String?E.Long.prototype.toString.call(t.dims[a]):o.longs===Number?new E.LongBits(t.dims[a].low>>>0,t.dims[a].high>>>0).toNumber():t.dims[a]}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.SparseTensorProto"},e}(),n.TensorShapeProto=function(){function e(r){if(this.dim=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.dim=E.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=tt.create()),t.dim!=null&&t.dim.length)for(var i=0;i<t.dim.length;++i)$.onnx.TensorShapeProto.Dimension.encode(t.dim[i],o.uint32(10).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.TensorShapeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.dim&&a.dim.length||(a.dim=[]),a.dim.push($.onnx.TensorShapeProto.Dimension.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dim!=null&&t.hasOwnProperty("dim")){if(!Array.isArray(t.dim))return"dim: array expected";for(var o=0;o<t.dim.length;++o){var i=$.onnx.TensorShapeProto.Dimension.verify(t.dim[o]);if(i)return"dim."+i}}return null},e.fromObject=function(t){if(t instanceof $.onnx.TensorShapeProto)return t;var o=new $.onnx.TensorShapeProto;if(t.dim){if(!Array.isArray(t.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");o.dim=[];for(var i=0;i<t.dim.length;++i){if(typeof t.dim[i]!="object")throw TypeError(".onnx.TensorShapeProto.dim: object expected");o.dim[i]=$.onnx.TensorShapeProto.Dimension.fromObject(t.dim[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dim=[]),t.dim&&t.dim.length){i.dim=[];for(var a=0;a<t.dim.length;++a)i.dim[a]=$.onnx.TensorShapeProto.Dimension.toObject(t.dim[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorShapeProto"},e.Dimension=function(){function r(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}r.prototype.dimValue=null,r.prototype.dimParam=null,r.prototype.denotation="";var t;return Object.defineProperty(r.prototype,"value",{get:E.oneOfGetter(t=["dimValue","dimParam"]),set:E.oneOfSetter(t)}),r.create=function(i){return new r(i)},r.encode=function(i,a){return a||(a=tt.create()),i.dimValue!=null&&Object.hasOwnProperty.call(i,"dimValue")&&a.uint32(8).int64(i.dimValue),i.dimParam!=null&&Object.hasOwnProperty.call(i,"dimParam")&&a.uint32(18).string(i.dimParam),i.denotation!=null&&Object.hasOwnProperty.call(i,"denotation")&&a.uint32(26).string(i.denotation),a},r.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},r.decode=function(i,a){i instanceof K||(i=K.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new $.onnx.TensorShapeProto.Dimension;i.pos<s;){var c=i.uint32();switch(c>>>3){case 1:{u.dimValue=i.int64();break}case 2:{u.dimParam=i.string();break}case 3:{u.denotation=i.string();break}default:i.skipType(c&7);break}}return u},r.decodeDelimited=function(i){return i instanceof K||(i=new K(i)),this.decode(i,i.uint32())},r.verify=function(i){if(typeof i!="object"||i===null)return"object expected";var a={};if(i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(a.value=1,!E.isInteger(i.dimValue)&&!(i.dimValue&&E.isInteger(i.dimValue.low)&&E.isInteger(i.dimValue.high))))return"dimValue: integer|Long expected";if(i.dimParam!=null&&i.hasOwnProperty("dimParam")){if(a.value===1)return"value: multiple values";if(a.value=1,!E.isString(i.dimParam))return"dimParam: string expected"}return i.denotation!=null&&i.hasOwnProperty("denotation")&&!E.isString(i.denotation)?"denotation: string expected":null},r.fromObject=function(i){if(i instanceof $.onnx.TensorShapeProto.Dimension)return i;var a=new $.onnx.TensorShapeProto.Dimension;return i.dimValue!=null&&(E.Long?(a.dimValue=E.Long.fromValue(i.dimValue)).unsigned=!1:typeof i.dimValue=="string"?a.dimValue=parseInt(i.dimValue,10):typeof i.dimValue=="number"?a.dimValue=i.dimValue:typeof i.dimValue=="object"&&(a.dimValue=new E.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber())),i.dimParam!=null&&(a.dimParam=String(i.dimParam)),i.denotation!=null&&(a.denotation=String(i.denotation)),a},r.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.denotation=""),i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(typeof i.dimValue=="number"?s.dimValue=a.longs===String?String(i.dimValue):i.dimValue:s.dimValue=a.longs===String?E.Long.prototype.toString.call(i.dimValue):a.longs===Number?new E.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber():i.dimValue,a.oneofs&&(s.value="dimValue")),i.dimParam!=null&&i.hasOwnProperty("dimParam")&&(s.dimParam=i.dimParam,a.oneofs&&(s.value="dimParam")),i.denotation!=null&&i.hasOwnProperty("denotation")&&(s.denotation=i.denotation),s},r.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},r.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TensorShapeProto.Dimension"},r}(),e}(),n.TypeProto=function(){function e(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}e.prototype.tensorType=null,e.prototype.sequenceType=null,e.prototype.mapType=null,e.prototype.optionalType=null,e.prototype.sparseTensorType=null,e.prototype.denotation="";var r;return Object.defineProperty(e.prototype,"value",{get:E.oneOfGetter(r=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:E.oneOfSetter(r)}),e.create=function(o){return new e(o)},e.encode=function(o,i){return i||(i=tt.create()),o.tensorType!=null&&Object.hasOwnProperty.call(o,"tensorType")&&$.onnx.TypeProto.Tensor.encode(o.tensorType,i.uint32(10).fork()).ldelim(),o.sequenceType!=null&&Object.hasOwnProperty.call(o,"sequenceType")&&$.onnx.TypeProto.Sequence.encode(o.sequenceType,i.uint32(34).fork()).ldelim(),o.mapType!=null&&Object.hasOwnProperty.call(o,"mapType")&&$.onnx.TypeProto.Map.encode(o.mapType,i.uint32(42).fork()).ldelim(),o.denotation!=null&&Object.hasOwnProperty.call(o,"denotation")&&i.uint32(50).string(o.denotation),o.sparseTensorType!=null&&Object.hasOwnProperty.call(o,"sparseTensorType")&&$.onnx.TypeProto.SparseTensor.encode(o.sparseTensorType,i.uint32(66).fork()).ldelim(),o.optionalType!=null&&Object.hasOwnProperty.call(o,"optionalType")&&$.onnx.TypeProto.Optional.encode(o.optionalType,i.uint32(74).fork()).ldelim(),i},e.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},e.decode=function(o,i){o instanceof K||(o=K.create(o));for(var a=i===void 0?o.len:o.pos+i,s=new $.onnx.TypeProto;o.pos<a;){var u=o.uint32();switch(u>>>3){case 1:{s.tensorType=$.onnx.TypeProto.Tensor.decode(o,o.uint32());break}case 4:{s.sequenceType=$.onnx.TypeProto.Sequence.decode(o,o.uint32());break}case 5:{s.mapType=$.onnx.TypeProto.Map.decode(o,o.uint32());break}case 9:{s.optionalType=$.onnx.TypeProto.Optional.decode(o,o.uint32());break}case 8:{s.sparseTensorType=$.onnx.TypeProto.SparseTensor.decode(o,o.uint32());break}case 6:{s.denotation=o.string();break}default:o.skipType(u&7);break}}return s},e.decodeDelimited=function(o){return o instanceof K||(o=new K(o)),this.decode(o,o.uint32())},e.verify=function(o){if(typeof o!="object"||o===null)return"object expected";var i={};if(o.tensorType!=null&&o.hasOwnProperty("tensorType")){i.value=1;{var a=$.onnx.TypeProto.Tensor.verify(o.tensorType);if(a)return"tensorType."+a}}if(o.sequenceType!=null&&o.hasOwnProperty("sequenceType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=$.onnx.TypeProto.Sequence.verify(o.sequenceType);if(a)return"sequenceType."+a}}if(o.mapType!=null&&o.hasOwnProperty("mapType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=$.onnx.TypeProto.Map.verify(o.mapType);if(a)return"mapType."+a}}if(o.optionalType!=null&&o.hasOwnProperty("optionalType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=$.onnx.TypeProto.Optional.verify(o.optionalType);if(a)return"optionalType."+a}}if(o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=$.onnx.TypeProto.SparseTensor.verify(o.sparseTensorType);if(a)return"sparseTensorType."+a}}return o.denotation!=null&&o.hasOwnProperty("denotation")&&!E.isString(o.denotation)?"denotation: string expected":null},e.fromObject=function(o){if(o instanceof $.onnx.TypeProto)return o;var i=new $.onnx.TypeProto;if(o.tensorType!=null){if(typeof o.tensorType!="object")throw TypeError(".onnx.TypeProto.tensorType: object expected");i.tensorType=$.onnx.TypeProto.Tensor.fromObject(o.tensorType)}if(o.sequenceType!=null){if(typeof o.sequenceType!="object")throw TypeError(".onnx.TypeProto.sequenceType: object expected");i.sequenceType=$.onnx.TypeProto.Sequence.fromObject(o.sequenceType)}if(o.mapType!=null){if(typeof o.mapType!="object")throw TypeError(".onnx.TypeProto.mapType: object expected");i.mapType=$.onnx.TypeProto.Map.fromObject(o.mapType)}if(o.optionalType!=null){if(typeof o.optionalType!="object")throw TypeError(".onnx.TypeProto.optionalType: object expected");i.optionalType=$.onnx.TypeProto.Optional.fromObject(o.optionalType)}if(o.sparseTensorType!=null){if(typeof o.sparseTensorType!="object")throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");i.sparseTensorType=$.onnx.TypeProto.SparseTensor.fromObject(o.sparseTensorType)}return o.denotation!=null&&(i.denotation=String(o.denotation)),i},e.toObject=function(o,i){i||(i={});var a={};return i.defaults&&(a.denotation=""),o.tensorType!=null&&o.hasOwnProperty("tensorType")&&(a.tensorType=$.onnx.TypeProto.Tensor.toObject(o.tensorType,i),i.oneofs&&(a.value="tensorType")),o.sequenceType!=null&&o.hasOwnProperty("sequenceType")&&(a.sequenceType=$.onnx.TypeProto.Sequence.toObject(o.sequenceType,i),i.oneofs&&(a.value="sequenceType")),o.mapType!=null&&o.hasOwnProperty("mapType")&&(a.mapType=$.onnx.TypeProto.Map.toObject(o.mapType,i),i.oneofs&&(a.value="mapType")),o.denotation!=null&&o.hasOwnProperty("denotation")&&(a.denotation=o.denotation),o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")&&(a.sparseTensorType=$.onnx.TypeProto.SparseTensor.toObject(o.sparseTensorType,i),i.oneofs&&(a.value="sparseTensorType")),o.optionalType!=null&&o.hasOwnProperty("optionalType")&&(a.optionalType=$.onnx.TypeProto.Optional.toObject(o.optionalType,i),i.oneofs&&(a.value="optionalType")),a},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TypeProto"},e.Tensor=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=tt.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&a.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&$.onnx.TensorShapeProto.encode(i.shape,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof K||(i=K.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new $.onnx.TypeProto.Tensor;i.pos<s;){var c=i.uint32();switch(c>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=$.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(c&7);break}}return u},t.decodeDelimited=function(i){return i instanceof K||(i=new K(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!E.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var a=$.onnx.TensorShapeProto.verify(i.shape);if(a)return"shape."+a}return null},t.fromObject=function(i){if(i instanceof $.onnx.TypeProto.Tensor)return i;var a=new $.onnx.TypeProto.Tensor;if(i.elemType!=null&&(a.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");a.shape=$.onnx.TensorShapeProto.fromObject(i.shape)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=0,s.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(s.shape=$.onnx.TensorShapeProto.toObject(i.shape,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Tensor"},t}(),e.Sequence=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=tt.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&$.onnx.TypeProto.encode(i.elemType,a.uint32(10).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof K||(i=K.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new $.onnx.TypeProto.Sequence;i.pos<s;){var c=i.uint32();switch(c>>>3){case 1:{u.elemType=$.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(c&7);break}}return u},t.decodeDelimited=function(i){return i instanceof K||(i=new K(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var a=$.onnx.TypeProto.verify(i.elemType);if(a)return"elemType."+a}return null},t.fromObject=function(i){if(i instanceof $.onnx.TypeProto.Sequence)return i;var a=new $.onnx.TypeProto.Sequence;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");a.elemType=$.onnx.TypeProto.fromObject(i.elemType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=$.onnx.TypeProto.toObject(i.elemType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Sequence"},t}(),e.Map=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.keyType=0,t.prototype.valueType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=tt.create()),i.keyType!=null&&Object.hasOwnProperty.call(i,"keyType")&&a.uint32(8).int32(i.keyType),i.valueType!=null&&Object.hasOwnProperty.call(i,"valueType")&&$.onnx.TypeProto.encode(i.valueType,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof K||(i=K.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new $.onnx.TypeProto.Map;i.pos<s;){var c=i.uint32();switch(c>>>3){case 1:{u.keyType=i.int32();break}case 2:{u.valueType=$.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(c&7);break}}return u},t.decodeDelimited=function(i){return i instanceof K||(i=new K(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.keyType!=null&&i.hasOwnProperty("keyType")&&!E.isInteger(i.keyType))return"keyType: integer expected";if(i.valueType!=null&&i.hasOwnProperty("valueType")){var a=$.onnx.TypeProto.verify(i.valueType);if(a)return"valueType."+a}return null},t.fromObject=function(i){if(i instanceof $.onnx.TypeProto.Map)return i;var a=new $.onnx.TypeProto.Map;if(i.keyType!=null&&(a.keyType=i.keyType|0),i.valueType!=null){if(typeof i.valueType!="object")throw TypeError(".onnx.TypeProto.Map.valueType: object expected");a.valueType=$.onnx.TypeProto.fromObject(i.valueType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.keyType=0,s.valueType=null),i.keyType!=null&&i.hasOwnProperty("keyType")&&(s.keyType=i.keyType),i.valueType!=null&&i.hasOwnProperty("valueType")&&(s.valueType=$.onnx.TypeProto.toObject(i.valueType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Map"},t}(),e.Optional=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=tt.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&$.onnx.TypeProto.encode(i.elemType,a.uint32(10).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof K||(i=K.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new $.onnx.TypeProto.Optional;i.pos<s;){var c=i.uint32();switch(c>>>3){case 1:{u.elemType=$.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(c&7);break}}return u},t.decodeDelimited=function(i){return i instanceof K||(i=new K(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var a=$.onnx.TypeProto.verify(i.elemType);if(a)return"elemType."+a}return null},t.fromObject=function(i){if(i instanceof $.onnx.TypeProto.Optional)return i;var a=new $.onnx.TypeProto.Optional;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");a.elemType=$.onnx.TypeProto.fromObject(i.elemType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=$.onnx.TypeProto.toObject(i.elemType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Optional"},t}(),e.SparseTensor=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=tt.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&a.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&$.onnx.TensorShapeProto.encode(i.shape,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof K||(i=K.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new $.onnx.TypeProto.SparseTensor;i.pos<s;){var c=i.uint32();switch(c>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=$.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(c&7);break}}return u},t.decodeDelimited=function(i){return i instanceof K||(i=new K(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!E.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var a=$.onnx.TensorShapeProto.verify(i.shape);if(a)return"shape."+a}return null},t.fromObject=function(i){if(i instanceof $.onnx.TypeProto.SparseTensor)return i;var a=new $.onnx.TypeProto.SparseTensor;if(i.elemType!=null&&(a.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");a.shape=$.onnx.TensorShapeProto.fromObject(i.shape)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=0,s.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(s.shape=$.onnx.TensorShapeProto.toObject(i.shape,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.SparseTensor"},t}(),e}(),n.OperatorSetIdProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.domain="",e.prototype.version=E.Long?E.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=tt.create()),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(10).string(t.domain),t.version!=null&&Object.hasOwnProperty.call(t,"version")&&o.uint32(16).int64(t.version),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.OperatorSetIdProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.domain=t.string();break}case 2:{a.version=t.int64();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.domain!=null&&t.hasOwnProperty("domain")&&!E.isString(t.domain)?"domain: string expected":t.version!=null&&t.hasOwnProperty("version")&&!E.isInteger(t.version)&&!(t.version&&E.isInteger(t.version.low)&&E.isInteger(t.version.high))?"version: integer|Long expected":null},e.fromObject=function(t){if(t instanceof $.onnx.OperatorSetIdProto)return t;var o=new $.onnx.OperatorSetIdProto;return t.domain!=null&&(o.domain=String(t.domain)),t.version!=null&&(E.Long?(o.version=E.Long.fromValue(t.version)).unsigned=!1:typeof t.version=="string"?o.version=parseInt(t.version,10):typeof t.version=="number"?o.version=t.version:typeof t.version=="object"&&(o.version=new E.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber())),o},e.toObject=function(t,o){o||(o={});var i={};if(o.defaults)if(i.domain="",E.Long){var a=new E.Long(0,0,!1);i.version=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.version=o.longs===String?"0":0;return t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.version!=null&&t.hasOwnProperty("version")&&(typeof t.version=="number"?i.version=o.longs===String?String(t.version):t.version:i.version=o.longs===String?E.Long.prototype.toString.call(t.version):o.longs===Number?new E.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber():t.version),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.OperatorSetIdProto"},e}(),n.OperatorStatus=function(){var e={},r=Object.create(e);return r[e[0]="EXPERIMENTAL"]=0,r[e[1]="STABLE"]=1,r}(),n.FunctionProto=function(){function e(r){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.input=E.emptyArray,e.prototype.output=E.emptyArray,e.prototype.attribute=E.emptyArray,e.prototype.attributeProto=E.emptyArray,e.prototype.node=E.emptyArray,e.prototype.docString="",e.prototype.opsetImport=E.emptyArray,e.prototype.domain="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=tt.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(34).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(42).string(t.output[i]);if(t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)o.uint32(50).string(t.attribute[i]);if(t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)$.onnx.NodeProto.encode(t.node[i],o.uint32(58).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(66).string(t.docString),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)$.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(74).fork()).ldelim();if(t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(82).string(t.domain),t.attributeProto!=null&&t.attributeProto.length)for(var i=0;i<t.attributeProto.length;++i)$.onnx.AttributeProto.encode(t.attributeProto[i],o.uint32(90).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof K||(t=K.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.FunctionProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 4:{a.input&&a.input.length||(a.input=[]),a.input.push(t.string());break}case 5:{a.output&&a.output.length||(a.output=[]),a.output.push(t.string());break}case 6:{a.attribute&&a.attribute.length||(a.attribute=[]),a.attribute.push(t.string());break}case 11:{a.attributeProto&&a.attributeProto.length||(a.attributeProto=[]),a.attributeProto.push($.onnx.AttributeProto.decode(t,t.uint32()));break}case 7:{a.node&&a.node.length||(a.node=[]),a.node.push($.onnx.NodeProto.decode(t,t.uint32()));break}case 8:{a.docString=t.string();break}case 9:{a.opsetImport&&a.opsetImport.length||(a.opsetImport=[]),a.opsetImport.push($.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 10:{a.domain=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof K||(t=new K(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!E.isString(t.name))return"name: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!E.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!E.isString(t.output[o]))return"output: string[] expected"}if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o)if(!E.isString(t.attribute[o]))return"attribute: string[] expected"}if(t.attributeProto!=null&&t.hasOwnProperty("attributeProto")){if(!Array.isArray(t.attributeProto))return"attributeProto: array expected";for(var o=0;o<t.attributeProto.length;++o){var i=$.onnx.AttributeProto.verify(t.attributeProto[o]);if(i)return"attributeProto."+i}}if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=$.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!E.isString(t.docString))return"docString: string expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=$.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}return t.domain!=null&&t.hasOwnProperty("domain")&&!E.isString(t.domain)?"domain: string expected":null},e.fromObject=function(t){if(t instanceof $.onnx.FunctionProto)return t;var o=new $.onnx.FunctionProto;if(t.name!=null&&(o.name=String(t.name)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.FunctionProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.FunctionProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i)o.attribute[i]=String(t.attribute[i])}if(t.attributeProto){if(!Array.isArray(t.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");o.attributeProto=[];for(var i=0;i<t.attributeProto.length;++i){if(typeof t.attributeProto[i]!="object")throw TypeError(".onnx.FunctionProto.attributeProto: object expected");o.attributeProto[i]=$.onnx.AttributeProto.fromObject(t.attributeProto[i])}}if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.FunctionProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.FunctionProto.node: object expected");o.node[i]=$.onnx.NodeProto.fromObject(t.node[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.FunctionProto.opsetImport: object expected");o.opsetImport[i]=$.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}return t.domain!=null&&(o.domain=String(t.domain)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[],i.node=[],i.opsetImport=[],i.attributeProto=[]),o.defaults&&(i.name="",i.docString="",i.domain=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=t.input[a]}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=t.output[a]}if(t.attribute&&t.attribute.length){i.attribute=[];for(var a=0;a<t.attribute.length;++a)i.attribute[a]=t.attribute[a]}if(t.node&&t.node.length){i.node=[];for(var a=0;a<t.node.length;++a)i.node[a]=$.onnx.NodeProto.toObject(t.node[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var a=0;a<t.opsetImport.length;++a)i.opsetImport[a]=$.onnx.OperatorSetIdProto.toObject(t.opsetImport[a],o)}if(t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.attributeProto&&t.attributeProto.length){i.attributeProto=[];for(var a=0;a<t.attributeProto.length;++a)i.attributeProto[a]=$.onnx.AttributeProto.toObject(t.attributeProto[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.FunctionProto"},e}(),n}();lm.exports=$});function Zn(n,e){if(!n)throw new Error(typeof e=="string"?e:e())}function Po(n){return new TextDecoder().decode(n)}var qe,An,ml,mt,Ni,pt,xt,ne,Oo,On,Pn,En,Me=k(()=>{"use strict";zs();qe=Te(Xn());Cn();An=class{static arraysEqual(e,r){if(e.length!==r.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!==r[t])return!1;return!0}},ml=class{static preprocessInputShapes(e,r){let t=e.length===1?[1,e[0]]:e,o=r.length===1?[r[0],1]:r;return[t,o]}static postprocessOutputShape(e,r,t){r===1&&e.splice(e.length-2,1),t===1&&e.pop()}static calcMatMulShape(e,r){return e[1]!==r[0]?void 0:[e[0],r[1]]}},mt=class n{static calcShape(e,r,t=!1){let o=e.length,i=r.length;if(o===0)return r;if(i===0)return e;let a=Math.max(e.length,r.length),s=new Array(a);if(t){if(o<2||i<2)return;let u=ml.calcMatMulShape([e[o-2],e[o-1]],[r[i-2],r[i-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=t?3:1;u<=a;u++){let c=o-u<0?1:e[o-u],d=i-u<0?1:r[i-u];if(c!==d&&c>1&&d>1)return;s[a-u]=Math.max(c,d)}return s}static index(e,r){let t=new Array(r.length);return n.fillIndex(e,r,t),t}static fillIndex(e,r,t){let o=e.length-r.length;for(let i=0;i<r.length;i++)t[i]=e[o+i]%r[i]}static calc(e,r,t,o,i){let a=n.calcShape(e.dims,r.dims);if(a){if(o&&!ne.areEqual(a,e.dims))return;let s=ne.size(a),u=o?e:new ot(a,i||e.type);if(a.length===0)u.set([],t(e.get([]),r.get([])));else{let c=new Array(a.length),d=new Array(e.dims.length),f=new Array(r.dims.length),h=0,b=0,y=!1,v=!1;e.dims.length===0&&(h=e.get([]),y=!0),r.dims.length===0&&(b=r.get([]),v=!0);let T;for(let x=0;x<s;x++){T=x;for(let w=a.length-1;w>=0;w--)c[w]=T%a[w],T=Math.floor(T/a[w]);y||(n.fillIndex(c,e.dims,d),h=e.get(d)),v||(n.fillIndex(c,r.dims,f),b=r.get(f)),u.set(c,t(h,b))}}return u}}static isValidBroadcast(e,r){let t=e.length,o=r.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==r[o-i])return!1;return!0}static getBroadcastDims(e,r){let t=e.length,o=[];for(let i=0;i<t;i++){let a=t-1-i,s=e[a]||1;(r[r.length-1-i]||1)>1&&s===1&&o.unshift(a)}return o}},Ni=class{static getShapeOfGemmResult(e,r,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let a,s,u;r?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let c=-1;if(o?(u=t[0],c=1):(u=t[1],c=0),t[c]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(i&&!mt.isValidBroadcast(i,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},pt=class n{static tensorDataTypeFromProto(e){switch(e){case qe.onnx.TensorProto.DataType.INT8:return"int8";case qe.onnx.TensorProto.DataType.UINT8:return"uint8";case qe.onnx.TensorProto.DataType.BOOL:return"bool";case qe.onnx.TensorProto.DataType.INT16:return"int16";case qe.onnx.TensorProto.DataType.UINT16:return"uint16";case qe.onnx.TensorProto.DataType.INT32:return"int32";case qe.onnx.TensorProto.DataType.UINT32:return"uint32";case qe.onnx.TensorProto.DataType.FLOAT:return"float32";case qe.onnx.TensorProto.DataType.DOUBLE:return"float64";case qe.onnx.TensorProto.DataType.STRING:return"string";case qe.onnx.TensorProto.DataType.INT64:return"int32";case qe.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw new Error(`unsupported data type: ${qe.onnx.TensorProto.DataType[e]}`)}}static tensorDataTypeStringToEnum(e){switch(e){case"int8":return qe.onnx.TensorProto.DataType.INT8;case"uint8":return qe.onnx.TensorProto.DataType.UINT8;case"bool":return qe.onnx.TensorProto.DataType.BOOL;case"int16":return qe.onnx.TensorProto.DataType.INT16;case"uint16":return qe.onnx.TensorProto.DataType.UINT16;case"int32":return qe.onnx.TensorProto.DataType.INT32;case"uint32":return qe.onnx.TensorProto.DataType.UINT32;case"float32":return qe.onnx.TensorProto.DataType.FLOAT;case"float64":return qe.onnx.TensorProto.DataType.DOUBLE;case"string":return qe.onnx.TensorProto.DataType.STRING;case"int64":return qe.onnx.TensorProto.DataType.INT64;case"uint64":return qe.onnx.TensorProto.DataType.UINT64;default:throw new Error(`unsupported data type: ${e}`)}}static tensorDimsFromProto(e){return e.map(r=>sn.isLong(r)?r.toNumber():r)}static tensorValueTypeFromProto(e){return{tensorType:n.tensorDataTypeFromProto(e.elemType),shape:{dims:n.tensorDimsFromProto(e.shape.dim.map(r=>r.dimValue))}}}static tensorDimsFromORTFormat(e){let r=[];for(let t=0;t<e.dimsLength();t++)r.push(xt.longToNumber(e.dims(t)));return r}static tensorAttributesFromORTFormat(e){let r=[];for(let t=0;t<e.attributesLength();t++)r.push(e.attributes(t));return r}},xt=class{static longToNumber(e){return sn.isLong(e)?e.toNumber():typeof e=="bigint"?Number(e):e}static isLong(e){return sn.isLong(e)||typeof e=="bigint"}},ne=class n{static size(e){return n.getSizeFromDimensionRange(e,0,e.length)}static sizeFromDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,r,e.length)}static sizeToDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,0,r)}static getSizeFromDimensionRange(e,r,t){let o=1;for(let i=r;i<t;i++){if(e[i]<=0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");o*=e[i]}return o}static computeStrides(e){let r=e.length;if(r===0)return[];if(r===1)return[1];let t=new Array(r);t[r-1]=1,t[r-2]=e[r-1];for(let o=r-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static transpose(e){return e.slice().reverse()}static indicesToOffset(e,r,t){t===void 0&&(t=e.length);let o=0;for(let i=0;i<t;++i)o+=r[i]*e[i];return o}static offsetToIndices(e,r){let t=r.length;if(t===0)return[];if(t===1)return[e*r[0]];let o=new Array(r.length);for(let i=0;i<o.length-1;++i)o[i]=Math.floor(e/r[i]),e-=o[i]*r[i];return o[o.length-1]=e,o}static normalizeAxis(e,r){if(e<-r&&e>=r)throw new Error("unsupported axis for this operation.");return e<0?e+r:e}static normalizeAxes(e,r){return e.map(t=>this.normalizeAxis(t,r))}static incrementIndex(e,r,t){if(r.length===0||e.length===0)throw new Error("Index incrementing unsupported for scalar Tensor");if(t===void 0)t=r.length;else if(t<=0||t>r.length)throw new Error("Incorrect axis to increment on");for(let o=t-1;o>=0&&(e[o]++,!(e[o]<r[o]));--o)e[o]=0}static calculateReshapedDims(e,r){if(r.length===0){if(e.length===0||n.size(e)===1)return[];throw new Error("cannot reshape to a scalar Tensor")}let t=r.length,o=new Array(t),i=-1,a=1;for(let u=0;u<t;u++){if(r[u]<-1)throw new Error("a dimension in shape hints cannot be less than -1");if(r[u]===-1){if(i!==-1)throw new Error("at most one dimension in shape hints can be -1");i=u}else{if(r[u]===0){if(u>=e.length)throw new Error("the dimension with value zero exceeds the dimension size of the input tensor");o[u]=e[u]}else o[u]=r[u];a*=o[u]}}let s=n.size(e);if(i!==-1){if(s%a!==0)throw new Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${e}] Output shape: [${r}]`);o[i]=s/a}else if(a!==s)throw new Error("reshapedDims and originalDims don't have matching sizes");return o}static sortBasedOnPerm(e,r){return r?r.map(t=>e[t]):e.slice().reverse()}static padShape(e,r){let t=e.length;return e.map((o,i)=>o+r[i]+r[i+t])}static areEqual(e,r){return e.length!==r.length?!1:e.every((t,o)=>t===r[o])}static validateDimsAndCalcSize(e){if(e.length>6)throw new TypeError("Only rank 0 to 6 is supported for tensor shape.");let r=1;for(let t of e){if(!Number.isInteger(t))throw new TypeError(`Invalid shape: ${t} is not an integer`);if(t<0||t>2147483647)throw new TypeError(`Invalid shape: length ${t} is not allowed`);r*=t}return r}static flattenShape(e,r){r<0&&(r+=e.length);let t=e.reduce((a,s)=>a*s,1),o=e.slice(r).reduce((a,s)=>a*s,1);return[t/o,o]}static squeezeShape(e,r){let t=new Array;r=n.normalizeAxes(r,e.length);for(let o=0;o<e.length;o++){let i=r.indexOf(o)>=0;if(i&&e[o]!==1)throw new Error("squeeze an axis of size different than 1");(r.length===0&&e[o]>1||r.length>0&&!i)&&t.push(e[o])}return t}static unsqueezeShape(e,r){let t=new Array(e.length+r.length);t.fill(0);for(let i=0;i<r.length;i++){let a=n.normalizeAxis(r[i],t.length);if(a>=t.length)throw new Error("'axes' has an out of range axis");if(t[a]!==0)throw new Error("'axes' has a duplicate axis");t[a]=1}let o=0;for(let i=0;i<t.length;i++)t[i]===0&&(t[i]=e[o++]);if(o!==e.length)throw new Error("the unsqueezed dimension could not be established");return t}},Oo=class n{static splitShape(e,r,t,o){if(t.length===0){if(!o)throw new Error("need to know number of outputs when the 'split' attribute is not specified");n.determineSplit(e[r],o,t)}let i=[],a=[0];for(let s=0;s<t.length;++s){s!==0&&a.push(a[s-1]+t[s-1]);let u=e.slice();u[r]=t[s],i.push(u)}return[i,a]}static determineSplit(e,r,t){if(e%r!==0)throw new Error("cannot split tensor to equal sized parts");for(let o=0;o<r;++o)t.push(e/r)}},On=class n{static adjustPoolAttributes(e,r,t,o,i,a){if(!e&&t.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let s=0;s<r.length-2;s++)s>=t.length?t.push(r[s+2]):t[s]=r[s+2];for(let s=0;s<t.length;s++)if(s<o.length){if(o[s]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let s=0;s<t.length;s++)if(s<i.length){if(i[s]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let s=0;s<t.length*2;s++)if(s<a.length){if(a[s]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let s=0;s<t.length;s++){if(t[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[s]>=t[s]||a[s+t.length]>=t[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,r,t,o,i,a){if(a){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let s=0;s<e.length-2;s++)n.adjustPadAndReturnShape(e[s+2],r[s],t[s],o[s],i,s,s+e.length-2,a)}}static computePoolOutputShape(e,r,t,o,i,a,s){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return n.computeShapeHelper(e,r,u,t,o,i,a,s),u}static computeConvOutputShape(e,r,t,o,i,a,s){if(e.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],r[0]];return n.computeShapeHelper(!1,e,u,t,o,i,a,s),u}static computeShapeHelper(e,r,t,o,i,a,s,u){if(e)for(let c=0;c<r.length-2;c++)t.push(1);else for(let c=0;c<r.length-2;c++)t.push(n.adjustPadAndReturnShape(r[c+2],o[c],i[c],a[c],s,c,c+r.length-2,u))}static adjustPadAndReturnShape(e,r,t,o,i,a,s,u){let c=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[a]=0,i[s]=0,Math.floor((e-c)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let f=((e+r-1)/r-1)*r+o-e;return i[a]=Math.floor(u==="SAME_LOWER"?(f+1)/2:f/2),i[s]=f-i[a],Math.floor((e+f-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[a]+i[s]-c)/r+1)}},Pn=-34028234663852886e22,En=34028234663852886e22});function oA(n){switch(n){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw new Error(`cannot calculate sizeof() on type ${n}`)}}function cm(n){switch(n){case $e.onnx.TensorProto.DataType.UINT8:case $e.onnx.TensorProto.DataType.INT8:case $e.onnx.TensorProto.DataType.BOOL:return 1;case $e.onnx.TensorProto.DataType.UINT16:case $e.onnx.TensorProto.DataType.INT16:return 2;case $e.onnx.TensorProto.DataType.FLOAT:case $e.onnx.TensorProto.DataType.INT32:case $e.onnx.TensorProto.DataType.UINT32:return 4;case $e.onnx.TensorProto.DataType.INT64:case $e.onnx.TensorProto.DataType.DOUBLE:case $e.onnx.TensorProto.DataType.UINT64:return 8;default:throw new Error(`cannot calculate sizeof() on type ${$e.onnx.TensorProto.DataType[n]}`)}}function iA(n,e){return new(fm(e))(n)}function fm(n){switch(n){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw new Error("unspecified error")}}function gl(n,e){if(e===$e.onnx.TensorProto.DataType.INT64||e===To.TensorDataType.INT64){if(n.greaterThanOrEqual(2147483648)||n.lessThan(-2147483648))throw new TypeError("int64 is not supported")}else if(e===$e.onnx.TensorProto.DataType.UINT32||e===To.TensorDataType.UINT32||e===$e.onnx.TensorProto.DataType.UINT64||e===To.TensorDataType.UINT64){if(n.greaterThanOrEqual(4294967296)||n.lessThan(0))throw new TypeError("uint64 is not supported")}else throw new TypeError(`not a LONG type: ${$e.onnx.TensorProto.DataType[e]}`);return n.toNumber()}function dm(n,e,r){switch(e){case $e.onnx.TensorProto.DataType.BOOL:case $e.onnx.TensorProto.DataType.UINT8:return n.getUint8(r);case $e.onnx.TensorProto.DataType.INT8:return n.getInt8(r);case $e.onnx.TensorProto.DataType.UINT16:return n.getUint16(r,!0);case $e.onnx.TensorProto.DataType.INT16:return n.getInt16(r,!0);case $e.onnx.TensorProto.DataType.FLOAT:return n.getFloat32(r,!0);case $e.onnx.TensorProto.DataType.INT32:return n.getInt32(r,!0);case $e.onnx.TensorProto.DataType.UINT32:return n.getUint32(r,!0);case $e.onnx.TensorProto.DataType.INT64:return gl(sn.fromBits(n.getUint32(r,!0),n.getUint32(r+4,!0),!1),e);case $e.onnx.TensorProto.DataType.DOUBLE:return n.getFloat64(r,!0);case $e.onnx.TensorProto.DataType.UINT64:return gl(sn.fromBits(n.getUint32(r,!0),n.getUint32(r+4,!0),!0),e);default:throw new Error(`cannot read from DataView for type ${$e.onnx.TensorProto.DataType[e]}`)}}var pm,$e,ot,Cn=k(()=>{"use strict";pm=Te(Pf());zs();Io();$e=Te(Xn());Me();ot=class n{constructor(e,r,t,o,i,a=pm.Guid.create()){this.dims=e;this.type=r;this.dataProvider=t;this.asyncDataProvider=o;this.cache=i;this.dataId=a;this.size=ne.validateDimsAndCalcSize(e);let s=this.size,u=t===void 0&&o===void 0&&i===void 0;if(i!==void 0&&i.length!==s)throw new RangeError("Input dims doesn't match data length.");if(r==="string"){if(i!==void 0&&(!Array.isArray(i)||!i.every(c=>typeof c=="string")))throw new TypeError("cache should be a string array");u&&(this.cache=new Array(s))}else{if(i!==void 0){let c=fm(r);if(!(i instanceof c))throw new TypeError(`cache should be type ${c.name}`)}if(u){let c=new ArrayBuffer(s*oA(r));this.cache=iA(c,r)}}}get data(){if(this.cache===void 0){let e=this.dataProvider(this.dataId);if(e.length!==this.size)throw new Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=e}return this.cache}get stringData(){if(this.type!=="string")throw new TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw new TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw new TypeError("data type is not float (float32, float64)")}}get numberData(){if(this.type!=="string")return this.data;throw new TypeError("type cannot be non-number (string)")}get(e){return this.data[ne.indicesToOffset(e,this.strides)]}set(e,r){this.data[ne.indicesToOffset(e,this.strides)]=r}async getData(){return this.cache===void 0&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=ne.computeStrides(this.dims)),this._strides}static fromProto(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let r=pt.tensorDataTypeFromProto(e.dataType),t=pt.tensorDimsFromProto(e.dims),o=new n(t,r);if(r==="string")e.stringData.forEach((i,a)=>{o.data[a]=Po(i)});else if(e.rawData&&typeof e.rawData.byteLength=="number"&&e.rawData.byteLength>0){let i=o.data,a=new DataView(e.rawData.buffer,e.rawData.byteOffset,e.rawData.byteLength),s=cm(e.dataType),u=e.rawData.byteLength/s;if(e.rawData.byteLength%s!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let c=0;c<u;c++){let d=dm(a,e.dataType,c*s);i[c]=d}}else{let i;switch(e.dataType){case $e.onnx.TensorProto.DataType.FLOAT:i=e.floatData;break;case $e.onnx.TensorProto.DataType.INT32:case $e.onnx.TensorProto.DataType.INT16:case $e.onnx.TensorProto.DataType.UINT16:case $e.onnx.TensorProto.DataType.INT8:case $e.onnx.TensorProto.DataType.UINT8:case $e.onnx.TensorProto.DataType.BOOL:i=e.int32Data;break;case $e.onnx.TensorProto.DataType.INT64:i=e.int64Data;break;case $e.onnx.TensorProto.DataType.DOUBLE:i=e.doubleData;break;case $e.onnx.TensorProto.DataType.UINT32:case $e.onnx.TensorProto.DataType.UINT64:i=e.uint64Data;break;default:throw new Error("unspecific error")}if(i==null)throw new Error("failed to populate data from a tensorproto value");let a=o.data;if(a.length!==i.length)throw new Error("array length mismatch");for(let s=0;s<i.length;s++){let u=i[s];sn.isLong(u)?a[s]=gl(u,e.dataType):a[s]=u}}return o}static fromData(e,r,t){return new n(r,t,void 0,void 0,e)}static fromOrtTensor(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let r=pt.tensorDimsFromORTFormat(e),t=pt.tensorDataTypeFromProto(e.dataType()),o=new n(r,t);if(t==="string")for(let i=0;i<e.stringDataLength();i++)o.data[i]=e.stringData(i);else if(e.rawDataArray()&&typeof e.rawDataLength()=="number"&&e.rawDataLength()>0){let i=o.data,a=new DataView(e.rawDataArray().buffer,e.rawDataArray().byteOffset,e.rawDataLength()),s=cm(e.dataType()),u=e.rawDataLength()/s;if(e.rawDataLength()%s!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let c=0;c<u;c++){let d=dm(a,e.dataType(),c*s);i[c]=d}}return o}}});function se(n){return n===1?aA:sA}function hm(n){let e=se(n);return`${e.version}
      precision highp float;
      ${e.attribute} vec3 position;
      ${e.attribute} vec2 textureCoord;

      ${e.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function mm(n){let e=se(n);return`${e.version}
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

    `}function gm(n,e){let r=se(n);return`
  void main() {
    int indices[${e}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${r.output} = result;
  }
  `}var aA,sA,Ze=k(()=>{"use strict";aA={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},sA={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}});var Pe=k(()=>{"use strict"});async function bl(n,e=t=>0,r){return new Promise((t,o)=>{let i=0,a=()=>{if(n()){t();return}i++;let s=e(i);if(r!=null&&i>=r){o();return}setTimeout(a,s)};a()})}function Li(n){return Zn(typeof n<"u"&&n.length!==0,()=>"empty string found for sampler name"),"get"+n.charAt(0).toUpperCase()+n.slice(1)}function bm(n){return Zn(typeof n<"u"&&n.length!==0,()=>"empty string found for sampler name"),"get"+n.charAt(0).toUpperCase()+n.slice(1)+"AtOutCoords"}function Jn(n,e){let r=JSON.parse(JSON.stringify(n));return r=e,r}function Yn(n,e){return e.map(r=>n[r]).join(", ")}function gt(n){if(n<=1)return"int";if(n===2)return"ivec2";if(n===3)return"ivec3";if(n===4)return"ivec4";if(n===5)return"ivec5";if(n===6)return"ivec6";throw Error(`GPU for rank ${n} is not yet supported`)}function jt(n=6){return["x","y","z","w","u","v"].slice(0,n)}var Lr=k(()=>{"use strict";Me()});function uA(n,e){return jt(e).map(r=>`${n}.${r}`)}function Qn(n,e){return e===1?[n]:uA(n,e)}function Rr(){return`
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
  `}var Dn=k(()=>{"use strict";Lr()});function cA(n,e,r){if(n===0)return"false";if(n===1)return`rc > ${e[0]}`;let t="";for(let o=n-2;o<n;o++)t+=`${r[o]} >= ${e[o-n+2]}`,o<n-1&&(t+="||");return t}function dA(n,e){let r=n.length;if(r===0)return"getA(), 0, 0, 0";if(r===1)return`getA(rc),
            rc + 1 >= ${n[0]} ? 0. : getA(rc + 1),
            0, 0`;let t="r, c",o="r, cp1",i="rp1, c",a="rp1, cp1",s="";if(r>2)for(let u=0;u<r-2;++u)s=s+`${e[u]},`;return`getA(${s}${t}),
          rEdge ? 0. : getA(${s}${i}),
          cEdge ? 0. : getA(${s}${o}),
          rEdge || cEdge ? 0. : getA(${s}${a})`}function pA(n,e,r,t){return n===0||n===1?"":`
    int r = ${e[n-2]};
    int c = ${e[n-1]};
    int rp1 = ${e[n-2]} + 1;
    int cp1 = ${e[n-1]} + 1;
    bool rEdge = rp1 >= ${t};
    bool cEdge = cp1 >= ${r};
    `}var ym,lA,_m,vm=k(()=>{"use strict";Ze();Pe();Lr();Dn();ym={name:"pack",inputNames:["A"],inputTypes:[1]},lA=(n,e)=>{let r=se(n.session.backend.glContext.version),t=e.dims,o=t.length,i=e.dims.length,a=gt(i),s=Qn("rc",i),u=pA(i,s,t[t.length-2],t[t.length-1]),c;o===0?c=[1,1]:o===1?c=[t[0],1]:c=[t[i-1],t[i-2]];let d=cA(i,c,s),f=dA(t,s),h=`
        void main() {
          ${a} rc = getOutputCoords();

          if(${d}) {
            ${r.output} = vec4(0);
          } else {
            ${u}

            ${r.output} = vec4(${f});
          }
        }
      `;return{...ym,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:2},shaderSource:h}},_m=(n,e)=>({...ym,get:()=>lA(n,e)})});function yl(n){if(n.length===0)return[1,1,1];let e=1;for(let r=0;r<n.length-2;++r)e*=n[r];return[e,n.length>1?n[n.length-2]:1,n[n.length-1]]}function wm(n,e){let r=!1;return n.length===0||e.length===0?r=!0:n.length<2||e.length<2?r=n[n.length-1]===e[e.length-1]:r=n[n.length-1]===e[e.length-1]&&n[n.length-2]===e[e.length-2],r}function mA(n){let e=ne.computeStrides(n),r=["b","r","c"],t="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${e.map((i,a)=>{let s=`int ${r[a]} = ${t} / ${i}`,u=a===e.length-1?`int ${r[a+1]} = ${t} - ${r[a]} * ${i}`:`index -= ${r[a]} * ${i}`;return`${s}; ${u};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function gA(n){let e=ne.computeStrides(n);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${e[0]} + coords.z * ${e[1]} + coords.y;
  }
`}var fA,hA,xm,Tm=k(()=>{"use strict";Me();Ze();Pe();Dn();fA=n=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${n}`}),hA=(n,e,r,t)=>{let o=e.dims,i=t,a="";for(let c=0;c<4;c++){let d="";switch(c){case 0:d="outputCoords = rc;";break;case 1:d="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:d="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:d="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw new Error}a+=`
        ${d}
        ${c>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${c}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${c>0?"}":""}
      `}let s=se(n.session.backend.glContext.version),u=`
      ${mA(o)}
      ${gA(i)}
      ${Rr()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${i[2]};
        int cols = ${i[1]};

        ${a}
        ${s.output} = result;
      }
    `;return{...r,output:{dims:i,type:e.type,textureType:2},shaderSource:u,hasMain:!0}},xm=(n,e,r)=>{let t=fA(r);return{...t,get:()=>hA(n,e,t,r)}}});var _l,Im=k(()=>{"use strict";Ze();Pe();_l=(n,e)=>{let r=e.shape,t=se(n.session.backend.glContext.version),o=`
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
    }`,i={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:r,type:e.tensor.type,textureType:3},shaderSource:o,hasMain:!0};return n.executeProgram(i,[e.tensor])}});function yA(n,e){if(n===1)return"rc";let r="";for(let t=0;t<n;t++)r+=e[t],t<n-1&&(r+=",");return r}var Sm,bA,$m,Am=k(()=>{"use strict";Ze();Pe();Lr();Dn();Sm={name:"unpack",inputNames:["A"],inputTypes:[2]},bA=(n,e)=>{let r=e.dims.length,t=Qn("rc",r),o=t.slice(-2),i=gt(r),a=Rr(),u=e.dims.length===0?"":yA(r,t),c=r<=1?"rc":`vec2(${o.join(",")})`,d=se(n.session.backend.glContext.version),f=`
    ${a}
    void main() {
      ${i} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${u});

       ${d.output} = vec4(getChannel(packedInput, ${c}), 0, 0, 0);
     }
   `;return{...Sm,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:f}},$m=(n,e)=>({...Sm,get:()=>bA(n,e)})});var Ri,Eo,zi,Co=k(()=>{"use strict";Ct();Ri=class{constructor(e,r=1){if(r===1)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=r;else if(r===4)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=r;else throw new Error(`Invalid number of channels: ${r}`)}encode(e,r){let t,o;return e.constructor!==Float32Array&&(Be.warning("Encoder","data was not of type Float32; creating new Float32Array"),o=new Float32Array(e)),r*this.channelSize>e.length?(Be.warning("Encoder","Source data too small. Allocating larger array"),o=e,t=this.allocate(r*this.channelSize),o.forEach((i,a)=>t[a]=i)):(o=e,t=o),t}allocate(e){return new Float32Array(e*4)}decode(e,r){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,r):e.subarray(0,r)}},Eo=class{constructor(e,r=1,t){if(r!==1&&r!==4)throw new Error(`Invalid number of channels: ${r}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=r,this.textureType=t||e.FLOAT}encode(e,r){let t=e;return this.channelSize===1&&(Be.verbose("Encoder","Exploding into a larger array"),t=this.allocate(r),e.forEach((o,i)=>t[i*4]=o)),t}allocate(e){return new Float32Array(e*4)}decode(e,r){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,r):e.subarray(0,r)}},zi=class{constructor(e,r=1){this.channelSize=4;if(r===1)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=r;else if(r===4)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=r;else throw new Error(`Invalid number of channels: ${r}`)}encode(e,r){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,r){if(e instanceof Uint8Array)return e.subarray(0,r);throw new Error(`Invalid array type: ${e.constructor}`)}}});var Do,Om,vl,Pm=k(()=>{"use strict";Me();Pe();Do=(n,e,r)=>{let t=r===0||r===1?1:4,o=r===2,i=r===1||r===2,a=r===4?e.length-1:void 0,s=r===4?e.map((u,c)=>c===e.length-1?u*4:u):void 0;return vl(n,e,t,s,{isPacked:o,reverseWH:i,breakAxis:a})},Om=(n,e,r)=>{let t=Do(n,e,r);return[t.width,t.height]},vl=(n,e,r=1,t,o)=>{let i=!!(o&&o.isPacked),[a,s]=n.computeTextureWH(i&&t||e,o),u=e.length,c=e.slice(0);if(u===0&&(c=[1]),r===1)t=e;else if(i){if(r!==4)throw new Error("a packed texture must be 4-channel");t=e,u>0&&(c[u-1]=Math.ceil(c[u-1]/2)),u>1&&(c[u-2]=Math.ceil(c[u-2]/2))}else if(!t)throw new Error("Unpacked shape is needed when using channels > 1");return{width:a,height:s,channels:r,isPacked:i,shape:c,strides:ne.computeStrides(c),unpackedShape:t,reversedWH:o&&o.reverseWH}}});var vA,Mi,Cm=k(()=>{"use strict";Ct();Cn();Me();vm();Tm();Im();Am();Co();Pm();Pe();vA=(n,e)=>{let r=e.map(o=>`${o.unpackedShape.join(",")};${o.width}x${o.height}`).join("_"),t=n.name;return n.cacheHint&&(t+="["+n.cacheHint+"]"),t+=":"+r,t},Mi=class{constructor(e){this.session=e;this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,r){return Om(this.session.layoutStrategy,e,r)}executeProgram(e,r){if(r.length<e.inputNames.length)throw new Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw new Error("input names size does not match input types");let t=[];for(let c=0;c<e.inputNames.length;++c)t[c]=this.getOrCreateTextureData(r[c],e.inputTypes[c]);let o=vA(e,t),i=this.session.programManager.getArtifact(o),a=i?i.programInfo:typeof e.get=="function"?e.get():e,s=Do(this.session.layoutStrategy,a.output.dims,a.output.textureType),u=this.createTextureData(s,a.output.type);return i||(i=this.session.programManager.build(a,t,u),this.session.programManager.setArtifact(o,i)),this.runProgram(i,t,u),u}run(e,r){return this.executeProgram(e,r).tensor}runProgram(e,r,t){for(let o=0;o<r.length;++o)if(!!r[o].isPacked!=(e.programInfo.inputTypes[o]===2))throw new Error(`input[${o}] property packed inconsistent`);if(!!t.isPacked!=(e.programInfo.output.textureType===2))throw new Error("output property packed inconsistent");this.session.programManager.run(e,r,t)}getOrCreateTextureData(e,r){let t=this.getTextureData(e.dataId,r===2);if(!t&&(t=this.getTextureData(e.dataId,r!==2),t))return r===2?this.pack(t):this.unpack(t);if(!t){let o=Do(this.session.layoutStrategy,e.dims,r);if(r===4){let s=e.dims;if(s.length===4){let u=[s[0],Math.ceil(s[1]*s[2]*s[3]/4)],c=Do(this.session.layoutStrategy,u,r),d=e.numberData;if(s[1]*s[2]*s[3]%4!==0){let f=s[0],h=s[1]*s[2]*s[3],b=Math.ceil(h*1/4)*4,y=f*b;d=new Float32Array(y);for(let v=0;v<f;++v){let T=v*h,x=v*b+v%1*h;d.set(e.numberData.subarray(T,T+h),x)}}return this.createTextureData(c,e.type,d,e,1)}}if(r===2){let i=vl(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),a=this.createTextureData(i,e.type,e.numberData,e,1);t=this.pack(a)}else t=this.createTextureData(o,e.type,e.numberData,e,1)}return t}createTextureDataFromLayoutBindTensor(e,r,t,o){return this.createTextureData(e,r,t,o,1)}createTextureData(e,r,t,o,i){Be.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let a=this.session.textureManager.createTextureFromLayout(r,e,t,i);return this.createTextureDataFromTexture(e,r,a,o)}reshapeUnpacked(e,r){let t=this.getOrCreateTextureData(e,0),o={channels:t.channels,height:t.height,width:t.width,shape:r.length!==0?r:[1],strides:ne.computeStrides(r),unpackedShape:r};return this.createTextureDataFromTexture(o,e.type,t.texture).tensor}reshapePacked(e,r){let t=this.getOrCreateTextureData(e,2);if(wm(e.dims,r)){let c={channels:t.channels,height:t.height,width:t.width,shape:r.length!==0?r:[1],strides:ne.computeStrides(r),unpackedShape:r,isPacked:!0};return this.createTextureDataFromTexture(c,e.type,t.texture).tensor}let o=yl(e.dims),i=yl(r),a=this.reshapePacked(e,o),s=this.run(xm(this,a,i),[a]);return this.reshapePacked(s,r)}cast(e,r){let t=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(t,r,t.texture).tensor}createTextureDataFromTexture(e,r,t,o,i){let a={...e,tensor:o||new ot(e.unpackedShape,r,s=>this.readTexture(a),async s=>this.readTextureAsync(a),void 0,i),texture:t};return this.setTextureData(a.tensor.dataId,a,e.isPacked),a}getTextureData(e,r=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,r):r?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,r,t=!1){this.session.isInitializer(e)?this.session.setTextureData(e,r,t):(t?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,r)}isTextureLayoutCached(e,r=!1){return!!this.getTextureData(e.dataId,r)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(_l(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(_l(this,e))}pack(e){return this.executeProgram(_m(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram($m(this,e.tensor),[e.tensor])}}});var xl,Se,ct=k(()=>{"use strict";xl=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},Se=n=>new xl(n)});var Dm,km,Nm,xA,wA,Lm=k(()=>{"use strict";ct();Ze();Pe();Dm={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},km=(n,e,r)=>(wA(e),[n.run({...Dm,cacheHint:r.cacheKey,get:()=>xA(n,e,r)},e)]),Nm=n=>{let e=n.attributes.getFloat("epsilon",1e-5),r=n.attributes.getFloat("momentum",.9),t=n.attributes.getInt("spatial",1);return Se({epsilon:e,momentum:r,spatial:t})},xA=(n,e,r)=>{let t=se(n.session.backend.glContext.version),o=e[0].dims.length,[i,a]=n.calculateTextureWidthAndHeight(e[1].dims,0),s=`
  float process(int[${o}] indices) {
    vec2 position = offsetToCoords(indices[1], ${i}, ${a});
    float scale = getColorAsFloat(${t.texture2D}(Scale, position));
    float mean = getColorAsFloat(${t.texture2D}(Mean, position));
    float variance = getColorAsFloat(${t.texture2D}(Variance, position));
    float b = getColorAsFloat(${t.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${r.epsilon})) ) + b;
  }`;return{...Dm,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:s}},wA=n=>{if(!n||n.length!==5)throw new Error("BatchNormalization requires 5 inputs.");let e=n[0],r=n[1],t=n[2],o=n[3],i=n[4];if(e.dims.length<3||r.dims.length!==1||t.dims.length!==1||o.dims.length!==1||i.dims.length!==1)throw new Error("invalid input shape.");if(r.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1]||o.dims[0]!==e.dims[1]||i.dims[0]!==e.dims[1])throw new Error("invalid input shape.");if(e.type!=="float32"&&e.type!=="float64"||r.type!=="float32"&&r.type!=="float64"||t.type!=="float32"&&t.type!=="float64"||o.type!=="float32"&&o.type!=="float64"||i.type!=="float32"&&i.type!=="float64")throw new Error("invalid input tensor types.")}});var Bi,zt,Z,ko,Fi,Zr=k(()=>{"use strict";Bi=class{constructor(e,r,t,o){this.glContext=e;this.programInfo=r;this.inputTextureLayouts=t;this.outputTextureLayout=o}},zt=class{constructor(e){this.context=e}},Z=class{constructor(e,r){this.routineBody=e;this.dependencies=r}},ko=class{constructor(e,r,t){this.name=e;t?this.dependencies=t:this.dependencies=[],r&&(this.routineBody=r)}addDependency(e){e&&this.dependencies.push(e)}},Fi=class{static returnOrderedNodes(e){if(!e||e.length===0)return[];if(e.length===1)return e;let r=new Set,t=new Set,o=new Array;return this.createOrderedNodes(e,r,t,o),o}static createOrderedNodes(e,r,t,o){for(let i=0;i<e.length;++i)this.dfsTraverse(e[i],r,t,o)}static dfsTraverse(e,r,t,o){if(!e||t.has(e.name))return;if(r.has(e.name))throw new Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");r.add(e.name);let i=e.dependencies;if(i&&i.length>0)for(let a=0;a<i.length;++a)this.dfsTraverse(i[a],r,t,o);o.push(e),t.add(e.name),r.delete(e.name)}}});function IA(){let n="add_";return{body:`
  float ${n}(float a, float b) {
    return a + b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:n,type:0}}function SA(){let n="div_";return{body:`
  float ${n}(float a, float b) {
    return a / b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:n,type:0}}function $A(){let n="mul_";return{body:`
  float ${n}(float a, float b) {
    return a * b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:n,type:0}}function AA(){let n="sub_";return{body:`
  float ${n}(float a, float b) {
    return a - b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:n,type:0}}function OA(){let n="equal_";return{body:`
  float ${n}(float a, float b) {
    return float(a == b);
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:n,type:0}}function PA(){let n="greater_";return{body:`
  float ${n}(float a, float b) {
    return float(a > b);
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:n,type:0}}function EA(){let n="less_";return{body:`
  float ${n}(float a, float b) {
    return float(a < b);
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:n,type:0}}function CA(){let n="and_";return{body:`
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
  `,name:n,type:0}}function DA(){let n="or_";return{body:`
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
  `,name:n,type:0}}function kA(){let n="xor_";return{body:`
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
  `,name:n,type:0}}function NA(){return RA("pow")}function LA(){let n="prelu_";return{body:`
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
  `,name:n,type:0}}function RA(n){let e=`${n}_`;return{body:`
  float ${e}(float a, float b) {
    return ${n}(a, b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return ${n}(v1, v2);
  }
  `,name:e,type:0}}var Mt,zA,Rm,zm,Mm,Bm,Fm,Vm,Gm,Um,Wm,Hm,qm,jm,Km=k(()=>{"use strict";Me();Zr();Ze();Pe();Mt=(n,e,r,t=e[0].type,o)=>{let i=n.session.pack?2:0;return{name:r.name,inputNames:["A","B"],inputTypes:[i,i],cacheHint:o,get:()=>zA(n,e,r,t)}},zA=(n,e,r,t=e[0].type)=>{let o=n.session.pack?2:0,i=!ne.areEqual(e[0].dims,e[1].dims),a=e[0].dims,s=n.session.pack;if(i){let d=mt.calcShape(e[0].dims,e[1].dims,!1);if(!d)throw new Error("Can't perform binary op on the given tensors");a=d;let f=a.length,h=e[0].dims.length!==0?e[0].dims.length:1,b=e[1].dims.length!==0?e[1].dims.length:1,y=e[0].dims.length!==0?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",v=e[1].dims.length!==0?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",T=se(n.session.backend.glContext.version),x=s?`
      ${r.body}
      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();
        vec4 result = ${r.name}(a, b);
        ${T.output} = result;
      }`:`
      ${r.body}
      float process(int indices[${f}]) {
        int aindices[${h}];
        int bindices[${b}];
        ${y}
        ${v}
        return ${r.name}(_A(aindices), _B(bindices));
      }`;return{name:r.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:a,type:t,textureType:o},shaderSource:x,hasMain:s}}let u=se(n.session.backend.glContext.version),c=`
    ${r.body}
    void main() {
      vec4 v1 = ${u.texture2D}(A, TexCoords);
      vec4 v2 = ${u.texture2D}(B, TexCoords);
      vec4 result = ${r.name}(v1, v2);
      ${u.output} = result;
    }
    `;return{name:r.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:e[0].dims,type:t,textureType:o},shaderSource:c,hasMain:!0}},Rm=(n,e)=>[n.run(Mt(n,e,IA()),e)],zm=(n,e)=>[n.run(Mt(n,e,CA(),"bool"),e)],Mm=(n,e)=>[n.run(Mt(n,e,SA()),e)],Bm=(n,e)=>[n.run(Mt(n,e,OA(),"bool"),e)],Fm=(n,e)=>[n.run(Mt(n,e,PA(),"bool"),e)],Vm=(n,e)=>[n.run(Mt(n,e,EA(),"bool"),e)],Gm=(n,e)=>[n.run(Mt(n,e,$A()),e)],Um=(n,e)=>[n.run(Mt(n,e,DA(),"bool"),e)],Wm=(n,e)=>[n.run(Mt(n,e,NA()),e)],Hm=(n,e)=>[n.run(Mt(n,e,LA()),e)],qm=(n,e)=>[n.run(Mt(n,e,AA()),e)],jm=(n,e)=>[n.run(Mt(n,e,kA(),"bool"),e)]});var Xm,Zm,BA,Jm=k(()=>{"use strict";Me();Xm=(n,e,r)=>(BA(e),[n.cast(e[0],r)]),Zm=n=>pt.tensorDataTypeFromProto(n.attributes.getInt("to")),BA=n=>{if(!n||n.length!==1)throw new Error("Cast requires 1 input.");if(n[0].type==="string")throw new Error("Invalid input type.")}});var FA,VA,Ym,Vi,Qm=k(()=>{"use strict";Ze();Pe();Lr();Dn();FA=(n,e)=>({name:"Concat (packed)",inputNames:Array.from({length:n},(r,t)=>`X${t}`),inputTypes:Array(n).fill(2),cacheHint:e}),VA=(n,e,r,t)=>{let o=r[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let P=1;P<r.length;P++){let C=r[P].dims.slice();for(let R=0;R<o.length;R++)if(R===t)i[t]+=C[R];else if(o[R]!==C[R])throw new Error("non concat dimensions must match")}let a=i.length,s=Qn("coords",a),u=gt(a),c=Rr(),d=r.map(P=>P.dims),f=jt(a),h=new Array(d.length-1);h[0]=d[0][t];for(let P=1;P<h.length;P++)h[P]=h[P-1]+d[P][t];let b=f[t],y=f.slice(-2),v=f.join(),T=`if (${b} < ${h[0]}) {
        return getChannel(
            getX0(${v}), vec2(${y.join()}));
        }`;for(let P=1;P<h.length;P++){let C=h[P-1];T+=`
            if (${b} < ${h[P]}  && ${b} >= ${h[P-1]}) {
              return getChannel(
                getX${P}(${Vi(f,b,C)}),
                vec2(${Vi(y,b,C)}));
            }`}let x=h.length,w=h[h.length-1];T+=`
            return getChannel(
              getX${x}(${Vi(f,b,w)}),
              vec2(${Vi(y,b,w)}));`;let I=se(n.session.backend.glContext.version),A=`
          ${c}
          float getValue(${f.map(P=>"int "+P)}) {
            ${T}
          }

          void main() {
            ${u} coords = getOutputCoords();
            int lastDim = coords.${f[a-1]};
            coords.${f[a-1]} = coords.${f[a-2]};
            coords.${f[a-2]} = lastDim;

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
        `;return{...e,output:{dims:i,type:r[0].type,textureType:2},shaderSource:A,hasMain:!0}},Ym=(n,e,r)=>{let t=FA(e.length,r.cacheKey);return{...t,get:()=>VA(n,t,e,r.axis)}},Vi=(n,e,r)=>{let t=n.indexOf(e);return n.map((i,a)=>a===t?`${i} - ${r}`:i).join()}});var eg,GA,UA,WA,tg,HA,qA,jA,rg,KA,ng=k(()=>{"use strict";ct();Pe();Qm();eg=(n,e,r)=>(KA(e),n.session.pack&&e[0].dims.length>1?[n.run(Ym(n,e,r),e)]:[n.run(WA(n,e,r),e)]),GA=(n,e)=>({name:"Concat",inputNames:Array.from({length:n},(r,t)=>`X${t}`),inputTypes:Array(n).fill(0),cacheHint:e}),UA=(n,e,r,t)=>{let o=r[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let b=1;b<r.length;b++){let y=r[b].dims.slice();for(let v=0;v<o.length;v++)if(v===t)i[t]+=y[v];else if(o[v]!==y[v])throw new Error("non concat dimensions must match")}let a=i.length,s=new Array(r.length),u=0;for(let b=0;b<s.length;++b)u+=r[b].dims[t],s[b]=u;let c="";r.length<5?c=tg(s):c=HA(s);let d=qA(r.length,a),f=jA(s),h=`
        ${d}
        ${f}
        ${c}
        float process(int indices[${a}]) {
          int textureIndex = getTextureWhereDataResides (indices[${t}]);

          if(textureIndex != 0) {
            indices[${t}] = indices[${t}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:h}},WA=(n,e,r)=>{let t=GA(e.length,r.cacheKey);return{...t,get:()=>UA(n,t,e,r.axis)}},tg=n=>`int getTextureWhereDataResides(int index) {
      ${n.map((r,t)=>`if(index<${r}) {return ${t};}
`).join("")}
    }`,HA=n=>tg(n),qA=(n,e)=>{let r=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${e}]) {`];for(let t=0;t<n;++t)t===0?r.push(`	if (textureIndex == ${t}) { return _X${t}(indices); }`):t===n-1?r.push(`	else { return _X${t}(indices); }`):r.push(`	else if (textureIndex == ${t}) { return _X${t}(indices); }`);return r.push("	}"),r.join(`
`)},jA=n=>{let e=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let r=0;r<n.length;++r)r===0?e.push(`	if (index == ${r}) { return ${n[r]}; }`):r===n.length-1?e.push(`	else { return ${n[r]}; }`):e.push(`	else if (index == ${r}) { return ${n[r]}; }`);return e.push("	}"),e.join(`
`)},rg=n=>Se({axis:n.attributes.getInt("axis")}),KA=n=>{if(!n||n.length<1)throw new Error("too few inputs");let e=n[0].type,r=n[0].dims.length;if(e==="string")throw new Error("string tensor is not supported yet");for(let t of n){if(t.type!==e)throw new Error("input tensors should be one type");if(t.dims.length!==r)throw new Error("input tensors should have the same shape")}}});function XA(){return Bt("abs")}function ZA(){return Bt("acos")}function JA(){return Bt("asin")}function YA(){return Bt("atan")}function QA(){return Bt("ceil")}function eO(){return Bt("cos")}function tO(n){let e="elu";return{body:`
  const float alpha = float(${n});

  float ${e}_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function rO(){return Bt("exp")}function nO(){return Bt("floor")}function wl(n,e){let r="clip";return{body:`
  const float min = float(${n});
  const float max = float(${e});

  float ${r}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${r}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:r,type:0}}function oO(){let n="indentity";return{body:`
  float ${n}_(float a) {
    return a;
  }
  vec4 ${n}_(vec4 v) {
    return v;
  }
  `,name:n,type:0}}function iO(n){let e="leakyRelu";return{body:`
  const float alpha = float(${n});

  float ${e}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function aO(){return Bt("log")}function sO(){let n="neg";return{body:`
  float ${n}_(float a) {
    return -a;
  }
  vec4 ${n}_(vec4 v) {
    return -v;
  }
  `,name:n,type:0}}function uO(){let n="not";return{body:`
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
  `,name:n,type:0}}function lO(){return Bt("sin")}function Tl(){let n="relu";return{body:`
  float ${n}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${n}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:n,type:0}}function Il(){let n="sigmoid";return{body:`
  float ${n}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${n}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:n,type:0}}function cO(){return Bt("sqrt")}function dO(){return Bt("tan")}function pO(){let n="tanh";return{body:`
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
  `,name:n,type:0}}function Bt(n){return{body:`
  float ${n}_(float a) {
    return ${n}(a);
  }
  vec4 ${n}_(vec4 v) {
    return ${n}(v);
  }
  `,name:n,type:0}}var fO,rt,og,ig,ag,sg,Sl,ug,lg,hO,cg,dg,pg,fg,hg,mg,$l,gg,bg,yg,_g,vg,xg,wg,Tg,Ig,Sg,$g,Al=k(()=>{"use strict";ct();Me();Zr();Ze();Pe();fO=(n,e,r,t)=>{let o=n.session.pack?2:0,i=se(n.session.backend.glContext.version);return{...e,output:{dims:r.dims,type:r.type,textureType:o},shaderSource:`
     ${t.body}
     void main() {
       vec4 v = ${i.texture2D}(A, TexCoords);
       v = ${t.name}_(v);
       ${i.output} = v;
     }
     `,hasMain:!0}},rt=(n,e,r,t)=>{let o=n.session.pack?2:0,i={name:r.name,inputTypes:[o],inputNames:["A"],cacheHint:t};return{...i,get:()=>fO(n,i,e,r)}},og=(n,e)=>[n.run(rt(n,e[0],XA()),e)],ig=(n,e)=>[n.run(rt(n,e[0],ZA()),e)],ag=(n,e)=>[n.run(rt(n,e[0],JA()),e)],sg=(n,e)=>[n.run(rt(n,e[0],YA()),e)],Sl=(n,e,r)=>[n.run(rt(n,e[0],wl(r.min,r.max),r.cacheKey),e)],ug=n=>Se({min:n.attributes.getFloat("min",Pn),max:n.attributes.getFloat("max",En)}),lg=(n,e)=>{let r=hO(n,e);return Sl(n,[e[0]],r)},hO=(n,e)=>{if(e.length>=3&&(!n.session.isInitializer(e[1].dataId)||!n.session.isInitializer(e[2].dataId)))throw new Error("dynamic clip attributes are not allowed");let r=e.length>=3?e[1].numberData[0]:Pn,t=e.length>=3?e[2].numberData[0]:En;return Se({min:r,max:t})},cg=(n,e)=>[n.run(rt(n,e[0],QA()),e)],dg=(n,e)=>[n.run(rt(n,e[0],eO()),e)],pg=(n,e,r)=>[n.run(rt(n,e[0],tO(r.alpha),r.cacheKey),e)],fg=n=>Se({alpha:n.attributes.getFloat("alpha",1)}),hg=(n,e)=>[n.run(rt(n,e[0],rO()),e)],mg=(n,e)=>[n.run(rt(n,e[0],nO()),e)],$l=(n,e)=>[n.run(rt(n,e[0],oO()),e)],gg=(n,e,r)=>[n.run(rt(n,e[0],iO(r.alpha),r.cacheKey),e)],bg=n=>Se({alpha:n.attributes.getFloat("alpha",.01)}),yg=(n,e)=>[n.run(rt(n,e[0],aO()),e)],_g=(n,e)=>[n.run(rt(n,e[0],sO()),e)],vg=(n,e)=>[n.run(rt(n,e[0],uO()),e)],xg=(n,e)=>[n.run(rt(n,e[0],Tl()),e)],wg=(n,e)=>[n.run(rt(n,e[0],Il()),e)],Tg=(n,e)=>[n.run(rt(n,e[0],lO()),e)],Ig=(n,e)=>[n.run(rt(n,e[0],cO()),e)],Sg=(n,e)=>[n.run(rt(n,e[0],dO()),e)],$g=(n,e)=>[n.run(rt(n,e[0],pO()),e)]});function zr(n){let e;switch(n.activation){case"Relu":e=Tl();break;case"Sigmoid":e=Il();break;case"Clip":e=wl(n.clipMin,n.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let r=e.name,t=e.body,o=`value = ${r}_(value);`;return{activationFunction:t,applyActivation:o}}var eo,kn=k(()=>{"use strict";Me();Al();eo=n=>{let e=n.getString("activation","");if(e==="Clip"){let[r,t]=n.getFloats("activation_params",[Pn,En]);return{activation:e,clipMax:t,clipMin:r,activationCacheKey:`${e}:${r},${t}`}}return{activation:e,activationCacheKey:e}}});var gO,bO,Ag,Og=k(()=>{"use strict";Ct();Ze();Pe();Gi();kn();gO=(n,e)=>({name:"GroupedConv",inputNames:n?["X","W","Bias"]:["X","W"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e}),bO=(n,e,r,t)=>{let i=e.length>2?"value += getBias(output_channel);":"",a=e[0].dims.slice(),s=e[1].dims.slice(),u=s[0]/t.group;Be.verbose("GroupedConv",`autpPad:${t.autoPad}, dilations:${t.dilations}, group:${t.group}, kernelShape:${t.kernelShape}, pads:${t.pads}, strides:${t.strides}`);let c=to(a,s,t.dilations,t.pads,t.strides),d=se(n.session.backend.glContext.version),{activationFunction:f,applyActivation:h}=zr(t),b=`
  const ivec2 strides = ivec2(${t.strides[0]}, ${t.strides[1]});
  const ivec2 pads = ivec2(${t.pads[0]}, ${t.pads[1]});
  ${f}
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
    ${d.output} = vec4(value, .0, .0, .0);
  }
`;return{...r,output:{dims:c,type:e[0].type,textureType:0},shaderSource:b,hasMain:!0}},Ag=(n,e,r)=>{let t=gO(e.length>2,r.cacheKey);return{...t,get:()=>bO(n,e,t,r)}}});var yO,_O,Pg,Eg=k(()=>{"use strict";Ze();Pe();Dn();yO=n=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:n}),_O=(n,e,r,t,o,i)=>{let a=r.dims,s=t.dims,u=2,c=3,d=o.length,f=[s[1]*s[2]*s[3],o[2]*o[3]],h=s[2]*s[3],b=Rr(),y=se(n.session.backend.glContext.version),v="";for(let x=0;x<=1;x++)for(let w=0;w<=1;w++)v+=`
            blockIndex = rc.x + ${w};
            pos = rc.y + ${x};

            if(blockIndex < ${f[1]} && pos < ${f[0]}) {
              offsetY = int(blockIndex / (${o[d-1]})) * ${i.strides[0]} -
                ${i.pads[0]};
              d0 = offsetY + ${i.dilations[0]} * (imod(pos, ${h}) / ${s[2]});

              if(d0 < ${a[u]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${o[d-1]}) * ${i.strides[1]} -
                  ${i.pads[1]};
                d1 = offsetX + ${i.dilations[1]} * imod(imod(pos, ${h}), ${s[2]});

                if(d1 < ${a[c]} && d1 >= 0) {

                  ch = int(float(pos)/ ${h}.);
                    innerDims = vec2(d0, d1);
                    result[${x*2+w}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;let T=`
      ${b}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${v}
          ${y.output} = result;
      }
            `;return{...e,output:{dims:f,type:r.type,textureType:2},shaderSource:T,hasMain:!0}},Pg=(n,e,r,t,o)=>{let i=yO(o.cacheKey);return{...i,get:()=>_O(n,i,e,r,t,o)}}});function xO(n,e,r){let t=e[0].dims,o=e[1].dims,i=mt.calcShape(t,o,!0);if(!i)throw new Error("Can't use matmul on the given tensors");let a=gt(i.length),s=jt(),{activationFunction:u,applyActivation:c}=zr(r),d=e.length>2,f=d?"value += getBiasForMatmul();":"",h=d?`${Pl(a,s,e[2].dims,i,!1)}`:"",b=i.length,y=t.length,v=o.length,T=t[t.length-1],x=`
    ${u}
    ${h}
    float process(int indices[${b}]) {
        int a[${y}];
        int b[${v}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${T}; ++k) {
            a[${y-1}] = k;
            b[${v-2}] = k;
            value += _A(a) * _B(b);
        }
        ${f}
        ${c}
        return value;
    }`;return{...n,output:{dims:i,type:e[0].type,textureType:0},shaderSource:x}}function Ol(n,e){let r=vO(n.length>2,e.activationCacheKey);return{...r,get:()=>xO(r,n,e)}}function Pl(n,e,r,t,o){let i="",a=r.length,s=t.length,u=s-a;s<2&&a>0?i="coords":i=r.map((v,T)=>`coords.${e[T+u]}`).join(", ");let d=mt.getBroadcastDims(r,t).map(v=>`coords.${e[v+u]} = 0;`).join(`
`),h=ne.size(r)===1,b="vec4(outputValue.xx, outputValue.yy)";return h&&(b="vec4(outputValue.x)"),o?`
vec4 getBiasForMatmul() {
  ${n} coords = getOutputCoords();
  ${d}
  vec4 outputValue = getBias(${i});
  return ${b};
}`:`
float getBiasForMatmul() {
  ${n} coords = getOutputCoords();
  ${d}
  return getBias(coords.x);
}`}var Cg,Dg,vO,wO,Ui=k(()=>{"use strict";Me();Pe();Lr();kn();El();Cg=(n,e,r)=>(wO(e),n.session.pack?[n.run(Wi(n,e,r),e)]:[n.run(Ol(e,r),e)]),Dg=n=>eo(n.attributes),vO=(n,e)=>({name:"MatMul",inputNames:n?["A","B","Bias"]:["A","B"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e});wO=n=>{if(!n||n.length!==2)throw new Error("MatMul requires 2 inputs.");if(n[0].dims[n[0].dims.length-1]!==n[1].dims[n[1].dims.length-2])throw new Error("shared dimension does not match.");if(n[0].type!=="float32"&&n[0].type!=="float64"||n[1].type!=="float32"&&n[1].type!=="float64")throw new Error("inputs should be float type");if(n[0].type!==n[1].type)throw new Error("inputs types should match")}});function SO(n,e,r,t){let o=[],i=[],a=r[0].dims,s=r[1].dims,u=a.length,c=s.length,d=t.length,f=d-u,h=d-c;o=a.map((I,A)=>`coords.${e[A+f]}`),o[u-1]="i*2",o.join(", "),i=s.map((I,A)=>`coords.${e[A+h]}`),i[c-2]="i*2",i.join(", ");let b=mt.getBroadcastDims(a,t),y=mt.getBroadcastDims(s,t),v=b.map(I=>`coords.${e[I+f]} = 0;`).join(`
`),T=y.map(I=>`coords.${e[I+h]} = 0;`).join(`
`),x=`int lastDim = coords.${e[d-1]};
  coords.${e[d-1]} = coords.${e[d-2]};
  coords.${e[d-2]} = lastDim;`;return`
vec4 getAAtOutCoordsMatmul(int i) {
  ${n} coords = getOutputCoords();
  ${x}
  ${v}
  vec4 outputValue = getA(${o});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${n} coords = getOutputCoords();
  ${x}
  ${T}
  vec4 outputValue = getB(${i});
  return outputValue;
}`}function $O(n,e){let r="";for(let t=0;t<e-2;t++)r+=`rc.${n[t]}, `;return r+=`rc.${n[e-2]}, i*2`,r}function AO(n,e){let r="";for(let t=0;t<e-2;t++)r+=`rc.${n[t]}, `;return r+=`i*2, rc.${n[e-1]}`,r}var TO,IO,Wi,El=k(()=>{"use strict";Me();Ze();Pe();Lr();kn();Ui();TO=(n,e)=>({name:"MatMul (packed)",inputNames:n?["A","B","Bias"]:["A","B"],inputTypes:n?[2,2,2]:[2,2],cacheHint:e}),IO=(n,e,r,t)=>{let o=r.length>2,i=o?"value += getBiasForMatmul();":"",a=r[0].dims,s=r[1].dims,u=mt.calcShape(a,s,!0),c=!ne.areEqual(r[0].dims,r[1].dims);if(!u)throw new Error("Can't use matmul on the given tensors");let d=a[a.length-1],f=Math.ceil(d/2),h=a.length,b=s.length,y=se(n.session.backend.glContext.version),v=gt(u.length),T=u.length,x=jt(),{activationFunction:w,applyActivation:I}=zr(t),A=o?`${Pl(v,x,r[2].dims,u,!0)}`:"",P=c?`${SO(v,x,r,u)}`:"",C=c?"getAAtOutCoordsMatmul(i)":`getA(${$O(x,h)})`,R=c?"getBAtOutCoordsMatmul(i)":`getB(${AO(x,b)})`,z=c?"":`${v} rc =
          getOutputCoords(); int lastDim = rc.${x[T-1]}; rc.${x[T-1]} =
          rc.${x[T-2]}; rc.${x[T-2]} = lastDim;
      `,V=`
            ${P}
            ${A}
            ${w}
            void main() {
              ${z}

              vec4 value = vec4(0);
              for (int i = 0; i < ${f}; i++) {
                vec4 a = ${C};
                vec4 b = ${R};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${i}
              ${I}
              ${y.output} = value;
            }`;return{...e,output:{dims:u,type:r[0].type,textureType:2},shaderSource:V,hasMain:!0}},Wi=(n,e,r)=>{let t=TO(e.length>2,r.activationCacheKey);return{...t,get:()=>IO(n,t,e,r)}}});var kg,Ng=k(()=>{"use strict";Gi();Eg();El();kg=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=to(t,o,r.dilations,r.pads,r.strides),a=n.run(Pg(n,e[0],e[1],i,r),[e[0]]),s=n.reshapePacked(e[1],[o[0],o[1]*o[2]*o[3]]),u=e.length===3?[s,a,e[2]]:[s,a],c=n.run(Wi(n,u,r),u);return n.reshapePacked(c,i)}});var OO,PO,Lg,Cl,Dl=k(()=>{"use strict";Pe();OO=n=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:n}),PO=(n,e,r,t,o,i)=>{let a=r.dims,s=t.dims,u=o.length,c=Cl(a,s,o,4),d=`
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
        `;return{...e,output:{dims:c,type:r.type,textureType:4},shaderSource:d}},Lg=(n,e,r,t,o)=>{let i=OO(o.cacheKey);return{...i,get:()=>PO(n,i,e,r,t,o)}},Cl=(n,e,r,t=4)=>[r[0],r[2],r[3],Math.ceil(n[1]*e[2]*e[3]/t)]});var EO,CO,Rg,zg=k(()=>{"use strict";Me();Ze();Pe();kn();Dl();EO=(n,e)=>({name:"ConvDotProduct",inputNames:n?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:n?[0,4,0]:[0,4],cacheKey:e.activationCacheKey}),CO=(n,e,r,t,o)=>{let i=r[0].dims,a=r[1].dims,s=[a[0],Math.ceil(i[1]*a[2]*a[3]/4)],u=Cl(i,a,t),[c,d]=n.calculateTextureWidthAndHeight(s,4),f=ne.computeStrides(u),[h,b]=n.calculateTextureWidthAndHeight(u,4),y=t.length,v=r.length<3?"0.0":"_B(b)",T=Math.ceil(i[1]*a[2]*a[3]/4),{activationFunction:x,applyActivation:w}=zr(o),I=se(n.session.backend.glContext.version),A=`
${x}
float process(int indices[${y}]) {
  int b[1];
  b[0] = indices[1];
  int im2col[4];
  im2col[0] = indices[0];
  im2col[1] = indices[2];
  im2col[2] = indices[3];
  int im2colOffset = im2col[0] * ${f[0]} + im2col[1] * ${f[1]} + im2col[2] * ${f[2]};
  int kernelOffset = indices[1] * ${s[1]};
  float value = ${v};
  for (int i = 0; i < ${T}; ++i) {
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${h}, ${b});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${c}, ${d});
    value += dot(${I.texture2D}(Im2Col, im2colCoords), ${I.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${w}
  return value;
}`;return{...e,output:{dims:t,type:r[0].type,textureType:0},shaderSource:A}},Rg=(n,e,r,t)=>{let o=EO(e.length>2,t);return{...o,get:()=>CO(n,o,e,r,t)}}});var to,kl,DO,kO,NO,LO,Nl,RO,Gi=k(()=>{"use strict";ct();Me();Og();Ng();zg();kn();Dl();Ui();to=(n,e,r,t,o)=>{let i=n[0],a=n.slice(2),s=a.length,u=e[0],d=e.slice(2).map((y,v)=>y+(y-1)*(r[v]-1)),h=a.map((y,v)=>y+t[v]+t[v+s]).map((y,v)=>Math.floor((y-d[v]+o[v])/o[v]));return[i,u].concat(...h)},kl=(n,e,r)=>(RO(e,r),DO(n,e,r)),DO=(n,e,r)=>{let t=LO(r,e),o=n.session.pack,i=t.kernelShape[0]===1&&t.kernelShape[1]===1;return t.group>1?[n.run(Ag(n,e,t),e)]:i&&o?[kO(n,e,t)]:o&&e[0].dims.length===4&&e[0].dims[0]===1&&!i?[kg(n,e,t)]:[NO(n,e,t)]},kO=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=to(t,o,r.dilations,r.pads,r.strides),a=n.reshapeUnpacked(e[0],[t[1],t[2]*t[3]]),s=n.reshapeUnpacked(e[1],[o[0],o[1]]),u=e.length>2?[s,a,e[2]]:[s,a],c=n.run(Ol(u,r),u);return n.reshapeUnpacked(c,i)},NO=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=to(t,o,r.dilations,r.pads,r.strides),a=n.run(Lg(n,e[0],e[1],i,r),[e[0]]),s=e.length===3?[a,e[1],e[2]]:[a,e[1]];return n.run(Rg(n,e,i,r),s)},LO=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0)for(let i=2;i<e[1].dims.length;++i)r.push(e[1].dims[i]);let t=n.pads.slice();On.adjustPadsBasedOnAutoPad(e[0].dims,n.strides,n.dilations,r,t,n.autoPad);let o=Object.assign({},n);return Object.assign(o,{kernelShape:r,pads:t,cacheKey:n.cacheKey}),o},Nl=n=>{let e=n.attributes,r=eo(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),a=e.getInts("kernel_shape",[]),s=e.getInts("pads",[0,0,0,0]),u=e.getInts("strides",[1,1]);return Se({autoPad:t,dilations:o,group:i,kernelShape:a,pads:s,strides:u,...r})},RO=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4||n[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let r=n[0].dims[1],t=n[1].dims[1]*e.group;if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(n.length===3&&(n[2].dims.length!==1||n[1].dims[0]!==n[2].dims[0]))throw new Error("invalid bias");let o=n[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(n[0].type!=="float32"||n[1].type!=="float32")throw new Error("Conv input(X,W) should be float tensor");if(n.length===3&&n[2].type!=="float32")throw new Error("Conv input(bias) should be float tensor")}});var zO,MO,BO,Mg,FO,VO,GO,UO,WO,HO,Bg,qO,Fg=k(()=>{"use strict";ct();Ze();Pe();kn();zO=(n,e,r,t,o,i)=>(n-1)*e+r+(t-1)*o+1-i,MO=(n,e,r,t,o)=>{let i=Math.floor(n/2);e==="SAME_UPPER"?(r[t]=i,r[o]=n-i):e==="SAME_LOWER"&&(r[t]=n-i,r[o]=i)},BO=(n,e,r,t,o,i,a,s)=>{let u=n.length-2,c=s.length===0;for(let d=0;d<u;++d){let f=c?n[d+2]*i[d]:s[d],h=zO(n[d+2],i[d],o[d],e[d],r[d],f);MO(h,t,o,d,d+u),c&&s.push(i[d]*(n[d+2]-1)+a[d]+(e[d]-1)*r[d]+1-o[d]-o[d+u])}},Mg=(n,e,r)=>(qO(e,r),FO(n,e,r)),FO=(n,e,r)=>{let t=HO(r,e);return[WO(n,e,t)]},VO=(n,e)=>({name:"ConvTranspose",inputNames:n?["X","W","B"]:["X","W"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e}),GO=(n,e,r,t)=>{let i=e.length>2?"getB(output_channel)":"0.0",a=e[0].dims,s=e[1].dims,u=s[1],c=s[0]/t.group,d=[e[0].dims[0],e[1].dims[1]*t.group,...t.outputShape],f=se(n.session.backend.glContext.version),{activationFunction:h,applyActivation:b}=zr(t),y=`
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
    for (int inChannelOffset = 0; inChannelOffset < ${c}; inChannelOffset++) {
      int input_channel = group_id * ${c} + inChannelOffset;
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
    ${b}
    ${f.output} = vec4(value, .0, .0, .0);
  }
`;return{...r,output:{dims:d,type:e[0].type,textureType:0},shaderSource:y,hasMain:!0}},UO=(n,e,r)=>{let t=VO(e.length>2,r.cacheKey);return{...t,get:()=>GO(n,e,t,r)}},WO=(n,e,r)=>n.run(UO(n,e,r),e),HO=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0)for(let s=2;s<e[1].dims.length;++s)r.push(e[1].dims[s]);let t=n.pads.slice(),o=n.outputShape.slice(),i=e[0].dims;BO(i,r,n.dilations,n.autoPad,t,n.strides,n.outputPadding,o);let a=Object.assign({},n);return Object.assign(a,{kernelShape:r,pads:t,outputShape:o,cacheKey:n.cacheKey}),a},Bg=n=>{let e=n.attributes,r=eo(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),a=e.getInts("kernel_shape",[]),s=e.getInts("output_padding",[0,0]),u=e.getInts("output_shape",[]),c=e.getInts("pads",[0,0,0,0]),d=e.getInts("strides",[1,1]);return Se({autoPad:t,dilations:o,group:i,kernelShape:a,outputPadding:s,outputShape:u,pads:c,strides:d,...r})},qO=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4||n[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let r=n[0].dims[1],t=n[1].dims[0];if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=n[1].dims[1]*e.group;if(n.length===3&&(n[2].dims.length!==1||n[2].dims[0]!==o))throw new Error("invalid bias");let i=n[0].dims.length-2;if(e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==n[0].dims.length-2)throw new Error("invalid output shape");if(n[0].type!=="float32"||n[1].type!=="float32")throw new Error("ConvTranspose input(X,W) should be float tensor");if(n.length===3&&n[2].type!=="float32")throw new Error("ConvTranspose input(bias) should be float tensor")}});var Vg,Nn,Gg,jO,Ug,KO,XO,ZO,Hi=k(()=>{"use strict";ct();Me();Pe();Vg={name:"Transpose",inputNames:["A"],inputTypes:[0]},Nn=(n,e,r)=>(ZO(e),[n.run({...Vg,cacheHint:r.cacheKey,get:()=>jO(n,e[0],r.perm)},e)]),Gg=n=>Se({perm:n.attributes.getInts("perm",[])}),jO=(n,e,r)=>{let t=e.dims;r=Ug(t,r);let o=KO(t,r),i=t.length,a=`
      ${XO("perm",r,i)}
      float process(int indices[${i}]) {
        int a[${i}];
        perm(a, indices);
        return _A(a);
      }`;return{...Vg,output:{dims:o,type:e.type,textureType:0},shaderSource:a}},Ug=(n,e)=>(e&&e.length!==n.length&&(e=[...n.keys()].reverse()),e),KO=(n,e)=>(e=Ug(n,e),ne.sortBasedOnPerm(n,e)),XO=(n,e,r)=>{let t=[];t.push(`void ${n}(out int a[${r}], int src[${r}]) {`);for(let o=0;o<r;++o)t.push(`	a[${e[o]}]=src[${o}];`);return t.push("	}"),t.join(`
`)},ZO=n=>{if(!n||n.length!==1)throw new Error("Transpose requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("input should be float tensor")}});var Wg,Hg,JO,qg=k(()=>{"use strict";Hi();Wg=(n,e,r)=>{JO(e);let t=r.blocksize,o=t*t,i=r.mode==="DCR"?[0,3,4,1,5,2]:[0,1,4,2,5,3],a=r.mode==="DCR"?[e[0].dims[0],t,t,e[0].dims[1]/o,e[0].dims[2],e[0].dims[3]]:[e[0].dims[0],e[0].dims[1]/o,t,t,e[0].dims[2],e[0].dims[3]],s=n.reshapeUnpacked(e[0],a),u={perm:i,cacheKey:`${i}`},[c]=Nn(n,[s],u),d=[e[0].dims[0],e[0].dims[1]/o,e[0].dims[2]*t,e[0].dims[3]*t];return[n.reshapeUnpacked(c,d)]},Hg=n=>{let e=n.attributes.getInt("blocksize");if(e<1)throw new Error(`blocksize must be >= 1, but got : ${e} for DepthToSpace`);let r=n.attributes.getString("mode","DCR");if(r!=="DCR"&&r!=="CRD")throw new Error(`unrecognized mode: ${r} for DepthToSpace`);return{mode:r,blocksize:e}},JO=n=>{if(n.length!==1)throw new Error(`DepthToSpace expect 1 inputs, but got ${n.length}`);if(n[0].type==="string"||n[0].dims.length!==4)throw new TypeError("DepthToSpace input should be a 4-D numeric tensor")}});var jg,Kg,YO,Xg=k(()=>{"use strict";Me();jg=(n,e,r)=>{YO(e,r);let t=ne.flattenShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},Kg=n=>n.attributes.getInt("axis",1),YO=(n,e)=>{if(!n||n.length!==1)throw new Error("Flatten requires 1 input.");let r=n[0].dims.length;if(r===0)throw new Error("scalar tensor is not supported.");if(e<-r||e>r)throw new Error("Invalid axis");if(n[0].type==="string")throw new Error("string tensor is not supported.")}});var pn,No=k(()=>{"use strict";pn=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]});var Zg,Jg,QO,eP,tP,rP,Yg=k(()=>{"use strict";ct();No();Me();Pe();Zg=(n,e,r)=>(rP(e,r.axis),[n.run(tP(n,e,r),e)]),Jg=n=>Se({axis:n.attributes.getInt("axis",0)}),QO={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},eP=(n,e,r,t)=>{let o=r[0].dims.slice(),i=r[1].dims.slice(),a=new Array(o.length+i.length-1);t=ne.normalizeAxis(t,o.length);let s=[];for(let h=0;h<a.length;h++)h<t?(a[h]=o[h],s.push(`inputIdx[${h}] = outputIdx[${h}];`)):h<t+i.length?(a[h]=i[h-t],s.push(`indexDataIdx[${h-t}] = outputIdx[${h}];`)):(a[h]=o[h-i.length+1],s.push(`inputIdx[${h-i.length+1}] = outputIdx[${h}];`));let u=a.length||1,c=o.length,d=i.length||1,f=`
      float process(int outputIdx[${u}]) {
        int inputIdx[${c}];
        int indexDataIdx[${d}];
        indexDataIdx[0] = 0;
        ${s.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${t}] = idx < 0 ? idx + ${o[t]} : idx;
        return _A(inputIdx);
      }`;return{...e,output:{dims:a,type:r[0].type,textureType:0},shaderSource:f}},tP=(n,e,r)=>{let t={...QO,cacheHint:r.cacheKey};return{...t,get:()=>eP(n,t,e,r.axis)}},rP=(n,e)=>{if(!n||n.length!==2)throw new Error("Gather requires 2 inputs.");let r=n[0].dims.length;if(r<1)throw new Error("Invalid input shape.");if(e<-r||e>r-1)throw new Error("Invalid axis.");if(pn.indexOf(n[0].type)===-1)throw new Error("Invaid input type.");if(n[1].type!=="int32"&&n[1].type!=="int16")throw new Error("Invaid input type.")}});var Ll,Qg,eb,tb,nP,oP,iP,rb=k(()=>{"use strict";ct();Me();Pe();Ll=(n,e,r)=>(iP(e,r),[n.run(nP(e,r),e)]),Qg=(n,e)=>{let r=n.attributes.getInt("transA",0)!==0,t=n.attributes.getInt("transB",0)!==0,o=n.attributes.getFloat("alpha",1),i=n.attributes.getFloat("beta",1);return Se({transA:r,transB:t,alpha:o,beta:i,isOptionalC:e})},eb=n=>Qg(n,!1),tb=n=>Qg(n,!0),nP=(n,e)=>{let r={name:"Gemm",inputNames:n.length===3?["A","B","C"]:["A","B"],inputTypes:n.length===3?[0,0,0]:[0,0],key:e.cacheKey};return{...r,get:()=>oP(r,n,e)}},oP=(n,e,r)=>{let t=e[0].dims.slice(),o=e[1].dims.slice(),[i,a]=Ni.getShapeOfGemmResult(t,r.transA,o,r.transB,e.length===3?e[2].dims:void 0),s=[i,a];if(!s)throw new Error("Can't use gemm on the given tensors");let u=t[t.length-1],c="";r.transA&&(u=t[0]),r.transA&&r.transB?c="value += _A_T(a) * _B_T(b);":r.transA&&!r.transB?c="value += _A_T(a) * _B(b);":!r.transA&&r.transB?c="value += _A(a) * _B_T(b);":!r.transA&&!r.transB&&(c="value += _A(a) * _B(b);");let d=s.length,f=e.length===3?`int c[${e[2].dims.length}];`:"",h=e.length===3?"bcastIndices_C(indices, c);":"",b=e.length===3?"value += beta * _C(c);":"",y=`
      float process(int indices[${d}]) {
          int a[${d}];
          int b[${d}];
          ${f}

          copyVec(indices, a);
          copyVec(indices, b);
          ${h}

          float value = 0.0;
          for (int k=0; k<${u}; ++k) {
              a[${d-1}] = k;
              b[${d-2}] = k;
              ${c}
          }

          value = value * alpha;
          ${b}
          return value;
      }`;return{...n,output:{dims:s,type:e[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:r.alpha},{name:"beta",type:"float",data:r.beta}],shaderSource:y}},iP=(n,e)=>{if(!n)throw new Error("Input is missing");if(e.isOptionalC&&(n.length<2||n.length>3))throw new Error("Invaid input shape.");if(!e.isOptionalC&&n.length!==3)throw new Error("Gemm requires 3 inputs");if(n.length===3&&n[2].dims.length!==1&&n[2].dims.length!==2)throw new Error("Invalid input shape of C");if(n[0].type!=="float32"&&n[0].type!=="float64"||n[1].type!=="float32"&&n[1].type!=="float64"||n.length===3&&n[2].type!=="float32"&&n[2].type!=="float64")throw new Error("Invalid input type.");if(n[0].type!==n[1].type||n.length===3&&n[0].type!==n[2].type)throw new Error("Input types are mismatched")}});var nb,ob,aP,sP,uP,lP,cP,ib=k(()=>{"use strict";ct();Pe();nb=(n,e,r)=>(cP(e),[n.run(uP(n,e,r),e)]),ob=n=>{let e=n.attributes.getFloat("scale"),r=n.attributes.getFloats("bias");return Se({scale:e,bias:r})},aP={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},sP=(n,e,r,t)=>{let o=r[0].dims.slice(),i=o.length,s=`
      ${lP(t.bias.length)}
      float process(int indices[${i}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...e,output:{dims:o,type:r[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:t.bias.length,data:t.bias},{name:"scale",type:"float",data:t.scale}],shaderSource:s}},uP=(n,e,r)=>{let t={...aP,cacheHint:r.cacheKey};return{...t,get:()=>sP(n,t,e,r)}},lP=n=>{let e=[`float getBias(float bias[${n}], int channel) {`];for(let r=0;r<n;++r)r===0?e.push(`	if (channel == ${r}) { return bias[${r}]; }`):r===n-1?e.push(`	else { return bias[${r}]; }`):e.push(`	else if (channel == ${r}) { return bias[${r}]; }`);return e.push("	}"),e.join(`
`)},cP=n=>{if(!n||n.length!==1)throw new Error("ImageScaler requires 1 input.");if(n[0].dims.length!==4)throw new Error("Invalid input shape.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")}});var sb,ub,ab,dP,pP,fP,hP,mP,gP,lb=k(()=>{"use strict";Ze();Pe();sb=(n,e,r)=>{gP(e);let t=n.run(pP(e[0]),e);return[n.run(mP(n,e[0],r,t.dims),[e[0],t,e[1],e[2]])]},ub=n=>n.attributes.getFloat("epsilon",1e-5),ab={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},dP=(n,e)=>{let r=e.dims.slice(),t=r[1],o=r[2]*r[3],i=[r[0],t],a=`
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
      }`;return{...n,output:{dims:i,type:e.type,textureType:4},shaderSource:a}},pP=n=>({...ab,get:()=>dP(ab,n)}),fP={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},hP=(n,e,r,t,o)=>{let i=se(n.session.backend.glContext.version),[a,s]=n.calculateTextureWidthAndHeight(o,4),[u,c]=[a/4,s],d=`
      vec4 get_MeanAndVariance(int[2] mv) {
        int offset = indicesToOffset_MeanAndVariance(mv);
        vec2 coords = offsetToCoords(offset, ${u}, ${c});
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
      }`;return{...e,output:{dims:r.dims,type:r.type,textureType:0},variables:[{name:"epsilon",type:"float",data:t}],shaderSource:d}},mP=(n,e,r,t)=>{let o={...fP,cacheHint:`${r}`};return{...o,get:()=>hP(n,o,e,r,t)}},gP=n=>{if(!n||n.length!==3)throw new Error("InstanceNormalization requires 3 inputs.");let e=n[0],r=n[1],t=n[2];if(e.dims.length<3||r.dims.length!==1||t.dims.length!==1)throw new Error("Invalid input shape.");if(r.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1])throw new Error("Input shapes are mismatched.");if(e.type!=="float32"&&e.type!=="float64"||r.type!=="float32"&&r.type!=="float64"||t.type!=="float32"&&t.type!=="float64")throw new Error("Invalid input type.");if(n[0].dims.length!==4)throw new Error("Only support 4-D input shape.")}});function bP(n,e){let r=n[0].dims[1],t=n[0].dims.length,o=-Math.floor((e.size-1)/2),i=Math.ceil((e.size-1)/2),a=`float(${e.alpha}) / float(${e.size})`,s=`float(${e.bias})`,u=`float(${e.beta})`,c=`
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
    }`;return{...pb,cacheHint:e.cacheKey,output:{dims:n[0].dims,type:n[0].type,textureType:0},shaderSource:c}}function yP(n,e){return{...pb,cacheHint:e.cacheKey,get:()=>bP(n,e)}}var cb,db,pb,_P,fb=k(()=>{"use strict";ct();Pe();cb=(n,e,r)=>(_P(e),[n.run(yP(e,r),e)]),db=n=>{let e=n.attributes.getFloat("alpha",1e-4),r=n.attributes.getFloat("beta",.75),t=n.attributes.getFloat("bias",1),o=n.attributes.getInt("size");return Se({alpha:e,beta:r,bias:t,size:o})},pb={name:"LRN",inputNames:["X"],inputTypes:[0]};_P=n=>{if(!n||n.length!==1)throw new Error("LRN requires 1 input.");if(n[0].dims.length!==4)throw new Error('currently only support LRN for input with "NCHW" format');if(n[0].type!=="float32")throw new Error("input should be float type")}});var vP,Rl,hb,mb,gb,xP,wP,TP,IP,SP,$P,AP,OP,bb=k(()=>{"use strict";ct();Me();Ze();Pe();vP={name:"Pad",inputNames:["A"],inputTypes:[0]},Rl=(n,e,r)=>(TP(e),[n.run({...vP,cacheHint:r.cacheKey,get:()=>wP(n,e[0],r)},e)]),hb=n=>{let e=n.attributes.getString("mode","constant"),r=n.attributes.getFloat("value",0),t=n.attributes.getInts("pads");return Se({mode:e,value:r,pads:t})},mb=(n,e,r)=>{IP(e);let t=xP(n,e,r);return Rl(n,[e[0]],t)},gb=n=>n.attributes.getString("mode","constant"),xP=(n,e,r)=>{if(!n.session.isInitializer(e[1].dataId)||e.length>=3&&!n.session.isInitializer(e[2].dataId))throw new Error("dynamic pad attributes are not allowed");let t=Array.from(e[1].integerData),o=e.length>=3?e[2].floatData[0]:0;return Se({mode:r,pads:t,value:o})},wP=(n,e,r)=>{let t=ne.padShape(e.dims.slice(),r.pads),o=t.length,a=`
      ${SP(n,e,r)}
      float process(int[${o}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:t,type:e.type,textureType:0},shaderSource:a}},TP=n=>{if(!n||n.length!==1)throw new Error("Pad requires 1 input");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")},IP=n=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Pad requires 2 or 3 inputs");if(n[1].type!=="int32")throw new Error("Invalid input type.");if(n.length>=3&&n[2].type==="string")throw new Error("Invalid input type.")},SP=(n,e,r)=>{let t=se(n.session.backend.glContext.version),[o,i]=n.calculateTextureWidthAndHeight(e.dims,0),a=ne.computeStrides(e.dims);switch(r.mode){case"constant":return $P(t,e.dims,a,o,i,r.pads,r.value);case"reflect":return AP(t,e.dims,a,o,i,r.pads);case"edge":return OP(t,e.dims,a,o,i,r.pads);default:throw new Error("Invalid mode")}},$P=(n,e,r,t,o,i,a)=>{let s=e.length,u="";for(let c=s-1;c>=0;--c)u+=`
        k = m[${c}] - ${i[c]};
        if (k < 0)  return constant;
        if (k >= ${e[c]}) return constant;
        offset += k * ${r[c]};
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
      `},AP=(n,e,r,t,o,i)=>{let a=e.length,s="";for(let u=a-1;u>=0;--u)s+=`
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
      `},OP=(n,e,r,t,o,i)=>{let a=e.length,s="";for(let u=a-1;u>=0;--u)s+=`
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
      `}});var _b,vb,xb,wb,Tb,Ib,Sb,$b,Ab,PP,yb,Ob,ji,Pb,qi,EP,Eb=k(()=>{"use strict";ct();Me();Pe();_b=(n,e,r)=>{ji(e);let t={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[n.run({...t,get:()=>xb(e,t,!1,r)},e)]},vb=n=>{let e=n.attributes.getString("auto_pad","NOTSET"),r=n.attributes.getInt("ceil_mode",0),t=n.attributes.getInt("count_include_pad",0)!==0,o=n.attributes.getInts("kernel_shape"),i=n.attributes.getInts("strides",[]),a=n.attributes.getInts("pads",[]);if(r!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");return Se({autoPad:e,ceilMode:r,countIncludePad:t,kernelShape:o,strides:i,pads:a})},xb=(n,e,r,t)=>{let[o,i]=Ab(n,t,r),a=ne.size(o.kernelShape),s="value += _X(x);",u="";o.countIncludePad?u+=`value /= float(${a});`:u+=`value /= float(${a} - pad);`;let d=`
        ${Pb(n[0].dims,o,s,u,"0.0")}
      `;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:d}},wb=(n,e,r)=>{ji(e);let t={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${r.countIncludePad}`};return[n.run({...t,get:()=>xb(e,t,!0,r)},e)]},Tb=n=>{let e=n.attributes.getInt("count_include_pad",0)!==0;return Se({autoPad:"",ceilMode:0,countIncludePad:e,kernelShape:[],strides:[],pads:[]})},Ib=(n,e,r)=>{ji(e);let t={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[n.run({...t,get:()=>$b(e,t,!1,r)},e)]},Sb=n=>{let e=n.attributes.getString("auto_pad","NOTSET"),r=n.attributes.getInt("ceil_mode",0),t=n.attributes.getInts("kernel_shape"),o=n.attributes.getInts("strides",[]),i=n.attributes.getInts("pads",[]),a=n.attributes.getInt("storage_order",0),s=n.attributes.getInts("dilations",[]);if(a!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");return Se({autoPad:e,ceilMode:r,countIncludePad:!1,kernelShape:t,strides:o,pads:i,storageOrder:a,dilations:s})},$b=(n,e,r,t)=>{let[o,i]=Ab(n,t,r),c=`
      ${Pb(n[0].dims,o,`
      value = max(_X(x), value);
    `,"","-1e5")}
    `;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:c}},Ab=(n,e,r)=>{let t=n[0].dims.slice(),o=Object.hasOwnProperty.call(e,"dilations"),i=e.kernelShape.slice(),a=e.strides.slice(),s=o?e.dilations.slice():[],u=e.pads.slice();On.adjustPoolAttributes(r,t,i,a,s,u);let c=On.computePoolOutputShape(r,t,a,s,i,u,e.autoPad),d=Object.assign({},e);return o?Object.assign(d,{kernelShape:i,strides:a,pads:u,dilations:s,cacheKey:e.cacheKey}):Object.assign(d,{kernelShape:i,strides:a,pads:u,cacheKey:e.cacheKey}),[d,c]},PP={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},yb={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},Ob=(n,e)=>(ji(e),[n.run({...yb,get:()=>$b(e,yb,!0,PP)},e)]),ji=n=>{if(!n||n.length!==1)throw new Error("Pool ops requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")},Pb=(n,e,r,t,o)=>{let i=n.length;if(e.kernelShape.length<=2){let a=e.kernelShape[e.kernelShape.length-1],s=e.strides[e.strides.length-1],u=e.pads[e.pads.length/2-1],c=e.pads[e.pads.length-1],d=n[i-1],f="",h="",b="";if(u+c!==0?f=`
          for (int i = 0; i < ${a}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${s} - ${u} + i;
            if (x[${i} - 1] < 0 || x[${i} - 1] >= ${d}) {
              pad++;
              continue;
            }
            ${r}
          }`:f=`
          for (int i = 0; i < ${a}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${s} - ${u} + i;
            ${r}
          }`,e.kernelShape.length===2){let v=e.kernelShape[e.kernelShape.length-2],T=e.strides[e.strides.length-2],x=e.pads[e.pads.length/2-2],w=e.pads[e.pads.length-2],I=n[i-2];x+w!==0?h=`
            for (int j = 0; j < ${v}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${T} - ${x} + j;
              if (x[${i} - 2] < 0 || x[${i} - 2] >= ${I}) {
                pad+= ${a};
                continue;
              }
          `:h=`
            for (int j = 0; j < ${v}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${T} - ${x} + j;
            `,b=`
          }
        `}return`
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);

          float value = ${o};
          int pad = 0;
          ${h}
          ${f}
          ${b}
          ${t}
          return value;
        }
      `}else{let a=ne.size(e.kernelShape),s=ne.computeStrides(e.kernelShape),u=s.length,c=e.pads.length,d=EP(u),f=qi(n,"inputDims"),h=qi(e.pads,"pads"),b=qi(s,"kernelStrides"),y=qi(e.strides,"strides"),v=e.pads.reduce((w,I)=>w+I),T="";return v?T=`
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
        ${d}
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);
          int offset[${u}];
          int pads[${c}];
          int inputDims[${i}];
          int kernelStrides[${u}];
          int strides[${u}];
          ${h}
          ${f}
          ${y}
          ${b}

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
      `}},qi=(n,e)=>{let r="";for(let t=0;t<n.length;t++)r+=`
      ${e}[${t}] = ${n[t]};
    `;return r},EP=n=>`
  void offsetToIndices(int offset, int[${n}] strides, out int[${n}] indices) {
    if (${n} == 0) {
      return;
    }
    for (int i = 0; i < ${n} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${n} - 1] = offset;
  }`});var Ln,fn,CP,DP,Cb,Db,kb,Nb,Lb,Rb,zb,Mb=k(()=>{"use strict";ct();No();Me();Pe();Ln=(n,e,r,t,o)=>{DP(e);let i={name:t,inputNames:["A"],inputTypes:[0]};return[n.run({...i,cacheHint:r.cacheKey,get:()=>CP(n,e,r,t,o,i)},e)]},fn=n=>{let e=n.attributes.getInts("axes",[]),r=n.attributes.getInt("keepdims",1)===1;return Se({axes:e,keepDims:r})},CP=(n,e,r,t,o,i)=>{let a=[],s=e[0].dims.length||1,u=[],c=ne.normalizeAxes(r.axes,e[0].dims.length),d=o(e,c),f=d[1];for(let y=0;y<e[0].dims.length;y++)c.indexOf(y)>=0||c.length===0?(r.keepDims&&a.push(1),f=`
          for(int j${y} = 0; j${y} < ${e[0].dims[y]}; j${y}++) {
            inputIdx[${y}] = j${y};
            ${f}
          }`):(u.push(`inputIdx[${y}] = outputIdx[${a.length}];`),a.push(e[0].dims[y]));let b=`
      float process(int outputIdx[${a.length||1}]) {
        float value;                 // final result
        int inputIdx[${s}];      // addressing input data
        ${u.join(`
`)}
        ${d[0]}       // init ops for reduce max/min
        ${f}
        ${d[2]}       // final computation for reduce mean
        return value;
      }`;return{...i,output:{dims:a,type:e[0].type,textureType:0},shaderSource:b}},DP=n=>{if(!n||n.length!==1)throw new Error("Reduce op requires 1 input.");if(pn.indexOf(n[0].type)===-1)throw new Error("Invalid input type.")},Cb=(n,e,r)=>Ln(n,e,r,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),Db=(n,e,r)=>Ln(n,e,r,"ReduceMean",(o,i)=>{let a=1;for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=o[0].dims[s]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${a}.;`]}),kb=(n,e,r)=>Ln(n,e,r,"ReduceMax",(o,i)=>{let a=[];for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`inputIdx[${s}] = 0;`);return[`${a.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),Nb=(n,e,r)=>Ln(n,e,r,"ReduceMin",(o,i)=>{let a=[];for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`inputIdx[${s}] = 0;`);return[`${a.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),Lb=(n,e,r)=>Ln(n,e,r,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),Rb=(n,e,r)=>Ln(n,e,r,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),zb=(n,e,r)=>Ln(n,e,r,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])});var Bb,Fb=k(()=>{"use strict";Me();Bb=(n,e)=>{let r=ne.calculateReshapedDims(e[0].dims,e[1].integerData);return n.session.pack?[n.reshapePacked(e[0],r)]:[n.reshapeUnpacked(e[0],r)]}});var Vb,zl,Gb,Ub,Lo,kP,Ml,Ki,Bl=k(()=>{"use strict";ct();Ze();Pe();Vb={name:"Upsample",inputNames:["X"],inputTypes:[0]},zl=(n,e,r)=>(Ml(e,r),[n.run({...Vb,cacheHint:r.cacheKey,get:()=>kP(n,e,r)},e)]),Gb=n=>Lo(n,7),Ub=n=>Lo(n,9),Lo=(n,e)=>{let r=e>=10,t=n.attributes.getString("mode","nearest");if(t!=="nearest"&&t!=="linear"&&(e<11||t!=="cubic"))throw new Error(`unrecognized mode: ${t}`);let o=[];e<9&&(o=n.attributes.getFloats("scales"),Ki(o,t,r));let i=n.attributes.getFloat("extrapolation_value",0),a=e>10?n.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(a)===-1)throw new Error(`coordinate_transform_mode '${a}' is not supported`);let s=a==="tf_crop_and_resize",u=s,c=t==="nearest"&&e>=11?n.attributes.getString("nearest_mode","round_prefer_floor"):"";if(["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(c)===-1)throw new Error(`nearest_mode '${c}' is not supported`);let d=n.attributes.getFloat("cubic_coeff_a",-.75),f=n.attributes.getInt("exclude_outside",0)!==0;if(f&&t!=="cubic")throw new Error("exclude_outside can be set to 1 only when mode is CUBIC.");let h=e<11?!0:t==="nearest"&&a==="asymmetric"&&c==="floor",b=0,y=0,v=0;return e>10?n.inputs.length>2?(b=1,y=2,v=3):(y=1,v=2):e===9&&(y=1),Se({opset:e,isResize:r,mode:t,scales:o,extrapolationValue:i,coordinateTransformMode:a,useExtrapolation:u,needRoiInput:s,nearestMode:c,cubicCoefficientA:d,excludeOutside:f,useNearest2xOptimization:h,roiInputIdx:b,scalesInputIdx:y,sizesInputIdx:v})},kP=(n,e,r)=>{let t=se(n.session.backend.glContext.version),[o,i]=n.calculateTextureWidthAndHeight(e[0].dims,0),a=e[0].dims.map((v,T)=>Math.floor(v*r.scales[T])),[s,u]=n.calculateTextureWidthAndHeight(a,0),c=a.length,d=new Array(c),f=new Array(c),h=`
      int output_pitches[${c}];
      int input_pitches[${c}];
      `;for(let v=c-1;v>=0;v--)d[v]=v===c-1?1:d[v+1]*a[v+1],f[v]=v===c-1?1:f[v+1]*e[0].dims[v+1],h+=`
        output_pitches[${v}] = ${d[v]};
        input_pitches[${v}] = ${f[v]};
        `;let b=`
      float getInputFloat(int index) {
        vec2 coords = offsetToCoords(index, ${o}, ${i});
        float value = getColorAsFloat(${t.texture2D}(X, coords));
        return value;
      }
      `,y=r.mode==="nearest"?`
    ${b}
    float process(int indices[${c}]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${h}

      int d, m;
      for (int dim = 0; dim < ${c}; ++dim) {
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
    }`:c===4?`
    ${b}
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
    ${b}
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
    }`;return{...Vb,output:{dims:a,type:e[0].type,textureType:0},shaderSource:y,variables:[{name:"scales",type:"int",arrayLength:r.scales.length,data:r.scales.map(v=>Math.ceil(v))}]}},Ml=(n,e)=>{if(!n||e.opset<9&&n.length!==1||e.opset>=9&&e.opset<11&&n.length!==2||e.opset>=11&&n.length<2)throw new Error("invalid inputs.");if(e.scales.length>0&&n[0].dims.length!==e.scales.length)throw new Error("Invalid input shape.");if(n[0].type==="string")throw new Error("Invalid input tensor types.")},Ki=(n,e,r)=>{if(r){for(let t of n)if(t<=0)throw new Error("Scale value should be greater than 0.")}else for(let t of n)if(t<1)throw new Error("Scale value should be greater than or equal to 1.");if((e==="linear"||e==="cubic")&&n.length!==2&&(n.length!==4||n[0]!==1||n[1]!==1))throw new Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${r?"Resize":"Upsample"} opeartor.`)}});var Fl,Vl,Wb,Hb,NP,LP,RP,zP,qb=k(()=>{"use strict";Ze();Pe();Lr();Dn();Bl();Fl={name:"Resize",inputNames:["A"],inputTypes:[2]},Vl=(n,e,r)=>(Ml(e,r),[n.run({...Fl,cacheHint:r.cacheKey,get:()=>NP(n,e,r)},e)]),Wb=n=>Lo(n,10),Hb=n=>Lo(n,11),NP=(n,e,r)=>{let t=se(n.session.backend.glContext.version),[o,i]=LP(e,r);if(o.every(I=>I===1)&&r.coordinateTransformMode!=="tf_crop_and_resize")return{...Fl,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${t.texture2D}(X, TexCoords);
                    ${t.output} = v;
                }`};let s=i.length;if(s<2)throw new Error(`output dimension should be at least 2, but got ${s}`);let u=i[s-2],c=i[s-1],d=e[0].dims;if(s!==d.length)throw new Error(`output dimension should match input ${d.length}, but got ${s}`);let f=d[s-2],h=d[s-1],b=o[s-2],y=o[s-1],v="";if(r.mode!=="linear")throw new Error(`resize (packed) does not support mode: '${r.mode}'`);switch(r.coordinateTransformMode){case"asymmetric":v=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return vec4(coords) / scaleWHWH;
                    }
                `;break;case"half_pixel":v=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return (vec4(coords) + 0.5) / scaleWHWH - 0.5;
                    }
                `;break;case"pytorch_half_pixel":v=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 fcoords = vec4(coords);
                        return vec4(
                            ${c}.0 > 1.0 ? (fcoords.x + 0.5) / scaleWHWH.x - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.y + 0.5) / scaleWHWH.y - 0.5 : 0.0,
                            ${c}.0 > 1.0 ? (fcoords.z + 0.5) / scaleWHWH.z - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.w + 0.5) / scaleWHWH.w - 0.5 : 0.0
                          );
                    }
                `;break;case"align_corners":v=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 resized = vec4(${c}.0 - 1.0, ${u}.0 - 1.0, ${c}.0 - 1.0,
                            ${u}.0 - 1.0);
                        vec4 original = vec4(${h}.0 - 1.0, ${f}.0 - 1.0, ${h}.0 - 1.0,
                            ${f}.0 - 1.0);
                        vec4 new_scale = original / resized;
                        return vec4(coords) * new_scale;
                    }
                `;break;default:throw new Error(`resize (packed) does not support coordinateTransformMode:                                 '${r.coordinateTransformMode}'`)}let T=gt(s),x=Rr(),w=`
            const vec2 inputWH = vec2(${f}.0, ${h}.0);
            const vec4 scaleWHWH = vec4(float(${b}), float(${y}), float(${b}), float(${y}));
            ${x}
            ${v}
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
                bool hasNextCol = rc.z < ${c-1};

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
        `;return{...Fl,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:w}},LP=(n,e)=>{let t=n[0].dims,o=e.scales,i;if(o.length===0){let s=n[e.scalesInputIdx];if(s&&s.size!==0){if(n[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");o=RP(s,e.mode,e.isResize)}else{let u=n[e.sizesInputIdx];if(!u||u.size===0)throw new Error("Either scales or sizes MUST be provided as input.");i=Array.from(u.integerData),o=zP(i,t,e.mode,e.isResize)}}else if(n[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");let a=i||t.map((s,u)=>Math.floor(s*o[u]));return[o,a]},RP=(n,e,r)=>{let t=Array.from(n.floatData);return Ki(t,e,r),t},zP=(n,e,r,t)=>{let o=e.length,i=new Array(o);for(let a=0,s=o;a<s;a++)if(e[a]===0){if(n[a]!==0)throw new Error("Input dim is zero but required output dim is non-zero.");i[a]=1}else i[a]=n[a]/e[a];return Ki(i,r,t),i}});var jb,MP,Kb=k(()=>{"use strict";Cn();jb=(n,e)=>(MP(e),[new ot([e[0].dims.length],"int32",void 0,void 0,new Int32Array(e[0].dims))]),MP=n=>{if(!n||n.length!==1)throw new Error("Shape requires 1 input.")}});var Gl,Xb,Zb,Jb,BP,Yb,FP,VP,Qb=k(()=>{"use strict";ct();No();Me();Pe();Gl={name:"Slice",inputNames:["A"],inputTypes:[0]},Xb=(n,e,r)=>(BP(e),[n.run({...Gl,cacheHint:r.cacheKey,get:()=>Jb(n,e[0],r)},e)]),Zb=n=>{let e=n.attributes.getInts("starts"),r=n.attributes.getInts("ends"),t=n.attributes.getInts("axes",[]);return Se({starts:e,ends:r,axes:t})},Jb=(n,e,r)=>{let t=r.axes.length===0?e.dims.slice(0).map((f,h)=>h):r.axes,o=ne.normalizeAxes(t,e.dims.length),i=r.starts.map((f,h)=>f>e.dims[o[h]]-1?e.dims[o[h]]:ne.normalizeAxis(f,e.dims[o[h]])),a=r.ends.map((f,h)=>f>e.dims[o[h]]-1?e.dims[o[h]]:ne.normalizeAxis(f,e.dims[o[h]])),s=e.dims.slice(),u=[];for(let f=0;f<o.length;f++)s[o[f]]=a[f]-i[f],i[f]>0&&u.push(`outputIdx[${o[f]}] += ${i[f]};`);let d=`
      float process(int outputIdx[${s.length}]) {
        ${u.join(`
      `)}
        return _A(outputIdx);
      }`;return{...Gl,output:{dims:s,type:e.type,textureType:0},shaderSource:d}},BP=n=>{if(!n||n.length!==1)throw new Error("Slice requires 1 input.");if(pn.indexOf(n[0].type)===-1)throw new Error("Invalid input type.")},Yb=(n,e)=>{VP(e);let r=FP(n,e);return[n.run({...Gl,cacheHint:r.cacheKey,get:()=>Jb(n,e[0],r)},[e[0]])]},FP=(n,e)=>{if(!n.session.isInitializer(e[1].dataId)||!n.session.isInitializer(e[2].dataId)||e.length>=4&&!n.session.isInitializer(e[3].dataId)||e.length>=5&&!n.session.isInitializer(e[4].dataId))throw new Error("dynamic slice attributes are not allowed");if(e.length>=5&&e[4].integerData.some(a=>a!==1))throw new Error("currently non-1 steps is not supported for Slice");let r=Array.from(e[1].integerData),t=Array.from(e[2].integerData),o=e.length>=4?Array.from(e[3].integerData):[],i=`${o};${r};${t}`;return{starts:r,ends:t,axes:o,cacheKey:i}},VP=n=>{if(!n||n.length<3||n.length>5)throw new Error("Invalid input number.");if(n[1].type!=="int32"||n[1].dims.length!==1)throw new Error("Invalid input type.");if(n[2].type!=="int32"||n[2].dims.length!==1)throw new Error("Invalid input type.");if(n.length>=4&&(n[3].type!=="int32"||n[3].dims.length!==1))throw new Error("Invalid input type.");if(n.length>=5&&(n[4].type!=="int32"||n[4].dims.length!==1))throw new Error("Invalid input type.")}});var ey,ty,ry,ny,oy,iy,ay,sy,GP,UP,WP,uy,ly=k(()=>{"use strict";ct();Me();Ze();Pe();Hi();ey={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},ty={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},ry={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},ny=(n,e,r)=>{uy(e);let t=e[0].dims.slice(),o=ne.normalizeAxis(r.axis,t.length),i=ne.sizeToDimension(t,o),a=ne.sizeFromDimension(t,o);return sy(n,e,r,i,a)},oy=n=>Se({axis:n.attributes.getInt("axis",1)}),iy=n=>Se({axis:n.attributes.getInt("axis",-1)}),ay=(n,e,r)=>{uy(e);let t=e[0].dims.slice(),o=ne.normalizeAxis(r.axis,t.length),i=t.length,a=o!==i-1,s=[],u=[],c=[],d;a&&(u=Array.from({length:i}).map((y,v)=>v),u[o]=i-1,u[i-1]=o,u.map(y=>s.push(t[y])),d=Se({perm:u}),c=Nn(n,e,d));let f=a?ne.sizeToDimension(s,i-1):ne.sizeToDimension(t,i-1),h=a?ne.sizeFromDimension(s,i-1):ne.sizeFromDimension(t,i-1),b=sy(n,a?c:e,r,f,h);return a?Nn(n,b,d):b},sy=(n,e,r,t,o)=>{let i=GP(n,e[0],t,o,[t]),a=n.run({...ey,cacheHint:r.cacheKey,get:()=>i},e),s=UP(n,e[0],t,o,i.output.dims,[t]),u=n.run({...ty,cacheHint:r.cacheKey,get:()=>s},[e[0],a]),c=WP(n,e[0],t,o,i.output.dims,s.output.dims);return[n.run({...ry,cacheHint:r.cacheKey,get:()=>c},[e[0],a,u])]},GP=(n,e,r,t,o)=>{let[i,a]=n.calculateTextureWidthAndHeight(e.dims,0),s=o.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1)throw new Error("Dimensionality of the output should be 1");if(o[0]!==r)throw new Error("Shape of the output should be equal to logical row count");let u=se(n.session.backend.glContext.version),c=`
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
      }`;return{...ey,output:{dims:o,type:e.type,textureType:0},shaderSource:c}},UP=(n,e,r,t,o,i)=>{let[a,s]=n.calculateTextureWidthAndHeight(e.dims,0),u=i.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(i.length!==1)throw new Error("Dimensionality of the output should be 1");if(i[0]!==r)throw new Error("Shape of the output should be equal to logical row count");if(o.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==r)throw new Error("Shape of the intermediate results should be equal to logical row count");let c=se(n.session.backend.glContext.version),d=`
      float process(int[${u}] indices) {
        int logical_row_start_offset = indices[0] * ${t};

        float norm_factor = 0.0;
        float max = _Max(indices);
        for(int i=0; i<${t}; ++i)
        {
          norm_factor += exp(getColorAsFloat(${c.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${a}, ${s}))) - max);
        }

        return norm_factor;
      }`;return{...ty,output:{dims:i,type:e.type,textureType:0},shaderSource:d}},WP=(n,e,r,t,o,i)=>{let[a,s]=n.calculateTextureWidthAndHeight(e.dims,0),u=e.dims.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1||i.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==r||i[0]!==r)throw new Error("Shape of the intermediate results should be equal to logical row count");let c=`
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
    }`;return{...ry,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:c}},uy=n=>{if(!n||n.length!==1)throw new Error("Softmax requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type")}});var cy,dy,py,HP,qP,jP,fy=k(()=>{"use strict";ct();Me();Pe();cy={name:"Split",inputNames:["A"],inputTypes:[0]},dy=(n,e,r)=>{jP(e);let t=ne.normalizeAxis(r.axis,e[0].dims.length),o=HP(n,e,t,r),i=[];for(let a=0;a<o;++a)i.push(n.run({...cy,cacheHint:`${r.cacheKey};${a}`,get:()=>qP(n,e[0],r,t,a)},e));return i},py=n=>{let e=n.attributes.getInt("axis",0),r=n.attributes.getInts("split",[]),t=n.outputs.length;return Se({axis:e,split:r,numOutputs:t})},HP=(n,e,r,t)=>{let[,o]=Oo.splitShape(e[0].dims,r,t.split,t.numOutputs);return o.length},qP=(n,e,r,t,o)=>{let[i,a]=Oo.splitShape(e.dims,t,r.split,r.numOutputs),s=a[o],u=i[o],d=`
      float process(int indices[${u.length}]) {
        indices[${t}] += ${s};
        return _A(indices);
      }
    `;return{...cy,cacheHint:`${r.cacheKey}:${o}`,output:{dims:u,type:e.type,textureType:0},shaderSource:d}},jP=n=>{if(!n||n.length!==1)throw new Error("Split requires one input.");if(n[0].type!=="int8"&&n[0].type!=="uint8"&&n[0].type!=="int16"&&n[0].type!=="uint16"&&n[0].type!=="int32"&&n[0].type!=="uint32"&&n[0].type!=="float32"&&n[0].type!=="float64"&&n[0].type!=="bool")throw new Error("Invalid input type.")}});var Ul,hy,my,KP,XP,gy=k(()=>{"use strict";Me();Ul=(n,e,r)=>{KP(e);let t=ne.squeezeShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},hy=(n,e)=>(XP(e),Ul(n,[e[0]],Array.from(e[1].integerData))),my=n=>n.attributes.getInts("axes"),KP=n=>{if(!n||n.length!==1)throw new Error("Squeeze requires 1 input.");if(n[0].type==="string")throw new Error("invalid input tensor types.")},XP=n=>{if(!n||n.length!==2)throw new Error("Squeeze requires 2 inputs.");if(n[1].type!=="int32")throw new Error("Invalid input type.")}});var by,ZP,JP,yy=k(()=>{"use strict";Ze();Pe();by=(n,e)=>{JP(e);let r={name:"Sum",inputNames:e.map((o,i)=>`X${i}`),inputTypes:new Array(e.length).fill(0)};return[n.run({...r,get:()=>ZP(n,e,r)},e)]},ZP=(n,e,r)=>{let t=se(n.session.backend.glContext.version),o=e[0].dims.slice(),a=`
      void main() {
        vec4 result = ${e.map((s,u)=>`${t.texture2D}(X${u},TexCoords)`).join(" + ")};
        ${t.output} = result;
      }
    `;return{...r,output:{dims:o,type:e[0].type,textureType:0},hasMain:!0,shaderSource:a}},JP=n=>{if(!n||n.length===0)throw new Error("Sum requires inputs.");let e=n[0].dims.length;for(let r=1;r<n.length;r++){if(e!==n[r].dims.length)throw new Error("Input shapes are mismatched.");for(let t=0;t<e;t++)if(n[0].dims[t]!==n[r].dims[t])throw new Error("Input shapes are not matched.")}if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.");for(let r=1;r<n.length;r++)if(n[0].type!==n[r].type)throw new Error("Input types are not matched.")}});var _y,YP,QP,vy=k(()=>{"use strict";No();Pe();_y=(n,e)=>{QP(e);let r={name:"Tile",inputNames:["A"],inputTypes:[0]};return[n.run({...r,get:()=>YP(n,e,r)},e)]},YP=(n,e,r)=>{let t=e[0].dims.slice(),o=new Array(t.length),i=[];for(let u=0;u<t.length;u++)o[u]=t[u]*e[1].numberData[u],i.push(`inputIdx[${u}] = int(mod(float(outputIdx[${u}]), ${t[u]}.));`);let a=o.length,s=`
      float process(int outputIdx[${a}]) {
        int inputIdx[${a}];
        ${i.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...r,output:{dims:o,type:e[0].type,textureType:0},shaderSource:s}},QP=n=>{if(!n||n.length!==2)throw new Error("Tile requires 2 input.");if(n[1].dims.length!==1)throw new Error("The second input shape must 1 dimension.");if(n[1].dims[0]!==n[0].dims.length)throw new Error("Invalid input shape.");if(pn.indexOf(n[0].type)===-1)throw new Error("Invalid input type.");if(n[1].type!=="int32"&&n[1].type!=="int16")throw new Error("Invalid repeat type.")}});var Wl,xy,wy,e3,t3,Ty=k(()=>{"use strict";Me();Wl=(n,e,r)=>{e3(e);let t=ne.unsqueezeShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},xy=(n,e)=>(t3(e),Wl(n,[e[0]],Array.from(e[1].integerData))),wy=n=>n.attributes.getInts("axes"),e3=n=>{if(!n||n.length!==1)throw new Error("Unsqueeze requires 1 input.");if(n[0].type==="string")throw new Error("invalid input tensor types.")},t3=n=>{if(!n||n.length!==2)throw new Error("Unsqueeze requires 2 inputs.");if(n[1].type!=="int32")throw new Error("Invalid input type.")}});var Iy,Sy=k(()=>{"use strict";Lm();Km();Jm();ng();Gi();Fg();qg();Xg();Yg();rb();ib();lb();fb();Ui();bb();Eb();Mb();Fb();qb();Kb();Qb();ly();fy();gy();yy();vy();Hi();Al();Ty();Bl();Iy=[["Abs","","6+",og],["Acos","","7+",ig],["Add","","7+",Rm],["And","","7+",zm],["Asin","","7+",ag],["Atan","","7+",sg],["AveragePool","","7+",_b,vb],["BatchNormalization","","7+",km,Nm],["Cast","","6+",Xm,Zm],["Ceil","","6+",cg],["Clip","","6-10",Sl,ug],["Clip","","11+",lg],["Concat","","4+",eg,rg],["Conv","","1+",kl,Nl],["ConvTranspose","","1+",Mg,Bg],["Cos","","7+",dg],["Div","","7+",Mm],["Dropout","","7+",$l],["DepthToSpace","","1+",Wg,Hg],["Equal","","7+",Bm],["Elu","","6+",pg,fg],["Exp","","6+",hg],["Flatten","","1+",jg,Kg],["Floor","","6+",mg],["FusedConv","com.microsoft","1+",kl,Nl],["Gather","","1+",Zg,Jg],["Gemm","","7-10",Ll,eb],["Gemm","","11+",Ll,tb],["GlobalAveragePool","","1+",wb,Tb],["GlobalMaxPool","","1+",Ob],["Greater","","7+",Fm],["Identity","","1+",$l],["ImageScaler","","1+",nb,ob],["InstanceNormalization","","6+",sb,ub],["LeakyRelu","","6+",gg,bg],["Less","","7+",Vm],["LRN","","1+",cb,db],["Log","","6+",yg],["MatMul","","1+",Cg,Dg],["MaxPool","","1+",Ib,Sb],["Mul","","7+",Gm],["Neg","","6+",_g],["Not","","1+",vg],["Or","","7+",Um],["Pad","","2-10",Rl,hb],["Pad","","11+",mb,gb],["Pow","","7+",Wm],["PRelu","","7+",Hm],["ReduceLogSum","","1+",Rb,fn],["ReduceMax","","1+",kb,fn],["ReduceMean","","1+",Db,fn],["ReduceMin","","1+",Nb,fn],["ReduceProd","","1+",Lb,fn],["ReduceSum","","1-12",Cb,fn],["ReduceSumSquare","","1+",zb,fn],["Relu","","6+",xg],["Reshape","","5+",Bb],["Resize","","10",Vl,Wb],["Resize","","11+",Vl,Hb],["Shape","","1+",jb],["Sigmoid","","6+",wg],["Sin","","7+",Tg],["Slice","","10+",Yb],["Slice","","1-9",Xb,Zb],["Softmax","","1-12",ny,oy],["Softmax","","13+",ay,iy],["Split","","2-12",dy,py],["Sqrt","","6+",Ig],["Squeeze","","1-12",Ul,my],["Squeeze","","13+",hy],["Sub","","7+",qm],["Sum","","6+",by],["Tan","","7+",Sg],["Tanh","","6+",$g],["Tile","","6+",_y],["Transpose","","1+",Nn,Gg],["Upsample","","7-8",zl,Gb],["Upsample","","9",zl,Ub],["Unsqueeze","","1-12",Wl,wy],["Unsqueeze","","13+",xy],["Xor","","7+",jm]]});function Ay(n){let e={},r;for(;(r=$y.exec(n))!==null;){let t=r[3].split(",").map(o=>{let i=o.trim().split(" ");return i&&i.length===2?{type:i[0],name:i[1]}:null}).filter(o=>o!==null);e[r[2]]={params:t,body:r[4]}}for(let t in e){let o=r3.replace("__FUNC__",t),i=new RegExp(o,"gm");for(;(r=i.exec(n))!==null;){let a=r[1],s=r[2],u=r[3].split(","),c=a?`${a} ${s};`:"",d=e[t].body,f="";e[t].params.forEach((b,y)=>{b&&(f+=`${b.type} ${b.name} = ${u[y]};
`)}),d=`${f}
 ${d}`,d=d.replace("return",`${s} = `);let h=`
      ${c}
      {
        ${d}
      }
      `;n=n.replace(r[0],h)}}return n=n.replace($y,""),n}var $y,r3,Oy=k(()=>{"use strict";$y=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,r3="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function ro(n,e){let r=[],t=[],o=e!=null&&Array.isArray(e)&&e.length===0,i=e==null||o?null:n3(e,n).sort(),a=0;for(let s=0;s<n.length;++s){if(i!=null){if(i[a]===s&&n[s]!==1)throw new Error(`Can't squeeze axis ${s} since its dim '${n[s]}' is not 1`);(i[a]==null||i[a]>s)&&n[s]===1&&(r.push(n[s]),t.push(s)),i[a]<=s&&a++}n[s]!==1&&(r.push(n[s]),t.push(s))}return{newShape:r,keptDims:t}}function n3(n,e){let r=e.length;return n=n==null?e.map((t,o)=>o):[].concat(n),Zn(n.every(t=>t>=-r&&t<r),()=>`All values in axis param must be in range [-${r}, ${r}) but got axis ${n}`),Zn(n.every(o3),()=>`All values in axis param must be integers but got axis ${n}`),n.map(t=>t<0?r+t:t)}function o3(n){return n%1===0}function i3(n){if(n.length===0)return 1;let e=n[0];for(let r=1;r<n.length;r++)e*=n[r];return e}function Py(n){let e=Math.ceil(Math.sqrt(n));return[e,Math.ceil(n/e)]}var Xi,Hl=k(()=>{"use strict";Ct();Me();Xi=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,r){let t=this.computeTexture(e,r);return r&&r.isPacked&&(t[0]/=2,t[1]/=2),r&&r.reverseWH?[t[1],t[0]]:t}computeTexture(e,r){let t=r&&r.isPacked;if(e.length===0)return t?[2,2]:[1,1];let o=this.maxTextureSize;if(r&&r.breakAxis!==void 0){let s=r.breakAxis>=e.length?1:e.slice(r.breakAxis).reduce((c,d)=>c*d),u=r.breakAxis<=0?1:e.slice(0,r.breakAxis).reduce((c,d)=>c*d);if(s>o||u>o)Be.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${r.breakAxis}`);else return[s,u]}let i=e.slice(0);t&&(o=o*2,i=i.map((s,u)=>u>=i.length-2?i[u]%2===0?i[u]:i[u]+1:i[u]),i.length===1&&(i=[2,i[0]])),i.length!==2&&(i=ro(i).newShape);let a=i3(i);return i.length<=1&&a<=o?[1,a]:i.length===2&&i[0]<=o&&i[1]<=o?i:i.length===3&&i[0]*i[1]<=o&&i[2]<=o?[i[0]*i[1],i[2]]:i.length===3&&i[0]<=o&&i[1]*i[2]<=o?[i[0],i[1]*i[2]]:i.length===4&&i[0]*i[1]*i[2]<=o&&i[3]<=o?[i[0]*i[1]*i[2],i[3]]:i.length===4&&i[0]<=o&&i[1]*i[2]*i[3]<=o?[i[0],i[1]*i[2]*i[3]]:t?Py(a/4).map(s=>s*2):Py(a)}}});var Zi,Ey=k(()=>{"use strict";Me();Zr();Ze();Hl();Lr();Zi=class extends zt{constructor(e){super(e)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let e="offsetToCoords";return{offsetToCoords:new Z(`
      vec2 ${e}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){let e="coordsToOffset";return{coordsToOffset:new Z(`
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
    `,u="floatTextureSetRGBA";return o[u]=new Z(s),o}getUnpackedOutputSamplingSnippet(e){let r=e.unpackedShape,t=[e.width,e.height],o={},i="getOutputCoords";switch(r.length){case 0:o[i]=this.getOutputScalarCoords();break;case 1:o[i]=this.getOutputUnpacked1DCoords(r,t);break;case 2:o[i]=this.getOutputUnpacked2DCoords(r,t);break;case 3:o[i]=this.getOutputUnpacked3DCoords(r,t);break;case 4:o[i]=this.getOutputUnpacked4DCoords(r,t);break;case 5:o[i]=this.getOutputUnpacked5DCoords(r,t);break;case 6:o[i]=this.getOutputUnpacked6DCoords(r,t);break;default:throw new Error(`Unsupported output dimensionality: ${r.length}`)}let s=`
        void setOutput(float val) {
          ${se(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `,u="floatTextureSetR";return o[u]=new Z(s),o}getOutputScalarCoords(){return new Z(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(e,r){let t=r,o="";return t[0]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${t[1]}.0);
          }
        `,new Z(o)):t[1]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${t[0]}.0);
          }
        `,new Z(o)):(o=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${t[0]}, ${t[1]}));
          return 2 * (resTexRC.y * ${t[0]} + resTexRC.x);
        }
      `,new Z(o))}getOutputPacked2DCoords(e,r){let t="";if(An.arraysEqual(e,r))return t=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${r[0]}, ${r[1]}));
        }
      `,new Z(t);let o=r,i=Math.ceil(e[1]/2);return t=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${o[0]}, ${o[1]}));

          int index = resTexRC.y * ${o[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${i}) * 2;
          int c = 2 * (index / ${i});

          return ivec2(r, c);
        }
      `,new Z(t)}getOutputPacked3DCoords(e,r){let t=[r[0],r[1]],o=Math.ceil(e[2]/2),i=o*Math.ceil(e[1]/2),a=`
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
      `;return new Z(a)}getOutputPackedNDCoords(e,r){let t=[r[0],r[1]],o=Math.ceil(e[e.length-1]/2),i=o*Math.ceil(e[e.length-2]/2),a=i,s="",u="b, r, c";for(let d=2;d<e.length-1;d++)a*=e[e.length-d-1],s=`
      int b${d} = index / ${a};
      index -= b${d} * ${a};
    `+s,u=`b${d}, `+u;let c=`
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
    `;return new Z(c)}getOutputUnpacked1DCoords(e,r){let t=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          return resTexRC.y * ${r[0]} + resTexRC.x;
        }
      `;return new Z(t)}getOutputUnpacked2DCoords(e,r){let t=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          int r = index / ${e[1]};
          int c = index - r * ${e[1]};
          return ivec2(r, c);
        }
      `;return new Z(t)}getOutputUnpacked3DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d"],s=i.map((u,c)=>{let d=`int ${a[c]} = index / ${u}`,f=c===i.length-1?`int ${a[c+1]} = index - ${a[c]} * ${u}`:`index -= ${a[c]} * ${u}`;return`${d}; ${f};`}).join("");return t=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          ${s}
          return ivec3(r, c, d);
        }
      `,new Z(t)}getOutputUnpacked4DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2"],s=i.map((u,c)=>{let d=`int ${a[c]} = index / ${u}`,f=c===i.length-1?`int ${a[c+1]} = index - ${a[c]} * ${u}`:`index -= ${a[c]} * ${u}`;return`${d}; ${f};`}).join("");return t=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          ${s}
          return ivec4(r, c, d, d2);
        }
      `,new Z(t)}getOutputUnpacked5DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2","d3"],s=i.map((u,c)=>{let d=`int ${a[c]} = index / ${u}`,f=c===i.length-1?`int ${a[c+1]} = index - ${a[c]} * ${u}`:`index -= ${a[c]} * ${u}`;return`${d}; ${f};`}).join("");return t=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          ${s}
          return ivec5(r, c, d, d2, d3);
        }
      `,new Z(t)}getOutputUnpacked6DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2","d3","d4"],s=i.map((u,c)=>{let d=`int ${a[c]} = index / ${u}`,f=c===i.length-1?`int ${a[c+1]} = index - ${a[c]} * ${u}`:`index -= ${a[c]} * ${u}`;return`${d}; ${f};`}).join("");return t=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${r[0]}, ${r[1]}));
         int index = resTexRC.y * ${r[0]} + resTexRC.x;
         ${s}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new Z(t)}getCommonUtilFuncs(){let e={},r="uvFromFlat";e[r]=new Z(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),r="packedUVfrom1D",e[r]=new Z(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),r="packedUVfrom2D",e[r]=new Z(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),r="packedUVfrom3D",e[r]=new Z(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),r="sampleTexture";let t=se(this.context.glContext.version);return e[r]=new Z(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${t.texture2D}(textureSampler, uv).r;
        }`),e}getInputsSamplingSnippets(){let e={},r=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o],a=Li(t);i.isPacked?e[a]=this.getPackedSamplerFromInput(a,t,i):e[a]=this.getUnpackedSamplerFromInput(a,t,i);let s=bm(t);i.unpackedShape.length<=r.unpackedShape.length&&(i.isPacked?e[s]=this.getPackedSamplerAtOutputCoords(s,i,r,t):e[s]=this.getUnpackedSamplerAtOutputCoords(s,i,r,t))}),e}getPackedSamplerAtOutputCoords(e,r,t,o){let i=r.unpackedShape,a=t.unpackedShape,u=Li(o),c=i.length,d=a.length,f=mt.getBroadcastDims(i,a),h=gt(d),b=d-c,y,v=jt();c===0?y="":d<2&&f.length>=1?y="coords = 0;":y=f.map(z=>`coords.${v[z+b]} = 0;`).join(`
`);let T="";d<2&&c>0?T="coords":T=i.map((z,V)=>`coords.${v[V+b]}`).join(", ");let x="return outputValue;",I=ne.size(i)===1,P=ne.size(a)===1;if(c===1&&!I&&!P)x=`
        return vec4(outputValue.xy, outputValue.xy);
      `;else if(I&&!P)d===1?x=`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:x=`
          return vec4(outputValue.x);
        `;else if(f.length){let z=c-2,V=c-1;f.indexOf(z)>-1&&f.indexOf(V)>-1?x="return vec4(outputValue.x);":f.indexOf(z)>-1?x="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":f.indexOf(V)>-1&&(x="return vec4(outputValue.xx, outputValue.zz);")}let C=`
        int lastDim = coords.${v[d-1]};
        coords.${v[d-1]} = coords.${v[d-2]};
        coords.${v[d-2]} = lastDim;
      `,R=`
      vec4 ${e}() {
        ${h} coords = getOutputCoords();
        ${C}
        ${y}
        vec4 outputValue = ${u}(${T});
        ${x}
      }
    `;return new Z(R,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(e,r,t,o){let i=[t.width,t.height],a=[r.width,r.height],s=r.unpackedShape.length,u=t.unpackedShape.length,c=r.unpackedShape,d=t.unpackedShape,f=Li(o);if(s===u&&An.arraysEqual(a,i)){let I=`
          float ${e}() {
            return sampleTexture(${o}, TexCoords);
          }
        `;return new Z(I,["coordinates.sampleTexture"])}let h=gt(u),b=mt.getBroadcastDims(c,d),y=u-s,v,T=jt();s===0?v="":u<2&&b.length>=1?v="coords = 0;":v=b.map(I=>`coords.${T[I+y]} = 0;`).join(`
`);let x="";u<2&&s>0?x="coords":x=r.unpackedShape.map((I,A)=>`coords.${T[A+y]}`).join(", ");let w=`
        float ${e}() {
          ${h} coords = getOutputCoords();
          ${v}
          return ${f}(${x});
        }
      `;return new Z(w,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(e,r,t){switch(t.unpackedShape.length){case 0:return this.getPackedSamplerScalar(e,r);case 1:return this.getPackedSampler1D(e,r,t);case 2:return this.getPackedSampler2D(e,r,t);case 3:return this.getPackedSampler3D(e,r,t);default:return this.getPackedSamplerND(e,r,t)}}getUnpackedSamplerFromInput(e,r,t){let o=t.unpackedShape;switch(o.length){case 0:return this.getUnpackedSamplerScalar(e,r,t);case 1:return this.getUnpackedSampler1D(e,r,t);case 2:return this.getUnpackedSampler2D(e,r,t);case 3:return this.getUnpackedSampler3D(e,r,t);case 4:return this.getUnpackedSampler4D(e,r,t);case 5:return this.getUnpackedSampler5D(e,r,t);case 6:return this.getUnpackedSampler6D(e,r,t);default:throw new Error(`Unsupported dimension ${o.length}-D`)}}getPackedSamplerScalar(e,r){let t=se(this.context.glContext.version),o=`
          vec4 ${e}() {
            return ${t.texture2D}(${r}, halfCR);
          }
        `;return new Z(o)}getPackedSampler1D(e,r,t){let o=[t.width,t.height],i=[o[1],o[0]],a=se(this.context.glContext.version),u=`vec4 ${e}(int index) {
      vec2 uv = packedUVfrom1D(
      ${i[0]}, ${i[1]}, index);
      return ${a.texture2D}(${r}, uv);
    }`;return new Z(u,["coordinates.packedUVfrom1D"])}getPackedSampler2D(e,r,t){let o=t.unpackedShape,i=[t.width,t.height],a=se(this.context.glContext.version),s=i[0],u=i[1];if(i!=null&&An.arraysEqual(o,i)){let b=`vec4 ${e}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${u}.0, ${s}.0);
        return ${a.texture2D}(${r}, uv);
      }`;return new Z(b)}let c=i,d=Math.ceil(o[1]/2),h=`vec4 ${e}(int row, int col) {
      vec2 uv = packedUVfrom2D(${c[1]}, ${c[0]}, ${d}, row, col);
      return ${a.texture2D}(${r}, uv);
    }`;return new Z(h,["coordinates.packedUVfrom2D"])}getPackedSampler3D(e,r,t){let o=t.unpackedShape,i=[t.width,t.height],a=[i[0],i[1]],s=se(this.context.glContext.version);if(o[0]===1){let y=o.slice(1),v=[1,2],T=Jn(o,y),x=["b","row","col"],w=JSON.parse(JSON.stringify(t));w.unpackedShape=T;let I=this.getPackedSamplerFromInput(e,r,w),P=`${I.routineBody}
      vec4 ${e}(int b, int row, int col) {
        return ${e}(${Yn(x,v)});
      } `;return new Z(P,I.dependencies)}let u=a[0],c=a[1],d=Math.ceil(o[2]/2),f=d*Math.ceil(o[1]/2),b=`vec4 ${e}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${c}, ${u}, ${f}, ${d}, b, row, col);
      return ${s.texture2D}(${r}, uv);}`;return new Z(b,["coordinates.packedUVfrom3D"])}getPackedSamplerND(e,r,t){let o=t.unpackedShape,i=o.length,a=[t.width,t.height],s=se(this.context.glContext.version),u=[a[0],a[1]],c=u[1],d=u[0],f=Math.ceil(o[i-1]/2),h=f*Math.ceil(o[i-2]/2),b="int b, int row, int col",y=`b * ${h} + (row / 2) * ${f} + (col / 2)`;for(let x=2;x<i-1;x++)b=`int b${x}, `+b,h*=o[i-x-1],y=`b${x} * ${h} + `+y;let T=`vec4 ${e}(${b}) {
      int index = ${y};
      int texR = index / ${d};
      int texC = index - texR * ${d};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${d}, ${c});
      return ${s.texture2D}(${r}, uv);
    }`;return new Z(T)}getUnpackedSamplerScalar(e,r,t){let[o,i]=[t.width,t.height];if(o===1&&i===1){let s=`
          float ${e}() {
            return sampleTexture(${r}, halfCR);
          }
        `;return new Z(s,["coordinates.sampleTexture"])}let a=`
        float ${e}() {
          int offset_${r} = coordsToOffset(TexCoords, ${o}, ${i});
          vec2 uv = uvFromFlat(${o}, ${i}, offset_${r});
          return sampleTexture(${r}, uv);
        }
      `;return new Z(a,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(e,r,t){let o=t.width,i=t.height;if(i===1&&o===1){let s=`
        float ${e}(int index) {
          return sampleTexture(${r}, halfCR);
        }
      `;return new Z(s,["coordinates.sampleTexture"])}if(i===1){let s=`
          float ${e}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${o}.0, 0.5);
            return sampleTexture(${r}, uv);
          }
        `;return new Z(s,["coordinates.sampleTexture"])}if(o===1){let s=`
          float ${e}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${i}.0);
            return sampleTexture(${r}, uv);
          }
        `;return new Z(s,["coordinates.sampleTexture"])}let a=`
        float ${e}(int index) {
          vec2 uv = uvFromFlat(${o}, ${i}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new Z(a,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(e,r,t){let o=t.unpackedShape,i=[t.height,t.width];if(i!=null&&An.arraysEqual(o,i)){let h=i[1],b=i[0],y=`
          float ${e}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${h}.0, ${b}.0);
            return sampleTexture(${r}, uv);
          }
        `;return new Z(y,["coordinates.sampleTexture"])}let{newShape:a,keptDims:s}=ro(o),u=a;if(u.length<o.length){let h=Jn(o,u),b=JSON.parse(JSON.stringify(t));b.unpackedShape=h;let y=["col","row"],v=`
          ${this.getUnpackedSamplerFromInput(e,r,b).routineBody}
          float ${e}(int row, int col) {
            return ${e}(${Yn(y,s)});
          }
        `;return new Z(v,["coordinates.sampleTexture"])}let c=i[1],d=i[0];if(d===1){let h=`
          float ${e}(int row, int col) {
            int offset_${r} = coordsToOffset(TexCoords, ${c}, ${d});
            float index = dot(vec3(row, col, offset_${r}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${c}.0);
            return sampleTexture(${r}, uv);
          }
        `;return new Z(h,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(c===1){let h=`
          float ${e}(int row, int col) {
            int offset_${r} = coordsToOffset(TexCoords, ${c}, ${d});
            float index = dot(vec3(row, col, offset_${r}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${d}.0, 0.5);
            return sampleTexture(${r}, uv);
          }
        `;return new Z(h,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let f=`
        float ${e}(int row, int col) {
          int index = col * ${o[1]} + row;
          vec2 uv = uvFromFlat(${c}, ${d}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new Z(f,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(e,r,t){let o=t.unpackedShape,i=o[1]*o[2],a=o[2],{newShape:s,keptDims:u}=ro(o),c=s;if(c.length<o.length){let b=Jn(o,c),y=["batch","col","row"],v=JSON.parse(JSON.stringify(t));v.unpackedShape=b;let T=this.getUnpackedSamplerFromInput(e,r,v),x=u.reverse(),w=`
          ${T.routineBody}
          float ${e}(int batch, int row, int col) {
            return ${e}(${Yn(y,x)});
          }
        `;return new Z(w,T.dependencies)}let d=t.width,f=t.height,h=`
          float ${e}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${i} + col * ${a} + row;
            vec2 uv = uvFromFlat(${d}, ${f}, index);
            return sampleTexture(${r}, uv);
          }
      `;return new Z(h,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(e,r,t){let o=t.unpackedShape,i=o[3],a=o[2]*i,s=o[1]*a,u=t.width,c=t.height,d=`
        float ${e}(int row, int col, int depth, int depth2) {
          int index = row * ${s} + col * ${a} +
              depth2 * ${i} + depth;
          vec2 uv = uvFromFlat(${u}, ${c}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new Z(d,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(e,r,t){let o=t.unpackedShape,i=o[4],a=o[3]*i,s=o[2]*a,u=o[1]*s,{newShape:c,keptDims:d}=ro(o);if(c.length<o.length){let y=Jn(o,c),v=["row","col","depth","depth2","depth3"],T=JSON.parse(JSON.stringify(t));T.unpackedShape=y;let x=`
          ${this.getUnpackedSamplerFromInput(e,r,T).routineBody}
          float ${e}(int row, int col, int depth, int depth2, int depth3) {
            return ${e}(${Yn(v,d)});
          }
        `;return new Z(x,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let f=t.width,h=t.height,b=`
        float ${e}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${u} + col * ${s} + depth * ${a} +
          depth3 * ${i} + depth2;
          vec2 uv = uvFromFlat(${f}, ${h}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new Z(b,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(e,r,t){let o=t.unpackedShape,i=o[5],a=o[4]*i,s=o[3]*a,u=o[2]*s,c=o[1]*u,{newShape:d,keptDims:f}=ro(o);if(d.length<o.length){let v=Jn(o,d),T=["row","col","depth","depth2","depth3","depth4"],x=JSON.parse(JSON.stringify(t));x.unpackedShape=v;let w=`
            ${this.getUnpackedSamplerFromInput(e,r,x).routineBody}
            float ${e}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${e}(${Yn(T,f)});
            }
          `;return new Z(w,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let h=t.width,b=t.height,y=`
          float ${e}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${c} + col * ${u} + depth * ${s} +
            depth2 * ${a} + depth3 * ${i} + depth4;
            vec2 uv = uvFromFlat(${h}, ${b}, index);
            return sampleTexture(${r}, uv);
          }
        `;return new Z(y,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let e=this.context.outputTextureLayout,r=e.shape.length,t=e.strides,o=e.width,i=e.height,a=[];for(let u=0;u<r-1;++u)a.push(`
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
    `;return{toVec:new Z(s,["coordinates.coordsToOffset"])}}valueFrom(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t],a=(o.unpackedShape.length>0?o.unpackedShape:o.shape).length,s=`_${r}`;e[s]=new Z(this.getValueFromSingle(r,a,o.width,o.height,!1),[`shapeUtils.indicesToOffset${s}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),s=s+"_T",e[s]=new Z(this.getValueFromSingle(r,a,o.width,o.height,!0),[`shapeUtils.indicesToOffset${s}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),e}getValueFromSingle(e,r,t,o,i){let a=`_${e}`;i&&(a=a+"_T");let s=se(this.context.glContext.version);return`
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
        `}}});var Ji,Cy=k(()=>{"use strict";Zr();Ji=class n extends zt{constructor(e){super(e)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new Z(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new Z(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){let e=n.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new Z(`
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
        `)}}decodeUint8(){let e=n.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new Z(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${e}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){let e=new ArrayBuffer(4),r=new Uint32Array(e),t=new Uint8Array(e);if(r[0]=3735928559,t[0]===239)return!0;if(t[0]===222)return!1;throw new Error("unknown endianness")}}});var Yi,Dy=k(()=>{"use strict";Zr();Ze();Yi=class extends zt{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=se(this.context.glContext.version);return{setFragColor:new Z(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new Z(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}});var Qi,ky=k(()=>{"use strict";Zr();Qi=class n extends zt{constructor(e){super(e)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let e=this.context.outputTextureLayout.shape.length,r={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].unpackedShape;if(i.length<=e){let a=i.length,s=e-a,u=`bcastIndices_${t}`,c="";for(let f=0;f<a;++f)c+=`
          realIndices[${f}] = int( mod(float(bcastedIndices[${s+f}]), ${i[f]}.0) );
          `;let d=`
        void ${u} (int bcastedIndices[${e}], out int realIndices[${a}]) {
          ${c}
        }
        `;r[u]=new Z(d)}}),r}bcastMatmulIndex(){let e=this.context.outputTextureLayout.shape.length,r={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].shape;if(!(i.length<2||i.length>e)){let a=i.length,s=e-a,u=`bcastMatmulIndices_${t}`,c="";for(let f=0;f<a-2;++f)c+=`
          realIndices[${f}] = int( mod(float(bcastedIndices[${s+f}]), ${i[f]}.0) );
          `;let d=`
        void ${u}(int bcastedIndices[${e}], out int realIndices[${a}]) {
          ${c}
          realIndices[${a-1}] = bcastedIndices[${e-1}];
          realIndices[${a-2}] = bcastedIndices[${e-2}];
        }
        `;r[u]=new Z(d)}}),r}indicesToOffset(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,a=o.length,s=`indicesToOffset_${r}`;e[s]=new Z(n.indexToOffsetSingle(s,a,i)),s=`indicesToOffset_${r}_T`,e[s]=new Z(n.indexToOffsetSingle(s,a,i.slice().reverse()))}),e}static indexToOffsetSingle(e,r,t){let o="";for(let i=r-1;i>=0;--i)o+=`
        offset += indices[${i}] * ${t[i]};
        `;return`
      int ${e}(int indices[${r}]) {
        int offset = 0;
        ${o}
        return offset;
      }
      `}offsetToIndices(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,a=o.length,s=`offsetToIndices_${r}`;e[s]=new Z(n.offsetToIndicesSingle(s,a,i)),s=`offsetToIndices_${r}_T`,e[s]=new Z(n.offsetToIndicesSingle(s,a,i.slice().reverse()))}),e}static offsetToIndicesSingle(e,r,t){let o=[];for(let i=0;i<r-1;++i)o.push(`
      indices[${i}] = offset / ${t[i]};`),o.push(`
        offset -= indices[${i}] * ${t[i]};`);return o.push(`
      indices[${r-1}] = offset;`),`
      void ${e}(int offset, out int indices[${r}]) {
        ${o.join("")}
      }
      `}incrementIndices(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=o.length,a=`incrementIndices_${r}`,s="";for(let c=0;c<i;++c)s+=`
        shape[${c}] = ${o[c]};`;let u=`
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
        `;e[a]=new Z(u)}),e}}});var ea,Ny=k(()=>{"use strict";Zr();ea=class extends zt{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let r=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},o={};for(let i in t){let a=`${i}Vec`,s="";for(let c=0;c<r;++c)s+=`
          dest[${c}] ${t[i]} src[${c}];
          `;let u=`
        void ${a}(int src[${r}], out int dest[${r}]) {
          ${s}
        }
        `;o[a]=new Z(u)}return o}copyVec(){let r=this.context.outputTextureLayout.shape.length,t="";for(let i=0;i<r;++i)t+=`
        dest[${i}] = src[${i}];
        `;let o=`
      void copyVec(int src[${r}], out int dest[${r}]) {
        ${t}
      }
      `;return{copyVec:new Z(o)}}setVecItem(){let r=this.context.outputTextureLayout.shape.length,t=`
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
        `;return{setVecItem:new Z(o)}}getVecItem(){let r=this.context.outputTextureLayout.shape.length,t=`
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
    `;return{getVecItem:new Z(o)}}}});var ql,Ly=k(()=>{"use strict";Ey();Cy();Dy();ky();Ny();ql={encoding:Ji,fragcolor:Yi,vec:ea,shapeUtils:Qi,coordinates:Zi}});var ta,Ry=k(()=>{"use strict";Zr();Oy();Ly();Ze();ta=class{constructor(e,r,t,o){this.libs={};this.glslLibRoutineDependencyGraph={};this.context=new Bi(e,r,t,o),Object.keys(ql).forEach(a=>{let s=new ql[a](this.context);this.libs[a]=s});let i=this.glslLibRoutineDependencyGraph;for(let a in this.libs){let u=this.libs[a].getFunctions();for(let c in u){let d=a+"."+c,f;i[d]?(f=i[d],f.routineBody=u[c].routineBody):(f=new ko(d,u[c].routineBody),i[d]=f);let h=u[c].dependencies;if(h)for(let b=0;b<h.length;++b)if(i[h[b]])f.addDependency(i[h[b]]);else{let y=new ko(h[b]);i[h[b]]=y,f.addDependency(y)}}}}preprocess(){let e=this.context.programInfo,r=e.shaderSource;return this.context.programInfo.hasMain||(r=`${r}
      ${gm(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),r=Ay(r),`${mm(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(r)}
    ${r}`}getImports(e){let r=this.selectGlslLibRoutinesToBeIncluded(e);if(r.length===0)return"";let t="";for(let o=0;o<r.length;++o)if(r[o].routineBody)t+=r[o].routineBody+`
`;else throw new Error(`Missing body for the Glsl Library routine: ${r[o].name}`);return t}selectGlslLibRoutinesToBeIncluded(e){let r=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(t=>{let o=t.split(".")[1];e.indexOf(o)!==-1&&r.push(this.glslLibRoutineDependencyGraph[t])}),Fi.returnOrderedNodes(r)}getUniforms(e,r){let t=[];if(e)for(let o of e)t.push(`uniform sampler2D ${o};`);if(r)for(let o of r)t.push(`uniform ${o.type} ${o.name}${o.arrayLength?`[${o.arrayLength}]`:""};`);return t.join(`
`)}}});var ra,zy=k(()=>{"use strict";ft();Ct();Ry();Ze();ra=class{constructor(e,r,t){this.profiler=e;this.glContext=r;this.textureLayoutStrategy=t;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,r){this.repo.set(e,r)}run(e,r,t){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let o=this.glContext.gl,i=e.program;o.useProgram(i);try{this.bindOutput(t),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],r)}catch(a){throw Be.error("ProgramManager",e.programInfo.shaderSource),a}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,r,t){return this.profiler.event("backend","ProgramManager.build",()=>{let o=new ta(this.glContext,e,r,t),i=o.preprocess(),a=this.compile(i);return{programInfo:e,program:a,uniformLocations:this.getUniformLocations(a,o.context.programInfo.inputNames,o.context.programInfo.variables),attribLocations:this.getAttribLocations(a)}})}compile(e){if(!this.vertexShader){Be.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let o=hm(this.glContext.version);this.vertexShader=this.glContext.compileShader(o,this.glContext.gl.VERTEX_SHADER)}me.debug&&Be.verbose("ProrgramManager",`FragShader:
${e}
`);let r=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),t=this.glContext.createProgram(this.vertexShader,r);return this.glContext.deleteShader(r),t}bindOutput(e){let r=e.width,t=e.height;Be.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${r}/${t}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,r,t)}bindAttributes(e){let r=e.position,t=e.textureCoord;this.glContext.setVertexAttributes(r,t),this.attributesBound=!0}bindUniforms(e,r,t){let o=this.glContext.gl,i=0;for(let{name:a,type:s,location:u,arrayLength:c}of e){let d=r.find(f=>f.name===a)?.data;if(s!=="sampler2D"&&!d)throw new Error(`variable '${a}' does not have data defined in program info`);switch(s){case"sampler2D":this.bindTexture(t[i],u,i),i++;break;case"float":c?o.uniform1fv(u,d):o.uniform1f(u,d);break;case"int":c?o.uniform1iv(u,d):o.uniform1i(u,d);break;default:throw new Error(`Uniform not implemented: ${s}`)}}}bindTexture(e,r,t){this.glContext.bindTextureToUniform(e.texture,t,r)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,r,t){let o=[];if(r)for(let i of r)o.push({name:i,type:"sampler2D",location:this.getUniformLocation(e,i)});if(t)for(let i of t)o.push({...i,location:this.getUniformLocation(e,i.name)});return o}getUniformLocation(e,r){let o=this.glContext.gl.getUniformLocation(e,r);if(o===null)throw new Error(`Uniform ${r} not found.`);return o}getAttribLocation(e,r){return this.glContext.gl.getAttribLocation(e,r)}}});var na,My=k(()=>{"use strict";Ct();Co();na=class{constructor(e,r,t,o){this.glContext=e;this.layoutStrategy=r;this.profiler=t;this.config=o;this.pendingRead=new Map;o.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,r,t,o){let i=this.toEncoderType(e),a=this.glContext.getEncoder(i,r.channels||1,o);if(r.isPacked&&o===1)throw new Error("not implemented");let s=r.width,u=r.height,c,d;if(this.config.reuseTextures){c=`${s}x${u}_${a.format}_${a.internalFormat}_${a.textureType}`,d=this.inUseTextures.get(c),d||(d=[],this.inUseTextures.set(c,d));let h=this.idleTextures.get(c);if(h&&h.length>0){let b=h.pop();return d.push(b),o===1&&this.glContext.updateTexture(b,s,u,a,this.toTextureData(e,t)),b}}Be.verbose("TextureManager",`Creating new texture of size ${r.width}x${r.height}`);let f=this.glContext.allocateTexture(s,u,a,this.toTextureData(e,t));return this.config.reuseTextures&&(d.push(f),this.textureLookup.set(f,c)),f}readTexture(e,r,t){return t||(t=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let o=e.shape.reduce((a,s)=>a*s)*t,i=this.glContext.readTexture(e.texture,e.width,e.height,o,this.toEncoderType(r),t);return this.toTensorData(r,i)})}async readTextureAsync(e,r,t){let o=e.tensor.dataId;if(t||(t=1),this.pendingRead.has(o)){let i=this.pendingRead.get(o);return new Promise(a=>i?.push(a))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(o,[]);let i=e.shape.reduce((c,d)=>c*d)*t;await this.glContext.createAndWaitForFence();let a=this.glContext.readTexture(e.texture,e.width,e.height,i,this.toEncoderType(r),t),s=this.toTensorData(r,a),u=this.pendingRead.get(o);return this.pendingRead.delete(o),u?.forEach(c=>c(s)),s})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let r=e.shape.reduce((o,i)=>o*i),t=this.glContext.readTexture(e.texture,e.width,e.height,r*4,"byte",4);return new Float32Array(t.buffer,t.byteOffset,r)})}releaseTexture(e,r){let t;if(this.config.reuseTextures&&(t=this.textureLookup.get(e.texture),t)){r&&this.textureLookup.delete(t);let o=this.inUseTextures.get(t);if(o){let i=o.indexOf(e.texture);if(i!==-1){o.splice(i,1);let a=this.idleTextures.get(t);a||(a=[],this.idleTextures.set(t,a)),a.push(e.texture)}}}(!t||r)&&(Be.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,r){switch(e){case"int16":return r instanceof Int16Array?r:Int16Array.from(r);case"int32":return r instanceof Int32Array?r:Int32Array.from(r);case"int8":return r instanceof Int8Array?r:Int8Array.from(r);case"uint16":return r instanceof Uint16Array?r:Uint16Array.from(r);case"uint32":return r instanceof Uint32Array?r:Uint32Array.from(r);case"uint8":case"bool":return r instanceof Uint8Array?r:Uint8Array.from(r);case"float32":return r instanceof Float32Array?r:Float32Array.from(r);case"float64":return r instanceof Float64Array?r:Float64Array.from(r);default:throw new Error(`TensorData type ${e} is not supported`)}}toTextureData(e,r){if(r)return r instanceof Float32Array?r:new Float32Array(r)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}});var oa,By=k(()=>{"use strict";Ct();Of();Cm();Sy();zy();Hl();My();oa=class{constructor(e,r){this.backend=e;this.context=r;this.layoutStrategy=new Xi(e.glContext.maxTextureSize),this.programManager=new ra(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new na(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:e.textureCacheMode==="full"}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new Mi(this)}onGraphInitialized(e){let r=e.getValues().filter(t=>t.from===-1&&t.tensor).map(t=>t.tensor.dataId);this.initializers=new Set(r)}isInitializer(e){return this.initializers?this.initializers.has(e):!1}addInitializer(e){this.initializers.add(e)}getTextureData(e,r){return r?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,r,t=!1){Be.verbose("WebGLSessionHandler","Storing Texture data in cache"),t?this.packedTextureDataCache.set(e,r):this.unpackedTextureDataCache.set(e,r)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,r,t){let o=Af(e,r,Iy);return{impl:o.opImpl,context:o.opInit?o.opInit(e,t):e}}}});function a3(n){let e=0;for(;e<n.length&&n[e]();++e);return e-1}var Ro,Fy=k(()=>{"use strict";ft();Co();Co();Lr();Ro=class{constructor(e,r){this.frameBufferBound=!1;this.itemsToPoll=[];this.gl=e,this.version=r,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,r,t,o){let i=this.gl,a=i.createTexture();i.bindTexture(i.TEXTURE_2D,a),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);let s=o?t.encode(o,e*r):null;return i.texImage2D(i.TEXTURE_2D,0,t.internalFormat,e,r,0,t.format,t.textureType,s),this.checkError(),a}updateTexture(e,r,t,o,i){let a=this.gl;a.bindTexture(a.TEXTURE_2D,e);let s=o.encode(i,r*t);a.texSubImage2D(a.TEXTURE_2D,0,0,0,r,t,o.format,o.textureType,s),this.checkError()}attachFramebuffer(e,r,t){let o=this.gl;o.bindTexture(o.TEXTURE_2D,e),o.bindFramebuffer(o.FRAMEBUFFER,this.framebuffer),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0),this.checkError(),o.viewport(0,0,r,t),o.scissor(0,0,r,t)}readTexture(e,r,t,o,i,a){let s=this.gl;a||(a=1),this.frameBufferBound||this.attachFramebuffer(e,r,t);let u=this.getEncoder(i,a),c=u.allocate(r*t);return s.bindTexture(s.TEXTURE_2D,e),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,e,0),s.readPixels(0,0,r,t,s.RGBA,u.textureType,c),this.checkError(),u.decode(c,o)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,r){let t=this.gl;t.vertexAttribPointer(e,3,t.FLOAT,!1,20,0),t.enableVertexAttribArray(e),r!==-1&&(t.vertexAttribPointer(r,2,t.FLOAT,!1,20,12),t.enableVertexAttribArray(r)),this.checkError()}createProgram(e,r){let t=this.gl,o=t.createProgram();return t.attachShader(o,e),t.attachShader(o,r),t.linkProgram(o),o}compileShader(e,r){let t=this.gl,o=t.createShader(r);if(!o)throw new Error(`createShader() returned null with type ${r}`);if(t.shaderSource(o,e),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)===!1)throw new Error(`Failed to compile shader: ${t.getShaderInfoLog(o)}
Shader source:
${e}`);return o}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,r,t){let o=this.gl;o.activeTexture(o.TEXTURE0+r),this.checkError(),o.bindTexture(o.TEXTURE_2D,e),this.checkError(),o.uniform1i(t,r),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(me.debug){let e=this.gl,r=e.getError(),t="";switch(r){case e.NO_ERROR:return;case e.INVALID_ENUM:t="INVALID_ENUM";break;case e.INVALID_VALUE:t="INVALID_VALUE";break;case e.INVALID_OPERATION:t="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:t="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:t="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:t="CONTEXT_LOST_WEBGL";break;default:t=`Unknown WebGL Error: ${r.toString(16)}`}throw new Error(t)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,r,t=0){if(this.version===2)return new Ri(this.gl,r);switch(e){case"float":return t===1||this.isRenderFloat32Supported?new Eo(this.gl,r):new Eo(this.gl,r,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw new Error("not implemented");case"byte":return new zi(this.gl,r);default:throw new Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let r=0;r<this.maxTextureImageUnits;++r)e.activeTexture(e.TEXTURE0+r),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,r=e.createBuffer();if(!r)throw new Error("createBuffer() returned null");let t=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),this.checkError(),r}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw new Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),this.version===1&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw new Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){this.version===2?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r);let t=this.version===2?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,t,1,1,0,e.RGBA,e.FLOAT,null);let o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(r),e.deleteFramebuffer(o),i}checkRenderFloat32(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e=this.gl,r,t,o,i,a;try{r=e.createTexture(),t=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,r);let s=this.version===2?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,s,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),e.enable(e.BLEND),o=e.createShader(e.VERTEX_SHADER),!o||(e.shaderSource(o,"void main(){}"),e.compileShader(o),i=e.createShader(e.FRAGMENT_SHADER),!i)||(e.shaderSource(i,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(i),a=e.createProgram(),!a)?!1:(e.attachShader(a,o),e.attachShader(a,i),e.linkProgram(a),e.useProgram(a),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),a&&e.deleteProgram(a),o&&e.deleteShader(o),i&&e.deleteShader(i),t&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(t)),r&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(r))}}beginTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,r=this.disjointTimerQueryWebgl2Extension,t=e.createQuery();return e.beginQuery(r.TIME_ELAPSED_EXT,t),t}else throw new Error("WebGL1 profiling currently not supported.")}endTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,r=this.disjointTimerQueryWebgl2Extension;e.endQuery(r.TIME_ELAPSED_EXT);return}else throw new Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let r=!1,t=!1;if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let o=this.gl,i=this.disjointTimerQueryWebgl2Extension;r=o.getQueryParameter(e,o.QUERY_RESULT_AVAILABLE),t=o.getParameter(i.GPU_DISJOINT_EXT)}else throw new Error("WebGL1 profiling currently not supported");return r&&!t}getTimerResult(e){let r=0;if(this.version===2){let t=this.gl;r=t.getQueryParameter(e,t.QUERY_RESULT),t.deleteQuery(e)}else throw new Error("WebGL1 profiling currently not supported");return r/1e6}async waitForQueryAndGetTime(e){return await bl(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let r,t=e,o=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),o===null?r=()=>!0:r=()=>{let i=t.clientWaitSync(o,0,0);return i===t.ALREADY_SIGNALED||i===t.CONDITION_SATISFIED},{query:o,isFencePassed:r}}async pollFence(e){return new Promise(r=>{this.addItemToPoll(()=>e.isFencePassed(),()=>r())})}pollItems(){let e=a3(this.itemsToPoll.map(r=>r.isDoneFn));for(let r=0;r<=e;++r){let{resolveFn:t}=this.itemsToPoll[r];t()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,r){this.itemsToPoll.push({isDoneFn:e,resolveFn:r}),!(this.itemsToPoll.length>1)&&await bl(()=>(this.pollItems(),this.itemsToPoll.length===0))}}});function jl(n){let e;if((!n||n==="webgl2")&&"webgl2"in no?e=no.webgl2:(!n||n==="webgl")&&"webgl"in no&&(e=no.webgl),!e)try{let t=u3();e=Vy(t,n)}catch{let o=s3();e=Vy(o,n)}n=n||e.version===1?"webgl":"webgl2";let r=e.gl;return no[n]=e,r.isContextLost()?(delete no[n],jl(n)):(r.disable(r.DEPTH_TEST),r.disable(r.STENCIL_TEST),r.disable(r.BLEND),r.disable(r.DITHER),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SAMPLE_COVERAGE),r.enable(r.SCISSOR_TEST),r.enable(r.CULL_FACE),r.cullFace(r.BACK),e)}function Vy(n,e){let r={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1},t,o=r;if((!e||e==="webgl2")&&(t=n.getContext("webgl2",o),t))try{return new Ro(t,2)}catch(i){Be.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${i}`)}if((!e||e==="webgl")&&(t=n.getContext("webgl",o)||n.getContext("experimental-webgl",o),t))try{return new Ro(t,1)}catch(i){Be.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${i}`)}throw new Error("WebGL is not supported")}function s3(){if(typeof document>"u")throw new TypeError("failed to create canvas: document is not supported");let n=document.createElement("canvas");return n.width=1,n.height=1,n}function u3(){if(typeof OffscreenCanvas>"u")throw new TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var no,Gy=k(()=>{"use strict";Ct();Fy();no={}});var ia,Uy=k(()=>{"use strict";ft();Ct();By();Gy();ia=class{get contextId(){return me.webgl.contextId}set contextId(e){me.webgl.contextId=e}get matmulMaxBatchSize(){return me.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){me.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return me.webgl.textureCacheMode}set textureCacheMode(e){me.webgl.textureCacheMode=e}get pack(){return me.webgl.pack}set pack(e){me.webgl.pack=e}get async(){return me.webgl.async}set async(e){me.webgl.async=e}initialize(){try{return this.glContext=jl(this.contextId),typeof this.matmulMaxBatchSize!="number"&&(this.matmulMaxBatchSize=16),typeof this.textureCacheMode!="string"&&(this.textureCacheMode="full"),typeof this.pack!="boolean"&&(this.pack=!1),typeof this.async!="boolean"&&(this.async=!1),Be.setWithEnv(me),me.webgl.context||Object.defineProperty(me.webgl,"context",{value:this.glContext.gl}),Be.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return Be.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new oa(this,e)}dispose(){this.glContext.dispose()}}});async function Kl(n){if(n){let e=typeof n=="string"?[n]:n;for(let r of e){let t=Wy.get(r);if(t)return t;let o=await c3(r);if(o)return o}}else return Kl(["webgl"]);throw new Error("no available backend to use")}async function c3(n){let e=l3;if(typeof e[n]<"u"&&d3(e[n])){let r=e[n],t=r.initialize();if(typeof t=="object"&&"then"in t&&(t=await t),t)return Wy.set(n,r),r}}function d3(n){let e=n;return"initialize"in e&&typeof e.initialize=="function"&&"createSessionHandler"in e&&typeof e.createSessionHandler=="function"&&"dispose"in e&&typeof e.dispose=="function"}var Wy,l3,Hy=k(()=>{"use strict";Uy();Wy=new Map,l3={webgl:new ia}});var Xl,aa,qy=k(()=>{"use strict";Ct();Xl=class{constructor(e,r){this.op=e;this.node=r}},aa=class{constructor(e,r,t){this.graph=e;this.profiler=t;this.initialize(r)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let r=this.graph.getNodes();if(r.length!==e.length)throw new Error("The size of nodes and OPs do not match.");this._ops=e.map((t,o)=>new Xl(t,r[o])),this.reset(),this._starter=[],this._ops.forEach((t,o)=>{let i=!0;for(let a of t.node.inputs)if(!this._values[a]&&this.graph.getInputIndices().indexOf(a)===-1){i=!1;break}i&&this._starter.push(o)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,r){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let t=e.createInferenceHandler(),o=this.graph.getInputIndices();if(r.length!==o.length)throw new Error(`number of input tensors don't match the number of inputs to the model: actual: ${r.length} expected: ${o.length}`);r.forEach((d,f)=>{let h=o[f];this._values[h]=d});let i=this._starter.slice(0),a=this.graph.getValues(),s=this.graph.getNodes(),u=0;for(;u<i.length;){let d=i[u++],f=this._ops[d],h=f.node.inputs.map(T=>this._values[T]);if(h.indexOf(void 0)!==-1)throw new Error(`unresolved input detected: op: ${f.node}`);let b=h;Be.verbose("ExecPlan",`Running op:${f.node.name} (${b.map((T,x)=>`'${f.node.inputs[x]}': ${T.type}[${T.dims.join(",")}]`).join(", ")})`);let y=await this.profiler.event("node",f.node.name,async()=>f.op.impl(t,b,f.op.context));if(y.length!==f.node.outputs.length)throw new Error("the size of output does not match model definition.");y.forEach((T,x)=>{let w=f.node.outputs[x];if(this._values[w])throw new Error(`output [${w}] already has value: op:${f.node.name}`);this._values[w]=T});let v=new Set;y.forEach((T,x)=>{let w=f.node.outputs[x];for(let I of a[w].to){let A=s[I],P=!0;for(let C of A.inputs)if(!this._values[C]){P=!1;break}P&&v.add(I)}}),i.push(...v)}let c=[];for(let d=0;d<this.graph.getOutputIndices().length;d++){let f=this.graph.getOutputIndices()[d],h=this._values[f];if(h===void 0)throw new Error(`required output [${f}] does not have value`);f===0?await h.getData():h.data,c.push(h)}return Be.verbose("ExecPlan","disposing of inferenceHandler"),t.dispose(),c})}}});var Ae,zo,jy=k(()=>{"use strict";Io();Ae=Te(Xn());Cn();Me();zo=class n{constructor(e){if(this._attributes=new Map,e!=null){for(let r of e)r instanceof Ae.onnx.AttributeProto?this._attributes.set(r.name,[n.getValue(r),n.getType(r)]):r instanceof Oi.Attribute&&this._attributes.set(r.name(),[n.getValue(r),n.getType(r)]);if(this._attributes.size<e.length)throw new Error("duplicated attribute names")}}set(e,r,t){this._attributes.set(e,[t,r])}delete(e){this._attributes.delete(e)}getFloat(e,r){return this.get(e,"float",r)}getInt(e,r){return this.get(e,"int",r)}getString(e,r){return this.get(e,"string",r)}getTensor(e,r){return this.get(e,"tensor",r)}getFloats(e,r){return this.get(e,"floats",r)}getInts(e,r){return this.get(e,"ints",r)}getStrings(e,r){return this.get(e,"strings",r)}getTensors(e,r){return this.get(e,"tensors",r)}get(e,r,t){let o=this._attributes.get(e);if(o===void 0){if(t!==void 0)return t;throw new Error(`required attribute not found: ${e}`)}if(o[1]!==r)throw new Error(`type mismatch: expected ${r} but got ${o[1]}`);return o[0]}static getType(e){let r=e instanceof Ae.onnx.AttributeProto?e.type:e.type();switch(r){case Ae.onnx.AttributeProto.AttributeType.FLOAT:return"float";case Ae.onnx.AttributeProto.AttributeType.INT:return"int";case Ae.onnx.AttributeProto.AttributeType.STRING:return"string";case Ae.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case Ae.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case Ae.onnx.AttributeProto.AttributeType.INTS:return"ints";case Ae.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case Ae.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw new Error(`attribute type is not supported yet: ${Ae.onnx.AttributeProto.AttributeType[r]}`)}}static getValue(e){let r=e instanceof Ae.onnx.AttributeProto?e.type:e.type();if(r===Ae.onnx.AttributeProto.AttributeType.GRAPH||r===Ae.onnx.AttributeProto.AttributeType.GRAPHS)throw new Error("graph attribute is not supported yet");let t=this.getValueNoCheck(e);if(r===Ae.onnx.AttributeProto.AttributeType.INT&&xt.isLong(t))return xt.longToNumber(t);if(r===Ae.onnx.AttributeProto.AttributeType.INTS){let o=t,i=new Array(o.length);for(let a=0;a<o.length;a++){let s=o[a];i[a]=xt.longToNumber(s)}return i}if(r===Ae.onnx.AttributeProto.AttributeType.TENSOR)return e instanceof Ae.onnx.AttributeProto?ot.fromProto(t):ot.fromOrtTensor(t);if(r===Ae.onnx.AttributeProto.AttributeType.TENSORS){if(e instanceof Ae.onnx.AttributeProto)return t.map(i=>ot.fromProto(i));if(e instanceof Oi.Attribute)return t.map(i=>ot.fromOrtTensor(i))}return r===Ae.onnx.AttributeProto.AttributeType.STRING&&e instanceof Ae.onnx.AttributeProto?Po(t):r===Ae.onnx.AttributeProto.AttributeType.STRINGS&&e instanceof Ae.onnx.AttributeProto?t.map(Po):t}static getValueNoCheck(e){return e instanceof Ae.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(e):this.getValueNoCheckFromOrtFormat(e)}static getValueNoCheckFromOnnxFormat(e){switch(e.type){case Ae.onnx.AttributeProto.AttributeType.FLOAT:return e.f;case Ae.onnx.AttributeProto.AttributeType.INT:return e.i;case Ae.onnx.AttributeProto.AttributeType.STRING:return e.s;case Ae.onnx.AttributeProto.AttributeType.TENSOR:return e.t;case Ae.onnx.AttributeProto.AttributeType.GRAPH:return e.g;case Ae.onnx.AttributeProto.AttributeType.FLOATS:return e.floats;case Ae.onnx.AttributeProto.AttributeType.INTS:return e.ints;case Ae.onnx.AttributeProto.AttributeType.STRINGS:return e.strings;case Ae.onnx.AttributeProto.AttributeType.TENSORS:return e.tensors;case Ae.onnx.AttributeProto.AttributeType.GRAPHS:return e.graphs;default:throw new Error(`unsupported attribute type: ${Ae.onnx.AttributeProto.AttributeType[e.type]}`)}}static getValueNoCheckFromOrtFormat(e){switch(e.type()){case Lt.AttributeType.FLOAT:return e.f();case Lt.AttributeType.INT:return e.i();case Lt.AttributeType.STRING:return e.s();case Lt.AttributeType.TENSOR:return e.t();case Lt.AttributeType.GRAPH:return e.g();case Lt.AttributeType.FLOATS:return e.floatsArray();case Lt.AttributeType.INTS:{let r=[];for(let t=0;t<e.intsLength();t++)r.push(e.ints(t));return r}case Lt.AttributeType.STRINGS:{let r=[];for(let t=0;t<e.stringsLength();t++)r.push(e.strings(t));return r}case Lt.AttributeType.TENSORS:{let r=[];for(let t=0;t<e.tensorsLength();t++)r.push(e.tensors(t));return r}default:throw new Error(`unsupported attribute type: ${Lt.AttributeType[e.type()]}`)}}}});var Jl,Yl,Mr,sa,Zl,Ky=k(()=>{"use strict";jy();Io();Jl=Te(Xn());Cn();Me();Yl={from:(n,e)=>new Zl(n,e)},Mr=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=pt.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},sa=class{constructor(e,r){e instanceof Jl.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new zo(e.attribute)):e instanceof Qu.Node&&(this.name=r??e.name(),this.opType=e.opType(),this.attributes=new zo(pt.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},Zl=class{constructor(e,r){if(!e)throw new TypeError("graph is empty");this.buildGraph(e),this.transformGraph(r),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof Jl.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof Ju.Graph)this.buildGraphFromOrtFormat(e);else throw new TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let r=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map;if(!e.input)throw new Error("missing information in graph: input");let o=[];for(let i of e.input){if(r.has(i.name))throw new Error(`duplicated input name: ${i.name}`);let a=this._allData.push(new Mr(i))-1;r.set(i.name,a),o.push(i.name)}if(!e.initializer)throw new Error("missing information in graph: initializer");for(let i of e.initializer){let a=r.get(i.name);if(a===void 0){let s=new Mr;s.type={shape:{dims:pt.tensorDimsFromProto(i.dims)},tensorType:pt.tensorDataTypeFromProto(i.dataType)},a=this._allData.push(s)-1,r.set(i.name,a)}this._allData[a]._from=-1,this._allData[a].tensor=ot.fromProto(i)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));if(!e.output)throw new Error("missing information in graph: output");for(let i of e.output){if(r.has(i.name))throw new Error(`duplicated output name: ${i.name}`);let a=this._allData.push(new Mr(i))-1;r.set(i.name,a),this._allOutputIndices.push(a),this._allOutputNames.push(i.name)}if(!e.node)throw new Error("missing information in graph: node");for(let i of e.node){if(!i.name)for(let s=0;;s++){let u=`unnamed_${i.opType}_${s}`;if(!t.has(u)){i.name=u;break}}if(t.has(i.name))throw new Error(`duplicated node name: ${i.name}`);let a=this._nodes.push(new sa(i))-1;t.set(i.name,a)}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.node[i];if(!s.output)throw new Error(`missing output for node: ${s.name}`);for(let u of s.output){let c=r.get(u);if(typeof c>"u"&&(c=this._allData.push(new Mr)-1,r.set(u,c)),a.outputs.push(c),this._allData[c]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${c}`);if(this._allData[c]._from=i,s.opType==="Constant"){if(!s.attribute||s.attribute.length!==1||!s.attribute[0].t)throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!s.output||s.output.length!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");a.outputs.pop(),a.executeNode=!1,this._allData[c]._from=-1,this._allData[c].tensor=ot.fromProto(s.attribute[0].t)}}}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.node[i];if(!s.input)throw new Error(`missing input for node: ${s.name}`);for(let u of s.input){let c=r.get(u);if(typeof c>"u"){if(u===""&&(s.input.length===3||s.input.length===4)&&s.opType==="Resize")continue;throw new Error(`unrecognized input '${u}' for node: ${s.name}`)}a.inputs.push(c),this._allData[c]._to.push(i)}}return!0}buildGraphFromOrtFormat(e){let r=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map,o=[];for(let i=0;i<e.inputsLength();i++){let a=e.inputs(i);if(r.has(a))throw new Error(`duplicated input name: ${a}`);for(let s=0;s<e.nodeArgsLength();s++)if(e.nodeArgs(s)?.name()===a){let u=new Mr;if(e.nodeArgs(s)?.type()?.valueType()!==tl.TypeInfoValue.tensor_type)throw new Error("Unexpected value type for the nodeArg.");let d=e.nodeArgs(s).type().value(new el.TensorTypeAndShape),f=pt.tensorDataTypeFromProto(d.elemType()),h=d.shape(),b=[];for(let v=0;v<h.dimLength();v++)b.push(xt.longToNumber(h.dim(v).value().dimValue()));u.type={shape:{dims:b},tensorType:f};let y=this._allData.push(u)-1;r.set(a,y),o.push(a)}}for(let i=0;i<e.initializersLength();i++){let a=e.initializers(i),s=r.get(a.name());if(s===void 0){let u=new Mr,c=pt.tensorDimsFromORTFormat(a),d=pt.tensorDataTypeFromProto(a.dataType());u.type={shape:{dims:c},tensorType:d},s=this._allData.push(u)-1,r.set(a.name(),s)}this._allData[s]._from=-1,this._allData[s].tensor=ot.fromOrtTensor(a)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));for(let i=0;i<e.outputsLength();i++){let a=e.outputs(i);if(r.has(a))throw new Error(`duplicated output name: ${a}`);let s=this._allData.push(new Mr)-1;r.set(a,s),this._allOutputIndices.push(s),this._allOutputNames.push(a)}if(!e.nodes)throw new Error("missing information in graph: node");for(let i=0;i<e.nodesLength();i++){let a=e.nodes(i),s=a.name();if(!s)for(let c=0;s=`unnamed_${a.opType()}_${c}`,!!t.has(s);c++);if(t.has(s))throw new Error(`duplicated node name: ${s}`);let u=this._nodes.push(new sa(a,s))-1;t.set(s,u)}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.nodes(i);if(s==null)throw new Error(`No node exists at index ${i}`);if(s?.outputsLength()===0)throw new Error(`missing output for node: ${s.name}`);for(let u=0;u<s?.outputsLength();u++){let c=s?.outputs(u),d=r.get(c);if(typeof d>"u"&&(d=this._allData.push(new Mr)-1,r.set(c,d)),a.outputs.push(d),this._allData[d]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${d}`);if(this._allData[d]._from=i,s.opType()==="Constant"){if(s.attributesLength()!==1||!s.attributes(0).t())throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(s.outputsLength()!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");a.outputs.pop(),a.executeNode=!1,this._allData[d]._from=-1,this._allData[d].tensor=ot.fromOrtTensor(s.attributes(0).t())}}}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.nodes(i);if(s.inputsLength()===0)throw new Error(`missing input for node: ${s.name}`);for(let u=0;u<s.inputsLength();u++){let c=s.inputs(u),d=r.get(c);if(typeof d>"u")throw new Error(`unrecognized input '${c}' for node: ${s.name()}`);a.inputs.push(d),this._allData[d]._to.push(i)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(o=>{this._allData[o]._to.forEach(a=>{e.add(a)})});let r=Array.from(e),t=new Array(this._nodes.length).fill("white");for(;r.length>0;){let o=r.pop();t[o]==="gray"?t[o]="black":(r.push(o),t[o]="gray",this._nodes[o].outputs.forEach(i=>{let a=this._allData[i];if(typeof a.tensor<"u")throw new Error("node outputs should not be initialized");if(a._from!==o)throw new Error("from property of the Value object doesn't match index of Node being processed");a._to.forEach(s=>{if(t[s]==="gray")throw new Error("model graph is cyclic");t[s]==="white"&&r.push(s)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,r=new Array(this._nodes.length,0),t=0;for(let o=0;o<this._nodes.length;o++)r[o]=t,this._nodes[o].executeNode?(t!==o&&(this._nodes[t]=this._nodes[o]),t++):this._nodes[o].outputs.forEach(i=>{this._allData[i]._from=-2});this._nodes.splice(t,this._nodes.length-t);for(let o=0;o<this._allData.length;o++){let i=this._allData[o];i._from!==void 0&&i._from!==-1&&i._from!==-2&&(i._from=r[i._from]);for(let a=0;a<i._to.length;a++)if(i._to[a]>=0)i._to[a]=r[i._to[a]];else throw new Error("Trying to update a removed node")}e=0;for(let o=0;o<this._allData.length;o++){if(this._allData[o].from===-2&&this._allOutputIndices.indexOf(o+e)===-1){e++,this._allData.splice(o,1),o--;continue}if(e>0){let i=-1;this._allData[o].from!==void 0&&this._allData[o].from!==-1?(i=this._nodes[this._allData[o].from].outputs.indexOf(o+e),i!==-1&&(this._nodes[this._allData[o].from].outputs[i]=o)):(i=this._allInputIndices.indexOf(o+e),i!==-1&&(this._allInputIndices[i]=o)),this._allData[o].to.forEach(a=>{i=this._nodes[a].inputs.indexOf(o+e),i!==-1&&(this._nodes[a].inputs[i]=o)}),this._allData[o].to.length===0&&(i=this._allOutputIndices.indexOf(o+e),i!==-1&&(this._allOutputIndices[i]=o))}}}deleteNode(e){let r=this._nodes[e];if(r.outputs.length>1){for(let s=1;s<r.outputs.length;s++)if(this._allData[r.outputs[s]].to.length>0)throw new Error("Node deletion with more than one output connected to other nodes is not supported. ")}r.executeNode=!1;let t=r.inputs[0],o=r.outputs[0],i=this._allData[o].to;for(let s=0;s<r.inputs.length;s++){let u=this._allData[r.inputs[s]].to.indexOf(e);if(u===-1)throw new Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[r.inputs[s]].to.splice(u,1)}this._allData[o]._to=[];let a=this._allOutputIndices.indexOf(o);if(a!==-1&&(this._allOutputIndices[a]=t),i&&i.length>0)for(let s of i){let u=this._nodes[s].inputs.indexOf(o);if(u===-1)throw new Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[s].inputs[u]=t,this._allData[t].to.push(s)}}removeAllDropoutNodes(){let e=0;for(let r of this._nodes){if(r.opType==="Dropout"){if(r.inputs.length!==1)throw new Error("Dropout nodes should only contain one input. ");if(r.outputs.length!==1&&r.outputs.length!==2)throw new Error("Dropout nodes should contain either 1 or 2 output(s)");if(r.outputs.length===2&&this._allData[r.outputs[1]]._to.length!==0)throw new Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let r of this._nodes)r.opType==="Identity"&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if(e.opType==="Conv"){let r=this._allData[e.outputs[0]]._to;if(r.length===1&&this.isActivation(this._nodes[r[0]])){let t=this._nodes[r[0]];if(t.opType==="Clip")if(t.inputs.length===1)try{e.attributes.set("activation_params","floats",[t.attributes.getFloat("min"),t.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[Pn,En])}else if(t.inputs.length>=3&&this._allData[t.inputs[1]].tensor!==void 0&&this._allData[t.inputs[2]].tensor!==void 0)e.attributes.set("activation_params","floats",[this._allData[t.inputs[1]].tensor.floatData[0],this._allData[t.inputs[2]].tensor.floatData[0]]);else continue;e.attributes.set("activation","string",t.opType),this.deleteNode(r[0])}}}}});var Xy,Zy,ua,Jy=k(()=>{"use strict";Xy=Te(ze());Ky();Io();Zy=Te(Xn());Me();ua=class{constructor(){}load(e,r,t){let o;if(!t)try{this.loadFromOnnxFormat(e,r);return}catch(i){if(t!==void 0)throw i;o=i}try{this.loadFromOrtFormat(e,r)}catch(i){throw t!==void 0?i:new Error(`Failed to load model as ONNX format: ${o}
as ORT format: ${i}`)}}loadFromOnnxFormat(e,r){let t=Zy.onnx.ModelProto.decode(e);if(xt.longToNumber(t.irVersion)<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=t.opsetImport.map(i=>({domain:i.domain,version:xt.longToNumber(i.version)})),this._graph=Yl.from(t.graph,r)}loadFromOrtFormat(e,r){let t=new Xy.ByteBuffer(e),o=Yu.InferenceSession.getRootAsInferenceSession(t).model();if(xt.longToNumber(o.irVersion())<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let a=0;a<o.opsetImportLength();a++){let s=o.opsetImport(a);this._opsets.push({domain:s?.domain(),version:xt.longToNumber(s.version())})}this._graph=Yl.from(o.graph(),r)}get graph(){return this._graph}get opsets(){return this._opsets}}});var la,Yy=k(()=>{"use strict";Hy();qy();Ct();Jy();la=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=hi.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,r,t){await this.profiler.event("session","Session.loadModel",async()=>{let o=await Kl(this.backendHint);if(this.sessionHandler=o.createSessionHandler(this.context),this._model=new ua,typeof e=="string"){let i=e.endsWith(".ort");{let s=await(await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(s),i)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let i=new Uint8Array(e,r||0,t||e.byteLength);this.initialize(i)}})}initialize(e,r){if(this._initialized)throw new Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let t=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,t,r),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new aa(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw new Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let r=this.normalizeAndValidateInputs(e),t=await this._executionPlan.execute(this.sessionHandler,r);return this.createOutput(t)})}normalizeAndValidateInputs(e){let r=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==r.length)throw new Error(`incorrect input array length: expected ${r.length} but got ${e.length}`)}else{if(e.size!==r.length)throw new Error(`incorrect input map size: expected ${r.length} but got ${e.size}`);let t=new Array(e.size),o=0;for(let i=0;i<r.length;++i){let a=e.get(r[i]);if(!a)throw new Error(`missing input tensor for: '${name}'`);t[o++]=a}e=t}if(!this.context.graphInputTypes||this.context.graphInputTypes.length===0||!this.context.graphInputDims||this.context.graphInputDims.length===0){let t=this._model.graph.getInputIndices(),o=this._model.graph.getValues(),i=new Array(t.length);for(let a=0;a<t.length;++a){let s=o[t[a]];i[a]=s.type.shape.dims,this.context.graphInputTypes.push(s.type.tensorType),this.context.graphInputDims.push(e[a].dims)}this.validateInputTensorDims(i,e,!0)}else this.validateInputTensorDims(this.context.graphInputDims,e,!1);return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,r){for(let t=0;t<r.length;t++){let o=e[t],i=r[t].type;if(o!==i)throw new Error(`input tensor[${t}] check failed: expected type '${o}' but got ${i}`)}}validateInputTensorDims(e,r,t){for(let o=0;o<r.length;o++){let i=e[o],a=r[o].dims;if(!this.compareTensorDims(i,a,t))throw new Error(`input tensor[${o}] check failed: expected shape '[${i.join(",")}]' but got [${a.join(",")}]`)}}compareTensorDims(e,r,t){if(e.length!==r.length)return!1;for(let o=0;o<e.length;++o)if(e[o]!==r[o]&&(!t||e[o]!==0))return!1;return!0}createOutput(e){let r=this._model.graph.getOutputNames();if(e.length!==r.length)throw new Error("expected number of outputs do not match number of generated outputs");let t=new Map;for(let o=0;o<r.length;++o)t.set(r[o],e[o]);return t}initializeOps(e){let r=e.getNodes();this._ops=new Array(r.length);for(let t=0;t<r.length;t++)this._ops[t]=this.sessionHandler.resolve(r[t],this._model.opsets,e)}}});var ca,Qy=k(()=>{"use strict";ft();Cn();ca=class{constructor(e){this.session=e;this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}async dispose(){}async run(e,r,t){let o=new Map;for(let s in e)if(Object.hasOwnProperty.call(e,s)){let u=e[s];o.set(s,new ot(u.dims,u.type,void 0,void 0,u.data))}let i=await this.session.run(o),a={};return i.forEach((s,u)=>{a[u]=new St(s.type,s.data,s.dims)}),a}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}});var e_={};Hn(e_,{onnxjsBackend:()=>p3});var Ql,p3,t_=k(()=>{"use strict";Yy();Qy();Ql=class{async init(){}async createInferenceSessionHandler(e,r){let t=new la(r);return typeof e=="string"?await t.loadModel(e):await t.loadModel(e),new ca(t)}},p3=new Ql});var da=k(()=>{"use strict"});var o_={};Hn(o_,{default:()=>f3});var r_,n_,f3,i_=k(()=>{"use strict";ec();hn();pa();r_="ort-wasm-proxy-worker",n_=globalThis.self?.name===r_;n_&&(self.onmessage=n=>{let{type:e,in:r}=n.data;try{switch(e){case"init-wasm":fa(r.wasm).then(()=>{ha(r).then(()=>{postMessage({type:e})},t=>{postMessage({type:e,err:t})})},t=>{postMessage({type:e,err:t})});break;case"init-ep":{let{epName:t,env:o}=r;ma(o,t).then(()=>{postMessage({type:e})},i=>{postMessage({type:e,err:i})});break}case"copy-from":{let{buffer:t}=r,o=Mo(t);postMessage({type:e,out:o});break}case"create":{let{model:t,options:o}=r;ga(t,o).then(i=>{postMessage({type:e,out:i})},i=>{postMessage({type:e,err:i})});break}case"release":ba(r),postMessage({type:e});break;case"run":{let{sessionId:t,inputIndices:o,inputs:i,outputIndices:a,options:s}=r;ya(t,o,i,a,new Array(a.length).fill(null),s).then(u=>{u.some(c=>c[3]!=="cpu")?postMessage({type:e,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:e,out:u},va([...i,...u]))},u=>{postMessage({type:e,err:u})});break}case"end-profiling":_a(r),postMessage({type:e});break;default:}}catch(t){postMessage({type:e,err:t})}});f3=n_?null:n=>new Worker(n??Ot,{type:"module",name:r_})});var s_={};Hn(s_,{default:()=>h3});var tc,a_,h3,m3,u_=k(()=>{"use strict";a_=(tc=import.meta.url,async function(n={}){var e,r,t=n,o=new Promise((l,p)=>{e=l,r=p}),i=typeof window=="object",a=typeof WorkerGlobalScope<"u",s=a&&self.name?.startsWith("em-pthread");t.mountExternalData=(l,p)=>{l.startsWith("./")&&(l=l.substring(2)),(t.Bd||(t.Bd=new Map)).set(l,p)},t.unmountExternalData=()=>{delete t.Bd};var u=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let c=()=>{let l=(m,g,_)=>(...S)=>{let O=er,L=g?.();S=m(...S);let B=g?.();return L!==B&&(m=B,_(L),g=_=null),er!=O?new Promise((H,J)=>{bs={resolve:H,reject:J}}):S},p=m=>async(...g)=>{try{if(t.Cd)throw Error("Session already started");let _=t.Cd={be:g[0],errors:[]},S=await m(...g);if(t.Cd!==_)throw Error("Session mismatch");t.Dd?.flush();let O=_.errors;if(0<O.length){let L=await Promise.all(O);if(L=L.filter(B=>B),0<L.length)throw Error(L.join(`
`))}return S}finally{t.Cd=null}};t._OrtCreateSession=l(t._OrtCreateSession,()=>t._OrtCreateSession,m=>t._OrtCreateSession=m),t._OrtRun=p(l(t._OrtRun,()=>t._OrtRun,m=>t._OrtRun=m)),t._OrtRunWithBinding=p(l(t._OrtRunWithBinding,()=>t._OrtRunWithBinding,m=>t._OrtRunWithBinding=m)),t._OrtBindInput=l(t._OrtBindInput,()=>t._OrtBindInput,m=>t._OrtBindInput=m),c=void 0};t.jsepInit=(l,p)=>{if(c?.(),l==="webgpu"){[t.Dd,t.Rd,t.Vd,t.Hd,t.Ud,t.hc,t.Wd,t.Zd,t.Sd,t.Td,t.Xd]=p;let m=t.Dd;t.jsepRegisterBuffer=(g,_,S,O)=>m.registerBuffer(g,_,S,O),t.jsepGetBuffer=g=>m.getBuffer(g),t.jsepCreateDownloader=(g,_,S)=>m.createDownloader(g,_,S),t.jsepOnCreateSession=g=>{m.onCreateSession(g)},t.jsepOnReleaseSession=g=>{m.onReleaseSession(g)},t.jsepOnRunStart=g=>m.onRunStart(g),t.$d=(g,_)=>{m.upload(g,_)}}else if(l==="webnn"){[t.Dd,t.Yd,t.Id,t.jsepEnsureTensor,t.Jd,t.jsepDownloadTensor]=p,t.jsepReleaseTensorId=t.Id,t.jsepUploadTensor=t.Jd;let m=t.Dd;t.jsepOnRunStart=g=>m.onRunStart(g),t.jsepOnRunEnd=m.onRunEnd.bind(m),t.jsepRegisterMLContext=(g,_)=>{m.registerMLContext(g,_)},t.jsepOnReleaseSession=g=>{m.onReleaseSession(g)},t.jsepCreateMLTensorDownloader=(g,_)=>m.createMLTensorDownloader(g,_),t.jsepRegisterMLTensor=(g,_,S,O)=>m.registerMLTensor(g,_,S,O),t.jsepCreateMLContext=g=>m.createMLContext(g),t.jsepRegisterMLConstant=(g,_,S,O,L)=>m.registerMLConstant(g,_,S,O,L,t.Bd),t.jsepRegisterGraphInput=m.registerGraphInput.bind(m),t.jsepIsGraphInput=m.isGraphInput.bind(m),t.jsepCreateTemporaryTensor=m.createTemporaryTensor.bind(m)}};var d,f,h=Object.assign({},t),b=(l,p)=>{throw p},y="";(i||a)&&(a?y=self.location.href:typeof document<"u"&&document.currentScript&&(y=document.currentScript.src),tc&&(y=tc),y=y.startsWith("blob:")?"":y.slice(0,y.replace(/[?#].*/,"").lastIndexOf("/")+1),a&&(f=l=>{var p=new XMLHttpRequest;return p.open("GET",l,!1),p.responseType="arraybuffer",p.send(null),new Uint8Array(p.response)}),d=async l=>{if(ve(l))return new Promise((m,g)=>{var _=new XMLHttpRequest;_.open("GET",l,!0),_.responseType="arraybuffer",_.onload=()=>{_.status==200||_.status==0&&_.response?m(_.response):g(_.status)},_.onerror=g,_.send(null)});var p=await fetch(l,{credentials:"same-origin"});if(p.ok)return p.arrayBuffer();throw Error(p.status+" : "+p.url)});var v=console.log.bind(console),T=console.error.bind(console),x=v,w=T;Object.assign(t,h),h=null;var I,A,P,C,R,z,V,X,Q,pe,W,ue,Ve,te=t.wasmBinary,le=!1,ve=l=>l.startsWith("file://");function ee(){return I.buffer!=C.buffer&&Le(),C}function we(){return I.buffer!=C.buffer&&Le(),R}function nt(){return I.buffer!=C.buffer&&Le(),z}function je(){return I.buffer!=C.buffer&&Le(),V}function M(){return I.buffer!=C.buffer&&Le(),X}function F(){return I.buffer!=C.buffer&&Le(),Q}function re(){return I.buffer!=C.buffer&&Le(),pe}function Oe(){return I.buffer!=C.buffer&&Le(),Ve}if(s){let l=function(p){try{var m=p.data,g=m.yd;if(g==="load"){let _=[];self.onmessage=S=>_.push(S),self.startWorker=()=>{postMessage({yd:"loaded"});for(let S of _)l(S);self.onmessage=l};for(let S of m.Od)t[S]&&!t[S].proxy||(t[S]=(...O)=>{postMessage({yd:"callHandler",Nd:S,args:O})},S=="print"&&(x=t[S]),S=="printErr"&&(w=t[S]));I=m.he,Le(),Vt(m.ie)}else if(g==="run"){Jw(m.xd),xs(m.xd,0,0,1,0,0),Xc(),ms(m.xd),Ue||(Ud(),Ue=!0);try{Yw(m.de,m.Fd)}catch(_){if(_!="unwind")throw _}}else m.target!=="setimmediate"&&(g==="checkMailbox"?Ue&&Xo():g&&(w(`worker: received unknown command ${g}`),w(m)))}catch(_){throw Wd(),_}};var VD=l,Vt,Ue=!1;w=function(...p){p=p.join(" "),console.error(p)},self.alert=function(...p){postMessage({yd:"alert",text:p.join(" "),fe:ni()})},self.onunhandledrejection=p=>{throw p.reason||p},self.onmessage=l}function Le(){var l=I.buffer;t.HEAP8=C=new Int8Array(l),t.HEAP16=z=new Int16Array(l),t.HEAPU8=R=new Uint8Array(l),t.HEAPU16=V=new Uint16Array(l),t.HEAP32=X=new Int32Array(l),t.HEAPU32=Q=new Uint32Array(l),t.HEAPF32=pe=new Float32Array(l),t.HEAPF64=Ve=new Float64Array(l),t.HEAP64=W=new BigInt64Array(l),t.HEAPU64=ue=new BigUint64Array(l)}function Yt(){s?startWorker(t):G.Bb()}s||(I=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),Le());var co,_n=0,po=null;function Gc(){if(--_n==0&&po){var l=po;po=null,l()}}function qr(l){throw w(l="Aborted("+l+")"),le=!0,l=new WebAssembly.RuntimeError(l+". Build with -sASSERTIONS for more info."),r(l),l}function Uc(){return{a:{Ta:Zw,Va:Xw,W:Qw,la:eT,b:rT,u:nT,R:oT,Za:iT,d:aT,pb:Qc,g:tT,T:rd,Ga:nd,lb:id,nb:ad,Ha:sd,Ea:ud,wb:ld,Da:cd,pa:dd,mb:pd,jb:fd,Fa:hd,kb:md,Ma:sT,za:lT,eb:cT,cb:pT,ya:hT,V:mT,N:gT,db:bT,ma:IT,fb:ST,zb:$T,hb:AT,qb:OT,ab:PT,Aa:ET,yb:ms,Ja:CT,S:DT,Wa:kT,$:RT,G:zT,E:BT,m:ps,H:FT,B:UT,X:WT,J:HT,v:qT,O:jT,D:KT,t:XT,A:ZT,z:JT,w:YT,r:QT,tb:e2,ub:t2,vb:r2,rb:Pd,sb:Ed,bb:Cd,Oa:o2,La:s2,y:u2,ja:l2,Ba:c2,Ka:i2,qa:d2,Ia:p2,ib:f2,U:n2,fa:h2,Sa:m2,gb:g2,Qa:b2,Pa:y2,Ab:Ld,Ca:Rd,ob:as,aa:zd,oa:Md,xb:Bd,na:Fd,$a:H2,ia:o1,sa:l1,ga:U2,da:J2,ua:s1,p:V2,e:S2,c:T2,ea:X2,f:$2,n:O2,k:z2,Y:E2,ka:M2,j:G2,wa:K2,Ra:p1,ca:r1,Ua:d1,P:Z2,K:D2,_:t1,Q:W2,Z:i1,x:C2,l:I2,va:e1,i:w2,h:P2,ra:c1,ta:u1,o:A2,q:k2,s:L2,I:R2,C:F2,L:B2,xa:j2,_a:q2,F:n1,Ya:Y2,ba:a1,M:N2,Xa:Q2,ha:v2,a:I,Na:is}}}var rs={1319426:()=>typeof wasmOffsetConverter<"u",1319483:(l,p,m,g,_)=>{if(t===void 0||!t.Bd)return 1;if((l=Qe(Number(l>>>0))).startsWith("./")&&(l=l.substring(2)),!(l=t.Bd.get(l)))return 2;if(p=Number(p>>>0),m=Number(m>>>0),g=Number(g>>>0),p+m>l.byteLength)return 3;try{let S=l.subarray(p,p+m);switch(_){case 0:we().set(S,g>>>0);break;case 1:t.$d(g,S);break;default:return 4}return 0}catch{return 4}},1320198:(l,p,m)=>{t.Jd(l,we().subarray(p>>>0,p+m>>>0))},1320261:()=>t.Yd(),1320302:l=>{t.Id(l)},1320338:()=>{t.Sd()},1320369:()=>{t.Td()},1320398:()=>{t.Xd()},1320423:l=>t.Rd(l),1320456:l=>t.Vd(l),1320488:(l,p,m)=>{t.Hd(Number(l),Number(p),Number(m),!0)},1320551:(l,p,m)=>{t.Hd(Number(l),Number(p),Number(m))},1320608:l=>{t.hc("Abs",l,void 0)},1320659:l=>{t.hc("Neg",l,void 0)},1320710:l=>{t.hc("Floor",l,void 0)},1320763:l=>{t.hc("Ceil",l,void 0)},1320815:l=>{t.hc("Reciprocal",l,void 0)},1320873:l=>{t.hc("Sqrt",l,void 0)},1320925:l=>{t.hc("Exp",l,void 0)},1320976:l=>{t.hc("Erf",l,void 0)},1321027:l=>{t.hc("Sigmoid",l,void 0)},1321082:(l,p,m)=>{t.hc("HardSigmoid",l,{alpha:p,beta:m})},1321161:l=>{t.hc("Log",l,void 0)},1321212:l=>{t.hc("Sin",l,void 0)},1321263:l=>{t.hc("Cos",l,void 0)},1321314:l=>{t.hc("Tan",l,void 0)},1321365:l=>{t.hc("Asin",l,void 0)},1321417:l=>{t.hc("Acos",l,void 0)},1321469:l=>{t.hc("Atan",l,void 0)},1321521:l=>{t.hc("Sinh",l,void 0)},1321573:l=>{t.hc("Cosh",l,void 0)},1321625:l=>{t.hc("Asinh",l,void 0)},1321678:l=>{t.hc("Acosh",l,void 0)},1321731:l=>{t.hc("Atanh",l,void 0)},1321784:l=>{t.hc("Tanh",l,void 0)},1321836:l=>{t.hc("Not",l,void 0)},1321887:(l,p,m)=>{t.hc("Clip",l,{min:p,max:m})},1321956:l=>{t.hc("Clip",l,void 0)},1322008:(l,p)=>{t.hc("Elu",l,{alpha:p})},1322066:l=>{t.hc("Gelu",l,void 0)},1322118:l=>{t.hc("Relu",l,void 0)},1322170:(l,p)=>{t.hc("LeakyRelu",l,{alpha:p})},1322234:(l,p)=>{t.hc("ThresholdedRelu",l,{alpha:p})},1322304:(l,p)=>{t.hc("Cast",l,{to:p})},1322362:l=>{t.hc("Add",l,void 0)},1322413:l=>{t.hc("Sub",l,void 0)},1322464:l=>{t.hc("Mul",l,void 0)},1322515:l=>{t.hc("Div",l,void 0)},1322566:l=>{t.hc("Pow",l,void 0)},1322617:l=>{t.hc("Equal",l,void 0)},1322670:l=>{t.hc("Greater",l,void 0)},1322725:l=>{t.hc("GreaterOrEqual",l,void 0)},1322787:l=>{t.hc("Less",l,void 0)},1322839:l=>{t.hc("LessOrEqual",l,void 0)},1322898:(l,p,m,g,_)=>{t.hc("ReduceMean",l,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:g?Array.from(M().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},1323073:(l,p,m,g,_)=>{t.hc("ReduceMax",l,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:g?Array.from(M().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},1323247:(l,p,m,g,_)=>{t.hc("ReduceMin",l,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:g?Array.from(M().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},1323421:(l,p,m,g,_)=>{t.hc("ReduceProd",l,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:g?Array.from(M().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},1323596:(l,p,m,g,_)=>{t.hc("ReduceSum",l,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:g?Array.from(M().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},1323770:(l,p,m,g,_)=>{t.hc("ReduceL1",l,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:g?Array.from(M().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},1323943:(l,p,m,g,_)=>{t.hc("ReduceL2",l,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:g?Array.from(M().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},1324116:(l,p,m,g,_)=>{t.hc("ReduceLogSum",l,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:g?Array.from(M().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},1324293:(l,p,m,g,_)=>{t.hc("ReduceSumSquare",l,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:g?Array.from(M().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},1324473:(l,p,m,g,_)=>{t.hc("ReduceLogSumExp",l,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:g?Array.from(M().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},1324653:l=>{t.hc("Where",l,void 0)},1324706:(l,p,m)=>{t.hc("Transpose",l,{perm:p?Array.from(M().subarray(Number(p)>>>0,Number(m)>>>0)):[]})},1324830:(l,p,m,g)=>{t.hc("DepthToSpace",l,{blocksize:p,mode:Qe(m),format:g?"NHWC":"NCHW"})},1324963:(l,p,m,g)=>{t.hc("DepthToSpace",l,{blocksize:p,mode:Qe(m),format:g?"NHWC":"NCHW"})},1325096:(l,p,m,g,_,S,O,L,B,H,J,ie,ye,Ge,Et)=>{t.hc("ConvTranspose",l,{format:B?"NHWC":"NCHW",autoPad:p,dilations:[m],group:g,kernelShape:[_],pads:[S,O],strides:[L],wIsConst:()=>!!ee()[H>>>0],outputPadding:J?Array.from(M().subarray(Number(J)>>>0,Number(ie)>>>0)):[],outputShape:ye?Array.from(M().subarray(Number(ye)>>>0,Number(Ge)>>>0)):[],activation:Qe(Et)})},1325529:(l,p,m,g,_,S,O,L,B,H,J,ie,ye,Ge)=>{t.hc("ConvTranspose",l,{format:L?"NHWC":"NCHW",autoPad:p,dilations:Array.from(M().subarray(Number(m)>>>0,2+(Number(m)>>>0)>>>0)),group:g,kernelShape:Array.from(M().subarray(Number(_)>>>0,2+(Number(_)>>>0)>>>0)),pads:Array.from(M().subarray(Number(S)>>>0,4+(Number(S)>>>0)>>>0)),strides:Array.from(M().subarray(Number(O)>>>0,2+(Number(O)>>>0)>>>0)),wIsConst:()=>!!ee()[B>>>0],outputPadding:H?Array.from(M().subarray(Number(H)>>>0,Number(J)>>>0)):[],outputShape:ie?Array.from(M().subarray(Number(ie)>>>0,Number(ye)>>>0)):[],activation:Qe(Ge)})},1326190:(l,p,m,g,_,S,O,L,B,H,J,ie,ye,Ge,Et)=>{t.hc("ConvTranspose",l,{format:B?"NHWC":"NCHW",autoPad:p,dilations:[m],group:g,kernelShape:[_],pads:[S,O],strides:[L],wIsConst:()=>!!ee()[H>>>0],outputPadding:J?Array.from(M().subarray(Number(J)>>>0,Number(ie)>>>0)):[],outputShape:ye?Array.from(M().subarray(Number(ye)>>>0,Number(Ge)>>>0)):[],activation:Qe(Et)})},1326623:(l,p,m,g,_,S,O,L,B,H,J,ie,ye,Ge)=>{t.hc("ConvTranspose",l,{format:L?"NHWC":"NCHW",autoPad:p,dilations:Array.from(M().subarray(Number(m)>>>0,2+(Number(m)>>>0)>>>0)),group:g,kernelShape:Array.from(M().subarray(Number(_)>>>0,2+(Number(_)>>>0)>>>0)),pads:Array.from(M().subarray(Number(S)>>>0,4+(Number(S)>>>0)>>>0)),strides:Array.from(M().subarray(Number(O)>>>0,2+(Number(O)>>>0)>>>0)),wIsConst:()=>!!ee()[B>>>0],outputPadding:H?Array.from(M().subarray(Number(H)>>>0,Number(J)>>>0)):[],outputShape:ie?Array.from(M().subarray(Number(ie)>>>0,Number(ye)>>>0)):[],activation:Qe(Ge)})},1327284:(l,p)=>{t.hc("GlobalAveragePool",l,{format:p?"NHWC":"NCHW"})},1327375:(l,p,m,g,_,S,O,L,B,H,J,ie,ye,Ge)=>{t.hc("AveragePool",l,{format:Ge?"NHWC":"NCHW",auto_pad:p,ceil_mode:m,count_include_pad:g,storage_order:_,dilations:S?Array.from(M().subarray(Number(S)>>>0,Number(O)>>>0)):[],kernel_shape:L?Array.from(M().subarray(Number(L)>>>0,Number(B)>>>0)):[],pads:H?Array.from(M().subarray(Number(H)>>>0,Number(J)>>>0)):[],strides:ie?Array.from(M().subarray(Number(ie)>>>0,Number(ye)>>>0)):[]})},1327854:(l,p)=>{t.hc("GlobalAveragePool",l,{format:p?"NHWC":"NCHW"})},1327945:(l,p,m,g,_,S,O,L,B,H,J,ie,ye,Ge)=>{t.hc("AveragePool",l,{format:Ge?"NHWC":"NCHW",auto_pad:p,ceil_mode:m,count_include_pad:g,storage_order:_,dilations:S?Array.from(M().subarray(Number(S)>>>0,Number(O)>>>0)):[],kernel_shape:L?Array.from(M().subarray(Number(L)>>>0,Number(B)>>>0)):[],pads:H?Array.from(M().subarray(Number(H)>>>0,Number(J)>>>0)):[],strides:ie?Array.from(M().subarray(Number(ie)>>>0,Number(ye)>>>0)):[]})},1328424:(l,p)=>{t.hc("GlobalMaxPool",l,{format:p?"NHWC":"NCHW"})},1328511:(l,p,m,g,_,S,O,L,B,H,J,ie,ye,Ge)=>{t.hc("MaxPool",l,{format:Ge?"NHWC":"NCHW",auto_pad:p,ceil_mode:m,count_include_pad:g,storage_order:_,dilations:S?Array.from(M().subarray(Number(S)>>>0,Number(O)>>>0)):[],kernel_shape:L?Array.from(M().subarray(Number(L)>>>0,Number(B)>>>0)):[],pads:H?Array.from(M().subarray(Number(H)>>>0,Number(J)>>>0)):[],strides:ie?Array.from(M().subarray(Number(ie)>>>0,Number(ye)>>>0)):[]})},1328986:(l,p)=>{t.hc("GlobalMaxPool",l,{format:p?"NHWC":"NCHW"})},1329073:(l,p,m,g,_,S,O,L,B,H,J,ie,ye,Ge)=>{t.hc("MaxPool",l,{format:Ge?"NHWC":"NCHW",auto_pad:p,ceil_mode:m,count_include_pad:g,storage_order:_,dilations:S?Array.from(M().subarray(Number(S)>>>0,Number(O)>>>0)):[],kernel_shape:L?Array.from(M().subarray(Number(L)>>>0,Number(B)>>>0)):[],pads:H?Array.from(M().subarray(Number(H)>>>0,Number(J)>>>0)):[],strides:ie?Array.from(M().subarray(Number(ie)>>>0,Number(ye)>>>0)):[]})},1329548:(l,p,m,g,_)=>{t.hc("Gemm",l,{alpha:p,beta:m,transA:g,transB:_})},1329652:l=>{t.hc("MatMul",l,void 0)},1329706:(l,p,m,g)=>{t.hc("ArgMax",l,{keepDims:!!p,selectLastIndex:!!m,axis:g})},1329814:(l,p,m,g)=>{t.hc("ArgMin",l,{keepDims:!!p,selectLastIndex:!!m,axis:g})},1329922:(l,p)=>{t.hc("Softmax",l,{axis:p})},1329985:(l,p)=>{t.hc("Concat",l,{axis:p})},1330045:(l,p,m,g,_)=>{t.hc("Split",l,{axis:p,numOutputs:m,splitSizes:g?Array.from(M().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},1330201:l=>{t.hc("Expand",l,void 0)},1330255:(l,p)=>{t.hc("Gather",l,{axis:Number(p)})},1330326:(l,p)=>{t.hc("GatherElements",l,{axis:Number(p)})},1330405:(l,p)=>{t.hc("GatherND",l,{batch_dims:Number(p)})},1330484:(l,p,m,g,_,S,O,L,B,H,J)=>{t.hc("Resize",l,{antialias:p,axes:m?Array.from(M().subarray(Number(m)>>>0,Number(g)>>>0)):[],coordinateTransformMode:Qe(_),cubicCoeffA:S,excludeOutside:O,extrapolationValue:L,keepAspectRatioPolicy:Qe(B),mode:Qe(H),nearestMode:Qe(J)})},1330846:(l,p,m,g,_,S,O)=>{t.hc("Slice",l,{starts:p?Array.from(M().subarray(Number(p)>>>0,Number(m)>>>0)):[],ends:g?Array.from(M().subarray(Number(g)>>>0,Number(_)>>>0)):[],axes:S?Array.from(M().subarray(Number(S)>>>0,Number(O)>>>0)):[]})},1331110:l=>{t.hc("Tile",l,void 0)},1331162:(l,p,m)=>{t.hc("InstanceNormalization",l,{epsilon:p,format:m?"NHWC":"NCHW"})},1331276:(l,p,m)=>{t.hc("InstanceNormalization",l,{epsilon:p,format:m?"NHWC":"NCHW"})},1331390:l=>{t.hc("Range",l,void 0)},1331443:(l,p)=>{t.hc("Einsum",l,{equation:Qe(p)})},1331524:(l,p,m,g,_)=>{t.hc("Pad",l,{mode:p,value:m,pads:g?Array.from(M().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},1331667:(l,p,m,g,_,S)=>{t.hc("BatchNormalization",l,{epsilon:p,momentum:m,spatial:!!_,trainingMode:!!g,format:S?"NHWC":"NCHW"})},1331836:(l,p,m,g,_,S)=>{t.hc("BatchNormalization",l,{epsilon:p,momentum:m,spatial:!!_,trainingMode:!!g,format:S?"NHWC":"NCHW"})},1332005:(l,p,m)=>{t.hc("CumSum",l,{exclusive:Number(p),reverse:Number(m)})},1332102:(l,p,m)=>{t.hc("DequantizeLinear",l,{axis:p,blockSize:m})},1332192:(l,p,m,g,_)=>{t.hc("GridSample",l,{align_corners:p,mode:Qe(m),padding_mode:Qe(g),format:_?"NHWC":"NCHW"})},1332362:(l,p,m,g,_)=>{t.hc("GridSample",l,{align_corners:p,mode:Qe(m),padding_mode:Qe(g),format:_?"NHWC":"NCHW"})},1332532:(l,p)=>{t.hc("ScatterND",l,{reduction:Qe(p)})},1332617:(l,p,m,g,_,S,O,L,B)=>{t.hc("Attention",l,{numHeads:p,isUnidirectional:m,maskFilterValue:g,scale:_,doRotary:S,qkvHiddenSizes:O?Array.from(M().subarray(Number(L)>>>0,Number(L)+O>>>0)):[],pastPresentShareBuffer:!!B})},1332889:l=>{t.hc("BiasAdd",l,void 0)},1332944:l=>{t.hc("BiasSplitGelu",l,void 0)},1333005:l=>{t.hc("FastGelu",l,void 0)},1333061:(l,p,m,g,_,S,O,L,B,H,J,ie,ye,Ge,Et,go)=>{t.hc("Conv",l,{format:ie?"NHWC":"NCHW",auto_pad:p,dilations:m?Array.from(M().subarray(Number(m)>>>0,Number(g)>>>0)):[],group:_,kernel_shape:S?Array.from(M().subarray(Number(S)>>>0,Number(O)>>>0)):[],pads:L?Array.from(M().subarray(Number(L)>>>0,Number(B)>>>0)):[],strides:H?Array.from(M().subarray(Number(H)>>>0,Number(J)>>>0)):[],w_is_const:()=>!!ee()[Number(ye)>>>0],activation:Qe(Ge),activation_params:Et?Array.from(re().subarray(Number(Et)>>>0,Number(go)>>>0)):[]})},1333645:l=>{t.hc("Gelu",l,void 0)},1333697:(l,p,m,g,_,S,O,L,B)=>{t.hc("GroupQueryAttention",l,{numHeads:p,kvNumHeads:m,scale:g,softcap:_,doRotary:S,rotaryInterleaved:O,smoothSoftmax:L,localWindowSize:B})},1333914:(l,p,m,g)=>{t.hc("LayerNormalization",l,{axis:p,epsilon:m,simplified:!!g})},1334025:(l,p,m,g)=>{t.hc("LayerNormalization",l,{axis:p,epsilon:m,simplified:!!g})},1334136:(l,p,m,g,_,S)=>{t.hc("MatMulNBits",l,{k:p,n:m,accuracyLevel:g,bits:_,blockSize:S})},1334263:(l,p,m,g,_,S)=>{t.hc("MultiHeadAttention",l,{numHeads:p,isUnidirectional:m,maskFilterValue:g,scale:_,doRotary:S})},1334422:(l,p)=>{t.hc("QuickGelu",l,{alpha:p})},1334486:(l,p,m,g,_)=>{t.hc("RotaryEmbedding",l,{interleaved:!!p,numHeads:m,rotaryEmbeddingDim:g,scale:_})},1334625:(l,p,m)=>{t.hc("SkipLayerNormalization",l,{epsilon:p,simplified:!!m})},1334727:(l,p,m)=>{t.hc("SkipLayerNormalization",l,{epsilon:p,simplified:!!m})},1334829:(l,p,m,g)=>{t.hc("GatherBlockQuantized",l,{gatherAxis:p,quantizeAxis:m,blockSize:g})},1334950:l=>{t.Wd(l)},1334984:(l,p)=>t.Zd(Number(l),Number(p),t.Cd.be,t.Cd.errors)};function Xw(l,p,m){return Td(async()=>{await t.Ud(Number(l),Number(p),Number(m))})}function Zw(){return typeof wasmOffsetConverter<"u"}class ns{name="ExitStatus";constructor(p){this.message=`Program terminated with exit(${p})`,this.status=p}}var Wc=l=>{l.terminate(),l.onmessage=()=>{}},os=[],Hc=l=>{en.length==0&&(Jc(),Zc(en[0]));var p=en.pop();if(!p)return 6;fo.push(p),vn[l.xd]=p,p.xd=l.xd;var m={yd:"run",de:l.ce,Fd:l.Fd,xd:l.xd};return p.postMessage(m,l.Ld),0},Qr=0,Ke=(l,p,...m)=>{for(var g=2*m.length,_=he(),S=Ts(8*g),O=S>>>3,L=0;L<m.length;L++){var B=m[L];typeof B=="bigint"?(W[O+2*L]=1n,W[O+2*L+1]=B):(W[O+2*L]=0n,Oe()[O+2*L+1>>>0]=B)}return l=Hd(l,0,g,S,p),fe(_),l};function is(l){if(s)return Ke(0,1,l);if(P=l,!(0<Qr)){for(var p of fo)Wc(p);for(p of en)Wc(p);en=[],fo=[],vn={},le=!0}b(0,new ns(l))}function qc(l){if(s)return Ke(1,0,l);as(l)}var as=l=>{if(P=l,s)throw qc(l),"unwind";is(l)},en=[],fo=[],jc=[],vn={},Kc=l=>{var p=l.xd;delete vn[p],en.push(l),fo.splice(fo.indexOf(l),1),l.xd=0,qd(p)};function Xc(){jc.forEach(l=>l())}var Zc=l=>new Promise(p=>{l.onmessage=_=>{var S=(_=_.data).yd;if(_.Ed&&_.Ed!=ni()){var O=vn[_.Ed];O?O.postMessage(_,_.Ld):w(`Internal error! Worker sent a message "${S}" to target pthread ${_.Ed}, but that thread no longer exists!`)}else S==="checkMailbox"?Xo():S==="spawnThread"?Hc(_):S==="cleanupThread"?Kc(vn[_.ee]):S==="loaded"?(l.loaded=!0,p(l)):S==="alert"?alert(`Thread ${_.fe}: ${_.text}`):_.target==="setimmediate"?l.postMessage(_):S==="callHandler"?t[_.Nd](..._.args):S&&w(`worker sent an unknown command ${S}`)},l.onerror=_=>{throw w(`worker sent an error! ${_.filename}:${_.lineno}: ${_.message}`),_};var m,g=[];for(m of[])t.propertyIsEnumerable(m)&&g.push(m);l.postMessage({yd:"load",Od:g,he:I,ie:A})});function Jc(){var l=new Worker(import.meta.url.startsWith("file:")?new URL("ort.all.bundle.min.mjs",import.meta.url):new URL(import.meta.url),{type:"module",workerData:"em-pthread",name:"em-pthread"});en.push(l)}var Jw=l=>{Le();var p=F()[l+52>>>2>>>0];l=F()[l+56>>>2>>>0],Xd(p,p-l),fe(p)},Yw=(l,p)=>{Qr=0,l=Is(l,p),0<Qr?P=l:ws(l)},Ko=[];function Qw(l){var p=new ss(l>>>=0);if(ee()[p.wd+12>>>0]==0){var m=1;ee()[p.wd+12>>>0]=m}return m=0,ee()[p.wd+13>>>0]=m,Ko.push(p),Jd(l),Qd(l)}var Gn=0,eT=()=>{be(0,0);var l=Ko.pop();Zd(l.Gd),Gn=0};class ss{constructor(p){this.Gd=p,this.wd=p-24}}function tT(l){throw Gn||=l>>>0,Gn}var us=l=>{var p=Gn;if(!p)return mo(0),0;var m=new ss(p);F()[m.wd+16>>>2>>>0]=p;var g=F()[m.wd+4>>>2>>>0];if(!g)return mo(0),p;for(var _ of l){if(_===0||_===g)break;if(Yd(_,g,m.wd+16))return mo(_),p}return mo(g),p};function rT(){return us([])}function nT(l){return us([l>>>0])}function oT(l,p){return us([l>>>0,p>>>0])}var iT=()=>{var l=Ko.pop();l||qr("no exception to throw");var p=l.Gd;if(ee()[l.wd+13>>>0]==0){Ko.push(l);var m=1;ee()[l.wd+13>>>0]=m,m=0,ee()[l.wd+12>>>0]=m}throw Gn=p};function aT(l,p,m){var g=new ss(l>>>=0);throw p>>>=0,m>>>=0,F()[g.wd+16>>>2>>>0]=0,F()[g.wd+4>>>2>>>0]=p,F()[g.wd+8>>>2>>>0]=m,Gn=l}function Yc(l,p,m,g){return s?Ke(2,1,l,p,m,g):Qc(l,p,m,g)}function Qc(l,p,m,g){if(l>>>=0,m>>>=0,g>>>=0,u===void 0)return 6;var _=[];return s&&_.length===0?Yc(l,p>>>=0,m,g):(l={ce:m,xd:l,Fd:g,Ld:_},s?(l.yd="spawnThread",postMessage(l,_),0):Hc(l))}var ed=typeof TextDecoder<"u"?new TextDecoder:void 0,td=(l,p=0,m=NaN)=>{var g=(p>>>=0)+m;for(m=p;l[m]&&!(m>=g);)++m;if(16<m-p&&l.buffer&&ed)return ed.decode(l.buffer instanceof ArrayBuffer?l.subarray(p,m):l.slice(p,m));for(g="";p<m;){var _=l[p++];if(128&_){var S=63&l[p++];if((224&_)==192)g+=String.fromCharCode((31&_)<<6|S);else{var O=63&l[p++];65536>(_=(240&_)==224?(15&_)<<12|S<<6|O:(7&_)<<18|S<<12|O<<6|63&l[p++])?g+=String.fromCharCode(_):(_-=65536,g+=String.fromCharCode(55296|_>>10,56320|1023&_))}}else g+=String.fromCharCode(_)}return g},Qe=(l,p)=>(l>>>=0)?td(we(),l,p):"";function rd(l,p,m){return s?Ke(3,1,l,p,m):0}function nd(l,p){if(s)return Ke(4,1,l,p)}var od=l=>{for(var p=0,m=0;m<l.length;++m){var g=l.charCodeAt(m);127>=g?p++:2047>=g?p+=2:55296<=g&&57343>=g?(p+=4,++m):p+=3}return p},Un=(l,p,m)=>{var g=we();if(p>>>=0,0<m){var _=p;m=p+m-1;for(var S=0;S<l.length;++S){var O=l.charCodeAt(S);if(55296<=O&&57343>=O&&(O=65536+((1023&O)<<10)|1023&l.charCodeAt(++S)),127>=O){if(p>=m)break;g[p++>>>0]=O}else{if(2047>=O){if(p+1>=m)break;g[p++>>>0]=192|O>>6}else{if(65535>=O){if(p+2>=m)break;g[p++>>>0]=224|O>>12}else{if(p+3>=m)break;g[p++>>>0]=240|O>>18,g[p++>>>0]=128|O>>12&63}g[p++>>>0]=128|O>>6&63}g[p++>>>0]=128|63&O}}g[p>>>0]=0,l=p-_}else l=0;return l};function id(l,p){if(s)return Ke(5,1,l,p)}function ad(l,p,m){if(s)return Ke(6,1,l,p,m)}function sd(l,p,m){return s?Ke(7,1,l,p,m):0}function ud(l,p){if(s)return Ke(8,1,l,p)}function ld(l,p,m){if(s)return Ke(9,1,l,p,m)}function cd(l,p,m,g){if(s)return Ke(10,1,l,p,m,g)}function dd(l,p,m,g){if(s)return Ke(11,1,l,p,m,g)}function pd(l,p,m,g){if(s)return Ke(12,1,l,p,m,g)}function fd(l){if(s)return Ke(13,1,l)}function hd(l,p){if(s)return Ke(14,1,l,p)}function md(l,p,m){if(s)return Ke(15,1,l,p,m)}var gd,tn,sT=()=>qr(""),Qt=l=>{for(var p="";we()[l>>>0];)p+=gd[we()[l++>>>0]];return p},ls={},cs={},uT={};function jr(l,p,m={}){return function(g,_,S={}){var O=_.name;if(!g)throw new tn(`type "${O}" must have a positive integer typeid pointer`);if(cs.hasOwnProperty(g)){if(S.Pd)return;throw new tn(`Cannot register type '${O}' twice`)}cs[g]=_,delete uT[g],ls.hasOwnProperty(g)&&(_=ls[g],delete ls[g],_.forEach(L=>L()))}(l,p,m)}var bd=(l,p,m)=>{switch(p){case 1:return m?g=>ee()[g>>>0]:g=>we()[g>>>0];case 2:return m?g=>nt()[g>>>1>>>0]:g=>je()[g>>>1>>>0];case 4:return m?g=>M()[g>>>2>>>0]:g=>F()[g>>>2>>>0];case 8:return m?g=>W[g>>>3]:g=>ue[g>>>3];default:throw new TypeError(`invalid integer width (${p}): ${l}`)}};function lT(l,p,m){m>>>=0,jr(l>>>=0,{name:p=Qt(p>>>0),fromWireType:g=>g,toWireType:function(g,_){if(typeof _!="bigint"&&typeof _!="number")throw _=_===null?"null":(g=typeof _)=="object"||g==="array"||g==="function"?_.toString():""+_,new TypeError(`Cannot convert "${_}" to ${this.name}`);return typeof _=="number"&&(_=BigInt(_)),_},zd:rn,readValueFromPointer:bd(p,m,p.indexOf("u")==-1),Ad:null})}var rn=8;function cT(l,p,m,g){jr(l>>>=0,{name:p=Qt(p>>>0),fromWireType:function(_){return!!_},toWireType:function(_,S){return S?m:g},zd:rn,readValueFromPointer:function(_){return this.fromWireType(we()[_>>>0])},Ad:null})}var ds=[],Kr=[];function ps(l){9<(l>>>=0)&&--Kr[l+1]==0&&(Kr[l]=void 0,ds.push(l))}var Tt=l=>{if(!l)throw new tn("Cannot use deleted val. handle = "+l);return Kr[l]},Pt=l=>{switch(l){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let p=ds.pop()||Kr.length;return Kr[p]=l,Kr[p+1]=1,p}};function fs(l){return this.fromWireType(F()[l>>>2>>>0])}var dT={name:"emscripten::val",fromWireType:l=>{var p=Tt(l);return ps(l),p},toWireType:(l,p)=>Pt(p),zd:rn,readValueFromPointer:fs,Ad:null};function pT(l){return jr(l>>>0,dT)}var fT=(l,p)=>{switch(p){case 4:return function(m){return this.fromWireType(re()[m>>>2>>>0])};case 8:return function(m){return this.fromWireType(Oe()[m>>>3>>>0])};default:throw new TypeError(`invalid float width (${p}): ${l}`)}};function hT(l,p,m){m>>>=0,jr(l>>>=0,{name:p=Qt(p>>>0),fromWireType:g=>g,toWireType:(g,_)=>_,zd:rn,readValueFromPointer:fT(p,m),Ad:null})}function mT(l,p,m,g,_){if(l>>>=0,m>>>=0,p=Qt(p>>>0),_===-1&&(_=4294967295),_=L=>L,g===0){var S=32-8*m;_=L=>L<<S>>>S}var O=p.includes("unsigned")?function(L,B){return B>>>0}:function(L,B){return B};jr(l,{name:p,fromWireType:_,toWireType:O,zd:rn,readValueFromPointer:bd(p,m,g!==0),Ad:null})}function gT(l,p,m){function g(S){var O=F()[S>>>2>>>0];return S=F()[S+4>>>2>>>0],new _(ee().buffer,S,O)}var _=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][p];jr(l>>>=0,{name:m=Qt(m>>>0),fromWireType:g,zd:rn,readValueFromPointer:g},{Pd:!0})}function bT(l,p){jr(l>>>=0,{name:p=Qt(p>>>0),fromWireType:function(m){for(var g,_=F()[m>>>2>>>0],S=m+4,O=S,L=0;L<=_;++L){var B=S+L;L!=_&&we()[B>>>0]!=0||(O=Qe(O,B-O),g===void 0?g=O:(g+="\0",g+=O),O=B+1)}return tr(m),g},toWireType:function(m,g){g instanceof ArrayBuffer&&(g=new Uint8Array(g));var _=typeof g=="string";if(!(_||g instanceof Uint8Array||g instanceof Uint8ClampedArray||g instanceof Int8Array))throw new tn("Cannot pass non-string to std::string");var S=_?od(g):g.length,O=oi(4+S+1),L=O+4;if(F()[O>>>2>>>0]=S,_)Un(g,L,S+1);else if(_)for(_=0;_<S;++_){var B=g.charCodeAt(_);if(255<B)throw tr(O),new tn("String has UTF-16 code units that do not fit in 8 bits");we()[L+_>>>0]=B}else for(_=0;_<S;++_)we()[L+_>>>0]=g[_];return m!==null&&m.push(tr,O),O},zd:rn,readValueFromPointer:fs,Ad(m){tr(m)}})}var yd=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,yT=(l,p)=>{for(var m=l>>1,g=m+p/2;!(m>=g)&&je()[m>>>0];)++m;if(32<(m<<=1)-l&&yd)return yd.decode(we().slice(l,m));for(m="",g=0;!(g>=p/2);++g){var _=nt()[l+2*g>>>1>>>0];if(_==0)break;m+=String.fromCharCode(_)}return m},_T=(l,p,m)=>{if(m??=2147483647,2>m)return 0;var g=p;m=(m-=2)<2*l.length?m/2:l.length;for(var _=0;_<m;++_){var S=l.charCodeAt(_);nt()[p>>>1>>>0]=S,p+=2}return nt()[p>>>1>>>0]=0,p-g},vT=l=>2*l.length,xT=(l,p)=>{for(var m=0,g="";!(m>=p/4);){var _=M()[l+4*m>>>2>>>0];if(_==0)break;++m,65536<=_?(_-=65536,g+=String.fromCharCode(55296|_>>10,56320|1023&_)):g+=String.fromCharCode(_)}return g},wT=(l,p,m)=>{if(p>>>=0,m??=2147483647,4>m)return 0;var g=p;m=g+m-4;for(var _=0;_<l.length;++_){var S=l.charCodeAt(_);if(55296<=S&&57343>=S&&(S=65536+((1023&S)<<10)|1023&l.charCodeAt(++_)),M()[p>>>2>>>0]=S,(p+=4)+4>m)break}return M()[p>>>2>>>0]=0,p-g},TT=l=>{for(var p=0,m=0;m<l.length;++m){var g=l.charCodeAt(m);55296<=g&&57343>=g&&++m,p+=4}return p};function IT(l,p,m){if(l>>>=0,p>>>=0,m=Qt(m>>>=0),p===2)var g=yT,_=_T,S=vT,O=L=>je()[L>>>1>>>0];else p===4&&(g=xT,_=wT,S=TT,O=L=>F()[L>>>2>>>0]);jr(l,{name:m,fromWireType:L=>{for(var B,H=F()[L>>>2>>>0],J=L+4,ie=0;ie<=H;++ie){var ye=L+4+ie*p;ie!=H&&O(ye)!=0||(J=g(J,ye-J),B===void 0?B=J:(B+="\0",B+=J),J=ye+p)}return tr(L),B},toWireType:(L,B)=>{if(typeof B!="string")throw new tn(`Cannot pass non-string to C++ string type ${m}`);var H=S(B),J=oi(4+H+p);return F()[J>>>2>>>0]=H/p,_(B,J+4,H+p),L!==null&&L.push(tr,J),J},zd:rn,readValueFromPointer:fs,Ad(L){tr(L)}})}function ST(l,p){jr(l>>>=0,{Qd:!0,name:p=Qt(p>>>0),zd:0,fromWireType:()=>{},toWireType:()=>{}})}function $T(l){xs(l>>>0,!a,1,!i,131072,!1),Xc()}var hs=l=>{if(!le)try{if(l(),!(0<Qr))try{s?ws(P):as(P)}catch(p){p instanceof ns||p=="unwind"||b(0,p)}}catch(p){p instanceof ns||p=="unwind"||b(0,p)}};function ms(l){l>>>=0,typeof Atomics.ge=="function"&&(Atomics.ge(M(),l>>>2,l).value.then(Xo),l+=128,Atomics.store(M(),l>>>2,1))}var Xo=()=>{var l=ni();l&&(ms(l),hs(Kd))};function AT(l,p){(l>>>=0)==p>>>0?setTimeout(Xo):s?postMessage({Ed:l,yd:"checkMailbox"}):(l=vn[l])&&l.postMessage({yd:"checkMailbox"})}var gs=[];function OT(l,p,m,g,_){for(p>>>=0,g/=2,gs.length=g,m=_>>>0>>>3,_=0;_<g;_++)gs[_]=W[m+2*_]?W[m+2*_+1]:Oe()[m+2*_+1>>>0];return(p?rs[p]:x2[l])(...gs)}var PT=()=>{Qr=0};function ET(l){l>>>=0,s?postMessage({yd:"cleanupThread",ee:l}):Kc(vn[l])}function CT(l){}var Zo=(l,p)=>{var m=cs[l];if(m===void 0)throw l=Gd(l),m=Qt(l),tr(l),new tn(`${p} has unknown type ${m}`);return m},_d=(l,p,m)=>{var g=[];return l=l.toWireType(g,m),g.length&&(F()[p>>>2>>>0]=Pt(g)),l};function DT(l,p,m){return p>>>=0,m>>>=0,l=Tt(l>>>0),p=Zo(p,"emval::as"),_d(p,m,l)}function kT(l,p){return p>>>=0,l=Tt(l>>>0),(p=Zo(p,"emval::as")).toWireType(null,l)}var Jo=l=>{try{l()}catch(p){qr(p)}},nn=0,er=null,vd=0,Yo=[],xd={},wd={},NT=0,bs=null,LT=[];function Td(l){return function(p){if(!le){if(nn===0){var m=!1,g=!1;p((_=0)=>{if(!le&&(vd=_,m=!0,g)){nn=2,Jo(()=>qp(er)),typeof MainLoop<"u"&&MainLoop.Md&&MainLoop.resume(),_=!1;try{var S=function(){var B=M()[er+8>>>2>>>0];return B=G[wd[B]],--Qr,B()}()}catch(B){S=B,_=!0}var O=!1;if(!er){var L=bs;L&&(bs=null,(_?L.reject:L.resolve)(S),O=!0)}if(_&&!O)throw S}}),g=!0,m||(nn=1,er=function(){var _=oi(65548),S=_+12;F()[_>>>2>>>0]=S,F()[_+4>>>2>>>0]=S+65536,S=Yo[0];var O=xd[S];return O===void 0&&(O=NT++,xd[S]=O,wd[O]=S),S=O,M()[_+8>>>2>>>0]=S,_}(),typeof MainLoop<"u"&&MainLoop.Md&&MainLoop.pause(),Jo(()=>Wp(er)))}else nn===2?(nn=0,Jo(jp),tr(er),er=null,LT.forEach(hs)):qr(`invalid state: ${nn}`);return vd}}(p=>{l().then(p)})}function RT(l){return l>>>=0,Td(async()=>{var p=await Tt(l);return Pt(p)})}var Qo=[];function zT(l,p,m,g){return m>>>=0,g>>>=0,(l=Qo[l>>>0])(null,p=Tt(p>>>0),m,g)}var MT={},ei=l=>{var p=MT[l];return p===void 0?Qt(l):p};function BT(l,p,m,g,_){return m>>>=0,g>>>=0,_>>>=0,(l=Qo[l>>>0])(p=Tt(p>>>0),p[m=ei(m)],g,_)}var Id=()=>typeof globalThis=="object"?globalThis:Function("return this")();function FT(l){return(l>>>=0)==0?Pt(Id()):(l=ei(l),Pt(Id()[l]))}var VT=l=>{var p=Qo.length;return Qo.push(l),p},GT=(l,p)=>{for(var m=Array(l),g=0;g<l;++g)m[g]=Zo(F()[p+4*g>>>2>>>0],"parameter "+g);return m},Sd=(l,p)=>Object.defineProperty(p,"name",{value:l});function UT(l,p,m){var g=(p=GT(l,p>>>0)).shift();l--;var _=`return function (obj, func, destructorsRef, args) {
`,S=0,O=[];m===0&&O.push("obj");for(var L=["retType"],B=[g],H=0;H<l;++H)O.push("arg"+H),L.push("argType"+H),B.push(p[H]),_+=`  var arg${H} = argType${H}.readValueFromPointer(args${S?"+"+S:""});
`,S+=p[H].zd;return _+=`  var rv = ${m===1?"new func":"func.call"}(${O.join(", ")});
`,g.Qd||(L.push("emval_returnValue"),B.push(_d),_+=`  return emval_returnValue(retType, destructorsRef, rv);
`),L.push(_+`};
`),l=function(J){var ie=Function;if(!(ie instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof ie} which is not a function`);var ye=Sd(ie.name||"unknownFunctionName",function(){});return ye.prototype=ie.prototype,ye=new ye,(J=ie.apply(ye,J))instanceof Object?J:ye}(L)(...B),m=`methodCaller<(${p.map(J=>J.name).join(", ")}) => ${g.name}>`,VT(Sd(m,l))}function WT(l){return l=ei(l>>>0),Pt(t[l])}function HT(l,p){return p>>>=0,l=Tt(l>>>0),p=Tt(p),Pt(l[p])}function qT(l){9<(l>>>=0)&&(Kr[l+1]+=1)}function jT(){return Pt([])}function KT(l){l=Tt(l>>>0);for(var p=Array(l.length),m=0;m<l.length;m++)p[m]=l[m];return Pt(p)}function XT(l){return Pt(ei(l>>>0))}function ZT(){return Pt({})}function JT(l){for(var p=Tt(l>>>=0);p.length;){var m=p.pop();p.pop()(m)}ps(l)}function YT(l,p,m){p>>>=0,m>>>=0,l=Tt(l>>>0),p=Tt(p),m=Tt(m),l[p]=m}function QT(l,p){return p>>>=0,l=(l=Zo(l>>>0,"_emval_take_value")).readValueFromPointer(p),Pt(l)}function e2(l,p){l=-9007199254740992>l||9007199254740992<l?NaN:Number(l),p>>>=0,l=new Date(1e3*l),M()[p>>>2>>>0]=l.getUTCSeconds(),M()[p+4>>>2>>>0]=l.getUTCMinutes(),M()[p+8>>>2>>>0]=l.getUTCHours(),M()[p+12>>>2>>>0]=l.getUTCDate(),M()[p+16>>>2>>>0]=l.getUTCMonth(),M()[p+20>>>2>>>0]=l.getUTCFullYear()-1900,M()[p+24>>>2>>>0]=l.getUTCDay(),l=(l.getTime()-Date.UTC(l.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,M()[p+28>>>2>>>0]=l}var $d=l=>l%4==0&&(l%100!=0||l%400==0),Ad=[0,31,60,91,121,152,182,213,244,274,305,335],Od=[0,31,59,90,120,151,181,212,243,273,304,334];function t2(l,p){l=-9007199254740992>l||9007199254740992<l?NaN:Number(l),p>>>=0,l=new Date(1e3*l),M()[p>>>2>>>0]=l.getSeconds(),M()[p+4>>>2>>>0]=l.getMinutes(),M()[p+8>>>2>>>0]=l.getHours(),M()[p+12>>>2>>>0]=l.getDate(),M()[p+16>>>2>>>0]=l.getMonth(),M()[p+20>>>2>>>0]=l.getFullYear()-1900,M()[p+24>>>2>>>0]=l.getDay();var m=($d(l.getFullYear())?Ad:Od)[l.getMonth()]+l.getDate()-1|0;M()[p+28>>>2>>>0]=m,M()[p+36>>>2>>>0]=-60*l.getTimezoneOffset(),m=new Date(l.getFullYear(),6,1).getTimezoneOffset();var g=new Date(l.getFullYear(),0,1).getTimezoneOffset();l=0|(m!=g&&l.getTimezoneOffset()==Math.min(g,m)),M()[p+32>>>2>>>0]=l}function r2(l){l>>>=0;var p=new Date(M()[l+20>>>2>>>0]+1900,M()[l+16>>>2>>>0],M()[l+12>>>2>>>0],M()[l+8>>>2>>>0],M()[l+4>>>2>>>0],M()[l>>>2>>>0],0),m=M()[l+32>>>2>>>0],g=p.getTimezoneOffset(),_=new Date(p.getFullYear(),6,1).getTimezoneOffset(),S=new Date(p.getFullYear(),0,1).getTimezoneOffset(),O=Math.min(S,_);return 0>m?M()[l+32>>>2>>>0]=+(_!=S&&O==g):0<m!=(O==g)&&(_=Math.max(S,_),p.setTime(p.getTime()+6e4*((0<m?O:_)-g))),M()[l+24>>>2>>>0]=p.getDay(),m=($d(p.getFullYear())?Ad:Od)[p.getMonth()]+p.getDate()-1|0,M()[l+28>>>2>>>0]=m,M()[l>>>2>>>0]=p.getSeconds(),M()[l+4>>>2>>>0]=p.getMinutes(),M()[l+8>>>2>>>0]=p.getHours(),M()[l+12>>>2>>>0]=p.getDate(),M()[l+16>>>2>>>0]=p.getMonth(),M()[l+20>>>2>>>0]=p.getYear(),l=p.getTime(),BigInt(isNaN(l)?-1:l/1e3)}function Pd(l,p,m,g,_,S,O){return s?Ke(16,1,l,p,m,g,_,S,O):-52}function Ed(l,p,m,g,_,S){if(s)return Ke(17,1,l,p,m,g,_,S)}var ho={},n2=()=>performance.timeOrigin+performance.now();function Cd(l,p){if(s)return Ke(18,1,l,p);if(ho[l]&&(clearTimeout(ho[l].id),delete ho[l]),!p)return 0;var m=setTimeout(()=>{delete ho[l],hs(()=>jd(l,performance.timeOrigin+performance.now()))},p);return ho[l]={id:m,ke:p},0}function o2(l,p,m,g){l>>>=0,p>>>=0,m>>>=0,g>>>=0;var _=new Date().getFullYear(),S=new Date(_,0,1).getTimezoneOffset();_=new Date(_,6,1).getTimezoneOffset();var O=Math.max(S,_);F()[l>>>2>>>0]=60*O,M()[p>>>2>>>0]=+(S!=_),l=(p=L=>{var B=Math.abs(L);return`UTC${0<=L?"-":"+"}${String(Math.floor(B/60)).padStart(2,"0")}${String(B%60).padStart(2,"0")}`})(S),p=p(_),_<S?(Un(l,m,17),Un(p,g,17)):(Un(l,g,17),Un(p,m,17))}var i2=()=>Date.now(),a2=1;function s2(l,p,m){if(!(0<=l&&3>=l))return 28;if(l===0)l=Date.now();else{if(!a2)return 52;l=performance.timeOrigin+performance.now()}return W[m>>>0>>>3]=BigInt(Math.round(1e6*l)),0}var ys=[],Dd=(l,p)=>{ys.length=0;for(var m;m=we()[l++>>>0];){var g=m!=105;p+=(g&=m!=112)&&p%8?4:0,ys.push(m==112?F()[p>>>2>>>0]:m==106?W[p>>>3]:m==105?M()[p>>>2>>>0]:Oe()[p>>>3>>>0]),p+=g?8:4}return ys};function u2(l,p,m){return l>>>=0,p=Dd(p>>>0,m>>>0),rs[l](...p)}function l2(l,p,m){return l>>>=0,p=Dd(p>>>0,m>>>0),rs[l](...p)}var c2=()=>{};function d2(l,p){return w(Qe(l>>>0,p>>>0))}var p2=()=>{throw Qr+=1,"unwind"};function f2(){return 4294901760}var h2=()=>navigator.hardwareConcurrency;function m2(){return qr("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function g2(l){l>>>=0;var p=we().length;if(l<=p||4294901760<l)return!1;for(var m=1;4>=m;m*=2){var g=p*(1+.2/m);g=Math.min(g,l+100663296);e:{g=(Math.min(4294901760,65536*Math.ceil(Math.max(l,g)/65536))-I.buffer.byteLength+65535)/65536|0;try{I.grow(g),Le();var _=1;break e}catch{}_=void 0}if(_)return!0}return!1}var ti=()=>(qr("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Wn={},kd=l=>{l.forEach(p=>{var m=ti();m&&(Wn[m]=p)})};function b2(){var l=Error().stack.toString().split(`
`);return l[0]=="Error"&&l.shift(),kd(l),Wn.Kd=ti(),Wn.ae=l,Wn.Kd}function y2(l,p,m){if(l>>>=0,p>>>=0,Wn.Kd==l)var g=Wn.ae;else(g=Error().stack.toString().split(`
`))[0]=="Error"&&g.shift(),kd(g);for(var _=3;g[_]&&ti()!=l;)++_;for(l=0;l<m&&g[l+_];++l)M()[p+4*l>>>2>>>0]=ti();return l}var _s,vs={},Nd=()=>{if(!_s){var l,p={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(l in vs)vs[l]===void 0?delete p[l]:p[l]=vs[l];var m=[];for(l in p)m.push(`${l}=${p[l]}`);_s=m}return _s};function Ld(l,p){if(s)return Ke(19,1,l,p);l>>>=0,p>>>=0;var m=0;return Nd().forEach((g,_)=>{var S=p+m;for(_=F()[l+4*_>>>2>>>0]=S,S=0;S<g.length;++S)ee()[_++>>>0]=g.charCodeAt(S);ee()[_>>>0]=0,m+=g.length+1}),0}function Rd(l,p){if(s)return Ke(20,1,l,p);l>>>=0,p>>>=0;var m=Nd();F()[l>>>2>>>0]=m.length;var g=0;return m.forEach(_=>g+=_.length+1),F()[p>>>2>>>0]=g,0}function zd(l){return s?Ke(21,1,l):52}function Md(l,p,m,g){return s?Ke(22,1,l,p,m,g):52}function Bd(l,p,m,g){return s?Ke(23,1,l,p,m,g):70}var _2=[null,[],[]];function Fd(l,p,m,g){if(s)return Ke(24,1,l,p,m,g);p>>>=0,m>>>=0,g>>>=0;for(var _=0,S=0;S<m;S++){var O=F()[p>>>2>>>0],L=F()[p+4>>>2>>>0];p+=8;for(var B=0;B<L;B++){var H=we()[O+B>>>0],J=_2[l];H===0||H===10?((l===1?x:w)(td(J)),J.length=0):J.push(H)}_+=L}return F()[g>>>2>>>0]=_,0}function v2(l){return l>>>0}s||function(){for(var l=t.numThreads-1;l--;)Jc();os.unshift(()=>{_n++,function(p){s?p():Promise.all(en.map(Zc)).then(p)}(()=>Gc())})}();for(var Vd=Array(256),ri=0;256>ri;++ri)Vd[ri]=String.fromCharCode(ri);gd=Vd,tn=t.BindingError=class extends Error{constructor(l){super(l),this.name="BindingError"}},t.InternalError=class extends Error{constructor(l){super(l),this.name="InternalError"}},Kr.push(0,1,void 0,1,null,1,!0,1,!1,1),t.count_emval_handles=()=>Kr.length/2-5-ds.length;var G,x2=[is,qc,Yc,rd,nd,id,ad,sd,ud,ld,cd,dd,pd,fd,hd,md,Pd,Ed,Cd,Ld,Rd,zd,Md,Bd,Fd];(async function(){function l(g,_){return G=g.exports,G=function(){var S=G,O={};for(let[L,B]of Object.entries(S))O[L]=typeof B=="function"?(...H)=>{Yo.push(L);try{return B(...H)}finally{le||(Yo.pop(),er&&nn===1&&Yo.length===0&&(nn=0,Qr+=1,Jo(Hp),typeof Fibers<"u"&&Fibers.le()))}}:B;return O}(),G=function(){var S=G,O=B=>H=>B(H)>>>0,L=B=>()=>B()>>>0;return(S=Object.assign({},S)).Cb=O(S.Cb),S.fc=L(S.fc),S.ic=O(S.ic),S.vc=O(S.vc),S.wc=L(S.wc),S.Ac=O(S.Ac),S}(),jc.push(G.jc),A=_,Gc(),G}_n++;var p=Uc();if(t.instantiateWasm)return new Promise(g=>{t.instantiateWasm(p,(_,S)=>{l(_,S),g(_.exports)})});if(s)return new Promise(g=>{Vt=_=>{var S=new WebAssembly.Instance(_,Uc());g(l(S,_))}});co??=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",y):y+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href;try{var m=await async function(g){var _=co;if(!te&&typeof WebAssembly.instantiateStreaming=="function"&&!ve(_))try{var S=fetch(_,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(S,g)}catch(O){w(`wasm streaming compile failed: ${O}`),w("falling back to ArrayBuffer instantiation")}return async function(O,L){try{var B=await async function(H){if(!te)try{var J=await d(H);return new Uint8Array(J)}catch{}if(H==co&&te)H=new Uint8Array(te);else{if(!f)throw"both async and sync fetching of the wasm failed";H=f(H)}return H}(O);return await WebAssembly.instantiate(B,L)}catch(H){w(`failed to asynchronously prepare wasm: ${H}`),qr(H)}}(_,g)}(p);return l(m.instance,m.module)}catch(g){return r(g),Promise.reject(g)}})();var Gd=l=>(Gd=G.Cb)(l),Ud=()=>(Ud=G.Db)();t._OrtInit=(l,p)=>(t._OrtInit=G.Eb)(l,p),t._OrtGetLastError=(l,p)=>(t._OrtGetLastError=G.Fb)(l,p),t._OrtCreateSessionOptions=(l,p,m,g,_,S,O,L,B,H)=>(t._OrtCreateSessionOptions=G.Gb)(l,p,m,g,_,S,O,L,B,H),t._OrtAppendExecutionProvider=(l,p)=>(t._OrtAppendExecutionProvider=G.Hb)(l,p),t._OrtAddFreeDimensionOverride=(l,p,m)=>(t._OrtAddFreeDimensionOverride=G.Ib)(l,p,m),t._OrtAddSessionConfigEntry=(l,p,m)=>(t._OrtAddSessionConfigEntry=G.Jb)(l,p,m),t._OrtReleaseSessionOptions=l=>(t._OrtReleaseSessionOptions=G.Kb)(l),t._OrtCreateSession=(l,p,m)=>(t._OrtCreateSession=G.Lb)(l,p,m),t._OrtReleaseSession=l=>(t._OrtReleaseSession=G.Mb)(l),t._OrtGetInputOutputCount=(l,p,m)=>(t._OrtGetInputOutputCount=G.Nb)(l,p,m),t._OrtGetInputName=(l,p)=>(t._OrtGetInputName=G.Ob)(l,p),t._OrtGetOutputName=(l,p)=>(t._OrtGetOutputName=G.Pb)(l,p),t._OrtFree=l=>(t._OrtFree=G.Qb)(l),t._OrtCreateTensor=(l,p,m,g,_,S)=>(t._OrtCreateTensor=G.Rb)(l,p,m,g,_,S),t._OrtGetTensorData=(l,p,m,g,_)=>(t._OrtGetTensorData=G.Sb)(l,p,m,g,_),t._OrtReleaseTensor=l=>(t._OrtReleaseTensor=G.Tb)(l),t._OrtCreateRunOptions=(l,p,m,g)=>(t._OrtCreateRunOptions=G.Ub)(l,p,m,g),t._OrtAddRunConfigEntry=(l,p,m)=>(t._OrtAddRunConfigEntry=G.Vb)(l,p,m),t._OrtReleaseRunOptions=l=>(t._OrtReleaseRunOptions=G.Wb)(l),t._OrtCreateBinding=l=>(t._OrtCreateBinding=G.Xb)(l),t._OrtBindInput=(l,p,m)=>(t._OrtBindInput=G.Yb)(l,p,m),t._OrtBindOutput=(l,p,m,g)=>(t._OrtBindOutput=G.Zb)(l,p,m,g),t._OrtClearBoundOutputs=l=>(t._OrtClearBoundOutputs=G._b)(l),t._OrtReleaseBinding=l=>(t._OrtReleaseBinding=G.$b)(l),t._OrtRunWithBinding=(l,p,m,g,_)=>(t._OrtRunWithBinding=G.ac)(l,p,m,g,_),t._OrtRun=(l,p,m,g,_,S,O,L)=>(t._OrtRun=G.bc)(l,p,m,g,_,S,O,L),t._OrtEndProfiling=l=>(t._OrtEndProfiling=G.cc)(l),t._JsepOutput=(l,p,m)=>(t._JsepOutput=G.dc)(l,p,m),t._JsepGetNodeName=l=>(t._JsepGetNodeName=G.ec)(l);var ni=()=>(ni=G.fc)(),tr=t._free=l=>(tr=t._free=G.gc)(l),oi=t._malloc=l=>(oi=t._malloc=G.ic)(l),xs=(l,p,m,g,_,S)=>(xs=G.kc)(l,p,m,g,_,S),Wd=()=>(Wd=G.lc)(),Hd=(l,p,m,g,_)=>(Hd=G.mc)(l,p,m,g,_),qd=l=>(qd=G.nc)(l),ws=l=>(ws=G.oc)(l),jd=(l,p)=>(jd=G.pc)(l,p),Kd=()=>(Kd=G.qc)(),be=(l,p)=>(be=G.rc)(l,p),mo=l=>(mo=G.sc)(l),Xd=(l,p)=>(Xd=G.tc)(l,p),fe=l=>(fe=G.uc)(l),Ts=l=>(Ts=G.vc)(l),he=()=>(he=G.wc)(),Zd=l=>(Zd=G.xc)(l),Jd=l=>(Jd=G.yc)(l),Yd=(l,p,m)=>(Yd=G.zc)(l,p,m),Qd=l=>(Qd=G.Ac)(l),ep=t.dynCall_iii=(l,p,m)=>(ep=t.dynCall_iii=G.Bc)(l,p,m),tp=t.dynCall_vi=(l,p)=>(tp=t.dynCall_vi=G.Cc)(l,p),Is=t.dynCall_ii=(l,p)=>(Is=t.dynCall_ii=G.Dc)(l,p),rp=t.dynCall_vii=(l,p,m)=>(rp=t.dynCall_vii=G.Ec)(l,p,m),np=t.dynCall_iiii=(l,p,m,g)=>(np=t.dynCall_iiii=G.Fc)(l,p,m,g),op=t.dynCall_viii=(l,p,m,g)=>(op=t.dynCall_viii=G.Gc)(l,p,m,g),ip=t.dynCall_iiiii=(l,p,m,g,_)=>(ip=t.dynCall_iiiii=G.Hc)(l,p,m,g,_),ap=t.dynCall_viiii=(l,p,m,g,_)=>(ap=t.dynCall_viiii=G.Ic)(l,p,m,g,_),sp=t.dynCall_viiiiii=(l,p,m,g,_,S,O)=>(sp=t.dynCall_viiiiii=G.Jc)(l,p,m,g,_,S,O),up=t.dynCall_viiiiiii=(l,p,m,g,_,S,O,L)=>(up=t.dynCall_viiiiiii=G.Kc)(l,p,m,g,_,S,O,L),lp=t.dynCall_ji=(l,p)=>(lp=t.dynCall_ji=G.Lc)(l,p),cp=t.dynCall_v=l=>(cp=t.dynCall_v=G.Mc)(l),dp=t.dynCall_viiiii=(l,p,m,g,_,S)=>(dp=t.dynCall_viiiii=G.Nc)(l,p,m,g,_,S),pp=t.dynCall_i=l=>(pp=t.dynCall_i=G.Oc)(l),fp=t.dynCall_fii=(l,p,m)=>(fp=t.dynCall_fii=G.Pc)(l,p,m),hp=t.dynCall_viiiiiiii=(l,p,m,g,_,S,O,L,B)=>(hp=t.dynCall_viiiiiiii=G.Qc)(l,p,m,g,_,S,O,L,B),mp=t.dynCall_viiiiiiiiii=(l,p,m,g,_,S,O,L,B,H,J)=>(mp=t.dynCall_viiiiiiiiii=G.Rc)(l,p,m,g,_,S,O,L,B,H,J),gp=t.dynCall_jiii=(l,p,m,g)=>(gp=t.dynCall_jiii=G.Sc)(l,p,m,g),bp=t.dynCall_dii=(l,p,m)=>(bp=t.dynCall_dii=G.Tc)(l,p,m),yp=t.dynCall_viiiiiiiii=(l,p,m,g,_,S,O,L,B,H)=>(yp=t.dynCall_viiiiiiiii=G.Uc)(l,p,m,g,_,S,O,L,B,H),_p=t.dynCall_viiiiiiiiiii=(l,p,m,g,_,S,O,L,B,H,J,ie)=>(_p=t.dynCall_viiiiiiiiiii=G.Vc)(l,p,m,g,_,S,O,L,B,H,J,ie),vp=t.dynCall_iiiiii=(l,p,m,g,_,S)=>(vp=t.dynCall_iiiiii=G.Wc)(l,p,m,g,_,S),xp=t.dynCall_iij=(l,p,m)=>(xp=t.dynCall_iij=G.Xc)(l,p,m),wp=t.dynCall_iiiiiiiiii=(l,p,m,g,_,S,O,L,B,H)=>(wp=t.dynCall_iiiiiiiiii=G.Yc)(l,p,m,g,_,S,O,L,B,H),Tp=t.dynCall_iiiiiiiiiii=(l,p,m,g,_,S,O,L,B,H,J)=>(Tp=t.dynCall_iiiiiiiiiii=G.Zc)(l,p,m,g,_,S,O,L,B,H,J),Ip=t.dynCall_vij=(l,p,m)=>(Ip=t.dynCall_vij=G._c)(l,p,m),Sp=t.dynCall_iiif=(l,p,m,g)=>(Sp=t.dynCall_iiif=G.$c)(l,p,m,g),$p=t.dynCall_iiij=(l,p,m,g)=>($p=t.dynCall_iiij=G.ad)(l,p,m,g),Ap=t.dynCall_fiii=(l,p,m,g)=>(Ap=t.dynCall_fiii=G.bd)(l,p,m,g),Op=t.dynCall_viiiiiiiiiiiii=(l,p,m,g,_,S,O,L,B,H,J,ie,ye,Ge)=>(Op=t.dynCall_viiiiiiiiiiiii=G.cd)(l,p,m,g,_,S,O,L,B,H,J,ie,ye,Ge),Pp=t.dynCall_vjiii=(l,p,m,g,_)=>(Pp=t.dynCall_vjiii=G.dd)(l,p,m,g,_),Ep=t.dynCall_vif=(l,p,m)=>(Ep=t.dynCall_vif=G.ed)(l,p,m),Cp=t.dynCall_iiiiiii=(l,p,m,g,_,S,O)=>(Cp=t.dynCall_iiiiiii=G.fd)(l,p,m,g,_,S,O),Dp=t.dynCall_iiiij=(l,p,m,g,_)=>(Dp=t.dynCall_iiiij=G.gd)(l,p,m,g,_),kp=t.dynCall_iiiiiiii=(l,p,m,g,_,S,O,L)=>(kp=t.dynCall_iiiiiiii=G.hd)(l,p,m,g,_,S,O,L),Np=t.dynCall_viiiiiiiiiiii=(l,p,m,g,_,S,O,L,B,H,J,ie,ye)=>(Np=t.dynCall_viiiiiiiiiiii=G.id)(l,p,m,g,_,S,O,L,B,H,J,ie,ye),Lp=t.dynCall_diii=(l,p,m,g)=>(Lp=t.dynCall_diii=G.jd)(l,p,m,g),Rp=t.dynCall_jiiii=(l,p,m,g,_)=>(Rp=t.dynCall_jiiii=G.kd)(l,p,m,g,_),zp=t.dynCall_viiij=(l,p,m,g,_)=>(zp=t.dynCall_viiij=G.ld)(l,p,m,g,_),Mp=t.dynCall_fiiii=(l,p,m,g,_)=>(Mp=t.dynCall_fiiii=G.md)(l,p,m,g,_),Bp=t.dynCall_viiif=(l,p,m,g,_)=>(Bp=t.dynCall_viiif=G.nd)(l,p,m,g,_),Fp=t.dynCall_diiii=(l,p,m,g,_)=>(Fp=t.dynCall_diiii=G.od)(l,p,m,g,_),Vp=t.dynCall_viiid=(l,p,m,g,_)=>(Vp=t.dynCall_viiid=G.pd)(l,p,m,g,_),Gp=t.dynCall_iiiijii=(l,p,m,g,_,S,O)=>(Gp=t.dynCall_iiiijii=G.qd)(l,p,m,g,_,S,O),Up=t.dynCall_iiiiiij=(l,p,m,g,_,S,O)=>(Up=t.dynCall_iiiiiij=G.rd)(l,p,m,g,_,S,O),Wp=l=>(Wp=G.sd)(l),Hp=()=>(Hp=G.td)(),qp=l=>(qp=G.ud)(l),jp=()=>(jp=G.vd)();function w2(l,p,m){var g=he();try{rp(l,p,m)}catch(_){if(fe(g),_!==_+0)throw _;be(1,0)}}function T2(l,p,m){var g=he();try{return ep(l,p,m)}catch(_){if(fe(g),_!==_+0)throw _;be(1,0)}}function I2(l,p){var m=he();try{tp(l,p)}catch(g){if(fe(m),g!==g+0)throw g;be(1,0)}}function S2(l,p){var m=he();try{return Is(l,p)}catch(g){if(fe(m),g!==g+0)throw g;be(1,0)}}function $2(l,p,m,g){var _=he();try{return np(l,p,m,g)}catch(S){if(fe(_),S!==S+0)throw S;be(1,0)}}function A2(l,p,m,g,_){var S=he();try{ap(l,p,m,g,_)}catch(O){if(fe(S),O!==O+0)throw O;be(1,0)}}function O2(l,p,m,g,_){var S=he();try{return ip(l,p,m,g,_)}catch(O){if(fe(S),O!==O+0)throw O;be(1,0)}}function P2(l,p,m,g){var _=he();try{op(l,p,m,g)}catch(S){if(fe(_),S!==S+0)throw S;be(1,0)}}function E2(l,p,m,g,_,S,O){var L=he();try{return Cp(l,p,m,g,_,S,O)}catch(B){if(fe(L),B!==B+0)throw B;be(1,0)}}function C2(l){var p=he();try{cp(l)}catch(m){if(fe(p),m!==m+0)throw m;be(1,0)}}function D2(l,p,m){var g=he();try{return xp(l,p,m)}catch(_){if(fe(g),_!==_+0)throw _;be(1,0)}}function k2(l,p,m,g,_,S){var O=he();try{dp(l,p,m,g,_,S)}catch(L){if(fe(O),L!==L+0)throw L;be(1,0)}}function N2(l,p,m){var g=he();try{Ip(l,p,m)}catch(_){if(fe(g),_!==_+0)throw _;be(1,0)}}function L2(l,p,m,g,_,S,O){var L=he();try{sp(l,p,m,g,_,S,O)}catch(B){if(fe(L),B!==B+0)throw B;be(1,0)}}function R2(l,p,m,g,_,S,O,L){var B=he();try{up(l,p,m,g,_,S,O,L)}catch(H){if(fe(B),H!==H+0)throw H;be(1,0)}}function z2(l,p,m,g,_,S){var O=he();try{return vp(l,p,m,g,_,S)}catch(L){if(fe(O),L!==L+0)throw L;be(1,0)}}function M2(l,p,m,g,_,S,O,L){var B=he();try{return kp(l,p,m,g,_,S,O,L)}catch(H){if(fe(B),H!==H+0)throw H;be(1,0)}}function B2(l,p,m,g,_,S,O,L,B,H){var J=he();try{yp(l,p,m,g,_,S,O,L,B,H)}catch(ie){if(fe(J),ie!==ie+0)throw ie;be(1,0)}}function F2(l,p,m,g,_,S,O,L,B){var H=he();try{hp(l,p,m,g,_,S,O,L,B)}catch(J){if(fe(H),J!==J+0)throw J;be(1,0)}}function V2(l){var p=he();try{return pp(l)}catch(m){if(fe(p),m!==m+0)throw m;be(1,0)}}function G2(l,p,m,g,_,S,O,L,B,H){var J=he();try{return wp(l,p,m,g,_,S,O,L,B,H)}catch(ie){if(fe(J),ie!==ie+0)throw ie;be(1,0)}}function U2(l,p,m){var g=he();try{return fp(l,p,m)}catch(_){if(fe(g),_!==_+0)throw _;be(1,0)}}function W2(l,p,m,g){var _=he();try{return gp(l,p,m,g)}catch(S){if(fe(_),S!==S+0)throw S;return be(1,0),0n}}function H2(l,p,m){var g=he();try{return bp(l,p,m)}catch(_){if(fe(g),_!==_+0)throw _;be(1,0)}}function q2(l,p,m,g,_,S,O,L,B,H,J,ie){var ye=he();try{_p(l,p,m,g,_,S,O,L,B,H,J,ie)}catch(Ge){if(fe(ye),Ge!==Ge+0)throw Ge;be(1,0)}}function j2(l,p,m,g,_,S,O,L,B,H,J){var ie=he();try{mp(l,p,m,g,_,S,O,L,B,H,J)}catch(ye){if(fe(ie),ye!==ye+0)throw ye;be(1,0)}}function K2(l,p,m,g,_,S,O,L,B,H,J){var ie=he();try{return Tp(l,p,m,g,_,S,O,L,B,H,J)}catch(ye){if(fe(ie),ye!==ye+0)throw ye;be(1,0)}}function X2(l,p,m,g){var _=he();try{return Sp(l,p,m,g)}catch(S){if(fe(_),S!==S+0)throw S;be(1,0)}}function Z2(l,p,m,g){var _=he();try{return $p(l,p,m,g)}catch(S){if(fe(_),S!==S+0)throw S;be(1,0)}}function J2(l,p,m,g){var _=he();try{return Ap(l,p,m,g)}catch(S){if(fe(_),S!==S+0)throw S;be(1,0)}}function Y2(l,p,m,g,_,S,O,L,B,H,J,ie,ye,Ge){var Et=he();try{Op(l,p,m,g,_,S,O,L,B,H,J,ie,ye,Ge)}catch(go){if(fe(Et),go!==go+0)throw go;be(1,0)}}function Q2(l,p,m,g,_){var S=he();try{Pp(l,p,m,g,_)}catch(O){if(fe(S),O!==O+0)throw O;be(1,0)}}function e1(l,p,m){var g=he();try{Ep(l,p,m)}catch(_){if(fe(g),_!==_+0)throw _;be(1,0)}}function t1(l,p){var m=he();try{return lp(l,p)}catch(g){if(fe(m),g!==g+0)throw g;return be(1,0),0n}}function r1(l,p,m,g,_){var S=he();try{return Dp(l,p,m,g,_)}catch(O){if(fe(S),O!==O+0)throw O;be(1,0)}}function n1(l,p,m,g,_,S,O,L,B,H,J,ie,ye){var Ge=he();try{Np(l,p,m,g,_,S,O,L,B,H,J,ie,ye)}catch(Et){if(fe(Ge),Et!==Et+0)throw Et;be(1,0)}}function o1(l,p,m,g){var _=he();try{return Lp(l,p,m,g)}catch(S){if(fe(_),S!==S+0)throw S;be(1,0)}}function i1(l,p,m,g,_){var S=he();try{return Rp(l,p,m,g,_)}catch(O){if(fe(S),O!==O+0)throw O;return be(1,0),0n}}function a1(l,p,m,g,_){var S=he();try{zp(l,p,m,g,_)}catch(O){if(fe(S),O!==O+0)throw O;be(1,0)}}function s1(l,p,m,g,_){var S=he();try{return Mp(l,p,m,g,_)}catch(O){if(fe(S),O!==O+0)throw O;be(1,0)}}function u1(l,p,m,g,_){var S=he();try{Bp(l,p,m,g,_)}catch(O){if(fe(S),O!==O+0)throw O;be(1,0)}}function l1(l,p,m,g,_){var S=he();try{return Fp(l,p,m,g,_)}catch(O){if(fe(S),O!==O+0)throw O;be(1,0)}}function c1(l,p,m,g,_){var S=he();try{Vp(l,p,m,g,_)}catch(O){if(fe(S),O!==O+0)throw O;be(1,0)}}function d1(l,p,m,g,_,S,O){var L=he();try{return Gp(l,p,m,g,_,S,O)}catch(B){if(fe(L),B!==B+0)throw B;be(1,0)}}function p1(l,p,m,g,_,S,O){var L=he();try{return Up(l,p,m,g,_,S,O)}catch(B){if(fe(L),B!==B+0)throw B;be(1,0)}}return t.stackSave=()=>he(),t.stackRestore=l=>fe(l),t.stackAlloc=l=>Ts(l),t.setValue=function(l,p,m="i8"){switch(m.endsWith("*")&&(m="*"),m){case"i1":case"i8":ee()[l>>>0]=p;break;case"i16":nt()[l>>>1>>>0]=p;break;case"i32":M()[l>>>2>>>0]=p;break;case"i64":W[l>>>3]=BigInt(p);break;case"float":re()[l>>>2>>>0]=p;break;case"double":Oe()[l>>>3>>>0]=p;break;case"*":F()[l>>>2>>>0]=p;break;default:qr(`invalid type for setValue: ${m}`)}},t.getValue=function(l,p="i8"){switch(p.endsWith("*")&&(p="*"),p){case"i1":case"i8":return ee()[l>>>0];case"i16":return nt()[l>>>1>>>0];case"i32":return M()[l>>>2>>>0];case"i64":return W[l>>>3];case"float":return re()[l>>>2>>>0];case"double":return Oe()[l>>>3>>>0];case"*":return F()[l>>>2>>>0];default:qr(`invalid type for getValue: ${p}`)}},t.UTF8ToString=Qe,t.stringToUTF8=Un,t.lengthBytesUTF8=od,function l(){if(0<_n)po=l;else if(s)e(t),Yt();else{for(;0<os.length;)os.shift()(t);0<_n?po=l:(t.calledRun=!0,le||(Yt(),e(t)))}}(),t.PTR_SIZE=4,o}),h3=a_,m3=globalThis.self?.name?.startsWith("em-pthread");m3&&a_()});var d_,g3,Ot,p_,rc,b3,y3,f_,_3,l_,h_,c_,m_,pa=k(()=>{"use strict";da();d_=typeof location>"u"?void 0:location.origin,g3=()=>{if(!!1)return import.meta.url?.startsWith("file:")?new URL(new URL("ort.all.bundle.min.mjs",import.meta.url).href,d_).href:import.meta.url},Ot=g3(),p_=()=>{if(Ot&&!Ot.startsWith("blob:"))return Ot.substring(0,Ot.lastIndexOf("/")+1)},rc=(n,e)=>{try{let r=e??Ot;return(r?new URL(n,r):new URL(n)).origin===d_}catch{return!1}},b3=(n,e)=>{let r=e??Ot;try{return(r?new URL(n,r):new URL(n)).href}catch{return}},y3=(n,e)=>`${e??"./"}${n}`,f_=async n=>{let r=await(await fetch(n,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},_3=async n=>(await import(/*webpackIgnore:true*/n)).default,l_=(i_(),bo(o_)).default,h_=async()=>{if(!Ot)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(rc(Ot))return[void 0,l_()];let n=await f_(Ot);return[n,l_(n)]},c_=(u_(),bo(s_)).default,m_=async(n,e,r)=>{if(!n&&!e&&c_&&Ot&&rc(Ot))return[void 0,c_];{let t="ort-wasm-simd-threaded.jsep.mjs",o=n??b3(t,e),i=!!1&&r&&o&&!rc(o,e),a=i?await f_(o):o??y3(t,e);return[i?a:void 0,await _3(a)]}}});var nc,oc,xa,g_,v3,x3,fa,Ye,hn=k(()=>{"use strict";pa();oc=!1,xa=!1,g_=!1,v3=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},x3=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},fa=async n=>{if(oc)return Promise.resolve();if(xa)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(g_)throw new Error("previous call to 'initializeWebAssembly()' failed.");xa=!0;let e=n.initTimeout,r=n.numThreads;if(!x3())throw new Error("WebAssembly SIMD is not supported in the current environment.");let t=v3();r>1&&!t&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),n.numThreads=r=1);let o=n.wasmPaths,i=typeof o=="string"?o:void 0,a=o?.mjs,s=a?.href??a,u=o?.wasm,c=u?.href??u,d=n.wasmBinary,[f,h]=await m_(s,i,r>1),b=!1,y=[];if(e>0&&y.push(new Promise(v=>{setTimeout(()=>{b=!0,v()},e)})),y.push(new Promise((v,T)=>{let x={numThreads:r};if(d)x.wasmBinary=d;else if(c||i)x.locateFile=w=>c??i+w;else if(s&&s.indexOf("blob:")!==0)x.locateFile=w=>new URL(w,s).href;else if(f){let w=p_();w&&(x.locateFile=I=>w+I)}h(x).then(w=>{xa=!1,oc=!0,nc=w,v(),f&&URL.revokeObjectURL(f)},w=>{xa=!1,g_=!0,T(w)})})),await Promise.race(y),b)throw new Error(`WebAssembly backend initializing failed due to timeout: ${e}ms`)},Ye=()=>{if(oc&&nc)return nc;throw new Error("WebAssembly is not initialized yet.")}});var at,Bo,Ee,wa=k(()=>{"use strict";hn();at=(n,e)=>{let r=Ye(),t=r.lengthBytesUTF8(n)+1,o=r._malloc(t);return r.stringToUTF8(n,o,t),e.push(o),o},Bo=(n,e,r,t)=>{if(typeof n=="object"&&n!==null){if(r.has(n))throw new Error("Circular reference in options");r.add(n)}Object.entries(n).forEach(([o,i])=>{let a=e?e+o:o;if(typeof i=="object")Bo(i,a+".",r,t);else if(typeof i=="string"||typeof i=="number")t(a,i.toString());else if(typeof i=="boolean")t(a,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},Ee=n=>{let e=Ye(),r=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetLastError(o,o+t);let i=Number(e.getValue(o,t===4?"i32":"i64")),a=e.getValue(o+t,"*"),s=a?e.UTF8ToString(a):"";throw new Error(`${n} ERROR_CODE: ${i}, ERROR_MESSAGE: ${s}`)}finally{e.stackRestore(r)}}});var b_,y_=k(()=>{"use strict";hn();wa();b_=n=>{let e=Ye(),r=0,t=[],o=n||{};try{if(n?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof n.logSeverityLevel!="number"||!Number.isInteger(n.logSeverityLevel)||n.logSeverityLevel<0||n.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${n.logSeverityLevel}`);if(n?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof n.logVerbosityLevel!="number"||!Number.isInteger(n.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${n.logVerbosityLevel}`);n?.terminate===void 0&&(o.terminate=!1);let i=0;return n?.tag!==void 0&&(i=at(n.tag,t)),r=e._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),r===0&&Ee("Can't create run options."),n?.extra!==void 0&&Bo(n.extra,"",new WeakSet,(a,s)=>{let u=at(a,t),c=at(s,t);e._OrtAddRunConfigEntry(r,u,c)!==0&&Ee(`Can't set a run config entry: ${a} - ${s}.`)}),[r,t]}catch(i){throw r!==0&&e._OrtReleaseRunOptions(r),t.forEach(a=>e._free(a)),i}}});var w3,T3,I3,S3,__,v_=k(()=>{"use strict";hn();wa();w3=n=>{switch(n){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${n}`)}},T3=n=>{switch(n){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${n}`)}},I3=n=>{n.extra||(n.extra={}),n.extra.session||(n.extra.session={});let e=n.extra.session;e.use_ort_model_bytes_directly||(e.use_ort_model_bytes_directly="1"),n.executionProviders&&n.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(n.enableMemPattern=!1)},S3=(n,e,r)=>{for(let t of e){let o=typeof t=="string"?t:t.name;switch(o){case"webnn":if(o="WEBNN",typeof t!="string"){let s=t?.deviceType;if(s){let u=at("deviceType",r),c=at(s,r);Ye()._OrtAddSessionConfigEntry(n,u,c)!==0&&Ee(`Can't set a session config entry: 'deviceType' - ${s}.`)}}break;case"webgpu":if(o="JS",typeof t!="string"){let a=t;if(a?.preferredLayout){if(a.preferredLayout!=="NCHW"&&a.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${a.preferredLayout}`);let s=at("preferredLayout",r),u=at(a.preferredLayout,r);Ye()._OrtAddSessionConfigEntry(n,s,u)!==0&&Ee(`Can't set a session config entry: 'preferredLayout' - ${a.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let i=at(o,r);Ye()._OrtAppendExecutionProvider(n,i)!==0&&Ee(`Can't append execution provider: ${o}.`)}},__=n=>{let e=Ye(),r=0,t=[],o=n||{};I3(o);try{let i=w3(o.graphOptimizationLevel??"all"),a=T3(o.executionMode??"sequential"),s=typeof o.logId=="string"?at(o.logId,t):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log serverity level is not valid: ${u}`);let c=o.logVerbosityLevel??0;if(!Number.isInteger(c)||c<0||c>4)throw new Error(`log verbosity level is not valid: ${c}`);let d=typeof o.optimizedModelFilePath=="string"?at(o.optimizedModelFilePath,t):0;if(r=e._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,a,!!o.enableProfiling,0,s,u,c,d),r===0&&Ee("Can't create session options."),o.executionProviders&&S3(r,o.executionProviders,t),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let f=at("enableGraphCapture",t),h=at(o.enableGraphCapture.toString(),t);e._OrtAddSessionConfigEntry(r,f,h)!==0&&Ee(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[f,h]of Object.entries(o.freeDimensionOverrides)){if(typeof f!="string")throw new Error(`free dimension override name must be a string: ${f}`);if(typeof h!="number"||!Number.isInteger(h)||h<0)throw new Error(`free dimension override value must be a non-negative integer: ${h}`);let b=at(f,t);e._OrtAddFreeDimensionOverride(r,b,h)!==0&&Ee(`Can't set a free dimension override: ${f} - ${h}.`)}return o.extra!==void 0&&Bo(o.extra,"",new WeakSet,(f,h)=>{let b=at(f,t),y=at(h,t);e._OrtAddSessionConfigEntry(r,b,y)!==0&&Ee(`Can't set a session config entry: ${f} - ${h}.`)}),[r,t]}catch(i){throw r!==0&&e._OrtReleaseSessionOptions(r)!==0&&Ee("Can't release session options."),t.forEach(a=>e._free(a)),i}}});var oo,mn,gn,Ta,Fo,Ia,Sa,ic,ce=k(()=>{"use strict";oo=n=>{switch(n){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${n}`)}},mn=n=>{switch(n){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${n}`)}},gn=(n,e)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][n],t=typeof e=="number"?e:e.reduce((o,i)=>o*i,1);return r>0?Math.ceil(t*r):void 0},Ta=n=>{switch(n){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${n}`)}},Fo=n=>{switch(n){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${n}`)}},Ia=n=>n==="float32"||n==="float16"||n==="int32"||n==="int64"||n==="uint32"||n==="uint8"||n==="bool"||n==="uint4"||n==="int4",Sa=n=>n==="float32"||n==="float16"||n==="int32"||n==="int64"||n==="uint32"||n==="uint64"||n==="int8"||n==="uint8"||n==="bool"||n==="uint4"||n==="int4",ic=n=>{switch(n){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${n}`)}}});var Vo,ac=k(()=>{"use strict";da();Vo=async n=>{if(typeof n=="string")if(!1)try{let{readFile:e}=Ss("node:fs/promises");return new Uint8Array(await e(n))}catch(e){if(e.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=Ss("node:fs"),t=r(n),o=[];for await(let i of t)o.push(i);return new Uint8Array(Buffer.concat(o))}throw e}else{let e=await fetch(n);if(!e.ok)throw new Error(`failed to load external data file: ${n}`);let r=e.headers.get("Content-Length"),t=r?parseInt(r,10):0;if(t<1073741824)return new Uint8Array(await e.arrayBuffer());{if(!e.body)throw new Error(`failed to load external data file: ${n}, no response body.`);let o=e.body.getReader(),i;try{i=new ArrayBuffer(t)}catch(s){if(s instanceof RangeError){let u=Math.ceil(t/65536);i=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw s}let a=0;for(;;){let{done:s,value:u}=await o.read();if(s)break;let c=u.byteLength;new Uint8Array(i,a,c).set(u),a+=c}return new Uint8Array(i,0,t)}}else return n instanceof Blob?new Uint8Array(await n.arrayBuffer()):n instanceof Uint8Array?n:new Uint8Array(n)}});var $3,A3,x_,w_,$a,O3,Ie,Br=k(()=>{"use strict";ce();$3=["V","I","W","E","F"],A3=(n,e)=>{console.log(`[${$3[n]},${new Date().toISOString()}]${e}`)},$a=(n,e)=>{x_=n,w_=e},O3=(n,e)=>{let r=Fo(n),t=Fo(x_);r>=t&&A3(r,typeof e=="function"?e():e)},Ie=(...n)=>{w_&&O3(...n)}});var Aa,sc=k(()=>{"use strict";ce();Aa=(n,e)=>new(Ta(e))(n)});var Oa=k(()=>{"use strict"});var T_,uc,lc,P3,E3,I_,dc,cc,$_,A_=k(()=>{"use strict";Br();Oa();T_=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),uc=[],lc=n=>Math.ceil(Number(n)/16)*16,P3=n=>{for(let e=0;e<uc.length;e++){let r=uc[e];if(n<=r)return r}return Math.ceil(n/16)*16},E3=1,I_=()=>E3++,dc=async(n,e,r,t)=>{let o=lc(r),i=n.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=n.getCommandEncoder();n.endComputePass(),a.copyBufferToBuffer(e,0,i,0,o),n.flush(),await i.mapAsync(GPUMapMode.READ);let s=i.getMappedRange();if(t){let u=t();return u.set(new Uint8Array(s,0,r)),u}else return new Uint8Array(s.slice(0,r))}finally{i.destroy()}},cc=class{constructor(e){this.backend=e;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[r]of T_)uc.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(e,r){let t=r.buffer,o=r.byteOffset,i=r.byteLength,a=lc(i),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${i}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),c=u.getMappedRange();new Uint8Array(c).set(new Uint8Array(t,o,i)),u.unmap();let d=this.backend.device.createCommandEncoder();d.copyBufferToBuffer(u,0,s.gpuData.buffer,0,a),this.backend.device.queue.submit([d.finish()]),u.destroy(),Ie("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,r){let t=this.storageCache.get(e);if(!t)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(t.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=lc(t.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(t.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(e,r,t){let o;if(t){if(o=t[0],e===t[1])return Ie("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=I_();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:e},originalSize:r}),Ie("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),Ie("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let t=P3(e),o,i=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let c=(i?this.freeBuffers:this.freeUniformBuffers).get(t);c?c.length>0?o=c.pop():o=this.backend.device.createBuffer({size:t,usage:r}):o=this.backend.device.createBuffer({size:t,usage:r})}else o=this.backend.device.createBuffer({size:t,usage:r});let s={id:I_(),type:0,buffer:o};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),Ie("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let r=typeof e=="bigint"?Number(e):e,t=this.storageCache.get(r);if(!t){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return Ie("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${t.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(t.gpuData.buffer),t.originalSize}async download(e,r){let t=this.storageCache.get(Number(e));if(!t)throw new Error("data does not exist");await dc(this.backend,t.gpuData.buffer,t.originalSize,r)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let r=T_.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let t=this.freeBuffers.get(e.size)||[];r===void 0||t.length>=r?e.destroy():t.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let t=this.freeUniformBuffers.get(e.size)||[];r===void 0||t.length>=r?e.destroy():t.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let r of this.buffersPending)e.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let r=this.capturedPendingBuffers.get(e);r&&(r.forEach(t=>{t.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(Ie("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.storageCache=new Map)}},$_=(...n)=>new cc(...n)});var pc,de,Je=k(()=>{"use strict";pc=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},de=n=>new pc(n)});var fc,Fr,D,zn,Pa,O_,P_,ge=k(()=>{"use strict";fc=class{static calcMatMulShape(e,r){return e[1]!==r[0]?void 0:[e[0],r[1]]}},Fr=class{static calcShape(e,r,t=!1){let o=e.length,i=r.length;if(o===0)return r;if(i===0)return e;let a=Math.max(e.length,r.length),s=new Array(a);if(t){if(o<2||i<2)return;let u=fc.calcMatMulShape([e[o-2],e[o-1]],[r[i-2],r[i-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=t?3:1;u<=a;u++){let c=o-u<0?1:e[o-u],d=i-u<0?1:r[i-u];if(c!==d&&c>1&&d>1)return;let f=Math.max(c,d);if(c&&d)s[a-u]=Math.max(c,d);else{if(f>1)return;s[a-u]=0}}return s}static isValidBroadcast(e,r){let t=e.length,o=r.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==r[o-i])return!1;return!0}},D=class n{static size(e){return n.getSizeFromDimensionRange(e,0,e.length)}static convertShape(e,r=4){let t=e.length;if(t===0)return[];let o=new Array(t),i=t-1;for(;i>=0;){if(e[i]%r===0){o[i]=e[i]/r;break}if(r%e[i]!==0)throw new Error("cannot convert shape");o[i]=1,r/=e[i],i--}for(i--;i>=0;i--)o[i]=e[i];return o}static sizeFromDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,r,e.length)}static sizeToDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,0,r)}static getSizeFromDimensionRange(e,r,t){let o=1;for(let i=r;i<t;i++){if(e[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(e[i])}return o}static computeStrides(e){let r=e.length;if(r===0)return[];if(r===1)return[1];let t=new Array(r);t[r-1]=1,t[r-2]=e[r-1];for(let o=r-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static normalizeAxis(e,r){if(e<-r&&e>=r)throw new Error("unsupported axis for this operation.");return e<0?e+r:e}static normalizeAxes(e,r){return e.map(t=>this.normalizeAxis(t,r??e.length))}static sortBasedOnPerm(e,r){return r?r.map(t=>e[t]):e.slice().reverse()}static padShape(e,r){let t=e.length;return e.map((o,i)=>o+r[i]+r[i+t])}static areEqual(e,r){return e.length!==r.length?!1:e.every((t,o)=>t===r[o])}},zn=class n{static adjustPoolAttributes(e,r,t,o,i,a){if(!e&&t.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let s=0;s<r.length-2;s++)s>=t.length?t.push(r[s+2]):t[s]=r[s+2];for(let s=0;s<t.length;s++)if(s<o.length){if(o[s]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let s=0;s<t.length;s++)if(s<i.length){if(i[s]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let s=0;s<t.length*2;s++)if(s<a.length){if(a[s]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let s=0;s<t.length;s++){if(t[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[s]>=t[s]||a[s+t.length]>=t[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,r,t,o,i,a,s){if(s){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<e.length-2;u++)n.adjustPadAndReturnShape(e[u+(a?1:2)],r[u],t[u],o[u],i,u,u+e.length-2,s)}}static computePoolOutputShape(e,r,t,o,i,a,s){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return n.computeShapeHelper(e,r,u,t,o,i,a,s),u}static computeConvOutputShape(e,r,t,o,i,a,s){if(e.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],r[0]];return n.computeShapeHelper(!1,e,u,t,o,i,a,s),u}static computeShapeHelper(e,r,t,o,i,a,s,u){if(e)for(let c=0;c<r.length-2;c++)t.push(1);else for(let c=0;c<r.length-2;c++)t.push(n.adjustPadAndReturnShape(r[c+2],o[c],i[c],a[c],s,c,c+r.length-2,u))}static adjustPadAndReturnShape(e,r,t,o,i,a,s,u){let c=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[a]=0,i[s]=0,Math.floor((e-c)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let f=((e+r-1)/r-1)*r+o-e;return i[a]=Math.floor(u==="SAME_LOWER"?(f+1)/2:f/2),i[s]=f-i[a],Math.floor((e+f-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[a]+i[s]-c)/r+1)}},Pa=class{static getShapeOfGemmResult(e,r,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let a,s,u;r?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let c=-1;if(o?(u=t[0],c=1):(u=t[1],c=0),t[c]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(i&&!Fr.isValidBroadcast(i,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},O_=-34028234663852886e22,P_=34028234663852886e22});var Mn,mc,Fe,st,q,Ce,gc,Bn,Kt,Y,Ea,N,U,E_,Ca,hc,C_,xe=k(()=>{"use strict";ce();ge();Mn=64,mc=(n,e)=>{if(e===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(n)){case 10:return e>1?`vec${e}<f16>`:"f16";case 1:return e>1?`vec${e}<f32>`:"f32";case 6:return e>1?`vec${e}<i32>`:"i32";case 12:return e>1?`vec${e}<u32>`:"u32";case 7:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(e!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${n}`)}},Fe=(n,e=1)=>{let r=mc(n,e);return typeof r=="string"?r:r[0]},st=(n,e=1)=>{let r=mc(n,e);return typeof r=="string"?r:r[1]},q=(...n)=>{let e=[];return n.forEach(r=>{r.length!==0&&e.push({type:12,data:r},{type:12,data:D.computeStrides(r)})}),e},Ce=n=>n%4===0?4:n%2===0?2:1,gc=(n="f32",e,r="0")=>!e||e===1?`${n}(${r})`:`vec${e}<${n}>(${r})`,Bn=(n,e,r)=>n==="f32"?r:e===1?`f32(${r})`:`vec${e}<f32>(${r})`,Kt=(n,e)=>e===4?`(${n}.x + ${n}.y + ${n}.z + ${n}.w)`:e===2?`(${n}.x + ${n}.y)`:e===3?`(${n}.x + ${n}.y + ${n}.z)`:n,Y=(n,e,r,t)=>n.startsWith("uniforms.")&&r>4?typeof e=="string"?t==="f16"?`${n}[(${e}) / 8][(${e}) % 8 / 4][(${e}) % 8 % 4]`:`${n}[(${e}) / 4][(${e}) % 4]`:t==="f16"?`${n}[${Math.floor(e/8)}][${Math.floor(e%8/4)}][${e%8%4}]`:`${n}[${Math.floor(e/4)}][${e%4}]`:r>1?`${n}[${e}]`:n,Ea=(n,e,r,t,o)=>{let i=typeof r=="number",a=i?r:r.length,s=[...new Array(a).keys()],u=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,c=mc(e,o),d=typeof c=="string"?c:c[1],f=typeof c=="string"?c:c[0],h={indices:u,value:d,storage:f,tensor:e},b=F=>typeof F=="string"?F:`${F}u`,y={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},v=i?"uniforms.":"",T=`${v}${n}_shape`,x=`${v}${n}_strides`,w="";for(let F=0;F<a-1;F++)w+=`
    let dim${F} = current / ${Y(x,F,a)};
    let rest${F} = current % ${Y(x,F,a)};
    indices[${F}] = dim${F};
    current = rest${F};
    `;w+=`indices[${a-1}] = current;`;let I=a<2?"":`
  fn o2i_${n}(offset: u32) -> ${h.indices} {
    var indices: ${h.indices};
    var current = offset;
    ${w}
    return indices;
  }`,A=F=>(y.offsetToIndices=!0,a<2?F:`o2i_${n}(${F})`),P=[];if(a>=2)for(let F=a-1;F>=0;F--)P.push(`${Y(x,F,a)} * (indices[${F}])`);let C=a<2?"":`
  fn i2o_${n}(indices: ${h.indices}) -> u32 {
    return ${P.join("+")};
  }`,R=F=>(y.indicesToOffset=!0,a<2?F:`i2o_${n}(${F})`),z=(...F)=>a===0?"0u":`${h.indices}(${F.map(b).join(",")})`,V=(F,re)=>a<2?`${F}`:`${Y(F,re,a)}`,X=(F,re,Oe)=>a<2?`${F}=${Oe};`:`${Y(F,re,a)}=${Oe};`,Q={},pe=(F,re)=>{y.broadcastedIndicesToOffset=!0;let Oe=`${re.name}broadcastedIndicesTo${n}Offset`;if(Oe in Q)return`${Oe}(${F})`;let Vt=[];for(let Ue=a-1;Ue>=0;Ue--){let Le=re.indicesGet("outputIndices",Ue+re.rank-a);Vt.push(`${V(x,Ue)} * (${Le} % ${V(T,Ue)})`)}return Q[Oe]=`fn ${Oe}(outputIndices: ${re.type.indices}) -> u32 {
             return ${Vt.length>0?Vt.join("+"):"0u"};
           }`,`${Oe}(${F})`},W=(F,re)=>(()=>{if(h.storage===h.value)return`${n}[${F}]=${re};`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`${n}[${F}]=vec2<u32>(u32(${re}), select(0u, 0xFFFFFFFFu, ${re} < 0));`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`${n}[${F}]=vec2<u32>(u32(${re}), 0u);`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`${n}[${F}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${re}));`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),ue=F=>(()=>{if(h.storage===h.value)return`${n}[${F}]`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`i32(${n}[${F}].x)`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`u32(${n}[${F}].x)`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`vec4<bool>(bool(${n}[${F}] & 0xFFu), bool(${n}[${F}] & 0xFF00u), bool(${n}[${F}] & 0xFF0000u), bool(${n}[${F}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),Ve=a<2?"":`
  fn get_${n}ByIndices(indices: ${h.indices}) -> ${d} {
    return ${ue(`i2o_${n}(indices)`)};
  }`,te=a<2?"":(()=>{let F=s.map(Oe=>`d${Oe}: u32`).join(", "),re=s.map(Oe=>`d${Oe}`).join(", ");return`
  fn get_${n}(${F}) -> ${d} {
    return get_${n}ByIndices(${z(re)});
  }`})(),le=(...F)=>{if(F.length!==a)throw new Error(`indices length must be ${a}`);let re=F.map(b).join(",");return a===0?ue("0u"):a===1?ue(re[0]):(y.get=!0,y.getByIndices=!0,y.indicesToOffset=!0,`get_${n}(${re})`)},ve=F=>a<2?ue(F):(y.getByIndices=!0,y.indicesToOffset=!0,`get_${n}ByIndices(${F})`),ee=a<2?"":`
  fn set_${n}ByIndices(indices: ${h.indices}, value: ${d}) {
    ${W(`i2o_${n}(indices)`,"value")}
  }`,we=a<2?"":(()=>{let F=s.map(Oe=>`d${Oe}: u32`).join(", "),re=s.map(Oe=>`d${Oe}`).join(", ");return`
  fn set_${n}(${F}, value: ${d}) {
    set_${n}ByIndices(${z(re)}, value);
  }`})();return{impl:()=>{let F=[],re=!1;return y.offsetToIndices&&(F.push(I),re=!0),y.indicesToOffset&&(F.push(C),re=!0),y.broadcastedIndicesToOffset&&(Object.values(Q).forEach(Oe=>F.push(Oe)),re=!0),y.set&&(F.push(we),re=!0),y.setByIndices&&(F.push(ee),re=!0),y.get&&(F.push(te),re=!0),y.getByIndices&&(F.push(Ve),re=!0),!i&&re&&F.unshift(`const ${T} = ${h.indices}(${r.join(",")});`,`const ${x} = ${h.indices}(${D.computeStrides(r).join(",")});`),F.join(`
`)},type:h,offsetToIndices:A,indicesToOffset:R,broadcastedIndicesToOffset:pe,indices:z,indicesGet:V,indicesSet:X,set:(...F)=>{if(F.length!==a+1)throw new Error(`indices length must be ${a}`);let re=F[a];if(typeof re!="string")throw new Error("value must be string");let Oe=F.slice(0,a).map(b).join(",");return a===0?W("0u",re):a===1?W(Oe[0],re):(y.set=!0,y.setByIndices=!0,y.indicesToOffset=!0,`set_${n}(${Oe}, ${re})`)},setByOffset:W,setByIndices:(F,re)=>a<2?W(F,re):(y.setByIndices=!0,y.indicesToOffset=!0,`set_${n}ByIndices(${F}, ${re});`),get:le,getByOffset:ue,getByIndices:ve,usage:t,name:n,strides:x,shape:T,rank:a}},N=(n,e,r,t=1)=>Ea(n,e,r,"input",t),U=(n,e,r,t=1)=>Ea(n,e,r,"output",t),E_=(n,e,r)=>Ea(n,e,r,"atomicOutput",1),Ca=(n,e,r,t=1)=>Ea(n,e,r,"internal",t),hc=class{constructor(e,r){this.normalizedDispatchGroup=e;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Mn){let r=typeof e=="number"?e:e[0],t=typeof e=="number"?1:e[1],o=typeof e=="number"?1:e[2];if(r>this.limits.maxComputeWorkgroupSizeX||t>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${t}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*t*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${t}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
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
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[e(r.type),r.length??1])}},C_=(n,e)=>new hc(n,e)});var C3,D_,D3,k3,N3,L3,ut,k_,N_,Jr=k(()=>{"use strict";ce();ge();Je();xe();C3=(n,e)=>{if(!n||n.length!==1)throw new Error("Transpose requires 1 input.");if(e.length!==0&&e.length!==n[0].dims.length)throw new Error(`perm size ${e.length} does not match input rank ${n[0].dims.length}`)},D_=(n,e)=>e.length!==0?e:[...new Array(n).keys()].reverse(),D3=(n,e)=>D.sortBasedOnPerm(n,D_(n.length,e)),k3=(n,e,r,t)=>{let o=`fn perm(i: ${t.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let i=0;i<e;++i)o+=`a[${n[i]}]=i[${i}];`;return o+="return a;}"},N3=(n,e)=>{let r=[],t=[];for(let o=0;o<n.length;++o)n[o]!==1&&r.push(n[o]),n[e[o]]!==1&&t.push(e[o]);return{newShape:r,newPerm:t}},L3=(n,e)=>{let r=0;for(let t=0;t<n.length;++t)if(e[n[t]]!==1){if(n[t]<r)return!1;r=n[t]}return!0},ut=(n,e)=>{let r=n.dataType,t=n.dims.length,o=D_(t,e),i=D3(n.dims,o),a=n.dims,s=i,u=t<2||L3(o,n.dims),c;if(u)return c=v=>{let T=N("input",r,a,4),x=U("output",r,s,4);return`
  ${v.registerUniform("output_size","u32").declareVariables(T,x)}
  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let v=D.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(v/64/4)},programUniforms:[{type:12,data:Math.ceil(v/4)}]}},getShaderSource:c};let{newShape:d,newPerm:f}=N3(n.dims,o),h=D.areEqual(f,[2,3,1]),b=D.areEqual(f,[3,1,2]);if(d.length===2||h||b){a=h?[d[0],d[1]*d[2]]:b?[d[0]*d[1],d[2]]:d,s=[a[1],a[0]];let v=16;return c=T=>{let x=N("a",r,a.length),w=U("output",r,s.length);return`
  ${T.registerUniform("output_size","u32").declareVariables(x,w)}
  var<workgroup> tile : array<array<${w.type.value}, ${v+1}>, ${v}>;
  ${T.mainStart([v,v,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${v} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${v}u + local_id.x;
    let input_row = workgroup_id_x * ${v}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${x.getByIndices(`${x.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${v}u + local_id.x;
    let output_row = workgroup_id_y * ${v}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${w.setByIndices(`${w.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let T=D.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(s[1]/v),y:Math.ceil(s[0]/v)},programUniforms:[{type:12,data:T},...q(a,s)]}},getShaderSource:c}}return c=v=>{let T=N("a",r,a.length),x=U("output",r,s.length);return`
  ${v.registerUniform("output_size","u32").declareVariables(T,x)}

  ${k3(o,t,T,x)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${x.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${x.setByOffset("global_idx",T.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${e}`,inputDependencies:["rank"]},getRunData:()=>{let v=D.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:[{type:12,data:v},...q(a,s)]}},getShaderSource:c}},k_=(n,e)=>{C3(n.inputs,e.perm),n.compute(ut(n.inputs[0],e.perm))},N_=n=>de({perm:n.perm})});var R3,z3,M3,B3,F3,V3,G3,U3,W3,H3,Vr,L_,R_,z_,M_,B_,F_,V_,G_,U_,W_,H_=k(()=>{"use strict";ce();ge();xe();Da();Jr();R3={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},z3={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},M3={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},B3={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},F3=(n,e)=>{let r=[];for(let t=e-n;t<e;++t)r.push(t);return r},V3=(n,e)=>{let r=[],t=n.length;for(let i=0;i<t;i++)e.indexOf(i)===-1&&r.push(n[i]);let o=e.map(i=>n[i]);return[r,o]},G3=(n,e)=>{let r=n.length+e.length,t=[],o=0;for(let i=0;i<r;i++)e.indexOf(i)===-1?t.push(n[o++]):t.push(1);return t},U3=(n,e)=>{for(let r=0;r<n.length;++r)if(n[n.length-r-1]!==e-1-r)return!1;return!0},W3=(n,e)=>{let r=[];if(!U3(n,e)){for(let t=0;t<e;++t)n.indexOf(t)===-1&&r.push(t);n.forEach(t=>r.push(t))}return r},H3=(n,e,r,t,o,i,a)=>{let s=r[0].dims,u=D.size(i),c=D.size(a),d=N("_A",r[0].dataType,s),f=U("output",o,i),h=64;u===1&&(h=256);let b=`
          var<workgroup> aBestValues : array<f32, ${h}>;
       `,y=v=>`
        ${v.registerUniform("reduceSize","u32").declareVariables(d,f)}
        ${b}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${v.mainStart(h)}

          let outputIndex = global_idx / ${h};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${M3[t]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${h}) {
           let candidate = f32(${d.getByOffset("offset + k")});
           bestValue = ${R3[t]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${h}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${z3[t]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${f.setByOffset("outputIndex",`${t==="mean"?`${f.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${f.type.storage}(${B3[t]})`}`)};
         }
        }`;return{name:n,shaderCache:{hint:`${e};${h}`,inputDependencies:["type"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:u},programUniforms:[{type:12,data:c}]})}},Vr=(n,e,r,t)=>{let o=n.inputs.length===1?r:bc(n.inputs,r),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=n.inputs[0].dims.map((b,y)=>y));let a=D.normalizeAxes(i,n.inputs[0].dims.length),s=a,u=n.inputs[0],c=W3(s,n.inputs[0].dims.length);c.length>0&&(u=n.compute(ut(n.inputs[0],c),{inputs:[0],outputs:[-1]})[0],s=F3(s.length,u.dims.length));let[d,f]=V3(u.dims,s),h=d;o.keepDims&&(h=G3(d,a)),n.compute(H3(e,o.cacheKey,[u],t,n.inputs[0].dataType,h,f),{inputs:[u]})},L_=(n,e)=>{Vr(n,"ReduceMeanShared",e,"mean")},R_=(n,e)=>{Vr(n,"ReduceL1Shared",e,"l1")},z_=(n,e)=>{Vr(n,"ReduceL2Shared",e,"l2")},M_=(n,e)=>{Vr(n,"ReduceLogSumExpShared",e,"logSumExp")},B_=(n,e)=>{Vr(n,"ReduceMaxShared",e,"max")},F_=(n,e)=>{Vr(n,"ReduceMinShared",e,"min")},V_=(n,e)=>{Vr(n,"ReduceProdShared",e,"prod")},G_=(n,e)=>{Vr(n,"ReduceSumShared",e,"sum")},U_=(n,e)=>{Vr(n,"ReduceSumSquareShared",e,"sumSquare")},W_=(n,e)=>{Vr(n,"ReduceLogSumShared",e,"logSum")}});var Gr,q3,ka,bc,Ur,j3,K3,X3,Z3,J3,Y3,Q3,eE,tE,rE,Wr,q_,j_,K_,X_,Z_,J_,Y_,Q_,e0,t0,Da=k(()=>{"use strict";ce();ge();Je();xe();H_();Gr=n=>{if(!n||n.length===0||n.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(n.length===2&&n[1].dims.length!==1)throw new Error("Invalid axes input dims.")},q3=n=>["","",`var value = ${n.getByIndices("input_indices")};`,""],ka=(n,e,r,t,o,i,a=!1,s=!1)=>{let u=[],c=r[0].dims,d=c.length,f=D.normalizeAxes(o,d),h=!s&&f.length===0;c.forEach((T,x)=>{h||f.indexOf(x)>=0?a&&u.push(1):u.push(T)});let b=u.length,y=D.size(u);return{name:n,shaderCache:e,getShaderSource:T=>{let x=[],w=N("_A",r[0].dataType,d),I=U("output",i,b),A=t(w,I,f),P=A[2];for(let C=0,R=0;C<d;C++)h||f.indexOf(C)>=0?(a&&R++,P=`for(var j${C}: u32 = 0; j${C} < ${c[C]}; j${C}++) {
                  ${A[2].includes("last_index")?`let last_index = j${C};`:""}
                  ${w.indicesSet("input_indices",C,`j${C}`)}
                  ${P}
                }`):(x.push(`${w.indicesSet("input_indices",C,I.indicesGet("output_indices",R))};`),R++);return`

        ${T.registerUniform("output_size","u32").declareVariables(w,I)}

        ${T.mainStart()}
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${w.type.indices};
          let output_indices = ${I.offsetToIndices("global_idx")};

          ${x.join(`
`)}
          ${A[0]}       // init ops for reduce max/min
          ${A[1]}
          ${P}
          ${A[3]}
          ${A.length===4?I.setByOffset("global_idx","value"):A.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:i}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...q(c,u)]})}},bc=(n,e)=>{let r=[];return n[1].dims[0]>0&&n[1].getBigInt64Array().forEach(t=>r.push(Number(t))),de({axes:r,keepDims:e.keepDims,noopWithEmptyAxes:e.noopWithEmptyAxes})},Ur=(n,e,r,t)=>{let o=n.inputs,i=o.length===1?r:bc(o,r);n.compute(ka(e,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?q3:t,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},j3=(n,e)=>{Gr(n.inputs),Ur(n,"ReduceLogSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,"value = log(value);"])},K3=(n,e)=>{Gr(n.inputs),Ur(n,"ReduceL1",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${t.getByIndices("input_indices")});`,""])},X3=(n,e)=>{Gr(n.inputs),Ur(n,"ReduceL2",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Z3=(n,e)=>{Gr(n.inputs),Ur(n,"ReduceLogSumExp",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${t.getByIndices("input_indices")});`,"value = log(value);"])},J3=(n,e)=>{Gr(n.inputs),Ur(n,"ReduceMax",e,(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(t.indicesSet("input_indices",s,0));return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = max(value, ${t.getByIndices("input_indices")});`,""]})},Y3=(n,e)=>{Gr(n.inputs),Ur(n,"ReduceMean",e,(t,o,i)=>{let a=1;for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=n.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${a});`]})},Q3=(n,e)=>{Gr(n.inputs),Ur(n,"ReduceMin",e,(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = min(value, ${t.getByIndices("input_indices")});`,""]})},eE=(n,e)=>{Gr(n.inputs),Ur(n,"ReduceProd",e,(t,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${t.getByIndices("input_indices")};`,""])},tE=(n,e)=>{Gr(n.inputs),Ur(n,"ReduceSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,""])},rE=(n,e)=>{Gr(n.inputs),Ur(n,"ReduceSumSquare",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += t * t;`,""])},Wr=(n,e,r)=>{if(e.length===0)return r;let t=1,o=1;for(let i=0;i<e.length;i++)e.indexOf(i)===-1?t*=n[i]:o*=n[i];return o<32&&t>1024},q_=(n,e)=>{Wr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?Y3(n,e):L_(n,e)},j_=(n,e)=>{Wr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?K3(n,e):R_(n,e)},K_=(n,e)=>{Wr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?X3(n,e):z_(n,e)},X_=(n,e)=>{Wr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?Z3(n,e):M_(n,e)},Z_=(n,e)=>{Wr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?J3(n,e):B_(n,e)},J_=(n,e)=>{Wr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?Q3(n,e):F_(n,e)},Y_=(n,e)=>{Wr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?eE(n,e):V_(n,e)},Q_=(n,e)=>{Wr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?tE(n,e):G_(n,e)},e0=(n,e)=>{Wr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?rE(n,e):U_(n,e)},t0=(n,e)=>{Wr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?j3(n,e):W_(n,e)}});var r0,n0,o0,yc,i0=k(()=>{"use strict";ce();Je();Da();r0=n=>{if(!n||n.length===0||n.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(n[0].dataType!==1)throw new Error("Invalid input type.")},n0=(n,e)=>{r0(n.inputs);let r=(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?"<=":"<"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};n.compute(ka("ArgMin",{hint:e.cacheKey,inputDependencies:["rank"]},[n.inputs[0]],r,[e.axis],7,e.keepDims),{inputs:[0]})},o0=(n,e)=>{r0(n.inputs);let r=(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?">=":">"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};n.compute(ka("argMax",{hint:e.cacheKey,inputDependencies:["rank"]},[n.inputs[0]],r,[e.axis],7,e.keepDims),{inputs:[0]})},yc=n=>de(n)});var nE,_c,oE,iE,aE,io,sE,a0,Na=k(()=>{"use strict";ce();ge();Oa();xe();nE=(n,e)=>{let r=n[0],t=n[1],o=n[2],i=n[3],a=n[4],s=n[5];if(a&&s)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=r.dims[0],c=r.dims[1],d=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(t.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(t.dims[0]!==d)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==t.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let f=o.dims[0]/3,h=f,b=h;if(e.qkvHiddenSizes.length>0){if(e.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let I of e.qkvHiddenSizes)if(I%e.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");f=e.qkvHiddenSizes[0],h=e.qkvHiddenSizes[1],b=e.qkvHiddenSizes[2]}let y=c;if(f!==h)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==f+h+b)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let v=0;if(a){if(h!==b)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==e.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==h/e.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');e.pastPresentShareBuffer||(v=a.dims[3])}let T=y+v,x=-1,w=0;if(i)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(s){if(s.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(s.dims[0]!==u||s.dims[1]!==e.numHeads||s.dims[2]!==c||s.dims[3]!==T)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:c,pastSequenceLength:v,kvSequenceLength:y,totalSequenceLength:T,maxSequenceLength:x,inputHiddenSize:d,hiddenSize:f,vHiddenSize:b,headSize:Math.floor(f/e.numHeads),vHeadSize:Math.floor(b/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:w,scale:e.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},_c=(n,e,r)=>e&&n?`
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
    `,oE=(n,e,r,t,o,i,a,s)=>{let u=Ce(a?1:i),c=64,d=i/u;d<c&&(c=32);let f=Math.ceil(i/u/c),h=[{type:12,data:e},{type:12,data:r},{type:12,data:t},{type:12,data:o},{type:12,data:d},{type:12,data:f}],b=Fe(n.dataType,u),y=st(1,u),v=["type"];a&&v.push("type"),s&&v.push("type");let T=x=>{let w=U("x",n.dataType,n.dims,u),I=[w],A=a?N("seq_lens",a.dataType,a.dims):void 0;A&&I.push(A);let P=s?N("total_sequence_length_input",s.dataType,s.dims):void 0;P&&I.push(P);let C=st(n.dataType),R=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${c}>;
  var<workgroup> thread_sum: array<f32, ${c}>;
  ${x.registerUniforms(R).declareVariables(...I)}
  ${x.mainStart([c,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${_c(A,P,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${c}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${a?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${y}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${y}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${c}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${y}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${y}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${u}`)}})()};
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
        var f32input = ${y}(x[offset + i]);
        x[offset + i] = ${w.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${w.type.value}(${C}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${c};${b};${u}`,inputDependencies:v},getShaderSource:T,getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(i/c),y:o,z:e*r},programUniforms:h})}},iE=(n,e,r,t,o,i,a,s,u)=>{let c=a+i.kvSequenceLength,d=[i.batchSize,i.numHeads,i.sequenceLength,c],f=n>1&&t,h=i.kvNumHeads?i.kvNumHeads:i.numHeads,b=f?[i.batchSize,h,c,i.headSize]:void 0,y=i.nReps?i.nReps:1,v=i.scale===0?1/Math.sqrt(i.headSize):i.scale,T=Ce(i.headSize),x=i.headSize/T,w=12,I={x:Math.ceil(c/w),y:Math.ceil(i.sequenceLength/w),z:i.batchSize*i.numHeads},A=[{type:12,data:i.sequenceLength},{type:12,data:x},{type:12,data:c},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:v},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:y}],P=f&&t&&D.size(t.dims)>0,C=["type","type"];P&&C.push("type"),o&&C.push("type"),s&&C.push("type"),u&&C.push("type");let R=[{dims:d,dataType:e.dataType,gpuDataType:0}];f&&R.push({dims:b,dataType:e.dataType,gpuDataType:0});let z=V=>{let X=N("q",e.dataType,e.dims,T),Q=N("key",r.dataType,r.dims,T),pe=[X,Q];if(P){let ee=N("past_key",t.dataType,t.dims,T);pe.push(ee)}o&&pe.push(N("attention_bias",o.dataType,o.dims));let W=s?N("seq_lens",s.dataType,s.dims):void 0;W&&pe.push(W);let ue=u?N("total_sequence_length_input",u.dataType,u.dims):void 0;ue&&pe.push(ue);let Ve=U("output",e.dataType,d),te=[Ve];f&&te.push(U("present_key",e.dataType,b,T));let le=st(1,T),ve=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;

  var<workgroup> tileQ: array<${X.type.storage}, ${w*w}>;
  var<workgroup> tileK: array<${X.type.storage}, ${w*w}>;
  ${V.registerUniforms(ve).declareVariables(...pe,...te)}
  ${V.mainStart([w,w,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${y===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${y===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${_c(W,ue,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${P&&f?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${f?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${le}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${P&&f?`
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
          value += ${le}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(T){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${T}`)}})()};
        output[outputIdx] = ${Ve.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${T};${o!==void 0};${t!==void 0};${n}`,inputDependencies:C},getRunData:()=>({outputs:R,dispatchGroup:I,programUniforms:A}),getShaderSource:z}},aE=(n,e,r,t,o,i,a=void 0,s=void 0)=>{let u=i+o.kvSequenceLength,c=o.nReps?o.nReps:1,d=o.vHiddenSize*c,f=n>1&&t,h=o.kvNumHeads?o.kvNumHeads:o.numHeads,b=f?[o.batchSize,h,u,o.headSize]:void 0,y=[o.batchSize,o.sequenceLength,d],v=12,T={x:Math.ceil(o.vHeadSize/v),y:Math.ceil(o.sequenceLength/v),z:o.batchSize*o.numHeads},x=[{type:12,data:o.sequenceLength},{type:12,data:u},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:d},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:c}],w=f&&t&&D.size(t.dims)>0,I=["type","type"];w&&I.push("type"),a&&I.push("type"),s&&I.push("type");let A=[{dims:y,dataType:e.dataType,gpuDataType:0}];f&&A.push({dims:b,dataType:e.dataType,gpuDataType:0});let P=C=>{let R=N("probs",e.dataType,e.dims),z=N("v",r.dataType,r.dims),V=[R,z];w&&V.push(N("past_value",t.dataType,t.dims));let X=a?N("seq_lens",a.dataType,a.dims):void 0;a&&V.push(X);let Q=s?N("total_sequence_length_input",s.dataType,s.dims):void 0;s&&V.push(Q);let W=[U("output",e.dataType,y)];f&&W.push(U("present_value",e.dataType,b));let ue=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;
  var<workgroup> tileQ: array<${R.type.value}, ${v*v}>;
  var<workgroup> tileV: array<${R.type.value}, ${v*v}>;
  ${C.registerUniforms(ue).declareVariables(...V,...W)}
  ${C.mainStart([v,v,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${c===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${c===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${_c(X,Q,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${w&&f?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${f?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${R.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${w&&f?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${t!==void 0};${n}`,inputDependencies:I},getRunData:()=>({outputs:A,dispatchGroup:T,programUniforms:x}),getShaderSource:P}},io=(n,e,r,t,o,i,a,s,u,c,d=void 0,f=void 0)=>{let h=Math.min(n.outputCount,1+(a?1:0)+(s?1:0)),b=h>1?c.pastSequenceLength:0,y=b+c.kvSequenceLength,v=u&&D.size(u.dims)>0?u:void 0,T=[e,r];h>1&&a&&D.size(a.dims)>0&&T.push(a),v&&T.push(v),d&&T.push(d),f&&T.push(f);let x=n.compute(iE(h,e,r,a,v,c,b,d,f),{inputs:T,outputs:h>1?[-1,1]:[-1]})[0];n.compute(oE(x,c.batchSize,c.numHeads,b,c.sequenceLength,y,d,f),{inputs:d&&f?[x,d,f]:[x],outputs:[]});let w=[x,t];h>1&&s&&D.size(s.dims)>0&&w.push(s),d&&w.push(d),f&&w.push(f),n.compute(aE(h,x,t,s,c,b,d,f),{inputs:w,outputs:h>1?[0,2]:[0]})},sE=(n,e)=>{let r=[e.batchSize,e.numHeads,e.sequenceLength,e.headSize],t=e.sequenceLength,o=e.inputHiddenSize,i=e.headSize,a=12,s={x:Math.ceil(e.headSize/a),y:Math.ceil(e.sequenceLength/a),z:e.batchSize*e.numHeads},u=[n.inputs[0],n.inputs[1],n.inputs[2]],c=[{type:12,data:t},{type:12,data:o},{type:12,data:i},{type:12,data:e.numHeads},{type:12,data:e.headSize},{type:12,data:e.hiddenSize},{type:12,data:e.hiddenSize+e.hiddenSize+e.vHiddenSize}],d=f=>{let h=U("output_q",u[0].dataType,r),b=U("output_k",u[0].dataType,r),y=U("output_v",u[0].dataType,r),v=N("input",u[0].dataType,u[0].dims),T=N("weight",u[1].dataType,u[1].dims),x=N("bias",u[2].dataType,u[2].dims),w=v.type.storage,I=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${w}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${w}, ${a*a}>;
  var<workgroup> tileWeightK: array<${w}, ${a*a}>;
  var<workgroup> tileWeightV: array<${w}, ${a*a}>;
  ${f.registerUniforms(I).declareVariables(v,T,x,h,b,y)}
  ${f.mainStart([a,a,1])}
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
  }`};return n.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0}],dispatchGroup:s,programUniforms:c}),getShaderSource:d},{inputs:u,outputs:[-1,-1,-1]})},a0=(n,e)=>{let r=nE(n.inputs,e),[t,o,i]=sE(n,r);return io(n,t,o,i,n.inputs[4],void 0,void 0,void 0,n.inputs[5],r)}});var uE,lE,cE,s0,u0=k(()=>{"use strict";ft();ce();ge();Je();xe();uE=(n,e)=>{if(!n||n.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(t,o,i)=>{let a=o.length;if(a!==t.length)throw new Error(`${i}: num dimensions != ${a}`);o.forEach((s,u)=>{if(s!==t[u])throw new Error(`${i}: dim[${u}] do not match`)})};if(n[0].dims.length>1){let t=e.format==="NHWC"?e.spatial?n[0].dims.slice(-1):n[0].dims.slice(-1).concat(n[0].dims.slice(1,n[0].dims.length-1)):n[0].dims.slice(1,e.spatial?2:void 0);r(n[1].dims,t,"Invalid input scale"),r(n[2].dims,t,"Invalid input B"),r(n[3].dims,t,"Invalid input mean"),r(n[4].dims,t,"Invalid input var")}else r(n[1].dims,[1],"Invalid input scale"),r(n[2].dims,[1],"Invalid input B"),r(n[3].dims,[1],"Invalid input mean"),r(n[4].dims,[1],"Invalid input var")},lE=(n,e)=>{let{epsilon:r,spatial:t,format:o}=e,i=n[0].dims,a=t?Ce(i[i.length-1]):1,s=o==="NHWC"&&i.length>1?a:1,u=D.size(i)/a,c=t,d=c?i.length:i,f=N("x",n[0].dataType,n[0].dims,a),h=N("scale",n[1].dataType,n[1].dims,s),b=N("bias",n[2].dataType,n[2].dims,s),y=N("inputMean",n[3].dataType,n[3].dims,s),v=N("inputVar",n[4].dataType,n[4].dims,s),T=U("y",n[0].dataType,d,a),x=()=>{let I="";if(t)I=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${a}`:"outputIndices[1]"};`;else if(o==="NCHW")I=`
            ${T.indicesSet("outputIndices","0","0")}
            let cOffset = ${T.indicesToOffset("outputIndices")};`;else{I=`var cIndices = ${h.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let A=1;A<h.rank;A++)I+=`cIndices[${A}] = outputIndices[${A}];`;I+=`let cOffset = ${h.indicesToOffset("cIndices")};`}return I},w=I=>`
  const epsilon = ${r};
  ${I.registerUniform("outputSize","u32").declareVariables(f,h,b,y,v,T)}
  ${I.mainStart()}
  ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${T.offsetToIndices(`global_idx * ${a}`)};
    ${x()}
    let scale = ${h.getByOffset("cOffset")};
    let bias = ${b.getByOffset("cOffset")};
    let inputMean = ${y.getByOffset("cOffset")};
    let inputVar = ${v.getByOffset("cOffset")};
    let x = ${f.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${T.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${e.epsilon}_${e.format}_${t}_${a}`,inputDependencies:c?["rank","type","type","type","type"]:void 0},getShaderSource:w,getRunData:()=>({outputs:[{dims:n[0].dims,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c?[{type:12,data:u},...q(i)]:[{type:12,data:u}]})}},cE=n=>de(n),s0=(n,e)=>{let{inputs:r,outputCount:t}=n,o=cE({...e,outputCount:t});if(me.webgpu.validateInputContent&&uE(r,o),e.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");n.compute(lE(r,o))}});var dE,pE,l0,c0=k(()=>{"use strict";ge();xe();dE=n=>{if(n[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(n[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(n[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(n[0].dims[2]!==n[1].dims[0])throw new Error("last dimension of input and bias are not the same")},pE=n=>{let e=n[0].dims,r=n[0].dims[2],t=D.size(e)/4,o=n[0].dataType,i=N("input",o,e,4),a=N("bias",o,[r],4),s=N("residual",o,e,4),u=U("output",o,e,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:e,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)}}),getShaderSource:d=>`
  const channels = ${r}u / 4;
  ${d.declareVariables(i,a,s,u)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(t)}
    let value = ${i.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${s.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},l0=n=>{dE(n.inputs),n.compute(pE(n.inputs))}});var fE,Ne,d0,p0,f0,h0,m0,g0,b0,y0,_0,hE,v0,x0,w0,T0,Go,I0,La,S0,$0,A0,O0,P0,E0,C0,D0,k0,N0,L0,R0,z0,M0,B0,F0,V0,G0,vc,xc,U0,W0,H0,mE,gE,q0,Ra=k(()=>{"use strict";ce();ge();Je();xe();fE=(n,e,r,t,o,i,a)=>{let s=Math.ceil(e/4),u="";typeof o=="string"?u=`${o}(a)`:u=o("a");let c=N("inputData",r,[s],4),d=U("outputData",t,[s],4),f=[{name:"vec_size",type:"u32"}];return a&&f.push(...a),`
      ${n.registerUniforms(f).declareVariables(c,d)}

  ${i??""}

  ${n.mainStart()}
    ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${c.getByOffset("global_idx")};
    ${d.setByOffset("global_idx",u)}
  }`},Ne=(n,e,r,t,o,i=n.dataType,a,s)=>{let u=[{type:12,data:Math.ceil(D.size(n.dims)/4)}];return a&&u.push(...a),{name:e,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:c=>fE(c,D.size(n.dims),n.dataType,i,r,t,s),getRunData:c=>({outputs:[{dims:n.dims,dataType:i}],dispatchGroup:{x:Math.ceil(D.size(c[0].dims)/64/4)},programUniforms:u})}},d0=n=>{n.compute(Ne(n.inputs[0],"Abs","abs"))},p0=n=>{n.compute(Ne(n.inputs[0],"Acos","acos"))},f0=n=>{n.compute(Ne(n.inputs[0],"Acosh","acosh"))},h0=n=>{n.compute(Ne(n.inputs[0],"Asin","asin"))},m0=n=>{n.compute(Ne(n.inputs[0],"Asinh","asinh"))},g0=n=>{n.compute(Ne(n.inputs[0],"Atan","atan"))},b0=n=>{n.compute(Ne(n.inputs[0],"Atanh","atanh"))},y0=n=>de(n),_0=(n,e)=>{let r;switch(e.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${e.to}`)}n.compute(Ne(n.inputs[0],"Cast",r,void 0,e.cacheKey,e.to))},hE=n=>{let e,r,t=n.length>=2&&n[1].data!==0,o=n.length>=3&&n[2].data!==0;switch(n[0].dataType){case 1:e=t?n[1].getFloat32Array()[0]:-34028234663852886e22,r=o?n[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:e=t?n[1].getUint16Array()[0]:64511,r=o?n[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return de({min:e,max:r})},v0=(n,e)=>{let r=e||hE(n.inputs),t=st(n.inputs[0].dataType);n.compute(Ne(n.inputs[0],"Clip",o=>`clamp(${o}, vec4<${t}>(uniforms.min), vec4<${t}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:n.inputs[0].dataType,data:r.min},{type:n.inputs[0].dataType,data:r.max}],[{name:"min",type:t},{name:"max",type:t}]),{inputs:[0]})},x0=n=>{n.compute(Ne(n.inputs[0],"Ceil","ceil"))},w0=n=>{n.compute(Ne(n.inputs[0],"Cos","cos"))},T0=n=>{n.compute(Ne(n.inputs[0],"Cosh","cosh"))},Go=n=>de(n),I0=(n,e)=>{let r=st(n.inputs[0].dataType);n.compute(Ne(n.inputs[0],"Elu",t=>`elu_vf32(${t})`,`
  const elu_alpha_ = ${r}(${e.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,e.cacheKey))},La=(n="f32")=>`
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
}`,S0=n=>{let e=st(n.inputs[0].dataType);n.compute(Ne(n.inputs[0],"Erf",r=>`erf_vf32(${r})`,La(e)))},$0=n=>{n.compute(Ne(n.inputs[0],"Exp","exp"))},A0=n=>{n.compute(Ne(n.inputs[0],"Floor","floor"))},O0=n=>{let e=st(n.inputs[0].dataType);n.compute(Ne(n.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,La(e)))},P0=(n,e)=>{let r=st(n.inputs[0].dataType);n.compute(Ne(n.inputs[0],"LeakyRelu",t=>`select(leaky_relu_alpha_ * ${t}, ${t}, ${t} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${e.alpha});`,e.cacheKey))},E0=n=>{n.compute(Ne(n.inputs[0],"Not",e=>`!${e}`))},C0=n=>{n.compute(Ne(n.inputs[0],"Neg",e=>`-${e}`))},D0=n=>{n.compute(Ne(n.inputs[0],"Reciprocal",e=>`1.0/${e}`))},k0=n=>{let e=st(n.inputs[0].dataType);n.compute(Ne(n.inputs[0],"Relu",r=>`select(vec4<${e}>(0.0), ${r}, ${r} > vec4<${e}>(0.0))`))},N0=n=>{n.compute(Ne(n.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},L0=n=>de(n),R0=(n,e)=>{let r=st(n.inputs[0].dataType);n.compute(Ne(n.inputs[0],"HardSigmoid",t=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${e.alpha} * ${t} + vec4<${r}>(${e.beta})))`,void 0,e.cacheKey))},z0=n=>{n.compute(Ne(n.inputs[0],"Sin","sin"))},M0=n=>{n.compute(Ne(n.inputs[0],"Sinh","sinh"))},B0=n=>{n.compute(Ne(n.inputs[0],"Sqrt","sqrt"))},F0=n=>{n.compute(Ne(n.inputs[0],"Tan","tan"))},V0=n=>`sign(${n}) * (1 - exp(-2 * abs(${n}))) / (1 + exp(-2 * abs(${n})))`,G0=n=>{n.compute(Ne(n.inputs[0],"Tanh",V0))},vc=(n="f32")=>`
const fast_gelu_a: ${n} = 0.5;
const fast_gelu_b: ${n} = 0.7978845608028654;
const fast_gelu_c: ${n} = 0.035677408136300125;

fn tanh_v(v: vec4<${n}>) -> vec4<${n}> {
  return ${V0("v")};
}
`,xc=n=>`(fast_gelu_a + fast_gelu_a * tanh_v(${n} * (fast_gelu_c * ${n} * ${n} + fast_gelu_b))) * ${n}`,U0=n=>{let e=st(n.inputs[0].dataType);n.compute(Ne(n.inputs[0],"FastGelu",xc,vc(e),void 0,n.inputs[0].dataType))},W0=(n,e)=>{let r=st(n.inputs[0].dataType);return n.compute(Ne(n.inputs[0],"ThresholdedRelu",t=>`select(vec4<${r}>(0.0), ${t}, ${t} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${e.alpha});`,e.cacheKey)),0},H0=n=>{n.compute(Ne(n.inputs[0],"Log","log"))},mE=(n,e)=>`
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
`,gE=n=>`quick_gelu_impl(${n})`,q0=(n,e)=>{let r=st(n.inputs[0].dataType);n.compute(Ne(n.inputs[0],"QuickGelu",gE,mE(r,e.alpha),e.cacheKey,n.inputs[0].dataType))}});var bE,yE,K0,X0=k(()=>{"use strict";ge();xe();Ra();bE=n=>{if(n[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(n[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(n[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(n[0].dims[2]!==n[1].dims[0])throw new Error("last dimension of input and bias are not the same")},yE=n=>{let e=n[0].dims.slice();e[2]=e[2]/2;let r=N("input",n[0].dataType,n[0].dims,4),t=N("bias",n[0].dataType,[n[0].dims[2]],4),o=U("output",n[0].dataType,e,4),i=D.size(e)/4,a=Fe(n[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:e,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${n[0].dims[2]/4/2}u;

  ${u.declareVariables(r,t,o)}

  ${La(a)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},K0=n=>{bE(n.inputs),n.compute(yE(n.inputs))}});var _E,vE,Hr,Z0,J0,Y0,Q0,ev,tv,rv,nv,ov,iv,av=k(()=>{"use strict";ce();ge();xe();_E=(n,e,r,t,o,i,a,s,u,c,d,f)=>{let h,b;typeof s=="string"?h=b=(w,I)=>`${s}((${w}),(${I}))`:typeof s=="function"?h=b=s:(h=s.scalar,b=s.vector);let y=U("outputData",d,t.length,4),v=N("aData",u,e.length,4),T=N("bData",c,r.length,4),x;if(o)if(i){let w=D.size(e)===1,I=D.size(r)===1,A=e.length>0&&e[e.length-1]%4===0,P=r.length>0&&r[r.length-1]%4===0;w||I?x=y.setByOffset("global_idx",b(w?`${v.type.value}(${v.getByOffset("0")}.x)`:v.getByOffset("global_idx"),I?`${T.type.value}(${T.getByOffset("0")}.x)`:T.getByOffset("global_idx"))):x=`
            let outputIndices = ${y.offsetToIndices("global_idx * 4u")};
            let offsetA = ${v.broadcastedIndicesToOffset("outputIndices",y)};
            let offsetB = ${T.broadcastedIndicesToOffset("outputIndices",y)};
            ${y.setByOffset("global_idx",b(a||A?v.getByOffset("offsetA / 4u"):`${v.type.value}(${v.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||P?T.getByOffset("offsetB / 4u"):`${T.type.value}(${T.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else x=y.setByOffset("global_idx",b(v.getByOffset("global_idx"),T.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let w=(I,A,P="")=>{let C=`aData[indexA${A}][componentA${A}]`,R=`bData[indexB${A}][componentB${A}]`;return`
            let outputIndices${A} = ${y.offsetToIndices(`global_idx * 4u + ${A}u`)};
            let offsetA${A} = ${v.broadcastedIndicesToOffset(`outputIndices${A}`,y)};
            let offsetB${A} = ${T.broadcastedIndicesToOffset(`outputIndices${A}`,y)};
            let indexA${A} = offsetA${A} / 4u;
            let indexB${A} = offsetB${A} / 4u;
            let componentA${A} = offsetA${A} % 4u;
            let componentB${A} = offsetB${A} % 4u;
            ${I}[${A}] = ${P}(${h(C,R)});
          `};d===9?x=`
            var data = vec4<u32>(0);
            ${w("data",0,"u32")}
            ${w("data",1,"u32")}
            ${w("data",2,"u32")}
            ${w("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:x=`
            ${w("outputData[global_idx]",0)}
            ${w("outputData[global_idx]",1)}
            ${w("outputData[global_idx]",2)}
            ${w("outputData[global_idx]",3)}
          `}return`
        ${n.registerUniform("vec_size","u32").declareVariables(v,T,y)}

        ${f??""}

        ${n.mainStart()}
        ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${x}
      }`},vE=(n,e,r,t,o,i,a=r.dataType)=>{let s=r.dims.map(v=>Number(v)??1),u=t.dims.map(v=>Number(v)??1),c=!D.areEqual(s,u),d=s,f=D.size(s),h=!1,b=!1,y=[c];if(c){let v=Fr.calcShape(s,u,!1);if(!v)throw new Error("Can't perform binary op on the given tensors");d=v.slice(),f=D.size(d);let T=D.size(s)===1,x=D.size(u)===1,w=s.length>0&&s[s.length-1]%4===0,I=u.length>0&&u[u.length-1]%4===0;y.push(T),y.push(x),y.push(w),y.push(I);let A=1;for(let P=1;P<d.length;P++){let C=s[s.length-P],R=u[u.length-P];if(C===R)A*=C;else break}A%4===0?(b=!0,h=!0):(T||x||w||I)&&(h=!0)}else h=!0;return y.push(h),{name:n,shaderCache:{hint:e+y.map(v=>v.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:v=>_E(v,s,u,d,h,c,b,o,r.dataType,t.dataType,a,i),getRunData:()=>({outputs:[{dims:d,dataType:a}],dispatchGroup:{x:Math.ceil(f/64/4)},programUniforms:[{type:12,data:Math.ceil(D.size(d)/4)},...q(s,u,d)]})}},Hr=(n,e,r,t,o,i)=>{n.compute(vE(e,o??"",n.inputs[0],n.inputs[1],r,t,i))},Z0=n=>{Hr(n,"Add",(e,r)=>`${e}+${r}`)},J0=n=>{Hr(n,"Div",(e,r)=>`${e}/${r}`)},Y0=n=>{Hr(n,"Equal",{scalar:(e,r)=>`u32(${e}==${r})`,vector:(e,r)=>`vec4<u32>(${e}==${r})`},void 0,void 0,9)},Q0=n=>{Hr(n,"Mul",(e,r)=>`${e}*${r}`)},ev=n=>{let e=N("input",n.inputs[0].dataType,n.inputs[0].dims).type.value;Hr(n,"Pow",{scalar:(t,o)=>`pow_custom(${t},${o})`,vector:(t,o)=>`pow_vector_custom(${t},${o})`},`
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
      `)},tv=n=>{Hr(n,"Sub",(e,r)=>`${e}-${r}`)},rv=n=>{Hr(n,"Greater",{scalar:(e,r)=>`u32(${e}>${r})`,vector:(e,r)=>`vec4<u32>(${e}>${r})`},void 0,void 0,9)},nv=n=>{Hr(n,"Less",{scalar:(e,r)=>`u32(${e}<${r})`,vector:(e,r)=>`vec4<u32>(${e}<${r})`},void 0,void 0,9)},ov=n=>{Hr(n,"GreaterOrEqual",{scalar:(e,r)=>`u32(${e}>=${r})`,vector:(e,r)=>`vec4<u32>(${e}>=${r})`},void 0,void 0,9)},iv=n=>{Hr(n,"LessOrEqual",{scalar:(e,r)=>`u32(${e}<=${r})`,vector:(e,r)=>`vec4<u32>(${e}<=${r})`},void 0,void 0,9)}});var wE,TE,IE,SE,sv,uv,lv=k(()=>{"use strict";ce();ge();Je();xe();wE=(n,e)=>{if(!n||n.length<1)throw new Error("too few inputs");let r=0,t=n[r],o=t.dataType,i=t.dims.length;n.forEach((a,s)=>{if(s!==r){if(a.dataType!==o)throw new Error("input tensors should be one type");if(a.dims.length!==i)throw new Error("input tensors should have the same shape");a.dims.forEach((u,c)=>{if(c!==e&&u!==t.dims[c])throw new Error("non concat dimensions must match")})}})},TE=(n,e)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${n}u>(${e});
    for (var i: u32 = 0u; i < ${n}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${n}u;
  }`,IE=(n,e)=>{let r=n.length,t=[];for(let o=0;o<r;++o){let i=e.setByOffset("global_idx",n[o].getByIndices("indices"));r===1?t.push(i):o===0?t.push(`if (inputIndex == ${o}u) { ${i} }`):o===r-1?t.push(`else { ${i} }`):t.push(`else if (inputIndex == ${o}) { ${i} }`)}return t.join(`
`)},SE=(n,e,r,t)=>{let o=D.size(r),i=new Array(n.length),a=new Array(n.length),s=0,u=[],c=[],d=[{type:12,data:o}];for(let v=0;v<n.length;++v)s+=n[v].dims[e],i[v]=s,c.push(n[v].dims.length),a[v]=N(`input${v}`,t,c[v]),u.push("rank"),d.push({type:12,data:i[v]});for(let v=0;v<n.length;++v)d.push(...q(n[v].dims));d.push(...q(r));let f=U("output",t,r.length),h=f.indicesGet("indices",e),b=Array.from(Array(i.length).keys()).map(v=>`uniforms.sizeInConcatAxis${v}`).join(","),y=v=>`

  ${(()=>{v.registerUniform("outputSize","u32");for(let T=0;T<n.length;T++)v.registerUniform(`sizeInConcatAxis${T}`,"u32");return v.declareVariables(...a,f)})()}

  ${TE(i.length,b)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${f.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${b});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${IE(a,f)}
  }`;return{name:"Concat",shaderCache:{hint:`${e}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:d}),getShaderSource:y}},sv=(n,e)=>{let r=n.inputs,t=r[0].dims,o=D.normalizeAxis(e.axis,t.length);wE(r,o);let i=t.slice();i[o]=r.reduce((s,u)=>s+(u.dims.length>o?u.dims[o]:0),0);let a=r.filter(s=>D.size(s.dims)>0);n.compute(SE(a,o,i,r[0].dataType),{inputs:a})},uv=n=>de({axis:n.axis})});var Xt,Zt,Jt,za,bn=k(()=>{"use strict";ce();ge();Xt=(n,e,r="f32")=>{switch(n.activation){case"Relu":return`value = max(value, ${e}(0.0));`;case"Sigmoid":return`value = (${e}(1.0) / (${e}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${e}(${r}(uniforms.clip_min)), ${e}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${e}(0.0), min(${e}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${e}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${n.activation}`)}},Zt=(n,e)=>{n.activation==="Clip"?e.push({type:1,data:n.clipMax},{type:1,data:n.clipMin}):n.activation==="HardSigmoid"?e.push({type:1,data:n.alpha},{type:1,data:n.beta}):n.activation==="LeakyRelu"&&e.push({type:1,data:n.alpha})},Jt=(n,e)=>{n.activation==="Clip"?e.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):n.activation==="HardSigmoid"?e.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):n.activation==="LeakyRelu"&&e.push({name:"alpha",type:"f32"})},za=n=>{let e=n?.activation||"";if(e==="HardSigmoid"){let[r,t]=n?.activation_params||[.2,.5];return{activation:e,alpha:r,beta:t}}else if(e==="Clip"){let[r,t]=n?.activation_params||[O_,P_];return{activation:e,clipMax:t,clipMin:r}}else if(e==="LeakyRelu"){let[r]=n?.activation_params||[.01];return{activation:e,alpha:r}}return{activation:e}}});var it,cv,Ma=k(()=>{"use strict";it=(n,e)=>{switch(n){case 1:return e;case 2:return`vec2<${e}>`;case 3:return`vec3<${e}>`;case 4:return`vec4<${e}>`;default:throw new Error(`${n}-component is not supported.`)}},cv=n=>`
      ${n?"value = value + getBiasByOutputCoords(coords);":""}
      `});var dv,pv=k(()=>{"use strict";dv=n=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${n}.x), i32(${n}.y), i32(${n}.z), 1));
}
`});var Uo,Ba,Fa=k(()=>{"use strict";ce();ge();xe();bn();Uo=(n,e,r,t,o)=>{let i=t-r;return`
      ${Array.from({length:r}).map((a,s)=>`
      if (${Y(e.shape,s,e.rank)} != 1) {
        ${e.indicesSet(n,s,Y(o,s+i,t))}
      } else {
        ${e.indicesSet(n,s,0)}
      }`).join("")}
`},Ba=(n,e,r,t,o=!1,i)=>{let a=n[0].dims,s=n[1].dims,u=a[a.length-2],c=s[s.length-1],d=a[a.length-1],f=Ce(c),h=Ce(d),b=Ce(u),y=D.size(r)/f/b,v=n.length>2,T=t?t.slice(0,-2):r.slice(0,-2),w=[D.size(T),u,c],I=[{type:12,data:y},{type:12,data:u},{type:12,data:c},{type:12,data:d}];Zt(e,I),I.push(...q(T,a,s)),v&&I.push(...q(n[2].dims)),I.push(...q(w));let A=P=>{let C=Ca("batch_dims",n[0].dataType,T.length),R=N("a",n[0].dataType,a.length,h),z=N("b",n[1].dataType,s.length,f),V=U("output",n[0].dataType,w.length,f),X=Fe(V.type.tensor),Q=Xt(e,V.type.value,X),pe=[R,z],W="";if(v){let te=o?f:1;pe.push(N("bias",n[2].dataType,n[2].dims.length,te)),W=`${o?`value += bias[col / ${te}];`:`value += ${V.type.value}(bias[row + i]);`}`}let ue=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Jt(e,ue);let Ve=()=>{let te=`var a_data: ${R.type.value};`;for(let le=0;le<h;le++)te+=`
              let b_data${le} = b[(b_offset + (k + ${le}) * uniforms.N + col) / ${f}];`;for(let le=0;le<b;le++){te+=`a_data = a[(a_offset + (row + ${le}) * uniforms.K + k) / ${h}];`;for(let ve=0;ve<h;ve++)te+=`
            values[${le}] = fma(${z.type.value}(a_data${h===1?"":`[${ve}]`}), b_data${ve}, values[${le}]);
`}return te};return`
  ${P.registerUniforms(ue).registerInternalVariables(C).declareVariables(...pe,V)}
  ${P.mainStart()}
    ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${f})) * ${f};
    var index1 = global_idx / (uniforms.N / ${f});
    let stride1 = uniforms.M / ${b};
    let row = (index1 % stride1) * ${b};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${C.offsetToIndices("batch")};`}

    var a_indices: ${R.type.indices};
    ${Uo("a_indices",R,R.rank-2,C.rank,"batch_indices")}
    ${R.indicesSet("a_indices",R.rank-2,0)}
    ${R.indicesSet("a_indices",R.rank-1,0)}
    let a_offset = ${R.indicesToOffset("a_indices")};

    var b_indices: ${z.type.indices};
    ${Uo("b_indices",z,z.rank-2,C.rank,"batch_indices")}
    ${z.indicesSet("b_indices",z.rank-2,0)}
    ${z.indicesSet("b_indices",z.rank-1,0)}
    let b_offset = ${z.indicesToOffset("b_indices")};
    var values: array<${V.type.value}, ${b}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${Ve()}
    }
    for (var i = 0u; i < ${b}u; i++) {
      var value = values[i];
      ${W}
      ${Q}
      let cur_indices = ${V.type.indices}(batch, row + i, col);
      let offset = ${V.indicesToOffset("cur_indices")};
      ${V.setByOffset(`offset / ${f}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${e.activation};${f};${h};${b};${o}`,inputDependencies:v?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:I}),getShaderSource:A}}});var $E,AE,wc,fv,OE,Tc,PE,Wo,Va=k(()=>{"use strict";ce();ge();xe();bn();Fa();Ma();$E=(n,e)=>n?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${e?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${e?", batchIndices":""});
        `,AE=(n,e)=>n?`
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
        }`,wc=(n,e,r="f32",t,o=!1,i=32,a=!1,s=32)=>{let u=e[1]*n[1],c=e[0]*n[0],d=o?u:i,f=o?i:u,h=d/e[0],b=i/e[1];if(!((o&&h===4&&n[1]===4||!o&&(h===3||h===4))&&d%e[0]===0&&i%e[1]===0&&n[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${h} and workPerThread[1] ${n[1]} must be 4.
      Otherwise, innerElementSize ${h} must be 3 or 4.
  tileAWidth ${d} must be divisible by workgroupSize[0]${e[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${e[1]}. colPerThread ${n[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${h}<${r}>, ${d/h}>, ${f}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${c/n[0]}>, ${i}>;

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
  let tileRowB = localRow * ${b};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${$E(o,t)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
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

          ${AE(o,h)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},fv=(n,e)=>n?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${e?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${e?", batchIndices":""});
            `,OE=n=>n?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Tc=(n,e,r="f32",t,o=!1,i=32,a=!1,s=32,u=!1)=>{let c=n[1]*e[1],d=n[0]*e[0],f=o?c:i,h=o?i:c;if(!(h%e[1]===0&&f%e[0]===0&&i%e[1]===0))throw new Error(`tileAHight ${h} must be divisible by workgroupSize[1]${e[1]}, tileAWidth ${f} must be divisible by workgroupSize[0]${e[0]}, tileInner ${i} must be divisible by workgroupSize[1]${e[1]}`);let b=h/e[1],y=f/e[0],v=i/e[1],T=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${c};
    let globalColStart = i32(workgroupId.x) * ${d};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${e[1]}) {
        for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${e[0]}) {
          ${fv(o,t)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${e[1]}) {
            for (var inputCol = localCol; inputCol < ${d}; inputCol = inputCol + ${e[0]}) {
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
let globalRowStart = i32(workgroupId.y) * ${c};

let tileRowA = i32(localId.y) * ${b};
let tileColA = i32(localId.x) * ${y};
let tileRowB = i32(localId.y) * ${v};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${y}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${fv(o,t)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${v}; innerRow = innerRow + 1) {
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
      ${OE(o)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${f}>, ${h}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${d}>, ${i}>;
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
`},PE=(n,e,r,t,o=!1)=>{let[i,a,s,u]=t,c=Fe(t[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${it(n,c)} {
      var value = ${it(n,c)}(0.0);
      let col = colIn * ${n};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${Uo("aIndices",a,a.rank-2,i.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${it(n,c)} {
      var value = ${it(n,c)}(0.0);
      let col = colIn * ${n};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${s.type.indices};
        ${Uo("bIndices",s,s.rank-2,i.rank,"batchIndices")}
        ${s.indicesSet("bIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("bIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${it(n,c)}) {
      let col = colIn * ${n};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${e?`value = value + ${o?"bias[colIn]":`${it(n,c)}(bias[row])`};`:""}
        ${r}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Wo=(n,e,r,t,o=!1,i)=>{let a=n[0].dims,s=n[1].dims,u=a.slice(0,-2),c=s.slice(0,-2),d=t?t.slice(0,-2):r.slice(0,-2),f=D.size(d),h=a[a.length-2],b=a[a.length-1],y=s[s.length-1],v=b%4===0&&y%4===0,T=h<=8?[4,1,1]:[4,4,1],x=[8,8,1],w=[Math.ceil(y/x[0]/T[0]),Math.ceil(h/x[1]/T[1]),Math.ceil(f/x[2]/T[2])],I=v?4:1,A=[...u,h,b/I],P=A.length,C=[...c,b,y/I],R=C.length,z=[f,h,y/I],V=[{type:6,data:h},{type:6,data:y},{type:6,data:b}];Zt(e,V),V.push(...q(d,A,C));let X=["rank","rank"],Q=n.length>2;Q&&(V.push(...q(n[2].dims)),X.push("rank")),V.push(...q(z));let pe=W=>{let ue=d.length,Ve=Ca("batchDims",n[0].dataType,ue,1),te=Fe(n[0].dataType),le=N("a",n[0].dataType,P,I),ve=N("b",n[1].dataType,R,I),ee=U("result",n[0].dataType,z.length,I),we=[le,ve];if(Q){let re=o?I:1;we.push(N("bias",n[2].dataType,n[2].dims.length,re))}let nt=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Jt(e,nt);let je=Fe(ee.type.tensor),M=Xt(e,ee.type.value,je),F=PE(I,Q,M,[Ve,le,ve,ee],o);return`
  ${W.registerUniforms(nt).registerInternalVariables(Ve).declareVariables(...we,ee)}
  ${F}
  ${v?wc(T,x,te,Ve):Tc(T,x,te,Ve)}
                   `};return{name:"MatMul",shaderCache:{hint:`${T};${e.activation};${v};${o}`,inputDependencies:X},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:n[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:V}),getShaderSource:pe}}});var EE,hv,mv=k(()=>{"use strict";ce();Br();xe();bn();Ma();pv();Va();EE=(n,e,r,t,o=!1,i,a=4,s=4,u=4,c="f32")=>{let d=X=>{switch(X){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${c}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${X} is not supported.`)}},f=X=>{switch(X){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${X} is not supported.`)}},h=n?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,b=n?`
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
    `,y=n?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",v=n?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",T=n?"row":"col",x=n?"col":"row",w=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${n?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${T} / outWidth;
    let outCol = ${T} % outWidth;

    let WRow = ${x} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${x} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${x} % inChannels;
    var resData = ${it(a,c)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${y} && xCol >= 0 && xCol < ${v}) {
      ${h}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${d(a)}
    }
    return resData;`,I=n?e&&t?`
    let col = colIn * ${a};
    ${w}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${w}
    }
    return ${it(a,c)}(0.0);`:t&&r?`
    let col = colIn * ${a};
    ${w}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${w}
    }
    return ${it(a,c)}(0.0);`,A=n?t&&r?f(s):`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${f(s)}
    }
    return ${it(s,c)}(0.0);`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${f(s)}
    }
    return ${it(s,c)}(0.0);`,P=it(u,c),C=n?it(a,c):it(s,c),R=n?it(s,c):it(a,c),z=Xt(i,P,c);return`
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
      ${b}
      ${cv(o)}
      ${z}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},hv=(n,e,r,t,o,i,a,s,u)=>{let c=e.format==="NHWC",d=c?n[0].dims[3]:n[0].dims[1],f=r[0],h=c?r[2]:r[3],b=c?r[1]:r[2],y=c?r[3]:r[1],v=c&&(d%4===0||d%3===0)&&y%4===0,T=c?y:h*b,x=c?h*b:y,w=[8,8,1],I=t<=8?[4,1,1]:[4,4,1],A=[Math.ceil(T/w[0]/I[0]),Math.ceil(x/w[1]/I[1]),Math.ceil(f/w[2]/I[2])];Ie("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${A}`);let P=v?c&&d%4!==0?3:4:1,C=w[1]*I[1],R=w[0]*I[0],z=Math.max(w[0]*P,w[1]),V=t%C===0,X=o%R===0,Q=i%z===0,pe=v?[P,4,4]:[1,1,1],W=[{type:6,data:t},{type:6,data:o},{type:6,data:i},{type:6,data:[e.pads[0],e.pads[1]]},{type:6,data:e.strides},{type:6,data:e.dilations}];Zt(e,W),W.push(...q(n[0].dims,n[1].dims));let ue=["rank","rank"];a&&(W.push(...q(n[2].dims)),ue.push("rank")),W.push(...q(r));let Ve=te=>{let le=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Jt(e,le);let ve=v?4:1,ee=Fe(n[0].dataType),we=`
      fn setOutputAtIndex(flatIndex : i32, value : ${v?`vec4<${ee}>`:ee}) {
        result[flatIndex] = ${v?`vec4<${ee}>`:ee}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${v?`vec4<${ee}>`:ee}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${v?"/ 4":""}, value);
      }`,nt=N("x",n[0].dataType,n[0].dims.length,P===3?1:P),je=N("w",n[1].dataType,n[1].dims.length,ve),M=[nt,je],F=U("result",n[0].dataType,r.length,ve);if(a){let re=N("bias",n[2].dataType,n[2].dims.length,ve);M.push(re),we+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${v?`vec4<${ee}>`:ee} {
          return bias[coords.${c?"w":"y"}${v?"/ 4":""}];
        }`}return`
        ${dv("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${te.registerUniforms(le).declareVariables(...M,F)}
        ${we}
        ${EE(c,V,X,Q,a,e,pe[0],pe[1],pe[2],ee)}
        ${v?wc(I,w,ee,void 0,!c,z):Tc(I,w,ee,void 0,!c,z,!1,void 0,s)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${e.cacheKey};${P};${v};${V};${X};${Q};${C};${R};${z}`,inputDependencies:ue},getRunData:()=>({outputs:[{dims:u?u(r):r,dataType:n[0].dataType}],dispatchGroup:{x:A[0],y:A[1],z:A[2]},programUniforms:W}),getShaderSource:Ve}}});var CE,gv,Ga,DE,bv,kE,yv,_v,vv=k(()=>{"use strict";ce();Br();ge();xe();bn();Ma();CE=n=>{let e=1;for(let r=0;r<n.length;r++)e*=n[r];return e},gv=n=>typeof n=="number"?[n,n,n]:n,Ga=(n,e)=>e<=1?n:n+(n-1)*(e-1),DE=(n,e,r,t=1)=>{let o=Ga(e,t);return Math.floor((n[0]*(r-1)-r+o)/2)},bv=(n,e,r,t,o)=>{o==null&&(o=DE(n,e[0],t[0]));let i=[0,0,0,r];for(let a=0;a<3;a++)n[a]+2*o>=e[a]&&(i[a]=Math.trunc((n[a]-e[a]+2*o)/t[a]+1));return i},kE=(n,e,r,t,o,i,a,s,u,c)=>{let d,f,h,b;if(n==="VALID"&&(n=0),typeof n=="number"){d={top:n,bottom:n,left:n,right:n,front:n,back:n};let y=bv([e,r,t,1],[s,u,c],1,[o,i,a],n);f=y[0],h=y[1],b=y[2]}else if(Array.isArray(n)){if(!n.every((v,T,x)=>v===x[0]))throw Error(`Unsupported padding parameter: ${n}`);d={top:n[0],bottom:n[1],left:n[2],right:n[3],front:n[4],back:n[5]};let y=bv([e,r,t,1],[s,u,c],1,[o,i,a],n[0]);f=y[0],h=y[1],b=y[2]}else if(n==="SAME_UPPER"){f=Math.ceil(e/o),h=Math.ceil(r/i),b=Math.ceil(t/a);let y=(f-1)*o+s-e,v=(h-1)*i+u-r,T=(b-1)*a+c-t,x=Math.floor(y/2),w=y-x,I=Math.floor(v/2),A=v-I,P=Math.floor(T/2),C=T-P;d={top:I,bottom:A,left:P,right:C,front:x,back:w}}else throw Error(`Unknown padding parameter: ${n}`);return{padInfo:d,outDepth:f,outHeight:h,outWidth:b}},yv=(n,e,r,t,o,i=!1,a="channelsLast")=>{let s,u,c,d,f;if(a==="channelsLast")[s,u,c,d,f]=n;else if(a==="channelsFirst")[s,f,u,c,d]=n;else throw new Error(`Unknown dataFormat ${a}`);let[h,,b,y,v]=e,[T,x,w]=gv(r),[I,A,P]=gv(t),C=Ga(b,I),R=Ga(y,A),z=Ga(v,P),{padInfo:V,outDepth:X,outHeight:Q,outWidth:pe}=kE(o,u,c,d,T,x,w,C,R,z),W=i?h*f:h,ue=[0,0,0,0,0];return a==="channelsFirst"?ue=[s,W,X,Q,pe]:a==="channelsLast"&&(ue=[s,X,Q,pe,W]),{batchSize:s,dataFormat:a,inDepth:u,inHeight:c,inWidth:d,inChannels:f,outDepth:X,outHeight:Q,outWidth:pe,outChannels:W,padInfo:V,strideDepth:T,strideHeight:x,strideWidth:w,filterDepth:b,filterHeight:y,filterWidth:v,effectiveFilterDepth:C,effectiveFilterHeight:R,effectiveFilterWidth:z,dilationDepth:I,dilationHeight:A,dilationWidth:P,inShape:n,outShape:ue,filterShape:e}},_v=(n,e,r,t,o,i)=>{let a=i==="channelsLast",s=a?n[0].dims[3]:n[0].dims[1],u=!1,c=[64,1,1],d={x:r.map((w,I)=>I)},f=[Math.ceil(CE(d.x.map(w=>r[w]))/c[0]),1,1];Ie("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${f}`);let h=u?a&&s%4!==0?3:4:1,b=D.size(r),y=[{type:12,data:b},{type:12,data:t},{type:12,data:o},{type:12,data:e.strides},{type:12,data:e.dilations}];Zt(e,y),y.push(...q(n[0].dims,n[1].dims));let v=["rank","rank"],T=n.length===3;T&&(y.push(...q(n[2].dims)),v.push("rank")),y.push(...q(r));let x=w=>{let I=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:t.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:e.strides.length},{name:"dilations",type:"u32",length:e.dilations.length}];Jt(e,I);let A=u?4:1,P=Fe(n[0].dataType),C=N("x",n[0].dataType,n[0].dims.length,h===3?1:h),R=N("W",n[1].dataType,n[1].dims.length,A),z=[C,R],V=U("result",n[0].dataType,r.length,A),X="";if(T){let W=N("bias",n[2].dataType,n[2].dims.length,A);z.push(W),X+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${P}>`:P} {
          return bias[${a?Y("coords",4,5):Y("coords",1,5)}${u?"/ 4":""}];
        }`}let Q=it(h,P),pe=Xt(e,Q,P);return`
            ${X}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${C.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${R.getByIndices("aIndices")};
            }
          ${w.registerUniforms(I).declareVariables(...z,V)}
          ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${V.offsetToIndices("global_idx")};
              let batch = ${Y("coords",0,C.rank)};
              let d2 = ${a?Y("coords",C.rank-1,C.rank):Y("coords",1,C.rank)};
              let xFRCCorner = vec3<u32>(${a?Y("coords",1,C.rank):Y("coords",2,C.rank)},
              ${a?Y("coords",2,C.rank):Y("coords",3,C.rank)},
              ${a?Y("coords",3,C.rank):Y("coords",4,C.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?Y("uniforms.x_shape",1,C.rank):Y("uniforms.x_shape",2,C.rank)};
              let xShapeZ = ${a?Y("uniforms.x_shape",2,C.rank):Y("uniforms.x_shape",3,C.rank)};
              let xShapeW = ${a?Y("uniforms.x_shape",3,C.rank):Y("uniforms.x_shape",4,C.rank)};
              let xShapeU = ${a?Y("uniforms.x_shape",4,C.rank):Y("uniforms.x_shape",1,C.rank)};
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
              ${pe}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${e.cacheKey};${a};${h};${T}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:r,dataType:n[0].dataType}],dispatchGroup:{x:f[0],y:f[1],z:f[2]},programUniforms:y}),getShaderSource:x}}});var xv,wv,Tv=k(()=>{"use strict";ce();ge();xe();bn();xv=(n,e,r,t)=>{let o=n.length>2,i=o?"value += b[output_channel];":"",a=n[0].dims,s=n[1].dims,u=e.format==="NHWC",c=u?r[3]:r[1],d=c/e.group,f=u&&d>=4?Ce(c):1,h=D.size(r)/f,b=[{type:12,data:h},{type:12,data:e.dilations},{type:12,data:[e.strides[0],e.strides[1]]},{type:12,data:[e.pads[0],e.pads[1]]},{type:12,data:d}];Zt(e,b),b.push(...q(a,[s[0],s[1],s[2],s[3]/f]));let y=o?["rank","rank","rank"]:["rank","rank"];b.push(...q([r[0],r[1],r[2],r[3]/f]));let v=T=>{let x=U("output",n[0].dataType,r.length,f),w=Fe(x.type.tensor),I=Xt(e,x.type.value,w),A=N("x",n[0].dataType,a.length),P=N("w",n[1].dataType,s.length,f),C=[A,P];o&&C.push(N("b",n[2].dataType,n[2].dims,f));let R=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:e.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Jt(e,R);let z=u?`
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
  ${T.registerUniforms(R).declareVariables(...C,x)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${x.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${f} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${x.type.value} = ${x.type.value}(0);
    ${z}
    ${i}
    ${I}
    ${x.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${e.cacheKey}_${f}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:t?t(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:b}),getShaderSource:v}},wv=(n,e,r,t)=>{let o=n.length>2,i=Ce(r[3]),a=Ce(r[2]),s=D.size(r)/i/a,u=[n[0].dims[0],n[0].dims[1],n[0].dims[2],n[0].dims[3]/i],c=[n[1].dims[0],n[1].dims[1],n[1].dims[2],n[1].dims[3]/i],d=[r[0],r[1],r[2],r[3]/i],f=[{type:12,data:s},{type:6,data:[e.strides[0],e.strides[1]]},{type:6,data:[e.pads[0],e.pads[1]]}];Zt(e,f),f.push(...q(u,c,d));let h=(a-1)*e.strides[1]+c[1],b=y=>{let v=U("output",n[0].dataType,d.length,i),T=Fe(v.type.tensor),x=Xt(e,v.type.value,T),w=N("x",n[0].dataType,u.length,i),I=N("w",n[1].dataType,c.length,i),A=[w,I];o&&A.push(N("b",n[2].dataType,n[2].dims,i));let P=o?"value += b[output_channel];":"",C=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Jt(e,C),`
  ${y.registerUniforms(C).declareVariables(...A,v)}
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

    var x_vals: array<${w.type.value}, ${h}>;
    var values: array<${v.type.value}, ${a}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${c[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${h}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${w.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${w.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${c[1]}; w_width++) {
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
      ${x}
      ${v.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${e.cacheKey};${i};${a};${h};${c[0]};${c[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:t?t(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:f}),getShaderSource:b}}});var NE,Ic,LE,Sc,$c,Iv,RE,zE,Ac,Sv=k(()=>{"use strict";ge();mv();vv();Va();Tv();bn();Fa();Jr();NE=(n,e,r,t,o,i)=>{let a=n[0],s=n.slice(i?1:2,i?3:4),u=s.length,c=e[0],f=e.slice(2).map((y,v)=>y+(y-1)*(r[v]-1)),b=s.map((y,v)=>y+t[v]+t[v+u]).map((y,v)=>Math.floor((y-f[v]+o[v])/o[v]));return b.splice(0,0,a),b.splice(i?3:1,0,c),b},Ic=[2,3,1,0],LE=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length>5)throw new Error("greater than 5D is not supported");if(n[0].dims.length!==n[1].dims.length)throw new Error("filter does not have same dimension as input");let r=n[0].dims[e.format==="NHWC"?n[0].dims.length-1:1],t=n[1].dims[1]*e.group;if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(n.length===3&&(n[2].dims.length!==1||n[1].dims[0]!==n[2].dims[0]))throw new Error("invalid bias");let o=n[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape")},Sc=(n,e)=>{let r=n.kernelShape.slice();r.length<e[1].dims.length-2&&r.push(...Array(e[1].dims.length-2-r.length).fill(0));for(let i=2;i<e[1].dims.length;++i)r[i-2]===0&&(r[i-2]=e[1].dims[i]);let t=n.pads.slice();zn.adjustPadsBasedOnAutoPad(e[0].dims,n.strides,n.dilations,r,t,n.format==="NHWC",n.autoPad);let o=Object.assign({},n);return Object.assign(o,{kernelShape:r,pads:t}),o},$c=n=>{let e=za(n),r=n.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][n.auto_pad],o=n.dilations,i=n.group,a=n.kernel_shape,s=n.pads,u=n.strides,c=n.w_is_const();return{autoPad:t,format:r,dilations:o,group:i,kernelShape:a,pads:s,strides:u,wIsConst:c,...e,cacheKey:`${n.format};${e.activation};`}},Iv=(n,e,r,t)=>{let o=r.format==="NHWC",i=NE(e[0].dims,e[1].dims,r.dilations,r.pads,r.strides,o);if(r.group!==1){let C=[e[0]];if(o){let z=n.kernelCustomData.wT??n.compute(ut(e[1],Ic),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=z),C.push(z)}else C.push(e[1]);e.length===3&&C.push(e[2]),!n.adapterInfo.isArchitecture("ampere")&&o&&e[1].dims[0]===r.group&&e[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?n.compute(wv(C,r,i,t),{inputs:C}):n.compute(xv(C,r,i,t),{inputs:C});return}let a=e.length===3,s=e[0].dims[o?1:2],u=e[0].dims[o?2:3],c=e[0].dims[o?3:1],d=e[1].dims[2],f=e[1].dims[3],h=i[o?1:2],b=i[o?2:3],y=i[o?3:1],v=o&&d===s&&f===u&&r.pads[0]===0&&r.pads[1]===0;if(v||d===1&&f===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let C=i[0],R,z,V,X=[];if(o){let W=n.kernelCustomData.wT??n.compute(ut(e[1],Ic),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=W),v){let ue=s*u*c;R=e[0].reshape([1,C,ue]),z=W.reshape([1,ue,y]),V=[1,C,y]}else R=e[0].reshape([C,s*u,c]),z=W.reshape([1,c,y]),V=[C,h*b,y];X.push(R),X.push(z)}else R=e[0].reshape([C,c,s*u]),z=e[1].reshape([1,y,c]),V=[C,y,h*b],X.push(z),X.push(R);a&&X.push(e[2]);let Q=V[2],pe=X[0].dims[X[0].dims.length-1];Q<8&&pe<8?n.compute(Ba(X,r,i,V,o,t),{inputs:X}):n.compute(Wo(X,r,i,V,o,t),{inputs:X});return}let T=!0,x=n.kernelCustomData.wT??n.compute(ut(e[1],Ic),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=x);let w=[e[0],x];a&&w.push(e[2]);let I=o?h*b:y,A=o?y:h*b,P=d*f*c;n.compute(hv(w,r,i,I,A,P,a,T,t),{inputs:w})},RE=(n,e)=>{let r=e.format==="NHWC",t=[n.inputs[0].reshape(r?[n.inputs[0].dims[0],1,n.inputs[0].dims[1],n.inputs[0].dims[2]]:[n.inputs[0].dims[0],n.inputs[0].dims[1],1,n.inputs[0].dims[2]]),n.inputs[1].reshape([n.inputs[1].dims[0],n.inputs[1].dims[1],1,n.inputs[1].dims[2]])];n.inputs.length===3&&t.push(n.inputs[2]);let o=[0,e.pads[0],0,e.pads[1]],i=[1].concat(e.strides),a=[1].concat(e.dilations),s=[1].concat(e.kernelShape),u=Sc({...e,pads:o,strides:i,dilations:a,kernelShape:s},t);Iv(n,t,u,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},zE=(n,e,r)=>{let t=r.format==="NHWC"?"channelsLast":"channelsFirst",o=Sc(r,e),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,a=yv(e[0].dims,e[1].dims,r.strides,r.dilations,i,!1,t);n.compute(_v(e,o,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],t))},Ac=(n,e)=>{if(LE(n.inputs,e),n.inputs[0].dims.length===3)RE(n,e);else if(n.inputs[0].dims.length===5)zE(n,n.inputs,e);else{let r=Sc(e,n.inputs);Iv(n,n.inputs,r)}}});var $v,Av=k(()=>{"use strict";ce();Br();ge();xe();$v=(n,e,r)=>{let t=n.length>2,o=e.outputShape,i=e.format==="NHWC",a=e.group,s=n[1].dims,u=s[2]/a,c=s[3],d=i?Ce(u):1,f=i?Ce(c):1,h=i?c===1?d:f:1,b=D.size(o)/f,y=[Math.ceil(b/64),1,1];Ie("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${y}`);let v=["rank","rank"],T=[e.strides[0],e.strides[1]],x=[e.kernelShape[i?1:2],e.kernelShape[i?2:3]],w=[e.dilations[0],e.dilations[1]],I=[x[0]+(e.dilations[0]<=1?0:(e.kernelShape[i?1:2]-1)*(e.dilations[0]-1)),x[1]+(e.dilations[1]<=1?0:(e.kernelShape[i?2:3]-1)*(e.dilations[1]-1))],A=[I[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),I[1]-1-Math.floor((e.pads[1]+e.pads[3])/2)],P=[{type:12,data:b},{type:12,data:T},{type:12,data:x},{type:12,data:w},{type:12,data:I},{type:6,data:A},{type:12,data:u},{type:12,data:c},...q(n[0].dims,n[1].dims)];t&&(P.push(...q(n[2].dims)),v.push("rank")),P.push(...q(o));let C=R=>{let z=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:T.length},{name:"filter_dims",type:"u32",length:x.length},{name:"dilations",type:"u32",length:x.length},{name:"effective_filter_dims",type:"u32",length:I.length},{name:"pads",type:"i32",length:A.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],V=Fe(n[0].dataType),X=i?1:2,Q=i?2:3,pe=i?3:1,W=N("W",n[1].dataType,n[1].dims.length,h),ue=N("Dy",n[0].dataType,n[0].dims.length,d),Ve=[ue,W];t&&Ve.push(N("bias",n[2].dataType,[o[pe]].length,f));let te=U("result",n[0].dataType,o.length,f),le=()=>{let ee="";if(d===1)ee+=`
        let w_offset = ${W.indicesToOffset(`${W.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
        let wValue = ${W.getByOffset(`w_offset / ${h}`)};
        dotProd = dotProd + xValue * wValue;`;else if(c===1)ee+=`
          let wValue = ${W.getByOffset(`${W.indicesToOffset(`${W.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)} / ${h}`)};
          dotProd = dotProd + dot(xValue, wValue);`;else for(let we=0;we<d;we++)ee+=`
            let wValue${we} = ${W.getByOffset(`${W.indicesToOffset(`${W.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${we}, wOutChannel)`)} / ${h}`)};
            dotProd = dotProd + xValue[${we}] * wValue${we};`;return ee},ve=`
            let outputIndices = ${te.offsetToIndices(`global_idx * ${f}`)};
            let batch = ${te.indicesGet("outputIndices",0)};
            let d1 = ${te.indicesGet("outputIndices",pe)};
            let r = ${te.indicesGet("outputIndices",X)};
            let c = ${te.indicesGet("outputIndices",Q)};
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
              let dyR = (${V}(dyRCorner) + ${V}(wR)) / ${V}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${V}(uniforms.Dy_shape[${X}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${V}(dyCCorner) + ${V}(wC)) / ${V}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${V}(uniforms.Dy_shape[${Q}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + ${d}) {
                  let xValue = ${i?ue.getByOffset(`${ue.indicesToOffset(`${ue.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${d}`):ue.get("batch","inputChannel","idyR","idyC")};
                  ${le()}
                  inputChannel = inputChannel + ${d};
                }
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${t?` + bias[d1 / ${f}]`:""};
            ${te.setByOffset("global_idx","value")};
          `;return`
    ${R.registerUniforms(z).declareVariables(...Ve,te)}
      ${R.mainStart()}
      ${R.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${ve}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${e.cacheKey};${d}${h}${f}${c===1}`,inputDependencies:v},getRunData:()=>({dispatchGroup:{x:y[0],y:y[1],z:y[2]},outputs:[{dims:r?r(o):o,dataType:n[0].dataType}],programUniforms:P}),getShaderSource:C}}});var ME,BE,FE,Ov,Pv,VE,Ev,GE,Cv,Dv=k(()=>{"use strict";Av();bn();Jr();ME=(n,e,r,t,o,i)=>(n-1)*e+r+(t-1)*o+1-i,BE=(n,e,r,t,o)=>{let i=Math.floor(n/2);e==="SAME_UPPER"?(r[t]=i,r[o]=n-i):e==="SAME_LOWER"&&(r[t]=n-i,r[o]=i)},FE=(n,e,r,t,o,i,a,s,u,c)=>{let d=n.length-2,f=c.length===0;u.length<d&&u.push(...Array(d-u.length).fill(0));let h=n[0],b=e[s?3:1]*o;for(let y=0,v=n.length-d-(s?1:0);y<d;++y,++v){let T=n[v],x=f?T*a[y]:c[y],w=ME(T,a[y],i[y],e[v],r[y],x);BE(w,t,i,y,y+d),f&&c.push(a[y]*(T-1)+u[y]+(e[v]-1)*r[y]+1-i[y]-i[y+d])}c.splice(0,0,h),c.splice(s?3:1,0,b)},Ov=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0||n.kernelShape.reduce((f,h)=>f*h,1)===0){r.length=0;for(let f=2;f<e[1].dims.length;++f)r.push(e[1].dims[f])}let t=n.format==="NHWC";r.splice(0,0,e[1].dims[0]),r.splice(t?3:1,0,e[1].dims[1]);let o=n.pads.slice(),i=n.outputShape.slice(),a=n.outputPadding.slice(),s=e[0].dims,u=n.dilations.slice();if(u.reduce((f,h)=>f+h,0)===0){let f=e[0].dims.length-2;u=new Array(f).fill(1)}let c=n.strides.slice();if(c.reduce((f,h)=>f+h,0)===0){let f=e[0].dims.length-2;c=new Array(f).fill(1)}FE(s,r,u,n.autoPad,n.group,o,c,t,a,i);let d=Object.assign({},n);return Object.assign(d,{kernelShape:r,pads:o,outputPadding:a,outputShape:i,dilations:u,strides:c}),d},Pv=n=>{let e=za(n),r=n.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof n.autoPad>"u"?0:n.autoPad],o=n.dilations,i=n.group,a=n.kernelShape,s=n.pads,u=n.strides,c=n.wIsConst(),d=n.outputPadding,f=n.outputShape;return{autoPad:t,format:r,dilations:o,group:i,kernelShape:a,outputPadding:d,outputShape:f,pads:s,strides:u,wIsConst:c,...e,cacheKey:`${n.format};${e.activation};`}},VE=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4&&n[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(n[0].dims.length!==n[1].dims.length)throw new Error("filter does not have same dimension as input");let r=n[0].dims[e.format==="NHWC"?n[0].dims.length-1:1],t=n[1].dims[0];if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=n[1].dims[1]*e.group;if(n.length===3&&(n[2].dims.length!==1||n[2].dims[0]!==o))throw new Error("invalid bias");let i=n[0].dims.length-2;if(e.dilations.reduce((d,f)=>d+f,0)>0&&e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.reduce((d,f)=>d+f,0)>0&&e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.reduce((d,f)=>d+f,0)>0&&e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i&&e.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.reduce((d,f)=>d+f,0)>0&&e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==n[0].dims.length-2)throw new Error("invalid output shape")},Ev=(n,e,r,t)=>{let o=n.kernelCustomData.wT??n.compute(ut(e[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=o);let i=[e[0],o];e.length===3&&i.push(e[2]),n.compute($v(i,r,t),{inputs:i})},GE=(n,e)=>{let r=e.format==="NHWC",t=[n.inputs[0].reshape(r?[n.inputs[0].dims[0],1,n.inputs[0].dims[1],n.inputs[0].dims[2]]:[n.inputs[0].dims[0],n.inputs[0].dims[1],1,n.inputs[0].dims[2]]),n.inputs[1].reshape([n.inputs[1].dims[0],n.inputs[1].dims[1],1,n.inputs[1].dims[2]])];n.inputs.length===3&&t.push(n.inputs[2]);let o=e.kernelShape;(o.length===0||o[0]===0)&&(o=[n.inputs[1].dims[2]]);let i=e.dilations;(i.length===0||i[0]===0)&&(i=[1]);let a=e.strides;(a.length===0||a[0]===0)&&(a=[1]);let s=e.pads;s.length===0&&(s=[0,0]),s=[0,s[0],0,s[1]],a=[1].concat(a),i=[1].concat(i),o=[1].concat(o);let u=e.outputPadding;u=[0].concat(u);let c=Ov({...e,pads:s,strides:a,dilations:i,kernelShape:o,outputPadding:u},t);Ev(n,t,c,d=>r?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},Cv=(n,e)=>{if(VE(n.inputs,e),n.inputs[0].dims.length===3)GE(n,e);else{let r=Ov(e,n.inputs);Ev(n,n.inputs,r)}}});var UE,kv,Nv,Lv=k(()=>{"use strict";ce();ge();Je();xe();UE=(n,e,r,t)=>{let o=D.size(e),i=e.length,a=N("input",n,i),s=U("output",n,i),u=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),c=D.normalizeAxis(u,i),d=f=>{let h=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,b=Y("uniforms.input_shape","uniforms.axis",i),y=t.reverse?h+(t.exclusive?" + 1":""):"0",v=t.reverse?b:h+(t.exclusive?"":" + 1");return`
                ${f.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,s)}
                ${f.mainStart()}
                  ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${s.offsetToIndices("global_idx")};
                  var sum = ${s.type.value}(0);
                  let first : i32 = ${y};
                  let last : i32 = ${v};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${s.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:e,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:c},...q(e,e)]}),getShaderSource:d}},kv=(n,e)=>{let r=n.inputs[0].dims,t=n.inputs[0].dataType,o=n.inputs[1];n.compute(UE(t,r,o,e),{inputs:[0]})},Nv=n=>{let e=n.exclusive===1,r=n.reverse===1;return de({exclusive:e,reverse:r})}});var WE,HE,qE,Rv,zv,Mv=k(()=>{"use strict";ce();ge();Je();xe();WE=n=>{if(!n||n.length!==1)throw new Error("DepthToSpace requires 1 input.");if(n[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},HE=(n,e,r,t)=>{let o=[];o.push(`fn perm(i: ${t.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<e;++i)o.push(r.indicesSet("a",n[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},qE=(n,e)=>{let r,t,o,i,a,s,u=e.format==="NHWC",c=e.blocksize,d=e.mode==="DCR";u?([r,t,o,i]=n.dims,a=d?[r,t,o,c,c,i/c**2]:[r,t,o,i/c**2,c,c],s=d?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,t,o,i]=[n.dims[0],n.dims[2],n.dims[3],n.dims[1]],a=d?[r,c,c,i/c**2,t,o]:[r,i/c**2,c,c,t,o],s=d?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let f=n.reshape(a),h=f.dims.length,b=n.dataType,y=N("a",b,h),v=U("output",b,h),T=x=>`
  ${x.registerUniform("output_size","u32").declareVariables(y,v)}

  ${HE(s,h,y,v)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${v.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${v.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${n.dims};${e.blocksize};${e.mode}`,inputDependencies:["rank"]},getRunData:x=>{let w=u?[r,t*c,o*c,i/c**2]:[r,i/c**2,t*c,o*c],I=D.size(w),A=f.dims,P=D.sortBasedOnPerm(A,s);return{outputs:[{dims:w,dataType:x[0].dataType}],dispatchGroup:{x:Math.ceil(I/64)},programUniforms:[{type:12,data:I},...q(A,P)]}},getShaderSource:T}},Rv=(n,e)=>{WE(n.inputs),n.compute(qE(n.inputs[0],e))},zv=n=>de({blocksize:n.blocksize,mode:n.mode,format:n.format})});var Oc,Ua,Bv,jE,KE,Pc,Ec,Fv,XE,Vv,Gv,Uv=k(()=>{"use strict";ce();ge();Je();xe();Oc="[a-zA-Z]|\\.\\.\\.",Ua="("+Oc+")+",Bv="^"+Ua+"$",jE="("+Ua+",)*"+Ua,KE="^"+jE+"$",Pc=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,r){let t=this.symbolToIndices.get(e);t===void 0?t=[r]:t.push(r),this.symbolToIndices.set(e,t)}},Ec=class{constructor(e,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[t,o]=r.includes("->")?r.split("->",2):[r,""];if(!t.match(RegExp(KE)))throw new Error("Invalid LHS term");if(t.split(",").forEach((s,u)=>{let c=e[u].dims.slice();if(!s.match(RegExp(Bv)))throw new Error("Invalid LHS term");let d=this.processTerm(s,!0,c,u);this.lhs.push(d)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([s,u])=>u.count===1||s==="...").map(([s])=>s).join("");else if(!o.match(RegExp(Ua)))throw new Error("Invalid RHS");o.match(RegExp(Oc,"g"))?.forEach(s=>{if(s==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let u=this.symbolToInfo.get(s);if(u===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(u.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(e,r,t){let o=this.symbolToInfo.get(e);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(t)}else o={count:1,dimValue:r,inputIndices:[t]};this.symbolToInfo.set(e,o)}processTerm(e,r,t,o=-1){let i=t.length,a=!1,s=[],u=0;if(!e.match(RegExp(Bv))&&!r&&e!=="")throw new Error("Invalid LHS term");let c=e.match(RegExp(Oc,"g")),d=new Pc(o);return c?.forEach((f,h)=>{if(f==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let b=i-c.length+1;if(b<0)throw new Error("Ellipsis out of bounds");if(s=t.slice(u,u+b),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let y=0;y<s.length;y++){let v=String.fromCharCode(48+y);d.addSymbol(v,h+y),this.addSymbol(v,t[u++],o)}}else d.addSymbol(f,h+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(f,t[u++],o)}),d}},Fv=n=>n+"_max",XE=(n,e,r,t)=>{let i=n.map(d=>d.length).map((d,f)=>N(`input${f}`,e,d)),a=D.size(t),s=U("output",e,t.length),u=[...r.symbolToInfo.keys()].filter(d=>!r.rhs.symbolToIndices.has(d)),c=d=>{let f=[],h="var prod = 1.0;",b="var sum = 0.0;",y="sum += prod;",v=[],T=[],x=[],w=[],I=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((P,C)=>{if(r.rhs.symbolToIndices.has(C)){let R=r.rhs.symbolToIndices.get(C)?.[0];R!==void 0&&r.lhs.forEach((z,V)=>{if(P.inputIndices.includes(V)){let X=z.symbolToIndices.get(C);if(X===void 0)throw new Error("Invalid symbol error");X.forEach(Q=>{f.push(`${i[V].indicesSet(`input${V}Indices`,Q,s.indicesGet("outputIndices",R))}`)})}})}else r.lhs.forEach((R,z)=>{if(P.inputIndices.includes(z)){let V=R.symbolToIndices.get(C);if(V===void 0)throw new Error("Invalid symbol error");V.forEach(X=>{v.push(`${i[z].indicesSet(`input${z}Indices`,X,`${C}`)}`)}),w.push(`prod *= ${i[z].getByIndices(`input${z}Indices`)};`)}}),T.push(`for(var ${C}: u32 = 0; ${C} < uniforms.${Fv(C)}; ${C}++) {`),x.push("}")});let A=I?[...f,`let sum = ${i.map((P,C)=>P.getByIndices(`input${C}Indices`)).join(" * ")};`]:[...f,b,...T,...v,h,...w,y,...x];return`
            ${d.registerUniforms(u.map(P=>({name:`${Fv(P)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,s)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${i.map((P,C)=>`var input${C}Indices: ${i[C].type.indices};`).join(`
`)}
            ${A.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:n.map(()=>"rank")},getRunData:()=>{let d=u.filter(h=>r.symbolToInfo.has(h)).map(h=>({type:12,data:r.symbolToInfo.get(h)?.dimValue||0}));d.push({type:12,data:a});let f=n.map((h,b)=>[...q(h)]).reduce((h,b)=>h.concat(b),d);return f.push(...q(t)),{outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:f}},getShaderSource:c}},Vv=(n,e)=>{let r=new Ec(n.inputs,e.equation),t=r.outputDims,o=n.inputs.map((i,a)=>i.dims);n.compute(XE(o,n.inputs[0].dataType,r,t))},Gv=n=>{let e=n.equation.replace(/\s+/g,"");return de({equation:e})}});var ZE,Wv,JE,YE,Hv,qv=k(()=>{"use strict";ce();ge();xe();ZE=n=>{if(!n||n.length!==2)throw new Error("Expand requires 2 input.");let e=n[0].dims,r=Array.from(n[1].getBigInt64Array(),Number),t=r.length<e.length?0:r.length-e.length,o=e.length<r.length?0:e.length-r.length;for(;t<r.length&&o<e.length;++t,++o)if(r[t]!==e[o]&&r[t]!==1&&e[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Wv=(n,e)=>{let r=n.length-e.length,t=[];for(let o=0;o<r;++o)t.push(n[o]);for(let o=0;o<e.length;++o)t.push(e[o]===1?n[o+r]:e[o]);return t},JE=(n,e)=>n.length>e.length?Wv(n,e):Wv(e,n),YE=n=>{let e=n[0].dims,r=Array.from(n[1].getBigInt64Array(),Number),t=JE(e,r),o=n[0].dataType,i=o===9||D.size(e)===1,a=o===9||e.length>0&&e[e.length-1]%4===0?4:1,s=i||t.length>0&&t[t.length-1]%4===0?4:1,u=Math.ceil(D.size(t)/s),c=f=>{let h=N("input",o,e.length,a),b=U("output",o,t.length,s),y;if(o===9){let v=(T,x,w="")=>`
          let outputIndices${x} = ${b.offsetToIndices(`outputOffset + ${x}u`)};
          let offset${x} = ${h.broadcastedIndicesToOffset(`outputIndices${x}`,b)};
          let index${x} = offset${x} / 4u;
          let component${x} = offset${x} % 4u;
          ${T}[${x}] = ${w}(${h.getByOffset(`index${x}`)}[component${x}]);
        `;y=`
        let outputOffset = global_idx * ${s};
        var data = vec4<u32>(0);
        ${v("data",0,"u32")}
        ${v("data",1,"u32")}
        ${v("data",2,"u32")}
        ${v("data",3,"u32")}
        ${b.setByOffset("global_idx","data")}
      }`}else y=`
        let outputIndices = ${b.offsetToIndices(`global_idx * ${s}`)};
        let inputOffset = ${h.broadcastedIndicesToOffset("outputIndices",b)};
        let data = ${b.type.value}(${h.getByOffset(`inputOffset / ${a}`)});
        ${b.setByOffset("global_idx","data")}
      }`;return`
    ${f.registerUniform("vec_size","u32").declareVariables(h,b)}
    ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${y}`},d=[{type:12,data:u},...q(e,t)];return{name:"Expand",shaderCache:{hint:`${t.length};${a}${s}`,inputDependencies:["rank"]},getShaderSource:c,getRunData:()=>({outputs:[{dims:t,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d})}},Hv=n=>{ZE(n.inputs),n.compute(YE(n.inputs),{inputs:[0]})}});var QE,jv,Kv=k(()=>{"use strict";ce();ge();xe();Ra();QE=n=>{let e=n[0].dataType,r=D.size(n[0].dims),t=D.size(n[1].dims),o=t%4===0,i=a=>{let s=N("x",e,[1],4),u=N("bias",e,[1],4),c=U("y",e,[1],4),d=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],f=b=>`
      let bias${b}_offset: u32 = (global_idx * 4 + ${b}) % uniforms.bias_size;
      let bias${b} = ${u.getByOffset(`bias${b}_offset / 4`)}[bias${b}_offset % 4];`,h=o?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${f(0)}${f(1)}${f(2)}${f(3)}
      let bias = ${s.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(d).declareVariables(s,u,c)}

    ${vc(st(e))}

    ${a.mainStart(Mn)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${s.getByOffset("global_idx")};
      ${h}
      let x_in = x + bias;
      ${c.setByOffset("global_idx",xc("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:t}],dispatchGroup:{x:Math.ceil(r/Mn/4)}})}},jv=n=>{n.inputs.length<2||D.size(n.inputs[1].dims)===0?U0(n):n.compute(QE(n.inputs))}});var eC,tC,Xv,Zv,Jv=k(()=>{"use strict";ce();ge();Je();xe();eC=n=>{if(!n||n.length!==2)throw new Error("Gather requires 2 inputs.")},tC=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r.length,i=D.normalizeAxis(e.axis,o),a=r.slice(0);a.splice(i,1,...t);let s=r[i],u=n[0].dataType===9?4:1,c=Math.ceil(D.size(a)/u),d=[{type:12,data:c},{type:6,data:s},{type:12,data:i},...q(n[0].dims,n[1].dims,a)],f=h=>{let b=N("data",n[0].dataType,n[0].dims.length,u),y=N("inputIndices",n[1].dataType,n[1].dims.length),v=U("output",n[0].dataType,a.length,u),T=w=>{let I=t.length,A=`var indicesIndices${w}  = ${y.type.indices}(0);`;for(let P=0;P<I;P++)A+=`${I>1?`indicesIndices${w}[${P}]`:`indicesIndices${w}`} = ${a.length>1?`outputIndices${w}[uniforms.axis + ${P}]`:`outputIndices${w}`};`;A+=`
          var idx${w} = ${y.getByIndices(`indicesIndices${w}`)};
          if (idx${w} < 0) {
            idx${w} = idx${w} + uniforms.axisDimLimit;
          }
          var dataIndices${w} : ${b.type.indices};
        `;for(let P=0,C=0;P<o;P++)P===i?(A+=`${o>1?`dataIndices${w}[${P}]`:`dataIndices${w}`} = u32(idx${w});`,C+=I):(A+=`${o>1?`dataIndices${w}[${P}]`:`dataIndices${w}`} = ${a.length>1?`outputIndices${w}[${C}]`:`outputIndices${w}`};`,C++);return A},x;if(n[0].dataType===9){let w=(I,A,P="")=>`
          let outputIndices${A} = ${v.offsetToIndices(`outputOffset + ${A}u`)};
          ${T(A)};
          let offset${A} = ${b.indicesToOffset(`dataIndices${A}`)};
          let index${A} = offset${A} / 4u;
          let component${A} = offset${A} % 4u;
          ${I}[${A}] = ${P}(${b.getByOffset(`index${A}`)}[component${A}]);
        `;x=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${w("value",0,"u32")}
        ${w("value",1,"u32")}
        ${w("value",2,"u32")}
        ${w("value",3,"u32")}
        ${v.setByOffset("global_idx","value")}
      `}else x=`
      let outputIndices = ${v.offsetToIndices("global_idx")};
      ${T("")};
      let value = ${b.getByIndices("dataIndices")};
      ${v.setByOffset("global_idx","value")};
      `;return`
      ${h.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(b,y,v)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${x}
      }`};return{name:"Gather",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:d}),getShaderSource:f}},Xv=n=>de({axis:n.axis}),Zv=(n,e)=>{let r=n.inputs;eC(r),n.compute(tC(n.inputs,e))}});var rC,Yv,Qv,ex=k(()=>{"use strict";ce();ge();xe();rC=(n,e,r,t,o,i,a,s,u)=>{let c=[{type:12,data:i},{type:12,data:t},{type:12,data:o},{type:12,data:r},{type:12,data:a},{type:12,data:s},{type:12,data:u}],d=[i];c.push(...q(e.dims,d));let f=h=>{let b=N("indices_data",e.dataType,e.dims.length),y=U("input_slice_offsets_data",12,1,1),v=[b,y],T=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${h.registerUniforms(T).declareVariables(...v)}
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
  }`};return n.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:d,dataType:n.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:c}),getShaderSource:f},{inputs:[e],outputs:[-1]})[0]},Yv=(n,e)=>{let r=n.inputs,t=r[0].dims,o=r[0].dataType,i=r[1].dims,a=i[i.length-1],s=D.sizeToDimension(i,i.length-1),u=D.sizeFromDimension(t,e.batchDims+a),c=D.sizeToDimension(t,e.batchDims),d=D.sizeFromDimension(t,e.batchDims),f=s/c,h=new Array(a),b=u;for(let A=0;A<a;++A)h[a-1-A]=b,b*=t[e.batchDims+a-1-A];let y=rC(n,r[1],h,e.batchDims,t,s,f,d,a),v=e.batchDims+a;if(v>t.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let T=i.slice(0,-1).concat(t.slice(v)),x=D.size(T),w=[{type:12,data:x},{type:12,data:u},...q(r[0].dims,y.dims,T)],I=A=>{let P=N("data",r[0].dataType,r[0].dims.length),C=N("slice_offsets",12,y.dims.length),R=U("output",r[0].dataType,T.length);return`
          ${A.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(P,C,R)}
            ${A.mainStart()}
            ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};n.compute({name:"GatherND",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:T,dataType:o}],dispatchGroup:{x:Math.ceil(x/64)},programUniforms:w}),getShaderSource:I},{inputs:[r[0],y]})},Qv=n=>({batchDims:n.batch_dims,cacheKey:""})});var nC,oC,tx,rx,nx=k(()=>{"use strict";ce();ge();Je();xe();nC=(n,e)=>{if(n.length<3||n.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=D.normalizeAxis(e.quantizeAxis,n[0].dims.length),t=e.blockSize,o=n[0],i=n[2],a=n.length===4?n[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((s,u)=>u===r?Math.ceil(s/t)===i.dims[u]:s===i.dims[u]).reduce((s,u)=>s&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==i.dims.length||!a.dims.map((s,u)=>s===i.dims[u]).reduce((s,u)=>s&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},oC=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r.length,i=D.normalizeAxis(e.gatherAxis,o),a=D.normalizeAxis(e.quantizeAxis,o),s=r.slice(0);s.splice(i,1,...t);let u=D.size(s),c=n[2].dataType,f=n[0].dataType===22,h=[{type:12,data:u},{type:12,data:a},{type:12,data:i},{type:12,data:e.blockSize},...q(...n.map((y,v)=>y.dims),s)],b=y=>{let v=N("data",n[0].dataType,n[0].dims.length),T=N("inputIndices",n[1].dataType,n[1].dims.length),x=N("scales",n[2].dataType,n[2].dims.length),w=n.length>3?N("zeroPoint",n[3].dataType,n[3].dims.length):void 0,I=U("output",c,s.length),A=[v,T,x];w&&A.push(w);let P=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${y.registerUniforms(P).declareVariables(...A,I)}
        ${y.mainStart()}
        let output_indices = ${I.offsetToIndices("global_idx")};
        var indices_indices = ${T.type.indices}(0);
        ${t.length>1?`
          for (var i: u32 = 0; i < ${t.length}; i++) {
            let index = ${I.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${T.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${I.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${v.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${I.indicesGet("output_indices","i")};
          ${v.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${T.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[i]};
        }
        ${v.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${s.length}; i++) {
          let index = ${I.indicesGet("output_indices",`i + ${t.length} - 1`)};
          ${v.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${v.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${v.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${x.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${x.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${x.getByIndices("scale_indices")};
        ${w?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${w.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${w.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${st(c)}(quantized_data - zero_point) * scale;
        ${I.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${e.cacheKey};${n.filter((y,v)=>v!==1).map(y=>y.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:n.length},(y,v)=>"rank")},getRunData:()=>({outputs:[{dims:s,dataType:c}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:h}),getShaderSource:b}},tx=(n,e)=>{let r=n.inputs;nC(r,e),n.compute(oC(n.inputs,e))},rx=n=>de({blockSize:n.blockSize,gatherAxis:n.gatherAxis,quantizeAxis:n.quantizeAxis})});var iC,aC,ox,ix,ax=k(()=>{"use strict";ce();ge();Je();xe();iC=n=>{if(!n||n.length!==2)throw new Error("GatherElements requires 2 inputs.");if(n[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(n[0].dims.length!==n[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},aC=(n,e)=>{let r=n[0].dims,t=n[0].dataType,o=r.length,i=n[1].dims,a=n[1].dataType,s=D.normalizeAxis(e.axis,o),u=r[s],c=i.slice(0),d=D.size(c),f=N("input",t,o),h=N("indicesInput",a,i.length),b=U("output",t,c.length),y=[{type:12,data:d},{type:6,data:u},{type:12,data:s}];return y.push(...q(r,i,c)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:c,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:y}),getShaderSource:x=>`
      ${x.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,h,b)}
      ${x.mainStart()}
      ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${b.offsetToIndices("global_idx")};

      var idx = ${h.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${b.setByOffset("global_idx","value")};
  }`}},ox=n=>de({axis:n.axis}),ix=(n,e)=>{let r=n.inputs;iC(r),n.compute(aC(n.inputs,e))}});var sC,uC,sx,ux,lx=k(()=>{"use strict";ce();ge();xe();sC=n=>{if(!n)throw new Error("Input is missing");if(n.length<2||n.length>3)throw new Error("Invaid input number.");if(n.length===3&&n[2].dims.length>2)throw new Error("Invalid input shape of C");if(n[0].dataType!==n[1].dataType||n.length===3&&n[0].dataType!==n[2].dataType)throw new Error("Input types are mismatched")},uC=(n,e)=>{let r=n[0].dims.slice(),t=n[1].dims.slice(),[o,i,a]=Pa.getShapeOfGemmResult(r,e.transA,t,e.transB,n.length===3?n[2].dims:void 0),s=[o,i];if(!s)throw new Error("Can't use gemm on the given tensors");let u=16,c=Math.ceil(i/u),d=Math.ceil(o/u),f=!0,h=D.size(s),b=[{type:12,data:f?c:h},{type:12,data:o},{type:12,data:i},{type:12,data:a},{type:1,data:e.alpha},{type:1,data:e.beta}],y=["type","type"];n.length===3&&(b.push(...q(n[2].dims)),y.push("rank")),b.push(...q(s));let v=x=>{let w="";e.transA&&e.transB?w="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":e.transA&&!e.transB?w="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!e.transA&&e.transB?w="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!e.transA&&!e.transB&&(w="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let I=e.alpha===1?"":"value *= uniforms.alpha;",A=N("a",n[0].dataType,n[0].dims),P=N("b",n[1].dataType,n[1].dims),C=A.type.value,R=null,z=[A,P];n.length===3&&(R=N("c",n[2].dataType,n[2].dims.length),z.push(R));let V=U("output",n[0].dataType,s.length);z.push(V);let X=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${x.registerUniforms(X).declareVariables(...z)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${C}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${w}
    }

    ${I}
    ${R!=null?`let cOffset = ${R.broadcastedIndicesToOffset("vec2(m, n)",V)}; value += ${C}(uniforms.beta) * ${R.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},T=x=>{let w=N("a",n[0].dataType,n[0].dims),I=N("b",n[1].dataType,n[1].dims),A=null,P=[w,I];n.length===3&&(A=N("c",n[2].dataType,n[2].dims.length),P.push(A));let C=U("output",n[0].dataType,s.length);P.push(C);let R=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],z="",V="";e.transA&&e.transB?(V=`
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
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,z="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):e.transA&&!e.transB?(V=`
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
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,z="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!e.transA&&e.transB?(V=`
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
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,z="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!e.transA&&!e.transB&&(V=`
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
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,z="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let X=e.alpha===1?"":"value *= uniforms.alpha;";return`
  ${x.registerUniforms(R).declareVariables(...P)}
  var<workgroup> tile_a: array<array<${w.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${I.type.storage}, ${u}>, ${u}>;
  ${x.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${C.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${V}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${z}
      }
      workgroupBarrier();
    }

    ${X}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${A!=null?`let cOffset = ${A.broadcastedIndicesToOffset("vec2(m, n)",C)}; value += ${C.type.value}(uniforms.beta) * ${A.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return f?{name:"GemmShared",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:s,dataType:n[0].dataType}],dispatchGroup:{x:c*d},programUniforms:b}),getShaderSource:T}:{name:"Gemm",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:s,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:b}),getShaderSource:v}},sx=n=>{let e=n.transA,r=n.transB,t=n.alpha,o=n.beta;return{transA:e,transB:r,alpha:t,beta:o,cacheKey:`${n.transA};${n.transB};${n.alpha===1}`}},ux=(n,e)=>{sC(n.inputs),n.compute(uC(n.inputs,e))}});var Yr,yn,ao,so,lC,cC,dC,pC,fC,hC,mC,gC,cx,dx,px=k(()=>{"use strict";ce();ge();Je();xe();[Yr,yn,ao,so]=[0,1,2,3],lC=n=>{if(n[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(n[0].dims.length!==n[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(n[0].dims.length-2!==n[1].dims[n[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${n[0].dims.length-2}`);if(n[0].dims[0]!==n[1].dims[0])throw new Error("grid batch size must match input batch size")},cC=`
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
`,dC=n=>`
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
`,pC=n=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${n.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,fC=n=>`
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
`,hC=(n,e,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${e} {
     var pixel = ${e}(0);
     var indices = vec4<u32>(0);
     indices[${Yr}] = batch;
     indices[${yn}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${ao}] = u32(r);
            indices[${so}] = u32(c);
          }
        `;case"border":return`
          indices[${ao}] = u32(clamp(r, 0, H - 1));
          indices[${so}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${ao}] = gs_reflect(r, border[1], border[3]);
          indices[${so}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${n.getByIndices("indices")};
  }
`,mC=(n,e,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Yr}], indices[${yn}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Yr}], indices[${yn}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Yr}], indices[${yn}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Yr}], indices[${yn}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Yr}], indices[${yn}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Yr}], indices[${yn}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${n.setByOffset("global_idx","result")}`,gC=(n,e)=>{let r=N("x",n[0].dataType,n[0].dims.length),t=[n[1].dims[0],n[1].dims[1],n[1].dims[2]],o=N("grid",n[1].dataType,t.length,2),i=[n[0].dims[0],n[0].dims[1],n[1].dims[1],n[1].dims[2]];e.format==="NHWC"&&(i=[n[0].dims[0],n[1].dims[1],n[1].dims[2],n[0].dims[3]],[Yr,yn,ao,so]=[0,3,1,2]);let a=U("output",n[0].dataType,i.length),s=r.type.value,u=D.size(i),c=[{type:12,data:u},...q(n[0].dims,t,i)],d=f=>`
  ${f.registerUniform("output_size","u32").declareVariables(r,o,a)}
  ${cC}
  ${dC(s)}
  ${pC(e)}
  ${fC(e)}
  ${hC(r,s,e)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${ao}]);
      let W_in = i32(uniforms.x_shape[${so}]);

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
      var grid_indices = vec3<u32>(indices[${Yr}], indices[${ao}], indices[${so}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${mC(a,s,e)}
  }`;return{name:"GridSample",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:["type","type"]},getRunData:f=>{let h=D.size(i);return{outputs:[{dims:i,dataType:f[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:c}},getShaderSource:d}},cx=(n,e)=>{lC(n.inputs),n.compute(gC(n.inputs,e))},dx=n=>de({alignCorners:n.align_corners,mode:n.mode,paddingMode:n.padding_mode,format:n.format})});var wt,_C,hx,fx,vC,Ho,mx,Cc=k(()=>{"use strict";ce();ge();Je();Oa();Na();xe();Jr();wt=(n,e)=>n.length>e&&n[e].dims.length>0?n[e]:void 0,_C=(n,e)=>{let r=n[0],t=wt(n,1),o=wt(n,2),i=wt(n,3),a=wt(n,4),s=wt(n,5),u=wt(n,6),c=wt(n,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let d=r.dims[0],f=r.dims[1],h=r.dims.length===3?r.dims[2]:e.numHeads*r.dims[4],b=f,y=0,v=0,T=Math.floor(h/e.numHeads);if(u&&c&&D.size(u.dims)&&D.size(c.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==d||u.dims[1]!==e.numHeads||u.dims[3]!==T)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(c.dims[0]!==d||c.dims[1]!==e.numHeads||c.dims[3]!==T)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==c.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(c.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=u.dims[2],v=u.dims[2]}else if(u&&D.size(u.dims)||c&&D.size(c.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let x;if(t&&D.size(t.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(t.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');x=2,b=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==T)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');x=5,b=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==T)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');x=0,b=t.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==e.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');x=3}if(i&&D.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(t&&t.dims.length===5&&t.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let w=y+b,I=0;if(a&&D.size(a.dims)>0){I=8;let R=a.dims;throw R.length===1?R[0]===d?I=1:R[0]===3*d+2&&(I=3):R.length===2&&R[0]===d&&R[1]===w&&(I=5),I===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let A=!1,P=h;if(o&&D.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(b!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');P=o.dims[2]}else{if(b!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');P=o.dims[1]*o.dims[3],A=!0}}let C=!1;if(a&&D.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(s&&D.size(s.dims)>0){if(s.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(s.dims[0]!==d||s.dims[1]!==e.numHeads||s.dims[2]!==f||s.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:f,pastSequenceLength:y,kvSequenceLength:b,totalSequenceLength:w,maxSequenceLength:v,inputHiddenSize:0,hiddenSize:h,vHiddenSize:P,headSize:T,vHeadSize:Math.floor(P/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:I,scale:e.scale,broadcastResPosBias:C,passPastInKv:A,qkvFormat:x}},hx=n=>de({...n}),fx=de({perm:[0,2,1,3]}),vC=(n,e,r,t,o,i,a)=>{let s=[t,o,i],u=D.size(s),c=[{type:12,data:u},{type:12,data:a},{type:12,data:i}],d=f=>{let h=U("qkv_with_bias",e.dataType,s),b=N("qkv",e.dataType,s),y=N("bias",r.dataType,s),v=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${f.registerUniforms(v).declareVariables(b,y,h)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return n.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:s,dataType:e.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c}),getShaderSource:d},{inputs:[e,r],outputs:[-1]})[0]},Ho=(n,e,r,t,o,i,a,s)=>{let u=i;if(a&&D.size(a.dims)>0){if(t===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=vC(n,i,a,e,t,r*o,s),u=u.reshape([e,t,r,o]),r===1||t===1?u:n.compute(ut(u,fx.perm),{inputs:[u],outputs:[-1]})[0]}else return i.dims.length===3&&(u=i.reshape([e,t,r,o])),r===1||t===1?u:n.compute(ut(u,fx.perm),{inputs:[u],outputs:[-1]})[0]},mx=(n,e)=>{let r=_C(n.inputs,e),t=n.inputs[0],o=wt(n.inputs,1),i=wt(n.inputs,2),a=wt(n.inputs,3),s=wt(n.inputs,4),u=wt(n.inputs,5),c=wt(n.inputs,6),d=wt(n.inputs,7);if(t.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let f=o&&i&&o.dims.length===4&&i.dims.length===4,h=Ho(n,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t,a,0);if(f)return io(n,h,o,i,s,void 0,c,d,u,r);if(!o||!i)throw new Error("key and value must be provided");let b=Ho(n,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,a,r.hiddenSize),y=Ho(n,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,a,2*r.hiddenSize);io(n,h,b,y,s,void 0,c,d,u,r)}});var xC,wC,TC,IC,Dc,gx,bx,kc=k(()=>{"use strict";ce();ge();Je();xe();xC=n=>{if(!n||n.length<1)throw new Error("too few inputs")},wC=(n,e)=>{let r=[],t=e.numOutputs;return n[1].dims[0]>0&&(n[1].getBigInt64Array().forEach(o=>r.push(Number(o))),t=r.length),de({numOutputs:t,axis:e.axis,splitSizes:r})},TC=n=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${n}u; i += 1u ) {
    if (index < ${Y("uniforms.size_in_split_axis","i",n)}) {
        return i;
    }
    }
    return ${n}u;
}`,IC=n=>{let e=n.length,r=[];for(let t=0;t<e;++t){let o=n[t].setByIndices("indices","input[global_idx]");e===1?r.push(o):t===0?r.push(`if (output_number == ${t}u) { ${o} }`):t===e-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${t}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${n[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Dc=(n,e)=>{let r=n[0].dims,t=D.size(r),o=n[0].dataType,i=D.normalizeAxis(e.axis,r.length),a=new Array(e.numOutputs),s=N("input",o,r.length),u=new Array(e.numOutputs),c=[],d=[],f=0,h=[{type:12,data:t}];for(let y=0;y<e.numOutputs;y++){f+=e.splitSizes[y],u[y]=f;let v=r.slice();v[i]=e.splitSizes[y],d.push(v),a[y]=U(`output${y}`,o,v.length),c.push({dims:d[y],dataType:n[0].dataType})}h.push({type:12,data:u},...q(r,...d));let b=y=>`
  ${y.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(s,...a)}
  ${TC(u.length)}
  ${IC(a)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${s.offsetToIndices("global_idx")};
    var index = ${s.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${Y("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${s.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:e.cacheKey,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:c,dispatchGroup:{x:Math.ceil(t/64)},programUniforms:h})}},gx=(n,e)=>{xC(n.inputs);let r=n.inputs.length===1?e:wC(n.inputs,e);n.compute(Dc(n.inputs,r),{inputs:[0]})},bx=n=>{let e=n.axis,r=n.splitSizes,t=n.numOutputs<0?r.length:n.numOutputs;if(t!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return de({axis:e,numOutputs:t,splitSizes:r})}});var SC,$C,yx,_x,vx=k(()=>{"use strict";Je();Na();Cc();kc();Jr();SC=(n,e)=>{if(e.doRotary)throw new Error("GroupQuerryAttention do_rotary attribute is not supported");if(e.doRotary&&n.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=n[0],t=n[1],o=n[2],i=n[3],a=n[4];if(e.localWindowSize!==-1)throw new Error("Local attention is not supported");if(e.softcap!==0)throw new Error("Softcap is not supported");if(e.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(e.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let s=!1,u=r.dims[0],c=r.dims[1],d=r.dims.length===3?s?r.dims[2]/3:r.dims[2]:e.numHeads*r.dims[4],f=c,h=0,b=!t||t.dims.length===0,y=Math.floor(b?d/(e.numHeads+2*e.kvNumHeads):d/e.numHeads);b&&(d=y*e.numHeads);let v=i&&i.dims.length!==0,T=a&&a.dims.length!==0;if(v&&i.dims.length===4&&i.dims[0]===u&&i.dims[1]!==e.kvNumHeads&&i.dims[2]===e.kvNumHeads&&i.dims[3]===y)throw new Error("BSNH pastKey/pastValue is not supported");if(v&&T){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');h=i.dims[2]}else if(v||T)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let w=1;if(t&&t.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(r.dims[2]%t.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');f=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==y)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');f=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==y)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');f=t.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==e.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');w=3}let I=0,A=!1,P=e.kvNumHeads?y*e.kvNumHeads:d;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(f!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');P=o.dims[2]}else{if(f!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');P=o.dims[1]*o.dims[3],A=!0}}let C=n.length>4?n[5]:void 0;if(C&&C.dims.length!==1&&C.dims[0]!==u)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:u,sequenceLength:c,pastSequenceLength:h,kvSequenceLength:f,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:d,vHiddenSize:P,headSize:y,vHeadSize:Math.floor(P/e.kvNumHeads),numHeads:e.numHeads,kvNumHeads:e.kvNumHeads,nReps:e.numHeads/e.kvNumHeads,pastPresentShareBuffer:!1,maskType:I,scale:e.scale,broadcastResPosBias:!1,passPastInKv:A,qkvFormat:w}},$C=de({perm:[0,2,1,3]}),yx=(n,e,r)=>{let t=e,o=r.kvNumHeads;return e.dims.length===3&&r.kvSequenceLength!==0&&(t=e.reshape([r.batchSize,r.kvSequenceLength,o,r.headSize]),t=n.compute(ut(t,$C.perm),{inputs:[t],outputs:[-1]})[0]),t},_x=(n,e)=>{let r=SC(n.inputs,e);if(n.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(n.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let t=n.inputs[0],o=n.inputs[1]&&n.inputs[1].dims.length>0?n.inputs[1]:void 0,i=n.inputs[2]&&n.inputs[2].dims.length>0?n.inputs[2]:void 0,a=n.inputs[3]&&n.inputs[3].dims.length!==0?n.inputs[3]:void 0,s=n.inputs[4]&&n.inputs[4].dims.length!==0?n.inputs[4]:void 0,u=n.inputs.length>4?n.inputs[5]:void 0,c=n.inputs.length>5?n.inputs[6]:void 0,d=r.kvNumHeads?r.kvNumHeads:r.numHeads,f=de({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,d*r.headSize,d*r.headSize]}),[h,b,y]=!o&&!i?n.compute(Dc([t],f),{inputs:[t],outputs:[-1,-1,-1]}):[t,o,i],v=Ho(n,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,h,void 0,0);io(n,v,yx(n,b,r),yx(n,y,r),void 0,void 0,a,s,void 0,r,u,c)}});var xx,AC,OC,wx,Tx=k(()=>{"use strict";ce();ge();Jr();xe();xx=(n,e,r,t,o,i,a,s)=>{let u=Ce(i),c=u===1?"f32":`vec${u}f`,d=u===1?"vec2f":`mat2x${u}f`,f=o*a,h=64;f===1&&(h=256);let b=[o,a,i/u],y=[o,a,2],v=["rank","type","type"],T=[];T.push(...q(b,y));let x=w=>{let I=N("x",e.dataType,3,u),A=N("scale",r.dataType,r.dims),P=N("bias",t.dataType,t.dims),C=U("output",1,3,2),R=[I,A,P,C];return`
  var<workgroup> workgroup_shared : array<${d}, ${h}>;
  const workgroup_size = ${h}u;
  ${w.declareVariables(...R)}
  ${w.mainStart(h)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${c}(0);
    var squared_sum = ${c}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${c}(${I.get("batch","channel","h")});
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
      let sum_final = ${Kt("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${Kt("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${s}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return n.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${s};${h}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:y,dataType:1}],dispatchGroup:{x:f},programUniforms:T}),getShaderSource:x},{inputs:[e,r,t],outputs:[-1]})[0]},AC=(n,e,r)=>{let t=e[0].dims,o=t,i=2,a=t[0],s=t[1],u=D.sizeFromDimension(t,i),c=Ce(u),d=D.size(o)/c,f=xx(n,e[0],e[1],e[2],a,u,s,r.epsilon),h=[a,s,u/c],b=[a,s],y=["type","none"],v=T=>{let x=N("x",e[0].dataType,h.length,c),w=N("scale_shift",1,b.length,2),I=U("output",e[0].dataType,h.length,c),A=[x,w,I];return`
  ${T.registerUniform("output_size","u32").declareVariables(...A)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${I.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${w.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${x.getByOffset("global_idx")} * ${I.type.value}(scale_shift.x) + ${I.type.value}(scale_shift.y);
      ${I.setByOffset("global_idx","value")};
  }`};n.compute({name:"InstanceNormalization",shaderCache:{hint:`${c}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:[{type:12,data:d},...q(h,b,h)]}),getShaderSource:v},{inputs:[e[0],f]})},OC=(n,e,r)=>{let t=e[0].dims,o=t,i=t[0],a=t[t.length-1],s=D.sizeFromDimension(t,1)/a,u=Ce(a),c=D.size(o)/u,d=[{type:12,data:s},{type:12,data:Math.floor(a/u)}],f=["type","type"],h=!1,b=[0,t.length-1];for(let x=0;x<t.length-2;x++)h=h||t[x+1]!==1,b.push(x+1);h=h&&t[t.length-1]!==1;let y=h?n.compute(ut(n.inputs[0],b),{inputs:[n.inputs[0]],outputs:[-1]})[0]:n.inputs[0].reshape(Array.from({length:t.length},(x,w)=>t[b[w]])),v=xx(n,y,e[1],e[2],i,s,a,r.epsilon),T=x=>{let w=Fe(e[0].dataType),I=u===1?"vec2f":`mat${u}x2f`,A=R=>{let z=R===0?"x":"y",V=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${w}(${V}(scale.${z}))`;case 2:return`vec2<${w}>(${V}(scale[0].${z}, scale[1].${z}))`;case 4:return`vec4<${w}>(${V}(scale[0].${z}, scale[1].${z}, scale[2].${z}, scale[3].${z}))`;default:throw new Error(`Not supported compoents ${u}`)}},P=N("input",e[0].dataType,e[0].dims,u),C=U("output",e[0].dataType,o,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${P.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${I}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${C.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${x.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${A(0)}, ${A(1)});
  }`};n.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:d}),getShaderSource:T},{inputs:[e[0],v]})},wx=(n,e)=>{e.format==="NHWC"?OC(n,n.inputs,e):AC(n,n.inputs,e)}});var PC,EC,Ix,Sx=k(()=>{"use strict";ce();ge();xe();PC=n=>{if(!n||n.length<2)throw new Error("layerNorm requires at least 2 inputs.")},EC=(n,e,r)=>{let t=e.simplified,o=n[0].dims,i=n[1],a=!t&&n[2],s=o,u=D.normalizeAxis(e.axis,o.length),c=D.sizeToDimension(o,u),d=D.sizeFromDimension(o,u),f=D.size(i.dims),h=a?D.size(a.dims):0;if(f!==d||a&&h!==d)throw new Error(`Size of X.shape()[axis:] == ${d}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${f} and bias size of ${h}`);let b=[];for(let P=0;P<o.length;++P)P<u?b.push(o[P]):b.push(1);let y=Ce(d),v=["type","type"],T=[{type:12,data:c},{type:1,data:d},{type:12,data:Math.floor(d/y)},{type:1,data:e.epsilon}];a&&v.push("type");let x=r>1,w=r>2,I=P=>{let C=Fe(n[0].dataType),R=[N("x",n[0].dataType,n[0].dims,y),N("scale",i.dataType,i.dims,y)];a&&R.push(N("bias",a.dataType,a.dims,y)),R.push(U("output",n[0].dataType,s,y)),x&&R.push(U("mean_data_output",1,b)),w&&R.push(U("inv_std_output",1,b));let z=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${P.registerUniforms(z).declareVariables(...R)}
  ${P.mainStart()}
    ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${gc("f32",y)};
    var mean_square_vector = ${gc("f32",y)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Bn(C,y,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Kt("mean_vector",y)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Kt("mean_square_vector",y)} / uniforms.norm_size ${t?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Bn(C,y,"x[j + offset]")};
      let f32scale = ${Bn(C,y,"scale[j]")};
      output[j + offset] = ${R[0].type.value}((f32input ${t?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${Bn(C,y,"bias[j]")}`:""}
      );
    }

    ${x?"mean_data_output[global_idx] = mean":""};
    ${w?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},A=[{dims:s,dataType:n[0].dataType}];return x&&A.push({dims:b,dataType:1}),w&&A.push({dims:b,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${y};${r};${t}`,inputDependencies:v},getRunData:()=>({outputs:A,dispatchGroup:{x:Math.ceil(c/64)},programUniforms:T}),getShaderSource:I}},Ix=(n,e)=>{PC(n.inputs),n.compute(EC(n.inputs,e,n.outputCount))}});var CC,$x,Ax=k(()=>{"use strict";ge();Fa();Va();CC=n=>{if(!n||n.length!==2)throw new Error("MatMul requires 2 inputs.");if(n[0].dims[n[0].dims.length-1]!==n[1].dims[n[1].dims.length-2])throw new Error("shared dimension does not match.")},$x=n=>{CC(n.inputs);let e=Fr.calcShape(n.inputs[0].dims,n.inputs[1].dims,!0);if(!e)throw new Error("Can't use matmul on the given tensors");let r=e[e.length-1],t=n.inputs[0].dims[n.inputs[0].dims.length-1];if(r<8&&t<8)n.compute(Ba(n.inputs,{activation:""},e));else{let o=e[e.length-2],i=D.size(n.inputs[0].dims.slice(0,-2)),a=D.size(n.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&a===1){let s=n.inputs[0].reshape([1,i,t]),u=n.inputs[1].reshape([1,t,r]),c=[1,i,r],d=[s,u];n.compute(Wo(d,{activation:""},e,c),{inputs:d})}else n.compute(Wo(n.inputs,{activation:""},e))}}});var DC,kC,NC,Ox,Px,Ex=k(()=>{"use strict";ce();ge();Je();xe();DC=(n,e)=>{if(n.length<3||n.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=n[0],t=r.dims.length;if(r.dims[t-1]!==e.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((e.k+e.blockSize-1)/e.blockSize),i=e.blockSize/8*e.bits,a=n[1];if(!D.areEqual(a.dims,[e.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=n[2].dims;if(D.size(u)!==e.n*o)throw new Error("scales input size error.");if(n.length===4){let d=n[3].dims,f=e.bits>4?e.n*o:e.n*Math.floor((o+1)/2);if(D.size(d)!==f)throw new Error("zeroPoints input size error.")}},kC=(n,e)=>{let r=n[0].dims,t=r.length,o=r[t-2],i=e.k,a=e.n,s=r.slice(0,t-2),u=D.size(s),d=n[1].dims[2]/4,f=n[0].dataType,h=Ce(e.k),b=Ce(d),y=Ce(a),v=s.concat([o,a]),T=o>1&&a/y%2===0?2:1,x=D.size(v)/y/T,w=64,I=[],A=[u,o,i/h],P=D.convertShape(n[1].dims).slice();P.splice(-1,1,d/b),I.push(...q(A)),I.push(...q(P)),I.push(...q(n[2].dims)),n.length===4&&I.push(...q(D.convertShape(n[3].dims)));let C=[u,o,a/y];I.push(...q(C));let R=z=>{let V=A.length,X=N("a",n[0].dataType,V,h),Q=N("b",12,P.length,b),pe=N("scales",n[2].dataType,n[2].dims.length),W=[X,Q,pe],ue=n.length===4?N("zero_points",12,n[3].dims.length):void 0;ue&&W.push(ue);let Ve=C.length,te=U("output",n[0].dataType,Ve,y),le=Fe(n[0].dataType),ve=(()=>{switch(h){case 1:return`array<${le}, 8>`;case 2:return`mat4x2<${le}>`;case 4:return`mat2x4<${le}>`;default:throw new Error(`${h}-component is not supported.`)}})(),ee=()=>{let je=`
          // reuse a data
            var input_offset = ${X.indicesToOffset(`${X.type.indices}(batch, row, word_offset)`)};
            var a_data: ${ve};
            for (var j: u32 = 0; j < ${8/h}; j++) {
              a_data[j] = ${X.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let M=0;M<y*T;M++)je+=`
            b_value = ${b===1?`b${M}_data`:`b${M}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${ve}(${Array.from({length:4},(F,re)=>`${le}(b_value_lower[${re}]), ${le}(b_value_upper[${re}])`).join(", ")});
            b_dequantized_values = ${h===1?`${ve}(${Array.from({length:8},(F,re)=>`(b_quantized_values[${re}] - ${ue?`zero_point${M}`:"zero_point"}) * scale${M}`).join(", ")});`:`(b_quantized_values - ${ve}(${Array(8).fill(`${ue?`zero_point${M}`:"zero_point"}`).join(",")})) * scale${M};`};
            workgroup_shared[local_id.x * ${T} + ${Math.floor(M/y)}]${y>1?`[${M%y}]`:""} += ${Array.from({length:8/h},(F,re)=>`${h===1?`a_data[${re}] * b_dequantized_values[${re}]`:`dot(a_data[${re}], b_dequantized_values[${re}])`}`).join(" + ")};
          `;return je},we=()=>{let je=`
            var col_index = col * ${y};
            ${ue?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${le}(8);`}
            `;for(let M=0;M<y*T;M++)je+=`
            let scale${M} = ${pe.getByOffset("col_index * nBlocksPerCol + block")};
            ${ue?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${ue.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${M} = ${le}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return je},nt=()=>{let je=`col_index = col * ${y};`;for(let M=0;M<y*T;M++)je+=`
            let b${M}_data = ${Q.getByIndices(`${Q.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return je+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ve};
            var b_dequantized_values: ${ve};`,je};return`
        var<workgroup> workgroup_shared: array<${te.type.value}, ${T*w}>;
        ${z.declareVariables(...W,te)}
        ${z.mainStart([w,1,1])}
          let output_indices = ${te.offsetToIndices(`(global_idx / ${w}) * ${T}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${w}) {
            //process one block
            var word_offset: u32 = block * ${e.blockSize/h};
            ${we()}
            for (var word: u32 = 0; word < ${d}; word += ${b}) {
              ${nt()}
              for (var i: u32 = 0; i < ${b}; i++) {
                ${ee()}
                word_offset += ${8/h};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${T}) {
            var output_value: ${te.type.value} = ${te.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${w}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${T};
            }
            ${te.setByIndices(`${te.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${e.blockSize};${e.bits};${h};${b};${y};${T};${w}`,inputDependencies:Array(n.length).fill("rank")},getRunData:()=>({outputs:[{dims:v,dataType:f}],dispatchGroup:{x},programUniforms:I}),getShaderSource:R}},NC=(n,e)=>{let r=n[0].dims,t=r.length,o=r[t-2],i=e.k,a=e.n,s=r.slice(0,t-2),u=D.size(s),d=n[1].dims[2]/4,f=n[0].dataType,h=Ce(e.k),b=Ce(d),y=s.concat([o,a]),v=128,T=a%8===0?8:a%4===0?4:1,x=v/T,w=x*b*8,I=w/h,A=w/e.blockSize,P=D.size(y)/T,C=[],R=[u,o,i/h],z=D.convertShape(n[1].dims).slice();z.splice(-1,1,d/b),C.push(...q(R)),C.push(...q(z)),C.push(...q(n[2].dims)),n.length===4&&C.push(...q(D.convertShape(n[3].dims)));let V=[u,o,a];C.push(...q(V));let X=Q=>{let pe=R.length,W=N("a",n[0].dataType,pe,h),ue=N("b",12,z.length,b),Ve=N("scales",n[2].dataType,n[2].dims.length),te=[W,ue,Ve],le=n.length===4?N("zero_points",12,n[3].dims.length):void 0;le&&te.push(le);let ve=V.length,ee=U("output",n[0].dataType,ve),we=Fe(n[0].dataType),nt=()=>{switch(h){case 1:return`
          let a_data0 = vec4<${we}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${we}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${we}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${we}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${h}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${W.type.value}, ${I}>;
        var<workgroup> inter_results: array<array<${ee.type.value}, ${x}>, ${T}>;
        ${Q.declareVariables(...te,ee)}
        ${Q.mainStart([x,T,1])}
          let output_indices = ${ee.offsetToIndices(`workgroup_index * ${T}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${A} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${I};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${I}; a_offset += ${v})
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
            let block = tile * ${A} + local_id.x;
            ${le?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${le.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${we}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${we}(8);`}
            let scale = ${Ve.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${ue.getByIndices(`${ue.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${e.blockSize/h};
            for (var i: u32 = 0; i < ${b}; i++) {
              ${nt()}
              let b_value = ${b===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${we}>(${Array.from({length:4},(je,M)=>`${we}(b_value_lower[${M}]), ${we}(b_value_upper[${M}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${we}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(je,M)=>`${`dot(a_data${M}, b_dequantized_values[${M}])`}`).join(" + ")};
              word_offset += ${8/h};
            }
            workgroupBarrier();
          }

          if (local_idx < ${T}) {
            var output_value: ${ee.type.value} = ${ee.type.value}(0);
            for (var b = 0u; b < ${x}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ee.setByIndices(`${ee.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${e.blockSize};${h};${b};${x};${T}`,inputDependencies:Array(n.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:f}],dispatchGroup:{x:P},programUniforms:C}),getShaderSource:X}},Ox=(n,e)=>{DC(n.inputs,e),e.blockSize===32&&n.adapterInfo.isVendor("intel")&&n.adapterInfo.isArchitecture("gen-12lp")?n.compute(NC(n.inputs,e)):n.compute(kC(n.inputs,e))},Px=n=>de(n)});var LC,RC,zC,MC,BC,FC,VC,GC,Cx,Dx=k(()=>{"use strict";ce();ge();xe();LC=n=>{if(!n||n.length<1)throw new Error("Too few inputs");if(n[0].dataType!==1&&n[0].dataType!==10)throw new Error("Input type must be float or float16.");if(n.length>=2){let e=n[0].dims.length*2===n[1].dims[0];if(n.length===4&&(e=n[3].dims[0]*2===n[1].dims[0]),!e)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},RC=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
            k = i32(${n.indicesGet("indices",o)}) - ${Y("uniforms.pads",o,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${Y("uniforms.x_shape",o,e)})) {
              break;
            }
            offset += k * i32(${Y("uniforms.x_strides",o,e)});
        `;return`
          value = ${n.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${t}
            value = x[offset];
          }
      `},zC=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${n.indicesGet("indices",o)}) - ${Y("uniforms.pads",o,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${Y("uniforms.x_shape",o,e)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${Y("uniforms.x_shape",o,e)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${Y("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},MC=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${n.indicesGet("indices",o)}) - ${Y("uniforms.pads",o,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${Y("uniforms.x_shape",o,e)})) {
                  k = i32(${Y("uniforms.x_shape",o,e)}) - 1;
                }
                offset += k * i32(${Y("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},BC=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${n.indicesGet("indices",o)}) - ${Y("uniforms.pads",o,r)};
                if (k < 0)  {
                  k += i32(${Y("uniforms.x_shape",o,e)}]);
                }
                if (k >= i32(${Y("uniforms.x_shape",o,e)})) {
                  k -= i32(${Y("uniforms.x_shape",o,e)});
                }
                offset += k * i32(${Y("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},FC=(n,e,r)=>{switch(r.mode){case 0:return RC(n,e,r.pads.length);case 1:return zC(n,e,r.pads.length);case 2:return MC(n,e,r.pads.length);case 3:return BC(n,e,r.pads.length);default:throw new Error("Invalid mode")}},VC=(n,e)=>{let r=D.padShape(n[0].dims.slice(),e.pads),t=n[0].dims,o=D.size(r),i=[{type:12,data:o},{type:6,data:e.pads}],a=n.length>=3&&n[2].data;e.mode===0&&i.push({type:a?n[2].dataType:1,data:e.value}),i.push(...q(n[0].dims,r));let s=["rank"],u=c=>{let d=U("output",n[0].dataType,r.length),f=N("x",n[0].dataType,t.length),h=f.type.value,b=FC(d,t.length,e),y=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:e.pads.length}];return e.mode===0&&y.push({name:"constant_value",type:a?h:"f32"}),`
            ${c.registerUniforms(y).declareVariables(f,d)}
            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${d.offsetToIndices("global_idx")};

            var value = ${h}(0);
            ${b}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${e.mode}${a}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(D.size(r)/64)},programUniforms:i}),getShaderSource:u}},GC=(n,e)=>{if(n.length>1){let r=n[1].getBigInt64Array(),t=n.length>=3&&n[2].data?n[2].dataType===10?n[2].getUint16Array()[0]:n[2].getFloat32Array()[0]:0,o=n[0].dims.length,i=new Int32Array(2*o).fill(0);if(n.length>=4){let s=n[3].getBigInt64Array();for(let u=0;u<s.length;u++)i[Number(s[u])]=Number(r[u]),i[Number(s[u])+o]=Number(r[u+s.length])}else r.forEach((s,u)=>i[Number(u)]=Number(s));let a=[];return i.forEach(s=>a.push(s)),{mode:e.mode,value:t,pads:a}}else return e},Cx=(n,e)=>{LC(n.inputs);let r=GC(n.inputs,e);n.compute(VC(n.inputs,r),{inputs:[0]})}});var Wa,kx,Nx,Lx,Rx,UC,WC,zx,Mx,Bx,Fx,Vx,Gx,Ux,Wx,Hx,qx,jx,Kx,Xx=k(()=>{"use strict";ft();ce();ge();xe();Wa=n=>{if(me.webgpu.validateInputContent&&(!n||n.length!==1))throw new Error("Pool ops requires 1 input.")},kx=(n,e,r)=>{let t=e.format==="NHWC",o=n.dims.slice();t&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(e,"dilations"),a=e.kernelShape.slice(),s=e.strides.slice(),u=i?e.dilations.slice():[],c=e.pads.slice();zn.adjustPoolAttributes(r,o,a,s,u,c);let d=zn.computePoolOutputShape(r,o,s,u,a,c,e.autoPad),f=Object.assign({},e);i?Object.assign(f,{kernelShape:a,strides:s,pads:c,dilations:u,cacheKey:e.cacheKey}):Object.assign(f,{kernelShape:a,strides:s,pads:c,cacheKey:e.cacheKey});let h=d.slice();return h.push(h.splice(1,1)[0]),[f,t?h:d]},Nx=(n,e)=>{let r=e.format==="NHWC",t=D.size(n),o=D.size(e.kernelShape),i=[{type:12,data:t},{type:12,data:o}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(e.kernelShape.length<=2){let s=e.kernelShape[e.kernelShape.length-1],u=e.strides[e.strides.length-1],c=e.pads[e.pads.length/2-1],d=e.pads[e.pads.length-1],f=!!(c+d);i.push({type:12,data:s},{type:12,data:u},{type:12,data:c},{type:12,data:d}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let h=!1;if(e.kernelShape.length===2){let b=e.kernelShape[e.kernelShape.length-2],y=e.strides[e.strides.length-2],v=e.pads[e.pads.length/2-2],T=e.pads[e.pads.length-2];h=!!(v+T),i.push({type:12,data:b},{type:12,data:y},{type:12,data:v},{type:12,data:T}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,f,h]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let s=D.computeStrides(e.kernelShape);i.push({type:12,data:s},{type:12,data:e.pads},{type:12,data:e.strides}),a.push({name:"kernelStrides",type:"u32",length:s.length},{name:"pads",type:"u32",length:e.pads.length},{name:"strides",type:"u32",length:e.strides.length});let u=e.pads.reduce((c,d)=>c+d);return[i,a,!!u,!1,!1]}},Lx=(n,e,r,t,o,i,a,s,u,c,d,f)=>{let h=o.format==="NHWC",b=e.type.value,y=U("output",e.type.tensor,t);if(o.kernelShape.length<=2){let v="",T="",x="",w=r-(h?2:1);if(d?v=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${w}] < 0 || xIndices[${w}]
                      >= uniforms.x_shape[${w}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`:v=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let A=r-(h?3:2);f?T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${A}] = indices[${A}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${A}] < 0 || xIndices[${A}] >= uniforms.x_shape[${A}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${A}] = indices[${A}] * uniforms.sh - uniforms.phStart + j;
                `,x=`
              }
            `}return`
            ${n.registerUniforms(u).declareVariables(e,y)}

            ${n.mainStart()}
              ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var value = ${b}(${s});
              var pad = 0;
              ${T}
              ${v}
              ${x}
              ${a}

              output[global_idx] = value;
            }`}else{if(h)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let v=o.kernelShape.length,T=o.pads.length,x="";return c?x=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${e.indicesToOffset("xIndices")}];
                ${i}
              }`:x=`
              }
              let x_val = x[${e.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${n.registerUniforms(u).declareVariables(e,y)}

            ${n.mainStart()}
              ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var offsets: array<u32, ${v}>;

              var value = ${b}(${s});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${v-1}u; j++) {
                  offsets[j] = offset / ${Y("uniforms.kernelStrides","j",v)};
                  offset -= offsets[j] * ${Y("uniforms.kernelStrides","j",v)};
                }
                offsets[${v-1}] = offset;

                isPad = false;
                for (var j = ${r-v}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${Y("uniforms.strides",`j - ${r-v}u`,v)}
                    + offsets[j - ${r-v}u] - ${Y("uniforms.pads","j - 2u",T)};
                  ${x}
              }
              ${a}

              output[global_idx] = value;
            }`}},Rx=n=>`${n.format};${n.ceilMode};${n.autoPad};${n.kernelShape.length}`,UC=n=>`${Rx(n)};${n.countIncludePad}`,WC=n=>`${Rx(n)};${n.storageOrder};${n.dilations}`,zx=n=>({format:n.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][n.auto_pad],ceilMode:n.ceil_mode,kernelShape:n.kernel_shape,strides:n.strides,pads:n.pads}),Mx=(n,e,r,t)=>{let[o,i]=kx(e,t,r),a=N("x",e.dataType,e.dims.length),s=a.type.value,u="value += x_val;",c="";o.countIncludePad?c+=`value /= ${s}(uniforms.kernelSize);`:c+=`value /= ${s}(i32(uniforms.kernelSize) - pad);`;let[d,f,h,b,y]=Nx(i,o);d.push(...q(e.dims,i));let v=["rank"];return{name:n,shaderCache:{hint:`${t.cacheKey};${h};${b};${y}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(D.size(i)/64)},programUniforms:d}),getShaderSource:T=>Lx(T,a,e.dims.length,i.length,o,u,c,0,f,h,b,y)}},Bx=n=>{let e=n.count_include_pad!==0,r=zx(n);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let t={countIncludePad:e,...r,cacheKey:""};return{...t,cacheKey:UC(t)}},Fx=(n,e)=>{Wa(n.inputs),n.compute(Mx("AveragePool",n.inputs[0],!1,e))},Vx={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Gx=n=>{let e=n.format;return{format:e,...Vx,cacheKey:e}},Ux=(n,e)=>{Wa(n.inputs),n.compute(Mx("GlobalAveragePool",n.inputs[0],!0,e))},Wx=(n,e,r,t)=>{let[o,i]=kx(e,t,r),a=`
      value = max(x_val, value);
    `,s="",u=N("x",e.dataType,e.dims.length),c=["rank"],[d,f,h,b,y]=Nx(i,o);return d.push(...q(e.dims,i)),{name:n,shaderCache:{hint:`${t.cacheKey};${h};${b};${y}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(D.size(i)/64)},programUniforms:d}),getShaderSource:v=>Lx(v,u,e.dims.length,i.length,o,a,s,e.dataType===10?-65504:-1e5,f,h,b,y)}},Hx=(n,e)=>{Wa(n.inputs),n.compute(Wx("MaxPool",n.inputs[0],!1,e))},qx=n=>{let e=n.storage_order,r=n.dilations,t=zx(n);if(e!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(t.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:e,dilations:r,...t,cacheKey:""};return{...o,cacheKey:WC(o)}},jx=n=>{let e=n.format;return{format:e,...Vx,cacheKey:e}},Kx=(n,e)=>{Wa(n.inputs),n.compute(Wx("GlobalMaxPool",n.inputs[0],!0,e))}});var qC,jC,Zx,Jx,Yx=k(()=>{"use strict";ce();ge();Je();xe();qC=(n,e)=>{if(n.length<2||n.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(n.length===3&&n[1].dims===n[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(n.length===3&&n[0].dataType!==n[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(n[0].dataType===6&&n.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(n[1].dims.length!==0&&n[1].dims.length!==1&&n[1].dims.length!==n[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(n.length>2){if(n[0].dataType!==n[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(n[1].dims.length!==n[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!n[1].dims.map((r,t)=>r===n[2].dims[t]).reduce((r,t)=>r&&t,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(e.blockSize>0){if(n[1].dims.length===0||n[1].dims.length===1&&n[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!n[1].dims.map((o,i)=>i===e.axis||o===n[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(n[1].dims.length!==n[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=n[0].dims[e.axis],t=n[1].dims[e.axis];if(e.blockSize<Math.ceil(r/t)||e.blockSize>Math.ceil(r/(t-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},jC=(n,e)=>{let r=D.normalizeAxis(e.axis,n[0].dims.length),t=n[0].dataType,o=t===3,i=n[0].dims,a=n[1].dataType,s=D.size(i),u=t===3||t===2,c=u?[Math.ceil(D.size(n[0].dims)/4)]:n[0].dims,d=n[1].dims,f=n.length>2?n[2]:void 0,h=f?u?[Math.ceil(D.size(f.dims)/4)]:f.dims:void 0,b=d.length===0||d.length===1&&d[0]===1,y=b===!1&&d.length===1,v=Ce(s),T=b&&(!u||v===4),x=T?v:1,w=T&&!u?v:1,I=N("input",u?12:t,c.length,w),A=N("scale",a,d.length),P=f?N("zero_point",u?12:t,h.length):void 0,C=U("output",a,i.length,x),R=[I,A];P&&R.push(P);let z=[c,d];f&&z.push(h);let V=[{type:12,data:s/x},{type:12,data:r},{type:12,data:e.blockSize},...q(...z,i)],X=Q=>{let pe=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${Q.registerUniforms(pe).declareVariables(...R,C)}
      ${Q.mainStart()}
          ${Q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${C.offsetToIndices("global_idx")};

          // Set input x
          ${u?`
            let input = ${I.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${x===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${I.getByOffset("global_idx")};`};

          // Set scale input
          ${b?`let scale_value= ${A.getByOffset("0")}`:y?`
            let scale_index = ${C.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${A.getByOffset("scale_index")};`:`
            var scale_indices: ${A.type.indices} = output_indices;
            let index = ${A.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${A.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${A.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${P?b?u?`
                let zero_point_input = ${P.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${P.getByOffset("0")}`:y?u?`
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
      }`};return{name:"DequantizeLinear",shaderCache:{hint:e.cacheKey,inputDependencies:P?["rank","rank","rank"]:["rank","rank"]},getShaderSource:X,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(s/x/64),y:1,z:1},programUniforms:V})}},Zx=(n,e)=>{qC(n.inputs,e),n.compute(jC(n.inputs,e))},Jx=n=>de({axis:n.axis,blockSize:n.blockSize})});var KC,XC,Qx,ew=k(()=>{"use strict";ft();ce();xe();KC=(n,e,r)=>{let t=n===e,o=n<e&&r<0,i=n>e&&r>0;if(t||o||i)throw new Error("Range these inputs' contents are invalid.")},XC=(n,e,r,t)=>{let o=Math.abs(Math.ceil((e-n)/r)),i=[o],a=o,s=[{type:12,data:a},{type:t,data:n},{type:t,data:r},...q(i)],u=c=>{let d=U("output",t,i.length),f=d.type.value,h=[{name:"outputSize",type:"u32"},{name:"start",type:f},{name:"delta",type:f}];return`
        ${c.registerUniforms(h).declareVariables(d)}
        ${c.mainStart()}
        ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${f}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${t}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:s})}},Qx=n=>{let e=0,r=0,t=0;n.inputs[0].dataType===6?(e=n.inputs[0].getInt32Array()[0],r=n.inputs[1].getInt32Array()[0],t=n.inputs[2].getInt32Array()[0]):n.inputs[0].dataType===1&&(e=n.inputs[0].getFloat32Array()[0],r=n.inputs[1].getFloat32Array()[0],t=n.inputs[2].getFloat32Array()[0]),me.webgpu.validateInputContent&&KC(e,r,t),n.compute(XC(e,r,t,n.inputs[0].dataType),{inputs:[]})}});var ZC,JC,tw,rw,nw=k(()=>{"use strict";ce();ge();Je();xe();ZC=(n,e,r,t)=>{if(n!=="none"&&t!=="i32"&&t!=="u32"&&t!=="f32")throw new Error(`Input ${t} is not supported with reduction ${n}.`);let o=`{
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
                ${o}max(bitcast<f32>(oldValue), (${r}))${i}`;case"min":return t==="i32"||t==="u32"?`atomicMin(&${e}, bitcast<${t}>(${r}));`:`${o}min(bitcast<${t}>(oldValue), (${r}))${i}`;case"mul":return`${o}(bitcast<${t}>(oldValue) * (${r}))${i}`;default:throw new Error(`Reduction ${n} is not supported.`)}},JC=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r,i=1,a=Math.ceil(D.size(t)/i),s=t[t.length-1],u=D.sizeFromDimension(r,s),c=[{type:12,data:a},{type:12,data:s},{type:12,data:u},...q(n[1].dims,n[2].dims,o)],d=f=>{let h=N("indices",n[1].dataType,n[1].dims.length),b=N("updates",n[2].dataType,n[2].dims.length,i),y=e.reduction!=="none"&&e.reduction!==""?E_("output",n[0].dataType,o.length):U("output",n[0].dataType,o.length,i);return`
      ${f.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(h,b,y)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${e.reduction==="none"}) {
    let n = ${D.size(t)};
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
    ${n[0].dims.length===1?`
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
    ${ZC(e.reduction,"output[data_offset + i]","value",y.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${e.cacheKey}_${e.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}),getShaderSource:d}},tw=n=>de({reduction:n.reduction}),rw=(n,e)=>{n.compute(JC(n.inputs,e),{inputs:[n.inputs[1],n.inputs[2]],outputs:[]})}});var YC,QC,eD,ow,tD,rD,nD,oD,iD,aD,sD,uD,iw,lD,cD,dD,pD,fD,aw,sw,uw=k(()=>{"use strict";ce();ge();Je();xe();YC=(n,e)=>{if(n.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),n.length>0){if(e.mode==="linear"){if(!(n.length===2||n.length===3||n.length===4&&n[0]===1&&n[1]===1||n.length===4&&n[0]===1&&n[3]===1||n.length===5&&n[0]===1&&n[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(e.mode==="cubic"&&!(n.length===2||n.length===4&&n[0]===1&&n[1]===1||n.length===4&&n[0]===1&&n[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},QC=(n,e,r)=>{e.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let t=new Array(r).fill(1);return e.forEach((o,i)=>t[o]=n[i]),t},eD=(n,e,r,t,o,i)=>{let[a,s,u]=r>10?[1,2,3]:[-1,n.length>1?1:-1,-1],c=n[0].dims.length;if(a>0&&n.length>a&&n[a].dims.length>0)n[a].getFloat32Array().forEach(d=>i.push(d));else if(e.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(s>0&&n.length>s&&n[s].dims.length===1&&n[s].dims[0]>0){if(n[s].getFloat32Array().forEach(d=>t.push(d)),t.length!==0&&t.length!==c&&r>=18&&t.length!==e.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");YC(t,e),e.axes.length>0&&QC(t,e.axes,c).forEach((d,f)=>t[f]=d)}if(u>0&&n.length>u&&n[u].dims.length===1&&n[u].dims[0]>0&&(n[u].getBigInt64Array().forEach(d=>o.push(Number(d))),o.length!==0&&o.length!==c&&r>=18&&o.length!==e.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(e.axes.length>0){if(t.length!==0&&t.length!==e.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==e.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof t<"u"&&typeof o<"u"&&t.length>0&&o.length>c)throw new Error("Resize requires only of scales or sizes to be specified")},ow=(n,e,r,t)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${n}) * (${e});
  let whole = ${t}(big / (${r}));
  let fract = ${t}(big % (${r})) / ${t}(${r});
  return whole + fract;
`,tD=(n,e)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${e} { `+(()=>{switch(n){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${e}(xResized) / ${e}(xScale);
          } else {
            ${ow("xResized","lengthOriginal","lengthResized",e)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${e}(xResized) + 0.5) / ${e}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${e}(xResized) + 0.5) / ${e}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${ow("xResized","lengthOriginal - 1","lengthResized - 1",e)}
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
                  return offset + ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;case"half_pixel":return`return ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${n} is not supported`)}})()+"}",rD=(n,e,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(n){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(e<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${n} is not supported`)}})()+"}",nD=(n,e,r)=>{let t=new Array(r).fill(0).concat(new Array(r).fill(1)),o=n.length===0?t:n.slice();return e.length>0?(e.forEach((i,a)=>{t[i]=o[a],t[a+r]=o[e.length+a]}),t):o},oD=(n,e,r,t)=>{let o=[];if(r.length>0)if(t.length>0){if(n.forEach(i=>o.push(i)),Math.max(...t)>n.length)throw new Error("axes is out of bound");t.forEach((i,a)=>o[i]=r[a])}else r.forEach(i=>o.push(i));else{if(e.length===0)throw new Error("Resize requires either scales or sizes.");o=n.map((i,a)=>Math.round(i*e[a]))}return o},iD=(n,e,r)=>{let t=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>e[i]),Number.MAX_VALUE):Math.min(...e,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>e[i]),Number.MIN_VALUE):Math.max(...e,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();e.fill(1,0,e.length);let o=n.slice();return r.axes.length>0?(r.axes.forEach(i=>e[i]=t),r.axes.forEach(i=>o[i]=Math.round(n[i]*e[i]))):(e.fill(t,0,e.length),o.forEach((i,a)=>o[a]=Math.round(i*e[a]))),o},aD=(n,e,r,t,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${n.type.indices}) -> array<${n.type.value}, ${r.length}> {
      var original_indices: array<${n.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${n.indicesGet("output_indices","i")};
        var scale = ${Y("uniforms.scales","i",t)};
        var roi_low = ${Y("uniforms.roi","i",o)};
        var roi_hi = ${Y("uniforms.roi",`i + ${e.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${n.type.value}(output_index);
        } else {
          var input_shape_i = ${Y("uniforms.input_shape","i",e.length)};
          var output_shape_i = ${Y("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,sD=(n,e,r,t,o,i,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> ${n.type.indices} {
      var input_indices: ${n.type.indices};
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${Y("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${Y("uniforms.roi","i",i)};
          var roi_hi = ${Y("uniforms.roi",`i + ${r.length}`,i)};
          var input_shape_i = ${Y("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${Y("uniforms.output_shape","i",t.length)};
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
    }`,uD=(n,e)=>`
    fn checkInputIndices(input_indices: ${n.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${e.length}; i++) {
        var input_index = ${n.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${Y("uniforms.input_shape","i",e.length)}) {
          return false;
        }
      }
      return true;
    }`,iw=(n,e,r,t)=>n.rank>t?`
    ${n.indicesSet("input_indices",e,"channel")};
    ${n.indicesSet("input_indices",r,"batch")};
`:"",lD=(n,e,r,t,o)=>{let[a,s,u,c]=r.length===2?[-1,0,1,-1]:[0,2,3,1],d=n.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${n.type.indices};
      ${n.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${n.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${iw(n,c,a,2)}
      return ${n.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${e.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${s}];
      var col:${d} = originalIndices[${u}];
      ${t?`if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${c}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${a}])`:"0"};
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
    }`},cD=(n,e,r,t,o,i,a,s,u,c)=>{let d=r.length===2,f=!0,[h,b]=d?[0,1]:f?[2,3]:[1,2],y=n.type.value,v=T=>{let x=T===h?"row":"col";return`
      fn ${x}CubicInterpolation(input_indices: ${n.type.indices}, output_indices: ${e.type.indices}) -> ${y} {
        var output_index = ${e.indicesGet("output_indices",T)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[T]},
        ${t[T]}, ${r[T]}, ${i[T]}, ${i[T]} + ${r.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${s} && (originalIdx < 0 || originalIdx > (${r[T]} - 1))) {
          return ${u};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${x}: ${y} = originalIdx + ${y}(i);
          if (${x} < 0 || ${x} >= ${r[T]}) {
            ${c?`coefs[i + 1] = 0.0;
                        continue;`:s?`return ${u};`:`${x} = max(0, min(${x}, ${r[T]} - 1));`};
          }
        var input_indices_copy: ${n.type.indices} = input_indices;
          ${n.indicesSet("input_indices_copy",T,`u32(${x})`)};
          data[i + 1] = ${T===h?n.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${v(h)};
    ${v(b)};
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

  fn bicubicInterpolation(output_indices: ${e.type.indices}) -> ${y} {
    var input_indices: ${n.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},dD=(n,e,r,t,o)=>{let[a,s,u,c,d]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],f=n.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${f} {
      var input_indices: ${n.type.indices};
      ${n.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${n.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${n.indicesSet("input_indices",c,`max(0, min(width, ${r[c]} - 1))`)};
      ${iw(n,d,a,3)}
      return ${n.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${e.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${f} = originalIndices[${s}];
      var height:${f} = originalIndices[${u}];
      var width:${f} = originalIndices[${c}];
      ${t?`if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[c]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[c]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${a}])`:"0"};

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
    }`},pD=(n,e,r,t,o,i)=>{let a=n.dims,s=nD(i,e.axes,a.length),u=oD(a,t,o,e.axes),c=t.slice();t.length===0&&(c=a.map((w,I)=>w===0?1:u[I]/w),e.keepAspectRatioPolicy!=="stretch"&&(u=iD(a,c,e)));let d=U("output",n.dataType,u.length),f=N("input",n.dataType,a.length),h=D.size(u),b=a.length===u.length&&a.every((w,I)=>w===u[I]),y=e.coordinateTransformMode==="tf_crop_and_resize",v=e.extrapolationValue,T=f.type.value,x=w=>`
      ${b?"":`
      ${tD(e.coordinateTransformMode,T)};
      ${(()=>{switch(e.mode){case"nearest":return`
              ${uD(f,a)};
              ${rD(e.nearestMode,r,T)};
              ${sD(f,d,a,u,c.length,s.length,y)};
              `;case"linear":return`
              ${aD(d,a,u,c.length,s.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${lD(f,d,a,y,v)}`;if(a.length===3||a.length===5)return`${dD(f,d,a,y,v)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${cD(f,d,a,u,c,s,e.cubicCoeffA,y,e.extrapolationValue,e.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${w.registerUniform("output_size","u32").registerUniform("scales","f32",c.length).registerUniform("roi","f32",s.length).declareVariables(f,d)}
      ${w.mainStart()}
        ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${b?"output[global_idx] = input[global_idx];":`
        let output_indices = ${d.offsetToIndices("global_idx")};
        var input_indices: ${f.type.indices};
        ${(()=>{switch(e.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${f.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${e.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${e.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${e.cacheKey}|${r}|${c.length>0?e.mode==="cubic"?c:c.length:""}|${o.length>0?o:""}|${s.length>0?s:""}|${b}|${e.mode==="nearest"?a.length:a}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[{dims:u,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},{type:1,data:c},{type:1,data:s},...q(a,u)]})}},fD=n=>{let e=n.customDataBuffer;return new Uint32Array(e,e.byteOffset,1)[0]},aw=(n,e)=>{let r=[],t=[],o=[],i=fD(n);if(e.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");eD(n.inputs,e,i,r,t,o),n.compute(pD(n.inputs[0],e,i,r,t,o),{inputs:[0]})},sw=n=>{let e=n.antialias,r=n.axes,t=n.coordinateTransformMode,o=n.cubicCoeffA,i=n.excludeOutside!==0,a=n.extrapolationValue,s=n.keepAspectRatioPolicy,u=n.mode,c=n.nearestMode===""?"simple":n.nearestMode;return de({antialias:e,axes:r,coordinateTransformMode:t,cubicCoeffA:o,excludeOutside:i,extrapolationValue:a,keepAspectRatioPolicy:s,mode:u,nearestMode:c})}});var hD,mD,lw,cw=k(()=>{"use strict";ce();ge();Je();xe();hD=(n,e)=>{let[r,t,o,i]=n,{numHeads:a,rotaryEmbeddingDim:s}=e;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!D.areEqual(t.dims,[])&&!D.areEqual(t.dims,[1])&&t.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${t.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!D.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(s>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=r.dims[0],c=r.dims[r.dims.length-2],d=o.dims[0],f=D.sizeFromDimension(r.dims,1)/c,h=s===0?o.dims[1]*2:f/a;if(s>h)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(t.dims.length===2){if(u!==t.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${t.dims[0]}`);if(c!==t.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${t.dims[1]}`)}if(h/2!==o.dims[1]&&s/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(c>d)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},mD=(n,e)=>{let{interleaved:r,numHeads:t,rotaryEmbeddingDim:o,scale:i}=e,a=n[0].dims[0],s=D.sizeFromDimension(n[0].dims,1),u=n[0].dims[n[0].dims.length-2],c=s/u,d=n[2].dims[1],f=o===0?d*2:c/t,h=new Array(a,u,c/f,f-d),b=D.computeStrides(h),y=[{type:1,data:i},{type:12,data:h},{type:12,data:b},...n[0].dims.length===3?new Array({type:12,data:[s,c,f,1]}):[],...n[0].dims.length===4?new Array({type:12,data:[s,f,u*f,1]}):[],...q(n[0].dims,n[1].dims,n[2].dims,n[3].dims,n[0].dims)],v=T=>{let x=N("input",n[0].dataType,n[0].dims.length),w=N("position_ids",n[1].dataType,n[1].dims.length),I=N("cos_cache",n[2].dataType,n[2].dims.length),A=N("sin_cache",n[3].dataType,n[3].dims.length),P=U("output",n[0].dataType,n[0].dims.length);return T.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:b.length},{name:"input_output_strides",type:"u32",length:b.length}]),`
        ${T.declareVariables(x,w,I,A,P)}

        ${T.mainStart(Mn)}
          let half_rotary_emb_dim = uniforms.${I.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${w.broadcastedIndicesToOffset("bsnh.xy",U("",w.type.tensor,2))};
            let position_id =
                u32(${w.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${x.getByOffset("i")} * ${I.get("position_id","bsnh[3]")} -
                ${x.getByOffset("j")} * ${A.get("position_id","bsnh[3]")};
            ${P.setByOffset("i","re")}
            let im = ${x.getByOffset("i")} * ${A.get("position_id","bsnh[3]")} +
                ${x.getByOffset("j")} * ${I.get("position_id","bsnh[3]")};
            ${P.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${P.setByOffset("k",x.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:de({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:n[0].dims,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(D.size(h)/Mn)},programUniforms:y})}},lw=(n,e)=>{hD(n.inputs,e),n.compute(mD(n.inputs,e))}});var gD,bD,dw,pw=k(()=>{"use strict";ce();ge();xe();gD=n=>{if(!n||n.length<3)throw new Error("layerNorm requires at least 3 inputs.");let e=n[0],r=n[1],t=n[2];if(e.dataType!==r.dataType||e.dataType!==t.dataType)throw new Error("All inputs must have the same data type");if(e.dims.length!==3&&e.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=e.dims[e.dims.length-1],i=e.dims[e.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(t.dims.length!==1)throw new Error("Gamma must be 1D");if(t.dims[t.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(n.length>3){let a=n[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(n.length>4){let a=n[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},bD=(n,e,r,t)=>{let o=e.simplified,i=n[0].dims,a=D.size(i),s=i,u=a,c=i.slice(-1)[0],d=t?i.slice(0,-1).concat(1):[],f=!o&&n.length>3,h=n.length>4,b=t&&r>1,y=t&&r>2,v=r>3,T=64,x=Ce(c),w=[{type:12,data:u},{type:12,data:x},{type:12,data:c},{type:1,data:e.epsilon}],I=P=>{let C=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],R=[N("x",n[0].dataType,n[0].dims,x),N("skip",n[1].dataType,n[1].dims,x),N("gamma",n[2].dataType,n[2].dims,x)];f&&R.push(N("beta",n[3].dataType,n[3].dims,x)),h&&R.push(N("bias",n[4].dataType,n[4].dims,x)),R.push(U("output",n[0].dataType,s,x)),b&&R.push(U("mean_output",1,d)),y&&R.push(U("inv_std_output",1,d)),v&&R.push(U("input_skip_bias_sum",n[0].dataType,s,x));let z=Fe(n[0].dataType),V=Fe(1,x);return`

      ${P.registerUniforms(C).declareVariables(...R)}
      var<workgroup> sum_shared : array<${V}, ${T}>;
      var<workgroup> sum_squared_shared : array<${V}, ${T}>;

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
          let bias_value = ${h?"bias[offset1d + i]":z+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${v?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Bn(z,x,"value")};
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
        let mean = ${Kt("sum",x)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Kt("square_sum",x)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${b?"mean_output[global_idx] = mean;":""}
        ${y?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${z}(mean)`}) *
            ${z}(inv_std_dev) * gamma[offset1d + i]
            ${f?"+ beta[offset1d + i]":""};
        }
      }`},A=[{dims:s,dataType:n[0].dataType}];return r>1&&A.push({dims:d,dataType:1}),r>2&&A.push({dims:d,dataType:1}),r>3&&A.push({dims:i,dataType:n[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${x};${b};${y};${v}`,inputDependencies:n.map((P,C)=>"type")},getShaderSource:I,getRunData:()=>({outputs:A,dispatchGroup:{x:Math.ceil(u/c)},programUniforms:w})}},dw=(n,e)=>{gD(n.inputs);let t=[0];n.outputCount>1&&t.push(-3),n.outputCount>2&&t.push(-3),n.outputCount>3&&t.push(3),n.compute(bD(n.inputs,e,n.outputCount,!1),{outputs:t})}});var yD,Ha,_D,fw,vD,xD,hw,mw,gw=k(()=>{"use strict";ce();ge();Je();xe();yD=(n,e)=>{if(!n||n.length<1)throw new Error("too few inputs");if(e.axes.length!==0){if(e.axes.length!==e.starts.length||e.axes.length!==e.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(e.starts.length!==e.ends.length)throw new Error("starts and ends must have the same length");n.slice(1).forEach((r,t)=>{if(n[t+1].dataType!==6&&n[t+1].dataType!==7)throw new Error(`Input ${t} must be an array of int32 or int64`)})},Ha=(n,e)=>{let r=[];if(n.length>e)if(n[e].dataType===7)n[e].getBigInt64Array().forEach(t=>r.push(Number(t)));else if(n[e].dataType===6)n[e].getInt32Array().forEach(t=>r.push(Number(t)));else throw new Error(`Input ${e} must be an array of int32 or int64`);return r},_D=(n,e)=>{if(n.length>1){let r=Ha(n,1),t=Ha(n,2),o=Ha(n,3);return o.length===0&&(o=[...Array(n[0].dims.length).keys()]),de({starts:r,ends:t,axes:o})}else return e},fw=(n,e,r,t,o)=>{let i=n;return n<0&&(i+=r[t[e]]),o[e]<0?Math.max(0,Math.min(i,r[t[e]]-1)):Math.max(0,Math.min(i,r[t[e]]))},vD=(n,e,r)=>`fn calculateInputIndices(output_indices: ${e.type.indices}) -> ${n.type.indices} {
          var input_indices: ${n.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${Y("uniforms.input_shape","i",r.length)};
            let steps_i = ${Y("uniforms.steps","i",r.length)};
            let signs_i = ${Y("uniforms.signs","i",r.length)};
            let starts_i = ${Y("uniforms.starts","i",r.length)};
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
      }`,xD=(n,e)=>{let r=n[0].dims,t=D.size(r),o=e.axes.length>0?D.normalizeAxes(e.axes,r.length):[...Array(r.length).keys()],i=Ha(n,4);i.forEach(x=>x!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let a=e.starts.map((x,w)=>fw(x,w,r,o,i)),s=e.ends.map((x,w)=>fw(x,w,r,o,i));if(o.length!==a.length||o.length!==s.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let x=0;x<r.length;++x)o.includes(x)||(a.splice(x,0,0),s.splice(x,0,r[x]),i.splice(x,0,1));let u=i.map(x=>Math.sign(x));i.forEach((x,w,I)=>{if(x<0){let A=(s[w]-a[w])/x,P=a[w],C=P+A*i[w];a[w]=C,s[w]=P,I[w]=-x}});let c=r.slice(0);o.forEach((x,w)=>{c[x]=Math.ceil((s[x]-a[x])/i[x])});let d={dims:c,dataType:n[0].dataType},f=U("output",n[0].dataType,c.length),h=N("input",n[0].dataType,n[0].dims.length),b=D.size(c),y=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:i.length}],v=[{type:12,data:b},{type:12,data:a},{type:6,data:u},{type:12,data:i},...q(n[0].dims,c)],T=x=>`
      ${x.registerUniforms(y).declareVariables(h,f)}
        ${vD(h,f,r)}
        ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${f.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${f.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${a.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:T,getRunData:()=>({outputs:[d],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:v})}},hw=(n,e)=>{yD(n.inputs,e);let r=_D(n.inputs,e);n.compute(xD(n.inputs,r),{inputs:[0]})},mw=n=>{let e=n.starts,r=n.ends,t=n.axes;return de({starts:e,ends:r,axes:t})}});var wD,TD,bw,yw,_w=k(()=>{"use strict";ce();ge();Je();Jr();xe();wD=n=>{if(!n||n.length!==1)throw new Error("Softmax op requires 1 input.")},TD=(n,e)=>{let r=n.inputs[0],t=r.dims,o=D.size(t),i=t.length,a=D.normalizeAxis(e.axis,i),s=a<t.length-1,u,c=[];s?(c=Array.from({length:i},(R,z)=>z),c[a]=i-1,c[i-1]=a,u=n.compute(ut(r,c),{inputs:[r],outputs:[-1]})[0]):u=r;let d=u.dims,f=d[i-1],h=o/f,b=Ce(f),y=f/b,v=64;h===1&&(v=256);let T=(R,z)=>z===4?`max(max(${R}.x, ${R}.y), max(${R}.z, ${R}.w))`:z===2?`max(${R}.x, ${R}.y)`:z===3?`max(max(${R}.x, ${R}.y), ${R}.z)`:R,x=N("x",u.dataType,u.dims,b),w=U("result",u.dataType,u.dims,b),I=x.type.value,A=Fe(u.dataType)==="f32"?`var threadMax = ${I}(-3.402823e+38f);`:`var threadMax = ${I}(-65504.0h);`,P=R=>`
      var<workgroup> rowMaxShared : ${I};
      var<workgroup> rowSumShared : ${I};
      var<workgroup> threadShared : array<${I}, ${v}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${I} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${I}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${R.registerUniform("packedCols","i32").declareVariables(x,w)}
      ${R.mainStart(v)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${v};
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
          rowMaxShared = ${I}(${T("threadShared[0]",b)});
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
          rowSumShared = ${I}(${Kt("threadShared[0]",b)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,C=n.compute({name:"Softmax",shaderCache:{hint:`${b};${v}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:d,dataType:u.dataType}],dispatchGroup:{x:h},programUniforms:[{type:6,data:y}]}),getShaderSource:P},{inputs:[u],outputs:[s?-1:0]})[0];s&&n.compute(ut(C,c),{inputs:[C]})},bw=(n,e)=>{wD(n.inputs),TD(n,e)},yw=n=>de({axis:n.axis})});var vw,ID,SD,$D,xw,ww=k(()=>{"use strict";ce();ge();xe();vw=n=>Array.from(n.getBigInt64Array(),Number),ID=n=>{if(!n||n.length!==2)throw new Error("Tile requires 2 inputs.");if(n[0].dataType!==1&&n[0].dataType!==10&&n[0].dataType!==6&&n[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(n[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(n[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(vw(n[1]).length!==n[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},SD=(n,e)=>{let r=[];for(let t=0;t<n.length;++t)r.push(n[t]*e[t]);return r},$D=(n,e)=>{let r=n[0].dims,t=e??vw(n[1]),o=SD(r,t),i=D.size(o),a=n[0].dataType,s=N("input",a,r.length),u=U("output",a,o.length),c=d=>`
      const inputShape = ${s.indices(...r)};
      ${d.registerUniform("output_size","u32").declareVariables(s,u)}
      ${d.mainStart()}
      ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${s.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${s.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${s.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",s.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...q(n[0].dims,o)]}),getShaderSource:c}},xw=n=>{ID(n.inputs),n.compute($D(n.inputs),{inputs:[0]})}});var AD,OD,Tw,Iw=k(()=>{"use strict";ce();ge();xe();AD=(n,e,r,t,o)=>{let i=U("output_data",o,r.length,4),a=N("a_data",e[1].dataType,e[1].dims.length,4),s=N("b_data",e[2].dataType,e[2].dims.length,4),u=N("c_data",e[0].dataType,e[0].dims.length,4),c,d=(f,h,b)=>`select(${h}, ${f}, ${b})`;if(!t)c=i.setByOffset("global_idx",d(a.getByOffset("global_idx"),s.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let f=(h,b,y="")=>{let v=`a_data[index_a${b}][component_a${b}]`,T=`b_data[index_b${b}][component_b${b}]`,x=`bool(c_data[index_c${b}] & (0xffu << (component_c${b} * 8)))`;return`
            let output_indices${b} = ${i.offsetToIndices(`global_idx * 4u + ${b}u`)};
            let offset_a${b} = ${a.broadcastedIndicesToOffset(`output_indices${b}`,i)};
            let offset_b${b} = ${s.broadcastedIndicesToOffset(`output_indices${b}`,i)};
            let offset_c${b} = ${u.broadcastedIndicesToOffset(`output_indices${b}`,i)};
            let index_a${b} = offset_a${b} / 4u;
            let index_b${b} = offset_b${b} / 4u;
            let index_c${b} = offset_c${b} / 4u;
            let component_a${b} = offset_a${b} % 4u;
            let component_b${b} = offset_b${b} % 4u;
            let component_c${b} = offset_c${b} % 4u;
            ${h}[${b}] = ${y}(${d(v,T,x)});
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
        ${n.registerUniform("vec_size","u32").declareVariables(u,a,s,i)}
        ${n.mainStart()}
        ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${c}
      }`},OD=n=>{let e=n[1].dims,r=n[2].dims,t=n[0].dims,o=n[1].dataType,i=!(D.areEqual(e,r)&&D.areEqual(r,t)),a=e,s=D.size(e);if(i){let c=Fr.calcShape(Fr.calcShape(e,r,!1),t,!1);if(!c)throw new Error("Can't perform where op on the given tensors");a=c,s=D.size(a)}let u=Math.ceil(s/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:c=>AD(c,n,a,i,o),getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/64/4)},programUniforms:[{type:12,data:u},...q(t,e,r,a)]})}},Tw=n=>{n.compute(OD(n.inputs))}});var Sw,$w=k(()=>{"use strict";i0();Na();u0();c0();X0();av();lv();Sv();Dv();Lv();Mv();Uv();qv();Kv();Jv();ex();nx();ax();lx();px();vx();Tx();Sx();Ax();Ex();Cc();Dx();Xx();Yx();ew();nw();Da();uw();cw();pw();gw();_w();kc();ww();Jr();Ra();Iw();Sw=new Map([["Abs",[d0]],["Acos",[p0]],["Acosh",[f0]],["Add",[Z0]],["ArgMax",[o0,yc]],["ArgMin",[n0,yc]],["Asin",[h0]],["Asinh",[m0]],["Atan",[g0]],["Atanh",[b0]],["Attention",[a0]],["AveragePool",[Fx,Bx]],["BatchNormalization",[s0]],["BiasAdd",[l0]],["BiasSplitGelu",[K0]],["Cast",[_0,y0]],["Ceil",[x0]],["Clip",[v0]],["Concat",[sv,uv]],["Conv",[Ac,$c]],["ConvTranspose",[Cv,Pv]],["Cos",[w0]],["Cosh",[T0]],["CumSum",[kv,Nv]],["DepthToSpace",[Rv,zv]],["DequantizeLinear",[Zx,Jx]],["Div",[J0]],["Einsum",[Vv,Gv]],["Elu",[I0,Go]],["Equal",[Y0]],["Erf",[S0]],["Exp",[$0]],["Expand",[Hv]],["FastGelu",[jv]],["Floor",[A0]],["FusedConv",[Ac,$c]],["Gather",[Zv,Xv]],["GatherElements",[ix,ox]],["GatherBlockQuantized",[tx,rx]],["GatherND",[Yv,Qv]],["Gelu",[O0]],["Gemm",[ux,sx]],["GlobalAveragePool",[Ux,Gx]],["GlobalMaxPool",[Kx,jx]],["Greater",[rv]],["GreaterOrEqual",[ov]],["GridSample",[cx,dx]],["GroupQueryAttention",[_x]],["HardSigmoid",[R0,L0]],["InstanceNormalization",[wx]],["LayerNormalization",[Ix]],["LeakyRelu",[P0,Go]],["Less",[nv]],["LessOrEqual",[iv]],["Log",[H0]],["MatMul",[$x]],["MatMulNBits",[Ox,Px]],["MaxPool",[Hx,qx]],["Mul",[Q0]],["MultiHeadAttention",[mx,hx]],["Neg",[C0]],["Not",[E0]],["Pad",[Cx]],["Pow",[ev]],["QuickGelu",[q0,Go]],["Range",[Qx]],["Reciprocal",[D0]],["ReduceMin",[J_]],["ReduceMean",[q_]],["ReduceMax",[Z_]],["ReduceSum",[Q_]],["ReduceProd",[Y_]],["ReduceL1",[j_]],["ReduceL2",[K_]],["ReduceLogSum",[t0]],["ReduceLogSumExp",[X_]],["ReduceSumSquare",[e0]],["Relu",[k0]],["Resize",[aw,sw]],["RotaryEmbedding",[lw]],["ScatterND",[rw,tw]],["Sigmoid",[N0]],["Sin",[z0]],["Sinh",[M0]],["Slice",[hw,mw]],["SkipLayerNormalization",[dw]],["Split",[gx,bx]],["Sqrt",[B0]],["Softmax",[bw,yw]],["Sub",[tv]],["Tan",[F0]],["Tanh",[G0]],["ThresholdedRelu",[W0,Go]],["Tile",[xw]],["Transpose",[k_,N_]],["Where",[Tw]]])});var qa,Aw=k(()=>{"use strict";ft();Br();xe();qa=class{constructor(e){this.backend=e;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,r){this.repo.set(e,r)}run(e,r,t,o,i){$t(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let d of r)u.push({binding:u.length,resource:{buffer:d.buffer}});for(let d of t)u.push({binding:u.length,resource:{buffer:d.buffer}});i&&u.push({binding:u.length,resource:i});let c=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let d={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:c,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d)}s.setPipeline(e.computePipeline),s.setBindGroup(0,c),s.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),bt(e.programInfo.name)}dispose(){}build(e,r){$t(e.name);let t=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"},{feature:"subgroups-f16",extension:"subgroups_f16"}].forEach(f=>{t.features.has(f.feature)&&o.push(`enable ${f.extension};`)});let a=C_(r,this.backend.device.limits),s=e.getShaderSource(a),u=`${o.join(`
`)}
${a.additionalImplementations}
${s}`,c=t.createShaderModule({code:u,label:e.name});Ie("verbose",()=>`[WebGPU] ${e.name} shader code: ${u}`);let d=t.createComputePipeline({compute:{module:c,entryPoint:"main"},layout:"auto",label:e.name});return bt(e.name),{programInfo:e,computePipeline:d,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let r=typeof e=="number"?e:e.x,t=typeof e=="number"?1:e.y||1,o=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=i&&t<=i&&o<=i)return[r,t,o];let a=r*t*o,s=Math.ceil(Math.sqrt(a));if(s>i){if(s=Math.ceil(Math.cbrt(a)),s>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}});var PD,ED,Nc,Lc,ja,Ow=k(()=>{"use strict";ft();ce();Br();sc();A_();$w();Aw();PD=(n,e)=>{if(e.length!==n.length)throw new Error(`inputDependencies length ${e.length} is not equal to inputTensors length ${n.length}.`);let r=[];for(let t=0;t<n.length;++t){let o=n[t].dataType;switch(e[t]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let i=n[t].dims.length;r.push(`${o};${i}`);break}case"dims":{let i=n[t].dims.join(",");r.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${e[t]}`)}}return r.join("|")},ED=(n,e,r)=>{let t=n.name;return n.shaderCache?.hint&&(t+="["+n.shaderCache.hint+"]"),t+=":"+r+`:${PD(e,n.shaderCache?.inputDependencies??new Array(e.length).fill("dims"))}`,t},Nc=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Lc=class{constructor(e){this.subgroupsSupported=e.features.has("subgroups"),this.subgroupsF16Supported=e.features.has("subgroups");let r=e.limits;!this.subgroupsSupported||!r.minSubgroupSize||!r.maxSubgroupSize?this.subgroupSizeRange=void 0:this.subgroupSizeRange=[r.minSubgroupSize,r.maxSubgroupSize]}},ja=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,r){this.env=e;let t=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:t},i=a=>r.features.has(a)&&t.push(a)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups")&&i("subgroups-f16"),this.device=await r.requestDevice(o),this.deviceInfo=new Lc(this.device),this.adapterInfo=new Nc(r.info||await r.requestAdapterInfo()),this.gpuDataManager=$_(this),this.programManager=new qa(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,$a(e.logLevel,!!e.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;$t(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(e.getMappedRange()),t=this.pendingQueries.get(e);for(let o=0;o<r.length/2;o++){let i=t[o],a=i.kernelId,s=this.kernels.get(a),u=s.kernelType,c=s.kernelName,d=i.programName,f=i.inputTensorViews,h=i.outputTensorViews,b=r[o*2],y=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=b);let v=Number(b-this.queryTimeBase),T=Number(y-this.queryTimeBase);if(!Number.isSafeInteger(v)||!Number.isSafeInteger(T))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:f.map(x=>({dims:x.dims,dataType:mn(x.dataType)})),outputsMetadata:h.map(x=>({dims:x.dims,dataType:mn(x.dataType)})),kernelId:a,kernelType:u,kernelName:c,programName:d,startTime:v,endTime:T});else{let x="";f.forEach((I,A)=>{x+=`input[${A}]: [${I.dims}] | ${mn(I.dataType)}, `});let w="";h.forEach((I,A)=>{w+=`output[${A}]: [${I.dims}] | ${mn(I.dataType)}, `}),console.log(`[profiling] kernel "${a}|${u}|${c}|${d}" ${x}${w}execution time: ${T-v} ns`)}ui("GPU",`${d}::${b}::${y}`)}e.unmap(),this.pendingQueries.delete(e)}),bt()}run(e,r,t,o,i,a){$t(e.name);let s=[];for(let I=0;I<r.length;++I){let A=r[I].data;if(A===0)continue;let P=this.gpuDataManager.get(A);if(!P)throw new Error(`no GPU data for input: ${A}`);s.push(P)}let{outputs:u,dispatchGroup:c,programUniforms:d}=e.getRunData(r),f=t.length===0?u.map((I,A)=>A):t;if(f.length!==u.length)throw new Error(`Output size ${f.length} must be equal to ${u.length}.`);let h=[],b=[];for(let I=0;I<u.length;++I){if(!Number.isInteger(f[I])||f[I]<-3||f[I]>=a)throw new Error(`Invalid output index: ${f[I]}`);if(f[I]===-3)continue;let A=f[I]===-1,P=f[I]===-2,C=A||P?i(u[I].dataType,u[I].dims):o(f[I],u[I].dataType,u[I].dims);if(h.push(C),C.data===0)continue;let R=this.gpuDataManager.get(C.data);if(!R)throw new Error(`no GPU data for output: ${C.data}`);if(A&&this.temporaryData.push(R),P){let z=this.kernelPersistentData.get(this.currentKernelId);z||(z=[],this.kernelPersistentData.set(this.currentKernelId,z)),z.push(R)}b.push(R)}if(s.length!==r.length||b.length!==h.length){if(b.length===0)return bt(e.name),h;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let y;if(d){let I=0,A=[];d.forEach(z=>{let V=typeof z.data=="number"?[z.data]:z.data;if(V.length===0)return;let X=z.type===10?2:4,Q,pe;z.type===10?(pe=V.length>4?16:V.length>2?8:V.length*X,Q=V.length>4?16:X*V.length):(pe=V.length<=2?V.length*X:16,Q=16),I=Math.ceil(I/pe)*pe,A.push(I);let W=z.type===10?8:4;I+=V.length>4?Math.ceil(V.length/W)*Q:V.length*X});let P=16;I=Math.ceil(I/P)*P;let C=new ArrayBuffer(I);d.forEach((z,V)=>{let X=A[V],Q=typeof z.data=="number"?[z.data]:z.data;if(z.type===6)new Int32Array(C,X,Q.length).set(Q);else if(z.type===12)new Uint32Array(C,X,Q.length).set(Q);else if(z.type===10)new Uint16Array(C,X,Q.length).set(Q);else if(z.type===1)new Float32Array(C,X,Q.length).set(Q);else throw new Error(`Unsupported uniform type: ${mn(z.type)}`)});let R=this.gpuDataManager.create(I,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(R.buffer,0,C,0,I),this.gpuDataManager.release(R.id),y={offset:0,size:I,buffer:R.buffer}}let v=this.programManager.normalizeDispatchGroupSize(c),T=v[1]===1&&v[2]===1,x=ED(e,r,T),w=this.programManager.getArtifact(x);if(w||(w=this.programManager.build(e,v),this.programManager.setArtifact(x,w),Ie("info",()=>`[artifact] key: ${x}, programName: ${e.name}`)),d&&w.uniformVariablesInfo){if(d.length!==w.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${w.uniformVariablesInfo.length}, got ${d.length} in program "${w.programInfo.name}".`);for(let I=0;I<d.length;I++){let A=d[I],P=A.type,C=typeof A.data=="number"?1:A.data.length,[R,z]=w.uniformVariablesInfo[I];if(P!==R||C!==z)throw new Error(`Uniform variable ${I} mismatch: expect type ${R} with size ${z}, got type ${P} with size ${C} in program "${w.programInfo.name}".`)}}if(Ie("info",()=>`[ProgramManager] run "${e.name}" (key=${x}) with ${v[0]}x${v[1]}x${v[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let I={kernelId:this.currentKernelId,programName:w.programInfo.name,inputTensorViews:r,outputTensorViews:h};this.pendingKernels.push(I),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(I)}return this.programManager.run(w,s,b,v,y),bt(e.name),h}upload(e,r){this.gpuDataManager.upload(e,r)}memcpy(e,r){this.gpuDataManager.memcpy(e,r)}async download(e,r){await this.gpuDataManager.download(e,r)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,r,t,o){let i=Sw.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:o,kernelEntry:i[0],attributes:[i[1],t]};this.kernels.set(r,a)}releaseKernel(e){let r=this.kernelPersistentData.get(e);if(r){for(let t of r)this.gpuDataManager.release(t.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,r,t){let o=this.kernels.get(e);if(!o)throw new Error(`kernel not created: ${e}`);let i=o.kernelType,a=o.kernelName,s=o.kernelEntry,u=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),Ie("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let c=this.env.debug;this.temporaryData=[];try{return c&&this.device.pushErrorScope("validation"),s(r,u[1]),0}catch(d){return t.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${d}`)),1}finally{c&&t.push(this.device.popErrorScope().then(d=>d?`GPU validation error for kernel "[${i}] ${a}": ${d.message}`:null));for(let d of this.temporaryData)this.gpuDataManager.release(d.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,r,t,o){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let a=i.get(r),s=this.gpuDataManager.registerExternalBuffer(t,o,a);return i.set(r,[s,t]),s}unregisterBuffers(e){let r=this.sessionExternalDataMapping.get(e);r&&(r.forEach(t=>this.gpuDataManager.unregisterExternalBuffer(t[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let r=this.gpuDataManager.get(e);if(!r)throw new Error(`no GPU data for buffer: ${e}`);return r.buffer}createDownloader(e,r,t){return async()=>{let o=await dc(this,e,r);return Aa(o.buffer,t)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){Ie("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){Ie("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){Ie("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),t=e.length;this.pendingKernels=[];for(let o=0;o<t;o++){let i=this.getComputePassEncoder(),a=e[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}});var CD,Pw,DD,Ew,Ka,Xa,Rc,Cw,Dw=k(()=>{"use strict";Br();CD=1,Pw=()=>CD++,DD=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Ew=(n,e)=>{let r=DD.get(n);if(!r)throw new Error("Unsupported data type.");return e.length>0?Math.ceil(e.reduce((t,o)=>t*o)*r/8):0},Ka=class{constructor(e){this.sessionId=e.sessionId,this.mlContext=e.context,this.mlTensor=e.tensor,this.dataType=e.dataType,this.tensorShape=e.shape}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return Ew(this.dataType,this.tensorShape)}destroy(){Ie("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,r,t){return this.mlContext===e&&this.dataType===r&&this.tensorShape.length===t.length&&this.tensorShape.every((o,i)=>o===t[i])}},Xa=class{constructor(e,r){this.tensorManager=e;this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,r,t,o){let i=this.tensorManager.getMLContext(e);if(this.wrapper){if(this.wrapper.canReuseTensor(i,r,t))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==Ew(r,t))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let a=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,r,t,a,!0,!0),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){if(this.wrapper)if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(e);return}else Ie("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(e):this.activeUpload=new Uint8Array(e)}async download(e){if(this.activeUpload)if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(this.activeUpload):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(this.activeUpload);return}else return this.activeUpload.buffer;if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Rc=class{constructor(e){this.backend=e;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}getMLContext(e){let r=this.backend.getMLContext(e);if(!r)throw new Error("MLContext not found for session.");return r}reserveTensorId(){let e=Pw();return this.tensorTrackersById.set(e,new Xa(this)),e}releaseTensorId(e){let r=this.tensorTrackersById.get(e);r&&(this.tensorTrackersById.delete(e),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(e,r,t,o,i){Ie("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${r}, dataType: ${t}, shape: ${o}, copyOld: ${i}}`);let a=this.tensorTrackersById.get(r);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,t,o,i)}upload(e,r){let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");t.upload(r)}async download(e,r){Ie("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${r?.byteLength}}`);let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");return t.download(r)}releaseTensorsForSession(e){for(let r of this.freeTensors)r.sessionId===e&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==e)}registerTensor(e,r,t,o){let i=this.getMLContext(e),a=Pw(),s=new Ka({sessionId:e,context:i,tensor:r,dataType:t,shape:o});return this.tensorTrackersById.set(a,new Xa(this,s)),this.externalTensors.add(s),a}async getCachedTensor(e,r,t,o,i,a){let s=this.getMLContext(e);for(let[c,d]of this.freeTensors.entries())if(d.canReuseTensor(s,r,t)){Ie("verbose",()=>`[WebNN] Reusing tensor {dataType: ${r}, shape: ${t}}`);let f=this.freeTensors.splice(c,1)[0];return f.sessionId=e,f}Ie("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${r}, shape: ${t}}`);let u=await s.createTensor({dataType:r,shape:t,dimensions:t,usage:o,writable:i,readable:a});return new Ka({sessionId:e,context:s,tensor:u,dataType:r,shape:t})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Cw=(...n)=>new Rc(...n)});var zc,kD,Za,kw=k(()=>{"use strict";ce();hn();sc();Dw();Br();zc=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),kD=(n,e)=>{if(n===e)return!0;if(n===void 0||e===void 0)return!1;let r=Object.keys(n).sort(),t=Object.keys(e).sort();return r.length===t.length&&r.every((o,i)=>o===t[i]&&n[o]===e[o])},Za=class{constructor(e){this.tensorManager=Cw(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];this.sessionGraphInputs=new Map;this.temporaryGraphInputs=[];this.temporarySessionTensorIds=new Map;$a(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){Ie("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){Ie("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let r=this.temporarySessionTensorIds.get(e);if(r){for(let t of r)Ie("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(o=>o.gpuDevice===e);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:o}),o}}else if(e===void 0){let t=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let r=this.mlContextCache.findIndex(t=>kD(t.options,e));if(r!==-1)return this.mlContextCache[r].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}registerMLContext(e,r){this.mlContextBySessionId.set(e,r);let t=this.sessionIdsByMLContext.get(r);t||(t=new Set,this.sessionIdsByMLContext.set(r,t)),t.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e);let r=this.mlContextBySessionId.get(e);if(!r)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let t=this.sessionIdsByMLContext.get(r);if(t.delete(e),t.size===0){this.sessionIdsByMLContext.delete(r);let o=this.mlContextCache.findIndex(i=>i.mlContext===r);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){Ie("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,r,t,o,i){let a=zc.get(t);if(!a)throw new Error(`Unsupported ONNX data type: ${t}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,r,a,o,i)}async createTemporaryTensor(e,r,t){Ie("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${r}, shape: ${t}}`);let o=zc.get(r);if(!o)throw new Error(`Unsupported ONNX data type: ${r}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,o,t,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,r){if(!Ye().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");Ie("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${r.byteLength}}`),this.tensorManager.upload(e,r)}async downloadTensor(e,r){return this.tensorManager.download(e,r)}createMLTensorDownloader(e,r){return async()=>{let t=await this.tensorManager.download(e);return Aa(t,r)}}registerMLTensor(e,r,t,o){let i=zc.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.registerTensor(e,r,i,o);return Ie("verbose",()=>`[WebNN] registerMLTensor {tensor: ${r}, dataType: ${i}, dimensions: ${o}} -> {tensorId: ${a}}`),a}registerMLConstant(e,r,t,o,i,a){if(!a)throw new Error("External mounted files are not available.");let s=e;e.startsWith("./")&&(s=e.substring(2));let u=a.get(s);if(!u)throw new Error(`File with name ${s} not found in preloaded files.`);if(r+t>u.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let c=u.slice(r,r+t).buffer,d;switch(i.dataType){case"float32":d=new Float32Array(c);break;case"float16":d=new Uint16Array(c);break;case"int32":d=new Int32Array(c);break;case"uint32":d=new Uint32Array(c);break;case"int64":d=new BigInt64Array(c);break;case"uint64":d=new BigUint64Array(c);break;case"int8":d=new Int8Array(c);break;case"int4":case"uint4":case"uint8":d=new Uint8Array(c);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return Ie("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}}`),o.constant(i,d)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}isGraphInput(e,r){let t=this.sessionGraphInputs.get(e);return t?t.includes(r):!1}flush(){}}});var Nw={};Hn(Nw,{init:()=>ND});var qo,Mc,ND,Lw=k(()=>{"use strict";ce();Ow();Br();ge();kw();qo=class n{constructor(e,r,t,o){this.module=e;this.dataType=r;this.data=t;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let e=D.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let e=D.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let e=D.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let e=D.size(this.dims);return e===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(e){if(D.size(e)!==D.size(this.dims))throw new Error("Invalid new shape");return new n(this.module,this.dataType,this.data,e)}},Mc=class{constructor(e,r,t){this.module=e;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo,this.deviceInfo=r.deviceInfo;let o=e.PTR_SIZE,i=t/e.PTR_SIZE,a=o===4?"i32":"i64";this.opKernelContext=Number(e.getValue(o*i++,a));let s=Number(e.getValue(o*i++,a));this.outputCount=Number(e.getValue(o*i++,a)),this.customDataOffset=Number(e.getValue(o*i++,"*")),this.customDataSize=Number(e.getValue(o*i++,a));let u=[];for(let c=0;c<s;c++){let d=Number(e.getValue(o*i++,a)),f=Number(e.getValue(o*i++,"*")),h=Number(e.getValue(o*i++,a)),b=[];for(let y=0;y<h;y++)b.push(Number(e.getValue(o*i++,a)));u.push(new qo(e,d,f,b))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,r){let t=r?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,o=r?.outputs??[],i=(s,u,c)=>new qo(this.module,u,this.output(s,c),c),a=(s,u)=>{let c=gn(s,u);if(!c)throw new Error(`Unsupported data type: ${s}`);let d=c>0?this.backend.gpuDataManager.create(c).id:0;return new qo(this.module,s,d,u)};return this.backend.run(e,t,o,i,a,this.outputCount)}output(e,r){let t=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",a=this.module.stackAlloc((1+r.length)*o);this.module.setValue(a,r.length,i);for(let s=0;s<r.length;s++)this.module.setValue(a+o*(s+1),r[s],i);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(o){throw new Error(`Failed to generate kernel's output[${e}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(t)}}},ND=async(n,e,r,t)=>{let o=e.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(n==="webgpu"){let i=new ja;await i.initialize(r,t),o("webgpu",[i,a=>i.alloc(Number(a)),a=>i.free(a),(a,s,u,c=!1)=>{if(c)Ie("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(a)}, dst=${Number(s)}, size=${Number(u)}`),i.memcpy(Number(a),Number(s));else{Ie("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(a)}, gpuDataId=${Number(s)}, size=${Number(u)}`);let d=e.HEAPU8.subarray(Number(a>>>0),Number(a>>>0)+Number(u));i.upload(Number(s),d)}},async(a,s,u)=>{Ie("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${a}, dataOffset=${s}, size=${u}`),await i.download(Number(a),()=>e.HEAPU8.subarray(Number(s)>>>0,Number(s+u)>>>0))},(a,s,u)=>i.createKernel(a,Number(s),u,e.UTF8ToString(e._JsepGetNodeName(Number(s)))),a=>i.releaseKernel(a),(a,s,u,c)=>{Ie("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${u}, kernel=${a}, contextDataOffset=${s}`);let d=new Mc(e,i,Number(s));return i.computeKernel(Number(a),d,c)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else{let i=new Za(r);o("webnn",[i,()=>i.reserveTensorId(),a=>i.releaseTensorId(a),async(a,s,u,c,d)=>i.ensureTensor(a,s,u,c,d),(a,s)=>{i.uploadTensor(a,s)},async(a,s)=>i.downloadTensor(a,s)])}}});var LD,ha,ma,Fn,RD,Mo,ga,ba,Rw,ya,_a,va,ec=k(()=>{"use strict";y_();v_();ce();hn();wa();ac();LD=(n,e)=>{Ye()._OrtInit(n,e)!==0&&Ee("Can't initialize onnxruntime.")},ha=async n=>{LD(n.wasm.numThreads,Fo(n.logLevel))},ma=async(n,e)=>{{let r=(Lw(),bo(Nw)).init;if(e==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let t=n.webgpu.adapter;if(t){if(typeof t.limits!="object"||typeof t.features!="object"||typeof t.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=n.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=n.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(t=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!t)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",Ye(),n,t)}if(e==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",Ye(),n)}}},Fn=new Map,RD=n=>{let e=Ye(),r=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetInputOutputCount(n,o,o+t)!==0&&Ee("Can't get session input/output count.");let a=t===4?"i32":"i64";return[Number(e.getValue(o,a)),Number(e.getValue(o+t,a))]}finally{e.stackRestore(r)}},Mo=n=>{let e=Ye(),r=e._malloc(n.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${n.byteLength}.`);return e.HEAPU8.set(n,r),[r,n.byteLength]},ga=async(n,e)=>{let r,t,o=Ye();Array.isArray(n)?[r,t]=n:n.buffer===o.HEAPU8.buffer?[r,t]=[n.byteOffset,n.byteLength]:[r,t]=Mo(n);let i=0,a=0,s=0,u=[],c=[],d=[];try{if([a,u]=__(e),e?.externalData&&o.mountExternalData){let w=[];for(let I of e.externalData){let A=typeof I=="string"?I:I.path;w.push(Vo(typeof I=="string"?I:I.data).then(P=>{o.mountExternalData(A,P)}))}await Promise.all(w)}for(let w of e?.executionProviders??[])if((typeof w=="string"?w:w.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof w!="string"){let A=w,P=A?.context,C=A?.gpuDevice,R=A?.deviceType,z=A?.powerPreference;P?o.currentContext=P:C?o.currentContext=await o.jsepCreateMLContext(C):o.currentContext=await o.jsepCreateMLContext({deviceType:R,powerPreference:z})}else o.currentContext=await o.jsepCreateMLContext();break}i=await o._OrtCreateSession(r,t,a),i===0&&Ee("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.jsepRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[f,h]=RD(i),b=!!e?.enableGraphCapture,y=[],v=[],T=[];for(let w=0;w<f;w++){let I=o._OrtGetInputName(i,w);I===0&&Ee("Can't get an input name."),c.push(I),y.push(o.UTF8ToString(I))}for(let w=0;w<h;w++){let I=o._OrtGetOutputName(i,w);I===0&&Ee("Can't get an output name."),d.push(I);let A=o.UTF8ToString(I);v.push(A);{if(b&&e?.preferredOutputLocation===void 0){T.push("gpu-buffer");continue}let P=typeof e?.preferredOutputLocation=="string"?e.preferredOutputLocation:e?.preferredOutputLocation?.[A]??"cpu";if(P!=="cpu"&&P!=="cpu-pinned"&&P!=="gpu-buffer"&&P!=="ml-tensor")throw new Error(`Not supported preferred output location: ${P}.`);if(b&&P!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${P}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);T.push(P)}}let x=null;return T.some(w=>w==="gpu-buffer"||w==="ml-tensor")&&(s=o._OrtCreateBinding(i),s===0&&Ee("Can't create IO binding."),x={handle:s,outputPreferredLocations:T,outputPreferredLocationsEncoded:T.map(w=>ic(w))}),Fn.set(i,[i,c,d,x,b,!1]),[i,y,v]}catch(f){throw c.forEach(h=>o._OrtFree(h)),d.forEach(h=>o._OrtFree(h)),s!==0&&o._OrtReleaseBinding(s)!==0&&Ee("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&Ee("Can't release session."),f}finally{o._free(r),a!==0&&o._OrtReleaseSessionOptions(a)!==0&&Ee("Can't release session options."),u.forEach(f=>o._free(f)),o.unmountExternalData?.()}},ba=n=>{let e=Ye(),r=Fn.get(n);if(!r)throw new Error(`cannot release session. invalid session id: ${n}`);let[t,o,i,a,s]=r;a&&(s&&e._OrtClearBoundOutputs(a.handle)!==0&&Ee("Can't clear bound outputs."),e._OrtReleaseBinding(a.handle)!==0&&Ee("Can't release IO binding.")),e.jsepOnReleaseSession?.(n),o.forEach(u=>e._OrtFree(u)),i.forEach(u=>e._OrtFree(u)),e._OrtReleaseSession(t)!==0&&Ee("Can't release session."),Fn.delete(n)},Rw=async(n,e,r,t,o,i=!1)=>{if(!n){e.push(0);return}let a=Ye(),s=a.PTR_SIZE,u=n[0],c=n[1],d=n[3],f=d,h,b;if(u==="string"&&(d==="gpu-buffer"||d==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(i&&d!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(d==="gpu-buffer"){let T=n[2].gpuBuffer;b=gn(oo(u),c);let x=a.jsepRegisterBuffer;if(!x)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');h=x(t,o,T,b)}else if(d==="ml-tensor"){let T=n[2].mlTensor;b=gn(oo(u),c);let x=a.jsepRegisterMLTensor;if(!x)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');h=x(t,T,oo(u),c)}else{let T=n[2];if(Array.isArray(T)){b=s*T.length,h=a._malloc(b),r.push(h);for(let x=0;x<T.length;x++){if(typeof T[x]!="string")throw new TypeError(`tensor data at index ${x} is not a string`);a.setValue(h+x*s,at(T[x],r),"*")}}else{let x=a.jsepIsGraphInput;if(u!=="string"&&x){let w=a._OrtGetInputName(t,o),I=a.UTF8ToString(w);if(x(t,I)){let A=oo(u);b=gn(A,c),f="ml-tensor";let P=a.jsepCreateTemporaryTensor,C=a.jsepUploadTensor;if(!P||!C)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let R=await P(t,A,c);C(R,new Uint8Array(T.buffer,T.byteOffset,T.byteLength)),h=R}else b=T.byteLength,h=a._malloc(b),r.push(h),a.HEAPU8.set(new Uint8Array(T.buffer,T.byteOffset,b),h)}else b=T.byteLength,h=a._malloc(b),r.push(h),a.HEAPU8.set(new Uint8Array(T.buffer,T.byteOffset,b),h)}}let y=a.stackSave(),v=a.stackAlloc(4*c.length);try{c.forEach((x,w)=>a.setValue(v+w*s,x,s===4?"i32":"i64"));let T=a._OrtCreateTensor(oo(u),h,b,v,c.length,ic(f));T===0&&Ee(`Can't create tensor for input/output. session=${t}, index=${o}.`),e.push(T)}finally{a.stackRestore(y)}},ya=async(n,e,r,t,o,i)=>{let a=Ye(),s=a.PTR_SIZE,u=Fn.get(n);if(!u)throw new Error(`cannot run inference. invalid session id: ${n}`);let c=u[0],d=u[1],f=u[2],h=u[3],b=u[4],y=u[5],v=e.length,T=t.length,x=0,w=[],I=[],A=[],P=[],C=a.stackSave(),R=a.stackAlloc(v*s),z=a.stackAlloc(v*s),V=a.stackAlloc(T*s),X=a.stackAlloc(T*s);try{[x,w]=b_(i);for(let W=0;W<v;W++)await Rw(r[W],I,P,n,e[W],b);for(let W=0;W<T;W++)await Rw(o[W],A,P,n,v+t[W],b);for(let W=0;W<v;W++)a.setValue(R+W*s,I[W],"*"),a.setValue(z+W*s,d[e[W]],"*");for(let W=0;W<T;W++)a.setValue(V+W*s,A[W],"*"),a.setValue(X+W*s,f[t[W]],"*");if(h&&!y){let{handle:W,outputPreferredLocations:ue,outputPreferredLocationsEncoded:Ve}=h;if(d.length!==v)throw new Error(`input count from feeds (${v}) is expected to be always equal to model's input count (${d.length}).`);for(let te=0;te<v;te++){let le=e[te];await a._OrtBindInput(W,d[le],I[te])!==0&&Ee(`Can't bind input[${te}] for session=${n}.`)}for(let te=0;te<T;te++){let le=t[te];o[te]?.[3]?a._OrtBindOutput(W,f[le],A[te],0)!==0&&Ee(`Can't bind pre-allocated output[${te}] for session=${n}.`):a._OrtBindOutput(W,f[le],0,Ve[le])!==0&&Ee(`Can't bind output[${te}] to ${ue[te]} for session=${n}.`)}Fn.set(n,[c,d,f,h,b,!0])}a.jsepOnRunStart?.(c);let Q;h?Q=await a._OrtRunWithBinding(c,h.handle,T,V,x):Q=await a._OrtRun(c,z,R,v,X,T,V,x),Q!==0&&Ee("failed to call OrtRun().");let pe=[];for(let W=0;W<T;W++){let ue=Number(a.getValue(V+W*s,"*"));if(ue===A[W]){pe.push(o[W]);continue}let Ve=a.stackSave(),te=a.stackAlloc(4*s),le=!1,ve,ee=0;try{a._OrtGetTensorData(ue,te,te+s,te+2*s,te+3*s)!==0&&Ee(`Can't access output tensor data on index ${W}.`);let nt=s===4?"i32":"i64",je=Number(a.getValue(te,nt));ee=a.getValue(te+s,"*");let M=a.getValue(te+s*2,"*"),F=Number(a.getValue(te+s*3,nt)),re=[];for(let Ue=0;Ue<F;Ue++)re.push(Number(a.getValue(M+Ue*s,nt)));a._OrtFree(M)!==0&&Ee("Can't free memory for tensor dims.");let Oe=re.reduce((Ue,Le)=>Ue*Le,1);ve=mn(je);let Vt=h?.outputPreferredLocations[t[W]];if(ve==="string"){if(Vt==="gpu-buffer"||Vt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Ue=[];for(let Le=0;Le<Oe;Le++){let Yt=a.getValue(ee+Le*s,"*"),co=a.getValue(ee+(Le+1)*s,"*"),_n=Le===Oe-1?void 0:co-Yt;Ue.push(a.UTF8ToString(Yt,_n))}pe.push([ve,re,Ue,"cpu"])}else if(Vt==="gpu-buffer"&&Oe>0){let Ue=a.jsepGetBuffer;if(!Ue)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Le=Ue(ee),Yt=gn(je,Oe);if(Yt===void 0||!Ia(ve))throw new Error(`Unsupported data type: ${ve}`);le=!0,pe.push([ve,re,{gpuBuffer:Le,download:a.jsepCreateDownloader(Le,Yt,ve),dispose:()=>{a._OrtReleaseTensor(ue)!==0&&Ee("Can't release tensor.")}},"gpu-buffer"])}else if(Vt==="ml-tensor"&&Oe>0){let Ue=a.jsepEnsureTensor;if(!Ue)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(gn(je,Oe)===void 0||!Sa(ve))throw new Error(`Unsupported data type: ${ve}`);let Yt=await Ue(n,ee,je,re,!1);le=!0,pe.push([ve,re,{mlTensor:Yt,download:a.jsepCreateMLTensorDownloader(ee,ve),dispose:()=>{a.jsepReleaseTensorId(ee),a._OrtReleaseTensor(ue)}},"ml-tensor"])}else{let Ue=Ta(ve),Le=new Ue(Oe);new Uint8Array(Le.buffer,Le.byteOffset,Le.byteLength).set(a.HEAPU8.subarray(ee,ee+Le.byteLength)),pe.push([ve,re,Le,"cpu"])}}finally{a.stackRestore(Ve),ve==="string"&&ee&&a._free(ee),le||a._OrtReleaseTensor(ue),a.jsepOnRunEnd?.(c)}}return h&&!b&&(a._OrtClearBoundOutputs(h.handle)!==0&&Ee("Can't clear bound outputs."),Fn.set(n,[c,d,f,h,b,!1])),pe}finally{a.stackRestore(C),I.forEach(Q=>a._OrtReleaseTensor(Q)),A.forEach(Q=>a._OrtReleaseTensor(Q)),P.forEach(Q=>a._free(Q)),x!==0&&a._OrtReleaseRunOptions(x),w.forEach(Q=>a._free(Q))}},_a=n=>{let e=Ye(),r=Fn.get(n);if(!r)throw new Error("invalid session id");let t=r[0],o=e._OrtEndProfiling(t);o===0&&Ee("Can't get an profile file name."),e._OrtFree(o)},va=n=>{let e=[];for(let r of n){let t=r[2];!Array.isArray(t)&&"buffer"in t&&e.push(t.buffer)}return e}});var Vn,Ft,jo,Ya,Qa,Ja,Bc,Fc,uo,lo,MD,zw,Mw,Bw,Fw,Vw,Gw,Uw,Vc=k(()=>{"use strict";ft();ec();hn();pa();Vn=()=>!!me.wasm.proxy&&typeof document<"u",jo=!1,Ya=!1,Qa=!1,Fc=new Map,uo=(n,e)=>{let r=Fc.get(n);r?r.push(e):Fc.set(n,[e])},lo=()=>{if(jo||!Ya||Qa||!Ft)throw new Error("worker not ready")},MD=n=>{switch(n.data.type){case"init-wasm":jo=!1,n.data.err?(Qa=!0,Bc[1](n.data.err)):(Ya=!0,Bc[0]()),Ja&&(URL.revokeObjectURL(Ja),Ja=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let e=Fc.get(n.data.type);n.data.err?e.shift()[1](n.data.err):e.shift()[0](n.data.out);break}default:}},zw=async()=>{if(!Ya){if(jo)throw new Error("multiple calls to 'initWasm()' detected.");if(Qa)throw new Error("previous call to 'initWasm()' failed.");if(jo=!0,Vn())return new Promise((n,e)=>{Ft?.terminate(),h_().then(([r,t])=>{try{Ft=t,Ft.onerror=i=>e(i),Ft.onmessage=MD,Bc=[n,e];let o={type:"init-wasm",in:me};!o.in.wasm.wasmPaths&&(r||import.meta.url?.startsWith("file:"))&&(o.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),Ft.postMessage(o),Ja=r}catch(o){e(o)}},e)});try{await fa(me.wasm),await ha(me),Ya=!0}catch(n){throw Qa=!0,n}finally{jo=!1}}},Mw=async n=>{if(Vn())return lo(),new Promise((e,r)=>{uo("init-ep",[e,r]);let t={type:"init-ep",in:{epName:n,env:me}};Ft.postMessage(t)});await ma(me,n)},Bw=async n=>Vn()?(lo(),new Promise((e,r)=>{uo("copy-from",[e,r]);let t={type:"copy-from",in:{buffer:n}};Ft.postMessage(t,[n.buffer])})):Mo(n),Fw=async(n,e)=>{if(Vn()){if(e?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return lo(),new Promise((r,t)=>{uo("create",[r,t]);let o={type:"create",in:{model:n,options:{...e}}},i=[];n instanceof Uint8Array&&i.push(n.buffer),Ft.postMessage(o,i)})}else return ga(n,e)},Vw=async n=>{if(Vn())return lo(),new Promise((e,r)=>{uo("release",[e,r]);let t={type:"release",in:n};Ft.postMessage(t)});ba(n)},Gw=async(n,e,r,t,o,i)=>{if(Vn()){if(r.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return lo(),new Promise((a,s)=>{uo("run",[a,s]);let u=r,c={type:"run",in:{sessionId:n,inputIndices:e,inputs:u,outputIndices:t,options:i}};Ft.postMessage(c,va(u))})}else return ya(n,e,r,t,o,i)},Uw=async n=>{if(Vn())return lo(),new Promise((e,r)=>{uo("end-profiling",[e,r]);let t={type:"end-profiling",in:n};Ft.postMessage(t)});_a(n)}});var Ww,BD,es,Hw=k(()=>{"use strict";ft();Vc();ce();da();ac();Ww=(n,e)=>{switch(n.location){case"cpu":return[n.type,n.dims,n.data,"cpu"];case"gpu-buffer":return[n.type,n.dims,{gpuBuffer:n.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[n.type,n.dims,{mlTensor:n.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${n.location} for ${e()}`)}},BD=n=>{switch(n[3]){case"cpu":return new St(n[0],n[2],n[1]);case"gpu-buffer":{let e=n[0];if(!Ia(e))throw new Error(`not supported data type: ${e} for deserializing GPU tensor`);let{gpuBuffer:r,download:t,dispose:o}=n[2];return St.fromGpuBuffer(r,{dataType:e,dims:n[1],download:t,dispose:o})}case"ml-tensor":{let e=n[0];if(!Sa(e))throw new Error(`not supported data type: ${e} for deserializing MLTensor tensor`);let{mlTensor:r,download:t,dispose:o}=n[2];return St.fromMLTensor(r,{dataType:e,dims:n[1],download:t,dispose:o})}default:throw new Error(`invalid data location: ${n[3]}`)}},es=class{async fetchModelAndCopyToWasmMemory(e){return Bw(await Vo(e))}async loadModel(e,r){$t();let t;typeof e=="string"?t=await this.fetchModelAndCopyToWasmMemory(e):t=e,[this.sessionId,this.inputNames,this.outputNames]=await Fw(t,r),bt()}async dispose(){return Vw(this.sessionId)}async run(e,r,t){$t();let o=[],i=[];Object.entries(e).forEach(h=>{let b=h[0],y=h[1],v=this.inputNames.indexOf(b);if(v===-1)throw new Error(`invalid input '${b}'`);o.push(y),i.push(v)});let a=[],s=[];Object.entries(r).forEach(h=>{let b=h[0],y=h[1],v=this.outputNames.indexOf(b);if(v===-1)throw new Error(`invalid output '${b}'`);a.push(y),s.push(v)});let u=o.map((h,b)=>Ww(h,()=>`input "${this.inputNames[i[b]]}"`)),c=a.map((h,b)=>h?Ww(h,()=>`output "${this.outputNames[s[b]]}"`):null),d=await Gw(this.sessionId,i,u,s,c,t),f={};for(let h=0;h<d.length;h++)f[this.outputNames[s[h]]]=a[h]??BD(d[h]);return bt(),f}startProfiling(){}endProfiling(){Uw(this.sessionId)}}});var jw={};Hn(jw,{OnnxruntimeWebAssemblyBackend:()=>ts,initializeFlags:()=>qw,wasmBackend:()=>FD});var qw,ts,FD,Kw=k(()=>{"use strict";ft();Vc();Hw();qw=()=>{if((typeof me.wasm.initTimeout!="number"||me.wasm.initTimeout<0)&&(me.wasm.initTimeout=0),me.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof me.wasm.proxy!="boolean"&&(me.wasm.proxy=!1),typeof me.wasm.trace!="boolean"&&(me.wasm.trace=!1),typeof me.wasm.numThreads!="number"||!Number.isInteger(me.wasm.numThreads)||me.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)me.wasm.numThreads=1;else{let n=typeof navigator>"u"?Ss("node:os").cpus().length:navigator.hardwareConcurrency;me.wasm.numThreads=Math.min(4,Math.ceil((n||1)/2))}},ts=class{async init(e){qw(),await zw(),await Mw(e)}async createInferenceSessionHandler(e,r){let t=new es;return await t.loadModel(e,r),Promise.resolve(t)}},FD=new ts});ft();ft();ft();var If="1.21.0";var pK=Cs;{let n=(t_(),bo(e_)).onnxjsBackend;on("webgl",n,-10)}{let n=(Kw(),bo(jw)).wasmBackend;on("webgpu",n,5),on("webnn",n,5),on("cpu",n,10),on("wasm",n,10)}Object.defineProperty(me.versions,"web",{value:If,enumerable:!0});export{_1 as InferenceSession,ui as TRACE,$t as TRACE_FUNC_BEGIN,bt as TRACE_FUNC_END,St as Tensor,pK as default,me as env,on as registerBackend};
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
