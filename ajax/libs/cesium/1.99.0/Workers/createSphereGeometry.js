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
define(["./defaultValue-135942ca","./Matrix3-edb29a7e","./EllipsoidGeometry-ba11d28b","./VertexFormat-7d5b4d7e","./Math-a304e2d6","./Transforms-3ea76111","./Matrix2-7a2bab7e","./RuntimeError-f0dada00","./combine-462d91dd","./ComponentDatatype-e86a9f87","./WebGLConstants-fcb70ee3","./GeometryAttribute-dacddb3f","./GeometryAttributes-899f8bd0","./GeometryOffsetAttribute-d3a42805","./IndexDatatype-3a8ea78f"],(function(e,t,i,r,a,o,n,s,d,c,l,m,u,p,y){"use strict";function f(r){const a=e.defaultValue(r.radius,1),o={radii:new t.Cartesian3(a,a,a),stackPartitions:r.stackPartitions,slicePartitions:r.slicePartitions,vertexFormat:r.vertexFormat};this._ellipsoidGeometry=new i.EllipsoidGeometry(o),this._workerName="createSphereGeometry"}f.packedLength=i.EllipsoidGeometry.packedLength,f.pack=function(e,t,r){return i.EllipsoidGeometry.pack(e._ellipsoidGeometry,t,r)};const G=new i.EllipsoidGeometry,b={radius:void 0,radii:new t.Cartesian3,vertexFormat:new r.VertexFormat,stackPartitions:void 0,slicePartitions:void 0};return f.unpack=function(a,o,n){const s=i.EllipsoidGeometry.unpack(a,o,G);return b.vertexFormat=r.VertexFormat.clone(s._vertexFormat,b.vertexFormat),b.stackPartitions=s._stackPartitions,b.slicePartitions=s._slicePartitions,e.defined(n)?(t.Cartesian3.clone(s._radii,b.radii),n._ellipsoidGeometry=new i.EllipsoidGeometry(b),n):(b.radius=s._radii.x,new f(b))},f.createGeometry=function(e){return i.EllipsoidGeometry.createGeometry(e._ellipsoidGeometry)},function(t,i){return e.defined(i)&&(t=f.unpack(t,i)),f.createGeometry(t)}}));
