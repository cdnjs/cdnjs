/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.95
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
define(["exports","./ComponentDatatype-e7fbe225"],(function(t,e){"use strict";const n={computePositions:function(t,n,o,s,r){const i=.5*t,c=-i,a=s+s,u=new Float64Array(3*(r?2*a:a));let f,y=0,m=0;const p=r?3*a:0,h=r?3*(a+s):3*s;for(f=0;f<s;f++){const t=f/s*e.CesiumMath.TWO_PI,a=Math.cos(t),l=Math.sin(t),C=a*o,M=l*o,b=a*n,d=l*n;u[m+p]=C,u[m+p+1]=M,u[m+p+2]=c,u[m+h]=b,u[m+h+1]=d,u[m+h+2]=i,m+=3,r&&(u[y++]=C,u[y++]=M,u[y++]=c,u[y++]=b,u[y++]=d,u[y++]=i)}return u}};t.CylinderGeometryLibrary=n}));
