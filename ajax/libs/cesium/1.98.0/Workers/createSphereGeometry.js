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
define(["./defaultValue-50f7432c","./Matrix2-7dfd434a","./EllipsoidGeometry-25d5714a","./VertexFormat-fa0c27e8","./ComponentDatatype-9b23164a","./WebGLConstants-58abc51a","./RuntimeError-48e1f06d","./Transforms-f305a473","./combine-8462e002","./GeometryAttribute-4d82fade","./GeometryAttributes-8bab1b25","./GeometryOffsetAttribute-490bc2c9","./IndexDatatype-ceed713e"],(function(e,t,i,r,o,a,n,s,c,d,l,m,u){"use strict";function p(r){const o=e.defaultValue(r.radius,1),a={radii:new t.Cartesian3(o,o,o),stackPartitions:r.stackPartitions,slicePartitions:r.slicePartitions,vertexFormat:r.vertexFormat};this._ellipsoidGeometry=new i.EllipsoidGeometry(a),this._workerName="createSphereGeometry"}p.packedLength=i.EllipsoidGeometry.packedLength,p.pack=function(e,t,r){return i.EllipsoidGeometry.pack(e._ellipsoidGeometry,t,r)};const y=new i.EllipsoidGeometry,f={radius:void 0,radii:new t.Cartesian3,vertexFormat:new r.VertexFormat,stackPartitions:void 0,slicePartitions:void 0};return p.unpack=function(o,a,n){const s=i.EllipsoidGeometry.unpack(o,a,y);return f.vertexFormat=r.VertexFormat.clone(s._vertexFormat,f.vertexFormat),f.stackPartitions=s._stackPartitions,f.slicePartitions=s._slicePartitions,e.defined(n)?(t.Cartesian3.clone(s._radii,f.radii),n._ellipsoidGeometry=new i.EllipsoidGeometry(f),n):(f.radius=s._radii.x,new p(f))},p.createGeometry=function(e){return i.EllipsoidGeometry.createGeometry(e._ellipsoidGeometry)},function(t,i){return e.defined(i)&&(t=p.unpack(t,i)),p.createGeometry(t)}}));
