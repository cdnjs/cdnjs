/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.97
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
define(["exports","./ComponentDatatype-7f6d9570"],(function(t,n){"use strict";const o={computePositions:function(t,o,e,r,s){const i=.5*t,a=-i,c=r+r,u=new Float64Array(3*(s?2*c:c));let f,y=0,m=0;const p=s?3*c:0,d=s?3*(c+r):3*r;for(f=0;f<r;f++){const t=f/r*n.CesiumMath.TWO_PI,c=Math.cos(t),h=Math.sin(t),l=c*e,C=h*e,M=c*o,P=h*o;u[m+p]=l,u[m+p+1]=C,u[m+p+2]=a,u[m+d]=M,u[m+d+1]=P,u[m+d+2]=i,m+=3,s&&(u[y++]=l,u[y++]=C,u[y++]=a,u[y++]=M,u[y++]=P,u[y++]=i)}return u}};var e=o;t.CylinderGeometryLibrary=e}));
