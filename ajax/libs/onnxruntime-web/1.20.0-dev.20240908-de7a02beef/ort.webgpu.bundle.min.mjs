/*!
 * ONNX Runtime Web v1.20.0-dev.20240908-de7a02beef
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var On=Object.defineProperty;var lp=Object.getOwnPropertyDescriptor;var cp=Object.getOwnPropertyNames;var pp=Object.prototype.hasOwnProperty;var Dn=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var U=(e,t)=>()=>(e&&(t=e(e=0)),t);var Lt=(e,t)=>{for(var r in t)On(e,r,{get:t[r],enumerable:!0})},mp=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of cp(t))!pp.call(e,o)&&o!==r&&On(e,o,{get:()=>t[o],enumerable:!(n=lp(t,o))||n.enumerable});return e};var br=e=>mp(On({},"__esModule",{value:!0}),e);var wr,_t,$t,fp,vr,_r=U(()=>{"use strict";wr=new Map,_t=[],$t=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let n=wr.get(e);if(n===void 0)wr.set(e,{backend:t,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let o=_t.indexOf(e);o!==-1&&_t.splice(o,1);for(let i=0;i<_t.length;i++)if(wr.get(_t[i]).priority<=r){_t.splice(i,0,e);return}_t.push(e)}return}throw new TypeError("not a valid backend")},fp=async e=>{let t=wr.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(n){return r||(t.error=`${n}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},vr=async e=>{let t=e.executionProviders||[],r=t.map(l=>typeof l=="string"?l:l.name),n=r.length===0?_t:r,o,i=[],a=new Set;for(let l of n){let c=await fp(l);typeof c=="string"?i.push({name:l,err:c}):(o||(o=c),o===c&&a.add(l))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:c}of i)r.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${c}`);let d=t.filter(l=>a.has(typeof l=="string"?l:l.name));return[o,new Proxy(e,{get:(l,c)=>c==="executionProviders"?d:Reflect.get(l,c)})]}});var Li=U(()=>{"use strict";_r()});var Fi,qi=U(()=>{"use strict";Fi="1.20.0-dev.20240827-5d54dc1462"});var ji,Ne,Bn=U(()=>{"use strict";qi();ji="warning",Ne={wasm:{},webgl:{},webgpu:{},versions:{common:Fi},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);ji=e}},get logLevel(){return ji}};Object.defineProperty(Ne,"logLevel",{enumerable:!0})});var ye,Ki=U(()=>{"use strict";Bn();ye=Ne});var Yi,Xi,Zi=U(()=>{"use strict";Yi=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(n!=null){let o,i;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[3]):(o=e.dims[3],i=e.dims[2]);let a=t?.format!==void 0?t.format:"RGB",d=t?.norm,l,c;d===void 0||d.mean===void 0?l=[255,255,255,255]:typeof d.mean=="number"?l=[d.mean,d.mean,d.mean,d.mean]:(l=[d.mean[0],d.mean[1],d.mean[2],0],d.mean[3]!==void 0&&(l[3]=d.mean[3])),d===void 0||d.bias===void 0?c=[0,0,0,0]:typeof d.bias=="number"?c=[d.bias,d.bias,d.bias,d.bias]:(c=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(c[3]=d.bias[3]));let m=i*o,u=0,h=m,w=m*2,g=-1;a==="RGBA"?(u=0,h=m,w=m*2,g=m*3):a==="RGB"?(u=0,h=m,w=m*2):a==="RBG"&&(u=0,w=m,h=m*2);for(let y=0;y<i;y++)for(let x=0;x<o;x++){let $=(e.data[u++]-c[0])*l[0],_=(e.data[h++]-c[1])*l[1],S=(e.data[w++]-c[2])*l[2],I=g===-1?255:(e.data[g++]-c[3])*l[3];n.fillStyle="rgba("+$+","+_+","+S+","+I+")",n.fillRect(x,y,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Xi=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(r!=null){let o,i,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[1],a=e.dims[3]):(o=e.dims[3],i=e.dims[2],a=e.dims[1]);let d=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,c,m;l===void 0||l.mean===void 0?c=[255,255,255,255]:typeof l.mean=="number"?c=[l.mean,l.mean,l.mean,l.mean]:(c=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(c[3]=l.mean[3])),l===void 0||l.bias===void 0?m=[0,0,0,0]:typeof l.bias=="number"?m=[l.bias,l.bias,l.bias,l.bias]:(m=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(m[3]=l.bias[3]));let u=i*o;if(t!==void 0&&(t.format!==void 0&&a===4&&t.format!=="RGBA"||a===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let h=4,w=0,g=1,y=2,x=3,$=0,_=u,S=u*2,I=-1;d==="RGBA"?($=0,_=u,S=u*2,I=u*3):d==="RGB"?($=0,_=u,S=u*2):d==="RBG"&&($=0,S=u,_=u*2),n=r.createImageData(o,i);for(let A=0;A<i*o;w+=h,g+=h,y+=h,x+=h,A++)n.data[w]=(e.data[$++]-m[0])*c[0],n.data[g]=(e.data[_++]-m[1])*c[1],n.data[y]=(e.data[S++]-m[2])*c[2],n.data[x]=I===-1?255:(e.data[I++]-m[3])*c[3]}else throw new Error("Can not access image data");return n}});var Rn,Qi,Ji,ea,ta,ra=U(()=>{"use strict";$r();Rn=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=t,o=t.norm??{mean:255,bias:0},i,a;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?a=[o.bias,o.bias,o.bias,o.bias]:a=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let d=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",c=r*n,m=l==="RGBA"?new Float32Array(c*4):new Float32Array(c*3),u=4,h=0,w=1,g=2,y=3,x=0,$=c,_=c*2,S=-1;d==="RGB"&&(u=3,h=0,w=1,g=2,y=-1),l==="RGBA"?S=c*3:l==="RBG"?(x=0,_=c,$=c*2):l==="BGR"&&(_=0,$=c,x=c*2);for(let A=0;A<c;A++,h+=u,g+=u,w+=u,y+=u)m[x++]=(e[h]+a[0])/i[0],m[$++]=(e[w]+a[1])/i[1],m[_++]=(e[g]+a[2])/i[2],S!==-1&&y!==-1&&(m[S++]=(e[y]+a[3])/i[3]);return l==="RGBA"?new Be("float32",m,[1,4,r,n]):new Be("float32",m,[1,3,r,n])},Qi=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,n=typeof ImageData<"u"&&e instanceof ImageData,o=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,i=typeof e=="string",a,d=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},c=m=>m instanceof HTMLCanvasElement||m instanceof OffscreenCanvas?m.getContext("2d"):null;if(r){let m=l();m.width=e.width,m.height=e.height;let u=c(m);if(u!=null){let h=e.height,w=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(h=t.resizedHeight,w=t.resizedWidth),t!==void 0){if(d=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");d.tensorFormat="RGBA",d.height=h,d.width=w}else d.tensorFormat="RGBA",d.height=h,d.width=w;u.drawImage(e,0,0),a=u.getImageData(0,0,w,h).data}else throw new Error("Can not access image data")}else if(n){let m,u;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(m=t.resizedHeight,u=t.resizedWidth):(m=e.height,u=e.width),t!==void 0&&(d=t),d.format="RGBA",d.height=m,d.width=u,t!==void 0){let h=l();h.width=u,h.height=m;let w=c(h);if(w!=null)w.putImageData(e,0,0),a=w.getImageData(0,0,u,m).data;else throw new Error("Can not access image data")}else a=e.data}else if(o){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let m=l();m.width=e.width,m.height=e.height;let u=c(m);if(u!=null){let h=e.height,w=e.width;return u.drawImage(e,0,0,w,h),a=u.getImageData(0,0,w,h).data,d.height=h,d.width=w,Rn(a,d)}else throw new Error("Can not access image data")}else{if(i)return new Promise((m,u)=>{let h=l(),w=c(h);if(!e||!w)return u();let g=new Image;g.crossOrigin="Anonymous",g.src=e,g.onload=()=>{h.width=g.width,h.height=g.height,w.drawImage(g,0,0,h.width,h.height);let y=w.getImageData(0,0,h.width,h.height);d.height=h.height,d.width=h.width,m(Rn(y.data,d))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return Rn(a,d);throw new Error("Input data provided is not supported - aborted tensor creation")},Ji=(e,t)=>{let{width:r,height:n,download:o,dispose:i}=t,a=[1,n,r,4];return new Be({location:"texture",type:"float32",texture:e,dims:a,download:o,dispose:i})},ea=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:i}=t;return new Be({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:o,dispose:i})},ta=(e,t,r)=>new Be({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})});var xt,Ft,na,oa,ia=U(()=>{"use strict";xt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Ft=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),na=!1,oa=()=>{if(!na){na=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=typeof Float16Array<"u"&&Float16Array.from;e&&(xt.set("int64",BigInt64Array),Ft.set(BigInt64Array,"int64")),t&&(xt.set("uint64",BigUint64Array),Ft.set(BigUint64Array,"uint64")),r?(xt.set("float16",Float16Array),Ft.set(Float16Array,"float16")):xt.set("float16",Uint16Array)}}});var aa,sa,ua=U(()=>{"use strict";$r();aa=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},sa=(e,t)=>{switch(e.location){case"cpu":return new Be(e.type,e.data,t);case"cpu-pinned":return new Be({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Be({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Be({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var Be,$r=U(()=>{"use strict";Zi();ra();ia();ua();Be=class{constructor(t,r,n){oa();let o,i;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,o=t.type,i=t.dims,t.location){case"cpu-pinned":{let d=xt.get(o);if(!d)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(t.data instanceof d))throw new TypeError(`buffer should be of type ${d.name}`);this.cpuData=t.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let d,l;if(typeof t=="string")if(o=t,l=n,t==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");d=r}else{let c=xt.get(t);if(c===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(r)){if(t==="float16"&&c===Uint16Array||t==="uint4"||t==="int4")throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${c.name} as data.`);t==="uint64"||t==="int64"?d=c.from(r,BigInt):d=c.from(r)}else if(r instanceof c)d=r;else throw new TypeError(`A ${o} tensor's data must be type of ${c}`)}else if(l=r,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let c=typeof t[0];if(c==="string")o="string",d=t;else if(c==="boolean")o="bool",d=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${c}.`)}else{let c=Ft.get(t.constructor);if(c===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);o=c,d=t}if(l===void 0)l=[d.length];else if(!Array.isArray(l))throw new TypeError("A tensor's dims must be a number array");i=l,this.cpuData=d,this.dataLocation="cpu"}let a=aa(i);if(this.cpuData&&a!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=a}static async fromImage(t,r){return Qi(t,r)}static fromTexture(t,r){return Ji(t,r)}static fromGpuBuffer(t,r){return ea(t,r)}static fromPinnedBuffer(t,r,n){return ta(t,r,n)}toDataURL(t){return Yi(this,t)}toImageData(t){return Xi(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,t&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return sa(this,t)}}});var Oe,xr=U(()=>{"use strict";$r();Oe=Be});var Sr,da,We,Me,Mn=U(()=>{"use strict";Bn();Sr=(e,t)=>{(typeof Ne.trace>"u"?!Ne.wasm.trace:!Ne.trace)||console.timeStamp(`${e}::ORT::${t}`)},da=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],n=!1;for(let o=0;o<r.length;o++){if(n&&!r[o].includes("TRACE_FUNC")){let i=`FUNC_${e}::${r[o].trim().split(" ")[1]}`;t&&(i+=`::${t}`),Sr("CPU",i);return}r[o].includes("TRACE_FUNC")&&(n=!0)}},We=e=>{(typeof Ne.trace>"u"?!Ne.wasm.trace:!Ne.trace)||da("BEGIN",e)},Me=e=>{(typeof Ne.trace>"u"?!Ne.wasm.trace:!Ne.trace)||da("END",e)}});var Ir,la=U(()=>{"use strict";_r();xr();Mn();Ir=class e{constructor(t){this.handler=t}async run(t,r,n){We();let o={},i={};if(typeof t!="object"||t===null||t instanceof Oe||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Oe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let c of r){if(typeof c!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(c)===-1)throw new RangeError(`'fetches' contains invalid output name: ${c}.`);o[c]=null}if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let c=!1,m=Object.getOwnPropertyNames(r);for(let u of this.outputNames)if(m.indexOf(u)!==-1){let h=r[u];(h===null||h instanceof Oe)&&(c=!0,a=!1,o[u]=h)}if(c){if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let c of this.inputNames)if(typeof t[c]>"u")throw new Error(`input '${c}' is missing in 'feeds'.`);if(a)for(let c of this.outputNames)o[c]=null;let d=await this.handler.run(t,o,i),l={};for(let c in d)if(Object.hasOwnProperty.call(d,c)){let m=d[c];m instanceof Oe?l[c]=m:l[c]=new Oe(m.type,m.data,m.dims)}return Me(),l}async release(){return this.handler.dispose()}static async create(t,r,n,o){We();let i,a={};if(typeof t=="string"){if(i=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(i=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let m=t,u=0,h=t.byteLength;if(typeof r=="object"&&r!==null)a=r;else if(typeof r=="number"){if(u=r,!Number.isSafeInteger(u))throw new RangeError("'byteOffset' must be an integer.");if(u<0||u>=m.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${m.byteLength}).`);if(h=t.byteLength-u,typeof n=="number"){if(h=n,!Number.isSafeInteger(h))throw new RangeError("'byteLength' must be an integer.");if(h<=0||u+h>m.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${m.byteLength-u}].`);if(typeof o=="object"&&o!==null)a=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof n<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(m,u,h)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[d,l]=await vr(a),c=await d.createInferenceSessionHandler(i,l);return Me(),new e(c)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var hp,ca=U(()=>{"use strict";la();hp=Ir});var pa=U(()=>{"use strict"});var ma=U(()=>{"use strict"});var fa=U(()=>{"use strict"});var ha=U(()=>{"use strict"});var gp,Cr,ga=U(()=>{"use strict";_r();xr();gp="Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.",Cr=class e{constructor(t,r,n){this.handler=t,this.hasOptimizerModel=r,this.hasEvalModel=n}get trainingInputNames(){return this.handler.inputNames}get trainingOutputNames(){return this.handler.outputNames}get evalInputNames(){if(this.hasEvalModel)return this.handler.evalInputNames;throw new Error("This training session has no evalModel loaded.")}get evalOutputNames(){if(this.hasEvalModel)return this.handler.evalOutputNames;throw new Error("This training session has no evalModel loaded.")}static async create(t,r){let n=t.evalModel||"",o=t.optimizerModel||"",i=r||{},[a,d]=await vr(i);if(a.createTrainingSessionHandler){let l=await a.createTrainingSessionHandler(t.checkpointState,t.trainModel,n,o,d);return new e(l,!!t.optimizerModel,!!t.evalModel)}else throw new Error(gp)}typeNarrowingForRunStep(t,r,n,o,i){let a={},d={};if(typeof n!="object"||n===null||n instanceof Oe||Array.isArray(n))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let l=!0;if(typeof o=="object"){if(o===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(o instanceof Oe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(o)){if(o.length===0)throw new TypeError("'fetches' cannot be an empty array.");l=!1;for(let c of o){if(typeof c!="string")throw new TypeError("'fetches' must be a string array or an object.");if(r.indexOf(c)===-1)throw new RangeError(`'fetches' contains invalid output name: ${c}.`);a[c]=null}if(typeof i=="object"&&i!==null)d=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let c=!1,m=Object.getOwnPropertyNames(o);for(let u of r)if(m.indexOf(u)!==-1){let h=o[u];(h===null||h instanceof Oe)&&(c=!0,l=!1,a[u]=h)}if(c){if(typeof i=="object"&&i!==null)d=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else d=o}}else if(typeof o<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let c of t)if(typeof n[c]>"u")throw new Error(`input '${c}' is missing in 'feeds'.`);if(l)for(let c of r)a[c]=null;return[a,d]}convertHandlerReturnTypeToMapOfTensors(t){let r={};for(let n in t)if(Object.hasOwnProperty.call(t,n)){let o=t[n];o instanceof Oe?r[n]=o:r[n]=new Oe(o.type,o.data,o.dims)}return r}async lazyResetGrad(){await this.handler.lazyResetGrad()}async runTrainStep(t,r,n){let[o,i]=this.typeNarrowingForRunStep(this.trainingInputNames,this.trainingOutputNames,t,r,n),a=await this.handler.runTrainStep(t,o,i);return this.convertHandlerReturnTypeToMapOfTensors(a)}async runOptimizerStep(t){if(this.hasOptimizerModel)await this.handler.runOptimizerStep(t||{});else throw new Error("This TrainingSession has no OptimizerModel loaded.")}async runEvalStep(t,r,n){if(this.hasEvalModel){let[o,i]=this.typeNarrowingForRunStep(this.evalInputNames,this.evalOutputNames,t,r,n),a=await this.handler.runEvalStep(t,o,i);return this.convertHandlerReturnTypeToMapOfTensors(a)}else throw new Error("This TrainingSession has no EvalModel loaded.")}async getParametersSize(t=!0){return this.handler.getParametersSize(t)}async loadParametersBuffer(t,r=!0){let n=await this.getParametersSize(r);if(t.length!==4*n)throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");return this.handler.loadParametersBuffer(t,r)}async getContiguousParameters(t=!0){return this.handler.getContiguousParameters(t)}async release(){return this.handler.dispose()}}});var yp,ya=U(()=>{"use strict";ga();yp=Cr});var Un={};Lt(Un,{InferenceSession:()=>hp,TRACE:()=>Sr,TRACE_FUNC_BEGIN:()=>We,TRACE_FUNC_END:()=>Me,Tensor:()=>Oe,TrainingSession:()=>yp,env:()=>ye,registerBackend:()=>$t});var Ke=U(()=>{"use strict";Li();Ki();ca();xr();pa();ma();Mn();fa();ha();ya()});var Ar=U(()=>{"use strict"});var _a={};Lt(_a,{default:()=>bp});var wa,va,bp,$a=U(()=>{"use strict";Vn();St();qt();wa="ort-wasm-proxy-worker",va=globalThis.self?.name===wa;va&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":Tr(r.wasm).then(()=>{kr(r).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})})},n=>{postMessage({type:t,err:n})});break;case"init-ep":{let{epName:n,env:o}=r;Er(o,n).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})});break}case"copy-from":{let{buffer:n}=r,o=jt(n);postMessage({type:t,out:o});break}case"create":{let{model:n,options:o}=r;Pr(n,o).then(i=>{postMessage({type:t,out:i})},i=>{postMessage({type:t,err:i})});break}case"release":zr(r),postMessage({type:t});break;case"run":{let{sessionId:n,inputIndices:o,inputs:i,outputIndices:a,options:d}=r;Or(n,o,i,a,new Array(a.length).fill(null),d).then(l=>{l.some(c=>c[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},Br([...i,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":Dr(r),postMessage({type:t});break;default:}}catch(n){postMessage({type:t,err:n})}});bp=va?null:e=>new Worker(e??Mt,{type:"module",name:wa})});var Sa={};Lt(Sa,{default:()=>wp});var Nn,xa,wp,Ia=U(()=>{"use strict";xa=(Nn=import.meta.url,async function(e={}){function t(){return le.buffer!=ce.buffer&&Ae(),ce}function r(){return le.buffer!=ce.buffer&&Ae(),Q}function n(){return le.buffer!=ce.buffer&&Ae(),be}function o(){return le.buffer!=ce.buffer&&Ae(),ae}function i(){return le.buffer!=ce.buffer&&Ae(),ie}function a(){return le.buffer!=ce.buffer&&Ae(),se}function d(){return le.buffer!=ce.buffer&&Ae(),M}function l(){return le.buffer!=ce.buffer&&Ae(),Re}var c,m,u=Object.assign({},e),h=new Promise((s,p)=>{c=s,m=p}),w=typeof window=="object",g=typeof importScripts=="function",y=g&&self.name=="em-pthread";u.mountExternalData=(s,p)=>{s.startsWith("./")&&(s=s.substring(2)),(u.Fb||(u.Fb=new Map)).set(s,p)},u.unmountExternalData=()=>{delete u.Fb};var x=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let $=()=>{let s=(f,b,v)=>(...C)=>{let z=Je,D=b?.();C=f(...C);let W=b?.();return D!==W&&(f=W,v(D),b=v=null),Je!=z?new Promise((G,j)=>{In={resolve:G,reject:j}}):C},p=f=>async(...b)=>{try{if(u.Eb)throw Error("Session already started");let v=u.Eb={cc:b[0],errors:[]},C=await f(...b);if(u.Eb!==v)throw Error("Session mismatch");u.Mb?.flush();let z=v.errors;if(0<z.length){let D=await Promise.all(z);if(D=D.filter(W=>W),0<D.length)throw Error(D.join(`
`))}return C}finally{u.Eb=null}};u._OrtCreateSession=s(u._OrtCreateSession,()=>u._OrtCreateSession,f=>u._OrtCreateSession=f),u._OrtRun=p(s(u._OrtRun,()=>u._OrtRun,f=>u._OrtRun=f)),u._OrtRunWithBinding=p(s(u._OrtRunWithBinding,()=>u._OrtRunWithBinding,f=>u._OrtRunWithBinding=f)),u._OrtBindInput=s(u._OrtBindInput,()=>u._OrtBindInput,f=>u._OrtBindInput=f),$=void 0};u.jsepInit=(s,p)=>{if($?.(),s==="webgpu"){[u.Mb,u.Tb,u.Xb,u.Nb,u.Wb,u.jb,u.Yb,u.$b,u.Ub,u.Vb,u.Zb]=p;let f=u.Mb;u.jsepRegisterBuffer=(b,v,C,z)=>f.registerBuffer(b,v,C,z),u.jsepGetBuffer=b=>f.getBuffer(b),u.jsepCreateDownloader=(b,v,C)=>f.createDownloader(b,v,C),u.jsepOnReleaseSession=b=>{f.onReleaseSession(b)},u.jsepOnRunStart=b=>f.onRunStart(b),u.ac=(b,v)=>{f.upload(b,v)}}};var _,S,I=Object.assign({},u),A="./this.program",T=(s,p)=>{throw p},O="";(w||g)&&(g?O=self.location.href:typeof document<"u"&&document.currentScript&&(O=document.currentScript.src),Nn&&(O=Nn),O=O.startsWith("blob:")?"":O.substr(0,O.replace(/[?#].*/,"").lastIndexOf("/")+1),g&&(S=s=>{var p=new XMLHttpRequest;return p.open("GET",s,!1),p.responseType="arraybuffer",p.send(null),new Uint8Array(p.response)}),_=(s,p,f)=>{var b=new XMLHttpRequest;b.open("GET",s,!0),b.responseType="arraybuffer",b.onload=()=>{b.status==200||b.status==0&&b.response?p(b.response):f()},b.onerror=f,b.send(null)});var B,N=console.log.bind(console),H=console.error.bind(console),K=N,X=H;if(Object.assign(u,I),I=null,y){let s=function(p){try{var f=p.data,b=f.cmd;if(b==="load"){let v=[];self.onmessage=C=>v.push(C),self.startWorker=()=>{postMessage({cmd:"loaded"});for(let C of v)s(C);self.onmessage=s};for(let C of f.handlers)u[C]&&!u[C].proxy||(u[C]=(...z)=>{postMessage({Lb:"callHandler",lc:C,args:z})},C=="print"&&(K=u[C]),C=="printErr"&&(X=u[C]));le=f.wasmMemory,Ae(),ne(f.wasmModule)}else if(b==="run"){kn(f.pthread_ptr,0,0,1,0,0),$n(f.pthread_ptr),Kl(),Bo(),oe||(zi(),oe=!0);try{Yl(f.start_routine,f.arg)}catch(v){if(v!="unwind")throw v}}else b==="cancel"?Rt()&&gr(-1):f.target!=="setimmediate"&&(b==="checkMailbox"?oe&&sr():b&&(X(`worker: received unknown command ${b}`),X(f)))}catch(v){throw Oi(),v}};var Rh=s,ne,oe=!1;X=function(...p){p=p.join(" "),console.error(p)},self.alert=function(...p){postMessage({Lb:"alert",text:p.join(" "),nc:Rt()})},u.instantiateWasm=(p,f)=>new Promise(b=>{ne=v=>{v=new WebAssembly.Instance(v,Eo()),f(v),b()}}),self.onunhandledrejection=p=>{throw p.reason||p},self.onmessage=s}u.wasmBinary&&(B=u.wasmBinary);var le,Y,pe,ce,Q,be,ae,ie,se,M,F,fe,Re,Se=!1;function Ae(){var s=le.buffer;u.HEAP8=ce=new Int8Array(s),u.HEAP16=be=new Int16Array(s),u.HEAPU8=Q=new Uint8Array(s),u.HEAPU16=ae=new Uint16Array(s),u.HEAP32=ie=new Int32Array(s),u.HEAPU32=se=new Uint32Array(s),u.HEAPF32=M=new Float32Array(s),u.HEAPF64=Re=new Float64Array(s),u.HEAP64=F=new BigInt64Array(s),u.HEAPU64=fe=new BigUint64Array(s)}if(!y){if(!((le=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0})).buffer instanceof x))throw X("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),Error("bad memory");Ae()}var Gt=[],ze=[],De=[],Fe=0,Pt=null,yt=null;function Io(){if(--Fe==0&&(Pt!==null&&(clearInterval(Pt),Pt=null),yt)){var s=yt;yt=null,s()}}function zt(s){throw X(s="Aborted("+s+")"),Se=!0,pe=1,s=new WebAssembly.RuntimeError(s+". Build with -sASSERTIONS for more info."),m(s),s}var ln,Co=s=>s.startsWith("data:application/octet-stream;base64,"),Ao=s=>s.startsWith("file://");function To(s){if(s==ln&&B)return new Uint8Array(B);if(S)return S(s);throw"both async and sync fetching of the wasm failed"}function ko(s,p,f){return function(b){if(!B&&(w||g)){if(typeof fetch=="function"&&!Ao(b))return fetch(b,{credentials:"same-origin"}).then(v=>{if(!v.ok)throw`failed to load wasm binary file at '${b}'`;return v.arrayBuffer()}).catch(()=>To(b));if(_)return new Promise((v,C)=>{_(b,z=>v(new Uint8Array(z)),C)})}return Promise.resolve().then(()=>To(b))}(s).then(b=>WebAssembly.instantiate(b,p)).then(f,b=>{X(`failed to asynchronously prepare wasm: ${b}`),zt(b)})}function Eo(){return{a:{M:jl,za:ql,b:Zl,$:Vo,z:Ho,pa:Go,X:Fo,Z:qo,qa:jo,na:Ko,ga:Yo,ma:Xo,J:Zo,Y:Qo,V:Jo,oa:ei,W:ti,va:Ql,D:ec,P:tc,O:nc,C:ic,s:ac,p:sc,E:uc,y:hc,Q:gc,ta:yc,ja:bc,T:wc,aa:vc,F:_c,ia:$n,sa:$c,u:xc,B:Cc,o:Ac,m:kc,c:vn,n:Ec,k:Oc,Aa:Dc,r:Bc,g:Rc,v:Mc,l:Uc,f:Vc,i:Nc,j:Wc,h:Hc,e:Gc,da:Lc,ea:Fc,fa:qc,ba:hi,ca:gi,S:jc,d:Kc,N:Yc,G:Xc,K:Zc,w:Qc,ra:Jc,U:ep,t:bi,x:tp,L:rp,R:np,ya:op,xa:ip,ka:_i,la:$i,_:hn,A:xi,I:Si,ha:Ii,H:Ci,a:le,wa:fn,ua:ki,q:up}}}var cn={859316:(s,p,f,b,v)=>{if(u===void 0||!u.Fb)return 1;if((s=Ee(s>>>0)).startsWith("./")&&(s=s.substring(2)),!(s=u.Fb.get(s)))return 2;if(b>>>=0,(p>>>=0)+(f>>>=0)>s.byteLength)return 3;try{let C=s.subarray(p,p+f);switch(v){case 0:r().set(C,b>>>0);break;case 1:u.ac(b,C);break;default:return 4}return 0}catch{return 4}},859999:()=>{u.Ub()},860030:()=>{u.Vb()},860059:()=>{u.Zb()},860084:s=>u.Tb(s),860117:s=>u.Xb(s),860149:(s,p,f)=>{u.Nb(s,p,f,!0)},860188:(s,p,f)=>{u.Nb(s,p,f)},860221:()=>typeof wasmOffsetConverter<"u",860278:s=>{u.jb("Abs",s,void 0)},860329:s=>{u.jb("Neg",s,void 0)},860380:s=>{u.jb("Floor",s,void 0)},860433:s=>{u.jb("Ceil",s,void 0)},860485:s=>{u.jb("Reciprocal",s,void 0)},860543:s=>{u.jb("Sqrt",s,void 0)},860595:s=>{u.jb("Exp",s,void 0)},860646:s=>{u.jb("Erf",s,void 0)},860697:s=>{u.jb("Sigmoid",s,void 0)},860752:(s,p,f)=>{u.jb("HardSigmoid",s,{alpha:p,beta:f})},860831:s=>{u.jb("Log",s,void 0)},860882:s=>{u.jb("Sin",s,void 0)},860933:s=>{u.jb("Cos",s,void 0)},860984:s=>{u.jb("Tan",s,void 0)},861035:s=>{u.jb("Asin",s,void 0)},861087:s=>{u.jb("Acos",s,void 0)},861139:s=>{u.jb("Atan",s,void 0)},861191:s=>{u.jb("Sinh",s,void 0)},861243:s=>{u.jb("Cosh",s,void 0)},861295:s=>{u.jb("Asinh",s,void 0)},861348:s=>{u.jb("Acosh",s,void 0)},861401:s=>{u.jb("Atanh",s,void 0)},861454:s=>{u.jb("Tanh",s,void 0)},861506:s=>{u.jb("Not",s,void 0)},861557:(s,p,f)=>{u.jb("Clip",s,{min:p,max:f})},861626:s=>{u.jb("Clip",s,void 0)},861678:(s,p)=>{u.jb("Elu",s,{alpha:p})},861736:s=>{u.jb("Gelu",s,void 0)},861788:s=>{u.jb("Relu",s,void 0)},861840:(s,p)=>{u.jb("LeakyRelu",s,{alpha:p})},861904:(s,p)=>{u.jb("ThresholdedRelu",s,{alpha:p})},861974:(s,p)=>{u.jb("Cast",s,{to:p})},862032:s=>{u.jb("Add",s,void 0)},862083:s=>{u.jb("Sub",s,void 0)},862134:s=>{u.jb("Mul",s,void 0)},862185:s=>{u.jb("Div",s,void 0)},862236:s=>{u.jb("Pow",s,void 0)},862287:s=>{u.jb("Equal",s,void 0)},862340:s=>{u.jb("Greater",s,void 0)},862395:s=>{u.jb("GreaterOrEqual",s,void 0)},862457:s=>{u.jb("Less",s,void 0)},862509:s=>{u.jb("LessOrEqual",s,void 0)},862568:(s,p,f,b,v)=>{u.jb("ReduceMean",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(b>>>0,v>>>0)):[]})},862727:(s,p,f,b,v)=>{u.jb("ReduceMax",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(b>>>0,v>>>0)):[]})},862885:(s,p,f,b,v)=>{u.jb("ReduceMin",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(b>>>0,v>>>0)):[]})},863043:(s,p,f,b,v)=>{u.jb("ReduceProd",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(b>>>0,v>>>0)):[]})},863202:(s,p,f,b,v)=>{u.jb("ReduceSum",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(b>>>0,v>>>0)):[]})},863360:(s,p,f,b,v)=>{u.jb("ReduceL1",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(b>>>0,v>>>0)):[]})},863517:(s,p,f,b,v)=>{u.jb("ReduceL2",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(b>>>0,v>>>0)):[]})},863674:(s,p,f,b,v)=>{u.jb("ReduceLogSum",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(b>>>0,v>>>0)):[]})},863835:(s,p,f,b,v)=>{u.jb("ReduceSumSquare",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(b>>>0,v>>>0)):[]})},863999:(s,p,f,b,v)=>{u.jb("ReduceLogSumExp",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(b>>>0,v>>>0)):[]})},864163:s=>{u.jb("Where",s,void 0)},864216:(s,p,f)=>{u.jb("Transpose",s,{perm:p?Array.from(i().subarray(p>>>0,f>>>0)):[]})},864324:(s,p,f,b)=>{u.jb("DepthToSpace",s,{blocksize:p,mode:Ee(f),format:b?"NHWC":"NCHW"})},864457:(s,p,f,b)=>{u.jb("DepthToSpace",s,{blocksize:p,mode:Ee(f),format:b?"NHWC":"NCHW"})},864590:(s,p,f,b,v,C,z,D,W,G,j,de,he,P,ue)=>{u.jb("ConvTranspose",s,{format:W?"NHWC":"NCHW",autoPad:p,dilations:[f],group:b,kernelShape:[v],pads:[C,z],strides:[D],wIsConst:()=>!!t()[G>>>0],outputPadding:j?Array.from(i().subarray(j>>>0,de>>>0)):[],outputShape:he?Array.from(i().subarray(he>>>0,P>>>0)):[],activation:Ee(ue)})},864991:(s,p,f,b,v,C,z,D,W,G,j,de,he,P)=>{u.jb("ConvTranspose",s,{format:D?"NHWC":"NCHW",autoPad:p,dilations:Array.from(i().subarray(f>>>0,2+(f>>>0)>>>0)),group:b,kernelShape:Array.from(i().subarray(v>>>0,2+(v>>>0)>>>0)),pads:Array.from(i().subarray(C>>>0,4+(C>>>0)>>>0)),strides:Array.from(i().subarray(z>>>0,2+(z>>>0)>>>0)),wIsConst:()=>!!t()[W>>>0],outputPadding:G?Array.from(i().subarray(G>>>0,j>>>0)):[],outputShape:de?Array.from(i().subarray(de>>>0,he>>>0)):[],activation:Ee(P)})},865556:(s,p,f,b,v,C,z,D,W,G,j,de,he,P,ue)=>{u.jb("ConvTranspose",s,{format:W?"NHWC":"NCHW",autoPad:p,dilations:[f],group:b,kernelShape:[v],pads:[C,z],strides:[D],wIsConst:()=>!!t()[G>>>0],outputPadding:j?Array.from(i().subarray(j>>>0,de>>>0)):[],outputShape:he?Array.from(i().subarray(he>>>0,P>>>0)):[],activation:Ee(ue)})},865957:(s,p,f,b,v,C,z,D,W,G,j,de,he,P)=>{u.jb("ConvTranspose",s,{format:D?"NHWC":"NCHW",autoPad:p,dilations:Array.from(i().subarray(f>>>0,2+(f>>>0)>>>0)),group:b,kernelShape:Array.from(i().subarray(v>>>0,2+(v>>>0)>>>0)),pads:Array.from(i().subarray(C>>>0,4+(C>>>0)>>>0)),strides:Array.from(i().subarray(z>>>0,2+(z>>>0)>>>0)),wIsConst:()=>!!t()[W>>>0],outputPadding:G?Array.from(i().subarray(G>>>0,j>>>0)):[],outputShape:de?Array.from(i().subarray(de>>>0,he>>>0)):[],activation:Ee(P)})},866522:(s,p)=>{u.jb("GlobalAveragePool",s,{format:p?"NHWC":"NCHW"})},866613:(s,p,f,b,v,C,z,D,W,G,j,de,he,P)=>{u.jb("AveragePool",s,{format:P?"NHWC":"NCHW",auto_pad:p,ceil_mode:f,count_include_pad:b,storage_order:v,dilations:C?Array.from(i().subarray(C>>>0,z>>>0)):[],kernel_shape:D?Array.from(i().subarray(D>>>0,W>>>0)):[],pads:G?Array.from(i().subarray(G>>>0,j>>>0)):[],strides:de?Array.from(i().subarray(de>>>0,he>>>0)):[]})},867028:(s,p)=>{u.jb("GlobalAveragePool",s,{format:p?"NHWC":"NCHW"})},867119:(s,p,f,b,v,C,z,D,W,G,j,de,he,P)=>{u.jb("AveragePool",s,{format:P?"NHWC":"NCHW",auto_pad:p,ceil_mode:f,count_include_pad:b,storage_order:v,dilations:C?Array.from(i().subarray(C>>>0,z>>>0)):[],kernel_shape:D?Array.from(i().subarray(D>>>0,W>>>0)):[],pads:G?Array.from(i().subarray(G>>>0,j>>>0)):[],strides:de?Array.from(i().subarray(de>>>0,he>>>0)):[]})},867534:(s,p)=>{u.jb("GlobalMaxPool",s,{format:p?"NHWC":"NCHW"})},867621:(s,p,f,b,v,C,z,D,W,G,j,de,he,P)=>{u.jb("MaxPool",s,{format:P?"NHWC":"NCHW",auto_pad:p,ceil_mode:f,count_include_pad:b,storage_order:v,dilations:C?Array.from(i().subarray(C>>>0,z>>>0)):[],kernel_shape:D?Array.from(i().subarray(D>>>0,W>>>0)):[],pads:G?Array.from(i().subarray(G>>>0,j>>>0)):[],strides:de?Array.from(i().subarray(de>>>0,he>>>0)):[]})},868032:(s,p)=>{u.jb("GlobalMaxPool",s,{format:p?"NHWC":"NCHW"})},868119:(s,p,f,b,v,C,z,D,W,G,j,de,he,P)=>{u.jb("MaxPool",s,{format:P?"NHWC":"NCHW",auto_pad:p,ceil_mode:f,count_include_pad:b,storage_order:v,dilations:C?Array.from(i().subarray(C>>>0,z>>>0)):[],kernel_shape:D?Array.from(i().subarray(D>>>0,W>>>0)):[],pads:G?Array.from(i().subarray(G>>>0,j>>>0)):[],strides:de?Array.from(i().subarray(de>>>0,he>>>0)):[]})},868530:(s,p,f,b,v)=>{u.jb("Gemm",s,{alpha:p,beta:f,transA:b,transB:v})},868634:s=>{u.jb("MatMul",s,void 0)},868688:(s,p,f,b)=>{u.jb("ArgMax",s,{keepDims:!!p,selectLastIndex:!!f,axis:b})},868796:(s,p,f,b)=>{u.jb("ArgMin",s,{keepDims:!!p,selectLastIndex:!!f,axis:b})},868904:(s,p)=>{u.jb("Softmax",s,{axis:p})},868967:(s,p)=>{u.jb("Concat",s,{axis:p})},869027:(s,p,f,b,v)=>{u.jb("Split",s,{axis:p,numOutputs:f,splitSizes:b?Array.from(i().subarray(b>>>0,v>>>0)):[]})},869167:s=>{u.jb("Expand",s,void 0)},869221:(s,p)=>{u.jb("Gather",s,{axis:Number(p)})},869292:(s,p)=>{u.jb("GatherElements",s,{axis:Number(p)})},869371:(s,p,f,b,v,C,z,D,W,G,j)=>{u.jb("Resize",s,{antialias:p,axes:f?Array.from(i().subarray(f>>>0,b>>>0)):[],coordinateTransformMode:Ee(v),cubicCoeffA:C,excludeOutside:z,extrapolationValue:D,keepAspectRatioPolicy:Ee(W),mode:Ee(G),nearestMode:Ee(j)})},869717:(s,p,f,b,v,C,z)=>{u.jb("Slice",s,{starts:p?Array.from(i().subarray(p>>>0,f>>>0)):[],ends:b?Array.from(i().subarray(b>>>0,v>>>0)):[],axes:C?Array.from(i().subarray(C>>>0,z>>>0)):[]})},869933:s=>{u.jb("Tile",s,void 0)},869985:(s,p,f)=>{u.jb("InstanceNormalization",s,{epsilon:p,format:f?"NHWC":"NCHW"})},870099:(s,p,f)=>{u.jb("InstanceNormalization",s,{epsilon:p,format:f?"NHWC":"NCHW"})},870213:s=>{u.jb("Range",s,void 0)},870266:(s,p)=>{u.jb("Einsum",s,{equation:Ee(p)})},870347:(s,p,f,b,v)=>{u.jb("Pad",s,{mode:p,value:f,pads:b?Array.from(i().subarray(b>>>0,v>>>0)):[]})},870474:(s,p,f,b,v,C)=>{u.jb("BatchNormalization",s,{epsilon:p,momentum:f,spatial:!!v,trainingMode:!!b,format:C?"NHWC":"NCHW"})},870643:(s,p,f,b,v,C)=>{u.jb("BatchNormalization",s,{epsilon:p,momentum:f,spatial:!!v,trainingMode:!!b,format:C?"NHWC":"NCHW"})},870812:(s,p,f)=>{u.jb("CumSum",s,{exclusive:Number(p),reverse:Number(f)})},870909:(s,p,f)=>{u.jb("DequantizeLinear",s,{axis:p,blockSize:f})},870999:(s,p,f,b,v,C,z,D,W)=>{u.jb("Attention",s,{numHeads:p,isUnidirectional:f,maskFilterValue:b,scale:v,doRotary:C,qkvHiddenSizes:z?Array.from(i().subarray(Number(D)>>>0,Number(D)+z>>>0)):[],pastPresentShareBuffer:!!W})},871271:s=>{u.jb("BiasAdd",s,void 0)},871326:s=>{u.jb("BiasSplitGelu",s,void 0)},871387:s=>{u.jb("FastGelu",s,void 0)},871443:(s,p,f,b,v,C,z,D,W,G,j,de,he,P,ue,xe)=>{u.jb("Conv",s,{format:de?"NHWC":"NCHW",auto_pad:p,dilations:f?Array.from(i().subarray(f>>>0,b>>>0)):[],group:v,kernel_shape:C?Array.from(i().subarray(C>>>0,z>>>0)):[],pads:D?Array.from(i().subarray(D>>>0,W>>>0)):[],strides:G?Array.from(i().subarray(G>>>0,j>>>0)):[],w_is_const:()=>!!t()[he>>>0],activation:Ee(P),activation_params:ue?Array.from(d().subarray(ue>>>0,xe>>>0)):[]})},871939:s=>{u.jb("Gelu",s,void 0)},871991:(s,p,f,b)=>{u.jb("GroupQueryAttention",s,{numHeads:p,kvNumHeads:f,scale:b})},872104:(s,p,f,b)=>{u.jb("LayerNormalization",s,{axis:p,epsilon:f,simplified:!!b})},872215:(s,p,f,b)=>{u.jb("LayerNormalization",s,{axis:p,epsilon:f,simplified:!!b})},872326:(s,p,f,b,v,C)=>{u.jb("MatMulNBits",s,{k:p,n:f,accuracyLevel:b,bits:v,blockSize:C})},872453:(s,p,f,b,v,C)=>{u.jb("MultiHeadAttention",s,{numHeads:p,isUnidirectional:f,maskFilterValue:b,scale:v,doRotary:C})},872612:(s,p)=>{u.jb("QuickGelu",s,{alpha:p})},872676:(s,p,f,b,v)=>{u.jb("RotaryEmbedding",s,{interleaved:!!p,numHeads:f,rotaryEmbeddingDim:b,scale:v})},872815:(s,p,f)=>{u.jb("SkipLayerNormalization",s,{epsilon:p,simplified:!!f})},872917:(s,p,f)=>{u.jb("SkipLayerNormalization",s,{epsilon:p,simplified:!!f})},873019:(s,p,f,b)=>{u.jb("GatherBlockQuantized",s,{gatherAxis:p,quantizeAxis:f,blockSize:b})},873140:s=>{u.Yb(s)},873174:(s,p)=>u.$b(s,p,u.Eb.cc,u.Eb.errors)};function ql(s,p,f){return li(async()=>{await u.Wb(s,p,f)})}function jl(){return typeof wasmOffsetConverter<"u"}function pn(s){this.name="ExitStatus",this.message=`Program terminated with exit(${s})`,this.status=s}var mn=s=>{s.terminate(),s.onmessage=()=>{}},Po=s=>{ct.length==0&&(Mo(),Ro(ct[0]));var p=ct.pop();if(!p)return 6;wt.push(p),Ze[s.Ab]=p,p.Ab=s.Ab;var f={cmd:"run",start_routine:s.dc,arg:s.Pb,pthread_ptr:s.Ab};return p.postMessage(f,s.jc),0},bt=0,$e=(s,p,...f)=>{for(var b=2*f.length,v=zn(),C=Pn(8*b),z=C>>>3,D=0;D<f.length;D++){var W=f[D];typeof W=="bigint"?(F[z+2*D]=1n,F[z+2*D+1]=W):(F[z+2*D]=0n,l()[z+2*D+1>>>0]=W)}return s=Di(s,0,b,C,p),yr(v),s};function fn(s){if(y)return $e(0,1,s);if(pe=s,!(0<bt)){for(var p of wt)mn(p);for(p of ct)mn(p);ct=[],wt=[],Ze=[],Se=!0}T(s,new pn(s))}function zo(s){if(y)return $e(1,0,s);hn(s)}var hn=s=>{if(pe=s,y)throw zo(s),"unwind";fn(s)},ct=[],wt=[],Oo=[],Ze={},Do=s=>{var p=s.Ab;delete Ze[p],ct.push(s),wt.splice(wt.indexOf(s),1),s.Ab=0,En(p)};function Bo(){Oo.forEach(s=>s())}var Ro=s=>new Promise(p=>{s.onmessage=v=>{var C=(v=v.data).cmd;if(v.targetThread&&v.targetThread!=Rt()){var z=Ze[v.targetThread];z?z.postMessage(v,v.transferList):X(`Internal error! Worker sent a message "${C}" to target pthread ${v.targetThread}, but that thread no longer exists!`)}else C==="checkMailbox"?sr():C==="spawnThread"?Po(v):C==="cleanupThread"?Do(Ze[v.thread]):C==="killThread"?(v=v.thread,C=Ze[v],delete Ze[v],mn(C),En(v),wt.splice(wt.indexOf(C),1),C.Ab=0):C==="cancelThread"?Ze[v.thread].postMessage({cmd:"cancel"}):C==="loaded"?(s.loaded=!0,p(s)):C==="alert"?alert(`Thread ${v.threadId}: ${v.text}`):v.target==="setimmediate"?s.postMessage(v):C==="callHandler"?u[v.handler](...v.args):C&&X(`worker sent an unknown command ${C}`)},s.onerror=v=>{throw X(`worker sent an error! ${v.filename}:${v.lineno}: ${v.message}`),v};var f,b=[];for(f of[])u.hasOwnProperty(f)&&b.push(f);s.postMessage({cmd:"load",handlers:b,wasmMemory:le,wasmModule:Y})});function Mo(){var s=new Worker(new URL(import.meta.url),{type:"module",workerData:"em-pthread",name:"em-pthread"});ct.push(s)}var ar=s=>{for(;0<s.length;)s.shift()(u)},Kl=()=>{var s=Rt(),p=a()[s+52>>>2>>>0];s=a()[s+56>>>2>>>0],Ri(p,p-s),yr(p)},Yl=(s,p)=>{bt=0,s=Mi(s,p),0<bt?pe=s:gr(s)};class Xl{constructor(p){this.Ib=p-24}}function Zl(s,p,f){var b=new Xl(s>>>=0);throw p>>>=0,f>>>=0,a()[b.Ib+16>>>2>>>0]=0,a()[b.Ib+4>>>2>>>0]=p,a()[b.Ib+8>>>2>>>0]=f,s}function Uo(s,p,f,b){return y?$e(2,1,s,p,f,b):Vo(s,p,f,b)}function Vo(s,p,f,b){if(s>>>=0,p>>>=0,f>>>=0,b>>>=0,x===void 0)return X("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var v=[];return y&&v.length===0?Uo(s,p,f,b):(s={dc:f,Ab:s,Pb:b,jc:v},y?(s.Lb="spawnThread",postMessage(s,v),0):Po(s))}var No=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,Wo=(s,p,f)=>{var b=(p>>>=0)+f;for(f=p;s[f]&&!(f>=b);)++f;if(16<f-p&&s.buffer&&No)return No.decode(s.buffer instanceof x?s.slice(p,f):s.subarray(p,f));for(b="";p<f;){var v=s[p++];if(128&v){var C=63&s[p++];if((224&v)==192)b+=String.fromCharCode((31&v)<<6|C);else{var z=63&s[p++];65536>(v=(240&v)==224?(15&v)<<12|C<<6|z:(7&v)<<18|C<<12|z<<6|63&s[p++])?b+=String.fromCharCode(v):(v-=65536,b+=String.fromCharCode(55296|v>>10,56320|1023&v))}}else b+=String.fromCharCode(v)}return b},Ee=(s,p)=>(s>>>=0)?Wo(r(),s,p):"";function Ho(s,p,f){return y?$e(3,1,s,p,f):0}function Go(s,p){if(y)return $e(4,1,s,p)}var gn=s=>{for(var p=0,f=0;f<s.length;++f){var b=s.charCodeAt(f);127>=b?p++:2047>=b?p+=2:55296<=b&&57343>=b?(p+=4,++f):p+=3}return p},Lo=(s,p,f,b)=>{if(!(0<b))return 0;var v=f>>>=0;b=f+b-1;for(var C=0;C<s.length;++C){var z=s.charCodeAt(C);if(55296<=z&&57343>=z&&(z=65536+((1023&z)<<10)|1023&s.charCodeAt(++C)),127>=z){if(f>=b)break;p[f++>>>0]=z}else{if(2047>=z){if(f+1>=b)break;p[f++>>>0]=192|z>>6}else{if(65535>=z){if(f+2>=b)break;p[f++>>>0]=224|z>>12}else{if(f+3>=b)break;p[f++>>>0]=240|z>>18,p[f++>>>0]=128|z>>12&63}p[f++>>>0]=128|z>>6&63}p[f++>>>0]=128|63&z}}return p[f>>>0]=0,f-v},Ot=(s,p,f)=>Lo(s,r(),p,f);function Fo(s,p){if(y)return $e(5,1,s,p)}function qo(s,p,f){if(y)return $e(6,1,s,p,f)}function jo(s,p,f){return y?$e(7,1,s,p,f):0}function Ko(s,p){if(y)return $e(8,1,s,p)}function Yo(s,p,f){if(y)return $e(9,1,s,p,f)}function Xo(s,p,f,b){if(y)return $e(10,1,s,p,f,b)}function Zo(s,p,f,b){if(y)return $e(11,1,s,p,f,b)}function Qo(s,p,f,b){if(y)return $e(12,1,s,p,f,b)}function Jo(s){if(y)return $e(13,1,s)}function ei(s,p){if(y)return $e(14,1,s,p)}function ti(s,p,f){if(y)return $e(15,1,s,p,f)}var ri,pt,Ql=()=>{zt("")},Qe=s=>{for(var p="";r()[s>>>0];)p+=ri[r()[s++>>>0]];return p},yn={},bn={},Jl={};function st(s,p,f={}){if(!("argPackAdvance"in p))throw new TypeError("registerType registeredInstance requires argPackAdvance");return function(b,v,C={}){var z=v.name;if(!b)throw new pt(`type "${z}" must have a positive integer typeid pointer`);if(bn.hasOwnProperty(b)){if(C.Rb)return;throw new pt(`Cannot register type '${z}' twice`)}bn[b]=v,delete Jl[b],yn.hasOwnProperty(b)&&(v=yn[b],delete yn[b],v.forEach(D=>D()))}(s,p,f)}var ni=(s,p,f)=>{switch(p){case 1:return f?b=>t()[b>>>0]:b=>r()[b>>>0];case 2:return f?b=>n()[b>>>1>>>0]:b=>o()[b>>>1>>>0];case 4:return f?b=>i()[b>>>2>>>0]:b=>a()[b>>>2>>>0];case 8:return f?b=>F[b>>>3]:b=>fe[b>>>3];default:throw new TypeError(`invalid integer width (${p}): ${s}`)}};function ec(s,p,f){f>>>=0,st(s>>>=0,{name:p=Qe(p>>>0),fromWireType:b=>b,toWireType:function(b,v){if(typeof v!="bigint"&&typeof v!="number")throw v=v===null?"null":(b=typeof v)=="object"||b==="array"||b==="function"?v.toString():""+v,new TypeError(`Cannot convert "${v}" to ${this.name}`);return typeof v=="number"&&(v=BigInt(v)),v},argPackAdvance:mt,readValueFromPointer:ni(p,f,p.indexOf("u")==-1),Db:null})}var mt=8;function tc(s,p,f,b){st(s>>>=0,{name:p=Qe(p>>>0),fromWireType:function(v){return!!v},toWireType:function(v,C){return C?f:b},argPackAdvance:mt,readValueFromPointer:function(v){return this.fromWireType(r()[v>>>0])},Db:null})}var wn=[],ut=[];function vn(s){9<(s>>>=0)&&--ut[s+1]==0&&(ut[s]=void 0,wn.push(s))}var qe=s=>{if(!s)throw new pt("Cannot use deleted val. handle = "+s);return ut[s]},je=s=>{switch(s){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let p=wn.pop()||ut.length;return ut[p]=s,ut[p+1]=1,p}};function _n(s){return this.fromWireType(a()[s>>>2>>>0])}var rc={name:"emscripten::val",fromWireType:s=>{var p=qe(s);return vn(s),p},toWireType:(s,p)=>je(p),argPackAdvance:mt,readValueFromPointer:_n,Db:null};function nc(s){return st(s>>>0,rc)}var oc=(s,p)=>{switch(p){case 4:return function(f){return this.fromWireType(d()[f>>>2>>>0])};case 8:return function(f){return this.fromWireType(l()[f>>>3>>>0])};default:throw new TypeError(`invalid float width (${p}): ${s}`)}};function ic(s,p,f){f>>>=0,st(s>>>=0,{name:p=Qe(p>>>0),fromWireType:b=>b,toWireType:(b,v)=>v,argPackAdvance:mt,readValueFromPointer:oc(p,f),Db:null})}function ac(s,p,f,b,v){if(s>>>=0,f>>>=0,p=Qe(p>>>0),v===-1&&(v=4294967295),v=D=>D,b===0){var C=32-8*f;v=D=>D<<C>>>C}var z=p.includes("unsigned")?function(D,W){return W>>>0}:function(D,W){return W};st(s,{name:p,fromWireType:v,toWireType:z,argPackAdvance:mt,readValueFromPointer:ni(p,f,b!==0),Db:null})}function sc(s,p,f){function b(C){var z=a()[C>>>2>>>0];return C=a()[C+4>>>2>>>0],new v(t().buffer,C,z)}var v=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][p];st(s>>>=0,{name:f=Qe(f>>>0),fromWireType:b,argPackAdvance:mt,readValueFromPointer:b},{Rb:!0})}function uc(s,p){s>>>=0;var f=(p=Qe(p>>>0))==="std::string";st(s,{name:p,fromWireType:function(b){var v=a()[b>>>2>>>0],C=b+4;if(f)for(var z=C,D=0;D<=v;++D){var W=C+D;if(D==v||r()[W>>>0]==0){if(z=Ee(z,W-z),G===void 0)var G=z;else G+=String.fromCharCode(0),G+=z;z=W+1}}else{for(G=Array(v),D=0;D<v;++D)G[D]=String.fromCharCode(r()[C+D>>>0]);G=G.join("")}return et(b),G},toWireType:function(b,v){v instanceof ArrayBuffer&&(v=new Uint8Array(v));var C=typeof v=="string";if(!(C||v instanceof Uint8Array||v instanceof Uint8ClampedArray||v instanceof Int8Array))throw new pt("Cannot pass non-string to std::string");var z=f&&C?gn(v):v.length,D=hr(4+z+1),W=D+4;if(a()[D>>>2>>>0]=z,f&&C)Ot(v,W,z+1);else if(C)for(C=0;C<z;++C){var G=v.charCodeAt(C);if(255<G)throw et(W),new pt("String has UTF-16 code units that do not fit in 8 bits");r()[W+C>>>0]=G}else for(C=0;C<z;++C)r()[W+C>>>0]=v[C];return b!==null&&b.push(et,D),D},argPackAdvance:mt,readValueFromPointer:_n,Db(b){et(b)}})}var oi=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,dc=(s,p)=>{for(var f=s>>1,b=f+p/2;!(f>=b)&&o()[f>>>0];)++f;if(32<(f<<=1)-s&&oi)return oi.decode(r().slice(s,f));for(f="",b=0;!(b>=p/2);++b){var v=n()[s+2*b>>>1>>>0];if(v==0)break;f+=String.fromCharCode(v)}return f},lc=(s,p,f)=>{if(f??=2147483647,2>f)return 0;var b=p;f=(f-=2)<2*s.length?f/2:s.length;for(var v=0;v<f;++v){var C=s.charCodeAt(v);n()[p>>>1>>>0]=C,p+=2}return n()[p>>>1>>>0]=0,p-b},cc=s=>2*s.length,pc=(s,p)=>{for(var f=0,b="";!(f>=p/4);){var v=i()[s+4*f>>>2>>>0];if(v==0)break;++f,65536<=v?(v-=65536,b+=String.fromCharCode(55296|v>>10,56320|1023&v)):b+=String.fromCharCode(v)}return b},mc=(s,p,f)=>{if(p>>>=0,f??=2147483647,4>f)return 0;var b=p;f=b+f-4;for(var v=0;v<s.length;++v){var C=s.charCodeAt(v);if(55296<=C&&57343>=C&&(C=65536+((1023&C)<<10)|1023&s.charCodeAt(++v)),i()[p>>>2>>>0]=C,(p+=4)+4>f)break}return i()[p>>>2>>>0]=0,p-b},fc=s=>{for(var p=0,f=0;f<s.length;++f){var b=s.charCodeAt(f);55296<=b&&57343>=b&&++f,p+=4}return p};function hc(s,p,f){if(s>>>=0,p>>>=0,f=Qe(f>>>=0),p===2)var b=dc,v=lc,C=cc,z=D=>o()[D>>>1>>>0];else p===4&&(b=pc,v=mc,C=fc,z=D=>a()[D>>>2>>>0]);st(s,{name:f,fromWireType:D=>{for(var W,G=a()[D>>>2>>>0],j=D+4,de=0;de<=G;++de){var he=D+4+de*p;de!=G&&z(he)!=0||(j=b(j,he-j),W===void 0?W=j:(W+=String.fromCharCode(0),W+=j),j=he+p)}return et(D),W},toWireType:(D,W)=>{if(typeof W!="string")throw new pt(`Cannot pass non-string to C++ string type ${f}`);var G=C(W),j=hr(4+G+p);return a()[j>>>2>>>0]=G/p,v(W,j+4,G+p),D!==null&&D.push(et,j),j},argPackAdvance:mt,readValueFromPointer:_n,Db(D){et(D)}})}function gc(s,p){st(s>>>=0,{Sb:!0,name:p=Qe(p>>>0),argPackAdvance:0,fromWireType:()=>{},toWireType:()=>{}})}var yc=()=>1;function bc(s){kn(s>>>0,!g,1,!w,131072,!1),Bo()}var ii=s=>{if(!Se)try{if(s(),!(0<bt))try{y?gr(pe):hn(pe)}catch(p){p instanceof pn||p=="unwind"||T(1,p)}}catch(p){p instanceof pn||p=="unwind"||T(1,p)}};function $n(s){s>>>=0,typeof Atomics.kc=="function"&&(Atomics.kc(i(),s>>>2,s).value.then(sr),s+=128,Atomics.store(i(),s>>>2,1))}var sr=()=>{var s=Rt();s&&($n(s),ii(Bi))};function wc(s,p){(s>>>=0)==p>>>0?setTimeout(sr):y?postMessage({targetThread:s,cmd:"checkMailbox"}):(s=Ze[s])&&s.postMessage({cmd:"checkMailbox"})}var xn=[];function vc(s,p,f,b,v){for(p>>>=0,b/=2,xn.length=b,f=v>>>0>>>3,v=0;v<b;v++)xn[v]=F[f+2*v]?F[f+2*v+1]:l()[f+2*v+1>>>0];return(p?cn[p]:dp[s])(...xn)}function _c(s){s>>>=0,y?postMessage({cmd:"cleanupThread",thread:s}):Do(Ze[s])}function $c(s){}var Sn=(s,p)=>{var f=bn[s];if(f===void 0)throw s=Pi(s),f=Qe(s),et(s),new pt(`${p} has unknown type ${f}`);return f},ai=(s,p,f)=>{var b=[];return s=s.toWireType(b,f),b.length&&(a()[p>>>2>>>0]=je(b)),s};function xc(s,p,f){return p>>>=0,f>>>=0,s=qe(s>>>0),p=Sn(p,"emval::as"),ai(p,f,s)}var ur=s=>{try{s()}catch(p){zt(p)}},ft=0,Je=null,si=0,dr=[],ui={},di={},Sc=0,In=null,Ic=[];function li(s){return function(p){if(!Se){if(ft===0){var f=!1,b=!1;p((v=0)=>{if(!Se&&(si=v,f=!0,b)){ft=2,ur(()=>Ni(Je)),typeof Browser<"u"&&Browser.Jb.Qb&&Browser.Jb.resume(),v=!1;try{var C=function(){var W=i()[Je+8>>>2>>>0];return W=q[di[W]],--bt,W()}()}catch(W){C=W,v=!0}var z=!1;if(!Je){var D=In;D&&(In=null,(v?D.reject:D.resolve)(C),z=!0)}if(v&&!z)throw C}}),b=!0,f||(ft=1,Je=function(){var v=hr(65548),C=v+12;a()[v>>>2>>>0]=C,a()[v+4>>>2>>>0]=C+65536,C=dr[0];var z=ui[C];return z===void 0&&(z=Sc++,ui[C]=z,di[z]=C),C=z,i()[v+8>>>2>>>0]=C,v}(),typeof Browser<"u"&&Browser.Jb.Qb&&Browser.Jb.pause(),ur(()=>Ui(Je)))}else ft===2?(ft=0,ur(Wi),et(Je),Je=null,Ic.forEach(ii)):zt(`invalid state: ${ft}`);return si}}(p=>{s().then(p)})}function Cc(s){return s>>>=0,li(()=>(s=qe(s)).then(je))}var lr=[];function Ac(s,p,f,b){return f>>>=0,b>>>=0,(s=lr[s>>>0])(null,p=qe(p>>>0),f,b)}var Tc={},cr=s=>{var p=Tc[s];return p===void 0?Qe(s):p};function kc(s,p,f,b,v){return f>>>=0,b>>>=0,v>>>=0,(s=lr[s>>>0])(p=qe(p>>>0),p[f=cr(f)],b,v)}var ci=()=>typeof globalThis=="object"?globalThis:Function("return this")();function Ec(s){return(s>>>=0)==0?je(ci()):(s=cr(s),je(ci()[s]))}var Pc=s=>{var p=lr.length;return lr.push(s),p},zc=(s,p)=>{for(var f=Array(s),b=0;b<s;++b)f[b]=Sn(a()[p+4*b>>>2>>>0],"parameter "+b);return f},pi=(s,p)=>Object.defineProperty(p,"name",{value:s});function Oc(s,p,f){var b=(p=zc(s,p>>>0)).shift();s--;var v=`return function (obj, func, destructorsRef, args) {
`,C=0,z=[];f===0&&z.push("obj");for(var D=["retType"],W=[b],G=0;G<s;++G)z.push("arg"+G),D.push("argType"+G),W.push(p[G]),v+=`  var arg${G} = argType${G}.readValueFromPointer(args${C?"+"+C:""});
`,C+=p[G].argPackAdvance;return v+=`  var rv = ${f===1?"new func":"func.call"}(${z.join(", ")});
`,b.Sb||(D.push("emval_returnValue"),W.push(ai),v+=`  return emval_returnValue(retType, destructorsRef, rv);
`),D.push(v+`};
`),s=function(j){var de=Function;if(!(de instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof de} which is not a function`);var he=pi(de.name||"unknownFunctionName",function(){});return he.prototype=de.prototype,he=new he,(j=de.apply(he,j))instanceof Object?j:he}(D)(...W),f=`methodCaller<(${p.map(j=>j.name).join(", ")}) => ${b.name}>`,Pc(pi(f,s))}function Dc(s){return s=cr(s>>>0),je(u[s])}function Bc(s,p){return p>>>=0,s=qe(s>>>0),p=qe(p),je(s[p])}function Rc(s){9<(s>>>=0)&&(ut[s+1]+=1)}function Mc(){return je([])}function Uc(s){s=qe(s>>>0);for(var p=Array(s.length),f=0;f<s.length;f++)p[f]=s[f];return je(p)}function Vc(s){return je(cr(s>>>0))}function Nc(){return je({})}function Wc(s){for(var p=qe(s>>>=0);p.length;){var f=p.pop();p.pop()(f)}vn(s)}function Hc(s,p,f){p>>>=0,f>>>=0,s=qe(s>>>0),p=qe(p),f=qe(f),s[p]=f}function Gc(s,p){return p>>>=0,s=(s=Sn(s>>>0,"_emval_take_value")).readValueFromPointer(p),je(s)}function Lc(s,p){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),p>>>=0,s=new Date(1e3*s),i()[p>>>2>>>0]=s.getUTCSeconds(),i()[p+4>>>2>>>0]=s.getUTCMinutes(),i()[p+8>>>2>>>0]=s.getUTCHours(),i()[p+12>>>2>>>0]=s.getUTCDate(),i()[p+16>>>2>>>0]=s.getUTCMonth(),i()[p+20>>>2>>>0]=s.getUTCFullYear()-1900,i()[p+24>>>2>>>0]=s.getUTCDay(),s=(s.getTime()-Date.UTC(s.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,i()[p+28>>>2>>>0]=s}var Dt=s=>s%4==0&&(s%100!=0||s%400==0),mi=[0,31,60,91,121,152,182,213,244,274,305,335],fi=[0,31,59,90,120,151,181,212,243,273,304,334];function Fc(s,p){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),p>>>=0,s=new Date(1e3*s),i()[p>>>2>>>0]=s.getSeconds(),i()[p+4>>>2>>>0]=s.getMinutes(),i()[p+8>>>2>>>0]=s.getHours(),i()[p+12>>>2>>>0]=s.getDate(),i()[p+16>>>2>>>0]=s.getMonth(),i()[p+20>>>2>>>0]=s.getFullYear()-1900,i()[p+24>>>2>>>0]=s.getDay();var f=(Dt(s.getFullYear())?mi:fi)[s.getMonth()]+s.getDate()-1|0;i()[p+28>>>2>>>0]=f,i()[p+36>>>2>>>0]=-60*s.getTimezoneOffset(),f=new Date(s.getFullYear(),6,1).getTimezoneOffset();var b=new Date(s.getFullYear(),0,1).getTimezoneOffset();s=0|(f!=b&&s.getTimezoneOffset()==Math.min(b,f)),i()[p+32>>>2>>>0]=s}function qc(s){s>>>=0;var p=new Date(i()[s+20>>>2>>>0]+1900,i()[s+16>>>2>>>0],i()[s+12>>>2>>>0],i()[s+8>>>2>>>0],i()[s+4>>>2>>>0],i()[s>>>2>>>0],0),f=i()[s+32>>>2>>>0],b=p.getTimezoneOffset(),v=new Date(p.getFullYear(),6,1).getTimezoneOffset(),C=new Date(p.getFullYear(),0,1).getTimezoneOffset(),z=Math.min(C,v);return 0>f?i()[s+32>>>2>>>0]=+(v!=C&&z==b):0<f!=(z==b)&&(v=Math.max(C,v),p.setTime(p.getTime()+6e4*((0<f?z:v)-b))),i()[s+24>>>2>>>0]=p.getDay(),f=(Dt(p.getFullYear())?mi:fi)[p.getMonth()]+p.getDate()-1|0,i()[s+28>>>2>>>0]=f,i()[s>>>2>>>0]=p.getSeconds(),i()[s+4>>>2>>>0]=p.getMinutes(),i()[s+8>>>2>>>0]=p.getHours(),i()[s+12>>>2>>>0]=p.getDate(),i()[s+16>>>2>>>0]=p.getMonth(),i()[s+20>>>2>>>0]=p.getYear(),s=p.getTime(),BigInt(isNaN(s)?-1:s/1e3)}function hi(s,p,f,b,v,C,z){return y?$e(16,1,s,p,f,b,v,C,z):-52}function gi(s,p,f,b,v,C){if(y)return $e(17,1,s,p,f,b,v,C)}function jc(s,p,f,b){s>>>=0,p>>>=0,f>>>=0,b>>>=0;var v=new Date().getFullYear(),C=new Date(v,0,1),z=new Date(v,6,1);v=C.getTimezoneOffset();var D=z.getTimezoneOffset(),W=Math.max(v,D);a()[s>>>2>>>0]=60*W,i()[p>>>2>>>0]=+(v!=D),C=(s=G=>G.toLocaleTimeString(void 0,{hour12:!1,timeZoneName:"short"}).split(" ")[1])(C),z=s(z),D<v?(Ot(C,f,17),Ot(z,b,17)):(Ot(C,b,17),Ot(z,f,17))}var Cn=[],yi=(s,p)=>{Cn.length=0;for(var f;f=r()[s++>>>0];){var b=f!=105;p+=(b&=f!=112)&&p%8?4:0,Cn.push(f==112?a()[p>>>2>>>0]:f==106?F[p>>>3]:f==105?i()[p>>>2>>>0]:l()[p>>>3>>>0]),p+=b?8:4}return Cn};function Kc(s,p,f){return s>>>=0,p=yi(p>>>0,f>>>0),cn[s](...p)}function Yc(s,p,f){return s>>>=0,p=yi(p>>>0,f>>>0),cn[s](...p)}var Xc=()=>{},Zc=()=>Date.now();function Qc(s,p){return X(Ee(s>>>0,p>>>0))}var bi,Jc=()=>{throw bt+=1,"unwind"};function ep(){return 4294901760}bi=()=>performance.timeOrigin+performance.now();var tp=()=>navigator.hardwareConcurrency;function rp(){return zt("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function np(s){s>>>=0;var p=r().length;if(s<=p||4294901760<s)return!1;for(var f=1;4>=f;f*=2){var b=p*(1+.2/f);b=Math.min(b,s+100663296);var v=Math;b=Math.max(s,b);e:{v=(v.min.call(v,4294901760,b+(65536-b%65536)%65536)-le.buffer.byteLength+65535)/65536;try{le.grow(v),Ae();var C=1;break e}catch{}C=void 0}if(C)return!0}return!1}var pr=()=>(zt("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Bt={},wi=s=>{s.forEach(p=>{var f=pr();f&&(Bt[f]=p)})};function op(){var s=Error().stack.toString().split(`
`);return s[0]=="Error"&&s.shift(),wi(s),Bt.Ob=pr(),Bt.bc=s,Bt.Ob}function ip(s,p,f){if(s>>>=0,p>>>=0,Bt.Ob==s)var b=Bt.bc;else(b=Error().stack.toString().split(`
`))[0]=="Error"&&b.shift(),wi(b);for(var v=3;b[v]&&pr()!=s;)++v;for(s=0;s<f&&b[s+v];++s)i()[p+4*s>>>2>>>0]=pr();return s}var An,Tn={},vi=()=>{if(!An){var s,p={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:A||"./this.program"};for(s in Tn)Tn[s]===void 0?delete p[s]:p[s]=Tn[s];var f=[];for(s in p)f.push(`${s}=${p[s]}`);An=f}return An};function _i(s,p){if(y)return $e(18,1,s,p);s>>>=0,p>>>=0;var f=0;return vi().forEach((b,v)=>{var C=p+f;for(v=a()[s+4*v>>>2>>>0]=C,C=0;C<b.length;++C)t()[v++>>>0]=b.charCodeAt(C);t()[v>>>0]=0,f+=b.length+1}),0}function $i(s,p){if(y)return $e(19,1,s,p);s>>>=0,p>>>=0;var f=vi();a()[s>>>2>>>0]=f.length;var b=0;return f.forEach(v=>b+=v.length+1),a()[p>>>2>>>0]=b,0}function xi(s){return y?$e(20,1,s):52}function Si(s,p,f,b){return y?$e(21,1,s,p,f,b):52}function Ii(s,p,f,b){return y?$e(22,1,s,p,f,b):70}var ap=[null,[],[]];function Ci(s,p,f,b){if(y)return $e(23,1,s,p,f,b);p>>>=0,f>>>=0,b>>>=0;for(var v=0,C=0;C<f;C++){var z=a()[p>>>2>>>0],D=a()[p+4>>>2>>>0];p+=8;for(var W=0;W<D;W++){var G=r()[z+W>>>0],j=ap[s];G===0||G===10?((s===1?K:X)(Wo(j,0)),j.length=0):j.push(G)}v+=D}return a()[b>>>2>>>0]=v,0}var Ai=[31,29,31,30,31,30,31,31,30,31,30,31],Ti=[31,28,31,30,31,30,31,31,30,31,30,31],sp=(s,p)=>{t().set(s,p>>>0)};function ki(s,p,f,b){function v(P,ue,xe){for(P=typeof P=="number"?P.toString():P||"";P.length<ue;)P=xe[0]+P;return P}function C(P,ue){return v(P,ue,"0")}function z(P,ue){function xe(Gi){return 0>Gi?-1:0<Gi?1:0}var vt;return(vt=xe(P.getFullYear()-ue.getFullYear()))===0&&(vt=xe(P.getMonth()-ue.getMonth()))===0&&(vt=xe(P.getDate()-ue.getDate())),vt}function D(P){switch(P.getDay()){case 0:return new Date(P.getFullYear()-1,11,29);case 1:return P;case 2:return new Date(P.getFullYear(),0,3);case 3:return new Date(P.getFullYear(),0,2);case 4:return new Date(P.getFullYear(),0,1);case 5:return new Date(P.getFullYear()-1,11,31);case 6:return new Date(P.getFullYear()-1,11,30)}}function W(P){var ue=P.Bb;for(P=new Date(new Date(P.Cb+1900,0,1).getTime());0<ue;){var xe=P.getMonth(),vt=(Dt(P.getFullYear())?Ai:Ti)[xe];if(!(ue>vt-P.getDate())){P.setDate(P.getDate()+ue);break}ue-=vt-P.getDate()+1,P.setDate(1),11>xe?P.setMonth(xe+1):(P.setMonth(0),P.setFullYear(P.getFullYear()+1))}return xe=new Date(P.getFullYear()+1,0,4),ue=D(new Date(P.getFullYear(),0,4)),xe=D(xe),0>=z(ue,P)?0>=z(xe,P)?P.getFullYear()+1:P.getFullYear():P.getFullYear()-1}s>>>=0,p>>>=0,f>>>=0,b>>>=0;var G=a()[b+40>>>2>>>0];for(var j in b={hc:i()[b>>>2>>>0],fc:i()[b+4>>>2>>>0],Gb:i()[b+8>>>2>>>0],Kb:i()[b+12>>>2>>>0],Hb:i()[b+16>>>2>>>0],Cb:i()[b+20>>>2>>>0],ub:i()[b+24>>>2>>>0],Bb:i()[b+28>>>2>>>0],oc:i()[b+32>>>2>>>0],ec:i()[b+36>>>2>>>0],ic:G?Ee(G):""},f=Ee(f),G={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"})f=f.replace(new RegExp(j,"g"),G[j]);var de="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),he="January February March April May June July August September October November December".split(" ");for(j in G={"%a":P=>de[P.ub].substring(0,3),"%A":P=>de[P.ub],"%b":P=>he[P.Hb].substring(0,3),"%B":P=>he[P.Hb],"%C":P=>C((P.Cb+1900)/100|0,2),"%d":P=>C(P.Kb,2),"%e":P=>v(P.Kb,2," "),"%g":P=>W(P).toString().substring(2),"%G":W,"%H":P=>C(P.Gb,2),"%I":P=>((P=P.Gb)==0?P=12:12<P&&(P-=12),C(P,2)),"%j":P=>{for(var ue=0,xe=0;xe<=P.Hb-1;ue+=(Dt(P.Cb+1900)?Ai:Ti)[xe++]);return C(P.Kb+ue,3)},"%m":P=>C(P.Hb+1,2),"%M":P=>C(P.fc,2),"%n":()=>`
`,"%p":P=>0<=P.Gb&&12>P.Gb?"AM":"PM","%S":P=>C(P.hc,2),"%t":()=>"	","%u":P=>P.ub||7,"%U":P=>C(Math.floor((P.Bb+7-P.ub)/7),2),"%V":P=>{var ue=Math.floor((P.Bb+7-(P.ub+6)%7)/7);if(2>=(P.ub+371-P.Bb-2)%7&&ue++,ue)ue==53&&((xe=(P.ub+371-P.Bb)%7)==4||xe==3&&Dt(P.Cb)||(ue=1));else{ue=52;var xe=(P.ub+7-P.Bb-1)%7;(xe==4||xe==5&&Dt(P.Cb%400-1))&&ue++}return C(ue,2)},"%w":P=>P.ub,"%W":P=>C(Math.floor((P.Bb+7-(P.ub+6)%7)/7),2),"%y":P=>(P.Cb+1900).toString().substring(2),"%Y":P=>P.Cb+1900,"%z":P=>{var ue=0<=(P=P.ec);return P=Math.abs(P)/60,(ue?"+":"-")+("0000"+(P/60*100+P%60)).slice(-4)},"%Z":P=>P.ic,"%%":()=>"%"},f=f.replace(/%%/g,"\0\0"),G)f.includes(j)&&(f=f.replace(new RegExp(j,"g"),G[j](b)));return j=function(P){var ue=Array(gn(P)+1);return Lo(P,ue,0,ue.length),ue}(f=f.replace(/\0\0/g,"%")),j.length>p?0:(sp(j,s),j.length-1)}function up(s,p,f,b){return ki(s>>>0,p>>>0,f>>>0,b>>>0)}y||function(){for(var s=u.numThreads-1;s--;)Mo();Gt.unshift(()=>{Fe++,function(p){y?p():Promise.all(ct.map(Ro)).then(p)}(()=>Io())})}();for(var Ei=Array(256),mr=0;256>mr;++mr)Ei[mr]=String.fromCharCode(mr);ri=Ei,pt=u.BindingError=class extends Error{constructor(s){super(s),this.name="BindingError"}},u.InternalError=class extends Error{constructor(s){super(s),this.name="InternalError"}},ut.push(0,1,void 0,1,null,1,!0,1,!1,1),u.count_emval_handles=()=>ut.length/2-5-wn.length;var dp=[fn,zo,Uo,Ho,Go,Fo,qo,jo,Ko,Yo,Xo,Zo,Qo,Jo,ei,ti,hi,gi,_i,$i,xi,Si,Ii,Ci],q=function(){function s(f,b){return q=f.exports,q=function(){var v=q,C={};for(let[z,D]of Object.entries(v))C[z]=typeof D=="function"?(...W)=>{dr.push(z);try{return D(...W)}finally{Se||(dr.pop(),Je&&ft===1&&dr.length===0&&(ft=0,bt+=1,ur(Vi),typeof Fibers<"u"&&Fibers.pc()))}}:D;return C}(),q=function(){var v=q,C=D=>W=>D(W)>>>0,z=D=>()=>D()>>>0;return(v=Object.assign({},v)).Ca=C(v.Ca),v.fb=z(v.fb),v.gb=C(v.gb),v.emscripten_main_runtime_thread_id=z(v.emscripten_main_runtime_thread_id),v.sb=C(v.sb),v.tb=z(v.tb),v}(),Oo.push(q.ib),ze.unshift(q.Ba),Y=b,Io(),q}var p=Eo();if(Fe++,u.instantiateWasm)try{return u.instantiateWasm(p,s)}catch(f){X(`Module.instantiateWasm callback failed with error: ${f}`),m(f)}return ln||=u.locateFile?Co("ort-wasm-simd-threaded.jsep.wasm")?"ort-wasm-simd-threaded.jsep.wasm":u.locateFile?u.locateFile("ort-wasm-simd-threaded.jsep.wasm",O):O+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,function(f,b){var v=ln;return B||typeof WebAssembly.instantiateStreaming!="function"||Co(v)||Ao(v)||typeof fetch!="function"?ko(v,f,b):fetch(v,{credentials:"same-origin"}).then(C=>WebAssembly.instantiateStreaming(C,f).then(b,function(z){return X(`wasm streaming compile failed: ${z}`),X("falling back to ArrayBuffer instantiation"),ko(v,f,b)}))}(p,function(f){s(f.instance,f.module)}).catch(m),{}}(),Pi=s=>(Pi=q.Ca)(s),zi=()=>(zi=q.Da)();u._OrtInit=(s,p)=>(u._OrtInit=q.Ea)(s,p),u._OrtGetLastError=(s,p)=>(u._OrtGetLastError=q.Fa)(s,p),u._OrtCreateSessionOptions=(s,p,f,b,v,C,z,D,W,G)=>(u._OrtCreateSessionOptions=q.Ga)(s,p,f,b,v,C,z,D,W,G),u._OrtAppendExecutionProvider=(s,p)=>(u._OrtAppendExecutionProvider=q.Ha)(s,p),u._OrtAddFreeDimensionOverride=(s,p,f)=>(u._OrtAddFreeDimensionOverride=q.Ia)(s,p,f),u._OrtAddSessionConfigEntry=(s,p,f)=>(u._OrtAddSessionConfigEntry=q.Ja)(s,p,f),u._OrtReleaseSessionOptions=s=>(u._OrtReleaseSessionOptions=q.Ka)(s),u._OrtCreateSession=(s,p,f)=>(u._OrtCreateSession=q.La)(s,p,f),u._OrtReleaseSession=s=>(u._OrtReleaseSession=q.Ma)(s),u._OrtGetInputOutputCount=(s,p,f)=>(u._OrtGetInputOutputCount=q.Na)(s,p,f),u._OrtGetInputName=(s,p)=>(u._OrtGetInputName=q.Oa)(s,p),u._OrtGetOutputName=(s,p)=>(u._OrtGetOutputName=q.Pa)(s,p),u._OrtFree=s=>(u._OrtFree=q.Qa)(s),u._OrtCreateTensor=(s,p,f,b,v,C)=>(u._OrtCreateTensor=q.Ra)(s,p,f,b,v,C),u._OrtGetTensorData=(s,p,f,b,v)=>(u._OrtGetTensorData=q.Sa)(s,p,f,b,v),u._OrtReleaseTensor=s=>(u._OrtReleaseTensor=q.Ta)(s),u._OrtCreateRunOptions=(s,p,f,b)=>(u._OrtCreateRunOptions=q.Ua)(s,p,f,b),u._OrtAddRunConfigEntry=(s,p,f)=>(u._OrtAddRunConfigEntry=q.Va)(s,p,f),u._OrtReleaseRunOptions=s=>(u._OrtReleaseRunOptions=q.Wa)(s),u._OrtCreateBinding=s=>(u._OrtCreateBinding=q.Xa)(s),u._OrtBindInput=(s,p,f)=>(u._OrtBindInput=q.Ya)(s,p,f),u._OrtBindOutput=(s,p,f,b)=>(u._OrtBindOutput=q.Za)(s,p,f,b),u._OrtClearBoundOutputs=s=>(u._OrtClearBoundOutputs=q._a)(s),u._OrtReleaseBinding=s=>(u._OrtReleaseBinding=q.$a)(s),u._OrtRunWithBinding=(s,p,f,b,v)=>(u._OrtRunWithBinding=q.ab)(s,p,f,b,v),u._OrtRun=(s,p,f,b,v,C,z,D)=>(u._OrtRun=q.bb)(s,p,f,b,v,C,z,D),u._OrtEndProfiling=s=>(u._OrtEndProfiling=q.cb)(s),u._JsepOutput=(s,p,f)=>(u._JsepOutput=q.db)(s,p,f),u._JsepGetNodeName=s=>(u._JsepGetNodeName=q.eb)(s);var fr,Rt=()=>(Rt=q.fb)(),hr=u._malloc=s=>(hr=u._malloc=q.gb)(s),et=u._free=s=>(et=u._free=q.hb)(s),kn=(s,p,f,b,v,C)=>(kn=q.kb)(s,p,f,b,v,C),Oi=()=>(Oi=q.lb)(),Di=(s,p,f,b,v)=>(Di=q.mb)(s,p,f,b,v),En=s=>(En=q.nb)(s),gr=s=>(gr=q.ob)(s),Bi=()=>(Bi=q.pb)(),Ri=(s,p)=>(Ri=q.qb)(s,p),yr=s=>(yr=q.rb)(s),Pn=s=>(Pn=q.sb)(s),zn=()=>(zn=q.tb)(),Mi=u.dynCall_ii=(s,p)=>(Mi=u.dynCall_ii=q.vb)(s,p),Ui=s=>(Ui=q.wb)(s),Vi=()=>(Vi=q.xb)(),Ni=s=>(Ni=q.yb)(s),Wi=()=>(Wi=q.zb)();function Hi(){0<Fe||(y?(c(u),y||ar(ze),startWorker(u)):(ar(Gt),0<Fe||fr||(fr=!0,u.calledRun=!0,Se||(y||ar(ze),c(u),y||ar(De)))))}return u.___start_em_js=873286,u.___stop_em_js=873508,u.stackSave=()=>zn(),u.stackRestore=s=>yr(s),u.stackAlloc=s=>Pn(s),u.UTF8ToString=Ee,u.stringToUTF8=Ot,u.lengthBytesUTF8=gn,yt=function s(){fr||Hi(),fr||(yt=s)},Hi(),h}),wp=xa;globalThis.self?.name==="em-pthread"&&xa()});var Mt,vp,_p,$p,Ca,Aa,xp,Ta,qt=U(()=>{"use strict";Ar();Mt=!1?void 0:import.meta.url??(typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0),vp=!1||typeof location>"u"?void 0:location.origin,_p=(e,t)=>{try{let r=t??Mt;return(r?new URL(e,r):new URL(e)).origin===vp}catch{return!1}},$p=async e=>{let r=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},Ca=($a(),br(_a)).default,Aa=async()=>{if(!Mt)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(_p(Mt))return[void 0,Ca()];let e=await $p(Mt);return[e,Ca(e)]},xp=(Ia(),br(Sa)).default,Ta=async(e,t,r)=>[void 0,xp]});var Wn,Hn,Rr,ka,Sp,Ip,Tr,Ce,St=U(()=>{"use strict";qt();Hn=!1,Rr=!1,ka=!1,Sp=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Ip=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Tr=async e=>{if(Hn)return Promise.resolve();if(Rr)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(ka)throw new Error("previous call to 'initializeWebAssembly()' failed.");Rr=!0;let t=e.initTimeout,r=e.numThreads;if(!Ip())throw new Error("WebAssembly SIMD is not supported in the current environment.");let n=Sp();r>1&&!n&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let o=e.wasmPaths,i=typeof o=="string"?o:void 0,a=o?.mjs,d=a?.href??a,l=o?.wasm,c=l?.href??l,m=e.wasmBinary,[u,h]=await Ta(d,i,r>1),w=!1,g=[];if(t>0&&g.push(new Promise(y=>{setTimeout(()=>{w=!0,y()},t)})),g.push(new Promise((y,x)=>{let $={numThreads:r};m?$.wasmBinary=m:(c||i)&&($.locateFile=(_,S)=>c??(i??S)+_),h($).then(_=>{Rr=!1,Hn=!0,Wn=_,y(),u&&URL.revokeObjectURL(u)},_=>{Rr=!1,ka=!0,x(_)})})),await Promise.race(g),w)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Ce=()=>{if(Hn&&Wn)return Wn;throw new Error("WebAssembly is not initialized yet.")}});var Te,Kt,_e,Mr=U(()=>{"use strict";St();Te=(e,t)=>{let r=Ce(),n=r.lengthBytesUTF8(e)+1,o=r._malloc(n);return r.stringToUTF8(e,o,n),t.push(o),o},Kt=(e,t,r,n)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([o,i])=>{let a=t?t+o:o;if(typeof i=="object")Kt(i,a+".",r,n);else if(typeof i=="string"||typeof i=="number")n(a,i.toString());else if(typeof i=="boolean")n(a,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},_e=e=>{let t=Ce(),r=t.stackSave();try{let n=t.stackAlloc(8);t._OrtGetLastError(n,n+4);let o=t.HEAP32[n/4],i=t.HEAPU32[n/4+1],a=i?t.UTF8ToString(i):"";throw new Error(`${e} ERROR_CODE: ${o}, ERROR_MESSAGE: ${a}`)}finally{t.stackRestore(r)}}});var Ea,Pa=U(()=>{"use strict";St();Mr();Ea=e=>{let t=Ce(),r=0,n=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let i=0;return e?.tag!==void 0&&(i=Te(e.tag,n)),r=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),r===0&&_e("Can't create run options."),e?.extra!==void 0&&Kt(e.extra,"",new WeakSet,(a,d)=>{let l=Te(a,n),c=Te(d,n);t._OrtAddRunConfigEntry(r,l,c)!==0&&_e(`Can't set a run config entry: ${a} - ${d}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseRunOptions(r),n.forEach(a=>t._free(a)),i}}});var Cp,Ap,Tp,kp,za,Oa=U(()=>{"use strict";St();Mr();Cp=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Ap=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Tp=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},kp=(e,t,r)=>{for(let n of t){let o=typeof n=="string"?n:n.name;switch(o){case"webnn":if(o="WEBNN",typeof n!="string"){let d=n?.deviceType;if(d){let l=Te("deviceType",r),c=Te(d,r);Ce()._OrtAddSessionConfigEntry(e,l,c)!==0&&_e(`Can't set a session config entry: 'deviceType' - ${d}.`)}}break;case"webgpu":if(o="JS",typeof n!="string"){let a=n;if(a?.preferredLayout){if(a.preferredLayout!=="NCHW"&&a.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${a.preferredLayout}`);let d=Te("preferredLayout",r),l=Te(a.preferredLayout,r);Ce()._OrtAddSessionConfigEntry(e,d,l)!==0&&_e(`Can't set a session config entry: 'preferredLayout' - ${a.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let i=Te(o,r);Ce()._OrtAppendExecutionProvider(e,i)!==0&&_e(`Can't append execution provider: ${o}.`)}},za=e=>{let t=Ce(),r=0,n=[],o=e||{};Tp(o);try{let i=Cp(o.graphOptimizationLevel??"all"),a=Ap(o.executionMode??"sequential"),d=typeof o.logId=="string"?Te(o.logId,n):0,l=o.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log serverity level is not valid: ${l}`);let c=o.logVerbosityLevel??0;if(!Number.isInteger(c)||c<0||c>4)throw new Error(`log verbosity level is not valid: ${c}`);let m=typeof o.optimizedModelFilePath=="string"?Te(o.optimizedModelFilePath,n):0;if(r=t._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,a,!!o.enableProfiling,0,d,l,c,m),r===0&&_e("Can't create session options."),o.executionProviders&&kp(r,o.executionProviders,n),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let u=Te("enableGraphCapture",n),h=Te(o.enableGraphCapture.toString(),n);t._OrtAddSessionConfigEntry(r,u,h)!==0&&_e(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[u,h]of Object.entries(o.freeDimensionOverrides)){if(typeof u!="string")throw new Error(`free dimension override name must be a string: ${u}`);if(typeof h!="number"||!Number.isInteger(h)||h<0)throw new Error(`free dimension override value must be a non-negative integer: ${h}`);let w=Te(u,n);t._OrtAddFreeDimensionOverride(r,w,h)!==0&&_e(`Can't set a free dimension override: ${u} - ${h}.`)}return o.extra!==void 0&&Kt(o.extra,"",new WeakSet,(u,h)=>{let w=Te(u,n),g=Te(h,n);t._OrtAddSessionConfigEntry(r,w,g)!==0&&_e(`Can't set a session config entry: ${u} - ${h}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseSessionOptions(r),n.forEach(a=>t._free(a)),i}}});var Gn,ht,Yt,Ur,Xt,Vr,Ln,Z=U(()=>{"use strict";Gn=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},ht=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Yt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],n=typeof t=="number"?t:t.reduce((o,i)=>o*i,1);return r>0?Math.ceil(n*r):void 0},Ur=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Xt=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Vr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Ln=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;default:throw new Error(`unsupported data location: ${e}`)}}});var Zt,Fn=U(()=>{"use strict";Ar();Zt=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=Dn("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=Dn("node:fs"),n=r(e),o=[];for await(let i of n)o.push(i);return new Uint8Array(Buffer.concat(o))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let o=t.body.getReader(),i;try{i=new ArrayBuffer(n)}catch(d){if(d instanceof RangeError){let l=Math.ceil(n/65536);i=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw d}let a=0;for(;;){let{done:d,value:l}=await o.read();if(d)break;let c=l.byteLength;new Uint8Array(i,a,c).set(l),a+=c}return new Uint8Array(i,0,n)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var Ep,Pp,Da,Ba,Ra,zp,we,dt=U(()=>{"use strict";Z();Ep=["V","I","W","E","F"],Pp=(e,t)=>{console.log(`[${Ep[e]},${new Date().toISOString()}]${t}`)},Ra=(e,t)=>{Da=e,Ba=t},zp=(e,t)=>{let r=Xt(e),n=Xt(Da);r>=n&&Pp(r,typeof t=="function"?t():t)},we=(...e)=>{Ba&&zp(...e)}});var Ma,Ua=U(()=>{"use strict";Z();Ma=(e,t)=>new(Ur(t))(e)});var Nr=U(()=>{"use strict"});var Va,qn,jn,Op,Dp,Na,Yn,Kn,Ha,Ga=U(()=>{"use strict";dt();Nr();Va=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),qn=[],jn=e=>Math.ceil(e/16)*16,Op=e=>{for(let t=0;t<qn.length;t++){let r=qn[t];if(e<=r)return r}return Math.ceil(e/16)*16},Dp=1,Na=()=>Dp++,Yn=async(e,t,r,n)=>{let o=jn(r),i=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=e.getCommandEncoder();e.endComputePass(),a.copyBufferToBuffer(t,0,i,0,o),e.flush(),await i.mapAsync(GPUMapMode.READ);let d=i.getMappedRange();if(n){let l=n();return l.set(new Uint8Array(d,0,r)),l}else return new Uint8Array(d.slice(0,r))}finally{i.destroy()}},Kn=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersForUploadingPending=[],this.buffersPending=[],this.externalBuffers=new Map,this.capturedPendingBuffers=new Map;for(let[r]of Va)qn.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[])}upload(t,r){let n=r.buffer,o=r.byteOffset,i=r.byteLength,a=jn(i),d=this.storageCache.get(t);if(!d)throw new Error("gpu data for uploading does not exist");if(d.originalSize!==i)throw new Error(`inconsistent data size. gpu data size=${d.originalSize}, data size=${i}`);let l=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),c=l.getMappedRange();new Uint8Array(c).set(new Uint8Array(n,o,i)),l.unmap();let m=this.backend.getCommandEncoder();this.backend.endComputePass(),m.copyBufferToBuffer(l,0,d.gpuData.buffer,0,a),we("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`),this.buffersForUploadingPending.push(l)}memcpy(t,r){let n=this.storageCache.get(t);if(!n)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=jn(n.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(n.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(t,r,n){let o;if(n){if(o=this.externalBuffers.get(n),o===void 0)throw new Error("previous buffer is not registered");if(t===n)return we("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`);this.externalBuffers.delete(n)}else o=Na();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:t},originalSize:r}),this.externalBuffers.set(t,o),we("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(t){let r=this.externalBuffers.get(t);r!==void 0&&(this.storageCache.delete(r),this.externalBuffers.delete(t),we("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${r}`))}create(t,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=Op(t),o,i=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let c=(i?this.freeBuffers:this.freeUniformBuffers).get(n);c?c.length>0?o=c.pop():o=this.backend.device.createBuffer({size:n,usage:r}):o=this.backend.device.createBuffer({size:n,usage:r})}else o=this.backend.device.createBuffer({size:n,usage:r});let d={id:Na(),type:0,buffer:o};return this.storageCache.set(d.id,{gpuData:d,originalSize:t}),we("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${d.id}`),d}get(t){return this.storageCache.get(t)?.gpuData}release(t){let r=this.storageCache.get(t);if(!r)throw new Error("releasing data does not exist");return we("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(t,r){let n=this.storageCache.get(t);if(!n)throw new Error("data does not exist");await Yn(this.backend,n.gpuData.buffer,n.originalSize,r)}refreshPendingBuffers(){for(let t of this.buffersForUploadingPending)t.destroy();if(this.buffersForUploadingPending=[],this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let r=Va.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let r of this.buffersPending)t.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onReleaseSession(t){let r=this.capturedPendingBuffers.get(t);r&&(r.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(t))}},Ha=(...e)=>new Kn(...e)});var Xn,J,Ie=U(()=>{"use strict";Xn=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},J=e=>new Xn(e)});var Zn,tt,k,It,Wr,La,Fa,ee=U(()=>{"use strict";Zn=class{static calcMatMulShape(t,r){return t[1]!==r[0]?void 0:[t[0],r[1]]}},tt=class{static calcShape(t,r,n=!1){let o=t.length,i=r.length;if(o===0)return r;if(i===0)return t;let a=Math.max(t.length,r.length),d=new Array(a);if(n){if(o<2||i<2)return;let l=Zn.calcMatMulShape([t[o-2],t[o-1]],[r[i-2],r[i-1]]);if(l===void 0)return;[d[a-2],d[a-1]]=l}for(let l=n?3:1;l<=a;l++){let c=o-l<0?1:t[o-l],m=i-l<0?1:r[i-l];if(c!==m&&c>1&&m>1)return;let u=Math.max(c,m);if(c&&m)d[a-l]=Math.max(c,m);else{if(u>1)return;d[a-l]=0}}return d}static isValidBroadcast(t,r){let n=t.length,o=r.length;if(n>o)return!1;for(let i=1;i<=n;i++)if(t[n-i]!==1&&t[n-i]!==r[o-i])return!1;return!0}},k=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let n=t.length;if(n===0)return[];let o=new Array(n),i=n-1;for(;i>=0;){if(t[i]%r===0){o[i]=t[i]/r;break}if(r%t[i]!==0)throw new Error("cannot convert shape");o[i]=1,r/=t[i],i--}for(i--;i>=0;i--)o[i]=t[i];return o}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,n){let o=1;for(let i=r;i<n;i++){if(t[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=t[i]}return o}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let n=new Array(r);n[r-1]=1,n[r-2]=t[r-1];for(let o=r-3;o>=0;--o)n[o]=n[o+1]*t[o+1];return n}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(n=>this.normalizeAxis(n,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(n=>t[n]):t.slice().reverse()}static padShape(t,r){let n=t.length;return t.map((o,i)=>o+r[i]+r[i+n])}static areEqual(t,r){return t.length!==r.length?!1:t.every((n,o)=>n===r[o])}},It=class e{static adjustPoolAttributes(t,r,n,o,i,a){if(!t&&n.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let d=0;d<r.length-2;d++)d>=n.length?n.push(r[d+2]):n[d]=r[d+2];for(let d=0;d<n.length;d++)if(d<o.length){if(o[d]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let d=0;d<n.length;d++)if(d<i.length){if(i[d]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let d=0;d<n.length*2;d++)if(d<a.length){if(a[d]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let d=0;d<n.length;d++){if(n[d]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[d]>=n[d]||a[d+n.length]>=n[d])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,o,i,a,d){if(d){if(i.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)e.adjustPadAndReturnShape(t[l+(a?1:2)],r[l],n[l],o[l],i,l,l+t.length-2,d)}}static computePoolOutputShape(t,r,n,o,i,a,d){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let l=[r[0],r[1]];return e.computeShapeHelper(t,r,l,n,o,i,a,d),l}static computeConvOutputShape(t,r,n,o,i,a,d){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],r[0]];return e.computeShapeHelper(!1,t,l,n,o,i,a,d),l}static computeShapeHelper(t,r,n,o,i,a,d,l){if(t)for(let c=0;c<r.length-2;c++)n.push(1);else for(let c=0;c<r.length-2;c++)n.push(e.adjustPadAndReturnShape(r[c+2],o[c],i[c],a[c],d,c,c+r.length-2,l))}static adjustPadAndReturnShape(t,r,n,o,i,a,d,l){let c=n*(o-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return i[a]=0,i[d]=0,Math.floor((t-c)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(n!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let u=((t+r-1)/r-1)*r+o-t;return i[a]=Math.floor(l==="SAME_LOWER"?(u+1)/2:u/2),i[d]=u-i[a],Math.floor((t+u-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+i[a]+i[d]-c)/r+1)}},Wr=class{static getShapeOfGemmResult(t,r,n,o,i){if(t.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let a,d,l;r?(a=t[1],d=t[0]):(a=t[0],d=t[1]);let c=-1;if(o?(l=n[0],c=1):(l=n[1],c=0),n[c]!==d)throw new Error("dimension mismatch");if(a<=0||l<=0||d<=0)throw new Error("invalid shape specified");if(i&&!tt.isValidBroadcast(i,[a,l]))throw new Error("gemm: invalid bias shape for broadcast");return[a,l,d]}},La=-34028234663852886e22,Fa=34028234663852886e22});var Ct,Jn,ge,ke,V,ve,gt,At,Xe,L,eo,E,R,Hr,Qn,qa,Vt,re=U(()=>{"use strict";Z();ee();Ct=64,Jn=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(e){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},ge=(e,t=1)=>{let r=Jn(e,t);return typeof r=="string"?r:r[0]},ke=(e,t=1)=>{let r=Jn(e,t);return typeof r=="string"?r:r[1]},V=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:k.computeStrides(r)})}),t},ve=e=>e%4===0?4:e%2===0?2:1,gt=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,At=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,Xe=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,L=(e,t,r,n)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?n==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:n==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,eo=(e,t,r,n,o)=>{let i=typeof r=="number",a=i?r:r.length,d=[...new Array(a).keys()],l=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,c=Jn(t,o),m=typeof c=="string"?c:c[1],u=typeof c=="string"?c:c[0],h={indices:l,value:m,storage:u,tensor:t},w=M=>typeof M=="string"?M:`${M}u`,g={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},y=i?"uniforms.":"",x=`${y}${e}_shape`,$=`${y}${e}_strides`,_="";for(let M=0;M<a-1;M++)_+=`
    let dim${M} = current / ${L($,M,a)};
    let rest${M} = current % ${L($,M,a)};
    indices[${M}] = dim${M};
    current = rest${M};
    `;_+=`indices[${a-1}] = current;`;let S=a<2?"":`
  fn o2i_${e}(offset: u32) -> ${h.indices} {
    var indices: ${h.indices};
    var current = offset;
    ${_}
    return indices;
  }`,I=M=>(g.offsetToIndices=!0,a<2?M:`o2i_${e}(${M})`),A=[];if(a>=2)for(let M=a-1;M>=0;M--)A.push(`${L($,M,a)} * (indices[${M}])`);let T=a<2?"":`
  fn i2o_${e}(indices: ${h.indices}) -> u32 {
    return ${A.join("+")};
  }`,O=M=>(g.indicesToOffset=!0,a<2?M:`i2o_${e}(${M})`),B=(...M)=>a===0?"0u":`${h.indices}(${M.map(w).join(",")})`,N=(M,F)=>a<2?`${M}`:`${L(M,F,a)}`,H=(M,F,fe)=>a<2?`${M}=${fe};`:`${L(M,F,a)}=${fe};`,K={},X=(M,F)=>{g.broadcastedIndicesToOffset=!0;let fe=`${F.name}broadcastedIndicesTo${e}Offset`;if(fe in K)return`${fe}(${M})`;let Re=[];for(let Se=a-1;Se>=0;Se--){let Ae=F.indicesGet("outputIndices",Se+F.rank-a);Re.push(`${N($,Se)} * (${Ae} % ${N(x,Se)})`)}return K[fe]=`fn ${fe}(outputIndices: ${F.type.indices}) -> u32 {
             return ${Re.length>0?Re.join("+"):"0u"};
           }`,`${fe}(${M})`},ne=(M,F)=>(()=>{if(h.storage===h.value)return`${e}[${M}]=${F};`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`${e}[${M}]=vec2<u32>(u32(${F}), select(0u, 0xFFFFFFFFu, ${F} < 0));`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`${e}[${M}]=vec2<u32>(u32(${F}), 0u);`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`${e}[${M}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${F}));`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),oe=M=>(()=>{if(h.storage===h.value)return`${e}[${M}]`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`i32(${e}[${M}].x)`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`u32(${e}[${M}].x)`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${M}] & 0xFFu), bool(${e}[${M}] & 0xFF00u), bool(${e}[${M}] & 0xFF0000u), bool(${e}[${M}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),le=a<2?"":`
  fn get_${e}ByIndices(indices: ${h.indices}) -> ${m} {
    return ${oe(`i2o_${e}(indices)`)};
  }`,Y=a<2?"":(()=>{let M=d.map(fe=>`d${fe}: u32`).join(", "),F=d.map(fe=>`d${fe}`).join(", ");return`
  fn get_${e}(${M}) -> ${m} {
    return get_${e}ByIndices(${B(F)});
  }`})(),pe=(...M)=>{if(M.length!==a)throw new Error(`indices length must be ${a}`);let F=M.map(w).join(",");return a===0?oe("0u"):a===1?oe(F[0]):(g.get=!0,g.getByIndices=!0,g.indicesToOffset=!0,`get_${e}(${F})`)},ce=M=>a<2?oe(M):(g.getByIndices=!0,g.indicesToOffset=!0,`get_${e}ByIndices(${M})`),Q=a<2?"":`
  fn set_${e}ByIndices(indices: ${h.indices}, value: ${m}) {
    ${ne(`i2o_${e}(indices)`,"value")}
  }`,be=a<2?"":(()=>{let M=d.map(fe=>`d${fe}: u32`).join(", "),F=d.map(fe=>`d${fe}`).join(", ");return`
  fn set_${e}(${M}, value: ${m}) {
    set_${e}ByIndices(${B(F)}, value);
  }`})();return{impl:()=>{let M=[],F=!1;return g.offsetToIndices&&(M.push(S),F=!0),g.indicesToOffset&&(M.push(T),F=!0),g.broadcastedIndicesToOffset&&(Object.values(K).forEach(fe=>M.push(fe)),F=!0),g.set&&(M.push(be),F=!0),g.setByIndices&&(M.push(Q),F=!0),g.get&&(M.push(Y),F=!0),g.getByIndices&&(M.push(le),F=!0),!i&&F&&M.unshift(`const ${x} = ${h.indices}(${r.join(",")});`,`const ${$} = ${h.indices}(${k.computeStrides(r).join(",")});`),M.join(`
`)},type:h,offsetToIndices:I,indicesToOffset:O,broadcastedIndicesToOffset:X,indices:B,indicesGet:N,indicesSet:H,set:(...M)=>{if(M.length!==a+1)throw new Error(`indices length must be ${a}`);let F=M[a];if(typeof F!="string")throw new Error("value must be string");let fe=M.slice(0,a).map(w).join(",");return a===0?ne("0u",F):a===1?ne(fe[0],F):(g.set=!0,g.setByIndices=!0,g.indicesToOffset=!0,`set_${e}(${fe}, ${F})`)},setByOffset:ne,setByIndices:(M,F)=>a<2?ne(M,F):(g.setByIndices=!0,g.indicesToOffset=!0,`set_${e}ByIndices(${M}, ${F});`),get:pe,getByOffset:oe,getByIndices:ce,usage:n,name:e,strides:$,shape:x,rank:a}},E=(e,t,r,n=1)=>eo(e,t,r,"input",n),R=(e,t,r,n=1)=>eo(e,t,r,"output",n),Hr=(e,t,r,n=1)=>eo(e,t,r,"internal",n),Qn=class{constructor(t,r){this.normalizedDispatchGroup=t;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=Ct){let r=typeof t=="number"?t:t[0],n=typeof t=="number"?1:t[1],o=typeof t=="number"?1:t[2];if(r>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*n*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,d=i?`let global_idx = global_id.x;
         let local_idx = local_id.x;
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
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[t(r.type),r.length??1])}},qa=(e,t)=>new Qn(e,t),Vt=(e,t)=>{let r=e.length,n=[];for(let o=0;o<r;o++){let i=r-1-o,a=e[i]||1;(t[t.length-1-o]||1)>1&&a===1&&n.unshift(i)}return n}});var Bp,ja,Rp,Mp,Up,Ue,Ka,Ya,Tt=U(()=>{"use strict";Z();ee();Ie();re();Bp=e=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.")},ja=(e,t)=>t&&t.length!==e?[...new Array(e).keys()].reverse():t,Rp=(e,t)=>k.sortBasedOnPerm(e,ja(e.length,t)),Mp=(e,t,r,n)=>{let o=[];o.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<t;++i)o.push(r.indicesSet("a",e[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},Up=(e,t)=>{let r=[],n=[];for(let o=0;o<e.length;++o)e[o]!==1&&r.push(e[o]),e[t[o]]!==1&&n.push(t[o]);return{newShape:r,newPerm:n}},Ue=(e,t)=>{let r=e.dataType,n=e.dims.length,o=ja(n,t),i=Rp(e.dims,o),{newShape:a,newPerm:d}=Up(e.dims,o),l=k.areEqual(d,[2,3,1]),c=k.areEqual(d,[3,1,2]),m=a.length===2&&d[0]>d[1]||l||c,u=m?a:e.dims,h=i;m&&(u=l?[a[0],a[1]*a[2]]:c?[a[0]*a[1],a[2]]:a,h=[u[1],u[0]]);let w=E("a",r,u.length),g=R("output",r,h.length),y=16,x;return m?x=$=>`
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
  }`:x=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(w,g)}

  ${Mp(o,n,w,g)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${g.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${g.setByOffset("global_idx",w.getByIndices("aIndices"))}
  }`,{name:m?"TransposeShared":"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let $=k.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:m?{x:Math.ceil(h[1]/y),y:Math.ceil(h[0]/y)}:{x:Math.ceil($/64)},programUniforms:[{type:12,data:$},...V(u,h)]}},getShaderSource:x}},Ka=(e,t)=>{Bp(e.inputs),e.compute(Ue(e.inputs[0],t.perm))},Ya=e=>J({perm:e.perm})});var Vp,Np,Wp,Hp,Gp,Lp,Fp,qp,jp,Kp,rt,Xa,Za,Qa,Ja,es,ts,rs,ns,os,is,as=U(()=>{"use strict";Z();ee();re();Gr();Tt();Vp={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Np={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Wp={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Hp={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Gp=(e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r},Lp=(e,t)=>{let r=[],n=e.length;for(let i=0;i<n;i++)t.indexOf(i)===-1&&r.push(e[i]);let o=t.map(i=>e[i]);return[r,o]},Fp=(e,t)=>{let r=e.length+t.length,n=[],o=0;for(let i=0;i<r;i++)t.indexOf(i)===-1?n.push(e[o++]):n.push(1);return n},qp=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},jp=(e,t)=>{let r=[];if(!qp(e,t)){for(let n=0;n<t;++n)e.indexOf(n)===-1&&r.push(n);e.forEach(n=>r.push(n))}return r},Kp=(e,t,r,n,o,i,a)=>{let d=r[0].dims,l=k.size(i),c=k.size(a),m=E("_A",r[0].dataType,d),u=R("output",o,i),h=32,w=`
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

          var bestValue = f32(${Wp[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${h}) {
           let candidate = f32(${m.getByOffset("offset + k")});
           bestValue = ${Vp[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${h}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Np[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${u.setByOffset("outputIndex",`${n==="mean"?`${u.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${u.type.storage}(${Hp[n]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:l},programUniforms:[{type:12,data:c}]})}},rt=(e,t,r,n)=>{let o=e.inputs.length===1?r:to(e.inputs,r),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=e.inputs[0].dims.map((w,g)=>g));let a=k.normalizeAxes(i,e.inputs[0].dims.length),d=a,l=e.inputs[0],c=jp(d,e.inputs[0].dims.length);c.length>0&&(l=e.compute(Ue(e.inputs[0],c),{inputs:[0],outputs:[-1]})[0],d=Gp(d.length,l.dims.length));let[m,u]=Lp(l.dims,d),h=m;o.keepDims&&(h=Fp(m,a)),e.compute(Kp(t,{hint:o.cacheKey,inputDependencies:["type"]},[l],n,e.inputs[0].dataType,h,u),{inputs:[l]})},Xa=(e,t)=>{rt(e,"ReduceMeanShared",t,"mean")},Za=(e,t)=>{rt(e,"ReduceL1Shared",t,"l1")},Qa=(e,t)=>{rt(e,"ReduceL2Shared",t,"l2")},Ja=(e,t)=>{rt(e,"ReduceLogSumExpShared",t,"logSumExp")},es=(e,t)=>{rt(e,"ReduceMaxShared",t,"max")},ts=(e,t)=>{rt(e,"ReduceMinShared",t,"min")},rs=(e,t)=>{rt(e,"ReduceProdShared",t,"prod")},ns=(e,t)=>{rt(e,"ReduceSumShared",t,"sum")},os=(e,t)=>{rt(e,"ReduceSumSquareShared",t,"sumSquare")},is=(e,t)=>{rt(e,"ReduceLogSumShared",t,"logSum")}});var nt,Yp,Lr,to,ot,Xp,Zp,Qp,Jp,em,tm,rm,nm,om,im,it,ss,us,ds,ls,cs,ps,ms,fs,hs,gs,Gr=U(()=>{"use strict";Z();ee();Ie();re();as();nt=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},Yp=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Lr=(e,t,r,n,o,i,a=!1,d=!1)=>{let l=[],c=r[0].dims,m=c.length,u=k.normalizeAxes(o,m),h=!d&&u.length===0;c.forEach((x,$)=>{h||u.indexOf($)>=0?a&&l.push(1):l.push(x)});let w=l.length,g=k.size(l);return{name:e,shaderCache:t,getShaderSource:x=>{let $=[],_=E("_A",r[0].dataType,m),S=R("output",i,w),I=n(_,S,u),A=I[2];for(let T=0,O=0;T<m;T++)h||u.indexOf(T)>=0?(a&&O++,A=`for(var j${T}: u32 = 0; j${T} < ${c[T]}; j${T}++) {
                  ${I[2].includes("last_index")?`let last_index = j${T};`:""}
                  ${_.indicesSet("input_indices",T,`j${T}`)}
                  ${A}
                }`):($.push(`${_.indicesSet("input_indices",T,S.indicesGet("output_indices",O))};`),O++);return`

        ${x.registerUniform("output_size","u32").declareVariables(_,S)}

        ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${_.type.indices};
          let output_indices = ${S.offsetToIndices("global_idx")};

          ${$.join(`
`)}
          ${I[0]}       // init ops for reduce max/min
          ${I[1]}
          ${A}
          ${I[3]}
          ${I.length===4?S.setByOffset("global_idx","value"):I.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:i}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},...V(c,l)]})}},to=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),J({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},ot=(e,t,r,n)=>{let o=e.inputs,i=o.length===1?r:to(o,r);e.compute(Lr(t,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?Yp:n,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},Xp=(e,t)=>{nt(e.inputs),ot(e,"ReduceLogSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},Zp=(e,t)=>{nt(e.inputs),ot(e,"ReduceL1",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},Qp=(e,t)=>{nt(e.inputs),ot(e,"ReduceL2",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Jp=(e,t)=>{nt(e.inputs),ot(e,"ReduceLogSumExp",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},em=(e,t)=>{nt(e.inputs),ot(e,"ReduceMax",t,(n,o,i)=>{let a=[];for(let d=0;d<n.rank;d++)(i.indexOf(d)>=0||i.length===0)&&a.push(n.indicesSet("input_indices",d,0));return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},tm=(e,t)=>{nt(e.inputs),ot(e,"ReduceMean",t,(n,o,i)=>{let a=1;for(let d=0;d<n.rank;d++)(i.indexOf(d)>=0||i.length===0)&&(a*=e.inputs[0].dims[d]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${a});`]})},rm=(e,t)=>{nt(e.inputs),ot(e,"ReduceMin",t,(n,o,i)=>{let a=[];for(let d=0;d<n.rank;d++)(i.indexOf(d)>=0||i.length===0)&&a.push(`input_indices[${d}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},nm=(e,t)=>{nt(e.inputs),ot(e,"ReduceProd",t,(n,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},om=(e,t)=>{nt(e.inputs),ot(e,"ReduceSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},im=(e,t)=>{nt(e.inputs),ot(e,"ReduceSumSquare",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},it=(e,t,r)=>{if(t.length===0)return r;let n=1,o=1;for(let i=0;i<t.length;i++)t.indexOf(i)===-1?n*=e[i]:o*=e[i];return o<32&&n>1024},ss=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?tm(e,t):Xa(e,t)},us=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Zp(e,t):Za(e,t)},ds=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Qp(e,t):Qa(e,t)},ls=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Jp(e,t):Ja(e,t)},cs=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?em(e,t):es(e,t)},ps=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?rm(e,t):ts(e,t)},ms=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?nm(e,t):rs(e,t)},fs=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?om(e,t):ns(e,t)},hs=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?im(e,t):os(e,t)},gs=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Xp(e,t):is(e,t)}});var ys,bs,ws,ro,vs=U(()=>{"use strict";Z();Ie();Gr();ys=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},bs=(e,t)=>{ys(e.inputs);let r=(n,o,i)=>{let a=[];for(let d=0;d<n.rank;d++)(i.indexOf(d)>=0||i.length===0)&&a.push(`input_indices[${d}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Lr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},ws=(e,t)=>{ys(e.inputs);let r=(n,o,i)=>{let a=[];for(let d=0;d<n.rank;d++)(i.indexOf(d)>=0||i.length===0)&&a.push(`input_indices[${d}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Lr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},ro=e=>J(e)});var am,sm,um,dm,Nt,lm,_s,Fr=U(()=>{"use strict";Z();ee();Nr();re();am=(e,t)=>{let r=e[0],n=e[1],o=e[2],i=e[3],a=e[4],d=e[5];if(a&&d)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=r.dims[0],c=r.dims[1],m=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(n.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==m)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==n.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let u=o.dims[0]/3,h=u,w=h;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let S of t.qkvHiddenSizes)if(S%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");u=t.qkvHiddenSizes[0],h=t.qkvHiddenSizes[1],w=t.qkvHiddenSizes[2]}let g=c;if(u!==h)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==u+h+w)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let y=0;if(a){if(h!==w)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==h/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(y=a.dims[3])}let x=g+y,$=-1,_=0;if(i)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(d){if(d.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(d.dims[0]!==l||d.dims[1]!==t.numHeads||d.dims[2]!==c||d.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:c,pastSequenceLength:y,kvSequenceLength:g,totalSequenceLength:x,maxSequenceLength:$,inputHiddenSize:m,hiddenSize:u,vHiddenSize:w,headSize:Math.floor(u/t.numHeads),vHeadSize:Math.floor(w/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:_,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},sm=(e,t,r)=>{let n=ve(r),o=64,i=r/n;i<o&&(o=32);let a=Math.ceil(r/n/o),d=[{type:1,data:1/r},{type:12,data:i},{type:12,data:a}],l=ge(e.dataType,n),c=ke(1,n),m=["type"],u=h=>{let w=R("x",e.dataType,e.dims,n),g=ke(e.dataType),y=[{name:"d_inv",type:"f32"},{name:"d_comp",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
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
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${o};${l};${n}`,inputDependencies:m},getShaderSource:u,getRunData:()=>({outputs:[],dispatchGroup:{x:t},programUniforms:d})}},um=(e,t,r,n,o,i,a,d)=>{let l=d+i.kvSequenceLength,c=[i.batchSize,i.numHeads,i.sequenceLength,l],m=i.kvNumHeads===void 0&&e>1&&n,u=m?[i.batchSize,i.numHeads,l,i.headSize]:void 0,h=a.scale===0?1/Math.sqrt(i.headSize):a.scale,w=ve(i.headSize),g=i.headSize/w,y=12,x={x:Math.ceil(l/y),y:Math.ceil(i.sequenceLength/y),z:i.batchSize*i.numHeads},$=[{type:12,data:i.sequenceLength},{type:12,data:g},{type:12,data:l},{type:12,data:i.numHeads},{type:1,data:h},{type:12,data:d},{type:12,data:i.kvSequenceLength}],_=m&&n&&k.size(n.dims)>0,S=["type","type"];_&&S.push("type"),o&&S.push("type");let I=[{dims:c,dataType:t.dataType,gpuDataType:0}];m&&I.push({dims:u,dataType:t.dataType,gpuDataType:0});let A=T=>{let O=E("q",t.dataType,t.dims,w),B=E("key",r.dataType,r.dims,w),N=[O,B];if(_){let oe=E("past_key",n.dataType,n.dims,w);N.push(oe)}o&&N.push(E("attention_bias",o.dataType,o.dims));let H=R("output",t.dataType,c),K=[H];m&&K.push(R("present_key",t.dataType,u,w));let X=ke(1,w),ne=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"}];return`
  const TILE_SIZE = ${y}u;

  var<workgroup> tileQ: array<${O.type.storage}, ${y*y}>;
  var<workgroup> tileK: array<${O.type.storage}, ${y*y}>;
  ${T.registerUniforms(ne).declareVariables(...N,...K)}
  ${T.mainStart([y,y,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let qOffset = uniforms.M * uniforms.K * headIdx + m * uniforms.K;
    ${(()=>_&&m?`
    let kOffset = uniforms.kv_sequence_length * uniforms.K * headIdx;
    let pastKeyOffset = uniforms.past_sequence_length * uniforms.K * headIdx;`:`
    let kOffset = uniforms.N * uniforms.K * headIdx + n * uniforms.K;`)()}
    ${m?"let presentKeyOffset = headIdx * uniforms.N * uniforms.K;":""}
    var value = ${X}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${(()=>_&&m?`
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
        value += ${X}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    let headOffset = headIdx * uniforms.M * uniforms.N;
    if (global_id.y < uniforms.M && global_id.x < uniforms.N) {
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(w){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${w}`)}})()};
        output[outputIdx] = ${H.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${w};${o!==void 0};${n!==void 0};${e}`,inputDependencies:S},getRunData:()=>({outputs:I,dispatchGroup:x,programUniforms:$}),getShaderSource:A}},dm=(e,t,r,n,o,i)=>{let a=i+o.kvSequenceLength,d=o.nReps?o.nReps:1,l=o.vHiddenSize*d,c=o.kvNumHeads==null&&e>1&&n,m=c?[o.batchSize,o.numHeads,a,o.headSize]:void 0,u=[o.batchSize,o.sequenceLength,l],h=12,w={x:Math.ceil(o.vHeadSize/h),y:Math.ceil(o.sequenceLength/h),z:o.batchSize*o.numHeads},g=[{type:12,data:o.sequenceLength},{type:12,data:a},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:l},{type:12,data:i},{type:12,data:o.kvSequenceLength}],y=c&&n&&k.size(n.dims)>0,x=["type","type"];y&&x.push("type");let $=[{dims:u,dataType:t.dataType,gpuDataType:0}];c&&$.push({dims:m,dataType:t.dataType,gpuDataType:0});let _=S=>{let I=E("probs",t.dataType,t.dims),A=E("v",r.dataType,r.dims),T=[I,A];y&&T.push(E("past_value",n.dataType,n.dims));let B=[R("output",t.dataType,u)];c&&B.push(R("present_value",t.dataType,m));let N=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"}];return`
  const TILE_SIZE = ${h}u;
  var<workgroup> tileQ: array<${I.type.value}, ${h*h}>;
  var<workgroup> tileK: array<${I.type.value}, ${h*h}>;
  ${S.registerUniforms(N).declareVariables(...T,...B)}
  ${S.mainStart([h,h,1])}
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
   var value = ${I.type.storage}(0);
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${n!==void 0};${e}`,inputDependencies:x},getRunData:()=>({outputs:$,dispatchGroup:w,programUniforms:g}),getShaderSource:_}},Nt=(e,t,r,n,o,i,a,d,l,c,m)=>{let u=Math.min(e.outputCount,1+(a?1:0)+(d?1:0)),h=c.kvNumHeads!==void 0||u>1?c.pastSequenceLength:0,w=h+c.kvSequenceLength,g=l&&k.size(l.dims)>0?l:void 0,y=[t,r];c.kvNumHeads===void 0&&u>1&&a&&k.size(a.dims)>0&&y.push(a),g&&y.push(g);let x=e.compute(um(u,t,r,a,g,c,m,h),{inputs:y,outputs:c.kvNumHeads===void 0&&u>1?[-1,1]:[-1]})[0];e.compute(sm(x,c.batchSize*c.numHeads*c.sequenceLength,w),{inputs:[x],outputs:[]});let $=[x,n];c.kvNumHeads===void 0&&u>1&&d&&k.size(d.dims)>0&&$.push(d),e.compute(dm(u,x,n,d,c,h),{inputs:$,outputs:c.kvNumHeads===void 0&&u>1?[0,2]:[0]})},lm=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],n=t.sequenceLength,o=t.inputHiddenSize,i=t.headSize,a=12,d={x:Math.ceil(t.headSize/a),y:Math.ceil(t.sequenceLength/a),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],c=[{type:12,data:n},{type:12,data:o},{type:12,data:i},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],m=u=>{let h=R("output_q",l[0].dataType,r),w=R("output_k",l[0].dataType,r),g=R("output_v",l[0].dataType,r),y=E("input",l[0].dataType,l[0].dims),x=E("weight",l[1].dataType,l[1].dims),$=E("bias",l[2].dataType,l[2].dims),_=y.type.storage,S=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${_}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${_}, ${a*a}>;
  var<workgroup> tileWeightK: array<${_}, ${a*a}>;
  var<workgroup> tileWeightV: array<${_}, ${a*a}>;
  ${u.registerUniforms(S).declareVariables(y,x,$,h,w,g)}
  ${u.mainStart([a,a,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${_}(0);
    var valueK = ${_}(0);
    var valueV = ${_}(0);
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:d,programUniforms:c}),getShaderSource:m},{inputs:l,outputs:[-1,-1,-1]})},_s=(e,t)=>{let r=am(e.inputs,t),[n,o,i]=lm(e,r);return Nt(e,n,o,i,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r,t)}});var cm,pm,mm,$s,xs=U(()=>{"use strict";Ke();Z();ee();Ie();re();cm=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(n,o,i)=>{let a=o.length;if(a!==n.length)throw new Error(`${i}: num dimensions != ${a}`);o.forEach((d,l)=>{if(d!==n[l])throw new Error(`${i}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let n=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},pm=(e,t)=>{let{epsilon:r,spatial:n,format:o}=t,i=e[0].dims,a=n?ve(i[i.length-1]):1,d=o==="NHWC"&&i.length>1?a:1,l=k.size(i)/a,c=n,m=c?i.length:i,u=E("x",e[0].dataType,e[0].dims,a),h=E("scale",e[1].dataType,e[1].dims,d),w=E("bias",e[2].dataType,e[2].dims,d),g=E("inputMean",e[3].dataType,e[3].dims,d),y=E("inputVar",e[4].dataType,e[4].dims,d),x=R("y",e[0].dataType,m,a),$=()=>{let S="";if(n)S=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${a}`:"outputIndices[1]"};`;else if(o==="NCHW")S=`
            ${x.indicesSet("outputIndices","0","0")}
            let cOffset = ${x.indicesToOffset("outputIndices")};`;else{S=`var cIndices = ${h.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let I=1;I<h.rank;I++)S+=`cIndices[${I}] = outputIndices[${I}];`;S+=`let cOffset = ${h.indicesToOffset("cIndices")};`}return S},_=S=>`
  const epsilon = ${r};
  ${S.registerUniform("outputSize","u32").declareVariables(u,h,w,g,y,x)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${x.offsetToIndices(`global_idx * ${a}`)};
    ${$()}
    let scale = ${h.getByOffset("cOffset")};
    let bias = ${w.getByOffset("cOffset")};
    let inputMean = ${g.getByOffset("cOffset")};
    let inputVar = ${y.getByOffset("cOffset")};
    let x = ${u.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${x.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${a}`,inputDependencies:c?["rank","type","type","type","type"]:void 0},getShaderSource:_,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c?[{type:12,data:l},...V(i)]:[{type:12,data:l}]})}},mm=e=>J(e),$s=(e,t)=>{let{inputs:r,outputCount:n}=e,o=mm({...t,outputCount:n});if(ye.webgpu.validateInputContent&&cm(r,o),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(pm(r,o))}});var fm,hm,Ss,Is=U(()=>{"use strict";ee();re();fm=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},hm=e=>{let t=e[0].dims,r=e[0].dims[2],n=k.size(t)/4,o=e[0].dataType,i=E("input",o,t,4),a=E("bias",o,[r],4),d=E("residual",o,t,4),l=R("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:m=>`
  const channels = ${r}u / 4;
  ${m.declareVariables(i,a,d,l)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${i.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${d.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},Ss=e=>{fm(e.inputs),e.compute(hm(e.inputs))}});var gm,me,Cs,As,Ts,ks,Es,Ps,zs,Os,Ds,ym,Bs,Rs,Ms,Us,Qt,Vs,qr,Ns,Ws,Hs,Gs,Ls,Fs,qs,js,Ks,Ys,Xs,Zs,Qs,Js,eu,tu,ru,nu,no,oo,ou,iu,au,bm,wm,su,jr=U(()=>{"use strict";Z();ee();Ie();re();gm=(e,t,r,n,o,i,a)=>{let d=Math.ceil(t/4),l="";typeof o=="string"?l=`${o}(a)`:l=o("a");let c=E("inputData",r,[d],4),m=R("outputData",n,[d],4),u=[{name:"vec_size",type:"u32"}];return a&&u.push(...a),`
      ${e.registerUniforms(u).declareVariables(c,m)}

  ${i??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${c.getByOffset("global_idx")};
    ${m.setByOffset("global_idx",l)}
  }`},me=(e,t,r,n,o,i=e.dataType,a,d)=>{let l=[{type:12,data:Math.ceil(k.size(e.dims)/4)}];return a&&l.push(...a),{name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:c=>gm(c,k.size(e.dims),e.dataType,i,r,n,d),getRunData:c=>({outputs:[{dims:e.dims,dataType:i}],dispatchGroup:{x:Math.ceil(k.size(c[0].dims)/64/4)},programUniforms:l})}},Cs=e=>{e.compute(me(e.inputs[0],"Abs","abs"))},As=e=>{e.compute(me(e.inputs[0],"Acos","acos"))},Ts=e=>{e.compute(me(e.inputs[0],"Acosh","acosh"))},ks=e=>{e.compute(me(e.inputs[0],"Asin","asin"))},Es=e=>{e.compute(me(e.inputs[0],"Asinh","asinh"))},Ps=e=>{e.compute(me(e.inputs[0],"Atan","atan"))},zs=e=>{e.compute(me(e.inputs[0],"Atanh","atanh"))},Os=e=>J(e),Ds=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(me(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},ym=e=>{let t,r,n=e.length>=2&&e[1].data!==0,o=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=n?e[1].getFloat32Array()[0]:-34028234663852886e22,r=o?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=n?e[1].getUint16Array()[0]:64511,r=o?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return J({min:t,max:r})},Bs=(e,t)=>{let r=t||ym(e.inputs),n=ke(e.inputs[0].dataType);e.compute(me(e.inputs[0],"Clip",o=>`clamp(${o}, vec4<${n}>(uniforms.min), vec4<${n}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:n},{name:"max",type:n}]),{inputs:[0]})},Rs=e=>{e.compute(me(e.inputs[0],"Ceil","ceil"))},Ms=e=>{e.compute(me(e.inputs[0],"Cos","cos"))},Us=e=>{e.compute(me(e.inputs[0],"Cosh","cosh"))},Qt=e=>J(e),Vs=(e,t)=>{let r=ke(e.inputs[0].dataType);e.compute(me(e.inputs[0],"Elu",n=>`elu_vf32(${n})`,`
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
}`,Ns=e=>{let t=ke(e.inputs[0].dataType);e.compute(me(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,qr(t)))},Ws=e=>{e.compute(me(e.inputs[0],"Exp","exp"))},Hs=e=>{e.compute(me(e.inputs[0],"Floor","floor"))},Gs=e=>{let t=ke(e.inputs[0].dataType);e.compute(me(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,qr(t)))},Ls=(e,t)=>{let r=ke(e.inputs[0].dataType);e.compute(me(e.inputs[0],"LeakyRelu",n=>`select(leaky_relu_alpha_ * ${n}, ${n}, ${n} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},Fs=e=>{e.compute(me(e.inputs[0],"Not",t=>`!${t}`))},qs=e=>{e.compute(me(e.inputs[0],"Neg",t=>`-${t}`))},js=e=>{e.compute(me(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},Ks=e=>{let t=ke(e.inputs[0].dataType);e.compute(me(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},Ys=e=>{e.compute(me(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Xs=e=>J(e),Zs=(e,t)=>{let r=ke(e.inputs[0].dataType);e.compute(me(e.inputs[0],"HardSigmoid",n=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${n} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},Qs=e=>{e.compute(me(e.inputs[0],"Sin","sin"))},Js=e=>{e.compute(me(e.inputs[0],"Sinh","sinh"))},eu=e=>{e.compute(me(e.inputs[0],"Sqrt","sqrt"))},tu=e=>{e.compute(me(e.inputs[0],"Tan","tan"))},ru=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,nu=e=>{e.compute(me(e.inputs[0],"Tanh",ru))},no=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${ru("v")};
}
`,oo=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,ou=e=>{let t=ke(e.inputs[0].dataType);e.compute(me(e.inputs[0],"FastGelu",oo,no(t),void 0,e.inputs[0].dataType))},iu=(e,t)=>{let r=ke(e.inputs[0].dataType);return e.compute(me(e.inputs[0],"ThresholdedRelu",n=>`select(vec4<${r}>(0.0), ${n}, ${n} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},au=e=>{e.compute(me(e.inputs[0],"Log","log"))},bm=(e,t)=>`
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
`,wm=e=>`quick_gelu_impl(${e})`,su=(e,t)=>{let r=ke(e.inputs[0].dataType);e.compute(me(e.inputs[0],"QuickGelu",wm,bm(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}});var vm,_m,du,lu=U(()=>{"use strict";ee();re();jr();vm=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},_m=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=E("input",e[0].dataType,e[0].dims,4),n=E("bias",e[0].dataType,[e[0].dims[2]],4),o=R("output",e[0].dataType,t,4),i=k.size(t)/4,a=ge(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:l=>`
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
  }`}},du=e=>{vm(e.inputs),e.compute(_m(e.inputs))}});var $m,xm,at,cu,pu,mu,fu,hu,gu,yu,bu,wu,vu,_u=U(()=>{"use strict";Z();ee();re();$m=(e,t,r,n,o,i,a,d,l,c,m,u)=>{let h,w;typeof d=="string"?h=w=(_,S)=>`${d}((${_}),(${S}))`:typeof d=="function"?h=w=d:(h=d.scalar,w=d.vector);let g=R("outputData",m,n.length,4),y=E("aData",l,t.length,4),x=E("bData",c,r.length,4),$;if(o)if(i){let _=k.size(t)===1,S=k.size(r)===1,I=t.length>0&&t[t.length-1]%4===0,A=r.length>0&&r[r.length-1]%4===0;_||S?$=g.setByOffset("global_idx",w(_?`${y.type.value}(${y.getByOffset("0")}.x)`:y.getByOffset("global_idx"),S?`${x.type.value}(${x.getByOffset("0")}.x)`:x.getByOffset("global_idx"))):$=`
            let outputIndices = ${g.offsetToIndices("global_idx * 4u")};
            let offsetA = ${y.broadcastedIndicesToOffset("outputIndices",g)};
            let offsetB = ${x.broadcastedIndicesToOffset("outputIndices",g)};
            ${g.setByOffset("global_idx",w(a||I?y.getByOffset("offsetA / 4u"):`${y.type.value}(${y.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||A?x.getByOffset("offsetB / 4u"):`${x.type.value}(${x.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=g.setByOffset("global_idx",w(y.getByOffset("global_idx"),x.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let _=(S,I,A="")=>{let T=`aData[indexA${I}][componentA${I}]`,O=`bData[indexB${I}][componentB${I}]`;return`
            let outputIndices${I} = ${g.offsetToIndices(`global_idx * 4u + ${I}u`)};
            let offsetA${I} = ${y.broadcastedIndicesToOffset(`outputIndices${I}`,g)};
            let offsetB${I} = ${x.broadcastedIndicesToOffset(`outputIndices${I}`,g)};
            let indexA${I} = offsetA${I} / 4u;
            let indexB${I} = offsetB${I} / 4u;
            let componentA${I} = offsetA${I} % 4u;
            let componentB${I} = offsetB${I} % 4u;
            ${S}[${I}] = ${A}(${h(T,O)});
          `};m===9?$=`
            var data = vec4<u32>(0);
            ${_("data",0,"u32")}
            ${_("data",1,"u32")}
            ${_("data",2,"u32")}
            ${_("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:$=`
            ${_("outputData[global_idx]",0)}
            ${_("outputData[global_idx]",1)}
            ${_("outputData[global_idx]",2)}
            ${_("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(y,x,g)}

        ${u??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},xm=(e,t,r,n,o,i,a=r.dataType)=>{let d=!k.areEqual(r.dims,n.dims),l=r.dims,c=k.size(r.dims),m=!1,u=!1,h=[d];if(d){let w=tt.calcShape(r.dims,n.dims,!1);if(!w)throw new Error("Can't perform binary op on the given tensors");l=w,c=k.size(l);let g=k.size(r.dims)===1,y=k.size(n.dims)===1,x=r.dims.length>0&&r.dims[r.dims.length-1]%4===0,$=n.dims.length>0&&n.dims[n.dims.length-1]%4===0;h.push(g),h.push(y),h.push(x),h.push($);let _=1;for(let S=1;S<l.length;S++){let I=r.dims[r.dims.length-S]??1,A=n.dims[n.dims.length-S]??1;if(I===A)_*=I;else break}_%4===0?(u=!0,m=!0):(g||y||x||$)&&(m=!0)}else m=!0;return h.push(m),{name:e,shaderCache:{hint:t+h.map(w=>w.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:w=>$m(w,r.dims,n.dims,l,m,d,u,o,r.dataType,n.dataType,a,i),getRunData:()=>({outputs:[{dims:l,dataType:a}],dispatchGroup:{x:Math.ceil(c/64/4)},programUniforms:[{type:12,data:Math.ceil(k.size(l)/4)},...V(r.dims,n.dims,l)]})}},at=(e,t,r,n,o,i)=>{e.compute(xm(t,o??"",e.inputs[0],e.inputs[1],r,n,i))},cu=e=>{at(e,"Add",(t,r)=>`${t}+${r}`)},pu=e=>{at(e,"Div",(t,r)=>`${t}/${r}`)},mu=e=>{at(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},fu=e=>{at(e,"Mul",(t,r)=>`${t}*${r}`)},hu=e=>{let t=E("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;at(e,"Pow",{scalar:(n,o)=>`pow_custom(${n},${o})`,vector:(n,o)=>`pow_vector_custom(${n},${o})`},`
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
      `)},gu=e=>{at(e,"Sub",(t,r)=>`${t}-${r}`)},yu=e=>{at(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},bu=e=>{at(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},wu=e=>{at(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},vu=e=>{at(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}});var Im,Cm,Am,Tm,$u,xu,Su=U(()=>{"use strict";Z();ee();Ie();re();Im=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,n=e[r],o=n.dataType,i=n.dims.length;e.forEach((a,d)=>{if(d!==r){if(a.dataType!==o)throw new Error("input tensors should be one type");if(a.dims.length!==i)throw new Error("input tensors should have the same shape");a.dims.forEach((l,c)=>{if(c!==t&&l!==n.dims[c])throw new Error("non concat dimensions must match")})}})},Cm=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Am=(e,t)=>{let r=e.length,n=[];for(let o=0;o<r;++o){let i=t.setByOffset("global_idx",e[o].getByIndices("indices"));r===1?n.push(i):o===0?n.push(`if (inputIndex == ${o}u) { ${i} }`):o===r-1?n.push(`else { ${i} }`):n.push(`else if (inputIndex == ${o}) { ${i} }`)}return n.join(`
`)},Tm=(e,t,r,n)=>{let o=k.size(r),i=new Array(e.length),a=new Array(e.length),d=0,l=[],c=[],m=[{type:12,data:o}];for(let y=0;y<e.length;++y)d+=e[y].dims[t],i[y]=d,c.push(e[y].dims.length),a[y]=E(`input${y}`,n,c[y]),l.push("rank"),m.push({type:12,data:i[y]});for(let y=0;y<e.length;++y)m.push(...V(e[y].dims));m.push(...V(r));let u=R("output",n,r.length),h=u.indicesGet("indices",t),w=Array.from(Array(i.length).keys()).map(y=>`uniforms.sizeInConcatAxis${y}`).join(","),g=y=>`

  ${(()=>{y.registerUniform("outputSize","u32");for(let x=0;x<e.length;x++)y.registerUniform(`sizeInConcatAxis${x}`,"u32");return y.declareVariables(...a,u)})()}

  ${Cm(i.length,w)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${u.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${w});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Am(a,u)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:m}),getShaderSource:g}},$u=(e,t)=>{let r=e.inputs,n=r[0].dims,o=k.normalizeAxis(t.axis,n.length);Im(r,o);let i=n.slice();i[o]=r.reduce((d,l)=>d+(l.dims.length>o?l.dims[o]:0),0);let a=r.filter(d=>k.size(d.dims)>0);e.compute(Tm(a,o,i,r[0].dataType),{inputs:a})},xu=e=>J({axis:e.axis})});var He,Ge,Le,Kr,lt=U(()=>{"use strict";Z();ee();He=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Ge=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Le=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Kr=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,n]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:n}}else if(t==="Clip"){let[r,n]=e?.activation_params||[La,Fa];return{activation:t,clipMax:n,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}});var Pe,Yr,Jt=U(()=>{"use strict";Pe=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Yr=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Xr,io=U(()=>{"use strict";Xr=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var km,Em,er,Iu,Pm,tr,zm,Zr,rr=U(()=>{"use strict";Z();ee();re();lt();Jt();km=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Em=(e,t)=>e?`
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
          ${km(o,n)}
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

          ${Em(o,h)}
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
            `,Pm=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",tr=(e,t,r="f32",n,o=!1,i=32,a=!1,d=32,l=!1)=>{let c=e[1]*t[1],m=e[0]*t[0],u=o?c:i,h=o?i:c;if(!(h%t[1]===0&&u%t[0]===0&&i%t[1]===0))throw new Error(`tileAHight ${h} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${u} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let w=h/t[1],g=u/t[0],y=i/t[1],x=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${c};
    let globalColStart = i32(workgroupId.x) * ${m};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${u}; inputCol = inputCol + ${t[0]}) {
          ${Iu(o,n)}
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
      ${Iu(o,n)}
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
      ${Pm(o)}
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
`},zm=(e,t,r,n,o,i=!1)=>{let[a,d,l]=o,[c,m,u,h]=n,w=Vt(a,l),g=Vt(d,l),y=ge(n[0].type.tensor),x=()=>{let S=m.rank,I=c.rank,A=`var aIndices: ${m.type.indices};`;for(let T=S-2-1,O=I-1;T>=0;T--,O--)A+=`
aIndices[${T}] = ${I>1?`batchIndices[${O}]`:"batchIndices"};`;return w.forEach(T=>{A+=`
aIndices[${T}] = 0;`}),A+=`
aIndices[${S-2}] = u32(row);
                   aIndices[${S-1}] = u32(colIn);`,A},$=()=>{let S=u.rank,I=c.rank,A=`var bIndices: ${u.type.indices};`;for(let T=S-2-1,O=I-1;T>=0;T--,O--)A+=`
bIndices[${T}] = ${I>1?`batchIndices[${O}]`:"batchIndices"};`;return g.forEach(T=>{A+=`
bIndices[${T}] = 0;`}),A+=`
bIndices[${S-2}] = u32(row);
                   bIndices[${S-1}] = u32(colIn);`,A};return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${c.type.indices}) -> ${Pe(e,y)} {
      var value = ${Pe(e,y)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        ${x()}
        value = ${m.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${c.type.indices}) -> ${Pe(e,y)} {
      var value = ${Pe(e,y)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        ${$()}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Pe(e,y)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${i?"bias[colIn]":`${Pe(e,y)}(bias[row])`};`:""}
        ${r}
        ${h.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Zr=(e,t,r,n,o=!1,i)=>{let a=e[0].dims,d=e[1].dims,l=a.slice(0,-2),c=d.slice(0,-2),m=n?n.slice(0,-2):r.slice(0,-2),u=k.size(m),h=a[a.length-2],w=a[a.length-1],g=d[d.length-1],y=w%4===0&&g%4===0,x=h<=8?[4,1,1]:[4,4,1],$=[8,8,1],_=[Math.ceil(g/$[0]/x[0]),Math.ceil(h/$[1]/x[1]),Math.ceil(u/$[2]/x[2])],S=y?4:1,I=[...l,h,w/S],A=I.length,T=[...c,w,g/S],O=T.length,B=[u,h,g/S],N=[{type:6,data:h},{type:6,data:g},{type:6,data:w}];Ge(t,N),N.push(...V(m,I,T));let H=["rank","rank"],K=e.length>2;K&&(N.push(...V(e[2].dims)),H.push("rank")),N.push(...V(B));let X=ne=>{let oe=m.length,le=Hr("batchDims",e[0].dataType,oe,1),Y=ge(e[0].dataType),pe=E("a",e[0].dataType,A,S),ce=E("b",e[1].dataType,O,S),Q=R("result",e[0].dataType,B.length,S),be=[pe,ce];if(K){let F=o?S:1;be.push(E("bias",e[2].dataType,e[2].dims.length,F))}let ae=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Le(t,ae);let ie=ge(Q.type.tensor),se=He(t,Q.type.value,ie),M=zm(S,K,se,[le,pe,ce,Q],[l,c,m],o);return`
  ${ne.registerUniforms(ae).registerInternalVariables(le).declareVariables(...be,Q)}
  ${M}
  ${y?er(x,$,Y,le):tr(x,$,Y,le)}
                   `};return{name:"MatMul",shaderCache:{hint:`${x};${t.activation};${y};${o}`,inputDependencies:H},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:_[0],y:_[1],z:_[2]},programUniforms:N}),getShaderSource:X}}});var Om,Cu,Au=U(()=>{"use strict";Z();dt();re();lt();Jt();io();rr();Om=(e,t,r,n,o=!1,i,a=4,d=4,l=4,c="f32")=>{let m=H=>{switch(H){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${c}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${H} is not supported.`)}},u=H=>{switch(H){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${H} is not supported.`)}},h=e?`
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
    `,g=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",y=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",x=e?"row":"col",$=e?"col":"row",_=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${x} / outWidth;
    let outCol = ${x} % outWidth;

    let WRow = ${$} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${$} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${$} % inChannels;
    var resData = ${Pe(a,c)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${g} && xCol >= 0 && xCol < ${y}) {
      ${h}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${m(a)}
    }
    return resData;`,S=e?t&&n?`
    let col = colIn * ${a};
    ${_}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${_}
    }
    return ${Pe(a,c)}(0.0);`:n&&r?`
    let col = colIn * ${a};
    ${_}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${_}
    }
    return ${Pe(a,c)}(0.0);`,I=`${u(d)}`,A=Pe(l,c),T=e?Pe(a,c):Pe(d,c),O=e?Pe(d,c):Pe(a,c),B=He(i,A,c);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${T} {
      ${e?S:I}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${O} {
      ${e?I:S}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${A}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${w}
      ${Yr(o)}
      ${B}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Cu=(e,t,r,n,o,i,a,d,l)=>{let c=t.format==="NHWC",m=c?e[0].dims[3]:e[0].dims[1],u=r[0],h=c?r[2]:r[3],w=c?r[1]:r[2],g=c?r[3]:r[1],y=c&&(m%4===0||m%3===0)&&g%4===0,x=c?g:h*w,$=c?h*w:g,_=[8,8,1],S=n<=8?[4,1,1]:[4,4,1],I=[Math.ceil(x/_[0]/S[0]),Math.ceil($/_[1]/S[1]),Math.ceil(u/_[2]/S[2])];we("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${I}`);let A=y?c&&m%4!==0?3:4:1,T=_[1]*S[1],O=_[0]*S[0],B=Math.max(_[0]*A,_[1]),N=n%T===0,H=o%O===0,K=i%B===0,X=y?[A,4,4]:[1,1,1],ne=[{type:6,data:n},{type:6,data:o},{type:6,data:i},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Ge(t,ne),ne.push(...V(e[0].dims,e[1].dims));let oe=["rank","rank"];a&&(ne.push(...V(e[2].dims)),oe.push("rank")),ne.push(...V(r));let le=Y=>{let pe=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Le(t,pe);let ce=y?4:1,Q=ge(e[0].dataType),be=`
      fn setOutputAtIndex(flatIndex : i32, value : ${y?`vec4<${Q}>`:Q}) {
        result[flatIndex] = ${y?`vec4<${Q}>`:Q}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${y?`vec4<${Q}>`:Q}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${y?"/ 4":""}, value);
      }`,ae=E("x",e[0].dataType,e[0].dims.length,A===3?1:A),ie=E("w",e[1].dataType,e[1].dims.length,ce),se=[ae,ie],M=R("result",e[0].dataType,r.length,ce);if(a){let F=E("bias",e[2].dataType,e[2].dims.length,ce);se.push(F),be+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${y?`vec4<${Q}>`:Q} {
          return bias[coords.${c?"w":"y"}${y?"/ 4":""}];
        }`}return`
        ${Xr("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${Y.registerUniforms(pe).declareVariables(...se,M)}
        ${be}
        ${Om(c,N,H,K,a,t,X[0],X[1],X[2],Q)}
        ${y?er(S,_,Q,void 0,!c,B):tr(S,_,Q,void 0,!c,B,!1,void 0,d)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${A};${y};${N};${H};${K};${T};${O};${B}`,inputDependencies:oe},getRunData:()=>({outputs:[{dims:l?l(r):r,dataType:e[0].dataType}],dispatchGroup:{x:I[0],y:I[1],z:I[2]},programUniforms:ne}),getShaderSource:le}}});var Dm,Tu,Qr,Bm,ku,Rm,Eu,Pu,zu=U(()=>{"use strict";Z();dt();ee();re();lt();Jt();Dm=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Tu=e=>typeof e=="number"?[e,e,e]:e,Qr=(e,t)=>t<=1?e:e+(e-1)*(t-1),Bm=(e,t,r,n=1)=>{let o=Qr(t,n);return Math.floor((e[0]*(r-1)-r+o)/2)},ku=(e,t,r,n,o)=>{o==null&&(o=Bm(e,t[0],n[0]));let i=[0,0,0,r];for(let a=0;a<3;a++)e[a]+2*o>=t[a]&&(i[a]=Math.trunc((e[a]-t[a]+2*o)/n[a]+1));return i},Rm=(e,t,r,n,o,i,a,d,l,c)=>{let m,u,h,w;if(e==="VALID"&&(e=0),typeof e=="number"){m={top:e,bottom:e,left:e,right:e,front:e,back:e};let g=ku([t,r,n,1],[d,l,c],1,[o,i,a],e);u=g[0],h=g[1],w=g[2]}else if(Array.isArray(e)){if(!e.every((y,x,$)=>y===$[0]))throw Error(`Unsupported padding parameter: ${e}`);m={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let g=ku([t,r,n,1],[d,l,c],1,[o,i,a],e[0]);u=g[0],h=g[1],w=g[2]}else if(e==="SAME_UPPER"){u=Math.ceil(t/o),h=Math.ceil(r/i),w=Math.ceil(n/a);let g=(u-1)*o+d-t,y=(h-1)*i+l-r,x=(w-1)*a+c-n,$=Math.floor(g/2),_=g-$,S=Math.floor(y/2),I=y-S,A=Math.floor(x/2),T=x-A;m={top:S,bottom:I,left:A,right:T,front:$,back:_}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:m,outDepth:u,outHeight:h,outWidth:w}},Eu=(e,t,r,n,o,i=!1,a="channelsLast")=>{let d,l,c,m,u;if(a==="channelsLast")[d,l,c,m,u]=e;else if(a==="channelsFirst")[d,u,l,c,m]=e;else throw new Error(`Unknown dataFormat ${a}`);let[h,,w,g,y]=t,[x,$,_]=Tu(r),[S,I,A]=Tu(n),T=Qr(w,S),O=Qr(g,I),B=Qr(y,A),{padInfo:N,outDepth:H,outHeight:K,outWidth:X}=Rm(o,l,c,m,x,$,_,T,O,B),ne=i?h*u:h,oe=[0,0,0,0,0];return a==="channelsFirst"?oe=[d,ne,H,K,X]:a==="channelsLast"&&(oe=[d,H,K,X,ne]),{batchSize:d,dataFormat:a,inDepth:l,inHeight:c,inWidth:m,inChannels:u,outDepth:H,outHeight:K,outWidth:X,outChannels:ne,padInfo:N,strideDepth:x,strideHeight:$,strideWidth:_,filterDepth:w,filterHeight:g,filterWidth:y,effectiveFilterDepth:T,effectiveFilterHeight:O,effectiveFilterWidth:B,dilationDepth:S,dilationHeight:I,dilationWidth:A,inShape:e,outShape:oe,filterShape:t}},Pu=(e,t,r,n,o,i)=>{let a=i==="channelsLast",d=a?e[0].dims[3]:e[0].dims[1],l=!1,c=[64,1,1],m={x:r.map((_,S)=>S)},u=[Math.ceil(Dm(m.x.map(_=>r[_]))/c[0]),1,1];we("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${u}`);let h=l?a&&d%4!==0?3:4:1,w=k.size(r),g=[{type:12,data:w},{type:12,data:n},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];Ge(t,g),g.push(...V(e[0].dims,e[1].dims));let y=["rank","rank"],x=e.length===3;x&&(g.push(...V(e[2].dims)),y.push("rank")),g.push(...V(r));let $=_=>{let S=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:n.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Le(t,S);let I=l?4:1,A=ge(e[0].dataType),T=E("x",e[0].dataType,e[0].dims.length,h===3?1:h),O=E("W",e[1].dataType,e[1].dims.length,I),B=[T,O],N=R("result",e[0].dataType,r.length,I),H="";if(x){let ne=E("bias",e[2].dataType,e[2].dims.length,I);B.push(ne),H+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l?`vec4<${A}>`:A} {
          return bias[${a?L("coords",4,5):L("coords",1,5)}${l?"/ 4":""}];
        }`}let K=Pe(h,A),X=He(t,K,A);return`
            ${H}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${T.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${O.getByIndices("aIndices")};
            }
          ${_.registerUniforms(S).declareVariables(...B,N)}
          ${_.mainStart()}
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${N.offsetToIndices("global_idx")};
              let batch = ${L("coords",0,T.rank)};
              let d2 = ${a?L("coords",T.rank-1,T.rank):L("coords",1,T.rank)};
              let xFRCCorner = vec3<u32>(${a?L("coords",1,T.rank):L("coords",2,T.rank)},
              ${a?L("coords",2,T.rank):L("coords",3,T.rank)},
              ${a?L("coords",3,T.rank):L("coords",4,T.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?L("uniforms.x_shape",1,T.rank):L("uniforms.x_shape",2,T.rank)};
              let xShapeZ = ${a?L("uniforms.x_shape",2,T.rank):L("uniforms.x_shape",3,T.rank)};
              let xShapeW = ${a?L("uniforms.x_shape",3,T.rank):L("uniforms.x_shape",4,T.rank)};
              let xShapeU = ${a?L("uniforms.x_shape",4,T.rank):L("uniforms.x_shape",1,T.rank)};
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
              ${X}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${a};${h};${x}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:u[0],y:u[1],z:u[2]},programUniforms:g}),getShaderSource:$}}});var Ou,Du,Bu=U(()=>{"use strict";Z();ee();re();lt();Ou=(e,t,r,n)=>{let o=e.length>2,i=o?"value += b[output_channel];":"",a=e[0].dims,d=e[1].dims,l=t.format==="NHWC",c=l?r[3]:r[1],m=c/t.group,u=l&&m>=4?ve(c):1,h=k.size(r)/u,w=[{type:12,data:h},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:m}];Ge(t,w),w.push(...V(a,[d[0],d[1],d[2],d[3]/u]));let g=o?["rank","rank","rank"]:["rank","rank"];w.push(...V([r[0],r[1],r[2],r[3]/u]));let y=x=>{let $=R("output",e[0].dataType,r.length,u),_=ge($.type.tensor),S=He(t,$.type.value,_),I=E("x",e[0].dataType,a.length),A=E("w",e[1].dataType,d.length,u),T=[I,A];o&&T.push(E("b",e[2].dataType,e[2].dims,u));let O=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Le(t,O);let B=l?`
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
            let xVal = ${I.get("batch","xHeight","xWidth","input_channel")};
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

            let xVal = ${I.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${A.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${x.registerUniforms(O).declareVariables(...T,$)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${$.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${u} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${B}
    ${i}
    ${S}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${u}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:w}),getShaderSource:y}},Du=(e,t,r,n)=>{let o=e.length>2,i=ve(r[3]),a=ve(r[2]),d=k.size(r)/i/a,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/i],c=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/i],m=[r[0],r[1],r[2],r[3]/i],u=[{type:12,data:d},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Ge(t,u),u.push(...V(l,c,m));let h=(a-1)*t.strides[1]+c[1],w=g=>{let y=R("output",e[0].dataType,m.length,i),x=ge(y.type.tensor),$=He(t,y.type.value,x),_=E("x",e[0].dataType,l.length,i),S=E("w",e[1].dataType,c.length,i),I=[_,S];o&&I.push(E("b",e[2].dataType,e[2].dims,i));let A=o?"value += b[output_channel];":"",T=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Le(t,T),`
  ${g.registerUniforms(T).declareVariables(...I,y)}
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

    var x_vals: array<${_.type.value}, ${h}>;
    var values: array<${y.type.value}, ${a}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${c[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${h}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${_.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${_.type.value}(0);
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
      ${A}
      ${$}
      ${y.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${i};${a};${h};${c[0]};${c[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:u}),getShaderSource:w}}});var ao,Mm,Ru,so=U(()=>{"use strict";Z();ee();rr();re();lt();ao=(e,t,r,n,o=!1,i)=>{let a=e[0].dims,d=e[1].dims,l=a[a.length-2],c=d[d.length-1],m=a[a.length-1],u=ve(c),h=ve(m),w=ve(l),g=k.size(r)/u/w,y=e.length>2,x=n?n.slice(0,-2):r.slice(0,-2),_=[k.size(x),l,c],S=[{type:12,data:g},{type:12,data:l},{type:12,data:c},{type:12,data:m}];Ge(t,S),S.push(...V(x,a,d)),y&&S.push(...V(e[2].dims)),S.push(...V(_));let I=A=>{let T=Hr("batch_dims",e[0].dataType,x.length),O=E("a",e[0].dataType,a.length,h),B=E("b",e[1].dataType,d.length,u),N=R("output",e[0].dataType,_.length,u),H=ge(N.type.tensor),K=He(t,N.type.value,H),X=[O,B],ne="";if(y){let ae=o?u:1;X.push(E("bias",e[2].dataType,e[2].dims.length,ae)),ne=`${o?`value += bias[col / ${ae}];`:`value += ${N.type.value}(bias[row + i]);`}`}let oe=a.slice(0,-2),le=d.slice(0,-2),Y=Vt(oe,x),pe=Vt(le,x),ce=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Le(t,ce);let Q=(ae,ie)=>{let se=ae.rank,M=ae.name;if(se===2)return`var ${M}_indices = ${ae.type.indices}(0u, 0u);`;let F=T.rank,fe=`var ${M}_indices: ${ae.type.indices};`;for(let Re=se-2-1,Se=F-1;Re>=0;Re--,Se--)fe+=`
${M}_indices[${Re}] = ${F>1?`batch_indices[${Se}]`:"batch_indices"};`;return ie.forEach(Re=>{fe+=`
${M}_indices[${Re}] = 0;`}),fe+=`${M}_indices[${se-2}] = 0u;
                     ${M}_indices[${se-1}] = 0u;`,fe},be=()=>{let ae=`var a_data: ${O.type.value};`;for(let ie=0;ie<h;ie++)ae+=`
              let b_data${ie} = b[(b_offset + (k + ${ie}) * uniforms.N + col) / ${u}];`;for(let ie=0;ie<w;ie++){ae+=`a_data = a[(a_offset + (row + ${ie}) * uniforms.K + k) / ${h}];`;for(let se=0;se<h;se++)ae+=`
            values[${ie}] = fma(${B.type.value}(a_data${h===1?"":`[${se}]`}), b_data${se}, values[${ie}]);
`}return ae};return`
  ${A.registerUniforms(ce).registerInternalVariables(T).declareVariables(...X,N)}
  ${A.mainStart()}
    ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${u})) * ${u};
    var index1 = global_idx / (uniforms.N / ${u});
    let stride1 = uniforms.M / ${w};
    let row = (index1 % stride1) * ${w};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${T.offsetToIndices("batch")};`}
    ${Q(O,Y)}
    let a_offset = ${O.indicesToOffset("a_indices")};
    ${Q(B,pe)}
    let b_offset = ${B.indicesToOffset("b_indices")};
    var values: array<${N.type.value}, ${w}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${be()}
    }
    for (var i = 0u; i < ${w}u; i++) {
      var value = values[i];
      ${ne}
      ${K}
      let cur_indices = ${N.type.indices}(batch, row + i, col);
      let offset = ${N.indicesToOffset("cur_indices")};
      ${N.setByOffset(`offset / ${u}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${u};${h};${w};${o}`,inputDependencies:y?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:S}),getShaderSource:I}},Mm=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Ru=e=>{Mm(e.inputs);let t=tt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];r<8&&n<8?e.compute(ao(e.inputs,{activation:""},t)):e.compute(Zr(e.inputs,{activation:""},t))}});var Um,uo,Vm,lo,co,Mu,Nm,Wm,po,Uu=U(()=>{"use strict";ee();Au();zu();rr();Bu();lt();so();Tt();Um=(e,t,r,n,o,i)=>{let a=e[0],d=e.slice(i?1:2,i?3:4),l=d.length,c=t[0],u=t.slice(2).map((g,y)=>g+(g-1)*(r[y]-1)),w=d.map((g,y)=>g+n[y]+n[y+l]).map((g,y)=>Math.floor((g-u[y]+o[y])/o[y]));return w.splice(0,0,a),w.splice(i?3:1,0,c),w},uo=[2,3,1,0],Vm=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[1]*t.group;if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},lo=(e,t)=>{let r=e.kernelShape.slice();for(let i=2;i<t[1].dims.length;++i)r[i-2]===0&&(r[i-2]=t[1].dims[i]);let n=e.pads.slice();It.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.format==="NHWC",e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:r,pads:n}),o},co=e=>{let t=Kr(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],o=e.dilations,i=e.group,a=e.kernel_shape,d=e.pads,l=e.strides,c=e.w_is_const();return{autoPad:n,format:r,dilations:o,group:i,kernelShape:a,pads:d,strides:l,wIsConst:c,...t,cacheKey:`${e.format};${t.activation};`}},Mu=(e,t,r,n)=>{let o=r.format==="NHWC",i=Um(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,o);if(r.group!==1){let T=[t[0]];if(o){let B=e.kernelCustomData.wT??e.compute(Ue(t[1],uo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=B),T.push(B)}else T.push(t[1]);t.length===3&&T.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(Du(T,r,i,n),{inputs:T}):e.compute(Ou(T,r,i,n),{inputs:T});return}let a=t.length===3,d=t[0].dims[o?1:2],l=t[0].dims[o?2:3],c=t[0].dims[o?3:1],m=t[1].dims[2],u=t[1].dims[3],h=i[o?1:2],w=i[o?2:3],g=i[o?3:1],y=o&&m===d&&u===l&&r.pads[0]===0&&r.pads[1]===0;if(y||m===1&&u===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let T=i[0],O,B,N,H=[];if(o){let ne=e.kernelCustomData.wT??e.compute(Ue(t[1],uo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=ne),y){let oe=d*l*c;O=t[0].reshape([1,T,oe]),B=ne.reshape([1,oe,g]),N=[1,T,g]}else O=t[0].reshape([T,d*l,c]),B=ne.reshape([1,c,g]),N=[T,h*w,g];H.push(O),H.push(B)}else O=t[0].reshape([T,c,d*l]),B=t[1].reshape([1,g,c]),N=[T,g,h*w],H.push(B),H.push(O);a&&H.push(t[2]);let K=N[2],X=H[0].dims[H[0].dims.length-1];K<8&&X<8?e.compute(ao(H,r,i,N,o,n),{inputs:H}):e.compute(Zr(H,r,i,N,o,n),{inputs:H});return}let x=!0,$=e.kernelCustomData.wT??e.compute(Ue(t[1],uo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let _=[t[0],$];a&&_.push(t[2]);let S=o?h*w:g,I=o?g:h*w,A=m*u*c;e.compute(Cu(_,r,i,S,I,A,a,x,n),{inputs:_})},Nm=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],i=[1].concat(t.strides),a=[1].concat(t.dilations),d=[1].concat(t.kernelShape),l=lo({...t,pads:o,strides:i,dilations:a,kernelShape:d},n);Mu(e,n,l,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},Wm=(e,t,r)=>{let n=r.format==="NHWC"?"channelsLast":"channelsFirst",o=lo(r,t),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,a=Eu(t[0].dims,t[1].dims,r.strides,r.dilations,i,!1,n);e.compute(Pu(t,o,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],n))},po=(e,t)=>{if(Vm(e.inputs,t),e.inputs[0].dims.length===3)Nm(e,t);else if(e.inputs[0].dims.length===5)Wm(e,e.inputs,t);else{let r=lo(t,e.inputs);Mu(e,e.inputs,r)}}});var Hm,Vu,Nu=U(()=>{"use strict";Z();dt();re();lt();Jt();io();rr();Hm=(e,t=!1,r,n,o=4)=>{let i=$=>{switch($){case 1:return"return w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];";case 4:return`
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
      ${Yr(t)}
      ${y}
      result[getIndexFromCoords4D(coords, vec4<i32>(uniforms.result_shape))/${o}] = value;
    }
  }`},Vu=(e,t,r,n,o,i,a,d)=>{let l=t.format==="NHWC",c=l?e[0].dims[3]:e[0].dims[1],m=r[0],u=l?r[2]:r[3],h=l?r[1]:r[2],w=l?r[3]:r[1],g=l&&c%4===0&&c%3&&w%4===0,y=l?w:u*h,x=l?u*h:w,$=[8,8,1],_=n<=8?[4,1,1]:[4,4,1],S=[Math.ceil(y/$[0]/_[0]),Math.ceil(x/$[1]/_[1]),Math.ceil(m/$[2]/_[2])];we("verbose",()=>`[conv_backprop_mm_webgpu] dispatch = ${S}`);let I=g?4:1,A=Math.max($[0]*I,$[1]),T=g?4:1,O=[t.kernelShape[l?1:2],t.kernelShape[l?2:3]],B=[O[0]+(t.dilations[0]<=1?0:(O[0]-1)*(t.dilations[0]-1)),O[1]+(t.dilations[1]<=1?0:(O[1]-1)*(t.dilations[1]-1))],N=[B[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),B[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],H=[{type:6,data:n},{type:6,data:o},{type:6,data:i},{type:6,data:t.strides},{type:6,data:t.dilations},{type:6,data:O},{type:6,data:N}];Ge(t,H),H.push(...V(e[0].dims,e[1].dims));let K=["rank","rank"];a&&(H.push(...V(e[2].dims)),K.push("rank")),H.push(...V(r));let X=ne=>{let oe=E("x",e[0].dataType,e[0].dims.length,T),le=E("w",e[1].dataType,e[1].dims.length,1),Y=R("result",e[0].dataType,r.length,T),pe=[oe,le],ce="";if(a){let ae=E("bias",e[2].dataType,e[2].dims.length,T);pe.push(ae),ce+=`
          fn getBiasByOutputCoords(coords : vec4<i32>) -> ${ae.type.value} {
            return bias[coords.${l?"w":"y"}${g?"/ 4":""}];
          }`}let Q=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"strides",type:"i32",length:2},{name:"dilations",type:"i32",length:2},{name:"filter_dims",type:"i32",length:O.length},{name:"pads",type:"i32",length:N.length}];Le(t,Q);let be=ge(e[0].dataType,1);if(be!=="f16"&&be!=="f32")throw new Error(`elemType ${be} is not supported.`);return`
        ${Xr("uniforms.result_strides")}
        ${ne.registerUniforms(Q).declareVariables(...pe,Y)};
        ${ce}
        ${Hm(l,a,t,oe.type.value,I)}
        ${g?er(_,$,be,void 0,!l,A):tr(_,$,be,void 0,!l,A,!1,void 0,d)}`};return{name:"Conv2DTransposeMatMul",shaderCache:{hint:`${t.cacheKey};${_};${$};${g}`,inputDependencies:K},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:S[0],y:S[1],z:S[2]},programUniforms:H}),getShaderSource:X}}});var Gm,mo,Wu=U(()=>{"use strict";Z();dt();ee();re();Gm=(e,t,r,n,o,i=!1,a,d,l=!1)=>{let c=l?1:2,m=l?2:3,u=l?3:1,h=i?2:1,w=`
  fn setOutputAtIndex(flatIndex : u32, value : ${i?`vec4<${a}>`:a}) {
    result[flatIndex] = ${i?`vec4<${a}>`:a}(value);
  }`;n&&(w+=`
    fn getBiasByOutputCoords(coords : vec4<u32>) -> ${i?`vec4<${a}>`:a} {
      return bias[coords.${l?"w":"y"}${i?"/ 4":""}];
    }`);let g=i?4:1,y=E("W",t[1].dataType,t[1].dims.length,g),x=E("Dy",t[0].dataType,t[0].dims.length,g),$=[x,y];n&&$.push(E("bias",t[2].dataType,[r[u]].length,g));let _=R("result",t[0].dataType,r.length,g),S=`{
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

                var xValue = ${x.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${a}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;

                xValue =  ${x.get("batch","idyR","idyC2","d2")};

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

                var xValue = ${x.get("batch","idyR","idyC","d2")};
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

                var xValue = ${x.get("batch","idyR","idyC2","d2")};
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
          ${_.set("batch","r","c + i","d1","value")};
        }
      }`,I=`
          let outputIndices = ${_.offsetToIndices("global_idx")};
          let batch = ${_.indicesGet("outputIndices",0)};
          let d1 = ${_.indicesGet("outputIndices",u)};
          let r = ${_.indicesGet("outputIndices",c)};
          let c = ${_.indicesGet("outputIndices",m)};
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
                let xValue = ${l?x.get("batch","idyR","idyC","inputChannel"):x.get("batch","inputChannel","idyR","idyC")};
                let wValue = ${y.get("inputChannel","wOutChannel","u32(wRPerm)","u32(wCPerm)")};
                dotProd = dotProd + xValue * wValue;
                inputChannel = inputChannel + 1;
              }
            }
          }
          let value = dotProd + ${n?"bias[d1]":`${a}(0.0)`};
          ${_.setByOffset("global_idx","value")};
        `;return`
  ${e.registerUniforms(d).declareVariables(...$,_)}
  ${w}

    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
  ${i?S:I}}`},mo=(e,t,r)=>{let n=e.length>2,o=t.outputShape,i=k.size(o),a=[Math.ceil(i/64),1,1];we("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${a}`);let d=t.format==="NHWC",l=["rank","rank"],c=[t.strides[0],t.strides[1]],m=[t.kernelShape[d?1:2],t.kernelShape[d?2:3]],u=[t.dilations[0],t.dilations[1]],h=[m[0]+(t.dilations[0]<=1?0:(t.kernelShape[d?1:2]-1)*(t.dilations[0]-1)),m[1]+(t.dilations[1]<=1?0:(t.kernelShape[d?2:3]-1)*(t.dilations[1]-1))],w=[h[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),h[1]-1-Math.floor(t.pads[1]+t.pads[3])/2],g=!1,y=t.group,x=e[1].dims,$=x[0]/y,_=x[1],S=[{type:12,data:i},{type:12,data:c},{type:12,data:m},{type:12,data:u},{type:12,data:h},{type:6,data:w},{type:12,data:$},{type:12,data:_},...V(e[0].dims,e[1].dims)];n&&(S.push(...V(e[2].dims)),l.push("rank")),S.push(...V(o));let I=a[1]===1&&a[2]===1,A=T=>{let O=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:c.length},{name:"filter_dims",type:"u32",length:m.length},{name:"dilations",type:"u32",length:m.length},{name:"effective_filter_dims",type:"u32",length:h.length},{name:"pads",type:"i32",length:w.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],B=ge(e[0].dataType);return`${Gm(T,e,o,n,I,g,B,O,d)}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};`,inputDependencies:l},getRunData:()=>({dispatchGroup:{x:a[0],y:a[1],z:a[2]},outputs:[{dims:r?r(o):o,dataType:e[0].dataType}],programUniforms:S}),getShaderSource:A}}});var Lm,Fm,qm,Hu,Gu,jm,Km,Ym,Xm,Lu,Fu=U(()=>{"use strict";Nu();Wu();lt();Tt();Lm=(e,t,r,n,o,i)=>(e-1)*t+r+(n-1)*o+1-i,Fm=(e,t,r,n,o)=>{let i=Math.floor(e/2);t==="SAME_UPPER"?(r[n]=i,r[o]=e-i):t==="SAME_LOWER"&&(r[n]=e-i,r[o]=i)},qm=(e,t,r,n,o,i,a,d,l,c)=>{let m=e.length-2,u=c.length===0;if(l.length===0)for(let g=0;g<m;++g)l.push(0);let h=e[0],w=t[d?3:1]*o;for(let g=0,y=e.length-m-(d?1:0);g<m;++g,++y){let x=e[y],$=u?x*a[g]:c[g],_=Lm(x,a[g],i[g],t[y],r[g],$);Fm(_,n,i,g,g+m),u&&c.push(a[g]*(x-1)+l[g]+(t[y]-1)*r[g]+1-i[g]-i[g+m])}c.splice(0,0,h),c.splice(d?3:1,0,w)},Hu=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((u,h)=>u*h,1)===0){r.length=0;for(let u=2;u<t[1].dims.length;++u)r.push(t[1].dims[u])}let n=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let o=e.pads.slice(),i=e.outputShape.slice(),a=e.outputPadding.slice(),d=t[0].dims,l=e.dilations.slice();if(l.reduce((u,h)=>u+h,0)===0){let u=t[0].dims.length-2;l=new Array(u).fill(1)}let c=e.strides.slice();if(c.reduce((u,h)=>u+h,0)===0){let u=t[0].dims.length-2;c=new Array(u).fill(1)}qm(d,r,l,e.autoPad,e.group,o,c,n,a,i);let m=Object.assign({},e);return Object.assign(m,{kernelShape:r,pads:o,outputPadding:a,outputShape:i,dilations:l,strides:c}),m},Gu=e=>{let t=Kr(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,i=e.group,a=e.kernelShape,d=e.pads,l=e.strides,c=e.wIsConst(),m=e.outputPadding,u=e.outputShape;return{autoPad:n,format:r,dilations:o,group:i,kernelShape:a,outputPadding:m,outputShape:u,pads:d,strides:l,wIsConst:c,...t,cacheKey:`${e.format};${t.activation};`}},jm=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[0];if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==o))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((m,u)=>m+u,0)>0&&t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.reduce((m,u)=>m+u,0)>0&&t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.reduce((m,u)=>m+u,0)>0&&t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.outputPadding.length!==i&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((m,u)=>m+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Km=[2,3,1,0],Ym=(e,t,r)=>{let n=Hu(r,t),o=r.format==="NHWC",i=n.outputShape,a=i[o?3:1],d=t[0].dims[o?3:1];if(n.group!==1||a===1&&d===1){e.compute(mo(t,n));return}let l=i[o?1:2],c=i[o?2:3],m=t[1].dims[2],u=t[1].dims[3],h=o?l*c:a,w=o?a:l*c,g=m*u*d,y=!0,x=e.kernelCustomData.wT??e.compute(Ue(t[1],Km),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=x);let $=[t[0],x],_=t.length===3;_&&(!o&&t[2].dims.length===1?$.push(t[2].reshape([t[2].dims[0],1,1])):$.push(t[2])),e.compute(Vu($,n,i,h,w,g,_,y),{inputs:$})},Xm=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=t.kernelShape;(o.length===0||o[0]===0)&&(o=[e.inputs[1].dims[2]]);let i=t.dilations;(i.length===0||i[0]===0)&&(i=[1]);let a=t.strides;(a.length===0||a[0]===0)&&(a=[1]);let d=t.pads;d.length===0&&(d=[0,0]),d=[0,d[0],0,d[1]],a=[1].concat(a),i=[1].concat(i),o=[1].concat(o);let l=Hu({...t,pads:d,strides:a,dilations:i,kernelShape:o},n);e.compute(mo(n,l,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]]))},Lu=(e,t)=>{jm(e.inputs,t),e.inputs[0].dims.length===3?Xm(e,t):Ym(e,e.inputs,t)}});var Zm,qu,ju,Ku=U(()=>{"use strict";Z();ee();Ie();re();Zm=(e,t,r,n)=>{let o=k.size(t),i=t.length,a=E("input",e,i),d=R("output",e,i),l=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),c=k.normalizeAxis(l,i),m=u=>{let h=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,w=L("uniforms.input_shape","uniforms.axis",i),g=n.reverse?h+(n.exclusive?" + 1":""):"0",y=n.reverse?w:h+(n.exclusive?"":" + 1");return`
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
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:c},...V(t,t)]}),getShaderSource:m}},qu=(e,t)=>{let r=e.inputs[0].dims,n=e.inputs[0].dataType,o=e.inputs[1];e.compute(Zm(n,r,o,t),{inputs:[0]})},ju=e=>{let t=e.exclusive===1,r=e.reverse===1;return J({exclusive:t,reverse:r})}});var Qm,Jm,ef,Yu,Xu,Zu=U(()=>{"use strict";Z();ee();Ie();re();Qm=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Jm=(e,t,r,n)=>{let o=[];o.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<t;++i)o.push(r.indicesSet("a",e[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},ef=(e,t)=>{let r,n,o,i,a,d,l=t.format==="NHWC",c=t.blocksize,m=t.mode==="DCR";l?([r,n,o,i]=e.dims,a=m?[r,n,o,c,c,i/c**2]:[r,n,o,i/c**2,c,c],d=m?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,o,i]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],a=m?[r,c,c,i/c**2,n,o]:[r,i/c**2,c,c,n,o],d=m?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let u=e.reshape(a),h=u.dims.length,w=e.dataType,g=E("a",w,h),y=R("output",w,h),x=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(g,y)}

  ${Jm(d,h,g,y)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${y.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${y.setByOffset("global_idx",g.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let _=l?[r,n*c,o*c,i/c**2]:[r,i/c**2,n*c,o*c],S=k.size(_),I=u.dims,A=k.sortBasedOnPerm(I,d);return{outputs:[{dims:_,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(S/64)},programUniforms:[{type:12,data:S},...V(I,A)]}},getShaderSource:x}},Yu=(e,t)=>{Qm(e.inputs),e.compute(ef(e.inputs[0],t))},Xu=e=>J({blocksize:e.blocksize,mode:e.mode,format:e.format})});var fo,Jr,Qu,tf,rf,ho,go,Ju,nf,ed,td,rd=U(()=>{"use strict";Z();ee();Ie();re();fo="[a-zA-Z]|\\.\\.\\.",Jr="("+fo+")+",Qu="^"+Jr+"$",tf="("+Jr+",)*"+Jr,rf="^"+tf+"$",ho=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,r){let n=this.symbolToIndices.get(t);n===void 0?n=[r]:n.push(r),this.symbolToIndices.set(t,n)}},go=class{constructor(t,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,o]=r.includes("->")?r.split("->",2):[r,""];if(!n.match(RegExp(rf)))throw new Error("Invalid LHS term");if(n.split(",").forEach((d,l)=>{let c=t[l].dims.slice();if(!d.match(RegExp(Qu)))throw new Error("Invalid LHS term");let m=this.processTerm(d,!0,c,l);this.lhs.push(m)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([d,l])=>l.count===1||d==="...").map(([d])=>d).join("");else if(!o.match(RegExp(Jr)))throw new Error("Invalid RHS");o.match(RegExp(fo,"g"))?.forEach(d=>{if(d==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let l=this.symbolToInfo.get(d);if(l===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(l.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(t,r,n){let o=this.symbolToInfo.get(t);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(n)}else o={count:1,dimValue:r,inputIndices:[n]};this.symbolToInfo.set(t,o)}processTerm(t,r,n,o=-1){let i=n.length,a=!1,d=[],l=0;if(!t.match(RegExp(Qu))&&!r&&t!=="")throw new Error("Invalid LHS term");let c=t.match(RegExp(fo,"g")),m=new ho(o);return c?.forEach((u,h)=>{if(u==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let w=i-c.length+1;if(w<0)throw new Error("Ellipsis out of bounds");if(d=n.slice(l,l+w),this.hasEllipsis){if(this.ellipsisDims.length!==d.length||this.ellipsisDims.toString()!==d.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=d;else throw new Error("Ellipsis must be specified in the LHS");for(let g=0;g<d.length;g++){let y=String.fromCharCode("0".charCodeAt(0)+g);m.addSymbol(y,h+g),this.addSymbol(y,n[l++],o)}}else m.addSymbol(u,h+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(u,n[l++],o)}),m}},Ju=e=>e+"_max",nf=(e,t,r,n)=>{let i=e.map(m=>m.length).map((m,u)=>E(`input${u}`,t,m)),a=k.size(n),d=R("output",t,n.length),l=[...r.symbolToInfo.keys()].filter(m=>!r.rhs.symbolToIndices.has(m)),c=m=>{let u=[],h="var prod = 1.0;",w="var sum = 0.0;",g="sum += prod;",y=[],x=[],$=[],_=[],S=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((A,T)=>{if(r.rhs.symbolToIndices.has(T)){let O=r.rhs.symbolToIndices.get(T)?.[0];O!==void 0&&r.lhs.forEach((B,N)=>{if(A.inputIndices.includes(N)){let H=B.symbolToIndices.get(T);if(H===void 0)throw new Error("Invalid symbol error");H.forEach(K=>{u.push(`${i[N].indicesSet(`input${N}Indices`,K,d.indicesGet("outputIndices",O))}`)})}})}else r.lhs.forEach((O,B)=>{if(A.inputIndices.includes(B)){let N=O.symbolToIndices.get(T);if(N===void 0)throw new Error("Invalid symbol error");N.forEach(H=>{y.push(`${i[B].indicesSet(`input${B}Indices`,H,`${T}`)}`)}),_.push(`prod *= ${i[B].getByIndices(`input${B}Indices`)};`)}}),x.push(`for(var ${T}: u32 = 0; ${T} < uniforms.${Ju(T)}; ${T}++) {`),$.push("}")});let I=S?[...u,`let sum = ${i.map((A,T)=>A.getByIndices(`input${T}Indices`)).join(" * ")};`]:[...u,w,...x,...y,h,..._,g,...$];return`
            ${m.registerUniforms(l.map(A=>({name:`${Ju(A)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,d)}

            ${m.mainStart()}
            ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${d.offsetToIndices("global_idx")};
            ${i.map((A,T)=>`var input${T}Indices: ${i[T].type.indices};`).join(`
`)}
            ${I.join(`
`)};
            ${d.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let m=l.filter(h=>r.symbolToInfo.has(h)).map(h=>({type:12,data:r.symbolToInfo.get(h)?.dimValue||0}));m.push({type:12,data:a});let u=e.map((h,w)=>[...V(h)]).reduce((h,w)=>h.concat(w),m);return u.push(...V(n)),{outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:u}},getShaderSource:c}},ed=(e,t)=>{let r=new go(e.inputs,t.equation),n=r.outputDims,o=e.inputs.map((i,a)=>i.dims);e.compute(nf(o,e.inputs[0].dataType,r,n))},td=e=>{let t=e.equation.replace(/\s+/g,"");return J({equation:t})}});var of,nd,af,sf,od,id=U(()=>{"use strict";Z();ee();re();of=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,o=t.length<r.length?0:t.length-r.length;for(;n<r.length&&o<t.length;++n,++o)if(r[n]!==t[o]&&r[n]!==1&&t[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},nd=(e,t)=>{let r=e.length-t.length,n=[];for(let o=0;o<r;++o)n.push(e[o]);for(let o=0;o<t.length;++o)n.push(t[o]===1?e[o+r]:t[o]);return n},af=(e,t)=>e.length>t.length?nd(e,t):nd(t,e),sf=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=af(t,r),o=e[0].dataType,i=o===9?4:1,a=Math.ceil(k.size(n)/i),d=c=>{let m=E("input",o,t.length,i),u=R("output",o,n.length,i),h;if(o===9){let w=(g,y,x="")=>`
          let outputIndices${y} = ${u.offsetToIndices(`outputOffset + ${y}u`)};
          let offset${y} = ${m.broadcastedIndicesToOffset(`outputIndices${y}`,u)};
          let index${y} = offset${y} / 4u;
          let component${y} = offset${y} % 4u;
          ${g}[${y}] = ${x}(${m.getByOffset(`index${y}`)}[component${y}]);
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
    ${h}`},l=[{type:12,data:a},...V(t,n)];return{name:"Expand",shaderCache:{hint:`${n.length}`,inputDependencies:["rank"]},getShaderSource:d,getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l})}},od=e=>{of(e.inputs),e.compute(sf(e.inputs),{inputs:[0]})}});var uf,ad,sd=U(()=>{"use strict";Z();ee();re();jr();uf=e=>{let t=e[0].dataType,r=k.size(e[0].dims),n=k.size(e[1].dims),o=n%4===0,i=a=>{let d=E("x",t,[1],4),l=E("bias",t,[1],4),c=R("y",t,[1],4),m=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],u=w=>`
      let bias${w}_offset: u32 = (global_idx * 4 + ${w}) % uniforms.bias_size;
      let bias${w} = ${l.getByOffset(`bias${w}_offset / 4`)}[bias${w}_offset % 4];`,h=o?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${u(0)}${u(1)}${u(2)}${u(3)}
      let bias = ${d.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(m).declareVariables(d,l,c)}

    ${no(ke(t))}

    ${a.mainStart(Ct)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${d.getByOffset("global_idx")};
      ${h}
      let x_in = x + bias;
      ${c.setByOffset("global_idx",oo("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/Ct/4)}})}},ad=e=>{e.inputs.length<2||k.size(e.inputs[1].dims)===0?ou(e):e.compute(uf(e.inputs))}});var df,lf,ud,dd,ld=U(()=>{"use strict";Z();ee();Ie();re();df=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},lf=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,i=k.normalizeAxis(t.axis,o),a=r.slice(0);a.splice(i,1,...n);let d=r[i],l=e[0].dataType===9?4:1,c=Math.ceil(k.size(a)/l),m=[{type:12,data:c},{type:6,data:d},{type:12,data:i},...V(e[0].dims,e[1].dims,a)],u=h=>{let w=E("data",e[0].dataType,e[0].dims.length,l),g=E("inputIndices",e[1].dataType,e[1].dims.length),y=R("output",e[0].dataType,a.length,l),x=_=>{let S=n.length,I=`var indicesIndices${_}  = ${g.type.indices}(0);`;for(let A=0;A<S;A++)I+=`${S>1?`indicesIndices${_}[${A}]`:`indicesIndices${_}`} = ${a.length>1?`outputIndices${_}[uniforms.axis + ${A}]`:`outputIndices${_}`};`;I+=`
          var idx${_} = ${g.getByIndices(`indicesIndices${_}`)};
          if (idx${_} < 0) {
            idx${_} = idx${_} + uniforms.axisDimLimit;
          }
          var dataIndices${_} : ${w.type.indices};
        `;for(let A=0,T=0;A<o;A++)A===i?(I+=`${o>1?`dataIndices${_}[${A}]`:`dataIndices${_}`} = u32(idx${_});`,T+=S):(I+=`${o>1?`dataIndices${_}[${A}]`:`dataIndices${_}`} = ${a.length>1?`outputIndices${_}[${T}]`:`outputIndices${_}`};`,T++);return I},$;if(e[0].dataType===9){let _=(S,I,A="")=>`
          let outputIndices${I} = ${y.offsetToIndices(`outputOffset + ${I}u`)};
          ${x(I)};
          let offset${I} = ${w.indicesToOffset(`dataIndices${I}`)};
          let index${I} = offset${I} / 4u;
          let component${I} = offset${I} % 4u;
          ${S}[${I}] = ${A}(${w.getByOffset(`index${I}`)}[component${I}]);
        `;$=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${_("value",0,"u32")}
        ${_("value",1,"u32")}
        ${_("value",2,"u32")}
        ${_("value",3,"u32")}
        ${y.setByOffset("global_idx","value")}
      `}else $=`
      let outputIndices = ${y.offsetToIndices("global_idx")};
      ${x("")};
      let value = ${w.getByIndices("dataIndices")};
      ${y.setByOffset("global_idx","value")};
      `;return`
      ${h.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(w,g,y)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:m}),getShaderSource:u}},ud=e=>J({axis:e.axis}),dd=(e,t)=>{let r=e.inputs;df(r),e.compute(lf(e.inputs,t))}});var cf,pf,cd,pd,md=U(()=>{"use strict";Z();ee();Ie();re();cf=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=k.normalizeAxis(t.quantizeAxis,e[0].dims.length),n=t.blockSize,o=e[0],i=e[2],a=e.length===4?e[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((d,l)=>l===r?Math.ceil(d/n)===i.dims[l]:d===i.dims[l]).reduce((d,l)=>d&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==i.dims.length||!a.dims.map((d,l)=>d===i.dims[l]).reduce((d,l)=>d&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},pf=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,i=k.normalizeAxis(t.gatherAxis,o),a=k.normalizeAxis(t.quantizeAxis,o),d=r.slice(0);d.splice(i,1,...n);let l=k.size(d),c=e[2].dataType,u=e[0].dataType===22,h=[{type:12,data:l},{type:12,data:a},{type:12,data:i},{type:12,data:t.blockSize},...V(...e.map((g,y)=>g.dims),d)],w=g=>{let y=E("data",e[0].dataType,e[0].dims.length),x=E("inputIndices",e[1].dataType,e[1].dims.length),$=E("scales",e[2].dataType,e[2].dims.length),_=e.length>3?E("zeroPoint",e[3].dataType,e[3].dims.length):void 0,S=R("output",c,d.length),I=[y,x,$];_&&I.push(_);let A=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${g.registerUniforms(A).declareVariables(...I,S)}
        ${g.mainStart()}
        let output_indices = ${S.offsetToIndices("global_idx")};
        var indices_indices = ${x.type.indices}(0);
        ${(()=>n.length>1?`
          for (var i: u32 = 0; i < ${n.length}; i++) {
            let index = ${S.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${x.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${S.indicesGet("output_indices","uniforms.gather_axis")};`)()};
        var data_indices = ${y.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${S.indicesGet("output_indices","i")};
          ${y.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${x.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[i]};
        }
        ${y.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${d.length}; i++) {
          let index = ${S.indicesGet("output_indices",`i + ${n.length} - 1`)};
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
        ${(()=>_?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${_.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${_.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${u?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0")()};
        let dequantized_data = ${ke(c)}(quantized_data - zero_point) * scale;
        ${S.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((g,y)=>y!==1).map(g=>g.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(g,y)=>"rank")},getRunData:()=>({outputs:[{dims:d,dataType:c}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:h}),getShaderSource:w}},cd=(e,t)=>{let r=e.inputs;cf(r,t),e.compute(pf(e.inputs,t))},pd=e=>J({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})});var mf,ff,fd,hd,gd=U(()=>{"use strict";Z();ee();Ie();re();mf=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},ff=(e,t)=>{let r=e[0].dims,n=e[0].dataType,o=r.length,i=e[1].dims,a=e[1].dataType,d=k.normalizeAxis(t.axis,o),l=r[d],c=i.slice(0),m=k.size(c),u=E("input",n,o),h=E("indicesInput",a,i.length),w=R("output",n,c.length),g=[{type:12,data:m},{type:6,data:l},{type:12,data:d}];return g.push(...V(r,i,c)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:g}),getShaderSource:$=>`
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
  }`}},fd=e=>J({axis:e.axis}),hd=(e,t)=>{let r=e.inputs;mf(r),e.compute(ff(e.inputs,t))}});var hf,gf,yd,bd,wd=U(()=>{"use strict";Z();ee();re();hf=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},gf=(e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[o,i,a]=Wr.getShapeOfGemmResult(r,t.transA,n,t.transB,e.length===3?e[2].dims:void 0),d=[o,i];if(!d)throw new Error("Can't use gemm on the given tensors");let l=k.size(d),c=[{type:12,data:l},{type:12,data:o},{type:12,data:i},{type:12,data:a},{type:1,data:t.alpha},{type:1,data:t.beta}],m=["type","type"];e.length===3&&(c.push(...V(e[2].dims)),m.push("rank")),c.push(...V(d));let u=h=>{let w="";t.transA&&t.transB?w="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?w="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?w="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(w="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let g=t.alpha===1?"":"value *= uniforms.alpha;",y=E("a",e[0].dataType,e[0].dims),x=E("b",e[1].dataType,e[1].dims),$=y.type.value,_=null,S=[y,x];e.length===3&&(_=E("c",e[2].dataType,e[2].dims.length),S.push(_));let I=R("output",e[0].dataType,d.length);S.push(I);let A=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${h.registerUniforms(A).declareVariables(...S)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${$}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${w}
    }

    ${g}
    ${(()=>_!=null?`let cOffset = ${_.broadcastedIndicesToOffset("vec2(m, n)",I)}; value += ${$}(uniforms.beta) * ${_.getByOffset("cOffset")};`:"")()}
    output[global_idx] = value;
  }`};return{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:u}},yd=e=>{let t=e.transA,r=e.transB,n=e.alpha,o=e.beta;return{transA:t,transB:r,alpha:n,beta:o,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},bd=(e,t)=>{hf(e.inputs),e.compute(gf(e.inputs,t))}});var Ve,wf,_d,vd,vf,nr,$d,yo=U(()=>{"use strict";Z();ee();Ie();Nr();Fr();re();Tt();Ve=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,wf=(e,t)=>{let r=e[0],n=Ve(e,1),o=Ve(e,2),i=Ve(e,3),a=Ve(e,4),d=Ve(e,5),l=Ve(e,6),c=Ve(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let m=r.dims[0],u=r.dims[1],h=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],w=u,g=0,y=0,x=Math.floor(h/t.numHeads);if(l&&c&&k.size(l.dims)&&k.size(c.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==m||l.dims[1]!==t.numHeads||l.dims[3]!==x)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(c.dims[0]!==m||c.dims[1]!==t.numHeads||c.dims[3]!==x)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==c.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(c.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=l.dims[2],y=l.dims[2]}else if(l&&k.size(l.dims)||c&&k.size(c.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(n&&k.size(n.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(n.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,w=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==x)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,w=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==x)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,w=n.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(i&&k.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(n&&n.dims.length===5&&n.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let _=g+w,S=0;if(a&&k.size(a.dims)>0){S=8;let O=a.dims;throw O.length===1?O[0]===m?S=1:O[0]===3*m+2&&(S=3):O.length===2&&O[0]===m&&O[1]===_&&(S=5),S===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let I=!1,A=h;if(o&&k.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(w!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');A=o.dims[2]}else{if(w!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');A=o.dims[1]*o.dims[3],I=!0}}let T=!1;if(a&&k.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(d&&k.size(d.dims)>0){if(d.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(d.dims[0]!==m||d.dims[1]!==t.numHeads||d.dims[2]!==u||d.dims[3]!==_)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:m,sequenceLength:u,pastSequenceLength:g,kvSequenceLength:w,totalSequenceLength:_,maxSequenceLength:y,inputHiddenSize:0,hiddenSize:h,vHiddenSize:A,headSize:x,vHeadSize:Math.floor(A/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:S,scale:t.scale,broadcastResPosBias:T,passPastInKv:I,qkvFormat:$}},_d=e=>J({...e}),vd=J({perm:[0,2,1,3]}),vf=(e,t,r,n,o,i,a)=>{let d=[n,o,i],l=k.size(d),c=[{type:12,data:l},{type:12,data:a},{type:12,data:i}],m=u=>{let h=R("qkv_with_bias",t.dataType,d),w=E("qkv",t.dataType,d),g=E("bias",r.dataType,d),y=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${u.registerUniforms(y).declareVariables(w,g,h)}
  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:d,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:m},{inputs:[t,r],outputs:[-1]})[0]},nr=(e,t,r,n,o,i,a,d)=>{let l=i;if(a&&k.size(a.dims)>0){if(n===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=vf(e,i,a,t,n,r*o,d),l=l.reshape([t,n,r,o]),e.compute(Ue(l,vd.perm),{inputs:[l],outputs:[-1]})[0]}else return i.dims.length===3&&(l=i.reshape([t,n,r,o])),e.compute(Ue(l,vd.perm),{inputs:[l],outputs:[-1]})[0]},$d=(e,t)=>{let r=wf(e.inputs,t),n=e.inputs[0],o=Ve(e.inputs,1),i=Ve(e.inputs,2),a=Ve(e.inputs,3),d=Ve(e.inputs,4),l=Ve(e.inputs,5),c=Ve(e.inputs,6),m=Ve(e.inputs,7);if(n.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let u=o&&i&&o.dims.length===4&&i.dims.length===4,h=nr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,a,0);if(u)return Nt(e,h,o,i,d,void 0,c,m,l,r,t);if(!o||!i)throw new Error("key and value must be provided");let w=nr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,a,r.hiddenSize),g=nr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,a,2*r.hiddenSize);Nt(e,h,w,g,d,void 0,c,m,l,r,t)}});var xd,_f,$f,bo,Sd,wo=U(()=>{"use strict";Z();ee();re();xd=e=>Array.from(e.getBigInt64Array(),Number),_f=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(xd(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},$f=(e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r},bo=(e,t)=>{let r=e[0].dims,n=t??xd(e[1]),o=$f(r,n),i=k.size(o),a=e[0].dataType,d=E("input",a,r.length),l=R("output",a,o.length),c=m=>`
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
    }`;return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...V(e[0].dims,o)]}),getShaderSource:c}},Sd=e=>{_f(e.inputs),e.compute(bo(e.inputs),{inputs:[0]})}});var xf,Id,Ad,Sf,Cd,Td,kd=U(()=>{"use strict";Z();ee();Ie();Fr();re();yo();wo();Tt();xf=(e,t)=>{let r=e[0],n=e[1],o=e[2],i=e[3],a=e[4];if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let d=!1,l=r.dims[0],c=r.dims[1],m=r.dims.length===3?d?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],u=c,h=0,w=0,g=Math.floor(m/t.numHeads),y=i&&i.dims.length!==0,x=a&&a.dims.length!==0,$=!0;if(y&&x){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');$?(h=i.dims[1],w=i.dims[1]):(h=i.dims[2],w=i.dims[2])}else if(y||x)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let _;if(n){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(r.dims[2]%n.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');_=2,u=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==g)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');_=5,u=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==g)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');_=0,u=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');_=3}let S=0,I=!1,A=m;if(o){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(u!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');A=o.dims[2]}else{if(u!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');A=o.dims[1]*o.dims[3],I=!0}}let T=h+u,O=!1;return{batchSize:l,sequenceLength:c,pastSequenceLength:h,kvSequenceLength:u,totalSequenceLength:T,maxSequenceLength:w,inputHiddenSize:0,hiddenSize:m,vHiddenSize:A,headSize:g,vHeadSize:Math.floor(A/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:S,scale:t.scale,broadcastResPosBias:O,passPastInKv:I,qkvFormat:_,isPastkvBSNH:$}},Id=(e,t,r,n)=>{let o=[n.batchSize,n.totalSequenceLength,n.kvNumHeads,n.headSize],i=4,a=k.size(o)/i,d=n.totalSequenceLength,l=R("present_kv",r,o.length,i),c=E("new_kv",e.dataType,e.dims.length,i),m=t?E("past_kv",t.dataType,t.dims.length,i):void 0,u=Math.ceil(n.headSize/i),h={x:d,y:e.dims[0],z:1},w=t?["rank","rank"]:["rank"],g=[{type:12,data:a},{type:12,data:n.pastSequenceLength},{type:12,data:n.kvSequenceLength},{type:12,data:n.totalSequenceLength}],y=[c];m?(g.push(...V(e.dims),...V(t.dims),...V(o)),y.push(m)):g.push(...V(e.dims),...V(o));let x=[{name:"output_size",type:"u32"},{name:"past_seqlen",type:"u32"},{name:"new_seqlen",type:"u32"},{name:"present_seqlen",type:"u32"}],$=`      let past_batch_stride = uniforms.past_seqlen * num_heads * H;
        var past_head_stride = uniforms.past_seqlen * H;
        if (is_bsnh) {
          past_head_stride = H;
        }
        let in_offset = b * past_batch_stride + s * row_stride + n * past_head_stride + h;
        present_kv[out_offset] = past_kv[in_offset];`,_=`      let new_batch_stride = uniforms.new_seqlen * num_heads * H;
        let new_row_stride = num_heads * H;
        let new_head_stride = H;
        let in_offset = b * new_batch_stride + (s - past_seqlen) * new_row_stride + n * new_head_stride + h;
        present_kv[out_offset] = new_kv[in_offset];`,S=t?`if (s < past_seqlen) {
        ${$}
        } else if (s < past_seqlen + uniforms.new_seqlen) {
        ${_}
        }`:`if (s < past_seqlen + uniforms.new_seqlen) {
          ${_}
        }`,I=A=>`

  ${A.registerUniforms(x).declareVariables(...y,l)}
  ${A.mainStart([u,n.kvNumHeads,1])}
    ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
    ${S}
  }`;return{name:"ConcatPastNew",shaderCache:{hint:`${n.kvNumHeads}${u}${!!t}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:o,dataType:r}],dispatchGroup:h,programUniforms:g}),getShaderSource:I}},Ad=e=>J({...e}),Sf=J({perm:[0,2,1,3]}),Cd=(e,t,r,n,o)=>{let i=t,a=n.kvNumHeads,d=n.nReps;return t.dims.length===3&&n.kvSequenceLength!==0&&(i=t.reshape([n.batchSize,n.kvSequenceLength,a,n.headSize])),r?i=e.compute(Id(i,r,i.dataType,n),{inputs:[i,r],outputs:[n.isPastkvBSNH?o:-1]})[0]:i=e.compute(Id(i,void 0,i.dataType,n),{inputs:[i],outputs:[n.isPastkvBSNH?o:-1]})[0],d!==1&&(i=e.compute(bo([i],[1,1,1,d]),{inputs:[i],outputs:[-1]})[0],i=i.reshape([n.batchSize,n.totalSequenceLength,a*d,n.headSize])),e.compute(Ue(i,Sf.perm),{inputs:[i],outputs:[-1]})[0]},Td=(e,t)=>{let r=xf(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let n=nr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,e.inputs[0],void 0,0),o=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,i=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,a=Cd(e,e.inputs[1],o,r,1),d=Cd(e,e.inputs[2],i,r,2);Nt(e,n,a,d,void 0,void 0,void 0,void 0,void 0,r,t)}});var If,Cf,Af,Ed,Pd=U(()=>{"use strict";Z();ee();re();If=(e,t)=>{let r=e[0].dims,n=r,o=2,i=k.sizeToDimension(r,o),a=k.sizeFromDimension(r,o),d=ve(a),l=a/d,c=[r[0],r[1],l],m=["rank","type","type"],u=[{type:12,data:a},{type:12,data:l}];u.push(...V(c,c));let h=w=>{let g=E("x",e[0].dataType,c.length,d),y=E("scale",e[1].dataType,e[1].dims),x=E("bias",e[2].dataType,e[2].dims),$=R("output",e[0].dataType,c.length,d),_=[g,y,x,$],S=g.type.value,I=d===1?"f32":`vec${d}<f32>`,A=64,T=[{name:"normSize",type:"u32"},{name:"normPackedSize",type:"u32"}];return`
  var<workgroup> meanShared : f32;
  var<workgroup> squaredNormShared : f32;
  var<workgroup> workgroupShared : array<${I}, ${A}>;
  const workgroupSize = ${A}u;
  ${w.registerUniforms(T).declareVariables(..._)}
  ${w.mainStart(A)}
    let norm = global_idx / workgroupSize;
    let batch = norm / uniforms.x_shape[1];
    let channel = norm % uniforms.x_shape[1];
    let localIndex = local_id.x;

    // initialize workgroup memory
    var initial = ${I}(0);
    for (var h = localIndex; h < uniforms.normPackedSize; h += workgroupSize) {
      initial = initial + ${I}(${g.get("batch","channel","h")});
    }
    workgroupShared[localIndex] = initial;
    workgroupBarrier();

    // Calculate the mean of current channel data.
    for (var currSize = workgroupSize >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (localIndex < currSize) {
        workgroupShared[localIndex] = workgroupShared[localIndex] + workgroupShared[localIndex + currSize];
      }
      workgroupBarrier();
    }
    if (localIndex == 0) {
      meanShared = ${Xe("workgroupShared[0]",d)} / f32(uniforms.normSize);
    }
    workgroupBarrier();

    // reinitialize workgroup memory.
    initial = ${I}(0);
    for (var h = localIndex; h < uniforms.normPackedSize; h += workgroupSize) {
      let deviation =  ${I}(${g.get("batch","channel","h")}) - ${I}(meanShared);
      initial = initial + deviation * deviation;
    }
    workgroupShared[localIndex] = initial;
    workgroupBarrier();

    // Calculate the sum of square of deviation of current channel data.
    for (var currSize = workgroupSize >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (localIndex < currSize) {
        workgroupShared[localIndex] = workgroupShared[localIndex] + workgroupShared[localIndex + currSize];
      }
      workgroupBarrier();
    }
    if (localIndex == 0) {
      squaredNormShared = ${Xe("workgroupShared[0]",d)};
    }
    workgroupBarrier();

    let invStdDev = inverseSqrt(squaredNormShared / f32(uniforms.normSize) + f32(${t.epsilon}));
    let channelScale = invStdDev * f32(${y.getByOffset("channel")});
    let channelShift = f32(${x.getByOffset("channel")}) - meanShared * channelScale;
    for (var h = localIndex; h < uniforms.normPackedSize; h += workgroupSize) {
      let value = ${g.get("batch","channel","h")} * ${S}(${I}(channelScale)) + ${S}(${I}(channelShift));
      ${$.set("batch","channel","h","value")};
    }
  }`};return{name:"InstanceNormalization",shaderCache:{hint:`${t.epsilon};${d}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:i},programUniforms:u}),getShaderSource:h}},Cf=(e,t,r,n,o,i,a,d)=>{let l=ve(a),c=64,m=l===1?"vec2f":`mat2x${l}f`,u=l===1?"f32":`vec${l}f`,h=(T,O)=>`${m}(${T}, ${O})`,w=o*a/l,g=Math.ceil(i/c),y=["type"],x=[{type:12,data:g},{type:12,data:i},{type:12,data:Math.floor(a/l)},{type:12,data:Math.floor(i*a/l)}],$=T=>{let O=E("input",t.dataType,t.dims,l);return`
  ${T.declareVariables(O)}
  @group(0) @binding(1) var<storage, read_write> output : array<${m}>;
  struct Uniforms {wg_size:u32, H:u32, C:u32, image_size:u32};
  @group(0) @binding(2) var<uniform> uniforms: Uniforms;

  ${T.mainStart(c)}
    let currentImageNumber = global_idx / ${c} / uniforms.C;
    let currentChannelNumber = (global_idx / ${c}) % uniforms.C;
    let wgOffset = local_id.x * uniforms.wg_size;
    if (wgOffset >= uniforms.H) {
        return;
    }
    let wgMax = min(wgOffset + uniforms.wg_size, uniforms.H);

    let offset = currentImageNumber * uniforms.image_size + currentChannelNumber;
    var sum = ${gt("f32",l)};
    var squaredSum = ${gt("f32",l)};
    for (var i: u32 = wgOffset; i < wgMax; i++) {
        let value = ${u}(input[offset + i * uniforms.C]);
        sum += value;
        squaredSum += value * value;
    }
    output[global_idx] = ${h("sum","squaredSum")};
  }`},_=e.compute({name:"InstanceNormComputeMean",shaderCache:{hint:`${l}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:[o,a,c,2],dataType:1}],dispatchGroup:{x:o*a/l},programUniforms:x}),getShaderSource:$},{inputs:[t],outputs:[-1]})[0],S=[{type:12,data:w},{type:12,data:i},{type:12,data:Math.floor(a/l)},{type:12,data:Math.floor(c*a/l)}],I=["type","type","type"],A=T=>{let O=E("scale",r.dataType,r.dims,l),B=E("bias",n.dataType,n.dims,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${m}>;
  @group(0) @binding(1) var<storage, read> scale : array<${O.type.storage}>;
  @group(0) @binding(2) var<storage, read> bias : array<${B.type.storage}>;
  @group(0) @binding(3) var<storage, read_write> output : array<${m}>;
  struct Uniforms {units_of_work : u32, H: u32, C : u32, image_size : u32};
  @group(0) @binding(4) var<uniform> uniforms: Uniforms;

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.units_of_work")}
    let currentImageNumber = global_idx / uniforms.C;
    let currentChannelNumber = global_idx % uniforms.C;

    let offset = currentImageNumber * uniforms.image_size;
    var sum = ${gt("f32",l)};
    var squaredSum = ${gt("f32",l)};
    for (var i: u32 = 0; i < min(${c}, uniforms.H); i++) {
        let value = input[offset + i + currentChannelNumber * ${c}];
        sum += value[0];
        squaredSum += value[1];
    }
    sum = sum / f32(uniforms.H);
    squaredSum = squaredSum / f32(uniforms.H);
    let invStdDev = inverseSqrt(squaredSum - sum * sum + f32(${d}));
    let channelScale = invStdDev * ${u}(scale[currentChannelNumber]);
    let channelShift = ${u}(bias[currentChannelNumber]) - sum * channelScale;

    output[global_idx] = ${h("channelScale","channelShift")};
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${d}`,inputDependencies:I},getRunData:()=>({outputs:[{dims:[o,a,2],dataType:1}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:S}),getShaderSource:A},{inputs:[_,r,n],outputs:[-1]})[0]},Af=(e,t,r)=>{let n=t[0].dims,o=n,i=n[0],a=n[n.length-1],d=k.sizeFromDimension(n,1)/a,l=ve(a),c=k.size(o)/l,m=[{type:12,data:d},{type:12,data:Math.floor(a/l)}],u=["type","type"],h=Cf(e,t[0],t[1],t[2],i,d,a,r.epsilon),w=g=>{let y=ge(t[0].dataType),x=l===1?"vec2f":`mat2x${l}f`,$=l===1?y:`vec${l}<${y}>`,_=E("input",t[0].dataType,t[0].dims,l),S=R("output",t[0].dataType,o,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${_.type.storage}>;
  @group(0) @binding(1) var<storage, read> scaleInput : array<${x}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${S.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${g.mainStart()}
    let currentImageNumber = global_idx / (uniforms.C * uniforms.H);
    let currentChannelNumber = global_idx % uniforms.C;

    let scaleOffset = currentImageNumber * uniforms.C + currentChannelNumber;
    let scale = scaleInput[scaleOffset];
    output[global_idx] = fma(input[global_idx], ${$}(scale[0]), ${$}(scale[1]));
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:m}),getShaderSource:w},{inputs:[t[0],h]})},Ed=(e,t)=>{t.format==="NHWC"?Af(e,e.inputs,t):e.compute(If(e.inputs,t))}});var Tf,kf,zd,Od=U(()=>{"use strict";Z();ee();re();Tf=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},kf=(e,t,r)=>{let n=t.simplified,o=e[0].dims,i=e[1],a=!n&&e[2],d=o,l=k.normalizeAxis(t.axis,o.length),c=k.sizeToDimension(o,l),m=k.sizeFromDimension(o,l),u=k.size(i.dims),h=a?k.size(a.dims):0;if(u!==m||a&&h!==m)throw new Error(`Size of X.shape()[axis:] == ${m}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${u} and bias size of ${h}`);let w=[];for(let A=0;A<o.length;++A)A<l?w.push(o[A]):w.push(1);let g=ve(m),y=["type","type"],x=[{type:12,data:c},{type:1,data:m},{type:12,data:Math.floor(m/g)},{type:1,data:t.epsilon}];a&&y.push("type");let $=r>1,_=r>2,S=A=>{let T=ge(e[0].dataType),O=[E("x",e[0].dataType,e[0].dims,g),E("scale",i.dataType,i.dims,g)];a&&O.push(E("bias",a.dataType,a.dims,g)),O.push(R("output",e[0].dataType,d,g)),$&&O.push(R("mean_data_output",1,w)),_&&O.push(R("inv_std_output",1,w));let B=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${A.registerUniforms(B).declareVariables(...O)}
  ${A.mainStart()}
    ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${gt("f32",g)};
    var mean_square_vector = ${gt("f32",g)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${At(T,g,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Xe("mean_vector",g)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Xe("mean_square_vector",g)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${At(T,g,"x[j + offset]")};
      let f32scale = ${At(T,g,"scale[j]")};
      output[j + offset] = ${O[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${At(T,g,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${_?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},I=[{dims:d,dataType:e[0].dataType}];return $&&I.push({dims:w,dataType:1}),_&&I.push({dims:w,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${g};${r};${n}`,inputDependencies:y},getRunData:()=>({outputs:I,dispatchGroup:{x:Math.ceil(c/64)},programUniforms:x}),getShaderSource:S}},zd=(e,t)=>{Tf(e.inputs),e.compute(kf(e.inputs,t,e.outputCount))}});var Ef,Pf,Dd,Bd,Rd=U(()=>{"use strict";Z();ee();Ie();re();Ef=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),i=t.blockSize/8*t.bits,a=e[1];if(!k.areEqual(a.dims,[t.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let l=e[2].dims;if(k.size(l)!==t.n*o)throw new Error("scales input size error.");if(e.length===4){let m=e[3].dims,u=t.bits>4?t.n*o:t.n*Math.floor((o+1)/2);if(k.size(m)!==u)throw new Error("zeroPoints input size error.")}},Pf=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],i=t.k,a=t.n,d=r.slice(0,n-2),l=k.size(d),m=e[1].dims[2]/4,u=e[0].dataType,h=ve(t.k),w=ve(m),g=ve(a),y=d.concat([o,a]),x=o>1&&a/g%2===0?2:1,$=k.size(y)/g/x,_=64,S=[],I=[l,o,i/h],A=k.convertShape(e[1].dims).slice();A.splice(-1,1,m/w),S.push(...V(I)),S.push(...V(A)),S.push(...V(e[2].dims)),e.length===4&&S.push(...V(k.convertShape(e[3].dims)));let T=[l,o,a/g];S.push(...V(T));let O=B=>{let N=I.length,H=E("a",e[0].dataType,N,h),K=E("b",12,A.length,w),X=E("scales",e[2].dataType,e[2].dims.length),ne=[H,K,X],oe=e.length===4?E("zero_points",12,e[3].dims.length):void 0;oe&&ne.push(oe);let le=T.length,Y=R("output",e[0].dataType,le,g),pe=ge(e[0].dataType),ce=(()=>{switch(h){case 1:return`array<${pe}, 8>`;case 2:return`mat4x2<${pe}>`;case 4:return`mat2x4<${pe}>`;default:throw new Error(`${h}-component is not supported.`)}})(),Q=()=>{let ie=`
          // reuse a data
            var input_offset = ${H.indicesToOffset(`${H.type.indices}(batch, row, word_offset)`)};
            var a_data: ${ce};
            for (var j: u32 = 0; j < ${8/h}; j++) {
              a_data[j] = ${H.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let se=0;se<g*x;se++)ie+=`
            b_value = ${w===1?`b${se}_data`:`b${se}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${ce}(${Array.from({length:4},(M,F)=>`${pe}(b_value_lower[${F}]), ${pe}(b_value_upper[${F}])`).join(", ")});
            b_dequantized_values = ${(()=>h===1?`${ce}(${Array.from({length:8},(M,F)=>`(b_quantized_values[${F}] - ${oe?`zero_point${se}`:"zero_point"}) * scale${se}`).join(", ")});`:`(b_quantized_values - ${ce}(${Array(8).fill(`${oe?`zero_point${se}`:"zero_point"}`).join(",")})) * scale${se};`)()};
            workgroup_shared[local_id.x * ${x} + ${Math.floor(se/g)}]${g>1?`[${se%g}]`:""} += ${Array.from({length:8/h},(M,F)=>`${h===1?`a_data[${F}] * b_dequantized_values[${F}]`:`dot(a_data[${F}], b_dequantized_values[${F}])`}`).join(" + ")};
          `;return ie},be=()=>{let ie=`
            var col_index = col * ${g};
            ${oe?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${pe}(8);`}
            `;for(let se=0;se<g*x;se++)ie+=`
            let scale${se} = ${X.getByOffset("col_index * nBlocksPerCol + block")};
            ${oe?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${oe.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${se} = ${pe}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return ie},ae=()=>{let ie=`col_index = col * ${g};`;for(let se=0;se<g*x;se++)ie+=`
            let b${se}_data = ${K.getByIndices(`${K.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return ie+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ce};
            var b_dequantized_values: ${ce};`,ie};return`
        var<workgroup> workgroup_shared: array<${Y.type.value}, ${x*_}>;
        ${B.declareVariables(...ne,Y)}
        ${B.mainStart([_,1,1])}
          let output_indices = ${Y.offsetToIndices(`(global_idx / ${_}) * ${x}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${_}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/h};
            ${be()}
            for (var word: u32 = 0; word < ${m}; word += ${w}) {
              ${ae()}
              for (var i: u32 = 0; i < ${w}; i++) {
                ${Q()}
                word_offset += ${8/h};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${x}) {
            var output_value: ${Y.type.value} = ${Y.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${_}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${x};
            }
            ${Y.setByIndices(`${Y.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${h};${w};${g};${x};${_}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:u}],dispatchGroup:{x:$},programUniforms:S}),getShaderSource:O}},Dd=(e,t)=>{Ef(e.inputs,t),e.compute(Pf(e.inputs,t))},Bd=e=>J(e)});var zf,Of,Df,Bf,Rf,Mf,Uf,Vf,Md,Ud=U(()=>{"use strict";Z();ee();re();zf=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Of=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
            k = i32(${e.indicesGet("indices",o)}) - ${L("uniforms.pads",o,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${L("uniforms.x_shape",o,t)})) {
              break;
            }
            offset += k * i32(${L("uniforms.x_strides",o,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${n}
            value = x[offset];
          }
      `},Df=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${L("uniforms.pads",o,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${L("uniforms.x_shape",o,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${L("uniforms.x_shape",o,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${L("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},Bf=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${L("uniforms.pads",o,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${L("uniforms.x_shape",o,t)})) {
                  k = i32(${L("uniforms.x_shape",o,t)}) - 1;
                }
                offset += k * i32(${L("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},Rf=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${L("uniforms.pads",o,r)};
                if (k < 0)  {
                  k += i32(${L("uniforms.x_shape",o,t)}]);
                }
                if (k >= i32(${L("uniforms.x_shape",o,t)})) {
                  k -= i32(${L("uniforms.x_shape",o,t)});
                }
                offset += k * i32(${L("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},Mf=(e,t,r)=>{switch(r.mode){case 0:return Of(e,t,r.pads.length);case 1:return Df(e,t,r.pads.length);case 2:return Bf(e,t,r.pads.length);case 3:return Rf(e,t,r.pads.length);default:throw new Error("Invalid mode")}},Uf=(e,t)=>{let r=k.padShape(e[0].dims.slice(),t.pads),n=e[0].dims,o=k.size(r),i=[{type:12,data:o},{type:6,data:t.pads}],a=e.length>=3&&e[2].data;t.mode===0&&i.push({type:a?e[2].dataType:1,data:t.value}),i.push(...V(e[0].dims,r));let d=["rank"],l=c=>{let m=R("output",e[0].dataType,r.length),u=E("x",e[0].dataType,n.length),h=u.type.value,w=Mf(m,n.length,t),g=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&g.push({name:"constant_value",type:a?h:"f32"}),`
            ${c.registerUniforms(g).declareVariables(u,m)}
            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${m.offsetToIndices("global_idx")};

            var value = ${h}(0);
            ${w}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${a}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(r)/64)},programUniforms:i}),getShaderSource:l}},Vf=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,o=e[0].dims.length,i=new Int32Array(2*o).fill(0);if(e.length>=4){let d=e[3].getBigInt64Array();for(let l=0;l<d.length;l++)i[Number(d[l])]=Number(r[l]),i[Number(d[l])+o]=Number(r[l+d.length])}else r.forEach((d,l)=>i[Number(l)]=Number(d));let a=[];return i.forEach(d=>a.push(d)),{mode:t.mode,value:n,pads:a}}else return t},Md=(e,t)=>{zf(e.inputs);let r=Vf(e.inputs,t);e.compute(Uf(e.inputs,r),{inputs:[0]})}});var en,Vd,Nd,Wd,Hd,Nf,Wf,Gd,Ld,Fd,qd,jd,Kd,Yd,Xd,Zd,Qd,Jd,el,tl=U(()=>{"use strict";Ke();Z();ee();re();en=e=>{if(ye.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Vd=(e,t,r)=>{let n=t.format==="NHWC",o=e.dims.slice();n&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(t,"dilations"),a=t.kernelShape.slice(),d=t.strides.slice(),l=i?t.dilations.slice():[],c=t.pads.slice();It.adjustPoolAttributes(r,o,a,d,l,c);let m=It.computePoolOutputShape(r,o,d,l,a,c,t.autoPad),u=Object.assign({},t);i?Object.assign(u,{kernelShape:a,strides:d,pads:c,dilations:l,cacheKey:t.cacheKey}):Object.assign(u,{kernelShape:a,strides:d,pads:c,cacheKey:t.cacheKey});let h=m.slice();return h.push(h.splice(1,1)[0]),[u,n?h:m]},Nd=(e,t)=>{let r=t.format==="NHWC",n=k.size(e),o=k.size(t.kernelShape),i=[{type:12,data:n},{type:12,data:o}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let d=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],c=t.pads[t.pads.length/2-1],m=t.pads[t.pads.length-1],u=!!(c+m);i.push({type:12,data:d},{type:12,data:l},{type:12,data:c},{type:12,data:m}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let h=!1;if(t.kernelShape.length===2){let w=t.kernelShape[t.kernelShape.length-2],g=t.strides[t.strides.length-2],y=t.pads[t.pads.length/2-2],x=t.pads[t.pads.length-2];h=!!(y+x),i.push({type:12,data:w},{type:12,data:g},{type:12,data:y},{type:12,data:x}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,u,h]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let d=k.computeStrides(t.kernelShape);i.push({type:12,data:d},{type:12,data:t.pads},{type:12,data:t.strides}),a.push({name:"kernelStrides",type:"u32",length:d.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((c,m)=>c+m);return[i,a,!!l,!1,!1]}},Wd=(e,t,r,n,o,i,a,d,l,c,m,u)=>{let h=o.format==="NHWC",w=t.type.value,g=R("output",t.type.tensor,n);if(o.kernelShape.length<=2){let y="",x="",$="",_=r-(h?2:1);if(m?y=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${_}] < 0 || xIndices[${_}]
                      >= uniforms.x_shape[${_}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`:y=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let I=r-(h?3:2);u?x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${I}] < 0 || xIndices[${I}] >= uniforms.x_shape[${I}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
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
              ${x}
              ${y}
              ${$}
              ${a}

              output[global_idx] = value;
            }`}else{if(h)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let y=o.kernelShape.length,x=o.pads.length,$="";return c?$=`
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
                  offsets[j] = offset / ${L("uniforms.kernelStrides","j",y)};
                  offset -= offsets[j] * ${L("uniforms.kernelStrides","j",y)};
                }
                offsets[${y-1}] = offset;

                isPad = false;
                for (var j = ${r-y}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${L("uniforms.strides",`j - ${r-y}u`,y)}
                    + offsets[j - ${r-y}u] - ${L("uniforms.pads","j - 2u",x)};
                  ${$}
              }
              ${a}

              output[global_idx] = value;
            }`}},Hd=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Nf=e=>`${Hd(e)};${e.countIncludePad}`,Wf=e=>`${Hd(e)};${e.storageOrder};${e.dilations}`,Gd=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Ld=(e,t,r,n)=>{let[o,i]=Vd(t,n,r),a=E("x",t.dataType,t.dims.length),d=a.type.value,l="value += x_val;",c="";o.countIncludePad?c+=`value /= ${d}(uniforms.kernelSize);`:c+=`value /= ${d}(i32(uniforms.kernelSize) - pad);`;let[m,u,h,w,g]=Nd(i,o);m.push(...V(t.dims,i));let y=["rank"];return{name:e,shaderCache:{hint:`${n.cacheKey};${h};${w};${g}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:m}),getShaderSource:x=>Wd(x,a,t.dims.length,i.length,o,l,c,0,u,h,w,g)}},Fd=e=>{let t=e.count_include_pad!==0,r=Gd(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:t,...r,cacheKey:""};return{...n,cacheKey:Nf(n)}},qd=(e,t)=>{en(e.inputs),e.compute(Ld("AveragePool",e.inputs[0],!1,t))},jd={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Kd=e=>{let t=e.format;return{format:t,...jd,cacheKey:t}},Yd=(e,t)=>{en(e.inputs),e.compute(Ld("GlobalAveragePool",e.inputs[0],!0,t))},Xd=(e,t,r,n)=>{let[o,i]=Vd(t,n,r),a=`
      value = max(x_val, value);
    `,d="",l=E("x",t.dataType,t.dims.length),c=["rank"],[m,u,h,w,g]=Nd(i,o);return m.push(...V(t.dims,i)),{name:e,shaderCache:{hint:`${n.cacheKey};${h};${w};${g}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:m}),getShaderSource:y=>Wd(y,l,t.dims.length,i.length,o,a,d,t.dataType===10?-65504:-1e5,u,h,w,g)}},Zd=(e,t)=>{en(e.inputs),e.compute(Xd("MaxPool",e.inputs[0],!1,t))},Qd=e=>{let t=e.storage_order,r=e.dilations,n=Gd(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:r,...n,cacheKey:""};return{...o,cacheKey:Wf(o)}},Jd=e=>{let t=e.format;return{format:t,...jd,cacheKey:t}},el=(e,t)=>{en(e.inputs),e.compute(Xd("GlobalMaxPool",e.inputs[0],!0,t))}});var Gf,Lf,rl,nl,ol=U(()=>{"use strict";Z();ee();Ie();re();Gf=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,n)=>r===e[2].dims[n]).reduce((r,n)=>r&&n,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((o,i)=>i===t.axis||o===e[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],n=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/n)||t.blockSize>Math.ceil(r/(n-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Lf=(e,t)=>{let r=k.normalizeAxis(t.axis,e[0].dims.length),n=e[0].dataType,o=n===3,i=e[0].dims,a=e[1].dataType,d=k.size(i),l=n===3||n===2,c=l?[Math.ceil(k.size(e[0].dims)/4)]:e[0].dims,m=e[1].dims,u=e.length>2?e[2]:void 0,h=u?l?[Math.ceil(k.size(u.dims)/4)]:u.dims:void 0,w=m.length===0||m.length===1&&m[0]===1,g=w===!1&&m.length===1,y=ve(d),x=w&&(!l||y===4),$=x?y:1,_=x&&!l?y:1,S=E("input",l?12:n,c.length,_),I=E("scale",a,m.length),A=u?E("zero_point",l?12:n,h.length):void 0,T=R("output",a,i.length,$),O=[S,I];A&&O.push(A);let B=[c,m];u&&B.push(h);let N=[{type:12,data:d/$},{type:12,data:r},{type:12,data:t.blockSize},...V(...B,i)],H=K=>{let X=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${K.registerUniforms(X).declareVariables(...O,T)}
      ${K.mainStart()}
          ${K.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${T.offsetToIndices("global_idx")};

          // Set input x
          ${(()=>l?`
            let input = ${S.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${$===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${S.getByOffset("global_idx")};`)()};

          // Set scale input
          ${(()=>w?`let scale_value= ${I.getByOffset("0")}`:g?`
            let scale_index = ${T.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${I.getByOffset("scale_index")};`:`
            var scale_indices: ${I.type.indices} = output_indices;
            let index = ${I.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${I.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${I.getByIndices("scale_indices")};`)()};

          // Set zero-point input
          ${(()=>A?w?l?`
                let zero_point_input = ${A.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${A.getByOffset("0")}`:g?l?`
                let zero_point_index = ${T.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${A.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${T.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${A.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${I.indicesToOffset("scale_indices")};
                let zero_point_input = ${A.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${A.getByIndices("scale_indices")};`:`let zero_point_value = ${l?o?"i32":"u32":S.type.value}(0);`)()};
      // Compute and write output
      ${T.setByOffset("global_idx",`${T.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:A?["rank","rank","rank"]:["rank","rank"]},getShaderSource:H,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(d/$/64),y:1,z:1},programUniforms:N})}},rl=(e,t)=>{Gf(e.inputs,t),e.compute(Lf(e.inputs,t))},nl=e=>J({axis:e.axis,blockSize:e.blockSize})});var Ff,qf,il,al=U(()=>{"use strict";Ke();Z();re();Ff=(e,t,r)=>{let n=e===t,o=e<t&&r<0,i=e>t&&r>0;if(n||o||i)throw new Error("Range these inputs' contents are invalid.")},qf=(e,t,r,n)=>{let o=Math.abs(Math.ceil((t-e)/r)),i=[o],a=o,d=[{type:12,data:a},{type:n,data:e},{type:n,data:r},...V(i)],l=c=>{let m=R("output",n,i.length),u=m.type.value,h=[{name:"outputSize",type:"u32"},{name:"start",type:u},{name:"delta",type:u}];return`
        ${c.registerUniforms(h).declareVariables(m)}
        ${c.mainStart()}
        ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${u}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:i,dataType:n}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d})}},il=e=>{let t=0,r=0,n=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],n=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],n=e.inputs[2].getFloat32Array()[0]),ye.webgpu.validateInputContent&&Ff(t,r,n),e.compute(qf(t,r,n,e.inputs[0].dataType),{inputs:[]})}});var jf,Kf,Yf,Xf,Zf,Qf,Jf,eh,th,rh,nh,sl,oh,ih,ah,sh,uh,ul,dl,ll=U(()=>{"use strict";Z();ee();Ie();re();jf=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Kf=(e,t,r)=>{t.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let n=new Array(r).fill(1);return t.forEach((o,i)=>n[o]=e[i]),n},Yf=(e,t,r,n,o,i)=>{let[a,d,l]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],c=e[0].dims.length;if(a>0&&e.length>a&&e[a].dims.length>0)e[a].getFloat32Array().forEach(m=>i.push(m));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(d>0&&e.length>d&&e[d].dims.length>0){if(e[d].getFloat32Array().forEach(m=>n.push(m)),n.length!==0&&n.length!==c&&r>=18&&n.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");jf(n,t),t.axes.length>0&&Kf(n,t.axes,c).forEach((m,u)=>n[u]=m)}if(l>0&&e.length>l&&(e[l].getBigInt64Array().forEach(m=>o.push(Number(m))),o.length!==c||r>=18&&o.length===t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(n.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof n<"u"&&typeof o<"u"&&n.length>0&&o.length>c)throw new Error("Resize requires only of scales or sizes to be specified")},Xf=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Zf=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Qf=(e,t,r)=>{let n=new Array(r).fill(0).concat(new Array(r).fill(1)),o=e.length===0?n:e.slice();return t.length>0?(t.forEach((i,a)=>{n[i]=o[a],n[a+r]=o[t.length+a]}),n):o},Jf=(e,t,r,n)=>{let o=[];if(r.length>0)if(n.length>0){if(e.forEach(i=>o.push(i)),Math.max(...n)>e.length)throw new Error("axes is out of bound");n.forEach((i,a)=>o[i]=r[a])}else r.forEach(i=>o.push(i));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");o=e.map((i,a)=>Math.round(i*t[a]))}return o},eh=(e,t,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>t[i]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>t[i]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return r.axes.length>0?(r.axes.forEach(i=>t[i]=n),r.axes.forEach(i=>o[i]=Math.round(e[i]*t[i]))):(t.fill(n,0,t.length),o.forEach((i,a)=>o[a]=Math.round(i*t[a]))),o},th=(e,t,r,n,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${L("uniforms.scales","i",n)};
        var roi_low = ${L("uniforms.roi","i",o)};
        var roi_hi = ${L("uniforms.roi",`i + ${t.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${L("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${L("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,rh=(e,t,r,n,o,i,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${L("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${L("uniforms.roi","i",i)};
          var roi_hi = ${L("uniforms.roi",`i + ${r.length}`,i)};
          var input_shape_i = ${L("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${L("uniforms.output_shape","i",n.length)};
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
    }`,nh=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${L("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,sl=(e,t,r,n)=>e.rank>n?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",oh=(e,t,r,n,o)=>{let[a,d,l,c]=r.length===2?[-1,0,1,-1]:[0,2,3,1],m=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${m} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",d,`max(0, min(row, ${r[d]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(col, ${r[l]} - 1))`)};
      ${sl(e,c,a,2)}
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
    }`},ih=(e,t,r,n,o,i,a,d,l,c)=>{let m=r.length===2,u=!0,[h,w]=m?[0,1]:u?[2,3]:[1,2],g=e.type.value,y=x=>{let $=x===h?"row":"col";return`
      fn ${$}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${g} {
        var output_index = ${t.indicesGet("output_indices",x)};
        var originalIdx: ${g} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[x]},
        ${n[x]}, ${r[x]}, ${i[x]}, ${i[x]} + ${r.length});
        var fractOriginalIdx: ${g} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${d} && (originalIdx < 0 || originalIdx > (${r[x]} - 1))) {
          return ${l};
        }
        var data: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${$}: ${g} = originalIdx + ${g}(i);
          if (${$} < 0 || ${$} >= ${r[x]}) {
            ${(()=>c?`coefs[i + 1] = 0.0;
                        continue;`:d?`return ${l};`:`${$} = max(0, min(${$}, ${r[x]} - 1));`)()};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",x,`u32(${$})`)};
          data[i + 1] = ${x===h?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
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
    `},ah=(e,t,r,n,o)=>{let[a,d,l,c,m]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],u=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${u} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",d,`max(0, min(depth, ${r[d]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(height, ${r[l]} - 1))`)};
      ${e.indicesSet("input_indices",c,`max(0, min(width, ${r[c]} - 1))`)};
      ${sl(e,m,a,3)}
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
    }`},sh=(e,t,r,n,o,i)=>{let a=e.dims,d=Qf(i,t.axes,a.length),l=Jf(a,n,o,t.axes),c=n.slice();n.length===0&&(c=a.map((_,S)=>_===0?1:l[S]/_),t.keepAspectRatioPolicy!=="stretch"&&(l=eh(a,c,t)));let m=R("output",e.dataType,l.length),u=E("input",e.dataType,a.length),h=k.size(l),w=a.length===l.length&&a.every((_,S)=>_===l[S]),g=t.coordinateTransformMode==="tf_crop_and_resize",y=t.extrapolationValue,x=u.type.value,$=_=>`
      ${w?"":`
      ${Xf(t.coordinateTransformMode,x)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${nh(u,a)};
              ${Zf(t.nearestMode,r,x)};
              ${rh(u,m,a,l,c.length,d.length,g)};
              `;case"linear":return`
              ${th(m,a,l,c.length,d.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${oh(u,m,a,g,y)}`;if(a.length===3||a.length===5)return`${ah(u,m,a,g,y)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${ih(u,m,a,l,c,d,t.cubicCoeffA,g,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${_.registerUniform("output_size","u32").registerUniform("scales","f32",c.length).registerUniform("roi","f32",d.length).declareVariables(u,m)}
      ${_.mainStart()}
        ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${c.length>0?c:""}|${o.length>0?o:""}|${d.length>0?d:""}|${w}|${a}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},{type:1,data:c},{type:1,data:d},...V(a,l)]})}},uh=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},ul=(e,t)=>{let r=[],n=[],o=[],i=uh(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Yf(e.inputs,t,i,r,n,o),e.compute(sh(e.inputs[0],t,i,r,n,o),{inputs:[0]})},dl=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,o=e.cubicCoeffA,i=e.excludeOutside!==0,a=e.extrapolationValue,d=e.keepAspectRatioPolicy,l=e.mode,c=e.nearestMode===""?"simple":e.nearestMode;return J({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:o,excludeOutside:i,extrapolationValue:a,keepAspectRatioPolicy:d,mode:l,nearestMode:c})}});var dh,lh,cl,pl=U(()=>{"use strict";Z();ee();Ie();re();dh=(e,t)=>{let[r,n,o,i]=e,{numHeads:a,rotaryEmbeddingDim:d}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!k.areEqual(n.dims,[])&&!k.areEqual(n.dims,[1])&&n.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!k.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(d>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=r.dims[0],c=r.dims[r.dims.length-2],m=o.dims[0],u=k.sizeFromDimension(r.dims,1)/c,h=d===0?o.dims[1]*2:u/a;if(d>h)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(n.dims.length===2){if(l!==n.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(c!==n.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(h/2!==o.dims[1]&&d/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(c>m)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},lh=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:o,scale:i}=t,a=e[0].dims[0],d=k.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],c=d/l,m=e[2].dims[1],u=o===0?m*2:c/n,h=new Array(a,l,c/u,u-m),w=k.computeStrides(h),g=[{type:1,data:i},{type:12,data:h},{type:12,data:w},...e[0].dims.length===3?new Array({type:12,data:[d,c,u,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[d,u,l*u,1]}):[],...V(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],y=x=>{let $=E("input",e[0].dataType,e[0].dims.length),_=E("position_ids",e[1].dataType,e[1].dims.length),S=E("cos_cache",e[2].dataType,e[2].dims.length),I=E("sin_cache",e[3].dataType,e[3].dims.length),A=R("output",e[0].dataType,e[0].dims.length);return x.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:w.length},{name:"input_output_strides",type:"u32",length:w.length}]),`
        ${x.declareVariables($,_,S,I,A)}

        ${x.mainStart(Ct)}
          let half_rotary_emb_dim = uniforms.${S.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${_.broadcastedIndicesToOffset("bsnh.xy",R("",_.type.tensor,2))};
            let position_id =
                u32(${_.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${$.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} -
                ${$.getByOffset("j")} * ${I.get("position_id","bsnh[3]")};
            ${A.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${I.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${A.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${A.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:J({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(h)/Ct)},programUniforms:g})}},cl=(e,t)=>{dh(e.inputs,t),e.compute(lh(e.inputs,t))}});var ch,ph,ml,fl=U(()=>{"use strict";Z();ee();re();ch=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],i=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(n.dims.length!==1)throw new Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let a=e[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let a=e[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},ph=(e,t,r,n)=>{let o=t.simplified,i=e[0].dims,a=k.size(i),d=i,l=a,c=i.slice(-1)[0],m=n?i.slice(0,-1).concat(1):[],u=!o&&e.length>3,h=e.length>4,w=n&&r>1,g=n&&r>2,y=r>3,x=64,$=ve(c),_=[{type:12,data:l},{type:12,data:$},{type:12,data:c},{type:1,data:t.epsilon}],S=A=>{let T=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],O=[E("x",e[0].dataType,e[0].dims,$),E("skip",e[1].dataType,e[1].dims,$),E("gamma",e[2].dataType,e[2].dims,$)];u&&O.push(E("beta",e[3].dataType,e[3].dims,$)),h&&O.push(E("bias",e[4].dataType,e[4].dims,$)),O.push(R("output",e[0].dataType,d,$)),w&&O.push(R("mean_output",1,m)),g&&O.push(R("inv_std_output",1,m)),y&&O.push(R("input_skip_bias_sum",e[0].dataType,d,$));let B=ge(e[0].dataType),N=ge(1,$);return`

      ${A.registerUniforms(T).declareVariables(...O)}
      var<workgroup> sum_shared : array<${N}, ${x}>;
      var<workgroup> sum_squared_shared : array<${N}, ${x}>;

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
          let bias_value = ${h?"bias[offset1d + i]":B+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${y?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${At(B,$,"value")};
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
        let mean = ${Xe("sum",$)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Xe("square_sum",$)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${w?"mean_output[global_idx] = mean;":""}
        ${g?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${B}(mean)`}) *
            ${B}(inv_std_dev) * gamma[offset1d + i]
            ${u?"+ beta[offset1d + i]":""};
        }
      }`},I=[{dims:d,dataType:e[0].dataType}];return r>1&&I.push({dims:m,dataType:1}),r>2&&I.push({dims:m,dataType:1}),r>3&&I.push({dims:i,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${w};${g};${y}`,inputDependencies:e.map((A,T)=>"type")},getShaderSource:S,getRunData:()=>({outputs:I,dispatchGroup:{x:Math.ceil(l/c)},programUniforms:_})}},ml=(e,t)=>{ch(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(ph(e.inputs,t,e.outputCount,!1),{outputs:n})}});var mh,tn,fh,hl,hh,gh,gl,yl,bl=U(()=>{"use strict";Z();ee();Ie();re();mh=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw new Error(`Input ${n} must be an array of int32 or int64`)})},tn=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(n=>r.push(Number(n)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(n=>r.push(Number(n)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},fh=(e,t)=>{if(e.length>1){let r=tn(e,1),n=tn(e,2),o=tn(e,3);return o.length===0&&(o=[...Array(e[0].dims.length).keys()]),J({starts:r,ends:n,axes:o})}else return t},hl=(e,t,r,n,o)=>{let i=e;return e<0&&(i+=r[n[t]]),o[t]<0?Math.max(0,Math.min(i,r[n[t]]-1)):Math.max(0,Math.min(i,r[n[t]]))},hh=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${L("uniforms.input_shape","i",r.length)};
            let steps_i = ${L("uniforms.steps","i",r.length)};
            let signs_i = ${L("uniforms.signs","i",r.length)};
            let starts_i = ${L("uniforms.starts","i",r.length)};
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
      }`,gh=(e,t)=>{let r=e[0].dims,n=k.size(r),o=t.axes.length>0?k.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],i=tn(e,4);i.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let a=t.starts.map(($,_)=>hl($,_,r,o,i)),d=t.ends.map(($,_)=>hl($,_,r,o,i));if(o.length!==a.length||o.length!==d.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let $=0;$<r.length;++$)o.includes($)||(a.splice($,0,0),d.splice($,0,r[$]),i.splice($,0,1));let l=i.map($=>Math.sign($));i.forEach(($,_,S)=>{if($<0){let I=(d[_]-a[_])/$,A=a[_],T=A+I*i[_];a[_]=T,d[_]=A,S[_]=-$}});let c=r.slice(0);o.forEach(($,_)=>{c[$]=Math.ceil((d[$]-a[$])/i[$])});let m={dims:c,dataType:e[0].dataType},u=R("output",e[0].dataType,c.length),h=E("input",e[0].dataType,e[0].dims.length),w=k.size(c),g=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:i.length}],y=[{type:12,data:w},{type:12,data:a},{type:6,data:l},{type:12,data:i},...V(e[0].dims,c)],x=$=>`
      ${$.registerUniforms(g).declareVariables(h,u)}
        ${hh(h,u,r)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${u.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${u.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${a.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[m],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:y})}},gl=(e,t)=>{mh(e.inputs,t);let r=fh(e.inputs,t);e.compute(gh(e.inputs,r),{inputs:[0]})},yl=e=>{let t=e.starts,r=e.ends,n=e.axes;return J({starts:t,ends:r,axes:n})}});var yh,bh,wl,vl,_l=U(()=>{"use strict";Z();ee();Ie();re();yh=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},bh=(e,t)=>{let r=e.dims,n=k.size(r),o=64,i=t.axis;if(i<0&&(i=r.length+i),i<r.length-1)throw new Error("softmax only supports last axis for now.");let a=r[i],d=n/a,l=ve(a),c=a/l,m=(x,$)=>$===4?`max(max(${x}.x, ${x}.y), max(${x}.z, ${x}.w))`:$===2?`max(${x}.x, ${x}.y)`:$===3?`max(max(${x}.x, ${x}.y), ${x}.z)`:x,u=E("x",e.dataType,e.dims,l),h=R("result",e.dataType,e.dims,l),w=u.type.value,g=ge(e.dataType)==="f32"?`var threadMax = ${w}(-3.402823e+38f);`:`var threadMax = ${w}(-65504.0h);`,y=x=>`
      var<workgroup> rowMaxShared : ${w};
      var<workgroup> rowSumShared : ${w};
      var<workgroup> threadShared : array<${w}, ${o}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${w} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${w}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${x.registerUniform("packedCols","i32").declareVariables(u,h)}
      ${x.mainStart()}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${o};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${g}
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
          rowMaxShared = ${w}(${m("threadShared[0]",l)});
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
          rowSumShared = ${w}(${Xe("threadShared[0]",l)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`;return{name:"Softmax",shaderCache:{hint:`${l}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.dataType}],dispatchGroup:{x:d},programUniforms:[{type:6,data:c}]}),getShaderSource:y}},wl=(e,t)=>{yh(e.inputs),e.compute(bh(e.inputs[0],t))},vl=e=>J({axis:e.axis})});var wh,vh,_h,$h,xh,$l,xl,Sl=U(()=>{"use strict";Z();ee();Ie();re();wh=e=>{if(!e||e.length<1)throw new Error("too few inputs")},vh=(e,t)=>{let r=[],n=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(o=>r.push(Number(o))),n=r.length),J({numOutputs:n,axis:t.axis,splitSizes:r})},_h=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${L("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,$h=e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let o=e[n].setByIndices("indices","input[global_idx]");t===1?r.push(o):n===0?r.push(`if (output_number == ${n}u) { ${o} }`):n===t-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${n}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},xh=(e,t)=>{let r=e[0].dims,n=k.size(r),o=e[0].dataType,i=k.normalizeAxis(t.axis,r.length),a=new Array(t.numOutputs),d=E("input",o,r.length),l=new Array(t.numOutputs),c=[],m=[],u=0,h=[{type:12,data:n}];for(let g=0;g<t.numOutputs;g++){u+=t.splitSizes[g],l[g]=u;let y=r.slice();y[i]=t.splitSizes[g],m.push(y),a[g]=R(`output${g}`,o,y.length),c.push({dims:m[g],dataType:e[0].dataType})}h.push({type:12,data:l},...V(r,...m));let w=g=>`
  ${g.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(d,...a)}
  ${_h(l.length)}
  ${$h(a)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${d.offsetToIndices("global_idx")};
    var index = ${d.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${L("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${d.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:w,getRunData:()=>({outputs:c,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:h})}},$l=(e,t)=>{wh(e.inputs);let r=e.inputs.length===1?t:vh(e.inputs,t);e.compute(xh(e.inputs,r),{inputs:[0]})},xl=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return J({axis:t,numOutputs:n,splitSizes:r})}});var Sh,Ih,Il,Cl=U(()=>{"use strict";Z();ee();re();Sh=(e,t,r,n,o)=>{let i=R("output_data",o,r.length,4),a=E("a_data",t[1].dataType,t[1].dims.length,4),d=E("b_data",t[2].dataType,t[2].dims.length,4),l=E("c_data",t[0].dataType,t[0].dims.length,4),c,m=(u,h,w)=>`select(${h}, ${u}, ${w})`;if(!n)c=i.setByOffset("global_idx",m(a.getByOffset("global_idx"),d.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let u=(h,w,g="")=>{let y=`a_data[index_a${w}][component_a${w}]`,x=`b_data[index_b${w}][component_b${w}]`,$=`bool(c_data[index_c${w}] & (0xffu << (component_c${w} * 8)))`;return`
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
            ${h}[${w}] = ${g}(${m(y,x,$)});
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
      }`},Ih=e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,o=e[1].dataType,i=!(k.areEqual(t,r)&&k.areEqual(r,n)),a=t,d=k.size(t);if(i){let c=tt.calcShape(tt.calcShape(t,r,!1),n,!1);if(!c)throw new Error("Can't perform where op on the given tensors");a=c,d=k.size(a)}let l=Math.ceil(d/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:c=>Sh(c,e,a,i,o),getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(d/64/4)},programUniforms:[{type:12,data:l},...V(n,t,r,a)]})}},Il=e=>{e.compute(Ih(e.inputs))}});var Al,Tl=U(()=>{"use strict";vs();Fr();xs();Is();lu();_u();Su();Uu();Fu();Ku();Zu();rd();id();sd();ld();md();gd();wd();kd();Pd();Od();so();Rd();yo();Ud();tl();ol();al();Gr();ll();pl();fl();bl();_l();Sl();wo();Tt();jr();Cl();Al=new Map([["Abs",[Cs]],["Acos",[As]],["Acosh",[Ts]],["Add",[cu]],["ArgMax",[ws,ro]],["ArgMin",[bs,ro]],["Asin",[ks]],["Asinh",[Es]],["Atan",[Ps]],["Atanh",[zs]],["Attention",[_s]],["AveragePool",[qd,Fd]],["BatchNormalization",[$s]],["BiasAdd",[Ss]],["BiasSplitGelu",[du]],["Cast",[Ds,Os]],["Ceil",[Rs]],["Clip",[Bs]],["Concat",[$u,xu]],["Conv",[po,co]],["ConvTranspose",[Lu,Gu]],["Cos",[Ms]],["Cosh",[Us]],["CumSum",[qu,ju]],["DepthToSpace",[Yu,Xu]],["DequantizeLinear",[rl,nl]],["Div",[pu]],["Einsum",[ed,td]],["Elu",[Vs,Qt]],["Equal",[mu]],["Erf",[Ns]],["Exp",[Ws]],["Expand",[od]],["FastGelu",[ad]],["Floor",[Hs]],["FusedConv",[po,co]],["Gather",[dd,ud]],["GatherElements",[hd,fd]],["GatherBlockQuantized",[cd,pd]],["Gelu",[Gs]],["Gemm",[bd,yd]],["GlobalAveragePool",[Yd,Kd]],["GlobalMaxPool",[el,Jd]],["Greater",[yu]],["GreaterOrEqual",[wu]],["GroupQueryAttention",[Td,Ad]],["HardSigmoid",[Zs,Xs]],["InstanceNormalization",[Ed]],["LayerNormalization",[zd]],["LeakyRelu",[Ls,Qt]],["Less",[bu]],["LessOrEqual",[vu]],["Log",[au]],["MatMul",[Ru]],["MatMulNBits",[Dd,Bd]],["MaxPool",[Zd,Qd]],["Mul",[fu]],["MultiHeadAttention",[$d,_d]],["Neg",[qs]],["Not",[Fs]],["Pad",[Md]],["Pow",[hu]],["QuickGelu",[su,Qt]],["Range",[il]],["Reciprocal",[js]],["ReduceMin",[ps]],["ReduceMean",[ss]],["ReduceMax",[cs]],["ReduceSum",[fs]],["ReduceProd",[ms]],["ReduceL1",[us]],["ReduceL2",[ds]],["ReduceLogSum",[gs]],["ReduceLogSumExp",[ls]],["ReduceSumSquare",[hs]],["Relu",[Ks]],["Resize",[ul,dl]],["RotaryEmbedding",[cl]],["Sigmoid",[Ys]],["Sin",[Qs]],["Sinh",[Js]],["Slice",[gl,yl]],["SkipLayerNormalization",[ml]],["Split",[$l,xl]],["Sqrt",[eu]],["Softmax",[wl,vl]],["Sub",[gu]],["Tan",[tu]],["Tanh",[nu]],["ThresholdedRelu",[iu,Qt]],["Tile",[Sd]],["Transpose",[Ka,Ya]],["Where",[Il]]])});var rn,kl=U(()=>{"use strict";Ke();dt();re();rn=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,r){this.repo.set(t,r)}run(t,r,n,o,i){We(t.programInfo.name);let a=this.backend.device,d=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let l=[];for(let m of r)l.push({binding:l.length,resource:{buffer:m.buffer}});for(let m of n)l.push({binding:l.length,resource:{buffer:m.buffer}});i&&l.push({binding:l.length,resource:i});let c=a.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:l,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let m={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:c,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(m)}d.setPipeline(t.computePipeline),d.setBindGroup(0,c),d.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Me(t.programInfo.name)}dispose(){}build(t,r){We(t.name);let n=this.backend.device,o=[];n.features.has("shader-f16")&&o.push("enable f16;");let i=qa(r,this.backend.device.limits),a=t.getShaderSource(i),d=`${o.join(`
`)}
${i.additionalImplementations}
${a}`,l=n.createShaderModule({code:d,label:t.name});we("verbose",()=>`[WebGPU] ${t.name} shader code: ${d}`);let c=n.createComputePipeline({compute:{module:l,entryPoint:"main"},layout:"auto",label:t.name});return Me(t.name),{programInfo:t,computePipeline:c,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(t){let r=typeof t=="number"?t:t.x,n=typeof t=="number"?1:t.y||1,o=typeof t=="number"?1:t.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=i&&n<=i&&o<=i)return[r,n,o];let a=r*n*o,d=Math.ceil(Math.sqrt(a));if(d>i){if(d=Math.ceil(Math.cbrt(a)),d>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[d,d,d]}else return[d,d,1]}}});var Ch,Ah,vo,nn,El=U(()=>{"use strict";Ke();Z();dt();Ua();Ga();Tl();kl();Ch=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let o=e[n].dataType;switch(t[n]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let i=e[n].dims.length;r.push(`${o};${i}`);break}case"dims":{let i=e[n].dims.join(",");r.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")},Ah=(e,t,r)=>{let n=e.name;return e.shaderCache?.hint&&(n+="["+e.shaderCache.hint+"]"),n+=":"+r+`:${Ch(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,n},vo=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},nn=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,r){this.env=t;let n=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n};r.features.has("chromium-experimental-timestamp-query-inside-passes")?n.push("chromium-experimental-timestamp-query-inside-passes"):r.features.has("timestamp-query")&&n.push("timestamp-query"),r.features.has("shader-f16")&&n.push("shader-f16"),this.device=await r.requestDevice(o),this.adapterInfo=new vo(r.info||await r.requestAdapterInfo()),this.gpuDataManager=Ha(this),this.programManager=new rn(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Ra(t.logLevel,!!t.debug),this.device.onuncapturederror=i=>{i.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${i.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;We(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(t.getMappedRange()),n=this.pendingQueries.get(t);for(let o=0;o<r.length/2;o++){let i=n[o],a=i.kernelId,d=this.kernels.get(a),l=d.kernelType,c=d.kernelName,m=i.programName,u=i.inputTensorViews,h=i.outputTensorViews,w=r[o*2],g=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=w);let y=Number(w-this.queryTimeBase),x=Number(g-this.queryTimeBase);if(!Number.isSafeInteger(y)||!Number.isSafeInteger(x))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:u.map($=>({dims:$.dims,dataType:ht($.dataType)})),outputsMetadata:h.map($=>({dims:$.dims,dataType:ht($.dataType)})),kernelId:a,kernelType:l,kernelName:c,programName:m,startTime:y,endTime:x});else{let $="";u.forEach((S,I)=>{$+=`input[${I}]: [${S.dims}] | ${ht(S.dataType)}, `});let _="";h.forEach((S,I)=>{_+=`output[${I}]: [${S.dims}] | ${ht(S.dataType)}, `}),console.log(`[profiling] kernel "${a}|${l}|${c}|${m}" ${$}${_}execution time: ${x-y} ns`)}Sr("GPU",`${m}::${w}::${g}`)}t.unmap(),this.pendingQueries.delete(t)}),Me()}run(t,r,n,o,i,a){We(t.name);let d=[];for(let S=0;S<r.length;++S){let I=r[S].data;if(I===0)continue;let A=this.gpuDataManager.get(I);if(!A)throw new Error(`no GPU data for input: ${I}`);d.push(A)}let{outputs:l,dispatchGroup:c,programUniforms:m}=t.getRunData(r),u=n.length===0?l.map((S,I)=>I):n;if(u.length!==l.length)throw new Error(`Output size ${u.length} must be equal to ${l.length}.`);let h=[],w=[];for(let S=0;S<l.length;++S){if(!Number.isInteger(u[S])||u[S]<-3||u[S]>=a)throw new Error(`Invalid output index: ${u[S]}`);if(u[S]===-3)continue;let I=u[S]===-1,A=u[S]===-2,T=I||A?i(l[S].dataType,l[S].dims):o(u[S],l[S].dataType,l[S].dims);if(h.push(T),T.data===0)continue;let O=this.gpuDataManager.get(T.data);if(!O)throw new Error(`no GPU data for output: ${T.data}`);if(I&&this.temporaryData.push(O),A){let B=this.kernelPersistentData.get(this.currentKernelId);B||(B=[],this.kernelPersistentData.set(this.currentKernelId,B)),B.push(O)}w.push(O)}if(d.length!==r.length||w.length!==h.length){if(w.length===0)return Me(t.name),h;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let g;if(m){let S=0,I=[];m.forEach(B=>{let N=typeof B.data=="number"?[B.data]:B.data;if(N.length===0)return;let H=B.type===10?2:4,K,X;B.type===10?(X=N.length>4?16:N.length>2?8:N.length*H,K=N.length>4?16:H*N.length):(X=N.length<=2?N.length*H:16,K=16),S=Math.ceil(S/X)*X,I.push(S);let ne=B.type===10?8:4;S+=N.length>4?Math.ceil(N.length/ne)*K:N.length*H});let A=16;S=Math.ceil(S/A)*A;let T=new ArrayBuffer(S);m.forEach((B,N)=>{let H=I[N],K=typeof B.data=="number"?[B.data]:B.data;if(B.type===6)new Int32Array(T,H,K.length).set(K);else if(B.type===12)new Uint32Array(T,H,K.length).set(K);else if(B.type===10)new Uint16Array(T,H,K.length).set(K);else if(B.type===1)new Float32Array(T,H,K.length).set(K);else throw new Error(`Unsupported uniform type: ${ht(B.type)}`)});let O=this.gpuDataManager.create(S,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(O.buffer,0,T,0,S),this.gpuDataManager.release(O.id),g={offset:0,size:S,buffer:O.buffer}}let y=this.programManager.normalizeDispatchGroupSize(c),x=y[1]===1&&y[2]===1,$=Ah(t,r,x),_=this.programManager.getArtifact($);if(_||(_=this.programManager.build(t,y),this.programManager.setArtifact($,_),we("info",()=>`[artifact] key: ${$}, programName: ${t.name}`)),m&&_.uniformVariablesInfo){if(m.length!==_.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${_.uniformVariablesInfo.length}, got ${m.length} in program "${_.programInfo.name}".`);for(let S=0;S<m.length;S++){let I=m[S],A=I.type,T=typeof I.data=="number"?1:I.data.length,[O,B]=_.uniformVariablesInfo[S];if(A!==O||T!==B)throw new Error(`Uniform variable ${S} mismatch: expect type ${O} with size ${B}, got type ${A} with size ${T} in program "${_.programInfo.name}".`)}}if(we("info",()=>`[ProgramManager] run "${t.name}" (key=${$}) with ${y[0]}x${y[1]}x${y[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let S={kernelId:this.currentKernelId,programName:_.programInfo.name,inputTensorViews:r,outputTensorViews:h};this.pendingKernels.push(S),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(S)}return this.programManager.run(_,d,w,y,g),Me(t.name),h}upload(t,r){this.gpuDataManager.upload(t,r)}memcpy(t,r){this.gpuDataManager.memcpy(t,r)}async download(t,r){await this.gpuDataManager.download(t,r)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,r,n,o){let i=Al.get(t);if(!i)throw new Error(`kernel not implemented: ${t}`);let a={kernelType:t,kernelName:o,kernelEntry:i[0],attributes:[i[1],n]};this.kernels.set(r,a)}releaseKernel(t){let r=this.kernelPersistentData.get(t);if(r){for(let n of r)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,r,n){let o=this.kernels.get(t);if(!o)throw new Error(`kernel not created: ${t}`);let i=o.kernelType,a=o.kernelName,d=o.kernelEntry,l=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=t,l[0]&&(l[1]=l[0](l[1]),l[0]=void 0),we("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let c=this.env.debug;this.temporaryData=[];try{return c&&this.device.pushErrorScope("validation"),d(r,l[1]),0}catch(m){return n.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${m}`)),1}finally{c&&n.push(this.device.popErrorScope().then(m=>m?`GPU validation error for kernel "[${i}] ${a}": ${m.message}`:null));for(let m of this.temporaryData)this.gpuDataManager.release(m.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,r,n,o){let i=this.sessionExternalDataMapping.get(t);i||(i=new Map,this.sessionExternalDataMapping.set(t,i));let a=i.get(r),d=this.gpuDataManager.registerExternalBuffer(n,o,a?.[1]);return i.set(r,[d,n]),d}unregisterBuffers(t){let r=this.sessionExternalDataMapping.get(t);r&&(r.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[1])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let r=this.gpuDataManager.get(t);if(!r)throw new Error(`no GPU data for buffer: ${t}`);return r.buffer}createDownloader(t,r,n){return async()=>{let o=await Yn(this,t,r);return Ma(o.buffer,n)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){we("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){we("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){we("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),n=t.length;this.pendingKernels=[];for(let o=0;o<n;o++){let i=this.getComputePassEncoder(),a=t[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});var Pl={};Lt(Pl,{init:()=>Th});var or,_o,Th,zl=U(()=>{"use strict";Z();El();dt();ee();or=class e{constructor(t,r,n,o){this.module=t;this.dataType=r;this.data=n;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(k.size(t)!==k.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},_o=class{constructor(t,r,n){this.module=t;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo;let o=t.HEAPU32,i=n>>>2;this.opKernelContext=o[i++];let a=o[i++];this.outputCount=o[i++],this.customDataOffset=o[i++],this.customDataSize=o[i++];let d=[];for(let l=0;l<a;l++){let c=o[i++],m=o[i++],u=o[i++],h=[];for(let w=0;w<u;w++)h.push(o[i++]);d.push(new or(t,c,m,h))}this.inputs=d}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}getMaxComputeWorkgroupSizes(){return[this.backend.device.limits.maxComputeWorkgroupSizeX,this.backend.device.limits.maxComputeWorkgroupSizeY,this.backend.device.limits.maxComputeWorkgroupSizeZ]}getMaxComputeWorkgroupStoragesize(){return this.backend.device.limits.maxComputeWorkgroupStorageSize}compute(t,r){let n=r?.inputs?.map(d=>typeof d=="number"?this.inputs[d]:d)??this.inputs,o=r?.outputs??[],i=(d,l,c)=>new or(this.module,l,this.output(d,c),c),a=(d,l)=>{let c=Yt(d,l);if(!c)throw new Error(`Unsupported data type: ${d}`);let m=c>0?this.backend.gpuDataManager.create(c).id:0;return new or(this.module,d,m,l)};return this.backend.run(t,n,o,i,a,this.outputCount)}output(t,r){let n=this.module.stackSave();try{let o=this.module.stackAlloc((1+r.length)*4),i=o>>2;this.module.HEAPU32[i++]=r.length;for(let a=0;a<r.length;a++)this.module.HEAPU32[i++]=r[a];return this.module._JsepOutput(this.opKernelContext,t,o)}catch(o){throw new Error(`Failed to generate kernel's output[${t}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(n)}}},Th=async(e,t,r,n)=>{let o=t.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let i=new nn;await i.initialize(r,n),o("webgpu",[i,a=>i.alloc(a),a=>i.free(a),(a,d,l,c=!1)=>{if(c)we("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${a}, dst=${d}, size=${l}`),i.memcpy(a,d);else{we("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${a}, gpuDataId=${d}, size=${l}`);let m=t.HEAPU8.subarray(a>>>0,(a>>>0)+l);i.upload(d,m)}},async(a,d,l)=>{we("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${a}, dataOffset=${d}, size=${l}`),await i.download(a,()=>t.HEAPU8.subarray(d>>>0,(d>>>0)+l))},(a,d,l)=>i.createKernel(a,d,l,t.UTF8ToString(t._JsepGetNodeName(d))),a=>i.releaseKernel(a),(a,d,l,c)=>{we("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${l}, kernel=${a}, contextDataOffset=${d}`);let m=new _o(t,i,d);return i.computeKernel(a,m,c)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else o("webnn")}});var kh,kr,Er,kt,Eh,jt,Pr,zr,Ol,Or,Dr,Br,Vn=U(()=>{"use strict";Pa();Oa();Z();St();Mr();Fn();kh=(e,t)=>{Ce()._OrtInit(e,t)!==0&&_e("Can't initialize onnxruntime.")},kr=async e=>{kh(e.wasm.numThreads,Xt(e.logLevel))},Er=async(e,t)=>{{let r=(zl(),br(Pl)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let n=e.webgpu.adapter;if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=e.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=e.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",Ce(),e,n)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",Ce(),e)}}},kt=new Map,Eh=e=>{let t=Ce(),r=t.stackSave();try{let n=t.stackAlloc(8);return t._OrtGetInputOutputCount(e,n,n+4)!==0&&_e("Can't get session input/output count."),[t.HEAP32[n/4],t.HEAP32[n/4+1]]}finally{t.stackRestore(r)}},jt=e=>{let t=Ce(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},Pr=async(e,t)=>{let r,n,o=Ce();Array.isArray(e)?[r,n]=e:e.buffer===o.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=jt(e);let i=0,a=0,d=0,l=[],c=[],m=[];try{if([a,l]=za(t),t?.externalData&&o.mountExternalData){let _=[];for(let S of t.externalData){let I=typeof S=="string"?S:S.path;_.push(Zt(typeof S=="string"?S:S.data).then(A=>{o.mountExternalData(I,A)}))}await Promise.all(_)}for(let _ of t?.executionProviders??[])if((typeof _=="string"?_:_.name)==="webnn"){if(o.currentContext)throw new Error("WebNN execution provider is already set.");if(typeof _!="string"){let I=_,A=I?.context,T=I?.gpuDevice,O=I?.deviceType,B=I?.numThreads,N=I?.powerPreference;A?o.currentContext=A:T?o.currentContext=await navigator.ml.createContext(T):o.currentContext=await navigator.ml.createContext({deviceType:O,numThreads:B,powerPreference:N})}else o.currentContext=await navigator.ml.createContext();break}i=await o._OrtCreateSession(r,n,a),i===0&&_e("Can't create a session."),o.currentContext&&(o.currentContext=void 0);let[u,h]=Eh(i),w=!!t?.enableGraphCapture,g=[],y=[],x=[];for(let _=0;_<u;_++){let S=o._OrtGetInputName(i,_);S===0&&_e("Can't get an input name."),c.push(S),g.push(o.UTF8ToString(S))}for(let _=0;_<h;_++){let S=o._OrtGetOutputName(i,_);S===0&&_e("Can't get an output name."),m.push(S);let I=o.UTF8ToString(S);y.push(I);{if(w&&t?.preferredOutputLocation===void 0){x.push("gpu-buffer");continue}let A=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[I]??"cpu";if(A!=="cpu"&&A!=="cpu-pinned"&&A!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${A}.`);if(w&&A!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${A}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);x.push(A)}}let $=null;return x.some(_=>_==="gpu-buffer")&&(d=o._OrtCreateBinding(i),d===0&&_e("Can't create IO binding."),$={handle:d,outputPreferredLocations:x,outputPreferredLocationsEncoded:x.map(_=>Ln(_))}),kt.set(i,[i,c,m,$,w,!1]),[i,g,y]}catch(u){throw c.forEach(h=>o._OrtFree(h)),m.forEach(h=>o._OrtFree(h)),d!==0&&o._OrtReleaseBinding(d),i!==0&&o._OrtReleaseSession(i),u}finally{o._free(r),a!==0&&o._OrtReleaseSessionOptions(a),l.forEach(u=>o._free(u)),o.unmountExternalData?.()}},zr=e=>{let t=Ce(),r=kt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[n,o,i,a,d]=r;a&&(d&&t._OrtClearBoundOutputs(a.handle),t._OrtReleaseBinding(a.handle)),t.jsepOnReleaseSession?.(e),o.forEach(l=>t._OrtFree(l)),i.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(n),kt.delete(e)},Ol=(e,t,r,n,o,i=!1)=>{if(!e){t.push(0);return}let a=Ce(),d=e[0],l=e[1],c=e[3],m,u;if(d==="string"&&c==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");if(i&&c!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(c==="gpu-buffer"){let g=e[2].gpuBuffer;u=Yt(Gn(d),l);let y=a.jsepRegisterBuffer;if(!y)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');m=y(n,o,g,u)}else{let g=e[2];if(Array.isArray(g)){u=4*g.length,m=a._malloc(u),r.push(m);let y=m/4;for(let x=0;x<g.length;x++){if(typeof g[x]!="string")throw new TypeError(`tensor data at index ${x} is not a string`);a.HEAPU32[y++]=Te(g[x],r)}}else u=g.byteLength,m=a._malloc(u),r.push(m),a.HEAPU8.set(new Uint8Array(g.buffer,g.byteOffset,u),m)}let h=a.stackSave(),w=a.stackAlloc(4*l.length);try{let g=w/4;l.forEach(x=>a.HEAP32[g++]=x);let y=a._OrtCreateTensor(Gn(d),m,u,w,l.length,Ln(c));y===0&&_e(`Can't create tensor for input/output. session=${n}, index=${o}.`),t.push(y)}finally{a.stackRestore(h)}},Or=async(e,t,r,n,o,i)=>{let a=Ce(),d=kt.get(e);if(!d)throw new Error(`cannot run inference. invalid session id: ${e}`);let l=d[0],c=d[1],m=d[2],u=d[3],h=d[4],w=d[5],g=t.length,y=n.length,x=0,$=[],_=[],S=[],I=[],A=a.stackSave(),T=a.stackAlloc(g*4),O=a.stackAlloc(g*4),B=a.stackAlloc(y*4),N=a.stackAlloc(y*4);try{[x,$]=Ea(i);for(let Y=0;Y<g;Y++)Ol(r[Y],_,I,e,t[Y],h);for(let Y=0;Y<y;Y++)Ol(o[Y],S,I,e,g+n[Y],h);let H=T/4,K=O/4,X=B/4,ne=N/4;for(let Y=0;Y<g;Y++)a.HEAPU32[H++]=_[Y],a.HEAPU32[K++]=c[t[Y]];for(let Y=0;Y<y;Y++)a.HEAPU32[X++]=S[Y],a.HEAPU32[ne++]=m[n[Y]];if(u&&!w){let{handle:Y,outputPreferredLocations:pe,outputPreferredLocationsEncoded:ce}=u;if(c.length!==g)throw new Error(`input count from feeds (${g}) is expected to be always equal to model's input count (${c.length}).`);for(let Q=0;Q<g;Q++){let be=t[Q];await a._OrtBindInput(Y,c[be],_[Q])!==0&&_e(`Can't bind input[${Q}] for session=${e}.`)}for(let Q=0;Q<y;Q++){let be=n[Q];o[Q]?.[3]?a._OrtBindOutput(Y,m[be],S[Q],0)!==0&&_e(`Can't bind pre-allocated output[${Q}] for session=${e}.`):a._OrtBindOutput(Y,m[be],0,ce[be])!==0&&_e(`Can't bind output[${Q}] to ${pe[Q]} for session=${e}.`)}kt.set(e,[l,c,m,u,h,!0])}a.jsepOnRunStart?.(l);let oe;u?oe=await a._OrtRunWithBinding(l,u.handle,y,B,x):oe=await a._OrtRun(l,O,T,g,N,y,B,x),oe!==0&&_e("failed to call OrtRun().");let le=[];for(let Y=0;Y<y;Y++){let pe=a.HEAPU32[B/4+Y];if(pe===S[Y]){le.push(o[Y]);continue}let ce=a.stackSave(),Q=a.stackAlloc(4*4),be=!1,ae,ie=0;try{a._OrtGetTensorData(pe,Q,Q+4,Q+8,Q+12)!==0&&_e(`Can't access output tensor data on index ${Y}.`);let M=Q/4,F=a.HEAPU32[M++];ie=a.HEAPU32[M++];let fe=a.HEAPU32[M++],Re=a.HEAPU32[M++],Se=[];for(let ze=0;ze<Re;ze++)Se.push(a.HEAPU32[fe/4+ze]);a._OrtFree(fe);let Ae=Se.reduce((ze,De)=>ze*De,1);ae=ht(F);let Gt=u?.outputPreferredLocations[n[Y]];if(ae==="string"){if(Gt==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");let ze=[],De=ie/4;for(let Fe=0;Fe<Ae;Fe++){let Pt=a.HEAPU32[De++],yt=Fe===Ae-1?void 0:a.HEAPU32[De]-Pt;ze.push(a.UTF8ToString(Pt,yt))}le.push([ae,Se,ze,"cpu"])}else if(Gt==="gpu-buffer"&&Ae>0){let ze=a.jsepGetBuffer;if(!ze)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let De=ze(ie),Fe=Yt(F,Ae);if(Fe===void 0||!Vr(ae))throw new Error(`Unsupported data type: ${ae}`);be=!0,le.push([ae,Se,{gpuBuffer:De,download:a.jsepCreateDownloader(De,Fe,ae),dispose:()=>{a._OrtReleaseTensor(pe)}},"gpu-buffer"])}else{let ze=Ur(ae),De=new ze(Ae);new Uint8Array(De.buffer,De.byteOffset,De.byteLength).set(a.HEAPU8.subarray(ie,ie+De.byteLength)),le.push([ae,Se,De,"cpu"])}}finally{a.stackRestore(ce),ae==="string"&&ie&&a._free(ie),be||a._OrtReleaseTensor(pe)}}return u&&!h&&(a._OrtClearBoundOutputs(u.handle),kt.set(e,[l,c,m,u,h,!1])),le}finally{a.stackRestore(A),_.forEach(H=>a._OrtReleaseTensor(H)),S.forEach(H=>a._OrtReleaseTensor(H)),I.forEach(H=>a._free(H)),x!==0&&a._OrtReleaseRunOptions(x),$.forEach(H=>a._free(H))}},Dr=e=>{let t=Ce(),r=kt.get(e);if(!r)throw new Error("invalid session id");let n=r[0],o=t._OrtEndProfiling(n);o===0&&_e("Can't get an profile file name."),t._OrtFree(o)},Br=e=>{let t=[];for(let r of e){let n=r[2];!Array.isArray(n)&&"buffer"in n&&t.push(n.buffer)}return t}});var Et,Ye,ir,an,sn,on,$o,xo,Wt,Ht,zh,Dl,Bl,Rl,Ml,Ul,Vl,Nl,So=U(()=>{"use strict";Ke();Vn();St();qt();Et=()=>!!ye.wasm.proxy&&typeof document<"u",ir=!1,an=!1,sn=!1,xo=new Map,Wt=(e,t)=>{let r=xo.get(e);r?r.push(t):xo.set(e,[t])},Ht=()=>{if(ir||!an||sn||!Ye)throw new Error("worker not ready")},zh=e=>{switch(e.data.type){case"init-wasm":ir=!1,e.data.err?(sn=!0,$o[1](e.data.err)):(an=!0,$o[0]()),on&&(URL.revokeObjectURL(on),on=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=xo.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},Dl=async()=>{if(!an){if(ir)throw new Error("multiple calls to 'initWasm()' detected.");if(sn)throw new Error("previous call to 'initWasm()' failed.");if(ir=!0,Et())return new Promise((e,t)=>{Ye?.terminate(),Aa().then(([r,n])=>{try{Ye=n,Ye.onerror=i=>t(i),Ye.onmessage=zh,$o=[e,t];let o={type:"init-wasm",in:ye};Ye.postMessage(o),on=r}catch(o){t(o)}},t)});try{await Tr(ye.wasm),await kr(ye),an=!0}catch(e){throw sn=!0,e}finally{ir=!1}}},Bl=async e=>{if(Et())return Ht(),new Promise((t,r)=>{Wt("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:ye}};Ye.postMessage(n)});await Er(ye,e)},Rl=async e=>Et()?(Ht(),new Promise((t,r)=>{Wt("copy-from",[t,r]);let n={type:"copy-from",in:{buffer:e}};Ye.postMessage(n,[e.buffer])})):jt(e),Ml=async(e,t)=>{if(Et()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Ht(),new Promise((r,n)=>{Wt("create",[r,n]);let o={type:"create",in:{model:e,options:{...t}}},i=[];e instanceof Uint8Array&&i.push(e.buffer),Ye.postMessage(o,i)})}else return Pr(e,t)},Ul=async e=>{if(Et())return Ht(),new Promise((t,r)=>{Wt("release",[t,r]);let n={type:"release",in:e};Ye.postMessage(n)});zr(e)},Vl=async(e,t,r,n,o,i)=>{if(Et()){if(r.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return Ht(),new Promise((a,d)=>{Wt("run",[a,d]);let l=r,c={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:n,options:i}};Ye.postMessage(c,Br(l))})}else return Or(e,t,r,n,o,i)},Nl=async e=>{if(Et())return Ht(),new Promise((t,r)=>{Wt("end-profiling",[t,r]);let n={type:"end-profiling",in:e};Ye.postMessage(n)});Dr(e)}});var Wl,Oh,un,Hl=U(()=>{"use strict";Ke();So();Z();Ar();Fn();Wl=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Oh=e=>{switch(e[3]){case"cpu":return new Oe(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Vr(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:o}=e[2];return Oe.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:o})}default:throw new Error(`invalid data location: ${e[3]}`)}},un=class{async fetchModelAndCopyToWasmMemory(t){return Rl(await Zt(t))}async loadModel(t,r){We();let n;typeof t=="string"?!1?n=await Zt(t):n=await this.fetchModelAndCopyToWasmMemory(t):n=t,[this.sessionId,this.inputNames,this.outputNames]=await Ml(n,r),Me()}async dispose(){return Ul(this.sessionId)}async run(t,r,n){We();let o=[],i=[];Object.entries(t).forEach(h=>{let w=h[0],g=h[1],y=this.inputNames.indexOf(w);if(y===-1)throw new Error(`invalid input '${w}'`);o.push(g),i.push(y)});let a=[],d=[];Object.entries(r).forEach(h=>{let w=h[0],g=h[1],y=this.outputNames.indexOf(w);if(y===-1)throw new Error(`invalid output '${w}'`);a.push(g),d.push(y)});let l=o.map((h,w)=>Wl(h,()=>`input "${this.inputNames[i[w]]}"`)),c=a.map((h,w)=>h?Wl(h,()=>`output "${this.outputNames[d[w]]}"`):null),m=await Vl(this.sessionId,i,l,d,c,n),u={};for(let h=0;h<m.length;h++)u[this.outputNames[d[h]]]=a[h]??Oh(m[h]);return Me(),u}startProfiling(){}endProfiling(){Nl(this.sessionId)}}});var Dh,dn,Gl=U(()=>{"use strict";Ke();So();Hl();qt();Dh=()=>{if((typeof ye.wasm.initTimeout!="number"||ye.wasm.initTimeout<0)&&(ye.wasm.initTimeout=0),ye.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof ye.wasm.proxy!="boolean"&&(ye.wasm.proxy=!1),typeof ye.wasm.trace!="boolean"&&(ye.wasm.trace=!1),typeof ye.wasm.numThreads!="number"||!Number.isInteger(ye.wasm.numThreads)||ye.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ye.wasm.numThreads=1;else{let e=typeof navigator>"u"?Dn("node:os").cpus().length:navigator.hardwareConcurrency;ye.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},dn=class{async init(t){Dh(),await Dl(),await Bl(t)}async createInferenceSessionHandler(t,r){let n=new un;return await n.loadModel(t,r),Promise.resolve(n)}}});var Ll={};Lt(Ll,{wasmBackend:()=>Bh});var Bh,Fl=U(()=>{"use strict";Gl();Bh=new dn});Ke();Ke();Ke();var ba="1.20.0-dev.20240908-de7a02beef";var xx=Un;{let e=(Fl(),br(Ll)).wasmBackend;$t("webgpu",e,5),$t("webnn",e,5),$t("cpu",e,10),$t("wasm",e,10)}Object.defineProperty(ye.versions,"web",{value:ba,enumerable:!0});export{hp as InferenceSession,Sr as TRACE,We as TRACE_FUNC_BEGIN,Me as TRACE_FUNC_END,Oe as Tensor,yp as TrainingSession,xx as default,ye as env,$t as registerBackend};
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
