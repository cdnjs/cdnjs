/*!
 * ONNX Runtime Web v1.20.1
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var Un=Object.defineProperty;var vp=Object.getOwnPropertyDescriptor;var $p=Object.getOwnPropertyNames;var xp=Object.prototype.hasOwnProperty;var Vn=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var V=(e,t)=>()=>(e&&(t=e(e=0)),t);var Gt=(e,t)=>{for(var r in t)Un(e,r,{get:t[r],enumerable:!0})},Sp=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of $p(t))!xp.call(e,o)&&o!==r&&Un(e,o,{get:()=>t[o],enumerable:!(n=vp(t,o))||n.enumerable});return e};var br=e=>Sp(Un({},"__esModule",{value:!0}),e);var wr,xt,St,Tp,_r,vr=V(()=>{"use strict";wr=new Map,xt=[],St=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let n=wr.get(e);if(n===void 0)wr.set(e,{backend:t,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let o=xt.indexOf(e);o!==-1&&xt.splice(o,1);for(let i=0;i<xt.length;i++)if(wr.get(xt[i]).priority<=r){xt.splice(i,0,e);return}xt.push(e)}return}throw new TypeError("not a valid backend")},Tp=async e=>{let t=wr.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(n){return r||(t.error=`${n}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},_r=async e=>{let t=e.executionProviders||[],r=t.map(l=>typeof l=="string"?l:l.name),n=r.length===0?xt:r,o,i=[],a=new Set;for(let l of n){let c=await Tp(l);typeof c=="string"?i.push({name:l,err:c}):(o||(o=c),o===c&&a.add(l))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:c}of i)r.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${c}`);let d=t.filter(l=>a.has(typeof l=="string"?l:l.name));return[o,new Proxy(e,{get:(l,c)=>c==="executionProviders"?d:Reflect.get(l,c)})]}});var Zi=V(()=>{"use strict";vr()});var Qi,Ji=V(()=>{"use strict";Qi="1.20.1"});var ea,We,Nn=V(()=>{"use strict";Ji();ea="warning",We={wasm:{},webgl:{},webgpu:{},versions:{common:Qi},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);ea=e}},get logLevel(){return ea}};Object.defineProperty(We,"logLevel",{enumerable:!0})});var _e,ta=V(()=>{"use strict";Nn();_e=We});var ra,na,oa=V(()=>{"use strict";ra=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(n!=null){let o,i;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[3]):(o=e.dims[3],i=e.dims[2]);let a=t?.format!==void 0?t.format:"RGB",d=t?.norm,l,c;d===void 0||d.mean===void 0?l=[255,255,255,255]:typeof d.mean=="number"?l=[d.mean,d.mean,d.mean,d.mean]:(l=[d.mean[0],d.mean[1],d.mean[2],0],d.mean[3]!==void 0&&(l[3]=d.mean[3])),d===void 0||d.bias===void 0?c=[0,0,0,0]:typeof d.bias=="number"?c=[d.bias,d.bias,d.bias,d.bias]:(c=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(c[3]=d.bias[3]));let m=i*o,u=0,h=m,w=m*2,g=-1;a==="RGBA"?(u=0,h=m,w=m*2,g=m*3):a==="RGB"?(u=0,h=m,w=m*2):a==="RBG"&&(u=0,w=m,h=m*2);for(let y=0;y<i;y++)for(let S=0;S<o;S++){let $=(e.data[u++]-c[0])*l[0],v=(e.data[h++]-c[1])*l[1],x=(e.data[w++]-c[2])*l[2],T=g===-1?255:(e.data[g++]-c[3])*l[3];n.fillStyle="rgba("+$+","+v+","+x+","+T+")",n.fillRect(S,y,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},na=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(r!=null){let o,i,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[1],a=e.dims[3]):(o=e.dims[3],i=e.dims[2],a=e.dims[1]);let d=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,c,m;l===void 0||l.mean===void 0?c=[255,255,255,255]:typeof l.mean=="number"?c=[l.mean,l.mean,l.mean,l.mean]:(c=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(c[3]=l.mean[3])),l===void 0||l.bias===void 0?m=[0,0,0,0]:typeof l.bias=="number"?m=[l.bias,l.bias,l.bias,l.bias]:(m=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(m[3]=l.bias[3]));let u=i*o;if(t!==void 0&&(t.format!==void 0&&a===4&&t.format!=="RGBA"||a===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let h=4,w=0,g=1,y=2,S=3,$=0,v=u,x=u*2,T=-1;d==="RGBA"?($=0,v=u,x=u*2,T=u*3):d==="RGB"?($=0,v=u,x=u*2):d==="RBG"&&($=0,x=u,v=u*2),n=r.createImageData(o,i);for(let C=0;C<i*o;w+=h,g+=h,y+=h,S+=h,C++)n.data[w]=(e.data[$++]-m[0])*c[0],n.data[g]=(e.data[v++]-m[1])*c[1],n.data[y]=(e.data[x++]-m[2])*c[2],n.data[S]=T===-1?255:(e.data[T++]-m[3])*c[3]}else throw new Error("Can not access image data");return n}});var Wn,ia,aa,sa,ua,da,la=V(()=>{"use strict";$r();Wn=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=t,o=t.norm??{mean:255,bias:0},i,a;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?a=[o.bias,o.bias,o.bias,o.bias]:a=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let d=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",c=r*n,m=l==="RGBA"?new Float32Array(c*4):new Float32Array(c*3),u=4,h=0,w=1,g=2,y=3,S=0,$=c,v=c*2,x=-1;d==="RGB"&&(u=3,h=0,w=1,g=2,y=-1),l==="RGBA"?x=c*3:l==="RBG"?(S=0,v=c,$=c*2):l==="BGR"&&(v=0,$=c,S=c*2);for(let C=0;C<c;C++,h+=u,g+=u,w+=u,y+=u)m[S++]=(e[h]+a[0])/i[0],m[$++]=(e[w]+a[1])/i[1],m[v++]=(e[g]+a[2])/i[2],x!==-1&&y!==-1&&(m[x++]=(e[y]+a[3])/i[3]);return l==="RGBA"?new Be("float32",m,[1,4,r,n]):new Be("float32",m,[1,3,r,n])},ia=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,n=typeof ImageData<"u"&&e instanceof ImageData,o=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,i=typeof e=="string",a,d=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},c=m=>typeof HTMLCanvasElement<"u"&&m instanceof HTMLCanvasElement||m instanceof OffscreenCanvas?m.getContext("2d"):null;if(r){let m=l();m.width=e.width,m.height=e.height;let u=c(m);if(u!=null){let h=e.height,w=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(h=t.resizedHeight,w=t.resizedWidth),t!==void 0){if(d=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");d.tensorFormat="RGBA",d.height=h,d.width=w}else d.tensorFormat="RGBA",d.height=h,d.width=w;u.drawImage(e,0,0),a=u.getImageData(0,0,w,h).data}else throw new Error("Can not access image data")}else if(n){let m,u;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(m=t.resizedHeight,u=t.resizedWidth):(m=e.height,u=e.width),t!==void 0&&(d=t),d.format="RGBA",d.height=m,d.width=u,t!==void 0){let h=l();h.width=u,h.height=m;let w=c(h);if(w!=null)w.putImageData(e,0,0),a=w.getImageData(0,0,u,m).data;else throw new Error("Can not access image data")}else a=e.data}else if(o){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let m=l();m.width=e.width,m.height=e.height;let u=c(m);if(u!=null){let h=e.height,w=e.width;return u.drawImage(e,0,0,w,h),a=u.getImageData(0,0,w,h).data,d.height=h,d.width=w,Wn(a,d)}else throw new Error("Can not access image data")}else{if(i)return new Promise((m,u)=>{let h=l(),w=c(h);if(!e||!w)return u();let g=new Image;g.crossOrigin="Anonymous",g.src=e,g.onload=()=>{h.width=g.width,h.height=g.height,w.drawImage(g,0,0,h.width,h.height);let y=w.getImageData(0,0,h.width,h.height);d.height=h.height,d.width=h.width,m(Wn(y.data,d))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return Wn(a,d);throw new Error("Input data provided is not supported - aborted tensor creation")},aa=(e,t)=>{let{width:r,height:n,download:o,dispose:i}=t,a=[1,n,r,4];return new Be({location:"texture",type:"float32",texture:e,dims:a,download:o,dispose:i})},sa=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:i}=t;return new Be({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:o,dispose:i})},ua=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:i}=t;return new Be({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:n,download:o,dispose:i})},da=(e,t,r)=>new Be({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})});var Tt,Ft,ca,pa,ma=V(()=>{"use strict";Tt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Ft=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),ca=!1,pa=()=>{if(!ca){ca=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=typeof Float16Array<"u"&&Float16Array.from;e&&(Tt.set("int64",BigInt64Array),Ft.set(BigInt64Array,"int64")),t&&(Tt.set("uint64",BigUint64Array),Ft.set(BigUint64Array,"uint64")),r?(Tt.set("float16",Float16Array),Ft.set(Float16Array,"float16")):Tt.set("float16",Uint16Array)}}});var fa,ha,ga=V(()=>{"use strict";$r();fa=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},ha=(e,t)=>{switch(e.location){case"cpu":return new Be(e.type,e.data,t);case"cpu-pinned":return new Be({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Be({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Be({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Be({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var Be,$r=V(()=>{"use strict";oa();la();ma();ga();Be=class{constructor(t,r,n){pa();let o,i;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,o=t.type,i=t.dims,t.location){case"cpu-pinned":{let d=Tt.get(o);if(!d)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(t.data instanceof d))throw new TypeError(`buffer should be of type ${d.name}`);this.cpuData=t.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let d,l;if(typeof t=="string")if(o=t,l=n,t==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");d=r}else{let c=Tt.get(t);if(c===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(r)){if(t==="float16"&&c===Uint16Array||t==="uint4"||t==="int4")throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${c.name} as data.`);t==="uint64"||t==="int64"?d=c.from(r,BigInt):d=c.from(r)}else if(r instanceof c)d=r;else if(r instanceof Uint8ClampedArray)if(t==="uint8")d=Uint8Array.from(r);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else throw new TypeError(`A ${o} tensor's data must be type of ${c}`)}else if(l=r,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let c=typeof t[0];if(c==="string")o="string",d=t;else if(c==="boolean")o="bool",d=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${c}.`)}else if(t instanceof Uint8ClampedArray)o="uint8",d=Uint8Array.from(t);else{let c=Ft.get(t.constructor);if(c===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);o=c,d=t}if(l===void 0)l=[d.length];else if(!Array.isArray(l))throw new TypeError("A tensor's dims must be a number array");i=l,this.cpuData=d,this.dataLocation="cpu"}let a=fa(i);if(this.cpuData&&a!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=a}static async fromImage(t,r){return ia(t,r)}static fromTexture(t,r){return aa(t,r)}static fromGpuBuffer(t,r){return sa(t,r)}static fromMLTensor(t,r){return ua(t,r)}static fromPinnedBuffer(t,r,n){return da(t,r,n)}toDataURL(t){return ra(this,t)}toImageData(t){return na(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,t&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return ha(this,t)}}});var De,xr=V(()=>{"use strict";$r();De=Be});var Sr,ya,Le,Ve,Ln=V(()=>{"use strict";Nn();Sr=(e,t)=>{(typeof We.trace>"u"?!We.wasm.trace:!We.trace)||console.timeStamp(`${e}::ORT::${t}`)},ya=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],n=!1;for(let o=0;o<r.length;o++){if(n&&!r[o].includes("TRACE_FUNC")){let i=`FUNC_${e}::${r[o].trim().split(" ")[1]}`;t&&(i+=`::${t}`),Sr("CPU",i);return}r[o].includes("TRACE_FUNC")&&(n=!0)}},Le=e=>{(typeof We.trace>"u"?!We.wasm.trace:!We.trace)||ya("BEGIN",e)},Ve=e=>{(typeof We.trace>"u"?!We.wasm.trace:!We.trace)||ya("END",e)}});var Tr,ba=V(()=>{"use strict";vr();xr();Ln();Tr=class e{constructor(t){this.handler=t}async run(t,r,n){Le();let o={},i={};if(typeof t!="object"||t===null||t instanceof De||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof De)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let c of r){if(typeof c!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(c)===-1)throw new RangeError(`'fetches' contains invalid output name: ${c}.`);o[c]=null}if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let c=!1,m=Object.getOwnPropertyNames(r);for(let u of this.outputNames)if(m.indexOf(u)!==-1){let h=r[u];(h===null||h instanceof De)&&(c=!0,a=!1,o[u]=h)}if(c){if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let c of this.inputNames)if(typeof t[c]>"u")throw new Error(`input '${c}' is missing in 'feeds'.`);if(a)for(let c of this.outputNames)o[c]=null;let d=await this.handler.run(t,o,i),l={};for(let c in d)if(Object.hasOwnProperty.call(d,c)){let m=d[c];m instanceof De?l[c]=m:l[c]=new De(m.type,m.data,m.dims)}return Ve(),l}async release(){return this.handler.dispose()}static async create(t,r,n,o){Le();let i,a={};if(typeof t=="string"){if(i=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(i=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let m=t,u=0,h=t.byteLength;if(typeof r=="object"&&r!==null)a=r;else if(typeof r=="number"){if(u=r,!Number.isSafeInteger(u))throw new RangeError("'byteOffset' must be an integer.");if(u<0||u>=m.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${m.byteLength}).`);if(h=t.byteLength-u,typeof n=="number"){if(h=n,!Number.isSafeInteger(h))throw new RangeError("'byteLength' must be an integer.");if(h<=0||u+h>m.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${m.byteLength-u}].`);if(typeof o=="object"&&o!==null)a=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof n<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(m,u,h)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[d,l]=await _r(a),c=await d.createInferenceSessionHandler(i,l);return Ve(),new e(c)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var Ip,wa=V(()=>{"use strict";ba();Ip=Tr});var _a=V(()=>{"use strict"});var va=V(()=>{"use strict"});var $a=V(()=>{"use strict"});var xa=V(()=>{"use strict"});var Cp,Ir,Sa=V(()=>{"use strict";vr();xr();Cp="Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.",Ir=class e{constructor(t,r,n){this.handler=t,this.hasOptimizerModel=r,this.hasEvalModel=n}get trainingInputNames(){return this.handler.inputNames}get trainingOutputNames(){return this.handler.outputNames}get evalInputNames(){if(this.hasEvalModel)return this.handler.evalInputNames;throw new Error("This training session has no evalModel loaded.")}get evalOutputNames(){if(this.hasEvalModel)return this.handler.evalOutputNames;throw new Error("This training session has no evalModel loaded.")}static async create(t,r){let n=t.evalModel||"",o=t.optimizerModel||"",i=r||{},[a,d]=await _r(i);if(a.createTrainingSessionHandler){let l=await a.createTrainingSessionHandler(t.checkpointState,t.trainModel,n,o,d);return new e(l,!!t.optimizerModel,!!t.evalModel)}else throw new Error(Cp)}typeNarrowingForRunStep(t,r,n,o,i){let a={},d={};if(typeof n!="object"||n===null||n instanceof De||Array.isArray(n))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let l=!0;if(typeof o=="object"){if(o===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(o instanceof De)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(o)){if(o.length===0)throw new TypeError("'fetches' cannot be an empty array.");l=!1;for(let c of o){if(typeof c!="string")throw new TypeError("'fetches' must be a string array or an object.");if(r.indexOf(c)===-1)throw new RangeError(`'fetches' contains invalid output name: ${c}.`);a[c]=null}if(typeof i=="object"&&i!==null)d=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let c=!1,m=Object.getOwnPropertyNames(o);for(let u of r)if(m.indexOf(u)!==-1){let h=o[u];(h===null||h instanceof De)&&(c=!0,l=!1,a[u]=h)}if(c){if(typeof i=="object"&&i!==null)d=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else d=o}}else if(typeof o<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let c of t)if(typeof n[c]>"u")throw new Error(`input '${c}' is missing in 'feeds'.`);if(l)for(let c of r)a[c]=null;return[a,d]}convertHandlerReturnTypeToMapOfTensors(t){let r={};for(let n in t)if(Object.hasOwnProperty.call(t,n)){let o=t[n];o instanceof De?r[n]=o:r[n]=new De(o.type,o.data,o.dims)}return r}async lazyResetGrad(){await this.handler.lazyResetGrad()}async runTrainStep(t,r,n){let[o,i]=this.typeNarrowingForRunStep(this.trainingInputNames,this.trainingOutputNames,t,r,n),a=await this.handler.runTrainStep(t,o,i);return this.convertHandlerReturnTypeToMapOfTensors(a)}async runOptimizerStep(t){if(this.hasOptimizerModel)await this.handler.runOptimizerStep(t||{});else throw new Error("This TrainingSession has no OptimizerModel loaded.")}async runEvalStep(t,r,n){if(this.hasEvalModel){let[o,i]=this.typeNarrowingForRunStep(this.evalInputNames,this.evalOutputNames,t,r,n),a=await this.handler.runEvalStep(t,o,i);return this.convertHandlerReturnTypeToMapOfTensors(a)}else throw new Error("This TrainingSession has no EvalModel loaded.")}async getParametersSize(t=!0){return this.handler.getParametersSize(t)}async loadParametersBuffer(t,r=!0){let n=await this.getParametersSize(r);if(t.length!==4*n)throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");return this.handler.loadParametersBuffer(t,r)}async getContiguousParameters(t=!0){return this.handler.getContiguousParameters(t)}async release(){return this.handler.dispose()}}});var Ap,Ta=V(()=>{"use strict";Sa();Ap=Ir});var Hn={};Gt(Hn,{InferenceSession:()=>Ip,TRACE:()=>Sr,TRACE_FUNC_BEGIN:()=>Le,TRACE_FUNC_END:()=>Ve,Tensor:()=>De,TrainingSession:()=>Ap,env:()=>_e,registerBackend:()=>St});var Ke=V(()=>{"use strict";Zi();ta();wa();xr();_a();va();Ln();$a();xa();Ta()});var Cr=V(()=>{"use strict"});var ka={};Gt(ka,{default:()=>kp});var Ca,Aa,kp,Ea=V(()=>{"use strict";Gn();gt();qt();Ca="ort-wasm-proxy-worker",Aa=globalThis.self?.name===Ca;Aa&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":Ar(r.wasm).then(()=>{kr(r).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})})},n=>{postMessage({type:t,err:n})});break;case"init-ep":{let{epName:n,env:o}=r;Er(o,n).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})});break}case"copy-from":{let{buffer:n}=r,o=jt(n);postMessage({type:t,out:o});break}case"create":{let{model:n,options:o}=r;Pr(n,o).then(i=>{postMessage({type:t,out:i})},i=>{postMessage({type:t,err:i})});break}case"release":zr(r),postMessage({type:t});break;case"run":{let{sessionId:n,inputIndices:o,inputs:i,outputIndices:a,options:d}=r;Or(n,o,i,a,new Array(a.length).fill(null),d).then(l=>{l.some(c=>c[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},Dr([...i,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":Br(r),postMessage({type:t});break;default:}}catch(n){postMessage({type:t,err:n})}});kp=Aa?null:e=>new Worker(e??Ut,{type:"module",name:Ca})});var za={};Gt(za,{default:()=>Ep});var Fn,Pa,Ep,Oa=V(()=>{"use strict";Pa=(Fn=import.meta.url,async function(e={}){function t(){return de.buffer!=ce.buffer&&Ce(),ce}function r(){return de.buffer!=ce.buffer&&Ce(),q}function n(){return de.buffer!=ce.buffer&&Ce(),ue}function o(){return de.buffer!=ce.buffer&&Ce(),re}function i(){return de.buffer!=ce.buffer&&Ce(),ne}function a(){return de.buffer!=ce.buffer&&Ce(),oe}function d(){return de.buffer!=ce.buffer&&Ce(),U}function l(){return de.buffer!=ce.buffer&&Ce(),Re}var c,m,u=Object.assign({},e),h=new Promise((s,p)=>{c=s,m=p}),w=typeof window=="object",g=typeof importScripts=="function",y=g&&self.name=="em-pthread";u.mountExternalData=(s,p)=>{s.startsWith("./")&&(s=s.substring(2)),(u.Fb||(u.Fb=new Map)).set(s,p)},u.unmountExternalData=()=>{delete u.Fb};var S=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let $=()=>{let s=(f,b,_)=>(...I)=>{let O=et,D=b?.();I=f(...I);let L=b?.();return D!==L&&(f=L,_(D),b=_=null),et!=O?new Promise((H,X)=>{En={resolve:H,reject:X}}):I},p=f=>async(...b)=>{try{if(u.Eb)throw Error("Session already started");let _=u.Eb={fc:b[0],errors:[]},I=await f(...b);if(u.Eb!==_)throw Error("Session mismatch");u.Gb?.flush();let O=_.errors;if(0<O.length){let D=await Promise.all(O);if(D=D.filter(L=>L),0<D.length)throw Error(D.join(`
`))}return I}finally{u.Eb=null}};u._OrtCreateSession=s(u._OrtCreateSession,()=>u._OrtCreateSession,f=>u._OrtCreateSession=f),u._OrtRun=p(s(u._OrtRun,()=>u._OrtRun,f=>u._OrtRun=f)),u._OrtRunWithBinding=p(s(u._OrtRunWithBinding,()=>u._OrtRunWithBinding,f=>u._OrtRunWithBinding=f)),u._OrtBindInput=s(u._OrtBindInput,()=>u._OrtBindInput,f=>u._OrtBindInput=f),$=void 0};u.jsepInit=(s,p)=>{if($?.(),s==="webgpu"){[u.Gb,u.Ub,u.Yb,u.Nb,u.Xb,u.jb,u.Zb,u.bc,u.Vb,u.Wb,u.$b]=p;let f=u.Gb;u.jsepRegisterBuffer=(b,_,I,O)=>f.registerBuffer(b,_,I,O),u.jsepGetBuffer=b=>f.getBuffer(b),u.jsepCreateDownloader=(b,_,I)=>f.createDownloader(b,_,I),u.jsepOnReleaseSession=b=>{f.onReleaseSession(b)},u.jsepOnRunStart=b=>f.onRunStart(b),u.cc=(b,_)=>{f.upload(b,_)}}else if(s==="webnn"){[u.Gb,u.ac,u.Ob,u.jsepEnsureTensor,u.dc,u.jsepDownloadTensor]=p,u.jsepReleaseTensorId=u.Ob;let f=u.Gb;u.jsepOnRunStart=b=>f.onRunStart(b),u.jsepRegisterMLContext=(b,_)=>{f.registerMLContext(b,_)},u.jsepOnReleaseSession=b=>{f.onReleaseSession(b)},u.jsepCreateMLTensorDownloader=(b,_)=>f.createMLTensorDownloader(b,_),u.jsepRegisterMLTensor=(b,_,I)=>f.registerMLTensor(b,_,I)}};var v,x,T=Object.assign({},u),C="./this.program",A=(s,p)=>{throw p},P="";(w||g)&&(g?P=self.location.href:typeof document<"u"&&document.currentScript&&(P=document.currentScript.src),Fn&&(P=Fn),P=P.startsWith("blob:")?"":P.substr(0,P.replace(/[?#].*/,"").lastIndexOf("/")+1),g&&(x=s=>{var p=new XMLHttpRequest;return p.open("GET",s,!1),p.responseType="arraybuffer",p.send(null),new Uint8Array(p.response)}),v=(s,p,f)=>{var b=new XMLHttpRequest;b.open("GET",s,!0),b.responseType="arraybuffer",b.onload=()=>{b.status==200||b.status==0&&b.response?p(b.response):f()},b.onerror=f,b.send(null)});var B,N=console.log.bind(console),W=console.error.bind(console),K=N,Z=W;if(Object.assign(u,T),T=null,y){let s=function(p){try{var f=p.data,b=f.cmd;if(b==="load"){let _=[];self.onmessage=I=>_.push(I),self.startWorker=()=>{postMessage({cmd:"loaded"});for(let I of _)s(I);self.onmessage=s};for(let I of f.handlers)u[I]&&!u[I].proxy||(u[I]=(...O)=>{postMessage({Mb:"callHandler",oc:I,args:O})},I=="print"&&(K=u[I]),I=="printErr"&&(Z=u[I]));de=f.wasmMemory,Ce(),ee(f.wasmModule)}else if(b==="run"){Bn(f.pthread_ptr,0,0,1,0,0),Cn(f.pthread_ptr),ic(),Lo(),se||(Vi(),se=!0);try{ac(f.start_routine,f.arg)}catch(_){if(_!="unwind")throw _}}else b==="cancel"?Rt()&&gr(-1):f.target!=="setimmediate"&&(b==="checkMailbox"?se&&sr():b&&(Z(`worker: received unknown command ${b}`),Z(f)))}catch(_){throw Ni(),_}};var jh=s,ee,se=!1;Z=function(...p){p=p.join(" "),console.error(p)},self.alert=function(...p){postMessage({Mb:"alert",text:p.join(" "),qc:Rt()})},u.instantiateWasm=(p,f)=>new Promise(b=>{ee=_=>{_=new WebAssembly.Instance(_,Ro()),f(_),b()}}),self.onunhandledrejection=p=>{throw p.reason||p},self.onmessage=s}u.wasmBinary&&(B=u.wasmBinary);var de,Y,le,ce,q,ue,re,ne,oe,U,G,ye,Re,$e=!1;function Ce(){var s=de.buffer;u.HEAP8=ce=new Int8Array(s),u.HEAP16=ue=new Int16Array(s),u.HEAPU8=q=new Uint8Array(s),u.HEAPU16=re=new Uint16Array(s),u.HEAP32=ne=new Int32Array(s),u.HEAPU32=oe=new Uint32Array(s),u.HEAPF32=U=new Float32Array(s),u.HEAPF64=Re=new Float64Array(s),u.HEAP64=G=new BigInt64Array(s),u.HEAPU64=ye=new BigUint64Array(s)}if(!y){if(!((de=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0})).buffer instanceof S))throw Z("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),Error("bad memory");Ce()}var bt=[],Ae=[],Me=[],Ue=0,zt=null,wt=null;function zo(){if(--Ue==0&&(zt!==null&&(clearInterval(zt),zt=null),wt)){var s=wt;wt=null,s()}}function Ot(s){throw Z(s="Aborted("+s+")"),$e=!0,le=1,s=new WebAssembly.RuntimeError(s+". Build with -sASSERTIONS for more info."),m(s),s}var hn,Oo=s=>s.startsWith("data:application/octet-stream;base64,"),Bo=s=>s.startsWith("file://");function Do(s){if(s==hn&&B)return new Uint8Array(B);if(x)return x(s);throw"both async and sync fetching of the wasm failed"}function Mo(s,p,f){return function(b){if(!B&&(w||g)){if(typeof fetch=="function"&&!Bo(b))return fetch(b,{credentials:"same-origin"}).then(_=>{if(!_.ok)throw`failed to load wasm binary file at '${b}'`;return _.arrayBuffer()}).catch(()=>Do(b));if(v)return new Promise((_,I)=>{v(b,O=>_(new Uint8Array(O)),I)})}return Promise.resolve().then(()=>Do(b))}(s).then(b=>WebAssembly.instantiate(b,p)).then(f,b=>{Z(`failed to asynchronously prepare wasm: ${b}`),Ot(b)})}function Ro(){return{a:{O:oc,Aa:nc,b:uc,aa:qo,B:Yo,qa:Xo,Y:Qo,_:Jo,ra:ei,oa:ti,ha:ri,na:ni,L:oi,Z:ii,W:ai,pa:si,X:ui,wa:dc,F:cc,Q:pc,P:fc,E:gc,u:yc,q:bc,G:wc,A:Ic,R:Cc,ua:Ac,ka:kc,U:Ec,ba:Pc,H:zc,ja:Cn,ta:Oc,t:Bc,x:Rc,o:Uc,l:Nc,c:Tn,n:Wc,j:Gc,w:Fc,p:qc,g:jc,s:Kc,m:Yc,e:Xc,k:Zc,i:Qc,h:Jc,d:ep,ea:tp,fa:rp,ga:np,ca:$i,da:xi,T:op,f:ip,D:ap,I:sp,M:up,y:dp,sa:lp,V:cp,v:Ti,z:pp,N:mp,S:fp,za:hp,ya:gp,la:Ai,ma:ki,$:_n,C:Ei,K:Pi,ia:zi,J:Oi,a:de,xa:wn,va:Mi,r:wp}}}var gn={868340:(s,p,f,b,_)=>{if(u===void 0||!u.Fb)return 1;if((s=ze(s>>>0)).startsWith("./")&&(s=s.substring(2)),!(s=u.Fb.get(s)))return 2;if(b>>>=0,(p>>>=0)+(f>>>=0)>s.byteLength)return 3;try{let I=s.subarray(p,p+f);switch(_){case 0:r().set(I,b>>>0);break;case 1:u.cc(b,I);break;default:return 4}return 0}catch{return 4}},869023:(s,p,f)=>{u.dc(s,r().subarray(p>>>0,p+f>>>0))},869086:()=>u.ac(),869127:s=>{u.Ob(s)},869163:()=>{u.Vb()},869194:()=>{u.Wb()},869223:()=>{u.$b()},869248:s=>u.Ub(s),869281:s=>u.Yb(s),869313:(s,p,f)=>{u.Nb(s,p,f,!0)},869352:(s,p,f)=>{u.Nb(s,p,f)},869385:()=>typeof wasmOffsetConverter<"u",869442:s=>{u.jb("Abs",s,void 0)},869493:s=>{u.jb("Neg",s,void 0)},869544:s=>{u.jb("Floor",s,void 0)},869597:s=>{u.jb("Ceil",s,void 0)},869649:s=>{u.jb("Reciprocal",s,void 0)},869707:s=>{u.jb("Sqrt",s,void 0)},869759:s=>{u.jb("Exp",s,void 0)},869810:s=>{u.jb("Erf",s,void 0)},869861:s=>{u.jb("Sigmoid",s,void 0)},869916:(s,p,f)=>{u.jb("HardSigmoid",s,{alpha:p,beta:f})},869995:s=>{u.jb("Log",s,void 0)},870046:s=>{u.jb("Sin",s,void 0)},870097:s=>{u.jb("Cos",s,void 0)},870148:s=>{u.jb("Tan",s,void 0)},870199:s=>{u.jb("Asin",s,void 0)},870251:s=>{u.jb("Acos",s,void 0)},870303:s=>{u.jb("Atan",s,void 0)},870355:s=>{u.jb("Sinh",s,void 0)},870407:s=>{u.jb("Cosh",s,void 0)},870459:s=>{u.jb("Asinh",s,void 0)},870512:s=>{u.jb("Acosh",s,void 0)},870565:s=>{u.jb("Atanh",s,void 0)},870618:s=>{u.jb("Tanh",s,void 0)},870670:s=>{u.jb("Not",s,void 0)},870721:(s,p,f)=>{u.jb("Clip",s,{min:p,max:f})},870790:s=>{u.jb("Clip",s,void 0)},870842:(s,p)=>{u.jb("Elu",s,{alpha:p})},870900:s=>{u.jb("Gelu",s,void 0)},870952:s=>{u.jb("Relu",s,void 0)},871004:(s,p)=>{u.jb("LeakyRelu",s,{alpha:p})},871068:(s,p)=>{u.jb("ThresholdedRelu",s,{alpha:p})},871138:(s,p)=>{u.jb("Cast",s,{to:p})},871196:s=>{u.jb("Add",s,void 0)},871247:s=>{u.jb("Sub",s,void 0)},871298:s=>{u.jb("Mul",s,void 0)},871349:s=>{u.jb("Div",s,void 0)},871400:s=>{u.jb("Pow",s,void 0)},871451:s=>{u.jb("Equal",s,void 0)},871504:s=>{u.jb("Greater",s,void 0)},871559:s=>{u.jb("GreaterOrEqual",s,void 0)},871621:s=>{u.jb("Less",s,void 0)},871673:s=>{u.jb("LessOrEqual",s,void 0)},871732:(s,p,f,b,_)=>{u.jb("ReduceMean",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(b>>>0,_>>>0)):[]})},871891:(s,p,f,b,_)=>{u.jb("ReduceMax",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(b>>>0,_>>>0)):[]})},872049:(s,p,f,b,_)=>{u.jb("ReduceMin",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(b>>>0,_>>>0)):[]})},872207:(s,p,f,b,_)=>{u.jb("ReduceProd",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(b>>>0,_>>>0)):[]})},872366:(s,p,f,b,_)=>{u.jb("ReduceSum",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(b>>>0,_>>>0)):[]})},872524:(s,p,f,b,_)=>{u.jb("ReduceL1",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(b>>>0,_>>>0)):[]})},872681:(s,p,f,b,_)=>{u.jb("ReduceL2",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(b>>>0,_>>>0)):[]})},872838:(s,p,f,b,_)=>{u.jb("ReduceLogSum",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(b>>>0,_>>>0)):[]})},872999:(s,p,f,b,_)=>{u.jb("ReduceSumSquare",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(b>>>0,_>>>0)):[]})},873163:(s,p,f,b,_)=>{u.jb("ReduceLogSumExp",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(b>>>0,_>>>0)):[]})},873327:s=>{u.jb("Where",s,void 0)},873380:(s,p,f)=>{u.jb("Transpose",s,{perm:p?Array.from(i().subarray(p>>>0,f>>>0)):[]})},873488:(s,p,f,b)=>{u.jb("DepthToSpace",s,{blocksize:p,mode:ze(f),format:b?"NHWC":"NCHW"})},873621:(s,p,f,b)=>{u.jb("DepthToSpace",s,{blocksize:p,mode:ze(f),format:b?"NHWC":"NCHW"})},873754:(s,p,f,b,_,I,O,D,L,H,X,fe,be,z,pe)=>{u.jb("ConvTranspose",s,{format:L?"NHWC":"NCHW",autoPad:p,dilations:[f],group:b,kernelShape:[_],pads:[I,O],strides:[D],wIsConst:()=>!!t()[H>>>0],outputPadding:X?Array.from(i().subarray(X>>>0,fe>>>0)):[],outputShape:be?Array.from(i().subarray(be>>>0,z>>>0)):[],activation:ze(pe)})},874155:(s,p,f,b,_,I,O,D,L,H,X,fe,be,z)=>{u.jb("ConvTranspose",s,{format:D?"NHWC":"NCHW",autoPad:p,dilations:Array.from(i().subarray(f>>>0,2+(f>>>0)>>>0)),group:b,kernelShape:Array.from(i().subarray(_>>>0,2+(_>>>0)>>>0)),pads:Array.from(i().subarray(I>>>0,4+(I>>>0)>>>0)),strides:Array.from(i().subarray(O>>>0,2+(O>>>0)>>>0)),wIsConst:()=>!!t()[L>>>0],outputPadding:H?Array.from(i().subarray(H>>>0,X>>>0)):[],outputShape:fe?Array.from(i().subarray(fe>>>0,be>>>0)):[],activation:ze(z)})},874720:(s,p,f,b,_,I,O,D,L,H,X,fe,be,z,pe)=>{u.jb("ConvTranspose",s,{format:L?"NHWC":"NCHW",autoPad:p,dilations:[f],group:b,kernelShape:[_],pads:[I,O],strides:[D],wIsConst:()=>!!t()[H>>>0],outputPadding:X?Array.from(i().subarray(X>>>0,fe>>>0)):[],outputShape:be?Array.from(i().subarray(be>>>0,z>>>0)):[],activation:ze(pe)})},875121:(s,p,f,b,_,I,O,D,L,H,X,fe,be,z)=>{u.jb("ConvTranspose",s,{format:D?"NHWC":"NCHW",autoPad:p,dilations:Array.from(i().subarray(f>>>0,2+(f>>>0)>>>0)),group:b,kernelShape:Array.from(i().subarray(_>>>0,2+(_>>>0)>>>0)),pads:Array.from(i().subarray(I>>>0,4+(I>>>0)>>>0)),strides:Array.from(i().subarray(O>>>0,2+(O>>>0)>>>0)),wIsConst:()=>!!t()[L>>>0],outputPadding:H?Array.from(i().subarray(H>>>0,X>>>0)):[],outputShape:fe?Array.from(i().subarray(fe>>>0,be>>>0)):[],activation:ze(z)})},875686:(s,p)=>{u.jb("GlobalAveragePool",s,{format:p?"NHWC":"NCHW"})},875777:(s,p,f,b,_,I,O,D,L,H,X,fe,be,z)=>{u.jb("AveragePool",s,{format:z?"NHWC":"NCHW",auto_pad:p,ceil_mode:f,count_include_pad:b,storage_order:_,dilations:I?Array.from(i().subarray(I>>>0,O>>>0)):[],kernel_shape:D?Array.from(i().subarray(D>>>0,L>>>0)):[],pads:H?Array.from(i().subarray(H>>>0,X>>>0)):[],strides:fe?Array.from(i().subarray(fe>>>0,be>>>0)):[]})},876192:(s,p)=>{u.jb("GlobalAveragePool",s,{format:p?"NHWC":"NCHW"})},876283:(s,p,f,b,_,I,O,D,L,H,X,fe,be,z)=>{u.jb("AveragePool",s,{format:z?"NHWC":"NCHW",auto_pad:p,ceil_mode:f,count_include_pad:b,storage_order:_,dilations:I?Array.from(i().subarray(I>>>0,O>>>0)):[],kernel_shape:D?Array.from(i().subarray(D>>>0,L>>>0)):[],pads:H?Array.from(i().subarray(H>>>0,X>>>0)):[],strides:fe?Array.from(i().subarray(fe>>>0,be>>>0)):[]})},876698:(s,p)=>{u.jb("GlobalMaxPool",s,{format:p?"NHWC":"NCHW"})},876785:(s,p,f,b,_,I,O,D,L,H,X,fe,be,z)=>{u.jb("MaxPool",s,{format:z?"NHWC":"NCHW",auto_pad:p,ceil_mode:f,count_include_pad:b,storage_order:_,dilations:I?Array.from(i().subarray(I>>>0,O>>>0)):[],kernel_shape:D?Array.from(i().subarray(D>>>0,L>>>0)):[],pads:H?Array.from(i().subarray(H>>>0,X>>>0)):[],strides:fe?Array.from(i().subarray(fe>>>0,be>>>0)):[]})},877196:(s,p)=>{u.jb("GlobalMaxPool",s,{format:p?"NHWC":"NCHW"})},877283:(s,p,f,b,_,I,O,D,L,H,X,fe,be,z)=>{u.jb("MaxPool",s,{format:z?"NHWC":"NCHW",auto_pad:p,ceil_mode:f,count_include_pad:b,storage_order:_,dilations:I?Array.from(i().subarray(I>>>0,O>>>0)):[],kernel_shape:D?Array.from(i().subarray(D>>>0,L>>>0)):[],pads:H?Array.from(i().subarray(H>>>0,X>>>0)):[],strides:fe?Array.from(i().subarray(fe>>>0,be>>>0)):[]})},877694:(s,p,f,b,_)=>{u.jb("Gemm",s,{alpha:p,beta:f,transA:b,transB:_})},877798:s=>{u.jb("MatMul",s,void 0)},877852:(s,p,f,b)=>{u.jb("ArgMax",s,{keepDims:!!p,selectLastIndex:!!f,axis:b})},877960:(s,p,f,b)=>{u.jb("ArgMin",s,{keepDims:!!p,selectLastIndex:!!f,axis:b})},878068:(s,p)=>{u.jb("Softmax",s,{axis:p})},878131:(s,p)=>{u.jb("Concat",s,{axis:p})},878191:(s,p,f,b,_)=>{u.jb("Split",s,{axis:p,numOutputs:f,splitSizes:b?Array.from(i().subarray(b>>>0,_>>>0)):[]})},878331:s=>{u.jb("Expand",s,void 0)},878385:(s,p)=>{u.jb("Gather",s,{axis:Number(p)})},878456:(s,p)=>{u.jb("GatherElements",s,{axis:Number(p)})},878535:(s,p,f,b,_,I,O,D,L,H,X)=>{u.jb("Resize",s,{antialias:p,axes:f?Array.from(i().subarray(f>>>0,b>>>0)):[],coordinateTransformMode:ze(_),cubicCoeffA:I,excludeOutside:O,extrapolationValue:D,keepAspectRatioPolicy:ze(L),mode:ze(H),nearestMode:ze(X)})},878881:(s,p,f,b,_,I,O)=>{u.jb("Slice",s,{starts:p?Array.from(i().subarray(p>>>0,f>>>0)):[],ends:b?Array.from(i().subarray(b>>>0,_>>>0)):[],axes:I?Array.from(i().subarray(I>>>0,O>>>0)):[]})},879097:s=>{u.jb("Tile",s,void 0)},879149:(s,p,f)=>{u.jb("InstanceNormalization",s,{epsilon:p,format:f?"NHWC":"NCHW"})},879263:(s,p,f)=>{u.jb("InstanceNormalization",s,{epsilon:p,format:f?"NHWC":"NCHW"})},879377:s=>{u.jb("Range",s,void 0)},879430:(s,p)=>{u.jb("Einsum",s,{equation:ze(p)})},879511:(s,p,f,b,_)=>{u.jb("Pad",s,{mode:p,value:f,pads:b?Array.from(i().subarray(b>>>0,_>>>0)):[]})},879638:(s,p,f,b,_,I)=>{u.jb("BatchNormalization",s,{epsilon:p,momentum:f,spatial:!!_,trainingMode:!!b,format:I?"NHWC":"NCHW"})},879807:(s,p,f,b,_,I)=>{u.jb("BatchNormalization",s,{epsilon:p,momentum:f,spatial:!!_,trainingMode:!!b,format:I?"NHWC":"NCHW"})},879976:(s,p,f)=>{u.jb("CumSum",s,{exclusive:Number(p),reverse:Number(f)})},880073:(s,p,f)=>{u.jb("DequantizeLinear",s,{axis:p,blockSize:f})},880163:(s,p,f,b,_,I,O,D,L)=>{u.jb("Attention",s,{numHeads:p,isUnidirectional:f,maskFilterValue:b,scale:_,doRotary:I,qkvHiddenSizes:O?Array.from(i().subarray(Number(D)>>>0,Number(D)+O>>>0)):[],pastPresentShareBuffer:!!L})},880435:s=>{u.jb("BiasAdd",s,void 0)},880490:s=>{u.jb("BiasSplitGelu",s,void 0)},880551:s=>{u.jb("FastGelu",s,void 0)},880607:(s,p,f,b,_,I,O,D,L,H,X,fe,be,z,pe,Se)=>{u.jb("Conv",s,{format:fe?"NHWC":"NCHW",auto_pad:p,dilations:f?Array.from(i().subarray(f>>>0,b>>>0)):[],group:_,kernel_shape:I?Array.from(i().subarray(I>>>0,O>>>0)):[],pads:D?Array.from(i().subarray(D>>>0,L>>>0)):[],strides:H?Array.from(i().subarray(H>>>0,X>>>0)):[],w_is_const:()=>!!t()[be>>>0],activation:ze(z),activation_params:pe?Array.from(d().subarray(pe>>>0,Se>>>0)):[]})},881103:s=>{u.jb("Gelu",s,void 0)},881155:(s,p,f,b)=>{u.jb("GroupQueryAttention",s,{numHeads:p,kvNumHeads:f,scale:b})},881268:(s,p,f,b)=>{u.jb("LayerNormalization",s,{axis:p,epsilon:f,simplified:!!b})},881379:(s,p,f,b)=>{u.jb("LayerNormalization",s,{axis:p,epsilon:f,simplified:!!b})},881490:(s,p,f,b,_,I)=>{u.jb("MatMulNBits",s,{k:p,n:f,accuracyLevel:b,bits:_,blockSize:I})},881617:(s,p,f,b,_,I)=>{u.jb("MultiHeadAttention",s,{numHeads:p,isUnidirectional:f,maskFilterValue:b,scale:_,doRotary:I})},881776:(s,p)=>{u.jb("QuickGelu",s,{alpha:p})},881840:(s,p,f,b,_)=>{u.jb("RotaryEmbedding",s,{interleaved:!!p,numHeads:f,rotaryEmbeddingDim:b,scale:_})},881979:(s,p,f)=>{u.jb("SkipLayerNormalization",s,{epsilon:p,simplified:!!f})},882081:(s,p,f)=>{u.jb("SkipLayerNormalization",s,{epsilon:p,simplified:!!f})},882183:(s,p,f,b)=>{u.jb("GatherBlockQuantized",s,{gatherAxis:p,quantizeAxis:f,blockSize:b})},882304:s=>{u.Zb(s)},882338:(s,p)=>u.bc(s,p,u.Eb.fc,u.Eb.errors)};function nc(s,p,f){return yi(async()=>{await u.Xb(s,p,f)})}function oc(){return typeof wasmOffsetConverter<"u"}function yn(s){this.name="ExitStatus",this.message=`Program terminated with exit(${s})`,this.status=s}var bn=s=>{s.terminate(),s.onmessage=()=>{}},Uo=s=>{pt.length==0&&(Go(),Ho(pt[0]));var p=pt.pop();if(!p)return 6;vt.push(p),Qe[s.Ab]=p,p.Ab=s.Ab;var f={cmd:"run",start_routine:s.hc,arg:s.Qb,pthread_ptr:s.Ab};return p.postMessage(f,s.mc),0},_t=0,xe=(s,p,...f)=>{for(var b=2*f.length,_=Rn(),I=Mn(8*b),O=I>>>3,D=0;D<f.length;D++){var L=f[D];typeof L=="bigint"?(G[O+2*D]=1n,G[O+2*D+1]=L):(G[O+2*D]=0n,l()[O+2*D+1>>>0]=L)}return s=Wi(s,0,b,I,p),yr(_),s};function wn(s){if(y)return xe(0,1,s);if(le=s,!(0<_t)){for(var p of vt)bn(p);for(p of pt)bn(p);pt=[],vt=[],Qe=[],$e=!0}A(s,new yn(s))}function Vo(s){if(y)return xe(1,0,s);_n(s)}var _n=s=>{if(le=s,y)throw Vo(s),"unwind";wn(s)},pt=[],vt=[],No=[],Qe={},Wo=s=>{var p=s.Ab;delete Qe[p],pt.push(s),vt.splice(vt.indexOf(s),1),s.Ab=0,Dn(p)};function Lo(){No.forEach(s=>s())}var Ho=s=>new Promise(p=>{s.onmessage=_=>{var I=(_=_.data).cmd;if(_.targetThread&&_.targetThread!=Rt()){var O=Qe[_.targetThread];O?O.postMessage(_,_.transferList):Z(`Internal error! Worker sent a message "${I}" to target pthread ${_.targetThread}, but that thread no longer exists!`)}else I==="checkMailbox"?sr():I==="spawnThread"?Uo(_):I==="cleanupThread"?Wo(Qe[_.thread]):I==="killThread"?(_=_.thread,I=Qe[_],delete Qe[_],bn(I),Dn(_),vt.splice(vt.indexOf(I),1),I.Ab=0):I==="cancelThread"?Qe[_.thread].postMessage({cmd:"cancel"}):I==="loaded"?(s.loaded=!0,p(s)):I==="alert"?alert(`Thread ${_.threadId}: ${_.text}`):_.target==="setimmediate"?s.postMessage(_):I==="callHandler"?u[_.handler](..._.args):I&&Z(`worker sent an unknown command ${I}`)},s.onerror=_=>{throw Z(`worker sent an error! ${_.filename}:${_.lineno}: ${_.message}`),_};var f,b=[];for(f of[])u.hasOwnProperty(f)&&b.push(f);s.postMessage({cmd:"load",handlers:b,wasmMemory:de,wasmModule:Y})});function Go(){var s=new Worker(new URL(import.meta.url),{type:"module",workerData:"em-pthread",name:"em-pthread"});pt.push(s)}var ar=s=>{for(;0<s.length;)s.shift()(u)},ic=()=>{var s=Rt(),p=a()[s+52>>>2>>>0];s=a()[s+56>>>2>>>0],Hi(p,p-s),yr(p)},ac=(s,p)=>{_t=0,s=Gi(s,p),0<_t?le=s:gr(s)};class sc{constructor(p){this.Jb=p-24}}function uc(s,p,f){var b=new sc(s>>>=0);throw p>>>=0,f>>>=0,a()[b.Jb+16>>>2>>>0]=0,a()[b.Jb+4>>>2>>>0]=p,a()[b.Jb+8>>>2>>>0]=f,s}function Fo(s,p,f,b){return y?xe(2,1,s,p,f,b):qo(s,p,f,b)}function qo(s,p,f,b){if(s>>>=0,p>>>=0,f>>>=0,b>>>=0,S===void 0)return Z("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var _=[];return y&&_.length===0?Fo(s,p,f,b):(s={hc:f,Ab:s,Qb:b,mc:_},y?(s.Mb="spawnThread",postMessage(s,_),0):Uo(s))}var jo=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,Ko=(s,p,f)=>{var b=(p>>>=0)+f;for(f=p;s[f]&&!(f>=b);)++f;if(16<f-p&&s.buffer&&jo)return jo.decode(s.buffer instanceof S?s.slice(p,f):s.subarray(p,f));for(b="";p<f;){var _=s[p++];if(128&_){var I=63&s[p++];if((224&_)==192)b+=String.fromCharCode((31&_)<<6|I);else{var O=63&s[p++];65536>(_=(240&_)==224?(15&_)<<12|I<<6|O:(7&_)<<18|I<<12|O<<6|63&s[p++])?b+=String.fromCharCode(_):(_-=65536,b+=String.fromCharCode(55296|_>>10,56320|1023&_))}}else b+=String.fromCharCode(_)}return b},ze=(s,p)=>(s>>>=0)?Ko(r(),s,p):"";function Yo(s,p,f){return y?xe(3,1,s,p,f):0}function Xo(s,p){if(y)return xe(4,1,s,p)}var vn=s=>{for(var p=0,f=0;f<s.length;++f){var b=s.charCodeAt(f);127>=b?p++:2047>=b?p+=2:55296<=b&&57343>=b?(p+=4,++f):p+=3}return p},Zo=(s,p,f,b)=>{if(!(0<b))return 0;var _=f>>>=0;b=f+b-1;for(var I=0;I<s.length;++I){var O=s.charCodeAt(I);if(55296<=O&&57343>=O&&(O=65536+((1023&O)<<10)|1023&s.charCodeAt(++I)),127>=O){if(f>=b)break;p[f++>>>0]=O}else{if(2047>=O){if(f+1>=b)break;p[f++>>>0]=192|O>>6}else{if(65535>=O){if(f+2>=b)break;p[f++>>>0]=224|O>>12}else{if(f+3>=b)break;p[f++>>>0]=240|O>>18,p[f++>>>0]=128|O>>12&63}p[f++>>>0]=128|O>>6&63}p[f++>>>0]=128|63&O}}return p[f>>>0]=0,f-_},Bt=(s,p,f)=>Zo(s,r(),p,f);function Qo(s,p){if(y)return xe(5,1,s,p)}function Jo(s,p,f){if(y)return xe(6,1,s,p,f)}function ei(s,p,f){return y?xe(7,1,s,p,f):0}function ti(s,p){if(y)return xe(8,1,s,p)}function ri(s,p,f){if(y)return xe(9,1,s,p,f)}function ni(s,p,f,b){if(y)return xe(10,1,s,p,f,b)}function oi(s,p,f,b){if(y)return xe(11,1,s,p,f,b)}function ii(s,p,f,b){if(y)return xe(12,1,s,p,f,b)}function ai(s){if(y)return xe(13,1,s)}function si(s,p){if(y)return xe(14,1,s,p)}function ui(s,p,f){if(y)return xe(15,1,s,p,f)}var di,mt,dc=()=>{Ot("")},Je=s=>{for(var p="";r()[s>>>0];)p+=di[r()[s++>>>0]];return p},$n={},xn={},lc={};function ut(s,p,f={}){if(!("argPackAdvance"in p))throw new TypeError("registerType registeredInstance requires argPackAdvance");return function(b,_,I={}){var O=_.name;if(!b)throw new mt(`type "${O}" must have a positive integer typeid pointer`);if(xn.hasOwnProperty(b)){if(I.Sb)return;throw new mt(`Cannot register type '${O}' twice`)}xn[b]=_,delete lc[b],$n.hasOwnProperty(b)&&(_=$n[b],delete $n[b],_.forEach(D=>D()))}(s,p,f)}var li=(s,p,f)=>{switch(p){case 1:return f?b=>t()[b>>>0]:b=>r()[b>>>0];case 2:return f?b=>n()[b>>>1>>>0]:b=>o()[b>>>1>>>0];case 4:return f?b=>i()[b>>>2>>>0]:b=>a()[b>>>2>>>0];case 8:return f?b=>G[b>>>3]:b=>ye[b>>>3];default:throw new TypeError(`invalid integer width (${p}): ${s}`)}};function cc(s,p,f){f>>>=0,ut(s>>>=0,{name:p=Je(p>>>0),fromWireType:b=>b,toWireType:function(b,_){if(typeof _!="bigint"&&typeof _!="number")throw _=_===null?"null":(b=typeof _)=="object"||b==="array"||b==="function"?_.toString():""+_,new TypeError(`Cannot convert "${_}" to ${this.name}`);return typeof _=="number"&&(_=BigInt(_)),_},argPackAdvance:ft,readValueFromPointer:li(p,f,p.indexOf("u")==-1),Db:null})}var ft=8;function pc(s,p,f,b){ut(s>>>=0,{name:p=Je(p>>>0),fromWireType:function(_){return!!_},toWireType:function(_,I){return I?f:b},argPackAdvance:ft,readValueFromPointer:function(_){return this.fromWireType(r()[_>>>0])},Db:null})}var Sn=[],dt=[];function Tn(s){9<(s>>>=0)&&--dt[s+1]==0&&(dt[s]=void 0,Sn.push(s))}var qe=s=>{if(!s)throw new mt("Cannot use deleted val. handle = "+s);return dt[s]},je=s=>{switch(s){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let p=Sn.pop()||dt.length;return dt[p]=s,dt[p+1]=1,p}};function In(s){return this.fromWireType(a()[s>>>2>>>0])}var mc={name:"emscripten::val",fromWireType:s=>{var p=qe(s);return Tn(s),p},toWireType:(s,p)=>je(p),argPackAdvance:ft,readValueFromPointer:In,Db:null};function fc(s){return ut(s>>>0,mc)}var hc=(s,p)=>{switch(p){case 4:return function(f){return this.fromWireType(d()[f>>>2>>>0])};case 8:return function(f){return this.fromWireType(l()[f>>>3>>>0])};default:throw new TypeError(`invalid float width (${p}): ${s}`)}};function gc(s,p,f){f>>>=0,ut(s>>>=0,{name:p=Je(p>>>0),fromWireType:b=>b,toWireType:(b,_)=>_,argPackAdvance:ft,readValueFromPointer:hc(p,f),Db:null})}function yc(s,p,f,b,_){if(s>>>=0,f>>>=0,p=Je(p>>>0),_===-1&&(_=4294967295),_=D=>D,b===0){var I=32-8*f;_=D=>D<<I>>>I}var O=p.includes("unsigned")?function(D,L){return L>>>0}:function(D,L){return L};ut(s,{name:p,fromWireType:_,toWireType:O,argPackAdvance:ft,readValueFromPointer:li(p,f,b!==0),Db:null})}function bc(s,p,f){function b(I){var O=a()[I>>>2>>>0];return I=a()[I+4>>>2>>>0],new _(t().buffer,I,O)}var _=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][p];ut(s>>>=0,{name:f=Je(f>>>0),fromWireType:b,argPackAdvance:ft,readValueFromPointer:b},{Sb:!0})}function wc(s,p){s>>>=0;var f=(p=Je(p>>>0))==="std::string";ut(s,{name:p,fromWireType:function(b){var _=a()[b>>>2>>>0],I=b+4;if(f)for(var O=I,D=0;D<=_;++D){var L=I+D;if(D==_||r()[L>>>0]==0){if(O=ze(O,L-O),H===void 0)var H=O;else H+=String.fromCharCode(0),H+=O;O=L+1}}else{for(H=Array(_),D=0;D<_;++D)H[D]=String.fromCharCode(r()[I+D>>>0]);H=H.join("")}return tt(b),H},toWireType:function(b,_){_ instanceof ArrayBuffer&&(_=new Uint8Array(_));var I=typeof _=="string";if(!(I||_ instanceof Uint8Array||_ instanceof Uint8ClampedArray||_ instanceof Int8Array))throw new mt("Cannot pass non-string to std::string");var O=f&&I?vn(_):_.length,D=hr(4+O+1),L=D+4;if(a()[D>>>2>>>0]=O,f&&I)Bt(_,L,O+1);else if(I)for(I=0;I<O;++I){var H=_.charCodeAt(I);if(255<H)throw tt(L),new mt("String has UTF-16 code units that do not fit in 8 bits");r()[L+I>>>0]=H}else for(I=0;I<O;++I)r()[L+I>>>0]=_[I];return b!==null&&b.push(tt,D),D},argPackAdvance:ft,readValueFromPointer:In,Db(b){tt(b)}})}var ci=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,_c=(s,p)=>{for(var f=s>>1,b=f+p/2;!(f>=b)&&o()[f>>>0];)++f;if(32<(f<<=1)-s&&ci)return ci.decode(r().slice(s,f));for(f="",b=0;!(b>=p/2);++b){var _=n()[s+2*b>>>1>>>0];if(_==0)break;f+=String.fromCharCode(_)}return f},vc=(s,p,f)=>{if(f??=2147483647,2>f)return 0;var b=p;f=(f-=2)<2*s.length?f/2:s.length;for(var _=0;_<f;++_){var I=s.charCodeAt(_);n()[p>>>1>>>0]=I,p+=2}return n()[p>>>1>>>0]=0,p-b},$c=s=>2*s.length,xc=(s,p)=>{for(var f=0,b="";!(f>=p/4);){var _=i()[s+4*f>>>2>>>0];if(_==0)break;++f,65536<=_?(_-=65536,b+=String.fromCharCode(55296|_>>10,56320|1023&_)):b+=String.fromCharCode(_)}return b},Sc=(s,p,f)=>{if(p>>>=0,f??=2147483647,4>f)return 0;var b=p;f=b+f-4;for(var _=0;_<s.length;++_){var I=s.charCodeAt(_);if(55296<=I&&57343>=I&&(I=65536+((1023&I)<<10)|1023&s.charCodeAt(++_)),i()[p>>>2>>>0]=I,(p+=4)+4>f)break}return i()[p>>>2>>>0]=0,p-b},Tc=s=>{for(var p=0,f=0;f<s.length;++f){var b=s.charCodeAt(f);55296<=b&&57343>=b&&++f,p+=4}return p};function Ic(s,p,f){if(s>>>=0,p>>>=0,f=Je(f>>>=0),p===2)var b=_c,_=vc,I=$c,O=D=>o()[D>>>1>>>0];else p===4&&(b=xc,_=Sc,I=Tc,O=D=>a()[D>>>2>>>0]);ut(s,{name:f,fromWireType:D=>{for(var L,H=a()[D>>>2>>>0],X=D+4,fe=0;fe<=H;++fe){var be=D+4+fe*p;fe!=H&&O(be)!=0||(X=b(X,be-X),L===void 0?L=X:(L+=String.fromCharCode(0),L+=X),X=be+p)}return tt(D),L},toWireType:(D,L)=>{if(typeof L!="string")throw new mt(`Cannot pass non-string to C++ string type ${f}`);var H=I(L),X=hr(4+H+p);return a()[X>>>2>>>0]=H/p,_(L,X+4,H+p),D!==null&&D.push(tt,X),X},argPackAdvance:ft,readValueFromPointer:In,Db(D){tt(D)}})}function Cc(s,p){ut(s>>>=0,{Tb:!0,name:p=Je(p>>>0),argPackAdvance:0,fromWireType:()=>{},toWireType:()=>{}})}var Ac=()=>1;function kc(s){Bn(s>>>0,!g,1,!w,131072,!1),Lo()}var pi=s=>{if(!$e)try{if(s(),!(0<_t))try{y?gr(le):_n(le)}catch(p){p instanceof yn||p=="unwind"||A(1,p)}}catch(p){p instanceof yn||p=="unwind"||A(1,p)}};function Cn(s){s>>>=0,typeof Atomics.nc=="function"&&(Atomics.nc(i(),s>>>2,s).value.then(sr),s+=128,Atomics.store(i(),s>>>2,1))}var sr=()=>{var s=Rt();s&&(Cn(s),pi(Li))};function Ec(s,p){(s>>>=0)==p>>>0?setTimeout(sr):y?postMessage({targetThread:s,cmd:"checkMailbox"}):(s=Qe[s])&&s.postMessage({cmd:"checkMailbox"})}var An=[];function Pc(s,p,f,b,_){for(p>>>=0,b/=2,An.length=b,f=_>>>0>>>3,_=0;_<b;_++)An[_]=G[f+2*_]?G[f+2*_+1]:l()[f+2*_+1>>>0];return(p?gn[p]:_p[s])(...An)}function zc(s){s>>>=0,y?postMessage({cmd:"cleanupThread",thread:s}):Wo(Qe[s])}function Oc(s){}var kn=(s,p)=>{var f=xn[s];if(f===void 0)throw s=Ui(s),f=Je(s),tt(s),new mt(`${p} has unknown type ${f}`);return f},mi=(s,p,f)=>{var b=[];return s=s.toWireType(b,f),b.length&&(a()[p>>>2>>>0]=je(b)),s};function Bc(s,p,f){return p>>>=0,f>>>=0,s=qe(s>>>0),p=kn(p,"emval::as"),mi(p,f,s)}var ur=s=>{try{s()}catch(p){Ot(p)}},ht=0,et=null,fi=0,dr=[],hi={},gi={},Dc=0,En=null,Mc=[];function yi(s){return function(p){if(!$e){if(ht===0){var f=!1,b=!1;p((_=0)=>{if(!$e&&(fi=_,f=!0,b)){ht=2,ur(()=>ji(et)),typeof Browser<"u"&&Browser.Kb.Rb&&Browser.Kb.resume(),_=!1;try{var I=function(){var L=i()[et+8>>>2>>>0];return L=j[gi[L]],--_t,L()}()}catch(L){I=L,_=!0}var O=!1;if(!et){var D=En;D&&(En=null,(_?D.reject:D.resolve)(I),O=!0)}if(_&&!O)throw I}}),b=!0,f||(ht=1,et=function(){var _=hr(65548),I=_+12;a()[_>>>2>>>0]=I,a()[_+4>>>2>>>0]=I+65536,I=dr[0];var O=hi[I];return O===void 0&&(O=Dc++,hi[I]=O,gi[O]=I),I=O,i()[_+8>>>2>>>0]=I,_}(),typeof Browser<"u"&&Browser.Kb.Rb&&Browser.Kb.pause(),ur(()=>Fi(et)))}else ht===2?(ht=0,ur(Ki),tt(et),et=null,Mc.forEach(pi)):Ot(`invalid state: ${ht}`);return fi}}(p=>{s().then(p)})}function Rc(s){return s>>>=0,yi(()=>(s=qe(s)).then(je))}var lr=[];function Uc(s,p,f,b){return f>>>=0,b>>>=0,(s=lr[s>>>0])(null,p=qe(p>>>0),f,b)}var Vc={},cr=s=>{var p=Vc[s];return p===void 0?Je(s):p};function Nc(s,p,f,b,_){return f>>>=0,b>>>=0,_>>>=0,(s=lr[s>>>0])(p=qe(p>>>0),p[f=cr(f)],b,_)}var bi=()=>typeof globalThis=="object"?globalThis:Function("return this")();function Wc(s){return(s>>>=0)==0?je(bi()):(s=cr(s),je(bi()[s]))}var Lc=s=>{var p=lr.length;return lr.push(s),p},Hc=(s,p)=>{for(var f=Array(s),b=0;b<s;++b)f[b]=kn(a()[p+4*b>>>2>>>0],"parameter "+b);return f},wi=(s,p)=>Object.defineProperty(p,"name",{value:s});function Gc(s,p,f){var b=(p=Hc(s,p>>>0)).shift();s--;var _=`return function (obj, func, destructorsRef, args) {
`,I=0,O=[];f===0&&O.push("obj");for(var D=["retType"],L=[b],H=0;H<s;++H)O.push("arg"+H),D.push("argType"+H),L.push(p[H]),_+=`  var arg${H} = argType${H}.readValueFromPointer(args${I?"+"+I:""});
`,I+=p[H].argPackAdvance;return _+=`  var rv = ${f===1?"new func":"func.call"}(${O.join(", ")});
`,b.Tb||(D.push("emval_returnValue"),L.push(mi),_+=`  return emval_returnValue(retType, destructorsRef, rv);
`),D.push(_+`};
`),s=function(X){var fe=Function;if(!(fe instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof fe} which is not a function`);var be=wi(fe.name||"unknownFunctionName",function(){});return be.prototype=fe.prototype,be=new be,(X=fe.apply(be,X))instanceof Object?X:be}(D)(...L),f=`methodCaller<(${p.map(X=>X.name).join(", ")}) => ${b.name}>`,Lc(wi(f,s))}function Fc(s){return s=cr(s>>>0),je(u[s])}function qc(s,p){return p>>>=0,s=qe(s>>>0),p=qe(p),je(s[p])}function jc(s){9<(s>>>=0)&&(dt[s+1]+=1)}function Kc(){return je([])}function Yc(s){s=qe(s>>>0);for(var p=Array(s.length),f=0;f<s.length;f++)p[f]=s[f];return je(p)}function Xc(s){return je(cr(s>>>0))}function Zc(){return je({})}function Qc(s){for(var p=qe(s>>>=0);p.length;){var f=p.pop();p.pop()(f)}Tn(s)}function Jc(s,p,f){p>>>=0,f>>>=0,s=qe(s>>>0),p=qe(p),f=qe(f),s[p]=f}function ep(s,p){return p>>>=0,s=(s=kn(s>>>0,"_emval_take_value")).readValueFromPointer(p),je(s)}function tp(s,p){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),p>>>=0,s=new Date(1e3*s),i()[p>>>2>>>0]=s.getUTCSeconds(),i()[p+4>>>2>>>0]=s.getUTCMinutes(),i()[p+8>>>2>>>0]=s.getUTCHours(),i()[p+12>>>2>>>0]=s.getUTCDate(),i()[p+16>>>2>>>0]=s.getUTCMonth(),i()[p+20>>>2>>>0]=s.getUTCFullYear()-1900,i()[p+24>>>2>>>0]=s.getUTCDay(),s=(s.getTime()-Date.UTC(s.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,i()[p+28>>>2>>>0]=s}var Dt=s=>s%4==0&&(s%100!=0||s%400==0),_i=[0,31,60,91,121,152,182,213,244,274,305,335],vi=[0,31,59,90,120,151,181,212,243,273,304,334];function rp(s,p){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),p>>>=0,s=new Date(1e3*s),i()[p>>>2>>>0]=s.getSeconds(),i()[p+4>>>2>>>0]=s.getMinutes(),i()[p+8>>>2>>>0]=s.getHours(),i()[p+12>>>2>>>0]=s.getDate(),i()[p+16>>>2>>>0]=s.getMonth(),i()[p+20>>>2>>>0]=s.getFullYear()-1900,i()[p+24>>>2>>>0]=s.getDay();var f=(Dt(s.getFullYear())?_i:vi)[s.getMonth()]+s.getDate()-1|0;i()[p+28>>>2>>>0]=f,i()[p+36>>>2>>>0]=-60*s.getTimezoneOffset(),f=new Date(s.getFullYear(),6,1).getTimezoneOffset();var b=new Date(s.getFullYear(),0,1).getTimezoneOffset();s=0|(f!=b&&s.getTimezoneOffset()==Math.min(b,f)),i()[p+32>>>2>>>0]=s}function np(s){s>>>=0;var p=new Date(i()[s+20>>>2>>>0]+1900,i()[s+16>>>2>>>0],i()[s+12>>>2>>>0],i()[s+8>>>2>>>0],i()[s+4>>>2>>>0],i()[s>>>2>>>0],0),f=i()[s+32>>>2>>>0],b=p.getTimezoneOffset(),_=new Date(p.getFullYear(),6,1).getTimezoneOffset(),I=new Date(p.getFullYear(),0,1).getTimezoneOffset(),O=Math.min(I,_);return 0>f?i()[s+32>>>2>>>0]=+(_!=I&&O==b):0<f!=(O==b)&&(_=Math.max(I,_),p.setTime(p.getTime()+6e4*((0<f?O:_)-b))),i()[s+24>>>2>>>0]=p.getDay(),f=(Dt(p.getFullYear())?_i:vi)[p.getMonth()]+p.getDate()-1|0,i()[s+28>>>2>>>0]=f,i()[s>>>2>>>0]=p.getSeconds(),i()[s+4>>>2>>>0]=p.getMinutes(),i()[s+8>>>2>>>0]=p.getHours(),i()[s+12>>>2>>>0]=p.getDate(),i()[s+16>>>2>>>0]=p.getMonth(),i()[s+20>>>2>>>0]=p.getYear(),s=p.getTime(),BigInt(isNaN(s)?-1:s/1e3)}function $i(s,p,f,b,_,I,O){return y?xe(16,1,s,p,f,b,_,I,O):-52}function xi(s,p,f,b,_,I){if(y)return xe(17,1,s,p,f,b,_,I)}function op(s,p,f,b){s>>>=0,p>>>=0,f>>>=0,b>>>=0;var _=new Date().getFullYear(),I=new Date(_,0,1),O=new Date(_,6,1);_=I.getTimezoneOffset();var D=O.getTimezoneOffset(),L=Math.max(_,D);a()[s>>>2>>>0]=60*L,i()[p>>>2>>>0]=+(_!=D),I=(s=H=>H.toLocaleTimeString(void 0,{hour12:!1,timeZoneName:"short"}).split(" ")[1])(I),O=s(O),D<_?(Bt(I,f,17),Bt(O,b,17)):(Bt(I,b,17),Bt(O,f,17))}var Pn=[],Si=(s,p)=>{Pn.length=0;for(var f;f=r()[s++>>>0];){var b=f!=105;p+=(b&=f!=112)&&p%8?4:0,Pn.push(f==112?a()[p>>>2>>>0]:f==106?G[p>>>3]:f==105?i()[p>>>2>>>0]:l()[p>>>3>>>0]),p+=b?8:4}return Pn};function ip(s,p,f){return s>>>=0,p=Si(p>>>0,f>>>0),gn[s](...p)}function ap(s,p,f){return s>>>=0,p=Si(p>>>0,f>>>0),gn[s](...p)}var sp=()=>{},up=()=>Date.now();function dp(s,p){return Z(ze(s>>>0,p>>>0))}var Ti,lp=()=>{throw _t+=1,"unwind"};function cp(){return 4294901760}Ti=()=>performance.timeOrigin+performance.now();var pp=()=>navigator.hardwareConcurrency;function mp(){return Ot("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function fp(s){s>>>=0;var p=r().length;if(s<=p||4294901760<s)return!1;for(var f=1;4>=f;f*=2){var b=p*(1+.2/f);b=Math.min(b,s+100663296);var _=Math;b=Math.max(s,b);e:{_=(_.min.call(_,4294901760,b+(65536-b%65536)%65536)-de.buffer.byteLength+65535)/65536;try{de.grow(_),Ce();var I=1;break e}catch{}I=void 0}if(I)return!0}return!1}var pr=()=>(Ot("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Mt={},Ii=s=>{s.forEach(p=>{var f=pr();f&&(Mt[f]=p)})};function hp(){var s=Error().stack.toString().split(`
`);return s[0]=="Error"&&s.shift(),Ii(s),Mt.Pb=pr(),Mt.ec=s,Mt.Pb}function gp(s,p,f){if(s>>>=0,p>>>=0,Mt.Pb==s)var b=Mt.ec;else(b=Error().stack.toString().split(`
`))[0]=="Error"&&b.shift(),Ii(b);for(var _=3;b[_]&&pr()!=s;)++_;for(s=0;s<f&&b[s+_];++s)i()[p+4*s>>>2>>>0]=pr();return s}var zn,On={},Ci=()=>{if(!zn){var s,p={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:C||"./this.program"};for(s in On)On[s]===void 0?delete p[s]:p[s]=On[s];var f=[];for(s in p)f.push(`${s}=${p[s]}`);zn=f}return zn};function Ai(s,p){if(y)return xe(18,1,s,p);s>>>=0,p>>>=0;var f=0;return Ci().forEach((b,_)=>{var I=p+f;for(_=a()[s+4*_>>>2>>>0]=I,I=0;I<b.length;++I)t()[_++>>>0]=b.charCodeAt(I);t()[_>>>0]=0,f+=b.length+1}),0}function ki(s,p){if(y)return xe(19,1,s,p);s>>>=0,p>>>=0;var f=Ci();a()[s>>>2>>>0]=f.length;var b=0;return f.forEach(_=>b+=_.length+1),a()[p>>>2>>>0]=b,0}function Ei(s){return y?xe(20,1,s):52}function Pi(s,p,f,b){return y?xe(21,1,s,p,f,b):52}function zi(s,p,f,b){return y?xe(22,1,s,p,f,b):70}var yp=[null,[],[]];function Oi(s,p,f,b){if(y)return xe(23,1,s,p,f,b);p>>>=0,f>>>=0,b>>>=0;for(var _=0,I=0;I<f;I++){var O=a()[p>>>2>>>0],D=a()[p+4>>>2>>>0];p+=8;for(var L=0;L<D;L++){var H=r()[O+L>>>0],X=yp[s];H===0||H===10?((s===1?K:Z)(Ko(X,0)),X.length=0):X.push(H)}_+=D}return a()[b>>>2>>>0]=_,0}var Bi=[31,29,31,30,31,30,31,31,30,31,30,31],Di=[31,28,31,30,31,30,31,31,30,31,30,31],bp=(s,p)=>{t().set(s,p>>>0)};function Mi(s,p,f,b){function _(z,pe,Se){for(z=typeof z=="number"?z.toString():z||"";z.length<pe;)z=Se[0]+z;return z}function I(z,pe){return _(z,pe,"0")}function O(z,pe){function Se(Xi){return 0>Xi?-1:0<Xi?1:0}var $t;return($t=Se(z.getFullYear()-pe.getFullYear()))===0&&($t=Se(z.getMonth()-pe.getMonth()))===0&&($t=Se(z.getDate()-pe.getDate())),$t}function D(z){switch(z.getDay()){case 0:return new Date(z.getFullYear()-1,11,29);case 1:return z;case 2:return new Date(z.getFullYear(),0,3);case 3:return new Date(z.getFullYear(),0,2);case 4:return new Date(z.getFullYear(),0,1);case 5:return new Date(z.getFullYear()-1,11,31);case 6:return new Date(z.getFullYear()-1,11,30)}}function L(z){var pe=z.Bb;for(z=new Date(new Date(z.Cb+1900,0,1).getTime());0<pe;){var Se=z.getMonth(),$t=(Dt(z.getFullYear())?Bi:Di)[Se];if(!(pe>$t-z.getDate())){z.setDate(z.getDate()+pe);break}pe-=$t-z.getDate()+1,z.setDate(1),11>Se?z.setMonth(Se+1):(z.setMonth(0),z.setFullYear(z.getFullYear()+1))}return Se=new Date(z.getFullYear()+1,0,4),pe=D(new Date(z.getFullYear(),0,4)),Se=D(Se),0>=O(pe,z)?0>=O(Se,z)?z.getFullYear()+1:z.getFullYear():z.getFullYear()-1}s>>>=0,p>>>=0,f>>>=0,b>>>=0;var H=a()[b+40>>>2>>>0];for(var X in b={kc:i()[b>>>2>>>0],jc:i()[b+4>>>2>>>0],Hb:i()[b+8>>>2>>>0],Lb:i()[b+12>>>2>>>0],Ib:i()[b+16>>>2>>>0],Cb:i()[b+20>>>2>>>0],ub:i()[b+24>>>2>>>0],Bb:i()[b+28>>>2>>>0],rc:i()[b+32>>>2>>>0],ic:i()[b+36>>>2>>>0],lc:H?ze(H):""},f=ze(f),H={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"})f=f.replace(new RegExp(X,"g"),H[X]);var fe="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),be="January February March April May June July August September October November December".split(" ");for(X in H={"%a":z=>fe[z.ub].substring(0,3),"%A":z=>fe[z.ub],"%b":z=>be[z.Ib].substring(0,3),"%B":z=>be[z.Ib],"%C":z=>I((z.Cb+1900)/100|0,2),"%d":z=>I(z.Lb,2),"%e":z=>_(z.Lb,2," "),"%g":z=>L(z).toString().substring(2),"%G":L,"%H":z=>I(z.Hb,2),"%I":z=>((z=z.Hb)==0?z=12:12<z&&(z-=12),I(z,2)),"%j":z=>{for(var pe=0,Se=0;Se<=z.Ib-1;pe+=(Dt(z.Cb+1900)?Bi:Di)[Se++]);return I(z.Lb+pe,3)},"%m":z=>I(z.Ib+1,2),"%M":z=>I(z.jc,2),"%n":()=>`
`,"%p":z=>0<=z.Hb&&12>z.Hb?"AM":"PM","%S":z=>I(z.kc,2),"%t":()=>"	","%u":z=>z.ub||7,"%U":z=>I(Math.floor((z.Bb+7-z.ub)/7),2),"%V":z=>{var pe=Math.floor((z.Bb+7-(z.ub+6)%7)/7);if(2>=(z.ub+371-z.Bb-2)%7&&pe++,pe)pe==53&&((Se=(z.ub+371-z.Bb)%7)==4||Se==3&&Dt(z.Cb)||(pe=1));else{pe=52;var Se=(z.ub+7-z.Bb-1)%7;(Se==4||Se==5&&Dt(z.Cb%400-1))&&pe++}return I(pe,2)},"%w":z=>z.ub,"%W":z=>I(Math.floor((z.Bb+7-(z.ub+6)%7)/7),2),"%y":z=>(z.Cb+1900).toString().substring(2),"%Y":z=>z.Cb+1900,"%z":z=>{var pe=0<=(z=z.ic);return z=Math.abs(z)/60,(pe?"+":"-")+("0000"+(z/60*100+z%60)).slice(-4)},"%Z":z=>z.lc,"%%":()=>"%"},f=f.replace(/%%/g,"\0\0"),H)f.includes(X)&&(f=f.replace(new RegExp(X,"g"),H[X](b)));return X=function(z){var pe=Array(vn(z)+1);return Zo(z,pe,0,pe.length),pe}(f=f.replace(/\0\0/g,"%")),X.length>p?0:(bp(X,s),X.length-1)}function wp(s,p,f,b){return Mi(s>>>0,p>>>0,f>>>0,b>>>0)}y||function(){for(var s=u.numThreads-1;s--;)Go();bt.unshift(()=>{Ue++,function(p){y?p():Promise.all(pt.map(Ho)).then(p)}(()=>zo())})}();for(var Ri=Array(256),mr=0;256>mr;++mr)Ri[mr]=String.fromCharCode(mr);di=Ri,mt=u.BindingError=class extends Error{constructor(s){super(s),this.name="BindingError"}},u.InternalError=class extends Error{constructor(s){super(s),this.name="InternalError"}},dt.push(0,1,void 0,1,null,1,!0,1,!1,1),u.count_emval_handles=()=>dt.length/2-5-Sn.length;var _p=[wn,Vo,Fo,Yo,Xo,Qo,Jo,ei,ti,ri,ni,oi,ii,ai,si,ui,$i,xi,Ai,ki,Ei,Pi,zi,Oi],j=function(){function s(f,b){return j=f.exports,j=function(){var _=j,I={};for(let[O,D]of Object.entries(_))I[O]=typeof D=="function"?(...L)=>{dr.push(O);try{return D(...L)}finally{$e||(dr.pop(),et&&ht===1&&dr.length===0&&(ht=0,_t+=1,ur(qi),typeof Fibers<"u"&&Fibers.sc()))}}:D;return I}(),j=function(){var _=j,I=D=>L=>D(L)>>>0,O=D=>()=>D()>>>0;return(_=Object.assign({},_)).Ca=I(_.Ca),_.fb=O(_.fb),_.gb=I(_.gb),_.emscripten_main_runtime_thread_id=O(_.emscripten_main_runtime_thread_id),_.sb=I(_.sb),_.tb=O(_.tb),_}(),No.push(j.ib),Ae.unshift(j.Ba),Y=b,zo(),j}var p=Ro();if(Ue++,u.instantiateWasm)try{return u.instantiateWasm(p,s)}catch(f){Z(`Module.instantiateWasm callback failed with error: ${f}`),m(f)}return hn||=u.locateFile?Oo("ort-wasm-simd-threaded.jsep.wasm")?"ort-wasm-simd-threaded.jsep.wasm":u.locateFile?u.locateFile("ort-wasm-simd-threaded.jsep.wasm",P):P+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,function(f,b){var _=hn;return B||typeof WebAssembly.instantiateStreaming!="function"||Oo(_)||Bo(_)||typeof fetch!="function"?Mo(_,f,b):fetch(_,{credentials:"same-origin"}).then(I=>WebAssembly.instantiateStreaming(I,f).then(b,function(O){return Z(`wasm streaming compile failed: ${O}`),Z("falling back to ArrayBuffer instantiation"),Mo(_,f,b)}))}(p,function(f){s(f.instance,f.module)}).catch(m),{}}(),Ui=s=>(Ui=j.Ca)(s),Vi=()=>(Vi=j.Da)();u._OrtInit=(s,p)=>(u._OrtInit=j.Ea)(s,p),u._OrtGetLastError=(s,p)=>(u._OrtGetLastError=j.Fa)(s,p),u._OrtCreateSessionOptions=(s,p,f,b,_,I,O,D,L,H)=>(u._OrtCreateSessionOptions=j.Ga)(s,p,f,b,_,I,O,D,L,H),u._OrtAppendExecutionProvider=(s,p)=>(u._OrtAppendExecutionProvider=j.Ha)(s,p),u._OrtAddFreeDimensionOverride=(s,p,f)=>(u._OrtAddFreeDimensionOverride=j.Ia)(s,p,f),u._OrtAddSessionConfigEntry=(s,p,f)=>(u._OrtAddSessionConfigEntry=j.Ja)(s,p,f),u._OrtReleaseSessionOptions=s=>(u._OrtReleaseSessionOptions=j.Ka)(s),u._OrtCreateSession=(s,p,f)=>(u._OrtCreateSession=j.La)(s,p,f),u._OrtReleaseSession=s=>(u._OrtReleaseSession=j.Ma)(s),u._OrtGetInputOutputCount=(s,p,f)=>(u._OrtGetInputOutputCount=j.Na)(s,p,f),u._OrtGetInputName=(s,p)=>(u._OrtGetInputName=j.Oa)(s,p),u._OrtGetOutputName=(s,p)=>(u._OrtGetOutputName=j.Pa)(s,p),u._OrtFree=s=>(u._OrtFree=j.Qa)(s),u._OrtCreateTensor=(s,p,f,b,_,I)=>(u._OrtCreateTensor=j.Ra)(s,p,f,b,_,I),u._OrtGetTensorData=(s,p,f,b,_)=>(u._OrtGetTensorData=j.Sa)(s,p,f,b,_),u._OrtReleaseTensor=s=>(u._OrtReleaseTensor=j.Ta)(s),u._OrtCreateRunOptions=(s,p,f,b)=>(u._OrtCreateRunOptions=j.Ua)(s,p,f,b),u._OrtAddRunConfigEntry=(s,p,f)=>(u._OrtAddRunConfigEntry=j.Va)(s,p,f),u._OrtReleaseRunOptions=s=>(u._OrtReleaseRunOptions=j.Wa)(s),u._OrtCreateBinding=s=>(u._OrtCreateBinding=j.Xa)(s),u._OrtBindInput=(s,p,f)=>(u._OrtBindInput=j.Ya)(s,p,f),u._OrtBindOutput=(s,p,f,b)=>(u._OrtBindOutput=j.Za)(s,p,f,b),u._OrtClearBoundOutputs=s=>(u._OrtClearBoundOutputs=j._a)(s),u._OrtReleaseBinding=s=>(u._OrtReleaseBinding=j.$a)(s),u._OrtRunWithBinding=(s,p,f,b,_)=>(u._OrtRunWithBinding=j.ab)(s,p,f,b,_),u._OrtRun=(s,p,f,b,_,I,O,D)=>(u._OrtRun=j.bb)(s,p,f,b,_,I,O,D),u._OrtEndProfiling=s=>(u._OrtEndProfiling=j.cb)(s),u._JsepOutput=(s,p,f)=>(u._JsepOutput=j.db)(s,p,f),u._JsepGetNodeName=s=>(u._JsepGetNodeName=j.eb)(s);var fr,Rt=()=>(Rt=j.fb)(),hr=u._malloc=s=>(hr=u._malloc=j.gb)(s),tt=u._free=s=>(tt=u._free=j.hb)(s),Bn=(s,p,f,b,_,I)=>(Bn=j.kb)(s,p,f,b,_,I),Ni=()=>(Ni=j.lb)(),Wi=(s,p,f,b,_)=>(Wi=j.mb)(s,p,f,b,_),Dn=s=>(Dn=j.nb)(s),gr=s=>(gr=j.ob)(s),Li=()=>(Li=j.pb)(),Hi=(s,p)=>(Hi=j.qb)(s,p),yr=s=>(yr=j.rb)(s),Mn=s=>(Mn=j.sb)(s),Rn=()=>(Rn=j.tb)(),Gi=u.dynCall_ii=(s,p)=>(Gi=u.dynCall_ii=j.vb)(s,p),Fi=s=>(Fi=j.wb)(s),qi=()=>(qi=j.xb)(),ji=s=>(ji=j.yb)(s),Ki=()=>(Ki=j.zb)();function Yi(){0<Ue||(y?(c(u),y||ar(Ae),startWorker(u)):(ar(bt),0<Ue||fr||(fr=!0,u.calledRun=!0,$e||(y||ar(Ae),c(u),y||ar(Me)))))}return u.___start_em_js=882450,u.___stop_em_js=882672,u.stackSave=()=>Rn(),u.stackRestore=s=>yr(s),u.stackAlloc=s=>Mn(s),u.UTF8ToString=ze,u.stringToUTF8=Bt,u.lengthBytesUTF8=vn,wt=function s(){fr||Yi(),fr||(wt=s)},Yi(),h}),Ep=Pa;globalThis.self?.name==="em-pthread"&&Pa()});var Ut,Pp,zp,Op,Ba,Da,Bp,Ma,qt=V(()=>{"use strict";Cr();Ut=!1?void 0:import.meta.url??(typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0),Pp=!1||typeof location>"u"?void 0:location.origin,zp=(e,t)=>{try{let r=t??Ut;return(r?new URL(e,r):new URL(e)).origin===Pp}catch{return!1}},Op=async e=>{let r=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},Ba=(Ea(),br(ka)).default,Da=async()=>{if(!Ut)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(zp(Ut))return[void 0,Ba()];let e=await Op(Ut);return[e,Ba(e)]},Bp=(Oa(),br(za)).default,Ma=async(e,t,r)=>[void 0,Bp]});var qn,jn,Mr,Ra,Dp,Mp,Ar,Te,gt=V(()=>{"use strict";qt();jn=!1,Mr=!1,Ra=!1,Dp=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Mp=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Ar=async e=>{if(jn)return Promise.resolve();if(Mr)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Ra)throw new Error("previous call to 'initializeWebAssembly()' failed.");Mr=!0;let t=e.initTimeout,r=e.numThreads;if(!Mp())throw new Error("WebAssembly SIMD is not supported in the current environment.");let n=Dp();r>1&&!n&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let o=e.wasmPaths,i=typeof o=="string"?o:void 0,a=o?.mjs,d=a?.href??a,l=o?.wasm,c=l?.href??l,m=e.wasmBinary,[u,h]=await Ma(d,i,r>1),w=!1,g=[];if(t>0&&g.push(new Promise(y=>{setTimeout(()=>{w=!0,y()},t)})),g.push(new Promise((y,S)=>{let $={numThreads:r};m?$.wasmBinary=m:(c||i)&&($.locateFile=(v,x)=>c??(i??x)+v),h($).then(v=>{Mr=!1,jn=!0,qn=v,y(),u&&URL.revokeObjectURL(u)},v=>{Mr=!1,Ra=!0,S(v)})})),await Promise.race(g),w)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Te=()=>{if(jn&&qn)return qn;throw new Error("WebAssembly is not initialized yet.")}});var ke,Kt,ve,Rr=V(()=>{"use strict";gt();ke=(e,t)=>{let r=Te(),n=r.lengthBytesUTF8(e)+1,o=r._malloc(n);return r.stringToUTF8(e,o,n),t.push(o),o},Kt=(e,t,r,n)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([o,i])=>{let a=t?t+o:o;if(typeof i=="object")Kt(i,a+".",r,n);else if(typeof i=="string"||typeof i=="number")n(a,i.toString());else if(typeof i=="boolean")n(a,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},ve=e=>{let t=Te(),r=t.stackSave();try{let n=t.stackAlloc(8);t._OrtGetLastError(n,n+4);let o=t.HEAP32[n/4],i=t.HEAPU32[n/4+1],a=i?t.UTF8ToString(i):"";throw new Error(`${e} ERROR_CODE: ${o}, ERROR_MESSAGE: ${a}`)}finally{t.stackRestore(r)}}});var Ua,Va=V(()=>{"use strict";gt();Rr();Ua=e=>{let t=Te(),r=0,n=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let i=0;return e?.tag!==void 0&&(i=ke(e.tag,n)),r=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),r===0&&ve("Can't create run options."),e?.extra!==void 0&&Kt(e.extra,"",new WeakSet,(a,d)=>{let l=ke(a,n),c=ke(d,n);t._OrtAddRunConfigEntry(r,l,c)!==0&&ve(`Can't set a run config entry: ${a} - ${d}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseRunOptions(r),n.forEach(a=>t._free(a)),i}}});var Rp,Up,Vp,Np,Na,Wa=V(()=>{"use strict";gt();Rr();Rp=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Up=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Vp=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Np=(e,t,r)=>{for(let n of t){let o=typeof n=="string"?n:n.name;switch(o){case"webnn":if(o="WEBNN",typeof n!="string"){let d=n?.deviceType;if(d){let l=ke("deviceType",r),c=ke(d,r);Te()._OrtAddSessionConfigEntry(e,l,c)!==0&&ve(`Can't set a session config entry: 'deviceType' - ${d}.`)}}break;case"webgpu":if(o="JS",typeof n!="string"){let a=n;if(a?.preferredLayout){if(a.preferredLayout!=="NCHW"&&a.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${a.preferredLayout}`);let d=ke("preferredLayout",r),l=ke(a.preferredLayout,r);Te()._OrtAddSessionConfigEntry(e,d,l)!==0&&ve(`Can't set a session config entry: 'preferredLayout' - ${a.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let i=ke(o,r);Te()._OrtAppendExecutionProvider(e,i)!==0&&ve(`Can't append execution provider: ${o}.`)}},Na=e=>{let t=Te(),r=0,n=[],o=e||{};Vp(o);try{let i=Rp(o.graphOptimizationLevel??"all"),a=Up(o.executionMode??"sequential"),d=typeof o.logId=="string"?ke(o.logId,n):0,l=o.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log serverity level is not valid: ${l}`);let c=o.logVerbosityLevel??0;if(!Number.isInteger(c)||c<0||c>4)throw new Error(`log verbosity level is not valid: ${c}`);let m=typeof o.optimizedModelFilePath=="string"?ke(o.optimizedModelFilePath,n):0;if(r=t._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,a,!!o.enableProfiling,0,d,l,c,m),r===0&&ve("Can't create session options."),o.executionProviders&&Np(r,o.executionProviders,n),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let u=ke("enableGraphCapture",n),h=ke(o.enableGraphCapture.toString(),n);t._OrtAddSessionConfigEntry(r,u,h)!==0&&ve(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[u,h]of Object.entries(o.freeDimensionOverrides)){if(typeof u!="string")throw new Error(`free dimension override name must be a string: ${u}`);if(typeof h!="number"||!Number.isInteger(h)||h<0)throw new Error(`free dimension override value must be a non-negative integer: ${h}`);let w=ke(u,n);t._OrtAddFreeDimensionOverride(r,w,h)!==0&&ve(`Can't set a free dimension override: ${u} - ${h}.`)}return o.extra!==void 0&&Kt(o.extra,"",new WeakSet,(u,h)=>{let w=ke(u,n),g=ke(h,n);t._OrtAddSessionConfigEntry(r,w,g)!==0&&ve(`Can't set a session config entry: ${u} - ${h}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseSessionOptions(r),n.forEach(a=>t._free(a)),i}}});var Yt,yt,It,Ur,Xt,Vr,Nr,Kn,Q=V(()=>{"use strict";Yt=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},yt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},It=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],n=typeof t=="number"?t:t.reduce((o,i)=>o*i,1);return r>0?Math.ceil(n*r):void 0},Ur=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Xt=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Vr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Nr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool",Kn=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}});var Zt,Yn=V(()=>{"use strict";Cr();Zt=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=Vn("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=Vn("node:fs"),n=r(e),o=[];for await(let i of n)o.push(i);return new Uint8Array(Buffer.concat(o))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let o=t.body.getReader(),i;try{i=new ArrayBuffer(n)}catch(d){if(d instanceof RangeError){let l=Math.ceil(n/65536);i=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw d}let a=0;for(;;){let{done:d,value:l}=await o.read();if(d)break;let c=l.byteLength;new Uint8Array(i,a,c).set(l),a+=c}return new Uint8Array(i,0,n)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var Wp,Lp,La,Ha,Wr,Hp,me,Xe=V(()=>{"use strict";Q();Wp=["V","I","W","E","F"],Lp=(e,t)=>{console.log(`[${Wp[e]},${new Date().toISOString()}]${t}`)},Wr=(e,t)=>{La=e,Ha=t},Hp=(e,t)=>{let r=Xt(e),n=Xt(La);r>=n&&Lp(r,typeof t=="function"?t():t)},me=(...e)=>{Ha&&Hp(...e)}});var Lr,Xn=V(()=>{"use strict";Q();Lr=(e,t)=>new(Ur(t))(e)});var Hr=V(()=>{"use strict"});var Ga,Zn,Qn,Gp,Fp,Fa,eo,Jn,ja,Ka=V(()=>{"use strict";Xe();Hr();Ga=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Zn=[],Qn=e=>Math.ceil(e/16)*16,Gp=e=>{for(let t=0;t<Zn.length;t++){let r=Zn[t];if(e<=r)return r}return Math.ceil(e/16)*16},Fp=1,Fa=()=>Fp++,eo=async(e,t,r,n)=>{let o=Qn(r),i=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=e.getCommandEncoder();e.endComputePass(),a.copyBufferToBuffer(t,0,i,0,o),e.flush(),await i.mapAsync(GPUMapMode.READ);let d=i.getMappedRange();if(n){let l=n();return l.set(new Uint8Array(d,0,r)),l}else return new Uint8Array(d.slice(0,r))}finally{i.destroy()}},Jn=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersForUploadingPending=[],this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[r]of Ga)Zn.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[])}upload(t,r){let n=r.buffer,o=r.byteOffset,i=r.byteLength,a=Qn(i),d=this.storageCache.get(t);if(!d)throw new Error("gpu data for uploading does not exist");if(d.originalSize!==i)throw new Error(`inconsistent data size. gpu data size=${d.originalSize}, data size=${i}`);let l=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),c=l.getMappedRange();new Uint8Array(c).set(new Uint8Array(n,o,i)),l.unmap();let m=this.backend.getCommandEncoder();this.backend.endComputePass(),m.copyBufferToBuffer(l,0,d.gpuData.buffer,0,a),me("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`),this.buffersForUploadingPending.push(l)}memcpy(t,r){let n=this.storageCache.get(t);if(!n)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=Qn(n.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(n.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(t,r,n){let o;if(n){if(o=n[0],t===n[1])return me("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=Fa();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:t},originalSize:r}),me("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(t){t!==void 0&&(this.storageCache.delete(t),me("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(t,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=Gp(t),o,i=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let c=(i?this.freeBuffers:this.freeUniformBuffers).get(n);c?c.length>0?o=c.pop():o=this.backend.device.createBuffer({size:n,usage:r}):o=this.backend.device.createBuffer({size:n,usage:r})}else o=this.backend.device.createBuffer({size:n,usage:r});let d={id:Fa(),type:0,buffer:o};return this.storageCache.set(d.id,{gpuData:d,originalSize:t}),me("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${d.id}`),d}get(t){return this.storageCache.get(t)?.gpuData}release(t){let r=this.storageCache.get(t);if(!r)throw new Error("releasing data does not exist");return me("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(t,r){let n=this.storageCache.get(t);if(!n)throw new Error("data does not exist");await eo(this.backend,n.gpuData.buffer,n.originalSize,r)}refreshPendingBuffers(){for(let t of this.buffersForUploadingPending)t.destroy();if(this.buffersForUploadingPending=[],this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let r=Ga.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let r of this.buffersPending)t.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onReleaseSession(t){let r=this.capturedPendingBuffers.get(t);r&&(r.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(t))}},ja=(...e)=>new Jn(...e)});var to,J,Ie=V(()=>{"use strict";to=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},J=e=>new to(e)});var ro,rt,k,Ct,Gr,Ya,Xa,ie=V(()=>{"use strict";ro=class{static calcMatMulShape(t,r){return t[1]!==r[0]?void 0:[t[0],r[1]]}},rt=class{static calcShape(t,r,n=!1){let o=t.length,i=r.length;if(o===0)return r;if(i===0)return t;let a=Math.max(t.length,r.length),d=new Array(a);if(n){if(o<2||i<2)return;let l=ro.calcMatMulShape([t[o-2],t[o-1]],[r[i-2],r[i-1]]);if(l===void 0)return;[d[a-2],d[a-1]]=l}for(let l=n?3:1;l<=a;l++){let c=o-l<0?1:t[o-l],m=i-l<0?1:r[i-l];if(c!==m&&c>1&&m>1)return;let u=Math.max(c,m);if(c&&m)d[a-l]=Math.max(c,m);else{if(u>1)return;d[a-l]=0}}return d}static isValidBroadcast(t,r){let n=t.length,o=r.length;if(n>o)return!1;for(let i=1;i<=n;i++)if(t[n-i]!==1&&t[n-i]!==r[o-i])return!1;return!0}},k=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let n=t.length;if(n===0)return[];let o=new Array(n),i=n-1;for(;i>=0;){if(t[i]%r===0){o[i]=t[i]/r;break}if(r%t[i]!==0)throw new Error("cannot convert shape");o[i]=1,r/=t[i],i--}for(i--;i>=0;i--)o[i]=t[i];return o}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,n){let o=1;for(let i=r;i<n;i++){if(t[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=t[i]}return o}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let n=new Array(r);n[r-1]=1,n[r-2]=t[r-1];for(let o=r-3;o>=0;--o)n[o]=n[o+1]*t[o+1];return n}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(n=>this.normalizeAxis(n,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(n=>t[n]):t.slice().reverse()}static padShape(t,r){let n=t.length;return t.map((o,i)=>o+r[i]+r[i+n])}static areEqual(t,r){return t.length!==r.length?!1:t.every((n,o)=>n===r[o])}},Ct=class e{static adjustPoolAttributes(t,r,n,o,i,a){if(!t&&n.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let d=0;d<r.length-2;d++)d>=n.length?n.push(r[d+2]):n[d]=r[d+2];for(let d=0;d<n.length;d++)if(d<o.length){if(o[d]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let d=0;d<n.length;d++)if(d<i.length){if(i[d]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let d=0;d<n.length*2;d++)if(d<a.length){if(a[d]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let d=0;d<n.length;d++){if(n[d]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[d]>=n[d]||a[d+n.length]>=n[d])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,o,i,a,d){if(d){if(i.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)e.adjustPadAndReturnShape(t[l+(a?1:2)],r[l],n[l],o[l],i,l,l+t.length-2,d)}}static computePoolOutputShape(t,r,n,o,i,a,d){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let l=[r[0],r[1]];return e.computeShapeHelper(t,r,l,n,o,i,a,d),l}static computeConvOutputShape(t,r,n,o,i,a,d){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],r[0]];return e.computeShapeHelper(!1,t,l,n,o,i,a,d),l}static computeShapeHelper(t,r,n,o,i,a,d,l){if(t)for(let c=0;c<r.length-2;c++)n.push(1);else for(let c=0;c<r.length-2;c++)n.push(e.adjustPadAndReturnShape(r[c+2],o[c],i[c],a[c],d,c,c+r.length-2,l))}static adjustPadAndReturnShape(t,r,n,o,i,a,d,l){let c=n*(o-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return i[a]=0,i[d]=0,Math.floor((t-c)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(n!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let u=((t+r-1)/r-1)*r+o-t;return i[a]=Math.floor(l==="SAME_LOWER"?(u+1)/2:u/2),i[d]=u-i[a],Math.floor((t+u-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+i[a]+i[d]-c)/r+1)}},Gr=class{static getShapeOfGemmResult(t,r,n,o,i){if(t.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let a,d,l;r?(a=t[1],d=t[0]):(a=t[0],d=t[1]);let c=-1;if(o?(l=n[0],c=1):(l=n[1],c=0),n[c]!==d)throw new Error("dimension mismatch");if(a<=0||l<=0||d<=0)throw new Error("invalid shape specified");if(i&&!rt.isValidBroadcast(i,[a,l]))throw new Error("gemm: invalid bias shape for broadcast");return[a,l,d]}},Ya=-34028234663852886e22,Xa=34028234663852886e22});var At,oo,he,Ee,R,we,io,kt,Ze,F,ao,E,M,Fr,no,Za,Nt,ae=V(()=>{"use strict";Q();ie();At=64,oo=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(e){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},he=(e,t=1)=>{let r=oo(e,t);return typeof r=="string"?r:r[0]},Ee=(e,t=1)=>{let r=oo(e,t);return typeof r=="string"?r:r[1]},R=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:k.computeStrides(r)})}),t},we=e=>e%4===0?4:e%2===0?2:1,io=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,kt=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,Ze=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,F=(e,t,r,n)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?n==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:n==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,ao=(e,t,r,n,o)=>{let i=typeof r=="number",a=i?r:r.length,d=[...new Array(a).keys()],l=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,c=oo(t,o),m=typeof c=="string"?c:c[1],u=typeof c=="string"?c:c[0],h={indices:l,value:m,storage:u,tensor:t},w=U=>typeof U=="string"?U:`${U}u`,g={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},y=i?"uniforms.":"",S=`${y}${e}_shape`,$=`${y}${e}_strides`,v="";for(let U=0;U<a-1;U++)v+=`
    let dim${U} = current / ${F($,U,a)};
    let rest${U} = current % ${F($,U,a)};
    indices[${U}] = dim${U};
    current = rest${U};
    `;v+=`indices[${a-1}] = current;`;let x=a<2?"":`
  fn o2i_${e}(offset: u32) -> ${h.indices} {
    var indices: ${h.indices};
    var current = offset;
    ${v}
    return indices;
  }`,T=U=>(g.offsetToIndices=!0,a<2?U:`o2i_${e}(${U})`),C=[];if(a>=2)for(let U=a-1;U>=0;U--)C.push(`${F($,U,a)} * (indices[${U}])`);let A=a<2?"":`
  fn i2o_${e}(indices: ${h.indices}) -> u32 {
    return ${C.join("+")};
  }`,P=U=>(g.indicesToOffset=!0,a<2?U:`i2o_${e}(${U})`),B=(...U)=>a===0?"0u":`${h.indices}(${U.map(w).join(",")})`,N=(U,G)=>a<2?`${U}`:`${F(U,G,a)}`,W=(U,G,ye)=>a<2?`${U}=${ye};`:`${F(U,G,a)}=${ye};`,K={},Z=(U,G)=>{g.broadcastedIndicesToOffset=!0;let ye=`${G.name}broadcastedIndicesTo${e}Offset`;if(ye in K)return`${ye}(${U})`;let Re=[];for(let $e=a-1;$e>=0;$e--){let Ce=G.indicesGet("outputIndices",$e+G.rank-a);Re.push(`${N($,$e)} * (${Ce} % ${N(S,$e)})`)}return K[ye]=`fn ${ye}(outputIndices: ${G.type.indices}) -> u32 {
             return ${Re.length>0?Re.join("+"):"0u"};
           }`,`${ye}(${U})`},ee=(U,G)=>(()=>{if(h.storage===h.value)return`${e}[${U}]=${G};`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`${e}[${U}]=vec2<u32>(u32(${G}), select(0u, 0xFFFFFFFFu, ${G} < 0));`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`${e}[${U}]=vec2<u32>(u32(${G}), 0u);`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`${e}[${U}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${G}));`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),se=U=>(()=>{if(h.storage===h.value)return`${e}[${U}]`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`i32(${e}[${U}].x)`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`u32(${e}[${U}].x)`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${U}] & 0xFFu), bool(${e}[${U}] & 0xFF00u), bool(${e}[${U}] & 0xFF0000u), bool(${e}[${U}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),de=a<2?"":`
  fn get_${e}ByIndices(indices: ${h.indices}) -> ${m} {
    return ${se(`i2o_${e}(indices)`)};
  }`,Y=a<2?"":(()=>{let U=d.map(ye=>`d${ye}: u32`).join(", "),G=d.map(ye=>`d${ye}`).join(", ");return`
  fn get_${e}(${U}) -> ${m} {
    return get_${e}ByIndices(${B(G)});
  }`})(),le=(...U)=>{if(U.length!==a)throw new Error(`indices length must be ${a}`);let G=U.map(w).join(",");return a===0?se("0u"):a===1?se(G[0]):(g.get=!0,g.getByIndices=!0,g.indicesToOffset=!0,`get_${e}(${G})`)},ce=U=>a<2?se(U):(g.getByIndices=!0,g.indicesToOffset=!0,`get_${e}ByIndices(${U})`),q=a<2?"":`
  fn set_${e}ByIndices(indices: ${h.indices}, value: ${m}) {
    ${ee(`i2o_${e}(indices)`,"value")}
  }`,ue=a<2?"":(()=>{let U=d.map(ye=>`d${ye}: u32`).join(", "),G=d.map(ye=>`d${ye}`).join(", ");return`
  fn set_${e}(${U}, value: ${m}) {
    set_${e}ByIndices(${B(G)}, value);
  }`})();return{impl:()=>{let U=[],G=!1;return g.offsetToIndices&&(U.push(x),G=!0),g.indicesToOffset&&(U.push(A),G=!0),g.broadcastedIndicesToOffset&&(Object.values(K).forEach(ye=>U.push(ye)),G=!0),g.set&&(U.push(ue),G=!0),g.setByIndices&&(U.push(q),G=!0),g.get&&(U.push(Y),G=!0),g.getByIndices&&(U.push(de),G=!0),!i&&G&&U.unshift(`const ${S} = ${h.indices}(${r.join(",")});`,`const ${$} = ${h.indices}(${k.computeStrides(r).join(",")});`),U.join(`
`)},type:h,offsetToIndices:T,indicesToOffset:P,broadcastedIndicesToOffset:Z,indices:B,indicesGet:N,indicesSet:W,set:(...U)=>{if(U.length!==a+1)throw new Error(`indices length must be ${a}`);let G=U[a];if(typeof G!="string")throw new Error("value must be string");let ye=U.slice(0,a).map(w).join(",");return a===0?ee("0u",G):a===1?ee(ye[0],G):(g.set=!0,g.setByIndices=!0,g.indicesToOffset=!0,`set_${e}(${ye}, ${G})`)},setByOffset:ee,setByIndices:(U,G)=>a<2?ee(U,G):(g.setByIndices=!0,g.indicesToOffset=!0,`set_${e}ByIndices(${U}, ${G});`),get:le,getByOffset:se,getByIndices:ce,usage:n,name:e,strides:$,shape:S,rank:a}},E=(e,t,r,n=1)=>ao(e,t,r,"input",n),M=(e,t,r,n=1)=>ao(e,t,r,"output",n),Fr=(e,t,r,n=1)=>ao(e,t,r,"internal",n),no=class{constructor(t,r){this.normalizedDispatchGroup=t;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=At){let r=typeof t=="number"?t:t[0],n=typeof t=="number"?1:t[1],o=typeof t=="number"?1:t[2];if(r>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*n*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
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
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[t(r.type),r.length??1])}},Za=(e,t)=>new no(e,t),Nt=(e,t)=>{let r=e.length,n=[];for(let o=0;o<r;o++){let i=r-1-o,a=e[i]||1;(t[t.length-1-o]||1)>1&&a===1&&n.unshift(i)}return n}});var qp,Qa,jp,Kp,Yp,Pe,Ja,es,lt=V(()=>{"use strict";Q();ie();Ie();ae();qp=e=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.")},Qa=(e,t)=>t&&t.length!==e?[...new Array(e).keys()].reverse():t,jp=(e,t)=>k.sortBasedOnPerm(e,Qa(e.length,t)),Kp=(e,t,r,n)=>{let o=`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let i=0;i<t;++i)o+=r.indicesSet("a",e[i],`i[${i}]`);return o+="return a;}"},Yp=(e,t)=>{let r=[],n=[];for(let o=0;o<e.length;++o)e[o]!==1&&r.push(e[o]),e[t[o]]!==1&&n.push(t[o]);return{newShape:r,newPerm:n}},Pe=(e,t)=>{let r=e.dataType,n=e.dims.length,o=Qa(n,t),i=jp(e.dims,o),{newShape:a,newPerm:d}=Yp(e.dims,o),l=k.areEqual(d,[2,3,1]),c=k.areEqual(d,[3,1,2]),m=a.length===2&&d[0]>d[1]||l||c,u=m?a:e.dims,h=i;m&&(u=l?[a[0],a[1]*a[2]]:c?[a[0]*a[1],a[2]]:a,h=[u[1],u[0]]);let w=E("a",r,u.length),g=M("output",r,h.length),y=16,S;return m?S=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(w,g)}
  var<workgroup> tile : array<array<${g.type.value}, ${y+1}>, ${y}>;
  ${$.mainStart([y,y,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${y} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${y}u + local_id.x;
    let input_row = workgroup_id_x * ${y}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${w.getByIndices(`${w.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${y}u + local_id.x;
    let output_row = workgroup_id_y * ${y}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${g.setByIndices(`${g.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`:S=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(w,g)}

  ${Kp(o,n,w,g)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${g.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${g.setByOffset("global_idx",w.getByIndices("aIndices"))}
  }`,{name:m?"TransposeShared":"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let $=k.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:m?{x:Math.ceil(h[1]/y),y:Math.ceil(h[0]/y)}:{x:Math.ceil($/64)},programUniforms:[{type:12,data:$},...R(u,h)]}},getShaderSource:S}},Ja=(e,t)=>{qp(e.inputs),e.compute(Pe(e.inputs[0],t.perm))},es=e=>J({perm:e.perm})});var Xp,Zp,Qp,Jp,em,tm,rm,nm,om,im,nt,ts,rs,ns,os,is,as,ss,us,ds,ls,cs=V(()=>{"use strict";Q();ie();ae();qr();lt();Xp={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Zp={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Qp={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Jp={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},em=(e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r},tm=(e,t)=>{let r=[],n=e.length;for(let i=0;i<n;i++)t.indexOf(i)===-1&&r.push(e[i]);let o=t.map(i=>e[i]);return[r,o]},rm=(e,t)=>{let r=e.length+t.length,n=[],o=0;for(let i=0;i<r;i++)t.indexOf(i)===-1?n.push(e[o++]):n.push(1);return n},nm=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},om=(e,t)=>{let r=[];if(!nm(e,t)){for(let n=0;n<t;++n)e.indexOf(n)===-1&&r.push(n);e.forEach(n=>r.push(n))}return r},im=(e,t,r,n,o,i,a)=>{let d=r[0].dims,l=k.size(i),c=k.size(a),m=E("_A",r[0].dataType,d),u=M("output",o,i),h=32,w=`
          var<workgroup> aBestValues : array<f32, ${h}>;
       `;return{name:e,shaderCache:t,getShaderSource:y=>`
        ${y.registerUniform("reduceSize","u32").declareVariables(m,u)}
        ${w}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${y.mainStart(h)}

          let outputIndex = global_idx / ${h};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Qp[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${h}) {
           let candidate = f32(${m.getByOffset("offset + k")});
           bestValue = ${Xp[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${h}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Zp[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${u.setByOffset("outputIndex",`${n==="mean"?`${u.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${u.type.storage}(${Jp[n]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:l},programUniforms:[{type:12,data:c}]})}},nt=(e,t,r,n)=>{let o=e.inputs.length===1?r:so(e.inputs,r),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=e.inputs[0].dims.map((w,g)=>g));let a=k.normalizeAxes(i,e.inputs[0].dims.length),d=a,l=e.inputs[0],c=om(d,e.inputs[0].dims.length);c.length>0&&(l=e.compute(Pe(e.inputs[0],c),{inputs:[0],outputs:[-1]})[0],d=em(d.length,l.dims.length));let[m,u]=tm(l.dims,d),h=m;o.keepDims&&(h=rm(m,a)),e.compute(im(t,{hint:o.cacheKey,inputDependencies:["type"]},[l],n,e.inputs[0].dataType,h,u),{inputs:[l]})},ts=(e,t)=>{nt(e,"ReduceMeanShared",t,"mean")},rs=(e,t)=>{nt(e,"ReduceL1Shared",t,"l1")},ns=(e,t)=>{nt(e,"ReduceL2Shared",t,"l2")},os=(e,t)=>{nt(e,"ReduceLogSumExpShared",t,"logSumExp")},is=(e,t)=>{nt(e,"ReduceMaxShared",t,"max")},as=(e,t)=>{nt(e,"ReduceMinShared",t,"min")},ss=(e,t)=>{nt(e,"ReduceProdShared",t,"prod")},us=(e,t)=>{nt(e,"ReduceSumShared",t,"sum")},ds=(e,t)=>{nt(e,"ReduceSumSquareShared",t,"sumSquare")},ls=(e,t)=>{nt(e,"ReduceLogSumShared",t,"logSum")}});var ot,am,jr,so,it,sm,um,dm,lm,cm,pm,mm,fm,hm,gm,at,ps,ms,fs,hs,gs,ys,bs,ws,_s,vs,qr=V(()=>{"use strict";Q();ie();Ie();ae();cs();ot=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},am=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],jr=(e,t,r,n,o,i,a=!1,d=!1)=>{let l=[],c=r[0].dims,m=c.length,u=k.normalizeAxes(o,m),h=!d&&u.length===0;c.forEach((S,$)=>{h||u.indexOf($)>=0?a&&l.push(1):l.push(S)});let w=l.length,g=k.size(l);return{name:e,shaderCache:t,getShaderSource:S=>{let $=[],v=E("_A",r[0].dataType,m),x=M("output",i,w),T=n(v,x,u),C=T[2];for(let A=0,P=0;A<m;A++)h||u.indexOf(A)>=0?(a&&P++,C=`for(var j${A}: u32 = 0; j${A} < ${c[A]}; j${A}++) {
                  ${T[2].includes("last_index")?`let last_index = j${A};`:""}
                  ${v.indicesSet("input_indices",A,`j${A}`)}
                  ${C}
                }`):($.push(`${v.indicesSet("input_indices",A,x.indicesGet("output_indices",P))};`),P++);return`

        ${S.registerUniform("output_size","u32").declareVariables(v,x)}

        ${S.mainStart()}
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${x.offsetToIndices("global_idx")};

          ${$.join(`
`)}
          ${T[0]}       // init ops for reduce max/min
          ${T[1]}
          ${C}
          ${T[3]}
          ${T.length===4?x.setByOffset("global_idx","value"):T.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:i}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},...R(c,l)]})}},so=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),J({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},it=(e,t,r,n)=>{let o=e.inputs,i=o.length===1?r:so(o,r);e.compute(jr(t,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?am:n,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},sm=(e,t)=>{ot(e.inputs),it(e,"ReduceLogSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},um=(e,t)=>{ot(e.inputs),it(e,"ReduceL1",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},dm=(e,t)=>{ot(e.inputs),it(e,"ReduceL2",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},lm=(e,t)=>{ot(e.inputs),it(e,"ReduceLogSumExp",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},cm=(e,t)=>{ot(e.inputs),it(e,"ReduceMax",t,(n,o,i)=>{let a=[];for(let d=0;d<n.rank;d++)(i.indexOf(d)>=0||i.length===0)&&a.push(n.indicesSet("input_indices",d,0));return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},pm=(e,t)=>{ot(e.inputs),it(e,"ReduceMean",t,(n,o,i)=>{let a=1;for(let d=0;d<n.rank;d++)(i.indexOf(d)>=0||i.length===0)&&(a*=e.inputs[0].dims[d]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${a});`]})},mm=(e,t)=>{ot(e.inputs),it(e,"ReduceMin",t,(n,o,i)=>{let a=[];for(let d=0;d<n.rank;d++)(i.indexOf(d)>=0||i.length===0)&&a.push(`input_indices[${d}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},fm=(e,t)=>{ot(e.inputs),it(e,"ReduceProd",t,(n,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},hm=(e,t)=>{ot(e.inputs),it(e,"ReduceSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},gm=(e,t)=>{ot(e.inputs),it(e,"ReduceSumSquare",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},at=(e,t,r)=>{if(t.length===0)return r;let n=1,o=1;for(let i=0;i<t.length;i++)t.indexOf(i)===-1?n*=e[i]:o*=e[i];return o<32&&n>1024},ps=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?pm(e,t):ts(e,t)},ms=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?um(e,t):rs(e,t)},fs=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?dm(e,t):ns(e,t)},hs=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?lm(e,t):os(e,t)},gs=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?cm(e,t):is(e,t)},ys=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?mm(e,t):as(e,t)},bs=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?fm(e,t):ss(e,t)},ws=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?hm(e,t):us(e,t)},_s=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?gm(e,t):ds(e,t)},vs=(e,t)=>{at(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?sm(e,t):ls(e,t)}});var $s,xs,Ss,uo,Ts=V(()=>{"use strict";Q();Ie();qr();$s=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},xs=(e,t)=>{$s(e.inputs);let r=(n,o,i)=>{let a=[];for(let d=0;d<n.rank;d++)(i.indexOf(d)>=0||i.length===0)&&a.push(`input_indices[${d}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(jr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Ss=(e,t)=>{$s(e.inputs);let r=(n,o,i)=>{let a=[];for(let d=0;d<n.rank;d++)(i.indexOf(d)>=0||i.length===0)&&a.push(`input_indices[${d}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(jr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},uo=e=>J(e)});var ym,bm,wm,_m,Wt,vm,Is,Kr=V(()=>{"use strict";Q();ie();Hr();ae();ym=(e,t)=>{let r=e[0],n=e[1],o=e[2],i=e[3],a=e[4],d=e[5];if(a&&d)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=r.dims[0],c=r.dims[1],m=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(n.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==m)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==n.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let u=o.dims[0]/3,h=u,w=h;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let x of t.qkvHiddenSizes)if(x%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");u=t.qkvHiddenSizes[0],h=t.qkvHiddenSizes[1],w=t.qkvHiddenSizes[2]}let g=c;if(u!==h)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==u+h+w)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let y=0;if(a){if(h!==w)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==h/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(y=a.dims[3])}let S=g+y,$=-1,v=0;if(i)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(d){if(d.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(d.dims[0]!==l||d.dims[1]!==t.numHeads||d.dims[2]!==c||d.dims[3]!==S)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:c,pastSequenceLength:y,kvSequenceLength:g,totalSequenceLength:S,maxSequenceLength:$,inputHiddenSize:m,hiddenSize:u,vHiddenSize:w,headSize:Math.floor(u/t.numHeads),vHeadSize:Math.floor(w/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},bm=(e,t,r)=>{let n=we(r),o=64,i=r/n;i<o&&(o=32);let a=Math.ceil(r/n/o),d=[{type:1,data:1/r},{type:12,data:i},{type:12,data:a}],l=he(e.dataType,n),c=Ee(1,n),m=["type"],u=h=>{let w=M("x",e.dataType,e.dims,n),g=Ee(e.dataType),y=[{name:"d_inv",type:"f32"},{name:"d_comp",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${o}>;
  var<workgroup> thread_sum: array<f32, ${o}>;
  ${h.registerUniforms(y).declareVariables(w)}
  ${h.mainStart([o,1,1])}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${o}) * uniforms.d_comp + local_offset;

    var thread_max_vector = ${c}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
      thread_max_vector = max(${c}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(n){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${n}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${o}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${c}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
      sum_vector += exp(${c}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(n){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${n}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${o}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
        x[offset + i] = ${w.type.value}(${g}(uniforms.d_inv));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
        var f32input = ${c}(x[offset + i]);
        x[offset + i] = ${w.type.value}(exp(f32input - max_value) / sum);
      }
    }
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${o};${l};${n}`,inputDependencies:m},getShaderSource:u,getRunData:()=>({outputs:[],dispatchGroup:{x:t},programUniforms:d})}},wm=(e,t,r,n,o,i,a,d)=>{let l=d+i.kvSequenceLength,c=[i.batchSize,i.numHeads,i.sequenceLength,l],m=i.kvNumHeads===void 0&&e>1&&n,u=m?[i.batchSize,i.numHeads,l,i.headSize]:void 0,h=a.scale===0?1/Math.sqrt(i.headSize):a.scale,w=we(i.headSize),g=i.headSize/w,y=12,S={x:Math.ceil(l/y),y:Math.ceil(i.sequenceLength/y),z:i.batchSize*i.numHeads},$=[{type:12,data:i.sequenceLength},{type:12,data:g},{type:12,data:l},{type:12,data:i.numHeads},{type:1,data:h},{type:12,data:d},{type:12,data:i.kvSequenceLength}],v=m&&n&&k.size(n.dims)>0,x=["type","type"];v&&x.push("type"),o&&x.push("type");let T=[{dims:c,dataType:t.dataType,gpuDataType:0}];m&&T.push({dims:u,dataType:t.dataType,gpuDataType:0});let C=A=>{let P=E("q",t.dataType,t.dims,w),B=E("key",r.dataType,r.dims,w),N=[P,B];if(v){let se=E("past_key",n.dataType,n.dims,w);N.push(se)}o&&N.push(E("attention_bias",o.dataType,o.dims));let W=M("output",t.dataType,c),K=[W];m&&K.push(M("present_key",t.dataType,u,w));let Z=Ee(1,w),ee=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"}];return`
  const TILE_SIZE = ${y}u;

  var<workgroup> tileQ: array<${P.type.storage}, ${y*y}>;
  var<workgroup> tileK: array<${P.type.storage}, ${y*y}>;
  ${A.registerUniforms(ee).declareVariables(...N,...K)}
  ${A.mainStart([y,y,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let qOffset = uniforms.M * uniforms.K * headIdx + m * uniforms.K;
    ${(()=>v&&m?`
    let kOffset = uniforms.kv_sequence_length * uniforms.K * headIdx;
    let pastKeyOffset = uniforms.past_sequence_length * uniforms.K * headIdx;`:`
    let kOffset = uniforms.N * uniforms.K * headIdx + n * uniforms.K;`)()}
    ${m?"let presentKeyOffset = headIdx * uniforms.N * uniforms.K;":""}
    var value = ${Z}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${(()=>v&&m?`
              if (n + local_id.y < uniforms.past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else {
                tileK[idx] =
                         key[kOffset + (n + local_id.y - uniforms.past_sequence_length) * uniforms.K + w + local_id.x];
              }`:"tileK[idx] = key[kOffset + local_id.y * uniforms.K + w + local_id.x];")()}
      ${m?"present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];":""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
        value += ${Z}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    let headOffset = headIdx * uniforms.M * uniforms.N;
    if (global_id.y < uniforms.M && global_id.x < uniforms.N) {
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(w){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${w}`)}})()};
        output[outputIdx] = ${W.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${w};${o!==void 0};${n!==void 0};${e}`,inputDependencies:x},getRunData:()=>({outputs:T,dispatchGroup:S,programUniforms:$}),getShaderSource:C}},_m=(e,t,r,n,o,i)=>{let a=i+o.kvSequenceLength,d=o.nReps?o.nReps:1,l=o.vHiddenSize*d,c=o.kvNumHeads==null&&e>1&&n,m=c?[o.batchSize,o.numHeads,a,o.headSize]:void 0,u=[o.batchSize,o.sequenceLength,l],h=12,w={x:Math.ceil(o.vHeadSize/h),y:Math.ceil(o.sequenceLength/h),z:o.batchSize*o.numHeads},g=[{type:12,data:o.sequenceLength},{type:12,data:a},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:l},{type:12,data:i},{type:12,data:o.kvSequenceLength}],y=c&&n&&k.size(n.dims)>0,S=["type","type"];y&&S.push("type");let $=[{dims:u,dataType:t.dataType,gpuDataType:0}];c&&$.push({dims:m,dataType:t.dataType,gpuDataType:0});let v=x=>{let T=E("probs",t.dataType,t.dims),C=E("v",r.dataType,r.dims),A=[T,C];y&&A.push(E("past_value",n.dataType,n.dims));let B=[M("output",t.dataType,u)];c&&B.push(M("present_value",t.dataType,m));let N=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"}];return`
  const TILE_SIZE = ${h}u;
  var<workgroup> tileQ: array<${T.type.value}, ${h*h}>;
  var<workgroup> tileK: array<${T.type.value}, ${h*h}>;
  ${x.registerUniforms(N).declareVariables(...A,...B)}
  ${x.mainStart([h,h,1])}
   let headIdx = workgroup_id.z;
   let m = global_id.y;
   let n = global_id.x;

   let offsetA = headIdx * (uniforms.M * uniforms.K) + m * uniforms.K;
   ${(()=>y&&c?`
    let pastValueOffset = headIdx * uniforms.N * uniforms.past_sequence_length + n;
    let vOffset = headIdx * uniforms.N * uniforms.kv_sequence_length + n;
      `:`
   let offsetB = headIdx * uniforms.N * uniforms.K + n;
            `)()}
    ${c?"let presentValueOffset = headIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${T.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${(()=>y&&c?`
        if (w + local_id.y < uniforms.past_sequence_length) {
          tileK[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else {
          tileK[idx] = v[vOffset + (w + local_id.y - uniforms.past_sequence_length) * uniforms.N];
        }
      `:`
        tileK[idx] = v[offsetB + (w + local_id.y) * uniforms.N];
      `)()}
        ${c?"present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileK[idx];":""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let currentBatchHeadNumber = workgroup_id.z % uniforms.num_heads;
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + currentBatchHeadNumber * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${n!==void 0};${e}`,inputDependencies:S},getRunData:()=>({outputs:$,dispatchGroup:w,programUniforms:g}),getShaderSource:v}},Wt=(e,t,r,n,o,i,a,d,l,c,m)=>{let u=Math.min(e.outputCount,1+(a?1:0)+(d?1:0)),h=c.kvNumHeads!==void 0||u>1?c.pastSequenceLength:0,w=h+c.kvSequenceLength,g=l&&k.size(l.dims)>0?l:void 0,y=[t,r];c.kvNumHeads===void 0&&u>1&&a&&k.size(a.dims)>0&&y.push(a),g&&y.push(g);let S=e.compute(wm(u,t,r,a,g,c,m,h),{inputs:y,outputs:c.kvNumHeads===void 0&&u>1?[-1,1]:[-1]})[0];e.compute(bm(S,c.batchSize*c.numHeads*c.sequenceLength,w),{inputs:[S],outputs:[]});let $=[S,n];c.kvNumHeads===void 0&&u>1&&d&&k.size(d.dims)>0&&$.push(d),e.compute(_m(u,S,n,d,c,h),{inputs:$,outputs:c.kvNumHeads===void 0&&u>1?[0,2]:[0]})},vm=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],n=t.sequenceLength,o=t.inputHiddenSize,i=t.headSize,a=12,d={x:Math.ceil(t.headSize/a),y:Math.ceil(t.sequenceLength/a),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],c=[{type:12,data:n},{type:12,data:o},{type:12,data:i},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],m=u=>{let h=M("output_q",l[0].dataType,r),w=M("output_k",l[0].dataType,r),g=M("output_v",l[0].dataType,r),y=E("input",l[0].dataType,l[0].dims),S=E("weight",l[1].dataType,l[1].dims),$=E("bias",l[2].dataType,l[2].dims),v=y.type.storage,x=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${v}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${v}, ${a*a}>;
  var<workgroup> tileWeightK: array<${v}, ${a*a}>;
  var<workgroup> tileWeightV: array<${v}, ${a*a}>;
  ${u.registerUniforms(x).declareVariables(y,S,$,h,w,g)}
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:d,programUniforms:c}),getShaderSource:m},{inputs:l,outputs:[-1,-1,-1]})},Is=(e,t)=>{let r=ym(e.inputs,t),[n,o,i]=vm(e,r);return Wt(e,n,o,i,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r,t)}});var $m,xm,Sm,Cs,As=V(()=>{"use strict";Ke();Q();ie();Ie();ae();$m=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(n,o,i)=>{let a=o.length;if(a!==n.length)throw new Error(`${i}: num dimensions != ${a}`);o.forEach((d,l)=>{if(d!==n[l])throw new Error(`${i}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let n=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},xm=(e,t)=>{let{epsilon:r,spatial:n,format:o}=t,i=e[0].dims,a=n?we(i[i.length-1]):1,d=o==="NHWC"&&i.length>1?a:1,l=k.size(i)/a,c=n,m=c?i.length:i,u=E("x",e[0].dataType,e[0].dims,a),h=E("scale",e[1].dataType,e[1].dims,d),w=E("bias",e[2].dataType,e[2].dims,d),g=E("inputMean",e[3].dataType,e[3].dims,d),y=E("inputVar",e[4].dataType,e[4].dims,d),S=M("y",e[0].dataType,m,a),$=()=>{let x="";if(n)x=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${a}`:"outputIndices[1]"};`;else if(o==="NCHW")x=`
            ${S.indicesSet("outputIndices","0","0")}
            let cOffset = ${S.indicesToOffset("outputIndices")};`;else{x=`var cIndices = ${h.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let T=1;T<h.rank;T++)x+=`cIndices[${T}] = outputIndices[${T}];`;x+=`let cOffset = ${h.indicesToOffset("cIndices")};`}return x},v=x=>`
  const epsilon = ${r};
  ${x.registerUniform("outputSize","u32").declareVariables(u,h,w,g,y,S)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${S.offsetToIndices(`global_idx * ${a}`)};
    ${$()}
    let scale = ${h.getByOffset("cOffset")};
    let bias = ${w.getByOffset("cOffset")};
    let inputMean = ${g.getByOffset("cOffset")};
    let inputVar = ${y.getByOffset("cOffset")};
    let x = ${u.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${S.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${a}`,inputDependencies:c?["rank","type","type","type","type"]:void 0},getShaderSource:v,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c?[{type:12,data:l},...R(i)]:[{type:12,data:l}]})}},Sm=e=>J(e),Cs=(e,t)=>{let{inputs:r,outputCount:n}=e,o=Sm({...t,outputCount:n});if(_e.webgpu.validateInputContent&&$m(r,o),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(xm(r,o))}});var Tm,Im,ks,Es=V(()=>{"use strict";ie();ae();Tm=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Im=e=>{let t=e[0].dims,r=e[0].dims[2],n=k.size(t)/4,o=e[0].dataType,i=E("input",o,t,4),a=E("bias",o,[r],4),d=E("residual",o,t,4),l=M("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:m=>`
  const channels = ${r}u / 4;
  ${m.declareVariables(i,a,d,l)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${i.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${d.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},ks=e=>{Tm(e.inputs),e.compute(Im(e.inputs))}});var Cm,ge,Ps,zs,Os,Bs,Ds,Ms,Rs,Us,Vs,Am,Ns,Ws,Ls,Hs,Qt,Gs,Yr,Fs,qs,js,Ks,Ys,Xs,Zs,Qs,Js,eu,tu,ru,nu,ou,iu,au,su,uu,lo,co,du,lu,cu,km,Em,pu,Xr=V(()=>{"use strict";Q();ie();Ie();ae();Cm=(e,t,r,n,o,i,a)=>{let d=Math.ceil(t/4),l="";typeof o=="string"?l=`${o}(a)`:l=o("a");let c=E("inputData",r,[d],4),m=M("outputData",n,[d],4),u=[{name:"vec_size",type:"u32"}];return a&&u.push(...a),`
      ${e.registerUniforms(u).declareVariables(c,m)}

  ${i??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${c.getByOffset("global_idx")};
    ${m.setByOffset("global_idx",l)}
  }`},ge=(e,t,r,n,o,i=e.dataType,a,d)=>{let l=[{type:12,data:Math.ceil(k.size(e.dims)/4)}];return a&&l.push(...a),{name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:c=>Cm(c,k.size(e.dims),e.dataType,i,r,n,d),getRunData:c=>({outputs:[{dims:e.dims,dataType:i}],dispatchGroup:{x:Math.ceil(k.size(c[0].dims)/64/4)},programUniforms:l})}},Ps=e=>{e.compute(ge(e.inputs[0],"Abs","abs"))},zs=e=>{e.compute(ge(e.inputs[0],"Acos","acos"))},Os=e=>{e.compute(ge(e.inputs[0],"Acosh","acosh"))},Bs=e=>{e.compute(ge(e.inputs[0],"Asin","asin"))},Ds=e=>{e.compute(ge(e.inputs[0],"Asinh","asinh"))},Ms=e=>{e.compute(ge(e.inputs[0],"Atan","atan"))},Rs=e=>{e.compute(ge(e.inputs[0],"Atanh","atanh"))},Us=e=>J(e),Vs=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ge(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Am=e=>{let t,r,n=e.length>=2&&e[1].data!==0,o=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=n?e[1].getFloat32Array()[0]:-34028234663852886e22,r=o?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=n?e[1].getUint16Array()[0]:64511,r=o?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return J({min:t,max:r})},Ns=(e,t)=>{let r=t||Am(e.inputs),n=Ee(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"Clip",o=>`clamp(${o}, vec4<${n}>(uniforms.min), vec4<${n}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:n},{name:"max",type:n}]),{inputs:[0]})},Ws=e=>{e.compute(ge(e.inputs[0],"Ceil","ceil"))},Ls=e=>{e.compute(ge(e.inputs[0],"Cos","cos"))},Hs=e=>{e.compute(ge(e.inputs[0],"Cosh","cosh"))},Qt=e=>J(e),Gs=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"Elu",n=>`elu_vf32(${n})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Yr=(e="f32")=>`
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
}`,Fs=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Yr(t)))},qs=e=>{e.compute(ge(e.inputs[0],"Exp","exp"))},js=e=>{e.compute(ge(e.inputs[0],"Floor","floor"))},Ks=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Yr(t)))},Ys=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"LeakyRelu",n=>`select(leaky_relu_alpha_ * ${n}, ${n}, ${n} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},Xs=e=>{e.compute(ge(e.inputs[0],"Not",t=>`!${t}`))},Zs=e=>{e.compute(ge(e.inputs[0],"Neg",t=>`-${t}`))},Qs=e=>{e.compute(ge(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},Js=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},eu=e=>{e.compute(ge(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},tu=e=>J(e),ru=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"HardSigmoid",n=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${n} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},nu=e=>{e.compute(ge(e.inputs[0],"Sin","sin"))},ou=e=>{e.compute(ge(e.inputs[0],"Sinh","sinh"))},iu=e=>{e.compute(ge(e.inputs[0],"Sqrt","sqrt"))},au=e=>{e.compute(ge(e.inputs[0],"Tan","tan"))},su=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,uu=e=>{e.compute(ge(e.inputs[0],"Tanh",su))},lo=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${su("v")};
}
`,co=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,du=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"FastGelu",co,lo(t),void 0,e.inputs[0].dataType))},lu=(e,t)=>{let r=Ee(e.inputs[0].dataType);return e.compute(ge(e.inputs[0],"ThresholdedRelu",n=>`select(vec4<${r}>(0.0), ${n}, ${n} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},cu=e=>{e.compute(ge(e.inputs[0],"Log","log"))},km=(e,t)=>`
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
`,Em=e=>`quick_gelu_impl(${e})`,pu=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"QuickGelu",Em,km(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}});var Pm,zm,fu,hu=V(()=>{"use strict";ie();ae();Xr();Pm=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},zm=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=E("input",e[0].dataType,e[0].dims,4),n=E("bias",e[0].dataType,[e[0].dims[2]],4),o=M("output",e[0].dataType,t,4),i=k.size(t)/4,a=he(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:l=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${l.declareVariables(r,n,o)}

  ${Yr(a)}

  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},fu=e=>{Pm(e.inputs),e.compute(zm(e.inputs))}});var Om,Bm,st,gu,yu,bu,wu,_u,vu,$u,xu,Su,Tu,Iu=V(()=>{"use strict";Q();ie();ae();Om=(e,t,r,n,o,i,a,d,l,c,m,u)=>{let h,w;typeof d=="string"?h=w=(v,x)=>`${d}((${v}),(${x}))`:typeof d=="function"?h=w=d:(h=d.scalar,w=d.vector);let g=M("outputData",m,n.length,4),y=E("aData",l,t.length,4),S=E("bData",c,r.length,4),$;if(o)if(i){let v=k.size(t)===1,x=k.size(r)===1,T=t.length>0&&t[t.length-1]%4===0,C=r.length>0&&r[r.length-1]%4===0;v||x?$=g.setByOffset("global_idx",w(v?`${y.type.value}(${y.getByOffset("0")}.x)`:y.getByOffset("global_idx"),x?`${S.type.value}(${S.getByOffset("0")}.x)`:S.getByOffset("global_idx"))):$=`
            let outputIndices = ${g.offsetToIndices("global_idx * 4u")};
            let offsetA = ${y.broadcastedIndicesToOffset("outputIndices",g)};
            let offsetB = ${S.broadcastedIndicesToOffset("outputIndices",g)};
            ${g.setByOffset("global_idx",w(a||T?y.getByOffset("offsetA / 4u"):`${y.type.value}(${y.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||C?S.getByOffset("offsetB / 4u"):`${S.type.value}(${S.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=g.setByOffset("global_idx",w(y.getByOffset("global_idx"),S.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let v=(x,T,C="")=>{let A=`aData[indexA${T}][componentA${T}]`,P=`bData[indexB${T}][componentB${T}]`;return`
            let outputIndices${T} = ${g.offsetToIndices(`global_idx * 4u + ${T}u`)};
            let offsetA${T} = ${y.broadcastedIndicesToOffset(`outputIndices${T}`,g)};
            let offsetB${T} = ${S.broadcastedIndicesToOffset(`outputIndices${T}`,g)};
            let indexA${T} = offsetA${T} / 4u;
            let indexB${T} = offsetB${T} / 4u;
            let componentA${T} = offsetA${T} % 4u;
            let componentB${T} = offsetB${T} % 4u;
            ${x}[${T}] = ${C}(${h(A,P)});
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
        ${e.registerUniform("vec_size","u32").declareVariables(y,S,g)}

        ${u??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},Bm=(e,t,r,n,o,i,a=r.dataType)=>{let d=!k.areEqual(r.dims,n.dims),l=r.dims,c=k.size(r.dims),m=!1,u=!1,h=[d];if(d){let w=rt.calcShape(r.dims,n.dims,!1);if(!w)throw new Error("Can't perform binary op on the given tensors");l=w,c=k.size(l);let g=k.size(r.dims)===1,y=k.size(n.dims)===1,S=r.dims.length>0&&r.dims[r.dims.length-1]%4===0,$=n.dims.length>0&&n.dims[n.dims.length-1]%4===0;h.push(g),h.push(y),h.push(S),h.push($);let v=1;for(let x=1;x<l.length;x++){let T=r.dims[r.dims.length-x]??1,C=n.dims[n.dims.length-x]??1;if(T===C)v*=T;else break}v%4===0?(u=!0,m=!0):(g||y||S||$)&&(m=!0)}else m=!0;return h.push(m),{name:e,shaderCache:{hint:t+h.map(w=>w.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:w=>Om(w,r.dims,n.dims,l,m,d,u,o,r.dataType,n.dataType,a,i),getRunData:()=>({outputs:[{dims:l,dataType:a}],dispatchGroup:{x:Math.ceil(c/64/4)},programUniforms:[{type:12,data:Math.ceil(k.size(l)/4)},...R(r.dims,n.dims,l)]})}},st=(e,t,r,n,o,i)=>{e.compute(Bm(t,o??"",e.inputs[0],e.inputs[1],r,n,i))},gu=e=>{st(e,"Add",(t,r)=>`${t}+${r}`)},yu=e=>{st(e,"Div",(t,r)=>`${t}/${r}`)},bu=e=>{st(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},wu=e=>{st(e,"Mul",(t,r)=>`${t}*${r}`)},_u=e=>{let t=E("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;st(e,"Pow",{scalar:(n,o)=>`pow_custom(${n},${o})`,vector:(n,o)=>`pow_vector_custom(${n},${o})`},`
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
      `)},vu=e=>{st(e,"Sub",(t,r)=>`${t}-${r}`)},$u=e=>{st(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},xu=e=>{st(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Su=e=>{st(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Tu=e=>{st(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}});var Mm,Rm,Um,Vm,Cu,Au,ku=V(()=>{"use strict";Q();ie();Ie();ae();Mm=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,n=e[r],o=n.dataType,i=n.dims.length;e.forEach((a,d)=>{if(d!==r){if(a.dataType!==o)throw new Error("input tensors should be one type");if(a.dims.length!==i)throw new Error("input tensors should have the same shape");a.dims.forEach((l,c)=>{if(c!==t&&l!==n.dims[c])throw new Error("non concat dimensions must match")})}})},Rm=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Um=(e,t)=>{let r=e.length,n=[];for(let o=0;o<r;++o){let i=t.setByOffset("global_idx",e[o].getByIndices("indices"));r===1?n.push(i):o===0?n.push(`if (inputIndex == ${o}u) { ${i} }`):o===r-1?n.push(`else { ${i} }`):n.push(`else if (inputIndex == ${o}) { ${i} }`)}return n.join(`
`)},Vm=(e,t,r,n)=>{let o=k.size(r),i=new Array(e.length),a=new Array(e.length),d=0,l=[],c=[],m=[{type:12,data:o}];for(let y=0;y<e.length;++y)d+=e[y].dims[t],i[y]=d,c.push(e[y].dims.length),a[y]=E(`input${y}`,n,c[y]),l.push("rank"),m.push({type:12,data:i[y]});for(let y=0;y<e.length;++y)m.push(...R(e[y].dims));m.push(...R(r));let u=M("output",n,r.length),h=u.indicesGet("indices",t),w=Array.from(Array(i.length).keys()).map(y=>`uniforms.sizeInConcatAxis${y}`).join(","),g=y=>`

  ${(()=>{y.registerUniform("outputSize","u32");for(let S=0;S<e.length;S++)y.registerUniform(`sizeInConcatAxis${S}`,"u32");return y.declareVariables(...a,u)})()}

  ${Rm(i.length,w)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${u.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${w});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Um(a,u)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:m}),getShaderSource:g}},Cu=(e,t)=>{let r=e.inputs,n=r[0].dims,o=k.normalizeAxis(t.axis,n.length);Mm(r,o);let i=n.slice();i[o]=r.reduce((d,l)=>d+(l.dims.length>o?l.dims[o]:0),0);let a=r.filter(d=>k.size(d.dims)>0);e.compute(Vm(a,o,i,r[0].dataType),{inputs:a})},Au=e=>J({axis:e.axis})});var He,Ge,Fe,Zr,ct=V(()=>{"use strict";Q();ie();He=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Ge=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Fe=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Zr=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,n]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:n}}else if(t==="Clip"){let[r,n]=e?.activation_params||[Ya,Xa];return{activation:t,clipMax:n,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}});var Oe,Qr,Jt=V(()=>{"use strict";Oe=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Qr=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Jr,po=V(()=>{"use strict";Jr=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var Nm,Wm,er,Eu,Lm,tr,Hm,en,rr=V(()=>{"use strict";Q();ie();ae();ct();Jt();Nm=(e,t)=>e?`
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
        }`,er=(e,t,r="f32",n,o=!1,i=32,a=!1,d=32)=>{let l=t[1]*e[1],c=t[0]*e[0],m=o?l:i,u=o?i:l,h=m/t[0],w=i/t[1];if(!((o&&h===4&&e[1]===4||!o&&(h===3||h===4))&&m%t[0]===0&&i%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${h} and workPerThread[1] ${e[1]} must be 4.
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
}`},Eu=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Lm=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",tr=(e,t,r="f32",n,o=!1,i=32,a=!1,d=32,l=!1)=>{let c=e[1]*t[1],m=e[0]*t[0],u=o?c:i,h=o?i:c;if(!(h%t[1]===0&&u%t[0]===0&&i%t[1]===0))throw new Error(`tileAHight ${h} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${u} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let w=h/t[1],g=u/t[0],y=i/t[1],S=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${c};
    let globalColStart = i32(workgroupId.x) * ${m};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${u}; inputCol = inputCol + ${t[0]}) {
          ${Eu(o,n)}
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
let tileColA = i32(localId.x) * ${g};
let tileRowB = i32(localId.y) * ${y};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${w}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${g}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Eu(o,n)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
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
    ${S}
  }
`},Hm=(e,t,r,n,o,i=!1)=>{let[a,d,l]=o,[c,m,u,h]=n,w=Nt(a,l),g=Nt(d,l),y=he(n[0].type.tensor),S=()=>{let x=m.rank,T=c.rank,C=`var aIndices: ${m.type.indices};`;for(let A=x-2-1,P=T-1;A>=0;A--,P--)C+=`
aIndices[${A}] = ${T>1?`batchIndices[${P}]`:"batchIndices"};`;return w.forEach(A=>{C+=`
aIndices[${A}] = 0;`}),C+=`
aIndices[${x-2}] = u32(row);
                   aIndices[${x-1}] = u32(colIn);`,C},$=()=>{let x=u.rank,T=c.rank,C=`var bIndices: ${u.type.indices};`;for(let A=x-2-1,P=T-1;A>=0;A--,P--)C+=`
bIndices[${A}] = ${T>1?`batchIndices[${P}]`:"batchIndices"};`;return g.forEach(A=>{C+=`
bIndices[${A}] = 0;`}),C+=`
bIndices[${x-2}] = u32(row);
                   bIndices[${x-1}] = u32(colIn);`,C};return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${c.type.indices}) -> ${Oe(e,y)} {
      var value = ${Oe(e,y)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        ${S()}
        value = ${m.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${c.type.indices}) -> ${Oe(e,y)} {
      var value = ${Oe(e,y)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        ${$()}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Oe(e,y)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${i?"bias[colIn]":`${Oe(e,y)}(bias[row])`};`:""}
        ${r}
        ${h.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},en=(e,t,r,n,o=!1,i)=>{let a=e[0].dims,d=e[1].dims,l=a.slice(0,-2),c=d.slice(0,-2),m=n?n.slice(0,-2):r.slice(0,-2),u=k.size(m),h=a[a.length-2],w=a[a.length-1],g=d[d.length-1],y=w%4===0&&g%4===0,S=h<=8?[4,1,1]:[4,4,1],$=[8,8,1],v=[Math.ceil(g/$[0]/S[0]),Math.ceil(h/$[1]/S[1]),Math.ceil(u/$[2]/S[2])],x=y?4:1,T=[...l,h,w/x],C=T.length,A=[...c,w,g/x],P=A.length,B=[u,h,g/x],N=[{type:6,data:h},{type:6,data:g},{type:6,data:w}];Ge(t,N),N.push(...R(m,T,A));let W=["rank","rank"],K=e.length>2;K&&(N.push(...R(e[2].dims)),W.push("rank")),N.push(...R(B));let Z=ee=>{let se=m.length,de=Fr("batchDims",e[0].dataType,se,1),Y=he(e[0].dataType),le=E("a",e[0].dataType,C,x),ce=E("b",e[1].dataType,P,x),q=M("result",e[0].dataType,B.length,x),ue=[le,ce];if(K){let G=o?x:1;ue.push(E("bias",e[2].dataType,e[2].dims.length,G))}let re=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Fe(t,re);let ne=he(q.type.tensor),oe=He(t,q.type.value,ne),U=Hm(x,K,oe,[de,le,ce,q],[l,c,m],o);return`
  ${ee.registerUniforms(re).registerInternalVariables(de).declareVariables(...ue,q)}
  ${U}
  ${y?er(S,$,Y,de):tr(S,$,Y,de)}
                   `};return{name:"MatMul",shaderCache:{hint:`${S};${t.activation};${y};${o}`,inputDependencies:W},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:N}),getShaderSource:Z}}});var Gm,Pu,zu=V(()=>{"use strict";Q();Xe();ae();ct();Jt();po();rr();Gm=(e,t,r,n,o=!1,i,a=4,d=4,l=4,c="f32")=>{let m=W=>{switch(W){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${c}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${W} is not supported.`)}},u=W=>{switch(W){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${W} is not supported.`)}},h=e?`
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
    `,g=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",y=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",S=e?"row":"col",$=e?"col":"row",v=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${S} / outWidth;
    let outCol = ${S} % outWidth;

    let WRow = ${$} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${$} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${$} % inChannels;
    var resData = ${Oe(a,c)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${g} && xCol >= 0 && xCol < ${y}) {
      ${h}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${m(a)}
    }
    return resData;`,x=e?t&&n?`
    let col = colIn * ${a};
    ${v}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${v}
    }
    return ${Oe(a,c)}(0.0);`:n&&r?`
    let col = colIn * ${a};
    ${v}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${v}
    }
    return ${Oe(a,c)}(0.0);`,T=`${u(d)}`,C=Oe(l,c),A=e?Oe(a,c):Oe(d,c),P=e?Oe(d,c):Oe(a,c),B=He(i,C,c);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e?x:T}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${P} {
      ${e?T:x}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${C}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${w}
      ${Qr(o)}
      ${B}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Pu=(e,t,r,n,o,i,a,d,l)=>{let c=t.format==="NHWC",m=c?e[0].dims[3]:e[0].dims[1],u=r[0],h=c?r[2]:r[3],w=c?r[1]:r[2],g=c?r[3]:r[1],y=c&&(m%4===0||m%3===0)&&g%4===0,S=c?g:h*w,$=c?h*w:g,v=[8,8,1],x=n<=8?[4,1,1]:[4,4,1],T=[Math.ceil(S/v[0]/x[0]),Math.ceil($/v[1]/x[1]),Math.ceil(u/v[2]/x[2])];me("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${T}`);let C=y?c&&m%4!==0?3:4:1,A=v[1]*x[1],P=v[0]*x[0],B=Math.max(v[0]*C,v[1]),N=n%A===0,W=o%P===0,K=i%B===0,Z=y?[C,4,4]:[1,1,1],ee=[{type:6,data:n},{type:6,data:o},{type:6,data:i},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Ge(t,ee),ee.push(...R(e[0].dims,e[1].dims));let se=["rank","rank"];a&&(ee.push(...R(e[2].dims)),se.push("rank")),ee.push(...R(r));let de=Y=>{let le=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Fe(t,le);let ce=y?4:1,q=he(e[0].dataType),ue=`
      fn setOutputAtIndex(flatIndex : i32, value : ${y?`vec4<${q}>`:q}) {
        result[flatIndex] = ${y?`vec4<${q}>`:q}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${y?`vec4<${q}>`:q}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${y?"/ 4":""}, value);
      }`,re=E("x",e[0].dataType,e[0].dims.length,C===3?1:C),ne=E("w",e[1].dataType,e[1].dims.length,ce),oe=[re,ne],U=M("result",e[0].dataType,r.length,ce);if(a){let G=E("bias",e[2].dataType,e[2].dims.length,ce);oe.push(G),ue+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${y?`vec4<${q}>`:q} {
          return bias[coords.${c?"w":"y"}${y?"/ 4":""}];
        }`}return`
        ${Jr("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${Y.registerUniforms(le).declareVariables(...oe,U)}
        ${ue}
        ${Gm(c,N,W,K,a,t,Z[0],Z[1],Z[2],q)}
        ${y?er(x,v,q,void 0,!c,B):tr(x,v,q,void 0,!c,B,!1,void 0,d)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${C};${y};${N};${W};${K};${A};${P};${B}`,inputDependencies:se},getRunData:()=>({outputs:[{dims:l?l(r):r,dataType:e[0].dataType}],dispatchGroup:{x:T[0],y:T[1],z:T[2]},programUniforms:ee}),getShaderSource:de}}});var Fm,Ou,tn,qm,Bu,jm,Du,Mu,Ru=V(()=>{"use strict";Q();Xe();ie();ae();ct();Jt();Fm=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Ou=e=>typeof e=="number"?[e,e,e]:e,tn=(e,t)=>t<=1?e:e+(e-1)*(t-1),qm=(e,t,r,n=1)=>{let o=tn(t,n);return Math.floor((e[0]*(r-1)-r+o)/2)},Bu=(e,t,r,n,o)=>{o==null&&(o=qm(e,t[0],n[0]));let i=[0,0,0,r];for(let a=0;a<3;a++)e[a]+2*o>=t[a]&&(i[a]=Math.trunc((e[a]-t[a]+2*o)/n[a]+1));return i},jm=(e,t,r,n,o,i,a,d,l,c)=>{let m,u,h,w;if(e==="VALID"&&(e=0),typeof e=="number"){m={top:e,bottom:e,left:e,right:e,front:e,back:e};let g=Bu([t,r,n,1],[d,l,c],1,[o,i,a],e);u=g[0],h=g[1],w=g[2]}else if(Array.isArray(e)){if(!e.every((y,S,$)=>y===$[0]))throw Error(`Unsupported padding parameter: ${e}`);m={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let g=Bu([t,r,n,1],[d,l,c],1,[o,i,a],e[0]);u=g[0],h=g[1],w=g[2]}else if(e==="SAME_UPPER"){u=Math.ceil(t/o),h=Math.ceil(r/i),w=Math.ceil(n/a);let g=(u-1)*o+d-t,y=(h-1)*i+l-r,S=(w-1)*a+c-n,$=Math.floor(g/2),v=g-$,x=Math.floor(y/2),T=y-x,C=Math.floor(S/2),A=S-C;m={top:x,bottom:T,left:C,right:A,front:$,back:v}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:m,outDepth:u,outHeight:h,outWidth:w}},Du=(e,t,r,n,o,i=!1,a="channelsLast")=>{let d,l,c,m,u;if(a==="channelsLast")[d,l,c,m,u]=e;else if(a==="channelsFirst")[d,u,l,c,m]=e;else throw new Error(`Unknown dataFormat ${a}`);let[h,,w,g,y]=t,[S,$,v]=Ou(r),[x,T,C]=Ou(n),A=tn(w,x),P=tn(g,T),B=tn(y,C),{padInfo:N,outDepth:W,outHeight:K,outWidth:Z}=jm(o,l,c,m,S,$,v,A,P,B),ee=i?h*u:h,se=[0,0,0,0,0];return a==="channelsFirst"?se=[d,ee,W,K,Z]:a==="channelsLast"&&(se=[d,W,K,Z,ee]),{batchSize:d,dataFormat:a,inDepth:l,inHeight:c,inWidth:m,inChannels:u,outDepth:W,outHeight:K,outWidth:Z,outChannels:ee,padInfo:N,strideDepth:S,strideHeight:$,strideWidth:v,filterDepth:w,filterHeight:g,filterWidth:y,effectiveFilterDepth:A,effectiveFilterHeight:P,effectiveFilterWidth:B,dilationDepth:x,dilationHeight:T,dilationWidth:C,inShape:e,outShape:se,filterShape:t}},Mu=(e,t,r,n,o,i)=>{let a=i==="channelsLast",d=a?e[0].dims[3]:e[0].dims[1],l=!1,c=[64,1,1],m={x:r.map((v,x)=>x)},u=[Math.ceil(Fm(m.x.map(v=>r[v]))/c[0]),1,1];me("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${u}`);let h=l?a&&d%4!==0?3:4:1,w=k.size(r),g=[{type:12,data:w},{type:12,data:n},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];Ge(t,g),g.push(...R(e[0].dims,e[1].dims));let y=["rank","rank"],S=e.length===3;S&&(g.push(...R(e[2].dims)),y.push("rank")),g.push(...R(r));let $=v=>{let x=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:n.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Fe(t,x);let T=l?4:1,C=he(e[0].dataType),A=E("x",e[0].dataType,e[0].dims.length,h===3?1:h),P=E("W",e[1].dataType,e[1].dims.length,T),B=[A,P],N=M("result",e[0].dataType,r.length,T),W="";if(S){let ee=E("bias",e[2].dataType,e[2].dims.length,T);B.push(ee),W+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l?`vec4<${C}>`:C} {
          return bias[${a?F("coords",4,5):F("coords",1,5)}${l?"/ 4":""}];
        }`}let K=Oe(h,C),Z=He(t,K,C);return`
            ${W}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${A.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${P.getByIndices("aIndices")};
            }
          ${v.registerUniforms(x).declareVariables(...B,N)}
          ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${N.offsetToIndices("global_idx")};
              let batch = ${F("coords",0,A.rank)};
              let d2 = ${a?F("coords",A.rank-1,A.rank):F("coords",1,A.rank)};
              let xFRCCorner = vec3<u32>(${a?F("coords",1,A.rank):F("coords",2,A.rank)},
              ${a?F("coords",2,A.rank):F("coords",3,A.rank)},
              ${a?F("coords",3,A.rank):F("coords",4,A.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?F("uniforms.x_shape",1,A.rank):F("uniforms.x_shape",2,A.rank)};
              let xShapeZ = ${a?F("uniforms.x_shape",2,A.rank):F("uniforms.x_shape",3,A.rank)};
              let xShapeW = ${a?F("uniforms.x_shape",3,A.rank):F("uniforms.x_shape",4,A.rank)};
              let xShapeU = ${a?F("uniforms.x_shape",4,A.rank):F("uniforms.x_shape",1,A.rank)};
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
              ${Z}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${a};${h};${S}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:u[0],y:u[1],z:u[2]},programUniforms:g}),getShaderSource:$}}});var Uu,Vu,Nu=V(()=>{"use strict";Q();ie();ae();ct();Uu=(e,t,r,n)=>{let o=e.length>2,i=o?"value += b[output_channel];":"",a=e[0].dims,d=e[1].dims,l=t.format==="NHWC",c=l?r[3]:r[1],m=c/t.group,u=l&&m>=4?we(c):1,h=k.size(r)/u,w=[{type:12,data:h},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:m}];Ge(t,w),w.push(...R(a,[d[0],d[1],d[2],d[3]/u]));let g=o?["rank","rank","rank"]:["rank","rank"];w.push(...R([r[0],r[1],r[2],r[3]/u]));let y=S=>{let $=M("output",e[0].dataType,r.length,u),v=he($.type.tensor),x=He(t,$.type.value,v),T=E("x",e[0].dataType,a.length),C=E("w",e[1].dataType,d.length,u),A=[T,C];o&&A.push(E("b",e[2].dataType,e[2].dims,u));let P=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Fe(t,P);let B=l?`
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
  ${S.registerUniforms(P).declareVariables(...A,$)}

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${$.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${u} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${B}
    ${i}
    ${x}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${u}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:w}),getShaderSource:y}},Vu=(e,t,r,n)=>{let o=e.length>2,i=we(r[3]),a=we(r[2]),d=k.size(r)/i/a,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/i],c=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/i],m=[r[0],r[1],r[2],r[3]/i],u=[{type:12,data:d},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Ge(t,u),u.push(...R(l,c,m));let h=(a-1)*t.strides[1]+c[1],w=g=>{let y=M("output",e[0].dataType,m.length,i),S=he(y.type.tensor),$=He(t,y.type.value,S),v=E("x",e[0].dataType,l.length,i),x=E("w",e[1].dataType,c.length,i),T=[v,x];o&&T.push(E("b",e[2].dataType,e[2].dims,i));let C=o?"value += b[output_channel];":"",A=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Fe(t,A),`
  ${g.registerUniforms(A).declareVariables(...T,y)}
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

    var x_vals: array<${v.type.value}, ${h}>;
    var values: array<${y.type.value}, ${a}>;
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
          let w_val = ${x.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${a}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${a}u; i++) {
      var value = values[i];
      ${C}
      ${$}
      ${y.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${i};${a};${h};${c[0]};${c[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:u}),getShaderSource:w}}});var mo,Km,Wu,fo=V(()=>{"use strict";Q();ie();rr();ae();ct();mo=(e,t,r,n,o=!1,i)=>{let a=e[0].dims,d=e[1].dims,l=a[a.length-2],c=d[d.length-1],m=a[a.length-1],u=we(c),h=we(m),w=we(l),g=k.size(r)/u/w,y=e.length>2,S=n?n.slice(0,-2):r.slice(0,-2),v=[k.size(S),l,c],x=[{type:12,data:g},{type:12,data:l},{type:12,data:c},{type:12,data:m}];Ge(t,x),x.push(...R(S,a,d)),y&&x.push(...R(e[2].dims)),x.push(...R(v));let T=C=>{let A=Fr("batch_dims",e[0].dataType,S.length),P=E("a",e[0].dataType,a.length,h),B=E("b",e[1].dataType,d.length,u),N=M("output",e[0].dataType,v.length,u),W=he(N.type.tensor),K=He(t,N.type.value,W),Z=[P,B],ee="";if(y){let re=o?u:1;Z.push(E("bias",e[2].dataType,e[2].dims.length,re)),ee=`${o?`value += bias[col / ${re}];`:`value += ${N.type.value}(bias[row + i]);`}`}let se=a.slice(0,-2),de=d.slice(0,-2),Y=Nt(se,S),le=Nt(de,S),ce=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Fe(t,ce);let q=(re,ne)=>{let oe=re.rank,U=re.name;if(oe===2)return`var ${U}_indices = ${re.type.indices}(0u, 0u);`;let G=A.rank,ye=`var ${U}_indices: ${re.type.indices};`;for(let Re=oe-2-1,$e=G-1;Re>=0;Re--,$e--)ye+=`
${U}_indices[${Re}] = ${G>1?`batch_indices[${$e}]`:"batch_indices"};`;return ne.forEach(Re=>{ye+=`
${U}_indices[${Re}] = 0;`}),ye+=`${U}_indices[${oe-2}] = 0u;
                     ${U}_indices[${oe-1}] = 0u;`,ye},ue=()=>{let re=`var a_data: ${P.type.value};`;for(let ne=0;ne<h;ne++)re+=`
              let b_data${ne} = b[(b_offset + (k + ${ne}) * uniforms.N + col) / ${u}];`;for(let ne=0;ne<w;ne++){re+=`a_data = a[(a_offset + (row + ${ne}) * uniforms.K + k) / ${h}];`;for(let oe=0;oe<h;oe++)re+=`
            values[${ne}] = fma(${B.type.value}(a_data${h===1?"":`[${oe}]`}), b_data${oe}, values[${ne}]);
`}return re};return`
  ${C.registerUniforms(ce).registerInternalVariables(A).declareVariables(...Z,N)}
  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${u})) * ${u};
    var index1 = global_idx / (uniforms.N / ${u});
    let stride1 = uniforms.M / ${w};
    let row = (index1 % stride1) * ${w};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${A.offsetToIndices("batch")};`}
    ${q(P,Y)}
    let a_offset = ${P.indicesToOffset("a_indices")};
    ${q(B,le)}
    let b_offset = ${B.indicesToOffset("b_indices")};
    var values: array<${N.type.value}, ${w}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${ue()}
    }
    for (var i = 0u; i < ${w}u; i++) {
      var value = values[i];
      ${ee}
      ${K}
      let cur_indices = ${N.type.indices}(batch, row + i, col);
      let offset = ${N.indicesToOffset("cur_indices")};
      ${N.setByOffset(`offset / ${u}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${u};${h};${w};${o}`,inputDependencies:y?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:x}),getShaderSource:T}},Km=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Wu=e=>{Km(e.inputs);let t=rt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];r<8&&n<8?e.compute(mo(e.inputs,{activation:""},t)):e.compute(en(e.inputs,{activation:""},t))}});var Ym,ho,Xm,go,yo,Lu,Zm,Qm,bo,Hu=V(()=>{"use strict";ie();zu();Ru();rr();Nu();ct();fo();lt();Ym=(e,t,r,n,o,i)=>{let a=e[0],d=e.slice(i?1:2,i?3:4),l=d.length,c=t[0],u=t.slice(2).map((g,y)=>g+(g-1)*(r[y]-1)),w=d.map((g,y)=>g+n[y]+n[y+l]).map((g,y)=>Math.floor((g-u[y]+o[y])/o[y]));return w.splice(0,0,a),w.splice(i?3:1,0,c),w},ho=[2,3,1,0],Xm=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[1]*t.group;if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},go=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let i=2;i<t[1].dims.length;++i)r[i-2]===0&&(r[i-2]=t[1].dims[i]);let n=e.pads.slice();Ct.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.format==="NHWC",e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:r,pads:n}),o},yo=e=>{let t=Zr(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],o=e.dilations,i=e.group,a=e.kernel_shape,d=e.pads,l=e.strides,c=e.w_is_const();return{autoPad:n,format:r,dilations:o,group:i,kernelShape:a,pads:d,strides:l,wIsConst:c,...t,cacheKey:`${e.format};${t.activation};`}},Lu=(e,t,r,n)=>{let o=r.format==="NHWC",i=Ym(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,o);if(r.group!==1){let A=[t[0]];if(o){let B=e.kernelCustomData.wT??e.compute(Pe(t[1],ho),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=B),A.push(B)}else A.push(t[1]);t.length===3&&A.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(Vu(A,r,i,n),{inputs:A}):e.compute(Uu(A,r,i,n),{inputs:A});return}let a=t.length===3,d=t[0].dims[o?1:2],l=t[0].dims[o?2:3],c=t[0].dims[o?3:1],m=t[1].dims[2],u=t[1].dims[3],h=i[o?1:2],w=i[o?2:3],g=i[o?3:1],y=o&&m===d&&u===l&&r.pads[0]===0&&r.pads[1]===0;if(y||m===1&&u===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let A=i[0],P,B,N,W=[];if(o){let ee=e.kernelCustomData.wT??e.compute(Pe(t[1],ho),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=ee),y){let se=d*l*c;P=t[0].reshape([1,A,se]),B=ee.reshape([1,se,g]),N=[1,A,g]}else P=t[0].reshape([A,d*l,c]),B=ee.reshape([1,c,g]),N=[A,h*w,g];W.push(P),W.push(B)}else P=t[0].reshape([A,c,d*l]),B=t[1].reshape([1,g,c]),N=[A,g,h*w],W.push(B),W.push(P);a&&W.push(t[2]);let K=N[2],Z=W[0].dims[W[0].dims.length-1];K<8&&Z<8?e.compute(mo(W,r,i,N,o,n),{inputs:W}):e.compute(en(W,r,i,N,o,n),{inputs:W});return}let S=!0,$=e.kernelCustomData.wT??e.compute(Pe(t[1],ho),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let v=[t[0],$];a&&v.push(t[2]);let x=o?h*w:g,T=o?g:h*w,C=m*u*c;e.compute(Pu(v,r,i,x,T,C,a,S,n),{inputs:v})},Zm=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],i=[1].concat(t.strides),a=[1].concat(t.dilations),d=[1].concat(t.kernelShape),l=go({...t,pads:o,strides:i,dilations:a,kernelShape:d},n);Lu(e,n,l,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},Qm=(e,t,r)=>{let n=r.format==="NHWC"?"channelsLast":"channelsFirst",o=go(r,t),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,a=Du(t[0].dims,t[1].dims,r.strides,r.dilations,i,!1,n);e.compute(Mu(t,o,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],n))},bo=(e,t)=>{if(Xm(e.inputs,t),e.inputs[0].dims.length===3)Zm(e,t);else if(e.inputs[0].dims.length===5)Qm(e,e.inputs,t);else{let r=go(t,e.inputs);Lu(e,e.inputs,r)}}});var Jm,Gu,Fu=V(()=>{"use strict";Q();Xe();ae();ct();Jt();po();rr();Jm=(e,t=!1,r,n,o=4)=>{let i=$=>{switch($){case 1:return"return w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];";case 4:return`
            let coord1 = vec4<i32>(coordX, coordY, col + 1, rowInner);
            let coord2 = vec4<i32>(coordX, coordY, col + 2, rowInner);
            let coord3 = vec4<i32>(coordX, coordY, col + 3, rowInner);
            let v0 = w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];
            let v1 = w[getIndexFromCoords4D(coord1, vec4<i32>(uniforms.w_shape))];
            let v2 = w[getIndexFromCoords4D(coord2, vec4<i32>(uniforms.w_shape))];
            let v3 = w[getIndexFromCoords4D(coord3, vec4<i32>(uniforms.w_shape))];
            return ${n}(v0, v1, v2, v3);
            `;default:throw new Error(`innerElementSize ${$} is not supported.`)}},a=e?`
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
      return ${n}(0.0);`,g=`
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
      `,y=He(r,n);return`
  fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${n} {
    ${e?w:g}
  }

  fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${n} {
    ${e?g:w}
  }

  fn mm_write(batch: i32, row : i32, colIn : i32, valueInput : ${n}) {
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
      var value = valueInput;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${d}
      ${Qr(t)}
      ${y}
      result[getIndexFromCoords4D(coords, vec4<i32>(uniforms.result_shape))/${o}] = value;
    }
  }`},Gu=(e,t,r,n,o,i,a,d)=>{let l=t.format==="NHWC",c=l?e[0].dims[3]:e[0].dims[1],m=r[0],u=l?r[2]:r[3],h=l?r[1]:r[2],w=l?r[3]:r[1],g=l&&c%4===0&&c%3&&w%4===0,y=l?w:u*h,S=l?u*h:w,$=[8,8,1],v=n<=8?[4,1,1]:[4,4,1],x=[Math.ceil(y/$[0]/v[0]),Math.ceil(S/$[1]/v[1]),Math.ceil(m/$[2]/v[2])];me("verbose",()=>`[conv_backprop_mm_webgpu] dispatch = ${x}`);let T=g?4:1,C=Math.max($[0]*T,$[1]),A=g?4:1,P=[t.kernelShape[l?1:2],t.kernelShape[l?2:3]],B=[P[0]+(t.dilations[0]<=1?0:(P[0]-1)*(t.dilations[0]-1)),P[1]+(t.dilations[1]<=1?0:(P[1]-1)*(t.dilations[1]-1))],N=[B[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),B[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],W=[{type:6,data:n},{type:6,data:o},{type:6,data:i},{type:6,data:t.strides},{type:6,data:t.dilations},{type:6,data:P},{type:6,data:N}];Ge(t,W),W.push(...R(e[0].dims,e[1].dims));let K=["rank","rank"];a&&(W.push(...R(e[2].dims)),K.push("rank")),W.push(...R(r));let Z=ee=>{let se=E("x",e[0].dataType,e[0].dims.length,A),de=E("w",e[1].dataType,e[1].dims.length,1),Y=M("result",e[0].dataType,r.length,A),le=[se,de],ce="";if(a){let re=E("bias",e[2].dataType,e[2].dims.length,A);le.push(re),ce+=`
          fn getBiasByOutputCoords(coords : vec4<i32>) -> ${re.type.value} {
            return bias[coords.${l?"w":"y"}${g?"/ 4":""}];
          }`}let q=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"strides",type:"i32",length:2},{name:"dilations",type:"i32",length:2},{name:"filter_dims",type:"i32",length:P.length},{name:"pads",type:"i32",length:N.length}];Fe(t,q);let ue=he(e[0].dataType,1);if(ue!=="f16"&&ue!=="f32")throw new Error(`elemType ${ue} is not supported.`);return`
        ${Jr("uniforms.result_strides")}
        ${ee.registerUniforms(q).declareVariables(...le,Y)};
        ${ce}
        ${Jm(l,a,t,se.type.value,T)}
        ${g?er(v,$,ue,void 0,!l,C):tr(v,$,ue,void 0,!l,C,!1,void 0,d)}`};return{name:"Conv2DTransposeMatMul",shaderCache:{hint:`${t.cacheKey};${v};${$};${g}`,inputDependencies:K},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:x[0],y:x[1],z:x[2]},programUniforms:W}),getShaderSource:Z}}});var ef,wo,qu=V(()=>{"use strict";Q();Xe();ie();ae();ef=(e,t,r,n,o,i=!1,a,d,l=!1)=>{let c=l?1:2,m=l?2:3,u=l?3:1,h=i?2:1,w=`
  fn setOutputAtIndex(flatIndex : u32, value : ${i?`vec4<${a}>`:a}) {
    result[flatIndex] = ${i?`vec4<${a}>`:a}(value);
  }`;n&&(w+=`
    fn getBiasByOutputCoords(coords : vec4<u32>) -> ${i?`vec4<${a}>`:a} {
      return bias[coords.${l?"w":"y"}${i?"/ 4":""}];
    }`);let g=i?4:1,y=E("W",t[1].dataType,t[1].dims.length,g),S=E("Dy",t[0].dataType,t[0].dims.length,g),$=[S,y];n&&$.push(E("bias",t[2].dataType,[r[u]].length,g));let v=M("result",t[0].dataType,r.length,g),x=`{
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
                let wValue0 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${S.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${a}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;

                xValue =  ${S.get("batch","idyR","idyC2","d2")};

                dotProd[1] = dotProd[1] + vec4<${a}>(dot(xValue, wValue0),
                                                    dot(xValue, wValue1),
                                                    dot(xValue, wValue2),
                                                    dot(xValue, wValue3));
              }
            } else if (bDyCVal) {
              let d2Length = uniforms.Dy_shape[${u}];
              for (var d2: u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${S.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${a}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;
              }
            } else if (bDyCVal2) {
              let d2Length = uniforms.Dy_shape[3];
              for (var d2: u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${S.get("batch","idyR","idyC2","d2")};
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
                let xValue = ${l?S.get("batch","idyR","idyC","inputChannel"):S.get("batch","inputChannel","idyR","idyC")};
                let wValue = ${y.get("inputChannel","wOutChannel","u32(wRPerm)","u32(wCPerm)")};
                dotProd = dotProd + xValue * wValue;
                inputChannel = inputChannel + 1;
              }
            }
          }
          let value = dotProd + ${n?"bias[d1]":`${a}(0.0)`};
          ${v.setByOffset("global_idx","value")};
        `;return`
  ${e.registerUniforms(d).declareVariables(...$,v)}
  ${w}

    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
  ${i?x:T}}`},wo=(e,t,r)=>{let n=e.length>2,o=t.outputShape,i=k.size(o),a=[Math.ceil(i/64),1,1];me("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${a}`);let d=t.format==="NHWC",l=["rank","rank"],c=[t.strides[0],t.strides[1]],m=[t.kernelShape[d?1:2],t.kernelShape[d?2:3]],u=[t.dilations[0],t.dilations[1]],h=[m[0]+(t.dilations[0]<=1?0:(t.kernelShape[d?1:2]-1)*(t.dilations[0]-1)),m[1]+(t.dilations[1]<=1?0:(t.kernelShape[d?2:3]-1)*(t.dilations[1]-1))],w=[h[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),h[1]-1-Math.floor(t.pads[1]+t.pads[3])/2],g=!1,y=t.group,S=e[1].dims,$=S[0]/y,v=S[1],x=[{type:12,data:i},{type:12,data:c},{type:12,data:m},{type:12,data:u},{type:12,data:h},{type:6,data:w},{type:12,data:$},{type:12,data:v},...R(e[0].dims,e[1].dims)];n&&(x.push(...R(e[2].dims)),l.push("rank")),x.push(...R(o));let T=a[1]===1&&a[2]===1,C=A=>{let P=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:c.length},{name:"filter_dims",type:"u32",length:m.length},{name:"dilations",type:"u32",length:m.length},{name:"effective_filter_dims",type:"u32",length:h.length},{name:"pads",type:"i32",length:w.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],B=he(e[0].dataType);return`${ef(A,e,o,n,T,g,B,P,d)}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};`,inputDependencies:l},getRunData:()=>({dispatchGroup:{x:a[0],y:a[1],z:a[2]},outputs:[{dims:r?r(o):o,dataType:e[0].dataType}],programUniforms:x}),getShaderSource:C}}});var tf,rf,nf,ju,Ku,of,af,sf,uf,Yu,Xu=V(()=>{"use strict";Fu();qu();ct();lt();tf=(e,t,r,n,o,i)=>(e-1)*t+r+(n-1)*o+1-i,rf=(e,t,r,n,o)=>{let i=Math.floor(e/2);t==="SAME_UPPER"?(r[n]=i,r[o]=e-i):t==="SAME_LOWER"&&(r[n]=e-i,r[o]=i)},nf=(e,t,r,n,o,i,a,d,l,c)=>{let m=e.length-2,u=c.length===0;l.length<m&&l.push(...Array(m-l.length).fill(0));let h=e[0],w=t[d?3:1]*o;for(let g=0,y=e.length-m-(d?1:0);g<m;++g,++y){let S=e[y],$=u?S*a[g]:c[g],v=tf(S,a[g],i[g],t[y],r[g],$);rf(v,n,i,g,g+m),u&&c.push(a[g]*(S-1)+l[g]+(t[y]-1)*r[g]+1-i[g]-i[g+m])}c.splice(0,0,h),c.splice(d?3:1,0,w)},ju=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((u,h)=>u*h,1)===0){r.length=0;for(let u=2;u<t[1].dims.length;++u)r.push(t[1].dims[u])}let n=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let o=e.pads.slice(),i=e.outputShape.slice(),a=e.outputPadding.slice(),d=t[0].dims,l=e.dilations.slice();if(l.reduce((u,h)=>u+h,0)===0){let u=t[0].dims.length-2;l=new Array(u).fill(1)}let c=e.strides.slice();if(c.reduce((u,h)=>u+h,0)===0){let u=t[0].dims.length-2;c=new Array(u).fill(1)}nf(d,r,l,e.autoPad,e.group,o,c,n,a,i);let m=Object.assign({},e);return Object.assign(m,{kernelShape:r,pads:o,outputPadding:a,outputShape:i,dilations:l,strides:c}),m},Ku=e=>{let t=Zr(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,i=e.group,a=e.kernelShape,d=e.pads,l=e.strides,c=e.wIsConst(),m=e.outputPadding,u=e.outputShape;return{autoPad:n,format:r,dilations:o,group:i,kernelShape:a,outputPadding:m,outputShape:u,pads:d,strides:l,wIsConst:c,...t,cacheKey:`${e.format};${t.activation};`}},of=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[0];if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==o))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((m,u)=>m+u,0)>0&&t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.reduce((m,u)=>m+u,0)>0&&t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.reduce((m,u)=>m+u,0)>0&&t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.outputPadding.length!==i&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((m,u)=>m+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},af=[2,3,1,0],sf=(e,t,r)=>{let n=ju(r,t),o=r.format==="NHWC",i=n.outputShape,a=i[o?3:1],d=t[0].dims[o?3:1];if(n.group!==1||a===1&&d===1){e.compute(wo(t,n));return}let l=i[o?1:2],c=i[o?2:3],m=t[1].dims[2],u=t[1].dims[3],h=o?l*c:a,w=o?a:l*c,g=m*u*d,y=!0,S=e.kernelCustomData.wT??e.compute(Pe(t[1],af),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=S);let $=[t[0],S],v=t.length===3;v&&(!o&&t[2].dims.length===1?$.push(t[2].reshape([t[2].dims[0],1,1])):$.push(t[2])),e.compute(Gu($,n,i,h,w,g,v,y),{inputs:$})},uf=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=t.kernelShape;(o.length===0||o[0]===0)&&(o=[e.inputs[1].dims[2]]);let i=t.dilations;(i.length===0||i[0]===0)&&(i=[1]);let a=t.strides;(a.length===0||a[0]===0)&&(a=[1]);let d=t.pads;d.length===0&&(d=[0,0]),d=[0,d[0],0,d[1]],a=[1].concat(a),i=[1].concat(i),o=[1].concat(o);let l=ju({...t,pads:d,strides:a,dilations:i,kernelShape:o},n);e.compute(wo(n,l,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]]))},Yu=(e,t)=>{of(e.inputs,t),e.inputs[0].dims.length===3?uf(e,t):sf(e,e.inputs,t)}});var df,Zu,Qu,Ju=V(()=>{"use strict";Q();ie();Ie();ae();df=(e,t,r,n)=>{let o=k.size(t),i=t.length,a=E("input",e,i),d=M("output",e,i),l=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),c=k.normalizeAxis(l,i),m=u=>{let h=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,w=F("uniforms.input_shape","uniforms.axis",i),g=n.reverse?h+(n.exclusive?" + 1":""):"0",y=n.reverse?w:h+(n.exclusive?"":" + 1");return`
                ${u.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,d)}
                ${u.mainStart()}
                  ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${d.offsetToIndices("global_idx")};
                  var sum = ${d.type.value}(0);
                  let first : i32 = ${g};
                  let last : i32 = ${y};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${d.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:c},...R(t,t)]}),getShaderSource:m}},Zu=(e,t)=>{let r=e.inputs[0].dims,n=e.inputs[0].dataType,o=e.inputs[1];e.compute(df(n,r,o,t),{inputs:[0]})},Qu=e=>{let t=e.exclusive===1,r=e.reverse===1;return J({exclusive:t,reverse:r})}});var lf,cf,pf,ed,td,rd=V(()=>{"use strict";Q();ie();Ie();ae();lf=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},cf=(e,t,r,n)=>{let o=[];o.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<t;++i)o.push(r.indicesSet("a",e[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},pf=(e,t)=>{let r,n,o,i,a,d,l=t.format==="NHWC",c=t.blocksize,m=t.mode==="DCR";l?([r,n,o,i]=e.dims,a=m?[r,n,o,c,c,i/c**2]:[r,n,o,i/c**2,c,c],d=m?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,o,i]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],a=m?[r,c,c,i/c**2,n,o]:[r,i/c**2,c,c,n,o],d=m?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let u=e.reshape(a),h=u.dims.length,w=e.dataType,g=E("a",w,h),y=M("output",w,h),S=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(g,y)}

  ${cf(d,h,g,y)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${y.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${y.setByOffset("global_idx",g.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let v=l?[r,n*c,o*c,i/c**2]:[r,i/c**2,n*c,o*c],x=k.size(v),T=u.dims,C=k.sortBasedOnPerm(T,d);return{outputs:[{dims:v,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(x/64)},programUniforms:[{type:12,data:x},...R(T,C)]}},getShaderSource:S}},ed=(e,t)=>{lf(e.inputs),e.compute(pf(e.inputs[0],t))},td=e=>J({blocksize:e.blocksize,mode:e.mode,format:e.format})});var _o,rn,nd,mf,ff,vo,$o,od,hf,id,ad,sd=V(()=>{"use strict";Q();ie();Ie();ae();_o="[a-zA-Z]|\\.\\.\\.",rn="("+_o+")+",nd="^"+rn+"$",mf="("+rn+",)*"+rn,ff="^"+mf+"$",vo=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,r){let n=this.symbolToIndices.get(t);n===void 0?n=[r]:n.push(r),this.symbolToIndices.set(t,n)}},$o=class{constructor(t,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,o]=r.includes("->")?r.split("->",2):[r,""];if(!n.match(RegExp(ff)))throw new Error("Invalid LHS term");if(n.split(",").forEach((d,l)=>{let c=t[l].dims.slice();if(!d.match(RegExp(nd)))throw new Error("Invalid LHS term");let m=this.processTerm(d,!0,c,l);this.lhs.push(m)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([d,l])=>l.count===1||d==="...").map(([d])=>d).join("");else if(!o.match(RegExp(rn)))throw new Error("Invalid RHS");o.match(RegExp(_o,"g"))?.forEach(d=>{if(d==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let l=this.symbolToInfo.get(d);if(l===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(l.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(t,r,n){let o=this.symbolToInfo.get(t);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(n)}else o={count:1,dimValue:r,inputIndices:[n]};this.symbolToInfo.set(t,o)}processTerm(t,r,n,o=-1){let i=n.length,a=!1,d=[],l=0;if(!t.match(RegExp(nd))&&!r&&t!=="")throw new Error("Invalid LHS term");let c=t.match(RegExp(_o,"g")),m=new vo(o);return c?.forEach((u,h)=>{if(u==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let w=i-c.length+1;if(w<0)throw new Error("Ellipsis out of bounds");if(d=n.slice(l,l+w),this.hasEllipsis){if(this.ellipsisDims.length!==d.length||this.ellipsisDims.toString()!==d.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=d;else throw new Error("Ellipsis must be specified in the LHS");for(let g=0;g<d.length;g++){let y=String.fromCharCode("0".charCodeAt(0)+g);m.addSymbol(y,h+g),this.addSymbol(y,n[l++],o)}}else m.addSymbol(u,h+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(u,n[l++],o)}),m}},od=e=>e+"_max",hf=(e,t,r,n)=>{let i=e.map(m=>m.length).map((m,u)=>E(`input${u}`,t,m)),a=k.size(n),d=M("output",t,n.length),l=[...r.symbolToInfo.keys()].filter(m=>!r.rhs.symbolToIndices.has(m)),c=m=>{let u=[],h="var prod = 1.0;",w="var sum = 0.0;",g="sum += prod;",y=[],S=[],$=[],v=[],x=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((C,A)=>{if(r.rhs.symbolToIndices.has(A)){let P=r.rhs.symbolToIndices.get(A)?.[0];P!==void 0&&r.lhs.forEach((B,N)=>{if(C.inputIndices.includes(N)){let W=B.symbolToIndices.get(A);if(W===void 0)throw new Error("Invalid symbol error");W.forEach(K=>{u.push(`${i[N].indicesSet(`input${N}Indices`,K,d.indicesGet("outputIndices",P))}`)})}})}else r.lhs.forEach((P,B)=>{if(C.inputIndices.includes(B)){let N=P.symbolToIndices.get(A);if(N===void 0)throw new Error("Invalid symbol error");N.forEach(W=>{y.push(`${i[B].indicesSet(`input${B}Indices`,W,`${A}`)}`)}),v.push(`prod *= ${i[B].getByIndices(`input${B}Indices`)};`)}}),S.push(`for(var ${A}: u32 = 0; ${A} < uniforms.${od(A)}; ${A}++) {`),$.push("}")});let T=x?[...u,`let sum = ${i.map((C,A)=>C.getByIndices(`input${A}Indices`)).join(" * ")};`]:[...u,w,...S,...y,h,...v,g,...$];return`
            ${m.registerUniforms(l.map(C=>({name:`${od(C)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,d)}

            ${m.mainStart()}
            ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${d.offsetToIndices("global_idx")};
            ${i.map((C,A)=>`var input${A}Indices: ${i[A].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${d.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let m=l.filter(h=>r.symbolToInfo.has(h)).map(h=>({type:12,data:r.symbolToInfo.get(h)?.dimValue||0}));m.push({type:12,data:a});let u=e.map((h,w)=>[...R(h)]).reduce((h,w)=>h.concat(w),m);return u.push(...R(n)),{outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:u}},getShaderSource:c}},id=(e,t)=>{let r=new $o(e.inputs,t.equation),n=r.outputDims,o=e.inputs.map((i,a)=>i.dims);e.compute(hf(o,e.inputs[0].dataType,r,n))},ad=e=>{let t=e.equation.replace(/\s+/g,"");return J({equation:t})}});var gf,ud,yf,bf,dd,ld=V(()=>{"use strict";Q();ie();ae();gf=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,o=t.length<r.length?0:t.length-r.length;for(;n<r.length&&o<t.length;++n,++o)if(r[n]!==t[o]&&r[n]!==1&&t[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},ud=(e,t)=>{let r=e.length-t.length,n=[];for(let o=0;o<r;++o)n.push(e[o]);for(let o=0;o<t.length;++o)n.push(t[o]===1?e[o+r]:t[o]);return n},yf=(e,t)=>e.length>t.length?ud(e,t):ud(t,e),bf=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=yf(t,r),o=e[0].dataType,i=o===9?4:1,a=Math.ceil(k.size(n)/i),d=c=>{let m=E("input",o,t.length,i),u=M("output",o,n.length,i),h;if(o===9){let w=(g,y,S="")=>`
          let outputIndices${y} = ${u.offsetToIndices(`outputOffset + ${y}u`)};
          let offset${y} = ${m.broadcastedIndicesToOffset(`outputIndices${y}`,u)};
          let index${y} = offset${y} / 4u;
          let component${y} = offset${y} % 4u;
          ${g}[${y}] = ${S}(${m.getByOffset(`index${y}`)}[component${y}]);
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
    ${h}`},l=[{type:12,data:a},...R(t,n)];return{name:"Expand",shaderCache:{hint:`${n.length}`,inputDependencies:["rank"]},getShaderSource:d,getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l})}},dd=e=>{gf(e.inputs),e.compute(bf(e.inputs),{inputs:[0]})}});var wf,cd,pd=V(()=>{"use strict";Q();ie();ae();Xr();wf=e=>{let t=e[0].dataType,r=k.size(e[0].dims),n=k.size(e[1].dims),o=n%4===0,i=a=>{let d=E("x",t,[1],4),l=E("bias",t,[1],4),c=M("y",t,[1],4),m=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],u=w=>`
      let bias${w}_offset: u32 = (global_idx * 4 + ${w}) % uniforms.bias_size;
      let bias${w} = ${l.getByOffset(`bias${w}_offset / 4`)}[bias${w}_offset % 4];`,h=o?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${u(0)}${u(1)}${u(2)}${u(3)}
      let bias = ${d.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(m).declareVariables(d,l,c)}

    ${lo(Ee(t))}

    ${a.mainStart(At)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${d.getByOffset("global_idx")};
      ${h}
      let x_in = x + bias;
      ${c.setByOffset("global_idx",co("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/At/4)}})}},cd=e=>{e.inputs.length<2||k.size(e.inputs[1].dims)===0?du(e):e.compute(wf(e.inputs))}});var _f,vf,md,fd,hd=V(()=>{"use strict";Q();ie();Ie();ae();_f=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},vf=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,i=k.normalizeAxis(t.axis,o),a=r.slice(0);a.splice(i,1,...n);let d=r[i],l=e[0].dataType===9?4:1,c=Math.ceil(k.size(a)/l),m=[{type:12,data:c},{type:6,data:d},{type:12,data:i},...R(e[0].dims,e[1].dims,a)],u=h=>{let w=E("data",e[0].dataType,e[0].dims.length,l),g=E("inputIndices",e[1].dataType,e[1].dims.length),y=M("output",e[0].dataType,a.length,l),S=v=>{let x=n.length,T=`var indicesIndices${v}  = ${g.type.indices}(0);`;for(let C=0;C<x;C++)T+=`${x>1?`indicesIndices${v}[${C}]`:`indicesIndices${v}`} = ${a.length>1?`outputIndices${v}[uniforms.axis + ${C}]`:`outputIndices${v}`};`;T+=`
          var idx${v} = ${g.getByIndices(`indicesIndices${v}`)};
          if (idx${v} < 0) {
            idx${v} = idx${v} + uniforms.axisDimLimit;
          }
          var dataIndices${v} : ${w.type.indices};
        `;for(let C=0,A=0;C<o;C++)C===i?(T+=`${o>1?`dataIndices${v}[${C}]`:`dataIndices${v}`} = u32(idx${v});`,A+=x):(T+=`${o>1?`dataIndices${v}[${C}]`:`dataIndices${v}`} = ${a.length>1?`outputIndices${v}[${A}]`:`outputIndices${v}`};`,A++);return T},$;if(e[0].dataType===9){let v=(x,T,C="")=>`
          let outputIndices${T} = ${y.offsetToIndices(`outputOffset + ${T}u`)};
          ${S(T)};
          let offset${T} = ${w.indicesToOffset(`dataIndices${T}`)};
          let index${T} = offset${T} / 4u;
          let component${T} = offset${T} % 4u;
          ${x}[${T}] = ${C}(${w.getByOffset(`index${T}`)}[component${T}]);
        `;$=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${v("value",0,"u32")}
        ${v("value",1,"u32")}
        ${v("value",2,"u32")}
        ${v("value",3,"u32")}
        ${y.setByOffset("global_idx","value")}
      `}else $=`
      let outputIndices = ${y.offsetToIndices("global_idx")};
      ${S("")};
      let value = ${w.getByIndices("dataIndices")};
      ${y.setByOffset("global_idx","value")};
      `;return`
      ${h.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(w,g,y)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:m}),getShaderSource:u}},md=e=>J({axis:e.axis}),fd=(e,t)=>{let r=e.inputs;_f(r),e.compute(vf(e.inputs,t))}});var $f,xf,gd,yd,bd=V(()=>{"use strict";Q();ie();Ie();ae();$f=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=k.normalizeAxis(t.quantizeAxis,e[0].dims.length),n=t.blockSize,o=e[0],i=e[2],a=e.length===4?e[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((d,l)=>l===r?Math.ceil(d/n)===i.dims[l]:d===i.dims[l]).reduce((d,l)=>d&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==i.dims.length||!a.dims.map((d,l)=>d===i.dims[l]).reduce((d,l)=>d&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},xf=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,i=k.normalizeAxis(t.gatherAxis,o),a=k.normalizeAxis(t.quantizeAxis,o),d=r.slice(0);d.splice(i,1,...n);let l=k.size(d),c=e[2].dataType,u=e[0].dataType===22,h=[{type:12,data:l},{type:12,data:a},{type:12,data:i},{type:12,data:t.blockSize},...R(...e.map((g,y)=>g.dims),d)],w=g=>{let y=E("data",e[0].dataType,e[0].dims.length),S=E("inputIndices",e[1].dataType,e[1].dims.length),$=E("scales",e[2].dataType,e[2].dims.length),v=e.length>3?E("zeroPoint",e[3].dataType,e[3].dims.length):void 0,x=M("output",c,d.length),T=[y,S,$];v&&T.push(v);let C=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${g.registerUniforms(C).declareVariables(...T,x)}
        ${g.mainStart()}
        let output_indices = ${x.offsetToIndices("global_idx")};
        var indices_indices = ${S.type.indices}(0);
        ${(()=>n.length>1?`
          for (var i: u32 = 0; i < ${n.length}; i++) {
            let index = ${x.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${S.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${x.indicesGet("output_indices","uniforms.gather_axis")};`)()};
        var data_indices = ${y.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${x.indicesGet("output_indices","i")};
          ${y.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${S.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[i]};
        }
        ${y.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${d.length}; i++) {
          let index = ${x.indicesGet("output_indices",`i + ${n.length} - 1`)};
          ${y.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${y.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${y.getByOffset("data_offset / 8")};
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
        let dequantized_data = ${Ee(c)}(quantized_data - zero_point) * scale;
        ${x.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((g,y)=>y!==1).map(g=>g.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(g,y)=>"rank")},getRunData:()=>({outputs:[{dims:d,dataType:c}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:h}),getShaderSource:w}},gd=(e,t)=>{let r=e.inputs;$f(r,t),e.compute(xf(e.inputs,t))},yd=e=>J({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})});var Sf,Tf,wd,_d,vd=V(()=>{"use strict";Q();ie();Ie();ae();Sf=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Tf=(e,t)=>{let r=e[0].dims,n=e[0].dataType,o=r.length,i=e[1].dims,a=e[1].dataType,d=k.normalizeAxis(t.axis,o),l=r[d],c=i.slice(0),m=k.size(c),u=E("input",n,o),h=E("indicesInput",a,i.length),w=M("output",n,c.length),g=[{type:12,data:m},{type:6,data:l},{type:12,data:d}];return g.push(...R(r,i,c)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:g}),getShaderSource:$=>`
      ${$.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(u,h,w)}
      ${$.mainStart()}
      ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${w.offsetToIndices("global_idx")};

      var idx = ${h.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${u.type.indices}(outputIndices);
      ${u.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${u.getByIndices("inputIndices")};

      ${w.setByOffset("global_idx","value")};
  }`}},wd=e=>J({axis:e.axis}),_d=(e,t)=>{let r=e.inputs;Sf(r),e.compute(Tf(e.inputs,t))}});var If,Cf,$d,xd,Sd=V(()=>{"use strict";Q();ie();ae();If=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Cf=(e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[o,i,a]=Gr.getShapeOfGemmResult(r,t.transA,n,t.transB,e.length===3?e[2].dims:void 0),d=[o,i];if(!d)throw new Error("Can't use gemm on the given tensors");let l=k.size(d),c=[{type:12,data:l},{type:12,data:o},{type:12,data:i},{type:12,data:a},{type:1,data:t.alpha},{type:1,data:t.beta}],m=["type","type"];e.length===3&&(c.push(...R(e[2].dims)),m.push("rank")),c.push(...R(d));let u=h=>{let w="";t.transA&&t.transB?w="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?w="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?w="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(w="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let g=t.alpha===1?"":"value *= uniforms.alpha;",y=E("a",e[0].dataType,e[0].dims),S=E("b",e[1].dataType,e[1].dims),$=y.type.value,v=null,x=[y,S];e.length===3&&(v=E("c",e[2].dataType,e[2].dims.length),x.push(v));let T=M("output",e[0].dataType,d.length);x.push(T);let C=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${h.registerUniforms(C).declareVariables(...x)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${$}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${w}
    }

    ${g}
    ${(()=>v!=null?`let cOffset = ${v.broadcastedIndicesToOffset("vec2(m, n)",T)}; value += ${$}(uniforms.beta) * ${v.getByOffset("cOffset")};`:"")()}
    output[global_idx] = value;
  }`};return{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:u}},$d=e=>{let t=e.transA,r=e.transB,n=e.alpha,o=e.beta;return{transA:t,transB:r,alpha:n,beta:o,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},xd=(e,t)=>{If(e.inputs),e.compute(Cf(e.inputs,t))}});var Ne,Ef,Id,Td,Pf,nr,Cd,xo=V(()=>{"use strict";Q();ie();Ie();Hr();Kr();ae();lt();Ne=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Ef=(e,t)=>{let r=e[0],n=Ne(e,1),o=Ne(e,2),i=Ne(e,3),a=Ne(e,4),d=Ne(e,5),l=Ne(e,6),c=Ne(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let m=r.dims[0],u=r.dims[1],h=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],w=u,g=0,y=0,S=Math.floor(h/t.numHeads);if(l&&c&&k.size(l.dims)&&k.size(c.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==m||l.dims[1]!==t.numHeads||l.dims[3]!==S)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(c.dims[0]!==m||c.dims[1]!==t.numHeads||c.dims[3]!==S)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==c.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(c.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=l.dims[2],y=l.dims[2]}else if(l&&k.size(l.dims)||c&&k.size(c.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(n&&k.size(n.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(n.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,w=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==S)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,w=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==S)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,w=n.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(i&&k.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(n&&n.dims.length===5&&n.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let v=g+w,x=0;if(a&&k.size(a.dims)>0){x=8;let P=a.dims;throw P.length===1?P[0]===m?x=1:P[0]===3*m+2&&(x=3):P.length===2&&P[0]===m&&P[1]===v&&(x=5),x===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let T=!1,C=h;if(o&&k.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(w!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');C=o.dims[2]}else{if(w!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');C=o.dims[1]*o.dims[3],T=!0}}let A=!1;if(a&&k.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(d&&k.size(d.dims)>0){if(d.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(d.dims[0]!==m||d.dims[1]!==t.numHeads||d.dims[2]!==u||d.dims[3]!==v)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:m,sequenceLength:u,pastSequenceLength:g,kvSequenceLength:w,totalSequenceLength:v,maxSequenceLength:y,inputHiddenSize:0,hiddenSize:h,vHiddenSize:C,headSize:S,vHeadSize:Math.floor(C/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:x,scale:t.scale,broadcastResPosBias:A,passPastInKv:T,qkvFormat:$}},Id=e=>J({...e}),Td=J({perm:[0,2,1,3]}),Pf=(e,t,r,n,o,i,a)=>{let d=[n,o,i],l=k.size(d),c=[{type:12,data:l},{type:12,data:a},{type:12,data:i}],m=u=>{let h=M("qkv_with_bias",t.dataType,d),w=E("qkv",t.dataType,d),g=E("bias",r.dataType,d),y=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${u.registerUniforms(y).declareVariables(w,g,h)}
  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:d,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:m},{inputs:[t,r],outputs:[-1]})[0]},nr=(e,t,r,n,o,i,a,d)=>{let l=i;if(a&&k.size(a.dims)>0){if(n===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=Pf(e,i,a,t,n,r*o,d),l=l.reshape([t,n,r,o]),r===1||n===1?l:e.compute(Pe(l,Td.perm),{inputs:[l],outputs:[-1]})[0]}else return i.dims.length===3&&(l=i.reshape([t,n,r,o])),r===1||n===1?l:e.compute(Pe(l,Td.perm),{inputs:[l],outputs:[-1]})[0]},Cd=(e,t)=>{let r=Ef(e.inputs,t),n=e.inputs[0],o=Ne(e.inputs,1),i=Ne(e.inputs,2),a=Ne(e.inputs,3),d=Ne(e.inputs,4),l=Ne(e.inputs,5),c=Ne(e.inputs,6),m=Ne(e.inputs,7);if(n.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let u=o&&i&&o.dims.length===4&&i.dims.length===4,h=nr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,a,0);if(u)return Wt(e,h,o,i,d,void 0,c,m,l,r,t);if(!o||!i)throw new Error("key and value must be provided");let w=nr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,a,r.hiddenSize),g=nr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,a,2*r.hiddenSize);Wt(e,h,w,g,d,void 0,c,m,l,r,t)}});var Ad,zf,Of,So,kd,To=V(()=>{"use strict";Q();ie();ae();Ad=e=>Array.from(e.getBigInt64Array(),Number),zf=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Ad(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Of=(e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r},So=(e,t)=>{let r=e[0].dims,n=t??Ad(e[1]),o=Of(r,n),i=k.size(o),a=e[0].dataType,d=E("input",a,r.length),l=M("output",a,o.length),c=m=>`
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
    }`;return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...R(e[0].dims,o)]}),getShaderSource:c}},kd=e=>{zf(e.inputs),e.compute(So(e.inputs),{inputs:[0]})}});var Bf,Ed,zd,Df,Pd,Od,Bd=V(()=>{"use strict";Q();ie();Ie();Kr();ae();xo();To();lt();Bf=(e,t)=>{let r=e[0],n=e[1],o=e[2],i=e[3],a=e[4];if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let d=!1,l=r.dims[0],c=r.dims[1],m=r.dims.length===3?d?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],u=c,h=0,w=0,g=Math.floor(m/t.numHeads),y=i&&i.dims.length!==0,S=a&&a.dims.length!==0,$=!0;if(y&&S){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');$?(h=i.dims[1],w=i.dims[1]):(h=i.dims[2],w=i.dims[2])}else if(y||S)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v;if(n){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(r.dims[2]%n.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');v=2,u=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==g)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');v=5,u=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==g)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');v=0,u=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let x=0,T=!1,C=m;if(o){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(u!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');C=o.dims[2]}else{if(u!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');C=o.dims[1]*o.dims[3],T=!0}}let A=h+u,P=!1;return{batchSize:l,sequenceLength:c,pastSequenceLength:h,kvSequenceLength:u,totalSequenceLength:A,maxSequenceLength:w,inputHiddenSize:0,hiddenSize:m,vHiddenSize:C,headSize:g,vHeadSize:Math.floor(C/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:x,scale:t.scale,broadcastResPosBias:P,passPastInKv:T,qkvFormat:v,isPastkvBSNH:$}},Ed=(e,t,r,n)=>{let o=[n.batchSize,n.totalSequenceLength,n.kvNumHeads,n.headSize],i=4,a=k.size(o)/i,d=n.totalSequenceLength,l=M("present_kv",r,o.length,i),c=E("new_kv",e.dataType,e.dims.length,i),m=t?E("past_kv",t.dataType,t.dims.length,i):void 0,u=Math.ceil(n.headSize/i),h={x:d,y:e.dims[0],z:1},w=t?["rank","rank"]:["rank"],g=[{type:12,data:a},{type:12,data:n.pastSequenceLength},{type:12,data:n.kvSequenceLength},{type:12,data:n.totalSequenceLength}],y=[c];m?(g.push(...R(e.dims),...R(t.dims),...R(o)),y.push(m)):g.push(...R(e.dims),...R(o));let S=[{name:"output_size",type:"u32"},{name:"past_seqlen",type:"u32"},{name:"new_seqlen",type:"u32"},{name:"present_seqlen",type:"u32"}],$=`      let past_batch_stride = uniforms.past_seqlen * num_heads * H;
        var past_head_stride = uniforms.past_seqlen * H;
        if (is_bsnh) {
          past_head_stride = H;
        }
        let in_offset = b * past_batch_stride + s * row_stride + n * past_head_stride + h;
        present_kv[out_offset] = past_kv[in_offset];`,v=`      let new_batch_stride = uniforms.new_seqlen * num_heads * H;
        let new_row_stride = num_heads * H;
        let new_head_stride = H;
        let in_offset = b * new_batch_stride + (s - past_seqlen) * new_row_stride + n * new_head_stride + h;
        present_kv[out_offset] = new_kv[in_offset];`,x=t?`if (s < past_seqlen) {
        ${$}
        } else if (s < past_seqlen + uniforms.new_seqlen) {
        ${v}
        }`:`if (s < past_seqlen + uniforms.new_seqlen) {
          ${v}
        }`,T=C=>`

  ${C.registerUniforms(S).declareVariables(...y,l)}
  ${C.mainStart([u,n.kvNumHeads,1])}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    var indices = ${l.offsetToIndices("global_idx")};
    let h = local_id.x;
    let n = local_id.y;
    let s = workgroup_id.x;
    let b = workgroup_id.y;
    let num_heads = ${n.kvNumHeads}u;
    let H = ${u}u;

    let present_seqlen = uniforms.present_seqlen;
    let present_batch_stride = present_seqlen * num_heads * H;
    var row_stride = H;
    let is_bsnh = ${n.isPastkvBSNH};

    if (is_bsnh) {
      row_stride = num_heads * H;
    }
    var present_head_stride = present_seqlen * H;
    if (is_bsnh) {
      present_head_stride = H;
    }

    let past_seqlen = uniforms.past_seqlen;

    let out_offset = b * present_batch_stride + s * row_stride + n * present_head_stride + h;
    ${x}
  }`;return{name:"ConcatPastNew",shaderCache:{hint:`${n.kvNumHeads}${u}${!!t}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:o,dataType:r}],dispatchGroup:h,programUniforms:g}),getShaderSource:T}},zd=e=>J({...e}),Df=J({perm:[0,2,1,3]}),Pd=(e,t,r,n,o)=>{let i=t,a=n.kvNumHeads,d=n.nReps;return t.dims.length===3&&n.kvSequenceLength!==0&&(i=t.reshape([n.batchSize,n.kvSequenceLength,a,n.headSize])),r?i=e.compute(Ed(i,r,i.dataType,n),{inputs:[i,r],outputs:[n.isPastkvBSNH?o:-1]})[0]:i=e.compute(Ed(i,void 0,i.dataType,n),{inputs:[i],outputs:[n.isPastkvBSNH?o:-1]})[0],d!==1&&(i=e.compute(So([i],[1,1,1,d]),{inputs:[i],outputs:[-1]})[0],i=i.reshape([n.batchSize,n.totalSequenceLength,a*d,n.headSize])),e.compute(Pe(i,Df.perm),{inputs:[i],outputs:[-1]})[0]},Od=(e,t)=>{let r=Bf(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let n=nr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,e.inputs[0],void 0,0),o=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,i=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,a=Pd(e,e.inputs[1],o,r,1),d=Pd(e,e.inputs[2],i,r,2);Wt(e,n,a,d,void 0,void 0,void 0,void 0,void 0,r,t)}});var Dd,Mf,Rf,Md,Rd=V(()=>{"use strict";Q();ie();lt();ae();Dd=(e,t,r,n,o,i,a,d)=>{let l=we(i),c=l===1?"f32":`vec${l}f`,m=l===1?"vec2f":`mat2x${l}f`,u=o*a,h=[o,a,i/l],w=[o,a,2],g=["rank","type","type"],y=[];y.push(...R(h,w));let S=$=>{let v=E("x",t.dataType,3,l),x=E("scale",r.dataType,r.dims),T=E("bias",n.dataType,n.dims),C=M("output",1,3,2),A=[v,x,T,C],P=64;return`
  var<workgroup> workgroup_shared : array<${m}, ${P}>;
  const workgroup_size = ${P}u;
  ${$.declareVariables(...A)}
  ${$.mainStart(P)}
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
      let sum_final = ${Ze("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${Ze("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${d}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${d}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:w,dataType:1}],dispatchGroup:{x:u},programUniforms:y}),getShaderSource:S},{inputs:[t,r,n],outputs:[-1]})[0]},Mf=(e,t,r)=>{let n=t[0].dims,o=n,i=2,a=n[0],d=n[1],l=k.sizeFromDimension(n,i),c=we(l),m=k.size(o)/c,u=Dd(e,t[0],t[1],t[2],a,l,d,r.epsilon),h=[a,d,l/c],w=[a,d],g=["type","none"],y=S=>{let $=E("x",t[0].dataType,h.length,c),v=E("scale_shift",1,w.length,2),x=M("output",t[0].dataType,h.length,c),T=[$,v,x];return`
  ${S.registerUniform("output_size","u32").declareVariables(...T)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${x.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${v.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${x.type.value}(scale_shift.x) + ${x.type.value}(scale_shift.y);
      ${x.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${c}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...R(h,w,h)]}),getShaderSource:y},{inputs:[t[0],u]})},Rf=(e,t,r)=>{let n=t[0].dims,o=n,i=n[0],a=n[n.length-1],d=k.sizeFromDimension(n,1)/a,l=we(a),c=k.size(o)/l,m=[{type:12,data:d},{type:12,data:Math.floor(a/l)}],u=["type","type"],h=[0,n.length-1];for(let S=0;S<n.length-2;S++)h.push(S+1);let w=e.compute(Pe(e.inputs[0],h),{inputs:[e.inputs[0]],outputs:[-1]})[0],g=Dd(e,w,t[1],t[2],i,d,a,r.epsilon),y=S=>{let $=he(t[0].dataType),v=l===1?"vec2f":`mat${l}x2f`,x=A=>{let P=A===0?"x":"y",B=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${$}(${B}(scale.${P}))`;case 2:return`vec2<${$}>(${B}(scale[0].${P}, scale[1].${P}))`;case 4:return`vec4<${$}>(${B}(scale[0].${P}, scale[1].${P}, scale[2].${P}, scale[3].${P}))`;default:throw new Error(`Not supported compoents ${l}`)}},T=E("input",t[0].dataType,t[0].dims,l),C=M("output",t[0].dataType,o,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${T.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${v}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${C.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${S.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${x(0)}, ${x(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:m}),getShaderSource:y},{inputs:[t[0],g]})},Md=(e,t)=>{t.format==="NHWC"?Rf(e,e.inputs,t):Mf(e,e.inputs,t)}});var Uf,Vf,Ud,Vd=V(()=>{"use strict";Q();ie();ae();Uf=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Vf=(e,t,r)=>{let n=t.simplified,o=e[0].dims,i=e[1],a=!n&&e[2],d=o,l=k.normalizeAxis(t.axis,o.length),c=k.sizeToDimension(o,l),m=k.sizeFromDimension(o,l),u=k.size(i.dims),h=a?k.size(a.dims):0;if(u!==m||a&&h!==m)throw new Error(`Size of X.shape()[axis:] == ${m}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${u} and bias size of ${h}`);let w=[];for(let C=0;C<o.length;++C)C<l?w.push(o[C]):w.push(1);let g=we(m),y=["type","type"],S=[{type:12,data:c},{type:1,data:m},{type:12,data:Math.floor(m/g)},{type:1,data:t.epsilon}];a&&y.push("type");let $=r>1,v=r>2,x=C=>{let A=he(e[0].dataType),P=[E("x",e[0].dataType,e[0].dims,g),E("scale",i.dataType,i.dims,g)];a&&P.push(E("bias",a.dataType,a.dims,g)),P.push(M("output",e[0].dataType,d,g)),$&&P.push(M("mean_data_output",1,w)),v&&P.push(M("inv_std_output",1,w));let B=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${C.registerUniforms(B).declareVariables(...P)}
  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${io("f32",g)};
    var mean_square_vector = ${io("f32",g)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${kt(A,g,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Ze("mean_vector",g)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Ze("mean_square_vector",g)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${kt(A,g,"x[j + offset]")};
      let f32scale = ${kt(A,g,"scale[j]")};
      output[j + offset] = ${P[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${kt(A,g,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${v?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},T=[{dims:d,dataType:e[0].dataType}];return $&&T.push({dims:w,dataType:1}),v&&T.push({dims:w,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${g};${r};${n}`,inputDependencies:y},getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(c/64)},programUniforms:S}),getShaderSource:x}},Ud=(e,t)=>{Uf(e.inputs),e.compute(Vf(e.inputs,t,e.outputCount))}});var Nf,Wf,Lf,Nd,Wd,Ld=V(()=>{"use strict";Q();ie();Ie();ae();Nf=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),i=t.blockSize/8*t.bits,a=e[1];if(!k.areEqual(a.dims,[t.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let l=e[2].dims;if(k.size(l)!==t.n*o)throw new Error("scales input size error.");if(e.length===4){let m=e[3].dims,u=t.bits>4?t.n*o:t.n*Math.floor((o+1)/2);if(k.size(m)!==u)throw new Error("zeroPoints input size error.")}},Wf=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],i=t.k,a=t.n,d=r.slice(0,n-2),l=k.size(d),m=e[1].dims[2]/4,u=e[0].dataType,h=we(t.k),w=we(m),g=we(a),y=d.concat([o,a]),S=o>1&&a/g%2===0?2:1,$=k.size(y)/g/S,v=64,x=[],T=[l,o,i/h],C=k.convertShape(e[1].dims).slice();C.splice(-1,1,m/w),x.push(...R(T)),x.push(...R(C)),x.push(...R(e[2].dims)),e.length===4&&x.push(...R(k.convertShape(e[3].dims)));let A=[l,o,a/g];x.push(...R(A));let P=B=>{let N=T.length,W=E("a",e[0].dataType,N,h),K=E("b",12,C.length,w),Z=E("scales",e[2].dataType,e[2].dims.length),ee=[W,K,Z],se=e.length===4?E("zero_points",12,e[3].dims.length):void 0;se&&ee.push(se);let de=A.length,Y=M("output",e[0].dataType,de,g),le=he(e[0].dataType),ce=(()=>{switch(h){case 1:return`array<${le}, 8>`;case 2:return`mat4x2<${le}>`;case 4:return`mat2x4<${le}>`;default:throw new Error(`${h}-component is not supported.`)}})(),q=()=>{let ne=`
          // reuse a data
            var input_offset = ${W.indicesToOffset(`${W.type.indices}(batch, row, word_offset)`)};
            var a_data: ${ce};
            for (var j: u32 = 0; j < ${8/h}; j++) {
              a_data[j] = ${W.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let oe=0;oe<g*S;oe++)ne+=`
            b_value = ${w===1?`b${oe}_data`:`b${oe}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${ce}(${Array.from({length:4},(U,G)=>`${le}(b_value_lower[${G}]), ${le}(b_value_upper[${G}])`).join(", ")});
            b_dequantized_values = ${(()=>h===1?`${ce}(${Array.from({length:8},(U,G)=>`(b_quantized_values[${G}] - ${se?`zero_point${oe}`:"zero_point"}) * scale${oe}`).join(", ")});`:`(b_quantized_values - ${ce}(${Array(8).fill(`${se?`zero_point${oe}`:"zero_point"}`).join(",")})) * scale${oe};`)()};
            workgroup_shared[local_id.x * ${S} + ${Math.floor(oe/g)}]${g>1?`[${oe%g}]`:""} += ${Array.from({length:8/h},(U,G)=>`${h===1?`a_data[${G}] * b_dequantized_values[${G}]`:`dot(a_data[${G}], b_dequantized_values[${G}])`}`).join(" + ")};
          `;return ne},ue=()=>{let ne=`
            var col_index = col * ${g};
            ${se?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${le}(8);`}
            `;for(let oe=0;oe<g*S;oe++)ne+=`
            let scale${oe} = ${Z.getByOffset("col_index * nBlocksPerCol + block")};
            ${se?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${se.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${oe} = ${le}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return ne},re=()=>{let ne=`col_index = col * ${g};`;for(let oe=0;oe<g*S;oe++)ne+=`
            let b${oe}_data = ${K.getByIndices(`${K.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return ne+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ce};
            var b_dequantized_values: ${ce};`,ne};return`
        var<workgroup> workgroup_shared: array<${Y.type.value}, ${S*v}>;
        ${B.declareVariables(...ee,Y)}
        ${B.mainStart([v,1,1])}
          let output_indices = ${Y.offsetToIndices(`(global_idx / ${v}) * ${S}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/h};
            ${ue()}
            for (var word: u32 = 0; word < ${m}; word += ${w}) {
              ${re()}
              for (var i: u32 = 0; i < ${w}; i++) {
                ${q()}
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
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${h};${w};${g};${S};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:u}],dispatchGroup:{x:$},programUniforms:x}),getShaderSource:P}},Lf=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],i=t.k,a=t.n,d=r.slice(0,n-2),l=k.size(d),m=e[1].dims[2]/4,u=e[0].dataType,h=we(t.k),w=we(m),g=d.concat([o,a]),y=128,S=a%8===0?8:a%4===0?4:1,$=y/S,v=$*w*8,x=v/h,T=v/t.blockSize,C=k.size(g)/S,A=[],P=[l,o,i/h],B=k.convertShape(e[1].dims).slice();B.splice(-1,1,m/w),A.push(...R(P)),A.push(...R(B)),A.push(...R(e[2].dims)),e.length===4&&A.push(...R(k.convertShape(e[3].dims)));let N=[l,o,a];A.push(...R(N));let W=K=>{let Z=P.length,ee=E("a",e[0].dataType,Z,h),se=E("b",12,B.length,w),de=E("scales",e[2].dataType,e[2].dims.length),Y=[ee,se,de],le=e.length===4?E("zero_points",12,e[3].dims.length):void 0;le&&Y.push(le);let ce=N.length,q=M("output",e[0].dataType,ce),ue=he(e[0].dataType),re=()=>{switch(h){case 1:return`
          let a_data0 = vec4<${ue}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ue}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${ue}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ue}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${h}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${ee.type.value}, ${x}>;
        var<workgroup> inter_results: array<array<${q.type.value}, ${$}>, ${S}>;
        ${K.declareVariables(...Y,q)}
        ${K.mainStart([$,S,1])}
          let output_indices = ${q.offsetToIndices(`workgroup_index * ${S}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${T} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${x};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${x}; a_offset += ${y})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${ee.getByIndices(`${ee.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${ee.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${T} + local_id.x;
            ${le?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${le.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${ue}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${ue}(8);`}
            let scale = ${de.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${se.getByIndices(`${se.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/h};
            for (var i: u32 = 0; i < ${w}; i++) {
              ${re()}
              let b_value = ${w===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${ue}>(${Array.from({length:4},(ne,oe)=>`${ue}(b_value_lower[${oe}]), ${ue}(b_value_upper[${oe}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${ue}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(ne,oe)=>`${`dot(a_data${oe}, b_dequantized_values[${oe}])`}`).join(" + ")};
              word_offset += ${8/h};
            }
            workgroupBarrier();
          }

          if (local_idx < ${S}) {
            var output_value: ${q.type.value} = ${q.type.value}(0);
            for (var b = 0u; b < ${$}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${q.setByIndices(`${q.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${h};${w};${$};${S}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:g,dataType:u}],dispatchGroup:{x:C},programUniforms:A}),getShaderSource:W}},Nd=(e,t)=>{Nf(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Lf(e.inputs,t)):e.compute(Wf(e.inputs,t))},Wd=e=>J(e)});var Hf,Gf,Ff,qf,jf,Kf,Yf,Xf,Hd,Gd=V(()=>{"use strict";Q();ie();ae();Hf=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Gf=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
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
      `},Ff=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
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
          `},qf=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
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
          `},jf=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
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
          `},Kf=(e,t,r)=>{switch(r.mode){case 0:return Gf(e,t,r.pads.length);case 1:return Ff(e,t,r.pads.length);case 2:return qf(e,t,r.pads.length);case 3:return jf(e,t,r.pads.length);default:throw new Error("Invalid mode")}},Yf=(e,t)=>{let r=k.padShape(e[0].dims.slice(),t.pads),n=e[0].dims,o=k.size(r),i=[{type:12,data:o},{type:6,data:t.pads}],a=e.length>=3&&e[2].data;t.mode===0&&i.push({type:a?e[2].dataType:1,data:t.value}),i.push(...R(e[0].dims,r));let d=["rank"],l=c=>{let m=M("output",e[0].dataType,r.length),u=E("x",e[0].dataType,n.length),h=u.type.value,w=Kf(m,n.length,t),g=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&g.push({name:"constant_value",type:a?h:"f32"}),`
            ${c.registerUniforms(g).declareVariables(u,m)}
            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${m.offsetToIndices("global_idx")};

            var value = ${h}(0);
            ${w}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${a}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(r)/64)},programUniforms:i}),getShaderSource:l}},Xf=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,o=e[0].dims.length,i=new Int32Array(2*o).fill(0);if(e.length>=4){let d=e[3].getBigInt64Array();for(let l=0;l<d.length;l++)i[Number(d[l])]=Number(r[l]),i[Number(d[l])+o]=Number(r[l+d.length])}else r.forEach((d,l)=>i[Number(l)]=Number(d));let a=[];return i.forEach(d=>a.push(d)),{mode:t.mode,value:n,pads:a}}else return t},Hd=(e,t)=>{Hf(e.inputs);let r=Xf(e.inputs,t);e.compute(Yf(e.inputs,r),{inputs:[0]})}});var nn,Fd,qd,jd,Kd,Zf,Qf,Yd,Xd,Zd,Qd,Jd,el,tl,rl,nl,ol,il,al,sl=V(()=>{"use strict";Ke();Q();ie();ae();nn=e=>{if(_e.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Fd=(e,t,r)=>{let n=t.format==="NHWC",o=e.dims.slice();n&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(t,"dilations"),a=t.kernelShape.slice(),d=t.strides.slice(),l=i?t.dilations.slice():[],c=t.pads.slice();Ct.adjustPoolAttributes(r,o,a,d,l,c);let m=Ct.computePoolOutputShape(r,o,d,l,a,c,t.autoPad),u=Object.assign({},t);i?Object.assign(u,{kernelShape:a,strides:d,pads:c,dilations:l,cacheKey:t.cacheKey}):Object.assign(u,{kernelShape:a,strides:d,pads:c,cacheKey:t.cacheKey});let h=m.slice();return h.push(h.splice(1,1)[0]),[u,n?h:m]},qd=(e,t)=>{let r=t.format==="NHWC",n=k.size(e),o=k.size(t.kernelShape),i=[{type:12,data:n},{type:12,data:o}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let d=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],c=t.pads[t.pads.length/2-1],m=t.pads[t.pads.length-1],u=!!(c+m);i.push({type:12,data:d},{type:12,data:l},{type:12,data:c},{type:12,data:m}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let h=!1;if(t.kernelShape.length===2){let w=t.kernelShape[t.kernelShape.length-2],g=t.strides[t.strides.length-2],y=t.pads[t.pads.length/2-2],S=t.pads[t.pads.length-2];h=!!(y+S),i.push({type:12,data:w},{type:12,data:g},{type:12,data:y},{type:12,data:S}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,u,h]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let d=k.computeStrides(t.kernelShape);i.push({type:12,data:d},{type:12,data:t.pads},{type:12,data:t.strides}),a.push({name:"kernelStrides",type:"u32",length:d.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((c,m)=>c+m);return[i,a,!!l,!1,!1]}},jd=(e,t,r,n,o,i,a,d,l,c,m,u)=>{let h=o.format==="NHWC",w=t.type.value,g=M("output",t.type.tensor,n);if(o.kernelShape.length<=2){let y="",S="",$="",v=r-(h?2:1);if(m?y=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${v}] < 0 || xIndices[${v}]
                      >= uniforms.x_shape[${v}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`:y=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let T=r-(h?3:2);u?S=`
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
            ${e.registerUniforms(l).declareVariables(t,g)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${g.offsetToIndices("global_idx")};
              var xIndices = ${g.offsetToIndices("global_idx")};

              var value = ${w}(${d});
              var pad = 0;
              ${S}
              ${y}
              ${$}
              ${a}

              output[global_idx] = value;
            }`}else{if(h)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let y=o.kernelShape.length,S=o.pads.length,$="";return c?$=`
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
            ${e.registerUniforms(l).declareVariables(t,g)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${g.offsetToIndices("global_idx")};
              var xIndices = ${g.offsetToIndices("global_idx")};

              var offsets: array<u32, ${y}>;

              var value = ${w}(${d});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${y-1}u; j++) {
                  offsets[j] = offset / ${F("uniforms.kernelStrides","j",y)};
                  offset -= offsets[j] * ${F("uniforms.kernelStrides","j",y)};
                }
                offsets[${y-1}] = offset;

                isPad = false;
                for (var j = ${r-y}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${F("uniforms.strides",`j - ${r-y}u`,y)}
                    + offsets[j - ${r-y}u] - ${F("uniforms.pads","j - 2u",S)};
                  ${$}
              }
              ${a}

              output[global_idx] = value;
            }`}},Kd=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Zf=e=>`${Kd(e)};${e.countIncludePad}`,Qf=e=>`${Kd(e)};${e.storageOrder};${e.dilations}`,Yd=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Xd=(e,t,r,n)=>{let[o,i]=Fd(t,n,r),a=E("x",t.dataType,t.dims.length),d=a.type.value,l="value += x_val;",c="";o.countIncludePad?c+=`value /= ${d}(uniforms.kernelSize);`:c+=`value /= ${d}(i32(uniforms.kernelSize) - pad);`;let[m,u,h,w,g]=qd(i,o);m.push(...R(t.dims,i));let y=["rank"];return{name:e,shaderCache:{hint:`${n.cacheKey};${h};${w};${g}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:m}),getShaderSource:S=>jd(S,a,t.dims.length,i.length,o,l,c,0,u,h,w,g)}},Zd=e=>{let t=e.count_include_pad!==0,r=Yd(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:t,...r,cacheKey:""};return{...n,cacheKey:Zf(n)}},Qd=(e,t)=>{nn(e.inputs),e.compute(Xd("AveragePool",e.inputs[0],!1,t))},Jd={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},el=e=>{let t=e.format;return{format:t,...Jd,cacheKey:t}},tl=(e,t)=>{nn(e.inputs),e.compute(Xd("GlobalAveragePool",e.inputs[0],!0,t))},rl=(e,t,r,n)=>{let[o,i]=Fd(t,n,r),a=`
      value = max(x_val, value);
    `,d="",l=E("x",t.dataType,t.dims.length),c=["rank"],[m,u,h,w,g]=qd(i,o);return m.push(...R(t.dims,i)),{name:e,shaderCache:{hint:`${n.cacheKey};${h};${w};${g}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:m}),getShaderSource:y=>jd(y,l,t.dims.length,i.length,o,a,d,t.dataType===10?-65504:-1e5,u,h,w,g)}},nl=(e,t)=>{nn(e.inputs),e.compute(rl("MaxPool",e.inputs[0],!1,t))},ol=e=>{let t=e.storage_order,r=e.dilations,n=Yd(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:r,...n,cacheKey:""};return{...o,cacheKey:Qf(o)}},il=e=>{let t=e.format;return{format:t,...Jd,cacheKey:t}},al=(e,t)=>{nn(e.inputs),e.compute(rl("GlobalMaxPool",e.inputs[0],!0,t))}});var eh,th,ul,dl,ll=V(()=>{"use strict";Q();ie();Ie();ae();eh=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,n)=>r===e[2].dims[n]).reduce((r,n)=>r&&n,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((o,i)=>i===t.axis||o===e[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],n=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/n)||t.blockSize>Math.ceil(r/(n-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},th=(e,t)=>{let r=k.normalizeAxis(t.axis,e[0].dims.length),n=e[0].dataType,o=n===3,i=e[0].dims,a=e[1].dataType,d=k.size(i),l=n===3||n===2,c=l?[Math.ceil(k.size(e[0].dims)/4)]:e[0].dims,m=e[1].dims,u=e.length>2?e[2]:void 0,h=u?l?[Math.ceil(k.size(u.dims)/4)]:u.dims:void 0,w=m.length===0||m.length===1&&m[0]===1,g=w===!1&&m.length===1,y=we(d),S=w&&(!l||y===4),$=S?y:1,v=S&&!l?y:1,x=E("input",l?12:n,c.length,v),T=E("scale",a,m.length),C=u?E("zero_point",l?12:n,h.length):void 0,A=M("output",a,i.length,$),P=[x,T];C&&P.push(C);let B=[c,m];u&&B.push(h);let N=[{type:12,data:d/$},{type:12,data:r},{type:12,data:t.blockSize},...R(...B,i)],W=K=>{let Z=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${K.registerUniforms(Z).declareVariables(...P,A)}
      ${K.mainStart()}
          ${K.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${A.offsetToIndices("global_idx")};

          // Set input x
          ${(()=>l?`
            let input = ${x.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${$===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${x.getByOffset("global_idx")};`)()};

          // Set scale input
          ${(()=>w?`let scale_value= ${T.getByOffset("0")}`:g?`
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
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${C.getByOffset("0")}`:g?l?`
                let zero_point_index = ${A.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${C.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${A.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${C.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${T.indicesToOffset("scale_indices")};
                let zero_point_input = ${C.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${C.getByIndices("scale_indices")};`:`let zero_point_value = ${l?o?"i32":"u32":x.type.value}(0);`)()};
      // Compute and write output
      ${A.setByOffset("global_idx",`${A.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:C?["rank","rank","rank"]:["rank","rank"]},getShaderSource:W,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(d/$/64),y:1,z:1},programUniforms:N})}},ul=(e,t)=>{eh(e.inputs,t),e.compute(th(e.inputs,t))},dl=e=>J({axis:e.axis,blockSize:e.blockSize})});var rh,nh,cl,pl=V(()=>{"use strict";Ke();Q();ae();rh=(e,t,r)=>{let n=e===t,o=e<t&&r<0,i=e>t&&r>0;if(n||o||i)throw new Error("Range these inputs' contents are invalid.")},nh=(e,t,r,n)=>{let o=Math.abs(Math.ceil((t-e)/r)),i=[o],a=o,d=[{type:12,data:a},{type:n,data:e},{type:n,data:r},...R(i)],l=c=>{let m=M("output",n,i.length),u=m.type.value,h=[{name:"outputSize",type:"u32"},{name:"start",type:u},{name:"delta",type:u}];return`
        ${c.registerUniforms(h).declareVariables(m)}
        ${c.mainStart()}
        ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${u}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:i,dataType:n}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d})}},cl=e=>{let t=0,r=0,n=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],n=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],n=e.inputs[2].getFloat32Array()[0]),_e.webgpu.validateInputContent&&rh(t,r,n),e.compute(nh(t,r,n,e.inputs[0].dataType),{inputs:[]})}});var oh,ih,ah,sh,uh,dh,lh,ch,ph,mh,fh,ml,hh,gh,yh,bh,wh,fl,hl,gl=V(()=>{"use strict";Q();ie();Ie();ae();oh=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},ih=(e,t,r)=>{t.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let n=new Array(r).fill(1);return t.forEach((o,i)=>n[o]=e[i]),n},ah=(e,t,r,n,o,i)=>{let[a,d,l]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],c=e[0].dims.length;if(a>0&&e.length>a&&e[a].dims.length>0)e[a].getFloat32Array().forEach(m=>i.push(m));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(d>0&&e.length>d&&e[d].dims.length===1&&e[d].dims[0]>0){if(e[d].getFloat32Array().forEach(m=>n.push(m)),n.length!==0&&n.length!==c&&r>=18&&n.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");oh(n,t),t.axes.length>0&&ih(n,t.axes,c).forEach((m,u)=>n[u]=m)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(m=>o.push(Number(m))),o.length!==0&&o.length!==c&&r>=18&&o.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof n<"u"&&typeof o<"u"&&n.length>0&&o.length>c)throw new Error("Resize requires only of scales or sizes to be specified")},sh=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",uh=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",dh=(e,t,r)=>{let n=new Array(r).fill(0).concat(new Array(r).fill(1)),o=e.length===0?n:e.slice();return t.length>0?(t.forEach((i,a)=>{n[i]=o[a],n[a+r]=o[t.length+a]}),n):o},lh=(e,t,r,n)=>{let o=[];if(r.length>0)if(n.length>0){if(e.forEach(i=>o.push(i)),Math.max(...n)>e.length)throw new Error("axes is out of bound");n.forEach((i,a)=>o[i]=r[a])}else r.forEach(i=>o.push(i));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");o=e.map((i,a)=>Math.round(i*t[a]))}return o},ch=(e,t,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>t[i]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>t[i]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return r.axes.length>0?(r.axes.forEach(i=>t[i]=n),r.axes.forEach(i=>o[i]=Math.round(e[i]*t[i]))):(t.fill(n,0,t.length),o.forEach((i,a)=>o[a]=Math.round(i*t[a]))),o},ph=(e,t,r,n,o)=>`
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
    }`,mh=(e,t,r,n,o,i,a)=>`
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
    }`,fh=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${F("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,ml=(e,t,r,n)=>e.rank>n?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",hh=(e,t,r,n,o)=>{let[a,d,l,c]=r.length===2?[-1,0,1,-1]:[0,2,3,1],m=e.type.value;return`
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
    }`},gh=(e,t,r,n,o,i,a,d,l,c)=>{let m=r.length===2,u=!0,[h,w]=m?[0,1]:u?[2,3]:[1,2],g=e.type.value,y=S=>{let $=S===h?"row":"col";return`
      fn ${$}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${g} {
        var output_index = ${t.indicesGet("output_indices",S)};
        var originalIdx: ${g} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[S]},
        ${n[S]}, ${r[S]}, ${i[S]}, ${i[S]} + ${r.length});
        var fractOriginalIdx: ${g} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${d} && (originalIdx < 0 || originalIdx > (${r[S]} - 1))) {
          return ${l};
        }
        var data: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${$}: ${g} = originalIdx + ${g}(i);
          if (${$} < 0 || ${$} >= ${r[S]}) {
            ${(()=>c?`coefs[i + 1] = 0.0;
                        continue;`:d?`return ${l};`:`${$} = max(0, min(${$}, ${r[S]} - 1));`)()};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",S,`u32(${$})`)};
          data[i + 1] = ${S===h?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${y(h)};
    ${y(w)};
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
    `},yh=(e,t,r,n,o)=>{let[a,d,l,c,m]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],u=e.type.value;return`
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
    }`},bh=(e,t,r,n,o,i)=>{let a=e.dims,d=dh(i,t.axes,a.length),l=lh(a,n,o,t.axes),c=n.slice();n.length===0&&(c=a.map((v,x)=>v===0?1:l[x]/v),t.keepAspectRatioPolicy!=="stretch"&&(l=ch(a,c,t)));let m=M("output",e.dataType,l.length),u=E("input",e.dataType,a.length),h=k.size(l),w=a.length===l.length&&a.every((v,x)=>v===l[x]),g=t.coordinateTransformMode==="tf_crop_and_resize",y=t.extrapolationValue,S=u.type.value,$=v=>`
      ${w?"":`
      ${sh(t.coordinateTransformMode,S)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${fh(u,a)};
              ${uh(t.nearestMode,r,S)};
              ${mh(u,m,a,l,c.length,d.length,g)};
              `;case"linear":return`
              ${ph(m,a,l,c.length,d.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${hh(u,m,a,g,y)}`;if(a.length===3||a.length===5)return`${yh(u,m,a,g,y)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${gh(u,m,a,l,c,d,t.cubicCoeffA,g,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
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
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${c.length>0?c:""}|${o.length>0?o:""}|${d.length>0?d:""}|${w}|${a}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},{type:1,data:c},{type:1,data:d},...R(a,l)]})}},wh=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},fl=(e,t)=>{let r=[],n=[],o=[],i=wh(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");ah(e.inputs,t,i,r,n,o),e.compute(bh(e.inputs[0],t,i,r,n,o),{inputs:[0]})},hl=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,o=e.cubicCoeffA,i=e.excludeOutside!==0,a=e.extrapolationValue,d=e.keepAspectRatioPolicy,l=e.mode,c=e.nearestMode===""?"simple":e.nearestMode;return J({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:o,excludeOutside:i,extrapolationValue:a,keepAspectRatioPolicy:d,mode:l,nearestMode:c})}});var _h,vh,yl,bl=V(()=>{"use strict";Q();ie();Ie();ae();_h=(e,t)=>{let[r,n,o,i]=e,{numHeads:a,rotaryEmbeddingDim:d}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!k.areEqual(n.dims,[])&&!k.areEqual(n.dims,[1])&&n.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!k.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(d>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=r.dims[0],c=r.dims[r.dims.length-2],m=o.dims[0],u=k.sizeFromDimension(r.dims,1)/c,h=d===0?o.dims[1]*2:u/a;if(d>h)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(n.dims.length===2){if(l!==n.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(c!==n.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(h/2!==o.dims[1]&&d/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(c>m)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},vh=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:o,scale:i}=t,a=e[0].dims[0],d=k.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],c=d/l,m=e[2].dims[1],u=o===0?m*2:c/n,h=new Array(a,l,c/u,u-m),w=k.computeStrides(h),g=[{type:1,data:i},{type:12,data:h},{type:12,data:w},...e[0].dims.length===3?new Array({type:12,data:[d,c,u,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[d,u,l*u,1]}):[],...R(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],y=S=>{let $=E("input",e[0].dataType,e[0].dims.length),v=E("position_ids",e[1].dataType,e[1].dims.length),x=E("cos_cache",e[2].dataType,e[2].dims.length),T=E("sin_cache",e[3].dataType,e[3].dims.length),C=M("output",e[0].dataType,e[0].dims.length);return S.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:w.length},{name:"input_output_strides",type:"u32",length:w.length}]),`
        ${S.declareVariables($,v,x,T,C)}

        ${S.mainStart(At)}
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
            ${C.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${x.get("position_id","bsnh[3]")};
            ${C.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${C.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:J({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(h)/At)},programUniforms:g})}},yl=(e,t)=>{_h(e.inputs,t),e.compute(vh(e.inputs,t))}});var $h,xh,wl,_l=V(()=>{"use strict";Q();ie();ae();$h=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],i=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(n.dims.length!==1)throw new Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let a=e[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let a=e[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},xh=(e,t,r,n)=>{let o=t.simplified,i=e[0].dims,a=k.size(i),d=i,l=a,c=i.slice(-1)[0],m=n?i.slice(0,-1).concat(1):[],u=!o&&e.length>3,h=e.length>4,w=n&&r>1,g=n&&r>2,y=r>3,S=64,$=we(c),v=[{type:12,data:l},{type:12,data:$},{type:12,data:c},{type:1,data:t.epsilon}],x=C=>{let A=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],P=[E("x",e[0].dataType,e[0].dims,$),E("skip",e[1].dataType,e[1].dims,$),E("gamma",e[2].dataType,e[2].dims,$)];u&&P.push(E("beta",e[3].dataType,e[3].dims,$)),h&&P.push(E("bias",e[4].dataType,e[4].dims,$)),P.push(M("output",e[0].dataType,d,$)),w&&P.push(M("mean_output",1,m)),g&&P.push(M("inv_std_output",1,m)),y&&P.push(M("input_skip_bias_sum",e[0].dataType,d,$));let B=he(e[0].dataType),N=he(1,$);return`

      ${C.registerUniforms(A).declareVariables(...P)}
      var<workgroup> sum_shared : array<${N}, ${S}>;
      var<workgroup> sum_squared_shared : array<${N}, ${S}>;

      ${C.mainStart([S,1,1])}
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
          ${y?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${kt(B,$,"value")};
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
        let mean = ${Ze("sum",$)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Ze("square_sum",$)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${w?"mean_output[global_idx] = mean;":""}
        ${g?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${B}(mean)`}) *
            ${B}(inv_std_dev) * gamma[offset1d + i]
            ${u?"+ beta[offset1d + i]":""};
        }
      }`},T=[{dims:d,dataType:e[0].dataType}];return r>1&&T.push({dims:m,dataType:1}),r>2&&T.push({dims:m,dataType:1}),r>3&&T.push({dims:i,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${w};${g};${y}`,inputDependencies:e.map((C,A)=>"type")},getShaderSource:x,getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(l/c)},programUniforms:v})}},wl=(e,t)=>{$h(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(xh(e.inputs,t,e.outputCount,!1),{outputs:n})}});var Sh,on,Th,vl,Ih,Ch,$l,xl,Sl=V(()=>{"use strict";Q();ie();Ie();ae();Sh=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw new Error(`Input ${n} must be an array of int32 or int64`)})},on=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(n=>r.push(Number(n)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(n=>r.push(Number(n)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},Th=(e,t)=>{if(e.length>1){let r=on(e,1),n=on(e,2),o=on(e,3);return o.length===0&&(o=[...Array(e[0].dims.length).keys()]),J({starts:r,ends:n,axes:o})}else return t},vl=(e,t,r,n,o)=>{let i=e;return e<0&&(i+=r[n[t]]),o[t]<0?Math.max(0,Math.min(i,r[n[t]]-1)):Math.max(0,Math.min(i,r[n[t]]))},Ih=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
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
      }`,Ch=(e,t)=>{let r=e[0].dims,n=k.size(r),o=t.axes.length>0?k.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],i=on(e,4);i.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let a=t.starts.map(($,v)=>vl($,v,r,o,i)),d=t.ends.map(($,v)=>vl($,v,r,o,i));if(o.length!==a.length||o.length!==d.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let $=0;$<r.length;++$)o.includes($)||(a.splice($,0,0),d.splice($,0,r[$]),i.splice($,0,1));let l=i.map($=>Math.sign($));i.forEach(($,v,x)=>{if($<0){let T=(d[v]-a[v])/$,C=a[v],A=C+T*i[v];a[v]=A,d[v]=C,x[v]=-$}});let c=r.slice(0);o.forEach(($,v)=>{c[$]=Math.ceil((d[$]-a[$])/i[$])});let m={dims:c,dataType:e[0].dataType},u=M("output",e[0].dataType,c.length),h=E("input",e[0].dataType,e[0].dims.length),w=k.size(c),g=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:i.length}],y=[{type:12,data:w},{type:12,data:a},{type:6,data:l},{type:12,data:i},...R(e[0].dims,c)],S=$=>`
      ${$.registerUniforms(g).declareVariables(h,u)}
        ${Ih(h,u,r)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${u.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${u.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${a.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:S,getRunData:()=>({outputs:[m],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:y})}},$l=(e,t)=>{Sh(e.inputs,t);let r=Th(e.inputs,t);e.compute(Ch(e.inputs,r),{inputs:[0]})},xl=e=>{let t=e.starts,r=e.ends,n=e.axes;return J({starts:t,ends:r,axes:n})}});var Ah,kh,Tl,Il,Cl=V(()=>{"use strict";Q();ie();Ie();lt();ae();Ah=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},kh=(e,t)=>{let r=e.inputs[0],n=r.dims,o=k.size(n),i=64,a=n.length,d=k.normalizeAxis(t.axis,a),l=d<n.length-1,c,m=[];l?(m=Array.from({length:a},(P,B)=>B),m[d]=a-1,m[a-1]=d,c=e.compute(Pe(r,m),{inputs:[r],outputs:[-1]})[0]):c=r;let u=c.dims,h=u[a-1],w=o/h,g=we(h),y=h/g,S=(P,B)=>B===4?`max(max(${P}.x, ${P}.y), max(${P}.z, ${P}.w))`:B===2?`max(${P}.x, ${P}.y)`:B===3?`max(max(${P}.x, ${P}.y), ${P}.z)`:P,$=E("x",c.dataType,c.dims,g),v=M("result",c.dataType,c.dims,g),x=$.type.value,T=he(c.dataType)==="f32"?`var threadMax = ${x}(-3.402823e+38f);`:`var threadMax = ${x}(-65504.0h);`,C=P=>`
      var<workgroup> rowMaxShared : ${x};
      var<workgroup> rowSumShared : ${x};
      var<workgroup> threadShared : array<${x}, ${i}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${x} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${x}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${P.registerUniform("packedCols","i32").declareVariables($,v)}
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
          rowMaxShared = ${x}(${S("threadShared[0]",g)});
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
          rowSumShared = ${x}(${Ze("threadShared[0]",g)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,A=e.compute({name:"Softmax",shaderCache:{hint:`${g}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:u,dataType:c.dataType}],dispatchGroup:{x:w},programUniforms:[{type:6,data:y}]}),getShaderSource:C},{inputs:[c],outputs:[l?-1:0]})[0];l&&e.compute(Pe(A,m),{inputs:[A]})},Tl=(e,t)=>{Ah(e.inputs),kh(e,t)},Il=e=>J({axis:e.axis})});var Eh,Ph,zh,Oh,Bh,Al,kl,El=V(()=>{"use strict";Q();ie();Ie();ae();Eh=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Ph=(e,t)=>{let r=[],n=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(o=>r.push(Number(o))),n=r.length),J({numOutputs:n,axis:t.axis,splitSizes:r})},zh=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${F("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Oh=e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let o=e[n].setByIndices("indices","input[global_idx]");t===1?r.push(o):n===0?r.push(`if (output_number == ${n}u) { ${o} }`):n===t-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${n}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Bh=(e,t)=>{let r=e[0].dims,n=k.size(r),o=e[0].dataType,i=k.normalizeAxis(t.axis,r.length),a=new Array(t.numOutputs),d=E("input",o,r.length),l=new Array(t.numOutputs),c=[],m=[],u=0,h=[{type:12,data:n}];for(let g=0;g<t.numOutputs;g++){u+=t.splitSizes[g],l[g]=u;let y=r.slice();y[i]=t.splitSizes[g],m.push(y),a[g]=M(`output${g}`,o,y.length),c.push({dims:m[g],dataType:e[0].dataType})}h.push({type:12,data:l},...R(r,...m));let w=g=>`
  ${g.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(d,...a)}
  ${zh(l.length)}
  ${Oh(a)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${d.offsetToIndices("global_idx")};
    var index = ${d.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${F("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${d.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:w,getRunData:()=>({outputs:c,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:h})}},Al=(e,t)=>{Eh(e.inputs);let r=e.inputs.length===1?t:Ph(e.inputs,t);e.compute(Bh(e.inputs,r),{inputs:[0]})},kl=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return J({axis:t,numOutputs:n,splitSizes:r})}});var Dh,Mh,Pl,zl=V(()=>{"use strict";Q();ie();ae();Dh=(e,t,r,n,o)=>{let i=M("output_data",o,r.length,4),a=E("a_data",t[1].dataType,t[1].dims.length,4),d=E("b_data",t[2].dataType,t[2].dims.length,4),l=E("c_data",t[0].dataType,t[0].dims.length,4),c,m=(u,h,w)=>`select(${h}, ${u}, ${w})`;if(!n)c=i.setByOffset("global_idx",m(a.getByOffset("global_idx"),d.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let u=(h,w,g="")=>{let y=`a_data[index_a${w}][component_a${w}]`,S=`b_data[index_b${w}][component_b${w}]`,$=`bool(c_data[index_c${w}] & (0xffu << (component_c${w} * 8)))`;return`
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
            ${h}[${w}] = ${g}(${m(y,S,$)});
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
      }`},Mh=e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,o=e[1].dataType,i=!(k.areEqual(t,r)&&k.areEqual(r,n)),a=t,d=k.size(t);if(i){let c=rt.calcShape(rt.calcShape(t,r,!1),n,!1);if(!c)throw new Error("Can't perform where op on the given tensors");a=c,d=k.size(a)}let l=Math.ceil(d/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:c=>Dh(c,e,a,i,o),getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(d/64/4)},programUniforms:[{type:12,data:l},...R(n,t,r,a)]})}},Pl=e=>{e.compute(Mh(e.inputs))}});var Ol,Bl=V(()=>{"use strict";Ts();Kr();As();Es();hu();Iu();ku();Hu();Xu();Ju();rd();sd();ld();pd();hd();bd();vd();Sd();Bd();Rd();Vd();fo();Ld();xo();Gd();sl();ll();pl();qr();gl();bl();_l();Sl();Cl();El();To();lt();Xr();zl();Ol=new Map([["Abs",[Ps]],["Acos",[zs]],["Acosh",[Os]],["Add",[gu]],["ArgMax",[Ss,uo]],["ArgMin",[xs,uo]],["Asin",[Bs]],["Asinh",[Ds]],["Atan",[Ms]],["Atanh",[Rs]],["Attention",[Is]],["AveragePool",[Qd,Zd]],["BatchNormalization",[Cs]],["BiasAdd",[ks]],["BiasSplitGelu",[fu]],["Cast",[Vs,Us]],["Ceil",[Ws]],["Clip",[Ns]],["Concat",[Cu,Au]],["Conv",[bo,yo]],["ConvTranspose",[Yu,Ku]],["Cos",[Ls]],["Cosh",[Hs]],["CumSum",[Zu,Qu]],["DepthToSpace",[ed,td]],["DequantizeLinear",[ul,dl]],["Div",[yu]],["Einsum",[id,ad]],["Elu",[Gs,Qt]],["Equal",[bu]],["Erf",[Fs]],["Exp",[qs]],["Expand",[dd]],["FastGelu",[cd]],["Floor",[js]],["FusedConv",[bo,yo]],["Gather",[fd,md]],["GatherElements",[_d,wd]],["GatherBlockQuantized",[gd,yd]],["Gelu",[Ks]],["Gemm",[xd,$d]],["GlobalAveragePool",[tl,el]],["GlobalMaxPool",[al,il]],["Greater",[$u]],["GreaterOrEqual",[Su]],["GroupQueryAttention",[Od,zd]],["HardSigmoid",[ru,tu]],["InstanceNormalization",[Md]],["LayerNormalization",[Ud]],["LeakyRelu",[Ys,Qt]],["Less",[xu]],["LessOrEqual",[Tu]],["Log",[cu]],["MatMul",[Wu]],["MatMulNBits",[Nd,Wd]],["MaxPool",[nl,ol]],["Mul",[wu]],["MultiHeadAttention",[Cd,Id]],["Neg",[Zs]],["Not",[Xs]],["Pad",[Hd]],["Pow",[_u]],["QuickGelu",[pu,Qt]],["Range",[cl]],["Reciprocal",[Qs]],["ReduceMin",[ys]],["ReduceMean",[ps]],["ReduceMax",[gs]],["ReduceSum",[ws]],["ReduceProd",[bs]],["ReduceL1",[ms]],["ReduceL2",[fs]],["ReduceLogSum",[vs]],["ReduceLogSumExp",[hs]],["ReduceSumSquare",[_s]],["Relu",[Js]],["Resize",[fl,hl]],["RotaryEmbedding",[yl]],["Sigmoid",[eu]],["Sin",[nu]],["Sinh",[ou]],["Slice",[$l,xl]],["SkipLayerNormalization",[wl]],["Split",[Al,kl]],["Sqrt",[iu]],["Softmax",[Tl,Il]],["Sub",[vu]],["Tan",[au]],["Tanh",[uu]],["ThresholdedRelu",[lu,Qt]],["Tile",[kd]],["Transpose",[Ja,es]],["Where",[Pl]]])});var an,Dl=V(()=>{"use strict";Ke();Xe();ae();an=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,r){this.repo.set(t,r)}run(t,r,n,o,i){Le(t.programInfo.name);let a=this.backend.device,d=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let l=[];for(let m of r)l.push({binding:l.length,resource:{buffer:m.buffer}});for(let m of n)l.push({binding:l.length,resource:{buffer:m.buffer}});i&&l.push({binding:l.length,resource:i});let c=a.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:l,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let m={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:c,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(m)}d.setPipeline(t.computePipeline),d.setBindGroup(0,c),d.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Ve(t.programInfo.name)}dispose(){}build(t,r){Le(t.name);let n=this.backend.device,o=[];n.features.has("shader-f16")&&o.push("enable f16;");let i=Za(r,this.backend.device.limits),a=t.getShaderSource(i),d=`${o.join(`
`)}
${i.additionalImplementations}
${a}`,l=n.createShaderModule({code:d,label:t.name});me("verbose",()=>`[WebGPU] ${t.name} shader code: ${d}`);let c=n.createComputePipeline({compute:{module:l,entryPoint:"main"},layout:"auto",label:t.name});return Ve(t.name),{programInfo:t,computePipeline:c,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(t){let r=typeof t=="number"?t:t.x,n=typeof t=="number"?1:t.y||1,o=typeof t=="number"?1:t.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=i&&n<=i&&o<=i)return[r,n,o];let a=r*n*o,d=Math.ceil(Math.sqrt(a));if(d>i){if(d=Math.ceil(Math.cbrt(a)),d>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[d,d,d]}else return[d,d,1]}}});var Rh,Uh,Io,sn,Ml=V(()=>{"use strict";Ke();Q();Xe();Xn();Ka();Bl();Dl();Rh=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let o=e[n].dataType;switch(t[n]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let i=e[n].dims.length;r.push(`${o};${i}`);break}case"dims":{let i=e[n].dims.join(",");r.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")},Uh=(e,t,r)=>{let n=e.name;return e.shaderCache?.hint&&(n+="["+e.shaderCache.hint+"]"),n+=":"+r+`:${Rh(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,n},Io=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},sn=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,r){this.env=t;let n=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n};r.features.has("chromium-experimental-timestamp-query-inside-passes")?n.push("chromium-experimental-timestamp-query-inside-passes"):r.features.has("timestamp-query")&&n.push("timestamp-query"),r.features.has("shader-f16")&&n.push("shader-f16"),this.device=await r.requestDevice(o),this.adapterInfo=new Io(r.info||await r.requestAdapterInfo()),this.gpuDataManager=ja(this),this.programManager=new an(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Wr(t.logLevel,!!t.debug),this.device.onuncapturederror=i=>{i.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${i.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Le(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(t.getMappedRange()),n=this.pendingQueries.get(t);for(let o=0;o<r.length/2;o++){let i=n[o],a=i.kernelId,d=this.kernels.get(a),l=d.kernelType,c=d.kernelName,m=i.programName,u=i.inputTensorViews,h=i.outputTensorViews,w=r[o*2],g=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=w);let y=Number(w-this.queryTimeBase),S=Number(g-this.queryTimeBase);if(!Number.isSafeInteger(y)||!Number.isSafeInteger(S))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:u.map($=>({dims:$.dims,dataType:yt($.dataType)})),outputsMetadata:h.map($=>({dims:$.dims,dataType:yt($.dataType)})),kernelId:a,kernelType:l,kernelName:c,programName:m,startTime:y,endTime:S});else{let $="";u.forEach((x,T)=>{$+=`input[${T}]: [${x.dims}] | ${yt(x.dataType)}, `});let v="";h.forEach((x,T)=>{v+=`output[${T}]: [${x.dims}] | ${yt(x.dataType)}, `}),console.log(`[profiling] kernel "${a}|${l}|${c}|${m}" ${$}${v}execution time: ${S-y} ns`)}Sr("GPU",`${m}::${w}::${g}`)}t.unmap(),this.pendingQueries.delete(t)}),Ve()}run(t,r,n,o,i,a){Le(t.name);let d=[];for(let x=0;x<r.length;++x){let T=r[x].data;if(T===0)continue;let C=this.gpuDataManager.get(T);if(!C)throw new Error(`no GPU data for input: ${T}`);d.push(C)}let{outputs:l,dispatchGroup:c,programUniforms:m}=t.getRunData(r),u=n.length===0?l.map((x,T)=>T):n;if(u.length!==l.length)throw new Error(`Output size ${u.length} must be equal to ${l.length}.`);let h=[],w=[];for(let x=0;x<l.length;++x){if(!Number.isInteger(u[x])||u[x]<-3||u[x]>=a)throw new Error(`Invalid output index: ${u[x]}`);if(u[x]===-3)continue;let T=u[x]===-1,C=u[x]===-2,A=T||C?i(l[x].dataType,l[x].dims):o(u[x],l[x].dataType,l[x].dims);if(h.push(A),A.data===0)continue;let P=this.gpuDataManager.get(A.data);if(!P)throw new Error(`no GPU data for output: ${A.data}`);if(T&&this.temporaryData.push(P),C){let B=this.kernelPersistentData.get(this.currentKernelId);B||(B=[],this.kernelPersistentData.set(this.currentKernelId,B)),B.push(P)}w.push(P)}if(d.length!==r.length||w.length!==h.length){if(w.length===0)return Ve(t.name),h;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let g;if(m){let x=0,T=[];m.forEach(B=>{let N=typeof B.data=="number"?[B.data]:B.data;if(N.length===0)return;let W=B.type===10?2:4,K,Z;B.type===10?(Z=N.length>4?16:N.length>2?8:N.length*W,K=N.length>4?16:W*N.length):(Z=N.length<=2?N.length*W:16,K=16),x=Math.ceil(x/Z)*Z,T.push(x);let ee=B.type===10?8:4;x+=N.length>4?Math.ceil(N.length/ee)*K:N.length*W});let C=16;x=Math.ceil(x/C)*C;let A=new ArrayBuffer(x);m.forEach((B,N)=>{let W=T[N],K=typeof B.data=="number"?[B.data]:B.data;if(B.type===6)new Int32Array(A,W,K.length).set(K);else if(B.type===12)new Uint32Array(A,W,K.length).set(K);else if(B.type===10)new Uint16Array(A,W,K.length).set(K);else if(B.type===1)new Float32Array(A,W,K.length).set(K);else throw new Error(`Unsupported uniform type: ${yt(B.type)}`)});let P=this.gpuDataManager.create(x,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(P.buffer,0,A,0,x),this.gpuDataManager.release(P.id),g={offset:0,size:x,buffer:P.buffer}}let y=this.programManager.normalizeDispatchGroupSize(c),S=y[1]===1&&y[2]===1,$=Uh(t,r,S),v=this.programManager.getArtifact($);if(v||(v=this.programManager.build(t,y),this.programManager.setArtifact($,v),me("info",()=>`[artifact] key: ${$}, programName: ${t.name}`)),m&&v.uniformVariablesInfo){if(m.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${m.length} in program "${v.programInfo.name}".`);for(let x=0;x<m.length;x++){let T=m[x],C=T.type,A=typeof T.data=="number"?1:T.data.length,[P,B]=v.uniformVariablesInfo[x];if(C!==P||A!==B)throw new Error(`Uniform variable ${x} mismatch: expect type ${P} with size ${B}, got type ${C} with size ${A} in program "${v.programInfo.name}".`)}}if(me("info",()=>`[ProgramManager] run "${t.name}" (key=${$}) with ${y[0]}x${y[1]}x${y[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let x={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:r,outputTensorViews:h};this.pendingKernels.push(x),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(x)}return this.programManager.run(v,d,w,y,g),Ve(t.name),h}upload(t,r){this.gpuDataManager.upload(t,r)}memcpy(t,r){this.gpuDataManager.memcpy(t,r)}async download(t,r){await this.gpuDataManager.download(t,r)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,r,n,o){let i=Ol.get(t);if(!i)throw new Error(`kernel not implemented: ${t}`);let a={kernelType:t,kernelName:o,kernelEntry:i[0],attributes:[i[1],n]};this.kernels.set(r,a)}releaseKernel(t){let r=this.kernelPersistentData.get(t);if(r){for(let n of r)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,r,n){let o=this.kernels.get(t);if(!o)throw new Error(`kernel not created: ${t}`);let i=o.kernelType,a=o.kernelName,d=o.kernelEntry,l=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=t,l[0]&&(l[1]=l[0](l[1]),l[0]=void 0),me("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let c=this.env.debug;this.temporaryData=[];try{return c&&this.device.pushErrorScope("validation"),d(r,l[1]),0}catch(m){return n.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${m}`)),1}finally{c&&n.push(this.device.popErrorScope().then(m=>m?`GPU validation error for kernel "[${i}] ${a}": ${m.message}`:null));for(let m of this.temporaryData)this.gpuDataManager.release(m.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,r,n,o){let i=this.sessionExternalDataMapping.get(t);i||(i=new Map,this.sessionExternalDataMapping.set(t,i));let a=i.get(r),d=this.gpuDataManager.registerExternalBuffer(n,o,a);return i.set(r,[d,n]),d}unregisterBuffers(t){let r=this.sessionExternalDataMapping.get(t);r&&(r.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[0])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let r=this.gpuDataManager.get(t);if(!r)throw new Error(`no GPU data for buffer: ${t}`);return r.buffer}createDownloader(t,r,n){return async()=>{let o=await eo(this,t,r);return Lr(o.buffer,n)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){me("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){me("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){me("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),n=t.length;this.pendingKernels=[];for(let o=0;o<n;o++){let i=this.getComputePassEncoder(),a=t[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});var Vh,Rl,un,Co,Ul,Vl=V(()=>{"use strict";Xe();Vh=1,Rl=()=>Vh++,un=class{constructor(t,r){this.mlContext=t;this.tensorEntry=r,this.tensorCache=r?[r]:[]}get tensor(){return this.tensorEntry?.[0]}get context(){if(!this.mlContext)throw new Error("MLContext has not been set.");return this.mlContext}set context(t){if(this.mlContext&&this.mlContext!==t)throw new Error("MLTensor in use in a different MLContext.");this.mlContext=t}destroy(){for(let[t]of this.tensorCache)t.destroy();this.tensorCache=[],this.tensorEntry=void 0}trySelectTensor(t,r){for(let[n,o,i]of this.tensorCache)if(r===n){if(this.context!==t)throw new Error("MLTensor cannot be registered with a different MLContext.");return this.tensorEntry=[n,o,i],!0}return!1}async ensureTensor(t,r,n){if(this.tensorEntry){let[a,d,l]=this.tensorEntry;if(d===t&&l.every((c,m)=>c===r[m]))return a}for(let[a,d,l]of this.tensorCache)if(d===t&&l.every((c,m)=>c===r[m])){if(n&&this.tensorEntry){me("verbose",()=>`[WebNN] Slowdown may occur, having to copy existing tensor {dataType: ${t}, shape: ${r}}`);let c=await this.context.readTensor(this.tensorEntry[0]);this.context.writeTensor(a,c)}return this.tensorEntry=[a,d,l],a}me("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, shape: ${r}}`);let o=MLTensorUsage.READ|MLTensorUsage.WRITE,i=await this.context.createTensor({dataType:t,shape:r,dimensions:r,usage:o});return this.tensorEntry=[i,t,r],this.tensorCache.push(this.tensorEntry),this.activeUpload&&(this.mlContext?.writeTensor(i,this.activeUpload),this.activeUpload=void 0),i}upload(t){if(!this.tensorEntry){this.activeUpload=new Uint8Array(t);return}this.mlContext?.writeTensor(this.tensorEntry[0],t)}async download(t){if(this.activeUpload)if(t){t instanceof ArrayBuffer?new Uint8Array(t).set(this.activeUpload):new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(this.activeUpload);return}else return this.activeUpload.buffer;if(!this.tensorEntry)throw new Error("Tensor has not been created.");return t?this.context.readTensor(this.tensorEntry[0],t):this.context.readTensor(this.tensorEntry[0])}},Co=class{constructor(t){this.backend=t;this.tensorsById=new Map;this.tensorIdsByContext=new Map}reserveTensorId(){let t=Rl();return this.tensorsById.set(t,new un),t}releaseTensorId(t){let r=this.tensorsById.get(t);if(r){r.destroy(),this.tensorsById.delete(t);for(let[n,o]of this.tensorIdsByContext)if(o.has(t)){o.delete(t),o.size===0&&this.tensorIdsByContext.delete(n);break}}}async ensureTensor(t,r,n,o){me("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${n}, copyOld: ${o}}`);let i=this.tensorsById.get(t);if(!i)throw new Error("Tensor not found.");return i.context=this.backend.currentContext,this.tensorIdsByContext.has(this.backend.currentContext)||this.tensorIdsByContext.set(this.backend.currentContext,new Set),this.tensorIdsByContext.get(this.backend.currentContext)?.add(t),i.ensureTensor(r,n,o)}upload(t,r){this.tensorsById.get(t).upload(r)}async download(t,r){return me("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${t}, dstBuffer: ${r?.byteLength}}`),this.tensorsById.get(t).download(r)}releaseTensorsForContext(t){let r=this.tensorIdsByContext.get(t);if(r){for(let n of r)this.tensorsById.get(n).destroy(),this.tensorsById.delete(n);this.tensorIdsByContext.delete(t)}}registerTensor(t,r,n,o){for(let[d,l]of this.tensorsById)if(l.trySelectTensor(t,r))return d;let i=Rl();this.tensorsById.set(i,new un(t,[r,n,o]));let a=this.tensorIdsByContext.get(t);return a||(a=new Set,this.tensorIdsByContext.set(t,a)),a.add(i),i}},Ul=(...e)=>new Co(...e)});var Nl,dn,Wl=V(()=>{"use strict";Q();gt();Xn();Vl();Xe();Nl=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),dn=class{constructor(t){this.tensorManager=Ul(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;Wr(t.logLevel,!!t.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(t){this.activeSessionId=t}get currentContext(){let t=this.getMLContext(this.currentSessionId);if(!t)throw new Error(`No MLContext found for session ${this.currentSessionId}`);return t}registerMLContext(t,r){this.mlContextBySessionId.set(t,r);let n=this.sessionIdsByMLContext.get(r);n||(n=new Set,this.sessionIdsByMLContext.set(r,n)),n.add(t)}onReleaseSession(t){let r=this.mlContextBySessionId.get(t);if(!r)return;this.mlContextBySessionId.delete(t);let n=this.sessionIdsByMLContext.get(r);n.delete(t),n.size===0&&(this.sessionIdsByMLContext.delete(r),this.tensorManager.releaseTensorsForContext(r))}getMLContext(t){return this.mlContextBySessionId.get(t)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(t){me("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t)}async ensureTensor(t,r,n,o){let i=Nl.get(r);if(!i)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(t,i,n,o)}uploadTensor(t,r){if(!Te().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");me("verbose",()=>`[WebNN] uploadTensor {tensorId: ${t}, data: ${r.byteLength}}`),this.tensorManager.upload(t,r)}async downloadTensor(t,r){return this.tensorManager.download(t,r)}createMLTensorDownloader(t,r){return async()=>{let n=await this.tensorManager.download(t);return Lr(n,r)}}registerMLTensor(t,r,n){let o=Nl.get(r);if(!o)throw new Error(`Unsupported ONNX data type: ${r}`);let i=this.tensorManager.registerTensor(this.currentContext,t,o,n);return me("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${o}, dimensions: ${n}} -> {tensorId: ${i}}`),i}flush(){}}});var Ll={};Gt(Ll,{init:()=>Nh});var or,Ao,Nh,Hl=V(()=>{"use strict";Q();Ml();Xe();ie();Wl();or=class e{constructor(t,r,n,o){this.module=t;this.dataType=r;this.data=n;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(k.size(t)!==k.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},Ao=class{constructor(t,r,n){this.module=t;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo;let o=t.HEAPU32,i=n>>>2;this.opKernelContext=o[i++];let a=o[i++];this.outputCount=o[i++],this.customDataOffset=o[i++],this.customDataSize=o[i++];let d=[];for(let l=0;l<a;l++){let c=o[i++],m=o[i++],u=o[i++],h=[];for(let w=0;w<u;w++)h.push(o[i++]);d.push(new or(t,c,m,h))}this.inputs=d}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}getMaxComputeWorkgroupSizes(){return[this.backend.device.limits.maxComputeWorkgroupSizeX,this.backend.device.limits.maxComputeWorkgroupSizeY,this.backend.device.limits.maxComputeWorkgroupSizeZ]}getMaxComputeWorkgroupStoragesize(){return this.backend.device.limits.maxComputeWorkgroupStorageSize}compute(t,r){let n=r?.inputs?.map(d=>typeof d=="number"?this.inputs[d]:d)??this.inputs,o=r?.outputs??[],i=(d,l,c)=>new or(this.module,l,this.output(d,c),c),a=(d,l)=>{let c=It(d,l);if(!c)throw new Error(`Unsupported data type: ${d}`);let m=c>0?this.backend.gpuDataManager.create(c).id:0;return new or(this.module,d,m,l)};return this.backend.run(t,n,o,i,a,this.outputCount)}output(t,r){let n=this.module.stackSave();try{let o=this.module.stackAlloc((1+r.length)*4),i=o>>2;this.module.HEAPU32[i++]=r.length;for(let a=0;a<r.length;a++)this.module.HEAPU32[i++]=r[a];return this.module._JsepOutput(this.opKernelContext,t,o)}catch(o){throw new Error(`Failed to generate kernel's output[${t}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(n)}}},Nh=async(e,t,r,n)=>{let o=t.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let i=new sn;await i.initialize(r,n),o("webgpu",[i,a=>i.alloc(a),a=>i.free(a),(a,d,l,c=!1)=>{if(c)me("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${a}, dst=${d}, size=${l}`),i.memcpy(a,d);else{me("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${a}, gpuDataId=${d}, size=${l}`);let m=t.HEAPU8.subarray(a>>>0,(a>>>0)+l);i.upload(d,m)}},async(a,d,l)=>{me("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${a}, dataOffset=${d}, size=${l}`),await i.download(a,()=>t.HEAPU8.subarray(d>>>0,(d>>>0)+l))},(a,d,l)=>i.createKernel(a,d,l,t.UTF8ToString(t._JsepGetNodeName(d))),a=>i.releaseKernel(a),(a,d,l,c)=>{me("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${l}, kernel=${a}, contextDataOffset=${d}`);let m=new Ao(t,i,d);return i.computeKernel(a,m,c)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else{let i=new dn(r);o("webnn",[i,()=>i.reserveTensorId(),a=>i.releaseTensorId(a),async(a,d,l,c)=>i.ensureTensor(a,d,l,c),(a,d)=>{i.uploadTensor(a,d)},async(a,d)=>i.downloadTensor(a,d)])}}});var Wh,kr,Er,Et,Lh,jt,Pr,zr,Gl,Or,Br,Dr,Gn=V(()=>{"use strict";Va();Wa();Q();gt();Rr();Yn();Wh=(e,t)=>{Te()._OrtInit(e,t)!==0&&ve("Can't initialize onnxruntime.")},kr=async e=>{Wh(e.wasm.numThreads,Xt(e.logLevel))},Er=async(e,t)=>{{let r=(Hl(),br(Ll)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let n=e.webgpu.adapter;if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=e.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=e.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",Te(),e,n)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",Te(),e)}}},Et=new Map,Lh=e=>{let t=Te(),r=t.stackSave();try{let n=t.stackAlloc(8);return t._OrtGetInputOutputCount(e,n,n+4)!==0&&ve("Can't get session input/output count."),[t.HEAP32[n/4],t.HEAP32[n/4+1]]}finally{t.stackRestore(r)}},jt=e=>{let t=Te(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},Pr=async(e,t)=>{let r,n,o=Te();Array.isArray(e)?[r,n]=e:e.buffer===o.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=jt(e);let i=0,a=0,d=0,l=[],c=[],m=[];try{if([a,l]=Na(t),t?.externalData&&o.mountExternalData){let v=[];for(let x of t.externalData){let T=typeof x=="string"?x:x.path;v.push(Zt(typeof x=="string"?x:x.data).then(C=>{o.mountExternalData(T,C)}))}await Promise.all(v)}for(let v of t?.executionProviders??[])if((typeof v=="string"?v:v.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,o.currentContext)throw new Error("WebNN execution provider is already set.");if(typeof v!="string"){let T=v,C=T?.context,A=T?.gpuDevice,P=T?.deviceType,B=T?.numThreads,N=T?.powerPreference;C?o.currentContext=C:A?o.currentContext=await navigator.ml.createContext(A):o.currentContext=await navigator.ml.createContext({deviceType:P,numThreads:B,powerPreference:N})}else o.currentContext=await navigator.ml.createContext();break}i=await o._OrtCreateSession(r,n,a),i===0&&ve("Can't create a session."),o.currentContext&&(o.jsepRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[u,h]=Lh(i),w=!!t?.enableGraphCapture,g=[],y=[],S=[];for(let v=0;v<u;v++){let x=o._OrtGetInputName(i,v);x===0&&ve("Can't get an input name."),c.push(x),g.push(o.UTF8ToString(x))}for(let v=0;v<h;v++){let x=o._OrtGetOutputName(i,v);x===0&&ve("Can't get an output name."),m.push(x);let T=o.UTF8ToString(x);y.push(T);{if(w&&t?.preferredOutputLocation===void 0){S.push("gpu-buffer");continue}let C=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[T]??"cpu";if(C!=="cpu"&&C!=="cpu-pinned"&&C!=="gpu-buffer"&&C!=="ml-tensor")throw new Error(`Not supported preferred output location: ${C}.`);if(w&&C!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${C}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);S.push(C)}}let $=null;return S.some(v=>v==="gpu-buffer"||v==="ml-tensor")&&(d=o._OrtCreateBinding(i),d===0&&ve("Can't create IO binding."),$={handle:d,outputPreferredLocations:S,outputPreferredLocationsEncoded:S.map(v=>Kn(v))}),Et.set(i,[i,c,m,$,w,!1]),[i,g,y]}catch(u){throw c.forEach(h=>o._OrtFree(h)),m.forEach(h=>o._OrtFree(h)),d!==0&&o._OrtReleaseBinding(d),i!==0&&o._OrtReleaseSession(i),u}finally{o._free(r),a!==0&&o._OrtReleaseSessionOptions(a),l.forEach(u=>o._free(u)),o.unmountExternalData?.()}},zr=e=>{let t=Te(),r=Et.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[n,o,i,a,d]=r;a&&(d&&t._OrtClearBoundOutputs(a.handle),t._OrtReleaseBinding(a.handle)),t.jsepOnReleaseSession?.(e),o.forEach(l=>t._OrtFree(l)),i.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(n),Et.delete(e)},Gl=(e,t,r,n,o,i=!1)=>{if(!e){t.push(0);return}let a=Te(),d=e[0],l=e[1],c=e[3],m,u;if(d==="string"&&(c==="gpu-buffer"||c==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(i&&c!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(c==="gpu-buffer"){let g=e[2].gpuBuffer;u=It(Yt(d),l);let y=a.jsepRegisterBuffer;if(!y)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');m=y(n,o,g,u)}else if(c==="ml-tensor"){let g=e[2].mlTensor;u=It(Yt(d),l);let y=a.jsepRegisterMLTensor;if(!y)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');m=y(g,Yt(d),l)}else{let g=e[2];if(Array.isArray(g)){u=4*g.length,m=a._malloc(u),r.push(m);let y=m/4;for(let S=0;S<g.length;S++){if(typeof g[S]!="string")throw new TypeError(`tensor data at index ${S} is not a string`);a.HEAPU32[y++]=ke(g[S],r)}}else u=g.byteLength,m=a._malloc(u),r.push(m),a.HEAPU8.set(new Uint8Array(g.buffer,g.byteOffset,u),m)}let h=a.stackSave(),w=a.stackAlloc(4*l.length);try{let g=w/4;l.forEach(S=>a.HEAP32[g++]=S);let y=a._OrtCreateTensor(Yt(d),m,u,w,l.length,Kn(c));y===0&&ve(`Can't create tensor for input/output. session=${n}, index=${o}.`),t.push(y)}finally{a.stackRestore(h)}},Or=async(e,t,r,n,o,i)=>{let a=Te(),d=Et.get(e);if(!d)throw new Error(`cannot run inference. invalid session id: ${e}`);let l=d[0],c=d[1],m=d[2],u=d[3],h=d[4],w=d[5],g=t.length,y=n.length,S=0,$=[],v=[],x=[],T=[],C=a.stackSave(),A=a.stackAlloc(g*4),P=a.stackAlloc(g*4),B=a.stackAlloc(y*4),N=a.stackAlloc(y*4);try{a.jsepOnRunStart?.(l),[S,$]=Ua(i);for(let Y=0;Y<g;Y++)Gl(r[Y],v,T,e,t[Y],h);for(let Y=0;Y<y;Y++)Gl(o[Y],x,T,e,g+n[Y],h);let W=A/4,K=P/4,Z=B/4,ee=N/4;for(let Y=0;Y<g;Y++)a.HEAPU32[W++]=v[Y],a.HEAPU32[K++]=c[t[Y]];for(let Y=0;Y<y;Y++)a.HEAPU32[Z++]=x[Y],a.HEAPU32[ee++]=m[n[Y]];if(u&&!w){let{handle:Y,outputPreferredLocations:le,outputPreferredLocationsEncoded:ce}=u;if(c.length!==g)throw new Error(`input count from feeds (${g}) is expected to be always equal to model's input count (${c.length}).`);for(let q=0;q<g;q++){let ue=t[q];await a._OrtBindInput(Y,c[ue],v[q])!==0&&ve(`Can't bind input[${q}] for session=${e}.`)}for(let q=0;q<y;q++){let ue=n[q];o[q]?.[3]?a._OrtBindOutput(Y,m[ue],x[q],0)!==0&&ve(`Can't bind pre-allocated output[${q}] for session=${e}.`):a._OrtBindOutput(Y,m[ue],0,ce[ue])!==0&&ve(`Can't bind output[${q}] to ${le[q]} for session=${e}.`)}Et.set(e,[l,c,m,u,h,!0])}let se;u?se=await a._OrtRunWithBinding(l,u.handle,y,B,S):se=await a._OrtRun(l,P,A,g,N,y,B,S),se!==0&&ve("failed to call OrtRun().");let de=[];for(let Y=0;Y<y;Y++){let le=a.HEAPU32[B/4+Y];if(le===x[Y]){de.push(o[Y]);continue}let ce=a.stackSave(),q=a.stackAlloc(4*4),ue=!1,re,ne=0;try{a._OrtGetTensorData(le,q,q+4,q+8,q+12)!==0&&ve(`Can't access output tensor data on index ${Y}.`);let U=q/4,G=a.HEAPU32[U++];ne=a.HEAPU32[U++];let ye=a.HEAPU32[U++],Re=a.HEAPU32[U++],$e=[];for(let Ae=0;Ae<Re;Ae++)$e.push(a.HEAPU32[ye/4+Ae]);a._OrtFree(ye);let Ce=$e.reduce((Ae,Me)=>Ae*Me,1);re=yt(G);let bt=u?.outputPreferredLocations[n[Y]];if(re==="string"){if(bt==="gpu-buffer"||bt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Ae=[],Me=ne/4;for(let Ue=0;Ue<Ce;Ue++){let zt=a.HEAPU32[Me++],wt=Ue===Ce-1?void 0:a.HEAPU32[Me]-zt;Ae.push(a.UTF8ToString(zt,wt))}de.push([re,$e,Ae,"cpu"])}else if(bt==="gpu-buffer"&&Ce>0){let Ae=a.jsepGetBuffer;if(!Ae)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Me=Ae(ne),Ue=It(G,Ce);if(Ue===void 0||!Vr(re))throw new Error(`Unsupported data type: ${re}`);ue=!0,de.push([re,$e,{gpuBuffer:Me,download:a.jsepCreateDownloader(Me,Ue,re),dispose:()=>{a._OrtReleaseTensor(le)}},"gpu-buffer"])}else if(bt==="ml-tensor"&&Ce>0){let Ae=a.jsepEnsureTensor;if(!Ae)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(It(G,Ce)===void 0||!Nr(re))throw new Error(`Unsupported data type: ${re}`);let Ue=await Ae(ne,G,$e,!1);ue=!0,de.push([re,$e,{mlTensor:Ue,download:a.jsepCreateMLTensorDownloader(ne,re),dispose:()=>{a.jsepReleaseTensorId(ne),a._OrtReleaseTensor(le)}},"ml-tensor"])}else{let Ae=Ur(re),Me=new Ae(Ce);new Uint8Array(Me.buffer,Me.byteOffset,Me.byteLength).set(a.HEAPU8.subarray(ne,ne+Me.byteLength)),de.push([re,$e,Me,"cpu"])}}finally{a.stackRestore(ce),re==="string"&&ne&&a._free(ne),ue||a._OrtReleaseTensor(le)}}return u&&!h&&(a._OrtClearBoundOutputs(u.handle),Et.set(e,[l,c,m,u,h,!1])),de}finally{a.stackRestore(C),v.forEach(W=>a._OrtReleaseTensor(W)),x.forEach(W=>a._OrtReleaseTensor(W)),T.forEach(W=>a._free(W)),S!==0&&a._OrtReleaseRunOptions(S),$.forEach(W=>a._free(W))}},Br=e=>{let t=Te(),r=Et.get(e);if(!r)throw new Error("invalid session id");let n=r[0],o=t._OrtEndProfiling(n);o===0&&ve("Can't get an profile file name."),t._OrtFree(o)},Dr=e=>{let t=[];for(let r of e){let n=r[2];!Array.isArray(n)&&"buffer"in n&&t.push(n.buffer)}return t}});var Pt,Ye,ir,cn,pn,ln,ko,Eo,Lt,Ht,Gh,Fl,ql,jl,Kl,Yl,Xl,Zl,Po=V(()=>{"use strict";Ke();Gn();gt();qt();Pt=()=>!!_e.wasm.proxy&&typeof document<"u",ir=!1,cn=!1,pn=!1,Eo=new Map,Lt=(e,t)=>{let r=Eo.get(e);r?r.push(t):Eo.set(e,[t])},Ht=()=>{if(ir||!cn||pn||!Ye)throw new Error("worker not ready")},Gh=e=>{switch(e.data.type){case"init-wasm":ir=!1,e.data.err?(pn=!0,ko[1](e.data.err)):(cn=!0,ko[0]()),ln&&(URL.revokeObjectURL(ln),ln=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Eo.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},Fl=async()=>{if(!cn){if(ir)throw new Error("multiple calls to 'initWasm()' detected.");if(pn)throw new Error("previous call to 'initWasm()' failed.");if(ir=!0,Pt())return new Promise((e,t)=>{Ye?.terminate(),Da().then(([r,n])=>{try{Ye=n,Ye.onerror=i=>t(i),Ye.onmessage=Gh,ko=[e,t];let o={type:"init-wasm",in:_e};Ye.postMessage(o),ln=r}catch(o){t(o)}},t)});try{await Ar(_e.wasm),await kr(_e),cn=!0}catch(e){throw pn=!0,e}finally{ir=!1}}},ql=async e=>{if(Pt())return Ht(),new Promise((t,r)=>{Lt("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:_e}};Ye.postMessage(n)});await Er(_e,e)},jl=async e=>Pt()?(Ht(),new Promise((t,r)=>{Lt("copy-from",[t,r]);let n={type:"copy-from",in:{buffer:e}};Ye.postMessage(n,[e.buffer])})):jt(e),Kl=async(e,t)=>{if(Pt()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Ht(),new Promise((r,n)=>{Lt("create",[r,n]);let o={type:"create",in:{model:e,options:{...t}}},i=[];e instanceof Uint8Array&&i.push(e.buffer),Ye.postMessage(o,i)})}else return Pr(e,t)},Yl=async e=>{if(Pt())return Ht(),new Promise((t,r)=>{Lt("release",[t,r]);let n={type:"release",in:e};Ye.postMessage(n)});zr(e)},Xl=async(e,t,r,n,o,i)=>{if(Pt()){if(r.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return Ht(),new Promise((a,d)=>{Lt("run",[a,d]);let l=r,c={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:n,options:i}};Ye.postMessage(c,Dr(l))})}else return Or(e,t,r,n,o,i)},Zl=async e=>{if(Pt())return Ht(),new Promise((t,r)=>{Lt("end-profiling",[t,r]);let n={type:"end-profiling",in:e};Ye.postMessage(n)});Br(e)}});var Ql,Fh,mn,Jl=V(()=>{"use strict";Ke();Po();Q();Cr();Yn();Ql=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Fh=e=>{switch(e[3]){case"cpu":return new De(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Vr(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:o}=e[2];return De.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:o})}case"ml-tensor":{let t=e[0];if(!Nr(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:n,dispose:o}=e[2];return De.fromMLTensor(r,{dataType:t,dims:e[1],download:n,dispose:o})}default:throw new Error(`invalid data location: ${e[3]}`)}},mn=class{async fetchModelAndCopyToWasmMemory(t){return jl(await Zt(t))}async loadModel(t,r){Le();let n;typeof t=="string"?!1?n=await Zt(t):n=await this.fetchModelAndCopyToWasmMemory(t):n=t,[this.sessionId,this.inputNames,this.outputNames]=await Kl(n,r),Ve()}async dispose(){return Yl(this.sessionId)}async run(t,r,n){Le();let o=[],i=[];Object.entries(t).forEach(h=>{let w=h[0],g=h[1],y=this.inputNames.indexOf(w);if(y===-1)throw new Error(`invalid input '${w}'`);o.push(g),i.push(y)});let a=[],d=[];Object.entries(r).forEach(h=>{let w=h[0],g=h[1],y=this.outputNames.indexOf(w);if(y===-1)throw new Error(`invalid output '${w}'`);a.push(g),d.push(y)});let l=o.map((h,w)=>Ql(h,()=>`input "${this.inputNames[i[w]]}"`)),c=a.map((h,w)=>h?Ql(h,()=>`output "${this.outputNames[d[w]]}"`):null),m=await Xl(this.sessionId,i,l,d,c,n),u={};for(let h=0;h<m.length;h++)u[this.outputNames[d[h]]]=a[h]??Fh(m[h]);return Ve(),u}startProfiling(){}endProfiling(){Zl(this.sessionId)}}});var tc={};Gt(tc,{OnnxruntimeWebAssemblyBackend:()=>fn,initializeFlags:()=>ec,wasmBackend:()=>qh});var ec,fn,qh,rc=V(()=>{"use strict";Ke();Po();Jl();qt();ec=()=>{if((typeof _e.wasm.initTimeout!="number"||_e.wasm.initTimeout<0)&&(_e.wasm.initTimeout=0),_e.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof _e.wasm.proxy!="boolean"&&(_e.wasm.proxy=!1),typeof _e.wasm.trace!="boolean"&&(_e.wasm.trace=!1),typeof _e.wasm.numThreads!="number"||!Number.isInteger(_e.wasm.numThreads)||_e.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)_e.wasm.numThreads=1;else{let e=typeof navigator>"u"?Vn("node:os").cpus().length:navigator.hardwareConcurrency;_e.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},fn=class{async init(t){ec(),await Fl(),await ql(t)}async createInferenceSessionHandler(t,r){let n=new mn;return await n.loadModel(t,r),Promise.resolve(n)}},qh=new fn});Ke();Ke();Ke();var Ia="1.20.1";var Hx=Hn;{let e=(rc(),br(tc)).wasmBackend;St("webgpu",e,5),St("webnn",e,5),St("cpu",e,10),St("wasm",e,10)}Object.defineProperty(_e.versions,"web",{value:Ia,enumerable:!0});export{Ip as InferenceSession,Sr as TRACE,Le as TRACE_FUNC_BEGIN,Ve as TRACE_FUNC_END,De as Tensor,Ap as TrainingSession,Hx as default,_e as env,St as registerBackend};
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
