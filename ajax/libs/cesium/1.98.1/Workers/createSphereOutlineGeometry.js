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
define(["./defaultValue-65031fc5","./Matrix2-c339372d","./EllipsoidOutlineGeometry-8ef5964a","./ComponentDatatype-1b227f17","./WebGLConstants-f5c279b9","./RuntimeError-23f4777c","./Transforms-a48d25e5","./combine-96aed74b","./GeometryAttribute-5db26912","./GeometryAttributes-f9b563d6","./GeometryOffsetAttribute-026030ef","./IndexDatatype-53de8b23"],(function(e,i,t,n,o,r,s,a,d,l,u,c){"use strict";function m(n){const o=e.defaultValue(n.radius,1),r={radii:new i.Cartesian3(o,o,o),stackPartitions:n.stackPartitions,slicePartitions:n.slicePartitions,subdivisions:n.subdivisions};this._ellipsoidGeometry=new t.EllipsoidOutlineGeometry(r),this._workerName="createSphereOutlineGeometry"}m.packedLength=t.EllipsoidOutlineGeometry.packedLength,m.pack=function(e,i,n){return t.EllipsoidOutlineGeometry.pack(e._ellipsoidGeometry,i,n)};const p=new t.EllipsoidOutlineGeometry,f={radius:void 0,radii:new i.Cartesian3,stackPartitions:void 0,slicePartitions:void 0,subdivisions:void 0};return m.unpack=function(n,o,r){const s=t.EllipsoidOutlineGeometry.unpack(n,o,p);return f.stackPartitions=s._stackPartitions,f.slicePartitions=s._slicePartitions,f.subdivisions=s._subdivisions,e.defined(r)?(i.Cartesian3.clone(s._radii,f.radii),r._ellipsoidGeometry=new t.EllipsoidOutlineGeometry(f),r):(f.radius=s._radii.x,new m(f))},m.createGeometry=function(e){return t.EllipsoidOutlineGeometry.createGeometry(e._ellipsoidGeometry)},function(i,t){return e.defined(t)&&(i=m.unpack(i,t)),m.createGeometry(i)}}));
