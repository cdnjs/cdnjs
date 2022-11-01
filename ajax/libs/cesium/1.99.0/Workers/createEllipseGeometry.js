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
define(["./Matrix3-edb29a7e","./defaultValue-135942ca","./EllipseGeometry-4118825e","./Math-a304e2d6","./Transforms-3ea76111","./Matrix2-7a2bab7e","./RuntimeError-f0dada00","./combine-462d91dd","./ComponentDatatype-e86a9f87","./WebGLConstants-fcb70ee3","./EllipseGeometryLibrary-d955e650","./GeometryAttribute-dacddb3f","./GeometryAttributes-899f8bd0","./GeometryInstance-1aacc2fb","./GeometryOffsetAttribute-d3a42805","./GeometryPipeline-7cd8f832","./AttributeCompression-5b18be52","./EncodedCartesian3-bf4e5ec3","./IndexDatatype-3a8ea78f","./IntersectionTests-f3382f21","./Plane-5bea24eb","./VertexFormat-7d5b4d7e"],(function(e,t,a,r,n,i,o,d,s,b,c,l,f,m,p,u,y,G,E,C,x,A){"use strict";return function(r,n){return t.defined(n)&&(r=a.EllipseGeometry.unpack(r,n)),r._center=e.Cartesian3.clone(r._center),r._ellipsoid=e.Ellipsoid.clone(r._ellipsoid),a.EllipseGeometry.createGeometry(r)}}));
