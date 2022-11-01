/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.99
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
define(["exports","./Matrix3-edb29a7e","./defaultValue-135942ca","./Transforms-3ea76111","./Math-a304e2d6","./Matrix2-7a2bab7e"],(function(t,n,a,e,o,r){"use strict";const s=Math.cos,i=Math.sin,c=Math.sqrt,g={computePosition:function(t,n,e,o,r,g,u){const h=n.radiiSquared,l=t.nwCorner,C=t.boundingRectangle;let S=l.latitude-t.granYCos*o+r*t.granXSin;const d=s(S),M=i(S),w=h.z*M;let X=l.longitude+o*t.granYSin+r*t.granXCos;const Y=d*s(X),m=d*i(X),f=h.x*Y,p=h.y*m,x=c(f*Y+p*m+w*M);if(g.x=f/x,g.y=p/x,g.z=w/x,e){const n=t.stNwCorner;a.defined(n)?(S=n.latitude-t.stGranYCos*o+r*t.stGranXSin,X=n.longitude+o*t.stGranYSin+r*t.stGranXCos,u.x=(X-t.stWest)*t.lonScalar,u.y=(S-t.stSouth)*t.latScalar):(u.x=(X-C.west)*t.lonScalar,u.y=(S-C.south)*t.latScalar)}}},u=new r.Matrix2;let h=new n.Cartesian3;const l=new n.Cartographic;let C=new n.Cartesian3;const S=new e.GeographicProjection;function d(t,a,e,o,s,i,c){const g=Math.cos(a),l=o*g,d=e*g,M=Math.sin(a),w=o*M,X=e*M;h=S.project(t,h),h=n.Cartesian3.subtract(h,C,h);const Y=r.Matrix2.fromRotation(a,u);h=r.Matrix2.multiplyByVector(Y,h,h),h=n.Cartesian3.add(h,C,h),i-=1,c-=1;const m=(t=S.unproject(h,t)).latitude,f=m+i*X,p=m-l*c,x=m-l*c+i*X,G=Math.max(m,f,p,x),R=Math.min(m,f,p,x),y=t.longitude,b=y+i*d,O=y+c*w,P=y+c*w+i*d;return{north:G,south:R,east:Math.max(y,b,O,P),west:Math.min(y,b,O,P),granYCos:l,granYSin:w,granXCos:d,granXSin:X,nwCorner:t}}g.computeOptions=function(t,n,a,e,s,i,c){let g,u=t.east,h=t.west,M=t.north,w=t.south,X=!1,Y=!1;M===o.CesiumMath.PI_OVER_TWO&&(X=!0),w===-o.CesiumMath.PI_OVER_TWO&&(Y=!0);const m=M-w;g=h>u?o.CesiumMath.TWO_PI-h+u:u-h;const f=Math.ceil(g/n)+1,p=Math.ceil(m/n)+1,x=g/(f-1),G=m/(p-1),R=r.Rectangle.northwest(t,i),y=r.Rectangle.center(t,l);0===a&&0===e||(y.longitude<R.longitude&&(y.longitude+=o.CesiumMath.TWO_PI),C=S.project(y,C));const b=G,O=x,P=r.Rectangle.clone(t,s),W={granYCos:b,granYSin:0,granXCos:O,granXSin:0,nwCorner:R,boundingRectangle:P,width:f,height:p,northCap:X,southCap:Y};if(0!==a){const t=d(R,a,x,G,0,f,p);M=t.north,w=t.south,u=t.east,h=t.west,W.granYCos=t.granYCos,W.granYSin=t.granYSin,W.granXCos=t.granXCos,W.granXSin=t.granXSin,P.north=M,P.south=w,P.east=u,P.west=h}if(0!==e){a-=e;const t=r.Rectangle.northwest(P,c),n=d(t,a,x,G,0,f,p);W.stGranYCos=n.granYCos,W.stGranXCos=n.granXCos,W.stGranYSin=n.granYSin,W.stGranXSin=n.granXSin,W.stNwCorner=t,W.stWest=n.west,W.stSouth=n.south}return W};var M=g;t.RectangleGeometryLibrary=M}));
