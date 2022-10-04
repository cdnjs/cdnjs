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
define(["./defaultValue-65031fc5","./Matrix2-c339372d","./EllipsoidGeometry-b5a8e7b1","./VertexFormat-2b3ad79f","./ComponentDatatype-1b227f17","./WebGLConstants-f5c279b9","./RuntimeError-23f4777c","./Transforms-a48d25e5","./combine-96aed74b","./GeometryAttribute-5db26912","./GeometryAttributes-f9b563d6","./GeometryOffsetAttribute-026030ef","./IndexDatatype-53de8b23"],(function(e,t,i,r,o,a,n,s,d,c,l,m,u){"use strict";function p(r){const o=e.defaultValue(r.radius,1),a={radii:new t.Cartesian3(o,o,o),stackPartitions:r.stackPartitions,slicePartitions:r.slicePartitions,vertexFormat:r.vertexFormat};this._ellipsoidGeometry=new i.EllipsoidGeometry(a),this._workerName="createSphereGeometry"}p.packedLength=i.EllipsoidGeometry.packedLength,p.pack=function(e,t,r){return i.EllipsoidGeometry.pack(e._ellipsoidGeometry,t,r)};const f=new i.EllipsoidGeometry,y={radius:void 0,radii:new t.Cartesian3,vertexFormat:new r.VertexFormat,stackPartitions:void 0,slicePartitions:void 0};return p.unpack=function(o,a,n){const s=i.EllipsoidGeometry.unpack(o,a,f);return y.vertexFormat=r.VertexFormat.clone(s._vertexFormat,y.vertexFormat),y.stackPartitions=s._stackPartitions,y.slicePartitions=s._slicePartitions,e.defined(n)?(t.Cartesian3.clone(s._radii,y.radii),n._ellipsoidGeometry=new i.EllipsoidGeometry(y),n):(y.radius=s._radii.x,new p(y))},p.createGeometry=function(e){return i.EllipsoidGeometry.createGeometry(e._ellipsoidGeometry)},function(t,i){return e.defined(i)&&(t=p.unpack(t,i)),p.createGeometry(t)}}));
