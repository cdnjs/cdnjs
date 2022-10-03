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
define(["exports","./defaultValue-50f7432c"],(function(e,t){"use strict";e.combine=function e(n,o,f){f=t.defaultValue(f,!1);const r={},i=t.defined(n),a=t.defined(o);let c,s,u;if(i)for(c in n)n.hasOwnProperty(c)&&(s=n[c],a&&f&&"object"==typeof s&&o.hasOwnProperty(c)?(u=o[c],r[c]="object"==typeof u?e(s,u,f):s):r[c]=s);if(a)for(c in o)o.hasOwnProperty(c)&&!r.hasOwnProperty(c)&&(u=o[c],r[c]=u);return r}}));
