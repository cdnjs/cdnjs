/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.130.1
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

import{a as T}from"./chunk-GMDXIP2F.js";import"./chunk-UQ3ABODK.js";import{a as l}from"./chunk-OJD6C7EN.js";import"./chunk-PJQOB6JM.js";import{a as G}from"./chunk-6NNCMAGT.js";import{a as C}from"./chunk-X76FJHF4.js";import"./chunk-NYNUONZK.js";import"./chunk-5YCKGPZ3.js";import"./chunk-C7EXJG2O.js";import"./chunk-LM5DN6BS.js";import"./chunk-452MW5E6.js";import{a as L}from"./chunk-IOJRZZG4.js";import"./chunk-QF5X4OGE.js";import"./chunk-S3NLG5WM.js";import"./chunk-AAOMPF7M.js";import{a as w}from"./chunk-PFXLBIMV.js";import{a as O}from"./chunk-PSBTKXXJ.js";import{b,c as d,d as k}from"./chunk-UJOKCDQH.js";import{d as P}from"./chunk-KYREMICR.js";import"./chunk-VBRVI5XI.js";import{a as H}from"./chunk-5ZFOKSDK.js";import{a as y,d as g,f as u}from"./chunk-7L2LUDC3.js";import"./chunk-77KFIUJG.js";import"./chunk-7W3OTLHS.js";import"./chunk-X52A3GF7.js";import{b as m}from"./chunk-PX3QTMVS.js";import{e as f}from"./chunk-FE4HG5RY.js";function E(o){let e=o.length,t=new Float64Array(e*3),i=w.createTypedArray(e,e*2),r=0,a=0;for(let n=0;n<e;n++){let p=o[n];t[r++]=p.x,t[r++]=p.y,t[r++]=p.z,i[a++]=n,i[a++]=(n+1)%e}let s=new O({position:new k({componentDatatype:H.DOUBLE,componentsPerAttribute:3,values:t})});return new d({attributes:s,indices:i,primitiveType:b.LINES})}function c(o){o=o??u.EMPTY_OBJECT;let e=o.polygonHierarchy;m.defined("options.polygonHierarchy",e),this._polygonHierarchy=e,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=l.computeHierarchyPackedLength(e,y)+1}c.fromPositions=function(o){o=o??u.EMPTY_OBJECT,m.defined("options.positions",o.positions);let e={polygonHierarchy:{positions:o.positions}};return new c(e)};c.pack=function(o,e,t){return m.typeOf.object("value",o),m.defined("array",e),t=t??0,t=l.packPolygonHierarchy(o._polygonHierarchy,e,t,y),e[t]=o.packedLength,e};var v={polygonHierarchy:{}};c.unpack=function(o,e,t){m.defined("array",o),e=e??0;let i=l.unpackPolygonHierarchy(o,e,y);e=i.startingIndex,delete i.startingIndex;let r=o[e];return f(t)||(t=new c(v)),t._polygonHierarchy=i,t.packedLength=r,t};c.createGeometry=function(o){let e=o._polygonHierarchy,t=e.positions;if(t=L(t,y.equalsEpsilon,!0),t.length<3||!T.validOutline(t))return;let r=l.polygonOutlinesFromHierarchy(e,!1);if(r.length===0)return;let a=[];for(let p=0;p<r.length;p++){let _=new G({geometry:E(r[p])});a.push(_)}let s=C.combineInstances(a)[0],n=P.fromPoints(e.positions);return new d({attributes:s.attributes,indices:s.indices,primitiveType:s.primitiveType,boundingSphere:n})};var h=c;function A(o,e){return f(e)&&(o=h.unpack(o,e)),o._ellipsoid=g.clone(o._ellipsoid),h.createGeometry(o)}var Z=A;export{Z as default};
