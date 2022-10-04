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
define(["exports","./Matrix2-c339372d","./defaultValue-65031fc5","./WebGLConstants-f5c279b9","./Transforms-a48d25e5"],(function(t,e,n,a,r){"use strict";var i=Object.freeze({NONE:0,TRIANGLES:1,LINES:2,POLYLINES:3});const o={POINTS:a.WebGLConstants.POINTS,LINES:a.WebGLConstants.LINES,LINE_LOOP:a.WebGLConstants.LINE_LOOP,LINE_STRIP:a.WebGLConstants.LINE_STRIP,TRIANGLES:a.WebGLConstants.TRIANGLES,TRIANGLE_STRIP:a.WebGLConstants.TRIANGLE_STRIP,TRIANGLE_FAN:a.WebGLConstants.TRIANGLE_FAN,isLines:function(t){return t===o.LINES||t===o.LINE_LOOP||t===o.LINE_STRIP},isTriangles:function(t){return t===o.TRIANGLES||t===o.TRIANGLE_STRIP||t===o.TRIANGLE_FAN},validate:function(t){return t===o.POINTS||t===o.LINES||t===o.LINE_LOOP||t===o.LINE_STRIP||t===o.TRIANGLES||t===o.TRIANGLE_STRIP||t===o.TRIANGLE_FAN}};var s=Object.freeze(o);function u(t){t=n.defaultValue(t,n.defaultValue.EMPTY_OBJECT),this.attributes=t.attributes,this.indices=t.indices,this.primitiveType=n.defaultValue(t.primitiveType,s.TRIANGLES),this.boundingSphere=t.boundingSphere,this.geometryType=n.defaultValue(t.geometryType,i.NONE),this.boundingSphereCV=t.boundingSphereCV,this.offsetAttribute=t.offsetAttribute}u.computeNumberOfVertices=function(t){let e=-1;for(const a in t.attributes)if(t.attributes.hasOwnProperty(a)&&n.defined(t.attributes[a])&&n.defined(t.attributes[a].values)){const n=t.attributes[a];e=n.values.length/n.componentsPerAttribute}return e};const I=new e.Cartographic,N=new e.Cartesian3,c=new e.Matrix4,T=[new e.Cartographic,new e.Cartographic,new e.Cartographic],l=[new e.Cartesian2,new e.Cartesian2,new e.Cartesian2],L=[new e.Cartesian2,new e.Cartesian2,new e.Cartesian2],E=new e.Cartesian3,f=new r.Quaternion,p=new e.Matrix4,m=new e.Matrix2;u._textureCoordinateRotationPoints=function(t,n,a,i){let o;const s=e.Rectangle.center(i,I),u=e.Cartographic.toCartesian(s,a,N),y=r.Transforms.eastNorthUpToFixedFrame(u,a,c),b=e.Matrix4.inverse(y,c),C=l,h=T;h[0].longitude=i.west,h[0].latitude=i.south,h[1].longitude=i.west,h[1].latitude=i.north,h[2].longitude=i.east,h[2].latitude=i.south;let A=E;for(o=0;o<3;o++)e.Cartographic.toCartesian(h[o],a,A),A=e.Matrix4.multiplyByPointAsVector(b,A,A),C[o].x=A.x,C[o].y=A.y;const d=r.Quaternion.fromAxisAngle(e.Cartesian3.UNIT_Z,-n,f),x=e.Matrix3.fromQuaternion(d,p),S=t.length;let P=Number.POSITIVE_INFINITY,G=Number.POSITIVE_INFINITY,R=Number.NEGATIVE_INFINITY,_=Number.NEGATIVE_INFINITY;for(o=0;o<S;o++)A=e.Matrix4.multiplyByPointAsVector(b,t[o],A),A=e.Matrix3.multiplyByVector(x,A,A),P=Math.min(P,A.x),G=Math.min(G,A.y),R=Math.max(R,A.x),_=Math.max(_,A.y);const O=e.Matrix2.fromRotation(n,m),g=L;g[0].x=P,g[0].y=G,g[1].x=P,g[1].y=_,g[2].x=R,g[2].y=G;const w=C[0],V=C[2].x-w.x,M=C[1].y-w.y;for(o=0;o<3;o++){const t=g[o];e.Matrix2.multiplyByVector(O,t,t),t.x=(t.x-w.x)/V,t.y=(t.y-w.y)/M}const v=g[0],F=g[1],W=g[2],Y=new Array(6);return e.Cartesian2.pack(v,Y),e.Cartesian2.pack(F,Y,2),e.Cartesian2.pack(W,Y,4),Y},t.Geometry=u,t.GeometryAttribute=function(t){t=n.defaultValue(t,n.defaultValue.EMPTY_OBJECT),this.componentDatatype=t.componentDatatype,this.componentsPerAttribute=t.componentsPerAttribute,this.normalize=n.defaultValue(t.normalize,!1),this.values=t.values},t.GeometryType=i,t.PrimitiveType=s}));
