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
            var _a;
            this.name = 'asyncStackTagging for ' + namePrefix;
            this.createTask = (_a = consoleAsyncStackTaggingImpl === null || consoleAsyncStackTaggingImpl === void 0 ? void 0 : consoleAsyncStackTaggingImpl.createTask) !== null && _a !== void 0 ? _a : (function () { });
        }
        AsyncStackTaggingZoneSpec.prototype.onScheduleTask = function (delegate, _current, target, task) {
            task.consoleTask = this.createTask("Zone - ".concat(task.source || task.type));
            return delegate.scheduleTask(target, task);
        };
        AsyncStackTaggingZoneSpec.prototype.onInvokeTask = function (delegate, _currentZone, targetZone, task, applyThis, applyArgs) {
            var ret;
            if (task.consoleTask) {
                ret = task.consoleTask.run(function () { return delegate.invokeTask(targetZone, task, applyThis, applyArgs); });
            }
            else {
                ret = delegate.invokeTask(targetZone, task, applyThis, applyArgs);
            }
            return ret;
        };
        return AsyncStackTaggingZoneSpec;
    }());
    // Export the class so that new instances can be created with proper
    // constructor params.
    Zone['AsyncStackTaggingZoneSpec'] = AsyncStackTaggingZoneSpec;
}));
