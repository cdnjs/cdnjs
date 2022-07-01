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
define(["./Matrix2-73789715","./defaultValue-97284df2","./EllipseGeometry-e6f948bb","./RuntimeError-4f8ec8a2","./ComponentDatatype-e7fbe225","./WebGLConstants-6da700a2","./Transforms-d3d3b2a9","./_commonjsHelpers-3aae1032-65601a27","./combine-d11b1f00","./EllipseGeometryLibrary-0adcaeed","./GeometryAttribute-fd1d7e90","./GeometryAttributes-734a3446","./GeometryInstance-4bfcfe78","./GeometryOffsetAttribute-59b14f45","./GeometryPipeline-a847e31f","./AttributeCompression-5744d52e","./EncodedCartesian3-a9a8a281","./IndexDatatype-65271ba3","./IntersectionTests-33ace2d6","./Plane-e916220d","./VertexFormat-9886cb81"],(function(e,t,r,a,n,o,i,s,d,l,c,f,m,b,p,u,y,G,E,C,_){"use strict";return function(a,n){return t.defined(n)&&(a=r.EllipseGeometry.unpack(a,n)),a._center=e.Cartesian3.clone(a._center),a._ellipsoid=e.Ellipsoid.clone(a._ellipsoid),r.EllipseGeometry.createGeometry(a)}}));
