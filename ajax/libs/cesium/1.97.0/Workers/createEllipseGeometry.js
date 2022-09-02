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
define(["./Matrix2-276d97d2","./defaultValue-a6eb9f34","./EllipseGeometry-84768225","./ComponentDatatype-7f6d9570","./WebGLConstants-d81b330d","./RuntimeError-07496d94","./Transforms-0c3fa360","./_commonjsHelpers-89c9b271","./combine-7cf28d88","./EllipseGeometryLibrary-65924704","./GeometryAttribute-54019f82","./GeometryAttributes-aff51037","./GeometryInstance-52eaddec","./GeometryOffsetAttribute-102da468","./GeometryPipeline-f46d7519","./AttributeCompression-28a6d524","./EncodedCartesian3-32c625e4","./IndexDatatype-856d3a0c","./IntersectionTests-fbcff83c","./Plane-17fe9d66","./VertexFormat-31cdbccc"],(function(e,t,r,n,o,i,a,c,d,s,l,f,m,p,u,y,b,G,E,C,_){"use strict";return function(n,o){return t.defined(o)&&(n=r.EllipseGeometry.unpack(n,o)),n._center=e.Cartesian3.clone(n._center),n._ellipsoid=e.Ellipsoid.clone(n._ellipsoid),r.EllipseGeometry.createGeometry(n)}}));
