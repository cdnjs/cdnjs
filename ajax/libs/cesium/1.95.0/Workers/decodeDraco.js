/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.95
 *
 * Copyright 2011-2022 Cesium Contributors
 *
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
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */
define(["./ComponentDatatype-e7fbe225","./defaultValue-97284df2","./IndexDatatype-65271ba3","./RuntimeError-4f8ec8a2","./createTaskProcessorWorker","./WebGLConstants-6da700a2"],(function(t,e,r,n,o,a){"use strict";let i;function s(t,e){const n=t.num_points(),o=t.num_faces(),a=new i.DracoInt32Array,s=3*o,u=r.IndexDatatype.createTypedArray(n,s);let c=0;for(let r=0;r<o;++r)e.GetFaceFromMesh(t,r,a),u[c+0]=a.GetValue(0),u[c+1]=a.GetValue(1),u[c+2]=a.GetValue(2),c+=3;return i.destroy(a),{typedArray:u,numberOfIndices:s}}function u(r,n,o){const a=r.num_points(),s=o.num_components();let u,c=new i.AttributeQuantizationTransform;if(c.InitFromAttribute(o)){const t=new Array(s);for(let e=0;e<s;++e)t[e]=c.min_value(e);u={quantizationBits:c.quantization_bits(),minValues:t,range:c.range(),octEncoded:!1}}i.destroy(c),c=new i.AttributeOctahedronTransform,c.InitFromAttribute(o)&&(u={quantizationBits:c.quantization_bits(),octEncoded:!0}),i.destroy(c);const d=a*s;let f;f=e.defined(u)?function(t,e,r,n,o){let a,s;n.quantizationBits<=8?(s=new i.DracoUInt8Array,a=new Uint8Array(o),e.GetAttributeUInt8ForAllPoints(t,r,s)):(s=new i.DracoUInt16Array,a=new Uint16Array(o),e.GetAttributeUInt16ForAllPoints(t,r,s));for(let t=0;t<o;++t)a[t]=s.GetValue(t);return i.destroy(s),a}(r,n,o,u,d):function(t,e,r,n){let o,a;switch(r.data_type()){case 1:case 11:a=new i.DracoInt8Array,o=new Int8Array(n),e.GetAttributeInt8ForAllPoints(t,r,a);break;case 2:a=new i.DracoUInt8Array,o=new Uint8Array(n),e.GetAttributeUInt8ForAllPoints(t,r,a);break;case 3:a=new i.DracoInt16Array,o=new Int16Array(n),e.GetAttributeInt16ForAllPoints(t,r,a);break;case 4:a=new i.DracoUInt16Array,o=new Uint16Array(n),e.GetAttributeUInt16ForAllPoints(t,r,a);break;case 5:case 7:a=new i.DracoInt32Array,o=new Int32Array(n),e.GetAttributeInt32ForAllPoints(t,r,a);break;case 6:case 8:a=new i.DracoUInt32Array,o=new Uint32Array(n),e.GetAttributeUInt32ForAllPoints(t,r,a);break;case 9:case 10:a=new i.DracoFloat32Array,o=new Float32Array(n),e.GetAttributeFloatForAllPoints(t,r,a)}for(let t=0;t<n;++t)o[t]=a.GetValue(t);return i.destroy(a),o}(r,n,o,d);const y=t.ComponentDatatype.fromTypedArray(f);return{array:f,data:{componentsPerAttribute:s,componentDatatype:y,byteOffset:o.byte_offset(),byteStride:t.ComponentDatatype.getSizeInBytes(y)*s,normalized:o.normalized(),quantization:u}}}function c(t){return e.defined(t.bufferView)?function(t){const e=new i.Decoder,r=["POSITION","NORMAL","COLOR","TEX_COORD"];if(t.dequantizeInShader)for(let t=0;t<r.length;++t)e.SkipAttributeTransform(i[r[t]]);const o=t.bufferView,a=new i.DecoderBuffer;if(a.Init(t.array,o.byteLength),e.GetEncodedGeometryType(a)!==i.TRIANGULAR_MESH)throw new n.RuntimeError("Unsupported draco mesh geometry type.");const c=new i.Mesh,d=e.DecodeBufferToMesh(a,c);if(!d.ok()||0===c.ptr)throw new n.RuntimeError(`Error decoding draco mesh geometry: ${d.error_msg()}`);i.destroy(a);const f={},y=t.compressedAttributes;for(const t in y)if(y.hasOwnProperty(t)){const r=y[t],n=e.GetAttributeByUniqueId(c,r);f[t]=u(c,e,n)}const A={indexArray:s(c,e),attributeData:f};return i.destroy(c),i.destroy(e),A}(t):function(t){const e=new i.Decoder;t.dequantizeInShader&&(e.SkipAttributeTransform(i.POSITION),e.SkipAttributeTransform(i.NORMAL));const r=new i.DecoderBuffer;if(r.Init(t.buffer,t.buffer.length),e.GetEncodedGeometryType(r)!==i.POINT_CLOUD)throw new n.RuntimeError("Draco geometry type must be POINT_CLOUD.");const o=new i.PointCloud,a=e.DecodeBufferToPointCloud(r,o);if(!a.ok()||0===o.ptr)throw new n.RuntimeError(`Error decoding draco point cloud: ${a.error_msg()}`);i.destroy(r);const s={},c=t.properties;for(const t in c)if(c.hasOwnProperty(t)){let r;if("POSITION"===t||"NORMAL"===t){const n=e.GetAttributeId(o,i[t]);r=e.GetAttribute(o,n)}else{const n=c[t];r=e.GetAttributeByUniqueId(o,n)}s[t]=u(o,e,r)}return i.destroy(o),i.destroy(e),s}(t)}function d(t){i=t,self.onmessage=o(c),self.postMessage(!0)}return function(t){const r=t.data.webAssemblyConfig;if(e.defined(r))return require([r.modulePath],(function(t){e.defined(r.wasmBinaryFile)?(e.defined(t)||(t=self.DracoDecoderModule),t(r).then((function(t){d(t)}))):d(t())}))}}));
