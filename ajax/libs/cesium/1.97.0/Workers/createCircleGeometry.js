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
define(["./Matrix2-276d97d2","./defaultValue-a6eb9f34","./EllipseGeometry-84768225","./VertexFormat-31cdbccc","./ComponentDatatype-7f6d9570","./WebGLConstants-d81b330d","./RuntimeError-07496d94","./Transforms-0c3fa360","./_commonjsHelpers-89c9b271","./combine-7cf28d88","./EllipseGeometryLibrary-65924704","./GeometryAttribute-54019f82","./GeometryAttributes-aff51037","./GeometryInstance-52eaddec","./GeometryOffsetAttribute-102da468","./GeometryPipeline-f46d7519","./AttributeCompression-28a6d524","./EncodedCartesian3-32c625e4","./IndexDatatype-856d3a0c","./IntersectionTests-fbcff83c","./Plane-17fe9d66"],(function(e,t,i,r,o,n,s,l,a,d,m,c,u,p,y,_,G,x,f,h,g){"use strict";function E(e){const r=(e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT)).radius,o={center:e.center,semiMajorAxis:r,semiMinorAxis:r,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,vertexFormat:e.vertexFormat,stRotation:e.stRotation,shadowVolume:e.shadowVolume};this._ellipseGeometry=new i.EllipseGeometry(o),this._workerName="createCircleGeometry"}E.packedLength=i.EllipseGeometry.packedLength,E.pack=function(e,t,r){return i.EllipseGeometry.pack(e._ellipseGeometry,t,r)};const w=new i.EllipseGeometry({center:new e.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),A={center:new e.Cartesian3,radius:void 0,ellipsoid:e.Ellipsoid.clone(e.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,vertexFormat:new r.VertexFormat,stRotation:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0,shadowVolume:void 0};return E.unpack=function(o,n,s){const l=i.EllipseGeometry.unpack(o,n,w);return A.center=e.Cartesian3.clone(l._center,A.center),A.ellipsoid=e.Ellipsoid.clone(l._ellipsoid,A.ellipsoid),A.height=l._height,A.extrudedHeight=l._extrudedHeight,A.granularity=l._granularity,A.vertexFormat=r.VertexFormat.clone(l._vertexFormat,A.vertexFormat),A.stRotation=l._stRotation,A.shadowVolume=l._shadowVolume,t.defined(s)?(A.semiMajorAxis=l._semiMajorAxis,A.semiMinorAxis=l._semiMinorAxis,s._ellipseGeometry=new i.EllipseGeometry(A),s):(A.radius=l._semiMajorAxis,new E(A))},E.createGeometry=function(e){return i.EllipseGeometry.createGeometry(e._ellipseGeometry)},E.createShadowVolume=function(e,t,i){const o=e._ellipseGeometry._granularity,n=e._ellipseGeometry._ellipsoid,s=t(o,n),l=i(o,n);return new E({center:e._ellipseGeometry._center,radius:e._ellipseGeometry._semiMajorAxis,ellipsoid:n,stRotation:e._ellipseGeometry._stRotation,granularity:o,extrudedHeight:s,height:l,vertexFormat:r.VertexFormat.POSITION_ONLY,shadowVolume:!0})},Object.defineProperties(E.prototype,{rectangle:{get:function(){return this._ellipseGeometry.rectangle}},textureCoordinateRotationPoints:{get:function(){return this._ellipseGeometry.textureCoordinateRotationPoints}}}),function(i,r){return t.defined(r)&&(i=E.unpack(i,r)),i._ellipseGeometry._center=e.Cartesian3.clone(i._ellipseGeometry._center),i._ellipseGeometry._ellipsoid=e.Ellipsoid.clone(i._ellipseGeometry._ellipsoid),E.createGeometry(i)}}));
