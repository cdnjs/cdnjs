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
define(["./defaultValue-135942ca","./Matrix3-edb29a7e","./EllipsoidOutlineGeometry-885eddda","./Math-a304e2d6","./Transforms-3ea76111","./Matrix2-7a2bab7e","./RuntimeError-f0dada00","./combine-462d91dd","./ComponentDatatype-e86a9f87","./WebGLConstants-fcb70ee3","./GeometryAttribute-dacddb3f","./GeometryAttributes-899f8bd0","./GeometryOffsetAttribute-d3a42805","./IndexDatatype-3a8ea78f"],(function(e,i,t,n,a,r,o,s,d,l,u,c,m,p){"use strict";function y(n){const a=e.defaultValue(n.radius,1),r={radii:new i.Cartesian3(a,a,a),stackPartitions:n.stackPartitions,slicePartitions:n.slicePartitions,subdivisions:n.subdivisions};this._ellipsoidGeometry=new t.EllipsoidOutlineGeometry(r),this._workerName="createSphereOutlineGeometry"}y.packedLength=t.EllipsoidOutlineGeometry.packedLength,y.pack=function(e,i,n){return t.EllipsoidOutlineGeometry.pack(e._ellipsoidGeometry,i,n)};const f=new t.EllipsoidOutlineGeometry,G={radius:void 0,radii:new i.Cartesian3,stackPartitions:void 0,slicePartitions:void 0,subdivisions:void 0};return y.unpack=function(n,a,r){const o=t.EllipsoidOutlineGeometry.unpack(n,a,f);return G.stackPartitions=o._stackPartitions,G.slicePartitions=o._slicePartitions,G.subdivisions=o._subdivisions,e.defined(r)?(i.Cartesian3.clone(o._radii,G.radii),r._ellipsoidGeometry=new t.EllipsoidOutlineGeometry(G),r):(G.radius=o._radii.x,new y(G))},y.createGeometry=function(e){return t.EllipsoidOutlineGeometry.createGeometry(e._ellipsoidGeometry)},function(i,t){return e.defined(t)&&(i=y.unpack(i,t)),y.createGeometry(i)}}));
