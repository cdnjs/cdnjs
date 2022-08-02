/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.96
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
define(["./Matrix2-21f90abf","./RuntimeError-cef79f54","./defaultValue-4607806f","./EllipseGeometry-f371dd78","./VertexFormat-75e8069c","./ComponentDatatype-4028c72d","./WebGLConstants-f100e3dd","./Transforms-c450597e","./_commonjsHelpers-a32ac251","./combine-fc59ba59","./EllipseGeometryLibrary-187266ea","./GeometryAttribute-3c090c07","./GeometryAttributes-acac33d2","./GeometryInstance-b34e2b9d","./GeometryOffsetAttribute-3e5f3e97","./GeometryPipeline-b9f29df3","./AttributeCompression-b8c8fcdc","./EncodedCartesian3-f98850c6","./IndexDatatype-20e78e57","./IntersectionTests-ef65540c","./Plane-1c5eb32d"],(function(e,t,i,r,o,n,s,l,a,d,m,c,u,p,y,_,G,f,x,h,g){"use strict";function E(e){const t=(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).radius,o={center:e.center,semiMajorAxis:t,semiMinorAxis:t,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,vertexFormat:e.vertexFormat,stRotation:e.stRotation,shadowVolume:e.shadowVolume};this._ellipseGeometry=new r.EllipseGeometry(o),this._workerName="createCircleGeometry"}E.packedLength=r.EllipseGeometry.packedLength,E.pack=function(e,t,i){return r.EllipseGeometry.pack(e._ellipseGeometry,t,i)};const w=new r.EllipseGeometry({center:new e.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),A={center:new e.Cartesian3,radius:void 0,ellipsoid:e.Ellipsoid.clone(e.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,vertexFormat:new o.VertexFormat,stRotation:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0,shadowVolume:void 0};return E.unpack=function(t,n,s){const l=r.EllipseGeometry.unpack(t,n,w);return A.center=e.Cartesian3.clone(l._center,A.center),A.ellipsoid=e.Ellipsoid.clone(l._ellipsoid,A.ellipsoid),A.height=l._height,A.extrudedHeight=l._extrudedHeight,A.granularity=l._granularity,A.vertexFormat=o.VertexFormat.clone(l._vertexFormat,A.vertexFormat),A.stRotation=l._stRotation,A.shadowVolume=l._shadowVolume,i.defined(s)?(A.semiMajorAxis=l._semiMajorAxis,A.semiMinorAxis=l._semiMinorAxis,s._ellipseGeometry=new r.EllipseGeometry(A),s):(A.radius=l._semiMajorAxis,new E(A))},E.createGeometry=function(e){return r.EllipseGeometry.createGeometry(e._ellipseGeometry)},E.createShadowVolume=function(e,t,i){const r=e._ellipseGeometry._granularity,n=e._ellipseGeometry._ellipsoid,s=t(r,n),l=i(r,n);return new E({center:e._ellipseGeometry._center,radius:e._ellipseGeometry._semiMajorAxis,ellipsoid:n,stRotation:e._ellipseGeometry._stRotation,granularity:r,extrudedHeight:s,height:l,vertexFormat:o.VertexFormat.POSITION_ONLY,shadowVolume:!0})},Object.defineProperties(E.prototype,{rectangle:{get:function(){return this._ellipseGeometry.rectangle}},textureCoordinateRotationPoints:{get:function(){return this._ellipseGeometry.textureCoordinateRotationPoints}}}),function(t,r){return i.defined(r)&&(t=E.unpack(t,r)),t._ellipseGeometry._center=e.Cartesian3.clone(t._ellipseGeometry._center),t._ellipseGeometry._ellipsoid=e.Ellipsoid.clone(t._ellipseGeometry._ellipsoid),E.createGeometry(t)}}));
