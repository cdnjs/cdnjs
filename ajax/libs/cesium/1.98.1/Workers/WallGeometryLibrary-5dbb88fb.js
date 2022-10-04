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
define(["exports","./arrayRemoveDuplicates-235b23d8","./Matrix2-c339372d","./defaultValue-65031fc5","./ComponentDatatype-1b227f17","./PolylinePipeline-78c6adf0"],(function(e,t,i,n,o,r){"use strict";const a={};function s(e,t){return o.CesiumMath.equalsEpsilon(e.latitude,t.latitude,o.CesiumMath.EPSILON10)&&o.CesiumMath.equalsEpsilon(e.longitude,t.longitude,o.CesiumMath.EPSILON10)}const l=new i.Cartographic,h=new i.Cartographic;const c=new Array(2),g=new Array(2),u={positions:void 0,height:void 0,granularity:void 0,ellipsoid:void 0};a.computePositions=function(e,a,p,d,y,f){const m=function(e,o,r,a){const c=(o=t.arrayRemoveDuplicates(o,i.Cartesian3.equalsEpsilon)).length;if(c<2)return;const g=n.defined(a),u=n.defined(r),p=new Array(c),d=new Array(c),y=new Array(c),f=o[0];p[0]=f;const m=e.cartesianToCartographic(f,l);u&&(m.height=r[0]),d[0]=m.height,y[0]=g?a[0]:0;let P=d[0]===y[0],A=1;for(let t=1;t<c;++t){const n=o[t],l=e.cartesianToCartographic(n,h);u&&(l.height=r[t]),P=P&&0===l.height,s(m,l)?m.height<l.height&&(d[A-1]=l.height):(p[A]=n,d[A]=l.height,y[A]=g?a[t]:0,P=P&&d[A]===y[A],i.Cartographic.clone(l,m),++A)}return P||A<2?void 0:(p.length=A,d.length=A,y.length=A,{positions:p,topHeights:d,bottomHeights:y})}(e,a,p,d);if(!n.defined(m))return;a=m.positions,p=m.topHeights,d=m.bottomHeights;const P=a.length,A=P-2;let C,w;const v=o.CesiumMath.chordLength(y,e.maximumRadius),b=u;if(b.minDistance=v,b.ellipsoid=e,f){let e,t=0;for(e=0;e<P-1;e++)t+=r.PolylinePipeline.numberOfPoints(a[e],a[e+1],v)+1;C=new Float64Array(3*t),w=new Float64Array(3*t);const i=c,n=g;b.positions=i,b.height=n;let o=0;for(e=0;e<P-1;e++){i[0]=a[e],i[1]=a[e+1],n[0]=p[e],n[1]=p[e+1];const t=r.PolylinePipeline.generateArc(b);C.set(t,o),n[0]=d[e],n[1]=d[e+1],w.set(r.PolylinePipeline.generateArc(b),o),o+=t.length}}else b.positions=a,b.height=p,C=new Float64Array(r.PolylinePipeline.generateArc(b)),b.height=d,w=new Float64Array(r.PolylinePipeline.generateArc(b));return{bottomPositions:w,topPositions:C,numCorners:A}};var p=a;e.WallGeometryLibrary=p}));
