"use strict";
/**
 * @license Angular v14.0.0-next.5
 * (c) 2010-2022 Google LLC. https://angular.io/
 * License: MIT
 */!function(t){"function"==typeof define&&define.amd?define(t):t()}((function(){
/**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
Zone.__load_patch("canvas",(function(t,o,n){var e=t.HTMLCanvasElement;void 0!==e&&e.prototype&&e.prototype.toBlob&&n.patchMacroTask(e.prototype,"toBlob",(function(t,o){return{name:"HTMLCanvasElement.toBlob",target:t,cbIdx:0,args:o}}))}))}));