/*!
 * ONNX Runtime Web v1.22.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var zn=Object.defineProperty;var Vp=Object.getOwnPropertyDescriptor;var Wp=Object.getOwnPropertyNames;var Lp=Object.prototype.hasOwnProperty;var Dn=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var U=(e,t)=>()=>(e&&(t=e(e=0)),t);var Rt=(e,t)=>{for(var r in t)zn(e,r,{get:t[r],enumerable:!0})},Gp=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Wp(t))!Lp.call(e,o)&&o!==r&&zn(e,o,{get:()=>t[o],enumerable:!(n=Vp(t,o))||n.enumerable});return e};var qt=e=>Gp(zn({},"__esModule",{value:!0}),e);var hr,St,Tt,Hp,Fi,Bn=U(()=>{"use strict";hr=new Map,St=[],Tt=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let n=hr.get(e);if(n===void 0)hr.set(e,{backend:t,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let o=St.indexOf(e);o!==-1&&St.splice(o,1);for(let i=0;i<St.length;i++)if(hr.get(St[i]).priority<=r){St.splice(i,0,e);return}St.push(e)}return}throw new TypeError("not a valid backend")},Hp=async e=>{let t=hr.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(n){return r||(t.error=`${n}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Fi=async e=>{let t=e.executionProviders||[],r=t.map(d=>typeof d=="string"?d:d.name),n=r.length===0?St:r,o,i=[],a=new Set;for(let d of n){let c=await Hp(d);typeof c=="string"?i.push({name:d,err:c}):(o||(o=c),o===c&&a.add(d))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(d=>`[${d.name}] ${d.err}`).join(", ")}`);for(let{name:d,err:c}of i)r.includes(d)&&console.warn(`removing requested execution provider "${d}" from session options because it is not available: ${c}`);let u=t.filter(d=>a.has(typeof d=="string"?d:d.name));return[o,new Proxy(e,{get:(d,c)=>c==="executionProviders"?u:Reflect.get(d,c)})]}});var qi=U(()=>{"use strict";Bn()});var Ki,ji=U(()=>{"use strict";Ki="1.22.0"});var Zi,Me,Mn=U(()=>{"use strict";ji();Zi="warning",Me={wasm:{},webgl:{},webgpu:{},versions:{common:Ki},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Zi=e}},get logLevel(){return Zi}};Object.defineProperty(Me,"logLevel",{enumerable:!0})});var be,Qi=U(()=>{"use strict";Mn();be=Me});var Yi,Xi,Ji=U(()=>{"use strict";Yi=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(n!=null){let o,i;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[3]):(o=e.dims[3],i=e.dims[2]);let a=t?.format!==void 0?t.format:"RGB",u=t?.norm,d,c;u===void 0||u.mean===void 0?d=[255,255,255,255]:typeof u.mean=="number"?d=[u.mean,u.mean,u.mean,u.mean]:(d=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(d[3]=u.mean[3])),u===void 0||u.bias===void 0?c=[0,0,0,0]:typeof u.bias=="number"?c=[u.bias,u.bias,u.bias,u.bias]:(c=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(c[3]=u.bias[3]));let p=i*o,m=0,f=p,b=p*2,g=-1;a==="RGBA"?(m=0,f=p,b=p*2,g=p*3):a==="RGB"?(m=0,f=p,b=p*2):a==="RBG"&&(m=0,b=p,f=p*2);for(let _=0;_<i;_++)for(let S=0;S<o;S++){let $=(e.data[m++]-c[0])*d[0],w=(e.data[f++]-c[1])*d[1],x=(e.data[b++]-c[2])*d[2],T=g===-1?255:(e.data[g++]-c[3])*d[3];n.fillStyle="rgba("+$+","+w+","+x+","+T+")",n.fillRect(S,_,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Xi=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(r!=null){let o,i,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[1],a=e.dims[3]):(o=e.dims[3],i=e.dims[2],a=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",d=t?.norm,c,p;d===void 0||d.mean===void 0?c=[255,255,255,255]:typeof d.mean=="number"?c=[d.mean,d.mean,d.mean,d.mean]:(c=[d.mean[0],d.mean[1],d.mean[2],255],d.mean[3]!==void 0&&(c[3]=d.mean[3])),d===void 0||d.bias===void 0?p=[0,0,0,0]:typeof d.bias=="number"?p=[d.bias,d.bias,d.bias,d.bias]:(p=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(p[3]=d.bias[3]));let m=i*o;if(t!==void 0&&(t.format!==void 0&&a===4&&t.format!=="RGBA"||a===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let f=4,b=0,g=1,_=2,S=3,$=0,w=m,x=m*2,T=-1;u==="RGBA"?($=0,w=m,x=m*2,T=m*3):u==="RGB"?($=0,w=m,x=m*2):u==="RBG"&&($=0,x=m,w=m*2),n=r.createImageData(o,i);for(let k=0;k<i*o;b+=f,g+=f,_+=f,S+=f,k++)n.data[b]=(e.data[$++]-p[0])*c[0],n.data[g]=(e.data[w++]-p[1])*c[1],n.data[_]=(e.data[x++]-p[2])*c[2],n.data[S]=T===-1?255:(e.data[T++]-p[3])*c[3]}else throw new Error("Can not access image data");return n}});var Rn,ea,ta,ra,na,oa,ia=U(()=>{"use strict";gr();Rn=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=t,o=t.norm??{mean:255,bias:0},i,a;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?a=[o.bias,o.bias,o.bias,o.bias]:a=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",d=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",c=r*n,p=d==="RGBA"?new Float32Array(c*4):new Float32Array(c*3),m=4,f=0,b=1,g=2,_=3,S=0,$=c,w=c*2,x=-1;u==="RGB"&&(m=3,f=0,b=1,g=2,_=-1),d==="RGBA"?x=c*3:d==="RBG"?(S=0,w=c,$=c*2):d==="BGR"&&(w=0,$=c,S=c*2);for(let k=0;k<c;k++,f+=m,g+=m,b+=m,_+=m)p[S++]=(e[f]+a[0])/i[0],p[$++]=(e[b]+a[1])/i[1],p[w++]=(e[g]+a[2])/i[2],x!==-1&&_!==-1&&(p[x++]=(e[_]+a[3])/i[3]);return d==="RGBA"?new Pe("float32",p,[1,4,r,n]):new Pe("float32",p,[1,3,r,n])},ea=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,n=typeof ImageData<"u"&&e instanceof ImageData,o=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,i=typeof e=="string",a,u=t??{},d=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},c=p=>typeof HTMLCanvasElement<"u"&&p instanceof HTMLCanvasElement||p instanceof OffscreenCanvas?p.getContext("2d"):null;if(r){let p=d();p.width=e.width,p.height=e.height;let m=c(p);if(m!=null){let f=e.height,b=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(f=t.resizedHeight,b=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=f,u.width=b}else u.tensorFormat="RGBA",u.height=f,u.width=b;m.drawImage(e,0,0),a=m.getImageData(0,0,b,f).data}else throw new Error("Can not access image data")}else if(n){let p,m;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(p=t.resizedHeight,m=t.resizedWidth):(p=e.height,m=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=p,u.width=m,t!==void 0){let f=d();f.width=m,f.height=p;let b=c(f);if(b!=null)b.putImageData(e,0,0),a=b.getImageData(0,0,m,p).data;else throw new Error("Can not access image data")}else a=e.data}else if(o){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let p=d();p.width=e.width,p.height=e.height;let m=c(p);if(m!=null){let f=e.height,b=e.width;return m.drawImage(e,0,0,b,f),a=m.getImageData(0,0,b,f).data,u.height=f,u.width=b,Rn(a,u)}else throw new Error("Can not access image data")}else{if(i)return new Promise((p,m)=>{let f=d(),b=c(f);if(!e||!b)return m();let g=new Image;g.crossOrigin="Anonymous",g.src=e,g.onload=()=>{f.width=g.width,f.height=g.height,b.drawImage(g,0,0,f.width,f.height);let _=b.getImageData(0,0,f.width,f.height);u.height=f.height,u.width=f.width,p(Rn(_.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return Rn(a,u);throw new Error("Input data provided is not supported - aborted tensor creation")},ta=(e,t)=>{let{width:r,height:n,download:o,dispose:i}=t,a=[1,n,r,4];return new Pe({location:"texture",type:"float32",texture:e,dims:a,download:o,dispose:i})},ra=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:i}=t;return new Pe({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:o,dispose:i})},na=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:i}=t;return new Pe({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:n,download:o,dispose:i})},oa=(e,t,r)=>new Pe({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})});var It,Kt,aa,sa,ua=U(()=>{"use strict";It=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Kt=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),aa=!1,sa=()=>{if(!aa){aa=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,n=typeof r<"u"&&r.from;e&&(It.set("int64",BigInt64Array),Kt.set(BigInt64Array,"int64")),t&&(It.set("uint64",BigUint64Array),Kt.set(BigUint64Array,"uint64")),n?(It.set("float16",r),Kt.set(r,"float16")):It.set("float16",Uint16Array)}}});var da,la,ca=U(()=>{"use strict";gr();da=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},la=(e,t)=>{switch(e.location){case"cpu":return new Pe(e.type,e.data,t);case"cpu-pinned":return new Pe({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Pe({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Pe({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Pe({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var Pe,gr=U(()=>{"use strict";Ji();ia();ua();ca();Pe=class{constructor(t,r,n){sa();let o,i;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,o=t.type,i=t.dims,t.location){case"cpu-pinned":{let u=It.get(o);if(!u)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(t.data instanceof u))throw new TypeError(`buffer should be of type ${u.name}`);this.cpuData=t.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let u,d;if(typeof t=="string")if(o=t,d=n,t==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");u=r}else{let c=It.get(t);if(c===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(r)){if(t==="float16"&&c===Uint16Array||t==="uint4"||t==="int4")throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${c.name} as data.`);t==="uint64"||t==="int64"?u=c.from(r,BigInt):u=c.from(r)}else if(r instanceof c)u=r;else if(r instanceof Uint8ClampedArray)if(t==="uint8")u=Uint8Array.from(r);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(t==="float16"&&r instanceof Uint16Array&&c!==Uint16Array)u=new globalThis.Float16Array(r.buffer,r.byteOffset,r.length);else throw new TypeError(`A ${o} tensor's data must be type of ${c}`)}else if(d=r,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let c=typeof t[0];if(c==="string")o="string",u=t;else if(c==="boolean")o="bool",u=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${c}.`)}else if(t instanceof Uint8ClampedArray)o="uint8",u=Uint8Array.from(t);else{let c=Kt.get(t.constructor);if(c===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);o=c,u=t}if(d===void 0)d=[u.length];else if(!Array.isArray(d))throw new TypeError("A tensor's dims must be a number array");i=d,this.cpuData=u,this.dataLocation="cpu"}let a=da(i);if(this.cpuData&&a!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=a}static async fromImage(t,r){return ea(t,r)}static fromTexture(t,r){return ta(t,r)}static fromGpuBuffer(t,r){return ra(t,r)}static fromMLTensor(t,r){return na(t,r)}static fromPinnedBuffer(t,r,n){return oa(t,r,n)}toDataURL(t){return Yi(this,t)}toImageData(t){return Xi(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,t&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return la(this,t)}}});var He,Un=U(()=>{"use strict";gr();He=Pe});var br,pa,Re,De,Nn=U(()=>{"use strict";Mn();br=(e,t)=>{(typeof Me.trace>"u"?!Me.wasm.trace:!Me.trace)||console.timeStamp(`${e}::ORT::${t}`)},pa=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],n=!1;for(let o=0;o<r.length;o++){if(n&&!r[o].includes("TRACE_FUNC")){let i=`FUNC_${e}::${r[o].trim().split(" ")[1]}`;t&&(i+=`::${t}`),br("CPU",i);return}r[o].includes("TRACE_FUNC")&&(n=!0)}},Re=e=>{(typeof Me.trace>"u"?!Me.wasm.trace:!Me.trace)||pa("BEGIN",e)},De=e=>{(typeof Me.trace>"u"?!Me.wasm.trace:!Me.trace)||pa("END",e)}});var yr,ma=U(()=>{"use strict";Bn();Un();Nn();yr=class e{constructor(t){this.handler=t}async run(t,r,n){Re();let o={},i={};if(typeof t!="object"||t===null||t instanceof He||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof He)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let c of r){if(typeof c!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(c)===-1)throw new RangeError(`'fetches' contains invalid output name: ${c}.`);o[c]=null}if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let c=!1,p=Object.getOwnPropertyNames(r);for(let m of this.outputNames)if(p.indexOf(m)!==-1){let f=r[m];(f===null||f instanceof He)&&(c=!0,a=!1,o[m]=f)}if(c){if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let c of this.inputNames)if(typeof t[c]>"u")throw new Error(`input '${c}' is missing in 'feeds'.`);if(a)for(let c of this.outputNames)o[c]=null;let u=await this.handler.run(t,o,i),d={};for(let c in u)if(Object.hasOwnProperty.call(u,c)){let p=u[c];p instanceof He?d[c]=p:d[c]=new He(p.type,p.data,p.dims)}return De(),d}async release(){return this.handler.dispose()}static async create(t,r,n,o){Re();let i,a={};if(typeof t=="string"){if(i=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(i=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let p=t,m=0,f=t.byteLength;if(typeof r=="object"&&r!==null)a=r;else if(typeof r=="number"){if(m=r,!Number.isSafeInteger(m))throw new RangeError("'byteOffset' must be an integer.");if(m<0||m>=p.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${p.byteLength}).`);if(f=t.byteLength-m,typeof n=="number"){if(f=n,!Number.isSafeInteger(f))throw new RangeError("'byteLength' must be an integer.");if(f<=0||m+f>p.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${p.byteLength-m}].`);if(typeof o=="object"&&o!==null)a=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof n<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(p,m,f)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,d]=await Fi(a),c=await u.createInferenceSessionHandler(i,d);return De(),new e(c)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}});var Fp,fa=U(()=>{"use strict";ma();Fp=yr});var ha=U(()=>{"use strict"});var ga=U(()=>{"use strict"});var ba=U(()=>{"use strict"});var ya=U(()=>{"use strict"});var Vn={};Rt(Vn,{InferenceSession:()=>Fp,TRACE:()=>br,TRACE_FUNC_BEGIN:()=>Re,TRACE_FUNC_END:()=>De,Tensor:()=>He,env:()=>be,registerBackend:()=>Tt});var We=U(()=>{"use strict";qi();Qi();fa();Un();ha();ga();Nn();ba();ya()});var _r=U(()=>{"use strict"});var $a={};Rt($a,{default:()=>qp});var wa,va,qp,xa=U(()=>{"use strict";Wn();yt();wr();wa="ort-wasm-proxy-worker",va=globalThis.self?.name===wa;va&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":vr(r.wasm).then(()=>{$r(r).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})})},n=>{postMessage({type:t,err:n})});break;case"init-ep":{let{epName:n,env:o}=r;xr(o,n).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})});break}case"copy-from":{let{buffer:n}=r,o=jt(n);postMessage({type:t,out:o});break}case"create":{let{model:n,options:o}=r;Sr(n,o).then(i=>{postMessage({type:t,out:i})},i=>{postMessage({type:t,err:i})});break}case"release":Tr(r),postMessage({type:t});break;case"run":{let{sessionId:n,inputIndices:o,inputs:i,outputIndices:a,options:u}=r;Ir(n,o,i,a,new Array(a.length).fill(null),u).then(d=>{d.some(c=>c[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:d},Ar([...i,...d]))},d=>{postMessage({type:t,err:d})});break}case"end-profiling":Cr(r),postMessage({type:t});break;default:}}catch(n){postMessage({type:t,err:n})}});qp=va?null:e=>new Worker(e??Ue,{type:"module",name:wa})});var Ta={};Rt(Ta,{default:()=>Kp});var Ln,Sa,Kp,jp,Ia=U(()=>{"use strict";Sa=(Ln=import.meta.url,async function(e={}){var t,r,n=e,o=new Promise((s,l)=>{t=s,r=l}),i=typeof window=="object",a=typeof WorkerGlobalScope<"u",u=a&&self.name?.startsWith("em-pthread");n.mountExternalData=(s,l)=>{s.startsWith("./")&&(s=s.substring(2)),(n.Fb||(n.Fb=new Map)).set(s,l)},n.unmountExternalData=()=>{delete n.Fb};var d=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,qc:!0}).buffer.constructor;let c=s=>async(...l)=>{try{if(n.Gb)throw Error("Session already started");let h=n.Gb={ec:l[0],errors:[]},y=await s(...l);if(n.Gb!==h)throw Error("Session mismatch");n.Kb?.flush();let v=h.errors;if(0<v.length){let A=await Promise.all(v);if(A=A.filter(D=>D),0<A.length)throw Error(A.join(`
`))}return y}finally{n.Gb=null}};n.jsepInit=(s,l)=>{if(s==="webgpu"){[n.Kb,n.Vb,n.Zb,n.Lb,n.Yb,n.kb,n.$b,n.bc,n.Wb,n.Xb,n.ac]=l;let h=n.Kb;n.jsepRegisterBuffer=(y,v,A,D)=>h.registerBuffer(y,v,A,D),n.jsepGetBuffer=y=>h.getBuffer(y),n.jsepCreateDownloader=(y,v,A)=>h.createDownloader(y,v,A),n.jsepOnCreateSession=y=>{h.onCreateSession(y)},n.jsepOnReleaseSession=y=>{h.onReleaseSession(y)},n.jsepOnRunStart=y=>h.onRunStart(y),n.cc=(y,v)=>{h.upload(y,v)}}else if(s==="webnn"){let h=l[0];[n.oc,n.Ob,n.webnnEnsureTensor,n.Pb,n.webnnDownloadTensor]=l.slice(1),n.webnnReleaseTensorId=n.Ob,n.webnnUploadTensor=n.Pb,n.webnnOnRunStart=y=>h.onRunStart(y),n.webnnOnRunEnd=h.onRunEnd.bind(h),n.webnnRegisterMLContext=(y,v)=>{h.registerMLContext(y,v)},n.webnnOnReleaseSession=y=>{h.onReleaseSession(y)},n.webnnCreateMLTensorDownloader=(y,v)=>h.createMLTensorDownloader(y,v),n.webnnRegisterMLTensor=(y,v,A,D)=>h.registerMLTensor(y,v,A,D),n.webnnCreateMLContext=y=>h.createMLContext(y),n.webnnRegisterMLConstant=(y,v,A,D,R,G)=>h.registerMLConstant(y,v,A,D,R,n.Fb,G),n.webnnRegisterGraphInput=h.registerGraphInput.bind(h),n.webnnIsGraphInput=h.isGraphInput.bind(h),n.webnnRegisterGraphOutput=h.registerGraphOutput.bind(h),n.webnnIsGraphOutput=h.isGraphOutput.bind(h),n.webnnCreateTemporaryTensor=h.createTemporaryTensor.bind(h),n.webnnIsGraphInputOutputTypeSupported=h.isGraphInputOutputTypeSupported.bind(h)}};let p=()=>{let s=(l,h,y)=>(...v)=>{let A=Qe,D=h?.();v=l(...v);let R=h?.();return D!==R&&(l=R,y(D),h=y=null),Qe!=A?new Promise((G,K)=>{Tn={resolve:G,reject:K}}):v};(()=>{for(let l of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])n[l]=s(n[l],()=>n[l],h=>n[l]=h)})(),c!==void 0&&(n._OrtRun=c(n._OrtRun),n._OrtRunWithBinding=c(n._OrtRunWithBinding)),p=void 0};n.asyncInit=()=>{p?.()};var m,f,b=Object.assign({},n),g=(s,l)=>{throw l},_="";(i||a)&&(a?_=self.location.href:typeof document<"u"&&document.currentScript&&(_=document.currentScript.src),Ln&&(_=Ln),_=_.startsWith("blob:")?"":_.slice(0,_.replace(/[?#].*/,"").lastIndexOf("/")+1),a&&(f=s=>{var l=new XMLHttpRequest;return l.open("GET",s,!1),l.responseType="arraybuffer",l.send(null),new Uint8Array(l.response)}),m=async s=>{if(Z(s))return new Promise((h,y)=>{var v=new XMLHttpRequest;v.open("GET",s,!0),v.responseType="arraybuffer",v.onload=()=>{v.status==200||v.status==0&&v.response?h(v.response):y(v.status)},v.onerror=y,v.send(null)});var l=await fetch(s,{credentials:"same-origin"});if(l.ok)return l.arrayBuffer();throw Error(l.status+" : "+l.url)});var S=console.log.bind(console),$=console.error.bind(console),w=S,x=$;Object.assign(n,b),b=null;var T,k,I,O,z,B,W,q,j,te,V,de,J,H=n.wasmBinary,ae=!1,Z=s=>s.startsWith("file://");function re(){return T.buffer!=O.buffer&&ce(),O}function ve(){return T.buffer!=O.buffer&&ce(),z}function _e(){return T.buffer!=O.buffer&&ce(),B}function ee(){return T.buffer!=O.buffer&&ce(),W}function C(){return T.buffer!=O.buffer&&ce(),q}function L(){return T.buffer!=O.buffer&&ce(),j}function le(){return T.buffer!=O.buffer&&ce(),te}function Ce(){return T.buffer!=O.buffer&&ce(),J}if(u){let s=function(l){try{var h=l.data,y=h.Cb;if(y==="load"){let v=[];self.onmessage=A=>v.push(A),self.startWorker=()=>{postMessage({Cb:"loaded"});for(let A of v)s(A);self.onmessage=s};for(let A of h.Sb)n[A]&&!n[A].proxy||(n[A]=(...D)=>{postMessage({Cb:"callHandler",Rb:A,args:D})},A=="print"&&(w=n[A]),A=="printErr"&&(x=n[A]));T=h.lc,ce(),ze(h.mc)}else if(y==="run"){wc(h.Bb),kn(h.Bb,0,0,1,0,0),No(),xn(h.Bb),xe||(zi(),xe=!0);try{vc(h.hc,h.Ib)}catch(v){if(v!="unwind")throw v}}else h.target!=="setimmediate"&&(y==="checkMailbox"?xe&&or():y&&(x(`worker: received unknown command ${y}`),x(h)))}catch(v){throw Di(),v}};var $g=s,ze,xe=!1;x=function(...l){l=l.join(" "),console.error(l)},self.alert=function(...l){postMessage({Cb:"alert",text:l.join(" "),jc:pr()})},self.onunhandledrejection=l=>{throw l.reason||l},self.onmessage=s}function ce(){var s=T.buffer;n.HEAP8=O=new Int8Array(s),n.HEAP16=B=new Int16Array(s),n.HEAPU8=z=new Uint8Array(s),n.HEAPU16=W=new Uint16Array(s),n.HEAP32=q=new Int32Array(s),n.HEAPU32=j=new Uint32Array(s),n.HEAPF32=te=new Float32Array(s),n.HEAPF64=J=new Float64Array(s),n.HEAP64=V=new BigInt64Array(s),n.HEAPU64=de=new BigUint64Array(s)}function Ge(){u?startWorker(n):Q.Da()}u||(T=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),ce());var lt,ct=0,zt=null;function Oo(){if(--ct==0&&zt){var s=zt;zt=null,s()}}function pt(s){throw x(s="Aborted("+s+")"),ae=!0,s=new WebAssembly.RuntimeError(s+". Build with -sASSERTIONS for more info."),r(s),s}function zo(){return{a:{L:_c,Aa:yc,b:xc,$:Go,A:qo,pa:Ko,X:Zo,Z:Qo,qa:Yo,na:Xo,ga:Jo,ma:ei,J:ti,Y:ri,V:ni,oa:oi,W:ii,va:Sc,E:Ic,Q:Cc,O:kc,D:Pc,v:Oc,r:zc,P:Dc,z:Wc,R:Lc,ja:Gc,T:Hc,aa:Fc,M:qc,F:Kc,ia:xn,sa:jc,t:Zc,Ca:Qc,w:Jc,o:ep,m:rp,c:wn,Ba:np,n:op,j:sp,u:up,p:dp,f:lp,s:cp,l:pp,e:mp,k:fp,h:hp,g:gp,d:bp,da:yp,ea:_p,fa:wp,ba:_i,ca:wi,N:vi,xa:$p,ua:Tp,i:Ip,C:Cp,G:Ap,ta:xp,x:kp,ra:Ep,U:Pp,q:vp,y:Op,K:zp,S:Dp,za:Bp,ya:Mp,ka:Ti,la:Ii,_:gn,B:Ci,I:Ai,ha:ki,H:Ei,a:T,wa:hn}}}var pn={840156:(s,l,h,y,v)=>{if(n===void 0||!n.Fb)return 1;if((s=Te(Number(s>>>0))).startsWith("./")&&(s=s.substring(2)),!(s=n.Fb.get(s)))return 2;if(l=Number(l>>>0),h=Number(h>>>0),y=Number(y>>>0),l+h>s.byteLength)return 3;try{let A=s.subarray(l,l+h);switch(v){case 0:ve().set(A,y>>>0);break;case 1:n.nc?n.nc(y,A):n.cc(y,A);break;default:return 4}return 0}catch{return 4}},840980:(s,l,h)=>{n.Pb(s,ve().subarray(l>>>0,l+h>>>0))},841044:()=>n.oc(),841086:s=>{n.Ob(s)},841123:()=>{n.Wb()},841154:()=>{n.Xb()},841183:()=>{n.ac()},841208:s=>n.Vb(s),841241:s=>n.Zb(s),841273:(s,l,h)=>{n.Lb(Number(s),Number(l),Number(h),!0)},841336:(s,l,h)=>{n.Lb(Number(s),Number(l),Number(h))},841393:()=>typeof wasmOffsetConverter<"u",841450:s=>{n.kb("Abs",s,void 0)},841501:s=>{n.kb("Neg",s,void 0)},841552:s=>{n.kb("Floor",s,void 0)},841605:s=>{n.kb("Ceil",s,void 0)},841657:s=>{n.kb("Reciprocal",s,void 0)},841715:s=>{n.kb("Sqrt",s,void 0)},841767:s=>{n.kb("Exp",s,void 0)},841818:s=>{n.kb("Erf",s,void 0)},841869:s=>{n.kb("Sigmoid",s,void 0)},841924:(s,l,h)=>{n.kb("HardSigmoid",s,{alpha:l,beta:h})},842003:s=>{n.kb("Log",s,void 0)},842054:s=>{n.kb("Sin",s,void 0)},842105:s=>{n.kb("Cos",s,void 0)},842156:s=>{n.kb("Tan",s,void 0)},842207:s=>{n.kb("Asin",s,void 0)},842259:s=>{n.kb("Acos",s,void 0)},842311:s=>{n.kb("Atan",s,void 0)},842363:s=>{n.kb("Sinh",s,void 0)},842415:s=>{n.kb("Cosh",s,void 0)},842467:s=>{n.kb("Asinh",s,void 0)},842520:s=>{n.kb("Acosh",s,void 0)},842573:s=>{n.kb("Atanh",s,void 0)},842626:s=>{n.kb("Tanh",s,void 0)},842678:s=>{n.kb("Not",s,void 0)},842729:(s,l,h)=>{n.kb("Clip",s,{min:l,max:h})},842798:s=>{n.kb("Clip",s,void 0)},842850:(s,l)=>{n.kb("Elu",s,{alpha:l})},842908:s=>{n.kb("Gelu",s,void 0)},842960:s=>{n.kb("Relu",s,void 0)},843012:(s,l)=>{n.kb("LeakyRelu",s,{alpha:l})},843076:(s,l)=>{n.kb("ThresholdedRelu",s,{alpha:l})},843146:(s,l)=>{n.kb("Cast",s,{to:l})},843204:s=>{n.kb("Add",s,void 0)},843255:s=>{n.kb("Sub",s,void 0)},843306:s=>{n.kb("Mul",s,void 0)},843357:s=>{n.kb("Div",s,void 0)},843408:s=>{n.kb("Pow",s,void 0)},843459:s=>{n.kb("Equal",s,void 0)},843512:s=>{n.kb("Greater",s,void 0)},843567:s=>{n.kb("GreaterOrEqual",s,void 0)},843629:s=>{n.kb("Less",s,void 0)},843681:s=>{n.kb("LessOrEqual",s,void 0)},843740:(s,l,h,y,v)=>{n.kb("ReduceMean",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:y?Array.from(C().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},843915:(s,l,h,y,v)=>{n.kb("ReduceMax",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:y?Array.from(C().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},844089:(s,l,h,y,v)=>{n.kb("ReduceMin",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:y?Array.from(C().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},844263:(s,l,h,y,v)=>{n.kb("ReduceProd",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:y?Array.from(C().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},844438:(s,l,h,y,v)=>{n.kb("ReduceSum",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:y?Array.from(C().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},844612:(s,l,h,y,v)=>{n.kb("ReduceL1",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:y?Array.from(C().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},844785:(s,l,h,y,v)=>{n.kb("ReduceL2",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:y?Array.from(C().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},844958:(s,l,h,y,v)=>{n.kb("ReduceLogSum",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:y?Array.from(C().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},845135:(s,l,h,y,v)=>{n.kb("ReduceSumSquare",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:y?Array.from(C().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},845315:(s,l,h,y,v)=>{n.kb("ReduceLogSumExp",s,{keepDims:!!l,noopWithEmptyAxes:!!h,axes:y?Array.from(C().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},845495:s=>{n.kb("Where",s,void 0)},845548:(s,l,h)=>{n.kb("Transpose",s,{perm:l?Array.from(C().subarray(Number(l)>>>0,Number(h)>>>0)):[]})},845672:(s,l,h,y)=>{n.kb("DepthToSpace",s,{blocksize:l,mode:Te(h),format:y?"NHWC":"NCHW"})},845805:(s,l,h,y)=>{n.kb("DepthToSpace",s,{blocksize:l,mode:Te(h),format:y?"NHWC":"NCHW"})},845938:(s,l,h,y,v,A,D,R,G,K,se,pe,we,Ee,Mt)=>{n.kb("ConvTranspose",s,{format:G?"NHWC":"NCHW",autoPad:l,dilations:[h],group:y,kernelShape:[v],pads:[A,D],strides:[R],wIsConst:()=>!!re()[K>>>0],outputPadding:se?Array.from(C().subarray(Number(se)>>>0,Number(pe)>>>0)):[],outputShape:we?Array.from(C().subarray(Number(we)>>>0,Number(Ee)>>>0)):[],activation:Te(Mt)})},846371:(s,l,h,y,v,A,D,R,G,K,se,pe,we,Ee)=>{n.kb("ConvTranspose",s,{format:R?"NHWC":"NCHW",autoPad:l,dilations:Array.from(C().subarray(Number(h)>>>0,2+(Number(h)>>>0)>>>0)),group:y,kernelShape:Array.from(C().subarray(Number(v)>>>0,2+(Number(v)>>>0)>>>0)),pads:Array.from(C().subarray(Number(A)>>>0,4+(Number(A)>>>0)>>>0)),strides:Array.from(C().subarray(Number(D)>>>0,2+(Number(D)>>>0)>>>0)),wIsConst:()=>!!re()[G>>>0],outputPadding:K?Array.from(C().subarray(Number(K)>>>0,Number(se)>>>0)):[],outputShape:pe?Array.from(C().subarray(Number(pe)>>>0,Number(we)>>>0)):[],activation:Te(Ee)})},847032:(s,l,h,y,v,A,D,R,G,K,se,pe,we,Ee,Mt)=>{n.kb("ConvTranspose",s,{format:G?"NHWC":"NCHW",autoPad:l,dilations:[h],group:y,kernelShape:[v],pads:[A,D],strides:[R],wIsConst:()=>!!re()[K>>>0],outputPadding:se?Array.from(C().subarray(Number(se)>>>0,Number(pe)>>>0)):[],outputShape:we?Array.from(C().subarray(Number(we)>>>0,Number(Ee)>>>0)):[],activation:Te(Mt)})},847465:(s,l,h,y,v,A,D,R,G,K,se,pe,we,Ee)=>{n.kb("ConvTranspose",s,{format:R?"NHWC":"NCHW",autoPad:l,dilations:Array.from(C().subarray(Number(h)>>>0,2+(Number(h)>>>0)>>>0)),group:y,kernelShape:Array.from(C().subarray(Number(v)>>>0,2+(Number(v)>>>0)>>>0)),pads:Array.from(C().subarray(Number(A)>>>0,4+(Number(A)>>>0)>>>0)),strides:Array.from(C().subarray(Number(D)>>>0,2+(Number(D)>>>0)>>>0)),wIsConst:()=>!!re()[G>>>0],outputPadding:K?Array.from(C().subarray(Number(K)>>>0,Number(se)>>>0)):[],outputShape:pe?Array.from(C().subarray(Number(pe)>>>0,Number(we)>>>0)):[],activation:Te(Ee)})},848126:(s,l)=>{n.kb("GlobalAveragePool",s,{format:l?"NHWC":"NCHW"})},848217:(s,l,h,y,v,A,D,R,G,K,se,pe,we,Ee)=>{n.kb("AveragePool",s,{format:Ee?"NHWC":"NCHW",auto_pad:l,ceil_mode:h,count_include_pad:y,storage_order:v,dilations:A?Array.from(C().subarray(Number(A)>>>0,Number(D)>>>0)):[],kernel_shape:R?Array.from(C().subarray(Number(R)>>>0,Number(G)>>>0)):[],pads:K?Array.from(C().subarray(Number(K)>>>0,Number(se)>>>0)):[],strides:pe?Array.from(C().subarray(Number(pe)>>>0,Number(we)>>>0)):[]})},848696:(s,l)=>{n.kb("GlobalAveragePool",s,{format:l?"NHWC":"NCHW"})},848787:(s,l,h,y,v,A,D,R,G,K,se,pe,we,Ee)=>{n.kb("AveragePool",s,{format:Ee?"NHWC":"NCHW",auto_pad:l,ceil_mode:h,count_include_pad:y,storage_order:v,dilations:A?Array.from(C().subarray(Number(A)>>>0,Number(D)>>>0)):[],kernel_shape:R?Array.from(C().subarray(Number(R)>>>0,Number(G)>>>0)):[],pads:K?Array.from(C().subarray(Number(K)>>>0,Number(se)>>>0)):[],strides:pe?Array.from(C().subarray(Number(pe)>>>0,Number(we)>>>0)):[]})},849266:(s,l)=>{n.kb("GlobalMaxPool",s,{format:l?"NHWC":"NCHW"})},849353:(s,l,h,y,v,A,D,R,G,K,se,pe,we,Ee)=>{n.kb("MaxPool",s,{format:Ee?"NHWC":"NCHW",auto_pad:l,ceil_mode:h,count_include_pad:y,storage_order:v,dilations:A?Array.from(C().subarray(Number(A)>>>0,Number(D)>>>0)):[],kernel_shape:R?Array.from(C().subarray(Number(R)>>>0,Number(G)>>>0)):[],pads:K?Array.from(C().subarray(Number(K)>>>0,Number(se)>>>0)):[],strides:pe?Array.from(C().subarray(Number(pe)>>>0,Number(we)>>>0)):[]})},849828:(s,l)=>{n.kb("GlobalMaxPool",s,{format:l?"NHWC":"NCHW"})},849915:(s,l,h,y,v,A,D,R,G,K,se,pe,we,Ee)=>{n.kb("MaxPool",s,{format:Ee?"NHWC":"NCHW",auto_pad:l,ceil_mode:h,count_include_pad:y,storage_order:v,dilations:A?Array.from(C().subarray(Number(A)>>>0,Number(D)>>>0)):[],kernel_shape:R?Array.from(C().subarray(Number(R)>>>0,Number(G)>>>0)):[],pads:K?Array.from(C().subarray(Number(K)>>>0,Number(se)>>>0)):[],strides:pe?Array.from(C().subarray(Number(pe)>>>0,Number(we)>>>0)):[]})},850390:(s,l,h,y,v)=>{n.kb("Gemm",s,{alpha:l,beta:h,transA:y,transB:v})},850494:s=>{n.kb("MatMul",s,void 0)},850548:(s,l,h,y)=>{n.kb("ArgMax",s,{keepDims:!!l,selectLastIndex:!!h,axis:y})},850656:(s,l,h,y)=>{n.kb("ArgMin",s,{keepDims:!!l,selectLastIndex:!!h,axis:y})},850764:(s,l)=>{n.kb("Softmax",s,{axis:l})},850827:(s,l)=>{n.kb("Concat",s,{axis:l})},850887:(s,l,h,y,v)=>{n.kb("Split",s,{axis:l,numOutputs:h,splitSizes:y?Array.from(C().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},851043:s=>{n.kb("Expand",s,void 0)},851097:(s,l)=>{n.kb("Gather",s,{axis:Number(l)})},851168:(s,l)=>{n.kb("GatherElements",s,{axis:Number(l)})},851247:(s,l)=>{n.kb("GatherND",s,{batch_dims:Number(l)})},851326:(s,l,h,y,v,A,D,R,G,K,se)=>{n.kb("Resize",s,{antialias:l,axes:h?Array.from(C().subarray(Number(h)>>>0,Number(y)>>>0)):[],coordinateTransformMode:Te(v),cubicCoeffA:A,excludeOutside:D,extrapolationValue:R,keepAspectRatioPolicy:Te(G),mode:Te(K),nearestMode:Te(se)})},851688:(s,l,h,y,v,A,D)=>{n.kb("Slice",s,{starts:l?Array.from(C().subarray(Number(l)>>>0,Number(h)>>>0)):[],ends:y?Array.from(C().subarray(Number(y)>>>0,Number(v)>>>0)):[],axes:A?Array.from(C().subarray(Number(A)>>>0,Number(D)>>>0)):[]})},851952:s=>{n.kb("Tile",s,void 0)},852004:(s,l,h)=>{n.kb("InstanceNormalization",s,{epsilon:l,format:h?"NHWC":"NCHW"})},852118:(s,l,h)=>{n.kb("InstanceNormalization",s,{epsilon:l,format:h?"NHWC":"NCHW"})},852232:s=>{n.kb("Range",s,void 0)},852285:(s,l)=>{n.kb("Einsum",s,{equation:Te(l)})},852366:(s,l,h,y,v)=>{n.kb("Pad",s,{mode:l,value:h,pads:y?Array.from(C().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},852509:(s,l,h,y,v,A)=>{n.kb("BatchNormalization",s,{epsilon:l,momentum:h,spatial:!!v,trainingMode:!!y,format:A?"NHWC":"NCHW"})},852678:(s,l,h,y,v,A)=>{n.kb("BatchNormalization",s,{epsilon:l,momentum:h,spatial:!!v,trainingMode:!!y,format:A?"NHWC":"NCHW"})},852847:(s,l,h)=>{n.kb("CumSum",s,{exclusive:Number(l),reverse:Number(h)})},852944:(s,l,h)=>{n.kb("DequantizeLinear",s,{axis:l,blockSize:h})},853034:(s,l,h,y,v)=>{n.kb("GridSample",s,{align_corners:l,mode:Te(h),padding_mode:Te(y),format:v?"NHWC":"NCHW"})},853204:(s,l,h,y,v)=>{n.kb("GridSample",s,{align_corners:l,mode:Te(h),padding_mode:Te(y),format:v?"NHWC":"NCHW"})},853374:(s,l)=>{n.kb("ScatterND",s,{reduction:Te(l)})},853459:(s,l,h,y,v,A,D,R,G)=>{n.kb("Attention",s,{numHeads:l,isUnidirectional:h,maskFilterValue:y,scale:v,doRotary:A,qkvHiddenSizes:D?Array.from(C().subarray(Number(R)>>>0,Number(R)+D>>>0)):[],pastPresentShareBuffer:!!G})},853731:s=>{n.kb("BiasAdd",s,void 0)},853786:s=>{n.kb("BiasSplitGelu",s,void 0)},853847:s=>{n.kb("FastGelu",s,void 0)},853903:(s,l,h,y,v,A,D,R,G,K,se,pe,we,Ee,Mt,Np)=>{n.kb("Conv",s,{format:pe?"NHWC":"NCHW",auto_pad:l,dilations:h?Array.from(C().subarray(Number(h)>>>0,Number(y)>>>0)):[],group:v,kernel_shape:A?Array.from(C().subarray(Number(A)>>>0,Number(D)>>>0)):[],pads:R?Array.from(C().subarray(Number(R)>>>0,Number(G)>>>0)):[],strides:K?Array.from(C().subarray(Number(K)>>>0,Number(se)>>>0)):[],w_is_const:()=>!!re()[Number(we)>>>0],activation:Te(Ee),activation_params:Mt?Array.from(le().subarray(Number(Mt)>>>0,Number(Np)>>>0)):[]})},854487:s=>{n.kb("Gelu",s,void 0)},854539:(s,l,h,y,v,A,D,R,G)=>{n.kb("GroupQueryAttention",s,{numHeads:l,kvNumHeads:h,scale:y,softcap:v,doRotary:A,rotaryInterleaved:D,smoothSoftmax:R,localWindowSize:G})},854756:(s,l,h,y)=>{n.kb("LayerNormalization",s,{axis:l,epsilon:h,simplified:!!y})},854867:(s,l,h,y)=>{n.kb("LayerNormalization",s,{axis:l,epsilon:h,simplified:!!y})},854978:(s,l,h,y,v,A)=>{n.kb("MatMulNBits",s,{k:l,n:h,accuracyLevel:y,bits:v,blockSize:A})},855105:(s,l,h,y,v,A)=>{n.kb("MultiHeadAttention",s,{numHeads:l,isUnidirectional:h,maskFilterValue:y,scale:v,doRotary:A})},855264:(s,l)=>{n.kb("QuickGelu",s,{alpha:l})},855328:(s,l,h,y,v)=>{n.kb("RotaryEmbedding",s,{interleaved:!!l,numHeads:h,rotaryEmbeddingDim:y,scale:v})},855467:(s,l,h)=>{n.kb("SkipLayerNormalization",s,{epsilon:l,simplified:!!h})},855569:(s,l,h)=>{n.kb("SkipLayerNormalization",s,{epsilon:l,simplified:!!h})},855671:(s,l,h,y)=>{n.kb("GatherBlockQuantized",s,{gatherAxis:l,quantizeAxis:h,blockSize:y})},855792:s=>{n.$b(s)},855826:(s,l)=>n.bc(Number(s),Number(l),n.Gb.ec,n.Gb.errors)};function yc(s,l,h){return mi(async()=>{await n.Yb(Number(s),Number(l),Number(h))})}function _c(){return typeof wasmOffsetConverter<"u"}class mn{name="ExitStatus";constructor(l){this.message=`Program terminated with exit(${l})`,this.status=l}}var Do=s=>{s.terminate(),s.onmessage=()=>{}},fn=[],Bo=s=>{ft.length==0&&(Wo(),Vo(ft[0]));var l=ft.pop();if(!l)return 6;Ht.push(l),xt[s.Bb]=l,l.Bb=s.Bb;var h={Cb:"run",hc:s.fc,Ib:s.Ib,Bb:s.Bb};return l.postMessage(h,s.Nb),0},mt=0,$e=(s,l,...h)=>{for(var y=2*h.length,v=On(),A=Pn(8*y),D=A>>>3,R=0;R<h.length;R++){var G=h[R];typeof G=="bigint"?(V[D+2*R]=1n,V[D+2*R+1]=G):(V[D+2*R]=0n,Ce()[D+2*R+1>>>0]=G)}return s=Bi(s,0,y,A,l),fr(v),s};function hn(s){if(u)return $e(0,1,s);if(I=s,!(0<mt)){for(var l of Ht)Do(l);for(l of ft)Do(l);ft=[],Ht=[],xt={},ae=!0}g(0,new mn(s))}function Mo(s){if(u)return $e(1,0,s);gn(s)}var gn=s=>{if(I=s,u)throw Mo(s),"unwind";hn(s)},ft=[],Ht=[],Ro=[],xt={},Uo=s=>{var l=s.Bb;delete xt[l],ft.push(s),Ht.splice(Ht.indexOf(s),1),s.Bb=0,Mi(l)};function No(){Ro.forEach(s=>s())}var Vo=s=>new Promise(l=>{s.onmessage=v=>{var A=(v=v.data).Cb;if(v.Hb&&v.Hb!=pr()){var D=xt[v.Hb];D?D.postMessage(v,v.Nb):x(`Internal error! Worker sent a message "${A}" to target pthread ${v.Hb}, but that thread no longer exists!`)}else A==="checkMailbox"?or():A==="spawnThread"?Bo(v):A==="cleanupThread"?Uo(xt[v.ic]):A==="loaded"?(s.loaded=!0,l(s)):A==="alert"?alert(`Thread ${v.jc}: ${v.text}`):v.target==="setimmediate"?s.postMessage(v):A==="callHandler"?n[v.Rb](...v.args):A&&x(`worker sent an unknown command ${A}`)},s.onerror=v=>{throw x(`worker sent an error! ${v.filename}:${v.lineno}: ${v.message}`),v};var h,y=[];for(h of[])n.propertyIsEnumerable(h)&&y.push(h);s.postMessage({Cb:"load",Sb:y,lc:T,mc:k})});function Wo(){var s=new Worker((()=>{let l=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new l("ort.webgpu.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});ft.push(s)}var wc=s=>{ce();var l=L()[s+52>>>2>>>0];s=L()[s+56>>>2>>>0],Ni(l,l-s),fr(l)},vc=(s,l)=>{mt=0,s=Vi(s,l),0<mt?I=s:En(s)};class $c{constructor(l){this.Jb=l-24}}function xc(s,l,h){var y=new $c(s>>>=0);throw l>>>=0,h>>>=0,L()[y.Jb+16>>>2>>>0]=0,L()[y.Jb+4>>>2>>>0]=l,L()[y.Jb+8>>>2>>>0]=h,s}function Lo(s,l,h,y){return u?$e(2,1,s,l,h,y):Go(s,l,h,y)}function Go(s,l,h,y){if(s>>>=0,h>>>=0,y>>>=0,d===void 0)return 6;var v=[];return u&&v.length===0?Lo(s,l>>>=0,h,y):(s={fc:h,Bb:s,Ib:y,Nb:v},u?(s.Cb="spawnThread",postMessage(s,v),0):Bo(s))}var Ho=typeof TextDecoder<"u"?new TextDecoder:void 0,Fo=(s,l=0,h=NaN)=>{var y=(l>>>=0)+h;for(h=l;s[h]&&!(h>=y);)++h;if(16<h-l&&s.buffer&&Ho)return Ho.decode(s.buffer instanceof ArrayBuffer?s.subarray(l,h):s.slice(l,h));for(y="";l<h;){var v=s[l++];if(128&v){var A=63&s[l++];if((224&v)==192)y+=String.fromCharCode((31&v)<<6|A);else{var D=63&s[l++];65536>(v=(240&v)==224?(15&v)<<12|A<<6|D:(7&v)<<18|A<<12|D<<6|63&s[l++])?y+=String.fromCharCode(v):(v-=65536,y+=String.fromCharCode(55296|v>>10,56320|1023&v))}}else y+=String.fromCharCode(v)}return y},Te=(s,l)=>(s>>>=0)?Fo(ve(),s,l):"";function qo(s,l,h){return u?$e(3,1,s,l,h):0}function Ko(s,l){if(u)return $e(4,1,s,l)}var jo=s=>{for(var l=0,h=0;h<s.length;++h){var y=s.charCodeAt(h);127>=y?l++:2047>=y?l+=2:55296<=y&&57343>=y?(l+=4,++h):l+=3}return l},Dt=(s,l,h)=>{var y=ve();if(l>>>=0,0<h){var v=l;h=l+h-1;for(var A=0;A<s.length;++A){var D=s.charCodeAt(A);if(55296<=D&&57343>=D&&(D=65536+((1023&D)<<10)|1023&s.charCodeAt(++A)),127>=D){if(l>=h)break;y[l++>>>0]=D}else{if(2047>=D){if(l+1>=h)break;y[l++>>>0]=192|D>>6}else{if(65535>=D){if(l+2>=h)break;y[l++>>>0]=224|D>>12}else{if(l+3>=h)break;y[l++>>>0]=240|D>>18,y[l++>>>0]=128|D>>12&63}y[l++>>>0]=128|D>>6&63}y[l++>>>0]=128|63&D}}y[l>>>0]=0,s=l-v}else s=0;return s};function Zo(s,l){if(u)return $e(5,1,s,l)}function Qo(s,l,h){if(u)return $e(6,1,s,l,h)}function Yo(s,l,h){return u?$e(7,1,s,l,h):0}function Xo(s,l){if(u)return $e(8,1,s,l)}function Jo(s,l,h){if(u)return $e(9,1,s,l,h)}function ei(s,l,h,y){if(u)return $e(10,1,s,l,h,y)}function ti(s,l,h,y){if(u)return $e(11,1,s,l,h,y)}function ri(s,l,h,y){if(u)return $e(12,1,s,l,h,y)}function ni(s){if(u)return $e(13,1,s)}function oi(s,l){if(u)return $e(14,1,s,l)}function ii(s,l,h){if(u)return $e(15,1,s,l,h)}var ai,ht,Sc=()=>pt(""),Ze=s=>{for(var l="";ve()[s>>>0];)l+=ai[ve()[s++>>>0]];return l},bn={},yn={},Tc={};function at(s,l,h={}){return function(y,v,A={}){var D=v.name;if(!y)throw new ht(`type "${D}" must have a positive integer typeid pointer`);if(yn.hasOwnProperty(y)){if(A.Tb)return;throw new ht(`Cannot register type '${D}' twice`)}yn[y]=v,delete Tc[y],bn.hasOwnProperty(y)&&(v=bn[y],delete bn[y],v.forEach(R=>R()))}(s,l,h)}var si=(s,l,h)=>{switch(l){case 1:return h?y=>re()[y>>>0]:y=>ve()[y>>>0];case 2:return h?y=>_e()[y>>>1>>>0]:y=>ee()[y>>>1>>>0];case 4:return h?y=>C()[y>>>2>>>0]:y=>L()[y>>>2>>>0];case 8:return h?y=>V[y>>>3]:y=>de[y>>>3];default:throw new TypeError(`invalid integer width (${l}): ${s}`)}};function Ic(s,l,h){h>>>=0,at(s>>>=0,{name:l=Ze(l>>>0),fromWireType:y=>y,toWireType:function(y,v){if(typeof v!="bigint"&&typeof v!="number")throw v=v===null?"null":(y=typeof v)=="object"||y==="array"||y==="function"?v.toString():""+v,new TypeError(`Cannot convert "${v}" to ${this.name}`);return typeof v=="number"&&(v=BigInt(v)),v},Db:gt,readValueFromPointer:si(l,h,l.indexOf("u")==-1),Eb:null})}var gt=8;function Cc(s,l,h,y){at(s>>>=0,{name:l=Ze(l>>>0),fromWireType:function(v){return!!v},toWireType:function(v,A){return A?h:y},Db:gt,readValueFromPointer:function(v){return this.fromWireType(ve()[v>>>0])},Eb:null})}var _n=[],st=[];function wn(s){9<(s>>>=0)&&--st[s+1]==0&&(st[s]=void 0,_n.push(s))}var Oe=s=>{if(!s)throw new ht("Cannot use deleted val. handle = "+s);return st[s]},Ve=s=>{switch(s){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let l=_n.pop()||st.length;return st[l]=s,st[l+1]=1,l}};function vn(s){return this.fromWireType(L()[s>>>2>>>0])}var Ac={name:"emscripten::val",fromWireType:s=>{var l=Oe(s);return wn(s),l},toWireType:(s,l)=>Ve(l),Db:gt,readValueFromPointer:vn,Eb:null};function kc(s){return at(s>>>0,Ac)}var Ec=(s,l)=>{switch(l){case 4:return function(h){return this.fromWireType(le()[h>>>2>>>0])};case 8:return function(h){return this.fromWireType(Ce()[h>>>3>>>0])};default:throw new TypeError(`invalid float width (${l}): ${s}`)}};function Pc(s,l,h){h>>>=0,at(s>>>=0,{name:l=Ze(l>>>0),fromWireType:y=>y,toWireType:(y,v)=>v,Db:gt,readValueFromPointer:Ec(l,h),Eb:null})}function Oc(s,l,h,y,v){if(s>>>=0,h>>>=0,l=Ze(l>>>0),v===-1&&(v=4294967295),v=R=>R,y===0){var A=32-8*h;v=R=>R<<A>>>A}var D=l.includes("unsigned")?function(R,G){return G>>>0}:function(R,G){return G};at(s,{name:l,fromWireType:v,toWireType:D,Db:gt,readValueFromPointer:si(l,h,y!==0),Eb:null})}function zc(s,l,h){function y(A){var D=L()[A>>>2>>>0];return A=L()[A+4>>>2>>>0],new v(re().buffer,A,D)}var v=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][l];at(s>>>=0,{name:h=Ze(h>>>0),fromWireType:y,Db:gt,readValueFromPointer:y},{Tb:!0})}function Dc(s,l){at(s>>>=0,{name:l=Ze(l>>>0),fromWireType:function(h){for(var y,v=L()[h>>>2>>>0],A=h+4,D=A,R=0;R<=v;++R){var G=A+R;R!=v&&ve()[G>>>0]!=0||(D=Te(D,G-D),y===void 0?y=D:(y+="\0",y+=D),D=G+1)}return Ye(h),y},toWireType:function(h,y){y instanceof ArrayBuffer&&(y=new Uint8Array(y));var v=typeof y=="string";if(!(v||y instanceof Uint8Array||y instanceof Uint8ClampedArray||y instanceof Int8Array))throw new ht("Cannot pass non-string to std::string");var A=v?jo(y):y.length,D=mr(4+A+1),R=D+4;if(L()[D>>>2>>>0]=A,v)Dt(y,R,A+1);else if(v)for(v=0;v<A;++v){var G=y.charCodeAt(v);if(255<G)throw Ye(D),new ht("String has UTF-16 code units that do not fit in 8 bits");ve()[R+v>>>0]=G}else for(v=0;v<A;++v)ve()[R+v>>>0]=y[v];return h!==null&&h.push(Ye,D),D},Db:gt,readValueFromPointer:vn,Eb(h){Ye(h)}})}var ui=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Bc=(s,l)=>{for(var h=s>>1,y=h+l/2;!(h>=y)&&ee()[h>>>0];)++h;if(32<(h<<=1)-s&&ui)return ui.decode(ve().slice(s,h));for(h="",y=0;!(y>=l/2);++y){var v=_e()[s+2*y>>>1>>>0];if(v==0)break;h+=String.fromCharCode(v)}return h},Mc=(s,l,h)=>{if(h??=2147483647,2>h)return 0;var y=l;h=(h-=2)<2*s.length?h/2:s.length;for(var v=0;v<h;++v){var A=s.charCodeAt(v);_e()[l>>>1>>>0]=A,l+=2}return _e()[l>>>1>>>0]=0,l-y},Rc=s=>2*s.length,Uc=(s,l)=>{for(var h=0,y="";!(h>=l/4);){var v=C()[s+4*h>>>2>>>0];if(v==0)break;++h,65536<=v?(v-=65536,y+=String.fromCharCode(55296|v>>10,56320|1023&v)):y+=String.fromCharCode(v)}return y},Nc=(s,l,h)=>{if(l>>>=0,h??=2147483647,4>h)return 0;var y=l;h=y+h-4;for(var v=0;v<s.length;++v){var A=s.charCodeAt(v);if(55296<=A&&57343>=A&&(A=65536+((1023&A)<<10)|1023&s.charCodeAt(++v)),C()[l>>>2>>>0]=A,(l+=4)+4>h)break}return C()[l>>>2>>>0]=0,l-y},Vc=s=>{for(var l=0,h=0;h<s.length;++h){var y=s.charCodeAt(h);55296<=y&&57343>=y&&++h,l+=4}return l};function Wc(s,l,h){if(s>>>=0,l>>>=0,h=Ze(h>>>=0),l===2)var y=Bc,v=Mc,A=Rc,D=R=>ee()[R>>>1>>>0];else l===4&&(y=Uc,v=Nc,A=Vc,D=R=>L()[R>>>2>>>0]);at(s,{name:h,fromWireType:R=>{for(var G,K=L()[R>>>2>>>0],se=R+4,pe=0;pe<=K;++pe){var we=R+4+pe*l;pe!=K&&D(we)!=0||(se=y(se,we-se),G===void 0?G=se:(G+="\0",G+=se),se=we+l)}return Ye(R),G},toWireType:(R,G)=>{if(typeof G!="string")throw new ht(`Cannot pass non-string to C++ string type ${h}`);var K=A(G),se=mr(4+K+l);return L()[se>>>2>>>0]=K/l,v(G,se+4,K+l),R!==null&&R.push(Ye,se),se},Db:gt,readValueFromPointer:vn,Eb(R){Ye(R)}})}function Lc(s,l){at(s>>>=0,{Ub:!0,name:l=Ze(l>>>0),Db:0,fromWireType:()=>{},toWireType:()=>{}})}function Gc(s){kn(s>>>0,!a,1,!i,131072,!1),No()}var $n=s=>{if(!ae)try{if(s(),!(0<mt))try{u?En(I):gn(I)}catch(l){l instanceof mn||l=="unwind"||g(0,l)}}catch(l){l instanceof mn||l=="unwind"||g(0,l)}};function xn(s){s>>>=0,typeof Atomics.kc=="function"&&(Atomics.kc(C(),s>>>2,s).value.then(or),s+=128,Atomics.store(C(),s>>>2,1))}var or=()=>{var s=pr();s&&(xn(s),$n(Ui))};function Hc(s,l){(s>>>=0)==l>>>0?setTimeout(or):u?postMessage({Hb:s,Cb:"checkMailbox"}):(s=xt[s])&&s.postMessage({Cb:"checkMailbox"})}var Sn=[];function Fc(s,l,h,y,v){for(l>>>=0,y/=2,Sn.length=y,h=v>>>0>>>3,v=0;v<y;v++)Sn[v]=V[h+2*v]?V[h+2*v+1]:Ce()[h+2*v+1>>>0];return(l?pn[l]:Up[s])(...Sn)}var qc=()=>{mt=0};function Kc(s){s>>>=0,u?postMessage({Cb:"cleanupThread",ic:s}):Uo(xt[s])}function jc(s){}var ir=(s,l)=>{var h=yn[s];if(h===void 0)throw s=Oi(s),h=Ze(s),Ye(s),new ht(`${l} has unknown type ${h}`);return h},di=(s,l,h)=>{var y=[];return s=s.toWireType(y,h),y.length&&(L()[l>>>2>>>0]=Ve(y)),s};function Zc(s,l,h){return l>>>=0,h>>>=0,s=Oe(s>>>0),l=ir(l,"emval::as"),di(l,h,s)}function Qc(s,l){return l>>>=0,s=Oe(s>>>0),(l=ir(l,"emval::as")).toWireType(null,s)}var ar=s=>{try{s()}catch(l){pt(l)}},bt=0,Qe=null,li=0,sr=[],ci={},pi={},Yc=0,Tn=null,Xc=[];function mi(s){return function(l){if(!ae){if(bt===0){var h=!1,y=!1;l((v=0)=>{if(!ae&&(li=v,h=!0,y)){bt=2,ar(()=>Gi(Qe)),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.resume(),v=!1;try{var A=function(){var G=C()[Qe+8>>>2>>>0];return G=Q[pi[G]],--mt,G()}()}catch(G){A=G,v=!0}var D=!1;if(!Qe){var R=Tn;R&&(Tn=null,(v?R.reject:R.resolve)(A),D=!0)}if(v&&!D)throw A}}),y=!0,h||(bt=1,Qe=function(){var v=mr(65548),A=v+12;L()[v>>>2>>>0]=A,L()[v+4>>>2>>>0]=A+65536,A=sr[0];var D=ci[A];return D===void 0&&(D=Yc++,ci[A]=D,pi[D]=A),A=D,C()[v+8>>>2>>>0]=A,v}(),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.pause(),ar(()=>Wi(Qe)))}else bt===2?(bt=0,ar(Hi),Ye(Qe),Qe=null,Xc.forEach($n)):pt(`invalid state: ${bt}`);return li}}(l=>{s().then(l)})}function Jc(s){return s>>>=0,mi(async()=>{var l=await Oe(s);return Ve(l)})}var ur=[];function ep(s,l,h,y){return h>>>=0,y>>>=0,(s=ur[s>>>0])(null,l=Oe(l>>>0),h,y)}var tp={},dr=s=>{var l=tp[s];return l===void 0?Ze(s):l};function rp(s,l,h,y,v){return h>>>=0,y>>>=0,v>>>=0,(s=ur[s>>>0])(l=Oe(l>>>0),l[h=dr(h)],y,v)}function np(s,l){return l>>>=0,(s=Oe(s>>>0))==Oe(l)}var fi=()=>typeof globalThis=="object"?globalThis:Function("return this")();function op(s){return(s>>>=0)==0?Ve(fi()):(s=dr(s),Ve(fi()[s]))}var ip=s=>{var l=ur.length;return ur.push(s),l},ap=(s,l)=>{for(var h=Array(s),y=0;y<s;++y)h[y]=ir(L()[l+4*y>>>2>>>0],"parameter "+y);return h},hi=(s,l)=>Object.defineProperty(l,"name",{value:s});function sp(s,l,h){var y=(l=ap(s,l>>>0)).shift();s--;var v=`return function (obj, func, destructorsRef, args) {
`,A=0,D=[];h===0&&D.push("obj");for(var R=["retType"],G=[y],K=0;K<s;++K)D.push("arg"+K),R.push("argType"+K),G.push(l[K]),v+=`  var arg${K} = argType${K}.readValueFromPointer(args${A?"+"+A:""});
`,A+=l[K].Db;return v+=`  var rv = ${h===1?"new func":"func.call"}(${D.join(", ")});
`,y.Ub||(R.push("emval_returnValue"),G.push(di),v+=`  return emval_returnValue(retType, destructorsRef, rv);
`),R.push(v+`};
`),s=function(se){var pe=Function;if(!(pe instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof pe} which is not a function`);var we=hi(pe.name||"unknownFunctionName",function(){});return we.prototype=pe.prototype,we=new we,(se=pe.apply(we,se))instanceof Object?se:we}(R)(...G),h=`methodCaller<(${l.map(se=>se.name).join(", ")}) => ${y.name}>`,ip(hi(h,s))}function up(s){return s=dr(s>>>0),Ve(n[s])}function dp(s,l){return l>>>=0,s=Oe(s>>>0),l=Oe(l),Ve(s[l])}function lp(s){9<(s>>>=0)&&(st[s+1]+=1)}function cp(){return Ve([])}function pp(s){s=Oe(s>>>0);for(var l=Array(s.length),h=0;h<s.length;h++)l[h]=s[h];return Ve(l)}function mp(s){return Ve(dr(s>>>0))}function fp(){return Ve({})}function hp(s){for(var l=Oe(s>>>=0);l.length;){var h=l.pop();l.pop()(h)}wn(s)}function gp(s,l,h){l>>>=0,h>>>=0,s=Oe(s>>>0),l=Oe(l),h=Oe(h),s[l]=h}function bp(s,l){return l>>>=0,s=(s=ir(s>>>0,"_emval_take_value")).readValueFromPointer(l),Ve(s)}function yp(s,l){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),l>>>=0,s=new Date(1e3*s),C()[l>>>2>>>0]=s.getUTCSeconds(),C()[l+4>>>2>>>0]=s.getUTCMinutes(),C()[l+8>>>2>>>0]=s.getUTCHours(),C()[l+12>>>2>>>0]=s.getUTCDate(),C()[l+16>>>2>>>0]=s.getUTCMonth(),C()[l+20>>>2>>>0]=s.getUTCFullYear()-1900,C()[l+24>>>2>>>0]=s.getUTCDay(),s=(s.getTime()-Date.UTC(s.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,C()[l+28>>>2>>>0]=s}var gi=s=>s%4==0&&(s%100!=0||s%400==0),bi=[0,31,60,91,121,152,182,213,244,274,305,335],yi=[0,31,59,90,120,151,181,212,243,273,304,334];function _p(s,l){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),l>>>=0,s=new Date(1e3*s),C()[l>>>2>>>0]=s.getSeconds(),C()[l+4>>>2>>>0]=s.getMinutes(),C()[l+8>>>2>>>0]=s.getHours(),C()[l+12>>>2>>>0]=s.getDate(),C()[l+16>>>2>>>0]=s.getMonth(),C()[l+20>>>2>>>0]=s.getFullYear()-1900,C()[l+24>>>2>>>0]=s.getDay();var h=(gi(s.getFullYear())?bi:yi)[s.getMonth()]+s.getDate()-1|0;C()[l+28>>>2>>>0]=h,C()[l+36>>>2>>>0]=-60*s.getTimezoneOffset(),h=new Date(s.getFullYear(),6,1).getTimezoneOffset();var y=new Date(s.getFullYear(),0,1).getTimezoneOffset();s=0|(h!=y&&s.getTimezoneOffset()==Math.min(y,h)),C()[l+32>>>2>>>0]=s}function wp(s){s>>>=0;var l=new Date(C()[s+20>>>2>>>0]+1900,C()[s+16>>>2>>>0],C()[s+12>>>2>>>0],C()[s+8>>>2>>>0],C()[s+4>>>2>>>0],C()[s>>>2>>>0],0),h=C()[s+32>>>2>>>0],y=l.getTimezoneOffset(),v=new Date(l.getFullYear(),6,1).getTimezoneOffset(),A=new Date(l.getFullYear(),0,1).getTimezoneOffset(),D=Math.min(A,v);return 0>h?C()[s+32>>>2>>>0]=+(v!=A&&D==y):0<h!=(D==y)&&(v=Math.max(A,v),l.setTime(l.getTime()+6e4*((0<h?D:v)-y))),C()[s+24>>>2>>>0]=l.getDay(),h=(gi(l.getFullYear())?bi:yi)[l.getMonth()]+l.getDate()-1|0,C()[s+28>>>2>>>0]=h,C()[s>>>2>>>0]=l.getSeconds(),C()[s+4>>>2>>>0]=l.getMinutes(),C()[s+8>>>2>>>0]=l.getHours(),C()[s+12>>>2>>>0]=l.getDate(),C()[s+16>>>2>>>0]=l.getMonth(),C()[s+20>>>2>>>0]=l.getYear(),s=l.getTime(),BigInt(isNaN(s)?-1:s/1e3)}function _i(s,l,h,y,v,A,D){return u?$e(16,1,s,l,h,y,v,A,D):-52}function wi(s,l,h,y,v,A){if(u)return $e(17,1,s,l,h,y,v,A)}var Ft={},vp=()=>performance.timeOrigin+performance.now();function vi(s,l){if(u)return $e(18,1,s,l);if(Ft[s]&&(clearTimeout(Ft[s].id),delete Ft[s]),!l)return 0;var h=setTimeout(()=>{delete Ft[s],$n(()=>Ri(s,performance.timeOrigin+performance.now()))},l);return Ft[s]={id:h,rc:l},0}function $p(s,l,h,y){s>>>=0,l>>>=0,h>>>=0,y>>>=0;var v=new Date().getFullYear(),A=new Date(v,0,1).getTimezoneOffset();v=new Date(v,6,1).getTimezoneOffset();var D=Math.max(A,v);L()[s>>>2>>>0]=60*D,C()[l>>>2>>>0]=+(A!=v),s=(l=R=>{var G=Math.abs(R);return`UTC${0<=R?"-":"+"}${String(Math.floor(G/60)).padStart(2,"0")}${String(G%60).padStart(2,"0")}`})(A),l=l(v),v<A?(Dt(s,h,17),Dt(l,y,17)):(Dt(s,y,17),Dt(l,h,17))}var xp=()=>Date.now(),Sp=1;function Tp(s,l,h){if(!(0<=s&&3>=s))return 28;if(s===0)s=Date.now();else{if(!Sp)return 52;s=performance.timeOrigin+performance.now()}return V[h>>>0>>>3]=BigInt(Math.round(1e6*s)),0}var In=[],$i=(s,l)=>{In.length=0;for(var h;h=ve()[s++>>>0];){var y=h!=105;l+=(y&=h!=112)&&l%8?4:0,In.push(h==112?L()[l>>>2>>>0]:h==106?V[l>>>3]:h==105?C()[l>>>2>>>0]:Ce()[l>>>3>>>0]),l+=y?8:4}return In};function Ip(s,l,h){return s>>>=0,l=$i(l>>>0,h>>>0),pn[s](...l)}function Cp(s,l,h){return s>>>=0,l=$i(l>>>0,h>>>0),pn[s](...l)}var Ap=()=>{};function kp(s,l){return x(Te(s>>>0,l>>>0))}var Ep=()=>{throw mt+=1,"unwind"};function Pp(){return 4294901760}var Op=()=>navigator.hardwareConcurrency;function zp(){return pt("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function Dp(s){s>>>=0;var l=ve().length;if(s<=l||4294901760<s)return!1;for(var h=1;4>=h;h*=2){var y=l*(1+.2/h);y=Math.min(y,s+100663296);e:{y=(Math.min(4294901760,65536*Math.ceil(Math.max(s,y)/65536))-T.buffer.byteLength+65535)/65536|0;try{T.grow(y),ce();var v=1;break e}catch{}v=void 0}if(v)return!0}return!1}var lr=()=>(pt("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Bt={},xi=s=>{s.forEach(l=>{var h=lr();h&&(Bt[h]=l)})};function Bp(){var s=Error().stack.toString().split(`
`);return s[0]=="Error"&&s.shift(),xi(s),Bt.Mb=lr(),Bt.dc=s,Bt.Mb}function Mp(s,l,h){if(s>>>=0,l>>>=0,Bt.Mb==s)var y=Bt.dc;else(y=Error().stack.toString().split(`
`))[0]=="Error"&&y.shift(),xi(y);for(var v=3;y[v]&&lr()!=s;)++v;for(s=0;s<h&&y[s+v];++s)C()[l+4*s>>>2>>>0]=lr();return s}var Cn,An={},Si=()=>{if(!Cn){var s,l={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(s in An)An[s]===void 0?delete l[s]:l[s]=An[s];var h=[];for(s in l)h.push(`${s}=${l[s]}`);Cn=h}return Cn};function Ti(s,l){if(u)return $e(19,1,s,l);s>>>=0,l>>>=0;var h=0;return Si().forEach((y,v)=>{var A=l+h;for(v=L()[s+4*v>>>2>>>0]=A,A=0;A<y.length;++A)re()[v++>>>0]=y.charCodeAt(A);re()[v>>>0]=0,h+=y.length+1}),0}function Ii(s,l){if(u)return $e(20,1,s,l);s>>>=0,l>>>=0;var h=Si();L()[s>>>2>>>0]=h.length;var y=0;return h.forEach(v=>y+=v.length+1),L()[l>>>2>>>0]=y,0}function Ci(s){return u?$e(21,1,s):52}function Ai(s,l,h,y){return u?$e(22,1,s,l,h,y):52}function ki(s,l,h,y){return u?$e(23,1,s,l,h,y):70}var Rp=[null,[],[]];function Ei(s,l,h,y){if(u)return $e(24,1,s,l,h,y);l>>>=0,h>>>=0,y>>>=0;for(var v=0,A=0;A<h;A++){var D=L()[l>>>2>>>0],R=L()[l+4>>>2>>>0];l+=8;for(var G=0;G<R;G++){var K=ve()[D+G>>>0],se=Rp[s];K===0||K===10?((s===1?w:x)(Fo(se)),se.length=0):se.push(K)}v+=R}return L()[y>>>2>>>0]=v,0}u||function(){for(var s=n.numThreads-1;s--;)Wo();fn.unshift(()=>{ct++,function(l){u?l():Promise.all(ft.map(Vo)).then(l)}(()=>Oo())})}();for(var Pi=Array(256),cr=0;256>cr;++cr)Pi[cr]=String.fromCharCode(cr);ai=Pi,ht=n.BindingError=class extends Error{constructor(s){super(s),this.name="BindingError"}},n.InternalError=class extends Error{constructor(s){super(s),this.name="InternalError"}},st.push(0,1,void 0,1,null,1,!0,1,!1,1),n.count_emval_handles=()=>st.length/2-5-_n.length;var Q,Up=[hn,Mo,Lo,qo,Ko,Zo,Qo,Yo,Xo,Jo,ei,ti,ri,ni,oi,ii,_i,wi,vi,Ti,Ii,Ci,Ai,ki,Ei];(async function(){function s(y,v){return Q=y.exports,Q=function(){var A=Q,D={};for(let[R,G]of Object.entries(A))D[R]=typeof G=="function"?(...K)=>{sr.push(R);try{return G(...K)}finally{ae||(sr.pop(),Qe&&bt===1&&sr.length===0&&(bt=0,mt+=1,ar(Li),typeof Fibers<"u"&&Fibers.sc()))}}:G;return D}(),Q=function(){var A=Q,D=G=>K=>G(K)>>>0,R=G=>()=>G()>>>0;return(A=Object.assign({},A)).Ea=D(A.Ea),A.gb=R(A.gb),A.ib=D(A.ib),A.ub=D(A.ub),A.vb=R(A.vb),A.__cxa_get_exception_ptr=D(A.__cxa_get_exception_ptr),A}(),Ro.push(Q.jb),k=v,Oo(),Q}ct++;var l=zo();if(n.instantiateWasm)return new Promise(y=>{n.instantiateWasm(l,(v,A)=>{s(v,A),y(v.exports)})});if(u)return new Promise(y=>{ze=v=>{var A=new WebAssembly.Instance(v,zo());y(s(A,v))}});lt??=n.locateFile?n.locateFile?n.locateFile("ort-wasm-simd-threaded.jsep.wasm",_):_+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href;try{var h=await async function(y){var v=lt;if(!H&&typeof WebAssembly.instantiateStreaming=="function"&&!Z(v))try{var A=fetch(v,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(A,y)}catch(D){x(`wasm streaming compile failed: ${D}`),x("falling back to ArrayBuffer instantiation")}return async function(D,R){try{var G=await async function(K){if(!H)try{var se=await m(K);return new Uint8Array(se)}catch{}if(K==lt&&H)K=new Uint8Array(H);else{if(!f)throw"both async and sync fetching of the wasm failed";K=f(K)}return K}(D);return await WebAssembly.instantiate(G,R)}catch(K){x(`failed to asynchronously prepare wasm: ${K}`),pt(K)}}(v,y)}(l);return s(h.instance,h.module)}catch(y){return r(y),Promise.reject(y)}})();var Oi=s=>(Oi=Q.Ea)(s),zi=()=>(zi=Q.Fa)();n._OrtInit=(s,l)=>(n._OrtInit=Q.Ga)(s,l),n._OrtGetLastError=(s,l)=>(n._OrtGetLastError=Q.Ha)(s,l),n._OrtCreateSessionOptions=(s,l,h,y,v,A,D,R,G,K)=>(n._OrtCreateSessionOptions=Q.Ia)(s,l,h,y,v,A,D,R,G,K),n._OrtAppendExecutionProvider=(s,l,h,y,v)=>(n._OrtAppendExecutionProvider=Q.Ja)(s,l,h,y,v),n._OrtAddFreeDimensionOverride=(s,l,h)=>(n._OrtAddFreeDimensionOverride=Q.Ka)(s,l,h),n._OrtAddSessionConfigEntry=(s,l,h)=>(n._OrtAddSessionConfigEntry=Q.La)(s,l,h),n._OrtReleaseSessionOptions=s=>(n._OrtReleaseSessionOptions=Q.Ma)(s),n._OrtCreateSession=(s,l,h)=>(n._OrtCreateSession=Q.Na)(s,l,h),n._OrtReleaseSession=s=>(n._OrtReleaseSession=Q.Oa)(s),n._OrtGetInputOutputCount=(s,l,h)=>(n._OrtGetInputOutputCount=Q.Pa)(s,l,h),n._OrtGetInputOutputMetadata=(s,l,h,y)=>(n._OrtGetInputOutputMetadata=Q.Qa)(s,l,h,y),n._OrtFree=s=>(n._OrtFree=Q.Ra)(s),n._OrtCreateTensor=(s,l,h,y,v,A)=>(n._OrtCreateTensor=Q.Sa)(s,l,h,y,v,A),n._OrtGetTensorData=(s,l,h,y,v)=>(n._OrtGetTensorData=Q.Ta)(s,l,h,y,v),n._OrtReleaseTensor=s=>(n._OrtReleaseTensor=Q.Ua)(s),n._OrtCreateRunOptions=(s,l,h,y)=>(n._OrtCreateRunOptions=Q.Va)(s,l,h,y),n._OrtAddRunConfigEntry=(s,l,h)=>(n._OrtAddRunConfigEntry=Q.Wa)(s,l,h),n._OrtReleaseRunOptions=s=>(n._OrtReleaseRunOptions=Q.Xa)(s),n._OrtCreateBinding=s=>(n._OrtCreateBinding=Q.Ya)(s),n._OrtBindInput=(s,l,h)=>(n._OrtBindInput=Q.Za)(s,l,h),n._OrtBindOutput=(s,l,h,y)=>(n._OrtBindOutput=Q._a)(s,l,h,y),n._OrtClearBoundOutputs=s=>(n._OrtClearBoundOutputs=Q.$a)(s),n._OrtReleaseBinding=s=>(n._OrtReleaseBinding=Q.ab)(s),n._OrtRunWithBinding=(s,l,h,y,v)=>(n._OrtRunWithBinding=Q.bb)(s,l,h,y,v),n._OrtRun=(s,l,h,y,v,A,D,R)=>(n._OrtRun=Q.cb)(s,l,h,y,v,A,D,R),n._OrtEndProfiling=s=>(n._OrtEndProfiling=Q.db)(s),n._JsepOutput=(s,l,h)=>(n._JsepOutput=Q.eb)(s,l,h),n._JsepGetNodeName=s=>(n._JsepGetNodeName=Q.fb)(s);var pr=()=>(pr=Q.gb)(),Ye=n._free=s=>(Ye=n._free=Q.hb)(s),mr=n._malloc=s=>(mr=n._malloc=Q.ib)(s),kn=(s,l,h,y,v,A)=>(kn=Q.lb)(s,l,h,y,v,A),Di=()=>(Di=Q.mb)(),Bi=(s,l,h,y,v)=>(Bi=Q.nb)(s,l,h,y,v),Mi=s=>(Mi=Q.ob)(s),En=s=>(En=Q.pb)(s),Ri=(s,l)=>(Ri=Q.qb)(s,l),Ui=()=>(Ui=Q.rb)(),Ni=(s,l)=>(Ni=Q.sb)(s,l),fr=s=>(fr=Q.tb)(s),Pn=s=>(Pn=Q.ub)(s),On=()=>(On=Q.vb)(),Vi=n.dynCall_ii=(s,l)=>(Vi=n.dynCall_ii=Q.wb)(s,l),Wi=s=>(Wi=Q.xb)(s),Li=()=>(Li=Q.yb)(),Gi=s=>(Gi=Q.zb)(s),Hi=()=>(Hi=Q.Ab)();return n.stackSave=()=>On(),n.stackRestore=s=>fr(s),n.stackAlloc=s=>Pn(s),n.setValue=function(s,l,h="i8"){switch(h.endsWith("*")&&(h="*"),h){case"i1":case"i8":re()[s>>>0]=l;break;case"i16":_e()[s>>>1>>>0]=l;break;case"i32":C()[s>>>2>>>0]=l;break;case"i64":V[s>>>3]=BigInt(l);break;case"float":le()[s>>>2>>>0]=l;break;case"double":Ce()[s>>>3>>>0]=l;break;case"*":L()[s>>>2>>>0]=l;break;default:pt(`invalid type for setValue: ${h}`)}},n.getValue=function(s,l="i8"){switch(l.endsWith("*")&&(l="*"),l){case"i1":case"i8":return re()[s>>>0];case"i16":return _e()[s>>>1>>>0];case"i32":return C()[s>>>2>>>0];case"i64":return V[s>>>3];case"float":return le()[s>>>2>>>0];case"double":return Ce()[s>>>3>>>0];case"*":return L()[s>>>2>>>0];default:pt(`invalid type for getValue: ${l}`)}},n.UTF8ToString=Te,n.stringToUTF8=Dt,n.lengthBytesUTF8=jo,function s(){if(0<ct)zt=s;else if(u)t(n),Ge();else{for(;0<fn.length;)fn.shift()(n);0<ct?zt=s:(n.calledRun=!0,ae||(Ge(),t(n)))}}(),n.PTR_SIZE=4,o}),Kp=Sa,jp=globalThis.self?.name?.startsWith("em-pthread");jp&&Sa()});var ka,Hn,Zp,Ue,Ea,Gn,Qp,Yp,Pa,Xp,Ca,Oa,Aa,za,wr=U(()=>{"use strict";_r();ka=typeof location>"u"?void 0:location.origin,Hn=import.meta.url>"file:"&&import.meta.url<"file;",Zp=()=>{if(!!1){if(Hn){let e=URL;return new URL(new e("ort.webgpu.bundle.min.mjs",import.meta.url).href,ka).href}return import.meta.url}},Ue=Zp(),Ea=()=>{if(Ue&&!Ue.startsWith("blob:"))return Ue.substring(0,Ue.lastIndexOf("/")+1)},Gn=(e,t)=>{try{let r=t??Ue;return(r?new URL(e,r):new URL(e)).origin===ka}catch{return!1}},Qp=(e,t)=>{let r=t??Ue;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},Yp=(e,t)=>`${t??"./"}${e}`,Pa=async e=>{let r=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},Xp=async e=>(await import(/*webpackIgnore:true*/e)).default,Ca=(xa(),qt($a)).default,Oa=async()=>{if(!Ue)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Gn(Ue))return[void 0,Ca()];let e=await Pa(Ue);return[e,Ca(e)]},Aa=(Ia(),qt(Ta)).default,za=async(e,t,r)=>{if(!e&&!t&&Aa&&Ue&&Gn(Ue))return[void 0,Aa];{let n="ort-wasm-simd-threaded.jsep.mjs",o=e??Qp(n,t),i=!!1&&r&&o&&!Gn(o,t),a=i?await Pa(o):o??Yp(n,t);return[i?a:void 0,await Xp(a)]}}});var Fn,qn,kr,Da,Jp,em,tm,vr,ge,yt=U(()=>{"use strict";wr();qn=!1,kr=!1,Da=!1,Jp=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},em=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},tm=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},vr=async e=>{if(qn)return Promise.resolve();if(kr)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Da)throw new Error("previous call to 'initializeWebAssembly()' failed.");kr=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!tm())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!em())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let n=Jp();r>1&&!n&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let o=e.wasmPaths,i=typeof o=="string"?o:void 0,a=o?.mjs,u=a?.href??a,d=o?.wasm,c=d?.href??d,p=e.wasmBinary,[m,f]=await za(u,i,r>1),b=!1,g=[];if(t>0&&g.push(new Promise(_=>{setTimeout(()=>{b=!0,_()},t)})),g.push(new Promise((_,S)=>{let $={numThreads:r};if(p)$.wasmBinary=p;else if(c||i)$.locateFile=w=>c??i+w;else if(u&&u.indexOf("blob:")!==0)$.locateFile=w=>new URL(w,u).href;else if(m){let w=Ea();w&&($.locateFile=x=>w+x)}f($).then(w=>{kr=!1,qn=!0,Fn=w,_(),m&&URL.revokeObjectURL(m)},w=>{kr=!1,Da=!0,S(w)})})),await Promise.race(g),b)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},ge=()=>{if(qn&&Fn)return Fn;throw new Error("WebAssembly is not initialized yet.")}});var Ne,Zt,fe,Er=U(()=>{"use strict";yt();Ne=(e,t)=>{let r=ge(),n=r.lengthBytesUTF8(e)+1,o=r._malloc(n);return r.stringToUTF8(e,o,n),t.push(o),o},Zt=(e,t,r,n)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([o,i])=>{let a=t?t+o:o;if(typeof i=="object")Zt(i,a+".",r,n);else if(typeof i=="string"||typeof i=="number")n(a,i.toString());else if(typeof i=="boolean")n(a,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},fe=e=>{let t=ge(),r=t.stackSave();try{let n=t.PTR_SIZE,o=t.stackAlloc(2*n);t._OrtGetLastError(o,o+n);let i=Number(t.getValue(o,n===4?"i32":"i64")),a=t.getValue(o+n,"*"),u=a?t.UTF8ToString(a):"";throw new Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${u}`)}finally{t.stackRestore(r)}}});var Ba,Ma=U(()=>{"use strict";yt();Er();Ba=e=>{let t=ge(),r=0,n=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let i=0;return e?.tag!==void 0&&(i=Ne(e.tag,n)),r=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),r===0&&fe("Can't create run options."),e?.extra!==void 0&&Zt(e.extra,"",new WeakSet,(a,u)=>{let d=Ne(a,n),c=Ne(u,n);t._OrtAddRunConfigEntry(r,d,c)!==0&&fe(`Can't set a run config entry: ${a} - ${u}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseRunOptions(r),n.forEach(a=>t._free(a)),i}}});var rm,nm,om,Pr,im,Ra,Ua=U(()=>{"use strict";yt();Er();rm=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},nm=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},om=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Pr=(e,t,r,n)=>{let o=Ne(t,n),i=Ne(r,n);ge()._OrtAddSessionConfigEntry(e,o,i)!==0&&fe(`Can't set a session config entry: ${t} - ${r}.`)},im=async(e,t,r)=>{for(let n of t){let o=typeof n=="string"?n:n.name,i=[];switch(o){case"webnn":if(o="WEBNN",typeof n!="string"){let m=n?.deviceType;m&&Pr(e,"deviceType",m,r)}break;case"webgpu":if(o="JS",typeof n!="string"){let p=n;if(p?.preferredLayout){if(p.preferredLayout!=="NCHW"&&p.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${p.preferredLayout}`);Pr(e,"preferredLayout",p.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let a=Ne(o,r),u=i.length,d=0,c=0;if(u>0){d=ge()._malloc(u*ge().PTR_SIZE),r.push(d),c=ge()._malloc(u*ge().PTR_SIZE),r.push(c);for(let p=0;p<u;p++)ge().setValue(d+p*ge().PTR_SIZE,i[p][0],"*"),ge().setValue(c+p*ge().PTR_SIZE,i[p][1],"*")}await ge()._OrtAppendExecutionProvider(e,a,d,c,u)!==0&&fe(`Can't append execution provider: ${o}.`)}},Ra=async e=>{let t=ge(),r=0,n=[],o=e||{};om(o);try{let i=rm(o.graphOptimizationLevel??"all"),a=nm(o.executionMode??"sequential"),u=typeof o.logId=="string"?Ne(o.logId,n):0,d=o.logSeverityLevel??2;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log serverity level is not valid: ${d}`);let c=o.logVerbosityLevel??0;if(!Number.isInteger(c)||c<0||c>4)throw new Error(`log verbosity level is not valid: ${c}`);let p=typeof o.optimizedModelFilePath=="string"?Ne(o.optimizedModelFilePath,n):0;if(r=t._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,a,!!o.enableProfiling,0,u,d,c,p),r===0&&fe("Can't create session options."),o.executionProviders&&await im(r,o.executionProviders,n),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);Pr(r,"enableGraphCapture",o.enableGraphCapture.toString(),n)}if(o.freeDimensionOverrides)for(let[m,f]of Object.entries(o.freeDimensionOverrides)){if(typeof m!="string")throw new Error(`free dimension override name must be a string: ${m}`);if(typeof f!="number"||!Number.isInteger(f)||f<0)throw new Error(`free dimension override value must be a non-negative integer: ${f}`);let b=Ne(m,n);t._OrtAddFreeDimensionOverride(r,b,f)!==0&&fe(`Can't set a free dimension override: ${m} - ${f}.`)}return o.extra!==void 0&&Zt(o.extra,"",new WeakSet,(m,f)=>{Pr(r,m,f,n)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&fe("Can't release session options."),n.forEach(a=>t._free(a)),i}}});var _t,Xe,wt,Ut,Qt,Or,zr,Kn,Y=U(()=>{"use strict";_t=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},Xe=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},wt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],n=typeof t=="number"?t:t.reduce((o,i)=>o*i,1);return r>0?Math.ceil(n*r):void 0},Ut=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Qt=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Or=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",zr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Kn=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}});var Yt,jn=U(()=>{"use strict";_r();Yt=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=Dn("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=Dn("node:fs"),n=r(e),o=[];for await(let i of n)o.push(i);return new Uint8Array(Buffer.concat(o))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let o=t.body.getReader(),i;try{i=new ArrayBuffer(n)}catch(u){if(u instanceof RangeError){let d=Math.ceil(n/65536);i=new WebAssembly.Memory({initial:d,maximum:d}).buffer}else throw u}let a=0;for(;;){let{done:u,value:d}=await o.read();if(u)break;let c=d.byteLength;new Uint8Array(i,a,c).set(d),a+=c}return new Uint8Array(i,0,n)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var am,sm,Na,Va,Dr,um,ue,Je=U(()=>{"use strict";Y();am=["V","I","W","E","F"],sm=(e,t)=>{console.log(`[${am[e]},${new Date().toISOString()}]${t}`)},Dr=(e,t)=>{Na=e,Va=t},um=(e,t)=>{let r=Qt(e),n=Qt(Na);r>=n&&sm(r,typeof t=="function"?t():t)},ue=(...e)=>{Va&&um(...e)}});var Zn,et,E,At,Br,Wa,La,ne=U(()=>{"use strict";Zn=class{static calcMatMulShape(t,r){return t[1]!==r[0]?void 0:[t[0],r[1]]}},et=class{static calcShape(t,r,n=!1){let o=t.length,i=r.length;if(o===0)return r;if(i===0)return t;let a=Math.max(t.length,r.length),u=new Array(a);if(n){if(o<2||i<2)return;let d=Zn.calcMatMulShape([t[o-2],t[o-1]],[r[i-2],r[i-1]]);if(d===void 0)return;[u[a-2],u[a-1]]=d}for(let d=n?3:1;d<=a;d++){let c=o-d<0?1:t[o-d],p=i-d<0?1:r[i-d];if(c!==p&&c>1&&p>1)return;let m=Math.max(c,p);if(c&&p)u[a-d]=Math.max(c,p);else{if(m>1)return;u[a-d]=0}}return u}static isValidBroadcast(t,r){let n=t.length,o=r.length;if(n>o)return!1;for(let i=1;i<=n;i++)if(t[n-i]!==1&&t[n-i]!==r[o-i])return!1;return!0}},E=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let n=t.length;if(n===0)return[];let o=new Array(n),i=n-1;for(;i>=0;){if(t[i]%r===0){o[i]=t[i]/r;break}if(r%t[i]!==0)throw new Error("cannot convert shape");o[i]=1,r/=t[i],i--}for(i--;i>=0;i--)o[i]=t[i];return o}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,n){let o=1;for(let i=r;i<n;i++){if(t[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(t[i])}return o}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let n=new Array(r);n[r-1]=1,n[r-2]=t[r-1];for(let o=r-3;o>=0;--o)n[o]=n[o+1]*t[o+1];return n}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(n=>this.normalizeAxis(n,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(n=>t[n]):t.slice().reverse()}static padShape(t,r){let n=t.length;return t.map((o,i)=>o+r[i]+r[i+n])}static areEqual(t,r){return t.length!==r.length?!1:t.every((n,o)=>n===r[o])}},At=class e{static adjustPoolAttributes(t,r,n,o,i,a){if(!t&&n.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<r.length-2;u++)u>=n.length?n.push(r[u+2]):n[u]=r[u+2];for(let u=0;u<n.length;u++)if(u<o.length){if(o[u]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let u=0;u<n.length;u++)if(u<i.length){if(i[u]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let u=0;u<n.length*2;u++)if(u<a.length){if(a[u]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let u=0;u<n.length;u++){if(n[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[u]>=n[u]||a[u+n.length]>=n[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,o,i,a,u){if(u){if(i.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let d=0;d<t.length-2;d++)e.adjustPadAndReturnShape(t[d+(a?1:2)],r[d],n[d],o[d],i,d,d+t.length-2,u)}}static computePoolOutputShape(t,r,n,o,i,a,u){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let d=[r[0],r[1]];return e.computeShapeHelper(t,r,d,n,o,i,a,u),d}static computeConvOutputShape(t,r,n,o,i,a,u){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let d=[t[0],r[0]];return e.computeShapeHelper(!1,t,d,n,o,i,a,u),d}static computeShapeHelper(t,r,n,o,i,a,u,d){if(t)for(let c=0;c<r.length-2;c++)n.push(1);else for(let c=0;c<r.length-2;c++)n.push(e.adjustPadAndReturnShape(r[c+2],o[c],i[c],a[c],u,c,c+r.length-2,d))}static adjustPadAndReturnShape(t,r,n,o,i,a,u,d){let c=n*(o-1)+1;if(d&&d!=="NOTSET")switch(d){case"VALID":return i[a]=0,i[u]=0,Math.floor((t-c)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(n!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let m=((t+r-1)/r-1)*r+o-t;return i[a]=Math.floor(d==="SAME_LOWER"?(m+1)/2:m/2),i[u]=m-i[a],Math.floor((t+m-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+i[a]+i[u]-c)/r+1)}},Br=class{static getShapeOfGemmResult(t,r,n,o,i){if(t.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let a,u,d;r?(a=t[1],u=t[0]):(a=t[0],u=t[1]);let c=-1;if(o?(d=n[0],c=1):(d=n[1],c=0),n[c]!==u)throw new Error("dimension mismatch");if(a<=0||d<=0||u<=0)throw new Error("invalid shape specified");if(i&&!et.isValidBroadcast(i,[a,d]))throw new Error("gemm: invalid bias shape for broadcast");return[a,d,u]}},Wa=-34028234663852886e22,La=34028234663852886e22});var Mr,Qn=U(()=>{"use strict";Y();Mr=(e,t)=>new(Ut(t))(e)});var Ha,Xn,Fa,dm,Ga,lm,qa,Rr,Ur,Yn,Ka,ja=U(()=>{"use strict";Y();Je();Ha=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Xn=(e,t)=>{if(t==="int32")return e;let r=Ha.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let n=r/8;if(e.byteLength%n!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${n}.`);let o=e.byteLength/n,i=new(Ut(t))(e.buffer,e.byteOffset,o);switch(t){case"int64":case"uint64":{let a=new Int32Array(o);for(let u=0;u<o;u++){let d=i[u];if(d>2147483647n||d<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");a[u]=Number(d)}return new Uint8Array(a.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&i.some(u=>u>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let a=Int32Array.from(i,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Fa=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,n=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let o=BigInt64Array.from(n,BigInt);return new Uint8Array(o.buffer)}case"uint64":{if(n.some(i=>i<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let o=BigUint64Array.from(n,BigInt);return new Uint8Array(o.buffer)}case"int8":{if(n.some(i=>i<-128||i>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let o=Int8Array.from(n,Number);return new Uint8Array(o.buffer)}case"uint8":{if(n.some(o=>o<0||o>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(n,Number)}case"uint32":{if(n.some(i=>i<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let o=Uint32Array.from(n,Number);return new Uint8Array(o.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},dm=1,Ga=()=>dm++,lm=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),qa=(e,t)=>{let r=Ha.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((n,o)=>n*o)*r/8):0},Rr=class{constructor(t){this.isDataConverted=!1;let{sessionId:r,context:n,tensor:o,dataType:i,shape:a,fallbackDataType:u}=t;this.sessionId=r,this.mlContext=n,this.mlTensor=o,this.dataType=i,this.tensorShape=a,this.fallbackDataType=u}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return qa(this.dataType,this.tensorShape)}destroy(){ue("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(t){this.mlContext.writeTensor(this.mlTensor,t)}async read(t){if(this.fallbackDataType){let r=await this.mlContext.readTensor(this.mlTensor),n=Fa(new Uint8Array(r),this.dataType);if(t){(t instanceof ArrayBuffer?new Uint8Array(t):new Uint8Array(t.buffer,t.byteOffset,t.byteLength)).set(n);return}else return n.buffer}else return t?this.mlContext.readTensor(this.mlTensor,t):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(t,r,n){return this.mlContext===t&&this.dataType===r&&this.tensorShape.length===n.length&&this.tensorShape.every((o,i)=>o===n[i])}setIsDataConverted(t){this.isDataConverted=t}},Ur=class{constructor(t,r){this.tensorManager=t;this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(t,r,n,o){let i=this.tensorManager.getMLContext(t),a;if(!i.opSupportLimits().input.dataTypes.includes(r)){if(a=lm.get(r),!a||!i.opSupportLimits().input.dataTypes.includes(a))throw new Error(`WebNN backend does not support data type: ${r}`);ue("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${r} to ${a}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(i,r,n))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==qa(r,n))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(t,r,n,u,!0,!0,a),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(t){let r=t;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")r=Xn(t,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(t.byteLength===this.wrapper.byteLength){this.wrapper.write(r);return}else ue("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(r):this.activeUpload=new Uint8Array(r)}async download(t){if(this.activeUpload){let r=this.wrapper?.isDataConverted?Fa(this.activeUpload,this.wrapper?.type):this.activeUpload;if(t){t instanceof ArrayBuffer?new Uint8Array(t).set(r):new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(r);return}else return r.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return t?this.wrapper.read(t):this.wrapper.read()}},Yn=class{constructor(t){this.backend=t;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}getMLContext(t){let r=this.backend.getMLContext(t);if(!r)throw new Error("MLContext not found for session.");return r}reserveTensorId(){let t=Ga();return this.tensorTrackersById.set(t,new Ur(this)),t}releaseTensorId(t){let r=this.tensorTrackersById.get(t);r&&(this.tensorTrackersById.delete(t),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(t,r,n,o,i){ue("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${r}, dataType: ${n}, shape: ${o}, copyOld: ${i}}`);let a=this.tensorTrackersById.get(r);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(t,n,o,i)}upload(t,r){let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");n.upload(r)}async download(t,r){ue("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${t}, dstBuffer: ${r?.byteLength}}`);let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");return n.download(r)}releaseTensorsForSession(t){for(let r of this.freeTensors)r.sessionId===t&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==t)}registerTensor(t,r,n,o){let i=this.getMLContext(t),a=Ga(),u=new Rr({sessionId:t,context:i,tensor:r,dataType:n,shape:o});return this.tensorTrackersById.set(a,new Ur(this,u)),this.externalTensors.add(u),a}async getCachedTensor(t,r,n,o,i,a,u){let d=this.getMLContext(t);for(let[p,m]of this.freeTensors.entries())if(m.canReuseTensor(d,r,n)){ue("verbose",()=>`[WebNN] Reusing tensor {dataType: ${r}, ${u?`fallbackDataType: ${u},`:""} shape: ${n}`);let f=this.freeTensors.splice(p,1)[0];return f.sessionId=t,f}ue("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${r}, ${u?`fallbackDataType: ${u},`:""} shape: ${n}}`);let c=await d.createTensor({dataType:u??r,shape:n,dimensions:n,usage:o,writable:i,readable:a});return new Rr({sessionId:t,context:d,tensor:c,dataType:r,shape:n,fallbackDataType:u})}releaseTensor(t){this.externalTensors.has(t)&&this.externalTensors.delete(t),this.freeTensors.push(t)}},Ka=(...e)=>new Yn(...e)});var Nr,cm,Vr,Za=U(()=>{"use strict";Y();yt();Qn();ja();Je();Nr=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),cm=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),n=Object.keys(t).sort();return r.length===n.length&&r.every((o,i)=>o===n[i]&&e[o]===t[o])},Vr=class{constructor(t){this.tensorManager=Ka(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];this.sessionGraphInputs=new Map;this.sessionGraphOutputs=new Map;this.temporaryGraphInputs=[];this.temporaryGraphOutputs=[];this.temporarySessionTensorIds=new Map;Dr(t.logLevel,!!t.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(t){ue("verbose",()=>`[WebNN] onRunStart {sessionId: ${t}}`),this.activeSessionId=t}onRunEnd(t){ue("verbose",()=>`[WebNN] onRunEnd {sessionId: ${t}}`);let r=this.temporarySessionTensorIds.get(t);if(r){for(let n of r)ue("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${n}}`),this.tensorManager.releaseTensorId(n);this.temporarySessionTensorIds.delete(t),this.activeSessionId=void 0}}async createMLContext(t){if(t instanceof GPUDevice){let n=this.mlContextCache.findIndex(o=>o.gpuDevice===t);if(n!==-1)return this.mlContextCache[n].mlContext;{let o=await navigator.ml.createContext(t);return this.mlContextCache.push({gpuDevice:t,mlContext:o}),o}}else if(t===void 0){let n=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(n!==-1)return this.mlContextCache[n].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let r=this.mlContextCache.findIndex(n=>cm(n.options,t));if(r!==-1)return this.mlContextCache[r].mlContext;{let n=await navigator.ml.createContext(t);return this.mlContextCache.push({options:t,mlContext:n}),n}}registerMLContext(t,r){this.mlContextBySessionId.set(t,r);let n=this.sessionIdsByMLContext.get(r);n||(n=new Set,this.sessionIdsByMLContext.set(r,n)),n.add(t),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(t,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(t,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(t){this.sessionGraphInputs.delete(t),this.sessionGraphOutputs.delete(t);let r=this.mlContextBySessionId.get(t);if(!r)return;this.tensorManager.releaseTensorsForSession(t),this.mlContextBySessionId.delete(t);let n=this.sessionIdsByMLContext.get(r);if(n.delete(t),n.size===0){this.sessionIdsByMLContext.delete(r);let o=this.mlContextCache.findIndex(i=>i.mlContext===r);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(t){return this.mlContextBySessionId.get(t)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(t){ue("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t)}async ensureTensor(t,r,n,o,i){let a=Nr.get(n);if(!a)throw new Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(t??this.currentSessionId,r,a,o,i)}async createTemporaryTensor(t,r,n){ue("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${r}, shape: ${n}}`);let o=Nr.get(r);if(!o)throw new Error(`Unsupported ONNX data type: ${r}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(t,i,o,n,!1);let a=this.temporarySessionTensorIds.get(t);return a?a.push(i):this.temporarySessionTensorIds.set(t,[i]),i}uploadTensor(t,r){if(!ge().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ue("verbose",()=>`[WebNN] uploadTensor {tensorId: ${t}, data: ${r.byteLength}}`),this.tensorManager.upload(t,r)}async downloadTensor(t,r){return this.tensorManager.download(t,r)}createMLTensorDownloader(t,r){return async()=>{let n=await this.tensorManager.download(t);return Mr(n,r)}}registerMLTensor(t,r,n,o){let i=Nr.get(n);if(!i)throw new Error(`Unsupported ONNX data type: ${n}`);let a=this.tensorManager.registerTensor(t,r,i,o);return ue("verbose",()=>`[WebNN] registerMLTensor {tensor: ${r}, dataType: ${i}, dimensions: ${o}} -> {tensorId: ${a}}`),a}registerMLConstant(t,r,n,o,i,a,u=!1){if(!a)throw new Error("External mounted files are not available.");let d=t;t.startsWith("./")&&(d=t.substring(2));let c=a.get(d);if(!c)throw new Error(`File with name ${d} not found in preloaded files.`);if(r+n>c.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let p=c.slice(r,r+n).buffer,m;switch(i.dataType){case"float32":m=new Float32Array(p);break;case"float16":m=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(p):new Uint16Array(p);break;case"int32":m=new Int32Array(p);break;case"uint32":m=new Uint32Array(p);break;case"int64":if(u){let f=Xn(new Uint8Array(p),"int64");m=new Int32Array(f.buffer),i.dataType="int32"}else m=new BigInt64Array(p);break;case"uint64":m=new BigUint64Array(p);break;case"int8":m=new Int8Array(p);break;case"int4":case"uint4":case"uint8":m=new Uint8Array(p);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return ue("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}} ${u?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),o.constant(i,m)}registerGraphInput(t){this.temporaryGraphInputs.push(t)}registerGraphOutput(t){this.temporaryGraphOutputs.push(t)}isGraphInput(t,r){let n=this.sessionGraphInputs.get(t);return n?n.includes(r):!1}isGraphOutput(t,r){let n=this.sessionGraphOutputs.get(t);return n?n.includes(r):!1}isGraphInputOutputTypeSupported(t,r,n=!0){let o=this.mlContextBySessionId.get(t),i=Nr.get(_t(r));return typeof i>"u"?!1:n?!!o?.opSupportLimits().input.dataTypes.includes(i):!!o?.opSupportLimits().output.dataTypes.includes(i)}flush(){}}});var Wr=U(()=>{"use strict"});var Qa,Jn,eo,pm,mm,Ya,ro,to,Ja,es=U(()=>{"use strict";Je();Wr();Qa=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Jn=[],eo=e=>Math.ceil(Number(e)/16)*16,pm=e=>{for(let t=0;t<Jn.length;t++){let r=Jn[t];if(e<=r)return r}return Math.ceil(e/16)*16},mm=1,Ya=()=>mm++,ro=async(e,t,r,n)=>{let o=eo(r),i=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=e.getCommandEncoder();e.endComputePass(),a.copyBufferToBuffer(t,0,i,0,o),e.flush(),await i.mapAsync(GPUMapMode.READ);let u=i.getMappedRange();if(n){let d=n();return d.set(new Uint8Array(u,0,r)),d}else return new Uint8Array(u.slice(0,r))}finally{i.destroy()}},to=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[r]of Qa)Jn.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(t,r){let n=r.buffer,o=r.byteOffset,i=r.byteLength,a=eo(i),u=this.storageCache.get(t);if(!u)throw new Error("gpu data for uploading does not exist");if(Number(u.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${u.originalSize}, data size=${i}`);let d=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),c=d.getMappedRange();new Uint8Array(c).set(new Uint8Array(n,o,i)),d.unmap();let p=this.backend.device.createCommandEncoder();p.copyBufferToBuffer(d,0,u.gpuData.buffer,0,a),this.backend.device.queue.submit([p.finish()]),d.destroy(),ue("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`)}memcpy(t,r){let n=this.storageCache.get(t);if(!n)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=eo(n.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(n.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(t,r,n){let o;if(n){if(o=n[0],t===n[1])return ue("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=Ya();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:t},originalSize:r}),ue("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(t){t!==void 0&&(this.storageCache.delete(t),ue("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(t,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=pm(t),o,i=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let c=(i?this.freeBuffers:this.freeUniformBuffers).get(n);c?c.length>0?o=c.pop():o=this.backend.device.createBuffer({size:n,usage:r}):o=this.backend.device.createBuffer({size:n,usage:r})}else o=this.backend.device.createBuffer({size:n,usage:r});let u={id:Ya(),type:0,buffer:o};return this.storageCache.set(u.id,{gpuData:u,originalSize:Number(t)}),ue("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${u.id}`),u}get(t){return this.storageCache.get(t)?.gpuData}release(t){let r=typeof t=="bigint"?Number(t):t,n=this.storageCache.get(r);if(!n){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return ue("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(t,r){let n=this.storageCache.get(Number(t));if(!n)throw new Error("data does not exist");await ro(this.backend,n.gpuData.buffer,n.originalSize,r)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let r=Qa.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let r of this.buffersPending)t.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(t){let r=this.capturedPendingBuffers.get(t);r&&(r.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(t)),this.sessionCount-=1,this.sessionCount===0&&(ue("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(n=>{n.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Ja=(...e)=>new to(...e)});var no,X,Se=U(()=>{"use strict";no=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},X=e=>new no(e)});var kt,io,ye,Ae,N,me,ao,Et,Fe,F,Lr,P,M,ts,Gr,oo,rs,ie=U(()=>{"use strict";Y();ne();kt=64,io=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},ye=(e,t=1)=>{let r=io(e,t);return typeof r=="string"?r:r[0]},Ae=(e,t=1)=>{let r=io(e,t);return typeof r=="string"?r:r[1]},N=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:E.computeStrides(r)})}),t},me=e=>e%4===0?4:e%2===0?2:1,ao=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Et=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,Fe=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,F=(e,t,r,n)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?n==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:n==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,Lr=(e,t,r,n,o)=>{let i=typeof r=="number",a=i?r:r.length,u=[...new Array(a).keys()],d=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,c=io(t,o),p=typeof c=="string"?c:c[1],m=typeof c=="string"?c:c[0],f={indices:d,value:p,storage:m,tensor:t},b=C=>typeof C=="string"?C:`${C}u`,g={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},_=i?"uniforms.":"",S=`${_}${e}_shape`,$=`${_}${e}_strides`,w="";for(let C=0;C<a-1;C++)w+=`
    let dim${C} = current / ${F($,C,a)};
    let rest${C} = current % ${F($,C,a)};
    indices[${C}] = dim${C};
    current = rest${C};
    `;w+=`indices[${a-1}] = current;`;let x=a<2?"":`
  fn o2i_${e}(offset: u32) -> ${f.indices} {
    var indices: ${f.indices};
    var current = offset;
    ${w}
    return indices;
  }`,T=C=>(g.offsetToIndices=!0,a<2?C:`o2i_${e}(${C})`),k=[];if(a>=2)for(let C=a-1;C>=0;C--)k.push(`${F($,C,a)} * (indices[${C}])`);let I=a<2?"":`
  fn i2o_${e}(indices: ${f.indices}) -> u32 {
    return ${k.join("+")};
  }`,O=C=>(g.indicesToOffset=!0,a<2?C:`i2o_${e}(${C})`),z=(...C)=>a===0?"0u":`${f.indices}(${C.map(b).join(",")})`,B=(C,L)=>a<2?`${C}`:`${F(C,L,a)}`,W=(C,L,le)=>a<2?`${C}=${le};`:`${F(C,L,a)}=${le};`,q={},j=(C,L)=>{g.broadcastedIndicesToOffset=!0;let le=`${L.name}broadcastedIndicesTo${e}Offset`;if(le in q)return`${le}(${C})`;let Ce=[];for(let ze=a-1;ze>=0;ze--){let xe=L.indicesGet("outputIndices",ze+L.rank-a);Ce.push(`${B($,ze)} * (${xe} % ${B(S,ze)})`)}return q[le]=`fn ${le}(outputIndices: ${L.type.indices}) -> u32 {
             return ${Ce.length>0?Ce.join("+"):"0u"};
           }`,`${le}(${C})`},te=(C,L)=>(()=>{if(f.storage===f.value)return`${e}[${C}]=${L};`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`${e}[${C}]=vec2<u32>(u32(${L}), select(0u, 0xFFFFFFFFu, ${L} < 0));`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`${e}[${C}]=vec2<u32>(u32(${L}), 0u);`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`${e}[${C}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${L}));`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),V=C=>(()=>{if(f.storage===f.value)return`${e}[${C}]`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`i32(${e}[${C}].x)`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`u32(${e}[${C}].x)`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${C}] & 0xFFu), bool(${e}[${C}] & 0xFF00u), bool(${e}[${C}] & 0xFF0000u), bool(${e}[${C}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),de=a<2?"":`
  fn get_${e}ByIndices(indices: ${f.indices}) -> ${p} {
    return ${V(`i2o_${e}(indices)`)};
  }`,J=a<2?"":(()=>{let C=u.map(le=>`d${le}: u32`).join(", "),L=u.map(le=>`d${le}`).join(", ");return`
  fn get_${e}(${C}) -> ${p} {
    return get_${e}ByIndices(${z(L)});
  }`})(),H=(...C)=>{if(C.length!==a)throw new Error(`indices length must be ${a}`);let L=C.map(b).join(",");return a===0?V("0u"):a===1?V(L[0]):(g.get=!0,g.getByIndices=!0,g.indicesToOffset=!0,`get_${e}(${L})`)},ae=C=>a<2?V(C):(g.getByIndices=!0,g.indicesToOffset=!0,`get_${e}ByIndices(${C})`),Z=a<2?"":`
  fn set_${e}ByIndices(indices: ${f.indices}, value: ${p}) {
    ${te(`i2o_${e}(indices)`,"value")}
  }`,re=a<2?"":(()=>{let C=u.map(le=>`d${le}: u32`).join(", "),L=u.map(le=>`d${le}`).join(", ");return`
  fn set_${e}(${C}, value: ${p}) {
    set_${e}ByIndices(${z(L)}, value);
  }`})();return{impl:()=>{let C=[],L=!1;return g.offsetToIndices&&(C.push(x),L=!0),g.indicesToOffset&&(C.push(I),L=!0),g.broadcastedIndicesToOffset&&(Object.values(q).forEach(le=>C.push(le)),L=!0),g.set&&(C.push(re),L=!0),g.setByIndices&&(C.push(Z),L=!0),g.get&&(C.push(J),L=!0),g.getByIndices&&(C.push(de),L=!0),!i&&L&&C.unshift(`const ${S} = ${f.indices}(${r.join(",")});`,`const ${$} = ${f.indices}(${E.computeStrides(r).join(",")});`),C.join(`
`)},type:f,offsetToIndices:T,indicesToOffset:O,broadcastedIndicesToOffset:j,indices:z,indicesGet:B,indicesSet:W,set:(...C)=>{if(C.length!==a+1)throw new Error(`indices length must be ${a}`);let L=C[a];if(typeof L!="string")throw new Error("value must be string");let le=C.slice(0,a).map(b).join(",");return a===0?te("0u",L):a===1?te(le[0],L):(g.set=!0,g.setByIndices=!0,g.indicesToOffset=!0,`set_${e}(${le}, ${L})`)},setByOffset:te,setByIndices:(C,L)=>a<2?te(C,L):(g.setByIndices=!0,g.indicesToOffset=!0,`set_${e}ByIndices(${C}, ${L});`),get:H,getByOffset:V,getByIndices:ae,usage:n,name:e,strides:$,shape:S,rank:a}},P=(e,t,r,n=1)=>Lr(e,t,r,"input",n),M=(e,t,r,n=1)=>Lr(e,t,r,"output",n),ts=(e,t,r)=>Lr(e,t,r,"atomicOutput",1),Gr=(e,t,r,n=1)=>Lr(e,t,r,"internal",n),oo=class{constructor(t,r){this.normalizedDispatchGroup=t;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=kt){let r=typeof t=="number"?t:t[0],n=typeof t=="number"?1:t[1],o=typeof t=="number"?1:t[2];if(r>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*n*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
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
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[t(r.type),r.length??1])}},rs=(e,t)=>new oo(e,t)});var fm,ns,hm,gm,bm,ym,ke,os,is,ut=U(()=>{"use strict";Y();ne();Se();ie();fm=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},ns=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),hm=(e,t)=>E.sortBasedOnPerm(e,ns(e.length,t)),gm=(e,t,r,n)=>{let o=`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let i=0;i<t;++i)o+=`a[${e[i]}]=i[${i}];`;return o+="return a;}"},bm=(e,t)=>{let r=[],n=[];for(let o=0;o<e.length;++o)e[o]!==1&&r.push(e[o]),e[t[o]]!==1&&n.push(t[o]);return{newShape:r,newPerm:n}},ym=(e,t)=>{let r=0;for(let n=0;n<e.length;++n)if(t[e[n]]!==1){if(e[n]<r)return!1;r=e[n]}return!0},ke=(e,t)=>{let r=e.dataType,n=e.dims.length,o=ns(n,t),i=hm(e.dims,o),a=e.dims,u=i,d=n<2||ym(o,e.dims),c;if(d)return c=_=>{let S=P("input",r,a,4),$=M("output",r,u,4);return`
  ${_.registerUniform("output_size","u32").declareVariables(S,$)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=E.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64/4)},programUniforms:[{type:12,data:Math.ceil(_/4)}]}},getShaderSource:c};let{newShape:p,newPerm:m}=bm(e.dims,o),f=E.areEqual(m,[2,3,1]),b=E.areEqual(m,[3,1,2]);if(p.length===2||f||b){a=f?[p[0],p[1]*p[2]]:b?[p[0]*p[1],p[2]]:p,u=[a[1],a[0]];let _=16;return c=S=>{let $=P("a",r,a.length),w=M("output",r,u.length);return`
  ${S.registerUniform("output_size","u32").declareVariables($,w)}
  var<workgroup> tile : array<array<${w.type.value}, ${_+1}>, ${_}>;
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
      ${w.setByIndices(`${w.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let S=E.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/_),y:Math.ceil(u[0]/_)},programUniforms:[{type:12,data:S},...N(a,u)]}},getShaderSource:c}}return c=_=>{let S=P("a",r,a.length),$=M("output",r,u.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(S,$)}

  ${gm(o,n,S,$)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${$.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${$.setByOffset("global_idx",S.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let _=E.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...N(a,u)]}},getShaderSource:c}},os=(e,t)=>{fm(e.inputs,t.perm),e.compute(ke(e.inputs[0],t.perm))},is=e=>X({perm:e.perm})});var _m,wm,vm,$m,xm,Sm,Tm,Im,Cm,Am,tt,as,ss,us,ds,ls,cs,ps,ms,fs,hs,gs=U(()=>{"use strict";Y();ne();ie();Hr();ut();_m={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},wm={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},vm={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},$m={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},xm=(e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r},Sm=(e,t)=>{let r=[],n=e.length;for(let i=0;i<n;i++)t.indexOf(i)===-1&&r.push(e[i]);let o=t.map(i=>e[i]);return[r,o]},Tm=(e,t)=>{let r=e.length+t.length,n=[],o=0;for(let i=0;i<r;i++)t.indexOf(i)===-1?n.push(e[o++]):n.push(1);return n},Im=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},Cm=(e,t)=>{let r=[];if(!Im(e,t)){for(let n=0;n<t;++n)e.indexOf(n)===-1&&r.push(n);e.forEach(n=>r.push(n))}return r},Am=(e,t,r,n,o,i,a)=>{let u=r[0].dims,d=E.size(i),c=E.size(a),p=P("_A",r[0].dataType,u),m=M("output",o,i),f=64;d===1&&(f=256);let b=`
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

          var bestValue = f32(${vm[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${f}) {
           let candidate = f32(${p.getByOffset("offset + k")});
           bestValue = ${_m[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${f}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${wm[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${m.setByOffset("outputIndex",`${n==="mean"?`${m.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${m.type.storage}(${$m[n]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${f}`,inputDependencies:["type"]},getShaderSource:g,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:d},programUniforms:[{type:12,data:c}]})}},tt=(e,t,r,n)=>{let o=e.inputs.length===1?r:so(e.inputs,r),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=e.inputs[0].dims.map((b,g)=>g));let a=E.normalizeAxes(i,e.inputs[0].dims.length),u=a,d=e.inputs[0],c=Cm(u,e.inputs[0].dims.length);c.length>0&&(d=e.compute(ke(e.inputs[0],c),{inputs:[0],outputs:[-1]})[0],u=xm(u.length,d.dims.length));let[p,m]=Sm(d.dims,u),f=p;o.keepDims&&(f=Tm(p,a)),e.compute(Am(t,o.cacheKey,[d],n,e.inputs[0].dataType,f,m),{inputs:[d]})},as=(e,t)=>{tt(e,"ReduceMeanShared",t,"mean")},ss=(e,t)=>{tt(e,"ReduceL1Shared",t,"l1")},us=(e,t)=>{tt(e,"ReduceL2Shared",t,"l2")},ds=(e,t)=>{tt(e,"ReduceLogSumExpShared",t,"logSumExp")},ls=(e,t)=>{tt(e,"ReduceMaxShared",t,"max")},cs=(e,t)=>{tt(e,"ReduceMinShared",t,"min")},ps=(e,t)=>{tt(e,"ReduceProdShared",t,"prod")},ms=(e,t)=>{tt(e,"ReduceSumShared",t,"sum")},fs=(e,t)=>{tt(e,"ReduceSumSquareShared",t,"sumSquare")},hs=(e,t)=>{tt(e,"ReduceLogSumShared",t,"logSum")}});var rt,km,Fr,so,nt,Em,Pm,Om,zm,Dm,Bm,Mm,Rm,Um,Nm,ot,bs,ys,_s,ws,vs,$s,xs,Ss,Ts,Is,Hr=U(()=>{"use strict";Y();ne();Se();ie();gs();rt=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},km=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Fr=(e,t,r,n,o,i,a=!1,u=!1)=>{let d=[],c=r[0].dims,p=c.length,m=E.normalizeAxes(o,p),f=!u&&m.length===0;c.forEach((S,$)=>{f||m.indexOf($)>=0?a&&d.push(1):d.push(S)});let b=d.length,g=E.size(d);return{name:e,shaderCache:t,getShaderSource:S=>{let $=[],w=P("_A",r[0].dataType,p),x=M("output",i,b),T=n(w,x,m),k=T[2];for(let I=0,O=0;I<p;I++)f||m.indexOf(I)>=0?(a&&O++,k=`for(var j${I}: u32 = 0; j${I} < ${c[I]}; j${I}++) {
                  ${T[2].includes("last_index")?`let last_index = j${I};`:""}
                  ${w.indicesSet("input_indices",I,`j${I}`)}
                  ${k}
                }`):($.push(`${w.indicesSet("input_indices",I,x.indicesGet("output_indices",O))};`),O++);return`

        ${S.registerUniform("output_size","u32").declareVariables(w,x)}

        ${S.mainStart()}
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${w.type.indices};
          let output_indices = ${x.offsetToIndices("global_idx")};

          ${$.join(`
`)}
          ${T[0]}       // init ops for reduce max/min
          ${T[1]}
          ${k}
          ${T[3]}
          ${T.length===4?x.setByOffset("global_idx","value"):T.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:d,dataType:i}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},...N(c,d)]})}},so=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),X({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},nt=(e,t,r,n)=>{let o=e.inputs,i=o.length===1?r:so(o,r);e.compute(Fr(t,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?km:n,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},Em=(e,t)=>{rt(e.inputs),nt(e,"ReduceLogSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},Pm=(e,t)=>{rt(e.inputs),nt(e,"ReduceL1",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},Om=(e,t)=>{rt(e.inputs),nt(e,"ReduceL2",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},zm=(e,t)=>{rt(e.inputs),nt(e,"ReduceLogSumExp",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},Dm=(e,t)=>{rt(e.inputs),nt(e,"ReduceMax",t,(n,o,i)=>{let a=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&a.push(n.indicesSet("input_indices",u,0));return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},Bm=(e,t)=>{rt(e.inputs),nt(e,"ReduceMean",t,(n,o,i)=>{let a=1;for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&(a*=e.inputs[0].dims[u]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${a});`]})},Mm=(e,t)=>{rt(e.inputs),nt(e,"ReduceMin",t,(n,o,i)=>{let a=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&a.push(`input_indices[${u}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},Rm=(e,t)=>{rt(e.inputs),nt(e,"ReduceProd",t,(n,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},Um=(e,t)=>{rt(e.inputs),nt(e,"ReduceSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},Nm=(e,t)=>{rt(e.inputs),nt(e,"ReduceSumSquare",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},ot=(e,t,r)=>{if(t.length===0)return r;let n=1,o=1;for(let i=0;i<t.length;i++)t.indexOf(i)===-1?n*=e[i]:o*=e[i];return o<32&&n>1024},bs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Bm(e,t):as(e,t)},ys=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Pm(e,t):ss(e,t)},_s=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Om(e,t):us(e,t)},ws=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?zm(e,t):ds(e,t)},vs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Dm(e,t):ls(e,t)},$s=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Mm(e,t):cs(e,t)},xs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Rm(e,t):ps(e,t)},Ss=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Um(e,t):ms(e,t)},Ts=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Nm(e,t):fs(e,t)},Is=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Em(e,t):hs(e,t)}});var Cs,As,ks,uo,Es=U(()=>{"use strict";Y();Se();Hr();Cs=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},As=(e,t)=>{Cs(e.inputs);let r=(n,o,i)=>{let a=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&a.push(`input_indices[${u}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Fr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},ks=(e,t)=>{Cs(e.inputs);let r=(n,o,i)=>{let a=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&a.push(`input_indices[${u}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Fr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},uo=e=>X(e)});var Vm,lo,Wm,Lm,Gm,Nt,Hm,Ps,qr=U(()=>{"use strict";Y();ne();Wr();ie();Vm=(e,t)=>{let r=e[0],n=e[1],o=e[2],i=e[3],a=e[4],u=e[5];if(a&&u)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let d=r.dims[0],c=r.dims[1],p=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(n.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==p)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==n.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let m=o.dims[0]/3,f=m,b=f;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let x of t.qkvHiddenSizes)if(x%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");m=t.qkvHiddenSizes[0],f=t.qkvHiddenSizes[1],b=t.qkvHiddenSizes[2]}let g=c;if(m!==f)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==m+f+b)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let _=0;if(a){if(f!==b)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==d)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==f/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(_=a.dims[3])}let S=g+_,$=-1,w=0;if(i)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==d||u.dims[1]!==t.numHeads||u.dims[2]!==c||u.dims[3]!==S)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:c,pastSequenceLength:_,kvSequenceLength:g,totalSequenceLength:S,maxSequenceLength:$,inputHiddenSize:p,hiddenSize:m,vHiddenSize:b,headSize:Math.floor(m/t.numHeads),vHeadSize:Math.floor(b/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},lo=(e,t,r)=>t&&e?`
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
    `,Wm=(e,t,r,n,o,i,a,u)=>{let d=me(a?1:i),c=64,p=i/d;p<c&&(c=32);let m=Math.ceil(i/d/c),f=[{type:12,data:t},{type:12,data:r},{type:12,data:n},{type:12,data:o},{type:12,data:p},{type:12,data:m}],b=ye(e.dataType,d),g=Ae(1,d),_=["type"];a&&_.push("type"),u&&_.push("type");let S=$=>{let w=M("x",e.dataType,e.dims,d),x=[w],T=a?P("seq_lens",a.dataType,a.dims):void 0;T&&x.push(T);let k=u?P("total_sequence_length_input",u.dataType,u.dims):void 0;k&&x.push(k);let I=Ae(e.dataType),O=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${c}>;
  var<workgroup> thread_sum: array<f32, ${c}>;
  ${$.registerUniforms(O).declareVariables(...x)}
  ${$.mainStart([c,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${lo(T,k,!1)}
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
        x[offset + i] = ${w.type.value}(${I}(1.0) / ${I}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${g}(x[offset + i]);
        x[offset + i] = ${w.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${w.type.value}(${I}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${c};${b};${d}`,inputDependencies:_},getShaderSource:S,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:o,z:t*r},programUniforms:f})}},Lm=(e,t,r,n,o,i,a,u,d)=>{let c=a+i.kvSequenceLength,p=[i.batchSize,i.numHeads,i.sequenceLength,c],m=e>1&&n,f=i.kvNumHeads?i.kvNumHeads:i.numHeads,b=m?[i.batchSize,f,c,i.headSize]:void 0,g=i.nReps?i.nReps:1,_=i.scale===0?1/Math.sqrt(i.headSize):i.scale,S=me(i.headSize),$=i.headSize/S,w=12,x={x:Math.ceil(c/w),y:Math.ceil(i.sequenceLength/w),z:i.batchSize*i.numHeads},T=[{type:12,data:i.sequenceLength},{type:12,data:$},{type:12,data:c},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:_},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:g}],k=m&&n&&E.size(n.dims)>0,I=["type","type"];k&&I.push("type"),o&&I.push("type"),u&&I.push("type"),d&&I.push("type");let O=[{dims:p,dataType:t.dataType,gpuDataType:0}];m&&O.push({dims:b,dataType:t.dataType,gpuDataType:0});let z=B=>{let W=P("q",t.dataType,t.dims,S),q=P("key",r.dataType,r.dims,S),j=[W,q];if(k){let Z=P("past_key",n.dataType,n.dims,S);j.push(Z)}o&&j.push(P("attention_bias",o.dataType,o.dims));let te=u?P("seq_lens",u.dataType,u.dims):void 0;te&&j.push(te);let V=d?P("total_sequence_length_input",d.dataType,d.dims):void 0;V&&j.push(V);let de=M("output",t.dataType,p),J=[de];m&&J.push(M("present_key",t.dataType,b,S));let H=Ae(1,S),ae=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;

  var<workgroup> tileQ: array<${W.type.storage}, ${w*w}>;
  var<workgroup> tileK: array<${W.type.storage}, ${w*w}>;
  ${B.registerUniforms(ae).declareVariables(...j,...J)}
  ${B.mainStart([w,w,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${g===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${g===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${lo(te,V,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${k&&m?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${m?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${H}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${k&&m?`
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
          value += ${H}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(S){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${S}`)}})()};
        output[outputIdx] = ${de.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${S};${o!==void 0};${n!==void 0};${e}`,inputDependencies:I},getRunData:()=>({outputs:O,dispatchGroup:x,programUniforms:T}),getShaderSource:z}},Gm=(e,t,r,n,o,i,a=void 0,u=void 0)=>{let d=i+o.kvSequenceLength,c=o.nReps?o.nReps:1,p=o.vHiddenSize*c,m=e>1&&n,f=o.kvNumHeads?o.kvNumHeads:o.numHeads,b=m?[o.batchSize,f,d,o.headSize]:void 0,g=[o.batchSize,o.sequenceLength,p],_=12,S={x:Math.ceil(o.vHeadSize/_),y:Math.ceil(o.sequenceLength/_),z:o.batchSize*o.numHeads},$=[{type:12,data:o.sequenceLength},{type:12,data:d},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:p},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:c}],w=m&&n&&E.size(n.dims)>0,x=["type","type"];w&&x.push("type"),a&&x.push("type"),u&&x.push("type");let T=[{dims:g,dataType:t.dataType,gpuDataType:0}];m&&T.push({dims:b,dataType:t.dataType,gpuDataType:0});let k=I=>{let O=P("probs",t.dataType,t.dims),z=P("v",r.dataType,r.dims),B=[O,z];w&&B.push(P("past_value",n.dataType,n.dims));let W=a?P("seq_lens",a.dataType,a.dims):void 0;a&&B.push(W);let q=u?P("total_sequence_length_input",u.dataType,u.dims):void 0;u&&B.push(q);let te=[M("output",t.dataType,g)];m&&te.push(M("present_value",t.dataType,b));let V=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;
  var<workgroup> tileQ: array<${O.type.value}, ${_*_}>;
  var<workgroup> tileV: array<${O.type.value}, ${_*_}>;
  ${I.registerUniforms(V).declareVariables(...B,...te)}
  ${I.mainStart([_,_,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${c===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${c===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${lo(W,q,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${w&&m?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${m?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${O.type.storage}(0);
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${n!==void 0};${e}`,inputDependencies:x},getRunData:()=>({outputs:T,dispatchGroup:S,programUniforms:$}),getShaderSource:k}},Nt=(e,t,r,n,o,i,a,u,d,c,p=void 0,m=void 0)=>{let f=Math.min(e.outputCount,1+(a?1:0)+(u?1:0)),b=f>1?c.pastSequenceLength:0,g=b+c.kvSequenceLength,_=d&&E.size(d.dims)>0?d:void 0,S=[t,r];f>1&&a&&E.size(a.dims)>0&&S.push(a),_&&S.push(_),p&&S.push(p),m&&S.push(m);let $=e.compute(Lm(f,t,r,a,_,c,b,p,m),{inputs:S,outputs:f>1?[-1,1]:[-1]})[0];e.compute(Wm($,c.batchSize,c.numHeads,b,c.sequenceLength,g,p,m),{inputs:p&&m?[$,p,m]:[$],outputs:[]});let w=[$,n];f>1&&u&&E.size(u.dims)>0&&w.push(u),p&&w.push(p),m&&w.push(m),e.compute(Gm(f,$,n,u,c,b,p,m),{inputs:w,outputs:f>1?[0,2]:[0]})},Hm=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],n=t.sequenceLength,o=t.inputHiddenSize,i=t.headSize,a=12,u={x:Math.ceil(t.headSize/a),y:Math.ceil(t.sequenceLength/a),z:t.batchSize*t.numHeads},d=[e.inputs[0],e.inputs[1],e.inputs[2]],c=[{type:12,data:n},{type:12,data:o},{type:12,data:i},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],p=m=>{let f=M("output_q",d[0].dataType,r),b=M("output_k",d[0].dataType,r),g=M("output_v",d[0].dataType,r),_=P("input",d[0].dataType,d[0].dims),S=P("weight",d[1].dataType,d[1].dims),$=P("bias",d[2].dataType,d[2].dims),w=_.type.storage,x=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${w}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${w}, ${a*a}>;
  var<workgroup> tileWeightK: array<${w}, ${a*a}>;
  var<workgroup> tileWeightV: array<${w}, ${a*a}>;
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:c}),getShaderSource:p},{inputs:d,outputs:[-1,-1,-1]})},Ps=(e,t)=>{let r=Vm(e.inputs,t),[n,o,i]=Hm(e,r);return Nt(e,n,o,i,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}});var Fm,qm,Km,Os,zs=U(()=>{"use strict";We();Y();ne();Se();ie();Fm=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(n,o,i)=>{let a=o.length;if(a!==n.length)throw new Error(`${i}: num dimensions != ${a}`);o.forEach((u,d)=>{if(u!==n[d])throw new Error(`${i}: dim[${d}] do not match`)})};if(e[0].dims.length>1){let n=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},qm=(e,t)=>{let{epsilon:r,spatial:n,format:o}=t,i=e[0].dims,a=n?me(i[i.length-1]):1,u=o==="NHWC"&&i.length>1?a:1,d=E.size(i)/a,c=n,p=c?i.length:i,m=P("x",e[0].dataType,e[0].dims,a),f=P("scale",e[1].dataType,e[1].dims,u),b=P("bias",e[2].dataType,e[2].dims,u),g=P("inputMean",e[3].dataType,e[3].dims,u),_=P("inputVar",e[4].dataType,e[4].dims,u),S=M("y",e[0].dataType,p,a),$=()=>{let x="";if(n)x=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${a}`:"outputIndices[1]"};`;else if(o==="NCHW")x=`
            ${S.indicesSet("outputIndices","0","0")}
            let cOffset = ${S.indicesToOffset("outputIndices")};`;else{x=`var cIndices = ${f.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let T=1;T<f.rank;T++)x+=`cIndices[${T}] = outputIndices[${T}];`;x+=`let cOffset = ${f.indicesToOffset("cIndices")};`}return x},w=x=>`
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
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${a}`,inputDependencies:c?["rank","type","type","type","type"]:void 0},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c?[{type:12,data:d},...N(i)]:[{type:12,data:d}]})}},Km=e=>X(e),Os=(e,t)=>{let{inputs:r,outputCount:n}=e,o=Km({...t,outputCount:n});if(be.webgpu.validateInputContent&&Fm(r,o),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(qm(r,o))}});var jm,Zm,Ds,Bs=U(()=>{"use strict";ne();ie();jm=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Zm=e=>{let t=e[0].dims,r=e[0].dims[2],n=E.size(t)/4,o=e[0].dataType,i=P("input",o,t,4),a=P("bias",o,[r],4),u=P("residual",o,t,4),d=M("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:p=>`
  const channels = ${r}u / 4;
  ${p.declareVariables(i,a,u,d)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${i.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${d.setByOffset("global_idx","value")}
  }`}},Ds=e=>{jm(e.inputs),e.compute(Zm(e.inputs))}});var Qm,he,Ms,Rs,Us,Ns,Vs,Ws,Ls,Gs,Hs,Ym,Fs,qs,Ks,js,Xt,Zs,Kr,Qs,Ys,Xs,Js,eu,tu,ru,nu,ou,iu,au,su,uu,du,lu,cu,pu,mu,co,po,fu,hu,gu,Xm,Jm,bu,jr=U(()=>{"use strict";Y();ne();Se();ie();Qm=(e,t,r,n,o,i,a)=>{let u=Math.ceil(t/4),d="";typeof o=="string"?d=`${o}(a)`:d=o("a");let c=P("inputData",r,[u],4),p=M("outputData",n,[u],4),m=[{name:"vec_size",type:"u32"}];return a&&m.push(...a),`
      ${e.registerUniforms(m).declareVariables(c,p)}

  ${i??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${c.getByOffset("global_idx")};
    ${p.setByOffset("global_idx",d)}
  }`},he=(e,t,r,n,o,i=e.dataType,a,u)=>{let d=[{type:12,data:Math.ceil(E.size(e.dims)/4)}];return a&&d.push(...a),{name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:c=>Qm(c,E.size(e.dims),e.dataType,i,r,n,u),getRunData:c=>({outputs:[{dims:e.dims,dataType:i}],dispatchGroup:{x:Math.ceil(E.size(c[0].dims)/64/4)},programUniforms:d})}},Ms=e=>{e.compute(he(e.inputs[0],"Abs","abs"))},Rs=e=>{e.compute(he(e.inputs[0],"Acos","acos"))},Us=e=>{e.compute(he(e.inputs[0],"Acosh","acosh"))},Ns=e=>{e.compute(he(e.inputs[0],"Asin","asin"))},Vs=e=>{e.compute(he(e.inputs[0],"Asinh","asinh"))},Ws=e=>{e.compute(he(e.inputs[0],"Atan","atan"))},Ls=e=>{e.compute(he(e.inputs[0],"Atanh","atanh"))},Gs=e=>X(e),Hs=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(he(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Ym=e=>{let t,r,n=e.length>=2&&e[1].data!==0,o=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=n?e[1].getFloat32Array()[0]:-34028234663852886e22,r=o?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=n?e[1].getUint16Array()[0]:64511,r=o?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return X({min:t,max:r})},Fs=(e,t)=>{let r=t||Ym(e.inputs),n=Ae(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Clip",o=>`clamp(${o}, vec4<${n}>(uniforms.min), vec4<${n}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:n},{name:"max",type:n}]),{inputs:[0]})},qs=e=>{e.compute(he(e.inputs[0],"Ceil","ceil"))},Ks=e=>{e.compute(he(e.inputs[0],"Cos","cos"))},js=e=>{e.compute(he(e.inputs[0],"Cosh","cosh"))},Xt=e=>X(e),Zs=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Elu",n=>`elu_vf32(${n})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Kr=(e="f32")=>`
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
}`,Qs=e=>{let t=Ae(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Kr(t)))},Ys=e=>{e.compute(he(e.inputs[0],"Exp","exp"))},Xs=e=>{e.compute(he(e.inputs[0],"Floor","floor"))},Js=e=>{let t=Ae(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Kr(t)))},eu=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(he(e.inputs[0],"LeakyRelu",n=>`select(leaky_relu_alpha_ * ${n}, ${n}, ${n} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},tu=e=>{e.compute(he(e.inputs[0],"Not",t=>`!${t}`))},ru=e=>{e.compute(he(e.inputs[0],"Neg",t=>`-${t}`))},nu=e=>{e.compute(he(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},ou=e=>{let t=Ae(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},iu=e=>{e.compute(he(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},au=e=>X(e),su=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(he(e.inputs[0],"HardSigmoid",n=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${n} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},uu=e=>{e.compute(he(e.inputs[0],"Sin","sin"))},du=e=>{e.compute(he(e.inputs[0],"Sinh","sinh"))},lu=e=>{e.compute(he(e.inputs[0],"Sqrt","sqrt"))},cu=e=>{e.compute(he(e.inputs[0],"Tan","tan"))},pu=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,mu=e=>{e.compute(he(e.inputs[0],"Tanh",pu))},co=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${pu("v")};
}
`,po=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,fu=e=>{let t=Ae(e.inputs[0].dataType);e.compute(he(e.inputs[0],"FastGelu",po,co(t),void 0,e.inputs[0].dataType))},hu=(e,t)=>{let r=Ae(e.inputs[0].dataType);return e.compute(he(e.inputs[0],"ThresholdedRelu",n=>`select(vec4<${r}>(0.0), ${n}, ${n} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},gu=e=>{e.compute(he(e.inputs[0],"Log","log"))},Xm=(e,t)=>`
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
`,Jm=e=>`quick_gelu_impl(${e})`,bu=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(he(e.inputs[0],"QuickGelu",Jm,Xm(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}});var ef,tf,_u,wu=U(()=>{"use strict";ne();ie();jr();ef=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},tf=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=P("input",e[0].dataType,e[0].dims,4),n=P("bias",e[0].dataType,[e[0].dims[2]],4),o=M("output",e[0].dataType,t,4),i=E.size(t)/4,a=ye(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:d=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${d.declareVariables(r,n,o)}

  ${Kr(a)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},_u=e=>{ef(e.inputs),e.compute(tf(e.inputs))}});var rf,nf,it,vu,$u,xu,Su,Tu,Iu,Cu,Au,ku,Eu,Pu=U(()=>{"use strict";Y();ne();ie();rf=(e,t,r,n,o,i,a,u,d,c,p,m)=>{let f,b;typeof u=="string"?f=b=(w,x)=>`${u}((${w}),(${x}))`:typeof u=="function"?f=b=u:(f=u.scalar,b=u.vector);let g=M("outputData",p,n.length,4),_=P("aData",d,t.length,4),S=P("bData",c,r.length,4),$;if(o)if(i){let w=E.size(t)===1,x=E.size(r)===1,T=t.length>0&&t[t.length-1]%4===0,k=r.length>0&&r[r.length-1]%4===0;w||x?$=g.setByOffset("global_idx",b(w?`${_.type.value}(${_.getByOffset("0")}.x)`:_.getByOffset("global_idx"),x?`${S.type.value}(${S.getByOffset("0")}.x)`:S.getByOffset("global_idx"))):$=`
            let outputIndices = ${g.offsetToIndices("global_idx * 4u")};
            let offsetA = ${_.broadcastedIndicesToOffset("outputIndices",g)};
            let offsetB = ${S.broadcastedIndicesToOffset("outputIndices",g)};
            ${g.setByOffset("global_idx",b(a||T?_.getByOffset("offsetA / 4u"):`${_.type.value}(${_.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||k?S.getByOffset("offsetB / 4u"):`${S.type.value}(${S.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=g.setByOffset("global_idx",b(_.getByOffset("global_idx"),S.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let w=(x,T,k="")=>{let I=`aData[indexA${T}][componentA${T}]`,O=`bData[indexB${T}][componentB${T}]`;return`
            let outputIndices${T} = ${g.offsetToIndices(`global_idx * 4u + ${T}u`)};
            let offsetA${T} = ${_.broadcastedIndicesToOffset(`outputIndices${T}`,g)};
            let offsetB${T} = ${S.broadcastedIndicesToOffset(`outputIndices${T}`,g)};
            let indexA${T} = offsetA${T} / 4u;
            let indexB${T} = offsetB${T} / 4u;
            let componentA${T} = offsetA${T} % 4u;
            let componentB${T} = offsetB${T} % 4u;
            ${x}[${T}] = ${k}(${f(I,O)});
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
        ${e.registerUniform("vec_size","u32").declareVariables(_,S,g)}

        ${m??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},nf=(e,t,r,n,o,i,a=r.dataType)=>{let u=r.dims.map(_=>Number(_)??1),d=n.dims.map(_=>Number(_)??1),c=!E.areEqual(u,d),p=u,m=E.size(u),f=!1,b=!1,g=[c];if(c){let _=et.calcShape(u,d,!1);if(!_)throw new Error("Can't perform binary op on the given tensors");p=_.slice(),m=E.size(p);let S=E.size(u)===1,$=E.size(d)===1,w=u.length>0&&u[u.length-1]%4===0,x=d.length>0&&d[d.length-1]%4===0;g.push(S),g.push($),g.push(w),g.push(x);let T=1;for(let k=1;k<p.length;k++){let I=u[u.length-k],O=d[d.length-k];if(I===O)T*=I;else break}T%4===0?(b=!0,f=!0):(S||$||w||x)&&(f=!0)}else f=!0;return g.push(f),{name:e,shaderCache:{hint:t+g.map(_=>_.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:_=>rf(_,u,d,p,f,c,b,o,r.dataType,n.dataType,a,i),getRunData:()=>({outputs:[{dims:p,dataType:a}],dispatchGroup:{x:Math.ceil(m/64/4)},programUniforms:[{type:12,data:Math.ceil(E.size(p)/4)},...N(u,d,p)]})}},it=(e,t,r,n,o,i)=>{e.compute(nf(t,o??"",e.inputs[0],e.inputs[1],r,n,i))},vu=e=>{it(e,"Add",(t,r)=>`${t}+${r}`)},$u=e=>{it(e,"Div",(t,r)=>`${t}/${r}`)},xu=e=>{it(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},Su=e=>{it(e,"Mul",(t,r)=>`${t}*${r}`)},Tu=e=>{let t=P("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;it(e,"Pow",{scalar:(n,o)=>`pow_custom(${n},${o})`,vector:(n,o)=>`pow_vector_custom(${n},${o})`},`
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
      `)},Iu=e=>{it(e,"Sub",(t,r)=>`${t}-${r}`)},Cu=e=>{it(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Au=e=>{it(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},ku=e=>{it(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Eu=e=>{it(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}});var af,sf,uf,df,Ou,zu,Du=U(()=>{"use strict";Y();ne();Se();ie();af=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,n=e[r],o=n.dataType,i=n.dims.length;e.forEach((a,u)=>{if(u!==r){if(a.dataType!==o)throw new Error("input tensors should be one type");if(a.dims.length!==i)throw new Error("input tensors should have the same shape");a.dims.forEach((d,c)=>{if(c!==t&&d!==n.dims[c])throw new Error("non concat dimensions must match")})}})},sf=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,uf=(e,t)=>{let r=e.length,n=[];for(let o=0;o<r;++o){let i=t.setByOffset("global_idx",e[o].getByIndices("indices"));r===1?n.push(i):o===0?n.push(`if (inputIndex == ${o}u) { ${i} }`):o===r-1?n.push(`else { ${i} }`):n.push(`else if (inputIndex == ${o}) { ${i} }`)}return n.join(`
`)},df=(e,t,r,n)=>{let o=E.size(r),i=new Array(e.length),a=new Array(e.length),u=0,d=[],c=[],p=[{type:12,data:o}];for(let _=0;_<e.length;++_)u+=e[_].dims[t],i[_]=u,c.push(e[_].dims.length),a[_]=P(`input${_}`,n,c[_]),d.push("rank"),p.push({type:12,data:i[_]});for(let _=0;_<e.length;++_)p.push(...N(e[_].dims));p.push(...N(r));let m=M("output",n,r.length),f=m.indicesGet("indices",t),b=Array.from(Array(i.length).keys()).map(_=>`uniforms.sizeInConcatAxis${_}`).join(","),g=_=>`

  ${(()=>{_.registerUniform("outputSize","u32");for(let S=0;S<e.length;S++)_.registerUniform(`sizeInConcatAxis${S}`,"u32");return _.declareVariables(...a,m)})()}

  ${sf(i.length,b)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${m.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${f});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${b});
      ${f} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${uf(a,m)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:p}),getShaderSource:g}},Ou=(e,t)=>{let r=e.inputs,n=r[0].dims,o=E.normalizeAxis(t.axis,n.length);af(r,o);let i=n.slice();i[o]=r.reduce((u,d)=>u+(d.dims.length>o?d.dims[o]:0),0);let a=r.filter(u=>E.size(u.dims)>0);e.compute(df(a,o,i,r[0].dataType),{inputs:a})},zu=e=>X({axis:e.axis})});var qe,Ke,je,Zr,vt=U(()=>{"use strict";Y();ne();qe=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Ke=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},je=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Zr=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,n]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:n}}else if(t==="Clip"){let[r,n]=e?.activation_params||[Wa,La];return{activation:t,clipMax:n,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}});var Ie,Bu,Qr=U(()=>{"use strict";Ie=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Bu=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Mu,Ru=U(()=>{"use strict";Mu=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var Jt,Yr,Xr=U(()=>{"use strict";Y();ne();ie();vt();Jt=(e,t,r,n,o)=>{let i=n-r;return`
      ${Array.from({length:r}).map((a,u)=>`
      if (${F(t.shape,u,t.rank)} != 1) {
        ${t.indicesSet(e,u,F(o,u+i,n))}
      } else {
        ${t.indicesSet(e,u,0)}
      }`).join("")}
`},Yr=(e,t,r,n,o=!1,i)=>{let a=e[0].dims,u=e[1].dims,d=a[a.length-2],c=u[u.length-1],p=a[a.length-1],m=me(c),f=me(p),b=me(d),g=E.size(r)/m/b,_=e.length>2,S=n?n.slice(0,-2):r.slice(0,-2),w=[E.size(S),d,c],x=[{type:12,data:g},{type:12,data:d},{type:12,data:c},{type:12,data:p}];Ke(t,x),x.push(...N(S,a,u)),_&&x.push(...N(e[2].dims)),x.push(...N(w));let T=k=>{let I=Gr("batch_dims",e[0].dataType,S.length),O=P("a",e[0].dataType,a.length,f),z=P("b",e[1].dataType,u.length,m),B=M("output",e[0].dataType,w.length,m),W=ye(B.type.tensor),q=qe(t,B.type.value,W),j=[O,z],te="";if(_){let J=o?m:1;j.push(P("bias",e[2].dataType,e[2].dims.length,J)),te=`${o?`value += bias[col / ${J}];`:`value += ${B.type.value}(bias[row + i]);`}`}let V=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];je(t,V);let de=()=>{let J=`var a_data: ${O.type.value};`;for(let H=0;H<f;H++)J+=`
              let b_data${H} = b[(b_offset + (k + ${H}) * uniforms.N + col) / ${m}];`;for(let H=0;H<b;H++){J+=`a_data = a[(a_offset + (row + ${H}) * uniforms.K + k) / ${f}];`;for(let ae=0;ae<f;ae++)J+=`
            values[${H}] = fma(${z.type.value}(a_data${f===1?"":`[${ae}]`}), b_data${ae}, values[${H}]);
`}return J};return`
  ${k.registerUniforms(V).registerInternalVariables(I).declareVariables(...j,B)}
  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${m})) * ${m};
    var index1 = global_idx / (uniforms.N / ${m});
    let stride1 = uniforms.M / ${b};
    let row = (index1 % stride1) * ${b};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${I.offsetToIndices("batch")};`}

    var a_indices: ${O.type.indices};
    ${Jt("a_indices",O,O.rank-2,I.rank,"batch_indices")}
    ${O.indicesSet("a_indices",O.rank-2,0)}
    ${O.indicesSet("a_indices",O.rank-1,0)}
    let a_offset = ${O.indicesToOffset("a_indices")};

    var b_indices: ${z.type.indices};
    ${Jt("b_indices",z,z.rank-2,I.rank,"batch_indices")}
    ${z.indicesSet("b_indices",z.rank-2,0)}
    ${z.indicesSet("b_indices",z.rank-1,0)}
    let b_offset = ${z.indicesToOffset("b_indices")};
    var values: array<${B.type.value}, ${b}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${f}) {
      ${de()}
    }
    for (var i = 0u; i < ${b}u; i++) {
      var value = values[i];
      ${te}
      ${q}
      let cur_indices = ${B.type.indices}(batch, row + i, col);
      let offset = ${B.indicesToOffset("cur_indices")};
      ${B.setByOffset(`offset / ${m}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${m};${f};${b};${o}`,inputDependencies:_?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:x}),getShaderSource:T}}});var lf,cf,mo,Uu,pf,fo,mf,er,Jr=U(()=>{"use strict";Y();ne();ie();vt();Xr();Qr();lf=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,cf=(e,t)=>e?`
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
          ${lf(o,n)}
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

          ${cf(o,f)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Uu=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,pf=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",fo=(e,t,r="f32",n,o=!1,i=32,a=!1,u=32,d=!1)=>{let c=e[1]*t[1],p=e[0]*t[0],m=o?c:i,f=o?i:c;if(!(f%t[1]===0&&m%t[0]===0&&i%t[1]===0))throw new Error(`tileAHight ${f} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${m} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let b=f/t[1],g=m/t[0],_=i/t[1],S=d?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${c};
    let globalColStart = i32(workgroupId.x) * ${p};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${f}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${m}; inputCol = inputCol + ${t[0]}) {
          ${Uu(o,n)}
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
      ${Uu(o,n)}
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
      ${pf(o)}
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
`},mf=(e,t,r,n,o=!1)=>{let[i,a,u,d]=n,c=ye(n[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Ie(e,c)} {
      var value = ${Ie(e,c)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${Jt("aIndices",a,a.rank-2,i.rank,"batchIndices")}
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
        ${Jt("bIndices",u,u.rank-2,i.rank,"batchIndices")}
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
    `},er=(e,t,r,n,o=!1,i)=>{let a=e[0].dims,u=e[1].dims,d=a.slice(0,-2),c=u.slice(0,-2),p=n?n.slice(0,-2):r.slice(0,-2),m=E.size(p),f=a[a.length-2],b=a[a.length-1],g=u[u.length-1],_=b%4===0&&g%4===0,S=f<=8?[4,1,1]:[4,4,1],$=[8,8,1],w=[Math.ceil(g/$[0]/S[0]),Math.ceil(f/$[1]/S[1]),Math.ceil(m/$[2]/S[2])],x=_?4:1,T=[...d,f,b/x],k=T.length,I=[...c,b,g/x],O=I.length,z=[m,f,g/x],B=[{type:6,data:f},{type:6,data:g},{type:6,data:b}];Ke(t,B),B.push(...N(p,T,I));let W=["rank","rank"],q=e.length>2;q&&(B.push(...N(e[2].dims)),W.push("rank")),B.push(...N(z));let j=te=>{let V=p.length,de=Gr("batchDims",e[0].dataType,V,1),J=ye(e[0].dataType),H=P("a",e[0].dataType,k,x),ae=P("b",e[1].dataType,O,x),Z=M("result",e[0].dataType,z.length,x),re=[H,ae];if(q){let L=o?x:1;re.push(P("bias",e[2].dataType,e[2].dims.length,L))}let ve=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];je(t,ve);let _e=ye(Z.type.tensor),ee=qe(t,Z.type.value,_e),C=mf(x,q,ee,[de,H,ae,Z],o);return`
  ${te.registerUniforms(ve).registerInternalVariables(de).declareVariables(...re,Z)}
  ${C}
  ${_?mo(S,$,J,de):fo(S,$,J,de)}
                   `};return{name:"MatMul",shaderCache:{hint:`${S};${t.activation};${_};${o}`,inputDependencies:W},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:B}),getShaderSource:j}}});var ff,Nu,Vu=U(()=>{"use strict";Y();Je();ie();vt();Qr();Ru();Jr();ff=(e,t,r,n,o=!1,i,a=4,u=4,d=4,c="f32")=>{let p=W=>{switch(W){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${c}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${W} is not supported.`)}},m=W=>{switch(W){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${W} is not supported.`)}},f=e?`
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
    `,g=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",_=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",S=e?"row":"col",$=e?"col":"row",w=`
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
    return ${Ie(u,c)}(0.0);`,k=Ie(d,c),I=e?Ie(a,c):Ie(u,c),O=e?Ie(u,c):Ie(a,c),z=qe(i,k,c);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${I} {
      ${e?x:T}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${O} {
      ${e?T:x}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${k}) {
      let col = colIn * ${d};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${b}
      ${Bu(o)}
      ${z}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Nu=(e,t,r,n,o,i,a,u,d)=>{let c=t.format==="NHWC",p=c?e[0].dims[3]:e[0].dims[1],m=r[0],f=c?r[2]:r[3],b=c?r[1]:r[2],g=c?r[3]:r[1],_=c&&(p%4===0||p%3===0)&&g%4===0,S=c?g:f*b,$=c?f*b:g,w=[8,8,1],x=n<=8?[4,1,1]:[4,4,1],T=[Math.ceil(S/w[0]/x[0]),Math.ceil($/w[1]/x[1]),Math.ceil(m/w[2]/x[2])];ue("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${T}`);let k=_?c&&p%4!==0?3:4:1,I=w[1]*x[1],O=w[0]*x[0],z=Math.max(w[0]*k,w[1]),B=n%I===0,W=o%O===0,q=i%z===0,j=_?[k,4,4]:[1,1,1],te=[{type:6,data:n},{type:6,data:o},{type:6,data:i},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Ke(t,te),te.push(...N(e[0].dims,e[1].dims));let V=["rank","rank"];a&&(te.push(...N(e[2].dims)),V.push("rank")),te.push(...N(r));let de=J=>{let H=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];je(t,H);let ae=_?4:1,Z=ye(e[0].dataType),re=`
      fn setOutputAtIndex(flatIndex : i32, value : ${_?`vec4<${Z}>`:Z}) {
        result[flatIndex] = ${_?`vec4<${Z}>`:Z}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${_?`vec4<${Z}>`:Z}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${_?"/ 4":""}, value);
      }`,ve=P("x",e[0].dataType,e[0].dims.length,k===3?1:k),_e=P("w",e[1].dataType,e[1].dims.length,ae),ee=[ve,_e],C=M("result",e[0].dataType,r.length,ae);if(a){let L=P("bias",e[2].dataType,e[2].dims.length,ae);ee.push(L),re+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${_?`vec4<${Z}>`:Z} {
          return bias[coords.${c?"w":"y"}${_?"/ 4":""}];
        }`}return`
        ${Mu("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${J.registerUniforms(H).declareVariables(...ee,C)}
        ${re}
        ${ff(c,B,W,q,a,t,j[0],j[1],j[2],Z)}
        ${_?mo(x,w,Z,void 0,!c,z):fo(x,w,Z,void 0,!c,z,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${k};${_};${B};${W};${q};${I};${O};${z}`,inputDependencies:V},getRunData:()=>({outputs:[{dims:d?d(r):r,dataType:e[0].dataType}],dispatchGroup:{x:T[0],y:T[1],z:T[2]},programUniforms:te}),getShaderSource:de}}});var hf,Wu,en,gf,Lu,bf,Gu,Hu,Fu=U(()=>{"use strict";Y();Je();ne();ie();vt();Qr();hf=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Wu=e=>typeof e=="number"?[e,e,e]:e,en=(e,t)=>t<=1?e:e+(e-1)*(t-1),gf=(e,t,r,n=1)=>{let o=en(t,n);return Math.floor((e[0]*(r-1)-r+o)/2)},Lu=(e,t,r,n,o)=>{o==null&&(o=gf(e,t[0],n[0]));let i=[0,0,0,r];for(let a=0;a<3;a++)e[a]+2*o>=t[a]&&(i[a]=Math.trunc((e[a]-t[a]+2*o)/n[a]+1));return i},bf=(e,t,r,n,o,i,a,u,d,c)=>{let p,m,f,b;if(e==="VALID"&&(e=0),typeof e=="number"){p={top:e,bottom:e,left:e,right:e,front:e,back:e};let g=Lu([t,r,n,1],[u,d,c],1,[o,i,a],e);m=g[0],f=g[1],b=g[2]}else if(Array.isArray(e)){if(!e.every((_,S,$)=>_===$[0]))throw Error(`Unsupported padding parameter: ${e}`);p={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let g=Lu([t,r,n,1],[u,d,c],1,[o,i,a],e[0]);m=g[0],f=g[1],b=g[2]}else if(e==="SAME_UPPER"){m=Math.ceil(t/o),f=Math.ceil(r/i),b=Math.ceil(n/a);let g=(m-1)*o+u-t,_=(f-1)*i+d-r,S=(b-1)*a+c-n,$=Math.floor(g/2),w=g-$,x=Math.floor(_/2),T=_-x,k=Math.floor(S/2),I=S-k;p={top:x,bottom:T,left:k,right:I,front:$,back:w}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:p,outDepth:m,outHeight:f,outWidth:b}},Gu=(e,t,r,n,o,i=!1,a="channelsLast")=>{let u,d,c,p,m;if(a==="channelsLast")[u,d,c,p,m]=e;else if(a==="channelsFirst")[u,m,d,c,p]=e;else throw new Error(`Unknown dataFormat ${a}`);let[f,,b,g,_]=t,[S,$,w]=Wu(r),[x,T,k]=Wu(n),I=en(b,x),O=en(g,T),z=en(_,k),{padInfo:B,outDepth:W,outHeight:q,outWidth:j}=bf(o,d,c,p,S,$,w,I,O,z),te=i?f*m:f,V=[0,0,0,0,0];return a==="channelsFirst"?V=[u,te,W,q,j]:a==="channelsLast"&&(V=[u,W,q,j,te]),{batchSize:u,dataFormat:a,inDepth:d,inHeight:c,inWidth:p,inChannels:m,outDepth:W,outHeight:q,outWidth:j,outChannels:te,padInfo:B,strideDepth:S,strideHeight:$,strideWidth:w,filterDepth:b,filterHeight:g,filterWidth:_,effectiveFilterDepth:I,effectiveFilterHeight:O,effectiveFilterWidth:z,dilationDepth:x,dilationHeight:T,dilationWidth:k,inShape:e,outShape:V,filterShape:t}},Hu=(e,t,r,n,o,i)=>{let a=i==="channelsLast",u=a?e[0].dims[3]:e[0].dims[1],d=!1,c=[64,1,1],p={x:r.map((w,x)=>x)},m=[Math.ceil(hf(p.x.map(w=>r[w]))/c[0]),1,1];ue("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${m}`);let f=d?a&&u%4!==0?3:4:1,b=E.size(r),g=[{type:12,data:b},{type:12,data:n},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];Ke(t,g),g.push(...N(e[0].dims,e[1].dims));let _=["rank","rank"],S=e.length===3;S&&(g.push(...N(e[2].dims)),_.push("rank")),g.push(...N(r));let $=w=>{let x=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:n.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];je(t,x);let T=d?4:1,k=ye(e[0].dataType),I=P("x",e[0].dataType,e[0].dims.length,f===3?1:f),O=P("W",e[1].dataType,e[1].dims.length,T),z=[I,O],B=M("result",e[0].dataType,r.length,T),W="";if(S){let te=P("bias",e[2].dataType,e[2].dims.length,T);z.push(te),W+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${d?`vec4<${k}>`:k} {
          return bias[${a?F("coords",4,5):F("coords",1,5)}${d?"/ 4":""}];
        }`}let q=Ie(f,k),j=qe(t,q,k);return`
            ${W}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${O.getByIndices("aIndices")};
            }
          ${w.registerUniforms(x).declareVariables(...z,B)}
          ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${B.offsetToIndices("global_idx")};
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
              ${j}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${a};${f};${S}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:m[0],y:m[1],z:m[2]},programUniforms:g}),getShaderSource:$}}});var qu,Ku,ju=U(()=>{"use strict";Y();ne();ie();vt();qu=(e,t,r,n)=>{let o=e.length>2,i=o?"value += b[output_channel];":"",a=e[0].dims,u=e[1].dims,d=t.format==="NHWC",c=d?r[3]:r[1],p=c/t.group,m=d&&p>=4?me(c):1,f=E.size(r)/m,b=[{type:12,data:f},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:p}];Ke(t,b),b.push(...N(a,[u[0],u[1],u[2],u[3]/m]));let g=o?["rank","rank","rank"]:["rank","rank"];b.push(...N([r[0],r[1],r[2],r[3]/m]));let _=S=>{let $=M("output",e[0].dataType,r.length,m),w=ye($.type.tensor),x=qe(t,$.type.value,w),T=P("x",e[0].dataType,a.length),k=P("w",e[1].dataType,u.length,m),I=[T,k];o&&I.push(P("b",e[2].dataType,e[2].dims,m));let O=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];je(t,O);let z=d?`
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
            let wVal = ${k.get("wHeight","wWidth","wInChannel","output_channel")};
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
            let wVal = ${k.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${S.registerUniforms(O).declareVariables(...I,$)}

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${$.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${d?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${d?1:2}], outputIndices[${d?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${m} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${d?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${z}
    ${i}
    ${x}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${m}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:b}),getShaderSource:_}},Ku=(e,t,r,n)=>{let o=e.length>2,i=me(r[3]),a=me(r[2]),u=E.size(r)/i/a,d=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/i],c=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/i],p=[r[0],r[1],r[2],r[3]/i],m=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Ke(t,m),m.push(...N(d,c,p));let f=(a-1)*t.strides[1]+c[1],b=g=>{let _=M("output",e[0].dataType,p.length,i),S=ye(_.type.tensor),$=qe(t,_.type.value,S),w=P("x",e[0].dataType,d.length,i),x=P("w",e[1].dataType,c.length,i),T=[w,x];o&&T.push(P("b",e[2].dataType,e[2].dims,i));let k=o?"value += b[output_channel];":"",I=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return je(t,I),`
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
          let w_val = ${x.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${a}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${a}u; i++) {
      var value = values[i];
      ${k}
      ${$}
      ${_.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${i};${a};${f};${c[0]};${c[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:m}),getShaderSource:b}}});var yf,ho,_f,go,bo,Zu,wf,vf,yo,Qu=U(()=>{"use strict";ne();Vu();Fu();Jr();ju();vt();Xr();ut();yf=(e,t,r,n,o,i)=>{let a=e[0],u=e.slice(i?1:2,i?3:4),d=u.length,c=t[0],m=t.slice(2).map((g,_)=>g+(g-1)*(r[_]-1)),b=u.map((g,_)=>g+n[_]+n[_+d]).map((g,_)=>Math.floor((g-m[_]+o[_])/o[_]));return b.splice(0,0,a),b.splice(i?3:1,0,c),b},ho=[2,3,1,0],_f=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[1]*t.group;if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},go=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let i=2;i<t[1].dims.length;++i)r[i-2]===0&&(r[i-2]=t[1].dims[i]);let n=e.pads.slice();At.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.format==="NHWC",e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:r,pads:n}),o},bo=e=>{let t=Zr(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],o=e.dilations,i=e.group,a=e.kernel_shape,u=e.pads,d=e.strides,c=e.w_is_const();return{autoPad:n,format:r,dilations:o,group:i,kernelShape:a,pads:u,strides:d,wIsConst:c,...t,cacheKey:`${e.format};${t.activation};`}},Zu=(e,t,r,n)=>{let o=r.format==="NHWC",i=yf(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,o);if(r.group!==1){let I=[t[0]];if(o){let z=e.kernelCustomData.wT??e.compute(ke(t[1],ho),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=z),I.push(z)}else I.push(t[1]);t.length===3&&I.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(Ku(I,r,i,n),{inputs:I}):e.compute(qu(I,r,i,n),{inputs:I});return}let a=t.length===3,u=t[0].dims[o?1:2],d=t[0].dims[o?2:3],c=t[0].dims[o?3:1],p=t[1].dims[2],m=t[1].dims[3],f=i[o?1:2],b=i[o?2:3],g=i[o?3:1],_=o&&p===u&&m===d&&r.pads[0]===0&&r.pads[1]===0;if(_||p===1&&m===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let I=i[0],O,z,B,W=[];if(o){let te=e.kernelCustomData.wT??e.compute(ke(t[1],ho),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=te),_){let V=u*d*c;O=t[0].reshape([1,I,V]),z=te.reshape([1,V,g]),B=[1,I,g]}else O=t[0].reshape([I,u*d,c]),z=te.reshape([1,c,g]),B=[I,f*b,g];W.push(O),W.push(z)}else O=t[0].reshape([I,c,u*d]),z=t[1].reshape([1,g,c]),B=[I,g,f*b],W.push(z),W.push(O);a&&W.push(t[2]);let q=B[2],j=W[0].dims[W[0].dims.length-1];q<8&&j<8?e.compute(Yr(W,r,i,B,o,n),{inputs:W}):e.compute(er(W,r,i,B,o,n),{inputs:W});return}let S=!0,$=e.kernelCustomData.wT??e.compute(ke(t[1],ho),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let w=[t[0],$];a&&w.push(t[2]);let x=o?f*b:g,T=o?g:f*b,k=p*m*c;e.compute(Nu(w,r,i,x,T,k,a,S,n),{inputs:w})},wf=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],i=[1].concat(t.strides),a=[1].concat(t.dilations),u=[1].concat(t.kernelShape),d=go({...t,pads:o,strides:i,dilations:a,kernelShape:u},n);Zu(e,n,d,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},vf=(e,t,r)=>{let n=r.format==="NHWC"?"channelsLast":"channelsFirst",o=go(r,t),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,a=Gu(t[0].dims,t[1].dims,r.strides,r.dilations,i,!1,n);e.compute(Hu(t,o,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],n))},yo=(e,t)=>{if(_f(e.inputs,t),e.inputs[0].dims.length===3)wf(e,t);else if(e.inputs[0].dims.length===5)vf(e,e.inputs,t);else{let r=go(t,e.inputs);Zu(e,e.inputs,r)}}});var Yu,Xu=U(()=>{"use strict";Y();Je();ne();ie();Yu=(e,t,r)=>{let n=e.length>2,o=t.outputShape,i=t.format==="NHWC",a=t.group,u=e[1].dims,d=u[2]/a,c=u[3],p=i?me(d):1,m=i&&c===1&&d>=4,f=m?Math.floor(d/4)*4:Math.floor(d/p)*p,b=d-f,g=i?me(c):1,_=i?c===1?p:g:1,S=E.size(o)/g,$=[Math.ceil(S/64),1,1];ue("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${$}`);let w=["rank","rank"],x=[t.strides[0],t.strides[1]],T=[t.kernelShape[i?1:2],t.kernelShape[i?2:3]],k=[t.dilations[0],t.dilations[1]],I=[T[0]+(t.dilations[0]<=1?0:(t.kernelShape[i?1:2]-1)*(t.dilations[0]-1)),T[1]+(t.dilations[1]<=1?0:(t.kernelShape[i?2:3]-1)*(t.dilations[1]-1))],O=[I[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),I[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],z=[{type:12,data:S},{type:12,data:x},{type:12,data:T},{type:12,data:k},{type:12,data:I},{type:6,data:O},{type:12,data:f},{type:12,data:d},{type:12,data:c},...N(e[0].dims,e[1].dims)];n&&(z.push(...N(e[2].dims)),w.push("rank")),z.push(...N(o));let B=W=>{let q=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:x.length},{name:"filter_dims",type:"u32",length:T.length},{name:"dilations",type:"u32",length:T.length},{name:"effective_filter_dims",type:"u32",length:I.length},{name:"pads",type:"i32",length:O.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],j=ye(e[0].dataType),te=i?1:2,V=i?2:3,de=i?3:1,J=P("W",e[1].dataType,e[1].dims.length,_),H=P("Dy",e[0].dataType,e[0].dims.length,p),ae=[H,J];n&&ae.push(P("bias",e[2].dataType,[o[de]].length,g));let Z=M("result",e[0].dataType,o.length,g),re=()=>{let ee="";if(m)p===4?ee+=`
        let xValue = ${H.getByOffset("x_offset")};
        let wValue = ${J.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:p===2?ee+=`
          dotProd = dotProd + dot(vec4<${j}>(${H.getByOffset("x_offset")}, ${H.getByOffset("x_offset + 1u")}), vec4<${j}>(${J.getByOffset("w_offset")}, ${J.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:p===1&&(ee+=`
          dotProd = dotProd + dot(vec4<${j}>(${H.getByOffset("x_offset")}, ${H.getByOffset("x_offset + 1u")}, ${H.getByOffset("x_offset + 2u")}, ${H.getByOffset("x_offset + 3u")}), vec4<${j}>(${J.getByOffset("w_offset")}, ${J.getByOffset("w_offset + 1u")}, ${J.getByOffset("w_offset + 2u")}, ${J.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(ee+=`
                  let xValue = ${i?H.getByOffset(`${H.indicesToOffset(`${H.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p}`):H.get("batch","inputChannel","idyR","idyC")};
        `,p===1)ee+=`
          let w_offset = ${J.indicesToOffset(`${J.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${J.getByOffset(`w_offset / ${_}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let C=0;C<p;C++)ee+=`
            let wValue${C} = ${J.getByOffset(`${J.indicesToOffset(`${J.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${C}, wOutChannel)`)} / ${_}`)};
            dotProd = dotProd + xValue[${C}] * wValue${C};`;return ee},ve=()=>{if(b===0)return"";if(!m)throw new Error(`packInputAs4 ${m} is not true.`);let ee="";if(p===1){ee+="dotProd = dotProd";for(let C=0;C<b;C++)ee+=`
            + ${H.getByOffset(`x_offset + ${C}`)} * ${J.getByOffset(`w_offset + ${C}`)}`;ee+=";"}else if(p===2){if(b!==2)throw new Error(`Invalid inputChannelsRemainder ${b}.`);ee+=`
          let xValue = ${H.getByOffset("x_offset")};
          let wValue = ${J.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return ee},_e=`
            let outputIndices = ${Z.offsetToIndices(`global_idx * ${g}`)};
            let batch = ${Z.indicesGet("outputIndices",0)};
            let d1 = ${Z.indicesGet("outputIndices",de)};
            let r = ${Z.indicesGet("outputIndices",te)};
            let c = ${Z.indicesGet("outputIndices",V)};
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
              let dyR = (${j}(dyRCorner) + ${j}(wR)) / ${j}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${j}(uniforms.Dy_shape[${te}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${j}(dyCCorner) + ${j}(wC)) / ${j}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${j}(uniforms.Dy_shape[${V}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${m?`
                var x_offset = ${H.indicesToOffset(`${H.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p};
                var w_offset = ${J.indicesToOffset(`${J.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${_};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${m?4:p}) {
                  ${re()}
                  inputChannel = inputChannel + ${m?4:p};
                }
                ${ve()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${n?` + bias[d1 / ${g}]`:""};
            ${Z.setByOffset("global_idx","value")};
          `;return`
    ${W.registerUniforms(q).declareVariables(...ae,Z)}
      ${W.mainStart()}
      ${W.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${_e}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${p}${_}${g}${m}${b}`,inputDependencies:w},getRunData:()=>({dispatchGroup:{x:$[0],y:$[1],z:$[2]},outputs:[{dims:r?r(o):o,dataType:e[0].dataType}],programUniforms:z}),getShaderSource:B}}});var $f,xf,Sf,Ju,ed,Tf,td,If,rd,nd=U(()=>{"use strict";Xu();vt();ut();$f=(e,t,r,n,o,i)=>(e-1)*t+r+(n-1)*o+1-i,xf=(e,t,r,n,o)=>{let i=Math.floor(e/2);t==="SAME_UPPER"?(r[n]=i,r[o]=e-i):t==="SAME_LOWER"&&(r[n]=e-i,r[o]=i)},Sf=(e,t,r,n,o,i,a,u,d,c)=>{let p=e.length-2,m=c.length===0;d.length<p&&d.push(...Array(p-d.length).fill(0));let f=e[0],b=t[u?3:1]*o;for(let g=0,_=e.length-p-(u?1:0);g<p;++g,++_){let S=e[_],$=m?S*a[g]:c[g],w=$f(S,a[g],i[g],t[_],r[g],$);xf(w,n,i,g,g+p),m&&c.push(a[g]*(S-1)+d[g]+(t[_]-1)*r[g]+1-i[g]-i[g+p])}c.splice(0,0,f),c.splice(u?3:1,0,b)},Ju=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((m,f)=>m*f,1)===0){r.length=0;for(let m=2;m<t[1].dims.length;++m)r.push(t[1].dims[m])}let n=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let o=e.pads.slice(),i=e.outputShape.slice(),a=e.outputPadding.slice(),u=t[0].dims,d=e.dilations.slice();if(d.reduce((m,f)=>m+f,0)===0){let m=t[0].dims.length-2;d=new Array(m).fill(1)}let c=e.strides.slice();if(c.reduce((m,f)=>m+f,0)===0){let m=t[0].dims.length-2;c=new Array(m).fill(1)}Sf(u,r,d,e.autoPad,e.group,o,c,n,a,i);let p=Object.assign({},e);return Object.assign(p,{kernelShape:r,pads:o,outputPadding:a,outputShape:i,dilations:d,strides:c}),p},ed=e=>{let t=Zr(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,i=e.group,a=e.kernelShape,u=e.pads,d=e.strides,c=e.wIsConst(),p=e.outputPadding,m=e.outputShape;return{autoPad:n,format:r,dilations:o,group:i,kernelShape:a,outputPadding:p,outputShape:m,pads:u,strides:d,wIsConst:c,...t,cacheKey:`${e.format};${t.activation};`}},Tf=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[0];if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==o))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((p,m)=>p+m,0)>0&&t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.reduce((p,m)=>p+m,0)>0&&t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.reduce((p,m)=>p+m,0)>0&&t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.outputPadding.length!==i&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((p,m)=>p+m,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},td=(e,t,r,n)=>{let o=e.kernelCustomData.wT??e.compute(ke(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=o);let i=[t[0],o];t.length===3&&i.push(t[2]),e.compute(Yu(i,r,n),{inputs:i})},If=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=t.kernelShape;(o.length===0||o[0]===0)&&(o=[e.inputs[1].dims[2]]);let i=t.dilations;(i.length===0||i[0]===0)&&(i=[1]);let a=t.strides;(a.length===0||a[0]===0)&&(a=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],a=[1].concat(a),i=[1].concat(i),o=[1].concat(o);let d=t.outputPadding;d=[0].concat(d);let c=Ju({...t,pads:u,strides:a,dilations:i,kernelShape:o,outputPadding:d},n);td(e,n,c,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},rd=(e,t)=>{if(Tf(e.inputs,t),e.inputs[0].dims.length===3)If(e,t);else{let r=Ju(t,e.inputs);td(e,e.inputs,r)}}});var Cf,od,id,ad=U(()=>{"use strict";Y();ne();Se();ie();Cf=(e,t,r,n)=>{let o=E.size(t),i=t.length,a=P("input",e,i),u=M("output",e,i),d=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),c=E.normalizeAxis(d,i),p=m=>{let f=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,b=F("uniforms.input_shape","uniforms.axis",i),g=n.reverse?f+(n.exclusive?" + 1":""):"0",_=n.reverse?b:f+(n.exclusive?"":" + 1");return`
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
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:c},...N(t,t)]}),getShaderSource:p}},od=(e,t)=>{let r=e.inputs[0].dims,n=e.inputs[0].dataType,o=e.inputs[1];e.compute(Cf(n,r,o,t),{inputs:[0]})},id=e=>{let t=e.exclusive===1,r=e.reverse===1;return X({exclusive:t,reverse:r})}});var Af,kf,Ef,sd,ud,dd=U(()=>{"use strict";Y();ne();Se();ie();Af=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},kf=(e,t,r,n)=>{let o=[];o.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<t;++i)o.push(r.indicesSet("a",e[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},Ef=(e,t)=>{let r,n,o,i,a,u,d=t.format==="NHWC",c=t.blocksize,p=t.mode==="DCR";d?([r,n,o,i]=e.dims,a=p?[r,n,o,c,c,i/c**2]:[r,n,o,i/c**2,c,c],u=p?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,o,i]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],a=p?[r,c,c,i/c**2,n,o]:[r,i/c**2,c,c,n,o],u=p?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let m=e.reshape(a),f=m.dims.length,b=e.dataType,g=P("a",b,f),_=M("output",b,f),S=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(g,_)}

  ${kf(u,f,g,_)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${_.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${_.setByOffset("global_idx",g.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let w=d?[r,n*c,o*c,i/c**2]:[r,i/c**2,n*c,o*c],x=E.size(w),T=m.dims,k=E.sortBasedOnPerm(T,u);return{outputs:[{dims:w,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(x/64)},programUniforms:[{type:12,data:x},...N(T,k)]}},getShaderSource:S}},sd=(e,t)=>{Af(e.inputs),e.compute(Ef(e.inputs[0],t))},ud=e=>X({blocksize:e.blocksize,mode:e.mode,format:e.format})});var _o,tn,ld,Pf,Of,wo,vo,cd,zf,pd,md,fd=U(()=>{"use strict";Y();ne();Se();ie();_o="[a-zA-Z]|\\.\\.\\.",tn="("+_o+")+",ld="^"+tn+"$",Pf="("+tn+",)*"+tn,Of="^"+Pf+"$",wo=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,r){let n=this.symbolToIndices.get(t);n===void 0?n=[r]:n.push(r),this.symbolToIndices.set(t,n)}},vo=class{constructor(t,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,o]=r.includes("->")?r.split("->",2):[r,""];if(!n.match(RegExp(Of)))throw new Error("Invalid LHS term");if(n.split(",").forEach((u,d)=>{let c=t[d].dims.slice();if(!u.match(RegExp(ld)))throw new Error("Invalid LHS term");let p=this.processTerm(u,!0,c,d);this.lhs.push(p)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([u,d])=>d.count===1||u==="...").map(([u])=>u).join("");else if(!o.match(RegExp(tn)))throw new Error("Invalid RHS");o.match(RegExp(_o,"g"))?.forEach(u=>{if(u==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let d=this.symbolToInfo.get(u);if(d===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(d.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(t,r,n){let o=this.symbolToInfo.get(t);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(n)}else o={count:1,dimValue:r,inputIndices:[n]};this.symbolToInfo.set(t,o)}processTerm(t,r,n,o=-1){let i=n.length,a=!1,u=[],d=0;if(!t.match(RegExp(ld))&&!r&&t!=="")throw new Error("Invalid LHS term");let c=t.match(RegExp(_o,"g")),p=new wo(o);return c?.forEach((m,f)=>{if(m==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let b=i-c.length+1;if(b<0)throw new Error("Ellipsis out of bounds");if(u=n.slice(d,d+b),this.hasEllipsis){if(this.ellipsisDims.length!==u.length||this.ellipsisDims.toString()!==u.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=u;else throw new Error("Ellipsis must be specified in the LHS");for(let g=0;g<u.length;g++){let _=String.fromCharCode(48+g);p.addSymbol(_,f+g),this.addSymbol(_,n[d++],o)}}else p.addSymbol(m,f+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(m,n[d++],o)}),p}},cd=e=>e+"_max",zf=(e,t,r,n)=>{let i=e.map(p=>p.length).map((p,m)=>P(`input${m}`,t,p)),a=E.size(n),u=M("output",t,n.length),d=[...r.symbolToInfo.keys()].filter(p=>!r.rhs.symbolToIndices.has(p)),c=p=>{let m=[],f="var prod = 1.0;",b="var sum = 0.0;",g="sum += prod;",_=[],S=[],$=[],w=[],x=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((k,I)=>{if(r.rhs.symbolToIndices.has(I)){let O=r.rhs.symbolToIndices.get(I)?.[0];O!==void 0&&r.lhs.forEach((z,B)=>{if(k.inputIndices.includes(B)){let W=z.symbolToIndices.get(I);if(W===void 0)throw new Error("Invalid symbol error");W.forEach(q=>{m.push(`${i[B].indicesSet(`input${B}Indices`,q,u.indicesGet("outputIndices",O))}`)})}})}else r.lhs.forEach((O,z)=>{if(k.inputIndices.includes(z)){let B=O.symbolToIndices.get(I);if(B===void 0)throw new Error("Invalid symbol error");B.forEach(W=>{_.push(`${i[z].indicesSet(`input${z}Indices`,W,`${I}`)}`)}),w.push(`prod *= ${i[z].getByIndices(`input${z}Indices`)};`)}}),S.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${cd(I)}; ${I}++) {`),$.push("}")});let T=x?[...m,`let sum = ${i.map((k,I)=>k.getByIndices(`input${I}Indices`)).join(" * ")};`]:[...m,b,...S,..._,f,...w,g,...$];return`
            ${p.registerUniforms(d.map(k=>({name:`${cd(k)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,u)}

            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${u.offsetToIndices("global_idx")};
            ${i.map((k,I)=>`var input${I}Indices: ${i[I].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${u.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let p=d.filter(f=>r.symbolToInfo.has(f)).map(f=>({type:12,data:r.symbolToInfo.get(f)?.dimValue||0}));p.push({type:12,data:a});let m=e.map((f,b)=>[...N(f)]).reduce((f,b)=>f.concat(b),p);return m.push(...N(n)),{outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:m}},getShaderSource:c}},pd=(e,t)=>{let r=new vo(e.inputs,t.equation),n=r.outputDims,o=e.inputs.map((i,a)=>i.dims);e.compute(zf(o,e.inputs[0].dataType,r,n))},md=e=>{let t=e.equation.replace(/\s+/g,"");return X({equation:t})}});var Df,hd,Bf,Mf,gd,bd=U(()=>{"use strict";Y();ne();ie();Df=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,o=t.length<r.length?0:t.length-r.length;for(;n<r.length&&o<t.length;++n,++o)if(r[n]!==t[o]&&r[n]!==1&&t[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},hd=(e,t)=>{let r=e.length-t.length,n=[];for(let o=0;o<r;++o)n.push(e[o]);for(let o=0;o<t.length;++o)n.push(t[o]===1?e[o+r]:t[o]);return n},Bf=(e,t)=>e.length>t.length?hd(e,t):hd(t,e),Mf=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=Bf(t,r),o=e[0].dataType,i=o===9||E.size(t)===1,a=o===9||t.length>0&&t[t.length-1]%4===0?4:1,u=i||n.length>0&&n[n.length-1]%4===0?4:1,d=Math.ceil(E.size(n)/u),c=m=>{let f=P("input",o,t.length,a),b=M("output",o,n.length,u),g;if(o===9){let _=(S,$,w="")=>`
          let outputIndices${$} = ${b.offsetToIndices(`outputOffset + ${$}u`)};
          let offset${$} = ${f.broadcastedIndicesToOffset(`outputIndices${$}`,b)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${S}[${$}] = ${w}(${f.getByOffset(`index${$}`)}[component${$}]);
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
    ${g}`},p=[{type:12,data:d},...N(t,n)];return{name:"Expand",shaderCache:{hint:`${n.length};${a}${u}`,inputDependencies:["rank"]},getShaderSource:c,getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p})}},gd=e=>{Df(e.inputs),e.compute(Mf(e.inputs),{inputs:[0]})}});var Rf,yd,_d=U(()=>{"use strict";Y();ne();ie();jr();Rf=e=>{let t=e[0].dataType,r=E.size(e[0].dims),n=E.size(e[1].dims),o=n%4===0,i=a=>{let u=P("x",t,[1],4),d=P("bias",t,[1],4),c=M("y",t,[1],4),p=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],m=b=>`
      let bias${b}_offset: u32 = (global_idx * 4 + ${b}) % uniforms.bias_size;
      let bias${b} = ${d.getByOffset(`bias${b}_offset / 4`)}[bias${b}_offset % 4];`,f=o?`
      let bias = ${d.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${m(0)}${m(1)}${m(2)}${m(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(p).declareVariables(u,d,c)}

    ${co(Ae(t))}

    ${a.mainStart(kt)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${f}
      let x_in = x + bias;
      ${c.setByOffset("global_idx",po("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/kt/4)}})}},yd=e=>{e.inputs.length<2||E.size(e.inputs[1].dims)===0?fu(e):e.compute(Rf(e.inputs))}});var Uf,Nf,wd,vd,$d=U(()=>{"use strict";Y();ne();Se();ie();Uf=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Nf=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,i=E.normalizeAxis(t.axis,o),a=r.slice(0);a.splice(i,1,...n);let u=r[i],d=e[0].dataType===9?4:1,c=Math.ceil(E.size(a)/d),p=[{type:12,data:c},{type:6,data:u},{type:12,data:i},...N(e[0].dims,e[1].dims,a)],m=f=>{let b=P("data",e[0].dataType,e[0].dims.length,d),g=P("inputIndices",e[1].dataType,e[1].dims.length),_=M("output",e[0].dataType,a.length,d),S=w=>{let x=n.length,T=`var indicesIndices${w}  = ${g.type.indices}(0);`;for(let k=0;k<x;k++)T+=`${x>1?`indicesIndices${w}[${k}]`:`indicesIndices${w}`} = ${a.length>1?`outputIndices${w}[uniforms.axis + ${k}]`:`outputIndices${w}`};`;T+=`
          var idx${w} = ${g.getByIndices(`indicesIndices${w}`)};
          if (idx${w} < 0) {
            idx${w} = idx${w} + uniforms.axisDimLimit;
          }
          var dataIndices${w} : ${b.type.indices};
        `;for(let k=0,I=0;k<o;k++)k===i?(T+=`${o>1?`dataIndices${w}[${k}]`:`dataIndices${w}`} = u32(idx${w});`,I+=x):(T+=`${o>1?`dataIndices${w}[${k}]`:`dataIndices${w}`} = ${a.length>1?`outputIndices${w}[${I}]`:`outputIndices${w}`};`,I++);return T},$;if(e[0].dataType===9){let w=(x,T,k="")=>`
          let outputIndices${T} = ${_.offsetToIndices(`outputOffset + ${T}u`)};
          ${S(T)};
          let offset${T} = ${b.indicesToOffset(`dataIndices${T}`)};
          let index${T} = offset${T} / 4u;
          let component${T} = offset${T} % 4u;
          ${x}[${T}] = ${k}(${b.getByOffset(`index${T}`)}[component${T}]);
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
      ${S("")};
      let value = ${b.getByIndices("dataIndices")};
      ${_.setByOffset("global_idx","value")};
      `;return`
      ${f.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(b,g,_)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:p}),getShaderSource:m}},wd=e=>X({axis:e.axis}),vd=(e,t)=>{let r=e.inputs;Uf(r),e.compute(Nf(e.inputs,t))}});var Vf,xd,Sd,Td=U(()=>{"use strict";Y();ne();ie();Vf=(e,t,r,n,o,i,a,u,d)=>{let c=[{type:12,data:i},{type:12,data:n},{type:12,data:o},{type:12,data:r},{type:12,data:a},{type:12,data:u},{type:12,data:d}],p=[i];c.push(...N(t.dims,p));let m=f=>{let b=P("indices_data",t.dataType,t.dims.length),g=M("input_slice_offsets_data",12,1,1),_=[b,g],S=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
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
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:c}),getShaderSource:m},{inputs:[t],outputs:[-1]})[0]},xd=(e,t)=>{let r=e.inputs,n=r[0].dims,o=r[0].dataType,i=r[1].dims,a=i[i.length-1],u=E.sizeToDimension(i,i.length-1),d=E.sizeFromDimension(n,t.batchDims+a),c=E.sizeToDimension(n,t.batchDims),p=E.sizeFromDimension(n,t.batchDims),m=u/c,f=new Array(a),b=d;for(let T=0;T<a;++T)f[a-1-T]=b,b*=n[t.batchDims+a-1-T];let g=Vf(e,r[1],f,t.batchDims,n,u,m,p,a),_=t.batchDims+a;if(_>n.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let S=i.slice(0,-1).concat(n.slice(_)),$=E.size(S),w=[{type:12,data:$},{type:12,data:d},...N(r[0].dims,g.dims,S)],x=T=>{let k=P("data",r[0].dataType,r[0].dims.length),I=P("slice_offsets",12,g.dims.length),O=M("output",r[0].dataType,S.length);return`
          ${T.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(k,I,O)}
            ${T.mainStart()}
            ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:S,dataType:o}],dispatchGroup:{x:Math.ceil($/64)},programUniforms:w}),getShaderSource:x},{inputs:[r[0],g]})},Sd=e=>({batchDims:e.batch_dims,cacheKey:""})});var Wf,Lf,Id,Cd,Ad=U(()=>{"use strict";Y();ne();Se();ie();Wf=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=E.normalizeAxis(t.quantizeAxis,e[0].dims.length),n=t.blockSize,o=e[0],i=e[2],a=e.length===4?e[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((u,d)=>d===r?Math.ceil(u/n)===i.dims[d]:u===i.dims[d]).reduce((u,d)=>u&&d,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==i.dims.length||!a.dims.map((u,d)=>u===i.dims[d]).reduce((u,d)=>u&&d,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Lf=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,i=E.normalizeAxis(t.gatherAxis,o),a=E.normalizeAxis(t.quantizeAxis,o),u=r.slice(0);u.splice(i,1,...n);let d=E.size(u),c=e[2].dataType,m=e[0].dataType===22,f=[{type:12,data:d},{type:12,data:a},{type:12,data:i},{type:12,data:t.blockSize},...N(...e.map((g,_)=>g.dims),u)],b=g=>{let _=P("data",e[0].dataType,e[0].dims.length),S=P("inputIndices",e[1].dataType,e[1].dims.length),$=P("scales",e[2].dataType,e[2].dims.length),w=e.length>3?P("zeroPoint",e[3].dataType,e[3].dims.length):void 0,x=M("output",c,u.length),T=[_,S,$];w&&T.push(w);let k=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${g.registerUniforms(k).declareVariables(...T,x)}
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
        ${w?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${w.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${w.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${m?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Ae(c)}(quantized_data - zero_point) * scale;
        ${x.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((g,_)=>_!==1).map(g=>g.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(g,_)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:c}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:f}),getShaderSource:b}},Id=(e,t)=>{let r=e.inputs;Wf(r,t),e.compute(Lf(e.inputs,t))},Cd=e=>X({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})});var Gf,Hf,kd,Ed,Pd=U(()=>{"use strict";Y();ne();Se();ie();Gf=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Hf=(e,t)=>{let r=e[0].dims,n=e[0].dataType,o=r.length,i=e[1].dims,a=e[1].dataType,u=E.normalizeAxis(t.axis,o),d=r[u],c=i.slice(0),p=E.size(c),m=P("input",n,o),f=P("indicesInput",a,i.length),b=M("output",n,c.length),g=[{type:12,data:p},{type:6,data:d},{type:12,data:u}];return g.push(...N(r,i,c)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:g}),getShaderSource:$=>`
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
  }`}},kd=e=>X({axis:e.axis}),Ed=(e,t)=>{let r=e.inputs;Gf(r),e.compute(Hf(e.inputs,t))}});var Ff,qf,Od,zd,Dd=U(()=>{"use strict";Y();ne();ie();Ff=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},qf=(e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[o,i,a]=Br.getShapeOfGemmResult(r,t.transA,n,t.transB,e.length===3?e[2].dims:void 0),u=[o,i];if(!u)throw new Error("Can't use gemm on the given tensors");let d=16,c=Math.ceil(i/d),p=Math.ceil(o/d),m=!0,f=E.size(u),b=[{type:12,data:m?c:f},{type:12,data:o},{type:12,data:i},{type:12,data:a},{type:1,data:t.alpha},{type:1,data:t.beta}],g=["type","type"];e.length===3&&(b.push(...N(e[2].dims)),g.push("rank")),b.push(...N(u));let _=$=>{let w="";t.transA&&t.transB?w="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?w="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?w="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(w="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let x=t.alpha===1?"":"value *= uniforms.alpha;",T=P("a",e[0].dataType,e[0].dims),k=P("b",e[1].dataType,e[1].dims),I=T.type.value,O=null,z=[T,k];e.length===3&&(O=P("c",e[2].dataType,e[2].dims.length),z.push(O));let B=M("output",e[0].dataType,u.length);z.push(B);let W=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${$.registerUniforms(W).declareVariables(...z)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${I}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${w}
    }

    ${x}
    ${O!=null?`let cOffset = ${O.broadcastedIndicesToOffset("vec2(m, n)",B)}; value += ${I}(uniforms.beta) * ${O.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},S=$=>{let w=P("a",e[0].dataType,e[0].dims),x=P("b",e[1].dataType,e[1].dims),T=null,k=[w,x];e.length===3&&(T=P("c",e[2].dataType,e[2].dims.length),k.push(T));let I=M("output",e[0].dataType,u.length);k.push(I);let O=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],z="",B="";t.transA&&t.transB?(B=`
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
        tile_b[local_id.y][local_id.x] = ${x.type.value}(0);
      }
      `,z="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(B=`
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
        tile_b[local_id.y][local_id.x] = ${x.type.value}(0);
      }
      `,z="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(B=`
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
        tile_b[local_id.y][local_id.x] = ${x.type.value}(0);
      }
      `,z="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(B=`
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
        tile_b[local_id.y][local_id.x] = ${x.type.value}(0);
      }
      `,z="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let W=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${$.registerUniforms(O).declareVariables(...k)}
  var<workgroup> tile_a: array<array<${w.type.storage}, ${d}>, ${d}>;
  var<workgroup> tile_b: array<array<${x.type.storage}, ${d}>, ${d}>;
  ${$.mainStart([d,d,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${d};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${d};
    let num_tiles = (uniforms.K - 1) / ${d} + 1;
    var k_start = 0u;
    var value = ${I.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${B}
      k_start = k_start + ${d};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${d}; k++) {
        ${z}
      }
      workgroupBarrier();
    }

    ${W}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${T!=null?`let cOffset = ${T.broadcastedIndicesToOffset("vec2(m, n)",I)}; value += ${I.type.value}(uniforms.beta) * ${T.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return m?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:c*p},programUniforms:b}),getShaderSource:S}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:b}),getShaderSource:_}},Od=e=>{let t=e.transA,r=e.transB,n=e.alpha,o=e.beta;return{transA:t,transB:r,alpha:n,beta:o,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},zd=(e,t)=>{Ff(e.inputs),e.compute(qf(e.inputs,t))}});var dt,$t,Vt,Wt,Kf,jf,Zf,Qf,Yf,Xf,Jf,eh,Bd,Md,Rd=U(()=>{"use strict";Y();ne();Se();ie();[dt,$t,Vt,Wt]=[0,1,2,3],Kf=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},jf=`
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
`,Zf=e=>`
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
`,Qf=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Yf=e=>`
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
`,Xf=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${dt}] = batch;
     indices[${$t}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Vt}] = u32(r);
            indices[${Wt}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${Vt}] = u32(clamp(r, 0, H - 1));
          indices[${Wt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Vt}] = gs_reflect(r, border[1], border[3]);
          indices[${Wt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Jf=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${dt}], indices[${$t}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${dt}], indices[${$t}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${dt}], indices[${$t}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${dt}], indices[${$t}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${dt}], indices[${$t}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${dt}], indices[${$t}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,eh=(e,t)=>{let r=P("x",e[0].dataType,e[0].dims.length),n=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],o=P("grid",e[1].dataType,n.length,2),i=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(i=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[dt,$t,Vt,Wt]=[0,3,1,2]);let a=M("output",e[0].dataType,i.length),u=r.type.value,d=E.size(i),c=[{type:12,data:d},...N(e[0].dims,n,i)],p=m=>`
  ${m.registerUniform("output_size","u32").declareVariables(r,o,a)}
  ${jf}
  ${Zf(u)}
  ${Qf(t)}
  ${Yf(t)}
  ${Xf(r,u,t)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Vt}]);
      let W_in = i32(uniforms.x_shape[${Wt}]);

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
      var grid_indices = vec3<u32>(indices[${dt}], indices[${Vt}], indices[${Wt}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Jf(a,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:m=>{let f=E.size(i);return{outputs:[{dims:i,dataType:m[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:c}},getShaderSource:p}},Bd=(e,t)=>{Kf(e.inputs),e.compute(eh(e.inputs,t))},Md=e=>X({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})});var Be,nh,Nd,Ud,oh,tr,Vd,$o=U(()=>{"use strict";Y();ne();Se();Wr();qr();ie();ut();Be=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,nh=(e,t)=>{let r=e[0],n=Be(e,1),o=Be(e,2),i=Be(e,3),a=Be(e,4),u=Be(e,5),d=Be(e,6),c=Be(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let p=r.dims[0],m=r.dims[1],f=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],b=m,g=0,_=0,S=Math.floor(f/t.numHeads);if(d&&c&&E.size(d.dims)&&E.size(c.dims)){if(d.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==p||d.dims[1]!==t.numHeads||d.dims[3]!==S)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(c.dims[0]!==p||c.dims[1]!==t.numHeads||c.dims[3]!==S)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==c.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(c.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=d.dims[2],_=d.dims[2]}else if(d&&E.size(d.dims)||c&&E.size(c.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(n&&E.size(n.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(n.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,b=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==S)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,b=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==S)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,b=n.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(i&&E.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(n&&n.dims.length===5&&n.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let w=g+b,x=0;if(a&&E.size(a.dims)>0){x=8;let O=a.dims;throw O.length===1?O[0]===p?x=1:O[0]===3*p+2&&(x=3):O.length===2&&O[0]===p&&O[1]===w&&(x=5),x===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let T=!1,k=f;if(o&&E.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(b!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');k=o.dims[2]}else{if(b!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');k=o.dims[1]*o.dims[3],T=!0}}let I=!1;if(a&&E.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(u&&E.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==p||u.dims[1]!==t.numHeads||u.dims[2]!==m||u.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:p,sequenceLength:m,pastSequenceLength:g,kvSequenceLength:b,totalSequenceLength:w,maxSequenceLength:_,inputHiddenSize:0,hiddenSize:f,vHiddenSize:k,headSize:S,vHeadSize:Math.floor(k/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:x,scale:t.scale,broadcastResPosBias:I,passPastInKv:T,qkvFormat:$}},Nd=e=>X({...e}),Ud=X({perm:[0,2,1,3]}),oh=(e,t,r,n,o,i,a)=>{let u=[n,o,i],d=E.size(u),c=[{type:12,data:d},{type:12,data:a},{type:12,data:i}],p=m=>{let f=M("qkv_with_bias",t.dataType,u),b=P("qkv",t.dataType,u),g=P("bias",r.dataType,u),_=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${m.registerUniforms(_).declareVariables(b,g,f)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:p},{inputs:[t,r],outputs:[-1]})[0]},tr=(e,t,r,n,o,i,a,u)=>{let d=i;if(a&&E.size(a.dims)>0){if(n===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return d=oh(e,i,a,t,n,r*o,u),d=d.reshape([t,n,r,o]),r===1||n===1?d:e.compute(ke(d,Ud.perm),{inputs:[d],outputs:[-1]})[0]}else return i.dims.length===3&&(d=i.reshape([t,n,r,o])),r===1||n===1?d:e.compute(ke(d,Ud.perm),{inputs:[d],outputs:[-1]})[0]},Vd=(e,t)=>{let r=nh(e.inputs,t),n=e.inputs[0],o=Be(e.inputs,1),i=Be(e.inputs,2),a=Be(e.inputs,3),u=Be(e.inputs,4),d=Be(e.inputs,5),c=Be(e.inputs,6),p=Be(e.inputs,7);if(n.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let m=o&&i&&o.dims.length===4&&i.dims.length===4,f=tr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,a,0);if(m)return Nt(e,f,o,i,u,void 0,c,p,d,r);if(!o||!i)throw new Error("key and value must be provided");let b=tr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,a,r.hiddenSize),g=tr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,a,2*r.hiddenSize);Nt(e,f,b,g,u,void 0,c,p,d,r)}});var ih,ah,sh,uh,xo,Wd,Ld,So=U(()=>{"use strict";Y();ne();Se();ie();ih=e=>{if(!e||e.length<1)throw new Error("too few inputs")},ah=(e,t)=>{let r=[],n=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(o=>r.push(Number(o))),n=r.length),X({numOutputs:n,axis:t.axis,splitSizes:r})},sh=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${F("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,uh=e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let o=e[n].setByIndices("indices","input[global_idx]");t===1?r.push(o):n===0?r.push(`if (output_number == ${n}u) { ${o} }`):n===t-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${n}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},xo=(e,t)=>{let r=e[0].dims,n=E.size(r),o=e[0].dataType,i=E.normalizeAxis(t.axis,r.length),a=new Array(t.numOutputs),u=P("input",o,r.length),d=new Array(t.numOutputs),c=[],p=[],m=0,f=[{type:12,data:n}];for(let g=0;g<t.numOutputs;g++){m+=t.splitSizes[g],d[g]=m;let _=r.slice();_[i]=t.splitSizes[g],p.push(_),a[g]=M(`output${g}`,o,_.length),c.push({dims:p[g],dataType:e[0].dataType})}f.push({type:12,data:d},...N(r,...p));let b=g=>`
  ${g.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",d.length).declareVariables(u,...a)}
  ${sh(d.length)}
  ${uh(a)}

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
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:c,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:f})}},Wd=(e,t)=>{ih(e.inputs);let r=e.inputs.length===1?t:ah(e.inputs,t);e.compute(xo(e.inputs,r),{inputs:[0]})},Ld=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return X({axis:t,numOutputs:n,splitSizes:r})}});var dh,rn,Gd,To=U(()=>{"use strict";Y();ne();Se();ie();dh=(e,t)=>{let[r,n,o,i]=e,{numHeads:a,rotaryEmbeddingDim:u}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!E.areEqual(n.dims,[])&&!E.areEqual(n.dims,[1])&&n.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!E.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let d=r.dims[0],c=r.dims[r.dims.length-2],p=o.dims[0],m=E.sizeFromDimension(r.dims,1)/c,f=u===0?o.dims[1]*2:m/a;if(u>f)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(n.dims.length===2){if(d!==n.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(c!==n.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(f/2!==o.dims[1]&&u/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(c>p)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},rn=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:o,scale:i}=t,a=e[0].dims[0],u=E.sizeFromDimension(e[0].dims,1),d=e[0].dims[e[0].dims.length-2],c=u/d,p=e[2].dims[1],m=o===0?p*2:c/n,f=new Array(a,d,c/m,m-p),b=E.computeStrides(f),g=[{type:1,data:i},{type:12,data:f},{type:12,data:b},...e[0].dims.length===3?new Array({type:12,data:[u,c,m,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,m,d*m,1]}):[],...N(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],_=S=>{let $=P("input",e[0].dataType,e[0].dims.length),w=P("position_ids",e[1].dataType,e[1].dims.length),x=P("cos_cache",e[2].dataType,e[2].dims.length),T=P("sin_cache",e[3].dataType,e[3].dims.length),k=M("output",e[0].dataType,e[0].dims.length);return S.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:f.length},{name:"global_strides",type:"u32",length:b.length},{name:"input_output_strides",type:"u32",length:b.length}]),`
        ${S.declareVariables($,w,x,T,k)}

        ${S.mainStart(kt)}
          let half_rotary_emb_dim = uniforms.${x.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${w.broadcastedIndicesToOffset("bsnh.xy",M("",w.type.tensor,2))};
            let position_id =
                u32(${w.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${$.getByOffset("i")} * ${x.get("position_id","bsnh[3]")} -
                ${$.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${k.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${x.get("position_id","bsnh[3]")};
            ${k.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${k.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:X({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(E.size(f)/kt)},programUniforms:g})}},Gd=(e,t)=>{dh(e.inputs,t),e.compute(rn(e.inputs,t))}});var lh,ch,Hd,ph,Fd,qd=U(()=>{"use strict";Se();Y();qr();$o();So();ut();To();ie();lh=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],n=e[1],o=e[2],i=e[3],a=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,d=r.dims[0],c=r.dims[1],p=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],m=c,f=0,b=!n||n.dims.length===0,g=Math.floor(b?p/(t.numHeads+2*t.kvNumHeads):p/t.numHeads);b&&(p=g*t.numHeads);let _=i&&i.dims.length!==0,S=a&&a.dims.length!==0;if(_&&i.dims.length===4&&i.dims[0]===d&&i.dims[1]!==t.kvNumHeads&&i.dims[2]===t.kvNumHeads&&i.dims[3]===g)throw new Error("BSNH pastKey/pastValue is not supported");if(_&&S){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');f=i.dims[2]}else if(_||S)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let w=1;if(n&&n.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(r.dims[2]%n.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');m=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==g)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');m=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==g)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');m=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');w=3}let x=0,T=!1,k=t.kvNumHeads?g*t.kvNumHeads:p;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(m!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');k=o.dims[2]}else{if(m!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');k=o.dims[1]*o.dims[3],T=!0}}let I=e.length>4?e[5]:void 0;if(I&&I.dims.length!==1&&I.dims[0]!==d)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:d,sequenceLength:c,pastSequenceLength:f,kvSequenceLength:m,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:p,vHiddenSize:k,headSize:g,vHeadSize:Math.floor(k/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:x,scale:t.scale,broadcastResPosBias:!1,passPastInKv:T,qkvFormat:w}},ch=X({perm:[0,2,1,3]}),Hd=(e,t,r)=>{let n=t,o=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(n=t.reshape([r.batchSize,r.kvSequenceLength,o,r.headSize]),n=e.compute(ke(n,ch.perm),{inputs:[n],outputs:[-1]})[0]),n},ph=(e,t,r,n)=>{let o=7,i=["type","type"],a=[e*t],u=e*t,d=[{type:12,data:u},{type:12,data:t},{type:12,data:e}],c=p=>{let m=P("seq_lens",r.dataType,r.dims),f=P("total_seq_lens",n.dataType,n.dims),b=M("pos_ids",o,a),g=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
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
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:i},getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:c}},Fd=(e,t)=>{let r=lh(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let n=e.inputs[0],o=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,i=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,a=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,u=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,d=e.inputs.length>4?e.inputs[5]:void 0,c=e.inputs.length>5?e.inputs[6]:void 0,p=r.kvNumHeads?r.kvNumHeads:r.numHeads,m=X({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,p*r.headSize,p*r.headSize]}),[f,b,g]=!o&&!i?e.compute(xo([n],m),{inputs:[n],outputs:[-1,-1,-1]}):[n,o,i],_,S;if(t.doRotary){let T=e.compute(ph(r.batchSize,r.sequenceLength,d,c),{inputs:[d,c],outputs:[-1]})[0],k=e.inputs[7],I=e.inputs[8],O=X({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),z=[f,T,k,I],B=[-1];_=e.compute(rn(z,O),{inputs:z,outputs:B})[0],z.splice(0,1,b);let W=X({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});S=e.compute(rn(z,W),{inputs:z,outputs:B})[0]}let $=tr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?_:f,void 0,0),w=Hd(e,t.doRotary?S:b,r),x=Hd(e,g,r);Nt(e,$,w,x,void 0,void 0,a,u,void 0,r,d,c)}});var Kd,mh,fh,jd,Zd=U(()=>{"use strict";Y();ne();ut();ie();Kd=(e,t,r,n,o,i,a,u)=>{let d=me(i),c=d===1?"f32":`vec${d}f`,p=d===1?"vec2f":`mat2x${d}f`,m=o*a,f=64;m===1&&(f=256);let b=[o,a,i/d],g=[o,a,2],_=["rank","type","type"],S=[];S.push(...N(b,g));let $=w=>{let x=P("x",t.dataType,3,d),T=P("scale",r.dataType,r.dims),k=P("bias",n.dataType,n.dims),I=M("output",1,3,2),O=[x,T,k,I];return`
  var<workgroup> workgroup_shared : array<${p}, ${f}>;
  const workgroup_size = ${f}u;
  ${w.declareVariables(...O)}
  ${w.mainStart(f)}
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
      let sum_final = ${Fe("workgroup_shared[0][0]",d)} / f32(hight * ${d});
      let squared_sum_final = ${Fe("workgroup_shared[0][1]",d)} / f32(hight * ${d});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${d};${u};${f}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:g,dataType:1}],dispatchGroup:{x:m},programUniforms:S}),getShaderSource:$},{inputs:[t,r,n],outputs:[-1]})[0]},mh=(e,t,r)=>{let n=t[0].dims,o=n,i=2,a=n[0],u=n[1],d=E.sizeFromDimension(n,i),c=me(d),p=E.size(o)/c,m=Kd(e,t[0],t[1],t[2],a,d,u,r.epsilon),f=[a,u,d/c],b=[a,u],g=["type","none"],_=S=>{let $=P("x",t[0].dataType,f.length,c),w=P("scale_shift",1,b.length,2),x=M("output",t[0].dataType,f.length,c),T=[$,w,x];return`
  ${S.registerUniform("output_size","u32").declareVariables(...T)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${x.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${w.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${x.type.value}(scale_shift.x) + ${x.type.value}(scale_shift.y);
      ${x.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${c}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},...N(f,b,f)]}),getShaderSource:_},{inputs:[t[0],m]})},fh=(e,t,r)=>{let n=t[0].dims,o=n,i=n[0],a=n[n.length-1],u=E.sizeFromDimension(n,1)/a,d=me(a),c=E.size(o)/d,p=[{type:12,data:u},{type:12,data:Math.floor(a/d)}],m=["type","type"],f=!1,b=[0,n.length-1];for(let $=0;$<n.length-2;$++)f=f||n[$+1]!==1,b.push($+1);f=f&&n[n.length-1]!==1;let g=f?e.compute(ke(e.inputs[0],b),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:n.length},($,w)=>n[b[w]])),_=Kd(e,g,t[1],t[2],i,u,a,r.epsilon),S=$=>{let w=ye(t[0].dataType),x=d===1?"vec2f":`mat${d}x2f`,T=O=>{let z=O===0?"x":"y",B=d===1?"f32":`vec${d}f`;switch(d){case 1:return`${w}(${B}(scale.${z}))`;case 2:return`vec2<${w}>(${B}(scale[0].${z}, scale[1].${z}))`;case 4:return`vec4<${w}>(${B}(scale[0].${z}, scale[1].${z}, scale[2].${z}, scale[3].${z}))`;default:throw new Error(`Not supported compoents ${d}`)}},k=P("input",t[0].dataType,t[0].dims,d),I=M("output",t[0].dataType,o,d);return`
  @group(0) @binding(0) var<storage, read> input : array<${k.type.storage}>;
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
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${d}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:p}),getShaderSource:S},{inputs:[t[0],_]})},jd=(e,t)=>{t.format==="NHWC"?fh(e,e.inputs,t):mh(e,e.inputs,t)}});var hh,gh,Qd,Yd=U(()=>{"use strict";Y();ne();ie();hh=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},gh=(e,t,r)=>{let n=t.simplified,o=e[0].dims,i=e[1],a=!n&&e[2],u=o,d=E.normalizeAxis(t.axis,o.length),c=E.sizeToDimension(o,d),p=E.sizeFromDimension(o,d),m=E.size(i.dims),f=a?E.size(a.dims):0;if(m!==p||a&&f!==p)throw new Error(`Size of X.shape()[axis:] == ${p}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${m} and bias size of ${f}`);let b=[];for(let k=0;k<o.length;++k)k<d?b.push(o[k]):b.push(1);let g=me(p),_=["type","type"],S=[{type:12,data:c},{type:1,data:p},{type:12,data:Math.floor(p/g)},{type:1,data:t.epsilon}];a&&_.push("type");let $=r>1,w=r>2,x=k=>{let I=ye(e[0].dataType),O=[P("x",e[0].dataType,e[0].dims,g),P("scale",i.dataType,i.dims,g)];a&&O.push(P("bias",a.dataType,a.dims,g)),O.push(M("output",e[0].dataType,u,g)),$&&O.push(M("mean_data_output",1,b)),w&&O.push(M("inv_std_output",1,b));let z=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${k.registerUniforms(z).declareVariables(...O)}
  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${ao("f32",g)};
    var mean_square_vector = ${ao("f32",g)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Et(I,g,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Fe("mean_vector",g)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Fe("mean_square_vector",g)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Et(I,g,"x[j + offset]")};
      let f32scale = ${Et(I,g,"scale[j]")};
      output[j + offset] = ${O[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${Et(I,g,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${w?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},T=[{dims:u,dataType:e[0].dataType}];return $&&T.push({dims:b,dataType:1}),w&&T.push({dims:b,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${g};${r};${n}`,inputDependencies:_},getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(c/64)},programUniforms:S}),getShaderSource:x}},Qd=(e,t)=>{hh(e.inputs),e.compute(gh(e.inputs,t,e.outputCount))}});var bh,Xd,Jd=U(()=>{"use strict";ne();Xr();Jr();bh=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Xd=e=>{bh(e.inputs);let t=et.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&n<8)e.compute(Yr(e.inputs,{activation:""},t));else{let o=t[t.length-2],i=E.size(e.inputs[0].dims.slice(0,-2)),a=E.size(e.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&a===1){let u=e.inputs[0].reshape([1,i,n]),d=e.inputs[1].reshape([1,n,r]),c=[1,i,r],p=[u,d];e.compute(er(p,{activation:""},t,c),{inputs:p})}else e.compute(er(e.inputs,{activation:""},t))}}});var yh,_h,wh,el,tl,rl=U(()=>{"use strict";Y();ne();Se();ie();yh=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),i=t.blockSize/8*t.bits,a=e[1];if(!E.areEqual(a.dims,[t.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let d=e[2].dims;if(E.size(d)!==t.n*o)throw new Error("scales input size error.");if(e.length===4){let p=e[3].dims,m=t.bits>4?t.n*o:t.n*Math.floor((o+1)/2);if(E.size(p)!==m)throw new Error("zeroPoints input size error.")}},_h=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],i=t.k,a=t.n,u=r.slice(0,n-2),d=E.size(u),p=e[1].dims[2]/4,m=e[0].dataType,f=me(t.k),b=me(p),g=me(a),_=u.concat([o,a]),S=o>1&&a/g%2===0?2:1,$=E.size(_)/g/S,w=64,x=[],T=[d,o,i/f],k=E.convertShape(e[1].dims).slice();k.splice(-1,1,p/b),x.push(...N(T)),x.push(...N(k)),x.push(...N(e[2].dims)),e.length===4&&x.push(...N(E.convertShape(e[3].dims)));let I=[d,o,a/g];x.push(...N(I));let O=z=>{let B=T.length,W=P("a",e[0].dataType,B,f),q=P("b",12,k.length,b),j=P("scales",e[2].dataType,e[2].dims.length),te=[W,q,j],V=e.length===4?P("zero_points",12,e[3].dims.length):void 0;V&&te.push(V);let de=I.length,J=M("output",e[0].dataType,de,g),H=ye(e[0].dataType),ae=(()=>{switch(f){case 1:return`array<${H}, 8>`;case 2:return`mat4x2<${H}>`;case 4:return`mat2x4<${H}>`;default:throw new Error(`${f}-component is not supported.`)}})(),Z=()=>{let _e=`
          // reuse a data
            var input_offset = ${W.indicesToOffset(`${W.type.indices}(batch, row, word_offset)`)};
            var a_data: ${ae};
            for (var j: u32 = 0; j < ${8/f}; j++) {
              a_data[j] = ${W.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let ee=0;ee<g*S;ee++)_e+=`
            b_value = ${b===1?`b${ee}_data`:`b${ee}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${ae}(${Array.from({length:4},(C,L)=>`${H}(b_value_lower[${L}]), ${H}(b_value_upper[${L}])`).join(", ")});
            b_dequantized_values = ${f===1?`${ae}(${Array.from({length:8},(C,L)=>`(b_quantized_values[${L}] - ${V?`zero_point${ee}`:"zero_point"}) * scale${ee}`).join(", ")});`:`(b_quantized_values - ${ae}(${Array(8).fill(`${V?`zero_point${ee}`:"zero_point"}`).join(",")})) * scale${ee};`};
            workgroup_shared[local_id.x * ${S} + ${Math.floor(ee/g)}]${g>1?`[${ee%g}]`:""} += ${Array.from({length:8/f},(C,L)=>`${f===1?`a_data[${L}] * b_dequantized_values[${L}]`:`dot(a_data[${L}], b_dequantized_values[${L}])`}`).join(" + ")};
          `;return _e},re=()=>{let _e=`
            var col_index = col * ${g};
            ${V?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${H}(8);`}
            `;for(let ee=0;ee<g*S;ee++)_e+=`
            let scale${ee} = ${j.getByOffset("col_index * nBlocksPerCol + block")};
            ${V?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${V.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${ee} = ${H}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return _e},ve=()=>{let _e=`col_index = col * ${g};`;for(let ee=0;ee<g*S;ee++)_e+=`
            let b${ee}_data = ${q.getByIndices(`${q.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return _e+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ae};
            var b_dequantized_values: ${ae};`,_e};return`
        var<workgroup> workgroup_shared: array<${J.type.value}, ${S*w}>;
        ${z.declareVariables(...te,J)}
        ${z.mainStart([w,1,1])}
          let output_indices = ${J.offsetToIndices(`(global_idx / ${w}) * ${S}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${w}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/f};
            ${re()}
            for (var word: u32 = 0; word < ${p}; word += ${b}) {
              ${ve()}
              for (var i: u32 = 0; i < ${b}; i++) {
                ${Z()}
                word_offset += ${8/f};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${S}) {
            var output_value: ${J.type.value} = ${J.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${w}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${S};
            }
            ${J.setByIndices(`${J.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${f};${b};${g};${S};${w}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:m}],dispatchGroup:{x:$},programUniforms:x}),getShaderSource:O}},wh=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],i=t.k,a=t.n,u=r.slice(0,n-2),d=E.size(u),p=e[1].dims[2]/4,m=e[0].dataType,f=me(t.k),b=me(p),g=u.concat([o,a]),_=128,S=a%8===0?8:a%4===0?4:1,$=_/S,w=$*b*8,x=w/f,T=w/t.blockSize,k=E.size(g)/S,I=[],O=[d,o,i/f],z=E.convertShape(e[1].dims).slice();z.splice(-1,1,p/b),I.push(...N(O)),I.push(...N(z)),I.push(...N(e[2].dims)),e.length===4&&I.push(...N(E.convertShape(e[3].dims)));let B=[d,o,a];I.push(...N(B));let W=q=>{let j=O.length,te=P("a",e[0].dataType,j,f),V=P("b",12,z.length,b),de=P("scales",e[2].dataType,e[2].dims.length),J=[te,V,de],H=e.length===4?P("zero_points",12,e[3].dims.length):void 0;H&&J.push(H);let ae=B.length,Z=M("output",e[0].dataType,ae),re=ye(e[0].dataType),ve=()=>{switch(f){case 1:return`
          let a_data0 = vec4<${re}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${re}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${re}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${re}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${f}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${te.type.value}, ${x}>;
        var<workgroup> inter_results: array<array<${Z.type.value}, ${$}>, ${S}>;
        ${q.declareVariables(...J,Z)}
        ${q.mainStart([$,S,1])}
          let output_indices = ${Z.offsetToIndices(`workgroup_index * ${S}`)};
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
                sub_a[a_offset] = ${te.getByIndices(`${te.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${te.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${T} + local_id.x;
            ${H?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${H.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${re}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${re}(8);`}
            let scale = ${de.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${V.getByIndices(`${V.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/f};
            for (var i: u32 = 0; i < ${b}; i++) {
              ${ve()}
              let b_value = ${b===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${re}>(${Array.from({length:4},(_e,ee)=>`${re}(b_value_lower[${ee}]), ${re}(b_value_upper[${ee}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${re}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(_e,ee)=>`${`dot(a_data${ee}, b_dequantized_values[${ee}])`}`).join(" + ")};
              word_offset += ${8/f};
            }
            workgroupBarrier();
          }

          if (local_idx < ${S}) {
            var output_value: ${Z.type.value} = ${Z.type.value}(0);
            for (var b = 0u; b < ${$}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${Z.setByIndices(`${Z.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${f};${b};${$};${S}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:g,dataType:m}],dispatchGroup:{x:k},programUniforms:I}),getShaderSource:W}},el=(e,t)=>{yh(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(wh(e.inputs,t)):e.compute(_h(e.inputs,t))},tl=e=>X(e)});var vh,$h,xh,Sh,Th,Ih,Ch,Ah,nl,ol=U(()=>{"use strict";Y();ne();ie();vh=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},$h=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
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
      `},xh=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
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
          `},Sh=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
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
          `},Th=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
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
          `},Ih=(e,t,r)=>{switch(r.mode){case 0:return $h(e,t,r.pads.length);case 1:return xh(e,t,r.pads.length);case 2:return Sh(e,t,r.pads.length);case 3:return Th(e,t,r.pads.length);default:throw new Error("Invalid mode")}},Ch=(e,t)=>{let r=E.padShape(e[0].dims.slice(),t.pads),n=e[0].dims,o=E.size(r),i=[{type:12,data:o},{type:6,data:t.pads}],a=e.length>=3&&e[2].data;t.mode===0&&i.push({type:a?e[2].dataType:1,data:t.value}),i.push(...N(e[0].dims,r));let u=["rank"],d=c=>{let p=M("output",e[0].dataType,r.length),m=P("x",e[0].dataType,n.length),f=m.type.value,b=Ih(p,n.length,t),g=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&g.push({name:"constant_value",type:a?f:"f32"}),`
            ${c.registerUniforms(g).declareVariables(m,p)}
            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${p.offsetToIndices("global_idx")};

            var value = ${f}(0);
            ${b}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${a}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(E.size(r)/64)},programUniforms:i}),getShaderSource:d}},Ah=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,o=e[0].dims.length,i=new Int32Array(2*o).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let d=0;d<u.length;d++)i[Number(u[d])]=Number(r[d]),i[Number(u[d])+o]=Number(r[d+u.length])}else r.forEach((u,d)=>i[Number(d)]=Number(u));let a=[];return i.forEach(u=>a.push(u)),{mode:t.mode,value:n,pads:a}}else return t},nl=(e,t)=>{vh(e.inputs);let r=Ah(e.inputs,t);e.compute(Ch(e.inputs,r),{inputs:[0]})}});var nn,il,al,sl,ul,kh,Eh,dl,ll,cl,pl,ml,fl,hl,gl,bl,yl,_l,wl,vl=U(()=>{"use strict";We();Y();ne();ie();nn=e=>{if(be.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},il=(e,t,r)=>{let n=t.format==="NHWC",o=e.dims.slice();n&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(t,"dilations"),a=t.kernelShape.slice(),u=t.strides.slice(),d=i?t.dilations.slice():[],c=t.pads.slice();At.adjustPoolAttributes(r,o,a,u,d,c);let p=At.computePoolOutputShape(r,o,u,d,a,c,t.autoPad),m=Object.assign({},t);i?Object.assign(m,{kernelShape:a,strides:u,pads:c,dilations:d,cacheKey:t.cacheKey}):Object.assign(m,{kernelShape:a,strides:u,pads:c,cacheKey:t.cacheKey});let f=p.slice();return f.push(f.splice(1,1)[0]),[m,n?f:p]},al=(e,t)=>{let r=t.format==="NHWC",n=E.size(e),o=E.size(t.kernelShape),i=[{type:12,data:n},{type:12,data:o}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],d=t.strides[t.strides.length-1],c=t.pads[t.pads.length/2-1],p=t.pads[t.pads.length-1],m=!!(c+p);i.push({type:12,data:u},{type:12,data:d},{type:12,data:c},{type:12,data:p}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let f=!1;if(t.kernelShape.length===2){let b=t.kernelShape[t.kernelShape.length-2],g=t.strides[t.strides.length-2],_=t.pads[t.pads.length/2-2],S=t.pads[t.pads.length-2];f=!!(_+S),i.push({type:12,data:b},{type:12,data:g},{type:12,data:_},{type:12,data:S}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,m,f]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=E.computeStrides(t.kernelShape);i.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),a.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let d=t.pads.reduce((c,p)=>c+p);return[i,a,!!d,!1,!1]}},sl=(e,t,r,n,o,i,a,u,d,c,p,m)=>{let f=o.format==="NHWC",b=t.type.value,g=M("output",t.type.tensor,n);if(o.kernelShape.length<=2){let _="",S="",$="",w=r-(f?2:1);if(p?_=`
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
            }`}},ul=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,kh=e=>`${ul(e)};${e.countIncludePad}`,Eh=e=>`${ul(e)};${e.storageOrder};${e.dilations}`,dl=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),ll=(e,t,r,n)=>{let[o,i]=il(t,n,r),a=P("x",t.dataType,t.dims.length),u=a.type.value,d="value += x_val;",c="";o.countIncludePad?c+=`value /= ${u}(uniforms.kernelSize);`:c+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[p,m,f,b,g]=al(i,o);p.push(...N(t.dims,i));let _=["rank"];return{name:e,shaderCache:{hint:`${n.cacheKey};${f};${b};${g}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(E.size(i)/64)},programUniforms:p}),getShaderSource:S=>sl(S,a,t.dims.length,i.length,o,d,c,0,m,f,b,g)}},cl=e=>{let t=e.count_include_pad!==0,r=dl(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:t,...r,cacheKey:""};return{...n,cacheKey:kh(n)}},pl=(e,t)=>{nn(e.inputs),e.compute(ll("AveragePool",e.inputs[0],!1,t))},ml={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},fl=e=>{let t=e.format;return{format:t,...ml,cacheKey:t}},hl=(e,t)=>{nn(e.inputs),e.compute(ll("GlobalAveragePool",e.inputs[0],!0,t))},gl=(e,t,r,n)=>{let[o,i]=il(t,n,r),a=`
      value = max(x_val, value);
    `,u="",d=P("x",t.dataType,t.dims.length),c=["rank"],[p,m,f,b,g]=al(i,o);return p.push(...N(t.dims,i)),{name:e,shaderCache:{hint:`${n.cacheKey};${f};${b};${g}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(E.size(i)/64)},programUniforms:p}),getShaderSource:_=>sl(_,d,t.dims.length,i.length,o,a,u,t.dataType===10?-65504:-1e5,m,f,b,g)}},bl=(e,t)=>{nn(e.inputs),e.compute(gl("MaxPool",e.inputs[0],!1,t))},yl=e=>{let t=e.storage_order,r=e.dilations,n=dl(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:r,...n,cacheKey:""};return{...o,cacheKey:Eh(o)}},_l=e=>{let t=e.format;return{format:t,...ml,cacheKey:t}},wl=(e,t)=>{nn(e.inputs),e.compute(gl("GlobalMaxPool",e.inputs[0],!0,t))}});var Oh,zh,$l,xl,Sl=U(()=>{"use strict";Y();ne();Se();ie();Oh=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,n)=>r===e[2].dims[n]).reduce((r,n)=>r&&n,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((o,i)=>i===t.axis||o===e[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],n=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/n)||t.blockSize>Math.ceil(r/(n-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},zh=(e,t)=>{let r=E.normalizeAxis(t.axis,e[0].dims.length),n=e[0].dataType,o=n===3,i=e[0].dims,a=e[1].dataType,u=E.size(i),d=n===3||n===2,c=d?[Math.ceil(E.size(e[0].dims)/4)]:e[0].dims,p=e[1].dims,m=e.length>2?e[2]:void 0,f=m?d?[Math.ceil(E.size(m.dims)/4)]:m.dims:void 0,b=p.length===0||p.length===1&&p[0]===1,g=b===!1&&p.length===1,_=me(u),S=b&&(!d||_===4),$=S?_:1,w=S&&!d?_:1,x=P("input",d?12:n,c.length,w),T=P("scale",a,p.length),k=m?P("zero_point",d?12:n,f.length):void 0,I=M("output",a,i.length,$),O=[x,T];k&&O.push(k);let z=[c,p];m&&z.push(f);let B=[{type:12,data:u/$},{type:12,data:r},{type:12,data:t.blockSize},...N(...z,i)],W=q=>{let j=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${q.registerUniforms(j).declareVariables(...O,I)}
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
          ${k?b?d?`
                let zero_point_input = ${k.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${k.getByOffset("0")}`:g?d?`
                let zero_point_index = ${I.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${k.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${I.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${k.getByOffset("zero_point_index")};`:d?`
                let zero_point_offset = ${T.indicesToOffset("scale_indices")};
                let zero_point_input = ${k.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${k.getByIndices("scale_indices")};`:`let zero_point_value = ${d?o?"i32":"u32":x.type.value}(0);`};
      // Compute and write output
      ${I.setByOffset("global_idx",`${I.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:k?["rank","rank","rank"]:["rank","rank"]},getShaderSource:W,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(u/$/64),y:1,z:1},programUniforms:B})}},$l=(e,t)=>{Oh(e.inputs,t),e.compute(zh(e.inputs,t))},xl=e=>X({axis:e.axis,blockSize:e.blockSize})});var Dh,Bh,Tl,Il=U(()=>{"use strict";We();Y();ie();Dh=(e,t,r)=>{let n=e===t,o=e<t&&r<0,i=e>t&&r>0;if(n||o||i)throw new Error("Range these inputs' contents are invalid.")},Bh=(e,t,r,n)=>{let o=Math.abs(Math.ceil((t-e)/r)),i=[o],a=o,u=[{type:12,data:a},{type:n,data:e},{type:n,data:r},...N(i)],d=c=>{let p=M("output",n,i.length),m=p.type.value,f=[{name:"outputSize",type:"u32"},{name:"start",type:m},{name:"delta",type:m}];return`
        ${c.registerUniforms(f).declareVariables(p)}
        ${c.mainStart()}
        ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${m}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:d,getRunData:()=>({outputs:[{dims:i,dataType:n}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:u})}},Tl=e=>{let t=0,r=0,n=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],n=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],n=e.inputs[2].getFloat32Array()[0]),be.webgpu.validateInputContent&&Dh(t,r,n),e.compute(Bh(t,r,n,e.inputs[0].dataType),{inputs:[]})}});var Mh,Cl,Al,Rh,kl,El,Pl=U(()=>{"use strict";Y();ne();Se();ie();Mh=(e,t,r,n)=>{if(e!=="none"&&n!=="i32"&&n!=="u32"&&n!=="f32")throw new Error(`Input ${n} is not supported with reduction ${e}.`);let o=`{
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
                ${o}max(bitcast<f32>(oldValue), (${r}))${i}`;case"min":return n==="i32"||n==="u32"?`atomicMin(&${t}, bitcast<${n}>(${r}));`:`${o}min(bitcast<${n}>(oldValue), (${r}))${i}`;case"mul":return`${o}(bitcast<${n}>(oldValue) * (${r}))${i}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Cl=(e,t)=>`${e===1?`
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
    data_offset += u32((u32(index) * element_count_dim));`,Al=(e,t,r)=>`for (var i = 0u; i < uniforms.num_updates_elements; i++) {
        let value = updates[uniforms.num_updates_elements * ${r?"global_idx":"idx"} + i];
        ${Mh(e.reduction,"output[data_offset + i]","value",t)}
      }`,Rh=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r,i=1,a=Math.ceil(E.size(n)/i),u=n[n.length-1],d=E.sizeFromDimension(r,u),c=E.sizeFromDimension(n,0)/u,p=[{type:12,data:a},{type:12,data:u},{type:12,data:d},...N(e[1].dims,e[2].dims,o)],m=f=>{let b=P("indices",e[1].dataType,e[1].dims.length),g=P("updates",e[2].dataType,e[2].dims.length,i),_=t.reduction!=="none"&&t.reduction!==""?ts("output",e[0].dataType,o.length):M("output",e[0].dataType,o.length,i);return`
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
        ${Cl(r.length,!1)}
      }
      ${Al(t,_.type.value,!1)}
    }
    return;
  }

  var data_offset = 0u;
  var indices_start = uniforms.last_index_dimension * global_idx;
  var indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${Cl(r.length,!0)}
  }
  ${Al(t,_.type.value,!0)}
  }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:p}),getShaderSource:m}},kl=e=>X({reduction:e.reduction}),El=(e,t)=>{e.compute(Rh(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}});var Uh,Nh,Vh,Ol,Wh,Lh,Gh,Hh,Fh,qh,Kh,jh,zl,Zh,Qh,Yh,Xh,Jh,Dl,Bl,Ml=U(()=>{"use strict";Y();ne();Se();ie();Uh=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Nh=(e,t,r)=>{t.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let n=new Array(r).fill(1);return t.forEach((o,i)=>n[o]=e[i]),n},Vh=(e,t,r,n,o,i)=>{let[a,u,d]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],c=e[0].dims.length;if(a>0&&e.length>a&&e[a].dims.length>0)e[a].getFloat32Array().forEach(p=>i.push(p));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(p=>n.push(p)),n.length!==0&&n.length!==c&&r>=18&&n.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Uh(n,t),t.axes.length>0&&Nh(n,t.axes,c).forEach((p,m)=>n[m]=p)}if(d>0&&e.length>d&&e[d].dims.length===1&&e[d].dims[0]>0&&(e[d].getBigInt64Array().forEach(p=>o.push(Number(p))),o.length!==0&&o.length!==c&&r>=18&&o.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof n<"u"&&typeof o<"u"&&n.length>0&&o.length>c)throw new Error("Resize requires only of scales or sizes to be specified")},Ol=(e,t,r,n)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${n}(big / (${r}));
  let fract = ${n}(big % (${r})) / ${n}(${r});
  return whole + fract;
`,Wh=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Ol("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Ol("xResized","lengthOriginal - 1","lengthResized - 1",t)}
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Lh=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Gh=(e,t,r)=>{let n=new Array(r).fill(0).concat(new Array(r).fill(1)),o=e.length===0?n:e.slice();return t.length>0?(t.forEach((i,a)=>{n[i]=o[a],n[a+r]=o[t.length+a]}),n):o},Hh=(e,t,r,n)=>{let o=[];if(r.length>0)if(n.length>0){if(e.forEach(i=>o.push(i)),Math.max(...n)>e.length)throw new Error("axes is out of bound");n.forEach((i,a)=>o[i]=r[a])}else r.forEach(i=>o.push(i));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");o=e.map((i,a)=>Math.round(i*t[a]))}return o},Fh=(e,t,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>t[i]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>t[i]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return r.axes.length>0?(r.axes.forEach(i=>t[i]=n),r.axes.forEach(i=>o[i]=Math.round(e[i]*t[i]))):(t.fill(n,0,t.length),o.forEach((i,a)=>o[a]=Math.round(i*t[a]))),o},qh=(e,t,r,n,o)=>`
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
    }`,Kh=(e,t,r,n,o,i,a)=>`
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
    }`,jh=(e,t)=>`
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
`:"",Zh=(e,t,r,n,o)=>{let[a,u,d,c]=r.length===2?[-1,0,1,-1]:[0,2,3,1],p=e.type.value;return`
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
    }`},Qh=(e,t,r,n,o,i,a,u,d,c)=>{let p=r.length===2,m=!0,[f,b]=p?[0,1]:m?[2,3]:[1,2],g=e.type.value,_=S=>{let $=S===f?"row":"col";return`
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
    `},Yh=(e,t,r,n,o)=>{let[a,u,d,c,p]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],m=e.type.value;return`
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
    }`},Xh=(e,t,r,n,o,i)=>{let a=e.dims,u=Gh(i,t.axes,a.length),d=Hh(a,n,o,t.axes),c=n.slice();n.length===0&&(c=a.map((w,x)=>w===0?1:d[x]/w),t.keepAspectRatioPolicy!=="stretch"&&(d=Fh(a,c,t)));let p=M("output",e.dataType,d.length),m=P("input",e.dataType,a.length),f=E.size(d),b=a.length===d.length&&a.every((w,x)=>w===d[x]),g=t.coordinateTransformMode==="tf_crop_and_resize",_=t.extrapolationValue,S=m.type.value,$=w=>`
      ${b?"":`
      ${Wh(t.coordinateTransformMode,S)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${jh(m,a)};
              ${Lh(t.nearestMode,r,S)};
              ${Kh(m,p,a,d,c.length,u.length,g)};
              `;case"linear":return`
              ${qh(p,a,d,c.length,u.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${Zh(m,p,a,g,_)}`;if(a.length===3||a.length===5)return`${Yh(m,p,a,g,_)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${Qh(m,p,a,d,c,u,t.cubicCoeffA,g,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${w.registerUniform("output_size","u32").registerUniform("scales","f32",c.length).registerUniform("roi","f32",u.length).declareVariables(m,p)}
      ${w.mainStart()}
        ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${c.length>0?t.mode==="cubic"?c:c.length:""}|${o.length>0?o:""}|${u.length>0?u:""}|${b}|${t.mode==="nearest"?a.length:a}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:d,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},{type:1,data:c},{type:1,data:u},...N(a,d)]})}},Jh=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},Dl=(e,t)=>{let r=[],n=[],o=[],i=Jh(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Vh(e.inputs,t,i,r,n,o),e.compute(Xh(e.inputs[0],t,i,r,n,o),{inputs:[0]})},Bl=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,o=e.cubicCoeffA,i=e.excludeOutside!==0,a=e.extrapolationValue,u=e.keepAspectRatioPolicy,d=e.mode,c=e.nearestMode===""?"simple":e.nearestMode;return X({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:o,excludeOutside:i,extrapolationValue:a,keepAspectRatioPolicy:u,mode:d,nearestMode:c})}});var eg,tg,Rl,Ul=U(()=>{"use strict";Y();ne();ie();eg=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],i=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(n.dims.length!==1)throw new Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let a=e[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let a=e[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},tg=(e,t,r,n)=>{let o=t.simplified,i=e[0].dims,a=E.size(i),u=i,d=a,c=i.slice(-1)[0],p=n?i.slice(0,-1).concat(1):[],m=!o&&e.length>3,f=e.length>4,b=n&&r>1,g=n&&r>2,_=r>3,S=64,$=me(c),w=[{type:12,data:d},{type:12,data:$},{type:12,data:c},{type:1,data:t.epsilon}],x=k=>{let I=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],O=[P("x",e[0].dataType,e[0].dims,$),P("skip",e[1].dataType,e[1].dims,$),P("gamma",e[2].dataType,e[2].dims,$)];m&&O.push(P("beta",e[3].dataType,e[3].dims,$)),f&&O.push(P("bias",e[4].dataType,e[4].dims,$)),O.push(M("output",e[0].dataType,u,$)),b&&O.push(M("mean_output",1,p)),g&&O.push(M("inv_std_output",1,p)),_&&O.push(M("input_skip_bias_sum",e[0].dataType,u,$));let z=ye(e[0].dataType),B=ye(1,$);return`

      ${k.registerUniforms(I).declareVariables(...O)}
      var<workgroup> sum_shared : array<${B}, ${S}>;
      var<workgroup> sum_squared_shared : array<${B}, ${S}>;

      ${k.mainStart([S,1,1])}
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
          let bias_value = ${f?"bias[offset1d + i]":z+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${_?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Et(z,$,"value")};
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
        let mean = ${Fe("sum",$)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Fe("square_sum",$)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${b?"mean_output[global_idx] = mean;":""}
        ${g?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${z}(mean)`}) *
            ${z}(inv_std_dev) * gamma[offset1d + i]
            ${m?"+ beta[offset1d + i]":""};
        }
      }`},T=[{dims:u,dataType:e[0].dataType}];return r>1&&T.push({dims:p,dataType:1}),r>2&&T.push({dims:p,dataType:1}),r>3&&T.push({dims:i,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${b};${g};${_}`,inputDependencies:e.map((k,I)=>"type")},getShaderSource:x,getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(d/c)},programUniforms:w})}},Rl=(e,t)=>{eg(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(tg(e.inputs,t,e.outputCount,!1),{outputs:n})}});var rg,on,ng,Nl,og,ig,Vl,Wl,Ll=U(()=>{"use strict";Y();ne();Se();ie();rg=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw new Error(`Input ${n} must be an array of int32 or int64`)})},on=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(n=>r.push(Number(n)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(n=>r.push(Number(n)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},ng=(e,t)=>{if(e.length>1){let r=on(e,1),n=on(e,2),o=on(e,3);return o.length===0&&(o=[...Array(e[0].dims.length).keys()]),X({starts:r,ends:n,axes:o})}else return t},Nl=(e,t,r,n,o)=>{let i=e;return e<0&&(i+=r[n[t]]),o[t]<0?Math.max(0,Math.min(i,r[n[t]]-1)):Math.max(0,Math.min(i,r[n[t]]))},og=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
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
      }`,ig=(e,t)=>{let r=e[0].dims,n=E.size(r),o=t.axes.length>0?E.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],i=on(e,4);i.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let a=t.starts.map(($,w)=>Nl($,w,r,o,i)),u=t.ends.map(($,w)=>Nl($,w,r,o,i));if(o.length!==a.length||o.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let $=0;$<r.length;++$)o.includes($)||(a.splice($,0,0),u.splice($,0,r[$]),i.splice($,0,1));let d=i.map($=>Math.sign($));i.forEach(($,w,x)=>{if($<0){let T=(u[w]-a[w])/$,k=a[w],I=k+T*i[w];a[w]=I,u[w]=k,x[w]=-$}});let c=r.slice(0);o.forEach(($,w)=>{c[$]=Math.ceil((u[$]-a[$])/i[$])});let p={dims:c,dataType:e[0].dataType},m=M("output",e[0].dataType,c.length),f=P("input",e[0].dataType,e[0].dims.length),b=E.size(c),g=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:d.length},{name:"steps",type:"u32",length:i.length}],_=[{type:12,data:b},{type:12,data:a},{type:6,data:d},{type:12,data:i},...N(e[0].dims,c)],S=$=>`
      ${$.registerUniforms(g).declareVariables(f,m)}
        ${og(f,m,r)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${m.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${m.setByOffset("global_idx",f.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${d.length}_${a.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:S,getRunData:()=>({outputs:[p],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:_})}},Vl=(e,t)=>{rg(e.inputs,t);let r=ng(e.inputs,t);e.compute(ig(e.inputs,r),{inputs:[0]})},Wl=e=>{let t=e.starts,r=e.ends,n=e.axes;return X({starts:t,ends:r,axes:n})}});var ag,sg,Gl,Hl,Fl=U(()=>{"use strict";Y();ne();Se();ut();ie();ag=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},sg=(e,t)=>{let r=e.inputs[0],n=r.dims,o=E.size(n),i=n.length,a=E.normalizeAxis(t.axis,i),u=a<n.length-1,d,c=[];u?(c=Array.from({length:i},(O,z)=>z),c[a]=i-1,c[i-1]=a,d=e.compute(ke(r,c),{inputs:[r],outputs:[-1]})[0]):d=r;let p=d.dims,m=p[i-1],f=o/m,b=me(m),g=m/b,_=64;f===1&&(_=256);let S=(O,z)=>z===4?`max(max(${O}.x, ${O}.y), max(${O}.z, ${O}.w))`:z===2?`max(${O}.x, ${O}.y)`:z===3?`max(max(${O}.x, ${O}.y), ${O}.z)`:O,$=P("x",d.dataType,d.dims,b),w=M("result",d.dataType,d.dims,b),x=$.type.value,T=ye(d.dataType)==="f32"?`var threadMax = ${x}(-3.402823e+38f);`:`var threadMax = ${x}(-65504.0h);`,k=O=>`
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
      ${O.registerUniform("packedCols","i32").declareVariables($,w)}
      ${O.mainStart(_)}
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
          rowSumShared = ${x}(${Fe("threadShared[0]",b)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,I=e.compute({name:"Softmax",shaderCache:{hint:`${b};${_}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:p,dataType:d.dataType}],dispatchGroup:{x:f},programUniforms:[{type:6,data:g}]}),getShaderSource:k},{inputs:[d],outputs:[u?-1:0]})[0];u&&e.compute(ke(I,c),{inputs:[I]})},Gl=(e,t)=>{ag(e.inputs),sg(e,t)},Hl=e=>X({axis:e.axis})});var ql,ug,dg,lg,Kl,jl=U(()=>{"use strict";Y();ne();ie();ql=e=>Array.from(e.getBigInt64Array(),Number),ug=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(ql(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},dg=(e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r},lg=(e,t)=>{let r=e[0].dims,n=t??ql(e[1]),o=dg(r,n),i=E.size(o),a=e[0].dataType,u=P("input",a,r.length),d=M("output",a,o.length),c=p=>`
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
    }`;return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...N(e[0].dims,o)]}),getShaderSource:c}},Kl=e=>{ug(e.inputs),e.compute(lg(e.inputs),{inputs:[0]})}});var cg,pg,Zl,Ql=U(()=>{"use strict";Y();ne();ie();cg=(e,t,r,n,o)=>{let i=M("output_data",o,r.length,4),a=P("a_data",t[1].dataType,t[1].dims.length,4),u=P("b_data",t[2].dataType,t[2].dims.length,4),d=P("c_data",t[0].dataType,t[0].dims.length,4),c,p=(m,f,b)=>`select(${f}, ${m}, ${b})`;if(!n)c=i.setByOffset("global_idx",p(a.getByOffset("global_idx"),u.getByOffset("global_idx"),d.getByOffset("global_idx")));else{let m=(f,b,g="")=>{let _=`a_data[index_a${b}][component_a${b}]`,S=`b_data[index_b${b}][component_b${b}]`,$=`bool(c_data[index_c${b}] & (0xffu << (component_c${b} * 8)))`;return`
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
      }`},pg=e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,o=e[1].dataType,i=!(E.areEqual(t,r)&&E.areEqual(r,n)),a=t,u=E.size(t);if(i){let c=et.calcShape(et.calcShape(t,r,!1),n,!1);if(!c)throw new Error("Can't perform where op on the given tensors");a=c,u=E.size(a)}let d=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:c=>cg(c,e,a,i,o),getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:d},...N(n,t,r,a)]})}},Zl=e=>{e.compute(pg(e.inputs))}});var Yl,Xl=U(()=>{"use strict";Es();qr();zs();Bs();wu();Pu();Du();Qu();nd();ad();dd();fd();bd();_d();$d();Td();Ad();Pd();Dd();Rd();qd();Zd();Yd();Jd();rl();$o();ol();vl();Sl();Il();Pl();Hr();Ml();To();Ul();Ll();Fl();So();jl();ut();jr();Ql();Yl=new Map([["Abs",[Ms]],["Acos",[Rs]],["Acosh",[Us]],["Add",[vu]],["ArgMax",[ks,uo]],["ArgMin",[As,uo]],["Asin",[Ns]],["Asinh",[Vs]],["Atan",[Ws]],["Atanh",[Ls]],["Attention",[Ps]],["AveragePool",[pl,cl]],["BatchNormalization",[Os]],["BiasAdd",[Ds]],["BiasSplitGelu",[_u]],["Cast",[Hs,Gs]],["Ceil",[qs]],["Clip",[Fs]],["Concat",[Ou,zu]],["Conv",[yo,bo]],["ConvTranspose",[rd,ed]],["Cos",[Ks]],["Cosh",[js]],["CumSum",[od,id]],["DepthToSpace",[sd,ud]],["DequantizeLinear",[$l,xl]],["Div",[$u]],["Einsum",[pd,md]],["Elu",[Zs,Xt]],["Equal",[xu]],["Erf",[Qs]],["Exp",[Ys]],["Expand",[gd]],["FastGelu",[yd]],["Floor",[Xs]],["FusedConv",[yo,bo]],["Gather",[vd,wd]],["GatherElements",[Ed,kd]],["GatherBlockQuantized",[Id,Cd]],["GatherND",[xd,Sd]],["Gelu",[Js]],["Gemm",[zd,Od]],["GlobalAveragePool",[hl,fl]],["GlobalMaxPool",[wl,_l]],["Greater",[Cu]],["GreaterOrEqual",[ku]],["GridSample",[Bd,Md]],["GroupQueryAttention",[Fd]],["HardSigmoid",[su,au]],["InstanceNormalization",[jd]],["LayerNormalization",[Qd]],["LeakyRelu",[eu,Xt]],["Less",[Au]],["LessOrEqual",[Eu]],["Log",[gu]],["MatMul",[Xd]],["MatMulNBits",[el,tl]],["MaxPool",[bl,yl]],["Mul",[Su]],["MultiHeadAttention",[Vd,Nd]],["Neg",[ru]],["Not",[tu]],["Pad",[nl]],["Pow",[Tu]],["QuickGelu",[bu,Xt]],["Range",[Tl]],["Reciprocal",[nu]],["ReduceMin",[$s]],["ReduceMean",[bs]],["ReduceMax",[vs]],["ReduceSum",[Ss]],["ReduceProd",[xs]],["ReduceL1",[ys]],["ReduceL2",[_s]],["ReduceLogSum",[Is]],["ReduceLogSumExp",[ws]],["ReduceSumSquare",[Ts]],["Relu",[ou]],["Resize",[Dl,Bl]],["RotaryEmbedding",[Gd]],["ScatterND",[El,kl]],["Sigmoid",[iu]],["Sin",[uu]],["Sinh",[du]],["Slice",[Vl,Wl]],["SkipLayerNormalization",[Rl]],["Split",[Wd,Ld]],["Sqrt",[lu]],["Softmax",[Gl,Hl]],["Sub",[Iu]],["Tan",[cu]],["Tanh",[mu]],["ThresholdedRelu",[hu,Xt]],["Tile",[Kl]],["Transpose",[os,is]],["Where",[Zl]]])});var an,Jl=U(()=>{"use strict";We();Je();ie();an=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,r){this.repo.set(t,r)}run(t,r,n,o,i){Re(t.programInfo.name);let a=this.backend.device,u=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let d=[];for(let p of r)d.push({binding:d.length,resource:{buffer:p.buffer}});for(let p of n)d.push({binding:d.length,resource:{buffer:p.buffer}});i&&d.push({binding:d.length,resource:i});let c=a.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:d,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let p={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:c,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(p)}u.setPipeline(t.computePipeline),u.setBindGroup(0,c),u.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),De(t.programInfo.name)}dispose(){}build(t,r){Re(t.name);let n=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(m=>{n.features.has(m.feature)&&o.push(`enable ${m.extension};`)});let a=rs(r,this.backend.device.limits),u=t.getShaderSource(a),d=`${o.join(`
`)}
${a.additionalImplementations}
${u}`,c=n.createShaderModule({code:d,label:t.name});ue("verbose",()=>`[WebGPU] ${t.name} shader code: ${d}`);let p=n.createComputePipeline({compute:{module:c,entryPoint:"main"},layout:"auto",label:t.name});return De(t.name),{programInfo:t,computePipeline:p,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(t){let r=typeof t=="number"?t:t.x,n=typeof t=="number"?1:t.y||1,o=typeof t=="number"?1:t.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=i&&n<=i&&o<=i)return[r,n,o];let a=r*n*o,u=Math.ceil(Math.sqrt(a));if(u>i){if(u=Math.ceil(Math.cbrt(a)),u>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[u,u,u]}else return[u,u,1]}}});var ec={};Rt(ec,{WebGpuBackend:()=>Co});var mg,fg,Io,Co,tc=U(()=>{"use strict";We();Y();Je();Qn();es();Xl();Jl();mg=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let o=e[n].dataType;switch(t[n]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let i=e[n].dims.length;r.push(`${o};${i}`);break}case"dims":{let i=e[n].dims.join(",");r.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")},fg=(e,t,r)=>{let n=e.name;return e.shaderCache?.hint&&(n+="["+e.shaderCache.hint+"]"),n+=":"+r+`:${mg(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,n},Io=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},Co=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,r){this.env=t;let n=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},i=a=>r.features.has(a)&&n.push(a)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups"),this.device=await r.requestDevice(o),this.adapterInfo=new Io(r.info||await r.requestAdapterInfo()),this.gpuDataManager=Ja(this),this.programManager=new an(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Dr(t.logLevel,!!t.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Re(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(t.getMappedRange()),n=this.pendingQueries.get(t);for(let o=0;o<r.length/2;o++){let i=n[o],a=i.kernelId,u=this.kernels.get(a),d=u.kernelType,c=u.kernelName,p=i.programName,m=i.inputTensorViews,f=i.outputTensorViews,b=r[o*2],g=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=b);let _=Number(b-this.queryTimeBase),S=Number(g-this.queryTimeBase);if(!Number.isSafeInteger(_)||!Number.isSafeInteger(S))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:m.map($=>({dims:$.dims,dataType:Xe($.dataType)})),outputsMetadata:f.map($=>({dims:$.dims,dataType:Xe($.dataType)})),kernelId:a,kernelType:d,kernelName:c,programName:p,startTime:_,endTime:S});else{let $="";m.forEach((x,T)=>{$+=`input[${T}]: [${x.dims}] | ${Xe(x.dataType)}, `});let w="";f.forEach((x,T)=>{w+=`output[${T}]: [${x.dims}] | ${Xe(x.dataType)}, `}),console.log(`[profiling] kernel "${a}|${d}|${c}|${p}" ${$}${w}execution time: ${S-_} ns`)}br("GPU",`${p}::${b}::${g}`)}t.unmap(),this.pendingQueries.delete(t)}),De()}run(t,r,n,o,i,a){Re(t.name);let u=[];for(let x=0;x<r.length;++x){let T=r[x].data;if(T===0)continue;let k=this.gpuDataManager.get(T);if(!k)throw new Error(`no GPU data for input: ${T}`);u.push(k)}let{outputs:d,dispatchGroup:c,programUniforms:p}=t.getRunData(r),m=n.length===0?d.map((x,T)=>T):n;if(m.length!==d.length)throw new Error(`Output size ${m.length} must be equal to ${d.length}.`);let f=[],b=[];for(let x=0;x<d.length;++x){if(!Number.isInteger(m[x])||m[x]<-3||m[x]>=a)throw new Error(`Invalid output index: ${m[x]}`);if(m[x]===-3)continue;let T=m[x]===-1,k=m[x]===-2,I=T||k?i(d[x].dataType,d[x].dims):o(m[x],d[x].dataType,d[x].dims);if(f.push(I),I.data===0)continue;let O=this.gpuDataManager.get(I.data);if(!O)throw new Error(`no GPU data for output: ${I.data}`);if(T&&this.temporaryData.push(O),k){let z=this.kernelPersistentData.get(this.currentKernelId);z||(z=[],this.kernelPersistentData.set(this.currentKernelId,z)),z.push(O)}b.push(O)}if(u.length!==r.length||b.length!==f.length){if(b.length===0)return De(t.name),f;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let g;if(p){let x=0,T=[];p.forEach(z=>{let B=typeof z.data=="number"?[z.data]:z.data;if(B.length===0)return;let W=z.type===10?2:4,q,j;z.type===10?(j=B.length>4?16:B.length>2?8:B.length*W,q=B.length>4?16:W*B.length):(j=B.length<=2?B.length*W:16,q=16),x=Math.ceil(x/j)*j,T.push(x);let te=z.type===10?8:4;x+=B.length>4?Math.ceil(B.length/te)*q:B.length*W});let k=16;x=Math.ceil(x/k)*k;let I=new ArrayBuffer(x);p.forEach((z,B)=>{let W=T[B],q=typeof z.data=="number"?[z.data]:z.data;if(z.type===6)new Int32Array(I,W,q.length).set(q);else if(z.type===12)new Uint32Array(I,W,q.length).set(q);else if(z.type===10)new Uint16Array(I,W,q.length).set(q);else if(z.type===1)new Float32Array(I,W,q.length).set(q);else throw new Error(`Unsupported uniform type: ${Xe(z.type)}`)});let O=this.gpuDataManager.create(x,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(O.buffer,0,I,0,x),this.gpuDataManager.release(O.id),g={offset:0,size:x,buffer:O.buffer}}let _=this.programManager.normalizeDispatchGroupSize(c),S=_[1]===1&&_[2]===1,$=fg(t,r,S),w=this.programManager.getArtifact($);if(w||(w=this.programManager.build(t,_),this.programManager.setArtifact($,w),ue("info",()=>`[artifact] key: ${$}, programName: ${t.name}`)),p&&w.uniformVariablesInfo){if(p.length!==w.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${w.uniformVariablesInfo.length}, got ${p.length} in program "${w.programInfo.name}".`);for(let x=0;x<p.length;x++){let T=p[x],k=T.type,I=typeof T.data=="number"?1:T.data.length,[O,z]=w.uniformVariablesInfo[x];if(k!==O||I!==z)throw new Error(`Uniform variable ${x} mismatch: expect type ${O} with size ${z}, got type ${k} with size ${I} in program "${w.programInfo.name}".`)}}if(ue("info",()=>`[ProgramManager] run "${t.name}" (key=${$}) with ${_[0]}x${_[1]}x${_[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let x={kernelId:this.currentKernelId,programName:w.programInfo.name,inputTensorViews:r,outputTensorViews:f};this.pendingKernels.push(x),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(x)}return this.programManager.run(w,u,b,_,g),De(t.name),f}upload(t,r){this.gpuDataManager.upload(t,r)}memcpy(t,r){this.gpuDataManager.memcpy(t,r)}async download(t,r){await this.gpuDataManager.download(t,r)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,r,n,o){let i=Yl.get(t);if(!i)throw new Error(`kernel not implemented: ${t}`);let a={kernelType:t,kernelName:o,kernelEntry:i[0],attributes:[i[1],n]};this.kernels.set(r,a)}releaseKernel(t){let r=this.kernelPersistentData.get(t);if(r){for(let n of r)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,r,n){let o=this.kernels.get(t);if(!o)throw new Error(`kernel not created: ${t}`);let i=o.kernelType,a=o.kernelName,u=o.kernelEntry,d=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=t,d[0]&&(d[1]=d[0](d[1]),d[0]=void 0),ue("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let c=this.env.debug;this.temporaryData=[];try{return c&&this.device.pushErrorScope("validation"),u(r,d[1]),0}catch(p){return n.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${p}`)),1}finally{c&&n.push(this.device.popErrorScope().then(p=>p?`GPU validation error for kernel "[${i}] ${a}": ${p.message}`:null));for(let p of this.temporaryData)this.gpuDataManager.release(p.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,r,n,o){let i=this.sessionExternalDataMapping.get(t);i||(i=new Map,this.sessionExternalDataMapping.set(t,i));let a=i.get(r),u=this.gpuDataManager.registerExternalBuffer(n,o,a);return i.set(r,[u,n]),u}unregisterBuffers(t){let r=this.sessionExternalDataMapping.get(t);r&&(r.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[0])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let r=this.gpuDataManager.get(t);if(!r)throw new Error(`no GPU data for buffer: ${t}`);return r.buffer}createDownloader(t,r,n){return async()=>{let o=await ro(this,t,r);return Mr(o.buffer,n)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ue("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ue("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ue("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),n=t.length;this.pendingKernels=[];for(let o=0;o<n;o++){let i=this.getComputePassEncoder(),a=t[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});var rc={};Rt(rc,{init:()=>hg});var rr,Ao,hg,nc=U(()=>{"use strict";Y();Je();ne();Za();rr=class e{constructor(t,r,n,o){this.module=t;this.dataType=r;this.data=n;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=E.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=E.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=E.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=E.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(E.size(t)!==E.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},Ao=class{constructor(t,r,n){this.module=t;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo;let o=t.PTR_SIZE,i=n/t.PTR_SIZE,a=o===4?"i32":"i64";this.opKernelContext=Number(t.getValue(o*i++,a));let u=Number(t.getValue(o*i++,a));this.outputCount=Number(t.getValue(o*i++,a)),this.customDataOffset=Number(t.getValue(o*i++,"*")),this.customDataSize=Number(t.getValue(o*i++,a));let d=[];for(let c=0;c<u;c++){let p=Number(t.getValue(o*i++,a)),m=Number(t.getValue(o*i++,"*")),f=Number(t.getValue(o*i++,a)),b=[];for(let g=0;g<f;g++)b.push(Number(t.getValue(o*i++,a)));d.push(new rr(t,p,m,b))}this.inputs=d}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(t,r){let n=r?.inputs?.map(u=>typeof u=="number"?this.inputs[u]:u)??this.inputs,o=r?.outputs??[],i=(u,d,c)=>new rr(this.module,d,this.output(u,c),c),a=(u,d)=>{let c=wt(u,d);if(!c)throw new Error(`Unsupported data type: ${u}`);let p=c>0?this.backend.gpuDataManager.create(c).id:0;return new rr(this.module,u,p,d)};return this.backend.run(t,n,o,i,a,this.outputCount)}output(t,r){let n=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",a=this.module.stackAlloc((1+r.length)*o);this.module.setValue(a,r.length,i);for(let u=0;u<r.length;u++)this.module.setValue(a+o*(u+1),r[u],i);return this.module._JsepOutput(this.opKernelContext,t,a)}catch(o){throw new Error(`Failed to generate kernel's output[${t}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(n)}}},hg=async(e,t,r,n)=>{let o=t.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let i=(tc(),qt(ec)).WebGpuBackend,a=new i;await a.initialize(r,n),o("webgpu",[a,u=>a.alloc(Number(u)),u=>a.free(u),(u,d,c,p=!1)=>{if(p)ue("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(d)}, size=${Number(c)}`),a.memcpy(Number(u),Number(d));else{ue("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(d)}, size=${Number(c)}`);let m=t.HEAPU8.subarray(Number(u>>>0),Number(u>>>0)+Number(c));a.upload(Number(d),m)}},async(u,d,c)=>{ue("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${d}, size=${c}`),await a.download(Number(u),()=>t.HEAPU8.subarray(Number(d)>>>0,Number(d+c)>>>0))},(u,d,c)=>a.createKernel(u,Number(d),c,t.UTF8ToString(t._JsepGetNodeName(Number(d)))),u=>a.releaseKernel(u),(u,d,c,p)=>{ue("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${c}, kernel=${u}, contextDataOffset=${d}`);let m=new Ao(t,a,Number(d));return a.computeKernel(Number(u),m,p)},()=>a.captureBegin(),()=>a.captureEnd(),()=>a.replay()])}else{let i=new Vr(r);o("webnn",[i,()=>i.reserveTensorId(),a=>i.releaseTensorId(a),async(a,u,d,c,p)=>i.ensureTensor(a,u,d,c,p),(a,u)=>{i.uploadTensor(a,u)},async(a,u)=>i.downloadTensor(a,u)])}}});var gg,$r,xr,Pt,bg,oc,jt,Sr,Tr,ic,Ir,Cr,Ar,Wn=U(()=>{"use strict";Ma();Ua();Y();yt();Er();jn();gg=(e,t)=>{ge()._OrtInit(e,t)!==0&&fe("Can't initialize onnxruntime.")},$r=async e=>{gg(e.wasm.numThreads,Qt(e.logLevel))},xr=async(e,t)=>{ge().asyncInit?.();{let r=(nc(),qt(rc)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let n=e.webgpu.adapter;if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=e.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=e.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",ge(),e,n)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",ge(),e)}}},Pt=new Map,bg=e=>{let t=ge(),r=t.stackSave();try{let n=t.PTR_SIZE,o=t.stackAlloc(2*n);t._OrtGetInputOutputCount(e,o,o+n)!==0&&fe("Can't get session input/output count.");let a=n===4?"i32":"i64";return[Number(t.getValue(o,a)),Number(t.getValue(o+n,a))]}finally{t.stackRestore(r)}},oc=(e,t)=>{let r=ge(),n=r.stackSave(),o=0;try{let i=r.PTR_SIZE,a=r.stackAlloc(2*i);r._OrtGetInputOutputMetadata(e,t,a,a+i)!==0&&fe("Can't get session input/output metadata.");let d=Number(r.getValue(a,"*"));o=Number(r.getValue(a+i,"*"));let c=r.HEAP32[o/4];if(c===0)return[d,0];let p=r.HEAPU32[o/4+1],m=[];for(let f=0;f<p;f++){let b=Number(r.getValue(o+8+f*i,"*"));m.push(b!==0?r.UTF8ToString(b):Number(r.getValue(o+8+(f+p)*i,"*")))}return[d,c,m]}finally{r.stackRestore(n),o!==0&&r._OrtFree(o)}},jt=e=>{let t=ge(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},Sr=async(e,t)=>{let r,n,o=ge();Array.isArray(e)?[r,n]=e:e.buffer===o.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=jt(e);let i=0,a=0,u=0,d=[],c=[],p=[];try{if([a,d]=await Ra(t),t?.externalData&&o.mountExternalData){let T=[];for(let k of t.externalData){let I=typeof k=="string"?k:k.path;T.push(Yt(typeof k=="string"?k:k.data).then(O=>{o.mountExternalData(I,O)}))}await Promise.all(T)}for(let T of t?.executionProviders??[])if((typeof T=="string"?T:T.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof T!="string"){let I=T,O=I?.context,z=I?.gpuDevice,B=I?.deviceType,W=I?.powerPreference;O?o.currentContext=O:z?o.currentContext=await o.webnnCreateMLContext(z):o.currentContext=await o.webnnCreateMLContext({deviceType:B,powerPreference:W})}else o.currentContext=await o.webnnCreateMLContext();break}i=await o._OrtCreateSession(r,n,a),o.webgpuOnCreateSession?.(i),i===0&&fe("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.webnnRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[m,f]=bg(i),b=!!t?.enableGraphCapture,g=[],_=[],S=[],$=[],w=[];for(let T=0;T<m;T++){let[k,I,O]=oc(i,T);k===0&&fe("Can't get an input name."),c.push(k);let z=o.UTF8ToString(k);g.push(z),S.push(I===0?{name:z,isTensor:!1}:{name:z,isTensor:!0,type:Xe(I),shape:O})}for(let T=0;T<f;T++){let[k,I,O]=oc(i,T+m);k===0&&fe("Can't get an output name."),p.push(k);let z=o.UTF8ToString(k);_.push(z),$.push(I===0?{name:z,isTensor:!1}:{name:z,isTensor:!0,type:Xe(I),shape:O});{if(b&&t?.preferredOutputLocation===void 0){w.push("gpu-buffer");continue}let B=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[z]??"cpu",W=o.webnnIsGraphOutput;if(B==="cpu"&&W&&W(i,z)){w.push("ml-tensor-cpu-output");continue}if(B!=="cpu"&&B!=="cpu-pinned"&&B!=="gpu-buffer"&&B!=="ml-tensor")throw new Error(`Not supported preferred output location: ${B}.`);if(b&&B!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${B}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);w.push(B)}}let x=null;return w.some(T=>T==="gpu-buffer"||T==="ml-tensor"||T==="ml-tensor-cpu-output")&&(u=o._OrtCreateBinding(i),u===0&&fe("Can't create IO binding."),x={handle:u,outputPreferredLocations:w,outputPreferredLocationsEncoded:w.map(T=>T==="ml-tensor-cpu-output"?"ml-tensor":T).map(T=>Kn(T))}),Pt.set(i,[i,c,p,x,b,!1]),[i,g,_,S,$]}catch(m){throw c.forEach(f=>o._OrtFree(f)),p.forEach(f=>o._OrtFree(f)),u!==0&&o._OrtReleaseBinding(u)!==0&&fe("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&fe("Can't release session."),m}finally{o._free(r),a!==0&&o._OrtReleaseSessionOptions(a)!==0&&fe("Can't release session options."),d.forEach(m=>o._free(m)),o.unmountExternalData?.()}},Tr=e=>{let t=ge(),r=Pt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[n,o,i,a,u]=r;a&&(u&&t._OrtClearBoundOutputs(a.handle)!==0&&fe("Can't clear bound outputs."),t._OrtReleaseBinding(a.handle)!==0&&fe("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),o.forEach(d=>t._OrtFree(d)),i.forEach(d=>t._OrtFree(d)),t._OrtReleaseSession(n)!==0&&fe("Can't release session."),Pt.delete(e)},ic=async(e,t,r,n,o,i,a=!1)=>{if(!e){t.push(0);return}let u=ge(),d=u.PTR_SIZE,c=e[0],p=e[1],m=e[3],f=m,b,g;if(c==="string"&&(m==="gpu-buffer"||m==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(a&&m!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${i} when enableGraphCapture is true.`);if(m==="gpu-buffer"){let $=e[2].gpuBuffer;g=wt(_t(c),p);{let w=u.jsepRegisterBuffer;if(!w)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');b=w(n,i,$,g)}}else if(m==="ml-tensor"){let $=e[2].mlTensor;g=wt(_t(c),p);let w=u.webnnRegisterMLTensor;if(!w)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');b=w(n,$,_t(c),p)}else{let $=e[2];if(Array.isArray($)){g=d*$.length,b=u._malloc(g),r.push(b);for(let w=0;w<$.length;w++){if(typeof $[w]!="string")throw new TypeError(`tensor data at index ${w} is not a string`);u.setValue(b+w*d,Ne($[w],r),"*")}}else{let w=u.webnnIsGraphInput,x=u.webnnIsGraphOutput;if(c!=="string"&&w&&x){let T=u.UTF8ToString(o);if(w(n,T)||x(n,T)){let k=_t(c);g=wt(k,p),f="ml-tensor";let I=u.webnnCreateTemporaryTensor,O=u.webnnUploadTensor;if(!I||!O)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let z=await I(n,k,p);O(z,new Uint8Array($.buffer,$.byteOffset,$.byteLength)),b=z}else g=$.byteLength,b=u._malloc(g),r.push(b),u.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,g),b)}else g=$.byteLength,b=u._malloc(g),r.push(b),u.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,g),b)}}let _=u.stackSave(),S=u.stackAlloc(4*p.length);try{p.forEach((w,x)=>u.setValue(S+x*d,w,d===4?"i32":"i64"));let $=u._OrtCreateTensor(_t(c),b,g,S,p.length,Kn(f));$===0&&fe(`Can't create tensor for input/output. session=${n}, index=${i}.`),t.push($)}finally{u.stackRestore(_)}},Ir=async(e,t,r,n,o,i)=>{let a=ge(),u=a.PTR_SIZE,d=Pt.get(e);if(!d)throw new Error(`cannot run inference. invalid session id: ${e}`);let c=d[0],p=d[1],m=d[2],f=d[3],b=d[4],g=d[5],_=t.length,S=n.length,$=0,w=[],x=[],T=[],k=[],I=a.stackSave(),O=a.stackAlloc(_*u),z=a.stackAlloc(_*u),B=a.stackAlloc(S*u),W=a.stackAlloc(S*u);try{[$,w]=Ba(i);for(let V=0;V<_;V++)await ic(r[V],x,k,e,p[t[V]],t[V],b);for(let V=0;V<S;V++)await ic(o[V],T,k,e,m[n[V]],_+n[V],b);for(let V=0;V<_;V++)a.setValue(O+V*u,x[V],"*"),a.setValue(z+V*u,p[t[V]],"*");for(let V=0;V<S;V++)a.setValue(B+V*u,T[V],"*"),a.setValue(W+V*u,m[n[V]],"*");if(f&&!g){let{handle:V,outputPreferredLocations:de,outputPreferredLocationsEncoded:J}=f;if(p.length!==_)throw new Error(`input count from feeds (${_}) is expected to be always equal to model's input count (${p.length}).`);for(let H=0;H<_;H++){let ae=t[H];await a._OrtBindInput(V,p[ae],x[H])!==0&&fe(`Can't bind input[${H}] for session=${e}.`)}for(let H=0;H<S;H++){let ae=n[H];o[H]?.[3]?a._OrtBindOutput(V,m[ae],T[H],0)!==0&&fe(`Can't bind pre-allocated output[${H}] for session=${e}.`):a._OrtBindOutput(V,m[ae],0,J[ae])!==0&&fe(`Can't bind output[${H}] to ${de[H]} for session=${e}.`)}Pt.set(e,[c,p,m,f,b,!0])}a.jsepOnRunStart?.(c),a.webnnOnRunStart?.(c);let q;f?q=await a._OrtRunWithBinding(c,f.handle,S,B,$):q=await a._OrtRun(c,z,O,_,W,S,B,$),q!==0&&fe("failed to call OrtRun().");let j=[],te=[];for(let V=0;V<S;V++){let de=Number(a.getValue(B+V*u,"*"));if(de===T[V]){j.push(o[V]);continue}let J=a.stackSave(),H=a.stackAlloc(4*u),ae=!1,Z,re=0;try{a._OrtGetTensorData(de,H,H+u,H+2*u,H+3*u)!==0&&fe(`Can't access output tensor data on index ${V}.`);let _e=u===4?"i32":"i64",ee=Number(a.getValue(H,_e));re=a.getValue(H+u,"*");let C=a.getValue(H+u*2,"*"),L=Number(a.getValue(H+u*3,_e)),le=[];for(let xe=0;xe<L;xe++)le.push(Number(a.getValue(C+xe*u,_e)));a._OrtFree(C)!==0&&fe("Can't free memory for tensor dims.");let Ce=le.reduce((xe,ce)=>xe*ce,1);Z=Xe(ee);let ze=f?.outputPreferredLocations[n[V]];if(Z==="string"){if(ze==="gpu-buffer"||ze==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let xe=[];for(let ce=0;ce<Ce;ce++){let Ge=a.getValue(re+ce*u,"*"),lt=a.getValue(re+(ce+1)*u,"*"),ct=ce===Ce-1?void 0:lt-Ge;xe.push(a.UTF8ToString(Ge,ct))}j.push([Z,le,xe,"cpu"])}else if(ze==="gpu-buffer"&&Ce>0){let xe=a.jsepGetBuffer;if(!xe)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let ce=xe(re),Ge=wt(ee,Ce);if(Ge===void 0||!Or(Z))throw new Error(`Unsupported data type: ${Z}`);ae=!0,j.push([Z,le,{gpuBuffer:ce,download:a.jsepCreateDownloader(ce,Ge,Z),dispose:()=>{a._OrtReleaseTensor(de)!==0&&fe("Can't release tensor.")}},"gpu-buffer"])}else if(ze==="ml-tensor"&&Ce>0){let xe=a.webnnEnsureTensor,ce=a.webnnIsGraphInputOutputTypeSupported;if(!xe||!ce)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(wt(ee,Ce)===void 0||!zr(Z))throw new Error(`Unsupported data type: ${Z}`);if(!ce(e,Z,!1))throw new Error(`preferredLocation "ml-tensor" for ${Z} output is not supported by current WebNN Context.`);let lt=await xe(e,re,ee,le,!1);ae=!0,j.push([Z,le,{mlTensor:lt,download:a.webnnCreateMLTensorDownloader(re,Z),dispose:()=>{a.webnnReleaseTensorId(re),a._OrtReleaseTensor(de)}},"ml-tensor"])}else if(ze==="ml-tensor-cpu-output"&&Ce>0){let xe=a.webnnCreateMLTensorDownloader(re,Z)(),ce=j.length;ae=!0,te.push((async()=>{let Ge=[ce,await xe];return a.webnnReleaseTensorId(re),a._OrtReleaseTensor(de),Ge})()),j.push([Z,le,[],"cpu"])}else{let xe=Ut(Z),ce=new xe(Ce);new Uint8Array(ce.buffer,ce.byteOffset,ce.byteLength).set(a.HEAPU8.subarray(re,re+ce.byteLength)),j.push([Z,le,ce,"cpu"])}}finally{a.stackRestore(J),Z==="string"&&re&&a._free(re),ae||a._OrtReleaseTensor(de)}}f&&!b&&(a._OrtClearBoundOutputs(f.handle)!==0&&fe("Can't clear bound outputs."),Pt.set(e,[c,p,m,f,b,!1]));for(let[V,de]of await Promise.all(te))j[V][2]=de;return j}finally{a.webnnOnRunEnd?.(c),a.stackRestore(I),x.forEach(q=>a._OrtReleaseTensor(q)),T.forEach(q=>a._OrtReleaseTensor(q)),k.forEach(q=>a._free(q)),$!==0&&a._OrtReleaseRunOptions($),w.forEach(q=>a._free(q))}},Cr=e=>{let t=ge(),r=Pt.get(e);if(!r)throw new Error("invalid session id");let n=r[0],o=t._OrtEndProfiling(n);o===0&&fe("Can't get an profile file name."),t._OrtFree(o)},Ar=e=>{let t=[];for(let r of e){let n=r[2];!Array.isArray(n)&&"buffer"in n&&t.push(n.buffer)}return t}});var Ot,Le,nr,un,dn,sn,ko,Eo,Lt,Gt,_g,ac,sc,uc,dc,lc,cc,pc,Po=U(()=>{"use strict";We();Wn();yt();wr();Ot=()=>!!be.wasm.proxy&&typeof document<"u",nr=!1,un=!1,dn=!1,Eo=new Map,Lt=(e,t)=>{let r=Eo.get(e);r?r.push(t):Eo.set(e,[t])},Gt=()=>{if(nr||!un||dn||!Le)throw new Error("worker not ready")},_g=e=>{switch(e.data.type){case"init-wasm":nr=!1,e.data.err?(dn=!0,ko[1](e.data.err)):(un=!0,ko[0]()),sn&&(URL.revokeObjectURL(sn),sn=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Eo.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},ac=async()=>{if(!un){if(nr)throw new Error("multiple calls to 'initWasm()' detected.");if(dn)throw new Error("previous call to 'initWasm()' failed.");if(nr=!0,Ot())return new Promise((e,t)=>{Le?.terminate(),Oa().then(([r,n])=>{try{Le=n,Le.onerror=i=>t(i),Le.onmessage=_g,ko=[e,t];let o={type:"init-wasm",in:be};!o.in.wasm.wasmPaths&&(r||Hn)&&(o.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),Le.postMessage(o),sn=r}catch(o){t(o)}},t)});try{await vr(be.wasm),await $r(be),un=!0}catch(e){throw dn=!0,e}finally{nr=!1}}},sc=async e=>{if(Ot())return Gt(),new Promise((t,r)=>{Lt("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:be}};Le.postMessage(n)});await xr(be,e)},uc=async e=>Ot()?(Gt(),new Promise((t,r)=>{Lt("copy-from",[t,r]);let n={type:"copy-from",in:{buffer:e}};Le.postMessage(n,[e.buffer])})):jt(e),dc=async(e,t)=>{if(Ot()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Gt(),new Promise((r,n)=>{Lt("create",[r,n]);let o={type:"create",in:{model:e,options:{...t}}},i=[];e instanceof Uint8Array&&i.push(e.buffer),Le.postMessage(o,i)})}else return Sr(e,t)},lc=async e=>{if(Ot())return Gt(),new Promise((t,r)=>{Lt("release",[t,r]);let n={type:"release",in:e};Le.postMessage(n)});Tr(e)},cc=async(e,t,r,n,o,i)=>{if(Ot()){if(r.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return Gt(),new Promise((a,u)=>{Lt("run",[a,u]);let d=r,c={type:"run",in:{sessionId:e,inputIndices:t,inputs:d,outputIndices:n,options:i}};Le.postMessage(c,Ar(d))})}else return Ir(e,t,r,n,o,i)},pc=async e=>{if(Ot())return Gt(),new Promise((t,r)=>{Lt("end-profiling",[t,r]);let n={type:"end-profiling",in:e};Le.postMessage(n)});Cr(e)}});var mc,wg,ln,fc=U(()=>{"use strict";We();Po();Y();_r();jn();mc=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},wg=e=>{switch(e[3]){case"cpu":return new He(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Or(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:o}=e[2];return He.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:o})}case"ml-tensor":{let t=e[0];if(!zr(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:n,dispose:o}=e[2];return He.fromMLTensor(r,{dataType:t,dims:e[1],download:n,dispose:o})}default:throw new Error(`invalid data location: ${e[3]}`)}},ln=class{async fetchModelAndCopyToWasmMemory(t){return uc(await Yt(t))}async loadModel(t,r){Re();let n;typeof t=="string"?n=await this.fetchModelAndCopyToWasmMemory(t):n=t,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await dc(n,r),De()}async dispose(){return lc(this.sessionId)}async run(t,r,n){Re();let o=[],i=[];Object.entries(t).forEach(f=>{let b=f[0],g=f[1],_=this.inputNames.indexOf(b);if(_===-1)throw new Error(`invalid input '${b}'`);o.push(g),i.push(_)});let a=[],u=[];Object.entries(r).forEach(f=>{let b=f[0],g=f[1],_=this.outputNames.indexOf(b);if(_===-1)throw new Error(`invalid output '${b}'`);a.push(g),u.push(_)});let d=o.map((f,b)=>mc(f,()=>`input "${this.inputNames[i[b]]}"`)),c=a.map((f,b)=>f?mc(f,()=>`output "${this.outputNames[u[b]]}"`):null),p=await cc(this.sessionId,i,d,u,c,n),m={};for(let f=0;f<p.length;f++)m[this.outputNames[u[f]]]=a[f]??wg(p[f]);return De(),m}startProfiling(){}endProfiling(){pc(this.sessionId)}}});var gc={};Rt(gc,{OnnxruntimeWebAssemblyBackend:()=>cn,initializeFlags:()=>hc,wasmBackend:()=>vg});var hc,cn,vg,bc=U(()=>{"use strict";We();Po();fc();hc=()=>{(typeof be.wasm.initTimeout!="number"||be.wasm.initTimeout<0)&&(be.wasm.initTimeout=0);let e=be.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),be.wasm.simd=!1),typeof be.wasm.proxy!="boolean"&&(be.wasm.proxy=!1),typeof be.wasm.trace!="boolean"&&(be.wasm.trace=!1),typeof be.wasm.numThreads!="number"||!Number.isInteger(be.wasm.numThreads)||be.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)be.wasm.numThreads=1;else{let t=typeof navigator>"u"?Dn("node:os").cpus().length:navigator.hardwareConcurrency;be.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},cn=class{async init(t){hc(),await ac(),await sc(t)}async createInferenceSessionHandler(t,r){let n=new ln;return await n.loadModel(t,r),n}},vg=new cn});We();We();We();var _a="1.22.0";var kS=Vn;{let e=(bc(),qt(gc)).wasmBackend;Tt("webgpu",e,5),Tt("webnn",e,5),Tt("cpu",e,10),Tt("wasm",e,10)}Object.defineProperty(be.versions,"web",{value:_a,enumerable:!0});export{Fp as InferenceSession,br as TRACE,Re as TRACE_FUNC_BEGIN,De as TRACE_FUNC_END,He as Tensor,kS as default,be as env,Tt as registerBackend};
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
