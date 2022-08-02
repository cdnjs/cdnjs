/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.96
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
define(["exports","./ComponentDatatype-4028c72d"],(function(t,n){"use strict";const o={computePositions:function(t,o,e,s,r){const c=.5*t,i=-c,a=s+s,u=new Float64Array(3*(r?2*a:a));let y,f=0,m=0;const p=r?3*a:0,d=r?3*(a+s):3*s;for(y=0;y<s;y++){const t=y/s*n.CesiumMath.TWO_PI,a=Math.cos(t),h=Math.sin(t),l=a*e,C=h*e,M=a*o,P=h*o;u[m+p]=l,u[m+p+1]=C,u[m+p+2]=i,u[m+d]=M,u[m+d+1]=P,u[m+d+2]=c,m+=3,r&&(u[f++]=l,u[f++]=C,u[f++]=i,u[f++]=M,u[f++]=P,u[f++]=c)}return u}};t.CylinderGeometryLibrary=o}));
