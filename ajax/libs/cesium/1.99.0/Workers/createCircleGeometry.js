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
define(["./Matrix3-edb29a7e","./defaultValue-135942ca","./EllipseGeometry-4118825e","./VertexFormat-7d5b4d7e","./Math-a304e2d6","./Transforms-3ea76111","./Matrix2-7a2bab7e","./RuntimeError-f0dada00","./combine-462d91dd","./ComponentDatatype-e86a9f87","./WebGLConstants-fcb70ee3","./EllipseGeometryLibrary-d955e650","./GeometryAttribute-dacddb3f","./GeometryAttributes-899f8bd0","./GeometryInstance-1aacc2fb","./GeometryOffsetAttribute-d3a42805","./GeometryPipeline-7cd8f832","./AttributeCompression-5b18be52","./EncodedCartesian3-bf4e5ec3","./IndexDatatype-3a8ea78f","./IntersectionTests-f3382f21","./Plane-5bea24eb"],(function(e,t,i,r,o,a,n,s,l,d,m,c,u,p,y,_,x,G,h,f,g,b){"use strict";function E(e){const r=(e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT)).radius,o={center:e.center,semiMajorAxis:r,semiMinorAxis:r,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,vertexFormat:e.vertexFormat,stRotation:e.stRotation,shadowVolume:e.shadowVolume};this._ellipseGeometry=new i.EllipseGeometry(o),this._workerName="createCircleGeometry"}E.packedLength=i.EllipseGeometry.packedLength,E.pack=function(e,t,r){return i.EllipseGeometry.pack(e._ellipseGeometry,t,r)};const w=new i.EllipseGeometry({center:new e.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),A={center:new e.Cartesian3,radius:void 0,ellipsoid:e.Ellipsoid.clone(e.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,vertexFormat:new r.VertexFormat,stRotation:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0,shadowVolume:void 0};return E.unpack=function(o,a,n){const s=i.EllipseGeometry.unpack(o,a,w);return A.center=e.Cartesian3.clone(s._center,A.center),A.ellipsoid=e.Ellipsoid.clone(s._ellipsoid,A.ellipsoid),A.height=s._height,A.extrudedHeight=s._extrudedHeight,A.granularity=s._granularity,A.vertexFormat=r.VertexFormat.clone(s._vertexFormat,A.vertexFormat),A.stRotation=s._stRotation,A.shadowVolume=s._shadowVolume,t.defined(n)?(A.semiMajorAxis=s._semiMajorAxis,A.semiMinorAxis=s._semiMinorAxis,n._ellipseGeometry=new i.EllipseGeometry(A),n):(A.radius=s._semiMajorAxis,new E(A))},E.createGeometry=function(e){return i.EllipseGeometry.createGeometry(e._ellipseGeometry)},E.createShadowVolume=function(e,t,i){const o=e._ellipseGeometry._granularity,a=e._ellipseGeometry._ellipsoid,n=t(o,a),s=i(o,a);return new E({center:e._ellipseGeometry._center,radius:e._ellipseGeometry._semiMajorAxis,ellipsoid:a,stRotation:e._ellipseGeometry._stRotation,granularity:o,extrudedHeight:n,height:s,vertexFormat:r.VertexFormat.POSITION_ONLY,shadowVolume:!0})},Object.defineProperties(E.prototype,{rectangle:{get:function(){return this._ellipseGeometry.rectangle}},textureCoordinateRotationPoints:{get:function(){return this._ellipseGeometry.textureCoordinateRotationPoints}}}),function(i,r){return t.defined(r)&&(i=E.unpack(i,r)),i._ellipseGeometry._center=e.Cartesian3.clone(i._ellipseGeometry._center),i._ellipseGeometry._ellipsoid=e.Ellipsoid.clone(i._ellipseGeometry._ellipsoid),E.createGeometry(i)}}));
