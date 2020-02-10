"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var DirtyService = /** @class */ (function () {
    function DirtyService(storage, dirtyStorageName) {
        this.storage = storage;
        this.dirtyStorageName = dirtyStorageName;
        this.dirtyRecords = new Map();
        this.loadedCallback = [];
        this.flushTimeout = null;
        this.loaded = false;
        this.save = this.save.bind(this);
        this.load();
    }
    DirtyService.prototype.isDirty = function (recordName) {
        return this.dirtyRecords.has(recordName);
    };
    DirtyService.prototype.setDirty = function (recordName, isDirty) {
        if (isDirty) {
            this.dirtyRecords.set(recordName, true);
        }
        else {
            this.dirtyRecords.delete(recordName);
        }
        if (!this.flushTimeout) {
            this.flushTimeout = setTimeout(this.save, 1000);
        }
    };
    DirtyService.prototype.save = function () {
        this.storage.set(this.dirtyStorageName, 1, __spread(this.dirtyRecords), function () { });
        if (this.flushTimeout) {
            clearTimeout(this.flushTimeout);
        }
        this.flushTimeout = null;
    };
    DirtyService.prototype.whenLoaded = function (context, callback) {
        if (this.loaded) {
            callback.call(context);
            return;
        }
        this.loadedCallback.push({ callback: callback, context: context });
    };
    DirtyService.prototype.getAll = function () {
        return this.dirtyRecords;
    };
    DirtyService.prototype.load = function () {
        var _this = this;
        if (this.loaded) {
            return;
        }
        this.storage.get(this.dirtyStorageName, function (recordName, version, data) {
            _this.dirtyRecords = data ? new Map(data) : new Map();
            _this.loaded = true;
            _this.loadedCallback.forEach(function (_a) {
                var callback = _a.callback, context = _a.context;
                return callback.call(context);
            });
        });
    };
    return DirtyService;
}());
exports.DirtyService = DirtyService;
