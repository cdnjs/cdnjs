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
define(["./defaultValue-50f7432c","./Transforms-f305a473","./Matrix2-7dfd434a","./ComponentDatatype-9b23164a","./GeometryAttribute-4d82fade","./GeometryAttributes-8bab1b25","./VertexFormat-fa0c27e8","./combine-8462e002","./RuntimeError-48e1f06d","./WebGLConstants-58abc51a"],(function(t,e,n,r,a,o,i,m,u,c){"use strict";function p(e){e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT);const n=t.defaultValue(e.vertexFormat,i.VertexFormat.DEFAULT);this._vertexFormat=n,this._workerName="createPlaneGeometry"}p.packedLength=i.VertexFormat.packedLength,p.pack=function(e,n,r){return r=t.defaultValue(r,0),i.VertexFormat.pack(e._vertexFormat,n,r),n};const s=new i.VertexFormat,y={vertexFormat:s};p.unpack=function(e,n,r){n=t.defaultValue(n,0);const a=i.VertexFormat.unpack(e,n,s);return t.defined(r)?(r._vertexFormat=i.VertexFormat.clone(a,r._vertexFormat),r):new p(y)};const f=new n.Cartesian3(-.5,-.5,0),l=new n.Cartesian3(.5,.5,0);return p.createGeometry=function(t){const i=t._vertexFormat,m=new o.GeometryAttributes;let u,c;if(i.position){if(c=new Float64Array(12),c[0]=f.x,c[1]=f.y,c[2]=0,c[3]=l.x,c[4]=f.y,c[5]=0,c[6]=l.x,c[7]=l.y,c[8]=0,c[9]=f.x,c[10]=l.y,c[11]=0,m.position=new a.GeometryAttribute({componentDatatype:r.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:c}),i.normal){const t=new Float32Array(12);t[0]=0,t[1]=0,t[2]=1,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=1,t[9]=0,t[10]=0,t[11]=1,m.normal=new a.GeometryAttribute({componentDatatype:r.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:t})}if(i.st){const t=new Float32Array(8);t[0]=0,t[1]=0,t[2]=1,t[3]=0,t[4]=1,t[5]=1,t[6]=0,t[7]=1,m.st=new a.GeometryAttribute({componentDatatype:r.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:t})}if(i.tangent){const t=new Float32Array(12);t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t[6]=1,t[7]=0,t[8]=0,t[9]=1,t[10]=0,t[11]=0,m.tangent=new a.GeometryAttribute({componentDatatype:r.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:t})}if(i.bitangent){const t=new Float32Array(12);t[0]=0,t[1]=1,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=1,t[8]=0,t[9]=0,t[10]=1,t[11]=0,m.bitangent=new a.GeometryAttribute({componentDatatype:r.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:t})}u=new Uint16Array(6),u[0]=0,u[1]=1,u[2]=2,u[3]=0,u[4]=2,u[5]=3}return new a.Geometry({attributes:m,indices:u,primitiveType:a.PrimitiveType.TRIANGLES,boundingSphere:new e.BoundingSphere(n.Cartesian3.ZERO,Math.sqrt(2))})},function(e,n){return t.defined(n)&&(e=p.unpack(e,n)),p.createGeometry(e)}}));
