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
define(["./PrimitivePipeline-f81d7dea","./createTaskProcessorWorker","./Transforms-a48d25e5","./Matrix2-c339372d","./defaultValue-65031fc5","./ComponentDatatype-1b227f17","./WebGLConstants-f5c279b9","./RuntimeError-23f4777c","./combine-96aed74b","./GeometryAttribute-5db26912","./GeometryAttributes-f9b563d6","./GeometryPipeline-7e799ed5","./AttributeCompression-9d180a12","./EncodedCartesian3-4e907eba","./IndexDatatype-53de8b23","./IntersectionTests-87344d12","./Plane-3d182a08","./WebMercatorProjection-b33ee193"],(function(e,t,i,r,n,o,a,s,m,c,b,d,u,P,f,p,l,y){"use strict";return t((function(t,i){const r=e.PrimitivePipeline.unpackCombineGeometryParameters(t),n=e.PrimitivePipeline.combineGeometry(r);return e.PrimitivePipeline.packCombineGeometryResults(n,i)}))}));
