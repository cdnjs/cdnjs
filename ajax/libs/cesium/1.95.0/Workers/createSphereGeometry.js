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
define(["./defaultValue-97284df2","./Matrix2-73789715","./RuntimeError-4f8ec8a2","./EllipsoidGeometry-539fb9e2","./VertexFormat-9886cb81","./ComponentDatatype-e7fbe225","./WebGLConstants-6da700a2","./Transforms-d3d3b2a9","./_commonjsHelpers-3aae1032-65601a27","./combine-d11b1f00","./GeometryAttribute-fd1d7e90","./GeometryAttributes-734a3446","./GeometryOffsetAttribute-59b14f45","./IndexDatatype-65271ba3"],(function(e,t,i,r,o,a,n,s,d,c,l,m,u,p){"use strict";function f(i){const o=e.defaultValue(i.radius,1),a={radii:new t.Cartesian3(o,o,o),stackPartitions:i.stackPartitions,slicePartitions:i.slicePartitions,vertexFormat:i.vertexFormat};this._ellipsoidGeometry=new r.EllipsoidGeometry(a),this._workerName="createSphereGeometry"}f.packedLength=r.EllipsoidGeometry.packedLength,f.pack=function(e,t,i){return r.EllipsoidGeometry.pack(e._ellipsoidGeometry,t,i)};const y=new r.EllipsoidGeometry,G={radius:void 0,radii:new t.Cartesian3,vertexFormat:new o.VertexFormat,stackPartitions:void 0,slicePartitions:void 0};return f.unpack=function(i,a,n){const s=r.EllipsoidGeometry.unpack(i,a,y);return G.vertexFormat=o.VertexFormat.clone(s._vertexFormat,G.vertexFormat),G.stackPartitions=s._stackPartitions,G.slicePartitions=s._slicePartitions,e.defined(n)?(t.Cartesian3.clone(s._radii,G.radii),n._ellipsoidGeometry=new r.EllipsoidGeometry(G),n):(G.radius=s._radii.x,new f(G))},f.createGeometry=function(e){return r.EllipsoidGeometry.createGeometry(e._ellipsoidGeometry)},function(t,i){return e.defined(i)&&(t=f.unpack(t,i)),f.createGeometry(t)}}));
