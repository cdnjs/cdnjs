'use strict';
/**
 * @license Angular v14.2.0-next.0
 * (c) 2010-2022 Google LLC. https://angular.io/
 * License: MIT
 */
(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
        factory();
})((function () {
    'use strict';
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var AsyncStackTaggingZoneSpec = /** @class */ (function () {
        function AsyncStackTaggingZoneSpec(namePrefix, consoleAsyncStackTaggingImpl) {
            if (consoleAsyncStackTaggingImpl === void 0) { consoleAsyncStackTaggingImpl = console; }
            var _a, _b, _c, _d;
            this.name = 'asyncStackTagging for ' + namePrefix;
            this.scheduleAsyncTask = (_a = consoleAsyncStackTaggingImpl === null || consoleAsyncStackTaggingImpl === void 0 ? void 0 : consoleAsyncStackTaggingImpl.scheduleAsyncTask) !== null && _a !== void 0 ? _a : (function () { });
            this.startAsyncTask = (_b = consoleAsyncStackTaggingImpl === null || consoleAsyncStackTaggingImpl === void 0 ? void 0 : consoleAsyncStackTaggingImpl.startAsyncTask) !== null && _b !== void 0 ? _b : (function () { });
            this.finishAsyncTask = (_c = consoleAsyncStackTaggingImpl === null || consoleAsyncStackTaggingImpl === void 0 ? void 0 : consoleAsyncStackTaggingImpl.finishAsyncTask) !== null && _c !== void 0 ? _c : (function () { });
            this.cancelAsyncTask = (_d = consoleAsyncStackTaggingImpl === null || consoleAsyncStackTaggingImpl === void 0 ? void 0 : consoleAsyncStackTaggingImpl.cancelAsyncTask) !== null && _d !== void 0 ? _d : (function () { });
        }
        AsyncStackTaggingZoneSpec.prototype.onScheduleTask = function (delegate, current, target, task) {
            var _a;
            task.asyncId = this.scheduleAsyncTask(task.source || task.type, ((_a = task.data) === null || _a === void 0 ? void 0 : _a.isPeriodic) || task.type === 'eventTask');
            return delegate.scheduleTask(target, task);
        };
        AsyncStackTaggingZoneSpec.prototype.onInvokeTask = function (delegate, currentZone, targetZone, task, applyThis, applyArgs) {
            var _a;
            task.asyncId && this.startAsyncTask(task.asyncId);
            try {
                return delegate.invokeTask(targetZone, task, applyThis, applyArgs);
            }
            finally {
                task.asyncId && this.finishAsyncTask(task.asyncId);
                if (task.type !== 'eventTask' && !((_a = task.data) === null || _a === void 0 ? void 0 : _a.isPeriodic)) {
                    task.asyncId = undefined;
                }
            }
        };
        AsyncStackTaggingZoneSpec.prototype.onCancelTask = function (delegate, currentZone, targetZone, task) {
            task.asyncId && this.cancelAsyncTask(task.asyncId);
            task.asyncId = undefined;
            return delegate.cancelTask(targetZone, task);
        };
        return AsyncStackTaggingZoneSpec;
    }());
    // Export the class so that new instances can be created with proper
    // constructor params.
    Zone['AsyncStackTaggingZoneSpec'] = AsyncStackTaggingZoneSpec;
}));
