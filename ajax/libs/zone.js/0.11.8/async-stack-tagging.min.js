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
var n=function(){function n(n,e){var o;void 0===e&&(e=console),this.name="asyncStackTagging for "+n,this.createTask=null!==(o=null==e?void 0:e.createTask)&&void 0!==o?o:function(){}}return n.prototype.onScheduleTask=function(n,e,o,t){return t.consoleTask=this.createTask("Zone - ".concat(t.source||t.type)),n.scheduleTask(o,t)},n.prototype.onInvokeTask=function(n,e,o,t,c,a){return t.consoleTask?t.consoleTask.run((function(){return n.invokeTask(o,t,c,a)})):n.invokeTask(o,t,c,a)},n}();Zone.AsyncStackTaggingZoneSpec=n}));