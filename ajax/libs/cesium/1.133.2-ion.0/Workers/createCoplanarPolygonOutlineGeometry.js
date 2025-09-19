/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.133.2-ion
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

import{a as T}from"./chunk-KKRZDRDD.js";import"./chunk-CUN7HNSF.js";import{a as l}from"./chunk-Q4DUZIQQ.js";import"./chunk-B7GDZKP2.js";import{a as G}from"./chunk-UM6QKLQT.js";import{a as C}from"./chunk-SBJTXTAO.js";import"./chunk-2N2RO25V.js";import"./chunk-ELCPRNMJ.js";import"./chunk-B5JVNZ6X.js";import"./chunk-45N6CEJL.js";import"./chunk-ZMJH4UCL.js";import{a as L}from"./chunk-LNE6JY2A.js";import"./chunk-PP3CGLHX.js";import"./chunk-RP6DOGRE.js";import"./chunk-Y2RUKWF7.js";import{a as w}from"./chunk-ESW6N4CQ.js";import{a as O}from"./chunk-UO4AJBYQ.js";import{b,c as d,d as k}from"./chunk-L2VFAALJ.js";import{d as P}from"./chunk-HAPJABUW.js";import"./chunk-QQI5RDP2.js";import{a as H}from"./chunk-A5OP3JWK.js";import{a as y,d as g,f as u}from"./chunk-XTYEZDFN.js";import"./chunk-6JOD3B67.js";import"./chunk-HFDVXG5T.js";import"./chunk-XPE5Q2QP.js";import{b as m}from"./chunk-PRG7B6GH.js";import{e as f}from"./chunk-2AILX433.js";function E(o){let e=o.length,t=new Float64Array(e*3),i=w.createTypedArray(e,e*2),r=0,a=0;for(let n=0;n<e;n++){let p=o[n];t[r++]=p.x,t[r++]=p.y,t[r++]=p.z,i[a++]=n,i[a++]=(n+1)%e}let s=new O({position:new k({componentDatatype:H.DOUBLE,componentsPerAttribute:3,values:t})});return new d({attributes:s,indices:i,primitiveType:b.LINES})}function c(o){o=o??u.EMPTY_OBJECT;let e=o.polygonHierarchy;m.defined("options.polygonHierarchy",e),this._polygonHierarchy=e,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=l.computeHierarchyPackedLength(e,y)+1}c.fromPositions=function(o){o=o??u.EMPTY_OBJECT,m.defined("options.positions",o.positions);let e={polygonHierarchy:{positions:o.positions}};return new c(e)};c.pack=function(o,e,t){return m.typeOf.object("value",o),m.defined("array",e),t=t??0,t=l.packPolygonHierarchy(o._polygonHierarchy,e,t,y),e[t]=o.packedLength,e};var v={polygonHierarchy:{}};c.unpack=function(o,e,t){m.defined("array",o),e=e??0;let i=l.unpackPolygonHierarchy(o,e,y);e=i.startingIndex,delete i.startingIndex;let r=o[e];return f(t)||(t=new c(v)),t._polygonHierarchy=i,t.packedLength=r,t};c.createGeometry=function(o){let e=o._polygonHierarchy,t=e.positions;if(t=L(t,y.equalsEpsilon,!0),t.length<3||!T.validOutline(t))return;let r=l.polygonOutlinesFromHierarchy(e,!1);if(r.length===0)return;let a=[];for(let p=0;p<r.length;p++){let _=new G({geometry:E(r[p])});a.push(_)}let s=C.combineInstances(a)[0],n=P.fromPoints(e.positions);return new d({attributes:s.attributes,indices:s.indices,primitiveType:s.primitiveType,boundingSphere:n})};var h=c;function A(o,e){return f(e)&&(o=h.unpack(o,e)),o._ellipsoid=g.clone(o._ellipsoid),h.createGeometry(o)}var Z=A;export{Z as default};
