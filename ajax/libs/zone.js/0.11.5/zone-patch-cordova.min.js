"use strict";
/**
 * @license Angular v14.0.0-next.5
 * (c) 2010-2022 Google LLC. https://angular.io/
 * License: MIT
 */!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){
/**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
Zone.__load_patch("cordova",(function(e,o,r){if(e.cordova)var n="function",t=r.patchMethod(e.cordova,"exec",(function(){return function(e,r){return r.length>0&&typeof r[0]===n&&(r[0]=o.current.wrap(r[0],"cordova.exec.success")),r.length>1&&typeof r[1]===n&&(r[1]=o.current.wrap(r[1],"cordova.exec.error")),t.apply(e,r)}}))})),Zone.__load_patch("cordova.FileReader",(function(e,o){e.cordova&&void 0!==e.FileReader&&document.addEventListener("deviceReady",(function(){var r=e.FileReader;["abort","error","load","loadstart","loadend","progress"].forEach((function(e){var n=o.__symbol__("ON_PROPERTY"+e);Object.defineProperty(r.prototype,n,{configurable:!0,get:function(){return this._realReader&&this._realReader[n]}})}))}))}))}));