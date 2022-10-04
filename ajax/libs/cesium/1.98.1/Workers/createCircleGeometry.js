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
define(["./Matrix2-c339372d","./defaultValue-65031fc5","./EllipseGeometry-d0527fc5","./VertexFormat-2b3ad79f","./ComponentDatatype-1b227f17","./WebGLConstants-f5c279b9","./RuntimeError-23f4777c","./Transforms-a48d25e5","./combine-96aed74b","./EllipseGeometryLibrary-53ed4539","./GeometryAttribute-5db26912","./GeometryAttributes-f9b563d6","./GeometryInstance-ee0e4b25","./GeometryOffsetAttribute-026030ef","./GeometryPipeline-7e799ed5","./AttributeCompression-9d180a12","./EncodedCartesian3-4e907eba","./IndexDatatype-53de8b23","./IntersectionTests-87344d12","./Plane-3d182a08"],(function(e,t,i,r,o,n,s,l,a,d,m,u,c,p,y,_,G,x,h,f){"use strict";function g(e){const r=(e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT)).radius,o={center:e.center,semiMajorAxis:r,semiMinorAxis:r,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,vertexFormat:e.vertexFormat,stRotation:e.stRotation,shadowVolume:e.shadowVolume};this._ellipseGeometry=new i.EllipseGeometry(o),this._workerName="createCircleGeometry"}g.packedLength=i.EllipseGeometry.packedLength,g.pack=function(e,t,r){return i.EllipseGeometry.pack(e._ellipseGeometry,t,r)};const E=new i.EllipseGeometry({center:new e.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),b={center:new e.Cartesian3,radius:void 0,ellipsoid:e.Ellipsoid.clone(e.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,vertexFormat:new r.VertexFormat,stRotation:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0,shadowVolume:void 0};return g.unpack=function(o,n,s){const l=i.EllipseGeometry.unpack(o,n,E);return b.center=e.Cartesian3.clone(l._center,b.center),b.ellipsoid=e.Ellipsoid.clone(l._ellipsoid,b.ellipsoid),b.height=l._height,b.extrudedHeight=l._extrudedHeight,b.granularity=l._granularity,b.vertexFormat=r.VertexFormat.clone(l._vertexFormat,b.vertexFormat),b.stRotation=l._stRotation,b.shadowVolume=l._shadowVolume,t.defined(s)?(b.semiMajorAxis=l._semiMajorAxis,b.semiMinorAxis=l._semiMinorAxis,s._ellipseGeometry=new i.EllipseGeometry(b),s):(b.radius=l._semiMajorAxis,new g(b))},g.createGeometry=function(e){return i.EllipseGeometry.createGeometry(e._ellipseGeometry)},g.createShadowVolume=function(e,t,i){const o=e._ellipseGeometry._granularity,n=e._ellipseGeometry._ellipsoid,s=t(o,n),l=i(o,n);return new g({center:e._ellipseGeometry._center,radius:e._ellipseGeometry._semiMajorAxis,ellipsoid:n,stRotation:e._ellipseGeometry._stRotation,granularity:o,extrudedHeight:s,height:l,vertexFormat:r.VertexFormat.POSITION_ONLY,shadowVolume:!0})},Object.defineProperties(g.prototype,{rectangle:{get:function(){return this._ellipseGeometry.rectangle}},textureCoordinateRotationPoints:{get:function(){return this._ellipseGeometry.textureCoordinateRotationPoints}}}),function(i,r){return t.defined(r)&&(i=g.unpack(i,r)),i._ellipseGeometry._center=e.Cartesian3.clone(i._ellipseGeometry._center),i._ellipseGeometry._ellipsoid=e.Ellipsoid.clone(i._ellipseGeometry._ellipsoid),g.createGeometry(i)}}));
