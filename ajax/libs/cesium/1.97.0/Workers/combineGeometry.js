/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.97
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
define(["./PrimitivePipeline-8eee2efd","./createTaskProcessorWorker","./Transforms-0c3fa360","./Matrix2-276d97d2","./defaultValue-a6eb9f34","./ComponentDatatype-7f6d9570","./WebGLConstants-d81b330d","./RuntimeError-07496d94","./_commonjsHelpers-89c9b271","./combine-7cf28d88","./GeometryAttribute-54019f82","./GeometryAttributes-aff51037","./GeometryPipeline-f46d7519","./AttributeCompression-28a6d524","./EncodedCartesian3-32c625e4","./IndexDatatype-856d3a0c","./IntersectionTests-fbcff83c","./Plane-17fe9d66","./WebMercatorProjection-412ca883"],(function(e,t,i,r,n,o,a,c,s,m,f,d,b,u,P,p,l,y,G){"use strict";return t((function(t,i){const r=e.PrimitivePipeline.unpackCombineGeometryParameters(t),n=e.PrimitivePipeline.combineGeometry(r);return e.PrimitivePipeline.packCombineGeometryResults(n,i)}))}));
