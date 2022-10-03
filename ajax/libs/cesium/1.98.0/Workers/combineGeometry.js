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
define(["./PrimitivePipeline-01ed7b15","./createTaskProcessorWorker","./Transforms-f305a473","./Matrix2-7dfd434a","./defaultValue-50f7432c","./ComponentDatatype-9b23164a","./WebGLConstants-58abc51a","./RuntimeError-48e1f06d","./combine-8462e002","./GeometryAttribute-4d82fade","./GeometryAttributes-8bab1b25","./GeometryPipeline-33e32ecb","./AttributeCompression-aa7855e7","./EncodedCartesian3-5efd45c3","./IndexDatatype-ceed713e","./IntersectionTests-4a7694f7","./Plane-3d30b188","./WebMercatorProjection-70f51d9f"],(function(e,t,i,r,n,a,o,s,c,m,b,d,f,u,P,p,l,y){"use strict";return t((function(t,i){const r=e.PrimitivePipeline.unpackCombineGeometryParameters(t),n=e.PrimitivePipeline.combineGeometry(r);return e.PrimitivePipeline.packCombineGeometryResults(n,i)}))}));
