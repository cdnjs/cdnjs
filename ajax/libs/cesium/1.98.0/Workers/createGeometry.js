/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.98
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
define(["./defaultValue-50f7432c","./PrimitivePipeline-01ed7b15","./createTaskProcessorWorker","./Transforms-f305a473","./Matrix2-7dfd434a","./ComponentDatatype-9b23164a","./WebGLConstants-58abc51a","./RuntimeError-48e1f06d","./combine-8462e002","./GeometryAttribute-4d82fade","./GeometryAttributes-8bab1b25","./GeometryPipeline-33e32ecb","./AttributeCompression-aa7855e7","./EncodedCartesian3-5efd45c3","./IndexDatatype-ceed713e","./IntersectionTests-4a7694f7","./Plane-3d30b188","./WebMercatorProjection-70f51d9f"],(function(e,t,r,n,o,i,a,s,c,f,u,d,b,m,l,p,y,P){"use strict";const k={};function C(t){let r=k[t];return e.defined(r)||("object"==typeof exports?k[r]=r=require(`Workers/${t}`):require([`Workers/${t}`],(function(e){r=e,k[r]=e}))),r}return r((function(r,n){const o=r.subTasks,i=o.length,a=new Array(i);for(let t=0;t<i;t++){const r=o[t],n=r.geometry,i=r.moduleName;if(e.defined(i)){const e=C(i);a[t]=e(n,r.offset)}else a[t]=n}return Promise.all(a).then((function(e){return t.PrimitivePipeline.packCreateGeometryResults(e,n)}))}))}));
