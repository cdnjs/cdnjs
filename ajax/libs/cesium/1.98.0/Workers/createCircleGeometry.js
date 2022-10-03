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
define(["./Matrix2-7dfd434a","./defaultValue-50f7432c","./EllipseGeometry-464c6a37","./VertexFormat-fa0c27e8","./ComponentDatatype-9b23164a","./WebGLConstants-58abc51a","./RuntimeError-48e1f06d","./Transforms-f305a473","./combine-8462e002","./EllipseGeometryLibrary-f9538b0a","./GeometryAttribute-4d82fade","./GeometryAttributes-8bab1b25","./GeometryInstance-9e499d64","./GeometryOffsetAttribute-490bc2c9","./GeometryPipeline-33e32ecb","./AttributeCompression-aa7855e7","./EncodedCartesian3-5efd45c3","./IndexDatatype-ceed713e","./IntersectionTests-4a7694f7","./Plane-3d30b188"],(function(e,t,i,r,o,n,s,a,l,d,m,c,u,p,y,_,G,x,h,f){"use strict";function g(e){const r=(e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT)).radius,o={center:e.center,semiMajorAxis:r,semiMinorAxis:r,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,vertexFormat:e.vertexFormat,stRotation:e.stRotation,shadowVolume:e.shadowVolume};this._ellipseGeometry=new i.EllipseGeometry(o),this._workerName="createCircleGeometry"}g.packedLength=i.EllipseGeometry.packedLength,g.pack=function(e,t,r){return i.EllipseGeometry.pack(e._ellipseGeometry,t,r)};const E=new i.EllipseGeometry({center:new e.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),b={center:new e.Cartesian3,radius:void 0,ellipsoid:e.Ellipsoid.clone(e.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,vertexFormat:new r.VertexFormat,stRotation:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0,shadowVolume:void 0};return g.unpack=function(o,n,s){const a=i.EllipseGeometry.unpack(o,n,E);return b.center=e.Cartesian3.clone(a._center,b.center),b.ellipsoid=e.Ellipsoid.clone(a._ellipsoid,b.ellipsoid),b.height=a._height,b.extrudedHeight=a._extrudedHeight,b.granularity=a._granularity,b.vertexFormat=r.VertexFormat.clone(a._vertexFormat,b.vertexFormat),b.stRotation=a._stRotation,b.shadowVolume=a._shadowVolume,t.defined(s)?(b.semiMajorAxis=a._semiMajorAxis,b.semiMinorAxis=a._semiMinorAxis,s._ellipseGeometry=new i.EllipseGeometry(b),s):(b.radius=a._semiMajorAxis,new g(b))},g.createGeometry=function(e){return i.EllipseGeometry.createGeometry(e._ellipseGeometry)},g.createShadowVolume=function(e,t,i){const o=e._ellipseGeometry._granularity,n=e._ellipseGeometry._ellipsoid,s=t(o,n),a=i(o,n);return new g({center:e._ellipseGeometry._center,radius:e._ellipseGeometry._semiMajorAxis,ellipsoid:n,stRotation:e._ellipseGeometry._stRotation,granularity:o,extrudedHeight:s,height:a,vertexFormat:r.VertexFormat.POSITION_ONLY,shadowVolume:!0})},Object.defineProperties(g.prototype,{rectangle:{get:function(){return this._ellipseGeometry.rectangle}},textureCoordinateRotationPoints:{get:function(){return this._ellipseGeometry.textureCoordinateRotationPoints}}}),function(i,r){return t.defined(r)&&(i=g.unpack(i,r)),i._ellipseGeometry._center=e.Cartesian3.clone(i._ellipseGeometry._center),i._ellipseGeometry._ellipsoid=e.Ellipsoid.clone(i._ellipseGeometry._ellipsoid),g.createGeometry(i)}}));
