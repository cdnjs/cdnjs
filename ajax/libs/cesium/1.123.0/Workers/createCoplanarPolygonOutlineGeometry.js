/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.123
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

import{a as T}from"./chunk-ONYACCBZ.js";import"./chunk-7MCGOXW3.js";import{a as f}from"./chunk-IY45XUGY.js";import"./chunk-E3BAMNKM.js";import{a as G}from"./chunk-7GU2ORNB.js";import{a as C}from"./chunk-UBAKWGRR.js";import"./chunk-H3L4SJP4.js";import"./chunk-3EKULFHC.js";import"./chunk-BSHGEEYG.js";import"./chunk-CHGCLMPO.js";import"./chunk-M243PNMW.js";import{a as L}from"./chunk-BRFVOFKF.js";import"./chunk-XDFUUQMZ.js";import"./chunk-UKQRKTK2.js";import"./chunk-LNO7O274.js";import{a as w}from"./chunk-T53UE6JF.js";import{a as O}from"./chunk-RYO6NY7F.js";import{b,c as d,d as k}from"./chunk-2HSPJH3C.js";import{d as P}from"./chunk-T5AUOWE7.js";import"./chunk-Y5B6Y3WD.js";import{a as H}from"./chunk-6QVIJ7JA.js";import{a as l,d as g}from"./chunk-AODSXSC5.js";import"./chunk-IISQCXJ5.js";import"./chunk-MOE32UQS.js";import"./chunk-IIPSFM7Z.js";import{a as c}from"./chunk-WHQYJFDH.js";import{b as a}from"./chunk-OYWUGDKS.js";import{e as u}from"./chunk-DRYFJEFT.js";function E(o){let e=o.length,t=new Float64Array(e*3),r=w.createTypedArray(e,e*2),i=0,s=0;for(let n=0;n<e;n++){let p=o[n];t[i++]=p.x,t[i++]=p.y,t[i++]=p.z,r[s++]=n,r[s++]=(n+1)%e}let y=new O({position:new k({componentDatatype:H.DOUBLE,componentsPerAttribute:3,values:t})});return new d({attributes:y,indices:r,primitiveType:b.LINES})}function m(o){o=c(o,c.EMPTY_OBJECT);let e=o.polygonHierarchy;a.defined("options.polygonHierarchy",e),this._polygonHierarchy=e,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=f.computeHierarchyPackedLength(e,l)+1}m.fromPositions=function(o){o=c(o,c.EMPTY_OBJECT),a.defined("options.positions",o.positions);let e={polygonHierarchy:{positions:o.positions}};return new m(e)};m.pack=function(o,e,t){return a.typeOf.object("value",o),a.defined("array",e),t=c(t,0),t=f.packPolygonHierarchy(o._polygonHierarchy,e,t,l),e[t]=o.packedLength,e};var v={polygonHierarchy:{}};m.unpack=function(o,e,t){a.defined("array",o),e=c(e,0);let r=f.unpackPolygonHierarchy(o,e,l);e=r.startingIndex,delete r.startingIndex;let i=o[e];return u(t)||(t=new m(v)),t._polygonHierarchy=r,t.packedLength=i,t};m.createGeometry=function(o){let e=o._polygonHierarchy,t=e.positions;if(t=L(t,l.equalsEpsilon,!0),t.length<3||!T.validOutline(t))return;let i=f.polygonOutlinesFromHierarchy(e,!1);if(i.length===0)return;let s=[];for(let p=0;p<i.length;p++){let _=new G({geometry:E(i[p])});s.push(_)}let y=C.combineInstances(s)[0],n=P.fromPoints(e.positions);return new d({attributes:y.attributes,indices:y.indices,primitiveType:y.primitiveType,boundingSphere:n})};var h=m;function A(o,e){return u(e)&&(o=h.unpack(o,e)),o._ellipsoid=g.clone(o._ellipsoid),h.createGeometry(o)}var Z=A;export{Z as default};
