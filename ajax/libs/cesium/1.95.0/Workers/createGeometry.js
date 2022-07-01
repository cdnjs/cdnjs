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
define(["./defaultValue-97284df2","./PrimitivePipeline-42d69f96","./createTaskProcessorWorker","./Transforms-d3d3b2a9","./Matrix2-73789715","./RuntimeError-4f8ec8a2","./ComponentDatatype-e7fbe225","./WebGLConstants-6da700a2","./_commonjsHelpers-3aae1032-65601a27","./combine-d11b1f00","./GeometryAttribute-fd1d7e90","./GeometryAttributes-734a3446","./GeometryPipeline-a847e31f","./AttributeCompression-5744d52e","./EncodedCartesian3-a9a8a281","./IndexDatatype-65271ba3","./IntersectionTests-33ace2d6","./Plane-e916220d","./WebMercatorProjection-04ef6bc3"],(function(e,t,r,n,o,a,i,s,c,f,d,u,m,l,b,p,y,P,k){"use strict";const C={};function G(t){let r=C[t];return e.defined(r)||("object"==typeof exports?C[r]=r=require(`Workers/${t}`):require([`Workers/${t}`],(function(e){r=e,C[r]=e}))),r}return r((function(r,n){const o=r.subTasks,a=o.length,i=new Array(a);for(let t=0;t<a;t++){const r=o[t],n=r.geometry,a=r.moduleName;if(e.defined(a)){const e=G(a);i[t]=e(n,r.offset)}else i[t]=n}return Promise.all(i).then((function(e){return t.PrimitivePipeline.packCreateGeometryResults(e,n)}))}))}));
