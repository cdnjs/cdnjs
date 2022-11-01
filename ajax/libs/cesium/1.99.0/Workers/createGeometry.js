/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.99
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
define(["./defaultValue-135942ca","./PrimitivePipeline-ed52a9c2","./createTaskProcessorWorker","./Transforms-3ea76111","./Matrix3-edb29a7e","./Math-a304e2d6","./Matrix2-7a2bab7e","./RuntimeError-f0dada00","./combine-462d91dd","./ComponentDatatype-e86a9f87","./WebGLConstants-fcb70ee3","./GeometryAttribute-dacddb3f","./GeometryAttributes-899f8bd0","./GeometryPipeline-7cd8f832","./AttributeCompression-5b18be52","./EncodedCartesian3-bf4e5ec3","./IndexDatatype-3a8ea78f","./IntersectionTests-f3382f21","./Plane-5bea24eb","./WebMercatorProjection-76d90916"],(function(e,t,r,n,o,a,i,s,c,f,d,u,b,m,l,p,y,P,k,C){"use strict";const G={};function W(t){let r=G[t];return e.defined(r)||("object"==typeof exports?G[r]=r=require(`Workers/${t}`):require([`Workers/${t}`],(function(e){r=e,G[r]=e}))),r}return r((function(r,n){const o=r.subTasks,a=o.length,i=new Array(a);for(let t=0;t<a;t++){const r=o[t],n=r.geometry,a=r.moduleName;if(e.defined(a)){const e=W(a);i[t]=e(n,r.offset)}else i[t]=n}return Promise.all(i).then((function(e){return t.PrimitivePipeline.packCreateGeometryResults(e,n)}))}))}));
