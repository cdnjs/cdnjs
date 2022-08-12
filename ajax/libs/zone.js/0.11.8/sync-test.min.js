"use strict";
/**
 * @license Angular v14.2.0-next.0
 * (c) 2010-2022 Google LLC. https://angular.io/
 * License: MIT
 */!function(n){"function"==typeof define&&define.amd?define(n):n()}((function(){
/**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
var n=function(){function n(n){this.runZone=Zone.current,this.name="syncTestZone for "+n}return n.prototype.onScheduleTask=function(n,e,t,c){switch(c.type){case"microTask":case"macroTask":throw new Error("Cannot call ".concat(c.source," from within a sync test (").concat(this.name,")."));case"eventTask":c=n.scheduleTask(t,c)}return c},n}();Zone.SyncTestZoneSpec=n}));