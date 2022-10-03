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
define(["exports","./Matrix2-7dfd434a","./defaultValue-50f7432c","./Transforms-f305a473","./ComponentDatatype-9b23164a"],(function(t,n,a,o,e){"use strict";const r=Math.cos,s=Math.sin,i=Math.sqrt,c={computePosition:function(t,n,o,e,c,g,u){const h=n.radiiSquared,l=t.nwCorner,C=t.boundingRectangle;let S=l.latitude-t.granYCos*e+c*t.granXSin;const d=r(S),w=s(S),M=h.z*w;let X=l.longitude+e*t.granYSin+c*t.granXCos;const Y=d*r(X),f=d*s(X),m=h.x*Y,p=h.y*f,x=i(m*Y+p*f+M*w);if(g.x=m/x,g.y=p/x,g.z=M/x,o){const n=t.stNwCorner;a.defined(n)?(S=n.latitude-t.stGranYCos*e+c*t.stGranXSin,X=n.longitude+e*t.stGranYSin+c*t.stGranXCos,u.x=(X-t.stWest)*t.lonScalar,u.y=(S-t.stSouth)*t.latScalar):(u.x=(X-C.west)*t.lonScalar,u.y=(S-C.south)*t.latScalar)}}},g=new n.Matrix2;let u=new n.Cartesian3;const h=new n.Cartographic;let l=new n.Cartesian3;const C=new o.GeographicProjection;function S(t,a,o,e,r,s,i){const c=Math.cos(a),h=e*c,S=o*c,d=Math.sin(a),w=e*d,M=o*d;u=C.project(t,u),u=n.Cartesian3.subtract(u,l,u);const X=n.Matrix2.fromRotation(a,g);u=n.Matrix2.multiplyByVector(X,u,u),u=n.Cartesian3.add(u,l,u),s-=1,i-=1;const Y=(t=C.unproject(u,t)).latitude,f=Y+s*M,m=Y-h*i,p=Y-h*i+s*M,x=Math.max(Y,f,m,p),G=Math.min(Y,f,m,p),R=t.longitude,y=R+s*S,O=R+i*w,P=R+i*w+s*S;return{north:x,south:G,east:Math.max(R,y,O,P),west:Math.min(R,y,O,P),granYCos:h,granYSin:w,granXCos:S,granXSin:M,nwCorner:t}}c.computeOptions=function(t,a,o,r,s,i,c){let g,u=t.east,d=t.west,w=t.north,M=t.south,X=!1,Y=!1;w===e.CesiumMath.PI_OVER_TWO&&(X=!0),M===-e.CesiumMath.PI_OVER_TWO&&(Y=!0);const f=w-M;g=d>u?e.CesiumMath.TWO_PI-d+u:u-d;const m=Math.ceil(g/a)+1,p=Math.ceil(f/a)+1,x=g/(m-1),G=f/(p-1),R=n.Rectangle.northwest(t,i),y=n.Rectangle.center(t,h);0===o&&0===r||(y.longitude<R.longitude&&(y.longitude+=e.CesiumMath.TWO_PI),l=C.project(y,l));const O=G,P=x,W=n.Rectangle.clone(t,s),_={granYCos:O,granYSin:0,granXCos:P,granXSin:0,nwCorner:R,boundingRectangle:W,width:m,height:p,northCap:X,southCap:Y};if(0!==o){const t=S(R,o,x,G,0,m,p);w=t.north,M=t.south,u=t.east,d=t.west,_.granYCos=t.granYCos,_.granYSin=t.granYSin,_.granXCos=t.granXCos,_.granXSin=t.granXSin,W.north=w,W.south=M,W.east=u,W.west=d}if(0!==r){o-=r;const t=n.Rectangle.northwest(W,c),a=S(t,o,x,G,0,m,p);_.stGranYCos=a.granYCos,_.stGranXCos=a.granXCos,_.stGranYSin=a.granYSin,_.stGranXSin=a.granXSin,_.stNwCorner=t,_.stWest=a.west,_.stSouth=a.south}return _};var d=c;t.RectangleGeometryLibrary=d}));
