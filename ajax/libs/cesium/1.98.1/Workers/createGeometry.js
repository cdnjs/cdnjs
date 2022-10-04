/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.98.1
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
define(["./defaultValue-65031fc5","./PrimitivePipeline-f81d7dea","./createTaskProcessorWorker","./Transforms-a48d25e5","./Matrix2-c339372d","./ComponentDatatype-1b227f17","./WebGLConstants-f5c279b9","./RuntimeError-23f4777c","./combine-96aed74b","./GeometryAttribute-5db26912","./GeometryAttributes-f9b563d6","./GeometryPipeline-7e799ed5","./AttributeCompression-9d180a12","./EncodedCartesian3-4e907eba","./IndexDatatype-53de8b23","./IntersectionTests-87344d12","./Plane-3d182a08","./WebMercatorProjection-b33ee193"],(function(e,t,r,n,o,i,s,a,c,d,f,u,b,m,l,p,y,P){"use strict";const k={};function C(t){let r=k[t];return e.defined(r)||("object"==typeof exports?k[r]=r=require(`Workers/${t}`):require([`Workers/${t}`],(function(e){r=e,k[r]=e}))),r}return r((function(r,n){const o=r.subTasks,i=o.length,s=new Array(i);for(let t=0;t<i;t++){const r=o[t],n=r.geometry,i=r.moduleName;if(e.defined(i)){const e=C(i);s[t]=e(n,r.offset)}else s[t]=n}return Promise.all(s).then((function(e){return t.PrimitivePipeline.packCreateGeometryResults(e,n)}))}))}));
