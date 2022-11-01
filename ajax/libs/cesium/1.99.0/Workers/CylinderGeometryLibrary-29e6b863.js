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
define(["exports","./Math-a304e2d6"],(function(t,n){"use strict";const o={computePositions:function(t,o,e,r,s){const i=.5*t,a=-i,c=r+r,u=new Float64Array(3*(s?2*c:c));let f,h=0,y=0;const M=s?3*c:0,d=s?3*(c+r):3*r;for(f=0;f<r;f++){const t=f/r*n.CesiumMath.TWO_PI,c=Math.cos(t),l=Math.sin(t),m=c*e,p=l*e,C=c*o,P=l*o;u[y+M]=m,u[y+M+1]=p,u[y+M+2]=a,u[y+d]=C,u[y+d+1]=P,u[y+d+2]=i,y+=3,s&&(u[h++]=m,u[h++]=p,u[h++]=a,u[h++]=C,u[h++]=P,u[h++]=i)}return u}};var e=o;t.CylinderGeometryLibrary=e}));
