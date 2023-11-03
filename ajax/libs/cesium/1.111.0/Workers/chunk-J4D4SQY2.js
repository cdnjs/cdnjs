/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.111
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

import{a as n}from"./chunk-K36PKEJW.js";import{a as i}from"./chunk-KD2PMTHD.js";import{e as r}from"./chunk-ZUCO5WNM.js";var o={};function e(t,l){if(!r(t))throw new i("identifier is required.");r(o[t])||(o[t]=!0,console.warn(n(l,t)))}e.geometryOutlines="Entity geometry outlines are unsupported on terrain. Outlines will be disabled. To enable outlines, disable geometry terrain clamping by explicitly setting height to 0.";e.geometryZIndex="Entity geometry with zIndex are unsupported when height or extrudedHeight are defined.  zIndex will be ignored";e.geometryHeightReference="Entity corridor, ellipse, polygon or rectangle with heightReference must also have a defined height.  heightReference will be ignored";e.geometryExtrudedHeightReference="Entity corridor, ellipse, polygon or rectangle with extrudedHeightReference must also have a defined extrudedHeight.  extrudedHeightReference will be ignored";var h=e;export{h as a};
