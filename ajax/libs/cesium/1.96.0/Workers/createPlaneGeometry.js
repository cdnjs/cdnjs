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
define(["./defaultValue-4607806f","./Transforms-c450597e","./Matrix2-21f90abf","./RuntimeError-cef79f54","./ComponentDatatype-4028c72d","./GeometryAttribute-3c090c07","./GeometryAttributes-acac33d2","./VertexFormat-75e8069c","./_commonjsHelpers-a32ac251","./combine-fc59ba59","./WebGLConstants-f100e3dd"],(function(e,t,n,r,a,o,i,m,c,u,p){"use strict";function s(t){t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT);const n=e.defaultValue(t.vertexFormat,m.VertexFormat.DEFAULT);this._vertexFormat=n,this._workerName="createPlaneGeometry"}s.packedLength=m.VertexFormat.packedLength,s.pack=function(t,n,r){return r=e.defaultValue(r,0),m.VertexFormat.pack(t._vertexFormat,n,r),n};const y=new m.VertexFormat,f={vertexFormat:y};s.unpack=function(t,n,r){n=e.defaultValue(n,0);const a=m.VertexFormat.unpack(t,n,y);return e.defined(r)?(r._vertexFormat=m.VertexFormat.clone(a,r._vertexFormat),r):new s(f)};const l=new n.Cartesian3(-.5,-.5,0),A=new n.Cartesian3(.5,.5,0);return s.createGeometry=function(e){const r=e._vertexFormat,m=new i.GeometryAttributes;let c,u;if(r.position){if(u=new Float64Array(12),u[0]=l.x,u[1]=l.y,u[2]=0,u[3]=A.x,u[4]=l.y,u[5]=0,u[6]=A.x,u[7]=A.y,u[8]=0,u[9]=l.x,u[10]=A.y,u[11]=0,m.position=new o.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:u}),r.normal){const e=new Float32Array(12);e[0]=0,e[1]=0,e[2]=1,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=1,e[9]=0,e[10]=0,e[11]=1,m.normal=new o.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e})}if(r.st){const e=new Float32Array(8);e[0]=0,e[1]=0,e[2]=1,e[3]=0,e[4]=1,e[5]=1,e[6]=0,e[7]=1,m.st=new o.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:e})}if(r.tangent){const e=new Float32Array(12);e[0]=1,e[1]=0,e[2]=0,e[3]=1,e[4]=0,e[5]=0,e[6]=1,e[7]=0,e[8]=0,e[9]=1,e[10]=0,e[11]=0,m.tangent=new o.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e})}if(r.bitangent){const e=new Float32Array(12);e[0]=0,e[1]=1,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=1,e[8]=0,e[9]=0,e[10]=1,e[11]=0,m.bitangent=new o.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e})}c=new Uint16Array(6),c[0]=0,c[1]=1,c[2]=2,c[3]=0,c[4]=2,c[5]=3}return new o.Geometry({attributes:m,indices:c,primitiveType:o.PrimitiveType.TRIANGLES,boundingSphere:new t.BoundingSphere(n.Cartesian3.ZERO,Math.sqrt(2))})},function(t,n){return e.defined(n)&&(t=s.unpack(t,n)),s.createGeometry(t)}}));
