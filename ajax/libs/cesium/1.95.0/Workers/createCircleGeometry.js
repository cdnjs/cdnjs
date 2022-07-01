/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.95
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
define(["./Matrix2-73789715","./RuntimeError-4f8ec8a2","./defaultValue-97284df2","./EllipseGeometry-e6f948bb","./VertexFormat-9886cb81","./ComponentDatatype-e7fbe225","./WebGLConstants-6da700a2","./Transforms-d3d3b2a9","./_commonjsHelpers-3aae1032-65601a27","./combine-d11b1f00","./EllipseGeometryLibrary-0adcaeed","./GeometryAttribute-fd1d7e90","./GeometryAttributes-734a3446","./GeometryInstance-4bfcfe78","./GeometryOffsetAttribute-59b14f45","./GeometryPipeline-a847e31f","./AttributeCompression-5744d52e","./EncodedCartesian3-a9a8a281","./IndexDatatype-65271ba3","./IntersectionTests-33ace2d6","./Plane-e916220d"],(function(e,t,i,r,o,n,a,s,l,d,m,u,c,p,y,_,G,x,h,f,g){"use strict";function E(e){const t=(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).radius,o={center:e.center,semiMajorAxis:t,semiMinorAxis:t,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,vertexFormat:e.vertexFormat,stRotation:e.stRotation,shadowVolume:e.shadowVolume};this._ellipseGeometry=new r.EllipseGeometry(o),this._workerName="createCircleGeometry"}E.packedLength=r.EllipseGeometry.packedLength,E.pack=function(e,t,i){return r.EllipseGeometry.pack(e._ellipseGeometry,t,i)};const b=new r.EllipseGeometry({center:new e.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),w={center:new e.Cartesian3,radius:void 0,ellipsoid:e.Ellipsoid.clone(e.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,vertexFormat:new o.VertexFormat,stRotation:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0,shadowVolume:void 0};return E.unpack=function(t,n,a){const s=r.EllipseGeometry.unpack(t,n,b);return w.center=e.Cartesian3.clone(s._center,w.center),w.ellipsoid=e.Ellipsoid.clone(s._ellipsoid,w.ellipsoid),w.height=s._height,w.extrudedHeight=s._extrudedHeight,w.granularity=s._granularity,w.vertexFormat=o.VertexFormat.clone(s._vertexFormat,w.vertexFormat),w.stRotation=s._stRotation,w.shadowVolume=s._shadowVolume,i.defined(a)?(w.semiMajorAxis=s._semiMajorAxis,w.semiMinorAxis=s._semiMinorAxis,a._ellipseGeometry=new r.EllipseGeometry(w),a):(w.radius=s._semiMajorAxis,new E(w))},E.createGeometry=function(e){return r.EllipseGeometry.createGeometry(e._ellipseGeometry)},E.createShadowVolume=function(e,t,i){const r=e._ellipseGeometry._granularity,n=e._ellipseGeometry._ellipsoid,a=t(r,n),s=i(r,n);return new E({center:e._ellipseGeometry._center,radius:e._ellipseGeometry._semiMajorAxis,ellipsoid:n,stRotation:e._ellipseGeometry._stRotation,granularity:r,extrudedHeight:a,height:s,vertexFormat:o.VertexFormat.POSITION_ONLY,shadowVolume:!0})},Object.defineProperties(E.prototype,{rectangle:{get:function(){return this._ellipseGeometry.rectangle}},textureCoordinateRotationPoints:{get:function(){return this._ellipseGeometry.textureCoordinateRotationPoints}}}),function(t,r){return i.defined(r)&&(t=E.unpack(t,r)),t._ellipseGeometry._center=e.Cartesian3.clone(t._ellipseGeometry._center),t._ellipseGeometry._ellipsoid=e.Ellipsoid.clone(t._ellipseGeometry._ellipsoid),E.createGeometry(t)}}));
